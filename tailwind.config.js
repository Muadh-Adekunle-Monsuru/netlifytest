/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js}'],
	theme: {
		extend: {
			fontFamily: {
				'satoshi': ['Satoshi', 'sans'],
			},

			boxShadow: {
				'3xl': '2px 2px 2px 2px rgba(0, 0, 0, 0.5)',
			  }
		},
	},
	plugins: [],
};
