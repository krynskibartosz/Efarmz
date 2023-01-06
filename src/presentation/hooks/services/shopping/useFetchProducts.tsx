import { useState, useEffect } from 'react';

import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';

import { ShoppingApiAdapter } from 'src/adapters/shopping-api-adapter';
import { ShoppingApiPort } from 'src/ports/shopping-port';
import { ProductService } from 'src/infrastructure/api/shopping/catalog/product';

const api: ShoppingApiPort = new ShoppingApiAdapter(
    process.env.NEXT_PUBLIC_END_POINT as string
);
const productService = new ProductService(api);

export const useFetchProducts = () => {
    const [products, setProducts] = useState<PRODUCT[]>();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const product = await productService.getProducts();
            setProducts(product);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    return {
        products: products,
        isLoading,
    };
};
