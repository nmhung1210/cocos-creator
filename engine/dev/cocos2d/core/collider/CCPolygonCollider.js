
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/collider/CCPolygonCollider.js';
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

/**
 * !#en Defines a Polygon Collider .
 * !#zh 用来定义多边形碰撞体
 * @class Collider.Polygon
 */
cc.Collider.Polygon = cc.Class({
  properties: {
    threshold: {
      "default": 1,
      serializable: false,
      visible: false
    },
    _offset: cc.v2(0, 0),

    /**
     * !#en Position offset
     * !#zh 位置偏移量
     * @property offset
     * @type {Vec2}
     */
    offset: {
      get: function get() {
        return this._offset;
      },
      set: function set(value) {
        this._offset = value;
      },
      type: cc.Vec2
    },

    /**
     * !#en Polygon points
     * !#zh 多边形顶点数组
     * @property points
     * @type {Vec2[]}
     */
    points: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.points',
      "default": function _default() {
        return [cc.v2(-50, -50), cc.v2(50, -50), cc.v2(50, 50), cc.v2(-50, 50)];
      },
      type: [cc.Vec2]
    }
  },
  resetPointsByContour: CC_EDITOR && function () {
    var PhysicsUtils = Editor.require('scene://utils/physics');

    PhysicsUtils.resetPoints(this, {
      threshold: this.threshold
    });
  }
});
/**
 * !#en Polygon Collider.
 * !#zh 多边形碰撞组件
 * @class PolygonCollider
 * @extends Collider
 * @uses Collider.Polygon
 */

/**
 * !#en
 * Collider info in world coordinate.
 * !#zh
 * 碰撞体的世界坐标系下的信息。
 * @property {ColliderInfo} world
 */

var PolygonCollider = cc.Class({
  name: 'cc.PolygonCollider',
  "extends": cc.Collider,
  mixins: [cc.Collider.Polygon],
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.collider/Polygon Collider',
    inspector: 'packages://inspector/inspectors/comps/physics/points-base-collider.js'
  }
});
cc.PolygonCollider = module.exports = PolygonCollider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbGxpZGVyL0NDUG9seWdvbkNvbGxpZGVyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ29sbGlkZXIiLCJQb2x5Z29uIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwidGhyZXNob2xkIiwic2VyaWFsaXphYmxlIiwidmlzaWJsZSIsIl9vZmZzZXQiLCJ2MiIsIm9mZnNldCIsImdldCIsInNldCIsInZhbHVlIiwidHlwZSIsIlZlYzIiLCJwb2ludHMiLCJ0b29sdGlwIiwiQ0NfREVWIiwicmVzZXRQb2ludHNCeUNvbnRvdXIiLCJDQ19FRElUT1IiLCJQaHlzaWNzVXRpbHMiLCJFZGl0b3IiLCJyZXF1aXJlIiwicmVzZXRQb2ludHMiLCJQb2x5Z29uQ29sbGlkZXIiLCJuYW1lIiwibWl4aW5zIiwiZWRpdG9yIiwibWVudSIsImluc3BlY3RvciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkE7Ozs7O0FBS0FBLEVBQUUsQ0FBQ0MsUUFBSCxDQUFZQyxPQUFaLEdBQXNCRixFQUFFLENBQUNHLEtBQUgsQ0FBUztBQUMzQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRTtBQUNQLGlCQUFTLENBREY7QUFFUEMsTUFBQUEsWUFBWSxFQUFFLEtBRlA7QUFHUEMsTUFBQUEsT0FBTyxFQUFFO0FBSEYsS0FESDtBQU9SQyxJQUFBQSxPQUFPLEVBQUVSLEVBQUUsQ0FBQ1MsRUFBSCxDQUFNLENBQU4sRUFBUyxDQUFULENBUEQ7O0FBU1I7Ozs7OztBQU1BQyxJQUFBQSxNQUFNLEVBQUU7QUFDSkMsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixlQUFPLEtBQUtILE9BQVo7QUFDSCxPQUhHO0FBSUpJLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLGFBQUtMLE9BQUwsR0FBZUssS0FBZjtBQUNILE9BTkc7QUFPSkMsTUFBQUEsSUFBSSxFQUFFZCxFQUFFLENBQUNlO0FBUEwsS0FmQTs7QUF5QlI7Ozs7OztBQU1BQyxJQUFBQSxNQUFNLEVBQUU7QUFDSkMsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUksZ0RBRGY7QUFFSixpQkFBUyxvQkFBWTtBQUNoQixlQUFPLENBQUNsQixFQUFFLENBQUNTLEVBQUgsQ0FBTSxDQUFDLEVBQVAsRUFBVSxDQUFDLEVBQVgsQ0FBRCxFQUFpQlQsRUFBRSxDQUFDUyxFQUFILENBQU0sRUFBTixFQUFVLENBQUMsRUFBWCxDQUFqQixFQUFpQ1QsRUFBRSxDQUFDUyxFQUFILENBQU0sRUFBTixFQUFTLEVBQVQsQ0FBakMsRUFBK0NULEVBQUUsQ0FBQ1MsRUFBSCxDQUFNLENBQUMsRUFBUCxFQUFVLEVBQVYsQ0FBL0MsQ0FBUDtBQUNKLE9BSkc7QUFLSkssTUFBQUEsSUFBSSxFQUFFLENBQUNkLEVBQUUsQ0FBQ2UsSUFBSjtBQUxGO0FBL0JBLEdBRGU7QUF5QzNCSSxFQUFBQSxvQkFBb0IsRUFBRUMsU0FBUyxJQUFJLFlBQVk7QUFDM0MsUUFBSUMsWUFBWSxHQUFHQyxNQUFNLENBQUNDLE9BQVAsQ0FBZSx1QkFBZixDQUFuQjs7QUFDQUYsSUFBQUEsWUFBWSxDQUFDRyxXQUFiLENBQXlCLElBQXpCLEVBQStCO0FBQUNuQixNQUFBQSxTQUFTLEVBQUUsS0FBS0E7QUFBakIsS0FBL0I7QUFDSDtBQTVDMEIsQ0FBVCxDQUF0QjtBQWdEQTs7Ozs7Ozs7QUFPQTs7Ozs7Ozs7QUFPQSxJQUFJb0IsZUFBZSxHQUFHekIsRUFBRSxDQUFDRyxLQUFILENBQVM7QUFDM0J1QixFQUFBQSxJQUFJLEVBQUUsb0JBRHFCO0FBRTNCLGFBQVMxQixFQUFFLENBQUNDLFFBRmU7QUFHM0IwQixFQUFBQSxNQUFNLEVBQUUsQ0FBQzNCLEVBQUUsQ0FBQ0MsUUFBSCxDQUFZQyxPQUFiLENBSG1CO0FBSzNCMEIsRUFBQUEsTUFBTSxFQUFFUixTQUFTLElBQUk7QUFDakJTLElBQUFBLElBQUksRUFBRSxvREFEVztBQUVqQkMsSUFBQUEsU0FBUyxFQUFFO0FBRk07QUFMTSxDQUFULENBQXRCO0FBV0E5QixFQUFFLENBQUN5QixlQUFILEdBQXFCTSxNQUFNLENBQUNDLE9BQVAsR0FBaUJQLGVBQXRDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKipcbiAqICEjZW4gRGVmaW5lcyBhIFBvbHlnb24gQ29sbGlkZXIgLlxuICogISN6aCDnlKjmnaXlrprkuYnlpJrovrnlvaLnorDmkp7kvZNcbiAqIEBjbGFzcyBDb2xsaWRlci5Qb2x5Z29uXG4gKi9cbmNjLkNvbGxpZGVyLlBvbHlnb24gPSBjYy5DbGFzcyh7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB0aHJlc2hvbGQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IDEsXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBfb2Zmc2V0OiBjYy52MigwLCAwKSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBQb3NpdGlvbiBvZmZzZXRcbiAgICAgICAgICogISN6aCDkvY3nva7lgY/np7vph49cbiAgICAgICAgICogQHByb3BlcnR5IG9mZnNldFxuICAgICAgICAgKiBAdHlwZSB7VmVjMn1cbiAgICAgICAgICovXG4gICAgICAgIG9mZnNldDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNldDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IGNjLlZlYzJcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBQb2x5Z29uIHBvaW50c1xuICAgICAgICAgKiAhI3poIOWkmui+ueW9oumhtueCueaVsOe7hFxuICAgICAgICAgKiBAcHJvcGVydHkgcG9pbnRzXG4gICAgICAgICAqIEB0eXBlIHtWZWMyW119XG4gICAgICAgICAqL1xuICAgICAgICBwb2ludHM6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLnBvaW50cycsXG4gICAgICAgICAgICBkZWZhdWx0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgIHJldHVybiBbY2MudjIoLTUwLC01MCksIGNjLnYyKDUwLCAtNTApLCBjYy52Mig1MCw1MCksIGNjLnYyKC01MCw1MCldO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IFtjYy5WZWMyXVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlc2V0UG9pbnRzQnlDb250b3VyOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgUGh5c2ljc1V0aWxzID0gRWRpdG9yLnJlcXVpcmUoJ3NjZW5lOi8vdXRpbHMvcGh5c2ljcycpO1xuICAgICAgICBQaHlzaWNzVXRpbHMucmVzZXRQb2ludHModGhpcywge3RocmVzaG9sZDogdGhpcy50aHJlc2hvbGR9KTtcbiAgICB9XG59KTtcblxuXG4vKipcbiAqICEjZW4gUG9seWdvbiBDb2xsaWRlci5cbiAqICEjemgg5aSa6L655b2i56Kw5pKe57uE5Lu2XG4gKiBAY2xhc3MgUG9seWdvbkNvbGxpZGVyXG4gKiBAZXh0ZW5kcyBDb2xsaWRlclxuICogQHVzZXMgQ29sbGlkZXIuUG9seWdvblxuICovXG4vKipcbiAqICEjZW5cbiAqIENvbGxpZGVyIGluZm8gaW4gd29ybGQgY29vcmRpbmF0ZS5cbiAqICEjemhcbiAqIOeisOaSnuS9k+eahOS4lueVjOWdkOagh+ezu+S4i+eahOS/oeaBr+OAglxuICogQHByb3BlcnR5IHtDb2xsaWRlckluZm99IHdvcmxkXG4gKi9cbnZhciBQb2x5Z29uQ29sbGlkZXIgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlBvbHlnb25Db2xsaWRlcicsXG4gICAgZXh0ZW5kczogY2MuQ29sbGlkZXIsXG4gICAgbWl4aW5zOiBbY2MuQ29sbGlkZXIuUG9seWdvbl0sXG5cbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQuY29sbGlkZXIvUG9seWdvbiBDb2xsaWRlcicsXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvcGh5c2ljcy9wb2ludHMtYmFzZS1jb2xsaWRlci5qcycsXG4gICAgfSxcbn0pO1xuXG5jYy5Qb2x5Z29uQ29sbGlkZXIgPSBtb2R1bGUuZXhwb3J0cyA9IFBvbHlnb25Db2xsaWRlcjtcbiJdLCJzb3VyY2VSb290IjoiLyJ9