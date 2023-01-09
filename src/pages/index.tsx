import { ProductShow } from 'src/presentations/components/home/ProductShow';
import { useFetchProducts } from 'src/presentations/hooks/services/shopping/useFetchProducts';

const Home = () => {
    const { products, isLoading } = useFetchProducts();

    return (
        <>
            <main className="xl:px-32 px-5 pb-10 mt-52 w-full">
                <h1 className="text-4xl mb-4 font-bold text-center">
                    Que souhaitez-vous manger cette semaine ?
                </h1>
                <ProductShow products={products} isLoading={isLoading} />
            </main>
        </>
    );
};
export default Home;
