export default {
	configVersion: 1,
	id: "hello-world",
	displayName: "Hello World Workery",
	description: "Get started with a basic Worker with the Workery framework",
	platform: "workers",
	copyFiles: {
		variants: {
			ts: {
				path: "./ts",
			},
		},
	},
}