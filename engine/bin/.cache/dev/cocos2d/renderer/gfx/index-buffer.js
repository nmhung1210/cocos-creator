
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/index-buffer.js';
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

var _BYTES_PER_INDEX;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BYTES_PER_INDEX = (_BYTES_PER_INDEX = {}, _BYTES_PER_INDEX[_enums.enums.INDEX_FMT_UINT8] = 1, _BYTES_PER_INDEX[_enums.enums.INDEX_FMT_UINT16] = 2, _BYTES_PER_INDEX[_enums.enums.INDEX_FMT_UINT32] = 4, _BYTES_PER_INDEX);

var IndexBuffer = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {Device} device
   * @param {INDEX_FMT_*} format
   * @param {USAGE_*} usage
   * @param {ArrayBuffer | Uint8Array} data
   */
  function IndexBuffer(device, format, usage, data) {
    this._device = device;
    this._format = format;
    this._usage = usage;
    this._bytesPerIndex = BYTES_PER_INDEX[format];
    this._bytes = data.byteLength;
    this._numIndices = this._bytes / this._bytesPerIndex;
    this._needExpandDataStore = true; // update

    this._glID = device._gl.createBuffer();
    this.update(0, data); // stats

    device._stats.ib += this._bytes;
  }
  /**
   * @method destroy
   */


  var _proto = IndexBuffer.prototype;

  _proto.destroy = function destroy() {
    if (this._glID === -1) {
      console.error('The buffer already destroyed');
      return;
    }

    var gl = this._device._gl;
    gl.deleteBuffer(this._glID);
    this._device._stats.ib -= this.bytes;
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
        this._numIndices = this._bytes / this._bytesPerIndex;
      }
    }
    /** @type{WebGLRenderingContext} */


    var gl = this._device._gl;
    var glUsage = this._usage;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._glID);

    if (this._needExpandDataStore) {
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, glUsage);
      this._needExpandDataStore = false;
    } else {
      gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, byteOffset, data);
    }

    this._device._restoreIndexBuffer();
  };

  _proto.setUsage = function setUsage(usage) {
    this._usage = usage;
  };

  _createClass(IndexBuffer, [{
    key: "count",
    get: function get() {
      return this._numIndices;
    }
  }]);

  return IndexBuffer;
}();

IndexBuffer.BYTES_PER_INDEX = BYTES_PER_INDEX;
var _default = IndexBuffer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9nZngvaW5kZXgtYnVmZmVyLmpzIl0sIm5hbWVzIjpbIkJZVEVTX1BFUl9JTkRFWCIsImVudW1zIiwiSU5ERVhfRk1UX1VJTlQ4IiwiSU5ERVhfRk1UX1VJTlQxNiIsIklOREVYX0ZNVF9VSU5UMzIiLCJJbmRleEJ1ZmZlciIsImRldmljZSIsImZvcm1hdCIsInVzYWdlIiwiZGF0YSIsIl9kZXZpY2UiLCJfZm9ybWF0IiwiX3VzYWdlIiwiX2J5dGVzUGVySW5kZXgiLCJfYnl0ZXMiLCJieXRlTGVuZ3RoIiwiX251bUluZGljZXMiLCJfbmVlZEV4cGFuZERhdGFTdG9yZSIsIl9nbElEIiwiX2dsIiwiY3JlYXRlQnVmZmVyIiwidXBkYXRlIiwiX3N0YXRzIiwiaWIiLCJkZXN0cm95IiwiY29uc29sZSIsImVycm9yIiwiZ2wiLCJkZWxldGVCdWZmZXIiLCJieXRlcyIsImJ5dGVPZmZzZXQiLCJnbFVzYWdlIiwiYmluZEJ1ZmZlciIsIkVMRU1FTlRfQVJSQVlfQlVGRkVSIiwiYnVmZmVyRGF0YSIsImJ1ZmZlclN1YkRhdGEiLCJfcmVzdG9yZUluZGV4QnVmZmVyIiwic2V0VXNhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQSxJQUFNQSxlQUFlLDRDQUNsQkMsYUFBTUMsZUFEWSxJQUNNLENBRE4sbUJBRWxCRCxhQUFNRSxnQkFGWSxJQUVPLENBRlAsbUJBR2xCRixhQUFNRyxnQkFIWSxJQUdPLENBSFAsbUJBQXJCOztJQU1NQztBQUNKOzs7Ozs7O0FBT0EsdUJBQVlDLE1BQVosRUFBb0JDLE1BQXBCLEVBQTRCQyxLQUE1QixFQUFtQ0MsSUFBbkMsRUFBeUM7QUFDdkMsU0FBS0MsT0FBTCxHQUFlSixNQUFmO0FBQ0EsU0FBS0ssT0FBTCxHQUFlSixNQUFmO0FBQ0EsU0FBS0ssTUFBTCxHQUFjSixLQUFkO0FBQ0EsU0FBS0ssY0FBTCxHQUFzQmIsZUFBZSxDQUFDTyxNQUFELENBQXJDO0FBQ0EsU0FBS08sTUFBTCxHQUFjTCxJQUFJLENBQUNNLFVBQW5CO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixLQUFLRixNQUFMLEdBQWMsS0FBS0QsY0FBdEM7QUFFQSxTQUFLSSxvQkFBTCxHQUE0QixJQUE1QixDQVJ1QyxDQVV2Qzs7QUFDQSxTQUFLQyxLQUFMLEdBQWFaLE1BQU0sQ0FBQ2EsR0FBUCxDQUFXQyxZQUFYLEVBQWI7QUFDQSxTQUFLQyxNQUFMLENBQVksQ0FBWixFQUFlWixJQUFmLEVBWnVDLENBY3ZDOztBQUNBSCxJQUFBQSxNQUFNLENBQUNnQixNQUFQLENBQWNDLEVBQWQsSUFBb0IsS0FBS1QsTUFBekI7QUFDRDtBQUVEOzs7Ozs7O1NBR0FVLFVBQUEsbUJBQVU7QUFDUixRQUFJLEtBQUtOLEtBQUwsS0FBZSxDQUFDLENBQXBCLEVBQXVCO0FBQ3JCTyxNQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyw4QkFBZDtBQUNBO0FBQ0Q7O0FBRUQsUUFBSUMsRUFBRSxHQUFHLEtBQUtqQixPQUFMLENBQWFTLEdBQXRCO0FBQ0FRLElBQUFBLEVBQUUsQ0FBQ0MsWUFBSCxDQUFnQixLQUFLVixLQUFyQjtBQUNBLFNBQUtSLE9BQUwsQ0FBYVksTUFBYixDQUFvQkMsRUFBcEIsSUFBMEIsS0FBS00sS0FBL0I7QUFFQSxTQUFLWCxLQUFMLEdBQWEsQ0FBQyxDQUFkO0FBQ0Q7QUFFRDs7Ozs7OztTQUtBRyxTQUFBLGdCQUFPUyxVQUFQLEVBQW1CckIsSUFBbkIsRUFBeUI7QUFDdkIsUUFBSSxLQUFLUyxLQUFMLEtBQWUsQ0FBQyxDQUFwQixFQUF1QjtBQUNyQk8sTUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMseUJBQWQ7QUFDQTtBQUNEOztBQUVELFFBQUlqQixJQUFJLENBQUNNLFVBQUwsS0FBb0IsQ0FBeEIsRUFBMkIsT0FOSixDQVF2Qjs7QUFDQSxRQUFJZSxVQUFVLEdBQUdyQixJQUFJLENBQUNNLFVBQWxCLEdBQStCLEtBQUtELE1BQXhDLEVBQWdEO0FBQzlDLFVBQUlnQixVQUFKLEVBQWdCO0FBQ2Q7QUFDQUwsUUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsc0NBQWQ7QUFDQTtBQUNELE9BSkQsTUFLSztBQUNILGFBQUtULG9CQUFMLEdBQTRCLElBQTVCO0FBQ0EsYUFBS0gsTUFBTCxHQUFjZ0IsVUFBVSxHQUFHckIsSUFBSSxDQUFDTSxVQUFoQztBQUNBLGFBQUtDLFdBQUwsR0FBbUIsS0FBS0YsTUFBTCxHQUFjLEtBQUtELGNBQXRDO0FBQ0Q7QUFDRjtBQUVEOzs7QUFDQSxRQUFJYyxFQUFFLEdBQUcsS0FBS2pCLE9BQUwsQ0FBYVMsR0FBdEI7QUFDQSxRQUFJWSxPQUFPLEdBQUcsS0FBS25CLE1BQW5CO0FBRUFlLElBQUFBLEVBQUUsQ0FBQ0ssVUFBSCxDQUFjTCxFQUFFLENBQUNNLG9CQUFqQixFQUF1QyxLQUFLZixLQUE1Qzs7QUFDQSxRQUFJLEtBQUtELG9CQUFULEVBQStCO0FBQzdCVSxNQUFBQSxFQUFFLENBQUNPLFVBQUgsQ0FBY1AsRUFBRSxDQUFDTSxvQkFBakIsRUFBdUN4QixJQUF2QyxFQUE2Q3NCLE9BQTdDO0FBQ0EsV0FBS2Qsb0JBQUwsR0FBNEIsS0FBNUI7QUFDRCxLQUhELE1BSUs7QUFDSFUsTUFBQUEsRUFBRSxDQUFDUSxhQUFILENBQWlCUixFQUFFLENBQUNNLG9CQUFwQixFQUEwQ0gsVUFBMUMsRUFBc0RyQixJQUF0RDtBQUNEOztBQUNELFNBQUtDLE9BQUwsQ0FBYTBCLG1CQUFiO0FBQ0Q7O1NBTURDLFdBQUEsa0JBQVU3QixLQUFWLEVBQWlCO0FBQ2YsU0FBS0ksTUFBTCxHQUFjSixLQUFkO0FBQ0Q7Ozs7d0JBTlk7QUFDWCxhQUFPLEtBQUtRLFdBQVo7QUFDRDs7Ozs7O0FBT0hYLFdBQVcsQ0FBQ0wsZUFBWixHQUE4QkEsZUFBOUI7ZUFFZUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlbnVtcyB9IGZyb20gJy4vZW51bXMnO1xuXG5jb25zdCBCWVRFU19QRVJfSU5ERVggPSB7XG4gIFtlbnVtcy5JTkRFWF9GTVRfVUlOVDhdOiAxLFxuICBbZW51bXMuSU5ERVhfRk1UX1VJTlQxNl06IDIsXG4gIFtlbnVtcy5JTkRFWF9GTVRfVUlOVDMyXTogNCxcbn1cblxuY2xhc3MgSW5kZXhCdWZmZXIge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7RGV2aWNlfSBkZXZpY2VcbiAgICogQHBhcmFtIHtJTkRFWF9GTVRfKn0gZm9ybWF0XG4gICAqIEBwYXJhbSB7VVNBR0VfKn0gdXNhZ2VcbiAgICogQHBhcmFtIHtBcnJheUJ1ZmZlciB8IFVpbnQ4QXJyYXl9IGRhdGFcbiAgICovXG4gIGNvbnN0cnVjdG9yKGRldmljZSwgZm9ybWF0LCB1c2FnZSwgZGF0YSkge1xuICAgIHRoaXMuX2RldmljZSA9IGRldmljZTtcbiAgICB0aGlzLl9mb3JtYXQgPSBmb3JtYXQ7XG4gICAgdGhpcy5fdXNhZ2UgPSB1c2FnZTtcbiAgICB0aGlzLl9ieXRlc1BlckluZGV4ID0gQllURVNfUEVSX0lOREVYW2Zvcm1hdF07XG4gICAgdGhpcy5fYnl0ZXMgPSBkYXRhLmJ5dGVMZW5ndGg7XG4gICAgdGhpcy5fbnVtSW5kaWNlcyA9IHRoaXMuX2J5dGVzIC8gdGhpcy5fYnl0ZXNQZXJJbmRleDtcblxuICAgIHRoaXMuX25lZWRFeHBhbmREYXRhU3RvcmUgPSB0cnVlO1xuXG4gICAgLy8gdXBkYXRlXG4gICAgdGhpcy5fZ2xJRCA9IGRldmljZS5fZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgdGhpcy51cGRhdGUoMCwgZGF0YSk7XG5cbiAgICAvLyBzdGF0c1xuICAgIGRldmljZS5fc3RhdHMuaWIgKz0gdGhpcy5fYnl0ZXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBkZXN0cm95XG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9nbElEID09PSAtMSkge1xuICAgICAgY29uc29sZS5lcnJvcignVGhlIGJ1ZmZlciBhbHJlYWR5IGRlc3Ryb3llZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBnbCA9IHRoaXMuX2RldmljZS5fZ2w7XG4gICAgZ2wuZGVsZXRlQnVmZmVyKHRoaXMuX2dsSUQpO1xuICAgIHRoaXMuX2RldmljZS5fc3RhdHMuaWIgLT0gdGhpcy5ieXRlcztcblxuICAgIHRoaXMuX2dsSUQgPSAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gYnl0ZU9mZnNldFxuICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBkYXRhXG4gICAqL1xuICB1cGRhdGUoYnl0ZU9mZnNldCwgZGF0YSkge1xuICAgIGlmICh0aGlzLl9nbElEID09PSAtMSkge1xuICAgICAgY29uc29sZS5lcnJvcignVGhlIGJ1ZmZlciBpcyBkZXN0cm95ZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5ieXRlTGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAvLyBOZWVkIHRvIGNyZWF0ZSBuZXcgYnVmZmVyIG9iamVjdCB3aGVuIGJ5dGVzIGV4Y2VlZFxuICAgIGlmIChieXRlT2Zmc2V0ICsgZGF0YS5ieXRlTGVuZ3RoID4gdGhpcy5fYnl0ZXMpIHtcbiAgICAgIGlmIChieXRlT2Zmc2V0KSB7XG4gICAgICAgIC8vIExvc3QgZGF0YSBiZXR3ZWVuIFswLCBieXRlT2Zmc2V0XSB3aGljaCBpcyBuZWVkIGZvciBuZXcgYnVmZmVyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byB1cGRhdGUgZGF0YSwgYnl0ZXMgZXhjZWVkLicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fbmVlZEV4cGFuZERhdGFTdG9yZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2J5dGVzID0gYnl0ZU9mZnNldCArIGRhdGEuYnl0ZUxlbmd0aDtcbiAgICAgICAgdGhpcy5fbnVtSW5kaWNlcyA9IHRoaXMuX2J5dGVzIC8gdGhpcy5fYnl0ZXNQZXJJbmRleDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQHR5cGV7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSAqL1xuICAgIGxldCBnbCA9IHRoaXMuX2RldmljZS5fZ2w7XG4gICAgbGV0IGdsVXNhZ2UgPSB0aGlzLl91c2FnZTtcblxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuX2dsSUQpO1xuICAgIGlmICh0aGlzLl9uZWVkRXhwYW5kRGF0YVN0b3JlKSB7XG4gICAgICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBkYXRhLCBnbFVzYWdlKTtcbiAgICAgIHRoaXMuX25lZWRFeHBhbmREYXRhU3RvcmUgPSBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBnbC5idWZmZXJTdWJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBieXRlT2Zmc2V0LCBkYXRhKTtcbiAgICB9XG4gICAgdGhpcy5fZGV2aWNlLl9yZXN0b3JlSW5kZXhCdWZmZXIoKTtcbiAgfVxuXG4gIGdldCBjb3VudCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX251bUluZGljZXM7XG4gIH1cblxuICBzZXRVc2FnZSAodXNhZ2UpIHtcbiAgICB0aGlzLl91c2FnZSA9IHVzYWdlO1xuICB9XG59XG5cbkluZGV4QnVmZmVyLkJZVEVTX1BFUl9JTkRFWCA9IEJZVEVTX1BFUl9JTkRFWDtcblxuZXhwb3J0IGRlZmF1bHQgSW5kZXhCdWZmZXI7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==