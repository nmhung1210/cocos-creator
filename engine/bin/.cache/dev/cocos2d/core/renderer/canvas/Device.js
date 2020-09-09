
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/Device.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.  
var Device = function Device(canvasEL) {
  var ctx;

  try {
    ctx = canvasEL.getContext('2d');
  } catch (err) {
    console.error(err);
    return;
  } // statics


  this._canvas = canvasEL;
  this._ctx = ctx;
  this._caps = {}; // capability

  this._stats = {
    drawcalls: 0
  }; // runtime

  this._vx = this._vy = this._vw = this._vh = 0;
  this._sx = this._sy = this._sw = this._sh = 0;
};

Device.prototype._restoreTexture = function _restoreTexture(unit) {}; // ===============================
// Immediate Settings
// ===============================

/**
 * @method setViewport
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 */


Device.prototype.setViewport = function setViewport(x, y, w, h) {
  if (this._vx !== x || this._vy !== y || this._vw !== w || this._vh !== h) {
    this._vx = x;
    this._vy = y;
    this._vw = w;
    this._vh = h;
  }
};
/**
 * @method setScissor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 */


Device.prototype.setScissor = function setScissor(x, y, w, h) {
  if (this._sx !== x || this._sy !== y || this._sw !== w || this._sh !== h) {
    this._sx = x;
    this._sy = y;
    this._sw = w;
    this._sh = h;
  }
};

Device.prototype.clear = function clear(color) {
  var ctx = this._ctx;
  ctx.clearRect(this._vx, this._vy, this._vw, this._vh);

  if (color && (color[0] !== 0 || color[1] !== 0 || color[2] !== 0)) {
    ctx.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    ctx.globalAlpha = color[3];
    ctx.fillRect(this._vx, this._vy, this._vw, this._vh);
  }
};

Device.prototype.resetDrawCalls = function () {
  this._stats.drawcalls = 0;
};

Device.prototype.getDrawCalls = function () {
  return this._stats.drawcalls;
};

module.exports = Device;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2NhbnZhcy9EZXZpY2UuanMiXSwibmFtZXMiOlsiRGV2aWNlIiwiY2FudmFzRUwiLCJjdHgiLCJnZXRDb250ZXh0IiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwiX2NhbnZhcyIsIl9jdHgiLCJfY2FwcyIsIl9zdGF0cyIsImRyYXdjYWxscyIsIl92eCIsIl92eSIsIl92dyIsIl92aCIsIl9zeCIsIl9zeSIsIl9zdyIsIl9zaCIsInByb3RvdHlwZSIsIl9yZXN0b3JlVGV4dHVyZSIsInVuaXQiLCJzZXRWaWV3cG9ydCIsIngiLCJ5IiwidyIsImgiLCJzZXRTY2lzc29yIiwiY2xlYXIiLCJjb2xvciIsImNsZWFyUmVjdCIsImZpbGxTdHlsZSIsImdsb2JhbEFscGhhIiwiZmlsbFJlY3QiLCJyZXNldERyYXdDYWxscyIsImdldERyYXdDYWxscyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUVBLElBQUlBLE1BQU0sR0FBRyxTQUFTQSxNQUFULENBQWdCQyxRQUFoQixFQUEwQjtBQUNyQyxNQUFJQyxHQUFKOztBQUVBLE1BQUk7QUFDRkEsSUFBQUEsR0FBRyxHQUFHRCxRQUFRLENBQUNFLFVBQVQsQ0FBb0IsSUFBcEIsQ0FBTjtBQUNELEdBRkQsQ0FFRSxPQUFPQyxHQUFQLEVBQVk7QUFDWkMsSUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWNGLEdBQWQ7QUFDQTtBQUNELEdBUm9DLENBVXJDOzs7QUFDQSxPQUFLRyxPQUFMLEdBQWVOLFFBQWY7QUFDQSxPQUFLTyxJQUFMLEdBQVlOLEdBQVo7QUFDQSxPQUFLTyxLQUFMLEdBQWEsRUFBYixDQWJxQyxDQWFwQjs7QUFDakIsT0FBS0MsTUFBTCxHQUFjO0FBQ1pDLElBQUFBLFNBQVMsRUFBRTtBQURDLEdBQWQsQ0FkcUMsQ0FrQnJDOztBQUNBLE9BQUtDLEdBQUwsR0FBVyxLQUFLQyxHQUFMLEdBQVcsS0FB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QixNQUFMLENBQVlDLFNBQW5CO0FBQ0QsQ0FGRDs7QUFJQTBCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnRDLE1BQWpCIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gIFxuIFxudmFyIERldmljZSA9IGZ1bmN0aW9uIERldmljZShjYW52YXNFTCkge1xuICB2YXIgY3R4O1xuXG4gIHRyeSB7XG4gICAgY3R4ID0gY2FudmFzRUwuZ2V0Q29udGV4dCgnMmQnKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHN0YXRpY3NcbiAgdGhpcy5fY2FudmFzID0gY2FudmFzRUw7XG4gIHRoaXMuX2N0eCA9IGN0eDtcbiAgdGhpcy5fY2FwcyA9IHt9OyAvLyBjYXBhYmlsaXR5XG4gIHRoaXMuX3N0YXRzID0ge1xuICAgIGRyYXdjYWxsczogMCxcbiAgfTtcblxuICAvLyBydW50aW1lXG4gIHRoaXMuX3Z4ID0gdGhpcy5fdnkgPSB0aGlzLl92dyA9IHRoaXMuX3ZoID0gMDtcbiAgdGhpcy5fc3ggPSB0aGlzLl9zeSA9IHRoaXMuX3N3ID0gdGhpcy5fc2ggPSAwO1xufTtcblxuRGV2aWNlLnByb3RvdHlwZS5fcmVzdG9yZVRleHR1cmUgPSBmdW5jdGlvbiBfcmVzdG9yZVRleHR1cmUgKHVuaXQpIHtcbn07XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEltbWVkaWF0ZSBTZXR0aW5nc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIEBtZXRob2Qgc2V0Vmlld3BvcnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge051bWJlcn0geVxuICogQHBhcmFtIHtOdW1iZXJ9IHdcbiAqIEBwYXJhbSB7TnVtYmVyfSBoXG4gKi9cbkRldmljZS5wcm90b3R5cGUuc2V0Vmlld3BvcnQgPSBmdW5jdGlvbiBzZXRWaWV3cG9ydCAoeCwgeSwgdywgaCkge1xuICBpZiAoXG4gICAgdGhpcy5fdnggIT09IHggfHxcbiAgICB0aGlzLl92eSAhPT0geSB8fFxuICAgIHRoaXMuX3Z3ICE9PSB3IHx8XG4gICAgdGhpcy5fdmggIT09IGhcbiAgKSB7XG4gICAgdGhpcy5fdnggPSB4O1xuICAgIHRoaXMuX3Z5ID0geTtcbiAgICB0aGlzLl92dyA9IHc7XG4gICAgdGhpcy5fdmggPSBoO1xuICB9XG59O1xuXG4vKipcbiAqIEBtZXRob2Qgc2V0U2Npc3NvclxuICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gKiBAcGFyYW0ge051bWJlcn0gd1xuICogQHBhcmFtIHtOdW1iZXJ9IGhcbiAqL1xuRGV2aWNlLnByb3RvdHlwZS5zZXRTY2lzc29yID0gZnVuY3Rpb24gc2V0U2Npc3NvciAoeCwgeSwgdywgaCkge1xuICBpZiAoXG4gICAgdGhpcy5fc3ggIT09IHggfHxcbiAgICB0aGlzLl9zeSAhPT0geSB8fFxuICAgIHRoaXMuX3N3ICE9PSB3IHx8XG4gICAgdGhpcy5fc2ggIT09IGhcbiAgKSB7XG4gICAgdGhpcy5fc3ggPSB4O1xuICAgIHRoaXMuX3N5ID0geTtcbiAgICB0aGlzLl9zdyA9IHc7XG4gICAgdGhpcy5fc2ggPSBoO1xuICB9XG59O1xuXG5EZXZpY2UucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIgKGNvbG9yKSB7XG4gIHZhciBjdHggPSB0aGlzLl9jdHg7XG4gIGN0eC5jbGVhclJlY3QodGhpcy5fdngsIHRoaXMuX3Z5LCB0aGlzLl92dywgdGhpcy5fdmgpO1xuICBpZiAoY29sb3IgJiYgKGNvbG9yWzBdICE9PSAwIHx8IGNvbG9yWzFdICE9PSAwIHx8IGNvbG9yWzJdICE9PSAwKSkge1xuICAgIGN0eC5maWxsU3R5bGUgPSAncmdiKCcgKyBjb2xvclswXSArICcsJyArIGNvbG9yWzFdICsgJywnICsgY29sb3JbMl0gKycpJztcbiAgICBjdHguZ2xvYmFsQWxwaGEgPSBjb2xvclszXTtcbiAgICBjdHguZmlsbFJlY3QodGhpcy5fdngsIHRoaXMuX3Z5LCB0aGlzLl92dywgdGhpcy5fdmgpO1xuICB9XG59O1xuXG5EZXZpY2UucHJvdG90eXBlLnJlc2V0RHJhd0NhbGxzID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9zdGF0cy5kcmF3Y2FsbHMgPSAwO1xufVxuXG5EZXZpY2UucHJvdG90eXBlLmdldERyYXdDYWxscyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuX3N0YXRzLmRyYXdjYWxscztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEZXZpY2U7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==