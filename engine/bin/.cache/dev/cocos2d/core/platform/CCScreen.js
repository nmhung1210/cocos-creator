
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCScreen.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
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

/**
 * The fullscreen API provides an easy way for web content to be presented using the user's entire screen.
 * It's invalid on safari, QQbrowser and android browser
 * @class screen
 */
cc.screen =
/** @lends cc.screen# */
{
  _supportsFullScreen: false,
  _onfullscreenchange: null,
  _onfullscreenerror: null,
  // the pre fullscreenchange function
  _preOnFullScreenChange: null,
  _preOnFullScreenError: null,
  _preOnTouch: null,
  _touchEvent: "",
  _fn: null,
  // Function mapping for cross browser support
  _fnMap: [['requestFullscreen', 'exitFullscreen', 'fullscreenchange', 'fullscreenEnabled', 'fullscreenElement', 'fullscreenerror'], ['requestFullScreen', 'exitFullScreen', 'fullScreenchange', 'fullScreenEnabled', 'fullScreenElement', 'fullscreenerror'], ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitIsFullScreen', 'webkitCurrentFullScreenElement', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozfullscreenchange', 'mozFullScreen', 'mozFullScreenElement', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'MSFullscreenChange', 'msFullscreenEnabled', 'msFullscreenElement', 'msfullscreenerror']],

  /**
   * initialize
   * @method init
   */
  init: function init() {
    this._fn = {};
    var i,
        l,
        val,
        map = this._fnMap,
        valL;

    for (i = 0, l = map.length; i < l; i++) {
      val = map[i];

      if (val && typeof document[val[1]] !== 'undefined') {
        for (i = 0, valL = val.length; i < valL; i++) {
          this._fn[map[0][i]] = val[i];
        }

        break;
      }
    }

    this._supportsFullScreen = this._fn.requestFullscreen !== undefined; // Bug fix only for v2.1, don't merge into v2.0
    // In v2.0, screen touchend events conflict with editBox touchend events if it's not stayOnTop.
    // While in v2.1, editBox always keep stayOnTop and it doesn't support touchend events.

    this._touchEvent = 'ontouchend' in window ? 'touchend' : 'mousedown';
  },

  /**
   * return true if it's full now.
   * @method fullScreen
   * @returns {Boolean}
   */
  fullScreen: function fullScreen() {
    if (!this._supportsFullScreen) return false;else if (!document[this._fn.fullscreenElement] && !document[this._fn.webkitFullscreenElement] && !document[this._fn.mozFullScreenElement]) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * change the screen to full mode.
   * @method requestFullScreen
   * @param {Element} element
   * @param {Function} onFullScreenChange
   * @param {Function} onFullScreenError
   */
  requestFullScreen: function requestFullScreen(element, onFullScreenChange, onFullScreenError) {
    if (element && element.tagName.toLowerCase() === "video") {
      if (cc.sys.os === cc.sys.OS_IOS && cc.sys.isBrowser && element.readyState > 0) {
        element.webkitEnterFullscreen && element.webkitEnterFullscreen();
        return;
      } else {
        element.setAttribute("x5-video-player-fullscreen", "true");
      }
    }

    if (!this._supportsFullScreen) {
      return;
    }

    element = element || document.documentElement;

    if (onFullScreenChange) {
      var eventName = this._fn.fullscreenchange;

      if (this._onfullscreenchange) {
        document.removeEventListener(eventName, this._onfullscreenchange);
      }

      this._onfullscreenchange = onFullScreenChange;
      document.addEventListener(eventName, onFullScreenChange, false);
    }

    if (onFullScreenError) {
      var _eventName = this._fn.fullscreenerror;

      if (this._onfullscreenerror) {
        document.removeEventListener(_eventName, this._onfullscreenerror);
      }

      this._onfullscreenerror = onFullScreenError;
      document.addEventListener(_eventName, onFullScreenError, {
        once: true
      });
    }

    var requestPromise = element[this._fn.requestFullscreen](); // the requestFullscreen API can only be initiated by user gesture.


    if (typeof document[this._fn.fullscreenerror] === 'undefined' && window.Promise && requestPromise instanceof Promise) {
      requestPromise["catch"](function (err) {// do nothing ... 
      });
    }
  },

  /**
   * exit the full mode.
   * @method exitFullScreen
   * @return {Boolean}
   */
  exitFullScreen: function exitFullScreen(element) {
    if (element && element.tagName.toLowerCase() === "video") {
      if (cc.sys.os === cc.sys.OS_IOS && cc.sys.isBrowser) {
        element.webkitExitFullscreen && element.webkitExitFullscreen();
        return;
      } else {
        element.setAttribute("x5-video-player-fullscreen", "false");
      }
    }

    return this._supportsFullScreen ? document[this._fn.exitFullscreen]() : true;
  },

  /**
   * Automatically request full screen with a touch/click event
   * @method autoFullScreen
   * @param {Element} element
   * @param {Function} onFullScreenChange
   */
  autoFullScreen: function autoFullScreen(element, onFullScreenChange) {
    element = element || document.body;

    this._ensureFullScreen(element, onFullScreenChange);

    this.requestFullScreen(element, onFullScreenChange);
  },
  disableAutoFullScreen: function disableAutoFullScreen(element) {
    var touchTarget = cc.game.canvas || element;
    var touchEventName = this._touchEvent;

    if (this._preOnTouch) {
      touchTarget.removeEventListener(touchEventName, this._preOnTouch);
      this._preOnTouch = null;
    }
  },
  // Register touch event if request full screen failed
  _ensureFullScreen: function _ensureFullScreen(element, onFullScreenChange) {
    var self = this;
    var touchTarget = cc.game.canvas || element;
    var fullScreenErrorEventName = this._fn.fullscreenerror;
    var touchEventName = this._touchEvent;

    function onFullScreenError() {
      self._preOnFullScreenError = null; // handle touch event listener

      function onTouch() {
        self._preOnTouch = null;
        self.requestFullScreen(element, onFullScreenChange);
      }

      if (self._preOnTouch) {
        touchTarget.removeEventListener(touchEventName, self._preOnTouch);
      }

      self._preOnTouch = onTouch;
      touchTarget.addEventListener(touchEventName, self._preOnTouch, {
        once: true
      });
    } // handle full screen error


    if (this._preOnFullScreenError) {
      element.removeEventListener(fullScreenErrorEventName, this._preOnFullScreenError);
    }

    this._preOnFullScreenError = onFullScreenError;
    element.addEventListener(fullScreenErrorEventName, onFullScreenError, {
      once: true
    });
  }
};
cc.screen.init();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL0NDU2NyZWVuLmpzIl0sIm5hbWVzIjpbImNjIiwic2NyZWVuIiwiX3N1cHBvcnRzRnVsbFNjcmVlbiIsIl9vbmZ1bGxzY3JlZW5jaGFuZ2UiLCJfb25mdWxsc2NyZWVuZXJyb3IiLCJfcHJlT25GdWxsU2NyZWVuQ2hhbmdlIiwiX3ByZU9uRnVsbFNjcmVlbkVycm9yIiwiX3ByZU9uVG91Y2giLCJfdG91Y2hFdmVudCIsIl9mbiIsIl9mbk1hcCIsImluaXQiLCJpIiwibCIsInZhbCIsIm1hcCIsInZhbEwiLCJsZW5ndGgiLCJkb2N1bWVudCIsInJlcXVlc3RGdWxsc2NyZWVuIiwidW5kZWZpbmVkIiwid2luZG93IiwiZnVsbFNjcmVlbiIsImZ1bGxzY3JlZW5FbGVtZW50Iiwid2Via2l0RnVsbHNjcmVlbkVsZW1lbnQiLCJtb3pGdWxsU2NyZWVuRWxlbWVudCIsInJlcXVlc3RGdWxsU2NyZWVuIiwiZWxlbWVudCIsIm9uRnVsbFNjcmVlbkNoYW5nZSIsIm9uRnVsbFNjcmVlbkVycm9yIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwic3lzIiwib3MiLCJPU19JT1MiLCJpc0Jyb3dzZXIiLCJyZWFkeVN0YXRlIiwid2Via2l0RW50ZXJGdWxsc2NyZWVuIiwic2V0QXR0cmlidXRlIiwiZG9jdW1lbnRFbGVtZW50IiwiZXZlbnROYW1lIiwiZnVsbHNjcmVlbmNoYW5nZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZnVsbHNjcmVlbmVycm9yIiwib25jZSIsInJlcXVlc3RQcm9taXNlIiwiUHJvbWlzZSIsImVyciIsImV4aXRGdWxsU2NyZWVuIiwid2Via2l0RXhpdEZ1bGxzY3JlZW4iLCJleGl0RnVsbHNjcmVlbiIsImF1dG9GdWxsU2NyZWVuIiwiYm9keSIsIl9lbnN1cmVGdWxsU2NyZWVuIiwiZGlzYWJsZUF1dG9GdWxsU2NyZWVuIiwidG91Y2hUYXJnZXQiLCJnYW1lIiwiY2FudmFzIiwidG91Y2hFdmVudE5hbWUiLCJzZWxmIiwiZnVsbFNjcmVlbkVycm9yRXZlbnROYW1lIiwib25Ub3VjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkE7Ozs7O0FBS0FBLEVBQUUsQ0FBQ0MsTUFBSDtBQUFZO0FBQXdCO0FBQ2hDQyxFQUFBQSxtQkFBbUIsRUFBRSxLQURXO0FBRWhDQyxFQUFBQSxtQkFBbUIsRUFBRSxJQUZXO0FBR2hDQyxFQUFBQSxrQkFBa0IsRUFBRSxJQUhZO0FBSWhDO0FBQ0FDLEVBQUFBLHNCQUFzQixFQUFFLElBTFE7QUFNaENDLEVBQUFBLHFCQUFxQixFQUFFLElBTlM7QUFPaENDLEVBQUFBLFdBQVcsRUFBRSxJQVBtQjtBQVFoQ0MsRUFBQUEsV0FBVyxFQUFFLEVBUm1CO0FBU2hDQyxFQUFBQSxHQUFHLEVBQUUsSUFUMkI7QUFVaEM7QUFDQUMsRUFBQUEsTUFBTSxFQUFFLENBQ0osQ0FDSSxtQkFESixFQUVJLGdCQUZKLEVBR0ksa0JBSEosRUFJSSxtQkFKSixFQUtJLG1CQUxKLEVBTUksaUJBTkosQ0FESSxFQVNKLENBQ0ksbUJBREosRUFFSSxnQkFGSixFQUdJLGtCQUhKLEVBSUksbUJBSkosRUFLSSxtQkFMSixFQU1JLGlCQU5KLENBVEksRUFpQkosQ0FDSSx5QkFESixFQUVJLHdCQUZKLEVBR0ksd0JBSEosRUFJSSxvQkFKSixFQUtJLGdDQUxKLEVBTUksdUJBTkosQ0FqQkksRUF5QkosQ0FDSSxzQkFESixFQUVJLHFCQUZKLEVBR0kscUJBSEosRUFJSSxlQUpKLEVBS0ksc0JBTEosRUFNSSxvQkFOSixDQXpCSSxFQWlDSixDQUNJLHFCQURKLEVBRUksa0JBRkosRUFHSSxvQkFISixFQUlJLHFCQUpKLEVBS0kscUJBTEosRUFNSSxtQkFOSixDQWpDSSxDQVh3Qjs7QUFzRGhDOzs7O0FBSUFDLEVBQUFBLElBQUksRUFBRSxnQkFBWTtBQUNkLFNBQUtGLEdBQUwsR0FBVyxFQUFYO0FB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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDA4LTIwMTAgUmljYXJkbyBRdWVzYWRhXG4gQ29weXJpZ2h0IChjKSAyMDExLTIwMTIgY29jb3MyZC14Lm9yZ1xuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cbiBcbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcbiBcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiBcbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuIFxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogVGhlIGZ1bGxzY3JlZW4gQVBJIHByb3ZpZGVzIGFuIGVhc3kgd2F5IGZvciB3ZWIgY29udGVudCB0byBiZSBwcmVzZW50ZWQgdXNpbmcgdGhlIHVzZXIncyBlbnRpcmUgc2NyZWVuLlxuICogSXQncyBpbnZhbGlkIG9uIHNhZmFyaSwgUVFicm93c2VyIGFuZCBhbmRyb2lkIGJyb3dzZXJcbiAqIEBjbGFzcyBzY3JlZW5cbiAqL1xuY2Muc2NyZWVuID0gLyoqIEBsZW5kcyBjYy5zY3JlZW4jICove1xuICAgIF9zdXBwb3J0c0Z1bGxTY3JlZW46IGZhbHNlLFxuICAgIF9vbmZ1bGxzY3JlZW5jaGFuZ2U6IG51bGwsXG4gICAgX29uZnVsbHNjcmVlbmVycm9yOiBudWxsLFxuICAgIC8vIHRoZSBwcmUgZnVsbHNjcmVlbmNoYW5nZSBmdW5jdGlvblxuICAgIF9wcmVPbkZ1bGxTY3JlZW5DaGFuZ2U6IG51bGwsXG4gICAgX3ByZU9uRnVsbFNjcmVlbkVycm9yOiBudWxsLFxuICAgIF9wcmVPblRvdWNoOiBudWxsLFxuICAgIF90b3VjaEV2ZW50OiBcIlwiLFxuICAgIF9mbjogbnVsbCxcbiAgICAvLyBGdW5jdGlvbiBtYXBwaW5nIGZvciBjcm9zcyBicm93c2VyIHN1cHBvcnRcbiAgICBfZm5NYXA6IFtcbiAgICAgICAgW1xuICAgICAgICAgICAgJ3JlcXVlc3RGdWxsc2NyZWVuJyxcbiAgICAgICAgICAgICdleGl0RnVsbHNjcmVlbicsXG4gICAgICAgICAgICAnZnVsbHNjcmVlbmNoYW5nZScsXG4gICAgICAgICAgICAnZnVsbHNjcmVlbkVuYWJsZWQnLFxuICAgICAgICAgICAgJ2Z1bGxzY3JlZW5FbGVtZW50JyxcbiAgICAgICAgICAgICdmdWxsc2NyZWVuZXJyb3InLFxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgICAncmVxdWVzdEZ1bGxTY3JlZW4nLFxuICAgICAgICAgICAgJ2V4aXRGdWxsU2NyZWVuJyxcbiAgICAgICAgICAgICdmdWxsU2NyZWVuY2hhbmdlJyxcbiAgICAgICAgICAgICdmdWxsU2NyZWVuRW5hYmxlZCcsXG4gICAgICAgICAgICAnZnVsbFNjcmVlbkVsZW1lbnQnLFxuICAgICAgICAgICAgJ2Z1bGxzY3JlZW5lcnJvcicsXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgICd3ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbicsXG4gICAgICAgICAgICAnd2Via2l0Q2FuY2VsRnVsbFNjcmVlbicsXG4gICAgICAgICAgICAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsXG4gICAgICAgICAgICAnd2Via2l0SXNGdWxsU2NyZWVuJyxcbiAgICAgICAgICAgICd3ZWJraXRDdXJyZW50RnVsbFNjcmVlbkVsZW1lbnQnLFxuICAgICAgICAgICAgJ3dlYmtpdGZ1bGxzY3JlZW5lcnJvcicsXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgICdtb3pSZXF1ZXN0RnVsbFNjcmVlbicsXG4gICAgICAgICAgICAnbW96Q2FuY2VsRnVsbFNjcmVlbicsXG4gICAgICAgICAgICAnbW96ZnVsbHNjcmVlbmNoYW5nZScsXG4gICAgICAgICAgICAnbW96RnVsbFNjcmVlbicsXG4gICAgICAgICAgICAnbW96RnVsbFNjcmVlbkVsZW1lbnQnLFxuICAgICAgICAgICAgJ21vemZ1bGxzY3JlZW5lcnJvcicsXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgICdtc1JlcXVlc3RGdWxsc2NyZWVuJyxcbiAgICAgICAgICAgICdtc0V4aXRGdWxsc2NyZWVuJyxcbiAgICAgICAgICAgICdNU0Z1bGxzY3JlZW5DaGFuZ2UnLFxuICAgICAgICAgICAgJ21zRnVsbHNjcmVlbkVuYWJsZWQnLFxuICAgICAgICAgICAgJ21zRnVsbHNjcmVlbkVsZW1lbnQnLFxuICAgICAgICAgICAgJ21zZnVsbHNjcmVlbmVycm9yJyxcbiAgICAgICAgXVxuICAgIF0sXG4gICAgXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZVxuICAgICAqIEBtZXRob2QgaW5pdFxuICAgICAqL1xuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZm4gPSB7fTtcbiAgICAgICAgdmFyIGksIGwsIHZhbCwgbWFwID0gdGhpcy5fZm5NYXAsIHZhbEw7XG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBtYXAubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB2YWwgPSBtYXBbaV07XG4gICAgICAgICAgICBpZiAodmFsICYmICh0eXBlb2YgZG9jdW1lbnRbdmFsWzFdXSAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgdmFsTCA9IHZhbC5sZW5ndGg7IGkgPCB2YWxMOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZm5bbWFwWzBdW2ldXSA9IHZhbFtpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zdXBwb3J0c0Z1bGxTY3JlZW4gPSAodGhpcy5fZm4ucmVxdWVzdEZ1bGxzY3JlZW4gIT09IHVuZGVmaW5lZCk7XG5cbiAgICAgICAgLy8gQnVnIGZpeCBvbmx5IGZvciB2Mi4xLCBkb24ndCBtZXJnZSBpbnRvIHYyLjBcbiAgICAgICAgLy8gSW4gdjIuMCwgc2NyZWVuIHRvdWNoZW5kIGV2ZW50cyBjb25mbGljdCB3aXRoIGVkaXRCb3ggdG91Y2hlbmQgZXZlbnRzIGlmIGl0J3Mgbm90IHN0YXlPblRvcC5cbiAgICAgICAgLy8gV2hpbGUgaW4gdjIuMSwgZWRpdEJveCBhbHdheXMga2VlcCBzdGF5T25Ub3AgYW5kIGl0IGRvZXNuJ3Qgc3VwcG9ydCB0b3VjaGVuZCBldmVudHMuXG4gICAgICAgIHRoaXMuX3RvdWNoRXZlbnQgPSAoJ29udG91Y2hlbmQnIGluIHdpbmRvdykgPyAndG91Y2hlbmQnIDogJ21vdXNlZG93bic7XG4gICAgfSxcbiAgICBcbiAgICAvKipcbiAgICAgKiByZXR1cm4gdHJ1ZSBpZiBpdCdzIGZ1bGwgbm93LlxuICAgICAqIEBtZXRob2QgZnVsbFNjcmVlblxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGZ1bGxTY3JlZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zdXBwb3J0c0Z1bGxTY3JlZW4pIHJldHVybiBmYWxzZTtcbiAgICAgICAgZWxzZSBpZiAoIWRvY3VtZW50W3RoaXMuX2ZuLmZ1bGxzY3JlZW5FbGVtZW50XSAmJiAhZG9jdW1lbnRbdGhpcy5fZm4ud2Via2l0RnVsbHNjcmVlbkVsZW1lbnRdICYmICFkb2N1bWVudFt0aGlzLl9mbi5tb3pGdWxsU2NyZWVuRWxlbWVudF0pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICAvKipcbiAgICAgKiBjaGFuZ2UgdGhlIHNjcmVlbiB0byBmdWxsIG1vZGUuXG4gICAgICogQG1ldGhvZCByZXF1ZXN0RnVsbFNjcmVlblxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uRnVsbFNjcmVlbkNoYW5nZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uRnVsbFNjcmVlbkVycm9yXG4gICAgICovXG4gICAgcmVxdWVzdEZ1bGxTY3JlZW46IGZ1bmN0aW9uIChlbGVtZW50LCBvbkZ1bGxTY3JlZW5DaGFuZ2UsIG9uRnVsbFNjcmVlbkVycm9yKSB7XG4gICAgICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInZpZGVvXCIpIHtcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19JT1MgJiYgY2Muc3lzLmlzQnJvd3NlciAmJiBlbGVtZW50LnJlYWR5U3RhdGUgPiAwKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC53ZWJraXRFbnRlckZ1bGxzY3JlZW4gJiYgZWxlbWVudC53ZWJraXRFbnRlckZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcIng1LXZpZGVvLXBsYXllci1mdWxsc2NyZWVuXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fc3VwcG9ydHNGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50ID0gZWxlbWVudCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKG9uRnVsbFNjcmVlbkNoYW5nZSkge1xuICAgICAgICAgICAgbGV0IGV2ZW50TmFtZSA9IHRoaXMuX2ZuLmZ1bGxzY3JlZW5jaGFuZ2U7XG4gICAgICAgICAgICBpZiAodGhpcy5fb25mdWxsc2NyZWVuY2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHRoaXMuX29uZnVsbHNjcmVlbmNoYW5nZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9vbmZ1bGxzY3JlZW5jaGFuZ2UgPSBvbkZ1bGxTY3JlZW5DaGFuZ2U7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgb25GdWxsU2NyZWVuQ2hhbmdlLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9uRnVsbFNjcmVlbkVycm9yKSB7XG4gICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gdGhpcy5fZm4uZnVsbHNjcmVlbmVycm9yO1xuICAgICAgICAgICAgaWYgKHRoaXMuX29uZnVsbHNjcmVlbmVycm9yKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHRoaXMuX29uZnVsbHNjcmVlbmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX29uZnVsbHNjcmVlbmVycm9yID0gb25GdWxsU2NyZWVuRXJyb3I7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgb25GdWxsU2NyZWVuRXJyb3IsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXF1ZXN0UHJvbWlzZSA9IGVsZW1lbnRbdGhpcy5fZm4ucmVxdWVzdEZ1bGxzY3JlZW5dKCk7XG4gICAgICAgIC8vIHRoZSByZXF1ZXN0RnVsbHNjcmVlbiBBUEkgY2FuIG9ubHkgYmUgaW5pdGlhdGVkIGJ5IHVzZXIgZ2VzdHVyZS5cbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudFt0aGlzLl9mbi5mdWxsc2NyZWVuZXJyb3JdID09PSAndW5kZWZpbmVkJyBcbiAgICAgICAgICAgICYmIHdpbmRvdy5Qcm9taXNlICYmIHJlcXVlc3RQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgcmVxdWVzdFByb21pc2UuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmcgLi4uIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIC8qKlxuICAgICAqIGV4aXQgdGhlIGZ1bGwgbW9kZS5cbiAgICAgKiBAbWV0aG9kIGV4aXRGdWxsU2NyZWVuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBleGl0RnVsbFNjcmVlbjogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwidmlkZW9cIikge1xuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0lPUyAmJiBjYy5zeXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbiAmJiBlbGVtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ4NS12aWRlby1wbGF5ZXItZnVsbHNjcmVlblwiLCBcImZhbHNlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdXBwb3J0c0Z1bGxTY3JlZW4gPyBkb2N1bWVudFt0aGlzLl9mbi5leGl0RnVsbHNjcmVlbl0oKSA6IHRydWU7XG4gICAgfSxcbiAgICBcbiAgICAvKipcbiAgICAgKiBBdXRvbWF0aWNhbGx5IHJlcXVlc3QgZnVsbCBzY3JlZW4gd2l0aCBhIHRvdWNoL2NsaWNrIGV2ZW50XG4gICAgICogQG1ldGhvZCBhdXRvRnVsbFNjcmVlblxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uRnVsbFNjcmVlbkNoYW5nZVxuICAgICAqL1xuICAgIGF1dG9GdWxsU2NyZWVuOiBmdW5jdGlvbiAoZWxlbWVudCwgb25GdWxsU2NyZWVuQ2hhbmdlKSB7XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50IHx8IGRvY3VtZW50LmJvZHk7XG5cbiAgICAgICAgdGhpcy5fZW5zdXJlRnVsbFNjcmVlbihlbGVtZW50LCBvbkZ1bGxTY3JlZW5DaGFuZ2UpO1xuICAgICAgICB0aGlzLnJlcXVlc3RGdWxsU2NyZWVuKGVsZW1lbnQsIG9uRnVsbFNjcmVlbkNoYW5nZSk7XG4gICAgfSxcblxuICAgIGRpc2FibGVBdXRvRnVsbFNjcmVlbiAoZWxlbWVudCkge1xuICAgICAgICBsZXQgdG91Y2hUYXJnZXQgPSBjYy5nYW1lLmNhbnZhcyB8fCBlbGVtZW50O1xuICAgICAgICBsZXQgdG91Y2hFdmVudE5hbWUgPSB0aGlzLl90b3VjaEV2ZW50O1xuICAgICAgICBpZiAodGhpcy5fcHJlT25Ub3VjaCkge1xuICAgICAgICAgICAgdG91Y2hUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50TmFtZSwgdGhpcy5fcHJlT25Ub3VjaCk7XG4gICAgICAgICAgICB0aGlzLl9wcmVPblRvdWNoID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBSZWdpc3RlciB0b3VjaCBldmVudCBpZiByZXF1ZXN0IGZ1bGwgc2NyZWVuIGZhaWxlZFxuICAgIF9lbnN1cmVGdWxsU2NyZWVuIChlbGVtZW50LCBvbkZ1bGxTY3JlZW5DaGFuZ2UpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgdG91Y2hUYXJnZXQgPSBjYy5nYW1lLmNhbnZhcyB8fCBlbGVtZW50O1xuICAgICAgICBsZXQgZnVsbFNjcmVlbkVycm9yRXZlbnROYW1lID0gdGhpcy5fZm4uZnVsbHNjcmVlbmVycm9yO1xuICAgICAgICBsZXQgdG91Y2hFdmVudE5hbWUgPSB0aGlzLl90b3VjaEV2ZW50O1xuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gb25GdWxsU2NyZWVuRXJyb3IgKCkge1xuICAgICAgICAgICAgc2VsZi5fcHJlT25GdWxsU2NyZWVuRXJyb3IgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgdG91Y2ggZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uVG91Y2goKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fcHJlT25Ub3VjaCA9IG51bGw7XG4gICAgICAgICAgICAgICAgc2VsZi5yZXF1ZXN0RnVsbFNjcmVlbihlbGVtZW50LCBvbkZ1bGxTY3JlZW5DaGFuZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGYuX3ByZU9uVG91Y2gpIHtcbiAgICAgICAgICAgICAgICB0b3VjaFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnROYW1lLCBzZWxmLl9wcmVPblRvdWNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuX3ByZU9uVG91Y2ggPSBvblRvdWNoO1xuICAgICAgICAgICAgdG91Y2hUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50TmFtZSwgc2VsZi5fcHJlT25Ub3VjaCwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGFuZGxlIGZ1bGwgc2NyZWVuIGVycm9yXG4gICAgICAgIGlmICh0aGlzLl9wcmVPbkZ1bGxTY3JlZW5FcnJvcikge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGZ1bGxTY3JlZW5FcnJvckV2ZW50TmFtZSwgdGhpcy5fcHJlT25GdWxsU2NyZWVuRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ByZU9uRnVsbFNjcmVlbkVycm9yID0gb25GdWxsU2NyZWVuRXJyb3I7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihmdWxsU2NyZWVuRXJyb3JFdmVudE5hbWUsIG9uRnVsbFNjcmVlbkVycm9yLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfSxcbn07XG5jYy5zY3JlZW4uaW5pdCgpO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=