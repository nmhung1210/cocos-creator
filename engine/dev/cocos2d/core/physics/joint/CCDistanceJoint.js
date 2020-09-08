
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/joint/CCDistanceJoint.js';
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
 * A distance joint constrains two points on two bodies
 * to remain at a fixed distance from each other. You can view
 * this as a massless, rigid rod.
 * !#zh
 * 距离关节通过一个固定的长度来约束关节链接的两个刚体。你可以将它想象成一个无质量，坚固的木棍。
 * @class DistanceJoint
 * @extends Joint
 */


var DistanceJoint = cc.Class({
  name: 'cc.DistanceJoint',
  "extends": cc.Joint,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.physics/Joint/Distance',
    inspector: 'packages://inspector/inspectors/comps/physics/joint.js'
  },
  properties: {
    _distance: 1,
    _frequency: 0,
    _dampingRatio: 0,

    /**
     * !#en
     * The distance separating the two ends of the joint.
     * !#zh
     * 关节两端的距离
     * @property {Number} distance
     * @default 1
     */
    distance: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.distance',
      get: function get() {
        return this._distance;
      },
      set: function set(value) {
        this._distance = value;

        if (this._joint) {
          this._joint.SetLength(value);
        }
      }
    },

    /**
     * !#en
     * The spring frequency.
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
    var def = new b2.DistanceJointDef();
    def.localAnchorA = new b2.Vec2(this.anchor.x / PTM_RATIO, this.anchor.y / PTM_RATIO);
    def.localAnchorB = new b2.Vec2(this.connectedAnchor.x / PTM_RATIO, this.connectedAnchor.y / PTM_RATIO);
    def.length = this.distance / PTM_RATIO;
    def.dampingRatio = this.dampingRatio;
    def.frequencyHz = this.frequency;
    return def;
  }
});
cc.DistanceJoint = module.exports = DistanceJoint;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3Mvam9pbnQvQ0NEaXN0YW5jZUpvaW50LmpzIl0sIm5hbWVzIjpbIlBUTV9SQVRJTyIsInJlcXVpcmUiLCJEaXN0YW5jZUpvaW50IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJKb2ludCIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJpbnNwZWN0b3IiLCJwcm9wZXJ0aWVzIiwiX2Rpc3RhbmNlIiwiX2ZyZXF1ZW5jeSIsIl9kYW1waW5nUmF0aW8iLCJkaXN0YW5jZSIsInRvb2x0aXAiLCJDQ19ERVYiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsIl9qb2ludCIsIlNldExlbmd0aCIsImZyZXF1ZW5jeSIsIlNldEZyZXF1ZW5jeSIsImRhbXBpbmdSYXRpbyIsIlNldERhbXBpbmdSYXRpbyIsIl9jcmVhdGVKb2ludERlZiIsImRlZiIsImIyIiwiRGlzdGFuY2VKb2ludERlZiIsImxvY2FsQW5jaG9yQSIsIlZlYzIiLCJhbmNob3IiLCJ4IiwieSIsImxvY2FsQW5jaG9yQiIsImNvbm5lY3RlZEFuY2hvciIsImxlbmd0aCIsImZyZXF1ZW5jeUh6IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLG1CQUFELENBQVAsQ0FBNkJELFNBQTdDO0FBRUE7Ozs7Ozs7Ozs7OztBQVVBLElBQUlFLGFBQWEsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDekJDLEVBQUFBLElBQUksRUFBRSxrQkFEbUI7QUFFekIsYUFBU0YsRUFBRSxDQUFDRyxLQUZhO0FBSXpCQyxFQUFBQSxNQUFNLEVBQUVDLFNBQVMsSUFBSTtBQUNqQkMsSUFBQUEsSUFBSSxFQUFFLGlEQURXO0FBRWpCQyxJQUFBQSxTQUFTLEVBQUU7QUFGTSxHQUpJO0FBU3pCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFLENBREg7QUFFUkMsSUFBQUEsVUFBVSxFQUFFLENBRko7QUFHUkMsSUFBQUEsYUFBYSxFQUFFLENBSFA7O0FBS1I7Ozs7Ozs7O0FBUUFDLElBQUFBLFFBQVEsRUFBRTtBQUNOQyxNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxrREFEYjtBQUVOQyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS04sU0FBWjtBQUNILE9BSks7QUFLTk8sTUFBQUEsR0FBRyxFQUFFLGFBQVVDLEtBQVYsRUFBaUI7QUFDbEIsYUFBS1IsU0FBTCxHQUFpQlEsS0FBakI7O0FBQ0EsWUFBSSxLQUFLQyxNQUFULEVBQWlCO0FBQ2IsZUFBS0EsTUFBTCxDQUFZQyxTQUFaLENBQXNCRixLQUF0QjtBQUNIO0FBQ0o7QUFWSyxLQWJGOztBQTBCUjs7Ozs7Ozs7QUFRQUcsSUFBQUEsU0FBUyxFQUFFO0FBQ1BQLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLG1EQURaO0FBRVBDLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLTCxVQUFaO0FBQ0gsT0FKTTtBQUtQTSxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixhQUFLUCxVQUFMLEdBQWtCTyxLQUFsQjs7QUFDQSxZQUFJLEtBQUtDLE1BQVQsRUFBaUI7QUFDYixlQUFLQSxNQUFMLENBQVlHLFlBQVosQ0FBeUJKLEtBQXpCO0FBQ0g7QUFDSjtBQVZNLEtBbENIOztBQStDUjs7Ozs7OztBQU9BSyxJQUFBQSxZQUFZLEVBQUU7QUFDVlQsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUksc0RBRFQ7QUFFVkMsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixlQUFPLEtBQUtKLGFBQVo7QUFDSCxPQUpTO0FBS1ZLLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLGFBQUtOLGFBQUwsR0FBcUJNLEtBQXJCOztBQUNBLFlBQUksS0FBS0MsTUFBVCxFQUFpQjtBQUNiLGVBQUtBLE1BQUwsQ0FBWUssZUFBWixDQUE0Qk4sS0FBNUI7QUFDSDtBQUNKO0FBVlM7QUF0RE4sR0FUYTtBQTZFekJPLEVBQUFBLGVBQWUsRUFBRSwyQkFBWTtBQUN6QixRQUFJQyxHQUFHLEdBQUcsSUFBSUMsRUFBRSxDQUFDQyxnQkFBUCxFQUFWO0FBQ0FGLElBQUFBLEdBQUcsQ0FBQ0csWUFBSixHQUFtQixJQUFJRixFQUFFLENBQUNHLElBQVAsQ0FBWSxLQUFLQyxNQUFMLENBQVlDLENBQVosR0FBY2xDLFNBQTFCLEVBQXFDLEtBQUtpQyxNQUFMLENBQVlFLENBQVosR0FBY25DLFNBQW5ELENBQW5CO0FBQ0E0QixJQUFBQSxHQUFHLENBQUNRLFlBQUosR0FBbUIsSUFBSVAsRUFBRSxDQUFDRyxJQUFQLENBQVksS0FBS0ssZUFBTCxDQUFxQkgsQ0FBckIsR0FBdUJsQyxTQUFuQyxFQUE4QyxLQUFLcUMsZUFBTCxDQUFxQkYsQ0FBckIsR0FBdUJuQyxTQUFyRSxDQUFuQjtBQUNBNEIsSUFBQUEsR0FBRyxDQUFDVSxNQUFKLEdBQWEsS0FBS3ZCLFFBQUwsR0FBY2YsU0FBM0I7QUFDQTRCLElBQUFBLEdBQUcsQ0FBQ0gsWUFBSixHQUFtQixLQUFLQSxZQUF4QjtBQUNBRyxJQUFBQSxHQUFHLENBQUNXLFdBQUosR0FBa0IsS0FBS2hCLFNBQXZCO0FBRUEsV0FBT0ssR0FBUDtBQUNIO0FBdEZ3QixDQUFULENBQXBCO0FBeUZBekIsRUFBRSxDQUFDRCxhQUFILEdBQW1Cc0MsTUFBTSxDQUFDQyxPQUFQLEdBQWlCdkMsYUFBcEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBQVE1fUkFUSU8gPSByZXF1aXJlKCcuLi9DQ1BoeXNpY3NUeXBlcycpLlBUTV9SQVRJTztcblxuLyoqXG4gKiAhI2VuXG4gKiBBIGRpc3RhbmNlIGpvaW50IGNvbnN0cmFpbnMgdHdvIHBvaW50cyBvbiB0d28gYm9kaWVzXG4gKiB0byByZW1haW4gYXQgYSBmaXhlZCBkaXN0YW5jZSBmcm9tIGVhY2ggb3RoZXIuIFlvdSBjYW4gdmlld1xuICogdGhpcyBhcyBhIG1hc3NsZXNzLCByaWdpZCByb2QuXG4gKiAhI3poXG4gKiDot53nprvlhbPoioLpgJrov4fkuIDkuKrlm7rlrprnmoTplb/luqbmnaXnuqbmnZ/lhbPoioLpk77mjqXnmoTkuKTkuKrliJrkvZPjgILkvaDlj6/ku6XlsIblroPmg7PosaHmiJDkuIDkuKrml6DotKjph4/vvIzlnZrlm7rnmoTmnKjmo43jgIJcbiAqIEBjbGFzcyBEaXN0YW5jZUpvaW50XG4gKiBAZXh0ZW5kcyBKb2ludFxuICovXG52YXIgRGlzdGFuY2VKb2ludCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuRGlzdGFuY2VKb2ludCcsXG4gICAgZXh0ZW5kczogY2MuSm9pbnQsXG4gICAgXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnBoeXNpY3MvSm9pbnQvRGlzdGFuY2UnLFxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3BoeXNpY3Mvam9pbnQuanMnLFxuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIF9kaXN0YW5jZTogMSxcbiAgICAgICAgX2ZyZXF1ZW5jeTogMCxcbiAgICAgICAgX2RhbXBpbmdSYXRpbzogMCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgZGlzdGFuY2Ugc2VwYXJhdGluZyB0aGUgdHdvIGVuZHMgb2YgdGhlIGpvaW50LlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOWFs+iKguS4pOerr+eahOi3neemu1xuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZGlzdGFuY2VcbiAgICAgICAgICogQGRlZmF1bHQgMVxuICAgICAgICAgKi9cbiAgICAgICAgZGlzdGFuY2U6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLmRpc3RhbmNlJywgICAgICAgICAgICBcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kaXN0YW5jZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3RhbmNlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2pvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LlNldExlbmd0aCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBzcHJpbmcgZnJlcXVlbmN5LlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOW8ueaAp+ezu+aVsOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZnJlcXVlbmN5XG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIGZyZXF1ZW5jeToge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuZnJlcXVlbmN5JyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9mcmVxdWVuY3k7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mcmVxdWVuY3kgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fam9pbnQuU2V0RnJlcXVlbmN5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIGRhbXBpbmcgcmF0aW8uXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6Zi75bC877yM6KGo56S65YWz6IqC5Y+Y5b2i5ZCO77yM5oGi5aSN5Yiw5Yid5aeL54q25oCB5Y+X5Yiw55qE6Zi75Yqb44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkYW1waW5nUmF0aW9cbiAgICAgICAgICovXG4gICAgICAgIGRhbXBpbmdSYXRpbzoge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuZGFtcGluZ1JhdGlvJywgICAgICAgICAgICBcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYW1waW5nUmF0aW87XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYW1waW5nUmF0aW8gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fam9pbnQuU2V0RGFtcGluZ1JhdGlvKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2NyZWF0ZUpvaW50RGVmOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZWYgPSBuZXcgYjIuRGlzdGFuY2VKb2ludERlZigpO1xuICAgICAgICBkZWYubG9jYWxBbmNob3JBID0gbmV3IGIyLlZlYzIodGhpcy5hbmNob3IueC9QVE1fUkFUSU8sIHRoaXMuYW5jaG9yLnkvUFRNX1JBVElPKTtcbiAgICAgICAgZGVmLmxvY2FsQW5jaG9yQiA9IG5ldyBiMi5WZWMyKHRoaXMuY29ubmVjdGVkQW5jaG9yLngvUFRNX1JBVElPLCB0aGlzLmNvbm5lY3RlZEFuY2hvci55L1BUTV9SQVRJTyk7XG4gICAgICAgIGRlZi5sZW5ndGggPSB0aGlzLmRpc3RhbmNlL1BUTV9SQVRJTztcbiAgICAgICAgZGVmLmRhbXBpbmdSYXRpbyA9IHRoaXMuZGFtcGluZ1JhdGlvO1xuICAgICAgICBkZWYuZnJlcXVlbmN5SHogPSB0aGlzLmZyZXF1ZW5jeTtcblxuICAgICAgICByZXR1cm4gZGVmO1xuICAgIH1cbn0pO1xuXG5jYy5EaXN0YW5jZUpvaW50ID0gbW9kdWxlLmV4cG9ydHMgPSBEaXN0YW5jZUpvaW50O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=