import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(): JSX.Element {
    return (
        <Html lang="fr">
            <Head></Head>
            <body>
                <Main />
                <div id="root"></div>
                <NextScript />
            </body>
        </Html>
    );
}
