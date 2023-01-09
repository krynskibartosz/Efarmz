import { ColumnAndRowProps, CommonProps } from './types';
import { getColumnAndRowAlignmentClassNames } from './utils';

export const Column = ({
  children,
  className,
  horizontalPosition = 'left',
  verticalPosition = 'top',
  as = 'div',
  ...rest
}: ColumnAndRowProps): JSX.Element => {
  const HtmlCol = as;

  return (
    <HtmlCol
      className={`flex flex-col ${getColumnAndRowAlignmentClassNames(
        horizontalPosition,
        verticalPosition,
        'column'
      )} ${className}`}
      {...rest}
    >
      {children}
    </HtmlCol>
  );
};

export const Row = ({
  children,
  className,
  horizontalPosition = 'left',
  verticalPosition = 'top',
  as = 'div',
  ...rest
}: ColumnAndRowProps): JSX.Element => {
  const HtmlRow = as;
  return (
    <HtmlRow
      className={`flex flex-row ${getColumnAndRowAlignmentClassNames(
        horizontalPosition,
        verticalPosition,
        'row'
      )} ${className}`}
      {...rest}
    >
      {children}
    </HtmlRow>
  );
};

export const Grids = ({ children, className, as = 'div' }: CommonProps) => {
  const HtmlGrid = as;
  return (
    <HtmlGrid className={`grid grid-cols-12 grid-rows-6 ${className}`}>
      {children}
    </HtmlGrid>
  );
};

export const GridCell = ({ children, className, as = 'div' }: CommonProps) => {
  const HtmlGridCell = as;
  return (
    <HtmlGridCell className={`grid ${className}`}>{children}</HtmlGridCell>
  );
};
