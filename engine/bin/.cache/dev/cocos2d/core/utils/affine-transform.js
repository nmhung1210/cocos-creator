
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/affine-transform.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * !#en
 * AffineTransform class represent an affine transform matrix. It's composed basically by translation, rotation, scale transformations.<br/>
 * !#zh
 * AffineTransform 类代表一个仿射变换矩阵。它基本上是由平移旋转，缩放转变所组成。<br/>
 * @class AffineTransform
 * @constructor
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} tx
 * @param {Number} ty
 * @see AffineTransform.create
 */
var AffineTransform = function AffineTransform(a, b, c, d, tx, ty) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.tx = tx;
  this.ty = ty;
};
/**
 * !#en Create a AffineTransform object with all contents in the matrix.
 * !#zh 用在矩阵中的所有内容创建一个 AffineTransform 对象。
 * @method create
 * @static
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} tx
 * @param {Number} ty
 * @return {AffineTransform}
 */


AffineTransform.create = function (a, b, c, d, tx, ty) {
  return {
    a: a,
    b: b,
    c: c,
    d: d,
    tx: tx,
    ty: ty
  };
};
/**
 * !#en
 * Create a identity transformation matrix: <br/>
 * [ 1, 0, 0, <br/>
 *   0, 1, 0 ]
 * !#zh
 * 单位矩阵：<br/>
 * [ 1, 0, 0, <br/>
 *   0, 1, 0 ]
 *
 * @method identity
 * @static
 * @return {AffineTransform}
 */


AffineTransform.identity = function () {
  return {
    a: 1.0,
    b: 0.0,
    c: 0.0,
    d: 1.0,
    tx: 0.0,
    ty: 0.0
  };
};
/**
 * !#en Clone a AffineTransform object from the specified transform.
 * !#zh 克隆指定的 AffineTransform 对象。
 * @method clone
 * @static
 * @param {AffineTransform} t
 * @return {AffineTransform}
 */


AffineTransform.clone = function (t) {
  return {
    a: t.a,
    b: t.b,
    c: t.c,
    d: t.d,
    tx: t.tx,
    ty: t.ty
  };
};
/**
 * !#en
 * Concatenate a transform matrix to another
 * The results are reflected in the out affine transform
 * out = t1 * t2
 * This function is memory free, you should create the output affine transform by yourself and manage its memory.
 * !#zh
 * 拼接两个矩阵，将结果保存到 out 矩阵。这个函数不创建任何内存，你需要先创建 AffineTransform 对象用来存储结果，并作为第一个参数传入函数。
 * out = t1 * t2
 * @method concat
 * @static
 * @param {AffineTransform} out Out object to store the concat result
 * @param {AffineTransform} t1 The first transform object.
 * @param {AffineTransform} t2 The transform object to concatenate.
 * @return {AffineTransform} Out object with the result of concatenation.
 */


AffineTransform.concat = function (out, t1, t2) {
  var a = t1.a,
      b = t1.b,
      c = t1.c,
      d = t1.d,
      tx = t1.tx,
      ty = t1.ty;
  out.a = a * t2.a + b * t2.c;
  out.b = a * t2.b + b * t2.d;
  out.c = c * t2.a + d * t2.c;
  out.d = c * t2.b + d * t2.d;
  out.tx = tx * t2.a + ty * t2.c + t2.tx;
  out.ty = tx * t2.b + ty * t2.d + t2.ty;
  return out;
};
/**
 * !#en Get the invert transform of an AffineTransform object.
 * This function is memory free, you should create the output affine transform by yourself and manage its memory.
 * !#zh 求逆矩阵。这个函数不创建任何内存，你需要先创建 AffineTransform 对象用来存储结果，并作为第一个参数传入函数。
 * @method invert
 * @static
 * @param {AffineTransform} out
 * @param {AffineTransform} t
 * @return {AffineTransform} Out object with inverted result.
 */


AffineTransform.invert = function (out, t) {
  var a = t.a,
      b = t.b,
      c = t.c,
      d = t.d;
  var determinant = 1 / (a * d - b * c);
  var tx = t.tx,
      ty = t.ty;
  out.a = determinant * d;
  out.b = -determinant * b;
  out.c = -determinant * c;
  out.d = determinant * a;
  out.tx = determinant * (c * ty - d * tx);
  out.ty = determinant * (b * tx - a * ty);
  return out;
};
/**
 * !#en Get an AffineTransform object from a given matrix 4x4.
 * This function is memory free, you should create the output affine transform by yourself and manage its memory.
 * !#zh 从一个 4x4 Matrix 获取 AffineTransform 对象。这个函数不创建任何内存，你需要先创建 AffineTransform 对象用来存储结果，并作为第一个参数传入函数。
 * @method invert
 * @static
 * @param {AffineTransform} out
 * @param {Mat4} mat
 * @return {AffineTransform} Out object with inverted result.
 */


AffineTransform.fromMat4 = function (out, mat) {
  var matm = mat.m;
  out.a = matm[0];
  out.b = matm[1];
  out.c = matm[4];
  out.d = matm[5];
  out.tx = matm[12];
  out.ty = matm[13];
  return out;
};
/**
 * !#en Apply the affine transformation on a point.
 * This function is memory free, you should create the output Vec2 by yourself and manage its memory.
 * !#zh 对一个点应用矩阵变换。这个函数不创建任何内存，你需要先创建一个 Vec2 对象用来存储结果，并作为第一个参数传入函数。
 * @method transformVec2
 * @static
 * @param {Vec2} out The output point to store the result
 * @param {Vec2|Number} point Point to apply transform or x.
 * @param {AffineTransform|Number} transOrY transform matrix or y.
 * @param {AffineTransform} [t] transform matrix.
 * @return {Vec2}
 */


AffineTransform.transformVec2 = function (out, point, transOrY, t) {
  var x, y;

  if (t === undefined) {
    t = transOrY;
    x = point.x;
    y = point.y;
  } else {
    x = point;
    y = transOrY;
  }

  out.x = t.a * x + t.c * y + t.tx;
  out.y = t.b * x + t.d * y + t.ty;
  return out;
};
/**
 * !#en Apply the affine transformation on a size.
 * This function is memory free, you should create the output Size by yourself and manage its memory.
 * !#zh 应用仿射变换矩阵到 Size 上。这个函数不创建任何内存，你需要先创建一个 Size 对象用来存储结果，并作为第一个参数传入函数。
 * @method transformSize
 * @static
 * @param {Size} out The output point to store the result
 * @param {Size} size
 * @param {AffineTransform} t
 * @return {Size}
 */


AffineTransform.transformSize = function (out, size, t) {
  out.width = t.a * size.width + t.c * size.height;
  out.height = t.b * size.width + t.d * size.height;
  return out;
};
/**
 * !#en Apply the affine transformation on a rect.
 * This function is memory free, you should create the output Rect by yourself and manage its memory.
 * !#zh 应用仿射变换矩阵到 Rect 上。这个函数不创建任何内存，你需要先创建一个 Rect 对象用来存储结果，并作为第一个参数传入函数。
 * @method transformRect
 * @static
 * @param {Rect} out
 * @param {Rect} rect
 * @param {AffineTransform} anAffineTransform
 * @return {Rect}
 */


AffineTransform.transformRect = function (out, rect, t) {
  var ol = rect.x;
  var ob = rect.y;
  var or = ol + rect.width;
  var ot = ob + rect.height;
  var lbx = t.a * ol + t.c * ob + t.tx;
  var lby = t.b * ol + t.d * ob + t.ty;
  var rbx = t.a * or + t.c * ob + t.tx;
  var rby = t.b * or + t.d * ob + t.ty;
  var ltx = t.a * ol + t.c * ot + t.tx;
  var lty = t.b * ol + t.d * ot + t.ty;
  var rtx = t.a * or + t.c * ot + t.tx;
  var rty = t.b * or + t.d * ot + t.ty;
  var minX = Math.min(lbx, rbx, ltx, rtx);
  var maxX = Math.max(lbx, rbx, ltx, rtx);
  var minY = Math.min(lby, rby, lty, rty);
  var maxY = Math.max(lby, rby, lty, rty);
  out.x = minX;
  out.y = minY;
  out.width = maxX - minX;
  out.height = maxY - minY;
  return out;
};
/**
 * !#en Apply the affine transformation on a rect, and truns to an Oriented Bounding Box.
 * This function is memory free, you should create the output vectors by yourself and manage their memory.
 * !#zh 应用仿射变换矩阵到 Rect 上, 并转换为有向包围盒。这个函数不创建任何内存，你需要先创建包围盒的四个 Vector 对象用来存储结果，并作为前四个参数传入函数。
 * @method transformObb
 * @static
 * @param {Vec2} out_bl
 * @param {Vec2} out_tl
 * @param {Vec2} out_tr
 * @param {Vec2} out_br
 * @param {Rect} rect
 * @param {AffineTransform} anAffineTransform
 */


AffineTransform.transformObb = function (out_bl, out_tl, out_tr, out_br, rect, anAffineTransform) {
  var x = rect.x;
  var y = rect.y;
  var width = rect.width;
  var height = rect.height;
  var tx = anAffineTransform.a * x + anAffineTransform.c * y + anAffineTransform.tx;
  var ty = anAffineTransform.b * x + anAffineTransform.d * y + anAffineTransform.ty;
  var xa = anAffineTransform.a * width;
  var xb = anAffineTransform.b * width;
  var yc = anAffineTransform.c * height;
  var yd = anAffineTransform.d * height;
  out_tl.x = tx;
  out_tl.y = ty;
  out_tr.x = xa + tx;
  out_tr.y = xb + ty;
  out_bl.x = yc + tx;
  out_bl.y = yd + ty;
  out_br.x = xa + yc + tx;
  out_br.y = xb + yd + ty;
};

cc.AffineTransform = module.exports = AffineTransform;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL2FmZmluZS10cmFuc2Zvcm0uanMiXSwibmFtZXMiOlsiQWZmaW5lVHJhbnNmb3JtIiwiYSIsImIiLCJjIiwiZCIsInR4IiwidHkiLCJjcmVhdGUiLCJpZGVudGl0eSIsImNsb25lIiwidCIsImNvbmNhdCIsIm91dCIsInQxIiwidDIiLCJpbnZlcnQiLCJkZXRlcm1pbmFudCIsImZyb21NYXQ0IiwibWF0IiwibWF0bSIsIm0iLCJ0cmFuc2Zvcm1WZWMyIiwicG9pbnQiLCJ0cmFuc09yWSIsIngiLCJ5IiwidW5kZWZpbmVkIiwidHJhbnNmb3JtU2l6ZSIsInNpemUiLCJ3aWR0aCIsImhlaWdodCIsInRyYW5zZm9ybVJlY3QiLCJyZWN0Iiwib2wiLCJvYiIsIm9yIiwib3QiLCJsYngiLCJsYnkiLCJyYngiLCJyYnkiLCJsdHgiLCJsdHkiLCJydHgiLCJydHkiLCJtaW5YIiwiTWF0aCIsIm1pbiIsIm1heFgiLCJtYXgiLCJtaW5ZIiwibWF4WSIsInRyYW5zZm9ybU9iYiIsIm91dF9ibCIsIm91dF90bCIsIm91dF90ciIsIm91dF9iciIsImFuQWZmaW5lVHJhbnNmb3JtIiwieGEiLCJ4YiIsInljIiwieWQiLCJjYyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBOzs7Ozs7Ozs7Ozs7Ozs7QUFlQSxJQUFJQSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCQyxFQUF0QixFQUEwQkMsRUFBMUIsRUFBOEI7QUFDaEQsT0FBS0wsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsT0FBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsT0FBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsT0FBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsT0FBS0MsRUFB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LE9BQVAsR0FBaUJoRSxlQUF0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDA4LTIwMTAgUmljYXJkbyBRdWVzYWRhXG4gQ29weXJpZ2h0IChjKSAyMDExLTIwMTIgY29jb3MyZC14Lm9yZ1xuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBBZmZpbmVUcmFuc2Zvcm0gY2xhc3MgcmVwcmVzZW50IGFuIGFmZmluZSB0cmFuc2Zvcm0gbWF0cml4LiBJdCdzIGNvbXBvc2VkIGJhc2ljYWxseSBieSB0cmFuc2xhdGlvbiwgcm90YXRpb24sIHNjYWxlIHRyYW5zZm9ybWF0aW9ucy48YnIvPlxuICogISN6aFxuICogQWZmaW5lVHJhbnNmb3JtIOexu+S7o+ihqOS4gOS4quS7v+WwhOWPmOaNouefqemYteOAguWug+WfuuacrOS4iuaYr+eUseW5s+enu+aXi+i9rO+8jOe8qeaUvui9rOWPmOaJgOe7hOaIkOOAgjxici8+XG4gKiBAY2xhc3MgQWZmaW5lVHJhbnNmb3JtXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gKiBAcGFyYW0ge051bWJlcn0gYlxuICogQHBhcmFtIHtOdW1iZXJ9IGNcbiAqIEBwYXJhbSB7TnVtYmVyfSBkXG4gKiBAcGFyYW0ge051bWJlcn0gdHhcbiAqIEBwYXJhbSB7TnVtYmVyfSB0eVxuICogQHNlZSBBZmZpbmVUcmFuc2Zvcm0uY3JlYXRlXG4gKi9cbnZhciBBZmZpbmVUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgdHgsIHR5KSB7XG4gICAgdGhpcy5hID0gYTtcbiAgICB0aGlzLmIgPSBiO1xuICAgIHRoaXMuYyA9IGM7XG4gICAgdGhpcy5kID0gZDtcbiAgICB0aGlzLnR4ID0gdHg7XG4gICAgdGhpcy50eSA9IHR5O1xufTtcblxuLyoqXG4gKiAhI2VuIENyZWF0ZSBhIEFmZmluZVRyYW5zZm9ybSBvYmplY3Qgd2l0aCBhbGwgY29udGVudHMgaW4gdGhlIG1hdHJpeC5cbiAqICEjemgg55So5Zyo55+p6Zi15Lit55qE5omA5pyJ5YaF5a655Yib5bu65LiA5LiqIEFmZmluZVRyYW5zZm9ybSDlr7nosaHjgIJcbiAqIEBtZXRob2QgY3JlYXRlXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge051bWJlcn0gYVxuICogQHBhcmFtIHtOdW1iZXJ9IGJcbiAqIEBwYXJhbSB7TnVtYmVyfSBjXG4gKiBAcGFyYW0ge051bWJlcn0gZFxuICogQHBhcmFtIHtOdW1iZXJ9IHR4XG4gKiBAcGFyYW0ge051bWJlcn0gdHlcbiAqIEByZXR1cm4ge0FmZmluZVRyYW5zZm9ybX1cbiAqL1xuQWZmaW5lVHJhbnNmb3JtLmNyZWF0ZSA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB0eCwgdHkpIHtcbiAgICByZXR1cm4ge2E6IGEsIGI6IGIsIGM6IGMsIGQ6IGQsIHR4OiB0eCwgdHk6IHR5fTtcbn07XG5cbi8qKlxuICogISNlblxuICogQ3JlYXRlIGEgaWRlbnRpdHkgdHJhbnNmb3JtYXRpb24gbWF0cml4OiA8YnIvPlxuICogWyAxLCAwLCAwLCA8YnIvPlxuICogICAwLCAxLCAwIF1cbiAqICEjemhcbiAqIOWNleS9jeefqemYte+8mjxici8+XG4gKiBbIDEsIDAsIDAsIDxici8+XG4gKiAgIDAsIDEsIDAgXVxuICpcbiAqIEBtZXRob2QgaWRlbnRpdHlcbiAqIEBzdGF0aWNcbiAqIEByZXR1cm4ge0FmZmluZVRyYW5zZm9ybX1cbiAqL1xuQWZmaW5lVHJhbnNmb3JtLmlkZW50aXR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7YTogMS4wLCBiOiAwLjAsIGM6IDAuMCwgZDogMS4wLCB0eDogMC4wLCB0eTogMC4wfTtcbn07XG5cbi8qKlxuICogISNlbiBDbG9uZSBhIEFmZmluZVRyYW5zZm9ybSBvYmplY3QgZnJvbSB0aGUgc3BlY2lmaWVkIHRyYW5zZm9ybS5cbiAqICEjemgg5YWL6ZqG5oyH5a6a55qEIEFmZmluZVRyYW5zZm9ybSDlr7nosaHjgIJcbiAqIEBtZXRob2QgY2xvbmVcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7QWZmaW5lVHJhbnNmb3JtfSB0XG4gKiBAcmV0dXJuIHtBZmZpbmVUcmFuc2Zvcm19XG4gKi9cbkFmZmluZVRyYW5zZm9ybS5jbG9uZSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgcmV0dXJuIHthOiB0LmEsIGI6IHQuYiwgYzogdC5jLCBkOiB0LmQsIHR4OiB0LnR4LCB0eTogdC50eX07XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIENvbmNhdGVuYXRlIGEgdHJhbnNmb3JtIG1hdHJpeCB0byBhbm90aGVyXG4gKiBUaGUgcmVzdWx0cyBhcmUgcmVmbGVjdGVkIGluIHRoZSBvdXQgYWZmaW5lIHRyYW5zZm9ybVxuICogb3V0ID0gdDEgKiB0MlxuICogVGhpcyBmdW5jdGlvbiBpcyBtZW1vcnkgZnJlZSwgeW91IHNob3VsZCBjcmVhdGUgdGhlIG91dHB1dCBhZmZpbmUgdHJhbnNmb3JtIGJ5IHlvdXJzZWxmIGFuZCBtYW5hZ2UgaXRzIG1lbW9yeS5cbiAqICEjemhcbiAqIOaLvOaOpeS4pOS4quefqemYte+8jOWwhue7k+aenOS/neWtmOWIsCBvdXQg55+p6Zi144CC6L+Z5Liq5Ye95pWw5LiN5Yib5bu65Lu75L2V5YaF5a2Y77yM5L2g6ZyA6KaB5YWI5Yib5bu6IEFmZmluZVRyYW5zZm9ybSDlr7nosaHnlKjmnaXlrZjlgqjnu5PmnpzvvIzlubbkvZzkuLrnrKzkuIDkuKrlj4LmlbDkvKDlhaXlh73mlbDjgIJcbiAqIG91dCA9IHQxICogdDJcbiAqIEBtZXRob2QgY29uY2F0XG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge0FmZmluZVRyYW5zZm9ybX0gb3V0IE91dCBvYmplY3QgdG8gc3RvcmUgdGhlIGNvbmNhdCByZXN1bHRcbiAqIEBwYXJhbSB7QWZmaW5lVHJhbnNmb3JtfSB0MSBUaGUgZmlyc3QgdHJhbnNmb3JtIG9iamVjdC5cbiAqIEBwYXJhbSB7QWZmaW5lVHJhbnNmb3JtfSB0MiBUaGUgdHJhbnNmb3JtIG9iamVjdCB0byBjb25jYXRlbmF0ZS5cbiAqIEByZXR1cm4ge0FmZmluZVRyYW5zZm9ybX0gT3V0IG9iamVjdCB3aXRoIHRoZSByZXN1bHQgb2YgY29uY2F0ZW5hdGlvbi5cbiAqL1xuQWZmaW5lVHJhbnNmb3JtLmNvbmNhdCA9IGZ1bmN0aW9uIChvdXQsIHQxLCB0Mikge1xuICAgIHZhciBhID0gdDEuYSwgYiA9IHQxLmIsIGMgPSB0MS5jLCBkID0gdDEuZCwgdHggPSB0MS50eCwgdHkgPSB0MS50eTtcbiAgICBvdXQuYSA9IGEgKiB0Mi5hICsgYiAqIHQyLmM7XG4gICAgb3V0LmIgPSBhICogdDIuYiArIGIgKiB0Mi5kO1xuICAgIG91dC5jID0gYyAqIHQyLmEgKyBkICogdDIuYztcbiAgICBvdXQuZCA9IGMgKiB0Mi5iICsgZCAqIHQyLmQ7XG4gICAgb3V0LnR4ID0gdHggKiB0Mi5hICsgdHkgKiB0Mi5jICsgdDIudHg7XG4gICAgb3V0LnR5ID0gdHggKiB0Mi5iICsgdHkgKiB0Mi5kICsgdDIudHk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogISNlbiBHZXQgdGhlIGludmVydCB0cmFuc2Zvcm0gb2YgYW4gQWZmaW5lVHJhbnNmb3JtIG9iamVjdC5cbiAqIFRoaXMgZnVuY3Rpb24gaXMgbWVtb3J5IGZyZWUsIHlvdSBzaG91bGQgY3JlYXRlIHRoZSBvdXRwdXQgYWZmaW5lIHRyYW5zZm9ybSBieSB5b3Vyc2VsZiBhbmQgbWFuYWdlIGl0cyBtZW1vcnkuXG4gKiAhI3poIOaxgumAhuefqemYteOAgui/meS4quWHveaVsOS4jeWIm+W7uuS7u+S9leWGheWtmO+8jOS9oOmcgOimgeWFiOWIm+W7uiBBZmZpbmVUcmFuc2Zvcm0g5a+56LGh55So5p2l5a2Y5YKo57uT5p6c77yM5bm25L2c5Li656ys5LiA5Liq5Y+C5pWw5Lyg5YWl5Ye95pWw44CCXG4gKiBAbWV0aG9kIGludmVydFxuICogQHN0YXRpY1xuICogQHBhcmFtIHtBZmZpbmVUcmFuc2Zvcm19IG91dFxuICogQHBhcmFtIHtBZmZpbmVUcmFuc2Zvcm19IHRcbiAqIEByZXR1cm4ge0FmZmluZVRyYW5zZm9ybX0gT3V0IG9iamVjdCB3aXRoIGludmVydGVkIHJlc3VsdC5cbiAqL1xuQWZmaW5lVHJhbnNmb3JtLmludmVydCA9IGZ1bmN0aW9uIChvdXQsIHQpIHtcbiAgICB2YXIgYSA9IHQuYSwgYiA9IHQuYiwgYyA9IHQuYywgZCA9IHQuZDtcbiAgICB2YXIgZGV0ZXJtaW5hbnQgPSAxIC8gKGEgKiBkIC0gYiAqIGMpO1xuICAgIHZhciB0eCA9IHQudHgsIHR5ID0gdC50eTtcbiAgICBvdXQuYSA9IGRldGVybWluYW50ICogZDtcbiAgICBvdXQuYiA9IC1kZXRlcm1pbmFudCAqIGI7XG4gICAgb3V0LmMgPSAtZGV0ZXJtaW5hbnQgKiBjO1xuICAgIG91dC5kID0gZGV0ZXJtaW5hbnQgKiBhO1xuICAgIG91dC50eCA9IGRldGVybWluYW50ICogKGMgKiB0eSAtIGQgKiB0eCk7XG4gICAgb3V0LnR5ID0gZGV0ZXJtaW5hbnQgKiAoYiAqIHR4IC0gYSAqIHR5KTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiAhI2VuIEdldCBhbiBBZmZpbmVUcmFuc2Zvcm0gb2JqZWN0IGZyb20gYSBnaXZlbiBtYXRyaXggNHg0LlxuICogVGhpcyBmdW5jdGlvbiBpcyBtZW1vcnkgZnJlZSwgeW91IHNob3VsZCBjcmVhdGUgdGhlIG91dHB1dCBhZmZpbmUgdHJhbnNmb3JtIGJ5IHlvdXJzZWxmIGFuZCBtYW5hZ2UgaXRzIG1lbW9yeS5cbiAqICEjemgg5LuO5LiA5LiqIDR4NCBNYXRyaXgg6I635Y+WIEFmZmluZVRyYW5zZm9ybSDlr7nosaHjgILov5nkuKrlh73mlbDkuI3liJvlu7rku7vkvZXlhoXlrZjvvIzkvaDpnIDopoHlhYjliJvlu7ogQWZmaW5lVHJhbnNmb3JtIOWvueixoeeUqOadpeWtmOWCqOe7k+aenO+8jOW5tuS9nOS4uuesrOS4gOS4quWPguaVsOS8oOWFpeWHveaVsOOAglxuICogQG1ldGhvZCBpbnZlcnRcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7QWZmaW5lVHJhbnNmb3JtfSBvdXRcbiAqIEBwYXJhbSB7TWF0NH0gbWF0XG4gKiBAcmV0dXJuIHtBZmZpbmVUcmFuc2Zvcm19IE91dCBvYmplY3Qgd2l0aCBpbnZlcnRlZCByZXN1bHQuXG4gKi9cbkFmZmluZVRyYW5zZm9ybS5mcm9tTWF0NCA9IGZ1bmN0aW9uIChvdXQsIG1hdCkge1xuICAgIGxldCBtYXRtID0gbWF0Lm07XG4gICAgb3V0LmEgPSBtYXRtWzBdO1xuICAgIG91dC5iID0gbWF0bVsxXTtcbiAgICBvdXQuYyA9IG1hdG1bNF07XG4gICAgb3V0LmQgPSBtYXRtWzVdO1xuICAgIG91dC50eCA9IG1hdG1bMTJdO1xuICAgIG91dC50eSA9IG1hdG1bMTNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqICEjZW4gQXBwbHkgdGhlIGFmZmluZSB0cmFuc2Zvcm1hdGlvbiBvbiBhIHBvaW50LlxuICogVGhpcyBmdW5jdGlvbiBpcyBtZW1vcnkgZnJlZSwgeW91IHNob3VsZCBjcmVhdGUgdGhlIG91dHB1dCBWZWMyIGJ5IHlvdXJzZWxmIGFuZCBtYW5hZ2UgaXRzIG1lbW9yeS5cbiAqICEjemgg5a+55LiA5Liq54K55bqU55So55+p6Zi15Y+Y5o2i44CC6L+Z5Liq5Ye95pWw5LiN5Yib5bu65Lu75L2V5YaF5a2Y77yM5L2g6ZyA6KaB5YWI5Yib5bu65LiA5LiqIFZlYzIg5a+56LGh55So5p2l5a2Y5YKo57uT5p6c77yM5bm25L2c5Li656ys5LiA5Liq5Y+C5pWw5Lyg5YWl5Ye95pWw44CCXG4gKiBAbWV0aG9kIHRyYW5zZm9ybVZlYzJcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7VmVjMn0gb3V0IFRoZSBvdXRwdXQgcG9pbnQgdG8gc3RvcmUgdGhlIHJlc3VsdFxuICogQHBhcmFtIHtWZWMyfE51bWJlcn0gcG9pbnQgUG9pbnQgdG8gYXBwbHkgdHJhbnNmb3JtIG9yIHguXG4gKiBAcGFyYW0ge0FmZmluZVRyYW5zZm9ybXxOdW1iZXJ9IHRyYW5zT3JZIHRyYW5zZm9ybSBtYXRyaXggb3IgeS5cbiAqIEBwYXJhbSB7QWZmaW5lVHJhbnNmb3JtfSBbdF0gdHJhbnNmb3JtIG1hdHJpeC5cbiAqIEByZXR1cm4ge1ZlYzJ9XG4gKi9cbkFmZmluZVRyYW5zZm9ybS50cmFuc2Zvcm1WZWMyID0gZnVuY3Rpb24gKG91dCwgcG9pbnQsIHRyYW5zT3JZLCB0KSB7XG4gICAgdmFyIHgsIHk7XG4gICAgaWYgKHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0ID0gdHJhbnNPclk7XG4gICAgICAgIHggPSBwb2ludC54O1xuICAgICAgICB5ID0gcG9pbnQueTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB4ID0gcG9pbnQ7XG4gICAgICAgIHkgPSB0cmFuc09yWTtcbiAgICB9XG4gICAgb3V0LnggPSB0LmEgKiB4ICsgdC5jICogeSArIHQudHg7XG4gICAgb3V0LnkgPSB0LmIgKiB4ICsgdC5kICogeSArIHQudHk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogISNlbiBBcHBseSB0aGUgYWZmaW5lIHRyYW5zZm9ybWF0aW9uIG9uIGEgc2l6ZS5cbiAqIFRoaXMgZnVuY3Rpb24gaXMgbWVtb3J5IGZyZWUsIHlvdSBzaG91bGQgY3JlYXRlIHRoZSBvdXRwdXQgU2l6ZSBieSB5b3Vyc2VsZiBhbmQgbWFuYWdlIGl0cyBtZW1vcnkuXG4gKiAhI3poIOW6lOeUqOS7v+WwhOWPmOaNouefqemYteWIsCBTaXplIOS4iuOAgui/meS4quWHveaVsOS4jeWIm+W7uuS7u+S9leWGheWtmO+8jOS9oOmcgOimgeWFiOWIm+W7uuS4gOS4qiBTaXplIOWvueixoeeUqOadpeWtmOWCqOe7k+aenO+8jOW5tuS9nOS4uuesrOS4gOS4quWPguaVsOS8oOWFpeWHveaVsOOAglxuICogQG1ldGhvZCB0cmFuc2Zvcm1TaXplXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge1NpemV9IG91dCBUaGUgb3V0cHV0IHBvaW50IHRvIHN0b3JlIHRoZSByZXN1bHRcbiAqIEBwYXJhbSB7U2l6ZX0gc2l6ZVxuICogQHBhcmFtIHtBZmZpbmVUcmFuc2Zvcm19IHRcbiAqIEByZXR1cm4ge1NpemV9XG4gKi9cbkFmZmluZVRyYW5zZm9ybS50cmFuc2Zvcm1TaXplID0gZnVuY3Rpb24gKG91dCwgc2l6ZSwgdCkge1xuICAgIG91dC53aWR0aCA9IHQuYSAqIHNpemUud2lkdGggKyB0LmMgKiBzaXplLmhlaWdodDtcbiAgICBvdXQuaGVpZ2h0ID0gdC5iICogc2l6ZS53aWR0aCArIHQuZCAqIHNpemUuaGVpZ2h0O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqICEjZW4gQXBwbHkgdGhlIGFmZmluZSB0cmFuc2Zvcm1hdGlvbiBvbiBhIHJlY3QuXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIG1lbW9yeSBmcmVlLCB5b3Ugc2hvdWxkIGNyZWF0ZSB0aGUgb3V0cHV0IFJlY3QgYnkgeW91cnNlbGYgYW5kIG1hbmFnZSBpdHMgbWVtb3J5LlxuICogISN6aCDlupTnlKjku7/lsITlj5jmjaLnn6npmLXliLAgUmVjdCDkuIrjgILov5nkuKrlh73mlbDkuI3liJvlu7rku7vkvZXlhoXlrZjvvIzkvaDpnIDopoHlhYjliJvlu7rkuIDkuKogUmVjdCDlr7nosaHnlKjmnaXlrZjlgqjnu5PmnpzvvIzlubbkvZzkuLrnrKzkuIDkuKrlj4LmlbDkvKDlhaXlh73mlbDjgIJcbiAqIEBtZXRob2QgdHJhbnNmb3JtUmVjdFxuICogQHN0YXRpY1xuICogQHBhcmFtIHtSZWN0fSBvdXRcbiAqIEBwYXJhbSB7UmVjdH0gcmVjdFxuICogQHBhcmFtIHtBZmZpbmVUcmFuc2Zvcm19IGFuQWZmaW5lVHJhbnNmb3JtXG4gKiBAcmV0dXJuIHtSZWN0fVxuICovXG5BZmZpbmVUcmFuc2Zvcm0udHJhbnNmb3JtUmVjdCA9IGZ1bmN0aW9uKG91dCwgcmVjdCwgdCl7XG4gICAgdmFyIG9sID0gcmVjdC54O1xuICAgIHZhciBvYiA9IHJlY3QueTtcbiAgICB2YXIgb3IgPSBvbCArIHJlY3Qud2lkdGg7XG4gICAgdmFyIG90ID0gb2IgKyByZWN0LmhlaWdodDtcbiAgICB2YXIgbGJ4ID0gdC5hICogb2wgKyB0LmMgKiBvYiArIHQudHg7XG4gICAgdmFyIGxieSA9IHQuYiAqIG9sICsgdC5kICogb2IgKyB0LnR5O1xuICAgIHZhciByYnggPSB0LmEgKiBvciArIHQuYyAqIG9iICsgdC50eDtcbiAgICB2YXIgcmJ5ID0gdC5iICogb3IgKyB0LmQgKiBvYiArIHQudHk7XG4gICAgdmFyIGx0eCA9IHQuYSAqIG9sICsgdC5jICogb3QgKyB0LnR4O1xuICAgIHZhciBsdHkgPSB0LmIgKiBvbCArIHQuZCAqIG90ICsgdC50eTtcbiAgICB2YXIgcnR4ID0gdC5hICogb3IgKyB0LmMgKiBvdCArIHQudHg7XG4gICAgdmFyIHJ0eSA9IHQuYiAqIG9yICsgdC5kICogb3QgKyB0LnR5O1xuXG4gICAgdmFyIG1pblggPSBNYXRoLm1pbihsYngsIHJieCwgbHR4LCBydHgpO1xuICAgIHZhciBtYXhYID0gTWF0aC5tYXgobGJ4LCByYngsIGx0eCwgcnR4KTtcbiAgICB2YXIgbWluWSA9IE1hdGgubWluKGxieSwgcmJ5LCBsdHksIHJ0eSk7XG4gICAgdmFyIG1heFkgPSBNYXRoLm1heChsYnksIHJieSwgbHR5LCBydHkpO1xuXG4gICAgb3V0LnggPSBtaW5YO1xuICAgIG91dC55ID0gbWluWTtcbiAgICBvdXQud2lkdGggPSBtYXhYIC0gbWluWDtcbiAgICBvdXQuaGVpZ2h0ID0gbWF4WSAtIG1pblk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogISNlbiBBcHBseSB0aGUgYWZmaW5lIHRyYW5zZm9ybWF0aW9uIG9uIGEgcmVjdCwgYW5kIHRydW5zIHRvIGFuIE9yaWVudGVkIEJvdW5kaW5nIEJveC5cbiAqIFRoaXMgZnVuY3Rpb24gaXMgbWVtb3J5IGZyZWUsIHlvdSBzaG91bGQgY3JlYXRlIHRoZSBvdXRwdXQgdmVjdG9ycyBieSB5b3Vyc2VsZiBhbmQgbWFuYWdlIHRoZWlyIG1lbW9yeS5cbiAqICEjemgg5bqU55So5Lu/5bCE5Y+Y5o2i55+p6Zi15YiwIFJlY3Qg5LiKLCDlubbovazmjaLkuLrmnInlkJHljIXlm7Tnm5LjgILov5nkuKrlh73mlbDkuI3liJvlu7rku7vkvZXlhoXlrZjvvIzkvaDpnIDopoHlhYjliJvlu7rljIXlm7Tnm5LnmoTlm5vkuKogVmVjdG9yIOWvueixoeeUqOadpeWtmOWCqOe7k+aenO+8jOW5tuS9nOS4uuWJjeWbm+S4quWPguaVsOS8oOWFpeWHveaVsOOAglxuICogQG1ldGhvZCB0cmFuc2Zvcm1PYmJcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7VmVjMn0gb3V0X2JsXG4gKiBAcGFyYW0ge1ZlYzJ9IG91dF90bFxuICogQHBhcmFtIHtWZWMyfSBvdXRfdHJcbiAqIEBwYXJhbSB7VmVjMn0gb3V0X2JyXG4gKiBAcGFyYW0ge1JlY3R9IHJlY3RcbiAqIEBwYXJhbSB7QWZmaW5lVHJhbnNmb3JtfSBhbkFmZmluZVRyYW5zZm9ybVxuICovXG5BZmZpbmVUcmFuc2Zvcm0udHJhbnNmb3JtT2JiID0gZnVuY3Rpb24gKG91dF9ibCwgb3V0X3RsLCBvdXRfdHIsIG91dF9iciwgcmVjdCwgYW5BZmZpbmVUcmFuc2Zvcm0pIHtcbiAgICB2YXIgeCA9IHJlY3QueDtcbiAgICB2YXIgeSA9IHJlY3QueTtcbiAgICB2YXIgd2lkdGggPSByZWN0LndpZHRoO1xuICAgIHZhciBoZWlnaHQgPSByZWN0LmhlaWdodDtcblxuICAgIHZhciB0eCA9IGFuQWZmaW5lVHJhbnNmb3JtLmEgKiB4ICsgYW5BZmZpbmVUcmFuc2Zvcm0uYyAqIHkgKyBhbkFmZmluZVRyYW5zZm9ybS50eDtcbiAgICB2YXIgdHkgPSBhbkFmZmluZVRyYW5zZm9ybS5iICogeCArIGFuQWZmaW5lVHJhbnNmb3JtLmQgKiB5ICsgYW5BZmZpbmVUcmFuc2Zvcm0udHk7XG4gICAgdmFyIHhhID0gYW5BZmZpbmVUcmFuc2Zvcm0uYSAqIHdpZHRoO1xuICAgIHZhciB4YiA9IGFuQWZmaW5lVHJhbnNmb3JtLmIgKiB3aWR0aDtcbiAgICB2YXIgeWMgPSBhbkFmZmluZVRyYW5zZm9ybS5jICogaGVpZ2h0O1xuICAgIHZhciB5ZCA9IGFuQWZmaW5lVHJhbnNmb3JtLmQgKiBoZWlnaHQ7XG5cbiAgICBvdXRfdGwueCA9IHR4O1xuICAgIG91dF90bC55ID0gdHk7XG4gICAgb3V0X3RyLnggPSB4YSArIHR4O1xuICAgIG91dF90ci55ID0geGIgKyB0eTtcbiAgICBvdXRfYmwueCA9IHljICsgdHg7XG4gICAgb3V0X2JsLnkgPSB5ZCArIHR5O1xuICAgIG91dF9ici54ID0geGEgKyB5YyArIHR4O1xuICAgIG91dF9ici55ID0geGIgKyB5ZCArIHR5O1xufTtcblxuY2MuQWZmaW5lVHJhbnNmb3JtID0gbW9kdWxlLmV4cG9ydHMgPSBBZmZpbmVUcmFuc2Zvcm07Il0sInNvdXJjZVJvb3QiOiIvIn0=