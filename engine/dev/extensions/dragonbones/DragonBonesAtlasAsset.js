
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/dragonbones/DragonBonesAtlasAsset.js';
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
 * @module dragonBones
 */
var ArmatureCache = !CC_JSB && require('./ArmatureCache').sharedCache;
/**
 * !#en The skeleton atlas data of dragonBones.
 * !#zh dragonBones 的骨骼纹理数据。
 * @class DragonBonesAtlasAsset
 * @extends Asset
 */


var DragonBonesAtlasAsset = cc.Class({
  name: 'dragonBones.DragonBonesAtlasAsset',
  "extends": cc.Asset,
  ctor: function ctor() {
    this._clear();
  },
  properties: {
    _atlasJson: '',

    /**
     * @property {string} atlasJson
     */
    atlasJson: {
      get: function get() {
        return this._atlasJson;
      },
      set: function set(value) {
        this._atlasJson = value;
        this._atlasJsonData = JSON.parse(this.atlasJson);

        this._clear();
      }
    },
    _texture: {
      "default": null,
      type: cc.Texture2D,
      formerlySerializedAs: 'texture'
    },

    /**
     * @property {Texture2D} texture
     */
    texture: {
      get: function get() {
        return this._texture;
      },
      set: function set(value) {
        this._texture = value;

        this._clear();
      }
    },
    _textureAtlasData: null
  },
  statics: {
    preventDeferredLoadDependents: true
  },
  createNode: CC_EDITOR && function (callback) {
    var node = new cc.Node(this.name);
    var armatureDisplay = node.addComponent(dragonBones.ArmatureDisplay);
    armatureDisplay.dragonAtlasAsset = this;
    return callback(null, node);
  },
  init: function init(factory) {
    this._factory = factory;

    if (!this._atlasJsonData) {
      this._atlasJsonData = JSON.parse(this.atlasJson);
    }

    var atlasJsonObj = this._atlasJsonData; // If create by manual, uuid is empty.

    this._uuid = this._uuid || atlasJsonObj.name;

    if (this._textureAtlasData) {
      factory.addTextureAtlasData(this._textureAtlasData, this._uuid);
    } else {
      this._textureAtlasData = factory.parseTextureAtlasData(atlasJsonObj, this.texture, this._uuid);
    }
  },
  _clear: function _clear() {
    if (CC_JSB) return;

    if (this._factory) {
      ArmatureCache.resetArmature(this._uuid);

      this._factory.removeTextureAtlasData(this._uuid, true);

      this._factory.removeDragonBonesDataByUUID(this._uuid, true);
    }

    this._textureAtlasData = null;
  },
  destroy: function destroy() {
    this._clear();

    this._super();
  }
});
dragonBones.DragonBonesAtlasAsset = module.exports = DragonBonesAtlasAsset;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvZXh0ZW5zaW9ucy9kcmFnb25ib25lcy9EcmFnb25Cb25lc0F0bGFzQXNzZXQuanMiXSwibmFtZXMiOlsiQXJtYXR1cmVDYWNoZSIsIkNDX0pTQiIsInJlcXVpcmUiLCJzaGFyZWRDYWNoZSIsIkRyYWdvbkJvbmVzQXRsYXNBc3NldCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQXNzZXQiLCJjdG9yIiwiX2NsZWFyIiwicHJvcGVydGllcyIsIl9hdGxhc0pzb24iLCJhdGxhc0pzb24iLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsIl9hdGxhc0pzb25EYXRhIiwiSlNPTiIsInBhcnNlIiwiX3RleHR1cmUiLCJ0eXBlIiwiVGV4dHVyZTJEIiwiZm9ybWVybHlTZXJpYWxpemVkQXMiLCJ0ZXh0dXJlIiwiX3RleHR1cmVBdGxhc0RhdGEiLCJzdGF0aWNzIiwicHJldmVudERlZmVycmVkTG9hZERlcGVuZGVudHMiLCJjcmVhdGVOb2RlIiwiQ0NfRURJVE9SIiwiY2FsbGJhY2siLCJub2RlIiwiTm9kZSIsImFybWF0dXJlRGlzcGxheSIsImFkZENvbXBvbmVudCIsImRyYWdvbkJvbmVzIiwiQXJtYXR1cmVEaXNwbGF5IiwiZHJhZ29uQXRsYXNBc3NldCIsImluaXQiLCJmYWN0b3J5IiwiX2ZhY3RvcnkiLCJhdGxhc0pzb25PYmoiLCJfdXVpZCIsImFkZFRleHR1cmVBdGxhc0RhdGEiLCJwYXJzZVRleHR1cmVBdGxhc0RhdGEiLCJyZXNldEFybWF0dXJlIiwicmVtb3ZlVGV4dHVyZUF0bGFzRGF0YSIsInJlbW92ZURyYWdvbkJvbmVzRGF0YUJ5VVVJRCIsImRlc3Ryb3kiLCJfc3VwZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBOzs7QUFHQSxJQUFJQSxhQUFhLEdBQUcsQ0FBQ0MsTUFBRCxJQUFXQyxPQUFPLENBQUMsaUJBQUQsQ0FBUCxDQUEyQkMsV0FB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RixRQUFMLENBQWNNLHNCQUFkLENBQXFDLEtBQUtKLEtBQTFDLEVBQWlELElBQWpEOztBQUNBLFdBQUtGLFFBQUwsQ0FBY08sMkJBQWQsQ0FBMEMsS0FBS0wsS0FBL0MsRUFBc0QsSUFBdEQ7QUFDSDs7QUFDRCxTQUFLakIsaUJBQUwsR0FBeUIsSUFBekI7QUFDSCxHQXRGZ0M7QUF3RmpDdUIsRUFBQUEsT0F4RmlDLHFCQXdGdEI7QUFDUCxTQUFLdEMsTUFBTDs7QUFDQSxTQUFLdUMsTUFBTDtBQUNIO0FBM0ZnQyxDQUFULENBQTVCO0FBOEZBZCxXQUFXLENBQUMvQixxQkFBWixHQUFvQzhDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQi9DLHFCQUFyRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqXG4gKiBAbW9kdWxlIGRyYWdvbkJvbmVzXG4gKi9cbmxldCBBcm1hdHVyZUNhY2hlID0gIUNDX0pTQiAmJiByZXF1aXJlKCcuL0FybWF0dXJlQ2FjaGUnKS5zaGFyZWRDYWNoZTtcblxuLyoqXG4gKiAhI2VuIFRoZSBza2VsZXRvbiBhdGxhcyBkYXRhIG9mIGRyYWdvbkJvbmVzLlxuICogISN6aCBkcmFnb25Cb25lcyDnmoTpqqjpqrznurnnkIbmlbDmja7jgIJcbiAqIEBjbGFzcyBEcmFnb25Cb25lc0F0bGFzQXNzZXRcbiAqIEBleHRlbmRzIEFzc2V0XG4gKi9cbnZhciBEcmFnb25Cb25lc0F0bGFzQXNzZXQgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2RyYWdvbkJvbmVzLkRyYWdvbkJvbmVzQXRsYXNBc3NldCcsXG4gICAgZXh0ZW5kczogY2MuQXNzZXQsXG5cbiAgICBjdG9yICgpIHtcbiAgICAgICAgdGhpcy5fY2xlYXIoKTtcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfYXRsYXNKc29uIDogJycsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBhdGxhc0pzb25cbiAgICAgICAgICovXG4gICAgICAgIGF0bGFzSnNvbjoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2F0bGFzSnNvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2F0bGFzSnNvbiA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2F0bGFzSnNvbkRhdGEgPSBKU09OLnBhcnNlKHRoaXMuYXRsYXNKc29uKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF90ZXh0dXJlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dHVyZTJELFxuICAgICAgICAgICAgZm9ybWVybHlTZXJpYWxpemVkQXM6ICd0ZXh0dXJlJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJvcGVydHkge1RleHR1cmUyRH0gdGV4dHVyZVxuICAgICAgICAgKi9cbiAgICAgICAgdGV4dHVyZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdGV4dHVyZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dHVyZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NsZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3RleHR1cmVBdGxhc0RhdGE6IG51bGwsXG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgcHJldmVudERlZmVycmVkTG9hZERlcGVuZGVudHM6IHRydWVcbiAgICB9LFxuXG4gICAgY3JlYXRlTm9kZTogQ0NfRURJVE9SICYmICBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZSh0aGlzLm5hbWUpO1xuICAgICAgICB2YXIgYXJtYXR1cmVEaXNwbGF5ID0gbm9kZS5hZGRDb21wb25lbnQoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KTtcbiAgICAgICAgYXJtYXR1cmVEaXNwbGF5LmRyYWdvbkF0bGFzQXNzZXQgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBub2RlKTtcbiAgICB9LFxuXG4gICAgaW5pdCAoZmFjdG9yeSkge1xuICAgICAgICB0aGlzLl9mYWN0b3J5ID0gZmFjdG9yeTtcblxuICAgICAgICBpZiAoIXRoaXMuX2F0bGFzSnNvbkRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuX2F0bGFzSnNvbkRhdGEgPSBKU09OLnBhcnNlKHRoaXMuYXRsYXNKc29uKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYXRsYXNKc29uT2JqID0gdGhpcy5fYXRsYXNKc29uRGF0YTtcblxuICAgICAgICAvLyBJZiBjcmVhdGUgYnkgbWFudWFsLCB1dWlkIGlzIGVtcHR5LlxuICAgICAgICB0aGlzLl91dWlkID0gdGhpcy5fdXVpZCB8fCBhdGxhc0pzb25PYmoubmFtZTtcblxuICAgICAgICBpZiAodGhpcy5fdGV4dHVyZUF0bGFzRGF0YSkge1xuICAgICAgICAgICAgZmFjdG9yeS5hZGRUZXh0dXJlQXRsYXNEYXRhKHRoaXMuX3RleHR1cmVBdGxhc0RhdGEsIHRoaXMuX3V1aWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZUF0bGFzRGF0YSA9IGZhY3RvcnkucGFyc2VUZXh0dXJlQXRsYXNEYXRhKGF0bGFzSnNvbk9iaiwgdGhpcy50ZXh0dXJlLCB0aGlzLl91dWlkKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfY2xlYXIgKCkge1xuICAgICAgICBpZiAoQ0NfSlNCKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLl9mYWN0b3J5KSB7XG4gICAgICAgICAgICBBcm1hdHVyZUNhY2hlLnJlc2V0QXJtYXR1cmUodGhpcy5fdXVpZCk7XG4gICAgICAgICAgICB0aGlzLl9mYWN0b3J5LnJlbW92ZVRleHR1cmVBdGxhc0RhdGEodGhpcy5fdXVpZCwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLl9mYWN0b3J5LnJlbW92ZURyYWdvbkJvbmVzRGF0YUJ5VVVJRCh0aGlzLl91dWlkLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90ZXh0dXJlQXRsYXNEYXRhID0gbnVsbDtcbiAgICB9LFxuXG4gICAgZGVzdHJveSAoKSB7XG4gICAgICAgIHRoaXMuX2NsZWFyKCk7XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgfSxcbn0pO1xuXG5kcmFnb25Cb25lcy5EcmFnb25Cb25lc0F0bGFzQXNzZXQgPSBtb2R1bGUuZXhwb3J0cyA9IERyYWdvbkJvbmVzQXRsYXNBc3NldDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9