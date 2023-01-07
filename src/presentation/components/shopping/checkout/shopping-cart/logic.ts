import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';

export const removeDuplicateProducts = (products: PRODUCT[]) => {
    const uniqueProducts = new Map();
    products.forEach((product: PRODUCT) => {
        uniqueProducts.set(product.id, product);
    });
    return Array.from(uniqueProducts.values());
};
