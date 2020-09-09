
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/index.js';
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

var gfx = null;

if (CC_JSB && CC_NATIVERENDERER) {
  gfx = window.gfx;
} else {
  var VertexFormat = require('./vertex-format');

  var IndexBuffer = require('./index-buffer');

  var VertexBuffer = require('./vertex-buffer');

  var Program = require('./program');

  var Texture = require('./texture');

  var Texture2D = require('./texture-2d');

  var TextureCube = require('./texture-cube');

  var RenderBuffer = require('./render-buffer');

  var FrameBuffer = require('./frame-buffer');

  var Device = require('./device');

  gfx = {
    // classes
    VertexFormat: VertexFormat,
    IndexBuffer: IndexBuffer,
    VertexBuffer: VertexBuffer,
    Program: Program,
    Texture: Texture,
    Texture2D: Texture2D,
    TextureCube: TextureCube,
    RenderBuffer: RenderBuffer,
    FrameBuffer: FrameBuffer,
    Device: Device,
    // functions
    attrTypeBytes: _enums.attrTypeBytes,
    glFilter: _enums.glFilter,
    glTextureFmt: _enums.glTextureFmt
  };
  Object.assign(gfx, _enums.enums);
}

var _default = gfx;
exports["default"] = _default;
cc.gfx = gfx;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9nZngvaW5kZXguanMiXSwibmFtZXMiOlsiZ2Z4IiwiQ0NfSlNCIiwiQ0NfTkFUSVZFUkVOREVSRVIiLCJ3aW5kb3ciLCJWZXJ0ZXhGb3JtYXQiLCJyZXF1aXJlIiwiSW5kZXhCdWZmZXIiLCJWZXJ0ZXhCdWZmZXIiLCJQcm9ncmFtIiwiVGV4dHVyZSIsIlRleHR1cmUyRCIsIlRleHR1cmVDdWJlIiwiUmVuZGVyQnVmZmVyIiwiRnJhbWVCdWZmZXIiLCJEZXZpY2UiLCJhdHRyVHlwZUJ5dGVzIiwiZ2xGaWx0ZXIiLCJnbFRleHR1cmVGbXQiLCJPYmplY3QiLCJhc3NpZ24iLCJlbnVtcyIsImNjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBT0EsSUFBSUEsR0FBRyxHQUFHLElBQVY7O0FBRUEsSUFBSUMsTUFBTSxJQUFJQyxpQkFBZCxFQUFpQztBQUM3QkYsRUFBQUEsR0FBRyxHQUFHRyxNQUFNLENBQUNILEdBQWI7QUFDSCxDQUZELE1BRU87QUFDSCxNQUFJSSxZQUFZLEdBQUdDLE9BQU8sQ0FBQyxpQkFBRCxDQUExQjs7QUFDQSxNQUFJQyxXQUFXLEdBQUdELE9BQU8sQ0FBQyxnQkFBRCxDQUF6Qjs7QUFDQSxNQUFJRSxZQUFZLEdBQUdGLE9BQU8sQ0FBQyxpQkFBRCxDQUExQjs7QUFDQSxNQUFJRyxPQUFPLEdBQUdILE9BQU8sQ0FBQyxXQUFELENBQXJCOztBQUNBLE1BQUlJLE9BQU8sR0FBR0osT0FBTyxDQUFDLFdBQUQsQ0FBckI7O0FBQ0EsTUFBSUssU0FBUyxHQUFHTCxPQUFPLENBQUMsY0FBRCxDQUF2Qjs7QUFDQSxNQUFJTSxXQUFXLEdBQUdOLE9BQU8sQ0FBQyxnQkFBRCxDQUF6Qjs7QUFDQSxNQUFJTyxZQUFZLEdBQUdQLE9BQU8sQ0FBQyxpQkFBRCxDQUExQjs7QUFDQSxNQUFJUSxXQUFXLEdBQUdSLE9BQU8sQ0FBQyxnQkFBRCxDQUF6Qjs7QUFDQSxNQUFJUyxNQUFNLEdBQUdULE9BQU8sQ0FBQyxVQUFELENBQXBCOztBQUVBTCxFQUFBQSxHQUFHLEdBQUc7QUFDRjtBQUNBSSxJQUFBQSxZQUFZLEVBQVpBLFlBRkU7QUFHRkUsSUFBQUEsV0FBVyxFQUFYQSxXQUhFO0FBSUZDLElBQUFBLFlBQVksRUFBWkEsWUFKRTtBQUtGQyxJQUFBQSxPQUFPLEVBQVBBLE9BTEU7QUFNRkMsSUFBQUEsT0FBTyxFQUFQQSxPQU5FO0FBT0ZDLElBQUFBLFNBQVMsRUFBVEEsU0FQRTtBQVFGQyxJQUFBQSxXQUFXLEVBQVhBLFdBUkU7QUFTRkMsSUFBQUEsWUFBWSxFQUFaQSxZQVRFO0FBVUZDLElBQUFBLFdBQVcsRUFBWEEsV0FWRTtBQVdGQyxJQUFBQSxNQUFNLEVBQU5BLE1BWEU7QUFhRjtBQUNBQyxJQUFBQSxhQUFhLEVBQWJBLG9CQWRFO0FBZUZDLElBQUFBLFFBQVEsRUFBUkEsZUFmRTtBQWdCRkMsSUFBQUEsWUFBWSxFQUFaQTtBQWhCRSxHQUFOO0FBa0JBQyxFQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY25CLEdBQWQsRUFBbUJvQixZQUFuQjtBQUNIOztlQUVjcEI7O0FBQ2ZxQixFQUFFLENBQUNyQixHQUFILEdBQVNBLEdBQVQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIGVudW1zLFxuICAgIGF0dHJUeXBlQnl0ZXMsXG4gICAgZ2xGaWx0ZXIsXG4gICAgZ2xUZXh0dXJlRm10LFxufSBmcm9tICcuL2VudW1zJztcblxubGV0IGdmeCA9IG51bGw7XG5cbmlmIChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICBnZnggPSB3aW5kb3cuZ2Z4O1xufSBlbHNlIHtcbiAgICBsZXQgVmVydGV4Rm9ybWF0ID0gcmVxdWlyZSgnLi92ZXJ0ZXgtZm9ybWF0Jyk7XG4gICAgbGV0IEluZGV4QnVmZmVyID0gcmVxdWlyZSgnLi9pbmRleC1idWZmZXInKTtcbiAgICBsZXQgVmVydGV4QnVmZmVyID0gcmVxdWlyZSgnLi92ZXJ0ZXgtYnVmZmVyJyk7XG4gICAgbGV0IFByb2dyYW0gPSByZXF1aXJlKCcuL3Byb2dyYW0nKTtcbiAgICBsZXQgVGV4dHVyZSA9IHJlcXVpcmUoJy4vdGV4dHVyZScpO1xuICAgIGxldCBUZXh0dXJlMkQgPSByZXF1aXJlKCcuL3RleHR1cmUtMmQnKTtcbiAgICBsZXQgVGV4dHVyZUN1YmUgPSByZXF1aXJlKCcuL3RleHR1cmUtY3ViZScpO1xuICAgIGxldCBSZW5kZXJCdWZmZXIgPSByZXF1aXJlKCcuL3JlbmRlci1idWZmZXInKTtcbiAgICBsZXQgRnJhbWVCdWZmZXIgPSByZXF1aXJlKCcuL2ZyYW1lLWJ1ZmZlcicpO1xuICAgIGxldCBEZXZpY2UgPSByZXF1aXJlKCcuL2RldmljZScpO1xuXG4gICAgZ2Z4ID0ge1xuICAgICAgICAvLyBjbGFzc2VzXG4gICAgICAgIFZlcnRleEZvcm1hdCxcbiAgICAgICAgSW5kZXhCdWZmZXIsXG4gICAgICAgIFZlcnRleEJ1ZmZlcixcbiAgICAgICAgUHJvZ3JhbSxcbiAgICAgICAgVGV4dHVyZSxcbiAgICAgICAgVGV4dHVyZTJELFxuICAgICAgICBUZXh0dXJlQ3ViZSxcbiAgICAgICAgUmVuZGVyQnVmZmVyLFxuICAgICAgICBGcmFtZUJ1ZmZlcixcbiAgICAgICAgRGV2aWNlLFxuXG4gICAgICAgIC8vIGZ1bmN0aW9uc1xuICAgICAgICBhdHRyVHlwZUJ5dGVzLFxuICAgICAgICBnbEZpbHRlcixcbiAgICAgICAgZ2xUZXh0dXJlRm10LFxuICAgIH07XG4gICAgT2JqZWN0LmFzc2lnbihnZngsIGVudW1zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2Z4O1xuY2MuZ2Z4ID0gZ2Z4O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=