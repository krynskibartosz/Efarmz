import { useRef, useEffect, MouseEvent, cloneElement } from 'react';

interface ClickOutsideProps {
    active?: boolean;
    onClick: (e?: MouseEvent) => void;
    children: JSX.Element;
    log?: boolean;
}

const isInDOM = (obj: any) => {
    return Boolean(obj.closest('body'));
};

const hasParent = (element: any, root: any, log?: boolean) => {
    if (!root) return root;
    return root && root.contains(element) && isInDOM(element);
};

export const ClickOutside = ({
    active = true,
    onClick,
    children,
    log,
}: ClickOutsideProps) => {
    const innerRef = useRef();

    const handleClick = (e: any) => {
        if (!hasParent(e.target, innerRef?.current, log)) {
            if (typeof onClick === 'function') {
                onClick(e);
            }
        }
    };

    useEffect(() => {
        if (active) {
            document.addEventListener('mousedown', handleClick);
            document.addEventListener('touchstart', handleClick);
        }

        return () => {
            if (active) {
                document.removeEventListener('mousedown', handleClick);
                document.removeEventListener('touchstart', handleClick);
            }
        };
    });

    return cloneElement(children, { ref: innerRef });
};
