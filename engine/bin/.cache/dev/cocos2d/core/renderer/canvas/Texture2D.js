
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/Texture2D.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.  
var Texture2D = function Texture2D(device, options) {
  this._device = device;
  this._width = 4;
  this._height = 4;
  this._image = null;

  if (options) {
    if (options.width !== undefined) {
      this._width = options.width;
    }

    if (options.height !== undefined) {
      this._height = options.height;
    }

    this.updateImage(options);
  }
};

Texture2D.prototype.update = function update(options) {
  this.updateImage(options);
};

Texture2D.prototype.updateImage = function updateImage(options) {
  if (options.images && options.images[0]) {
    var image = options.images[0];

    if (image && image !== this._image) {
      this._image = image;
    }
  }
};

Texture2D.prototype.destroy = function destroy() {
  this._image = null;
};

module.exports = Texture2D;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2NhbnZhcy9UZXh0dXJlMkQuanMiXSwibmFtZXMiOlsiVGV4dHVyZTJEIiwiZGV2aWNlIiwib3B0aW9ucyIsIl9kZXZpY2UiLCJfd2lkdGgiLCJfaGVpZ2h0IiwiX2ltYWdlIiwid2lkdGgiLCJ1bmRlZmluZWQiLCJoZWlnaHQiLCJ1cGRhdGVJbWFnZSIsInByb3RvdHlwZSIsInVwZGF0ZSIsImltYWdlcyIsImltYWdlIiwiZGVzdHJveSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUVBLElBQUlBLFNBQVMsR0FBRyxTQUFTQSxTQUFULENBQW1CQyxNQUFuQixFQUEyQkMsT0FBM0IsRUFBb0M7QUFDbEQsT0FBS0MsT0FBTCxHQUFlRixNQUFmO0FBRUEsT0FBS0csTUFBTCxHQUFjLENBQWQ7QUFDQSxPQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUVBLE9BQUtDLE1BQUwsR0FBYyxJQUFkOztBQUVBLE1BQUlKLE9BQUosRUFBYTtBQUNYLFFBQUlBLE9BQU8sQ0FBQ0ssS0FBUixLQUFrQkMsU0FBdEIsRUFBaUM7QUFDL0IsV0FBS0osTUFBTCxHQUFjRixPQUFPLENBQUNLLEtBQXRCO0FBQ0Q7O0FBQ0QsUUFBSUwsT0FBTyxDQUFDTyxNQUFSLEtBQW1CRCxTQUF2QixFQUFrQztBQUNoQyxXQUFLSCxPQUFMLEdBQWVILE9BQU8sQ0FBQ08sTUFBdkI7QUFDRDs7QUFFRCxTQUFLQyxXQUFMLENBQWlCUixPQUFqQjtBQUNEO0FBQ0YsQ0FsQkQ7O0FBb0JBRixTQUFTLENBQUNXLFNBQVYsQ0FBb0JDLE1BQXBCLEdBQTZCLFNBQVNBLE1BQVQsQ0FBaUJWLE9BQWpCLEVBQTBCO0FBQ3JELE9BQUtRLFdBQUwsQ0FBaUJSLE9BQWpCO0FBQ0QsQ0FGRDs7QUFJQUYsU0FBUyxDQUFDVyxTQUFWLENBQW9CRCxXQUFwQixHQUFrQyxTQUFTQSxXQUFULENBQXNCUixPQUF0QixFQUErQjtBQUMvRCxNQUFJQSxPQUFPLENBQUNXLE1BQVIsSUFBa0JYLE9BQU8sQ0FBQ1csTUFBUixDQUFlLENBQWYsQ0FBdEIsRUFBeUM7QUFDdkMsUUFBSUMsS0FBSyxHQUFHWixPQUFPLENBQUNXLE1BQVIsQ0FBZSxDQUFmLENBQVo7O0FBQ0EsUUFBSUMsS0FBSyxJQUFJQSxLQUFLLEtBQUssS0FBS1IsTUFBNUIsRUFBb0M7QUFDbEMsV0FBS0EsTUFBTCxHQUFjUSxLQUFkO0FBQ0Q7QUFDRjtBQUNGLENBUEQ7O0FBU0FkLFNBQVMsQ0FBQ1csU0FBVixDQUFvQkksT0FBcEIsR0FBOEIsU0FBU0EsT0FBVCxHQUFvQjtBQUNoRCxPQUFLVCxNQUFMLEdBQWMsSUFBZDtBQUNELENBRkQ7O0FBSUFVLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmpCLFNBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gIFxuIFxudmFyIFRleHR1cmUyRCA9IGZ1bmN0aW9uIFRleHR1cmUyRChkZXZpY2UsIG9wdGlvbnMpIHtcbiAgdGhpcy5fZGV2aWNlID0gZGV2aWNlO1xuICAgIFxuICB0aGlzLl93aWR0aCA9IDQ7XG4gIHRoaXMuX2hlaWdodCA9IDQ7XG5cbiAgdGhpcy5faW1hZ2UgPSBudWxsO1xuXG4gIGlmIChvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMud2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fd2lkdGggPSBvcHRpb25zLndpZHRoO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5oZWlnaHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5faGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQ7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVJbWFnZShvcHRpb25zKTtcbiAgfVxufTtcblxuVGV4dHVyZTJELnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKG9wdGlvbnMpIHtcbiAgdGhpcy51cGRhdGVJbWFnZShvcHRpb25zKTtcbn07XG5cblRleHR1cmUyRC5wcm90b3R5cGUudXBkYXRlSW1hZ2UgPSBmdW5jdGlvbiB1cGRhdGVJbWFnZSAob3B0aW9ucykge1xuICBpZiAob3B0aW9ucy5pbWFnZXMgJiYgb3B0aW9ucy5pbWFnZXNbMF0pIHtcbiAgICB2YXIgaW1hZ2UgPSBvcHRpb25zLmltYWdlc1swXTtcbiAgICBpZiAoaW1hZ2UgJiYgaW1hZ2UgIT09IHRoaXMuX2ltYWdlKSB7XG4gICAgICB0aGlzLl9pbWFnZSA9IGltYWdlO1xuICAgIH1cbiAgfVxufTtcblxuVGV4dHVyZTJELnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gIHRoaXMuX2ltYWdlID0gbnVsbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dHVyZTJEO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=