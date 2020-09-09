
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/joint/CCJoint.js';
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
/**
 * !#en
 * Base class for joints to connect rigidbody.
 * !#zh
 * 关节类的基类
 * @class Joint
 * @extends Component
 */


var Joint = cc.Class({
  name: 'cc.Joint',
  "extends": cc.Component,
  editor: {
    requireComponent: cc.RigidBody
  },
  properties: {
    /**
    * !#en
    * The anchor of the rigidbody.
    * !#zh
    * 刚体的锚点。
    * @property {Vec2} anchor
    * @default cc.v2(0, 0)
    */
    anchor: {
      "default": cc.v2(0, 0),
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.anchor'
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
      "default": cc.v2(0, 0),
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.connectedAnchor'
    },

    /**
     * !#en
     * The rigidbody to which the other end of the joint is attached.
     * !#zh
     * 关节另一端链接的刚体
     * @property {RigidBody} connectedBody
     * @default null
     */
    connectedBody: {
      "default": null,
      type: cc.RigidBody,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.connectedBody'
    },

    /**
     * !#en
     * Should the two rigid bodies connected with this joint collide with each other?
     * !#zh
     * 链接到关节上的两个刚体是否应该相互碰撞？
     * @property {Boolean} collideConnected
     * @default false
     */
    collideConnected: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.collideConnected'
    }
  },
  onDisable: function onDisable() {
    this._destroy();
  },
  onEnable: function onEnable() {
    this._init();
  },
  // need init after body and connected body init
  start: function start() {
    this._init();
  },

  /**
   * !#en
   * Apply current changes to joint, this will regenerate inner box2d joint.
   * !#zh
   * 应用当前关节中的修改，调用此函数会重新生成内部 box2d 的关节。
   * @method apply
   */
  apply: function apply() {
    this._destroy();

    this._init();
  },

  /**
   * !#en
   * Get the anchor point on rigidbody in world coordinates.
   * !#zh
   * 获取刚体世界坐标系下的锚点。
   * @method getWorldAnchor
   * @return {Vec2}
   */
  getWorldAnchor: function getWorldAnchor() {
    if (this._joint) {
      var anchor = this._joint.GetAnchorA();

      return cc.v2(anchor.x * PTM_RATIO, anchor.y * PTM_RATIO);
    }

    return cc.Vec2.ZERO;
  },

  /**
   * !#en
   * Get the anchor point on connected rigidbody in world coordinates.
   * !#zh
   * 获取链接刚体世界坐标系下的锚点。
   * @method getWorldConnectedAnchor
   * @return {Vec2}
   */
  getWorldConnectedAnchor: function getWorldConnectedAnchor() {
    if (this._joint) {
      var anchor = this._joint.GetAnchorB();

      return cc.v2(anchor.x * PTM_RATIO, anchor.y * PTM_RATIO);
    }

    return cc.Vec2.ZERO;
  },

  /**
   * !#en
   * Gets the reaction force of the joint.
   * !#zh
   * 获取关节的反作用力。
   * @method getReactionForce
   * @param {Number} timeStep - The time to calculate the reaction force for.
   * @return {Vec2}
   */
  getReactionForce: function getReactionForce(timeStep) {
    var out = cc.v2();

    if (this._joint) {
      return this._joint.GetReactionForce(timeStep, out);
    }

    return out;
  },

  /**
   * !#en
   * Gets the reaction torque of the joint.
   * !#zh
   * 获取关节的反扭矩。
   * @method getReactionTorque
   * @param {Number} timeStep - The time to calculate the reaction torque for.
   * @return {Number}
   */
  getReactionTorque: function getReactionTorque(timeStep) {
    if (this._joint) {
      return this._joint.GetReactionTorque(timeStep);
    }

    return 0;
  },
  _init: function _init() {
    cc.director.getPhysicsManager().pushDelayEvent(this, '__init', []);
  },
  _destroy: function _destroy() {
    cc.director.getPhysicsManager().pushDelayEvent(this, '__destroy', []);
  },
  __init: function __init() {
    if (this._inited) return;
    this.body = this.getComponent(cc.RigidBody);

    if (this._isValid()) {
      var def = this._createJointDef();

      if (!def) return;
      def.bodyA = this.body._getBody();
      def.bodyB = this.connectedBody._getBody();
      def.collideConnected = this.collideConnected;

      cc.director.getPhysicsManager()._addJoint(this, def);

      this._inited = true;
    }
  },
  __destroy: function __destroy() {
    if (!this._inited) return;

    cc.director.getPhysicsManager()._removeJoint(this);

    this._joint = null;
    this._inited = false;
  },
  _createJointDef: function _createJointDef() {
    return null;
  },
  _isValid: function _isValid() {
    return this.body && this.body._getBody() && this.connectedBody && this.connectedBody._getBody();
  }
});
cc.Joint = module.exports = Joint;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3Mvam9pbnQvQ0NKb2ludC5qcyJdLCJuYW1lcyI6WyJQVE1fUkFUSU8iLCJyZXF1aXJlIiwiSm9pbnQiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsImVkaXRvciIsInJlcXVpcmVDb21wb25lbnQiLCJSaWdpZEJvZHkiLCJwcm9wZXJ0aWVzIiwiYW5jaG9yIiwidjIiLCJ0b29sdGlwIiwiQ0NfREVWIiwiY29ubmVjdGVkQW5jaG9yIiwiY29ubmVjdGVkQm9keSIsInR5cGUiLCJjb2xsaWRlQ29ubmVjdGVkIiwib25EaXNhYmxlIiwiX2Rlc3Ryb3kiLCJvbkVuYWJsZSIsIl9pbml0Iiwic3RhcnQiLCJhcHBseSIsImdldFdvcmxkQW5jaG9yIiwiX2pvaW50IiwiR2V0QW5jaG9yQSIsIngiLCJ5IiwiVmVjMiIsIlpFUk8iLCJnZXRXb3JsZENvbm5lY3RlZEFuY2hvciIsIkdldEFuY2hvckIiLCJnZXRSZWFjdGlvbkZvcmNlIiwidGltZVN0ZXAiLCJvdXQiLCJHZXRSZWFjdGlvbkZvcmNlIiwiZ2V0UmVhY3Rpb25Ub3JxdWUiLCJHZXRSZWFjdGlvblRvcnF1ZSIsImRpcmVjdG9yIiwiZ2V0UGh5c2ljc01hbmFnZXIiLCJwdXNoRGVsYXlFdmVudCIsIl9faW5pdCIsIl9pbml0ZWQiLCJib2R5IiwiZ2V0Q29tcG9uZW50IiwiX2lzVmFsaWQiLCJkZWYiLCJfY3JlYXRlSm9pbnREZWYiLCJib2R5QSIsIl9nZXRCb2R5IiwiYm9keUIiLCJfYWRkSm9pbnQiLCJfX2Rlc3Ryb3kiLCJfcmVtb3ZlSm9pbnQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsbUJBQUQsQ0FBUCxDQUE2QkQsU0FBN0M7QUFFQTs7Ozs7Ozs7OztBQVFBLElBQUlFLEtBQUssR0FB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LEVBQUFBLFNBQVMsRUFBRSxxQkFBWTtBQUNuQixRQUFJLENBQUMsS0FBS1YsT0FBVixFQUFtQjs7QUFFbkJ6QyxJQUFBQSxFQUFFLENBQUNxQyxRQUFILENBQVlDLGlCQUFaLEdBQWdDYyxZQUFoQyxDQUE2QyxJQUE3Qzs7QUFFQSxTQUFLN0IsTUFBTCxHQUFjLElBQWQ7QUFDQSxTQUFLa0IsT0FBTCxHQUFlLEtBQWY7QUFDSCxHQXhMZ0I7QUEwTGpCSyxFQUFBQSxlQUFlLEVBQUUsMkJBQVk7QUFDekIsV0FBTyxJQUFQO0FBQ0gsR0E1TGdCO0FBOExqQkYsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLFdBQU8sS0FBS0YsSUFBTCxJQUFhLEtBQUtBLElBQUwsQ0FBVU0sUUFBVixFQUFiLElBQ0gsS0FBS25DLGFBREYsSUFDbUIsS0FBS0EsYUFBTCxDQUFtQm1DLFFBQW5CLEVBRDFCO0FBRUg7QUFqTWdCLENBQVQsQ0FBWjtBQW9NQWhELEVBQUUsQ0FBQ0QsS0FBSCxHQUFXc0QsTUFBTSxDQUFDQyxPQUFQLEdBQWlCdkQsS0FBNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBQVE1fUkFUSU8gPSByZXF1aXJlKCcuLi9DQ1BoeXNpY3NUeXBlcycpLlBUTV9SQVRJTztcblxuLyoqXG4gKiAhI2VuXG4gKiBCYXNlIGNsYXNzIGZvciBqb2ludHMgdG8gY29ubmVjdCByaWdpZGJvZHkuXG4gKiAhI3poXG4gKiDlhbPoioLnsbvnmoTln7rnsbtcbiAqIEBjbGFzcyBKb2ludFxuICogQGV4dGVuZHMgQ29tcG9uZW50XG4gKi9cbnZhciBKb2ludCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuSm9pbnQnLFxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcbiAgICBcbiAgICBlZGl0b3I6IHsgXG4gICAgICAgIHJlcXVpcmVDb21wb25lbnQ6IGNjLlJpZ2lkQm9keVxuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgYW5jaG9yIG9mIHRoZSByaWdpZGJvZHkuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5Yia5L2T55qE6ZSa54K544CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7VmVjMn0gYW5jaG9yXG4gICAgICAgICAqIEBkZWZhdWx0IGNjLnYyKDAsIDApXG4gICAgICAgICAqL1xuICAgICAgICBhbmNob3I6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNjLnYyKDAsIDApLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuYW5jaG9yJ1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgYW5jaG9yIG9mIHRoZSBjb25uZWN0ZWQgcmlnaWRib2R5LlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOWFs+iKguWPpuS4gOerr+WImuS9k+eahOmUmueCueOAglxuICAgICAgICAgKiBAcHJvcGVydHkge1ZlYzJ9IGNvbm5lY3RlZEFuY2hvclxuICAgICAgICAgKiBAZGVmYXVsdCBjYy52MigwLCAwKVxuICAgICAgICAgKi9cbiAgICAgICAgY29ubmVjdGVkQW5jaG9yOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBjYy52MigwLCAwKSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLmNvbm5lY3RlZEFuY2hvcicgICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSByaWdpZGJvZHkgdG8gd2hpY2ggdGhlIG90aGVyIGVuZCBvZiB0aGUgam9pbnQgaXMgYXR0YWNoZWQuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5YWz6IqC5Y+m5LiA56uv6ZO+5o6l55qE5Yia5L2TXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7UmlnaWRCb2R5fSBjb25uZWN0ZWRCb2R5XG4gICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICovXG4gICAgICAgIGNvbm5lY3RlZEJvZHk6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5SaWdpZEJvZHksXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5jb25uZWN0ZWRCb2R5J1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFNob3VsZCB0aGUgdHdvIHJpZ2lkIGJvZGllcyBjb25uZWN0ZWQgd2l0aCB0aGlzIGpvaW50IGNvbGxpZGUgd2l0aCBlYWNoIG90aGVyP1xuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOmTvuaOpeWIsOWFs+iKguS4iueahOS4pOS4quWImuS9k+aYr+WQpuW6lOivpeebuOS6kueisOaSnu+8n1xuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGNvbGxpZGVDb25uZWN0ZWRcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGNvbGxpZGVDb25uZWN0ZWQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuY29sbGlkZUNvbm5lY3RlZCdcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfSxcblxuICAgIC8vIG5lZWQgaW5pdCBhZnRlciBib2R5IGFuZCBjb25uZWN0ZWQgYm9keSBpbml0XG4gICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQXBwbHkgY3VycmVudCBjaGFuZ2VzIHRvIGpvaW50LCB0aGlzIHdpbGwgcmVnZW5lcmF0ZSBpbm5lciBib3gyZCBqb2ludC5cbiAgICAgKiAhI3poXG4gICAgICog5bqU55So5b2T5YmN5YWz6IqC5Lit55qE5L+u5pS577yM6LCD55So5q2k5Ye95pWw5Lya6YeN5paw55Sf5oiQ5YaF6YOoIGJveDJkIOeahOWFs+iKguOAglxuICAgICAqIEBtZXRob2QgYXBwbHlcbiAgICAgKi9cbiAgICBhcHBseTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCB0aGUgYW5jaG9yIHBvaW50IG9uIHJpZ2lkYm9keSBpbiB3b3JsZCBjb29yZGluYXRlcy5cbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W5Yia5L2T5LiW55WM5Z2Q5qCH57O75LiL55qE6ZSa54K544CCXG4gICAgICogQG1ldGhvZCBnZXRXb3JsZEFuY2hvclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICovXG4gICAgZ2V0V29ybGRBbmNob3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2pvaW50KSB7XG4gICAgICAgICAgICB2YXIgYW5jaG9yID0gdGhpcy5fam9pbnQuR2V0QW5jaG9yQSgpO1xuICAgICAgICAgICAgcmV0dXJuIGNjLnYyKGFuY2hvci54ICogUFRNX1JBVElPLCBhbmNob3IueSAqIFBUTV9SQVRJTyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNjLlZlYzIuWkVSTztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCB0aGUgYW5jaG9yIHBvaW50IG9uIGNvbm5lY3RlZCByaWdpZGJvZHkgaW4gd29ybGQgY29vcmRpbmF0ZXMuXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPlumTvuaOpeWImuS9k+S4lueVjOWdkOagh+ezu+S4i+eahOmUmueCueOAglxuICAgICAqIEBtZXRob2QgZ2V0V29ybGRDb25uZWN0ZWRBbmNob3JcbiAgICAgKiBAcmV0dXJuIHtWZWMyfVxuICAgICAqL1xuICAgIGdldFdvcmxkQ29ubmVjdGVkQW5jaG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9qb2ludCkge1xuICAgICAgICAgICAgdmFyIGFuY2hvciA9IHRoaXMuX2pvaW50LkdldEFuY2hvckIoKTtcbiAgICAgICAgICAgIHJldHVybiBjYy52MihhbmNob3IueCAqIFBUTV9SQVRJTywgYW5jaG9yLnkgKiBQVE1fUkFUSU8pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYy5WZWMyLlpFUk87XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXRzIHRoZSByZWFjdGlvbiBmb3JjZSBvZiB0aGUgam9pbnQuXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluWFs+iKgueahOWPjeS9nOeUqOWKm+OAglxuICAgICAqIEBtZXRob2QgZ2V0UmVhY3Rpb25Gb3JjZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lU3RlcCAtIFRoZSB0aW1lIHRvIGNhbGN1bGF0ZSB0aGUgcmVhY3Rpb24gZm9yY2UgZm9yLlxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICovXG4gICAgZ2V0UmVhY3Rpb25Gb3JjZTogZnVuY3Rpb24gKHRpbWVTdGVwKSB7XG4gICAgICAgIHZhciBvdXQgPSBjYy52MigpO1xuICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9qb2ludC5HZXRSZWFjdGlvbkZvcmNlKHRpbWVTdGVwLCBvdXQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXRzIHRoZSByZWFjdGlvbiB0b3JxdWUgb2YgdGhlIGpvaW50LlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5blhbPoioLnmoTlj43mia3nn6njgIJcbiAgICAgKiBAbWV0aG9kIGdldFJlYWN0aW9uVG9ycXVlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVTdGVwIC0gVGhlIHRpbWUgdG8gY2FsY3VsYXRlIHRoZSByZWFjdGlvbiB0b3JxdWUgZm9yLlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRSZWFjdGlvblRvcnF1ZTogZnVuY3Rpb24gKHRpbWVTdGVwKSB7XG4gICAgICAgIGlmICh0aGlzLl9qb2ludCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pvaW50LkdldFJlYWN0aW9uVG9ycXVlKHRpbWVTdGVwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9LFxuXG4gICAgX2luaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5wdXNoRGVsYXlFdmVudCh0aGlzLCAnX19pbml0JywgW10pOyAgXG4gICAgfSxcbiAgICBfZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLnB1c2hEZWxheUV2ZW50KHRoaXMsICdfX2Rlc3Ryb3knLCBbXSk7XG4gICAgfSxcblxuICAgIF9faW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5faW5pdGVkKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5ib2R5ID0gdGhpcy5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLl9pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHZhciBkZWYgPSB0aGlzLl9jcmVhdGVKb2ludERlZigpO1xuICAgICAgICAgICAgaWYgKCFkZWYpIHJldHVybjtcblxuICAgICAgICAgICAgZGVmLmJvZHlBID0gdGhpcy5ib2R5Ll9nZXRCb2R5KCk7XG4gICAgICAgICAgICBkZWYuYm9keUIgPSB0aGlzLmNvbm5lY3RlZEJvZHkuX2dldEJvZHkoKTtcbiAgICAgICAgICAgIGRlZi5jb2xsaWRlQ29ubmVjdGVkID0gdGhpcy5jb2xsaWRlQ29ubmVjdGVkO1xuXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLl9hZGRKb2ludCh0aGlzLCBkZWYpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBfX2Rlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0ZWQpIHJldHVybjtcblxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLl9yZW1vdmVKb2ludCh0aGlzKTtcblxuICAgICAgICB0aGlzLl9qb2ludCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBfY3JlYXRlSm9pbnREZWY6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIF9pc1ZhbGlkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvZHkgJiYgdGhpcy5ib2R5Ll9nZXRCb2R5KCkgJiZcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGVkQm9keSAmJiB0aGlzLmNvbm5lY3RlZEJvZHkuX2dldEJvZHkoKTtcbiAgICB9XG59KTtcblxuY2MuSm9pbnQgPSBtb2R1bGUuZXhwb3J0cyA9IEpvaW50O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=