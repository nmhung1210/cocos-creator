
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCInputManager.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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
var macro = require('./CCMacro');

var sys = require('./CCSys');

var eventManager = require('../event-manager');

var TOUCH_TIMEOUT = macro.TOUCH_TIMEOUT;

var _vec2 = cc.v2();
/**
 *  This class manages all events of input. include: touch, mouse, accelerometer, keyboard
 */


var inputManager = {
  _mousePressed: false,
  _isRegisterEvent: false,
  _preTouchPoint: cc.v2(0, 0),
  _prevMousePoint: cc.v2(0, 0),
  _preTouchPool: [],
  _preTouchPoolPointer: 0,
  _touches: [],
  _touchesIntegerDict: {},
  _indexBitsUsed: 0,
  _maxTouches: 8,
  _accelEnabled: false,
  _accelInterval: 1 / 5,
  _accelMinus: 1,
  _accelCurTime: 0,
  _acceleration: null,
  _accelDeviceEvent: null,
  _canvasBoundingRect: {
    left: 0,
    top: 0,
    adjustedLeft: 0,
    adjustedTop: 0,
    width: 0,
    height: 0
  },
  _getUnUsedIndex: function _getUnUsedIndex() {
    var temp = this._indexBitsUsed;
    var now = cc.sys.now();

    for (var i = 0; i < this._maxTouches; i++) {
      if (!(temp & 0x00000001)) {
        this._indexBitsUsed |= 1 << i;
        return i;
      } else {
        var touch = this._touches[i];

        if (now - touch._lastModified > TOUCH_TIMEOUT) {
          this._removeUsedIndexBit(i);

          delete this._touchesIntegerDict[touch.getID()];
          return i;
        }
      }

      temp >>= 1;
    } // all bits are used


    return -1;
  },
  _removeUsedIndexBit: function _removeUsedIndexBit(index) {
    if (index < 0 || index >= this._maxTouches) return;
    var temp = 1 << index;
    temp = ~temp;
    this._indexBitsUsed &= temp;
  },
  _glView: null,
  _updateCanvasBoundingRect: function _updateCanvasBoundingRect() {
    var element = cc.game.canvas;
    var canvasBoundingRect = this._canvasBoundingRect;
    var docElem = document.documentElement;
    var leftOffset = window.pageXOffset - docElem.clientLeft;
    var topOffset = window.pageYOffset - docElem.clientTop;

    if (element.getBoundingClientRect) {
      var box = element.getBoundingClientRect();
      canvasBoundingRect.left = box.left + leftOffset;
      canvasBoundingRect.top = box.top + topOffset;
      canvasBoundingRect.width = box.width;
      canvasBoundingRect.height = box.height;
    } else if (element instanceof HTMLCanvasElement) {
      canvasBoundingRect.left = leftOffset;
      canvasBoundingRect.top = topOffset;
      canvasBoundingRect.width = element.width;
      canvasBoundingRect.height = element.height;
    } else {
      canvasBoundingRect.left = leftOffset;
      canvasBoundingRect.top = topOffset;
      canvasBoundingRect.width = parseInt(element.style.width);
      canvasBoundingRect.height = parseInt(element.style.height);
    }
  },

  /**
   * @method handleTouchesBegin
   * @param {Array} touches
   */
  handleTouchesBegin: function handleTouchesBegin(touches) {
    var selTouch,
        index,
        curTouch,
        touchID,
        handleTouches = [],
        locTouchIntDict = this._touchesIntegerDict,
        now = sys.now();

    for (var i = 0, len = touches.length; i < len; i++) {
      selTouch = touches[i];
      touchID = selTouch.getID();
      index = locTouchIntDict[touchID];

      if (index == null) {
        var unusedIndex = this._getUnUsedIndex();

        if (unusedIndex === -1) {
          cc.logID(2300, unusedIndex);
          continue;
        } //curTouch = this._touches[unusedIndex] = selTouch;


        curTouch = this._touches[unusedIndex] = new cc.Touch(selTouch._point.x, selTouch._point.y, selTouch.getID());
        curTouch._lastModified = now;

        curTouch._setPrevPoint(selTouch._prevPoint);

        locTouchIntDict[touchID] = unusedIndex;
        handleTouches.push(curTouch);
      }
    }

    if (handleTouches.length > 0) {
      this._glView._convertTouchesWithScale(handleTouches);

      var touchEvent = new cc.Event.EventTouch(handleTouches);
      touchEvent._eventCode = cc.Event.EventTouch.BEGAN;
      eventManager.dispatchEvent(touchEvent);
    }
  },

  /**
   * @method handleTouchesMove
   * @param {Array} touches
   */
  handleTouchesMove: function handleTouchesMove(touches) {
    var selTouch,
        index,
        touchID,
        handleTouches = [],
        locTouches = this._touches,
        now = sys.now();

    for (var i = 0, len = touches.length; i < len; i++) {
      selTouch = touches[i];
      touchID = selTouch.getID();
      index = this._touchesIntegerDict[touchID];

      if (index == null) {
        //cc.log("if the index doesn't exist, it is an error");
        continue;
      }

      if (locTouches[index]) {
        locTouches[index]._setPoint(selTouch._point);

        locTouches[index]._setPrevPoint(selTouch._prevPoint);

        locTouches[index]._lastModified = now;
        handleTouches.push(locTouches[index]);
      }
    }

    if (handleTouches.length > 0) {
      this._glView._convertTouchesWithScale(handleTouches);

      var touchEvent = new cc.Event.EventTouch(handleTouches);
      touchEvent._eventCode = cc.Event.EventTouch.MOVED;
      eventManager.dispatchEvent(touchEvent);
    }
  },

  /**
   * @method handleTouchesEnd
   * @param {Array} touches
   */
  handleTouchesEnd: function handleTouchesEnd(touches) {
    var handleTouches = this.getSetOfTouchesEndOrCancel(touches);

    if (handleTouches.length > 0) {
      this._glView._convertTouchesWithScale(handleTouches);

      var touchEvent = new cc.Event.EventTouch(handleTouches);
      touchEvent._eventCode = cc.Event.EventTouch.ENDED;
      eventManager.dispatchEvent(touchEvent);
    }

    this._preTouchPool.length = 0;
  },

  /**
   * @method handleTouchesCancel
   * @param {Array} touches
   */
  handleTouchesCancel: function handleTouchesCancel(touches) {
    var handleTouches = this.getSetOfTouchesEndOrCancel(touches);

    if (handleTouches.length > 0) {
      this._glView._convertTouchesWithScale(handleTouches);

      var touchEvent = new cc.Event.EventTouch(handleTouches);
      touchEvent._eventCode = cc.Event.EventTouch.CANCELED;
      eventManager.dispatchEvent(touchEvent);
    }

    this._preTouchPool.length = 0;
  },

  /**
   * @method getSetOfTouchesEndOrCancel
   * @param {Array} touches
   * @returns {Array}
   */
  getSetOfTouchesEndOrCancel: function getSetOfTouchesEndOrCancel(touches) {
    var selTouch,
        index,
        touchID,
        handleTouches = [],
        locTouches = this._touches,
        locTouchesIntDict = this._touchesIntegerDict;

    for (var i = 0, len = touches.length; i < len; i++) {
      selTouch = touches[i];
      touchID = selTouch.getID();
      index = locTouchesIntDict[touchID];

      if (index == null) {
        continue; //cc.log("if the index doesn't exist, it is an error");
      }

      if (locTouches[index]) {
        locTouches[index]._setPoint(selTouch._point);

        locTouches[index]._setPrevPoint(selTouch._prevPoint);

        handleTouches.push(locTouches[index]);

        this._removeUsedIndexBit(index);

        delete locTouchesIntDict[touchID];
      }
    }

    return handleTouches;
  },

  /**
   * @method getPreTouch
   * @param {Touch} touch
   * @return {Touch}
   */
  getPreTouch: function getPreTouch(touch) {
    var preTouch = null;
    var locPreTouchPool = this._preTouchPool;
    var id = touch.getID();

    for (var i = locPreTouchPool.length - 1; i >= 0; i--) {
      if (locPreTouchPool[i].getID() === id) {
        preTouch = locPreTouchPool[i];
        break;
      }
    }

    if (!preTouch) preTouch = touch;
    return preTouch;
  },

  /**
   * @method setPreTouch
   * @param {Touch} touch
   */
  setPreTouch: function setPreTouch(touch) {
    var find = false;
    var locPreTouchPool = this._preTouchPool;
    var id = touch.getID();

    for (var i = locPreTouchPool.length - 1; i >= 0; i--) {
      if (locPreTouchPool[i].getID() === id) {
        locPreTouchPool[i] = touch;
        find = true;
        break;
      }
    }

    if (!find) {
      if (locPreTouchPool.length <= 50) {
        locPreTouchPool.push(touch);
      } else {
        locPreTouchPool[this._preTouchPoolPointer] = touch;
        this._preTouchPoolPointer = (this._preTouchPoolPointer + 1) % 50;
      }
    }
  },

  /**
   * @method getTouchByXY
   * @param {Number} tx
   * @param {Number} ty
   * @param {Vec2} pos
   * @return {Touch}
   */
  getTouchByXY: function getTouchByXY(tx, ty, pos) {
    var locPreTouch = this._preTouchPoint;

    var location = this._glView.convertToLocationInView(tx, ty, pos);

    var touch = new cc.Touch(location.x, location.y, 0);

    touch._setPrevPoint(locPreTouch.x, locPreTouch.y);

    locPreTouch.x = location.x;
    locPreTouch.y = location.y;
    return touch;
  },

  /**
   * @method getMouseEvent
   * @param {Vec2} location
   * @param {Vec2} pos
   * @param {Number} eventType
   * @returns {Event.EventMouse}
   */
  getMouseEvent: function getMouseEvent(location, pos, eventType) {
    var locPreMouse = this._prevMousePoint;
    var mouseEvent = new cc.Event.EventMouse(eventType);

    mouseEvent._setPrevCursor(locPreMouse.x, locPreMouse.y);

    locPreMouse.x = location.x;
    locPreMouse.y = location.y;

    this._glView._convertMouseToLocationInView(locPreMouse, pos);

    mouseEvent.setLocation(locPreMouse.x, locPreMouse.y);
    return mouseEvent;
  },

  /**
   * @method getPointByEvent
   * @param {Touch} event
   * @param {Vec2} pos
   * @return {Vec2}
   */
  getPointByEvent: function getPointByEvent(event, pos) {
    // qq , uc and safari browser can't calculate pageY correctly, need to refresh canvas bounding rect
    if (cc.sys.browserType === cc.sys.BROWSER_TYPE_QQ || cc.sys.browserType === cc.sys.BROWSER_TYPE_UC || cc.sys.browserType === cc.sys.BROWSER_TYPE_SAFARI) {
      this._updateCanvasBoundingRect();
    }

    if (event.pageX != null) //not avalable in <= IE8
      return {
        x: event.pageX,
        y: event.pageY
      };
    pos.left -= document.body.scrollLeft;
    pos.top -= document.body.scrollTop;
    return {
      x: event.clientX,
      y: event.clientY
    };
  },

  /**
   * @method getTouchesByEvent
   * @param {Touch} event
   * @param {Vec2} pos
   * @returns {Array}
   */
  getTouchesByEvent: function getTouchesByEvent(event, pos) {
    var touchArr = [],
        locView = this._glView;
    var touch_event, touch, preLocation;
    var locPreTouch = this._preTouchPoint;
    var length = event.changedTouches.length;

    for (var i = 0; i < length; i++) {
      touch_event = event.changedTouches[i];

      if (touch_event) {
        var location = void 0;
        if (sys.BROWSER_TYPE_FIREFOX === sys.browserType) location = locView.convertToLocationInView(touch_event.pageX, touch_event.pageY, pos, _vec2);else location = locView.convertToLocationInView(touch_event.clientX, touch_event.clientY, pos, _vec2);

        if (touch_event.identifier != null) {
          touch = new cc.Touch(location.x, location.y, touch_event.identifier); //use Touch Pool

          preLocation = this.getPreTouch(touch).getLocation();

          touch._setPrevPoint(preLocation.x, preLocation.y);

          this.setPreTouch(touch);
        } else {
          touch = new cc.Touch(location.x, location.y);

          touch._setPrevPoint(locPreTouch.x, locPreTouch.y);
        }

        locPreTouch.x = location.x;
        locPreTouch.y = location.y;
        touchArr.push(touch);
      }
    }

    return touchArr;
  },

  /**
   * @method registerSystemEvent
   * @param {HTMLElement} element
   */
  registerSystemEvent: function registerSystemEvent(element) {
    if (this._isRegisterEvent) return;
    this._glView = cc.view;
    var selfPointer = this;
    var canvasBoundingRect = this._canvasBoundingRect;
    window.addEventListener('resize', this._updateCanvasBoundingRect.bind(this));
    var prohibition = sys.isMobile;
    var supportMouse = ('mouse' in sys.capabilities);
    var supportTouches = ('touches' in sys.capabilities);

    if (supportMouse) {
      //HACK
      //  - At the same time to trigger the ontouch event and onmouse event
      //  - The function will execute 2 times
      //The known browser:
      //  liebiao
      //  miui
      //  WECHAT
      if (!prohibition) {
        window.addEventListener('mousedown', function () {
          selfPointer._mousePressed = true;
        }, false);
        window.addEventListener('mouseup', function (event) {
          if (!selfPointer._mousePressed) return;
          selfPointer._mousePressed = false;
          var location = selfPointer.getPointByEvent(event, canvasBoundingRect);

          if (!cc.rect(canvasBoundingRect.left, canvasBoundingRect.top, canvasBoundingRect.width, canvasBoundingRect.height).contains(location)) {
            selfPointer.handleTouchesEnd([selfPointer.getTouchByXY(location.x, location.y, canvasBoundingRect)]);
            var mouseEvent = selfPointer.getMouseEvent(location, canvasBoundingRect, cc.Event.EventMouse.UP);
            mouseEvent.setButton(event.button);
            eventManager.dispatchEvent(mouseEvent);
          }
        }, false);
      } // register canvas mouse event


      var EventMouse = cc.Event.EventMouse;
      var _mouseEventsOnElement = [!prohibition && ["mousedown", EventMouse.DOWN, function (event, mouseEvent, location, canvasBoundingRect) {
        selfPointer._mousePressed = true;
        selfPointer.handleTouchesBegin([selfPointer.getTouchByXY(location.x, location.y, canvasBoundingRect)]);
        element.focus();
      }], !prohibition && ["mouseup", EventMouse.UP, function (event, mouseEvent, location, canvasBoundingRect) {
        selfPointer._mousePressed = false;
        selfPointer.handleTouchesEnd([selfPointer.getTouchByXY(location.x, location.y, canvasBoundingRect)]);
      }], !prohibition && ["mousemove", EventMouse.MOVE, function (event, mouseEvent, location, canvasBoundingRect) {
        selfPointer.handleTouchesMove([selfPointer.getTouchByXY(location.x, location.y, canvasBoundingRect)]);

        if (!selfPointer._mousePressed) {
          mouseEvent.setButton(null);
        }
      }], ["mousewheel", EventMouse.SCROLL, function (event, mouseEvent) {
        mouseEvent.setScrollData(0, event.wheelDelta);
      }],
      /* firefox fix */
      ["DOMMouseScroll", EventMouse.SCROLL, function (event, mouseEvent) {
        mouseEvent.setScrollData(0, event.detail * -120);
      }]];

      for (var i = 0; i < _mouseEventsOnElement.length; ++i) {
        var entry = _mouseEventsOnElement[i];

        if (entry) {
          (function () {
            var name = entry[0];
            var type = entry[1];
            var handler = entry[2];
            element.addEventListener(name, function (event) {
              var location = selfPointer.getPointByEvent(event, canvasBoundingRect);
              var mouseEvent = selfPointer.getMouseEvent(location, canvasBoundingRect, type);
              mouseEvent.setButton(event.button);
              handler(event, mouseEvent, location, canvasBoundingRect);
              eventManager.dispatchEvent(mouseEvent);
              event.stopPropagation();
              event.preventDefault();
            }, false);
          })();
        }
      }
    }

    if (window.navigator.msPointerEnabled) {
      var _pointerEventsMap = {
        "MSPointerDown": selfPointer.handleTouchesBegin,
        "MSPointerMove": selfPointer.handleTouchesMove,
        "MSPointerUp": selfPointer.handleTouchesEnd,
        "MSPointerCancel": selfPointer.handleTouchesCancel
      };

      var _loop = function _loop(eventName) {
        var touchEvent = _pointerEventsMap[eventName];
        element.addEventListener(eventName, function (event) {
          var documentElement = document.documentElement;
          canvasBoundingRect.adjustedLeft = canvasBoundingRect.left - documentElement.scrollLeft;
          canvasBoundingRect.adjustedTop = canvasBoundingRect.top - documentElement.scrollTop;
          touchEvent.call(selfPointer, [selfPointer.getTouchByXY(event.clientX, event.clientY, canvasBoundingRect)]);
          event.stopPropagation();
        }, false);
      };

      for (var eventName in _pointerEventsMap) {
        _loop(eventName);
      }
    } //register touch event


    if (supportTouches) {
      var _touchEventsMap = {
        "touchstart": function touchstart(touchesToHandle) {
          selfPointer.handleTouchesBegin(touchesToHandle);
          element.focus();
        },
        "touchmove": function touchmove(touchesToHandle) {
          selfPointer.handleTouchesMove(touchesToHandle);
        },
        "touchend": function touchend(touchesToHandle) {
          selfPointer.handleTouchesEnd(touchesToHandle);
        },
        "touchcancel": function touchcancel(touchesToHandle) {
          selfPointer.handleTouchesCancel(touchesToHandle);
        }
      };

      var registerTouchEvent = function registerTouchEvent(eventName) {
        var handler = _touchEventsMap[eventName];
        element.addEventListener(eventName, function (event) {
          if (!event.changedTouches) return;
          var body = document.body;
          canvasBoundingRect.adjustedLeft = canvasBoundingRect.left - (body.scrollLeft || window.scrollX || 0);
          canvasBoundingRect.adjustedTop = canvasBoundingRect.top - (body.scrollTop || window.scrollY || 0);
          handler(selfPointer.getTouchesByEvent(event, canvasBoundingRect));
          event.stopPropagation();
          event.preventDefault();
        }, false);
      };

      for (var _eventName in _touchEventsMap) {
        registerTouchEvent(_eventName);
      }
    }

    this._registerKeyboardEvent();

    this._isRegisterEvent = true;
  },
  _registerKeyboardEvent: function _registerKeyboardEvent() {},
  _registerAccelerometerEvent: function _registerAccelerometerEvent() {},

  /**
   * @method update
   * @param {Number} dt
   */
  update: function update(dt) {
    if (this._accelCurTime > this._accelInterval) {
      this._accelCurTime -= this._accelInterval;
      eventManager.dispatchEvent(new cc.Event.EventAcceleration(this._acceleration));
    }

    this._accelCurTime += dt;
  }
};
module.exports = cc.internal.inputManager = inputManager;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL0NDSW5wdXRNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIm1hY3JvIiwicmVxdWlyZSIsInN5cyIsImV2ZW50TWFuYWdlciIsIlRPVUNIX1RJTUVPVVQiLCJfdmVjMiIsImNjIiwidjIiLCJpbnB1dE1hbmFnZXIiLCJfbW91c2VQcmVzc2VkIiwiX2lzUmVnaXN0ZXJFdmVudCIsIl9wcmVUb3VjaFBvaW50IiwiX3ByZXZNb3VzZVBvaW50IiwiX3ByZVRvdWNoUG9vbCIsIl9wcmVUb3VjaFBvb2xQb2ludGVyIiwiX3RvdWNoZXMiLCJfdG91Y2hlc0ludGVnZXJEaWN0IiwiX2luZGV4Qml0c1VzZWQiLCJfbWF4VG91Y2hlcyIsIl9hY2NlbEVuYWJsZWQiLCJfYWNjZWxJbnRlcnZhbCIsIl9hY2NlbE1pbnVzIiwiX2FjY2VsQ3VyVGltZSIsIl9hY2NlbGVyYXRpb24iLCJfYWNjZWxEZXZpY2VFdmVudCIsIl9jYW52YXNCb3VuZGluZ1JlY3QiLCJsZWZ0IiwidG9wIiwiYWRqdXN0ZWRMZWZ0IiwiYWRqdXN0ZWRUb3AiLCJ3aWR0aCIsImhlaWdodCIsIl9nZXRVblVzZWRJbmRleCIsInRlbXAiLCJub3ciLCJpIiwidG91Y2giLCJfbGFzdE1vZGlmaWVkIiwiX3JlbW92ZVVzZWRJbmRleEJpdCIsImdldElEIiwiaW5kZXgiLCJfZ2xWaWV3IiwiX3VwZGF0ZUNhbnZhc0JvdW5kaW5nUmVjdCIsImVsZW1lbnQiLCJnYW1lIiwiY2FudmFzIiwiY2FudmFzQm91bmRpbmdSZWN0IiwiZG9jRWxlbSIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwibGVmdE9mZnNldCIsIndpbmRvdyIsInBhZ2VYT2Zmc2V0IiwiY2xpZW50TGVmdCIsInRvcE9mZnNldCIsInBhZ2VZT2Zmc2V0IiwiY2xpZW50VG9wIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm94IiwiSFRNTENhbnZhc0VsZW1lbnQiLCJwYXJzZUludCIsInN0eWxlIiwiaGFuZGxlVG91Y2hlc0JlZ2luIiwidG91Y2hlcyIsInNlbFRvdWNoIiwiY3VyVG91Y2giLCJ0b3VjaElEIiwiaGFuZGxlVG91Y2hlcyIsImxvY1RvdWNoSW50RGljdCIsImxlbiIsImxlbmd0aCIsInVudXNlZEluZGV4IiwibG9nSUQiLCJUb3VjaCIsIl9wb2ludCIsIngiLCJ5IiwiX3NldFByZXZQb2ludCIsIl9wcmV2UG9pbnQiLCJwdXNoIiwiX2NvbnZlcnRUb3VjaGVzV2l0aFNjYWxlIiwidG91Y2hFdmVudCIsIkV2ZW50IiwiRXZlbnRUb3VjaCIsIl9ldmVudENvZGUiLCJCRUdBTiIsImRpc3BhdGNoRXZlbnQiLCJoYW5kbGVUb3VjaGVzTW92ZSIsImxvY1RvdWNoZXMiLCJfc2V0UG9pbnQiLCJNT1ZFRCIsImhhbmRsZVRvdWNoZXNFbmQiLCJnZXRTZXRPZlRvdWNoZXNFbmRPckNhbmNlbCIsIkVOREVEIiwiaGFuZGxlVG91Y2hlc0NhbmNlbCIsIkNBTkNFTEVEIiwibG9jVG91Y2hlc0ludERpY3QiLCJnZXRQcmVUb3VjaCIsInByZVRvdWNoIiwibG9jUHJlVG91Y2hQb29sIiwiaWQiLCJzZXRQcmVUb3VjaCIsImZpbmQiLCJnZXRUb3VjaEJ5WFkiLCJ0eCIsInR5IiwicG9zIiwibG9jUHJlVG91Y2giLCJsb2NhdGlvbiIsImNvbnZlcnRUb0xvY2F0aW9uSW5WaWV3IiwiZ2V0TW91c2VFdmVudCIsImV2ZW50VHlwZSIsImxvY1ByZU1vdXNlIiwibW91c2VFdmVudCIsIkV2ZW50TW91c2UiLCJfc2V0UHJldkN1cnNvciIsIl9jb252ZXJ0TW91c2VUb0xvY2F0aW9uSW5WaWV3Iiwic2V0TG9jYXRpb24iLCJnZXRQb2ludEJ5RXZlbnQiLCJldmVudCIsImJyb3dzZXJUeXBlIiwiQlJPV1NFUl9UWVBFX1FRIiwiQlJPV1NFUl9UWVBFX1VDIiwiQlJPV1NFUl9UWVBFX1NBRkFSSSIsInBhZ2VYIiwicGFnZVkiLCJib2R5Iiwic2Nyb2xsTGVmdCIsInNjcm9sbFRvcCIsImNsaWVudFgiLCJjbGllbnRZIiwiZ2V0VG91Y2hlc0J5RXZlbnQiLCJ0b3VjaEFyciIsImxvY1ZpZXciLCJ0b3VjaF9ldmVudCIsInByZUxvY2F0aW9uIiwiY2hhbmdlZFRvdWNoZXMiLCJCUk9XU0VSX1RZUEVfRklSRUZPWCIsImlkZW50aWZpZXIiLCJnZXRMb2NhdGlvbiIsInJlZ2lzdGVyU3lzdGVtRXZlbnQiLCJ2aWV3Iiwic2VsZlBvaW50ZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiYmluZCIsInByb2hpYml0aW9uIiwiaXNNb2JpbGUiLCJzdXBwb3J0TW91c2UiLCJjYXBhYmlsaXRpZXMiLCJzdXBwb3J0VG91Y2hlcyIsInJlY3QiLCJjb250YWlucyIsIlVQIiwic2V0QnV0dG9uIiwiYnV0dG9uIiwiX21vdXNlRXZlbnRzT25FbGVtZW50IiwiRE9XTiIsImZvY3VzIiwiTU9WRSIsIlNDUk9MTCIsInNldFNjcm9sbERhdGEiLCJ3aGVlbERlbHRhIiwiZGV0YWlsIiwiZW50cnkiLCJuYW1lIiwidHlwZSIsImhhbmRsZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsIm5hdmlnYXRvciIsIm1zUG9pbnRlckVuYWJsZWQiLCJfcG9pbnRlckV2ZW50c01hcCIsImV2ZW50TmFtZSIsImNhbGwiLCJfdG91Y2hFdmVudHNNYXAiLCJ0b3VjaGVzVG9IYW5kbGUiLCJyZWdpc3RlclRvdWNoRXZlbnQiLCJzY3JvbGxYIiwic2Nyb2xsWSIsIl9yZWdpc3RlcktleWJvYXJkRXZlbnQiLCJfcmVnaXN0ZXJBY2NlbGVyb21ldGVyRXZlbnQiLCJ1cGRhdGUiLCJkdCIsIkV2ZW50QWNjZWxlcmF0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyIsImludGVybmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUFyQjs7QUFDQSxJQUFNQyxHQUFHLEdBQUdELE9BQU8sQ0FBQyxTQUFELENBQW5COztB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IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDExLTIwMTIgY29jb3MyZC14Lm9yZ1xuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgbWFjcm8gPSByZXF1aXJlKCcuL0NDTWFjcm8nKTtcbmNvbnN0IHN5cyA9IHJlcXVpcmUoJy4vQ0NTeXMnKTtcbmNvbnN0IGV2ZW50TWFuYWdlciA9IHJlcXVpcmUoJy4uL2V2ZW50LW1hbmFnZXInKTtcblxuY29uc3QgVE9VQ0hfVElNRU9VVCA9IG1hY3JvLlRPVUNIX1RJTUVPVVQ7XG5cbmxldCBfdmVjMiA9IGNjLnYyKCk7XG5cbi8qKlxuICogIFRoaXMgY2xhc3MgbWFuYWdlcyBhbGwgZXZlbnRzIG9mIGlucHV0LiBpbmNsdWRlOiB0b3VjaCwgbW91c2UsIGFjY2VsZXJvbWV0ZXIsIGtleWJvYXJkXG4gKi9cbmxldCBpbnB1dE1hbmFnZXIgPSB7XG4gICAgX21vdXNlUHJlc3NlZDogZmFsc2UsXG5cbiAgICBfaXNSZWdpc3RlckV2ZW50OiBmYWxzZSxcblxuICAgIF9wcmVUb3VjaFBvaW50OiBjYy52MigwLDApLFxuICAgIF9wcmV2TW91c2VQb2ludDogY2MudjIoMCwwKSxcblxuICAgIF9wcmVUb3VjaFBvb2w6IFtdLFxuICAgIF9wcmVUb3VjaFBvb2xQb2ludGVyOiAwLFxuXG4gICAgX3RvdWNoZXM6IFtdLFxuICAgIF90b3VjaGVzSW50ZWdlckRpY3Q6e30sXG5cbiAgICBfaW5kZXhCaXRzVXNlZDogMCxcbiAgICBfbWF4VG91Y2hlczogOCxcblxuICAgIF9hY2NlbEVuYWJsZWQ6IGZhbHNlLFxuICAgIF9hY2NlbEludGVydmFsOiAxLzUsXG4gICAgX2FjY2VsTWludXM6IDEsXG4gICAgX2FjY2VsQ3VyVGltZTogMCxcbiAgICBfYWNjZWxlcmF0aW9uOiBudWxsLFxuICAgIF9hY2NlbERldmljZUV2ZW50OiBudWxsLFxuXG4gICAgX2NhbnZhc0JvdW5kaW5nUmVjdDoge1xuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGFkanVzdGVkTGVmdDogMCxcbiAgICAgICAgYWRqdXN0ZWRUb3A6IDAsXG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBoZWlnaHQ6IDAsXG4gICAgfSxcblxuICAgIF9nZXRVblVzZWRJbmRleCAoKSB7XG4gICAgICAgIGxldCB0ZW1wID0gdGhpcy5faW5kZXhCaXRzVXNlZDtcbiAgICAgICAgbGV0IG5vdyA9IGNjLnN5cy5ub3coKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21heFRvdWNoZXM7IGkrKykge1xuICAgICAgICAgICAgaWYgKCEodGVtcCAmIDB4MDAwMDAwMDEpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5kZXhCaXRzVXNlZCB8PSAoMSA8PCBpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB0b3VjaCA9IHRoaXMuX3RvdWNoZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKG5vdyAtIHRvdWNoLl9sYXN0TW9kaWZpZWQgPiBUT1VDSF9USU1FT1VUKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZVVzZWRJbmRleEJpdChpKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3RvdWNoZXNJbnRlZ2VyRGljdFt0b3VjaC5nZXRJRCgpXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGVtcCA+Pj0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFsbCBiaXRzIGFyZSB1c2VkXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9LFxuXG4gICAgX3JlbW92ZVVzZWRJbmRleEJpdCAoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLl9tYXhUb3VjaGVzKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGxldCB0ZW1wID0gMSA8PCBpbmRleDtcbiAgICAgICAgdGVtcCA9IH50ZW1wO1xuICAgICAgICB0aGlzLl9pbmRleEJpdHNVc2VkICY9IHRlbXA7XG4gICAgfSxcblxuICAgIF9nbFZpZXc6IG51bGwsXG5cbiAgICBfdXBkYXRlQ2FudmFzQm91bmRpbmdSZWN0ICgpIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBjYy5nYW1lLmNhbnZhcztcbiAgICAgICAgbGV0IGNhbnZhc0JvdW5kaW5nUmVjdCA9IHRoaXMuX2NhbnZhc0JvdW5kaW5nUmVjdDtcblxuICAgICAgICBsZXQgZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgbGV0IGxlZnRPZmZzZXQgPSB3aW5kb3cucGFnZVhPZmZzZXQgLSBkb2NFbGVtLmNsaWVudExlZnQ7XG4gICAgICAgIGxldCB0b3BPZmZzZXQgPSB3aW5kb3cucGFnZVlPZmZzZXQgLSBkb2NFbGVtLmNsaWVudFRvcDtcbiAgICAgICAgaWYgKGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KSB7XG4gICAgICAgICAgICBsZXQgYm94ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGNhbnZhc0JvdW5kaW5nUmVjdC5sZWZ0ID0gYm94LmxlZnQgKyBsZWZ0T2Zmc2V0O1xuICAgICAgICAgICAgY2FudmFzQm91bmRpbmdSZWN0LnRvcCA9IGJveC50b3AgKyB0b3BPZmZzZXQ7XG4gICAgICAgICAgICBjYW52YXNCb3VuZGluZ1JlY3Qud2lkdGggPSBib3gud2lkdGg7XG4gICAgICAgICAgICBjYW52YXNCb3VuZGluZ1JlY3QuaGVpZ2h0ID0gYm94LmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICAgICAgICAgIGNhbnZhc0JvdW5kaW5nUmVjdC5sZWZ0ID0gbGVmdE9mZnNldDtcbiAgICAgICAgICAgIGNhbnZhc0JvdW5kaW5nUmVjdC50b3AgPSB0b3BPZmZzZXQ7XG4gICAgICAgICAgICBjYW52YXNCb3VuZGluZ1JlY3Qud2lkdGggPSBlbGVtZW50LndpZHRoO1xuICAgICAgICAgICAgY2FudmFzQm91bmRpbmdSZWN0LmhlaWdodCA9IGVsZW1lbnQuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2FudmFzQm91bmRpbmdSZWN0LmxlZnQgPSBsZWZ0T2Zmc2V0O1xuICAgICAgICAgICAgY2FudmFzQm91bmRpbmdSZWN0LnRvcCA9IHRvcE9mZnNldDtcbiAgICAgICAgICAgIGNhbnZhc0JvdW5kaW5nUmVjdC53aWR0aCA9IHBhcnNlSW50KGVsZW1lbnQuc3R5bGUud2lkdGgpO1xuICAgICAgICAgICAgY2FudmFzQm91bmRpbmdSZWN0LmhlaWdodCA9IHBhcnNlSW50KGVsZW1lbnQuc3R5bGUuaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGhhbmRsZVRvdWNoZXNCZWdpblxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHRvdWNoZXNcbiAgICAgKi9cbiAgICBoYW5kbGVUb3VjaGVzQmVnaW4gKHRvdWNoZXMpIHtcbiAgICAgICAgbGV0IHNlbFRvdWNoLCBpbmRleCwgY3VyVG91Y2gsIHRvdWNoSUQsXG4gICAgICAgICAgICBoYW5kbGVUb3VjaGVzID0gW10sIGxvY1RvdWNoSW50RGljdCA9IHRoaXMuX3RvdWNoZXNJbnRlZ2VyRGljdCxcbiAgICAgICAgICAgIG5vdyA9IHN5cy5ub3coKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRvdWNoZXMubGVuZ3RoOyBpIDwgbGVuOyBpICsrKSB7XG4gICAgICAgICAgICBzZWxUb3VjaCA9IHRvdWNoZXNbaV07XG4gICAgICAgICAgICB0b3VjaElEID0gc2VsVG91Y2guZ2V0SUQoKTtcbiAgICAgICAgICAgIGluZGV4ID0gbG9jVG91Y2hJbnREaWN0W3RvdWNoSURdO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCB1bnVzZWRJbmRleCA9IHRoaXMuX2dldFVuVXNlZEluZGV4KCk7XG4gICAgICAgICAgICAgICAgaWYgKHVudXNlZEluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2dJRCgyMzAwLCB1bnVzZWRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2N1clRvdWNoID0gdGhpcy5fdG91Y2hlc1t1bnVzZWRJbmRleF0gPSBzZWxUb3VjaDtcbiAgICAgICAgICAgICAgICBjdXJUb3VjaCA9IHRoaXMuX3RvdWNoZXNbdW51c2VkSW5kZXhdID0gbmV3IGNjLlRvdWNoKHNlbFRvdWNoLl9wb2ludC54LCBzZWxUb3VjaC5fcG9pbnQueSwgc2VsVG91Y2guZ2V0SUQoKSk7XG4gICAgICAgICAgICAgICAgY3VyVG91Y2guX2xhc3RNb2RpZmllZCA9IG5vdztcbiAgICAgICAgICAgICAgICBjdXJUb3VjaC5fc2V0UHJldlBvaW50KHNlbFRvdWNoLl9wcmV2UG9pbnQpO1xuICAgICAgICAgICAgICAgIGxvY1RvdWNoSW50RGljdFt0b3VjaElEXSA9IHVudXNlZEluZGV4O1xuICAgICAgICAgICAgICAgIGhhbmRsZVRvdWNoZXMucHVzaChjdXJUb3VjaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhbmRsZVRvdWNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fZ2xWaWV3Ll9jb252ZXJ0VG91Y2hlc1dpdGhTY2FsZShoYW5kbGVUb3VjaGVzKTtcbiAgICAgICAgICAgIGxldCB0b3VjaEV2ZW50ID0gbmV3IGNjLkV2ZW50LkV2ZW50VG91Y2goaGFuZGxlVG91Y2hlcyk7XG4gICAgICAgICAgICB0b3VjaEV2ZW50Ll9ldmVudENvZGUgPSBjYy5FdmVudC5FdmVudFRvdWNoLkJFR0FOO1xuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLmRpc3BhdGNoRXZlbnQodG91Y2hFdmVudCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBoYW5kbGVUb3VjaGVzTW92ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHRvdWNoZXNcbiAgICAgKi9cbiAgICBoYW5kbGVUb3VjaGVzTW92ZSAodG91Y2hlcykge1xuICAgICAgICBsZXQgc2VsVG91Y2gsIGluZGV4LCB0b3VjaElELFxuICAgICAgICAgICAgaGFuZGxlVG91Y2hlcyA9IFtdLCBsb2NUb3VjaGVzID0gdGhpcy5fdG91Y2hlcyxcbiAgICAgICAgICAgIG5vdyA9IHN5cy5ub3coKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRvdWNoZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHNlbFRvdWNoID0gdG91Y2hlc1tpXTtcbiAgICAgICAgICAgIHRvdWNoSUQgPSBzZWxUb3VjaC5nZXRJRCgpO1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLl90b3VjaGVzSW50ZWdlckRpY3RbdG91Y2hJRF07XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy9jYy5sb2coXCJpZiB0aGUgaW5kZXggZG9lc24ndCBleGlzdCwgaXQgaXMgYW4gZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobG9jVG91Y2hlc1tpbmRleF0pIHtcbiAgICAgICAgICAgICAgICBsb2NUb3VjaGVzW2luZGV4XS5fc2V0UG9pbnQoc2VsVG91Y2guX3BvaW50KTtcbiAgICAgICAgICAgICAgICBsb2NUb3VjaGVzW2luZGV4XS5fc2V0UHJldlBvaW50KHNlbFRvdWNoLl9wcmV2UG9pbnQpO1xuICAgICAgICAgICAgICAgIGxvY1RvdWNoZXNbaW5kZXhdLl9sYXN0TW9kaWZpZWQgPSBub3c7XG4gICAgICAgICAgICAgICAgaGFuZGxlVG91Y2hlcy5wdXNoKGxvY1RvdWNoZXNbaW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFuZGxlVG91Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9nbFZpZXcuX2NvbnZlcnRUb3VjaGVzV2l0aFNjYWxlKGhhbmRsZVRvdWNoZXMpO1xuICAgICAgICAgICAgbGV0IHRvdWNoRXZlbnQgPSBuZXcgY2MuRXZlbnQuRXZlbnRUb3VjaChoYW5kbGVUb3VjaGVzKTtcbiAgICAgICAgICAgIHRvdWNoRXZlbnQuX2V2ZW50Q29kZSA9IGNjLkV2ZW50LkV2ZW50VG91Y2guTU9WRUQ7XG4gICAgICAgICAgICBldmVudE1hbmFnZXIuZGlzcGF0Y2hFdmVudCh0b3VjaEV2ZW50KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGhhbmRsZVRvdWNoZXNFbmRcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB0b3VjaGVzXG4gICAgICovXG4gICAgaGFuZGxlVG91Y2hlc0VuZCAodG91Y2hlcykge1xuICAgICAgICBsZXQgaGFuZGxlVG91Y2hlcyA9IHRoaXMuZ2V0U2V0T2ZUb3VjaGVzRW5kT3JDYW5jZWwodG91Y2hlcyk7XG4gICAgICAgIGlmIChoYW5kbGVUb3VjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2dsVmlldy5fY29udmVydFRvdWNoZXNXaXRoU2NhbGUoaGFuZGxlVG91Y2hlcyk7XG4gICAgICAgICAgICBsZXQgdG91Y2hFdmVudCA9IG5ldyBjYy5FdmVudC5FdmVudFRvdWNoKGhhbmRsZVRvdWNoZXMpO1xuICAgICAgICAgICAgdG91Y2hFdmVudC5fZXZlbnRDb2RlID0gY2MuRXZlbnQuRXZlbnRUb3VjaC5FTkRFRDtcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5kaXNwYXRjaEV2ZW50KHRvdWNoRXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ByZVRvdWNoUG9vbC5sZW5ndGggPSAwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGhhbmRsZVRvdWNoZXNDYW5jZWxcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB0b3VjaGVzXG4gICAgICovXG4gICAgaGFuZGxlVG91Y2hlc0NhbmNlbCAodG91Y2hlcykge1xuICAgICAgICBsZXQgaGFuZGxlVG91Y2hlcyA9IHRoaXMuZ2V0U2V0T2ZUb3VjaGVzRW5kT3JDYW5jZWwodG91Y2hlcyk7XG4gICAgICAgIGlmIChoYW5kbGVUb3VjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2dsVmlldy5fY29udmVydFRvdWNoZXNXaXRoU2NhbGUoaGFuZGxlVG91Y2hlcyk7XG4gICAgICAgICAgICBsZXQgdG91Y2hFdmVudCA9IG5ldyBjYy5FdmVudC5FdmVudFRvdWNoKGhhbmRsZVRvdWNoZXMpO1xuICAgICAgICAgICAgdG91Y2hFdmVudC5fZXZlbnRDb2RlID0gY2MuRXZlbnQuRXZlbnRUb3VjaC5DQU5DRUxFRDtcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5kaXNwYXRjaEV2ZW50KHRvdWNoRXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ByZVRvdWNoUG9vbC5sZW5ndGggPSAwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGdldFNldE9mVG91Y2hlc0VuZE9yQ2FuY2VsXG4gICAgICogQHBhcmFtIHtBcnJheX0gdG91Y2hlc1xuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRTZXRPZlRvdWNoZXNFbmRPckNhbmNlbCAodG91Y2hlcykge1xuICAgICAgICBsZXQgc2VsVG91Y2gsIGluZGV4LCB0b3VjaElELCBoYW5kbGVUb3VjaGVzID0gW10sIGxvY1RvdWNoZXMgPSB0aGlzLl90b3VjaGVzLCBsb2NUb3VjaGVzSW50RGljdCA9IHRoaXMuX3RvdWNoZXNJbnRlZ2VyRGljdDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRvdWNoZXMubGVuZ3RoOyBpPCBsZW47IGkgKyspIHtcbiAgICAgICAgICAgIHNlbFRvdWNoID0gdG91Y2hlc1tpXTtcbiAgICAgICAgICAgIHRvdWNoSUQgPSBzZWxUb3VjaC5nZXRJRCgpO1xuICAgICAgICAgICAgaW5kZXggPSBsb2NUb3VjaGVzSW50RGljdFt0b3VjaElEXTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTsgIC8vY2MubG9nKFwiaWYgdGhlIGluZGV4IGRvZXNuJ3QgZXhpc3QsIGl0IGlzIGFuIGVycm9yXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxvY1RvdWNoZXNbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgbG9jVG91Y2hlc1tpbmRleF0uX3NldFBvaW50KHNlbFRvdWNoLl9wb2ludCk7XG4gICAgICAgICAgICAgICAgbG9jVG91Y2hlc1tpbmRleF0uX3NldFByZXZQb2ludChzZWxUb3VjaC5fcHJldlBvaW50KTtcbiAgICAgICAgICAgICAgICBoYW5kbGVUb3VjaGVzLnB1c2gobG9jVG91Y2hlc1tpbmRleF0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZVVzZWRJbmRleEJpdChpbmRleCk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGxvY1RvdWNoZXNJbnREaWN0W3RvdWNoSURdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYW5kbGVUb3VjaGVzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGdldFByZVRvdWNoXG4gICAgICogQHBhcmFtIHtUb3VjaH0gdG91Y2hcbiAgICAgKiBAcmV0dXJuIHtUb3VjaH1cbiAgICAgKi9cbiAgICBnZXRQcmVUb3VjaCAodG91Y2gpIHtcbiAgICAgICAgbGV0IHByZVRvdWNoID0gbnVsbDtcbiAgICAgICAgbGV0IGxvY1ByZVRvdWNoUG9vbCA9IHRoaXMuX3ByZVRvdWNoUG9vbDtcbiAgICAgICAgbGV0IGlkID0gdG91Y2guZ2V0SUQoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGxvY1ByZVRvdWNoUG9vbC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKGxvY1ByZVRvdWNoUG9vbFtpXS5nZXRJRCgpID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHByZVRvdWNoID0gbG9jUHJlVG91Y2hQb29sW2ldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghcHJlVG91Y2gpXG4gICAgICAgICAgICBwcmVUb3VjaCA9IHRvdWNoO1xuICAgICAgICByZXR1cm4gcHJlVG91Y2g7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2V0UHJlVG91Y2hcbiAgICAgKiBAcGFyYW0ge1RvdWNofSB0b3VjaFxuICAgICAqL1xuICAgIHNldFByZVRvdWNoICh0b3VjaCkge1xuICAgICAgICBsZXQgZmluZCA9IGZhbHNlO1xuICAgICAgICBsZXQgbG9jUHJlVG91Y2hQb29sID0gdGhpcy5fcHJlVG91Y2hQb29sO1xuICAgICAgICBsZXQgaWQgPSB0b3VjaC5nZXRJRCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gbG9jUHJlVG91Y2hQb29sLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAobG9jUHJlVG91Y2hQb29sW2ldLmdldElEKCkgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgbG9jUHJlVG91Y2hQb29sW2ldID0gdG91Y2g7XG4gICAgICAgICAgICAgICAgZmluZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmaW5kKSB7XG4gICAgICAgICAgICBpZiAobG9jUHJlVG91Y2hQb29sLmxlbmd0aCA8PSA1MCkge1xuICAgICAgICAgICAgICAgIGxvY1ByZVRvdWNoUG9vbC5wdXNoKHRvdWNoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9jUHJlVG91Y2hQb29sW3RoaXMuX3ByZVRvdWNoUG9vbFBvaW50ZXJdID0gdG91Y2g7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJlVG91Y2hQb29sUG9pbnRlciA9ICh0aGlzLl9wcmVUb3VjaFBvb2xQb2ludGVyICsgMSkgJSA1MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGdldFRvdWNoQnlYWVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0eFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0eVxuICAgICAqIEBwYXJhbSB7VmVjMn0gcG9zXG4gICAgICogQHJldHVybiB7VG91Y2h9XG4gICAgICovXG4gICAgZ2V0VG91Y2hCeVhZICh0eCwgdHksIHBvcykge1xuICAgICAgICBsZXQgbG9jUHJlVG91Y2ggPSB0aGlzLl9wcmVUb3VjaFBvaW50O1xuICAgICAgICBsZXQgbG9jYXRpb24gPSB0aGlzLl9nbFZpZXcuY29udmVydFRvTG9jYXRpb25JblZpZXcodHgsIHR5LCBwb3MpO1xuICAgICAgICBsZXQgdG91Y2ggPSBuZXcgY2MuVG91Y2gobG9jYXRpb24ueCwgbG9jYXRpb24ueSwgMCk7XG4gICAgICAgIHRvdWNoLl9zZXRQcmV2UG9pbnQobG9jUHJlVG91Y2gueCwgbG9jUHJlVG91Y2gueSk7XG4gICAgICAgIGxvY1ByZVRvdWNoLnggPSBsb2NhdGlvbi54O1xuICAgICAgICBsb2NQcmVUb3VjaC55ID0gbG9jYXRpb24ueTtcbiAgICAgICAgcmV0dXJuIHRvdWNoO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGdldE1vdXNlRXZlbnRcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IGxvY2F0aW9uXG4gICAgICogQHBhcmFtIHtWZWMyfSBwb3NcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZXZlbnRUeXBlXG4gICAgICogQHJldHVybnMge0V2ZW50LkV2ZW50TW91c2V9XG4gICAgICovXG4gICAgZ2V0TW91c2VFdmVudCAobG9jYXRpb24sIHBvcywgZXZlbnRUeXBlKSB7XG4gICAgICAgIGxldCBsb2NQcmVNb3VzZSA9IHRoaXMuX3ByZXZNb3VzZVBvaW50O1xuICAgICAgICBsZXQgbW91c2VFdmVudCA9IG5ldyBjYy5FdmVudC5FdmVudE1vdXNlKGV2ZW50VHlwZSk7XG4gICAgICAgIG1vdXNlRXZlbnQuX3NldFByZXZDdXJzb3IobG9jUHJlTW91c2UueCwgbG9jUHJlTW91c2UueSk7XG4gICAgICAgIGxvY1ByZU1vdXNlLnggPSBsb2NhdGlvbi54O1xuICAgICAgICBsb2NQcmVNb3VzZS55ID0gbG9jYXRpb24ueTtcbiAgICAgICAgdGhpcy5fZ2xWaWV3Ll9jb252ZXJ0TW91c2VUb0xvY2F0aW9uSW5WaWV3KGxvY1ByZU1vdXNlLCBwb3MpO1xuICAgICAgICBtb3VzZUV2ZW50LnNldExvY2F0aW9uKGxvY1ByZU1vdXNlLngsIGxvY1ByZU1vdXNlLnkpO1xuICAgICAgICByZXR1cm4gbW91c2VFdmVudDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBnZXRQb2ludEJ5RXZlbnRcbiAgICAgKiBAcGFyYW0ge1RvdWNofSBldmVudFxuICAgICAqIEBwYXJhbSB7VmVjMn0gcG9zXG4gICAgICogQHJldHVybiB7VmVjMn1cbiAgICAgKi9cbiAgICBnZXRQb2ludEJ5RXZlbnQgKGV2ZW50LCBwb3MpIHtcbiAgICAgICAgLy8gcXEgLCB1YyBhbmQgc2FmYXJpIGJyb3dzZXIgY2FuJ3QgY2FsY3VsYXRlIHBhZ2VZIGNvcnJlY3RseSwgbmVlZCB0byByZWZyZXNoIGNhbnZhcyBib3VuZGluZyByZWN0XG4gICAgICAgIGlmIChjYy5zeXMuYnJvd3NlclR5cGUgPT09IGNjLnN5cy5CUk9XU0VSX1RZUEVfUVEgXG4gICAgICAgICAgICB8fCBjYy5zeXMuYnJvd3NlclR5cGUgPT09IGNjLnN5cy5CUk9XU0VSX1RZUEVfVUNcbiAgICAgICAgICAgIHx8IGNjLnN5cy5icm93c2VyVHlwZSA9PT0gY2Muc3lzLkJST1dTRVJfVFlQRV9TQUZBUkkpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNhbnZhc0JvdW5kaW5nUmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoZXZlbnQucGFnZVggIT0gbnVsbCkgIC8vbm90IGF2YWxhYmxlIGluIDw9IElFOFxuICAgICAgICAgICAgcmV0dXJuIHt4OiBldmVudC5wYWdlWCwgeTogZXZlbnQucGFnZVl9O1xuXG4gICAgICAgIHBvcy5sZWZ0IC09IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcbiAgICAgICAgcG9zLnRvcCAtPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcblxuICAgICAgICByZXR1cm4ge3g6IGV2ZW50LmNsaWVudFgsIHk6IGV2ZW50LmNsaWVudFl9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGdldFRvdWNoZXNCeUV2ZW50XG4gICAgICogQHBhcmFtIHtUb3VjaH0gZXZlbnRcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHBvc1xuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRUb3VjaGVzQnlFdmVudCAoZXZlbnQsIHBvcykge1xuICAgICAgICBsZXQgdG91Y2hBcnIgPSBbXSwgbG9jVmlldyA9IHRoaXMuX2dsVmlldztcbiAgICAgICAgbGV0IHRvdWNoX2V2ZW50LCB0b3VjaCwgcHJlTG9jYXRpb247XG4gICAgICAgIGxldCBsb2NQcmVUb3VjaCA9IHRoaXMuX3ByZVRvdWNoUG9pbnQ7XG5cbiAgICAgICAgbGV0IGxlbmd0aCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdG91Y2hfZXZlbnQgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXTtcbiAgICAgICAgICAgIGlmICh0b3VjaF9ldmVudCkge1xuICAgICAgICAgICAgICAgIGxldCBsb2NhdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoc3lzLkJST1dTRVJfVFlQRV9GSVJFRk9YID09PSBzeXMuYnJvd3NlclR5cGUpXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uID0gbG9jVmlldy5jb252ZXJ0VG9Mb2NhdGlvbkluVmlldyh0b3VjaF9ldmVudC5wYWdlWCwgdG91Y2hfZXZlbnQucGFnZVksIHBvcywgX3ZlYzIpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24gPSBsb2NWaWV3LmNvbnZlcnRUb0xvY2F0aW9uSW5WaWV3KHRvdWNoX2V2ZW50LmNsaWVudFgsIHRvdWNoX2V2ZW50LmNsaWVudFksIHBvcywgX3ZlYzIpO1xuICAgICAgICAgICAgICAgIGlmICh0b3VjaF9ldmVudC5pZGVudGlmaWVyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2ggPSBuZXcgY2MuVG91Y2gobG9jYXRpb24ueCwgbG9jYXRpb24ueSwgdG91Y2hfZXZlbnQuaWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgICAgIC8vdXNlIFRvdWNoIFBvb2xcbiAgICAgICAgICAgICAgICAgICAgcHJlTG9jYXRpb24gPSB0aGlzLmdldFByZVRvdWNoKHRvdWNoKS5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaC5fc2V0UHJldlBvaW50KHByZUxvY2F0aW9uLngsIHByZUxvY2F0aW9uLnkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFByZVRvdWNoKHRvdWNoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaCA9IG5ldyBjYy5Ub3VjaChsb2NhdGlvbi54LCBsb2NhdGlvbi55KTtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2guX3NldFByZXZQb2ludChsb2NQcmVUb3VjaC54LCBsb2NQcmVUb3VjaC55KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbG9jUHJlVG91Y2gueCA9IGxvY2F0aW9uLng7XG4gICAgICAgICAgICAgICAgbG9jUHJlVG91Y2gueSA9IGxvY2F0aW9uLnk7XG4gICAgICAgICAgICAgICAgdG91Y2hBcnIucHVzaCh0b3VjaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvdWNoQXJyO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHJlZ2lzdGVyU3lzdGVtRXZlbnRcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAgICovXG4gICAgcmVnaXN0ZXJTeXN0ZW1FdmVudCAoZWxlbWVudCkge1xuICAgICAgICBpZih0aGlzLl9pc1JlZ2lzdGVyRXZlbnQpIHJldHVybjtcblxuICAgICAgICB0aGlzLl9nbFZpZXcgPSBjYy52aWV3O1xuICAgICAgICBsZXQgc2VsZlBvaW50ZXIgPSB0aGlzO1xuICAgICAgICBsZXQgY2FudmFzQm91bmRpbmdSZWN0ID0gdGhpcy5fY2FudmFzQm91bmRpbmdSZWN0O1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl91cGRhdGVDYW52YXNCb3VuZGluZ1JlY3QuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgbGV0IHByb2hpYml0aW9uID0gc3lzLmlzTW9iaWxlO1xuICAgICAgICBsZXQgc3VwcG9ydE1vdXNlID0gKCdtb3VzZScgaW4gc3lzLmNhcGFiaWxpdGllcyk7XG4gICAgICAgIGxldCBzdXBwb3J0VG91Y2hlcyA9ICgndG91Y2hlcycgaW4gc3lzLmNhcGFiaWxpdGllcyk7XG5cbiAgICAgICAgaWYgKHN1cHBvcnRNb3VzZSkge1xuICAgICAgICAgICAgLy9IQUNLXG4gICAgICAgICAgICAvLyAgLSBBdCB0aGUgc2FtZSB0aW1lIHRvIHRyaWdnZXIgdGhlIG9udG91Y2ggZXZlbnQgYW5kIG9ubW91c2UgZXZlbnRcbiAgICAgICAgICAgIC8vICAtIFRoZSBmdW5jdGlvbiB3aWxsIGV4ZWN1dGUgMiB0aW1lc1xuICAgICAgICAgICAgLy9UaGUga25vd24gYnJvd3NlcjpcbiAgICAgICAgICAgIC8vICBsaWViaWFvXG4gICAgICAgICAgICAvLyAgbWl1aVxuICAgICAgICAgICAgLy8gIFdFQ0hBVFxuICAgICAgICAgICAgaWYgKCFwcm9oaWJpdGlvbikge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGZQb2ludGVyLl9tb3VzZVByZXNzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsZlBvaW50ZXIuX21vdXNlUHJlc3NlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHNlbGZQb2ludGVyLl9tb3VzZVByZXNzZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYXRpb24gPSBzZWxmUG9pbnRlci5nZXRQb2ludEJ5RXZlbnQoZXZlbnQsIGNhbnZhc0JvdW5kaW5nUmVjdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2MucmVjdChjYW52YXNCb3VuZGluZ1JlY3QubGVmdCwgY2FudmFzQm91bmRpbmdSZWN0LnRvcCwgY2FudmFzQm91bmRpbmdSZWN0LndpZHRoLCBjYW52YXNCb3VuZGluZ1JlY3QuaGVpZ2h0KS5jb250YWlucyhsb2NhdGlvbikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZlBvaW50ZXIuaGFuZGxlVG91Y2hlc0VuZChbc2VsZlBvaW50ZXIuZ2V0VG91Y2hCeVhZKGxvY2F0aW9uLngsIGxvY2F0aW9uLnksIGNhbnZhc0JvdW5kaW5nUmVjdCldKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdXNlRXZlbnQgPSBzZWxmUG9pbnRlci5nZXRNb3VzZUV2ZW50KGxvY2F0aW9uLCBjYW52YXNCb3VuZGluZ1JlY3QsIGNjLkV2ZW50LkV2ZW50TW91c2UuVVApO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VFdmVudC5zZXRCdXR0b24oZXZlbnQuYnV0dG9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TWFuYWdlci5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyByZWdpc3RlciBjYW52YXMgbW91c2UgZXZlbnRcbiAgICAgICAgICAgIGxldCBFdmVudE1vdXNlID0gY2MuRXZlbnQuRXZlbnRNb3VzZTtcbiAgICAgICAgICAgIGxldCBfbW91c2VFdmVudHNPbkVsZW1lbnQgPSBbXG4gICAgICAgICAgICAgICAgIXByb2hpYml0aW9uICYmIFtcIm1vdXNlZG93blwiLCBFdmVudE1vdXNlLkRPV04sIGZ1bmN0aW9uIChldmVudCwgbW91c2VFdmVudCwgbG9jYXRpb24sIGNhbnZhc0JvdW5kaW5nUmVjdCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmUG9pbnRlci5fbW91c2VQcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZlBvaW50ZXIuaGFuZGxlVG91Y2hlc0JlZ2luKFtzZWxmUG9pbnRlci5nZXRUb3VjaEJ5WFkobG9jYXRpb24ueCwgbG9jYXRpb24ueSwgY2FudmFzQm91bmRpbmdSZWN0KV0pO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIXByb2hpYml0aW9uICYmIFtcIm1vdXNldXBcIiwgRXZlbnRNb3VzZS5VUCwgZnVuY3Rpb24gKGV2ZW50LCBtb3VzZUV2ZW50LCBsb2NhdGlvbiwgY2FudmFzQm91bmRpbmdSZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGZQb2ludGVyLl9tb3VzZVByZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZlBvaW50ZXIuaGFuZGxlVG91Y2hlc0VuZChbc2VsZlBvaW50ZXIuZ2V0VG91Y2hCeVhZKGxvY2F0aW9uLngsIGxvY2F0aW9uLnksIGNhbnZhc0JvdW5kaW5nUmVjdCldKTtcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAhcHJvaGliaXRpb24gJiYgW1wibW91c2Vtb3ZlXCIsIEV2ZW50TW91c2UuTU9WRSwgZnVuY3Rpb24gKGV2ZW50LCBtb3VzZUV2ZW50LCBsb2NhdGlvbiwgY2FudmFzQm91bmRpbmdSZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGZQb2ludGVyLmhhbmRsZVRvdWNoZXNNb3ZlKFtzZWxmUG9pbnRlci5nZXRUb3VjaEJ5WFkobG9jYXRpb24ueCwgbG9jYXRpb24ueSwgY2FudmFzQm91bmRpbmdSZWN0KV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGZQb2ludGVyLl9tb3VzZVByZXNzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlRXZlbnQuc2V0QnV0dG9uKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgW1wibW91c2V3aGVlbFwiLCBFdmVudE1vdXNlLlNDUk9MTCwgZnVuY3Rpb24gKGV2ZW50LCBtb3VzZUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG1vdXNlRXZlbnQuc2V0U2Nyb2xsRGF0YSgwLCBldmVudC53aGVlbERlbHRhKTtcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAvKiBmaXJlZm94IGZpeCAqL1xuICAgICAgICAgICAgICAgIFtcIkRPTU1vdXNlU2Nyb2xsXCIsIEV2ZW50TW91c2UuU0NST0xMLCBmdW5jdGlvbiAoZXZlbnQsIG1vdXNlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbW91c2VFdmVudC5zZXRTY3JvbGxEYXRhKDAsIGV2ZW50LmRldGFpbCAqIC0xMjApO1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfbW91c2VFdmVudHNPbkVsZW1lbnQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgZW50cnkgPSBfbW91c2VFdmVudHNPbkVsZW1lbnRbaV07XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gZW50cnlbMF07XG4gICAgICAgICAgICAgICAgICAgIGxldCB0eXBlID0gZW50cnlbMV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBoYW5kbGVyID0gZW50cnlbMl07XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb2NhdGlvbiA9IHNlbGZQb2ludGVyLmdldFBvaW50QnlFdmVudChldmVudCwgY2FudmFzQm91bmRpbmdSZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3VzZUV2ZW50ID0gc2VsZlBvaW50ZXIuZ2V0TW91c2VFdmVudChsb2NhdGlvbiwgY2FudmFzQm91bmRpbmdSZWN0LCB0eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlRXZlbnQuc2V0QnV0dG9uKGV2ZW50LmJ1dHRvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXIoZXZlbnQsIG1vdXNlRXZlbnQsIGxvY2F0aW9uLCBjYW52YXNCb3VuZGluZ1JlY3QpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE1hbmFnZXIuZGlzcGF0Y2hFdmVudChtb3VzZUV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQpIHtcbiAgICAgICAgICAgIGxldCBfcG9pbnRlckV2ZW50c01hcCA9IHtcbiAgICAgICAgICAgICAgICBcIk1TUG9pbnRlckRvd25cIiAgICAgOiBzZWxmUG9pbnRlci5oYW5kbGVUb3VjaGVzQmVnaW4sXG4gICAgICAgICAgICAgICAgXCJNU1BvaW50ZXJNb3ZlXCIgICAgIDogc2VsZlBvaW50ZXIuaGFuZGxlVG91Y2hlc01vdmUsXG4gICAgICAgICAgICAgICAgXCJNU1BvaW50ZXJVcFwiICAgICAgIDogc2VsZlBvaW50ZXIuaGFuZGxlVG91Y2hlc0VuZCxcbiAgICAgICAgICAgICAgICBcIk1TUG9pbnRlckNhbmNlbFwiICAgOiBzZWxmUG9pbnRlci5oYW5kbGVUb3VjaGVzQ2FuY2VsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yIChsZXQgZXZlbnROYW1lIGluIF9wb2ludGVyRXZlbnRzTWFwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRvdWNoRXZlbnQgPSBfcG9pbnRlckV2ZW50c01hcFtldmVudE5hbWVdO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmN0aW9uIChldmVudCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkb2N1bWVudEVsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhc0JvdW5kaW5nUmVjdC5hZGp1c3RlZExlZnQgPSBjYW52YXNCb3VuZGluZ1JlY3QubGVmdCAtIGRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgICAgICAgICAgICAgICAgICBjYW52YXNCb3VuZGluZ1JlY3QuYWRqdXN0ZWRUb3AgPSBjYW52YXNCb3VuZGluZ1JlY3QudG9wIC0gZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcblxuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50LmNhbGwoc2VsZlBvaW50ZXIsIFtzZWxmUG9pbnRlci5nZXRUb3VjaEJ5WFkoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSwgY2FudmFzQm91bmRpbmdSZWN0KV0pO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL3JlZ2lzdGVyIHRvdWNoIGV2ZW50XG4gICAgICAgIGlmIChzdXBwb3J0VG91Y2hlcykge1xuICAgICAgICAgICAgbGV0IF90b3VjaEV2ZW50c01hcCA9IHtcbiAgICAgICAgICAgICAgICBcInRvdWNoc3RhcnRcIjogZnVuY3Rpb24gKHRvdWNoZXNUb0hhbmRsZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmUG9pbnRlci5oYW5kbGVUb3VjaGVzQmVnaW4odG91Y2hlc1RvSGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJ0b3VjaG1vdmVcIjogZnVuY3Rpb24gKHRvdWNoZXNUb0hhbmRsZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmUG9pbnRlci5oYW5kbGVUb3VjaGVzTW92ZSh0b3VjaGVzVG9IYW5kbGUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJ0b3VjaGVuZFwiOiBmdW5jdGlvbiAodG91Y2hlc1RvSGFuZGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGZQb2ludGVyLmhhbmRsZVRvdWNoZXNFbmQodG91Y2hlc1RvSGFuZGxlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwidG91Y2hjYW5jZWxcIjogZnVuY3Rpb24gKHRvdWNoZXNUb0hhbmRsZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmUG9pbnRlci5oYW5kbGVUb3VjaGVzQ2FuY2VsKHRvdWNoZXNUb0hhbmRsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IHJlZ2lzdGVyVG91Y2hFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgaGFuZGxlciA9IF90b3VjaEV2ZW50c01hcFtldmVudE5hbWVdO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIChmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWV2ZW50LmNoYW5nZWRUb3VjaGVzKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGxldCBib2R5ID0gZG9jdW1lbnQuYm9keTtcblxuICAgICAgICAgICAgICAgICAgICBjYW52YXNCb3VuZGluZ1JlY3QuYWRqdXN0ZWRMZWZ0ID0gY2FudmFzQm91bmRpbmdSZWN0LmxlZnQgLSAoYm9keS5zY3JvbGxMZWZ0IHx8IHdpbmRvdy5zY3JvbGxYIHx8IDApO1xuICAgICAgICAgICAgICAgICAgICBjYW52YXNCb3VuZGluZ1JlY3QuYWRqdXN0ZWRUb3AgPSBjYW52YXNCb3VuZGluZ1JlY3QudG9wIC0gKGJvZHkuc2Nyb2xsVG9wIHx8IHdpbmRvdy5zY3JvbGxZIHx8IDApO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyKHNlbGZQb2ludGVyLmdldFRvdWNoZXNCeUV2ZW50KGV2ZW50LCBjYW52YXNCb3VuZGluZ1JlY3QpKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSksIGZhbHNlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCBldmVudE5hbWUgaW4gX3RvdWNoRXZlbnRzTWFwKSB7XG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJUb3VjaEV2ZW50KGV2ZW50TmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZWdpc3RlcktleWJvYXJkRXZlbnQoKTtcblxuICAgICAgICB0aGlzLl9pc1JlZ2lzdGVyRXZlbnQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBfcmVnaXN0ZXJLZXlib2FyZEV2ZW50ICgpIHt9LFxuXG4gICAgX3JlZ2lzdGVyQWNjZWxlcm9tZXRlckV2ZW50ICgpIHt9LFxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCB1cGRhdGVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHRcbiAgICAgKi9cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLl9hY2NlbEN1clRpbWUgPiB0aGlzLl9hY2NlbEludGVydmFsKSB7XG4gICAgICAgICAgICB0aGlzLl9hY2NlbEN1clRpbWUgLT0gdGhpcy5fYWNjZWxJbnRlcnZhbDtcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5kaXNwYXRjaEV2ZW50KG5ldyBjYy5FdmVudC5FdmVudEFjY2VsZXJhdGlvbih0aGlzLl9hY2NlbGVyYXRpb24pKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hY2NlbEN1clRpbWUgKz0gZHQ7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjYy5pbnRlcm5hbC5pbnB1dE1hbmFnZXIgPSBpbnB1dE1hbmFnZXI7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==