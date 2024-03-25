/* eslint-disable import-helpers/order-imports */
import { MainTemplate } from "@/template";
import "../styles/globals.css";
import "../styles/typography.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { ApiProvider } from "@/context/FetchProductContext";
import { CartProvider } from "@/context/AddProductCartContext";
import { ProductSelectionProvider } from "@/context/ProductSelectionContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <ApiProvider>
        <CartProvider>
          <ProductSelectionProvider>
            <MainTemplate>
              <Component {...pageProps} />
            </MainTemplate>
            <ToastContainer autoClose={1500} />
          </ProductSelectionProvider>
        </CartProvider>
      </ApiProvider>
    </ThemeProvider>
  );
}

export default MyApp;
