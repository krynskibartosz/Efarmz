import '../presentations/css/global.css';
import '../presentations/css/reset.css';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
