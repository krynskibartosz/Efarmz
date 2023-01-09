import { ElementType, ReactNode } from 'react';
import { Column } from './containers/Containers';

interface CARD {
    children: JSX.Element | ReactNode | ReactNode[];
    as: ElementType;
}

const MobileHover = ({ children }: { children: ReactNode | ReactNode[] }) => (
    <div className="h-full w-full rounded-md max-md:hover:bg-fresh-gray-50">
        {children}
    </div>
);

export const Card = ({ children, as = 'div' }: CARD) => {
    return (
        <MobileHover>
            <Column className={`h-full  shadow-main`} as={as}>
                {children}
            </Column>
        </MobileHover>
    );
};
