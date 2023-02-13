import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { createStore } from '@draft-js-plugins/utils';
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';
import {
  HeadlineOneButton,
  HeadlineTwoButton,
  BlockquoteButton,
  CodeBlockButton,
  UnorderedListButton,
  OrderedListButton,
} from '@draft-js-plugins/buttons';
import { usePopper } from 'react-popper';

function _extends() {
  _extends = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
  return _extends.apply(this, arguments);
}

function createDefaultPopperOptions(arrowElement) {
  return {
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowElement,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [-4, -4],
        },
      },
    ],
  };
}
function BlockTypeSelect(_ref) {
  var _theme$blockTypeSelec, _theme$blockTypeSelec2, _theme$blockTypeSelec3;
  var theme = _ref.theme,
    getEditorState = _ref.getEditorState,
    setEditorState = _ref.setEditorState,
    childNodes = _ref.childNodes,
    referenceElement = _ref.referenceElement,
    show = _ref.show,
    rootReferenceElement = _ref.rootReferenceElement,
    _ref$createBlockTypeS = _ref.createBlockTypeSelectPopperOptions,
    createBlockTypeSelectPopperOptions =
      _ref$createBlockTypeS === void 0
        ? createDefaultPopperOptions
        : _ref$createBlockTypeS;
  var onMouseDown = useCallback(function (clickEvent) {
    clickEvent.preventDefault();
    clickEvent.stopPropagation();
  }, []);
  var _useState = useState(null),
    popperElement = _useState[0],
    setPopperElement = _useState[1];
  var _useState2 = useState(null),
    arrowElement = _useState2[0],
    setArrowElement = _useState2[1];
  var popperOptions = useMemo(
    function () {
      return createBlockTypeSelectPopperOptions(arrowElement);
    },
    [arrowElement, createBlockTypeSelectPopperOptions]
  );
  var _usePopper = usePopper(referenceElement, popperElement, popperOptions),
    styles = _usePopper.styles,
    attributes = _usePopper.attributes,
    update = _usePopper.update;
  useEffect(
    function () {
      update == null ? void 0 : update();
    },
    [rootReferenceElement, update]
  );
  return /*#__PURE__*/ React.createElement(
    'div',
    _extends(
      {
        className:
          (_theme$blockTypeSelec = theme.blockTypeSelectStyles) == null
            ? void 0
            : _theme$blockTypeSelec.popup,
        ref: setPopperElement,
        style: styles.popper,
      },
      attributes.popper,
      {
        'data-show': show,
        onMouseDown: onMouseDown,
      }
    ),
    /*#__PURE__*/ React.createElement(
      'div',
      {
        className:
          (_theme$blockTypeSelec2 = theme.blockTypeSelectStyles) == null
            ? void 0
            : _theme$blockTypeSelec2.popupFrame,
      },
      childNodes({
        getEditorState: getEditorState,
        setEditorState: setEditorState,
        theme: theme.buttonStyles,
      }),
      /*#__PURE__*/ React.createElement(
        'div',
        _extends(
          {
            ref: setArrowElement,
            style: styles.arrow,
            className:
              (_theme$blockTypeSelec3 = theme.blockTypeSelectStyles) == null
                ? void 0
                : _theme$blockTypeSelec3.arrow,
          },
          attributes.popper
        )
      )
    )
  );
}

function Popover(_ref) {
  var referenceElement = _ref.referenceElement,
    children = _ref.children,
    className = _ref.className,
    position = _ref.position,
    _ref$popperOptions = _ref.popperOptions,
    popperOptions =
      _ref$popperOptions === void 0
        ? {
            placement: position,
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 33],
                },
              },
            ],
          }
        : _ref$popperOptions;
  var _useState = useState(null),
    popperElement = _useState[0],
    setPopperElement = _useState[1];
  var _usePopper = usePopper(referenceElement, popperElement, popperOptions),
    styles = _usePopper.styles,
    attributes = _usePopper.attributes;
  return /*#__PURE__*/ React.createElement(
    'div',
    _extends(
      {
        ref: setPopperElement,
        style: styles.popper,
      },
      attributes.popper,
      {
        className: className,
      }
    ),
    children
  );
}

function DefaultChildren(externalProps) {
  // may be use React.Fragment instead of div to improve perfomance after React 16
  return /*#__PURE__*/ React.createElement(
    'div',
    null,
    /*#__PURE__*/ React.createElement(HeadlineOneButton, externalProps),
    /*#__PURE__*/ React.createElement(HeadlineTwoButton, externalProps),
    /*#__PURE__*/ React.createElement(BlockquoteButton, externalProps),
    /*#__PURE__*/ React.createElement(CodeBlockButton, externalProps),
    /*#__PURE__*/ React.createElement(UnorderedListButton, externalProps),
    /*#__PURE__*/ React.createElement(OrderedListButton, externalProps)
  );
}
function Toolbar(_ref) {
  var _theme$toolbarStyles, _theme$blockTypeSelec;
  var theme = _ref.theme,
    position = _ref.position,
    popperOptions = _ref.popperOptions,
    store = _ref.store,
    createBlockTypeSelectPopperOptions =
      _ref.createBlockTypeSelectPopperOptions,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? DefaultChildren : _ref$children,
    SideToolbarButton = _ref.sideToolbarButtonComponent;
  var _useState = useState(false),
    show = _useState[0],
    setShow = _useState[1];
  var _useState2 = useState(null),
    referenceElement = _useState2[0],
    setReferenceElement = _useState2[1];
  var _useState3 = useState(null),
    buttonReferenceElement = _useState3[0],
    setButtonReferenceElement = _useState3[1];
  var onEditorStateChange = useCallback(function (editorState) {
    var selection = editorState.getSelection();
    if (!selection.getHasFocus()) {
      setReferenceElement(null);
      setShow(false);
      return;
    }
    var currentContent = editorState.getCurrentContent();
    var currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    // TODO verify that always a key-0-0 exists
    var offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
    // Note: need to wait on tick to make sure the DOM node has been create by Draft.js
    setTimeout(function () {
      var node = document.querySelectorAll(
        '[data-offset-key="' + offsetKey + '"]'
      )[0];
      setReferenceElement(node);
    }, 0);
  }, []);
  useEffect(
    function () {
      store.subscribeToItem('editorState', onEditorStateChange);
      return function () {
        store.unsubscribeFromItem('editorState', onEditorStateChange);
      };
    },
    [store]
  );
  if (referenceElement === null) {
    //do not show popover if reference element is not there
    return null;
  }
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement(
      Popover,
      {
        className:
          (_theme$toolbarStyles = theme.toolbarStyles) == null
            ? void 0
            : _theme$toolbarStyles.wrapper,
        referenceElement: referenceElement,
        position: position,
        popperOptions: popperOptions,
      },
      /*#__PURE__*/ React.createElement(
        'div',
        {
          ref: setButtonReferenceElement,
          onMouseEnter: function onMouseEnter() {
            return setShow(true);
          },
          onMouseLeave: function onMouseLeave() {
            return setShow(false);
          },
        },
        /*#__PURE__*/ React.createElement(SideToolbarButton, {
          className:
            (_theme$blockTypeSelec = theme.blockTypeSelectStyles) == null
              ? void 0
              : _theme$blockTypeSelec.blockType,
        })
      )
    ),
    /*#__PURE__*/ React.createElement(BlockTypeSelect, {
      getEditorState: store.getItem('getEditorState'),
      setEditorState: store.getItem('setEditorState'),
      theme: theme,
      childNodes: children,
      referenceElement: buttonReferenceElement,
      show: show,
      rootReferenceElement: referenceElement,
      createBlockTypeSelectPopperOptions: createBlockTypeSelectPopperOptions,
    })
  );
}

var buttonStyles = {
  buttonWrapper: 'b1x6qj4x',
  button: 'b1vm70k4',
  active: 'ah6tpgz',
};
var blockTypeSelectStyles = {
  blockType: 'bloz0n9',
  popupFrame: 'p98xzql',
  popup: 'p1sbsapy',
  arrow: 'a1f9fdzj',
};
var toolbarStyles = {
  wrapper: 'wev3spl',
};
var defaultTheme = {
  buttonStyles: buttonStyles,
  blockTypeSelectStyles: blockTypeSelectStyles,
  toolbarStyles: toolbarStyles,
};

function SideToolbarButton(_ref) {
  var className = _ref.className;
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: className,
    },
    /*#__PURE__*/ React.createElement(
      'svg',
      {
        height: '24',
        viewBox: '0 0 24 24',
        width: '24',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      /*#__PURE__*/ React.createElement('path', {
        d: 'M0 0h24v24H0z',
        fill: 'none',
      }),
      /*#__PURE__*/ React.createElement('path', {
        d: 'M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
      })
    )
  );
}

var index = function (config) {
  if (config === void 0) {
    config = {};
  }
  var defaultPostion = 'left';
  var store = createStore({
    isVisible: false,
  });
  var _config = config,
    _config$position = _config.position,
    position = _config$position === void 0 ? defaultPostion : _config$position,
    _config$theme = _config.theme,
    theme = _config$theme === void 0 ? defaultTheme : _config$theme,
    _config$sideToolbarBu = _config.sideToolbarButtonComponent,
    sideToolbarButtonComponent =
      _config$sideToolbarBu === void 0
        ? SideToolbarButton
        : _config$sideToolbarBu,
    popperOptions = _config.popperOptions,
    createBlockTypeSelectPopperOptions =
      _config.createBlockTypeSelectPopperOptions;
  var SideToolbar = function SideToolbar(props) {
    return /*#__PURE__*/ React.createElement(
      Toolbar,
      _extends({}, props, {
        store: store,
        theme: theme,
        position: position,
        popperOptions: popperOptions,
        sideToolbarButtonComponent: sideToolbarButtonComponent,
        createBlockTypeSelectPopperOptions: createBlockTypeSelectPopperOptions,
      })
    );
  };
  return {
    initialize: function initialize(_ref) {
      var setEditorState = _ref.setEditorState,
        getEditorState = _ref.getEditorState,
        getEditorRef = _ref.getEditorRef;
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
      store.updateItem('getEditorRef', getEditorRef);
    },
    // Re-Render the toolbar on every change
    onChange: function onChange(editorState) {
      store.updateItem('editorState', editorState);
      return editorState;
    },
    SideToolbar: SideToolbar,
  };
};

export { index as default };
