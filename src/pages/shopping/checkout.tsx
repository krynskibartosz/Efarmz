import Head from 'next/head';

import { Row, Column } from 'src/ui';
import { CommandResume } from 'src/components/shopping/checkout/CommandResume';
import { ShoppingCart } from 'src/components/shopping/checkout/ShoppingCart';

const Checkout = () => {
    return (
        <>
            <Head>
                <title>Efarmz - Shopping Cart</title>
            </Head>
            <main className="xl:px-32 px-5 pb-10 mt-52">
                <Row
                    horizontalPosition="between"
                    className="w-full flex-col md:flex-row gap-y-10"
                >
                    <Column className="w-full order-2 md:order-1">
                        <h1 className="text-3xl font-bold mb-10">Mon panier</h1>
                        <ShoppingCart />
                    </Column>
                    <Column className="bg-[#EEFCF3]  h-96 p-5 order-1 md:order-2 w-full">
                        <h2 className="text-xl font-bold">
                            Mon résumé de commande
                        </h2>
                        <CommandResume />
                    </Column>
                </Row>
            </main>
        </>
    );
};

export default Checkout;
