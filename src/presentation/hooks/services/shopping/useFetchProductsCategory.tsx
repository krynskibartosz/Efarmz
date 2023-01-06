import { useState, useEffect } from 'react';

import { PRODUCT_CATEGORY_API_RESPONSE } from 'src/core/domains/models/shopping/catalog/category/mod_category';

import { ShoppingApiAdapter } from 'src/adapters/shopping-api-adapter';
import { ShoppingApiPort } from 'src/ports/shopping-port';
import { CategoryService } from 'src/infrastructure/api/shopping/catalog/category';

const api: ShoppingApiPort = new ShoppingApiAdapter(
    process.env.NEXT_PUBLIC_END_POINT as string
);
const categoryService = new CategoryService(api);

// todo: check if the categories was already fetched and stop the execution of the categories if is true
export const useFetchProductsCategories = () => {
    const [categories, setCategories] =
        useState<PRODUCT_CATEGORY_API_RESPONSE>();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const categories = await categoryService.getProductsCategories(
                'categories'
            );
            setCategories(categories);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    return {
        categories: categories,
        loading,
    };
};
