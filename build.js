import gar from 'gar'
import fs from 'fs'
import inquirer from 'inquirer'
import spawn from 'cross-spawn'

const args = gar(process.argv.slice(2))

if (args._.length !== 1 || ['dev', 'build'].indexOf(args._[0]) === -1) {
	throw Error('Invalid command')
}

const execSync = (command, argv, options = {}) => {
	const result = spawn.sync(command, argv, { stdio: 'inherit', ...options })

	if (result.error) {
		throw new Error(`Error in subprocess: ${result.error.message}`)
	} else if (result.status !== 0) {
		throw new Error(`Subprocess failed with code ${result.status}`)
	}
}

const exec = (command, argv, options = {}, callback) => {
	return new Promise((resolve, reject) => {
		const proc = spawn(command, argv, { stdio: 'inherit', ...options })

		proc.on('error', (error) => {
			reject(error)
		})

		if (callback) {
			if (typeof callback === 'function' && proc.stdout) {
				proc.stdout.on('data', callback)
			} else {
				reject(new Error('Invalid callback or no stdout'))
			}
		}

		proc.on('close', (code) => {
			if (code !== 0) {
				reject(new Error(`Subprocess failed with code ${code}`))
			}
			resolve(code)
		})
	})
}

const format = () => {
	console.log('Formatting...')

	exec('npm', ['run', 'format'], { stdio: 'pipe' })
}

const buildWeb = async (platform) => {
	const target = ['android', 'ios'].indexOf(platform) === -1 ? platform : 'mobile'
	console.log(`Building ${target !== 'web' ? target + '-web' : target}...`)

	await Promise.all([
		exec('npm', ['run', 'type-check']),
		exec('npx', ['vite', 'build', '--mode', target, '--outDir', `dist/${target}`]),
	])
}

const syncMobile = (platform) => {
	console.log(`Syncing ${platform}...`)
	if (!fs.existsSync(platform)) {
		execSync('cap', ['add', platform])
	}
	execSync('cap', ['sync', platform])
}

const dev = async (platform) => {
	if (platform == 'web') {
		execSync('npx', ['vite', '--mode', platform])
	} else if (platform == 'electron') {
		let viteDevServerUrl
		exec(
			'npx',
			['vite', '--mode', platform],
			{
				stdio: 'pipe',
			},
			(data) => {
				if (viteDevServerUrl === undefined) {
					let match = data
						.toString()
						.replace(/\u001b\[[0-9;]*m/g, '')
						.match(/Local:\s+(http:\/\/localhost:\d+)/)
					if (match === null) return
					viteDevServerUrl = match[1]
				}
			},
		)

		await new Promise((resolve) => {
			const checkVar = () => {
				if (viteDevServerUrl !== undefined) {
					resolve()
				} else {
					setImmediate(checkVar)
				}
			}
			checkVar()
		})

		console.log(`Starting ${platform} with dev server on ${viteDevServerUrl}...`)
		execSync('electron-forge', ['start'], {
			env: {
				...process.env,
				VITE_DEV_SERVER_URL: viteDevServerUrl,
			},
		})
	} else {
		await buildWeb(platform)

		if (['android', 'ios'].indexOf(platform) !== -1) {
			syncMobile(platform)
			console.log(`Building ${platform}...`)
			if (platform == 'android') {
				execSync('./gradlew', ['assembleDebug'], { cwd: 'android' })
			} else {
				execSync('xcodebuild', ['-scheme', 'Solverla', '-configuration', 'Debug'], {
					cwd: 'ios',
				})
			}
		}
	}
}

const build = async (platform) => {
	await buildWeb(platform)

	if (platform !== 'web') {
		if (platform == 'electron') {
			console.log(`Making ${platform}...`)
			execSync('electron-forge', ['make'])
		} else if (['android', 'ios'].indexOf(platform) !== -1) {
			syncMobile(platform)
			console.log(`Building ${platform}...`)

			if (platform == 'android') {
				execSync('./gradlew', ['assembleRelease'], { cwd: 'android' })
			} else {
				execSync('xcodebuild', ['-scheme', 'Solverla', '-configuration', 'Release'], {
					cwd: 'ios',
				})
			}
		}
	}
}

format()

inquirer
	.prompt([
		{
			type: 'list',
			name: 'platform',
			message: 'Chose the platform:',
			choices: ['Web', 'Electron', 'Android', 'iOS'],
		},
	])
	.then((answers) => {
		if (args._[0] === 'dev') {
			dev(answers.platform.toLowerCase())
		} else if (args._[0] === 'build') {
			build(answers.platform.toLowerCase())
		}
	})
