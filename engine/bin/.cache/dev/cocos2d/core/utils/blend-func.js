
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/blend-func.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var RenderComponent = require('../components/CCRenderComponent');

var BlendFactor = require('../platform/CCMacro').BlendFactor;

var gfx = require('../../renderer/gfx');
/**
 * !#en
 * Helper class for setting material blend function.
 * !#zh
 * 设置材质混合模式的辅助类。
 * @class BlendFunc
 */


var BlendFunc = cc.Class({
  properties: {
    _srcBlendFactor: BlendFactor.SRC_ALPHA,
    _dstBlendFactor: BlendFactor.ONE_MINUS_SRC_ALPHA,

    /**
     * !#en specify the source Blend Factor, this will generate a custom material object, please pay attention to the memory cost.
     * !#zh 指定原图的混合模式，这会克隆一个新的材质对象，注意这带来的开销
     * @property srcBlendFactor
     * @type {macro.BlendFactor}
     * @example
     * sprite.srcBlendFactor = cc.macro.BlendFactor.ONE;
     */
    srcBlendFactor: {
      get: function get() {
        return this._srcBlendFactor;
      },
      set: function set(value) {
        if (this._srcBlendFactor === value) return;
        this._srcBlendFactor = value;

        this._updateBlendFunc(true);

        this._onBlendChanged && this._onBlendChanged();
      },
      animatable: false,
      type: BlendFactor,
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.src_blend_factor',
      visible: true
    },

    /**
     * !#en specify the destination Blend Factor.
     * !#zh 指定目标的混合模式
     * @property dstBlendFactor
     * @type {macro.BlendFactor}
     * @example
     * sprite.dstBlendFactor = cc.macro.BlendFactor.ONE;
     */
    dstBlendFactor: {
      get: function get() {
        return this._dstBlendFactor;
      },
      set: function set(value) {
        if (this._dstBlendFactor === value) return;
        this._dstBlendFactor = value;

        this._updateBlendFunc(true);
      },
      animatable: false,
      type: BlendFactor,
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.dst_blend_factor',
      visible: true
    }
  },
  setMaterial: function setMaterial(index, material) {
    var materialVar = RenderComponent.prototype.setMaterial.call(this, index, material);

    if (this._srcBlendFactor !== BlendFactor.SRC_ALPHA || this._dstBlendFactor !== BlendFactor.ONE_MINUS_SRC_ALPHA) {
      this._updateMaterialBlendFunc(materialVar);
    }

    return materialVar;
  },
  _updateMaterial: function _updateMaterial() {
    this._updateBlendFunc();
  },
  _updateBlendFunc: function _updateBlendFunc(force) {
    if (!force) {
      if (this._srcBlendFactor === BlendFactor.SRC_ALPHA && this._dstBlendFactor === BlendFactor.ONE_MINUS_SRC_ALPHA) {
        return;
      }
    }

    var materials = this.getMaterials();

    for (var i = 0; i < materials.length; i++) {
      var material = materials[i];

      this._updateMaterialBlendFunc(material);
    }
  },
  _updateMaterialBlendFunc: function _updateMaterialBlendFunc(material) {
    material.setBlend(true, gfx.BLEND_FUNC_ADD, this._srcBlendFactor, this._dstBlendFactor, gfx.BLEND_FUNC_ADD, this._srcBlendFactor, this._dstBlendFactor);
  }
});
module.exports = cc.BlendFunc = BlendFunc;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL2JsZW5kLWZ1bmMuanMiXSwibmFtZXMiOlsiUmVuZGVyQ29tcG9uZW50IiwicmVxdWlyZSIsIkJsZW5kRmFjdG9yIiwiZ2Z4IiwiQmxlbmRGdW5jIiwiY2MiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJfc3JjQmxlbmRGYWN0b3IiLCJTUkNfQUxQSEEiLCJfZHN0QmxlbmRGYWN0b3IiLCJPTkVfTUlOVVNfU1JDX0FMUEhBIiwic3JjQmxlbmRGYWN0b3IiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsIl91cGRhdGVCbGVuZEZ1bmMiLCJfb25CbGVuZENoYW5nZWQiLCJhbmltYXRhYmxlIiwidHlwZSIsInRvb2x0aXAiLCJDQ19ERVYiLCJ2aXNpYmxlIiwiZHN0QmxlbmRGYWN0b3IiLCJzZXRNYXRlcmlhbCIsImluZGV4IiwibWF0ZXJpYWwiLCJtYXRlcmlhbFZhciIsInByb3RvdHlwZSIsImNhbGwiLCJfdXBkYXRlTWF0ZXJpYWxCbGVuZEZ1bmMiLCJfdXBkYXRlTWF0ZXJpYWwiLCJmb3JjZSIsIm1hdGVyaWFscyIsImdldE1hdGVyaWFscyIsImkiLCJsZW5ndGgiLCJzZXRCbGVuZCIsIkJMRU5EX0ZVTkNfQUREIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLGVBQWUsR0FBR0MsT0FBTyxDQUFDLGlDQUFELENBQS9COztBQUNBLElBQU1DLFdBQVcsR0FBR0QsT0FBTyxDQUFDLHFCQUFELENBQVAsQ0FBK0JDLFdBQW5EOztBQUNBLElBQU1DLEdBQUcsR0FBR0YsT0FBTyxDQUFDLG9CQUFELENBQW5CO0FBRUE7Ozs7Ozs7OztBQU9BLElBQUlHLFNBQVMsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDckJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxlQUFlLEVBQUVOLFdBQVcsQ0FBQ08sU0FEckI7QUFFUkMsSUFBQUEsZUFBZSxFQUFFUixXQUFX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QU0sQ0FBQ0MsT0FBUCxHQUFpQm5DLEVBQUUsQ0FBQ0QsU0FBSCxHQUFlQSxTQUFoQyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgUmVuZGVyQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9DQ1JlbmRlckNvbXBvbmVudCcpO1xuY29uc3QgQmxlbmRGYWN0b3IgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9DQ01hY3JvJykuQmxlbmRGYWN0b3I7XG5jb25zdCBnZnggPSByZXF1aXJlKCcuLi8uLi9yZW5kZXJlci9nZngnKTtcblxuLyoqXG4gKiAhI2VuXG4gKiBIZWxwZXIgY2xhc3MgZm9yIHNldHRpbmcgbWF0ZXJpYWwgYmxlbmQgZnVuY3Rpb24uXG4gKiAhI3poXG4gKiDorr7nva7mnZDotKjmt7flkIjmqKHlvI/nmoTovoXliqnnsbvjgIJcbiAqIEBjbGFzcyBCbGVuZEZ1bmNcbiAqL1xubGV0IEJsZW5kRnVuYyA9IGNjLkNsYXNzKHtcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIF9zcmNCbGVuZEZhY3RvcjogQmxlbmRGYWN0b3IuU1JDX0FMUEhBLFxuICAgICAgICBfZHN0QmxlbmRGYWN0b3I6IEJsZW5kRmFjdG9yLk9ORV9NSU5VU19TUkNfQUxQSEEsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gc3BlY2lmeSB0aGUgc291cmNlIEJsZW5kIEZhY3RvciwgdGhpcyB3aWxsIGdlbmVyYXRlIGEgY3VzdG9tIG1hdGVyaWFsIG9iamVjdCwgcGxlYXNlIHBheSBhdHRlbnRpb24gdG8gdGhlIG1lbW9yeSBjb3N0LlxuICAgICAgICAgKiAhI3poIOaMh+WumuWOn+WbvueahOa3t+WQiOaooeW8j++8jOi/meS8muWFi+mahuS4gOS4quaWsOeahOadkOi0qOWvueixoe+8jOazqOaEj+i/meW4puadpeeahOW8gOmUgFxuICAgICAgICAgKiBAcHJvcGVydHkgc3JjQmxlbmRGYWN0b3JcbiAgICAgICAgICogQHR5cGUge21hY3JvLkJsZW5kRmFjdG9yfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBzcHJpdGUuc3JjQmxlbmRGYWN0b3IgPSBjYy5tYWNyby5CbGVuZEZhY3Rvci5PTkU7XG4gICAgICAgICAqL1xuICAgICAgICBzcmNCbGVuZEZhY3Rvcjoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3JjQmxlbmRGYWN0b3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zcmNCbGVuZEZhY3RvciA9PT0gdmFsdWUpIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLl9zcmNCbGVuZEZhY3RvciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUJsZW5kRnVuYyh0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkJsZW5kQ2hhbmdlZCAmJiB0aGlzLl9vbkJsZW5kQ2hhbmdlZCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdHlwZTogQmxlbmRGYWN0b3IsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNwcml0ZS5zcmNfYmxlbmRfZmFjdG9yJyxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBzcGVjaWZ5IHRoZSBkZXN0aW5hdGlvbiBCbGVuZCBGYWN0b3IuXG4gICAgICAgICAqICEjemgg5oyH5a6a55uu5qCH55qE5re35ZCI5qih5byPXG4gICAgICAgICAqIEBwcm9wZXJ0eSBkc3RCbGVuZEZhY3RvclxuICAgICAgICAgKiBAdHlwZSB7bWFjcm8uQmxlbmRGYWN0b3J9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIHNwcml0ZS5kc3RCbGVuZEZhY3RvciA9IGNjLm1hY3JvLkJsZW5kRmFjdG9yLk9ORTtcbiAgICAgICAgICovXG4gICAgICAgIGRzdEJsZW5kRmFjdG9yOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kc3RCbGVuZEZhY3RvcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RzdEJsZW5kRmFjdG9yID09PSB2YWx1ZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RzdEJsZW5kRmFjdG9yID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQmxlbmRGdW5jKHRydWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdHlwZTogQmxlbmRGYWN0b3IsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNwcml0ZS5kc3RfYmxlbmRfZmFjdG9yJyxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWVcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgc2V0TWF0ZXJpYWwgKGluZGV4LCBtYXRlcmlhbCkge1xuICAgICAgICBsZXQgbWF0ZXJpYWxWYXIgPSBSZW5kZXJDb21wb25lbnQucHJvdG90eXBlLnNldE1hdGVyaWFsLmNhbGwodGhpcywgaW5kZXgsIG1hdGVyaWFsKTtcblxuICAgICAgICBpZiAodGhpcy5fc3JjQmxlbmRGYWN0b3IgIT09IEJsZW5kRmFjdG9yLlNSQ19BTFBIQSB8fCB0aGlzLl9kc3RCbGVuZEZhY3RvciAhPT0gQmxlbmRGYWN0b3IuT05FX01JTlVTX1NSQ19BTFBIQSkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTWF0ZXJpYWxCbGVuZEZ1bmMobWF0ZXJpYWxWYXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hdGVyaWFsVmFyO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlTWF0ZXJpYWwgKCkge1xuICAgICAgICB0aGlzLl91cGRhdGVCbGVuZEZ1bmMoKTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZUJsZW5kRnVuYyAoZm9yY2UpIHtcbiAgICAgICAgaWYgKCFmb3JjZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NyY0JsZW5kRmFjdG9yID09PSBCbGVuZEZhY3Rvci5TUkNfQUxQSEEgJiYgdGhpcy5fZHN0QmxlbmRGYWN0b3IgPT09IEJsZW5kRmFjdG9yLk9ORV9NSU5VU19TUkNfQUxQSEEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBtYXRlcmlhbHMgPSB0aGlzLmdldE1hdGVyaWFscygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGVyaWFscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG1hdGVyaWFsID0gbWF0ZXJpYWxzW2ldO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTWF0ZXJpYWxCbGVuZEZ1bmMobWF0ZXJpYWwpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF91cGRhdGVNYXRlcmlhbEJsZW5kRnVuYyAobWF0ZXJpYWwpIHtcbiAgICAgICAgbWF0ZXJpYWwuc2V0QmxlbmQoXG4gICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgZ2Z4LkJMRU5EX0ZVTkNfQURELFxuICAgICAgICAgICAgdGhpcy5fc3JjQmxlbmRGYWN0b3IsIHRoaXMuX2RzdEJsZW5kRmFjdG9yLFxuICAgICAgICAgICAgZ2Z4LkJMRU5EX0ZVTkNfQURELFxuICAgICAgICAgICAgdGhpcy5fc3JjQmxlbmRGYWN0b3IsIHRoaXMuX2RzdEJsZW5kRmFjdG9yXG4gICAgICAgICk7XG4gICAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNjLkJsZW5kRnVuYyA9IEJsZW5kRnVuYztcbiJdLCJzb3VyY2VSb290IjoiLyJ9