
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/frame-buffer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var FrameBuffer = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {Device} device
   * @param {Number} width
   * @param {Number} height
   * @param {Object} options
   * @param {Array} options.colors
   * @param {RenderBuffer|Texture2D|TextureCube} options.depth
   * @param {RenderBuffer|Texture2D|TextureCube} options.stencil
   * @param {RenderBuffer|Texture2D|TextureCube} options.depthStencil
   */
  function FrameBuffer(device, width, height, options) {
    this._device = device;
    this._width = width;
    this._height = height;
    this._colors = options.colors || [];
    this._depth = options.depth || null;
    this._stencil = options.stencil || null;
    this._depthStencil = options.depthStencil || null;
    this._glID = device._gl.createFramebuffer();
  }
  /**
   * @method destroy
   */


  var _proto = FrameBuffer.prototype;

  _proto.destroy = function destroy() {
    if (this._glID === null) {
      console.error('The frame-buffer already destroyed');
      return;
    }

    var gl = this._device._gl;
    gl.deleteFramebuffer(this._glID);
    this._glID = null;
  };

  _proto.getHandle = function getHandle() {
    return this._glID;
  };

  return FrameBuffer;
}();

exports["default"] = FrameBuffer;
module.exports = exports["default"];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9nZngvZnJhbWUtYnVmZmVyLmpzIl0sIm5hbWVzIjpbIkZyYW1lQnVmZmVyIiwiZGV2aWNlIiwid2lkdGgiLCJoZWlnaHQiLCJvcHRpb25zIiwiX2RldmljZSIsIl93aWR0aCIsIl9oZWlnaHQiLCJfY29sb3JzIiwiY29sb3JzIiwiX2RlcHRoIiwiZGVwdGgiLCJfc3RlbmNpbCIsInN0ZW5jaWwiLCJfZGVwdGhTdGVuY2lsIiwiZGVwdGhTdGVuY2lsIiwiX2dsSUQiLCJfZ2wiLCJjcmVhdGVGcmFtZWJ1ZmZlciIsImRlc3Ryb3kiLCJjb25zb2xlIiwiZXJyb3IiLCJnbCIsImRlbGV0ZUZyYW1lYnVmZmVyIiwiZ2V0SGFuZGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQTtBQUNuQjs7Ozs7Ozs7Ozs7QUFXQSx1QkFBWUMsTUFBWixFQUFvQkMsS0FBcEIsRUFBMkJDLE1BQTNCLEVBQW1DQyxPQUFuQyxFQUE0QztBQUMxQyxTQUFLQyxPQUFMLEdBQWVKLE1BQWY7QUFDQSxTQUFLSyxNQUFMLEdBQWNKLEtBQWQ7QUFDQSxTQUFLSyxPQUFMLEdBQWVKLE1BQWY7QUFFQSxTQUFLSyxPQUFMLEdBQWVKLE9BQU8sQ0FBQ0ssTUFBUixJQUFrQixFQUFqQztBQUNBLFNBQUtDLE1BQUwsR0FBY04sT0FBTyxDQUFDTyxLQUFSLElBQWlCLElBQS9CO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQlIsT0FBTyxDQUFDUyxPQUFSLElBQW1CLElBQW5DO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQlYsT0FBTyxDQUFDVyxZQUFSLElBQXdCLElBQTdDO0FBRUEsU0FBS0MsS0FBTCxHQUFhZixNQUFNLENBQUNnQixHQUFQLENBQVdDLGlCQUFYLEVBQWI7QUFDRDtBQUVEOzs7Ozs7O1NBR0FDLFVBQUEsbUJBQVU7QUFDUixRQUFJLEtBQUtILEtBQUwsS0FBZSxJQUFuQixFQUF5QjtBQUN2QkksTUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsb0NBQWQ7QUFDQTtBQUNEOztBQUVELFFBQU1DLEVBQUUsR0FBRyxLQUFLakIsT0FBTCxDQUFhWSxHQUF4QjtBQUVBSyxJQUFBQSxFQUFFLENBQUNDLGlCQUFILENBQXFCLEtBQUtQLEtBQTFCO0FBRUEsU0FBS0EsS0FBTCxHQUFhLElBQWI7QUFDRDs7U0FFRFEsWUFBQSxxQkFBWTtBQUNWLFdBQU8sS0FBS1IsS0FBWjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJhbWVCdWZmZXIge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7RGV2aWNlfSBkZXZpY2VcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5jb2xvcnNcbiAgICogQHBhcmFtIHtSZW5kZXJCdWZmZXJ8VGV4dHVyZTJEfFRleHR1cmVDdWJlfSBvcHRpb25zLmRlcHRoXG4gICAqIEBwYXJhbSB7UmVuZGVyQnVmZmVyfFRleHR1cmUyRHxUZXh0dXJlQ3ViZX0gb3B0aW9ucy5zdGVuY2lsXG4gICAqIEBwYXJhbSB7UmVuZGVyQnVmZmVyfFRleHR1cmUyRHxUZXh0dXJlQ3ViZX0gb3B0aW9ucy5kZXB0aFN0ZW5jaWxcbiAgICovXG4gIGNvbnN0cnVjdG9yKGRldmljZSwgd2lkdGgsIGhlaWdodCwgb3B0aW9ucykge1xuICAgIHRoaXMuX2RldmljZSA9IGRldmljZTtcbiAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuX2NvbG9ycyA9IG9wdGlvbnMuY29sb3JzIHx8IFtdO1xuICAgIHRoaXMuX2RlcHRoID0gb3B0aW9ucy5kZXB0aCB8fCBudWxsO1xuICAgIHRoaXMuX3N0ZW5jaWwgPSBvcHRpb25zLnN0ZW5jaWwgfHwgbnVsbDtcbiAgICB0aGlzLl9kZXB0aFN0ZW5jaWwgPSBvcHRpb25zLmRlcHRoU3RlbmNpbCB8fCBudWxsO1xuXG4gICAgdGhpcy5fZ2xJRCA9IGRldmljZS5fZ2wuY3JlYXRlRnJhbWVidWZmZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX2dsSUQgPT09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZSBmcmFtZS1idWZmZXIgYWxyZWFkeSBkZXN0cm95ZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBnbCA9IHRoaXMuX2RldmljZS5fZ2w7XG5cbiAgICBnbC5kZWxldGVGcmFtZWJ1ZmZlcih0aGlzLl9nbElEKTtcblxuICAgIHRoaXMuX2dsSUQgPSBudWxsO1xuICB9XG5cbiAgZ2V0SGFuZGxlKCkge1xuICAgIHJldHVybiB0aGlzLl9nbElEO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvIn0=