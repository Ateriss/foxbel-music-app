const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#0d1117',
                main: '#EB5757',
            },
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                /* For Webkit-based browsers (Chrome, Safari and Opera) */
                '.scrollbar-hide': {
                    '-ms-overflow-style': 'none' /* IE and Edge */,
                    'scrollbar-width': 'none' /* Firefox */,
                },
                '.scrollbar-hide::-webkit-scrollbar': {
                    display: 'none',
                },
                '.viewport': {
                    width: 'calc(100% - 64px)',
                },
            })
        }),
    ],
}
