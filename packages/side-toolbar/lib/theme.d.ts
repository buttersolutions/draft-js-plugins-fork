import { DraftJsButtonTheme } from '@draft-js-plugins/buttons';
export interface SideToolbarPluginTheme {
  buttonStyles?: DraftJsButtonTheme;
  blockTypeSelectStyles?: {
    blockType?: string;
    popup?: string;
    arrow?: string;
    popupFrame?: string;
  };
  toolbarStyles?: {
    wrapper?: string;
  };
}
export declare const defaultTheme: SideToolbarPluginTheme;
