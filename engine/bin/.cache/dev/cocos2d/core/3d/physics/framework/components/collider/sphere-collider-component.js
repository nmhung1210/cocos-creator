
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/components/collider/sphere-collider-component.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.SphereCollider3D = void 0;

var _instance = require("../../instance");

var _colliderComponent = require("./collider-component");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var _cc$_decorator = cc._decorator,
    ccclass = _cc$_decorator.ccclass,
    executeInEditMode = _cc$_decorator.executeInEditMode,
    executionOrder = _cc$_decorator.executionOrder,
    menu = _cc$_decorator.menu,
    property = _cc$_decorator.property;
/**
 * !#en
 * Physics sphere collider
 * !#zh
 * 物理球碰撞器
 * @class SphereCollider3D
 * @extends Collider3D
 */

var SphereCollider3D = (_dec = ccclass('cc.SphereCollider3D'), _dec2 = executionOrder(98), _dec3 = menu('i18n:MAIN_MENU.component.physics/Collider/Sphere 3D'), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Collider3D) {
  _inheritsLoose(SphereCollider3D, _Collider3D);

  _createClass(SphereCollider3D, [{
    key: "radius",
    /// PUBLIC PROPERTY GETTER\SETTER ///

    /**
     * !#en
     * Get or set the radius of the sphere.
     * !#zh
     * 获取或设置球的半径。
     * @property {number} radius
     */
    get: function get() {
      return this._radius;
    },
    set: function set(value) {
      this._radius = value;

      if (!CC_EDITOR) {
        this.sphereShape.radius = this._radius;
      }
    }
    /**
     * @property {ISphereShape} sphereShape
     */

  }, {
    key: "sphereShape",
    get: function get() {
      return this._shape;
    } /// PRIVATE PROPERTY ///

  }]);

  function SphereCollider3D() {
    var _this;

    _this = _Collider3D.call(this) || this;

    _initializerDefineProperty(_this, "_radius", _descriptor, _assertThisInitialized(_this));

    if (!CC_EDITOR) {
      _this._shape = (0, _instance.createSphereShape)(_this._radius);
    }

    return _this;
  }

  return SphereCollider3D;
}(_colliderComponent.Collider3D), _temp), (_applyDecoratedDescriptor(_class2.prototype, "radius", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "radius"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_radius", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.5;
  }
})), _class2)) || _class) || _class) || _class) || _class);
exports.SphereCollider3D = SphereCollider3D;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvZnJhbWV3b3JrL2NvbXBvbmVudHMvY29sbGlkZXIvc3BoZXJlLWNvbGxpZGVyLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6WyJjYyIsIl9kZWNvcmF0b3IiLCJjY2NsYXNzIiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJleGVjdXRpb25PcmRlciIsIm1lbnUiLCJwcm9wZXJ0eSIsIlNwaGVyZUNvbGxpZGVyM0QiLCJfcmFkaXVzIiwidmFsdWUiLCJDQ19FRElUT1IiLCJzcGhlcmVTaGFwZSIsInJhZGl1cyIsIl9zaGFwZSIsIkNvbGxpZGVyM0QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkFTSUEsRUFBRSxDQUFDQztJQUxIQyx5QkFBQUE7SUFDQUMsbUNBQUFBO0lBQ0FDLGdDQUFBQTtJQUNBQyxzQkFBQUE7SUFDQUMsMEJBQUFBO0FBR0o7Ozs7Ozs7OztJQVlhQywyQkFKWkwsT0FBTyxDQUFDLHFCQUFELFdBQ1BFLGNBQWMsQ0FBQyxFQUFELFdBQ2RDLElBQUksQ0FBQyxxREFBRCwrQ0FDSkY7Ozs7O0FBR0c7O0FBRUE7Ozs7Ozs7d0JBUXFCO0FBQ2pCLGFBQU8sS0FBS0ssT0FBWjtBQUNIO3NCQUVrQkMsT0FBTztBQUN0QixXQUFLRCxPQUFMLEdBQWVDLEtBQWY7O0FBQ0EsVUFBSSxDQUFDQyxTQUFMLEVBQWdCO0FBQ1osYUFBS0MsV0FBTCxDQUFpQkMsTUFBakIsR0FBMEIsS0FBS0osT0FBL0I7QUFDSDtBQUNKO0FBRUQ7Ozs7Ozt3QkFHd0M7QUFDcEMsYUFBTyxLQUFLSyxNQUFaO0FBQ0gsTUFFRDs7OztBQUtBLDhCQUFlO0FBQUE7O0FBQ1g7O0FBRFc7O0FBRVgsUUFBSSxDQUFDSCxTQUFMLEVBQWdCO0FBQ1osWUFBS0csTUFBTCxHQUFjLGlDQUFrQixNQUFLTCxPQUF2QixDQUFkO0FBQ0g7O0FBSlU7QUFLZDs7O0VBeENpQ00saUdBV2pDUixvS0FxQkFBOzs7OztXQUN5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgeyBjcmVhdGVTcGhlcmVTaGFwZSB9IGZyb20gJy4uLy4uL2luc3RhbmNlJztcbmltcG9ydCB7IENvbGxpZGVyM0QgfSBmcm9tICcuL2NvbGxpZGVyLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBJU3BoZXJlU2hhcGUgfSBmcm9tICcuLi8uLi8uLi9zcGVjL2ktcGh5c2ljcy1zaGFwZSc7XG5cbmNvbnN0IHtcbiAgICBjY2NsYXNzLFxuICAgIGV4ZWN1dGVJbkVkaXRNb2RlLFxuICAgIGV4ZWN1dGlvbk9yZGVyLFxuICAgIG1lbnUsXG4gICAgcHJvcGVydHksXG59ID0gY2MuX2RlY29yYXRvcjtcblxuLyoqXG4gKiAhI2VuXG4gKiBQaHlzaWNzIHNwaGVyZSBjb2xsaWRlclxuICogISN6aFxuICog54mp55CG55CD56Kw5pKe5ZmoXG4gKiBAY2xhc3MgU3BoZXJlQ29sbGlkZXIzRFxuICogQGV4dGVuZHMgQ29sbGlkZXIzRFxuICovXG5AY2NjbGFzcygnY2MuU3BoZXJlQ29sbGlkZXIzRCcpXG5AZXhlY3V0aW9uT3JkZXIoOTgpXG5AbWVudSgnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnBoeXNpY3MvQ29sbGlkZXIvU3BoZXJlIDNEJylcbkBleGVjdXRlSW5FZGl0TW9kZVxuZXhwb3J0IGNsYXNzIFNwaGVyZUNvbGxpZGVyM0QgZXh0ZW5kcyBDb2xsaWRlcjNEIHtcblxuICAgIC8vLyBQVUJMSUMgUFJPUEVSVFkgR0VUVEVSXFxTRVRURVIgLy8vXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IG9yIHNldCB0aGUgcmFkaXVzIG9mIHRoZSBzcGhlcmUuXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluaIluiuvue9rueQg+eahOWNiuW+hOOAglxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSByYWRpdXNcbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBwdWJsaWMgZ2V0IHJhZGl1cyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yYWRpdXM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCByYWRpdXMgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IHZhbHVlO1xuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgdGhpcy5zcGhlcmVTaGFwZS5yYWRpdXMgPSB0aGlzLl9yYWRpdXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge0lTcGhlcmVTaGFwZX0gc3BoZXJlU2hhcGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHNwaGVyZVNoYXBlICgpOiBJU3BoZXJlU2hhcGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hhcGUgYXMgSVNwaGVyZVNoYXBlO1xuICAgIH1cblxuICAgIC8vLyBQUklWQVRFIFBST1BFUlRZIC8vL1xuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfcmFkaXVzOiBudW1iZXIgPSAwLjU7XG5cbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB0aGlzLl9zaGFwZSA9IGNyZWF0ZVNwaGVyZVNoYXBlKHRoaXMuX3JhZGl1cyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==