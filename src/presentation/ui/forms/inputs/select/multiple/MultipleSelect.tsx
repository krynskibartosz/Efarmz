import { MultilpleSelectDesktopInput } from './Desktop';
import { MultilpleSelectMobileInput } from './Mobile';
import { MultilpleSelectSafariInput } from './DesktopSafari';
import { isSafari } from 'react-device-detect';
import { INPUT } from 'src/presentation/ui/forms/types';
import { useMediaQuery } from 'src/presentation/hooks/useMediaQuery';

type MULTIPLE_SELECT = {
    options: any[];
    id: string;
    label: string;
    required?: boolean;
    onChange?: any;
};

export const MultilpleSelectInput = ({ ...rest }: MULTIPLE_SELECT & INPUT) => {
    const { maxLg } = useMediaQuery();

    if (isSafari && !maxLg) return <MultilpleSelectSafariInput {...rest} />;
    if (maxLg) return <MultilpleSelectMobileInput {...rest} />;
    return <MultilpleSelectDesktopInput {...rest} />;
};
