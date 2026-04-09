"use client"

import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import { CssBaseline } from "@mui/material";
import AuthProvider from "@/context/AuthContext";
import CartProvider from "@/context/CartContext";
import AppLayout from "@/components/layout/AppLayout";
import WishlistProvider from "@/context/WishlistContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ClientLayout({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AppLayout>{children}</AppLayout>
            </ThemeProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
