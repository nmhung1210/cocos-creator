
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/components/constant-force.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.ConstantForce = void 0;

var _rigidBodyComponent = require("./rigid-body-component");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var _cc$_decorator = cc._decorator,
    ccclass = _cc$_decorator.ccclass,
    executeInEditMode = _cc$_decorator.executeInEditMode,
    executionOrder = _cc$_decorator.executionOrder,
    menu = _cc$_decorator.menu,
    property = _cc$_decorator.property,
    requireComponent = _cc$_decorator.requireComponent,
    disallowMultiple = _cc$_decorator.disallowMultiple;
var Vec3 = cc.Vec3;
/**
 * !#en
 * Each frame applies a constant force to a rigid body, depending on the RigidBody3D
 * !#zh
 * 在每帧对一个刚体施加持续的力，依赖 RigidBody3D 组件
 * @class ConstantForce
 * @extends Component
 */

var ConstantForce = (_dec = ccclass('cc.ConstantForce'), _dec2 = executionOrder(98), _dec3 = requireComponent(_rigidBodyComponent.RigidBody3D), _dec4 = menu('i18n:MAIN_MENU.component.physics/Constant Force 3D'), _dec5 = property({
  displayOrder: 0
}), _dec6 = property({
  displayOrder: 1
}), _dec7 = property({
  displayOrder: 2
}), _dec8 = property({
  displayOrder: 3
}), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = disallowMultiple(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_cc$Component) {
  _inheritsLoose(ConstantForce, _cc$Component);

  function ConstantForce() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _cc$Component.call.apply(_cc$Component, [this].concat(args)) || this;
    _this._rigidbody = null;

    _initializerDefineProperty(_this, "_force", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_localForce", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_torque", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_localTorque", _descriptor4, _assertThisInitialized(_this));

    _this._mask = 0;
    return _this;
  }

  var _proto = ConstantForce.prototype;

  _proto.onLoad = function onLoad() {
    if (!CC_PHYSICS_BUILTIN) {
      this._rigidbody = this.node.getComponent(_rigidBodyComponent.RigidBody3D);

      this._maskUpdate(this._force, 1);

      this._maskUpdate(this._localForce, 2);

      this._maskUpdate(this._torque, 4);

      this._maskUpdate(this._localTorque, 8);
    }
  };

  _proto.lateUpdate = function lateUpdate(dt) {
    if (!CC_PHYSICS_BUILTIN) {
      if (this._rigidbody != null && this._mask != 0) {
        if (this._mask & 1) {
          this._rigidbody.applyForce(this._force);
        }

        if (this._mask & 2) {
          this._rigidbody.applyLocalForce(this.localForce);
        }

        if (this._mask & 4) {
          this._rigidbody.applyTorque(this._torque);
        }

        if (this._mask & 8) {
          this._rigidbody.applyLocalTorque(this._localTorque);
        }
      }
    }
  };

  _proto._maskUpdate = function _maskUpdate(t, m) {
    if (Vec3.strictEquals(t, Vec3.ZERO)) {
      this._mask &= ~m;
    } else {
      this._mask |= m;
    }
  };

  _createClass(ConstantForce, [{
    key: "force",

    /**
     * !#en
     * Set the force used in the world coordinate system, use `this.force = otherVec3`.
     * !#zh
     * 设置世界坐标系中使用的力，设置时请用 `this.force = otherVec3` 的方式。
     * @property {Vec3} force
     */
    get: function get() {
      return this._force;
    },
    set: function set(value) {
      Vec3.copy(this._force, value);

      this._maskUpdate(this._force, 1);
    }
    /**
     * !#en
     * Set the force used in the local coordinate system, using `this.localforce = otherVec3`.
     * !#zh
     * 获取和设置本地坐标系中使用的力，设置时请用 `this.localForce = otherVec3` 的方式。
     * @property {Vec3} localForce
     */

  }, {
    key: "localForce",
    get: function get() {
      return this._localForce;
    },
    set: function set(value) {
      Vec3.copy(this._localForce, value);

      this._maskUpdate(this.localForce, 2);
    }
    /**
     * !#en
     * Torque applied to the world orientation
     * !#zh
     * 对世界朝向施加的扭矩
     * @note
     * 设置时请用 this.torque = otherVec3 的方式
     * @property {Vec3} torque
     */

  }, {
    key: "torque",
    get: function get() {
      return this._torque;
    },
    set: function set(value) {
      Vec3.copy(this._torque, value);

      this._maskUpdate(this._torque, 4);
    }
    /**
     * !#en
     * Torque applied to local orientation, using `this.localtorque = otherVec3`.
     * !#zh
     * 对本地朝向施加的扭矩，设置时请用 `this.localTorque = otherVec3` 的方式。
     * @property {Vec3} localTorque
     */

  }, {
    key: "localTorque",
    get: function get() {
      return this._localTorque;
    },
    set: function set(value) {
      Vec3.copy(this._localTorque, value);

      this._maskUpdate(this._localTorque, 8);
    }
  }]);

  return ConstantForce;
}(cc.Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_force", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Vec3();
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_localForce", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Vec3();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_torque", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Vec3();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_localTorque", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Vec3();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "force", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "force"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "localForce", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "localForce"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "torque", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "torque"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "localTorque", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "localTorque"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ConstantForce = ConstantForce;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvZnJhbWV3b3JrL2NvbXBvbmVudHMvY29uc3RhbnQtZm9yY2UudHMiXSwibmFtZXMiOlsiY2MiLCJfZGVjb3JhdG9yIiwiY2NjbGFzcyIsImV4ZWN1dGVJbkVkaXRNb2RlIiwiZXhlY3V0aW9uT3JkZXIiLCJtZW51IiwicHJvcGVydHkiLCJyZXF1aXJlQ29tcG9uZW50IiwiZGlzYWxsb3dNdWx0aXBsZSIsIlZlYzMiLCJDb25zdGFudEZvcmNlIiwiUmlnaWRCb2R5M0QiLCJkaXNwbGF5T3JkZXIiLCJfcmlnaWRib2R5IiwiX21hc2siLCJvbkxvYWQiLCJDQ19QSFlTSUNTX0JVSUxUSU4iLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwiX21hc2tVcGRhdGUiLCJfZm9yY2UiLCJfbG9jYWxGb3JjZSIsIl90b3JxdWUiLCJfbG9jYWxUb3JxdWUiLCJsYXRlVXBkYXRlIiwiZHQiLCJhcHBseUZvcmNlIiwiYXBwbHlMb2NhbEZvcmNlIiwibG9jYWxGb3JjZSIsImFwcGx5VG9ycXVlIiwiYXBwbHlMb2NhbFRvcnF1ZSIsInQiLCJtIiwic3RyaWN0RXF1YWxzIiwiWkVSTyIsInZhbHVlIiwiY29weSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQVVJQSxFQUFFLENBQUNDO0lBUEhDLHlCQUFBQTtJQUNBQyxtQ0FBQUE7SUFDQUMsZ0NBQUFBO0lBQ0FDLHNCQUFBQTtJQUNBQywwQkFBQUE7SUFDQUMsa0NBQUFBO0lBQ0FDLGtDQUFBQTtBQUVKLElBQU1DLElBQUksR0FBR1QsRUFBRSxDQUFDUyxJQUFoQjtBQUVBOzs7Ozs7Ozs7SUFjYUMsd0JBTlpSLE9BQU8sQ0FBQyxrQkFBRCxXQUNQRSxjQUFjLENBQUMsRUFBRCxXQUNkRyxnQkFBZ0IsQ0FBQ0ksK0JBQUQsV0FDaEJOLElBQUksQ0FBQyxvREFBRCxXQTRCQUMsUUFBUSxDQUFDO0FBQ05NLEVBQUFBLFlBQVksRUFBRTtBQURSLENBQUQsV0FtQlJOLFFBQVEsQ0FBQztBQUNOTSxFQUFBQSxZQUFZLEVBQUU7QUFEUixDQUFELFdBcUJSTixRQUFRLENBQUM7QUFDTk0sRUFBQUEsWUFBWSxFQUFFO0FBRFIsQ0FBRCxXQW1CUk4sUUFBUSxDQUFDO0FBQ05NLEVBQUFBLFlBQVksRUFBRTtBQURSLENBQUQsOERBdEZaSiwwQkFDQUw7Ozs7Ozs7Ozs7O1VBR1dVLGFBQWlDOzs7Ozs7Ozs7O1VBY2pDQyxRQUFnQjs7Ozs7O1NBZ0ZqQkMsU0FBUCxrQkFBaUI7QUFDYixRQUFJLENBQUNDLGtCQUFMLEVBQXlCO0FBQ3JCLFdBQUtILFVBQUwsR0FBa0IsS0FBS0ksSUFBTCxDQUFVQyxZQUFWLENBQXVCUCwrQkFBdkIsQ0FBbEI7O0FBQ0EsV0FBS1EsV0FBTCxDQUFpQixLQUFLQyxNQUF0QixFQUE4QixDQUE5Qjs7QUFDQSxXQUFLRCxXQUFMLENBQWlCLEtBQUtFLFdBQXRCLEVBQW1DLENBQW5DOztBQUNBLFdBQUtGLFdBQUwsQ0FBaUIsS0FBS0csT0FBdEIsRUFBK0IsQ0FBL0I7O0FBQ0EsV0FBS0gsV0FBTCxDQUFpQixLQUFLSSxZQUF0QixFQUFvQyxDQUFwQztBQUNIO0FBQ0o7O1NBRU1DLGFBQVAsb0JBQW1CQyxFQUFuQixFQUErQjtBQUMzQixRQUFJLENBQUNULGtCQUFMLEVBQXlCO0FBQ3JCLFVBQUksS0FBS0gsVUFBTCxJQUFtQixJQUFuQixJQUEyQixLQUFLQyxLQUFMLElBQWMsQ0FBN0MsRUFBZ0Q7QUFDNUMsWUFBSSxLQUFLQSxLQUFMLEdBQWEsQ0FBakIsRUFBb0I7QUFDaEIsZUFBS0QsVUFBTCxDQUFnQmEsVUFBaEIsQ0FBMkIsS0FBS04sTUFBaEM7QUFDSDs7QUFFRCxZQUFJLEtBQUtOLEtBQUwsR0FBYSxDQUFqQixFQUFvQjtBQUNoQixlQUFLRCxVQUFMLENBQWdCYyxlQUFoQixDQUFnQyxLQUFLQyxVQUFyQztBQUNIOztBQUVELFlBQUksS0FBS2QsS0FBTCxHQUFhLENBQWpCLEVBQW9CO0FBQ2hCLGVBQUtELFVBQUwsQ0FBZ0JnQixXQUFoQixDQUE0QixLQUFLUCxPQUFqQztBQUNIOztBQUVELFlBQUksS0FBS1IsS0FBTCxHQUFhLENBQWpCLEVBQW9CO0FBQ2hCLGVBQUtELFVBQUwsQ0FBZ0JpQixnQkFBaEIsQ0FBaUMsS0FBS1AsWUFBdEM7QUFDSDtBQUNKO0FBQ0o7QUFDSjs7U0FFT0osY0FBUixxQkFBcUJZLENBQXJCLEVBQWlDQyxDQUFqQyxFQUE0QztBQUN4QyxRQUFJdkIsSUFBSSxDQUFDd0IsWUFBTCxDQUFrQkYsQ0FBbEIsRUFBcUJ0QixJQUFJLENBQUN5QixJQUExQixDQUFKLEVBQXFDO0FBQ2pDLFdBQUtwQixLQUFMLElBQWMsQ0FBQ2tCLENBQWY7QUFDSCxLQUZELE1BRU87QUFDSCxXQUFLbEIsS0FBTCxJQUFja0IsQ0FBZDtBQUNIO0FBQ0o7Ozs7O0FBcEhEOzs7Ozs7O3dCQVVvQjtBQUNoQixhQUFPLEtBQUtaLE1BQVo7QUFDSDtzQkFFaUJlLE9BQWdCO0FBQzlCMUIsTUFBQUEsSUFBSSxDQUFDMkIsSUFBTCxDQUFVLEtBQUtoQixNQUFmLEVBQXVCZSxLQUF2Qjs7QUFDQSxXQUFLaEIsV0FBTCxDQUFpQixLQUFLQyxNQUF0QixFQUE4QixDQUE5QjtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7d0JBVXlCO0FBQ3JCLGFBQU8sS0FBS0MsV0FBWjtBQUNIO3NCQUVzQmMsT0FBZ0I7QUFDbkMxQixNQUFBQSxJQUFJLENBQUMyQixJQUFMLENBQVUsS0FBS2YsV0FBZixFQUE0QmMsS0FBNUI7O0FBQ0EsV0FBS2hCLFdBQUwsQ0FBaUIsS0FBS1MsVUFBdEIsRUFBa0MsQ0FBbEM7QUFDSDtBQUVEOzs7Ozs7Ozs7Ozs7d0JBWXFCO0FBQ2pCLGFBQU8sS0FBS04sT0FBWjtBQUNIO3NCQUVrQmEsT0FBZ0I7QUFDL0IxQixNQUFBQSxJQUFJLENBQUMyQixJQUFMLENBQVUsS0FBS2QsT0FBZixFQUF3QmEsS0FBeEI7O0FBQ0EsV0FBS2hCLFdBQUwsQ0FBaUIsS0FBS0csT0FBdEIsRUFBK0IsQ0FBL0I7QUFDSDtBQUVEOzs7Ozs7Ozs7O3dCQVUwQjtBQUN0QixhQUFPLEtBQUtDLFlBQVo7QUFDSDtzQkFFdUJZLE9BQWdCO0FBQ3BDMUIsTUFBQUEsSUFBSSxDQUFDMkIsSUFBTCxDQUFVLEtBQUtiLFlBQWYsRUFBNkJZLEtBQTdCOztBQUNBLFdBQUtoQixXQUFMLENBQWlCLEtBQUtJLFlBQXRCLEVBQW9DLENBQXBDO0FBQ0g7Ozs7RUE5RjhCdkIsRUFBRSxDQUFDcUMsMkZBSWpDL0I7Ozs7O1dBQ2tDLElBQUlHLElBQUo7O2dGQUVsQ0g7Ozs7O1dBQ3VDLElBQUlHLElBQUo7OzRFQUV2Q0g7Ozs7O1dBQ21DLElBQUlHLElBQUo7O2lGQUVuQ0g7Ozs7O1dBQ3dDLElBQUlHLElBQUoiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IHsgUmlnaWRCb2R5M0QgfSBmcm9tICcuL3JpZ2lkLWJvZHktY29tcG9uZW50JztcblxuY29uc3Qge1xuICAgIGNjY2xhc3MsXG4gICAgZXhlY3V0ZUluRWRpdE1vZGUsXG4gICAgZXhlY3V0aW9uT3JkZXIsXG4gICAgbWVudSxcbiAgICBwcm9wZXJ0eSxcbiAgICByZXF1aXJlQ29tcG9uZW50LFxuICAgIGRpc2FsbG93TXVsdGlwbGUsXG59ID0gY2MuX2RlY29yYXRvcjtcbmNvbnN0IFZlYzMgPSBjYy5WZWMzO1xuXG4vKipcbiAqICEjZW5cbiAqIEVhY2ggZnJhbWUgYXBwbGllcyBhIGNvbnN0YW50IGZvcmNlIHRvIGEgcmlnaWQgYm9keSwgZGVwZW5kaW5nIG9uIHRoZSBSaWdpZEJvZHkzRFxuICogISN6aFxuICog5Zyo5q+P5bin5a+55LiA5Liq5Yia5L2T5pa95Yqg5oyB57ut55qE5Yqb77yM5L6d6LWWIFJpZ2lkQm9keTNEIOe7hOS7tlxuICogQGNsYXNzIENvbnN0YW50Rm9yY2VcbiAqIEBleHRlbmRzIENvbXBvbmVudFxuICovXG5AY2NjbGFzcygnY2MuQ29uc3RhbnRGb3JjZScpXG5AZXhlY3V0aW9uT3JkZXIoOTgpXG5AcmVxdWlyZUNvbXBvbmVudChSaWdpZEJvZHkzRClcbkBtZW51KCdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucGh5c2ljcy9Db25zdGFudCBGb3JjZSAzRCcpXG5AZGlzYWxsb3dNdWx0aXBsZVxuQGV4ZWN1dGVJbkVkaXRNb2RlXG5leHBvcnQgY2xhc3MgQ29uc3RhbnRGb3JjZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIF9yaWdpZGJvZHk6IFJpZ2lkQm9keTNEIHwgbnVsbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9mb3JjZTogY2MuVmVjMyA9IG5ldyBWZWMzKCk7XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9sb2NhbEZvcmNlOiBjYy5WZWMzID0gbmV3IFZlYzMoKTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3RvcnF1ZTogY2MuVmVjMyA9IG5ldyBWZWMzKCk7XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9sb2NhbFRvcnF1ZTogY2MuVmVjMyA9IG5ldyBWZWMzKCk7XG5cbiAgICBwcml2YXRlIF9tYXNrOiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldCB0aGUgZm9yY2UgdXNlZCBpbiB0aGUgd29ybGQgY29vcmRpbmF0ZSBzeXN0ZW0sIHVzZSBgdGhpcy5mb3JjZSA9IG90aGVyVmVjM2AuXG4gICAgICogISN6aFxuICAgICAqIOiuvue9ruS4lueVjOWdkOagh+ezu+S4reS9v+eUqOeahOWKm++8jOiuvue9ruaXtuivt+eUqCBgdGhpcy5mb3JjZSA9IG90aGVyVmVjM2Ag55qE5pa55byP44CCXG4gICAgICogQHByb3BlcnR5IHtWZWMzfSBmb3JjZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlPcmRlcjogMFxuICAgIH0pXG4gICAgcHVibGljIGdldCBmb3JjZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JjZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGZvcmNlICh2YWx1ZTogY2MuVmVjMykge1xuICAgICAgICBWZWMzLmNvcHkodGhpcy5fZm9yY2UsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5fbWFza1VwZGF0ZSh0aGlzLl9mb3JjZSwgMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldCB0aGUgZm9yY2UgdXNlZCBpbiB0aGUgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0sIHVzaW5nIGB0aGlzLmxvY2FsZm9yY2UgPSBvdGhlclZlYzNgLlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5blkozorr7nva7mnKzlnLDlnZDmoIfns7vkuK3kvb/nlKjnmoTlipvvvIzorr7nva7ml7bor7fnlKggYHRoaXMubG9jYWxGb3JjZSA9IG90aGVyVmVjM2Ag55qE5pa55byP44CCXG4gICAgICogQHByb3BlcnR5IHtWZWMzfSBsb2NhbEZvcmNlXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgZGlzcGxheU9yZGVyOiAxXG4gICAgfSlcbiAgICBwdWJsaWMgZ2V0IGxvY2FsRm9yY2UgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxGb3JjZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGxvY2FsRm9yY2UgKHZhbHVlOiBjYy5WZWMzKSB7XG4gICAgICAgIFZlYzMuY29weSh0aGlzLl9sb2NhbEZvcmNlLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuX21hc2tVcGRhdGUodGhpcy5sb2NhbEZvcmNlLCAyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVG9ycXVlIGFwcGxpZWQgdG8gdGhlIHdvcmxkIG9yaWVudGF0aW9uXG4gICAgICogISN6aFxuICAgICAqIOWvueS4lueVjOacneWQkeaWveWKoOeahOaJreefqVxuICAgICAqIEBub3RlXG4gICAgICog6K6+572u5pe26K+355SoIHRoaXMudG9ycXVlID0gb3RoZXJWZWMzIOeahOaWueW8j1xuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gdG9ycXVlXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgZGlzcGxheU9yZGVyOiAyXG4gICAgfSlcbiAgICBwdWJsaWMgZ2V0IHRvcnF1ZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90b3JxdWU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCB0b3JxdWUgKHZhbHVlOiBjYy5WZWMzKSB7XG4gICAgICAgIFZlYzMuY29weSh0aGlzLl90b3JxdWUsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5fbWFza1VwZGF0ZSh0aGlzLl90b3JxdWUsIDQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUb3JxdWUgYXBwbGllZCB0byBsb2NhbCBvcmllbnRhdGlvbiwgdXNpbmcgYHRoaXMubG9jYWx0b3JxdWUgPSBvdGhlclZlYzNgLlxuICAgICAqICEjemhcbiAgICAgKiDlr7nmnKzlnLDmnJ3lkJHmlr3liqDnmoTmia3nn6nvvIzorr7nva7ml7bor7fnlKggYHRoaXMubG9jYWxUb3JxdWUgPSBvdGhlclZlYzNgIOeahOaWueW8j+OAglxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gbG9jYWxUb3JxdWVcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBkaXNwbGF5T3JkZXI6IDNcbiAgICB9KVxuICAgIHB1YmxpYyBnZXQgbG9jYWxUb3JxdWUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxUb3JxdWU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBsb2NhbFRvcnF1ZSAodmFsdWU6IGNjLlZlYzMpIHtcbiAgICAgICAgVmVjMy5jb3B5KHRoaXMuX2xvY2FsVG9ycXVlLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuX21hc2tVcGRhdGUodGhpcy5fbG9jYWxUb3JxdWUsIDgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkxvYWQgKCkge1xuICAgICAgICBpZiAoIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xuICAgICAgICAgICAgdGhpcy5fcmlnaWRib2R5ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChSaWdpZEJvZHkzRCk7XG4gICAgICAgICAgICB0aGlzLl9tYXNrVXBkYXRlKHRoaXMuX2ZvcmNlLCAxKTtcbiAgICAgICAgICAgIHRoaXMuX21hc2tVcGRhdGUodGhpcy5fbG9jYWxGb3JjZSwgMik7XG4gICAgICAgICAgICB0aGlzLl9tYXNrVXBkYXRlKHRoaXMuX3RvcnF1ZSwgNCk7XG4gICAgICAgICAgICB0aGlzLl9tYXNrVXBkYXRlKHRoaXMuX2xvY2FsVG9ycXVlLCA4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBsYXRlVXBkYXRlIChkdDogbnVtYmVyKSB7XG4gICAgICAgIGlmICghQ0NfUEhZU0lDU19CVUlMVElOKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcmlnaWRib2R5ICE9IG51bGwgJiYgdGhpcy5fbWFzayAhPSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21hc2sgJiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JpZ2lkYm9keS5hcHBseUZvcmNlKHRoaXMuX2ZvcmNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFzayAmIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmlnaWRib2R5LmFwcGx5TG9jYWxGb3JjZSh0aGlzLmxvY2FsRm9yY2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXNrICYgNCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yaWdpZGJvZHkuYXBwbHlUb3JxdWUodGhpcy5fdG9ycXVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFzayAmIDgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmlnaWRib2R5LmFwcGx5TG9jYWxUb3JxdWUodGhpcy5fbG9jYWxUb3JxdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX21hc2tVcGRhdGUgKHQ6IGNjLlZlYzMsIG06IG51bWJlcikge1xuICAgICAgICBpZiAoVmVjMy5zdHJpY3RFcXVhbHModCwgVmVjMy5aRVJPKSkge1xuICAgICAgICAgICAgdGhpcy5fbWFzayAmPSB+bTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21hc2sgfD0gbTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9