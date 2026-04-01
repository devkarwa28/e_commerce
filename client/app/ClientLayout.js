"use client";

import { ThemeProvider } from "@emotion/react";
import theme from "@/theme/theme";
import { CssBaseline } from "@mui/material";
import AuthProvider from "@/context/AuthContext";
import CartProvider from "@/context/CartContext";
import AppLayout from "@/components/layout/AppLayout";

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}
