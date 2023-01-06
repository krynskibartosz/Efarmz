import {
    hasFreeShipping,
    shippingPrice,
} from 'src/core/domains/logic/checkout';
import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';

export const calculateTotalProductCost = (shoppingCartItems: PRODUCT[]) => {
    return shoppingCartItems.reduce((acc, product) => acc + product.price, 0);
};

export const calculateTotalShoppingPrice = (totalProductCost: number) => {
    if (hasFreeShipping(totalProductCost)) {
        return totalProductCost.toFixed(2);
    }
    return (totalProductCost + shippingPrice).toFixed(2);
};
