
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
    _firstlyEnabled: true,

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
        this.audio.src = this._clip;

        if (this.preload) {
          this._clip._ensureLoaded();
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

    /**
     * !#en If set to true and AudioClip is a deferred load resource, the component will preload AudioClip in the onLoad phase.
     * !#zh 如果设置为 true 且 AudioClip 为延迟加载资源，组件将在 onLoad 阶段预加载 AudioClip。
     * @property preload
     * @type {Boolean}
     * @default false
     */
    preload: {
      "default": false,
      animatable: false
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
    this.audio.src = this._clip;

    if (this.preload) {
      this._clip._ensureLoaded();
    }
  },
  onEnable: function onEnable() {
    if (this.playOnLoad && this._firstlyEnabled) {
      this._firstlyEnabled = false;
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

    audio.setVolume(this._mute ? 0 : this._volume);
    audio.setLoop(this._loop);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NBdWRpb1NvdXJjZS5qcyJdLCJuYW1lcyI6WyJtaXNjIiwicmVxdWlyZSIsIkNvbXBvbmVudCIsIkF1ZGlvQ2xpcCIsIkF1ZGlvU291cmNlIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwiaGVscCIsImN0b3IiLCJhdWRpbyIsIl9BdWRpbyIsInByb3BlcnRpZXMiLCJfY2xpcCIsInR5cGUiLCJfdm9sdW1lIiwiX211dGUiLCJfbG9vcCIsIl9wYXVzZWRGbGFnIiwic2VyaWFsaXphYmxlIiwiX2ZpcnN0bHlFbmFibGVkIiwiaXNQbGF5aW5nIiwiZ2V0Iiwic3RhdGUiLCJnZXRTdGF0ZSIsIlN0YXRlIiwiUExBWUlORyIsInZpc2libGUiLCJjbGlwIiwic2V0IiwidmFsdWUiLCJlcnJvciIsInN0b3AiLCJzcmMiLCJwcmVsb2FkIiwiX2Vuc3VyZUxvYWRlZCIsInRvb2x0aXAiLCJDQ19ERVYiLCJhbmltYXRhYmxlIiwidm9sdW1lIiwiY2xhbXAwMSIsInNldFZvbHVtZSIsIm11dGUiLCJsb29wIiwic2V0TG9vcCIsInBsYXlPbkxvYWQiLCJfcGF1c2VkQ2FsbGJhY2siLCJwYXVzZSIsIl9yZXN0b3JlQ2FsbGJhY2siLCJyZXN1bWUiLCJvbkxvYWQiLCJvbkVuYWJsZSIsInBsYXkiLCJnYW1lIiwib24iLCJFVkVOVF9ISURFIiwiRVZFTlRfU0hPVyIsIm9uRGlzYWJsZSIsIm9mZiIsIm9uRGVzdHJveSIsImRlc3Ryb3kiLCJhdWRpb0VuZ2luZSIsInVuY2FjaGUiLCJsb2FkZWQiLCJzZXRDdXJyZW50VGltZSIsInJld2luZCIsImdldEN1cnJlbnRUaW1lIiwidGltZSIsImdldER1cmF0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQU1BLElB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O0FBQ2YsU0FBS3JDLEtBQUwsQ0FBV3FDLEtBQVg7QUFDSCxHQXBQc0I7O0FBc1B2Qjs7Ozs7QUFLQUUsRUFBQUEsTUFBTSxFQUFFLGtCQUFZO0FBQ2hCLFNBQUt2QyxLQUFMLENBQVd1QyxNQUFYO0FBQ0gsR0E3UHNCOztBQStQdkI7Ozs7O0FBS0FnQixFQUFBQSxNQUFNLEVBQUUsa0JBQVU7QUFDZCxTQUFLdkQsS0FBTCxDQUFXc0QsY0FBWCxDQUEwQixDQUExQjtBQUNILEdBdFFzQjs7QUF3UXZCOzs7Ozs7QUFNQUUsRUFBQUEsY0FBYyxFQUFFLDBCQUFZO0FBQ3hCLFdBQU8sS0FBS3hELEtBQUwsQ0FBV3dELGNBQVgsRUFBUDtBQUNILEdBaFJzQjs7QUFrUnZCOzs7Ozs7O0FBT0FGLEVBQUFBLGNBQWMsRUFBRSx3QkFBVUcsSUFBVixFQUFnQjtBQUM1QixTQUFLekQsS0FBTCxDQUFXc0QsY0FBWCxDQUEwQkcsSUFBMUI7QUFDQSxXQUFPQSxJQUFQO0FBQ0gsR0E1UnNCOztBQThSdkI7Ozs7OztBQU1BQyxFQUFBQSxXQUFXLEVBQUUsdUJBQVk7QUFDckIsV0FBTyxLQUFLMUQsS0FBTCxDQUFXMEQsV0FBWCxFQUFQO0FBQ0g7QUF0U3NCLENBQVQsQ0FBbEI7QUEwU0FsRSxFQUFFLENBQUNELFdBQUgsR0FBaUJvRSxNQUFNLENBQUNDLE9BQVAsR0FBaUJyRSxXQUFsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgbWlzYyA9IHJlcXVpcmUoJy4uL3V0aWxzL21pc2MnKTtcbmNvbnN0IENvbXBvbmVudCA9IHJlcXVpcmUoJy4vQ0NDb21wb25lbnQnKTtcbmNvbnN0IEF1ZGlvQ2xpcCA9IHJlcXVpcmUoJy4uL2Fzc2V0cy9DQ0F1ZGlvQ2xpcCcpO1xuXG4vKipcbiAqICEjZW4gQXVkaW8gU291cmNlLlxuICogISN6aCDpn7PpopHmupDnu4Tku7bvvIzog73lr7npn7PpopHliarovpHjgIJcbiAqIEBjbGFzcyBBdWRpb1NvdXJjZVxuICogQGV4dGVuZHMgQ29tcG9uZW50XG4gKi9cbnZhciBBdWRpb1NvdXJjZSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuQXVkaW9Tb3VyY2UnLFxuICAgIGV4dGVuZHM6IENvbXBvbmVudCxcblxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5vdGhlcnMvQXVkaW9Tb3VyY2UnLFxuICAgICAgICBoZWxwOiAnaTE4bjpDT01QT05FTlQuaGVscF91cmwuYXVkaW9zb3VyY2UnLFxuICAgIH0sXG5cbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFdlIGNhbid0IHJlcXVpcmUgQXVkaW8gaGVyZSBiZWNhdXNlIGpzYiBBdWRpbyBpcyBpbXBsZW1lbnRlZCBvdXRzaWRlIHRoZSBlbmdpbmUsXG4gICAgICAgIC8vIGl0IGNhbiBvbmx5IHRha2UgZWZmZWN0IHJlbHkgb24gb3ZlcndyaXRpbmcgY2MuX0F1ZGlvXG4gICAgICAgIHRoaXMuYXVkaW8gPSBuZXcgY2MuX0F1ZGlvKCk7XG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX2NsaXA6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBBdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICAgICAgX3ZvbHVtZTogMSxcbiAgICAgICAgX211dGU6IGZhbHNlLFxuICAgICAgICBfbG9vcDogZmFsc2UsXG4gICAgICAgIF9wYXVzZWRGbGFnOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgX2ZpcnN0bHlFbmFibGVkOiB0cnVlLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIElzIHRoZSBhdWRpbyBzb3VyY2UgcGxheWluZyAoUmVhZCBPbmx5KS4gPGJyLz5cbiAgICAgICAgICogTm90ZTogaXNQbGF5aW5nIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIE5hdGl2ZSBwbGF0Zm9ybXMuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6K+l6Z+z6aKR5Ymq6L6R5piv5ZCm5q2j5pKt5pS+77yI5Y+q6K+777yJ44CCPGJyLz5cbiAgICAgICAgICog5rOo5oSP77yaTmF0aXZlIOW5s+WPsOaaguaXtuS4jeaUr+aMgSBpc1BsYXlpbmfjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGlzUGxheWluZ1xuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBpc1BsYXlpbmc6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuYXVkaW8uZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUgPT09IGNjLl9BdWRpby5TdGF0ZS5QTEFZSU5HO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGNsaXAgb2YgdGhlIGF1ZGlvIHNvdXJjZSB0byBwbGF5LlxuICAgICAgICAgKiAhI3poIOimgeaSreaUvueahOmfs+mikeWJqui+keOAglxuICAgICAgICAgKiBAcHJvcGVydHkgY2xpcFxuICAgICAgICAgKiBAdHlwZSB7QXVkaW9DbGlwfVxuICAgICAgICAgKiBAZGVmYXVsdCAxXG4gICAgICAgICAqL1xuICAgICAgICBjbGlwOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2xpcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5fY2xpcCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghKHZhbHVlIGluc3RhbmNlb2YgQXVkaW9DbGlwKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2MuZXJyb3IoJ1dyb25nIHR5cGUgb2YgQXVkaW9DbGlwLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9jbGlwID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5zdG9wKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5zcmMgPSB0aGlzLl9jbGlwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2xpcC5fZW5zdXJlTG9hZGVkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IEF1ZGlvQ2xpcCxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYXVkaW8uY2xpcCcsXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSB2b2x1bWUgb2YgdGhlIGF1ZGlvIHNvdXJjZS5cbiAgICAgICAgICogISN6aCDpn7PpopHmupDnmoTpn7Pph4/vvIgwLjAgfiAxLjDvvInjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHZvbHVtZVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZGVmYXVsdCAxXG4gICAgICAgICAqL1xuICAgICAgICB2b2x1bWU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl92b2x1bWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG1pc2MuY2xhbXAwMSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdm9sdW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9tdXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8uc2V0Vm9sdW1lKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYXVkaW8udm9sdW1lJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIElzIHRoZSBhdWRpbyBzb3VyY2UgbXV0ZT9cbiAgICAgICAgICogISN6aCDmmK/lkKbpnZnpn7Ppn7PpopHmupDjgIJNdXRlIOaYr+iuvue9rumfs+mHj+S4uiAw77yM5Y+W5raI6Z2Z6Z+z5piv5oGi5aSN5Y6f5p2l55qE6Z+z6YeP44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBtdXRlXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgbXV0ZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX211dGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tdXRlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5zZXRWb2x1bWUodmFsdWUgPyAwIDogdGhpcy5fdm9sdW1lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmF1ZGlvLm11dGUnLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIElzIHRoZSBhdWRpbyBzb3VyY2UgbG9vcGluZz9cbiAgICAgICAgICogISN6aCDpn7PpopHmupDmmK/lkKblvqrnjq/mkq3mlL7vvJ9cbiAgICAgICAgICogQHByb3BlcnR5IGxvb3BcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBsb29wOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9vcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvb3AgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvLnNldExvb3AodmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYXVkaW8ubG9vcCdcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIGF1ZGlvIHNvdXJjZSB3aWxsIGF1dG9tYXRpY2FsbHkgc3RhcnQgcGxheWluZyBvbiBvbkVuYWJsZS5cbiAgICAgICAgICogISN6aCDlpoLmnpzorr7nva7kuLogdHJ1Ze+8jOmfs+mikea6kOWwhuWcqCBvbkVuYWJsZSDml7boh6rliqjmkq3mlL7jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHBsYXlPbkxvYWRcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgICAgICovXG4gICAgICAgIHBsYXlPbkxvYWQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5hdWRpby5wbGF5X29uX2xvYWQnLFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBJZiBzZXQgdG8gdHJ1ZSBhbmQgQXVkaW9DbGlwIGlzIGEgZGVmZXJyZWQgbG9hZCByZXNvdXJjZSwgdGhlIGNvbXBvbmVudCB3aWxsIHByZWxvYWQgQXVkaW9DbGlwIGluIHRoZSBvbkxvYWQgcGhhc2UuXG4gICAgICAgICAqICEjemgg5aaC5p6c6K6+572u5Li6IHRydWUg5LiUIEF1ZGlvQ2xpcCDkuLrlu7bov5/liqDovb3otYTmupDvvIznu4Tku7blsIblnKggb25Mb2FkIOmYtuautemihOWKoOi9vSBBdWRpb0NsaXDjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHByZWxvYWRcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBwcmVsb2FkOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3BhdXNlZENhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuYXVkaW8uZ2V0U3RhdGUoKTtcbiAgICAgICAgaWYgKHN0YXRlID09PSBjYy5fQXVkaW8uU3RhdGUuUExBWUlORykge1xuICAgICAgICAgICAgdGhpcy5hdWRpby5wYXVzZSgpO1xuICAgICAgICAgICAgdGhpcy5fcGF1c2VkRmxhZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3Jlc3RvcmVDYWxsYmFjazogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fcGF1c2VkRmxhZykge1xuICAgICAgICAgICAgdGhpcy5hdWRpby5yZXN1bWUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wYXVzZWRGbGFnID0gZmFsc2U7XG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmF1ZGlvLnNyYyA9IHRoaXMuX2NsaXA7XG4gICAgICAgIGlmICh0aGlzLnByZWxvYWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NsaXAuX2Vuc3VyZUxvYWRlZCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnBsYXlPbkxvYWQgJiYgdGhpcy5fZmlyc3RseUVuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0bHlFbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfSElERSwgdGhpcy5fcGF1c2VkQ2FsbGJhY2ssIHRoaXMpO1xuICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfU0hPVywgdGhpcy5fcmVzdG9yZUNhbGxiYWNrLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICBjYy5nYW1lLm9mZihjYy5nYW1lLkVWRU5UX0hJREUsIHRoaXMuX3BhdXNlZENhbGxiYWNrLCB0aGlzKTtcbiAgICAgICAgY2MuZ2FtZS5vZmYoY2MuZ2FtZS5FVkVOVF9TSE9XLCB0aGlzLl9yZXN0b3JlQ2FsbGJhY2ssIHRoaXMpO1xuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgIHRoaXMuYXVkaW8uZGVzdHJveSgpO1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS51bmNhY2hlKHRoaXMuX2NsaXApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFBsYXlzIHRoZSBjbGlwLlxuICAgICAqICEjemgg5pKt5pS+6Z+z6aKR5Ymq6L6R44CCXG4gICAgICogQG1ldGhvZCBwbGF5XG4gICAgICovXG4gICAgcGxheTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoICF0aGlzLl9jbGlwICkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBhdWRpbyA9IHRoaXMuYXVkaW87XG4gICAgICAgIGlmICh0aGlzLl9jbGlwLmxvYWRlZCkge1xuICAgICAgICAgICAgYXVkaW8uc3RvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGF1ZGlvLnNldFZvbHVtZSh0aGlzLl9tdXRlID8gMCA6IHRoaXMuX3ZvbHVtZSk7XG4gICAgICAgIGF1ZGlvLnNldExvb3AodGhpcy5fbG9vcCk7XG4gICAgICAgIGF1ZGlvLnNldEN1cnJlbnRUaW1lKDApO1xuICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU3RvcHMgdGhlIGNsaXAuXG4gICAgICogISN6aCDlgZzmraLlvZPliY3pn7PpopHliarovpHjgIJcbiAgICAgKiBAbWV0aG9kIHN0b3BcbiAgICAgKi9cbiAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYXVkaW8uc3RvcCgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFBhdXNlIHRoZSBjbGlwLlxuICAgICAqICEjemgg5pqC5YGc5b2T5YmN6Z+z6aKR5Ymq6L6R44CCXG4gICAgICogQG1ldGhvZCBwYXVzZVxuICAgICAqL1xuICAgIHBhdXNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYXVkaW8ucGF1c2UoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXN1bWUgdGhlIGNsaXAuXG4gICAgICogISN6aCDmgaLlpI3mkq3mlL7jgIJcbiAgICAgKiBAbWV0aG9kIHJlc3VtZVxuICAgICAqL1xuICAgIHJlc3VtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmF1ZGlvLnJlc3VtZSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJld2luZCBwbGF5aW5nIG11c2ljLlxuICAgICAqICEjemgg5LuO5aS05byA5aeL5pKt5pS+44CCXG4gICAgICogQG1ldGhvZCByZXdpbmRcbiAgICAgKi9cbiAgICByZXdpbmQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuYXVkaW8uc2V0Q3VycmVudFRpbWUoMCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0IGN1cnJlbnQgdGltZVxuICAgICAqICEjemgg6I635Y+W5b2T5YmN55qE5pKt5pS+5pe26Ze0XG4gICAgICogQG1ldGhvZCBnZXRDdXJyZW50VGltZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRDdXJyZW50VGltZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hdWRpby5nZXRDdXJyZW50VGltZSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldCBjdXJyZW50IHRpbWVcbiAgICAgKiAhI3poIOiuvue9ruW9k+WJjeeahOaSreaUvuaXtumXtFxuICAgICAqIEBtZXRob2Qgc2V0Q3VycmVudFRpbWVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBzZXRDdXJyZW50VGltZTogZnVuY3Rpb24gKHRpbWUpIHtcbiAgICAgICAgdGhpcy5hdWRpby5zZXRDdXJyZW50VGltZSh0aW1lKTtcbiAgICAgICAgcmV0dXJuIHRpbWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0IGF1ZGlvIGR1cmF0aW9uXG4gICAgICogISN6aCDojrflj5blvZPliY3pn7PpopHnmoTplb/luqZcbiAgICAgKiBAbWV0aG9kIGdldER1cmF0aW9uXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldER1cmF0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1ZGlvLmdldER1cmF0aW9uKCk7XG4gICAgfVxuXG59KTtcblxuY2MuQXVkaW9Tb3VyY2UgPSBtb2R1bGUuZXhwb3J0cyA9IEF1ZGlvU291cmNlO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=