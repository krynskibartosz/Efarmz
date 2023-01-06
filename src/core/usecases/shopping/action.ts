import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';
import { removeElementById } from 'src/libraries/array';

type ACTIONS_PROPS = {
    cart: PRODUCT[];
    product: PRODUCT;
};

export const decrementProductQuantity = ({ cart, product }: ACTIONS_PROPS) => {
    return removeElementById(cart, product.id);
};
export const removeAProductOfCart = ({ cart, product }: ACTIONS_PROPS) => {
    while (cart.some((item) => item.id === product.id)) {
        removeElementById(cart, product.id);
    }
};
