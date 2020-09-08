
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCAudioSource.js';
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
var misc = require('../utils/misc');

var Component = require('./CCComponent');

var AudioClip = require('../assets/CCAudioClip');
/**
 * !#en Audio Source.
 * !#zh 音频源组件，能对音频剪辑。
 * @class AudioSource
 * @extends Component
 */


var AudioSource = cc.Class({
  name: 'cc.AudioSource',
  "extends": Component,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.others/AudioSource',
    help: 'i18n:COMPONENT.help_url.audiosource'
  },
  ctor: function ctor() {
    // We can't require Audio here because jsb Audio is implemented outside the engine,
    // it can only take effect rely on overwriting cc._Audio
    this.audio = new cc._Audio();
  },
  properties: {
    _clip: {
      "default": null,
      type: AudioClip
    },
    _volume: 1,
    _mute: false,
    _loop: false,
    _pausedFlag: {
      "default": false,
      serializable: false
    },

    /**
     * !#en
     * Is the audio source playing (Read Only). <br/>
     * Note: isPlaying is not supported for Native platforms.
     * !#zh
     * 该音频剪辑是否正播放（只读）。<br/>
     * 注意：Native 平台暂时不支持 isPlaying。
     * @property isPlaying
     * @type {Boolean}
     * @readOnly
     * @default false
     */
    isPlaying: {
      get: function get() {
        var state = this.audio.getState();
        return state === cc._Audio.State.PLAYING;
      },
      visible: false
    },

    /**
     * !#en The clip of the audio source to play.
     * !#zh 要播放的音频剪辑。
     * @property clip
     * @type {AudioClip}
     * @default 1
     */
    clip: {
      get: function get() {
        return this._clip;
      },
      set: function set(value) {
        if (value === this._clip) {
          return;
        }

        if (!(value instanceof AudioClip)) {
          return cc.error('Wrong type of AudioClip.');
        }

        this._clip = value;
        this.audio.stop();

        if (this.preload) {
          this.audio.src = this._clip;
        }
      },
      type: AudioClip,
      tooltip: CC_DEV && 'i18n:COMPONENT.audio.clip',
      animatable: false
    },

    /**
     * !#en The volume of the audio source.
     * !#zh 音频源的音量（0.0 ~ 1.0）。
     * @property volume
     * @type {Number}
     * @default 1
     */
    volume: {
      get: function get() {
        return this._volume;
      },
      set: function set(value) {
        value = misc.clamp01(value);
        this._volume = value;

        if (!this._mute) {
          this.audio.setVolume(value);
        }

        return value;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.audio.volume'
    },

    /**
     * !#en Is the audio source mute?
     * !#zh 是否静音音频源。Mute 是设置音量为 0，取消静音是恢复原来的音量。
     * @property mute
     * @type {Boolean}
     * @default false
     */
    mute: {
      get: function get() {
        return this._mute;
      },
      set: function set(value) {
        this._mute = value;
        this.audio.setVolume(value ? 0 : this._volume);
        return value;
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.audio.mute'
    },

    /**
     * !#en Is the audio source looping?
     * !#zh 音频源是否循环播放？
     * @property loop
     * @type {Boolean}
     * @default false
     */
    loop: {
      get: function get() {
        return this._loop;
      },
      set: function set(value) {
        this._loop = value;
        this.audio.setLoop(value);
        return value;
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.audio.loop'
    },

    /**
     * !#en If set to true, the audio source will automatically start playing on onEnable.
     * !#zh 如果设置为 true，音频源将在 onEnable 时自动播放。
     * @property playOnLoad
     * @type {Boolean}
     * @default true
     */
    playOnLoad: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.audio.play_on_load',
      animatable: false
    },
    preload: {
      "default": false,
      animatable: false
    }
  },
  _ensureDataLoaded: function _ensureDataLoaded() {
    if (this.audio.src !== this._clip) {
      this.audio.src = this._clip;
    }
  },
  _pausedCallback: function _pausedCallback() {
    var state = this.audio.getState();

    if (state === cc._Audio.State.PLAYING) {
      this.audio.pause();
      this._pausedFlag = true;
    }
  },
  _restoreCallback: function _restoreCallback() {
    if (this._pausedFlag) {
      this.audio.resume();
    }

    this._pausedFlag = false;
  },
  onLoad: function onLoad() {
    this.audio.setVolume(this._mute ? 0 : this._volume);
    this.audio.setLoop(this._loop);
  },
  onEnable: function onEnable() {
    if (this.preload) {
      this.audio.src = this._clip;
    }

    if (this.playOnLoad) {
      this.play();
    }

    cc.game.on(cc.game.EVENT_HIDE, this._pausedCallback, this);
    cc.game.on(cc.game.EVENT_SHOW, this._restoreCallback, this);
  },
  onDisable: function onDisable() {
    this.stop();
    cc.game.off(cc.game.EVENT_HIDE, this._pausedCallback, this);
    cc.game.off(cc.game.EVENT_SHOW, this._restoreCallback, this);
  },
  onDestroy: function onDestroy() {
    this.stop();
    this.audio.destroy();
    cc.audioEngine.uncache(this._clip);
  },

  /**
   * !#en Plays the clip.
   * !#zh 播放音频剪辑。
   * @method play
   */
  play: function play() {
    if (!this._clip) return;
    var audio = this.audio;

    if (this._clip.loaded) {
      audio.stop();
    }

    this._ensureDataLoaded();

    audio.setCurrentTime(0);
    audio.play();
  },

  /**
   * !#en Stops the clip.
   * !#zh 停止当前音频剪辑。
   * @method stop
   */
  stop: function stop() {
    this.audio.stop();
  },

  /**
   * !#en Pause the clip.
   * !#zh 暂停当前音频剪辑。
   * @method pause
   */
  pause: function pause() {
    this.audio.pause();
  },

  /**
   * !#en Resume the clip.
   * !#zh 恢复播放。
   * @method resume
   */
  resume: function resume() {
    this._ensureDataLoaded();

    this.audio.resume();
  },

  /**
   * !#en Rewind playing music.
   * !#zh 从头开始播放。
   * @method rewind
   */
  rewind: function rewind() {
    this.audio.setCurrentTime(0);
  },

  /**
   * !#en Get current time
   * !#zh 获取当前的播放时间
   * @method getCurrentTime
   * @return {Number}
   */
  getCurrentTime: function getCurrentTime() {
    return this.audio.getCurrentTime();
  },

  /**
   * !#en Set current time
   * !#zh 设置当前的播放时间
   * @method setCurrentTime
   * @param {Number} time
   * @return {Number}
   */
  setCurrentTime: function setCurrentTime(time) {
    this.audio.setCurrentTime(time);
    return time;
  },

  /**
   * !#en Get audio duration
   * !#zh 获取当前音频的长度
   * @method getDuration
   * @return {Number}
   */
  getDuration: function getDuration() {
    return this.audio.getDuration();
  }
});
cc.AudioSource = module.exports = AudioSource;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NBdWRpb1NvdXJjZS5qcyJdLCJuYW1lcyI6WyJtaXNjIiwicmVxdWlyZSIsIkNvbXBvbmVudCIsIkF1ZGlvQ2xpcCIsIkF1ZGlvU291cmNlIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwiaGVscCIsImN0b3IiLCJhdWRpbyIsIl9BdWRpbyIsInByb3BlcnRpZXMiLCJfY2xpcCIsInR5cGUiLCJfdm9sdW1lIiwiX211dGUiLCJfbG9vcCIsIl9wYXVzZWRGbGFnIiwic2VyaWFsaXphYmxlIiwiaXNQbGF5aW5nIiwiZ2V0Iiwic3RhdGUiLCJnZXRTdGF0ZSIsIlN0YXRlIiwiUExBWUlORyIsInZpc2libGUiLCJjbGlwIiwic2V0IiwidmFsdWUiLCJlcnJvciIsInN0b3AiLCJwcmVsb2FkIiwic3JjIiwidG9vbHRpcCIsIkNDX0RFViIsImFuaW1hdGFibGUiLCJ2b2x1bWUiLCJjbGFtcDAxIiwic2V0Vm9sdW1lIiwibXV0ZSIsImxvb3AiLCJzZXRMb29wIiwicGxheU9uTG9hZCIsIl9lbnN1cmVEYXRhTG9hZGVkIiwiX3BhdXNlZENhbGxiYWNrIiwicGF1c2UiLCJfcmVzdG9yZUNhbGxiYWNrIiwicmVzdW1lIiwib25Mb2FkIiwib25FbmFibGUiLCJwbGF5IiwiZ2FtZSIsIm9uIiwiRVZFTlRfSElERSIsIkVWRU5UX1NIT1ciLCJvbkRpc2FibGUiLCJvZmYiLCJvbkRlc3Ryb3kiLCJkZXN0cm95IiwiYXVkaW9FbmdpbmUiLCJ1bmNhY2hlIiwibG9hZGVkIiwic2V0Q3VycmVudFRpbWUiLCJyZXdpbmQiLCJnZXRDdXJyZW50VGltZSIsInRpbWUiLCJnZXREdXJhdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8s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LEVBQUUsaUJBQVk7QUFDZixTQUFLcEMsS0FBTCxDQUFXb0MsS0FBWDtBQUNILEdBaFBzQjs7QUFrUHZCOzs7OztBQUtBRSxFQUFBQSxNQUFNLEVBQUUsa0JBQVk7QUFDaEIsU0FBS0osaUJBQUw7O0FBQ0EsU0FBS2xDLEtBQUwsQ0FBV3NDLE1BQVg7QUFDSCxHQTFQc0I7O0FBNFB2Qjs7Ozs7QUFLQWdCLEVBQUFBLE1BQU0sRUFBRSxrQkFBVTtBQUNkLFNBQUt0RCxLQUFMLENBQVdxRCxjQUFYLENBQTBCLENBQTFCO0FBQ0gsR0FuUXNCOztBQXFRdkI7Ozs7OztBQU1BRSxFQUFBQSxjQUFjLEVBQUUsMEJBQVk7QUFDeEIsV0FBTyxLQUFLdkQsS0FBTCxDQUFXdUQsY0FBWCxFQUFQO0FBQ0gsR0E3UXNCOztBQStRdkI7Ozs7Ozs7QUFPQUYsRUFBQUEsY0FBYyxFQUFFLHdCQUFVRyxJQUFWLEVBQWdCO0FBQzVCLFNBQUt4RCxLQUFMLENBQVdxRCxjQUFYLENBQTBCRyxJQUExQjtBQUNBLFdBQU9BLElBQVA7QUFDSCxHQXpSc0I7O0FBMlJ2Qjs7Ozs7O0FBTUFDLEVBQUFBLFdBQVcsRUFBRSx1QkFBWTtBQUNyQixXQUFPLEtBQUt6RCxLQUFMLENBQVd5RCxXQUFYLEVBQVA7QUFDSDtBQW5Tc0IsQ0FBVCxDQUFsQjtBQXVTQWpFLEVBQUUsQ0FBQ0QsV0FBSCxHQUFpQm1FLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnBFLFdBQWxDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBtaXNjID0gcmVxdWlyZSgnLi4vdXRpbHMvbWlzYycpO1xuY29uc3QgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9DQ0NvbXBvbmVudCcpO1xuY29uc3QgQXVkaW9DbGlwID0gcmVxdWlyZSgnLi4vYXNzZXRzL0NDQXVkaW9DbGlwJyk7XG5cbi8qKlxuICogISNlbiBBdWRpbyBTb3VyY2UuXG4gKiAhI3poIOmfs+mikea6kOe7hOS7tu+8jOiDveWvuemfs+mikeWJqui+keOAglxuICogQGNsYXNzIEF1ZGlvU291cmNlXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcbiAqL1xudmFyIEF1ZGlvU291cmNlID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5BdWRpb1NvdXJjZScsXG4gICAgZXh0ZW5kczogQ29tcG9uZW50LFxuXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50Lm90aGVycy9BdWRpb1NvdXJjZScsXG4gICAgICAgIGhlbHA6ICdpMThuOkNPTVBPTkVOVC5oZWxwX3VybC5hdWRpb3NvdXJjZScsXG4gICAgfSxcblxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gV2UgY2FuJ3QgcmVxdWlyZSBBdWRpbyBoZXJlIGJlY2F1c2UganNiIEF1ZGlvIGlzIGltcGxlbWVudGVkIG91dHNpZGUgdGhlIGVuZ2luZSxcbiAgICAgICAgLy8gaXQgY2FuIG9ubHkgdGFrZSBlZmZlY3QgcmVseSBvbiBvdmVyd3JpdGluZyBjYy5fQXVkaW9cbiAgICAgICAgdGhpcy5hdWRpbyA9IG5ldyBjYy5fQXVkaW8oKTtcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfY2xpcDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IEF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICBfdm9sdW1lOiAxLFxuICAgICAgICBfbXV0ZTogZmFsc2UsXG4gICAgICAgIF9sb29wOiBmYWxzZSxcbiAgICAgICAgX3BhdXNlZEZsYWc6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIElzIHRoZSBhdWRpbyBzb3VyY2UgcGxheWluZyAoUmVhZCBPbmx5KS4gPGJyLz5cbiAgICAgICAgICogTm90ZTogaXNQbGF5aW5nIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIE5hdGl2ZSBwbGF0Zm9ybXMuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6K+l6Z+z6aKR5Ymq6L6R5piv5ZCm5q2j5pKt5pS+77yI5Y+q6K+777yJ44CCPGJyLz5cbiAgICAgICAgICog5rOo5oSP77yaTmF0aXZlIOW5s+WPsOaaguaXtuS4jeaUr+aMgSBpc1BsYXlpbmfjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGlzUGxheWluZ1xuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBpc1BsYXlpbmc6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuYXVkaW8uZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUgPT09IGNjLl9BdWRpby5TdGF0ZS5QTEFZSU5HO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGNsaXAgb2YgdGhlIGF1ZGlvIHNvdXJjZSB0byBwbGF5LlxuICAgICAgICAgKiAhI3poIOimgeaSreaUvueahOmfs+mikeWJqui+keOAglxuICAgICAgICAgKiBAcHJvcGVydHkgY2xpcFxuICAgICAgICAgKiBAdHlwZSB7QXVkaW9DbGlwfVxuICAgICAgICAgKiBAZGVmYXVsdCAxXG4gICAgICAgICAqL1xuICAgICAgICBjbGlwOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2xpcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5fY2xpcCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghKHZhbHVlIGluc3RhbmNlb2YgQXVkaW9DbGlwKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2MuZXJyb3IoJ1dyb25nIHR5cGUgb2YgQXVkaW9DbGlwLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9jbGlwID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5zdG9wKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJlbG9hZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnNyYyA9IHRoaXMuX2NsaXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IEF1ZGlvQ2xpcCxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYXVkaW8uY2xpcCcsXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSB2b2x1bWUgb2YgdGhlIGF1ZGlvIHNvdXJjZS5cbiAgICAgICAgICogISN6aCDpn7PpopHmupDnmoTpn7Pph4/vvIgwLjAgfiAxLjDvvInjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHZvbHVtZVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZGVmYXVsdCAxXG4gICAgICAgICAqL1xuICAgICAgICB2b2x1bWU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl92b2x1bWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG1pc2MuY2xhbXAwMSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdm9sdW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9tdXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8uc2V0Vm9sdW1lKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYXVkaW8udm9sdW1lJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIElzIHRoZSBhdWRpbyBzb3VyY2UgbXV0ZT9cbiAgICAgICAgICogISN6aCDmmK/lkKbpnZnpn7Ppn7PpopHmupDjgIJNdXRlIOaYr+iuvue9rumfs+mHj+S4uiAw77yM5Y+W5raI6Z2Z6Z+z5piv5oGi5aSN5Y6f5p2l55qE6Z+z6YeP44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBtdXRlXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgbXV0ZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX211dGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tdXRlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5zZXRWb2x1bWUodmFsdWUgPyAwIDogdGhpcy5fdm9sdW1lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmF1ZGlvLm11dGUnLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIElzIHRoZSBhdWRpbyBzb3VyY2UgbG9vcGluZz9cbiAgICAgICAgICogISN6aCDpn7PpopHmupDmmK/lkKblvqrnjq/mkq3mlL7vvJ9cbiAgICAgICAgICogQHByb3BlcnR5IGxvb3BcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBsb29wOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9vcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvb3AgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnNldExvb3AodmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYXVkaW8ubG9vcCdcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIGF1ZGlvIHNvdXJjZSB3aWxsIGF1dG9tYXRpY2FsbHkgc3RhcnQgcGxheWluZyBvbiBvbkVuYWJsZS5cbiAgICAgICAgICogISN6aCDlpoLmnpzorr7nva7kuLogdHJ1Ze+8jOmfs+mikea6kOWwhuWcqCBvbkVuYWJsZSDml7boh6rliqjmkq3mlL7jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHBsYXlPbkxvYWRcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgICAgICovXG4gICAgICAgIHBsYXlPbkxvYWQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5hdWRpby5wbGF5X29uX2xvYWQnLFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBwcmVsb2FkOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2Vuc3VyZURhdGFMb2FkZWQgKCkge1xuICAgICAgICBpZiAodGhpcy5hdWRpby5zcmMgIT09IHRoaXMuX2NsaXApIHtcbiAgICAgICAgICAgIHRoaXMuYXVkaW8uc3JjID0gdGhpcy5fY2xpcDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfcGF1c2VkQ2FsbGJhY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5hdWRpby5nZXRTdGF0ZSgpO1xuICAgICAgICBpZiAoc3RhdGUgPT09IGNjLl9BdWRpby5TdGF0ZS5QTEFZSU5HKSB7XG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnBhdXNlKCk7XG4gICAgICAgICAgICB0aGlzLl9wYXVzZWRGbGFnID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfcmVzdG9yZUNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXVzZWRGbGFnKSB7XG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnJlc3VtZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BhdXNlZEZsYWcgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYXVkaW8uc2V0Vm9sdW1lKHRoaXMuX211dGUgPyAwIDogdGhpcy5fdm9sdW1lKTtcbiAgICAgICAgdGhpcy5hdWRpby5zZXRMb29wKHRoaXMuX2xvb3ApO1xuICAgIH0sXG5cbiAgICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5wcmVsb2FkKSB7XG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnNyYyA9IHRoaXMuX2NsaXA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGxheU9uTG9hZCkge1xuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX0hJREUsIHRoaXMuX3BhdXNlZENhbGxiYWNrLCB0aGlzKTtcbiAgICAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX1NIT1csIHRoaXMuX3Jlc3RvcmVDYWxsYmFjaywgdGhpcyk7XG4gICAgfSxcblxuICAgIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgY2MuZ2FtZS5vZmYoY2MuZ2FtZS5FVkVOVF9ISURFLCB0aGlzLl9wYXVzZWRDYWxsYmFjaywgdGhpcyk7XG4gICAgICAgIGNjLmdhbWUub2ZmKGNjLmdhbWUuRVZFTlRfU0hPVywgdGhpcy5fcmVzdG9yZUNhbGxiYWNrLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgb25EZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICB0aGlzLmF1ZGlvLmRlc3Ryb3koKTtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUudW5jYWNoZSh0aGlzLl9jbGlwKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBQbGF5cyB0aGUgY2xpcC5cbiAgICAgKiAhI3poIOaSreaUvumfs+mikeWJqui+keOAglxuICAgICAqIEBtZXRob2QgcGxheVxuICAgICAqL1xuICAgIHBsYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCAhdGhpcy5fY2xpcCApIHJldHVybjtcblxuICAgICAgICB2YXIgYXVkaW8gPSB0aGlzLmF1ZGlvO1xuICAgICAgICBpZiAodGhpcy5fY2xpcC5sb2FkZWQpIHtcbiAgICAgICAgICAgIGF1ZGlvLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9lbnN1cmVEYXRhTG9hZGVkKCk7XG4gICAgICAgIGF1ZGlvLnNldEN1cnJlbnRUaW1lKDApO1xuICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU3RvcHMgdGhlIGNsaXAuXG4gICAgICogISN6aCDlgZzmraLlvZPliY3pn7PpopHliarovpHjgIJcbiAgICAgKiBAbWV0aG9kIHN0b3BcbiAgICAgKi9cbiAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYXVkaW8uc3RvcCgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFBhdXNlIHRoZSBjbGlwLlxuICAgICAqICEjemgg5pqC5YGc5b2T5YmN6Z+z6aKR5Ymq6L6R44CCXG4gICAgICogQG1ldGhvZCBwYXVzZVxuICAgICAqL1xuICAgIHBhdXNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYXVkaW8ucGF1c2UoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXN1bWUgdGhlIGNsaXAuXG4gICAgICogISN6aCDmgaLlpI3mkq3mlL7jgIJcbiAgICAgKiBAbWV0aG9kIHJlc3VtZVxuICAgICAqL1xuICAgIHJlc3VtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9lbnN1cmVEYXRhTG9hZGVkKCk7XG4gICAgICAgIHRoaXMuYXVkaW8ucmVzdW1lKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV3aW5kIHBsYXlpbmcgbXVzaWMuXG4gICAgICogISN6aCDku47lpLTlvIDlp4vmkq3mlL7jgIJcbiAgICAgKiBAbWV0aG9kIHJld2luZFxuICAgICAqL1xuICAgIHJld2luZDogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5hdWRpby5zZXRDdXJyZW50VGltZSgwKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgY3VycmVudCB0aW1lXG4gICAgICogISN6aCDojrflj5blvZPliY3nmoTmkq3mlL7ml7bpl7RcbiAgICAgKiBAbWV0aG9kIGdldEN1cnJlbnRUaW1lXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldEN1cnJlbnRUaW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1ZGlvLmdldEN1cnJlbnRUaW1lKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IGN1cnJlbnQgdGltZVxuICAgICAqICEjemgg6K6+572u5b2T5YmN55qE5pKt5pS+5pe26Ze0XG4gICAgICogQG1ldGhvZCBzZXRDdXJyZW50VGltZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIHNldEN1cnJlbnRUaW1lOiBmdW5jdGlvbiAodGltZSkge1xuICAgICAgICB0aGlzLmF1ZGlvLnNldEN1cnJlbnRUaW1lKHRpbWUpO1xuICAgICAgICByZXR1cm4gdGltZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgYXVkaW8gZHVyYXRpb25cbiAgICAgKiAhI3poIOiOt+WPluW9k+WJjemfs+mikeeahOmVv+W6plxuICAgICAqIEBtZXRob2QgZ2V0RHVyYXRpb25cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0RHVyYXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXVkaW8uZ2V0RHVyYXRpb24oKTtcbiAgICB9XG5cbn0pO1xuXG5jYy5BdWRpb1NvdXJjZSA9IG1vZHVsZS5leHBvcnRzID0gQXVkaW9Tb3VyY2U7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==