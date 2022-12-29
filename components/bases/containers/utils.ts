import { ColumnPosition, RowPosition } from './types';

export const getColumnAndRowAlignmentClassNames = (
  horizontalClassName: ColumnPosition,
  verticalPosition: RowPosition,
  type: 'column' | 'row'
) => {
  const alignmentClassNames = {
    center: 'justify-center items-center',
    left: 'justify-start items-start',
    right: 'justify-end items-end',
    top: 'justify-start items-start',
    bottom: 'justify-end items-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
    stretch: 'justify-stretch items-stretch',
    normal: 'justify-normal',
    baseline: 'items-baseline',
    'space-between': 'justify-space-between',
    'space-around': 'justify-space-around',
    'space-evenly': 'justify-space-evenly',
    'safe center': 'justify-safe center',
    'unsafe center': 'justify-unsafe center',
    'flex-start': 'justify-flex-start',
    'flex-end': 'justify-flex-end',
  };

  let posX = '';
  let posY = '';
  switch (type) {
    case 'column':
      posY =
        alignmentClassNames[verticalPosition] ?? 'justify-start items-start';
      posX =
        alignmentClassNames[horizontalClassName] ?? 'justify-start items-start';
      break;
    case 'row':
      posY =
        alignmentClassNames[verticalPosition] ?? 'justify-start items-start';
      posX =
        alignmentClassNames[horizontalClassName] ?? 'justify-start items-start';
      break;
    default:
      break;
  }
  return `${posX} ${posY}`;
};
