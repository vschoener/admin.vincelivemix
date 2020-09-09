import { createGlobalStyle } from 'styled-components';

// Its handled by bootstrap for now but if override is needed
export const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    height: 100%;
  }
`;
