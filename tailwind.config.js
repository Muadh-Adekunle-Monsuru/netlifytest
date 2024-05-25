/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js}'],
	theme: {
		extend: {
			fontFamily: {
				'satoshi': ['Satoshi', 'sans'],
			},
			backgroundImage: {
				'header-bg':"url('/src/assets/Hospital-image.jpg')",
			}
			
		},
	},
	plugins: [],
};
