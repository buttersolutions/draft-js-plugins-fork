import { ComponentType, FC } from 'react';
import { EditorState } from 'draft-js';
import { Store } from '@draft-js-plugins/utils';
import { EditorPlugin } from '@draft-js-plugins/editor';
import * as PopperJS from '@popperjs/core';
import { Modifier } from 'react-popper';
import { SideToolbarChildrenProps } from './components/Toolbar/Toolbar';
import { SideToolbarPluginTheme } from './theme';
import type { SideToolbarButtonProps } from './components/BlockTypeSelect/SideToolbarButton';
import { CreateBlockTypeSelectPopperOptionsFn } from './components/BlockTypeSelect/BlockTypeSelect';
export type { SideToolbarPluginTheme, SideToolbarButtonProps };
export type SideToolbarPosition = 'left' | 'right';
export interface SideToolbarPluginConfig {
  theme?: SideToolbarPluginTheme;
  position?: SideToolbarPosition;
  popperOptions?: PopperOptions;
  sideToolbarButtonComponent?: ComponentType<SideToolbarButtonProps>;
  createBlockTypeSelectPopperOptions?: CreateBlockTypeSelectPopperOptionsFn;
}
export type PopperOptions = Omit<Partial<PopperJS.Options>, 'modifiers'> & {
  createPopper?: typeof PopperJS.createPopper;
  modifiers?: ReadonlyArray<Modifier<unknown>>;
};
export interface SideToolbarProps {
  children?: FC<SideToolbarChildrenProps>;
}
export type SideToolbarPlugin = EditorPlugin & {
  SideToolbar: ComponentType<SideToolbarProps>;
};
interface StoreItemMap {
  isVisible?: boolean;
  getEditorState?(): EditorState;
  setEditorState?(state: EditorState): void;
  editorState?: EditorState;
  getEditorRef?(): {
    refs?: {
      editor: HTMLElement;
    };
    editor: HTMLElement;
  };
}
export type SideToolbarPluginStore = Store<StoreItemMap>;
declare const _default: (config?: SideToolbarPluginConfig) => SideToolbarPlugin;
export default _default;
