import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/product';
import { ProductsContainer } from '../shopping/catalog/product/ProductsContainer';

export const ProductShow = ({
    products,
    isLoading,
}: {
    products: PRODUCT[] | undefined;
    isLoading: boolean;
}) => (
    <section>
        <h2>Nombre de produit {40}</h2>
        <ProductsContainer
            numberOfProductsToDisplay={40}
            products={products}
            isLoading={isLoading}
        />
    </section>
);
