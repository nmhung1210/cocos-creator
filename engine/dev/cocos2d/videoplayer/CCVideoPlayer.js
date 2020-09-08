
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/videoplayer/CCVideoPlayer.js';
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
var VideoPlayerImpl = require('./video-player-impl');
/**
 * !#en Video event type
 * !#zh 视频事件类型
 * @enum VideoPlayer.EventType
 */

/**
 * !#en play
 * !#zh 播放
 * @property {Number} PLAYING
 */

/**
 * !#en pause
 * !#zh 暂停
 * @property {Number} PAUSED
 */

/**
 * !#en stop
 * !#zh 停止
 * @property {Number} STOPPED
 */

/**
 * !#en play end
 * !#zh 播放结束
 * @property {Number} COMPLETED
 */

/**
 * !#en meta data is loaded
 * !#zh 视频的元信息已加载完成，你可以调用 getDuration 来获取视频总时长
 * @property {Number} META_LOADED
 */

/**
 * !#en clicked by the user
 * !#zh 视频被用户点击了
 * @property {Number} CLICKED
 */

/**
 * !#en ready to play, this event is not guaranteed to be triggered on all platform or browser, please don't rely on it to play your video.<br/>
 * !#zh 视频准备好了，这个事件并不保障会在所有平台或浏览器中被触发，它依赖于平台实现，请不要依赖于这个事件做视频播放的控制。
 * @property {Number} READY_TO_PLAY
 */


var EventType = VideoPlayerImpl.EventType;
/**
 * !#en Enum for video resouce type type.
 * !#zh 视频来源
 * @enum VideoPlayer.ResourceType
 */

var ResourceType = cc.Enum({
  /**
   * !#en The remote resource type.
   * !#zh 远程视频
   * @property {Number} REMOTE
   */
  REMOTE: 0,

  /**
   * !#en The local resouce type.
   * !#zh 本地视频
   * @property {Number} LOCAL
   */
  LOCAL: 1
});
/**
 * !#en cc.VideoPlayer is a component for playing videos, you can use it for showing videos in your game. Because different platforms have different authorization, API and control methods for VideoPlayer component. And have not yet formed a unified standard, only Web, iOS, and Android platforms are currently supported.
 * !#zh Video 组件，用于在游戏中播放视频。由于不同平台对于 VideoPlayer 组件的授权、API、控制方式都不同，还没有形成统一的标准，所以目前只支持 Web、iOS 和 Android 平台。
 * @class VideoPlayer
 * @extends Component
 */

var VideoPlayer = cc.Class({
  name: 'cc.VideoPlayer',
  "extends": cc.Component,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/VideoPlayer',
    inspector: 'packages://inspector/inspectors/comps/videoplayer.js',
    help: 'i18n:COMPONENT.help_url.videoplayer',
    executeInEditMode: true
  },
  properties: {
    _resourceType: ResourceType.REMOTE,

    /**
     * !#en The resource type of videoplayer, REMOTE for remote url and LOCAL for local file path.
     * !#zh 视频来源：REMOTE 表示远程视频 URL，LOCAL 表示本地视频地址。
     * @property {VideoPlayer.ResourceType} resourceType
     */
    resourceType: {
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.resourceType',
      type: ResourceType,
      set: function set(value) {
        this._resourceType = value;

        this._updateVideoSource();
      },
      get: function get() {
        return this._resourceType;
      }
    },
    _remoteURL: '',

    /**
     * !#en The remote URL of video.
     * !#zh 远程视频的 URL
     * @property {String} remoteURL
     */
    remoteURL: {
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.url',
      type: cc.String,
      set: function set(url) {
        this._remoteURL = url;

        this._updateVideoSource();
      },
      get: function get() {
        return this._remoteURL;
      }
    },
    _clip: {
      "default": null,
      type: cc.Asset
    },

    /**
     * !#en The local video full path.
     * !#zh 本地视频的 URL
     * @property {String} clip
     */
    clip: {
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.video',
      get: function get() {
        return this._clip;
      },
      set: function set(value) {
        this._clip = value;

        this._updateVideoSource();
      },
      type: cc.Asset
    },

    /**
     * !#en The current playback time of the now playing item in seconds, you could also change the start playback time.
     * !#zh 指定视频从什么时间点开始播放，单位是秒，也可以用来获取当前视频播放的时间进度。
     * @property {Number} currentTime
     */
    currentTime: {
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.currentTime',
      type: cc.Float,
      set: function set(time) {
        if (this._impl) {
          this._impl.seekTo(time);
        }
      },
      get: function get() {
        if (this._impl) {
          // for used to make the current time of each platform consistent
          if (this._currentStatus === EventType.NONE || this._currentStatus === EventType.STOPPED || this._currentStatus === EventType.META_LOADED || this._currentStatus === EventType.READY_TO_PLAY) {
            return 0;
          } else if (this._currentStatus === EventType.COMPLETED) {
            return this._impl.duration();
          }

          return this._impl.currentTime();
        }

        return -1;
      }
    },
    _volume: 1,

    /**
     * !#en The volume of the video.
     * !#zh 视频的音量（0.0 ~ 1.0）
     * @property volume
     * @type {Number}
     * @default 1
     */
    volume: {
      get: function get() {
        return this._volume;
      },
      set: function set(value) {
        this._volume = value;

        if (this.isPlaying() && !this._mute) {
          this._syncVolume();
        }
      },
      range: [0, 1],
      type: cc.Float,
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.volume'
    },
    _mute: false,

    /**
     * !#en Mutes the VideoPlayer. Mute sets the volume=0, Un-Mute restore the original volume.
     * !#zh 是否静音视频。静音时设置音量为 0，取消静音是恢复原来的音量。
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

        this._syncVolume();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.mute'
    },

    /**
     * !#en Whether keep the aspect ration of the original video.
     * !#zh 是否保持视频原来的宽高比
     * @property {Boolean} keepAspectRatio
     * @type {Boolean}
     * @default true
     */
    keepAspectRatio: {
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.keepAspectRatio',
      "default": true,
      type: cc.Boolean,
      notify: function notify() {
        this._impl && this._impl.setKeepAspectRatioEnabled(this.keepAspectRatio);
      }
    },

    /**
     * !#en Whether play video in fullscreen mode.
     * !#zh 是否全屏播放视频
     * @property {Boolean} isFullscreen
     * @type {Boolean}
     * @default false
     */
    _isFullscreen: {
      "default": false,
      formerlySerializedAs: '_N$isFullscreen'
    },
    isFullscreen: {
      get: function get() {
        if (!CC_EDITOR) {
          this._isFullscreen = this._impl && this._impl.isFullScreenEnabled();
        }

        return this._isFullscreen;
      },
      set: function set(enable) {
        this._isFullscreen = enable;

        if (!CC_EDITOR) {
          this._impl && this._impl.setFullScreenEnabled(enable);
        }
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.isFullscreen'
    },

    /**
     * !#en Always below the game view (only useful on Web. Note: The specific effects are not guaranteed to be consistent, depending on whether each browser supports or restricts).
     * !#zh 永远在游戏视图最底层（这个属性只有在 Web 平台上有效果。注意：具体效果无法保证一致，跟各个浏览器是否支持与限制有关）
     * @property {Boolean} stayOnBottom
     */
    _stayOnBottom: false,
    stayOnBottom: {
      get: function get() {
        return this._stayOnBottom;
      },
      set: function set(enable) {
        this._stayOnBottom = enable;

        if (this._impl) {
          this._impl.setStayOnBottom(enable);
        }
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.stayOnBottom'
    },

    /**
     * !#en the video player's callback, it will be triggered when certain event occurs, like: playing, paused, stopped and completed.
     * !#zh 视频播放回调函数，该回调函数会在特定情况被触发，比如播放中，暂时，停止和完成播放。
     * @property {Component.EventHandler[]} videoPlayerEvent
     */
    videoPlayerEvent: {
      "default": [],
      type: cc.Component.EventHandler
    }
  },
  statics: {
    EventType: EventType,
    ResourceType: ResourceType,
    Impl: VideoPlayerImpl
  },
  ctor: function ctor() {
    this._impl = new VideoPlayerImpl();
    this._currentStatus = EventType.NONE;
  },
  _syncVolume: function _syncVolume() {
    var impl = this._impl;

    if (impl) {
      var volume = this._mute ? 0 : this._volume;
      impl.setVolume(volume);
    }
  },
  _updateVideoSource: function _updateVideoSource() {
    var url = '';

    if (this.resourceType === ResourceType.REMOTE) {
      url = this.remoteURL;
    } else if (this._clip) {
      url = this._clip.nativeUrl;
    }

    this._impl.setURL(url, this._mute || this._volume === 0);

    this._impl.setKeepAspectRatioEnabled(this.keepAspectRatio);
  },
  onLoad: function onLoad() {
    var impl = this._impl;

    if (impl) {
      impl.createDomElementIfNeeded(this._mute || this._volume === 0);
      impl.setStayOnBottom(this._stayOnBottom);

      this._updateVideoSource();

      if (!CC_EDITOR) {
        impl.seekTo(this.currentTime);
        impl.setFullScreenEnabled(this._isFullscreen);
        this.pause();
        impl.setEventListener(EventType.PLAYING, this.onPlaying.bind(this));
        impl.setEventListener(EventType.PAUSED, this.onPasued.bind(this));
        impl.setEventListener(EventType.STOPPED, this.onStopped.bind(this));
        impl.setEventListener(EventType.COMPLETED, this.onCompleted.bind(this));
        impl.setEventListener(EventType.META_LOADED, this.onMetaLoaded.bind(this));
        impl.setEventListener(EventType.CLICKED, this.onClicked.bind(this));
        impl.setEventListener(EventType.READY_TO_PLAY, this.onReadyToPlay.bind(this));
      }
    }
  },
  onRestore: function onRestore() {
    if (!this._impl) {
      this._impl = new VideoPlayerImpl();
    }
  },
  onEnable: function onEnable() {
    if (this._impl) {
      this._impl.enable();
    }
  },
  onDisable: function onDisable() {
    if (this._impl) {
      this._impl.disable();
    }
  },
  onDestroy: function onDestroy() {
    if (this._impl) {
      this._impl.destroy();

      this._impl = null;
    }
  },
  update: function update(dt) {
    if (this._impl) {
      this._impl.updateMatrix(this.node);
    }
  },
  onReadyToPlay: function onReadyToPlay() {
    this._currentStatus = EventType.READY_TO_PLAY;
    cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.READY_TO_PLAY);
    this.node.emit('ready-to-play', this);
  },
  onMetaLoaded: function onMetaLoaded() {
    this._currentStatus = EventType.META_LOADED;
    cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.META_LOADED);
    this.node.emit('meta-loaded', this);
  },
  onClicked: function onClicked() {
    this._currentStatus = EventType.CLICKED;
    cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.CLICKED);
    this.node.emit('clicked', this);
  },
  onPlaying: function onPlaying() {
    this._currentStatus = EventType.PLAYING;
    cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.PLAYING);
    this.node.emit('playing', this);
  },
  onPasued: function onPasued() {
    this._currentStatus = EventType.PAUSED;
    cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.PAUSED);
    this.node.emit('paused', this);
  },
  onStopped: function onStopped() {
    this._currentStatus = EventType.STOPPED;
    cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.STOPPED);
    this.node.emit('stopped', this);
  },
  onCompleted: function onCompleted() {
    this._currentStatus = EventType.COMPLETED;
    cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.COMPLETED);
    this.node.emit('completed', this);
  },

  /**
   * !#en If a video is paused, call this method could resume playing. If a video is stopped, call this method to play from scratch.
   * !#zh 如果视频被暂停播放了，调用这个接口可以继续播放。如果视频被停止播放了，调用这个接口可以从头开始播放。
   * @method play
   */
  play: function play() {
    if (this._impl) {
      this._syncVolume();

      this._impl.play();
    }
  },

  /**
   * !#en If a video is paused, call this method to resume playing.
   * !#zh 如果一个视频播放被暂停播放了，调用这个接口可以继续播放。
   * @method resume
   */
  resume: function resume() {
    if (this._impl) {
      this._syncVolume();

      this._impl.resume();
    }
  },

  /**
   * !#en If a video is playing, call this method to pause playing.
   * !#zh 如果一个视频正在播放，调用这个接口可以暂停播放。
   * @method pause
   */
  pause: function pause() {
    if (this._impl) {
      this._impl.pause();
    }
  },

  /**
   * !#en If a video is playing, call this method to stop playing immediately.
   * !#zh 如果一个视频正在播放，调用这个接口可以立马停止播放。
   * @method stop
   */
  stop: function stop() {
    if (this._impl) {
      this._impl.stop();
    }
  },

  /**
   * !#en Gets the duration of the video
   * !#zh 获取视频文件的播放总时长
   * @method getDuration
   * @returns {Number}
   */
  getDuration: function getDuration() {
    if (this._impl) {
      return this._impl.duration();
    }

    return -1;
  },

  /**
   * !#en Determine whether video is playing or not.
   * !#zh 判断当前视频是否处于播放状态
   * @method isPlaying
   * @returns {Boolean}
   */
  isPlaying: function isPlaying() {
    if (this._impl) {
      return this._impl.isPlaying();
    }

    return false;
  }
  /**
   * !#en if you don't need the VideoPlayer and it isn't in any running Scene, you should
   * call the destroy method on this component or the associated node explicitly.
   * Otherwise, the created DOM element won't be removed from web page.
   * !#zh
   * 如果你不再使用 VideoPlayer，并且组件未添加到场景中，那么你必须手动对组件或所在节点调用 destroy。
   * 这样才能移除网页上的 DOM 节点，避免 Web 平台内存泄露。
   * @example
   * videoplayer.node.parent = null;  // or  videoplayer.node.removeFromParent(false);
   * // when you don't need videoplayer anymore
   * videoplayer.node.destroy();
   * @method destroy
   * @return {Boolean} whether it is the first time the destroy being called
   */

});
cc.VideoPlayer = module.exports = VideoPlayer;
/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event ready-to-play
 * @param {Event.EventCustom} event
 * @param {VideoPlayer} videoPlayer - The VideoPlayer component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event meta-loaded
 * @param {Event.EventCustom} event
 * @param {VideoPlayer} videoPlayer - The VideoPlayer component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event clicked
 * @param {Event.EventCustom} event
 * @param {VideoPlayer} videoPlayer - The VideoPlayer component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event playing
 * @param {Event.EventCustom} event
 * @param {VideoPlayer} videoPlayer - The VideoPlayer component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event paused
 * @param {Event.EventCustom} event
 * @param {VideoPlayer} videoPlayer - The VideoPlayer component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event stopped
 * @param {Event.EventCustom} event
 * @param {VideoPlayer} videoPlayer - The VideoPlayer component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event completed
 * @param {Event.EventCustom} event
 * @param {VideoPlayer} videoPlayer - The VideoPlayer component.
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC92aWRlb3BsYXllci9DQ1ZpZGVvUGxheWVyLmpzIl0sIm5hbWVzIjpbIlZpZGVvUGxheWVySW1wbCIsInJlcXVpcmUiLCJFdmVudFR5cGUiLCJSZXNvdXJjZVR5cGUiLCJjYyIsIkVudW0iLCJSRU1PVEUiLCJMT0NBTCIsIlZpZGVvUGxheWVyIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImluc3BlY3RvciIsImhlbHAiLCJleGVjdXRlSW5FZGl0TW9kZSIsInByb3BlcnRpZXMiLCJfcmVzb3VyY2VUeXBlIiwicmVzb3VyY2VUeXBlIiwidG9vbHRpcCIsIkNDX0RFViIsInR5cGUiLCJzZXQiLCJ2YWx1ZSIsIl91cGRhdGVWaWRlb1NvdXJjZSIsImdldCIsIl9yZW1vdGVVUkwiLCJyZW1vdGVVUkwiLCJTdHJpbmciLCJ1cmwiLCJfY2xpcCIsIkFzc2V0IiwiY2xpcCIsImN1cnJlbnRUaW1lIiwiRmxvYXQiLCJ0aW1lIiwiX2ltcGwiLCJzZWVrVG8iLCJfY3VycmVudFN0YXR1cyIsIk5PTkUiLCJTVE9QUEVEIiwiTUVUQV9MT0FERUQiLCJSRUFEWV9UT19QTEFZIiwiQ09NUExFVEVEIiwiZHVyYXRpb24iLCJfdm9sdW1lIiwidm9sdW1lIiwiaXNQbGF5aW5nIiwiX211dGUiLCJfc3luY1ZvbHVtZSIsInJhbmdlIiwibXV0ZSIsImtlZXBBc3BlY3RSYXRpbyIsIkJvb2xlYW4iLCJub3RpZnkiLCJzZXRLZWVwQXNwZWN0UmF0aW9FbmFibGVkIiwiX2lzRnVsbHNjcmVlbiIsImZvcm1lcmx5U2VyaWFsaXplZEFzIiwiaXNGdWxsc2NyZWVuIiwiaXNGdWxsU2NyZWVuRW5hYmxlZCIsImVuYWJsZSIsInNldEZ1bGxTY3JlZW5FbmFibGVkIiwiYW5pbWF0YWJsZSIsIl9zdGF5T25Cb3R0b20iLCJzdGF5T25Cb3R0b20iLCJzZXRTdGF5T25Cb3R0b20iLCJ2aWRlb1BsYXllckV2ZW50IiwiRXZlbnRIYW5kbGVyIiwic3RhdGljcyIsIkltcGwiLCJjdG9yIiwiaW1wbCIsInNldFZvbHVtZSIsIm5hdGl2ZVVybCIsInNldFVSTCIsIm9uTG9hZCIsImNyZWF0ZURvbUVsZW1lbnRJZk5lZWRlZCIsInBhdXNlIiwic2V0RXZlbnRMaXN0ZW5lciIsIlBMQVlJTkciLCJvblBsYXlpbmciLCJiaW5kIiwiUEFVU0VEIiwib25QYXN1ZWQiLCJvblN0b3BwZWQiLCJvbkNvbXBsZXRlZCIsIm9uTWV0YUxvYWRlZCIsIkNMSUNLRUQiLCJvbkNsaWNrZWQiLCJvblJlYWR5VG9QbGF5Iiwib25SZXN0b3JlIiwib25FbmFibGUiLCJvbkRpc2FibGUiLCJkaXNhYmxlIiwib25EZXN0cm95IiwiZGVzdHJveSIsInVwZGF0ZSIsImR0IiwidXBkYXRlTWF0cml4Iiwibm9kZSIsImVtaXRFdmVudHMiLCJlbWl0IiwicGxheSIsInJlc3VtZSIsInN0b3AiLCJnZXREdXJhdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFNQSxlQUFlLEdBQUdDLE9BQU8sQ0FBQyxxQkFBRCxDQUEvQjtBQUVBOzs7Ozs7QUFLQTs7Ozs7O0FBS0E7Ozs7OztBQUtBOzs7Ozs7QUFLQTs7Ozs7O0FBS0E7Ozs7OztBQUtBOzs7Ozs7QUFLQTs7Ozs7OztBQUtBLElBQU1DLFNBQVMsR0FBR0YsZUFBZSxDQUFDRSxTQUFsQztBQUdBOzs7Ozs7QUFLQSxJQUFNQyxZQUFZLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ3pCOzs7OztBQUtBQyxFQUFBQSxNQUFNLEVBQUUsQ0FOaUI7O0FBT3pCOzs7OztBQUtBQyxFQUFBQSxLQUFLLEVBQUU7QUFaa0IsQ0FBUixDQUFyQjtBQWdCQTs7Ozs7OztBQU1BLElBQUlDLFdBQVcsR0FBR0osRUFBRSxDQUFDSyxLQUFILENBQVM7QUFDdkJDLEVBQUFBLElBQUksRUFBRSxnQkFEaUI7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O0FBQ0osR0FuV3NCOztBQXFXdkI7Ozs7O0FBS0FDLEVBQUFBLE1BMVd1QixvQkEwV2I7QUFDTixRQUFJLEtBQUtuRSxLQUFULEVBQWdCO0FBQ1osV0FBS2EsV0FBTDs7QUFDQSxXQUFLYixLQUFMLENBQVdtRSxNQUFYO0FBQ0g7QUFDSixHQS9Xc0I7O0FBaVh2Qjs7Ozs7QUFLQTFCLEVBQUFBLEtBdFh1QixtQkFzWGQ7QUFDTCxRQUFJLEtBQUt6QyxLQUFULEVBQWdCO0FBQ1osV0FBS0EsS0FBTCxDQUFXeUMsS0FBWDtBQUNIO0FBQ0osR0ExWHNCOztBQTRYdkI7Ozs7O0FBS0EyQixFQUFBQSxJQWpZdUIsa0JBaVlmO0FBQ0osUUFBSSxLQUFLcEUsS0FBVCxFQUFnQjtBQUNaLFdBQUtBLEtBQUwsQ0FBV29FLElBQVg7QUFDSDtBQUNKLEdBcllzQjs7QUF1WXZCOzs7Ozs7QUFNQUMsRUFBQUEsV0E3WXVCLHlCQTZZUjtBQUNYLFFBQUksS0FBS3JFLEtBQVQsRUFBZ0I7QUFDWixhQUFPLEtBQUtBLEtBQUwsQ0FBV1EsUUFBWCxFQUFQO0FBQ0g7O0FBQ0QsV0FBTyxDQUFDLENBQVI7QUFDSCxHQWxac0I7O0FBb1p2Qjs7Ozs7O0FBTUFHLEVBQUFBLFNBMVp1Qix1QkEwWlY7QUFDVCxRQUFJLEtBQUtYLEtBQVQsRUFBZ0I7QUFDWixhQUFPLEtBQUtBLEtBQUwsQ0FBV1csU0FBWCxFQUFQO0FBQ0g7O0FBQ0QsV0FBTyxLQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7Ozs7O0FBamF1QixDQUFULENBQWxCO0FBaWJBN0MsRUFBRSxDQUFDSSxXQUFILEdBQWlCb0csTUFBTSxDQUFDQyxPQUFQLEdBQWlCckcsV0FBbEM7QUFFQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7QUFVQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBWaWRlb1BsYXllckltcGwgPSByZXF1aXJlKCcuL3ZpZGVvLXBsYXllci1pbXBsJyk7XG5cbi8qKlxuICogISNlbiBWaWRlbyBldmVudCB0eXBlXG4gKiAhI3poIOinhumikeS6i+S7tuexu+Wei1xuICogQGVudW0gVmlkZW9QbGF5ZXIuRXZlbnRUeXBlXG4gKi9cbi8qKlxuICogISNlbiBwbGF5XG4gKiAhI3poIOaSreaUvlxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFBMQVlJTkdcbiAqL1xuLyoqXG4gKiAhI2VuIHBhdXNlXG4gKiAhI3poIOaaguWBnFxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFBBVVNFRFxuICovXG4vKipcbiAqICEjZW4gc3RvcFxuICogISN6aCDlgZzmraJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTVE9QUEVEXG4gKi9cbi8qKlxuICogISNlbiBwbGF5IGVuZFxuICogISN6aCDmkq3mlL7nu5PmnZ9cbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBDT01QTEVURURcbiAqL1xuLyoqXG4gKiAhI2VuIG1ldGEgZGF0YSBpcyBsb2FkZWRcbiAqICEjemgg6KeG6aKR55qE5YWD5L+h5oGv5bey5Yqg6L295a6M5oiQ77yM5L2g5Y+v5Lul6LCD55SoIGdldER1cmF0aW9uIOadpeiOt+WPluinhumikeaAu+aXtumVv1xuICogQHByb3BlcnR5IHtOdW1iZXJ9IE1FVEFfTE9BREVEXG4gKi9cbi8qKlxuICogISNlbiBjbGlja2VkIGJ5IHRoZSB1c2VyXG4gKiAhI3poIOinhumikeiiq+eUqOaIt+eCueWHu+S6hlxuICogQHByb3BlcnR5IHtOdW1iZXJ9IENMSUNLRURcbiAqL1xuLyoqXG4gKiAhI2VuIHJlYWR5IHRvIHBsYXksIHRoaXMgZXZlbnQgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgdHJpZ2dlcmVkIG9uIGFsbCBwbGF0Zm9ybSBvciBicm93c2VyLCBwbGVhc2UgZG9uJ3QgcmVseSBvbiBpdCB0byBwbGF5IHlvdXIgdmlkZW8uPGJyLz5cbiAqICEjemgg6KeG6aKR5YeG5aSH5aW95LqG77yM6L+Z5Liq5LqL5Lu25bm25LiN5L+d6Zqc5Lya5Zyo5omA5pyJ5bmz5Y+w5oiW5rWP6KeI5Zmo5Lit6KKr6Kem5Y+R77yM5a6D5L6d6LWW5LqO5bmz5Y+w5a6e546w77yM6K+35LiN6KaB5L6d6LWW5LqO6L+Z5Liq5LqL5Lu25YGa6KeG6aKR5pKt5pS+55qE5o6n5Yi244CCXG4gKiBAcHJvcGVydHkge051bWJlcn0gUkVBRFlfVE9fUExBWVxuICovXG5jb25zdCBFdmVudFR5cGUgPSBWaWRlb1BsYXllckltcGwuRXZlbnRUeXBlO1xuXG5cbi8qKlxuICogISNlbiBFbnVtIGZvciB2aWRlbyByZXNvdWNlIHR5cGUgdHlwZS5cbiAqICEjemgg6KeG6aKR5p2l5rqQXG4gKiBAZW51bSBWaWRlb1BsYXllci5SZXNvdXJjZVR5cGVcbiAqL1xuY29uc3QgUmVzb3VyY2VUeXBlID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgcmVtb3RlIHJlc291cmNlIHR5cGUuXG4gICAgICogISN6aCDov5znqIvop4bpopFcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUkVNT1RFXG4gICAgICovXG4gICAgUkVNT1RFOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGxvY2FsIHJlc291Y2UgdHlwZS5cbiAgICAgKiAhI3poIOacrOWcsOinhumikVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBMT0NBTFxuICAgICAqL1xuICAgIExPQ0FMOiAxXG59KTtcblxuXG4vKipcbiAqICEjZW4gY2MuVmlkZW9QbGF5ZXIgaXMgYSBjb21wb25lbnQgZm9yIHBsYXlpbmcgdmlkZW9zLCB5b3UgY2FuIHVzZSBpdCBmb3Igc2hvd2luZyB2aWRlb3MgaW4geW91ciBnYW1lLiBCZWNhdXNlIGRpZmZlcmVudCBwbGF0Zm9ybXMgaGF2ZSBkaWZmZXJlbnQgYXV0aG9yaXphdGlvbiwgQVBJIGFuZCBjb250cm9sIG1ldGhvZHMgZm9yIFZpZGVvUGxheWVyIGNvbXBvbmVudC4gQW5kIGhhdmUgbm90IHlldCBmb3JtZWQgYSB1bmlmaWVkIHN0YW5kYXJkLCBvbmx5IFdlYiwgaU9TLCBhbmQgQW5kcm9pZCBwbGF0Zm9ybXMgYXJlIGN1cnJlbnRseSBzdXBwb3J0ZWQuXG4gKiAhI3poIFZpZGVvIOe7hOS7tu+8jOeUqOS6juWcqOa4uOaIj+S4reaSreaUvuinhumikeOAgueUseS6juS4jeWQjOW5s+WPsOWvueS6jiBWaWRlb1BsYXllciDnu4Tku7bnmoTmjojmnYPjgIFBUEnjgIHmjqfliLbmlrnlvI/pg73kuI3lkIzvvIzov5jmsqHmnInlvaLmiJDnu5/kuIDnmoTmoIflh4bvvIzmiYDku6Xnm67liY3lj6rmlK/mjIEgV2Vi44CBaU9TIOWSjCBBbmRyb2lkIOW5s+WPsOOAglxuICogQGNsYXNzIFZpZGVvUGxheWVyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcbiAqL1xubGV0IFZpZGVvUGxheWVyID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5WaWRlb1BsYXllcicsXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnVpL1ZpZGVvUGxheWVyJyxcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy92aWRlb3BsYXllci5qcycsXG4gICAgICAgIGhlbHA6ICdpMThuOkNPTVBPTkVOVC5oZWxwX3VybC52aWRlb3BsYXllcicsXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgICAgICBfcmVzb3VyY2VUeXBlOiBSZXNvdXJjZVR5cGUuUkVNT1RFLFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgcmVzb3VyY2UgdHlwZSBvZiB2aWRlb3BsYXllciwgUkVNT1RFIGZvciByZW1vdGUgdXJsIGFuZCBMT0NBTCBmb3IgbG9jYWwgZmlsZSBwYXRoLlxuICAgICAgICAgKiAhI3poIOinhumikeadpea6kO+8mlJFTU9URSDooajnpLrov5znqIvop4bpopEgVVJM77yMTE9DQUwg6KGo56S65pys5Zyw6KeG6aKR5Zyw5Z2A44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7VmlkZW9QbGF5ZXIuUmVzb3VyY2VUeXBlfSByZXNvdXJjZVR5cGVcbiAgICAgICAgICovXG4gICAgICAgIHJlc291cmNlVHlwZToge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC52aWRlb3BsYXllci5yZXNvdXJjZVR5cGUnLFxuICAgICAgICAgICAgdHlwZTogUmVzb3VyY2VUeXBlLFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZVR5cGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVWaWRlb1NvdXJjZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXNvdXJjZVR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3JlbW90ZVVSTDogJycsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSByZW1vdGUgVVJMIG9mIHZpZGVvLlxuICAgICAgICAgKiAhI3poIOi/nOeoi+inhumikeeahCBVUkxcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IHJlbW90ZVVSTFxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3RlVVJMOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnZpZGVvcGxheWVyLnVybCcsXG4gICAgICAgICAgICB0eXBlOiBjYy5TdHJpbmcsXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdGVVUkwgPSB1cmw7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmlkZW9Tb3VyY2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVtb3RlVVJMO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9jbGlwOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQXNzZXRcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGxvY2FsIHZpZGVvIGZ1bGwgcGF0aC5cbiAgICAgICAgICogISN6aCDmnKzlnLDop4bpopHnmoQgVVJMXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBjbGlwXG4gICAgICAgICAqL1xuICAgICAgICBjbGlwOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnZpZGVvcGxheWVyLnZpZGVvJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jbGlwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2xpcCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZpZGVvU291cmNlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogY2MuQXNzZXRcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgY3VycmVudCBwbGF5YmFjayB0aW1lIG9mIHRoZSBub3cgcGxheWluZyBpdGVtIGluIHNlY29uZHMsIHlvdSBjb3VsZCBhbHNvIGNoYW5nZSB0aGUgc3RhcnQgcGxheWJhY2sgdGltZS5cbiAgICAgICAgICogISN6aCDmjIflrprop4bpopHku47ku4DkuYjml7bpl7TngrnlvIDlp4vmkq3mlL7vvIzljZXkvY3mmK/np5LvvIzkuZ/lj6/ku6XnlKjmnaXojrflj5blvZPliY3op4bpopHmkq3mlL7nmoTml7bpl7Tov5vluqbjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGN1cnJlbnRUaW1lXG4gICAgICAgICAqL1xuICAgICAgICBjdXJyZW50VGltZToge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC52aWRlb3BsYXllci5jdXJyZW50VGltZScsXG4gICAgICAgICAgICB0eXBlOiBjYy5GbG9hdCxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHRpbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faW1wbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbXBsLnNlZWtUbyh0aW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIHVzZWQgdG8gbWFrZSB0aGUgY3VycmVudCB0aW1lIG9mIGVhY2ggcGxhdGZvcm0gY29uc2lzdGVudFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudFN0YXR1cyA9PT0gRXZlbnRUeXBlLk5PTkUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0dXMgPT09IEV2ZW50VHlwZS5TVE9QUEVEIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdHVzID09PSBFdmVudFR5cGUuTUVUQV9MT0FERUQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0dXMgPT09IEV2ZW50VHlwZS5SRUFEWV9UT19QTEFZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9jdXJyZW50U3RhdHVzID09PSBFdmVudFR5cGUuQ09NUExFVEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faW1wbC5kdXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbXBsLmN1cnJlbnRUaW1lKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfdm9sdW1lOiAxLFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgdm9sdW1lIG9mIHRoZSB2aWRlby5cbiAgICAgICAgICogISN6aCDop4bpopHnmoTpn7Pph4/vvIgwLjAgfiAxLjDvvIlcbiAgICAgICAgICogQHByb3BlcnR5IHZvbHVtZVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZGVmYXVsdCAxXG4gICAgICAgICAqL1xuICAgICAgICB2b2x1bWU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl92b2x1bWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92b2x1bWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcoKSAmJiAhdGhpcy5fbXV0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zeW5jVm9sdW1lKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJhbmdlOiBbMCwgMV0sXG4gICAgICAgICAgICB0eXBlOiBjYy5GbG9hdCxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQudmlkZW9wbGF5ZXIudm9sdW1lJ1xuICAgICAgICB9LFxuXG4gICAgICAgIF9tdXRlOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gTXV0ZXMgdGhlIFZpZGVvUGxheWVyLiBNdXRlIHNldHMgdGhlIHZvbHVtZT0wLCBVbi1NdXRlIHJlc3RvcmUgdGhlIG9yaWdpbmFsIHZvbHVtZS5cbiAgICAgICAgICogISN6aCDmmK/lkKbpnZnpn7Pop4bpopHjgILpnZnpn7Pml7borr7nva7pn7Pph4/kuLogMO+8jOWPlua2iOmdmemfs+aYr+aBouWkjeWOn+adpeeahOmfs+mHj+OAglxuICAgICAgICAgKiBAcHJvcGVydHkgbXV0ZVxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIG11dGU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tdXRlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbXV0ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N5bmNWb2x1bWUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnZpZGVvcGxheWVyLm11dGUnLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFdoZXRoZXIga2VlcCB0aGUgYXNwZWN0IHJhdGlvbiBvZiB0aGUgb3JpZ2luYWwgdmlkZW8uXG4gICAgICAgICAqICEjemgg5piv5ZCm5L+d5oyB6KeG6aKR5Y6f5p2l55qE5a696auY5q+UXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0ga2VlcEFzcGVjdFJhdGlvXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICBrZWVwQXNwZWN0UmF0aW86IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQudmlkZW9wbGF5ZXIua2VlcEFzcGVjdFJhdGlvJyxcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiBjYy5Cb29sZWFuLFxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW1wbCAmJiB0aGlzLl9pbXBsLnNldEtlZXBBc3BlY3RSYXRpb0VuYWJsZWQodGhpcy5rZWVwQXNwZWN0UmF0aW8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFdoZXRoZXIgcGxheSB2aWRlbyBpbiBmdWxsc2NyZWVuIG1vZGUuXG4gICAgICAgICAqICEjemgg5piv5ZCm5YWo5bGP5pKt5pS+6KeG6aKRXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNGdWxsc2NyZWVuXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgX2lzRnVsbHNjcmVlbjoge1xuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICBmb3JtZXJseVNlcmlhbGl6ZWRBczogJ19OJGlzRnVsbHNjcmVlbicsXG4gICAgICAgIH0sXG4gICAgICAgIGlzRnVsbHNjcmVlbjoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0Z1bGxzY3JlZW4gPSB0aGlzLl9pbXBsICYmIHRoaXMuX2ltcGwuaXNGdWxsU2NyZWVuRW5hYmxlZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faXNGdWxsc2NyZWVuO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAoZW5hYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNGdWxsc2NyZWVuID0gZW5hYmxlO1xuICAgICAgICAgICAgICAgIGlmICghQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ltcGwgJiYgdGhpcy5faW1wbC5zZXRGdWxsU2NyZWVuRW5hYmxlZChlbmFibGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQudmlkZW9wbGF5ZXIuaXNGdWxsc2NyZWVuJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEFsd2F5cyBiZWxvdyB0aGUgZ2FtZSB2aWV3IChvbmx5IHVzZWZ1bCBvbiBXZWIuIE5vdGU6IFRoZSBzcGVjaWZpYyBlZmZlY3RzIGFyZSBub3QgZ3VhcmFudGVlZCB0byBiZSBjb25zaXN0ZW50LCBkZXBlbmRpbmcgb24gd2hldGhlciBlYWNoIGJyb3dzZXIgc3VwcG9ydHMgb3IgcmVzdHJpY3RzKS5cbiAgICAgICAgICogISN6aCDmsLjov5zlnKjmuLjmiI/op4blm77mnIDlupXlsYLvvIjov5nkuKrlsZ7mgKflj6rmnInlnKggV2ViIOW5s+WPsOS4iuacieaViOaenOOAguazqOaEj++8muWFt+S9k+aViOaenOaXoOazleS/neivgeS4gOiHtO+8jOi3n+WQhOS4qua1j+iniOWZqOaYr+WQpuaUr+aMgeS4jumZkOWItuacieWFs++8iVxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IHN0YXlPbkJvdHRvbVxuICAgICAgICAgKi9cbiAgICAgICAgX3N0YXlPbkJvdHRvbTogZmFsc2UsXG4gICAgICAgIHN0YXlPbkJvdHRvbToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RheU9uQm90dG9tXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IChlbmFibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF5T25Cb3R0b20gPSBlbmFibGU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW1wbC5zZXRTdGF5T25Cb3R0b20oZW5hYmxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnZpZGVvcGxheWVyLnN0YXlPbkJvdHRvbScsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gdGhlIHZpZGVvIHBsYXllcidzIGNhbGxiYWNrLCBpdCB3aWxsIGJlIHRyaWdnZXJlZCB3aGVuIGNlcnRhaW4gZXZlbnQgb2NjdXJzLCBsaWtlOiBwbGF5aW5nLCBwYXVzZWQsIHN0b3BwZWQgYW5kIGNvbXBsZXRlZC5cbiAgICAgICAgICogISN6aCDop4bpopHmkq3mlL7lm57osIPlh73mlbDvvIzor6Xlm57osIPlh73mlbDkvJrlnKjnibnlrprmg4XlhrXooqvop6blj5HvvIzmr5TlpoLmkq3mlL7kuK3vvIzmmoLml7bvvIzlgZzmraLlkozlrozmiJDmkq3mlL7jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtDb21wb25lbnQuRXZlbnRIYW5kbGVyW119IHZpZGVvUGxheWVyRXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIHZpZGVvUGxheWVyRXZlbnQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcixcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICBFdmVudFR5cGU6IEV2ZW50VHlwZSxcbiAgICAgICAgUmVzb3VyY2VUeXBlOiBSZXNvdXJjZVR5cGUsXG4gICAgICAgIEltcGw6IFZpZGVvUGxheWVySW1wbFxuICAgIH0sXG5cbiAgICBjdG9yICgpIHtcbiAgICAgICAgdGhpcy5faW1wbCA9IG5ldyBWaWRlb1BsYXllckltcGwoKTtcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXR1cyA9IEV2ZW50VHlwZS5OT05FO1xuICAgIH0sXG5cbiAgICBfc3luY1ZvbHVtZSAoKSB7XG4gICAgICAgIGxldCBpbXBsID0gdGhpcy5faW1wbDtcbiAgICAgICAgaWYgKGltcGwpIHtcbiAgICAgICAgICAgIGxldCB2b2x1bWUgPSB0aGlzLl9tdXRlID8gMCA6IHRoaXMuX3ZvbHVtZTtcbiAgICAgICAgICAgIGltcGwuc2V0Vm9sdW1lKHZvbHVtZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3VwZGF0ZVZpZGVvU291cmNlICgpIHtcbiAgICAgICAgbGV0IHVybCA9ICcnO1xuICAgICAgICBpZiAodGhpcy5yZXNvdXJjZVR5cGUgPT09IFJlc291cmNlVHlwZS5SRU1PVEUpIHtcbiAgICAgICAgICAgIHVybCA9IHRoaXMucmVtb3RlVVJMO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2NsaXApIHtcbiAgICAgICAgICAgIHVybCA9IHRoaXMuX2NsaXAubmF0aXZlVXJsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ltcGwuc2V0VVJMKHVybCwgdGhpcy5fbXV0ZSB8fCB0aGlzLl92b2x1bWUgPT09IDApO1xuICAgICAgICB0aGlzLl9pbXBsLnNldEtlZXBBc3BlY3RSYXRpb0VuYWJsZWQodGhpcy5rZWVwQXNwZWN0UmF0aW8pO1xuICAgIH0sXG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBsZXQgaW1wbCA9IHRoaXMuX2ltcGw7XG4gICAgICAgIGlmIChpbXBsKSB7XG4gICAgICAgICAgICBpbXBsLmNyZWF0ZURvbUVsZW1lbnRJZk5lZWRlZCh0aGlzLl9tdXRlIHx8IHRoaXMuX3ZvbHVtZSA9PT0gMCk7XG4gICAgICAgICAgICBpbXBsLnNldFN0YXlPbkJvdHRvbSh0aGlzLl9zdGF5T25Cb3R0b20pO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmlkZW9Tb3VyY2UoKTtcblxuICAgICAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICBpbXBsLnNlZWtUbyh0aGlzLmN1cnJlbnRUaW1lKTtcbiAgICAgICAgICAgICAgICBpbXBsLnNldEZ1bGxTY3JlZW5FbmFibGVkKHRoaXMuX2lzRnVsbHNjcmVlbik7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuXG4gICAgICAgICAgICAgICAgaW1wbC5zZXRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5QTEFZSU5HLCB0aGlzLm9uUGxheWluZy5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICBpbXBsLnNldEV2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLlBBVVNFRCwgdGhpcy5vblBhc3VlZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICBpbXBsLnNldEV2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLlNUT1BQRUQsIHRoaXMub25TdG9wcGVkLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgIGltcGwuc2V0RXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuQ09NUExFVEVELCB0aGlzLm9uQ29tcGxldGVkLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgIGltcGwuc2V0RXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuTUVUQV9MT0FERUQsIHRoaXMub25NZXRhTG9hZGVkLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgIGltcGwuc2V0RXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuQ0xJQ0tFRCwgdGhpcy5vbkNsaWNrZWQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgaW1wbC5zZXRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5SRUFEWV9UT19QTEFZLCB0aGlzLm9uUmVhZHlUb1BsYXkuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25SZXN0b3JlICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbXBsKSB7XG4gICAgICAgICAgICB0aGlzLl9pbXBsID0gbmV3IFZpZGVvUGxheWVySW1wbCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uRW5hYmxlICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2ltcGwuZW5hYmxlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25EaXNhYmxlICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2ltcGwuZGlzYWJsZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uRGVzdHJveSAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbXBsKSB7XG4gICAgICAgICAgICB0aGlzLl9pbXBsLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuX2ltcGwgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZSAoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2ltcGwudXBkYXRlTWF0cml4KHRoaXMubm9kZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25SZWFkeVRvUGxheSAoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0dXMgPSBFdmVudFR5cGUuUkVBRFlfVE9fUExBWTtcbiAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMudmlkZW9QbGF5ZXJFdmVudCwgdGhpcywgRXZlbnRUeXBlLlJFQURZX1RPX1BMQVkpO1xuICAgICAgICB0aGlzLm5vZGUuZW1pdCgncmVhZHktdG8tcGxheScsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBvbk1ldGFMb2FkZWQgKCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdHVzID0gRXZlbnRUeXBlLk1FVEFfTE9BREVEO1xuICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy52aWRlb1BsYXllckV2ZW50LCB0aGlzLCBFdmVudFR5cGUuTUVUQV9MT0FERUQpO1xuICAgICAgICB0aGlzLm5vZGUuZW1pdCgnbWV0YS1sb2FkZWQnLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgb25DbGlja2VkICgpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXR1cyA9IEV2ZW50VHlwZS5DTElDS0VEO1xuICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy52aWRlb1BsYXllckV2ZW50LCB0aGlzLCBFdmVudFR5cGUuQ0xJQ0tFRCk7XG4gICAgICAgIHRoaXMubm9kZS5lbWl0KCdjbGlja2VkJywgdGhpcyk7XG4gICAgfSxcblxuICAgIG9uUGxheWluZyAoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0dXMgPSBFdmVudFR5cGUuUExBWUlORztcbiAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMudmlkZW9QbGF5ZXJFdmVudCwgdGhpcywgRXZlbnRUeXBlLlBMQVlJTkcpO1xuICAgICAgICB0aGlzLm5vZGUuZW1pdCgncGxheWluZycsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBvblBhc3VlZCAoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0dXMgPSBFdmVudFR5cGUuUEFVU0VEO1xuICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy52aWRlb1BsYXllckV2ZW50LCB0aGlzLCBFdmVudFR5cGUuUEFVU0VEKTtcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoJ3BhdXNlZCcsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBvblN0b3BwZWQgKCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdHVzID0gRXZlbnRUeXBlLlNUT1BQRUQ7XG4gICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyh0aGlzLnZpZGVvUGxheWVyRXZlbnQsIHRoaXMsIEV2ZW50VHlwZS5TVE9QUEVEKTtcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoJ3N0b3BwZWQnLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgb25Db21wbGV0ZWQgKCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdHVzID0gRXZlbnRUeXBlLkNPTVBMRVRFRDtcbiAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMudmlkZW9QbGF5ZXJFdmVudCwgdGhpcywgRXZlbnRUeXBlLkNPTVBMRVRFRCk7XG4gICAgICAgIHRoaXMubm9kZS5lbWl0KCdjb21wbGV0ZWQnLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBJZiBhIHZpZGVvIGlzIHBhdXNlZCwgY2FsbCB0aGlzIG1ldGhvZCBjb3VsZCByZXN1bWUgcGxheWluZy4gSWYgYSB2aWRlbyBpcyBzdG9wcGVkLCBjYWxsIHRoaXMgbWV0aG9kIHRvIHBsYXkgZnJvbSBzY3JhdGNoLlxuICAgICAqICEjemgg5aaC5p6c6KeG6aKR6KKr5pqC5YGc5pKt5pS+5LqG77yM6LCD55So6L+Z5Liq5o6l5Y+j5Y+v5Lul57un57ut5pKt5pS+44CC5aaC5p6c6KeG6aKR6KKr5YGc5q2i5pKt5pS+5LqG77yM6LCD55So6L+Z5Liq5o6l5Y+j5Y+v5Lul5LuO5aS05byA5aeL5pKt5pS+44CCXG4gICAgICogQG1ldGhvZCBwbGF5XG4gICAgICovXG4gICAgcGxheSAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbXBsKSB7XG4gICAgICAgICAgICB0aGlzLl9zeW5jVm9sdW1lKCk7XG4gICAgICAgICAgICB0aGlzLl9pbXBsLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIElmIGEgdmlkZW8gaXMgcGF1c2VkLCBjYWxsIHRoaXMgbWV0aG9kIHRvIHJlc3VtZSBwbGF5aW5nLlxuICAgICAqICEjemgg5aaC5p6c5LiA5Liq6KeG6aKR5pKt5pS+6KKr5pqC5YGc5pKt5pS+5LqG77yM6LCD55So6L+Z5Liq5o6l5Y+j5Y+v5Lul57un57ut5pKt5pS+44CCXG4gICAgICogQG1ldGhvZCByZXN1bWVcbiAgICAgKi9cbiAgICByZXN1bWUgKCkge1xuICAgICAgICBpZiAodGhpcy5faW1wbCkge1xuICAgICAgICAgICAgdGhpcy5fc3luY1ZvbHVtZSgpO1xuICAgICAgICAgICAgdGhpcy5faW1wbC5yZXN1bWUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIElmIGEgdmlkZW8gaXMgcGxheWluZywgY2FsbCB0aGlzIG1ldGhvZCB0byBwYXVzZSBwbGF5aW5nLlxuICAgICAqICEjemgg5aaC5p6c5LiA5Liq6KeG6aKR5q2j5Zyo5pKt5pS+77yM6LCD55So6L+Z5Liq5o6l5Y+j5Y+v5Lul5pqC5YGc5pKt5pS+44CCXG4gICAgICogQG1ldGhvZCBwYXVzZVxuICAgICAqL1xuICAgIHBhdXNlICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2ltcGwucGF1c2UoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIElmIGEgdmlkZW8gaXMgcGxheWluZywgY2FsbCB0aGlzIG1ldGhvZCB0byBzdG9wIHBsYXlpbmcgaW1tZWRpYXRlbHkuXG4gICAgICogISN6aCDlpoLmnpzkuIDkuKrop4bpopHmraPlnKjmkq3mlL7vvIzosIPnlKjov5nkuKrmjqXlj6Plj6/ku6Xnq4vpqazlgZzmraLmkq3mlL7jgIJcbiAgICAgKiBAbWV0aG9kIHN0b3BcbiAgICAgKi9cbiAgICBzdG9wICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2ltcGwuc3RvcCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0cyB0aGUgZHVyYXRpb24gb2YgdGhlIHZpZGVvXG4gICAgICogISN6aCDojrflj5bop4bpopHmlofku7bnmoTmkq3mlL7mgLvml7bplb9cbiAgICAgKiBAbWV0aG9kIGdldER1cmF0aW9uXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXREdXJhdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbXBsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW1wbC5kdXJhdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBEZXRlcm1pbmUgd2hldGhlciB2aWRlbyBpcyBwbGF5aW5nIG9yIG5vdC5cbiAgICAgKiAhI3poIOWIpOaWreW9k+WJjeinhumikeaYr+WQpuWkhOS6juaSreaUvueKtuaAgVxuICAgICAqIEBtZXRob2QgaXNQbGF5aW5nXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNQbGF5aW5nICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbXBsLmlzUGxheWluZygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIGlmIHlvdSBkb24ndCBuZWVkIHRoZSBWaWRlb1BsYXllciBhbmQgaXQgaXNuJ3QgaW4gYW55IHJ1bm5pbmcgU2NlbmUsIHlvdSBzaG91bGRcbiAgICAgKiBjYWxsIHRoZSBkZXN0cm95IG1ldGhvZCBvbiB0aGlzIGNvbXBvbmVudCBvciB0aGUgYXNzb2NpYXRlZCBub2RlIGV4cGxpY2l0bHkuXG4gICAgICogT3RoZXJ3aXNlLCB0aGUgY3JlYXRlZCBET00gZWxlbWVudCB3b24ndCBiZSByZW1vdmVkIGZyb20gd2ViIHBhZ2UuXG4gICAgICogISN6aFxuICAgICAqIOWmguaenOS9oOS4jeWGjeS9v+eUqCBWaWRlb1BsYXllcu+8jOW5tuS4lOe7hOS7tuacqua3u+WKoOWIsOWcuuaZr+S4re+8jOmCo+S5iOS9oOW/hemhu+aJi+WKqOWvuee7hOS7tuaIluaJgOWcqOiKgueCueiwg+eUqCBkZXN0cm9544CCXG4gICAgICog6L+Z5qC35omN6IO956e76Zmk572R6aG15LiK55qEIERPTSDoioLngrnvvIzpgb/lhY0gV2ViIOW5s+WPsOWGheWtmOazhOmcsuOAglxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmlkZW9wbGF5ZXIubm9kZS5wYXJlbnQgPSBudWxsOyAgLy8gb3IgIHZpZGVvcGxheWVyLm5vZGUucmVtb3ZlRnJvbVBhcmVudChmYWxzZSk7XG4gICAgICogLy8gd2hlbiB5b3UgZG9uJ3QgbmVlZCB2aWRlb3BsYXllciBhbnltb3JlXG4gICAgICogdmlkZW9wbGF5ZXIubm9kZS5kZXN0cm95KCk7XG4gICAgICogQG1ldGhvZCBkZXN0cm95XG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gd2hldGhlciBpdCBpcyB0aGUgZmlyc3QgdGltZSB0aGUgZGVzdHJveSBiZWluZyBjYWxsZWRcbiAgICAgKi9cbn0pO1xuXG5jYy5WaWRlb1BsYXllciA9IG1vZHVsZS5leHBvcnRzID0gVmlkZW9QbGF5ZXI7XG5cbi8qKlxuICogISNlblxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxuICogISN6aFxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXG4gKiBAZXZlbnQgcmVhZHktdG8tcGxheVxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcbiAqIEBwYXJhbSB7VmlkZW9QbGF5ZXJ9IHZpZGVvUGxheWVyIC0gVGhlIFZpZGVvUGxheWVyIGNvbXBvbmVudC5cbiAqL1xuXG4vKipcbiAqICEjZW5cbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cbiAqICEjemhcbiAqIOazqOaEj++8muatpOS6i+S7tuaYr+S7juivpee7hOS7tuaJgOWxnueahCBOb2RlIOS4iumdoua0vuWPkeWHuuadpeeahO+8jOmcgOimgeeUqCBub2RlLm9uIOadpeebkeWQrOOAglxuICogQGV2ZW50IG1ldGEtbG9hZGVkXG4gKiBAcGFyYW0ge0V2ZW50LkV2ZW50Q3VzdG9tfSBldmVudFxuICogQHBhcmFtIHtWaWRlb1BsYXllcn0gdmlkZW9QbGF5ZXIgLSBUaGUgVmlkZW9QbGF5ZXIgY29tcG9uZW50LlxuICovXG5cbi8qKlxuICogISNlblxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxuICogISN6aFxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXG4gKiBAZXZlbnQgY2xpY2tlZFxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcbiAqIEBwYXJhbSB7VmlkZW9QbGF5ZXJ9IHZpZGVvUGxheWVyIC0gVGhlIFZpZGVvUGxheWVyIGNvbXBvbmVudC5cbiAqL1xuXG5cbi8qKlxuICogISNlblxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxuICogISN6aFxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXG4gKiBAZXZlbnQgcGxheWluZ1xuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcbiAqIEBwYXJhbSB7VmlkZW9QbGF5ZXJ9IHZpZGVvUGxheWVyIC0gVGhlIFZpZGVvUGxheWVyIGNvbXBvbmVudC5cbiAqL1xuXG4vKipcbiAqICEjZW5cbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cbiAqICEjemhcbiAqIOazqOaEj++8muatpOS6i+S7tuaYr+S7juivpee7hOS7tuaJgOWxnueahCBOb2RlIOS4iumdoua0vuWPkeWHuuadpeeahO+8jOmcgOimgeeUqCBub2RlLm9uIOadpeebkeWQrOOAglxuICogQGV2ZW50IHBhdXNlZFxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcbiAqIEBwYXJhbSB7VmlkZW9QbGF5ZXJ9IHZpZGVvUGxheWVyIC0gVGhlIFZpZGVvUGxheWVyIGNvbXBvbmVudC5cbiAqL1xuXG4vKipcbiAqICEjZW5cbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cbiAqICEjemhcbiAqIOazqOaEj++8muatpOS6i+S7tuaYr+S7juivpee7hOS7tuaJgOWxnueahCBOb2RlIOS4iumdoua0vuWPkeWHuuadpeeahO+8jOmcgOimgeeUqCBub2RlLm9uIOadpeebkeWQrOOAglxuICogQGV2ZW50IHN0b3BwZWRcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XG4gKiBAcGFyYW0ge1ZpZGVvUGxheWVyfSB2aWRlb1BsYXllciAtIFRoZSBWaWRlb1BsYXllciBjb21wb25lbnQuXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXG4gKiAhI3poXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcbiAqIEBldmVudCBjb21wbGV0ZWRcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XG4gKiBAcGFyYW0ge1ZpZGVvUGxheWVyfSB2aWRlb1BsYXllciAtIFRoZSBWaWRlb1BsYXllciBjb21wb25lbnQuXG4gKi9cbiJdLCJzb3VyY2VSb290IjoiLyJ9