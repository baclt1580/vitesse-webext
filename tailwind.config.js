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
        "primary":"#fbca1f",
        "n-primaryColor": "#18a058",
        "n-primaryColorHover": "#36ad6a",
        "n-primaryColorPressed": "#0c7a43",
        "n-primaryColorSuppl": "#36ad6a",
        "n-infoColor": "#2080f0",
        "n-infoColorHover": "#4098fc",
        "n-infoColorPressed": "#1060c9",
        "n-infoColorSuppl": "#4098fc",
        "n-successColor": "#18a058",
        "n-successColorHover": "#36ad6a",
        "n-successColorPressed": "#0c7a43",
        "n-successColorSuppl": "#36ad6a",
        "n-warningColor": "#f0a020",
        "n-warningColorHover": "#fcb040",
        "n-warningColorPressed": "#c97c10",
        "n-warningColorSuppl": "#fcb040",
        "n-errorColor": "#d03050",
        "n-errorColorHover": "#de576d",
        "n-errorColorPressed": "#ab1f3f",
        "n-errorColorSuppl": "#de576d",
      }
    },
  },
  plugins: [require('tailwindcss-convert-px-to-rem')],
  corePlugins: {
    preflight: false
  }
}

