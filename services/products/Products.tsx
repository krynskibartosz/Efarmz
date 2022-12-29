import { PRODUCT } from 'services/products/types';
import { ProductCard } from 'services/products/ProductCard';

export function Products({ data }: { data: PRODUCT[] }) {
    if (!data) return <p>Loading...</p>;
    return (
        <div>
            <p>Nombre de produits: 40</p>

            <ul
                className={`grid w-full grid-cols-12 gap-y-8 md:gap-x-14 md:gap-y-12`}
            >
                {data.map((product: PRODUCT, i) => {
                    if (i > 40) return <></>;
                    return (
                        <div
                            className="col-span-full md:col-span-6 xl:col-span-4 2xl:col-span-3"
                            key={i}
                        >
                            <ProductCard product={product} />
                        </div>
                    );
                })}
            </ul>
        </div>
    );
}
