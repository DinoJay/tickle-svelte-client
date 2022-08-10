module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sourcecodepro: ['sourceCodePro', 'sans-serif']
			},
			colors: {
				'c-dark-blue': '#082A40',
				'c-green': '#1C8C8C',
				'c-light-green': '#84BF9E',
				'c-light-yellow': '#F2DC9B',
				'c-light-red': '#F27166',
				'c-dark-brown': '#63524E',
				'c-cream': '#D9C5AD',
				'c-brown': '#8C5042',
				'c-wheat': '#F2EFE9',
				'c-light-gray': '#D9D9D9',
				'c-gray': '#A6A29F',
				'c-dark-gray': '#59514F',
				'c-black': '#262626'
			}
		}
	},
	plugins: []
};
