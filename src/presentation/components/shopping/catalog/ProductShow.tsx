import { Row, Pagination } from 'components';
import { ProductsContainer } from './product/ProductsContainer';
import { PRODUCTS } from 'src/core/domains/models/shopping/catalog/product/mod_product';

export const ProductsOfACategoryShow = ({
    currentPage,
    setCurrentPage,
    loading,
    categories,
}: {
    currentPage: number;
    setCurrentPage: (e: number) => void;
    loading: boolean;
    categories: PRODUCTS | undefined;
}) => {
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
                products={categories?.data}
                isLoading={loading}
                numberOfProductsToDisplay={40}
            />
        </>
    );
};
