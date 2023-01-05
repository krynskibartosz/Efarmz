import { useState, useEffect } from 'react';
import { ApiAdapter } from 'src/adapters/api-adapter';
import { CategoryService } from 'src/core/infrastructure/api/client/shopping/catalog/category';
import { CATEGORIES } from 'src/core/infrastructure/api/models/shopping/catalog/category';
import { ApiPort } from 'src/ports/api';

const api: ApiPort = new ApiAdapter(
    process.env.NEXT_PUBLIC_END_POINT as string
);
const categoryService = new CategoryService(api);

// todo: check if the categories was already fetched and stop the execution of the categories if is true
export const useFetchProductsCategories = () => {
    const [categories, setCategories] = useState();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const categories = await categoryService.getProductsCategories(
                'categories'
            );
            // @ts-ignore
            setCategories(categories);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    return {
        // @ts-ignore
        categories: categories as CATEGORIES,
        loading,
    };
};
