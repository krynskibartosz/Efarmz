import { useRef, useEffect, MouseEvent, cloneElement } from 'react';

type HANDLE_CLICK = (e: unknown) => void;

interface ClickOutsideProps {
    active?: boolean;
    onClick: HANDLE_CLICK;
    children: JSX.Element;
}

type IsInDOMProps = HTMLElement;

const isInDOM = (obj: IsInDOMProps) => {
    return Boolean(obj.closest('body'));
};

const hasParent = (element: HTMLElement, root: Element | undefined) => {
    if (!root) return root;
    return root && root.contains(element) && isInDOM(element);
};

export const ClickOutside = ({
    active = true,
    onClick,
    children,
}: ClickOutsideProps) => {
    const innerRef = useRef<HTMLElement>();

    const handleClick = (e: MouseEvent) => {
        if (!hasParent(e.target as HTMLElement, innerRef?.current)) {
            if (typeof onClick === 'function') {
                onClick(e);
            }
        }
    };

    useEffect(() => {
        if (active) {
            document.addEventListener('mousedown', handleClick as HANDLE_CLICK);
            document.addEventListener(
                'touchstart',
                handleClick as HANDLE_CLICK
            );
        }

        return () => {
            if (active) {
                document.removeEventListener(
                    'mousedown',
                    handleClick as HANDLE_CLICK
                );
                document.removeEventListener(
                    'touchstart',
                    handleClick as HANDLE_CLICK
                );
            }
        };
    });

    return cloneElement(children, { ref: innerRef });
};
