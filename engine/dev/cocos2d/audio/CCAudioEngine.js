
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

    callback.call(this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9hdWRpby9DQ0F1ZGlvRW5naW5lLmpzIl0sIm5hbWVzIjpbIkF1ZGlvIiwicmVxdWlyZSIsIkF1ZGlvQ2xpcCIsImpzIiwiY2MiLCJfaW5zdGFuY2VJZCIsIl9pZDJhdWRpbyIsImNyZWF0ZU1hcCIsIl91cmwyaWQiLCJfYXVkaW9Qb29sIiwicmVjeWNsZUF1ZGlvIiwiYXVkaW8iLCJfc2hvdWxkUmVjeWNsZU9uRW5kZWQiLCJfZmluaXNoQ2FsbGJhY2siLCJvZmYiLCJzcmMiLCJpbmNsdWRlcyIsImxlbmd0aCIsInB1c2giLCJkZXN0cm95IiwiZ2V0QXVkaW9Gcm9tUGF0aCIsInBhdGgiLCJpZCIsImxpc3QiLCJhdWRpb0VuZ2luZSIsIl9tYXhBdWRpb0luc3RhbmNlIiwib2xkSWQiLCJzaGlmdCIsIm9sZEF1ZGlvIiwiZ2V0QXVkaW9Gcm9tSWQiLCJzdG9wIiwicG9wIiwiY2FsbGJhY2siLCJhdWRpb0luTGlzdCIsImluZGV4IiwiaW5kZXhPZiIsImFycmF5IiwiZmFzdFJlbW92ZUF0Iiwib24iLCJjYWxsIiwiaGFuZGxlVm9sdW1lIiwidm9sdW1lIiwidW5kZWZpbmVkIiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsIkF1ZGlvU3RhdGUiLCJTdGF0ZSIsInBsYXkiLCJjbGlwIiwibG9vcCIsImVycm9yIiwibmF0aXZlVXJsIiwic2V0TG9vcCIsInNldFZvbHVtZSIsImF1ZGlvSUQiLCJpc0xvb3AiLCJnZXRMb29wIiwiZ2V0Vm9sdW1lIiwic2V0Q3VycmVudFRpbWUiLCJzZWMiLCJnZXRDdXJyZW50VGltZSIsImdldER1cmF0aW9uIiwiZ2V0U3RhdGUiLCJFUlJPUiIsInNldEZpbmlzaENhbGxiYWNrIiwicGF1c2UiLCJfcGF1c2VJRENhY2hlIiwicGF1c2VBbGwiLCJzdGF0ZSIsIlBMQVlJTkciLCJyZXN1bWUiLCJyZXN1bWVBbGwiLCJpIiwic3RvcEFsbCIsInNldE1heEF1ZGlvSW5zdGFuY2UiLCJudW0iLCJDQ19ERUJVRyIsIndhcm4iLCJnZXRNYXhBdWRpb0luc3RhbmNlIiwidW5jYWNoZSIsImZpbGVQYXRoIiwid2FybklEIiwidW5jYWNoZUFsbCIsIl9icmVha0NhY2hlIiwiX2JyZWFrIiwiX3Jlc3RvcmUiLCJfbXVzaWMiLCJfZWZmZWN0IiwicGF1c2VDYWNoZSIsInBsYXlNdXNpYyIsIm11c2ljIiwic3RvcE11c2ljIiwicGF1c2VNdXNpYyIsInJlc3VtZU11c2ljIiwiZ2V0TXVzaWNWb2x1bWUiLCJzZXRNdXNpY1ZvbHVtZSIsImlzTXVzaWNQbGF5aW5nIiwicGxheUVmZmVjdCIsInNldEVmZmVjdHNWb2x1bWUiLCJtdXNpY0lkIiwiZ2V0RWZmZWN0c1ZvbHVtZSIsInBhdXNlRWZmZWN0IiwicGF1c2VBbGxFZmZlY3RzIiwiZWZmZWN0IiwicmVzdW1lRWZmZWN0IiwicmVzdW1lQWxsRWZmZWN0cyIsInBhdXNlSURDYWNoZSIsInN0b3BFZmZlY3QiLCJzdG9wQWxsRWZmZWN0cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUFyQjs7QUFDQSxJQUFNQyxTQUFTLEdBQUdELE9BQU8sQ0FBQyw0QkFBRCxDQUF6Qjs7QUFDQSxJQUFNRSxFQUFFLEdBQUdDLEVBQUUsQ0FBQ0QsRUFBZDtBQUVBLElBQUlFLFdBQVcsR0FBRyxDQUFsQjs7QUFDQSxJQUFJQyxTQUFTLEdBQUdILEVBQUUsQ0FBQ0ksU0FBSCxDQUFhLElBQWIsQ0FBaEI7O0FBQ0EsSUFBSUMsT0FBTyxHQUFHLEVBQWQ7QUFDQSxJQUFJQyxVQUFVLEdBQUcsRUFBakI7O0FBRUEsSUFBSUMsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBVUMsS0FBVixFQUFpQjtBQUNoQztBQUNBLE1BQUksQ0FBQ0EsS0FBSyxDQUFDQyxxQkFBWCxFQUFrQztBQUM5QjtBQUNIOztBQUNERCxFQUFBQSxLQUFLLENBQUNF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LENBQUNvQixXQUFILEdBQWlCQSxXQUFsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDA4LTIwMTAgUmljYXJkbyBRdWVzYWRhXG4gQ29weXJpZ2h0IChjKSAyMDExLTIwMTIgY29jb3MyZC14Lm9yZ1xuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgQXVkaW8gPSByZXF1aXJlKCcuL0NDQXVkaW8nKTtcbmNvbnN0IEF1ZGlvQ2xpcCA9IHJlcXVpcmUoJy4uL2NvcmUvYXNzZXRzL0NDQXVkaW9DbGlwJyk7XG5jb25zdCBqcyA9IGNjLmpzO1xuXG5sZXQgX2luc3RhbmNlSWQgPSAwO1xubGV0IF9pZDJhdWRpbyA9IGpzLmNyZWF0ZU1hcCh0cnVlKTtcbmxldCBfdXJsMmlkID0ge307XG5sZXQgX2F1ZGlvUG9vbCA9IFtdO1xuXG5sZXQgcmVjeWNsZUF1ZGlvID0gZnVuY3Rpb24gKGF1ZGlvKSB7XG4gICAgLy8gSW4gY2FzZSByZXBlYXRseSByZWN5Y2xlIGF1ZGlvIHdoZW4gdXNlcnMgY2FsbCBhdWRpby5zdG9wIHdoZW4gYXVkaW8gZmluaXNoIHBsYXlpbmdcbiAgICBpZiAoIWF1ZGlvLl9zaG91bGRSZWN5Y2xlT25FbmRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGF1ZGlvLl9maW5pc2hDYWxsYmFjayA9IG51bGw7XG4gICAgYXVkaW8ub2ZmKCdlbmRlZCcpO1xuICAgIGF1ZGlvLm9mZignc3RvcCcpO1xuICAgIGF1ZGlvLnNyYyA9IG51bGw7XG4gICAgLy8gSW4gY2FzZSByZXBlYXRseSByZWN5Y2xlIGF1ZGlvXG4gICAgaWYgKCFfYXVkaW9Qb29sLmluY2x1ZGVzKGF1ZGlvKSkge1xuICAgICAgICBpZiAoX2F1ZGlvUG9vbC5sZW5ndGggPCAzMikge1xuICAgICAgICAgICAgX2F1ZGlvUG9vbC5wdXNoKGF1ZGlvKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF1ZGlvLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhdWRpby5fc2hvdWxkUmVjeWNsZU9uRW5kZWQgPSBmYWxzZTtcbn07XG5cbmxldCBnZXRBdWRpb0Zyb21QYXRoID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICB2YXIgaWQgPSBfaW5zdGFuY2VJZCsrO1xuICAgIHZhciBsaXN0ID0gX3VybDJpZFtwYXRoXTtcbiAgICBpZiAoIWxpc3QpIHtcbiAgICAgICAgbGlzdCA9IF91cmwyaWRbcGF0aF0gPSBbXTtcbiAgICB9XG4gICAgaWYgKGF1ZGlvRW5naW5lLl9tYXhBdWRpb0luc3RhbmNlIDw9IGxpc3QubGVuZ3RoKSB7XG4gICAgICAgIHZhciBvbGRJZCA9IGxpc3Quc2hpZnQoKTtcbiAgICAgICAgdmFyIG9sZEF1ZGlvID0gZ2V0QXVkaW9Gcm9tSWQob2xkSWQpO1xuICAgICAgICAvLyBTdG9wIHdpbGwgcmVjeWNsZSBhdWRpbyBhdXRvbWF0aWNhbGx5IGJ5IGV2ZW50IGNhbGxiYWNrXG4gICAgICAgIG9sZEF1ZGlvLnN0b3AoKTtcbiAgICB9XG5cbiAgICB2YXIgYXVkaW8gPSBfYXVkaW9Qb29sLnBvcCgpIHx8IG5ldyBBdWRpbygpO1xuICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGF1ZGlvSW5MaXN0ID0gZ2V0QXVkaW9Gcm9tSWQodGhpcy5pZCk7XG4gICAgICAgIGlmIChhdWRpb0luTGlzdCkge1xuICAgICAgICAgICAgZGVsZXRlIF9pZDJhdWRpb1t0aGlzLmlkXTtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGxpc3QuaW5kZXhPZih0aGlzLmlkKTtcbiAgICAgICAgICAgIGNjLmpzLmFycmF5LmZhc3RSZW1vdmVBdChsaXN0LCBpbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVjeWNsZUF1ZGlvKHRoaXMpO1xuICAgIH07XG5cbiAgICBhdWRpby5vbignZW5kZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9maW5pc2hDYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5fZmluaXNoQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMpO1xuICAgIH0sIGF1ZGlvKTtcblxuICAgIGF1ZGlvLm9uKCdzdG9wJywgY2FsbGJhY2ssIGF1ZGlvKTtcbiAgICBhdWRpby5pZCA9IGlkO1xuICAgIF9pZDJhdWRpb1tpZF0gPSBhdWRpbztcbiAgICBsaXN0LnB1c2goaWQpO1xuXG4gICAgcmV0dXJuIGF1ZGlvO1xufTtcblxubGV0IGdldEF1ZGlvRnJvbUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgcmV0dXJuIF9pZDJhdWRpb1tpZF07XG59O1xuXG5sZXQgaGFuZGxlVm9sdW1lICA9IGZ1bmN0aW9uICh2b2x1bWUpIHtcbiAgICBpZiAodm9sdW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gc2V0IGRlZmF1bHQgdm9sdW1lIGFzIDFcbiAgICAgICAgdm9sdW1lID0gMTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHZvbHVtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdm9sdW1lID0gTnVtYmVyLnBhcnNlRmxvYXQodm9sdW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHZvbHVtZTtcbn07XG5cbi8qKlxuICogISNlbiBjYy5hdWRpb0VuZ2luZSBpcyB0aGUgc2luZ2xldG9uIG9iamVjdCwgaXQgcHJvdmlkZSBzaW1wbGUgYXVkaW8gQVBJcy5cbiAqICEjemhcbiAqIGNjLmF1ZGlvZW5naW5l5piv5Y2V5L6L5a+56LGh44CCPGJyLz5cbiAqIOS4u+imgeeUqOadpeaSreaUvumfs+mike+8jOaSreaUvueahOaXtuWAmeS8mui/lOWbnuS4gOS4qiBhdWRpb0lE77yM5LmL5ZCO6YO95Y+v5Lul6YCa6L+H6L+Z5LiqIGF1ZGlvSUQg5p2l5pON5L2c6L+Z5Liq6Z+z6aKR5a+56LGh44CCPGJyLz5cbiAqIOS4jeS9v+eUqOeahOaXtuWAme+8jOivt+S9v+eUqCBjYy5hdWRpb0VuZ2luZS51bmNhY2hlKGZpbGVQYXRoKTsg6L+b6KGM6LWE5rqQ6YeK5pS+IDxici8+XG4gKiDms6jmhI/vvJo8YnIvPlxuICog5ZyoIEFuZHJvaWQg57O757uf5rWP6KeI5Zmo5LiK77yM5LiN5ZCM5rWP6KeI5Zmo77yM5LiN5ZCM54mI5pys55qE5pWI5p6c5LiN5bC955u45ZCM44CCPGJyLz5cbiAqIOavlOWmguivtO+8muWkp+WkmuaVsOa1j+iniOWZqOmDvemcgOimgeeUqOaIt+eJqeeQhuS6pOS6kuaJjeWPr+S7peW8gOWni+aSreaUvumfs+aViO+8jOacieS4gOS6m+S4jeaUr+aMgSBXZWJBdWRpb++8jDxici8+XG4gKiDmnInkuIDkupvkuI3mlK/mjIHlpJrpn7Povajmkq3mlL7jgILmgLvkuYvlpoLmnpzlr7npn7PkuZDkvp3otZbmr5TovoPlvLrvvIzor7flgZrlsL3lj6/og73lpJrnmoTmtYvor5XjgIJcbiAqIEBjbGFzcyBhdWRpb0VuZ2luZVxuICogQHN0YXRpY1xuICovXG52YXIgYXVkaW9FbmdpbmUgPSB7XG5cbiAgICBBdWRpb1N0YXRlOiBBdWRpby5TdGF0ZSxcblxuICAgIF9tYXhBdWRpb0luc3RhbmNlOiAyNCxcblxuICAgIF9pZDJhdWRpbzogX2lkMmF1ZGlvLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBQbGF5IGF1ZGlvLlxuICAgICAqICEjemgg5pKt5pS+6Z+z6aKRXG4gICAgICogQG1ldGhvZCBwbGF5XG4gICAgICogQHBhcmFtIHtBdWRpb0NsaXB9IGNsaXAgLSBUaGUgYXVkaW8gY2xpcCB0byBwbGF5LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gbG9vcCAtIFdoZXRoZXIgdGhlIG11c2ljIGxvb3Agb3Igbm90LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2b2x1bWUgLSBWb2x1bWUgc2l6ZS5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGF1ZGlvSWRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLnJlc291cmNlcy5sb2FkKHBhdGgsIGNjLkF1ZGlvQ2xpcCwgbnVsbCwgZnVuY3Rpb24gKGVyciwgY2xpcCkge1xuICAgICAqICAgICB2YXIgYXVkaW9JRCA9IGNjLmF1ZGlvRW5naW5lLnBsYXkoY2xpcCwgZmFsc2UsIDAuNSk7XG4gICAgICogfSk7XG4gICAgICovXG4gICAgcGxheTogZnVuY3Rpb24gKGNsaXAsIGxvb3AsIHZvbHVtZSkge1xuICAgICAgICBpZiAoIShjbGlwIGluc3RhbmNlb2YgQXVkaW9DbGlwKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNjLmVycm9yKCdXcm9uZyB0eXBlIG9mIEF1ZGlvQ2xpcC4nKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGF0aCA9IGNsaXAubmF0aXZlVXJsO1xuICAgICAgICBsZXQgYXVkaW8gPSBnZXRBdWRpb0Zyb21QYXRoKHBhdGgpO1xuICAgICAgICBhdWRpby5zcmMgPSBjbGlwO1xuICAgICAgICBhdWRpby5fc2hvdWxkUmVjeWNsZU9uRW5kZWQgPSB0cnVlO1xuICAgICAgICBhdWRpby5zZXRMb29wKGxvb3AgfHwgZmFsc2UpO1xuICAgICAgICB2b2x1bWUgPSBoYW5kbGVWb2x1bWUodm9sdW1lKTtcbiAgICAgICAgYXVkaW8uc2V0Vm9sdW1lKHZvbHVtZSk7XG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgcmV0dXJuIGF1ZGlvLmlkO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldCBhdWRpbyBsb29wLlxuICAgICAqICEjemgg6K6+572u6Z+z6aKR5piv5ZCm5b6q546v44CCXG4gICAgICogQG1ldGhvZCBzZXRMb29wXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGF1ZGlvSUQgLSBhdWRpbyBpZC5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGxvb3AgLSBXaGV0aGVyIGN5Y2xlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXVkaW9FbmdpbmUuc2V0TG9vcChpZCwgdHJ1ZSk7XG4gICAgICovXG4gICAgc2V0TG9vcDogZnVuY3Rpb24gKGF1ZGlvSUQsIGxvb3ApIHtcbiAgICAgICAgdmFyIGF1ZGlvID0gZ2V0QXVkaW9Gcm9tSWQoYXVkaW9JRCk7XG4gICAgICAgIGlmICghYXVkaW8gfHwgIWF1ZGlvLnNldExvb3ApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGF1ZGlvLnNldExvb3AobG9vcCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0IGF1ZGlvIGN5Y2xlIHN0YXRlLlxuICAgICAqICEjemgg6I635Y+W6Z+z6aKR55qE5b6q546v54q25oCB44CCXG4gICAgICogQG1ldGhvZCBpc0xvb3BcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYXVkaW9JRCAtIGF1ZGlvIGlkLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFdoZXRoZXIgY3ljbGUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5pc0xvb3AoaWQpO1xuICAgICAqL1xuICAgIGlzTG9vcDogZnVuY3Rpb24gKGF1ZGlvSUQpIHtcbiAgICAgICAgdmFyIGF1ZGlvID0gZ2V0QXVkaW9Gcm9tSWQoYXVkaW9JRCk7XG4gICAgICAgIGlmICghYXVkaW8gfHwgIWF1ZGlvLmdldExvb3ApXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiBhdWRpby5nZXRMb29wKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHRoZSB2b2x1bWUgb2YgYXVkaW8uXG4gICAgICogISN6aCDorr7nva7pn7Pph4/vvIgwLjAgfiAxLjDvvInjgIJcbiAgICAgKiBAbWV0aG9kIHNldFZvbHVtZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhdWRpb0lEIC0gYXVkaW8gaWQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZvbHVtZSAtIFZvbHVtZSBtdXN0IGJlIGluIDAuMH4xLjAgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXVkaW9FbmdpbmUuc2V0Vm9sdW1lKGlkLCAwLjUpO1xuICAgICAqL1xuICAgIHNldFZvbHVtZTogZnVuY3Rpb24gKGF1ZGlvSUQsIHZvbHVtZSkge1xuICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChhdWRpb0lEKTtcbiAgICAgICAgaWYgKGF1ZGlvKSB7XG4gICAgICAgICAgICBhdWRpby5zZXRWb2x1bWUodm9sdW1lKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSB2b2x1bWUgb2YgdGhlIG11c2ljIG1heCB2YWx1ZSBpcyAxLjAsdGhlIG1pbiB2YWx1ZSBpcyAwLjAgLlxuICAgICAqICEjemgg6I635Y+W6Z+z6YeP77yIMC4wIH4gMS4w77yJ44CCXG4gICAgICogQG1ldGhvZCBnZXRWb2x1bWVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYXVkaW9JRCAtIGF1ZGlvIGlkLlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciB2b2x1bWUgPSBjYy5hdWRpb0VuZ2luZS5nZXRWb2x1bWUoaWQpO1xuICAgICAqL1xuICAgIGdldFZvbHVtZTogZnVuY3Rpb24gKGF1ZGlvSUQpIHtcbiAgICAgICAgdmFyIGF1ZGlvID0gZ2V0QXVkaW9Gcm9tSWQoYXVkaW9JRCk7XG4gICAgICAgIHJldHVybiBhdWRpbyA/IGF1ZGlvLmdldFZvbHVtZSgpIDogMTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgY3VycmVudCB0aW1lXG4gICAgICogISN6aCDorr7nva7lvZPliY3nmoTpn7PpopHml7bpl7TjgIJcbiAgICAgKiBAbWV0aG9kIHNldEN1cnJlbnRUaW1lXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGF1ZGlvSUQgLSBhdWRpbyBpZC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc2VjIC0gY3VycmVudCB0aW1lLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5zZXRDdXJyZW50VGltZShpZCwgMik7XG4gICAgICovXG4gICAgc2V0Q3VycmVudFRpbWU6IGZ1bmN0aW9uIChhdWRpb0lELCBzZWMpIHtcbiAgICAgICAgdmFyIGF1ZGlvID0gZ2V0QXVkaW9Gcm9tSWQoYXVkaW9JRCk7XG4gICAgICAgIGlmIChhdWRpbykge1xuICAgICAgICAgICAgYXVkaW8uc2V0Q3VycmVudFRpbWUoc2VjKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0IGN1cnJlbnQgdGltZVxuICAgICAqICEjemgg6I635Y+W5b2T5YmN55qE6Z+z6aKR5pKt5pS+5pe26Ze044CCXG4gICAgICogQG1ldGhvZCBnZXRDdXJyZW50VGltZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhdWRpb0lEIC0gYXVkaW8gaWQuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBhdWRpbyBjdXJyZW50IHRpbWUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgdGltZSA9IGNjLmF1ZGlvRW5naW5lLmdldEN1cnJlbnRUaW1lKGlkKTtcbiAgICAgKi9cbiAgICBnZXRDdXJyZW50VGltZTogZnVuY3Rpb24gKGF1ZGlvSUQpIHtcbiAgICAgICAgdmFyIGF1ZGlvID0gZ2V0QXVkaW9Gcm9tSWQoYXVkaW9JRCk7XG4gICAgICAgIHJldHVybiBhdWRpbyA/IGF1ZGlvLmdldEN1cnJlbnRUaW1lKCkgOiAwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldCBhdWRpbyBkdXJhdGlvblxuICAgICAqICEjemgg6I635Y+W6Z+z6aKR5oC75pe26ZW/44CCXG4gICAgICogQG1ldGhvZCBnZXREdXJhdGlvblxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhdWRpb0lEIC0gYXVkaW8gaWQuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBhdWRpbyBkdXJhdGlvbi5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciB0aW1lID0gY2MuYXVkaW9FbmdpbmUuZ2V0RHVyYXRpb24oaWQpO1xuICAgICAqL1xuICAgIGdldER1cmF0aW9uOiBmdW5jdGlvbiAoYXVkaW9JRCkge1xuICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChhdWRpb0lEKTtcbiAgICAgICAgcmV0dXJuIGF1ZGlvID8gYXVkaW8uZ2V0RHVyYXRpb24oKSA6IDA7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0IGF1ZGlvIHN0YXRlXG4gICAgICogISN6aCDojrflj5bpn7PpopHnirbmgIHjgIJcbiAgICAgKiBAbWV0aG9kIGdldFN0YXRlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGF1ZGlvSUQgLSBhdWRpbyBpZC5cbiAgICAgKiBAcmV0dXJuIHthdWRpb0VuZ2luZS5BdWRpb1N0YXRlfSBhdWRpbyBkdXJhdGlvbi5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBzdGF0ZSA9IGNjLmF1ZGlvRW5naW5lLmdldFN0YXRlKGlkKTtcbiAgICAgKi9cbiAgICBnZXRTdGF0ZTogZnVuY3Rpb24gKGF1ZGlvSUQpIHtcbiAgICAgICAgdmFyIGF1ZGlvID0gZ2V0QXVkaW9Gcm9tSWQoYXVkaW9JRCk7XG4gICAgICAgIHJldHVybiBhdWRpbyA/IGF1ZGlvLmdldFN0YXRlKCkgOiB0aGlzLkF1ZGlvU3RhdGUuRVJST1I7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IEF1ZGlvIGZpbmlzaCBjYWxsYmFja1xuICAgICAqICEjemgg6K6+572u5LiA5Liq6Z+z6aKR57uT5p2f5ZCO55qE5Zue6LCDXG4gICAgICogQG1ldGhvZCBzZXRGaW5pc2hDYWxsYmFja1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhdWRpb0lEIC0gYXVkaW8gaWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBsb2FkZWQgY2FsbGJhY2suXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5zZXRGaW5pc2hDYWxsYmFjayhpZCwgZnVuY3Rpb24gKCkge30pO1xuICAgICAqL1xuICAgIHNldEZpbmlzaENhbGxiYWNrOiBmdW5jdGlvbiAoYXVkaW9JRCwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGF1ZGlvID0gZ2V0QXVkaW9Gcm9tSWQoYXVkaW9JRCk7XG4gICAgICAgIGlmICghYXVkaW8pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGF1ZGlvLl9maW5pc2hDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFBhdXNlIHBsYXlpbmcgYXVkaW8uXG4gICAgICogISN6aCDmmoLlgZzmraPlnKjmkq3mlL7pn7PpopHjgIJcbiAgICAgKiBAbWV0aG9kIHBhdXNlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGF1ZGlvSUQgLSBUaGUgcmV0dXJuIHZhbHVlIG9mIGZ1bmN0aW9uIHBsYXkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5wYXVzZShhdWRpb0lEKTtcbiAgICAgKi9cbiAgICBwYXVzZTogZnVuY3Rpb24gKGF1ZGlvSUQpIHtcbiAgICAgICAgdmFyIGF1ZGlvID0gZ2V0QXVkaW9Gcm9tSWQoYXVkaW9JRCk7XG4gICAgICAgIGlmIChhdWRpbykge1xuICAgICAgICAgICAgYXVkaW8ucGF1c2UoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9wYXVzZUlEQ2FjaGU6IFtdLFxuICAgIC8qKlxuICAgICAqICEjZW4gUGF1c2UgYWxsIHBsYXlpbmcgYXVkaW9cbiAgICAgKiAhI3poIOaaguWBnOeOsOWcqOato+WcqOaSreaUvueahOaJgOaciemfs+mikeOAglxuICAgICAqIEBtZXRob2QgcGF1c2VBbGxcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnBhdXNlQWxsKCk7XG4gICAgICovXG4gICAgcGF1c2VBbGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaWQgaW4gX2lkMmF1ZGlvKSB7XG4gICAgICAgICAgICB2YXIgYXVkaW8gPSBfaWQyYXVkaW9baWRdO1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gYXVkaW8uZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gQXVkaW8uU3RhdGUuUExBWUlORykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhdXNlSURDYWNoZS5wdXNoKGlkKTtcbiAgICAgICAgICAgICAgICBhdWRpby5wYXVzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmVzdW1lIHBsYXlpbmcgYXVkaW8uXG4gICAgICogISN6aCDmgaLlpI3mkq3mlL7mjIflrprnmoTpn7PpopHjgIJcbiAgICAgKiBAbWV0aG9kIHJlc3VtZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhdWRpb0lEIC0gVGhlIHJldHVybiB2YWx1ZSBvZiBmdW5jdGlvbiBwbGF5LlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXVkaW9FbmdpbmUucmVzdW1lKGF1ZGlvSUQpO1xuICAgICAqL1xuICAgIHJlc3VtZTogZnVuY3Rpb24gKGF1ZGlvSUQpIHtcbiAgICAgICAgdmFyIGF1ZGlvID0gZ2V0QXVkaW9Gcm9tSWQoYXVkaW9JRCk7XG4gICAgICAgIGlmIChhdWRpbykge1xuICAgICAgICAgICAgYXVkaW8ucmVzdW1lKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXN1bWUgYWxsIHBsYXlpbmcgYXVkaW8uXG4gICAgICogISN6aCDmgaLlpI3mkq3mlL7miYDmnInkuYvliY3mmoLlgZznmoTmiYDmnInpn7PpopHjgIJcbiAgICAgKiBAbWV0aG9kIHJlc3VtZUFsbFxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXVkaW9FbmdpbmUucmVzdW1lQWxsKCk7XG4gICAgICovXG4gICAgcmVzdW1lQWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fcGF1c2VJRENhY2hlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSB0aGlzLl9wYXVzZUlEQ2FjaGVbaV07XG4gICAgICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChpZCk7XG4gICAgICAgICAgICBpZiAoYXVkaW8pXG4gICAgICAgICAgICAgICAgYXVkaW8ucmVzdW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcGF1c2VJRENhY2hlLmxlbmd0aCA9IDA7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU3RvcCBwbGF5aW5nIGF1ZGlvLlxuICAgICAqICEjemgg5YGc5q2i5pKt5pS+5oyH5a6a6Z+z6aKR44CCXG4gICAgICogQG1ldGhvZCBzdG9wXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGF1ZGlvSUQgLSBUaGUgcmV0dXJuIHZhbHVlIG9mIGZ1bmN0aW9uIHBsYXkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5zdG9wKGF1ZGlvSUQpO1xuICAgICAqL1xuICAgIHN0b3A6IGZ1bmN0aW9uIChhdWRpb0lEKSB7XG4gICAgICAgIHZhciBhdWRpbyA9IGdldEF1ZGlvRnJvbUlkKGF1ZGlvSUQpO1xuICAgICAgICBpZiAoYXVkaW8pIHtcbiAgICAgICAgICAgIC8vIFN0b3Agd2lsbCByZWN5Y2xlIGF1ZGlvIGF1dG9tYXRpY2FsbHkgYnkgZXZlbnQgY2FsbGJhY2tcbiAgICAgICAgICAgIGF1ZGlvLnN0b3AoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU3RvcCBhbGwgcGxheWluZyBhdWRpby5cbiAgICAgKiAhI3poIOWBnOatouato+WcqOaSreaUvueahOaJgOaciemfs+mikeOAglxuICAgICAqIEBtZXRob2Qgc3RvcEFsbFxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xuICAgICAqL1xuICAgIHN0b3BBbGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaWQgaW4gX2lkMmF1ZGlvKSB7XG4gICAgICAgICAgICB2YXIgYXVkaW8gPSBfaWQyYXVkaW9baWRdO1xuICAgICAgICAgICAgaWYgKGF1ZGlvKSB7XG4gICAgICAgICAgICAgICAgLy8gU3RvcCB3aWxsIHJlY3ljbGUgYXVkaW8gYXV0b21hdGljYWxseSBieSBldmVudCBjYWxsYmFja1xuICAgICAgICAgICAgICAgIGF1ZGlvLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldCB1cCBhbiBhdWRpbyBjYW4gZ2VuZXJhdGUgYSBmZXcgZXhhbXBsZXMuXG4gICAgICogISN6aCDorr7nva7kuIDkuKrpn7PpopHlj6/ku6Xorr7nva7lh6DkuKrlrp7kvotcbiAgICAgKiBAbWV0aG9kIHNldE1heEF1ZGlvSW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbnVtIC0gYSBudW1iZXIgb2YgaW5zdGFuY2VzIHRvIGJlIGNyZWF0ZWQgZnJvbSB3aXRoaW4gYW4gYXVkaW9cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnNldE1heEF1ZGlvSW5zdGFuY2UoMjApO1xuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjQuMFxuICAgICAqL1xuICAgIHNldE1heEF1ZGlvSW5zdGFuY2U6IGZ1bmN0aW9uIChudW0pIHtcbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICBjYy53YXJuKCdTaW5jZSB2Mi40LjAsIG1heEF1ZGlvSW5zdGFuY2UgaGFzIGJlY29tZSBhIHJlYWQgb25seSBwcm9wZXJ0eS5cXG4nXG4gICAgICAgICAgICArICdhdWRpb0VuZ2luZS5zZXRNYXhBdWRpb0luc3RhbmNlKCkgbWV0aG9kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXR0aW5nIGF1ZGlvIGNhbiBwcm9kdWNlIHNldmVyYWwgZXhhbXBsZXMuXG4gICAgICogISN6aCDojrflj5bkuIDkuKrpn7PpopHlj6/ku6Xorr7nva7lh6DkuKrlrp7kvotcbiAgICAgKiBAbWV0aG9kIGdldE1heEF1ZGlvSW5zdGFuY2VcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IG1heCBudW1iZXIgb2YgaW5zdGFuY2VzIHRvIGJlIGNyZWF0ZWQgZnJvbSB3aXRoaW4gYW4gYXVkaW9cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmF1ZGlvRW5naW5lLmdldE1heEF1ZGlvSW5zdGFuY2UoKTtcbiAgICAgKi9cbiAgICBnZXRNYXhBdWRpb0luc3RhbmNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhBdWRpb0luc3RhbmNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFVubG9hZCB0aGUgcHJlbG9hZGVkIGF1ZGlvIGZyb20gaW50ZXJuYWwgYnVmZmVyLlxuICAgICAqICEjemgg5Y246L296aKE5Yqg6L2955qE6Z+z6aKR44CCXG4gICAgICogQG1ldGhvZCB1bmNhY2hlXG4gICAgICogQHBhcmFtIHtBdWRpb0NsaXB9IGNsaXBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnVuY2FjaGUoZmlsZVBhdGgpO1xuICAgICAqL1xuICAgIHVuY2FjaGU6IGZ1bmN0aW9uIChjbGlwKSB7XG4gICAgICAgIHZhciBmaWxlUGF0aCA9IGNsaXA7XG4gICAgICAgIGlmICh0eXBlb2YgY2xpcCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8vIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgc2luY2UgMS4xMFxuICAgICAgICAgICAgY2Mud2FybklEKDg0MDEsICdjYy5hdWRpb0VuZ2luZScsICdjYy5BdWRpb0NsaXAnLCAnQXVkaW9DbGlwJywgJ2NjLkF1ZGlvQ2xpcCcsICdhdWRpbycpO1xuICAgICAgICAgICAgZmlsZVBhdGggPSBjbGlwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFjbGlwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlsZVBhdGggPSBjbGlwLm5hdGl2ZVVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsaXN0ID0gX3VybDJpZFtmaWxlUGF0aF07XG4gICAgICAgIGlmICghbGlzdCkgcmV0dXJuO1xuICAgICAgICB3aGlsZSAobGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSBsaXN0LnBvcCgpO1xuICAgICAgICAgICAgdmFyIGF1ZGlvID0gX2lkMmF1ZGlvW2lkXTtcbiAgICAgICAgICAgIGlmIChhdWRpbykge1xuICAgICAgICAgICAgICAgIC8vIFN0b3Agd2lsbCByZWN5Y2xlIGF1ZGlvIGF1dG9tYXRpY2FsbHkgYnkgZXZlbnQgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBhdWRpby5zdG9wKCk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIF9pZDJhdWRpb1tpZF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBVbmxvYWQgYWxsIGF1ZGlvIGZyb20gaW50ZXJuYWwgYnVmZmVyLlxuICAgICAqICEjemgg5Y246L295omA5pyJ6Z+z6aKR44CCXG4gICAgICogQG1ldGhvZCB1bmNhY2hlQWxsXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS51bmNhY2hlQWxsKCk7XG4gICAgICovXG4gICAgdW5jYWNoZUFsbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnN0b3BBbGwoKTtcbiAgICAgICAgbGV0IGF1ZGlvO1xuICAgICAgICBmb3IgKGxldCBpZCBpbiBfaWQyYXVkaW8pIHtcbiAgICAgICAgICAgIGF1ZGlvID0gX2lkMmF1ZGlvW2lkXTtcbiAgICAgICAgICAgIGlmIChhdWRpbykge1xuICAgICAgICAgICAgICAgIGF1ZGlvLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoYXVkaW8gPSBfYXVkaW9Qb29sLnBvcCgpKSB7XG4gICAgICAgICAgICBhdWRpby5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgX2lkMmF1ZGlvID0ganMuY3JlYXRlTWFwKHRydWUpO1xuICAgICAgICBfdXJsMmlkID0ge307XG4gICAgfSxcblxuICAgIF9icmVha0NhY2hlOiBudWxsLFxuICAgIF9icmVhazogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9icmVha0NhY2hlID0gW107XG4gICAgICAgIGZvciAodmFyIGlkIGluIF9pZDJhdWRpbykge1xuICAgICAgICAgICAgdmFyIGF1ZGlvID0gX2lkMmF1ZGlvW2lkXTtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IGF1ZGlvLmdldFN0YXRlKCk7XG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IEF1ZGlvLlN0YXRlLlBMQVlJTkcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9icmVha0NhY2hlLnB1c2goaWQpO1xuICAgICAgICAgICAgICAgIGF1ZGlvLnBhdXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3Jlc3RvcmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9icmVha0NhY2hlKSByZXR1cm47XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuX2JyZWFrQ2FjaGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIGlkID0gdGhpcy5fYnJlYWtDYWNoZS5wb3AoKTtcbiAgICAgICAgICAgIHZhciBhdWRpbyA9IGdldEF1ZGlvRnJvbUlkKGlkKTtcbiAgICAgICAgICAgIGlmIChhdWRpbyAmJiBhdWRpby5yZXN1bWUpXG4gICAgICAgICAgICAgICAgYXVkaW8ucmVzdW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYnJlYWtDYWNoZSA9IG51bGw7XG4gICAgfSxcblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBDbGFzc2lmaWNhdGlvbiBvZiBpbnRlcmZhY2VcblxuICAgIF9tdXNpYzoge1xuICAgICAgICBpZDogLTEsXG4gICAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgICB2b2x1bWU6IDEsXG4gICAgfSxcblxuICAgIF9lZmZlY3Q6IHtcbiAgICAgICAgdm9sdW1lOiAxLFxuICAgICAgICBwYXVzZUNhY2hlOiBbXSxcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBQbGF5IGJhY2tncm91bmQgbXVzaWNcbiAgICAgKiAhI3poIOaSreaUvuiDjOaZr+mfs+S5kFxuICAgICAqIEBtZXRob2QgcGxheU11c2ljXG4gICAgICogQHBhcmFtIHtBdWRpb0NsaXB9IGNsaXAgLSBUaGUgYXVkaW8gY2xpcCB0byBwbGF5LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gbG9vcCAtIFdoZXRoZXIgdGhlIG11c2ljIGxvb3Agb3Igbm90LlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gYXVkaW9JZFxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MucmVzb3VyY2VzLmxvYWQocGF0aCwgY2MuQXVkaW9DbGlwLCBudWxsLCBmdW5jdGlvbiAoZXJyLCBjbGlwKSB7XG4gICAgICogICAgIHZhciBhdWRpb0lEID0gY2MuYXVkaW9FbmdpbmUucGxheU11c2ljKGNsaXAsIGZhbHNlKTtcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICBwbGF5TXVzaWM6IGZ1bmN0aW9uIChjbGlwLCBsb29wKSB7XG4gICAgICAgIHZhciBtdXNpYyA9IHRoaXMuX211c2ljO1xuICAgICAgICB0aGlzLnN0b3AobXVzaWMuaWQpO1xuICAgICAgICBtdXNpYy5pZCA9IHRoaXMucGxheShjbGlwLCBsb29wLCBtdXNpYy52b2x1bWUpO1xuICAgICAgICBtdXNpYy5sb29wID0gbG9vcDtcbiAgICAgICAgcmV0dXJuIG11c2ljLmlkO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFN0b3AgYmFja2dyb3VuZCBtdXNpYy5cbiAgICAgKiAhI3poIOWBnOatouaSreaUvuiDjOaZr+mfs+S5kOOAglxuICAgICAqIEBtZXRob2Qgc3RvcE11c2ljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5zdG9wTXVzaWMoKTtcbiAgICAgKi9cbiAgICBzdG9wTXVzaWM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zdG9wKHRoaXMuX211c2ljLmlkKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBQYXVzZSB0aGUgYmFja2dyb3VuZCBtdXNpYy5cbiAgICAgKiAhI3poIOaaguWBnOaSreaUvuiDjOaZr+mfs+S5kOOAglxuICAgICAqIEBtZXRob2QgcGF1c2VNdXNpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXVkaW9FbmdpbmUucGF1c2VNdXNpYygpO1xuICAgICAqL1xuICAgIHBhdXNlTXVzaWM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSh0aGlzLl9tdXNpYy5pZCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9tdXNpYy5pZDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXN1bWUgcGxheWluZyBiYWNrZ3JvdW5kIG11c2ljLlxuICAgICAqICEjemgg5oGi5aSN5pKt5pS+6IOM5pmv6Z+z5LmQ44CCXG4gICAgICogQG1ldGhvZCByZXN1bWVNdXNpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXVkaW9FbmdpbmUucmVzdW1lTXVzaWMoKTtcbiAgICAgKi9cbiAgICByZXN1bWVNdXNpYzogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlc3VtZSh0aGlzLl9tdXNpYy5pZCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9tdXNpYy5pZDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgdGhlIHZvbHVtZSgwLjAgfiAxLjApLlxuICAgICAqICEjemgg6I635Y+W6Z+z6YeP77yIMC4wIH4gMS4w77yJ44CCXG4gICAgICogQG1ldGhvZCBnZXRNdXNpY1ZvbHVtZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciB2b2x1bWUgPSBjYy5hdWRpb0VuZ2luZS5nZXRNdXNpY1ZvbHVtZSgpO1xuICAgICAqL1xuICAgIGdldE11c2ljVm9sdW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tdXNpYy52b2x1bWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHRoZSBiYWNrZ3JvdW5kIG11c2ljIHZvbHVtZS5cbiAgICAgKiAhI3poIOiuvue9ruiDjOaZr+mfs+S5kOmfs+mHj++8iDAuMCB+IDEuMO+8ieOAglxuICAgICAqIEBtZXRob2Qgc2V0TXVzaWNWb2x1bWVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdm9sdW1lIC0gVm9sdW1lIG11c3QgYmUgaW4gMC4wfjEuMC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKDAuNSk7XG4gICAgICovXG4gICAgc2V0TXVzaWNWb2x1bWU6IGZ1bmN0aW9uICh2b2x1bWUpIHtcbiAgICAgICAgdm9sdW1lID0gaGFuZGxlVm9sdW1lKHZvbHVtZSk7XG4gICAgICAgIHZhciBtdXNpYyA9IHRoaXMuX211c2ljO1xuICAgICAgICBtdXNpYy52b2x1bWUgPSB2b2x1bWU7XG4gICAgICAgIHRoaXMuc2V0Vm9sdW1lKG11c2ljLmlkLCBtdXNpYy52b2x1bWUpO1xuICAgICAgICByZXR1cm4gbXVzaWMudm9sdW1lO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEJhY2tncm91bmQgbXVzaWMgcGxheWluZyBzdGF0ZVxuICAgICAqICEjemgg6IOM5pmv6Z+z5LmQ5piv5ZCm5q2j5Zyo5pKt5pS+XG4gICAgICogQG1ldGhvZCBpc011c2ljUGxheWluZ1xuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5pc011c2ljUGxheWluZygpO1xuICAgICAqL1xuICAgIGlzTXVzaWNQbGF5aW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN0YXRlKHRoaXMuX211c2ljLmlkKSA9PT0gdGhpcy5BdWRpb1N0YXRlLlBMQVlJTkc7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGxheSBlZmZlY3QgYXVkaW8uXG4gICAgICogISN6aCDmkq3mlL7pn7PmlYhcbiAgICAgKiBAbWV0aG9kIHBsYXlFZmZlY3RcbiAgICAgKiBAcGFyYW0ge0F1ZGlvQ2xpcH0gY2xpcCAtIFRoZSBhdWRpbyBjbGlwIHRvIHBsYXkuXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBsb29wIC0gV2hldGhlciB0aGUgbXVzaWMgbG9vcCBvciBub3QuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBhdWRpb0lkXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5yZXNvdXJjZXMubG9hZChwYXRoLCBjYy5BdWRpb0NsaXAsIG51bGwsIGZ1bmN0aW9uIChlcnIsIGNsaXApIHtcbiAgICAgKiAgICAgdmFyIGF1ZGlvSUQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KGNsaXAsIGZhbHNlKTtcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICBwbGF5RWZmZWN0OiBmdW5jdGlvbiAoY2xpcCwgbG9vcCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGF5KGNsaXAsIGxvb3AgfHwgZmFsc2UsIHRoaXMuX2VmZmVjdC52b2x1bWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldCB0aGUgdm9sdW1lIG9mIGVmZmVjdCBhdWRpby5cbiAgICAgKiAhI3poIOiuvue9rumfs+aViOmfs+mHj++8iDAuMCB+IDEuMO+8ieOAglxuICAgICAqIEBtZXRob2Qgc2V0RWZmZWN0c1ZvbHVtZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2b2x1bWUgLSBWb2x1bWUgbXVzdCBiZSBpbiAwLjB+MS4wLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXVkaW9FbmdpbmUuc2V0RWZmZWN0c1ZvbHVtZSgwLjUpO1xuICAgICAqL1xuICAgIHNldEVmZmVjdHNWb2x1bWU6IGZ1bmN0aW9uICh2b2x1bWUpIHtcbiAgICAgICAgdm9sdW1lID0gaGFuZGxlVm9sdW1lKHZvbHVtZSk7XG4gICAgICAgIHZhciBtdXNpY0lkID0gdGhpcy5fbXVzaWMuaWQ7XG4gICAgICAgIHRoaXMuX2VmZmVjdC52b2x1bWUgPSB2b2x1bWU7XG4gICAgICAgIGZvciAodmFyIGlkIGluIF9pZDJhdWRpbykge1xuICAgICAgICAgICAgdmFyIGF1ZGlvID0gX2lkMmF1ZGlvW2lkXTtcbiAgICAgICAgICAgIGlmICghYXVkaW8gfHwgYXVkaW8uaWQgPT09IG11c2ljSWQpIGNvbnRpbnVlO1xuICAgICAgICAgICAgYXVkaW9FbmdpbmUuc2V0Vm9sdW1lKGlkLCB2b2x1bWUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHZvbHVtZSBvZiB0aGUgZWZmZWN0IGF1ZGlvIG1heCB2YWx1ZSBpcyAxLjAsdGhlIG1pbiB2YWx1ZSBpcyAwLjAgLlxuICAgICAqICEjemgg6I635Y+W6Z+z5pWI6Z+z6YeP77yIMC4wIH4gMS4w77yJ44CCXG4gICAgICogQG1ldGhvZCBnZXRFZmZlY3RzVm9sdW1lXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHZvbHVtZSA9IGNjLmF1ZGlvRW5naW5lLmdldEVmZmVjdHNWb2x1bWUoKTtcbiAgICAgKi9cbiAgICBnZXRFZmZlY3RzVm9sdW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZmZlY3Qudm9sdW1lO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFBhdXNlIGVmZmVjdCBhdWRpby5cbiAgICAgKiAhI3poIOaaguWBnOaSreaUvumfs+aViOOAglxuICAgICAqIEBtZXRob2QgcGF1c2VFZmZlY3RcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYXVkaW9JRCAtIGF1ZGlvIGlkLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXVkaW9FbmdpbmUucGF1c2VFZmZlY3QoYXVkaW9JRCk7XG4gICAgICovXG4gICAgcGF1c2VFZmZlY3Q6IGZ1bmN0aW9uIChhdWRpb0lEKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdXNlKGF1ZGlvSUQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFN0b3AgcGxheWluZyBhbGwgdGhlIHNvdW5kIGVmZmVjdHMuXG4gICAgICogISN6aCDmmoLlgZzmkq3mlL7miYDmnInpn7PmlYjjgIJcbiAgICAgKiBAbWV0aG9kIHBhdXNlQWxsRWZmZWN0c1xuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXVkaW9FbmdpbmUucGF1c2VBbGxFZmZlY3RzKCk7XG4gICAgICovXG4gICAgcGF1c2VBbGxFZmZlY3RzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtdXNpY0lkID0gdGhpcy5fbXVzaWMuaWQ7XG4gICAgICAgIHZhciBlZmZlY3QgPSB0aGlzLl9lZmZlY3Q7XG4gICAgICAgIGVmZmVjdC5wYXVzZUNhY2hlLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgZm9yICh2YXIgaWQgaW4gX2lkMmF1ZGlvKSB7XG4gICAgICAgICAgICB2YXIgYXVkaW8gPSBfaWQyYXVkaW9baWRdO1xuICAgICAgICAgICAgaWYgKCFhdWRpbyB8fCBhdWRpby5pZCA9PT0gbXVzaWNJZCkgY29udGludWU7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBhdWRpby5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgaWYgKHN0YXRlID09PSB0aGlzLkF1ZGlvU3RhdGUuUExBWUlORykge1xuICAgICAgICAgICAgICAgIGVmZmVjdC5wYXVzZUNhY2hlLnB1c2goaWQpO1xuICAgICAgICAgICAgICAgIGF1ZGlvLnBhdXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXN1bWUgZWZmZWN0IGF1ZGlvLlxuICAgICAqICEjemgg5oGi5aSN5pKt5pS+6Z+z5pWI6Z+z6aKR44CCXG4gICAgICogQG1ldGhvZCByZXN1bWVFZmZlY3RcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYXVkaW9JRCAtIFRoZSByZXR1cm4gdmFsdWUgb2YgZnVuY3Rpb24gcGxheS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnJlc3VtZUVmZmVjdChhdWRpb0lEKTtcbiAgICAgKi9cbiAgICByZXN1bWVFZmZlY3Q6IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICB0aGlzLnJlc3VtZShpZCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmVzdW1lIGFsbCBlZmZlY3QgYXVkaW8uXG4gICAgICogISN6aCDmgaLlpI3mkq3mlL7miYDmnInkuYvliY3mmoLlgZznmoTpn7PmlYjjgIJcbiAgICAgKiBAbWV0aG9kIHJlc3VtZUFsbEVmZmVjdHNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnJlc3VtZUFsbEVmZmVjdHMoKTtcbiAgICAgKi9cbiAgICByZXN1bWVBbGxFZmZlY3RzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXVzZUlEQ2FjaGUgPSB0aGlzLl9lZmZlY3QucGF1c2VDYWNoZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXVzZUlEQ2FjaGUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBpZCA9IHBhdXNlSURDYWNoZVtpXTtcbiAgICAgICAgICAgIHZhciBhdWRpbyA9IF9pZDJhdWRpb1tpZF07XG4gICAgICAgICAgICBpZiAoYXVkaW8pXG4gICAgICAgICAgICAgICAgYXVkaW8ucmVzdW1lKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTdG9wIHBsYXlpbmcgdGhlIGVmZmVjdCBhdWRpby5cbiAgICAgKiAhI3poIOWBnOatouaSreaUvumfs+aViOOAglxuICAgICAqIEBtZXRob2Qgc3RvcEVmZmVjdFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhdWRpb0lEIC0gYXVkaW8gaWQuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5zdG9wRWZmZWN0KGlkKTtcbiAgICAgKi9cbiAgICBzdG9wRWZmZWN0OiBmdW5jdGlvbiAoYXVkaW9JRCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9wKGF1ZGlvSUQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFN0b3AgcGxheWluZyBhbGwgdGhlIGVmZmVjdHMuXG4gICAgICogISN6aCDlgZzmraLmkq3mlL7miYDmnInpn7PmlYjjgIJcbiAgICAgKiBAbWV0aG9kIHN0b3BBbGxFZmZlY3RzXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsRWZmZWN0cygpO1xuICAgICAqL1xuICAgIHN0b3BBbGxFZmZlY3RzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtdXNpY0lkID0gdGhpcy5fbXVzaWMuaWQ7XG4gICAgICAgIGZvciAodmFyIGlkIGluIF9pZDJhdWRpbykge1xuICAgICAgICAgICAgdmFyIGF1ZGlvID0gX2lkMmF1ZGlvW2lkXTtcbiAgICAgICAgICAgIGlmICghYXVkaW8gfHwgYXVkaW8uaWQgPT09IG11c2ljSWQpIGNvbnRpbnVlO1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gYXVkaW8uZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gYXVkaW9FbmdpbmUuQXVkaW9TdGF0ZS5QTEFZSU5HKSB7XG4gICAgICAgICAgICAgICAgYXVkaW8uc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjYy5hdWRpb0VuZ2luZSA9IGF1ZGlvRW5naW5lO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=