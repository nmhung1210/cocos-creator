
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/event-manager/CCTouch.js';
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
 * !#en The touch event class
 * !#zh 封装了触摸相关的信息。
 * @class Touch
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} id
 */
cc.Touch = function (x, y, id) {
  this._lastModified = 0;
  this.setTouchInfo(id, x, y);
};

cc.Touch.prototype = {
  constructor: cc.Touch,

  /**
   * !#en Returns the current touch location in OpenGL coordinates.、
   * !#zh 获取当前触点位置。
   * @method getLocation
   * @return {Vec2}
   */
  getLocation: function getLocation() {
    return cc.v2(this._point.x, this._point.y);
  },

  /**
   * !#en Returns X axis location value.
      * !#zh 获取当前触点 X 轴位置。
      * @method getLocationX
   * @returns {Number}
   */
  getLocationX: function getLocationX() {
    return this._point.x;
  },

  /**
      * !#en Returns Y axis location value.
      * !#zh 获取当前触点 Y 轴位置。
      * @method getLocationY
   * @returns {Number}
   */
  getLocationY: function getLocationY() {
    return this._point.y;
  },

  /**
   * !#en Returns the previous touch location in OpenGL coordinates.
   * !#zh 获取触点在上一次事件时的位置对象，对象包含 x 和 y 属性。
   * @method getPreviousLocation
   * @return {Vec2}
   */
  getPreviousLocation: function getPreviousLocation() {
    return cc.v2(this._prevPoint.x, this._prevPoint.y);
  },

  /**
   * !#en Returns the start touch location in OpenGL coordinates.
   * !#zh 获取触点落下时的位置对象，对象包含 x 和 y 属性。
   * @method getStartLocation
   * @returns {Vec2}
   */
  getStartLocation: function getStartLocation() {
    return cc.v2(this._startPoint.x, this._startPoint.y);
  },

  /**
   * !#en Returns the delta distance from the previous touche to the current one in screen coordinates.
   * !#zh 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
   * @method getDelta
   * @return {Vec2}
   */
  getDelta: function getDelta() {
    return this._point.sub(this._prevPoint);
  },

  /**
   * !#en Returns the current touch location in screen coordinates.
   * !#zh 获取当前事件在游戏窗口内的坐标位置对象，对象包含 x 和 y 属性。
   * @method getLocationInView
   * @return {Vec2}
   */
  getLocationInView: function getLocationInView() {
    return cc.v2(this._point.x, cc.view._designResolutionSize.height - this._point.y);
  },

  /**
   * !#en Returns the previous touch location in screen coordinates.
   * !#zh 获取触点在上一次事件时在游戏窗口中的位置对象，对象包含 x 和 y 属性。
   * @method getPreviousLocationInView
   * @return {Vec2}
   */
  getPreviousLocationInView: function getPreviousLocationInView() {
    return cc.v2(this._prevPoint.x, cc.view._designResolutionSize.height - this._prevPoint.y);
  },

  /**
   * !#en Returns the start touch location in screen coordinates.
   * !#zh 获取触点落下时在游戏窗口中的位置对象，对象包含 x 和 y 属性。
   * @method getStartLocationInView
   * @return {Vec2}
   */
  getStartLocationInView: function getStartLocationInView() {
    return cc.v2(this._startPoint.x, cc.view._designResolutionSize.height - this._startPoint.y);
  },

  /**
   * !#en Returns the id of cc.Touch.
   * !#zh 触点的标识 ID，可以用来在多点触摸中跟踪触点。
   * @method getID
   * @return {Number}
   */
  getID: function getID() {
    return this._id;
  },

  /**
   * !#en Sets information to touch.
   * !#zh 设置触摸相关的信息。用于监控触摸事件。
   * @method setTouchInfo
   * @param {Number} id
   * @param  {Number} x
   * @param  {Number} y
   */
  setTouchInfo: function setTouchInfo(id, x, y) {
    this._prevPoint = this._point;
    this._point = cc.v2(x || 0, y || 0);
    this._id = id;

    if (!this._startPointCaptured) {
      this._startPoint = cc.v2(this._point);

      cc.view._convertPointWithScale(this._startPoint);

      this._startPointCaptured = true;
    }
  },
  _setPoint: function _setPoint(x, y) {
    if (y === undefined) {
      this._point.x = x.x;
      this._point.y = x.y;
    } else {
      this._point.x = x;
      this._point.y = y;
    }
  },
  _setPrevPoint: function _setPrevPoint(x, y) {
    if (y === undefined) this._prevPoint = cc.v2(x.x, x.y);else this._prevPoint = cc.v2(x || 0, y || 0);
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2V2ZW50LW1hbmFnZXIvQ0NUb3VjaC5qcyJdLCJuYW1lcyI6WyJjYyIsIlRvdWNoIiwieCIsInkiLCJpZCIsIl9sYXN0TW9kaWZpZWQiLCJzZXRUb3VjaEluZm8iLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsImdldExvY2F0aW9uIiwidjIiLCJfcG9pbnQiLCJnZXRMb2NhdGlvblgiLCJnZXRMb2NhdGlvblkiLCJnZXRQcmV2aW91c0xvY2F0aW9uIiwiX3ByZXZQb2ludCIsImdldFN0YXJ0TG9jYXRpb24iLCJfc3RhcnRQb2ludCIsImdldERlbHRhIiwic3ViIiwiZ2V0TG9jYXRpb25JblZpZXciLCJ2aWV3IiwiX2Rlc2lnblJlc29sdXRpb25TaXplIiwiaGVpZ2h0IiwiZ2V0UHJldmlvdXNMb2NhdGlvbkluVmlldyIsImdldFN0YXJ0TG9jYXRpb25JblZpZXciLCJnZXRJRCIsIl9pZCIsIl9zdGFydFBvaW50Q2FwdHVyZWQiLCJfY29udmVydFBvaW50V2l0aFNjYWxlIiwiX3NldFBvaW50IiwidW5kZWZpbmVkIiwiX3NldFByZXZQb2ludCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7Ozs7Ozs7O0FBU0FBLEVBQUUsQ0FBQ0MsS0FBSCxHQUFXLFVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQkMsRUFBaEIsRUFBb0I7QUFDM0IsT0FBS0MsYUFBTCxHQUFxQixDQUFyQjtBQUNBLE9BQUtDLFlBQUwsQ0FBa0JGLEVBQWxCLEVBQXNCRixDQUF0QixFQUF5QkMsQ0FBekI7QUFDSCxDQUhEOztBQUlBSCxFQUFFLENBQUNDLEtBQUgsQ0FBU00sU0FBVCxHQUFxQjtBQUNqQkMsRUFBQUEsV0FBVyxFQUFFUixFQUFFLENBQUNDLEtBREM7O0FBRWpCOzs7Ozs7QUFNQVEsRUFBQUEsV0FBVyxFQUFDLHVCQUFZO0FBQ3BCLFdBQU9ULEVBQUUsQ0FBQ1Us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QUFaLEVBQWM7QUFDckIsUUFBR0EsQ0FBQyxLQUFLNEIsU0FBVCxFQUFtQjtBQUNmLFdBQUtwQixNQUFMLENBQVlULENBQVosR0FBZ0JBLENBQUMsQ0FBQ0EsQ0FBbEI7QUFDQSxXQUFLUyxNQUFMLENBQVlSLENBQVosR0FBZ0JELENBQUMsQ0FBQ0MsQ0FBbEI7QUFDSCxLQUhELE1BR0s7QUFDRCxXQUFLUSxNQUFMLENBQVlULENBQVosR0FBZ0JBLENBQWhCO0FBQ0EsV0FBS1MsTUFBTCxDQUFZUixDQUFaLEdBQWdCQSxDQUFoQjtBQUNIO0FBQ0osR0FqSWdCO0FBbUlqQjZCLEVBQUFBLGFBQWEsRUFBQyx1QkFBVTlCLENBQVYsRUFBYUMsQ0FBYixFQUFnQjtBQUMxQixRQUFHQSxDQUFDLEtBQUs0QixTQUFULEVBQ0ksS0FBS2hCLFVBQUwsR0FBa0JmLEVBQUUsQ0FBQ1UsRUFBSCxDQUFNUixDQUFDLENBQUNBLENBQVIsRUFBV0EsQ0FBQyxDQUFDQyxDQUFiLENBQWxCLENBREosS0FHSSxLQUFLWSxVQUFMLEdBQWtCZixFQUFFLENBQUNVLEVBQUgsQ0FBTVIsQ0FBQyxJQUFJLENBQVgsRUFBY0MsQ0FBQyxJQUFJLENBQW5CLENBQWxCO0FBQ1A7QUF4SWdCLENBQXJCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKipcbiAqICEjZW4gVGhlIHRvdWNoIGV2ZW50IGNsYXNzXG4gKiAhI3poIOWwgeijheS6huinpuaRuOebuOWFs+eahOS/oeaBr+OAglxuICogQGNsYXNzIFRvdWNoXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gKiBAcGFyYW0ge051bWJlcn0gaWRcbiAqL1xuY2MuVG91Y2ggPSBmdW5jdGlvbiAoeCwgeSwgaWQpIHtcbiAgICB0aGlzLl9sYXN0TW9kaWZpZWQgPSAwO1xuICAgIHRoaXMuc2V0VG91Y2hJbmZvKGlkLCB4LCB5KTtcbn07XG5jYy5Ub3VjaC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IGNjLlRvdWNoLFxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgY3VycmVudCB0b3VjaCBsb2NhdGlvbiBpbiBPcGVuR0wgY29vcmRpbmF0ZXMu44CBXG4gICAgICogISN6aCDojrflj5blvZPliY3op6bngrnkvY3nva7jgIJcbiAgICAgKiBAbWV0aG9kIGdldExvY2F0aW9uXG4gICAgICogQHJldHVybiB7VmVjMn1cbiAgICAgKi9cbiAgICBnZXRMb2NhdGlvbjpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjYy52Mih0aGlzLl9wb2ludC54LCB0aGlzLl9wb2ludC55KTtcbiAgICB9LFxuXG5cdC8qKlxuXHQgKiAhI2VuIFJldHVybnMgWCBheGlzIGxvY2F0aW9uIHZhbHVlLlxuICAgICAqICEjemgg6I635Y+W5b2T5YmN6Kem54K5IFgg6L205L2N572u44CCXG4gICAgICogQG1ldGhvZCBnZXRMb2NhdGlvblhcblx0ICogQHJldHVybnMge051bWJlcn1cblx0ICovXG5cdGdldExvY2F0aW9uWDogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9wb2ludC54O1xuXHR9LFxuXG5cdC8qKlxuICAgICAqICEjZW4gUmV0dXJucyBZIGF4aXMgbG9jYXRpb24gdmFsdWUuXG4gICAgICogISN6aCDojrflj5blvZPliY3op6bngrkgWSDovbTkvY3nva7jgIJcbiAgICAgKiBAbWV0aG9kIGdldExvY2F0aW9uWVxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfVxuXHQgKi9cblx0Z2V0TG9jYXRpb25ZOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3BvaW50Lnk7XG5cdH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIHByZXZpb3VzIHRvdWNoIGxvY2F0aW9uIGluIE9wZW5HTCBjb29yZGluYXRlcy5cbiAgICAgKiAhI3poIOiOt+WPluinpueCueWcqOS4iuS4gOasoeS6i+S7tuaXtueahOS9jee9ruWvueixoe+8jOWvueixoeWMheWQqyB4IOWSjCB5IOWxnuaAp+OAglxuICAgICAqIEBtZXRob2QgZ2V0UHJldmlvdXNMb2NhdGlvblxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICovXG4gICAgZ2V0UHJldmlvdXNMb2NhdGlvbjpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjYy52Mih0aGlzLl9wcmV2UG9pbnQueCwgdGhpcy5fcHJldlBvaW50LnkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIHN0YXJ0IHRvdWNoIGxvY2F0aW9uIGluIE9wZW5HTCBjb29yZGluYXRlcy5cbiAgICAgKiAhI3poIOiOt+WPluinpueCueiQveS4i+aXtueahOS9jee9ruWvueixoe+8jOWvueixoeWMheWQqyB4IOWSjCB5IOWxnuaAp+OAglxuICAgICAqIEBtZXRob2QgZ2V0U3RhcnRMb2NhdGlvblxuICAgICAqIEByZXR1cm5zIHtWZWMyfVxuICAgICAqL1xuICAgIGdldFN0YXJ0TG9jYXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gY2MudjIodGhpcy5fc3RhcnRQb2ludC54LCB0aGlzLl9zdGFydFBvaW50LnkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIGRlbHRhIGRpc3RhbmNlIGZyb20gdGhlIHByZXZpb3VzIHRvdWNoZSB0byB0aGUgY3VycmVudCBvbmUgaW4gc2NyZWVuIGNvb3JkaW5hdGVzLlxuICAgICAqICEjemgg6I635Y+W6Kem54K56Led56a75LiK5LiA5qyh5LqL5Lu256e75Yqo55qE6Led56a75a+56LGh77yM5a+56LGh5YyF5ZCrIHgg5ZKMIHkg5bGe5oCn44CCXG4gICAgICogQG1ldGhvZCBnZXREZWx0YVxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICovXG4gICAgZ2V0RGVsdGE6ZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnQuc3ViKHRoaXMuX3ByZXZQb2ludCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgY3VycmVudCB0b3VjaCBsb2NhdGlvbiBpbiBzY3JlZW4gY29vcmRpbmF0ZXMuXG4gICAgICogISN6aCDojrflj5blvZPliY3kuovku7blnKjmuLjmiI/nqpflj6PlhoXnmoTlnZDmoIfkvY3nva7lr7nosaHvvIzlr7nosaHljIXlkKsgeCDlkowgeSDlsZ7mgKfjgIJcbiAgICAgKiBAbWV0aG9kIGdldExvY2F0aW9uSW5WaWV3XG4gICAgICogQHJldHVybiB7VmVjMn1cbiAgICAgKi9cbiAgICBnZXRMb2NhdGlvbkluVmlldzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBjYy52Mih0aGlzLl9wb2ludC54LCBjYy52aWV3Ll9kZXNpZ25SZXNvbHV0aW9uU2l6ZS5oZWlnaHQgLSB0aGlzLl9wb2ludC55KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBwcmV2aW91cyB0b3VjaCBsb2NhdGlvbiBpbiBzY3JlZW4gY29vcmRpbmF0ZXMuXG4gICAgICogISN6aCDojrflj5bop6bngrnlnKjkuIrkuIDmrKHkuovku7bml7blnKjmuLjmiI/nqpflj6PkuK3nmoTkvY3nva7lr7nosaHvvIzlr7nosaHljIXlkKsgeCDlkowgeSDlsZ7mgKfjgIJcbiAgICAgKiBAbWV0aG9kIGdldFByZXZpb3VzTG9jYXRpb25JblZpZXdcbiAgICAgKiBAcmV0dXJuIHtWZWMyfVxuICAgICAqL1xuICAgIGdldFByZXZpb3VzTG9jYXRpb25JblZpZXc6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBjYy52Mih0aGlzLl9wcmV2UG9pbnQueCwgY2Mudmlldy5fZGVzaWduUmVzb2x1dGlvblNpemUuaGVpZ2h0IC0gdGhpcy5fcHJldlBvaW50LnkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIHN0YXJ0IHRvdWNoIGxvY2F0aW9uIGluIHNjcmVlbiBjb29yZGluYXRlcy5cbiAgICAgKiAhI3poIOiOt+WPluinpueCueiQveS4i+aXtuWcqOa4uOaIj+eql+WPo+S4reeahOS9jee9ruWvueixoe+8jOWvueixoeWMheWQqyB4IOWSjCB5IOWxnuaAp+OAglxuICAgICAqIEBtZXRob2QgZ2V0U3RhcnRMb2NhdGlvbkluVmlld1xuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICovXG4gICAgZ2V0U3RhcnRMb2NhdGlvbkluVmlldzogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMuX3N0YXJ0UG9pbnQueCwgY2Mudmlldy5fZGVzaWduUmVzb2x1dGlvblNpemUuaGVpZ2h0IC0gdGhpcy5fc3RhcnRQb2ludC55KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBpZCBvZiBjYy5Ub3VjaC5cbiAgICAgKiAhI3poIOinpueCueeahOagh+ivhiBJRO+8jOWPr+S7peeUqOadpeWcqOWkmueCueinpuaRuOS4rei3n+i4quinpueCueOAglxuICAgICAqIEBtZXRob2QgZ2V0SURcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0SUQ6ZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0cyBpbmZvcm1hdGlvbiB0byB0b3VjaC5cbiAgICAgKiAhI3poIOiuvue9ruinpuaRuOebuOWFs+eahOS/oeaBr+OAgueUqOS6juebkeaOp+inpuaRuOS6i+S7tuOAglxuICAgICAqIEBtZXRob2Qgc2V0VG91Y2hJbmZvXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGlkXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB4XG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB5XG4gICAgICovXG4gICAgc2V0VG91Y2hJbmZvOmZ1bmN0aW9uIChpZCwgeCwgeSkge1xuICAgICAgICB0aGlzLl9wcmV2UG9pbnQgPSB0aGlzLl9wb2ludDtcbiAgICAgICAgdGhpcy5fcG9pbnQgPSBjYy52Mih4IHx8IDAsIHkgfHwgMCk7XG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XG4gICAgICAgIGlmKCF0aGlzLl9zdGFydFBvaW50Q2FwdHVyZWQpe1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRQb2ludCA9IGNjLnYyKHRoaXMuX3BvaW50KTtcbiAgICAgICAgICAgIGNjLnZpZXcuX2NvbnZlcnRQb2ludFdpdGhTY2FsZSh0aGlzLl9zdGFydFBvaW50KTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0UG9pbnRDYXB0dXJlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3NldFBvaW50OiBmdW5jdGlvbih4LCB5KXtcbiAgICAgICAgaWYoeSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHRoaXMuX3BvaW50LnggPSB4Lng7XG4gICAgICAgICAgICB0aGlzLl9wb2ludC55ID0geC55O1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuX3BvaW50LnggPSB4O1xuICAgICAgICAgICAgdGhpcy5fcG9pbnQueSA9IHk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3NldFByZXZQb2ludDpmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICBpZih5ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aGlzLl9wcmV2UG9pbnQgPSBjYy52Mih4LngsIHgueSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX3ByZXZQb2ludCA9IGNjLnYyKHggfHwgMCwgeSB8fCAwKTtcbiAgICB9XG59OyJdLCJzb3VyY2VSb290IjoiLyJ9