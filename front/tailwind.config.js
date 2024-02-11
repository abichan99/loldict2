/** @type {import('tailwindcss').Config} */
module.exports = {
  // tailwind cssを適用するファイルのパスを指定
  content: [
    "./src/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nanum Gothic", "sans-serif"],
      }
    },
    // ダークモードの設定、詳細は以下の公式ドキュメントを参照
    // https://tailwindcss.com/docs/dark-mode
    darkMode: "class",
  },
  plugins: [],
}
