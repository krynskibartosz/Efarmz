import { useState, useEffect } from 'react';

import { PRODUCT_CATEGORY } from 'src/core/domains/models/shopping/catalog/category/mod_categories';

import useRootStore from 'src/presentations/global-state/useRoot';
import { categoryService } from 'src/services/categories';
import shallow from 'zustand/shallow';

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
        if (categories?.length === 0) {
            fetchProducts();
        }
    }, [categories?.length, setCategoriesToCatalog]);

    return {
        categories: fetchedCategories ?? categories,
        loading,
    };
};
