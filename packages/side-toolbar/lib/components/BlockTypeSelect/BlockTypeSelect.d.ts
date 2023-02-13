import { EditorState } from 'draft-js';
import { DraftJsButtonTheme } from '@draft-js-plugins/buttons';
import { FC, ReactElement } from 'react';
import { SideToolbarPluginTheme } from '../../theme';
import { PopperOptions } from '../..';
export interface BlockTypeSelectChildProps {
  theme: DraftJsButtonTheme;
  getEditorState(): EditorState;
  setEditorState(state: EditorState): void;
}
export interface CreateBlockTypeSelectPopperOptionsFn {
  (arrowElement: HTMLElement | null): PopperOptions;
}
interface BlockTypeSelectProps {
  theme: SideToolbarPluginTheme;
  getEditorState(): EditorState;
  setEditorState(state: EditorState): void;
  childNodes: FC<BlockTypeSelectChildProps>;
  referenceElement: HTMLElement | null;
  rootReferenceElement: HTMLElement | null;
  show: boolean;
  createBlockTypeSelectPopperOptions?: CreateBlockTypeSelectPopperOptionsFn;
}
export default function BlockTypeSelect({
  theme,
  getEditorState,
  setEditorState,
  childNodes,
  referenceElement,
  show,
  rootReferenceElement,
  createBlockTypeSelectPopperOptions,
}: BlockTypeSelectProps): ReactElement;
export {};
