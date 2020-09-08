
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/collider/CCPhysicsCollider.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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
var PTM_RATIO = require('../CCPhysicsTypes').PTM_RATIO;

var getWorldScale = require('../utils').getWorldScale;
/**
 * @class PhysicsCollider
 * @extends Collider
 */


var PhysicsCollider = cc.Class({
  name: 'cc.PhysicsCollider',
  "extends": cc.Collider,
  ctor: function ctor() {
    this._fixtures = [];
    this._shapes = [];
    this._inited = false;
    this._rect = cc.rect();
  },
  properties: {
    _density: 1.0,
    _sensor: false,
    _friction: 0.2,
    _restitution: 0,

    /**
     * !#en
     * The density.
     * !#zh
     * 密度
     * @property {Number} density
     * @default 1
     */
    density: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.density',
      get: function get() {
        return this._density;
      },
      set: function set(value) {
        this._density = value;
      }
    },

    /**
     * !#en
     * A sensor collider collects contact information but never generates a collision response
     * !#zh
     * 一个传感器类型的碰撞体会产生碰撞回调，但是不会发生物理碰撞效果。
     * @property {Boolean} sensor
     * @default false
     */
    sensor: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.sensor',
      get: function get() {
        return this._sensor;
      },
      set: function set(value) {
        this._sensor = value;
      }
    },

    /**
     * !#en
     * The friction coefficient, usually in the range [0,1].
     * !#zh
     * 摩擦系数，取值一般在 [0, 1] 之间
     * @property {Number} friction
     * @default 0.2
     */
    friction: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.friction',
      get: function get() {
        return this._friction;
      },
      set: function set(value) {
        this._friction = value;
      }
    },

    /**
     * !#en
     * The restitution (elasticity) usually in the range [0,1].
     * !#zh
     * 弹性系数，取值一般在 [0, 1]之间
     * @property {Number} restitution
     * @default 0
     */
    restitution: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.restitution',
      get: function get() {
        return this._restitution;
      },
      set: function set(value) {
        this._restitution = value;
      }
    },

    /**
     * !#en
     * Physics collider will find the rigidbody component on the node and set to this property.
     * !#zh
     * 碰撞体会在初始化时查找节点上是否存在刚体，如果查找成功则赋值到这个属性上。
     * @property {RigidBody} body
     * @default null
     */
    body: {
      "default": null,
      type: cc.RigidBody,
      visible: false
    }
  },
  onDisable: function onDisable() {
    this._destroy();
  },
  onEnable: function onEnable() {
    this._init();
  },
  start: function start() {
    this._init();
  },
  _getFixtureIndex: function _getFixtureIndex(fixture) {
    return this._fixtures.indexOf(fixture);
  },
  _init: function _init() {
    cc.director.getPhysicsManager().pushDelayEvent(this, '__init', []);
  },
  _destroy: function _destroy() {
    cc.director.getPhysicsManager().pushDelayEvent(this, '__destroy', []);
  },
  __init: function __init() {
    if (this._inited) return;
    var body = this.body || this.getComponent(cc.RigidBody);
    if (!body) return;

    var innerBody = body._getBody();

    if (!innerBody) return;
    var node = body.node;
    var scale = getWorldScale(node);
    this._scale = scale;
    var shapes = scale.x === 0 && scale.y === 0 ? [] : this._createShape(scale);

    if (!(shapes instanceof Array)) {
      shapes = [shapes];
    }

    var categoryBits = 1 << node.groupIndex;
    var maskBits = 0;
    var bits = cc.game.collisionMatrix[node.groupIndex];

    for (var i = 0; i < bits.length; i++) {
      if (!bits[i]) continue;
      maskBits |= 1 << i;
    }

    var filter = {
      categoryBits: categoryBits,
      maskBits: maskBits,
      groupIndex: 0
    };
    var manager = cc.director.getPhysicsManager();

    for (var _i = 0; _i < shapes.length; _i++) {
      var shape = shapes[_i];
      var fixDef = new b2.FixtureDef();
      fixDef.density = this.density;
      fixDef.isSensor = this.sensor;
      fixDef.friction = this.friction;
      fixDef.restitution = this.restitution;
      fixDef.shape = shape;
      fixDef.filter = filter;
      var fixture = innerBody.CreateFixture(fixDef);
      fixture.collider = this;

      if (body.enabledContactListener) {
        manager._registerContactFixture(fixture);
      }

      this._shapes.push(shape);

      this._fixtures.push(fixture);
    }

    this.body = body;
    this._inited = true;
  },
  __destroy: function __destroy() {
    if (!this._inited) return;
    var fixtures = this._fixtures;

    var body = this.body._getBody();

    var manager = cc.director.getPhysicsManager();

    for (var i = fixtures.length - 1; i >= 0; i--) {
      var fixture = fixtures[i];
      fixture.collider = null;

      manager._unregisterContactFixture(fixture);

      if (body) {
        body.DestroyFixture(fixture);
      }
    }

    this.body = null;
    this._fixtures.length = 0;
    this._shapes.length = 0;
    this._inited = false;
  },
  _createShape: function _createShape() {},

  /**
   * !#en
   * Apply current changes to collider, this will regenerate inner box2d fixtures.
   * !#zh
   * 应用当前 collider 中的修改，调用此函数会重新生成内部 box2d 的夹具。
   * @method apply
   */
  apply: function apply() {
    this._destroy();

    this._init();
  },

  /**
   * !#en
   * Get the world aabb of the collider
   * !#zh
   * 获取碰撞体的世界坐标系下的包围盒
   * @method getAABB
   */
  getAABB: function getAABB() {
    var MAX = 10e6;
    var minX = MAX,
        minY = MAX;
    var maxX = -MAX,
        maxY = -MAX;
    var fixtures = this._fixtures;

    for (var i = 0; i < fixtures.length; i++) {
      var fixture = fixtures[i];
      var count = fixture.GetShape().GetChildCount();

      for (var j = 0; j < count; j++) {
        var aabb = fixture.GetAABB(j);
        if (aabb.lowerBound.x < minX) minX = aabb.lowerBound.x;
        if (aabb.lowerBound.y < minY) minY = aabb.lowerBound.y;
        if (aabb.upperBound.x > maxX) maxX = aabb.upperBound.x;
        if (aabb.upperBound.y > maxY) maxY = aabb.upperBound.y;
      }
    }

    minX *= PTM_RATIO;
    minY *= PTM_RATIO;
    maxX *= PTM_RATIO;
    maxY *= PTM_RATIO;
    var r = this._rect;
    r.x = minX;
    r.y = minY;
    r.width = maxX - minX;
    r.height = maxY - minY;
    return r;
  }
});
cc.PhysicsCollider = module.exports = PhysicsCollider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3MvY29sbGlkZXIvQ0NQaHlzaWNzQ29sbGlkZXIuanMiXSwibmFtZXMiOlsiUFRNX1JBVElPIiwicmVxdWlyZSIsImdldFdvcmxkU2NhbGUiLCJQaHlzaWNzQ29sbGlkZXIiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbGxpZGVyIiwiY3RvciIsIl9maXh0dXJlcyIsIl9zaGFwZXMiLCJfaW5pdGVkIiwiX3JlY3QiLCJyZWN0IiwicHJvcGVydGllcyIsIl9kZW5zaXR5IiwiX3NlbnNvciIsIl9mcmljdGlvbiIsIl9yZXN0aXR1dGlvbiIsImRlbnNpdHkiLCJ0b29sdGlwIiwiQ0NfREVWIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJzZW5zb3IiLCJmcmljdGlvbiIsInJlc3RpdHV0aW9uIiwiYm9keSIsInR5cGUiLCJSaWdpZEJvZHkiLCJ2aXNpYmxlIiwib25EaXNhYmxlIiwiX2Rlc3Ryb3kiLCJvbkVuYWJsZSIsIl9pbml0Iiwic3RhcnQiLCJfZ2V0Rml4dHVyZUluZGV4IiwiZml4dHVyZSIsImluZGV4T2YiLCJkaXJlY3RvciIsImdldFBoeXNpY3NNYW5hZ2VyIiwicHVzaERlbGF5RXZlbnQiLCJfX2luaXQiLCJnZXRDb21wb25lbnQiLCJpbm5lckJvZHkiLCJfZ2V0Qm9keSIsIm5vZGUiLCJzY2FsZSIsIl9zY2FsZSIsInNoYXBlcyIsIngiLCJ5IiwiX2NyZWF0ZVNoYXBlIiwiQXJyYXkiLCJjYXRlZ29yeUJpdHMiLCJncm91cEluZGV4IiwibWFza0JpdHMiLCJiaXRzIiwiZ2FtZSIsImNvbGxpc2lvbk1hdHJpeCIsImkiLCJsZW5ndGgiLCJmaWx0ZXIiLCJtYW5hZ2VyIiwic2hhcGUiLCJmaXhEZWYiLCJiMiIsIkZpeHR1cmVEZWYiLCJpc1NlbnNvciIsIkNyZWF0ZUZpeHR1cmUiLCJjb2xsaWRlciIsImVuYWJsZWRDb250YWN0TGlzdGVuZXIiLCJfcmVnaXN0ZXJDb250YWN0Rml4dHVyZSIsInB1c2giLCJfX2Rlc3Ryb3kiLCJmaXh0dXJlcyIsIl91bnJlZ2lzdGVyQ29udGFjdEZpeHR1cmUiLCJEZXN0cm95Rml4dHVyZSIsImFwcGx5IiwiZ2V0QUFCQiIsIk1BWCIsIm1pblgiLCJtaW5ZIiwibWF4WCIsIm1heFkiLCJjb3VudCIsIkdldFNoYXBlIiwiR2V0Q2hpbGRDb3VudCIsImoiLCJhYWJiIiwiR2V0QUFCQiIsImxvd2VyQm91bmQiLCJ1cHBlckJvdW5kIiwiciIsIndpZHRoIiwiaGVpZ2h0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLG1CQUFELENBQVAsQ0FBNkJELFNBQTdDOztBQUNBLElBQUlFLGFBQWEsR0FBR0QsT0FBTyxDQUFDLFVBQUQsQ0FBUCxDQUFvQkMsYUFBeEM7QUFFQTs7Ozs7O0FBSUEsSUFBSUMsZUFBZSxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUMzQkMsRUFBQUEsSUFBSSxFQUFFLG9CQURxQjtBQUUzQixhQUFTRixFQUFFLENBQUNHLFFBRmU7QUFJM0JDLEVBQUFBLElBQUksRUFBRSxnQkFBWTtBQUNkLFNBQUtDLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0EsU0FBS0MsS0FBTCxHQUFhUixFQUFFLENBQUNTLElBQUgsRUFBYjtBQUNILEdBVDBCO0FBVzNCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsUUFBUSxFQUFFLEdBREY7QUFFUkMsSUFBQUEsT0FBTyxFQUFFLEtBRkQ7QUFHUkMsSUFBQUEsU0FBUyxFQUFFLEdBSEg7QUFJUkMsSUFBQUEsWUFBWSxFQUFFLENBSk47O0FBTVI7Ozs7Ozs7O0FBUUFDLElBQUFBLE9BQU8sRUFBRTtBQUNMQyxNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxpREFEZDtBQUVMQyxNQUFB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RixHQUFVWCxJQUFJLEdBQUdGLElBQWpCO0FBQ0FZLElBQUFBLENBQUMsQ0FBQ0UsTUFBRixHQUFXWCxJQUFJLEdBQUdGLElBQWxCO0FBRUEsV0FBT1csQ0FBUDtBQUNIO0FBM1EwQixDQUFULENBQXRCO0FBOFFBMUYsRUFBRSxDQUFDRCxlQUFILEdBQXFCOEYsTUFBTSxDQUFDQyxPQUFQLEdBQWlCL0YsZUFBdEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gXG52YXIgUFRNX1JBVElPID0gcmVxdWlyZSgnLi4vQ0NQaHlzaWNzVHlwZXMnKS5QVE1fUkFUSU87XG52YXIgZ2V0V29ybGRTY2FsZSA9IHJlcXVpcmUoJy4uL3V0aWxzJykuZ2V0V29ybGRTY2FsZTtcblxuLyoqXG4gKiBAY2xhc3MgUGh5c2ljc0NvbGxpZGVyXG4gKiBAZXh0ZW5kcyBDb2xsaWRlclxuICovXG52YXIgUGh5c2ljc0NvbGxpZGVyID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5QaHlzaWNzQ29sbGlkZXInLFxuICAgIGV4dGVuZHM6IGNjLkNvbGxpZGVyLFxuXG4gICAgY3RvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9maXh0dXJlcyA9IFtdO1xuICAgICAgICB0aGlzLl9zaGFwZXMgPSBbXTtcbiAgICAgICAgdGhpcy5faW5pdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3JlY3QgPSBjYy5yZWN0KCk7XG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX2RlbnNpdHk6IDEuMCxcbiAgICAgICAgX3NlbnNvcjogZmFsc2UsXG4gICAgICAgIF9mcmljdGlvbjogMC4yLFxuICAgICAgICBfcmVzdGl0dXRpb246IDAsXG4gICAgICAgIFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgZGVuc2l0eS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDlr4bluqZcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGRlbnNpdHlcbiAgICAgICAgICogQGRlZmF1bHQgMVxuICAgICAgICAgKi9cbiAgICAgICAgZGVuc2l0eToge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuZGVuc2l0eScsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVuc2l0eTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlbnNpdHkgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBBIHNlbnNvciBjb2xsaWRlciBjb2xsZWN0cyBjb250YWN0IGluZm9ybWF0aW9uIGJ1dCBuZXZlciBnZW5lcmF0ZXMgYSBjb2xsaXNpb24gcmVzcG9uc2VcbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDkuIDkuKrkvKDmhJ/lmajnsbvlnovnmoTnorDmkp7kvZPkvJrkuqfnlJ/norDmkp7lm57osIPvvIzkvYbmmK/kuI3kvJrlj5HnlJ/niannkIbnorDmkp7mlYjmnpzjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBzZW5zb3JcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHNlbnNvcjoge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuc2Vuc29yJywgICAgICAgIFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbnNvcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlbnNvciAgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgZnJpY3Rpb24gY29lZmZpY2llbnQsIHVzdWFsbHkgaW4gdGhlIHJhbmdlIFswLDFdLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOaRqeaTpuezu+aVsO+8jOWPluWAvOS4gOiIrOWcqCBbMCwgMV0g5LmL6Ze0XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBmcmljdGlvblxuICAgICAgICAgKiBAZGVmYXVsdCAwLjJcbiAgICAgICAgICovXG4gICAgICAgIGZyaWN0aW9uOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5mcmljdGlvbicsICAgICAgICBcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9mcmljdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZyaWN0aW9uID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIHJlc3RpdHV0aW9uIChlbGFzdGljaXR5KSB1c3VhbGx5IGluIHRoZSByYW5nZSBbMCwxXS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDlvLnmgKfns7vmlbDvvIzlj5blgLzkuIDoiKzlnKggWzAsIDFd5LmL6Ze0XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByZXN0aXR1dGlvblxuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICByZXN0aXR1dGlvbjoge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIucmVzdGl0dXRpb24nLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3RpdHV0aW9uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzdGl0dXRpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBQaHlzaWNzIGNvbGxpZGVyIHdpbGwgZmluZCB0aGUgcmlnaWRib2R5IGNvbXBvbmVudCBvbiB0aGUgbm9kZSBhbmQgc2V0IHRvIHRoaXMgcHJvcGVydHkuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog56Kw5pKe5L2T5Lya5Zyo5Yid5aeL5YyW5pe25p+l5om+6IqC54K55LiK5piv5ZCm5a2Y5Zyo5Yia5L2T77yM5aaC5p6c5p+l5om+5oiQ5Yqf5YiZ6LWL5YC85Yiw6L+Z5Liq5bGe5oCn5LiK44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7UmlnaWRCb2R5fSBib2R5XG4gICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICovXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5SaWdpZEJvZHksXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgfSxcbiAgICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfSxcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfSxcblxuICAgIF9nZXRGaXh0dXJlSW5kZXg6IGZ1bmN0aW9uIChmaXh0dXJlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXh0dXJlcy5pbmRleE9mKGZpeHR1cmUpO1xuICAgIH0sXG5cbiAgICBfaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLnB1c2hEZWxheUV2ZW50KHRoaXMsICdfX2luaXQnLCBbXSk7XG4gICAgfSxcbiAgICBfZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLnB1c2hEZWxheUV2ZW50KHRoaXMsICdfX2Rlc3Ryb3knLCBbXSk7XG4gICAgfSxcblxuICAgIF9faW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5faW5pdGVkKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGJvZHkgPSB0aGlzLmJvZHkgfHwgdGhpcy5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcbiAgICAgICAgaWYgKCFib2R5KSByZXR1cm47XG5cbiAgICAgICAgdmFyIGlubmVyQm9keSA9IGJvZHkuX2dldEJvZHkoKTtcbiAgICAgICAgaWYgKCFpbm5lckJvZHkpIHJldHVybjtcblxuICAgICAgICB2YXIgbm9kZSA9IGJvZHkubm9kZTtcbiAgICAgICAgdmFyIHNjYWxlID0gZ2V0V29ybGRTY2FsZShub2RlKTtcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcblxuICAgICAgICB2YXIgc2hhcGVzID0gc2NhbGUueCA9PT0gMCAmJiBzY2FsZS55ID09PSAwID8gW10gOiB0aGlzLl9jcmVhdGVTaGFwZShzY2FsZSk7XG5cbiAgICAgICAgaWYgKCEoc2hhcGVzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICBzaGFwZXMgPSBbc2hhcGVzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjYXRlZ29yeUJpdHMgPSAxIDw8IG5vZGUuZ3JvdXBJbmRleDtcbiAgICAgICAgdmFyIG1hc2tCaXRzID0gMDtcbiAgICAgICAgdmFyIGJpdHMgPSBjYy5nYW1lLmNvbGxpc2lvbk1hdHJpeFtub2RlLmdyb3VwSW5kZXhdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghYml0c1tpXSkgY29udGludWU7XG4gICAgICAgICAgICBtYXNrQml0cyB8PSAxIDw8IGk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZmlsdGVyID0ge1xuICAgICAgICAgICAgY2F0ZWdvcnlCaXRzOiBjYXRlZ29yeUJpdHMsXG4gICAgICAgICAgICBtYXNrQml0czogbWFza0JpdHMsXG4gICAgICAgICAgICBncm91cEluZGV4OiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hhcGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc2hhcGUgPSBzaGFwZXNbaV07XG5cbiAgICAgICAgICAgIHZhciBmaXhEZWYgPSBuZXcgYjIuRml4dHVyZURlZigpO1xuICAgICAgICAgICAgZml4RGVmLmRlbnNpdHkgPSB0aGlzLmRlbnNpdHk7XG4gICAgICAgICAgICBmaXhEZWYuaXNTZW5zb3IgPSB0aGlzLnNlbnNvcjtcbiAgICAgICAgICAgIGZpeERlZi5mcmljdGlvbiA9IHRoaXMuZnJpY3Rpb247XG4gICAgICAgICAgICBmaXhEZWYucmVzdGl0dXRpb24gPSB0aGlzLnJlc3RpdHV0aW9uO1xuICAgICAgICAgICAgZml4RGVmLnNoYXBlID0gc2hhcGU7XG5cbiAgICAgICAgICAgIGZpeERlZi5maWx0ZXIgPSBmaWx0ZXI7XG5cbiAgICAgICAgICAgIHZhciBmaXh0dXJlID0gaW5uZXJCb2R5LkNyZWF0ZUZpeHR1cmUoZml4RGVmKTtcbiAgICAgICAgICAgIGZpeHR1cmUuY29sbGlkZXIgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAoYm9keS5lbmFibGVkQ29udGFjdExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgbWFuYWdlci5fcmVnaXN0ZXJDb250YWN0Rml4dHVyZShmaXh0dXJlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fc2hhcGVzLnB1c2goc2hhcGUpO1xuICAgICAgICAgICAgdGhpcy5fZml4dHVyZXMucHVzaChmaXh0dXJlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG5cbiAgICAgICAgdGhpcy5faW5pdGVkID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgX19kZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5faW5pdGVkKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGZpeHR1cmVzID0gdGhpcy5fZml4dHVyZXM7XG4gICAgICAgIHZhciBib2R5ID0gdGhpcy5ib2R5Ll9nZXRCb2R5KCk7XG4gICAgICAgIHZhciBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gZml4dHVyZXMubGVuZ3RoLTE7IGkgPj0wIDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIgZml4dHVyZSA9IGZpeHR1cmVzW2ldO1xuICAgICAgICAgICAgZml4dHVyZS5jb2xsaWRlciA9IG51bGw7XG5cbiAgICAgICAgICAgIG1hbmFnZXIuX3VucmVnaXN0ZXJDb250YWN0Rml4dHVyZShmaXh0dXJlKTtcblxuICAgICAgICAgICAgaWYgKGJvZHkpIHtcbiAgICAgICAgICAgICAgICBib2R5LkRlc3Ryb3lGaXh0dXJlKGZpeHR1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJvZHkgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fZml4dHVyZXMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fc2hhcGVzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xuICAgIH0sXG4gICAgXG4gICAgX2NyZWF0ZVNoYXBlOiBmdW5jdGlvbiAoKSB7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBcHBseSBjdXJyZW50IGNoYW5nZXMgdG8gY29sbGlkZXIsIHRoaXMgd2lsbCByZWdlbmVyYXRlIGlubmVyIGJveDJkIGZpeHR1cmVzLlxuICAgICAqICEjemhcbiAgICAgKiDlupTnlKjlvZPliY0gY29sbGlkZXIg5Lit55qE5L+u5pS577yM6LCD55So5q2k5Ye95pWw5Lya6YeN5paw55Sf5oiQ5YaF6YOoIGJveDJkIOeahOWkueWFt+OAglxuICAgICAqIEBtZXRob2QgYXBwbHlcbiAgICAgKi9cbiAgICBhcHBseTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCB0aGUgd29ybGQgYWFiYiBvZiB0aGUgY29sbGlkZXJcbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W56Kw5pKe5L2T55qE5LiW55WM5Z2Q5qCH57O75LiL55qE5YyF5Zu055uSXG4gICAgICogQG1ldGhvZCBnZXRBQUJCXG4gICAgICovXG4gICAgZ2V0QUFCQjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgTUFYID0gMTBlNjtcblxuICAgICAgICB2YXIgbWluWCA9IE1BWCwgbWluWSA9IE1BWDtcbiAgICAgICAgdmFyIG1heFggPSAtTUFYLCBtYXhZID0gLU1BWDtcbiAgICAgICAgXG4gICAgICAgIHZhciBmaXh0dXJlcyA9IHRoaXMuX2ZpeHR1cmVzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpeHR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZml4dHVyZSA9IGZpeHR1cmVzW2ldO1xuXG4gICAgICAgICAgICB2YXIgY291bnQgPSBmaXh0dXJlLkdldFNoYXBlKCkuR2V0Q2hpbGRDb3VudCgpO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb3VudDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFhYmIgPSBmaXh0dXJlLkdldEFBQkIoaik7XG4gICAgICAgICAgICAgICAgaWYgKGFhYmIubG93ZXJCb3VuZC54IDwgbWluWCkgbWluWCA9IGFhYmIubG93ZXJCb3VuZC54O1xuICAgICAgICAgICAgICAgIGlmIChhYWJiLmxvd2VyQm91bmQueSA8IG1pblkpIG1pblkgPSBhYWJiLmxvd2VyQm91bmQueTtcbiAgICAgICAgICAgICAgICBpZiAoYWFiYi51cHBlckJvdW5kLnggPiBtYXhYKSBtYXhYID0gYWFiYi51cHBlckJvdW5kLng7XG4gICAgICAgICAgICAgICAgaWYgKGFhYmIudXBwZXJCb3VuZC55ID4gbWF4WSkgbWF4WSA9IGFhYmIudXBwZXJCb3VuZC55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbWluWCAqPSBQVE1fUkFUSU87XG4gICAgICAgIG1pblkgKj0gUFRNX1JBVElPO1xuICAgICAgICBtYXhYICo9IFBUTV9SQVRJTztcbiAgICAgICAgbWF4WSAqPSBQVE1fUkFUSU87XG5cbiAgICAgICAgdmFyIHIgPSB0aGlzLl9yZWN0O1xuICAgICAgICByLnggPSBtaW5YO1xuICAgICAgICByLnkgPSBtaW5ZO1xuICAgICAgICByLndpZHRoID0gbWF4WCAtIG1pblg7XG4gICAgICAgIHIuaGVpZ2h0ID0gbWF4WSAtIG1pblk7XG5cbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxufSk7XG5cbmNjLlBoeXNpY3NDb2xsaWRlciA9IG1vZHVsZS5leHBvcnRzID0gUGh5c2ljc0NvbGxpZGVyO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=