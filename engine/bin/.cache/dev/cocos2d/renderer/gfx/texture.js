
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/texture.js';
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

/**
 * @type {WebGLTexture}
 */
var _nullWebGLTexture = null;
var _textureID = 0;
/**
 * @typedef {import("../gfx/device").default} Device
 */

var Texture = /*#__PURE__*/function () {
  /**
   * @param {Device} device
   */
  function Texture(device) {
    this._device = device;
    this._width = 4;
    this._height = 4;
    this._genMipmaps = false;
    this._compressed = false;
    this._anisotropy = 1;
    this._minFilter = _enums.enums.FILTER_LINEAR;
    this._magFilter = _enums.enums.FILTER_LINEAR;
    this._mipFilter = _enums.enums.FILTER_LINEAR;
    this._wrapS = _enums.enums.WRAP_REPEAT;
    this._wrapT = _enums.enums.WRAP_REPEAT; // wrapR available in webgl2
    // this._wrapR = enums.WRAP_REPEAT;

    this._format = _enums.enums.TEXTURE_FMT_RGBA8;
    this._target = -1;
    this._id = _textureID++;
  }
  /**
   * @method destroy
   */


  var _proto = Texture.prototype;

  _proto.destroy = function destroy() {
    if (this._glID === _nullWebGLTexture) {
      console.error('The texture already destroyed');
      return;
    }

    var gl = this._device._gl;
    gl.deleteTexture(this._glID);
    this._device._stats.tex -= this.bytes;
    this._glID = _nullWebGLTexture;
  };

  return Texture;
}();

exports["default"] = Texture;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9nZngvdGV4dHVyZS5qcyJdLCJuYW1lcyI6WyJfbnVsbFdlYkdMVGV4dHVyZSIsIl90ZXh0dXJlSUQiLCJUZXh0dXJlIiwiZGV2aWNlIiwiX2RldmljZSIsIl93aWR0aCIsIl9oZWlnaHQiLCJfZ2VuTWlwbWFwcyIsIl9jb21wcmVzc2VkIiwiX2FuaXNvdHJvcHkiLCJfbWluRmlsdGVyIiwiZW51bXMiLCJGSUxURVJfTElORUFSIiwiX21hZ0ZpbHRlciIsIl9taXBGaWx0ZXIiLCJfd3JhcFMiLCJXUkFQX1JFUEVBVCIsIl93cmFwVCIsIl9mb3JtYXQiLCJURVhUVVJFX0ZNVF9SR0JBOCIsIl90YXJnZXQiLCJfaWQiLCJkZXN0cm95IiwiX2dsSUQiLCJjb25zb2xlIiwiZXJyb3IiLCJnbCIsIl9nbCIsImRlbGV0ZVRleHR1cmUiLCJfc3RhdHMiLCJ0ZXgiLCJieXRlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBOzs7QUFHQSxJQUFNQSxpQkFBaUIsR0FBRyxJQUExQjtBQUVBLElBQUlDLFVBQVUsR0FBRyxDQUFqQjtBQUVBOzs7O0lBSXFCQztBQUNuQjs7O0FBR0EsbUJBQVlDLE1BQVosRUFBb0I7QUFDbEIsU0FBS0MsT0FBTCxHQUFlRCxNQUFmO0FBRUEsU0FBS0UsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLEtBQW5CO0FBRUEsU0FBS0MsV0FBTCxHQUFtQixDQUFuQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JDLGFBQU1DLGFBQXhCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkYsYUFBTUMsYUFBeEI7QUFDQSxTQUFLRSxVQUFMLEdBQWtCSCxhQUFNQyxhQUF4QjtBQUNBLFNBQUtHLE1BQUwsR0FBY0osYUFBTUssV0FBcEI7QUFDQSxTQUFLQyxNQUFMLEdBQWNOLGFBQU1LLFdBQXBCLENBYmtCLENBY2xCO0FBQ0E7O0FBQ0EsU0FBS0UsT0FBTCxHQUFlUCxhQUFNUSxpQkFBckI7QUFFQSxTQUFLQyxPQUFMLEdBQWUsQ0FBQyxDQUFoQjtBQUVBLFNBQUtDLEdBQUwsR0FBV3BCLFVBQVUsRUFBckI7QUFDRDtBQUVEOzs7Ozs7O1NBR0FxQixVQUFBLG1CQUFVO0FBQ1IsUUFBSSxLQUFLQyxLQUFMLEtBQWV2QixpQkFBbkIsRUFBc0M7QUFDcEN3QixNQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYywrQkFBZDtBQUNBO0FBQ0Q7O0FBRUQsUUFBSUMsRUFBRSxHQUFHLEtBQUt0QixPQUFMLENBQWF1QixHQUF0QjtBQUNBRCxJQUFBQSxFQUFFLENBQUNFLGFBQUgsQ0FBaUIsS0FBS0wsS0FBdEI7QUFFQSxTQUFLbkIsT0FBTCxDQUFheUIsTUFBYixDQUFvQkMsR0FBcEIsSUFBMkIsS0FBS0MsS0FBaEM7QUFDQSxTQUFLUixLQUFMLEdBQWF2QixpQkFBYjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZW51bXMgfSBmcm9tICcuL2VudW1zJztcblxuLyoqXG4gKiBAdHlwZSB7V2ViR0xUZXh0dXJlfVxuICovXG5jb25zdCBfbnVsbFdlYkdMVGV4dHVyZSA9IG51bGw7XG5cbmxldCBfdGV4dHVyZUlEID0gMDtcblxuLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vZ2Z4L2RldmljZVwiKS5kZWZhdWx0fSBEZXZpY2VcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0dXJlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7RGV2aWNlfSBkZXZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKGRldmljZSkge1xuICAgIHRoaXMuX2RldmljZSA9IGRldmljZTtcblxuICAgIHRoaXMuX3dpZHRoID0gNDtcbiAgICB0aGlzLl9oZWlnaHQgPSA0O1xuICAgIHRoaXMuX2dlbk1pcG1hcHMgPSBmYWxzZTtcbiAgICB0aGlzLl9jb21wcmVzc2VkID0gZmFsc2U7XG5cbiAgICB0aGlzLl9hbmlzb3Ryb3B5ID0gMTtcbiAgICB0aGlzLl9taW5GaWx0ZXIgPSBlbnVtcy5GSUxURVJfTElORUFSO1xuICAgIHRoaXMuX21hZ0ZpbHRlciA9IGVudW1zLkZJTFRFUl9MSU5FQVI7XG4gICAgdGhpcy5fbWlwRmlsdGVyID0gZW51bXMuRklMVEVSX0xJTkVBUjtcbiAgICB0aGlzLl93cmFwUyA9IGVudW1zLldSQVBfUkVQRUFUO1xuICAgIHRoaXMuX3dyYXBUID0gZW51bXMuV1JBUF9SRVBFQVQ7XG4gICAgLy8gd3JhcFIgYXZhaWxhYmxlIGluIHdlYmdsMlxuICAgIC8vIHRoaXMuX3dyYXBSID0gZW51bXMuV1JBUF9SRVBFQVQ7XG4gICAgdGhpcy5fZm9ybWF0ID0gZW51bXMuVEVYVFVSRV9GTVRfUkdCQTg7XG5cbiAgICB0aGlzLl90YXJnZXQgPSAtMTtcbiAgICBcbiAgICB0aGlzLl9pZCA9IF90ZXh0dXJlSUQrKztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX2dsSUQgPT09IF9udWxsV2ViR0xUZXh0dXJlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdUaGUgdGV4dHVyZSBhbHJlYWR5IGRlc3Ryb3llZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBnbCA9IHRoaXMuX2RldmljZS5fZ2w7XG4gICAgZ2wuZGVsZXRlVGV4dHVyZSh0aGlzLl9nbElEKTtcblxuICAgIHRoaXMuX2RldmljZS5fc3RhdHMudGV4IC09IHRoaXMuYnl0ZXM7XG4gICAgdGhpcy5fZ2xJRCA9IF9udWxsV2ViR0xUZXh0dXJlO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvIn0=