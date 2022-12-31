import { PRODUCT } from 'services/products/types';
import {
    ProductCard,
    ProductCardSkeleton,
} from 'services/products/ProductCard';

type PRODUCT_CONTAINER_PROPS = {
    products: PRODUCT[] | undefined;
    isLoading: boolean;
    numberOfProductsToDisplay: number;
};

export function ProductsContainer({
    products,
    isLoading,
    numberOfProductsToDisplay,
}: PRODUCT_CONTAINER_PROPS) {
    return (
        <div>
            <h3 className="mb-2 text-gray-600">
                Nombre de produits: {numberOfProductsToDisplay}
            </h3>

            <ul
                className={`grid w-full grid-cols-12 grid-rows-6 gap-y-8 md:gap-x-14 md:gap-y-12`}
            >
                {/* todo: check how to fix this ts-error */}
                {/* @ts-ignore */}
                <ProductList
                    isLoading={isLoading}
                    numberOfProductsToDisplay={numberOfProductsToDisplay}
                    products={products}
                />
            </ul>
        </div>
    );
}

const ProductList = ({
    products,
    isLoading,
    numberOfProductsToDisplay,
}: PRODUCT_CONTAINER_PROPS) => {
    if (isLoading)
        return new Array(numberOfProductsToDisplay).fill({}).map((_, i) => {
            if (i > numberOfProductsToDisplay) return <></>;
            return (
                <li
                    className="col-span-full row-span-6  md:col-span-6 xl:col-span-4 2xl:col-span-4"
                    key={i}
                >
                    <ProductCardSkeleton />
                </li>
            );
        });
    return products?.map((product: PRODUCT, i) => {
        if (i > numberOfProductsToDisplay) return <></>;
        return (
            <li
                className="col-span-full row-span-6 md:col-span-6 xl:col-span-4 2xl:col-span-4"
                key={product.id}
            >
                <ProductCard product={product} />
            </li>
        );
    });
};
