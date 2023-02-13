'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var utils = require('@draft-js-plugins/utils');
var DraftOffsetKey = require('draft-js/lib/DraftOffsetKey');
var buttons = require('@draft-js-plugins/buttons');
var reactPopper = require('react-popper');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
var DraftOffsetKey__default =
  /*#__PURE__*/ _interopDefaultLegacy(DraftOffsetKey);

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
  var onMouseDown = React.useCallback(function (clickEvent) {
    clickEvent.preventDefault();
    clickEvent.stopPropagation();
  }, []);
  var _useState = React.useState(null),
    popperElement = _useState[0],
    setPopperElement = _useState[1];
  var _useState2 = React.useState(null),
    arrowElement = _useState2[0],
    setArrowElement = _useState2[1];
  var popperOptions = React.useMemo(
    function () {
      return createBlockTypeSelectPopperOptions(arrowElement);
    },
    [arrowElement, createBlockTypeSelectPopperOptions]
  );
  var _usePopper = reactPopper.usePopper(
      referenceElement,
      popperElement,
      popperOptions
    ),
    styles = _usePopper.styles,
    attributes = _usePopper.attributes,
    update = _usePopper.update;
  React.useEffect(
    function () {
      update == null ? void 0 : update();
    },
    [rootReferenceElement, update]
  );
  return /*#__PURE__*/ React__default['default'].createElement(
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
    /*#__PURE__*/ React__default['default'].createElement(
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
      /*#__PURE__*/ React__default['default'].createElement(
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
  var _useState = React.useState(null),
    popperElement = _useState[0],
    setPopperElement = _useState[1];
  var _usePopper = reactPopper.usePopper(
      referenceElement,
      popperElement,
      popperOptions
    ),
    styles = _usePopper.styles,
    attributes = _usePopper.attributes;
  return /*#__PURE__*/ React__default['default'].createElement(
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
  return /*#__PURE__*/ React__default['default'].createElement(
    'div',
    null,
    /*#__PURE__*/ React__default['default'].createElement(
      buttons.HeadlineOneButton,
      externalProps
    ),
    /*#__PURE__*/ React__default['default'].createElement(
      buttons.HeadlineTwoButton,
      externalProps
    ),
    /*#__PURE__*/ React__default['default'].createElement(
      buttons.BlockquoteButton,
      externalProps
    ),
    /*#__PURE__*/ React__default['default'].createElement(
      buttons.CodeBlockButton,
      externalProps
    ),
    /*#__PURE__*/ React__default['default'].createElement(
      buttons.UnorderedListButton,
      externalProps
    ),
    /*#__PURE__*/ React__default['default'].createElement(
      buttons.OrderedListButton,
      externalProps
    )
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
  var _useState = React.useState(false),
    show = _useState[0],
    setShow = _useState[1];
  var _useState2 = React.useState(null),
    referenceElement = _useState2[0],
    setReferenceElement = _useState2[1];
  var _useState3 = React.useState(null),
    buttonReferenceElement = _useState3[0],
    setButtonReferenceElement = _useState3[1];
  var onEditorStateChange = React.useCallback(function (editorState) {
    var selection = editorState.getSelection();
    if (!selection.getHasFocus()) {
      setReferenceElement(null);
      setShow(false);
      return;
    }
    var currentContent = editorState.getCurrentContent();
    var currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    // TODO verify that always a key-0-0 exists
    var offsetKey = DraftOffsetKey__default['default'].encode(
      currentBlock.getKey(),
      0,
      0
    );
    // Note: need to wait on tick to make sure the DOM node has been create by Draft.js
    setTimeout(function () {
      var node = document.querySelectorAll(
        '[data-offset-key="' + offsetKey + '"]'
      )[0];
      setReferenceElement(node);
    }, 0);
  }, []);
  React.useEffect(
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
  return /*#__PURE__*/ React__default['default'].createElement(
    React__default['default'].Fragment,
    null,
    /*#__PURE__*/ React__default['default'].createElement(
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
      /*#__PURE__*/ React__default['default'].createElement(
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
        /*#__PURE__*/ React__default['default'].createElement(
          SideToolbarButton,
          {
            className:
              (_theme$blockTypeSelec = theme.blockTypeSelectStyles) == null
                ? void 0
                : _theme$blockTypeSelec.blockType,
          }
        )
      )
    ),
    /*#__PURE__*/ React__default['default'].createElement(BlockTypeSelect, {
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
  return /*#__PURE__*/ React__default['default'].createElement(
    'div',
    {
      className: className,
    },
    /*#__PURE__*/ React__default['default'].createElement(
      'svg',
      {
        height: '24',
        viewBox: '0 0 24 24',
        width: '24',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      /*#__PURE__*/ React__default['default'].createElement('path', {
        d: 'M0 0h24v24H0z',
        fill: 'none',
      }),
      /*#__PURE__*/ React__default['default'].createElement('path', {
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
  var store = utils.createStore({
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
    return /*#__PURE__*/ React__default['default'].createElement(
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

exports['default'] = index;
