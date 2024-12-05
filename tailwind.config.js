/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['SF PRO DISPLAY', 'sans-serif'],
            },
            colors: {
                gray: {
                    DEFAULT: '#202020',
                    100: '#202020',
                    90: '#657282',
                    dark: '#657282',
                    80: '#606060',
                    60: '#A3A3A3',
                    40: '#E0E0E0',
                },
            },
            animation: {
                'rotate-circle': 'rotate 3s linear infinite',
            },
            keyframes: {
                rotate: {
                    '0%': { transform: ' rotate(-360deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
        },
    },
    plugins: [],
};
