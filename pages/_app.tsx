import { Header } from 'components/layouts/Header';
import '../styles/tailwind.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
