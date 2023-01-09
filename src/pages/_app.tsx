import { Header } from 'src/presentations/components/layouts/Header';
import '../presentations/css/global.css';
import '../presentations/css/reset.css';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Header />
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
