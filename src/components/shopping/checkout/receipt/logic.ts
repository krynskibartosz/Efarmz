import { PRODUCT } from 'src/core/infrastructure/api/models/shopping/catalog/product';
import { hasFreeShipping, shippingPrice } from 'src/core/logic/order';

export const calculateTotalProductCost = (shoppingCartItems: PRODUCT[]) => {
    return shoppingCartItems.reduce((acc, product) => acc + product.price, 0);
};

export const calculateTotalShoppingPrice = (totalProductCost: number) => {
    if (hasFreeShipping(totalProductCost)) {
        return totalProductCost.toFixed(2);
    }
    return (totalProductCost + shippingPrice).toFixed(2);
};
