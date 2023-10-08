/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('../assets/bg-login.jpg')"
      }
    }
  },
  corePlugins: {
    preflight: false
  },
  plugins: []
}
