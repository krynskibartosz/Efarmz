import { Row, Pagination } from 'src/presentations/ui';
import { ProductsContainer } from './product/ProductsContainer';
import { PRODUCTS } from 'src/core/domains/models/shopping/catalog/product/mod_product';
import { useFetchItemsByProductCategory } from 'src/presentations/hooks/services/shopping/useFetchItemsByProductCategory';
import { Dispatch, SetStateAction } from 'react';

interface PAGINATION_PROPS {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

interface PRODUCTS_OF_A_CATEGORY_SECTION extends PAGINATION_PROPS {
    categories: PRODUCTS | undefined;
}

export const ProductsOfACategorySection = ({
    currentPage,
    setCurrentPage,
    categories,
}: PRODUCTS_OF_A_CATEGORY_SECTION) => {
    const { categories: CSRCat, loading: CSRLoading } =
        useFetchItemsByProductCategory({
            pageNumber: currentPage,
            setPageNumber: setCurrentPage,
        });
    const prod = () => {
        if (currentPage === 1) {
            return categories?.data;
        }
        if (!CSRLoading) {
            return CSRCat?.products.data;
        }
    };
    return (
        <>
            <Row horizontalPosition="center" className="pb-5 h-20">
                <Pagination
                    currentPage={currentPage}
                    onChangePage={(page: number) => setCurrentPage(page)}
                    totalPages={categories?.last_page}
                />
            </Row>

            <ProductsContainer
                products={prod()}
                isLoading={currentPage > 1 && CSRLoading}
                numberOfProductsToDisplay={40}
            />
        </>
    );
};
