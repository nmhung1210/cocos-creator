
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/graphics/graphics.js';
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
var RenderComponent = require('../components/CCRenderComponent');

var Material = require('../assets/material/CCMaterial');

var Types = require('./types');

var LineCap = Types.LineCap;
var LineJoin = Types.LineJoin;
/**
 * @class Graphics
 * @extends RenderComponent
 */

var Graphics = cc.Class({
  name: 'cc.Graphics',
  "extends": RenderComponent,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/Graphics'
  },
  ctor: function ctor() {
    this._impl = new Graphics._Impl(this);
  },
  properties: {
    _lineWidth: 2,
    _strokeColor: cc.Color.BLACK,
    _lineJoin: LineJoin.MITER,
    _lineCap: LineCap.BUTT,
    _fillColor: cc.Color.WHITE,
    _miterLimit: 10,

    /**
     * !#en
     * Current line width.
     * !#zh
     * 当前线条宽度
     * @property {Number} lineWidth
     * @default 1
     */
    lineWidth: {
      get: function get() {
        return this._lineWidth;
      },
      set: function set(value) {
        this._lineWidth = value;
        this._impl.lineWidth = value;
      }
    },

    /**
     * !#en
     * lineJoin determines how two connecting segments (of lines, arcs or curves) with non-zero lengths in a shape are joined together.
     * !#zh
     * lineJoin 用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性。
     * @property {Graphics.LineJoin} lineJoin
     * @default LineJoin.MITER
     */
    lineJoin: {
      get: function get() {
        return this._lineJoin;
      },
      set: function set(value) {
        this._lineJoin = value;
        this._impl.lineJoin = value;
      },
      type: LineJoin
    },

    /**
     * !#en
     * lineCap determines how the end points of every line are drawn.
     * !#zh
     * lineCap 指定如何绘制每一条线段末端。
     * @property {Graphics.LineCap} lineCap
     * @default LineCap.BUTT
     */
    lineCap: {
      get: function get() {
        return this._lineCap;
      },
      set: function set(value) {
        this._lineCap = value;
        this._impl.lineCap = value;
      },
      type: LineCap
    },

    /**
     * !#en
     * stroke color
     * !#zh
     * 线段颜色
     * @property {Color} strokeColor
     * @default Color.BLACK
     */
    strokeColor: {
      get: function get() {
        return this._strokeColor;
      },
      set: function set(value) {
        this._impl.strokeColor = this._strokeColor = cc.color(value);
      }
    },

    /**
     * !#en
     * fill color
     * !#zh
     * 填充颜色
     * @property {Color} fillColor
     * @default Color.WHITE
     */
    fillColor: {
      get: function get() {
        return this._fillColor;
      },
      set: function set(value) {
        this._impl.fillColor = this._fillColor = cc.color(value);
      }
    },

    /**
     * !#en
     * Sets the miter limit ratio
     * !#zh
     * 设置斜接面限制比例
     * @property {Number} miterLimit
     * @default 10
     */
    miterLimit: {
      get: function get() {
        return this._miterLimit;
      },
      set: function set(value) {
        this._miterLimit = value;
        this._impl.miterLimit = value;
      }
    }
  },
  statics: {
    LineJoin: LineJoin,
    LineCap: LineCap
  },
  onRestore: function onRestore() {
    if (!this._impl) {
      this._impl = new Graphics._Impl(this);
    }
  },
  onDestroy: function onDestroy() {
    this.clear(true);

    this._super();

    this._impl = null;
  },
  _getDefaultMaterial: function _getDefaultMaterial() {
    return Material.getBuiltinMaterial('2d-graphics');
  },
  _updateMaterial: function _updateMaterial() {
    var material = this._materials[0];
    if (!material) return;

    if (material.getDefine('CC_USE_MODEL') !== undefined) {
      material.define('CC_USE_MODEL', true);
    }

    if (material.getDefine('CC_SUPPORT_standard_derivatives') !== undefined && cc.sys.glExtension('OES_standard_derivatives')) {
      material.define('CC_SUPPORT_standard_derivatives', true);
    }
  },

  /**
   * !#en Move path start point to (x,y).
   * !#zh 移动路径起点到坐标(x, y)
   * @method moveTo
   * @param {Number} [x] The x axis of the coordinate for the end point.
   * @param {Number} [y] The y axis of the coordinate for the end point.
   */
  moveTo: function moveTo(x, y) {
    if (CC_DEBUG && x instanceof cc.Vec2) {
      cc.warn('[moveTo] : Can not pass Vec2 as [x, y] value, please check it.');
      return;
    }

    this._impl.moveTo(x, y);
  },

  /**
   * !#en Adds a straight line to the path
   * !#zh 绘制直线路径
   * @method lineTo
   * @param {Number} [x] The x axis of the coordinate for the end point.
   * @param {Number} [y] The y axis of the coordinate for the end point.
   */
  lineTo: function lineTo(x, y) {
    if (CC_DEBUG && x instanceof cc.Vec2) {
      cc.warn('[moveTo] : Can not pass Vec2 as [x, y] value, please check it.');
      return;
    }

    this._impl.lineTo(x, y);
  },

  /**
   * !#en Adds a cubic Bézier curve to the path
   * !#zh 绘制三次贝赛尔曲线路径
   * @method bezierCurveTo
   * @param {Number} [c1x] The x axis of the coordinate for the first control point.
   * @param {Number} [c1y] The y axis of the coordinate for first control point.
   * @param {Number} [c2x] The x axis of the coordinate for the second control point.
   * @param {Number} [c2y] The y axis of the coordinate for the second control point.
   * @param {Number} [x] The x axis of the coordinate for the end point.
   * @param {Number} [y] The y axis of the coordinate for the end point.
   */
  bezierCurveTo: function bezierCurveTo(c1x, c1y, c2x, c2y, x, y) {
    this._impl.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
  },

  /**
   * !#en Adds a quadratic Bézier curve to the path
   * !#zh 绘制二次贝赛尔曲线路径
   * @method quadraticCurveTo
   * @param {Number} [cx] The x axis of the coordinate for the control point.
   * @param {Number} [cy] The y axis of the coordinate for the control point.
   * @param {Number} [x] The x axis of the coordinate for the end point.
   * @param {Number} [y] The y axis of the coordinate for the end point.
   */
  quadraticCurveTo: function quadraticCurveTo(cx, cy, x, y) {
    this._impl.quadraticCurveTo(cx, cy, x, y);
  },

  /**
   * !#en Adds an arc to the path which is centered at (cx, cy) position with radius r starting at startAngle and ending at endAngle going in the given direction by counterclockwise (defaulting to false).
   * !#zh 绘制圆弧路径。圆弧路径的圆心在 (cx, cy) 位置，半径为 r ，根据 counterclockwise （默认为false）指定的方向从 startAngle 开始绘制，到 endAngle 结束。
   * @method arc
   * @param {Number} [cx] The x axis of the coordinate for the center point.
   * @param {Number} [cy] The y axis of the coordinate for the center point.
   * @param {Number} [r] The arc's radius.
   * @param {Number} [startAngle] The angle at which the arc starts, measured clockwise from the positive x axis and expressed in radians.
   * @param {Number} [endAngle] The angle at which the arc ends, measured clockwise from the positive x axis and expressed in radians.
   * @param {Boolean} [counterclockwise] An optional Boolean which, if true, causes the arc to be drawn counter-clockwise between the two angles. By default it is drawn clockwise.
   */
  arc: function arc(cx, cy, r, startAngle, endAngle, counterclockwise) {
    this._impl.arc(cx, cy, r, startAngle, endAngle, counterclockwise);
  },

  /**
   * !#en Adds an ellipse to the path.
   * !#zh 绘制椭圆路径。
   * @method ellipse
   * @param {Number} [cx] The x axis of the coordinate for the center point.
   * @param {Number} [cy] The y axis of the coordinate for the center point.
   * @param {Number} [rx] The ellipse's x-axis radius.
   * @param {Number} [ry] The ellipse's y-axis radius.
   */
  ellipse: function ellipse(cx, cy, rx, ry) {
    this._impl.ellipse(cx, cy, rx, ry);
  },

  /**
   * !#en Adds an circle to the path.
   * !#zh 绘制圆形路径。
   * @method circle
   * @param {Number} [cx] The x axis of the coordinate for the center point.
   * @param {Number} [cy] The y axis of the coordinate for the center point.
   * @param {Number} [r] The circle's radius.
   */
  circle: function circle(cx, cy, r) {
    this._impl.circle(cx, cy, r);
  },

  /**
   * !#en Adds an rectangle to the path.
   * !#zh 绘制矩形路径。
   * @method rect
   * @param {Number} [x] The x axis of the coordinate for the rectangle starting point.
   * @param {Number} [y] The y axis of the coordinate for the rectangle starting point.
   * @param {Number} [w] The rectangle's width.
   * @param {Number} [h] The rectangle's height.
   */
  rect: function rect(x, y, w, h) {
    this._impl.rect(x, y, w, h);
  },

  /**
   * !#en Adds an round corner rectangle to the path. 
   * !#zh 绘制圆角矩形路径。
   * @method roundRect
   * @param {Number} [x] The x axis of the coordinate for the rectangle starting point.
   * @param {Number} [y] The y axis of the coordinate for the rectangle starting point.
   * @param {Number} [w] The rectangles width.
   * @param {Number} [h] The rectangle's height.
   * @param {Number} [r] The radius of the rectangle.
   */
  roundRect: function roundRect(x, y, w, h, r) {
    this._impl.roundRect(x, y, w, h, r);
  },

  /**
   * !#en Draws a filled rectangle.
   * !#zh 绘制填充矩形。
   * @method fillRect
   * @param {Number} [x] The x axis of the coordinate for the rectangle starting point.
   * @param {Number} [y] The y axis of the coordinate for the rectangle starting point.
   * @param {Number} [w] The rectangle's width.
   * @param {Number} [h] The rectangle's height.
   */
  fillRect: function fillRect(x, y, w, h) {
    this.rect(x, y, w, h);
    this.fill();
  },

  /**
   * !#en Erasing any previously drawn content.
   * !#zh 擦除之前绘制的所有内容的方法。
   * @method clear
   * @param {Boolean} [clean] Whether to clean the graphics inner cache.
   */
  clear: function clear(clean) {
    this._impl.clear(clean);

    if (this._assembler) {
      this._assembler.clear(clean);
    }
  },

  /**
   * !#en Causes the point of the pen to move back to the start of the current path. It tries to add a straight line from the current point to the start.
   * !#zh 将笔点返回到当前路径起始点的。它尝试从当前点到起始点绘制一条直线。
   * @method close
   */
  close: function close() {
    this._impl.close();
  },

  /**
   * !#en Strokes the current or given path with the current stroke style.
   * !#zh 根据当前的画线样式，绘制当前或已经存在的路径。
   * @method stroke
   */
  stroke: function stroke() {
    if (!this._assembler) {
      this._resetAssembler();
    }

    this._assembler.stroke(this);
  },

  /**
   * !#en Fills the current or given path with the current fill style.
   * !#zh 根据当前的画线样式，填充当前或已经存在的路径。
   * @method fill
   */
  fill: function fill() {
    if (!this._assembler) {
      this._resetAssembler();
    }

    this._assembler.fill(this);
  }
});
cc.Graphics = module.exports = Graphics;
cc.Graphics.Types = Types;
cc.Graphics.Helper = require('./helper');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2dyYXBoaWNzL2dyYXBoaWNzLmpzIl0sIm5hbWVzIjpbIlJlbmRlckNvbXBvbmVudCIsInJlcXVpcmUiLCJNYXRlcmlhbCIsIlR5cGVzIiwiTGluZUNhcCIsIkxpbmVKb2luIiwiR3JhcGhpY3MiLCJjYyIsIkNsYXNzIiwibmFtZSIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJjdG9yIiwiX2ltcGwiLCJfSW1wbCIsInByb3BlcnRpZXMiLCJfbGluZVdpZHRoIiwiX3N0cm9rZUNvbG9yIiwiQ29sb3IiLCJCTEFDSyIsIl9saW5lSm9pbiIsIk1JVEVSIiwiX2xpbmVDYXAiLCJCVVRUIiwiX2ZpbGxDb2xvciIsIldISVRFIiwiX21pdGVyTGltaXQiLCJsaW5lV2lkdGgiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsImxpbmVKb2luIiwidHlwZSIsImxpbmVDYXAiLCJzdHJva2VDb2xvciIsImNvbG9yIiwiZmlsbENvbG9yIiwibWl0ZXJMaW1pdCIsInN0YXRpY3MiLCJvblJlc3RvcmUiLCJvbkRlc3Ryb3kiLCJjbGVhciIsIl9zdXBlciIsIl9nZXREZWZhdWx0TWF0ZXJpYWwiLCJnZXRCdWlsdGluTWF0ZXJpYWwiLCJfdXBkYXRlTWF0ZXJpYWwiLCJtYXRlcmlhbCIsIl9tYXRlcmlhbHMiLCJnZXREZWZpbmUiLCJ1bmRlZmluZWQiLCJkZWZpbmUiLCJzeXMiLCJnbEV4dGVuc2lvbiIsIm1vdmVUbyIsIngiLCJ5IiwiQ0NfREVCVUciLCJWZWMyIiwid2FybiIsImxpbmVUbyIsImJlemllckN1cnZlVG8iLCJjMXgiLCJjMXkiLCJjMngiLCJjMnkiLCJxdWFkcmF0aWNDdXJ2ZVRvIiwiY3giLCJjeSIsImFyYyIsInIiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJjb3VudGVyY2xvY2t3aXNlIiwiZWxsaXBzZSIsInJ4IiwicnkiLCJjaXJjbGUiLCJyZWN0IiwidyIsImgiLCJyb3VuZFJlY3QiLCJmaWxsUmVjdCIsImZpbGwiLCJjbGVhbiIsIl9hc3NlbWJsZXIiLCJjbG9zZSIsInN0cm9rZSIsIl9yZXNldEFzc2VtYmxlciIsIm1vZHVsZSIsImV4cG9ydHMiLCJIZWxwZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFNQSxlQUFlLEdBQUdDLE9BQU8sQ0FBQyxpQ0FBRCxDQUEvQjs7QUFDQSxJQUFNQyxRQUFRLEdBQUdELE9BQU8sQ0FBQywrQkFBRCxDQUF4Qjs7QUFFQSxJQUFNRSxLQUFLLEdBQUdGLE9BQU8sQ0FBQyxTQUFELENBQXJCOztBQUNBLElBQU1HLE9BQU8sR0FBR0QsS0FBSyxDQUFDQyxPQUF0QjtBQUNBLElBQU1DLFFBQVEsR0FBR0YsS0FBSyxDQUFDRSxRQUF2QjtBQUVBOzs7OztBQUlBLElBQUlDLFFBQVEsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDcEJDLEVBQUFBLElBQUksRUFBRSxhQURjO0FBRXBCLGFBQVNULGVBRlc7QUFJcEJVLEVBQUFBLE1BQU0sRUFBRUMsU0FBUyxJQUFJO0FBQ2pCQyxJQUFBQSxJQUFJLEVBQUU7QUFEVyxHQUpEO0FBUXBCQyxFQUFBQSxJQVJvQixrQkFRWjtBQUNKLFNBQUtDLEtBQUwsR0FBYSxJQUFJUixRQUFRLENBQUNTLEtBQWIsQ0FBbUIsSUFBbkIsQ0FBYjtBQUNILEdBVm1CO0FBWXBCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFLENBREo7QUFFUkMsSUFBQUEsWUFBWSxFQUFFWCxFQUFFLENBQUNZLEtBQUgsQ0FBU0MsS0FGZjtBQUdSQyxJQUFBQSxTQUFTLEVBQUVoQixRQUFRLENBQUNpQixLQUhaO0FBSVJDLElBQUFBLFFBQVEsRUFBRW5CLE9BQU8sQ0FBQ29CLElBSlY7QUFLUkMsSUFBQUEsVUFBVSxFQUFFbEIsRUFBRSxDQUFDWSxLQUFILENBQVNPLEtBTGI7QUFNUkMsSUFBQUEsV0FBVyxFQUFFLEVBTkw7O0FBUVI7Ozs7Ozs7O0FBUUFDLElBQUFB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LG1CQThUWDtBQUNMLFNBQUt4RSxLQUFMLENBQVd3RSxLQUFYO0FBQ0gsR0FoVW1COztBQWtVcEI7Ozs7O0FBS0FDLEVBQUFBLE1BdlVvQixvQkF1VVY7QUFDTixRQUFJLENBQUMsS0FBS0YsVUFBVixFQUFzQjtBQUNsQixXQUFLRyxlQUFMO0FBQ0g7O0FBQ0QsU0FBS0gsVUFBTCxDQUFnQkUsTUFBaEIsQ0FBdUIsSUFBdkI7QUFDSCxHQTVVbUI7O0FBOFVwQjs7Ozs7QUFLQUosRUFBQUEsSUFuVm9CLGtCQW1WWjtBQUNKLFFBQUksQ0FBQyxLQUFLRSxVQUFWLEVBQXNCO0FBQ2xCLFdBQUtHLGVBQUw7QUFDSDs7QUFDRCxTQUFLSCxVQUFMLENBQWdCRixJQUFoQixDQUFxQixJQUFyQjtBQUNIO0FBeFZtQixDQUFULENBQWY7QUEyVkE1RSxFQUFFLENBQUNELFFBQUgsR0FBY21GLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnBGLFFBQS9CO0FBQ0FDLEVBQUUsQ0FBQ0QsUUFBSCxDQUFZSCxLQUFaLEdBQW9CQSxLQUFwQjtBQUNBSSxFQUFFLENBQUNELFFBQUgsQ0FBWXFGLE1BQVosR0FBcUIxRixPQUFPLENBQUMsVUFBRCxDQUE1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgUmVuZGVyQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9DQ1JlbmRlckNvbXBvbmVudCcpO1xuY29uc3QgTWF0ZXJpYWwgPSByZXF1aXJlKCcuLi9hc3NldHMvbWF0ZXJpYWwvQ0NNYXRlcmlhbCcpO1xuXG5jb25zdCBUeXBlcyA9IHJlcXVpcmUoJy4vdHlwZXMnKTtcbmNvbnN0IExpbmVDYXAgPSBUeXBlcy5MaW5lQ2FwO1xuY29uc3QgTGluZUpvaW4gPSBUeXBlcy5MaW5lSm9pbjtcblxuLyoqXG4gKiBAY2xhc3MgR3JhcGhpY3NcbiAqIEBleHRlbmRzIFJlbmRlckNvbXBvbmVudFxuICovXG5sZXQgR3JhcGhpY3MgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkdyYXBoaWNzJyxcbiAgICBleHRlbmRzOiBSZW5kZXJDb21wb25lbnQsXG5cbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucmVuZGVyZXJzL0dyYXBoaWNzJyxcbiAgICB9LFxuXG4gICAgY3RvciAoKSB7XG4gICAgICAgIHRoaXMuX2ltcGwgPSBuZXcgR3JhcGhpY3MuX0ltcGwodGhpcyk7XG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX2xpbmVXaWR0aDogMixcbiAgICAgICAgX3N0cm9rZUNvbG9yOiBjYy5Db2xvci5CTEFDSyxcbiAgICAgICAgX2xpbmVKb2luOiBMaW5lSm9pbi5NSVRFUixcbiAgICAgICAgX2xpbmVDYXA6IExpbmVDYXAuQlVUVCxcbiAgICAgICAgX2ZpbGxDb2xvcjogY2MuQ29sb3IuV0hJVEUsXG4gICAgICAgIF9taXRlckxpbWl0OiAxMCxcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIEN1cnJlbnQgbGluZSB3aWR0aC5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDlvZPliY3nur/mnaHlrr3luqZcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGxpbmVXaWR0aFxuICAgICAgICAgKiBAZGVmYXVsdCAxXG4gICAgICAgICAqL1xuICAgICAgICBsaW5lV2lkdGg6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVXaWR0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZVdpZHRoID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5faW1wbC5saW5lV2lkdGggPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBsaW5lSm9pbiBkZXRlcm1pbmVzIGhvdyB0d28gY29ubmVjdGluZyBzZWdtZW50cyAob2YgbGluZXMsIGFyY3Mgb3IgY3VydmVzKSB3aXRoIG5vbi16ZXJvIGxlbmd0aHMgaW4gYSBzaGFwZSBhcmUgam9pbmVkIHRvZ2V0aGVyLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIGxpbmVKb2luIOeUqOadpeiuvue9rjLkuKrplb/luqbkuI3kuLow55qE55u46L+e6YOo5YiG77yI57q/5q6177yM5ZyG5byn77yM5puy57q/77yJ5aaC5L2V6L+e5o6l5Zyo5LiA6LW355qE5bGe5oCn44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7R3JhcGhpY3MuTGluZUpvaW59IGxpbmVKb2luXG4gICAgICAgICAqIEBkZWZhdWx0IExpbmVKb2luLk1JVEVSXG4gICAgICAgICAqL1xuICAgICAgICBsaW5lSm9pbjoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGluZUpvaW47XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmVKb2luID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5faW1wbC5saW5lSm9pbiA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IExpbmVKb2luXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogbGluZUNhcCBkZXRlcm1pbmVzIGhvdyB0aGUgZW5kIHBvaW50cyBvZiBldmVyeSBsaW5lIGFyZSBkcmF3bi5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiBsaW5lQ2FwIOaMh+WumuWmguS9lee7mOWItuavj+S4gOadoee6v+auteacq+err+OAglxuICAgICAgICAgKiBAcHJvcGVydHkge0dyYXBoaWNzLkxpbmVDYXB9IGxpbmVDYXBcbiAgICAgICAgICogQGRlZmF1bHQgTGluZUNhcC5CVVRUXG4gICAgICAgICAqL1xuICAgICAgICBsaW5lQ2FwOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saW5lQ2FwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lQ2FwID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5faW1wbC5saW5lQ2FwID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogTGluZUNhcFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIHN0cm9rZSBjb2xvclxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOe6v+auteminOiJslxuICAgICAgICAgKiBAcHJvcGVydHkge0NvbG9yfSBzdHJva2VDb2xvclxuICAgICAgICAgKiBAZGVmYXVsdCBDb2xvci5CTEFDS1xuICAgICAgICAgKi9cbiAgICAgICAgc3Ryb2tlQ29sb3I6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0cm9rZUNvbG9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbXBsLnN0cm9rZUNvbG9yID0gdGhpcy5fc3Ryb2tlQ29sb3IgPSBjYy5jb2xvcih2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogZmlsbCBjb2xvclxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOWhq+WFheminOiJslxuICAgICAgICAgKiBAcHJvcGVydHkge0NvbG9yfSBmaWxsQ29sb3JcbiAgICAgICAgICogQGRlZmF1bHQgQ29sb3IuV0hJVEVcbiAgICAgICAgICovXG4gICAgICAgIGZpbGxDb2xvcjoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZmlsbENvbG9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbXBsLmZpbGxDb2xvciA9IHRoaXMuX2ZpbGxDb2xvciA9IGNjLmNvbG9yKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBTZXRzIHRoZSBtaXRlciBsaW1pdCByYXRpb1xuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOiuvue9ruaWnOaOpemdoumZkOWItuavlOS+i1xuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbWl0ZXJMaW1pdFxuICAgICAgICAgKiBAZGVmYXVsdCAxMFxuICAgICAgICAgKi9cbiAgICAgICAgbWl0ZXJMaW1pdDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWl0ZXJMaW1pdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWl0ZXJMaW1pdCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2ltcGwubWl0ZXJMaW1pdCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgTGluZUpvaW46IExpbmVKb2luLFxuICAgICAgICBMaW5lQ2FwOiBMaW5lQ2FwXG4gICAgfSxcblxuICAgIG9uUmVzdG9yZSAoKSB7XG4gICAgICAgIGlmICghdGhpcy5faW1wbCkge1xuICAgICAgICAgICAgdGhpcy5faW1wbCA9IG5ldyBHcmFwaGljcy5fSW1wbCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3kgKCkge1xuICAgICAgICB0aGlzLmNsZWFyKHRydWUpO1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICB0aGlzLl9pbXBsID0gbnVsbDtcbiAgICB9LFxuXG4gICAgX2dldERlZmF1bHRNYXRlcmlhbCAoKSB7XG4gICAgICAgIHJldHVybiBNYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLWdyYXBoaWNzJyk7XG4gICAgfSxcblxuICAgIF91cGRhdGVNYXRlcmlhbCAoKSB7XG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMuX21hdGVyaWFsc1swXTtcbiAgICAgICAgaWYgKCFtYXRlcmlhbCkgcmV0dXJuO1xuICAgICAgICBpZiAobWF0ZXJpYWwuZ2V0RGVmaW5lKCdDQ19VU0VfTU9ERUwnKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBtYXRlcmlhbC5kZWZpbmUoJ0NDX1VTRV9NT0RFTCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRlcmlhbC5nZXREZWZpbmUoJ0NDX1NVUFBPUlRfc3RhbmRhcmRfZGVyaXZhdGl2ZXMnKSAhPT0gdW5kZWZpbmVkICYmIGNjLnN5cy5nbEV4dGVuc2lvbignT0VTX3N0YW5kYXJkX2Rlcml2YXRpdmVzJykpIHtcbiAgICAgICAgICAgIG1hdGVyaWFsLmRlZmluZSgnQ0NfU1VQUE9SVF9zdGFuZGFyZF9kZXJpdmF0aXZlcycsIHRydWUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gTW92ZSBwYXRoIHN0YXJ0IHBvaW50IHRvICh4LHkpLlxuICAgICAqICEjemgg56e75Yqo6Lev5b6E6LW354K55Yiw5Z2Q5qCHKHgsIHkpXG4gICAgICogQG1ldGhvZCBtb3ZlVG9cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3hdIFRoZSB4IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSBlbmQgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt5XSBUaGUgeSBheGlzIG9mIHRoZSBjb29yZGluYXRlIGZvciB0aGUgZW5kIHBvaW50LlxuICAgICAqL1xuICAgIG1vdmVUbyAoeCwgeSkge1xuICAgICAgICBpZiAoQ0NfREVCVUcgJiYgeCBpbnN0YW5jZW9mIGNjLlZlYzIpIHtcbiAgICAgICAgICAgIGNjLndhcm4oJ1ttb3ZlVG9dIDogQ2FuIG5vdCBwYXNzIFZlYzIgYXMgW3gsIHldIHZhbHVlLCBwbGVhc2UgY2hlY2sgaXQuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW1wbC5tb3ZlVG8oeCwgeSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQWRkcyBhIHN0cmFpZ2h0IGxpbmUgdG8gdGhlIHBhdGhcbiAgICAgKiAhI3poIOe7mOWItuebtOe6v+i3r+W+hFxuICAgICAqIEBtZXRob2QgbGluZVRvXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt4XSBUaGUgeCBheGlzIG9mIHRoZSBjb29yZGluYXRlIGZvciB0aGUgZW5kIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeV0gVGhlIHkgYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIGVuZCBwb2ludC5cbiAgICAgKi9cbiAgICBsaW5lVG8gKHgsIHkpIHtcbiAgICAgICAgaWYgKENDX0RFQlVHICYmIHggaW5zdGFuY2VvZiBjYy5WZWMyKSB7XG4gICAgICAgICAgICBjYy53YXJuKCdbbW92ZVRvXSA6IENhbiBub3QgcGFzcyBWZWMyIGFzIFt4LCB5XSB2YWx1ZSwgcGxlYXNlIGNoZWNrIGl0LicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ltcGwubGluZVRvKHgsIHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEFkZHMgYSBjdWJpYyBCw6l6aWVyIGN1cnZlIHRvIHRoZSBwYXRoXG4gICAgICogISN6aCDnu5jliLbkuInmrKHotJ3otZvlsJTmm7Lnur/ot6/lvoRcbiAgICAgKiBAbWV0aG9kIGJlemllckN1cnZlVG9cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2MxeF0gVGhlIHggYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIGZpcnN0IGNvbnRyb2wgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtjMXldIFRoZSB5IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIGZpcnN0IGNvbnRyb2wgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtjMnhdIFRoZSB4IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSBzZWNvbmQgY29udHJvbCBwb2ludC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2MyeV0gVGhlIHkgYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIHNlY29uZCBjb250cm9sIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeF0gVGhlIHggYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIGVuZCBwb2ludC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3ldIFRoZSB5IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSBlbmQgcG9pbnQuXG4gICAgICovXG4gICAgYmV6aWVyQ3VydmVUbyAoYzF4LCBjMXksIGMyeCwgYzJ5LCB4LCB5KSB7XG4gICAgICAgIHRoaXMuX2ltcGwuYmV6aWVyQ3VydmVUbyhjMXgsIGMxeSwgYzJ4LCBjMnksIHgsIHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEFkZHMgYSBxdWFkcmF0aWMgQsOpemllciBjdXJ2ZSB0byB0aGUgcGF0aFxuICAgICAqICEjemgg57uY5Yi25LqM5qyh6LSd6LWb5bCU5puy57q/6Lev5b6EXG4gICAgICogQG1ldGhvZCBxdWFkcmF0aWNDdXJ2ZVRvXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtjeF0gVGhlIHggYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIGNvbnRyb2wgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtjeV0gVGhlIHkgYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIGNvbnRyb2wgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt4XSBUaGUgeCBheGlzIG9mIHRoZSBjb29yZGluYXRlIGZvciB0aGUgZW5kIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeV0gVGhlIHkgYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIGVuZCBwb2ludC5cbiAgICAgKi9cbiAgICBxdWFkcmF0aWNDdXJ2ZVRvIChjeCwgY3ksIHgsIHkpIHtcbiAgICAgICAgdGhpcy5faW1wbC5xdWFkcmF0aWNDdXJ2ZVRvKGN4LCBjeSwgeCwgeSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQWRkcyBhbiBhcmMgdG8gdGhlIHBhdGggd2hpY2ggaXMgY2VudGVyZWQgYXQgKGN4LCBjeSkgcG9zaXRpb24gd2l0aCByYWRpdXMgciBzdGFydGluZyBhdCBzdGFydEFuZ2xlIGFuZCBlbmRpbmcgYXQgZW5kQW5nbGUgZ29pbmcgaW4gdGhlIGdpdmVuIGRpcmVjdGlvbiBieSBjb3VudGVyY2xvY2t3aXNlIChkZWZhdWx0aW5nIHRvIGZhbHNlKS5cbiAgICAgKiAhI3poIOe7mOWItuWchuW8p+i3r+W+hOOAguWchuW8p+i3r+W+hOeahOWchuW/g+WcqCAoY3gsIGN5KSDkvY3nva7vvIzljYrlvoTkuLogciDvvIzmoLnmja4gY291bnRlcmNsb2Nrd2lzZSDvvIjpu5jorqTkuLpmYWxzZe+8ieaMh+WumueahOaWueWQkeS7jiBzdGFydEFuZ2xlIOW8gOWni+e7mOWItu+8jOWIsCBlbmRBbmdsZSDnu5PmnZ/jgIJcbiAgICAgKiBAbWV0aG9kIGFyY1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbY3hdIFRoZSB4IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSBjZW50ZXIgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtjeV0gVGhlIHkgYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIGNlbnRlciBwb2ludC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3JdIFRoZSBhcmMncyByYWRpdXMuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtzdGFydEFuZ2xlXSBUaGUgYW5nbGUgYXQgd2hpY2ggdGhlIGFyYyBzdGFydHMsIG1lYXN1cmVkIGNsb2Nrd2lzZSBmcm9tIHRoZSBwb3NpdGl2ZSB4IGF4aXMgYW5kIGV4cHJlc3NlZCBpbiByYWRpYW5zLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbZW5kQW5nbGVdIFRoZSBhbmdsZSBhdCB3aGljaCB0aGUgYXJjIGVuZHMsIG1lYXN1cmVkIGNsb2Nrd2lzZSBmcm9tIHRoZSBwb3NpdGl2ZSB4IGF4aXMgYW5kIGV4cHJlc3NlZCBpbiByYWRpYW5zLlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2NvdW50ZXJjbG9ja3dpc2VdIEFuIG9wdGlvbmFsIEJvb2xlYW4gd2hpY2gsIGlmIHRydWUsIGNhdXNlcyB0aGUgYXJjIHRvIGJlIGRyYXduIGNvdW50ZXItY2xvY2t3aXNlIGJldHdlZW4gdGhlIHR3byBhbmdsZXMuIEJ5IGRlZmF1bHQgaXQgaXMgZHJhd24gY2xvY2t3aXNlLlxuICAgICAqL1xuICAgIGFyYyAoY3gsIGN5LCByLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgY291bnRlcmNsb2Nrd2lzZSkge1xuICAgICAgICB0aGlzLl9pbXBsLmFyYyhjeCwgY3ksIHIsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlLCBjb3VudGVyY2xvY2t3aXNlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBBZGRzIGFuIGVsbGlwc2UgdG8gdGhlIHBhdGguXG4gICAgICogISN6aCDnu5jliLbmpK3lnIbot6/lvoTjgIJcbiAgICAgKiBAbWV0aG9kIGVsbGlwc2VcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2N4XSBUaGUgeCBheGlzIG9mIHRoZSBjb29yZGluYXRlIGZvciB0aGUgY2VudGVyIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbY3ldIFRoZSB5IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSBjZW50ZXIgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtyeF0gVGhlIGVsbGlwc2UncyB4LWF4aXMgcmFkaXVzLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbcnldIFRoZSBlbGxpcHNlJ3MgeS1heGlzIHJhZGl1cy5cbiAgICAgKi9cbiAgICBlbGxpcHNlIChjeCwgY3ksIHJ4LCByeSkge1xuICAgICAgICB0aGlzLl9pbXBsLmVsbGlwc2UoY3gsIGN5LCByeCwgcnkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEFkZHMgYW4gY2lyY2xlIHRvIHRoZSBwYXRoLlxuICAgICAqICEjemgg57uY5Yi25ZyG5b2i6Lev5b6E44CCXG4gICAgICogQG1ldGhvZCBjaXJjbGVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2N4XSBUaGUgeCBheGlzIG9mIHRoZSBjb29yZGluYXRlIGZvciB0aGUgY2VudGVyIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbY3ldIFRoZSB5IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSBjZW50ZXIgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtyXSBUaGUgY2lyY2xlJ3MgcmFkaXVzLlxuICAgICAqL1xuICAgIGNpcmNsZSAoY3gsIGN5LCByKSB7XG4gICAgICAgIHRoaXMuX2ltcGwuY2lyY2xlKGN4LCBjeSwgcik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQWRkcyBhbiByZWN0YW5nbGUgdG8gdGhlIHBhdGguXG4gICAgICogISN6aCDnu5jliLbnn6nlvaLot6/lvoTjgIJcbiAgICAgKiBAbWV0aG9kIHJlY3RcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3hdIFRoZSB4IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSByZWN0YW5nbGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt5XSBUaGUgeSBheGlzIG9mIHRoZSBjb29yZGluYXRlIGZvciB0aGUgcmVjdGFuZ2xlIHN0YXJ0aW5nIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbd10gVGhlIHJlY3RhbmdsZSdzIHdpZHRoLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbaF0gVGhlIHJlY3RhbmdsZSdzIGhlaWdodC5cbiAgICAgKi9cbiAgICByZWN0ICh4LCB5LCB3LCBoKSB7XG4gICAgICAgIHRoaXMuX2ltcGwucmVjdCh4LCB5LCB3LCBoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBBZGRzIGFuIHJvdW5kIGNvcm5lciByZWN0YW5nbGUgdG8gdGhlIHBhdGguIFxuICAgICAqICEjemgg57uY5Yi25ZyG6KeS55+p5b2i6Lev5b6E44CCXG4gICAgICogQG1ldGhvZCByb3VuZFJlY3RcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3hdIFRoZSB4IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSByZWN0YW5nbGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt5XSBUaGUgeSBheGlzIG9mIHRoZSBjb29yZGluYXRlIGZvciB0aGUgcmVjdGFuZ2xlIHN0YXJ0aW5nIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbd10gVGhlIHJlY3RhbmdsZXMgd2lkdGguXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtoXSBUaGUgcmVjdGFuZ2xlJ3MgaGVpZ2h0LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbcl0gVGhlIHJhZGl1cyBvZiB0aGUgcmVjdGFuZ2xlLlxuICAgICAqL1xuICAgIHJvdW5kUmVjdCAoeCwgeSwgdywgaCwgcikge1xuICAgICAgICB0aGlzLl9pbXBsLnJvdW5kUmVjdCh4LCB5LCB3LCBoLCByKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBEcmF3cyBhIGZpbGxlZCByZWN0YW5nbGUuXG4gICAgICogISN6aCDnu5jliLbloavlhYXnn6nlvaLjgIJcbiAgICAgKiBAbWV0aG9kIGZpbGxSZWN0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt4XSBUaGUgeCBheGlzIG9mIHRoZSBjb29yZGluYXRlIGZvciB0aGUgcmVjdGFuZ2xlIHN0YXJ0aW5nIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeV0gVGhlIHkgYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIHJlY3RhbmdsZSBzdGFydGluZyBwb2ludC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3ddIFRoZSByZWN0YW5nbGUncyB3aWR0aC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2hdIFRoZSByZWN0YW5nbGUncyBoZWlnaHQuXG4gICAgICovXG4gICAgZmlsbFJlY3QgKHgsIHksIHcsIGgpIHtcbiAgICAgICAgdGhpcy5yZWN0KHgsIHksIHcsIGgpO1xuICAgICAgICB0aGlzLmZpbGwoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBFcmFzaW5nIGFueSBwcmV2aW91c2x5IGRyYXduIGNvbnRlbnQuXG4gICAgICogISN6aCDmk6bpmaTkuYvliY3nu5jliLbnmoTmiYDmnInlhoXlrrnnmoTmlrnms5XjgIJcbiAgICAgKiBAbWV0aG9kIGNsZWFyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbY2xlYW5dIFdoZXRoZXIgdG8gY2xlYW4gdGhlIGdyYXBoaWNzIGlubmVyIGNhY2hlLlxuICAgICAqL1xuICAgIGNsZWFyIChjbGVhbikge1xuICAgICAgICB0aGlzLl9pbXBsLmNsZWFyKGNsZWFuKTtcbiAgICAgICAgaWYgKHRoaXMuX2Fzc2VtYmxlcikge1xuICAgICAgICAgICAgdGhpcy5fYXNzZW1ibGVyLmNsZWFyKGNsZWFuKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENhdXNlcyB0aGUgcG9pbnQgb2YgdGhlIHBlbiB0byBtb3ZlIGJhY2sgdG8gdGhlIHN0YXJ0IG9mIHRoZSBjdXJyZW50IHBhdGguIEl0IHRyaWVzIHRvIGFkZCBhIHN0cmFpZ2h0IGxpbmUgZnJvbSB0aGUgY3VycmVudCBwb2ludCB0byB0aGUgc3RhcnQuXG4gICAgICogISN6aCDlsIbnrJTngrnov5Tlm57liLDlvZPliY3ot6/lvoTotbflp4vngrnnmoTjgILlroPlsJ3or5Xku47lvZPliY3ngrnliLDotbflp4vngrnnu5jliLbkuIDmnaHnm7Tnur/jgIJcbiAgICAgKiBAbWV0aG9kIGNsb3NlXG4gICAgICovXG4gICAgY2xvc2UgKCkge1xuICAgICAgICB0aGlzLl9pbXBsLmNsb3NlKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU3Ryb2tlcyB0aGUgY3VycmVudCBvciBnaXZlbiBwYXRoIHdpdGggdGhlIGN1cnJlbnQgc3Ryb2tlIHN0eWxlLlxuICAgICAqICEjemgg5qC55o2u5b2T5YmN55qE55S757q/5qC35byP77yM57uY5Yi25b2T5YmN5oiW5bey57uP5a2Y5Zyo55qE6Lev5b6E44CCXG4gICAgICogQG1ldGhvZCBzdHJva2VcbiAgICAgKi9cbiAgICBzdHJva2UgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2Fzc2VtYmxlcikge1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRBc3NlbWJsZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hc3NlbWJsZXIuc3Ryb2tlKHRoaXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEZpbGxzIHRoZSBjdXJyZW50IG9yIGdpdmVuIHBhdGggd2l0aCB0aGUgY3VycmVudCBmaWxsIHN0eWxlLlxuICAgICAqICEjemgg5qC55o2u5b2T5YmN55qE55S757q/5qC35byP77yM5aGr5YWF5b2T5YmN5oiW5bey57uP5a2Y5Zyo55qE6Lev5b6E44CCXG4gICAgICogQG1ldGhvZCBmaWxsXG4gICAgICovXG4gICAgZmlsbCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fYXNzZW1ibGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNldEFzc2VtYmxlcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlci5maWxsKHRoaXMpO1xuICAgIH1cbn0pO1xuXG5jYy5HcmFwaGljcyA9IG1vZHVsZS5leHBvcnRzID0gR3JhcGhpY3M7XG5jYy5HcmFwaGljcy5UeXBlcyA9IFR5cGVzO1xuY2MuR3JhcGhpY3MuSGVscGVyID0gcmVxdWlyZSgnLi9oZWxwZXInKTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9