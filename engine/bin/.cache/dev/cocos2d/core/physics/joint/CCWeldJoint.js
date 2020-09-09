
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/joint/CCWeldJoint.js';
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

var ANGLE_TO_PHYSICS_ANGLE = require('../CCPhysicsTypes').ANGLE_TO_PHYSICS_ANGLE;
/**
 * !#en
 * A weld joint essentially glues two bodies together. A weld joint may
 * distort somewhat because the island constraint solver is approximate.
 * !#zh
 * 熔接关节相当于将两个刚体粘在了一起。
 * 熔接关节可能会使某些东西失真，因为约束求解器算出的都是近似值。
 * @class WeldJoint
 * @extends Joint
 */


var WeldJoint = cc.Class({
  name: 'cc.WeldJoint',
  "extends": cc.Joint,
  editor: CC_EDITOR && {
    inspector: 'packages://inspector/inspectors/comps/physics/joint.js',
    menu: 'i18n:MAIN_MENU.component.physics/Joint/Weld'
  },
  properties: {
    /**
     * !#en
     * The reference angle.
     * !#zh
     * 相对角度。
     * @property {Number} referenceAngle
     * @default 0
     */
    referenceAngle: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.referenceAngle'
    },
    _frequency: 0,
    _dampingRatio: 0,

    /**
     * !#en
     * The frequency.
     * !#zh
     * 弹性系数。
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
    }
  },
  _createJointDef: function _createJointDef() {
    var def = new b2.WeldJointDef();
    def.localAnchorA = new b2.Vec2(this.anchor.x / PTM_RATIO, this.anchor.y / PTM_RATIO);
    def.localAnchorB = new b2.Vec2(this.connectedAnchor.x / PTM_RATIO, this.connectedAnchor.y / PTM_RATIO);
    def.referenceAngle = this.referenceAngle * ANGLE_TO_PHYSICS_ANGLE;
    def.frequencyHz = this.frequency;
    def.dampingRatio = this.dampingRatio;
    return def;
  }
});
cc.WeldJoint = module.exports = WeldJoint;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3Mvam9pbnQvQ0NXZWxkSm9pbnQuanMiXSwibmFtZXMiOlsiUFRNX1JBVElPIiwicmVxdWlyZSIsIkFOR0xFX1RPX1BIWVNJQ1NfQU5HTEUiLCJXZWxkSm9pbnQiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkpvaW50IiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwiaW5zcGVjdG9yIiwibWVudSIsInByb3BlcnRpZXMiLCJyZWZlcmVuY2VBbmdsZSIsInRvb2x0aXAiLCJDQ19ERVYiLCJfZnJlcXVlbmN5IiwiX2RhbXBpbmdSYXRpbyIsImZyZXF1ZW5jeSIsImdldCIsInNldCIsInZhbHVlIiwiX2pvaW50IiwiU2V0RnJlcXVlbmN5IiwiZGFtcGluZ1JhdGlvIiwiU2V0RGFtcGluZ1JhdGlvIiwiX2NyZWF0ZUpvaW50RGVmIiwiZGVmIiwiYjIiLCJXZWxkSm9pbnREZWYiLCJsb2NhbEFuY2hvckEiLCJWZWMyIiwiYW5jaG9yIiwieCIsInkiLCJsb2NhbEFuY2hvckIiLCJjb25uZWN0ZWRBbmNob3IiLCJmcmVxdWVuY3lIeiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxtQkFBRCxDQUFQLENBQTZCRCxTQUE3Qzs7QUFDQSxJQUFJRSxzQkFBc0IsR0FBR0QsT0FBTyxDQUFDLG1CQUFELENBQVAsQ0FBNkJDLHNCQUExRDtBQUVBOzs7Ozs7Ozs7Ozs7QUFVQSxJQUFJQyxTQUFTLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3JCQyxFQUFBQSxJQUFJLEVBQUUsY0FEZTtBQUVyQixhQUFTRixFQUFFLENBQUNHLEtBRlM7QUFJckJDLEVBQUFBLE1BQU0sRUFBRUMsU0FBUyxJQUFJO0FBQ2pCQyxJQUFBQSxTQUFTLEVBQUUsd0RBRE07QUFFakJDLElBQUFBLElBQUksRUFBRTtBQUZXLEdBSkE7QUFTckJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSOzs7Ozs7OztBQVFBQyxJQUFBQSxjQUFjLEVBQUU7QUFDWixpQkFBUyxDQURHO0FBRVpDLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJO0FBRlAsS0FUUjtBQWNSQyxJQUFBQSxVQUFVLEVBQUUsQ0FkSjtBQWVSQyxJQUFBQSxhQUFhLEVBQUUsQ0FmUDs7QUFpQlI7Ozs7Ozs7O0FBUUFDLElBQUFBLFNBQVMsRUFBRTtBQUNQSixNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxtREFEWjtBQUVQSSxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS0gsVUFBWjtBQUNILE9BSk07QUFLUEksTUFBQUEsR0FBRyxFQUFFLGFBQVVDLEtBQVYsRUFBaUI7QUFDbEIsYUFBS0wsVUFBTCxHQUFrQkssS0FBbEI7O0FBQ0EsWUFBSSxLQUFLQyxNQUFULEVBQWlCO0FBQ2IsZUFBS0EsTUFBTCxDQUFZQyxZQUFaLENBQXlCRixLQUF6QjtBQUNIO0FBQ0o7QUFWTSxLQXpCSDs7QUFzQ1I7Ozs7Ozs7O0FBUUFHLElBQUFBLFlBQVksRUFBRTtBQUNWVixNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxzREFEVDtBQUVWSSxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS0YsYUFBWjtBQUNILE9BSlM7QUFLVkcsTUFBQUEsR0FBRyxFQUFFLGFBQVVDLEtBQVYsRUFBaUI7QUFDbEIsYUFBS0osYUFBTCxHQUFxQkksS0FBckI7O0FBQ0EsWUFBSSxLQUFLQyxNQUFULEVBQWlCO0FBQ2IsZUFBS0EsTUFBTCxDQUFZRyxlQUFaLENBQTRCSixLQUE1QjtBQUNIO0FBQ0o7QUFWUztBQTlDTixHQVRTO0FBcUVyQkssRUFBQUEsZUFBZSxFQUFFLDJCQUFZO0FBQ3pCLFFBQUlDLEdBQUcsR0FBRyxJQUFJQyxFQUFFLENBQUNDLFlBQVAsRUFBVjtBQUNBRixJQUFBQSxHQUFHLENBQUNHLFlBQUosR0FBbUIsSUFBSUYsRUFBRSxDQUFDRyxJQUFQLENBQVksS0FBS0MsTUFBTCxDQUFZQyxDQUFaLEdBQWNqQyxTQUExQixFQUFxQyxLQUFLZ0MsTUFBTCxDQUFZRSxDQUFaLEdBQWNsQyxTQUFuRCxDQUFuQjtBQUNBMkIsSUFBQUEsR0FBRyxDQUFDUSxZQUFKLEdBQW1CLElBQUlQLEVBQUUsQ0FBQ0csSUFBUCxDQUFZLEtBQUtLLGVBQUwsQ0FBcUJILENBQXJCLEdBQXVCakMsU0FBbkMsRUFBOEMsS0FBS29DLGVBQUwsQ0FBcUJGLENBQXJCLEdBQXVCbEMsU0FBckUsQ0FBbkI7QUFDQTJCLElBQUFBLEdBQUcsQ0FBQ2QsY0FBSixHQUFxQixLQUFLQSxjQUFMLEdBQXNCWCxzQkFBM0M7QUFFQXlCLElBQUFBLEdBQUcsQ0FBQ1UsV0FBSixHQUFrQixLQUFLbkIsU0FBdkI7QUFDQVMsSUFBQUEsR0FBRyxDQUFDSCxZQUFKLEdBQW1CLEtBQUtBLFlBQXhCO0FBRUEsV0FBT0csR0FBUDtBQUNIO0FBL0VvQixDQUFULENBQWhCO0FBa0ZBdkIsRUFBRSxDQUFDRCxTQUFILEdBQWVtQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJwQyxTQUFoQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIFBUTV9SQVRJTyA9IHJlcXVpcmUoJy4uL0NDUGh5c2ljc1R5cGVzJykuUFRNX1JBVElPO1xudmFyIEFOR0xFX1RPX1BIWVNJQ1NfQU5HTEUgPSByZXF1aXJlKCcuLi9DQ1BoeXNpY3NUeXBlcycpLkFOR0xFX1RPX1BIWVNJQ1NfQU5HTEU7XG5cbi8qKlxuICogISNlblxuICogQSB3ZWxkIGpvaW50IGVzc2VudGlhbGx5IGdsdWVzIHR3byBib2RpZXMgdG9nZXRoZXIuIEEgd2VsZCBqb2ludCBtYXlcbiAqIGRpc3RvcnQgc29tZXdoYXQgYmVjYXVzZSB0aGUgaXNsYW5kIGNvbnN0cmFpbnQgc29sdmVyIGlzIGFwcHJveGltYXRlLlxuICogISN6aFxuICog54aU5o6l5YWz6IqC55u45b2T5LqO5bCG5Lik5Liq5Yia5L2T57KY5Zyo5LqG5LiA6LW344CCXG4gKiDnhpTmjqXlhbPoioLlj6/og73kvJrkvb/mn5DkupvkuJzopb/lpLHnnJ/vvIzlm6DkuLrnuqbmnZ/msYLop6Plmajnrpflh7rnmoTpg73mmK/ov5HkvLzlgLzjgIJcbiAqIEBjbGFzcyBXZWxkSm9pbnRcbiAqIEBleHRlbmRzIEpvaW50XG4gKi9cbnZhciBXZWxkSm9pbnQgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLldlbGRKb2ludCcsXG4gICAgZXh0ZW5kczogY2MuSm9pbnQsXG4gICAgXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3BoeXNpY3Mvam9pbnQuanMnLFxuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnBoeXNpY3MvSm9pbnQvV2VsZCcsXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIHJlZmVyZW5jZSBhbmdsZS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDnm7jlr7nop5LluqbjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJlZmVyZW5jZUFuZ2xlXG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIHJlZmVyZW5jZUFuZ2xlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIucmVmZXJlbmNlQW5nbGUnICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2ZyZXF1ZW5jeTogMCxcbiAgICAgICAgX2RhbXBpbmdSYXRpbzogMCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgZnJlcXVlbmN5LlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOW8ueaAp+ezu+aVsOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZnJlcXVlbmN5XG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIGZyZXF1ZW5jeToge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuZnJlcXVlbmN5JyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9mcmVxdWVuY3k7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mcmVxdWVuY3kgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fam9pbnQuU2V0RnJlcXVlbmN5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIGRhbXBpbmcgcmF0aW8uXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6Zi75bC877yM6KGo56S65YWz6IqC5Y+Y5b2i5ZCO77yM5oGi5aSN5Yiw5Yid5aeL54q25oCB5Y+X5Yiw55qE6Zi75Yqb44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkYW1waW5nUmF0aW9cbiAgICAgICAgICogQHByb3BlcnR5IDBcbiAgICAgICAgICovXG4gICAgICAgIGRhbXBpbmdSYXRpbzoge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuZGFtcGluZ1JhdGlvJywgICAgICAgICAgICBcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYW1waW5nUmF0aW87XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYW1waW5nUmF0aW8gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fam9pbnQuU2V0RGFtcGluZ1JhdGlvKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2NyZWF0ZUpvaW50RGVmOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZWYgPSBuZXcgYjIuV2VsZEpvaW50RGVmKCk7XG4gICAgICAgIGRlZi5sb2NhbEFuY2hvckEgPSBuZXcgYjIuVmVjMih0aGlzLmFuY2hvci54L1BUTV9SQVRJTywgdGhpcy5hbmNob3IueS9QVE1fUkFUSU8pO1xuICAgICAgICBkZWYubG9jYWxBbmNob3JCID0gbmV3IGIyLlZlYzIodGhpcy5jb25uZWN0ZWRBbmNob3IueC9QVE1fUkFUSU8sIHRoaXMuY29ubmVjdGVkQW5jaG9yLnkvUFRNX1JBVElPKTtcbiAgICAgICAgZGVmLnJlZmVyZW5jZUFuZ2xlID0gdGhpcy5yZWZlcmVuY2VBbmdsZSAqIEFOR0xFX1RPX1BIWVNJQ1NfQU5HTEU7XG5cbiAgICAgICAgZGVmLmZyZXF1ZW5jeUh6ID0gdGhpcy5mcmVxdWVuY3k7XG4gICAgICAgIGRlZi5kYW1waW5nUmF0aW8gPSB0aGlzLmRhbXBpbmdSYXRpbztcblxuICAgICAgICByZXR1cm4gZGVmO1xuICAgIH1cbn0pO1xuXG5jYy5XZWxkSm9pbnQgPSBtb2R1bGUuZXhwb3J0cyA9IFdlbGRKb2ludDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9