
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/components/collider/box-collider-component.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.BoxCollider3D = void 0;

var _instance = require("../../instance");

var _colliderComponent = require("./collider-component");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _temp;

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
var Vec3 = cc.Vec3;
/**
 * !#en
 * Physics box collider
 * !#zh
 * 物理盒子碰撞器
 * @class BoxCollider3D
 * @extends Collider3D
 */

var BoxCollider3D = (_dec = ccclass('cc.BoxCollider3D'), _dec2 = executionOrder(98), _dec3 = menu('i18n:MAIN_MENU.component.physics/Collider/Box 3D'), _dec4 = property({
  type: cc.Vec3
}), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Collider3D) {
  _inheritsLoose(BoxCollider3D, _Collider3D);

  _createClass(BoxCollider3D, [{
    key: "size",
    /// PUBLIC PROPERTY GETTER\SETTER ///

    /**
     * !#en
     * Get or set the size of the box, in local space.
     * !#zh
     * 获取或设置盒的大小。
     * @property {Vec3} size
     */
    get: function get() {
      return this._size;
    },
    set: function set(value) {
      Vec3.copy(this._size, value);

      if (!CC_EDITOR) {
        this.boxShape.size = this._size;
      }
    }
    /**
     * @property {IBoxShape} boxShape
     * @readonly
     */

  }, {
    key: "boxShape",
    get: function get() {
      return this._shape;
    } /// PRIVATE PROPERTY ///

  }]);

  function BoxCollider3D() {
    var _this;

    _this = _Collider3D.call(this) || this;

    _initializerDefineProperty(_this, "_size", _descriptor, _assertThisInitialized(_this));

    if (!CC_EDITOR) {
      _this._shape = (0, _instance.createBoxShape)(_this._size);
    }

    return _this;
  }

  return BoxCollider3D;
}(_colliderComponent.Collider3D), _temp), (_applyDecoratedDescriptor(_class2.prototype, "size", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "size"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_size", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Vec3(1, 1, 1);
  }
})), _class2)) || _class) || _class) || _class) || _class);
exports.BoxCollider3D = BoxCollider3D;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvZnJhbWV3b3JrL2NvbXBvbmVudHMvY29sbGlkZXIvYm94LWNvbGxpZGVyLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6WyJjYyIsIl9kZWNvcmF0b3IiLCJjY2NsYXNzIiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJleGVjdXRpb25PcmRlciIsIm1lbnUiLCJwcm9wZXJ0eSIsIlZlYzMiLCJCb3hDb2xsaWRlcjNEIiwidHlwZSIsIl9zaXplIiwidmFsdWUiLCJjb3B5IiwiQ0NfRURJVE9SIiwiYm94U2hhcGUiLCJzaXplIiwiX3NoYXBlIiwiQ29sbGlkZXIzRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQVNJQSxFQUFFLENBQUNDO0lBTEhDLHlCQUFBQTtJQUNBQyxtQ0FBQUE7SUFDQUMsZ0NBQUFBO0lBQ0FDLHNCQUFBQTtJQUNBQywwQkFBQUE7QUFHSixJQUFNQyxJQUFJLEdBQUdQLEVBQUUsQ0FBQ08sSUFBaEI7QUFFQTs7Ozs7Ozs7O0lBWWFDLHdCQUpaTixPQUFPLENBQUMsa0JBQUQsV0FDUEUsY0FBYyxDQUFDLEVBQUQsV0FDZEMsSUFBSSxDQUFDLGtEQUFELFdBYUFDLFFBQVEsQ0FBQztBQUNORyxFQUFBQSxJQUFJLEVBQUVULEVBQUUsQ0FBQ087QUFESCxDQUFELCtDQVpaSjs7Ozs7QUFHRzs7QUFFQTs7Ozs7Ozt3QkFVbUI7QUFDZixhQUFPLEtBQUtPLEtBQVo7QUFDSDtzQkFFZ0JDLE9BQU87QUFDcEJKLE1BQUFBLElBQUksQ0FBQ0ssSUFBTCxDQUFVLEtBQUtGLEtBQWYsRUFBc0JDLEtBQXRCOztBQUNBLFVBQUksQ0FBQ0UsU0FBTCxFQUFnQjtBQUNaLGFBQUtDLFFBQUwsQ0FBY0MsSUFBZCxHQUFxQixLQUFLTCxLQUExQjtBQUNIO0FBQ0o7QUFFRDs7Ozs7Ozt3QkFJa0M7QUFDOUIsYUFBTyxLQUFLTSxNQUFaO0FBQ0gsTUFFRDs7OztBQUtBLDJCQUFlO0FBQUE7O0FBQ1g7O0FBRFc7O0FBRVgsUUFBSSxDQUFDSCxTQUFMLEVBQWdCO0FBQ1osWUFBS0csTUFBTCxHQUFjLDhCQUFlLE1BQUtOLEtBQXBCLENBQWQ7QUFDSDs7QUFKVTtBQUtkOzs7RUEzQzhCTyw0UEFtQzlCWDs7Ozs7V0FDd0IsSUFBSUMsSUFBSixDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgeyBjcmVhdGVCb3hTaGFwZSB9IGZyb20gJy4uLy4uL2luc3RhbmNlJztcbmltcG9ydCB7IENvbGxpZGVyM0QgfSBmcm9tICcuL2NvbGxpZGVyLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBJQm94U2hhcGUgfSBmcm9tICcuLi8uLi8uLi9zcGVjL2ktcGh5c2ljcy1zaGFwZSc7XG5cbmNvbnN0IHtcbiAgICBjY2NsYXNzLFxuICAgIGV4ZWN1dGVJbkVkaXRNb2RlLFxuICAgIGV4ZWN1dGlvbk9yZGVyLFxuICAgIG1lbnUsXG4gICAgcHJvcGVydHksXG59ID0gY2MuX2RlY29yYXRvcjtcblxuY29uc3QgVmVjMyA9IGNjLlZlYzM7XG5cbi8qKlxuICogISNlblxuICogUGh5c2ljcyBib3ggY29sbGlkZXJcbiAqICEjemhcbiAqIOeJqeeQhuebkuWtkOeisOaSnuWZqFxuICogQGNsYXNzIEJveENvbGxpZGVyM0RcbiAqIEBleHRlbmRzIENvbGxpZGVyM0RcbiAqL1xuQGNjY2xhc3MoJ2NjLkJveENvbGxpZGVyM0QnKVxuQGV4ZWN1dGlvbk9yZGVyKDk4KVxuQG1lbnUoJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5waHlzaWNzL0NvbGxpZGVyL0JveCAzRCcpXG5AZXhlY3V0ZUluRWRpdE1vZGVcbmV4cG9ydCBjbGFzcyBCb3hDb2xsaWRlcjNEIGV4dGVuZHMgQ29sbGlkZXIzRCB7XG5cbiAgICAvLy8gUFVCTElDIFBST1BFUlRZIEdFVFRFUlxcU0VUVEVSIC8vL1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCBvciBzZXQgdGhlIHNpemUgb2YgdGhlIGJveCwgaW4gbG9jYWwgc3BhY2UuXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluaIluiuvue9ruebkueahOWkp+Wwj+OAglxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gc2l6ZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IGNjLlZlYzNcbiAgICB9KVxuICAgIHB1YmxpYyBnZXQgc2l6ZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgc2l6ZSAodmFsdWUpIHtcbiAgICAgICAgVmVjMy5jb3B5KHRoaXMuX3NpemUsIHZhbHVlKTtcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRoaXMuYm94U2hhcGUuc2l6ZSA9IHRoaXMuX3NpemU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge0lCb3hTaGFwZX0gYm94U2hhcGVcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGJveFNoYXBlICgpOiBJQm94U2hhcGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hhcGUgYXMgSUJveFNoYXBlO1xuICAgIH1cblxuICAgIC8vLyBQUklWQVRFIFBST1BFUlRZIC8vL1xuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfc2l6ZTogY2MuVmVjMyA9IG5ldyBWZWMzKDEsIDEsIDEpO1xuXG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgdGhpcy5fc2hhcGUgPSBjcmVhdGVCb3hTaGFwZSh0aGlzLl9zaXplKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=