import Head from "next/head";
import { QueryClientProvider } from "react-query";
import BaseHead from "components/BaseHead";
import { Toaster } from "react-hot-toast";
import { queryClient } from "libs/api";
import { theme } from "components/Theme";
import "styles/normalize.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "components/Layout";
import { ReactQueryDevtools } from "react-query/devtools";
import ErrorBoundary from "components/ErrorBoundary";
import { store } from "store/store";
import { Provider } from "react-redux";

import { TOAST_OPTIONS } from "libs/styles";

function App({ Component, pageProps }) {
  const THEME = createTheme(theme);
  const { desc, error, title } = pageProps;

  if (error) {
    return (
      <>
        <BaseHead />
        <Component {...pageProps} />
      </>
    );
  }
  return (
    <>
      <BaseHead />
      <ErrorBoundary>
        <Head>
          <title>
            Graduate Rajabhat University -{" "}
            {title || "ระบบข้อมูลงานวิจัยนักศึกษา"}
          </title>
          <meta
            name="description"
            content={desc || "ระบบข้อมูลงานวิจัยนักศึกษา"}
          />
        </Head>

        <Toaster toastOptions={TOAST_OPTIONS} position="top-right" />
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={THEME}>
            <Provider store={store}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Provider>
            <ReactQueryDevtools />
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
