import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease-in-out
  }

  .categories__tag {
    color: ${({ theme }) => theme.tag};
  }

  .su-button {
    color: ${({ theme }) => theme.buttons};
  }

  .su-button:hover, .su-button:focus {
    outline none;
    box-shadow: 0px 0px 0px 4px ${({ theme }) => theme.buttonHover};
  }

  .post-detail__info-container {
    color: ${({ theme }) => theme.text};
  }

  .post-nav__button--disabled {
    color: ${({ theme }) => theme.buttonHover} !important;
  }

  .caption-body {
    color: ${({ theme }) => theme.text};
  }

  .post-detail__text-container > p {
    color: ${({ theme }) => theme.text};
  }
`
