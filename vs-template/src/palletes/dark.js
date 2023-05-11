import { getCssPropertyValue } from "../utils/style";

const darkPallete = {
  primary: {
    main: getCssPropertyValue("--secondary-100"),
    darker: getCssPropertyValue("--primary-200"),
    contrastText: "#000",
  },

  outlined: {
    main: '#404040',
    darker: getCssPropertyValue("--primary-200"),
    contrastText: "#fff",
  },

  secondary: {
    main: getCssPropertyValue("--secondary-100"),
  },
  nav: {
    main: '#404040'
  }
};

export default darkPallete;
