import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { store } from '../store/app/store';
import { AppProps } from 'next/app';
import SocketProvider from '../components/SocketProvider/SocketProvider';
import ModalProvider from '../components/ModalProvider/ModalProvider';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ModalProvider>
        <SocketProvider>
          <Head>
            <title>Messenger</title>
            <link rel="icon" href="/messenger_icon.png" />
          </Head>
          <Component {...pageProps} />
        </SocketProvider>
      </ModalProvider>
    </Provider>
  );
}

export default MyApp;
