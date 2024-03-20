/** @type {import('tailwindcss').Config} */
import tailwind from './tailwind';

export default {
  mode: 'jit',
  important: true,
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: tailwind.theme,
  plugins: tailwind.plugins,
};
