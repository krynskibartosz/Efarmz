import Head from 'next/head';
import { API_PRODUCT_RESPONSE } from 'store/shopping/types';
import { useFetch } from 'lib/hooks';
import { ProductsContainer } from 'products';

function Home() {
    const { data: products, loading: isProductsLoading } =
        useFetch<API_PRODUCT_RESPONSE>(
            `${process.env.NEXT_PUBLIC_END_POINT}products`,
            { method: 'GET' },
            60000
        );

    return (
        <>
            <Head>
                <title>Efarmz - Home</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="xl:px-32 px-5 pb-10 mt-52 w-full">
                <h1 className="text-4xl mb-4 font-bold">
                    Que souhaitez-vous manger cette semaine ?
                </h1>
                <ProductsContainer
                    numberOfProductsToDisplay={40}
                    products={products?.data}
                    isLoading={isProductsLoading}
                />
            </main>
        </>
    );
}
export default Home;
