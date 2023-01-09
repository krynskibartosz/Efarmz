import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { ShoppingApiAdapter } from 'src/adapters/shopping-api-adapter';
import { ShoppingApiPort } from 'src/ports/shopping-port';
import { CategoryService } from 'src/infrastructure/api/shopping/catalog/category';
import { PRODUCTS_BY_CATEGORY_RESPONSE } from 'src/core/domains/models/shopping/catalog/product/by-category/mod_products_by_category';

const api: ShoppingApiPort = new ShoppingApiAdapter(
    process.env.NEXT_PUBLIC_END_POINT as string
);

const categoryService = new CategoryService(api);

export const useFetchItemsByProductCategory = ({
    currentPage,
}: {
    currentPage: number;
}) => {
    const router = useRouter();
    const { query } = router;
    const [categories, setCategories] =
        useState<PRODUCTS_BY_CATEGORY_RESPONSE>();
    const [loading, setLoading] = useState(true);

    const productQuery = query?.['product-category'];
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            if (query['product-category']) {
                const categories =
                    await categoryService.getProductBasedOnACategoryAndHisCurrentPage(
                        {
                            currentPage,
                            query: productQuery as string,
                        }
                    );

                setCategories(categories);
                setLoading(false);
            }
        };
        fetchProducts();
    }, [productQuery, currentPage, query]);
    return {
        categories: categories,
        loading,
        productQuery,
    };
};
