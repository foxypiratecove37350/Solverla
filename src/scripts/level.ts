export class Level {
	levelNumber: number
	name: string
	domain: string
	equation: string // LaTeX
	tools: string[] // LaTeX

	static domainsColors: Record<string, string> = {
		Arithmetic: '#ff5733',
		Algebra: '#c70039',
		Trigonometry: '#900c3f',
		Precalculus: '#581845',
		Calculus: '#1d3557',
		'Linear Algebra': '#457b9d',
		'Differential Equations': '#2a9d8f',
		'Abstract Algebra': '#122233',
		'Complex Analysis': '#e63946',
		'Real Analysis': '#f1c40f',
		Topology: '#8e44ad',
		'Number Theory': '#16a085',
		Combinatorics: '#d35400',
		'Mathematical Logic & Set Theory': '#2980b9',
		'Mathematical Physics': '#27Ae60',
		'Algebraic Geometry': '#9b59b6',
	}

	static domains = Object.keys(Level.domainsColors)

	constructor(
		levelNumber: number,
		name: string,
		domain: (typeof Level.domains)[number],
		equation: string,
		tools: string[],
	) {
		this.levelNumber = levelNumber
		this.name = name
		this.domain = domain
		this.equation = equation
		this.tools = tools
	}

	static levels: Level[] = [
		new Level(1, 'The Beginning', 'Arithmetic', 'x + 5 = 12', ['+', '-']),
		new Level(2, 'Another view', 'Arithmetic', '4x = 24', ['\\times', '/', '+', '-']),
		new Level(3, 'Two steps one solution', 'Arithmetic', '2x + 3 = 15', [
			'\\times',
			'/',
			'+',
			'-',
		]),
		// new Level(
		// 	4,
		// 	'How did we get here?',
		// 	'Arithmetic',
		// 	String.raw`\frac{x^2 + 2x + 1}{x + 1} = \sqrt{x^3 + 3x^2 + 3x + 1}`,
		// 	[
		// 		'\\mathrm{e}',
		// 		'\\pi',
		// 		'\\mathrm{i}',
		// 		'\\sqrt{x}',
		// 		'\\log(x)',
		// 		'a^{b}',
		// 		'\\sin(x)',
		// 		'\\cos(x)',
		// 		'\\tan(x)',
		// 		'x!',
		// 		'\\lfloor x \\rfloor',
		// 		'\\lceil x \\rceil',
		// 		'+',
		// 		'-',
		// 		'\\times',
		// 		'/',
		// 		'x^n',
		// 		'\\sqrt[n]{x}',
		// 		'a(b + c) = ab + ac',
		// 		'\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
		// 		'x^2 + 2x + 1 = (x + 1)^2',
		// 		'x^2 + 2bx + b^2 = (x + b)^2',
		// 	],
		// ),
	]

	static getLevel(levelNumber: number): Level {
		const level = this.levels.find((level) => level.levelNumber === levelNumber)

		if (!level) {
			throw new Error(`Level ${levelNumber} not found`)
		}

		return level
	}
}
