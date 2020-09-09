
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/spine/track-entry-listeners.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
var TrackEntryListeners = function TrackEntryListeners() {
  this.start = null;
  this.end = null;
  this.complete = null;
  this.event = null;
  this.interrupt = null;
  this.dispose = null;
};

TrackEntryListeners.getListeners = function (entry) {
  if (!entry.listener) {
    entry.listener = new TrackEntryListeners();
  }

  return entry.listener;
};

module.exports = TrackEntryListeners;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvZXh0ZW5zaW9ucy9zcGluZS90cmFjay1lbnRyeS1saXN0ZW5lcnMuanMiXSwibmFtZXMiOlsiVHJhY2tFbnRyeUxpc3RlbmVycyIsInN0YXJ0IiwiZW5kIiwiY29tcGxldGUiLCJldmVudCIsImludGVycnVwdCIsImRpc3Bvc2UiLCJnZXRMaXN0ZW5lcnMiLCJlbnRyeSIsImxpc3RlbmVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBSUEsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixHQUFZO0FBQ2xDLE9BQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0EsT0FBS0MsR0FBTCxHQUFXLElBQVg7QUFDQSxPQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsT0FBS0MsS0FBTCxHQUFhLElBQWI7QUFDQSxPQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsT0FBS0MsT0FBTCxHQUFlLElBQWY7QUFDSCxDQVBEOztBQVNBTixtQkFBbUIsQ0FBQ08sWUFBcEIsR0FBbUMsVUFBU0MsS0FBVCxFQUFlO0FBQzlDLE1BQUksQ0FBQ0EsS0FBSyxDQUFDQyxRQUFYLEVBQXFCO0FBQ2pCRCxJQUFBQSxLQUFLLENBQUNDLFFBQU4sR0FBaUIsSUFBSVQsbUJBQUosRUFBakI7QUFDSDs7QUFDRCxTQUFPUSxLQUFLLENBQUNDLFFBQWI7QUFDSCxDQUxEOztBQU9BQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJYLG1CQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmxldCBUcmFja0VudHJ5TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3RhcnQgPSBudWxsO1xuICAgIHRoaXMuZW5kID0gbnVsbDtcbiAgICB0aGlzLmNvbXBsZXRlID0gbnVsbDtcbiAgICB0aGlzLmV2ZW50ID0gbnVsbDtcbiAgICB0aGlzLmludGVycnVwdCA9IG51bGw7XG4gICAgdGhpcy5kaXNwb3NlID0gbnVsbDtcbn07XG5cblRyYWNrRW50cnlMaXN0ZW5lcnMuZ2V0TGlzdGVuZXJzID0gZnVuY3Rpb24oZW50cnkpe1xuICAgIGlmICghZW50cnkubGlzdGVuZXIpIHtcbiAgICAgICAgZW50cnkubGlzdGVuZXIgPSBuZXcgVHJhY2tFbnRyeUxpc3RlbmVycygpO1xuICAgIH1cbiAgICByZXR1cm4gZW50cnkubGlzdGVuZXI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYWNrRW50cnlMaXN0ZW5lcnM7Il0sInNvdXJjZVJvb3QiOiIvIn0=