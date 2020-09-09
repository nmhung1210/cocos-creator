
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCAudioClip.js';
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
var Asset = require('./CCAsset');

var EventTarget = require('../event/event-target');

var LoadMode = cc.Enum({
  WEB_AUDIO: 0,
  DOM_AUDIO: 1
});
/**
 * !#en Class for audio data handling.
 * !#zh 音频资源类。
 * @class AudioClip
 * @extends Asset
 * @uses EventTarget
 */

var AudioClip = cc.Class({
  name: 'cc.AudioClip',
  "extends": Asset,
  mixins: [EventTarget],
  ctor: function ctor() {
    this._loading = false;
    this.loaded = false; // the web audio buffer or <audio> element

    this._audio = null;
  },
  properties: {
    /**
     * !#en Get the audio clip duration
     * !#zh 获取音频剪辑的长度
     * @property duration
     * @type {Number}
     */
    duration: 0,
    loadMode: {
      "default": LoadMode.WEB_AUDIO,
      type: LoadMode
    },
    _nativeAsset: {
      get: function get() {
        return this._audio;
      },
      set: function set(value) {
        // HACK: fix load mp3 as audioClip, _nativeAsset is set as audioClip.
        // Should load mp3 as audioBuffer indeed.
        if (value instanceof cc.AudioClip) {
          this._audio = value._nativeAsset;
        } else {
          this._audio = value;
        }

        if (this._audio) {
          this.loaded = true;
          this.emit('load');
        }
      },
      override: true
    },
    _nativeDep: {
      get: function get() {
        return {
          uuid: this._uuid,
          audioLoadMode: this.loadMode,
          ext: cc.path.extname(this._native),
          __isNative__: true
        };
      },
      override: true
    }
  },
  statics: {
    LoadMode: LoadMode,
    _loadByUrl: function _loadByUrl(url, callback) {
      var audioClip = cc.assetManager.assets.get(url);

      if (!audioClip) {
        cc.assetManager.loadRemote(url, function (error, data) {
          if (error) {
            return callback(error);
          }

          callback(null, data);
        });
      } else {
        callback(null, audioClip);
      }
    },
    _parseDepsFromJson: function _parseDepsFromJson() {
      return [];
    },
    _parseNativeDepFromJson: function _parseNativeDepFromJson(json) {
      return {
        audioLoadMode: json.loadMode,
        ext: cc.path.extname(json._native),
        __isNative__: true
      };
    }
  },
  _ensureLoaded: function _ensureLoaded(onComplete) {
    if (this.loaded) {
      return onComplete && onComplete();
    } else {
      if (onComplete) {
        this.once('load', onComplete);
      }

      if (!this._loading) {
        this._loading = true;
        var self = this;
        cc.assetManager.postLoadNative(this, function (err) {
          self._loading = false;
        });
      }
    }
  },
  destroy: function destroy() {
    cc.audioEngine.uncache(this);

    this._super();
  }
});
/**
 * !#zh
 * 当该资源加载成功后触发该事件
 * !#en
 * This event is emitted when the asset is loaded
 *
 * @event load
 */

cc.AudioClip = AudioClip;
module.exports = AudioClip;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9DQ0F1ZGlvQ2xpcC5qcyJdLCJuYW1lcyI6WyJBc3NldCIsInJlcXVpcmUiLCJFdmVudFRhcmdldCIsIkxvYWRNb2RlIiwiY2MiLCJFbnVtIiwiV0VCX0FVRElPIiwiRE9NX0FVRElPIiwiQXVkaW9DbGlwIiwiQ2xhc3MiLCJuYW1lIiwibWl4aW5zIiwiY3RvciIsIl9sb2FkaW5nIiwibG9hZGVkIiwiX2F1ZGlvIiwicHJvcGVydGllcyIsImR1cmF0aW9uIiwibG9hZE1vZGUiLCJ0eXBlIiwiX25hdGl2ZUFzc2V0IiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJlbWl0Iiwib3ZlcnJpZGUiLCJfbmF0aXZlRGVwIiwidXVpZCIsIl91dWlkIiwiYXVkaW9Mb2FkTW9kZSIsImV4dCIsInBhdGgiLCJleHRuYW1lIiwiX25hdGl2ZSIsIl9faXNOYXRpdmVfXyIsInN0YXRpY3MiLCJfbG9hZEJ5VXJsIiwidXJsIiwiY2FsbGJhY2siLCJhdWRpb0NsaXAiLCJhc3NldE1hbmFnZXIiLCJhc3NldHMiLCJsb2FkUmVtb3RlIiwiZXJyb3IiLCJkYXRhIiwiX3BhcnNlRGVwc0Zyb21Kc29uIiwiX3BhcnNlTmF0aXZlRGVwRnJvbUpzb24iLCJqc29uIiwiX2Vuc3VyZUxvYWRlZCIsIm9uQ29tcGxldGUiLCJvbmNlIiwic2VsZiIsInBvc3RMb2FkTmF0aXZlIiwiZXJyIiwiZGVzdHJveSIsImF1ZGlvRW5naW5lIiwidW5jYWNoZSIsIl9zdXBlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXJCOztBQUNBLElBQU1DLFdBQVcsR0FBR0QsT0FBTyxDQUFDLHVCQUFELENBQTNCOztBQUVBLElBQUlFLFFBQVEsR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDbkJD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LEdBQUcsRUFBRTFCLEVBQUUsQ0FBQzJCLElBQUgsQ0FBUUMsT0FBUixDQUFnQmUsSUFBSSxDQUFDZCxPQUFyQixDQUF0QztBQUFxRUMsUUFBQUEsWUFBWSxFQUFFO0FBQW5GLE9BQVA7QUFDSDtBQXZCSSxHQXREWTtBQWdGckJjLEVBQUFBLGFBaEZxQix5QkFnRk5DLFVBaEZNLEVBZ0ZNO0FBQ3ZCLFFBQUksS0FBS25DLE1BQVQsRUFBaUI7QUFDYixhQUFPbUMsVUFBVSxJQUFJQSxVQUFVLEVBQS9CO0FBQ0gsS0FGRCxNQUdLO0FBQ0QsVUFBSUEsVUFBSixFQUFnQjtBQUNaLGFBQUtDLElBQUwsQ0FBVSxNQUFWLEVBQWtCRCxVQUFsQjtBQUNIOztBQUNELFVBQUksQ0FBQyxLQUFLcEMsUUFBVixFQUFvQjtBQUNoQixhQUFLQSxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsWUFBSXNDLElBQUksR0FBRyxJQUFYO0FBQ0EvQyxRQUFBQSxFQUFFLENBQUNvQyxZQUFILENBQWdCWSxjQUFoQixDQUErQixJQUEvQixFQUFxQyxVQUFVQyxHQUFWLEVBQWU7QUFDaERGLFVBQUFBLElBQUksQ0FBQ3RDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDSCxTQUZEO0FBR0g7QUFDSjtBQUNKLEdBaEdvQjtBQWtHckJ5QyxFQUFBQSxPQWxHcUIscUJBa0dWO0FBQ1BsRCxJQUFBQSxFQUFFLENBQUNtRCxXQUFILENBQWVDLE9BQWYsQ0FBdUIsSUFBdkI7O0FBQ0EsU0FBS0MsTUFBTDtBQUNIO0FBckdvQixDQUFULENBQWhCO0FBd0dBOzs7Ozs7Ozs7QUFTQXJELEVBQUUsQ0FBQ0ksU0FBSCxHQUFlQSxTQUFmO0FBQ0FrRCxNQUFNLENBQUNDLE9BQVAsR0FBaUJuRCxTQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgQXNzZXQgPSByZXF1aXJlKCcuL0NDQXNzZXQnKTtcbmNvbnN0IEV2ZW50VGFyZ2V0ID0gcmVxdWlyZSgnLi4vZXZlbnQvZXZlbnQtdGFyZ2V0Jyk7XG5cbnZhciBMb2FkTW9kZSA9IGNjLkVudW0oe1xuICAgIFdFQl9BVURJTzogMCxcbiAgICBET01fQVVESU86IDEsXG59KTtcblxuLyoqXG4gKiAhI2VuIENsYXNzIGZvciBhdWRpbyBkYXRhIGhhbmRsaW5nLlxuICogISN6aCDpn7PpopHotYTmupDnsbvjgIJcbiAqIEBjbGFzcyBBdWRpb0NsaXBcbiAqIEBleHRlbmRzIEFzc2V0XG4gKiBAdXNlcyBFdmVudFRhcmdldFxuICovXG52YXIgQXVkaW9DbGlwID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5BdWRpb0NsaXAnLFxuICAgIGV4dGVuZHM6IEFzc2V0LFxuICAgIG1peGluczogW0V2ZW50VGFyZ2V0XSxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICB0aGlzLl9sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9hZGVkID0gZmFsc2U7XG5cbiAgICAgICAgLy8gdGhlIHdlYiBhdWRpbyBidWZmZXIgb3IgPGF1ZGlvPiBlbGVtZW50XG4gICAgICAgIHRoaXMuX2F1ZGlvID0gbnVsbDtcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBHZXQgdGhlIGF1ZGlvIGNsaXAgZHVyYXRpb25cbiAgICAgICAgICogISN6aCDojrflj5bpn7PpopHliarovpHnmoTplb/luqZcbiAgICAgICAgICogQHByb3BlcnR5IGR1cmF0aW9uXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBkdXJhdGlvbjogMCxcbiAgICAgICAgbG9hZE1vZGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IExvYWRNb2RlLldFQl9BVURJTyxcbiAgICAgICAgICAgIHR5cGU6IExvYWRNb2RlXG4gICAgICAgIH0sXG4gICAgICAgIF9uYXRpdmVBc3NldDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXVkaW87XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIEhBQ0s6IGZpeCBsb2FkIG1wMyBhcyBhdWRpb0NsaXAsIF9uYXRpdmVBc3NldCBpcyBzZXQgYXMgYXVkaW9DbGlwLlxuICAgICAgICAgICAgICAgIC8vIFNob3VsZCBsb2FkIG1wMyBhcyBhdWRpb0J1ZmZlciBpbmRlZWQuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgY2MuQXVkaW9DbGlwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2F1ZGlvID0gdmFsdWUuX25hdGl2ZUFzc2V0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXVkaW8gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2F1ZGlvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdsb2FkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgX25hdGl2ZURlcDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB1dWlkOiB0aGlzLl91dWlkLCBhdWRpb0xvYWRNb2RlOiB0aGlzLmxvYWRNb2RlLCBleHQ6IGNjLnBhdGguZXh0bmFtZSh0aGlzLl9uYXRpdmUpLCBfX2lzTmF0aXZlX186IHRydWUgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgTG9hZE1vZGU6IExvYWRNb2RlLFxuICAgICAgICBfbG9hZEJ5VXJsOiBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGF1ZGlvQ2xpcCA9IGNjLmFzc2V0TWFuYWdlci5hc3NldHMuZ2V0KHVybCk7XG4gICAgICAgICAgICBpZiAoIWF1ZGlvQ2xpcCkge1xuICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlKHVybCwgZnVuY3Rpb24gKGVycm9yLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGF1ZGlvQ2xpcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3BhcnNlRGVwc0Zyb21Kc29uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcblxuICAgICAgICBfcGFyc2VOYXRpdmVEZXBGcm9tSnNvbiAoanNvbikge1xuICAgICAgICAgICAgcmV0dXJuIHsgYXVkaW9Mb2FkTW9kZToganNvbi5sb2FkTW9kZSwgIGV4dDogY2MucGF0aC5leHRuYW1lKGpzb24uX25hdGl2ZSksIF9faXNOYXRpdmVfXzogdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9lbnN1cmVMb2FkZWQgKG9uQ29tcGxldGUpIHtcbiAgICAgICAgaWYgKHRoaXMubG9hZGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAob25Db21wbGV0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25jZSgnbG9hZCcsIG9uQ29tcGxldGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLl9sb2FkaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5wb3N0TG9hZE5hdGl2ZSh0aGlzLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkZXN0cm95ICgpIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUudW5jYWNoZSh0aGlzKTtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiAhI3poXG4gKiDlvZPor6XotYTmupDliqDovb3miJDlip/lkI7op6blj5Hor6Xkuovku7ZcbiAqICEjZW5cbiAqIFRoaXMgZXZlbnQgaXMgZW1pdHRlZCB3aGVuIHRoZSBhc3NldCBpcyBsb2FkZWRcbiAqXG4gKiBAZXZlbnQgbG9hZFxuICovXG5cbmNjLkF1ZGlvQ2xpcCA9IEF1ZGlvQ2xpcDtcbm1vZHVsZS5leHBvcnRzID0gQXVkaW9DbGlwO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=