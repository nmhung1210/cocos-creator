
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/collider/CCCircleCollider.js';
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
 * !#en Defines a Circle Collider .
 * !#zh 用来定义圆形碰撞体
 * @class Collider.Circle
 */
cc.Collider.Circle = cc.Class({
  properties: {
    _offset: cc.v2(0, 0),
    _radius: 50,

    /**
     * !#en Position offset
     * !#zh 位置偏移量
     * @property offset
     * @type {Vec2}
     */
    offset: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.offset',
      get: function get() {
        return this._offset;
      },
      set: function set(value) {
        this._offset = value;
      },
      type: cc.Vec2
    },

    /**
     * !#en Circle radius
     * !#zh 圆形半径
     * @property radius
     * @type {Number}
     */
    radius: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.radius',
      get: function get() {
        return this._radius;
      },
      set: function set(value) {
        this._radius = value < 0 ? 0 : value;
      }
    }
  },
  resetInEditor: CC_EDITOR && function (didResetToDefault) {
    if (didResetToDefault) {
      var size = this.node.getContentSize();
      var radius = Math.max(size.width, size.height);

      if (radius !== 0) {
        this.radius = radius;
      }
    }
  }
});
/**
 * !#en Circle Collider.
 * !#zh 圆形碰撞组件
 * @class CircleCollider
 * @extends Collider
 * @uses Collider.Circle
 */

/**
 * !#en
 * Collider info in world coordinate.
 * !#zh
 * 碰撞体的世界坐标系下的信息。
 * @property {ColliderInfo} world
 */

var CircleCollider = cc.Class({
  name: 'cc.CircleCollider',
  "extends": cc.Collider,
  mixins: [cc.Collider.Circle],
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.collider/Circle Collider'
  }
});
cc.CircleCollider = module.exports = CircleCollider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbGxpZGVyL0NDQ2lyY2xlQ29sbGlkZXIuanMiXSwibmFtZXMiOlsiY2MiLCJDb2xsaWRlciIsIkNpcmNsZSIsIkNsYXNzIiwicHJvcGVydGllcyIsIl9vZmZzZXQiLCJ2MiIsIl9yYWRpdXMiLCJvZmZzZXQiLCJ0b29sdGlwIiwiQ0NfREVWIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJ0eXBlIiwiVmVjMiIsInJhZGl1cyIsInJlc2V0SW5FZGl0b3IiLCJDQ19FRElUT1IiLCJkaWRSZXNldFRvRGVmYXVsdCIsInNpemUiLCJub2RlIiwiZ2V0Q29udGVudFNpemUiLCJNYXRoIiwibWF4Iiwid2lkdGgiLCJoZWlnaHQiLCJDaXJjbGVDb2xsaWRlciIsIm5hbWUiLCJtaXhpbnMiLCJlZGl0b3IiLCJtZW51IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7Ozs7QUFLQUEsRUFBRSxDQUFDQyxRQUFILENBQVlDLE1BQVosR0FBcUJGLEVBQUUsQ0FBQ0csS0FBSCxDQUFTO0FBQzFCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsT0FBTyxFQUFFTCxFQUFFLENBQUNNLEVBQUgsQ0FBTSxDQUFOLEVBQVMsQ0FBVCxDQUREO0FBRVJDLElBQUFBLE9BQU8sRUFBRSxFQUZEOztBQUlSOzs7Ozs7QUFNQUMsSUFBQUEsTUFBTSxFQUFFO0FBQ0pDLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLGdEQURmO0FBRUpDLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLTixPQUFaO0FBQ0gsT0FKRztBQUtKTyxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixhQUFLUixPQUFMLEdBQWVRLEtBQWY7QUFDSCxPQVBHO0FBUUpDLE1BQUFBLElBQUksRUFBRWQsRUFBRSxDQUFDZTtBQVJMLEtBVkE7O0FBcUJSOzs7Ozs7QUFNQUMsSUFBQUEsTUFBTSxFQUFFO0FBQ0pQLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLGdEQURmO0FBRUpDLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLSixPQUFaO0FBQ0gsT0FKRztBQUtKSyxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixhQUFLTixPQUFMLEdBQWVNLEtBQUssR0FBRyxDQUFSLEdBQVksQ0FBWixHQUFnQkEsS0FBL0I7QUFDSDtBQVBHO0FBM0JBLEdBRGM7QUF1QzFCSSxFQUFBQSxhQUFhLEVBQUVDLFNBQVMsSUFBSSxVQUFVQyxpQkFBVixFQUE2QjtBQUNyRCxRQUFJQSxpQkFBSixFQUF1QjtBQUNuQixVQUFJQyxJQUFJLEdBQUcsS0FBS0MsSUFBTCxDQUFVQyxjQUFWLEVBQVg7QUFDQSxVQUFJTixNQUFNLEdBQUdPLElBQUksQ0FBQ0MsR0FBTCxDQUFTSixJQUFJLENBQUNLLEtBQWQsRUFBcUJMLElBQUksQ0FBQ00sTUFBMUIsQ0FBYjs7QUFDQSxVQUFJVixNQUFNLEtBQUssQ0FBZixFQUFrQjtBQUNkLGFBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNIO0FBQ0o7QUFDSjtBQS9DeUIsQ0FBVCxDQUFyQjtBQWtEQTs7Ozs7Ozs7QUFPQTs7Ozs7Ozs7QUFPQSxJQUFJVyxjQUFjLEdBQUczQixFQUFFLENBQUNHLEtBQUgsQ0FBUztBQUMxQnlCLEVBQUFBLElBQUksRUFBRSxtQkFEb0I7QUFFMUIsYUFBUzVCLEVBQUUsQ0FBQ0MsUUFGYztBQUcxQjRCLEVBQUFBLE1BQU0sRUFBRSxDQUFDN0IsRUFBRSxDQUFDQyxRQUFILENBQVlDLE1BQWIsQ0FIa0I7QUFLMUI0QixFQUFBQSxNQUFNLEVBQUVaLFNBQVMsSUFBSTtBQUNqQmEsSUFBQUEsSUFBSSxFQUFFO0FBRFc7QUFMSyxDQUFULENBQXJCO0FBVUEvQixFQUFFLENBQUMyQixjQUFILEdBQW9CSyxNQUFNLENBQUNDLE9BQVAsR0FBaUJOLGNBQXJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKipcbiAqICEjZW4gRGVmaW5lcyBhIENpcmNsZSBDb2xsaWRlciAuXG4gKiAhI3poIOeUqOadpeWumuS5ieWchuW9oueisOaSnuS9k1xuICogQGNsYXNzIENvbGxpZGVyLkNpcmNsZVxuICovXG5jYy5Db2xsaWRlci5DaXJjbGUgPSBjYy5DbGFzcyh7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfb2Zmc2V0OiBjYy52MigwLCAwKSxcbiAgICAgICAgX3JhZGl1czogNTAsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gUG9zaXRpb24gb2Zmc2V0XG4gICAgICAgICAqICEjemgg5L2N572u5YGP56e76YePXG4gICAgICAgICAqIEBwcm9wZXJ0eSBvZmZzZXRcbiAgICAgICAgICogQHR5cGUge1ZlYzJ9XG4gICAgICAgICAqL1xuICAgICAgICBvZmZzZXQ6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLm9mZnNldCcsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb2Zmc2V0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogY2MuVmVjMlxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIENpcmNsZSByYWRpdXNcbiAgICAgICAgICogISN6aCDlnIblvaLljYrlvoRcbiAgICAgICAgICogQHByb3BlcnR5IHJhZGl1c1xuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgcmFkaXVzOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5yYWRpdXMnLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JhZGl1cztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IHZhbHVlIDwgMCA/IDAgOiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZXNldEluRWRpdG9yOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKGRpZFJlc2V0VG9EZWZhdWx0KSB7XG4gICAgICAgIGlmIChkaWRSZXNldFRvRGVmYXVsdCkge1xuICAgICAgICAgICAgdmFyIHNpemUgPSB0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUoKTtcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSBNYXRoLm1heChzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XG4gICAgICAgICAgICBpZiAocmFkaXVzICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLyoqXG4gKiAhI2VuIENpcmNsZSBDb2xsaWRlci5cbiAqICEjemgg5ZyG5b2i56Kw5pKe57uE5Lu2XG4gKiBAY2xhc3MgQ2lyY2xlQ29sbGlkZXJcbiAqIEBleHRlbmRzIENvbGxpZGVyXG4gKiBAdXNlcyBDb2xsaWRlci5DaXJjbGVcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBDb2xsaWRlciBpbmZvIGluIHdvcmxkIGNvb3JkaW5hdGUuXG4gKiAhI3poXG4gKiDnorDmkp7kvZPnmoTkuJbnlYzlnZDmoIfns7vkuIvnmoTkv6Hmga/jgIJcbiAqIEBwcm9wZXJ0eSB7Q29sbGlkZXJJbmZvfSB3b3JsZFxuICovXG52YXIgQ2lyY2xlQ29sbGlkZXIgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkNpcmNsZUNvbGxpZGVyJyxcbiAgICBleHRlbmRzOiBjYy5Db2xsaWRlcixcbiAgICBtaXhpbnM6IFtjYy5Db2xsaWRlci5DaXJjbGVdLFxuXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LmNvbGxpZGVyL0NpcmNsZSBDb2xsaWRlcidcbiAgICB9LFxufSk7XG5cbmNjLkNpcmNsZUNvbGxpZGVyID0gbW9kdWxlLmV4cG9ydHMgPSBDaXJjbGVDb2xsaWRlcjtcbiJdLCJzb3VyY2VSb290IjoiLyJ9