/* eslint-disable import-helpers/order-imports */
import { MainTemplate } from "@/template";
import "../styles/globals.css";
import "../styles/typography.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { ApiProvider } from "@/context/FetchProductContext";
import { CartProvider } from "@/context/AddProductCartContext";
import { ProductSelectionProvider } from "@/context/ProductSelectionContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <ApiProvider>
        <CartProvider>
          <ProductSelectionProvider>
            <MainTemplate>
              <Component {...pageProps} />
            </MainTemplate>
          </ProductSelectionProvider>
        </CartProvider>
      </ApiProvider>
    </ThemeProvider>
  );
}

export default MyApp;
