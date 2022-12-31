import { ProductsContainer } from 'services/products/ProductsContainer';
import { API_PRODUCT_RESPONSE, CATEGORIES } from 'services/products/types';
import Head from 'next/head';
import { Column, Row } from 'components/bases/containers/Containers';
import { SubNavbar } from 'services//products/category/SubNavbar';
import { DeliverySlotsModal } from 'services/user/delivery/DeliverySlotsModal';
import { useModal } from 'lib/hooks/useModal';
import useRootStore from 'store/useRoot';
import useFetch from 'lib/hooks/useFetch';
import { GlobeAltIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useHasHydrated } from 'lib/hooks/useHasHydrated';
import shallow from 'zustand/shallow';
import Link from 'next/link';
import { Header } from 'components/layouts/Header';

function Home() {
    const { data: products, loading: isProductsLoading } =
        useFetch<API_PRODUCT_RESPONSE>(
            'https://dev.efarmz.be/api/v1/products',
            { method: 'GET' },
            60000
        );

    return (
        <>
            <Head>
                <title>Efarmz</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="">
                <section className="xl:px-32 px-5 pb-10">
                    <h1 className="text-4xl mb-4 font-bold">
                        Que souhaitez-vous manger cette semaine ?
                    </h1>
                    <ProductsContainer
                        numberOfProductsToDisplay={40}
                        products={products?.data}
                        isLoading={isProductsLoading}
                    />
                </section>
            </main>
        </>
    );
}
export default Home;
