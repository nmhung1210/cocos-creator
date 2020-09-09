
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCRenderComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _assembler = _interopRequireDefault(require("../renderer/assembler"));

var _materialVariant = _interopRequireDefault(require("../assets/material/material-variant"));

var _valueTypes = require("../value-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
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
var Component = require('./CCComponent');

var RenderFlow = require('../renderer/render-flow');

var Material = require('../assets/material/CCMaterial');

var _temp_color = new _valueTypes.Color();
/**
 * !#en
 * Base class for components which supports rendering features.
 * !#zh
 * 所有支持渲染的组件的基类
 *
 * @class RenderComponent
 * @extends Component
 */


var RenderComponent = cc.Class({
  name: 'RenderComponent',
  "extends": Component,
  editor: CC_EDITOR && {
    executeInEditMode: true,
    disallowMultiple: true
  },
  properties: {
    _materials: {
      "default": [],
      type: Material
    },

    /**
     * !#en The materials used by this render component.
     * !#zh 渲染组件使用的材质。
     * @property {[Material]} sharedMaterials
     */
    materials: {
      get: function get() {
        return this._materials;
      },
      set: function set(val) {
        this._materials = val;

        this._activateMaterial();
      },
      type: [Material],
      displayName: 'Materials',
      animatable: false
    }
  },
  ctor: function ctor() {
    this._vertsDirty = true;
    this._assembler = null;
  },
  _resetAssembler: function _resetAssembler() {
    _assembler["default"].init(this);

    this._updateColor();

    this.setVertsDirty();
  },
  __preload: function __preload() {
    this._resetAssembler();

    this._activateMaterial();
  },
  onEnable: function onEnable() {
    if (this.node._renderComponent) {
      this.node._renderComponent.enabled = false;
    }

    this.node._renderComponent = this;
    this.node._renderFlag |= RenderFlow.FLAG_OPACITY_COLOR;
    this.setVertsDirty();
  },
  onDisable: function onDisable() {
    this.node._renderComponent = null;
    this.disableRender();
  },
  onDestroy: function onDestroy() {
    var materials = this._materials;

    for (var i = 0; i < materials.length; i++) {
      cc.pool.material.put(materials[i]);
    }

    materials.length = 0;
    cc.pool.assembler.put(this._assembler);
  },
  setVertsDirty: function setVertsDirty() {
    this._vertsDirty = true;
    this.markForRender(true);
  },
  _on3DNodeChanged: function _on3DNodeChanged() {
    this._resetAssembler();
  },
  _validateRender: function _validateRender() {},
  markForValidate: function markForValidate() {
    cc.RenderFlow.registerValidate(this);
  },
  markForRender: function markForRender(enable) {
    var flag = RenderFlow.FLAG_RENDER | RenderFlow.FLAG_UPDATE_RENDER_DATA;

    if (enable) {
      this.node._renderFlag |= flag;
      this.markForValidate();
    } else {
      this.node._renderFlag &= ~flag;
    }
  },
  disableRender: function disableRender() {
    this.node._renderFlag &= ~(RenderFlow.FLAG_RENDER | RenderFlow.FLAG_UPDATE_RENDER_DATA);
  },

  /**
   * !#en Get the material by index.
   * !#zh 根据指定索引获取材质
   * @method getMaterial
   * @param {Number} index 
   * @return {MaterialVariant}
   */
  getMaterial: function getMaterial(index) {
    if (index < 0 || index >= this._materials.length) {
      return null;
    }

    var material = this._materials[index];
    if (!material) return null;

    var instantiated = _materialVariant["default"].create(material, this);

    if (instantiated !== material) {
      this.setMaterial(index, instantiated);
    }

    return instantiated;
  },

  /**
   * !#en Gets all the materials.
   * !#zh 获取所有材质。
   * @method getMaterials
   * @return {[MaterialVariant]}
   */
  getMaterials: function getMaterials() {
    var materials = this._materials;

    for (var i = 0; i < materials.length; i++) {
      materials[i] = _materialVariant["default"].create(materials[i], this);
    }

    return materials;
  },

  /**
   * !#en Set the material by index.
   * !#zh 根据指定索引设置材质
   * @method setMaterial
   * @param {Number} index 
   * @param {Material} material
   * @return {Material}
   */
  setMaterial: function setMaterial(index, material) {
    if (material !== this._materials[index]) {
      material = _materialVariant["default"].create(material, this);
      this._materials[index] = material;
    }

    this._updateMaterial();

    this.markForRender(true);
    return material;
  },
  _getDefaultMaterial: function _getDefaultMaterial() {
    return Material.getBuiltinMaterial('2d-sprite');
  },

  /**
   * Init material.
   */
  _activateMaterial: function _activateMaterial() {
    var materials = this._materials;

    if (!materials[0]) {
      var material = this._getDefaultMaterial();

      materials[0] = material;
    }

    for (var i = 0; i < materials.length; i++) {
      materials[i] = _materialVariant["default"].create(materials[i], this);
    }

    this._updateMaterial();
  },

  /**
   * Update material properties.
   */
  _updateMaterial: function _updateMaterial() {},
  _updateColor: function _updateColor() {
    if (this._assembler.updateColor) {
      var premultiply = this.srcBlendFactor === cc.macro.BlendFactor.ONE;
      premultiply && _valueTypes.Color.premultiplyAlpha(_temp_color, this.node._color);
      var color = premultiply ? _temp_color._val : null;

      this._assembler.updateColor(this, color);
    }
  },
  _checkBacth: function _checkBacth(renderer, cullingMask) {
    var material = this._materials[0];

    if (material && material.getHash() !== renderer.material.getHash() || renderer.cullingMask !== cullingMask) {
      renderer._flush();

      renderer.node = material.getDefine('CC_USE_MODEL') ? this.node : renderer._dummyNode;
      renderer.material = material;
      renderer.cullingMask = cullingMask;
    }
  }
});
cc.RenderComponent = module.exports = RenderComponent;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NSZW5kZXJDb21wb25lbnQuanMiXSwibmFtZXMiOlsiQ29tcG9uZW50IiwicmVxdWlyZSIsIlJlbmRlckZsb3ciLCJNYXRlcmlhbCIsIl90ZW1wX2NvbG9yIiwiQ29sb3IiLCJSZW5kZXJDb21wb25lbnQiLCJjYyIsIkNsYXNzIiwibmFtZSIsImVkaXRvciIsIkNDX0VESVRPUiIsImV4ZWN1dGVJbkVkaXRNb2RlIiwiZGlzYWxsb3dNdWx0aXBsZSIsInByb3BlcnRpZXMiLCJfbWF0ZXJpYWxzIiwidHlwZSIsIm1hdGVyaWFscyIsImdldCIsInNldCIsInZhbCIsIl9hY3RpdmF0ZU1hdGVyaWFsIiwiZGlzcGxheU5hbWUiLCJhbmltYXRhYmxlIiwiY3RvciIsIl92ZXJ0c0RpcnR5IiwiX2Fzc2VtYmxlciIsIl9yZXNldEFzc2VtYmxlciIsIkFzc2VtYmxlciIsImluaXQiLCJfdXBkYXRlQ29sb3IiLCJzZXRWZXJ0c0RpcnR5IiwiX19wcmVsb2FkIiwib25FbmFibGUiLCJub2RlIiwiX3JlbmRlckNvbXBvbmVudCIsImVuYWJsZWQiLCJfcmVuZGVyRmxhZyIsIkZMQUdfT1BBQ0lUWV9DT0xPUiIsIm9uRGlzYWJsZSIsImRpc2FibGVSZW5kZXIiLCJvbkRlc3Ryb3kiLCJpIiwibGVuZ3RoIiwicG9vbCIsIm1hdGVyaWFsIiwicHV0IiwiYXNzZW1ibGVyIiwibWFya0ZvclJlbmRlciIsIl9vbjNETm9kZUNoYW5nZWQiLCJfdmFsaWRhdGVSZW5kZXIiLCJtYXJrRm9yVmFsaWRhdGUiLCJyZWdpc3RlclZhbGlkYXRlIiwiZW5hYmxlIiwiZmxhZyIsIkZMQUdfUkVOREVSIiwiRkxBR19VUERBVEVfUkVOREVSX0RBVEEiLCJnZXRNYXRlcmlhbCIsImluZGV4IiwiaW5zdGFudGlhdGVkIiwiTWF0ZXJpYWxWYXJpYW50IiwiY3JlYXRlIiwic2V0TWF0ZXJpYWwiLCJnZXRNYXRlcmlhbHMiLCJfdXBkYXRlTWF0ZXJpYWwiLCJfZ2V0RGVmYXVsdE1hdGVyaWFsIiwiZ2V0QnVpbHRpbk1hdGVyaWFsIiwidXBkYXRlQ29sb3IiLCJwcmVtdWx0aXBseSIsInNyY0JsZW5kRmFjdG9yIiwibWFjcm8iLCJCbGVuZEZhY3RvciIsIk9ORSIsInByZW11bHRpcGx5QWxwaGEiLCJfY29sb3IiLCJjb2xvciIsIl92YWwiLCJfY2hlY2tCYWN0aCIsInJlbmRlcmVyIiwiY3VsbGluZ01hc2siLCJnZXRIYXNoIiwiX2ZsdXNoIiwiZ2V0RGVmaW5lIiwiX2R1bW15Tm9kZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBQ0E7O0FBQ0E7Ozs7QUEzQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZCQSxJQUFNQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxlQUFELENBQXpCOztBQUNBLElBQU1DLFVBQVUsR0FBR0QsT0FBTyxDQUFDLHlCQUFELENBQTFCOztBQUNBLElBQU1FLFFBQVEsR0FBR0YsT0FBTyxDQUFDLCtCQUFELENBQXhCOztBQUVBLElBQUlHLFdBQVcsR0FBRyxJQUFJQyxpQkFBSixFQUFsQjtBQUVBOzs7Ozs7Ozs7OztBQVNBLElBQUlDLGVBQWUsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDM0JDLEVBQUFBLElBQUksRUFBRSxpQkFEcUI7QUFFM0IsYUFBU1QsU0FGa0I7QUFJM0JVLEVBQUFBLE1BQU0sRUFBRUMsU0FBUyxJQUFJO0FBQ2pCQyxJQUFBQSxpQkFBaUIsRUFBRSxJQURGO0FBRWpCQyxJQUFBQSxnQkFBZ0IsRUFBRTtBQUZELEdBSk07QUFTM0JDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUU7QUFDUixpQkFBUyxFQUREO0FBRVJDLE1BQUFBLElBQUksRUFBRWI7QUFGRSxLQURKOztBQU1SOzs7OztBQUtBYyxJQUFBQSxTQUFTLEVBQUU7QUFDUEMsTUFBQUEsR0FETyxpQkFDQTtBQUNILGVBQU8sS0FBS0gsVUFBWjtBQUNI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KioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgQXNzZW1ibGVyIGZyb20gJy4uL3JlbmRlcmVyL2Fzc2VtYmxlcic7XG5pbXBvcnQgTWF0ZXJpYWxWYXJpYW50IGZyb20gJy4uL2Fzc2V0cy9tYXRlcmlhbC9tYXRlcmlhbC12YXJpYW50JztcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAnLi4vdmFsdWUtdHlwZXMnO1xuXG5jb25zdCBDb21wb25lbnQgPSByZXF1aXJlKCcuL0NDQ29tcG9uZW50Jyk7XG5jb25zdCBSZW5kZXJGbG93ID0gcmVxdWlyZSgnLi4vcmVuZGVyZXIvcmVuZGVyLWZsb3cnKTtcbmNvbnN0IE1hdGVyaWFsID0gcmVxdWlyZSgnLi4vYXNzZXRzL21hdGVyaWFsL0NDTWF0ZXJpYWwnKTtcblxubGV0IF90ZW1wX2NvbG9yID0gbmV3IENvbG9yKCk7XG5cbi8qKlxuICogISNlblxuICogQmFzZSBjbGFzcyBmb3IgY29tcG9uZW50cyB3aGljaCBzdXBwb3J0cyByZW5kZXJpbmcgZmVhdHVyZXMuXG4gKiAhI3poXG4gKiDmiYDmnInmlK/mjIHmuLLmn5PnmoTnu4Tku7bnmoTln7rnsbtcbiAqXG4gKiBAY2xhc3MgUmVuZGVyQ29tcG9uZW50XG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcbiAqL1xubGV0IFJlbmRlckNvbXBvbmVudCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnUmVuZGVyQ29tcG9uZW50JyxcbiAgICBleHRlbmRzOiBDb21wb25lbnQsXG5cbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlLFxuICAgICAgICBkaXNhbGxvd011bHRpcGxlOiB0cnVlXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX21hdGVyaWFsczoge1xuICAgICAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgICAgICB0eXBlOiBNYXRlcmlhbCxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgbWF0ZXJpYWxzIHVzZWQgYnkgdGhpcyByZW5kZXIgY29tcG9uZW50LlxuICAgICAgICAgKiAhI3poIOa4suafk+e7hOS7tuS9v+eUqOeahOadkOi0qOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge1tNYXRlcmlhbF19IHNoYXJlZE1hdGVyaWFsc1xuICAgICAgICAgKi9cbiAgICAgICAgbWF0ZXJpYWxzOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXRlcmlhbHM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXRlcmlhbHMgPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZhdGVNYXRlcmlhbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IFtNYXRlcmlhbF0sXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ01hdGVyaWFscycsXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBjdG9yICgpIHtcbiAgICAgICAgdGhpcy5fdmVydHNEaXJ0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlciA9IG51bGw7XG4gICAgfSxcblxuICAgIF9yZXNldEFzc2VtYmxlciAoKSB7XG4gICAgICAgIEFzc2VtYmxlci5pbml0KHRoaXMpO1xuICAgICAgICB0aGlzLl91cGRhdGVDb2xvcigpO1xuICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcbiAgICB9LFxuXG4gICAgX19wcmVsb2FkICgpIHtcbiAgICAgICAgdGhpcy5fcmVzZXRBc3NlbWJsZXIoKTtcbiAgICAgICAgdGhpcy5fYWN0aXZhdGVNYXRlcmlhbCgpO1xuICAgIH0sXG5cbiAgICBvbkVuYWJsZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGUuX3JlbmRlckNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLl9yZW5kZXJDb21wb25lbnQuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5fcmVuZGVyQ29tcG9uZW50ID0gdGhpcztcbiAgICAgICAgdGhpcy5ub2RlLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19PUEFDSVRZX0NPTE9SO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zZXRWZXJ0c0RpcnR5KCk7XG4gICAgfSxcblxuICAgIG9uRGlzYWJsZSAoKSB7XG4gICAgICAgIHRoaXMubm9kZS5fcmVuZGVyQ29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5kaXNhYmxlUmVuZGVyKCk7XG4gICAgfSxcblxuICAgIG9uRGVzdHJveSAoKSB7XG4gICAgICAgIGxldCBtYXRlcmlhbHMgPSB0aGlzLl9tYXRlcmlhbHM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0ZXJpYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjYy5wb29sLm1hdGVyaWFsLnB1dChtYXRlcmlhbHNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIG1hdGVyaWFscy5sZW5ndGggPSAwO1xuXG4gICAgICAgIGNjLnBvb2wuYXNzZW1ibGVyLnB1dCh0aGlzLl9hc3NlbWJsZXIpO1xuICAgIH0sXG5cbiAgICBzZXRWZXJ0c0RpcnR5ICgpIHtcbiAgICAgICAgdGhpcy5fdmVydHNEaXJ0eSA9IHRydWU7XG4gICAgICAgIHRoaXMubWFya0ZvclJlbmRlcih0cnVlKTtcbiAgICB9LFxuXG4gICAgX29uM0ROb2RlQ2hhbmdlZCAoKSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0QXNzZW1ibGVyKCk7XG4gICAgfSxcbiAgICBcbiAgICBfdmFsaWRhdGVSZW5kZXIgKCkge1xuICAgIH0sXG5cbiAgICBtYXJrRm9yVmFsaWRhdGUgKCkge1xuICAgICAgICBjYy5SZW5kZXJGbG93LnJlZ2lzdGVyVmFsaWRhdGUodGhpcyk7XG4gICAgfSxcblxuICAgIG1hcmtGb3JSZW5kZXIgKGVuYWJsZSkge1xuICAgICAgICBsZXQgZmxhZyA9IFJlbmRlckZsb3cuRkxBR19SRU5ERVIgfCBSZW5kZXJGbG93LkZMQUdfVVBEQVRFX1JFTkRFUl9EQVRBO1xuICAgICAgICBpZiAoZW5hYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuX3JlbmRlckZsYWcgfD0gZmxhZztcbiAgICAgICAgICAgIHRoaXMubWFya0ZvclZhbGlkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuX3JlbmRlckZsYWcgJj0gfmZsYWc7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZGlzYWJsZVJlbmRlciAoKSB7XG4gICAgICAgIHRoaXMubm9kZS5fcmVuZGVyRmxhZyAmPSB+KFJlbmRlckZsb3cuRkxBR19SRU5ERVIgfCBSZW5kZXJGbG93LkZMQUdfVVBEQVRFX1JFTkRFUl9EQVRBKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgdGhlIG1hdGVyaWFsIGJ5IGluZGV4LlxuICAgICAqICEjemgg5qC55o2u5oyH5a6a57Si5byV6I635Y+W5p2Q6LSoXG4gICAgICogQG1ldGhvZCBnZXRNYXRlcmlhbFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBcbiAgICAgKiBAcmV0dXJuIHtNYXRlcmlhbFZhcmlhbnR9XG4gICAgICovXG4gICAgZ2V0TWF0ZXJpYWwgKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5fbWF0ZXJpYWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLl9tYXRlcmlhbHNbaW5kZXhdO1xuICAgICAgICBpZiAoIW1hdGVyaWFsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIGxldCBpbnN0YW50aWF0ZWQgPSBNYXRlcmlhbFZhcmlhbnQuY3JlYXRlKG1hdGVyaWFsLCB0aGlzKTtcbiAgICAgICAgaWYgKGluc3RhbnRpYXRlZCAhPT0gbWF0ZXJpYWwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0TWF0ZXJpYWwoaW5kZXgsIGluc3RhbnRpYXRlZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5zdGFudGlhdGVkO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHMgYWxsIHRoZSBtYXRlcmlhbHMuXG4gICAgICogISN6aCDojrflj5bmiYDmnInmnZDotKjjgIJcbiAgICAgKiBAbWV0aG9kIGdldE1hdGVyaWFsc1xuICAgICAqIEByZXR1cm4ge1tNYXRlcmlhbFZhcmlhbnRdfVxuICAgICAqL1xuICAgIGdldE1hdGVyaWFscyAoKSB7XG4gICAgICAgIGxldCBtYXRlcmlhbHMgPSB0aGlzLl9tYXRlcmlhbHM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0ZXJpYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBtYXRlcmlhbHNbaV0gPSBNYXRlcmlhbFZhcmlhbnQuY3JlYXRlKG1hdGVyaWFsc1tpXSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdGVyaWFscztcbiAgICB9LFxuICAgIFxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHRoZSBtYXRlcmlhbCBieSBpbmRleC5cbiAgICAgKiAhI3poIOagueaNruaMh+Wumue0ouW8leiuvue9ruadkOi0qFxuICAgICAqIEBtZXRob2Qgc2V0TWF0ZXJpYWxcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggXG4gICAgICogQHBhcmFtIHtNYXRlcmlhbH0gbWF0ZXJpYWxcbiAgICAgKiBAcmV0dXJuIHtNYXRlcmlhbH1cbiAgICAgKi9cbiAgICBzZXRNYXRlcmlhbCAoaW5kZXgsIG1hdGVyaWFsKSB7XG4gICAgICAgIGlmIChtYXRlcmlhbCAhPT0gdGhpcy5fbWF0ZXJpYWxzW2luZGV4XSkge1xuICAgICAgICAgICAgbWF0ZXJpYWwgPSBNYXRlcmlhbFZhcmlhbnQuY3JlYXRlKG1hdGVyaWFsLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsc1tpbmRleF0gPSBtYXRlcmlhbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVNYXRlcmlhbCgpO1xuICAgICAgICB0aGlzLm1hcmtGb3JSZW5kZXIodHJ1ZSk7XG4gICAgICAgIHJldHVybiBtYXRlcmlhbDtcbiAgICB9LFxuXG4gICAgX2dldERlZmF1bHRNYXRlcmlhbCAoKSB7XG4gICAgICAgIHJldHVybiBNYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLXNwcml0ZScpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBJbml0IG1hdGVyaWFsLlxuICAgICAqL1xuICAgIF9hY3RpdmF0ZU1hdGVyaWFsICgpIHtcbiAgICAgICAgbGV0IG1hdGVyaWFscyA9IHRoaXMuX21hdGVyaWFscztcbiAgICAgICAgaWYgKCFtYXRlcmlhbHNbMF0pIHtcbiAgICAgICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMuX2dldERlZmF1bHRNYXRlcmlhbCgpO1xuICAgICAgICAgICAgbWF0ZXJpYWxzWzBdID0gbWF0ZXJpYWw7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGVyaWFscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbWF0ZXJpYWxzW2ldID0gTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZShtYXRlcmlhbHNbaV0sIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlTWF0ZXJpYWwoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIG1hdGVyaWFsIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgX3VwZGF0ZU1hdGVyaWFsICgpIHtcblxuICAgIH0sXG5cbiAgICBfdXBkYXRlQ29sb3IgKCkge1xuICAgICAgICBpZiAodGhpcy5fYXNzZW1ibGVyLnVwZGF0ZUNvbG9yKSB7XG4gICAgICAgICAgICBsZXQgcHJlbXVsdGlwbHkgPSB0aGlzLnNyY0JsZW5kRmFjdG9yID09PSBjYy5tYWNyby5CbGVuZEZhY3Rvci5PTkU7XG4gICAgICAgICAgICBwcmVtdWx0aXBseSAmJiBDb2xvci5wcmVtdWx0aXBseUFscGhhKF90ZW1wX2NvbG9yLCB0aGlzLm5vZGUuX2NvbG9yKTtcbiAgICAgICAgICAgIGxldCBjb2xvciA9IHByZW11bHRpcGx5ID8gX3RlbXBfY29sb3IuX3ZhbCA6IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9hc3NlbWJsZXIudXBkYXRlQ29sb3IodGhpcywgY29sb3IpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9jaGVja0JhY3RoIChyZW5kZXJlciwgY3VsbGluZ01hc2spIHtcbiAgICAgICAgbGV0IG1hdGVyaWFsID0gdGhpcy5fbWF0ZXJpYWxzWzBdO1xuICAgICAgICBpZiAoKG1hdGVyaWFsICYmIG1hdGVyaWFsLmdldEhhc2goKSAhPT0gcmVuZGVyZXIubWF0ZXJpYWwuZ2V0SGFzaCgpKSB8fCBcbiAgICAgICAgICAgIHJlbmRlcmVyLmN1bGxpbmdNYXNrICE9PSBjdWxsaW5nTWFzaykge1xuICAgICAgICAgICAgcmVuZGVyZXIuX2ZsdXNoKCk7XG4gICAgXG4gICAgICAgICAgICByZW5kZXJlci5ub2RlID0gbWF0ZXJpYWwuZ2V0RGVmaW5lKCdDQ19VU0VfTU9ERUwnKSA/IHRoaXMubm9kZSA6IHJlbmRlcmVyLl9kdW1teU5vZGU7XG4gICAgICAgICAgICByZW5kZXJlci5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICAgICAgICAgICAgcmVuZGVyZXIuY3VsbGluZ01hc2sgPSBjdWxsaW5nTWFzaztcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5SZW5kZXJDb21wb25lbnQgPSBtb2R1bGUuZXhwb3J0cyA9IFJlbmRlckNvbXBvbmVudDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9