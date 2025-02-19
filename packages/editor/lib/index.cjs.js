'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var draftJs = require('draft-js');
var Immutable = require('immutable');
var PropTypes = require('prop-types');
var React = require('react');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var Immutable__default = /*#__PURE__*/ _interopDefaultLegacy(Immutable);
var PropTypes__default = /*#__PURE__*/ _interopDefaultLegacy(PropTypes);
var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);

/**
 * Create an editor state with some text in it already
 */
function createEditorStateWithText$1(text) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (draftJs.EditorState.createWithText) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return draftJs.EditorState.createWithText(text);
  }
  return draftJs.EditorState.createWithContent(
    draftJs.ContentState.createFromText(text)
  );
}

// This code originally has been copied from Recompose
// https://github.com/acdlite/recompose/blob/master/src/packages/recompose/compose.js

// eslint-disable-next-line @typescript-eslint/no-explicit-any

function composeDecorators$1() {
  for (
    var _len = arguments.length, funcs = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    funcs[_key] = arguments[_key];
  }
  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  var last = funcs[funcs.length - 1];
  return function () {
    var result = last.apply(void 0, arguments);
    for (var i = funcs.length - 2; i >= 0; i -= 1) {
      var f = funcs[i];
      result = f(result);
    }
    return result;
  };
}

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
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf
    ? Object.setPrototypeOf.bind()
    : function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };
  return _setPrototypeOf(o, p);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function keyBindingFn(event) {
  return draftJs.getDefaultKeyBinding(event);
}

function handleKeyCommand(command, editorState, eventTimeStamp, _ref) {
  var setEditorState = _ref.setEditorState;
  var newState;
  switch (command) {
    case 'backspace':
    case 'backspace-word':
    case 'backspace-to-start-of-line':
      newState = draftJs.RichUtils.onBackspace(editorState);
      break;
    case 'delete':
    case 'delete-word':
    case 'delete-to-end-of-block':
      newState = draftJs.RichUtils.onDelete(editorState);
      break;
    default:
      return 'not-handled';
  }
  if (newState != null) {
    setEditorState(newState);
    return 'handled';
  }
  return 'not-handled';
}

var _excluded$1 = ['props'],
  _excluded2 = ['props'];
function isEditorHandleKey(key) {
  return key.startsWith('handle');
}
function isEditorEventKey(key) {
  return key.startsWith('on');
}
function isEditorFnKey(key) {
  return key.endsWith('Fn');
}
function blockRendererFnHook(plugins, pluginMethods) {
  return function (block) {
    var resultBlock = {
      props: {},
    };
    plugins.forEach(function (plugin) {
      if (typeof plugin.blockRendererFn !== 'function') {
        return;
      }
      var result = plugin.blockRendererFn(block, pluginMethods);
      if (result !== undefined && result !== null) {
        var pluginProps = result.props,
          pluginRest = _objectWithoutPropertiesLoose(result, _excluded$1); // eslint-disable-line no-use-before-define
        var _resultBlock = resultBlock,
          props = _resultBlock.props,
          rest = _objectWithoutPropertiesLoose(_resultBlock, _excluded2); // eslint-disable-line no-use-before-define
        resultBlock = _extends({}, rest, pluginRest, {
          props: _extends({}, props, pluginProps),
        });
      }
    });
    return resultBlock.component ? resultBlock : false;
  };
}
function blockStyleFnHook(plugins, pluginMethods) {
  return function (block) {
    var styles = [];
    plugins.forEach(function (plugin) {
      if (typeof plugin.blockStyleFn !== 'function') {
        return;
      }
      var result = plugin.blockStyleFn(block, pluginMethods);
      if (result !== undefined && result !== null) {
        styles.push(result);
      }
    });
    return styles.join(' ');
  };
}
function customStyleFnHook(plugins, pluginMethods) {
  return function (style, block) {
    var result;
    var wasHandled = plugins.some(function (plugin) {
      if (typeof plugin.customStyleFn !== 'function') {
        return false;
      }
      result = plugin.customStyleFn(style, block, pluginMethods);
      return result !== undefined;
    });
    return wasHandled && result ? result : {};
  };
}
function keyBindingFnHook(plugins, pluginMethods) {
  return function (event) {
    var result = null;
    var wasHandled = plugins.some(function (plugin) {
      if (typeof plugin.keyBindingFn !== 'function') {
        return false;
      }
      result = plugin.keyBindingFn(event, pluginMethods);
      return result !== undefined;
    });
    return wasHandled ? result : null;
  };
}
function createHandleHooks(methodName, plugins, pluginMethods) {
  return function () {
    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }
    return plugins.some(function (plugin) {
      var fn = plugin[methodName];
      return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        typeof fn === 'function' &&
        fn.apply(void 0, args.concat([pluginMethods])) === 'handled'
      );
    })
      ? 'handled'
      : 'not-handled';
  };
}
function createEventHooks(methodName, plugins, pluginMethods) {
  return function () {
    for (
      var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
      _key2 < _len2;
      _key2++
    ) {
      args[_key2] = arguments[_key2];
    }
    return plugins.some(function (plugin) {
      var fn = plugin[methodName];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return (
        typeof fn === 'function' &&
        fn.apply(void 0, args.concat([pluginMethods])) === true
      );
    });
  };
}
function createPluginHooks(plugins, pluginFunction) {
  var pluginHooks = {};

  //onchange is here ignored
  var handledAttributes = new Set(['onChange']);
  plugins.forEach(function (plugin) {
    Object.keys(plugin).forEach(function (attrName) {
      // if `attrName` has been added as a hook key already, ignore this one
      if (handledAttributes.has(attrName)) {
        return;
      }
      handledAttributes.add(attrName);
      if (isEditorEventKey(attrName)) {
        pluginHooks[attrName] = createEventHooks(
          attrName,
          plugins,
          pluginFunction
        );
      } else if (isEditorHandleKey(attrName)) {
        pluginHooks[attrName] = createHandleHooks(
          attrName,
          plugins,
          pluginFunction
        );
      } else if (isEditorFnKey(attrName)) {
        if (attrName === 'blockRendererFn') {
          pluginHooks.blockRendererFn = blockRendererFnHook(
            plugins,
            pluginFunction
          );
        } else if (attrName === 'blockStyleFn') {
          pluginHooks.blockStyleFn = blockStyleFnHook(plugins, pluginFunction);
        } else if (attrName === 'customStyleFn') {
          pluginHooks.customStyleFn = customStyleFnHook(
            plugins,
            pluginFunction
          );
        } else if (attrName === 'keyBindingFn') {
          pluginHooks.keyBindingFn = keyBindingFnHook(plugins, pluginFunction);
        }
      }
    });
  });
  return pluginHooks;
}

function createCompositeDecorator(decorators, getEditorState, setEditorState) {
  var convertedDecorators = Immutable.List(decorators)
    .map(function (decorator) {
      var Component = decorator.component;
      var DecoratedComponent = function DecoratedComponent(props) {
        return /*#__PURE__*/ React__default['default'].createElement(
          Component,
          _extends({}, props, {
            getEditorState: getEditorState,
            setEditorState: setEditorState,
          })
        );
      };
      return _extends({}, decorator, {
        component: DecoratedComponent,
      });
    })
    .toJS();
  return new draftJs.CompositeDecorator(convertedDecorators);
}

var KEY_SEPARATOR = '-';
var MultiDecorator = /*#__PURE__*/ (function () {
  function MultiDecorator(decorators) {
    this.decorators = void 0;
    this.decorators = Immutable__default['default'].List(decorators);
  }

  /**
   * Return list of decoration IDs per character
   */
  var _proto = MultiDecorator.prototype;
  _proto.getDecorations = function getDecorations(block, contentState) {
    var decorations = new Array(block.getText().length).fill(null);
    this.decorators.forEach(function (decorator, i) {
      var subDecorations = decorator.getDecorations(block, contentState);
      subDecorations.forEach(function (key, offset) {
        if (!key) {
          return;
        }
        decorations[offset] = i + KEY_SEPARATOR + key;
      });
    });
    return Immutable__default['default'].List(decorations);
  };

  /**
   * Return component to render a decoration
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  _proto.getComponentForKey = function getComponentForKey(key) {
    var decorator = this.getDecoratorForKey(key);
    return decorator.getComponentForKey(MultiDecorator.getInnerKey(key));
  };

  /**
   * Return props to render a decoration
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  _proto.getPropsForKey = function getPropsForKey(key) {
    var decorator = this.getDecoratorForKey(key);
    return decorator.getPropsForKey(MultiDecorator.getInnerKey(key));
  };

  /**
   * Return a decorator for a specific key
   */
  _proto.getDecoratorForKey = function getDecoratorForKey(key) {
    var parts = key.split(KEY_SEPARATOR);
    var index = Number(parts[0]);
    return this.decorators.get(index);
  };

  /**
   * Return inner key for a decorator
   */
  MultiDecorator.getInnerKey = function getInnerKey(key) {
    var parts = key.split(KEY_SEPARATOR);
    return parts.slice(1).join(KEY_SEPARATOR);
  };
  return MultiDecorator;
})();

// Return true if decorator implements the DraftDecoratorType interface
// @see https://github.com/facebook/draft-js/blob/master/src/model/decorators/DraftDecoratorType.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var decoratorIsCustom = function decoratorIsCustom(decorator) {
  return (
    typeof decorator.getDecorations === 'function' &&
    typeof decorator.getComponentForKey === 'function' &&
    typeof decorator.getPropsForKey === 'function'
  );
};
var getDecoratorsFromProps = function getDecoratorsFromProps(_ref) {
  var decorators = _ref.decorators,
    _ref$plugins = _ref.plugins,
    plugins = _ref$plugins === void 0 ? [] : _ref$plugins;
  return Immutable.List(
    [
      {
        decorators: decorators,
      },
    ].concat(plugins)
  )
    .filter(function (plugin) {
      return (plugin == null ? void 0 : plugin.decorators) !== undefined;
    })
    .flatMap(function (plugin) {
      return plugin == null ? void 0 : plugin.decorators;
    });
};
function resolveDecorators(props, getEditorState, onChange) {
  var decorators = getDecoratorsFromProps(props);
  var compositeDecorator = createCompositeDecorator(
    decorators.filter(function (decorator) {
      return !decoratorIsCustom(decorator);
    }),
    getEditorState,
    onChange
  );
  var customDecorators = decorators.filter(function (decorator) {
    return decoratorIsCustom(decorator);
  });
  return new MultiDecorator(customDecorators.push(compositeDecorator));
}

var _excluded = ['keyBindingFn'];
var getDecoratorLength = function getDecoratorLength(obj) {
  if ((obj == null ? void 0 : obj.decorators) != null) {
    var _obj$decorators;
    return (_obj$decorators = obj.decorators) == null
      ? void 0
      : _obj$decorators.size;
  } else if ((obj == null ? void 0 : obj._decorators) != null) {
    var _obj$_decorators;
    return (_obj$_decorators = obj._decorators) == null
      ? void 0
      : _obj$_decorators.length;
  }
  return undefined;
};

/**
 * The main editor component
 */
var PluginEditor = /*#__PURE__*/ (function (_Component) {
  _inheritsLoose(PluginEditor, _Component);
  function PluginEditor(_props) {
    var _this;
    _this = _Component.call(this, _props) || this;
    _this.editor = null;
    _this.state = {
      readOnly: false, // TODO for Nik: ask ben why this is relevent
    };
    _this.onChange = function (editorState) {
      var newEditorState = editorState;
      _this.resolvePlugins().forEach(function (plugin) {
        if (plugin.onChange) {
          newEditorState = plugin.onChange(
            newEditorState,
            _this.getPluginMethods()
          );
        }
      });
      if (_this.props.onChange) {
        _this.props.onChange(newEditorState);
      }
    };
    _this.getPlugins = function () {
      return [].concat(_this.props.plugins);
    };
    _this.getProps = function () {
      return _extends({}, _this.props);
    };
    _this.getReadOnly = function () {
      return _this.props.readOnly || _this.state.readOnly;
    };
    _this.setReadOnly = function (readOnly) {
      if (readOnly !== _this.state.readOnly) {
        _this.setState({
          readOnly: readOnly,
        });
      }
    };
    _this.getEditorRef = function () {
      return _this.editor;
    };
    _this.getEditorState = function () {
      return _this.props.editorState;
    };
    _this.getPluginMethods = function () {
      return {
        getPlugins: _this.getPlugins,
        getProps: _this.getProps,
        setEditorState: _this.onChange,
        getEditorState: _this.getEditorState,
        getReadOnly: _this.getReadOnly,
        setReadOnly: _this.setReadOnly,
        getEditorRef: _this.getEditorRef,
      };
    };
    _this.createPluginHooks = function () {
      var plugins = [_this.props].concat(_this.resolvePlugins());
      return createPluginHooks(plugins, _this.getPluginMethods());
    };
    _this.resolvePlugins = function () {
      var plugins = _this.getPlugins();
      if (_this.props.defaultKeyBindings === true) {
        plugins.push({
          keyBindingFn: keyBindingFn,
        });
      }
      if (_this.props.defaultKeyCommands === true) {
        plugins.push({
          handleKeyCommand: handleKeyCommand,
        });
      }
      return plugins;
    };
    _this.resolveCustomStyleMap = function () {
      var customStyleMap = _this.props.plugins
        .filter(function (plug) {
          return plug.customStyleMap !== undefined;
        })
        .map(function (plug) {
          return plug.customStyleMap;
        });
      return customStyleMap
        .concat([_this.props.customStyleMap])
        .reduce(function (styles, style) {
          return _extends({}, styles, style);
        }, {});
    };
    _this.resolveblockRenderMap = function () {
      var blockRenderMap = _this.props.plugins
        .filter(function (plug) {
          return plug.blockRenderMap !== undefined;
        })
        .reduce(function (maps, plug) {
          return maps.merge(plug.blockRenderMap);
        }, Immutable.Map({}));
      if (_this.props.defaultBlockRenderMap) {
        blockRenderMap =
          draftJs.DefaultDraftBlockRenderMap.merge(blockRenderMap);
      }
      if (_this.props.blockRenderMap) {
        blockRenderMap = blockRenderMap.merge(_this.props.blockRenderMap);
      }
      return blockRenderMap;
    };
    _this.resolveAccessibilityProps = function () {
      var accessibilityProps = {};
      _this.resolvePlugins().forEach(function (plugin) {
        if (typeof plugin.getAccessibilityProps !== 'function') {
          return;
        }
        var props = plugin.getAccessibilityProps();
        var popupProps = {};
        if (accessibilityProps.ariaHasPopup === undefined) {
          popupProps.ariaHasPopup = props.ariaHasPopup;
        } else if (props.ariaHasPopup === 'true') {
          popupProps.ariaHasPopup = 'true';
        }
        if (accessibilityProps.ariaExpanded === undefined) {
          popupProps.ariaExpanded = props.ariaExpanded;
        } else if (props.ariaExpanded === true) {
          popupProps.ariaExpanded = true;
        }
        accessibilityProps = _extends(
          {},
          accessibilityProps,
          props,
          popupProps
        );
      });
      return accessibilityProps;
    };
    var _plugins = [_this.props].concat(_this.resolvePlugins());
    _plugins.forEach(function (plugin) {
      if (plugin && typeof plugin.initialize === 'function') {
        plugin.initialize(_this.getPluginMethods());
      }
    });
    return _this;
  }
  var _proto = PluginEditor.prototype;
  _proto.focus = function focus() {
    if (this.editor) {
      this.editor.focus();
    }
  };
  _proto.blur = function blur() {
    if (this.editor) {
      this.editor.blur();
    }
  };
  _proto.componentDidMount = function componentDidMount() {
    var decorator = resolveDecorators(
      this.props,
      this.getEditorState,
      this.onChange
    );
    var editorState = draftJs.EditorState.set(this.props.editorState, {
      decorator: decorator,
    });
    this.onChange(draftJs.EditorState.moveSelectionToEnd(editorState));
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var next = this.props;
    var currDec = prevProps.editorState.getDecorator();
    var nextDec = next.editorState.getDecorator();

    // If there is not current decorator, there's nothing to carry over to the next editor state
    if (!currDec) {
      return;
    }
    // If the current decorator is the same as the new one, don't call onChange to avoid infinite loops
    if (currDec === nextDec) {
      return;
    }
    // If the old and the new decorator are the same, but no the same object, also don't call onChange to avoid infinite loops
    if (
      currDec &&
      nextDec &&
      getDecoratorLength(currDec) === getDecoratorLength(nextDec)
    ) {
      return;
    }
    var editorState = draftJs.EditorState.set(next.editorState, {
      decorator: currDec,
    });
    this.onChange(draftJs.EditorState.moveSelectionToEnd(editorState));
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this2 = this;
    this.resolvePlugins().forEach(function (plugin) {
      if (plugin.willUnmount) {
        plugin.willUnmount({
          getEditorState: _this2.getEditorState,
          setEditorState: _this2.onChange,
        });
      }
    });
  };

  // Cycle through the plugins, changing the editor state with what the plugins
  // changed (or didn't)
  _proto.render = function render() {
    var _this3 = this;
    var pluginHooks = this.createPluginHooks();
    var customStyleMap = this.resolveCustomStyleMap();
    var accessibilityProps = this.resolveAccessibilityProps();
    var blockRenderMap = this.resolveblockRenderMap();
    var _this$props = this.props;
    _this$props.keyBindingFn;
    var editorProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return /*#__PURE__*/ React__default['default'].createElement(
      draftJs.Editor,
      _extends({}, editorProps, accessibilityProps, pluginHooks, {
        readOnly: this.props.readOnly || this.state.readOnly,
        customStyleMap: customStyleMap,
        blockRenderMap: blockRenderMap,
        onChange: this.onChange,
        editorState: this.props.editorState,
        ref: function ref(element) {
          _this3.editor = element;
        },
      })
    );
  };
  return PluginEditor;
})(React.Component);
PluginEditor.propTypes = {
  editorState: PropTypes__default['default'].object.isRequired,
  onChange: PropTypes__default['default'].func.isRequired,
  plugins: PropTypes__default['default'].array,
  defaultKeyBindings: PropTypes__default['default'].bool,
  defaultKeyCommands: PropTypes__default['default'].bool,
  defaultBlockRenderMap: PropTypes__default['default'].bool,
  customStyleMap: PropTypes__default['default'].object,
  // eslint-disable-next-line react/no-unused-prop-types
  decorators: PropTypes__default['default'].array,
};
PluginEditor.defaultProps = {
  defaultBlockRenderMap: true,
  defaultKeyBindings: true,
  defaultKeyCommands: true,
  customStyleMap: {},
  plugins: [],
  decorators: [],
};
var PluginEditor$1 = PluginEditor;

var createEditorStateWithText = createEditorStateWithText$1;
var composeDecorators = composeDecorators$1;

exports.composeDecorators = composeDecorators;
exports.createEditorStateWithText = createEditorStateWithText;
exports['default'] = PluginEditor$1;
