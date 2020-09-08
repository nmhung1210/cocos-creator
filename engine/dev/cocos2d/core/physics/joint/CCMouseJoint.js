
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/joint/CCMouseJoint.js';
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

var tempB2Vec2 = new b2.Vec2();
/**
 * !#en
 * A mouse joint is used to make a point on a body track a
 * specified world point. This a soft constraint with a maximum
 * force. This allows the constraint to stretch and without
 * applying huge forces.
 * Mouse Joint will auto register the touch event with the mouse region node,
 * and move the choosed rigidbody in touch move event.
 * Note : generally mouse joint only used in test bed.
 * !#zh
 * 鼠标关节用于使刚体上的一个点追踪一个指定的世界坐标系下的位置。
 * 鼠标关节可以指定一个最大的里来施加一个柔和的约束。
 * 鼠标关节会自动使用 mouse region 节点来注册鼠标事件，并且在触摸移动事件中移动选中的刚体。
 * 注意：一般鼠标关节只在测试环境中使用。
 * @class MouseJoint
 * @extends Joint
 */

var MouseJoint = cc.Class({
  name: 'cc.MouseJoint',
  "extends": cc.Joint,
  editor: CC_EDITOR && {
    inspector: 'packages://inspector/inspectors/comps/physics/joint.js',
    menu: 'i18n:MAIN_MENU.component.physics/Joint/Mouse'
  },
  properties: {
    _target: 1,
    _frequency: 5,
    _dampingRatio: 0.7,
    _maxForce: 0,
    connectedBody: {
      "default": null,
      type: cc.RigidBody,
      visible: false,
      override: true
    },
    collideConnected: {
      "default": true,
      visible: false,
      override: true
    },

    /**
     * !#en
     * The anchor of the rigidbody.
     * !#zh
     * 刚体的锚点。
     * @property {Vec2} anchor
     * @default cc.v2(0, 0)
     */
    anchor: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.anchor',
      "default": cc.v2(0, 0),
      override: true,
      visible: false
    },

    /**
     * !#en
     * The anchor of the connected rigidbody.
     * !#zh
     * 关节另一端刚体的锚点。
     * @property {Vec2} connectedAnchor
     * @default cc.v2(0, 0)
     */
    connectedAnchor: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.connectedAnchor',
      "default": cc.v2(0, 0),
      override: true,
      visible: false
    },

    /**
     * !#en
     * The node used to register touch evnet.
     * If this is null, it will be the joint's node.
     * !#zh
     * 用于注册触摸事件的节点。
     * 如果没有设置这个值，那么将会使用关节的节点来注册事件。
     * @property {Node} mouseRegion
     * @default null
     */
    mouseRegion: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.mouseRegion',
      "default": null,
      type: cc.Node
    },

    /**
     * !#en
     * The target point.
     * The mouse joint will move choosed rigidbody to target point.
     * !#zh
     * 目标点，鼠标关节将会移动选中的刚体到指定的目标点
     * @property {Vec2} target
     */
    target: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.target',
      visible: false,
      get: function get() {
        return this._target;
      },
      set: function set(value) {
        this._target = value;

        if (this._joint) {
          tempB2Vec2.x = value.x / PTM_RATIO;
          tempB2Vec2.y = value.y / PTM_RATIO;

          this._joint.SetTarget(tempB2Vec2);
        }
      }
    },

    /**
     * !#en
     * The spring frequency.
     * !#zh
     * 弹簧系数。
     * @property {Number} frequency
     * @default 0
     */
    frequency: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.frequency',
      get: function get() {
        return this._frequency;
      },
      set: function set(value) {
        this._frequency = value;

        if (this._joint) {
          this._joint.SetFrequency(value);
        }
      }
    },

    /**
     * !#en
     * The damping ratio.
     * !#zh
     * 阻尼，表示关节变形后，恢复到初始状态受到的阻力。
     * @property {Number} dampingRatio
     * @property 0
     */
    dampingRatio: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.dampingRatio',
      get: function get() {
        return this._dampingRatio;
      },
      set: function set(value) {
        this._dampingRatio = value;

        if (this._joint) {
          this._joint.SetDampingRatio(value);
        }
      }
    },

    /**
     * !#en
     * The maximum force
     * !#zh
     * 最大阻力值
     * @property {Number} maxForce
     * @default 1
     */
    maxForce: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.maxForce',
      visible: false,
      get: function get() {
        return this._maxForce;
      },
      set: function set(value) {
        this._maxForce = value;

        if (this._joint) {
          this._joint.SetMaxForce(value);
        }
      }
    }
  },
  onLoad: function onLoad() {
    var mouseRegion = this.mouseRegion || this.node;
    mouseRegion.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
    mouseRegion.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    mouseRegion.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    mouseRegion.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  },
  onEnable: function onEnable() {},
  start: function start() {},
  onTouchBegan: function onTouchBegan(event) {
    var manager = cc.director.getPhysicsManager();
    var target = this._pressPoint = event.touch.getLocation();

    if (cc.Camera && cc.Camera.main) {
      target = cc.Camera.main.getScreenToWorldPoint(target);
    }

    var collider = manager.testPoint(target);
    if (!collider) return;
    var body = this.connectedBody = collider.body;
    body.awake = true;
    this.maxForce = 1000 * this.connectedBody.getMass();
    this.target = target;

    this._init();
  },
  onTouchMove: function onTouchMove(event) {
    this._pressPoint = event.touch.getLocation();
  },
  onTouchEnd: function onTouchEnd(event) {
    this._destroy();

    this._pressPoint = null;
  },
  _createJointDef: function _createJointDef() {
    var def = new b2.MouseJointDef();
    tempB2Vec2.x = this.target.x / PTM_RATIO;
    tempB2Vec2.y = this.target.y / PTM_RATIO;
    def.target = tempB2Vec2;
    def.maxForce = this.maxForce;
    def.dampingRatio = this.dampingRatio;
    def.frequencyHz = this.frequency;
    return def;
  },
  update: function update() {
    if (!this._pressPoint || !this._isValid()) {
      return;
    }

    var camera = cc.Camera.findCamera(this.node);

    if (camera) {
      this.target = camera.getScreenToWorldPoint(this._pressPoint);
    } else {
      this.target = this._pressPoint;
    }
  }
});
cc.MouseJoint = module.exports = MouseJoint;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3Mvam9pbnQvQ0NNb3VzZUpvaW50LmpzIl0sIm5hbWVzIjpbIlBUTV9SQVRJTyIsInJlcXVpcmUiLCJ0ZW1wQjJWZWMyIiwiYjIiLCJWZWMyIiwiTW91c2VKb2ludCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiSm9pbnQiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJpbnNwZWN0b3IiLCJtZW51IiwicHJvcGVydGllcyIsIl90YXJnZXQiLCJfZnJlcXVlbmN5IiwiX2RhbXBpbmdSYXRpbyIsIl9tYXhGb3JjZSIsImNvbm5lY3RlZEJvZHkiLCJ0eXBlIiwiUmlnaWRCb2R5IiwidmlzaWJsZSIsIm92ZXJyaWRlIiwiY29sbGlkZUNvbm5lY3RlZCIsImFuY2hvciIsInRvb2x0aXAiLCJDQ19ERVYiLCJ2MiIsImNvbm5lY3RlZEFuY2hvciIsIm1vdXNlUmVnaW9uIiwiTm9kZSIsInRhcmdldCIsImdldCIsInNldCIsInZhbHVlIiwiX2pvaW50IiwieCIsInkiLCJTZXRUYXJnZXQiLCJmcmVxdWVuY3kiLCJTZXRGcmVxdWVuY3kiLCJkYW1waW5nUmF0aW8iLCJTZXREYW1waW5nUmF0aW8iLCJtYXhGb3JjZSIsIlNldE1heEZvcmNlIiwib25Mb2FkIiwibm9kZSIsIm9uIiwiRXZlbnRUeXBlIiwiVE9VQ0hfU1RBUlQiLCJvblRvdWNoQmVnYW4iLCJUT1VDSF9NT1ZFIiwib25Ub3VjaE1vdmUiLCJUT1VDSF9FTkQiLCJvblRvdWNoRW5kIiwiVE9VQ0hfQ0FOQ0VMIiwib25FbmFibGUiLCJzdGFydCIsImV2ZW50IiwibWFuYWdlciIsImRpcmVjdG9yIiwiZ2V0UGh5c2ljc01hbmFnZXIiLCJfcHJlc3NQb2ludCIsInRvdWNoIiwiZ2V0TG9jYXRpb24iLCJDYW1lcmEiLCJtYWluIiwiZ2V0U2NyZWVuVG9Xb3JsZFBvaW50IiwiY29sbGlkZXIiLCJ0ZXN0UG9pbnQiLCJib2R5IiwiYXdha2UiLCJnZXRNYXNzIiwiX2luaXQiLCJfZGVzdHJveSIsIl9jcmVhdGVKb2ludERlZiIsImRlZiIsIk1vdXNlSm9pbnREZWYiLCJmcmVxdWVuY3lIeiIsInVwZGF0ZSIsIl9pc1ZhbGlkIiwiY2FtZXJhIiwiZmluZENhbWVyYSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxtQkFBRCxDQUFQLENBQTZCRCxTQUE3Qzs7QUFFQSxJQUFJRSxVQUFVLEdBQUcsSUFBSUMsRUFBRSxDQUFDQyxJQUFQLEVBQWpCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxJQUFJQyxVQUFVLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxJQUFJLEVBQUUsZUFEZ0I7QUFFdEIsYUFBU0YsRUFBRSxDQUFDRyxLQUZVO0FBSXRCQyxFQUFBQSxNQUFNLEVBQUVDLFNBQVMsSUFBSTtBQUNqQkMsSUFBQUEsU0FBUyxFQUFFLHdEQURNO0FBRWpCQyxJQUFBQSxJQUFJLEVBQUU7QUFGVyxHQUpDO0FBU3RCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsT0FBTyxFQUFFLENBREQ7QUFFUkMsSUFBQUEsVUFBVSxFQUFFLENBRko7QUFHUkMsSUFBQUEsYUFBYSxFQUFFLEdBSFA7QUFJUkMsSUFBQUEsU0FBUyxFQUFFLENBSkg7QUFNUkMsSUFBQUEsYUFBYSxFQUFFO0FBQ1gsaUJBQVMsSUFERTtBQUVYQyxNQUFBQSxJQUFJLEVBQUVkLEVBQUUsQ0FBQ2UsU0FGRTtBQUdYQyxNQUFBQSxPQUFPLEVBQUUsS0FIRTtBQUlYQyxNQUFBQSxRQUFRLEVBQUU7QUFKQyxLQU5QO0FBYVJDLElBQUFBLGdCQUFnQixFQUFFO0FBQ2QsaUJBQVMsSUFESztBQUVkRixNQUFBQSxPQUFPLEVBQUUsS0FGSztBQUdkQyxNQUFBQSxRQUFRLEVBQUU7QUFISSxLQWJWOztBQW1CUjs7Ozs7Ozs7QUFRQUUsSUFBQUEsTUFBTSxFQUFFO0FBQ0pDLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLGdEQURmO0FBRUosaUJBQVNyQixFQUFFLENBQUNzQixFQUFILENBQU0sQ0FBTixFQUFTLENBQVQsQ0FGTDtBQUdKTCxNQUFBQSxRQUFRLEVBQUUsSUFITjtBQUlKRCxNQUFBQSxPQUFPLEVBQUU7QUFKTCxLQTNCQTs7QUFpQ1I7Ozs7Ozs7O0FBUUFPLElBQUFBLGVBQWUsRUFBRTtBQUNiSCxNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSx5REFETjtBQUViLGlCQUFTckIsRUFBRSxDQUFDc0IsRUFBSCxDQUFNLENBQU4sRUFBUyxDQUFULENBRkk7QUFHYkwsTUFBQUEsUUFBUSxFQUFFLElBSEc7QUFJYkQsTUFBQUEsT0FBTyxFQUFFO0FBSkksS0F6Q1Q7O0FBZ0RSOzs7Ozs7Ozs7O0FBVUFRLElBQUFBLFdBQVcsRUFBRTtBQUNUSixNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxxREFEVjtBQUVULGlCQUFTLElBRkE7QUFHVFAsTUFBQUEsSUFBSSxFQUFFZCxFQUFFLENBQUN5QjtBQUhBLEtBMURMOztBQWdFUjs7Ozs7Ozs7QUFRQUMsSUFBQUEsTUFBTSxFQUFFO0FBQ0pOLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLGdEQURmO0FBRUpMLE1BQUFBLE9BQU8sRUFBRSxLQUZMO0FBR0pXLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLbEIsT0FBWjtBQUNILE9BTEc7QUFNSm1CLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLGFBQUtwQixPQUFMLEdBQWVvQixLQUFmOztBQUNBLFlBQUksS0FBS0MsTUFBVCxFQUFpQjtBQUNibEMsVUFBQUEsVUFBVSxDQUFDbUMsQ0FBWCxHQUFlRixLQUFLLENBQUNFLENBQU4sR0FBUXJDLFNBQXZCO0FBQ0FFLFVBQUFBLFVBQVUsQ0FBQ29DLENBQVgsR0FBZUgsS0FBSyxDQUFDRyxDQUFOLEdBQVF0QyxTQUF2Qjs7QUFDQSxlQUFLb0MsTUFBTCxDQUFZRyxTQUFaLENBQXNCckMsVUFBdEI7QUFDSDtBQUNKO0FBYkcsS0F4RUE7O0FBd0ZSOzs7Ozs7OztBQVFBc0MsSUFBQUEsU0FBUyxFQUFFO0FBQ1BkLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLG1EQURaO0FBRVBNLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLakIsVUFBWjtBQUNILE9BSk07QUFLUGtCLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLGFBQUtuQixVQUFMLEdBQWtCbUIsS0FBbEI7O0FBQ0EsWUFBSSxLQUFLQyxNQUFULEVBQWlCO0FBQ2IsZUFBS0EsTUFBTCxDQUFZSyxZQUFaLENBQXlCTixLQUF6QjtBQUNIO0FBQ0o7QUFWTSxLQWhHSDs7QUE2R1I7Ozs7Ozs7O0FBUUFPLElBQUFBLFlBQVksRUFBRTtBQUNWaEIsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUksc0RBRFQ7QUFFVk0sTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixlQUFPLEtBQUtoQixhQUFaO0FBQ0gsT0FKUztBQUtWaUIsTUFBQUEsR0FBRyxFQUFFLGFBQVVDLEtBQVYsRUFBaUI7QUFDbEIsYUFBS2xCLGFBQUwsR0FBcUJrQixLQUFyQjs7QUFDQSxZQUFJLEtBQUtDLE1BQVQsRUFBaUI7QUFDYixlQUFLQSxNQUFMLENBQVlPLGVBQVosQ0FBNEJSLEtBQTVCO0FBQ0g7QUFDSjtBQVZTLEtBckhOOztBQWtJUjs7Ozs7Ozs7QUFRQVMsSUFBQUEsUUFBUSxFQUFFO0FBQ05sQixNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxrREFEYjtBQUVOTCxNQUFBQSxPQUFPLEVBQUUsS0FGSDtBQUdOVyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS2YsU0FBWjtBQUNILE9BTEs7QUFNTmdCLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLGFBQUtqQixTQUFMLEdBQWlCaUIsS0FBakI7O0FBQ0EsWUFBSSxLQUFLQyxNQUFULEVBQWlCO0FBQ2IsZUFBS0EsTUFBTCxDQUFZUyxXQUFaLENBQXdCVixLQUF4QjtBQUNIO0FBQ0o7QUFYSztBQTFJRixHQVRVO0FBa0t0QlcsRUFBQUEsTUFBTSxFQUFFLGtCQUFZO0FBQ2hCLFFBQUloQixXQUFXLEdBQUcsS0FBS0EsV0FBTCxJQUFvQixLQUFLaUIsSUFBM0M7QUFDQWpCLElBQUFBLFdBQVcsQ0FBQ2tCLEVBQVosQ0FBZTFDLEVBQUUsQ0FBQ3lCLElBQUgsQ0FBUWtCLFNBQVIsQ0FBa0JDLFdBQWpDLEVBQThDLEtBQUtDLFlBQW5ELEVBQWlFLElBQWpFO0FBQ0FyQixJQUFBQSxXQUFXLENBQUNrQixFQUFaLENBQWUxQyxFQUFFLENBQUN5QixJQUFILENBQVFrQixTQUFSLENBQWtCRyxVQUFqQyxFQUE2QyxLQUFLQyxXQUFsRCxFQUErRCxJQUEvRDtBQUNBdkIsSUFBQUEsV0FBVyxDQUFDa0IsRUFBWixDQUFlMUMsRUFBRSxDQUFDeUIsSUFBSCxDQUFRa0IsU0FBUixDQUFrQkssU0FBakMsRUFBNEMsS0FBS0MsVUFBakQsRUFBNkQsSUFBN0Q7QUFDQXpCLElBQUFBLFdBQVcsQ0FBQ2tCLEVBQVosQ0FBZTFDLEVBQUUsQ0FBQ3lCLElBQUgsQ0FBUWtCLFNBQVIsQ0FBa0JPLFlBQWpDLEVBQStDLEtBQUtELFVBQXBELEVBQWdFLElBQWhFO0FBQ0gsR0F4S3FCO0FBMEt0QkUsRUFBQUEsUUFBUSxFQUFFLG9CQUFZLENBQ3JCLENBM0txQjtBQTZLdEJDLEVBQUFBLEtBQUssRUFBRSxpQkFBWSxDQUNsQixDQTlLcUI7QUFnTHRCUCxFQUFBQSxZQUFZLEVBQUUsc0JBQVVRLEtBQVYsRUFBaUI7QUFDM0IsUUFBSUMsT0FBTyxHQUFHdEQsRUFBRSxDQUFDdUQsUUFBSCxDQUFZQyxpQkFBWixFQUFkO0FBQ0EsUUFBSTlCLE1BQU0sR0FBRyxLQUFLK0IsV0FBTCxHQUFtQkosS0FBSyxDQUFDSyxLQUFOLENBQVlDLFdBQVosRUFBaEM7O0FBRUEsUUFBSTNELEVBQUUsQ0FBQzRELE1BQUgsSUFBYTVELEVBQUUsQ0FBQzRELE1BQUgsQ0FBVUMsSUFBM0IsRUFBaUM7QUFDN0JuQyxNQUFBQSxNQUFNLEdBQUcxQixFQUFFLENBQUM0RCxNQUFILENBQVVDLElBQVYsQ0FBZUMscUJBQWYsQ0FBcUNwQyxNQUFyQyxDQUFUO0FBQ0g7O0FBRUQsUUFBSXFDLFFBQVEsR0FBR1QsT0FBTyxDQUFDVSxTQUFSLENBQW1CdEMsTUFBbkIsQ0FBZjtBQUNBLFFBQUksQ0FBQ3FDLFFBQUwsRUFBZTtBQUVmLFFBQUlFLElBQUksR0FBRyxLQUFLcEQsYUFBTCxHQUFxQmtELFFBQVEsQ0FBQ0UsSUFBekM7QUFDQUEsSUFBQUEsSUFBSSxDQUFDQyxLQUFMLEdBQWEsSUFBYjtBQUVBLFNBQUs1QixRQUFMLEdBQWdCLE9BQU8sS0FBS3pCLGFBQUwsQ0FBbUJzRCxPQUFuQixFQUF2QjtBQUNBLFNBQUt6QyxNQUFMLEdBQWNBLE1BQWQ7O0FBRUEsU0FBSzBDLEtBQUw7QUFDSCxHQWxNcUI7QUFvTXRCckIsRUFBQUEsV0FBVyxFQUFFLHFCQUFVTSxLQUFWLEVBQWlCO0FBQzFCLFNBQUtJLFdBQUwsR0FBbUJKLEtBQUssQ0FBQ0ssS0FBTixDQUFZQyxXQUFaLEVBQW5CO0FBQ0gsR0F0TXFCO0FBd010QlYsRUFBQUEsVUFBVSxFQUFFLG9CQUFVSSxLQUFWLEVBQWlCO0FBQ3pCLFNBQUtnQixRQUFMOztBQUNBLFNBQUtaLFdBQUwsR0FBbUIsSUFBbkI7QUFDSCxHQTNNcUI7QUE2TXRCYSxFQUFBQSxlQUFlLEVBQUUsMkJBQVk7QUFDekIsUUFBSUMsR0FBRyxHQUFHLElBQUkxRSxFQUFFLENBQUMyRSxhQUFQLEVBQVY7QUFDQTVFLElBQUFBLFVBQVUsQ0FBQ21DLENBQVgsR0FBZSxLQUFLTCxNQUFMLENBQVlLLENBQVosR0FBY3JDLFNBQTdCO0FBQ0FFLElBQUFBLFVBQVUsQ0FBQ29DLENBQVgsR0FBZSxLQUFLTixNQUFMLENBQVlNLENBQVosR0FBY3RDLFNBQTdCO0FBQ0E2RSxJQUFBQSxHQUFHLENBQUM3QyxNQUFKLEdBQWE5QixVQUFiO0FBQ0EyRSxJQUFBQSxHQUFHLENBQUNqQyxRQUFKLEdBQWUsS0FBS0EsUUFBcEI7QUFDQWlDLElBQUFBLEdBQUcsQ0FBQ25DLFlBQUosR0FBbUIsS0FBS0EsWUFBeEI7QUFDQW1DLElBQUFBLEdBQUcsQ0FBQ0UsV0FBSixHQUFrQixLQUFLdkMsU0FBdkI7QUFDQSxXQUFPcUMsR0FBUDtBQUNILEdBdE5xQjtBQXdOdEJHLEVBQUFBLE1BQU0sRUFBRSxrQkFBWTtBQUNoQixRQUFJLENBQUMsS0FBS2pCLFdBQU4sSUFBcUIsQ0FBQyxLQUFLa0IsUUFBTCxFQUExQixFQUEyQztBQUN2QztBQUNIOztBQUVELFFBQUlDLE1BQU0sR0FBRzVFLEVBQUUsQ0FBQzRELE1BQUgsQ0FBVWlCLFVBQVYsQ0FBcUIsS0FBS3BDLElBQTFCLENBQWI7O0FBQ0EsUUFBSW1DLE1BQUosRUFBWTtBQUNSLFdBQUtsRCxNQUFMLEdBQWNrRCxNQUFNLENBQUNkLHFCQUFQLENBQTZCLEtBQUtMLFdBQWxDLENBQWQ7QUFDSCxLQUZELE1BR0s7QUFDRCxXQUFLL0IsTUFBTCxHQUFjLEtBQUsrQixXQUFuQjtBQUNIO0FBQ0o7QUFwT3FCLENBQVQsQ0FBakI7QUF1T0F6RCxFQUFFLENBQUNELFVBQUgsR0FBZ0IrRSxNQUFNLENBQUNDLE9BQVAsR0FBaUJoRixVQUFqQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIFBUTV9SQVRJTyA9IHJlcXVpcmUoJy4uL0NDUGh5c2ljc1R5cGVzJykuUFRNX1JBVElPO1xuXG52YXIgdGVtcEIyVmVjMiA9IG5ldyBiMi5WZWMyKCk7XG4vKipcbiAqICEjZW5cbiAqIEEgbW91c2Ugam9pbnQgaXMgdXNlZCB0byBtYWtlIGEgcG9pbnQgb24gYSBib2R5IHRyYWNrIGFcbiAqIHNwZWNpZmllZCB3b3JsZCBwb2ludC4gVGhpcyBhIHNvZnQgY29uc3RyYWludCB3aXRoIGEgbWF4aW11bVxuICogZm9yY2UuIFRoaXMgYWxsb3dzIHRoZSBjb25zdHJhaW50IHRvIHN0cmV0Y2ggYW5kIHdpdGhvdXRcbiAqIGFwcGx5aW5nIGh1Z2UgZm9yY2VzLlxuICogTW91c2UgSm9pbnQgd2lsbCBhdXRvIHJlZ2lzdGVyIHRoZSB0b3VjaCBldmVudCB3aXRoIHRoZSBtb3VzZSByZWdpb24gbm9kZSxcbiAqIGFuZCBtb3ZlIHRoZSBjaG9vc2VkIHJpZ2lkYm9keSBpbiB0b3VjaCBtb3ZlIGV2ZW50LlxuICogTm90ZSA6IGdlbmVyYWxseSBtb3VzZSBqb2ludCBvbmx5IHVzZWQgaW4gdGVzdCBiZWQuXG4gKiAhI3poXG4gKiDpvKDmoIflhbPoioLnlKjkuo7kvb/liJrkvZPkuIrnmoTkuIDkuKrngrnov73ouKrkuIDkuKrmjIflrprnmoTkuJbnlYzlnZDmoIfns7vkuIvnmoTkvY3nva7jgIJcbiAqIOm8oOagh+WFs+iKguWPr+S7peaMh+WumuS4gOS4quacgOWkp+eahOmHjOadpeaWveWKoOS4gOS4quaflOWSjOeahOe6puadn+OAglxuICog6byg5qCH5YWz6IqC5Lya6Ieq5Yqo5L2/55SoIG1vdXNlIHJlZ2lvbiDoioLngrnmnaXms6jlhozpvKDmoIfkuovku7bvvIzlubbkuJTlnKjop6bmkbjnp7vliqjkuovku7bkuK3np7vliqjpgInkuK3nmoTliJrkvZPjgIJcbiAqIOazqOaEj++8muS4gOiIrOm8oOagh+WFs+iKguWPquWcqOa1i+ivleeOr+Wig+S4reS9v+eUqOOAglxuICogQGNsYXNzIE1vdXNlSm9pbnRcbiAqIEBleHRlbmRzIEpvaW50XG4gKi9cbnZhciBNb3VzZUpvaW50ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5Nb3VzZUpvaW50JyxcbiAgICBleHRlbmRzOiBjYy5Kb2ludCxcbiAgICBcbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvcGh5c2ljcy9qb2ludC5qcycsXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucGh5c2ljcy9Kb2ludC9Nb3VzZScsXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX3RhcmdldDogMSxcbiAgICAgICAgX2ZyZXF1ZW5jeTogNSxcbiAgICAgICAgX2RhbXBpbmdSYXRpbzogMC43LFxuICAgICAgICBfbWF4Rm9yY2U6IDAsXG5cbiAgICAgICAgY29ubmVjdGVkQm9keToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlJpZ2lkQm9keSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICBjb2xsaWRlQ29ubmVjdGVkOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBhbmNob3Igb2YgdGhlIHJpZ2lkYm9keS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDliJrkvZPnmoTplJrngrnjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtWZWMyfSBhbmNob3JcbiAgICAgICAgICogQGRlZmF1bHQgY2MudjIoMCwgMClcbiAgICAgICAgICovXG4gICAgICAgIGFuY2hvcjoge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuYW5jaG9yJywgICAgICAgICAgICBcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNjLnYyKDAsIDApLFxuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWUsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgYW5jaG9yIG9mIHRoZSBjb25uZWN0ZWQgcmlnaWRib2R5LlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOWFs+iKguWPpuS4gOerr+WImuS9k+eahOmUmueCueOAglxuICAgICAgICAgKiBAcHJvcGVydHkge1ZlYzJ9IGNvbm5lY3RlZEFuY2hvclxuICAgICAgICAgKiBAZGVmYXVsdCBjYy52MigwLCAwKVxuICAgICAgICAgKi9cbiAgICAgICAgY29ubmVjdGVkQW5jaG9yOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5jb25uZWN0ZWRBbmNob3InLFxuICAgICAgICAgICAgZGVmYXVsdDogY2MudjIoMCwgMCksXG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIG5vZGUgdXNlZCB0byByZWdpc3RlciB0b3VjaCBldm5ldC5cbiAgICAgICAgICogSWYgdGhpcyBpcyBudWxsLCBpdCB3aWxsIGJlIHRoZSBqb2ludCdzIG5vZGUuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog55So5LqO5rOo5YaM6Kem5pG45LqL5Lu255qE6IqC54K544CCXG4gICAgICAgICAqIOWmguaenOayoeacieiuvue9rui/meS4quWAvO+8jOmCo+S5iOWwhuS8muS9v+eUqOWFs+iKgueahOiKgueCueadpeazqOWGjOS6i+S7tuOAglxuICAgICAgICAgKiBAcHJvcGVydHkge05vZGV9IG1vdXNlUmVnaW9uXG4gICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICovXG4gICAgICAgIG1vdXNlUmVnaW9uOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5tb3VzZVJlZ2lvbicsICAgICAgICAgICAgXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSB0YXJnZXQgcG9pbnQuXG4gICAgICAgICAqIFRoZSBtb3VzZSBqb2ludCB3aWxsIG1vdmUgY2hvb3NlZCByaWdpZGJvZHkgdG8gdGFyZ2V0IHBvaW50LlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOebruagh+eCue+8jOm8oOagh+WFs+iKguWwhuS8muenu+WKqOmAieS4reeahOWImuS9k+WIsOaMh+WumueahOebruagh+eCuVxuICAgICAgICAgKiBAcHJvcGVydHkge1ZlYzJ9IHRhcmdldFxuICAgICAgICAgKi9cbiAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci50YXJnZXQnLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2pvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBCMlZlYzIueCA9IHZhbHVlLngvUFRNX1JBVElPO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wQjJWZWMyLnkgPSB2YWx1ZS55L1BUTV9SQVRJTztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fam9pbnQuU2V0VGFyZ2V0KHRlbXBCMlZlYzIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgc3ByaW5nIGZyZXF1ZW5jeS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDlvLnnsKfns7vmlbDjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGZyZXF1ZW5jeVxuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICBmcmVxdWVuY3k6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLmZyZXF1ZW5jeScsICAgICAgICAgICAgXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZnJlcXVlbmN5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnJlcXVlbmN5ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2pvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LlNldEZyZXF1ZW5jeSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBkYW1waW5nIHJhdGlvLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOmYu+WwvO+8jOihqOekuuWFs+iKguWPmOW9ouWQju+8jOaBouWkjeWIsOWIneWni+eKtuaAgeWPl+WIsOeahOmYu+WKm+OAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZGFtcGluZ1JhdGlvXG4gICAgICAgICAqIEBwcm9wZXJ0eSAwXG4gICAgICAgICAqL1xuICAgICAgICBkYW1waW5nUmF0aW86IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLmRhbXBpbmdSYXRpbycsICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGFtcGluZ1JhdGlvO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGFtcGluZ1JhdGlvID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2pvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LlNldERhbXBpbmdSYXRpbyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBtYXhpbXVtIGZvcmNlXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5pyA5aSn6Zi75Yqb5YC8XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBtYXhGb3JjZVxuICAgICAgICAgKiBAZGVmYXVsdCAxXG4gICAgICAgICAqL1xuICAgICAgICBtYXhGb3JjZToge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIubWF4Rm9yY2UnLCAgICAgICAgICAgIFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWF4Rm9yY2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXhGb3JjZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9qb2ludCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9qb2ludC5TZXRNYXhGb3JjZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1vdXNlUmVnaW9uID0gdGhpcy5tb3VzZVJlZ2lvbiB8fCB0aGlzLm5vZGU7XG4gICAgICAgIG1vdXNlUmVnaW9uLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hCZWdhbiwgdGhpcyk7XG4gICAgICAgIG1vdXNlUmVnaW9uLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmUsIHRoaXMpO1xuICAgICAgICBtb3VzZVJlZ2lvbi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZCwgdGhpcyk7XG4gICAgICAgIG1vdXNlUmVnaW9uLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICB9LFxuXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB9LFxuXG4gICAgb25Ub3VjaEJlZ2FuOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIG1hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fcHJlc3NQb2ludCA9IGV2ZW50LnRvdWNoLmdldExvY2F0aW9uKCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoY2MuQ2FtZXJhICYmIGNjLkNhbWVyYS5tYWluKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSBjYy5DYW1lcmEubWFpbi5nZXRTY3JlZW5Ub1dvcmxkUG9pbnQodGFyZ2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb2xsaWRlciA9IG1hbmFnZXIudGVzdFBvaW50KCB0YXJnZXQgKTtcbiAgICAgICAgaWYgKCFjb2xsaWRlcikgcmV0dXJuO1xuXG4gICAgICAgIHZhciBib2R5ID0gdGhpcy5jb25uZWN0ZWRCb2R5ID0gY29sbGlkZXIuYm9keTtcbiAgICAgICAgYm9keS5hd2FrZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5tYXhGb3JjZSA9IDEwMDAgKiB0aGlzLmNvbm5lY3RlZEJvZHkuZ2V0TWFzcygpO1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcblxuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfSxcblxuICAgIG9uVG91Y2hNb3ZlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5fcHJlc3NQb2ludCA9IGV2ZW50LnRvdWNoLmdldExvY2F0aW9uKCk7XG4gICAgfSxcblxuICAgIG9uVG91Y2hFbmQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX3ByZXNzUG9pbnQgPSBudWxsO1xuICAgIH0sXG5cbiAgICBfY3JlYXRlSm9pbnREZWY6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRlZiA9IG5ldyBiMi5Nb3VzZUpvaW50RGVmKCk7XG4gICAgICAgIHRlbXBCMlZlYzIueCA9IHRoaXMudGFyZ2V0LngvUFRNX1JBVElPO1xuICAgICAgICB0ZW1wQjJWZWMyLnkgPSB0aGlzLnRhcmdldC55L1BUTV9SQVRJTztcbiAgICAgICAgZGVmLnRhcmdldCA9IHRlbXBCMlZlYzI7XG4gICAgICAgIGRlZi5tYXhGb3JjZSA9IHRoaXMubWF4Rm9yY2U7XG4gICAgICAgIGRlZi5kYW1waW5nUmF0aW8gPSB0aGlzLmRhbXBpbmdSYXRpbztcbiAgICAgICAgZGVmLmZyZXF1ZW5jeUh6ID0gdGhpcy5mcmVxdWVuY3k7XG4gICAgICAgIHJldHVybiBkZWY7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3ByZXNzUG9pbnQgfHwgIXRoaXMuX2lzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNhbWVyYSA9IGNjLkNhbWVyYS5maW5kQ2FtZXJhKHRoaXMubm9kZSk7XG4gICAgICAgIGlmIChjYW1lcmEpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gY2FtZXJhLmdldFNjcmVlblRvV29ybGRQb2ludCh0aGlzLl9wcmVzc1BvaW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5fcHJlc3NQb2ludDtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5Nb3VzZUpvaW50ID0gbW9kdWxlLmV4cG9ydHMgPSBNb3VzZUpvaW50O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=