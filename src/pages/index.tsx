import { ProductsContainer } from 'src/components/shopping';
import { ApiAdapter } from 'src/adapters/api-adapter';
import { ApiPort } from 'src/ports/api';
import { ProductService } from 'src/core/infrastructure/api/client/shopping/catalog/product';
import { useState, useEffect } from 'react';
import { PRODUCT } from 'src/core/infrastructure/api/models/shopping/catalog/product';

const api: ApiPort = new ApiAdapter(
    process.env.NEXT_PUBLIC_END_POINT as string
);
const productService = new ProductService(api);

function Home() {
    const [products, setProducts] = useState<PRODUCT[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const product = await productService.getProducts();
            setProducts(product as PRODUCT[]);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    return (
        <>
            <main className="xl:px-32 px-5 pb-10 mt-52 w-full">
                <h1 className="text-4xl mb-4 font-bold">
                    Que souhaitez-vous manger cette semaine ?
                </h1>
                {/* // todo: Put this to productShow of home folder */}
                <ProductsContainer
                    numberOfProductsToDisplay={40}
                    products={products}
                    isLoading={loading}
                />
            </main>
        </>
    );
}
export default Home;
