import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(): JSX.Element {
    return (
        <Html lang="fr">
            <Head>
                <title>Efarmz</title>
            </Head>
            <body>
                <Main />
                <div id="root"></div>
                <NextScript />
            </body>
        </Html>
    );
}
