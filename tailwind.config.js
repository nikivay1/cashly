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
                blue: {
                    100: '#003F82',
                    90: '#02458D',
                    dark: '#02458D',
                    80: '#065398',
                    70: '#1B62B4',
                    60: '#4A90E2',
                    DEFAULT: '#4A90E2',
                    20: '#BDCCDE',
                    10: '#F3F9FF',
                },
                orange: {
                    DEFAULT: '#F37B09',
                    20: '#FEF2E6',
                    10: 'rgba(243, 123, 9, 0.1)',
                },
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
            fontSize: {
                'body/11': [
                    '11px',
                    {
                        lineHeight: '130%',
                        fontWeight: '400',
                        letterSpacing: '0.0006rem',
                    },
                ],
                'body/11-semibold': [
                    '11px',
                    {
                        lineHeight: '130%',
                        fontWeight: '600',
                        letterSpacing: '0.0006rem',
                    },
                ],
                'body/12': [
                    '12px',
                    {
                        lineHeight: '120%',
                        fontWeight: '400',
                    },
                ],
                'body/13': [
                    '13px',
                    {
                        fontWeight: '400',
                        letterSpacing: '-0.0008rem',
                        lineHeight: '120%',
                    },
                ],
                'body/13-medium': [
                    '13px',
                    {
                        fontWeight: '500',
                        letterSpacing: '-0.0008rem',
                        lineHeight: '120%',
                    },
                ],
                'body/14': [
                    '14px',
                    {
                        fontWeight: '400',
                        letterSpacing: '-0.0015rem',
                        lineHeight: '120%',
                    },
                ],
                'body/14-bold': [
                    '14px',
                    {
                        fontWeight: '700',
                        letterSpacing: '-0.0015rem',
                        lineHeight: '120%',
                    },
                ],
                'body/15': [
                    '15px',
                    {
                        fontWeight: '400',
                        letterSpacing: '-0.0023rem',
                        lineHeight: '150%',
                    },
                ],
                'body/15-medium': [
                    '15px',
                    {
                        fontWeight: '500',
                        letterSpacing: '-0.0023rem',
                        lineHeight: '120%',
                    },
                ],
                'body/15-semibold': [
                    '15px',
                    {
                        fontWeight: '600',
                        letterSpacing: '-0.0023rem',
                        lineHeight: '120%',
                    },
                ],
                'body-17': [
                    '17px',
                    {
                        fontWeight: '400',
                        lineHeight: '17px',
                    },
                ],
                input: [
                    '17px',
                    {
                        fontWeight: '500',
                        lineHeight: '120%',
                    },
                ],
                'input/17-medium': [
                    '17px',
                    {
                        fontWeight: '500',
                        letterSpacing: '-0.0043rem',
                        lineHeight: '120%',
                    },
                ],

                'button/18-semibold': [
                    '18px',
                    {
                        lineHeight: '120%',
                        fontWeight: '500',
                    },
                ],
                'button/15': [
                    '15px',
                    {
                        lineHeight: '120%',
                        fontWeight: '400',
                    },
                ],
                'button/15-medium': [
                    '15px',
                    {
                        lineHeight: '120%',
                        fontWeight: '500',
                    },
                ],
                'button/15-semibold': [
                    '15px',
                    {
                        lineHeight: '120%',
                        fontWeight: '600',
                    },
                ],
                'button/13-semibold': [
                    '13px',
                    {
                        lineHeight: '120%',
                        fontWeight: '600',
                    },
                ],
                h1: [
                    '2rem',
                    {
                        lineHeight: '122%',
                        letterSpacing: '-0.0041rem',
                        fontWeight: '400',
                    },
                ],
                'h1/semibold': [
                    '2rem',
                    {
                        lineHeight: '122%',
                        letterSpacing: '-0.0041rem',
                        fontWeight: '600',
                    },
                ],
                h2: [
                    '1.063rem',
                    {
                        lineHeight: '120%',
                        letterSpacing: '-0.0043rem',
                        fontWeight: '700',
                    },
                ],
                'h2/semibold': [
                    '1.063rem',
                    {
                        lineHeight: '120%',
                        letterSpacing: '-0.0043rem',
                        fontWeight: '600',
                    },
                ],
                'header/17-bold': [
                    '17px',
                    {
                        fontWeight: '700',
                        lineHeight: '120%',
                    },
                ],
                'subheader/15-semibold': [
                    '0.9375rem',
                    {
                        fontWeight: '600',
                        letterSpacing: '-0.0118rem',
                        lineHeight: '128.125%',
                    },
                ],
            },
        },
    },
    plugins: [],
};
