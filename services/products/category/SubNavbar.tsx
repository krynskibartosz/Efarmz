import { Row } from 'components/bases/containers/Containers';
import { PRODUCT_CATEGORY } from 'services/products/types';

export const SubNavbar = ({
    categories,
}: {
    categories: PRODUCT_CATEGORY[];
}) => {
    return (
        <Row
            horizontalPosition="between"
            className="gap-x-40 !justify-between "
        >
            <p>Searchbar…</p>

            <Row className="gap-x-5 w-full overflow-x-scroll">
                {categories?.map((el, i) => (
                    <div key={i} className="whitespace-nowrap">
                        {el.name}
                    </div>
                ))}
            </Row>
        </Row>
    );
};
