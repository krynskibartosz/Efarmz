import {
    hasFreeShipping,
    shippingPrice,
} from 'src/core/domains/logic/checkout';
import {
    calculateTotalProductCost,
    calculateTotalShoppingPrice,
} from './logic';
import shallow from 'zustand/shallow';
import useRootStore from 'src/presentations/global-state/useRoot';

export const CommandResume = () => {
    const { shoppingCart: basicShoppingCart } = useRootStore(
        (state) => ({
            shoppingCart: state.shoppingCart.basic,
        }),
        shallow
    );

    const totalProductCost = calculateTotalProductCost(basicShoppingCart);
    return (
        <article>
            <h3>Total des produit</h3>
            <p>{totalProductCost.toFixed(2)} €</p>
            <h3>Livraison: </h3>
            <p>{hasFreeShipping(totalProductCost) ? 0.0 : shippingPrice}€</p>
            <h3 className="text-lg font-bold">Total</h3>
            <p>{calculateTotalShoppingPrice(totalProductCost)}€</p>
        </article>
    );
};
