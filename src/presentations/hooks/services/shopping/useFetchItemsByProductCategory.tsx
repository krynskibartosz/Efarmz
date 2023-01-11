import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { PRODUCTS_BY_CATEGORY_RESPONSE } from 'src/core/domains/models/shopping/catalog/product/by-category/mod_products_by_category';
import { useUpdateEffect } from 'lib';
import { categoryService } from 'src/services/categories';

const CATEGORY_QUERY_NAME = 'product-category';

interface Props {
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

export const useFetchItemsByProductCategory = ({
    pageNumber,
    setPageNumber,
}: Props) => {
    interface State {
        categories: PRODUCTS_BY_CATEGORY_RESPONSE | undefined;
        loading: boolean;
        error: boolean;
    }

    const router = useRouter();
    const { query } = router;
    const [state, setState] = useState<State>({
        categories: undefined,
        loading: false,
        error: false,
    });

    const fetchData = async () => {
        setState((currentState) => ({ ...currentState, loading: true }));
        try {
            const categories =
                await categoryService.getProductBasedOnACategoryAndHisCurrentPage(
                    {
                        currentPage: pageNumber,
                        query: query[CATEGORY_QUERY_NAME] as string,
                    }
                );
            setState({
                categories: categories,
                loading: false,
                error: false,
            });
        } catch (error) {
            setState((currentState) => ({
                ...currentState,
                loading: false,
                error: false,
            }));
        }
    };

    useUpdateEffect(() => {
        setPageNumber(1);
    }, [query, setPageNumber]);

    useEffect(() => {
        if (pageNumber > 1) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber, query]);

    return {
        categories: state.categories,
        loading: state.loading,
        error: state.error,
        query: query[CATEGORY_QUERY_NAME],
    };
};
