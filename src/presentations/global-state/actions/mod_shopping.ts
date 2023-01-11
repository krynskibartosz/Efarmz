import { PRODUCT_CATEGORY } from 'src/core/domains/models/shopping/catalog/category/mod_categories';
import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';

export type ACTIONS = {
    addProduct: (product: PRODUCT) => void;
    deductProduct: (product: PRODUCT) => void;
    removeProduct: (product: PRODUCT) => void;
    setCategoriesToCatalog: (categories: PRODUCT_CATEGORY[]) => void;
    addProductsToCatalog: ({
        products,
        currentPage,
        category,
    }: {
        products: PRODUCT[];
        currentPage: number;
        category: string;
    }) => void;
};
