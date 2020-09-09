
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/vertex-buffer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _enums = require("./enums");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var VertexBuffer = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {Device} device
   * @param {VertexFormat} format
   * @param {USAGE_*} usage
   * @param {ArrayBuffer | Uint8Array} data
   */
  function VertexBuffer(device, format, usage, data) {
    this._device = device;
    this._format = format;
    this._usage = usage;
    this._bytesPerVertex = this._format._bytes;
    this._bytes = data.byteLength;
    this._numVertices = this._bytes / this._bytesPerVertex;
    this._needExpandDataStore = true; // update

    this._glID = device._gl.createBuffer();
    this.update(0, data); // stats

    device._stats.vb += this._bytes;
  }
  /**
   * @method destroy
   */


  var _proto = VertexBuffer.prototype;

  _proto.destroy = function destroy() {
    if (this._glID === -1) {
      console.error('The buffer already destroyed');
      return;
    }

    var gl = this._device._gl;
    gl.deleteBuffer(this._glID);
    this._device._stats.vb -= this.bytes;
    this._glID = -1;
  }
  /**
   * @method update
   * @param {Number} byteOffset
   * @param {ArrayBuffer} data
   */
  ;

  _proto.update = function update(byteOffset, data) {
    if (this._glID === -1) {
      console.error('The buffer is destroyed');
      return;
    }

    if (data.byteLength === 0) return; // Need to create new buffer object when bytes exceed

    if (byteOffset + data.byteLength > this._bytes) {
      if (byteOffset) {
        // Lost data between [0, byteOffset] which is need for new buffer
        console.error('Failed to update data, bytes exceed.');
        return;
      } else {
        this._needExpandDataStore = true;
        this._bytes = byteOffset + data.byteLength;
        this._numVertices = this._bytes / this._bytesPerVertex;
      }
    }

    var gl = this._device._gl;
    var glUsage = this._usage;
    gl.bindBuffer(gl.ARRAY_BUFFER, this._glID);

    if (this._needExpandDataStore) {
      gl.bufferData(gl.ARRAY_BUFFER, data, glUsage);
      this._needExpandDataStore = false;
    } else {
      gl.bufferSubData(gl.ARRAY_BUFFER, byteOffset, data);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  };

  _proto.getFormat = function getFormat(name) {
    return this._format.element(name);
  };

  _proto.setUsage = function setUsage(usage) {
    this._usage = usage;
  };

  _createClass(VertexBuffer, [{
    key: "count",
    get: function get() {
      return this._numVertices;
    }
  }]);

  return VertexBuffer;
}();

var _default = VertexBuffer;
exports["default"] = _default;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9nZngvdmVydGV4LWJ1ZmZlci5qcyJdLCJuYW1lcyI6WyJWZXJ0ZXhCdWZmZXIiLCJkZXZpY2UiLCJmb3JtYXQiLCJ1c2FnZSIsImRhdGEiLCJfZGV2aWNlIiwiX2Zvcm1hdCIsIl91c2FnZSIsIl9ieXRlc1BlclZlcnRleCIsIl9ieXRlcyIsImJ5dGVMZW5ndGgiLCJfbnVtVmVydGljZXMiLCJfbmVlZEV4cGFuZERhdGFTdG9yZSIsIl9nbElEIiwiX2dsIiwiY3JlYXRlQnVmZmVyIiwidXBkYXRlIiwiX3N0YXRzIiwidmIiLCJkZXN0cm95IiwiY29uc29sZSIsImVycm9yIiwiZ2wiLCJkZWxldGVCdWZmZXIiLCJieXRlcyIsImJ5dGVPZmZzZXQiLCJnbFVzYWdlIiwiYmluZEJ1ZmZlciIsIkFSUkFZX0JVRkZFUiIsImJ1ZmZlckRhdGEiLCJidWZmZXJTdWJEYXRhIiwiZ2V0Rm9ybWF0IiwibmFtZSIsImVsZW1lbnQiLCJzZXRVc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFTUE7QUFDSjs7Ozs7OztBQU9BLHdCQUFZQyxNQUFaLEVBQW9CQyxNQUFwQixFQUE0QkMsS0FBNUIsRUFBbUNDLElBQW5DLEVBQXlDO0FBQ3ZDLFNBQUtDLE9BQUwsR0FBZUosTUFBZjtBQUNBLFNBQUtLLE9BQUwsR0FBZUosTUFBZjtBQUNBLFNBQUtLLE1BQUwsR0FBY0osS0FBZDtBQUNBLFNBQUtLLGVBQUwsR0FBdUIsS0FBS0YsT0FBTCxDQUFhRyxNQUFwQztBQUNBLFNBQUtBLE1BQUwsR0FBY0wsSUFBSSxDQUFDTSxVQUFuQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsS0FBS0YsTUFBTCxHQUFjLEtBQUtELGVBQXZDO0FBRUEsU0FBS0ksb0JBQUwsR0FBNEIsSUFBNUIsQ0FSdUMsQ0FVdkM7O0FBQ0EsU0FBS0MsS0FBTCxHQUFhWixNQUFNLENBQUNhLEdBQVAsQ0FBV0MsWUFBWCxFQUFiO0FBQ0EsU0FBS0MsTUFBTCxDQUFZLENBQVosRUFBZVosSUFBZixFQVp1QyxDQWN2Qzs7QUFDQUgsSUFBQUEsTUFBTSxDQUFDZ0IsTUFBUCxDQUFjQyxFQUFkLElBQW9CLEtBQUtULE1BQXpCO0FBQ0Q7QUFFRDs7Ozs7OztTQUdBVSxVQUFBLG1CQUFVO0FBQ1IsUUFBSSxLQUFLTixLQUFMLEtBQWUsQ0FBQyxDQUFwQixFQUF1QjtBQUNyQk8sTUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsOEJBQWQ7QUFDQTtBQUNEOztBQUVELFFBQUlDLEVBQUUsR0FBRyxLQUFLakIsT0FBTCxDQUFhUyxHQUF0QjtBQUNBUSxJQUFBQSxFQUFFLENBQUNDLFlBQUgsQ0FBZ0IsS0FBS1YsS0FBckI7QUFDQSxTQUFLUixPQUFMLENBQWFZLE1BQWIsQ0FBb0JDLEVBQXBCLElBQTBCLEtBQUtNLEtBQS9CO0FBRUEsU0FBS1gsS0FBTCxHQUFhLENBQUMsQ0FBZDtBQUNEO0FBRUQ7Ozs7Ozs7U0FLQUcsU0FBQSxnQkFBT1MsVUFBUCxFQUFtQnJCLElBQW5CLEVBQXlCO0FBQ3ZCLFFBQUksS0FBS1MsS0FBTCxLQUFlLENBQUMsQ0FBcEIsRUFBdUI7QUFDckJPLE1BQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLHlCQUFkO0FBQ0E7QUFDRDs7QUFFRCxRQUFJakIsSUFBSSxDQUFDTSxVQUFMLEtBQW9CLENBQXhCLEVBQTJCLE9BTkosQ0FRdkI7O0FBQ0EsUUFBSWUsVUFBVSxHQUFHckIsSUFBSSxDQUFDTSxVQUFsQixHQUErQixLQUFLRCxNQUF4QyxFQUFnRDtBQUM5QyxVQUFJZ0IsVUFBSixFQUFnQjtBQUNkO0FBQ0FMLFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLHNDQUFkO0FBQ0E7QUFDRCxPQUpELE1BS0s7QUFDSCxhQUFLVCxvQkFBTCxHQUE0QixJQUE1QjtBQUNBLGFBQUtILE1BQUwsR0FBY2dCLFVBQVUsR0FBR3JCLElBQUksQ0FBQ00sVUFBaEM7QUFDQSxhQUFLQyxZQUFMLEdBQW9CLEtBQUtGLE1BQUwsR0FBYyxLQUFLRCxlQUF2QztBQUNEO0FBQ0Y7O0FBRUQsUUFBSWMsRUFBRSxHQUFHLEtBQUtqQixPQUFMLENBQWFTLEdBQXRCO0FBQ0EsUUFBSVksT0FBTyxHQUFHLEtBQUtuQixNQUFuQjtBQUVBZSxJQUFBQSxFQUFFLENBQUNLLFVBQUgsQ0FBY0wsRUFBRSxDQUFDTSxZQUFqQixFQUErQixLQUFLZixLQUFwQzs7QUFDQSxRQUFJLEtBQUtELG9CQUFULEVBQStCO0FBQzdCVSxNQUFBQSxFQUFFLENBQUNPLFVBQUgsQ0FBY1AsRUFBRSxDQUFDTSxZQUFqQixFQUErQnhCLElBQS9CLEVBQXFDc0IsT0FBckM7QUFDQSxXQUFLZCxvQkFBTCxHQUE0QixLQUE1QjtBQUNELEtBSEQsTUFJSztBQUNIVSxNQUFBQSxFQUFFLENBQUNRLGFBQUgsQ0FBaUJSLEVBQUUsQ0FBQ00sWUFBcEIsRUFBa0NILFVBQWxDLEVBQThDckIsSUFBOUM7QUFDRDs7QUFDRGtCLElBQUFBLEVBQUUsQ0FBQ0ssVUFBSCxDQUFjTCxFQUFFLENBQUNNLFlBQWpCLEVBQStCLElBQS9CO0FBQ0Q7O1NBTURHLFlBQUEsbUJBQVdDLElBQVgsRUFBaUI7QUFDZixXQUFPLEtBQUsxQixPQUFMLENBQWEyQixPQUFiLENBQXFCRCxJQUFyQixDQUFQO0FBQ0Q7O1NBRURFLFdBQUEsa0JBQVUvQixLQUFWLEVBQWlCO0FBQ2YsU0FBS0ksTUFBTCxHQUFjSixLQUFkO0FBQ0Q7Ozs7d0JBVlk7QUFDWCxhQUFPLEtBQUtRLFlBQVo7QUFDRDs7Ozs7O2VBV1lYIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZW51bXMgfSBmcm9tICcuL2VudW1zJztcblxuY2xhc3MgVmVydGV4QnVmZmVyIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0RldmljZX0gZGV2aWNlXG4gICAqIEBwYXJhbSB7VmVydGV4Rm9ybWF0fSBmb3JtYXRcbiAgICogQHBhcmFtIHtVU0FHRV8qfSB1c2FnZVxuICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyIHwgVWludDhBcnJheX0gZGF0YVxuICAgKi9cbiAgY29uc3RydWN0b3IoZGV2aWNlLCBmb3JtYXQsIHVzYWdlLCBkYXRhKSB7XG4gICAgdGhpcy5fZGV2aWNlID0gZGV2aWNlO1xuICAgIHRoaXMuX2Zvcm1hdCA9IGZvcm1hdDtcbiAgICB0aGlzLl91c2FnZSA9IHVzYWdlO1xuICAgIHRoaXMuX2J5dGVzUGVyVmVydGV4ID0gdGhpcy5fZm9ybWF0Ll9ieXRlcztcbiAgICB0aGlzLl9ieXRlcyA9IGRhdGEuYnl0ZUxlbmd0aDtcbiAgICB0aGlzLl9udW1WZXJ0aWNlcyA9IHRoaXMuX2J5dGVzIC8gdGhpcy5fYnl0ZXNQZXJWZXJ0ZXg7XG5cbiAgICB0aGlzLl9uZWVkRXhwYW5kRGF0YVN0b3JlID0gdHJ1ZTtcblxuICAgIC8vIHVwZGF0ZVxuICAgIHRoaXMuX2dsSUQgPSBkZXZpY2UuX2dsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIHRoaXMudXBkYXRlKDAsIGRhdGEpO1xuXG4gICAgLy8gc3RhdHNcbiAgICBkZXZpY2UuX3N0YXRzLnZiICs9IHRoaXMuX2J5dGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fZ2xJRCA9PT0gLTEpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZSBidWZmZXIgYWxyZWFkeSBkZXN0cm95ZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZ2wgPSB0aGlzLl9kZXZpY2UuX2dsO1xuICAgIGdsLmRlbGV0ZUJ1ZmZlcih0aGlzLl9nbElEKTtcbiAgICB0aGlzLl9kZXZpY2UuX3N0YXRzLnZiIC09IHRoaXMuYnl0ZXM7XG5cbiAgICB0aGlzLl9nbElEID0gLTE7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCB1cGRhdGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGJ5dGVPZmZzZXRcbiAgICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gZGF0YVxuICAgKi9cbiAgdXBkYXRlKGJ5dGVPZmZzZXQsIGRhdGEpIHtcbiAgICBpZiAodGhpcy5fZ2xJRCA9PT0gLTEpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZSBidWZmZXIgaXMgZGVzdHJveWVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGRhdGEuYnl0ZUxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgLy8gTmVlZCB0byBjcmVhdGUgbmV3IGJ1ZmZlciBvYmplY3Qgd2hlbiBieXRlcyBleGNlZWRcbiAgICBpZiAoYnl0ZU9mZnNldCArIGRhdGEuYnl0ZUxlbmd0aCA+IHRoaXMuX2J5dGVzKSB7XG4gICAgICBpZiAoYnl0ZU9mZnNldCkge1xuICAgICAgICAvLyBMb3N0IGRhdGEgYmV0d2VlbiBbMCwgYnl0ZU9mZnNldF0gd2hpY2ggaXMgbmVlZCBmb3IgbmV3IGJ1ZmZlclxuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gdXBkYXRlIGRhdGEsIGJ5dGVzIGV4Y2VlZC4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX25lZWRFeHBhbmREYXRhU3RvcmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9ieXRlcyA9IGJ5dGVPZmZzZXQgKyBkYXRhLmJ5dGVMZW5ndGg7XG4gICAgICAgIHRoaXMuX251bVZlcnRpY2VzID0gdGhpcy5fYnl0ZXMgLyB0aGlzLl9ieXRlc1BlclZlcnRleDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZ2wgPSB0aGlzLl9kZXZpY2UuX2dsO1xuICAgIGxldCBnbFVzYWdlID0gdGhpcy5fdXNhZ2U7XG5cbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5fZ2xJRCk7XG4gICAgaWYgKHRoaXMuX25lZWRFeHBhbmREYXRhU3RvcmUpIHtcbiAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBkYXRhLCBnbFVzYWdlKTtcbiAgICAgIHRoaXMuX25lZWRFeHBhbmREYXRhU3RvcmUgPSBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBnbC5idWZmZXJTdWJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgYnl0ZU9mZnNldCwgZGF0YSk7XG4gICAgfVxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBudWxsKTtcbiAgfVxuXG4gIGdldCBjb3VudCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX251bVZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0Rm9ybWF0IChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1hdC5lbGVtZW50KG5hbWUpO1xuICB9XG5cbiAgc2V0VXNhZ2UgKHVzYWdlKSB7XG4gICAgdGhpcy5fdXNhZ2UgPSB1c2FnZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWZXJ0ZXhCdWZmZXI7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==