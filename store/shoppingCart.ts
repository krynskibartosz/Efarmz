import produce from 'immer';
import { StoreSlice } from './useRoot';
import { PRODUCT } from 'services/products/types';

type SHOPPING_CART_STORE = {
    shoppingCart: {
        express: any;
        subscriptions: any;
        basic: PRODUCT[];
    };
    addProduct: (reponse: PRODUCT) => void;
    deleteProduct: (reponse: PRODUCT) => void;
    // updateProduct: (reponse: PRODUCT) => void;
};

export const shoppingCartSlice: StoreSlice<SHOPPING_CART_STORE> = (set) => ({
    shoppingCart: {
        express: [],
        subscriptions: [],
        basic: [],
    },
    addProduct: (product) => {
        set((state) =>
            produce(state, (draft) => {
                draft.shoppingCart.basic = [
                    ...state.shoppingCart.basic,
                    product,
                ];
            })
        );
    },
    deleteProduct: (product) => {
        set((state) =>
            produce(state, (draft) => {
                draft.shoppingCart.basic = draft.shoppingCart.basic.filter(
                    (item) => item.id !== product.id
                );
            })
        );
    },
});
