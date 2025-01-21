/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes:{
        'green-shades': {
          '0%': { backgroundColor: '#a7f3d0' }, // Very light green
          '25%': { backgroundColor: '#6ee7b7' }, // Lighter green
          '50%': { backgroundColor: '#34d399' }, // Pastel medium green
          '75%': { backgroundColor: '#10b981' }, // Slightly deeper green
          '100%': { backgroundColor: '#a7f3d0' }, // Back to very light green
        },
        'green-gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        // Link the keyframes to reusable animations
        'green-shades': 'green-shades 5s ease-in-out infinite',
        'green-gradient': 'green-gradient 5s ease infinite',
      },
    },
  },
  plugins: [],
};
