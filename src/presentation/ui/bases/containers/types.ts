import { ElementType, ReactNode, CSSProperties } from 'react';

export type ColumnPosition =
  | 'center'
  | 'right'
  | 'left'
  | 'between'
  | 'around'
  | 'evenly'
  | 'stretch'
  | 'normal'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'safe center'
  | 'unsafe center'
  | 'flex-start'
  | 'flex-end';

export type RowPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'between'
  | 'around'
  | 'evenly'
  | 'stretch'
  | 'baseline';

export interface CommonProps {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  width?: string | number;
  height?: string | number;
  [key: string]: unknown;
}

export interface ColumnAndRowProps extends CommonProps {
  verticalPosition?: RowPosition;
  horizontalPosition?: ColumnPosition;
  gap?: string | number;
  [key: string]: unknown;
}

export type SectionProps = {
  /** fill: boolean => set maxWidth to 1200px.
   * @default 1200px
   * */
  children: JSX.Element | JSX.Element[];
  fill?: boolean;
} & CommonProps;
