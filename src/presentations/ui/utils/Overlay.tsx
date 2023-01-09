import { Row } from 'src/presentations/ui/bases/containers/Containers';
import { ClickOutside } from './ClickOutside';
import { Portal } from './Portal';

interface OverlayProps {
    hidden: boolean;
    onClickOutside: () => void;
    children: JSX.Element;
    bgClassName?: string;
    contentClassName?: string;
    onClick?: () => void;
    id?: string;
    style?: Record<string, string>;
}

// Background overlay
// handle OPEN/CLOSE & animation
export const Overlay = ({
    hidden,
    onClickOutside,
    children,
    bgClassName = 'bg-fresh-gray-900 bg-opacity-70',
    contentClassName,
    onClick,
    style,
    ...rest
}: OverlayProps) => {
    const visibility = hidden ? 'opacity-100  ' : 'opacity-0  -z-50';

    return (
        <Portal {...rest}>
            <Row
                className={`fixed top-0  left-0 z-50 min-h-screen w-screen md:backdrop-blur-xl ${visibility} ${bgClassName}`}
                style={{
                    zIndex: hidden ? 9998 : -99999,
                    pointerEvents: hidden ? 'auto' : 'none',
                    visibility: hidden ? 'visible' : 'hidden',
                }}
            >
                <ClickOutside onClick={onClickOutside}>
                    <div
                        onClick={onClick}
                        className={`m-0 flex  h-[103vh] max-h-screen w-full flex-col items-center justify-center md:m-auto md:!max-h-[90vh] md:!max-w-[550px]  xl:w-1/2   ${visibility} ease-in-out ${contentClassName}`}
                        style={{
                            zIndex: hidden ? 999999 : -99999,
                            transform: hidden
                                ? 'translateY(0)'
                                : 'translateY(100vh)',
                            transitionDuration: '600ms, 200ms',
                            transitionProperty: 'transform, opacity',
                            ...style,
                        }}
                    >
                        {hidden && children}
                    </div>
                </ClickOutside>
            </Row>
        </Portal>
    );
};
