import { hasFreeShipping, shippingPrice } from 'src/core/domains/logic/order';
import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/product';

export const calculateTotalProductCost = (shoppingCartItems: PRODUCT[]) => {
    return shoppingCartItems.reduce((acc, product) => acc + product.price, 0);
};

export const calculateTotalShoppingPrice = (totalProductCost: number) => {
    if (hasFreeShipping(totalProductCost)) {
        return totalProductCost.toFixed(2);
    }
    return (totalProductCost + shippingPrice).toFixed(2);
};
