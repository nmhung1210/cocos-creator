
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCMask.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _gfx = _interopRequireDefault(require("../../renderer/gfx"));

var _mat = _interopRequireDefault(require("../value-types/mat4"));

var _vec = _interopRequireDefault(require("../value-types/vec2"));

var _materialVariant = _interopRequireDefault(require("../assets/material/material-variant"));

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
var misc = require('../utils/misc');

var RenderComponent = require('./CCRenderComponent');

var RenderFlow = require('../renderer/render-flow');

var Graphics = require('../graphics/graphics');

var _vec2_temp = new _vec["default"]();

var _mat4_temp = new _mat["default"]();

var _circlepoints = [];

function _calculateCircle(center, radius, segements) {
  _circlepoints.length = 0;
  var anglePerStep = Math.PI * 2 / segements;

  for (var step = 0; step < segements; ++step) {
    _circlepoints.push(cc.v2(radius.x * Math.cos(anglePerStep * step) + center.x, radius.y * Math.sin(anglePerStep * step) + center.y));
  }

  return _circlepoints;
}
/**
 * !#en the type for mask.
 * !#zh 遮罩组件类型
 * @enum Mask.Type
 */


var MaskType = cc.Enum({
  /**
   * !#en Rect mask.
   * !#zh 使用矩形作为遮罩
   * @property {Number} RECT
   */
  RECT: 0,

  /**
   * !#en Ellipse Mask.
   * !#zh 使用椭圆作为遮罩
   * @property {Number} ELLIPSE
   */
  ELLIPSE: 1,

  /**
   * !#en Image Stencil Mask.
   * !#zh 使用图像模版作为遮罩
   * @property {Number} IMAGE_STENCIL
   */
  IMAGE_STENCIL: 2
});
var SEGEMENTS_MIN = 3;
var SEGEMENTS_MAX = 10000;
/**
 * !#en The Mask Component
 * !#zh 遮罩组件
 * @class Mask
 * @extends RenderComponent
 */

var Mask = cc.Class({
  name: 'cc.Mask',
  "extends": RenderComponent,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/Mask',
    help: 'i18n:COMPONENT.help_url.mask',
    inspector: 'packages://inspector/inspectors/comps/mask.js'
  },
  ctor: function ctor() {
    this._graphics = null;
    this._enableMaterial = null;
    this._exitMaterial = null;
    this._clearMaterial = null;
  },
  properties: {
    _spriteFrame: {
      "default": null,
      type: cc.SpriteFrame
    },

    /**
     * !#en The mask type.
     * !#zh 遮罩类型
     * @property type
     * @type {Mask.Type}
     * @example
     * mask.type = cc.Mask.Type.RECT;
     */
    _type: MaskType.RECT,
    type: {
      get: function get() {
        return this._type;
      },
      set: function set(value) {
        if (this._type !== value) {
          this._resetAssembler();
        }

        this._type = value;

        if (this._type !== MaskType.IMAGE_STENCIL) {
          this.spriteFrame = null;
          this.alphaThreshold = 0;

          this._updateGraphics();
        }

        this._activateMaterial();
      },
      type: MaskType,
      tooltip: CC_DEV && 'i18n:COMPONENT.mask.type'
    },

    /**
     * !#en The mask image
     * !#zh 遮罩所需要的贴图
     * @property spriteFrame
     * @type {SpriteFrame}
     * @default null
     * @example
     * mask.spriteFrame = newSpriteFrame;
     */
    spriteFrame: {
      type: cc.SpriteFrame,
      tooltip: CC_DEV && 'i18n:COMPONENT.mask.spriteFrame',
      get: function get() {
        return this._spriteFrame;
      },
      set: function set(value) {
        var lastSprite = this._spriteFrame;

        if (CC_EDITOR) {
          if ((lastSprite && lastSprite._uuid) === (value && value._uuid)) {
            return;
          }
        } else {
          if (lastSprite === value) {
            return;
          }
        }

        this._spriteFrame = value;
        this.setVertsDirty();

        this._updateMaterial();
      }
    },

    /**
     * !#en
     * The alpha threshold.(Not supported Canvas Mode) <br/>
     * The content is drawn only where the stencil have pixel with alpha greater than the alphaThreshold. <br/>
     * Should be a float between 0 and 1. <br/>
     * This default to 0.1.
     * When it's set to 1, the stencil will discard all pixels, nothing will be shown.
     * !#zh
     * Alpha 阈值（不支持 Canvas 模式）<br/>
     * 只有当模板的像素的 alpha 大于等于 alphaThreshold 时，才会绘制内容。<br/>
     * 该数值 0 ~ 1 之间的浮点数，默认值为 0.1
     * 当被设置为 1 时，会丢弃所有蒙版像素，所以不会显示任何内容
     * @property alphaThreshold
     * @type {Number}
     * @default 0.1
     */
    alphaThreshold: {
      "default": 0.1,
      type: cc.Float,
      range: [0, 1, 0.1],
      slide: true,
      tooltip: CC_DEV && 'i18n:COMPONENT.mask.alphaThreshold',
      notify: function notify() {
        if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
          cc.warnID(4201);
          return;
        }

        this._updateMaterial();
      }
    },

    /**
     * !#en Reverse mask (Not supported Canvas Mode)
     * !#zh 反向遮罩（不支持 Canvas 模式）
     * @property inverted
     * @type {Boolean}
     * @default false
     */
    inverted: {
      "default": false,
      type: cc.Boolean,
      tooltip: CC_DEV && 'i18n:COMPONENT.mask.inverted',
      notify: function notify() {
        if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
          cc.warnID(4202);
        }
      }
    },

    /**
     * TODO: remove segments, not supported by graphics
     * !#en The segements for ellipse mask.
     * !#zh 椭圆遮罩的曲线细分数
     * @property segements
     * @type {Number}
     * @default 64
     */
    _segments: 64,
    segements: {
      get: function get() {
        return this._segments;
      },
      set: function set(value) {
        this._segments = misc.clampf(value, SEGEMENTS_MIN, SEGEMENTS_MAX);

        this._updateGraphics();
      },
      type: cc.Integer,
      tooltip: CC_DEV && 'i18n:COMPONENT.mask.segements'
    },
    _resizeToTarget: {
      animatable: false,
      set: function set(value) {
        if (value) {
          this._resizeNodeToTargetNode();
        }
      }
    }
  },
  statics: {
    Type: MaskType
  },
  onRestore: function onRestore() {
    this._activateMaterial();
  },
  onEnable: function onEnable() {
    this._super();

    if (this._type !== MaskType.IMAGE_STENCIL) {
      this._updateGraphics();
    }

    this.node.on(cc.Node.EventType.POSITION_CHANGED, this._updateGraphics, this);
    this.node.on(cc.Node.EventType.ROTATION_CHANGED, this._updateGraphics, this);
    this.node.on(cc.Node.EventType.SCALE_CHANGED, this._updateGraphics, this);
    this.node.on(cc.Node.EventType.SIZE_CHANGED, this._updateGraphics, this);
    this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this._updateGraphics, this);
  },
  onDisable: function onDisable() {
    this._super();

    this.node.off(cc.Node.EventType.POSITION_CHANGED, this._updateGraphics, this);
    this.node.off(cc.Node.EventType.ROTATION_CHANGED, this._updateGraphics, this);
    this.node.off(cc.Node.EventType.SCALE_CHANGED, this._updateGraphics, this);
    this.node.off(cc.Node.EventType.SIZE_CHANGED, this._updateGraphics, this);
    this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this._updateGraphics, this);
    this.node._renderFlag &= ~RenderFlow.FLAG_POST_RENDER;
  },
  onDestroy: function onDestroy() {
    this._super();

    this._removeGraphics();
  },
  _resizeNodeToTargetNode: CC_EDITOR && function () {
    if (this.spriteFrame) {
      var rect = this.spriteFrame.getRect();
      this.node.setContentSize(rect.width, rect.height);
    }
  },
  _validateRender: function _validateRender() {
    if (this._type !== MaskType.IMAGE_STENCIL) return;
    var spriteFrame = this._spriteFrame;

    if (spriteFrame && spriteFrame.textureLoaded()) {
      return;
    }

    this.disableRender();
  },
  _activateMaterial: function _activateMaterial() {
    this._createGraphics(); // Init material


    var material = this._materials[0];

    if (!material) {
      material = _materialVariant["default"].createWithBuiltin('2d-sprite', this);
    } else {
      material = _materialVariant["default"].create(material, this);
    }

    material.define('USE_ALPHA_TEST', true); // Reset material

    if (this._type === MaskType.IMAGE_STENCIL) {
      material.define('CC_USE_MODEL', false);
      material.define('USE_TEXTURE', true);
    } else {
      material.define('CC_USE_MODEL', true);
      material.define('USE_TEXTURE', false);
    }

    if (!this._enableMaterial) {
      this._enableMaterial = _materialVariant["default"].createWithBuiltin('2d-sprite', this);
    }

    if (!this._exitMaterial) {
      this._exitMaterial = _materialVariant["default"].createWithBuiltin('2d-sprite', this);

      this._exitMaterial.setStencilEnabled(_gfx["default"].STENCIL_DISABLE);
    }

    if (!this._clearMaterial) {
      this._clearMaterial = _materialVariant["default"].createWithBuiltin('clear-stencil', this);
    }

    this.setMaterial(0, material);
    this._graphics._materials[0] = material;

    this._updateMaterial();
  },
  _updateMaterial: function _updateMaterial() {
    var material = this._materials[0];
    if (!material) return;

    if (this._type === MaskType.IMAGE_STENCIL && this.spriteFrame) {
      var texture = this.spriteFrame.getTexture();
      material.setProperty('texture', texture);
    }

    material.setProperty('alphaThreshold', this.alphaThreshold);
  },
  _createGraphics: function _createGraphics() {
    if (!this._graphics) {
      this._graphics = new Graphics();
      cc.Assembler.init(this._graphics);
      this._graphics.node = this.node;
      this._graphics.lineWidth = 0;
      this._graphics.strokeColor = cc.color(0, 0, 0, 0);
    }
  },
  _updateGraphics: function _updateGraphics() {
    var node = this.node;
    var graphics = this._graphics; // Share render data with graphics content

    graphics.clear(false);
    var width = node._contentSize.width;
    var height = node._contentSize.height;
    var x = -width * node._anchorPoint.x;
    var y = -height * node._anchorPoint.y;

    if (this._type === MaskType.RECT) {
      graphics.rect(x, y, width, height);
    } else if (this._type === MaskType.ELLIPSE) {
      var center = cc.v2(x + width / 2, y + height / 2);
      var radius = {
        x: width / 2,
        y: height / 2
      };

      var points = _calculateCircle(center, radius, this._segments);

      for (var i = 0; i < points.length; ++i) {
        var point = points[i];

        if (i === 0) {
          graphics.moveTo(point.x, point.y);
        } else {
          graphics.lineTo(point.x, point.y);
        }
      }

      graphics.close();
    }

    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
      graphics.stroke();
    } else {
      graphics.fill();
    }
  },
  _removeGraphics: function _removeGraphics() {
    if (this._graphics) {
      this._graphics.destroy();

      this._graphics._destroyImmediate(); // FIX: cocos-creator/2d-tasks#2511. TODO: cocos-creator/2d-tasks#2516


      this._graphics = null;
    }
  },
  _hitTest: function _hitTest(cameraPt) {
    var node = this.node;
    var size = node.getContentSize(),
        w = size.width,
        h = size.height,
        testPt = _vec2_temp;

    node._updateWorldMatrix(); // If scale is 0, it can't be hit.


    if (!_mat["default"].invert(_mat4_temp, node._worldMatrix)) {
      return false;
    }

    _vec["default"].transformMat4(testPt, cameraPt, _mat4_temp);

    testPt.x += node._anchorPoint.x * w;
    testPt.y += node._anchorPoint.y * h;
    var result = false;

    if (this.type === MaskType.RECT || this.type === MaskType.IMAGE_STENCIL) {
      result = testPt.x >= 0 && testPt.y >= 0 && testPt.x <= w && testPt.y <= h;
    } else if (this.type === MaskType.ELLIPSE) {
      var rx = w / 2,
          ry = h / 2;
      var px = testPt.x - 0.5 * w,
          py = testPt.y - 0.5 * h;
      result = px * px / (rx * rx) + py * py / (ry * ry) < 1;
    }

    if (this.inverted) {
      result = !result;
    }

    return result;
  },
  markForRender: function markForRender(enable) {
    var flag = RenderFlow.FLAG_RENDER | RenderFlow.FLAG_UPDATE_RENDER_DATA | RenderFlow.FLAG_POST_RENDER;

    if (enable) {
      this.node._renderFlag |= flag;
      this.markForValidate();
    } else if (!enable) {
      this.node._renderFlag &= ~flag;
    }
  },
  disableRender: function disableRender() {
    this.node._renderFlag &= ~(RenderFlow.FLAG_RENDER | RenderFlow.FLAG_UPDATE_RENDER_DATA | RenderFlow.FLAG_POST_RENDER);
  }
});
cc.Mask = module.exports = Mask;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NNYXNrLmpzIl0sIm5hbWVzIjpbIm1pc2MiLCJyZXF1aXJlIiwiUmVuZGVyQ29tcG9uZW50IiwiUmVuZGVyRmxvdyIsIkdyYXBoaWNzIiwiX3ZlYzJfdGVtcCIsIlZlYzIiLCJfbWF0NF90ZW1wIiwiTWF0NCIsIl9jaXJjbGVwb2ludHMiLCJfY2FsY3VsYXRlQ2lyY2xlIiwiY2VudGVyIiwicmFkaXVzIiwic2VnZW1lbnRzIiwibGVuZ3RoIiwiYW5nbGVQZXJTdGVwIiwiTWF0aCIsIlBJIiwic3RlcCIsInB1c2giLCJjYyIsInYyIiwieCIsImNvcyIsInkiLCJzaW4iLCJNYXNrVHlwZSIsIkVudW0iLCJSRUNUIiwiRUxMSVBTRSIsIklNQUdFX1NURU5DSUwiLCJTRUdFTUVOVFNfTUlOIiwiU0VHRU1FTlRTX01BWCIsIk1hc2siLCJDbGFzcyIsIm5hbWUiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwiaGVscCIsImluc3BlY3RvciIsImN0b3IiLCJfZ3JhcGhpY3MiLCJfZW5hYmxlTWF0ZXJpYWwiLCJfZXhpdE1hdGVyaWFsIiwiX2NsZWFyTWF0ZXJpYWwiLCJwcm9wZXJ0aWVzIiwiX3Nwcml0ZUZyYW1lIiwidHlwZSIsIlNwcml0ZUZyYW1lIiwiX3R5cGUiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsIl9yZXNldEFzc2VtYmxlciIsInNwcml0ZUZyYW1lIiwiYWxwaGFUaHJlc2hvbGQiLCJfdXBkYXRlR3JhcGhpY3MiLCJfYWN0aXZhdGVNYXRlcmlhbCIsInRvb2x0aXAiLCJDQ19ERVYiLCJsYXN0U3ByaXRlIiwiX3V1aWQiLCJzZXRWZXJ0c0RpcnR5IiwiX3VwZGF0ZU1hdGVyaWFsIiwiRmxvYXQiLCJyYW5nZSIsInNsaWRlIiwibm90aWZ5IiwiZ2FtZSIsInJlbmRlclR5cGUiLCJSRU5ERVJfVFlQRV9DQU5WQVMiLCJ3YXJuSUQiLCJpbnZlcnRlZCIsIkJvb2xlYW4iLCJfc2VnbWVudHMiLCJjbGFtcGYiLCJJbnRlZ2VyIiwiX3Jlc2l6ZVRvVGFyZ2V0IiwiYW5pbWF0YWJsZSIsIl9yZXNpemVOb2RlVG9UYXJnZXROb2RlIiwic3RhdGljcyIsIlR5cGUiLCJvblJlc3RvcmUiLCJvbkVuYWJsZSIsIl9zdXBlciIsIm5vZGUiLCJvbiIsIk5vZGUiLCJFdmVudFR5cGUiLCJQT1NJVElPTl9DSEFOR0VEIiwiUk9UQVRJT05fQ0hBTkdFRCIsIlNDQUxFX0NIQU5HRUQiLCJTSVpFX0NIQU5HRUQiLCJBTkNIT1JfQ0hBTkdFRCIsIm9uRGlzYWJsZSIsIm9mZiIsIl9yZW5kZXJGbGFnIiwiRkxBR19QT1NUX1JFTkRFUiIsIm9uRGVzdHJveSIsIl9yZW1vdmVHcmFwaGljcyIsInJlY3QiLCJnZXRSZWN0Iiwic2V0Q29udGVudFNpemUiLCJ3aWR0aCIsImhlaWdodCIsIl92YWxpZGF0ZVJlbmRlciIsInRleHR1cmVMb2FkZWQiLCJkaXNhYmxlUmVuZGVyIiwiX2NyZWF0ZUdyYXBoaWNzIiwibWF0ZXJpYWwiLCJfbWF0ZXJpYWxzIiwiTWF0ZXJpYWxWYXJpYW50IiwiY3JlYXRlV2l0aEJ1aWx0aW4iLCJjcmVhdGUiLCJkZWZpbmUiLCJzZXRTdGVuY2lsRW5hYmxlZCIsImdmeCIsIlNURU5DSUxfRElTQUJMRSIsInNldE1hdGVyaWFsIiwidGV4dHVyZSIsImdldFRleHR1cmUiLCJzZXRQcm9wZXJ0eSIsIkFzc2VtYmxlciIsImluaXQiLCJsaW5lV2lkdGgiLCJzdHJva2VDb2xvciIsImNvbG9yIiwiZ3JhcGhpY3MiLCJjbGVhciIsIl9jb250ZW50U2l6ZSIsIl9hbmNob3JQb2ludCIsInBvaW50cyIsImkiLCJwb2ludCIsIm1vdmVUbyIsImxpbmVUbyIsImNsb3NlIiwic3Ryb2tlIiwiZmlsbCIsImRlc3Ryb3kiLCJfZGVzdHJveUltbWVkaWF0ZSIsIl9oaXRUZXN0IiwiY2FtZXJhUHQiLCJzaXplIiwiZ2V0Q29udGVudFNpemUiLCJ3IiwiaCIsInRlc3RQdCIsIl91cGRhdGVXb3JsZE1hdHJpeCIsImludmVydCIsIl93b3JsZE1hdHJpeCIsInRyYW5zZm9ybU1hdDQiLCJyZXN1bHQiLCJyeCIsInJ5IiwicHgiLCJweSIsIm1hcmtGb3JSZW5kZXIiLCJlbmFibGUiLCJmbGFnIiwiRkxBR19SRU5ERVIiLCJGTEFHX1VQREFURV9SRU5ERVJfREFUQSIsIm1hcmtGb3JWYWxpZGF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUEwQkE7O0FBT0E7O0FBQ0E7O0FBQ0E7Ozs7QUFuQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QkEsSUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsZUFBRCxDQUFwQjs7QUFDQSxJQUFNQyxlQUFlLEdBQUdELE9BQU8sQ0FBQyxxQkFBRCxDQUEvQjs7QUFDQSxJQUFNRSxVQUFVLEdBQUdGLE9BQU8sQ0FBQyx5QkFBRCxDQUExQjs7QUFDQSxJQUFNRyxRQUFRLEdBQUdILE9BQU8sQ0FBQyxzQkFBRCxDQUF4Qjs7QUFNQSxJQUFJSSxVQUFVLEdBQUcsSUFBSUMsZUFBSixFQUFqQjs7QUFDQSxJQUFJQyxVQUFVLEdBQUcsSUFBSUMsZUFBSixFQUFqQjs7QUFFQSxJQUFJQyxhQUFhLEdBQUUsRUFBbkI7O0FBQ0EsU0FBU0MsZ0JBQVQsQ0FBMkJDLE1BQTNCLEVBQW1DQyxNQUFuQyxFQUEyQ0MsU0FBM0MsRUFBc0Q7QUFDbERKLEVBQUFBLGFBQWEsQ0FBQ0ssTUFBZCxHQUF1QixDQUF2QjtBQUNBLE1BQUlDLFlBQVksR0FBR0MsSUFBSSxDQUFDQyxFQUFMLEdBQVUsQ0FBVixHQUFjSixTQUFqQzs7QUFDQSxPQUFLLElBQUlLLElBQUksR0FBRyxDQUFoQixFQUFtQkEsSUFBSSxHQUFHTCxTQUExQixFQUFxQyxFQUFFSyxJQUF2QyxFQUE2QztBQUN6Q1QsSUFBQUEsYUFBYSxDQUFDVSxJQUFkLENBQW1CQyxFQUFFLENBQUNDLEVBQUgsQ0FBTVQsTUFBTSxDQUFDVSxDQUFQLEdBQVdOLElBQUksQ0FBQ08sR0FBTCxDQUFTUixZQUFZLEdBQUdH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RUFBbUI7QUFDZmdGLE1BQUFBLE1BQU0sR0FBRyxDQUFDQSxNQUFWO0FBQ0g7O0FBQ0QsV0FBT0EsTUFBUDtBQUNILEdBOVdlO0FBZ1hoQkssRUFBQUEsYUFoWGdCLHlCQWdYREMsTUFoWEMsRUFnWE87QUFDbkIsUUFBSUMsSUFBSSxHQUFHN0osVUFBVSxDQUFDOEosV0FBWCxHQUF5QjlKLFVBQVUsQ0FBQytKLHVCQUFwQyxHQUE4RC9KLFVBQVUsQ0FBQytGLGdCQUFwRjs7QUFDQSxRQUFJNkQsTUFBSixFQUFZO0FBQ1IsV0FBS3pFLElBQUwsQ0FBVVcsV0FBVixJQUF5QitELElBQXpCO0FBQ0EsV0FBS0csZUFBTDtBQUNILEtBSEQsTUFJSyxJQUFJLENBQUNKLE1BQUwsRUFBYTtBQUNkLFdBQUt6RSxJQUFMLENBQVVXLFdBQVYsSUFBeUIsQ0FBQytELElBQTFCO0FBQ0g7QUFDSixHQXpYZTtBQTJYaEJwRCxFQUFBQSxhQTNYZ0IsMkJBMlhDO0FBQ2IsU0FBS3RCLElBQUwsQ0FBVVcsV0FBVixJQUF5QixFQUFFOUYsVUFBVSxDQUFDOEosV0FBWCxHQUF5QjlKLFVBQVUsQ0FBQytKLHVCQUFwQyxHQUNBL0osVUFBVSxDQUFDK0YsZ0JBRGIsQ0FBekI7QUFFSDtBQTlYZSxDQUFULENBQVg7QUFpWUE5RSxFQUFFLENBQUNhLElBQUgsR0FBVW1JLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnBJLElBQTNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgZ2Z4IGZyb20gJy4uLy4uL3JlbmRlcmVyL2dmeCc7XG5cbmNvbnN0IG1pc2MgPSByZXF1aXJlKCcuLi91dGlscy9taXNjJyk7XG5jb25zdCBSZW5kZXJDb21wb25lbnQgPSByZXF1aXJlKCcuL0NDUmVuZGVyQ29tcG9uZW50Jyk7XG5jb25zdCBSZW5kZXJGbG93ID0gcmVxdWlyZSgnLi4vcmVuZGVyZXIvcmVuZGVyLWZsb3cnKTtcbmNvbnN0IEdyYXBoaWNzID0gcmVxdWlyZSgnLi4vZ3JhcGhpY3MvZ3JhcGhpY3MnKTtcblxuaW1wb3J0IE1hdDQgZnJvbSAnLi4vdmFsdWUtdHlwZXMvbWF0NCc7XG5pbXBvcnQgVmVjMiBmcm9tICcuLi92YWx1ZS10eXBlcy92ZWMyJztcbmltcG9ydCBNYXRlcmlhbFZhcmlhbnQgZnJvbSAnLi4vYXNzZXRzL21hdGVyaWFsL21hdGVyaWFsLXZhcmlhbnQnO1xuXG5sZXQgX3ZlYzJfdGVtcCA9IG5ldyBWZWMyKCk7XG5sZXQgX21hdDRfdGVtcCA9IG5ldyBNYXQ0KCk7XG5cbmxldCBfY2lyY2xlcG9pbnRzID1bXTtcbmZ1bmN0aW9uIF9jYWxjdWxhdGVDaXJjbGUgKGNlbnRlciwgcmFkaXVzLCBzZWdlbWVudHMpIHtcbiAgICBfY2lyY2xlcG9pbnRzLmxlbmd0aCA9IDA7XG4gICAgbGV0IGFuZ2xlUGVyU3RlcCA9IE1hdGguUEkgKiAyIC8gc2VnZW1lbnRzO1xuICAgIGZvciAobGV0IHN0ZXAgPSAwOyBzdGVwIDwgc2VnZW1lbnRzOyArK3N0ZXApIHtcbiAgICAgICAgX2NpcmNsZXBvaW50cy5wdXNoKGNjLnYyKHJhZGl1cy54ICogTWF0aC5jb3MoYW5nbGVQZXJTdGVwICogc3RlcCkgKyBjZW50ZXIueCxcbiAgICAgICAgICAgIHJhZGl1cy55ICogTWF0aC5zaW4oYW5nbGVQZXJTdGVwICogc3RlcCkgKyBjZW50ZXIueSkpO1xuICAgIH1cblxuICAgIHJldHVybiBfY2lyY2xlcG9pbnRzO1xufVxuXG4vKipcbiAqICEjZW4gdGhlIHR5cGUgZm9yIG1hc2suXG4gKiAhI3poIOmBrue9qee7hOS7tuexu+Wei1xuICogQGVudW0gTWFzay5UeXBlXG4gKi9cbmxldCBNYXNrVHlwZSA9IGNjLkVudW0oe1xuICAgIC8qKlxuICAgICAqICEjZW4gUmVjdCBtYXNrLlxuICAgICAqICEjemgg5L2/55So55+p5b2i5L2c5Li66YGu572pXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFJFQ1RcbiAgICAgKi9cbiAgICBSRUNUOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gRWxsaXBzZSBNYXNrLlxuICAgICAqICEjemgg5L2/55So5qSt5ZyG5L2c5Li66YGu572pXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEVMTElQU0VcbiAgICAgKi9cbiAgICBFTExJUFNFOiAxLFxuICAgIC8qKlxuICAgICAqICEjZW4gSW1hZ2UgU3RlbmNpbCBNYXNrLlxuICAgICAqICEjemgg5L2/55So5Zu+5YOP5qih54mI5L2c5Li66YGu572pXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IElNQUdFX1NURU5DSUxcbiAgICAgKi9cbiAgICBJTUFHRV9TVEVOQ0lMOiAyLFxufSk7XG5cbmNvbnN0IFNFR0VNRU5UU19NSU4gPSAzO1xuY29uc3QgU0VHRU1FTlRTX01BWCA9IDEwMDAwO1xuXG4vKipcbiAqICEjZW4gVGhlIE1hc2sgQ29tcG9uZW50XG4gKiAhI3poIOmBrue9qee7hOS7tlxuICogQGNsYXNzIE1hc2tcbiAqIEBleHRlbmRzIFJlbmRlckNvbXBvbmVudFxuICovXG5sZXQgTWFzayA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuTWFzaycsXG4gICAgZXh0ZW5kczogUmVuZGVyQ29tcG9uZW50LFxuXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnJlbmRlcmVycy9NYXNrJyxcbiAgICAgICAgaGVscDogJ2kxOG46Q09NUE9ORU5ULmhlbHBfdXJsLm1hc2snLFxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL21hc2suanMnXG4gICAgfSxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICB0aGlzLl9ncmFwaGljcyA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fZW5hYmxlTWF0ZXJpYWwgPSBudWxsO1xuICAgICAgICB0aGlzLl9leGl0TWF0ZXJpYWwgPSBudWxsO1xuICAgICAgICB0aGlzLl9jbGVhck1hdGVyaWFsID0gbnVsbDtcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfc3ByaXRlRnJhbWU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBtYXNrIHR5cGUuXG4gICAgICAgICAqICEjemgg6YGu572p57G75Z6LXG4gICAgICAgICAqIEBwcm9wZXJ0eSB0eXBlXG4gICAgICAgICAqIEB0eXBlIHtNYXNrLlR5cGV9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG1hc2sudHlwZSA9IGNjLk1hc2suVHlwZS5SRUNUO1xuICAgICAgICAgKi9cbiAgICAgICAgX3R5cGU6IE1hc2tUeXBlLlJFQ1QsXG4gICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3R5cGUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0QXNzZW1ibGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fdHlwZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90eXBlICE9PSBNYXNrVHlwZS5JTUFHRV9TVEVOQ0lMKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlRnJhbWUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFscGhhVGhyZXNob2xkID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlR3JhcGhpY3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZhdGVNYXRlcmlhbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IE1hc2tUeXBlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5tYXNrLnR5cGUnLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBtYXNrIGltYWdlXG4gICAgICAgICAqICEjemgg6YGu572p5omA6ZyA6KaB55qE6LS05Zu+XG4gICAgICAgICAqIEBwcm9wZXJ0eSBzcHJpdGVGcmFtZVxuICAgICAgICAgKiBAdHlwZSB7U3ByaXRlRnJhbWV9XG4gICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbWFzay5zcHJpdGVGcmFtZSA9IG5ld1Nwcml0ZUZyYW1lO1xuICAgICAgICAgKi9cbiAgICAgICAgc3ByaXRlRnJhbWU6IHtcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5tYXNrLnNwcml0ZUZyYW1lJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcHJpdGVGcmFtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGxldCBsYXN0U3ByaXRlID0gdGhpcy5fc3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGxhc3RTcHJpdGUgJiYgbGFzdFNwcml0ZS5fdXVpZCkgPT09ICh2YWx1ZSAmJiB2YWx1ZS5fdXVpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RTcHJpdGUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlRnJhbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVNYXRlcmlhbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgYWxwaGEgdGhyZXNob2xkLihOb3Qgc3VwcG9ydGVkIENhbnZhcyBNb2RlKSA8YnIvPlxuICAgICAgICAgKiBUaGUgY29udGVudCBpcyBkcmF3biBvbmx5IHdoZXJlIHRoZSBzdGVuY2lsIGhhdmUgcGl4ZWwgd2l0aCBhbHBoYSBncmVhdGVyIHRoYW4gdGhlIGFscGhhVGhyZXNob2xkLiA8YnIvPlxuICAgICAgICAgKiBTaG91bGQgYmUgYSBmbG9hdCBiZXR3ZWVuIDAgYW5kIDEuIDxici8+XG4gICAgICAgICAqIFRoaXMgZGVmYXVsdCB0byAwLjEuXG4gICAgICAgICAqIFdoZW4gaXQncyBzZXQgdG8gMSwgdGhlIHN0ZW5jaWwgd2lsbCBkaXNjYXJkIGFsbCBwaXhlbHMsIG5vdGhpbmcgd2lsbCBiZSBzaG93bi5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiBBbHBoYSDpmIjlgLzvvIjkuI3mlK/mjIEgQ2FudmFzIOaooeW8j++8iTxici8+XG4gICAgICAgICAqIOWPquacieW9k+aooeadv+eahOWDj+e0oOeahCBhbHBoYSDlpKfkuo7nrYnkuo4gYWxwaGFUaHJlc2hvbGQg5pe277yM5omN5Lya57uY5Yi25YaF5a6544CCPGJyLz5cbiAgICAgICAgICog6K+l5pWw5YC8IDAgfiAxIOS5i+mXtOeahOa1rueCueaVsO+8jOm7mOiupOWAvOS4uiAwLjFcbiAgICAgICAgICog5b2T6KKr6K6+572u5Li6IDEg5pe277yM5Lya5Lii5byD5omA5pyJ6JKZ54mI5YOP57Sg77yM5omA5Lul5LiN5Lya5pi+56S65Lu75L2V5YaF5a65XG4gICAgICAgICAqIEBwcm9wZXJ0eSBhbHBoYVRocmVzaG9sZFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZGVmYXVsdCAwLjFcbiAgICAgICAgICovXG4gICAgICAgIGFscGhhVGhyZXNob2xkOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAwLjEsXG4gICAgICAgICAgICB0eXBlOiBjYy5GbG9hdCxcbiAgICAgICAgICAgIHJhbmdlOiBbMCwgMSwgMC4xXSxcbiAgICAgICAgICAgIHNsaWRlOiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5tYXNrLmFscGhhVGhyZXNob2xkJyxcbiAgICAgICAgICAgIG5vdGlmeTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjYy5nYW1lLnJlbmRlclR5cGUgPT09IGNjLmdhbWUuUkVOREVSX1RZUEVfQ0FOVkFTKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm5JRCg0MjAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVNYXRlcmlhbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFJldmVyc2UgbWFzayAoTm90IHN1cHBvcnRlZCBDYW52YXMgTW9kZSlcbiAgICAgICAgICogISN6aCDlj43lkJHpga7nvanvvIjkuI3mlK/mjIEgQ2FudmFzIOaooeW8j++8iVxuICAgICAgICAgKiBAcHJvcGVydHkgaW52ZXJ0ZWRcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBpbnZlcnRlZDoge1xuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5tYXNrLmludmVydGVkJyxcbiAgICAgICAgICAgIG5vdGlmeTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjYy5nYW1lLnJlbmRlclR5cGUgPT09IGNjLmdhbWUuUkVOREVSX1RZUEVfQ0FOVkFTKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm5JRCg0MjAyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRPRE86IHJlbW92ZSBzZWdtZW50cywgbm90IHN1cHBvcnRlZCBieSBncmFwaGljc1xuICAgICAgICAgKiAhI2VuIFRoZSBzZWdlbWVudHMgZm9yIGVsbGlwc2UgbWFzay5cbiAgICAgICAgICogISN6aCDmpK3lnIbpga7nvannmoTmm7Lnur/nu4bliIbmlbBcbiAgICAgICAgICogQHByb3BlcnR5IHNlZ2VtZW50c1xuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZGVmYXVsdCA2NFxuICAgICAgICAgKi9cbiAgICAgICAgX3NlZ21lbnRzOiA2NCxcbiAgICAgICAgc2VnZW1lbnRzOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VnbWVudHM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50cyA9IG1pc2MuY2xhbXBmKHZhbHVlLCBTRUdFTUVOVFNfTUlOLCBTRUdFTUVOVFNfTUFYKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVHcmFwaGljcygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULm1hc2suc2VnZW1lbnRzJyxcbiAgICAgICAgfSxcblxuICAgICAgICBfcmVzaXplVG9UYXJnZXQ6IHtcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNpemVOb2RlVG9UYXJnZXROb2RlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgVHlwZTogTWFza1R5cGUsXG4gICAgfSxcblxuICAgIG9uUmVzdG9yZSAoKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2YXRlTWF0ZXJpYWwoKTtcbiAgICB9LFxuXG4gICAgb25FbmFibGUgKCkge1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICBpZiAodGhpcy5fdHlwZSAhPT0gTWFza1R5cGUuSU1BR0VfU1RFTkNJTCkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlR3JhcGhpY3MoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELCB0aGlzLl91cGRhdGVHcmFwaGljcywgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5ST1RBVElPTl9DSEFOR0VELCB0aGlzLl91cGRhdGVHcmFwaGljcywgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5TQ0FMRV9DSEFOR0VELCB0aGlzLl91cGRhdGVHcmFwaGljcywgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5TSVpFX0NIQU5HRUQsIHRoaXMuX3VwZGF0ZUdyYXBoaWNzLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLkFOQ0hPUl9DSEFOR0VELCB0aGlzLl91cGRhdGVHcmFwaGljcywgdGhpcyk7XG4gICAgfSxcblxuICAgIG9uRGlzYWJsZSAoKSB7XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELCB0aGlzLl91cGRhdGVHcmFwaGljcywgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuUk9UQVRJT05fQ0hBTkdFRCwgdGhpcy5fdXBkYXRlR3JhcGhpY3MsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlNDQUxFX0NIQU5HRUQsIHRoaXMuX3VwZGF0ZUdyYXBoaWNzLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5TSVpFX0NIQU5HRUQsIHRoaXMuX3VwZGF0ZUdyYXBoaWNzLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgdGhpcy5fdXBkYXRlR3JhcGhpY3MsIHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ub2RlLl9yZW5kZXJGbGFnICY9IH5SZW5kZXJGbG93LkZMQUdfUE9TVF9SRU5ERVI7XG4gICAgfSxcblxuICAgIG9uRGVzdHJveSAoKSB7XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICAgIHRoaXMuX3JlbW92ZUdyYXBoaWNzKCk7XG4gICAgfSxcblxuICAgIF9yZXNpemVOb2RlVG9UYXJnZXROb2RlOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZih0aGlzLnNwcml0ZUZyYW1lKSB7XG4gICAgICAgICAgICBsZXQgcmVjdCA9IHRoaXMuc3ByaXRlRnJhbWUuZ2V0UmVjdCgpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdmFsaWRhdGVSZW5kZXIgKCkge1xuICAgICAgICBpZiAodGhpcy5fdHlwZSAhPT0gTWFza1R5cGUuSU1BR0VfU1RFTkNJTCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBzcHJpdGVGcmFtZSA9IHRoaXMuX3Nwcml0ZUZyYW1lO1xuICAgICAgICBpZiAoc3ByaXRlRnJhbWUgJiYgXG4gICAgICAgICAgICBzcHJpdGVGcmFtZS50ZXh0dXJlTG9hZGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xuICAgIH0sXG5cbiAgICBfYWN0aXZhdGVNYXRlcmlhbCAoKSB7XG4gICAgICAgIHRoaXMuX2NyZWF0ZUdyYXBoaWNzKCk7XG4gICAgICAgIFxuICAgICAgICAvLyBJbml0IG1hdGVyaWFsXG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMuX21hdGVyaWFsc1swXTtcbiAgICAgICAgaWYgKCFtYXRlcmlhbCkge1xuICAgICAgICAgICAgbWF0ZXJpYWwgPSBNYXRlcmlhbFZhcmlhbnQuY3JlYXRlV2l0aEJ1aWx0aW4oJzJkLXNwcml0ZScsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbWF0ZXJpYWwgPSBNYXRlcmlhbFZhcmlhbnQuY3JlYXRlKG1hdGVyaWFsLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hdGVyaWFsLmRlZmluZSgnVVNFX0FMUEhBX1RFU1QnLCB0cnVlKTtcblxuICAgICAgICAvLyBSZXNldCBtYXRlcmlhbFxuICAgICAgICBpZiAodGhpcy5fdHlwZSA9PT0gTWFza1R5cGUuSU1BR0VfU1RFTkNJTCkge1xuICAgICAgICAgICAgbWF0ZXJpYWwuZGVmaW5lKCdDQ19VU0VfTU9ERUwnLCBmYWxzZSk7XG4gICAgICAgICAgICBtYXRlcmlhbC5kZWZpbmUoJ1VTRV9URVhUVVJFJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtYXRlcmlhbC5kZWZpbmUoJ0NDX1VTRV9NT0RFTCcsIHRydWUpO1xuICAgICAgICAgICAgbWF0ZXJpYWwuZGVmaW5lKCdVU0VfVEVYVFVSRScsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fZW5hYmxlTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZU1hdGVyaWFsID0gTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZVdpdGhCdWlsdGluKCcyZC1zcHJpdGUnLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZiAoIXRoaXMuX2V4aXRNYXRlcmlhbCkge1xuICAgICAgICAgICAgdGhpcy5fZXhpdE1hdGVyaWFsID0gTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZVdpdGhCdWlsdGluKCcyZC1zcHJpdGUnLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX2V4aXRNYXRlcmlhbC5zZXRTdGVuY2lsRW5hYmxlZChnZnguU1RFTkNJTF9ESVNBQkxFKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fY2xlYXJNYXRlcmlhbCkge1xuICAgICAgICAgICAgdGhpcy5fY2xlYXJNYXRlcmlhbCA9IE1hdGVyaWFsVmFyaWFudC5jcmVhdGVXaXRoQnVpbHRpbignY2xlYXItc3RlbmNpbCcsIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRNYXRlcmlhbCgwLCBtYXRlcmlhbCk7XG5cbiAgICAgICAgdGhpcy5fZ3JhcGhpY3MuX21hdGVyaWFsc1swXSA9IG1hdGVyaWFsO1xuXG4gICAgICAgIHRoaXMuX3VwZGF0ZU1hdGVyaWFsKCk7XG4gICAgfSxcblxuICAgIF91cGRhdGVNYXRlcmlhbCAoKSB7XG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMuX21hdGVyaWFsc1swXTtcbiAgICAgICAgaWYgKCFtYXRlcmlhbCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0aGlzLl90eXBlID09PSBNYXNrVHlwZS5JTUFHRV9TVEVOQ0lMICYmIHRoaXMuc3ByaXRlRnJhbWUpIHtcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlID0gdGhpcy5zcHJpdGVGcmFtZS5nZXRUZXh0dXJlKCk7XG4gICAgICAgICAgICBtYXRlcmlhbC5zZXRQcm9wZXJ0eSgndGV4dHVyZScsIHRleHR1cmUpO1xuICAgICAgICB9XG4gICAgICAgIG1hdGVyaWFsLnNldFByb3BlcnR5KCdhbHBoYVRocmVzaG9sZCcsIHRoaXMuYWxwaGFUaHJlc2hvbGQpO1xuICAgIH0sXG5cbiAgICBfY3JlYXRlR3JhcGhpY3MgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2dyYXBoaWNzKSB7XG4gICAgICAgICAgICB0aGlzLl9ncmFwaGljcyA9IG5ldyBHcmFwaGljcygpO1xuICAgICAgICAgICAgY2MuQXNzZW1ibGVyLmluaXQodGhpcy5fZ3JhcGhpY3MpO1xuICAgICAgICAgICAgdGhpcy5fZ3JhcGhpY3Mubm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIHRoaXMuX2dyYXBoaWNzLmxpbmVXaWR0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9ncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDAsIDAsIDAsIDApO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF91cGRhdGVHcmFwaGljcyAoKSB7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5ub2RlO1xuICAgICAgICBsZXQgZ3JhcGhpY3MgPSB0aGlzLl9ncmFwaGljcztcbiAgICAgICAgLy8gU2hhcmUgcmVuZGVyIGRhdGEgd2l0aCBncmFwaGljcyBjb250ZW50XG4gICAgICAgIGdyYXBoaWNzLmNsZWFyKGZhbHNlKTtcbiAgICAgICAgbGV0IHdpZHRoID0gbm9kZS5fY29udGVudFNpemUud2lkdGg7XG4gICAgICAgIGxldCBoZWlnaHQgPSBub2RlLl9jb250ZW50U2l6ZS5oZWlnaHQ7XG4gICAgICAgIGxldCB4ID0gLXdpZHRoICogbm9kZS5fYW5jaG9yUG9pbnQueDtcbiAgICAgICAgbGV0IHkgPSAtaGVpZ2h0ICogbm9kZS5fYW5jaG9yUG9pbnQueTtcbiAgICAgICAgaWYgKHRoaXMuX3R5cGUgPT09IE1hc2tUeXBlLlJFQ1QpIHtcbiAgICAgICAgICAgIGdyYXBoaWNzLnJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5fdHlwZSA9PT0gTWFza1R5cGUuRUxMSVBTRSkge1xuICAgICAgICAgICAgbGV0IGNlbnRlciA9IGNjLnYyKHggKyB3aWR0aCAvIDIsIHkgKyBoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIGxldCByYWRpdXMgPSB7XG4gICAgICAgICAgICAgICAgeDogd2lkdGggLyAyLFxuICAgICAgICAgICAgICAgIHk6IGhlaWdodCAvIDJcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgcG9pbnRzID0gX2NhbGN1bGF0ZUNpcmNsZShjZW50ZXIsIHJhZGl1cywgdGhpcy5fc2VnbWVudHMpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgcG9pbnQgPSBwb2ludHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubW92ZVRvKHBvaW50LngsIHBvaW50LnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKHBvaW50LngsIHBvaW50LnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdyYXBoaWNzLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNjLmdhbWUucmVuZGVyVHlwZSA9PT0gY2MuZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMpIHtcbiAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9yZW1vdmVHcmFwaGljcyAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9ncmFwaGljcykge1xuICAgICAgICAgICAgdGhpcy5fZ3JhcGhpY3MuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5fZ3JhcGhpY3MuX2Rlc3Ryb3lJbW1lZGlhdGUoKTsgLy8gRklYOiBjb2Nvcy1jcmVhdG9yLzJkLXRhc2tzIzI1MTEuIFRPRE86IGNvY29zLWNyZWF0b3IvMmQtdGFza3MjMjUxNlxuICAgICAgICAgICAgdGhpcy5fZ3JhcGhpY3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9oaXRUZXN0IChjYW1lcmFQdCkge1xuICAgICAgICBsZXQgbm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgbGV0IHNpemUgPSBub2RlLmdldENvbnRlbnRTaXplKCksXG4gICAgICAgICAgICB3ID0gc2l6ZS53aWR0aCxcbiAgICAgICAgICAgIGggPSBzaXplLmhlaWdodCxcbiAgICAgICAgICAgIHRlc3RQdCA9IF92ZWMyX3RlbXA7XG4gICAgICAgIFxuICAgICAgICBub2RlLl91cGRhdGVXb3JsZE1hdHJpeCgpO1xuICAgICAgICAvLyBJZiBzY2FsZSBpcyAwLCBpdCBjYW4ndCBiZSBoaXQuXG4gICAgICAgIGlmICghTWF0NC5pbnZlcnQoX21hdDRfdGVtcCwgbm9kZS5fd29ybGRNYXRyaXgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgVmVjMi50cmFuc2Zvcm1NYXQ0KHRlc3RQdCwgY2FtZXJhUHQsIF9tYXQ0X3RlbXApO1xuICAgICAgICB0ZXN0UHQueCArPSBub2RlLl9hbmNob3JQb2ludC54ICogdztcbiAgICAgICAgdGVzdFB0LnkgKz0gbm9kZS5fYW5jaG9yUG9pbnQueSAqIGg7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSBNYXNrVHlwZS5SRUNUIHx8IHRoaXMudHlwZSA9PT0gTWFza1R5cGUuSU1BR0VfU1RFTkNJTCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGVzdFB0LnggPj0gMCAmJiB0ZXN0UHQueSA+PSAwICYmIHRlc3RQdC54IDw9IHcgJiYgdGVzdFB0LnkgPD0gaDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT09IE1hc2tUeXBlLkVMTElQU0UpIHtcbiAgICAgICAgICAgIGxldCByeCA9IHcgLyAyLCByeSA9IGggLyAyO1xuICAgICAgICAgICAgbGV0IHB4ID0gdGVzdFB0LnggLSAwLjUgKiB3LCBweSA9IHRlc3RQdC55IC0gMC41ICogaDtcbiAgICAgICAgICAgIHJlc3VsdCA9IHB4ICogcHggLyAocnggKiByeCkgKyBweSAqIHB5IC8gKHJ5ICogcnkpIDwgMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pbnZlcnRlZCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gIXJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBtYXJrRm9yUmVuZGVyIChlbmFibGUpIHtcbiAgICAgICAgbGV0IGZsYWcgPSBSZW5kZXJGbG93LkZMQUdfUkVOREVSIHwgUmVuZGVyRmxvdy5GTEFHX1VQREFURV9SRU5ERVJfREFUQSB8IFJlbmRlckZsb3cuRkxBR19QT1NUX1JFTkRFUjtcbiAgICAgICAgaWYgKGVuYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLl9yZW5kZXJGbGFnIHw9IGZsYWc7XG4gICAgICAgICAgICB0aGlzLm1hcmtGb3JWYWxpZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFlbmFibGUpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5fcmVuZGVyRmxhZyAmPSB+ZmxhZztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkaXNhYmxlUmVuZGVyICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLl9yZW5kZXJGbGFnICY9IH4oUmVuZGVyRmxvdy5GTEFHX1JFTkRFUiB8IFJlbmRlckZsb3cuRkxBR19VUERBVEVfUkVOREVSX0RBVEEgfCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVuZGVyRmxvdy5GTEFHX1BPU1RfUkVOREVSKTtcbiAgICB9LFxufSk7XG5cbmNjLk1hc2sgPSBtb2R1bGUuZXhwb3J0cyA9IE1hc2s7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==