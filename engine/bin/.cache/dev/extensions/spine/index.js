
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/spine/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * !#en
 * The global main namespace of Spine, all classes, functions,
 * properties and constants of Spine are defined in this namespace
 * !#zh
 * Spine 的全局的命名空间，
 * 与 Spine 相关的所有的类，函数，属性，常量都在这个命名空间中定义。
 * @module sp
 * @main sp
 */

/*
 * Reference:
 * http://esotericsoftware.com/spine-runtime-terminology
 * http://esotericsoftware.com/files/runtime-diagram.png
 * http://en.esotericsoftware.com/spine-using-runtimes
 */
var _global = typeof window === 'undefined' ? global : window;

var _isUseSpine = true;

if (!CC_NATIVERENDERER) {
  _global.spine = require('./lib/spine');
} else if (!_global.spine) {
  _isUseSpine = false;
}

if (_isUseSpine) {
  _global.sp = {};
  /**
   * !#en
   * The global time scale of Spine.
   * !#zh
   * Spine 全局时间缩放率。
   * @example
   * sp.timeScale = 0.8;
   */

  sp._timeScale = 1.0;
  Object.defineProperty(sp, 'timeScale', {
    get: function get() {
      return this._timeScale;
    },
    set: function set(value) {
      this._timeScale = value;
    },
    configurable: true
  }); // The attachment type of spine. It contains three type: REGION(0), BOUNDING_BOX(1), MESH(2) and SKINNED_MESH.

  sp.ATTACHMENT_TYPE = {
    REGION: 0,
    BOUNDING_BOX: 1,
    MESH: 2,
    SKINNED_MESH: 3
  };
  /**
   * !#en The event type of spine skeleton animation.
   * !#zh 骨骼动画事件类型。
   * @enum AnimationEventType
   */

  sp.AnimationEventType = cc.Enum({
    /**
     * !#en The play spine skeleton animation start type.
     * !#zh 开始播放骨骼动画。
     * @property {Number} START
     */
    START: 0,

    /**
     * !#en Another entry has replaced this entry as the current entry. This entry may continue being applied for mixing.
     * !#zh 当前的 entry 被其他的 entry 替换。当使用 mixing 时，当前的 entry 会继续运行。
     */
    INTERRUPT: 1,

    /**
     * !#en The play spine skeleton animation finish type.
     * !#zh 播放骨骼动画结束。
     * @property {Number} END
     */
    END: 2,

    /**
     * !#en The entry will be disposed.
     * !#zh entry 将被销毁。
     */
    DISPOSE: 3,

    /**
     * !#en The play spine skeleton animation complete type.
     * !#zh 播放骨骼动画完成。
     * @property {Number} COMPLETE
     */
    COMPLETE: 4,

    /**
     * !#en The spine skeleton animation event type.
     * !#zh 骨骼动画事件。
     * @property {Number} EVENT
     */
    EVENT: 5
  });
  /**
   * @module sp
   */

  if (!CC_EDITOR || !Editor.isMainProcess) {
    sp.spine = _global.spine;

    if (!CC_NATIVERENDERER) {
      require('./skeleton-texture');
    }

    require('./skeleton-data');

    require('./vertex-effect-delegate');

    require('./Skeleton');

    require('./spine-assembler');
  } else {
    require('./skeleton-data');
  }
}
/**
 * !#en
 * `sp.spine` is the namespace for official Spine Runtime, which officially implemented and maintained by Spine.<br>
 * Please refer to the official documentation for its detailed usage: [http://en.esotericsoftware.com/spine-using-runtimes](http://en.esotericsoftware.com/spine-using-runtimes)
 * !#zh
 * sp.spine 模块是 Spine 官方运行库的 API 入口，由 Spine 官方统一实现和维护，具体用法请参考：[http://zh.esotericsoftware.com/spine-using-runtimes](http://zh.esotericsoftware.com/spine-using-runtimes)
 * @module sp.spine
 * @main sp.spine
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvZXh0ZW5zaW9ucy9zcGluZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJfZ2xvYmFsIiwid2luZG93IiwiZ2xvYmFsIiwiX2lzVXNlU3BpbmUiLCJDQ19OQVRJVkVSRU5ERVJFUiIsInNwaW5lIiwicmVxdWlyZSIsInNwIiwiX3RpbWVTY2FsZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJjb25maWd1cmFibGUiLCJBVFRBQ0hNRU5UX1RZUEUiLCJSRUdJT04iLCJCT1VORElOR19CT1giLCJNRVNIIiwiU0tJTk5FRF9NRVNIIiwiQW5pbWF0aW9uRXZlbnRUeXBlIiwiY2MiLCJFbnVtIiwiU1RBUlQiLCJJTlRFUlJVUFQiLCJFTkQiLCJESVNQT1NFIiwiQ09NUExFVEUiLCJFVkVOVCIsIkNDX0VESVRPUiIsIkVkaXRvciIsImlzTWFpblByb2Nlc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7Ozs7Ozs7Ozs7QUFXQTs7Ozs7O0FBT0EsSUFBSUEsT0FBTyxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUF2RDs7QUFDQSxJQUFJRSxXQUFXLEdBQUcsSUFBbEI7O0FBRUEsSUFBSSxDQUFDQyxpQkFBTCxFQUF3QjtBQUNwQkosRUFBQUEsT0FBTyxDQUFDSyxLQUFSLEdBQWdCQyxPQUFPLENBQUMsYUFBRCxDQUF2QjtBQUNILENBRkQsTUFFTyxJQUFJLENBQUNOLE9BQU8sQ0FBQ0ssS0FBYixFQUFvQjtBQUN2QkYsRUFBQUEsV0FBVyxHQUFHLEtBQWQ7QUFDSDs7QUFFRCxJQUFJQSxXQUFKLEVBQWlCO0FBQ2JILEVBQUFBLE9BQU8sQ0FBQ08sRUFBUixHQUFhLEVBQWI7QUFFQTs7Ozs7Ozs7O0FBUUFBLEVBQUFBLEVBQUUsQ0FBQ0MsVUFBSCxHQUFnQixHQUFoQjtBQUNBQyxFQUFBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JILEVBQXRCLEVBQTBCLFdBQTFCLEVBQXVDO0FBQ25DSSxJQUFBQSxHQURtQyxpQkFDNUI7QUFDSCxhQUFPLEtBQUtILFVBQVo7QUFDSCxLQUhrQztBQUluQ0ksSUFBQUEsR0FKbUMsZUFJOUJDLEtBSjhCLEVBSXZCO0FBQ1IsV0FBS0wsVUFBTCxHQUFrQkssS0FBbEI7QUFDSCxLQU5rQztBQU9uQ0MsSUFBQUEsWUFBWSxFQUFFO0FBUHFCLEdBQXZDLEVBWmEsQ0FzQmI7O0FBQ0FQLEVBQUFBLEVBQUUsQ0FBQ1EsZUFBSCxHQUFxQjtBQUNqQkMsSUFBQUEsTUFBTSxFQUFFLENBRFM7QUFFakJDLElBQUFBLFlBQVksRUFBRSxDQUZHO0FBR2pCQyxJQUFBQSxJQUFJLEVBQUUsQ0FIVztBQUlqQkMsSUFBQUEsWUFBWSxFQUFDO0FBSkksR0FBckI7QUFPQTs7Ozs7O0FBS0FaLEVBQUFBLEVBQUUsQ0FBQ2Esa0JBQUgsR0FBd0JDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQzVCOzs7OztBQUtBQyxJQUFBQSxLQUFLLEVBQUUsQ0FOcUI7O0FBTzVCOzs7O0FBSUFDLElBQUFBLFNBQVMsRUFBRSxDQVhpQjs7QUFZNUI7Ozs7O0FBS0FDLElBQUFBLEdBQUcsRUFBRSxDQWpCdUI7O0FBa0I1Qjs7OztBQUlBQyxJQUFBQSxPQUFPLEVBQUUsQ0F0Qm1COztBQXVCNUI7Ozs7O0FBS0FDLElBQUFBLFFBQVEsRUFBRSxDQTVCa0I7O0FBNkI1Qjs7Ozs7QUFLQUMsSUFBQUEsS0FBSyxFQUFFO0FBbENxQixHQUFSLENBQXhCO0FBcUNBOzs7O0FBR0EsTUFBSSxDQUFDQyxTQUFELElBQWMsQ0FBQ0MsTUFBTSxDQUFDQyxhQUExQixFQUF5QztBQUVyQ3hCLElBQUFBLEVBQUUsQ0FBQ0YsS0FBSCxHQUFXTCxPQUFPLENBQUNLLEtBQW5COztBQUNBLFFBQUksQ0FBQ0QsaUJBQUwsRUFBd0I7QUFDcEJFLE1BQUFBLE9BQU8sQ0FBQyxvQkFBRCxDQUFQO0FBQ0g7O0FBRURBLElBQUFBLE9BQU8sQ0FBQyxpQkFBRCxDQUFQOztBQUNBQSxJQUFBQSxPQUFPLENBQUMsMEJBQUQsQ0FBUDs7QUFDQUEsSUFBQUEsT0FBTyxDQUFDLFlBQUQsQ0FBUDs7QUFDQUEsSUFBQUEsT0FBTyxDQUFDLG1CQUFELENBQVA7QUFDSCxHQVhELE1BWUs7QUFDREEsSUFBQUEsT0FBTyxDQUFDLGlCQUFELENBQVA7QUFDSDtBQUNKO0FBRUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogISNlblxuICogVGhlIGdsb2JhbCBtYWluIG5hbWVzcGFjZSBvZiBTcGluZSwgYWxsIGNsYXNzZXMsIGZ1bmN0aW9ucyxcbiAqIHByb3BlcnRpZXMgYW5kIGNvbnN0YW50cyBvZiBTcGluZSBhcmUgZGVmaW5lZCBpbiB0aGlzIG5hbWVzcGFjZVxuICogISN6aFxuICogU3BpbmUg55qE5YWo5bGA55qE5ZG95ZCN56m66Ze077yMXG4gKiDkuI4gU3BpbmUg55u45YWz55qE5omA5pyJ55qE57G777yM5Ye95pWw77yM5bGe5oCn77yM5bi46YeP6YO95Zyo6L+Z5Liq5ZG95ZCN56m66Ze05Lit5a6a5LmJ44CCXG4gKiBAbW9kdWxlIHNwXG4gKiBAbWFpbiBzcFxuICovXG5cbi8qXG4gKiBSZWZlcmVuY2U6XG4gKiBodHRwOi8vZXNvdGVyaWNzb2Z0d2FyZS5jb20vc3BpbmUtcnVudGltZS10ZXJtaW5vbG9neVxuICogaHR0cDovL2Vzb3Rlcmljc29mdHdhcmUuY29tL2ZpbGVzL3J1bnRpbWUtZGlhZ3JhbS5wbmdcbiAqIGh0dHA6Ly9lbi5lc290ZXJpY3NvZnR3YXJlLmNvbS9zcGluZS11c2luZy1ydW50aW1lc1xuICovXG5cbnZhciBfZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3c7XG52YXIgX2lzVXNlU3BpbmUgPSB0cnVlO1xuXG5pZiAoIUNDX05BVElWRVJFTkRFUkVSKSB7XG4gICAgX2dsb2JhbC5zcGluZSA9IHJlcXVpcmUoJy4vbGliL3NwaW5lJyk7XG59IGVsc2UgaWYgKCFfZ2xvYmFsLnNwaW5lKSB7XG4gICAgX2lzVXNlU3BpbmUgPSBmYWxzZTtcbn1cblxuaWYgKF9pc1VzZVNwaW5lKSB7XG4gICAgX2dsb2JhbC5zcCA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFRoZSBnbG9iYWwgdGltZSBzY2FsZSBvZiBTcGluZS5cbiAgICAgKiAhI3poXG4gICAgICogU3BpbmUg5YWo5bGA5pe26Ze057yp5pS+546H44CCXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzcC50aW1lU2NhbGUgPSAwLjg7XG4gICAgICovXG4gICAgc3AuX3RpbWVTY2FsZSA9IDEuMDtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc3AsICd0aW1lU2NhbGUnLCB7XG4gICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGltZVNjYWxlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl90aW1lU2NhbGUgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgLy8gVGhlIGF0dGFjaG1lbnQgdHlwZSBvZiBzcGluZS4gSXQgY29udGFpbnMgdGhyZWUgdHlwZTogUkVHSU9OKDApLCBCT1VORElOR19CT1goMSksIE1FU0goMikgYW5kIFNLSU5ORURfTUVTSC5cbiAgICBzcC5BVFRBQ0hNRU5UX1RZUEUgPSB7XG4gICAgICAgIFJFR0lPTjogMCxcbiAgICAgICAgQk9VTkRJTkdfQk9YOiAxLFxuICAgICAgICBNRVNIOiAyLFxuICAgICAgICBTS0lOTkVEX01FU0g6M1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIG9mIHNwaW5lIHNrZWxldG9uIGFuaW1hdGlvbi5cbiAgICAgKiAhI3poIOmqqOmqvOWKqOeUu+S6i+S7tuexu+Wei+OAglxuICAgICAqIEBlbnVtIEFuaW1hdGlvbkV2ZW50VHlwZVxuICAgICAqL1xuICAgIHNwLkFuaW1hdGlvbkV2ZW50VHlwZSA9IGNjLkVudW0oe1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgcGxheSBzcGluZSBza2VsZXRvbiBhbmltYXRpb24gc3RhcnQgdHlwZS5cbiAgICAgICAgICogISN6aCDlvIDlp4vmkq3mlL7pqqjpqrzliqjnlLvjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNUQVJUXG4gICAgICAgICAqL1xuICAgICAgICBTVEFSVDogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQW5vdGhlciBlbnRyeSBoYXMgcmVwbGFjZWQgdGhpcyBlbnRyeSBhcyB0aGUgY3VycmVudCBlbnRyeS4gVGhpcyBlbnRyeSBtYXkgY29udGludWUgYmVpbmcgYXBwbGllZCBmb3IgbWl4aW5nLlxuICAgICAgICAgKiAhI3poIOW9k+WJjeeahCBlbnRyeSDooqvlhbbku5bnmoQgZW50cnkg5pu/5o2i44CC5b2T5L2/55SoIG1peGluZyDml7bvvIzlvZPliY3nmoQgZW50cnkg5Lya57un57ut6L+Q6KGM44CCXG4gICAgICAgICAqL1xuICAgICAgICBJTlRFUlJVUFQ6IDEsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBwbGF5IHNwaW5lIHNrZWxldG9uIGFuaW1hdGlvbiBmaW5pc2ggdHlwZS5cbiAgICAgICAgICogISN6aCDmkq3mlL7pqqjpqrzliqjnlLvnu5PmnZ/jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEVORFxuICAgICAgICAgKi9cbiAgICAgICAgRU5EOiAyLFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgZW50cnkgd2lsbCBiZSBkaXNwb3NlZC5cbiAgICAgICAgICogISN6aCBlbnRyeSDlsIbooqvplIDmr4HjgIJcbiAgICAgICAgICovXG4gICAgICAgIERJU1BPU0U6IDMsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBwbGF5IHNwaW5lIHNrZWxldG9uIGFuaW1hdGlvbiBjb21wbGV0ZSB0eXBlLlxuICAgICAgICAgKiAhI3poIOaSreaUvumqqOmqvOWKqOeUu+WujOaIkOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQ09NUExFVEVcbiAgICAgICAgICovXG4gICAgICAgIENPTVBMRVRFOiA0LFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgc3BpbmUgc2tlbGV0b24gYW5pbWF0aW9uIGV2ZW50IHR5cGUuXG4gICAgICAgICAqICEjemgg6aqo6aq85Yqo55S75LqL5Lu244CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBFVkVOVFxuICAgICAgICAgKi9cbiAgICAgICAgRVZFTlQ6IDVcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEBtb2R1bGUgc3BcbiAgICAgKi9cbiAgICBpZiAoIUNDX0VESVRPUiB8fCAhRWRpdG9yLmlzTWFpblByb2Nlc3MpIHtcbiAgICAgICAgXG4gICAgICAgIHNwLnNwaW5lID0gX2dsb2JhbC5zcGluZTtcbiAgICAgICAgaWYgKCFDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgcmVxdWlyZSgnLi9za2VsZXRvbi10ZXh0dXJlJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXF1aXJlKCcuL3NrZWxldG9uLWRhdGEnKTtcbiAgICAgICAgcmVxdWlyZSgnLi92ZXJ0ZXgtZWZmZWN0LWRlbGVnYXRlJyk7XG4gICAgICAgIHJlcXVpcmUoJy4vU2tlbGV0b24nKTtcbiAgICAgICAgcmVxdWlyZSgnLi9zcGluZS1hc3NlbWJsZXInKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlcXVpcmUoJy4vc2tlbGV0b24tZGF0YScpO1xuICAgIH1cbn1cblxuLyoqXG4gKiAhI2VuXG4gKiBgc3Auc3BpbmVgIGlzIHRoZSBuYW1lc3BhY2UgZm9yIG9mZmljaWFsIFNwaW5lIFJ1bnRpbWUsIHdoaWNoIG9mZmljaWFsbHkgaW1wbGVtZW50ZWQgYW5kIG1haW50YWluZWQgYnkgU3BpbmUuPGJyPlxuICogUGxlYXNlIHJlZmVyIHRvIHRoZSBvZmZpY2lhbCBkb2N1bWVudGF0aW9uIGZvciBpdHMgZGV0YWlsZWQgdXNhZ2U6IFtodHRwOi8vZW4uZXNvdGVyaWNzb2Z0d2FyZS5jb20vc3BpbmUtdXNpbmctcnVudGltZXNdKGh0dHA6Ly9lbi5lc290ZXJpY3NvZnR3YXJlLmNvbS9zcGluZS11c2luZy1ydW50aW1lcylcbiAqICEjemhcbiAqIHNwLnNwaW5lIOaooeWdl+aYryBTcGluZSDlrpjmlrnov5DooYzlupPnmoQgQVBJIOWFpeWPo++8jOeUsSBTcGluZSDlrpjmlrnnu5/kuIDlrp7njrDlkoznu7TmiqTvvIzlhbfkvZPnlKjms5Xor7flj4LogIPvvJpbaHR0cDovL3poLmVzb3Rlcmljc29mdHdhcmUuY29tL3NwaW5lLXVzaW5nLXJ1bnRpbWVzXShodHRwOi8vemguZXNvdGVyaWNzb2Z0d2FyZS5jb20vc3BpbmUtdXNpbmctcnVudGltZXMpXG4gKiBAbW9kdWxlIHNwLnNwaW5lXG4gKiBAbWFpbiBzcC5zcGluZVxuICovXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==