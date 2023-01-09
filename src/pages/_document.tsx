import { Html, Head, Main, NextScript } from 'next/document';

const Document = (): JSX.Element => {
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
};
export default Document;
