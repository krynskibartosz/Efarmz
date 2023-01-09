import { Row, Pagination } from 'src/presentations/ui';
import { ProductsContainer } from './product/ProductsContainer';
import { PRODUCTS } from 'src/core/domains/models/shopping/catalog/product/mod_product';
import { useFetchItemsByProductCategory } from 'src/presentations/hooks/services/shopping/useFetchItemsByProductCategory';
import { Dispatch, SetStateAction } from 'react';

// const { categories, loading } = useFetchItemsByProductCategory({
//     currentPage,
//     setCurrentPage,
// });
// todo: create on object pagination props
export const ProductsOfACategoryShow = ({
    currentPage,
    setCurrentPage,
    loading,
    categories,
}: {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    loading: boolean;
    categories: PRODUCTS | undefined;
}) => {
    const { categories: CSRCat, loading: CSRLoading } =
        useFetchItemsByProductCategory({ currentPage, setCurrentPage });
    console.log('🚀 ~ file: ProductShow.tsx:24 ~ CSRLoading', CSRLoading);
    const prod = () => {
        if (currentPage === 1) {
            return categories?.data;
        }
        return CSRCat?.products.data;
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
                isLoading={CSRLoading}
                numberOfProductsToDisplay={40}
            />
        </>
    );
};
