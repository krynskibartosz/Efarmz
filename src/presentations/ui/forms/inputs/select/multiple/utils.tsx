import { Row } from 'src/presentations/ui/bases/containers/Containers';
import { XCircleIcon } from '@heroicons/react/24/outline';

export const onChangeHandler = ({
    event,
    setValue,
}: {
    event: React.ChangeEvent<HTMLSelectElement>;
    setValue: (e?: unknown) => void;
}) => {
    const selectedOptions = event.currentTarget.selectedOptions;
    const newColors = [];
    for (let i = 0; i < selectedOptions.length; i++) {
        newColors.push(selectedOptions[i].value);
    }
    setValue(newColors);
};

export const Badge = ({
    text,
    onDelete,
}: {
    text: string;
    onDelete: (el?: unknown) => void;
}) => {
    return (
        <Row
            positionX="center"
            positionY="center"
            className={`rounded-xl bg-fresh-gray-50 px-3 py-1 `}
        >
            <p className={`whitespace-nowrap text-base  text-white md:text-sm`}>
                {text}
            </p>
            <XCircleIcon
                className="icon ml-2 h-5 w-5 text-fresh-gray-100"
                onClick={onDelete}
            />
        </Row>
    );
};
