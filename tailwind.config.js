/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary":"#141414",
        "secondary":"#9A7AF1",
        "blue":"#3575E2",
        "tartiary": "#707070"
      },
      boxShadow : {
        '3xl':'0 10px 50px 0px rgba(0,0,0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 2s ease-in-out',
        'slideIn': 'slideIn 1s ease-in-out',
        'bounceIn': 'bounceIn 1s ease-in-out infinite',
        'pulse': 'pulse 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        bounceIn: {
          '0%, 100%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.05)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

