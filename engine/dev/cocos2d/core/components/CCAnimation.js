
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCAnimation.js';
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
var AnimationAnimator = require('../../animation/animation-animator');

var AnimationClip = require('../../animation/animation-clip');

var EventTarget = require('../event/event-target');

var js = require('../platform/js');

var equalClips = CC_EDITOR ? function (clip1, clip2) {
  return clip1 === clip2 || clip1 && clip2 && (clip1.name === clip2.name || clip1._uuid === clip2._uuid);
} : function (clip1, clip2) {
  return clip1 === clip2;
};
/**
 * !#en The event type supported by Animation
 * !#zh Animation 支持的事件类型
 * @class Animation.EventType
 * @static
 * @namespace Animationd
 */

var EventType = cc.Enum({
  /**
   * !#en Emit when begin playing animation
   * !#zh 开始播放时触发
   * @property {String} PLAY
   * @static
   */
  PLAY: 'play',

  /**
   * !#en Emit when stop playing animation
   * !#zh 停止播放时触发
   * @property {String} STOP
   * @static
   */
  STOP: 'stop',

  /**
   * !#en Emit when pause animation
   * !#zh 暂停播放时触发
   * @property {String} PAUSE   
   * @static
   */
  PAUSE: 'pause',

  /**
   * !#en Emit when resume animation
   * !#zh 恢复播放时触发
   * @property {String} RESUME
   * @static
   */
  RESUME: 'resume',

  /**
   * !#en If animation repeat count is larger than 1, emit when animation play to the last frame
   * !#zh 假如动画循环次数大于 1，当动画播放到最后一帧时触发
   * @property {String} LASTFRAME
   * @static
   */
  LASTFRAME: 'lastframe',

  /**
   * !#en Emit when finish playing animation
   * !#zh 动画播放完成时触发
   * @property {String} FINISHED
   * @static
   */
  FINISHED: 'finished'
});
/**
 * !#en The animation component is used to play back animations.
 *   
 * Animation provide several events to register：
 *  - play : Emit when begin playing animation
 *  - stop : Emit when stop playing animation
 *  - pause : Emit when pause animation
 *  - resume : Emit when resume animation
 *  - lastframe : If animation repeat count is larger than 1, emit when animation play to the last frame
 *  - finished : Emit when finish playing animation
 *
 * !#zh Animation 组件用于播放动画。
 *   
 * Animation 提供了一系列可注册的事件：
 *  - play : 开始播放时
 *  - stop : 停止播放时
 *  - pause : 暂停播放时
 *  - resume : 恢复播放时
 *  - lastframe : 假如动画循环次数大于 1，当动画播放到最后一帧时
 *  - finished : 动画播放完成时
 * 
 * @class Animation
 * @extends Component
 * @uses EventTarget
 */

var Animation = cc.Class({
  name: 'cc.Animation',
  "extends": require('./CCComponent'),
  mixins: [EventTarget],
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.others/Animation',
    help: 'i18n:COMPONENT.help_url.animation',
    executeInEditMode: true
  },
  statics: {
    EventType: EventType
  },
  ctor: function ctor() {
    cc.EventTarget.call(this); // The actual implement for Animation

    this._animator = null;
    this._nameToState = js.createMap(true);
    this._didInit = false;
    this._currentClip = null;
  },
  properties: {
    _defaultClip: {
      "default": null,
      type: AnimationClip
    },

    /**
     * !#en Animation will play the default clip when start game.
     * !#zh 在勾选自动播放或调用 play() 时默认播放的动画剪辑。
     * @property defaultClip
     * @type {AnimationClip}
     */
    defaultClip: {
      type: AnimationClip,
      get: function get() {
        return this._defaultClip;
      },
      set: function set(value) {
        if (!CC_EDITOR || cc.engine && cc.engine.isPlaying) {
          return;
        }

        if (this._defaultClip) {
          this.removeClip(this._defaultClip, true);
        }

        if (value) {
          this.addClip(value);
        }

        this._defaultClip = value;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.animation.default_clip'
    },

    /**
     * !#en Current played clip.
     * !#zh 当前播放的动画剪辑。
     * @property currentClip
     * @type {AnimationClip}
     */
    currentClip: {
      get: function get() {
        return this._currentClip;
      },
      set: function set(value) {
        this._currentClip = value;
      },
      type: AnimationClip,
      visible: false
    },
    // This property is used to watch clip changes in editor.
    // Don't use in your game, use addClip/removeClip instead.
    _writableClips: {
      get: function get() {
        return this._clips;
      },
      set: function set(val) {
        this._didInit = false;
        this._clips = val;

        this._init();
      },
      type: [AnimationClip]
    },

    /**
     * !#en All the clips used in this animation.
     * !#zh 通过脚本可以访问并播放的 AnimationClip 列表。
     * @property _clips
     * @type {AnimationClip[]}
     * @private
     */
    _clips: {
      "default": [],
      type: [AnimationClip],
      tooltip: CC_DEV && 'i18n:COMPONENT.animation.clips',
      visible: true
    },

    /**
     * !#en Whether the animation should auto play the default clip when start game.
     * !#zh 是否在运行游戏后自动播放默认动画剪辑。
     * @property playOnLoad
     * @type {Boolean}
     * @default true
     */
    playOnLoad: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.animation.play_on_load'
    }
  },
  start: function start() {
    if (!CC_EDITOR && this.playOnLoad && this._defaultClip) {
      var isPlaying = this._animator && this._animator.isPlaying;

      if (!isPlaying) {
        var state = this.getAnimationState(this._defaultClip.name);

        this._animator.playState(state);
      }
    }
  },
  onEnable: function onEnable() {
    if (this._animator) {
      this._animator.resume();
    }
  },
  onDisable: function onDisable() {
    if (this._animator) {
      this._animator.pause();
    }
  },
  onDestroy: function onDestroy() {
    this.stop();
  },
  ///////////////////////////////////////////////////////////////////////////////
  // Public Methods
  ///////////////////////////////////////////////////////////////////////////////

  /**
   * !#en Get all the clips used in this animation.
   * !#zh 获取动画组件上的所有动画剪辑。
   * @method getClips
   * @return {AnimationClip[]}
   */
  getClips: function getClips() {
    return this._clips;
  },

  /**
   * !#en Plays an animation and stop other animations.
   * !#zh 播放指定的动画，并且停止当前正在播放动画。如果没有指定动画，则播放默认动画。
   * @method play
   * @param {String} [name] - The name of animation to play. If no name is supplied then the default animation will be played.
   * @param {Number} [startTime] - play an animation from startTime
   * @return {AnimationState} - The AnimationState of playing animation. In cases where the animation can't be played (ie, there is no default animation or no animation with the specified name), the function will return null.
   * @example
   * var animCtrl = this.node.getComponent(cc.Animation);
   * animCtrl.play("linear");
   */
  play: function play(name, startTime) {
    var state = this.playAdditive(name, startTime);

    this._animator.stopStatesExcept(state);

    return state;
  },

  /**
   * !#en
   * Plays an additive animation, it will not stop other animations.
   * If there are other animations playing, then will play several animations at the same time.
   * !#zh 播放指定的动画（将不会停止当前播放的动画）。如果没有指定动画，则播放默认动画。
   * @method playAdditive
   * @param {String} [name] - The name of animation to play. If no name is supplied then the default animation will be played.
   * @param {Number} [startTime] - play an animation from startTime
   * @return {AnimationState} - The AnimationState of playing animation. In cases where the animation can't be played (ie, there is no default animation or no animation with the specified name), the function will return null.
   * @example
   * // linear_1 and linear_2 at the same time playing.
   * var animCtrl = this.node.getComponent(cc.Animation);
   * animCtrl.playAdditive("linear_1");
   * animCtrl.playAdditive("linear_2");
   */
  playAdditive: function playAdditive(name, startTime) {
    this._init();

    var state = this.getAnimationState(name || this._defaultClip && this._defaultClip.name);

    if (state) {
      this.enabled = true;
      var animator = this._animator;

      if (animator.isPlaying && state.isPlaying) {
        if (state.isPaused) {
          animator.resumeState(state);
        } else {
          animator.stopState(state);
          animator.playState(state, startTime);
        }
      } else {
        animator.playState(state, startTime);
      } // Animation cannot be played when the component is not enabledInHierarchy.
      // That would cause an error for the animation lost the reference after destroying the node.
      // If users play the animation when the component is not enabledInHierarchy,
      // we pause the animator here so that it will automatically resume the animation when users enable the component.


      if (!this.enabledInHierarchy) {
        animator.pause();
      }

      this.currentClip = state.clip;
    }

    return state;
  },

  /**
   * !#en Stops an animation named name. If no name is supplied then stops all playing animations that were started with this Animation. <br/>
   * Stopping an animation also Rewinds it to the Start.
   * !#zh 停止指定的动画。如果没有指定名字，则停止当前正在播放的动画。
   * @method stop
   * @param {String} [name] - The animation to stop, if not supplied then stops all playing animations.
   */
  stop: function stop(name) {
    if (!this._didInit) {
      return;
    }

    if (name) {
      var state = this._nameToState[name];

      if (state) {
        this._animator.stopState(state);
      }
    } else {
      this._animator.stop();
    }
  },

  /**
   * !#en Pauses an animation named name. If no name is supplied then pauses all playing animations that were started with this Animation.
   * !#zh 暂停当前或者指定的动画。如果没有指定名字，则暂停当前正在播放的动画。
   * @method pause
   * @param {String} [name] - The animation to pauses, if not supplied then pauses all playing animations.
   */
  pause: function pause(name) {
    if (!this._didInit) {
      return;
    }

    if (name) {
      var state = this._nameToState[name];

      if (state) {
        this._animator.pauseState(state);
      }
    } else {
      this.enabled = false;
    }
  },

  /**
   * !#en Resumes an animation named name. If no name is supplied then resumes all paused animations that were started with this Animation.
   * !#zh 重新播放指定的动画，如果没有指定名字，则重新播放当前正在播放的动画。
   * @method resume
   * @param {String} [name] - The animation to resumes, if not supplied then resumes all paused animations.
   */
  resume: function resume(name) {
    if (!this._didInit) {
      return;
    }

    if (name) {
      var state = this._nameToState[name];

      if (state) {
        this._animator.resumeState(state);
      }
    } else {
      this.enabled = true;
    }
  },

  /**
   * !#en Make an animation named name go to the specified time. If no name is supplied then make all animations go to the specified time.
   * !#zh 设置指定动画的播放时间。如果没有指定名字，则设置当前播放动画的播放时间。
   * @method setCurrentTime
   * @param {Number} [time] - The time to go to
   * @param {String} [name] - Specified animation name, if not supplied then make all animations go to the time.
   */
  setCurrentTime: function setCurrentTime(time, name) {
    this._init();

    if (name) {
      var state = this._nameToState[name];

      if (state) {
        this._animator.setStateTime(state, time);
      }
    } else {
      this._animator.setStateTime(time);
    }
  },

  /**
   * !#en Returns the animation state named name. If no animation with the specified name, the function will return null.
   * !#zh 获取当前或者指定的动画状态，如果未找到指定动画剪辑则返回 null。
   * @method getAnimationState
   * @param {String} name
   * @return {AnimationState}
   */
  getAnimationState: function getAnimationState(name) {
    this._init();

    var state = this._nameToState[name];

    if (CC_EDITOR && (!state || !cc.js.array.contains(this._clips, state.clip))) {
      this._didInit = false;

      if (this._animator) {
        this._animator.stop();
      }

      this._init();

      state = this._nameToState[name];
    }

    if (state && !state.curveLoaded) {
      this._animator._reloadClip(state);
    }

    return state || null;
  },

  /**
   * !#en Adds a clip to the animation with name newName. If a clip with that name already exists it will be replaced with the new clip.
   * !#zh 添加动画剪辑，并且可以重新设置该动画剪辑的名称。
   * @method addClip
   * @param {AnimationClip} clip - the clip to add
   * @param {String} [newName]
   * @return {AnimationState} - The AnimationState which gives full control over the animation clip.
   */
  addClip: function addClip(clip, newName) {
    if (!clip) {
      cc.warnID(3900);
      return;
    }

    this._init(); // add clip


    if (!cc.js.array.contains(this._clips, clip)) {
      this._clips.push(clip);
    } // replace same name clip


    newName = newName || clip.name;
    var oldState = this._nameToState[newName];

    if (oldState) {
      if (oldState.clip === clip) {
        return oldState;
      } else {
        var index = this._clips.indexOf(oldState.clip);

        if (index !== -1) {
          this._clips.splice(index, 1);
        }
      }
    } // replace state


    var newState = new cc.AnimationState(clip, newName);
    this._nameToState[newName] = newState;
    return newState;
  },

  /**
   * !#en 
   * Remove clip from the animation list. This will remove the clip and any animation states based on it.
   * If there are animation states depand on the clip are playing or clip is defaultClip, it will not delete the clip.
   * But if force is true, then will always remove the clip and any animation states based on it. If clip is defaultClip, defaultClip will be reset to null
   * !#zh
   * 从动画列表中移除指定的动画剪辑，<br/>
   * 如果依赖于 clip 的 AnimationState 正在播放或者 clip 是 defaultClip 的话，默认是不会删除 clip 的。
   * 但是如果 force 参数为 true，则会强制停止该动画，然后移除该动画剪辑和相关的动画。这时候如果 clip 是 defaultClip，defaultClip 将会被重置为 null。
   * @method removeClip
   * @param {AnimationClip} clip
   * @param {Boolean} [force=false] - If force is true, then will always remove the clip and any animation states based on it.
   */
  removeClip: function removeClip(clip, force) {
    if (!clip) {
      cc.warnID(3901);
      return;
    }

    this._init();

    var state;

    for (var name in this._nameToState) {
      state = this._nameToState[name];

      if (equalClips(state.clip, clip)) {
        break;
      }
    }

    if (clip === this._defaultClip) {
      if (force) this._defaultClip = null;else {
        if (!CC_TEST) cc.warnID(3902);
        return;
      }
    }

    if (state && state.isPlaying) {
      if (force) this.stop(state.name);else {
        if (!CC_TEST) cc.warnID(3903);
        return;
      }
    }

    this._clips = this._clips.filter(function (item) {
      return !equalClips(item, clip);
    });

    if (state) {
      delete this._nameToState[state.name];
    }
  },

  /**
   * !#en
   * Samples animations at the current state.<br/>
   * This is useful when you explicitly want to set up some animation state, and sample it once.
   * !#zh 对指定或当前动画进行采样。你可以手动将动画设置到某一个状态，然后采样一次。
   * @method sample
   * @param {String} name
   */
  sample: function sample(name) {
    this._init();

    if (name) {
      var state = this._nameToState[name];

      if (state) {
        state.sample();
      }
    } else {
      this._animator.sample();
    }
  },

  /**
   * !#en 
   * Register animation event callback.
   * The event arguments will provide the AnimationState which emit the event.
   * When play an animation, will auto register the event callback to the AnimationState, and unregister the event callback from the AnimationState when animation stopped.
   * !#zh
   * 注册动画事件回调。
   * 回调的事件里将会附上发送事件的 AnimationState。
   * 当播放一个动画时，会自动将事件注册到对应的 AnimationState 上，停止播放时会将事件从这个 AnimationState 上取消注册。
   * @method on
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} callback - The callback that will be invoked when the event is dispatched.
   *                              The callback is ignored if it is a duplicate (the callbacks are unique).
   * @param {cc.AnimationState} state 
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null
   * @param {Boolean} [useCapture=false] - When set to true, the capture argument prevents callback
   *                              from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE.
   *                              When false, callback will NOT be invoked when event's eventPhase attribute value is CAPTURING_PHASE.
   *                              Either way, callback will be invoked when event's eventPhase attribute value is AT_TARGET.
   *
   * @return {Function} - Just returns the incoming callback so you can save the anonymous function easier.
   * @typescript
   * on(type: string, callback: (event: Event.EventCustom) => void, target?: any, useCapture?: boolean): (event: Event.EventCustom) => void
   * on<T>(type: string, callback: (event: T) => void, target?: any, useCapture?: boolean): (event: T) => void
   * on(type: string, callback: (type: string, state: cc.AnimationState) => void, target?: any, useCapture?: boolean): (type: string, state: cc.AnimationState) => void
   * @example
   * onPlay: function (type, state) {
   *     // callback
   * }
   * 
   * // register event to all animation
   * animation.on('play', this.onPlay, this);
   */
  on: function on(type, callback, target, useCapture) {
    this._init();

    var ret = this._EventTargetOn(type, callback, target, useCapture);

    if (type === 'lastframe') {
      var states = this._nameToState;

      for (var name in states) {
        states[name]._lastframeEventOn = true;
      }
    }

    return ret;
  },

  /**
   * !#en
   * Unregister animation event callback.
   * !#zh
   * 取消注册动画事件回调。
   * @method off
   * @param {String} type - A string representing the event type being removed.
   * @param {Function} [callback] - The callback to remove.
   * @param {Object} [target] - The target (this object) to invoke the callback, if it's not given, only callback without target will be removed
   * @param {Boolean} [useCapture=false] - Specifies whether the callback being removed was registered as a capturing callback or not.
   *                              If not specified, useCapture defaults to false. If a callback was registered twice,
   *                              one with capture and one without, each must be removed separately. Removal of a capturing callback
   *                              does not affect a non-capturing version of the same listener, and vice versa.
   *
   * @example
   * // unregister event to all animation
   * animation.off('play', this.onPlay, this);
   */
  off: function off(type, callback, target, useCapture) {
    this._init();

    if (type === 'lastframe') {
      var states = this._nameToState;

      for (var name in states) {
        states[name]._lastframeEventOn = false;
      }
    }

    this._EventTargetOff(type, callback, target, useCapture);
  },
  ///////////////////////////////////////////////////////////////////////////////
  // Internal Methods
  ///////////////////////////////////////////////////////////////////////////////
  // Dont forget to call _init before every actual process in public methods.
  // Just invoking _init by onLoad is not enough because onLoad is called only if the entity is active.
  _init: function _init() {
    if (this._didInit) {
      return;
    }

    this._didInit = true;
    this._animator = new AnimationAnimator(this.node, this);

    this._createStates();
  },
  _createStates: function _createStates() {
    this._nameToState = js.createMap(true); // create animation states

    var state = null;
    var defaultClipState = false;

    for (var i = 0; i < this._clips.length; ++i) {
      var clip = this._clips[i];

      if (clip) {
        state = new cc.AnimationState(clip);

        if (CC_EDITOR) {
          this._animator._reloadClip(state);
        }

        this._nameToState[state.name] = state;

        if (equalClips(this._defaultClip, clip)) {
          defaultClipState = state;
        }
      }
    }

    if (this._defaultClip && !defaultClipState) {
      state = new cc.AnimationState(this._defaultClip);

      if (CC_EDITOR) {
        this._animator._reloadClip(state);
      }

      this._nameToState[state.name] = state;
    }
  }
});
Animation.prototype._EventTargetOn = EventTarget.prototype.on;
Animation.prototype._EventTargetOff = EventTarget.prototype.off;
cc.Animation = module.exports = Animation;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NBbmltYXRpb24uanMiXSwibmFtZXMiOlsiQW5pbWF0aW9uQW5pbWF0b3IiLCJyZXF1aXJlIiwiQW5pbWF0aW9uQ2xpcCIsIkV2ZW50VGFyZ2V0IiwianMiLCJlcXVhbENsaXBzIiwiQ0NfRURJVE9SIiwiY2xpcDEiLCJjbGlwMiIsIm5hbWUiLCJfdXVpZCIsIkV2ZW50VHlwZSIsImNjIiwiRW51bSIsIlBMQVkiLCJTVE9QIiwiUEFVU0UiLCJSRVNVTUUiLCJMQVNURlJBTUUiLCJGSU5JU0hFRCIsIkFuaW1hdGlvbiIsIkNsYXNzIiwibWl4aW5zIiwiZWRpdG9yIiwibWVudSIsImhlbHAiLCJleGVjdXRlSW5FZGl0TW9kZSIsInN0YXRpY3MiLCJjdG9yIiwiY2FsbCIsIl9hbmltYXRvciIsIl9uYW1lVG9TdGF0ZSIsImNyZWF0ZU1hcCIsIl9kaWRJbml0IiwiX2N1cnJlbnRDbGlwIiwicHJvcGVydGllcyIsIl9kZWZhdWx0Q2xpcCIsInR5cGUiLCJkZWZhdWx0Q2xpcCIsImdldCIsInNldCIsInZhbHVlIiwiZW5naW5lIiwiaXNQbGF5aW5nIiwicmVtb3ZlQ2xpcCIsImFkZENsaXAiLCJ0b29sdGlwIiwiQ0NfREVWIiwiY3VycmVudENsaXAiLCJ2aXNpYmxlIiwiX3dyaXRhYmxlQ2xpcHMiLCJfY2xpcHMiLCJ2YWwiLCJfaW5pdCIsInBsYXlPbkxvYWQiLCJzdGFydCIsInN0YXRlIiwiZ2V0QW5pbWF0aW9uU3RhdGUiLCJwbGF5U3RhdGUiLCJvbkVuYWJsZSIsInJlc3VtZSIsIm9uRGlzYWJsZSIsInBhdXNlIiwib25EZXN0cm95Iiwic3RvcCIsImdldENsaXBzIiwicGxheSIsInN0YXJ0VGltZSIsInBsYXlBZGRpdGl2ZSIsInN0b3BTdGF0ZXNFeGNlcHQiLCJlbmFibGVkIiwiYW5pbWF0b3IiLCJpc1BhdXNlZCIsInJlc3VtZVN0YXRlIiwic3RvcFN0YXRlIiwiZW5hYmxlZEluSGllcmFyY2h5IiwiY2xpcCIsInBhdXNlU3RhdGUiLCJzZXRDdXJyZW50VGltZSIsInRpbWUiLCJzZXRTdGF0ZVRpbWUiLCJhcnJheSIsImNvbnRhaW5zIiwiY3VydmVMb2FkZWQiLCJfcmVsb2FkQ2xpcCIsIm5ld05hbWUiLCJ3YXJuSUQiLCJwdXNoIiwib2xkU3RhdGUiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJuZXdTdGF0ZSIsIkFuaW1hdGlvblN0YXRlIiwiZm9yY2UiLCJDQ19URVNUIiwiZmlsdGVyIiwiaXRlbSIsInNhbXBsZSIsIm9uIiwiY2FsbGJhY2siLCJ0YXJnZXQiLCJ1c2VDYXB0dXJlIiwicmV0IiwiX0V2ZW50VGFyZ2V0T24iLCJzdGF0ZXMiLCJfbGFzdGZyYW1lRXZlbnRPbiIsIm9mZiIsIl9FdmVudFRhcmdldE9mZiIsIm5vZGUiLCJfY3JlYXRlU3RhdGVzIiwiZGVmYXVsdENsaXBTdGF0ZSIsImkiLCJsZW5ndGgiLCJwcm90b3R5cGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBTUEsaUJBQWlCLEdBQUdDLE9BQU8sQ0FBQyxvQ0FBRCxDQUFqQzs7QUFDQSxJQUFNQyxhQUFhLEdBQUdELE9BQU8sQ0FBQyxnQ0FBRCxDQUE3Qjs7QUFDQSxJQUFNRSxXQUFXLEdBQUdGLE9BQU8sQ0FBQyx1QkFBRCxDQUEzQjs7QUFDQSxJQUFNRyxFQUFFLEdBQUdILE9BQU8sQ0FBQyxnQkFBRCxDQUFsQjs7QUFFQSxJQUFJSSxVQUFVLEdBQUdDLFNBQVMsR0FBRyxVQUFVQyxLQUFWLEVBQWlCQyxLQUFqQixFQUF3QjtBQUNqRCxTQUFPRCxLQUFLLEtBQUtDLEtBQVYsSUFBb0JELEtBQUssSUFBSUMsS0FBVCxLQUFtQkQsS0FBSyxDQUFDRSxJQUFOLEtBQWVELEtBQUssQ0FBQ0MsSUFBckIsSUFBNkJGLEtBQUssQ0FBQ0csS0FBTixLQUFnQkYsS0FBSyxDQUFDRSxLQUF0RSxDQUEzQjtBQUNI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QWhCO0FBd2tCQXBDLFNBQVMsQ0FBQzhGLFNBQVYsQ0FBb0JWLGNBQXBCLEdBQXFDckcsV0FBVyxDQUFDK0csU0FBWixDQUFzQmYsRUFBM0Q7QUFDQS9FLFNBQVMsQ0FBQzhGLFNBQVYsQ0FBb0JOLGVBQXBCLEdBQXNDekcsV0FBVyxDQUFDK0csU0FBWixDQUFzQlAsR0FBNUQ7QUFFQS9GLEVBQUUsQ0FBQ1EsU0FBSCxHQUFlK0YsTUFBTSxDQUFDQyxPQUFQLEdBQWlCaEcsU0FBaEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IEFuaW1hdGlvbkFuaW1hdG9yID0gcmVxdWlyZSgnLi4vLi4vYW5pbWF0aW9uL2FuaW1hdGlvbi1hbmltYXRvcicpO1xuY29uc3QgQW5pbWF0aW9uQ2xpcCA9IHJlcXVpcmUoJy4uLy4uL2FuaW1hdGlvbi9hbmltYXRpb24tY2xpcCcpO1xuY29uc3QgRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuLi9ldmVudC9ldmVudC10YXJnZXQnKTtcbmNvbnN0IGpzID0gcmVxdWlyZSgnLi4vcGxhdGZvcm0vanMnKTtcblxubGV0IGVxdWFsQ2xpcHMgPSBDQ19FRElUT1IgPyBmdW5jdGlvbiAoY2xpcDEsIGNsaXAyKSB7XG4gICAgcmV0dXJuIGNsaXAxID09PSBjbGlwMiB8fCAoY2xpcDEgJiYgY2xpcDIgJiYgKGNsaXAxLm5hbWUgPT09IGNsaXAyLm5hbWUgfHwgY2xpcDEuX3V1aWQgPT09IGNsaXAyLl91dWlkKSk7XG59IDogZnVuY3Rpb24gKGNsaXAxLCBjbGlwMikge1xuICAgIHJldHVybiBjbGlwMSA9PT0gY2xpcDI7XG59O1xuXG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IHR5cGUgc3VwcG9ydGVkIGJ5IEFuaW1hdGlvblxuICogISN6aCBBbmltYXRpb24g5pSv5oyB55qE5LqL5Lu257G75Z6LXG4gKiBAY2xhc3MgQW5pbWF0aW9uLkV2ZW50VHlwZVxuICogQHN0YXRpY1xuICogQG5hbWVzcGFjZSBBbmltYXRpb25kXG4gKi9cbmxldCBFdmVudFR5cGUgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIEVtaXQgd2hlbiBiZWdpbiBwbGF5aW5nIGFuaW1hdGlvblxuICAgICAqICEjemgg5byA5aeL5pKt5pS+5pe26Kem5Y+RXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IFBMQVlcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgUExBWTogJ3BsYXknLFxuICAgIC8qKlxuICAgICAqICEjZW4gRW1pdCB3aGVuIHN0b3AgcGxheWluZyBhbmltYXRpb25cbiAgICAgKiAhI3poIOWBnOatouaSreaUvuaXtuinpuWPkVxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBTVE9QXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFNUT1A6ICdzdG9wJyxcbiAgICAvKipcbiAgICAgKiAhI2VuIEVtaXQgd2hlbiBwYXVzZSBhbmltYXRpb25cbiAgICAgKiAhI3poIOaaguWBnOaSreaUvuaXtuinpuWPkVxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBQQVVTRSAgIFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBQQVVTRTogJ3BhdXNlJyxcbiAgICAvKipcbiAgICAgKiAhI2VuIEVtaXQgd2hlbiByZXN1bWUgYW5pbWF0aW9uXG4gICAgICogISN6aCDmgaLlpI3mkq3mlL7ml7bop6blj5FcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gUkVTVU1FXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFJFU1VNRTogJ3Jlc3VtZScsXG4gICAgLyoqXG4gICAgICogISNlbiBJZiBhbmltYXRpb24gcmVwZWF0IGNvdW50IGlzIGxhcmdlciB0aGFuIDEsIGVtaXQgd2hlbiBhbmltYXRpb24gcGxheSB0byB0aGUgbGFzdCBmcmFtZVxuICAgICAqICEjemgg5YGH5aaC5Yqo55S75b6q546v5qyh5pWw5aSn5LqOIDHvvIzlvZPliqjnlLvmkq3mlL7liLDmnIDlkI7kuIDluKfml7bop6blj5FcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFTVEZSQU1FXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIExBU1RGUkFNRTogJ2xhc3RmcmFtZScsXG4gICAgLyoqXG4gICAgICogISNlbiBFbWl0IHdoZW4gZmluaXNoIHBsYXlpbmcgYW5pbWF0aW9uXG4gICAgICogISN6aCDliqjnlLvmkq3mlL7lrozmiJDml7bop6blj5FcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gRklOSVNIRURcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgRklOSVNIRUQ6ICdmaW5pc2hlZCdcbn0pO1xuXG4vKipcbiAqICEjZW4gVGhlIGFuaW1hdGlvbiBjb21wb25lbnQgaXMgdXNlZCB0byBwbGF5IGJhY2sgYW5pbWF0aW9ucy5cbiAqICAgXG4gKiBBbmltYXRpb24gcHJvdmlkZSBzZXZlcmFsIGV2ZW50cyB0byByZWdpc3Rlcu+8mlxuICogIC0gcGxheSA6IEVtaXQgd2hlbiBiZWdpbiBwbGF5aW5nIGFuaW1hdGlvblxuICogIC0gc3RvcCA6IEVtaXQgd2hlbiBzdG9wIHBsYXlpbmcgYW5pbWF0aW9uXG4gKiAgLSBwYXVzZSA6IEVtaXQgd2hlbiBwYXVzZSBhbmltYXRpb25cbiAqICAtIHJlc3VtZSA6IEVtaXQgd2hlbiByZXN1bWUgYW5pbWF0aW9uXG4gKiAgLSBsYXN0ZnJhbWUgOiBJZiBhbmltYXRpb24gcmVwZWF0IGNvdW50IGlzIGxhcmdlciB0aGFuIDEsIGVtaXQgd2hlbiBhbmltYXRpb24gcGxheSB0byB0aGUgbGFzdCBmcmFtZVxuICogIC0gZmluaXNoZWQgOiBFbWl0IHdoZW4gZmluaXNoIHBsYXlpbmcgYW5pbWF0aW9uXG4gKlxuICogISN6aCBBbmltYXRpb24g57uE5Lu255So5LqO5pKt5pS+5Yqo55S744CCXG4gKiAgIFxuICogQW5pbWF0aW9uIOaPkOS+m+S6huS4gOezu+WIl+WPr+azqOWGjOeahOS6i+S7tu+8mlxuICogIC0gcGxheSA6IOW8gOWni+aSreaUvuaXtlxuICogIC0gc3RvcCA6IOWBnOatouaSreaUvuaXtlxuICogIC0gcGF1c2UgOiDmmoLlgZzmkq3mlL7ml7ZcbiAqICAtIHJlc3VtZSA6IOaBouWkjeaSreaUvuaXtlxuICogIC0gbGFzdGZyYW1lIDog5YGH5aaC5Yqo55S75b6q546v5qyh5pWw5aSn5LqOIDHvvIzlvZPliqjnlLvmkq3mlL7liLDmnIDlkI7kuIDluKfml7ZcbiAqICAtIGZpbmlzaGVkIDog5Yqo55S75pKt5pS+5a6M5oiQ5pe2XG4gKiBcbiAqIEBjbGFzcyBBbmltYXRpb25cbiAqIEBleHRlbmRzIENvbXBvbmVudFxuICogQHVzZXMgRXZlbnRUYXJnZXRcbiAqL1xubGV0IEFuaW1hdGlvbiA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuQW5pbWF0aW9uJyxcbiAgICBleHRlbmRzOiByZXF1aXJlKCcuL0NDQ29tcG9uZW50JyksXG4gICAgbWl4aW5zOiBbRXZlbnRUYXJnZXRdLFxuXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50Lm90aGVycy9BbmltYXRpb24nLFxuICAgICAgICBoZWxwOiAnaTE4bjpDT01QT05FTlQuaGVscF91cmwuYW5pbWF0aW9uJyxcbiAgICAgICAgZXhlY3V0ZUluRWRpdE1vZGU6IHRydWUsXG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgRXZlbnRUeXBlXG4gICAgfSxcblxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuRXZlbnRUYXJnZXQuY2FsbCh0aGlzKTtcblxuICAgICAgICAvLyBUaGUgYWN0dWFsIGltcGxlbWVudCBmb3IgQW5pbWF0aW9uXG4gICAgICAgIHRoaXMuX2FuaW1hdG9yID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9uYW1lVG9TdGF0ZSA9IGpzLmNyZWF0ZU1hcCh0cnVlKTtcbiAgICAgICAgdGhpcy5fZGlkSW5pdCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRDbGlwID0gbnVsbDtcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuXG4gICAgICAgIF9kZWZhdWx0Q2xpcDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IEFuaW1hdGlvbkNsaXAsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQW5pbWF0aW9uIHdpbGwgcGxheSB0aGUgZGVmYXVsdCBjbGlwIHdoZW4gc3RhcnQgZ2FtZS5cbiAgICAgICAgICogISN6aCDlnKjli77pgInoh6rliqjmkq3mlL7miJbosIPnlKggcGxheSgpIOaXtum7mOiupOaSreaUvueahOWKqOeUu+WJqui+keOAglxuICAgICAgICAgKiBAcHJvcGVydHkgZGVmYXVsdENsaXBcbiAgICAgICAgICogQHR5cGUge0FuaW1hdGlvbkNsaXB9XG4gICAgICAgICAqL1xuICAgICAgICBkZWZhdWx0Q2xpcDoge1xuICAgICAgICAgICAgdHlwZTogQW5pbWF0aW9uQ2xpcCxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0Q2xpcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghQ0NfRURJVE9SIHx8IChjYy5lbmdpbmUgJiYgY2MuZW5naW5lLmlzUGxheWluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kZWZhdWx0Q2xpcCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNsaXAodGhpcy5fZGVmYXVsdENsaXAsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDbGlwKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVmYXVsdENsaXAgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmFuaW1hdGlvbi5kZWZhdWx0X2NsaXAnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQ3VycmVudCBwbGF5ZWQgY2xpcC5cbiAgICAgICAgICogISN6aCDlvZPliY3mkq3mlL7nmoTliqjnlLvliarovpHjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGN1cnJlbnRDbGlwXG4gICAgICAgICAqIEB0eXBlIHtBbmltYXRpb25DbGlwfVxuICAgICAgICAgKi9cbiAgICAgICAgY3VycmVudENsaXA6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50Q2xpcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRDbGlwID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogQW5pbWF0aW9uQ2xpcCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVGhpcyBwcm9wZXJ0eSBpcyB1c2VkIHRvIHdhdGNoIGNsaXAgY2hhbmdlcyBpbiBlZGl0b3IuXG4gICAgICAgIC8vIERvbid0IHVzZSBpbiB5b3VyIGdhbWUsIHVzZSBhZGRDbGlwL3JlbW92ZUNsaXAgaW5zdGVhZC5cbiAgICAgICAgX3dyaXRhYmxlQ2xpcHM6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NsaXBzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlkSW5pdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NsaXBzID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBbQW5pbWF0aW9uQ2xpcF0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQWxsIHRoZSBjbGlwcyB1c2VkIGluIHRoaXMgYW5pbWF0aW9uLlxuICAgICAgICAgKiAhI3poIOmAmui/h+iEmuacrOWPr+S7peiuv+mXruW5tuaSreaUvueahCBBbmltYXRpb25DbGlwIOWIl+ihqOOAglxuICAgICAgICAgKiBAcHJvcGVydHkgX2NsaXBzXG4gICAgICAgICAqIEB0eXBlIHtBbmltYXRpb25DbGlwW119XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfY2xpcHM6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICAgICAgdHlwZTogW0FuaW1hdGlvbkNsaXBdLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5hbmltYXRpb24uY2xpcHMnLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFdoZXRoZXIgdGhlIGFuaW1hdGlvbiBzaG91bGQgYXV0byBwbGF5IHRoZSBkZWZhdWx0IGNsaXAgd2hlbiBzdGFydCBnYW1lLlxuICAgICAgICAgKiAhI3poIOaYr+WQpuWcqOi/kOihjOa4uOaIj+WQjuiHquWKqOaSreaUvum7mOiupOWKqOeUu+WJqui+keOAglxuICAgICAgICAgKiBAcHJvcGVydHkgcGxheU9uTG9hZFxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgcGxheU9uTG9hZDoge1xuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmFuaW1hdGlvbi5wbGF5X29uX2xvYWQnXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgdGhpcy5wbGF5T25Mb2FkICYmIHRoaXMuX2RlZmF1bHRDbGlwKSB7XG4gICAgICAgICAgICBsZXQgaXNQbGF5aW5nID0gdGhpcy5fYW5pbWF0b3IgJiYgdGhpcy5fYW5pbWF0b3IuaXNQbGF5aW5nO1xuICAgICAgICAgICAgaWYgKCFpc1BsYXlpbmcpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLmdldEFuaW1hdGlvblN0YXRlKHRoaXMuX2RlZmF1bHRDbGlwLm5hbWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdG9yLnBsYXlTdGF0ZShzdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FuaW1hdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRvci5yZXN1bWUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FuaW1hdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRvci5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uRGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICB9LFxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIFB1YmxpYyBNZXRob2RzXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgYWxsIHRoZSBjbGlwcyB1c2VkIGluIHRoaXMgYW5pbWF0aW9uLlxuICAgICAqICEjemgg6I635Y+W5Yqo55S757uE5Lu25LiK55qE5omA5pyJ5Yqo55S75Ymq6L6R44CCXG4gICAgICogQG1ldGhvZCBnZXRDbGlwc1xuICAgICAqIEByZXR1cm4ge0FuaW1hdGlvbkNsaXBbXX1cbiAgICAgKi9cbiAgICBnZXRDbGlwczogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xpcHM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGxheXMgYW4gYW5pbWF0aW9uIGFuZCBzdG9wIG90aGVyIGFuaW1hdGlvbnMuXG4gICAgICogISN6aCDmkq3mlL7mjIflrprnmoTliqjnlLvvvIzlubbkuJTlgZzmraLlvZPliY3mraPlnKjmkq3mlL7liqjnlLvjgILlpoLmnpzmsqHmnInmjIflrprliqjnlLvvvIzliJnmkq3mlL7pu5jorqTliqjnlLvjgIJcbiAgICAgKiBAbWV0aG9kIHBsYXlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW25hbWVdIC0gVGhlIG5hbWUgb2YgYW5pbWF0aW9uIHRvIHBsYXkuIElmIG5vIG5hbWUgaXMgc3VwcGxpZWQgdGhlbiB0aGUgZGVmYXVsdCBhbmltYXRpb24gd2lsbCBiZSBwbGF5ZWQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtzdGFydFRpbWVdIC0gcGxheSBhbiBhbmltYXRpb24gZnJvbSBzdGFydFRpbWVcbiAgICAgKiBAcmV0dXJuIHtBbmltYXRpb25TdGF0ZX0gLSBUaGUgQW5pbWF0aW9uU3RhdGUgb2YgcGxheWluZyBhbmltYXRpb24uIEluIGNhc2VzIHdoZXJlIHRoZSBhbmltYXRpb24gY2FuJ3QgYmUgcGxheWVkIChpZSwgdGhlcmUgaXMgbm8gZGVmYXVsdCBhbmltYXRpb24gb3Igbm8gYW5pbWF0aW9uIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lKSwgdGhlIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIG51bGwuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgYW5pbUN0cmwgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICogYW5pbUN0cmwucGxheShcImxpbmVhclwiKTtcbiAgICAgKi9cbiAgICBwbGF5OiBmdW5jdGlvbiAobmFtZSwgc3RhcnRUaW1lKSB7XG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMucGxheUFkZGl0aXZlKG5hbWUsIHN0YXJ0VGltZSk7XG4gICAgICAgIHRoaXMuX2FuaW1hdG9yLnN0b3BTdGF0ZXNFeGNlcHQoc3RhdGUpO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBQbGF5cyBhbiBhZGRpdGl2ZSBhbmltYXRpb24sIGl0IHdpbGwgbm90IHN0b3Agb3RoZXIgYW5pbWF0aW9ucy5cbiAgICAgKiBJZiB0aGVyZSBhcmUgb3RoZXIgYW5pbWF0aW9ucyBwbGF5aW5nLCB0aGVuIHdpbGwgcGxheSBzZXZlcmFsIGFuaW1hdGlvbnMgYXQgdGhlIHNhbWUgdGltZS5cbiAgICAgKiAhI3poIOaSreaUvuaMh+WumueahOWKqOeUu++8iOWwhuS4jeS8muWBnOatouW9k+WJjeaSreaUvueahOWKqOeUu++8ieOAguWmguaenOayoeacieaMh+WumuWKqOeUu++8jOWImeaSreaUvum7mOiupOWKqOeUu+OAglxuICAgICAqIEBtZXRob2QgcGxheUFkZGl0aXZlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtuYW1lXSAtIFRoZSBuYW1lIG9mIGFuaW1hdGlvbiB0byBwbGF5LiBJZiBubyBuYW1lIGlzIHN1cHBsaWVkIHRoZW4gdGhlIGRlZmF1bHQgYW5pbWF0aW9uIHdpbGwgYmUgcGxheWVkLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbc3RhcnRUaW1lXSAtIHBsYXkgYW4gYW5pbWF0aW9uIGZyb20gc3RhcnRUaW1lXG4gICAgICogQHJldHVybiB7QW5pbWF0aW9uU3RhdGV9IC0gVGhlIEFuaW1hdGlvblN0YXRlIG9mIHBsYXlpbmcgYW5pbWF0aW9uLiBJbiBjYXNlcyB3aGVyZSB0aGUgYW5pbWF0aW9uIGNhbid0IGJlIHBsYXllZCAoaWUsIHRoZXJlIGlzIG5vIGRlZmF1bHQgYW5pbWF0aW9uIG9yIG5vIGFuaW1hdGlvbiB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSksIHRoZSBmdW5jdGlvbiB3aWxsIHJldHVybiBudWxsLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gbGluZWFyXzEgYW5kIGxpbmVhcl8yIGF0IHRoZSBzYW1lIHRpbWUgcGxheWluZy5cbiAgICAgKiB2YXIgYW5pbUN0cmwgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICogYW5pbUN0cmwucGxheUFkZGl0aXZlKFwibGluZWFyXzFcIik7XG4gICAgICogYW5pbUN0cmwucGxheUFkZGl0aXZlKFwibGluZWFyXzJcIik7XG4gICAgICovXG4gICAgcGxheUFkZGl0aXZlOiBmdW5jdGlvbiAobmFtZSwgc3RhcnRUaW1lKSB7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5nZXRBbmltYXRpb25TdGF0ZShuYW1lIHx8ICh0aGlzLl9kZWZhdWx0Q2xpcCAmJiB0aGlzLl9kZWZhdWx0Q2xpcC5uYW1lKSk7XG5cbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBsZXQgYW5pbWF0b3IgPSB0aGlzLl9hbmltYXRvcjtcbiAgICAgICAgICAgIGlmIChhbmltYXRvci5pc1BsYXlpbmcgJiYgc3RhdGUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLmlzUGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdG9yLnJlc3VtZVN0YXRlKHN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdG9yLnN0b3BTdGF0ZShzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdG9yLnBsYXlTdGF0ZShzdGF0ZSwgc3RhcnRUaW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbmltYXRvci5wbGF5U3RhdGUoc3RhdGUsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEFuaW1hdGlvbiBjYW5ub3QgYmUgcGxheWVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBub3QgZW5hYmxlZEluSGllcmFyY2h5LlxuICAgICAgICAgICAgLy8gVGhhdCB3b3VsZCBjYXVzZSBhbiBlcnJvciBmb3IgdGhlIGFuaW1hdGlvbiBsb3N0IHRoZSByZWZlcmVuY2UgYWZ0ZXIgZGVzdHJveWluZyB0aGUgbm9kZS5cbiAgICAgICAgICAgIC8vIElmIHVzZXJzIHBsYXkgdGhlIGFuaW1hdGlvbiB3aGVuIHRoZSBjb21wb25lbnQgaXMgbm90IGVuYWJsZWRJbkhpZXJhcmNoeSxcbiAgICAgICAgICAgIC8vIHdlIHBhdXNlIHRoZSBhbmltYXRvciBoZXJlIHNvIHRoYXQgaXQgd2lsbCBhdXRvbWF0aWNhbGx5IHJlc3VtZSB0aGUgYW5pbWF0aW9uIHdoZW4gdXNlcnMgZW5hYmxlIHRoZSBjb21wb25lbnQuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSB7XG4gICAgICAgICAgICAgICAgYW5pbWF0b3IucGF1c2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2xpcCA9IHN0YXRlLmNsaXA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFN0b3BzIGFuIGFuaW1hdGlvbiBuYW1lZCBuYW1lLiBJZiBubyBuYW1lIGlzIHN1cHBsaWVkIHRoZW4gc3RvcHMgYWxsIHBsYXlpbmcgYW5pbWF0aW9ucyB0aGF0IHdlcmUgc3RhcnRlZCB3aXRoIHRoaXMgQW5pbWF0aW9uLiA8YnIvPlxuICAgICAqIFN0b3BwaW5nIGFuIGFuaW1hdGlvbiBhbHNvIFJld2luZHMgaXQgdG8gdGhlIFN0YXJ0LlxuICAgICAqICEjemgg5YGc5q2i5oyH5a6a55qE5Yqo55S744CC5aaC5p6c5rKh5pyJ5oyH5a6a5ZCN5a2X77yM5YiZ5YGc5q2i5b2T5YmN5q2j5Zyo5pKt5pS+55qE5Yqo55S744CCXG4gICAgICogQG1ldGhvZCBzdG9wXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtuYW1lXSAtIFRoZSBhbmltYXRpb24gdG8gc3RvcCwgaWYgbm90IHN1cHBsaWVkIHRoZW4gc3RvcHMgYWxsIHBsYXlpbmcgYW5pbWF0aW9ucy5cbiAgICAgKi9cbiAgICBzdG9wOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2RpZEluaXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5fbmFtZVRvU3RhdGVbbmFtZV07XG4gICAgICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRvci5zdG9wU3RhdGUoc3RhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0b3Iuc3RvcCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGF1c2VzIGFuIGFuaW1hdGlvbiBuYW1lZCBuYW1lLiBJZiBubyBuYW1lIGlzIHN1cHBsaWVkIHRoZW4gcGF1c2VzIGFsbCBwbGF5aW5nIGFuaW1hdGlvbnMgdGhhdCB3ZXJlIHN0YXJ0ZWQgd2l0aCB0aGlzIEFuaW1hdGlvbi5cbiAgICAgKiAhI3poIOaaguWBnOW9k+WJjeaIluiAheaMh+WumueahOWKqOeUu+OAguWmguaenOayoeacieaMh+WumuWQjeWtl++8jOWImeaaguWBnOW9k+WJjeato+WcqOaSreaUvueahOWKqOeUu+OAglxuICAgICAqIEBtZXRob2QgcGF1c2VcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW25hbWVdIC0gVGhlIGFuaW1hdGlvbiB0byBwYXVzZXMsIGlmIG5vdCBzdXBwbGllZCB0aGVuIHBhdXNlcyBhbGwgcGxheWluZyBhbmltYXRpb25zLlxuICAgICAqL1xuICAgIHBhdXNlOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2RpZEluaXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5fbmFtZVRvU3RhdGVbbmFtZV07XG4gICAgICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRvci5wYXVzZVN0YXRlKHN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmVzdW1lcyBhbiBhbmltYXRpb24gbmFtZWQgbmFtZS4gSWYgbm8gbmFtZSBpcyBzdXBwbGllZCB0aGVuIHJlc3VtZXMgYWxsIHBhdXNlZCBhbmltYXRpb25zIHRoYXQgd2VyZSBzdGFydGVkIHdpdGggdGhpcyBBbmltYXRpb24uXG4gICAgICogISN6aCDph43mlrDmkq3mlL7mjIflrprnmoTliqjnlLvvvIzlpoLmnpzmsqHmnInmjIflrprlkI3lrZfvvIzliJnph43mlrDmkq3mlL7lvZPliY3mraPlnKjmkq3mlL7nmoTliqjnlLvjgIJcbiAgICAgKiBAbWV0aG9kIHJlc3VtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbbmFtZV0gLSBUaGUgYW5pbWF0aW9uIHRvIHJlc3VtZXMsIGlmIG5vdCBzdXBwbGllZCB0aGVuIHJlc3VtZXMgYWxsIHBhdXNlZCBhbmltYXRpb25zLlxuICAgICAqL1xuICAgIHJlc3VtZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kaWRJbml0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuX25hbWVUb1N0YXRlW25hbWVdO1xuICAgICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0b3IucmVzdW1lU3RhdGUoc3RhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIE1ha2UgYW4gYW5pbWF0aW9uIG5hbWVkIG5hbWUgZ28gdG8gdGhlIHNwZWNpZmllZCB0aW1lLiBJZiBubyBuYW1lIGlzIHN1cHBsaWVkIHRoZW4gbWFrZSBhbGwgYW5pbWF0aW9ucyBnbyB0byB0aGUgc3BlY2lmaWVkIHRpbWUuXG4gICAgICogISN6aCDorr7nva7mjIflrprliqjnlLvnmoTmkq3mlL7ml7bpl7TjgILlpoLmnpzmsqHmnInmjIflrprlkI3lrZfvvIzliJnorr7nva7lvZPliY3mkq3mlL7liqjnlLvnmoTmkq3mlL7ml7bpl7TjgIJcbiAgICAgKiBAbWV0aG9kIHNldEN1cnJlbnRUaW1lXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt0aW1lXSAtIFRoZSB0aW1lIHRvIGdvIHRvXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtuYW1lXSAtIFNwZWNpZmllZCBhbmltYXRpb24gbmFtZSwgaWYgbm90IHN1cHBsaWVkIHRoZW4gbWFrZSBhbGwgYW5pbWF0aW9ucyBnbyB0byB0aGUgdGltZS5cbiAgICAgKi9cbiAgICBzZXRDdXJyZW50VGltZTogZnVuY3Rpb24gKHRpbWUsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5fbmFtZVRvU3RhdGVbbmFtZV07XG4gICAgICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRvci5zZXRTdGF0ZVRpbWUoc3RhdGUsIHRpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0b3Iuc2V0U3RhdGVUaW1lKHRpbWUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgYW5pbWF0aW9uIHN0YXRlIG5hbWVkIG5hbWUuIElmIG5vIGFuaW1hdGlvbiB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSwgdGhlIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIG51bGwuXG4gICAgICogISN6aCDojrflj5blvZPliY3miJbogIXmjIflrprnmoTliqjnlLvnirbmgIHvvIzlpoLmnpzmnKrmib7liLDmjIflrprliqjnlLvliarovpHliJnov5Tlm54gbnVsbOOAglxuICAgICAqIEBtZXRob2QgZ2V0QW5pbWF0aW9uU3RhdGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm4ge0FuaW1hdGlvblN0YXRlfVxuICAgICAqL1xuICAgIGdldEFuaW1hdGlvblN0YXRlOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuX25hbWVUb1N0YXRlW25hbWVdO1xuXG4gICAgICAgIGlmIChDQ19FRElUT1IgJiYgKCFzdGF0ZSB8fCAhY2MuanMuYXJyYXkuY29udGFpbnModGhpcy5fY2xpcHMsIHN0YXRlLmNsaXApKSkge1xuICAgICAgICAgICAgdGhpcy5fZGlkSW5pdCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fYW5pbWF0b3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRvci5zdG9wKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICAgICAgICAgIHN0YXRlID0gdGhpcy5fbmFtZVRvU3RhdGVbbmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUgJiYgIXN0YXRlLmN1cnZlTG9hZGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRvci5fcmVsb2FkQ2xpcChzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RhdGUgfHwgbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBBZGRzIGEgY2xpcCB0byB0aGUgYW5pbWF0aW9uIHdpdGggbmFtZSBuZXdOYW1lLiBJZiBhIGNsaXAgd2l0aCB0aGF0IG5hbWUgYWxyZWFkeSBleGlzdHMgaXQgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSBuZXcgY2xpcC5cbiAgICAgKiAhI3poIOa3u+WKoOWKqOeUu+WJqui+ke+8jOW5tuS4lOWPr+S7pemHjeaWsOiuvue9ruivpeWKqOeUu+WJqui+keeahOWQjeensOOAglxuICAgICAqIEBtZXRob2QgYWRkQ2xpcFxuICAgICAqIEBwYXJhbSB7QW5pbWF0aW9uQ2xpcH0gY2xpcCAtIHRoZSBjbGlwIHRvIGFkZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbbmV3TmFtZV1cbiAgICAgKiBAcmV0dXJuIHtBbmltYXRpb25TdGF0ZX0gLSBUaGUgQW5pbWF0aW9uU3RhdGUgd2hpY2ggZ2l2ZXMgZnVsbCBjb250cm9sIG92ZXIgdGhlIGFuaW1hdGlvbiBjbGlwLlxuICAgICAqL1xuICAgIGFkZENsaXA6IGZ1bmN0aW9uIChjbGlwLCBuZXdOYW1lKSB7XG4gICAgICAgIGlmICghY2xpcCkge1xuICAgICAgICAgICAgY2Mud2FybklEKDM5MDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2luaXQoKTtcblxuICAgICAgICAvLyBhZGQgY2xpcFxuICAgICAgICBpZiAoIWNjLmpzLmFycmF5LmNvbnRhaW5zKHRoaXMuX2NsaXBzLCBjbGlwKSkge1xuICAgICAgICAgICAgdGhpcy5fY2xpcHMucHVzaChjbGlwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlcGxhY2Ugc2FtZSBuYW1lIGNsaXBcbiAgICAgICAgbmV3TmFtZSA9IG5ld05hbWUgfHwgY2xpcC5uYW1lO1xuICAgICAgICBsZXQgb2xkU3RhdGUgPSB0aGlzLl9uYW1lVG9TdGF0ZVtuZXdOYW1lXTtcbiAgICAgICAgaWYgKG9sZFN0YXRlKSB7XG4gICAgICAgICAgICBpZiAob2xkU3RhdGUuY2xpcCA9PT0gY2xpcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvbGRTdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2NsaXBzLmluZGV4T2Yob2xkU3RhdGUuY2xpcCk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbGlwcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlcGxhY2Ugc3RhdGVcbiAgICAgICAgbGV0IG5ld1N0YXRlID0gbmV3IGNjLkFuaW1hdGlvblN0YXRlKGNsaXAsIG5ld05hbWUpO1xuICAgICAgICB0aGlzLl9uYW1lVG9TdGF0ZVtuZXdOYW1lXSA9IG5ld1N0YXRlO1xuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogUmVtb3ZlIGNsaXAgZnJvbSB0aGUgYW5pbWF0aW9uIGxpc3QuIFRoaXMgd2lsbCByZW1vdmUgdGhlIGNsaXAgYW5kIGFueSBhbmltYXRpb24gc3RhdGVzIGJhc2VkIG9uIGl0LlxuICAgICAqIElmIHRoZXJlIGFyZSBhbmltYXRpb24gc3RhdGVzIGRlcGFuZCBvbiB0aGUgY2xpcCBhcmUgcGxheWluZyBvciBjbGlwIGlzIGRlZmF1bHRDbGlwLCBpdCB3aWxsIG5vdCBkZWxldGUgdGhlIGNsaXAuXG4gICAgICogQnV0IGlmIGZvcmNlIGlzIHRydWUsIHRoZW4gd2lsbCBhbHdheXMgcmVtb3ZlIHRoZSBjbGlwIGFuZCBhbnkgYW5pbWF0aW9uIHN0YXRlcyBiYXNlZCBvbiBpdC4gSWYgY2xpcCBpcyBkZWZhdWx0Q2xpcCwgZGVmYXVsdENsaXAgd2lsbCBiZSByZXNldCB0byBudWxsXG4gICAgICogISN6aFxuICAgICAqIOS7juWKqOeUu+WIl+ihqOS4reenu+mZpOaMh+WumueahOWKqOeUu+WJqui+ke+8jDxici8+XG4gICAgICog5aaC5p6c5L6d6LWW5LqOIGNsaXAg55qEIEFuaW1hdGlvblN0YXRlIOato+WcqOaSreaUvuaIluiAhSBjbGlwIOaYryBkZWZhdWx0Q2xpcCDnmoTor53vvIzpu5jorqTmmK/kuI3kvJrliKDpmaQgY2xpcCDnmoTjgIJcbiAgICAgKiDkvYbmmK/lpoLmnpwgZm9yY2Ug5Y+C5pWw5Li6IHRydWXvvIzliJnkvJrlvLrliLblgZzmraLor6XliqjnlLvvvIznhLblkI7np7vpmaTor6XliqjnlLvliarovpHlkoznm7jlhbPnmoTliqjnlLvjgILov5nml7blgJnlpoLmnpwgY2xpcCDmmK8gZGVmYXVsdENsaXDvvIxkZWZhdWx0Q2xpcCDlsIbkvJrooqvph43nva7kuLogbnVsbOOAglxuICAgICAqIEBtZXRob2QgcmVtb3ZlQ2xpcFxuICAgICAqIEBwYXJhbSB7QW5pbWF0aW9uQ2xpcH0gY2xpcFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZvcmNlPWZhbHNlXSAtIElmIGZvcmNlIGlzIHRydWUsIHRoZW4gd2lsbCBhbHdheXMgcmVtb3ZlIHRoZSBjbGlwIGFuZCBhbnkgYW5pbWF0aW9uIHN0YXRlcyBiYXNlZCBvbiBpdC5cbiAgICAgKi9cbiAgICByZW1vdmVDbGlwOiBmdW5jdGlvbiAoY2xpcCwgZm9yY2UpIHtcbiAgICAgICAgaWYgKCFjbGlwKSB7XG4gICAgICAgICAgICBjYy53YXJuSUQoMzkwMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW5pdCgpO1xuXG4gICAgICAgIGxldCBzdGF0ZTtcbiAgICAgICAgZm9yIChsZXQgbmFtZSBpbiB0aGlzLl9uYW1lVG9TdGF0ZSkge1xuICAgICAgICAgICAgc3RhdGUgPSB0aGlzLl9uYW1lVG9TdGF0ZVtuYW1lXTtcbiAgICAgICAgICAgIGlmIChlcXVhbENsaXBzKHN0YXRlLmNsaXAsIGNsaXApKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2xpcCA9PT0gdGhpcy5fZGVmYXVsdENsaXApIHtcbiAgICAgICAgICAgIGlmIChmb3JjZSkgdGhpcy5fZGVmYXVsdENsaXAgPSBudWxsO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFDQ19URVNUKSBjYy53YXJuSUQoMzkwMik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZSAmJiBzdGF0ZS5pc1BsYXlpbmcpIHtcbiAgICAgICAgICAgIGlmIChmb3JjZSkgdGhpcy5zdG9wKHN0YXRlLm5hbWUpO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFDQ19URVNUKSBjYy53YXJuSUQoMzkwMyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2xpcHMgPSB0aGlzLl9jbGlwcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiAhZXF1YWxDbGlwcyhpdGVtLCBjbGlwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fbmFtZVRvU3RhdGVbc3RhdGUubmFtZV07ICAgIFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTYW1wbGVzIGFuaW1hdGlvbnMgYXQgdGhlIGN1cnJlbnQgc3RhdGUuPGJyLz5cbiAgICAgKiBUaGlzIGlzIHVzZWZ1bCB3aGVuIHlvdSBleHBsaWNpdGx5IHdhbnQgdG8gc2V0IHVwIHNvbWUgYW5pbWF0aW9uIHN0YXRlLCBhbmQgc2FtcGxlIGl0IG9uY2UuXG4gICAgICogISN6aCDlr7nmjIflrprmiJblvZPliY3liqjnlLvov5vooYzph4fmoLfjgILkvaDlj6/ku6XmiYvliqjlsIbliqjnlLvorr7nva7liLDmn5DkuIDkuKrnirbmgIHvvIznhLblkI7ph4fmoLfkuIDmrKHjgIJcbiAgICAgKiBAbWV0aG9kIHNhbXBsZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICovXG4gICAgc2FtcGxlOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB0aGlzLl9pbml0KCk7XG5cbiAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuX25hbWVUb1N0YXRlW25hbWVdO1xuICAgICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUuc2FtcGxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRvci5zYW1wbGUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogUmVnaXN0ZXIgYW5pbWF0aW9uIGV2ZW50IGNhbGxiYWNrLlxuICAgICAqIFRoZSBldmVudCBhcmd1bWVudHMgd2lsbCBwcm92aWRlIHRoZSBBbmltYXRpb25TdGF0ZSB3aGljaCBlbWl0IHRoZSBldmVudC5cbiAgICAgKiBXaGVuIHBsYXkgYW4gYW5pbWF0aW9uLCB3aWxsIGF1dG8gcmVnaXN0ZXIgdGhlIGV2ZW50IGNhbGxiYWNrIHRvIHRoZSBBbmltYXRpb25TdGF0ZSwgYW5kIHVucmVnaXN0ZXIgdGhlIGV2ZW50IGNhbGxiYWNrIGZyb20gdGhlIEFuaW1hdGlvblN0YXRlIHdoZW4gYW5pbWF0aW9uIHN0b3BwZWQuXG4gICAgICogISN6aFxuICAgICAqIOazqOWGjOWKqOeUu+S6i+S7tuWbnuiwg+OAglxuICAgICAqIOWbnuiwg+eahOS6i+S7tumHjOWwhuS8mumZhOS4iuWPkemAgeS6i+S7tueahCBBbmltYXRpb25TdGF0ZeOAglxuICAgICAqIOW9k+aSreaUvuS4gOS4quWKqOeUu+aXtu+8jOS8muiHquWKqOWwhuS6i+S7tuazqOWGjOWIsOWvueW6lOeahCBBbmltYXRpb25TdGF0ZSDkuIrvvIzlgZzmraLmkq3mlL7ml7bkvJrlsIbkuovku7bku47ov5nkuKogQW5pbWF0aW9uU3RhdGUg5LiK5Y+W5raI5rOo5YaM44CCXG4gICAgICogQG1ldGhvZCBvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBjYWxsYmFjayBpcyBpZ25vcmVkIGlmIGl0IGlzIGEgZHVwbGljYXRlICh0aGUgY2FsbGJhY2tzIGFyZSB1bmlxdWUpLlxuICAgICAqIEBwYXJhbSB7Y2MuQW5pbWF0aW9uU3RhdGV9IHN0YXRlIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XSAtIFRoZSB0YXJnZXQgKHRoaXMgb2JqZWN0KSB0byBpbnZva2UgdGhlIGNhbGxiYWNrLCBjYW4gYmUgbnVsbFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VzZUNhcHR1cmU9ZmFsc2VdIC0gV2hlbiBzZXQgdG8gdHJ1ZSwgdGhlIGNhcHR1cmUgYXJndW1lbnQgcHJldmVudHMgY2FsbGJhY2tcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gYmVpbmcgaW52b2tlZCB3aGVuIHRoZSBldmVudCdzIGV2ZW50UGhhc2UgYXR0cmlidXRlIHZhbHVlIGlzIEJVQkJMSU5HX1BIQVNFLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2hlbiBmYWxzZSwgY2FsbGJhY2sgd2lsbCBOT1QgYmUgaW52b2tlZCB3aGVuIGV2ZW50J3MgZXZlbnRQaGFzZSBhdHRyaWJ1dGUgdmFsdWUgaXMgQ0FQVFVSSU5HX1BIQVNFLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRWl0aGVyIHdheSwgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkIHdoZW4gZXZlbnQncyBldmVudFBoYXNlIGF0dHJpYnV0ZSB2YWx1ZSBpcyBBVF9UQVJHRVQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gLSBKdXN0IHJldHVybnMgdGhlIGluY29taW5nIGNhbGxiYWNrIHNvIHlvdSBjYW4gc2F2ZSB0aGUgYW5vbnltb3VzIGZ1bmN0aW9uIGVhc2llci5cbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIG9uKHR5cGU6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogRXZlbnQuRXZlbnRDdXN0b20pID0+IHZvaWQsIHRhcmdldD86IGFueSwgdXNlQ2FwdHVyZT86IGJvb2xlYW4pOiAoZXZlbnQ6IEV2ZW50LkV2ZW50Q3VzdG9tKSA9PiB2b2lkXG4gICAgICogb248VD4odHlwZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBUKSA9PiB2b2lkLCB0YXJnZXQ/OiBhbnksIHVzZUNhcHR1cmU/OiBib29sZWFuKTogKGV2ZW50OiBUKSA9PiB2b2lkXG4gICAgICogb24odHlwZTogc3RyaW5nLCBjYWxsYmFjazogKHR5cGU6IHN0cmluZywgc3RhdGU6IGNjLkFuaW1hdGlvblN0YXRlKSA9PiB2b2lkLCB0YXJnZXQ/OiBhbnksIHVzZUNhcHR1cmU/OiBib29sZWFuKTogKHR5cGU6IHN0cmluZywgc3RhdGU6IGNjLkFuaW1hdGlvblN0YXRlKSA9PiB2b2lkXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBvblBsYXk6IGZ1bmN0aW9uICh0eXBlLCBzdGF0ZSkge1xuICAgICAqICAgICAvLyBjYWxsYmFja1xuICAgICAqIH1cbiAgICAgKiBcbiAgICAgKiAvLyByZWdpc3RlciBldmVudCB0byBhbGwgYW5pbWF0aW9uXG4gICAgICogYW5pbWF0aW9uLm9uKCdwbGF5JywgdGhpcy5vblBsYXksIHRoaXMpO1xuICAgICAqL1xuICAgIG9uOiBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgdXNlQ2FwdHVyZSkge1xuICAgICAgICB0aGlzLl9pbml0KCk7XG5cbiAgICAgICAgbGV0IHJldCA9IHRoaXMuX0V2ZW50VGFyZ2V0T24odHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgdXNlQ2FwdHVyZSk7XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZSA9PT0gJ2xhc3RmcmFtZScpIHtcbiAgICAgICAgICAgIGxldCBzdGF0ZXMgPSB0aGlzLl9uYW1lVG9TdGF0ZTtcbiAgICAgICAgICAgIGZvciAobGV0IG5hbWUgaW4gc3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgc3RhdGVzW25hbWVdLl9sYXN0ZnJhbWVFdmVudE9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFVucmVnaXN0ZXIgYW5pbWF0aW9uIGV2ZW50IGNhbGxiYWNrLlxuICAgICAqICEjemhcbiAgICAgKiDlj5bmtojms6jlhozliqjnlLvkuovku7blm57osIPjgIJcbiAgICAgKiBAbWV0aG9kIG9mZlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIGJlaW5nIHJlbW92ZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIFRoZSBjYWxsYmFjayB0byByZW1vdmUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdIC0gVGhlIHRhcmdldCAodGhpcyBvYmplY3QpIHRvIGludm9rZSB0aGUgY2FsbGJhY2ssIGlmIGl0J3Mgbm90IGdpdmVuLCBvbmx5IGNhbGxiYWNrIHdpdGhvdXQgdGFyZ2V0IHdpbGwgYmUgcmVtb3ZlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VzZUNhcHR1cmU9ZmFsc2VdIC0gU3BlY2lmaWVzIHdoZXRoZXIgdGhlIGNhbGxiYWNrIGJlaW5nIHJlbW92ZWQgd2FzIHJlZ2lzdGVyZWQgYXMgYSBjYXB0dXJpbmcgY2FsbGJhY2sgb3Igbm90LlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWYgbm90IHNwZWNpZmllZCwgdXNlQ2FwdHVyZSBkZWZhdWx0cyB0byBmYWxzZS4gSWYgYSBjYWxsYmFjayB3YXMgcmVnaXN0ZXJlZCB0d2ljZSxcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uZSB3aXRoIGNhcHR1cmUgYW5kIG9uZSB3aXRob3V0LCBlYWNoIG11c3QgYmUgcmVtb3ZlZCBzZXBhcmF0ZWx5LiBSZW1vdmFsIG9mIGEgY2FwdHVyaW5nIGNhbGxiYWNrXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2VzIG5vdCBhZmZlY3QgYSBub24tY2FwdHVyaW5nIHZlcnNpb24gb2YgdGhlIHNhbWUgbGlzdGVuZXIsIGFuZCB2aWNlIHZlcnNhLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyB1bnJlZ2lzdGVyIGV2ZW50IHRvIGFsbCBhbmltYXRpb25cbiAgICAgKiBhbmltYXRpb24ub2ZmKCdwbGF5JywgdGhpcy5vblBsYXksIHRoaXMpO1xuICAgICAqL1xuICAgIG9mZjogZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQsIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnbGFzdGZyYW1lJykge1xuICAgICAgICAgICAgbGV0IHN0YXRlcyA9IHRoaXMuX25hbWVUb1N0YXRlO1xuICAgICAgICAgICAgZm9yIChsZXQgbmFtZSBpbiBzdGF0ZXMpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZXNbbmFtZV0uX2xhc3RmcmFtZUV2ZW50T24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX0V2ZW50VGFyZ2V0T2ZmKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQsIHVzZUNhcHR1cmUpO1xuICAgIH0sXG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8gSW50ZXJuYWwgTWV0aG9kc1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8vIERvbnQgZm9yZ2V0IHRvIGNhbGwgX2luaXQgYmVmb3JlIGV2ZXJ5IGFjdHVhbCBwcm9jZXNzIGluIHB1YmxpYyBtZXRob2RzLlxuICAgIC8vIEp1c3QgaW52b2tpbmcgX2luaXQgYnkgb25Mb2FkIGlzIG5vdCBlbm91Z2ggYmVjYXVzZSBvbkxvYWQgaXMgY2FsbGVkIG9ubHkgaWYgdGhlIGVudGl0eSBpcyBhY3RpdmUuXG5cbiAgICBfaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fZGlkSW5pdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2RpZEluaXQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9hbmltYXRvciA9IG5ldyBBbmltYXRpb25BbmltYXRvcih0aGlzLm5vZGUsIHRoaXMpO1xuICAgICAgICB0aGlzLl9jcmVhdGVTdGF0ZXMoKTtcbiAgICB9LFxuXG4gICAgX2NyZWF0ZVN0YXRlczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX25hbWVUb1N0YXRlID0ganMuY3JlYXRlTWFwKHRydWUpO1xuICAgICAgICBcbiAgICAgICAgLy8gY3JlYXRlIGFuaW1hdGlvbiBzdGF0ZXNcbiAgICAgICAgbGV0IHN0YXRlID0gbnVsbDtcbiAgICAgICAgbGV0IGRlZmF1bHRDbGlwU3RhdGUgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jbGlwcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGNsaXAgPSB0aGlzLl9jbGlwc1tpXTtcbiAgICAgICAgICAgIGlmIChjbGlwKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBuZXcgY2MuQW5pbWF0aW9uU3RhdGUoY2xpcCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdG9yLl9yZWxvYWRDbGlwKHN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9uYW1lVG9TdGF0ZVtzdGF0ZS5uYW1lXSA9IHN0YXRlO1xuICAgICAgICAgICAgICAgIGlmIChlcXVhbENsaXBzKHRoaXMuX2RlZmF1bHRDbGlwLCBjbGlwKSkge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0Q2xpcFN0YXRlID0gc3RhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9kZWZhdWx0Q2xpcCAmJiAhZGVmYXVsdENsaXBTdGF0ZSkge1xuICAgICAgICAgICAgc3RhdGUgPSBuZXcgY2MuQW5pbWF0aW9uU3RhdGUodGhpcy5fZGVmYXVsdENsaXApO1xuXG4gICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0b3IuX3JlbG9hZENsaXAoc3RhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9uYW1lVG9TdGF0ZVtzdGF0ZS5uYW1lXSA9IHN0YXRlO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbkFuaW1hdGlvbi5wcm90b3R5cGUuX0V2ZW50VGFyZ2V0T24gPSBFdmVudFRhcmdldC5wcm90b3R5cGUub247XG5BbmltYXRpb24ucHJvdG90eXBlLl9FdmVudFRhcmdldE9mZiA9IEV2ZW50VGFyZ2V0LnByb3RvdHlwZS5vZmY7XG5cbmNjLkFuaW1hdGlvbiA9IG1vZHVsZS5leHBvcnRzID0gQW5pbWF0aW9uO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=