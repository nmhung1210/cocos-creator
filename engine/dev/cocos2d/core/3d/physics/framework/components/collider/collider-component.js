
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/components/collider/collider-component.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.Collider3D = void 0;

var _physicsMaterial = require("../../assets/physics-material");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var _cc$_decorator = cc._decorator,
    ccclass = _cc$_decorator.ccclass,
    property = _cc$_decorator.property;
var Vec3 = cc.Vec3;
/**
 * !#en
 * The base class of the collider.
 * !#zh
 * 碰撞器的基类。
 * @class Collider3D
 * @extends Component
 * @uses EventTarget
 */

var Collider3D = (_dec = ccclass('cc.Collider3D'), _dec2 = property({
  type: _physicsMaterial.PhysicsMaterial,
  displayName: 'Material',
  displayOrder: -1
}), _dec3 = property({
  displayOrder: 0
}), _dec4 = property({
  type: cc.Vec3,
  displayOrder: 1
}), _dec5 = property({
  type: _physicsMaterial.PhysicsMaterial
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_cc$Component) {
  _inheritsLoose(Collider3D, _cc$Component);

  _createClass(Collider3D, [{
    key: "sharedMaterial",

    /**
     * @property {PhysicsMaterial} sharedMaterial
     */
    get: function get() {
      return this._material;
    },
    set: function set(value) {
      this.material = value;
    }
  }, {
    key: "material",
    get: function get() {
      if (!CC_PHYSICS_BUILTIN) {
        if (this._isSharedMaterial && this._material != null) {
          this._material.off('physics_material_update', this._updateMaterial, this);

          this._material = this._material.clone();

          this._material.on('physics_material_update', this._updateMaterial, this);

          this._isSharedMaterial = false;
        }
      }

      return this._material;
    },
    set: function set(value) {
      if (CC_EDITOR || CC_PHYSICS_BUILTIN) {
        this._material = value;
        return;
      }

      if (value != null && this._material != null) {
        if (this._material._uuid != value._uuid) {
          this._material.off('physics_material_update', this._updateMaterial, this);

          value.on('physics_material_update', this._updateMaterial, this);
          this._isSharedMaterial = false;
          this._material = value;
        }
      } else if (value != null && this._material == null) {
        value.on('physics_material_update', this._updateMaterial, this);
        this._material = value;
      } else if (value == null && this._material != null) {
        this._material.off('physics_material_update', this._updateMaterial, this);

        this._material = value;
      }

      this._updateMaterial();
    }
    /**
     * !#en
     * get or set the collider is trigger, this will be always trigger if using builtin.
     * !#zh
     * 获取或设置碰撞器是否为触发器。
     * @property {Boolean} isTrigger
     */

  }, {
    key: "isTrigger",
    get: function get() {
      return this._isTrigger;
    },
    set: function set(value) {
      this._isTrigger = value;

      if (!CC_EDITOR) {
        this._shape.isTrigger = this._isTrigger;
      }
    }
    /**
     * !#en
     * get or set the center of the collider, in local space.
     * !#zh
     * 获取或设置碰撞器的中心点。
     * @property {Vec3} center
     */

  }, {
    key: "center",
    get: function get() {
      return this._center;
    },
    set: function set(value) {
      Vec3.copy(this._center, value);

      if (!CC_EDITOR) {
        this._shape.center = this._center;
      }
    }
    /**
     * !#en
     * get the collider attached rigidbody, this may be null.
     * !#zh
     * 获取碰撞器所绑定的刚体组件，可能为 null。
     * @property {RigidBody3D|null} attachedRigidbody
     * @readonly
     */

  }, {
    key: "attachedRigidbody",
    get: function get() {
      return this.shape.attachedRigidBody;
    }
    /**
     * !#en
     * get collider shape.
     * !#zh
     * 获取碰撞器形状。
     * @property {IBaseShape} shape
     * @readonly
     */

  }, {
    key: "shape",
    get: function get() {
      return this._shape;
    } /// PRIVATE PROPERTY ///

  }, {
    key: "_assertOnload",
    get: function get() {
      var r = this._isOnLoadCalled == 0;

      if (r) {
        cc.error('Physics Error: Please make sure that the node has been added to the scene');
      }

      return !r;
    }
  }]);

  function Collider3D() {
    var _this;

    _this = _cc$Component.call(this) || this;
    _this._shape = void 0;
    _this._isSharedMaterial = true;

    _initializerDefineProperty(_this, "_material", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_isTrigger", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_center", _descriptor3, _assertThisInitialized(_this));

    cc.EventTarget.call(_assertThisInitialized(_this));
    return _this;
  } /// EVENT INTERFACE ///

  /**
   * !#en
   * Register an callback of a specific event type on the EventTarget.
   * This type of event should be triggered via `emit`.
   * !#zh
   * 注册事件目标的特定事件类型回调。这种类型的事件应该被 `emit` 触发。
   *
   * @method on
   * @param {String} type - The type of collider event can be `trigger-enter`, `trigger-stay`, `trigger-exit` or `collision-enter`, `collision-stay`, `collision-exit`.
   * @param {Function} callback - The callback that will be invoked when the event is dispatched.
   * The callback is ignored if it is a duplicate (the callbacks are unique).
   * @param {ITriggerEvent|ICollisionEvent} callback.event Callback function argument
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null.
   * @return {Function} - Just returns the incoming callback so you can save the anonymous function easier.
   * @typescript
   * on<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean): T
   * @example
   * eventTarget.on('fire', function (event) {
   *     // event is ITriggerEvent or ICollisionEvent
   * }, node);
   */


  var _proto = Collider3D.prototype;

  _proto.on = function on(type, callback, target, useCapture) {}
  /**
   * !#en
   * Removes the listeners previously registered with the same type, callback, target and or useCapture,
   * if only type is passed as parameter, all listeners registered with that type will be removed.
   * !#zh
   * 删除之前用同类型，回调，目标或 useCapture 注册的事件监听器，如果只传递 type，将会删除 type 类型的所有事件监听器。
   *
   * @method off
   * @param {String} type - The type of collider event can be `trigger-enter`, `trigger-stay`, `trigger-exit` or `collision-enter`, `collision-stay`, `collision-exit`.
   * @param {Function} [callback] - The callback to remove.
   * @param {Object} [target] - The target (this object) to invoke the callback, if it's not given, only callback without target will be removed.
   * @example
   * // register fire eventListener
   * var callback = eventTarget.on('fire', function () {
   *     cc.log("fire in the hole");
   * }, target);
   * // remove fire event listener
   * eventTarget.off('fire', callback, target);
   * // remove all fire event listeners
   * eventTarget.off('fire');
   */
  ;

  _proto.off = function off(type, callback, target) {}
  /**
   * !#en
   * Register an callback of a specific event type on the EventTarget,
   * the callback will remove itself after the first time it is triggered.
   * !#zh
   * 注册事件目标的特定事件类型回调，回调会在第一时间被触发后删除自身。
   *
   * @method once
   * @param {String} type - The type of collider event can be `trigger-enter`, `trigger-stay`, `trigger-exit` or `collision-enter`, `collision-stay`, `collision-exit`.
   * @param {Function} callback - The callback that will be invoked when the event is dispatched.
   * The callback is ignored if it is a duplicate (the callbacks are unique).
   * @param {ITriggerEvent|ICollisionEvent} callback.event callback function argument.
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null.
   * @example
   * eventTarget.once('fire', function (event) {
   *     // event is ITriggerEvent or ICollisionEvent
   * }, node);
   */
  ;

  _proto.once = function once(type, callback, target) {}
  /* declare for typescript tip */
  ;

  _proto.emit = function emit(key) {} /// COMPONENT LIFECYCLE ///
  ;

  _proto.__preload = function __preload() {
    if (!CC_EDITOR) {
      this._shape.__preload(this);
    }
  };

  _proto.onLoad = function onLoad() {
    if (!CC_EDITOR) {
      if (!CC_PHYSICS_BUILTIN) {
        this.sharedMaterial = this._material == null ? cc.director.getPhysics3DManager().defaultMaterial : this._material;
      }

      this._shape.onLoad();
    }
  };

  _proto.onEnable = function onEnable() {
    if (!CC_EDITOR) {
      this._shape.onEnable();
    }
  };

  _proto.onDisable = function onDisable() {
    if (!CC_EDITOR) {
      this._shape.onDisable();
    }
  };

  _proto.onDestroy = function onDestroy() {
    if (!CC_EDITOR) {
      this._shape.onDestroy();
    }
  };

  _proto._updateMaterial = function _updateMaterial() {
    if (!CC_EDITOR) {
      this._shape.material = this._material;
    }
  };

  return Collider3D;
}(cc.Component), _temp), (_applyDecoratedDescriptor(_class2.prototype, "sharedMaterial", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "sharedMaterial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isTrigger", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "isTrigger"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "center", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "center"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_material", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_isTrigger", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_center", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Vec3();
  }
})), _class2)) || _class);
exports.Collider3D = Collider3D;
cc.js.mixin(Collider3D.prototype, cc.EventTarget.prototype);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvZnJhbWV3b3JrL2NvbXBvbmVudHMvY29sbGlkZXIvY29sbGlkZXItY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbImNjIiwiX2RlY29yYXRvciIsImNjY2xhc3MiLCJwcm9wZXJ0eSIsIlZlYzMiLCJDb2xsaWRlcjNEIiwidHlwZSIsIlBoeXNpY3NNYXRlcmlhbCIsImRpc3BsYXlOYW1lIiwiZGlzcGxheU9yZGVyIiwiX21hdGVyaWFsIiwidmFsdWUiLCJtYXRlcmlhbCIsIkNDX1BIWVNJQ1NfQlVJTFRJTiIsIl9pc1NoYXJlZE1hdGVyaWFsIiwib2ZmIiwiX3VwZGF0ZU1hdGVyaWFsIiwiY2xvbmUiLCJvbiIsIkNDX0VESVRPUiIsIl91dWlkIiwiX2lzVHJpZ2dlciIsIl9zaGFwZSIsImlzVHJpZ2dlciIsIl9jZW50ZXIiLCJjb3B5IiwiY2VudGVyIiwic2hhcGUiLCJhdHRhY2hlZFJpZ2lkQm9keSIsInIiLCJfaXNPbkxvYWRDYWxsZWQiLCJlcnJvciIsIkV2ZW50VGFyZ2V0IiwiY2FsbCIsImNhbGxiYWNrIiwidGFyZ2V0IiwidXNlQ2FwdHVyZSIsIm9uY2UiLCJlbWl0Iiwia2V5IiwiX19wcmVsb2FkIiwib25Mb2FkIiwic2hhcmVkTWF0ZXJpYWwiLCJkaXJlY3RvciIsImdldFBoeXNpY3MzRE1hbmFnZXIiLCJkZWZhdWx0TWF0ZXJpYWwiLCJvbkVuYWJsZSIsIm9uRGlzYWJsZSIsIm9uRGVzdHJveSIsIkNvbXBvbmVudCIsImpzIiwibWl4aW4iLCJwcm90b3R5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkE7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkFHNEJBLEVBQUUsQ0FBQ0M7SUFBeEJDLHlCQUFBQTtJQUFTQywwQkFBQUE7QUFDaEIsSUFBTUMsSUFBSSxHQUFHSixFQUFFLENBQUNJLElBQWhCO0FBRUE7Ozs7Ozs7Ozs7SUFVYUMscUJBRFpILE9BQU8sQ0FBQyxlQUFELFdB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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgeyBDb2xsaXNpb25DYWxsYmFjaywgQ29sbGlzaW9uRXZlbnRUeXBlLCBUcmlnZ2VyQ2FsbGJhY2ssIFRyaWdnZXJFdmVudFR5cGUsIElDb2xsaXNpb25FdmVudCB9IGZyb20gJy4uLy4uL3BoeXNpY3MtaW50ZXJmYWNlJztcbmltcG9ydCB7IFJpZ2lkQm9keTNEIH0gZnJvbSAnLi4vcmlnaWQtYm9keS1jb21wb25lbnQnO1xuaW1wb3J0IHsgUGh5c2ljc01hdGVyaWFsIH0gZnJvbSAnLi4vLi4vYXNzZXRzL3BoeXNpY3MtbWF0ZXJpYWwnO1xuaW1wb3J0IHsgSUJhc2VTaGFwZSB9IGZyb20gJy4uLy4uLy4uL3NwZWMvaS1waHlzaWNzLXNoYXBlJztcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5jb25zdCBWZWMzID0gY2MuVmVjMztcblxuLyoqXG4gKiAhI2VuXG4gKiBUaGUgYmFzZSBjbGFzcyBvZiB0aGUgY29sbGlkZXIuXG4gKiAhI3poXG4gKiDnorDmkp7lmajnmoTln7rnsbvjgIJcbiAqIEBjbGFzcyBDb2xsaWRlcjNEXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcbiAqIEB1c2VzIEV2ZW50VGFyZ2V0XG4gKi9cbkBjY2NsYXNzKCdjYy5Db2xsaWRlcjNEJylcbmV4cG9ydCBjbGFzcyBDb2xsaWRlcjNEIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7UGh5c2ljc01hdGVyaWFsfSBzaGFyZWRNYXRlcmlhbFxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFBoeXNpY3NNYXRlcmlhbCxcbiAgICAgICAgZGlzcGxheU5hbWU6ICdNYXRlcmlhbCcsXG4gICAgICAgIGRpc3BsYXlPcmRlcjogLTFcbiAgICB9KVxuICAgIHB1YmxpYyBnZXQgc2hhcmVkTWF0ZXJpYWwgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF0ZXJpYWw7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBzaGFyZWRNYXRlcmlhbCAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5tYXRlcmlhbCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbWF0ZXJpYWwgKCkge1xuICAgICAgICBpZiAoIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzU2hhcmVkTWF0ZXJpYWwgJiYgdGhpcy5fbWF0ZXJpYWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsLm9mZigncGh5c2ljc19tYXRlcmlhbF91cGRhdGUnLCB0aGlzLl91cGRhdGVNYXRlcmlhbCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWwgPSB0aGlzLl9tYXRlcmlhbC5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsLm9uKCdwaHlzaWNzX21hdGVyaWFsX3VwZGF0ZScsIHRoaXMuX3VwZGF0ZU1hdGVyaWFsLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1NoYXJlZE1hdGVyaWFsID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX21hdGVyaWFsO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgbWF0ZXJpYWwgKHZhbHVlKSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IgfHwgQ0NfUEhZU0lDU19CVUlMVElOKSB7IFxuICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWwgPSB2YWx1ZTsgXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwgJiYgdGhpcy5fbWF0ZXJpYWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21hdGVyaWFsLl91dWlkICE9IHZhbHVlLl91dWlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWwub2ZmKCdwaHlzaWNzX21hdGVyaWFsX3VwZGF0ZScsIHRoaXMuX3VwZGF0ZU1hdGVyaWFsLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB2YWx1ZS5vbigncGh5c2ljc19tYXRlcmlhbF91cGRhdGUnLCB0aGlzLl91cGRhdGVNYXRlcmlhbCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNTaGFyZWRNYXRlcmlhbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCAmJiB0aGlzLl9tYXRlcmlhbCA9PSBudWxsKSB7XG4gICAgICAgICAgICB2YWx1ZS5vbigncGh5c2ljc19tYXRlcmlhbF91cGRhdGUnLCB0aGlzLl91cGRhdGVNYXRlcmlhbCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9tYXRlcmlhbCA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09IG51bGwgJiYgdGhpcy5fbWF0ZXJpYWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWwhLm9mZigncGh5c2ljc19tYXRlcmlhbF91cGRhdGUnLCB0aGlzLl91cGRhdGVNYXRlcmlhbCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9tYXRlcmlhbCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZU1hdGVyaWFsKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIGdldCBvciBzZXQgdGhlIGNvbGxpZGVyIGlzIHRyaWdnZXIsIHRoaXMgd2lsbCBiZSBhbHdheXMgdHJpZ2dlciBpZiB1c2luZyBidWlsdGluLlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5bmiJborr7nva7norDmkp7lmajmmK/lkKbkuLrop6blj5HlmajjgIJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzVHJpZ2dlclxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlPcmRlcjogMFxuICAgIH0pXG4gICAgcHVibGljIGdldCBpc1RyaWdnZXIgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNUcmlnZ2VyO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgaXNUcmlnZ2VyICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9pc1RyaWdnZXIgPSB2YWx1ZTtcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRoaXMuX3NoYXBlLmlzVHJpZ2dlciA9IHRoaXMuX2lzVHJpZ2dlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBnZXQgb3Igc2V0IHRoZSBjZW50ZXIgb2YgdGhlIGNvbGxpZGVyLCBpbiBsb2NhbCBzcGFjZS5cbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W5oiW6K6+572u56Kw5pKe5Zmo55qE5Lit5b+D54K544CCXG4gICAgICogQHByb3BlcnR5IHtWZWMzfSBjZW50ZXJcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBjYy5WZWMzLFxuICAgICAgICBkaXNwbGF5T3JkZXI6IDFcbiAgICB9KVxuICAgIHB1YmxpYyBnZXQgY2VudGVyICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbnRlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGNlbnRlciAodmFsdWU6IGNjLlZlYzMpIHtcbiAgICAgICAgVmVjMy5jb3B5KHRoaXMuX2NlbnRlciwgdmFsdWUpO1xuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgdGhpcy5fc2hhcGUuY2VudGVyID0gdGhpcy5fY2VudGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIGdldCB0aGUgY29sbGlkZXIgYXR0YWNoZWQgcmlnaWRib2R5LCB0aGlzIG1heSBiZSBudWxsLlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5bnorDmkp7lmajmiYDnu5HlrprnmoTliJrkvZPnu4Tku7bvvIzlj6/og73kuLogbnVsbOOAglxuICAgICAqIEBwcm9wZXJ0eSB7UmlnaWRCb2R5M0R8bnVsbH0gYXR0YWNoZWRSaWdpZGJvZHlcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGF0dGFjaGVkUmlnaWRib2R5ICgpOiBSaWdpZEJvZHkzRCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFwZS5hdHRhY2hlZFJpZ2lkQm9keTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogZ2V0IGNvbGxpZGVyIHNoYXBlLlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5bnorDmkp7lmajlvaLnirbjgIJcbiAgICAgKiBAcHJvcGVydHkge0lCYXNlU2hhcGV9IHNoYXBlXG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgcHVibGljIGdldCBzaGFwZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFwZTtcbiAgICB9XG5cbiAgICAvLy8gUFJJVkFURSBQUk9QRVJUWSAvLy9cblxuICAgIHByb3RlY3RlZCBfc2hhcGUhOiBJQmFzZVNoYXBlO1xuXG4gICAgcHJvdGVjdGVkIF9pc1NoYXJlZE1hdGVyaWFsOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFBoeXNpY3NNYXRlcmlhbCB9KVxuICAgIHByb3RlY3RlZCBfbWF0ZXJpYWw6IFBoeXNpY3NNYXRlcmlhbCB8IG51bGwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5XG4gICAgcHJvdGVjdGVkIF9pc1RyaWdnZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHByb3RlY3RlZCByZWFkb25seSBfY2VudGVyOiBjYy5WZWMzID0gbmV3IFZlYzMoKTtcblxuICAgIHByb3RlY3RlZCBnZXQgX2Fzc2VydE9ubG9hZCAoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLl9pc09uTG9hZENhbGxlZCA9PSAwO1xuICAgICAgICBpZiAocikgeyBjYy5lcnJvcignUGh5c2ljcyBFcnJvcjogUGxlYXNlIG1ha2Ugc3VyZSB0aGF0IHRoZSBub2RlIGhhcyBiZWVuIGFkZGVkIHRvIHRoZSBzY2VuZScpOyB9XG4gICAgICAgIHJldHVybiAhcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IgKCkgeyBcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICBjYy5FdmVudFRhcmdldC5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIC8vLyBFVkVOVCBJTlRFUkZBQ0UgLy8vXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmVnaXN0ZXIgYW4gY2FsbGJhY2sgb2YgYSBzcGVjaWZpYyBldmVudCB0eXBlIG9uIHRoZSBFdmVudFRhcmdldC5cbiAgICAgKiBUaGlzIHR5cGUgb2YgZXZlbnQgc2hvdWxkIGJlIHRyaWdnZXJlZCB2aWEgYGVtaXRgLlxuICAgICAqICEjemhcbiAgICAgKiDms6jlhozkuovku7bnm67moIfnmoTnibnlrprkuovku7bnsbvlnovlm57osIPjgILov5nnp43nsbvlnovnmoTkuovku7blupTor6XooqsgYGVtaXRgIOinpuWPkeOAglxuICAgICAqXG4gICAgICogQG1ldGhvZCBvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gVGhlIHR5cGUgb2YgY29sbGlkZXIgZXZlbnQgY2FuIGJlIGB0cmlnZ2VyLWVudGVyYCwgYHRyaWdnZXItc3RheWAsIGB0cmlnZ2VyLWV4aXRgIG9yIGBjb2xsaXNpb24tZW50ZXJgLCBgY29sbGlzaW9uLXN0YXlgLCBgY29sbGlzaW9uLWV4aXRgLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuXG4gICAgICogVGhlIGNhbGxiYWNrIGlzIGlnbm9yZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUgKHRoZSBjYWxsYmFja3MgYXJlIHVuaXF1ZSkuXG4gICAgICogQHBhcmFtIHtJVHJpZ2dlckV2ZW50fElDb2xsaXNpb25FdmVudH0gY2FsbGJhY2suZXZlbnQgQ2FsbGJhY2sgZnVuY3Rpb24gYXJndW1lbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3RhcmdldF0gLSBUaGUgdGFyZ2V0ICh0aGlzIG9iamVjdCkgdG8gaW52b2tlIHRoZSBjYWxsYmFjaywgY2FuIGJlIG51bGwuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IC0gSnVzdCByZXR1cm5zIHRoZSBpbmNvbWluZyBjYWxsYmFjayBzbyB5b3UgY2FuIHNhdmUgdGhlIGFub255bW91cyBmdW5jdGlvbiBlYXNpZXIuXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBvbjxUIGV4dGVuZHMgRnVuY3Rpb24+KHR5cGU6IHN0cmluZywgY2FsbGJhY2s6IFQsIHRhcmdldD86IGFueSwgdXNlQ2FwdHVyZT86IGJvb2xlYW4pOiBUXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBldmVudFRhcmdldC5vbignZmlyZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAqICAgICAvLyBldmVudCBpcyBJVHJpZ2dlckV2ZW50IG9yIElDb2xsaXNpb25FdmVudFxuICAgICAqIH0sIG5vZGUpO1xuICAgICAqL1xuICAgIHB1YmxpYyBvbiAodHlwZTogVHJpZ2dlckV2ZW50VHlwZSB8IENvbGxpc2lvbkV2ZW50VHlwZSwgY2FsbGJhY2s6IFRyaWdnZXJDYWxsYmFjayB8IENvbGxpc2lvbkNhbGxiYWNrLCB0YXJnZXQ/OiBPYmplY3QsIHVzZUNhcHR1cmU/OiBhbnkpOiBhbnkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZW1vdmVzIHRoZSBsaXN0ZW5lcnMgcHJldmlvdXNseSByZWdpc3RlcmVkIHdpdGggdGhlIHNhbWUgdHlwZSwgY2FsbGJhY2ssIHRhcmdldCBhbmQgb3IgdXNlQ2FwdHVyZSxcbiAgICAgKiBpZiBvbmx5IHR5cGUgaXMgcGFzc2VkIGFzIHBhcmFtZXRlciwgYWxsIGxpc3RlbmVycyByZWdpc3RlcmVkIHdpdGggdGhhdCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICAgKiAhI3poXG4gICAgICog5Yig6Zmk5LmL5YmN55So5ZCM57G75Z6L77yM5Zue6LCD77yM55uu5qCH5oiWIHVzZUNhcHR1cmUg5rOo5YaM55qE5LqL5Lu255uR5ZCs5Zmo77yM5aaC5p6c5Y+q5Lyg6YCSIHR5cGXvvIzlsIbkvJrliKDpmaQgdHlwZSDnsbvlnovnmoTmiYDmnInkuovku7bnm5HlkKzlmajjgIJcbiAgICAgKlxuICAgICAqIEBtZXRob2Qgb2ZmXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBUaGUgdHlwZSBvZiBjb2xsaWRlciBldmVudCBjYW4gYmUgYHRyaWdnZXItZW50ZXJgLCBgdHJpZ2dlci1zdGF5YCwgYHRyaWdnZXItZXhpdGAgb3IgYGNvbGxpc2lvbi1lbnRlcmAsIGBjb2xsaXNpb24tc3RheWAsIGBjb2xsaXNpb24tZXhpdGAuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIFRoZSBjYWxsYmFjayB0byByZW1vdmUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdIC0gVGhlIHRhcmdldCAodGhpcyBvYmplY3QpIHRvIGludm9rZSB0aGUgY2FsbGJhY2ssIGlmIGl0J3Mgbm90IGdpdmVuLCBvbmx5IGNhbGxiYWNrIHdpdGhvdXQgdGFyZ2V0IHdpbGwgYmUgcmVtb3ZlZC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIHJlZ2lzdGVyIGZpcmUgZXZlbnRMaXN0ZW5lclxuICAgICAqIHZhciBjYWxsYmFjayA9IGV2ZW50VGFyZ2V0Lm9uKCdmaXJlJywgZnVuY3Rpb24gKCkge1xuICAgICAqICAgICBjYy5sb2coXCJmaXJlIGluIHRoZSBob2xlXCIpO1xuICAgICAqIH0sIHRhcmdldCk7XG4gICAgICogLy8gcmVtb3ZlIGZpcmUgZXZlbnQgbGlzdGVuZXJcbiAgICAgKiBldmVudFRhcmdldC5vZmYoJ2ZpcmUnLCBjYWxsYmFjaywgdGFyZ2V0KTtcbiAgICAgKiAvLyByZW1vdmUgYWxsIGZpcmUgZXZlbnQgbGlzdGVuZXJzXG4gICAgICogZXZlbnRUYXJnZXQub2ZmKCdmaXJlJyk7XG4gICAgICovXG4gICAgcHVibGljIG9mZiAodHlwZTogVHJpZ2dlckV2ZW50VHlwZSB8IENvbGxpc2lvbkV2ZW50VHlwZSwgY2FsbGJhY2s6IFRyaWdnZXJDYWxsYmFjayB8IENvbGxpc2lvbkNhbGxiYWNrLCB0YXJnZXQ/OiBhbnkpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmVnaXN0ZXIgYW4gY2FsbGJhY2sgb2YgYSBzcGVjaWZpYyBldmVudCB0eXBlIG9uIHRoZSBFdmVudFRhcmdldCxcbiAgICAgKiB0aGUgY2FsbGJhY2sgd2lsbCByZW1vdmUgaXRzZWxmIGFmdGVyIHRoZSBmaXJzdCB0aW1lIGl0IGlzIHRyaWdnZXJlZC5cbiAgICAgKiAhI3poXG4gICAgICog5rOo5YaM5LqL5Lu255uu5qCH55qE54m55a6a5LqL5Lu257G75Z6L5Zue6LCD77yM5Zue6LCD5Lya5Zyo56ys5LiA5pe26Ze06KKr6Kem5Y+R5ZCO5Yig6Zmk6Ieq6Lqr44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIG9uY2VcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFRoZSB0eXBlIG9mIGNvbGxpZGVyIGV2ZW50IGNhbiBiZSBgdHJpZ2dlci1lbnRlcmAsIGB0cmlnZ2VyLXN0YXlgLCBgdHJpZ2dlci1leGl0YCBvciBgY29sbGlzaW9uLWVudGVyYCwgYGNvbGxpc2lvbi1zdGF5YCwgYGNvbGxpc2lvbi1leGl0YC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxuICAgICAqIFRoZSBjYWxsYmFjayBpcyBpZ25vcmVkIGlmIGl0IGlzIGEgZHVwbGljYXRlICh0aGUgY2FsbGJhY2tzIGFyZSB1bmlxdWUpLlxuICAgICAqIEBwYXJhbSB7SVRyaWdnZXJFdmVudHxJQ29sbGlzaW9uRXZlbnR9IGNhbGxiYWNrLmV2ZW50IGNhbGxiYWNrIGZ1bmN0aW9uIGFyZ3VtZW50LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XSAtIFRoZSB0YXJnZXQgKHRoaXMgb2JqZWN0KSB0byBpbnZva2UgdGhlIGNhbGxiYWNrLCBjYW4gYmUgbnVsbC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGV2ZW50VGFyZ2V0Lm9uY2UoJ2ZpcmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgKiAgICAgLy8gZXZlbnQgaXMgSVRyaWdnZXJFdmVudCBvciBJQ29sbGlzaW9uRXZlbnRcbiAgICAgKiB9LCBub2RlKTtcbiAgICAgKi9cbiAgICBwdWJsaWMgb25jZSAodHlwZTogVHJpZ2dlckV2ZW50VHlwZSB8IENvbGxpc2lvbkV2ZW50VHlwZSwgY2FsbGJhY2s6IFRyaWdnZXJDYWxsYmFjayB8IENvbGxpc2lvbkNhbGxiYWNrLCB0YXJnZXQ/OiBPYmplY3QpIHtcbiAgICB9XG5cbiAgICAvKiBkZWNsYXJlIGZvciB0eXBlc2NyaXB0IHRpcCAqL1xuICAgIHB1YmxpYyBlbWl0IChrZXk6IFRyaWdnZXJFdmVudFR5cGUgfCBDb2xsaXNpb25FdmVudFR5cGUsIC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgfVxuXG4gICAgLy8vIENPTVBPTkVOVCBMSUZFQ1lDTEUgLy8vXG5cbiAgICBwcm90ZWN0ZWQgX19wcmVsb2FkICgpIHtcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRoaXMuX3NoYXBlLl9fcHJlbG9hZCEodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Mb2FkICgpIHtcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIGlmICghQ0NfUEhZU0lDU19CVUlMVElOKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRNYXRlcmlhbCA9IHRoaXMuX21hdGVyaWFsID09IG51bGwgPyBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzM0RNYW5hZ2VyKCkuZGVmYXVsdE1hdGVyaWFsIDogdGhpcy5fbWF0ZXJpYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zaGFwZS5vbkxvYWQhKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25FbmFibGUgKCkge1xuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgdGhpcy5fc2hhcGUub25FbmFibGUhKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlICgpIHtcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRoaXMuX3NoYXBlLm9uRGlzYWJsZSEoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3kgKCkge1xuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgdGhpcy5fc2hhcGUub25EZXN0cm95ISgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlTWF0ZXJpYWwgKCkge1xuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgdGhpcy5fc2hhcGUubWF0ZXJpYWwgPSB0aGlzLl9tYXRlcmlhbDtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5jYy5qcy5taXhpbihDb2xsaWRlcjNELnByb3RvdHlwZSwgY2MuRXZlbnRUYXJnZXQucHJvdG90eXBlKTsiXSwic291cmNlUm9vdCI6Ii8ifQ==