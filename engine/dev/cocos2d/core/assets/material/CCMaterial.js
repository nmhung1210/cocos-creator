
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
      var loaded = function loaded() {
        this._effect.setProperty(name, val, passIdx);
      };

      var isAlphaAtlas = val.isAlphaAtlas();
      var key = 'CC_USE_ALPHA_ATLAS_' + name;
      var def = this.getDefine(key, passIdx);

      if (isAlphaAtlas || def) {
        this.define(key, isAlphaAtlas);
      }

      if (!val.loaded) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9tYXRlcmlhbC9DQ01hdGVyaWFsLmpzIl0sIm5hbWVzIjpbIkFzc2V0IiwicmVxdWlyZSIsIlRleHR1cmUiLCJQaXhlbEZvcm1hdCIsIkVmZmVjdEFzc2V0IiwidGV4dHVyZVV0aWwiLCJnZngiLCJjYyIsIkJVSUxUSU5fTkFNRSIsIkVudW0iLCJTUFJJVEUiLCJHUkFZX1NQUklURSIsIlVOTElUIiwiTWF0ZXJpYWwiLCJDbGFzcyIsIm5hbWUiLCJjdG9yIiwibG9hZGVkIiwiX21hbnVhbEhhc2giLCJfZGlydHkiLCJfZWZmZWN0IiwicHJvcGVydGllcyIsIl9kZWZpbmVzIiwidW5kZWZpbmVkIiwidHlwZSIsIk9iamVjdCIsIl9wcm9wcyIsIl9lZmZlY3RBc3NldCIsIl90ZWNobmlxdWVJbmRleCIsIl90ZWNobmlxdWVEYXRhIiwiZWZmZWN0TmFtZSIsIkNDX0VESVRPUiIsImdldCIsInNldCIsInZhbCIsImVmZmVjdEFzc2V0IiwiYXNzZXRNYW5hZ2VyIiwiYnVpbHRpbnMiLCJnZXRCdWlsdGluIiwiRWRpdG9yIiwid2FybiIsImFzc2V0IiwiZ2FtZSIsInJlbmRlclR5cGUiLCJSRU5ERVJfVFlQRV9DQU5WQVMiLCJlcnJvciIsImdldEluc3RhbnRpYXRlZEVmZmVjdCIsImVmZmVjdCIsInRlY2huaXF1ZUluZGV4IiwidiIsInN3aXRjaFRlY2huaXF1ZSIsInN0YXRpY3MiLCJnZXRCdWlsdGluTWF0ZXJpYWwiLCJjcmVhdGVXaXRoQnVpbHRpbiIsImNyZWF0ZSIsIm1hdGVyaWFsIiwic2V0UHJvcGVydHkiLCJwYXNzSWR4IiwiZGlyZWN0bHkiLCJwYXJzZUludCIsImlzQWxwaGFBdGxhcyIsImtleSIsImRlZiIsImdldERlZmluZSIsImRlZmluZSIsIm9uY2UiLCJwb3N0TG9hZE5hdGl2ZSIsImdldFByb3BlcnR5IiwiZm9yY2UiLCJzZXRDdWxsTW9kZSIsImN1bGxNb2RlIiwiQ1VMTF9CQUNLIiwic2V0RGVwdGgiLCJkZXB0aFRlc3QiLCJkZXB0aFdyaXRlIiwiZGVwdGhGdW5jIiwiRFNfRlVOQ19MRVNTIiwic2V0QmxlbmQiLCJlbmFibGVkIiwiYmxlbmRFcSIsImJsZW5kU3JjIiwiYmxlbmREc3QiLCJibGVuZEFscGhhRXEiLCJibGVuZFNyY0FscGhhIiwiYmxlbmREc3RBbHBoYSIsImJsZW5kQ29sb3IiLCJCTEVORF9GVU5DX0FERCIsIkJMRU5EX1NSQ19BTFBIQSIsIkJMRU5EX09ORV9NSU5VU19TUkNfQUxQSEEiLCJzZXRTdGVuY2lsRW5hYmxlZCIsInN0ZW5jaWxUZXN0IiwiU1RFTkNJTF9JTkhFUklUIiwic2V0U3RlbmNpbCIsInN0ZW5jaWxGdW5jIiwic3RlbmNpbFJlZiIsInN0ZW5jaWxNYXNrIiwic3RlbmNpbEZhaWxPcCIsInN0ZW5jaWxaRmFpbE9wIiwic3RlbmNpbFpQYXNzT3AiLCJzdGVuY2lsV3JpdGVNYXNrIiwiRFNfRlVOQ19BTFdBWVMiLCJTVEVOQ0lMX09QX0tFRVAiLCJ1cGRhdGVIYXNoIiwiaGFzaCIsImdldEhhc2giLCJvbkxvYWQiLCJwYXNzRGF0YXMiLCJpbmRleCIsInBhc3NEYXRhIiwiZGVmaW5lcyIsInByb3AiLCJwcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUFyQjs7QUFDQSxJQUFNQyxPQUFPLEdBQUdELE9BQU8sQ0FBQyxnQkFBRCxDQUF2Qjs7QUFDQSxJQUFNRSxXQUFXLEdBQUdELE9BQU8sQ0FBQ0MsV0FBNUI7O0FBQ0EsSUFBTUMsV0FBVyxHQUFHSCxPQUFPLENBQUMsaUJBQUQsQ0FBM0I7O0FBQ0EsSUFBTUksV0FBVyxHQUFHSixPQUFPLENBQUMsMEJBQUQsQ0FBM0I7O0FBQ0EsSUFBTUssR0FBRyxHQUFHQyxFQUFFLENBQUNELEdBQWY7QUFFQTs7Ozs7O0FBS0EsSUFBTUUsWUFBWSxHQUFHRCxFQUFFLENBQUNF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VXBCQyxFQUFBQSxNQWhVb0Isb0JBZ1VWO0FBQ04sU0FBS3RFLFdBQUwsR0FBbUIsS0FBS1IsWUFBeEI7QUFDQSxRQUFJLENBQUMsS0FBS1AsT0FBVixFQUFtQjs7QUFFbkIsUUFBSSxLQUFLUSxlQUFULEVBQTBCO0FBQ3RCLFdBQUtSLE9BQUwsQ0FBYThCLGVBQWIsQ0FBNkIsS0FBS3RCLGVBQWxDO0FBQ0g7O0FBRUQsU0FBS0MsY0FBTCxHQUFzQixLQUFLQSxjQUFMLElBQXVCLEVBQTdDO0FBRUEsUUFBSTZFLFNBQVMsR0FBRyxLQUFLN0UsY0FBckI7O0FBQ0EsU0FBSyxJQUFJOEUsS0FBVCxJQUFrQkQsU0FBbEIsRUFBNkI7QUFDekJDLE1BQUFBLEtBQUssR0FBR2hELFFBQVEsQ0FBQ2dELEtBQUQsQ0FBaEI7QUFDQSxVQUFJQyxRQUFRLEdBQUdGLFNBQVMsQ0FBQ0MsS0FBRCxDQUF4QjtBQUNBLFVBQUksQ0FBQ0MsUUFBTCxFQUFlOztBQUVmLFdBQUssSUFBSTlDLEdBQVQsSUFBZ0I4QyxRQUFRLENBQUNDLE9BQXpCLEVBQWtDO0FBQzlCLGFBQUs3QyxNQUFMLENBQVlGLEdBQVosRUFBaUI4QyxRQUFRLENBQUNDLE9BQVQsQ0FBaUIvQyxHQUFqQixDQUFqQixFQUF3QzZDLEtBQXhDO0FBQ0g7O0FBQ0QsV0FBSyxJQUFJRyxJQUFULElBQWlCRixRQUFRLENBQUNHLEtBQTFCLEVBQWlDO0FBQzdCLGFBQUt2RCxXQUFMLENBQWlCc0QsSUFBakIsRUFBdUJGLFFBQVEsQ0FBQ0csS0FBVCxDQUFlRCxJQUFmLENBQXZCLEVBQTZDSCxLQUE3QztBQUNIO0FBQ0o7QUFFSjtBQXhWbUIsQ0FBVCxDQUFmO2VBMlZlOUY7O0FBQ2ZOLEVBQUUsQ0FBQ00sUUFBSCxHQUFjQSxRQUFkIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHA6Ly93d3cuY29jb3MuY29tXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBBc3NldCA9IHJlcXVpcmUoJy4uL0NDQXNzZXQnKTtcbmNvbnN0IFRleHR1cmUgPSByZXF1aXJlKCcuLi9DQ1RleHR1cmUyRCcpO1xuY29uc3QgUGl4ZWxGb3JtYXQgPSBUZXh0dXJlLlBpeGVsRm9ybWF0O1xuY29uc3QgRWZmZWN0QXNzZXQgPSByZXF1aXJlKCcuL0NDRWZmZWN0QXNzZXQnKTtcbmNvbnN0IHRleHR1cmVVdGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdGV4dHVyZS11dGlsJyk7XG5jb25zdCBnZnggPSBjYy5nZng7XG5cbi8qKlxuICogISNlbiBNYXRlcmlhbCBidWlsdGluIG5hbWVcbiAqICEjemgg5YaF572u5p2Q6LSo5ZCN5a2XXG4gKiBAZW51bSBNYXRlcmlhbC5CVUlMVElOX05BTUVcbiAqL1xuY29uc3QgQlVJTFRJTl9OQU1FID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IFNQUklURVxuICAgICAqIEByZWFkb25seVxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICovXG4gICAgU1BSSVRFOiAnMmQtc3ByaXRlJyxcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgR1JBWV9TUFJJVEVcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIEdSQVlfU1BSSVRFOiAnMmQtZ3JheS1zcHJpdGUnLFxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBVTkxJVFxuICAgICAqIEByZWFkb25seVxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICovXG4gICAgVU5MSVQ6ICd1bmxpdCcsXG59KTtcblxuXG4vKipcbiAqICEjZW4gTWF0ZXJpYWwgQXNzZXQuXG4gKiAhI3poIOadkOi0qOi1hOa6kOexu+OAglxuICogQGNsYXNzIE1hdGVyaWFsXG4gKiBAZXh0ZW5kcyBBc3NldFxuICovXG5sZXQgTWF0ZXJpYWwgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLk1hdGVyaWFsJyxcbiAgICBleHRlbmRzOiBBc3NldCxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9tYW51YWxIYXNoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZWZmZWN0ID0gbnVsbDtcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBkZXByZWNhdGVkXG4gICAgICAgIF9kZWZpbmVzOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0eXBlOiBPYmplY3RcbiAgICAgICAgfSxcbiAgICAgICAgLy8gZGVwcmVjYXRlZFxuICAgICAgICBfcHJvcHM6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdFxuICAgICAgICB9LFxuXG4gICAgICAgIF9lZmZlY3RBc3NldDoge1xuICAgICAgICAgICAgdHlwZTogRWZmZWN0QXNzZXQsXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICB9LFxuXG4gICAgICAgIF90ZWNobmlxdWVJbmRleDogMCxcbiAgICAgICAgX3RlY2huaXF1ZURhdGE6IE9iamVjdCxcblxuICAgICAgICBlZmZlY3ROYW1lOiBDQ19FRElUT1IgPyB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lZmZlY3RBc3NldCAmJiB0aGlzLl9lZmZlY3RBc3NldC5uYW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVmZmVjdEFzc2V0ID0gY2MuYXNzZXRNYW5hZ2VyLmJ1aWx0aW5zLmdldEJ1aWx0aW4oJ2VmZmVjdCcsIHZhbCk7XG4gICAgICAgICAgICAgICAgaWYgKCFlZmZlY3RBc3NldCkge1xuICAgICAgICAgICAgICAgICAgICBFZGl0b3Iud2Fybihgbm8gZWZmZWN0IG5hbWVkICcke3ZhbH0nIGZvdW5kYCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RBc3NldCA9IGVmZmVjdEFzc2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IDogdW5kZWZpbmVkLFxuXG4gICAgICAgIGVmZmVjdEFzc2V0OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lZmZlY3RBc3NldDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKGFzc2V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGNjLmdhbWUucmVuZGVyVHlwZSA9PT0gY2MuZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2VmZmVjdEFzc2V0ID0gYXNzZXQ7XG4gICAgICAgICAgICAgICAgaWYgKCFhc3NldCkge1xuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcignQ2FuIG5vdCBzZXQgYW4gZW1wdHkgZWZmZWN0IGFzc2V0LicpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fZWZmZWN0ID0gdGhpcy5fZWZmZWN0QXNzZXQuZ2V0SW5zdGFudGlhdGVkRWZmZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZWZmZWN0OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lZmZlY3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgdGVjaG5pcXVlSW5kZXg6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RlY2huaXF1ZUluZGV4O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RlY2huaXF1ZUluZGV4ID0gdjtcbiAgICAgICAgICAgICAgICB0aGlzLl9lZmZlY3Quc3dpdGNoVGVjaG5pcXVlKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gR2V0IGJ1aWx0LWluIG1hdGVyaWFsc1xuICAgICAgICAgKiAhI3poIOiOt+WPluWGhee9ruadkOi0qFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBtZXRob2QgZ2V0QnVpbHRpbk1hdGVyaWFsXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAgICAgKiBAcmV0dXJuIHtNYXRlcmlhbH1cbiAgICAgICAgICovXG4gICAgICAgIGdldEJ1aWx0aW5NYXRlcmlhbCAobmFtZSkge1xuICAgICAgICAgICAgaWYgKGNjLmdhbWUucmVuZGVyVHlwZSA9PT0gY2MuZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGNjLk1hdGVyaWFsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2MuYXNzZXRNYW5hZ2VyLmJ1aWx0aW5zLmdldEJ1aWx0aW4oJ21hdGVyaWFsJywgJ2J1aWx0aW4tJyArIG5hbWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIEJVSUxUSU5fTkFNRSxcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIENyZWF0ZXMgYSBNYXRlcmlhbCB3aXRoIGJ1aWx0aW4gRWZmZWN0LlxuICAgICAgICAgKiAhI3poIOS9v+eUqOWGheW7uiBFZmZlY3Qg5Yib5bu65LiA5Liq5p2Q6LSo44CCXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVXaXRoQnVpbHRpblxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gZWZmZWN0TmFtZSBcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFt0ZWNobmlxdWVJbmRleF0gXG4gICAgICAgICAqIEByZXR1cm4ge01hdGVyaWFsfVxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlV2l0aEJ1aWx0aW4gKGVmZmVjdE5hbWUsIHRlY2huaXF1ZUluZGV4ID0gMCkge1xuICAgICAgICAgICAgbGV0IGVmZmVjdEFzc2V0ID0gY2MuYXNzZXRNYW5hZ2VyLmJ1aWx0aW5zLmdldEJ1aWx0aW4oJ2VmZmVjdCcsICdidWlsdGluLScgKyBlZmZlY3ROYW1lKTtcbiAgICAgICAgICAgIHJldHVybiBNYXRlcmlhbC5jcmVhdGUoZWZmZWN0QXNzZXQsIHRlY2huaXF1ZUluZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQ3JlYXRlcyBhIE1hdGVyaWFsLlxuICAgICAgICAgKiAhI3poIOWIm+W7uuS4gOS4quadkOi0qOOAglxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICAgICAqIEBwYXJhbSB7RWZmZWN0QXNzZXR9IGVmZmVjdEFzc2V0IFxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gW3RlY2huaXF1ZUluZGV4XSBcbiAgICAgICAgICogQHJldHVybiB7TWF0ZXJpYWx9XG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGUgKGVmZmVjdEFzc2V0LCB0ZWNobmlxdWVJbmRleCA9IDApIHtcbiAgICAgICAgICAgIGlmICghZWZmZWN0QXNzZXQpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IG1hdGVyaWFsID0gbmV3IE1hdGVyaWFsKCk7XG4gICAgICAgICAgICBtYXRlcmlhbC5lZmZlY3RBc3NldCA9IGVmZmVjdEFzc2V0O1xuICAgICAgICAgICAgbWF0ZXJpYWwudGVjaG5pcXVlSW5kZXggPSB0ZWNobmlxdWVJbmRleDtcbiAgICAgICAgICAgIHJldHVybiBtYXRlcmlhbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgdGhlIE1hdGVyaWFsIHByb3BlcnR5XG4gICAgICogISN6aCDorr7nva7mnZDotKjnmoTlsZ7mgKdcbiAgICAgKiBAbWV0aG9kIHNldFByb3BlcnR5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXNzSWR4XVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RpcmVjdGx5XVxuICAgICAqL1xuICAgIHNldFByb3BlcnR5IChuYW1lLCB2YWwsIHBhc3NJZHgsIGRpcmVjdGx5KSB7XG4gICAgICAgIGlmIChjYy5nYW1lLnJlbmRlclR5cGUgPT09IGNjLmdhbWUuUkVOREVSX1RZUEVfQ0FOVkFTKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiBwYXNzSWR4ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcGFzc0lkeCA9IHBhcnNlSW50KHBhc3NJZHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIFRleHR1cmUpIHtcbiAgICAgICAgICAgIGxldCBpc0FscGhhQXRsYXMgPSB2YWwuaXNBbHBoYUF0bGFzKCk7XG4gICAgICAgICAgICBsZXQga2V5ID0gJ0NDX1VTRV9BTFBIQV9BVExBU18nICsgbmFtZTtcbiAgICAgICAgICAgIGxldCBkZWYgPSB0aGlzLmdldERlZmluZShrZXksIHBhc3NJZHgpO1xuICAgICAgICAgICAgaWYgKGlzQWxwaGFBdGxhcyB8fCBkZWYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmluZShrZXksIGlzQWxwaGFBdGxhcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBsb2FkZWQgKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VmZmVjdC5zZXRQcm9wZXJ0eShuYW1lLCB2YWwsIHBhc3NJZHgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXZhbC5sb2FkZWQpIHtcbiAgICAgICAgICAgICAgICB2YWwub25jZSgnbG9hZCcsIGxvYWRlZCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnBvc3RMb2FkTmF0aXZlKHZhbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZWZmZWN0LnNldFByb3BlcnR5KG5hbWUsIHZhbCwgcGFzc0lkeCwgZGlyZWN0bHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHMgdGhlIE1hdGVyaWFsIHByb3BlcnR5LlxuICAgICAqICEjemgg6I635Y+W5p2Q6LSo55qE5bGe5oCn44CCXG4gICAgICogQG1ldGhvZCBnZXRQcm9wZXJ0eVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwYXNzSWR4IFxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0eSAobmFtZSwgcGFzc0lkeCkge1xuICAgICAgICBpZiAodHlwZW9mIHBhc3NJZHggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBwYXNzSWR4ID0gcGFyc2VJbnQocGFzc0lkeCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2VmZmVjdC5nZXRQcm9wZXJ0eShuYW1lLCBwYXNzSWR4KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIHRoZSBNYXRlcmlhbCBkZWZpbmUuXG4gICAgICogISN6aCDorr7nva7mnZDotKjnmoTlro/lrprkuYnjgIJcbiAgICAgKiBAbWV0aG9kIGRlZmluZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtib29sZWFufG51bWJlcn0gdmFsXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXNzSWR4XVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZvcmNlXVxuICAgICAqL1xuICAgIGRlZmluZSAobmFtZSwgdmFsLCBwYXNzSWR4LCBmb3JjZSkge1xuICAgICAgICBpZiAoY2MuZ2FtZS5yZW5kZXJUeXBlID09PSBjYy5nYW1lLlJFTkRFUl9UWVBFX0NBTlZBUykgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcGFzc0lkeCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHBhc3NJZHggPSBwYXJzZUludChwYXNzSWR4KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9lZmZlY3QuZGVmaW5lKG5hbWUsIHZhbCwgcGFzc0lkeCwgZm9yY2UpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHMgdGhlIE1hdGVyaWFsIGRlZmluZS5cbiAgICAgKiAhI3poIOiOt+WPluadkOi0qOeahOWuj+WumuS5ieOAglxuICAgICAqIEBtZXRob2QgZ2V0RGVmaW5lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXNzSWR4XSBcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufG51bWJlcn1cbiAgICAgKi9cbiAgICBnZXREZWZpbmUgKG5hbWUsIHBhc3NJZHgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXNzSWR4ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcGFzc0lkeCA9IHBhcnNlSW50KHBhc3NJZHgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9lZmZlY3QuZ2V0RGVmaW5lKG5hbWUsIHBhc3NJZHgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgdGhlIE1hdGVyaWFsIGN1bGwgbW9kZS5cbiAgICAgKiAhI3poIOiuvue9ruadkOi0qOeahOijgeWHj+aooeW8j+OAglxuICAgICAqIEBtZXRob2Qgc2V0Q3VsbE1vZGVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3VsbE1vZGUgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBhc3NJZHggXG4gICAgICovXG4gICAgc2V0Q3VsbE1vZGUgKGN1bGxNb2RlID0gZ2Z4LkNVTExfQkFDSywgcGFzc0lkeCkge1xuICAgICAgICB0aGlzLl9lZmZlY3Quc2V0Q3VsbE1vZGUoY3VsbE1vZGUsIHBhc3NJZHgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgdGhlIE1hdGVyaWFsIGRlcHRoIHN0YXRlcy5cbiAgICAgKiAhI3poIOiuvue9ruadkOi0qOeahOa3seW6pua4suafk+eKtuaAgeOAglxuICAgICAqIEBtZXRob2Qgc2V0RGVwdGhcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRlcHRoVGVzdCBcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRlcHRoV3JpdGUgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoRnVuYyBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGFzc0lkeCBcbiAgICAgKi9cbiAgICBzZXREZXB0aCAoXG4gICAgICAgIGRlcHRoVGVzdCA9IGZhbHNlLFxuICAgICAgICBkZXB0aFdyaXRlID0gZmFsc2UsXG4gICAgICAgIGRlcHRoRnVuYyA9IGdmeC5EU19GVU5DX0xFU1MsXG4gICAgICAgIHBhc3NJZHhcbiAgICApIHtcbiAgICAgICAgdGhpcy5fZWZmZWN0LnNldERlcHRoKGRlcHRoVGVzdCwgZGVwdGhXcml0ZSwgZGVwdGhGdW5jLCBwYXNzSWR4KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIHRoZSBNYXRlcmlhbCBibGVuZCBzdGF0ZXMuXG4gICAgICogISN6aCDorr7nva7mnZDotKjnmoTmt7flkIjmuLLmn5PnirbmgIHjgIJcbiAgICAgKiBAbWV0aG9kIHNldEJsZW5kXG4gICAgICogQHBhcmFtIHtib29sZWFufSBlbmFibGVkIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBibGVuZEVxIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBibGVuZFNyYyBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYmxlbmREc3QgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJsZW5kQWxwaGFFcSBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYmxlbmRTcmNBbHBoYSBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYmxlbmREc3RBbHBoYSBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYmxlbmRDb2xvciBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGFzc0lkeCBcbiAgICAgKi9cbiAgICBzZXRCbGVuZCAoXG4gICAgICAgIGVuYWJsZWQgPSBmYWxzZSxcbiAgICAgICAgYmxlbmRFcSA9IGdmeC5CTEVORF9GVU5DX0FERCxcbiAgICAgICAgYmxlbmRTcmMgPSBnZnguQkxFTkRfU1JDX0FMUEhBLFxuICAgICAgICBibGVuZERzdCA9IGdmeC5CTEVORF9PTkVfTUlOVVNfU1JDX0FMUEhBLFxuICAgICAgICBibGVuZEFscGhhRXEgPSBnZnguQkxFTkRfRlVOQ19BREQsXG4gICAgICAgIGJsZW5kU3JjQWxwaGEgPSBnZnguQkxFTkRfU1JDX0FMUEhBLFxuICAgICAgICBibGVuZERzdEFscGhhID0gZ2Z4LkJMRU5EX09ORV9NSU5VU19TUkNfQUxQSEEsXG4gICAgICAgIGJsZW5kQ29sb3IgPSAweGZmZmZmZmZmLFxuICAgICAgICBwYXNzSWR4XG4gICAgKSB7XG4gICAgICAgIHRoaXMuX2VmZmVjdC5zZXRCbGVuZChlbmFibGVkLCBibGVuZEVxLCBibGVuZFNyYywgYmxlbmREc3QsIGJsZW5kQWxwaGFFcSwgYmxlbmRTcmNBbHBoYSwgYmxlbmREc3RBbHBoYSwgYmxlbmRDb2xvciwgcGFzc0lkeCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0cyB3aGV0aGVyIGVuYWJsZSB0aGUgc3RlbmNpbCB0ZXN0LlxuICAgICAqICEjemgg6K6+572u5piv5ZCm5byA5ZCv5qih5p2/5rWL6K+V44CCXG4gICAgICogQG1ldGhvZCBzZXRTdGVuY2lsRW5hYmxlZFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGVuY2lsVGVzdCBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGFzc0lkeCBcbiAgICAgKi9cbiAgICBzZXRTdGVuY2lsRW5hYmxlZCAoc3RlbmNpbFRlc3QgPSBnZnguU1RFTkNJTF9JTkhFUklULCBwYXNzSWR4KSB7XG4gICAgICAgIHRoaXMuX2VmZmVjdC5zZXRTdGVuY2lsRW5hYmxlZChzdGVuY2lsVGVzdCwgcGFzc0lkeCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0cyB0aGUgTWF0ZXJpYWwgc3RlbmNpbCByZW5kZXIgc3RhdGVzLlxuICAgICAqICEjemgg6K6+572u5p2Q6LSo55qE5qih5p2/5rWL6K+V5riy5p+T5Y+C5pWw44CCXG4gICAgICogQG1ldGhvZCBzZXRTdGVuY2lsXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0ZW5jaWxUZXN0IFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGVuY2lsRnVuYyBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RlbmNpbFJlZiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RlbmNpbE1hc2sgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0ZW5jaWxGYWlsT3AgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0ZW5jaWxaRmFpbE9wIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGVuY2lsWlBhc3NPcCBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RlbmNpbFdyaXRlTWFzayBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGFzc0lkeCBcbiAgICAgKi9cbiAgICBzZXRTdGVuY2lsIChcbiAgICAgICAgc3RlbmNpbFRlc3QgPSBnZnguU1RFTkNJTF9JTkhFUklULFxuICAgICAgICBzdGVuY2lsRnVuYyA9IGdmeC5EU19GVU5DX0FMV0FZUyxcbiAgICAgICAgc3RlbmNpbFJlZiA9IDAsXG4gICAgICAgIHN0ZW5jaWxNYXNrID0gMHhmZixcbiAgICAgICAgc3RlbmNpbEZhaWxPcCA9IGdmeC5TVEVOQ0lMX09QX0tFRVAsXG4gICAgICAgIHN0ZW5jaWxaRmFpbE9wID0gZ2Z4LlNURU5DSUxfT1BfS0VFUCxcbiAgICAgICAgc3RlbmNpbFpQYXNzT3AgPSBnZnguU1RFTkNJTF9PUF9LRUVQLFxuICAgICAgICBzdGVuY2lsV3JpdGVNYXNrID0gMHhmZixcbiAgICAgICAgcGFzc0lkeFxuICAgICkge1xuICAgICAgICB0aGlzLl9lZmZlY3Quc2V0U3RlbmNpbChzdGVuY2lsVGVzdCwgc3RlbmNpbEZ1bmMsIHN0ZW5jaWxSZWYsIHN0ZW5jaWxNYXNrLCBzdGVuY2lsRmFpbE9wLCBzdGVuY2lsWkZhaWxPcCwgc3RlbmNpbFpQYXNzT3AsIHN0ZW5jaWxXcml0ZU1hc2ssIHBhc3NJZHgpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVIYXNoIChoYXNoKSB7XG4gICAgICAgIHRoaXMuX21hbnVhbEhhc2ggPSBoYXNoO1xuICAgICAgICB0aGlzLl9lZmZlY3QgJiYgdGhpcy5fZWZmZWN0LnVwZGF0ZUhhc2goaGFzaCk7XG4gICAgfSxcblxuICAgIGdldEhhc2ggKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFudWFsSGFzaCB8fCAodGhpcy5fZWZmZWN0ICYmIHRoaXMuX2VmZmVjdC5nZXRIYXNoKCkpO1xuICAgIH0sXG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLmVmZmVjdEFzc2V0ID0gdGhpcy5fZWZmZWN0QXNzZXQ7XG4gICAgICAgIGlmICghdGhpcy5fZWZmZWN0KSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMuX3RlY2huaXF1ZUluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLl9lZmZlY3Quc3dpdGNoVGVjaG5pcXVlKHRoaXMuX3RlY2huaXF1ZUluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3RlY2huaXF1ZURhdGEgPSB0aGlzLl90ZWNobmlxdWVEYXRhIHx8IHt9O1xuXG4gICAgICAgIGxldCBwYXNzRGF0YXMgPSB0aGlzLl90ZWNobmlxdWVEYXRhO1xuICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBwYXNzRGF0YXMpIHtcbiAgICAgICAgICAgIGluZGV4ID0gcGFyc2VJbnQoaW5kZXgpO1xuICAgICAgICAgICAgbGV0IHBhc3NEYXRhID0gcGFzc0RhdGFzW2luZGV4XTtcbiAgICAgICAgICAgIGlmICghcGFzc0RhdGEpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBkZWYgaW4gcGFzc0RhdGEuZGVmaW5lcykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVmaW5lKGRlZiwgcGFzc0RhdGEuZGVmaW5lc1tkZWZdLCBpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIHBhc3NEYXRhLnByb3BzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0eShwcm9wLCBwYXNzRGF0YS5wcm9wc1twcm9wXSwgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IE1hdGVyaWFsO1xuY2MuTWF0ZXJpYWwgPSBNYXRlcmlhbDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9