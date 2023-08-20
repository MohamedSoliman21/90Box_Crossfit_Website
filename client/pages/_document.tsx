import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&family=Roboto+Condensed:ital,wght@1,300&display=swap" rel="stylesheet"></link>
        <body>
          <Main />
          <NextScript />
        </body>
    </Html>
  )
}
