import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/product';

export type ACTIONS = {
    addProduct: (product: PRODUCT) => void;
    deductProduct: (product: PRODUCT) => void;
    removeProduct: (product: PRODUCT) => void;
};
