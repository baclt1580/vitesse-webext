/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
function rem2px(input, fontSize = 16) {
  if (input == null) {
    return input;
  }
  switch (typeof input) {
    case 'object':
      if (Array.isArray(input)) {
        return input.map((val) => rem2px(val, fontSize));
      }
      const ret = {};
      for (const key in input) {
        ret[key] = rem2px(input[key], fontSize);
      }
      return ret;
    case 'string':
      return input.replace(
        /(\d*\.?\d+)rem$/,
        (_, val) => `${parseFloat(val) * fontSize}px`,
      );
    case 'function':
      return eval(input.toString().replace(
        /(\d*\.?\d+)rem/g,
        (_, val) => `${parseFloat(val) * fontSize}px`,
      ));
    default:
      return input;
  }
}
module.exports = {
  content: [
    "./src/**/*.{vue,ts}"
  ],
  theme: {
    ...rem2px(defaultTheme),
    extend: {
      colors: {
        "primaryColor": "#18a058",
        "primaryColorHover": "#36ad6a",
        "primaryColorPressed": "#0c7a43",
        "primaryColorSuppl": "#36ad6a",
        "infoColor": "#2080f0",
        "infoColorHover": "#4098fc",
        "infoColorPressed": "#1060c9",
        "infoColorSuppl": "#4098fc",
        "successColor": "#18a058",
        "successColorHover": "#36ad6a",
        "successColorPressed": "#0c7a43",
        "successColorSuppl": "#36ad6a",
        "warningColor": "#f0a020",
        "warningColorHover": "#fcb040",
        "warningColorPressed": "#c97c10",
        "warningColorSuppl": "#fcb040",
        "errorColor": "#d03050",
        "errorColorHover": "#de576d",
        "errorColorPressed": "#ab1f3f",
        "errorColorSuppl": "#de576d",
      }
    },
  },
  plugins: [require('tailwindcss-convert-px-to-rem')],
  corePlugins: {
    preflight: false
  }
}

