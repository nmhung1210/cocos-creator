
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9DQ0F1ZGlvQ2xpcC5qcyJdLCJuYW1lcyI6WyJBc3NldCIsInJlcXVpcmUiLCJFdmVudFRhcmdldCIsIkxvYWRNb2RlIiwiY2MiLCJFbnVtIiwiV0VCX0FVRElPIiwiRE9NX0FVRElPIiwiQXVkaW9DbGlwIiwiQ2xhc3MiLCJuYW1lIiwibWl4aW5zIiwiY3RvciIsIl9sb2FkaW5nIiwibG9hZGVkIiwiX2F1ZGlvIiwicHJvcGVydGllcyIsImR1cmF0aW9uIiwibG9hZE1vZGUiLCJ0eXBlIiwiX25hdGl2ZUFzc2V0IiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJlbWl0Iiwib3ZlcnJpZGUiLCJfbmF0aXZlRGVwIiwidXVpZCIsIl91dWlkIiwiYXVkaW9Mb2FkTW9kZSIsImV4dCIsInBhdGgiLCJleHRuYW1lIiwiX25hdGl2ZSIsIl9faXNOYXRpdmVfXyIsInN0YXRpY3MiLCJfbG9hZEJ5VXJsIiwidXJsIiwiY2FsbGJhY2siLCJhdWRpb0NsaXAiLCJhc3NldE1hbmFnZXIiLCJhc3NldHMiLCJsb2FkUmVtb3RlIiwiZXJyb3IiLCJkYXRhIiwiX2Vuc3VyZUxvYWRlZCIsIm9uQ29tcGxldGUiLCJvbmNlIiwic2VsZiIsInBvc3RMb2FkTmF0aXZlIiwiZXJyIiwiZGVzdHJveSIsImF1ZGlvRW5naW5lIiwidW5jYWNoZSIsIl9zdXBlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXJCOztBQUNBLElBQU1DLFdBQVcsR0FBR0QsT0FBTyxDQUFDLHVCQUFELENBQTNCOztBQUVBLElBQUlFLFFBQVEsR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDbkJDLEVBQUFBLFNBQVMsRUFBRSxDQURRO0FBRW5CQyxFQUFBQSxTQUFTLEVBQUU7QUFGUSxDQUFS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LEVBQW9CO0FBQ2hCLGFBQUtBLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxZQUFJbUMsSUFBSSxHQUFHLElBQVg7QUFDQTVDLFFBQUFBLEVBQUUsQ0FBQ29DLFlBQUgsQ0FBZ0JTLGNBQWhCLENBQStCLElBQS9CLEVBQXFDLFVBQVVDLEdBQVYsRUFBZTtBQUNoREYsVUFBQUEsSUFBSSxDQUFDbkMsUUFBTCxHQUFnQixLQUFoQjtBQUNILFNBRkQ7QUFHSDtBQUNKO0FBQ0osR0F4Rm9CO0FBMEZyQnNDLEVBQUFBLE9BMUZxQixxQkEwRlY7QUFDUC9DLElBQUFBLEVBQUUsQ0FBQ2dELFdBQUgsQ0FBZUMsT0FBZixDQUF1QixJQUF2Qjs7QUFDQSxTQUFLQyxNQUFMO0FBQ0g7QUE3Rm9CLENBQVQsQ0FBaEI7QUFnR0E7Ozs7Ozs7OztBQVNBbEQsRUFBRSxDQUFDSSxTQUFILEdBQWVBLFNBQWY7QUFDQStDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmhELFNBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBBc3NldCA9IHJlcXVpcmUoJy4vQ0NBc3NldCcpO1xuY29uc3QgRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuLi9ldmVudC9ldmVudC10YXJnZXQnKTtcblxudmFyIExvYWRNb2RlID0gY2MuRW51bSh7XG4gICAgV0VCX0FVRElPOiAwLFxuICAgIERPTV9BVURJTzogMSxcbn0pO1xuXG4vKipcbiAqICEjZW4gQ2xhc3MgZm9yIGF1ZGlvIGRhdGEgaGFuZGxpbmcuXG4gKiAhI3poIOmfs+mikei1hOa6kOexu+OAglxuICogQGNsYXNzIEF1ZGlvQ2xpcFxuICogQGV4dGVuZHMgQXNzZXRcbiAqIEB1c2VzIEV2ZW50VGFyZ2V0XG4gKi9cbnZhciBBdWRpb0NsaXAgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkF1ZGlvQ2xpcCcsXG4gICAgZXh0ZW5kczogQXNzZXQsXG4gICAgbWl4aW5zOiBbRXZlbnRUYXJnZXRdLFxuXG4gICAgY3RvciAoKSB7XG4gICAgICAgIHRoaXMuX2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyB0aGUgd2ViIGF1ZGlvIGJ1ZmZlciBvciA8YXVkaW8+IGVsZW1lbnRcbiAgICAgICAgdGhpcy5fYXVkaW8gPSBudWxsO1xuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEdldCB0aGUgYXVkaW8gY2xpcCBkdXJhdGlvblxuICAgICAgICAgKiAhI3poIOiOt+WPlumfs+mikeWJqui+keeahOmVv+W6plxuICAgICAgICAgKiBAcHJvcGVydHkgZHVyYXRpb25cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICBsb2FkTW9kZToge1xuICAgICAgICAgICAgZGVmYXVsdDogTG9hZE1vZGUuV0VCX0FVRElPLFxuICAgICAgICAgICAgdHlwZTogTG9hZE1vZGVcbiAgICAgICAgfSxcbiAgICAgICAgX25hdGl2ZUFzc2V0OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hdWRpbztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gSEFDSzogZml4IGxvYWQgbXAzIGFzIGF1ZGlvQ2xpcCwgX25hdGl2ZUFzc2V0IGlzIHNldCBhcyBhdWRpb0NsaXAuXG4gICAgICAgICAgICAgICAgLy8gU2hvdWxkIGxvYWQgbXAzIGFzIGF1ZGlvQnVmZmVyIGluZGVlZC5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBjYy5BdWRpb0NsaXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXVkaW8gPSB2YWx1ZS5fbmF0aXZlQXNzZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hdWRpbyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYXVkaW8pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2xvYWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICBfbmF0aXZlRGVwOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHV1aWQ6IHRoaXMuX3V1aWQsIGF1ZGlvTG9hZE1vZGU6IHRoaXMubG9hZE1vZGUsIGV4dDogY2MucGF0aC5leHRuYW1lKHRoaXMuX25hdGl2ZSksIF9faXNOYXRpdmVfXzogdHJ1ZSB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICBMb2FkTW9kZTogTG9hZE1vZGUsXG4gICAgICAgIF9sb2FkQnlVcmw6IGZ1bmN0aW9uICh1cmwsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgYXVkaW9DbGlwID0gY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5nZXQodXJsKTtcbiAgICAgICAgICAgIGlmICghYXVkaW9DbGlwKSB7XG4gICAgICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRSZW1vdGUodXJsLCBmdW5jdGlvbiAoZXJyb3IsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgYXVkaW9DbGlwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZW5zdXJlTG9hZGVkIChvbkNvbXBsZXRlKSB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9uQ29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2UoJ2xvYWQnLCBvbkNvbXBsZXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5fbG9hZGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIucG9zdExvYWROYXRpdmUodGhpcywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZGVzdHJveSAoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnVuY2FjaGUodGhpcyk7XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogISN6aFxuICog5b2T6K+l6LWE5rqQ5Yqg6L295oiQ5Yqf5ZCO6Kem5Y+R6K+l5LqL5Lu2XG4gKiAhI2VuXG4gKiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgd2hlbiB0aGUgYXNzZXQgaXMgbG9hZGVkXG4gKlxuICogQGV2ZW50IGxvYWRcbiAqL1xuXG5jYy5BdWRpb0NsaXAgPSBBdWRpb0NsaXA7XG5tb2R1bGUuZXhwb3J0cyA9IEF1ZGlvQ2xpcDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9