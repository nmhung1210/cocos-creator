
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/collider/CCContact.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
var Intersection = require('./CCIntersection');

var CollisionType = cc.Enum({
  None: 0,
  CollisionEnter: 1,
  CollisionStay: 2,
  CollisionExit: 3
});

function Contact(collider1, collider2) {
  this.collider1 = collider1;
  this.collider2 = collider2;
  this.touching = false;
  var isCollider1Polygon = collider1 instanceof cc.BoxCollider || collider1 instanceof cc.PolygonCollider;
  var isCollider2Polygon = collider2 instanceof cc.BoxCollider || collider2 instanceof cc.PolygonCollider;
  var isCollider1Circle = collider1 instanceof cc.CircleCollider;
  var isCollider2Circle = collider2 instanceof cc.CircleCollider;

  if (isCollider1Polygon && isCollider2Polygon) {
    this.testFunc = Intersection.polygonPolygon;
  } else if (isCollider1Circle && isCollider2Circle) {
    this.testFunc = Intersection.circleCircle;
  } else if (isCollider1Polygon && isCollider2Circle) {
    this.testFunc = Intersection.polygonCircle;
  } else if (isCollider1Circle && isCollider2Polygon) {
    this.testFunc = Intersection.polygonCircle;
    this.collider1 = collider2;
    this.collider2 = collider1;
  } else {
    cc.errorID(6601, cc.js.getClassName(collider1), cc.js.getClassName(collider2));
  }
}

Contact.prototype.test = function () {
  var world1 = this.collider1.world;
  var world2 = this.collider2.world;

  if (!world1.aabb.intersects(world2.aabb)) {
    return false;
  }

  if (this.testFunc === Intersection.polygonPolygon) {
    return this.testFunc(world1.points, world2.points);
  } else if (this.testFunc === Intersection.circleCircle) {
    return this.testFunc(world1, world2);
  } else if (this.testFunc === Intersection.polygonCircle) {
    return this.testFunc(world1.points, world2);
  }

  return false;
};

Contact.prototype.updateState = function () {
  var result = this.test();
  var type = CollisionType.None;

  if (result && !this.touching) {
    this.touching = true;
    type = CollisionType.CollisionEnter;
  } else if (result && this.touching) {
    type = CollisionType.CollisionStay;
  } else if (!result && this.touching) {
    this.touching = false;
    type = CollisionType.CollisionExit;
  }

  return type;
};

Contact.CollisionType = CollisionType;
module.exports = Contact;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbGxpZGVyL0NDQ29udGFjdC5qcyJdLCJuYW1lcyI6WyJJbnRlcnNlY3Rpb24iLCJyZXF1aXJlIiwiQ29sbGlzaW9uVHlwZSIsImNjIiwiRW51bSIsIk5vbmUiLCJDb2xsaXNpb25FbnRlciIsIkNvbGxpc2lvblN0YXkiLCJDb2xsaXNpb25FeGl0IiwiQ29udGFjdCIsImNvbGxpZGVyMSIsImNvbGxpZGVyMiIsInRvdWNoaW5nIiwiaXNDb2xsaWRlcjFQb2x5Z29uIiwiQm94Q29sbGlkZXIiLCJQb2x5Z29uQ29sbGlkZXIiLCJpc0NvbGxpZGVyMlBvbHlnb24iLCJpc0NvbGxpZGVyMUNpcmNsZSIsIkNpcmNsZUNvbGxpZGVyIiwiaXNDb2xsaWRlcjJDaXJjbGUiLCJ0ZXN0RnVuYyIsInBvbHlnb25Qb2x5Z29uIiwiY2lyY2xlQ2lyY2xlIiwicG9seWdvbkNpcmNsZSIsImVycm9ySUQiLCJqcyIsImdldENsYXNzTmFtZSIsInByb3RvdHlwZSIsInRlc3QiLCJ3b3JsZDEiLCJ3b3JsZCIsIndvcmxkMiIsImFhYmIiLCJpbnRlcnNlY3RzIiwicG9pbnRzIiwidXBkYXRlU3RhdGUiLCJyZXN1bHQiLCJ0eXBlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBSUEsWUFBWSxHQUFHQyxPQUFPLENBQUMsa0JBQUQsQ0FBMUI7O0FBRUEsSUFBSUMsYUFBYSxHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUN4QkMsRUFBQUEsSUFBSSxFQUFFLENBRGtCO0FBRXhCQyxFQUFBQSxjQUFjLEVBQUUsQ0FGUTtBQUd4QkMsRUFBQUEsYUFBYSxFQUFFLENBSFM7QUFJeEJDLEVBQUFBLGFBQWEsRUFBRTtBQUpTLENBQVIsQ0FBcEI7O0FBT0EsU0FBU0MsT0FBVCxDQUFrQkMsU0FBbEIsRUFBNkJDLFNBQTdCLEVBQXdDO0FBQ3BD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LElBQUksR0FBR25DLGFBQWEsQ0FBQ0ksY0FBckI7QUFDSCxHQUhELE1BSUssSUFBSThCLE1BQU0sSUFBSSxLQUFLeEIsUUFBbkIsRUFBNkI7QUFDOUJ5QixJQUFBQSxJQUFJLEdBQUduQyxhQUFhLENBQUNLLGFBQXJCO0FBQ0gsR0FGSSxNQUdBLElBQUksQ0FBQzZCLE1BQUQsSUFBVyxLQUFLeEIsUUFBcEIsRUFBOEI7QUFDL0IsU0FBS0EsUUFBTCxHQUFnQixLQUFoQjtBQUNBeUIsSUFBQUEsSUFBSSxHQUFHbkMsYUFBYSxDQUFDTSxhQUFyQjtBQUNIOztBQUVELFNBQU82QixJQUFQO0FBQ0gsQ0FqQkQ7O0FBb0JBNUIsT0FBTyxDQUFDUCxhQUFSLEdBQXdCQSxhQUF4QjtBQUVBb0MsTUFBTSxDQUFDQyxPQUFQLEdBQWlCOUIsT0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbnZhciBJbnRlcnNlY3Rpb24gPSByZXF1aXJlKCcuL0NDSW50ZXJzZWN0aW9uJyk7XG5cbnZhciBDb2xsaXNpb25UeXBlID0gY2MuRW51bSh7XG4gICAgTm9uZTogMCxcbiAgICBDb2xsaXNpb25FbnRlcjogMSxcbiAgICBDb2xsaXNpb25TdGF5OiAyLFxuICAgIENvbGxpc2lvbkV4aXQ6IDNcbn0pO1xuXG5mdW5jdGlvbiBDb250YWN0IChjb2xsaWRlcjEsIGNvbGxpZGVyMikge1xuICAgIHRoaXMuY29sbGlkZXIxID0gY29sbGlkZXIxO1xuICAgIHRoaXMuY29sbGlkZXIyID0gY29sbGlkZXIyO1xuXG4gICAgdGhpcy50b3VjaGluZyA9IGZhbHNlO1xuXG4gICAgdmFyIGlzQ29sbGlkZXIxUG9seWdvbiA9IChjb2xsaWRlcjEgaW5zdGFuY2VvZiBjYy5Cb3hDb2xsaWRlcikgfHwgKGNvbGxpZGVyMSBpbnN0YW5jZW9mIGNjLlBvbHlnb25Db2xsaWRlcik7XG4gICAgdmFyIGlzQ29sbGlkZXIyUG9seWdvbiA9IChjb2xsaWRlcjIgaW5zdGFuY2VvZiBjYy5Cb3hDb2xsaWRlcikgfHwgKGNvbGxpZGVyMiBpbnN0YW5jZW9mIGNjLlBvbHlnb25Db2xsaWRlcik7XG4gICAgdmFyIGlzQ29sbGlkZXIxQ2lyY2xlID0gY29sbGlkZXIxIGluc3RhbmNlb2YgY2MuQ2lyY2xlQ29sbGlkZXI7XG4gICAgdmFyIGlzQ29sbGlkZXIyQ2lyY2xlID0gY29sbGlkZXIyIGluc3RhbmNlb2YgY2MuQ2lyY2xlQ29sbGlkZXI7XG5cbiAgICBpZiAoaXNDb2xsaWRlcjFQb2x5Z29uICYmIGlzQ29sbGlkZXIyUG9seWdvbikge1xuICAgICAgICB0aGlzLnRlc3RGdW5jID0gSW50ZXJzZWN0aW9uLnBvbHlnb25Qb2x5Z29uO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc0NvbGxpZGVyMUNpcmNsZSAmJiBpc0NvbGxpZGVyMkNpcmNsZSkge1xuICAgICAgICB0aGlzLnRlc3RGdW5jID0gSW50ZXJzZWN0aW9uLmNpcmNsZUNpcmNsZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNDb2xsaWRlcjFQb2x5Z29uICYmIGlzQ29sbGlkZXIyQ2lyY2xlKSB7XG4gICAgICAgIHRoaXMudGVzdEZ1bmMgPSBJbnRlcnNlY3Rpb24ucG9seWdvbkNpcmNsZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNDb2xsaWRlcjFDaXJjbGUgJiYgaXNDb2xsaWRlcjJQb2x5Z29uKSB7XG4gICAgICAgIHRoaXMudGVzdEZ1bmMgPSBJbnRlcnNlY3Rpb24ucG9seWdvbkNpcmNsZTtcbiAgICAgICAgdGhpcy5jb2xsaWRlcjEgPSBjb2xsaWRlcjI7XG4gICAgICAgIHRoaXMuY29sbGlkZXIyID0gY29sbGlkZXIxO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY2MuZXJyb3JJRCg2NjAxLCBjYy5qcy5nZXRDbGFzc05hbWUoY29sbGlkZXIxKSwgY2MuanMuZ2V0Q2xhc3NOYW1lKGNvbGxpZGVyMikpO1xuICAgIH1cbn1cblxuQ29udGFjdC5wcm90b3R5cGUudGVzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgd29ybGQxID0gdGhpcy5jb2xsaWRlcjEud29ybGQ7XG4gICAgdmFyIHdvcmxkMiA9IHRoaXMuY29sbGlkZXIyLndvcmxkO1xuXG4gICAgaWYgKCF3b3JsZDEuYWFiYi5pbnRlcnNlY3RzKHdvcmxkMi5hYWJiKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGVzdEZ1bmMgPT09IEludGVyc2VjdGlvbi5wb2x5Z29uUG9seWdvbikge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXN0RnVuYyh3b3JsZDEucG9pbnRzLCB3b3JsZDIucG9pbnRzKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy50ZXN0RnVuYyA9PT0gSW50ZXJzZWN0aW9uLmNpcmNsZUNpcmNsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXN0RnVuYyh3b3JsZDEsIHdvcmxkMik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMudGVzdEZ1bmMgPT09IEludGVyc2VjdGlvbi5wb2x5Z29uQ2lyY2xlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRlc3RGdW5jKHdvcmxkMS5wb2ludHMsIHdvcmxkMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuQ29udGFjdC5wcm90b3R5cGUudXBkYXRlU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMudGVzdCgpO1xuXG4gICAgdmFyIHR5cGUgPSBDb2xsaXNpb25UeXBlLk5vbmU7XG4gICAgaWYgKHJlc3VsdCAmJiAhdGhpcy50b3VjaGluZykge1xuICAgICAgICB0aGlzLnRvdWNoaW5nID0gdHJ1ZTtcbiAgICAgICAgdHlwZSA9IENvbGxpc2lvblR5cGUuQ29sbGlzaW9uRW50ZXI7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc3VsdCAmJiB0aGlzLnRvdWNoaW5nKSB7XG4gICAgICAgIHR5cGUgPSBDb2xsaXNpb25UeXBlLkNvbGxpc2lvblN0YXk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFyZXN1bHQgJiYgdGhpcy50b3VjaGluZykge1xuICAgICAgICB0aGlzLnRvdWNoaW5nID0gZmFsc2U7XG4gICAgICAgIHR5cGUgPSBDb2xsaXNpb25UeXBlLkNvbGxpc2lvbkV4aXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHR5cGU7XG59O1xuXG5cbkNvbnRhY3QuQ29sbGlzaW9uVHlwZSA9IENvbGxpc2lvblR5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGFjdDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9