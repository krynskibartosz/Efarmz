import { ReactNode } from 'react';
import { Column } from './containers/Containers';

interface CARD {
    children: JSX.Element | ReactNode | ReactNode[];
}

const MobileHover = ({ children }: { children: ReactNode | ReactNode[] }) => (
    <div className="h-full w-full rounded-md max-md:hover:bg-fresh-gray-50">
        {children}
    </div>
);

export const Card = ({ children }: CARD) => {
    return (
        <MobileHover>
            <Column
                className={`h-full rounded-md border border-gray-200 shadow-main`}
            >
                {children}
            </Column>
        </MobileHover>
    );
};
