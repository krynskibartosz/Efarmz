import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { ApiAdapter } from 'src/adapters/api-adapter';
import { CategoryService } from 'src/core/infrastructure/api/client/shopping/catalog/category';
import { CATEGORIES } from 'src/core/infrastructure/api/models/shopping/catalog/category';
import { ApiPort } from 'src/ports/api';

export const useFetchProductsCategories = ({
    currentPage,
}: {
    currentPage: number;
}) => {
    const router = useRouter();
    const { query } = router;
    const [categories, setCategories] = useState();
    const [loading, setLoading] = useState(true);

    const api: ApiPort = new ApiAdapter(
        process.env.NEXT_PUBLIC_END_POINT as string
    );
    const categoryService = new CategoryService(api);

    const productQuery = query?.['product-category'];
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            if (query['product-category']) {
                const categories =
                    await categoryService.getProductBasedOnACategoryAndHisCurrentPage(
                        {
                            currentPage,
                            query: productQuery,
                        }
                    );

                setCategories(categories);
                setLoading(false);
            }
        };
        fetchProducts();
    }, [productQuery, currentPage]);
    return {
        categories: categories as CATEGORIES,
        loading,
        productQuery,
    };
};
