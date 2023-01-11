import { Column } from 'components';
import Head from 'next/head';
import { useState } from 'react';
import { PRODUCTS_BY_CATEGORY_RESPONSE } from 'src/core/domains/models/shopping/catalog/product/by-category/mod_products_by_category';
import { ProductsOfACategorySection } from 'src/presentations/components/shopping/catalog/ProductShow';
import useRootStore from 'src/presentations/global-state/useRoot';
import { categoryService } from 'src/services/categories';
import Image from 'next/image';
import { useHasHydrated } from 'lib';

// todo?: Optimiser la pagination pour ne plus fetch certain produit temporairement
interface PRODUCT_CATEGORY {
    categoriesFromApi: PRODUCTS_BY_CATEGORY_RESPONSE;
    categoryName: string;
    categoryId: number;
}

const ProductCategory = ({
    categoriesFromApi,
    categoryName,
    categoryId,
}: PRODUCT_CATEGORY) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { categories } = useRootStore((state) => ({
        categories: state.shoppingCart.catalog.categories,
    }));

    const matchingProduct = categories.find((el) => {
        return el.id === +categoryId;
    });
    const hasHydrated = useHasHydrated();

    return (
        <>
            <Head>
                <title>Efarmz {categoryName} </title>
            </Head>
            <main className=" pb-10  h-full relative w-full">
                <section className="md:mt-[116px] mt-[169px] isolate relative w-full mb-10 h-[300px] md:h-[400px]">
                    <div className="absolute aspect-video object-cover top-0 left-0 w-full h-full -z-20">
                        {hasHydrated && (
                            <Image
                                src={matchingProduct?.banner as string}
                                alt={matchingProduct?.name as string}
                                fill
                            />
                        )}
                    </div>
                    <div className="absolute  top-0 bg-opacity-40 left-0 w-full h-full bg-black -z-10" />
                    <Column
                        horizontalPosition="center"
                        verticalPosition="center"
                        className=" w-full h-full z-0 px-5"
                    >
                        <h1 className="text-4xl text-white text-center pb-2 font-bold ">
                            {categoryName} ({categoriesFromApi.products.total})
                        </h1>
                        <p className="text-center text-gray-100 font-semibold text-xl max-w-xl">
                            {hasHydrated && matchingProduct?.seo_description}
                        </p>
                    </Column>
                </section>
                <section className="xl:px-32 px-5 w-full">
                    <ProductsOfACategorySection
                        categories={categoriesFromApi.products}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </section>
            </main>
        </>
    );
};

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

function extractNumberFromText(string: string) {
    const numbers = string.match(/\b\d+\b/g);
    return numbers?.[0];
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
            categoriesFromApi: categories,
            categoryName: params['product-category']
                .replace(/^\d+--/, '')
                .replaceAll('_', ' '),
            categoryId: extractNumberFromText(params['product-category']),
        },
        revalidate: 120, // 2 minutes
    };
}

export default ProductCategory;
