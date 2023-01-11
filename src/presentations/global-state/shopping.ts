import produce from 'immer';

import { StoreSlice } from './useRoot';
import {
    addProductToShoppingCart,
    addProducts,
    decrementTheQuantityOfAProduct,
    removeProductWithSameID,
    setCategories,
} from 'src/core/usecases/shopping/product-action';
import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';
import { ACTIONS } from './actions/mod_shopping';
import { PRODUCT_CATEGORY } from 'src/core/domains/models/shopping/catalog/category/mod_categories';

export type CATALOG = {
    products: { category: string; currentPage: number; data: PRODUCT[] }[] | [];
    categories: PRODUCT_CATEGORY[];
};

const initialCatalog: {
    catalog: CATALOG;
} = {
    catalog: {
        products: [],
        categories: [],
    },
};

type SHOPPING_CART = {
    basic: PRODUCT[];
    express: PRODUCT[];
    subscriptions: PRODUCT[];
    catalog: CATALOG;
};

type SHOPPING_CART_STORE = {
    shoppingCart: SHOPPING_CART;
} & ACTIONS;

const initialState: SHOPPING_CART = {
    basic: [],
    express: [],
    subscriptions: [],
    ...initialCatalog,
};

export const shoppingCartSlice: StoreSlice<SHOPPING_CART_STORE> = (set) => ({
    shoppingCart: initialState,
    addProduct: (product) => {
        set((state) =>
            produce(state, (draft) => {
                draft.shoppingCart.basic = addProductToShoppingCart(
                    state.shoppingCart.basic,
                    product
                );
            })
        );
    },
    deductProduct: (product) => {
        set((state) =>
            produce(state, (draft) => {
                draft.shoppingCart.basic = decrementTheQuantityOfAProduct({
                    cart: state.shoppingCart.basic,
                    product,
                });
            })
        );
    },
    removeProduct: (product) => {
        set((state) =>
            produce(state, (draft) => {
                removeProductWithSameID({
                    cart: draft.shoppingCart.basic,
                    product,
                });
            })
        );
    },
    setCategoriesToCatalog(categories) {
        set((state) =>
            produce(state, (draft) => {
                draft.shoppingCart.catalog = setCategories(
                    state.shoppingCart.catalog,
                    categories
                );
            })
        );
    },
    addProductsToCatalog({ products, category, currentPage }) {
        set((state) =>
            produce(state, (draft) => {
                draft.shoppingCart.catalog = addProducts({
                    catalog: state.shoppingCart.catalog,
                    products,
                    currentPage: currentPage,
                    category: category,
                });
            })
        );
    },
});
