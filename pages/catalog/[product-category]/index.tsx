import { ProductsContainer } from 'services/products/ProductsContainer';
import useFetch from 'lib/hooks/useFetch';
import { useRouter } from 'next/router';
import { Pagination } from 'components/forms/Pagination';
import { useState } from 'react';
import { Row } from 'components/bases/containers/Containers';
import Head from 'next/head';

//todo: produits disparrait puis réapparait
const ProductCategory = () => {
    const router = useRouter();
    const { query } = router;
    console.log('🚀 ~ file: index.tsx:7 ~ ProductCategory ~ query', query);
    const [currentPage, setCurrentPage] = useState(1);
    const { data, error, loading } = useFetch(
        `https://dev.efarmz.be/api/v1/categories/${query['product-category']}?page=${currentPage}`
    );

    return (
        <>
            <Head>
                <title>Efarmz - {query['product-category']}</title>
            </Head>
            <main className="xl:px-32 px-5 pb-10 mt-52 h-full relative">
                <Row horizontalPosition="center" className="">
                    <Pagination
                        currentPage={currentPage}
                        onChangePage={(page: number) => setCurrentPage(page)}
                        // @ts-ignore
                        totalPages={data?.products?.last_page}
                    />
                </Row>
                <ProductsContainer
                    // @ts-ignore
                    products={data?.products?.data}
                    isLoading={loading}
                    // @ts-ignore
                    numberOfProductsToDisplay={data?.products?.per_page}
                />
            </main>
        </>
    );
};

export default ProductCategory;
