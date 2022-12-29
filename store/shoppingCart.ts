import produce from 'immer';
import { StoreSlice } from './useRoot';
import { PRODUCT } from 'services/products/types';

type SHOPPING_CART_STORE = {
    shoppingCart: PRODUCT[];
    addProduct: (reponse: PRODUCT) => void;
    deleteProduct: (reponse: PRODUCT) => void;
    // updateProduct: (reponse: PRODUCT) => void;
};

export const shoppingCartSlice: StoreSlice<SHOPPING_CART_STORE> = (set) => ({
    shoppingCart: [],
    addProduct: (product) => {
        set((state) =>
            produce(state, (draft) => {
                draft.shoppingCart = [...state.shoppingCart, product];
            })
        );
    },
    deleteProduct: (product) => {
        set((state) =>
            produce(state, (draft) => {
                draft.shoppingCart = draft.shoppingCart.filter(
                    (item) => item.id !== product.id
                );
            })
        );
    },
});
