/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */

import Head from 'next/head';
import { useState } from 'react';
import { ShoppingApiAdapter } from 'src/adapters/shopping-api-adapter';
import { CategoryService } from 'src/infrastructure/api/shopping/catalog/category';
import { ShoppingApiPort } from 'src/ports/shopping-port';
import { ProductsOfACategoryShow } from 'src/presentations/components/shopping/catalog/ProductShow';

// todo: Optimiser la pagination pour ne plus fetch certain produit temporairement
const ProductCategory = ({ categories, loading }: any) => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <>
            <Head>
                <title>Efarmz </title>
            </Head>
            <main className="xl:px-32 px-5 pb-10 mt-52 h-full relative w-full">
                <ProductsOfACategoryShow
                    categories={categories?.products}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    loading={loading}
                />
            </main>
        </>
    );
};

// const productService = new ProductService(api);

const api: ShoppingApiPort = new ShoppingApiAdapter(
    process.env.NEXT_PUBLIC_END_POINT as string
);

const categoryService = new CategoryService(api);

export async function getStaticPaths() {
    // Get the list of product categories
    // const categories = await categoryService.getProductsCategories(
    //     'categories'
    // );
    // Generate the paths based on the list of categories
    // const paths = categories.data.map((category) => ({
    //     params: { 'product-category': formatName(category.name) },
    // }));

    return {
        paths: [],
        // Enable fallback so that non-existing paths are rendered on demand
        fallback: 'blocking',
    };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function getStaticProps({ params }) {
    // Fetch the data for the specified category
    const categories =
        await categoryService.getProductBasedOnACategoryAndHisCurrentPage({
            currentPage: 1,
            query: params['product-category'],
        });

    return {
        props: {
            categories,
            loading: false,
            productQuery: params['product-category'],
        },
        revalidate: 120, // 2 minutes
    };
}

export default ProductCategory;
