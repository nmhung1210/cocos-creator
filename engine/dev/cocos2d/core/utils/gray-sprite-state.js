
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/gray-sprite-state.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _materialVariant = _interopRequireDefault(require("../assets/material/material-variant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Material = require('../assets/material/CCMaterial');
/**
 * An internal helper class for switching render component's material between normal sprite material and gray sprite material.
 * @class GraySpriteState
 */


var GraySpriteState = cc.Class({
  properties: {
    _normalMaterial: null,

    /**
     * !#en The normal material.
     * !#zh 正常状态的材质。
     * @property normalMaterial
     * @type {Material}
     * @default null
     */
    normalMaterial: {
      get: function get() {
        return this._normalMaterial;
      },
      set: function set(val) {
        this._normalMaterial = val;
        this._updateDisabledState && this._updateDisabledState();
      },
      type: Material,
      tooltip: CC_DEV && 'i18n:COMPONENT.button.normal_material',
      animatable: false
    },
    _grayMaterial: null,

    /**
     * !#en The gray material.
     * !#zh 置灰状态的材质。
     * @property grayMaterial
     * @type {Material}
     * @default null
     */
    grayMaterial: {
      get: function get() {
        return this._grayMaterial;
      },
      set: function set(val) {
        this._grayMaterial = val;
        this._updateDisabledState && this._updateDisabledState();
      },
      type: Material,
      tooltip: CC_DEV && 'i18n:COMPONENT.button.gray_material',
      animatable: false
    }
  },
  _switchGrayMaterial: function _switchGrayMaterial(useGrayMaterial, renderComp) {
    var material;

    if (useGrayMaterial) {
      material = this._grayMaterial;

      if (!material) {
        material = Material.getBuiltinMaterial('2d-gray-sprite');
      }

      material = this._grayMaterial = _materialVariant["default"].create(material, renderComp);
    } else {
      material = this._normalMaterial;

      if (!material) {
        material = Material.getBuiltinMaterial('2d-sprite', renderComp);
      }

      material = this._normalMaterial = _materialVariant["default"].create(material, renderComp);
    }

    renderComp.setMaterial(0, material);
  }
});
module.exports = GraySpriteState;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL2dyYXktc3ByaXRlLXN0YXRlLmpzIl0sIm5hbWVzIjpbIk1hdGVyaWFsIiwicmVxdWlyZSIsIkdyYXlTcHJpdGVTdGF0ZSIsImNjIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwiX25vcm1hbE1hdGVyaWFsIiwibm9ybWFsTWF0ZXJpYWwiLCJnZXQiLCJzZXQiLCJ2YWwiLCJfdXBkYXRlRGlzYWJsZWRTdGF0ZSIsInR5cGUiLCJ0b29sdGlwIiwiQ0NfREVWIiwiYW5pbWF0YWJsZSIsIl9ncmF5TWF0ZXJpYWwiLCJncmF5TWF0ZXJpYWwiLCJfc3dpdGNoR3JheU1hdGVyaWFsIiwidXNlR3JheU1hdGVyaWFsIiwicmVuZGVyQ29tcCIsIm1hdGVyaWFsIiwiZ2V0QnVpbHRpbk1hdGVyaWFsIiwiTWF0ZXJpYWxWYXJpYW50IiwiY3JlYXRlIiwic2V0TWF0ZXJpYWwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQSxJQUFNQSxRQUFRLEdBQUdDLE9BQU8sQ0FBQywrQkFBRCxDQUF4QjtBQUVBOzs7Ozs7QUFJQSxJQUFJQyxlQUFlLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQzNCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsZUFBZSxFQUFFLElBRFQ7O0FBR1I7Ozs7Ozs7QUFPQUMsSUFBQUEsY0FBYyxFQUFFO0FBQ1pDLE1BQUFBLEdBRFksaUJBQ0w7QUFDSCxlQUFPLEtBQUtGLGVBQVo7QUFDSCxPQUhXO0FBSVpHLE1BQUFBLEdBSlksZUFJUEMsR0FKTyxFQUlGO0FBQ04sYUFBS0osZUFBTCxHQUF1QkksR0FBdkI7QUFDQSxhQUFLQyxvQkFBTCxJQUE2QixLQUFLQSxvQkFBTCxFQUE3QjtBQUNILE9BUFc7QUFRWkMsTUFBQUEsSUFBSSxFQUFFWixRQVJNO0FBU1phLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLHVDQVRQO0FBVVpDLE1BQUFBLFVBQVUsRUFBRTtBQVZBLEtBVlI7QUF1QlJDLElBQUFBLGFBQWEsRUFBRSxJQXZCUDs7QUF5QlI7Ozs7Ozs7QUFPQUMsSUFBQUEsWUFBWSxFQUFFO0FBQ1ZULE1BQUFBLEdBRFUsaUJBQ0g7QUFDSCxlQUFPLEtBQUtRLGFBQVo7QUFDSCxPQUhTO0FBSVZQLE1BQUFBLEdBSlUsZUFJTEMsR0FKSyxFQUlBO0FBQ04sYUFBS00sYUFBTCxHQUFxQk4sR0FBckI7QUFDQSxhQUFLQyxvQkFBTCxJQUE2QixLQUFLQSxvQkFBTCxFQUE3QjtBQUNILE9BUFM7QUFRVkMsTUFBQUEsSUFBSSxFQUFFWixRQVJJO0FBU1ZhLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLHFDQVRUO0FBVVZDLE1BQUFBLFVBQVUsRUFBRTtBQVZGO0FBaENOLEdBRGU7QUErQzNCRyxFQUFBQSxtQkEvQzJCLCtCQStDTkMsZUEvQ00sRUErQ1dDLFVBL0NYLEVBK0N1QjtBQUM5QyxRQUFJQyxRQUFKOztBQUNBLFFBQUlGLGVBQUosRUFBcUI7QUFDakJFLE1BQUFBLFFBQVEsR0FBRyxLQUFLTCxhQUFoQjs7QUFDQSxVQUFJLENBQUNLLFFBQUwsRUFBZTtBQUNYQSxRQUFBQSxRQUFRLEdBQUdyQixRQUFRLENBQUNzQixrQkFBVCxDQUE0QixnQkFBNUIsQ0FBWDtBQUNIOztBQUNERCxNQUFBQSxRQUFRLEdBQUcsS0FBS0wsYUFBTCxHQUFxQk8sNEJBQWdCQyxNQUFoQixDQUF1QkgsUUFBdkIsRUFBaUNELFVBQWpDLENBQWhDO0FBQ0gsS0FORCxNQU9LO0FBQ0RDLE1BQUFBLFFBQVEsR0FBRyxLQUFLZixlQUFoQjs7QUFDQSxVQUFJLENBQUNlLFFBQUwsRUFBZTtBQUNYQSxRQUFBQSxRQUFRLEdBQUdyQixRQUFRLENBQUNzQixrQkFBVCxDQUE0QixXQUE1QixFQUF5Q0YsVUFBekMsQ0FBWDtBQUNIOztBQUNEQyxNQUFBQSxRQUFRLEdBQUcsS0FBS2YsZUFBTCxHQUF1QmlCLDRCQUFnQkMsTUFBaEIsQ0FBdUJILFFBQXZCLEVBQWlDRCxVQUFqQyxDQUFsQztBQUNIOztBQUVEQSxJQUFBQSxVQUFVLENBQUNLLFdBQVgsQ0FBdUIsQ0FBdkIsRUFBMEJKLFFBQTFCO0FBQ0g7QUFqRTBCLENBQVQsQ0FBdEI7QUFvRUFLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnpCLGVBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgTWF0ZXJpYWxWYXJpYW50IGZyb20gJy4uL2Fzc2V0cy9tYXRlcmlhbC9tYXRlcmlhbC12YXJpYW50JztcbmNvbnN0IE1hdGVyaWFsID0gcmVxdWlyZSgnLi4vYXNzZXRzL21hdGVyaWFsL0NDTWF0ZXJpYWwnKTtcblxuLyoqXG4gKiBBbiBpbnRlcm5hbCBoZWxwZXIgY2xhc3MgZm9yIHN3aXRjaGluZyByZW5kZXIgY29tcG9uZW50J3MgbWF0ZXJpYWwgYmV0d2VlbiBub3JtYWwgc3ByaXRlIG1hdGVyaWFsIGFuZCBncmF5IHNwcml0ZSBtYXRlcmlhbC5cbiAqIEBjbGFzcyBHcmF5U3ByaXRlU3RhdGVcbiAqL1xubGV0IEdyYXlTcHJpdGVTdGF0ZSA9IGNjLkNsYXNzKHtcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIF9ub3JtYWxNYXRlcmlhbDogbnVsbCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgbm9ybWFsIG1hdGVyaWFsLlxuICAgICAgICAgKiAhI3poIOato+W4uOeKtuaAgeeahOadkOi0qOOAglxuICAgICAgICAgKiBAcHJvcGVydHkgbm9ybWFsTWF0ZXJpYWxcbiAgICAgICAgICogQHR5cGUge01hdGVyaWFsfVxuICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAqL1xuICAgICAgICBub3JtYWxNYXRlcmlhbDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbm9ybWFsTWF0ZXJpYWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ub3JtYWxNYXRlcmlhbCA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVEaXNhYmxlZFN0YXRlICYmIHRoaXMuX3VwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBNYXRlcmlhbCxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYnV0dG9uLm5vcm1hbF9tYXRlcmlhbCcsXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIF9ncmF5TWF0ZXJpYWw6IG51bGwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGdyYXkgbWF0ZXJpYWwuXG4gICAgICAgICAqICEjemgg572u54Gw54q25oCB55qE5p2Q6LSo44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBncmF5TWF0ZXJpYWxcbiAgICAgICAgICogQHR5cGUge01hdGVyaWFsfVxuICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAqL1xuICAgICAgICBncmF5TWF0ZXJpYWw6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dyYXlNYXRlcmlhbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dyYXlNYXRlcmlhbCA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVEaXNhYmxlZFN0YXRlICYmIHRoaXMuX3VwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBNYXRlcmlhbCxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYnV0dG9uLmdyYXlfbWF0ZXJpYWwnLFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG4gIFxuICAgIF9zd2l0Y2hHcmF5TWF0ZXJpYWwgKHVzZUdyYXlNYXRlcmlhbCwgcmVuZGVyQ29tcCkge1xuICAgICAgICBsZXQgbWF0ZXJpYWw7XG4gICAgICAgIGlmICh1c2VHcmF5TWF0ZXJpYWwpIHtcbiAgICAgICAgICAgIG1hdGVyaWFsID0gdGhpcy5fZ3JheU1hdGVyaWFsO1xuICAgICAgICAgICAgaWYgKCFtYXRlcmlhbCkge1xuICAgICAgICAgICAgICAgIG1hdGVyaWFsID0gTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKCcyZC1ncmF5LXNwcml0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0ZXJpYWwgPSB0aGlzLl9ncmF5TWF0ZXJpYWwgPSBNYXRlcmlhbFZhcmlhbnQuY3JlYXRlKG1hdGVyaWFsLCByZW5kZXJDb21wKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1hdGVyaWFsID0gdGhpcy5fbm9ybWFsTWF0ZXJpYWw7XG4gICAgICAgICAgICBpZiAoIW1hdGVyaWFsKSB7XG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwgPSBNYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLXNwcml0ZScsIHJlbmRlckNvbXApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0ZXJpYWwgPSB0aGlzLl9ub3JtYWxNYXRlcmlhbCA9IE1hdGVyaWFsVmFyaWFudC5jcmVhdGUobWF0ZXJpYWwsIHJlbmRlckNvbXApO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJlbmRlckNvbXAuc2V0TWF0ZXJpYWwoMCwgbWF0ZXJpYWwpO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyYXlTcHJpdGVTdGF0ZTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9