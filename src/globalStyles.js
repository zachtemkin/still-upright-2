import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html {
    background-color: ${({ theme }) => theme.body};
  }

  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease-in-out;
  }

  .categories__tag {
    color: ${({ theme }) => theme.tag};
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  }

  .su-button {
    color: ${({ theme }) => theme.buttons};
  }

  .su-button:hover, .su-button:focus {
    outline: none;
    box-shadow: 0px 0px 0px 4px ${({ theme }) => theme.buttonHover};
  }

  .post__info__title {
    color: ${({ theme }) => theme.text};
  }

  .post-detail__info-container {
    color: ${({ theme }) => theme.text};
  }

  .post-nav__button--disabled {
    color: ${({ theme }) => theme.text} !important;
  }

  .caption-body {
    color: ${({ theme }) => theme.text};
  }

  .post-detail__text-container > p {
    color: ${({ theme }) => theme.text};
  }

  .site-header {
    background-color: ${({ theme }) => theme.bodyTransparent};
    box-shadow: 0px 1px 0px 0px ${({ theme }) => theme.headerShadow};
    transition: background-color 0.3s ease-in-out;
  }

  .header-menu--vertical {
    background-color: ${({ theme }) => theme.bodyTransparent};
  }

  .mobile-nav-toggle__bar {
    background-color: ${({ theme }) => theme.text};
  }

  .footer__content {
    border-color: ${({ theme }) => theme.headerShadow};
    color: ${({ theme }) => theme.buttonHover};
  }
`
