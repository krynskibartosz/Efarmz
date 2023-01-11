import { GetStaticProps } from 'next';
import { PRODUCTS } from 'src/core/domains/models/shopping/catalog/product/mod_product';
import { ProductShow } from 'src/presentations/components/home/ProductShow';
import { productsService } from 'src/services/products';

export const getStaticProps: GetStaticProps = async () => {
    let products;
    try {
        products = await productsService.getProducts();
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
