
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/event/system-event.js';
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
var EventTarget = require('../event/event-target');

var eventManager = require('../event-manager');

var inputManger = require('../platform/CCInputManager');

;
/**
 * !#en The event type supported by SystemEvent
 * !#zh SystemEvent 支持的事件类型
 * @class SystemEvent.EventType
 * @static
 * @namespace SystemEvent
 */

var EventType = cc.Enum({
  /**
   * !#en The event type for press the key down event, you can use its value directly: 'keydown'
   * !#zh 当按下按键时触发的事件
   * @property KEY_DOWN
   * @type {String}
   * @static
   */
  KEY_DOWN: 'keydown',

  /**
   * !#en The event type for press the key up event, you can use its value directly: 'keyup'
   * !#zh 当松开按键时触发的事件
   * @property KEY_UP
   * @type {String}
   * @static
   */
  KEY_UP: 'keyup',

  /**
   * !#en The event type for press the devicemotion event, you can use its value directly: 'devicemotion'
   * !#zh 重力感应
   * @property DEVICEMOTION
   * @type {String}
   * @static
   */
  DEVICEMOTION: 'devicemotion'
});
/**
 * !#en
 * The System event, it currently supports keyboard events and accelerometer events.<br>
 * You can get the SystemEvent instance with cc.systemEvent.<br>
 * !#zh
 * 系统事件，它目前支持按键事件和重力感应事件。<br>
 * 你可以通过 cc.systemEvent 获取到 SystemEvent 的实例。<br>
 * @class SystemEvent
 * @extends EventTarget
 * @example
 * cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
 * cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
 */

var keyboardListener = null;
var accelerationListener = null;
var SystemEvent = cc.Class({
  name: 'SystemEvent',
  "extends": EventTarget,
  statics: {
    EventType: EventType
  },

  /**
   * !#en whether enable accelerometer event
   * !#zh 是否启用加速度计事件
   * @method setAccelerometerEnabled
   * @param {Boolean} isEnable
   */
  setAccelerometerEnabled: function setAccelerometerEnabled(isEnable) {
    if (CC_EDITOR) {
      return;
    } // for iOS 13+


    if (isEnable && window.DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission().then(function (response) {
        console.log("Device Motion Event request permission: " + response);
        inputManger.setAccelerometerEnabled(response === 'granted');
      });
    } else {
      inputManger.setAccelerometerEnabled(isEnable);
    }
  },

  /**
   * !#en set accelerometer interval value
   * !#zh 设置加速度计间隔值
   * @method setAccelerometerInterval
   * @param {Number} interval
   */
  setAccelerometerInterval: function setAccelerometerInterval(interval) {
    if (CC_EDITOR) {
      return;
    }

    inputManger.setAccelerometerInterval(interval);
  },
  on: function on(type, callback, target, once) {
    if (CC_EDITOR) {
      return;
    }

    this._super(type, callback, target, once); // Keyboard


    if (type === EventType.KEY_DOWN || type === EventType.KEY_UP) {
      if (!keyboardListener) {
        keyboardListener = cc.EventListener.create({
          event: cc.EventListener.KEYBOARD,
          onKeyPressed: function onKeyPressed(keyCode, event) {
            event.type = EventType.KEY_DOWN;
            cc.systemEvent.dispatchEvent(event);
          },
          onKeyReleased: function onKeyReleased(keyCode, event) {
            event.type = EventType.KEY_UP;
            cc.systemEvent.dispatchEvent(event);
          }
        });
      }

      if (!eventManager.hasEventListener(cc.EventListener.ListenerID.KEYBOARD)) {
        eventManager.addListener(keyboardListener, 1);
      }
    } // Acceleration


    if (type === EventType.DEVICEMOTION) {
      if (!accelerationListener) {
        accelerationListener = cc.EventListener.create({
          event: cc.EventListener.ACCELERATION,
          callback: function callback(acc, event) {
            event.type = EventType.DEVICEMOTION;
            cc.systemEvent.dispatchEvent(event);
          }
        });
      }

      if (!eventManager.hasEventListener(cc.EventListener.ListenerID.ACCELERATION)) {
        eventManager.addListener(accelerationListener, 1);
      }
    }
  },
  off: function off(type, callback, target) {
    if (CC_EDITOR) {
      return;
    }

    this._super(type, callback, target); // Keyboard


    if (keyboardListener && (type === EventType.KEY_DOWN || type === EventType.KEY_UP)) {
      var hasKeyDownEventListener = this.hasEventListener(EventType.KEY_DOWN);
      var hasKeyUpEventListener = this.hasEventListener(EventType.KEY_UP);

      if (!hasKeyDownEventListener && !hasKeyUpEventListener) {
        eventManager.removeListener(keyboardListener);
      }
    } // Acceleration


    if (accelerationListener && type === EventType.DEVICEMOTION) {
      eventManager.removeListener(accelerationListener);
    }
  }
});
cc.SystemEvent = module.exports = SystemEvent;
/**
 * @module cc
 */

/**
 * !#en The System event singleton for global usage
 * !#zh 系统事件单例，方便全局使用
 * @property systemEvent
 * @type {SystemEvent}
 */

cc.systemEvent = new cc.SystemEvent();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2V2ZW50L3N5c3RlbS1ldmVudC5qcyJdLCJuYW1lcyI6WyJFdmVudFRhcmdldCIsInJlcXVpcmUiLCJldmVudE1hbmFnZXIiLCJpbnB1dE1hbmdlciIsIkV2ZW50VHlwZSIsImNjIiwiRW51bSIsIktFWV9ET1dOIiwiS0VZX1VQIiwiREVWSUNFTU9USU9OIiwia2V5Ym9hcmRMaXN0ZW5lciIsImFjY2VsZXJhdGlvbkxpc3RlbmVyIiwiU3lzdGVtRXZlbnQiLCJDbGFzcyIsIm5hbWUiLCJzdGF0aWNzIiwic2V0QWNjZWxlcm9tZXRlckVuYWJsZWQiLCJpc0VuYWJsZSIsIkNDX0VESVRPUiIsIndpbmRvdyIsIkRldmljZU1vdGlvbkV2ZW50IiwicmVxdWVzdFBlcm1pc3Npb24iLCJ0aGVuIiwicmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwic2V0QWNjZWxlcm9tZXRlckludGVydmFsIiwiaW50ZXJ2YWwiLCJvbiIsInR5cGUiLCJjYWxsYmFjayIsInRhcmdldCIsIm9uY2UiLCJfc3VwZXIiLCJFdmVudExpc3RlbmVyIiwiY3JlYXRlIiwiZXZlbnQiLCJLRVlCT0FSRCIsIm9uS2V5UHJlc3NlZCIsImtleUNvZGUiLCJzeXN0ZW1FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJvbktleVJlbGVhc2VkIiwiaGFzRXZlbnRMaXN0ZW5lciIsIkxpc3RlbmVySUQiLCJhZGRMaXN0ZW5lciIsIkFDQ0VMRVJBVElPTiIsImFjYyIsIm9mZiIsImhhc0tleURvd25FdmVudExpc3RlbmVyIiwiaGFzS2V5VXBFdmVudExpc3RlbmVyIiwicmVtb3ZlTGlzdGVuZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBSUEsV0FBVyxHQUFHQyxPQUFPLENBQUMsdUJBQUQsQ0FBekI7O0FBQ0EsSUFBSUMsWUFBWSxHQUFHRCxPQUFPLENBQUMs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SixJQUFaLEVBQWtCQyxRQUFsQixFQUE0QkMsTUFBNUIsRUFKbUMsQ0FNbkM7OztBQUNBLFFBQUlyQixnQkFBZ0IsS0FBS21CLElBQUksS0FBS3pCLFNBQVMsQ0FBQ0csUUFBbkIsSUFBK0JzQixJQUFJLEtBQUt6QixTQUFTLENBQUNJLE1BQXZELENBQXBCLEVBQW9GO0FBQ2hGLFVBQUl5Qyx1QkFBdUIsR0FBRyxLQUFLTixnQkFBTCxDQUFzQnZDLFNBQVMsQ0FBQ0csUUFBaEMsQ0FBOUI7QUFDQSxVQUFJMkMscUJBQXFCLEdBQUcsS0FBS1AsZ0JBQUwsQ0FBc0J2QyxTQUFTLENBQUNJLE1BQWhDLENBQTVCOztBQUNBLFVBQUksQ0FBQ3lDLHVCQUFELElBQTRCLENBQUNDLHFCQUFqQyxFQUF3RDtBQUNwRGhELFFBQUFBLFlBQVksQ0FBQ2lELGNBQWIsQ0FBNEJ6QyxnQkFBNUI7QUFDSDtBQUNKLEtBYmtDLENBZW5DOzs7QUFDQSxRQUFJQyxvQkFBb0IsSUFBSWtCLElBQUksS0FBS3pCLFNBQVMsQ0FBQ0ssWUFBL0MsRUFBNkQ7QUFDekRQLE1BQUFBLFlBQVksQ0FBQ2lELGNBQWIsQ0FBNEJ4QyxvQkFBNUI7QUFDSDtBQUNKO0FBMUdzQixDQUFULENBQWxCO0FBOEdBTixFQUFFLENBQUNPLFdBQUgsR0FBaUJ3QyxNQUFNLENBQUNDLE9BQVAsR0FBaUJ6QyxXQUFsQztBQUNBOzs7O0FBSUE7Ozs7Ozs7QUFNQVAsRUFBRSxDQUFDbUMsV0FBSCxHQUFpQixJQUFJbkMsRUFBRSxDQUFDTyxXQUFQLEVBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIgRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuLi9ldmVudC9ldmVudC10YXJnZXQnKTtcbnZhciBldmVudE1hbmFnZXIgPSByZXF1aXJlKCcuLi9ldmVudC1tYW5hZ2VyJyk7XG52YXIgaW5wdXRNYW5nZXIgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9DQ0lucHV0TWFuYWdlcicpOztcblxuLyoqXG4gKiAhI2VuIFRoZSBldmVudCB0eXBlIHN1cHBvcnRlZCBieSBTeXN0ZW1FdmVudFxuICogISN6aCBTeXN0ZW1FdmVudCDmlK/mjIHnmoTkuovku7bnsbvlnotcbiAqIEBjbGFzcyBTeXN0ZW1FdmVudC5FdmVudFR5cGVcbiAqIEBzdGF0aWNcbiAqIEBuYW1lc3BhY2UgU3lzdGVtRXZlbnRcbiAqL1xudmFyIEV2ZW50VHlwZSA9IGNjLkVudW0oe1xuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIHByZXNzIHRoZSBrZXkgZG93biBldmVudCwgeW91IGNhbiB1c2UgaXRzIHZhbHVlIGRpcmVjdGx5OiAna2V5ZG93bidcbiAgICAgKiAhI3poIOW9k+aMieS4i+aMiemUruaXtuinpuWPkeeahOS6i+S7tlxuICAgICAqIEBwcm9wZXJ0eSBLRVlfRE9XTlxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIEtFWV9ET1dOOiAna2V5ZG93bicsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgcHJlc3MgdGhlIGtleSB1cCBldmVudCwgeW91IGNhbiB1c2UgaXRzIHZhbHVlIGRpcmVjdGx5OiAna2V5dXAnXG4gICAgICogISN6aCDlvZPmnb7lvIDmjInplK7ml7bop6blj5HnmoTkuovku7ZcbiAgICAgKiBAcHJvcGVydHkgS0VZX1VQXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgS0VZX1VQOiAna2V5dXAnLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIHByZXNzIHRoZSBkZXZpY2Vtb3Rpb24gZXZlbnQsIHlvdSBjYW4gdXNlIGl0cyB2YWx1ZSBkaXJlY3RseTogJ2RldmljZW1vdGlvbidcbiAgICAgKiAhI3poIOmHjeWKm+aEn+W6lFxuICAgICAqIEBwcm9wZXJ0eSBERVZJQ0VNT1RJT05cbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBERVZJQ0VNT1RJT046ICdkZXZpY2Vtb3Rpb24nXG5cbn0pO1xuXG4vKipcbiAqICEjZW5cbiAqIFRoZSBTeXN0ZW0gZXZlbnQsIGl0IGN1cnJlbnRseSBzdXBwb3J0cyBrZXlib2FyZCBldmVudHMgYW5kIGFjY2VsZXJvbWV0ZXIgZXZlbnRzLjxicj5cbiAqIFlvdSBjYW4gZ2V0IHRoZSBTeXN0ZW1FdmVudCBpbnN0YW5jZSB3aXRoIGNjLnN5c3RlbUV2ZW50Ljxicj5cbiAqICEjemhcbiAqIOezu+e7n+S6i+S7tu+8jOWug+ebruWJjeaUr+aMgeaMiemUruS6i+S7tuWSjOmHjeWKm+aEn+W6lOS6i+S7tuOAgjxicj5cbiAqIOS9oOWPr+S7pemAmui/hyBjYy5zeXN0ZW1FdmVudCDojrflj5bliLAgU3lzdGVtRXZlbnQg55qE5a6e5L6L44CCPGJyPlxuICogQGNsYXNzIFN5c3RlbUV2ZW50XG4gKiBAZXh0ZW5kcyBFdmVudFRhcmdldFxuICogQGV4YW1wbGVcbiAqIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5ERVZJQ0VNT1RJT04sIHRoaXMub25EZXZpY2VNb3Rpb25FdmVudCwgdGhpcyk7XG4gKiBjYy5zeXN0ZW1FdmVudC5vZmYoY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLkRFVklDRU1PVElPTiwgdGhpcy5vbkRldmljZU1vdGlvbkV2ZW50LCB0aGlzKTtcbiAqL1xuXG52YXIga2V5Ym9hcmRMaXN0ZW5lciA9IG51bGw7XG52YXIgYWNjZWxlcmF0aW9uTGlzdGVuZXIgPSBudWxsO1xudmFyIFN5c3RlbUV2ZW50ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdTeXN0ZW1FdmVudCcsXG4gICAgZXh0ZW5kczogRXZlbnRUYXJnZXQsXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIEV2ZW50VHlwZTogRXZlbnRUeXBlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gd2hldGhlciBlbmFibGUgYWNjZWxlcm9tZXRlciBldmVudFxuICAgICAqICEjemgg5piv5ZCm5ZCv55So5Yqg6YCf5bqm6K6h5LqL5Lu2XG4gICAgICogQG1ldGhvZCBzZXRBY2NlbGVyb21ldGVyRW5hYmxlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNFbmFibGVcbiAgICAgKi9cbiAgICBzZXRBY2NlbGVyb21ldGVyRW5hYmxlZDogZnVuY3Rpb24gKGlzRW5hYmxlKSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZvciBpT1MgMTMrXG4gICAgICAgIGlmIChpc0VuYWJsZSAmJiB3aW5kb3cuRGV2aWNlTW90aW9uRXZlbnQgJiYgdHlwZW9mIERldmljZU1vdGlvbkV2ZW50LnJlcXVlc3RQZXJtaXNzaW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBEZXZpY2VNb3Rpb25FdmVudC5yZXF1ZXN0UGVybWlzc2lvbigpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEZXZpY2UgTW90aW9uIEV2ZW50IHJlcXVlc3QgcGVybWlzc2lvbjogJHtyZXNwb25zZX1gKTtcbiAgICAgICAgICAgICAgICBpbnB1dE1hbmdlci5zZXRBY2NlbGVyb21ldGVyRW5hYmxlZChyZXNwb25zZSA9PT0gJ2dyYW50ZWQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5wdXRNYW5nZXIuc2V0QWNjZWxlcm9tZXRlckVuYWJsZWQoaXNFbmFibGUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gc2V0IGFjY2VsZXJvbWV0ZXIgaW50ZXJ2YWwgdmFsdWVcbiAgICAgKiAhI3poIOiuvue9ruWKoOmAn+W6puiuoemXtOmalOWAvFxuICAgICAqIEBtZXRob2Qgc2V0QWNjZWxlcm9tZXRlckludGVydmFsXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGludGVydmFsXG4gICAgICovXG4gICAgc2V0QWNjZWxlcm9tZXRlckludGVydmFsOiBmdW5jdGlvbihpbnRlcnZhbCkge1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXRNYW5nZXIuc2V0QWNjZWxlcm9tZXRlckludGVydmFsKGludGVydmFsKTtcbiAgICB9LFxuXG4gICAgb246IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCBvbmNlKSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdXBlcih0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCBvbmNlKTtcblxuICAgICAgICAvLyBLZXlib2FyZFxuICAgICAgICBpZiAodHlwZSA9PT0gRXZlbnRUeXBlLktFWV9ET1dOIHx8IHR5cGUgPT09IEV2ZW50VHlwZS5LRVlfVVApIHtcbiAgICAgICAgICAgIGlmICgha2V5Ym9hcmRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIGtleWJvYXJkTGlzdGVuZXIgPSBjYy5FdmVudExpc3RlbmVyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLktFWUJPQVJELFxuICAgICAgICAgICAgICAgICAgICBvbktleVByZXNzZWQ6IGZ1bmN0aW9uIChrZXlDb2RlLCBldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQudHlwZSA9IEV2ZW50VHlwZS5LRVlfRE9XTjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvbktleVJlbGVhc2VkOiBmdW5jdGlvbiAoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnR5cGUgPSBFdmVudFR5cGUuS0VZX1VQO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZXZlbnRNYW5hZ2VyLmhhc0V2ZW50TGlzdGVuZXIoY2MuRXZlbnRMaXN0ZW5lci5MaXN0ZW5lcklELktFWUJPQVJEKSkge1xuICAgICAgICAgICAgICAgIGV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcihrZXlib2FyZExpc3RlbmVyLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFjY2VsZXJhdGlvblxuICAgICAgICBpZiAodHlwZSA9PT0gRXZlbnRUeXBlLkRFVklDRU1PVElPTikge1xuICAgICAgICAgICAgaWYgKCFhY2NlbGVyYXRpb25MaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIGFjY2VsZXJhdGlvbkxpc3RlbmVyID0gY2MuRXZlbnRMaXN0ZW5lci5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5BQ0NFTEVSQVRJT04sXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoYWNjLCBldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQudHlwZSA9IEV2ZW50VHlwZS5ERVZJQ0VNT1RJT047XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFldmVudE1hbmFnZXIuaGFzRXZlbnRMaXN0ZW5lcihjYy5FdmVudExpc3RlbmVyLkxpc3RlbmVySUQuQUNDRUxFUkFUSU9OKSkge1xuICAgICAgICAgICAgICAgIGV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcihhY2NlbGVyYXRpb25MaXN0ZW5lciwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgICBvZmY6IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdXBlcih0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KTtcblxuICAgICAgICAvLyBLZXlib2FyZFxuICAgICAgICBpZiAoa2V5Ym9hcmRMaXN0ZW5lciAmJiAodHlwZSA9PT0gRXZlbnRUeXBlLktFWV9ET1dOIHx8IHR5cGUgPT09IEV2ZW50VHlwZS5LRVlfVVApKSB7XG4gICAgICAgICAgICB2YXIgaGFzS2V5RG93bkV2ZW50TGlzdGVuZXIgPSB0aGlzLmhhc0V2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLktFWV9ET1dOKTtcbiAgICAgICAgICAgIHZhciBoYXNLZXlVcEV2ZW50TGlzdGVuZXIgPSB0aGlzLmhhc0V2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLktFWV9VUCk7XG4gICAgICAgICAgICBpZiAoIWhhc0tleURvd25FdmVudExpc3RlbmVyICYmICFoYXNLZXlVcEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIoa2V5Ym9hcmRMaXN0ZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBY2NlbGVyYXRpb25cbiAgICAgICAgaWYgKGFjY2VsZXJhdGlvbkxpc3RlbmVyICYmIHR5cGUgPT09IEV2ZW50VHlwZS5ERVZJQ0VNT1RJT04pIHtcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcihhY2NlbGVyYXRpb25MaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pO1xuXG5jYy5TeXN0ZW1FdmVudCA9IG1vZHVsZS5leHBvcnRzID0gU3lzdGVtRXZlbnQ7XG4vKipcbiAqIEBtb2R1bGUgY2NcbiAqL1xuXG4vKipcbiAqICEjZW4gVGhlIFN5c3RlbSBldmVudCBzaW5nbGV0b24gZm9yIGdsb2JhbCB1c2FnZVxuICogISN6aCDns7vnu5/kuovku7bljZXkvovvvIzmlrnkvr/lhajlsYDkvb/nlKhcbiAqIEBwcm9wZXJ0eSBzeXN0ZW1FdmVudFxuICogQHR5cGUge1N5c3RlbUV2ZW50fVxuICovXG5jYy5zeXN0ZW1FdmVudCA9IG5ldyBjYy5TeXN0ZW1FdmVudCgpO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=