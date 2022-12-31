import { PRODUCT } from 'services/products/types';
import { Row, Column } from 'components/bases/containers/Containers';
import Image from 'next/image';
import useRootStore from 'store/useRoot';
import shallow from 'zustand/shallow';
import { useHasHydrated } from 'lib/hooks/useHasHydrated';

// todo: separate concern of this features
const ShoppingCart = () => {
    const { shoppingCart: basicShoppingCart, user } = useRootStore(
        (state) => ({
            shoppingCart: state.shoppingCart.basic,
            user: state.user,
        }),
        shallow
    );
    const hasHydrated = useHasHydrated();

    const uniqueProducts = Array.from(
        new Set(basicShoppingCart.map((product) => product.id))
    ).map((id) => {
        return basicShoppingCart.find((product) => product.id === id);
    });

    const totalPriceOfProduct = basicShoppingCart.reduce(
        (acc, product) => acc + product.price,
        0
    );

    const hasFreeShipping = totalPriceOfProduct >= 50;

    const shippingPrice = 5.0;
    const totalShoppingPrice = () => {
        if (hasFreeShipping) {
            return totalPriceOfProduct - shippingPrice;
        }
        return totalPriceOfProduct;
    };
    // todo: y a un problème avec le calcul du prix à certains moment

    return (
        <main className="xl:px-32 px-5 pb-10">
            <Row horizontalPosition="between" className="w-full">
                <Column className="w-full">
                    <h1 className="text-3xl font-bold mb-10">Mon panier</h1>
                    <Column as="ul" className="w-full gap-y-10">
                        {hasHydrated &&
                            uniqueProducts.map((product, i) => {
                                return (
                                    <li key={i} className="w-full">
                                        {/* todo: fix this TS warning */}
                                        <ProductCardInShoppingCart
                                            //  @ts-ignore
                                            product={product}
                                        />
                                    </li>
                                );
                            })}
                    </Column>
                </Column>
                <div className="bg-[#EEFCF3] w-full h-96 p-5">
                    <h2 className="text-xl font-bold">Ma commande</h2>
                    {hasHydrated && (
                        <>
                            <p>
                                Livraison:{' '}
                                {hasFreeShipping ? 0.0 : shippingPrice}€
                            </p>
                            <p className="text-lg font-bold">
                                {totalShoppingPrice().toFixed()} €
                            </p>
                        </>
                    )}
                </div>
            </Row>
        </main>
    );
};

const ProductCardInShoppingCart = ({ product }: { product: PRODUCT }) => {
    const { addProduct, deductProduct, removeProduct } =
        useRootStore.getState();

    const { shoppingCart: basicShoppingCart } = useRootStore(
        (state) => ({
            shoppingCart: state.shoppingCart.basic,
            user: state.user,
        }),
        shallow
    );
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

export default ShoppingCart;
