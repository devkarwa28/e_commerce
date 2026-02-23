"use client";
import "../styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import theme from "@/theme/theme";
import { CssBaseline } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
