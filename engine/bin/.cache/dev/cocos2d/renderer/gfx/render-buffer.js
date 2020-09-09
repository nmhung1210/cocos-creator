
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/render-buffer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var RenderBuffer = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {Device} device
   * @param {RB_FMT_*} format
   * @param {Number} width
   * @param {Number} height
   */
  function RenderBuffer(device, format, width, height) {
    this._device = device;
    this._format = format;
    this._glID = device._gl.createRenderbuffer();
    this.update(width, height);
  }

  var _proto = RenderBuffer.prototype;

  _proto.update = function update(width, height) {
    this._width = width;
    this._height = height;
    var gl = this._device._gl;
    gl.bindRenderbuffer(gl.RENDERBUFFER, this._glID);
    gl.renderbufferStorage(gl.RENDERBUFFER, this._format, width, height);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
  }
  /**
   * @method destroy
   */
  ;

  _proto.destroy = function destroy() {
    if (this._glID === null) {
      console.error('The render-buffer already destroyed');
      return;
    }

    var gl = this._device._gl;
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.deleteRenderbuffer(this._glID);
    this._glID = null;
  };

  return RenderBuffer;
}();

exports["default"] = RenderBuffer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9nZngvcmVuZGVyLWJ1ZmZlci5qcyJdLCJuYW1lcyI6WyJSZW5kZXJCdWZmZXIiLCJkZXZpY2UiLCJmb3JtYXQiLCJ3aWR0aCIsImhlaWdodCIsIl9kZXZpY2UiLCJfZm9ybWF0IiwiX2dsSUQiLCJfZ2wiLCJjcmVhdGVSZW5kZXJidWZmZXIiLCJ1cGRhdGUiLCJfd2lkdGgiLCJfaGVpZ2h0IiwiZ2wiLCJiaW5kUmVuZGVyYnVmZmVyIiwiUkVOREVSQlVGRkVSIiwicmVuZGVyYnVmZmVyU3RvcmFnZSIsImRlc3Ryb3kiLCJjb25zb2xlIiwiZXJyb3IiLCJkZWxldGVSZW5kZXJidWZmZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBcUJBO0FBQ25COzs7Ozs7O0FBT0Esd0JBQVlDLE1BQVosRUFBb0JDLE1BQXBCLEVBQTRCQyxLQUE1QixFQUFtQ0MsTUFBbkMsRUFBMkM7QUFDekMsU0FBS0MsT0FBTCxHQUFlSixNQUFmO0FBQ0EsU0FBS0ssT0FBTCxHQUFlSixNQUFmO0FBRUEsU0FBS0ssS0FBTCxHQUFhTixNQUFNLENBQUNPLEdBQVAsQ0FBV0Msa0JBQVgsRUFBYjtBQUNBLFNBQUtDLE1BQUwsQ0FBWVAsS0FBWixFQUFtQkMsTUFBbkI7QUFDRDs7OztTQUVETSxTQUFBLGdCQUFRUCxLQUFSLEVBQWVDLE1BQWYsRUFBdUI7QUFDckIsU0FBS08sTUFBTCxHQUFjUixLQUFkO0FBQ0EsU0FBS1MsT0FBTCxHQUFlUixNQUFmO0FBRUEsUUFBTVMsRUFBRSxHQUFHLEtBQUtSLE9BQUwsQ0FBYUcsR0FBeEI7QUFDQUssSUFBQUEsRUFBRSxDQUFDQyxnQkFBSCxDQUFvQkQsRUFBRSxDQUFDRSxZQUF2QixFQUFxQyxLQUFLUixLQUExQztBQUNBTSxJQUFBQSxFQUFFLENBQUNHLG1CQUFILENBQXVCSCxFQUFFLENBQUNFLFlBQTFCLEVBQXdDLEtBQUtULE9BQTdDLEVBQXNESCxLQUF0RCxFQUE2REMsTUFBN0Q7QUFDQVMsSUFBQUEsRUFBRSxDQUFDQyxnQkFBSCxDQUFvQkQsRUFBRSxDQUFDRSxZQUF2QixFQUFxQyxJQUFyQztBQUNEO0FBRUQ7Ozs7O1NBR0FFLFVBQUEsbUJBQVU7QUFDUixRQUFJLEtBQUtWLEtBQUwsS0FBZSxJQUFuQixFQUF5QjtBQUN2QlcsTUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMscUNBQWQ7QUFDQTtBQUNEOztBQUVELFFBQU1OLEVBQUUsR0FBRyxLQUFLUixPQUFMLENBQWFHLEdBQXhCO0FBRUFLLElBQUFBLEVBQUUsQ0FBQ0MsZ0JBQUgsQ0FBb0JELEVBQUUsQ0FBQ0UsWUFBdkIsRUFBcUMsSUFBckM7QUFDQUYsSUFBQUEsRUFBRSxDQUFDTyxrQkFBSCxDQUFzQixLQUFLYixLQUEzQjtBQUVBLFNBQUtBLEtBQUwsR0FBYSxJQUFiO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJCdWZmZXIge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7RGV2aWNlfSBkZXZpY2VcbiAgICogQHBhcmFtIHtSQl9GTVRfKn0gZm9ybWF0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aFxuICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XG4gICAqL1xuICBjb25zdHJ1Y3RvcihkZXZpY2UsIGZvcm1hdCwgd2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuX2RldmljZSA9IGRldmljZTtcbiAgICB0aGlzLl9mb3JtYXQgPSBmb3JtYXQ7XG4gICAgXG4gICAgdGhpcy5fZ2xJRCA9IGRldmljZS5fZ2wuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gICAgdGhpcy51cGRhdGUod2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICB1cGRhdGUgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcblxuICAgIGNvbnN0IGdsID0gdGhpcy5fZGV2aWNlLl9nbDtcbiAgICBnbC5iaW5kUmVuZGVyYnVmZmVyKGdsLlJFTkRFUkJVRkZFUiwgdGhpcy5fZ2xJRCk7XG4gICAgZ2wucmVuZGVyYnVmZmVyU3RvcmFnZShnbC5SRU5ERVJCVUZGRVIsIHRoaXMuX2Zvcm1hdCwgd2lkdGgsIGhlaWdodCk7XG4gICAgZ2wuYmluZFJlbmRlcmJ1ZmZlcihnbC5SRU5ERVJCVUZGRVIsIG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZGVzdHJveVxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fZ2xJRCA9PT0gbnVsbCkge1xuICAgICAgY29uc29sZS5lcnJvcignVGhlIHJlbmRlci1idWZmZXIgYWxyZWFkeSBkZXN0cm95ZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBnbCA9IHRoaXMuX2RldmljZS5fZ2w7XG5cbiAgICBnbC5iaW5kUmVuZGVyYnVmZmVyKGdsLlJFTkRFUkJVRkZFUiwgbnVsbCk7XG4gICAgZ2wuZGVsZXRlUmVuZGVyYnVmZmVyKHRoaXMuX2dsSUQpO1xuXG4gICAgdGhpcy5fZ2xJRCA9IG51bGw7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==