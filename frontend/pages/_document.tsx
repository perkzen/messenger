import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta property={'author'} content={'Crated by Domen Perko'} />
        </Head>
        <body>
          <Main />
          <div id={'modal'} />
        </body>
        <NextScript />
      </Html>
    );
  }
}
