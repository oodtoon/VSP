import { createMuiTheme } from "@material-ui/core/styles"

function getCssPropertyValue(propertyName) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(propertyName)
      .trim();
  }

const baseTheme = createMuiTheme({
    typography: {
        button: {
          fontSize: 16,
          fontWeight: 700,
        },}
})

const darkTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    type: "dark",
    primary: {
      main: "#26a27b"
    },
    secondary: {
      main: "#fafafa"
    }
  }
})
const lightTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    type: "light",
    primary: {
        main: getCssPropertyValue("--primary-300"),
        darker: getCssPropertyValue("--primary-200"),
        contrastText: "#ffffff",
    },
    secondary: {
        main: getCssPropertyValue("--secondary-100"),
        darker: getCssPropertyValue("--secondary-200"),
        contrastText: getCssPropertyValue("--secondary-300"),
    }
  }
})

export { darkTheme, lightTheme }