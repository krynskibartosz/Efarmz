import { ProductsContainer } from 'services/products/ProductsContainer';
import { API_PRODUCT_RESPONSE, CATEGORIES } from 'services/products/types';
import Head from 'next/head';
import { Column, Row } from 'components/bases/containers/Containers';
import { SubNavbar } from 'services//products/category/SubNavbar';
import { DeliverySlotsModal } from 'services/user/delivery/DeliverySlotsModal';
import { useModal } from 'lib/hooks/useModal';
import useRootStore from 'store/useRoot';
import useFetch from 'lib/hooks/useFetch';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { useHasHydrated } from 'lib/hooks/useHasHydrated';

export default function Home() {
    const hasHydrated = useHasHydrated();
    const { user, shoppingCart } = useRootStore.getState();
    const {
        adress: { country, zipCode, deliveryDate, deliveryMode },
    } = user.data;

    const { data: products, loading: isProductsLoading } =
        useFetch<API_PRODUCT_RESPONSE>(
            'https://dev.efarmz.be/api/v1/products',
            { method: 'GET' },
            60000
        );

    const { data: categories } = useFetch<CATEGORIES>(
        'https://dev.efarmz.be/api/v1/categories',
        { method: 'GET' },
        60000
    );

    const modal = useModal();

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
                <DeliverySlotsModal modal={modal} />
                {/* <ShoppindCartModal modal={modal} /> */}
                <header className="bg-white-300 border-b border-gray-200 shadow-main pt-5 w-full pb-4 mb-10 xl:px-32">
                    <Row
                        verticalPosition="center"
                        className="w-full gap-x-10 items-center mb-5 "
                    >
                        <p className="text-center text-green-700 text-4xl font-bold">
                            Efarmz
                        </p>
                        {deliveryDate.length === 0 && hasHydrated && (
                            <p onClick={() => modal.toggle('deliverySlot')}>
                                Choisir son créneaux horaire
                            </p>
                        )}
                        {deliveryDate.length > 0 && hasHydrated && (
                            <div
                                onClick={() => modal.toggle('deliverySlot')}
                                className="cursor-pointer rounded-md hover:bg-green-100 w-max px-3 py-1 transition-all duration-300 ease-in-out"
                            >
                                <Row
                                    verticalPosition="center"
                                    className="gap-x-1"
                                >
                                    <Column
                                        verticalPosition="center"
                                        className="h-full"
                                    >
                                        <GlobeAltIcon className="h-7 text-green-700" />
                                    </Column>
                                    <Column>
                                        <p className="text-xs text-green-700">
                                            Livraison le {deliveryDate}
                                        </p>
                                        <p className="text-xs text-green-700">
                                            {deliveryMode} - {country} {zipCode}
                                        </p>
                                    </Column>
                                </Row>
                            </div>
                        )}
                        {/* {hasHydrated && (
                            <p onClick={() => modal.toggle('shoppingCart')}>
                                Panier {shoppingCart.basic?.length}
                            </p>
                        )} */}
                    </Row>
                    <nav className="h-5">
                        {categories && (
                            <SubNavbar categories={categories.data} />
                        )}
                    </nav>
                </header>
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
