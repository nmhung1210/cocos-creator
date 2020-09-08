
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
        var self = this;

        clip._ensureLoaded(function () {
          // In case set a new src when the old one hasn't finished loading
          if (clip === self._src) {
            self._onLoaded();
          }
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9hdWRpby9DQ0F1ZGlvLmpzIl0sIm5hbWVzIjpbIkV2ZW50VGFyZ2V0IiwicmVxdWlyZSIsInN5cyIsIkxvYWRNb2RlIiwidG91Y2hCaW5kZWQiLCJ0b3VjaFBsYXlMaXN0IiwiQXVkaW8iLCJzcmMiLCJjYWxsIiwiX3Nob3VsZFJlY3ljbGVPbkVuZGVkIiwiX3NyYyIsIl9lbGVtZW50IiwiaWQiLCJfc3RhdGUiLCJTdGF0ZSIsIklOSVRJQUxaSU5HIiwiX29uZW5kZWQiLCJTVE9QUEVEIiwiZW1pdCIsImJpbmQiLCJjYyIsImpzIiwiZXh0ZW5kIiwiRVJST1IiLCJQTEFZSU5HIiwiUEFVU0VEIiwicHJvdG8iLCJfYmluZEVuZGVkIiwiY2FsbGJhY2siLCJlbGVtIiwiSFRNTEF1ZGlvRWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbmVuZGVkIiwiX3VuYmluZEVuZGVkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIl9vbkxvYWRlZCIsIl9jcmVhdGVFbGVtZW50Iiwic2V0Vm9sdW1lIiwic2V0TG9vcCIsIl9uYXRpdmVBc3NldCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIldlYkF1ZGlvRWxlbWVudCIsInBsYXkiLCJzZWxmIiwiX2Vuc3VyZUxvYWRlZCIsInBsYXlQcm9taXNlIiwid2luZG93IiwiUHJvbWlzZSIsImVyciIsIl90b3VjaFRvUGxheSIsImxvYWRNb2RlIiwiRE9NX0FVRElPIiwicGF1c2VkIiwicHVzaCIsImluc3RhbmNlIiwib2Zmc2V0IiwiYXVkaW8iLCJ0b3VjaEV2ZW50TmFtZSIsImdhbWUiLCJjYW52YXMiLCJpdGVtIiwicG9wIiwiZGVzdHJveSIsInBhdXNlIiwiZ2V0U3RhdGUiLCJyZXN1bWUiLCJzdG9wIiwiY3VycmVudFRpbWUiLCJpIiwibGVuZ3RoIiwic3BsaWNlIiwibG9vcCIsImdldExvb3AiLCJudW0iLCJ2b2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRDdXJyZW50VGltZSIsImdldEN1cnJlbnRUaW1lIiwiZ2V0RHVyYXRpb24iLCJkdXJhdGlvbiIsImZvcmNlVXBkYXRpbmciLCJfZm9yY2VVcGRhdGluZ1N0YXRlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJzZXQiLCJjbGlwIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsInByb3RvdHlwZSIsIlRJTUVfQ09OU1RBTlQiLCJicm93c2VyVHlwZSIsIkJST1dTRVJfVFlQRV9FREdFIiwiQlJPV1NFUl9UWVBFX0JBSURVIiwiQlJPV1NFUl9UWVBFX1VDIiwiYnVmZmVyIiwiX2F1ZGlvIiwiX2NvbnRleHQiLCJfX2F1ZGlvU3VwcG9ydCIsImNvbnRleHQiLCJfYnVmZmVyIiwiX2dhaW5PYmoiLCJfbG9vcCIsIl9zdGFydFRpbWUiLCJfY3VycmVudFNvdXJjZSIsInBsYXllZExlbmd0aCIsIl9jdXJyZW50VGltZXIiLCJfZW5kQ2FsbGJhY2siLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwic3RhcnQiLCJzdGF0ZSIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJvcyIsIk9TX0lPUyIsImlzQnJvd3NlciIsImlzTW9iaWxlIiwiYm9vbCIsIl92b2x1bWUiLCJnYWluIiwic2V0VGFyZ2V0QXRUaW1lIiwiZSIsInZhbHVlIiwibW9kdWxlIiwiZXhwb3J0cyIsIl9BdWRpbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxJQUFNQSxXQUFXLEdBQUdDLE9BQU8sQ0FBQyw0QkFBRCxDQUEzQjs7QUFDQSxJQUFNQyxHQUFHLEdBQUdELE9BQU8sQ0FBQyx3QkFBRCxDQUFuQjs7QUFDQSxJQUFNRSxRQUFRLEdBQUdGLE9BQU8sQ0FBQyw0QkFBRCxDQUFQLENBQXNDRSxRQUF2RDs7QUFFQSxJQUFJQyxXQUFXLEdBQUcsS0FBbEI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsQ0FDaEI7QUFEZ0IsQ0FBcEI7O0FBSUEsSUFBSUMsS0FBSyxHQUFHLFNBQVJBLEtBQVEs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LGVBQU8sS0FBS3FELFlBQVo7QUFDSCxPQUhZLENBSWI7OztBQUNBLFdBQUtBLFlBQUwsR0FBb0IsS0FBS1IsUUFBTCxDQUFjOUIsV0FBZCxHQUE0QixLQUFLb0MsVUFBckQsQ0FMYSxDQU1iOztBQUNBLFdBQUtFLFlBQUwsSUFBcUIsS0FBS0wsT0FBTCxDQUFhckIsUUFBbEM7QUFDQSxhQUFPLEtBQUswQixZQUFaO0FBQ0gsS0FWdUM7QUFXeENwQixJQUFBQSxHQUFHLEVBQUUsYUFBVVosR0FBVixFQUFlO0FBQ2hCLFVBQUksQ0FBQyxLQUFLckIsTUFBVixFQUFrQjtBQUNkLGFBQUtXLEtBQUw7QUFDQSxhQUFLMEMsWUFBTCxHQUFvQmhDLEdBQXBCO0FBQ0EsYUFBSy9CLElBQUw7QUFDSCxPQUpELE1BSU87QUFDSCxhQUFLK0QsWUFBTCxHQUFvQmhDLEdBQXBCO0FBQ0g7O0FBQ0QsYUFBT0EsR0FBUDtBQUNILEtBcEJ1QztBQXFCeENjLElBQUFBLFVBQVUsRUFBRSxJQXJCNEI7QUFzQnhDQyxJQUFBQSxZQUFZLEVBQUU7QUF0QjBCLEdBQTVDO0FBeUJBTixFQUFBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0IxRCxLQUF0QixFQUE2QixVQUE3QixFQUF5QztBQUNyQzJELElBQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsYUFBTyxLQUFLZ0IsT0FBTCxDQUFhckIsUUFBcEI7QUFDSCxLQUhvQztBQUlyQ1EsSUFBQUEsVUFBVSxFQUFFLElBSnlCO0FBS3JDQyxJQUFBQSxZQUFZLEVBQUU7QUFMdUIsR0FBekM7QUFRSCxDQXRMRCxFQXNMRy9DLGVBQWUsQ0FBQ2dELFNBdExuQjs7QUF3TEFtQyxNQUFNLENBQUNDLE9BQVAsR0FBaUIxRyxFQUFFLENBQUMyRyxNQUFILEdBQVl6SCxLQUE3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDA4LTIwMTAgUmljYXJkbyBRdWVzYWRhXG4gQ29weXJpZ2h0IChjKSAyMDExLTIwMTIgY29jb3MyZC14Lm9yZ1xuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuLi9jb3JlL2V2ZW50L2V2ZW50LXRhcmdldCcpO1xuY29uc3Qgc3lzID0gcmVxdWlyZSgnLi4vY29yZS9wbGF0Zm9ybS9DQ1N5cycpO1xuY29uc3QgTG9hZE1vZGUgPSByZXF1aXJlKCcuLi9jb3JlL2Fzc2V0cy9DQ0F1ZGlvQ2xpcCcpLkxvYWRNb2RlO1xuXG5sZXQgdG91Y2hCaW5kZWQgPSBmYWxzZTtcbmxldCB0b3VjaFBsYXlMaXN0ID0gW1xuICAgIC8veyBpbnN0YW5jZTogQXVkaW8sIG9mZnNldDogMCwgYXVkaW86IGF1ZGlvIH1cbl07XG5cbmxldCBBdWRpbyA9IGZ1bmN0aW9uIChzcmMpIHtcbiAgICBFdmVudFRhcmdldC5jYWxsKHRoaXMpO1xuICAgIHRoaXMuX3Nob3VsZFJlY3ljbGVPbkVuZGVkID0gZmFsc2U7XG4gICAgdGhpcy5fc3JjID0gc3JjO1xuICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuaWQgPSAwO1xuICAgIHRoaXMuX3N0YXRlID0gQXVkaW8uU3RhdGUuSU5JVElBTFpJTkc7XG5cbiAgICB0aGlzLl9vbmVuZGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IEF1ZGlvLlN0YXRlLlNUT1BQRUQ7XG4gICAgICAgIHRoaXMuZW1pdCgnZW5kZWQnKTtcbiAgICB9LmJpbmQodGhpcyk7XG59O1xuXG5jYy5qcy5leHRlbmQoQXVkaW8sIEV2ZW50VGFyZ2V0KTtcblxuLyoqXG4gKiAhI2VuIEF1ZGlvIHN0YXRlLlxuICogISN6aCDlo7Dpn7Pmkq3mlL7nirbmgIFcbiAqIEBlbnVtIGF1ZGlvRW5naW5lLkF1ZGlvU3RhdGVcbiAqIEBtZW1iZXJvZiBjY1xuICovXG4vLyBUT0RPIC0gQXQgcHJlc2VudCwgdGhlIHN0YXRlIGlzIG1peGVkIHdpdGggdHdvIHN0YXRlcyBvZiB1c2VycyBhbmQgc3lzdGVtcywgYW5kIGl0IGlzIGJlc3QgdG8gc3BsaXQgaW50byB0d28gdHlwZXMuIEEgXCJsb2FkaW5nXCIgc2hvdWxkIGFsc28gYmUgYWRkZWQgdG8gdGhlIHN5c3RlbSBzdGF0ZS5cbkF1ZGlvLlN0YXRlID0ge1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBFUlJPUlxuICAgICAqL1xuICAgIEVSUk9SIDogLTEsXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IElOSVRJQUxaSU5HXG4gICAgICovXG4gICAgSU5JVElBTFpJTkc6IDAsXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBMQVlJTkdcbiAgICAgKi9cbiAgICBQTEFZSU5HOiAxLFxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQQVVTRURcbiAgICAgKi9cbiAgICBQQVVTRUQ6IDIsXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNUT1BQRURcbiAgICAgKi9cbiAgICBTVE9QUEVEOiAzLFxufTtcblxuKGZ1bmN0aW9uIChwcm90bykge1xuXG4gICAgcHJvdG8uX2JpbmRFbmRlZCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IHRoaXMuX29uZW5kZWQ7XG4gICAgICAgIGxldCBlbGVtID0gdGhpcy5fZWxlbWVudDtcbiAgICAgICAgaWYgKHRoaXMuX3NyYyAmJiAoZWxlbSBpbnN0YW5jZW9mIEhUTUxBdWRpb0VsZW1lbnQpKSB7XG4gICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgY2FsbGJhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbS5vbmVuZGVkID0gY2FsbGJhY2s7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJvdG8uX3VuYmluZEVuZGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgZWxlbSA9IHRoaXMuX2VsZW1lbnQ7XG4gICAgICAgIGlmIChlbGVtIGluc3RhbmNlb2YgSFRNTEF1ZGlvRWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdlbmRlZCcsIHRoaXMuX29uZW5kZWQpO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW0pIHtcbiAgICAgICAgICAgIGVsZW0ub25lbmRlZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJvdG8uX29uTG9hZGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9jcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gQXVkaW8uU3RhdGUuSU5JVElBTFpJTkc7XG4gICAgICAgIHRoaXMuc2V0Vm9sdW1lKDEpO1xuICAgICAgICB0aGlzLnNldExvb3AoZmFsc2UpO1xuICAgIH07XG5cbiAgICBwcm90by5fY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGVsZW0gPSB0aGlzLl9zcmMuX25hdGl2ZUFzc2V0O1xuICAgICAgICBpZiAoZWxlbSBpbnN0YW5jZW9mIEhUTUxBdWRpb0VsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIFJldXNlIGRvbSBhdWRpbyBlbGVtZW50XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuc3JjID0gZWxlbS5zcmM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50ID0gbmV3IFdlYkF1ZGlvRWxlbWVudChlbGVtLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcm90by5wbGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3NyYyAmJiB0aGlzLl9zcmMuX2Vuc3VyZUxvYWRlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBtYXJrZWQgYXMgcGxheWluZyBzbyBpdCB3aWxsIHBsYXlPbkxvYWRcbiAgICAgICAgICAgIHNlbGYuX3N0YXRlID0gQXVkaW8uU3RhdGUuUExBWUlORztcbiAgICAgICAgICAgIC8vIFRPRE86IG1vdmUgdG8gYXVkaW8gZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgICAgICBzZWxmLl9iaW5kRW5kZWQoKTtcbiAgICAgICAgICAgIGxldCBwbGF5UHJvbWlzZSA9IHNlbGYuX2VsZW1lbnQucGxheSgpO1xuICAgICAgICAgICAgLy8gZG9tIGF1ZGlvIHRocm93cyBhbiBlcnJvciBpZiBwYXVzZSBhdWRpbyBpbW1lZGlhdGVseSBhZnRlciBwbGF5aW5nXG4gICAgICAgICAgICBpZiAod2luZG93LlByb21pc2UgJiYgcGxheVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgcGxheVByb21pc2UuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLl90b3VjaFRvUGxheSgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcHJvdG8uX3RvdWNoVG9QbGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fc3JjICYmIHRoaXMuX3NyYy5sb2FkTW9kZSA9PT0gTG9hZE1vZGUuRE9NX0FVRElPICYmXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50LnBhdXNlZCkge1xuICAgICAgICAgICAgdG91Y2hQbGF5TGlzdC5wdXNoKHsgaW5zdGFuY2U6IHRoaXMsIG9mZnNldDogMCwgYXVkaW86IHRoaXMuX2VsZW1lbnQgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG91Y2hCaW5kZWQpIHJldHVybjtcbiAgICAgICAgdG91Y2hCaW5kZWQgPSB0cnVlO1xuXG4gICAgICAgIGxldCB0b3VjaEV2ZW50TmFtZSA9ICgnb250b3VjaGVuZCcgaW4gd2luZG93KSA/ICd0b3VjaGVuZCcgOiAnbW91c2Vkb3duJztcbiAgICAgICAgLy8gTGlzdGVuIHRvIHRoZSB0b3VjaHN0YXJ0IGJvZHkgZXZlbnQgYW5kIHBsYXkgdGhlIGF1ZGlvIHdoZW4gbmVjZXNzYXJ5LlxuICAgICAgICBjYy5nYW1lLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnROYW1lLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgaXRlbTtcbiAgICAgICAgICAgIHdoaWxlIChpdGVtID0gdG91Y2hQbGF5TGlzdC5wb3AoKSkge1xuICAgICAgICAgICAgICAgIGl0ZW0uYXVkaW8ucGxheShpdGVtLm9mZnNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBwcm90by5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgcHJvdG8ucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldFN0YXRlKCkgIT09IEF1ZGlvLlN0YXRlLlBMQVlJTkcpIHJldHVybjtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9zcmMgJiYgdGhpcy5fc3JjLl9lbnN1cmVMb2FkZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gcGF1c2Ugb3BlcmF0aW9uIG1heSBmaXJlICdlbmRlZCcgZXZlbnRcbiAgICAgICAgICAgIHNlbGYuX3VuYmluZEVuZGVkKCk7XG4gICAgICAgICAgICBzZWxmLl9lbGVtZW50LnBhdXNlKCk7XG4gICAgICAgICAgICBzZWxmLl9zdGF0ZSA9IEF1ZGlvLlN0YXRlLlBBVVNFRDtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHByb3RvLnJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0U3RhdGUoKSAhPT0gQXVkaW8uU3RhdGUuUEFVU0VEKSByZXR1cm47XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fc3JjICYmIHRoaXMuX3NyYy5fZW5zdXJlTG9hZGVkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuX2JpbmRFbmRlZCgpO1xuICAgICAgICAgICAgc2VsZi5fZWxlbWVudC5wbGF5KCk7XG4gICAgICAgICAgICBzZWxmLl9zdGF0ZSA9IEF1ZGlvLlN0YXRlLlBMQVlJTkc7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBwcm90by5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3NyYyAmJiB0aGlzLl9zcmMuX2Vuc3VyZUxvYWRlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9lbGVtZW50LnBhdXNlKCk7XG4gICAgICAgICAgICBzZWxmLl9lbGVtZW50LmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0b3VjaFBsYXlMaXN0XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdWNoUGxheUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodG91Y2hQbGF5TGlzdFtpXS5pbnN0YW5jZSA9PT0gc2VsZikge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaFBsYXlMaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5fdW5iaW5kRW5kZWQoKTtcbiAgICAgICAgICAgIHNlbGYuZW1pdCgnc3RvcCcpO1xuICAgICAgICAgICAgc2VsZi5fc3RhdGUgPSBBdWRpby5TdGF0ZS5TVE9QUEVEO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcHJvdG8uc2V0TG9vcCA9IGZ1bmN0aW9uIChsb29wKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fc3JjICYmIHRoaXMuX3NyYy5fZW5zdXJlTG9hZGVkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuX2VsZW1lbnQubG9vcCA9IGxvb3A7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcHJvdG8uZ2V0TG9vcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQgPyB0aGlzLl9lbGVtZW50Lmxvb3AgOiBmYWxzZTtcbiAgICB9O1xuXG4gICAgcHJvdG8uc2V0Vm9sdW1lID0gZnVuY3Rpb24gKG51bSkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3NyYyAmJiB0aGlzLl9zcmMuX2Vuc3VyZUxvYWRlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9lbGVtZW50LnZvbHVtZSA9IG51bTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBwcm90by5nZXRWb2x1bWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50ID8gdGhpcy5fZWxlbWVudC52b2x1bWUgOiAxO1xuICAgIH07XG5cbiAgICBwcm90by5zZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9zcmMgJiYgdGhpcy5fc3JjLl9lbnN1cmVMb2FkZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gc2V0Q3VycmVudFRpbWUgd291bGQgZmlyZSAnZW5kZWQnIGV2ZW50XG4gICAgICAgICAgICAvLyBzbyB3ZSBuZWVkIHRvIGNoYW5nZSB0aGUgY2FsbGJhY2sgdG8gcmViaW5kIGVuZGVkIGNhbGxiYWNrIGFmdGVyIHNldEN1cnJlbnRUaW1lXG4gICAgICAgICAgICBzZWxmLl91bmJpbmRFbmRlZCgpO1xuICAgICAgICAgICAgc2VsZi5fYmluZEVuZGVkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9iaW5kRW5kZWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5fZWxlbWVudC5jdXJyZW50VGltZSA9IG51bTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHByb3RvLmdldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudCA/IHRoaXMuX2VsZW1lbnQuY3VycmVudFRpbWUgOiAwO1xuICAgIH07XG5cbiAgICBwcm90by5nZXREdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NyYyA/IHRoaXMuX3NyYy5kdXJhdGlvbiA6IDA7XG4gICAgfTtcblxuICAgIHByb3RvLmdldFN0YXRlID0gZnVuY3Rpb24gKGZvcmNlVXBkYXRpbmcgPSB0cnVlKSB7XG4gICAgICAgIC8vIEhBQ0s6IGluIHNvbWUgYnJvd3NlciwgYXVkaW8gbWF5IG5vdCBmaXJlICdlbmRlZCcgZXZlbnRcbiAgICAgICAgLy8gc28gd2UgbmVlZCB0byBmb3JjZSB1cGRhdGluZyB0aGUgQXVkaW8gc3RhdGVcbiAgICAgICAgaWYgKGZvcmNlVXBkYXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvcmNlVXBkYXRpbmdTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgICB9O1xuXG4gICAgcHJvdG8uX2ZvcmNlVXBkYXRpbmdTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGVsZW0gPSB0aGlzLl9lbGVtZW50O1xuICAgICAgICBpZiAoZWxlbSkge1xuICAgICAgICAgICAgaWYgKEF1ZGlvLlN0YXRlLlBMQVlJTkcgPT09IHRoaXMuX3N0YXRlICYmIGVsZW0ucGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBBdWRpby5TdGF0ZS5TVE9QUEVEO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoQXVkaW8uU3RhdGUuU1RPUFBFRCA9PT0gdGhpcy5fc3RhdGUgJiYgIWVsZW0ucGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBBdWRpby5TdGF0ZS5QTEFZSU5HO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ3NyYycsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3JjO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChjbGlwKSB7XG4gICAgICAgICAgICB0aGlzLl91bmJpbmRFbmRlZCgpO1xuICAgICAgICAgICAgaWYgKGNsaXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zcmMgPSBjbGlwO1xuICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBjbGlwLl9lbnN1cmVMb2FkZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJbiBjYXNlIHNldCBhIG5ldyBzcmMgd2hlbiB0aGUgb2xkIG9uZSBoYXNuJ3QgZmluaXNoZWQgbG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xpcCA9PT0gc2VsZi5fc3JjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9vbkxvYWRlZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zcmMgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9lbGVtZW50IGluc3RhbmNlb2YgV2ViQXVkaW9FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9lbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuc3JjID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gQXVkaW8uU3RhdGUuSU5JVElBTFpJTkc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2xpcDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdwYXVzZWQnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQgPyB0aGlzLl9lbGVtZW50LnBhdXNlZCA6IHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgLy8gc2V0RmluaXNoQ2FsbGJhY2tcblxufSkoQXVkaW8ucHJvdG90eXBlKTtcblxuXG4vLyBUSU1FX0NPTlNUQU5UIGlzIHVzZWQgYXMgYW4gYXJndW1lbnQgb2Ygc2V0VGFyZ2V0QXRUaW1lIGludGVyZmFjZVxuLy8gVElNRV9DT05TVEFOVCBuZWVkIHRvIGJlIGEgcG9zaXRpdmUgbnVtYmVyIG9uIEVkZ2UgYW5kIEJhaWR1IGJyb3dzZXJcbi8vIFRJTUVfQ09OU1RBTlQgbmVlZCB0byBiZSAwIGJ5IGRlZmF1bHQsIG9yIG1heSBmYWlsIHRvIHNldCB2b2x1bWUgYXQgdGhlIHZlcnkgYmVnaW5uaW5nIG9mIHBsYXlpbmcgYXVkaW9cbmxldCBUSU1FX0NPTlNUQU5UO1xuaWYgKGNjLnN5cy5icm93c2VyVHlwZSA9PT0gY2Muc3lzLkJST1dTRVJfVFlQRV9FREdFIHx8IFxuICAgIGNjLnN5cy5icm93c2VyVHlwZSA9PT0gY2Muc3lzLkJST1dTRVJfVFlQRV9CQUlEVSB8fFxuICAgIGNjLnN5cy5icm93c2VyVHlwZSA9PT0gY2Muc3lzLkJST1dTRVJfVFlQRV9VQykge1xuICAgIFRJTUVfQ09OU1RBTlQgPSAwLjAxO1xufVxuZWxzZSB7XG4gICAgVElNRV9DT05TVEFOVCA9IDA7XG59XG5cbi8vIEVuY2Fwc3VsYXRlZCBXZWJBdWRpbyBpbnRlcmZhY2VcbmxldCBXZWJBdWRpb0VsZW1lbnQgPSBmdW5jdGlvbiAoYnVmZmVyLCBhdWRpbykge1xuICAgIHRoaXMuX2F1ZGlvID0gYXVkaW87XG4gICAgdGhpcy5fY29udGV4dCA9IHN5cy5fX2F1ZGlvU3VwcG9ydC5jb250ZXh0O1xuICAgIHRoaXMuX2J1ZmZlciA9IGJ1ZmZlcjtcblxuICAgIHRoaXMuX2dhaW5PYmogPSB0aGlzLl9jb250ZXh0WydjcmVhdGVHYWluJ10oKTtcbiAgICB0aGlzLnZvbHVtZSA9IDE7XG5cbiAgICB0aGlzLl9nYWluT2JqWydjb25uZWN0J10odGhpcy5fY29udGV4dFsnZGVzdGluYXRpb24nXSk7XG4gICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgIC8vIFRoZSB0aW1lIHN0YW1wIG9uIHRoZSBhdWRpbyB0aW1lIGF4aXMgd2hlbiB0aGUgcmVjb3JkaW5nIGJlZ2lucyB0byBwbGF5LlxuICAgIHRoaXMuX3N0YXJ0VGltZSA9IC0xO1xuICAgIC8vIFJlY29yZCB0aGUgY3VycmVudGx5IHBsYXlpbmcgJ1NvdXJjZSdcbiAgICB0aGlzLl9jdXJyZW50U291cmNlID0gbnVsbDtcbiAgICAvLyBSZWNvcmQgdGhlIHRpbWUgaGFzIGJlZW4gcGxheWVkXG4gICAgdGhpcy5wbGF5ZWRMZW5ndGggPSAwO1xuXG4gICAgdGhpcy5fY3VycmVudFRpbWVyID0gbnVsbDtcblxuICAgIHRoaXMuX2VuZENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5vbmVuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLm9uZW5kZWQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9LmJpbmQodGhpcyk7XG59O1xuXG4oZnVuY3Rpb24gKHByb3RvKSB7XG4gICAgcHJvdG8ucGxheSA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICAgICAgLy8gSWYgcmVwZWF0IHBsYXksIHlvdSBuZWVkIHRvIHN0b3AgYmVmb3JlIGFuIGF1ZGlvXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50U291cmNlICYmICF0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFNvdXJjZS5vbmVuZGVkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTb3VyY2Uuc3RvcCgwKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVkTGVuZ3RoID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhdWRpbyA9IHRoaXMuX2NvbnRleHRbXCJjcmVhdGVCdWZmZXJTb3VyY2VcIl0oKTtcbiAgICAgICAgYXVkaW8uYnVmZmVyID0gdGhpcy5fYnVmZmVyO1xuICAgICAgICBhdWRpb1tcImNvbm5lY3RcIl0odGhpcy5fZ2Fpbk9iaik7XG4gICAgICAgIGF1ZGlvLmxvb3AgPSB0aGlzLl9sb29wO1xuXG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IHRoaXMuX2NvbnRleHQuY3VycmVudFRpbWU7XG4gICAgICAgIG9mZnNldCA9IG9mZnNldCB8fCB0aGlzLnBsYXllZExlbmd0aDtcbiAgICAgICAgaWYgKG9mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRUaW1lIC09IG9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZHVyYXRpb24gPSB0aGlzLl9idWZmZXIuZHVyYXRpb247XG5cbiAgICAgICAgbGV0IHN0YXJ0VGltZSA9IG9mZnNldDtcbiAgICAgICAgbGV0IGVuZFRpbWU7XG4gICAgICAgIGlmICh0aGlzLl9sb29wKSB7XG4gICAgICAgICAgICBpZiAoYXVkaW8uc3RhcnQpXG4gICAgICAgICAgICAgICAgYXVkaW8uc3RhcnQoMCwgc3RhcnRUaW1lKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGF1ZGlvW1wibm90b0dyYWluT25cIl0pXG4gICAgICAgICAgICAgICAgYXVkaW9bXCJub3RlR3JhaW5PblwiXSgwLCBzdGFydFRpbWUpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGF1ZGlvW1wibm90ZU9uXCJdKDAsIHN0YXJ0VGltZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbmRUaW1lID0gZHVyYXRpb24gLSBvZmZzZXQ7XG4gICAgICAgICAgICBpZiAoYXVkaW8uc3RhcnQpXG4gICAgICAgICAgICAgICAgYXVkaW8uc3RhcnQoMCwgc3RhcnRUaW1lLCBlbmRUaW1lKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGF1ZGlvW1wibm90ZUdyYWluT25cIl0pXG4gICAgICAgICAgICAgICAgYXVkaW9bXCJub3RlR3JhaW5PblwiXSgwLCBzdGFydFRpbWUsIGVuZFRpbWUpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGF1ZGlvW1wibm90ZU9uXCJdKDAsIHN0YXJ0VGltZSwgZW5kVGltZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jdXJyZW50U291cmNlID0gYXVkaW87XG5cbiAgICAgICAgYXVkaW8ub25lbmRlZCA9IHRoaXMuX2VuZENhbGxiYWNrO1xuXG4gICAgICAgIC8vIElmIHRoZSBjdXJyZW50IGF1ZGlvIGNvbnRleHQgdGltZSBzdGFtcCBpcyAwIGFuZCBhdWRpbyBjb250ZXh0IHN0YXRlIGlzIHN1c3BlbmRlZFxuICAgICAgICAvLyBUaGVyZSBtYXkgYmUgYSBuZWVkIHRvIHRvdWNoIGV2ZW50cyBiZWZvcmUgeW91IGNhbiBhY3R1YWxseSBzdGFydCBwbGF5aW5nIGF1ZGlvXG4gICAgICAgIGlmICgoIWF1ZGlvLmNvbnRleHQuc3RhdGUgfHwgYXVkaW8uY29udGV4dC5zdGF0ZSA9PT0gXCJzdXNwZW5kZWRcIikgJiYgdGhpcy5fY29udGV4dC5jdXJyZW50VGltZSA9PT0gMCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2N1cnJlbnRUaW1lcik7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5fY29udGV4dC5jdXJyZW50VGltZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaFBsYXlMaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2U6IHNlbGYuX2F1ZGlvLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdWRpbzogc2VsZlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBzeXMgPSBjYy5zeXM7XG4gICAgICAgIGlmIChzeXMub3MgPT09IHN5cy5PU19JT1MgJiYgc3lzLmlzQnJvd3NlciAmJiBzeXMuaXNNb2JpbGUpIHtcbiAgICAgICAgICAgIC8vIEF1ZGlvIGNvbnRleHQgaXMgc3VzcGVuZGVkIHdoZW4geW91IHVucGx1ZyB0aGUgZWFycGhvbmVzLFxuICAgICAgICAgICAgLy8gYW5kIGlzIGludGVycnVwdGVkIHdoZW4gdGhlIGFwcCBlbnRlcnMgYmFja2dyb3VuZC5cbiAgICAgICAgICAgIC8vIEJvdGggbWFrZSB0aGUgYXVkaW9CdWZmZXJTb3VyY2UgdW5wbGF5YWJsZS5cbiAgICAgICAgICAgIGlmICgoYXVkaW8uY29udGV4dC5zdGF0ZSA9PT0gXCJzdXNwZW5kZWRcIiAmJiB0aGlzLl9jb250ZXh0LmN1cnJlbnRUaW1lICE9PSAwKVxuICAgICAgICAgICAgICAgIHx8IGF1ZGlvLmNvbnRleHQuc3RhdGUgPT09ICdpbnRlcnJ1cHRlZCcpIHtcbiAgICAgICAgICAgICAgICAvLyByZWZlcmVuY2U6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9BdWRpb0NvbnRleHQvcmVzdW1lXG4gICAgICAgICAgICAgICAgYXVkaW8uY29udGV4dC5yZXN1bWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcm90by5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2N1cnJlbnRUaW1lcik7XG4gICAgICAgIGlmICh0aGlzLnBhdXNlZCkgcmV0dXJuO1xuICAgICAgICAvLyBSZWNvcmQgdGhlIHRpbWUgdGhlIGN1cnJlbnQgaGFzIGJlZW4gcGxheWVkXG4gICAgICAgIHRoaXMucGxheWVkTGVuZ3RoID0gdGhpcy5fY29udGV4dC5jdXJyZW50VGltZSAtIHRoaXMuX3N0YXJ0VGltZTtcbiAgICAgICAgLy8gSWYgbW9yZSB0aGFuIHRoZSBkdXJhdGlvbiBvZiB0aGUgYXVkaW8sIE5lZWQgdG8gdGFrZSB0aGUgcmVtYWluZGVyXG4gICAgICAgIHRoaXMucGxheWVkTGVuZ3RoICU9IHRoaXMuX2J1ZmZlci5kdXJhdGlvbjtcbiAgICAgICAgbGV0IGF1ZGlvID0gdGhpcy5fY3VycmVudFNvdXJjZTtcbiAgICAgICAgdGhpcy5fY3VycmVudFNvdXJjZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IC0xO1xuICAgICAgICBpZiAoYXVkaW8pXG4gICAgICAgICAgICBhdWRpby5zdG9wKDApO1xuICAgIH07XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdwYXVzZWQnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGN1cnJlbnQgYXVkaW8gaXMgYSBsb29wLCBwYXVzZWQgaXMgZmFsc2VcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50U291cmNlICYmIHRoaXMuX2N1cnJlbnRTb3VyY2UubG9vcClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIHN0YXJ0VGltZSBkZWZhdWx0IGlzIC0xXG4gICAgICAgICAgICBpZiAodGhpcy5fc3RhcnRUaW1lID09PSAtMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gQ3VycmVudCB0aW1lIC0gIFN0YXJ0IHBsYXlpbmcgdGltZSA+IEF1ZGlvIGR1cmF0aW9uXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5jdXJyZW50VGltZSAtIHRoaXMuX3N0YXJ0VGltZSA+IHRoaXMuX2J1ZmZlci5kdXJhdGlvbjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdsb29wJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb29wO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChib29sKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudFNvdXJjZSlcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50U291cmNlLmxvb3AgPSBib29sO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9vcCA9IGJvb2w7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAndm9sdW1lJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92b2x1bWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG51bSkge1xuICAgICAgICAgICAgdGhpcy5fdm9sdW1lID0gbnVtO1xuICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3cuY2hyb21lc3RhdHVzLmNvbS9mZWF0dXJlcy81Mjg3OTk1NzcwOTI5MTUyXG4gICAgICAgICAgICBpZiAodGhpcy5fZ2Fpbk9iai5nYWluLnNldFRhcmdldEF0VGltZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dhaW5PYmouZ2Fpbi5zZXRUYXJnZXRBdFRpbWUobnVtLCB0aGlzLl9jb250ZXh0LmN1cnJlbnRUaW1lLCBUSU1FX0NPTlNUQU5UKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU29tZSBvdGhlciB1bmtub3duIGJyb3dzZXJzIG1heSBjcmFzaCBpZiBUSU1FX0NPTlNUQU5UIGlzIDBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2Fpbk9iai5nYWluLnNldFRhcmdldEF0VGltZShudW0sIHRoaXMuX2NvbnRleHQuY3VycmVudFRpbWUsIDAuMDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dhaW5PYmouZ2Fpbi52YWx1ZSA9IG51bTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN5cy5vcyA9PT0gc3lzLk9TX0lPUyAmJiAhdGhpcy5wYXVzZWQgJiYgdGhpcy5fY3VycmVudFNvdXJjZSkge1xuICAgICAgICAgICAgICAgIC8vIElPUyBtdXN0IGJlIHN0b3Agd2ViQXVkaW9cbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50U291cmNlLm9uZW5kZWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdjdXJyZW50VGltZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZWRMZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZWNvcmQgdGhlIHRpbWUgdGhlIGN1cnJlbnQgaGFzIGJlZW4gcGxheWVkXG4gICAgICAgICAgICB0aGlzLnBsYXllZExlbmd0aCA9IHRoaXMuX2NvbnRleHQuY3VycmVudFRpbWUgLSB0aGlzLl9zdGFydFRpbWU7XG4gICAgICAgICAgICAvLyBJZiBtb3JlIHRoYW4gdGhlIGR1cmF0aW9uIG9mIHRoZSBhdWRpbywgTmVlZCB0byB0YWtlIHRoZSByZW1haW5kZXJcbiAgICAgICAgICAgIHRoaXMucGxheWVkTGVuZ3RoICU9IHRoaXMuX2J1ZmZlci5kdXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllZExlbmd0aDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVkTGVuZ3RoID0gbnVtO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllZExlbmd0aCA9IG51bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudW07XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnZHVyYXRpb24nLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlci5kdXJhdGlvbjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG5cbn0pKFdlYkF1ZGlvRWxlbWVudC5wcm90b3R5cGUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNjLl9BdWRpbyA9IEF1ZGlvO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=