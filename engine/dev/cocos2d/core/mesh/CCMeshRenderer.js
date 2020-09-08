
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/mesh/CCMeshRenderer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _gfx = _interopRequireDefault(require("../../renderer/gfx"));

var _inputAssembler = _interopRequireDefault(require("../../renderer/core/input-assembler"));

var _aabb = _interopRequireDefault(require("../geom-utils/aabb"));

var _vec = _interopRequireDefault(require("../value-types/vec3"));

var _mat = _interopRequireDefault(require("../value-types/mat4"));

var _materialVariant = _interopRequireDefault(require("../assets/material/material-variant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var RenderComponent = require('../components/CCRenderComponent');

var Mesh = require('./CCMesh');

var RenderFlow = require('../renderer/render-flow');

var Renderer = require('../renderer');

var Material = require('../assets/material/CCMaterial');
/**
 * !#en Shadow projection mode
 *
 * !#ch 阴影投射方式
 * @static
 * @enum MeshRenderer.ShadowCastingMode
 */


var ShadowCastingMode = cc.Enum({
  /**
   * !#en
   *
   * !#ch 关闭阴影投射
   * @property OFF
   * @readonly
   * @type {Number}
   */
  OFF: 0,

  /**
   * !#en
   *
   * !#ch 开启阴影投射，当阴影光产生的时候
   * @property ON
   * @readonly
   * @type {Number}
   */
  ON: 1 // /**
  //  * !#en
  //  *
  //  * !#ch 可以从网格的任意一遍投射出阴影
  //  * @property TWO_SIDED
  //  * @readonly
  //  * @type {Number}
  //  */
  // TWO_SIDED: 2,
  // /**
  //  * !#en
  //  *
  //  * !#ch 只显示阴影
  //  * @property SHADOWS_ONLY
  //  * @readonly
  //  * @type {Number}
  //  */
  // SHADOWS_ONLY: 3,

});
/**
 * !#en
 * Mesh Renderer Component
 * !#zh
 * 网格渲染组件
 * @class MeshRenderer
 * @extends RenderComponent
 */

var MeshRenderer = cc.Class({
  name: 'cc.MeshRenderer',
  "extends": RenderComponent,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.mesh/MeshRenderer'
  },
  properties: {
    _mesh: {
      "default": null,
      type: Mesh
    },
    _receiveShadows: false,
    _shadowCastingMode: ShadowCastingMode.OFF,
    _enableAutoBatch: false,

    /**
     * !#en
     * The mesh which the renderer uses.
     * !#zh
     * 设置使用的网格
     * @property {Mesh} mesh
     */
    mesh: {
      get: function get() {
        return this._mesh;
      },
      set: function set(v) {
        if (this._mesh === v) return;

        this._setMesh(v);

        if (!v) {
          this.disableRender();
          return;
        }

        this.markForRender(true);
        this.node._renderFlag |= RenderFlow.FLAG_TRANSFORM;
      },
      type: Mesh,
      animatable: false
    },
    textures: {
      "default": [],
      type: cc.Texture2D,
      visible: false
    },

    /**
     * !#en
     * Whether the mesh should receive shadows.
     * !#zh
     * 网格是否接受光源投射的阴影
     * @property {Boolean} receiveShadows
     */
    receiveShadows: {
      get: function get() {
        return this._receiveShadows;
      },
      set: function set(val) {
        this._receiveShadows = val;

        this._updateReceiveShadow();
      },
      animatable: false
    },

    /**
     * !#en
     * Shadow Casting Mode
     * !#zh
     * 网格投射阴影的模式
     * @property {ShadowCastingMode} shadowCastingMode
     */
    shadowCastingMode: {
      get: function get() {
        return this._shadowCastingMode;
      },
      set: function set(val) {
        this._shadowCastingMode = val;

        this._updateCastShadow();
      },
      type: ShadowCastingMode,
      animatable: false
    },

    /**
     * !#en
     * Enable auto merge mesh, only support when mesh's VertexFormat, PrimitiveType, materials are all the same
     * !#zh 
     * 开启自动合并 mesh 功能，只有在网格的 顶点格式，PrimitiveType, 使用的材质 都一致的情况下才会有效
     * @property {Boolean} enableAutoBatch
     */
    enableAutoBatch: {
      get: function get() {
        return this._enableAutoBatch;
      },
      set: function set(val) {
        this._enableAutoBatch = val;
      }
    }
  },
  statics: {
    ShadowCastingMode: ShadowCastingMode
  },
  ctor: function ctor() {
    this._boundingBox = cc.geomUtils && new _aabb["default"]();

    if (CC_DEBUG) {
      this._debugDatas = {
        wireFrame: [],
        normal: []
      };
    }
  },
  onEnable: function onEnable() {
    var _this = this;

    this._super();

    if (this._mesh && !this._mesh.loaded) {
      this.disableRender();

      this._mesh.once('load', function () {
        if (!_this.isValid) return;

        _this._setMesh(_this._mesh);

        _this.markForRender(true);
      });

      cc.assetManager.postLoadNative(this._mesh);
    } else {
      this._setMesh(this._mesh);
    }

    this._updateRenderNode();

    this._updateMaterial();
  },
  onDestroy: function onDestroy() {
    this._setMesh(null);

    cc.pool.assembler.put(this._assembler);
  },
  _updateRenderNode: function _updateRenderNode() {
    this._assembler.setRenderNode(this.node);
  },
  _setMesh: function _setMesh(mesh) {
    if (cc.geomUtils && mesh) {
      _aabb["default"].fromPoints(this._boundingBox, mesh._minPos, mesh._maxPos);
    }

    if (this._mesh) {
      this._mesh.off('init-format', this._updateMeshAttribute, this);
    }

    if (mesh) {
      mesh.on('init-format', this._updateMeshAttribute, this);
    }

    this._mesh = mesh;
    this._assembler && (this._assembler._worldDatas = {});

    this._updateMeshAttribute();
  },
  _getDefaultMaterial: function _getDefaultMaterial() {
    return Material.getBuiltinMaterial('unlit');
  },
  _validateRender: function _validateRender() {
    var mesh = this._mesh;

    if (mesh && mesh._subDatas.length > 0) {
      return;
    }

    this.disableRender();
  },
  _updateMaterial: function _updateMaterial() {
    // TODO: used to upgrade from 2.1, should be removed
    var textures = this.textures;

    if (textures && textures.length > 0) {
      var defaultMaterial = this._getDefaultMaterial();

      for (var i = 0; i < textures.length; i++) {
        var material = this._materials[i];
        if (material && material._uuid !== defaultMaterial._uuid) continue;

        if (!material) {
          material = _materialVariant["default"].create(defaultMaterial, this);
          this.setMaterial(i, material);
        }

        material.setProperty('diffuseTexture', textures[i]);
      }
    }

    this._updateReceiveShadow();

    this._updateCastShadow();

    this._updateMeshAttribute();
  },
  _updateReceiveShadow: function _updateReceiveShadow() {
    var materials = this.getMaterials();

    for (var i = 0; i < materials.length; i++) {
      materials[i].define('CC_USE_SHADOW_MAP', this._receiveShadows, undefined, true);
    }
  },
  _updateCastShadow: function _updateCastShadow() {
    var materials = this.getMaterials();

    for (var i = 0; i < materials.length; i++) {
      materials[i].define('CC_CASTING_SHADOW', this._shadowCastingMode === ShadowCastingMode.ON, undefined, true);
    }
  },
  _updateMeshAttribute: function _updateMeshAttribute() {
    var subDatas = this._mesh && this._mesh.subDatas;
    if (!subDatas) return;
    var materials = this.getMaterials();

    for (var i = 0; i < materials.length; i++) {
      if (!subDatas[i]) break;
      var vfm = subDatas[i].vfm;
      var material = materials[i];
      material.define('CC_USE_ATTRIBUTE_COLOR', !!vfm.element(_gfx["default"].ATTR_COLOR), undefined, true);
      material.define('CC_USE_ATTRIBUTE_UV0', !!vfm.element(_gfx["default"].ATTR_UV0), undefined, true);
      material.define('CC_USE_ATTRIBUTE_NORMAL', !!vfm.element(_gfx["default"].ATTR_NORMAL), undefined, true);
      material.define('CC_USE_ATTRIBUTE_TANGENT', !!vfm.element(_gfx["default"].ATTR_TANGENT), undefined, true);
    }

    if (CC_DEBUG) {
      for (var name in this._debugDatas) {
        this._debugDatas[name].length = 0;
      }
    }

    if (CC_JSB && CC_NATIVERENDERER) {
      this._assembler.updateMeshData(this);
    }
  },
  _checkBacth: function _checkBacth() {}
});

if (CC_DEBUG) {
  var BLACK_COLOR = cc.Color.BLACK;
  var RED_COLOR = cc.Color.RED;
  var v3_tmp = [cc.v3(), cc.v3()];
  var mat4_tmp = cc.mat4();
  var createDebugDataFns = {
    normal: function normal(comp, ia, subData, subIndex) {
      var oldVfm = subData.vfm;
      var normalEle = oldVfm.element(_gfx["default"].ATTR_NORMAL);
      var posEle = oldVfm.element(_gfx["default"].ATTR_POSITION);
      var jointEle = oldVfm.element(_gfx["default"].ATTR_JOINTS);
      var weightEle = oldVfm.element(_gfx["default"].ATTR_WEIGHTS);

      if (!normalEle || !posEle) {
        return;
      }

      var indices = [];
      var vbData = [];
      var lineLength = 100;

      _vec["default"].set(v3_tmp[0], 5, 0, 0);

      _mat["default"].invert(mat4_tmp, comp.node._worldMatrix);

      _vec["default"].transformMat4Normal(v3_tmp[0], v3_tmp[0], mat4_tmp);

      lineLength = v3_tmp[0].mag();
      var mesh = comp.mesh;

      var posData = mesh._getAttrMeshData(subIndex, _gfx["default"].ATTR_POSITION);

      var normalData = mesh._getAttrMeshData(subIndex, _gfx["default"].ATTR_NORMAL);

      var jointData = mesh._getAttrMeshData(subIndex, _gfx["default"].ATTR_JOINTS);

      var weightData = mesh._getAttrMeshData(subIndex, _gfx["default"].ATTR_WEIGHTS);

      var vertexCount = posData.length / posEle.num;

      for (var i = 0; i < vertexCount; i++) {
        var normalIndex = i * normalEle.num;
        var posIndex = i * posEle.num;

        _vec["default"].set(v3_tmp[0], normalData[normalIndex], normalData[normalIndex + 1], normalData[normalIndex + 2]);

        _vec["default"].set(v3_tmp[1], posData[posIndex], posData[posIndex + 1], posData[posIndex + 2]);

        _vec["default"].scaleAndAdd(v3_tmp[0], v3_tmp[1], v3_tmp[0], lineLength);

        for (var lineIndex = 0; lineIndex < 2; lineIndex++) {
          vbData.push(v3_tmp[lineIndex].x, v3_tmp[lineIndex].y, v3_tmp[lineIndex].z);

          if (jointEle) {
            var jointIndex = i * jointEle.num;

            for (var j = 0; j < jointEle.num; j++) {
              vbData.push(jointData[jointIndex + j]);
            }
          }

          if (weightEle) {
            var weightIndex = i * weightEle.num;

            for (var _j = 0; _j < weightEle.num; _j++) {
              vbData.push(weightData[weightIndex + _j]);
            }
          }
        }

        indices.push(i * 2, i * 2 + 1);
      }

      var formatOpts = [{
        name: _gfx["default"].ATTR_POSITION,
        type: _gfx["default"].ATTR_TYPE_FLOAT32,
        num: 3
      }];

      if (jointEle) {
        formatOpts.push({
          name: _gfx["default"].ATTR_JOINTS,
          type: _gfx["default"].ATTR_TYPE_FLOAT32,
          num: jointEle.num
        });
      }

      if (weightEle) {
        formatOpts.push({
          name: _gfx["default"].ATTR_WEIGHTS,
          type: _gfx["default"].ATTR_TYPE_FLOAT32,
          num: weightEle.num
        });
      }

      var gfxVFmt = new _gfx["default"].VertexFormat(formatOpts);
      var vb = new _gfx["default"].VertexBuffer(Renderer.device, gfxVFmt, _gfx["default"].USAGE_STATIC, new Float32Array(vbData));
      var ibData = new Uint16Array(indices);
      var ib = new _gfx["default"].IndexBuffer(Renderer.device, _gfx["default"].INDEX_FMT_UINT16, _gfx["default"].USAGE_STATIC, ibData, ibData.length);

      var m = _materialVariant["default"].createWithBuiltin('unlit');

      m.setProperty('diffuseColor', RED_COLOR);
      return {
        material: m,
        ia: new _inputAssembler["default"](vb, ib, _gfx["default"].PT_LINES)
      };
    },
    wireFrame: function wireFrame(comp, ia, subData) {
      var oldIbData = subData.getIData(Uint16Array);

      var m = _materialVariant["default"].createWithBuiltin('unlit');

      m.setProperty('diffuseColor', BLACK_COLOR);
      var indices = [];

      for (var i = 0; i < oldIbData.length; i += 3) {
        var a = oldIbData[i + 0];
        var b = oldIbData[i + 1];
        var c = oldIbData[i + 2];
        indices.push(a, b, b, c, c, a);
      }

      var ibData = new Uint16Array(indices);
      var ib = new _gfx["default"].IndexBuffer(Renderer.device, _gfx["default"].INDEX_FMT_UINT16, _gfx["default"].USAGE_STATIC, ibData, ibData.length);
      return {
        material: m,
        ia: new _inputAssembler["default"](ia._vertexBuffer, ib, _gfx["default"].PT_LINES)
      };
    }
  };
  var _proto = MeshRenderer.prototype;

  _proto._updateDebugDatas = function () {
    var debugDatas = this._debugDatas;
    var subMeshes = this._mesh.subMeshes;
    var subDatas = this._mesh._subDatas;

    for (var name in debugDatas) {
      var debugData = debugDatas[name];
      if (debugData.length === subMeshes.length) continue;
      if (!cc.macro['SHOW_MESH_' + name.toUpperCase()]) continue;
      debugData.length = subMeshes.length;

      for (var i = 0; i < subMeshes.length; i++) {
        debugData[i] = createDebugDataFns[name](this, subMeshes[i], subDatas[i], i);
      }
    }
  };
}

cc.MeshRenderer = module.exports = MeshRenderer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL21lc2gvQ0NNZXNoUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiUmVuZGVyQ29tcG9uZW50IiwicmVxdWlyZSIsIk1lc2giLCJSZW5kZXJGbG93IiwiUmVuZGVyZXIiLCJNYXRlcmlhbCIsIlNoYWRvd0Nhc3RpbmdNb2RlIiwiY2MiLCJFbnVtIiwiT0ZGIiwiT04iLCJNZXNoUmVuZGVyZXIiLCJDbGFzcyIsIm5hbWUiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwicHJvcGVydGllcyIsIl9tZXNoIiwidHlwZSIsIl9yZWNlaXZlU2hhZG93cyIsIl9zaGFkb3dDYXN0aW5nTW9kZSIsIl9lbmFibGVBdXRvQmF0Y2giLCJtZXNoIiwiZ2V0Iiwic2V0IiwidiIsIl9zZXRNZXNoIiwiZGlzYWJsZVJlbmRlciIsIm1hcmtGb3JSZW5kZXIiLCJub2RlIiwiX3JlbmRlckZsYWciLCJGTEFHX1RSQU5TRk9STSIsImFuaW1hdGFibGUiLCJ0ZXh0dXJlcyIsIlRleHR1cmUyRCIsInZpc2libGUiLCJyZWNlaXZlU2hhZG93cyIsInZhbCIsIl91cGRhdGVSZWNlaXZlU2hhZG93Iiwic2hhZG93Q2FzdGluZ01vZGUiLCJfdXBkYXRlQ2FzdFNoYWRvdyIsImVuYWJsZUF1dG9CYXRjaCIsInN0YXRpY3MiLCJjdG9yIiwiX2JvdW5kaW5nQm94IiwiZ2VvbVV0aWxzIiwiQWFiYiIsIkNDX0RFQlVHIiwiX2RlYnVnRGF0YXMiLCJ3aXJlRnJhbWUiLCJub3JtYWwiLCJvbkVuYWJsZSIsIl9zdXBlciIsImxvYWRlZCIsIm9uY2UiLCJpc1ZhbGlkIiwiYXNzZXRNYW5hZ2VyIiwicG9zdExvYWROYXRpdmUiLCJfdXBkYXRlUmVuZGVyTm9kZSIsIl91cGRhdGVNYXRlcmlhbCIsIm9uRGVzdHJveSIsInBvb2wiLCJhc3NlbWJsZXIiLCJwdXQiLCJfYXNzZW1ibGVyIiwic2V0UmVuZGVyTm9kZSIsImZyb21Qb2ludHMiLCJfbWluUG9zIiwiX21heFBvcyIsIm9mZiIsIl91cGRhdGVNZXNoQXR0cmlidXRlIiwib24iLCJfd29ybGREYXRhcyIsIl9nZXREZWZhdWx0TWF0ZXJpYWwiLCJnZXRCdWlsdGluTWF0ZXJpYWwiLCJfdmFsaWRhdGVSZW5kZXIiLCJfc3ViRGF0YXMiLCJsZW5ndGgiLCJkZWZhdWx0TWF0ZXJpYWwiLCJpIiwibWF0ZXJpYWwiLCJfbWF0ZXJpYWxzIiwiX3V1aWQiLCJNYXRlcmlhbFZhcmlhbnQiLCJjcmVhdGUiLCJzZXRNYXRlcmlhbCIsInNldFByb3BlcnR5IiwibWF0ZXJpYWxzIiwiZ2V0TWF0ZXJpYWxzIiwiZGVmaW5lIiwidW5kZWZpbmVkIiwic3ViRGF0YXMiLCJ2Zm0iLCJlbGVtZW50IiwiZ2Z4IiwiQVRUUl9DT0xPUiIsIkFUVFJfVVYwIiwiQVRUUl9OT1JNQUwiLCJBVFRSX1RBTkdFTlQiLCJDQ19KU0IiLCJDQ19OQVRJVkVSRU5ERVJFUiIsInVwZGF0ZU1lc2hEYXRhIiwiX2NoZWNrQmFjdGgiLCJCTEFDS19DT0xPUiIsIkNvbG9yIiwiQkxBQ0siLCJSRURfQ09MT1IiLCJSRUQiLCJ2M190bXAiLCJ2MyIsIm1hdDRfdG1wIiwibWF0NCIsImNyZWF0ZURlYnVnRGF0YUZucyIsImNvbXAiLCJpYSIsInN1YkRhdGEiLCJzdWJJbmRleCIsIm9sZFZmbSIsIm5vcm1hbEVsZSIsInBvc0VsZSIsIkFUVFJfUE9TSVRJT04iLCJqb2ludEVsZSIsIkFUVFJfSk9JTlRTIiwid2VpZ2h0RWxlIiwiQVRUUl9XRUlHSFRTIiwiaW5kaWNlcyIsInZiRGF0YSIsImxpbmVMZW5ndGgiLCJWZWMzIiwiTWF0NCIsImludmVydCIsIl93b3JsZE1hdHJpeCIsInRyYW5zZm9ybU1hdDROb3JtYWwiLCJtYWciLCJwb3NEYXRhIiwiX2dldEF0dHJNZXNoRGF0YSIsIm5vcm1hbERhdGEiLCJqb2ludERhdGEiLCJ3ZWlnaHREYXRhIiwidmVydGV4Q291bnQiLCJudW0iLCJub3JtYWxJbmRleCIsInBvc0luZGV4Iiwic2NhbGVBbmRBZGQiLCJsaW5lSW5kZXgiLCJwdXNoIiwieCIsInkiLCJ6Iiwiam9pbnRJbmRleCIsImoiLCJ3ZWlnaHRJbmRleCIsImZvcm1hdE9wdHMiLCJBVFRSX1RZUEVfRkxPQVQzMiIsImdmeFZGbXQiLCJWZXJ0ZXhGb3JtYXQiLCJ2YiIsIlZlcnRleEJ1ZmZlciIsImRldmljZSIsIlVTQUdFX1NUQVRJQyIsIkZsb2F0MzJBcnJheSIsImliRGF0YSIsIlVpbnQxNkFycmF5IiwiaWIiLCJJbmRleEJ1ZmZlciIsIklOREVYX0ZNVF9VSU5UMTYiLCJtIiwiY3JlYXRlV2l0aEJ1aWx0aW4iLCJJbnB1dEFzc2VtYmxlciIsIlBUX0xJTkVTIiwib2xkSWJEYXRhIiwiZ2V0SURhdGEiLCJhIiwiYiIsImMiLCJfdmVydGV4QnVmZmVyIiwiX3Byb3RvIiwicHJvdG90eXBlIiwiX3VwZGF0ZURlYnVnRGF0YXMiLCJkZWJ1Z0RhdGFzIiwic3ViTWVzaGVzIiwiZGVidWdEYXRhIiwibWFjcm8iLCJ0b1VwcGVyQ2FzZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUE5QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdDQSxJQUFNQSxlQUFlLEdBQUdDLE9BQU8sQ0FBQyxpQ0FBRCxDQUEvQjs7QUFDQSxJQUFNQyxJQUFJLEdBQUdELE9BQU8sQ0FBQyxVQUFELENBQXBCOztBQUNBLElBQU1FLFVBQVUsR0FBR0YsT0FBTyxDQUFDLHlCQUFELENBQTFCOztBQUNBLElBQU1HLFFBQVEsR0FBR0gsT0FBTyxDQUFDLGFBQUQsQ0FBeEI7O0FBQ0EsSUFBTUksUUFBUSxHQUFHSixPQUFPLENBQUMsK0JBQUQsQ0FBeEI7QUFHQTs7Ozs7Ozs7O0FBT0EsSUFBSUssaUJBQWlCLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQzVCOzs7Ozs7OztBQVFBQyxFQUFBQSxHQUFHLEVBQUUsQ0FUdUI7O0FBVTVCOzs7Ozs7OztBQVFBQyxFQUFBQSxF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ekIsRUFBK0J3SyxTQUFTLENBQUNyRyxDQUFELENBQXhDLEVBQTZDWSxRQUFRLENBQUNaLENBQUQsQ0FBckQsRUFBMERBLENBQTFELENBQWY7QUFDSDtBQUNKO0FBQ0osR0FkRDtBQWVIOztBQUVEekUsRUFBRSxDQUFDSSxZQUFILEdBQWtCOEssTUFBTSxDQUFDQyxPQUFQLEdBQWlCL0ssWUFBbkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cDovL3d3dy5jb2Nvcy5jb21cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBnZnggZnJvbSAnLi4vLi4vcmVuZGVyZXIvZ2Z4JztcbmltcG9ydCBJbnB1dEFzc2VtYmxlciBmcm9tICcuLi8uLi9yZW5kZXJlci9jb3JlL2lucHV0LWFzc2VtYmxlcic7XG5pbXBvcnQgQWFiYiBmcm9tICcuLi9nZW9tLXV0aWxzL2FhYmInO1xuaW1wb3J0IFZlYzMgZnJvbSAnLi4vdmFsdWUtdHlwZXMvdmVjMyc7XG5pbXBvcnQgTWF0NCBmcm9tICcuLi92YWx1ZS10eXBlcy9tYXQ0JztcbmltcG9ydCBNYXRlcmlhbFZhcmlhbnQgZnJvbSAnLi4vYXNzZXRzL21hdGVyaWFsL21hdGVyaWFsLXZhcmlhbnQnO1xuXG5jb25zdCBSZW5kZXJDb21wb25lbnQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL0NDUmVuZGVyQ29tcG9uZW50Jyk7XG5jb25zdCBNZXNoID0gcmVxdWlyZSgnLi9DQ01lc2gnKTtcbmNvbnN0IFJlbmRlckZsb3cgPSByZXF1aXJlKCcuLi9yZW5kZXJlci9yZW5kZXItZmxvdycpO1xuY29uc3QgUmVuZGVyZXIgPSByZXF1aXJlKCcuLi9yZW5kZXJlcicpO1xuY29uc3QgTWF0ZXJpYWwgPSByZXF1aXJlKCcuLi9hc3NldHMvbWF0ZXJpYWwvQ0NNYXRlcmlhbCcpO1xuXG5cbi8qKlxuICogISNlbiBTaGFkb3cgcHJvamVjdGlvbiBtb2RlXG4gKlxuICogISNjaCDpmLTlvbHmipXlsITmlrnlvI9cbiAqIEBzdGF0aWNcbiAqIEBlbnVtIE1lc2hSZW5kZXJlci5TaGFkb3dDYXN0aW5nTW9kZVxuICovXG5sZXQgU2hhZG93Q2FzdGluZ01vZGUgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICpcbiAgICAgKiAhI2NoIOWFs+mXremYtOW9seaKleWwhFxuICAgICAqIEBwcm9wZXJ0eSBPRkZcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIE9GRjogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICpcbiAgICAgKiAhI2NoIOW8gOWQr+mYtOW9seaKleWwhO+8jOW9k+mYtOW9seWFieS6p+eUn+eahOaXtuWAmVxuICAgICAqIEBwcm9wZXJ0eSBPTlxuICAgICAqIEByZWFkb25seVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgT046IDEsXG4gICAgLy8gLyoqXG4gICAgLy8gICogISNlblxuICAgIC8vICAqXG4gICAgLy8gICogISNjaCDlj6/ku6Xku47nvZHmoLznmoTku7vmhI/kuIDpgY3mipXlsITlh7rpmLTlvbFcbiAgICAvLyAgKiBAcHJvcGVydHkgVFdPX1NJREVEXG4gICAgLy8gICogQHJlYWRvbmx5XG4gICAgLy8gICogQHR5cGUge051bWJlcn1cbiAgICAvLyAgKi9cbiAgICAvLyBUV09fU0lERUQ6IDIsXG4gICAgLy8gLyoqXG4gICAgLy8gICogISNlblxuICAgIC8vICAqXG4gICAgLy8gICogISNjaCDlj6rmmL7npLrpmLTlvbFcbiAgICAvLyAgKiBAcHJvcGVydHkgU0hBRE9XU19PTkxZXG4gICAgLy8gICogQHJlYWRvbmx5XG4gICAgLy8gICogQHR5cGUge051bWJlcn1cbiAgICAvLyAgKi9cbiAgICAvLyBTSEFET1dTX09OTFk6IDMsXG59KTtcblxuLyoqXG4gKiAhI2VuXG4gKiBNZXNoIFJlbmRlcmVyIENvbXBvbmVudFxuICogISN6aFxuICog572R5qC85riy5p+T57uE5Lu2XG4gKiBAY2xhc3MgTWVzaFJlbmRlcmVyXG4gKiBAZXh0ZW5kcyBSZW5kZXJDb21wb25lbnRcbiAqL1xubGV0IE1lc2hSZW5kZXJlciA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuTWVzaFJlbmRlcmVyJyxcbiAgICBleHRlbmRzOiBSZW5kZXJDb21wb25lbnQsXG4gICAgXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50Lm1lc2gvTWVzaFJlbmRlcmVyJyxcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfbWVzaDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IE1lc2hcbiAgICAgICAgfSxcblxuICAgICAgICBfcmVjZWl2ZVNoYWRvd3M6IGZhbHNlLFxuICAgICAgICBfc2hhZG93Q2FzdGluZ01vZGU6IFNoYWRvd0Nhc3RpbmdNb2RlLk9GRixcblxuICAgICAgICBfZW5hYmxlQXV0b0JhdGNoOiBmYWxzZSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgbWVzaCB3aGljaCB0aGUgcmVuZGVyZXIgdXNlcy5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDorr7nva7kvb/nlKjnmoTnvZHmoLxcbiAgICAgICAgICogQHByb3BlcnR5IHtNZXNofSBtZXNoXG4gICAgICAgICAqL1xuICAgICAgICBtZXNoOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tZXNoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tZXNoID09PSB2KSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0TWVzaCh2KTtcbiAgICAgICAgICAgICAgICBpZiAoIXYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlUmVuZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrRm9yUmVuZGVyKHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfVFJBTlNGT1JNO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IE1lc2gsXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIHRleHR1cmVzOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IGNjLlRleHR1cmUyRCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogV2hldGhlciB0aGUgbWVzaCBzaG91bGQgcmVjZWl2ZSBzaGFkb3dzLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOe9keagvOaYr+WQpuaOpeWPl+WFiea6kOaKleWwhOeahOmYtOW9sVxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IHJlY2VpdmVTaGFkb3dzXG4gICAgICAgICAqL1xuICAgICAgICByZWNlaXZlU2hhZG93czoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjZWl2ZVNoYWRvd3M7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNlaXZlU2hhZG93cyA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSZWNlaXZlU2hhZG93KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBTaGFkb3cgQ2FzdGluZyBNb2RlXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog572R5qC85oqV5bCE6Zi05b2x55qE5qih5byPXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U2hhZG93Q2FzdGluZ01vZGV9IHNoYWRvd0Nhc3RpbmdNb2RlXG4gICAgICAgICAqL1xuICAgICAgICBzaGFkb3dDYXN0aW5nTW9kZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2hhZG93Q2FzdGluZ01vZGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaGFkb3dDYXN0aW5nTW9kZSA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVDYXN0U2hhZG93KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogU2hhZG93Q2FzdGluZ01vZGUsXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIEVuYWJsZSBhdXRvIG1lcmdlIG1lc2gsIG9ubHkgc3VwcG9ydCB3aGVuIG1lc2gncyBWZXJ0ZXhGb3JtYXQsIFByaW1pdGl2ZVR5cGUsIG1hdGVyaWFscyBhcmUgYWxsIHRoZSBzYW1lXG4gICAgICAgICAqICEjemggXG4gICAgICAgICAqIOW8gOWQr+iHquWKqOWQiOW5tiBtZXNoIOWKn+iDve+8jOWPquacieWcqOe9keagvOeahCDpobbngrnmoLzlvI/vvIxQcmltaXRpdmVUeXBlLCDkvb/nlKjnmoTmnZDotKgg6YO95LiA6Ie055qE5oOF5Ya15LiL5omN5Lya5pyJ5pWIXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlQXV0b0JhdGNoXG4gICAgICAgICAqL1xuICAgICAgICBlbmFibGVBdXRvQmF0Y2g6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZUF1dG9CYXRjaDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VuYWJsZUF1dG9CYXRjaCA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICBTaGFkb3dDYXN0aW5nTW9kZTogU2hhZG93Q2FzdGluZ01vZGVcbiAgICB9LFxuXG4gICAgY3RvciAoKSB7XG4gICAgICAgIHRoaXMuX2JvdW5kaW5nQm94ID0gY2MuZ2VvbVV0aWxzICYmIG5ldyBBYWJiKCk7XG5cbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1Z0RhdGFzID0ge1xuICAgICAgICAgICAgICAgIHdpcmVGcmFtZTogW10sXG4gICAgICAgICAgICAgICAgbm9ybWFsOiBbXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkVuYWJsZSAoKSB7XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICAgIGlmICh0aGlzLl9tZXNoICYmICF0aGlzLl9tZXNoLmxvYWRlZCkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlUmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9tZXNoLm9uY2UoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRNZXNoKHRoaXMuX21lc2gpO1xuICAgICAgICAgICAgICAgIHRoaXMubWFya0ZvclJlbmRlcih0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnBvc3RMb2FkTmF0aXZlKHRoaXMuX21lc2gpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2V0TWVzaCh0aGlzLl9tZXNoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlbmRlck5vZGUoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlTWF0ZXJpYWwoKTtcbiAgICB9LFxuXG4gICAgb25EZXN0cm95ICgpIHtcbiAgICAgICAgdGhpcy5fc2V0TWVzaChudWxsKTtcbiAgICAgICAgY2MucG9vbC5hc3NlbWJsZXIucHV0KHRoaXMuX2Fzc2VtYmxlcik7XG4gICAgfSxcblxuICAgIF91cGRhdGVSZW5kZXJOb2RlICgpIHtcbiAgICAgICAgdGhpcy5fYXNzZW1ibGVyLnNldFJlbmRlck5vZGUodGhpcy5ub2RlKTtcbiAgICB9LFxuXG4gICAgX3NldE1lc2ggKG1lc2gpIHtcbiAgICAgICAgaWYgKGNjLmdlb21VdGlscyAmJiBtZXNoKSB7XG4gICAgICAgICAgICBBYWJiLmZyb21Qb2ludHModGhpcy5fYm91bmRpbmdCb3gsIG1lc2guX21pblBvcywgbWVzaC5fbWF4UG9zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9tZXNoKSB7XG4gICAgICAgICAgICB0aGlzLl9tZXNoLm9mZignaW5pdC1mb3JtYXQnLCB0aGlzLl91cGRhdGVNZXNoQXR0cmlidXRlLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzaCkge1xuICAgICAgICAgICAgbWVzaC5vbignaW5pdC1mb3JtYXQnLCB0aGlzLl91cGRhdGVNZXNoQXR0cmlidXRlLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tZXNoID0gbWVzaDtcbiAgICAgICAgdGhpcy5fYXNzZW1ibGVyICYmICh0aGlzLl9hc3NlbWJsZXIuX3dvcmxkRGF0YXMgPSB7fSk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU1lc2hBdHRyaWJ1dGUoKTtcbiAgICB9LFxuXG4gICAgX2dldERlZmF1bHRNYXRlcmlhbCAoKSB7XG4gICAgICAgIHJldHVybiBNYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJ3VubGl0Jyk7XG4gICAgfSxcblxuICAgIF92YWxpZGF0ZVJlbmRlciAoKSB7XG4gICAgICAgIGxldCBtZXNoID0gdGhpcy5fbWVzaDtcbiAgICAgICAgaWYgKG1lc2ggJiYgbWVzaC5fc3ViRGF0YXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNhYmxlUmVuZGVyKCk7XG4gICAgfSxcblxuICAgIF91cGRhdGVNYXRlcmlhbCAoKSB7XG4gICAgICAgIC8vIFRPRE86IHVzZWQgdG8gdXBncmFkZSBmcm9tIDIuMSwgc2hvdWxkIGJlIHJlbW92ZWRcbiAgICAgICAgbGV0IHRleHR1cmVzID0gdGhpcy50ZXh0dXJlcztcbiAgICAgICAgaWYgKHRleHR1cmVzICYmIHRleHR1cmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBkZWZhdWx0TWF0ZXJpYWwgPSB0aGlzLl9nZXREZWZhdWx0TWF0ZXJpYWwoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLl9tYXRlcmlhbHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKG1hdGVyaWFsICYmIG1hdGVyaWFsLl91dWlkICE9PSBkZWZhdWx0TWF0ZXJpYWwuX3V1aWQpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGlmICghbWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwgPSBNYXRlcmlhbFZhcmlhbnQuY3JlYXRlKGRlZmF1bHRNYXRlcmlhbCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TWF0ZXJpYWwoaSwgbWF0ZXJpYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5zZXRQcm9wZXJ0eSgnZGlmZnVzZVRleHR1cmUnLCB0ZXh0dXJlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91cGRhdGVSZWNlaXZlU2hhZG93KCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNhc3RTaGFkb3coKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlTWVzaEF0dHJpYnV0ZSgpO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlUmVjZWl2ZVNoYWRvdyAoKSB7XG4gICAgICAgIGxldCBtYXRlcmlhbHMgPSB0aGlzLmdldE1hdGVyaWFscygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGVyaWFscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbWF0ZXJpYWxzW2ldLmRlZmluZSgnQ0NfVVNFX1NIQURPV19NQVAnLCB0aGlzLl9yZWNlaXZlU2hhZG93cywgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdXBkYXRlQ2FzdFNoYWRvdyAoKSB7XG4gICAgICAgIGxldCBtYXRlcmlhbHMgPSB0aGlzLmdldE1hdGVyaWFscygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGVyaWFscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbWF0ZXJpYWxzW2ldLmRlZmluZSgnQ0NfQ0FTVElOR19TSEFET1cnLCB0aGlzLl9zaGFkb3dDYXN0aW5nTW9kZSA9PT0gU2hhZG93Q2FzdGluZ01vZGUuT04sIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3VwZGF0ZU1lc2hBdHRyaWJ1dGUgKCkge1xuICAgICAgICBsZXQgc3ViRGF0YXMgPSB0aGlzLl9tZXNoICYmIHRoaXMuX21lc2guc3ViRGF0YXM7XG4gICAgICAgIGlmICghc3ViRGF0YXMpIHJldHVybjtcblxuICAgICAgICBsZXQgbWF0ZXJpYWxzID0gdGhpcy5nZXRNYXRlcmlhbHMoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRlcmlhbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghc3ViRGF0YXNbaV0pIGJyZWFrO1xuICAgICAgICAgICAgbGV0IHZmbSA9IHN1YkRhdGFzW2ldLnZmbTtcbiAgICAgICAgICAgIGxldCBtYXRlcmlhbCA9IG1hdGVyaWFsc1tpXTtcbiAgICAgICAgICAgIG1hdGVyaWFsLmRlZmluZSgnQ0NfVVNFX0FUVFJJQlVURV9DT0xPUicsICEhdmZtLmVsZW1lbnQoZ2Z4LkFUVFJfQ09MT1IpLCB1bmRlZmluZWQsIHRydWUpO1xuICAgICAgICAgICAgbWF0ZXJpYWwuZGVmaW5lKCdDQ19VU0VfQVRUUklCVVRFX1VWMCcsICEhdmZtLmVsZW1lbnQoZ2Z4LkFUVFJfVVYwKSwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICAgICAgICAgIG1hdGVyaWFsLmRlZmluZSgnQ0NfVVNFX0FUVFJJQlVURV9OT1JNQUwnLCAhIXZmbS5lbGVtZW50KGdmeC5BVFRSX05PUk1BTCksIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICAgICAgICBtYXRlcmlhbC5kZWZpbmUoJ0NDX1VTRV9BVFRSSUJVVEVfVEFOR0VOVCcsICEhdmZtLmVsZW1lbnQoZ2Z4LkFUVFJfVEFOR0VOVCksIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQ0NfREVCVUcpIHtcbiAgICAgICAgICAgIGZvciAobGV0IG5hbWUgaW4gdGhpcy5fZGVidWdEYXRhcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnRGF0YXNbbmFtZV0ubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICAgICAgICAgIHRoaXMuX2Fzc2VtYmxlci51cGRhdGVNZXNoRGF0YSh0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfY2hlY2tCYWN0aCAoKSB7XG4gICAgfSxcbn0pO1xuXG5pZiAoQ0NfREVCVUcpIHtcbiAgICBjb25zdCBCTEFDS19DT0xPUiA9IGNjLkNvbG9yLkJMQUNLO1xuICAgIGNvbnN0IFJFRF9DT0xPUiA9IGNjLkNvbG9yLlJFRDtcblxuICAgIGxldCB2M190bXAgPSBbY2MudjMoKSwgY2MudjMoKV07XG4gICAgbGV0IG1hdDRfdG1wID0gY2MubWF0NCgpO1xuXG4gICAgbGV0IGNyZWF0ZURlYnVnRGF0YUZucyA9IHtcbiAgICAgICAgbm9ybWFsIChjb21wLCBpYSwgc3ViRGF0YSwgc3ViSW5kZXgpIHtcbiAgICAgICAgICAgIGxldCBvbGRWZm0gPSBzdWJEYXRhLnZmbTtcblxuICAgICAgICAgICAgbGV0IG5vcm1hbEVsZSA9IG9sZFZmbS5lbGVtZW50KGdmeC5BVFRSX05PUk1BTCk7XG4gICAgICAgICAgICBsZXQgcG9zRWxlID0gb2xkVmZtLmVsZW1lbnQoZ2Z4LkFUVFJfUE9TSVRJT04pO1xuICAgICAgICAgICAgbGV0IGpvaW50RWxlID0gb2xkVmZtLmVsZW1lbnQoZ2Z4LkFUVFJfSk9JTlRTKTtcbiAgICAgICAgICAgIGxldCB3ZWlnaHRFbGUgPSBvbGRWZm0uZWxlbWVudChnZnguQVRUUl9XRUlHSFRTKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFub3JtYWxFbGUgfHwgIXBvc0VsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGluZGljZXMgPSBbXTtcbiAgICAgICAgICAgIGxldCB2YkRhdGEgPSBbXTtcblxuICAgICAgICAgICAgbGV0IGxpbmVMZW5ndGggPSAxMDA7XG4gICAgICAgICAgICBWZWMzLnNldCh2M190bXBbMF0sIDUsIDAsIDApO1xuICAgICAgICAgICAgTWF0NC5pbnZlcnQobWF0NF90bXAsIGNvbXAubm9kZS5fd29ybGRNYXRyaXgpO1xuICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0Tm9ybWFsKHYzX3RtcFswXSwgdjNfdG1wWzBdLCBtYXQ0X3RtcCk7XG4gICAgICAgICAgICBsaW5lTGVuZ3RoID0gdjNfdG1wWzBdLm1hZygpO1xuXG4gICAgICAgICAgICBsZXQgbWVzaCA9IGNvbXAubWVzaDtcbiAgICAgICAgICAgIGxldCBwb3NEYXRhID0gbWVzaC5fZ2V0QXR0ck1lc2hEYXRhKHN1YkluZGV4LCBnZnguQVRUUl9QT1NJVElPTik7XG4gICAgICAgICAgICBsZXQgbm9ybWFsRGF0YSA9IG1lc2guX2dldEF0dHJNZXNoRGF0YShzdWJJbmRleCwgZ2Z4LkFUVFJfTk9STUFMKTtcbiAgICAgICAgICAgIGxldCBqb2ludERhdGEgPSBtZXNoLl9nZXRBdHRyTWVzaERhdGEoc3ViSW5kZXgsIGdmeC5BVFRSX0pPSU5UUyk7XG4gICAgICAgICAgICBsZXQgd2VpZ2h0RGF0YSA9IG1lc2guX2dldEF0dHJNZXNoRGF0YShzdWJJbmRleCwgZ2Z4LkFUVFJfV0VJR0hUUyk7XG5cbiAgICAgICAgICAgIGxldCB2ZXJ0ZXhDb3VudCA9IHBvc0RhdGEubGVuZ3RoIC8gcG9zRWxlLm51bTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZXJ0ZXhDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5vcm1hbEluZGV4ID0gaSAqIG5vcm1hbEVsZS5udW07XG4gICAgICAgICAgICAgICAgbGV0IHBvc0luZGV4ID0gaSAqIHBvc0VsZS5udW07XG5cbiAgICAgICAgICAgICAgICBWZWMzLnNldCh2M190bXBbMF0sIG5vcm1hbERhdGFbbm9ybWFsSW5kZXhdLCBub3JtYWxEYXRhW25vcm1hbEluZGV4KzFdLCBub3JtYWxEYXRhW25vcm1hbEluZGV4KzJdKTtcbiAgICAgICAgICAgICAgICBWZWMzLnNldCh2M190bXBbMV0sIHBvc0RhdGFbcG9zSW5kZXhdLCBwb3NEYXRhW3Bvc0luZGV4KzFdLCBwb3NEYXRhW3Bvc0luZGV4KzJdKTtcbiAgICAgICAgICAgICAgICBWZWMzLnNjYWxlQW5kQWRkKHYzX3RtcFswXSwgdjNfdG1wWzFdLCB2M190bXBbMF0sIGxpbmVMZW5ndGgpO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbGluZUluZGV4ID0gMDsgbGluZUluZGV4IDwgMjsgbGluZUluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmJEYXRhLnB1c2godjNfdG1wW2xpbmVJbmRleF0ueCwgdjNfdG1wW2xpbmVJbmRleF0ueSwgdjNfdG1wW2xpbmVJbmRleF0ueik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChqb2ludEVsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGpvaW50SW5kZXggPSBpICogam9pbnRFbGUubnVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBqb2ludEVsZS5udW07IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZiRGF0YS5wdXNoKGpvaW50RGF0YVtqb2ludEluZGV4ICsgal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh3ZWlnaHRFbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3ZWlnaHRJbmRleCA9IGkgKiB3ZWlnaHRFbGUubnVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB3ZWlnaHRFbGUubnVtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YkRhdGEucHVzaCh3ZWlnaHREYXRhW3dlaWdodEluZGV4ICsgal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaW5kaWNlcy5wdXNoKGkqMiwgaSoyKzEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZm9ybWF0T3B0cyA9IFtcbiAgICAgICAgICAgICAgICB7IG5hbWU6IGdmeC5BVFRSX1BPU0lUSU9OLCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogMyB9LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmIChqb2ludEVsZSkge1xuICAgICAgICAgICAgICAgIGZvcm1hdE9wdHMucHVzaCh7IG5hbWU6IGdmeC5BVFRSX0pPSU5UUywgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IGpvaW50RWxlLm51bSB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHdlaWdodEVsZSkge1xuICAgICAgICAgICAgICAgIGZvcm1hdE9wdHMucHVzaCh7IG5hbWU6IGdmeC5BVFRSX1dFSUdIVFMsIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiB3ZWlnaHRFbGUubnVtIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZ2Z4VkZtdCA9IG5ldyBnZnguVmVydGV4Rm9ybWF0KGZvcm1hdE9wdHMpO1xuXG4gICAgICAgICAgICBsZXQgdmIgPSBuZXcgZ2Z4LlZlcnRleEJ1ZmZlcihcbiAgICAgICAgICAgICAgICBSZW5kZXJlci5kZXZpY2UsXG4gICAgICAgICAgICAgICAgZ2Z4VkZtdCxcbiAgICAgICAgICAgICAgICBnZnguVVNBR0VfU1RBVElDLFxuICAgICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkodmJEYXRhKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbGV0IGliRGF0YSA9IG5ldyBVaW50MTZBcnJheShpbmRpY2VzKTtcbiAgICAgICAgICAgIGxldCBpYiA9IG5ldyBnZnguSW5kZXhCdWZmZXIoXG4gICAgICAgICAgICAgICAgUmVuZGVyZXIuZGV2aWNlLFxuICAgICAgICAgICAgICAgIGdmeC5JTkRFWF9GTVRfVUlOVDE2LFxuICAgICAgICAgICAgICAgIGdmeC5VU0FHRV9TVEFUSUMsXG4gICAgICAgICAgICAgICAgaWJEYXRhLFxuICAgICAgICAgICAgICAgIGliRGF0YS5sZW5ndGhcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxldCBtID0gTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZVdpdGhCdWlsdGluKCd1bmxpdCcpO1xuICAgICAgICAgICAgbS5zZXRQcm9wZXJ0eSgnZGlmZnVzZUNvbG9yJywgUkVEX0NPTE9SKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBtYXRlcmlhbDogbSxcbiAgICAgICAgICAgICAgICBpYTogbmV3IElucHV0QXNzZW1ibGVyKHZiLCBpYiwgZ2Z4LlBUX0xJTkVTKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcblxuICAgICAgICB3aXJlRnJhbWUgKGNvbXAsIGlhLCBzdWJEYXRhKSB7XG4gICAgICAgICAgICBsZXQgb2xkSWJEYXRhID0gc3ViRGF0YS5nZXRJRGF0YShVaW50MTZBcnJheSk7XG4gICAgICAgICAgICBsZXQgbSA9IE1hdGVyaWFsVmFyaWFudC5jcmVhdGVXaXRoQnVpbHRpbigndW5saXQnKTtcbiAgICAgICAgICAgIG0uc2V0UHJvcGVydHkoJ2RpZmZ1c2VDb2xvcicsIEJMQUNLX0NPTE9SKTtcblxuICAgICAgICAgICAgbGV0IGluZGljZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkSWJEYXRhLmxlbmd0aDsgaSs9Mykge1xuICAgICAgICAgICAgICAgIGxldCBhID0gb2xkSWJEYXRhWyBpICsgMCBdO1xuICAgICAgICAgICAgICAgIGxldCBiID0gb2xkSWJEYXRhWyBpICsgMSBdO1xuICAgICAgICAgICAgICAgIGxldCBjID0gb2xkSWJEYXRhWyBpICsgMiBdO1xuICAgICAgICAgICAgICAgIGluZGljZXMucHVzaChhLCBiLCBiLCBjLCBjLCBhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGliRGF0YSA9IG5ldyBVaW50MTZBcnJheShpbmRpY2VzKTtcbiAgICAgICAgICAgIGxldCBpYiA9IG5ldyBnZnguSW5kZXhCdWZmZXIoXG4gICAgICAgICAgICAgICAgUmVuZGVyZXIuZGV2aWNlLFxuICAgICAgICAgICAgICAgIGdmeC5JTkRFWF9GTVRfVUlOVDE2LFxuICAgICAgICAgICAgICAgIGdmeC5VU0FHRV9TVEFUSUMsXG4gICAgICAgICAgICAgICAgaWJEYXRhLFxuICAgICAgICAgICAgICAgIGliRGF0YS5sZW5ndGhcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbWF0ZXJpYWw6IG0sXG4gICAgICAgICAgICAgICAgaWE6IG5ldyBJbnB1dEFzc2VtYmxlcihpYS5fdmVydGV4QnVmZmVyLCBpYiwgZ2Z4LlBUX0xJTkVTKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgX3Byb3RvID0gTWVzaFJlbmRlcmVyLnByb3RvdHlwZTtcbiAgICBfcHJvdG8uX3VwZGF0ZURlYnVnRGF0YXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBkZWJ1Z0RhdGFzID0gdGhpcy5fZGVidWdEYXRhcztcbiAgICAgICAgbGV0IHN1Yk1lc2hlcyA9IHRoaXMuX21lc2guc3ViTWVzaGVzO1xuICAgICAgICBsZXQgc3ViRGF0YXMgPSB0aGlzLl9tZXNoLl9zdWJEYXRhcztcbiAgICAgICAgZm9yIChsZXQgbmFtZSBpbiBkZWJ1Z0RhdGFzKSB7XG4gICAgICAgICAgICBsZXQgZGVidWdEYXRhID0gZGVidWdEYXRhc1tuYW1lXTtcbiAgICAgICAgICAgIGlmIChkZWJ1Z0RhdGEubGVuZ3RoID09PSBzdWJNZXNoZXMubGVuZ3RoKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICghY2MubWFjcm9bJ1NIT1dfTUVTSF8nICsgbmFtZS50b1VwcGVyQ2FzZSgpXSkgY29udGludWU7XG5cbiAgICAgICAgICAgIGRlYnVnRGF0YS5sZW5ndGggPSBzdWJNZXNoZXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJNZXNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBkZWJ1Z0RhdGFbaV0gPSBjcmVhdGVEZWJ1Z0RhdGFGbnNbbmFtZV0odGhpcywgc3ViTWVzaGVzW2ldLCBzdWJEYXRhc1tpXSwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5jYy5NZXNoUmVuZGVyZXIgPSBtb2R1bGUuZXhwb3J0cyA9IE1lc2hSZW5kZXJlcjtcbiJdLCJzb3VyY2VSb290IjoiLyJ9