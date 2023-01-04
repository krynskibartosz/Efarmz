import { SHOPPING_CART, ACTIONS } from './catalog/product';

export type SHOPPING_CART_STORE = {
    shoppingCart: SHOPPING_CART;
} & ACTIONS;
