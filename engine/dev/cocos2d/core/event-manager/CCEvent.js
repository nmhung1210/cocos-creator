
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/event-manager/CCEvent.js';
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
var js = cc.js;

require('../event/event');
/**
 * !#en The mouse event
 * !#zh 鼠标事件类型
 * @class Event.EventMouse
 *
 * @extends Event
 * @param {Number} eventType - The mouse event type, UP, DOWN, MOVE, CANCELED
 * @param {Boolean} [bubbles=false] - A boolean indicating whether the event bubbles up through the tree or not
 */


var EventMouse = function EventMouse(eventType, bubbles) {
  cc.Event.call(this, cc.Event.MOUSE, bubbles);
  this._eventType = eventType;
  this._button = 0;
  this._x = 0;
  this._y = 0;
  this._prevX = 0;
  this._prevY = 0;
  this._scrollX = 0;
  this._scrollY = 0;
};

js.extend(EventMouse, cc.Event);
var proto = EventMouse.prototype;
/**
 * !#en Sets scroll data.
 * !#zh 设置鼠标的滚动数据。
 * @method setScrollData
 * @param {Number} scrollX
 * @param {Number} scrollY
 */

proto.setScrollData = function (scrollX, scrollY) {
  this._scrollX = scrollX;
  this._scrollY = scrollY;
};
/**
 * !#en Returns the x axis scroll value.
 * !#zh 获取鼠标滚动的X轴距离，只有滚动时才有效。
 * @method getScrollX
 * @returns {Number}
 */


proto.getScrollX = function () {
  return this._scrollX;
};
/**
 * !#en Returns the y axis scroll value.
 * !#zh 获取滚轮滚动的 Y 轴距离，只有滚动时才有效。
 * @method getScrollY
 * @returns {Number}
 */


proto.getScrollY = function () {
  return this._scrollY;
};
/**
 * !#en Sets cursor location.
 * !#zh 设置当前鼠标位置。
 * @method setLocation
 * @param {Number} x
 * @param {Number} y
 */


proto.setLocation = function (x, y) {
  this._x = x;
  this._y = y;
};
/**
 * !#en Returns cursor location.
 * !#zh 获取鼠标位置对象，对象包含 x 和 y 属性。
 * @method getLocation
 * @return {Vec2} location
 */


proto.getLocation = function () {
  return cc.v2(this._x, this._y);
};
/**
 * !#en Returns the current cursor location in screen coordinates.
 * !#zh 获取当前事件在游戏窗口内的坐标位置对象，对象包含 x 和 y 属性。
 * @method getLocationInView
 * @return {Vec2}
 */


proto.getLocationInView = function () {
  return cc.v2(this._x, cc.view._designResolutionSize.height - this._y);
};

proto._setPrevCursor = function (x, y) {
  this._prevX = x;
  this._prevY = y;
};
/**
 * !#en Returns the previous touch location.
 * !#zh 获取鼠标点击在上一次事件时的位置对象，对象包含 x 和 y 属性。
 * @method getPreviousLocation
 * @return {Vec2}
 */


proto.getPreviousLocation = function () {
  return cc.v2(this._prevX, this._prevY);
};
/**
 * !#en Returns the delta distance from the previous location to current location.
 * !#zh 获取鼠标距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
 * @method getDelta
 * @return {Vec2}
 */


proto.getDelta = function () {
  return cc.v2(this._x - this._prevX, this._y - this._prevY);
};
/**
 * !#en Returns the X axis delta distance from the previous location to current location.
 * !#zh 获取鼠标距离上一次事件移动的 X 轴距离。
 * @method getDeltaX
 * @return {Number}
 */


proto.getDeltaX = function () {
  return this._x - this._prevX;
};
/**
 * !#en Returns the Y axis delta distance from the previous location to current location.
 * !#zh 获取鼠标距离上一次事件移动的 Y 轴距离。
 * @method getDeltaY
 * @return {Number}
 */


proto.getDeltaY = function () {
  return this._y - this._prevY;
};
/**
 * !#en Sets mouse button.
 * !#zh 设置鼠标按键。
 * @method setButton
 * @param {Number} button
 */


proto.setButton = function (button) {
  this._button = button;
};
/**
 * !#en Returns mouse button.
 * !#zh 获取鼠标按键。
 * @method getButton
 * @returns {Number}
 */


proto.getButton = function () {
  return this._button;
};
/**
 * !#en Returns location X axis data.
 * !#zh 获取鼠标当前位置 X 轴。
 * @method getLocationX
 * @returns {Number}
 */


proto.getLocationX = function () {
  return this._x;
};
/**
 * !#en Returns location Y axis data.
 * !#zh 获取鼠标当前位置 Y 轴。
 * @method getLocationY
 * @returns {Number}
 */


proto.getLocationY = function () {
  return this._y;
}; //Inner event types of MouseEvent

/**
 * !#en The none event code of mouse event.
 * !#zh 无。
 * @property NONE
 * @static
 * @type {Number}
 */


EventMouse.NONE = 0;
/**
 * !#en The event type code of mouse down event.
 * !#zh 鼠标按下事件。
 * @property DOWN
 * @static
 * @type {Number}
 */

EventMouse.DOWN = 1;
/**
 * !#en The event type code of mouse up event.
 * !#zh 鼠标按下后释放事件。
 * @property UP
 * @static
 * @type {Number}
 */

EventMouse.UP = 2;
/**
 * !#en The event type code of mouse move event.
 * !#zh 鼠标移动事件。
 * @property MOVE
 * @static
 * @type {Number}
 */

EventMouse.MOVE = 3;
/**
 * !#en The event type code of mouse scroll event.
 * !#zh 鼠标滚轮事件。
 * @property SCROLL
 * @static
 * @type {Number}
 */

EventMouse.SCROLL = 4;
/**
 * !#en The tag of Mouse left button.
 * !#zh 鼠标左键的标签。
 * @property BUTTON_LEFT
 * @static
 * @type {Number}
 */

EventMouse.BUTTON_LEFT = 0;
/**
 * !#en The tag of Mouse right button  (The right button number is 2 on browser).
 * !#zh 鼠标右键的标签。
 * @property BUTTON_RIGHT
 * @static
 * @type {Number}
 */

EventMouse.BUTTON_RIGHT = 2;
/**
 * !#en The tag of Mouse middle button  (The right button number is 1 on browser).
 * !#zh 鼠标中键的标签。
 * @property BUTTON_MIDDLE
 * @static
 * @type {Number}
 */

EventMouse.BUTTON_MIDDLE = 1;
/**
 * !#en The tag of Mouse button 4.
 * !#zh 鼠标按键 4 的标签。
 * @property BUTTON_4
 * @static
 * @type {Number}
 */

EventMouse.BUTTON_4 = 3;
/**
 * !#en The tag of Mouse button 5.
 * !#zh 鼠标按键 5 的标签。
 * @property BUTTON_5
 * @static
 * @type {Number}
 */

EventMouse.BUTTON_5 = 4;
/**
 * !#en The tag of Mouse button 6.
 * !#zh 鼠标按键 6 的标签。
 * @property BUTTON_6
 * @static
 * @type {Number}
 */

EventMouse.BUTTON_6 = 5;
/**
 * !#en The tag of Mouse button 7.
 * !#zh 鼠标按键 7 的标签。
 * @property BUTTON_7
 * @static
 * @type {Number}
 */

EventMouse.BUTTON_7 = 6;
/**
 * !#en The tag of Mouse button 8.
 * !#zh 鼠标按键 8 的标签。
 * @property BUTTON_8
 * @static
 * @type {Number}
 */

EventMouse.BUTTON_8 = 7;
/**
 * !#en The touch event
 * !#zh 触摸事件
 * @class Event.EventTouch
 * @constructor
 * @extends Event
 */

/**
 * @method constructor
 * @param {Array} touchArr - The array of the touches
 * @param {Boolean} bubbles - A boolean indicating whether the event bubbles up through the tree or not
 */

var EventTouch = function EventTouch(touchArr, bubbles) {
  cc.Event.call(this, cc.Event.TOUCH, bubbles);
  this._eventCode = 0;
  this._touches = touchArr || [];
  /**
   * !#en The current touch object
   * !#zh 当前触点对象
   * @property touch
   * @type {Touch}
   */

  this.touch = null; // Actually duplicated, because of history issue, currentTouch was in the original design, touch was added in creator engine
  // They should point to the same object

  this.currentTouch = null;
};

js.extend(EventTouch, cc.Event);
proto = EventTouch.prototype;
/**
 * !#en Returns event code.
 * !#zh 获取事件类型。
 * @method getEventCode
 * @returns {Number}
 */

proto.getEventCode = function () {
  return this._eventCode;
};
/**
 * !#en Returns touches of event.
 * !#zh 获取触摸点的列表。
 * @method getTouches
 * @returns {Array}
 */


proto.getTouches = function () {
  return this._touches;
};

proto._setEventCode = function (eventCode) {
  this._eventCode = eventCode;
};

proto._setTouches = function (touches) {
  this._touches = touches;
};
/**
 * !#en Sets touch location.
 * !#zh 设置当前触点位置
 * @method setLocation
 * @param {Number} x
 * @param {Number} y
 */


proto.setLocation = function (x, y) {
  this.touch && this.touch.setTouchInfo(this.touch.getID(), x, y);
};
/**
 * !#en Returns touch location.
 * !#zh 获取触点位置。
 * @method getLocation
 * @return {Vec2} location
 */


proto.getLocation = function () {
  return this.touch ? this.touch.getLocation() : cc.v2();
};
/**
 * !#en Returns the current touch location in screen coordinates.
 * !#zh 获取当前触点在游戏窗口中的位置。
 * @method getLocationInView
 * @return {Vec2}
 */


proto.getLocationInView = function () {
  return this.touch ? this.touch.getLocationInView() : cc.v2();
};
/**
 * !#en Returns the previous touch location.
 * !#zh 获取触点在上一次事件时的位置对象，对象包含 x 和 y 属性。
 * @method getPreviousLocation
 * @return {Vec2}
 */


proto.getPreviousLocation = function () {
  return this.touch ? this.touch.getPreviousLocation() : cc.v2();
};
/**
 * !#en Returns the start touch location.
 * !#zh 获取触点落下时的位置对象，对象包含 x 和 y 属性。
 * @method getStartLocation
 * @returns {Vec2}
 */


proto.getStartLocation = function () {
  return this.touch ? this.touch.getStartLocation() : cc.v2();
};
/**
 * !#en Returns the id of cc.Touch.
 * !#zh 触点的标识 ID，可以用来在多点触摸中跟踪触点。
 * @method getID
 * @return {Number}
 */


proto.getID = function () {
  return this.touch ? this.touch.getID() : null;
};
/**
 * !#en Returns the delta distance from the previous location to current location.
 * !#zh 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
 * @method getDelta
 * @return {Vec2}
 */


proto.getDelta = function () {
  return this.touch ? this.touch.getDelta() : cc.v2();
};
/**
 * !#en Returns the X axis delta distance from the previous location to current location.
 * !#zh 获取触点距离上一次事件移动的 x 轴距离。
 * @method getDeltaX
 * @return {Number}
 */


proto.getDeltaX = function () {
  return this.touch ? this.touch.getDelta().x : 0;
};
/**
 * !#en Returns the Y axis delta distance from the previous location to current location.
 * !#zh 获取触点距离上一次事件移动的 y 轴距离。
 * @method getDeltaY
 * @return {Number}
 */


proto.getDeltaY = function () {
  return this.touch ? this.touch.getDelta().y : 0;
};
/**
 * !#en Returns location X axis data.
 * !#zh 获取当前触点 X 轴位置。
 * @method getLocationX
 * @returns {Number}
 */


proto.getLocationX = function () {
  return this.touch ? this.touch.getLocationX() : 0;
};
/**
 * !#en Returns location Y axis data.
 * !#zh 获取当前触点 Y 轴位置。
 * @method getLocationY
 * @returns {Number}
 */


proto.getLocationY = function () {
  return this.touch ? this.touch.getLocationY() : 0;
};
/**
 * !#en The maximum touch numbers
 * !#zh 最大触摸数量。
 * @constant
 * @type {Number}
 */


EventTouch.MAX_TOUCHES = 5;
/**
 * !#en The event type code of touch began event.
 * !#zh 开始触摸事件
 * @constant
 * @type {Number}
 */

EventTouch.BEGAN = 0;
/**
 * !#en The event type code of touch moved event.
 * !#zh 触摸后移动事件
 * @constant
 * @type {Number}
 */

EventTouch.MOVED = 1;
/**
 * !#en The event type code of touch ended event.
 * !#zh 结束触摸事件
 * @constant
 * @type {Number}
 */

EventTouch.ENDED = 2;
/**
 * !#en The event type code of touch cancelled event.
 * !#zh 取消触摸事件
 * @constant
 * @type {Number}
 */

EventTouch.CANCELED = 3;
/**
 * !#en The acceleration event
 * !#zh 加速度事件
 * @class Event.EventAcceleration
 * @extends Event
 *
 * @param {Object} acc - The acceleration
 * @param {Boolean} bubbles - A boolean indicating whether the event bubbles up through the tree or not
 */

var EventAcceleration = function EventAcceleration(acc, bubbles) {
  cc.Event.call(this, cc.Event.ACCELERATION, bubbles);
  this.acc = acc;
};

js.extend(EventAcceleration, cc.Event);
/**
 * !#en The keyboard event
 * !#zh 键盘事件
 * @class Event.EventKeyboard
 * @extends Event
 *
 * @param {Number} keyCode - The key code of which triggered this event
 * @param {Boolean} isPressed - A boolean indicating whether the key have been pressed
 * @param {Boolean} bubbles - A boolean indicating whether the event bubbles up through the tree or not
 */

var EventKeyboard = function EventKeyboard(keyCode, isPressed, bubbles) {
  cc.Event.call(this, cc.Event.KEYBOARD, bubbles);
  /**
   * !#en
   * The keyCode read-only property represents a system and implementation dependent numerical code identifying the unmodified value of the pressed key.
   * This is usually the decimal ASCII (RFC 20) or Windows 1252 code corresponding to the key.
   * If the key can't be identified, this value is 0.
   *
   * !#zh
   * keyCode 是只读属性它表示一个系统和依赖于实现的数字代码，可以识别按键的未修改值。
   * 这通常是十进制 ASCII (RFC20) 或者 Windows 1252 代码，所对应的密钥。
   * 如果无法识别该键，则该值为 0。
   *
   * @property keyCode
   * @type {Number}
   */

  this.keyCode = keyCode;
  this.isPressed = isPressed;
};

js.extend(EventKeyboard, cc.Event);
cc.Event.EventMouse = EventMouse;
cc.Event.EventTouch = EventTouch;
cc.Event.EventAcceleration = EventAcceleration;
cc.Event.EventKeyboard = EventKeyboard;
module.exports = cc.Event;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2V2ZW50LW1hbmFnZXIvQ0NFdmVudC5qcyJdLCJuYW1lcyI6WyJqcyIsImNjIiwicmVxdWlyZSIsIkV2ZW50TW91c2UiLCJldmVudFR5cGUiLCJidWJibGVzIiwiRXZlbnQiLCJjYWxsIiwiTU9VU0UiLCJfZXZlbnRUeXBlIiwiX2J1dHRvbiIsIl94IiwiX3kiLCJfcHJldlgiLCJfcHJldlkiLCJfc2Nyb2xsWCIsIl9zY3JvbGxZIiwiZXh0ZW5kIiwicHJvdG8iLCJwcm90b3R5cGUiLCJzZXRTY3JvbGxEYXRhIiwic2Nyb2xsWCIsInNjcm9sbFkiLCJnZXRTY3JvbGxYIiwiZ2V0U2Nyb2xsWSIsInNldExvY2F0aW9uIiwieCIsInkiLCJnZXRMb2NhdGlvbiIsInYyIiwiZ2V0TG9jYXRpb25JblZpZXciLCJ2aWV3IiwiX2Rlc2lnblJlc29sdXRpb25TaXplIiwiaGVpZ2h0IiwiX3NldFByZXZDdXJzb3IiLCJnZXRQcmV2aW91c0xvY2F0aW9uIiwiZ2V0RGVsdGEiLCJnZXREZWx0YVgiLCJnZXREZWx0YVkiLCJzZXRCdXR0b24iLCJidXR0b24iLCJnZXRCdXR0b24iLCJnZXRMb2NhdGlvblgiLCJnZXRMb2NhdGlvblkiLCJOT05FIiwiRE9XTiIsIlVQIiwiTU9WRSIsIlNDUk9MTCIsIkJVVFRPTl9MRUZUIiwiQlVUVE9OX1JJR0hUIiwiQlVUVE9OX01JRERMRSIsIkJVVFRPTl80IiwiQlVUVE9OXzUiLCJCVVRUT05fNiIsIkJVVFRPTl83IiwiQlVUVE9OXzgiLCJFdmVudFRvdWNoIiwidG91Y2hBcnIiLCJUT1VDSCIsIl9ldmVudENvZGUiLCJfdG91Y2hlcyIsInRvdWNoIiwiY3VycmVudFRvdWNoIiwiZ2V0RXZlbnRDb2RlIiwiZ2V0VG91Y2hlcyIsIl9zZXRFdmVudENvZGUiLCJldmVudENvZGUiLCJfc2V0VG91Y2hlcyIsInRvdWNoZXMiLCJzZXRUb3VjaEluZm8iLCJnZXRJRCIsImdldFN0YXJ0TG9jYXRpb24iLCJNQVhfVE9VQ0hFUyIsIkJFR0FOIiwiTU9WRUQiLCJFTkRFRCIsIkNBTkNFTEVEIiwiRXZlbnRBY2NlbGVyYXRpb24iLCJhY2MiLCJBQ0NFTEVSQVRJT04iLCJFdmVudEtleWJvYXJkIiwia2V5Q29kZSIsImlzUHJlc3NlZCIsIktFWUJPQVJEIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLEVBQUUsR0FBR0MsRUFBRSxDQUFDRCxFQUFaOztBQUVBRSxPQUFPLENBQUMsZ0JBQUQsQ0FBUDtBQUVBOzs7Ozs7Ozs7OztBQVNBLElBQUlDLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQVVDLFNBQVYsRUFBcUJDLE9BQXJCLEVBQThCO0FBQzNDSixFQUFBQSxFQUFFLENBQUNLLEtBQUgsQ0FBU0MsSUFBVCxDQUFjLElBQWQsRUFBb0JOLEVBQUUsQ0FBQ0ssS0FBSCxDQUFTRSxLQUE3QixFQUFvQ0gsT0FBcEM7QUFDQSxPQUFLSSxVQUFMLEdBQWtCTCxTQUFsQjtBQUNBLE9BQUtNLE9BQUwsR0FBZSxDQUFmO0FBQ0EsT0FBS0MsRUFBTCxHQUFVLENBQVY7QUFDQSxPQUFLQyxFQUFMLEdBQVUsQ0FBVjtBQUNBLE9BQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsT0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxPQUFLQyxRQUFMLEdBQWdCLENBQWhCO0FBQ0EsT0FBS0MsUUFBTCxHQUFnQixDQUFoQjtBQUNILENBVkQ7O0FBWUFoQixFQUFFLENBQUNpQixNQUFILENBQVVkLFVBQVYsRUFBc0JGLEVBQUUsQ0FBQ0ssS0FBekI7QUFDQSxJQUFJWSxLQUFLLEdBQUdmLFVBQVUsQ0FBQ2dCLFNBQXZCO0FBRUE7Ozs7Ozs7O0FBT0FELEtBQUssQ0FBQ0UsYUFBTixHQUFzQixVQUFVQyxPQUFWLEVBQW1CQyxPQUFuQixFQUE0QjtBQUM5QyxPQUFLUCxRQUFMLEdBQWdCTSxPQUFoQjtBQUNBLE9BQUtMLFFBQUwsR0FB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O0FBQ0FGLEVBQUUsQ0FBQ0ssS0FBSCxDQUFTbUQsVUFBVCxHQUFzQkEsVUFBdEI7QUFDQXhELEVBQUUsQ0FBQ0ssS0FBSCxDQUFTd0UsaUJBQVQsR0FBNkJBLGlCQUE3QjtBQUNBN0UsRUFBRSxDQUFDSyxLQUFILENBQVMyRSxhQUFULEdBQXlCQSxhQUF6QjtBQUVBSSxNQUFNLENBQUNDLE9BQVAsR0FBaUJyRixFQUFFLENBQUNLLEtBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBqcyA9IGNjLmpzO1xuXG5yZXF1aXJlKCcuLi9ldmVudC9ldmVudCcpO1xuXG4vKipcbiAqICEjZW4gVGhlIG1vdXNlIGV2ZW50XG4gKiAhI3poIOm8oOagh+S6i+S7tuexu+Wei1xuICogQGNsYXNzIEV2ZW50LkV2ZW50TW91c2VcbiAqXG4gKiBAZXh0ZW5kcyBFdmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IGV2ZW50VHlwZSAtIFRoZSBtb3VzZSBldmVudCB0eXBlLCBVUCwgRE9XTiwgTU9WRSwgQ0FOQ0VMRURcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2J1YmJsZXM9ZmFsc2VdIC0gQSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGUgZXZlbnQgYnViYmxlcyB1cCB0aHJvdWdoIHRoZSB0cmVlIG9yIG5vdFxuICovXG52YXIgRXZlbnRNb3VzZSA9IGZ1bmN0aW9uIChldmVudFR5cGUsIGJ1YmJsZXMpIHtcbiAgICBjYy5FdmVudC5jYWxsKHRoaXMsIGNjLkV2ZW50Lk1PVVNFLCBidWJibGVzKTtcbiAgICB0aGlzLl9ldmVudFR5cGUgPSBldmVudFR5cGU7XG4gICAgdGhpcy5fYnV0dG9uID0gMDtcbiAgICB0aGlzLl94ID0gMDtcbiAgICB0aGlzLl95ID0gMDtcbiAgICB0aGlzLl9wcmV2WCA9IDA7XG4gICAgdGhpcy5fcHJldlkgPSAwO1xuICAgIHRoaXMuX3Njcm9sbFggPSAwO1xuICAgIHRoaXMuX3Njcm9sbFkgPSAwO1xufTtcblxuanMuZXh0ZW5kKEV2ZW50TW91c2UsIGNjLkV2ZW50KTtcbnZhciBwcm90byA9IEV2ZW50TW91c2UucHJvdG90eXBlO1xuXG4vKipcbiAqICEjZW4gU2V0cyBzY3JvbGwgZGF0YS5cbiAqICEjemgg6K6+572u6byg5qCH55qE5rua5Yqo5pWw5o2u44CCXG4gKiBAbWV0aG9kIHNldFNjcm9sbERhdGFcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY3JvbGxYXG4gKiBAcGFyYW0ge051bWJlcn0gc2Nyb2xsWVxuICovXG5wcm90by5zZXRTY3JvbGxEYXRhID0gZnVuY3Rpb24gKHNjcm9sbFgsIHNjcm9sbFkpIHtcbiAgICB0aGlzLl9zY3JvbGxYID0gc2Nyb2xsWDtcbiAgICB0aGlzLl9zY3JvbGxZID0gc2Nyb2xsWTtcbn07XG5cbi8qKlxuICogISNlbiBSZXR1cm5zIHRoZSB4IGF4aXMgc2Nyb2xsIHZhbHVlLlxuICogISN6aCDojrflj5bpvKDmoIfmu5rliqjnmoRY6L206Led56a777yM5Y+q5pyJ5rua5Yqo5pe25omN5pyJ5pWI44CCXG4gKiBAbWV0aG9kIGdldFNjcm9sbFhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbnByb3RvLmdldFNjcm9sbFggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbFg7XG59O1xuXG4vKipcbiAqICEjZW4gUmV0dXJucyB0aGUgeSBheGlzIHNjcm9sbCB2YWx1ZS5cbiAqICEjemgg6I635Y+W5rua6L2u5rua5Yqo55qEIFkg6L206Led56a777yM5Y+q5pyJ5rua5Yqo5pe25omN5pyJ5pWI44CCXG4gKiBAbWV0aG9kIGdldFNjcm9sbFlcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbnByb3RvLmdldFNjcm9sbFkgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbFk7XG59O1xuXG4vKipcbiAqICEjZW4gU2V0cyBjdXJzb3IgbG9jYXRpb24uXG4gKiAhI3poIOiuvue9ruW9k+WJjem8oOagh+S9jee9ruOAglxuICogQG1ldGhvZCBzZXRMb2NhdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gKi9cbnByb3RvLnNldExvY2F0aW9uID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICB0aGlzLl94ID0geDtcbiAgICB0aGlzLl95ID0geTtcbn07XG5cbi8qKlxuICogISNlbiBSZXR1cm5zIGN1cnNvciBsb2NhdGlvbi5cbiAqICEjemgg6I635Y+W6byg5qCH5L2N572u5a+56LGh77yM5a+56LGh5YyF5ZCrIHgg5ZKMIHkg5bGe5oCn44CCXG4gKiBAbWV0aG9kIGdldExvY2F0aW9uXG4gKiBAcmV0dXJuIHtWZWMyfSBsb2NhdGlvblxuICovXG5wcm90by5nZXRMb2NhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY2MudjIodGhpcy5feCwgdGhpcy5feSk7XG59O1xuXG4vKipcbiAqICEjZW4gUmV0dXJucyB0aGUgY3VycmVudCBjdXJzb3IgbG9jYXRpb24gaW4gc2NyZWVuIGNvb3JkaW5hdGVzLlxuICogISN6aCDojrflj5blvZPliY3kuovku7blnKjmuLjmiI/nqpflj6PlhoXnmoTlnZDmoIfkvY3nva7lr7nosaHvvIzlr7nosaHljIXlkKsgeCDlkowgeSDlsZ7mgKfjgIJcbiAqIEBtZXRob2QgZ2V0TG9jYXRpb25JblZpZXdcbiAqIEByZXR1cm4ge1ZlYzJ9XG4gKi9cbnByb3RvLmdldExvY2F0aW9uSW5WaWV3ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNjLnYyKHRoaXMuX3gsIGNjLnZpZXcuX2Rlc2lnblJlc29sdXRpb25TaXplLmhlaWdodCAtIHRoaXMuX3kpO1xufTtcblxucHJvdG8uX3NldFByZXZDdXJzb3IgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHRoaXMuX3ByZXZYID0geDtcbiAgICB0aGlzLl9wcmV2WSA9IHk7XG59O1xuXG4vKipcbiAqICEjZW4gUmV0dXJucyB0aGUgcHJldmlvdXMgdG91Y2ggbG9jYXRpb24uXG4gKiAhI3poIOiOt+WPlum8oOagh+eCueWHu+WcqOS4iuS4gOasoeS6i+S7tuaXtueahOS9jee9ruWvueixoe+8jOWvueixoeWMheWQqyB4IOWSjCB5IOWxnuaAp+OAglxuICogQG1ldGhvZCBnZXRQcmV2aW91c0xvY2F0aW9uXG4gKiBAcmV0dXJuIHtWZWMyfVxuICovXG5wcm90by5nZXRQcmV2aW91c0xvY2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjYy52Mih0aGlzLl9wcmV2WCwgdGhpcy5fcHJldlkpO1xufTtcblxuLyoqXG4gKiAhI2VuIFJldHVybnMgdGhlIGRlbHRhIGRpc3RhbmNlIGZyb20gdGhlIHByZXZpb3VzIGxvY2F0aW9uIHRvIGN1cnJlbnQgbG9jYXRpb24uXG4gKiAhI3poIOiOt+WPlum8oOagh+i3neemu+S4iuS4gOasoeS6i+S7tuenu+WKqOeahOi3neemu+Wvueixoe+8jOWvueixoeWMheWQqyB4IOWSjCB5IOWxnuaAp+OAglxuICogQG1ldGhvZCBnZXREZWx0YVxuICogQHJldHVybiB7VmVjMn1cbiAqL1xucHJvdG8uZ2V0RGVsdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNjLnYyKHRoaXMuX3ggLSB0aGlzLl9wcmV2WCwgdGhpcy5feSAtIHRoaXMuX3ByZXZZKTtcbn07XG5cbi8qKlxuICogISNlbiBSZXR1cm5zIHRoZSBYIGF4aXMgZGVsdGEgZGlzdGFuY2UgZnJvbSB0aGUgcHJldmlvdXMgbG9jYXRpb24gdG8gY3VycmVudCBsb2NhdGlvbi5cbiAqICEjemgg6I635Y+W6byg5qCH6Led56a75LiK5LiA5qyh5LqL5Lu256e75Yqo55qEIFgg6L206Led56a744CCXG4gKiBAbWV0aG9kIGdldERlbHRhWFxuICogQHJldHVybiB7TnVtYmVyfVxuICovXG5wcm90by5nZXREZWx0YVggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ggLSB0aGlzLl9wcmV2WDtcbn07XG5cbi8qKlxuICogISNlbiBSZXR1cm5zIHRoZSBZIGF4aXMgZGVsdGEgZGlzdGFuY2UgZnJvbSB0aGUgcHJldmlvdXMgbG9jYXRpb24gdG8gY3VycmVudCBsb2NhdGlvbi5cbiAqICEjemgg6I635Y+W6byg5qCH6Led56a75LiK5LiA5qyh5LqL5Lu256e75Yqo55qEIFkg6L206Led56a744CCXG4gKiBAbWV0aG9kIGdldERlbHRhWVxuICogQHJldHVybiB7TnVtYmVyfVxuICovXG5wcm90by5nZXREZWx0YVkgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3kgLSB0aGlzLl9wcmV2WTtcbn07XG5cbi8qKlxuICogISNlbiBTZXRzIG1vdXNlIGJ1dHRvbi5cbiAqICEjemgg6K6+572u6byg5qCH5oyJ6ZSu44CCXG4gKiBAbWV0aG9kIHNldEJ1dHRvblxuICogQHBhcmFtIHtOdW1iZXJ9IGJ1dHRvblxuICovXG5wcm90by5zZXRCdXR0b24gPSBmdW5jdGlvbiAoYnV0dG9uKSB7XG4gICAgdGhpcy5fYnV0dG9uID0gYnV0dG9uO1xufTtcblxuLyoqXG4gKiAhI2VuIFJldHVybnMgbW91c2UgYnV0dG9uLlxuICogISN6aCDojrflj5bpvKDmoIfmjInplK7jgIJcbiAqIEBtZXRob2QgZ2V0QnV0dG9uXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICovXG5wcm90by5nZXRCdXR0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2J1dHRvbjtcbn07XG5cbi8qKlxuICogISNlbiBSZXR1cm5zIGxvY2F0aW9uIFggYXhpcyBkYXRhLlxuICogISN6aCDojrflj5bpvKDmoIflvZPliY3kvY3nva4gWCDovbTjgIJcbiAqIEBtZXRob2QgZ2V0TG9jYXRpb25YXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICovXG5wcm90by5nZXRMb2NhdGlvblggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3g7XG59O1xuXG4vKipcbiAqICEjZW4gUmV0dXJucyBsb2NhdGlvbiBZIGF4aXMgZGF0YS5cbiAqICEjemgg6I635Y+W6byg5qCH5b2T5YmN5L2N572uIFkg6L2044CCXG4gKiBAbWV0aG9kIGdldExvY2F0aW9uWVxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xucHJvdG8uZ2V0TG9jYXRpb25ZID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl95O1xufTtcblxuLy9Jbm5lciBldmVudCB0eXBlcyBvZiBNb3VzZUV2ZW50XG4vKipcbiAqICEjZW4gVGhlIG5vbmUgZXZlbnQgY29kZSBvZiBtb3VzZSBldmVudC5cbiAqICEjemgg5peg44CCXG4gKiBAcHJvcGVydHkgTk9ORVxuICogQHN0YXRpY1xuICogQHR5cGUge051bWJlcn1cbiAqL1xuRXZlbnRNb3VzZS5OT05FID0gMDtcbi8qKlxuICogISNlbiBUaGUgZXZlbnQgdHlwZSBjb2RlIG9mIG1vdXNlIGRvd24gZXZlbnQuXG4gKiAhI3poIOm8oOagh+aMieS4i+S6i+S7tuOAglxuICogQHByb3BlcnR5IERPV05cbiAqIEBzdGF0aWNcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKi9cbkV2ZW50TW91c2UuRE9XTiA9IDE7XG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IHR5cGUgY29kZSBvZiBtb3VzZSB1cCBldmVudC5cbiAqICEjemgg6byg5qCH5oyJ5LiL5ZCO6YeK5pS+5LqL5Lu244CCXG4gKiBAcHJvcGVydHkgVVBcbiAqIEBzdGF0aWNcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKi9cbkV2ZW50TW91c2UuVVAgPSAyO1xuLyoqXG4gKiAhI2VuIFRoZSBldmVudCB0eXBlIGNvZGUgb2YgbW91c2UgbW92ZSBldmVudC5cbiAqICEjemgg6byg5qCH56e75Yqo5LqL5Lu244CCXG4gKiBAcHJvcGVydHkgTU9WRVxuICogQHN0YXRpY1xuICogQHR5cGUge051bWJlcn1cbiAqL1xuRXZlbnRNb3VzZS5NT1ZFID0gMztcbi8qKlxuICogISNlbiBUaGUgZXZlbnQgdHlwZSBjb2RlIG9mIG1vdXNlIHNjcm9sbCBldmVudC5cbiAqICEjemgg6byg5qCH5rua6L2u5LqL5Lu244CCXG4gKiBAcHJvcGVydHkgU0NST0xMXG4gKiBAc3RhdGljXG4gKiBAdHlwZSB7TnVtYmVyfVxuICovXG5FdmVudE1vdXNlLlNDUk9MTCA9IDQ7XG5cbi8qKlxuICogISNlbiBUaGUgdGFnIG9mIE1vdXNlIGxlZnQgYnV0dG9uLlxuICogISN6aCDpvKDmoIflt6bplK7nmoTmoIfnrb7jgIJcbiAqIEBwcm9wZXJ0eSBCVVRUT05fTEVGVFxuICogQHN0YXRpY1xuICogQHR5cGUge051bWJlcn1cbiAqL1xuRXZlbnRNb3VzZS5CVVRUT05fTEVGVCA9IDA7XG5cbi8qKlxuICogISNlbiBUaGUgdGFnIG9mIE1vdXNlIHJpZ2h0IGJ1dHRvbiAgKFRoZSByaWdodCBidXR0b24gbnVtYmVyIGlzIDIgb24gYnJvd3NlcikuXG4gKiAhI3poIOm8oOagh+WPs+mUrueahOagh+etvuOAglxuICogQHByb3BlcnR5IEJVVFRPTl9SSUdIVFxuICogQHN0YXRpY1xuICogQHR5cGUge051bWJlcn1cbiAqL1xuRXZlbnRNb3VzZS5CVVRUT05fUklHSFQgPSAyO1xuXG4vKipcbiAqICEjZW4gVGhlIHRhZyBvZiBNb3VzZSBtaWRkbGUgYnV0dG9uICAoVGhlIHJpZ2h0IGJ1dHRvbiBudW1iZXIgaXMgMSBvbiBicm93c2VyKS5cbiAqICEjemgg6byg5qCH5Lit6ZSu55qE5qCH562+44CCXG4gKiBAcHJvcGVydHkgQlVUVE9OX01JRERMRVxuICogQHN0YXRpY1xuICogQHR5cGUge051bWJlcn1cbiAqL1xuRXZlbnRNb3VzZS5CVVRUT05fTUlERExFID0gMTtcblxuLyoqXG4gKiAhI2VuIFRoZSB0YWcgb2YgTW91c2UgYnV0dG9uIDQuXG4gKiAhI3poIOm8oOagh+aMiemUriA0IOeahOagh+etvuOAglxuICogQHByb3BlcnR5IEJVVFRPTl80XG4gKiBAc3RhdGljXG4gKiBAdHlwZSB7TnVtYmVyfVxuICovXG5FdmVudE1vdXNlLkJVVFRPTl80ID0gMztcblxuLyoqXG4gKiAhI2VuIFRoZSB0YWcgb2YgTW91c2UgYnV0dG9uIDUuXG4gKiAhI3poIOm8oOagh+aMiemUriA1IOeahOagh+etvuOAglxuICogQHByb3BlcnR5IEJVVFRPTl81XG4gKiBAc3RhdGljXG4gKiBAdHlwZSB7TnVtYmVyfVxuICovXG5FdmVudE1vdXNlLkJVVFRPTl81ID0gNDtcblxuLyoqXG4gKiAhI2VuIFRoZSB0YWcgb2YgTW91c2UgYnV0dG9uIDYuXG4gKiAhI3poIOm8oOagh+aMiemUriA2IOeahOagh+etvuOAglxuICogQHByb3BlcnR5IEJVVFRPTl82XG4gKiBAc3RhdGljXG4gKiBAdHlwZSB7TnVtYmVyfVxuICovXG5FdmVudE1vdXNlLkJVVFRPTl82ID0gNTtcblxuLyoqXG4gKiAhI2VuIFRoZSB0YWcgb2YgTW91c2UgYnV0dG9uIDcuXG4gKiAhI3poIOm8oOagh+aMiemUriA3IOeahOagh+etvuOAglxuICogQHByb3BlcnR5IEJVVFRPTl83XG4gKiBAc3RhdGljXG4gKiBAdHlwZSB7TnVtYmVyfVxuICovXG5FdmVudE1vdXNlLkJVVFRPTl83ID0gNjtcblxuLyoqXG4gKiAhI2VuIFRoZSB0YWcgb2YgTW91c2UgYnV0dG9uIDguXG4gKiAhI3poIOm8oOagh+aMiemUriA4IOeahOagh+etvuOAglxuICogQHByb3BlcnR5IEJVVFRPTl84XG4gKiBAc3RhdGljXG4gKiBAdHlwZSB7TnVtYmVyfVxuICovXG5FdmVudE1vdXNlLkJVVFRPTl84ID0gNztcblxuLyoqXG4gKiAhI2VuIFRoZSB0b3VjaCBldmVudFxuICogISN6aCDop6bmkbjkuovku7ZcbiAqIEBjbGFzcyBFdmVudC5FdmVudFRvdWNoXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIEV2ZW50XG4gKi9cbi8qKlxuICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gdG91Y2hBcnIgLSBUaGUgYXJyYXkgb2YgdGhlIHRvdWNoZXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYnViYmxlcyAtIEEgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGV2ZW50IGJ1YmJsZXMgdXAgdGhyb3VnaCB0aGUgdHJlZSBvciBub3RcbiAqL1xudmFyIEV2ZW50VG91Y2ggPSBmdW5jdGlvbiAodG91Y2hBcnIsIGJ1YmJsZXMpIHtcbiAgICBjYy5FdmVudC5jYWxsKHRoaXMsIGNjLkV2ZW50LlRPVUNILCBidWJibGVzKTtcbiAgICB0aGlzLl9ldmVudENvZGUgPSAwO1xuICAgIHRoaXMuX3RvdWNoZXMgPSB0b3VjaEFyciB8fCBbXTtcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBjdXJyZW50IHRvdWNoIG9iamVjdFxuICAgICAqICEjemgg5b2T5YmN6Kem54K55a+56LGhXG4gICAgICogQHByb3BlcnR5IHRvdWNoXG4gICAgICogQHR5cGUge1RvdWNofVxuICAgICAqL1xuICAgIHRoaXMudG91Y2ggPSBudWxsO1xuICAgIC8vIEFjdHVhbGx5IGR1cGxpY2F0ZWQsIGJlY2F1c2Ugb2YgaGlzdG9yeSBpc3N1ZSwgY3VycmVudFRvdWNoIHdhcyBpbiB0aGUgb3JpZ2luYWwgZGVzaWduLCB0b3VjaCB3YXMgYWRkZWQgaW4gY3JlYXRvciBlbmdpbmVcbiAgICAvLyBUaGV5IHNob3VsZCBwb2ludCB0byB0aGUgc2FtZSBvYmplY3RcbiAgICB0aGlzLmN1cnJlbnRUb3VjaCA9IG51bGw7XG59O1xuXG5qcy5leHRlbmQoRXZlbnRUb3VjaCwgY2MuRXZlbnQpO1xucHJvdG8gPSBFdmVudFRvdWNoLnByb3RvdHlwZTtcblxuLyoqXG4gKiAhI2VuIFJldHVybnMgZXZlbnQgY29kZS5cbiAqICEjemgg6I635Y+W5LqL5Lu257G75Z6L44CCXG4gKiBAbWV0aG9kIGdldEV2ZW50Q29kZVxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xucHJvdG8uZ2V0RXZlbnRDb2RlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudENvZGU7XG59O1xuXG4vKipcbiAqICEjZW4gUmV0dXJucyB0b3VjaGVzIG9mIGV2ZW50LlxuICogISN6aCDojrflj5bop6bmkbjngrnnmoTliJfooajjgIJcbiAqIEBtZXRob2QgZ2V0VG91Y2hlc1xuICogQHJldHVybnMge0FycmF5fVxuICovXG5wcm90by5nZXRUb3VjaGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl90b3VjaGVzO1xufTtcblxucHJvdG8uX3NldEV2ZW50Q29kZSA9IGZ1bmN0aW9uIChldmVudENvZGUpIHtcbiAgICB0aGlzLl9ldmVudENvZGUgPSBldmVudENvZGU7XG59O1xuXG5wcm90by5fc2V0VG91Y2hlcyA9IGZ1bmN0aW9uICh0b3VjaGVzKSB7XG4gICAgdGhpcy5fdG91Y2hlcyA9IHRvdWNoZXM7XG59O1xuXG4vKipcbiAqICEjZW4gU2V0cyB0b3VjaCBsb2NhdGlvbi5cbiAqICEjemgg6K6+572u5b2T5YmN6Kem54K55L2N572uXG4gKiBAbWV0aG9kIHNldExvY2F0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0geFxuICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAqL1xucHJvdG8uc2V0TG9jYXRpb24gPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHRoaXMudG91Y2ggJiYgdGhpcy50b3VjaC5zZXRUb3VjaEluZm8odGhpcy50b3VjaC5nZXRJRCgpLCB4LCB5KTtcbn07XG5cbi8qKlxuICogISNlbiBSZXR1cm5zIHRvdWNoIGxvY2F0aW9uLlxuICogISN6aCDojrflj5bop6bngrnkvY3nva7jgIJcbiAqIEBtZXRob2QgZ2V0TG9jYXRpb25cbiAqIEByZXR1cm4ge1ZlYzJ9IGxvY2F0aW9uXG4gKi9cbnByb3RvLmdldExvY2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnRvdWNoID8gdGhpcy50b3VjaC5nZXRMb2NhdGlvbigpIDogY2MudjIoKTtcbn07XG5cbi8qKlxuICogISNlbiBSZXR1cm5zIHRoZSBjdXJyZW50IHRvdWNoIGxvY2F0aW9uIGluIHNjcmVlbiBjb29yZGluYXRlcy5cbiAqICEjemgg6I635Y+W5b2T5YmN6Kem54K55Zyo5ri45oiP56qX5Y+j5Lit55qE5L2N572u44CCXG4gKiBAbWV0aG9kIGdldExvY2F0aW9uSW5WaWV3XG4gKiBAcmV0dXJuIHtWZWMyfVxuICovXG5wcm90by5nZXRMb2NhdGlvbkluVmlldyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRvdWNoID8gdGhpcy50b3VjaC5nZXRMb2NhdGlvbkluVmlldygpIDogY2MudjIoKTtcbn07XG5cbi8qKlxuICogISNlbiBSZXR1cm5zIHRoZSBwcmV2aW91cyB0b3VjaCBsb2NhdGlvbi5cbiAqICEjemgg6I635Y+W6Kem54K55Zyo5LiK5LiA5qyh5LqL5Lu25pe255qE5L2N572u5a+56LGh77yM5a+56LGh5YyF5ZCrIHgg5ZKMIHkg5bGe5oCn44CCXG4gKiBAbWV0aG9kIGdldFByZXZpb3VzTG9jYXRpb25cbiAqIEByZXR1cm4ge1ZlYzJ9XG4gKi9cbnByb3RvLmdldFByZXZpb3VzTG9jYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudG91Y2ggPyB0aGlzLnRvdWNoLmdldFByZXZpb3VzTG9jYXRpb24oKSA6IGNjLnYyKCk7XG59O1xuXG4vKipcbiAqICEjZW4gUmV0dXJucyB0aGUgc3RhcnQgdG91Y2ggbG9jYXRpb24uXG4gKiAhI3poIOiOt+WPluinpueCueiQveS4i+aXtueahOS9jee9ruWvueixoe+8jOWvueixoeWMheWQqyB4IOWSjCB5IOWxnuaAp+OAglxuICogQG1ldGhvZCBnZXRTdGFydExvY2F0aW9uXG4gKiBAcmV0dXJucyB7VmVjMn1cbiAqL1xucHJvdG8uZ2V0U3RhcnRMb2NhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRvdWNoID8gdGhpcy50b3VjaC5nZXRTdGFydExvY2F0aW9uKCkgOiBjYy52MigpO1xufTtcblxuLyoqXG4gKiAhI2VuIFJldHVybnMgdGhlIGlkIG9mIGNjLlRvdWNoLlxuICogISN6aCDop6bngrnnmoTmoIfor4YgSUTvvIzlj6/ku6XnlKjmnaXlnKjlpJrngrnop6bmkbjkuK3ot5/ouKrop6bngrnjgIJcbiAqIEBtZXRob2QgZ2V0SURcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqL1xucHJvdG8uZ2V0SUQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudG91Y2ggPyB0aGlzLnRvdWNoLmdldElEKCkgOiBudWxsO1xufTtcblxuLyoqXG4gKiAhI2VuIFJldHVybnMgdGhlIGRlbHRhIGRpc3RhbmNlIGZyb20gdGhlIHByZXZpb3VzIGxvY2F0aW9uIHRvIGN1cnJlbnQgbG9jYXRpb24uXG4gKiAhI3poIOiOt+WPluinpueCuei3neemu+S4iuS4gOasoeS6i+S7tuenu+WKqOeahOi3neemu+Wvueixoe+8jOWvueixoeWMheWQqyB4IOWSjCB5IOWxnuaAp+OAglxuICogQG1ldGhvZCBnZXREZWx0YVxuICogQHJldHVybiB7VmVjMn1cbiAqL1xucHJvdG8uZ2V0RGVsdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudG91Y2ggPyB0aGlzLnRvdWNoLmdldERlbHRhKCkgOiBjYy52MigpO1xufTtcblxuLyoqXG4gKiAhI2VuIFJldHVybnMgdGhlIFggYXhpcyBkZWx0YSBkaXN0YW5jZSBmcm9tIHRoZSBwcmV2aW91cyBsb2NhdGlvbiB0byBjdXJyZW50IGxvY2F0aW9uLlxuICogISN6aCDojrflj5bop6bngrnot53nprvkuIrkuIDmrKHkuovku7bnp7vliqjnmoQgeCDovbTot53nprvjgIJcbiAqIEBtZXRob2QgZ2V0RGVsdGFYXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cbnByb3RvLmdldERlbHRhWCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy50b3VjaCA/IHRoaXMudG91Y2guZ2V0RGVsdGEoKS54IDogMDtcbn07XG5cbi8qKlxuICogISNlbiBSZXR1cm5zIHRoZSBZIGF4aXMgZGVsdGEgZGlzdGFuY2UgZnJvbSB0aGUgcHJldmlvdXMgbG9jYXRpb24gdG8gY3VycmVudCBsb2NhdGlvbi5cbiAqICEjemgg6I635Y+W6Kem54K56Led56a75LiK5LiA5qyh5LqL5Lu256e75Yqo55qEIHkg6L206Led56a744CCXG4gKiBAbWV0aG9kIGdldERlbHRhWVxuICogQHJldHVybiB7TnVtYmVyfVxuICovXG5wcm90by5nZXREZWx0YVkgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudG91Y2ggPyB0aGlzLnRvdWNoLmdldERlbHRhKCkueSA6IDA7XG59O1xuXG4vKipcbiAqICEjZW4gUmV0dXJucyBsb2NhdGlvbiBYIGF4aXMgZGF0YS5cbiAqICEjemgg6I635Y+W5b2T5YmN6Kem54K5IFgg6L205L2N572u44CCXG4gKiBAbWV0aG9kIGdldExvY2F0aW9uWFxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xucHJvdG8uZ2V0TG9jYXRpb25YID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnRvdWNoID8gdGhpcy50b3VjaC5nZXRMb2NhdGlvblgoKSA6IDA7XG59O1xuXG4vKipcbiAqICEjZW4gUmV0dXJucyBsb2NhdGlvbiBZIGF4aXMgZGF0YS5cbiAqICEjemgg6I635Y+W5b2T5YmN6Kem54K5IFkg6L205L2N572u44CCXG4gKiBAbWV0aG9kIGdldExvY2F0aW9uWVxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xucHJvdG8uZ2V0TG9jYXRpb25ZID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnRvdWNoID8gdGhpcy50b3VjaC5nZXRMb2NhdGlvblkoKSA6IDA7XG59O1xuXG4vKipcbiAqICEjZW4gVGhlIG1heGltdW0gdG91Y2ggbnVtYmVyc1xuICogISN6aCDmnIDlpKfop6bmkbjmlbDph4/jgIJcbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiAqL1xuRXZlbnRUb3VjaC5NQVhfVE9VQ0hFUyA9IDU7XG5cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgdHlwZSBjb2RlIG9mIHRvdWNoIGJlZ2FuIGV2ZW50LlxuICogISN6aCDlvIDlp4vop6bmkbjkuovku7ZcbiAqIEBjb25zdGFudFxuICogQHR5cGUge051bWJlcn1cbiAqL1xuRXZlbnRUb3VjaC5CRUdBTiA9IDA7XG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IHR5cGUgY29kZSBvZiB0b3VjaCBtb3ZlZCBldmVudC5cbiAqICEjemgg6Kem5pG45ZCO56e75Yqo5LqL5Lu2XG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKi9cbkV2ZW50VG91Y2guTU9WRUQgPSAxO1xuLyoqXG4gKiAhI2VuIFRoZSBldmVudCB0eXBlIGNvZGUgb2YgdG91Y2ggZW5kZWQgZXZlbnQuXG4gKiAhI3poIOe7k+adn+inpuaRuOS6i+S7tlxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7TnVtYmVyfVxuICovXG5FdmVudFRvdWNoLkVOREVEID0gMjtcbi8qKlxuICogISNlbiBUaGUgZXZlbnQgdHlwZSBjb2RlIG9mIHRvdWNoIGNhbmNlbGxlZCBldmVudC5cbiAqICEjemgg5Y+W5raI6Kem5pG45LqL5Lu2XG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKi9cbkV2ZW50VG91Y2guQ0FOQ0VMRUQgPSAzO1xuXG4vKipcbiAqICEjZW4gVGhlIGFjY2VsZXJhdGlvbiBldmVudFxuICogISN6aCDliqDpgJ/luqbkuovku7ZcbiAqIEBjbGFzcyBFdmVudC5FdmVudEFjY2VsZXJhdGlvblxuICogQGV4dGVuZHMgRXZlbnRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYWNjIC0gVGhlIGFjY2VsZXJhdGlvblxuICogQHBhcmFtIHtCb29sZWFufSBidWJibGVzIC0gQSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGUgZXZlbnQgYnViYmxlcyB1cCB0aHJvdWdoIHRoZSB0cmVlIG9yIG5vdFxuICovXG52YXIgRXZlbnRBY2NlbGVyYXRpb24gPSBmdW5jdGlvbiAoYWNjLCBidWJibGVzKSB7XG4gICAgY2MuRXZlbnQuY2FsbCh0aGlzLCBjYy5FdmVudC5BQ0NFTEVSQVRJT04sIGJ1YmJsZXMpO1xuICAgIHRoaXMuYWNjID0gYWNjO1xufTtcbmpzLmV4dGVuZChFdmVudEFjY2VsZXJhdGlvbiwgY2MuRXZlbnQpO1xuXG4vKipcbiAqICEjZW4gVGhlIGtleWJvYXJkIGV2ZW50XG4gKiAhI3poIOmUruebmOS6i+S7tlxuICogQGNsYXNzIEV2ZW50LkV2ZW50S2V5Ym9hcmRcbiAqIEBleHRlbmRzIEV2ZW50XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGtleUNvZGUgLSBUaGUga2V5IGNvZGUgb2Ygd2hpY2ggdHJpZ2dlcmVkIHRoaXMgZXZlbnRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNQcmVzc2VkIC0gQSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGUga2V5IGhhdmUgYmVlbiBwcmVzc2VkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGJ1YmJsZXMgLSBBIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBldmVudCBidWJibGVzIHVwIHRocm91Z2ggdGhlIHRyZWUgb3Igbm90XG4gKi9cbnZhciBFdmVudEtleWJvYXJkID0gZnVuY3Rpb24gKGtleUNvZGUsIGlzUHJlc3NlZCwgYnViYmxlcykge1xuICAgIGNjLkV2ZW50LmNhbGwodGhpcywgY2MuRXZlbnQuS0VZQk9BUkQsIGJ1YmJsZXMpO1xuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUaGUga2V5Q29kZSByZWFkLW9ubHkgcHJvcGVydHkgcmVwcmVzZW50cyBhIHN5c3RlbSBhbmQgaW1wbGVtZW50YXRpb24gZGVwZW5kZW50IG51bWVyaWNhbCBjb2RlIGlkZW50aWZ5aW5nIHRoZSB1bm1vZGlmaWVkIHZhbHVlIG9mIHRoZSBwcmVzc2VkIGtleS5cbiAgICAgKiBUaGlzIGlzIHVzdWFsbHkgdGhlIGRlY2ltYWwgQVNDSUkgKFJGQyAyMCkgb3IgV2luZG93cyAxMjUyIGNvZGUgY29ycmVzcG9uZGluZyB0byB0aGUga2V5LlxuICAgICAqIElmIHRoZSBrZXkgY2FuJ3QgYmUgaWRlbnRpZmllZCwgdGhpcyB2YWx1ZSBpcyAwLlxuICAgICAqXG4gICAgICogISN6aFxuICAgICAqIGtleUNvZGUg5piv5Y+q6K+75bGe5oCn5a6D6KGo56S65LiA5Liq57O757uf5ZKM5L6d6LWW5LqO5a6e546w55qE5pWw5a2X5Luj56CB77yM5Y+v5Lul6K+G5Yir5oyJ6ZSu55qE5pyq5L+u5pS55YC844CCXG4gICAgICog6L+Z6YCa5bi45piv5Y2B6L+b5Yi2IEFTQ0lJIChSRkMyMCkg5oiW6ICFIFdpbmRvd3MgMTI1MiDku6PnoIHvvIzmiYDlr7nlupTnmoTlr4bpkqXjgIJcbiAgICAgKiDlpoLmnpzml6Dms5Xor4bliKvor6XplK7vvIzliJnor6XlgLzkuLogMOOAglxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGtleUNvZGVcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMua2V5Q29kZSA9IGtleUNvZGU7XG4gICAgdGhpcy5pc1ByZXNzZWQgPSBpc1ByZXNzZWQ7XG59O1xuanMuZXh0ZW5kKEV2ZW50S2V5Ym9hcmQsIGNjLkV2ZW50KTtcblxuY2MuRXZlbnQuRXZlbnRNb3VzZSA9IEV2ZW50TW91c2U7XG5jYy5FdmVudC5FdmVudFRvdWNoID0gRXZlbnRUb3VjaDtcbmNjLkV2ZW50LkV2ZW50QWNjZWxlcmF0aW9uID0gRXZlbnRBY2NlbGVyYXRpb247XG5jYy5FdmVudC5FdmVudEtleWJvYXJkID0gRXZlbnRLZXlib2FyZDtcblxubW9kdWxlLmV4cG9ydHMgPSBjYy5FdmVudDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9