import { GetStaticProps } from 'next';
import { ShoppingApiAdapter } from 'src/adapters/shopping-api-adapter';
import { PRODUCTS } from 'src/core/domains/models/shopping/catalog/product/mod_product';
import { ProductService } from 'src/infrastructure/api/shopping/catalog/product';
import { ShoppingApiPort } from 'src/ports/shopping-port';
import { ProductShow } from 'src/presentations/components/home/ProductShow';

const api: ShoppingApiPort = new ShoppingApiAdapter(
    process.env.NEXT_PUBLIC_END_POINT as string
);
const productService = new ProductService(api);

export const getStaticProps: GetStaticProps = async () => {
    let products;
    try {
        products = await productService.getProducts();
    } catch (error) {
        console.error(error);
    }

    return {
        props: {
            products,
        },
        revalidate: 60, // revalidate the component every minutes
    };
};

const Home = ({ products }: { products: PRODUCTS }) => {
    return (
        <>
            <main className="xl:px-32 px-5 pb-10 mt-52 w-full">
                <h1 className="text-4xl mb-4 font-bold text-center">
                    Que souhaitez-vous manger cette semaine ?
                </h1>
                <ProductShow products={products?.data} />
            </main>
        </>
    );
};

export default Home;
