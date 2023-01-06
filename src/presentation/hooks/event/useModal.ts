import { useState, SyntheticEvent } from 'react';

export type MODAL = {
    opened: string;
    toggle: (e: string) => void;
    close: (e?: SyntheticEvent<HTMLButtonElement>) => void;
};

export const useModal = (): MODAL => {
    const [toggleModal, setToggleModal] = useState('');

    const modal: MODAL = {
        opened: toggleModal,
        toggle: (e: string) => setToggleModal(e),
        close: () => setToggleModal(''),
    };

    return modal;
};
