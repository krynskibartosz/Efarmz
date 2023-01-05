import { useHasHydrated } from 'lib';
import { hasFreeShipping, shippingPrice } from 'src/core/logic/order';
import useRootStore from 'src/core/store/useRoot';
import shallow from 'zustand/shallow';

export const CommandResume = () => {
    const hasHydrated = useHasHydrated();

    const { shoppingCart: basicShoppingCart } = useRootStore(
        (state) => ({
            shoppingCart: state.shoppingCart.basic,
        }),
        shallow
    );

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
    if (hasHydrated) {
        return (
            <>
                <p>
                    Livraison:{' '}
                    {hasFreeShipping(totalPriceOfProduct) ? 0.0 : shippingPrice}
                    €
                </p>
                <p className="text-lg font-bold">
                    {totalShoppingPrice().toFixed()} €
                </p>
            </>
        );
    }
    return <></>;
};
