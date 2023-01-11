import { useState, useEffect } from 'react';

import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';
import { productsService } from 'src/services/products';

export const useFetchProducts = () => {
    const [products, setProducts] = useState<PRODUCT[]>();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const product = await productsService.getProducts();
            setProducts(product.data);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    return {
        products: products,
        isLoading,
    };
};
