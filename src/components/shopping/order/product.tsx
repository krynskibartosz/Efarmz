import Image from 'next/image';
import useRootStore from 'src/core/store/useRoot';
import shallow from 'zustand/shallow';
import { useHasHydrated } from 'src/hooks';
import { Row, Column } from 'src/ui';
import { PRODUCT } from 'src/core/infrastructure/api/models/shopping/catalog/product';
import { hasFreeShipping, shippingPrice } from 'src/core/logic/order';

export const ProductCardInShoppingCart = ({
    product,
}: {
    product: PRODUCT;
}) => {
    const { shoppingCart: basicShoppingCart } = useRootStore(
        (state) => ({
            shoppingCart: state.shoppingCart.basic,
        }),
        shallow
    );

    const totalPriceOfProduct = basicShoppingCart.reduce(
        (acc, product) => acc + product.price,
        0
    );

    const { addProduct, deductProduct, removeProduct } =
        useRootStore.getState();

    const totalAddedToCart = basicShoppingCart.filter(
        (el) => el.id === product.id
    );

    return (
        <article className="w-full">
            <Row className="w-full gap-x-5">
                <div className="relative min-h-20 h-20 w-20">
                    <Image
                        fill
                        src={'/food.jpeg'}
                        alt={product.name}
                        className="object-cover rounded-md"
                    />
                </div>
                <Column className="w-full ">
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <p className="text-md font-semibold">
                        {product.price.toFixed(2)} €
                    </p>
                    <p className="text-md font-semibold">
                        {totalAddedToCart.length}
                    </p>
                    <Row className="w-full gap-x-4">
                        <p
                            className="text-green-700 cursor-pointer hover:brightness-110"
                            onClick={() => addProduct(product)}
                        >
                            Ajouter
                        </p>
                        <p
                            className="text-green-700 cursor-pointer hover:brightness-110"
                            onClick={() => deductProduct(product)}
                        >
                            Déduire
                        </p>
                        <p
                            className="text-green-700 cursor-pointer hover:brightness-110"
                            onClick={() => removeProduct(product)}
                        >
                            Supprimer
                        </p>
                    </Row>
                </Column>
            </Row>
        </article>
    );
};
