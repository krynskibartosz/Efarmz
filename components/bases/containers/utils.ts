import { ColumnPosition, RowPosition } from './types';

const ColumnX = {
    center: 'items-center',
    left: 'items-start',
    right: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
};
const RowY = {
    center: 'items-center',
    top: 'items-start',
    bottom: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
};

const RowX = {
    center: 'justify-center',
    left: 'justify-start',
    right: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
    stretch: 'justify-stretch',
};

const ColumnY = {
    center: 'justify-center',
    top: 'justify-start',
    bottom: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
    stretch: 'justify-stretch',
};

export const getColumnAndRowAlignmentClassNames = (
    horizontalPosition: ColumnPosition,
    verticalPosition: RowPosition,
    type: 'column' | 'row'
) => {
    let posX = '';
    let posY = '';
    if (type === 'column') {
        posY = ColumnY[verticalPosition] || 'justify-start';
        posX = ColumnX[horizontalPosition] || 'items-start';
    } else if (type === 'row') {
        posY = RowY[verticalPosition] || 'items-start';
        posX = RowX[horizontalPosition] || 'justify-start';
    }
    return `${posX} ${posY}`;
};
