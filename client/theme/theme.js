import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5C4033",
    },
    secondary: {
      main: "#C89B3C",
    },
    background: {
      default: "#F8F5F1",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#6C6C6C",
    },
  },
  typography:{
    fontFamily: "Poppins, sans-serif",
    h1: { fontSize: "2.5rem", fontWeight: 700 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    h3: { fontSize: "1.5rem", fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  }
});

export default theme;