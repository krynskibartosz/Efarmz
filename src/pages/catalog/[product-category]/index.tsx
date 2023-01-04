import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Pagination, Row } from 'src/ui';
import { ProductsContainer } from 'src/components/shopping';
import { ApiAdapter } from 'src/adapters/api-adapter';
import { ApiPort } from 'src/ports/api';
import { CategoryService } from 'src/core/infrastructure/api/client/shopping/catalog/category';

const api: ApiPort = new ApiAdapter(
    process.env.NEXT_PUBLIC_END_POINT as string
);
const categoryService = new CategoryService(api);

// todo: Optimiser la pagination pour ne plus fetch certain produit temporairement
const ProductCategory = () => {
    const router = useRouter();
    const { query } = router;
    const productQuery = query?.['product-category'];

    const [currentPage, setCurrentPage] = useState(1);

    const [categories, setCategories] = useState();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            if (query['product-category']) {
                const categories =
                    await categoryService.getProductBasedOnACategoryAndHisCurrentPage(
                        {
                            currentPage,
                            query: productQuery,
                        }
                    );

                setCategories(categories);
                setLoading(false);
            }
        };
        fetchProducts();
    }, [productQuery, currentPage]);

    return (
        <>
            <Head>
                <title>Efarmz - {productQuery}</title>
            </Head>
            <main className="xl:px-32 px-5 pb-10 mt-52 h-full relative">
                <Row horizontalPosition="center" className="">
                    <Pagination
                        currentPage={currentPage}
                        onChangePage={(page: number) => setCurrentPage(page)}
                        // @ts-ignore
                        totalPages={categories?.last_page}
                    />
                </Row>
                {/* //todo: create an instance of this component inside the catalog folder */}
                <ProductsContainer
                    // @ts-ignore
                    products={categories?.data}
                    isLoading={loading}
                    // @ts-ignore
                    numberOfProductsToDisplay={categories?.per_page}
                />
            </main>
        </>
    );
};

export default ProductCategory;
