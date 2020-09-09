
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/material/CCMaterial.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
var Asset = require('../CCAsset');

var Texture = require('../CCTexture2D');

var PixelFormat = Texture.PixelFormat;

var EffectAsset = require('./CCEffectAsset');

var textureUtil = require('../../utils/texture-util');

var gfx = cc.gfx;
/**
 * !#en Material builtin name
 * !#zh 内置材质名字
 * @enum Material.BUILTIN_NAME
 */

var BUILTIN_NAME = cc.Enum({
  /**
   * @property SPRITE
   * @readonly
   * @type {String}
   */
  SPRITE: '2d-sprite',

  /**
   * @property GRAY_SPRITE
   * @readonly
   * @type {String}
   */
  GRAY_SPRITE: '2d-gray-sprite',

  /**
   * @property UNLIT
   * @readonly
   * @type {String}
   */
  UNLIT: 'unlit'
});
/**
 * !#en Material Asset.
 * !#zh 材质资源类。
 * @class Material
 * @extends Asset
 */

var Material = cc.Class({
  name: 'cc.Material',
  "extends": Asset,
  ctor: function ctor() {
    this.loaded = false;
    this._manualHash = false;
    this._dirty = true;
    this._effect = null;
  },
  properties: {
    // deprecated
    _defines: {
      "default": undefined,
      type: Object
    },
    // deprecated
    _props: {
      "default": undefined,
      type: Object
    },
    _effectAsset: {
      type: EffectAsset,
      "default": null
    },
    _techniqueIndex: 0,
    _techniqueData: Object,
    effectName: CC_EDITOR ? {
      get: function get() {
        return this._effectAsset && this._effectAsset.name;
      },
      set: function set(val) {
        var effectAsset = cc.assetManager.builtins.getBuiltin('effect', val);

        if (!effectAsset) {
          Editor.warn("no effect named '" + val + "' found");
          return;
        }

        this.effectAsset = effectAsset;
      }
    } : undefined,
    effectAsset: {
      get: function get() {
        return this._effectAsset;
      },
      set: function set(asset) {
        if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
          return;
        }

        this._effectAsset = asset;

        if (!asset) {
          cc.error('Can not set an empty effect asset.');
          return;
        }

        this._effect = this._effectAsset.getInstantiatedEffect();
      }
    },
    effect: {
      get: function get() {
        return this._effect;
      }
    },
    techniqueIndex: {
      get: function get() {
        return this._techniqueIndex;
      },
      set: function set(v) {
        this._techniqueIndex = v;

        this._effect.switchTechnique(v);
      }
    }
  },
  statics: {
    /**
     * !#en Get built-in materials
     * !#zh 获取内置材质
     * @static
     * @method getBuiltinMaterial
     * @param {string} name 
     * @return {Material}
     */
    getBuiltinMaterial: function getBuiltinMaterial(name) {
      if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
        return new cc.Material();
      }

      return cc.assetManager.builtins.getBuiltin('material', 'builtin-' + name);
    },
    BUILTIN_NAME: BUILTIN_NAME,

    /**
     * !#en Creates a Material with builtin Effect.
     * !#zh 使用内建 Effect 创建一个材质。
     * @static
     * @method createWithBuiltin
     * @param {string} effectName 
     * @param {number} [techniqueIndex] 
     * @return {Material}
     */
    createWithBuiltin: function createWithBuiltin(effectName, techniqueIndex) {
      if (techniqueIndex === void 0) {
        techniqueIndex = 0;
      }

      var effectAsset = cc.assetManager.builtins.getBuiltin('effect', 'builtin-' + effectName);
      return Material.create(effectAsset, techniqueIndex);
    },

    /**
     * !#en Creates a Material.
     * !#zh 创建一个材质。
     * @static
     * @method create
     * @param {EffectAsset} effectAsset 
     * @param {number} [techniqueIndex] 
     * @return {Material}
     */
    create: function create(effectAsset, techniqueIndex) {
      if (techniqueIndex === void 0) {
        techniqueIndex = 0;
      }

      if (!effectAsset) return null;
      var material = new Material();
      material.effectAsset = effectAsset;
      material.techniqueIndex = techniqueIndex;
      return material;
    }
  },

  /**
   * !#en Sets the Material property
   * !#zh 设置材质的属性
   * @method setProperty
   * @param {string} name
   * @param {Object} val
   * @param {number} [passIdx]
   * @param {boolean} [directly]
   */
  setProperty: function setProperty(name, val, passIdx, directly) {
    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) return;

    if (typeof passIdx === 'string') {
      passIdx = parseInt(passIdx);
    }

    if (val instanceof Texture) {
      var isAlphaAtlas = val.isAlphaAtlas();
      var key = 'CC_USE_ALPHA_ATLAS_' + name;
      var def = this.getDefine(key, passIdx);

      if (isAlphaAtlas || def) {
        this.define(key, isAlphaAtlas);
      }

      if (!val.loaded) {
        var loaded = function loaded() {
          this._effect.setProperty(name, val, passIdx);
        };

        val.once('load', loaded, this);
        cc.assetManager.postLoadNative(val);
        return;
      }
    }

    this._effect.setProperty(name, val, passIdx, directly);
  },

  /**
   * !#en Gets the Material property.
   * !#zh 获取材质的属性。
   * @method getProperty
   * @param {string} name 
   * @param {number} passIdx 
   * @return {Object}
   */
  getProperty: function getProperty(name, passIdx) {
    if (typeof passIdx === 'string') {
      passIdx = parseInt(passIdx);
    }

    return this._effect.getProperty(name, passIdx);
  },

  /**
   * !#en Sets the Material define.
   * !#zh 设置材质的宏定义。
   * @method define
   * @param {string} name
   * @param {boolean|number} val
   * @param {number} [passIdx]
   * @param {boolean} [force]
   */
  define: function define(name, val, passIdx, force) {
    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) return;

    if (typeof passIdx === 'string') {
      passIdx = parseInt(passIdx);
    }

    this._effect.define(name, val, passIdx, force);
  },

  /**
   * !#en Gets the Material define.
   * !#zh 获取材质的宏定义。
   * @method getDefine
   * @param {string} name 
   * @param {number} [passIdx] 
   * @return {boolean|number}
   */
  getDefine: function getDefine(name, passIdx) {
    if (typeof passIdx === 'string') {
      passIdx = parseInt(passIdx);
    }

    return this._effect.getDefine(name, passIdx);
  },

  /**
   * !#en Sets the Material cull mode.
   * !#zh 设置材质的裁减模式。
   * @method setCullMode
   * @param {number} cullMode 
   * @param {number} passIdx 
   */
  setCullMode: function setCullMode(cullMode, passIdx) {
    if (cullMode === void 0) {
      cullMode = gfx.CULL_BACK;
    }

    this._effect.setCullMode(cullMode, passIdx);
  },

  /**
   * !#en Sets the Material depth states.
   * !#zh 设置材质的深度渲染状态。
   * @method setDepth
   * @param {boolean} depthTest 
   * @param {boolean} depthWrite 
   * @param {number} depthFunc 
   * @param {number} passIdx 
   */
  setDepth: function setDepth(depthTest, depthWrite, depthFunc, passIdx) {
    if (depthTest === void 0) {
      depthTest = false;
    }

    if (depthWrite === void 0) {
      depthWrite = false;
    }

    if (depthFunc === void 0) {
      depthFunc = gfx.DS_FUNC_LESS;
    }

    this._effect.setDepth(depthTest, depthWrite, depthFunc, passIdx);
  },

  /**
   * !#en Sets the Material blend states.
   * !#zh 设置材质的混合渲染状态。
   * @method setBlend
   * @param {boolean} enabled 
   * @param {number} blendEq 
   * @param {number} blendSrc 
   * @param {number} blendDst 
   * @param {number} blendAlphaEq 
   * @param {number} blendSrcAlpha 
   * @param {number} blendDstAlpha 
   * @param {number} blendColor 
   * @param {number} passIdx 
   */
  setBlend: function setBlend(enabled, blendEq, blendSrc, blendDst, blendAlphaEq, blendSrcAlpha, blendDstAlpha, blendColor, passIdx) {
    if (enabled === void 0) {
      enabled = false;
    }

    if (blendEq === void 0) {
      blendEq = gfx.BLEND_FUNC_ADD;
    }

    if (blendSrc === void 0) {
      blendSrc = gfx.BLEND_SRC_ALPHA;
    }

    if (blendDst === void 0) {
      blendDst = gfx.BLEND_ONE_MINUS_SRC_ALPHA;
    }

    if (blendAlphaEq === void 0) {
      blendAlphaEq = gfx.BLEND_FUNC_ADD;
    }

    if (blendSrcAlpha === void 0) {
      blendSrcAlpha = gfx.BLEND_SRC_ALPHA;
    }

    if (blendDstAlpha === void 0) {
      blendDstAlpha = gfx.BLEND_ONE_MINUS_SRC_ALPHA;
    }

    if (blendColor === void 0) {
      blendColor = 0xffffffff;
    }

    this._effect.setBlend(enabled, blendEq, blendSrc, blendDst, blendAlphaEq, blendSrcAlpha, blendDstAlpha, blendColor, passIdx);
  },

  /**
   * !#en Sets whether enable the stencil test.
   * !#zh 设置是否开启模板测试。
   * @method setStencilEnabled
   * @param {number} stencilTest 
   * @param {number} passIdx 
   */
  setStencilEnabled: function setStencilEnabled(stencilTest, passIdx) {
    if (stencilTest === void 0) {
      stencilTest = gfx.STENCIL_INHERIT;
    }

    this._effect.setStencilEnabled(stencilTest, passIdx);
  },

  /**
   * !#en Sets the Material stencil render states.
   * !#zh 设置材质的模板测试渲染参数。
   * @method setStencil
   * @param {number} stencilTest 
   * @param {number} stencilFunc 
   * @param {number} stencilRef 
   * @param {number} stencilMask 
   * @param {number} stencilFailOp 
   * @param {number} stencilZFailOp 
   * @param {number} stencilZPassOp 
   * @param {number} stencilWriteMask 
   * @param {number} passIdx 
   */
  setStencil: function setStencil(stencilTest, stencilFunc, stencilRef, stencilMask, stencilFailOp, stencilZFailOp, stencilZPassOp, stencilWriteMask, passIdx) {
    if (stencilTest === void 0) {
      stencilTest = gfx.STENCIL_INHERIT;
    }

    if (stencilFunc === void 0) {
      stencilFunc = gfx.DS_FUNC_ALWAYS;
    }

    if (stencilRef === void 0) {
      stencilRef = 0;
    }

    if (stencilMask === void 0) {
      stencilMask = 0xff;
    }

    if (stencilFailOp === void 0) {
      stencilFailOp = gfx.STENCIL_OP_KEEP;
    }

    if (stencilZFailOp === void 0) {
      stencilZFailOp = gfx.STENCIL_OP_KEEP;
    }

    if (stencilZPassOp === void 0) {
      stencilZPassOp = gfx.STENCIL_OP_KEEP;
    }

    if (stencilWriteMask === void 0) {
      stencilWriteMask = 0xff;
    }

    this._effect.setStencil(stencilTest, stencilFunc, stencilRef, stencilMask, stencilFailOp, stencilZFailOp, stencilZPassOp, stencilWriteMask, passIdx);
  },
  updateHash: function updateHash(hash) {
    this._manualHash = hash;
    this._effect && this._effect.updateHash(hash);
  },
  getHash: function getHash() {
    return this._manualHash || this._effect && this._effect.getHash();
  },
  onLoad: function onLoad() {
    this.effectAsset = this._effectAsset;
    if (!this._effect) return;

    if (this._techniqueIndex) {
      this._effect.switchTechnique(this._techniqueIndex);
    }

    this._techniqueData = this._techniqueData || {};
    var passDatas = this._techniqueData;

    for (var index in passDatas) {
      index = parseInt(index);
      var passData = passDatas[index];
      if (!passData) continue;

      for (var def in passData.defines) {
        this.define(def, passData.defines[def], index);
      }

      for (var prop in passData.props) {
        this.setProperty(prop, passData.props[prop], index);
      }
    }
  }
});
var _default = Material;
exports["default"] = _default;
cc.Material = Material;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9tYXRlcmlhbC9DQ01hdGVyaWFsLmpzIl0sIm5hbWVzIjpbIkFzc2V0IiwicmVxdWlyZSIsIlRleHR1cmUiLCJQaXhlbEZvcm1hdCIsIkVmZmVjdEFzc2V0IiwidGV4dHVyZVV0aWwiLCJnZngiLCJjYyIsIkJVSUxUSU5fTkFNRSIsIkVudW0iLCJTUFJJVEUiLCJHUkFZX1NQUklURSIsIlVOTElUIiwiTWF0ZXJpYWwiLCJDbGFzcyIsIm5hbWUiLCJjdG9yIiwibG9hZGVkIiwiX21hbnVhbEhhc2giLCJfZGlydHkiLCJfZWZmZWN0IiwicHJvcGVydGllcyIsIl9kZWZpbmVzIiwidW5kZWZpbmVkIiwidHlwZSIsIk9iamVjdCIsIl9wcm9wcyIsIl9lZmZlY3RBc3NldCIsIl90ZWNobmlxdWVJbmRleCIsIl90ZWNobmlxdWVEYXRhIiwiZWZmZWN0TmFtZSIsIkNDX0VESVRPUiIsImdldCIsInNldCIsInZhbCIsImVmZmVjdEFzc2V0IiwiYXNzZXRNYW5hZ2VyIiwiYnVpbHRpbnMiLCJnZXRCdWlsdGluIiwiRWRpdG9yIiwid2FybiIsImFzc2V0IiwiZ2FtZSIsInJlbmRlclR5cGUiLCJSRU5ERVJfVFlQRV9DQU5WQVMiLCJlcnJvciIsImdldEluc3RhbnRpYXRlZEVmZmVjdCIsImVmZmVjdCIsInRlY2huaXF1ZUluZGV4IiwidiIsInN3aXRjaFRlY2huaXF1ZSIsInN0YXRpY3MiLCJnZXRCdWlsdGluTWF0ZXJpYWwiLCJjcmVhdGVXaXRoQnVpbHRpbiIsImNyZWF0ZSIsIm1hdGVyaWFsIiwic2V0UHJvcGVydHkiLCJwYXNzSWR4IiwiZGlyZWN0bHkiLCJwYXJzZUludCIsImlzQWxwaGFBdGxhcyIsImtleSIsImRlZiIsImdldERlZmluZSIsImRlZmluZSIsIm9uY2UiLCJwb3N0TG9hZE5hdGl2ZSIsImdldFByb3BlcnR5IiwiZm9yY2UiLCJzZXRDdWxsTW9kZSIsImN1bGxNb2RlIiwiQ1VMTF9CQUNLIiwic2V0RGVwdGgiLCJkZXB0aFRlc3QiLCJkZXB0aFdyaXRlIiwiZGVwdGhGdW5jIiwiRFNfRlVOQ19MRVNTIiwic2V0QmxlbmQiLCJlbmFibGVkIiwiYmxlbmRFcSIsImJsZW5kU3JjIiwiYmxlbmREc3QiLCJibGVuZEFscGhhRXEiLCJibGVuZFNyY0FscGhhIiwiYmxlbmREc3RBbHBoYSIsImJsZW5kQ29sb3IiLCJCTEVORF9GVU5DX0FERCIsIkJMRU5EX1NSQ19BTFBIQSIsIkJMRU5EX09ORV9NSU5VU19TUkNfQUxQSEEiLCJzZXRTdGVuY2lsRW5hYmxlZCIsInN0ZW5jaWxUZXN0IiwiU1RFTkNJTF9JTkhFUklUIiwic2V0U3RlbmNpbCIsInN0ZW5jaWxGdW5jIiwic3RlbmNpbFJlZiIsInN0ZW5jaWxNYXNrIiwic3RlbmNpbEZhaWxPcCIsInN0ZW5jaWxaRmFpbE9wIiwic3RlbmNpbFpQYXNzT3AiLCJzdGVuY2lsV3JpdGVNYXNrIiwiRFNfRlVOQ19BTFdBWVMiLCJTVEVOQ0lMX09QX0tFRVAiLCJ1cGRhdGVIYXNoIiwiaGFzaCIsImdldEhhc2giLCJvbkxvYWQiLCJwYXNzRGF0YXMiLCJpbmRleCIsInBhc3NEYXRhIiwiZGVmaW5lcyIsInByb3AiLCJwcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUFyQjs7QUFDQSxJQUFNQyxPQUFPLEdBQUdELE9BQU8sQ0FBQyxnQkFBRCxDQUF2Qjs7QUFDQSxJQUFNRSxXQUFXLEdBQUdELE9BQU8sQ0FBQ0MsV0FBNUI7O0FBQ0EsSUFBTUMsV0FBVyxHQUFHSCxPQUFPLENBQUMsaUJBQUQsQ0FBM0I7O0FBQ0EsSUFBTUksV0FBVyxHQUFHSixPQUFPLENBQUMsMEJBQUQsQ0FBM0I7O0FBQ0EsSUFBTUssR0FBRyxHQUFHQyxFQUFFLENBQUNELEdBQWY7QUFFQTs7Ozs7O0FBS0EsSUFBTUUsWUFBWSxHQUFHRCxFQUFFLENBQUNF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cEJDLEVBQUFBLE1BL1RvQixvQkErVFY7QUFDTixTQUFLdEUsV0FBTCxHQUFtQixLQUFLUixZQUF4QjtBQUNBLFFBQUksQ0FBQyxLQUFLUCxPQUFWLEVBQW1COztBQUVuQixRQUFJLEtBQUtRLGVBQVQsRUFBMEI7QUFDdEIsV0FBS1IsT0FBTCxDQUFhOEIsZUFBYixDQUE2QixLQUFLdEIsZUFBbEM7QUFDSDs7QUFFRCxTQUFLQyxjQUFMLEdBQXNCLEtBQUtBLGNBQUwsSUFBdUIsRUFBN0M7QUFFQSxRQUFJNkUsU0FBUyxHQUFHLEtBQUs3RSxjQUFyQjs7QUFDQSxTQUFLLElBQUk4RSxLQUFULElBQWtCRCxTQUFsQixFQUE2QjtBQUN6QkMsTUFBQUEsS0FBSyxHQUFHaEQsUUFBUSxDQUFDZ0QsS0FBRCxDQUFoQjtBQUNBLFVBQUlDLFFBQVEsR0FBR0YsU0FBUyxDQUFDQyxLQUFELENBQXhCO0FBQ0EsVUFBSSxDQUFDQyxRQUFMLEVBQWU7O0FBRWYsV0FBSyxJQUFJOUMsR0FBVCxJQUFnQjhDLFFBQVEsQ0FBQ0MsT0FBekIsRUFBa0M7QUFDOUIsYUFBSzdDLE1BQUwsQ0FBWUYsR0FBWixFQUFpQjhDLFFBQVEsQ0FBQ0MsT0FBVCxDQUFpQi9DLEdBQWpCLENBQWpCLEVBQXdDNkMsS0FBeEM7QUFDSDs7QUFDRCxXQUFLLElBQUlHLElBQVQsSUFBaUJGLFFBQVEsQ0FBQ0csS0FBMUIsRUFBaUM7QUFDN0IsYUFBS3ZELFdBQUwsQ0FBaUJzRCxJQUFqQixFQUF1QkYsUUFBUSxDQUFDRyxLQUFULENBQWVELElBQWYsQ0FBdkIsRUFBNkNILEtBQTdDO0FBQ0g7QUFDSjtBQUVKO0FBdlZtQixDQUFULENBQWY7ZUEwVmU5Rjs7QUFDZk4sRUFBRSxDQUFDTSxRQUFILEdBQWNBLFFBQWQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cDovL3d3dy5jb2Nvcy5jb21cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IEFzc2V0ID0gcmVxdWlyZSgnLi4vQ0NBc3NldCcpO1xuY29uc3QgVGV4dHVyZSA9IHJlcXVpcmUoJy4uL0NDVGV4dHVyZTJEJyk7XG5jb25zdCBQaXhlbEZvcm1hdCA9IFRleHR1cmUuUGl4ZWxGb3JtYXQ7XG5jb25zdCBFZmZlY3RBc3NldCA9IHJlcXVpcmUoJy4vQ0NFZmZlY3RBc3NldCcpO1xuY29uc3QgdGV4dHVyZVV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlscy90ZXh0dXJlLXV0aWwnKTtcbmNvbnN0IGdmeCA9IGNjLmdmeDtcblxuLyoqXG4gKiAhI2VuIE1hdGVyaWFsIGJ1aWx0aW4gbmFtZVxuICogISN6aCDlhoXnva7mnZDotKjlkI3lrZdcbiAqIEBlbnVtIE1hdGVyaWFsLkJVSUxUSU5fTkFNRVxuICovXG5jb25zdCBCVUlMVElOX05BTUUgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgU1BSSVRFXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICBTUFJJVEU6ICcyZC1zcHJpdGUnLFxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBHUkFZX1NQUklURVxuICAgICAqIEByZWFkb25seVxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICovXG4gICAgR1JBWV9TUFJJVEU6ICcyZC1ncmF5LXNwcml0ZScsXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IFVOTElUXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICBVTkxJVDogJ3VubGl0Jyxcbn0pO1xuXG5cbi8qKlxuICogISNlbiBNYXRlcmlhbCBBc3NldC5cbiAqICEjemgg5p2Q6LSo6LWE5rqQ57G744CCXG4gKiBAY2xhc3MgTWF0ZXJpYWxcbiAqIEBleHRlbmRzIEFzc2V0XG4gKi9cbmxldCBNYXRlcmlhbCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuTWF0ZXJpYWwnLFxuICAgIGV4dGVuZHM6IEFzc2V0LFxuXG4gICAgY3RvciAoKSB7XG4gICAgICAgIHRoaXMubG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX21hbnVhbEhhc2ggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGlydHkgPSB0cnVlO1xuICAgICAgICB0aGlzLl9lZmZlY3QgPSBudWxsO1xuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGRlcHJlY2F0ZWRcbiAgICAgICAgX2RlZmluZXM6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdFxuICAgICAgICB9LFxuICAgICAgICAvLyBkZXByZWNhdGVkXG4gICAgICAgIF9wcm9wczoge1xuICAgICAgICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdHlwZTogT2JqZWN0XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2VmZmVjdEFzc2V0OiB7XG4gICAgICAgICAgICB0eXBlOiBFZmZlY3RBc3NldCxcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIH0sXG5cbiAgICAgICAgX3RlY2huaXF1ZUluZGV4OiAwLFxuICAgICAgICBfdGVjaG5pcXVlRGF0YTogT2JqZWN0LFxuXG4gICAgICAgIGVmZmVjdE5hbWU6IENDX0VESVRPUiA/IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VmZmVjdEFzc2V0ICYmIHRoaXMuX2VmZmVjdEFzc2V0Lm5hbWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWwpIHtcbiAgICAgICAgICAgICAgICBsZXQgZWZmZWN0QXNzZXQgPSBjYy5hc3NldE1hbmFnZXIuYnVpbHRpbnMuZ2V0QnVpbHRpbignZWZmZWN0JywgdmFsKTtcbiAgICAgICAgICAgICAgICBpZiAoIWVmZmVjdEFzc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIEVkaXRvci53YXJuKGBubyBlZmZlY3QgbmFtZWQgJyR7dmFsfScgZm91bmRgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdEFzc2V0ID0gZWZmZWN0QXNzZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gOiB1bmRlZmluZWQsXG5cbiAgICAgICAgZWZmZWN0QXNzZXQ6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VmZmVjdEFzc2V0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAoYXNzZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2MuZ2FtZS5yZW5kZXJUeXBlID09PSBjYy5nYW1lLlJFTkRFUl9UWVBFX0NBTlZBUykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fZWZmZWN0QXNzZXQgPSBhc3NldDtcbiAgICAgICAgICAgICAgICBpZiAoIWFzc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKCdDYW4gbm90IHNldCBhbiBlbXB0eSBlZmZlY3QgYXNzZXQuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9lZmZlY3QgPSB0aGlzLl9lZmZlY3RBc3NldC5nZXRJbnN0YW50aWF0ZWRFZmZlY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBlZmZlY3Q6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VmZmVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB0ZWNobmlxdWVJbmRleDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdGVjaG5pcXVlSW5kZXg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGVjaG5pcXVlSW5kZXggPSB2O1xuICAgICAgICAgICAgICAgIHRoaXMuX2VmZmVjdC5zd2l0Y2hUZWNobmlxdWUodik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBHZXQgYnVpbHQtaW4gbWF0ZXJpYWxzXG4gICAgICAgICAqICEjemgg6I635Y+W5YaF572u5p2Q6LSoXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQG1ldGhvZCBnZXRCdWlsdGluTWF0ZXJpYWxcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICAgICAqIEByZXR1cm4ge01hdGVyaWFsfVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0QnVpbHRpbk1hdGVyaWFsIChuYW1lKSB7XG4gICAgICAgICAgICBpZiAoY2MuZ2FtZS5yZW5kZXJUeXBlID09PSBjYy5nYW1lLlJFTkRFUl9UWVBFX0NBTlZBUykge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgY2MuTWF0ZXJpYWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjYy5hc3NldE1hbmFnZXIuYnVpbHRpbnMuZ2V0QnVpbHRpbignbWF0ZXJpYWwnLCAnYnVpbHRpbi0nICsgbmFtZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgQlVJTFRJTl9OQU1FLFxuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQ3JlYXRlcyBhIE1hdGVyaWFsIHdpdGggYnVpbHRpbiBFZmZlY3QuXG4gICAgICAgICAqICEjemgg5L2/55So5YaF5bu6IEVmZmVjdCDliJvlu7rkuIDkuKrmnZDotKjjgIJcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZVdpdGhCdWlsdGluXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlZmZlY3ROYW1lIFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gW3RlY2huaXF1ZUluZGV4XSBcbiAgICAgICAgICogQHJldHVybiB7TWF0ZXJpYWx9XG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVXaXRoQnVpbHRpbiAoZWZmZWN0TmFtZSwgdGVjaG5pcXVlSW5kZXggPSAwKSB7XG4gICAgICAgICAgICBsZXQgZWZmZWN0QXNzZXQgPSBjYy5hc3NldE1hbmFnZXIuYnVpbHRpbnMuZ2V0QnVpbHRpbignZWZmZWN0JywgJ2J1aWx0aW4tJyArIGVmZmVjdE5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGVyaWFsLmNyZWF0ZShlZmZlY3RBc3NldCwgdGVjaG5pcXVlSW5kZXgpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBDcmVhdGVzIGEgTWF0ZXJpYWwuXG4gICAgICAgICAqICEjemgg5Yib5bu65LiA5Liq5p2Q6LSo44CCXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVcbiAgICAgICAgICogQHBhcmFtIHtFZmZlY3RBc3NldH0gZWZmZWN0QXNzZXQgXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbdGVjaG5pcXVlSW5kZXhdIFxuICAgICAgICAgKiBAcmV0dXJuIHtNYXRlcmlhbH1cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZSAoZWZmZWN0QXNzZXQsIHRlY2huaXF1ZUluZGV4ID0gMCkge1xuICAgICAgICAgICAgaWYgKCFlZmZlY3RBc3NldCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBsZXQgbWF0ZXJpYWwgPSBuZXcgTWF0ZXJpYWwoKTtcbiAgICAgICAgICAgIG1hdGVyaWFsLmVmZmVjdEFzc2V0ID0gZWZmZWN0QXNzZXQ7XG4gICAgICAgICAgICBtYXRlcmlhbC50ZWNobmlxdWVJbmRleCA9IHRlY2huaXF1ZUluZGV4O1xuICAgICAgICAgICAgcmV0dXJuIG1hdGVyaWFsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0cyB0aGUgTWF0ZXJpYWwgcHJvcGVydHlcbiAgICAgKiAhI3poIOiuvue9ruadkOi0qOeahOWxnuaAp1xuICAgICAqIEBtZXRob2Qgc2V0UHJvcGVydHlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWxcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3Bhc3NJZHhdXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZGlyZWN0bHldXG4gICAgICovXG4gICAgc2V0UHJvcGVydHkgKG5hbWUsIHZhbCwgcGFzc0lkeCwgZGlyZWN0bHkpIHtcbiAgICAgICAgaWYgKGNjLmdhbWUucmVuZGVyVHlwZSA9PT0gY2MuZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mIHBhc3NJZHggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBwYXNzSWR4ID0gcGFyc2VJbnQocGFzc0lkeCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsIGluc3RhbmNlb2YgVGV4dHVyZSkge1xuICAgICAgICAgICAgbGV0IGlzQWxwaGFBdGxhcyA9IHZhbC5pc0FscGhhQXRsYXMoKTtcbiAgICAgICAgICAgIGxldCBrZXkgPSAnQ0NfVVNFX0FMUEhBX0FUTEFTXycgKyBuYW1lO1xuICAgICAgICAgICAgbGV0IGRlZiA9IHRoaXMuZ2V0RGVmaW5lKGtleSwgcGFzc0lkeCk7XG4gICAgICAgICAgICBpZiAoaXNBbHBoYUF0bGFzIHx8IGRlZikge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVmaW5lKGtleSwgaXNBbHBoYUF0bGFzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdmFsLmxvYWRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvYWRlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZmZlY3Quc2V0UHJvcGVydHkobmFtZSwgdmFsLCBwYXNzSWR4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFsLm9uY2UoJ2xvYWQnLCBsb2FkZWQsIHRoaXMpO1xuICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5wb3N0TG9hZE5hdGl2ZSh2YWwpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2VmZmVjdC5zZXRQcm9wZXJ0eShuYW1lLCB2YWwsIHBhc3NJZHgsIGRpcmVjdGx5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXRzIHRoZSBNYXRlcmlhbCBwcm9wZXJ0eS5cbiAgICAgKiAhI3poIOiOt+WPluadkOi0qOeahOWxnuaAp+OAglxuICAgICAqIEBtZXRob2QgZ2V0UHJvcGVydHlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGFzc0lkeCBcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0UHJvcGVydHkgKG5hbWUsIHBhc3NJZHgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXNzSWR4ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcGFzc0lkeCA9IHBhcnNlSW50KHBhc3NJZHgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9lZmZlY3QuZ2V0UHJvcGVydHkobmFtZSwgcGFzc0lkeCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0cyB0aGUgTWF0ZXJpYWwgZGVmaW5lLlxuICAgICAqICEjemgg6K6+572u5p2Q6LSo55qE5a6P5a6a5LmJ44CCXG4gICAgICogQG1ldGhvZCBkZWZpbmVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnxudW1iZXJ9IHZhbFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFzc0lkeF1cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtmb3JjZV1cbiAgICAgKi9cbiAgICBkZWZpbmUgKG5hbWUsIHZhbCwgcGFzc0lkeCwgZm9yY2UpIHtcbiAgICAgICAgaWYgKGNjLmdhbWUucmVuZGVyVHlwZSA9PT0gY2MuZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mIHBhc3NJZHggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBwYXNzSWR4ID0gcGFyc2VJbnQocGFzc0lkeCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZWZmZWN0LmRlZmluZShuYW1lLCB2YWwsIHBhc3NJZHgsIGZvcmNlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXRzIHRoZSBNYXRlcmlhbCBkZWZpbmUuXG4gICAgICogISN6aCDojrflj5bmnZDotKjnmoTlro/lrprkuYnjgIJcbiAgICAgKiBAbWV0aG9kIGdldERlZmluZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcGFzc0lkeF0gXG4gICAgICogQHJldHVybiB7Ym9vbGVhbnxudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0RGVmaW5lIChuYW1lLCBwYXNzSWR4KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcGFzc0lkeCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHBhc3NJZHggPSBwYXJzZUludChwYXNzSWR4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZWZmZWN0LmdldERlZmluZShuYW1lLCBwYXNzSWR4KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIHRoZSBNYXRlcmlhbCBjdWxsIG1vZGUuXG4gICAgICogISN6aCDorr7nva7mnZDotKjnmoToo4Hlh4/mqKHlvI/jgIJcbiAgICAgKiBAbWV0aG9kIHNldEN1bGxNb2RlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1bGxNb2RlIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwYXNzSWR4IFxuICAgICAqL1xuICAgIHNldEN1bGxNb2RlIChjdWxsTW9kZSA9IGdmeC5DVUxMX0JBQ0ssIHBhc3NJZHgpIHtcbiAgICAgICAgdGhpcy5fZWZmZWN0LnNldEN1bGxNb2RlKGN1bGxNb2RlLCBwYXNzSWR4KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIHRoZSBNYXRlcmlhbCBkZXB0aCBzdGF0ZXMuXG4gICAgICogISN6aCDorr7nva7mnZDotKjnmoTmt7HluqbmuLLmn5PnirbmgIHjgIJcbiAgICAgKiBAbWV0aG9kIHNldERlcHRoXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkZXB0aFRlc3QgXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkZXB0aFdyaXRlIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aEZ1bmMgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBhc3NJZHggXG4gICAgICovXG4gICAgc2V0RGVwdGggKFxuICAgICAgICBkZXB0aFRlc3QgPSBmYWxzZSxcbiAgICAgICAgZGVwdGhXcml0ZSA9IGZhbHNlLFxuICAgICAgICBkZXB0aEZ1bmMgPSBnZnguRFNfRlVOQ19MRVNTLFxuICAgICAgICBwYXNzSWR4XG4gICAgKSB7XG4gICAgICAgIHRoaXMuX2VmZmVjdC5zZXREZXB0aChkZXB0aFRlc3QsIGRlcHRoV3JpdGUsIGRlcHRoRnVuYywgcGFzc0lkeCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0cyB0aGUgTWF0ZXJpYWwgYmxlbmQgc3RhdGVzLlxuICAgICAqICEjemgg6K6+572u5p2Q6LSo55qE5re35ZCI5riy5p+T54q25oCB44CCXG4gICAgICogQG1ldGhvZCBzZXRCbGVuZFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlZCBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYmxlbmRFcSBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYmxlbmRTcmMgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJsZW5kRHN0IFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBibGVuZEFscGhhRXEgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJsZW5kU3JjQWxwaGEgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJsZW5kRHN0QWxwaGEgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJsZW5kQ29sb3IgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBhc3NJZHggXG4gICAgICovXG4gICAgc2V0QmxlbmQgKFxuICAgICAgICBlbmFibGVkID0gZmFsc2UsXG4gICAgICAgIGJsZW5kRXEgPSBnZnguQkxFTkRfRlVOQ19BREQsXG4gICAgICAgIGJsZW5kU3JjID0gZ2Z4LkJMRU5EX1NSQ19BTFBIQSxcbiAgICAgICAgYmxlbmREc3QgPSBnZnguQkxFTkRfT05FX01JTlVTX1NSQ19BTFBIQSxcbiAgICAgICAgYmxlbmRBbHBoYUVxID0gZ2Z4LkJMRU5EX0ZVTkNfQURELFxuICAgICAgICBibGVuZFNyY0FscGhhID0gZ2Z4LkJMRU5EX1NSQ19BTFBIQSxcbiAgICAgICAgYmxlbmREc3RBbHBoYSA9IGdmeC5CTEVORF9PTkVfTUlOVVNfU1JDX0FMUEhBLFxuICAgICAgICBibGVuZENvbG9yID0gMHhmZmZmZmZmZixcbiAgICAgICAgcGFzc0lkeFxuICAgICkge1xuICAgICAgICB0aGlzLl9lZmZlY3Quc2V0QmxlbmQoZW5hYmxlZCwgYmxlbmRFcSwgYmxlbmRTcmMsIGJsZW5kRHN0LCBibGVuZEFscGhhRXEsIGJsZW5kU3JjQWxwaGEsIGJsZW5kRHN0QWxwaGEsIGJsZW5kQ29sb3IsIHBhc3NJZHgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgd2hldGhlciBlbmFibGUgdGhlIHN0ZW5jaWwgdGVzdC5cbiAgICAgKiAhI3poIOiuvue9ruaYr+WQpuW8gOWQr+aooeadv+a1i+ivleOAglxuICAgICAqIEBtZXRob2Qgc2V0U3RlbmNpbEVuYWJsZWRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RlbmNpbFRlc3QgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBhc3NJZHggXG4gICAgICovXG4gICAgc2V0U3RlbmNpbEVuYWJsZWQgKHN0ZW5jaWxUZXN0ID0gZ2Z4LlNURU5DSUxfSU5IRVJJVCwgcGFzc0lkeCkge1xuICAgICAgICB0aGlzLl9lZmZlY3Quc2V0U3RlbmNpbEVuYWJsZWQoc3RlbmNpbFRlc3QsIHBhc3NJZHgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgdGhlIE1hdGVyaWFsIHN0ZW5jaWwgcmVuZGVyIHN0YXRlcy5cbiAgICAgKiAhI3poIOiuvue9ruadkOi0qOeahOaooeadv+a1i+ivlea4suafk+WPguaVsOOAglxuICAgICAqIEBtZXRob2Qgc2V0U3RlbmNpbFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGVuY2lsVGVzdCBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RlbmNpbEZ1bmMgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0ZW5jaWxSZWYgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0ZW5jaWxNYXNrIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGVuY2lsRmFpbE9wIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGVuY2lsWkZhaWxPcCBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RlbmNpbFpQYXNzT3AgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0ZW5jaWxXcml0ZU1hc2sgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBhc3NJZHggXG4gICAgICovXG4gICAgc2V0U3RlbmNpbCAoXG4gICAgICAgIHN0ZW5jaWxUZXN0ID0gZ2Z4LlNURU5DSUxfSU5IRVJJVCxcbiAgICAgICAgc3RlbmNpbEZ1bmMgPSBnZnguRFNfRlVOQ19BTFdBWVMsXG4gICAgICAgIHN0ZW5jaWxSZWYgPSAwLFxuICAgICAgICBzdGVuY2lsTWFzayA9IDB4ZmYsXG4gICAgICAgIHN0ZW5jaWxGYWlsT3AgPSBnZnguU1RFTkNJTF9PUF9LRUVQLFxuICAgICAgICBzdGVuY2lsWkZhaWxPcCA9IGdmeC5TVEVOQ0lMX09QX0tFRVAsXG4gICAgICAgIHN0ZW5jaWxaUGFzc09wID0gZ2Z4LlNURU5DSUxfT1BfS0VFUCxcbiAgICAgICAgc3RlbmNpbFdyaXRlTWFzayA9IDB4ZmYsXG4gICAgICAgIHBhc3NJZHhcbiAgICApIHtcbiAgICAgICAgdGhpcy5fZWZmZWN0LnNldFN0ZW5jaWwoc3RlbmNpbFRlc3QsIHN0ZW5jaWxGdW5jLCBzdGVuY2lsUmVmLCBzdGVuY2lsTWFzaywgc3RlbmNpbEZhaWxPcCwgc3RlbmNpbFpGYWlsT3AsIHN0ZW5jaWxaUGFzc09wLCBzdGVuY2lsV3JpdGVNYXNrLCBwYXNzSWR4KTtcbiAgICB9LFxuXG4gICAgdXBkYXRlSGFzaCAoaGFzaCkge1xuICAgICAgICB0aGlzLl9tYW51YWxIYXNoID0gaGFzaDtcbiAgICAgICAgdGhpcy5fZWZmZWN0ICYmIHRoaXMuX2VmZmVjdC51cGRhdGVIYXNoKGhhc2gpO1xuICAgIH0sXG5cbiAgICBnZXRIYXNoICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hbnVhbEhhc2ggfHwgKHRoaXMuX2VmZmVjdCAmJiB0aGlzLl9lZmZlY3QuZ2V0SGFzaCgpKTtcbiAgICB9LFxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5lZmZlY3RBc3NldCA9IHRoaXMuX2VmZmVjdEFzc2V0O1xuICAgICAgICBpZiAoIXRoaXMuX2VmZmVjdCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0aGlzLl90ZWNobmlxdWVJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5fZWZmZWN0LnN3aXRjaFRlY2huaXF1ZSh0aGlzLl90ZWNobmlxdWVJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl90ZWNobmlxdWVEYXRhID0gdGhpcy5fdGVjaG5pcXVlRGF0YSB8fCB7fTtcblxuICAgICAgICBsZXQgcGFzc0RhdGFzID0gdGhpcy5fdGVjaG5pcXVlRGF0YTtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggaW4gcGFzc0RhdGFzKSB7XG4gICAgICAgICAgICBpbmRleCA9IHBhcnNlSW50KGluZGV4KTtcbiAgICAgICAgICAgIGxldCBwYXNzRGF0YSA9IHBhc3NEYXRhc1tpbmRleF07XG4gICAgICAgICAgICBpZiAoIXBhc3NEYXRhKSBjb250aW51ZTtcblxuICAgICAgICAgICAgZm9yIChsZXQgZGVmIGluIHBhc3NEYXRhLmRlZmluZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmluZShkZWYsIHBhc3NEYXRhLmRlZmluZXNbZGVmXSwgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBwYXNzRGF0YS5wcm9wcykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJvcGVydHkocHJvcCwgcGFzc0RhdGEucHJvcHNbcHJvcF0sIGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBNYXRlcmlhbDtcbmNjLk1hdGVyaWFsID0gTWF0ZXJpYWw7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==