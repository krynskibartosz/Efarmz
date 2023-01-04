import useRootStore from 'src/core/store/useRoot';
import shallow from 'zustand/shallow';
import Head from 'next/head';
import { useHasHydrated } from 'src/hooks';
import { Row, Column } from 'src/ui';

import { hasFreeShipping, shippingPrice } from 'src/core/logic/order';
import { ProductCardInShoppingCart } from 'src/components/shopping/order/product';

// todo: create an vertical scroll on products container
// todo: when the list update she render element in different order
const ShoppingCart = () => {
    const { shoppingCart: basicShoppingCart } = useRootStore(
        (state) => ({
            shoppingCart: state.shoppingCart.basic,
        }),
        shallow
    );
    const hasHydrated = useHasHydrated();

    const uniqueProducts = Array.from(
        new Set(basicShoppingCart.map((product) => product.id))
    ).map((id) => {
        return basicShoppingCart.find((product) => product.id === id);
    });

    const totalPriceOfProduct = basicShoppingCart.reduce(
        (acc, product) => acc + product.price,
        0
    );

    const totalShoppingPrice = () => {
        if (hasFreeShipping(totalPriceOfProduct)) {
            return totalPriceOfProduct - shippingPrice;
        }
        return totalPriceOfProduct;
    };
    // todo: y a un problème avec le calcul du prix à certains moment

    return (
        <>
            <Head>
                <title>Efarmz - Shopping Cart</title>
            </Head>
            <main className="xl:px-32 px-5 pb-10 mt-52">
                <Row
                    horizontalPosition="between"
                    className="w-full flex-col md:flex-row gap-y-10"
                >
                    <Column className="w-full order-2 md:order-1">
                        <h1 className="text-3xl font-bold mb-10">Mon panier</h1>
                        <Column as="ul" className="w-full gap-y-10">
                            {hasHydrated &&
                                uniqueProducts.map((product, i) => {
                                    return (
                                        <li key={i} className="w-full">
                                            {/* todo: fix this TS warning */}
                                            <ProductCardInShoppingCart
                                                //  @ts-ignore
                                                product={product}
                                            />
                                        </li>
                                    );
                                })}
                        </Column>
                    </Column>
                    <Column className="bg-[#EEFCF3]  h-96 p-5 order-1 md:order-2 w-full">
                        <h2 className="text-xl font-bold">Ma commande</h2>
                        {hasHydrated && (
                            <>
                                <p>
                                    Livraison:{' '}
                                    {hasFreeShipping(totalPriceOfProduct)
                                        ? 0.0
                                        : shippingPrice}
                                    €
                                </p>
                                <p className="text-lg font-bold">
                                    {totalShoppingPrice().toFixed()} €
                                </p>
                            </>
                        )}
                    </Column>
                </Row>
            </main>
        </>
    );
};

export default ShoppingCart;
