
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/collider/CCPhysicsChainCollider.js';
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
 * @class PhysicsChainCollider
 * @extends PolygonCollider
 */


var PhysicsChainCollider = cc.Class({
  name: 'cc.PhysicsChainCollider',
  "extends": cc.PhysicsCollider,
  editor: {
    menu: CC_EDITOR && 'i18n:MAIN_MENU.component.physics/Collider/Chain',
    inspector: CC_EDITOR && 'packages://inspector/inspectors/comps/physics/points-base-collider.js',
    requireComponent: cc.RigidBody
  },
  properties: {
    /**
     * !#en Whether the chain is loop
     * !#zh 链条是否首尾相连
     * @property loop
     * @type {Boolean}
     */
    loop: false,

    /**
     * !#en Chain points
     * !#zh 链条顶点数组
     * @property points
     * @type {Vec2[]}
     */
    points: {
      "default": function _default() {
        return [cc.v2(-50, 0), cc.v2(50, 0)];
      },
      type: [cc.Vec2]
    },
    threshold: {
      "default": 1,
      serializable: false,
      visible: false
    }
  },
  _createShape: function _createShape(scale) {
    var shape = new b2.ChainShape();
    var points = this.points;
    var vertices = [];

    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      vertices.push(new b2.Vec2(p.x / PTM_RATIO * scale.x, p.y / PTM_RATIO * scale.y));
    }

    if (this.loop) {
      shape.CreateLoop(vertices, vertices.length);
    } else {
      shape.CreateChain(vertices, vertices.length);
    }

    return shape;
  },
  resetInEditor: CC_EDITOR && function (didResetToDefault) {
    if (didResetToDefault) {
      this.resetPointsByContour();
    }
  },
  resetPointsByContour: CC_EDITOR && function () {
    var PhysicsUtils = Editor.require('scene://utils/physics');

    PhysicsUtils.resetPoints(this, {
      threshold: this.threshold,
      loop: this.loop
    });
  }
});
cc.PhysicsChainCollider = module.exports = PhysicsChainCollider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3MvY29sbGlkZXIvQ0NQaHlzaWNzQ2hhaW5Db2xsaWRlci5qcyJdLCJuYW1lcyI6WyJQVE1fUkFUSU8iLCJyZXF1aXJlIiwiUGh5c2ljc0NoYWluQ29sbGlkZXIiLCJjYyIsIkNsYXNzIiwibmFtZSIsIlBoeXNpY3NDb2xsaWRlciIsImVkaXRvciIsIm1lbnUiLCJDQ19FRElUT1IiLCJpbnNwZWN0b3IiLCJyZXF1aXJlQ29tcG9uZW50IiwiUmlnaWRCb2R5IiwicHJvcGVydGllcyIsImxvb3AiLCJwb2ludHMiLCJ2MiIsInR5cGUiLCJWZWMyIiwidGhyZXNob2xkIiwic2VyaWFsaXphYmxlIiwidmlzaWJsZSIsIl9jcmVhdGVTaGFwZSIsInNjYWxlIiwic2hhcGUiLCJiMiIsIkNoYWluU2hhcGUiLCJ2ZXJ0aWNlcyIsImkiLCJsZW5ndGgiLCJwIiwicHVzaCIsIngiLCJ5IiwiQ3JlYXRlTG9vcCIsIkNyZWF0ZUNoYWluIiwicmVzZXRJbkVkaXRvciIsImRpZFJlc2V0VG9EZWZhdWx0IiwicmVzZXRQb2ludHNCeUNvbnRvdXIiLCJQaHlzaWNzVXRpbHMiLCJFZGl0b3IiLCJyZXNldFBvaW50cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxtQkFBRCxDQUFQLENBQTZCRCxTQUE3QztBQUVBOzs7Ozs7QUFJQSxJQUFJRSxvQkFBb0IsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDaENDLEVBQUFBLElBQUksRUFBRSx5QkFEMEI7QUFFaEMsYUFBU0YsRUFBRSxDQUFDRyxlQUZvQjtBQUloQ0MsRUFBQUEsTUFBTSxFQUFFO0FBQ0pDLElBQUFBLElBQUksRUFBRUMsU0FBUyxJQUFJLGlEQURmO0FBRUpDLElBQUFBLFNBQVMsRUFBRUQsU0FBUyxJQUFJLHVFQUZwQjtBQUdKRSxJQUFBQSxnQkFBZ0IsRUFBRVIsRUFBRSxDQUFDUztBQUhqQixHQUp3QjtBQVVoQ0MsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7Ozs7OztBQU1BQyxJQUFBQSxJQUFJLEVBQUUsS0FQRTs7QUFTUjs7Ozs7O0FBTUFDLElBQUFBLE1BQU0sRUFBRTtBQUNKLGlCQUFTLG9CQUFZO0FBQ2hCLGVBQU8sQ0FBQ1osRUFBRSxDQUFDYSxFQUFILENBQU0sQ0FBQyxFQUFQLEVBQVcsQ0FBWCxDQUFELEVBQWdCYixFQUFFLENBQUNhLEVBQUgsQ0FBTSxFQUFOLEVBQVUsQ0FBVixDQUFoQixDQUFQO0FBQ0osT0FIRztBQUlKQyxNQUFBQSxJQUFJLEVBQUUsQ0FBQ2QsRUFBRSxDQUFDZSxJQUFKO0FBSkYsS0FmQTtBQXNCUkMsSUFBQUEsU0FBUyxFQUFFO0FBQ1AsaUJBQVMsQ0FERjtBQUVQQyxNQUFBQSxZQUFZLEVBQUUsS0FGUDtBQUdQQyxNQUFBQSxPQUFPLEVBQUU7QUFIRjtBQXRCSCxHQVZvQjtBQXVDaENDLEVBQUFBLFlBQVksRUFBRSxzQkFBVUMsS0FBVixFQUFpQjtBQUMzQixRQUFJQyxLQUFLLEdBQUcsSUFBSUMsRUFBRSxDQUFDQyxVQUFQLEVBQVo7QUFFQSxRQUFJWCxNQUFNLEdBQUcsS0FBS0EsTUFBbEI7QUFDQSxRQUFJWSxRQUFRLEdBQUcsRUFBZjs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdiLE1BQU0sQ0FBQ2MsTUFBM0IsRUFBbUNELENBQUMsRUFBcEMsRUFBd0M7QUFDcEMsVUFBSUUsQ0FBQyxHQUFHZixNQUFNLENBQUNhLENBQUQsQ0FBZDtBQUNBRCxNQUFBQSxRQUFRLENBQUNJLElBQVQsQ0FBZSxJQUFJTixFQUFFLENBQUNQLElBQVAsQ0FBWVksQ0FBQyxDQUFDRSxDQUFGLEdBQUloQyxTQUFKLEdBQWN1QixLQUFLLENBQUNTLENBQWhDLEVBQW1DRixDQUFDLENBQUNHLENBQUYsR0FBSWpDLFNBQUosR0FBY3VCLEtBQUssQ0FBQ1UsQ0FBdkQsQ0FBZjtBQUNIOztBQUVELFFBQUksS0FBS25CLElBQVQsRUFBZTtBQUNYVSxNQUFBQSxLQUFLLENBQUNVLFVBQU4sQ0FBaUJQLFFBQWpCLEVBQTJCQSxRQUFRLENBQUNFLE1BQXBDO0FBQ0gsS0FGRCxNQUdLO0FBQ0RMLE1BQUFBLEtBQUssQ0FBQ1csV0FBTixDQUFrQlIsUUFBbEIsRUFBNEJBLFFBQVEsQ0FBQ0UsTUFBckM7QUFDSDs7QUFDRCxXQUFPTCxLQUFQO0FBQ0gsR0F4RCtCO0FBMERoQ1ksRUFBQUEsYUFBYSxFQUFFM0IsU0FBUyxJQUFJLFVBQVU0QixpQkFBVixFQUE2QjtBQUNyRCxRQUFJQSxpQkFBSixFQUF1QjtBQUNuQixXQUFLQyxvQkFBTDtBQUNIO0FBQ0osR0E5RCtCO0FBZ0VoQ0EsRUFBQUEsb0JBQW9CLEVBQUU3QixTQUFTLElBQUksWUFBWTtBQUMzQyxRQUFJOEIsWUFBWSxHQUFHQyxNQUFNLENBQUN2QyxPQUFQLENBQWUsdUJBQWYsQ0FBbkI7O0FBQ0FzQyxJQUFBQSxZQUFZLENBQUNFLFdBQWIsQ0FBeUIsSUFBekIsRUFBK0I7QUFBQ3RCLE1BQUFBLFNBQVMsRUFBRSxLQUFLQSxTQUFqQjtBQUE0QkwsTUFBQUEsSUFBSSxFQUFFLEtBQUtBO0FBQXZDLEtBQS9CO0FBQ0g7QUFuRStCLENBQVQsQ0FBM0I7QUFzRUFYLEVBQUUsQ0FBQ0Qsb0JBQUgsR0FBMEJ3QyxNQUFNLENBQUNDLE9BQVAsR0FBaUJ6QyxvQkFBM0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBQVE1fUkFUSU8gPSByZXF1aXJlKCcuLi9DQ1BoeXNpY3NUeXBlcycpLlBUTV9SQVRJTztcblxuLyoqXG4gKiBAY2xhc3MgUGh5c2ljc0NoYWluQ29sbGlkZXJcbiAqIEBleHRlbmRzIFBvbHlnb25Db2xsaWRlclxuICovXG52YXIgUGh5c2ljc0NoYWluQ29sbGlkZXIgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlBoeXNpY3NDaGFpbkNvbGxpZGVyJyxcbiAgICBleHRlbmRzOiBjYy5QaHlzaWNzQ29sbGlkZXIsXG5cbiAgICBlZGl0b3I6IHtcbiAgICAgICAgbWVudTogQ0NfRURJVE9SICYmICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucGh5c2ljcy9Db2xsaWRlci9DaGFpbicsXG4gICAgICAgIGluc3BlY3RvcjogQ0NfRURJVE9SICYmICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3BoeXNpY3MvcG9pbnRzLWJhc2UtY29sbGlkZXIuanMnLFxuICAgICAgICByZXF1aXJlQ29tcG9uZW50OiBjYy5SaWdpZEJvZHlcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBXaGV0aGVyIHRoZSBjaGFpbiBpcyBsb29wXG4gICAgICAgICAqICEjemgg6ZO+5p2h5piv5ZCm6aaW5bC+55u46L+eXG4gICAgICAgICAqIEBwcm9wZXJ0eSBsb29wXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgbG9vcDogZmFsc2UsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQ2hhaW4gcG9pbnRzXG4gICAgICAgICAqICEjemgg6ZO+5p2h6aG254K55pWw57uEXG4gICAgICAgICAqIEBwcm9wZXJ0eSBwb2ludHNcbiAgICAgICAgICogQHR5cGUge1ZlYzJbXX1cbiAgICAgICAgICovXG4gICAgICAgIHBvaW50czoge1xuICAgICAgICAgICAgZGVmYXVsdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICByZXR1cm4gW2NjLnYyKC01MCwgMCksIGNjLnYyKDUwLCAwKV07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogW2NjLlZlYzJdXG4gICAgICAgIH0sXG5cbiAgICAgICAgdGhyZXNob2xkOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAxLFxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIF9jcmVhdGVTaGFwZTogZnVuY3Rpb24gKHNjYWxlKSB7XG4gICAgICAgIHZhciBzaGFwZSA9IG5ldyBiMi5DaGFpblNoYXBlKCk7XG5cbiAgICAgICAgdmFyIHBvaW50cyA9IHRoaXMucG9pbnRzO1xuICAgICAgICB2YXIgdmVydGljZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwID0gcG9pbnRzW2ldO1xuICAgICAgICAgICAgdmVydGljZXMucHVzaCggbmV3IGIyLlZlYzIocC54L1BUTV9SQVRJTypzY2FsZS54LCBwLnkvUFRNX1JBVElPKnNjYWxlLnkpICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sb29wKSB7XG4gICAgICAgICAgICBzaGFwZS5DcmVhdGVMb29wKHZlcnRpY2VzLCB2ZXJ0aWNlcy5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2hhcGUuQ3JlYXRlQ2hhaW4odmVydGljZXMsIHZlcnRpY2VzLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNoYXBlO1xuICAgIH0sXG5cbiAgICByZXNldEluRWRpdG9yOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKGRpZFJlc2V0VG9EZWZhdWx0KSB7XG4gICAgICAgIGlmIChkaWRSZXNldFRvRGVmYXVsdCkge1xuICAgICAgICAgICAgdGhpcy5yZXNldFBvaW50c0J5Q29udG91cigpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlc2V0UG9pbnRzQnlDb250b3VyOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgUGh5c2ljc1V0aWxzID0gRWRpdG9yLnJlcXVpcmUoJ3NjZW5lOi8vdXRpbHMvcGh5c2ljcycpO1xuICAgICAgICBQaHlzaWNzVXRpbHMucmVzZXRQb2ludHModGhpcywge3RocmVzaG9sZDogdGhpcy50aHJlc2hvbGQsIGxvb3A6IHRoaXMubG9vcH0pO1xuICAgIH1cbn0pO1xuXG5jYy5QaHlzaWNzQ2hhaW5Db2xsaWRlciA9IG1vZHVsZS5leHBvcnRzID0gUGh5c2ljc0NoYWluQ29sbGlkZXI7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==