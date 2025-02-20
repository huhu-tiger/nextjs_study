import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="zh">
      <Head>
        <meta name="description" content="我的博客" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap" 
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
      </body>
    </Html>
  );
}
