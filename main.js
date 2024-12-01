import { app, BrowserWindow, Menu } from 'electron'
import path from 'path'

let mainWindow
const __dirname = path.dirname(new URL(import.meta.url).pathname)

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			devTools: !!process.env.VITE_DEV_SERVER_URL,
		},
	})

	Menu.setApplicationMenu(null)

	if (process.env.VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
		mainWindow.webContents.openDevTools()
	} else {
		mainWindow.loadFile(path.join(__dirname, '/dist/electron/index.html'))
	}
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})
