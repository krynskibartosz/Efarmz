import { Header } from 'components/layouts/Header';
import '../styles/tailwind.css';
import type { AppProps } from 'next/app';

// todo: y a un moment ou on peut plus scroll quand on a déjà été une fois dans le shopping cart
// todo: create a section Container | wrap parent component depend on design
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
