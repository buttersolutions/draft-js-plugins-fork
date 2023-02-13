import { ReactElement, FC, ComponentType } from 'react';
import {
  BlockTypeSelectChildProps,
  CreateBlockTypeSelectPopperOptionsFn,
} from '../BlockTypeSelect/BlockTypeSelect';
import { SideToolbarPluginTheme } from '../../theme';
import {
  PopperOptions,
  SideToolbarPluginStore,
  SideToolbarPosition,
} from '../..';
import { SideToolbarButtonProps } from '../BlockTypeSelect/SideToolbarButton';
export type SideToolbarChildrenProps = BlockTypeSelectChildProps;
interface ToolbarProps {
  children?: FC<SideToolbarChildrenProps>;
  store: SideToolbarPluginStore;
  position: SideToolbarPosition;
  theme: SideToolbarPluginTheme;
  popperOptions?: PopperOptions;
  createBlockTypeSelectPopperOptions?: CreateBlockTypeSelectPopperOptionsFn;
  sideToolbarButtonComponent: ComponentType<SideToolbarButtonProps>;
}
export default function Toolbar({
  theme,
  position,
  popperOptions,
  store,
  createBlockTypeSelectPopperOptions,
  children,
  sideToolbarButtonComponent: SideToolbarButton,
}: ToolbarProps): ReactElement | null;
export {};
