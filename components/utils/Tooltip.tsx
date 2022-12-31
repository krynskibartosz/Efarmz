import { ReactNode } from 'react';

type TooltipProps = {
    children: ReactNode[] | ReactNode;
    position: 'right' | 'top' | 'bottom' | 'left';
    className?: string;
};

export const Tooltip = ({
    children,
    position,
    className,
}: TooltipProps): JSX.Element => {
    let tooltipPosition;
    switch (position) {
        case 'right':
            tooltipPosition = 'left-full ml-2 top-1/2 -translate-y-1/2';
            break;
        case 'left':
            tooltipPosition = 'right-full mr-2 top-1/2 -translate-y-1/2';
            break;
        case 'bottom':
            tooltipPosition = 'top-full mt-1 left-1/2 -translate-x-1/2';
            break;
        case 'top':
            tooltipPosition = 'bottom-full mb-1 left-1/2 -translate-x-1/2';
            break;
        default:
            'left-full ml-2 top-1/2 -translate-y-1/2';
            break;
    }

    return (
        <span
            className={`px-3 py-1 z-50 border border-gray-100 bg-white rounded-md  tooltip text-gray-700  ${tooltipPosition} ${className}`}
        >
            {children}
        </span>
    );
};
