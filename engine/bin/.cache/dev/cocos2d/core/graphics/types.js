
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/graphics/types.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}/****************************************************************************
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
'use strict';
/**
 * !#en Enum for LineCap.
 * !#zh 线段末端属性
 * @enum Graphics.LineCap
 */

var LineCap = cc.Enum({
  /**
   * !#en The ends of lines are squared off at the endpoints.
   * !#zh 线段末端以方形结束。
   * @property {Number} BUTT
   */
  BUTT: 0,

  /**
   * !#en The ends of lines are rounded.
   * !#zh 线段末端以圆形结束。
   * @property {Number} ROUND
   */
  ROUND: 1,

  /**
   * !#en The ends of lines are squared off by adding a box with an equal width and half the height of the line's thickness.
   * !#zh 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。
   * @property {Number} SQUARE
   */
  SQUARE: 2
});
/**
 * !#en Enum for LineJoin.
 * !#zh 线段拐角属性
 * @enum Graphics.LineJoin
 */

var LineJoin = cc.Enum({
  /**
   * !#en Fills an additional triangular area between the common endpoint of connected segments, and the separate outside rectangular corners of each segment.
   * !#zh 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
   * @property {Number} BEVEL
   */
  BEVEL: 0,

  /**
   * !#en Rounds off the corners of a shape by filling an additional sector of disc centered at the common endpoint of connected segments. The radius for these rounded corners is equal to the line width.
   * !#zh 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
   * @property {Number} ROUND
   */
  ROUND: 1,

  /**
   * !#en Connected segments are joined by extending their outside edges to connect at a single point, with the effect of filling an additional lozenge-shaped area.
   * !#zh 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。
   * @property {Number} MITER
   */
  MITER: 2
}); // PointFlags

var PointFlags = cc.Enum({
  PT_CORNER: 0x01,
  PT_LEFT: 0x02,
  PT_BEVEL: 0x04,
  PT_INNERBEVEL: 0x08
});
module.exports = {
  LineCap: LineCap,
  LineJoin: LineJoin,
  PointFlags: PointFlags
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2dyYXBoaWNzL3R5cGVzLmpzIl0sIm5hbWVzIjpbIkxpbmVDYXAiLCJjYyIsIkVudW0iLCJCVVRUIiwiUk9VTkQiLCJTUVVBUkUiLCJMaW5lSm9pbiIsIkJFVkVMIiwiTUlURVIiLCJQb2ludEZsYWdzIiwiUFRfQ09STkVSIiwiUFRfTEVGVCIsIlBUX0JFVkVMIiwiUFRfSU5ORVJCRVZFTCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkE7QUFFQTs7Ozs7O0FBS0EsSUFBSUEsT0FBTyxHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUNsQjs7Ozs7QUFLQUMsRUFBQUEsSUFBSSxFQUFFLENBTlk7O0FBUWxCOzs7OztBQUtBQyxFQUFBQSxLQUFLLEVBQUUsQ0FiVzs7QUFlbEI7Ozs7O0FBS0FDLEVBQUFBLE1BQU0sRUFBRTtBQXBCVSxDQUFSLENBQWQ7QUF1QkE7Ozs7OztBQUtBLElBQUlDLFFBQVEsR0FBR0wsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDbkI7Ozs7O0FBS0FLLEVBQUFBLEtBQUssRUFBRSxDQU5ZOztBQVFuQjs7Ozs7QUFLQUgsRUFBQUEsS0FBSyxFQUFFLENBYlk7O0FBZW5COzs7OztBQUtBSSxFQUFBQSxLQUFLLEVBQUU7QUFwQlksQ0FBUixDQUFmLEVBd0JBOztBQUNBLElBQUlDLFVBQVUsR0FBSVIsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDdEJRLEVBQUFBLFNBQVMsRUFBRSxJQURXO0FBRXRCQyxFQUFBQSxPQUFPLEVBQUUsSUFGYTtBQUd0QkMsRUFBQUEsUUFBUSxFQUFFLElBSFk7QUFJdEJDLEVBQUFBLGFBQWEsRUFBRTtBQUpPLENBQVIsQ0FBbEI7QUFPQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2JmLEVBQUFBLE9BQU8sRUFBS0EsT0FEQztBQUViTSxFQUFBQSxRQUFRLEVBQUlBLFFBRkM7QUFHYkcsRUFBQUEsVUFBVSxFQUFFQTtBQUhDLENBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuIFxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqICEjZW4gRW51bSBmb3IgTGluZUNhcC5cbiAqICEjemgg57q/5q615pyr56uv5bGe5oCnXG4gKiBAZW51bSBHcmFwaGljcy5MaW5lQ2FwXG4gKi9cbnZhciBMaW5lQ2FwID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZW5kcyBvZiBsaW5lcyBhcmUgc3F1YXJlZCBvZmYgYXQgdGhlIGVuZHBvaW50cy5cbiAgICAgKiAhI3poIOe6v+auteacq+err+S7peaWueW9oue7k+adn+OAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBCVVRUXG4gICAgICovXG4gICAgQlVUVDogMCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGVuZHMgb2YgbGluZXMgYXJlIHJvdW5kZWQuXG4gICAgICogISN6aCDnur/mrrXmnKvnq6/ku6XlnIblvaLnu5PmnZ/jgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUk9VTkRcbiAgICAgKi9cbiAgICBST1VORDogMSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGVuZHMgb2YgbGluZXMgYXJlIHNxdWFyZWQgb2ZmIGJ5IGFkZGluZyBhIGJveCB3aXRoIGFuIGVxdWFsIHdpZHRoIGFuZCBoYWxmIHRoZSBoZWlnaHQgb2YgdGhlIGxpbmUncyB0aGlja25lc3MuXG4gICAgICogISN6aCDnur/mrrXmnKvnq6/ku6XmlrnlvaLnu5PmnZ/vvIzkvYbmmK/lop7liqDkuobkuIDkuKrlrr3luqblkoznur/mrrXnm7jlkIzvvIzpq5jluqbmmK/nur/mrrXljprluqbkuIDljYrnmoTnn6nlvaLljLrln5/jgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU1FVQVJFXG4gICAgICovXG4gICAgU1FVQVJFOiAyLFxufSk7XG5cbi8qKlxuICogISNlbiBFbnVtIGZvciBMaW5lSm9pbi5cbiAqICEjemgg57q/5q615ouQ6KeS5bGe5oCnXG4gKiBAZW51bSBHcmFwaGljcy5MaW5lSm9pblxuICovXG52YXIgTGluZUpvaW4gPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIEZpbGxzIGFuIGFkZGl0aW9uYWwgdHJpYW5ndWxhciBhcmVhIGJldHdlZW4gdGhlIGNvbW1vbiBlbmRwb2ludCBvZiBjb25uZWN0ZWQgc2VnbWVudHMsIGFuZCB0aGUgc2VwYXJhdGUgb3V0c2lkZSByZWN0YW5ndWxhciBjb3JuZXJzIG9mIGVhY2ggc2VnbWVudC5cbiAgICAgKiAhI3poIOWcqOebuOi/numDqOWIhueahOacq+err+Whq+WFheS4gOS4qumineWklueahOS7peS4ieinkuW9ouS4uuW6leeahOWMuuWfn++8jCDmr4/kuKrpg6jliIbpg73mnInlkIToh6rni6znq4vnmoTnn6nlvaLmi5Dop5LjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQkVWRUxcbiAgICAgKi9cbiAgICBCRVZFTDogMCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUm91bmRzIG9mZiB0aGUgY29ybmVycyBvZiBhIHNoYXBlIGJ5IGZpbGxpbmcgYW4gYWRkaXRpb25hbCBzZWN0b3Igb2YgZGlzYyBjZW50ZXJlZCBhdCB0aGUgY29tbW9uIGVuZHBvaW50IG9mIGNvbm5lY3RlZCBzZWdtZW50cy4gVGhlIHJhZGl1cyBmb3IgdGhlc2Ugcm91bmRlZCBjb3JuZXJzIGlzIGVxdWFsIHRvIHRoZSBsaW5lIHdpZHRoLlxuICAgICAqICEjemgg6YCa6L+H5aGr5YWF5LiA5Liq6aKd5aSW55qE77yM5ZyG5b+D5Zyo55u46L+e6YOo5YiG5pyr56uv55qE5omH5b2i77yM57uY5Yi25ouQ6KeS55qE5b2i54q244CCIOWchuinkueahOWNiuW+hOaYr+e6v+auteeahOWuveW6puOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBST1VORFxuICAgICAqL1xuICAgIFJPVU5EOiAxLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBDb25uZWN0ZWQgc2VnbWVudHMgYXJlIGpvaW5lZCBieSBleHRlbmRpbmcgdGhlaXIgb3V0c2lkZSBlZGdlcyB0byBjb25uZWN0IGF0IGEgc2luZ2xlIHBvaW50LCB3aXRoIHRoZSBlZmZlY3Qgb2YgZmlsbGluZyBhbiBhZGRpdGlvbmFsIGxvemVuZ2Utc2hhcGVkIGFyZWEuXG4gICAgICogISN6aCDpgJrov4flu7bkvLjnm7jov57pg6jliIbnmoTlpJbovrnnvJjvvIzkvb/lhbbnm7jkuqTkuo7kuIDngrnvvIzlvaLmiJDkuIDkuKrpop3lpJbnmoToj7HlvaLljLrln5/jgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTUlURVJcbiAgICAgKi9cbiAgICBNSVRFUjogMlxufSk7XG5cblxuLy8gUG9pbnRGbGFnc1xudmFyIFBvaW50RmxhZ3MgPSAgY2MuRW51bSh7XG4gICAgUFRfQ09STkVSOiAweDAxLFxuICAgIFBUX0xFRlQ6IDB4MDIsXG4gICAgUFRfQkVWRUw6IDB4MDQsXG4gICAgUFRfSU5ORVJCRVZFTDogMHgwOCxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBMaW5lQ2FwOiAgICBMaW5lQ2FwLFxuICAgIExpbmVKb2luOiAgIExpbmVKb2luLFxuICAgIFBvaW50RmxhZ3M6IFBvaW50RmxhZ3Ncbn07XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==