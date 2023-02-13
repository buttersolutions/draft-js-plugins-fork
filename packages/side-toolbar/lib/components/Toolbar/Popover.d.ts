import { ReactElement, ReactNode } from 'react';
import { PopperOptions, SideToolbarPosition } from '../..';
interface PopoverProps {
  referenceElement: HTMLElement | null;
  children: ReactNode;
  className?: string;
  popperOptions?: PopperOptions;
  position: SideToolbarPosition;
}
export default function Popover({
  referenceElement,
  children,
  className,
  position,
  popperOptions,
}: PopoverProps): ReactElement;
export {};
