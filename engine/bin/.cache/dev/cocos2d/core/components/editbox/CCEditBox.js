
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/editbox/CCEditBox.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

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
var macro = require('../../platform/CCMacro');

var EditBoxImplBase = require('../editbox/EditBoxImplBase');

var Label = require('../CCLabel');

var Types = require('./types');

var InputMode = Types.InputMode;
var InputFlag = Types.InputFlag;
var KeyboardReturnType = Types.KeyboardReturnType;

function capitalize(string) {
  return string.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 * !#en cc.EditBox is a component for inputing text, you can use it to gather small amounts of text from users.
 * !#zh EditBox 组件，用于获取用户的输入文本。
 * @class EditBox
 * @extends Component
 */


var EditBox = cc.Class({
  name: 'cc.EditBox',
  "extends": cc.Component,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/EditBox',
    inspector: 'packages://inspector/inspectors/comps/cceditbox.js',
    help: 'i18n:COMPONENT.help_url.editbox',
    executeInEditMode: true
  },
  properties: {
    _useOriginalSize: true,
    _string: '',

    /**
     * !#en Input string of EditBox.
     * !#zh 输入框的初始输入内容，如果为空则会显示占位符的文本。
     * @property {String} string
     */
    string: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.string',
      get: function get() {
        return this._string;
      },
      set: function set(value) {
        value = '' + value;

        if (this.maxLength >= 0 && value.length >= this.maxLength) {
          value = value.slice(0, this.maxLength);
        }

        this._string = value;

        this._updateString(value);
      }
    },

    /**
     * !#en The Label component attached to the node for EditBox's input text label
     * !#zh 输入框输入文本节点上挂载的 Label 组件对象
     * @property {Label} textLabel
     */
    textLabel: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.textLabel',
      "default": null,
      type: Label,
      notify: function notify(oldValue) {
        if (this.textLabel && this.textLabel !== oldValue) {
          this._updateTextLabel();

          this._updateLabels();
        }
      }
    },

    /**
    * !#en The Label component attached to the node for EditBox's placeholder text label
    * !#zh 输入框占位符节点上挂载的 Label 组件对象
    * @property {Label} placeholderLabel
    */
    placeholderLabel: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.placeholderLabel',
      "default": null,
      type: Label,
      notify: function notify(oldValue) {
        if (this.placeholderLabel && this.placeholderLabel !== oldValue) {
          this._updatePlaceholderLabel();

          this._updateLabels();
        }
      }
    },

    /**
     * !#en The Sprite component attached to the node for EditBox's background
     * !#zh 输入框背景节点上挂载的 Sprite 组件对象
     * @property {Sprite} background
     */
    background: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.background',
      "default": null,
      type: cc.Sprite,
      notify: function notify(oldValue) {
        if (this.background && this.background !== oldValue) {
          this._updateBackgroundSprite();
        }
      }
    },
    // To be removed in the future
    _N$backgroundImage: {
      "default": undefined,
      type: cc.SpriteFrame
    },

    /**
     * !#en The background image of EditBox. This property will be removed in the future, use editBox.background instead please.
     * !#zh 输入框的背景图片。 该属性会在将来的版本中移除，请用 editBox.background
     * @property {SpriteFrame} backgroundImage
     * @deprecated since v2.1
     */
    backgroundImage: {
      get: function get() {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.backgroundImage', 'editBox.background');
        if (!this.background) {
          return null;
        }

        return this.background.spriteFrame;
      },
      set: function set(value) {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.backgroundImage', 'editBox.background');
        if (this.background) {
          this.background.spriteFrame = value;
        }
      }
    },

    /**
     * !#en
     * The return key type of EditBox.
     * Note: it is meaningless for web platforms and desktop platforms.
     * !#zh
     * 指定移动设备上面回车按钮的样式。
     * 注意：这个选项对 web 平台与 desktop 平台无效。
     * @property {EditBox.KeyboardReturnType} returnType
     * @default KeyboardReturnType.DEFAULT
     */
    returnType: {
      "default": KeyboardReturnType.DEFAULT,
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.returnType',
      displayName: 'KeyboardReturnType',
      type: KeyboardReturnType
    },
    // To be removed in the future
    _N$returnType: {
      "default": undefined,
      type: cc.Float
    },

    /**
     * !#en Set the input flags that are to be applied to the EditBox.
     * !#zh 指定输入标志位，可以指定输入方式为密码或者单词首字母大写。
     * @property {EditBox.InputFlag} inputFlag
     * @default InputFlag.DEFAULT
     */
    inputFlag: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.input_flag',
      "default": InputFlag.DEFAULT,
      type: InputFlag,
      notify: function notify() {
        this._updateString(this._string);
      }
    },

    /**
     * !#en
     * Set the input mode of the edit box.
     * If you pass ANY, it will create a multiline EditBox.
     * !#zh
     * 指定输入模式: ANY表示多行输入，其它都是单行输入，移动平台上还可以指定键盘样式。
     * @property {EditBox.InputMode} inputMode
     * @default InputMode.ANY
     */
    inputMode: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.input_mode',
      "default": InputMode.ANY,
      type: InputMode,
      notify: function notify(oldValue) {
        if (this.inputMode !== oldValue) {
          this._updateTextLabel();

          this._updatePlaceholderLabel();
        }
      }
    },

    /**
     * !#en Font size of the input text. This property will be removed in the future, use editBox.textLabel.fontSize instead please.
     * !#zh 输入框文本的字体大小。 该属性会在将来的版本中移除，请使用 editBox.textLabel.fontSize。
     * @property {Number} fontSize
     * @deprecated since v2.1
     */
    fontSize: {
      get: function get() {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.fontSize', 'editBox.textLabel.fontSize');
        if (!this.textLabel) {
          return 0;
        }

        return this.textLabel.fontSize;
      },
      set: function set(value) {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.fontSize', 'editBox.textLabel.fontSize');
        if (this.textLabel) {
          this.textLabel.fontSize = value;
        }
      }
    },
    // To be removed in the future
    _N$fontSize: {
      "default": undefined,
      type: cc.Float
    },

    /**
     * !#en Change the lineHeight of displayed text. This property will be removed in the future, use editBox.textLabel.lineHeight instead.
     * !#zh 输入框文本的行高。该属性会在将来的版本中移除，请使用 editBox.textLabel.lineHeight
     * @property {Number} lineHeight
     * @deprecated since v2.1
     */
    lineHeight: {
      get: function get() {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.lineHeight', 'editBox.textLabel.lineHeight');
        if (!this.textLabel) {
          return 0;
        }

        return this.textLabel.lineHeight;
      },
      set: function set(value) {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.lineHeight', 'editBox.textLabel.lineHeight');
        if (this.textLabel) {
          this.textLabel.lineHeight = value;
        }
      }
    },
    // To be removed in the future
    _N$lineHeight: {
      "default": undefined,
      type: cc.Float
    },

    /**
     * !#en Font color of the input text. This property will be removed in the future, use editBox.textLabel.node.color instead.
     * !#zh 输入框文本的颜色。该属性会在将来的版本中移除，请使用 editBox.textLabel.node.color
     * @property {Color} fontColor
     * @deprecated since v2.1
     */
    fontColor: {
      get: function get() {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.fontColor', 'editBox.textLabel.node.color');
        if (!this.textLabel) {
          return cc.Color.BLACK;
        }

        return this.textLabel.node.color;
      },
      set: function set(value) {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.fontColor', 'editBox.textLabel.node.color');
        if (this.textLabel) {
          this.textLabel.node.color = value;
          this.textLabel.node.opacity = value.a;
        }
      }
    },
    // To be removed in the future
    _N$fontColor: undefined,

    /**
     * !#en The display text of placeholder.
     * !#zh 输入框占位符的文本内容。
     * @property {String} placeholder
     */
    placeholder: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.placeholder',
      get: function get() {
        if (!this.placeholderLabel) {
          return '';
        }

        return this.placeholderLabel.string;
      },
      set: function set(value) {
        if (this.placeholderLabel) {
          this.placeholderLabel.string = value;
        }
      }
    },
    // To be removed in the future
    _N$placeholder: {
      "default": undefined,
      type: cc.String
    },

    /**
     * !#en The font size of placeholder. This property will be removed in the future, use editBox.placeholderLabel.fontSize instead.
     * !#zh 输入框占位符的字体大小。该属性会在将来的版本中移除，请使用 editBox.placeholderLabel.fontSize
     * @property {Number} placeholderFontSize
     * @deprecated since v2.1
     */
    placeholderFontSize: {
      get: function get() {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.placeholderFontSize', 'editBox.placeholderLabel.fontSize');
        if (!this.placeholderLabel) {
          return 0;
        }

        return this.placeholderLabel.fontSize;
      },
      set: function set(value) {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.placeholderFontSize', 'editBox.placeholderLabel.fontSize');
        if (this.placeholderLabel) {
          this.placeholderLabel.fontSize = value;
        }
      }
    },
    // To be removed in the future
    _N$placeholderFontSize: {
      "default": undefined,
      type: cc.Float
    },

    /**
     * !#en The font color of placeholder. This property will be removed in the future, use editBox.placeholderLabel.node.color instead.
     * !#zh 输入框占位符的字体颜色。该属性会在将来的版本中移除，请使用 editBox.placeholderLabel.node.color
     * @property {Color} placeholderFontColor
     * @deprecated since v2.1
     */
    placeholderFontColor: {
      get: function get() {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.placeholderFontColor', 'editBox.placeholderLabel.node.color');
        if (!this.placeholderLabel) {
          return cc.Color.BLACK;
        }

        return this.placeholderLabel.node.color;
      },
      set: function set(value) {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.placeholderFontColor', 'editBox.placeholderLabel.node.color');
        if (this.placeholderLabel) {
          this.placeholderLabel.node.color = value;
          this.placeholderLabel.node.opacity = value.a;
        }
      }
    },
    // To be removed in the future
    _N$placeholderFontColor: undefined,

    /**
     * !#en The maximize input length of EditBox.
     * - If pass a value less than 0, it won't limit the input number of characters.
     * - If pass 0, it doesn't allow input any characters.
     * !#zh 输入框最大允许输入的字符个数。
     * - 如果值为小于 0 的值，则不会限制输入字符个数。
     * - 如果值为 0，则不允许用户进行任何输入。
     * @property {Number} maxLength
     */
    maxLength: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.max_length',
      "default": 20
    },
    // To be removed in the future
    _N$maxLength: {
      "default": undefined,
      type: cc.Float
    },

    /**
     * !#en The input is always visible and be on top of the game view (only useful on Web), this property will be removed on v2.1
     * !zh 输入框总是可见，并且永远在游戏视图的上面（这个属性只有在 Web 上面修改有意义），该属性会在 v2.1 中移除
     * Note: only available on Web at the moment.
     * @property {Boolean} stayOnTop
     * @deprecated since 2.0.8
     */
    stayOnTop: {
      "default": false,
      notify: function notify() {
        cc.warn('editBox.stayOnTop is removed since v2.1.');
      }
    },
    _tabIndex: 0,

    /**
     * !#en Set the tabIndex of the DOM input element (only useful on Web).
     * !#zh 修改 DOM 输入元素的 tabIndex（这个属性只有在 Web 上面修改有意义）。
     * @property {Number} tabIndex
     */
    tabIndex: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.tab_index',
      get: function get() {
        return this._tabIndex;
      },
      set: function set(value) {
        if (this._tabIndex !== value) {
          this._tabIndex = value;

          if (this._impl) {
            this._impl.setTabIndex(value);
          }
        }
      }
    },

    /**
     * !#en The event handler to be called when EditBox began to edit text.
     * !#zh 开始编辑文本输入框触发的事件回调。
     * @property {Component.EventHandler[]} editingDidBegan
     */
    editingDidBegan: {
      "default": [],
      type: cc.Component.EventHandler
    },

    /**
     * !#en The event handler to be called when EditBox text changes.
     * !#zh 编辑文本输入框时触发的事件回调。
     * @property {Component.EventHandler[]} textChanged
     */
    textChanged: {
      "default": [],
      type: cc.Component.EventHandler
    },

    /**
     * !#en The event handler to be called when EditBox edit ends.
     * !#zh 结束编辑文本输入框时触发的事件回调。
     * @property {Component.EventHandler[]} editingDidEnded
     */
    editingDidEnded: {
      "default": [],
      type: cc.Component.EventHandler
    },

    /**
     * !#en The event handler to be called when return key is pressed. Windows is not supported.
     * !#zh 当用户按下回车按键时的事件回调，目前不支持 windows 平台
     * @property {Component.EventHandler[]} editingReturn
     */
    editingReturn: {
      "default": [],
      type: cc.Component.EventHandler
    }
  },
  statics: {
    _ImplClass: EditBoxImplBase,
    // implemented on different platform adapter
    KeyboardReturnType: KeyboardReturnType,
    InputFlag: InputFlag,
    InputMode: InputMode
  },
  _init: function _init() {
    this._upgradeComp();

    this._isLabelVisible = true;
    this.node.on(cc.Node.EventType.SIZE_CHANGED, this._syncSize, this);
    var impl = this._impl = new EditBox._ImplClass();
    impl.init(this);

    this._updateString(this._string);

    this._syncSize();
  },
  _updateBackgroundSprite: function _updateBackgroundSprite() {
    var background = this.background; // If background doesn't exist, create one.

    if (!background) {
      var node = this.node.getChildByName('BACKGROUND_SPRITE');

      if (!node) {
        node = new cc.Node('BACKGROUND_SPRITE');
      }

      background = node.getComponent(cc.Sprite);

      if (!background) {
        background = node.addComponent(cc.Sprite);
      }

      node.parent = this.node;
      this.background = background;
    } // update


    background.type = cc.Sprite.Type.SLICED; // handle old data

    if (this._N$backgroundImage !== undefined) {
      background.spriteFrame = this._N$backgroundImage;
      this._N$backgroundImage = undefined;
    }
  },
  _updateTextLabel: function _updateTextLabel() {
    var textLabel = this.textLabel; // If textLabel doesn't exist, create one.

    if (!textLabel) {
      var node = this.node.getChildByName('TEXT_LABEL');

      if (!node) {
        node = new cc.Node('TEXT_LABEL');
      }

      textLabel = node.getComponent(Label);

      if (!textLabel) {
        textLabel = node.addComponent(Label);
      }

      node.parent = this.node;
      this.textLabel = textLabel;
    } // update


    textLabel.node.setAnchorPoint(0, 1);
    textLabel.overflow = Label.Overflow.CLAMP;

    if (this.inputMode === InputMode.ANY) {
      textLabel.verticalAlign = macro.VerticalTextAlignment.TOP;
      textLabel.enableWrapText = true;
    } else {
      textLabel.verticalAlign = macro.VerticalTextAlignment.CENTER;
      textLabel.enableWrapText = false;
    }

    textLabel.string = this._updateLabelStringStyle(this._string); // handle old data

    if (this._N$fontColor !== undefined) {
      textLabel.node.color = this._N$fontColor;
      textLabel.node.opacity = this._N$fontColor.a;
      this._N$fontColor = undefined;
    }

    if (this._N$fontSize !== undefined) {
      textLabel.fontSize = this._N$fontSize;
      this._N$fontSize = undefined;
    }

    if (this._N$lineHeight !== undefined) {
      textLabel.lineHeight = this._N$lineHeight;
      this._N$lineHeight = undefined;
    }
  },
  _updatePlaceholderLabel: function _updatePlaceholderLabel() {
    var placeholderLabel = this.placeholderLabel; // If placeholderLabel doesn't exist, create one.

    if (!placeholderLabel) {
      var node = this.node.getChildByName('PLACEHOLDER_LABEL');

      if (!node) {
        node = new cc.Node('PLACEHOLDER_LABEL');
      }

      placeholderLabel = node.getComponent(Label);

      if (!placeholderLabel) {
        placeholderLabel = node.addComponent(Label);
      }

      node.parent = this.node;
      this.placeholderLabel = placeholderLabel;
    } // update


    placeholderLabel.node.setAnchorPoint(0, 1);
    placeholderLabel.overflow = Label.Overflow.CLAMP;

    if (this.inputMode === InputMode.ANY) {
      placeholderLabel.verticalAlign = macro.VerticalTextAlignment.TOP;
      placeholderLabel.enableWrapText = true;
    } else {
      placeholderLabel.verticalAlign = macro.VerticalTextAlignment.CENTER;
      placeholderLabel.enableWrapText = false;
    }

    placeholderLabel.string = this.placeholder; // handle old data

    if (this._N$placeholderFontColor !== undefined) {
      placeholderLabel.node.color = this._N$placeholderFontColor;
      placeholderLabel.node.opacity = this._N$placeholderFontColor.a;
      this._N$placeholderFontColor = undefined;
    }

    if (this._N$placeholderFontSize !== undefined) {
      placeholderLabel.fontSize = this._N$placeholderFontSize;
      this._N$placeholderFontSize = undefined;
    }
  },
  _upgradeComp: function _upgradeComp() {
    if (this._N$returnType !== undefined) {
      this.returnType = this._N$returnType;
      this._N$returnType = undefined;
    }

    if (this._N$maxLength !== undefined) {
      this.maxLength = this._N$maxLength;
      this._N$maxLength = undefined;
    }

    if (this._N$backgroundImage !== undefined) {
      this._updateBackgroundSprite();
    }

    if (this._N$fontColor !== undefined || this._N$fontSize !== undefined || this._N$lineHeight !== undefined) {
      this._updateTextLabel();
    }

    if (this._N$placeholderFontColor !== undefined || this._N$placeholderFontSize !== undefined) {
      this._updatePlaceholderLabel();
    }

    if (this._N$placeholder !== undefined) {
      this.placeholder = this._N$placeholder;
      this._N$placeholder = undefined;
    }
  },
  _syncSize: function _syncSize() {
    if (this._impl) {
      var size = this.node.getContentSize();

      this._impl.setSize(size.width, size.height);
    }
  },
  _showLabels: function _showLabels() {
    this._isLabelVisible = true;

    this._updateLabels();
  },
  _hideLabels: function _hideLabels() {
    this._isLabelVisible = false;

    if (this.textLabel) {
      this.textLabel.node.active = false;
    }

    if (this.placeholderLabel) {
      this.placeholderLabel.node.active = false;
    }
  },
  _updateLabels: function _updateLabels() {
    if (this._isLabelVisible) {
      var content = this._string;

      if (this.textLabel) {
        this.textLabel.node.active = content !== '';
      }

      if (this.placeholderLabel) {
        this.placeholderLabel.node.active = content === '';
      }
    }
  },
  _updateString: function _updateString(text) {
    var textLabel = this.textLabel; // Not inited yet

    if (!textLabel) {
      return;
    }

    var displayText = text;

    if (displayText) {
      displayText = this._updateLabelStringStyle(displayText);
    }

    textLabel.string = displayText;

    this._updateLabels();
  },
  _updateLabelStringStyle: function _updateLabelStringStyle(text, ignorePassword) {
    var inputFlag = this.inputFlag;

    if (!ignorePassword && inputFlag === InputFlag.PASSWORD) {
      var passwordString = '';
      var len = text.length;

      for (var i = 0; i < len; ++i) {
        passwordString += "\u25CF";
      }

      text = passwordString;
    } else if (inputFlag === InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
      text = text.toUpperCase();
    } else if (inputFlag === InputFlag.INITIAL_CAPS_WORD) {
      text = capitalize(text);
    } else if (inputFlag === InputFlag.INITIAL_CAPS_SENTENCE) {
      text = capitalizeFirstLetter(text);
    }

    return text;
  },
  editBoxEditingDidBegan: function editBoxEditingDidBegan() {
    cc.Component.EventHandler.emitEvents(this.editingDidBegan, this);
    this.node.emit('editing-did-began', this);
  },
  editBoxEditingDidEnded: function editBoxEditingDidEnded() {
    cc.Component.EventHandler.emitEvents(this.editingDidEnded, this);
    this.node.emit('editing-did-ended', this);
  },
  editBoxTextChanged: function editBoxTextChanged(text) {
    text = this._updateLabelStringStyle(text, true);
    this.string = text;
    cc.Component.EventHandler.emitEvents(this.textChanged, text, this);
    this.node.emit('text-changed', this);
  },
  editBoxEditingReturn: function editBoxEditingReturn() {
    cc.Component.EventHandler.emitEvents(this.editingReturn, this);
    this.node.emit('editing-return', this);
  },
  onEnable: function onEnable() {
    if (!CC_EDITOR) {
      this._registerEvent();
    }

    if (this._impl) {
      this._impl.enable();
    }
  },
  onDisable: function onDisable() {
    if (!CC_EDITOR) {
      this._unregisterEvent();
    }

    if (this._impl) {
      this._impl.disable();
    }
  },
  onDestroy: function onDestroy() {
    if (this._impl) {
      this._impl.clear();
    }
  },
  __preload: function __preload() {
    this._init();
  },
  _registerEvent: function _registerEvent() {
    this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
  },
  _unregisterEvent: function _unregisterEvent() {
    this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
  },
  _onTouchBegan: function _onTouchBegan(event) {
    event.stopPropagation();
  },
  _onTouchCancel: function _onTouchCancel(event) {
    event.stopPropagation();
  },
  _onTouchEnded: function _onTouchEnded(event) {
    if (this._impl) {
      this._impl.beginEditing();
    }

    event.stopPropagation();
  },

  /**
   * !#en Let the EditBox get focus, this method will be removed on v2.1
   * !#zh 让当前 EditBox 获得焦点, 这个方法会在 v2.1 中移除
   * @method setFocus
   * @deprecated since 2.0.8
   */
  setFocus: function setFocus() {
    cc.errorID(1400, 'setFocus()', 'focus()');

    if (this._impl) {
      this._impl.setFocus(true);
    }
  },

  /**
   * !#en Let the EditBox get focus
   * !#zh 让当前 EditBox 获得焦点
   * @method focus
   */
  focus: function focus() {
    if (this._impl) {
      this._impl.setFocus(true);
    }
  },

  /**
   * !#en Let the EditBox lose focus
   * !#zh 让当前 EditBox 失去焦点
   * @method blur
   */
  blur: function blur() {
    if (this._impl) {
      this._impl.setFocus(false);
    }
  },

  /**
   * !#en Determine whether EditBox is getting focus or not.
   * !#zh 判断 EditBox 是否获得了焦点
   * @method isFocused
   */
  isFocused: function isFocused() {
    if (this._impl) {
      return this._impl.isFocused();
    } else {
      return false;
    }
  },
  update: function update() {
    if (this._impl) {
      this._impl.update();
    }
  }
});
cc.EditBox = module.exports = EditBox;

if (cc.sys.isBrowser) {
  require('./WebEditBoxImpl');
}
/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event editing-did-began
 * @param {Event.EventCustom} event
 * @param {EditBox} editbox - The EditBox component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event editing-did-ended
 * @param {Event.EventCustom} event
 * @param {EditBox} editbox - The EditBox component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event text-changed
 * @param {Event.EventCustom} event
 * @param {EditBox} editbox - The EditBox component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event editing-return
 * @param {Event.EventCustom} event
 * @param {EditBox} editbox - The EditBox component.
 */

/**
 * !#en if you don't need the EditBox and it isn't in any running Scene, you should
 * call the destroy method on this component or the associated node explicitly.
 * Otherwise, the created DOM element won't be removed from web page.
 * !#zh
 * 如果你不再使用 EditBox，并且组件未添加到场景中，那么你必须手动对组件或所在节点调用 destroy。
 * 这样才能移除网页上的 DOM 节点，避免 Web 平台内存泄露。
 * @example
 * editbox.node.parent = null;  // or  editbox.node.removeFromParent(false);
 * // when you don't need editbox anymore
 * editbox.node.destroy();
 * @method destroy
 * @return {Boolean} whether it is the first time the destroy being called
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvZWRpdGJveC9DQ0VkaXRCb3guanMiXSwibmFtZXMiOlsibWFjcm8iLCJyZXF1aXJlIiwiRWRpdEJveEltcGxCYXNlIiwiTGFiZWwiLCJUeXBlcyIsIklucHV0TW9kZSIsIklucHV0RmxhZyIsIktleWJvYXJkUmV0dXJuVHlwZSIsImNhcGl0YWxpemUiLCJzdHJpbmciLCJyZXBsYWNlIiwiYSIsInRvVXBwZXJDYXNlIiwiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwiY2hhckF0Iiwic2xpY2UiLCJFZGl0Qm94IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwiaW5zcGVjdG9yIiwiaGVscCIsImV4ZWN1dGVJbkVkaXRNb2RlIiwicHJvcGVydGllcyIsIl91c2VPcmlnaW5hbFNpemUiLCJfc3RyaW5nIiwidG9vbHRpcCIsIkNDX0RFViIsImdldCIsInNldCIsInZhbHVlIiwibWF4TGVuZ3RoIiwibGVuZ3RoIiwiX3VwZGF0ZVN0cmluZyIsInRleHRMYWJlbCIsInR5cGUiLCJub3RpZnkiLCJvbGRWYWx1ZSIsIl91cGRhdGVUZXh0TGFiZWwiLCJfdXBkYXRlTGFiZWxzIiwicGxhY2Vob2xkZXJMYWJlbCIsIl91cGRhdGVQbGFjZWhvbGRlckxhYmVsIiwiYmFja2dyb3VuZCIsIlNwcml0ZSIsIl91cGRhdGVCYWNrZ3JvdW5kU3ByaXRlIiwiX04kYmFja2dyb3VuZEltYWdlIiwidW5kZWZpbmVkIiwiU3ByaXRlRnJhbWUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJzcHJpdGVGcmFtZSIsInJldHVyblR5cGUiLCJERUZBVUxUIiwiZGlzcGxheU5hbWUiLCJfTiRyZXR1cm5UeXBlIiwiRmxvYXQiLCJpbnB1dEZsYWciLCJpbnB1dE1vZGUiLCJBTlkiLCJmb250U2l6ZSIsIl9OJGZvbnRTaXplIiwibGluZUhlaWdodCIsIl9OJGxpbmVIZWlnaHQiLCJmb250Q29sb3IiLCJDb2xvciIsIkJMQUNLIiwibm9kZSIsImNvbG9yIiwib3BhY2l0eSIsIl9OJGZvbnRDb2xvciIsInBsYWNlaG9sZGVyIiwiX04kcGxhY2Vob2xkZXIiLCJTdHJpbmciLCJwbGFjZWhvbGRlckZvbnRTaXplIiwiX04kcGxhY2Vob2xkZXJGb250U2l6ZSIsInBsYWNlaG9sZGVyRm9udENvbG9yIiwiX04kcGxhY2Vob2xkZXJGb250Q29sb3IiLCJfTiRtYXhMZW5ndGgiLCJzdGF5T25Ub3AiLCJ3YXJuIiwiX3RhYkluZGV4IiwidGFiSW5kZXgiLCJfaW1wbCIsInNldFRhYkluZGV4IiwiZWRpdGluZ0RpZEJlZ2FuIiwiRXZlbnRIYW5kbGVyIiwidGV4dENoYW5nZWQiLCJlZGl0aW5nRGlkRW5kZWQiLCJlZGl0aW5nUmV0dXJuIiwic3RhdGljcyIsIl9JbXBsQ2xhc3MiLCJfaW5pdCIsIl91cGdyYWRlQ29tcCIsIl9pc0xhYmVsVmlzaWJsZSIsIm9uIiwiTm9kZSIsIkV2ZW50VHlwZSIsIlNJWkVfQ0hBTkdFRCIsIl9zeW5jU2l6ZSIsImltcGwiLCJpbml0IiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJhZGRDb21wb25lbnQiLCJwYXJlbnQiLCJUeXBlIiwiU0xJQ0VEIiwic2V0QW5jaG9yUG9pbnQiLCJvdmVyZmxvdyIsIk92ZXJmbG93IiwiQ0xBTVAiLCJ2ZXJ0aWNhbEFsaWduIiwiVmVydGljYWxUZXh0QWxpZ25tZW50IiwiVE9QIiwiZW5hYmxlV3JhcFRleHQiLCJDRU5URVIiLCJfdXBkYXRlTGFiZWxTdHJpbmdTdHlsZSIsInNpemUiLCJnZXRDb250ZW50U2l6ZSIsInNldFNpemUiLCJ3aWR0aCIsImhlaWdodCIsIl9zaG93TGFiZWxzIiwiX2hpZGVMYWJlbHMiLCJhY3RpdmUiLCJjb250ZW50IiwidGV4dCIsImRpc3BsYXlUZXh0IiwiaWdub3JlUGFzc3dvcmQiLCJQQVNTV09SRCIsInBhc3N3b3JkU3RyaW5nIiwibGVuIiwiaSIsIklOSVRJQUxfQ0FQU19BTExfQ0hBUkFDVEVSUyIsIklOSVRJQUxfQ0FQU19XT1JEIiwiSU5JVElBTF9DQVBTX1NFTlRFTkNFIiwiZWRpdEJveEVkaXRpbmdEaWRCZWdhbiIsImVtaXRFdmVudHMiLCJlbWl0IiwiZWRpdEJveEVkaXRpbmdEaWRFbmRlZCIsImVkaXRCb3hUZXh0Q2hhbmdlZCIsImVkaXRCb3hFZGl0aW5nUmV0dXJuIiwib25FbmFibGUiLCJfcmVnaXN0ZXJFdmVudCIsImVuYWJsZSIsIm9uRGlzYWJsZSIsIl91bnJlZ2lzdGVyRXZlbnQiLCJkaXNhYmxlIiwib25EZXN0cm95IiwiY2xlYXIiLCJfX3ByZWxvYWQiLCJUT1VDSF9TVEFSVCIsIl9vblRvdWNoQmVnYW4iLCJUT1VDSF9FTkQiLCJfb25Ub3VjaEVuZGVkIiwib2ZmIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJfb25Ub3VjaENhbmNlbCIsImJlZ2luRWRpdGluZyIsInNldEZvY3VzIiwiZXJyb3JJRCIsImZvY3VzIiwiYmx1ciIsImlzRm9jdXNlZCIsInVwZGF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJzeXMiLCJpc0Jyb3dzZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyx3QkFBRCxDQUFyQjs7QUFDQSxJQUFNQyxlQUFlLEdBQUdELE9BQU8sQ0FBQyw0QkFBRCxDQUEvQjs7QUFDQSxJQUFNRSxLQUFLLEdBQUdGLE9BQU8sQ0FBQyxZQUFELENBQXJCOztBQUNBLElBQU1HLEtBQUssR0FBR0gsT0FBTyxDQUFDLFNBQUQsQ0FBckI7O0FBQ0EsSUFBTUksU0FBUyxHQUFHRCxLQUFLLENBQUNDLFNBQXhCO0FBQ0EsSUFBTUMsU0FBUyxHQUFHRixLQUFLLENBQUNFLFNBQXhCO0FBQ0EsSUFBTUMsa0JBQWtCLEdBQUdILEtBQUssQ0FBQ0csa0JBQWpDOztBQUVBLFNBQVNDLFVBQVQsQ0FBcUJDLE1BQXJCLEVBQTZCO0FBQ3pCLFNBQU9BLE1B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LEtBQUtuRixLQUFULEVBQWdCO0FBQ1osV0FBS0EsS0FBTCxDQUFXbUYsTUFBWDtBQUNIO0FBQ0o7QUF6eEJrQixDQUFULENBQWQ7QUE2eEJBdkosRUFBRSxDQUFDRCxPQUFILEdBQWF5SixNQUFNLENBQUNDLE9BQVAsR0FBaUIxSixPQUE5Qjs7QUFFQSxJQUFJQyxFQUFFLENBQUMwSixHQUFILENBQU9DLFNBQVgsRUFBc0I7QUFDbEIzSyxFQUFBQSxPQUFPLENBQUMsa0JBQUQsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7QUFVQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBtYWNybyA9IHJlcXVpcmUoJy4uLy4uL3BsYXRmb3JtL0NDTWFjcm8nKTtcbmNvbnN0IEVkaXRCb3hJbXBsQmFzZSA9IHJlcXVpcmUoJy4uL2VkaXRib3gvRWRpdEJveEltcGxCYXNlJyk7XG5jb25zdCBMYWJlbCA9IHJlcXVpcmUoJy4uL0NDTGFiZWwnKTtcbmNvbnN0IFR5cGVzID0gcmVxdWlyZSgnLi90eXBlcycpO1xuY29uc3QgSW5wdXRNb2RlID0gVHlwZXMuSW5wdXRNb2RlO1xuY29uc3QgSW5wdXRGbGFnID0gVHlwZXMuSW5wdXRGbGFnO1xuY29uc3QgS2V5Ym9hcmRSZXR1cm5UeXBlID0gVHlwZXMuS2V5Ym9hcmRSZXR1cm5UeXBlO1xuXG5mdW5jdGlvbiBjYXBpdGFsaXplIChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyg/Ol58XFxzKVxcUy9nLCBmdW5jdGlvbihhKSB7IHJldHVybiBhLnRvVXBwZXJDYXNlKCk7IH0pO1xufVxuXG5mdW5jdGlvbiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIgKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG59XG5cblxuLyoqXG4gKiAhI2VuIGNjLkVkaXRCb3ggaXMgYSBjb21wb25lbnQgZm9yIGlucHV0aW5nIHRleHQsIHlvdSBjYW4gdXNlIGl0IHRvIGdhdGhlciBzbWFsbCBhbW91bnRzIG9mIHRleHQgZnJvbSB1c2Vycy5cbiAqICEjemggRWRpdEJveCDnu4Tku7bvvIznlKjkuo7ojrflj5bnlKjmiLfnmoTovpPlhaXmlofmnKzjgIJcbiAqIEBjbGFzcyBFZGl0Qm94XG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcbiAqL1xubGV0IEVkaXRCb3ggPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkVkaXRCb3gnLFxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC51aS9FZGl0Qm94JyxcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9jY2VkaXRib3guanMnLFxuICAgICAgICBoZWxwOiAnaTE4bjpDT01QT05FTlQuaGVscF91cmwuZWRpdGJveCcsXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlLFxuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIF91c2VPcmlnaW5hbFNpemU6IHRydWUsXG4gICAgICAgIF9zdHJpbmc6ICcnLFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBJbnB1dCBzdHJpbmcgb2YgRWRpdEJveC5cbiAgICAgICAgICogISN6aCDovpPlhaXmoYbnmoTliJ3lp4vovpPlhaXlhoXlrrnvvIzlpoLmnpzkuLrnqbrliJnkvJrmmL7npLrljaDkvY3nrKbnmoTmlofmnKzjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IHN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgc3RyaW5nOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmVkaXRib3guc3RyaW5nJyxcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmluZztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICcnICsgdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4TGVuZ3RoID49IDAgJiYgdmFsdWUubGVuZ3RoID49IHRoaXMubWF4TGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMCwgdGhpcy5tYXhMZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3N0cmluZyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0cmluZyh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIExhYmVsIGNvbXBvbmVudCBhdHRhY2hlZCB0byB0aGUgbm9kZSBmb3IgRWRpdEJveCdzIGlucHV0IHRleHQgbGFiZWxcbiAgICAgICAgICogISN6aCDovpPlhaXmoYbovpPlhaXmlofmnKzoioLngrnkuIrmjILovb3nmoQgTGFiZWwg57uE5Lu25a+56LGhXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TGFiZWx9IHRleHRMYWJlbFxuICAgICAgICAgKi9cbiAgICAgICAgdGV4dExhYmVsOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmVkaXRib3gudGV4dExhYmVsJyxcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBMYWJlbCxcbiAgICAgICAgICAgIG5vdGlmeSAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZXh0TGFiZWwgJiYgdGhpcy50ZXh0TGFiZWwgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRleHRMYWJlbCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVMYWJlbHMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgTGFiZWwgY29tcG9uZW50IGF0dGFjaGVkIHRvIHRoZSBub2RlIGZvciBFZGl0Qm94J3MgcGxhY2Vob2xkZXIgdGV4dCBsYWJlbFxuICAgICAgICAgKiAhI3poIOi+k+WFpeahhuWNoOS9jeespuiKgueCueS4iuaMgui9veeahCBMYWJlbCDnu4Tku7blr7nosaFcbiAgICAgICAgICogQHByb3BlcnR5IHtMYWJlbH0gcGxhY2Vob2xkZXJMYWJlbFxuICAgICAgICAgKi9cbiAgICAgICAgcGxhY2Vob2xkZXJMYWJlbDoge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5lZGl0Ym94LnBsYWNlaG9sZGVyTGFiZWwnLFxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IExhYmVsLFxuICAgICAgICAgICAgbm90aWZ5IChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYWNlaG9sZGVyTGFiZWwgJiYgdGhpcy5wbGFjZWhvbGRlckxhYmVsICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVQbGFjZWhvbGRlckxhYmVsKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxhYmVscygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIFNwcml0ZSBjb21wb25lbnQgYXR0YWNoZWQgdG8gdGhlIG5vZGUgZm9yIEVkaXRCb3gncyBiYWNrZ3JvdW5kXG4gICAgICAgICAqICEjemgg6L6T5YWl5qGG6IOM5pmv6IqC54K55LiK5oyC6L2955qEIFNwcml0ZSDnu4Tku7blr7nosaFcbiAgICAgICAgICogQHByb3BlcnR5IHtTcHJpdGV9IGJhY2tncm91bmRcbiAgICAgICAgICovXG4gICAgICAgIGJhY2tncm91bmQ6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuZWRpdGJveC5iYWNrZ3JvdW5kJyxcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGUsXG4gICAgICAgICAgICBub3RpZnkgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmFja2dyb3VuZCAmJiB0aGlzLmJhY2tncm91bmQgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUJhY2tncm91bmRTcHJpdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFRvIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZVxuICAgICAgICBfTiRiYWNrZ3JvdW5kSW1hZ2U6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBiYWNrZ3JvdW5kIGltYWdlIG9mIEVkaXRCb3guIFRoaXMgcHJvcGVydHkgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUsIHVzZSBlZGl0Qm94LmJhY2tncm91bmQgaW5zdGVhZCBwbGVhc2UuXG4gICAgICAgICAqICEjemgg6L6T5YWl5qGG55qE6IOM5pmv5Zu+54mH44CCIOivpeWxnuaAp+S8muWcqOWwhuadpeeahOeJiOacrOS4reenu+mZpO+8jOivt+eUqCBlZGl0Qm94LmJhY2tncm91bmRcbiAgICAgICAgICogQHByb3BlcnR5IHtTcHJpdGVGcmFtZX0gYmFja2dyb3VuZEltYWdlXG4gICAgICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjFcbiAgICAgICAgICovXG4gICAgICAgIGJhY2tncm91bmRJbWFnZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoIUNDX0VESVRPUikgY2Mud2FybklEKDE0MDAsICdlZGl0Qm94LmJhY2tncm91bmRJbWFnZScsICdlZGl0Qm94LmJhY2tncm91bmQnKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYmFja2dyb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmFja2dyb3VuZC5zcHJpdGVGcmFtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKCFDQ19FRElUT1IpIGNjLndhcm5JRCgxNDAwLCAnZWRpdEJveC5iYWNrZ3JvdW5kSW1hZ2UnLCAnZWRpdEJveC5iYWNrZ3JvdW5kJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmFja2dyb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhY2tncm91bmQuc3ByaXRlRnJhbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSByZXR1cm4ga2V5IHR5cGUgb2YgRWRpdEJveC5cbiAgICAgICAgICogTm90ZTogaXQgaXMgbWVhbmluZ2xlc3MgZm9yIHdlYiBwbGF0Zm9ybXMgYW5kIGRlc2t0b3AgcGxhdGZvcm1zLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOaMh+Wumuenu+WKqOiuvuWkh+S4iumdouWbnui9puaMiemSrueahOagt+W8j+OAglxuICAgICAgICAgKiDms6jmhI/vvJrov5nkuKrpgInpobnlr7kgd2ViIOW5s+WPsOS4jiBkZXNrdG9wIOW5s+WPsOaXoOaViOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge0VkaXRCb3guS2V5Ym9hcmRSZXR1cm5UeXBlfSByZXR1cm5UeXBlXG4gICAgICAgICAqIEBkZWZhdWx0IEtleWJvYXJkUmV0dXJuVHlwZS5ERUZBVUxUXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm5UeXBlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBLZXlib2FyZFJldHVyblR5cGUuREVGQVVMVCxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuZWRpdGJveC5yZXR1cm5UeXBlJyxcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnS2V5Ym9hcmRSZXR1cm5UeXBlJyxcbiAgICAgICAgICAgIHR5cGU6IEtleWJvYXJkUmV0dXJuVHlwZSxcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUbyBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmVcbiAgICAgICAgX04kcmV0dXJuVHlwZToge1xuICAgICAgICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdHlwZTogY2MuRmxvYXQsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gU2V0IHRoZSBpbnB1dCBmbGFncyB0aGF0IGFyZSB0byBiZSBhcHBsaWVkIHRvIHRoZSBFZGl0Qm94LlxuICAgICAgICAgKiAhI3poIOaMh+Wumui+k+WFpeagh+W/l+S9je+8jOWPr+S7peaMh+Wumui+k+WFpeaWueW8j+S4uuWvhueggeaIluiAheWNleivjemmluWtl+avjeWkp+WGmeOAglxuICAgICAgICAgKiBAcHJvcGVydHkge0VkaXRCb3guSW5wdXRGbGFnfSBpbnB1dEZsYWdcbiAgICAgICAgICogQGRlZmF1bHQgSW5wdXRGbGFnLkRFRkFVTFRcbiAgICAgICAgICovXG4gICAgICAgIGlucHV0RmxhZzoge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5lZGl0Ym94LmlucHV0X2ZsYWcnLFxuICAgICAgICAgICAgZGVmYXVsdDogSW5wdXRGbGFnLkRFRkFVTFQsXG4gICAgICAgICAgICB0eXBlOiBJbnB1dEZsYWcsXG4gICAgICAgICAgICBub3RpZnkgKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0cmluZyh0aGlzLl9zdHJpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBTZXQgdGhlIGlucHV0IG1vZGUgb2YgdGhlIGVkaXQgYm94LlxuICAgICAgICAgKiBJZiB5b3UgcGFzcyBBTlksIGl0IHdpbGwgY3JlYXRlIGEgbXVsdGlsaW5lIEVkaXRCb3guXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5oyH5a6a6L6T5YWl5qih5byPOiBBTlnooajnpLrlpJrooYzovpPlhaXvvIzlhbblroPpg73mmK/ljZXooYzovpPlhaXvvIznp7vliqjlubPlj7DkuIrov5jlj6/ku6XmjIflrprplK7nm5jmoLflvI/jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtFZGl0Qm94LklucHV0TW9kZX0gaW5wdXRNb2RlXG4gICAgICAgICAqIEBkZWZhdWx0IElucHV0TW9kZS5BTllcbiAgICAgICAgICovXG4gICAgICAgIGlucHV0TW9kZToge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5lZGl0Ym94LmlucHV0X21vZGUnLFxuICAgICAgICAgICAgZGVmYXVsdDogSW5wdXRNb2RlLkFOWSxcbiAgICAgICAgICAgIHR5cGU6IElucHV0TW9kZSxcbiAgICAgICAgICAgIG5vdGlmeSAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnB1dE1vZGUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRleHRMYWJlbCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVQbGFjZWhvbGRlckxhYmVsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEZvbnQgc2l6ZSBvZiB0aGUgaW5wdXQgdGV4dC4gVGhpcyBwcm9wZXJ0eSB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSwgdXNlIGVkaXRCb3gudGV4dExhYmVsLmZvbnRTaXplIGluc3RlYWQgcGxlYXNlLlxuICAgICAgICAgKiAhI3poIOi+k+WFpeahhuaWh+acrOeahOWtl+S9k+Wkp+Wwj+OAgiDor6XlsZ7mgKfkvJrlnKjlsIbmnaXnmoTniYjmnKzkuK3np7vpmaTvvIzor7fkvb/nlKggZWRpdEJveC50ZXh0TGFiZWwuZm9udFNpemXjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGZvbnRTaXplXG4gICAgICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjFcbiAgICAgICAgICovXG4gICAgICAgIGZvbnRTaXplOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIC8vIGlmICghQ0NfRURJVE9SKSBjYy53YXJuSUQoMTQwMCwgJ2VkaXRCb3guZm9udFNpemUnLCAnZWRpdEJveC50ZXh0TGFiZWwuZm9udFNpemUnKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGV4dExhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0TGFiZWwuZm9udFNpemU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIGlmICghQ0NfRURJVE9SKSBjYy53YXJuSUQoMTQwMCwgJ2VkaXRCb3guZm9udFNpemUnLCAnZWRpdEJveC50ZXh0TGFiZWwuZm9udFNpemUnKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZXh0TGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0TGFiZWwuZm9udFNpemUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFRvIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZVxuICAgICAgICBfTiRmb250U2l6ZToge1xuICAgICAgICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdHlwZTogY2MuRmxvYXQsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQ2hhbmdlIHRoZSBsaW5lSGVpZ2h0IG9mIGRpc3BsYXllZCB0ZXh0LiBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlLCB1c2UgZWRpdEJveC50ZXh0TGFiZWwubGluZUhlaWdodCBpbnN0ZWFkLlxuICAgICAgICAgKiAhI3poIOi+k+WFpeahhuaWh+acrOeahOihjOmrmOOAguivpeWxnuaAp+S8muWcqOWwhuadpeeahOeJiOacrOS4reenu+mZpO+8jOivt+S9v+eUqCBlZGl0Qm94LnRleHRMYWJlbC5saW5lSGVpZ2h0XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBsaW5lSGVpZ2h0XG4gICAgICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjFcbiAgICAgICAgICovXG4gICAgICAgIGxpbmVIZWlnaHQ6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKCFDQ19FRElUT1IpIGNjLndhcm5JRCgxNDAwLCAnZWRpdEJveC5saW5lSGVpZ2h0JywgJ2VkaXRCb3gudGV4dExhYmVsLmxpbmVIZWlnaHQnKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGV4dExhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0TGFiZWwubGluZUhlaWdodDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKCFDQ19FRElUT1IpIGNjLndhcm5JRCgxNDAwLCAnZWRpdEJveC5saW5lSGVpZ2h0JywgJ2VkaXRCb3gudGV4dExhYmVsLmxpbmVIZWlnaHQnKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZXh0TGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0TGFiZWwubGluZUhlaWdodCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVG8gYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlXG4gICAgICAgIF9OJGxpbmVIZWlnaHQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkZsb2F0LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEZvbnQgY29sb3Igb2YgdGhlIGlucHV0IHRleHQuIFRoaXMgcHJvcGVydHkgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUsIHVzZSBlZGl0Qm94LnRleHRMYWJlbC5ub2RlLmNvbG9yIGluc3RlYWQuXG4gICAgICAgICAqICEjemgg6L6T5YWl5qGG5paH5pys55qE6aKc6Imy44CC6K+l5bGe5oCn5Lya5Zyo5bCG5p2l55qE54mI5pys5Lit56e76Zmk77yM6K+35L2/55SoIGVkaXRCb3gudGV4dExhYmVsLm5vZGUuY29sb3JcbiAgICAgICAgICogQHByb3BlcnR5IHtDb2xvcn0gZm9udENvbG9yXG4gICAgICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjFcbiAgICAgICAgICovXG4gICAgICAgIGZvbnRDb2xvcjoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoIUNDX0VESVRPUikgY2Mud2FybklEKDE0MDAsICdlZGl0Qm94LmZvbnRDb2xvcicsICdlZGl0Qm94LnRleHRMYWJlbC5ub2RlLmNvbG9yJyk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnRleHRMYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2MuQ29sb3IuQkxBQ0s7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRleHRMYWJlbC5ub2RlLmNvbG9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoIUNDX0VESVRPUikgY2Mud2FybklEKDE0MDAsICdlZGl0Qm94LmZvbnRDb2xvcicsICdlZGl0Qm94LnRleHRMYWJlbC5ub2RlLmNvbG9yJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGV4dExhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dExhYmVsLm5vZGUuY29sb3IgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0TGFiZWwubm9kZS5vcGFjaXR5ID0gdmFsdWUuYTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFRvIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZVxuICAgICAgICBfTiRmb250Q29sb3I6IHVuZGVmaW5lZCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgZGlzcGxheSB0ZXh0IG9mIHBsYWNlaG9sZGVyLlxuICAgICAgICAgKiAhI3poIOi+k+WFpeahhuWNoOS9jeespueahOaWh+acrOWGheWuueOAglxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgICAgICovXG4gICAgICAgIHBsYWNlaG9sZGVyOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmVkaXRib3gucGxhY2Vob2xkZXInLFxuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucGxhY2Vob2xkZXJMYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYWNlaG9sZGVyTGFiZWwuc3RyaW5nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGFjZWhvbGRlckxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXJMYWJlbC5zdHJpbmcgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVG8gYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlXG4gICAgICAgIF9OJHBsYWNlaG9sZGVyOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0eXBlOiBjYy5TdHJpbmcsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGZvbnQgc2l6ZSBvZiBwbGFjZWhvbGRlci4gVGhpcyBwcm9wZXJ0eSB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSwgdXNlIGVkaXRCb3gucGxhY2Vob2xkZXJMYWJlbC5mb250U2l6ZSBpbnN0ZWFkLlxuICAgICAgICAgKiAhI3poIOi+k+WFpeahhuWNoOS9jeespueahOWtl+S9k+Wkp+Wwj+OAguivpeWxnuaAp+S8muWcqOWwhuadpeeahOeJiOacrOS4reenu+mZpO+8jOivt+S9v+eUqCBlZGl0Qm94LnBsYWNlaG9sZGVyTGFiZWwuZm9udFNpemVcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHBsYWNlaG9sZGVyRm9udFNpemVcbiAgICAgICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMVxuICAgICAgICAgKi9cbiAgICAgICAgcGxhY2Vob2xkZXJGb250U2l6ZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoIUNDX0VESVRPUikgY2Mud2FybklEKDE0MDAsICdlZGl0Qm94LnBsYWNlaG9sZGVyRm9udFNpemUnLCAnZWRpdEJveC5wbGFjZWhvbGRlckxhYmVsLmZvbnRTaXplJyk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBsYWNlaG9sZGVyTGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYWNlaG9sZGVyTGFiZWwuZm9udFNpemU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIGlmICghQ0NfRURJVE9SKSBjYy53YXJuSUQoMTQwMCwgJ2VkaXRCb3gucGxhY2Vob2xkZXJGb250U2l6ZScsICdlZGl0Qm94LnBsYWNlaG9sZGVyTGFiZWwuZm9udFNpemUnKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGFjZWhvbGRlckxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXJMYWJlbC5mb250U2l6ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVG8gYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlXG4gICAgICAgIF9OJHBsYWNlaG9sZGVyRm9udFNpemU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkZsb2F0LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBmb250IGNvbG9yIG9mIHBsYWNlaG9sZGVyLiBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlLCB1c2UgZWRpdEJveC5wbGFjZWhvbGRlckxhYmVsLm5vZGUuY29sb3IgaW5zdGVhZC5cbiAgICAgICAgICogISN6aCDovpPlhaXmoYbljaDkvY3nrKbnmoTlrZfkvZPpopzoibLjgILor6XlsZ7mgKfkvJrlnKjlsIbmnaXnmoTniYjmnKzkuK3np7vpmaTvvIzor7fkvb/nlKggZWRpdEJveC5wbGFjZWhvbGRlckxhYmVsLm5vZGUuY29sb3JcbiAgICAgICAgICogQHByb3BlcnR5IHtDb2xvcn0gcGxhY2Vob2xkZXJGb250Q29sb3JcbiAgICAgICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMVxuICAgICAgICAgKi9cbiAgICAgICAgcGxhY2Vob2xkZXJGb250Q29sb3I6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKCFDQ19FRElUT1IpIGNjLndhcm5JRCgxNDAwLCAnZWRpdEJveC5wbGFjZWhvbGRlckZvbnRDb2xvcicsICdlZGl0Qm94LnBsYWNlaG9sZGVyTGFiZWwubm9kZS5jb2xvcicpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wbGFjZWhvbGRlckxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYy5Db2xvci5CTEFDSztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxhY2Vob2xkZXJMYWJlbC5ub2RlLmNvbG9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoIUNDX0VESVRPUikgY2Mud2FybklEKDE0MDAsICdlZGl0Qm94LnBsYWNlaG9sZGVyRm9udENvbG9yJywgJ2VkaXRCb3gucGxhY2Vob2xkZXJMYWJlbC5ub2RlLmNvbG9yJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxhY2Vob2xkZXJMYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyTGFiZWwubm9kZS5jb2xvciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyTGFiZWwubm9kZS5vcGFjaXR5ID0gdmFsdWUuYTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFRvIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZVxuICAgICAgICBfTiRwbGFjZWhvbGRlckZvbnRDb2xvcjogdW5kZWZpbmVkLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBtYXhpbWl6ZSBpbnB1dCBsZW5ndGggb2YgRWRpdEJveC5cbiAgICAgICAgICogLSBJZiBwYXNzIGEgdmFsdWUgbGVzcyB0aGFuIDAsIGl0IHdvbid0IGxpbWl0IHRoZSBpbnB1dCBudW1iZXIgb2YgY2hhcmFjdGVycy5cbiAgICAgICAgICogLSBJZiBwYXNzIDAsIGl0IGRvZXNuJ3QgYWxsb3cgaW5wdXQgYW55IGNoYXJhY3RlcnMuXG4gICAgICAgICAqICEjemgg6L6T5YWl5qGG5pyA5aSn5YWB6K646L6T5YWl55qE5a2X56ym5Liq5pWw44CCXG4gICAgICAgICAqIC0g5aaC5p6c5YC85Li65bCP5LqOIDAg55qE5YC877yM5YiZ5LiN5Lya6ZmQ5Yi26L6T5YWl5a2X56ym5Liq5pWw44CCXG4gICAgICAgICAqIC0g5aaC5p6c5YC85Li6IDDvvIzliJnkuI3lhYHorrjnlKjmiLfov5vooYzku7vkvZXovpPlhaXjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG1heExlbmd0aFxuICAgICAgICAgKi9cbiAgICAgICAgbWF4TGVuZ3RoOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmVkaXRib3gubWF4X2xlbmd0aCcsXG4gICAgICAgICAgICBkZWZhdWx0OiAyMCxcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUbyBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmVcbiAgICAgICAgX04kbWF4TGVuZ3RoOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0eXBlOiBjYy5GbG9hdCxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgaW5wdXQgaXMgYWx3YXlzIHZpc2libGUgYW5kIGJlIG9uIHRvcCBvZiB0aGUgZ2FtZSB2aWV3IChvbmx5IHVzZWZ1bCBvbiBXZWIpLCB0aGlzIHByb3BlcnR5IHdpbGwgYmUgcmVtb3ZlZCBvbiB2Mi4xXG4gICAgICAgICAqICF6aCDovpPlhaXmoYbmgLvmmK/lj6/op4HvvIzlubbkuJTmsLjov5zlnKjmuLjmiI/op4blm77nmoTkuIrpnaLvvIjov5nkuKrlsZ7mgKflj6rmnInlnKggV2ViIOS4iumdouS/ruaUueacieaEj+S5ie+8ie+8jOivpeWxnuaAp+S8muWcqCB2Mi4xIOS4reenu+mZpFxuICAgICAgICAgKiBOb3RlOiBvbmx5IGF2YWlsYWJsZSBvbiBXZWIgYXQgdGhlIG1vbWVudC5cbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBzdGF5T25Ub3BcbiAgICAgICAgICogQGRlcHJlY2F0ZWQgc2luY2UgMi4wLjhcbiAgICAgICAgICovXG4gICAgICAgIHN0YXlPblRvcDoge1xuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICBub3RpZnkgKCkge1xuICAgICAgICAgICAgICAgIGNjLndhcm4oJ2VkaXRCb3guc3RheU9uVG9wIGlzIHJlbW92ZWQgc2luY2UgdjIuMS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfdGFiSW5kZXg6IDAsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gU2V0IHRoZSB0YWJJbmRleCBvZiB0aGUgRE9NIGlucHV0IGVsZW1lbnQgKG9ubHkgdXNlZnVsIG9uIFdlYikuXG4gICAgICAgICAqICEjemgg5L+u5pS5IERPTSDovpPlhaXlhYPntKDnmoQgdGFiSW5kZXjvvIjov5nkuKrlsZ7mgKflj6rmnInlnKggV2ViIOS4iumdouS/ruaUueacieaEj+S5ie+8ieOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdGFiSW5kZXhcbiAgICAgICAgICovXG4gICAgICAgIHRhYkluZGV4OiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmVkaXRib3gudGFiX2luZGV4JyxcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhYkluZGV4O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdGFiSW5kZXggIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbXBsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbXBsLnNldFRhYkluZGV4KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgZXZlbnQgaGFuZGxlciB0byBiZSBjYWxsZWQgd2hlbiBFZGl0Qm94IGJlZ2FuIHRvIGVkaXQgdGV4dC5cbiAgICAgICAgICogISN6aCDlvIDlp4vnvJbovpHmlofmnKzovpPlhaXmoYbop6blj5HnmoTkuovku7blm57osIPjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtDb21wb25lbnQuRXZlbnRIYW5kbGVyW119IGVkaXRpbmdEaWRCZWdhblxuICAgICAgICAgKi9cbiAgICAgICAgZWRpdGluZ0RpZEJlZ2FuOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGV2ZW50IGhhbmRsZXIgdG8gYmUgY2FsbGVkIHdoZW4gRWRpdEJveCB0ZXh0IGNoYW5nZXMuXG4gICAgICAgICAqICEjemgg57yW6L6R5paH5pys6L6T5YWl5qGG5pe26Kem5Y+R55qE5LqL5Lu25Zue6LCD44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Q29tcG9uZW50LkV2ZW50SGFuZGxlcltdfSB0ZXh0Q2hhbmdlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGV4dENoYW5nZWQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcixcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgZXZlbnQgaGFuZGxlciB0byBiZSBjYWxsZWQgd2hlbiBFZGl0Qm94IGVkaXQgZW5kcy5cbiAgICAgICAgICogISN6aCDnu5PmnZ/nvJbovpHmlofmnKzovpPlhaXmoYbml7bop6blj5HnmoTkuovku7blm57osIPjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtDb21wb25lbnQuRXZlbnRIYW5kbGVyW119IGVkaXRpbmdEaWRFbmRlZFxuICAgICAgICAgKi9cbiAgICAgICAgZWRpdGluZ0RpZEVuZGVkOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGV2ZW50IGhhbmRsZXIgdG8gYmUgY2FsbGVkIHdoZW4gcmV0dXJuIGtleSBpcyBwcmVzc2VkLiBXaW5kb3dzIGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAgICAgICAqICEjemgg5b2T55So5oi35oyJ5LiL5Zue6L2m5oyJ6ZSu5pe255qE5LqL5Lu25Zue6LCD77yM55uu5YmN5LiN5pSv5oyBIHdpbmRvd3Mg5bmz5Y+wXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Q29tcG9uZW50LkV2ZW50SGFuZGxlcltdfSBlZGl0aW5nUmV0dXJuXG4gICAgICAgICAqL1xuICAgICAgICBlZGl0aW5nUmV0dXJuOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgX0ltcGxDbGFzczogRWRpdEJveEltcGxCYXNlLCAgLy8gaW1wbGVtZW50ZWQgb24gZGlmZmVyZW50IHBsYXRmb3JtIGFkYXB0ZXJcbiAgICAgICAgS2V5Ym9hcmRSZXR1cm5UeXBlOiBLZXlib2FyZFJldHVyblR5cGUsXG4gICAgICAgIElucHV0RmxhZzogSW5wdXRGbGFnLFxuICAgICAgICBJbnB1dE1vZGU6IElucHV0TW9kZVxuICAgIH0sXG5cbiAgICBfaW5pdCAoKSB7XG4gICAgICAgIHRoaXMuX3VwZ3JhZGVDb21wKCk7XG5cbiAgICAgICAgdGhpcy5faXNMYWJlbFZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLl9zeW5jU2l6ZSwgdGhpcyk7XG5cbiAgICAgICAgbGV0IGltcGwgPSB0aGlzLl9pbXBsID0gbmV3IEVkaXRCb3guX0ltcGxDbGFzcygpO1xuICAgICAgICBpbXBsLmluaXQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlU3RyaW5nKHRoaXMuX3N0cmluZyk7XG4gICAgICAgIHRoaXMuX3N5bmNTaXplKCk7XG4gICAgfSxcblxuICAgIF91cGRhdGVCYWNrZ3JvdW5kU3ByaXRlICgpIHtcbiAgICAgICAgbGV0IGJhY2tncm91bmQgPSB0aGlzLmJhY2tncm91bmQ7XG5cbiAgICAgICAgLy8gSWYgYmFja2dyb3VuZCBkb2Vzbid0IGV4aXN0LCBjcmVhdGUgb25lLlxuICAgICAgICBpZiAoIWJhY2tncm91bmQpIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdCQUNLR1JPVU5EX1NQUklURScpO1xuICAgICAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IG5ldyBjYy5Ob2RlKCdCQUNLR1JPVU5EX1NQUklURScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBiYWNrZ3JvdW5kID0gbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgICAgIGlmICghYmFja2dyb3VuZCkge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBiYWNrZ3JvdW5kO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlXG4gICAgICAgIGJhY2tncm91bmQudHlwZSA9IGNjLlNwcml0ZS5UeXBlLlNMSUNFRDtcbiAgICAgICAgXG4gICAgICAgIC8vIGhhbmRsZSBvbGQgZGF0YVxuICAgICAgICBpZiAodGhpcy5fTiRiYWNrZ3JvdW5kSW1hZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYmFja2dyb3VuZC5zcHJpdGVGcmFtZSA9IHRoaXMuX04kYmFja2dyb3VuZEltYWdlO1xuICAgICAgICAgICAgdGhpcy5fTiRiYWNrZ3JvdW5kSW1hZ2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3VwZGF0ZVRleHRMYWJlbCAoKSB7XG4gICAgICAgIGxldCB0ZXh0TGFiZWwgPSB0aGlzLnRleHRMYWJlbDtcblxuICAgICAgICAvLyBJZiB0ZXh0TGFiZWwgZG9lc24ndCBleGlzdCwgY3JlYXRlIG9uZS5cbiAgICAgICAgaWYgKCF0ZXh0TGFiZWwpIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdURVhUX0xBQkVMJyk7XG4gICAgICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgICAgICBub2RlID0gbmV3IGNjLk5vZGUoJ1RFWFRfTEFCRUwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRleHRMYWJlbCA9IG5vZGUuZ2V0Q29tcG9uZW50KExhYmVsKTtcbiAgICAgICAgICAgIGlmICghdGV4dExhYmVsKSB7XG4gICAgICAgICAgICAgICAgdGV4dExhYmVsID0gbm9kZS5hZGRDb21wb25lbnQoTGFiZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICB0aGlzLnRleHRMYWJlbCA9IHRleHRMYWJlbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZVxuICAgICAgICB0ZXh0TGFiZWwubm9kZS5zZXRBbmNob3JQb2ludCgwLCAxKTtcbiAgICAgICAgdGV4dExhYmVsLm92ZXJmbG93ID0gTGFiZWwuT3ZlcmZsb3cuQ0xBTVA7XG4gICAgICAgIGlmICh0aGlzLmlucHV0TW9kZSA9PT0gSW5wdXRNb2RlLkFOWSkge1xuICAgICAgICAgICAgdGV4dExhYmVsLnZlcnRpY2FsQWxpZ24gPSBtYWNyby5WZXJ0aWNhbFRleHRBbGlnbm1lbnQuVE9QO1xuICAgICAgICAgICAgdGV4dExhYmVsLmVuYWJsZVdyYXBUZXh0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRleHRMYWJlbC52ZXJ0aWNhbEFsaWduID0gbWFjcm8uVmVydGljYWxUZXh0QWxpZ25tZW50LkNFTlRFUjtcbiAgICAgICAgICAgIHRleHRMYWJlbC5lbmFibGVXcmFwVGV4dCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRleHRMYWJlbC5zdHJpbmcgPSB0aGlzLl91cGRhdGVMYWJlbFN0cmluZ1N0eWxlKHRoaXMuX3N0cmluZyk7XG5cbiAgICAgICAgLy8gaGFuZGxlIG9sZCBkYXRhXG4gICAgICAgIGlmICh0aGlzLl9OJGZvbnRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0ZXh0TGFiZWwubm9kZS5jb2xvciA9IHRoaXMuX04kZm9udENvbG9yO1xuICAgICAgICAgICAgdGV4dExhYmVsLm5vZGUub3BhY2l0eSA9IHRoaXMuX04kZm9udENvbG9yLmE7XG4gICAgICAgICAgICB0aGlzLl9OJGZvbnRDb2xvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fTiRmb250U2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0ZXh0TGFiZWwuZm9udFNpemUgPSB0aGlzLl9OJGZvbnRTaXplO1xuICAgICAgICAgICAgdGhpcy5fTiRmb250U2l6ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fTiRsaW5lSGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRleHRMYWJlbC5saW5lSGVpZ2h0ID0gdGhpcy5fTiRsaW5lSGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5fTiRsaW5lSGVpZ2h0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF91cGRhdGVQbGFjZWhvbGRlckxhYmVsICgpIHtcbiAgICAgICAgbGV0IHBsYWNlaG9sZGVyTGFiZWwgPSB0aGlzLnBsYWNlaG9sZGVyTGFiZWw7XG5cbiAgICAgICAgLy8gSWYgcGxhY2Vob2xkZXJMYWJlbCBkb2Vzbid0IGV4aXN0LCBjcmVhdGUgb25lLlxuICAgICAgICBpZiAoIXBsYWNlaG9sZGVyTGFiZWwpIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdQTEFDRUhPTERFUl9MQUJFTCcpO1xuICAgICAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IG5ldyBjYy5Ob2RlKCdQTEFDRUhPTERFUl9MQUJFTCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXJMYWJlbCA9IG5vZGUuZ2V0Q29tcG9uZW50KExhYmVsKTtcbiAgICAgICAgICAgIGlmICghcGxhY2Vob2xkZXJMYWJlbCkge1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyTGFiZWwgPSBub2RlLmFkZENvbXBvbmVudChMYWJlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXJMYWJlbCA9IHBsYWNlaG9sZGVyTGFiZWw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGVcbiAgICAgICAgcGxhY2Vob2xkZXJMYWJlbC5ub2RlLnNldEFuY2hvclBvaW50KDAsIDEpO1xuICAgICAgICBwbGFjZWhvbGRlckxhYmVsLm92ZXJmbG93ID0gTGFiZWwuT3ZlcmZsb3cuQ0xBTVA7XG4gICAgICAgIGlmICh0aGlzLmlucHV0TW9kZSA9PT0gSW5wdXRNb2RlLkFOWSkge1xuICAgICAgICAgICAgcGxhY2Vob2xkZXJMYWJlbC52ZXJ0aWNhbEFsaWduID0gbWFjcm8uVmVydGljYWxUZXh0QWxpZ25tZW50LlRPUDtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyTGFiZWwuZW5hYmxlV3JhcFRleHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGxhY2Vob2xkZXJMYWJlbC52ZXJ0aWNhbEFsaWduID0gbWFjcm8uVmVydGljYWxUZXh0QWxpZ25tZW50LkNFTlRFUjtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyTGFiZWwuZW5hYmxlV3JhcFRleHQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBwbGFjZWhvbGRlckxhYmVsLnN0cmluZyA9IHRoaXMucGxhY2Vob2xkZXI7XG5cbiAgICAgICAgLy8gaGFuZGxlIG9sZCBkYXRhXG4gICAgICAgIGlmICh0aGlzLl9OJHBsYWNlaG9sZGVyRm9udENvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyTGFiZWwubm9kZS5jb2xvciA9IHRoaXMuX04kcGxhY2Vob2xkZXJGb250Q29sb3I7XG4gICAgICAgICAgICBwbGFjZWhvbGRlckxhYmVsLm5vZGUub3BhY2l0eSA9IHRoaXMuX04kcGxhY2Vob2xkZXJGb250Q29sb3IuYTtcbiAgICAgICAgICAgIHRoaXMuX04kcGxhY2Vob2xkZXJGb250Q29sb3IgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX04kcGxhY2Vob2xkZXJGb250U2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlckxhYmVsLmZvbnRTaXplID0gdGhpcy5fTiRwbGFjZWhvbGRlckZvbnRTaXplO1xuICAgICAgICAgICAgdGhpcy5fTiRwbGFjZWhvbGRlckZvbnRTaXplID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF91cGdyYWRlQ29tcCAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9OJHJldHVyblR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5yZXR1cm5UeXBlID0gdGhpcy5fTiRyZXR1cm5UeXBlO1xuICAgICAgICAgICAgdGhpcy5fTiRyZXR1cm5UeXBlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9OJG1heExlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm1heExlbmd0aCA9IHRoaXMuX04kbWF4TGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5fTiRtYXhMZW5ndGggPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX04kYmFja2dyb3VuZEltYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUJhY2tncm91bmRTcHJpdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fTiRmb250Q29sb3IgIT09IHVuZGVmaW5lZCB8fCB0aGlzLl9OJGZvbnRTaXplICE9PSB1bmRlZmluZWQgfHwgdGhpcy5fTiRsaW5lSGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRleHRMYWJlbCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9OJHBsYWNlaG9sZGVyRm9udENvbG9yICE9PSB1bmRlZmluZWQgfHwgdGhpcy5fTiRwbGFjZWhvbGRlckZvbnRTaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVBsYWNlaG9sZGVyTGFiZWwoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fTiRwbGFjZWhvbGRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gdGhpcy5fTiRwbGFjZWhvbGRlcjtcbiAgICAgICAgICAgIHRoaXMuX04kcGxhY2Vob2xkZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3N5bmNTaXplICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcbiAgICAgICAgICAgIGxldCBzaXplID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgICAgICB0aGlzLl9pbXBsLnNldFNpemUoc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9zaG93TGFiZWxzICgpIHtcbiAgICAgICAgdGhpcy5faXNMYWJlbFZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLl91cGRhdGVMYWJlbHMoKTtcbiAgICB9LFxuXG4gICAgX2hpZGVMYWJlbHMgKCkge1xuICAgICAgICB0aGlzLl9pc0xhYmVsVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy50ZXh0TGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMudGV4dExhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGxhY2Vob2xkZXJMYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlckxhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3VwZGF0ZUxhYmVscyAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0xhYmVsVmlzaWJsZSkge1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLl9zdHJpbmc7XG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0TGFiZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRMYWJlbC5ub2RlLmFjdGl2ZSA9IChjb250ZW50ICE9PSAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wbGFjZWhvbGRlckxhYmVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlckxhYmVsLm5vZGUuYWN0aXZlID0gKGNvbnRlbnQgPT09ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdXBkYXRlU3RyaW5nICh0ZXh0KSB7XG4gICAgICAgIGxldCB0ZXh0TGFiZWwgPSB0aGlzLnRleHRMYWJlbDtcbiAgICAgICAgLy8gTm90IGluaXRlZCB5ZXRcbiAgICAgICAgaWYgKCF0ZXh0TGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkaXNwbGF5VGV4dCA9IHRleHQ7XG4gICAgICAgIGlmIChkaXNwbGF5VGV4dCkge1xuICAgICAgICAgICAgZGlzcGxheVRleHQgPSB0aGlzLl91cGRhdGVMYWJlbFN0cmluZ1N0eWxlKGRpc3BsYXlUZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRleHRMYWJlbC5zdHJpbmcgPSBkaXNwbGF5VGV4dDtcblxuICAgICAgICB0aGlzLl91cGRhdGVMYWJlbHMoKTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZUxhYmVsU3RyaW5nU3R5bGUgKHRleHQsIGlnbm9yZVBhc3N3b3JkKSB7XG4gICAgICAgIGxldCBpbnB1dEZsYWcgPSB0aGlzLmlucHV0RmxhZztcbiAgICAgICAgaWYgKCFpZ25vcmVQYXNzd29yZCAmJiBpbnB1dEZsYWcgPT09IElucHV0RmxhZy5QQVNTV09SRCkge1xuICAgICAgICAgICAgbGV0IHBhc3N3b3JkU3RyaW5nID0gJyc7XG4gICAgICAgICAgICBsZXQgbGVuID0gdGV4dC5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICAgICAgcGFzc3dvcmRTdHJpbmcgKz0gJ1xcdTI1Q0YnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGV4dCA9IHBhc3N3b3JkU3RyaW5nO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmIChpbnB1dEZsYWcgPT09IElucHV0RmxhZy5JTklUSUFMX0NBUFNfQUxMX0NIQVJBQ1RFUlMpIHtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5wdXRGbGFnID09PSBJbnB1dEZsYWcuSU5JVElBTF9DQVBTX1dPUkQpIHtcbiAgICAgICAgICAgIHRleHQgPSBjYXBpdGFsaXplKHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlucHV0RmxhZyA9PT0gSW5wdXRGbGFnLklOSVRJQUxfQ0FQU19TRU5URU5DRSkge1xuICAgICAgICAgICAgdGV4dCA9IGNhcGl0YWxpemVGaXJzdExldHRlcih0ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH0sXG5cbiAgICBlZGl0Qm94RWRpdGluZ0RpZEJlZ2FuICgpIHtcbiAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMuZWRpdGluZ0RpZEJlZ2FuLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoJ2VkaXRpbmctZGlkLWJlZ2FuJywgdGhpcyk7XG4gICAgfSxcblxuICAgIGVkaXRCb3hFZGl0aW5nRGlkRW5kZWQgKCkge1xuICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy5lZGl0aW5nRGlkRW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUuZW1pdCgnZWRpdGluZy1kaWQtZW5kZWQnLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgZWRpdEJveFRleHRDaGFuZ2VkICh0ZXh0KSB7XG4gICAgICAgIHRleHQgPSB0aGlzLl91cGRhdGVMYWJlbFN0cmluZ1N0eWxlKHRleHQsIHRydWUpO1xuICAgICAgICB0aGlzLnN0cmluZyA9IHRleHQ7XG4gICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyh0aGlzLnRleHRDaGFuZ2VkLCB0ZXh0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoJ3RleHQtY2hhbmdlZCcsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBlZGl0Qm94RWRpdGluZ1JldHVybigpIHtcbiAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMuZWRpdGluZ1JldHVybiwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5lbWl0KCdlZGl0aW5nLXJldHVybicsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBvbkVuYWJsZSAoKSB7XG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlckV2ZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2ltcGwuZW5hYmxlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25EaXNhYmxlICgpIHtcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRoaXMuX3VucmVnaXN0ZXJFdmVudCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pbXBsKSB7XG4gICAgICAgICAgICB0aGlzLl9pbXBsLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3kgKCkge1xuICAgICAgICBpZiAodGhpcy5faW1wbCkge1xuICAgICAgICAgICAgdGhpcy5faW1wbC5jbGVhcigpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9fcHJlbG9hZCAoKSB7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9LFxuXG4gICAgX3JlZ2lzdGVyRXZlbnQgKCkge1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuX29uVG91Y2hCZWdhbiwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uVG91Y2hFbmRlZCwgdGhpcyk7XG4gICAgfSxcblxuICAgIF91bnJlZ2lzdGVyRXZlbnQgKCkge1xuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLl9vblRvdWNoQmVnYW4sIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25Ub3VjaEVuZGVkLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgX29uVG91Y2hCZWdhbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSxcblxuICAgIF9vblRvdWNoQ2FuY2VsIChldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9LFxuXG4gICAgX29uVG91Y2hFbmRlZCAoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2ltcGwuYmVnaW5FZGl0aW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gTGV0IHRoZSBFZGl0Qm94IGdldCBmb2N1cywgdGhpcyBtZXRob2Qgd2lsbCBiZSByZW1vdmVkIG9uIHYyLjFcbiAgICAgKiAhI3poIOiuqeW9k+WJjSBFZGl0Qm94IOiOt+W+l+eEpueCuSwg6L+Z5Liq5pa55rOV5Lya5ZyoIHYyLjEg5Lit56e76ZmkXG4gICAgICogQG1ldGhvZCBzZXRGb2N1c1xuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIDIuMC44XG4gICAgICovXG4gICAgc2V0Rm9jdXMgKCkge1xuICAgICAgICBjYy5lcnJvcklEKDE0MDAsICdzZXRGb2N1cygpJywgJ2ZvY3VzKCknKTtcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2ltcGwuc2V0Rm9jdXModHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBMZXQgdGhlIEVkaXRCb3ggZ2V0IGZvY3VzXG4gICAgICogISN6aCDorqnlvZPliY0gRWRpdEJveCDojrflvpfnhKbngrlcbiAgICAgKiBAbWV0aG9kIGZvY3VzXG4gICAgICovXG4gICAgZm9jdXMgKCkge1xuICAgICAgICBpZiAodGhpcy5faW1wbCkge1xuICAgICAgICAgICAgdGhpcy5faW1wbC5zZXRGb2N1cyh0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIExldCB0aGUgRWRpdEJveCBsb3NlIGZvY3VzXG4gICAgICogISN6aCDorqnlvZPliY0gRWRpdEJveCDlpLHljrvnhKbngrlcbiAgICAgKiBAbWV0aG9kIGJsdXJcbiAgICAgKi9cbiAgICBibHVyICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2ltcGwuc2V0Rm9jdXMoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gRGV0ZXJtaW5lIHdoZXRoZXIgRWRpdEJveCBpcyBnZXR0aW5nIGZvY3VzIG9yIG5vdC5cbiAgICAgKiAhI3poIOWIpOaWrSBFZGl0Qm94IOaYr+WQpuiOt+W+l+S6hueEpueCuVxuICAgICAqIEBtZXRob2QgaXNGb2N1c2VkXG4gICAgICovXG4gICAgaXNGb2N1c2VkICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbXBsLmlzRm9jdXNlZCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbXBsKSB7XG4gICAgICAgICAgICB0aGlzLl9pbXBsLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG59KTtcblxuY2MuRWRpdEJveCA9IG1vZHVsZS5leHBvcnRzID0gRWRpdEJveDtcblxuaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHtcbiAgICByZXF1aXJlKCcuL1dlYkVkaXRCb3hJbXBsJyk7XG59XG5cbi8qKlxuICogISNlblxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxuICogISN6aFxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXG4gKiBAZXZlbnQgZWRpdGluZy1kaWQtYmVnYW5cbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XG4gKiBAcGFyYW0ge0VkaXRCb3h9IGVkaXRib3ggLSBUaGUgRWRpdEJveCBjb21wb25lbnQuXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXG4gKiAhI3poXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcbiAqIEBldmVudCBlZGl0aW5nLWRpZC1lbmRlZFxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcbiAqIEBwYXJhbSB7RWRpdEJveH0gZWRpdGJveCAtIFRoZSBFZGl0Qm94IGNvbXBvbmVudC5cbiAqL1xuXG4vKipcbiAqICEjZW5cbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cbiAqICEjemhcbiAqIOazqOaEj++8muatpOS6i+S7tuaYr+S7juivpee7hOS7tuaJgOWxnueahCBOb2RlIOS4iumdoua0vuWPkeWHuuadpeeahO+8jOmcgOimgeeUqCBub2RlLm9uIOadpeebkeWQrOOAglxuICogQGV2ZW50IHRleHQtY2hhbmdlZFxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcbiAqIEBwYXJhbSB7RWRpdEJveH0gZWRpdGJveCAtIFRoZSBFZGl0Qm94IGNvbXBvbmVudC5cbiAqL1xuXG4vKipcbiAqICEjZW5cbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cbiAqICEjemhcbiAqIOazqOaEj++8muatpOS6i+S7tuaYr+S7juivpee7hOS7tuaJgOWxnueahCBOb2RlIOS4iumdoua0vuWPkeWHuuadpeeahO+8jOmcgOimgeeUqCBub2RlLm9uIOadpeebkeWQrOOAglxuICogQGV2ZW50IGVkaXRpbmctcmV0dXJuXG4gKiBAcGFyYW0ge0V2ZW50LkV2ZW50Q3VzdG9tfSBldmVudFxuICogQHBhcmFtIHtFZGl0Qm94fSBlZGl0Ym94IC0gVGhlIEVkaXRCb3ggY29tcG9uZW50LlxuICovXG5cbi8qKlxuICogISNlbiBpZiB5b3UgZG9uJ3QgbmVlZCB0aGUgRWRpdEJveCBhbmQgaXQgaXNuJ3QgaW4gYW55IHJ1bm5pbmcgU2NlbmUsIHlvdSBzaG91bGRcbiAqIGNhbGwgdGhlIGRlc3Ryb3kgbWV0aG9kIG9uIHRoaXMgY29tcG9uZW50IG9yIHRoZSBhc3NvY2lhdGVkIG5vZGUgZXhwbGljaXRseS5cbiAqIE90aGVyd2lzZSwgdGhlIGNyZWF0ZWQgRE9NIGVsZW1lbnQgd29uJ3QgYmUgcmVtb3ZlZCBmcm9tIHdlYiBwYWdlLlxuICogISN6aFxuICog5aaC5p6c5L2g5LiN5YaN5L2/55SoIEVkaXRCb3jvvIzlubbkuJTnu4Tku7bmnKrmt7vliqDliLDlnLrmma/kuK3vvIzpgqPkuYjkvaDlv4XpobvmiYvliqjlr7nnu4Tku7bmiJbmiYDlnKjoioLngrnosIPnlKggZGVzdHJveeOAglxuICog6L+Z5qC35omN6IO956e76Zmk572R6aG15LiK55qEIERPTSDoioLngrnvvIzpgb/lhY0gV2ViIOW5s+WPsOWGheWtmOazhOmcsuOAglxuICogQGV4YW1wbGVcbiAqIGVkaXRib3gubm9kZS5wYXJlbnQgPSBudWxsOyAgLy8gb3IgIGVkaXRib3gubm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcbiAqIC8vIHdoZW4geW91IGRvbid0IG5lZWQgZWRpdGJveCBhbnltb3JlXG4gKiBlZGl0Ym94Lm5vZGUuZGVzdHJveSgpO1xuICogQG1ldGhvZCBkZXN0cm95XG4gKiBAcmV0dXJuIHtCb29sZWFufSB3aGV0aGVyIGl0IGlzIHRoZSBmaXJzdCB0aW1lIHRoZSBkZXN0cm95IGJlaW5nIGNhbGxlZFxuICovIl0sInNvdXJjZVJvb3QiOiIvIn0=