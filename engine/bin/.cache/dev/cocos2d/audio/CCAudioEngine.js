
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/audio/CCAudioEngine.js';
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
var Audio = require('./CCAudio');

var AudioClip = require('../core/assets/CCAudioClip');

var js = cc.js;
var _instanceId = 0;

var _id2audio = js.createMap(true);

var _url2id = {};
var _audioPool = [];

var recycleAudio = function recycleAudio(audio) {
  // In case repeatly recycle audio when users call audio.stop when audio finish playing
  if (!audio._shouldRecycleOnEnded) {
    return;
  }

  audio._finishCallback = null;
  audio.off('ended');
  audio.off('stop');
  audio.src = null; // In case repeatly recycle audio

  if (!_audioPool.includes(audio)) {
    if (_audioPool.length < 32) {
      _audioPool.push(audio);
    } else {
      audio.destroy();
    }
  }

  audio._shouldRecycleOnEnded = false;
};

var getAudioFromPath = function getAudioFromPath(path) {
  var id = _instanceId++;
  var list = _url2id[path];

  if (!list) {
    list = _url2id[path] = [];
  }

  if (audioEngine._maxAudioInstance <= list.length) {
    var oldId = list.shift();
    var oldAudio = getAudioFromId(oldId); // Stop will recycle audio automatically by event callback

    oldAudio.stop();
  }

  var audio = _audioPool.pop() || new Audio();

  var callback = function callback() {
    var audioInList = getAudioFromId(this.id);

    if (audioInList) {
      delete _id2audio[this.id];
      var index = list.indexOf(this.id);
      cc.js.array.fastRemoveAt(list, index);
    }

    recycleAudio(this);
  };

  audio.on('ended', function () {
    if (this._finishCallback) {
      this._finishCallback();
    }

    if (!this.getLoop()) {
      callback.call(this);
    }
  }, audio);
  audio.on('stop', callback, audio);
  audio.id = id;
  _id2audio[id] = audio;
  list.push(id);
  return audio;
};

var getAudioFromId = function getAudioFromId(id) {
  return _id2audio[id];
};

var handleVolume = function handleVolume(volume) {
  if (volume === undefined) {
    // set default volume as 1
    volume = 1;
  } else if (typeof volume === 'string') {
    volume = Number.parseFloat(volume);
  }

  return volume;
};
/**
 * !#en cc.audioEngine is the singleton object, it provide simple audio APIs.
 * !#zh
 * cc.audioengine是单例对象。<br/>
 * 主要用来播放音频，播放的时候会返回一个 audioID，之后都可以通过这个 audioID 来操作这个音频对象。<br/>
 * 不使用的时候，请使用 cc.audioEngine.uncache(filePath); 进行资源释放 <br/>
 * 注意：<br/>
 * 在 Android 系统浏览器上，不同浏览器，不同版本的效果不尽相同。<br/>
 * 比如说：大多数浏览器都需要用户物理交互才可以开始播放音效，有一些不支持 WebAudio，<br/>
 * 有一些不支持多音轨播放。总之如果对音乐依赖比较强，请做尽可能多的测试。
 * @class audioEngine
 * @static
 */


var audioEngine = {
  AudioState: Audio.State,
  _maxAudioInstance: 24,
  _id2audio: _id2audio,

  /**
   * !#en Play audio.
   * !#zh 播放音频
   * @method play
   * @param {AudioClip} clip - The audio clip to play.
   * @param {Boolean} loop - Whether the music loop or not.
   * @param {Number} volume - Volume size.
   * @return {Number} audioId
   * @example
   * cc.resources.load(path, cc.AudioClip, null, function (err, clip) {
   *     var audioID = cc.audioEngine.play(clip, false, 0.5);
   * });
   */
  play: function play(clip, loop, volume) {
    if (!(clip instanceof AudioClip)) {
      return cc.error('Wrong type of AudioClip.');
    }

    var path = clip.nativeUrl;
    var audio = getAudioFromPath(path);
    audio.src = clip;

    clip._ensureLoaded();

    audio._shouldRecycleOnEnded = true;
    audio.setLoop(loop || false);
    volume = handleVolume(volume);
    audio.setVolume(volume);
    audio.play();
    return audio.id;
  },

  /**
   * !#en Set audio loop.
   * !#zh 设置音频是否循环。
   * @method setLoop
   * @param {Number} audioID - audio id.
   * @param {Boolean} loop - Whether cycle.
   * @example
   * cc.audioEngine.setLoop(id, true);
   */
  setLoop: function setLoop(audioID, loop) {
    var audio = getAudioFromId(audioID);
    if (!audio || !audio.setLoop) return;
    audio.setLoop(loop);
  },

  /**
   * !#en Get audio cycle state.
   * !#zh 获取音频的循环状态。
   * @method isLoop
   * @param {Number} audioID - audio id.
   * @return {Boolean} Whether cycle.
   * @example
   * cc.audioEngine.isLoop(id);
   */
  isLoop: function isLoop(audioID) {
    var audio = getAudioFromId(audioID);
    if (!audio || !audio.getLoop) return false;
    return audio.getLoop();
  },

  /**
   * !#en Set the volume of audio.
   * !#zh 设置音量（0.0 ~ 1.0）。
   * @method setVolume
   * @param {Number} audioID - audio id.
   * @param {Number} volume - Volume must be in 0.0~1.0 .
   * @example
   * cc.audioEngine.setVolume(id, 0.5);
   */
  setVolume: function setVolume(audioID, volume) {
    var audio = getAudioFromId(audioID);

    if (audio) {
      audio.setVolume(volume);
    }
  },

  /**
   * !#en The volume of the music max value is 1.0,the min value is 0.0 .
   * !#zh 获取音量（0.0 ~ 1.0）。
   * @method getVolume
   * @param {Number} audioID - audio id.
   * @return {Number}
   * @example
   * var volume = cc.audioEngine.getVolume(id);
   */
  getVolume: function getVolume(audioID) {
    var audio = getAudioFromId(audioID);
    return audio ? audio.getVolume() : 1;
  },

  /**
   * !#en Set current time
   * !#zh 设置当前的音频时间。
   * @method setCurrentTime
   * @param {Number} audioID - audio id.
   * @param {Number} sec - current time.
   * @return {Boolean}
   * @example
   * cc.audioEngine.setCurrentTime(id, 2);
   */
  setCurrentTime: function setCurrentTime(audioID, sec) {
    var audio = getAudioFromId(audioID);

    if (audio) {
      audio.setCurrentTime(sec);
      return true;
    } else {
      return false;
    }
  },

  /**
   * !#en Get current time
   * !#zh 获取当前的音频播放时间。
   * @method getCurrentTime
   * @param {Number} audioID - audio id.
   * @return {Number} audio current time.
   * @example
   * var time = cc.audioEngine.getCurrentTime(id);
   */
  getCurrentTime: function getCurrentTime(audioID) {
    var audio = getAudioFromId(audioID);
    return audio ? audio.getCurrentTime() : 0;
  },

  /**
   * !#en Get audio duration
   * !#zh 获取音频总时长。
   * @method getDuration
   * @param {Number} audioID - audio id.
   * @return {Number} audio duration.
   * @example
   * var time = cc.audioEngine.getDuration(id);
   */
  getDuration: function getDuration(audioID) {
    var audio = getAudioFromId(audioID);
    return audio ? audio.getDuration() : 0;
  },

  /**
   * !#en Get audio state
   * !#zh 获取音频状态。
   * @method getState
   * @param {Number} audioID - audio id.
   * @return {audioEngine.AudioState} audio duration.
   * @example
   * var state = cc.audioEngine.getState(id);
   */
  getState: function getState(audioID) {
    var audio = getAudioFromId(audioID);
    return audio ? audio.getState() : this.AudioState.ERROR;
  },

  /**
   * !#en Set Audio finish callback
   * !#zh 设置一个音频结束后的回调
   * @method setFinishCallback
   * @param {Number} audioID - audio id.
   * @param {Function} callback - loaded callback.
   * @example
   * cc.audioEngine.setFinishCallback(id, function () {});
   */
  setFinishCallback: function setFinishCallback(audioID, callback) {
    var audio = getAudioFromId(audioID);
    if (!audio) return;
    audio._finishCallback = callback;
  },

  /**
   * !#en Pause playing audio.
   * !#zh 暂停正在播放音频。
   * @method pause
   * @param {Number} audioID - The return value of function play.
   * @example
   * cc.audioEngine.pause(audioID);
   */
  pause: function pause(audioID) {
    var audio = getAudioFromId(audioID);

    if (audio) {
      audio.pause();
      return true;
    } else {
      return false;
    }
  },
  _pauseIDCache: [],

  /**
   * !#en Pause all playing audio
   * !#zh 暂停现在正在播放的所有音频。
   * @method pauseAll
   * @example
   * cc.audioEngine.pauseAll();
   */
  pauseAll: function pauseAll() {
    for (var id in _id2audio) {
      var audio = _id2audio[id];
      var state = audio.getState();

      if (state === Audio.State.PLAYING) {
        this._pauseIDCache.push(id);

        audio.pause();
      }
    }
  },

  /**
   * !#en Resume playing audio.
   * !#zh 恢复播放指定的音频。
   * @method resume
   * @param {Number} audioID - The return value of function play.
   * @example
   * cc.audioEngine.resume(audioID);
   */
  resume: function resume(audioID) {
    var audio = getAudioFromId(audioID);

    if (audio) {
      audio.resume();
    }
  },

  /**
   * !#en Resume all playing audio.
   * !#zh 恢复播放所有之前暂停的所有音频。
   * @method resumeAll
   * @example
   * cc.audioEngine.resumeAll();
   */
  resumeAll: function resumeAll() {
    for (var i = 0; i < this._pauseIDCache.length; ++i) {
      var id = this._pauseIDCache[i];
      var audio = getAudioFromId(id);
      if (audio) audio.resume();
    }

    this._pauseIDCache.length = 0;
  },

  /**
   * !#en Stop playing audio.
   * !#zh 停止播放指定音频。
   * @method stop
   * @param {Number} audioID - The return value of function play.
   * @example
   * cc.audioEngine.stop(audioID);
   */
  stop: function stop(audioID) {
    var audio = getAudioFromId(audioID);

    if (audio) {
      // Stop will recycle audio automatically by event callback
      audio.stop();
      return true;
    } else {
      return false;
    }
  },

  /**
   * !#en Stop all playing audio.
   * !#zh 停止正在播放的所有音频。
   * @method stopAll
   * @example
   * cc.audioEngine.stopAll();
   */
  stopAll: function stopAll() {
    for (var id in _id2audio) {
      var audio = _id2audio[id];

      if (audio) {
        // Stop will recycle audio automatically by event callback
        audio.stop();
      }
    }
  },

  /**
   * !#en Set up an audio can generate a few examples.
   * !#zh 设置一个音频可以设置几个实例
   * @method setMaxAudioInstance
   * @param {Number} num - a number of instances to be created from within an audio
   * @example
   * cc.audioEngine.setMaxAudioInstance(20);
   * @deprecated since v2.4.0
   */
  setMaxAudioInstance: function setMaxAudioInstance(num) {
    if (CC_DEBUG) {
      cc.warn('Since v2.4.0, maxAudioInstance has become a read only property.\n' + 'audioEngine.setMaxAudioInstance() method will be removed in the future');
    }
  },

  /**
   * !#en Getting audio can produce several examples.
   * !#zh 获取一个音频可以设置几个实例
   * @method getMaxAudioInstance
   * @return {Number} max number of instances to be created from within an audio
   * @example
   * cc.audioEngine.getMaxAudioInstance();
   */
  getMaxAudioInstance: function getMaxAudioInstance() {
    return this._maxAudioInstance;
  },

  /**
   * !#en Unload the preloaded audio from internal buffer.
   * !#zh 卸载预加载的音频。
   * @method uncache
   * @param {AudioClip} clip
   * @example
   * cc.audioEngine.uncache(filePath);
   */
  uncache: function uncache(clip) {
    var filePath = clip;

    if (typeof clip === 'string') {
      // backward compatibility since 1.10
      cc.warnID(8401, 'cc.audioEngine', 'cc.AudioClip', 'AudioClip', 'cc.AudioClip', 'audio');
      filePath = clip;
    } else {
      if (!clip) {
        return;
      }

      filePath = clip.nativeUrl;
    }

    var list = _url2id[filePath];
    if (!list) return;

    while (list.length > 0) {
      var id = list.pop();
      var audio = _id2audio[id];

      if (audio) {
        // Stop will recycle audio automatically by event callback
        audio.stop();
        delete _id2audio[id];
      }
    }
  },

  /**
   * !#en Unload all audio from internal buffer.
   * !#zh 卸载所有音频。
   * @method uncacheAll
   * @example
   * cc.audioEngine.uncacheAll();
   */
  uncacheAll: function uncacheAll() {
    this.stopAll();
    var audio;

    for (var id in _id2audio) {
      audio = _id2audio[id];

      if (audio) {
        audio.destroy();
      }
    }

    while (audio = _audioPool.pop()) {
      audio.destroy();
    }

    _id2audio = js.createMap(true);
    _url2id = {};
  },
  _breakCache: null,
  _break: function _break() {
    this._breakCache = [];

    for (var id in _id2audio) {
      var audio = _id2audio[id];
      var state = audio.getState();

      if (state === Audio.State.PLAYING) {
        this._breakCache.push(id);

        audio.pause();
      }
    }
  },
  _restore: function _restore() {
    if (!this._breakCache) return;

    while (this._breakCache.length > 0) {
      var id = this._breakCache.pop();

      var audio = getAudioFromId(id);
      if (audio && audio.resume) audio.resume();
    }

    this._breakCache = null;
  },
  ///////////////////////////////
  // Classification of interface
  _music: {
    id: -1,
    loop: false,
    volume: 1
  },
  _effect: {
    volume: 1,
    pauseCache: []
  },

  /**
   * !#en Play background music
   * !#zh 播放背景音乐
   * @method playMusic
   * @param {AudioClip} clip - The audio clip to play.
   * @param {Boolean} loop - Whether the music loop or not.
   * @return {Number} audioId
   * @example
   * cc.resources.load(path, cc.AudioClip, null, function (err, clip) {
   *     var audioID = cc.audioEngine.playMusic(clip, false);
   * });
   */
  playMusic: function playMusic(clip, loop) {
    var music = this._music;
    this.stop(music.id);
    music.id = this.play(clip, loop, music.volume);
    music.loop = loop;
    return music.id;
  },

  /**
   * !#en Stop background music.
   * !#zh 停止播放背景音乐。
   * @method stopMusic
   * @example
   * cc.audioEngine.stopMusic();
   */
  stopMusic: function stopMusic() {
    this.stop(this._music.id);
  },

  /**
   * !#en Pause the background music.
   * !#zh 暂停播放背景音乐。
   * @method pauseMusic
   * @example
   * cc.audioEngine.pauseMusic();
   */
  pauseMusic: function pauseMusic() {
    this.pause(this._music.id);
    return this._music.id;
  },

  /**
   * !#en Resume playing background music.
   * !#zh 恢复播放背景音乐。
   * @method resumeMusic
   * @example
   * cc.audioEngine.resumeMusic();
   */
  resumeMusic: function resumeMusic() {
    this.resume(this._music.id);
    return this._music.id;
  },

  /**
   * !#en Get the volume(0.0 ~ 1.0).
   * !#zh 获取音量（0.0 ~ 1.0）。
   * @method getMusicVolume
   * @return {Number}
   * @example
   * var volume = cc.audioEngine.getMusicVolume();
   */
  getMusicVolume: function getMusicVolume() {
    return this._music.volume;
  },

  /**
   * !#en Set the background music volume.
   * !#zh 设置背景音乐音量（0.0 ~ 1.0）。
   * @method setMusicVolume
   * @param {Number} volume - Volume must be in 0.0~1.0.
   * @example
   * cc.audioEngine.setMusicVolume(0.5);
   */
  setMusicVolume: function setMusicVolume(volume) {
    volume = handleVolume(volume);
    var music = this._music;
    music.volume = volume;
    this.setVolume(music.id, music.volume);
    return music.volume;
  },

  /**
   * !#en Background music playing state
   * !#zh 背景音乐是否正在播放
   * @method isMusicPlaying
   * @return {Boolean}
   * @example
   * cc.audioEngine.isMusicPlaying();
   */
  isMusicPlaying: function isMusicPlaying() {
    return this.getState(this._music.id) === this.AudioState.PLAYING;
  },

  /**
   * !#en Play effect audio.
   * !#zh 播放音效
   * @method playEffect
   * @param {AudioClip} clip - The audio clip to play.
   * @param {Boolean} loop - Whether the music loop or not.
   * @return {Number} audioId
   * @example
   * cc.resources.load(path, cc.AudioClip, null, function (err, clip) {
   *     var audioID = cc.audioEngine.playEffect(clip, false);
   * });
   */
  playEffect: function playEffect(clip, loop) {
    return this.play(clip, loop || false, this._effect.volume);
  },

  /**
   * !#en Set the volume of effect audio.
   * !#zh 设置音效音量（0.0 ~ 1.0）。
   * @method setEffectsVolume
   * @param {Number} volume - Volume must be in 0.0~1.0.
   * @example
   * cc.audioEngine.setEffectsVolume(0.5);
   */
  setEffectsVolume: function setEffectsVolume(volume) {
    volume = handleVolume(volume);
    var musicId = this._music.id;
    this._effect.volume = volume;

    for (var id in _id2audio) {
      var audio = _id2audio[id];
      if (!audio || audio.id === musicId) continue;
      audioEngine.setVolume(id, volume);
    }
  },

  /**
   * !#en The volume of the effect audio max value is 1.0,the min value is 0.0 .
   * !#zh 获取音效音量（0.0 ~ 1.0）。
   * @method getEffectsVolume
   * @return {Number}
   * @example
   * var volume = cc.audioEngine.getEffectsVolume();
   */
  getEffectsVolume: function getEffectsVolume() {
    return this._effect.volume;
  },

  /**
   * !#en Pause effect audio.
   * !#zh 暂停播放音效。
   * @method pauseEffect
   * @param {Number} audioID - audio id.
   * @example
   * cc.audioEngine.pauseEffect(audioID);
   */
  pauseEffect: function pauseEffect(audioID) {
    return this.pause(audioID);
  },

  /**
   * !#en Stop playing all the sound effects.
   * !#zh 暂停播放所有音效。
   * @method pauseAllEffects
   * @example
   * cc.audioEngine.pauseAllEffects();
   */
  pauseAllEffects: function pauseAllEffects() {
    var musicId = this._music.id;
    var effect = this._effect;
    effect.pauseCache.length = 0;

    for (var id in _id2audio) {
      var audio = _id2audio[id];
      if (!audio || audio.id === musicId) continue;
      var state = audio.getState();

      if (state === this.AudioState.PLAYING) {
        effect.pauseCache.push(id);
        audio.pause();
      }
    }
  },

  /**
   * !#en Resume effect audio.
   * !#zh 恢复播放音效音频。
   * @method resumeEffect
   * @param {Number} audioID - The return value of function play.
   * @example
   * cc.audioEngine.resumeEffect(audioID);
   */
  resumeEffect: function resumeEffect(id) {
    this.resume(id);
  },

  /**
   * !#en Resume all effect audio.
   * !#zh 恢复播放所有之前暂停的音效。
   * @method resumeAllEffects
   * @example
   * cc.audioEngine.resumeAllEffects();
   */
  resumeAllEffects: function resumeAllEffects() {
    var pauseIDCache = this._effect.pauseCache;

    for (var i = 0; i < pauseIDCache.length; ++i) {
      var id = pauseIDCache[i];
      var audio = _id2audio[id];
      if (audio) audio.resume();
    }
  },

  /**
   * !#en Stop playing the effect audio.
   * !#zh 停止播放音效。
   * @method stopEffect
   * @param {Number} audioID - audio id.
   * @example
   * cc.audioEngine.stopEffect(id);
   */
  stopEffect: function stopEffect(audioID) {
    return this.stop(audioID);
  },

  /**
   * !#en Stop playing all the effects.
   * !#zh 停止播放所有音效。
   * @method stopAllEffects
   * @example
   * cc.audioEngine.stopAllEffects();
   */
  stopAllEffects: function stopAllEffects() {
    var musicId = this._music.id;

    for (var id in _id2audio) {
      var audio = _id2audio[id];
      if (!audio || audio.id === musicId) continue;
      var state = audio.getState();

      if (state === audioEngine.AudioState.PLAYING) {
        audio.stop();
      }
    }
  }
};
module.exports = cc.audioEngine = audioEngine;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9hdWRpby9DQ0F1ZGlvRW5naW5lLmpzIl0sIm5hbWVzIjpbIkF1ZGlvIiwicmVxdWlyZSIsIkF1ZGlvQ2xpcCIsImpzIiwiY2MiLCJfaW5zdGFuY2VJZCIsIl9pZDJhdWRpbyIsImNyZWF0ZU1hcCIsIl91cmwyaWQiLCJfYXVkaW9Qb29sIiwicmVjeWNsZUF1ZGlvIiwiYXVkaW8iLCJfc2hvdWxkUmVjeWNsZU9uRW5kZWQiLCJfZmluaXNoQ2FsbGJhY2siLCJvZmYiLCJzcmMiLCJpbmNsdWRlcyIsImxlbmd0aCIsInB1c2giLCJkZXN0cm95IiwiZ2V0QXVkaW9Gcm9tUGF0aCIsInBhdGgiLCJpZCIsImxpc3QiLCJhdWRpb0VuZ2luZSIsIl9tYXhBdWRpb0luc3RhbmNlIiwib2xkSWQiLCJzaGlmdCIsIm9sZEF1ZGlvIiwiZ2V0QXVkaW9Gcm9tSWQiLCJzdG9wIiwicG9wIiwiY2FsbGJhY2siLCJhdWRpb0luTGlzdCIsImluZGV4IiwiaW5kZXhPZiIsImFycmF5IiwiZmFzdFJlbW92ZUF0Iiwib24iLCJnZXRMb29wIiwiY2FsbCIsImhhbmRsZVZvbHVtZSIsInZvbHVtZSIsInVuZGVmaW5lZCIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJBdWRpb1N0YXRlIiwiU3RhdGUiLCJwbGF5IiwiY2xpcCIsImxvb3AiLCJlcnJvciIsIm5hdGl2ZVVybCIsIl9lbnN1cmVMb2FkZWQiLCJzZXRMb29wIiwic2V0Vm9sdW1lIiwiYXVkaW9JRCIsImlzTG9vcCIsImdldFZvbHVtZSIsInNldEN1cnJlbnRUaW1lIiwic2VjIiwiZ2V0Q3VycmVudFRpbWUiLCJnZXREdXJhdGlvbiIsImdldFN0YXRlIiwiRVJST1IiLCJzZXRGaW5pc2hDYWxsYmFjayIsInBhdXNlIiwiX3BhdXNlSURDYWNoZSIsInBhdXNlQWxsIiwic3RhdGUiLCJQTEFZSU5HIiwicmVzdW1lIiwicmVzdW1lQWxsIiwiaSIsInN0b3BBbGwiLCJzZXRNYXhBdWRpb0luc3RhbmNlIiwibnVtIiwiQ0NfREVCVUciLCJ3YXJuIiwiZ2V0TWF4QXVkaW9JbnN0YW5jZSIsInVuY2FjaGUiLCJmaWxlUGF0aCIsIndhcm5JRCIsInVuY2FjaGVBbGwiLCJfYnJlYWtDYWNoZSIsIl9icmVhayIsIl9yZXN0b3JlIiwiX211c2ljIiwiX2VmZmVjdCIsInBhdXNlQ2FjaGUiLCJwbGF5TXVzaWMiLCJtdXNpYyIsInN0b3BNdXNpYyIsInBhdXNlTXVzaWMiLCJyZXN1bWVNdXNpYyIsImdldE11c2ljVm9sdW1lIiwic2V0TXVzaWNWb2x1bWUiLCJpc011c2ljUGxheWluZyIsInBsYXlFZmZlY3QiLCJzZXRFZmZlY3RzVm9sdW1lIiwibXVzaWNJZCIsImdldEVmZmVjdHNWb2x1bWUiLCJwYXVzZUVmZmVjdCIsInBhdXNlQWxsRWZmZWN0cyIsImVmZmVjdCIsInJlc3VtZUVmZmVjdCIsInJlc3VtZUFsbEVmZmVjdHMiLCJwYXVzZUlEQ2FjaGUiLCJzdG9wRWZmZWN0Iiwic3RvcEFsbEVmZmVjdHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBckI7O0FBQ0EsSUFBTUMsU0FBUyxHQUFHRCxPQUFPLENBQUMsNEJBQUQsQ0FBekI7O0FBQ0EsSUFBTUUsRUFBRSxHQUFHQyxFQUFFLENBQUNELEVBQWQ7QUFFQSxJQUFJRSxXQUFXLEdBQUcsQ0FBbEI7O0FBQ0EsSUFBSUMsU0FBUyxHQUFHSCxFQUFFLENBQUNJLFNBQUgsQ0FBYSxJQUFiLENBQWhCOztBQUNBLElBQUlDLE9BQU8sR0FBRyxFQUFkO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLEVBQWpCOztBQUVBLElBQUlDLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQVVDLEtBQVYsRUFBaUI7QUFDaEM7QUFDQSxNQUFJLENBQUNBLEtBQUssQ0FBQ0MscUJBQVgsRUFBa0M7QUFDOUI7QUFDSDs7QUFDREQs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UUFBQUEsS0FBSyxDQUFDbUIsSUFBTjtBQUNIO0FBQ0o7QUFDSjtBQXJvQmEsQ0FBbEI7QUF3b0JBZ0YsTUFBTSxDQUFDQyxPQUFQLEdBQWlCM0csRUFBRSxDQUFDb0IsV0FBSCxHQUFpQkEsV0FBbEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAwOC0yMDEwIFJpY2FyZG8gUXVlc2FkYVxuIENvcHlyaWdodCAoYykgMjAxMS0yMDEyIGNvY29zMmQteC5vcmdcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IEF1ZGlvID0gcmVxdWlyZSgnLi9DQ0F1ZGlvJyk7XG5jb25zdCBBdWRpb0NsaXAgPSByZXF1aXJlKCcuLi9jb3JlL2Fzc2V0cy9DQ0F1ZGlvQ2xpcCcpO1xuY29uc3QganMgPSBjYy5qcztcblxubGV0IF9pbnN0YW5jZUlkID0gMDtcbmxldCBfaWQyYXVkaW8gPSBqcy5jcmVhdGVNYXAodHJ1ZSk7XG5sZXQgX3VybDJpZCA9IHt9O1xubGV0IF9hdWRpb1Bvb2wgPSBbXTtcblxubGV0IHJlY3ljbGVBdWRpbyA9IGZ1bmN0aW9uIChhdWRpbykge1xuICAgIC8vIEluIGNhc2UgcmVwZWF0bHkgcmVjeWNsZSBhdWRpbyB3aGVuIHVzZXJzIGNhbGwgYXVkaW8uc3RvcCB3aGVuIGF1ZGlvIGZpbmlzaCBwbGF5aW5nXG4gICAgaWYgKCFhdWRpby5fc2hvdWxkUmVjeWNsZU9uRW5kZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhdWRpby5fZmluaXNoQ2FsbGJhY2sgPSBudWxsO1xuICAgIGF1ZGlvLm9mZignZW5kZWQnKTtcbiAgICBhdWRpby5vZmYoJ3N0b3AnKTtcbiAgICBhdWRpby5zcmMgPSBudWxsO1xuICAgIC8vIEluIGNhc2UgcmVwZWF0bHkgcmVjeWNsZSBhdWRpb1xuICAgIGlmICghX2F1ZGlvUG9vbC5pbmNsdWRlcyhhdWRpbykpIHtcbiAgICAgICAgaWYgKF9hdWRpb1Bvb2wubGVuZ3RoIDwgMzIpIHtcbiAgICAgICAgICAgIF9hdWRpb1Bvb2wucHVzaChhdWRpbyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhdWRpby5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXVkaW8uX3Nob3VsZFJlY3ljbGVPbkVuZGVkID0gZmFsc2U7XG59O1xuXG5sZXQgZ2V0QXVkaW9Gcm9tUGF0aCA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgdmFyIGlkID0gX2luc3RhbmNlSWQrKztcbiAgICB2YXIgbGlzdCA9IF91cmwyaWRbcGF0aF07XG4gICAgaWYgKCFsaXN0KSB7XG4gICAgICAgIGxpc3QgPSBfdXJsMmlkW3BhdGhdID0gW107XG4gICAgfVxuICAgIGlmIChhdWRpb0VuZ2luZS5fbWF4QXVkaW9JbnN0YW5jZSA8PSBsaXN0Lmxlbmd0aCkge1xuICAgICAgICB2YXIgb2xkSWQgPSBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIHZhciBvbGRBdWRpbyA9IGdldEF1ZGlvRnJvbUlkKG9sZElkKTtcbiAgICAgICAgLy8gU3RvcCB3aWxsIHJlY3ljbGUgYXVkaW8gYXV0b21hdGljYWxseSBieSBldmVudCBjYWxsYmFja1xuICAgICAgICBvbGRBdWRpby5zdG9wKCk7XG4gICAgfVxuXG4gICAgdmFyIGF1ZGlvID0gX2F1ZGlvUG9vbC5wb3AoKSB8fCBuZXcgQXVkaW8oKTtcbiAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhdWRpb0luTGlzdCA9IGdldEF1ZGlvRnJvbUlkKHRoaXMuaWQpO1xuICAgICAgICBpZiAoYXVkaW9Jbkxpc3QpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBfaWQyYXVkaW9bdGhpcy5pZF07XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBsaXN0LmluZGV4T2YodGhpcy5pZCk7XG4gICAgICAgICAgICBjYy5qcy5hcnJheS5mYXN0UmVtb3ZlQXQobGlzdCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIHJlY3ljbGVBdWRpbyh0aGlzKTtcbiAgICB9O1xuXG4gICAgYXVkaW8ub24oJ2VuZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fZmluaXNoQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbmlzaENhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuZ2V0TG9vcCgpKXtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICB9LCBhdWRpbyk7XG5cbiAgICBhdWRpby5vbignc3RvcCcsIGNhbGxiYWNrLCBhdWRpbyk7XG4gICAgYXVkaW8uaWQgPSBpZDtcbiAgICBfaWQyYXVkaW9baWRdID0gYXVkaW87XG4gICAgbGlzdC5wdXNoKGlkKTtcblxuICAgIHJldHVybiBhdWRpbztcbn07XG5cbmxldCBnZXRBdWRpb0Zyb21JZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHJldHVybiBfaWQyYXVkaW9baWRdO1xufTtcblxubGV0IGhhbmRsZVZvbHVtZSAgPSBmdW5jdGlvbiAodm9sdW1lKSB7XG4gICAgaWYgKHZvbHVtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIHNldCBkZWZhdWx0IHZvbHVtZSBhcyAxXG4gICAgICAgIHZvbHVtZSA9IDE7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiB2b2x1bWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZvbHVtZSA9IE51bWJlci5wYXJzZUZsb2F0KHZvbHVtZSk7XG4gICAgfVxuICAgIHJldHVybiB2b2x1bWU7XG59O1xuXG4vKipcbiAqICEjZW4gY2MuYXVkaW9FbmdpbmUgaXMgdGhlIHNpbmdsZXRvbiBvYmplY3QsIGl0IHByb3ZpZGUgc2ltcGxlIGF1ZGlvIEFQSXMuXG4gKiAhI3poXG4gKiBjYy5hdWRpb2VuZ2luZeaYr+WNleS+i+WvueixoeOAgjxici8+XG4gKiDkuLvopoHnlKjmnaXmkq3mlL7pn7PpopHvvIzmkq3mlL7nmoTml7blgJnkvJrov5Tlm57kuIDkuKogYXVkaW9JRO+8jOS5i+WQjumDveWPr+S7pemAmui/h+i/meS4qiBhdWRpb0lEIOadpeaTjeS9nOi/meS4qumfs+mikeWvueixoeOAgjxici8+XG4gKiDkuI3kvb/nlKjnmoTml7blgJnvvIzor7fkvb/nlKggY2MuYXVkaW9FbmdpbmUudW5jYWNoZShmaWxlUGF0aCk7IOi/m+ihjOi1hOa6kOmHiuaUviA8YnIvPlxuICog5rOo5oSP77yaPGJyLz5cbiAqIOWcqCBBbmRyb2lkIOezu+e7n+a1j+iniOWZqOS4iu+8jOS4jeWQjOa1j+iniOWZqO+8jOS4jeWQjOeJiOacrOeahOaViOaenOS4jeWwveebuOWQjOOAgjxici8+XG4gKiDmr5TlpoLor7TvvJrlpKflpJrmlbDmtY/op4jlmajpg73pnIDopoHnlKjmiLfniannkIbkuqTkupLmiY3lj6/ku6XlvIDlp4vmkq3mlL7pn7PmlYjvvIzmnInkuIDkupvkuI3mlK/mjIEgV2ViQXVkaW/vvIw8YnIvPlxuICog5pyJ5LiA5Lqb5LiN5pSv5oyB5aSa6Z+z6L2o5pKt5pS+44CC5oC75LmL5aaC5p6c5a+56Z+z5LmQ5L6d6LWW5q+U6L6D5by677yM6K+35YGa5bC95Y+v6IO95aSa55qE5rWL6K+V44CCXG4gKiBAY2xhc3MgYXVkaW9FbmdpbmVcbiAqIEBzdGF0aWNcbiAqL1xudmFyIGF1ZGlvRW5naW5lID0ge1xuXG4gICAgQXVkaW9TdGF0ZTogQXVkaW8uU3RhdGUsXG5cbiAgICBfbWF4QXVkaW9JbnN0YW5jZTogMjQsXG5cbiAgICBfaWQyYXVkaW86IF9pZDJhdWRpbyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGxheSBhdWRpby5cbiAgICAgKiAhI3poIOaSreaUvumfs+mikVxuICAgICAqIEBtZXRob2QgcGxheVxuICAgICAqIEBwYXJhbSB7QXVkaW9DbGlwfSBjbGlwIC0gVGhlIGF1ZGlvIGNsaXAgdG8gcGxheS5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGxvb3AgLSBXaGV0aGVyIHRoZSBtdXNpYyBsb29wIG9yIG5vdC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdm9sdW1lIC0gVm9sdW1lIHNpemUuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBhdWRpb0lkXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5yZXNvdXJjZXMubG9hZChwYXRoLCBjYy5BdWRpb0NsaXAsIG51bGwsIGZ1bmN0aW9uIChlcnIsIGNsaXApIHtcbiAgICAgKiAgICAgdmFyIGF1ZGlvSUQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5KGNsaXAsIGZhbHNlLCAwLjUpO1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHBsYXk6IGZ1bmN0aW9uIChjbGlwLCBsb29wLCB2b2x1bWUpIHtcbiAgICAgICAgaWYgKCEoY2xpcCBpbnN0YW5jZW9mIEF1ZGlvQ2xpcCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYy5lcnJvcignV3JvbmcgdHlwZSBvZiBBdWRpb0NsaXAuJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBhdGggPSBjbGlwLm5hdGl2ZVVybDtcbiAgICAgICAgbGV0IGF1ZGlvID0gZ2V0QXVkaW9Gcm9tUGF0aChwYXRoKTtcbiAgICAgICAgYXVkaW8uc3JjID0gY2xpcDtcbiAgICAgICAgY2xpcC5fZW5zdXJlTG9hZGVkKCk7XG4gICAgICAgIGF1ZGlvLl9zaG91bGRSZWN5Y2xlT25FbmRlZCA9IHRydWU7XG4gICAgICAgIGF1ZGlvLnNldExvb3AobG9vcCB8fCBmYWxzZSk7XG4gICAgICAgIHZvbHVtZSA9IGhhbmRsZVZvbHVtZSh2b2x1bWUpO1xuICAgICAgICBhdWRpby5zZXRWb2x1bWUodm9sdW1lKTtcbiAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICByZXR1cm4gYXVkaW8uaWQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IGF1ZGlvIGxvb3AuXG4gICAgICogISN6aCDorr7nva7pn7PpopHmmK/lkKblvqrnjq/jgIJcbiAgICAgKiBAbWV0aG9kIHNldExvb3BcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYXVkaW9JRCAtIGF1ZGlvIGlkLlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gbG9vcCAtIFdoZXRoZXIgY3ljbGUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5zZXRMb29wKGlkLCB0cnVlKTtcbiAgICAgKi9cbiAgICBzZXRMb29wOiBmdW5jdGlvbiAoYXVkaW9JRCwgbG9vcCkge1xuICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChhdWRpb0lEKTtcbiAgICAgICAgaWYgKCFhdWRpbyB8fCAhYXVkaW8uc2V0TG9vcClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgYXVkaW8uc2V0TG9vcChsb29wKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgYXVkaW8gY3ljbGUgc3RhdGUuXG4gICAgICogISN6aCDojrflj5bpn7PpopHnmoTlvqrnjq/nirbmgIHjgIJcbiAgICAgKiBAbWV0aG9kIGlzTG9vcFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhdWRpb0lEIC0gYXVkaW8gaWQuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gV2hldGhlciBjeWNsZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmF1ZGlvRW5naW5lLmlzTG9vcChpZCk7XG4gICAgICovXG4gICAgaXNMb29wOiBmdW5jdGlvbiAoYXVkaW9JRCkge1xuICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChhdWRpb0lEKTtcbiAgICAgICAgaWYgKCFhdWRpbyB8fCAhYXVkaW8uZ2V0TG9vcClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGF1ZGlvLmdldExvb3AoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdGhlIHZvbHVtZSBvZiBhdWRpby5cbiAgICAgKiAhI3poIOiuvue9rumfs+mHj++8iDAuMCB+IDEuMO+8ieOAglxuICAgICAqIEBtZXRob2Qgc2V0Vm9sdW1lXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGF1ZGlvSUQgLSBhdWRpbyBpZC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdm9sdW1lIC0gVm9sdW1lIG11c3QgYmUgaW4gMC4wfjEuMCAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5zZXRWb2x1bWUoaWQsIDAuNSk7XG4gICAgICovXG4gICAgc2V0Vm9sdW1lOiBmdW5jdGlvbiAoYXVkaW9JRCwgdm9sdW1lKSB7XG4gICAgICAgIHZhciBhdWRpbyA9IGdldEF1ZGlvRnJvbUlkKGF1ZGlvSUQpO1xuICAgICAgICBpZiAoYXVkaW8pIHtcbiAgICAgICAgICAgIGF1ZGlvLnNldFZvbHVtZSh2b2x1bWUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHZvbHVtZSBvZiB0aGUgbXVzaWMgbWF4IHZhbHVlIGlzIDEuMCx0aGUgbWluIHZhbHVlIGlzIDAuMCAuXG4gICAgICogISN6aCDojrflj5bpn7Pph4/vvIgwLjAgfiAxLjDvvInjgIJcbiAgICAgKiBAbWV0aG9kIGdldFZvbHVtZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhdWRpb0lEIC0gYXVkaW8gaWQuXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHZvbHVtZSA9IGNjLmF1ZGlvRW5naW5lLmdldFZvbHVtZShpZCk7XG4gICAgICovXG4gICAgZ2V0Vm9sdW1lOiBmdW5jdGlvbiAoYXVkaW9JRCkge1xuICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChhdWRpb0lEKTtcbiAgICAgICAgcmV0dXJuIGF1ZGlvID8gYXVkaW8uZ2V0Vm9sdW1lKCkgOiAxO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldCBjdXJyZW50IHRpbWVcbiAgICAgKiAhI3poIOiuvue9ruW9k+WJjeeahOmfs+mikeaXtumXtOOAglxuICAgICAqIEBtZXRob2Qgc2V0Q3VycmVudFRpbWVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYXVkaW9JRCAtIGF1ZGlvIGlkLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzZWMgLSBjdXJyZW50IHRpbWUuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnNldEN1cnJlbnRUaW1lKGlkLCAyKTtcbiAgICAgKi9cbiAgICBzZXRDdXJyZW50VGltZTogZnVuY3Rpb24gKGF1ZGlvSUQsIHNlYykge1xuICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChhdWRpb0lEKTtcbiAgICAgICAgaWYgKGF1ZGlvKSB7XG4gICAgICAgICAgICBhdWRpby5zZXRDdXJyZW50VGltZShzZWMpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgY3VycmVudCB0aW1lXG4gICAgICogISN6aCDojrflj5blvZPliY3nmoTpn7PpopHmkq3mlL7ml7bpl7TjgIJcbiAgICAgKiBAbWV0aG9kIGdldEN1cnJlbnRUaW1lXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGF1ZGlvSUQgLSBhdWRpbyBpZC5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGF1ZGlvIGN1cnJlbnQgdGltZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciB0aW1lID0gY2MuYXVkaW9FbmdpbmUuZ2V0Q3VycmVudFRpbWUoaWQpO1xuICAgICAqL1xuICAgIGdldEN1cnJlbnRUaW1lOiBmdW5jdGlvbiAoYXVkaW9JRCkge1xuICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChhdWRpb0lEKTtcbiAgICAgICAgcmV0dXJuIGF1ZGlvID8gYXVkaW8uZ2V0Q3VycmVudFRpbWUoKSA6IDA7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0IGF1ZGlvIGR1cmF0aW9uXG4gICAgICogISN6aCDojrflj5bpn7PpopHmgLvml7bplb/jgIJcbiAgICAgKiBAbWV0aG9kIGdldER1cmF0aW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGF1ZGlvSUQgLSBhdWRpbyBpZC5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGF1ZGlvIGR1cmF0aW9uLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHRpbWUgPSBjYy5hdWRpb0VuZ2luZS5nZXREdXJhdGlvbihpZCk7XG4gICAgICovXG4gICAgZ2V0RHVyYXRpb246IGZ1bmN0aW9uIChhdWRpb0lEKSB7XG4gICAgICAgIHZhciBhdWRpbyA9IGdldEF1ZGlvRnJvbUlkKGF1ZGlvSUQpO1xuICAgICAgICByZXR1cm4gYXVkaW8gPyBhdWRpby5nZXREdXJhdGlvbigpIDogMDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgYXVkaW8gc3RhdGVcbiAgICAgKiAhI3poIOiOt+WPlumfs+mikeeKtuaAgeOAglxuICAgICAqIEBtZXRob2QgZ2V0U3RhdGVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYXVkaW9JRCAtIGF1ZGlvIGlkLlxuICAgICAqIEByZXR1cm4ge2F1ZGlvRW5naW5lLkF1ZGlvU3RhdGV9IGF1ZGlvIGR1cmF0aW9uLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHN0YXRlID0gY2MuYXVkaW9FbmdpbmUuZ2V0U3RhdGUoaWQpO1xuICAgICAqL1xuICAgIGdldFN0YXRlOiBmdW5jdGlvbiAoYXVkaW9JRCkge1xuICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChhdWRpb0lEKTtcbiAgICAgICAgcmV0dXJuIGF1ZGlvID8gYXVkaW8uZ2V0U3RhdGUoKSA6IHRoaXMuQXVkaW9TdGF0ZS5FUlJPUjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgQXVkaW8gZmluaXNoIGNhbGxiYWNrXG4gICAgICogISN6aCDorr7nva7kuIDkuKrpn7PpopHnu5PmnZ/lkI7nmoTlm57osINcbiAgICAgKiBAbWV0aG9kIHNldEZpbmlzaENhbGxiYWNrXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGF1ZGlvSUQgLSBhdWRpbyBpZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGxvYWRlZCBjYWxsYmFjay5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnNldEZpbmlzaENhbGxiYWNrKGlkLCBmdW5jdGlvbiAoKSB7fSk7XG4gICAgICovXG4gICAgc2V0RmluaXNoQ2FsbGJhY2s6IGZ1bmN0aW9uIChhdWRpb0lELCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChhdWRpb0lEKTtcbiAgICAgICAgaWYgKCFhdWRpbylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgYXVkaW8uX2ZpbmlzaENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGF1c2UgcGxheWluZyBhdWRpby5cbiAgICAgKiAhI3poIOaaguWBnOato+WcqOaSreaUvumfs+mikeOAglxuICAgICAqIEBtZXRob2QgcGF1c2VcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYXVkaW9JRCAtIFRoZSByZXR1cm4gdmFsdWUgb2YgZnVuY3Rpb24gcGxheS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnBhdXNlKGF1ZGlvSUQpO1xuICAgICAqL1xuICAgIHBhdXNlOiBmdW5jdGlvbiAoYXVkaW9JRCkge1xuICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChhdWRpb0lEKTtcbiAgICAgICAgaWYgKGF1ZGlvKSB7XG4gICAgICAgICAgICBhdWRpby5wYXVzZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3BhdXNlSURDYWNoZTogW10sXG4gICAgLyoqXG4gICAgICogISNlbiBQYXVzZSBhbGwgcGxheWluZyBhdWRpb1xuICAgICAqICEjemgg5pqC5YGc546w5Zyo5q2j5Zyo5pKt5pS+55qE5omA5pyJ6Z+z6aKR44CCXG4gICAgICogQG1ldGhvZCBwYXVzZUFsbFxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXVkaW9FbmdpbmUucGF1c2VBbGwoKTtcbiAgICAgKi9cbiAgICBwYXVzZUFsbDogZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpZCBpbiBfaWQyYXVkaW8pIHtcbiAgICAgICAgICAgIHZhciBhdWRpbyA9IF9pZDJhdWRpb1tpZF07XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBhdWRpby5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgaWYgKHN0YXRlID09PSBBdWRpby5TdGF0ZS5QTEFZSU5HKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGF1c2VJRENhY2hlLnB1c2goaWQpO1xuICAgICAgICAgICAgICAgIGF1ZGlvLnBhdXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXN1bWUgcGxheWluZyBhdWRpby5cbiAgICAgKiAhI3poIOaBouWkjeaSreaUvuaMh+WumueahOmfs+mikeOAglxuICAgICAqIEBtZXRob2QgcmVzdW1lXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGF1ZGlvSUQgLSBUaGUgcmV0dXJuIHZhbHVlIG9mIGZ1bmN0aW9uIHBsYXkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5yZXN1bWUoYXVkaW9JRCk7XG4gICAgICovXG4gICAgcmVzdW1lOiBmdW5jdGlvbiAoYXVkaW9JRCkge1xuICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChhdWRpb0lEKTtcbiAgICAgICAgaWYgKGF1ZGlvKSB7XG4gICAgICAgICAgICBhdWRpby5yZXN1bWUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJlc3VtZSBhbGwgcGxheWluZyBhdWRpby5cbiAgICAgKiAhI3poIOaBouWkjeaSreaUvuaJgOacieS5i+WJjeaaguWBnOeahOaJgOaciemfs+mikeOAglxuICAgICAqIEBtZXRob2QgcmVzdW1lQWxsXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5yZXN1bWVBbGwoKTtcbiAgICAgKi9cbiAgICByZXN1bWVBbGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9wYXVzZUlEQ2FjaGUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBpZCA9IHRoaXMuX3BhdXNlSURDYWNoZVtpXTtcbiAgICAgICAgICAgIHZhciBhdWRpbyA9IGdldEF1ZGlvRnJvbUlkKGlkKTtcbiAgICAgICAgICAgIGlmIChhdWRpbylcbiAgICAgICAgICAgICAgICBhdWRpby5yZXN1bWUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wYXVzZUlEQ2FjaGUubGVuZ3RoID0gMDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTdG9wIHBsYXlpbmcgYXVkaW8uXG4gICAgICogISN6aCDlgZzmraLmkq3mlL7mjIflrprpn7PpopHjgIJcbiAgICAgKiBAbWV0aG9kIHN0b3BcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYXVkaW9JRCAtIFRoZSByZXR1cm4gdmFsdWUgb2YgZnVuY3Rpb24gcGxheS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnN0b3AoYXVkaW9JRCk7XG4gICAgICovXG4gICAgc3RvcDogZnVuY3Rpb24gKGF1ZGlvSUQpIHtcbiAgICAgICAgdmFyIGF1ZGlvID0gZ2V0QXVkaW9Gcm9tSWQoYXVkaW9JRCk7XG4gICAgICAgIGlmIChhdWRpbykge1xuICAgICAgICAgICAgLy8gU3RvcCB3aWxsIHJlY3ljbGUgYXVkaW8gYXV0b21hdGljYWxseSBieSBldmVudCBjYWxsYmFja1xuICAgICAgICAgICAgYXVkaW8uc3RvcCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTdG9wIGFsbCBwbGF5aW5nIGF1ZGlvLlxuICAgICAqICEjemgg5YGc5q2i5q2j5Zyo5pKt5pS+55qE5omA5pyJ6Z+z6aKR44CCXG4gICAgICogQG1ldGhvZCBzdG9wQWxsXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XG4gICAgICovXG4gICAgc3RvcEFsbDogZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpZCBpbiBfaWQyYXVkaW8pIHtcbiAgICAgICAgICAgIHZhciBhdWRpbyA9IF9pZDJhdWRpb1tpZF07XG4gICAgICAgICAgICBpZiAoYXVkaW8pIHtcbiAgICAgICAgICAgICAgICAvLyBTdG9wIHdpbGwgcmVjeWNsZSBhdWRpbyBhdXRvbWF0aWNhbGx5IGJ5IGV2ZW50IGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgYXVkaW8uc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHVwIGFuIGF1ZGlvIGNhbiBnZW5lcmF0ZSBhIGZldyBleGFtcGxlcy5cbiAgICAgKiAhI3poIOiuvue9ruS4gOS4qumfs+mikeWPr+S7peiuvue9ruWHoOS4quWunuS+i1xuICAgICAqIEBtZXRob2Qgc2V0TWF4QXVkaW9JbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBudW0gLSBhIG51bWJlciBvZiBpbnN0YW5jZXMgdG8gYmUgY3JlYXRlZCBmcm9tIHdpdGhpbiBhbiBhdWRpb1xuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXVkaW9FbmdpbmUuc2V0TWF4QXVkaW9JbnN0YW5jZSgyMCk7XG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuNC4wXG4gICAgICovXG4gICAgc2V0TWF4QXVkaW9JbnN0YW5jZTogZnVuY3Rpb24gKG51bSkge1xuICAgICAgICBpZiAoQ0NfREVCVUcpIHtcbiAgICAgICAgICAgIGNjLndhcm4oJ1NpbmNlIHYyLjQuMCwgbWF4QXVkaW9JbnN0YW5jZSBoYXMgYmVjb21lIGEgcmVhZCBvbmx5IHByb3BlcnR5LlxcbidcbiAgICAgICAgICAgICsgJ2F1ZGlvRW5naW5lLnNldE1heEF1ZGlvSW5zdGFuY2UoKSBtZXRob2Qgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHRpbmcgYXVkaW8gY2FuIHByb2R1Y2Ugc2V2ZXJhbCBleGFtcGxlcy5cbiAgICAgKiAhI3poIOiOt+WPluS4gOS4qumfs+mikeWPr+S7peiuvue9ruWHoOS4quWunuS+i1xuICAgICAqIEBtZXRob2QgZ2V0TWF4QXVkaW9JbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge051bWJlcn0gbWF4IG51bWJlciBvZiBpbnN0YW5jZXMgdG8gYmUgY3JlYXRlZCBmcm9tIHdpdGhpbiBhbiBhdWRpb1xuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXVkaW9FbmdpbmUuZ2V0TWF4QXVkaW9JbnN0YW5jZSgpO1xuICAgICAqL1xuICAgIGdldE1heEF1ZGlvSW5zdGFuY2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heEF1ZGlvSW5zdGFuY2U7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVW5sb2FkIHRoZSBwcmVsb2FkZWQgYXVkaW8gZnJvbSBpbnRlcm5hbCBidWZmZXIuXG4gICAgICogISN6aCDljbjovb3pooTliqDovb3nmoTpn7PpopHjgIJcbiAgICAgKiBAbWV0aG9kIHVuY2FjaGVcbiAgICAgKiBAcGFyYW0ge0F1ZGlvQ2xpcH0gY2xpcFxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXVkaW9FbmdpbmUudW5jYWNoZShmaWxlUGF0aCk7XG4gICAgICovXG4gICAgdW5jYWNoZTogZnVuY3Rpb24gKGNsaXApIHtcbiAgICAgICAgdmFyIGZpbGVQYXRoID0gY2xpcDtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGlwID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLy8gYmFja3dhcmQgY29tcGF0aWJpbGl0eSBzaW5jZSAxLjEwXG4gICAgICAgICAgICBjYy53YXJuSUQoODQwMSwgJ2NjLmF1ZGlvRW5naW5lJywgJ2NjLkF1ZGlvQ2xpcCcsICdBdWRpb0NsaXAnLCAnY2MuQXVkaW9DbGlwJywgJ2F1ZGlvJyk7XG4gICAgICAgICAgICBmaWxlUGF0aCA9IGNsaXA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWNsaXApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWxlUGF0aCA9IGNsaXAubmF0aXZlVXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxpc3QgPSBfdXJsMmlkW2ZpbGVQYXRoXTtcbiAgICAgICAgaWYgKCFsaXN0KSByZXR1cm47XG4gICAgICAgIHdoaWxlIChsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBpZCA9IGxpc3QucG9wKCk7XG4gICAgICAgICAgICB2YXIgYXVkaW8gPSBfaWQyYXVkaW9baWRdO1xuICAgICAgICAgICAgaWYgKGF1ZGlvKSB7XG4gICAgICAgICAgICAgICAgLy8gU3RvcCB3aWxsIHJlY3ljbGUgYXVkaW8gYXV0b21hdGljYWxseSBieSBldmVudCBjYWxsYmFja1xuICAgICAgICAgICAgICAgIGF1ZGlvLnN0b3AoKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgX2lkMmF1ZGlvW2lkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFVubG9hZCBhbGwgYXVkaW8gZnJvbSBpbnRlcm5hbCBidWZmZXIuXG4gICAgICogISN6aCDljbjovb3miYDmnInpn7PpopHjgIJcbiAgICAgKiBAbWV0aG9kIHVuY2FjaGVBbGxcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnVuY2FjaGVBbGwoKTtcbiAgICAgKi9cbiAgICB1bmNhY2hlQWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3RvcEFsbCgpO1xuICAgICAgICBsZXQgYXVkaW87XG4gICAgICAgIGZvciAobGV0IGlkIGluIF9pZDJhdWRpbykge1xuICAgICAgICAgICAgYXVkaW8gPSBfaWQyYXVkaW9baWRdO1xuICAgICAgICAgICAgaWYgKGF1ZGlvKSB7XG4gICAgICAgICAgICAgICAgYXVkaW8uZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChhdWRpbyA9IF9hdWRpb1Bvb2wucG9wKCkpIHtcbiAgICAgICAgICAgIGF1ZGlvLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICBfaWQyYXVkaW8gPSBqcy5jcmVhdGVNYXAodHJ1ZSk7XG4gICAgICAgIF91cmwyaWQgPSB7fTtcbiAgICB9LFxuXG4gICAgX2JyZWFrQ2FjaGU6IG51bGwsXG4gICAgX2JyZWFrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2JyZWFrQ2FjaGUgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaWQgaW4gX2lkMmF1ZGlvKSB7XG4gICAgICAgICAgICB2YXIgYXVkaW8gPSBfaWQyYXVkaW9baWRdO1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gYXVkaW8uZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gQXVkaW8uU3RhdGUuUExBWUlORykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2JyZWFrQ2FjaGUucHVzaChpZCk7XG4gICAgICAgICAgICAgICAgYXVkaW8ucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfcmVzdG9yZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2JyZWFrQ2FjaGUpIHJldHVybjtcblxuICAgICAgICB3aGlsZSAodGhpcy5fYnJlYWtDYWNoZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSB0aGlzLl9icmVha0NhY2hlLnBvcCgpO1xuICAgICAgICAgICAgdmFyIGF1ZGlvID0gZ2V0QXVkaW9Gcm9tSWQoaWQpO1xuICAgICAgICAgICAgaWYgKGF1ZGlvICYmIGF1ZGlvLnJlc3VtZSlcbiAgICAgICAgICAgICAgICBhdWRpby5yZXN1bWUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9icmVha0NhY2hlID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIENsYXNzaWZpY2F0aW9uIG9mIGludGVyZmFjZVxuXG4gICAgX211c2ljOiB7XG4gICAgICAgIGlkOiAtMSxcbiAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgIHZvbHVtZTogMSxcbiAgICB9LFxuXG4gICAgX2VmZmVjdDoge1xuICAgICAgICB2b2x1bWU6IDEsXG4gICAgICAgIHBhdXNlQ2FjaGU6IFtdLFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFBsYXkgYmFja2dyb3VuZCBtdXNpY1xuICAgICAqICEjemgg5pKt5pS+6IOM5pmv6Z+z5LmQXG4gICAgICogQG1ldGhvZCBwbGF5TXVzaWNcbiAgICAgKiBAcGFyYW0ge0F1ZGlvQ2xpcH0gY2xpcCAtIFRoZSBhdWRpbyBjbGlwIHRvIHBsYXkuXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBsb29wIC0gV2hldGhlciB0aGUgbXVzaWMgbG9vcCBvciBub3QuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBhdWRpb0lkXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5yZXNvdXJjZXMubG9hZChwYXRoLCBjYy5BdWRpb0NsaXAsIG51bGwsIGZ1bmN0aW9uIChlcnIsIGNsaXApIHtcbiAgICAgKiAgICAgdmFyIGF1ZGlvSUQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWMoY2xpcCwgZmFsc2UpO1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHBsYXlNdXNpYzogZnVuY3Rpb24gKGNsaXAsIGxvb3ApIHtcbiAgICAgICAgdmFyIG11c2ljID0gdGhpcy5fbXVzaWM7XG4gICAgICAgIHRoaXMuc3RvcChtdXNpYy5pZCk7XG4gICAgICAgIG11c2ljLmlkID0gdGhpcy5wbGF5KGNsaXAsIGxvb3AsIG11c2ljLnZvbHVtZSk7XG4gICAgICAgIG11c2ljLmxvb3AgPSBsb29wO1xuICAgICAgICByZXR1cm4gbXVzaWMuaWQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU3RvcCBiYWNrZ3JvdW5kIG11c2ljLlxuICAgICAqICEjemgg5YGc5q2i5pKt5pS+6IOM5pmv6Z+z5LmQ44CCXG4gICAgICogQG1ldGhvZCBzdG9wTXVzaWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYygpO1xuICAgICAqL1xuICAgIHN0b3BNdXNpYzogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnN0b3AodGhpcy5fbXVzaWMuaWQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFBhdXNlIHRoZSBiYWNrZ3JvdW5kIG11c2ljLlxuICAgICAqICEjemgg5pqC5YGc5pKt5pS+6IOM5pmv6Z+z5LmQ44CCXG4gICAgICogQG1ldGhvZCBwYXVzZU11c2ljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKCk7XG4gICAgICovXG4gICAgcGF1c2VNdXNpYzogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnBhdXNlKHRoaXMuX211c2ljLmlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX211c2ljLmlkO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJlc3VtZSBwbGF5aW5nIGJhY2tncm91bmQgbXVzaWMuXG4gICAgICogISN6aCDmgaLlpI3mkq3mlL7og4zmma/pn7PkuZDjgIJcbiAgICAgKiBAbWV0aG9kIHJlc3VtZU11c2ljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5yZXN1bWVNdXNpYygpO1xuICAgICAqL1xuICAgIHJlc3VtZU11c2ljOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVzdW1lKHRoaXMuX211c2ljLmlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX211c2ljLmlkO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldCB0aGUgdm9sdW1lKDAuMCB+IDEuMCkuXG4gICAgICogISN6aCDojrflj5bpn7Pph4/vvIgwLjAgfiAxLjDvvInjgIJcbiAgICAgKiBAbWV0aG9kIGdldE11c2ljVm9sdW1lXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHZvbHVtZSA9IGNjLmF1ZGlvRW5naW5lLmdldE11c2ljVm9sdW1lKCk7XG4gICAgICovXG4gICAgZ2V0TXVzaWNWb2x1bWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX211c2ljLnZvbHVtZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdGhlIGJhY2tncm91bmQgbXVzaWMgdm9sdW1lLlxuICAgICAqICEjemgg6K6+572u6IOM5pmv6Z+z5LmQ6Z+z6YeP77yIMC4wIH4gMS4w77yJ44CCXG4gICAgICogQG1ldGhvZCBzZXRNdXNpY1ZvbHVtZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2b2x1bWUgLSBWb2x1bWUgbXVzdCBiZSBpbiAwLjB+MS4wLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXVkaW9FbmdpbmUuc2V0TXVzaWNWb2x1bWUoMC41KTtcbiAgICAgKi9cbiAgICBzZXRNdXNpY1ZvbHVtZTogZnVuY3Rpb24gKHZvbHVtZSkge1xuICAgICAgICB2b2x1bWUgPSBoYW5kbGVWb2x1bWUodm9sdW1lKTtcbiAgICAgICAgdmFyIG11c2ljID0gdGhpcy5fbXVzaWM7XG4gICAgICAgIG11c2ljLnZvbHVtZSA9IHZvbHVtZTtcbiAgICAgICAgdGhpcy5zZXRWb2x1bWUobXVzaWMuaWQsIG11c2ljLnZvbHVtZSk7XG4gICAgICAgIHJldHVybiBtdXNpYy52b2x1bWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQmFja2dyb3VuZCBtdXNpYyBwbGF5aW5nIHN0YXRlXG4gICAgICogISN6aCDog4zmma/pn7PkuZDmmK/lkKbmraPlnKjmkq3mlL5cbiAgICAgKiBAbWV0aG9kIGlzTXVzaWNQbGF5aW5nXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmF1ZGlvRW5naW5lLmlzTXVzaWNQbGF5aW5nKCk7XG4gICAgICovXG4gICAgaXNNdXNpY1BsYXlpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhdGUodGhpcy5fbXVzaWMuaWQpID09PSB0aGlzLkF1ZGlvU3RhdGUuUExBWUlORztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBQbGF5IGVmZmVjdCBhdWRpby5cbiAgICAgKiAhI3poIOaSreaUvumfs+aViFxuICAgICAqIEBtZXRob2QgcGxheUVmZmVjdFxuICAgICAqIEBwYXJhbSB7QXVkaW9DbGlwfSBjbGlwIC0gVGhlIGF1ZGlvIGNsaXAgdG8gcGxheS5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGxvb3AgLSBXaGV0aGVyIHRoZSBtdXNpYyBsb29wIG9yIG5vdC5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGF1ZGlvSWRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLnJlc291cmNlcy5sb2FkKHBhdGgsIGNjLkF1ZGlvQ2xpcCwgbnVsbCwgZnVuY3Rpb24gKGVyciwgY2xpcCkge1xuICAgICAqICAgICB2YXIgYXVkaW9JRCA9IGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoY2xpcCwgZmFsc2UpO1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHBsYXlFZmZlY3Q6IGZ1bmN0aW9uIChjbGlwLCBsb29wKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsYXkoY2xpcCwgbG9vcCB8fCBmYWxzZSwgdGhpcy5fZWZmZWN0LnZvbHVtZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHRoZSB2b2x1bWUgb2YgZWZmZWN0IGF1ZGlvLlxuICAgICAqICEjemgg6K6+572u6Z+z5pWI6Z+z6YeP77yIMC4wIH4gMS4w77yJ44CCXG4gICAgICogQG1ldGhvZCBzZXRFZmZlY3RzVm9sdW1lXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZvbHVtZSAtIFZvbHVtZSBtdXN0IGJlIGluIDAuMH4xLjAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5zZXRFZmZlY3RzVm9sdW1lKDAuNSk7XG4gICAgICovXG4gICAgc2V0RWZmZWN0c1ZvbHVtZTogZnVuY3Rpb24gKHZvbHVtZSkge1xuICAgICAgICB2b2x1bWUgPSBoYW5kbGVWb2x1bWUodm9sdW1lKTtcbiAgICAgICAgdmFyIG11c2ljSWQgPSB0aGlzLl9tdXNpYy5pZDtcbiAgICAgICAgdGhpcy5fZWZmZWN0LnZvbHVtZSA9IHZvbHVtZTtcbiAgICAgICAgZm9yICh2YXIgaWQgaW4gX2lkMmF1ZGlvKSB7XG4gICAgICAgICAgICB2YXIgYXVkaW8gPSBfaWQyYXVkaW9baWRdO1xuICAgICAgICAgICAgaWYgKCFhdWRpbyB8fCBhdWRpby5pZCA9PT0gbXVzaWNJZCkgY29udGludWU7XG4gICAgICAgICAgICBhdWRpb0VuZ2luZS5zZXRWb2x1bWUoaWQsIHZvbHVtZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgdm9sdW1lIG9mIHRoZSBlZmZlY3QgYXVkaW8gbWF4IHZhbHVlIGlzIDEuMCx0aGUgbWluIHZhbHVlIGlzIDAuMCAuXG4gICAgICogISN6aCDojrflj5bpn7PmlYjpn7Pph4/vvIgwLjAgfiAxLjDvvInjgIJcbiAgICAgKiBAbWV0aG9kIGdldEVmZmVjdHNWb2x1bWVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgdm9sdW1lID0gY2MuYXVkaW9FbmdpbmUuZ2V0RWZmZWN0c1ZvbHVtZSgpO1xuICAgICAqL1xuICAgIGdldEVmZmVjdHNWb2x1bWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VmZmVjdC52b2x1bWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGF1c2UgZWZmZWN0IGF1ZGlvLlxuICAgICAqICEjemgg5pqC5YGc5pKt5pS+6Z+z5pWI44CCXG4gICAgICogQG1ldGhvZCBwYXVzZUVmZmVjdFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhdWRpb0lEIC0gYXVkaW8gaWQuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5wYXVzZUVmZmVjdChhdWRpb0lEKTtcbiAgICAgKi9cbiAgICBwYXVzZUVmZmVjdDogZnVuY3Rpb24gKGF1ZGlvSUQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF1c2UoYXVkaW9JRCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU3RvcCBwbGF5aW5nIGFsbCB0aGUgc291bmQgZWZmZWN0cy5cbiAgICAgKiAhI3poIOaaguWBnOaSreaUvuaJgOaciemfs+aViOOAglxuICAgICAqIEBtZXRob2QgcGF1c2VBbGxFZmZlY3RzXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5wYXVzZUFsbEVmZmVjdHMoKTtcbiAgICAgKi9cbiAgICBwYXVzZUFsbEVmZmVjdHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG11c2ljSWQgPSB0aGlzLl9tdXNpYy5pZDtcbiAgICAgICAgdmFyIGVmZmVjdCA9IHRoaXMuX2VmZmVjdDtcbiAgICAgICAgZWZmZWN0LnBhdXNlQ2FjaGUubGVuZ3RoID0gMDtcblxuICAgICAgICBmb3IgKHZhciBpZCBpbiBfaWQyYXVkaW8pIHtcbiAgICAgICAgICAgIHZhciBhdWRpbyA9IF9pZDJhdWRpb1tpZF07XG4gICAgICAgICAgICBpZiAoIWF1ZGlvIHx8IGF1ZGlvLmlkID09PSBtdXNpY0lkKSBjb250aW51ZTtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IGF1ZGlvLmdldFN0YXRlKCk7XG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IHRoaXMuQXVkaW9TdGF0ZS5QTEFZSU5HKSB7XG4gICAgICAgICAgICAgICAgZWZmZWN0LnBhdXNlQ2FjaGUucHVzaChpZCk7XG4gICAgICAgICAgICAgICAgYXVkaW8ucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJlc3VtZSBlZmZlY3QgYXVkaW8uXG4gICAgICogISN6aCDmgaLlpI3mkq3mlL7pn7PmlYjpn7PpopHjgIJcbiAgICAgKiBAbWV0aG9kIHJlc3VtZUVmZmVjdFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhdWRpb0lEIC0gVGhlIHJldHVybiB2YWx1ZSBvZiBmdW5jdGlvbiBwbGF5LlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXVkaW9FbmdpbmUucmVzdW1lRWZmZWN0KGF1ZGlvSUQpO1xuICAgICAqL1xuICAgIHJlc3VtZUVmZmVjdDogZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHRoaXMucmVzdW1lKGlkKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXN1bWUgYWxsIGVmZmVjdCBhdWRpby5cbiAgICAgKiAhI3poIOaBouWkjeaSreaUvuaJgOacieS5i+WJjeaaguWBnOeahOmfs+aViOOAglxuICAgICAqIEBtZXRob2QgcmVzdW1lQWxsRWZmZWN0c1xuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXVkaW9FbmdpbmUucmVzdW1lQWxsRWZmZWN0cygpO1xuICAgICAqL1xuICAgIHJlc3VtZUFsbEVmZmVjdHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhdXNlSURDYWNoZSA9IHRoaXMuX2VmZmVjdC5wYXVzZUNhY2hlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdXNlSURDYWNoZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGlkID0gcGF1c2VJRENhY2hlW2ldO1xuICAgICAgICAgICAgdmFyIGF1ZGlvID0gX2lkMmF1ZGlvW2lkXTtcbiAgICAgICAgICAgIGlmIChhdWRpbylcbiAgICAgICAgICAgICAgICBhdWRpby5yZXN1bWUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFN0b3AgcGxheWluZyB0aGUgZWZmZWN0IGF1ZGlvLlxuICAgICAqICEjemgg5YGc5q2i5pKt5pS+6Z+z5pWI44CCXG4gICAgICogQG1ldGhvZCBzdG9wRWZmZWN0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGF1ZGlvSUQgLSBhdWRpbyBpZC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnN0b3BFZmZlY3QoaWQpO1xuICAgICAqL1xuICAgIHN0b3BFZmZlY3Q6IGZ1bmN0aW9uIChhdWRpb0lEKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3AoYXVkaW9JRCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU3RvcCBwbGF5aW5nIGFsbCB0aGUgZWZmZWN0cy5cbiAgICAgKiAhI3poIOWBnOatouaSreaUvuaJgOaciemfs+aViOOAglxuICAgICAqIEBtZXRob2Qgc3RvcEFsbEVmZmVjdHNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGxFZmZlY3RzKCk7XG4gICAgICovXG4gICAgc3RvcEFsbEVmZmVjdHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG11c2ljSWQgPSB0aGlzLl9tdXNpYy5pZDtcbiAgICAgICAgZm9yICh2YXIgaWQgaW4gX2lkMmF1ZGlvKSB7XG4gICAgICAgICAgICB2YXIgYXVkaW8gPSBfaWQyYXVkaW9baWRdO1xuICAgICAgICAgICAgaWYgKCFhdWRpbyB8fCBhdWRpby5pZCA9PT0gbXVzaWNJZCkgY29udGludWU7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBhdWRpby5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgaWYgKHN0YXRlID09PSBhdWRpb0VuZ2luZS5BdWRpb1N0YXRlLlBMQVlJTkcpIHtcbiAgICAgICAgICAgICAgICBhdWRpby5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNjLmF1ZGlvRW5naW5lID0gYXVkaW9FbmdpbmU7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==