
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/audio/CCAudio.js';
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
var EventTarget = require('../core/event/event-target');

var sys = require('../core/platform/CCSys');

var LoadMode = require('../core/assets/CCAudioClip').LoadMode;

var touchBinded = false;
var touchPlayList = [//{ instance: Audio, offset: 0, audio: audio }
];

var Audio = function Audio(src) {
  EventTarget.call(this);
  this._shouldRecycleOnEnded = false;
  this._src = src;
  this._element = null;
  this.id = 0;
  this._state = Audio.State.INITIALZING;

  this._onended = function () {
    this._state = Audio.State.STOPPED;
    this.emit('ended');
  }.bind(this);
};

cc.js.extend(Audio, EventTarget);
/**
 * !#en Audio state.
 * !#zh 声音播放状态
 * @enum audioEngine.AudioState
 * @memberof cc
 */
// TODO - At present, the state is mixed with two states of users and systems, and it is best to split into two types. A "loading" should also be added to the system state.

Audio.State = {
  /**
   * @property {Number} ERROR
   */
  ERROR: -1,

  /**
   * @property {Number} INITIALZING
   */
  INITIALZING: 0,

  /**
   * @property {Number} PLAYING
   */
  PLAYING: 1,

  /**
   * @property {Number} PAUSED
   */
  PAUSED: 2,

  /**
   * @property {Number} STOPPED
   */
  STOPPED: 3
};

(function (proto) {
  proto._bindEnded = function (callback) {
    callback = callback || this._onended;
    var elem = this._element;

    if (this._src && elem instanceof HTMLAudioElement) {
      elem.addEventListener('ended', callback);
    } else {
      elem.onended = callback;
    }
  };

  proto._unbindEnded = function () {
    var elem = this._element;

    if (elem instanceof HTMLAudioElement) {
      elem.removeEventListener('ended', this._onended);
    } else if (elem) {
      elem.onended = null;
    }
  };

  proto._onLoaded = function () {
    this._createElement();

    this._state = Audio.State.INITIALZING;
    this.setVolume(1);
    this.setLoop(false);
  };

  proto._createElement = function () {
    var elem = this._src._nativeAsset;

    if (elem instanceof HTMLAudioElement) {
      // Reuse dom audio element
      if (!this._element) {
        this._element = document.createElement('audio');
      }

      this._element.src = elem.src;
    } else {
      this._element = new WebAudioElement(elem, this);
    }
  };

  proto.play = function () {
    var self = this;
    this._src && this._src._ensureLoaded(function () {
      // marked as playing so it will playOnLoad
      self._state = Audio.State.PLAYING; // TODO: move to audio event listeners

      self._bindEnded();

      var playPromise = self._element.play(); // dom audio throws an error if pause audio immediately after playing


      if (window.Promise && playPromise instanceof Promise) {
        playPromise["catch"](function (err) {// do nothing
        });
      }

      self._touchToPlay();
    });
  };

  proto._touchToPlay = function () {
    if (this._src && this._src.loadMode === LoadMode.DOM_AUDIO && this._element.paused) {
      touchPlayList.push({
        instance: this,
        offset: 0,
        audio: this._element
      });
    }

    if (touchBinded) return;
    touchBinded = true;
    var touchEventName = 'ontouchend' in window ? 'touchend' : 'mousedown'; // Listen to the touchstart body event and play the audio when necessary.

    cc.game.canvas.addEventListener(touchEventName, function () {
      var item;

      while (item = touchPlayList.pop()) {
        item.audio.play(item.offset);
      }
    });
  };

  proto.destroy = function () {
    this._element = null;
  };

  proto.pause = function () {
    if (this.getState() !== Audio.State.PLAYING) return;
    var self = this;
    this._src && this._src._ensureLoaded(function () {
      // pause operation may fire 'ended' event
      self._unbindEnded();

      self._element.pause();

      self._state = Audio.State.PAUSED;
    });
  };

  proto.resume = function () {
    if (this.getState() !== Audio.State.PAUSED) return;
    var self = this;
    this._src && this._src._ensureLoaded(function () {
      self._bindEnded();

      self._element.play();

      self._state = Audio.State.PLAYING;
    });
  };

  proto.stop = function () {
    var self = this;
    this._src && this._src._ensureLoaded(function () {
      self._element.pause();

      self._element.currentTime = 0; // remove touchPlayList

      for (var i = 0; i < touchPlayList.length; i++) {
        if (touchPlayList[i].instance === self) {
          touchPlayList.splice(i, 1);
          break;
        }
      }

      self._unbindEnded();

      self.emit('stop');
      self._state = Audio.State.STOPPED;
    });
  };

  proto.setLoop = function (loop) {
    var self = this;
    this._src && this._src._ensureLoaded(function () {
      self._element.loop = loop;
    });
  };

  proto.getLoop = function () {
    return this._element ? this._element.loop : false;
  };

  proto.setVolume = function (num) {
    var self = this;
    this._src && this._src._ensureLoaded(function () {
      self._element.volume = num;
    });
  };

  proto.getVolume = function () {
    return this._element ? this._element.volume : 1;
  };

  proto.setCurrentTime = function (num) {
    var self = this;
    this._src && this._src._ensureLoaded(function () {
      // setCurrentTime would fire 'ended' event
      // so we need to change the callback to rebind ended callback after setCurrentTime
      self._unbindEnded();

      self._bindEnded(function () {
        self._bindEnded();
      });

      self._element.currentTime = num;
    });
  };

  proto.getCurrentTime = function () {
    return this._element ? this._element.currentTime : 0;
  };

  proto.getDuration = function () {
    return this._src ? this._src.duration : 0;
  };

  proto.getState = function (forceUpdating) {
    if (forceUpdating === void 0) {
      forceUpdating = true;
    }

    // HACK: in some browser, audio may not fire 'ended' event
    // so we need to force updating the Audio state
    if (forceUpdating) {
      this._forceUpdatingState();
    }

    return this._state;
  };

  proto._forceUpdatingState = function () {
    var elem = this._element;

    if (elem) {
      if (Audio.State.PLAYING === this._state && elem.paused) {
        this._state = Audio.State.STOPPED;
      } else if (Audio.State.STOPPED === this._state && !elem.paused) {
        this._state = Audio.State.PLAYING;
      }
    }
  };

  Object.defineProperty(proto, 'src', {
    get: function get() {
      return this._src;
    },
    set: function set(clip) {
      this._unbindEnded();

      if (clip) {
        this._src = clip;

        if (!clip.loaded) {
          var self = this; // need to call clip._ensureLoaded mannually to start loading

          clip.once('load', function () {
            // In case set a new src when the old one hasn't finished loading
            if (clip === self._src) {
              self._onLoaded();
            }
          });
        } else {
          this._onLoaded();
        }
      } else {
        this._src = null;

        if (this._element instanceof WebAudioElement) {
          this._element = null;
        } else if (this._element) {
          this._element.src = '';
        }

        this._state = Audio.State.INITIALZING;
      }

      return clip;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(proto, 'paused', {
    get: function get() {
      return this._element ? this._element.paused : true;
    },
    enumerable: true,
    configurable: true
  }); // setFinishCallback
})(Audio.prototype); // TIME_CONSTANT is used as an argument of setTargetAtTime interface
// TIME_CONSTANT need to be a positive number on Edge and Baidu browser
// TIME_CONSTANT need to be 0 by default, or may fail to set volume at the very beginning of playing audio


var TIME_CONSTANT;

if (cc.sys.browserType === cc.sys.BROWSER_TYPE_EDGE || cc.sys.browserType === cc.sys.BROWSER_TYPE_BAIDU || cc.sys.browserType === cc.sys.BROWSER_TYPE_UC) {
  TIME_CONSTANT = 0.01;
} else {
  TIME_CONSTANT = 0;
} // Encapsulated WebAudio interface


var WebAudioElement = function WebAudioElement(buffer, audio) {
  this._audio = audio;
  this._context = sys.__audioSupport.context;
  this._buffer = buffer;
  this._gainObj = this._context['createGain']();
  this.volume = 1;

  this._gainObj['connect'](this._context['destination']);

  this._loop = false; // The time stamp on the audio time axis when the recording begins to play.

  this._startTime = -1; // Record the currently playing 'Source'

  this._currentSource = null; // Record the time has been played

  this.playedLength = 0;
  this._currentTimer = null;

  this._endCallback = function () {
    if (this.onended) {
      this.onended(this);
    }
  }.bind(this);
};

(function (proto) {
  proto.play = function (offset) {
    // If repeat play, you need to stop before an audio
    if (this._currentSource && !this.paused) {
      this._currentSource.onended = null;

      this._currentSource.stop(0);

      this.playedLength = 0;
    }

    var audio = this._context["createBufferSource"]();

    audio.buffer = this._buffer;
    audio["connect"](this._gainObj);
    audio.loop = this._loop;
    this._startTime = this._context.currentTime;
    offset = offset || this.playedLength;

    if (offset) {
      this._startTime -= offset;
    }

    var duration = this._buffer.duration;
    var startTime = offset;
    var endTime;

    if (this._loop) {
      if (audio.start) audio.start(0, startTime);else if (audio["notoGrainOn"]) audio["noteGrainOn"](0, startTime);else audio["noteOn"](0, startTime);
    } else {
      endTime = duration - offset;
      if (audio.start) audio.start(0, startTime, endTime);else if (audio["noteGrainOn"]) audio["noteGrainOn"](0, startTime, endTime);else audio["noteOn"](0, startTime, endTime);
    }

    this._currentSource = audio;
    audio.onended = this._endCallback; // If the current audio context time stamp is 0 and audio context state is suspended
    // There may be a need to touch events before you can actually start playing audio

    if ((!audio.context.state || audio.context.state === "suspended") && this._context.currentTime === 0) {
      var self = this;
      clearTimeout(this._currentTimer);
      this._currentTimer = setTimeout(function () {
        if (self._context.currentTime === 0) {
          touchPlayList.push({
            instance: self._audio,
            offset: offset,
            audio: self
          });
        }
      }, 10);
    }

    var sys = cc.sys;

    if (sys.os === sys.OS_IOS && sys.isBrowser && sys.isMobile) {
      // Audio context is suspended when you unplug the earphones,
      // and is interrupted when the app enters background.
      // Both make the audioBufferSource unplayable.
      if (audio.context.state === "suspended" && this._context.currentTime !== 0 || audio.context.state === 'interrupted') {
        // reference: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/resume
        audio.context.resume();
      }
    }
  };

  proto.pause = function () {
    clearTimeout(this._currentTimer);
    if (this.paused) return; // Record the time the current has been played

    this.playedLength = this._context.currentTime - this._startTime; // If more than the duration of the audio, Need to take the remainder

    this.playedLength %= this._buffer.duration;
    var audio = this._currentSource;
    this._currentSource = null;
    this._startTime = -1;
    if (audio) audio.stop(0);
  };

  Object.defineProperty(proto, 'paused', {
    get: function get() {
      // If the current audio is a loop, paused is false
      if (this._currentSource && this._currentSource.loop) return false; // startTime default is -1

      if (this._startTime === -1) return true; // Current time -  Start playing time > Audio duration

      return this._context.currentTime - this._startTime > this._buffer.duration;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(proto, 'loop', {
    get: function get() {
      return this._loop;
    },
    set: function set(bool) {
      if (this._currentSource) this._currentSource.loop = bool;
      return this._loop = bool;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(proto, 'volume', {
    get: function get() {
      return this._volume;
    },
    set: function set(num) {
      this._volume = num; // https://www.chromestatus.com/features/5287995770929152

      if (this._gainObj.gain.setTargetAtTime) {
        try {
          this._gainObj.gain.setTargetAtTime(num, this._context.currentTime, TIME_CONSTANT);
        } catch (e) {
          // Some other unknown browsers may crash if TIME_CONSTANT is 0
          this._gainObj.gain.setTargetAtTime(num, this._context.currentTime, 0.01);
        }
      } else {
        this._gainObj.gain.value = num;
      }

      if (sys.os === sys.OS_IOS && !this.paused && this._currentSource) {
        // IOS must be stop webAudio
        this._currentSource.onended = null;
        this.pause();
        this.play();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(proto, 'currentTime', {
    get: function get() {
      if (this.paused) {
        return this.playedLength;
      } // Record the time the current has been played


      this.playedLength = this._context.currentTime - this._startTime; // If more than the duration of the audio, Need to take the remainder

      this.playedLength %= this._buffer.duration;
      return this.playedLength;
    },
    set: function set(num) {
      if (!this.paused) {
        this.pause();
        this.playedLength = num;
        this.play();
      } else {
        this.playedLength = num;
      }

      return num;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(proto, 'duration', {
    get: function get() {
      return this._buffer.duration;
    },
    enumerable: true,
    configurable: true
  });
})(WebAudioElement.prototype);

module.exports = cc._Audio = Audio;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9hdWRpby9DQ0F1ZGlvLmpzIl0sIm5hbWVzIjpbIkV2ZW50VGFyZ2V0IiwicmVxdWlyZSIsInN5cyIsIkxvYWRNb2RlIiwidG91Y2hCaW5kZWQiLCJ0b3VjaFBsYXlMaXN0IiwiQXVkaW8iLCJzcmMiLCJjYWxsIiwiX3Nob3VsZFJlY3ljbGVPbkVuZGVkIiwiX3NyYyIsIl9lbGVtZW50IiwiaWQiLCJfc3RhdGUiLCJTdGF0ZSIsIklOSVRJQUxaSU5HIiwiX29uZW5kZWQiLCJTVE9QUEVEIiwiZW1pdCIsImJpbmQiLCJjYyIsImpzIiwiZXh0ZW5kIiwiRVJST1IiLCJQTEFZSU5HIiwiUEFVU0VEIiwicHJvdG8iLCJfYmluZEVuZGVkIiwiY2FsbGJhY2siLCJlbGVtIiwiSFRNTEF1ZGlvRWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbmVuZGVkIiwiX3VuYmluZEVuZGVkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIl9vbkxvYWRlZCIsIl9jcmVhdGVFbGVtZW50Iiwic2V0Vm9sdW1lIiwic2V0TG9vcCIsIl9uYXRpdmVBc3NldCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIldlYkF1ZGlvRWxlbWVudCIsInBsYXkiLCJzZWxmIiwiX2Vuc3VyZUxvYWRlZCIsInBsYXlQcm9taXNlIiwid2luZG93IiwiUHJvbWlzZSIsImVyciIsIl90b3VjaFRvUGxheSIsImxvYWRNb2RlIiwiRE9NX0FVRElPIiwicGF1c2VkIiwicHVzaCIsImluc3RhbmNlIiwib2Zmc2V0IiwiYXVkaW8iLCJ0b3VjaEV2ZW50TmFtZSIsImdhbWUiLCJjYW52YXMiLCJpdGVtIiwicG9wIiwiZGVzdHJveSIsInBhdXNlIiwiZ2V0U3RhdGUiLCJyZXN1bWUiLCJzdG9wIiwiY3VycmVudFRpbWUiLCJpIiwibGVuZ3RoIiwic3BsaWNlIiwibG9vcCIsImdldExvb3AiLCJudW0iLCJ2b2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRDdXJyZW50VGltZSIsImdldEN1cnJlbnRUaW1lIiwiZ2V0RHVyYXRpb24iLCJkdXJhdGlvbiIsImZvcmNlVXBkYXRpbmciLCJfZm9yY2VVcGRhdGluZ1N0YXRlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJzZXQiLCJjbGlwIiwibG9hZGVkIiwib25jZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJwcm90b3R5cGUiLCJUSU1FX0NPTlNUQU5UIiwiYnJvd3NlclR5cGUiLCJCUk9XU0VSX1RZUEVfRURHRSIsIkJST1dTRVJfVFlQRV9CQUlEVSIsIkJST1dTRVJfVFlQRV9VQyIsImJ1ZmZlciIsIl9hdWRpbyIsIl9jb250ZXh0IiwiX19hdWRpb1N1cHBvcnQiLCJjb250ZXh0IiwiX2J1ZmZlciIsIl9nYWluT2JqIiwiX2xvb3AiLCJfc3RhcnRUaW1lIiwiX2N1cnJlbnRTb3VyY2UiLCJwbGF5ZWRMZW5ndGgiLCJfY3VycmVudFRpbWVyIiwiX2VuZENhbGxiYWNrIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsInN0YXJ0Iiwic3RhdGUiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0Iiwib3MiLCJPU19JT1MiLCJpc0Jyb3dzZXIiLCJpc01vYmlsZSIsImJvb2wiLCJfdm9sdW1lIiwiZ2FpbiIsInNldFRhcmdldEF0VGltZSIsImUiLCJ2YWx1ZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJfQXVkaW8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsSUFBTUEsV0FBVyxHQUFHQyxPQUFPLENBQUMsNEJBQUQsQ0FBM0I7O0FBQ0EsSUFBTUMsR0FBRyxHQUFHRCxPQUFPLENBQUMsd0JBQUQsQ0FBbkI7O0FBQ0EsSUFBTUUsUUFBUSxHQUFHRixPQUFPLENBQUMsNEJBQUQsQ0FBUCxDQUFzQ0UsUUFBdkQ7O0FBRUEsSUFBSUMsV0FBVyxHQUFHLEtBQWxCO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLENBQ2hCO0FBRGdCLENBQXBCOztBQUlBLElBQUlDLEtBQUss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dGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAwOC0yMDEwIFJpY2FyZG8gUXVlc2FkYVxuIENvcHlyaWdodCAoYykgMjAxMS0yMDEyIGNvY29zMmQteC5vcmdcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IEV2ZW50VGFyZ2V0ID0gcmVxdWlyZSgnLi4vY29yZS9ldmVudC9ldmVudC10YXJnZXQnKTtcbmNvbnN0IHN5cyA9IHJlcXVpcmUoJy4uL2NvcmUvcGxhdGZvcm0vQ0NTeXMnKTtcbmNvbnN0IExvYWRNb2RlID0gcmVxdWlyZSgnLi4vY29yZS9hc3NldHMvQ0NBdWRpb0NsaXAnKS5Mb2FkTW9kZTtcblxubGV0IHRvdWNoQmluZGVkID0gZmFsc2U7XG5sZXQgdG91Y2hQbGF5TGlzdCA9IFtcbiAgICAvL3sgaW5zdGFuY2U6IEF1ZGlvLCBvZmZzZXQ6IDAsIGF1ZGlvOiBhdWRpbyB9XG5dO1xuXG5sZXQgQXVkaW8gPSBmdW5jdGlvbiAoc3JjKSB7XG4gICAgRXZlbnRUYXJnZXQuY2FsbCh0aGlzKTtcbiAgICB0aGlzLl9zaG91bGRSZWN5Y2xlT25FbmRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3NyYyA9IHNyYztcbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLmlkID0gMDtcbiAgICB0aGlzLl9zdGF0ZSA9IEF1ZGlvLlN0YXRlLklOSVRJQUxaSU5HO1xuXG4gICAgdGhpcy5fb25lbmRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBBdWRpby5TdGF0ZS5TVE9QUEVEO1xuICAgICAgICB0aGlzLmVtaXQoJ2VuZGVkJyk7XG4gICAgfS5iaW5kKHRoaXMpO1xufTtcblxuY2MuanMuZXh0ZW5kKEF1ZGlvLCBFdmVudFRhcmdldCk7XG5cbi8qKlxuICogISNlbiBBdWRpbyBzdGF0ZS5cbiAqICEjemgg5aOw6Z+z5pKt5pS+54q25oCBXG4gKiBAZW51bSBhdWRpb0VuZ2luZS5BdWRpb1N0YXRlXG4gKiBAbWVtYmVyb2YgY2NcbiAqL1xuLy8gVE9ETyAtIEF0IHByZXNlbnQsIHRoZSBzdGF0ZSBpcyBtaXhlZCB3aXRoIHR3byBzdGF0ZXMgb2YgdXNlcnMgYW5kIHN5c3RlbXMsIGFuZCBpdCBpcyBiZXN0IHRvIHNwbGl0IGludG8gdHdvIHR5cGVzLiBBIFwibG9hZGluZ1wiIHNob3VsZCBhbHNvIGJlIGFkZGVkIHRvIHRoZSBzeXN0ZW0gc3RhdGUuXG5BdWRpby5TdGF0ZSA9IHtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRVJST1JcbiAgICAgKi9cbiAgICBFUlJPUiA6IC0xLFxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBJTklUSUFMWklOR1xuICAgICAqL1xuICAgIElOSVRJQUxaSU5HOiAwLFxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQTEFZSU5HXG4gICAgICovXG4gICAgUExBWUlORzogMSxcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUEFVU0VEXG4gICAgICovXG4gICAgUEFVU0VEOiAyLFxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTVE9QUEVEXG4gICAgICovXG4gICAgU1RPUFBFRDogMyxcbn07XG5cbihmdW5jdGlvbiAocHJvdG8pIHtcblxuICAgIHByb3RvLl9iaW5kRW5kZWQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCB0aGlzLl9vbmVuZGVkO1xuICAgICAgICBsZXQgZWxlbSA9IHRoaXMuX2VsZW1lbnQ7XG4gICAgICAgIGlmICh0aGlzLl9zcmMgJiYgKGVsZW0gaW5zdGFuY2VvZiBIVE1MQXVkaW9FbGVtZW50KSkge1xuICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW0ub25lbmRlZCA9IGNhbGxiYWNrO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByb3RvLl91bmJpbmRFbmRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGVsZW0gPSB0aGlzLl9lbGVtZW50O1xuICAgICAgICBpZiAoZWxlbSBpbnN0YW5jZW9mIEhUTUxBdWRpb0VsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignZW5kZWQnLCB0aGlzLl9vbmVuZGVkKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtKSB7XG4gICAgICAgICAgICBlbGVtLm9uZW5kZWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByb3RvLl9vbkxvYWRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IEF1ZGlvLlN0YXRlLklOSVRJQUxaSU5HO1xuICAgICAgICB0aGlzLnNldFZvbHVtZSgxKTtcbiAgICAgICAgdGhpcy5zZXRMb29wKGZhbHNlKTtcbiAgICB9O1xuXG4gICAgcHJvdG8uX2NyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBlbGVtID0gdGhpcy5fc3JjLl9uYXRpdmVBc3NldDtcbiAgICAgICAgaWYgKGVsZW0gaW5zdGFuY2VvZiBIVE1MQXVkaW9FbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBSZXVzZSBkb20gYXVkaW8gZWxlbWVudFxuICAgICAgICAgICAgaWYgKCF0aGlzLl9lbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50LnNyYyA9IGVsZW0uc3JjO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudCA9IG5ldyBXZWJBdWRpb0VsZW1lbnQoZWxlbSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJvdG8ucGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9zcmMgJiYgdGhpcy5fc3JjLl9lbnN1cmVMb2FkZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gbWFya2VkIGFzIHBsYXlpbmcgc28gaXQgd2lsbCBwbGF5T25Mb2FkXG4gICAgICAgICAgICBzZWxmLl9zdGF0ZSA9IEF1ZGlvLlN0YXRlLlBMQVlJTkc7XG4gICAgICAgICAgICAvLyBUT0RPOiBtb3ZlIHRvIGF1ZGlvIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAgICAgc2VsZi5fYmluZEVuZGVkKCk7XG4gICAgICAgICAgICBsZXQgcGxheVByb21pc2UgPSBzZWxmLl9lbGVtZW50LnBsYXkoKTtcbiAgICAgICAgICAgIC8vIGRvbSBhdWRpbyB0aHJvd3MgYW4gZXJyb3IgaWYgcGF1c2UgYXVkaW8gaW1tZWRpYXRlbHkgYWZ0ZXIgcGxheWluZ1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5Qcm9taXNlICYmIHBsYXlQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIHBsYXlQcm9taXNlLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5fdG91Y2hUb1BsYXkoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHByb3RvLl90b3VjaFRvUGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NyYyAmJiB0aGlzLl9zcmMubG9hZE1vZGUgPT09IExvYWRNb2RlLkRPTV9BVURJTyAmJlxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5wYXVzZWQpIHtcbiAgICAgICAgICAgIHRvdWNoUGxheUxpc3QucHVzaCh7IGluc3RhbmNlOiB0aGlzLCBvZmZzZXQ6IDAsIGF1ZGlvOiB0aGlzLl9lbGVtZW50IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvdWNoQmluZGVkKSByZXR1cm47XG4gICAgICAgIHRvdWNoQmluZGVkID0gdHJ1ZTtcblxuICAgICAgICBsZXQgdG91Y2hFdmVudE5hbWUgPSAoJ29udG91Y2hlbmQnIGluIHdpbmRvdykgPyAndG91Y2hlbmQnIDogJ21vdXNlZG93bic7XG4gICAgICAgIC8vIExpc3RlbiB0byB0aGUgdG91Y2hzdGFydCBib2R5IGV2ZW50IGFuZCBwbGF5IHRoZSBhdWRpbyB3aGVuIG5lY2Vzc2FyeS5cbiAgICAgICAgY2MuZ2FtZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50TmFtZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGl0ZW07XG4gICAgICAgICAgICB3aGlsZSAoaXRlbSA9IHRvdWNoUGxheUxpc3QucG9wKCkpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmF1ZGlvLnBsYXkoaXRlbS5vZmZzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcHJvdG8uZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgfTtcblxuICAgIHByb3RvLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRTdGF0ZSgpICE9PSBBdWRpby5TdGF0ZS5QTEFZSU5HKSByZXR1cm47XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fc3JjICYmIHRoaXMuX3NyYy5fZW5zdXJlTG9hZGVkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIHBhdXNlIG9wZXJhdGlvbiBtYXkgZmlyZSAnZW5kZWQnIGV2ZW50XG4gICAgICAgICAgICBzZWxmLl91bmJpbmRFbmRlZCgpO1xuICAgICAgICAgICAgc2VsZi5fZWxlbWVudC5wYXVzZSgpO1xuICAgICAgICAgICAgc2VsZi5fc3RhdGUgPSBBdWRpby5TdGF0ZS5QQVVTRUQ7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBwcm90by5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldFN0YXRlKCkgIT09IEF1ZGlvLlN0YXRlLlBBVVNFRCkgcmV0dXJuO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3NyYyAmJiB0aGlzLl9zcmMuX2Vuc3VyZUxvYWRlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9iaW5kRW5kZWQoKTtcbiAgICAgICAgICAgIHNlbGYuX2VsZW1lbnQucGxheSgpO1xuICAgICAgICAgICAgc2VsZi5fc3RhdGUgPSBBdWRpby5TdGF0ZS5QTEFZSU5HO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcHJvdG8uc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9zcmMgJiYgdGhpcy5fc3JjLl9lbnN1cmVMb2FkZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5fZWxlbWVudC5wYXVzZSgpO1xuICAgICAgICAgICAgc2VsZi5fZWxlbWVudC5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgICAgICAvLyByZW1vdmUgdG91Y2hQbGF5TGlzdFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3VjaFBsYXlMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRvdWNoUGxheUxpc3RbaV0uaW5zdGFuY2UgPT09IHNlbGYpIHtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hQbGF5TGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuX3VuYmluZEVuZGVkKCk7XG4gICAgICAgICAgICBzZWxmLmVtaXQoJ3N0b3AnKTtcbiAgICAgICAgICAgIHNlbGYuX3N0YXRlID0gQXVkaW8uU3RhdGUuU1RPUFBFRDtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHByb3RvLnNldExvb3AgPSBmdW5jdGlvbiAobG9vcCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3NyYyAmJiB0aGlzLl9zcmMuX2Vuc3VyZUxvYWRlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9lbGVtZW50Lmxvb3AgPSBsb29wO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHByb3RvLmdldExvb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50ID8gdGhpcy5fZWxlbWVudC5sb29wIDogZmFsc2U7XG4gICAgfTtcblxuICAgIHByb3RvLnNldFZvbHVtZSA9IGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9zcmMgJiYgdGhpcy5fc3JjLl9lbnN1cmVMb2FkZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5fZWxlbWVudC52b2x1bWUgPSBudW07XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcHJvdG8uZ2V0Vm9sdW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudCA/IHRoaXMuX2VsZW1lbnQudm9sdW1lIDogMTtcbiAgICB9O1xuXG4gICAgcHJvdG8uc2V0Q3VycmVudFRpbWUgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fc3JjICYmIHRoaXMuX3NyYy5fZW5zdXJlTG9hZGVkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIHNldEN1cnJlbnRUaW1lIHdvdWxkIGZpcmUgJ2VuZGVkJyBldmVudFxuICAgICAgICAgICAgLy8gc28gd2UgbmVlZCB0byBjaGFuZ2UgdGhlIGNhbGxiYWNrIHRvIHJlYmluZCBlbmRlZCBjYWxsYmFjayBhZnRlciBzZXRDdXJyZW50VGltZVxuICAgICAgICAgICAgc2VsZi5fdW5iaW5kRW5kZWQoKTtcbiAgICAgICAgICAgIHNlbGYuX2JpbmRFbmRlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fYmluZEVuZGVkKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuX2VsZW1lbnQuY3VycmVudFRpbWUgPSBudW07XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBwcm90by5nZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQgPyB0aGlzLl9lbGVtZW50LmN1cnJlbnRUaW1lIDogMDtcbiAgICB9O1xuXG4gICAgcHJvdG8uZ2V0RHVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcmMgPyB0aGlzLl9zcmMuZHVyYXRpb24gOiAwO1xuICAgIH07XG5cbiAgICBwcm90by5nZXRTdGF0ZSA9IGZ1bmN0aW9uIChmb3JjZVVwZGF0aW5nID0gdHJ1ZSkge1xuICAgICAgICAvLyBIQUNLOiBpbiBzb21lIGJyb3dzZXIsIGF1ZGlvIG1heSBub3QgZmlyZSAnZW5kZWQnIGV2ZW50XG4gICAgICAgIC8vIHNvIHdlIG5lZWQgdG8gZm9yY2UgdXBkYXRpbmcgdGhlIEF1ZGlvIHN0YXRlXG4gICAgICAgIGlmIChmb3JjZVVwZGF0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9mb3JjZVVwZGF0aW5nU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gICAgfTtcblxuICAgIHByb3RvLl9mb3JjZVVwZGF0aW5nU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBlbGVtID0gdGhpcy5fZWxlbWVudDtcbiAgICAgICAgaWYgKGVsZW0pIHtcbiAgICAgICAgICAgIGlmIChBdWRpby5TdGF0ZS5QTEFZSU5HID09PSB0aGlzLl9zdGF0ZSAmJiBlbGVtLnBhdXNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gQXVkaW8uU3RhdGUuU1RPUFBFRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKEF1ZGlvLlN0YXRlLlNUT1BQRUQgPT09IHRoaXMuX3N0YXRlICYmICFlbGVtLnBhdXNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gQXVkaW8uU3RhdGUuUExBWUlORztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdzcmMnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NyYztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoY2xpcCkge1xuICAgICAgICAgICAgdGhpcy5fdW5iaW5kRW5kZWQoKTtcbiAgICAgICAgICAgIGlmIChjbGlwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3JjID0gY2xpcDtcbiAgICAgICAgICAgICAgICBpZiAoIWNsaXAubG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgLy8gbmVlZCB0byBjYWxsIGNsaXAuX2Vuc3VyZUxvYWRlZCBtYW5udWFsbHkgdG8gc3RhcnQgbG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICBjbGlwLm9uY2UoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJbiBjYXNlIHNldCBhIG5ldyBzcmMgd2hlbiB0aGUgb2xkIG9uZSBoYXNuJ3QgZmluaXNoZWQgbG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaXAgPT09IHNlbGYuX3NyYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX29uTG9hZGVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25Mb2FkZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zcmMgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9lbGVtZW50IGluc3RhbmNlb2YgV2ViQXVkaW9FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9lbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuc3JjID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gQXVkaW8uU3RhdGUuSU5JVElBTFpJTkc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2xpcDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdwYXVzZWQnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQgPyB0aGlzLl9lbGVtZW50LnBhdXNlZCA6IHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgLy8gc2V0RmluaXNoQ2FsbGJhY2tcblxufSkoQXVkaW8ucHJvdG90eXBlKTtcblxuXG4vLyBUSU1FX0NPTlNUQU5UIGlzIHVzZWQgYXMgYW4gYXJndW1lbnQgb2Ygc2V0VGFyZ2V0QXRUaW1lIGludGVyZmFjZVxuLy8gVElNRV9DT05TVEFOVCBuZWVkIHRvIGJlIGEgcG9zaXRpdmUgbnVtYmVyIG9uIEVkZ2UgYW5kIEJhaWR1IGJyb3dzZXJcbi8vIFRJTUVfQ09OU1RBTlQgbmVlZCB0byBiZSAwIGJ5IGRlZmF1bHQsIG9yIG1heSBmYWlsIHRvIHNldCB2b2x1bWUgYXQgdGhlIHZlcnkgYmVnaW5uaW5nIG9mIHBsYXlpbmcgYXVkaW9cbmxldCBUSU1FX0NPTlNUQU5UO1xuaWYgKGNjLnN5cy5icm93c2VyVHlwZSA9PT0gY2Muc3lzLkJST1dTRVJfVFlQRV9FREdFIHx8IFxuICAgIGNjLnN5cy5icm93c2VyVHlwZSA9PT0gY2Muc3lzLkJST1dTRVJfVFlQRV9CQUlEVSB8fFxuICAgIGNjLnN5cy5icm93c2VyVHlwZSA9PT0gY2Muc3lzLkJST1dTRVJfVFlQRV9VQykge1xuICAgIFRJTUVfQ09OU1RBTlQgPSAwLjAxO1xufVxuZWxzZSB7XG4gICAgVElNRV9DT05TVEFOVCA9IDA7XG59XG5cbi8vIEVuY2Fwc3VsYXRlZCBXZWJBdWRpbyBpbnRlcmZhY2VcbmxldCBXZWJBdWRpb0VsZW1lbnQgPSBmdW5jdGlvbiAoYnVmZmVyLCBhdWRpbykge1xuICAgIHRoaXMuX2F1ZGlvID0gYXVkaW87XG4gICAgdGhpcy5fY29udGV4dCA9IHN5cy5fX2F1ZGlvU3VwcG9ydC5jb250ZXh0O1xuICAgIHRoaXMuX2J1ZmZlciA9IGJ1ZmZlcjtcblxuICAgIHRoaXMuX2dhaW5PYmogPSB0aGlzLl9jb250ZXh0WydjcmVhdGVHYWluJ10oKTtcbiAgICB0aGlzLnZvbHVtZSA9IDE7XG5cbiAgICB0aGlzLl9nYWluT2JqWydjb25uZWN0J10odGhpcy5fY29udGV4dFsnZGVzdGluYXRpb24nXSk7XG4gICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgIC8vIFRoZSB0aW1lIHN0YW1wIG9uIHRoZSBhdWRpbyB0aW1lIGF4aXMgd2hlbiB0aGUgcmVjb3JkaW5nIGJlZ2lucyB0byBwbGF5LlxuICAgIHRoaXMuX3N0YXJ0VGltZSA9IC0xO1xuICAgIC8vIFJlY29yZCB0aGUgY3VycmVudGx5IHBsYXlpbmcgJ1NvdXJjZSdcbiAgICB0aGlzLl9jdXJyZW50U291cmNlID0gbnVsbDtcbiAgICAvLyBSZWNvcmQgdGhlIHRpbWUgaGFzIGJlZW4gcGxheWVkXG4gICAgdGhpcy5wbGF5ZWRMZW5ndGggPSAwO1xuXG4gICAgdGhpcy5fY3VycmVudFRpbWVyID0gbnVsbDtcblxuICAgIHRoaXMuX2VuZENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5vbmVuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLm9uZW5kZWQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9LmJpbmQodGhpcyk7XG59O1xuXG4oZnVuY3Rpb24gKHByb3RvKSB7XG4gICAgcHJvdG8ucGxheSA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICAgICAgLy8gSWYgcmVwZWF0IHBsYXksIHlvdSBuZWVkIHRvIHN0b3AgYmVmb3JlIGFuIGF1ZGlvXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50U291cmNlICYmICF0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFNvdXJjZS5vbmVuZGVkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTb3VyY2Uuc3RvcCgwKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVkTGVuZ3RoID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhdWRpbyA9IHRoaXMuX2NvbnRleHRbXCJjcmVhdGVCdWZmZXJTb3VyY2VcIl0oKTtcbiAgICAgICAgYXVkaW8uYnVmZmVyID0gdGhpcy5fYnVmZmVyO1xuICAgICAgICBhdWRpb1tcImNvbm5lY3RcIl0odGhpcy5fZ2Fpbk9iaik7XG4gICAgICAgIGF1ZGlvLmxvb3AgPSB0aGlzLl9sb29wO1xuXG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IHRoaXMuX2NvbnRleHQuY3VycmVudFRpbWU7XG4gICAgICAgIG9mZnNldCA9IG9mZnNldCB8fCB0aGlzLnBsYXllZExlbmd0aDtcbiAgICAgICAgaWYgKG9mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRUaW1lIC09IG9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZHVyYXRpb24gPSB0aGlzLl9idWZmZXIuZHVyYXRpb247XG5cbiAgICAgICAgbGV0IHN0YXJ0VGltZSA9IG9mZnNldDtcbiAgICAgICAgbGV0IGVuZFRpbWU7XG4gICAgICAgIGlmICh0aGlzLl9sb29wKSB7XG4gICAgICAgICAgICBpZiAoYXVkaW8uc3RhcnQpXG4gICAgICAgICAgICAgICAgYXVkaW8uc3RhcnQoMCwgc3RhcnRUaW1lKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGF1ZGlvW1wibm90b0dyYWluT25cIl0pXG4gICAgICAgICAgICAgICAgYXVkaW9bXCJub3RlR3JhaW5PblwiXSgwLCBzdGFydFRpbWUpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGF1ZGlvW1wibm90ZU9uXCJdKDAsIHN0YXJ0VGltZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbmRUaW1lID0gZHVyYXRpb24gLSBvZmZzZXQ7XG4gICAgICAgICAgICBpZiAoYXVkaW8uc3RhcnQpXG4gICAgICAgICAgICAgICAgYXVkaW8uc3RhcnQoMCwgc3RhcnRUaW1lLCBlbmRUaW1lKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGF1ZGlvW1wibm90ZUdyYWluT25cIl0pXG4gICAgICAgICAgICAgICAgYXVkaW9bXCJub3RlR3JhaW5PblwiXSgwLCBzdGFydFRpbWUsIGVuZFRpbWUpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGF1ZGlvW1wibm90ZU9uXCJdKDAsIHN0YXJ0VGltZSwgZW5kVGltZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jdXJyZW50U291cmNlID0gYXVkaW87XG5cbiAgICAgICAgYXVkaW8ub25lbmRlZCA9IHRoaXMuX2VuZENhbGxiYWNrO1xuXG4gICAgICAgIC8vIElmIHRoZSBjdXJyZW50IGF1ZGlvIGNvbnRleHQgdGltZSBzdGFtcCBpcyAwIGFuZCBhdWRpbyBjb250ZXh0IHN0YXRlIGlzIHN1c3BlbmRlZFxuICAgICAgICAvLyBUaGVyZSBtYXkgYmUgYSBuZWVkIHRvIHRvdWNoIGV2ZW50cyBiZWZvcmUgeW91IGNhbiBhY3R1YWxseSBzdGFydCBwbGF5aW5nIGF1ZGlvXG4gICAgICAgIGlmICgoIWF1ZGlvLmNvbnRleHQuc3RhdGUgfHwgYXVkaW8uY29udGV4dC5zdGF0ZSA9PT0gXCJzdXNwZW5kZWRcIikgJiYgdGhpcy5fY29udGV4dC5jdXJyZW50VGltZSA9PT0gMCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2N1cnJlbnRUaW1lcik7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5fY29udGV4dC5jdXJyZW50VGltZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaFBsYXlMaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2U6IHNlbGYuX2F1ZGlvLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdWRpbzogc2VsZlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBzeXMgPSBjYy5zeXM7XG4gICAgICAgIGlmIChzeXMub3MgPT09IHN5cy5PU19JT1MgJiYgc3lzLmlzQnJvd3NlciAmJiBzeXMuaXNNb2JpbGUpIHtcbiAgICAgICAgICAgIC8vIEF1ZGlvIGNvbnRleHQgaXMgc3VzcGVuZGVkIHdoZW4geW91IHVucGx1ZyB0aGUgZWFycGhvbmVzLFxuICAgICAgICAgICAgLy8gYW5kIGlzIGludGVycnVwdGVkIHdoZW4gdGhlIGFwcCBlbnRlcnMgYmFja2dyb3VuZC5cbiAgICAgICAgICAgIC8vIEJvdGggbWFrZSB0aGUgYXVkaW9CdWZmZXJTb3VyY2UgdW5wbGF5YWJsZS5cbiAgICAgICAgICAgIGlmICgoYXVkaW8uY29udGV4dC5zdGF0ZSA9PT0gXCJzdXNwZW5kZWRcIiAmJiB0aGlzLl9jb250ZXh0LmN1cnJlbnRUaW1lICE9PSAwKVxuICAgICAgICAgICAgICAgIHx8IGF1ZGlvLmNvbnRleHQuc3RhdGUgPT09ICdpbnRlcnJ1cHRlZCcpIHtcbiAgICAgICAgICAgICAgICAvLyByZWZlcmVuY2U6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9BdWRpb0NvbnRleHQvcmVzdW1lXG4gICAgICAgICAgICAgICAgYXVkaW8uY29udGV4dC5yZXN1bWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcm90by5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2N1cnJlbnRUaW1lcik7XG4gICAgICAgIGlmICh0aGlzLnBhdXNlZCkgcmV0dXJuO1xuICAgICAgICAvLyBSZWNvcmQgdGhlIHRpbWUgdGhlIGN1cnJlbnQgaGFzIGJlZW4gcGxheWVkXG4gICAgICAgIHRoaXMucGxheWVkTGVuZ3RoID0gdGhpcy5fY29udGV4dC5jdXJyZW50VGltZSAtIHRoaXMuX3N0YXJ0VGltZTtcbiAgICAgICAgLy8gSWYgbW9yZSB0aGFuIHRoZSBkdXJhdGlvbiBvZiB0aGUgYXVkaW8sIE5lZWQgdG8gdGFrZSB0aGUgcmVtYWluZGVyXG4gICAgICAgIHRoaXMucGxheWVkTGVuZ3RoICU9IHRoaXMuX2J1ZmZlci5kdXJhdGlvbjtcbiAgICAgICAgbGV0IGF1ZGlvID0gdGhpcy5fY3VycmVudFNvdXJjZTtcbiAgICAgICAgdGhpcy5fY3VycmVudFNvdXJjZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IC0xO1xuICAgICAgICBpZiAoYXVkaW8pXG4gICAgICAgICAgICBhdWRpby5zdG9wKDApO1xuICAgIH07XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdwYXVzZWQnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGN1cnJlbnQgYXVkaW8gaXMgYSBsb29wLCBwYXVzZWQgaXMgZmFsc2VcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50U291cmNlICYmIHRoaXMuX2N1cnJlbnRTb3VyY2UubG9vcClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIHN0YXJ0VGltZSBkZWZhdWx0IGlzIC0xXG4gICAgICAgICAgICBpZiAodGhpcy5fc3RhcnRUaW1lID09PSAtMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gQ3VycmVudCB0aW1lIC0gIFN0YXJ0IHBsYXlpbmcgdGltZSA+IEF1ZGlvIGR1cmF0aW9uXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5jdXJyZW50VGltZSAtIHRoaXMuX3N0YXJ0VGltZSA+IHRoaXMuX2J1ZmZlci5kdXJhdGlvbjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdsb29wJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb29wO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChib29sKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudFNvdXJjZSlcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50U291cmNlLmxvb3AgPSBib29sO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9vcCA9IGJvb2w7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAndm9sdW1lJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92b2x1bWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG51bSkge1xuICAgICAgICAgICAgdGhpcy5fdm9sdW1lID0gbnVtO1xuICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3cuY2hyb21lc3RhdHVzLmNvbS9mZWF0dXJlcy81Mjg3OTk1NzcwOTI5MTUyXG4gICAgICAgICAgICBpZiAodGhpcy5fZ2Fpbk9iai5nYWluLnNldFRhcmdldEF0VGltZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dhaW5PYmouZ2Fpbi5zZXRUYXJnZXRBdFRpbWUobnVtLCB0aGlzLl9jb250ZXh0LmN1cnJlbnRUaW1lLCBUSU1FX0NPTlNUQU5UKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU29tZSBvdGhlciB1bmtub3duIGJyb3dzZXJzIG1heSBjcmFzaCBpZiBUSU1FX0NPTlNUQU5UIGlzIDBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2Fpbk9iai5nYWluLnNldFRhcmdldEF0VGltZShudW0sIHRoaXMuX2NvbnRleHQuY3VycmVudFRpbWUsIDAuMDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dhaW5PYmouZ2Fpbi52YWx1ZSA9IG51bTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN5cy5vcyA9PT0gc3lzLk9TX0lPUyAmJiAhdGhpcy5wYXVzZWQgJiYgdGhpcy5fY3VycmVudFNvdXJjZSkge1xuICAgICAgICAgICAgICAgIC8vIElPUyBtdXN0IGJlIHN0b3Agd2ViQXVkaW9cbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50U291cmNlLm9uZW5kZWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdjdXJyZW50VGltZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZWRMZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZWNvcmQgdGhlIHRpbWUgdGhlIGN1cnJlbnQgaGFzIGJlZW4gcGxheWVkXG4gICAgICAgICAgICB0aGlzLnBsYXllZExlbmd0aCA9IHRoaXMuX2NvbnRleHQuY3VycmVudFRpbWUgLSB0aGlzLl9zdGFydFRpbWU7XG4gICAgICAgICAgICAvLyBJZiBtb3JlIHRoYW4gdGhlIGR1cmF0aW9uIG9mIHRoZSBhdWRpbywgTmVlZCB0byB0YWtlIHRoZSByZW1haW5kZXJcbiAgICAgICAgICAgIHRoaXMucGxheWVkTGVuZ3RoICU9IHRoaXMuX2J1ZmZlci5kdXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllZExlbmd0aDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVkTGVuZ3RoID0gbnVtO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllZExlbmd0aCA9IG51bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudW07XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnZHVyYXRpb24nLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlci5kdXJhdGlvbjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG5cbn0pKFdlYkF1ZGlvRWxlbWVudC5wcm90b3R5cGUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNjLl9BdWRpbyA9IEF1ZGlvO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=