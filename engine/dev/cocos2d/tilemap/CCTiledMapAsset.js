
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/tilemap/CCTiledMapAsset.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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

/**
 * Class for tiled map asset handling.
 * @class TiledMapAsset
 * @extends Asset
 *
 */
var TiledMapAsset = cc.Class({
  name: 'cc.TiledMapAsset',
  "extends": cc.Asset,
  properties: {
    tmxXmlStr: '',

    /**
     * @property {Texture2D[]} textures
     */
    textures: {
      "default": [],
      type: [cc.Texture2D]
    },

    /**
     * @property {String[]} textureNames
     */
    textureNames: [cc.String],

    /**
     * @property {Size[]} textureSizes
     */
    textureSizes: {
      "default": [],
      type: [cc.Size]
    },

    /**
     * @property {Texture2D[]} imageLayerTextures
     */
    imageLayerTextures: {
      "default": [],
      type: [cc.Texture2D]
    },

    /**
     * @property {String[]} imageLayerTextureNames
     */
    imageLayerTextureNames: [cc.String],
    tsxFiles: [cc.TextAsset],
    tsxFileNames: [cc.String]
  },
  statics: {
    preventDeferredLoadDependents: true
  },
  createNode: CC_EDITOR && function (callback) {
    var node = new cc.Node(this.name);
    var tiledMap = node.addComponent(cc.TiledMap);
    tiledMap.tmxAsset = this;
    return callback(null, node);
  }
});
cc.TiledMapAsset = TiledMapAsset;
module.exports = TiledMapAsset;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC90aWxlbWFwL0NDVGlsZWRNYXBBc3NldC5qcyJdLCJuYW1lcyI6WyJUaWxlZE1hcEFzc2V0IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJBc3NldCIsInByb3BlcnRpZXMiLCJ0bXhYbWxTdHIiLCJ0ZXh0dXJlcyIsInR5cGUiLCJUZXh0dXJlMkQiLCJ0ZXh0dXJlTmFtZXMiLCJTdHJpbmciLCJ0ZXh0dXJlU2l6ZXMiLCJTaXplIiwiaW1hZ2VMYXllclRleHR1cmVzIiwiaW1hZ2VMYXllclRleHR1cmVOYW1lcyIsInRzeEZpbGVzIiwiVGV4dEFzc2V0IiwidHN4RmlsZU5hbWVzIiwic3RhdGljcyIsInByZXZlbnREZWZlcnJlZExvYWREZXBlbmRlbnRzIiwiY3JlYXRlTm9kZSIsIkNDX0VESVRPUiIsImNhbGxiYWNrIiwibm9kZSIsIk5vZGUiLCJ0aWxlZE1hcCIsImFkZENvbXBvbmVudCIsIlRpbGVkTWFwIiwidG14QXNzZXQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBOzs7Ozs7QUFNQSxJQUFJQSxhQUFhLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3pCQyxFQUFBQSxJQUFJLEVBQUUsa0JBRG1CO0FBRXpCLGFBQVNGLEVBQUUsQ0FBQ0csS0FGYTtBQUl6QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRSxFQURIOztBQUdSOzs7QUFHQUMsSUFBQUEsUUFBUSxFQUFFO0FBQ04saUJBQVMsRUFESDtBQUVOQyxNQUFBQSxJQUFJLEVBQUUsQ0FBQ1AsRUFBRSxDQUFDUSxTQUFKO0FBRkEsS0FORjs7QUFXUjs7O0FBR0FDLElBQUFBLFlBQVksRUFBRSxDQUFDVCxFQUFFLENBQUNVLE1BQUosQ0FkTjs7QUFnQlI7OztBQUdBQyxJQUFBQSxZQUFZLEVBQUU7QUFDVixpQkFBUyxFQURDO0FBRVZKLE1BQUFBLElBQUksRUFBRSxDQUFDUCxFQUFFLENBQUNZLElBQUo7QUFGSSxLQW5CTjs7QUF3QlI7OztBQUdBQyxJQUFBQSxrQkFBa0IsRUFBRTtBQUNoQixpQkFBUyxFQURPO0FBRWhCTixNQUFBQSxJQUFJLEVBQUUsQ0FBQ1AsRUFBRSxDQUFDUSxTQUFKO0FBRlUsS0EzQlo7O0FBZ0NSOzs7QUFHQU0sSUFBQUEsc0JBQXNCLEVBQUUsQ0FBQ2QsRUFBRSxDQUFDVSxNQUFKLENBbkNoQjtBQXFDUkssSUFBQUEsUUFBUSxFQUFFLENBQUNmLEVBQUUsQ0FBQ2dCLFNBQUosQ0FyQ0Y7QUFzQ1JDLElBQUFBLFlBQVksRUFBRSxDQUFDakIsRUFBRSxDQUFDVSxNQUFKO0FBdENOLEdBSmE7QUE2Q3pCUSxFQUFBQSxPQUFPLEVBQUU7QUFDTEMsSUFBQUEsNkJBQTZCLEVBQUU7QUFEMUIsR0E3Q2dCO0FBaUR6QkMsRUFBQUEsVUFBVSxFQUFFQyxTQUFTLElBQUksVUFBVUMsUUFBVixFQUFvQjtBQUN6QyxRQUFJQyxJQUFJLEdBQUcsSUFBSXZCLEVBQUUsQ0FBQ3dCLElBQVAsQ0FBWSxLQUFLdEIsSUFBakIsQ0FBWDtBQUNBLFFBQUl1QixRQUFRLEdBQUdGLElBQUksQ0FBQ0csWUFBTCxDQUFrQjFCLEVBQUUsQ0FBQzJCLFFBQXJCLENBQWY7QUFDQUYsSUFBQUEsUUFBUSxDQUFDRyxRQUFULEdBQW9CLElBQXBCO0FBRUEsV0FBT04sUUFBUSxDQUFDLElBQUQsRUFBT0MsSUFBUCxDQUFmO0FBQ0g7QUF2RHdCLENBQVQsQ0FBcEI7QUEwREF2QixFQUFFLENBQUNELGFBQUgsR0FBbUJBLGFBQW5CO0FBQ0E4QixNQUFNLENBQUNDLE9BQVAsR0FBaUIvQixhQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqXG4gKiBDbGFzcyBmb3IgdGlsZWQgbWFwIGFzc2V0IGhhbmRsaW5nLlxuICogQGNsYXNzIFRpbGVkTWFwQXNzZXRcbiAqIEBleHRlbmRzIEFzc2V0XG4gKlxuICovXG5sZXQgVGlsZWRNYXBBc3NldCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuVGlsZWRNYXBBc3NldCcsXG4gICAgZXh0ZW5kczogY2MuQXNzZXQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRteFhtbFN0cjogJycsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7VGV4dHVyZTJEW119IHRleHR1cmVzXG4gICAgICAgICAqL1xuICAgICAgICB0ZXh0dXJlczoge1xuICAgICAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgICAgICB0eXBlOiBbY2MuVGV4dHVyZTJEXVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ1tdfSB0ZXh0dXJlTmFtZXNcbiAgICAgICAgICovXG4gICAgICAgIHRleHR1cmVOYW1lczogW2NjLlN0cmluZ10sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U2l6ZVtdfSB0ZXh0dXJlU2l6ZXNcbiAgICAgICAgICovXG4gICAgICAgIHRleHR1cmVTaXplczoge1xuICAgICAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgICAgICB0eXBlOiBbY2MuU2l6ZV1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IHtUZXh0dXJlMkRbXX0gaW1hZ2VMYXllclRleHR1cmVzXG4gICAgICAgICAqL1xuICAgICAgICBpbWFnZUxheWVyVGV4dHVyZXM6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICAgICAgdHlwZTogW2NjLlRleHR1cmUyRF1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmdbXX0gaW1hZ2VMYXllclRleHR1cmVOYW1lc1xuICAgICAgICAgKi9cbiAgICAgICAgaW1hZ2VMYXllclRleHR1cmVOYW1lczogW2NjLlN0cmluZ10sXG5cbiAgICAgICAgdHN4RmlsZXM6IFtjYy5UZXh0QXNzZXRdLFxuICAgICAgICB0c3hGaWxlTmFtZXM6IFtjYy5TdHJpbmddLFxuICAgIH0sXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIHByZXZlbnREZWZlcnJlZExvYWREZXBlbmRlbnRzOiB0cnVlXG4gICAgfSxcblxuICAgIGNyZWF0ZU5vZGU6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZSh0aGlzLm5hbWUpO1xuICAgICAgICBsZXQgdGlsZWRNYXAgPSBub2RlLmFkZENvbXBvbmVudChjYy5UaWxlZE1hcCk7XG4gICAgICAgIHRpbGVkTWFwLnRteEFzc2V0ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgbm9kZSk7XG4gICAgfVxufSk7XG5cbmNjLlRpbGVkTWFwQXNzZXQgPSBUaWxlZE1hcEFzc2V0O1xubW9kdWxlLmV4cG9ydHMgPSBUaWxlZE1hcEFzc2V0O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=