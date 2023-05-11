import { getCssPropertyValue } from "../utils/style";

const lightPallete = {
  primary: {
    main: getCssPropertyValue("--primary-300"),
    darker: getCssPropertyValue("--secondary-300"),
    contrastText: "#fff",
  },
  outlined: {
    main: "#fff",
    darker: getCssPropertyValue("--primary-200"),
    contrastText: "#000",
    
  },
  secondary: {
    main: getCssPropertyValue("--primary-100"),
  },
  nav: {
    main: getCssPropertyValue('--primart-300')
  }
};

export default lightPallete;
