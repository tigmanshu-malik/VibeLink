/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  // Ensure Tailwind classes are not purged in development
  safelist: [
    'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500',
    'text-blue-500', 'text-green-500', 'text-yellow-500', 'text-red-500', 'text-purple-500',
    'hover:bg-blue-600', 'hover:bg-green-600', 'hover:bg-yellow-600', 'hover:bg-red-600', 'hover:bg-purple-600',
    'hover:scale-105', 'transition-transform', 'transition-colors'
  ],
}
