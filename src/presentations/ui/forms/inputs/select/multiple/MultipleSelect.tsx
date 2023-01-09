import { MultilpleSelectDesktopInput } from './Desktop';
import { MultilpleSelectMobileInput } from './Mobile';
import { MultilpleSelectSafariInput } from './DesktopSafari';
import { isSafari } from 'react-device-detect';
import { INPUT } from 'src/presentations/ui/forms/types';
import { useMediaQuery } from 'src/presentations/hooks';
type OPTION = { value: string; label: string };

type MULTIPLE_SELECT = {
    label: string;
    id: string;
    options: OPTION[];
    required?: boolean;
    value: unknown[];
    setValue: (e?: unknown) => void;
};

export const MultilpleSelectInput = ({ ...rest }: MULTIPLE_SELECT & INPUT) => {
    const { maxLg } = useMediaQuery();

    if (isSafari && !maxLg) return <MultilpleSelectSafariInput {...rest} />;
    if (maxLg) return <MultilpleSelectMobileInput {...rest} />;
    return <MultilpleSelectDesktopInput {...rest} />;
};
