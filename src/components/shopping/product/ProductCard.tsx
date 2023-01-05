import Image from 'next/image';
import useRootStore from 'src/core/store/useRoot';
import shallow from 'zustand/shallow';
import classnames from 'classnames';
import { Card, Column, Row, Tooltip } from 'src/ui';
import { PRODUCT } from 'src/core/infrastructure/api/models/shopping/catalog/product';

export const ProductCard = ({ product }: { product: PRODUCT }) => {
    return (
        <article className="h-full">
            <Card>
                <div className="relative w-full">
                    <div
                        className={classnames(
                            'text-white',
                            'text-sm',
                            'font-semibold',
                            'absolute',
                            'py-0.5',
                            'px-3',
                            'top-5',
                            'left-5',
                            'z-10',
                            'bg-[#FF6B7A]',
                            'rounded-md'
                        )}
                    >
                        {product.unit}
                    </div>
                    <div className="relative min-h-52 h-52 w-full">
                        <Image
                            fill
                            src={'/food.jpeg'}
                            alt={product.name}
                            className="object-cover rounded-t-md"
                        />
                    </div>
                </div>

                <Column
                    verticalPosition="between"
                    className="h-full w-full pt-3"
                >
                    <Column
                        verticalPosition="between"
                        className="w-full h-full"
                    >
                        <div className="pb-5 px-5 ">
                            <h3 className="text-gray-700 font-semibold text-lg">
                                {product.name}
                            </h3>
                            <div className="underline hover:brightness-50 text-gray-700 text-sm -translate-y-0.5">
                                <a
                                    aria-label="products"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={product.link}
                                >
                                    {product.brand?.name}
                                </a>
                            </div>
                        </div>
                        <div className="px-5 pb-5">
                            <p className="pb-5 font-bold">
                                {product.price.toFixed(2)} €
                            </p>
                            <Row className="w-ful gap-x-2">
                                <Badges product={product} />
                            </Row>
                        </div>
                    </Column>
                    <Column className="w-full ">
                        <ProductActionButton product={product} />
                        <div className="has-tooltip w-full">
                            {true && (
                                <Tooltip
                                    className="w-full text-sm text-center"
                                    position="bottom"
                                >
                                    Vous devez d'abbord choisir votre crénaux
                                    horaire
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
                                    'rounded-b-md',
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
                                Ajouter à l'abonnement
                            </button>
                        </div>
                    </Column>
                </Column>
            </Card>
        </article>
    );
};

const ProductActionButton = ({ product }: { product: PRODUCT }) => {
    const { addProduct, deductProduct } = useRootStore.getState();

    const { shoppingCart: basicShoppingCart, user } = useRootStore(
        (state) => ({
            shoppingCart: state.shoppingCart.basic,
            user: state.user,
        }),
        shallow
    );
    const { hasMinimalAdress } = user.data;

    const totalAddedToCart = basicShoppingCart.filter(
        (el) => el.id === product.id
    );

    const productWasAlreadySelected = basicShoppingCart.find(
        (el) => el.id === product.id
    );

    if (productWasAlreadySelected) {
        return (
            <Row
                horizontalPosition="between"
                verticalPosition="center"
                className={classnames(
                    'border-t',
                    'rounded-r-md',
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
                        'text-green-700',
                        'py-2',
                        'hover:bg-[#EEFCF3]',
                        'w-full'
                    )}
                    onClick={() => deductProduct(product)}
                >
                    Déduire
                </button>
                <p>{totalAddedToCart.length}</p>
                <button
                    onClick={() => addProduct(product)}
                    className={classnames(
                        'text-green-700',
                        'rounded-l-md',
                        'py-2',
                        'hover:bg-[#EEFCF3]',
                        'w-full',
                        'rounded-md'
                    )}
                >
                    Ajouter
                </button>
            </Row>
        );
    }
    return (
        <div className="w-full has-tooltip">
            {!hasMinimalAdress && (
                <Tooltip className="w-full text-sm text-center" position="top">
                    Vous devez d'abbord choisir votre crénaux horaire
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
                    'text-green-700'
                )}
                onClick={() => addProduct(product)}
            >
                Ajouter au panier
            </button>
        </div>
    );
};

export const ProductCardSkeleton = () => {
    return (
        <Column
            as="article"
            className={classnames(
                'h-fit',
                'w-full',
                'animate-pulse',
                'border',
                'rounded-lg',
                'border-fresh-gray-100'
            )}
        >
            {/* COVER */}
            <div
                className={classnames(
                    'relative',
                    'w-full',
                    'rounded-t-md',
                    'bg-gray-200',
                    'lg:bg-fresh-gray-200',
                    'min-h-52',
                    'h-52'
                )}
            >
                <span
                    className={classnames(
                        'h-5',
                        'w-16',
                        'absolute',
                        'top-5',
                        'left-5',
                        'rounded-md',
                        'bg-gray-100'
                    )}
                />
            </div>
            <Column verticalPosition="between" className=" h-full w-full pt-3">
                <Column className="w-full">
                    <Column className="pb-5 px-5 mb-4 w-full">
                        <span className=" h-[18px] mb-2 w-10/12  rounded-md bg-gray-200" />

                        <span className=" h-3.5 w-4/12   rounded-md bg-gray-100" />
                    </Column>
                    <Column className="px-5 pb-5 w-full">
                        <span className=" h-5 mb-5 w-14  rounded-md bg-gray-200" />
                        <Row className="w-ful gap-x-2">
                            <span className="h-5  w-16  rounded-full bg-gray-100" />
                            <span className="h-5  w-20  rounded-full bg-gray-100" />
                        </Row>
                    </Column>
                </Column>
                <Column className="w-full ">
                    <span className=" h-10  w-full   bg-gray-300" />
                    <span className=" h-10 rounded-b-md  w-full  bg-gray-400" />
                </Column>
            </Column>
        </Column>
    );
};
const Badges = ({ product }: { product: PRODUCT }) => {
    const className =
        'text-[#00C5FF] font-medium border text-sm border-[#00C5FF] rounded-md py-0.5 px-3';
    return (
        <>
            {product.is_bio && <p className={className}>Bio</p>}
            {product.new && <p className={className}>Nouveau</p>}
            {product.fresh && <p className={className}>Frais</p>}
        </>
    );
};
