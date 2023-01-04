import Head from 'next/head';
import { useState } from 'react';
import { useFetchProductsCategories } from 'src/hooks/services/useFetchProductsCategories';
import { ProductsOfACategoryShow } from 'src/components/shopping/catalog/ProductShow';

// todo: Optimiser la pagination pour ne plus fetch certain produit temporairement
const ProductCategory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { categories, loading, productQuery } = useFetchProductsCategories({
        currentPage,
    });

    return (
        <>
            <Head>
                <title>Efarmz - {productQuery}</title>
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
