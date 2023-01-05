import Head from 'next/head';
import { useState } from 'react';

import { ProductsOfACategoryShow } from 'src/components/shopping/catalog/ProductShow';
import { useFetchItemsByProductCategory } from 'src/hooks/services/shopping/useFetchItemsByProductCategory';

// todo: Optimiser la pagination pour ne plus fetch certain produit temporairement
const ProductCategory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { categories, loading } = useFetchItemsByProductCategory({
        currentPage,
    });

    return (
        <>
            <Head>
                <title>Efarmz </title>
            </Head>
            <main className="xl:px-32 px-5 pb-10 mt-52 h-full relative w-full">
                <ProductsOfACategoryShow
                    categories={categories}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    loading={loading}
                />
            </main>
        </>
    );
};

export default ProductCategory;
