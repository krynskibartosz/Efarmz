import { Row, Pagination } from 'components';
import { ProductsContainer } from './product/ProductsContainer';

export const ProductsOfACategoryShow = ({
    currentPage,
    setCurrentPage,
    loading,
    categories,
}: {
    currentPage: number;
    setCurrentPage: (e: number) => void;
    loading: boolean;
    categories: CATEGOIES;
}) => {
    return (
        <>
            <Row horizontalPosition="center" className="pb-5 h-20">
                <Pagination
                    currentPage={currentPage}
                    onChangePage={(page: number) => setCurrentPage(page)}
                    // @ts-ignore
                    totalPages={categories?.last_page}
                />
            </Row>

            <ProductsContainer
                // @ts-ignore
                products={categories?.data}
                isLoading={loading}
                // @ts-ignore
                numberOfProductsToDisplay={40}
            />
        </>
    );
};
