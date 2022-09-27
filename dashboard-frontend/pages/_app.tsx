import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { AppContainer } from "../components/styles/appContainer.styled";
import { ApolloProvider } from "@apollo/client";
import GlobalStyles from "../components/styles/global";
import SideBarProvider from "../components/sideBarContext";
import AlertContext from "../components/alertContext";
import { useApollo } from "../apollo-client";
import "chart.js/auto";

const theme: DefaultTheme = {
  colors: {
    primary: "#FF4B4B",
    secondary: "#FFBF3A",
    bg_grey: "#FAFAFA",
    bg_orange: "#FFF2E4",
    bg_green: "#EFFFED",
  },
  mobile: "768px",
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  /*  to apply loading from SSR:
  https://stackoverflow.com/questions/60755316/nextjs-getserversideprops-show-loading/60756105#60756105  
  */
  const apolloClient = useApollo(pageProps);
  return (
    <>
      <Head>
        <title>Momtaz</title>
        <meta name="description" content="Momtaz dashboard frontend" />
        <link rel="shortcut icon" href="/fox-1.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ApolloProvider client={apolloClient}>
          <AlertContext>
            <SideBarProvider>
              <AppContainer>
                <Component {...pageProps} />
              </AppContainer>
            </SideBarProvider>
          </AlertContext>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
