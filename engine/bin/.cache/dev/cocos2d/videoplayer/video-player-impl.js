
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/videoplayer/video-player-impl.js';
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
var utils = require('../core/platform/utils');

var sys = require('../core/platform/CCSys');

var macro = require('../core/platform/CCMacro');

var READY_STATE = {
  HAVE_NOTHING: 0,
  HAVE_METADATA: 1,
  HAVE_CURRENT_DATA: 2,
  HAVE_FUTURE_DATA: 3,
  HAVE_ENOUGH_DATA: 4
};

var _mat4_temp = cc.mat4();

var VideoPlayerImpl = cc.Class({
  name: 'VideoPlayerImpl',
  ctor: function ctor() {
    // 播放结束等事件处理的队列
    this._EventList = {};
    this._video = null;
    this._url = '';
    this._waitingFullscreen = false;
    this._fullScreenEnabled = false;
    this._stayOnBottom = false;
    this._loadedmeta = false;
    this._loaded = false;
    this._visible = false;
    this._playing = false;
    this._ignorePause = false;
    this._forceUpdate = false; // update matrix cache

    this._m00 = 0;
    this._m01 = 0;
    this._m04 = 0;
    this._m05 = 0;
    this._m12 = 0;
    this._m13 = 0;
    this._w = 0;
    this._h = 0; //

    this.__eventListeners = {};
  },
  _bindEvent: function _bindEvent() {
    var video = this._video,
        self = this; //binding event

    var cbs = this.__eventListeners;

    cbs.loadedmetadata = function () {
      self._loadedmeta = true;
      self._forceUpdate = true;

      if (self._waitingFullscreen) {
        self._waitingFullscreen = false;

        self._toggleFullscreen(true);
      }

      self._dispatchEvent(VideoPlayerImpl.EventType.META_LOADED);
    };

    cbs.ended = function () {
      if (self._video !== video) return;
      self._playing = false;

      self._dispatchEvent(VideoPlayerImpl.EventType.COMPLETED);
    };

    cbs.play = function () {
      if (self._video !== video) return;
      self._playing = true;

      self._updateVisibility();

      self._dispatchEvent(VideoPlayerImpl.EventType.PLAYING);
    }; // pause and stop callback


    cbs.pause = function () {
      if (self._video !== video) {
        return;
      }

      self._playing = false;

      if (!self._ignorePause) {
        self._dispatchEvent(VideoPlayerImpl.EventType.PAUSED);
      }
    };

    cbs.click = function () {
      self._dispatchEvent(VideoPlayerImpl.EventType.CLICKED);
    };

    video.addEventListener("loadedmetadata", cbs.loadedmetadata);
    video.addEventListener("ended", cbs.ended);
    video.addEventListener("play", cbs.play);
    video.addEventListener("pause", cbs.pause);
    video.addEventListener("click", cbs.click);

    function onCanPlay() {
      if (self._loaded || self._playing) return;
      var video = self._video;

      if (video.readyState === READY_STATE.HAVE_ENOUGH_DATA || video.readyState === READY_STATE.HAVE_METADATA) {
        video.currentTime = 0;
        self._loaded = true;
        self._forceUpdate = true;

        self._dispatchEvent(VideoPlayerImpl.EventType.READY_TO_PLAY);

        self._updateVisibility();
      }
    }

    cbs.onCanPlay = onCanPlay;
    video.addEventListener('canplay', cbs.onCanPlay);
    video.addEventListener('canplaythrough', cbs.onCanPlay);
    video.addEventListener('suspend', cbs.onCanPlay);
  },
  _updateVisibility: function _updateVisibility() {
    var video = this._video;
    if (!video) return;

    if (this._visible) {
      video.style.visibility = 'visible';
    } else {
      video.style.visibility = 'hidden';
      video.pause();
      this._playing = false;
    }
  },
  _updateSize: function _updateSize(width, height) {
    var video = this._video;
    if (!video) return;
    video.style.width = width + 'px';
    video.style.height = height + 'px';
  },
  _createDom: function _createDom(muted) {
    var video = document.createElement('video');
    video.style.position = "absolute";
    video.style.bottom = "0px";
    video.style.left = "0px";
    video.style['z-index'] = this._stayOnBottom ? macro.MIN_ZINDEX : 0;
    video.className = "cocosVideo";
    video.setAttribute('preload', 'auto');
    video.setAttribute('webkit-playsinline', ''); // This x5-playsinline tag must be added, otherwise the play, pause events will only fire once, in the qq browser.

    video.setAttribute("x5-playsinline", '');
    video.setAttribute('playsinline', '');

    if (muted) {
      video.setAttribute('muted', '');
    }

    this._video = video;
    cc.game.container.appendChild(video);
  },
  createDomElementIfNeeded: function createDomElementIfNeeded(muted) {
    if (!this._video) {
      this._createDom(muted);
    }
  },
  removeDom: function removeDom() {
    var video = this._video;

    if (video) {
      var hasChild = utils.contains(cc.game.container, video);
      if (hasChild) cc.game.container.removeChild(video);
      var cbs = this.__eventListeners;
      video.removeEventListener("loadedmetadata", cbs.loadedmetadata);
      video.removeEventListener("ended", cbs.ended);
      video.removeEventListener("play", cbs.play);
      video.removeEventListener("pause", cbs.pause);
      video.removeEventListener("click", cbs.click);
      video.removeEventListener("canplay", cbs.onCanPlay);
      video.removeEventListener("canplaythrough", cbs.onCanPlay);
      video.removeEventListener("suspend", cbs.onCanPlay);
      cbs.loadedmetadata = null;
      cbs.ended = null;
      cbs.play = null;
      cbs.pause = null;
      cbs.click = null;
      cbs.onCanPlay = null;
    }

    this._video = null;
    this._url = "";
  },
  setURL: function setURL(path, muted) {
    var source, extname;

    if (this._url === path) {
      return;
    }

    this.removeDom();
    this._url = path;
    this.createDomElementIfNeeded(muted);

    this._bindEvent();

    var video = this._video;
    video.style["visibility"] = "hidden";
    this._loaded = false;
    this._playing = false;
    this._loadedmeta = false;
    source = document.createElement("source");
    source.src = path;
    video.appendChild(source);
    extname = cc.path.extname(path);
    var polyfill = VideoPlayerImpl._polyfill;

    for (var i = 0; i < polyfill.canPlayType.length; i++) {
      if (extname !== polyfill.canPlayType[i]) {
        source = document.createElement("source");
        source.src = path.replace(extname, polyfill.canPlayType[i]);
        video.appendChild(source);
      }
    }
  },
  getURL: function getURL() {
    return this._url;
  },
  play: function play() {
    var video = this._video;
    if (!video || !this._visible || this._playing) return;

    if (VideoPlayerImpl._polyfill.autoplayAfterOperation) {
      var self = this;
      setTimeout(function () {
        video.play();
      }, 20);
    } else {
      video.play();
    }
  },
  pause: function pause() {
    var video = this._video;
    if (!this._playing || !video) return;
    video.pause();
  },
  resume: function resume() {
    this.play();
  },
  stop: function stop() {
    var video = this._video;
    if (!video || !this._visible) return;
    this._ignorePause = true;
    video.currentTime = 0;
    video.pause();
    setTimeout(function () {
      this._dispatchEvent(VideoPlayerImpl.EventType.STOPPED);

      this._ignorePause = false;
    }.bind(this), 0);
  },
  setVolume: function setVolume(volume) {
    var video = this._video;

    if (video) {
      video.volume = volume;
    }
  },
  seekTo: function seekTo(time) {
    var video = this._video;
    if (!video) return;

    if (this._loaded) {
      video.currentTime = time;
    } else {
      var cb = function cb() {
        video.currentTime = time;
        video.removeEventListener(VideoPlayerImpl._polyfill.event, cb);
      };

      video.addEventListener(VideoPlayerImpl._polyfill.event, cb);
    }

    if (VideoPlayerImpl._polyfill.autoplayAfterOperation && this.isPlaying()) {
      setTimeout(function () {
        video.play();
      }, 20);
    }
  },
  isPlaying: function isPlaying() {
    var video = this._video;

    if (VideoPlayerImpl._polyfill.autoplayAfterOperation && this._playing) {
      setTimeout(function () {
        video.play();
      }, 20);
    }

    return this._playing;
  },
  duration: function duration() {
    var video = this._video;
    var duration = -1;
    if (!video) return duration;
    duration = video.duration;

    if (duration <= 0) {
      cc.logID(7702);
    }

    return duration;
  },
  currentTime: function currentTime() {
    var video = this._video;
    if (!video) return -1;
    return video.currentTime;
  },
  setKeepAspectRatioEnabled: function setKeepAspectRatioEnabled() {
    if (CC_EDITOR) {
      return;
    }

    cc.logID(7700);
  },
  isKeepAspectRatioEnabled: function isKeepAspectRatioEnabled() {
    return true;
  },
  _toggleFullscreen: function _toggleFullscreen(enable) {
    var self = this,
        video = this._video;

    if (!video) {
      return;
    } // Monitor video entry and exit full-screen events


    function handleFullscreenChange(event) {
      var fullscreenElement = sys.browserType === sys.BROWSER_TYPE_IE ? document.msFullscreenElement : document.fullscreenElement;
      self._fullScreenEnabled = fullscreenElement === video;
    }

    function handleFullScreenError(event) {
      self._fullScreenEnabled = false;
    }

    if (enable) {
      if (sys.browserType === sys.BROWSER_TYPE_IE) {
        // fix IE full screen content is not centered
        video.style['transform'] = '';
      }

      cc.screen.requestFullScreen(video, handleFullscreenChange, handleFullScreenError);
    } else if (cc.screen.fullScreen()) {
      cc.screen.exitFullScreen(video);
    }
  },
  setStayOnBottom: function setStayOnBottom(enabled) {
    this._stayOnBottom = enabled;
    if (!this._video) return;
    this._video.style['z-index'] = enabled ? macro.MIN_ZINDEX : 0;
  },
  setFullScreenEnabled: function setFullScreenEnabled(enable) {
    if (!this._loadedmeta && enable) {
      this._waitingFullscreen = true;
    } else {
      this._toggleFullscreen(enable);
    }
  },
  isFullScreenEnabled: function isFullScreenEnabled() {
    return this._fullScreenEnabled;
  },
  setEventListener: function setEventListener(event, callback) {
    this._EventList[event] = callback;
  },
  removeEventListener: function removeEventListener(event) {
    this._EventList[event] = null;
  },
  _dispatchEvent: function _dispatchEvent(event) {
    var callback = this._EventList[event];
    if (callback) callback.call(this, this, this._video.src);
  },
  onPlayEvent: function onPlayEvent() {
    var callback = this._EventList[VideoPlayerImpl.EventType.PLAYING];
    callback.call(this, this, this._video.src);
  },
  enable: function enable() {
    var list = VideoPlayerImpl.elements;
    if (list.indexOf(this) === -1) list.push(this);
    this.setVisible(true);
  },
  disable: function disable() {
    var list = VideoPlayerImpl.elements;
    var index = list.indexOf(this);
    if (index !== -1) list.splice(index, 1);
    this.setVisible(false);
  },
  destroy: function destroy() {
    this.disable();
    this.removeDom();
  },
  setVisible: function setVisible(visible) {
    if (this._visible !== visible) {
      this._visible = !!visible;

      this._updateVisibility();
    }
  },
  updateMatrix: function updateMatrix(node) {
    if (!this._video || !this._visible || this._fullScreenEnabled) return;
    node.getWorldMatrix(_mat4_temp);

    var renderCamera = cc.Camera._findRendererCamera(node);

    if (renderCamera) {
      renderCamera.worldMatrixToScreen(_mat4_temp, _mat4_temp, cc.game.canvas.width, cc.game.canvas.height);
    }

    var _mat4_tempm = _mat4_temp.m;

    if (!this._forceUpdate && this._m00 === _mat4_tempm[0] && this._m01 === _mat4_tempm[1] && this._m04 === _mat4_tempm[4] && this._m05 === _mat4_tempm[5] && this._m12 === _mat4_tempm[12] && this._m13 === _mat4_tempm[13] && this._w === node._contentSize.width && this._h === node._contentSize.height) {
      return;
    } // update matrix cache


    this._m00 = _mat4_tempm[0];
    this._m01 = _mat4_tempm[1];
    this._m04 = _mat4_tempm[4];
    this._m05 = _mat4_tempm[5];
    this._m12 = _mat4_tempm[12];
    this._m13 = _mat4_tempm[13];
    this._w = node._contentSize.width;
    this._h = node._contentSize.height;
    var dpr = cc.view._devicePixelRatio;
    var scaleX = 1 / dpr;
    var scaleY = 1 / dpr;
    var container = cc.game.container;
    var a = _mat4_tempm[0] * scaleX,
        b = _mat4_tempm[1],
        c = _mat4_tempm[4],
        d = _mat4_tempm[5] * scaleY;
    var offsetX = container && container.style.paddingLeft ? parseInt(container.style.paddingLeft) : 0;
    var offsetY = container && container.style.paddingBottom ? parseInt(container.style.paddingBottom) : 0;
    var w, h;

    if (VideoPlayerImpl._polyfill.zoomInvalid) {
      this._updateSize(this._w * a, this._h * d);

      a = 1;
      d = 1;
      w = this._w * scaleX;
      h = this._h * scaleY;
    } else {
      w = this._w * scaleX;
      h = this._h * scaleY;

      this._updateSize(this._w, this._h);
    }

    var appx = w * _mat4_tempm[0] * node._anchorPoint.x;
    var appy = h * _mat4_tempm[5] * node._anchorPoint.y;
    var tx = _mat4_tempm[12] * scaleX - appx + offsetX,
        ty = _mat4_tempm[13] * scaleY - appy + offsetY;
    var matrix = "matrix(" + a + "," + -b + "," + -c + "," + d + "," + tx + "," + -ty + ")";
    this._video.style['transform'] = matrix;
    this._video.style['-webkit-transform'] = matrix;
    this._video.style['transform-origin'] = '0px 100% 0px';
    this._video.style['-webkit-transform-origin'] = '0px 100% 0px'; // TODO: move into web adapter
    // video style would change when enter fullscreen on IE
    // there is no way to add fullscreenchange event listeners on IE so that we can restore the cached video style

    if (sys.browserType !== sys.BROWSER_TYPE_IE) {
      this._forceUpdate = false;
    }
  }
});
VideoPlayerImpl.EventType = {
  NONE: -1,
  PLAYING: 0,
  PAUSED: 1,
  STOPPED: 2,
  COMPLETED: 3,
  META_LOADED: 4,
  CLICKED: 5,
  READY_TO_PLAY: 6
}; // video 队列，所有 vidoe 在 onEnter 的时候都会插入这个队列

VideoPlayerImpl.elements = []; // video 在 game_hide 事件中被自动暂停的队列，用于回复的时候重新开始播放

VideoPlayerImpl.pauseElements = [];
cc.game.on(cc.game.EVENT_HIDE, function () {
  var list = VideoPlayerImpl.elements;

  for (var element, i = 0; i < list.length; i++) {
    element = list[i];

    if (element.isPlaying()) {
      element.pause();
      VideoPlayerImpl.pauseElements.push(element);
    }
  }
});
cc.game.on(cc.game.EVENT_SHOW, function () {
  var list = VideoPlayerImpl.pauseElements;
  var element = list.pop();

  while (element) {
    element.play();
    element = list.pop();
  }
});
/**
 * Adapter various machines
 * @devicePixelRatio Whether you need to consider devicePixelRatio calculated position
 * @event To get the data using events
 */

VideoPlayerImpl._polyfill = {
  devicePixelRatio: false,
  event: "canplay",
  canPlayType: []
};
/**
 * Some old browser only supports Theora encode video
 * But native does not support this encode,
 * so it is best to provide mp4 and webm or ogv file
 */
// TODO: adapt wx video player
// issue: https://github.com/cocos-creator/2d-tasks/issues/1364

var dom = document.createElement("video");

if (dom.canPlayType) {
  if (dom.canPlayType("video/ogg")) {
    VideoPlayerImpl._polyfill.canPlayType.push(".ogg");

    VideoPlayerImpl._polyfill.canPlayType.push(".ogv");
  }

  if (dom.canPlayType("video/mp4")) {
    VideoPlayerImpl._polyfill.canPlayType.push(".mp4");
  }

  if (dom.canPlayType("video/webm")) {
    VideoPlayerImpl._polyfill.canPlayType.push(".webm");
  }
}

if (sys.browserType === sys.BROWSER_TYPE_FIREFOX) {
  VideoPlayerImpl._polyfill.autoplayAfterOperation = true;
}

if (sys.OS_ANDROID === sys.os && (sys.browserType === sys.BROWSER_TYPE_SOUGOU || sys.browserType === sys.BROWSER_TYPE_360)) {
  VideoPlayerImpl._polyfill.zoomInvalid = true;
}

var style = document.createElement("style");
style.innerHTML = ".cocosVideo:-moz-full-screen{transform:matrix(1,0,0,1,0,0) !important;}" + ".cocosVideo:full-screen{transform:matrix(1,0,0,1,0,0) !important;}" + ".cocosVideo:-webkit-full-screen{transform:matrix(1,0,0,1,0,0) !important;}";
document.head.appendChild(style);
module.exports = VideoPlayerImpl;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC92aWRlb3BsYXllci92aWRlby1wbGF5ZXItaW1wbC5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsInJlcXVpcmUiLCJzeXMiLCJtYWNybyIsIlJFQURZX1NUQVRFIiwiSEFWRV9OT1RISU5HIiwiSEFWRV9NRVRBREFUQSIsIkhBVkVfQ1VSUkVOVF9EQVRBIiwiSEFWRV9GVVRVUkVfREFUQSIsIkhBVkVfRU5PVUdIX0RBVEEiLCJfbWF0NF90ZW1wIiwiY2MiLCJtYXQ0IiwiVmlkZW9QbGF5ZXJJbXBsIiwiQ2xhc3MiLCJuYW1lIiwiY3RvciIsIl9FdmVudExpc3QiLCJfdmlkZW8iLCJfdXJsIiwiX3dhaXRpbmdGdWxsc2NyZWVuIiwiX2Z1bGxTY3JlZW5FbmFibGVkIiwiX3N0YXlPbkJvdHRvbSIsIl9sb2FkZWRtZXRhIiwiX2xvYWRlZCIsIl92aXNpYmxlIiwiX3BsYXlpbmciLCJfaWdub3JlUGF1c2UiLCJfZm9yY2VVcGRhdGUiLCJfbTAwIiwiX20wMSIsIl9tMDQiLCJfbTA1IiwiX20xMiIsIl9tMTMiLCJfdyIsIl9oIiwiX19ldmVudExpc3RlbmVycyIsIl9iaW5kRXZlbnQiLCJ2aWRlbyIsInNlbGYiLCJjYnMiLCJsb2FkZWRtZXRhZGF0YSIsIl90b2dnbGVGdWxsc2NyZWVuIiwiX2Rpc3BhdGNoRXZlbnQiLCJFdmVudFR5cGUiLCJNRVRBX0xPQURFRCIsImVuZGVkIiwiQ09NUExFVEVEIiwicGxheSIsIl91cGRhdGVWaXNpYmlsaXR5IiwiUExBWUlORyIsInBhdXNlIiwiUEFVU0VEIiwiY2xpY2siLCJDTElDS0VEIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uQ2FuUGxheSIsInJlYWR5U3RhdGUiLCJjdXJyZW50VGltZSIsIlJFQURZX1RPX1BMQVkiLCJzdHlsZSIsInZpc2liaWxpdHkiLCJfdXBkYXRlU2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwiX2NyZWF0ZURvbSIsIm11dGVkIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicG9zaXRpb24iLCJib3R0b20iLCJsZWZ0IiwiTUlOX1pJTkRFWCIsImNsYXNzTmFtZSIsInNldEF0dHJpYnV0ZSIsImdhbWUiLCJjb250YWluZXIiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZURvbUVsZW1lbnRJZk5lZWRlZCIsInJlbW92ZURvbSIsImhhc0NoaWxkIiwiY29udGFpbnMiLCJyZW1vdmVDaGlsZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRVUkwiLCJwYXRoIiwic291cmNlIiwiZXh0bmFtZSIsInNyYyIsInBvbHlmaWxsIiwiX3BvbHlmaWxsIiwiaSIsImNhblBsYXlUeXBlIiwibGVuZ3RoIiwicmVwbGFjZSIsImdldFVSTCIsImF1dG9wbGF5QWZ0ZXJPcGVyYXRpb24iLCJzZXRUaW1lb3V0IiwicmVzdW1lIiwic3RvcCIsIlNUT1BQRUQiLCJiaW5kIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwic2Vla1RvIiwidGltZSIsImNiIiwiZXZlbnQiLCJpc1BsYXlpbmciLCJkdXJhdGlvbiIsImxvZ0lEIiwic2V0S2VlcEFzcGVjdFJhdGlvRW5hYmxlZCIsIkNDX0VESVRPUiIsImlzS2VlcEFzcGVjdFJhdGlvRW5hYmxlZCIsImVuYWJsZSIsImhhbmRsZUZ1bGxzY3JlZW5DaGFuZ2UiLCJmdWxsc2NyZWVuRWxlbWVudCIsImJyb3dzZXJUeXBlIiwiQlJPV1NFUl9UWVBFX0lFIiwibXNGdWxsc2NyZWVuRWxlbWVudCIsImhhbmRsZUZ1bGxTY3JlZW5FcnJvciIsInNjcmVlbiIsInJlcXVlc3RGdWxsU2NyZWVuIiwiZnVsbFNjcmVlbiIsImV4aXRGdWxsU2NyZWVuIiwic2V0U3RheU9uQm90dG9tIiwiZW5hYmxlZCIsInNldEZ1bGxTY3JlZW5FbmFibGVkIiwiaXNGdWxsU2NyZWVuRW5hYmxlZCIsInNldEV2ZW50TGlzdGVuZXIiLCJjYWxsYmFjayIsImNhbGwiLCJvblBsYXlFdmVudCIsImxpc3QiLCJlbGVtZW50cyIsImluZGV4T2YiLCJwdXNoIiwic2V0VmlzaWJsZSIsImRpc2FibGUiLCJpbmRleCIsInNwbGljZSIsImRlc3Ryb3kiLCJ2aXNpYmxlIiwidXBkYXRlTWF0cml4Iiwibm9kZSIsImdldFdvcmxkTWF0cml4IiwicmVuZGVyQ2FtZXJhIiwiQ2FtZXJhIiwiX2ZpbmRSZW5kZXJlckNhbWVyYSIsIndvcmxkTWF0cml4VG9TY3JlZW4iLCJjYW52YXMiLCJfbWF0NF90ZW1wbSIsIm0iLCJfY29udGVudFNpemUiLCJkcHIiLCJ2aWV3IiwiX2RldmljZVBpeGVsUmF0aW8iLCJzY2FsZVgiLCJzY2FsZVkiLCJhIiwiYiIsImMiLCJkIiwib2Zmc2V0WCIsInBhZGRpbmdMZWZ0IiwicGFyc2VJbnQiLCJvZmZzZXRZIiwicGFkZGluZ0JvdHRvbSIsInciLCJoIiwiem9vbUludmFsaWQiLCJhcHB4IiwiX2FuY2hvclBvaW50IiwieCIsImFwcHkiLCJ5IiwidHgiLCJ0eSIsIm1hdHJpeCIsIk5PTkUiLCJwYXVzZUVsZW1lbnRzIiwib24iLCJFVkVOVF9ISURFIiwiZWxlbWVudCIsIkVWRU5UX1NIT1ciLCJwb3AiLCJkZXZpY2VQaXhlbFJhdGlvIiwiZG9tIiwiQlJPV1NFUl9UWVBFX0ZJUkVGT1giLCJPU19BTkRST0lEIiwib3MiLCJCUk9XU0VSX1RZUEVfU09VR09VIiwiQlJPV1NFUl9UWVBFXzM2MCIsImlubmVySFRNTCIsImhlYWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyx3QkFBRCxDQUFyQjs7QUFDQSxJQUFNQyxHQUFHLEdBQUdELE9BQU8sQ0FBQyx3QkFBRCxDQUFuQjs7QUFDQSxJQUFNRSxLQUFLLEdBQUdGLE9BQU8sQ0FBQywwQkFBRCxDQUFyQjs7QUFFQSxJQUFNRyxXQUFXLEdBQUc7QUFDaEJDLEVBQUFBLFlBQVksRUFBRSxDQURFO0FBRWhCQyxFQUFBQSxhQUFhLEVBQUUsQ0FGQztBQUdoQkMsRUFBQUEsaUJBQWlCLEVBQUUs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QWhCLENBQTBCRSxXQUExQixDQUFzQzRDLElBQXRDLENBQTJDLE1BQTNDO0FBQ0g7O0FBQ0QsTUFBSW1ELEdBQUcsQ0FBQy9GLFdBQUosQ0FBZ0IsWUFBaEIsQ0FBSixFQUFtQztBQUMvQmhGLElBQUFBLGVBQWUsQ0FBQzhFLFNBQWhCLENBQTBCRSxXQUExQixDQUFzQzRDLElBQXRDLENBQTJDLE9BQTNDO0FBQ0g7QUFDSjs7QUFFRCxJQUFJdkksR0FBRyxDQUFDb0gsV0FBSixLQUFvQnBILEdBQUcsQ0FBQzJMLG9CQUE1QixFQUFrRDtBQUM5Q2hMLEVBQUFBLGVBQWUsQ0FBQzhFLFNBQWhCLENBQTBCTSxzQkFBMUIsR0FBbUQsSUFBbkQ7QUFDSDs7QUFFRCxJQUNJL0YsR0FBRyxDQUFDNEwsVUFBSixLQUFtQjVMLEdBQUcsQ0FBQzZMLEVBQXZCLEtBQ0E3TCxHQUFHLENBQUNvSCxXQUFKLEtBQW9CcEgsR0FBRyxDQUFDOEwsbUJBQXhCLElBQ0E5TCxHQUFHLENBQUNvSCxXQUFKLEtBQW9CcEgsR0FBRyxDQUFDK0wsZ0JBRnhCLENBREosRUFLRTtBQUNFcEwsRUFBQUEsZUFBZSxDQUFDOEUsU0FBaEIsQ0FBMEJnRixXQUExQixHQUF3QyxJQUF4QztBQUNIOztBQUVELElBQUk5RyxLQUFLLEdBQUdPLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixPQUF2QixDQUFaO0FBQ0FSLEtBQUssQ0FBQ3FJLFNBQU4sR0FBa0IsNEVBQ2Qsb0VBRGMsR0FFZCw0RUFGSjtBQUdBOUgsUUFBUSxDQUFDK0gsSUFBVCxDQUFjckgsV0FBZCxDQUEwQmpCLEtBQTFCO0FBRUF1SSxNQUFNLENBQUNDLE9BQVAsR0FBaUJ4TCxlQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi4vY29yZS9wbGF0Zm9ybS91dGlscycpO1xuY29uc3Qgc3lzID0gcmVxdWlyZSgnLi4vY29yZS9wbGF0Zm9ybS9DQ1N5cycpO1xuY29uc3QgbWFjcm8gPSByZXF1aXJlKCcuLi9jb3JlL3BsYXRmb3JtL0NDTWFjcm8nKTtcblxuY29uc3QgUkVBRFlfU1RBVEUgPSB7XG4gICAgSEFWRV9OT1RISU5HOiAwLFxuICAgIEhBVkVfTUVUQURBVEE6IDEsXG4gICAgSEFWRV9DVVJSRU5UX0RBVEE6IDIsXG4gICAgSEFWRV9GVVRVUkVfREFUQTogMyxcbiAgICBIQVZFX0VOT1VHSF9EQVRBOiA0XG59O1xuXG5sZXQgX21hdDRfdGVtcCA9IGNjLm1hdDQoKTtcblxubGV0IFZpZGVvUGxheWVySW1wbCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnVmlkZW9QbGF5ZXJJbXBsJyxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICAvLyDmkq3mlL7nu5PmnZ/nrYnkuovku7blpITnkIbnmoTpmJ/liJdcbiAgICAgICAgdGhpcy5fRXZlbnRMaXN0ID0ge307XG5cbiAgICAgICAgdGhpcy5fdmlkZW8gPSBudWxsO1xuICAgICAgICB0aGlzLl91cmwgPSAnJztcblxuICAgICAgICB0aGlzLl93YWl0aW5nRnVsbHNjcmVlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9mdWxsU2NyZWVuRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zdGF5T25Cb3R0b20gPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9sb2FkZWRtZXRhID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2xvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faWdub3JlUGF1c2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZm9yY2VVcGRhdGUgPSBmYWxzZTtcblxuICAgICAgICAvLyB1cGRhdGUgbWF0cml4IGNhY2hlXG4gICAgICAgIHRoaXMuX20wMCA9IDA7XG4gICAgICAgIHRoaXMuX20wMSA9IDA7XG4gICAgICAgIHRoaXMuX20wNCA9IDA7XG4gICAgICAgIHRoaXMuX20wNSA9IDA7XG4gICAgICAgIHRoaXMuX20xMiA9IDA7XG4gICAgICAgIHRoaXMuX20xMyA9IDA7XG4gICAgICAgIHRoaXMuX3cgPSAwO1xuICAgICAgICB0aGlzLl9oID0gMDtcbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy5fX2V2ZW50TGlzdGVuZXJzID0ge307XG4gICAgfSxcblxuICAgIF9iaW5kRXZlbnQgKCkge1xuICAgICAgICBsZXQgdmlkZW8gPSB0aGlzLl92aWRlbywgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8vYmluZGluZyBldmVudFxuICAgICAgICBsZXQgY2JzID0gdGhpcy5fX2V2ZW50TGlzdGVuZXJzO1xuICAgICAgICBjYnMubG9hZGVkbWV0YWRhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9sb2FkZWRtZXRhID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYuX2ZvcmNlVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChzZWxmLl93YWl0aW5nRnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIHNlbGYuX3dhaXRpbmdGdWxsc2NyZWVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZi5fdG9nZ2xlRnVsbHNjcmVlbih0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuX2Rpc3BhdGNoRXZlbnQoVmlkZW9QbGF5ZXJJbXBsLkV2ZW50VHlwZS5NRVRBX0xPQURFRCk7XG4gICAgICAgIH07XG4gICAgICAgIGNicy5lbmRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLl92aWRlbyAhPT0gdmlkZW8pIHJldHVybjtcbiAgICAgICAgICAgIHNlbGYuX3BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGYuX2Rpc3BhdGNoRXZlbnQoVmlkZW9QbGF5ZXJJbXBsLkV2ZW50VHlwZS5DT01QTEVURUQpO1xuICAgICAgICB9O1xuICAgICAgICBjYnMucGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLl92aWRlbyAhPT0gdmlkZW8pIHJldHVybjtcbiAgICAgICAgICAgIHNlbGYuX3BsYXlpbmcgPSB0cnVlO1xuICAgICAgICAgICAgc2VsZi5fdXBkYXRlVmlzaWJpbGl0eSgpO1xuICAgICAgICAgICAgc2VsZi5fZGlzcGF0Y2hFdmVudChWaWRlb1BsYXllckltcGwuRXZlbnRUeXBlLlBMQVlJTkcpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBwYXVzZSBhbmQgc3RvcCBjYWxsYmFja1xuICAgICAgICBjYnMucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5fdmlkZW8gIT09IHZpZGVvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5fcGxheWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFzZWxmLl9pZ25vcmVQYXVzZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuX2Rpc3BhdGNoRXZlbnQoVmlkZW9QbGF5ZXJJbXBsLkV2ZW50VHlwZS5QQVVTRUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjYnMuY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLl9kaXNwYXRjaEV2ZW50KFZpZGVvUGxheWVySW1wbC5FdmVudFR5cGUuQ0xJQ0tFRCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZG1ldGFkYXRhXCIsIGNicy5sb2FkZWRtZXRhZGF0YSk7XG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoXCJlbmRlZFwiLCBjYnMuZW5kZWQpO1xuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKFwicGxheVwiLCBjYnMucGxheSk7XG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoXCJwYXVzZVwiLCBjYnMucGF1c2UpO1xuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2JzLmNsaWNrKTtcblxuICAgICAgICBmdW5jdGlvbiBvbkNhblBsYXkgKCkge1xuICAgICAgICAgICAgaWYgKHNlbGYuX2xvYWRlZCB8fCBzZWxmLl9wbGF5aW5nKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGxldCB2aWRlbyA9IHNlbGYuX3ZpZGVvO1xuICAgICAgICAgICAgaWYgKHZpZGVvLnJlYWR5U3RhdGUgPT09IFJFQURZX1NUQVRFLkhBVkVfRU5PVUdIX0RBVEEgfHxcbiAgICAgICAgICAgICAgICB2aWRlby5yZWFkeVN0YXRlID09PSBSRUFEWV9TVEFURS5IQVZFX01FVEFEQVRBKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSAwO1xuICAgICAgICAgICAgICAgIHNlbGYuX2xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi5fZm9yY2VVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNlbGYuX2Rpc3BhdGNoRXZlbnQoVmlkZW9QbGF5ZXJJbXBsLkV2ZW50VHlwZS5SRUFEWV9UT19QTEFZKTtcbiAgICAgICAgICAgICAgICBzZWxmLl91cGRhdGVWaXNpYmlsaXR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjYnMub25DYW5QbGF5ID0gb25DYW5QbGF5O1xuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5JywgY2JzLm9uQ2FuUGxheSk7XG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgY2JzLm9uQ2FuUGxheSk7XG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3N1c3BlbmQnLCBjYnMub25DYW5QbGF5KTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZVZpc2liaWxpdHkgKCkge1xuICAgICAgICBsZXQgdmlkZW8gPSB0aGlzLl92aWRlbztcbiAgICAgICAgaWYgKCF2aWRlbykgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0aGlzLl92aXNpYmxlKSB7XG4gICAgICAgICAgICB2aWRlby5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmlkZW8uc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgdmlkZW8ucGF1c2UoKTtcbiAgICAgICAgICAgIHRoaXMuX3BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdXBkYXRlU2l6ZSAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBsZXQgdmlkZW8gPSB0aGlzLl92aWRlbztcbiAgICAgICAgaWYgKCF2aWRlbykgcmV0dXJuO1xuXG4gICAgICAgIHZpZGVvLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICB2aWRlby5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgIH0sXG5cbiAgICBfY3JlYXRlRG9tIChtdXRlZCkge1xuICAgICAgICBsZXQgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICB2aWRlby5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgdmlkZW8uc3R5bGUuYm90dG9tID0gXCIwcHhcIjtcbiAgICAgICAgdmlkZW8uc3R5bGUubGVmdCA9IFwiMHB4XCI7XG4gICAgICAgIHZpZGVvLnN0eWxlWyd6LWluZGV4J10gPSB0aGlzLl9zdGF5T25Cb3R0b20gPyBtYWNyby5NSU5fWklOREVYIDogMDtcbiAgICAgICAgdmlkZW8uY2xhc3NOYW1lID0gXCJjb2Nvc1ZpZGVvXCI7XG4gICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgncHJlbG9hZCcsICdhdXRvJyk7XG4gICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnd2Via2l0LXBsYXlzaW5saW5lJywgJycpO1xuICAgICAgICAvLyBUaGlzIHg1LXBsYXlzaW5saW5lIHRhZyBtdXN0IGJlIGFkZGVkLCBvdGhlcndpc2UgdGhlIHBsYXksIHBhdXNlIGV2ZW50cyB3aWxsIG9ubHkgZmlyZSBvbmNlLCBpbiB0aGUgcXEgYnJvd3Nlci5cbiAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwieDUtcGxheXNpbmxpbmVcIiwgJycpO1xuICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJycpO1xuICAgICAgICBpZiAobXV0ZWQpIHtcbiAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnbXV0ZWQnLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl92aWRlbyA9IHZpZGVvO1xuICAgICAgICBjYy5nYW1lLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh2aWRlbyk7XG4gICAgfSxcblxuICAgIGNyZWF0ZURvbUVsZW1lbnRJZk5lZWRlZDogZnVuY3Rpb24gKG11dGVkKSB7XG4gICAgICAgIGlmICghdGhpcy5fdmlkZW8pIHtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZURvbShtdXRlZCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVtb3ZlRG9tICgpIHtcbiAgICAgICAgbGV0IHZpZGVvID0gdGhpcy5fdmlkZW87XG4gICAgICAgIGlmICh2aWRlbykge1xuICAgICAgICAgICAgbGV0IGhhc0NoaWxkID0gdXRpbHMuY29udGFpbnMoY2MuZ2FtZS5jb250YWluZXIsIHZpZGVvKTtcbiAgICAgICAgICAgIGlmIChoYXNDaGlsZClcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmNvbnRhaW5lci5yZW1vdmVDaGlsZCh2aWRlbyk7XG4gICAgICAgICAgICBsZXQgY2JzID0gdGhpcy5fX2V2ZW50TGlzdGVuZXJzO1xuICAgICAgICAgICAgdmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRlZG1ldGFkYXRhXCIsIGNicy5sb2FkZWRtZXRhZGF0YSk7XG4gICAgICAgICAgICB2aWRlby5yZW1vdmVFdmVudExpc3RlbmVyKFwiZW5kZWRcIiwgY2JzLmVuZGVkKTtcbiAgICAgICAgICAgIHZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwbGF5XCIsIGNicy5wbGF5KTtcbiAgICAgICAgICAgIHZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYXVzZVwiLCBjYnMucGF1c2UpO1xuICAgICAgICAgICAgdmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNicy5jbGljayk7XG4gICAgICAgICAgICB2aWRlby5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLCBjYnMub25DYW5QbGF5KTtcbiAgICAgICAgICAgIHZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5dGhyb3VnaFwiLCBjYnMub25DYW5QbGF5KTtcbiAgICAgICAgICAgIHZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzdXNwZW5kXCIsIGNicy5vbkNhblBsYXkpO1xuXG4gICAgICAgICAgICBjYnMubG9hZGVkbWV0YWRhdGEgPSBudWxsO1xuICAgICAgICAgICAgY2JzLmVuZGVkID0gbnVsbDtcbiAgICAgICAgICAgIGNicy5wbGF5ID0gbnVsbDtcbiAgICAgICAgICAgIGNicy5wYXVzZSA9IG51bGw7XG4gICAgICAgICAgICBjYnMuY2xpY2sgPSBudWxsO1xuICAgICAgICAgICAgY2JzLm9uQ2FuUGxheSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl92aWRlbyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3VybCA9IFwiXCI7XG4gICAgfSxcblxuICAgIHNldFVSTCAocGF0aCwgbXV0ZWQpIHtcbiAgICAgICAgbGV0IHNvdXJjZSwgZXh0bmFtZTtcblxuICAgICAgICBpZiAodGhpcy5fdXJsID09PSBwYXRoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZURvbSgpO1xuICAgICAgICB0aGlzLl91cmwgPSBwYXRoO1xuICAgICAgICB0aGlzLmNyZWF0ZURvbUVsZW1lbnRJZk5lZWRlZChtdXRlZCk7XG4gICAgICAgIHRoaXMuX2JpbmRFdmVudCgpO1xuXG4gICAgICAgIGxldCB2aWRlbyA9IHRoaXMuX3ZpZGVvO1xuICAgICAgICB2aWRlby5zdHlsZVtcInZpc2liaWxpdHlcIl0gPSBcImhpZGRlblwiO1xuICAgICAgICB0aGlzLl9sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcGxheWluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9sb2FkZWRtZXRhID0gZmFsc2U7XG5cbiAgICAgICAgc291cmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNvdXJjZVwiKTtcbiAgICAgICAgc291cmNlLnNyYyA9IHBhdGg7XG4gICAgICAgIHZpZGVvLmFwcGVuZENoaWxkKHNvdXJjZSk7XG5cbiAgICAgICAgZXh0bmFtZSA9IGNjLnBhdGguZXh0bmFtZShwYXRoKTtcbiAgICAgICAgbGV0IHBvbHlmaWxsID0gVmlkZW9QbGF5ZXJJbXBsLl9wb2x5ZmlsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2x5ZmlsbC5jYW5QbGF5VHlwZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGV4dG5hbWUgIT09IHBvbHlmaWxsLmNhblBsYXlUeXBlW2ldKSB7XG4gICAgICAgICAgICAgICAgc291cmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNvdXJjZVwiKTtcbiAgICAgICAgICAgICAgICBzb3VyY2Uuc3JjID0gcGF0aC5yZXBsYWNlKGV4dG5hbWUsIHBvbHlmaWxsLmNhblBsYXlUeXBlW2ldKTtcbiAgICAgICAgICAgICAgICB2aWRlby5hcHBlbmRDaGlsZChzb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldFVSTDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91cmw7XG4gICAgfSxcblxuICAgIHBsYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHZpZGVvID0gdGhpcy5fdmlkZW87XG4gICAgICAgIGlmICghdmlkZW8gfHwgIXRoaXMuX3Zpc2libGUgfHwgdGhpcy5fcGxheWluZykgcmV0dXJuO1xuXG4gICAgICAgIGlmIChWaWRlb1BsYXllckltcGwuX3BvbHlmaWxsLmF1dG9wbGF5QWZ0ZXJPcGVyYXRpb24pIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgIH0sIDIwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwYXVzZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgdmlkZW8gPSB0aGlzLl92aWRlbztcbiAgICAgICAgaWYgKCF0aGlzLl9wbGF5aW5nIHx8ICF2aWRlbykgcmV0dXJuO1xuICAgICAgICB2aWRlby5wYXVzZSgpO1xuICAgIH0sXG5cbiAgICByZXN1bWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHZpZGVvID0gdGhpcy5fdmlkZW87XG4gICAgICAgIGlmICghdmlkZW8gfHwgIXRoaXMuX3Zpc2libGUpIHJldHVybjtcbiAgICAgICAgdGhpcy5faWdub3JlUGF1c2UgPSB0cnVlO1xuICAgICAgICB2aWRlby5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgIHZpZGVvLnBhdXNlKCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudChWaWRlb1BsYXllckltcGwuRXZlbnRUeXBlLlNUT1BQRUQpO1xuICAgICAgICAgICAgdGhpcy5faWdub3JlUGF1c2UgPSBmYWxzZTtcbiAgICAgICAgfS5iaW5kKHRoaXMpLCAwKTtcblxuICAgIH0sXG5cbiAgICBzZXRWb2x1bWU6IGZ1bmN0aW9uICh2b2x1bWUpIHtcbiAgICAgICAgbGV0IHZpZGVvID0gdGhpcy5fdmlkZW87XG4gICAgICAgIGlmICh2aWRlbykge1xuICAgICAgICAgICAgdmlkZW8udm9sdW1lID0gdm9sdW1lO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNlZWtUbzogZnVuY3Rpb24gKHRpbWUpIHtcbiAgICAgICAgbGV0IHZpZGVvID0gdGhpcy5fdmlkZW87XG4gICAgICAgIGlmICghdmlkZW8pIHJldHVybjtcblxuICAgICAgICBpZiAodGhpcy5fbG9hZGVkKSB7XG4gICAgICAgICAgICB2aWRlby5jdXJyZW50VGltZSA9IHRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgY2IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSB0aW1lO1xuICAgICAgICAgICAgICAgIHZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoVmlkZW9QbGF5ZXJJbXBsLl9wb2x5ZmlsbC5ldmVudCwgY2IpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoVmlkZW9QbGF5ZXJJbXBsLl9wb2x5ZmlsbC5ldmVudCwgY2IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChWaWRlb1BsYXllckltcGwuX3BvbHlmaWxsLmF1dG9wbGF5QWZ0ZXJPcGVyYXRpb24gJiYgdGhpcy5pc1BsYXlpbmcoKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgfSwgMjApO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGlzUGxheWluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgdmlkZW8gPSB0aGlzLl92aWRlbztcbiAgICAgICAgaWYgKFZpZGVvUGxheWVySW1wbC5fcG9seWZpbGwuYXV0b3BsYXlBZnRlck9wZXJhdGlvbiAmJiB0aGlzLl9wbGF5aW5nKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2aWRlby5wbGF5KCk7XG4gICAgICAgICAgICB9LCAyMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYXlpbmc7XG4gICAgfSxcblxuICAgIGR1cmF0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCB2aWRlbyA9IHRoaXMuX3ZpZGVvO1xuICAgICAgICBsZXQgZHVyYXRpb24gPSAtMTtcbiAgICAgICAgaWYgKCF2aWRlbykgcmV0dXJuIGR1cmF0aW9uO1xuXG4gICAgICAgIGR1cmF0aW9uID0gdmlkZW8uZHVyYXRpb247XG4gICAgICAgIGlmIChkdXJhdGlvbiA8PSAwKSB7XG4gICAgICAgICAgICBjYy5sb2dJRCg3NzAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkdXJhdGlvbjtcbiAgICB9LFxuXG4gICAgY3VycmVudFRpbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgdmlkZW8gPSB0aGlzLl92aWRlbztcbiAgICAgICAgaWYgKCF2aWRlbykgcmV0dXJuIC0xO1xuXG4gICAgICAgIHJldHVybiB2aWRlby5jdXJyZW50VGltZTtcbiAgICB9LFxuXG4gICAgc2V0S2VlcEFzcGVjdFJhdGlvRW5hYmxlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2MubG9nSUQoNzcwMCk7XG4gICAgfSxcblxuICAgIGlzS2VlcEFzcGVjdFJhdGlvRW5hYmxlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgX3RvZ2dsZUZ1bGxzY3JlZW46IGZ1bmN0aW9uIChlbmFibGUpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzLCB2aWRlbyA9IHRoaXMuX3ZpZGVvO1xuICAgICAgICBpZiAoIXZpZGVvKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNb25pdG9yIHZpZGVvIGVudHJ5IGFuZCBleGl0IGZ1bGwtc2NyZWVuIGV2ZW50c1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGVGdWxsc2NyZWVuQ2hhbmdlIChldmVudCkge1xuICAgICAgICAgICAgbGV0IGZ1bGxzY3JlZW5FbGVtZW50ID0gc3lzLmJyb3dzZXJUeXBlID09PSBzeXMuQlJPV1NFUl9UWVBFX0lFID8gZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCA6IGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50O1xuICAgICAgICAgICAgc2VsZi5fZnVsbFNjcmVlbkVuYWJsZWQgPSAgKGZ1bGxzY3JlZW5FbGVtZW50ID09PSB2aWRlbyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlRnVsbFNjcmVlbkVycm9yIChldmVudCkge1xuICAgICAgICAgICAgc2VsZi5fZnVsbFNjcmVlbkVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmFibGUpIHtcbiAgICAgICAgICAgIGlmIChzeXMuYnJvd3NlclR5cGUgPT09IHN5cy5CUk9XU0VSX1RZUEVfSUUpIHtcbiAgICAgICAgICAgICAgICAvLyBmaXggSUUgZnVsbCBzY3JlZW4gY29udGVudCBpcyBub3QgY2VudGVyZWRcbiAgICAgICAgICAgICAgICB2aWRlby5zdHlsZVsndHJhbnNmb3JtJ10gPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNjLnNjcmVlbi5yZXF1ZXN0RnVsbFNjcmVlbih2aWRlbywgaGFuZGxlRnVsbHNjcmVlbkNoYW5nZSwgaGFuZGxlRnVsbFNjcmVlbkVycm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChjYy5zY3JlZW4uZnVsbFNjcmVlbigpKSB7XG4gICAgICAgICAgICBjYy5zY3JlZW4uZXhpdEZ1bGxTY3JlZW4odmlkZW8pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldFN0YXlPbkJvdHRvbTogZnVuY3Rpb24gKGVuYWJsZWQpIHtcbiAgICAgICAgdGhpcy5fc3RheU9uQm90dG9tID0gZW5hYmxlZDtcbiAgICAgICAgaWYgKCF0aGlzLl92aWRlbykgcmV0dXJuO1xuICAgICAgICB0aGlzLl92aWRlby5zdHlsZVsnei1pbmRleCddID0gZW5hYmxlZCA/IG1hY3JvLk1JTl9aSU5ERVggOiAwO1xuICAgIH0sXG5cbiAgICBzZXRGdWxsU2NyZWVuRW5hYmxlZDogZnVuY3Rpb24gKGVuYWJsZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xvYWRlZG1ldGEgJiYgZW5hYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl93YWl0aW5nRnVsbHNjcmVlbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90b2dnbGVGdWxsc2NyZWVuKGVuYWJsZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNGdWxsU2NyZWVuRW5hYmxlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZnVsbFNjcmVlbkVuYWJsZWQ7XG4gICAgfSxcblxuICAgIHNldEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uIChldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fRXZlbnRMaXN0W2V2ZW50XSA9IGNhbGxiYWNrO1xuICAgIH0sXG5cbiAgICByZW1vdmVFdmVudExpc3RlbmVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5fRXZlbnRMaXN0W2V2ZW50XSA9IG51bGw7XG4gICAgfSxcblxuICAgIF9kaXNwYXRjaEV2ZW50OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgbGV0IGNhbGxiYWNrID0gdGhpcy5fRXZlbnRMaXN0W2V2ZW50XTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLCB0aGlzLl92aWRlby5zcmMpO1xuICAgIH0sXG5cbiAgICBvblBsYXlFdmVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgY2FsbGJhY2sgPSB0aGlzLl9FdmVudExpc3RbVmlkZW9QbGF5ZXJJbXBsLkV2ZW50VHlwZS5QTEFZSU5HXTtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLCB0aGlzLl92aWRlby5zcmMpO1xuICAgIH0sXG5cbiAgICBlbmFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGxpc3QgPSBWaWRlb1BsYXllckltcGwuZWxlbWVudHM7XG4gICAgICAgIGlmIChsaXN0LmluZGV4T2YodGhpcykgPT09IC0xKVxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMpO1xuICAgICAgICB0aGlzLnNldFZpc2libGUodHJ1ZSk7XG4gICAgfSxcblxuICAgIGRpc2FibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGxpc3QgPSBWaWRlb1BsYXllckltcGwuZWxlbWVudHM7XG4gICAgICAgIGxldCBpbmRleCA9IGxpc3QuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSlcbiAgICAgICAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICB9LFxuXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVEb20oKTtcbiAgICB9LFxuXG4gICAgc2V0VmlzaWJsZTogZnVuY3Rpb24gKHZpc2libGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Zpc2libGUgIT09IHZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3Zpc2libGUgPSAhIXZpc2libGU7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVWaXNpYmlsaXR5KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlTWF0cml4IChub2RlKSB7XG4gICAgICAgIGlmICghdGhpcy5fdmlkZW8gfHwgIXRoaXMuX3Zpc2libGUgfHwgdGhpcy5fZnVsbFNjcmVlbkVuYWJsZWQpIHJldHVybjtcblxuICAgICAgICBub2RlLmdldFdvcmxkTWF0cml4KF9tYXQ0X3RlbXApO1xuXG4gICAgICAgIGxldCByZW5kZXJDYW1lcmEgPSBjYy5DYW1lcmEuX2ZpbmRSZW5kZXJlckNhbWVyYShub2RlKTtcbiAgICAgICAgaWYgKHJlbmRlckNhbWVyYSkge1xuICAgICAgICAgICAgcmVuZGVyQ2FtZXJhLndvcmxkTWF0cml4VG9TY3JlZW4oX21hdDRfdGVtcCwgX21hdDRfdGVtcCwgY2MuZ2FtZS5jYW52YXMud2lkdGgsIGNjLmdhbWUuY2FudmFzLmhlaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgX21hdDRfdGVtcG0gPSBfbWF0NF90ZW1wLm07XG4gICAgICAgIGlmICghdGhpcy5fZm9yY2VVcGRhdGUgJiZcbiAgICAgICAgICAgIHRoaXMuX20wMCA9PT0gX21hdDRfdGVtcG1bMF0gJiYgdGhpcy5fbTAxID09PSBfbWF0NF90ZW1wbVsxXSAmJlxuICAgICAgICAgICAgdGhpcy5fbTA0ID09PSBfbWF0NF90ZW1wbVs0XSAmJiB0aGlzLl9tMDUgPT09IF9tYXQ0X3RlbXBtWzVdICYmXG4gICAgICAgICAgICB0aGlzLl9tMTIgPT09IF9tYXQ0X3RlbXBtWzEyXSAmJiB0aGlzLl9tMTMgPT09IF9tYXQ0X3RlbXBtWzEzXSAmJlxuICAgICAgICAgICAgdGhpcy5fdyA9PT0gbm9kZS5fY29udGVudFNpemUud2lkdGggJiYgdGhpcy5faCA9PT0gbm9kZS5fY29udGVudFNpemUuaGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgbWF0cml4IGNhY2hlXG4gICAgICAgIHRoaXMuX20wMCA9IF9tYXQ0X3RlbXBtWzBdO1xuICAgICAgICB0aGlzLl9tMDEgPSBfbWF0NF90ZW1wbVsxXTtcbiAgICAgICAgdGhpcy5fbTA0ID0gX21hdDRfdGVtcG1bNF07XG4gICAgICAgIHRoaXMuX20wNSA9IF9tYXQ0X3RlbXBtWzVdO1xuICAgICAgICB0aGlzLl9tMTIgPSBfbWF0NF90ZW1wbVsxMl07XG4gICAgICAgIHRoaXMuX20xMyA9IF9tYXQ0X3RlbXBtWzEzXTtcbiAgICAgICAgdGhpcy5fdyA9IG5vZGUuX2NvbnRlbnRTaXplLndpZHRoO1xuICAgICAgICB0aGlzLl9oID0gbm9kZS5fY29udGVudFNpemUuaGVpZ2h0O1xuXG4gICAgICAgIGxldCBkcHIgPSBjYy52aWV3Ll9kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICBsZXQgc2NhbGVYID0gMSAvIGRwcjtcbiAgICAgICAgbGV0IHNjYWxlWSA9IDEgLyBkcHI7XG5cbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGNjLmdhbWUuY29udGFpbmVyO1xuICAgICAgICBsZXQgYSA9IF9tYXQ0X3RlbXBtWzBdICogc2NhbGVYLCBiID0gX21hdDRfdGVtcG1bMV0sIGMgPSBfbWF0NF90ZW1wbVs0XSwgZCA9IF9tYXQ0X3RlbXBtWzVdICogc2NhbGVZO1xuXG4gICAgICAgIGxldCBvZmZzZXRYID0gY29udGFpbmVyICYmIGNvbnRhaW5lci5zdHlsZS5wYWRkaW5nTGVmdCA/IHBhcnNlSW50KGNvbnRhaW5lci5zdHlsZS5wYWRkaW5nTGVmdCkgOiAwO1xuICAgICAgICBsZXQgb2Zmc2V0WSA9IGNvbnRhaW5lciAmJiBjb250YWluZXIuc3R5bGUucGFkZGluZ0JvdHRvbSA/IHBhcnNlSW50KGNvbnRhaW5lci5zdHlsZS5wYWRkaW5nQm90dG9tKSA6IDA7XG4gICAgICAgIGxldCB3LCBoO1xuICAgICAgICBpZiAoVmlkZW9QbGF5ZXJJbXBsLl9wb2x5ZmlsbC56b29tSW52YWxpZCkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSh0aGlzLl93ICogYSwgdGhpcy5faCAqIGQpO1xuICAgICAgICAgICAgYSA9IDE7XG4gICAgICAgICAgICBkID0gMTtcbiAgICAgICAgICAgIHcgPSB0aGlzLl93ICogc2NhbGVYO1xuICAgICAgICAgICAgaCA9IHRoaXMuX2ggKiBzY2FsZVk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3ID0gdGhpcy5fdyAqIHNjYWxlWDtcbiAgICAgICAgICAgIGggPSB0aGlzLl9oICogc2NhbGVZO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSh0aGlzLl93LCB0aGlzLl9oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhcHB4ID0gKHcgKiBfbWF0NF90ZW1wbVswXSkgKiBub2RlLl9hbmNob3JQb2ludC54O1xuICAgICAgICBsZXQgYXBweSA9IChoICogX21hdDRfdGVtcG1bNV0pICogbm9kZS5fYW5jaG9yUG9pbnQueTtcblxuXG4gICAgICAgIGxldCB0eCA9IF9tYXQ0X3RlbXBtWzEyXSAqIHNjYWxlWCAtIGFwcHggKyBvZmZzZXRYLCB0eSA9IF9tYXQ0X3RlbXBtWzEzXSAqIHNjYWxlWSAtIGFwcHkgKyBvZmZzZXRZO1xuXG4gICAgICAgIGxldCBtYXRyaXggPSBcIm1hdHJpeChcIiArIGEgKyBcIixcIiArIC1iICsgXCIsXCIgKyAtYyArIFwiLFwiICsgZCArIFwiLFwiICsgdHggKyBcIixcIiArIC10eSArIFwiKVwiO1xuICAgICAgICB0aGlzLl92aWRlby5zdHlsZVsndHJhbnNmb3JtJ10gPSBtYXRyaXg7XG4gICAgICAgIHRoaXMuX3ZpZGVvLnN0eWxlWyctd2Via2l0LXRyYW5zZm9ybSddID0gbWF0cml4O1xuICAgICAgICB0aGlzLl92aWRlby5zdHlsZVsndHJhbnNmb3JtLW9yaWdpbiddID0gJzBweCAxMDAlIDBweCc7XG4gICAgICAgIHRoaXMuX3ZpZGVvLnN0eWxlWyctd2Via2l0LXRyYW5zZm9ybS1vcmlnaW4nXSA9ICcwcHggMTAwJSAwcHgnO1xuXG4gICAgICAgIC8vIFRPRE86IG1vdmUgaW50byB3ZWIgYWRhcHRlclxuICAgICAgICAvLyB2aWRlbyBzdHlsZSB3b3VsZCBjaGFuZ2Ugd2hlbiBlbnRlciBmdWxsc2NyZWVuIG9uIElFXG4gICAgICAgIC8vIHRoZXJlIGlzIG5vIHdheSB0byBhZGQgZnVsbHNjcmVlbmNoYW5nZSBldmVudCBsaXN0ZW5lcnMgb24gSUUgc28gdGhhdCB3ZSBjYW4gcmVzdG9yZSB0aGUgY2FjaGVkIHZpZGVvIHN0eWxlXG4gICAgICAgIGlmIChzeXMuYnJvd3NlclR5cGUgIT09IHN5cy5CUk9XU0VSX1RZUEVfSUUpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvcmNlVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuVmlkZW9QbGF5ZXJJbXBsLkV2ZW50VHlwZSA9IHtcbiAgICBOT05FOiAtMSxcbiAgICBQTEFZSU5HOiAwLFxuICAgIFBBVVNFRDogMSxcbiAgICBTVE9QUEVEOiAyLFxuICAgIENPTVBMRVRFRDogMyxcbiAgICBNRVRBX0xPQURFRDogNCxcbiAgICBDTElDS0VEOiA1LFxuICAgIFJFQURZX1RPX1BMQVk6IDZcbn07XG5cbi8vIHZpZGVvIOmYn+WIl++8jOaJgOaciSB2aWRvZSDlnKggb25FbnRlciDnmoTml7blgJnpg73kvJrmj5LlhaXov5nkuKrpmJ/liJdcblZpZGVvUGxheWVySW1wbC5lbGVtZW50cyA9IFtdO1xuLy8gdmlkZW8g5ZyoIGdhbWVfaGlkZSDkuovku7bkuK3ooqvoh6rliqjmmoLlgZznmoTpmJ/liJfvvIznlKjkuo7lm57lpI3nmoTml7blgJnph43mlrDlvIDlp4vmkq3mlL5cblZpZGVvUGxheWVySW1wbC5wYXVzZUVsZW1lbnRzID0gW107XG5cbmNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9ISURFLCBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGxpc3QgPSBWaWRlb1BsYXllckltcGwuZWxlbWVudHM7XG4gICAgZm9yIChsZXQgZWxlbWVudCwgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGVsZW1lbnQgPSBsaXN0W2ldO1xuICAgICAgICBpZiAoZWxlbWVudC5pc1BsYXlpbmcoKSkge1xuICAgICAgICAgICAgZWxlbWVudC5wYXVzZSgpO1xuICAgICAgICAgICAgVmlkZW9QbGF5ZXJJbXBsLnBhdXNlRWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfU0hPVywgZnVuY3Rpb24gKCkge1xuICAgIGxldCBsaXN0ID0gVmlkZW9QbGF5ZXJJbXBsLnBhdXNlRWxlbWVudHM7XG4gICAgbGV0IGVsZW1lbnQgPSBsaXN0LnBvcCgpO1xuICAgIHdoaWxlIChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQucGxheSgpO1xuICAgICAgICBlbGVtZW50ID0gbGlzdC5wb3AoKTtcbiAgICB9XG59KTtcblxuXG4vKipcbiAqIEFkYXB0ZXIgdmFyaW91cyBtYWNoaW5lc1xuICogQGRldmljZVBpeGVsUmF0aW8gV2hldGhlciB5b3UgbmVlZCB0byBjb25zaWRlciBkZXZpY2VQaXhlbFJhdGlvIGNhbGN1bGF0ZWQgcG9zaXRpb25cbiAqIEBldmVudCBUbyBnZXQgdGhlIGRhdGEgdXNpbmcgZXZlbnRzXG4gKi9cblZpZGVvUGxheWVySW1wbC5fcG9seWZpbGwgPSB7XG4gICAgZGV2aWNlUGl4ZWxSYXRpbzogZmFsc2UsXG4gICAgZXZlbnQ6IFwiY2FucGxheVwiLFxuICAgIGNhblBsYXlUeXBlOiBbXVxufTtcblxuLyoqXG4gKiBTb21lIG9sZCBicm93c2VyIG9ubHkgc3VwcG9ydHMgVGhlb3JhIGVuY29kZSB2aWRlb1xuICogQnV0IG5hdGl2ZSBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgZW5jb2RlLFxuICogc28gaXQgaXMgYmVzdCB0byBwcm92aWRlIG1wNCBhbmQgd2VibSBvciBvZ3YgZmlsZVxuICovXG5cbi8vIFRPRE86IGFkYXB0IHd4IHZpZGVvIHBsYXllclxuLy8gaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9jb2Nvcy1jcmVhdG9yLzJkLXRhc2tzL2lzc3Vlcy8xMzY0XG5sZXQgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpZGVvXCIpO1xuaWYgKGRvbS5jYW5QbGF5VHlwZSkge1xuICAgIGlmIChkb20uY2FuUGxheVR5cGUoXCJ2aWRlby9vZ2dcIikpIHtcbiAgICAgICAgVmlkZW9QbGF5ZXJJbXBsLl9wb2x5ZmlsbC5jYW5QbGF5VHlwZS5wdXNoKFwiLm9nZ1wiKTtcbiAgICAgICAgVmlkZW9QbGF5ZXJJbXBsLl9wb2x5ZmlsbC5jYW5QbGF5VHlwZS5wdXNoKFwiLm9ndlwiKTtcbiAgICB9XG4gICAgaWYgKGRvbS5jYW5QbGF5VHlwZShcInZpZGVvL21wNFwiKSkge1xuICAgICAgICBWaWRlb1BsYXllckltcGwuX3BvbHlmaWxsLmNhblBsYXlUeXBlLnB1c2goXCIubXA0XCIpO1xuICAgIH1cbiAgICBpZiAoZG9tLmNhblBsYXlUeXBlKFwidmlkZW8vd2VibVwiKSkge1xuICAgICAgICBWaWRlb1BsYXllckltcGwuX3BvbHlmaWxsLmNhblBsYXlUeXBlLnB1c2goXCIud2VibVwiKTtcbiAgICB9XG59XG5cbmlmIChzeXMuYnJvd3NlclR5cGUgPT09IHN5cy5CUk9XU0VSX1RZUEVfRklSRUZPWCkge1xuICAgIFZpZGVvUGxheWVySW1wbC5fcG9seWZpbGwuYXV0b3BsYXlBZnRlck9wZXJhdGlvbiA9IHRydWU7XG59XG5cbmlmIChcbiAgICBzeXMuT1NfQU5EUk9JRCA9PT0gc3lzLm9zICYmIChcbiAgICBzeXMuYnJvd3NlclR5cGUgPT09IHN5cy5CUk9XU0VSX1RZUEVfU09VR09VIHx8XG4gICAgc3lzLmJyb3dzZXJUeXBlID09PSBzeXMuQlJPV1NFUl9UWVBFXzM2MFxuKVxuKSB7XG4gICAgVmlkZW9QbGF5ZXJJbXBsLl9wb2x5ZmlsbC56b29tSW52YWxpZCA9IHRydWU7XG59XG5cbmxldCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbnN0eWxlLmlubmVySFRNTCA9IFwiLmNvY29zVmlkZW86LW1vei1mdWxsLXNjcmVlbnt0cmFuc2Zvcm06bWF0cml4KDEsMCwwLDEsMCwwKSAhaW1wb3J0YW50O31cIiArXG4gICAgXCIuY29jb3NWaWRlbzpmdWxsLXNjcmVlbnt0cmFuc2Zvcm06bWF0cml4KDEsMCwwLDEsMCwwKSAhaW1wb3J0YW50O31cIiArXG4gICAgXCIuY29jb3NWaWRlbzotd2Via2l0LWZ1bGwtc2NyZWVue3RyYW5zZm9ybTptYXRyaXgoMSwwLDAsMSwwLDApICFpbXBvcnRhbnQ7fVwiO1xuZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVmlkZW9QbGF5ZXJJbXBsO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=