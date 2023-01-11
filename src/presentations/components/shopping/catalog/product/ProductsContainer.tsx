import classnames from 'classnames';
import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';
import { ProductCardSkeleton, ProductCard } from './card/ProductCard';

type PRODUCT_CONTAINER_PROPS = {
    products: PRODUCT[] | undefined;
    isLoading?: boolean;
    numberOfProductsToDisplay: number;
};

export const ProductsContainer = ({
    products,
    isLoading,
    numberOfProductsToDisplay,
}: PRODUCT_CONTAINER_PROPS) => {
    return (
        <ul
            className={classnames(
                'grid',
                'w-full',
                'grid-cols-12',
                'grid-rows-6',
                'gap-x-7',
                'gap-y-7'
            )}
        >
            <ProductList
                isLoading={isLoading}
                numberOfProductsToDisplay={numberOfProductsToDisplay}
                products={products}
            />
        </ul>
    );
};

const productGridClassName = classnames(
    'row-span-6',
    'col-span-full',
    'sm:col-span-6',
    'md:col-span-6',
    'lg:col-span-4',
    'xl:col-span-3',
    '2xl:col-span-3'
);

const ProductList = ({
    products,
    isLoading,
    numberOfProductsToDisplay,
}: PRODUCT_CONTAINER_PROPS) => {
    if (isLoading) {
        return (
            <>
                {new Array(numberOfProductsToDisplay).fill({}).map((_, i) => {
                    if (i > numberOfProductsToDisplay) return <></>;
                    return (
                        <li className={productGridClassName} key={i}>
                            <ProductCardSkeleton />
                        </li>
                    );
                })}
            </>
        );
    }
    return (
        <>
            {products?.map((product: PRODUCT, i) => {
                if (i > numberOfProductsToDisplay) return <div key={i}></div>;
                return (
                    <li className={productGridClassName} key={i}>
                        <ProductCard product={product} />
                    </li>
                );
            })}
        </>
    );
};
