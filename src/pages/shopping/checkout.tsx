import { Row } from 'src/presentations/ui';
import Head from 'next/head';
import { Receipt } from 'src/presentations/components/shopping/checkout/receipt';
import { ShoppingCart } from 'src/presentations/components/shopping/checkout/shopping-cart/ShoppingCart';

const Checkout = () => {
    return (
        <>
            <Head>
                <title>Efarmz - Shopping Cart</title>
            </Head>
            <main className="xl:px-32 px-5 pb-10 mt-52">
                <Row
                    horizontalPosition="between"
                    className="w-full flex-col md:flex-row gap-x-10"
                >
                    <ShoppingCart />
                    <Receipt />
                </Row>
            </main>
        </>
    );
};

export default Checkout;
