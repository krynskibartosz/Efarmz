import { useState, useEffect } from 'react';
import { ApiAdapter } from 'src/adapters/api-adapter';
import { ProductService } from 'src/infrastructure/api/client/shopping/catalog/product';
import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/product';

import { ApiPort } from 'src/ports/api';

const api: ApiPort = new ApiAdapter(
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
