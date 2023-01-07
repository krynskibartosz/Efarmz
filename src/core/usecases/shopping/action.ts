import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';
import { removeElementById } from '../../../libraries/array';
import produce from 'immer';

type ACTIONS_PROPS = {
    cart: PRODUCT[];
    product: PRODUCT;
};

export const decrementTheQuantityOfAProduct = ({
    cart,
    product,
}: ACTIONS_PROPS) => {
    return produce(cart, (draft) => removeElementById(draft, product.id));
};

export const removeProductWithSameID = ({ cart, product }: ACTIONS_PROPS) => {
    while (cart.some((item) => item.id === product.id)) {
        removeElementById(cart, product.id);
    }
};
