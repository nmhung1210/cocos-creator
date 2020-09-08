
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCRichText.js';
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
var js = require('../platform/js');

var macro = require('../platform/CCMacro');

var textUtils = require('../utils/text-utils');

var HtmlTextParser = require('../utils/html-text-parser');

var _htmlTextParser = new HtmlTextParser();

var HorizontalAlign = macro.TextAlignment;
var VerticalAlign = macro.VerticalTextAlignment;
var RichTextChildName = "RICHTEXT_CHILD";
var RichTextChildImageName = "RICHTEXT_Image_CHILD";
var CacheMode = cc.Label.CacheMode; // Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, arguments);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, arguments);
  };
}
/**
 * RichText pool
 */


var pool = new js.Pool(function (node) {
  if (CC_EDITOR) {
    cc.isValid(node) && node.destroy();
    return false;
  }

  if (CC_DEV) {
    cc.assert(!node._parent, 'Recycling node\'s parent should be null!');
  }

  if (!cc.isValid(node)) {
    return false;
  } else {
    var outline = node.getComponent(cc.LabelOutline);

    if (outline) {
      outline.width = 0;
    }
  }

  return true;
}, 20);

pool.get = function (string, richtext) {
  var labelNode = this._get();

  if (!labelNode) {
    labelNode = new cc.PrivateNode(RichTextChildName);
  }

  labelNode.setPosition(0, 0);
  labelNode.setAnchorPoint(0.5, 0.5);
  labelNode.skewX = 0;
  var labelComponent = labelNode.getComponent(cc.Label);

  if (!labelComponent) {
    labelComponent = labelNode.addComponent(cc.Label);
  }

  labelComponent.string = "";
  labelComponent.horizontalAlign = HorizontalAlign.LEFT;
  labelComponent.verticalAlign = VerticalAlign.CENTER;
  labelComponent._forceUseCanvas = true;
  return labelNode;
};
/**
 * !#en The RichText Component.
 * !#zh 富文本组件
 * @class RichText
 * @extends Component
 */


var RichText = cc.Class({
  name: 'cc.RichText',
  "extends": cc.Component,
  ctor: function ctor() {
    this._textArray = null;
    this._labelSegments = [];
    this._labelSegmentsCache = [];
    this._linesWidth = [];

    if (CC_EDITOR) {
      this._userDefinedFont = null;
      this._updateRichTextStatus = debounce(this._updateRichText, 200);
    } else {
      this._updateRichTextStatus = this._updateRichText;
    }
  },
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/RichText',
    help: 'i18n:COMPONENT.help_url.richtext',
    inspector: 'packages://inspector/inspectors/comps/richtext.js',
    executeInEditMode: true
  },
  properties: {
    /**
     * !#en Content string of RichText.
     * !#zh 富文本显示的文本内容。
     * @property {String} string
     */
    string: {
      "default": '<color=#00ff00>Rich</c><color=#0fffff>Text</color>',
      multiline: true,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.string',
      notify: function notify() {
        this._updateRichTextStatus();
      }
    },

    /**
     * !#en Horizontal Alignment of each line in RichText.
     * !#zh 文本内容的水平对齐方式。
     * @property {macro.TextAlignment} horizontalAlign
     */
    horizontalAlign: {
      "default": HorizontalAlign.LEFT,
      type: HorizontalAlign,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.horizontal_align',
      animatable: false,
      notify: function notify(oldValue) {
        if (this.horizontalAlign === oldValue) return;
        this._layoutDirty = true;

        this._updateRichTextStatus();
      }
    },

    /**
     * !#en Font size of RichText.
     * !#zh 富文本字体大小。
     * @property {Number} fontSize
     */
    fontSize: {
      "default": 40,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.font_size',
      notify: function notify(oldValue) {
        if (this.fontSize === oldValue) return;
        this._layoutDirty = true;

        this._updateRichTextStatus();
      }
    },

    /**
     * !#en Custom System font of RichText
     * !#zh 富文本定制系统字体
     * @property {String} fontFamily
     */
    _fontFamily: "Arial",
    fontFamily: {
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.font_family',
      get: function get() {
        return this._fontFamily;
      },
      set: function set(value) {
        if (this._fontFamily === value) return;
        this._fontFamily = value;
        this._layoutDirty = true;

        this._updateRichTextStatus();
      },
      animatable: false
    },

    /**
     * !#en Custom TTF font of RichText
     * !#zh  富文本定制字体
     * @property {cc.TTFFont} font
     */
    font: {
      "default": null,
      type: cc.TTFFont,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.font',
      notify: function notify(oldValue) {
        if (this.font === oldValue) return;
        this._layoutDirty = true;

        if (this.font) {
          if (CC_EDITOR) {
            this._userDefinedFont = this.font;
          }

          this.useSystemFont = false;

          this._onTTFLoaded();
        } else {
          this.useSystemFont = true;
        }

        this._updateRichTextStatus();
      }
    },

    /**
     * !#en Whether use system font name or not.
     * !#zh 是否使用系统字体。
     * @property {Boolean} useSystemFont
     */
    _isSystemFontUsed: true,
    useSystemFont: {
      get: function get() {
        return this._isSystemFontUsed;
      },
      set: function set(value) {
        if (this._isSystemFontUsed === value) {
          return;
        }

        this._isSystemFontUsed = value;

        if (CC_EDITOR) {
          if (value) {
            this.font = null;
          } else if (this._userDefinedFont) {
            this.font = this._userDefinedFont;
            return;
          }
        }

        this._layoutDirty = true;

        this._updateRichTextStatus();
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.system_font'
    },

    /**
     * !#en The cache mode of label. This mode only supports system fonts.
     * !#zh 文本缓存模式, 该模式只支持系统字体。
     * @property {Label.CacheMode} cacheMode
     */
    cacheMode: {
      "default": CacheMode.NONE,
      type: CacheMode,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.cacheMode',
      notify: function notify(oldValue) {
        if (this.cacheMode === oldValue) return;

        this._updateRichTextStatus();
      },
      animatable: false
    },

    /**
     * !#en The maximize width of the RichText
     * !#zh 富文本的最大宽度
     * @property {Number} maxWidth
     */
    maxWidth: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.max_width',
      notify: function notify(oldValue) {
        if (this.maxWidth === oldValue) return;
        this._layoutDirty = true;

        this._updateRichTextStatus();
      }
    },

    /**
     * !#en Line Height of RichText.
     * !#zh 富文本行高。
     * @property {Number} lineHeight
     */
    lineHeight: {
      "default": 40,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.line_height',
      notify: function notify(oldValue) {
        if (this.lineHeight === oldValue) return;
        this._layoutDirty = true;

        this._updateRichTextStatus();
      }
    },

    /**
     * !#en The image atlas for the img tag. For each src value in the img tag, there should be a valid spriteFrame in the image atlas.
     * !#zh 对于 img 标签里面的 src 属性名称，都需要在 imageAtlas 里面找到一个有效的 spriteFrame，否则 img tag 会判定为无效。
     * @property {SpriteAtlas} imageAtlas
     */
    imageAtlas: {
      "default": null,
      type: cc.SpriteAtlas,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.image_atlas',
      notify: function notify(oldValue) {
        if (this.imageAtlas === oldValue) return;
        this._layoutDirty = true;

        this._updateRichTextStatus();
      }
    },

    /**
     * !#en
     * Once checked, the RichText will block all input events (mouse and touch) within
     * the bounding box of the node, preventing the input from penetrating into the underlying node.
     * !#zh
     * 选中此选项后，RichText 将阻止节点边界框中的所有输入事件（鼠标和触摸），从而防止输入事件穿透到底层节点。
     * @property {Boolean} handleTouchEvent
     * @default true
     */
    handleTouchEvent: {
      "default": true,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.handleTouchEvent',
      notify: function notify(oldValue) {
        if (this.handleTouchEvent === oldValue) return;

        if (this.enabledInHierarchy) {
          this.handleTouchEvent ? this._addEventListeners() : this._removeEventListeners();
        }
      }
    }
  },
  statics: {
    HorizontalAlign: HorizontalAlign,
    VerticalAlign: VerticalAlign
  },
  onEnable: function onEnable() {
    if (this.handleTouchEvent) {
      this._addEventListeners();
    }

    this._updateRichText();

    this._activateChildren(true);
  },
  onDisable: function onDisable() {
    if (this.handleTouchEvent) {
      this._removeEventListeners();
    }

    this._activateChildren(false);
  },
  start: function start() {
    this._onTTFLoaded();
  },
  _onColorChanged: function _onColorChanged(parentColor) {
    var children = this.node.children;
    children.forEach(function (childNode) {
      childNode.color = parentColor;
    });
  },
  _addEventListeners: function _addEventListeners() {
    this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
    this.node.on(cc.Node.EventType.COLOR_CHANGED, this._onColorChanged, this);
  },
  _removeEventListeners: function _removeEventListeners() {
    this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
    this.node.off(cc.Node.EventType.COLOR_CHANGED, this._onColorChanged, this);
  },
  _updateLabelSegmentTextAttributes: function _updateLabelSegmentTextAttributes() {
    this._labelSegments.forEach(function (item) {
      this._applyTextAttribute(item, null, true);
    }.bind(this));
  },
  _createFontLabel: function _createFontLabel(string) {
    return pool.get(string, this);
  },
  _onTTFLoaded: function _onTTFLoaded() {
    if (this.font instanceof cc.TTFFont) {
      if (this.font._nativeAsset) {
        this._layoutDirty = true;

        this._updateRichText();
      } else {
        var self = this;
        cc.assetManager.postLoadNative(this.font, function (err) {
          self._layoutDirty = true;

          self._updateRichText();
        });
      }
    } else {
      this._layoutDirty = true;

      this._updateRichText();
    }
  },
  _measureText: function _measureText(styleIndex, string) {
    var self = this;

    var func = function func(string) {
      var label;

      if (self._labelSegmentsCache.length === 0) {
        label = self._createFontLabel(string);

        self._labelSegmentsCache.push(label);
      } else {
        label = self._labelSegmentsCache[0];
      }

      label._styleIndex = styleIndex;

      self._applyTextAttribute(label, string, true);

      var labelSize = label.getContentSize();
      return labelSize.width;
    };

    if (string) {
      return func(string);
    } else {
      return func;
    }
  },
  _onTouchEnded: function _onTouchEnded(event) {
    var _this = this;

    var components = this.node.getComponents(cc.Component);

    var _loop = function _loop(i) {
      var labelSegment = _this._labelSegments[i];
      var clickHandler = labelSegment._clickHandler;
      var clickParam = labelSegment._clickParam;

      if (clickHandler && _this._containsTouchLocation(labelSegment, event.touch.getLocation())) {
        components.forEach(function (component) {
          if (component.enabledInHierarchy && component[clickHandler]) {
            component[clickHandler](event, clickParam);
          }
        });
        event.stopPropagation();
      }
    };

    for (var i = 0; i < this._labelSegments.length; ++i) {
      _loop(i);
    }
  },
  _containsTouchLocation: function _containsTouchLocation(label, point) {
    var myRect = label.getBoundingBoxToWorld();
    return myRect.contains(point);
  },
  _resetState: function _resetState() {
    var children = this.node.children;

    for (var i = children.length - 1; i >= 0; i--) {
      var child = children[i];

      if (child.name === RichTextChildName || child.name === RichTextChildImageName) {
        if (child.parent === this.node) {
          child.parent = null;
        } else {
          // In case child.parent !== this.node, child cannot be removed from children
          children.splice(i, 1);
        }

        if (child.name === RichTextChildName) {
          pool.put(child);
        }
      }
    }

    this._labelSegments.length = 0;
    this._labelSegmentsCache.length = 0;
    this._linesWidth.length = 0;
    this._lineOffsetX = 0;
    this._lineCount = 1;
    this._labelWidth = 0;
    this._labelHeight = 0;
    this._layoutDirty = true;
  },
  onRestore: CC_EDITOR && function () {
    // TODO: refine undo/redo system
    // Because undo/redo will not call onEnable/onDisable,
    // we need call onEnable/onDisable manually to active/disactive children nodes.
    if (this.enabledInHierarchy) {
      this.onEnable();
    } else {
      this.onDisable();
    }
  },
  _activateChildren: function _activateChildren(active) {
    for (var i = this.node.children.length - 1; i >= 0; i--) {
      var child = this.node.children[i];

      if (child.name === RichTextChildName || child.name === RichTextChildImageName) {
        child.active = active;
      }
    }
  },
  _addLabelSegment: function _addLabelSegment(stringToken, styleIndex) {
    var labelSegment;

    if (this._labelSegmentsCache.length === 0) {
      labelSegment = this._createFontLabel(stringToken);
    } else {
      labelSegment = this._labelSegmentsCache.pop();
    }

    labelSegment._styleIndex = styleIndex;
    labelSegment._lineCount = this._lineCount;
    labelSegment.active = this.node.active;
    labelSegment.setAnchorPoint(0, 0);

    this._applyTextAttribute(labelSegment, stringToken);

    this.node.addChild(labelSegment);

    this._labelSegments.push(labelSegment);

    return labelSegment;
  },
  _updateRichTextWithMaxWidth: function _updateRichTextWithMaxWidth(labelString, labelWidth, styleIndex) {
    var fragmentWidth = labelWidth;
    var labelSegment;

    if (this._lineOffsetX > 0 && fragmentWidth + this._lineOffsetX > this.maxWidth) {
      //concat previous line
      var checkStartIndex = 0;

      while (this._lineOffsetX <= this.maxWidth) {
        var checkEndIndex = this._getFirstWordLen(labelString, checkStartIndex, labelString.length);

        var checkString = labelString.substr(checkStartIndex, checkEndIndex);

        var checkStringWidth = this._measureText(styleIndex, checkString);

        if (this._lineOffsetX + checkStringWidth <= this.maxWidth) {
          this._lineOffsetX += checkStringWidth;
          checkStartIndex += checkEndIndex;
        } else {
          if (checkStartIndex > 0) {
            var remainingString = labelString.substr(0, checkStartIndex);

            this._addLabelSegment(remainingString, styleIndex);

            labelString = labelString.substr(checkStartIndex, labelString.length);
            fragmentWidth = this._measureText(styleIndex, labelString);
          }

          this._updateLineInfo();

          break;
        }
      }
    }

    if (fragmentWidth > this.maxWidth) {
      var fragments = textUtils.fragmentText(labelString, fragmentWidth, this.maxWidth, this._measureText(styleIndex));

      for (var k = 0; k < fragments.length; ++k) {
        var splitString = fragments[k];
        labelSegment = this._addLabelSegment(splitString, styleIndex);
        var labelSize = labelSegment.getContentSize();
        this._lineOffsetX += labelSize.width;

        if (fragments.length > 1 && k < fragments.length - 1) {
          this._updateLineInfo();
        }
      }
    } else {
      this._lineOffsetX += fragmentWidth;

      this._addLabelSegment(labelString, styleIndex);
    }
  },
  _isLastComponentCR: function _isLastComponentCR(stringToken) {
    return stringToken.length - 1 === stringToken.lastIndexOf("\n");
  },
  _updateLineInfo: function _updateLineInfo() {
    this._linesWidth.push(this._lineOffsetX);

    this._lineOffsetX = 0;
    this._lineCount++;
  },
  _needsUpdateTextLayout: function _needsUpdateTextLayout(newTextArray) {
    if (this._layoutDirty || !this._textArray || !newTextArray) {
      return true;
    }

    if (this._textArray.length !== newTextArray.length) {
      return true;
    }

    for (var i = 0; i < this._textArray.length; ++i) {
      var oldItem = this._textArray[i];
      var newItem = newTextArray[i];

      if (oldItem.text !== newItem.text) {
        return true;
      } else {
        var oldStyle = oldItem.style,
            newStyle = newItem.style;

        if (oldStyle) {
          if (newStyle) {
            if (!oldStyle.outline !== !newStyle.outline) {
              return true;
            }

            if (oldStyle.size !== newStyle.size || !oldStyle.italic !== !newStyle.italic || oldStyle.isImage !== newStyle.isImage) {
              return true;
            }

            if (oldStyle.src !== newStyle.src || oldStyle.imageAlign !== newStyle.imageAlign || oldStyle.imageHeight !== newStyle.imageHeight || oldStyle.imageWidth !== newStyle.imageWidth || oldStyle.imageOffset !== newStyle.imageOffset) {
              return true;
            }
          } else {
            if (oldStyle.size || oldStyle.italic || oldStyle.isImage || oldStyle.outline) {
              return true;
            }
          }
        } else {
          if (newStyle) {
            if (newStyle.size || newStyle.italic || newStyle.isImage || newStyle.outline) {
              return true;
            }
          }
        }
      }
    }

    return false;
  },
  _addRichTextImageElement: function _addRichTextImageElement(richTextElement) {
    var spriteFrameName = richTextElement.style.src;
    var spriteFrame = this.imageAtlas.getSpriteFrame(spriteFrameName);

    if (spriteFrame) {
      var spriteNode = new cc.PrivateNode(RichTextChildImageName);
      var spriteComponent = spriteNode.addComponent(cc.Sprite);

      switch (richTextElement.style.imageAlign) {
        case 'top':
          spriteNode.setAnchorPoint(0, 1);
          break;

        case 'center':
          spriteNode.setAnchorPoint(0, 0.5);
          break;

        default:
          spriteNode.setAnchorPoint(0, 0);
          break;
      }

      if (richTextElement.style.imageOffset) spriteNode._imageOffset = richTextElement.style.imageOffset;
      spriteComponent.type = cc.Sprite.Type.SLICED;
      spriteComponent.sizeMode = cc.Sprite.SizeMode.CUSTOM;
      this.node.addChild(spriteNode);

      this._labelSegments.push(spriteNode);

      var spriteRect = spriteFrame.getRect();
      var scaleFactor = 1;
      var spriteWidth = spriteRect.width;
      var spriteHeight = spriteRect.height;
      var expectWidth = richTextElement.style.imageWidth;
      var expectHeight = richTextElement.style.imageHeight;

      if (expectHeight > 0) {
        scaleFactor = expectHeight / spriteHeight;
        spriteWidth = spriteWidth * scaleFactor;
        spriteHeight = spriteHeight * scaleFactor;
      } else {
        scaleFactor = this.lineHeight / spriteHeight;
        spriteWidth = spriteWidth * scaleFactor;
        spriteHeight = spriteHeight * scaleFactor;
      }

      if (expectWidth > 0) spriteWidth = expectWidth;

      if (this.maxWidth > 0) {
        if (this._lineOffsetX + spriteWidth > this.maxWidth) {
          this._updateLineInfo();
        }

        this._lineOffsetX += spriteWidth;
      } else {
        this._lineOffsetX += spriteWidth;

        if (this._lineOffsetX > this._labelWidth) {
          this._labelWidth = this._lineOffsetX;
        }
      }

      spriteComponent.spriteFrame = spriteFrame;
      spriteNode.setContentSize(spriteWidth, spriteHeight);
      spriteNode._lineCount = this._lineCount;

      if (richTextElement.style.event) {
        if (richTextElement.style.event.click) {
          spriteNode._clickHandler = richTextElement.style.event.click;
        }

        if (richTextElement.style.event.param) {
          spriteNode._clickParam = richTextElement.style.event.param;
        } else {
          spriteNode._clickParam = '';
        }
      } else {
        spriteNode._clickHandler = null;
      }
    } else {
      cc.warnID(4400);
    }
  },
  _updateRichText: function _updateRichText() {
    if (!this.enabledInHierarchy) return;

    var newTextArray = _htmlTextParser.parse(this.string);

    if (!this._needsUpdateTextLayout(newTextArray)) {
      this._textArray = newTextArray;

      this._updateLabelSegmentTextAttributes();

      return;
    }

    this._textArray = newTextArray;

    this._resetState();

    var lastEmptyLine = false;
    var label;
    var labelSize;

    for (var i = 0; i < this._textArray.length; ++i) {
      var richTextElement = this._textArray[i];
      var text = richTextElement.text; //handle <br/> <img /> tag

      if (text === "") {
        if (richTextElement.style && richTextElement.style.newline) {
          this._updateLineInfo();

          continue;
        }

        if (richTextElement.style && richTextElement.style.isImage && this.imageAtlas) {
          this._addRichTextImageElement(richTextElement);

          continue;
        }
      }

      var multilineTexts = text.split("\n");

      for (var j = 0; j < multilineTexts.length; ++j) {
        var labelString = multilineTexts[j];

        if (labelString === "") {
          //for continues \n
          if (this._isLastComponentCR(text) && j === multilineTexts.length - 1) {
            continue;
          }

          this._updateLineInfo();

          lastEmptyLine = true;
          continue;
        }

        lastEmptyLine = false;

        if (this.maxWidth > 0) {
          var labelWidth = this._measureText(i, labelString);

          this._updateRichTextWithMaxWidth(labelString, labelWidth, i);

          if (multilineTexts.length > 1 && j < multilineTexts.length - 1) {
            this._updateLineInfo();
          }
        } else {
          label = this._addLabelSegment(labelString, i);
          labelSize = label.getContentSize();
          this._lineOffsetX += labelSize.width;

          if (this._lineOffsetX > this._labelWidth) {
            this._labelWidth = this._lineOffsetX;
          }

          if (multilineTexts.length > 1 && j < multilineTexts.length - 1) {
            this._updateLineInfo();
          }
        }
      }
    }

    if (!lastEmptyLine) {
      this._linesWidth.push(this._lineOffsetX);
    }

    if (this.maxWidth > 0) {
      this._labelWidth = this.maxWidth;
    }

    this._labelHeight = (this._lineCount + textUtils.BASELINE_RATIO) * this.lineHeight; // trigger "size-changed" event

    this.node.setContentSize(this._labelWidth, this._labelHeight);

    this._updateRichTextPosition();

    this._layoutDirty = false;
  },
  _getFirstWordLen: function _getFirstWordLen(text, startIndex, textLen) {
    var character = text.charAt(startIndex);

    if (textUtils.isUnicodeCJK(character) || textUtils.isUnicodeSpace(character)) {
      return 1;
    }

    var len = 1;

    for (var index = startIndex + 1; index < textLen; ++index) {
      character = text.charAt(index);

      if (textUtils.isUnicodeSpace(character) || textUtils.isUnicodeCJK(character)) {
        break;
      }

      len++;
    }

    return len;
  },
  _updateRichTextPosition: function _updateRichTextPosition() {
    var nextTokenX = 0;
    var nextLineIndex = 1;
    var totalLineCount = this._lineCount;

    for (var i = 0; i < this._labelSegments.length; ++i) {
      var label = this._labelSegments[i];
      var lineCount = label._lineCount;

      if (lineCount > nextLineIndex) {
        nextTokenX = 0;
        nextLineIndex = lineCount;
      }

      var lineOffsetX = 0; // let nodeAnchorXOffset = (0.5 - this.node.anchorX) * this._labelWidth;

      switch (this.horizontalAlign) {
        case HorizontalAlign.LEFT:
          lineOffsetX = -this._labelWidth / 2;
          break;

        case HorizontalAlign.CENTER:
          lineOffsetX = -this._linesWidth[lineCount - 1] / 2;
          break;

        case HorizontalAlign.RIGHT:
          lineOffsetX = this._labelWidth / 2 - this._linesWidth[lineCount - 1];
          break;

        default:
          break;
      }

      label.x = nextTokenX + lineOffsetX;
      var labelSize = label.getContentSize();
      label.y = this.lineHeight * (totalLineCount - lineCount) - this._labelHeight / 2;

      if (lineCount === nextLineIndex) {
        nextTokenX += labelSize.width;
      }

      var sprite = label.getComponent(cc.Sprite);

      if (sprite) {
        // adjust img align (from <img align=top|center|bottom>)
        var lineHeightSet = this.lineHeight;
        var lineHeightReal = this.lineHeight * (1 + textUtils.BASELINE_RATIO); //single line node height

        switch (label.anchorY) {
          case 1:
            label.y += lineHeightSet + (lineHeightReal - lineHeightSet) / 2;
            break;

          case 0.5:
            label.y += lineHeightReal / 2;
            break;

          default:
            label.y += (lineHeightReal - lineHeightSet) / 2;
            break;
        } // adjust img offset (from <img offset=12|12,34>)


        if (label._imageOffset) {
          var offsets = label._imageOffset.split(',');

          if (offsets.length === 1 && offsets[0]) {
            var offsetY = parseFloat(offsets[0]);
            if (Number.isInteger(offsetY)) label.y += offsetY;
          } else if (offsets.length === 2) {
            var offsetX = parseFloat(offsets[0]);

            var _offsetY = parseFloat(offsets[1]);

            if (Number.isInteger(offsetX)) label.x += offsetX;
            if (Number.isInteger(_offsetY)) label.y += _offsetY;
          }
        }
      } //adjust y for label with outline


      var outline = label.getComponent(cc.LabelOutline);
      if (outline && outline.width) label.y = label.y - outline.width;
    }
  },
  _convertLiteralColorValue: function _convertLiteralColorValue(color) {
    var colorValue = color.toUpperCase();

    if (cc.Color[colorValue]) {
      return cc.Color[colorValue];
    } else {
      var out = cc.color();
      return out.fromHEX(color);
    }
  },
  // When string is null, it means that the text does not need to be updated.
  _applyTextAttribute: function _applyTextAttribute(labelNode, string, force) {
    var labelComponent = labelNode.getComponent(cc.Label);

    if (!labelComponent) {
      return;
    }

    var index = labelNode._styleIndex;
    var textStyle = null;

    if (this._textArray[index]) {
      textStyle = this._textArray[index].style;
    }

    if (textStyle && textStyle.color) {
      labelNode.color = this._convertLiteralColorValue(textStyle.color);
    } else {
      labelNode.color = this.node.color;
    }

    labelComponent.cacheMode = this.cacheMode;
    var isAsset = this.font instanceof cc.Font;

    if (isAsset && !this._isSystemFontUsed) {
      labelComponent.font = this.font;
    } else {
      labelComponent.fontFamily = this.fontFamily;
    }

    labelComponent.useSystemFont = this._isSystemFontUsed;
    labelComponent.lineHeight = this.lineHeight;
    labelComponent.enableBold = textStyle && textStyle.bold;
    labelComponent.enableItalics = textStyle && textStyle.italic; //TODO: temporary implementation, the italic effect should be implemented in the internal of label-assembler.

    if (textStyle && textStyle.italic) {
      labelNode.skewX = 12;
    }

    labelComponent.enableUnderline = textStyle && textStyle.underline;

    if (textStyle && textStyle.outline) {
      var labelOutlineComponent = labelNode.getComponent(cc.LabelOutline);

      if (!labelOutlineComponent) {
        labelOutlineComponent = labelNode.addComponent(cc.LabelOutline);
      }

      labelOutlineComponent.color = this._convertLiteralColorValue(textStyle.outline.color);
      labelOutlineComponent.width = textStyle.outline.width;
    }

    if (textStyle && textStyle.size) {
      labelComponent.fontSize = textStyle.size;
    } else {
      labelComponent.fontSize = this.fontSize;
    }

    if (string !== null) {
      if (typeof string !== 'string') {
        string = '' + string;
      }

      labelComponent.string = string;
    }

    force && labelComponent._forceUpdateRenderData();

    if (textStyle && textStyle.event) {
      if (textStyle.event.click) {
        labelNode._clickHandler = textStyle.event.click;
      }

      if (textStyle.event.param) {
        labelNode._clickParam = textStyle.event.param;
      } else {
        labelNode._clickParam = '';
      }
    } else {
      labelNode._clickHandler = null;
    }
  },
  onDestroy: function onDestroy() {
    for (var i = 0; i < this._labelSegments.length; ++i) {
      this._labelSegments[i].removeFromParent();

      pool.put(this._labelSegments[i]);
    }
  }
});
cc.RichText = module.exports = RichText;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NSaWNoVGV4dC5qcyJdLCJuYW1lcyI6WyJqcyIsInJlcXVpcmUiLCJtYWNybyIsInRleHRVdGlscyIsIkh0bWxUZXh0UGFyc2VyIiwiX2h0bWxUZXh0UGFyc2VyIiwiSG9yaXpvbnRhbEFsaWduIiwiVGV4dEFsaWdubWVudCIsIlZlcnRpY2FsQWxpZ24iLCJWZXJ0aWNhbFRleHRBbGlnbm1lbnQiLCJSaWNoVGV4dENoaWxkTmFtZSIsIlJpY2hUZXh0Q2hpbGRJbWFnZU5hbWUiLCJDYWNoZU1vZGUiLCJjYyIsIkxhYmVsIiwiZGVib3VuY2UiLCJmdW5jIiwid2FpdCIsImltbWVkaWF0ZSIsInRpbWVvdXQiLCJjb250ZXh0IiwibGF0ZXIiLCJhcHBseSIsImFyZ3VtZW50cyIsImNhbGxOb3ciLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwicG9vbCIsIlBvb2wiLCJub2RlIiwiQ0NfRURJVE9SIiwiaXNWYWxpZCIsImRlc3Ryb3kiLCJDQ19ERVYiLCJhc3NlcnQiLCJfcGFyZW50Iiwib3V0bGluZSIsImdldENvbXBvbmVudCIsIkxhYmVsT3V0bGluZSIsIndpZHRoIiwiZ2V0Iiwic3RyaW5nIiwicmljaHRleHQiLCJsYWJlbE5vZGUiLCJfZ2V0IiwiUHJpdmF0ZU5vZGUiLCJzZXRQb3NpdGlvbiIsInNldEFuY2hvclBvaW50Iiwic2tld1giLCJsYWJlbENvbXBvbmVudCIsImFkZENvbXBvbmVudCIsImhvcml6b250YWxBbGlnbiIsIkxFRlQiLCJ2ZXJ0aWNhbEFsaWduIiwiQ0VOVEVSIiwiX2ZvcmNlVXNlQ2FudmFzIiwiUmljaFRleHQiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJjdG9yIiwiX3RleHRBcnJheSIsIl9sYWJlbFNlZ21lbnRzIiwiX2xhYmVsU2VnbWVudHNDYWNoZSIsIl9saW5lc1dpZHRoIiwiX3VzZXJEZWZpbmVkRm9udCIsIl91cGRhdGVSaWNoVGV4dFN0YXR1cyIsIl91cGRhdGVSaWNoVGV4dCIsImVkaXRvciIsIm1lbnUiLCJoZWxwIiwiaW5zcGVjdG9yIiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJwcm9wZXJ0aWVzIiwibXVsdGlsaW5lIiwidG9vbHRpcCIsIm5vdGlmeSIsInR5cGUiLCJhbmltYXRhYmxlIiwib2xkVmFsdWUiLCJfbGF5b3V0RGlydHkiLCJmb250U2l6ZSIsIl9mb250RmFtaWx5IiwiZm9udEZhbWlseSIsInNldCIsInZhbHVlIiwiZm9udCIsIlRURkZvbnQiLCJ1c2VTeXN0ZW1Gb250IiwiX29uVFRGTG9hZGVkIiwiX2lzU3lzdGVtRm9udFVzZWQiLCJjYWNoZU1vZGUiLCJOT05FIiwibWF4V2lkdGgiLCJsaW5lSGVpZ2h0IiwiaW1hZ2VBdGxhcyIsIlNwcml0ZUF0bGFzIiwiaGFuZGxlVG91Y2hFdmVudCIsImVuYWJsZWRJbkhpZXJhcmNoeSIsIl9hZGRFdmVudExpc3RlbmVycyIsIl9yZW1vdmVFdmVudExpc3RlbmVycyIsInN0YXRpY3MiLCJvbkVuYWJsZSIsIl9hY3RpdmF0ZUNoaWxkcmVuIiwib25EaXNhYmxlIiwic3RhcnQiLCJfb25Db2xvckNoYW5nZWQiLCJwYXJlbnRDb2xvciIsImNoaWxkcmVuIiwiZm9yRWFjaCIsImNoaWxkTm9kZSIsImNvbG9yIiwib24iLCJOb2RlIiwiRXZlbnRUeXBlIiwiVE9VQ0hfRU5EIiwiX29uVG91Y2hFbmRlZCIsIkNPTE9SX0NIQU5HRUQiLCJvZmYiLCJfdXBkYXRlTGFiZWxTZWdtZW50VGV4dEF0dHJpYnV0ZXMiLCJpdGVtIiwiX2FwcGx5VGV4dEF0dHJpYnV0ZSIsImJpbmQiLCJfY3JlYXRlRm9udExhYmVsIiwiX25hdGl2ZUFzc2V0Iiwic2VsZiIsImFzc2V0TWFuYWdlciIsInBvc3RMb2FkTmF0aXZlIiwiZXJyIiwiX21lYXN1cmVUZXh0Iiwic3R5bGVJbmRleCIsImxhYmVsIiwibGVuZ3RoIiwicHVzaCIsIl9zdHlsZUluZGV4IiwibGFiZWxTaXplIiwiZ2V0Q29udGVudFNpemUiLCJldmVudCIsImNvbXBvbmVudHMiLCJnZXRDb21wb25lbnRzIiwiaSIsImxhYmVsU2VnbWVudCIsImNsaWNrSGFuZGxlciIsIl9jbGlja0hhbmRsZXIiLCJjbGlja1BhcmFtIiwiX2NsaWNrUGFyYW0iLCJfY29udGFpbnNUb3VjaExvY2F0aW9uIiwidG91Y2giLCJnZXRMb2NhdGlvbiIsImNvbXBvbmVudCIsInN0b3BQcm9wYWdhdGlvbiIsInBvaW50IiwibXlSZWN0IiwiZ2V0Qm91bmRpbmdCb3hUb1dvcmxkIiwiY29udGFpbnMiLCJfcmVzZXRTdGF0ZSIsImNoaWxkIiwicGFyZW50Iiwic3BsaWNlIiwicHV0IiwiX2xpbmVPZmZzZXRYIiwiX2xpbmVDb3VudCIsIl9sYWJlbFdpZHRoIiwiX2xhYmVsSGVpZ2h0Iiwib25SZXN0b3JlIiwiYWN0aXZlIiwiX2FkZExhYmVsU2VnbWVudCIsInN0cmluZ1Rva2VuIiwicG9wIiwiYWRkQ2hpbGQiLCJfdXBkYXRlUmljaFRleHRXaXRoTWF4V2lkdGgiLCJsYWJlbFN0cmluZyIsImxhYmVsV2lkdGgiLCJmcmFnbWVudFdpZHRoIiwiY2hlY2tTdGFydEluZGV4IiwiY2hlY2tFbmRJbmRleCIsIl9nZXRGaXJzdFdvcmRMZW4iLCJjaGVja1N0cmluZyIsInN1YnN0ciIsImNoZWNrU3RyaW5nV2lkdGgiLCJyZW1haW5pbmdTdHJpbmciLCJfdXBkYXRlTGluZUluZm8iLCJmcmFnbWVudHMiLCJmcmFnbWVudFRleHQiLCJrIiwic3BsaXRTdHJpbmciLCJfaXNMYXN0Q29tcG9uZW50Q1IiLCJsYXN0SW5kZXhPZiIsIl9uZWVkc1VwZGF0ZVRleHRMYXlvdXQiLCJuZXdUZXh0QXJyYXkiLCJvbGRJdGVtIiwibmV3SXRlbSIsInRleHQiLCJvbGRTdHlsZSIsInN0eWxlIiwibmV3U3R5bGUiLCJzaXplIiwiaXRhbGljIiwiaXNJbWFnZSIsInNyYyIsImltYWdlQWxpZ24iLCJpbWFnZUhlaWdodCIsImltYWdlV2lkdGgiLCJpbWFnZU9mZnNldCIsIl9hZGRSaWNoVGV4dEltYWdlRWxlbWVudCIsInJpY2hUZXh0RWxlbWVudCIsInNwcml0ZUZyYW1lTmFtZSIsInNwcml0ZUZyYW1lIiwiZ2V0U3ByaXRlRnJhbWUiLCJzcHJpdGVOb2RlIiwic3ByaXRlQ29tcG9uZW50IiwiU3ByaXRlIiwiX2ltYWdlT2Zmc2V0IiwiVHlwZSIsIlNMSUNFRCIsInNpemVNb2RlIiwiU2l6ZU1vZGUiLCJDVVNUT00iLCJzcHJpdGVSZWN0IiwiZ2V0UmVjdCIsInNjYWxlRmFjdG9yIiwic3ByaXRlV2lkdGgiLCJzcHJpdGVIZWlnaHQiLCJoZWlnaHQiLCJleHBlY3RXaWR0aCIsImV4cGVjdEhlaWdodCIsInNldENvbnRlbnRTaXplIiwiY2xpY2siLCJwYXJhbSIsIndhcm5JRCIsInBhcnNlIiwibGFzdEVtcHR5TGluZSIsIm5ld2xpbmUiLCJtdWx0aWxpbmVUZXh0cyIsInNwbGl0IiwiaiIsIkJBU0VMSU5FX1JBVElPIiwiX3VwZGF0ZVJpY2hUZXh0UG9zaXRpb24iLCJzdGFydEluZGV4IiwidGV4dExlbiIsImNoYXJhY3RlciIsImNoYXJBdCIsImlzVW5pY29kZUNKSyIsImlzVW5pY29kZVNwYWNlIiwibGVuIiwiaW5kZXgiLCJuZXh0VG9rZW5YIiwibmV4dExpbmVJbmRleCIsInRvdGFsTGluZUNvdW50IiwibGluZUNvdW50IiwibGluZU9mZnNldFgiLCJSSUdIVCIsIngiLCJ5Iiwic3ByaXRlIiwibGluZUhlaWdodFNldCIsImxpbmVIZWlnaHRSZWFsIiwiYW5jaG9yWSIsIm9mZnNldHMiLCJvZmZzZXRZIiwicGFyc2VGbG9hdCIsIk51bWJlciIsImlzSW50ZWdlciIsIm9mZnNldFgiLCJfY29udmVydExpdGVyYWxDb2xvclZhbHVlIiwiY29sb3JWYWx1ZSIsInRvVXBwZXJDYXNlIiwiQ29sb3IiLCJvdXQiLCJmcm9tSEVYIiwiZm9yY2UiLCJ0ZXh0U3R5bGUiLCJpc0Fzc2V0IiwiRm9udCIsImVuYWJsZUJvbGQiLCJib2xkIiwiZW5hYmxlSXRhbGljcyIsImVuYWJsZVVuZGVybGluZSIsInVuZGVybGluZSIsImxhYmVsT3V0bGluZUNvbXBvbmVudCIsIl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEiLCJvbkRlc3Ryb3kiLCJyZW1vdmVGcm9tUGFyZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLGdCQUFELENBQWxCOztBQUNBLElBQU1DLEtBQUssR0FBR0QsT0FBTyxDQUFDLHFCQUFELENBQXJCOztBQUNBLElBQU1FLFNBQVMsR0FBR0YsT0FBTyxDQUFDLHFCQUFELENBQXpCOztBQUNBLElBQU1HLGNBQWMsR0FBR0gsT0FBTyxDQUFDLDJCQUFELENBQTlCOztBQUNBLElBQU1JLGVBQWUsR0FBRyxJQUFJRCxjQUFKLEVBQXhCOztBQUVBLElBQU1FLGVBQWUsR0FBR0osS0FBSyxDQUFDSyxhQUE5QjtBQUNBLElBQU1DLGFBQWEsR0FBR04sS0FBSyxDQUFDTyxxQkFBNUI7QUFDQSxJQUFNQyxpQkFBaUIsR0FBRyxnQkFBMUI7QUFDQSxJQUFNQyxzQkFBc0IsR0FBRyxzQkFBL0I7QUFDQSxJQUFNQyxTQUFTLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTRixTQUEzQixFQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLFNBQVNHLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCQyxJQUF4QixFQUE4QkMsU0FBOUIsRUFBeUM7QUFDckMsTUFBSUMsT0FBSjtBQUNBLFNBQU8sWUFBWTtBQUNmLFFBQUlDLE9BQU8sR0FBRyxJQUFkOztBQUNBLFFBQUlDLEtBQUssR0FBRyxTQUFSQSxLQUFRLEdBQVk7QUFDcEJGLE1BQUFBLE9BQU8sR0FBRyxJQUFWO0FBQ0EsVUFBSSxDQUFDRCxTQUFMLEVBQWdCRixJQUFJLENBQUNNLEtBQUwsQ0FBV0YsT0FBWCxFQUFvQkcsU0FBcEI7QUFDbkIsS0FIRDs7QUFJQSxRQUFJQyxPQUFPLEdBQUdOLFNBQVMsSUFBSSxDQUFDQyxPQUE1QjtBQUNB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QUFDc0csV0FBVixHQUF3QjhILFNBQVMsQ0FBQ3RJLEtBQVYsQ0FBZ0IyRixLQUF4QztBQUNILE9BRkQsTUFHSztBQUNEekwsUUFBQUEsU0FBUyxDQUFDc0csV0FBVixHQUF3QixFQUF4QjtBQUNIO0FBQ0osS0FWRCxNQVdLO0FBQ0R0RyxNQUFBQSxTQUFTLENBQUNvRyxhQUFWLEdBQTBCLElBQTFCO0FBQ0g7QUFDSixHQWw0Qm1CO0FBbzRCcEIwSSxFQUFBQSxTQXA0Qm9CLHVCQW80QlA7QUFDVCxTQUFLLElBQUk3SSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUs5RSxjQUFMLENBQW9Cc0UsTUFBeEMsRUFBZ0QsRUFBRVEsQ0FBbEQsRUFBcUQ7QUFDakQsV0FBSzlFLGNBQUwsQ0FBb0I4RSxDQUFwQixFQUF1QjhJLGdCQUF2Qjs7QUFDQS9QLE1BQUFBLElBQUksQ0FBQ29JLEdBQUwsQ0FBUyxLQUFLakcsY0FBTCxDQUFvQjhFLENBQXBCLENBQVQ7QUFDSDtBQUNKO0FBejRCbUIsQ0FBVCxDQUFmO0FBNDRCQS9ILEVBQUUsQ0FBQzJDLFFBQUgsR0FBY21PLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnBPLFFBQS9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBqcyA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2pzJyk7XG5jb25zdCBtYWNybyA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL0NDTWFjcm8nKTtcbmNvbnN0IHRleHRVdGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL3RleHQtdXRpbHMnKTtcbmNvbnN0IEh0bWxUZXh0UGFyc2VyID0gcmVxdWlyZSgnLi4vdXRpbHMvaHRtbC10ZXh0LXBhcnNlcicpO1xuY29uc3QgX2h0bWxUZXh0UGFyc2VyID0gbmV3IEh0bWxUZXh0UGFyc2VyKCk7XG5cbmNvbnN0IEhvcml6b250YWxBbGlnbiA9IG1hY3JvLlRleHRBbGlnbm1lbnQ7XG5jb25zdCBWZXJ0aWNhbEFsaWduID0gbWFjcm8uVmVydGljYWxUZXh0QWxpZ25tZW50O1xuY29uc3QgUmljaFRleHRDaGlsZE5hbWUgPSBcIlJJQ0hURVhUX0NISUxEXCI7XG5jb25zdCBSaWNoVGV4dENoaWxkSW1hZ2VOYW1lID0gXCJSSUNIVEVYVF9JbWFnZV9DSElMRFwiO1xuY29uc3QgQ2FjaGVNb2RlID0gY2MuTGFiZWwuQ2FjaGVNb2RlO1xuXG4vLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4vLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG4vLyBOIG1pbGxpc2Vjb25kcy4gSWYgYGltbWVkaWF0ZWAgaXMgcGFzc2VkLCB0cmlnZ2VyIHRoZSBmdW5jdGlvbiBvbiB0aGVcbi8vIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICBsZXQgdGltZW91dDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXM7XG4gICAgICAgIGxldCBsYXRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgICAgICBpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbi8qKlxuICogUmljaFRleHQgcG9vbFxuICovXG5sZXQgcG9vbCA9IG5ldyBqcy5Qb29sKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICBjYy5pc1ZhbGlkKG5vZGUpICYmIG5vZGUuZGVzdHJveSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChDQ19ERVYpIHtcbiAgICAgICAgY2MuYXNzZXJ0KCFub2RlLl9wYXJlbnQsICdSZWN5Y2xpbmcgbm9kZVxcJ3MgcGFyZW50IHNob3VsZCBiZSBudWxsIScpO1xuICAgIH1cbiAgICBpZiAoIWNjLmlzVmFsaWQobm9kZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBvdXRsaW5lID0gbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKTtcbiAgICAgICAgaWYgKG91dGxpbmUpIHtcbiAgICAgICAgICAgIG91dGxpbmUud2lkdGggPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59LCAyMCk7XG5cbnBvb2wuZ2V0ID0gZnVuY3Rpb24gKHN0cmluZywgcmljaHRleHQpIHtcbiAgICBsZXQgbGFiZWxOb2RlID0gdGhpcy5fZ2V0KCk7XG4gICAgaWYgKCFsYWJlbE5vZGUpIHtcbiAgICAgICAgbGFiZWxOb2RlID0gbmV3IGNjLlByaXZhdGVOb2RlKFJpY2hUZXh0Q2hpbGROYW1lKTtcbiAgICB9XG5cbiAgICBsYWJlbE5vZGUuc2V0UG9zaXRpb24oMCwgMCk7XG4gICAgbGFiZWxOb2RlLnNldEFuY2hvclBvaW50KDAuNSwgMC41KTtcbiAgICBsYWJlbE5vZGUuc2tld1ggPSAwO1xuXG4gICAgbGV0IGxhYmVsQ29tcG9uZW50ID0gbGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgaWYgKCFsYWJlbENvbXBvbmVudCkge1xuICAgICAgICBsYWJlbENvbXBvbmVudCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgIH1cblxuICAgIGxhYmVsQ29tcG9uZW50LnN0cmluZyA9IFwiXCI7XG4gICAgbGFiZWxDb21wb25lbnQuaG9yaXpvbnRhbEFsaWduID0gSG9yaXpvbnRhbEFsaWduLkxFRlQ7XG4gICAgbGFiZWxDb21wb25lbnQudmVydGljYWxBbGlnbiA9IFZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xuICAgIGxhYmVsQ29tcG9uZW50Ll9mb3JjZVVzZUNhbnZhcyA9IHRydWU7XG5cbiAgICByZXR1cm4gbGFiZWxOb2RlO1xufTtcblxuLyoqXG4gKiAhI2VuIFRoZSBSaWNoVGV4dCBDb21wb25lbnQuXG4gKiAhI3poIOWvjOaWh+acrOe7hOS7tlxuICogQGNsYXNzIFJpY2hUZXh0XG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcbiAqL1xubGV0IFJpY2hUZXh0ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5SaWNoVGV4dCcsXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgY3RvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl90ZXh0QXJyYXkgPSBudWxsO1xuICAgICAgICB0aGlzLl9sYWJlbFNlZ21lbnRzID0gW107XG4gICAgICAgIHRoaXMuX2xhYmVsU2VnbWVudHNDYWNoZSA9IFtdO1xuICAgICAgICB0aGlzLl9saW5lc1dpZHRoID0gW107XG5cbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgdGhpcy5fdXNlckRlZmluZWRGb250ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJpY2hUZXh0U3RhdHVzID0gZGVib3VuY2UodGhpcy5fdXBkYXRlUmljaFRleHQsIDIwMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVSaWNoVGV4dFN0YXR1cyA9IHRoaXMuX3VwZGF0ZVJpY2hUZXh0O1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5yZW5kZXJlcnMvUmljaFRleHQnLFxuICAgICAgICBoZWxwOiAnaTE4bjpDT01QT05FTlQuaGVscF91cmwucmljaHRleHQnLFxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3JpY2h0ZXh0LmpzJyxcbiAgICAgICAgZXhlY3V0ZUluRWRpdE1vZGU6IHRydWVcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBDb250ZW50IHN0cmluZyBvZiBSaWNoVGV4dC5cbiAgICAgICAgICogISN6aCDlr4zmlofmnKzmmL7npLrnmoTmlofmnKzlhoXlrrnjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IHN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgc3RyaW5nOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAnPGNvbG9yPSMwMGZmMDA+UmljaDwvYz48Y29sb3I9IzBmZmZmZj5UZXh0PC9jb2xvcj4nLFxuICAgICAgICAgICAgbXVsdGlsaW5lOiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5yaWNodGV4dC5zdHJpbmcnLFxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmljaFRleHRTdGF0dXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBIb3Jpem9udGFsIEFsaWdubWVudCBvZiBlYWNoIGxpbmUgaW4gUmljaFRleHQuXG4gICAgICAgICAqICEjemgg5paH5pys5YaF5a6555qE5rC05bmz5a+56b2Q5pa55byP44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7bWFjcm8uVGV4dEFsaWdubWVudH0gaG9yaXpvbnRhbEFsaWduXG4gICAgICAgICAqL1xuICAgICAgICBob3Jpem9udGFsQWxpZ246IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IEhvcml6b250YWxBbGlnbi5MRUZULFxuICAgICAgICAgICAgdHlwZTogSG9yaXpvbnRhbEFsaWduLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5yaWNodGV4dC5ob3Jpem9udGFsX2FsaWduJyxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsQWxpZ24gPT09IG9sZFZhbHVlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXREaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmljaFRleHRTdGF0dXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBGb250IHNpemUgb2YgUmljaFRleHQuXG4gICAgICAgICAqICEjemgg5a+M5paH5pys5a2X5L2T5aSn5bCP44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBmb250U2l6ZVxuICAgICAgICAgKi9cbiAgICAgICAgZm9udFNpemU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IDQwLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5yaWNodGV4dC5mb250X3NpemUnLFxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb250U2l6ZSA9PT0gb2xkVmFsdWUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dERpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSaWNoVGV4dFN0YXR1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEN1c3RvbSBTeXN0ZW0gZm9udCBvZiBSaWNoVGV4dFxuICAgICAgICAgKiAhI3poIOWvjOaWh+acrOWumuWItuezu+e7n+Wtl+S9k1xuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gZm9udEZhbWlseVxuICAgICAgICAgKi9cbiAgICAgICAgX2ZvbnRGYW1pbHk6IFwiQXJpYWxcIixcbiAgICAgICAgZm9udEZhbWlseToge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5yaWNodGV4dC5mb250X2ZhbWlseScsXG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb250RmFtaWx5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZm9udEZhbWlseSA9PT0gdmFsdWUpIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLl9mb250RmFtaWx5ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5b3V0RGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJpY2hUZXh0U3RhdHVzKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBDdXN0b20gVFRGIGZvbnQgb2YgUmljaFRleHRcbiAgICAgICAgICogISN6aCAg5a+M5paH5pys5a6a5Yi25a2X5L2TXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Y2MuVFRGRm9udH0gZm9udFxuICAgICAgICAgKi9cbiAgICAgICAgZm9udDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlRURkZvbnQsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnJpY2h0ZXh0LmZvbnQnLFxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb250ID09PSBvbGRWYWx1ZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5b3V0RGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXNlckRlZmluZWRGb250ID0gdGhpcy5mb250O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlU3lzdGVtRm9udCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vblRURkxvYWRlZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VTeXN0ZW1Gb250ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmljaFRleHRTdGF0dXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBXaGV0aGVyIHVzZSBzeXN0ZW0gZm9udCBuYW1lIG9yIG5vdC5cbiAgICAgICAgICogISN6aCDmmK/lkKbkvb/nlKjns7vnu5/lrZfkvZPjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSB1c2VTeXN0ZW1Gb250XG4gICAgICAgICAqL1xuICAgICAgICBfaXNTeXN0ZW1Gb250VXNlZDogdHJ1ZSxcbiAgICAgICAgdXNlU3lzdGVtRm9udDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faXNTeXN0ZW1Gb250VXNlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzU3lzdGVtRm9udFVzZWQgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5faXNTeXN0ZW1Gb250VXNlZCA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9udCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fdXNlckRlZmluZWRGb250KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvbnQgPSB0aGlzLl91c2VyRGVmaW5lZEZvbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXREaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmljaFRleHRTdGF0dXMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucmljaHRleHQuc3lzdGVtX2ZvbnQnLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBjYWNoZSBtb2RlIG9mIGxhYmVsLiBUaGlzIG1vZGUgb25seSBzdXBwb3J0cyBzeXN0ZW0gZm9udHMuXG4gICAgICAgICAqICEjemgg5paH5pys57yT5a2Y5qih5byPLCDor6XmqKHlvI/lj6rmlK/mjIHns7vnu5/lrZfkvZPjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtMYWJlbC5DYWNoZU1vZGV9IGNhY2hlTW9kZVxuICAgICAgICAgKi9cbiAgICAgICAgY2FjaGVNb2RlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBDYWNoZU1vZGUuTk9ORSxcbiAgICAgICAgICAgIHR5cGU6IENhY2hlTW9kZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGFiZWwuY2FjaGVNb2RlJyxcbiAgICAgICAgICAgIG5vdGlmeSAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZU1vZGUgPT09IG9sZFZhbHVlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSaWNoVGV4dFN0YXR1cygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIG1heGltaXplIHdpZHRoIG9mIHRoZSBSaWNoVGV4dFxuICAgICAgICAgKiAhI3poIOWvjOaWh+acrOeahOacgOWkp+WuveW6plxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbWF4V2lkdGhcbiAgICAgICAgICovXG4gICAgICAgIG1heFdpZHRoOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5yaWNodGV4dC5tYXhfd2lkdGgnLFxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXhXaWR0aCA9PT0gb2xkVmFsdWUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dERpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSaWNoVGV4dFN0YXR1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIExpbmUgSGVpZ2h0IG9mIFJpY2hUZXh0LlxuICAgICAgICAgKiAhI3poIOWvjOaWh+acrOihjOmrmOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbGluZUhlaWdodFxuICAgICAgICAgKi9cbiAgICAgICAgbGluZUhlaWdodDoge1xuICAgICAgICAgICAgZGVmYXVsdDogNDAsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnJpY2h0ZXh0LmxpbmVfaGVpZ2h0JyxcbiAgICAgICAgICAgIG5vdGlmeTogZnVuY3Rpb24gKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGluZUhlaWdodCA9PT0gb2xkVmFsdWUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dERpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSaWNoVGV4dFN0YXR1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBpbWFnZSBhdGxhcyBmb3IgdGhlIGltZyB0YWcuIEZvciBlYWNoIHNyYyB2YWx1ZSBpbiB0aGUgaW1nIHRhZywgdGhlcmUgc2hvdWxkIGJlIGEgdmFsaWQgc3ByaXRlRnJhbWUgaW4gdGhlIGltYWdlIGF0bGFzLlxuICAgICAgICAgKiAhI3poIOWvueS6jiBpbWcg5qCH562+6YeM6Z2i55qEIHNyYyDlsZ7mgKflkI3np7DvvIzpg73pnIDopoHlnKggaW1hZ2VBdGxhcyDph4zpnaLmib7liLDkuIDkuKrmnInmlYjnmoQgc3ByaXRlRnJhbWXvvIzlkKbliJkgaW1nIHRhZyDkvJrliKTlrprkuLrml6DmlYjjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtTcHJpdGVBdGxhc30gaW1hZ2VBdGxhc1xuICAgICAgICAgKi9cbiAgICAgICAgaW1hZ2VBdGxhczoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUF0bGFzLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5yaWNodGV4dC5pbWFnZV9hdGxhcycsXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmltYWdlQXRsYXMgPT09IG9sZFZhbHVlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXREaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmljaFRleHRTdGF0dXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBPbmNlIGNoZWNrZWQsIHRoZSBSaWNoVGV4dCB3aWxsIGJsb2NrIGFsbCBpbnB1dCBldmVudHMgKG1vdXNlIGFuZCB0b3VjaCkgd2l0aGluXG4gICAgICAgICAqIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIG5vZGUsIHByZXZlbnRpbmcgdGhlIGlucHV0IGZyb20gcGVuZXRyYXRpbmcgaW50byB0aGUgdW5kZXJseWluZyBub2RlLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOmAieS4reatpOmAiemhueWQju+8jFJpY2hUZXh0IOWwhumYu+atouiKgueCuei+ueeVjOahhuS4reeahOaJgOaciei+k+WFpeS6i+S7tu+8iOm8oOagh+WSjOinpuaRuO+8ie+8jOS7juiAjOmYsuatoui+k+WFpeS6i+S7tuepv+mAj+WIsOW6leWxguiKgueCueOAglxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGhhbmRsZVRvdWNoRXZlbnRcbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgaGFuZGxlVG91Y2hFdmVudDoge1xuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucmljaHRleHQuaGFuZGxlVG91Y2hFdmVudCcsXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZVRvdWNoRXZlbnQgPT09IG9sZFZhbHVlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVG91Y2hFdmVudCA/IHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCkgOiB0aGlzLl9yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIEhvcml6b250YWxBbGlnbjogSG9yaXpvbnRhbEFsaWduLFxuICAgICAgICBWZXJ0aWNhbEFsaWduOiBWZXJ0aWNhbEFsaWduXG4gICAgfSxcblxuICAgIG9uRW5hYmxlICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlVG91Y2hFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVSaWNoVGV4dCgpO1xuICAgICAgICB0aGlzLl9hY3RpdmF0ZUNoaWxkcmVuKHRydWUpO1xuICAgIH0sXG5cbiAgICBvbkRpc2FibGUgKCkge1xuICAgICAgICBpZiAodGhpcy5oYW5kbGVUb3VjaEV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2FjdGl2YXRlQ2hpbGRyZW4oZmFsc2UpO1xuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuX29uVFRGTG9hZGVkKCk7XG4gICAgfSxcblxuICAgIF9vbkNvbG9yQ2hhbmdlZCAocGFyZW50Q29sb3IpIHtcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgIGNoaWxkTm9kZS5jb2xvciA9IHBhcmVudENvbG9yO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgX2FkZEV2ZW50TGlzdGVuZXJzICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25Ub3VjaEVuZGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLkNPTE9SX0NIQU5HRUQsIHRoaXMuX29uQ29sb3JDaGFuZ2VkLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgX3JlbW92ZUV2ZW50TGlzdGVuZXJzICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uVG91Y2hFbmRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuQ09MT1JfQ0hBTkdFRCwgdGhpcy5fb25Db2xvckNoYW5nZWQsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlTGFiZWxTZWdtZW50VGV4dEF0dHJpYnV0ZXMgKCkge1xuICAgICAgICB0aGlzLl9sYWJlbFNlZ21lbnRzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX2FwcGx5VGV4dEF0dHJpYnV0ZShpdGVtLCBudWxsLCB0cnVlKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9LFxuXG4gICAgX2NyZWF0ZUZvbnRMYWJlbCAoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBwb29sLmdldChzdHJpbmcsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBfb25UVEZMb2FkZWQgKCkge1xuICAgICAgICBpZiAodGhpcy5mb250IGluc3RhbmNlb2YgY2MuVFRGRm9udCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9udC5fbmF0aXZlQXNzZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXREaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmljaFRleHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIucG9zdExvYWROYXRpdmUodGhpcy5mb250LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2xheW91dERpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fdXBkYXRlUmljaFRleHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xheW91dERpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJpY2hUZXh0KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX21lYXN1cmVUZXh0IChzdHlsZUluZGV4LCBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgZnVuYyA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgICAgIGxldCBsYWJlbDtcbiAgICAgICAgICAgIGlmIChzZWxmLl9sYWJlbFNlZ21lbnRzQ2FjaGUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSBzZWxmLl9jcmVhdGVGb250TGFiZWwoc3RyaW5nKTtcbiAgICAgICAgICAgICAgICBzZWxmLl9sYWJlbFNlZ21lbnRzQ2FjaGUucHVzaChsYWJlbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gc2VsZi5fbGFiZWxTZWdtZW50c0NhY2hlWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFiZWwuX3N0eWxlSW5kZXggPSBzdHlsZUluZGV4O1xuICAgICAgICAgICAgc2VsZi5fYXBwbHlUZXh0QXR0cmlidXRlKGxhYmVsLCBzdHJpbmcsIHRydWUpO1xuICAgICAgICAgICAgbGV0IGxhYmVsU2l6ZSA9IGxhYmVsLmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgICAgICByZXR1cm4gbGFiZWxTaXplLndpZHRoO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoc3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuYyhzdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmM7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29uVG91Y2hFbmRlZCAoZXZlbnQpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudHMgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50cyhjYy5Db21wb25lbnQpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbGFiZWxTZWdtZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGxhYmVsU2VnbWVudCA9IHRoaXMuX2xhYmVsU2VnbWVudHNbaV07XG4gICAgICAgICAgICBsZXQgY2xpY2tIYW5kbGVyID0gbGFiZWxTZWdtZW50Ll9jbGlja0hhbmRsZXI7XG4gICAgICAgICAgICBsZXQgY2xpY2tQYXJhbSA9IGxhYmVsU2VnbWVudC5fY2xpY2tQYXJhbTtcbiAgICAgICAgICAgIGlmIChjbGlja0hhbmRsZXIgJiYgdGhpcy5fY29udGFpbnNUb3VjaExvY2F0aW9uKGxhYmVsU2VnbWVudCwgZXZlbnQudG91Y2guZ2V0TG9jYXRpb24oKSkpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50LmVuYWJsZWRJbkhpZXJhcmNoeSAmJiBjb21wb25lbnRbY2xpY2tIYW5kbGVyXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50W2NsaWNrSGFuZGxlcl0oZXZlbnQsIGNsaWNrUGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2NvbnRhaW5zVG91Y2hMb2NhdGlvbiAobGFiZWwsIHBvaW50KSB7XG4gICAgICAgIGxldCBteVJlY3QgPSBsYWJlbC5nZXRCb3VuZGluZ0JveFRvV29ybGQoKTtcbiAgICAgICAgcmV0dXJuIG15UmVjdC5jb250YWlucyhwb2ludCk7XG4gICAgfSxcblxuICAgIF9yZXNldFN0YXRlICgpIHtcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGxldCBpID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgPT09IFJpY2hUZXh0Q2hpbGROYW1lIHx8IGNoaWxkLm5hbWUgPT09IFJpY2hUZXh0Q2hpbGRJbWFnZU5hbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQucGFyZW50ID09PSB0aGlzLm5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEluIGNhc2UgY2hpbGQucGFyZW50ICE9PSB0aGlzLm5vZGUsIGNoaWxkIGNhbm5vdCBiZSByZW1vdmVkIGZyb20gY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQubmFtZSA9PT0gUmljaFRleHRDaGlsZE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9vbC5wdXQoY2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xhYmVsU2VnbWVudHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fbGFiZWxTZWdtZW50c0NhY2hlLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX2xpbmVzV2lkdGgubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fbGluZU9mZnNldFggPSAwO1xuICAgICAgICB0aGlzLl9saW5lQ291bnQgPSAxO1xuICAgICAgICB0aGlzLl9sYWJlbFdpZHRoID0gMDtcbiAgICAgICAgdGhpcy5fbGFiZWxIZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLl9sYXlvdXREaXJ0eSA9IHRydWU7XG4gICAgfSxcblxuICAgIG9uUmVzdG9yZTogQ0NfRURJVE9SICYmIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gVE9ETzogcmVmaW5lIHVuZG8vcmVkbyBzeXN0ZW1cbiAgICAgICAgLy8gQmVjYXVzZSB1bmRvL3JlZG8gd2lsbCBub3QgY2FsbCBvbkVuYWJsZS9vbkRpc2FibGUsXG4gICAgICAgIC8vIHdlIG5lZWQgY2FsbCBvbkVuYWJsZS9vbkRpc2FibGUgbWFudWFsbHkgdG8gYWN0aXZlL2Rpc2FjdGl2ZSBjaGlsZHJlbiBub2Rlcy5cbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSB7XG4gICAgICAgICAgICB0aGlzLm9uRW5hYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uRGlzYWJsZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9hY3RpdmF0ZUNoaWxkcmVuIChhY3RpdmUpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMubm9kZS5jaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgPT09IFJpY2hUZXh0Q2hpbGROYW1lIHx8IGNoaWxkLm5hbWUgPT09IFJpY2hUZXh0Q2hpbGRJbWFnZU5hbWUpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5hY3RpdmUgPSBhY3RpdmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2FkZExhYmVsU2VnbWVudCAoc3RyaW5nVG9rZW4sIHN0eWxlSW5kZXgpIHtcbiAgICAgICAgbGV0IGxhYmVsU2VnbWVudDtcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsU2VnbWVudHNDYWNoZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxhYmVsU2VnbWVudCA9IHRoaXMuX2NyZWF0ZUZvbnRMYWJlbChzdHJpbmdUb2tlbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYWJlbFNlZ21lbnQgPSB0aGlzLl9sYWJlbFNlZ21lbnRzQ2FjaGUucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGFiZWxTZWdtZW50Ll9zdHlsZUluZGV4ID0gc3R5bGVJbmRleDtcbiAgICAgICAgbGFiZWxTZWdtZW50Ll9saW5lQ291bnQgPSB0aGlzLl9saW5lQ291bnQ7XG4gICAgICAgIGxhYmVsU2VnbWVudC5hY3RpdmUgPSB0aGlzLm5vZGUuYWN0aXZlO1xuXG4gICAgICAgIGxhYmVsU2VnbWVudC5zZXRBbmNob3JQb2ludCgwLCAwKTtcbiAgICAgICAgdGhpcy5fYXBwbHlUZXh0QXR0cmlidXRlKGxhYmVsU2VnbWVudCwgc3RyaW5nVG9rZW4pO1xuXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChsYWJlbFNlZ21lbnQpO1xuICAgICAgICB0aGlzLl9sYWJlbFNlZ21lbnRzLnB1c2gobGFiZWxTZWdtZW50KTtcblxuICAgICAgICByZXR1cm4gbGFiZWxTZWdtZW50O1xuICAgIH0sXG5cbiAgICBfdXBkYXRlUmljaFRleHRXaXRoTWF4V2lkdGggKGxhYmVsU3RyaW5nLCBsYWJlbFdpZHRoLCBzdHlsZUluZGV4KSB7XG4gICAgICAgIGxldCBmcmFnbWVudFdpZHRoID0gbGFiZWxXaWR0aDtcbiAgICAgICAgbGV0IGxhYmVsU2VnbWVudDtcblxuICAgICAgICBpZiAodGhpcy5fbGluZU9mZnNldFggPiAwICYmIGZyYWdtZW50V2lkdGggKyB0aGlzLl9saW5lT2Zmc2V0WCA+IHRoaXMubWF4V2lkdGgpIHtcbiAgICAgICAgICAgIC8vY29uY2F0IHByZXZpb3VzIGxpbmVcbiAgICAgICAgICAgIGxldCBjaGVja1N0YXJ0SW5kZXggPSAwO1xuICAgICAgICAgICAgd2hpbGUgKHRoaXMuX2xpbmVPZmZzZXRYIDw9IHRoaXMubWF4V2lkdGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2tFbmRJbmRleCA9IHRoaXMuX2dldEZpcnN0V29yZExlbihsYWJlbFN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tTdGFydEluZGV4LFxuICAgICAgICAgICAgICAgICAgICBsYWJlbFN0cmluZy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGxldCBjaGVja1N0cmluZyA9IGxhYmVsU3RyaW5nLnN1YnN0cihjaGVja1N0YXJ0SW5kZXgsIGNoZWNrRW5kSW5kZXgpO1xuICAgICAgICAgICAgICAgIGxldCBjaGVja1N0cmluZ1dpZHRoID0gdGhpcy5fbWVhc3VyZVRleHQoc3R5bGVJbmRleCwgY2hlY2tTdHJpbmcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpbmVPZmZzZXRYICsgY2hlY2tTdHJpbmdXaWR0aCA8PSB0aGlzLm1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpbmVPZmZzZXRYICs9IGNoZWNrU3RyaW5nV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrU3RhcnRJbmRleCArPSBjaGVja0VuZEluZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tTdGFydEluZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlbWFpbmluZ1N0cmluZyA9IGxhYmVsU3RyaW5nLnN1YnN0cigwLCBjaGVja1N0YXJ0SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkTGFiZWxTZWdtZW50KHJlbWFpbmluZ1N0cmluZywgc3R5bGVJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbFN0cmluZyA9IGxhYmVsU3RyaW5nLnN1YnN0cihjaGVja1N0YXJ0SW5kZXgsIGxhYmVsU3RyaW5nLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudFdpZHRoID0gdGhpcy5fbWVhc3VyZVRleHQoc3R5bGVJbmRleCwgbGFiZWxTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxpbmVJbmZvKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZnJhZ21lbnRXaWR0aCA+IHRoaXMubWF4V2lkdGgpIHtcbiAgICAgICAgICAgIGxldCBmcmFnbWVudHMgPSB0ZXh0VXRpbHMuZnJhZ21lbnRUZXh0KGxhYmVsU3RyaW5nLFxuICAgICAgICAgICAgICAgIGZyYWdtZW50V2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5tYXhXaWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLl9tZWFzdXJlVGV4dChzdHlsZUluZGV4KSk7XG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGZyYWdtZW50cy5sZW5ndGg7ICsraykge1xuICAgICAgICAgICAgICAgIGxldCBzcGxpdFN0cmluZyA9IGZyYWdtZW50c1trXTtcbiAgICAgICAgICAgICAgICBsYWJlbFNlZ21lbnQgPSB0aGlzLl9hZGRMYWJlbFNlZ21lbnQoc3BsaXRTdHJpbmcsIHN0eWxlSW5kZXgpO1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbFNpemUgPSBsYWJlbFNlZ21lbnQuZ2V0Q29udGVudFNpemUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lT2Zmc2V0WCArPSBsYWJlbFNpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgaWYgKGZyYWdtZW50cy5sZW5ndGggPiAxICYmIGsgPCBmcmFnbWVudHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVMaW5lSW5mbygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xpbmVPZmZzZXRYICs9IGZyYWdtZW50V2lkdGg7XG4gICAgICAgICAgICB0aGlzLl9hZGRMYWJlbFNlZ21lbnQobGFiZWxTdHJpbmcsIHN0eWxlSW5kZXgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9pc0xhc3RDb21wb25lbnRDUiAoc3RyaW5nVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZ1Rva2VuLmxlbmd0aCAtIDEgPT09IHN0cmluZ1Rva2VuLmxhc3RJbmRleE9mKFwiXFxuXCIpO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlTGluZUluZm8gKCkge1xuICAgICAgICB0aGlzLl9saW5lc1dpZHRoLnB1c2godGhpcy5fbGluZU9mZnNldFgpO1xuICAgICAgICB0aGlzLl9saW5lT2Zmc2V0WCA9IDA7XG4gICAgICAgIHRoaXMuX2xpbmVDb3VudCsrO1xuICAgIH0sXG5cbiAgICBfbmVlZHNVcGRhdGVUZXh0TGF5b3V0IChuZXdUZXh0QXJyYXkpIHtcbiAgICAgICAgaWYgKHRoaXMuX2xheW91dERpcnR5IHx8ICF0aGlzLl90ZXh0QXJyYXkgfHwgIW5ld1RleHRBcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fdGV4dEFycmF5Lmxlbmd0aCAhPT0gbmV3VGV4dEFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3RleHRBcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IG9sZEl0ZW0gPSB0aGlzLl90ZXh0QXJyYXlbaV07XG4gICAgICAgICAgICBsZXQgbmV3SXRlbSA9IG5ld1RleHRBcnJheVtpXTtcbiAgICAgICAgICAgIGlmIChvbGRJdGVtLnRleHQgIT09IG5ld0l0ZW0udGV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG9sZFN0eWxlID0gb2xkSXRlbS5zdHlsZSwgbmV3U3R5bGUgPSBuZXdJdGVtLnN0eWxlO1xuICAgICAgICAgICAgICAgIGlmIChvbGRTdHlsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3U3R5bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb2xkU3R5bGUub3V0bGluZSAhPT0gIW5ld1N0eWxlLm91dGxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGRTdHlsZS5zaXplICE9PSBuZXdTdHlsZS5zaXplXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgIW9sZFN0eWxlLml0YWxpYyAhPT0gIW5ld1N0eWxlLml0YWxpY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IG9sZFN0eWxlLmlzSW1hZ2UgIT09IG5ld1N0eWxlLmlzSW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGRTdHlsZS5zcmMgIT09IG5ld1N0eWxlLnNyYyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFN0eWxlLmltYWdlQWxpZ24gIT09IG5ld1N0eWxlLmltYWdlQWxpZ24gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRTdHlsZS5pbWFnZUhlaWdodCAhPT0gbmV3U3R5bGUuaW1hZ2VIZWlnaHQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRTdHlsZS5pbWFnZVdpZHRoICE9PSBuZXdTdHlsZS5pbWFnZVdpZHRoIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkU3R5bGUuaW1hZ2VPZmZzZXQgIT09IG5ld1N0eWxlLmltYWdlT2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkU3R5bGUuc2l6ZSB8fCBvbGRTdHlsZS5pdGFsaWMgfHwgb2xkU3R5bGUuaXNJbWFnZSB8fCBvbGRTdHlsZS5vdXRsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdTdHlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1N0eWxlLnNpemUgfHwgbmV3U3R5bGUuaXRhbGljIHx8IG5ld1N0eWxlLmlzSW1hZ2UgfHwgbmV3U3R5bGUub3V0bGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgX2FkZFJpY2hUZXh0SW1hZ2VFbGVtZW50IChyaWNoVGV4dEVsZW1lbnQpIHtcbiAgICAgICAgbGV0IHNwcml0ZUZyYW1lTmFtZSA9IHJpY2hUZXh0RWxlbWVudC5zdHlsZS5zcmM7XG4gICAgICAgIGxldCBzcHJpdGVGcmFtZSA9IHRoaXMuaW1hZ2VBdGxhcy5nZXRTcHJpdGVGcmFtZShzcHJpdGVGcmFtZU5hbWUpO1xuICAgICAgICBpZiAoc3ByaXRlRnJhbWUpIHtcbiAgICAgICAgICAgIGxldCBzcHJpdGVOb2RlID0gbmV3IGNjLlByaXZhdGVOb2RlKFJpY2hUZXh0Q2hpbGRJbWFnZU5hbWUpO1xuICAgICAgICAgICAgbGV0IHNwcml0ZUNvbXBvbmVudCA9IHNwcml0ZU5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgICAgICBzd2l0Y2ggKHJpY2hUZXh0RWxlbWVudC5zdHlsZS5pbWFnZUFsaWduKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZU5vZGUuc2V0QW5jaG9yUG9pbnQoMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZU5vZGUuc2V0QW5jaG9yUG9pbnQoMCwgMC41KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlTm9kZS5zZXRBbmNob3JQb2ludCgwLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmljaFRleHRFbGVtZW50LnN0eWxlLmltYWdlT2Zmc2V0KSBzcHJpdGVOb2RlLl9pbWFnZU9mZnNldCA9IHJpY2hUZXh0RWxlbWVudC5zdHlsZS5pbWFnZU9mZnNldDtcbiAgICAgICAgICAgIHNwcml0ZUNvbXBvbmVudC50eXBlID0gY2MuU3ByaXRlLlR5cGUuU0xJQ0VEO1xuICAgICAgICAgICAgc3ByaXRlQ29tcG9uZW50LnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChzcHJpdGVOb2RlKTtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsU2VnbWVudHMucHVzaChzcHJpdGVOb2RlKTtcblxuICAgICAgICAgICAgbGV0IHNwcml0ZVJlY3QgPSBzcHJpdGVGcmFtZS5nZXRSZWN0KCk7XG4gICAgICAgICAgICBsZXQgc2NhbGVGYWN0b3IgPSAxO1xuICAgICAgICAgICAgbGV0IHNwcml0ZVdpZHRoID0gc3ByaXRlUmVjdC53aWR0aDtcbiAgICAgICAgICAgIGxldCBzcHJpdGVIZWlnaHQgPSBzcHJpdGVSZWN0LmhlaWdodDtcbiAgICAgICAgICAgIGxldCBleHBlY3RXaWR0aCA9IHJpY2hUZXh0RWxlbWVudC5zdHlsZS5pbWFnZVdpZHRoO1xuICAgICAgICAgICAgbGV0IGV4cGVjdEhlaWdodCA9IHJpY2hUZXh0RWxlbWVudC5zdHlsZS5pbWFnZUhlaWdodDtcblxuICAgICAgICAgICAgaWYgKGV4cGVjdEhlaWdodCA+IDApIHtcbiAgICAgICAgICAgICAgICBzY2FsZUZhY3RvciA9IGV4cGVjdEhlaWdodCAvIHNwcml0ZUhlaWdodDtcbiAgICAgICAgICAgICAgICBzcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoICogc2NhbGVGYWN0b3I7XG4gICAgICAgICAgICAgICAgc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0ICogc2NhbGVGYWN0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY2FsZUZhY3RvciA9IHRoaXMubGluZUhlaWdodCAvIHNwcml0ZUhlaWdodDtcbiAgICAgICAgICAgICAgICBzcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoICogc2NhbGVGYWN0b3I7XG4gICAgICAgICAgICAgICAgc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0ICogc2NhbGVGYWN0b3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChleHBlY3RXaWR0aCA+IDApIHNwcml0ZVdpZHRoID0gZXhwZWN0V2lkdGg7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1heFdpZHRoID4gMCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9saW5lT2Zmc2V0WCArIHNwcml0ZVdpZHRoID4gdGhpcy5tYXhXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVMaW5lSW5mbygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lT2Zmc2V0WCArPSBzcHJpdGVXaWR0aDtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZU9mZnNldFggKz0gc3ByaXRlV2lkdGg7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpbmVPZmZzZXRYID4gdGhpcy5fbGFiZWxXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbFdpZHRoID0gdGhpcy5fbGluZU9mZnNldFg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3ByaXRlQ29tcG9uZW50LnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG4gICAgICAgICAgICBzcHJpdGVOb2RlLnNldENvbnRlbnRTaXplKHNwcml0ZVdpZHRoLCBzcHJpdGVIZWlnaHQpO1xuICAgICAgICAgICAgc3ByaXRlTm9kZS5fbGluZUNvdW50ID0gdGhpcy5fbGluZUNvdW50O1xuXG4gICAgICAgICAgICBpZiAocmljaFRleHRFbGVtZW50LnN0eWxlLmV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHJpY2hUZXh0RWxlbWVudC5zdHlsZS5ldmVudC5jbGljaykge1xuICAgICAgICAgICAgICAgICAgICBzcHJpdGVOb2RlLl9jbGlja0hhbmRsZXIgPSByaWNoVGV4dEVsZW1lbnQuc3R5bGUuZXZlbnQuY2xpY2s7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyaWNoVGV4dEVsZW1lbnQuc3R5bGUuZXZlbnQucGFyYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlTm9kZS5fY2xpY2tQYXJhbSA9IHJpY2hUZXh0RWxlbWVudC5zdHlsZS5ldmVudC5wYXJhbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZU5vZGUuX2NsaWNrUGFyYW0gPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzcHJpdGVOb2RlLl9jbGlja0hhbmRsZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2Mud2FybklEKDQ0MDApO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF91cGRhdGVSaWNoVGV4dCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkSW5IaWVyYXJjaHkpIHJldHVybjtcblxuICAgICAgICBsZXQgbmV3VGV4dEFycmF5ID0gX2h0bWxUZXh0UGFyc2VyLnBhcnNlKHRoaXMuc3RyaW5nKTtcbiAgICAgICAgaWYgKCF0aGlzLl9uZWVkc1VwZGF0ZVRleHRMYXlvdXQobmV3VGV4dEFycmF5KSkge1xuICAgICAgICAgICAgdGhpcy5fdGV4dEFycmF5ID0gbmV3VGV4dEFycmF5O1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTGFiZWxTZWdtZW50VGV4dEF0dHJpYnV0ZXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3RleHRBcnJheSA9IG5ld1RleHRBcnJheTtcbiAgICAgICAgdGhpcy5fcmVzZXRTdGF0ZSgpO1xuXG4gICAgICAgIGxldCBsYXN0RW1wdHlMaW5lID0gZmFsc2U7XG4gICAgICAgIGxldCBsYWJlbDtcbiAgICAgICAgbGV0IGxhYmVsU2l6ZTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3RleHRBcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IHJpY2hUZXh0RWxlbWVudCA9IHRoaXMuX3RleHRBcnJheVtpXTtcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gcmljaFRleHRFbGVtZW50LnRleHQ7XG4gICAgICAgICAgICAvL2hhbmRsZSA8YnIvPiA8aW1nIC8+IHRhZ1xuICAgICAgICAgICAgaWYgKHRleHQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAocmljaFRleHRFbGVtZW50LnN0eWxlICYmIHJpY2hUZXh0RWxlbWVudC5zdHlsZS5uZXdsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxpbmVJbmZvKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmljaFRleHRFbGVtZW50LnN0eWxlICYmIHJpY2hUZXh0RWxlbWVudC5zdHlsZS5pc0ltYWdlICYmIHRoaXMuaW1hZ2VBdGxhcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRSaWNoVGV4dEltYWdlRWxlbWVudChyaWNoVGV4dEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbXVsdGlsaW5lVGV4dHMgPSB0ZXh0LnNwbGl0KFwiXFxuXCIpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG11bHRpbGluZVRleHRzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsU3RyaW5nID0gbXVsdGlsaW5lVGV4dHNbal07XG4gICAgICAgICAgICAgICAgaWYgKGxhYmVsU3RyaW5nID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vZm9yIGNvbnRpbnVlcyBcXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzTGFzdENvbXBvbmVudENSKHRleHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBqID09PSBtdWx0aWxpbmVUZXh0cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVMaW5lSW5mbygpO1xuICAgICAgICAgICAgICAgICAgICBsYXN0RW1wdHlMaW5lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxhc3RFbXB0eUxpbmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heFdpZHRoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGFiZWxXaWR0aCA9IHRoaXMuX21lYXN1cmVUZXh0KGksIGxhYmVsU3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmljaFRleHRXaXRoTWF4V2lkdGgobGFiZWxTdHJpbmcsIGxhYmVsV2lkdGgsIGkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChtdWx0aWxpbmVUZXh0cy5sZW5ndGggPiAxICYmIGogPCBtdWx0aWxpbmVUZXh0cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVMaW5lSW5mbygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IHRoaXMuX2FkZExhYmVsU2VnbWVudChsYWJlbFN0cmluZywgaSk7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsU2l6ZSA9IGxhYmVsLmdldENvbnRlbnRTaXplKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGluZU9mZnNldFggKz0gbGFiZWxTaXplLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbGluZU9mZnNldFggPiB0aGlzLl9sYWJlbFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbFdpZHRoID0gdGhpcy5fbGluZU9mZnNldFg7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAobXVsdGlsaW5lVGV4dHMubGVuZ3RoID4gMSAmJiBqIDwgbXVsdGlsaW5lVGV4dHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlTGluZUluZm8oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWxhc3RFbXB0eUxpbmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpbmVzV2lkdGgucHVzaCh0aGlzLl9saW5lT2Zmc2V0WCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tYXhXaWR0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsV2lkdGggPSB0aGlzLm1heFdpZHRoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xhYmVsSGVpZ2h0ID0gKHRoaXMuX2xpbmVDb3VudCArIHRleHRVdGlscy5CQVNFTElORV9SQVRJTykgKiB0aGlzLmxpbmVIZWlnaHQ7XG5cbiAgICAgICAgLy8gdHJpZ2dlciBcInNpemUtY2hhbmdlZFwiIGV2ZW50XG4gICAgICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZSh0aGlzLl9sYWJlbFdpZHRoLCB0aGlzLl9sYWJlbEhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlUmljaFRleHRQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLl9sYXlvdXREaXJ0eSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBfZ2V0Rmlyc3RXb3JkTGVuICh0ZXh0LCBzdGFydEluZGV4LCB0ZXh0TGVuKSB7XG4gICAgICAgIGxldCBjaGFyYWN0ZXIgPSB0ZXh0LmNoYXJBdChzdGFydEluZGV4KTtcbiAgICAgICAgaWYgKHRleHRVdGlscy5pc1VuaWNvZGVDSksoY2hhcmFjdGVyKVxuICAgICAgICAgICAgfHwgdGV4dFV0aWxzLmlzVW5pY29kZVNwYWNlKGNoYXJhY3RlcikpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxlbiA9IDE7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gc3RhcnRJbmRleCArIDE7IGluZGV4IDwgdGV4dExlbjsgKytpbmRleCkge1xuICAgICAgICAgICAgY2hhcmFjdGVyID0gdGV4dC5jaGFyQXQoaW5kZXgpO1xuICAgICAgICAgICAgaWYgKHRleHRVdGlscy5pc1VuaWNvZGVTcGFjZShjaGFyYWN0ZXIpXG4gICAgICAgICAgICAgICAgfHwgdGV4dFV0aWxzLmlzVW5pY29kZUNKSyhjaGFyYWN0ZXIpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZW4rKztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsZW47XG4gICAgfSxcblxuICAgIF91cGRhdGVSaWNoVGV4dFBvc2l0aW9uICgpIHtcbiAgICAgICAgbGV0IG5leHRUb2tlblggPSAwO1xuICAgICAgICBsZXQgbmV4dExpbmVJbmRleCA9IDE7XG4gICAgICAgIGxldCB0b3RhbExpbmVDb3VudCA9IHRoaXMuX2xpbmVDb3VudDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9sYWJlbFNlZ21lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLl9sYWJlbFNlZ21lbnRzW2ldO1xuICAgICAgICAgICAgbGV0IGxpbmVDb3VudCA9IGxhYmVsLl9saW5lQ291bnQ7XG4gICAgICAgICAgICBpZiAobGluZUNvdW50ID4gbmV4dExpbmVJbmRleCkge1xuICAgICAgICAgICAgICAgIG5leHRUb2tlblggPSAwO1xuICAgICAgICAgICAgICAgIG5leHRMaW5lSW5kZXggPSBsaW5lQ291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbGluZU9mZnNldFggPSAwO1xuICAgICAgICAgICAgLy8gbGV0IG5vZGVBbmNob3JYT2Zmc2V0ID0gKDAuNSAtIHRoaXMubm9kZS5hbmNob3JYKSAqIHRoaXMuX2xhYmVsV2lkdGg7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuaG9yaXpvbnRhbEFsaWduKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBIb3Jpem9udGFsQWxpZ24uTEVGVDpcbiAgICAgICAgICAgICAgICAgICAgbGluZU9mZnNldFggPSAtIHRoaXMuX2xhYmVsV2lkdGggLyAyO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEhvcml6b250YWxBbGlnbi5DRU5URVI6XG4gICAgICAgICAgICAgICAgICAgIGxpbmVPZmZzZXRYID0gLSB0aGlzLl9saW5lc1dpZHRoW2xpbmVDb3VudCAtIDFdIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBIb3Jpem9udGFsQWxpZ24uUklHSFQ6XG4gICAgICAgICAgICAgICAgICAgIGxpbmVPZmZzZXRYID0gdGhpcy5fbGFiZWxXaWR0aCAvIDIgLSB0aGlzLl9saW5lc1dpZHRoW2xpbmVDb3VudCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhYmVsLnggPSBuZXh0VG9rZW5YICsgbGluZU9mZnNldFg7XG5cbiAgICAgICAgICAgIGxldCBsYWJlbFNpemUgPSBsYWJlbC5nZXRDb250ZW50U2l6ZSgpO1xuXG4gICAgICAgICAgICBsYWJlbC55ID0gdGhpcy5saW5lSGVpZ2h0ICogKHRvdGFsTGluZUNvdW50IC0gbGluZUNvdW50KSAtIHRoaXMuX2xhYmVsSGVpZ2h0IC8gMjtcblxuICAgICAgICAgICAgaWYgKGxpbmVDb3VudCA9PT0gbmV4dExpbmVJbmRleCkge1xuICAgICAgICAgICAgICAgIG5leHRUb2tlblggKz0gbGFiZWxTaXplLndpZHRoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc3ByaXRlID0gbGFiZWwuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgICAgICBpZiAoc3ByaXRlKSB7XG4gICAgICAgICAgICAgICAgLy8gYWRqdXN0IGltZyBhbGlnbiAoZnJvbSA8aW1nIGFsaWduPXRvcHxjZW50ZXJ8Ym90dG9tPilcbiAgICAgICAgICAgICAgICBsZXQgbGluZUhlaWdodFNldCA9IHRoaXMubGluZUhlaWdodDtcbiAgICAgICAgICAgICAgICBsZXQgbGluZUhlaWdodFJlYWwgPSB0aGlzLmxpbmVIZWlnaHQgKiAoMSArIHRleHRVdGlscy5CQVNFTElORV9SQVRJTyk7IC8vc2luZ2xlIGxpbmUgbm9kZSBoZWlnaHRcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGxhYmVsLmFuY2hvclkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbC55ICs9ICggbGluZUhlaWdodFNldCArICggKCBsaW5lSGVpZ2h0UmVhbCAtIGxpbmVIZWlnaHRTZXQpIC8gMiApICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwLjU6XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbC55ICs9ICggbGluZUhlaWdodFJlYWwgLyAyICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsLnkgKz0gKCAobGluZUhlaWdodFJlYWwgLSBsaW5lSGVpZ2h0U2V0KSAvIDIgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBhZGp1c3QgaW1nIG9mZnNldCAoZnJvbSA8aW1nIG9mZnNldD0xMnwxMiwzND4pXG4gICAgICAgICAgICAgICAgaWYgKGxhYmVsLl9pbWFnZU9mZnNldClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRzID0gbGFiZWwuX2ltYWdlT2Zmc2V0LnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXRzLmxlbmd0aCA9PT0gMSAmJiBvZmZzZXRzWzBdKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0WSA9IHBhcnNlRmxvYXQob2Zmc2V0c1swXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihvZmZzZXRZKSkgbGFiZWwueSArPSBvZmZzZXRZO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYob2Zmc2V0cy5sZW5ndGggPT09IDIpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRYID0gcGFyc2VGbG9hdChvZmZzZXRzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRZID0gcGFyc2VGbG9hdChvZmZzZXRzWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKG9mZnNldFgpKSBsYWJlbC54ICs9IG9mZnNldFg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihvZmZzZXRZKSkgbGFiZWwueSArPSBvZmZzZXRZO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2FkanVzdCB5IGZvciBsYWJlbCB3aXRoIG91dGxpbmVcbiAgICAgICAgICAgIGxldCBvdXRsaW5lID0gbGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSk7XG4gICAgICAgICAgICBpZiAob3V0bGluZSAmJiBvdXRsaW5lLndpZHRoKSBsYWJlbC55ID0gbGFiZWwueSAtIG91dGxpbmUud2lkdGg7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2NvbnZlcnRMaXRlcmFsQ29sb3JWYWx1ZSAoY29sb3IpIHtcbiAgICAgICAgbGV0IGNvbG9yVmFsdWUgPSBjb2xvci50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBpZiAoY2MuQ29sb3JbY29sb3JWYWx1ZV0pIHtcbiAgICAgICAgICAgIHJldHVybiBjYy5Db2xvcltjb2xvclZhbHVlXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBvdXQgPSBjYy5jb2xvcigpO1xuICAgICAgICAgICAgcmV0dXJuIG91dC5mcm9tSEVYKGNvbG9yKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBXaGVuIHN0cmluZyBpcyBudWxsLCBpdCBtZWFucyB0aGF0IHRoZSB0ZXh0IGRvZXMgbm90IG5lZWQgdG8gYmUgdXBkYXRlZC5cbiAgICBfYXBwbHlUZXh0QXR0cmlidXRlIChsYWJlbE5vZGUsIHN0cmluZywgZm9yY2UpIHtcbiAgICAgICAgbGV0IGxhYmVsQ29tcG9uZW50ID0gbGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIGlmICghbGFiZWxDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleCA9IGxhYmVsTm9kZS5fc3R5bGVJbmRleDtcblxuICAgICAgICBsZXQgdGV4dFN0eWxlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX3RleHRBcnJheVtpbmRleF0pIHtcbiAgICAgICAgICAgIHRleHRTdHlsZSA9IHRoaXMuX3RleHRBcnJheVtpbmRleF0uc3R5bGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGV4dFN0eWxlICYmIHRleHRTdHlsZS5jb2xvcikge1xuICAgICAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gdGhpcy5fY29udmVydExpdGVyYWxDb2xvclZhbHVlKHRleHRTdHlsZS5jb2xvcik7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IHRoaXMubm9kZS5jb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxhYmVsQ29tcG9uZW50LmNhY2hlTW9kZSA9IHRoaXMuY2FjaGVNb2RlO1xuXG4gICAgICAgIGxldCBpc0Fzc2V0ID0gdGhpcy5mb250IGluc3RhbmNlb2YgY2MuRm9udDtcbiAgICAgICAgaWYgKGlzQXNzZXQgJiYgIXRoaXMuX2lzU3lzdGVtRm9udFVzZWQpIHtcbiAgICAgICAgICAgIGxhYmVsQ29tcG9uZW50LmZvbnQgPSB0aGlzLmZvbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYWJlbENvbXBvbmVudC5mb250RmFtaWx5ID0gdGhpcy5mb250RmFtaWx5O1xuICAgICAgICB9XG5cbiAgICAgICAgbGFiZWxDb21wb25lbnQudXNlU3lzdGVtRm9udCA9IHRoaXMuX2lzU3lzdGVtRm9udFVzZWQ7XG4gICAgICAgIGxhYmVsQ29tcG9uZW50LmxpbmVIZWlnaHQgPSB0aGlzLmxpbmVIZWlnaHQ7XG4gICAgICAgIGxhYmVsQ29tcG9uZW50LmVuYWJsZUJvbGQgPSB0ZXh0U3R5bGUgJiYgdGV4dFN0eWxlLmJvbGQ7XG4gICAgICAgIGxhYmVsQ29tcG9uZW50LmVuYWJsZUl0YWxpY3MgPSB0ZXh0U3R5bGUgJiYgdGV4dFN0eWxlLml0YWxpYztcbiAgICAgICAgLy9UT0RPOiB0ZW1wb3JhcnkgaW1wbGVtZW50YXRpb24sIHRoZSBpdGFsaWMgZWZmZWN0IHNob3VsZCBiZSBpbXBsZW1lbnRlZCBpbiB0aGUgaW50ZXJuYWwgb2YgbGFiZWwtYXNzZW1ibGVyLlxuICAgICAgICBpZiAodGV4dFN0eWxlICYmIHRleHRTdHlsZS5pdGFsaWMpIHtcbiAgICAgICAgICAgIGxhYmVsTm9kZS5za2V3WCA9IDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgbGFiZWxDb21wb25lbnQuZW5hYmxlVW5kZXJsaW5lID0gdGV4dFN0eWxlICYmIHRleHRTdHlsZS51bmRlcmxpbmU7XG5cbiAgICAgICAgaWYgKHRleHRTdHlsZSAmJiB0ZXh0U3R5bGUub3V0bGluZSkge1xuICAgICAgICAgICAgbGV0IGxhYmVsT3V0bGluZUNvbXBvbmVudCA9IGxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKTtcbiAgICAgICAgICAgIGlmICghbGFiZWxPdXRsaW5lQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgbGFiZWxPdXRsaW5lQ29tcG9uZW50ID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFiZWxPdXRsaW5lQ29tcG9uZW50LmNvbG9yID0gdGhpcy5fY29udmVydExpdGVyYWxDb2xvclZhbHVlKHRleHRTdHlsZS5vdXRsaW5lLmNvbG9yKTtcbiAgICAgICAgICAgIGxhYmVsT3V0bGluZUNvbXBvbmVudC53aWR0aCA9IHRleHRTdHlsZS5vdXRsaW5lLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRleHRTdHlsZSAmJiB0ZXh0U3R5bGUuc2l6ZSkge1xuICAgICAgICAgICAgbGFiZWxDb21wb25lbnQuZm9udFNpemUgPSB0ZXh0U3R5bGUuc2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxhYmVsQ29tcG9uZW50LmZvbnRTaXplID0gdGhpcy5mb250U2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHJpbmcgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHN0cmluZyA9ICcnICsgc3RyaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFiZWxDb21wb25lbnQuc3RyaW5nID0gc3RyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yY2UgJiYgbGFiZWxDb21wb25lbnQuX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSgpO1xuXG4gICAgICAgIGlmICh0ZXh0U3R5bGUgJiYgdGV4dFN0eWxlLmV2ZW50KSB7XG4gICAgICAgICAgICBpZiAodGV4dFN0eWxlLmV2ZW50LmNsaWNrKSB7XG4gICAgICAgICAgICAgICAgbGFiZWxOb2RlLl9jbGlja0hhbmRsZXIgPSB0ZXh0U3R5bGUuZXZlbnQuY2xpY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGV4dFN0eWxlLmV2ZW50LnBhcmFtKSB7XG4gICAgICAgICAgICAgICAgbGFiZWxOb2RlLl9jbGlja1BhcmFtID0gdGV4dFN0eWxlLmV2ZW50LnBhcmFtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGFiZWxOb2RlLl9jbGlja1BhcmFtID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsYWJlbE5vZGUuX2NsaWNrSGFuZGxlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25EZXN0cm95ICgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9sYWJlbFNlZ21lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbFNlZ21lbnRzW2ldLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgICAgIHBvb2wucHV0KHRoaXMuX2xhYmVsU2VnbWVudHNbaV0pO1xuICAgICAgICB9XG4gICAgfSxcbn0pO1xuXG5jYy5SaWNoVGV4dCA9IG1vZHVsZS5leHBvcnRzID0gUmljaFRleHQ7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==