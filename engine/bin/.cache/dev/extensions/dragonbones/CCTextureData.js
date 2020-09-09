
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/dragonbones/CCTextureData.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
dragonBones.CCTextureAtlasData = cc.Class({
  "extends": dragonBones.TextureAtlasData,
  name: "dragonBones.CCTextureAtlasData",
  properties: {
    _renderTexture: {
      "default": null,
      serializable: false
    },
    renderTexture: {
      get: function get() {
        return this._renderTexture;
      },
      set: function set(value) {
        this._renderTexture = value;

        if (value) {
          for (var k in this.textures) {
            var textureData = this.textures[k];

            if (!textureData.spriteFrame) {
              var rect = null;

              if (textureData.rotated) {
                rect = cc.rect(textureData.region.x, textureData.region.y, textureData.region.height, textureData.region.width);
              } else {
                rect = cc.rect(textureData.region.x, textureData.region.y, textureData.region.width, textureData.region.height);
              }

              var offset = cc.v2(0, 0);
              var size = cc.size(rect.width, rect.height);
              textureData.spriteFrame = new cc.SpriteFrame();
              textureData.spriteFrame.setTexture(value, rect, false, offset, size);
            }
          }
        } else {
          for (var _k in this.textures) {
            var _textureData = this.textures[_k];
            _textureData.spriteFrame = null;
          }
        }
      }
    }
  },
  statics: {
    toString: function toString() {
      return "[class dragonBones.CCTextureAtlasData]";
    }
  },
  _onClear: function _onClear() {
    dragonBones.TextureAtlasData.prototype._onClear.call(this);

    this.renderTexture = null;
  },
  createTexture: function createTexture() {
    return dragonBones.BaseObject.borrowObject(dragonBones.CCTextureData);
  }
});
dragonBones.CCTextureData = cc.Class({
  "extends": dragonBones.TextureData,
  name: "dragonBones.CCTextureData",
  properties: {
    spriteFrame: {
      "default": null,
      serializable: false
    }
  },
  statics: {
    toString: function toString() {
      return "[class dragonBones.CCTextureData]";
    }
  },
  _onClear: function _onClear() {
    dragonBones.TextureData.prototype._onClear.call(this);

    this.spriteFrame = null;
  }
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvZXh0ZW5zaW9ucy9kcmFnb25ib25lcy9DQ1RleHR1cmVEYXRhLmpzIl0sIm5hbWVzIjpbImRyYWdvbkJvbmVzIiwiQ0NUZXh0dXJlQXRsYXNEYXRhIiwiY2MiLCJDbGFzcyIsIlRleHR1cmVBdGxhc0RhdGEiLCJuYW1lIiwicHJvcGVydGllcyIsIl9yZW5kZXJUZXh0dXJlIiwic2VyaWFsaXphYmxlIiwicmVuZGVyVGV4dHVyZSIsImdldCIsInNldCIsInZhbHVlIiwiayIsInRleHR1cmVzIiwidGV4dHVyZURhdGEiLCJzcHJpdGVGcmFtZSIsInJlY3QiLCJyb3RhdGVkIiwicmVnaW9uIiwieCIsInkiLCJoZWlnaHQiLCJ3aWR0aCIsIm9mZnNldCIsInYyIiwic2l6ZSIsIlNwcml0ZUZyYW1lIiwic2V0VGV4dHVyZSIsInN0YXRpY3MiLCJ0b1N0cmluZyIsIl9vbkNsZWFyIiwicHJvdG90eXBlIiwiY2FsbCIsImNyZWF0ZVRleHR1cmUiLCJCYXNlT2JqZWN0IiwiYm9ycm93T2JqZWN0IiwiQ0NUZXh0dXJlRGF0YSIsIlRleHR1cmVEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQUEsV0FBVyxDQUFDQyxrQkFBWixHQUFpQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEMsYUFBU0gsV0FBVyxDQUFDSSxnQkFEaUI7QUFFdENDLEVBQUFBLElBQUksRUFBRSxnQ0FGZ0M7QUFJdENDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxjQUFjLEVBQUU7QUFDWixpQkFBUyxJQURHO0FBRVpDLE1BQUFBLFlBQVksRUFBRTtBQUZGLEtBRFI7QUFNUkMsSUFBQUEsYUFBYSxFQUFFO0FBQ1hDLE1BQUFBLEdBRFcsaUJBQ0o7QUFDSCxlQUFPLEtBQUtILGNBQVo7QUFDSCxPQUhVO0FBSVhJLE1BQUFBLEdBSlcsZUFJTkMsS0FKTSxFQUlDO0FBQ1IsYUFBS0wsY0FBTCxHQUFzQkss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O0FBSEksR0FYd0I7QUFpQmpDQyxFQUFBQSxRQUFRLEVBQUUsb0JBQVk7QUFDbEIvQixJQUFBQSxXQUFXLENBQUNzQyxXQUFaLENBQXdCTixTQUF4QixDQUFrQ0QsUUFBbEMsQ0FBMkNFLElBQTNDLENBQWdELElBQWhEOztBQUNBLFNBQUtqQixXQUFMLEdBQW1CLElBQW5CO0FBQ0g7QUFwQmdDLENBQVQsQ0FBNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmRyYWdvbkJvbmVzLkNDVGV4dHVyZUF0bGFzRGF0YSA9IGNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBkcmFnb25Cb25lcy5UZXh0dXJlQXRsYXNEYXRhLFxuICAgIG5hbWU6IFwiZHJhZ29uQm9uZXMuQ0NUZXh0dXJlQXRsYXNEYXRhXCIsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIF9yZW5kZXJUZXh0dXJlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbmRlclRleHR1cmU6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclRleHR1cmU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclRleHR1cmUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayBpbiB0aGlzLnRleHR1cmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dHVyZURhdGEgPSB0aGlzLnRleHR1cmVzW2tdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0ZXh0dXJlRGF0YS5zcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWN0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGV4dHVyZURhdGEucm90YXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWN0ID0gY2MucmVjdCh0ZXh0dXJlRGF0YS5yZWdpb24ueCwgdGV4dHVyZURhdGEucmVnaW9uLnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlRGF0YS5yZWdpb24uaGVpZ2h0LCB0ZXh0dXJlRGF0YS5yZWdpb24ud2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY3QgPSBjYy5yZWN0KHRleHR1cmVEYXRhLnJlZ2lvbi54LCB0ZXh0dXJlRGF0YS5yZWdpb24ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmVEYXRhLnJlZ2lvbi53aWR0aCwgdGV4dHVyZURhdGEucmVnaW9uLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXQgPSBjYy52MigwLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA9IGNjLnNpemUocmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmVEYXRhLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZURhdGEuc3ByaXRlRnJhbWUuc2V0VGV4dHVyZSh2YWx1ZSwgcmVjdCwgZmFsc2UsIG9mZnNldCwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrIGluIHRoaXMudGV4dHVyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0dXJlRGF0YSA9IHRoaXMudGV4dHVyZXNba107XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlRGF0YS5zcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBcIltjbGFzcyBkcmFnb25Cb25lcy5DQ1RleHR1cmVBdGxhc0RhdGFdXCI7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29uQ2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZHJhZ29uQm9uZXMuVGV4dHVyZUF0bGFzRGF0YS5wcm90b3R5cGUuX29uQ2xlYXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZW5kZXJUZXh0dXJlID0gbnVsbDtcbiAgICB9LFxuXG4gICAgY3JlYXRlVGV4dHVyZSA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZHJhZ29uQm9uZXMuQmFzZU9iamVjdC5ib3Jyb3dPYmplY3QoZHJhZ29uQm9uZXMuQ0NUZXh0dXJlRGF0YSk7XG4gICAgfVxuXG5cbn0pO1xuXG5kcmFnb25Cb25lcy5DQ1RleHR1cmVEYXRhID0gY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGRyYWdvbkJvbmVzLlRleHR1cmVEYXRhLFxuICAgIG5hbWU6IFwiZHJhZ29uQm9uZXMuQ0NUZXh0dXJlRGF0YVwiLFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzcHJpdGVGcmFtZToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiW2NsYXNzIGRyYWdvbkJvbmVzLkNDVGV4dHVyZURhdGFdXCI7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29uQ2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZHJhZ29uQm9uZXMuVGV4dHVyZURhdGEucHJvdG90eXBlLl9vbkNsZWFyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuc3ByaXRlRnJhbWUgPSBudWxsO1xuICAgIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=