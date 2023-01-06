import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';

export type ACTIONS = {
    addProduct: (product: PRODUCT) => void;
    deductProduct: (product: PRODUCT) => void;
    removeProduct: (product: PRODUCT) => void;
};
