import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html,
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 62.5%;
  box-sizing: border-box;
  font-weight: 400;
  line-height: 1.6;
  background-image: ${({ theme }) => `linear-gradient(
    to right bottom,
    ${theme.colors.primary},
    ${theme.colors.secondary}
  )`}; 
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}

`;

export default GlobalStyles;
