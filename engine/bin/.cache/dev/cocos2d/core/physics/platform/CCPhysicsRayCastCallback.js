
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/platform/CCPhysicsRayCastCallback.js';
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
function PhysicsRayCastCallback() {
  this._type = 0;
  this._fixtures = [];
  this._points = [];
  this._normals = [];
  this._fractions = [];
}

PhysicsRayCastCallback.prototype.init = function (type) {
  this._type = type;
  this._fixtures.length = 0;
  this._points.length = 0;
  this._normals.length = 0;
  this._fractions.length = 0;
};

PhysicsRayCastCallback.prototype.ReportFixture = function (fixture, point, normal, fraction) {
  if (this._type === 0) {
    // closest
    this._fixtures[0] = fixture;
    this._points[0] = point;
    this._normals[0] = normal;
    this._fractions[0] = fraction;
    return fraction;
  }

  this._fixtures.push(fixture);

  this._points.push(cc.v2(point));

  this._normals.push(cc.v2(normal));

  this._fractions.push(fraction);

  if (this._type === 1) {
    // any
    return 0;
  } else if (this._type >= 2) {
    // all
    return 1;
  }

  return fraction;
};

PhysicsRayCastCallback.prototype.getFixtures = function () {
  return this._fixtures;
};

PhysicsRayCastCallback.prototype.getPoints = function () {
  return this._points;
};

PhysicsRayCastCallback.prototype.getNormals = function () {
  return this._normals;
};

PhysicsRayCastCallback.prototype.getFractions = function () {
  return this._fractions;
};

cc.PhysicsRayCastCallback = module.exports = PhysicsRayCastCallback;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3MvcGxhdGZvcm0vQ0NQaHlzaWNzUmF5Q2FzdENhbGxiYWNrLmpzIl0sIm5hbWVzIjpbIlBoeXNpY3NSYXlDYXN0Q2FsbGJhY2siLCJfdHlwZSIsIl9maXh0dXJlcyIsIl9wb2ludHMiLCJfbm9ybWFscyIsIl9mcmFjdGlvbnMiLCJwcm90b3R5cGUiLCJpbml0IiwidHlwZSIsImxlbmd0aCIsIlJlcG9ydEZpeHR1cmUiLCJmaXh0dXJlIiwicG9pbnQiLCJub3JtYWwiLCJmcmFjdGlvbiIsInB1c2giLCJjYyIsInYyIiwiZ2V0Rml4dHVyZXMiLCJnZXRQb2ludHMiLCJnZXROb3JtYWxzIiwiZ2V0RnJhY3Rpb25zIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsU0FBU0Esc0JBQVQsR0FBbUM7QUFDL0IsT0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDQSxPQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsT0FBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSxPQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNIOztBQUVETCxzQkFBc0IsQ0FBQ00sU0FBdkIsQ0FBaUNDLElBQWpDLEdBQXdDLFVBQVVDLElBQVYsRUFBZ0I7QUFDcEQsT0FBS1AsS0FBTCxHQUFhTyxJQUFiO0FBQ0EsT0FBS04sU0FBTCxDQUFlTyxNQUFmLEdBQXdCLENBQXhCO0FBQ0EsT0FBS04sT0FBTCxDQUFhTSxNQUFiLEdBQXNCLENBQXRCO0FBQ0EsT0FBS0wsUUFBTCxDQUFjSyxNQUFkLEdBQXVCLENBQXZCO0FBQ0EsT0FBS0osVUFBTCxDQUFnQkksTUFBaEIsR0FBeUIsQ0FBekI7QUFDSCxDQU5EOztBQVFBVCxzQkFBc0IsQ0FBQ00sU0FBdkIsQ0FBaUNJLGFBQWpDLEdBQWlELFVBQVVDLE9BQVYsRUFBbUJDLEtBQW5CLEVBQTBCQyxNQUExQixFQUFrQ0MsUUFBbEMsRUFBNEM7QUFDekYsTUFBSSxLQUFLYixLQUFMLEtBQWUsQ0FBbkIsRUFBc0I7QUFBRTtBQUNwQixTQUFLQyxTQUFMLENBQWUsQ0FBZixJQUFvQlMsT0FBcEI7QUFDQSxTQUFLUixPQUFMLENBQWEsQ0FBYixJQUFrQlMsS0FBbEI7QUFDQSxTQUFLUixRQUFMLENBQWMsQ0FBZCxJQUFtQlMsTUFBbkI7QUFDQSxTQUFLUixVQUFMLENBQWdCLENBQWhCLElBQXFCUyxRQUFyQjtBQUNBLFdBQU9BLFFBQVA7QUFDSDs7QUFFRCxPQUFLWixTQUFMLENBQWVhLElBQWYsQ0FBb0JKLE9BQXBCOztBQUNBLE9BQUtSLE9BQUwsQ0FBYVksSUFBYixDQUFrQkMsRUFBRSxDQUFDQyxFQUFILENBQU1MLEtBQU4sQ0FBbEI7O0FBQ0EsT0FBS1IsUUFBTCxDQUFjVyxJQUFkLENBQW1CQyxFQUFFLENBQUNDLEVBQUgsQ0FBTUosTUFBTixDQUFuQjs7QUFDQSxPQUFLUixVQUFMLENBQWdCVSxJQUFoQixDQUFxQkQsUUFBckI7O0FBRUEsTUFBSSxLQUFLYixLQUFMLEtBQWUsQ0FBbkIsRUFBc0I7QUFBRTtBQUNwQixXQUFPLENBQVA7QUFDSCxHQUZELE1BR0ssSUFBSSxLQUFLQSxLQUFMLElBQWMsQ0FBbEIsRUFBcUI7QUFBRTtBQUN4QixXQUFPLENBQVA7QUFDSDs7QUFFRCxTQUFPYSxRQUFQO0FBQ0gsQ0F0QkQ7O0FBeUJBZCxzQkFBc0IsQ0FBQ00sU0FBdkIsQ0FBaUNZLFdBQWpDLEdBQStDLFlBQVk7QUFDdkQsU0FBTyxLQUFLaEIsU0FBWjtBQUNILENBRkQ7O0FBSUFGLHNCQUFzQixDQUFDTSxTQUF2QixDQUFpQ2EsU0FBakMsR0FBNkMsWUFBWTtBQUNyRCxTQUFPLEtBQUtoQixPQUFaO0FBQ0gsQ0FGRDs7QUFJQUgsc0JBQXNCLENBQUNNLFNBQXZCLENBQWlDYyxVQUFqQyxHQUE4QyxZQUFZO0FBQ3RELFNBQU8sS0FBS2hCLFFBQVo7QUFDSCxDQUZEOztBQUlBSixzQkFBc0IsQ0FBQ00sU0FBdkIsQ0FBaUNlLFlBQWpDLEdBQWdELFlBQVk7QUFDeEQsU0FBTyxLQUFLaEIsVUFBWjtBQUNILENBRkQ7O0FBSUFXLEVBQUUsQ0FBQ2hCLHNCQUFILEdBQTRCc0IsTUFBTSxDQUFDQyxPQUFQLEdBQWlCdkIsc0JBQTdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5mdW5jdGlvbiBQaHlzaWNzUmF5Q2FzdENhbGxiYWNrICgpIHtcbiAgICB0aGlzLl90eXBlID0gMDtcbiAgICB0aGlzLl9maXh0dXJlcyA9IFtdO1xuICAgIHRoaXMuX3BvaW50cyA9IFtdO1xuICAgIHRoaXMuX25vcm1hbHMgPSBbXTtcbiAgICB0aGlzLl9mcmFjdGlvbnMgPSBbXTtcbn1cblxuUGh5c2ljc1JheUNhc3RDYWxsYmFjay5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgdGhpcy5fZml4dHVyZXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLl9wb2ludHMubGVuZ3RoID0gMDtcbiAgICB0aGlzLl9ub3JtYWxzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5fZnJhY3Rpb25zLmxlbmd0aCA9IDA7XG59O1xuXG5QaHlzaWNzUmF5Q2FzdENhbGxiYWNrLnByb3RvdHlwZS5SZXBvcnRGaXh0dXJlID0gZnVuY3Rpb24gKGZpeHR1cmUsIHBvaW50LCBub3JtYWwsIGZyYWN0aW9uKSB7XG4gICAgaWYgKHRoaXMuX3R5cGUgPT09IDApIHsgLy8gY2xvc2VzdFxuICAgICAgICB0aGlzLl9maXh0dXJlc1swXSA9IGZpeHR1cmU7XG4gICAgICAgIHRoaXMuX3BvaW50c1swXSA9IHBvaW50O1xuICAgICAgICB0aGlzLl9ub3JtYWxzWzBdID0gbm9ybWFsO1xuICAgICAgICB0aGlzLl9mcmFjdGlvbnNbMF0gPSBmcmFjdGlvbjtcbiAgICAgICAgcmV0dXJuIGZyYWN0aW9uO1xuICAgIH1cblxuICAgIHRoaXMuX2ZpeHR1cmVzLnB1c2goZml4dHVyZSk7XG4gICAgdGhpcy5fcG9pbnRzLnB1c2goY2MudjIocG9pbnQpKTtcbiAgICB0aGlzLl9ub3JtYWxzLnB1c2goY2MudjIobm9ybWFsKSk7XG4gICAgdGhpcy5fZnJhY3Rpb25zLnB1c2goZnJhY3Rpb24pO1xuICAgIFxuICAgIGlmICh0aGlzLl90eXBlID09PSAxKSB7IC8vIGFueVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5fdHlwZSA+PSAyKSB7IC8vIGFsbFxuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnJhY3Rpb247XG59O1xuXG5cblBoeXNpY3NSYXlDYXN0Q2FsbGJhY2sucHJvdG90eXBlLmdldEZpeHR1cmVzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9maXh0dXJlcztcbn07XG5cblBoeXNpY3NSYXlDYXN0Q2FsbGJhY2sucHJvdG90eXBlLmdldFBvaW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9pbnRzO1xufTtcblxuUGh5c2ljc1JheUNhc3RDYWxsYmFjay5wcm90b3R5cGUuZ2V0Tm9ybWFscyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fbm9ybWFscztcbn07XG5cblBoeXNpY3NSYXlDYXN0Q2FsbGJhY2sucHJvdG90eXBlLmdldEZyYWN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fZnJhY3Rpb25zO1xufTtcblxuY2MuUGh5c2ljc1JheUNhc3RDYWxsYmFjayA9IG1vZHVsZS5leHBvcnRzID0gUGh5c2ljc1JheUNhc3RDYWxsYmFjaztcbiJdLCJzb3VyY2VSb290IjoiLyJ9