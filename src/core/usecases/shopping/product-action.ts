import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';
import { removeElementById } from '../../../libraries/array';
import produce from 'immer';
import { CATALOG } from 'src/presentations/global-state/shopping';
import { PRODUCT_CATEGORY } from 'src/core/domains/models/shopping/catalog/category/mod_categories';

type ACTIONS_PROPS = {
    cart: PRODUCT[];
    product: PRODUCT;
};

export const decrementTheQuantityOfAProduct = ({
    cart,
    product,
}: ACTIONS_PROPS) =>
    produce(cart, (draft) => removeElementById(draft, product.id));

export const removeProductWithSameID = ({ cart, product }: ACTIONS_PROPS) => {
    while (cart.some((item) => item.id === product.id)) {
        removeElementById(cart, product.id);
    }
};

export const addProductToShoppingCart = (cart: PRODUCT[], product: PRODUCT) =>
    produce(cart, (draft) => {
        draft.splice(cart.length, 0, product);
    });

export const setCategories = (
    catalog: CATALOG,
    categories: PRODUCT_CATEGORY[]
) => {
    return produce(catalog, (draft) => {
        draft.categories = [...categories];
    });
};
export const addProducts = ({
    catalog,
    products,
    currentPage,
    category,
}: {
    catalog: CATALOG;
    products: PRODUCT[];
    currentPage: number;
    category: string;
}) => {
    return produce(catalog, (draft) => {
        draft.products = [
            ...catalog.products,
            { currentPage: currentPage, category, data: products },
        ];
    });
};
