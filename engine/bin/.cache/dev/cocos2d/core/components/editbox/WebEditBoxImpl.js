
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/editbox/WebEditBoxImpl.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _mat = _interopRequireDefault(require("../../value-types/mat4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var utils = require('../../platform/utils');

var macro = require('../../platform/CCMacro');

var Types = require('./types');

var Label = require('../CCLabel');

var tabIndexUtil = require('./tabIndexUtil');

var EditBox = cc.EditBox;
var js = cc.js;
var InputMode = Types.InputMode;
var InputFlag = Types.InputFlag;
var KeyboardReturnType = Types.KeyboardReturnType; // polyfill

var polyfill = {
  zoomInvalid: false
};

if (cc.sys.OS_ANDROID === cc.sys.os && (cc.sys.browserType === cc.sys.BROWSER_TYPE_SOUGOU || cc.sys.browserType === cc.sys.BROWSER_TYPE_360)) {
  polyfill.zoomInvalid = true;
} // https://segmentfault.com/q/1010000002914610


var DELAY_TIME = 800;
var SCROLLY = 100;
var LEFT_PADDING = 2; // private static property

var _domCount = 0;

var _vec3 = cc.v3();

var _currentEditBoxImpl = null; // on mobile

var _fullscreen = false;
var _autoResize = false;
var BaseClass = EditBox._ImplClass; // This is an adapter for EditBoxImpl on web platform.
// For more adapters on other platforms, please inherit from EditBoxImplBase and implement the interface.

function WebEditBoxImpl() {
  BaseClass.call(this);
  this._domId = "EditBoxId_" + ++_domCount;
  this._placeholderStyleSheet = null;
  this._elem = null;
  this._isTextArea = false; // matrix

  this._worldMat = new _mat["default"]();
  this._cameraMat = new _mat["default"](); // matrix cache

  this._m00 = 0;
  this._m01 = 0;
  this._m04 = 0;
  this._m05 = 0;
  this._m12 = 0;
  this._m13 = 0;
  this._w = 0;
  this._h = 0; // viewport cache

  this._cacheViewportRect = cc.rect(0, 0, 0, 0); // inputType cache

  this._inputMode = null;
  this._inputFlag = null;
  this._returnType = null; // event listeners

  this._eventListeners = {}; // update style sheet cache

  this._textLabelFont = null;
  this._textLabelFontSize = null;
  this._textLabelFontColor = null;
  this._textLabelAlign = null;
  this._placeholderLabelFont = null;
  this._placeholderLabelFontSize = null;
  this._placeholderLabelFontColor = null;
  this._placeholderLabelAlign = null;
  this._placeholderLineHeight = null;
}

js.extend(WebEditBoxImpl, BaseClass);
EditBox._ImplClass = WebEditBoxImpl;
Object.assign(WebEditBoxImpl.prototype, {
  // =================================
  // implement EditBoxImplBase interface
  init: function init(delegate) {
    if (!delegate) {
      return;
    }

    this._delegate = delegate;

    if (delegate.inputMode === InputMode.ANY) {
      this._createTextArea();
    } else {
      this._createInput();
    }

    tabIndexUtil.add(this);
    this.setTabIndex(delegate.tabIndex);

    this._initStyleSheet();

    this._registerEventListeners();

    this._addDomToGameContainer();

    _fullscreen = cc.view.isAutoFullScreenEnabled();
    _autoResize = cc.view._resizeWithBrowserSize;
  },
  clear: function clear() {
    this._removeEventListeners();

    this._removeDomFromGameContainer();

    tabIndexUtil.remove(this); // clear while editing

    if (_currentEditBoxImpl === this) {
      _currentEditBoxImpl = null;
    }
  },
  update: function update() {
    this._updateMatrix();
  },
  setTabIndex: function setTabIndex(index) {
    this._elem.tabIndex = index;
    tabIndexUtil.resort();
  },
  setSize: function setSize(width, height) {
    var elem = this._elem;
    elem.style.width = width + 'px';
    elem.style.height = height + 'px';
  },
  beginEditing: function beginEditing() {
    if (_currentEditBoxImpl && _currentEditBoxImpl !== this) {
      _currentEditBoxImpl.setFocus(false);
    }

    this._editing = true;
    _currentEditBoxImpl = this;

    this._delegate.editBoxEditingDidBegan();

    this._showDom();

    this._elem.focus(); // set focus

  },
  endEditing: function endEditing() {
    if (this._elem) {
      this._elem.blur();
    }
  },
  // ==========================================================================
  // implement dom input
  _createInput: function _createInput() {
    this._isTextArea = false;
    this._elem = document.createElement('input');
  },
  _createTextArea: function _createTextArea() {
    this._isTextArea = true;
    this._elem = document.createElement('textarea');
  },
  _addDomToGameContainer: function _addDomToGameContainer() {
    cc.game.container.appendChild(this._elem);
    document.head.appendChild(this._placeholderStyleSheet);
  },
  _removeDomFromGameContainer: function _removeDomFromGameContainer() {
    var hasElem = utils.contains(cc.game.container, this._elem);

    if (hasElem) {
      cc.game.container.removeChild(this._elem);
    }

    var hasStyleSheet = utils.contains(document.head, this._placeholderStyleSheet);

    if (hasStyleSheet) {
      document.head.removeChild(this._placeholderStyleSheet);
    }

    delete this._elem;
    delete this._placeholderStyleSheet;
  },
  _showDom: function _showDom() {
    this._updateMaxLength();

    this._updateInputType();

    this._updateStyleSheet();

    this._elem.style.display = '';

    this._delegate._hideLabels();

    if (cc.sys.isMobile) {
      this._showDomOnMobile();
    }
  },
  _hideDom: function _hideDom() {
    var elem = this._elem;
    elem.style.display = 'none';

    this._delegate._showLabels();

    if (cc.sys.isMobile) {
      this._hideDomOnMobile();
    }
  },
  _showDomOnMobile: function _showDomOnMobile() {
    if (cc.sys.os !== cc.sys.OS_ANDROID) {
      return;
    }

    if (_fullscreen) {
      cc.view.enableAutoFullScreen(false);
      cc.screen.exitFullScreen();
    }

    if (_autoResize) {
      cc.view.resizeWithBrowserSize(false);
    }

    this._adjustWindowScroll();
  },
  _hideDomOnMobile: function _hideDomOnMobile() {
    if (cc.sys.os === cc.sys.OS_ANDROID) {
      if (_autoResize) {
        cc.view.resizeWithBrowserSize(true);
      } // In case enter full screen when soft keyboard still showing


      setTimeout(function () {
        if (!_currentEditBoxImpl) {
          if (_fullscreen) {
            cc.view.enableAutoFullScreen(true);
          }
        }
      }, DELAY_TIME);
    } // Some browser like wechat on iOS need to mannully scroll back window


    this._scrollBackWindow();
  },
  // adjust view to editBox
  _adjustWindowScroll: function _adjustWindowScroll() {
    var self = this;
    setTimeout(function () {
      if (window.scrollY < SCROLLY) {
        self._elem.scrollIntoView({
          block: "start",
          inline: "nearest",
          behavior: "smooth"
        });
      }
    }, DELAY_TIME);
  },
  _scrollBackWindow: function _scrollBackWindow() {
    setTimeout(function () {
      // FIX: wechat browser bug on iOS
      // If gameContainer is included in iframe,
      // Need to scroll the top window, not the one in the iframe
      // Reference: https://developer.mozilla.org/en-US/docs/Web/API/Window/top
      var sys = cc.sys;

      if (sys.browserType === sys.BROWSER_TYPE_WECHAT && sys.os === sys.OS_IOS) {
        window.top && window.top.scrollTo(0, 0);
        return;
      }

      window.scrollTo(0, 0);
    }, DELAY_TIME);
  },
  _updateCameraMatrix: function _updateCameraMatrix() {
    var node = this._delegate.node;
    node.getWorldMatrix(this._worldMat);
    var worldMat = this._worldMat;
    var nodeContentSize = node._contentSize,
        nodeAnchorPoint = node._anchorPoint;
    _vec3.x = -nodeAnchorPoint.x * nodeContentSize.width;
    _vec3.y = -nodeAnchorPoint.y * nodeContentSize.height;

    _mat["default"].transform(worldMat, worldMat, _vec3); // can't find node camera in editor


    if (CC_EDITOR) {
      this._cameraMat = worldMat;
    } else {
      var camera = cc.Camera.findCamera(node);
      camera.getWorldToScreenMatrix2D(this._cameraMat);

      _mat["default"].mul(this._cameraMat, this._cameraMat, worldMat);
    }
  },
  _updateMatrix: function _updateMatrix() {
    this._updateCameraMatrix();

    var cameraMatm = this._cameraMat.m;
    var node = this._delegate.node;
    var localView = cc.view; // check whether need to update

    if (this._m00 === cameraMatm[0] && this._m01 === cameraMatm[1] && this._m04 === cameraMatm[4] && this._m05 === cameraMatm[5] && this._m12 === cameraMatm[12] && this._m13 === cameraMatm[13] && this._w === node._contentSize.width && this._h === node._contentSize.height && this._cacheViewportRect.equals(localView._viewportRect)) {
      return;
    } // update matrix cache


    this._m00 = cameraMatm[0];
    this._m01 = cameraMatm[1];
    this._m04 = cameraMatm[4];
    this._m05 = cameraMatm[5];
    this._m12 = cameraMatm[12];
    this._m13 = cameraMatm[13];
    this._w = node._contentSize.width;
    this._h = node._contentSize.height; // update viewport cache

    this._cacheViewportRect.set(localView._viewportRect);

    var scaleX = localView._scaleX,
        scaleY = localView._scaleY,
        viewport = localView._viewportRect,
        dpr = localView._devicePixelRatio;
    scaleX /= dpr;
    scaleY /= dpr;
    var container = cc.game.container;
    var a = cameraMatm[0] * scaleX,
        b = cameraMatm[1],
        c = cameraMatm[4],
        d = cameraMatm[5] * scaleY;
    var offsetX = container && container.style.paddingLeft && parseInt(container.style.paddingLeft);
    offsetX += viewport.x / dpr;
    var offsetY = container && container.style.paddingBottom && parseInt(container.style.paddingBottom);
    offsetY += viewport.y / dpr;
    var tx = cameraMatm[12] * scaleX + offsetX,
        ty = cameraMatm[13] * scaleY + offsetY;

    if (polyfill.zoomInvalid) {
      this.setSize(node.width * a, node.height * d);
      a = 1;
      d = 1;
    }

    var elem = this._elem;
    var matrix = "matrix(" + a + "," + -b + "," + -c + "," + d + "," + tx + "," + -ty + ")";
    elem.style['transform'] = matrix;
    elem.style['-webkit-transform'] = matrix;
    elem.style['transform-origin'] = '0px 100% 0px';
    elem.style['-webkit-transform-origin'] = '0px 100% 0px';
  },
  // ===========================================
  // input type and max length
  _updateInputType: function _updateInputType() {
    var delegate = this._delegate,
        inputMode = delegate.inputMode,
        inputFlag = delegate.inputFlag,
        returnType = delegate.returnType,
        elem = this._elem; // whether need to update

    if (this._inputMode === inputMode && this._inputFlag === inputFlag && this._returnType === returnType) {
      return;
    } // update cache


    this._inputMode = inputMode;
    this._inputFlag = inputFlag;
    this._returnType = returnType; // FIX ME: TextArea actually dose not support password type.

    if (this._isTextArea) {
      // input flag
      var _textTransform = 'none';

      if (inputFlag === InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
        _textTransform = 'uppercase';
      } else if (inputFlag === InputFlag.INITIAL_CAPS_WORD) {
        _textTransform = 'capitalize';
      }

      elem.style.textTransform = _textTransform;
      return;
    } // begin to updateInputType


    if (inputFlag === InputFlag.PASSWORD) {
      elem.type = 'password';
      return;
    } // input mode


    var type = elem.type;

    if (inputMode === InputMode.EMAIL_ADDR) {
      type = 'email';
    } else if (inputMode === InputMode.NUMERIC || inputMode === InputMode.DECIMAL) {
      type = 'number';
    } else if (inputMode === InputMode.PHONE_NUMBER) {
      type = 'number';
      elem.pattern = '[0-9]*';
    } else if (inputMode === InputMode.URL) {
      type = 'url';
    } else {
      type = 'text';

      if (returnType === KeyboardReturnType.SEARCH) {
        type = 'search';
      }
    }

    elem.type = type; // input flag

    var textTransform = 'none';

    if (inputFlag === InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
      textTransform = 'uppercase';
    } else if (inputFlag === InputFlag.INITIAL_CAPS_WORD) {
      textTransform = 'capitalize';
    }

    elem.style.textTransform = textTransform;
  },
  _updateMaxLength: function _updateMaxLength() {
    var maxLength = this._delegate.maxLength;

    if (maxLength < 0) {
      //we can't set Number.MAX_VALUE to input's maxLength property
      //so we use a magic number here, it should works at most use cases.
      maxLength = 65535;
    }

    this._elem.maxLength = maxLength;
  },
  // ===========================================
  // style sheet
  _initStyleSheet: function _initStyleSheet() {
    var elem = this._elem;
    elem.style.display = 'none';
    elem.style.border = 0;
    elem.style.background = 'transparent';
    elem.style.width = '100%';
    elem.style.height = '100%';
    elem.style.active = 0;
    elem.style.outline = 'medium';
    elem.style.padding = '0';
    elem.style.textTransform = 'uppercase';
    elem.style.position = "absolute";
    elem.style.bottom = "0px";
    elem.style.left = LEFT_PADDING + "px";
    elem.className = "cocosEditBox";
    elem.id = this._domId;

    if (!this._isTextArea) {
      elem.type = 'text';
      elem.style['-moz-appearance'] = 'textfield';
    } else {
      elem.style.resize = 'none';
      elem.style.overflow_y = 'scroll';
    }

    this._placeholderStyleSheet = document.createElement('style');
  },
  _updateStyleSheet: function _updateStyleSheet() {
    var delegate = this._delegate,
        elem = this._elem;
    elem.value = delegate.string;
    elem.placeholder = delegate.placeholder;

    this._updateTextLabel(delegate.textLabel);

    this._updatePlaceholderLabel(delegate.placeholderLabel);
  },
  _updateTextLabel: function _updateTextLabel(textLabel) {
    if (!textLabel) {
      return;
    } // get font


    var font = textLabel.font;

    if (font && !(font instanceof cc.BitmapFont)) {
      font = font._fontFamily;
    } else {
      font = textLabel.fontFamily;
    } // get font size


    var fontSize = textLabel.fontSize * textLabel.node.scaleY; // whether need to update

    if (this._textLabelFont === font && this._textLabelFontSize === fontSize && this._textLabelFontColor === textLabel.fontColor && this._textLabelAlign === textLabel.horizontalAlign) {
      return;
    } // update cache


    this._textLabelFont = font;
    this._textLabelFontSize = fontSize;
    this._textLabelFontColor = textLabel.fontColor;
    this._textLabelAlign = textLabel.horizontalAlign;
    var elem = this._elem; // font size

    elem.style.fontSize = fontSize + "px"; // font color

    elem.style.color = textLabel.node.color.toCSS(); // font family

    elem.style.fontFamily = font; // text-align

    switch (textLabel.horizontalAlign) {
      case Label.HorizontalAlign.LEFT:
        elem.style.textAlign = 'left';
        break;

      case Label.HorizontalAlign.CENTER:
        elem.style.textAlign = 'center';
        break;

      case Label.HorizontalAlign.RIGHT:
        elem.style.textAlign = 'right';
        break;
    } // lineHeight
    // Can't sync lineHeight property, because lineHeight would change the touch area of input

  },
  _updatePlaceholderLabel: function _updatePlaceholderLabel(placeholderLabel) {
    if (!placeholderLabel) {
      return;
    } // get font


    var font = placeholderLabel.font;

    if (font && !(font instanceof cc.BitmapFont)) {
      font = placeholderLabel.font._fontFamily;
    } else {
      font = placeholderLabel.fontFamily;
    } // get font size


    var fontSize = placeholderLabel.fontSize * placeholderLabel.node.scaleY; // whether need to update

    if (this._placeholderLabelFont === font && this._placeholderLabelFontSize === fontSize && this._placeholderLabelFontColor === placeholderLabel.fontColor && this._placeholderLabelAlign === placeholderLabel.horizontalAlign && this._placeholderLineHeight === placeholderLabel.fontSize) {
      return;
    } // update cache


    this._placeholderLabelFont = font;
    this._placeholderLabelFontSize = fontSize;
    this._placeholderLabelFontColor = placeholderLabel.fontColor;
    this._placeholderLabelAlign = placeholderLabel.horizontalAlign;
    this._placeholderLineHeight = placeholderLabel.fontSize;
    var styleEl = this._placeholderStyleSheet; // font color

    var fontColor = placeholderLabel.node.color.toCSS(); // line height

    var lineHeight = placeholderLabel.fontSize; // top vertical align by default
    // horizontal align

    var horizontalAlign;

    switch (placeholderLabel.horizontalAlign) {
      case Label.HorizontalAlign.LEFT:
        horizontalAlign = 'left';
        break;

      case Label.HorizontalAlign.CENTER:
        horizontalAlign = 'center';
        break;

      case Label.HorizontalAlign.RIGHT:
        horizontalAlign = 'right';
        break;
    }

    styleEl.innerHTML = "#" + this._domId + "::-webkit-input-placeholder,#" + this._domId + "::-moz-placeholder,#" + this._domId + ":-ms-input-placeholder" + ("{text-transform: initial; font-family: " + font + "; font-size: " + fontSize + "px; color: " + fontColor + "; line-height: " + lineHeight + "px; text-align: " + horizontalAlign + ";}"); // EDGE_BUG_FIX: hide clear button, because clearing input box in Edge does not emit input event 
    // issue refference: https://github.com/angular/angular/issues/26307

    if (cc.sys.browserType === cc.sys.BROWSER_TYPE_EDGE) {
      styleEl.innerHTML += "#" + this._domId + "::-ms-clear{display: none;}";
    }
  },
  // ===========================================
  // handle event listeners
  _registerEventListeners: function _registerEventListeners() {
    var impl = this,
        elem = this._elem,
        inputLock = false,
        cbs = this._eventListeners;

    cbs.compositionStart = function () {
      inputLock = true;
    };

    cbs.compositionEnd = function () {
      inputLock = false;

      impl._delegate.editBoxTextChanged(elem.value);
    };

    cbs.onInput = function () {
      if (inputLock) {
        return;
      } // input of number type doesn't support maxLength attribute


      var maxLength = impl._delegate.maxLength;

      if (maxLength >= 0) {
        elem.value = elem.value.slice(0, maxLength);
      }

      impl._delegate.editBoxTextChanged(elem.value);
    }; // There are 2 ways to focus on the input element:
    // Click the input element, or call input.focus().
    // Both need to adjust window scroll.


    cbs.onClick = function (e) {
      // In case operation sequence: click input, hide keyboard, then click again.
      if (impl._editing) {
        if (cc.sys.isMobile) {
          impl._adjustWindowScroll();
        }
      }
    };

    cbs.onKeydown = function (e) {
      if (e.keyCode === macro.KEY.enter) {
        e.stopPropagation();

        impl._delegate.editBoxEditingReturn();

        if (!impl._isTextArea) {
          elem.blur();
        }
      } else if (e.keyCode === macro.KEY.tab) {
        e.stopPropagation();
        e.preventDefault();
        tabIndexUtil.next(impl);
      }
    };

    cbs.onBlur = function () {
      // on mobile, sometimes input element doesn't fire compositionend event
      if (cc.sys.isMobile && inputLock) {
        cbs.compositionEnd();
      }

      impl._editing = false;
      _currentEditBoxImpl = null;

      impl._hideDom();

      impl._delegate.editBoxEditingDidEnded();
    };

    elem.addEventListener('compositionstart', cbs.compositionStart);
    elem.addEventListener('compositionend', cbs.compositionEnd);
    elem.addEventListener('input', cbs.onInput);
    elem.addEventListener('keydown', cbs.onKeydown);
    elem.addEventListener('blur', cbs.onBlur);
    elem.addEventListener('touchstart', cbs.onClick);
  },
  _removeEventListeners: function _removeEventListeners() {
    var elem = this._elem,
        cbs = this._eventListeners;
    elem.removeEventListener('compositionstart', cbs.compositionStart);
    elem.removeEventListener('compositionend', cbs.compositionEnd);
    elem.removeEventListener('input', cbs.onInput);
    elem.removeEventListener('keydown', cbs.onKeydown);
    elem.removeEventListener('blur', cbs.onBlur);
    elem.removeEventListener('touchstart', cbs.onClick);
    cbs.compositionStart = null;
    cbs.compositionEnd = null;
    cbs.onInput = null;
    cbs.onKeydown = null;
    cbs.onBlur = null;
    cbs.onClick = null;
  }
});
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_engine__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvZWRpdGJveC9XZWJFZGl0Qm94SW1wbC5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsInJlcXVpcmUiLCJtYWNybyIsIlR5cGVzIiwiTGFiZWwiLCJ0YWJJbmRleFV0aWwiLCJFZGl0Qm94IiwiY2MiLCJqcyIsIklucHV0TW9kZSIsIklucHV0RmxhZyIsIktleWJvYXJkUmV0dXJuVHlwZSIsInBvbHlmaWxsIiwiem9vbUludmFsaWQiLCJzeXMiLCJPU19BTkRST0lEIiwib3MiLCJicm93c2VyVHlwZSIsIkJST1dTRVJfVFlQRV9TT1VHT1UiLCJCUk9XU0VSX1RZUEVfMzYwIiwiREVMQVlfVElNRSIsIlNDUk9MTFkiLCJMRUZUX1BBRERJTkciLCJfZG9tQ291bnQiLCJfdmVjMyIsInYzIiwiX2N1cnJlbnRFZGl0Qm94SW1wbCIsIl9mdWxsc2NyZWVuIiwiX2F1dG9SZXNpemUiLCJCYXNlQ2xhc3MiLCJfSW1wbENsYXNzIiwiV2ViRWRpdEJveEltcGwiLCJjYWxsIiwiX2RvbUlkIiwiX3BsYWNlaG9sZGVyU3R5bGVTaGVldCIsIl9lbGVtIiwiX2lzVGV4dEFyZWEiLCJfd29ybGRNYXQiLCJNYXQ0IiwiX2NhbWVyYU1hdCIsIl9tMDAiLCJfbTAxIiwiX20wNCIsIl9tMDUiLCJfbTEyIiwiX20xMyIsIl93IiwiX2giLCJfY2FjaGVWaWV3cG9ydFJlY3QiLCJyZWN0IiwiX2lucHV0TW9kZSIsIl9pbnB1dEZsYWciLCJfcmV0dXJuVHlwZSIsIl9ldmVudExpc3RlbmVycyIsIl90ZXh0TGFiZWxGb250IiwiX3RleHRMYWJlbEZvbnRTaXplIiwiX3RleHRMYWJlbEZvbnRDb2xvciIsIl90ZXh0TGFiZWxBbGlnbiIsIl9wbGFjZWhvbGRlckxhYmVsRm9udCIsIl9wbGFjZWhvbGRlckxhYmVsRm9udFNpemUiLCJfcGxhY2Vob2xkZXJMYWJlbEZvbnRDb2xvciIsIl9wbGFjZWhvbGRlckxhYmVsQWxpZ24iLCJfcGxhY2Vob2xkZXJMaW5lSGVpZ2h0IiwiZXh0ZW5kIiwiT2JqZWN0IiwiYXNzaWduIiwicHJvdG90eXBlIiwiaW5pdCIsImRlbGVnYXRlIiwiX2RlbGVnYXRlIiwiaW5wdXRNb2RlIiwiQU5ZIiwiX2NyZWF0ZVRleHRBcmVhIiwiX2NyZWF0ZUlucHV0IiwiYWRkIiwic2V0VGFiSW5kZXgiLCJ0YWJJbmRleCIsIl9pbml0U3R5bGVTaGVldCIsIl9yZWdpc3RlckV2ZW50TGlzdGVuZXJzIiwiX2FkZERvbVRvR2FtZUNvbnRhaW5lciIsInZpZXciLCJpc0F1dG9GdWxsU2NyZWVuRW5hYmxlZCIsIl9yZXNpemVXaXRoQnJvd3NlclNpemUiLCJjbGVhciIsIl9yZW1vdmVFdmVudExpc3RlbmVycyIsIl9yZW1vdmVEb21Gcm9tR2FtZUNvbnRhaW5lciIsInJlbW92ZSIsInVwZGF0ZSIsIl91cGRhdGVNYXRyaXgiLCJpbmRleCIsInJlc29ydCIsInNldFNpemUiLCJ3aWR0aCIsImhlaWdodCIsImVsZW0iLCJzdHlsZSIsImJlZ2luRWRpdGluZyIsInNldEZvY3VzIiwiX2VkaXRpbmciLCJlZGl0Qm94RWRpdGluZ0RpZEJlZ2FuIiwiX3Nob3dEb20iLCJmb2N1cyIsImVuZEVkaXRpbmciLCJibHVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZ2FtZSIsImNvbnRhaW5lciIsImFwcGVuZENoaWxkIiwiaGVhZCIsImhhc0VsZW0iLCJjb250YWlucyIsInJlbW92ZUNoaWxkIiwiaGFzU3R5bGVTaGVldCIsIl91cGRhdGVNYXhMZW5ndGgiLCJfdXBkYXRlSW5wdXRUeXBlIiwiX3VwZGF0ZVN0eWxlU2hlZXQiLCJkaXNwbGF5IiwiX2hpZGVMYWJlbHMiLCJpc01vYmlsZSIsIl9zaG93RG9tT25Nb2JpbGUiLCJfaGlkZURvbSIsIl9zaG93TGFiZWxzIiwiX2hpZGVEb21Pbk1vYmlsZSIsImVuYWJsZUF1dG9GdWxsU2NyZWVuIiwic2NyZWVuIiwiZXhpdEZ1bGxTY3JlZW4iLCJyZXNpemVXaXRoQnJvd3NlclNpemUiLCJfYWRqdXN0V2luZG93U2Nyb2xsIiwic2V0VGltZW91dCIsIl9zY3JvbGxCYWNrV2luZG93Iiwic2VsZiIsIndpbmRvdyIsInNjcm9sbFkiLCJzY3JvbGxJbnRvVmlldyIsImJsb2NrIiwiaW5saW5lIiwiYmVoYXZpb3IiLCJCUk9XU0VSX1RZUEVfV0VDSEFUIiwiT1NfSU9TIiwidG9wIiwic2Nyb2xsVG8iLCJfdXBkYXRlQ2FtZXJhTWF0cml4Iiwibm9kZSIsImdldFdvcmxkTWF0cml4Iiwid29ybGRNYXQiLCJub2RlQ29udGVudFNpemUiLCJfY29udGVudFNpemUiLCJub2RlQW5jaG9yUG9pbnQiLCJfYW5jaG9yUG9pbnQiLCJ4IiwieSIsInRyYW5zZm9ybSIsIkNDX0VESVRPUiIsImNhbWVyYSIsIkNhbWVyYSIsImZpbmRDYW1lcmEiLCJnZXRXb3JsZFRvU2NyZWVuTWF0cml4MkQiLCJtdWwiLCJjYW1lcmFNYXRtIiwibSIsImxvY2FsVmlldyIsImVxdWFscyIsIl92aWV3cG9ydFJlY3QiLCJzZXQiLCJzY2FsZVgiLCJfc2NhbGVYIiwic2NhbGVZIiwiX3NjYWxlWSIsInZpZXdwb3J0IiwiZHByIiwiX2RldmljZVBpeGVsUmF0aW8iLCJhIiwiYiIsImMiLCJkIiwib2Zmc2V0WCIsInBhZGRpbmdMZWZ0IiwicGFyc2VJbnQiLCJvZmZzZXRZIiwicGFkZGluZ0JvdHRvbSIsInR4IiwidHkiLCJtYXRyaXgiLCJpbnB1dEZsYWciLCJyZXR1cm5UeXBlIiwidGV4dFRyYW5zZm9ybSIsIklOSVRJQUxfQ0FQU19BTExfQ0hBUkFDVEVSUyIsIklOSVRJQUxfQ0FQU19XT1JEIiwiUEFTU1dPUkQiLCJ0eXBlIiwiRU1BSUxfQUREUiIsIk5VTUVSSUMiLCJERUNJTUFMIiwiUEhPTkVfTlVNQkVSIiwicGF0dGVybiIsIlVSTCIsIlNFQVJDSCIsIm1heExlbmd0aCIsImJvcmRlciIsImJhY2tncm91bmQiLCJhY3RpdmUiLCJvdXRsaW5lIiwicGFkZGluZyIsInBvc2l0aW9uIiwiYm90dG9tIiwibGVmdCIsImNsYXNzTmFtZSIsImlkIiwicmVzaXplIiwib3ZlcmZsb3dfeSIsInZhbHVlIiwic3RyaW5nIiwicGxhY2Vob2xkZXIiLCJfdXBkYXRlVGV4dExhYmVsIiwidGV4dExhYmVsIiwiX3VwZGF0ZVBsYWNlaG9sZGVyTGFiZWwiLCJwbGFjZWhvbGRlckxhYmVsIiwiZm9udCIsIkJpdG1hcEZvbnQiLCJfZm9udEZhbWlseSIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImZvbnRDb2xvciIsImhvcml6b250YWxBbGlnbiIsImNvbG9yIiwidG9DU1MiLCJIb3Jpem9udGFsQWxpZ24iLCJMRUZUIiwidGV4dEFsaWduIiwiQ0VOVEVSIiwiUklHSFQiLCJzdHlsZUVsIiwibGluZUhlaWdodCIsImlubmVySFRNTCIsIkJST1dTRVJfVFlQRV9FREdFIiwiaW1wbCIsImlucHV0TG9jayIsImNicyIsImNvbXBvc2l0aW9uU3RhcnQiLCJjb21wb3NpdGlvbkVuZCIsImVkaXRCb3hUZXh0Q2hhbmdlZCIsIm9uSW5wdXQiLCJzbGljZSIsIm9uQ2xpY2siLCJlIiwib25LZXlkb3duIiwia2V5Q29kZSIsIktFWSIsImVudGVyIiwic3RvcFByb3BhZ2F0aW9uIiwiZWRpdEJveEVkaXRpbmdSZXR1cm4iLCJ0YWIiLCJwcmV2ZW50RGVmYXVsdCIsIm5leHQiLCJvbkJsdXIiLCJlZGl0Qm94RWRpdGluZ0RpZEVuZGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUEwQkE7Ozs7QUExQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QkEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsc0JBQUQsQ0FBckI7O0FBQ0EsSUFBTUMsS0FBSyxHQUFHRCxPQUFPLENBQUMsd0JBQUQsQ0FBckI7O0FBQ0EsSUFBTUUsS0FBSyxHQUFHRixPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFDQSxJQUFNRyxLQUFLLEdBQUdILE9BQU8sQ0FBQyxZQUFELENBQXJCOztBQUNB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R0FBRyxDQUFDSSxPQUF0QztBQUNBcEosSUFBQUEsSUFBSSxDQUFDb0ssbUJBQUwsQ0FBeUIsU0FBekIsRUFBb0NwQixHQUFHLENBQUNRLFNBQXhDO0FBQ0F4SixJQUFBQSxJQUFJLENBQUNvSyxtQkFBTCxDQUF5QixNQUF6QixFQUFpQ3BCLEdBQUcsQ0FBQ2lCLE1BQXJDO0FBQ0FqSyxJQUFBQSxJQUFJLENBQUNvSyxtQkFBTCxDQUF5QixZQUF6QixFQUF1Q3BCLEdBQUcsQ0FBQ00sT0FBM0M7QUFFQU4sSUFBQUEsR0FBRyxDQUFDQyxnQkFBSixHQUF1QixJQUF2QjtBQUNBRCxJQUFBQSxHQUFHLENBQUNFLGNBQUosR0FBcUIsSUFBckI7QUFDQUYsSUFBQUEsR0FBRyxDQUFDSSxPQUFKLEdBQWMsSUFBZDtBQUNBSixJQUFBQSxHQUFHLENBQUNRLFNBQUosR0FBZ0IsSUFBaEI7QUFDQVIsSUFBQUEsR0FBRyxDQUFDaUIsTUFBSixHQUFhLElBQWI7QUFDQWpCLElBQUFBLEdBQUcsQ0FBQ00sT0FBSixHQUFjLElBQWQ7QUFDSDtBQXRsQm1DLENBQXhDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBNYXQ0IGZyb20gJy4uLy4uL3ZhbHVlLXR5cGVzL21hdDQnO1xuXG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3BsYXRmb3JtL3V0aWxzJyk7XG5jb25zdCBtYWNybyA9IHJlcXVpcmUoJy4uLy4uL3BsYXRmb3JtL0NDTWFjcm8nKTtcbmNvbnN0IFR5cGVzID0gcmVxdWlyZSgnLi90eXBlcycpO1xuY29uc3QgTGFiZWwgPSByZXF1aXJlKCcuLi9DQ0xhYmVsJyk7XG5jb25zdCB0YWJJbmRleFV0aWwgPSByZXF1aXJlKCcuL3RhYkluZGV4VXRpbCcpO1xuXG5jb25zdCBFZGl0Qm94ID0gY2MuRWRpdEJveDtcbmNvbnN0IGpzID0gY2MuanM7XG5jb25zdCBJbnB1dE1vZGUgPSBUeXBlcy5JbnB1dE1vZGU7XG5jb25zdCBJbnB1dEZsYWcgPSBUeXBlcy5JbnB1dEZsYWc7XG5jb25zdCBLZXlib2FyZFJldHVyblR5cGUgPSBUeXBlcy5LZXlib2FyZFJldHVyblR5cGU7XG5cbi8vIHBvbHlmaWxsXG5sZXQgcG9seWZpbGwgPSB7XG4gICAgem9vbUludmFsaWQ6IGZhbHNlXG59O1xuXG5pZiAoY2Muc3lzLk9TX0FORFJPSUQgPT09IGNjLnN5cy5vcyAmJlxuICAgIChjYy5zeXMuYnJvd3NlclR5cGUgPT09IGNjLnN5cy5CUk9XU0VSX1RZUEVfU09VR09VIHx8XG4gICAgY2Muc3lzLmJyb3dzZXJUeXBlID09PSBjYy5zeXMuQlJPV1NFUl9UWVBFXzM2MCkpIHtcbiAgICBwb2x5ZmlsbC56b29tSW52YWxpZCA9IHRydWU7XG59XG5cbi8vIGh0dHBzOi8vc2VnbWVudGZhdWx0LmNvbS9xLzEwMTAwMDAwMDI5MTQ2MTBcbmNvbnN0IERFTEFZX1RJTUUgPSA4MDA7XG5jb25zdCBTQ1JPTExZID0gMTAwO1xuY29uc3QgTEVGVF9QQURESU5HID0gMjtcblxuLy8gcHJpdmF0ZSBzdGF0aWMgcHJvcGVydHlcbmxldCBfZG9tQ291bnQgPSAwO1xubGV0IF92ZWMzID0gY2MudjMoKTtcbmxldCBfY3VycmVudEVkaXRCb3hJbXBsID0gbnVsbDtcblxuLy8gb24gbW9iaWxlXG5sZXQgX2Z1bGxzY3JlZW4gPSBmYWxzZTtcbmxldCBfYXV0b1Jlc2l6ZSA9IGZhbHNlO1xuXG5jb25zdCBCYXNlQ2xhc3MgPSBFZGl0Qm94Ll9JbXBsQ2xhc3M7XG4gLy8gVGhpcyBpcyBhbiBhZGFwdGVyIGZvciBFZGl0Qm94SW1wbCBvbiB3ZWIgcGxhdGZvcm0uXG4gLy8gRm9yIG1vcmUgYWRhcHRlcnMgb24gb3RoZXIgcGxhdGZvcm1zLCBwbGVhc2UgaW5oZXJpdCBmcm9tIEVkaXRCb3hJbXBsQmFzZSBhbmQgaW1wbGVtZW50IHRoZSBpbnRlcmZhY2UuXG5mdW5jdGlvbiBXZWJFZGl0Qm94SW1wbCAoKSB7XG4gICAgQmFzZUNsYXNzLmNhbGwodGhpcyk7XG4gICAgdGhpcy5fZG9tSWQgPSBgRWRpdEJveElkXyR7KytfZG9tQ291bnR9YDtcbiAgICB0aGlzLl9wbGFjZWhvbGRlclN0eWxlU2hlZXQgPSBudWxsO1xuICAgIHRoaXMuX2VsZW0gPSBudWxsO1xuICAgIHRoaXMuX2lzVGV4dEFyZWEgPSBmYWxzZTtcblxuICAgIC8vIG1hdHJpeFxuICAgIHRoaXMuX3dvcmxkTWF0ID0gbmV3IE1hdDQoKTtcbiAgICB0aGlzLl9jYW1lcmFNYXQgPSBuZXcgTWF0NCgpO1xuICAgIC8vIG1hdHJpeCBjYWNoZVxuICAgIHRoaXMuX20wMCA9IDA7XG4gICAgdGhpcy5fbTAxID0gMDtcbiAgICB0aGlzLl9tMDQgPSAwO1xuICAgIHRoaXMuX20wNSA9IDA7XG4gICAgdGhpcy5fbTEyID0gMDtcbiAgICB0aGlzLl9tMTMgPSAwO1xuICAgIHRoaXMuX3cgPSAwO1xuICAgIHRoaXMuX2ggPSAwO1xuICAgIC8vIHZpZXdwb3J0IGNhY2hlXG4gICAgdGhpcy5fY2FjaGVWaWV3cG9ydFJlY3QgPSBjYy5yZWN0KDAsIDAsIDAsIDApO1xuXG4gICAgLy8gaW5wdXRUeXBlIGNhY2hlXG4gICAgdGhpcy5faW5wdXRNb2RlID0gbnVsbDtcbiAgICB0aGlzLl9pbnB1dEZsYWcgPSBudWxsO1xuICAgIHRoaXMuX3JldHVyblR5cGUgPSBudWxsO1xuXG4gICAgLy8gZXZlbnQgbGlzdGVuZXJzXG4gICAgdGhpcy5fZXZlbnRMaXN0ZW5lcnMgPSB7fTtcblxuICAgIC8vIHVwZGF0ZSBzdHlsZSBzaGVldCBjYWNoZVxuICAgIHRoaXMuX3RleHRMYWJlbEZvbnQgPSBudWxsO1xuICAgIHRoaXMuX3RleHRMYWJlbEZvbnRTaXplID0gbnVsbDtcbiAgICB0aGlzLl90ZXh0TGFiZWxGb250Q29sb3IgPSBudWxsO1xuICAgIHRoaXMuX3RleHRMYWJlbEFsaWduID0gbnVsbDtcblxuICAgIHRoaXMuX3BsYWNlaG9sZGVyTGFiZWxGb250ID0gbnVsbDtcbiAgICB0aGlzLl9wbGFjZWhvbGRlckxhYmVsRm9udFNpemUgPSBudWxsO1xuICAgIHRoaXMuX3BsYWNlaG9sZGVyTGFiZWxGb250Q29sb3IgPSBudWxsO1xuICAgIHRoaXMuX3BsYWNlaG9sZGVyTGFiZWxBbGlnbiA9IG51bGw7XG4gICAgdGhpcy5fcGxhY2Vob2xkZXJMaW5lSGVpZ2h0ID0gbnVsbDtcbn1cblxuanMuZXh0ZW5kKFdlYkVkaXRCb3hJbXBsLCBCYXNlQ2xhc3MpO1xuRWRpdEJveC5fSW1wbENsYXNzID0gV2ViRWRpdEJveEltcGw7XG5cbk9iamVjdC5hc3NpZ24oV2ViRWRpdEJveEltcGwucHJvdG90eXBlLCB7XG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gaW1wbGVtZW50IEVkaXRCb3hJbXBsQmFzZSBpbnRlcmZhY2VcbiAgICBpbml0IChkZWxlZ2F0ZSkge1xuICAgICAgICBpZiAoIWRlbGVnYXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pbnB1dE1vZGUgPT09IElucHV0TW9kZS5BTlkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZVRleHRBcmVhKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVJbnB1dCgpO1xuICAgICAgICB9XG4gICAgICAgIHRhYkluZGV4VXRpbC5hZGQodGhpcyk7XG4gICAgICAgIHRoaXMuc2V0VGFiSW5kZXgoZGVsZWdhdGUudGFiSW5kZXgpO1xuICAgICAgICB0aGlzLl9pbml0U3R5bGVTaGVldCgpO1xuICAgICAgICB0aGlzLl9yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMuX2FkZERvbVRvR2FtZUNvbnRhaW5lcigpO1xuXG4gICAgICAgIF9mdWxsc2NyZWVuID0gY2Mudmlldy5pc0F1dG9GdWxsU2NyZWVuRW5hYmxlZCgpO1xuICAgICAgICBfYXV0b1Jlc2l6ZSA9IGNjLnZpZXcuX3Jlc2l6ZVdpdGhCcm93c2VyU2l6ZTtcbiAgICB9LFxuXG4gICAgY2xlYXIgKCkge1xuICAgICAgICB0aGlzLl9yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLl9yZW1vdmVEb21Gcm9tR2FtZUNvbnRhaW5lcigpO1xuXG4gICAgICAgIHRhYkluZGV4VXRpbC5yZW1vdmUodGhpcyk7XG5cbiAgICAgICAgLy8gY2xlYXIgd2hpbGUgZWRpdGluZ1xuICAgICAgICBpZiAoX2N1cnJlbnRFZGl0Qm94SW1wbCA9PT0gdGhpcykge1xuICAgICAgICAgICAgX2N1cnJlbnRFZGl0Qm94SW1wbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlICgpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlTWF0cml4KCk7XG4gICAgfSxcblxuICAgIHNldFRhYkluZGV4IChpbmRleCkge1xuICAgICAgICB0aGlzLl9lbGVtLnRhYkluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRhYkluZGV4VXRpbC5yZXNvcnQoKTtcbiAgICB9LFxuXG4gICAgc2V0U2l6ZSAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBsZXQgZWxlbSA9IHRoaXMuX2VsZW07XG4gICAgICAgIGVsZW0uc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICAgIGVsZW0uc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcbiAgICB9LFxuXG4gICAgYmVnaW5FZGl0aW5nICgpIHtcbiAgICAgICAgaWYgKF9jdXJyZW50RWRpdEJveEltcGwgJiYgX2N1cnJlbnRFZGl0Qm94SW1wbCAhPT0gdGhpcykge1xuICAgICAgICAgICAgX2N1cnJlbnRFZGl0Qm94SW1wbC5zZXRGb2N1cyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZWRpdGluZyA9IHRydWU7XG4gICAgICAgIF9jdXJyZW50RWRpdEJveEltcGwgPSB0aGlzO1xuICAgICAgICB0aGlzLl9kZWxlZ2F0ZS5lZGl0Qm94RWRpdGluZ0RpZEJlZ2FuKCk7XG4gICAgICAgIHRoaXMuX3Nob3dEb20oKTtcbiAgICAgICAgdGhpcy5fZWxlbS5mb2N1cygpOyAgLy8gc2V0IGZvY3VzXG4gICAgfSxcblxuICAgIGVuZEVkaXRpbmcgKCkge1xuICAgICAgICBpZiAodGhpcy5fZWxlbSkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbS5ibHVyKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBpbXBsZW1lbnQgZG9tIGlucHV0XG4gICAgX2NyZWF0ZUlucHV0ICgpIHtcbiAgICAgICAgdGhpcy5faXNUZXh0QXJlYSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB9LFxuXG4gICAgX2NyZWF0ZVRleHRBcmVhICgpIHtcbiAgICAgICAgdGhpcy5faXNUZXh0QXJlYSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2VsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIH0sXG5cbiAgICBfYWRkRG9tVG9HYW1lQ29udGFpbmVyICgpIHtcbiAgICAgICAgY2MuZ2FtZS5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbSk7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodGhpcy5fcGxhY2Vob2xkZXJTdHlsZVNoZWV0KTtcbiAgICB9LFxuXG4gICAgX3JlbW92ZURvbUZyb21HYW1lQ29udGFpbmVyICgpIHtcbiAgICAgICAgbGV0IGhhc0VsZW0gPSB1dGlscy5jb250YWlucyhjYy5nYW1lLmNvbnRhaW5lciwgdGhpcy5fZWxlbSk7XG4gICAgICAgIGlmIChoYXNFbGVtKSB7XG4gICAgICAgICAgICBjYy5nYW1lLmNvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLl9lbGVtKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaGFzU3R5bGVTaGVldCA9IHV0aWxzLmNvbnRhaW5zKGRvY3VtZW50LmhlYWQsIHRoaXMuX3BsYWNlaG9sZGVyU3R5bGVTaGVldCk7XG4gICAgICAgIGlmIChoYXNTdHlsZVNoZWV0KSB7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKHRoaXMuX3BsYWNlaG9sZGVyU3R5bGVTaGVldCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9lbGVtO1xuICAgICAgICBkZWxldGUgdGhpcy5fcGxhY2Vob2xkZXJTdHlsZVNoZWV0O1xuICAgIH0sXG5cbiAgICBfc2hvd0RvbSAoKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU1heExlbmd0aCgpO1xuICAgICAgICB0aGlzLl91cGRhdGVJbnB1dFR5cGUoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU3R5bGVTaGVldCgpO1xuXG4gICAgICAgIHRoaXMuX2VsZW0uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICB0aGlzLl9kZWxlZ2F0ZS5faGlkZUxhYmVscygpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGNjLnN5cy5pc01vYmlsZSkge1xuICAgICAgICAgICAgdGhpcy5fc2hvd0RvbU9uTW9iaWxlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2hpZGVEb20gKCkge1xuICAgICAgICBsZXQgZWxlbSA9IHRoaXMuX2VsZW07XG5cbiAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLl9kZWxlZ2F0ZS5fc2hvd0xhYmVscygpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGNjLnN5cy5pc01vYmlsZSkge1xuICAgICAgICAgICAgdGhpcy5faGlkZURvbU9uTW9iaWxlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3Nob3dEb21Pbk1vYmlsZSAoKSB7XG4gICAgICAgIGlmIChjYy5zeXMub3MgIT09IGNjLnN5cy5PU19BTkRST0lEKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChfZnVsbHNjcmVlbikge1xuICAgICAgICAgICAgY2Mudmlldy5lbmFibGVBdXRvRnVsbFNjcmVlbihmYWxzZSk7XG4gICAgICAgICAgICBjYy5zY3JlZW4uZXhpdEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoX2F1dG9SZXNpemUpIHtcbiAgICAgICAgICAgIGNjLnZpZXcucmVzaXplV2l0aEJyb3dzZXJTaXplKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2FkanVzdFdpbmRvd1Njcm9sbCgpO1xuICAgIH0sXG5cbiAgICBfaGlkZURvbU9uTW9iaWxlICgpIHtcbiAgICAgICAgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcbiAgICAgICAgICAgIGlmIChfYXV0b1Jlc2l6ZSkge1xuICAgICAgICAgICAgICAgIGNjLnZpZXcucmVzaXplV2l0aEJyb3dzZXJTaXplKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSW4gY2FzZSBlbnRlciBmdWxsIHNjcmVlbiB3aGVuIHNvZnQga2V5Ym9hcmQgc3RpbGwgc2hvd2luZ1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfY3VycmVudEVkaXRCb3hJbXBsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfZnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2Mudmlldy5lbmFibGVBdXRvRnVsbFNjcmVlbih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIERFTEFZX1RJTUUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU29tZSBicm93c2VyIGxpa2Ugd2VjaGF0IG9uIGlPUyBuZWVkIHRvIG1hbm51bGx5IHNjcm9sbCBiYWNrIHdpbmRvd1xuICAgICAgICB0aGlzLl9zY3JvbGxCYWNrV2luZG93KCk7XG4gICAgfSxcblxuICAgIC8vIGFkanVzdCB2aWV3IHRvIGVkaXRCb3hcbiAgICBfYWRqdXN0V2luZG93U2Nyb2xsICgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZIDwgU0NST0xMWSkge1xuICAgICAgICAgICAgICAgIHNlbGYuX2VsZW0uc2Nyb2xsSW50b1ZpZXcoe2Jsb2NrOiBcInN0YXJ0XCIsIGlubGluZTogXCJuZWFyZXN0XCIsIGJlaGF2aW9yOiBcInNtb290aFwifSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIERFTEFZX1RJTUUpO1xuICAgIH0sXG5cbiAgICBfc2Nyb2xsQmFja1dpbmRvdyAoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gRklYOiB3ZWNoYXQgYnJvd3NlciBidWcgb24gaU9TXG4gICAgICAgICAgICAvLyBJZiBnYW1lQ29udGFpbmVyIGlzIGluY2x1ZGVkIGluIGlmcmFtZSxcbiAgICAgICAgICAgIC8vIE5lZWQgdG8gc2Nyb2xsIHRoZSB0b3Agd2luZG93LCBub3QgdGhlIG9uZSBpbiB0aGUgaWZyYW1lXG4gICAgICAgICAgICAvLyBSZWZlcmVuY2U6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3cvdG9wXG4gICAgICAgICAgICBsZXQgc3lzID0gY2Muc3lzO1xuICAgICAgICAgICAgaWYgKHN5cy5icm93c2VyVHlwZSA9PT0gc3lzLkJST1dTRVJfVFlQRV9XRUNIQVQgJiYgc3lzLm9zID09PSBzeXMuT1NfSU9TKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnRvcCAmJiB3aW5kb3cudG9wLnNjcm9sbFRvKDAsIDApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICB9LCBERUxBWV9USU1FKTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZUNhbWVyYU1hdHJpeCAoKSB7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5fZGVsZWdhdGUubm9kZTsgICAgXG4gICAgICAgIG5vZGUuZ2V0V29ybGRNYXRyaXgodGhpcy5fd29ybGRNYXQpO1xuICAgICAgICBsZXQgd29ybGRNYXQgPSB0aGlzLl93b3JsZE1hdDtcbiAgICAgICAgbGV0IG5vZGVDb250ZW50U2l6ZSA9IG5vZGUuX2NvbnRlbnRTaXplLFxuICAgICAgICAgICAgbm9kZUFuY2hvclBvaW50ID0gbm9kZS5fYW5jaG9yUG9pbnQ7XG5cbiAgICAgICAgX3ZlYzMueCA9IC1ub2RlQW5jaG9yUG9pbnQueCAqIG5vZGVDb250ZW50U2l6ZS53aWR0aDtcbiAgICAgICAgX3ZlYzMueSA9IC1ub2RlQW5jaG9yUG9pbnQueSAqIG5vZGVDb250ZW50U2l6ZS5oZWlnaHQ7XG4gICAgXG4gICAgICAgIE1hdDQudHJhbnNmb3JtKHdvcmxkTWF0LCB3b3JsZE1hdCwgX3ZlYzMpO1xuXG4gICAgICAgIC8vIGNhbid0IGZpbmQgbm9kZSBjYW1lcmEgaW4gZWRpdG9yXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbWVyYU1hdCA9IHdvcmxkTWF0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IGNhbWVyYSA9IGNjLkNhbWVyYS5maW5kQ2FtZXJhKG5vZGUpO1xuICAgICAgICAgICAgY2FtZXJhLmdldFdvcmxkVG9TY3JlZW5NYXRyaXgyRCh0aGlzLl9jYW1lcmFNYXQpO1xuICAgICAgICAgICAgTWF0NC5tdWwodGhpcy5fY2FtZXJhTWF0LCB0aGlzLl9jYW1lcmFNYXQsIHdvcmxkTWF0KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdXBkYXRlTWF0cml4ICgpIHsgICAgXG4gICAgICAgIHRoaXMuX3VwZGF0ZUNhbWVyYU1hdHJpeCgpO1xuICAgICAgICBsZXQgY2FtZXJhTWF0bSA9IHRoaXMuX2NhbWVyYU1hdC5tO1xuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuX2RlbGVnYXRlLm5vZGU7XG4gICAgICAgIGxldCBsb2NhbFZpZXcgPSBjYy52aWV3O1xuICAgICAgICAvLyBjaGVjayB3aGV0aGVyIG5lZWQgdG8gdXBkYXRlXG4gICAgICAgIGlmICh0aGlzLl9tMDAgPT09IGNhbWVyYU1hdG1bMF0gJiYgdGhpcy5fbTAxID09PSBjYW1lcmFNYXRtWzFdICYmXG4gICAgICAgICAgICB0aGlzLl9tMDQgPT09IGNhbWVyYU1hdG1bNF0gJiYgdGhpcy5fbTA1ID09PSBjYW1lcmFNYXRtWzVdICYmXG4gICAgICAgICAgICB0aGlzLl9tMTIgPT09IGNhbWVyYU1hdG1bMTJdICYmIHRoaXMuX20xMyA9PT0gY2FtZXJhTWF0bVsxM10gJiZcbiAgICAgICAgICAgIHRoaXMuX3cgPT09IG5vZGUuX2NvbnRlbnRTaXplLndpZHRoICYmIHRoaXMuX2ggPT09IG5vZGUuX2NvbnRlbnRTaXplLmhlaWdodCAmJlxuICAgICAgICAgICAgdGhpcy5fY2FjaGVWaWV3cG9ydFJlY3QuZXF1YWxzKGxvY2FsVmlldy5fdmlld3BvcnRSZWN0KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIG1hdHJpeCBjYWNoZVxuICAgICAgICB0aGlzLl9tMDAgPSBjYW1lcmFNYXRtWzBdO1xuICAgICAgICB0aGlzLl9tMDEgPSBjYW1lcmFNYXRtWzFdO1xuICAgICAgICB0aGlzLl9tMDQgPSBjYW1lcmFNYXRtWzRdO1xuICAgICAgICB0aGlzLl9tMDUgPSBjYW1lcmFNYXRtWzVdO1xuICAgICAgICB0aGlzLl9tMTIgPSBjYW1lcmFNYXRtWzEyXTtcbiAgICAgICAgdGhpcy5fbTEzID0gY2FtZXJhTWF0bVsxM107XG4gICAgICAgIHRoaXMuX3cgPSBub2RlLl9jb250ZW50U2l6ZS53aWR0aDtcbiAgICAgICAgdGhpcy5faCA9IG5vZGUuX2NvbnRlbnRTaXplLmhlaWdodDtcbiAgICAgICAgLy8gdXBkYXRlIHZpZXdwb3J0IGNhY2hlXG4gICAgICAgIHRoaXMuX2NhY2hlVmlld3BvcnRSZWN0LnNldChsb2NhbFZpZXcuX3ZpZXdwb3J0UmVjdCk7XG5cbiAgICAgICAgbGV0IHNjYWxlWCA9IGxvY2FsVmlldy5fc2NhbGVYLCBzY2FsZVkgPSBsb2NhbFZpZXcuX3NjYWxlWSxcbiAgICAgICAgICAgIHZpZXdwb3J0ID0gbG9jYWxWaWV3Ll92aWV3cG9ydFJlY3QsXG4gICAgICAgICAgICBkcHIgPSBsb2NhbFZpZXcuX2RldmljZVBpeGVsUmF0aW87XG4gICAgICAgIFxuICAgICAgICBzY2FsZVggLz0gZHByO1xuICAgICAgICBzY2FsZVkgLz0gZHByO1xuICAgIFxuICAgICAgICBsZXQgY29udGFpbmVyID0gY2MuZ2FtZS5jb250YWluZXI7XG4gICAgICAgIGxldCBhID0gY2FtZXJhTWF0bVswXSAqIHNjYWxlWCwgYiA9IGNhbWVyYU1hdG1bMV0sIGMgPSBjYW1lcmFNYXRtWzRdLCBkID0gY2FtZXJhTWF0bVs1XSAqIHNjYWxlWTtcbiAgICBcbiAgICAgICAgbGV0IG9mZnNldFggPSBjb250YWluZXIgJiYgY29udGFpbmVyLnN0eWxlLnBhZGRpbmdMZWZ0ICYmIHBhcnNlSW50KGNvbnRhaW5lci5zdHlsZS5wYWRkaW5nTGVmdCk7XG4gICAgICAgIG9mZnNldFggKz0gdmlld3BvcnQueCAvIGRwcjtcbiAgICAgICAgbGV0IG9mZnNldFkgPSBjb250YWluZXIgJiYgY29udGFpbmVyLnN0eWxlLnBhZGRpbmdCb3R0b20gJiYgcGFyc2VJbnQoY29udGFpbmVyLnN0eWxlLnBhZGRpbmdCb3R0b20pO1xuICAgICAgICBvZmZzZXRZICs9IHZpZXdwb3J0LnkgLyBkcHI7XG4gICAgICAgIGxldCB0eCA9IGNhbWVyYU1hdG1bMTJdICogc2NhbGVYICsgb2Zmc2V0WCwgdHkgPSBjYW1lcmFNYXRtWzEzXSAqIHNjYWxlWSArIG9mZnNldFk7XG4gICAgXG4gICAgICAgIGlmIChwb2x5ZmlsbC56b29tSW52YWxpZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTaXplKG5vZGUud2lkdGggKiBhLCBub2RlLmhlaWdodCAqIGQpO1xuICAgICAgICAgICAgYSA9IDE7XG4gICAgICAgICAgICBkID0gMTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBsZXQgZWxlbSA9IHRoaXMuX2VsZW07XG4gICAgICAgIGxldCBtYXRyaXggPSBcIm1hdHJpeChcIiArIGEgKyBcIixcIiArIC1iICsgXCIsXCIgKyAtYyArIFwiLFwiICsgZCArIFwiLFwiICsgdHggKyBcIixcIiArIC10eSArIFwiKVwiO1xuICAgICAgICBlbGVtLnN0eWxlWyd0cmFuc2Zvcm0nXSA9IG1hdHJpeDtcbiAgICAgICAgZWxlbS5zdHlsZVsnLXdlYmtpdC10cmFuc2Zvcm0nXSA9IG1hdHJpeDtcbiAgICAgICAgZWxlbS5zdHlsZVsndHJhbnNmb3JtLW9yaWdpbiddID0gJzBweCAxMDAlIDBweCc7XG4gICAgICAgIGVsZW0uc3R5bGVbJy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbiddID0gJzBweCAxMDAlIDBweCc7XG4gICAgfSxcblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBpbnB1dCB0eXBlIGFuZCBtYXggbGVuZ3RoXG4gICAgX3VwZGF0ZUlucHV0VHlwZSAoKSB7XG4gICAgICAgIGxldCBkZWxlZ2F0ZSA9IHRoaXMuX2RlbGVnYXRlLFxuICAgICAgICAgICAgaW5wdXRNb2RlID0gZGVsZWdhdGUuaW5wdXRNb2RlLFxuICAgICAgICAgICAgaW5wdXRGbGFnID0gZGVsZWdhdGUuaW5wdXRGbGFnLFxuICAgICAgICAgICAgcmV0dXJuVHlwZSA9IGRlbGVnYXRlLnJldHVyblR5cGUsXG4gICAgICAgICAgICBlbGVtID0gdGhpcy5fZWxlbTtcblxuICAgICAgICAvLyB3aGV0aGVyIG5lZWQgdG8gdXBkYXRlXG4gICAgICAgIGlmICh0aGlzLl9pbnB1dE1vZGUgPT09IGlucHV0TW9kZSAmJlxuICAgICAgICAgICAgdGhpcy5faW5wdXRGbGFnID09PSBpbnB1dEZsYWcgJiZcbiAgICAgICAgICAgIHRoaXMuX3JldHVyblR5cGUgPT09IHJldHVyblR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSBjYWNoZVxuICAgICAgICB0aGlzLl9pbnB1dE1vZGUgPSBpbnB1dE1vZGU7XG4gICAgICAgIHRoaXMuX2lucHV0RmxhZyA9IGlucHV0RmxhZztcbiAgICAgICAgdGhpcy5fcmV0dXJuVHlwZSA9IHJldHVyblR5cGU7XG5cbiAgICAgICAgLy8gRklYIE1FOiBUZXh0QXJlYSBhY3R1YWxseSBkb3NlIG5vdCBzdXBwb3J0IHBhc3N3b3JkIHR5cGUuXG4gICAgICAgIGlmICh0aGlzLl9pc1RleHRBcmVhKSB7XG4gICAgICAgICAgICAvLyBpbnB1dCBmbGFnXG4gICAgICAgICAgICBsZXQgdGV4dFRyYW5zZm9ybSA9ICdub25lJztcbiAgICAgICAgICAgIGlmIChpbnB1dEZsYWcgPT09IElucHV0RmxhZy5JTklUSUFMX0NBUFNfQUxMX0NIQVJBQ1RFUlMpIHtcbiAgICAgICAgICAgICAgICB0ZXh0VHJhbnNmb3JtID0gJ3VwcGVyY2FzZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpbnB1dEZsYWcgPT09IElucHV0RmxhZy5JTklUSUFMX0NBUFNfV09SRCkge1xuICAgICAgICAgICAgICAgIHRleHRUcmFuc2Zvcm0gPSAnY2FwaXRhbGl6ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbGVtLnN0eWxlLnRleHRUcmFuc2Zvcm0gPSB0ZXh0VHJhbnNmb3JtO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIC8vIGJlZ2luIHRvIHVwZGF0ZUlucHV0VHlwZVxuICAgICAgICBpZiAoaW5wdXRGbGFnID09PSBJbnB1dEZsYWcuUEFTU1dPUkQpIHtcbiAgICAgICAgICAgIGVsZW0udHlwZSA9ICdwYXNzd29yZCc7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgLy8gaW5wdXQgbW9kZVxuICAgICAgICBsZXQgdHlwZSA9IGVsZW0udHlwZTtcbiAgICAgICAgaWYgKGlucHV0TW9kZSA9PT0gSW5wdXRNb2RlLkVNQUlMX0FERFIpIHtcbiAgICAgICAgICAgIHR5cGUgPSAnZW1haWwnO1xuICAgICAgICB9IGVsc2UgaWYoaW5wdXRNb2RlID09PSBJbnB1dE1vZGUuTlVNRVJJQyB8fCBpbnB1dE1vZGUgPT09IElucHV0TW9kZS5ERUNJTUFMKSB7XG4gICAgICAgICAgICB0eXBlID0gJ251bWJlcic7XG4gICAgICAgIH0gZWxzZSBpZihpbnB1dE1vZGUgPT09IElucHV0TW9kZS5QSE9ORV9OVU1CRVIpIHtcbiAgICAgICAgICAgIHR5cGUgPSAnbnVtYmVyJztcbiAgICAgICAgICAgIGVsZW0ucGF0dGVybiA9ICdbMC05XSonO1xuICAgICAgICB9IGVsc2UgaWYoaW5wdXRNb2RlID09PSBJbnB1dE1vZGUuVVJMKSB7XG4gICAgICAgICAgICB0eXBlID0gJ3VybCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0eXBlID0gJ3RleHQnO1xuICAgIFxuICAgICAgICAgICAgaWYgKHJldHVyblR5cGUgPT09IEtleWJvYXJkUmV0dXJuVHlwZS5TRUFSQ0gpIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gJ3NlYXJjaCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxlbS50eXBlID0gdHlwZTtcblxuICAgICAgICAvLyBpbnB1dCBmbGFnXG4gICAgICAgIGxldCB0ZXh0VHJhbnNmb3JtID0gJ25vbmUnO1xuICAgICAgICBpZiAoaW5wdXRGbGFnID09PSBJbnB1dEZsYWcuSU5JVElBTF9DQVBTX0FMTF9DSEFSQUNURVJTKSB7XG4gICAgICAgICAgICB0ZXh0VHJhbnNmb3JtID0gJ3VwcGVyY2FzZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5wdXRGbGFnID09PSBJbnB1dEZsYWcuSU5JVElBTF9DQVBTX1dPUkQpIHtcbiAgICAgICAgICAgIHRleHRUcmFuc2Zvcm0gPSAnY2FwaXRhbGl6ZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbS5zdHlsZS50ZXh0VHJhbnNmb3JtID0gdGV4dFRyYW5zZm9ybTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZU1heExlbmd0aCAoKSB7XG4gICAgICAgIGxldCBtYXhMZW5ndGggPSB0aGlzLl9kZWxlZ2F0ZS5tYXhMZW5ndGg7XG4gICAgICAgIGlmKG1heExlbmd0aCA8IDApIHtcbiAgICAgICAgICAgIC8vd2UgY2FuJ3Qgc2V0IE51bWJlci5NQVhfVkFMVUUgdG8gaW5wdXQncyBtYXhMZW5ndGggcHJvcGVydHlcbiAgICAgICAgICAgIC8vc28gd2UgdXNlIGEgbWFnaWMgbnVtYmVyIGhlcmUsIGl0IHNob3VsZCB3b3JrcyBhdCBtb3N0IHVzZSBjYXNlcy5cbiAgICAgICAgICAgIG1heExlbmd0aCA9IDY1NTM1O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2VsZW0ubWF4TGVuZ3RoID0gbWF4TGVuZ3RoO1xuICAgIH0sXG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gc3R5bGUgc2hlZXRcbiAgICBfaW5pdFN0eWxlU2hlZXQgKCkge1xuICAgICAgICBsZXQgZWxlbSA9IHRoaXMuX2VsZW07XG4gICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZWxlbS5zdHlsZS5ib3JkZXIgPSAwO1xuICAgICAgICBlbGVtLnN0eWxlLmJhY2tncm91bmQgPSAndHJhbnNwYXJlbnQnO1xuICAgICAgICBlbGVtLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICBlbGVtLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgZWxlbS5zdHlsZS5hY3RpdmUgPSAwO1xuICAgICAgICBlbGVtLnN0eWxlLm91dGxpbmUgPSAnbWVkaXVtJztcbiAgICAgICAgZWxlbS5zdHlsZS5wYWRkaW5nID0gJzAnO1xuICAgICAgICBlbGVtLnN0eWxlLnRleHRUcmFuc2Zvcm0gPSAndXBwZXJjYXNlJztcbiAgICAgICAgZWxlbS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgZWxlbS5zdHlsZS5ib3R0b20gPSBcIjBweFwiO1xuICAgICAgICBlbGVtLnN0eWxlLmxlZnQgPSBMRUZUX1BBRERJTkcgKyBcInB4XCI7XG4gICAgICAgIGVsZW0uY2xhc3NOYW1lID0gXCJjb2Nvc0VkaXRCb3hcIjtcbiAgICAgICAgZWxlbS5pZCA9IHRoaXMuX2RvbUlkO1xuXG4gICAgICAgIGlmICghdGhpcy5faXNUZXh0QXJlYSkge1xuICAgICAgICAgICAgZWxlbS50eXBlID0gJ3RleHQnO1xuICAgICAgICAgICAgZWxlbS5zdHlsZVsnLW1vei1hcHBlYXJhbmNlJ10gPSAndGV4dGZpZWxkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVsZW0uc3R5bGUucmVzaXplID0gJ25vbmUnO1xuICAgICAgICAgICAgZWxlbS5zdHlsZS5vdmVyZmxvd195ID0gJ3Njcm9sbCc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclN0eWxlU2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIH0sXG4gICAgXG4gICAgX3VwZGF0ZVN0eWxlU2hlZXQgKCkge1xuICAgICAgICBsZXQgZGVsZWdhdGUgPSB0aGlzLl9kZWxlZ2F0ZSxcbiAgICAgICAgICAgIGVsZW0gPSB0aGlzLl9lbGVtO1xuXG4gICAgICAgIGVsZW0udmFsdWUgPSBkZWxlZ2F0ZS5zdHJpbmc7XG4gICAgICAgIGVsZW0ucGxhY2Vob2xkZXIgPSBkZWxlZ2F0ZS5wbGFjZWhvbGRlcjtcblxuICAgICAgICB0aGlzLl91cGRhdGVUZXh0TGFiZWwoZGVsZWdhdGUudGV4dExhYmVsKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlUGxhY2Vob2xkZXJMYWJlbChkZWxlZ2F0ZS5wbGFjZWhvbGRlckxhYmVsKTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZVRleHRMYWJlbCAodGV4dExhYmVsKSB7XG4gICAgICAgIGlmICghdGV4dExhYmVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ2V0IGZvbnRcbiAgICAgICAgbGV0IGZvbnQgPSB0ZXh0TGFiZWwuZm9udDtcbiAgICAgICAgaWYgKGZvbnQgJiYgIShmb250IGluc3RhbmNlb2YgY2MuQml0bWFwRm9udCkpIHtcbiAgICAgICAgICAgIGZvbnQgPSBmb250Ll9mb250RmFtaWx5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9udCA9IHRleHRMYWJlbC5mb250RmFtaWx5O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IGZvbnQgc2l6ZVxuICAgICAgICBsZXQgZm9udFNpemUgPSB0ZXh0TGFiZWwuZm9udFNpemUgKiB0ZXh0TGFiZWwubm9kZS5zY2FsZVk7XG5cbiAgICAgICAgLy8gd2hldGhlciBuZWVkIHRvIHVwZGF0ZVxuICAgICAgICBpZiAodGhpcy5fdGV4dExhYmVsRm9udCA9PT0gZm9udFxuICAgICAgICAgICAgJiYgdGhpcy5fdGV4dExhYmVsRm9udFNpemUgPT09IGZvbnRTaXplXG4gICAgICAgICAgICAmJiB0aGlzLl90ZXh0TGFiZWxGb250Q29sb3IgPT09IHRleHRMYWJlbC5mb250Q29sb3JcbiAgICAgICAgICAgICYmIHRoaXMuX3RleHRMYWJlbEFsaWduID09PSB0ZXh0TGFiZWwuaG9yaXpvbnRhbEFsaWduKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIGNhY2hlXG4gICAgICAgIHRoaXMuX3RleHRMYWJlbEZvbnQgPSBmb250O1xuICAgICAgICB0aGlzLl90ZXh0TGFiZWxGb250U2l6ZSA9IGZvbnRTaXplO1xuICAgICAgICB0aGlzLl90ZXh0TGFiZWxGb250Q29sb3IgPSB0ZXh0TGFiZWwuZm9udENvbG9yO1xuICAgICAgICB0aGlzLl90ZXh0TGFiZWxBbGlnbiA9IHRleHRMYWJlbC5ob3Jpem9udGFsQWxpZ247XG5cbiAgICAgICAgbGV0IGVsZW0gPSB0aGlzLl9lbGVtO1xuICAgICAgICAvLyBmb250IHNpemVcbiAgICAgICAgZWxlbS5zdHlsZS5mb250U2l6ZSA9IGAke2ZvbnRTaXplfXB4YDtcbiAgICAgICAgLy8gZm9udCBjb2xvclxuICAgICAgICBlbGVtLnN0eWxlLmNvbG9yID0gdGV4dExhYmVsLm5vZGUuY29sb3IudG9DU1MoKTtcbiAgICAgICAgLy8gZm9udCBmYW1pbHlcbiAgICAgICAgZWxlbS5zdHlsZS5mb250RmFtaWx5ID0gZm9udDtcbiAgICAgICAgLy8gdGV4dC1hbGlnblxuICAgICAgICBzd2l0Y2godGV4dExhYmVsLmhvcml6b250YWxBbGlnbikge1xuICAgICAgICAgICAgY2FzZSBMYWJlbC5Ib3Jpem9udGFsQWxpZ24uTEVGVDpcbiAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTGFiZWwuSG9yaXpvbnRhbEFsaWduLkNFTlRFUjpcbiAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMYWJlbC5Ib3Jpem9udGFsQWxpZ24uUklHSFQ6XG4gICAgICAgICAgICAgICAgZWxlbS5zdHlsZS50ZXh0QWxpZ24gPSAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxpbmVIZWlnaHRcbiAgICAgICAgLy8gQ2FuJ3Qgc3luYyBsaW5lSGVpZ2h0IHByb3BlcnR5LCBiZWNhdXNlIGxpbmVIZWlnaHQgd291bGQgY2hhbmdlIHRoZSB0b3VjaCBhcmVhIG9mIGlucHV0XG4gICAgfSxcblxuICAgIF91cGRhdGVQbGFjZWhvbGRlckxhYmVsIChwbGFjZWhvbGRlckxhYmVsKSB7XG4gICAgICAgIGlmICghcGxhY2Vob2xkZXJMYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IGZvbnRcbiAgICAgICAgbGV0IGZvbnQgPSBwbGFjZWhvbGRlckxhYmVsLmZvbnQ7XG4gICAgICAgIGlmIChmb250ICYmICEoZm9udCBpbnN0YW5jZW9mIGNjLkJpdG1hcEZvbnQpKSB7XG4gICAgICAgICAgICBmb250ID0gcGxhY2Vob2xkZXJMYWJlbC5mb250Ll9mb250RmFtaWx5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9udCA9IHBsYWNlaG9sZGVyTGFiZWwuZm9udEZhbWlseTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBmb250IHNpemVcbiAgICAgICAgbGV0IGZvbnRTaXplID0gcGxhY2Vob2xkZXJMYWJlbC5mb250U2l6ZSAqIHBsYWNlaG9sZGVyTGFiZWwubm9kZS5zY2FsZVk7XG5cbiAgICAgICAgLy8gd2hldGhlciBuZWVkIHRvIHVwZGF0ZVxuICAgICAgICBpZiAodGhpcy5fcGxhY2Vob2xkZXJMYWJlbEZvbnQgPT09IGZvbnRcbiAgICAgICAgICAgICYmIHRoaXMuX3BsYWNlaG9sZGVyTGFiZWxGb250U2l6ZSA9PT0gZm9udFNpemVcbiAgICAgICAgICAgICYmIHRoaXMuX3BsYWNlaG9sZGVyTGFiZWxGb250Q29sb3IgPT09IHBsYWNlaG9sZGVyTGFiZWwuZm9udENvbG9yXG4gICAgICAgICAgICAmJiB0aGlzLl9wbGFjZWhvbGRlckxhYmVsQWxpZ24gPT09IHBsYWNlaG9sZGVyTGFiZWwuaG9yaXpvbnRhbEFsaWduXG4gICAgICAgICAgICAmJiB0aGlzLl9wbGFjZWhvbGRlckxpbmVIZWlnaHQgPT09IHBsYWNlaG9sZGVyTGFiZWwuZm9udFNpemUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgY2FjaGVcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJMYWJlbEZvbnQgPSBmb250O1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlckxhYmVsRm9udFNpemUgPSBmb250U2l6ZTtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJMYWJlbEZvbnRDb2xvciA9IHBsYWNlaG9sZGVyTGFiZWwuZm9udENvbG9yO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlckxhYmVsQWxpZ24gPSBwbGFjZWhvbGRlckxhYmVsLmhvcml6b250YWxBbGlnbjtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJMaW5lSGVpZ2h0ID0gcGxhY2Vob2xkZXJMYWJlbC5mb250U2l6ZTtcblxuICAgICAgICBsZXQgc3R5bGVFbCA9IHRoaXMuX3BsYWNlaG9sZGVyU3R5bGVTaGVldDtcbiAgICAgICAgXG4gICAgICAgIC8vIGZvbnQgY29sb3JcbiAgICAgICAgbGV0IGZvbnRDb2xvciA9IHBsYWNlaG9sZGVyTGFiZWwubm9kZS5jb2xvci50b0NTUygpO1xuICAgICAgICAvLyBsaW5lIGhlaWdodFxuICAgICAgICBsZXQgbGluZUhlaWdodCA9IHBsYWNlaG9sZGVyTGFiZWwuZm9udFNpemU7ICAvLyB0b3AgdmVydGljYWwgYWxpZ24gYnkgZGVmYXVsdFxuICAgICAgICAvLyBob3Jpem9udGFsIGFsaWduXG4gICAgICAgIGxldCBob3Jpem9udGFsQWxpZ247XG4gICAgICAgIHN3aXRjaCAocGxhY2Vob2xkZXJMYWJlbC5ob3Jpem9udGFsQWxpZ24pIHtcbiAgICAgICAgICAgIGNhc2UgTGFiZWwuSG9yaXpvbnRhbEFsaWduLkxFRlQ6XG4gICAgICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWduID0gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSOlxuICAgICAgICAgICAgICAgIGhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBMYWJlbC5Ib3Jpem9udGFsQWxpZ24uUklHSFQ6XG4gICAgICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWduID0gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN0eWxlRWwuaW5uZXJIVE1MID0gYCMke3RoaXMuX2RvbUlkfTo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciwjJHt0aGlzLl9kb21JZH06Oi1tb3otcGxhY2Vob2xkZXIsIyR7dGhpcy5fZG9tSWR9Oi1tcy1pbnB1dC1wbGFjZWhvbGRlcmAgK1xuICAgICAgICBge3RleHQtdHJhbnNmb3JtOiBpbml0aWFsOyBmb250LWZhbWlseTogJHtmb250fTsgZm9udC1zaXplOiAke2ZvbnRTaXplfXB4OyBjb2xvcjogJHtmb250Q29sb3J9OyBsaW5lLWhlaWdodDogJHtsaW5lSGVpZ2h0fXB4OyB0ZXh0LWFsaWduOiAke2hvcml6b250YWxBbGlnbn07fWA7XG4gICAgICAgIC8vIEVER0VfQlVHX0ZJWDogaGlkZSBjbGVhciBidXR0b24sIGJlY2F1c2UgY2xlYXJpbmcgaW5wdXQgYm94IGluIEVkZ2UgZG9lcyBub3QgZW1pdCBpbnB1dCBldmVudCBcbiAgICAgICAgLy8gaXNzdWUgcmVmZmVyZW5jZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjYzMDdcbiAgICAgICAgaWYgKGNjLnN5cy5icm93c2VyVHlwZSA9PT0gY2Muc3lzLkJST1dTRVJfVFlQRV9FREdFKSB7XG4gICAgICAgICAgICBzdHlsZUVsLmlubmVySFRNTCArPSBgIyR7dGhpcy5fZG9tSWR9OjotbXMtY2xlYXJ7ZGlzcGxheTogbm9uZTt9YDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gaGFuZGxlIGV2ZW50IGxpc3RlbmVyc1xuICAgIF9yZWdpc3RlckV2ZW50TGlzdGVuZXJzICgpIHsgICAgICAgIFxuICAgICAgICBsZXQgaW1wbCA9IHRoaXMsXG4gICAgICAgICAgICBlbGVtID0gdGhpcy5fZWxlbSxcbiAgICAgICAgICAgIGlucHV0TG9jayA9IGZhbHNlLFxuICAgICAgICAgICAgY2JzID0gdGhpcy5fZXZlbnRMaXN0ZW5lcnM7XG5cbiAgICAgICAgY2JzLmNvbXBvc2l0aW9uU3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpbnB1dExvY2sgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgY2JzLmNvbXBvc2l0aW9uRW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW5wdXRMb2NrID0gZmFsc2U7XG4gICAgICAgICAgICBpbXBsLl9kZWxlZ2F0ZS5lZGl0Qm94VGV4dENoYW5nZWQoZWxlbS52YWx1ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY2JzLm9uSW5wdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXRMb2NrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaW5wdXQgb2YgbnVtYmVyIHR5cGUgZG9lc24ndCBzdXBwb3J0IG1heExlbmd0aCBhdHRyaWJ1dGVcbiAgICAgICAgICAgIGxldCBtYXhMZW5ndGggPSBpbXBsLl9kZWxlZ2F0ZS5tYXhMZW5ndGg7XG4gICAgICAgICAgICBpZiAobWF4TGVuZ3RoID49IDApIHtcbiAgICAgICAgICAgICAgICBlbGVtLnZhbHVlID0gZWxlbS52YWx1ZS5zbGljZSgwLCBtYXhMZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW1wbC5fZGVsZWdhdGUuZWRpdEJveFRleHRDaGFuZ2VkKGVsZW0udmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLy8gVGhlcmUgYXJlIDIgd2F5cyB0byBmb2N1cyBvbiB0aGUgaW5wdXQgZWxlbWVudDpcbiAgICAgICAgLy8gQ2xpY2sgdGhlIGlucHV0IGVsZW1lbnQsIG9yIGNhbGwgaW5wdXQuZm9jdXMoKS5cbiAgICAgICAgLy8gQm90aCBuZWVkIHRvIGFkanVzdCB3aW5kb3cgc2Nyb2xsLlxuICAgICAgICBjYnMub25DbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvLyBJbiBjYXNlIG9wZXJhdGlvbiBzZXF1ZW5jZTogY2xpY2sgaW5wdXQsIGhpZGUga2V5Ym9hcmQsIHRoZW4gY2xpY2sgYWdhaW4uXG4gICAgICAgICAgICBpZiAoaW1wbC5fZWRpdGluZykge1xuICAgICAgICAgICAgICAgIGlmIChjYy5zeXMuaXNNb2JpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1wbC5fYWRqdXN0V2luZG93U2Nyb2xsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgY2JzLm9uS2V5ZG93biA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBtYWNyby5LRVkuZW50ZXIpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGltcGwuX2RlbGVnYXRlLmVkaXRCb3hFZGl0aW5nUmV0dXJuKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWltcGwuX2lzVGV4dEFyZWEpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5ibHVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZS5rZXlDb2RlID09PSBtYWNyby5LRVkudGFiKSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICB0YWJJbmRleFV0aWwubmV4dChpbXBsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjYnMub25CbHVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gb24gbW9iaWxlLCBzb21ldGltZXMgaW5wdXQgZWxlbWVudCBkb2Vzbid0IGZpcmUgY29tcG9zaXRpb25lbmQgZXZlbnRcbiAgICAgICAgICAgIGlmIChjYy5zeXMuaXNNb2JpbGUgJiYgaW5wdXRMb2NrKSB7XG4gICAgICAgICAgICAgICAgY2JzLmNvbXBvc2l0aW9uRW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbXBsLl9lZGl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBfY3VycmVudEVkaXRCb3hJbXBsID0gbnVsbDtcbiAgICAgICAgICAgIGltcGwuX2hpZGVEb20oKTtcbiAgICAgICAgICAgIGltcGwuX2RlbGVnYXRlLmVkaXRCb3hFZGl0aW5nRGlkRW5kZWQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBvc2l0aW9uc3RhcnQnLCBjYnMuY29tcG9zaXRpb25TdGFydCk7XG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY29tcG9zaXRpb25lbmQnLCBjYnMuY29tcG9zaXRpb25FbmQpO1xuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2JzLm9uSW5wdXQpO1xuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBjYnMub25LZXlkb3duKTtcbiAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgY2JzLm9uQmx1cik7XG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGNicy5vbkNsaWNrKTtcbiAgICB9LFxuXG4gICAgX3JlbW92ZUV2ZW50TGlzdGVuZXJzICgpIHtcbiAgICAgICAgbGV0IGVsZW0gPSB0aGlzLl9lbGVtLFxuICAgICAgICAgICAgY2JzID0gdGhpcy5fZXZlbnRMaXN0ZW5lcnM7XG5cbiAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdjb21wb3NpdGlvbnN0YXJ0JywgY2JzLmNvbXBvc2l0aW9uU3RhcnQpO1xuICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbXBvc2l0aW9uZW5kJywgY2JzLmNvbXBvc2l0aW9uRW5kKTtcbiAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNicy5vbklucHV0KTtcbiAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgY2JzLm9uS2V5ZG93bik7XG4gICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIGNicy5vbkJsdXIpO1xuICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBjYnMub25DbGljayk7XG4gICAgICAgIFxuICAgICAgICBjYnMuY29tcG9zaXRpb25TdGFydCA9IG51bGw7XG4gICAgICAgIGNicy5jb21wb3NpdGlvbkVuZCA9IG51bGw7XG4gICAgICAgIGNicy5vbklucHV0ID0gbnVsbDtcbiAgICAgICAgY2JzLm9uS2V5ZG93biA9IG51bGw7XG4gICAgICAgIGNicy5vbkJsdXIgPSBudWxsO1xuICAgICAgICBjYnMub25DbGljayA9IG51bGw7XG4gICAgfSxcbn0pO1xuXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==