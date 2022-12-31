import { Row } from 'components/bases/containers/Containers';
import Link from 'next/link';
import { PRODUCT_CATEGORY } from 'services/products/types';

export const SubNavbar = ({
    categories,
}: {
    categories: PRODUCT_CATEGORY[];
}) => {
    const formatName = (name: string) => name.replace(/ /g, '_');
    return (
        <Row
            horizontalPosition="between"
            className="xl:gap-x-40 gap-x-5  !justify-between "
        >
            <p>Searchbar…</p>

            <Row className="gap-x-5 w-full overflow-x-scroll">
                {categories?.map((el, i) => {
                    return (
                        <Link
                            href={`/catalog/${el.id}--${formatName(el.name)}`}
                            key={i}
                            className="whitespace-nowrap"
                        >
                            {el.name}
                        </Link>
                    );
                })}
            </Row>
        </Row>
    );
};
