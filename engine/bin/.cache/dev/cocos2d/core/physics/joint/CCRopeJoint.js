
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/joint/CCRopeJoint.js';
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
 * A rope joint enforces a maximum distance between two points
 * on two bodies. It has no other effect.
 * Warning: if you attempt to change the maximum length during
 * the simulation you will get some non-physical behavior.
 * !#zh
 * 绳子关节只指定两个刚体间的最大距离，没有其他的效果。
 * 注意：如果你试图动态修改关节的长度，这有可能会得到一些意外的效果。
 * @class RopeJoint
 * @extends Joint
 */


var RopeJoint = cc.Class({
  name: 'cc.RopeJoint',
  "extends": cc.Joint,
  editor: CC_EDITOR && {
    inspector: 'packages://inspector/inspectors/comps/physics/joint.js',
    menu: 'i18n:MAIN_MENU.component.physics/Joint/Rope'
  },
  properties: {
    _maxLength: 1,

    /**
     * !#en
     * The max length.
     * !#zh
     * 最大长度。
     * @property {Number} maxLength
     * @default 1
     */
    maxLength: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.maxLength',
      get: function get() {
        return this._maxLength;
      },
      set: function set(value) {
        this._maxLength = value;

        if (this._joint) {
          this._joint.SetMaxLength(value);
        }
      }
    }
  },
  _createJointDef: function _createJointDef() {
    var def = new b2.RopeJointDef();
    def.localAnchorA = new b2.Vec2(this.anchor.x / PTM_RATIO, this.anchor.y / PTM_RATIO);
    def.localAnchorB = new b2.Vec2(this.connectedAnchor.x / PTM_RATIO, this.connectedAnchor.y / PTM_RATIO);
    def.maxLength = this.maxLength / PTM_RATIO;
    return def;
  }
});
cc.RopeJoint = module.exports = RopeJoint;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3Mvam9pbnQvQ0NSb3BlSm9pbnQuanMiXSwibmFtZXMiOlsiUFRNX1JBVElPIiwicmVxdWlyZSIsIlJvcGVKb2ludCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiSm9pbnQiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJpbnNwZWN0b3IiLCJtZW51IiwicHJvcGVydGllcyIsIl9tYXhMZW5ndGgiLCJtYXhMZW5ndGgiLCJ0b29sdGlwIiwiQ0NfREVWIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJfam9pbnQiLCJTZXRNYXhMZW5ndGgiLCJfY3JlYXRlSm9pbnREZWYiLCJkZWYiLCJiMiIsIlJvcGVKb2ludERlZiIsImxvY2FsQW5jaG9yQSIsIlZlYzIiLCJhbmNob3IiLCJ4IiwieSIsImxvY2FsQW5jaG9yQiIsImNvbm5lY3RlZEFuY2hvciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxtQkFBRCxDQUFQLENBQTZCRCxTQUE3QztBQUVBOzs7Ozs7Ozs7Ozs7OztBQVlBLElBQUlFLFNBQVMsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDckJDLEVBQUFBLElBQUksRUFBRSxjQURlO0FBRXJCLGFBQVNGLEVBQUUsQ0FBQ0csS0FGUztBQUlyQkMsRUFBQUEsTUFBTSxFQUFFQyxTQUFTLElBQUk7QUFDakJDLElBQUFBLFNBQVMsRUFBRSx3REFETTtBQUVqQkMsSUFBQUEsSUFBSSxFQUFFO0FBRlcsR0FKQTtBQVNyQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBRSxDQURKOztBQUdSOzs7Ozs7OztBQVFBQyxJQUFBQSxTQUFTLEVBQUU7QUFDUEMsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUksbURBRFo7QUFFUEMsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixlQUFPLEtBQUtKLFVBQVo7QUFDSCxPQUpNO0FBS1BLLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLGFBQUtOLFVBQUwsR0FBa0JNLEtBQWxCOztBQUNBLFlBQUksS0FBS0MsTUFBVCxFQUFpQjtBQUNiLGVBQUtBLE1BQUwsQ0FBWUMsWUFBWixDQUF5QkYsS0FBekI7QUFDSDtBQUNKO0FBVk07QUFYSCxHQVRTO0FBbUNyQkcsRUFBQUEsZUFBZSxFQUFFLDJCQUFZO0FBQ3pCLFFBQUlDLEdBQUcsR0FBRyxJQUFJQyxFQUFFLENBQUNDLFlBQVAsRUFBVjtBQUNBRixJQUFBQSxHQUFHLENBQUNHLFlBQUosR0FBbUIsSUFBSUYsRUFBRSxDQUFDRyxJQUFQLENBQVksS0FBS0MsTUFBTCxDQUFZQyxDQUFaLEdBQWM1QixTQUExQixFQUFxQyxLQUFLMkIsTUFBTCxDQUFZRSxDQUFaLEdBQWM3QixTQUFuRCxDQUFuQjtBQUNBc0IsSUFBQUEsR0FBRyxDQUFDUSxZQUFKLEdBQW1CLElBQUlQLEVBQUUsQ0FBQ0csSUFBUCxDQUFZLEtBQUtLLGVBQUwsQ0FBcUJILENBQXJCLEdBQXVCNUIsU0FBbkMsRUFBOEMsS0FBSytCLGVBQUwsQ0FBcUJGLENBQXJCLEdBQXVCN0IsU0FBckUsQ0FBbkI7QUFDQXNCLElBQUFBLEdBQUcsQ0FBQ1QsU0FBSixHQUFnQixLQUFLQSxTQUFMLEdBQWViLFNBQS9CO0FBRUEsV0FBT3NCLEdBQVA7QUFDSDtBQTFDb0IsQ0FBVCxDQUFoQjtBQTZDQW5CLEVBQUUsQ0FBQ0QsU0FBSCxHQUFlOEIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCL0IsU0FBaEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBQVE1fUkFUSU8gPSByZXF1aXJlKCcuLi9DQ1BoeXNpY3NUeXBlcycpLlBUTV9SQVRJTztcblxuLyoqXG4gKiAhI2VuXG4gKiBBIHJvcGUgam9pbnQgZW5mb3JjZXMgYSBtYXhpbXVtIGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50c1xuICogb24gdHdvIGJvZGllcy4gSXQgaGFzIG5vIG90aGVyIGVmZmVjdC5cbiAqIFdhcm5pbmc6IGlmIHlvdSBhdHRlbXB0IHRvIGNoYW5nZSB0aGUgbWF4aW11bSBsZW5ndGggZHVyaW5nXG4gKiB0aGUgc2ltdWxhdGlvbiB5b3Ugd2lsbCBnZXQgc29tZSBub24tcGh5c2ljYWwgYmVoYXZpb3IuXG4gKiAhI3poXG4gKiDnu7PlrZDlhbPoioLlj6rmjIflrprkuKTkuKrliJrkvZPpl7TnmoTmnIDlpKfot53nprvvvIzmsqHmnInlhbbku5bnmoTmlYjmnpzjgIJcbiAqIOazqOaEj++8muWmguaenOS9oOivleWbvuWKqOaAgeS/ruaUueWFs+iKgueahOmVv+W6pu+8jOi/meacieWPr+iDveS8muW+l+WIsOS4gOS6m+aEj+WklueahOaViOaenOOAglxuICogQGNsYXNzIFJvcGVKb2ludFxuICogQGV4dGVuZHMgSm9pbnRcbiAqL1xudmFyIFJvcGVKb2ludCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuUm9wZUpvaW50JyxcbiAgICBleHRlbmRzOiBjYy5Kb2ludCxcbiAgICBcbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvcGh5c2ljcy9qb2ludC5qcycsXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucGh5c2ljcy9Kb2ludC9Sb3BlJyxcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfbWF4TGVuZ3RoOiAxLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBtYXggbGVuZ3RoLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOacgOWkp+mVv+W6puOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbWF4TGVuZ3RoXG4gICAgICAgICAqIEBkZWZhdWx0IDFcbiAgICAgICAgICovXG4gICAgICAgIG1heExlbmd0aDoge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIubWF4TGVuZ3RoJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXhMZW5ndGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXhMZW5ndGggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fam9pbnQuU2V0TWF4TGVuZ3RoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICB9LFxuXG4gICAgX2NyZWF0ZUpvaW50RGVmOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZWYgPSBuZXcgYjIuUm9wZUpvaW50RGVmKCk7XG4gICAgICAgIGRlZi5sb2NhbEFuY2hvckEgPSBuZXcgYjIuVmVjMih0aGlzLmFuY2hvci54L1BUTV9SQVRJTywgdGhpcy5hbmNob3IueS9QVE1fUkFUSU8pO1xuICAgICAgICBkZWYubG9jYWxBbmNob3JCID0gbmV3IGIyLlZlYzIodGhpcy5jb25uZWN0ZWRBbmNob3IueC9QVE1fUkFUSU8sIHRoaXMuY29ubmVjdGVkQW5jaG9yLnkvUFRNX1JBVElPKTtcbiAgICAgICAgZGVmLm1heExlbmd0aCA9IHRoaXMubWF4TGVuZ3RoL1BUTV9SQVRJTztcblxuICAgICAgICByZXR1cm4gZGVmO1xuICAgIH1cbn0pO1xuXG5jYy5Sb3BlSm9pbnQgPSBtb2R1bGUuZXhwb3J0cyA9IFJvcGVKb2ludDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9