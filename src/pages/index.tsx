import { API_PRODUCT_RESPONSE } from 'src/core/store/shopping/types';
import { useFetch } from 'src/hooks';
import { ProductsContainer } from 'src/components/shopping';

function Home() {
    // todo: move this to core api
    const { data: products, loading: isProductsLoading } =
        useFetch<API_PRODUCT_RESPONSE>(
            `${process.env.NEXT_PUBLIC_END_POINT}products`,
            { method: 'GET' },
            60000
        );

    return (
        <>
            <main className="xl:px-32 px-5 pb-10 mt-52 w-full">
                <h1 className="text-4xl mb-4 font-bold">
                    Que souhaitez-vous manger cette semaine ?
                </h1>
                {/* // todo: Put this to productShow of home folder */}
                <ProductsContainer
                    numberOfProductsToDisplay={40}
                    products={products?.data}
                    isLoading={isProductsLoading}
                />
            </main>
        </>
    );
}
export default Home;
