
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/physics-manager.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.Physics3DManager = void 0;

var _instance = require("./instance");

var _physicsMaterial = require("./assets/physics-material");

var _physicsRayResult = require("./physics-ray-result");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var _cc$_decorator = cc._decorator,
    property = _cc$_decorator.property,
    ccclass = _cc$_decorator.ccclass;
/**
 * !#en
 * Physical systems manager.
 * !#zh
 * 物理系统管理器。
 * @class Physics3DManager
 */

var Physics3DManager = (_dec = ccclass("cc.Physics3DManager"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  _createClass(Physics3DManager, [{
    key: "enabled",

    /**
     * !#en
     * Whether to enable the physics system, default is false.
     * !#zh
     * 是否启用物理系统，默认不启用。
     * @property {boolean} enabled
     */
    get: function get() {
      return this._enabled;
    },
    set: function set(value) {
      this._enabled = value;
    }
    /**
     * !#en
     * Whether to allow the physics system to automatically hibernate, default is true.
     * !#zh
     * 物理系统是否允许自动休眠，默认为 true。
     * @property {boolean} allowSleep
     */

  }, {
    key: "allowSleep",
    get: function get() {
      return this._allowSleep;
    },
    set: function set(v) {
      this._allowSleep = v;

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this.physicsWorld.allowSleep = this._allowSleep;
      }
    }
    /**
     * !#en
     * The maximum number of sub-steps a full step is permitted to be broken into, default is 2.
     * !#zh
     * 物理每帧模拟的最大子步数，默认为 2。
     * @property {number} maxSubStep
     */

  }, {
    key: "maxSubStep",
    get: function get() {
      return this._maxSubStep;
    },
    set: function set(value) {
      this._maxSubStep = value;
    }
    /**
     * !#en
     * Time spent in each simulation of physics, default is 1/60s.
     * !#zh
     * 物理每步模拟消耗的固定时间，默认为 1/60 秒。
     * @property {number} deltaTime
     */

  }, {
    key: "deltaTime",
    get: function get() {
      return this._deltaTime;
    },
    set: function set(value) {
      this._deltaTime = value;
    }
    /**
     * !#en
     * Whether to use a fixed time step.
     * !#zh
     * 是否使用固定的时间步长。
     * @property {boolean} useFixedTime
     */

  }, {
    key: "useFixedTime",
    get: function get() {
      return this._useFixedTime;
    },
    set: function set(value) {
      this._useFixedTime = value;
    }
    /**
     * !#en
     * Gravity value of the physics simulation, default is (0, -10, 0).
     * !#zh
     * 物理世界的重力数值，默认为 (0, -10, 0)。
     * @property {Vec3} gravity
     */

  }, {
    key: "gravity",
    get: function get() {
      return this._gravity;
    },
    set: function set(gravity) {
      this._gravity.set(gravity);

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this.physicsWorld.gravity = gravity;
      }
    }
    /**
     * !#en
     * Gets the global default physical material. Note that builtin is null.
     * !#zh
     * 获取全局的默认物理材质，注意：builtin 时为 null。
     * @property {PhysicsMaterial | null} defaultMaterial
     * @readonly
     */

  }, {
    key: "defaultMaterial",
    get: function get() {
      return this._material;
    }
  }]);

  function Physics3DManager() {
    this.physicsWorld = void 0;
    this.raycastClosestResult = new _physicsRayResult.PhysicsRayResult();
    this.raycastResults = [];

    _initializerDefineProperty(this, "_enabled", _descriptor, this);

    _initializerDefineProperty(this, "_allowSleep", _descriptor2, this);

    _initializerDefineProperty(this, "_gravity", _descriptor3, this);

    _initializerDefineProperty(this, "_maxSubStep", _descriptor4, this);

    _initializerDefineProperty(this, "_deltaTime", _descriptor5, this);

    _initializerDefineProperty(this, "_useFixedTime", _descriptor6, this);

    this._material = null;
    this.raycastOptions = {
      'groupIndex': -1,
      'queryTrigger': true,
      'maxDistance': Infinity
    };
    this.raycastResultPool = new cc.RecyclePool(function () {
      return new _physicsRayResult.PhysicsRayResult();
    }, 1);
    cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
    this.physicsWorld = (0, _instance.createPhysicsWorld)();

    if (!CC_PHYSICS_BUILTIN) {
      this.gravity = this._gravity;
      this.allowSleep = this._allowSleep;
      this._material = new _physicsMaterial.PhysicsMaterial();
      this._material.friction = 0.1;
      this._material.restitution = 0.1;

      this._material.on('physics_material_update', this._updateMaterial, this);

      this.physicsWorld.defaultMaterial = this._material;
    }
  }
  /**
   * !#en
   * A physical system simulation is performed once and will now be performed automatically once per frame.
   * !#zh
   * 执行一次物理系统的模拟，目前将在每帧自动执行一次。
   * @method update
   * @param {number} deltaTime The time difference from the last execution is currently elapsed per frame
   */


  var _proto = Physics3DManager.prototype;

  _proto.update = function update(deltaTime) {
    if (CC_EDITOR) {
      return;
    }

    if (!this._enabled) {
      return;
    }

    cc.director.emit(cc.Director.EVENT_BEFORE_PHYSICS);

    if (this._useFixedTime) {
      this.physicsWorld.step(this._deltaTime);
    } else {
      this.physicsWorld.step(this._deltaTime, deltaTime, this._maxSubStep);
    }

    cc.director.emit(cc.Director.EVENT_AFTER_PHYSICS);
  }
  /**
   * !#en Detect all collision boxes and return all detected results, or null if none is detected. Note that the return value is taken from the object pool, so do not save the result reference or modify the result.
   * !#zh 检测所有的碰撞盒，并返回所有被检测到的结果，若没有检测到，则返回空值。注意返回值是从对象池中取的，所以请不要保存结果引用或者修改结果。
   * @method raycast
   * @param {Ray} worldRay A ray in world space
   * @param {number|string} groupIndexOrName Collision group index or group name
   * @param {number} maxDistance Maximum detection distance
   * @param {boolean} queryTrigger Detect trigger or not
   * @return {PhysicsRayResult[] | null} Detected result
   */
  ;

  _proto.raycast = function raycast(worldRay, groupIndexOrName, maxDistance, queryTrigger) {
    if (groupIndexOrName === void 0) {
      groupIndexOrName = 0;
    }

    if (maxDistance === void 0) {
      maxDistance = Infinity;
    }

    if (queryTrigger === void 0) {
      queryTrigger = true;
    }

    this.raycastResultPool.reset();
    this.raycastResults.length = 0;

    if (typeof groupIndexOrName == "string") {
      var groupIndex = cc.game.groupList.indexOf(groupIndexOrName);
      if (groupIndex == -1) groupIndex = 0;
      this.raycastOptions.groupIndex = groupIndex;
    } else {
      this.raycastOptions.groupIndex = groupIndexOrName;
    }

    this.raycastOptions.maxDistance = maxDistance;
    this.raycastOptions.queryTrigger = queryTrigger;
    var result = this.physicsWorld.raycast(worldRay, this.raycastOptions, this.raycastResultPool, this.raycastResults);
    if (result) return this.raycastResults;
    return null;
  }
  /**
   * !#en Detect all collision boxes and return the detection result with the shortest ray distance. If not, return null value. Note that the return value is taken from the object pool, so do not save the result reference or modify the result.
   * !#zh 检测所有的碰撞盒，并返回射线距离最短的检测结果，若没有，则返回空值。注意返回值是从对象池中取的，所以请不要保存结果引用或者修改结果。
   * @method raycastClosest
   * @param {Ray} worldRay A ray in world space
   * @param {number|string} groupIndexOrName Collision group index or group name
   * @param {number} maxDistance Maximum detection distance
   * @param {boolean} queryTrigger Detect trigger or not
   * @return {PhysicsRayResult|null} Detected result
   */
  ;

  _proto.raycastClosest = function raycastClosest(worldRay, groupIndexOrName, maxDistance, queryTrigger) {
    if (groupIndexOrName === void 0) {
      groupIndexOrName = 0;
    }

    if (maxDistance === void 0) {
      maxDistance = Infinity;
    }

    if (queryTrigger === void 0) {
      queryTrigger = true;
    }

    if (typeof groupIndexOrName == "string") {
      var groupIndex = cc.game.groupList.indexOf(groupIndexOrName);
      if (groupIndex == -1) groupIndex = 0;
      this.raycastOptions.groupIndex = groupIndex;
    } else {
      this.raycastOptions.groupIndex = groupIndexOrName;
    }

    this.raycastOptions.maxDistance = maxDistance;
    this.raycastOptions.queryTrigger = queryTrigger;
    var result = this.physicsWorld.raycastClosest(worldRay, this.raycastOptions, this.raycastClosestResult);
    if (result) return this.raycastClosestResult;
    return null;
  };

  _proto._updateMaterial = function _updateMaterial() {
    if (!CC_PHYSICS_BUILTIN) {
      this.physicsWorld.defaultMaterial = this._material;
    }
  };

  return Physics3DManager;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enabled", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_allowSleep", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_gravity", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new cc.Vec3(0, -10, 0);
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_maxSubStep", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_deltaTime", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1.0 / 60.0;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_useFixedTime", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
})), _class2)) || _class);
exports.Physics3DManager = Physics3DManager;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvZnJhbWV3b3JrL3BoeXNpY3MtbWFuYWdlci50cyJdLCJuYW1lcyI6WyJjYyIsIl9kZWNvcmF0b3IiLCJwcm9wZXJ0eSIsImNjY2xhc3MiLCJQaHlzaWNzM0RNYW5hZ2VyIiwiX2VuYWJsZWQiLCJ2YWx1ZSIsIl9hbGxvd1NsZWVwIiwidiIsIkNDX0VESVRPUiIsIkNDX1BIWVNJQ1NfQlVJTFRJTiIsInBoeXNpY3NXb3JsZCIsImFsbG93U2xlZXAiLCJfbWF4U3ViU3RlcCIsIl9kZWx0YVRpbWUiLCJfdXNlRml4ZWRUaW1lIiwiX2dyYXZpdHkiLCJncmF2aXR5Iiwic2V0IiwiX21hdGVyaWFsIiwicmF5Y2FzdENsb3Nlc3RSZXN1bHQiLCJQaHlzaWNzUmF5UmVzdWx0IiwicmF5Y2FzdFJlc3VsdHMiLCJyYXljYXN0T3B0aW9ucyIsIkluZmluaXR5IiwicmF5Y2FzdFJlc3VsdFBvb2wiLCJSZWN5Y2xlUG9vbCIsImRpcmVjdG9yIiwiX3NjaGVkdWxlciIsImVuYWJsZUZvclRhcmdldCIsIlBoeXNpY3NNYXRlcmlhbCIsImZyaWN0aW9uIiwicmVzdGl0dXRpb24iLCJvbiIsIl91cGRhdGVNYXRlcmlhbCIsImRlZmF1bHRNYXRlcmlhbCIsInVwZGF0ZSIsImRlbHRhVGltZSIsImVtaXQiLCJEaXJlY3RvciIsIkVWRU5UX0JFRk9SRV9QSFlTSUNTIiwic3RlcCIsIkVWRU5UX0FGVEVSX1BIWVNJQ1MiLCJyYXljYXN0Iiwid29ybGRSYXkiLCJncm91cEluZGV4T3JOYW1lIiwibWF4RGlzdGFuY2UiLCJxdWVyeVRyaWdnZXIiLCJyZXNldCIsImxlbmd0aCIsImdyb3VwSW5kZXgiLCJnYW1lIiwiZ3JvdXBMaXN0IiwiaW5kZXhPZiIsInJlc3VsdCIsInJheWNhc3RDbG9zZXN0IiwiVmVjMyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7cUJB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LEdBQWlDQSxVQUFqQztBQUNILEtBSkQsTUFJTztBQUNILFdBQUszQixjQUFMLENBQW9CMkIsVUFBcEIsR0FBaUNMLGdCQUFqQztBQUNIOztBQUNELFNBQUt0QixjQUFMLENBQW9CdUIsV0FBcEIsR0FBa0NBLFdBQWxDO0FBQ0EsU0FBS3ZCLGNBQUwsQ0FBb0J3QixZQUFwQixHQUFtQ0EsWUFBbkM7QUFDQSxRQUFJTyxNQUFNLEdBQUcsS0FBSzNDLFlBQUwsQ0FBa0I0QyxjQUFsQixDQUFpQ1gsUUFBakMsRUFBMkMsS0FBS3JCLGNBQWhELEVBQWdFLEtBQUtILG9CQUFyRSxDQUFiO0FBQ0EsUUFBSWtDLE1BQUosRUFBWSxPQUFPLEtBQUtsQyxvQkFBWjtBQUNaLFdBQU8sSUFBUDtBQUNIOztTQUVPYyxrQkFBUiwyQkFBMkI7QUFDdkIsUUFBSSxDQUFDeEIsa0JBQUwsRUFBeUI7QUFDckIsV0FBS0MsWUFBTCxDQUFrQndCLGVBQWxCLEdBQW9DLEtBQUtoQixTQUF6QztBQUNIO0FBQ0o7OztzRkEvSEFqQjs7Ozs7V0FDa0I7O2dGQUVsQkE7Ozs7O1dBQ3FCOzs2RUFFckJBOzs7OztXQUMyQixJQUFJRixFQUFFLENBQUN3RCxJQUFQLENBQVksQ0FBWixFQUFlLENBQUMsRUFBaEIsRUFBb0IsQ0FBcEI7O2dGQUUzQnREOzs7OztXQUNxQjs7K0VBRXJCQTs7Ozs7V0FDb0IsTUFBTTs7a0ZBRTFCQTs7Ozs7V0FDdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IHsgSVBoeXNpY3NXb3JsZCwgSVJheWNhc3RPcHRpb25zIH0gZnJvbSAnLi4vc3BlYy9pLXBoeXNpY3Mtd29ybGQnO1xuaW1wb3J0IHsgY3JlYXRlUGh5c2ljc1dvcmxkIH0gZnJvbSAnLi9pbnN0YW5jZSc7XG5pbXBvcnQgeyBQaHlzaWNzTWF0ZXJpYWwgfSBmcm9tICcuL2Fzc2V0cy9waHlzaWNzLW1hdGVyaWFsJztcbmltcG9ydCB7IFBoeXNpY3NSYXlSZXN1bHQgfSBmcm9tICcuL3BoeXNpY3MtcmF5LXJlc3VsdCc7XG5cbmNvbnN0IHsgcHJvcGVydHksIGNjY2xhc3MgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbi8qKlxuICogISNlblxuICogUGh5c2ljYWwgc3lzdGVtcyBtYW5hZ2VyLlxuICogISN6aFxuICog54mp55CG57O757uf566h55CG5Zmo44CCXG4gKiBAY2xhc3MgUGh5c2ljczNETWFuYWdlclxuICovXG5AY2NjbGFzcyhcImNjLlBoeXNpY3MzRE1hbmFnZXJcIilcbmV4cG9ydCBjbGFzcyBQaHlzaWNzM0RNYW5hZ2VyIHtcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBXaGV0aGVyIHRvIGVuYWJsZSB0aGUgcGh5c2ljcyBzeXN0ZW0sIGRlZmF1bHQgaXMgZmFsc2UuXG4gICAgICogISN6aFxuICAgICAqIOaYr+WQpuWQr+eUqOeJqeeQhuezu+e7n++8jOm7mOiupOS4jeWQr+eUqOOAglxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZW5hYmxlZFxuICAgICAqL1xuICAgIGdldCBlbmFibGVkICgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZWQ7XG4gICAgfVxuICAgIHNldCBlbmFibGVkICh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFdoZXRoZXIgdG8gYWxsb3cgdGhlIHBoeXNpY3Mgc3lzdGVtIHRvIGF1dG9tYXRpY2FsbHkgaGliZXJuYXRlLCBkZWZhdWx0IGlzIHRydWUuXG4gICAgICogISN6aFxuICAgICAqIOeJqeeQhuezu+e7n+aYr+WQpuWFgeiuuOiHquWKqOS8keecoO+8jOm7mOiupOS4uiB0cnVl44CCXG4gICAgICogQHByb3BlcnR5IHtib29sZWFufSBhbGxvd1NsZWVwXG4gICAgICovXG4gICAgZ2V0IGFsbG93U2xlZXAgKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWxsb3dTbGVlcDtcbiAgICB9XG4gICAgc2V0IGFsbG93U2xlZXAgKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fYWxsb3dTbGVlcCA9IHY7XG4gICAgICAgIGlmICghQ0NfRURJVE9SICYmICFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcbiAgICAgICAgICAgIHRoaXMucGh5c2ljc1dvcmxkLmFsbG93U2xlZXAgPSB0aGlzLl9hbGxvd1NsZWVwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFRoZSBtYXhpbXVtIG51bWJlciBvZiBzdWItc3RlcHMgYSBmdWxsIHN0ZXAgaXMgcGVybWl0dGVkIHRvIGJlIGJyb2tlbiBpbnRvLCBkZWZhdWx0IGlzIDIuXG4gICAgICogISN6aFxuICAgICAqIOeJqeeQhuavj+W4p+aooeaLn+eahOacgOWkp+WtkOatpeaVsO+8jOm7mOiupOS4uiAy44CCXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IG1heFN1YlN0ZXBcbiAgICAgKi9cbiAgICBnZXQgbWF4U3ViU3RlcCAoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heFN1YlN0ZXA7XG4gICAgfVxuICAgIHNldCBtYXhTdWJTdGVwICh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21heFN1YlN0ZXAgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGltZSBzcGVudCBpbiBlYWNoIHNpbXVsYXRpb24gb2YgcGh5c2ljcywgZGVmYXVsdCBpcyAxLzYwcy5cbiAgICAgKiAhI3poXG4gICAgICog54mp55CG5q+P5q2l5qih5ouf5raI6ICX55qE5Zu65a6a5pe26Ze077yM6buY6K6k5Li6IDEvNjAg56eS44CCXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGRlbHRhVGltZVxuICAgICAqL1xuICAgIGdldCBkZWx0YVRpbWUgKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWx0YVRpbWU7XG4gICAgfVxuICAgIHNldCBkZWx0YVRpbWUgKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZGVsdGFUaW1lID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFdoZXRoZXIgdG8gdXNlIGEgZml4ZWQgdGltZSBzdGVwLlxuICAgICAqICEjemhcbiAgICAgKiDmmK/lkKbkvb/nlKjlm7rlrprnmoTml7bpl7TmraXplb/jgIJcbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHVzZUZpeGVkVGltZVxuICAgICAqL1xuICAgIGdldCB1c2VGaXhlZFRpbWUgKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlRml4ZWRUaW1lO1xuICAgIH1cbiAgICBzZXQgdXNlRml4ZWRUaW1lICh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl91c2VGaXhlZFRpbWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR3Jhdml0eSB2YWx1ZSBvZiB0aGUgcGh5c2ljcyBzaW11bGF0aW9uLCBkZWZhdWx0IGlzICgwLCAtMTAsIDApLlxuICAgICAqICEjemhcbiAgICAgKiDniannkIbkuJbnlYznmoTph43lipvmlbDlgLzvvIzpu5jorqTkuLogKDAsIC0xMCwgMCnjgIJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IGdyYXZpdHlcbiAgICAgKi9cbiAgICBnZXQgZ3Jhdml0eSAoKTogY2MuVmVjMyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ncmF2aXR5O1xuICAgIH1cbiAgICBzZXQgZ3Jhdml0eSAoZ3Jhdml0eTogY2MuVmVjMykge1xuICAgICAgICB0aGlzLl9ncmF2aXR5LnNldChncmF2aXR5KTtcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xuICAgICAgICAgICAgdGhpcy5waHlzaWNzV29ybGQuZ3Jhdml0eSA9IGdyYXZpdHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0cyB0aGUgZ2xvYmFsIGRlZmF1bHQgcGh5c2ljYWwgbWF0ZXJpYWwuIE5vdGUgdGhhdCBidWlsdGluIGlzIG51bGwuXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluWFqOWxgOeahOm7mOiupOeJqeeQhuadkOi0qO+8jOazqOaEj++8mmJ1aWx0aW4g5pe25Li6IG51bGzjgIJcbiAgICAgKiBAcHJvcGVydHkge1BoeXNpY3NNYXRlcmlhbCB8IG51bGx9IGRlZmF1bHRNYXRlcmlhbFxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldCBkZWZhdWx0TWF0ZXJpYWwgKCk6IFBoeXNpY3NNYXRlcmlhbCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF0ZXJpYWw7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgcGh5c2ljc1dvcmxkOiBJUGh5c2ljc1dvcmxkO1xuICAgIHJlYWRvbmx5IHJheWNhc3RDbG9zZXN0UmVzdWx0ID0gbmV3IFBoeXNpY3NSYXlSZXN1bHQoKTtcbiAgICByZWFkb25seSByYXljYXN0UmVzdWx0czogUGh5c2ljc1JheVJlc3VsdFtdID0gW107XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9lbmFibGVkID0gZmFsc2U7XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9hbGxvd1NsZWVwID0gdHJ1ZTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2dyYXZpdHkgPSBuZXcgY2MuVmVjMygwLCAtMTAsIDApO1xuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfbWF4U3ViU3RlcCA9IDE7XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9kZWx0YVRpbWUgPSAxLjAgLyA2MC4wO1xuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfdXNlRml4ZWRUaW1lID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgX21hdGVyaWFsOiBjYy5QaHlzaWNzTWF0ZXJpYWwgfCBudWxsID0gbnVsbDtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgcmF5Y2FzdE9wdGlvbnM6IElSYXljYXN0T3B0aW9ucyA9IHtcbiAgICAgICAgJ2dyb3VwSW5kZXgnOiAtMSxcbiAgICAgICAgJ3F1ZXJ5VHJpZ2dlcic6IHRydWUsXG4gICAgICAgICdtYXhEaXN0YW5jZSc6IEluZmluaXR5XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWFkb25seSByYXljYXN0UmVzdWx0UG9vbCA9IG5ldyBjYy5SZWN5Y2xlUG9vbCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUGh5c2ljc1JheVJlc3VsdCgpO1xuICAgIH0sIDEpO1xuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLl9zY2hlZHVsZXIgJiYgY2MuZGlyZWN0b3IuX3NjaGVkdWxlci5lbmFibGVGb3JUYXJnZXQodGhpcyk7XG4gICAgICAgIHRoaXMucGh5c2ljc1dvcmxkID0gY3JlYXRlUGh5c2ljc1dvcmxkKCk7XG4gICAgICAgIGlmICghQ0NfUEhZU0lDU19CVUlMVElOKSB7XG4gICAgICAgICAgICB0aGlzLmdyYXZpdHkgPSB0aGlzLl9ncmF2aXR5O1xuICAgICAgICAgICAgdGhpcy5hbGxvd1NsZWVwID0gdGhpcy5fYWxsb3dTbGVlcDtcbiAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsID0gbmV3IFBoeXNpY3NNYXRlcmlhbCgpO1xuICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWwuZnJpY3Rpb24gPSAwLjE7XG4gICAgICAgICAgICB0aGlzLl9tYXRlcmlhbC5yZXN0aXR1dGlvbiA9IDAuMTtcbiAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsLm9uKCdwaHlzaWNzX21hdGVyaWFsX3VwZGF0ZScsIHRoaXMuX3VwZGF0ZU1hdGVyaWFsLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucGh5c2ljc1dvcmxkLmRlZmF1bHRNYXRlcmlhbCA9IHRoaXMuX21hdGVyaWFsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEEgcGh5c2ljYWwgc3lzdGVtIHNpbXVsYXRpb24gaXMgcGVyZm9ybWVkIG9uY2UgYW5kIHdpbGwgbm93IGJlIHBlcmZvcm1lZCBhdXRvbWF0aWNhbGx5IG9uY2UgcGVyIGZyYW1lLlxuICAgICAqICEjemhcbiAgICAgKiDmiafooYzkuIDmrKHniannkIbns7vnu5/nmoTmqKHmi5/vvIznm67liY3lsIblnKjmr4/luKfoh6rliqjmiafooYzkuIDmrKHjgIJcbiAgICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YVRpbWUgVGhlIHRpbWUgZGlmZmVyZW5jZSBmcm9tIHRoZSBsYXN0IGV4ZWN1dGlvbiBpcyBjdXJyZW50bHkgZWxhcHNlZCBwZXIgZnJhbWVcbiAgICAgKi9cbiAgICB1cGRhdGUgKGRlbHRhVGltZTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2VuYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNjLmRpcmVjdG9yLmVtaXQoY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX1BIWVNJQ1MpO1xuXG4gICAgICAgIGlmICh0aGlzLl91c2VGaXhlZFRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMucGh5c2ljc1dvcmxkLnN0ZXAodGhpcy5fZGVsdGFUaW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGh5c2ljc1dvcmxkLnN0ZXAodGhpcy5fZGVsdGFUaW1lLCBkZWx0YVRpbWUsIHRoaXMuX21heFN1YlN0ZXApO1xuICAgICAgICB9XG5cbiAgICAgICAgY2MuZGlyZWN0b3IuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9QSFlTSUNTKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIERldGVjdCBhbGwgY29sbGlzaW9uIGJveGVzIGFuZCByZXR1cm4gYWxsIGRldGVjdGVkIHJlc3VsdHMsIG9yIG51bGwgaWYgbm9uZSBpcyBkZXRlY3RlZC4gTm90ZSB0aGF0IHRoZSByZXR1cm4gdmFsdWUgaXMgdGFrZW4gZnJvbSB0aGUgb2JqZWN0IHBvb2wsIHNvIGRvIG5vdCBzYXZlIHRoZSByZXN1bHQgcmVmZXJlbmNlIG9yIG1vZGlmeSB0aGUgcmVzdWx0LlxuICAgICAqICEjemgg5qOA5rWL5omA5pyJ55qE56Kw5pKe55uS77yM5bm26L+U5Zue5omA5pyJ6KKr5qOA5rWL5Yiw55qE57uT5p6c77yM6Iul5rKh5pyJ5qOA5rWL5Yiw77yM5YiZ6L+U5Zue56m65YC844CC5rOo5oSP6L+U5Zue5YC85piv5LuO5a+56LGh5rGg5Lit5Y+W55qE77yM5omA5Lul6K+35LiN6KaB5L+d5a2Y57uT5p6c5byV55So5oiW6ICF5L+u5pS557uT5p6c44CCXG4gICAgICogQG1ldGhvZCByYXljYXN0XG4gICAgICogQHBhcmFtIHtSYXl9IHdvcmxkUmF5IEEgcmF5IGluIHdvcmxkIHNwYWNlXG4gICAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBncm91cEluZGV4T3JOYW1lIENvbGxpc2lvbiBncm91cCBpbmRleCBvciBncm91cCBuYW1lXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heERpc3RhbmNlIE1heGltdW0gZGV0ZWN0aW9uIGRpc3RhbmNlXG4gICAgICogQHBhcmFtIHtib29sZWFufSBxdWVyeVRyaWdnZXIgRGV0ZWN0IHRyaWdnZXIgb3Igbm90XG4gICAgICogQHJldHVybiB7UGh5c2ljc1JheVJlc3VsdFtdIHwgbnVsbH0gRGV0ZWN0ZWQgcmVzdWx0XG4gICAgICovXG4gICAgcmF5Y2FzdCAod29ybGRSYXk6IGNjLmdlb21VdGlscy5SYXksIGdyb3VwSW5kZXhPck5hbWU6IG51bWJlcnxzdHJpbmcgPSAwLCBtYXhEaXN0YW5jZSA9IEluZmluaXR5LCBxdWVyeVRyaWdnZXIgPSB0cnVlKTogUGh5c2ljc1JheVJlc3VsdFtdIHwgbnVsbCB7XG4gICAgICAgIHRoaXMucmF5Y2FzdFJlc3VsdFBvb2wucmVzZXQoKTtcbiAgICAgICAgdGhpcy5yYXljYXN0UmVzdWx0cy5sZW5ndGggPSAwO1xuICAgICAgICBpZiAodHlwZW9mIGdyb3VwSW5kZXhPck5hbWUgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbGV0IGdyb3VwSW5kZXggPSBjYy5nYW1lLmdyb3VwTGlzdC5pbmRleE9mKGdyb3VwSW5kZXhPck5hbWUpO1xuICAgICAgICAgICAgaWYgKGdyb3VwSW5kZXggPT0gLTEpIGdyb3VwSW5kZXggPSAwO1xuICAgICAgICAgICAgdGhpcy5yYXljYXN0T3B0aW9ucy5ncm91cEluZGV4ID0gZ3JvdXBJbmRleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmF5Y2FzdE9wdGlvbnMuZ3JvdXBJbmRleCA9IGdyb3VwSW5kZXhPck5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yYXljYXN0T3B0aW9ucy5tYXhEaXN0YW5jZSA9IG1heERpc3RhbmNlO1xuICAgICAgICB0aGlzLnJheWNhc3RPcHRpb25zLnF1ZXJ5VHJpZ2dlciA9IHF1ZXJ5VHJpZ2dlcjtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMucGh5c2ljc1dvcmxkLnJheWNhc3Qod29ybGRSYXksIHRoaXMucmF5Y2FzdE9wdGlvbnMsIHRoaXMucmF5Y2FzdFJlc3VsdFBvb2wsIHRoaXMucmF5Y2FzdFJlc3VsdHMpO1xuICAgICAgICBpZiAocmVzdWx0KSByZXR1cm4gdGhpcy5yYXljYXN0UmVzdWx0cztcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBEZXRlY3QgYWxsIGNvbGxpc2lvbiBib3hlcyBhbmQgcmV0dXJuIHRoZSBkZXRlY3Rpb24gcmVzdWx0IHdpdGggdGhlIHNob3J0ZXN0IHJheSBkaXN0YW5jZS4gSWYgbm90LCByZXR1cm4gbnVsbCB2YWx1ZS4gTm90ZSB0aGF0IHRoZSByZXR1cm4gdmFsdWUgaXMgdGFrZW4gZnJvbSB0aGUgb2JqZWN0IHBvb2wsIHNvIGRvIG5vdCBzYXZlIHRoZSByZXN1bHQgcmVmZXJlbmNlIG9yIG1vZGlmeSB0aGUgcmVzdWx0LlxuICAgICAqICEjemgg5qOA5rWL5omA5pyJ55qE56Kw5pKe55uS77yM5bm26L+U5Zue5bCE57q/6Led56a75pyA55+t55qE5qOA5rWL57uT5p6c77yM6Iul5rKh5pyJ77yM5YiZ6L+U5Zue56m65YC844CC5rOo5oSP6L+U5Zue5YC85piv5LuO5a+56LGh5rGg5Lit5Y+W55qE77yM5omA5Lul6K+35LiN6KaB5L+d5a2Y57uT5p6c5byV55So5oiW6ICF5L+u5pS557uT5p6c44CCXG4gICAgICogQG1ldGhvZCByYXljYXN0Q2xvc2VzdFxuICAgICAqIEBwYXJhbSB7UmF5fSB3b3JsZFJheSBBIHJheSBpbiB3b3JsZCBzcGFjZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gZ3JvdXBJbmRleE9yTmFtZSBDb2xsaXNpb24gZ3JvdXAgaW5kZXggb3IgZ3JvdXAgbmFtZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhEaXN0YW5jZSBNYXhpbXVtIGRldGVjdGlvbiBkaXN0YW5jZVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcXVlcnlUcmlnZ2VyIERldGVjdCB0cmlnZ2VyIG9yIG5vdFxuICAgICAqIEByZXR1cm4ge1BoeXNpY3NSYXlSZXN1bHR8bnVsbH0gRGV0ZWN0ZWQgcmVzdWx0XG4gICAgICovXG4gICAgcmF5Y2FzdENsb3Nlc3QgKHdvcmxkUmF5OiBjYy5nZW9tVXRpbHMuUmF5LCBncm91cEluZGV4T3JOYW1lOiBudW1iZXJ8c3RyaW5nID0gMCwgbWF4RGlzdGFuY2UgPSBJbmZpbml0eSwgcXVlcnlUcmlnZ2VyID0gdHJ1ZSk6IFBoeXNpY3NSYXlSZXN1bHR8bnVsbCB7XG4gICAgICAgIGlmICh0eXBlb2YgZ3JvdXBJbmRleE9yTmFtZSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBsZXQgZ3JvdXBJbmRleCA9IGNjLmdhbWUuZ3JvdXBMaXN0LmluZGV4T2YoZ3JvdXBJbmRleE9yTmFtZSk7XG4gICAgICAgICAgICBpZiAoZ3JvdXBJbmRleCA9PSAtMSkgZ3JvdXBJbmRleCA9IDA7XG4gICAgICAgICAgICB0aGlzLnJheWNhc3RPcHRpb25zLmdyb3VwSW5kZXggPSBncm91cEluZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yYXljYXN0T3B0aW9ucy5ncm91cEluZGV4ID0gZ3JvdXBJbmRleE9yTmFtZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJheWNhc3RPcHRpb25zLm1heERpc3RhbmNlID0gbWF4RGlzdGFuY2U7XG4gICAgICAgIHRoaXMucmF5Y2FzdE9wdGlvbnMucXVlcnlUcmlnZ2VyID0gcXVlcnlUcmlnZ2VyO1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5waHlzaWNzV29ybGQucmF5Y2FzdENsb3Nlc3Qod29ybGRSYXksIHRoaXMucmF5Y2FzdE9wdGlvbnMsIHRoaXMucmF5Y2FzdENsb3Nlc3RSZXN1bHQpO1xuICAgICAgICBpZiAocmVzdWx0KSByZXR1cm4gdGhpcy5yYXljYXN0Q2xvc2VzdFJlc3VsdDtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlTWF0ZXJpYWwgKCkge1xuICAgICAgICBpZiAoIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xuICAgICAgICAgICAgdGhpcy5waHlzaWNzV29ybGQuZGVmYXVsdE1hdGVyaWFsID0gdGhpcy5fbWF0ZXJpYWw7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==