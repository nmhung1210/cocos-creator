
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCLabel.js';
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
var macro = require('../platform/CCMacro');

var RenderComponent = require('./CCRenderComponent');

var Material = require('../assets/material/CCMaterial');

var LabelFrame = require('../renderer/utils/label/label-frame');

var BlendFunc = require('../utils/blend-func');
/**
 * !#en Enum for text alignment.
 * !#zh 文本横向对齐类型
 * @enum Label.HorizontalAlign
 */

/**
 * !#en Alignment left for text.
 * !#zh 文本内容左对齐。
 * @property {Number} LEFT
 */

/**
 * !#en Alignment center for text.
 * !#zh 文本内容居中对齐。
 * @property {Number} CENTER
 */

/**
 * !#en Alignment right for text.
 * !#zh 文本内容右边对齐。
 * @property {Number} RIGHT
 */


var HorizontalAlign = macro.TextAlignment;
/**
 * !#en Enum for vertical text alignment.
 * !#zh 文本垂直对齐类型
 * @enum Label.VerticalAlign
 */

/**
 * !#en Vertical alignment top for text.
 * !#zh 文本顶部对齐。
 * @property {Number} TOP
 */

/**
 * !#en Vertical alignment center for text.
 * !#zh 文本居中对齐。
 * @property {Number} CENTER
 */

/**
 * !#en Vertical alignment bottom for text.
 * !#zh 文本底部对齐。
 * @property {Number} BOTTOM
 */

var VerticalAlign = macro.VerticalTextAlignment;
/**
 * !#en Enum for Overflow.
 * !#zh Overflow 类型
 * @enum Label.Overflow
 */

/**
 * !#en NONE.
 * !#zh 不做任何限制。
 * @property {Number} NONE
 */

/**
 * !#en In CLAMP mode, when label content goes out of the bounding box, it will be clipped.
 * !#zh CLAMP 模式中，当文本内容超出边界框时，多余的会被截断。
 * @property {Number} CLAMP
 */

/**
 * !#en In SHRINK mode, the font size will change dynamically to adapt the content size. This mode may takes up more CPU resources when the label is refreshed.
 * !#zh SHRINK 模式，字体大小会动态变化，以适应内容大小。这个模式在文本刷新的时候可能会占用较多 CPU 资源。
 * @property {Number} SHRINK
 */

/**
 * !#en In RESIZE_HEIGHT mode, you can only change the width of label and the height is changed automatically.
 * !#zh 在 RESIZE_HEIGHT 模式下，只能更改文本的宽度，高度是自动改变的。
 * @property {Number} RESIZE_HEIGHT
 */

var Overflow = cc.Enum({
  NONE: 0,
  CLAMP: 1,
  SHRINK: 2,
  RESIZE_HEIGHT: 3
});
/**
 * !#en Enum for font type.
 * !#zh Type 类型
 * @enum Label.Type
 */

/**
 * !#en The TTF font type.
 * !#zh TTF字体
 * @property {Number} TTF
 */

/**
 * !#en The bitmap font type.
 * !#zh 位图字体
 * @property {Number} BMFont
 */

/**
 * !#en The system font type.
 * !#zh 系统字体
 * @property {Number} SystemFont
 */

/**
 * !#en Enum for cache mode.
 * !#zh CacheMode 类型
 * @enum Label.CacheMode
 */

/**
* !#en Do not do any caching.
* !#zh 不做任何缓存。
* @property {Number} NONE
*/

/**
 * !#en In BITMAP mode, cache the label as a static image and add it to the dynamic atlas for batch rendering, and can batching with Sprites using broken images.
 * !#zh BITMAP 模式，将 label 缓存成静态图像并加入到动态图集，以便进行批次合并，可与使用碎图的 Sprite 进行合批（注：动态图集在 Chrome 以及微信小游戏暂时关闭，该功能无效）。
 * @property {Number} BITMAP
 */

/**
 * !#en In CHAR mode, split text into characters and cache characters into a dynamic atlas which the size of 2048*2048. 
 * !#zh CHAR 模式，将文本拆分为字符，并将字符缓存到一张单独的大小为 2048*2048 的图集中进行重复使用，不再使用动态图集（注：当图集满时将不再进行缓存，暂时不支持 SHRINK 自适应文本尺寸（后续完善））。
 * @property {Number} CHAR
 */

var CacheMode = cc.Enum({
  NONE: 0,
  BITMAP: 1,
  CHAR: 2
});
var BOLD_FLAG = 1 << 0;
var ITALIC_FLAG = 1 << 1;
var UNDERLINE_FLAG = 1 << 2;
/**
 * !#en The Label Component.
 * !#zh 文字标签组件
 * @class Label
 * @extends RenderComponent
 */

var Label = cc.Class({
  name: 'cc.Label',
  "extends": RenderComponent,
  mixins: [BlendFunc],
  ctor: function ctor() {
    if (CC_EDITOR) {
      this._userDefinedFont = null;
    }

    this._actualFontSize = 0;
    this._assemblerData = null;
    this._frame = null;
    this._ttfTexture = null;
    this._letterTexture = null;

    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
      this._updateMaterial = this._updateMaterialCanvas;
    } else {
      this._updateMaterial = this._updateMaterialWebgl;
    }
  },
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/Label',
    help: 'i18n:COMPONENT.help_url.label',
    inspector: 'packages://inspector/inspectors/comps/label.js'
  },
  properties: {
    _useOriginalSize: true,

    /**
     * !#en Content string of label.
     * !#zh 标签显示的文本内容。
     * @property {String} string
     */
    _string: {
      "default": '',
      formerlySerializedAs: '_N$string'
    },
    string: {
      get: function get() {
        return this._string;
      },
      set: function set(value) {
        var oldValue = this._string;
        this._string = '' + value;

        if (this.string !== oldValue) {
          this.setVertsDirty();
        }

        this._checkStringEmpty();
      },
      multiline: true,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.string'
    },

    /**
     * !#en Horizontal Alignment of label.
     * !#zh 文本内容的水平对齐方式。
     * @property {Label.HorizontalAlign} horizontalAlign
     */
    horizontalAlign: {
      "default": HorizontalAlign.LEFT,
      type: HorizontalAlign,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.horizontal_align',
      notify: function notify(oldValue) {
        if (this.horizontalAlign === oldValue) return;
        this.setVertsDirty();
      },
      animatable: false
    },

    /**
     * !#en Vertical Alignment of label.
     * !#zh 文本内容的垂直对齐方式。
     * @property {Label.VerticalAlign} verticalAlign
     */
    verticalAlign: {
      "default": VerticalAlign.TOP,
      type: VerticalAlign,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.vertical_align',
      notify: function notify(oldValue) {
        if (this.verticalAlign === oldValue) return;
        this.setVertsDirty();
      },
      animatable: false
    },

    /**
     * !#en The actual rendering font size in shrink mode
     * !#zh SHRINK 模式下面文本实际渲染的字体大小
     * @property {Number} actualFontSize
     */
    actualFontSize: {
      displayName: 'Actual Font Size',
      animatable: false,
      readonly: true,
      get: function get() {
        return this._actualFontSize;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.label.actualFontSize'
    },
    _fontSize: 40,

    /**
     * !#en Font size of label.
     * !#zh 文本字体大小。
     * @property {Number} fontSize
     */
    fontSize: {
      get: function get() {
        return this._fontSize;
      },
      set: function set(value) {
        if (this._fontSize === value) return;
        this._fontSize = value;
        this.setVertsDirty();
      },
      range: [0, 512],
      tooltip: CC_DEV && 'i18n:COMPONENT.label.font_size'
    },

    /**
     * !#en Font family of label, only take effect when useSystemFont property is true.
     * !#zh 文本字体名称, 只在 useSystemFont 属性为 true 的时候生效。
     * @property {String} fontFamily
     */
    fontFamily: {
      "default": "Arial",
      tooltip: CC_DEV && 'i18n:COMPONENT.label.font_family',
      notify: function notify(oldValue) {
        if (this.fontFamily === oldValue) return;
        this.setVertsDirty();
      },
      animatable: false
    },
    _lineHeight: 40,

    /**
     * !#en Line Height of label.
     * !#zh 文本行高。
     * @property {Number} lineHeight
     */
    lineHeight: {
      get: function get() {
        return this._lineHeight;
      },
      set: function set(value) {
        if (this._lineHeight === value) return;
        this._lineHeight = value;
        this.setVertsDirty();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.label.line_height'
    },

    /**
     * !#en Overflow of label.
     * !#zh 文字显示超出范围时的处理方式。
     * @property {Label.Overflow} overflow
     */
    overflow: {
      "default": Overflow.NONE,
      type: Overflow,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.overflow',
      notify: function notify(oldValue) {
        if (this.overflow === oldValue) return;
        this.setVertsDirty();
      },
      animatable: false
    },
    _enableWrapText: true,

    /**
     * !#en Whether auto wrap label when string width is large than label width.
     * !#zh 是否自动换行。
     * @property {Boolean} enableWrapText
     */
    enableWrapText: {
      get: function get() {
        return this._enableWrapText;
      },
      set: function set(value) {
        if (this._enableWrapText === value) return;
        this._enableWrapText = value;
        this.setVertsDirty();
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.wrap'
    },
    // 这个保存了旧项目的 file 数据
    _N$file: null,

    /**
     * !#en The font of label.
     * !#zh 文本字体。
     * @property {Font} font
     */
    font: {
      get: function get() {
        return this._N$file;
      },
      set: function set(value) {
        if (this.font === value) return; //if delete the font, we should change isSystemFontUsed to true

        if (!value) {
          this._isSystemFontUsed = true;
        }

        if (CC_EDITOR && value) {
          this._userDefinedFont = value;
        }

        this._N$file = value;
        if (value && this._isSystemFontUsed) this._isSystemFontUsed = false;
        if (!this.enabledInHierarchy) return;

        this._forceUpdateRenderData();
      },
      type: cc.Font,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.font',
      animatable: false
    },
    _isSystemFontUsed: true,

    /**
     * !#en Whether use system font name or not.
     * !#zh 是否使用系统字体。
     * @property {Boolean} useSystemFont
     */
    useSystemFont: {
      get: function get() {
        return this._isSystemFontUsed;
      },
      set: function set(value) {
        if (this._isSystemFontUsed === value) return;
        this._isSystemFontUsed = !!value;

        if (CC_EDITOR) {
          if (!value && this._userDefinedFont) {
            this.font = this._userDefinedFont;
            this.spacingX = this._spacingX;
            return;
          }
        }

        if (value) {
          this.font = null;
          if (!this.enabledInHierarchy) return;

          this._forceUpdateRenderData();
        }

        this.markForValidate();
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.system_font'
    },
    _bmFontOriginalSize: {
      displayName: 'BMFont Original Size',
      get: function get() {
        if (this._N$file instanceof cc.BitmapFont) {
          return this._N$file.fontSize;
        } else {
          return -1;
        }
      },
      visible: true,
      animatable: false
    },
    _spacingX: 0,

    /**
     * !#en The spacing of the x axis between characters, only take Effect when using bitmap fonts.
     * !#zh 文字之间 x 轴的间距，仅在使用位图字体时生效。
     * @property {Number} spacingX
     */
    spacingX: {
      get: function get() {
        return this._spacingX;
      },
      set: function set(value) {
        this._spacingX = value;
        this.setVertsDirty();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.label.spacingX'
    },
    //For compatibility with v2.0.x temporary reservation.
    _batchAsBitmap: false,

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

        if (oldValue === CacheMode.BITMAP && !(this.font instanceof cc.BitmapFont)) {
          this._frame && this._frame._resetDynamicAtlasFrame();
        }

        if (oldValue === CacheMode.CHAR) {
          this._ttfTexture = null;
        }

        if (!this.enabledInHierarchy) return;

        this._forceUpdateRenderData();
      },
      animatable: false
    },
    _styleFlags: 0,

    /**
     * !#en Whether enable bold.
     * !#zh 是否启用黑体。
     * @property {Boolean} enableBold
     */
    enableBold: {
      get: function get() {
        return !!(this._styleFlags & BOLD_FLAG);
      },
      set: function set(value) {
        if (value) {
          this._styleFlags |= BOLD_FLAG;
        } else {
          this._styleFlags &= ~BOLD_FLAG;
        }

        this.setVertsDirty();
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.bold'
    },

    /**
     * !#en Whether enable italic.
     * !#zh 是否启用黑体。
     * @property {Boolean} enableItalic
     */
    enableItalic: {
      get: function get() {
        return !!(this._styleFlags & ITALIC_FLAG);
      },
      set: function set(value) {
        if (value) {
          this._styleFlags |= ITALIC_FLAG;
        } else {
          this._styleFlags &= ~ITALIC_FLAG;
        }

        this.setVertsDirty();
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.italic'
    },

    /**
     * !#en Whether enable underline.
     * !#zh 是否启用下划线。
     * @property {Boolean} enableUnderline
     */
    enableUnderline: {
      get: function get() {
        return !!(this._styleFlags & UNDERLINE_FLAG);
      },
      set: function set(value) {
        if (value) {
          this._styleFlags |= UNDERLINE_FLAG;
        } else {
          this._styleFlags &= ~UNDERLINE_FLAG;
        }

        this.setVertsDirty();
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.underline'
    },
    _underlineHeight: 0,

    /**
     * !#en The height of underline.
     * !#zh 下划线高度。
     * @property {Number} underlineHeight
     */
    underlineHeight: {
      get: function get() {
        return this._underlineHeight;
      },
      set: function set(value) {
        if (this._underlineHeight === value) return;
        this._underlineHeight = value;
        this.setVertsDirty();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.label.underline_height'
    }
  },
  statics: {
    HorizontalAlign: HorizontalAlign,
    VerticalAlign: VerticalAlign,
    Overflow: Overflow,
    CacheMode: CacheMode,
    _shareAtlas: null,

    /**
     * !#zh 需要保证当前场景中没有使用CHAR缓存的Label才可以清除，否则已渲染的文字没有重新绘制会不显示
     * !#en It can be cleared that need to ensure there is not use the CHAR cache in the current scene. Otherwise, the rendered text will not be displayed without repainting.
     * @method clearCharCache
     * @static
     */
    clearCharCache: function clearCharCache() {
      if (Label._shareAtlas) {
        Label._shareAtlas.clearAllCache();
      }
    }
  },
  onLoad: function onLoad() {
    // For compatibility with v2.0.x temporary reservation.
    if (this._batchAsBitmap && this.cacheMode === CacheMode.NONE) {
      this.cacheMode = CacheMode.BITMAP;
      this._batchAsBitmap = false;
    }

    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
      // CacheMode is not supported in Canvas.
      this.cacheMode = CacheMode.NONE;
    }
  },
  onEnable: function onEnable() {
    this._super(); // Keep track of Node size


    this.node.on(cc.Node.EventType.SIZE_CHANGED, this._nodeSizeChanged, this);
    this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);

    this._forceUpdateRenderData();
  },
  onDisable: function onDisable() {
    this._super();

    this.node.off(cc.Node.EventType.SIZE_CHANGED, this._nodeSizeChanged, this);
    this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
  },
  onDestroy: function onDestroy() {
    this._assembler && this._assembler._resetAssemblerData && this._assembler._resetAssemblerData(this._assemblerData);
    this._assemblerData = null;
    this._letterTexture = null;

    if (this._ttfTexture) {
      this._ttfTexture.destroy();

      this._ttfTexture = null;
    }

    this._super();
  },
  _nodeSizeChanged: function _nodeSizeChanged() {
    // Because the content size is automatically updated when overflow is NONE.
    // And this will conflict with the alignment of the CCWidget.
    if (CC_EDITOR || this.overflow !== Overflow.NONE) {
      this.setVertsDirty();
    }
  },
  setVertsDirty: function setVertsDirty() {
    if (CC_JSB && this._nativeTTF()) {
      this._assembler && this._assembler.updateRenderData(this);
    }

    this._super();
  },
  _updateColor: function _updateColor() {
    if (!(this.font instanceof cc.BitmapFont)) {
      if (!(this._srcBlendFactor === cc.macro.BlendFactor.SRC_ALPHA && this.node._renderFlag & cc.RenderFlow.FLAG_OPACITY)) {
        this.setVertsDirty();
      }
    }

    RenderComponent.prototype._updateColor.call(this);
  },
  _validateRender: function _validateRender() {
    if (!this.string) {
      this.disableRender();
      return;
    }

    if (this._materials[0]) {
      var font = this.font;

      if (font instanceof cc.BitmapFont) {
        var spriteFrame = font.spriteFrame;

        if (spriteFrame && spriteFrame.textureLoaded() && font._fntConfig) {
          return;
        }
      } else {
        return;
      }
    }

    this.disableRender();
  },
  _resetAssembler: function _resetAssembler() {
    this._frame = null;

    RenderComponent.prototype._resetAssembler.call(this);
  },
  _checkStringEmpty: function _checkStringEmpty() {
    this.markForRender(!!this.string);
  },
  _on3DNodeChanged: function _on3DNodeChanged() {
    this._resetAssembler();

    this._applyFontTexture();
  },
  _onBMFontTextureLoaded: function _onBMFontTextureLoaded() {
    this._frame._texture = this.font.spriteFrame._texture;
    this.markForRender(true);

    this._updateMaterial();

    this._assembler && this._assembler.updateRenderData(this);
  },
  _onBlendChanged: function _onBlendChanged() {
    if (!this.useSystemFont || !this.enabledInHierarchy) return;

    this._forceUpdateRenderData();
  },
  _applyFontTexture: function _applyFontTexture() {
    var font = this.font;

    if (font instanceof cc.BitmapFont) {
      var spriteFrame = font.spriteFrame;
      this._frame = spriteFrame;

      if (spriteFrame) {
        spriteFrame.onTextureLoaded(this._onBMFontTextureLoaded, this);
      }
    } else {
      if (!this._nativeTTF()) {
        if (!this._frame) {
          this._frame = new LabelFrame();
        }

        if (this.cacheMode === CacheMode.CHAR) {
          this._letterTexture = this._assembler._getAssemblerData();

          this._frame._refreshTexture(this._letterTexture);
        } else if (!this._ttfTexture) {
          this._ttfTexture = new cc.Texture2D();
          this._assemblerData = this._assembler._getAssemblerData();

          this._ttfTexture.initWithElement(this._assemblerData.canvas);
        }

        if (this.cacheMode !== CacheMode.CHAR) {
          this._frame._resetDynamicAtlasFrame();

          this._frame._refreshTexture(this._ttfTexture);

          if (this._srcBlendFactor === cc.macro.BlendFactor.ONE && !CC_NATIVERENDERER) {
            this._ttfTexture.setPremultiplyAlpha(true);
          }
        }

        this._updateMaterial();
      }

      this._assembler && this._assembler.updateRenderData(this);
    }

    this.markForValidate();
  },
  _updateMaterialCanvas: function _updateMaterialCanvas() {
    if (!this._frame) return;
    this._frame._texture._nativeUrl = this.uuid + '_texture';
  },
  _updateMaterialWebgl: function _updateMaterialWebgl() {
    var material = this.getMaterial(0);

    if (this._nativeTTF()) {
      if (material) this._assembler._updateTTFMaterial(this);
      return;
    }

    if (!this._frame) return;
    material && material.setProperty('texture', this._frame._texture);

    BlendFunc.prototype._updateMaterial.call(this);
  },
  _forceUseCanvas: false,
  _nativeTTF: function _nativeTTF() {
    return !this._forceUseCanvas && !!this._assembler && !!this._assembler._updateTTFMaterial;
  },
  _forceUpdateRenderData: function _forceUpdateRenderData() {
    this.setVertsDirty();

    this._resetAssembler();

    this._applyFontTexture();
  },

  /**
   * @deprecated `label._enableBold` is deprecated, use `label.enableBold = true` instead please.
   */
  _enableBold: function _enableBold(enabled) {
    if (CC_DEBUG) {
      cc.warn('`label._enableBold` is deprecated, use `label.enableBold = true` instead please');
    }

    this.enableBold = !!enabled;
  },

  /**
   * @deprecated `label._enableItalics` is deprecated, use `label.enableItalics = true` instead please.
   */
  _enableItalics: function _enableItalics(enabled) {
    if (CC_DEBUG) {
      cc.warn('`label._enableItalics` is deprecated, use `label.enableItalics = true` instead please');
    }

    this.enableItalic = !!enabled;
  },

  /**
   * @deprecated `label._enableUnderline` is deprecated, use `label.enableUnderline = true` instead please.
   */
  _enableUnderline: function _enableUnderline(enabled) {
    if (CC_DEBUG) {
      cc.warn('`label._enableUnderline` is deprecated, use `label.enableUnderline = true` instead please');
    }

    this.enableUnderline = !!enabled;
  }
});
cc.Label = module.exports = Label;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NMYWJlbC5qcyJdLCJuYW1lcyI6WyJtYWNybyIsInJlcXVpcmUiLCJSZW5kZXJDb21wb25lbnQiLCJNYXRlcmlhbCIsIkxhYmVsRnJhbWUiLCJCbGVuZEZ1bmMiLCJIb3Jpem9udGFsQWxpZ24iLCJUZXh0QWxpZ25tZW50IiwiVmVydGljYWxBbGlnbiIsIlZlcnRpY2FsVGV4dEFsaWdubWVudCIsIk92ZXJmbG93IiwiY2MiLCJFbnVtIiwiTk9ORSIsIkNMQU1QIiwiU0hSSU5LIiwiUkVTSVpFX0hFSUdIVCIsIkNhY2hlTW9kZSIsIkJJVE1BUCIsIkNIQVIiLCJCT0xEX0ZMQUciLCJJVEFMSUNfRkxBRyIsIlVOREVSTElORV9GTEFHIiwiTGFiZWwiLCJDbGFzcyIsIm5hbWUiLCJtaXhpbnMiLCJjdG9yIiwiQ0NfRURJVE9SIiwiX3VzZXJEZWZpbmVkRm9udCIsIl9hY3R1YWxGb250U2l6ZSIsIl9hc3NlbWJsZXJEYXRhIiwiX2ZyYW1lIiwiX3R0ZlRleHR1cmUiLCJfbGV0dGVyVGV4dHVyZSIsImdhbWUiLCJyZW5kZXJUeXBlIiwiUkVOREVSX1RZUEVfQ0FOVkFTIiwiX3VwZGF0ZU1hdGVyaWFsIiwiX3VwZGF0ZU1hdGVyaWFsQ2FudmFzIiwiX3VwZGF0ZU1hdGVyaWFsV2ViZ2wiLCJlZGl0b3IiLCJtZW51IiwiaGVscCIsImluc3BlY3RvciIsInByb3BlcnRpZXMiLCJfdXNlT3JpZ2luYWxTaXplIiwiX3N0cmluZyIsImZvcm1lcmx5U2VyaWFsaXplZEFzIiwic3RyaW5nIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJvbGRWYWx1ZSIsInNldFZlcnRzRGlydHkiLCJfY2hlY2tTdHJpbmdFbXB0eSIsIm11bHRpbGluZSIsInRvb2x0aXAiLCJDQ19ERVYiLCJob3Jpem9udGFsQWxpZ24iLCJMRUZUIiwidHlwZSIsIm5vdGlmeSIsImFuaW1hdGFibGUiLCJ2ZXJ0aWNhbEFsaWduIiwiVE9QIiwiYWN0dWFsRm9udFNpemUiLCJkaXNwbGF5TmFtZSIsInJlYWRvbmx5IiwiX2ZvbnRTaXplIiwiZm9udFNpemUiLCJyYW5nZSIsImZvbnRGYW1pbHkiLCJfbGluZUhlaWdodCIsImxpbmVIZWlnaHQiLCJvdmVyZmxvdyIsIl9lbmFibGVXcmFwVGV4dCIsImVuYWJsZVdyYXBUZXh0IiwiX04kZmlsZSIsImZvbnQiLCJfaXNTeXN0ZW1Gb250VXNlZCIsImVuYWJsZWRJbkhpZXJhcmNoeSIsIl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEiLCJGb250IiwidXNlU3lzdGVtRm9udCIsInNwYWNpbmdYIiwiX3NwYWNpbmdYIiwibWFya0ZvclZhbGlkYXRlIiwiX2JtRm9udE9yaWdpbmFsU2l6ZSIsIkJpdG1hcEZvbnQiLCJ2aXNpYmxlIiwiX2JhdGNoQXNCaXRtYXAiLCJjYWNoZU1vZGUiLCJfcmVzZXREeW5hbWljQXRsYXNGcmFtZSIsIl9zdHlsZUZsYWdzIiwiZW5hYmxlQm9sZCIsImVuYWJsZUl0YWxpYyIsImVuYWJsZVVuZGVybGluZSIsIl91bmRlcmxpbmVIZWlnaHQiLCJ1bmRlcmxpbmVIZWlnaHQiLCJzdGF0aWNzIiwiX3NoYXJlQXRsYXMiLCJjbGVhckNoYXJDYWNoZSIsImNsZWFyQWxsQ2FjaGUiLCJvbkxvYWQiLCJvbkVuYWJsZSIsIl9zdXBlciIsIm5vZGUiLCJvbiIsIk5vZGUiLCJFdmVudFR5cGUiLCJTSVpFX0NIQU5HRUQiLCJfbm9kZVNpemVDaGFuZ2VkIiwiQU5DSE9SX0NIQU5HRUQiLCJvbkRpc2FibGUiLCJvZmYiLCJvbkRlc3Ryb3kiLCJfYXNzZW1ibGVyIiwiX3Jlc2V0QXNzZW1ibGVyRGF0YSIsImRlc3Ryb3kiLCJDQ19KU0IiLCJfbmF0aXZlVFRGIiwidXBkYXRlUmVuZGVyRGF0YSIsIl91cGRhdGVDb2xvciIsIl9zcmNCbGVuZEZhY3RvciIsIkJsZW5kRmFjdG9yIiwiU1JDX0FMUEhBIiwiX3JlbmRlckZsYWciLCJSZW5kZXJGbG93IiwiRkxBR19PUEFDSVRZIiwicHJvdG90eXBlIiwiY2FsbCIsIl92YWxpZGF0ZVJlbmRlciIsImRpc2FibGVSZW5kZXIiLCJfbWF0ZXJpYWxzIiwic3ByaXRlRnJhbWUiLCJ0ZXh0dXJlTG9hZGVkIiwiX2ZudENvbmZpZyIsIl9yZXNldEFzc2VtYmxlciIsIm1hcmtGb3JSZW5kZXIiLCJfb24zRE5vZGVDaGFuZ2VkIiwiX2FwcGx5Rm9udFRleHR1cmUiLCJfb25CTUZvbnRUZXh0dXJlTG9hZGVkIiwiX3RleHR1cmUiLCJfb25CbGVuZENoYW5nZWQiLCJvblRleHR1cmVMb2FkZWQiLCJfZ2V0QXNzZW1ibGVyRGF0YSIsIl9yZWZyZXNoVGV4dHVyZSIsIlRleHR1cmUyRCIsImluaXRXaXRoRWxlbWVudCIsImNhbnZhcyIsIk9ORSIsIkNDX05BVElWRVJFTkRFUkVSIiwic2V0UHJlbXVsdGlwbHlBbHBoYSIsIl9uYXRpdmVVcmwiLCJ1dWlkIiwibWF0ZXJpYWwiLCJnZXRNYXRlcmlhbCIsIl91cGRhdGVUVEZNYXRlcmlhbCIsInNldFByb3BlcnR5IiwiX2ZvcmNlVXNlQ2FudmFzIiwiX2VuYWJsZUJvbGQiLCJlbmFibGVkIiwiQ0NfREVCVUciLCJ3YXJuIiwiX2VuYWJsZUl0YWxpY3MiLCJfZW5hYmxlVW5kZXJsaW5lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLHFCQUFELENBQXJCOztBQUNBLElBQU1DLGVBQWUsR0FBR0QsT0FBTyxDQUFDLHFCQUFELENBQS9COztBQUNBLElBQU1FLFFBQVEsR0FBR0YsT0FBTyxDQUFDLCtCQUFELENBQXhCOztBQUNBLElBQU1HLFVBQVUsR0FBR0gsT0FBTyxDQUFDLHFDQUFELENBQTFCOztBQUNBLElBQU1JLFNBQVMsR0FBR0osT0FBTyxDQUFDLHFCQUFELENBQXpCO0FBRUE7Ozs7OztBQUtBOzs7Ozs7QUFLQTs7Ozs7O0FBS0E7Ozs7Ozs7QUFLQSxJQUFNSyxlQUFlLEdBQUdO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QUFRLDJGQUFSO0FBQ0g7O0FBQ0QsU0FBS25FLGVBQUwsR0FBdUIsQ0FBQyxDQUFDaUUsT0FBekI7QUFDSDtBQTFvQmdCLENBQVQsQ0FBWjtBQTZvQkN2SixFQUFFLENBQUNZLEtBQUgsR0FBV2dKLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmpKLEtBQTVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBtYWNybyA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL0NDTWFjcm8nKTtcbmNvbnN0IFJlbmRlckNvbXBvbmVudCA9IHJlcXVpcmUoJy4vQ0NSZW5kZXJDb21wb25lbnQnKTtcbmNvbnN0IE1hdGVyaWFsID0gcmVxdWlyZSgnLi4vYXNzZXRzL21hdGVyaWFsL0NDTWF0ZXJpYWwnKTtcbmNvbnN0IExhYmVsRnJhbWUgPSByZXF1aXJlKCcuLi9yZW5kZXJlci91dGlscy9sYWJlbC9sYWJlbC1mcmFtZScpO1xuY29uc3QgQmxlbmRGdW5jID0gcmVxdWlyZSgnLi4vdXRpbHMvYmxlbmQtZnVuYycpO1xuXG4vKipcbiAqICEjZW4gRW51bSBmb3IgdGV4dCBhbGlnbm1lbnQuXG4gKiAhI3poIOaWh+acrOaoquWQkeWvuem9kOexu+Wei1xuICogQGVudW0gTGFiZWwuSG9yaXpvbnRhbEFsaWduXG4gKi9cbi8qKlxuICogISNlbiBBbGlnbm1lbnQgbGVmdCBmb3IgdGV4dC5cbiAqICEjemgg5paH5pys5YaF5a655bem5a+56b2Q44CCXG4gKiBAcHJvcGVydHkge051bWJlcn0gTEVGVFxuICovXG4vKipcbiAqICEjZW4gQWxpZ25tZW50IGNlbnRlciBmb3IgdGV4dC5cbiAqICEjemgg5paH5pys5YaF5a655bGF5Lit5a+56b2Q44CCXG4gKiBAcHJvcGVydHkge051bWJlcn0gQ0VOVEVSXG4gKi9cbi8qKlxuICogISNlbiBBbGlnbm1lbnQgcmlnaHQgZm9yIHRleHQuXG4gKiAhI3poIOaWh+acrOWGheWuueWPs+i+ueWvuem9kOOAglxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFJJR0hUXG4gKi9cbmNvbnN0IEhvcml6b250YWxBbGlnbiA9IG1hY3JvLlRleHRBbGlnbm1lbnQ7XG5cbi8qKlxuICogISNlbiBFbnVtIGZvciB2ZXJ0aWNhbCB0ZXh0IGFsaWdubWVudC5cbiAqICEjemgg5paH5pys5Z6C55u05a+56b2Q57G75Z6LXG4gKiBAZW51bSBMYWJlbC5WZXJ0aWNhbEFsaWduXG4gKi9cbi8qKlxuICogISNlbiBWZXJ0aWNhbCBhbGlnbm1lbnQgdG9wIGZvciB0ZXh0LlxuICogISN6aCDmlofmnKzpobbpg6jlr7npvZDjgIJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBUT1BcbiAqL1xuLyoqXG4gKiAhI2VuIFZlcnRpY2FsIGFsaWdubWVudCBjZW50ZXIgZm9yIHRleHQuXG4gKiAhI3poIOaWh+acrOWxheS4reWvuem9kOOAglxuICogQHByb3BlcnR5IHtOdW1iZXJ9IENFTlRFUlxuICovXG4vKipcbiAqICEjZW4gVmVydGljYWwgYWxpZ25tZW50IGJvdHRvbSBmb3IgdGV4dC5cbiAqICEjemgg5paH5pys5bqV6YOo5a+56b2Q44CCXG4gKiBAcHJvcGVydHkge051bWJlcn0gQk9UVE9NXG4gKi9cbmNvbnN0IFZlcnRpY2FsQWxpZ24gPSBtYWNyby5WZXJ0aWNhbFRleHRBbGlnbm1lbnQ7XG5cbi8qKlxuICogISNlbiBFbnVtIGZvciBPdmVyZmxvdy5cbiAqICEjemggT3ZlcmZsb3cg57G75Z6LXG4gKiBAZW51bSBMYWJlbC5PdmVyZmxvd1xuICovXG4vKipcbiAqICEjZW4gTk9ORS5cbiAqICEjemgg5LiN5YGa5Lu75L2V6ZmQ5Yi244CCXG4gKiBAcHJvcGVydHkge051bWJlcn0gTk9ORVxuICovXG4vKipcbiAqICEjZW4gSW4gQ0xBTVAgbW9kZSwgd2hlbiBsYWJlbCBjb250ZW50IGdvZXMgb3V0IG9mIHRoZSBib3VuZGluZyBib3gsIGl0IHdpbGwgYmUgY2xpcHBlZC5cbiAqICEjemggQ0xBTVAg5qih5byP5Lit77yM5b2T5paH5pys5YaF5a656LaF5Ye66L6555WM5qGG5pe277yM5aSa5L2Z55qE5Lya6KKr5oiq5pat44CCXG4gKiBAcHJvcGVydHkge051bWJlcn0gQ0xBTVBcbiAqL1xuLyoqXG4gKiAhI2VuIEluIFNIUklOSyBtb2RlLCB0aGUgZm9udCBzaXplIHdpbGwgY2hhbmdlIGR5bmFtaWNhbGx5IHRvIGFkYXB0IHRoZSBjb250ZW50IHNpemUuIFRoaXMgbW9kZSBtYXkgdGFrZXMgdXAgbW9yZSBDUFUgcmVzb3VyY2VzIHdoZW4gdGhlIGxhYmVsIGlzIHJlZnJlc2hlZC5cbiAqICEjemggU0hSSU5LIOaooeW8j++8jOWtl+S9k+Wkp+Wwj+S8muWKqOaAgeWPmOWMlu+8jOS7pemAguW6lOWGheWuueWkp+Wwj+OAgui/meS4quaooeW8j+WcqOaWh+acrOWIt+aWsOeahOaXtuWAmeWPr+iDveS8muWNoOeUqOi+g+WkmiBDUFUg6LWE5rqQ44CCXG4gKiBAcHJvcGVydHkge051bWJlcn0gU0hSSU5LXG4gKi9cbi8qKlxuICogISNlbiBJbiBSRVNJWkVfSEVJR0hUIG1vZGUsIHlvdSBjYW4gb25seSBjaGFuZ2UgdGhlIHdpZHRoIG9mIGxhYmVsIGFuZCB0aGUgaGVpZ2h0IGlzIGNoYW5nZWQgYXV0b21hdGljYWxseS5cbiAqICEjemgg5ZyoIFJFU0laRV9IRUlHSFQg5qih5byP5LiL77yM5Y+q6IO95pu05pS55paH5pys55qE5a695bqm77yM6auY5bqm5piv6Ieq5Yqo5pS55Y+Y55qE44CCXG4gKiBAcHJvcGVydHkge051bWJlcn0gUkVTSVpFX0hFSUdIVFxuICovXG5jb25zdCBPdmVyZmxvdyA9IGNjLkVudW0oe1xuICAgIE5PTkU6IDAsXG4gICAgQ0xBTVA6IDEsXG4gICAgU0hSSU5LOiAyLFxuICAgIFJFU0laRV9IRUlHSFQ6IDNcbn0pO1xuXG4vKipcbiAqICEjZW4gRW51bSBmb3IgZm9udCB0eXBlLlxuICogISN6aCBUeXBlIOexu+Wei1xuICogQGVudW0gTGFiZWwuVHlwZVxuICovXG4vKipcbiAqICEjZW4gVGhlIFRURiBmb250IHR5cGUuXG4gKiAhI3poIFRURuWtl+S9k1xuICogQHByb3BlcnR5IHtOdW1iZXJ9IFRURlxuICovXG4vKipcbiAqICEjZW4gVGhlIGJpdG1hcCBmb250IHR5cGUuXG4gKiAhI3poIOS9jeWbvuWtl+S9k1xuICogQHByb3BlcnR5IHtOdW1iZXJ9IEJNRm9udFxuICovXG4vKipcbiAqICEjZW4gVGhlIHN5c3RlbSBmb250IHR5cGUuXG4gKiAhI3poIOezu+e7n+Wtl+S9k1xuICogQHByb3BlcnR5IHtOdW1iZXJ9IFN5c3RlbUZvbnRcbiAqL1xuXG4vKipcbiAqICEjZW4gRW51bSBmb3IgY2FjaGUgbW9kZS5cbiAqICEjemggQ2FjaGVNb2RlIOexu+Wei1xuICogQGVudW0gTGFiZWwuQ2FjaGVNb2RlXG4gKi9cbiAvKipcbiAqICEjZW4gRG8gbm90IGRvIGFueSBjYWNoaW5nLlxuICogISN6aCDkuI3lgZrku7vkvZXnvJPlrZjjgIJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBOT05FXG4gKi9cbi8qKlxuICogISNlbiBJbiBCSVRNQVAgbW9kZSwgY2FjaGUgdGhlIGxhYmVsIGFzIGEgc3RhdGljIGltYWdlIGFuZCBhZGQgaXQgdG8gdGhlIGR5bmFtaWMgYXRsYXMgZm9yIGJhdGNoIHJlbmRlcmluZywgYW5kIGNhbiBiYXRjaGluZyB3aXRoIFNwcml0ZXMgdXNpbmcgYnJva2VuIGltYWdlcy5cbiAqICEjemggQklUTUFQIOaooeW8j++8jOWwhiBsYWJlbCDnvJPlrZjmiJDpnZnmgIHlm77lg4/lubbliqDlhaXliLDliqjmgIHlm77pm4bvvIzku6Xkvr/ov5vooYzmibnmrKHlkIjlubbvvIzlj6/kuI7kvb/nlKjnoo7lm77nmoQgU3ByaXRlIOi/m+ihjOWQiOaJue+8iOazqO+8muWKqOaAgeWbvumbhuWcqCBDaHJvbWUg5Lul5Y+K5b6u5L+h5bCP5ri45oiP5pqC5pe25YWz6Zet77yM6K+l5Yqf6IO95peg5pWI77yJ44CCXG4gKiBAcHJvcGVydHkge051bWJlcn0gQklUTUFQXG4gKi9cbi8qKlxuICogISNlbiBJbiBDSEFSIG1vZGUsIHNwbGl0IHRleHQgaW50byBjaGFyYWN0ZXJzIGFuZCBjYWNoZSBjaGFyYWN0ZXJzIGludG8gYSBkeW5hbWljIGF0bGFzIHdoaWNoIHRoZSBzaXplIG9mIDIwNDgqMjA0OC4gXG4gKiAhI3poIENIQVIg5qih5byP77yM5bCG5paH5pys5ouG5YiG5Li65a2X56ym77yM5bm25bCG5a2X56ym57yT5a2Y5Yiw5LiA5byg5Y2V54us55qE5aSn5bCP5Li6IDIwNDgqMjA0OCDnmoTlm77pm4bkuK3ov5vooYzph43lpI3kvb/nlKjvvIzkuI3lho3kvb/nlKjliqjmgIHlm77pm4bvvIjms6jvvJrlvZPlm77pm4bmu6Hml7blsIbkuI3lho3ov5vooYznvJPlrZjvvIzmmoLml7bkuI3mlK/mjIEgU0hSSU5LIOiHqumAguW6lOaWh+acrOWwuuWvuO+8iOWQjue7reWujOWWhO+8ie+8ieOAglxuICogQHByb3BlcnR5IHtOdW1iZXJ9IENIQVJcbiAqL1xuY29uc3QgQ2FjaGVNb2RlID0gY2MuRW51bSh7XG4gICAgTk9ORTogMCxcbiAgICBCSVRNQVA6IDEsXG4gICAgQ0hBUjogMixcbn0pO1xuXG5jb25zdCBCT0xEX0ZMQUcgPSAxIDw8IDA7XG5jb25zdCBJVEFMSUNfRkxBRyA9IDEgPDwgMTtcbmNvbnN0IFVOREVSTElORV9GTEFHID0gMSA8PCAyO1xuXG4vKipcbiAqICEjZW4gVGhlIExhYmVsIENvbXBvbmVudC5cbiAqICEjemgg5paH5a2X5qCH562+57uE5Lu2XG4gKiBAY2xhc3MgTGFiZWxcbiAqIEBleHRlbmRzIFJlbmRlckNvbXBvbmVudFxuICovXG5sZXQgTGFiZWwgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkxhYmVsJyxcbiAgICBleHRlbmRzOiBSZW5kZXJDb21wb25lbnQsXG4gICAgbWl4aW5zOiBbQmxlbmRGdW5jXSxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB0aGlzLl91c2VyRGVmaW5lZEZvbnQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYWN0dWFsRm9udFNpemUgPSAwO1xuICAgICAgICB0aGlzLl9hc3NlbWJsZXJEYXRhID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9mcmFtZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3R0ZlRleHR1cmUgPSBudWxsO1xuICAgICAgICB0aGlzLl9sZXR0ZXJUZXh0dXJlID0gbnVsbDtcblxuICAgICAgICBpZiAoY2MuZ2FtZS5yZW5kZXJUeXBlID09PSBjYy5nYW1lLlJFTkRFUl9UWVBFX0NBTlZBUykge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTWF0ZXJpYWwgPSB0aGlzLl91cGRhdGVNYXRlcmlhbENhbnZhcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1hdGVyaWFsID0gdGhpcy5fdXBkYXRlTWF0ZXJpYWxXZWJnbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucmVuZGVyZXJzL0xhYmVsJyxcbiAgICAgICAgaGVscDogJ2kxOG46Q09NUE9ORU5ULmhlbHBfdXJsLmxhYmVsJyxcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9sYWJlbC5qcycsXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX3VzZU9yaWdpbmFsU2l6ZTogdHJ1ZSxcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIENvbnRlbnQgc3RyaW5nIG9mIGxhYmVsLlxuICAgICAgICAgKiAhI3poIOagh+etvuaYvuekuueahOaWh+acrOWGheWuueOAglxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gc3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBfc3RyaW5nOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAnJyxcbiAgICAgICAgICAgIGZvcm1lcmx5U2VyaWFsaXplZEFzOiAnX04kc3RyaW5nJyxcbiAgICAgICAgfSxcbiAgICAgICAgc3RyaW5nOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHJpbmc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMuX3N0cmluZztcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJpbmcgPSAnJyArIHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RyaW5nICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja1N0cmluZ0VtcHR5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbXVsdGlsaW5lOiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYWJlbC5zdHJpbmcnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gSG9yaXpvbnRhbCBBbGlnbm1lbnQgb2YgbGFiZWwuXG4gICAgICAgICAqICEjemgg5paH5pys5YaF5a6555qE5rC05bmz5a+56b2Q5pa55byP44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TGFiZWwuSG9yaXpvbnRhbEFsaWdufSBob3Jpem9udGFsQWxpZ25cbiAgICAgICAgICovXG4gICAgICAgIGhvcml6b250YWxBbGlnbjoge1xuICAgICAgICAgICAgZGVmYXVsdDogSG9yaXpvbnRhbEFsaWduLkxFRlQsXG4gICAgICAgICAgICB0eXBlOiBIb3Jpem9udGFsQWxpZ24sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmxhYmVsLmhvcml6b250YWxfYWxpZ24nLFxuICAgICAgICAgICAgbm90aWZ5ICAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsQWxpZ24gPT09IG9sZFZhbHVlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWZXJ0c0RpcnR5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBWZXJ0aWNhbCBBbGlnbm1lbnQgb2YgbGFiZWwuXG4gICAgICAgICAqICEjemgg5paH5pys5YaF5a6555qE5Z6C55u05a+56b2Q5pa55byP44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TGFiZWwuVmVydGljYWxBbGlnbn0gdmVydGljYWxBbGlnblxuICAgICAgICAgKi9cbiAgICAgICAgdmVydGljYWxBbGlnbjoge1xuICAgICAgICAgICAgZGVmYXVsdDogVmVydGljYWxBbGlnbi5UT1AsXG4gICAgICAgICAgICB0eXBlOiBWZXJ0aWNhbEFsaWduLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYWJlbC52ZXJ0aWNhbF9hbGlnbicsXG4gICAgICAgICAgICBub3RpZnkgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWxBbGlnbiA9PT0gb2xkVmFsdWUpIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGFjdHVhbCByZW5kZXJpbmcgZm9udCBzaXplIGluIHNocmluayBtb2RlXG4gICAgICAgICAqICEjemggU0hSSU5LIOaooeW8j+S4i+mdouaWh+acrOWunumZhea4suafk+eahOWtl+S9k+Wkp+Wwj1xuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gYWN0dWFsRm9udFNpemVcbiAgICAgICAgICovXG4gICAgICAgIGFjdHVhbEZvbnRTaXplOiB7XG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0FjdHVhbCBGb250IFNpemUnLFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICByZWFkb25seTogdHJ1ZSxcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FjdHVhbEZvbnRTaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGFiZWwuYWN0dWFsRm9udFNpemUnLFxuICAgICAgICB9LFxuXG4gICAgICAgIF9mb250U2l6ZTogNDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEZvbnQgc2l6ZSBvZiBsYWJlbC5cbiAgICAgICAgICogISN6aCDmlofmnKzlrZfkvZPlpKflsI/jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGZvbnRTaXplXG4gICAgICAgICAqL1xuICAgICAgICBmb250U2l6ZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9udFNpemU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9mb250U2l6ZSA9PT0gdmFsdWUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2ZvbnRTaXplID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWZXJ0c0RpcnR5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmFuZ2U6IFswLCA1MTJdLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYWJlbC5mb250X3NpemUnLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEZvbnQgZmFtaWx5IG9mIGxhYmVsLCBvbmx5IHRha2UgZWZmZWN0IHdoZW4gdXNlU3lzdGVtRm9udCBwcm9wZXJ0eSBpcyB0cnVlLlxuICAgICAgICAgKiAhI3poIOaWh+acrOWtl+S9k+WQjeensCwg5Y+q5ZyoIHVzZVN5c3RlbUZvbnQg5bGe5oCn5Li6IHRydWUg55qE5pe25YCZ55Sf5pWI44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBmb250RmFtaWx5XG4gICAgICAgICAqL1xuICAgICAgICBmb250RmFtaWx5OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBcIkFyaWFsXCIsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmxhYmVsLmZvbnRfZmFtaWx5JyxcbiAgICAgICAgICAgIG5vdGlmeSAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb250RmFtaWx5ID09PSBvbGRWYWx1ZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2xpbmVIZWlnaHQ6IDQwLFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBMaW5lIEhlaWdodCBvZiBsYWJlbC5cbiAgICAgICAgICogISN6aCDmlofmnKzooYzpq5jjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGxpbmVIZWlnaHRcbiAgICAgICAgICovXG4gICAgICAgIGxpbmVIZWlnaHQ6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVIZWlnaHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9saW5lSGVpZ2h0ID09PSB2YWx1ZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmVIZWlnaHQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmxhYmVsLmxpbmVfaGVpZ2h0JyxcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gT3ZlcmZsb3cgb2YgbGFiZWwuXG4gICAgICAgICAqICEjemgg5paH5a2X5pi+56S66LaF5Ye66IyD5Zu05pe255qE5aSE55CG5pa55byP44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TGFiZWwuT3ZlcmZsb3d9IG92ZXJmbG93XG4gICAgICAgICAqL1xuICAgICAgICBvdmVyZmxvdzoge1xuICAgICAgICAgICAgZGVmYXVsdDogT3ZlcmZsb3cuTk9ORSxcbiAgICAgICAgICAgIHR5cGU6IE92ZXJmbG93LFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYWJlbC5vdmVyZmxvdycsXG4gICAgICAgICAgICBub3RpZnkgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmZsb3cgPT09IG9sZFZhbHVlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWZXJ0c0RpcnR5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBfZW5hYmxlV3JhcFRleHQ6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFdoZXRoZXIgYXV0byB3cmFwIGxhYmVsIHdoZW4gc3RyaW5nIHdpZHRoIGlzIGxhcmdlIHRoYW4gbGFiZWwgd2lkdGguXG4gICAgICAgICAqICEjemgg5piv5ZCm6Ieq5Yqo5o2i6KGM44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlV3JhcFRleHRcbiAgICAgICAgICovXG4gICAgICAgIGVuYWJsZVdyYXBUZXh0OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVXcmFwVGV4dDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2VuYWJsZVdyYXBUZXh0ID09PSB2YWx1ZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5hYmxlV3JhcFRleHQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGFiZWwud3JhcCcsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8g6L+Z5Liq5L+d5a2Y5LqG5pen6aG555uu55qEIGZpbGUg5pWw5o2uXG4gICAgICAgIF9OJGZpbGU6IG51bGwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGZvbnQgb2YgbGFiZWwuXG4gICAgICAgICAqICEjemgg5paH5pys5a2X5L2T44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Rm9udH0gZm9udFxuICAgICAgICAgKi9cbiAgICAgICAgZm9udDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fTiRmaWxlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb250ID09PSB2YWx1ZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vaWYgZGVsZXRlIHRoZSBmb250LCB3ZSBzaG91bGQgY2hhbmdlIGlzU3lzdGVtRm9udFVzZWQgdG8gdHJ1ZVxuICAgICAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNTeXN0ZW1Gb250VXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUiAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91c2VyRGVmaW5lZEZvbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fTiRmaWxlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICYmIHRoaXMuX2lzU3lzdGVtRm9udFVzZWQpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzU3lzdGVtRm9udFVzZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lbmFibGVkSW5IaWVyYXJjaHkpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IGNjLkZvbnQsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmxhYmVsLmZvbnQnLFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBfaXNTeXN0ZW1Gb250VXNlZDogdHJ1ZSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBXaGV0aGVyIHVzZSBzeXN0ZW0gZm9udCBuYW1lIG9yIG5vdC5cbiAgICAgICAgICogISN6aCDmmK/lkKbkvb/nlKjns7vnu5/lrZfkvZPjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSB1c2VTeXN0ZW1Gb250XG4gICAgICAgICAqL1xuICAgICAgICB1c2VTeXN0ZW1Gb250OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1N5c3RlbUZvbnRVc2VkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNTeXN0ZW1Gb250VXNlZCA9PT0gdmFsdWUpIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1N5c3RlbUZvbnRVc2VkID0gISF2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdmFsdWUgJiYgdGhpcy5fdXNlckRlZmluZWRGb250KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvbnQgPSB0aGlzLl91c2VyRGVmaW5lZEZvbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwYWNpbmdYID0gdGhpcy5fc3BhY2luZ1g7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb250ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrRm9yVmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGFiZWwuc3lzdGVtX2ZvbnQnLFxuICAgICAgICB9LFxuXG4gICAgICAgIF9ibUZvbnRPcmlnaW5hbFNpemU6IHtcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnQk1Gb250IE9yaWdpbmFsIFNpemUnLFxuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fTiRmaWxlIGluc3RhbmNlb2YgY2MuQml0bWFwRm9udCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fTiRmaWxlLmZvbnRTaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBfc3BhY2luZ1g6IDAsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIHNwYWNpbmcgb2YgdGhlIHggYXhpcyBiZXR3ZWVuIGNoYXJhY3RlcnMsIG9ubHkgdGFrZSBFZmZlY3Qgd2hlbiB1c2luZyBiaXRtYXAgZm9udHMuXG4gICAgICAgICAqICEjemgg5paH5a2X5LmL6Ze0IHgg6L2055qE6Ze06Led77yM5LuF5Zyo5L2/55So5L2N5Zu+5a2X5L2T5pe255Sf5pWI44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzcGFjaW5nWFxuICAgICAgICAgKi9cbiAgICAgICAgc3BhY2luZ1g6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NwYWNpbmdYO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGFjaW5nWCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGFiZWwuc3BhY2luZ1gnLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8vRm9yIGNvbXBhdGliaWxpdHkgd2l0aCB2Mi4wLnggdGVtcG9yYXJ5IHJlc2VydmF0aW9uLlxuICAgICAgICBfYmF0Y2hBc0JpdG1hcDogZmFsc2UsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGNhY2hlIG1vZGUgb2YgbGFiZWwuIFRoaXMgbW9kZSBvbmx5IHN1cHBvcnRzIHN5c3RlbSBmb250cy5cbiAgICAgICAgICogISN6aCDmlofmnKznvJPlrZjmqKHlvI8sIOivpeaooeW8j+WPquaUr+aMgeezu+e7n+Wtl+S9k+OAglxuICAgICAgICAgKiBAcHJvcGVydHkge0xhYmVsLkNhY2hlTW9kZX0gY2FjaGVNb2RlXG4gICAgICAgICAqL1xuICAgICAgICBjYWNoZU1vZGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IENhY2hlTW9kZS5OT05FLFxuICAgICAgICAgICAgdHlwZTogQ2FjaGVNb2RlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYWJlbC5jYWNoZU1vZGUnLFxuICAgICAgICAgICAgbm90aWZ5IChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlTW9kZSA9PT0gb2xkVmFsdWUpIHJldHVybjtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAob2xkVmFsdWUgPT09IENhY2hlTW9kZS5CSVRNQVAgJiYgISh0aGlzLmZvbnQgaW5zdGFuY2VvZiBjYy5CaXRtYXBGb250KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZSAmJiB0aGlzLl9mcmFtZS5fcmVzZXREeW5hbWljQXRsYXNGcmFtZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChvbGRWYWx1ZSA9PT0gQ2FjaGVNb2RlLkNIQVIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHRmVGV4dHVyZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBfc3R5bGVGbGFnczogMCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBXaGV0aGVyIGVuYWJsZSBib2xkLlxuICAgICAgICAgKiAhI3poIOaYr+WQpuWQr+eUqOm7keS9k+OAglxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZUJvbGRcbiAgICAgICAgICovXG4gICAgICAgIGVuYWJsZUJvbGQ6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhKHRoaXMuX3N0eWxlRmxhZ3MgJiBCT0xEX0ZMQUcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3R5bGVGbGFncyB8PSBCT0xEX0ZMQUc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3R5bGVGbGFncyAmPSB+Qk9MRF9GTEFHO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYWJlbC5ib2xkJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFdoZXRoZXIgZW5hYmxlIGl0YWxpYy5cbiAgICAgICAgICogISN6aCDmmK/lkKblkK/nlKjpu5HkvZPjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBlbmFibGVJdGFsaWNcbiAgICAgICAgICovXG4gICAgICAgIGVuYWJsZUl0YWxpYzoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISEodGhpcy5fc3R5bGVGbGFncyAmIElUQUxJQ19GTEFHKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlRmxhZ3MgfD0gSVRBTElDX0ZMQUc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3R5bGVGbGFncyAmPSB+SVRBTElDX0ZMQUc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYWJlbC5pdGFsaWMnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gV2hldGhlciBlbmFibGUgdW5kZXJsaW5lLlxuICAgICAgICAgKiAhI3poIOaYr+WQpuWQr+eUqOS4i+WIkue6v+OAglxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZVVuZGVybGluZVxuICAgICAgICAgKi9cbiAgICAgICAgZW5hYmxlVW5kZXJsaW5lOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhISh0aGlzLl9zdHlsZUZsYWdzICYgVU5ERVJMSU5FX0ZMQUcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3R5bGVGbGFncyB8PSBVTkRFUkxJTkVfRkxBRztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdHlsZUZsYWdzICY9IH5VTkRFUkxJTkVfRkxBRztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGFiZWwudW5kZXJsaW5lJ1xuICAgICAgICB9LFxuXG4gICAgICAgIF91bmRlcmxpbmVIZWlnaHQ6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBoZWlnaHQgb2YgdW5kZXJsaW5lLlxuICAgICAgICAgKiAhI3poIOS4i+WIkue6v+mrmOW6puOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdW5kZXJsaW5lSGVpZ2h0XG4gICAgICAgICAqL1xuICAgICAgICB1bmRlcmxpbmVIZWlnaHQ6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VuZGVybGluZUhlaWdodDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3VuZGVybGluZUhlaWdodCA9PT0gdmFsdWUpIHJldHVybjtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLl91bmRlcmxpbmVIZWlnaHQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmxhYmVsLnVuZGVybGluZV9oZWlnaHQnLFxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIEhvcml6b250YWxBbGlnbjogSG9yaXpvbnRhbEFsaWduLFxuICAgICAgICBWZXJ0aWNhbEFsaWduOiBWZXJ0aWNhbEFsaWduLFxuICAgICAgICBPdmVyZmxvdzogT3ZlcmZsb3csXG4gICAgICAgIENhY2hlTW9kZTogQ2FjaGVNb2RlLFxuXG4gICAgICAgIF9zaGFyZUF0bGFzOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogISN6aCDpnIDopoHkv53or4HlvZPliY3lnLrmma/kuK3msqHmnInkvb/nlKhDSEFS57yT5a2Y55qETGFiZWzmiY3lj6/ku6XmuIXpmaTvvIzlkKbliJnlt7LmuLLmn5PnmoTmloflrZfmsqHmnInph43mlrDnu5jliLbkvJrkuI3mmL7npLpcbiAgICAgICAgICogISNlbiBJdCBjYW4gYmUgY2xlYXJlZCB0aGF0IG5lZWQgdG8gZW5zdXJlIHRoZXJlIGlzIG5vdCB1c2UgdGhlIENIQVIgY2FjaGUgaW4gdGhlIGN1cnJlbnQgc2NlbmUuIE90aGVyd2lzZSwgdGhlIHJlbmRlcmVkIHRleHQgd2lsbCBub3QgYmUgZGlzcGxheWVkIHdpdGhvdXQgcmVwYWludGluZy5cbiAgICAgICAgICogQG1ldGhvZCBjbGVhckNoYXJDYWNoZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhckNoYXJDYWNoZSAoKSB7XG4gICAgICAgICAgICBpZiAoTGFiZWwuX3NoYXJlQXRsYXMpIHtcbiAgICAgICAgICAgICAgICBMYWJlbC5fc2hhcmVBdGxhcy5jbGVhckFsbENhY2hlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgLy8gRm9yIGNvbXBhdGliaWxpdHkgd2l0aCB2Mi4wLnggdGVtcG9yYXJ5IHJlc2VydmF0aW9uLlxuICAgICAgICBpZiAodGhpcy5fYmF0Y2hBc0JpdG1hcCAmJiB0aGlzLmNhY2hlTW9kZSA9PT0gQ2FjaGVNb2RlLk5PTkUpIHtcbiAgICAgICAgICAgIHRoaXMuY2FjaGVNb2RlID0gQ2FjaGVNb2RlLkJJVE1BUDtcbiAgICAgICAgICAgIHRoaXMuX2JhdGNoQXNCaXRtYXAgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYy5nYW1lLnJlbmRlclR5cGUgPT09IGNjLmdhbWUuUkVOREVSX1RZUEVfQ0FOVkFTKSB7XG4gICAgICAgICAgICAvLyBDYWNoZU1vZGUgaXMgbm90IHN1cHBvcnRlZCBpbiBDYW52YXMuXG4gICAgICAgICAgICB0aGlzLmNhY2hlTW9kZSA9IENhY2hlTW9kZS5OT05FO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uRW5hYmxlICgpIHtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcblxuICAgICAgICAvLyBLZWVwIHRyYWNrIG9mIE5vZGUgc2l6ZVxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLl9ub2RlU2l6ZUNoYW5nZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQsIHRoaXMuc2V0VmVydHNEaXJ0eSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKCk7XG4gICAgfSxcblxuICAgIG9uRGlzYWJsZSAoKSB7XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLl9ub2RlU2l6ZUNoYW5nZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLkFOQ0hPUl9DSEFOR0VELCB0aGlzLnNldFZlcnRzRGlydHksIHRoaXMpO1xuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3kgKCkge1xuICAgICAgICB0aGlzLl9hc3NlbWJsZXIgJiYgdGhpcy5fYXNzZW1ibGVyLl9yZXNldEFzc2VtYmxlckRhdGEgJiYgdGhpcy5fYXNzZW1ibGVyLl9yZXNldEFzc2VtYmxlckRhdGEodGhpcy5fYXNzZW1ibGVyRGF0YSk7XG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlckRhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLl9sZXR0ZXJUZXh0dXJlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX3R0ZlRleHR1cmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3R0ZlRleHR1cmUuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5fdHRmVGV4dHVyZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICB9LFxuXG4gICAgX25vZGVTaXplQ2hhbmdlZCAoKSB7XG4gICAgICAgIC8vIEJlY2F1c2UgdGhlIGNvbnRlbnQgc2l6ZSBpcyBhdXRvbWF0aWNhbGx5IHVwZGF0ZWQgd2hlbiBvdmVyZmxvdyBpcyBOT05FLlxuICAgICAgICAvLyBBbmQgdGhpcyB3aWxsIGNvbmZsaWN0IHdpdGggdGhlIGFsaWdubWVudCBvZiB0aGUgQ0NXaWRnZXQuXG4gICAgICAgIGlmIChDQ19FRElUT1IgfHwgdGhpcy5vdmVyZmxvdyAhPT0gT3ZlcmZsb3cuTk9ORSkge1xuICAgICAgICAgICAgdGhpcy5zZXRWZXJ0c0RpcnR5KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0VmVydHNEaXJ0eSgpIHtcbiAgICAgICAgaWYoQ0NfSlNCICYmIHRoaXMuX25hdGl2ZVRURigpKSB7XG4gICAgICAgICAgICB0aGlzLl9hc3NlbWJsZXIgJiYgdGhpcy5fYXNzZW1ibGVyLnVwZGF0ZVJlbmRlckRhdGEodGhpcylcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlQ29sb3IgKCkge1xuICAgICAgICBpZiAoISh0aGlzLmZvbnQgaW5zdGFuY2VvZiBjYy5CaXRtYXBGb250KSkge1xuICAgICAgICAgICAgaWYgKCEodGhpcy5fc3JjQmxlbmRGYWN0b3IgPT09IGNjLm1hY3JvLkJsZW5kRmFjdG9yLlNSQ19BTFBIQSAmJiB0aGlzLm5vZGUuX3JlbmRlckZsYWcgJiBjYy5SZW5kZXJGbG93LkZMQUdfT1BBQ0lUWSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBSZW5kZXJDb21wb25lbnQucHJvdG90eXBlLl91cGRhdGVDb2xvci5jYWxsKHRoaXMpO1xuICAgIH0sXG5cbiAgICBfdmFsaWRhdGVSZW5kZXIgKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVSZW5kZXIoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9tYXRlcmlhbHNbMF0pIHtcbiAgICAgICAgICAgIGxldCBmb250ID0gdGhpcy5mb250O1xuICAgICAgICAgICAgaWYgKGZvbnQgaW5zdGFuY2VvZiBjYy5CaXRtYXBGb250KSB7XG4gICAgICAgICAgICAgICAgbGV0IHNwcml0ZUZyYW1lID0gZm9udC5zcHJpdGVGcmFtZTtcbiAgICAgICAgICAgICAgICBpZiAoc3ByaXRlRnJhbWUgJiYgXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZUZyYW1lLnRleHR1cmVMb2FkZWQoKSAmJlxuICAgICAgICAgICAgICAgICAgICBmb250Ll9mbnRDb25maWcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xuICAgIH0sXG5cbiAgICBfcmVzZXRBc3NlbWJsZXIgKCkge1xuICAgICAgICB0aGlzLl9mcmFtZSA9IG51bGw7XG4gICAgICAgIFJlbmRlckNvbXBvbmVudC5wcm90b3R5cGUuX3Jlc2V0QXNzZW1ibGVyLmNhbGwodGhpcyk7XG4gICAgfSxcblxuICAgIF9jaGVja1N0cmluZ0VtcHR5ICgpIHtcbiAgICAgICAgdGhpcy5tYXJrRm9yUmVuZGVyKCEhdGhpcy5zdHJpbmcpO1xuICAgIH0sXG5cbiAgICBfb24zRE5vZGVDaGFuZ2VkICgpIHtcbiAgICAgICAgdGhpcy5fcmVzZXRBc3NlbWJsZXIoKTtcbiAgICAgICAgdGhpcy5fYXBwbHlGb250VGV4dHVyZSgpO1xuICAgIH0sXG5cbiAgICBfb25CTUZvbnRUZXh0dXJlTG9hZGVkICgpIHtcbiAgICAgICAgdGhpcy5fZnJhbWUuX3RleHR1cmUgPSB0aGlzLmZvbnQuc3ByaXRlRnJhbWUuX3RleHR1cmU7XG4gICAgICAgIHRoaXMubWFya0ZvclJlbmRlcih0cnVlKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlTWF0ZXJpYWwoKTtcbiAgICAgICAgdGhpcy5fYXNzZW1ibGVyICYmIHRoaXMuX2Fzc2VtYmxlci51cGRhdGVSZW5kZXJEYXRhKHRoaXMpO1xuICAgIH0sXG5cbiAgICBfb25CbGVuZENoYW5nZWQgKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlU3lzdGVtRm9udCB8fCAhdGhpcy5lbmFibGVkSW5IaWVyYXJjaHkpIHJldHVybjtcbiAgICAgICAgICBcbiAgICAgICAgdGhpcy5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKCk7XG4gICAgfSxcblxuICAgIF9hcHBseUZvbnRUZXh0dXJlICgpIHtcbiAgICAgICAgbGV0IGZvbnQgPSB0aGlzLmZvbnQ7XG4gICAgICAgIGlmIChmb250IGluc3RhbmNlb2YgY2MuQml0bWFwRm9udCkge1xuICAgICAgICAgICAgbGV0IHNwcml0ZUZyYW1lID0gZm9udC5zcHJpdGVGcmFtZTtcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gc3ByaXRlRnJhbWU7XG4gICAgICAgICAgICBpZiAoc3ByaXRlRnJhbWUpIHtcbiAgICAgICAgICAgICAgICBzcHJpdGVGcmFtZS5vblRleHR1cmVMb2FkZWQodGhpcy5fb25CTUZvbnRUZXh0dXJlTG9hZGVkLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLl9uYXRpdmVUVEYoKSl7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9mcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZSA9IG5ldyBMYWJlbEZyYW1lKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlTW9kZSA9PT0gQ2FjaGVNb2RlLkNIQVIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGV0dGVyVGV4dHVyZSA9IHRoaXMuX2Fzc2VtYmxlci5fZ2V0QXNzZW1ibGVyRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZS5fcmVmcmVzaFRleHR1cmUodGhpcy5fbGV0dGVyVGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fdHRmVGV4dHVyZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90dGZUZXh0dXJlID0gbmV3IGNjLlRleHR1cmUyRCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hc3NlbWJsZXJEYXRhID0gdGhpcy5fYXNzZW1ibGVyLl9nZXRBc3NlbWJsZXJEYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3R0ZlRleHR1cmUuaW5pdFdpdGhFbGVtZW50KHRoaXMuX2Fzc2VtYmxlckRhdGEuY2FudmFzKTtcbiAgICAgICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVNb2RlICE9PSBDYWNoZU1vZGUuQ0hBUikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZS5fcmVzZXREeW5hbWljQXRsYXNGcmFtZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZS5fcmVmcmVzaFRleHR1cmUodGhpcy5fdHRmVGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zcmNCbGVuZEZhY3RvciA9PT0gY2MubWFjcm8uQmxlbmRGYWN0b3IuT05FICYmICFDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHRmVGV4dHVyZS5zZXRQcmVtdWx0aXBseUFscGhhKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1hdGVyaWFsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hc3NlbWJsZXIgJiYgdGhpcy5fYXNzZW1ibGVyLnVwZGF0ZVJlbmRlckRhdGEodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXJrRm9yVmFsaWRhdGUoKTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZU1hdGVyaWFsQ2FudmFzICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9mcmFtZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9mcmFtZS5fdGV4dHVyZS5fbmF0aXZlVXJsID0gdGhpcy51dWlkICsgJ190ZXh0dXJlJztcbiAgICB9LFxuXG4gICAgX3VwZGF0ZU1hdGVyaWFsV2ViZ2wgKCkge1xuXG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMuZ2V0TWF0ZXJpYWwoMCk7XG4gICAgICAgIGlmKHRoaXMuX25hdGl2ZVRURigpKSB7XG4gICAgICAgICAgICBpZihtYXRlcmlhbCkgdGhpcy5fYXNzZW1ibGVyLl91cGRhdGVUVEZNYXRlcmlhbCh0aGlzKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9mcmFtZSkgcmV0dXJuO1xuICAgICAgICBtYXRlcmlhbCAmJiBtYXRlcmlhbC5zZXRQcm9wZXJ0eSgndGV4dHVyZScsIHRoaXMuX2ZyYW1lLl90ZXh0dXJlKTtcblxuICAgICAgICBCbGVuZEZ1bmMucHJvdG90eXBlLl91cGRhdGVNYXRlcmlhbC5jYWxsKHRoaXMpO1xuICAgIH0sXG5cbiAgICBfZm9yY2VVc2VDYW52YXM6IGZhbHNlLFxuXG4gICAgX25hdGl2ZVRURigpIHtcbiAgICAgICAgcmV0dXJuICAhdGhpcy5fZm9yY2VVc2VDYW52YXMgJiYgISF0aGlzLl9hc3NlbWJsZXIgJiYgISF0aGlzLl9hc3NlbWJsZXIuX3VwZGF0ZVRURk1hdGVyaWFsO1xuICAgIH0sXG5cbiAgICBfZm9yY2VVcGRhdGVSZW5kZXJEYXRhICgpIHtcbiAgICAgICAgdGhpcy5zZXRWZXJ0c0RpcnR5KCk7XG4gICAgICAgIHRoaXMuX3Jlc2V0QXNzZW1ibGVyKCk7XG4gICAgICAgIHRoaXMuX2FwcGx5Rm9udFRleHR1cmUoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgYGxhYmVsLl9lbmFibGVCb2xkYCBpcyBkZXByZWNhdGVkLCB1c2UgYGxhYmVsLmVuYWJsZUJvbGQgPSB0cnVlYCBpbnN0ZWFkIHBsZWFzZS5cbiAgICAgKi9cbiAgICBfZW5hYmxlQm9sZCAoZW5hYmxlZCkge1xuICAgICAgICBpZiAoQ0NfREVCVUcpIHtcbiAgICAgICAgICAgIGNjLndhcm4oJ2BsYWJlbC5fZW5hYmxlQm9sZGAgaXMgZGVwcmVjYXRlZCwgdXNlIGBsYWJlbC5lbmFibGVCb2xkID0gdHJ1ZWAgaW5zdGVhZCBwbGVhc2UnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuYWJsZUJvbGQgPSAhIWVuYWJsZWQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIGBsYWJlbC5fZW5hYmxlSXRhbGljc2AgaXMgZGVwcmVjYXRlZCwgdXNlIGBsYWJlbC5lbmFibGVJdGFsaWNzID0gdHJ1ZWAgaW5zdGVhZCBwbGVhc2UuXG4gICAgICovXG4gICAgX2VuYWJsZUl0YWxpY3MgKGVuYWJsZWQpIHtcbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICBjYy53YXJuKCdgbGFiZWwuX2VuYWJsZUl0YWxpY3NgIGlzIGRlcHJlY2F0ZWQsIHVzZSBgbGFiZWwuZW5hYmxlSXRhbGljcyA9IHRydWVgIGluc3RlYWQgcGxlYXNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmFibGVJdGFsaWMgPSAhIWVuYWJsZWQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIGBsYWJlbC5fZW5hYmxlVW5kZXJsaW5lYCBpcyBkZXByZWNhdGVkLCB1c2UgYGxhYmVsLmVuYWJsZVVuZGVybGluZSA9IHRydWVgIGluc3RlYWQgcGxlYXNlLlxuICAgICAqL1xuICAgIF9lbmFibGVVbmRlcmxpbmUgKGVuYWJsZWQpIHtcbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICBjYy53YXJuKCdgbGFiZWwuX2VuYWJsZVVuZGVybGluZWAgaXMgZGVwcmVjYXRlZCwgdXNlIGBsYWJlbC5lbmFibGVVbmRlcmxpbmUgPSB0cnVlYCBpbnN0ZWFkIHBsZWFzZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5hYmxlVW5kZXJsaW5lID0gISFlbmFibGVkO1xuICAgIH0sXG4gfSk7XG5cbiBjYy5MYWJlbCA9IG1vZHVsZS5leHBvcnRzID0gTGFiZWw7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==