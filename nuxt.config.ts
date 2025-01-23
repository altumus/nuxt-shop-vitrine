// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-01-23',
	devtools: { enabled: true },
	modules: ['@element-plus/nuxt', '@pinia/nuxt'],
	typescript: {
		strict: true,
		typeCheck: true,
		tsConfig: {
			compilerOptions: {
				paths: {
					'~/*': ['./*'],
					'@/*': ['./*'],
				},
			},
		},
	},
	ssr: true,
	css: ['~/assets/styles/main.css'],
	alias: {
		'@': '.',
		'~': '.',
	},
});

