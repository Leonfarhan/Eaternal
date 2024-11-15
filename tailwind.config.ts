import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'base': '#FFFFFF',
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
        'sidebar-start': 'rgba(var(--background-start-rgb), 1)',
        'sidebar-end': 'rgba(var(--background-end-rgb), 1)',
      }
    },
  },
}
export default config