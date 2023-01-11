import classnames from 'classnames';
import { Column, Row, Tooltip } from 'components';
import { useHasHydrated } from 'lib';
import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';
import useRootStore from 'src/presentations/global-state/useRoot';

export const ProductActions = ({ product }: { product: PRODUCT }) => {
    return (
        <Column className="w-full ">
            <div className="w-full min-h-[41px]">
                <BasicShoppingActionButton product={product} />
            </div>
            <div className="w-full min-h-[41px]">
                <SubscriptionsShoppingActionsButton />
            </div>
        </Column>
    );
};

const BasicShoppingActionButton = ({ product }: { product: PRODUCT }) => {
    const { addProduct, deductProduct } = useRootStore.getState();

    const { shoppingCart: basicShoppingCart, user } = useRootStore((state) => ({
        shoppingCart: state.shoppingCart.basic,
        user: state.user,
    }));
    const { hasMinimalAdress } = user.data;

    const numberOfProductsSelectedByCartToCart = basicShoppingCart.filter(
        (el) => el.id === product.id
    );

    const productWasAlreadySelected = basicShoppingCart.find(
        (el) => el.id === product.id
    );

    const hasHydrated = useHasHydrated();
    // if (!hasHydrated) return <></>;
    if (hasHydrated && productWasAlreadySelected) {
        return (
            <Row
                horizontalPosition="between"
                verticalPosition="center"
                className={classnames(
                    'border-t',
                    'rounded-r-xl',
                    'transition-all',
                    'duration-300',
                    'ease-in-out',
                    'border-[#CBF6DA]',
                    'font-semibold',
                    'w-full'
                )}
            >
                <button
                    className={classnames(
                        'text-green-700 text-base',
                        'py-2',
                        'hover:bg-[#EEFCF3]',
                        'w-full'
                    )}
                    onClick={() => deductProduct(product)}
                >
                    Déduire
                </button>
                <p>{numberOfProductsSelectedByCartToCart.length}</p>
                <button
                    onClick={() => addProduct(product)}
                    className={classnames(
                        'text-green-700 text-base',
                        'rounded-l-xl',
                        'py-2',
                        'hover:bg-[#EEFCF3]',
                        'w-full',
                        'roundedxld'
                    )}
                >
                    Ajouter
                </button>
            </Row>
        );
    }
    if (hasHydrated && !productWasAlreadySelected) {
        return (
            <div className="w-full has-tooltip">
                {!hasMinimalAdress && (
                    <Tooltip
                        className="w-full text-sm text-center"
                        position="top"
                    >
                        {"Vous devez d'abbord choisir votre crénaux horaire"}
                    </Tooltip>
                )}
                <button
                    disabled={!hasMinimalAdress}
                    className={classnames(
                        'border-t',
                        'transition-all',
                        'duration-300',
                        'ease-in-out',
                        'border-[#CBF6DA]',
                        'disabled:hover:bg-white',
                        'disabled:opacity-60',
                        'disabled:cursor-not-allowed',
                        'hover:bg-[#EEFCF3]',
                        'font-semibold',
                        'py-2',
                        'w-full',
                        'text-green-700 text-base'
                    )}
                    onClick={() => addProduct(product)}
                >
                    Ajouter au panier
                </button>
            </div>
        );
    }
    return <></>;
};

const SubscriptionsShoppingActionsButton = () => {
    return (
        <div className="has-tooltip w-full">
            {true && (
                <Tooltip
                    className="w-full text-sm text-center"
                    position="bottom"
                >
                    {"Vous devez d'abbord choisir votre crénaux horaire"}
                </Tooltip>
            )}

            <button
                disabled={true}
                className={classnames(
                    'bg-green-700',
                    'transition-all',
                    'duration-300',
                    'ease-in-out',
                    'disabled:hover:brightness-100',
                    'rounded-b-xl',
                    'hover:brightness-110',
                    'light',
                    'font-semibold',
                    'disabled:cursor-not-allowed',
                    'disabled:opacity-60',
                    'py-2',
                    'w-full',
                    'text-white'
                )}
            >
                {"Ajouter à l'abonnement"}
            </button>
        </div>
    );
};
