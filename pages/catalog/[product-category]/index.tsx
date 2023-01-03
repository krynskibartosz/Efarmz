import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import { useFetch } from 'lib/hooks';
import { Pagination, Row } from 'components/';
import { ProductsContainer } from 'products';

//todo: produits disparrait puis réapparait
const ProductCategory = () => {
    const router = useRouter();
    const { query } = router;
    const [currentPage, setCurrentPage] = useState(1);
    const { data, error, loading } = useFetch(
        `${process.env.NEXT_PUBLIC_END_POINT}categories/${query['product-category']}?page=${currentPage}`,
        { method: 'GET' },
        60000
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
