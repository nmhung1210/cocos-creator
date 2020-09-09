
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/platform/CCPhysicsAABBQueryCallback.js';
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
var BodyType = require('../CCPhysicsTypes').BodyType;

function PhysicsAABBQueryCallback() {
  this._point = new b2.Vec2();
  this._isPoint = false;
  this._fixtures = [];
}

PhysicsAABBQueryCallback.prototype.init = function (point) {
  if (point) {
    this._isPoint = true;
    this._point.x = point.x;
    this._point.y = point.y;
  } else {
    this._isPoint = false;
  }

  this._fixtures.length = 0;
};

PhysicsAABBQueryCallback.prototype.ReportFixture = function (fixture) {
  var body = fixture.GetBody();

  if (body.GetType() === BodyType.Dynamic) {
    if (this._isPoint) {
      if (fixture.TestPoint(this._point)) {
        this._fixtures.push(fixture); // We are done, terminate the query.


        return false;
      }
    } else {
      this._fixtures.push(fixture);
    }
  } // True to continue the query, false to terminate the query.


  return true;
};

PhysicsAABBQueryCallback.prototype.getFixture = function () {
  return this._fixtures[0];
};

PhysicsAABBQueryCallback.prototype.getFixtures = function () {
  return this._fixtures;
};

cc.PhysicsAABBQueryCallback = module.exports = PhysicsAABBQueryCallback;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3MvcGxhdGZvcm0vQ0NQaHlzaWNzQUFCQlF1ZXJ5Q2FsbGJhY2suanMiXSwibmFtZXMiOlsiQm9keVR5cGUiLCJyZXF1aXJlIiwiUGh5c2ljc0FBQkJRdWVyeUNhbGxiYWNrIiwiX3BvaW50IiwiYjIiLCJWZWMyIiwiX2lzUG9pbnQiLCJfZml4dHVyZXMiLCJwcm90b3R5cGUiLCJpbml0IiwicG9pbnQiLCJ4IiwieSIsImxlbmd0aCIsIlJlcG9ydEZpeHR1cmUiLCJmaXh0dXJlIiwiYm9keSIsIkdldEJvZHkiLCJHZXRUeXBlIiwiRHluYW1pYyIsIlRlc3RQb2ludCIsInB1c2giLCJnZXRGaXh0dXJlIiwiZ2V0Rml4dHVyZXMiLCJjYyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQU1BLFFBQVEsR0FBR0MsT0FBTyxDQUFDLG1CQUFELENBQVAsQ0FBNkJELFFBQTlDOztBQUVBLFNBQVNFLHdCQUFULEdBQXFDO0FBQ2pDLE9BQUtDLE1BQUwsR0FBYyxJQUFJQyxFQUFFLENBQUNDLElBQVAsRUFBZDtBQUNBLE9BQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxPQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0g7O0FBRURMLHdCQUF3QixDQUFDTSxTQUF6QixDQUFtQ0MsSUFBbkMsR0FBMEMsVUFBVUMsS0FBVixFQUFpQjtBQUN2RCxNQUFJQSxLQUFKLEVBQVc7QUFDUCxTQUFLSixRQUFMLEdBQWdCLElBQWhCO0FBQ0EsU0FBS0gsTUFBTCxDQUFZUSxDQUFaLEdBQWdCRCxLQUFLLENBQUNDLENBQXRCO0FBQ0EsU0FBS1IsTUFBTCxDQUFZUyxDQUFaLEdBQWdCRixLQUFLLENBQUNFLENBQXRCO0FBQ0gsR0FKRCxNQUtLO0FBQ0QsU0FBS04sUUFBTCxHQUFnQixLQUFoQjtBQUNIOztBQUVELE9BQUtDLFNBQUwsQ0FBZU0sTUFBZixHQUF3QixDQUF4QjtBQUNILENBWEQ7O0FBYUFYLHdCQUF3QixDQUFDTSxTQUF6QixDQUFtQ00sYUFBbkMsR0FBbUQsVUFBVUMsT0FBVixFQUFtQjtBQUNsRSxNQUFJQyxJQUFJLEdBQUdELE9BQU8sQ0FBQ0UsT0FBUixFQUFYOztBQUNBLE1BQUlELElBQUksQ0FBQ0UsT0FBTCxPQUFtQmxCLFFBQVEsQ0FBQ21CLE9BQWhDLEVBQXlDO0FBQ3JDLFFBQUksS0FBS2IsUUFBVCxFQUFtQjtBQUNmLFVBQUlTLE9BQU8sQ0FBQ0ssU0FBUixDQUFrQixLQUFLakIsTUFBdkIsQ0FBSixFQUFvQztBQUNoQyxhQUFLSSxTQUFMLENBQWVjLElBQWYsQ0FBb0JOLE9BQXBCLEVBRGdDLENBRWhDOzs7QUFDQSxlQUFPLEtBQVA7QUFDSDtBQUNKLEtBTkQsTUFPSztBQUNELFdBQUtSLFNBQUwsQ0FBZWMsSUFBZixDQUFvQk4sT0FBcEI7QUFDSDtBQUNKLEdBYmlFLENBZWxFOzs7QUFDQSxTQUFPLElBQVA7QUFDSCxDQWpCRDs7QUFtQkFiLHdCQUF3QixDQUFDTSxTQUF6QixDQUFtQ2MsVUFBbkMsR0FBZ0QsWUFBWTtBQUN4RCxTQUFPLEtBQUtmLFNBQUwsQ0FBZSxDQUFmLENBQVA7QUFDSCxDQUZEOztBQUlBTCx3QkFBd0IsQ0FBQ00sU0FBekIsQ0FBbUNlLFdBQW5DLEdBQWlELFlBQVk7QUFDekQsU0FBTyxLQUFLaEIsU0FBWjtBQUNILENBRkQ7O0FBSUFpQixFQUFFLENBQUN0Qix3QkFBSCxHQUE4QnVCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnhCLHdCQUEvQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IEJvZHlUeXBlID0gcmVxdWlyZSgnLi4vQ0NQaHlzaWNzVHlwZXMnKS5Cb2R5VHlwZTtcblxuZnVuY3Rpb24gUGh5c2ljc0FBQkJRdWVyeUNhbGxiYWNrICgpIHtcbiAgICB0aGlzLl9wb2ludCA9IG5ldyBiMi5WZWMyKCk7XG4gICAgdGhpcy5faXNQb2ludCA9IGZhbHNlO1xuICAgIHRoaXMuX2ZpeHR1cmVzID0gW107XG59XG5cblBoeXNpY3NBQUJCUXVlcnlDYWxsYmFjay5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChwb2ludCkge1xuICAgIGlmIChwb2ludCkge1xuICAgICAgICB0aGlzLl9pc1BvaW50ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcG9pbnQueCA9IHBvaW50Lng7XG4gICAgICAgIHRoaXMuX3BvaW50LnkgPSBwb2ludC55O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5faXNQb2ludCA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLl9maXh0dXJlcy5sZW5ndGggPSAwO1xufTtcblxuUGh5c2ljc0FBQkJRdWVyeUNhbGxiYWNrLnByb3RvdHlwZS5SZXBvcnRGaXh0dXJlID0gZnVuY3Rpb24gKGZpeHR1cmUpIHtcbiAgICB2YXIgYm9keSA9IGZpeHR1cmUuR2V0Qm9keSgpO1xuICAgIGlmIChib2R5LkdldFR5cGUoKSA9PT0gQm9keVR5cGUuRHluYW1pYykge1xuICAgICAgICBpZiAodGhpcy5faXNQb2ludCkge1xuICAgICAgICAgICAgaWYgKGZpeHR1cmUuVGVzdFBvaW50KHRoaXMuX3BvaW50KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpeHR1cmVzLnB1c2goZml4dHVyZSk7XG4gICAgICAgICAgICAgICAgLy8gV2UgYXJlIGRvbmUsIHRlcm1pbmF0ZSB0aGUgcXVlcnkuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZml4dHVyZXMucHVzaChmaXh0dXJlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRydWUgdG8gY29udGludWUgdGhlIHF1ZXJ5LCBmYWxzZSB0byB0ZXJtaW5hdGUgdGhlIHF1ZXJ5LlxuICAgIHJldHVybiB0cnVlO1xufTtcblxuUGh5c2ljc0FBQkJRdWVyeUNhbGxiYWNrLnByb3RvdHlwZS5nZXRGaXh0dXJlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9maXh0dXJlc1swXTtcbn07XG5cblBoeXNpY3NBQUJCUXVlcnlDYWxsYmFjay5wcm90b3R5cGUuZ2V0Rml4dHVyZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpeHR1cmVzO1xufTtcblxuY2MuUGh5c2ljc0FBQkJRdWVyeUNhbGxiYWNrID0gbW9kdWxlLmV4cG9ydHMgPSBQaHlzaWNzQUFCQlF1ZXJ5Q2FsbGJhY2s7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==