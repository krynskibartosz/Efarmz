import { Products } from 'services/products/Products';
import { CATEGORIES, PRODUCT } from 'services/products/types';
import Head from 'next/head';
import { Row } from 'components/bases/containers/Containers';
import { SubNavbar } from 'services//products/category/SubNavbar';
import { DeliverySlotsModal } from 'services/delivery/DeliverySlotsModal';
import { useModal } from 'lib/hooks/useModal';
import { ShoppindCartModal } from 'services/shoppingCart/ShoppinCartModal';
import useRootStore from 'store/useRoot';

export async function getServerSideProps() {
    try {
        const resProducts = await fetch(
            'https://www.efarmz.be/api/v1/products'
        );
        const resCategories = await fetch(
            'https://www.efarmz.be/api/v1/categories'
        );
        const products = await resProducts.json();
        const categories = await resCategories.json();

        return {
            props: {
                products,
                categories: categories,
            },
        };
    } catch (error) {
        console.error(error);
        return { props: {} };
    }
}

export default function Home({
    products,
    categories,
}: {
    products: { data: PRODUCT[] };
    categories: CATEGORIES;
}) {
    const modal = useModal();
    const { shoppingCart } = useRootStore.getState();

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
                <ShoppindCartModal modal={modal} />
                <header className="bg-gray-300 pt-5 w-full pb-4 mb-10 ">
                    <Row className="w-full items-center mb-5 gap-x-10">
                        <p className="text-center text-3xl font-bold">Logo</p>
                        <p onClick={() => modal.toggle('deliverySlot')}>
                            Choisir son créneaux horaire
                        </p>

                        <p onClick={() => modal.toggle('shoppingCart')}>
                            Panier {shoppingCart.length}
                        </p>
                    </Row>
                    <SubNavbar categories={categories?.data} />
                </header>
                <div className="px-10 pb-10">
                    <h1 className="text-5xl mb-4 font-bold">Nos produits</h1>
                    {<Products data={products?.data} />}
                </div>
            </main>
        </>
    );
}
