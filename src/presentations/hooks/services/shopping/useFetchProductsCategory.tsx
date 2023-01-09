import { useState, useEffect } from 'react';

import {
    PRODUCTS_CATEGORIES_API_RESPONSE,
    PRODUCT_CATEGORY,
} from 'src/core/domains/models/shopping/catalog/category/mod_categories';

import { ShoppingApiAdapter } from 'src/adapters/shopping-api-adapter';
import { ShoppingApiPort } from 'src/ports/shopping-port';
import { CategoryService } from 'src/infrastructure/api/shopping/catalog/category';
import useRootStore from 'src/presentations/global-state/useRoot';
import shallow from 'zustand/shallow';

const api: ShoppingApiPort = new ShoppingApiAdapter(
    process.env.NEXT_PUBLIC_END_POINT as string
);
const categoryService = new CategoryService(api);

export const useFetchProductsCategories = () => {
    const {
        catalog: { categories },
    } = useRootStore(
        (state) => ({
            catalog: state.shoppingCart.catalog,
        }),
        shallow
    );
    const { setCategoriesToCatalog } = useRootStore.getState();

    const [fetchedCategories, setFetchedCategories] =
        useState<PRODUCT_CATEGORY[]>();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const categories = await categoryService.getProductsCategories(
                'categories'
            );
            setFetchedCategories(categories.data);
            setCategoriesToCatalog(categories.data);
            setLoading(false);
        };
        if (categories.length === 0) {
            fetchProducts();
        }
    }, [categories.length, setCategoriesToCatalog]);

    return {
        categories: fetchedCategories ?? categories,
        loading,
    };
};
