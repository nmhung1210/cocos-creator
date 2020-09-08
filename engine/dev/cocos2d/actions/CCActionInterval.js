
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/actions/CCActionInterval.js';
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

/**
 * @module cc
 */

/**
 * !#en
 * <p> An interval action is an action that takes place within a certain period of time. <br/>
 * It has an start time, and a finish time. The finish time is the parameter<br/>
 * duration plus the start time.</p>
 *
 * <p>These CCActionInterval actions have some interesting properties, like:<br/>
 * - They can run normally (default)  <br/>
 * - They can run reversed with the reverse method   <br/>
 * - They can run with the time altered with the Accelerate, AccelDeccel and Speed actions. </p>
 *
 * <p>For example, you can simulate a Ping Pong effect running the action normally and<br/>
 * then running it again in Reverse mode. </p>
 * !#zh 时间间隔动作，这种动作在已定时间内完成，继承 FiniteTimeAction。
 * @class ActionInterval
 * @extends FiniteTimeAction
 * @param {Number} d duration in seconds
 */
cc.ActionInterval = cc.Class({
  name: 'cc.ActionInterval',
  "extends": cc.FiniteTimeAction,
  ctor: function ctor(d) {
    this.MAX_VALUE = 2;
    this._elapsed = 0;
    this._firstTick = false;
    this._easeList = null;
    this._speed = 1;
    this._timesForRepeat = 1;
    this._repeatForever = false;
    this._repeatMethod = false; //Compatible with repeat class, Discard after can be deleted

    this._speedMethod = false; //Compatible with repeat class, Discard after can be deleted

    d !== undefined && cc.ActionInterval.prototype.initWithDuration.call(this, d);
  },

  /*
   * How many seconds had elapsed since the actions started to run.
   * @return {Number}
   */
  getElapsed: function getElapsed() {
    return this._elapsed;
  },

  /*
   * Initializes the action.
   * @param {Number} d duration in seconds
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(d) {
    this._duration = d === 0 ? cc.macro.FLT_EPSILON : d; // prevent division by 0
    // This comparison could be in step:, but it might decrease the performance
    // by 3% in heavy based action games.

    this._elapsed = 0;
    this._firstTick = true;
    return true;
  },
  isDone: function isDone() {
    return this._elapsed >= this._duration;
  },
  _cloneDecoration: function _cloneDecoration(action) {
    action._repeatForever = this._repeatForever;
    action._speed = this._speed;
    action._timesForRepeat = this._timesForRepeat;
    action._easeList = this._easeList;
    action._speedMethod = this._speedMethod;
    action._repeatMethod = this._repeatMethod;
  },
  _reverseEaseList: function _reverseEaseList(action) {
    if (this._easeList) {
      action._easeList = [];

      for (var i = 0; i < this._easeList.length; i++) {
        action._easeList.push(this._easeList[i].reverse());
      }
    }
  },
  clone: function clone() {
    var action = new cc.ActionInterval(this._duration);

    this._cloneDecoration(action);

    return action;
  },

  /**
   * !#en Implementation of ease motion.
   * !#zh 缓动运动。
   * @method easing
   * @param {Object} easeObj
   * @returns {ActionInterval}
   * @example
   * action.easing(cc.easeIn(3.0));
   */
  easing: function easing(easeObj) {
    if (this._easeList) this._easeList.length = 0;else this._easeList = [];

    for (var i = 0; i < arguments.length; i++) {
      this._easeList.push(arguments[i]);
    }

    return this;
  },
  _computeEaseTime: function _computeEaseTime(dt) {
    var locList = this._easeList;
    if (!locList || locList.length === 0) return dt;

    for (var i = 0, n = locList.length; i < n; i++) {
      dt = locList[i].easing(dt);
    }

    return dt;
  },
  step: function step(dt) {
    if (this._firstTick) {
      this._firstTick = false;
      this._elapsed = 0;
    } else this._elapsed += dt; //this.update((1 > (this._elapsed / this._duration)) ? this._elapsed / this._duration : 1);
    //this.update(Math.max(0, Math.min(1, this._elapsed / Math.max(this._duration, cc.macro.FLT_EPSILON))));


    var t = this._elapsed / (this._duration > 0.0000001192092896 ? this._duration : 0.0000001192092896);
    t = 1 > t ? t : 1;
    this.update(t > 0 ? t : 0); //Compatible with repeat class, Discard after can be deleted (this._repeatMethod)

    if (this._repeatMethod && this._timesForRepeat > 1 && this.isDone()) {
      if (!this._repeatForever) {
        this._timesForRepeat--;
      } //var diff = locInnerAction.getElapsed() - locInnerAction._duration;


      this.startWithTarget(this.target); // to prevent jerk. issue #390 ,1247
      //this._innerAction.step(0);
      //this._innerAction.step(diff);

      this.step(this._elapsed - this._duration);
    }
  },
  startWithTarget: function startWithTarget(target) {
    cc.Action.prototype.startWithTarget.call(this, target);
    this._elapsed = 0;
    this._firstTick = true;
  },
  reverse: function reverse() {
    cc.logID(1010);
    return null;
  },

  /*
   * Set amplitude rate.
   * @warning It should be overridden in subclass.
   * @param {Number} amp
   */
  setAmplitudeRate: function setAmplitudeRate(amp) {
    // Abstract class needs implementation
    cc.logID(1011);
  },

  /*
   * Get amplitude rate.
   * @warning It should be overridden in subclass.
   * @return {Number} 0
   */
  getAmplitudeRate: function getAmplitudeRate() {
    // Abstract class needs implementation
    cc.logID(1012);
    return 0;
  },

  /**
   * !#en
   * Changes the speed of an action, making it take longer (speed>1)
   * or less (speed<1) time. <br/>
   * Useful to simulate 'slow motion' or 'fast forward' effect.
   * !#zh
   * 改变一个动作的速度，使它的执行使用更长的时间（speed > 1）<br/>
   * 或更少（speed < 1）可以有效得模拟“慢动作”或“快进”的效果。
   * @param {Number} speed
   * @returns {Action}
   */
  speed: function speed(_speed) {
    if (_speed <= 0) {
      cc.logID(1013);
      return this;
    }

    this._speedMethod = true; //Compatible with repeat class, Discard after can be deleted

    this._speed *= _speed;
    return this;
  },

  /**
   * Get this action speed.
   * @return {Number}
   */
  getSpeed: function getSpeed() {
    return this._speed;
  },

  /**
   * Set this action speed.
   * @param {Number} speed
   * @returns {ActionInterval}
   */
  setSpeed: function setSpeed(speed) {
    this._speed = speed;
    return this;
  },

  /**
   * !#en
   * Repeats an action a number of times.
   * To repeat an action forever use the CCRepeatForever action.
   * !#zh 重复动作可以按一定次数重复一个动作，使用 RepeatForever 动作来永远重复一个动作。
   * @method repeat
   * @param {Number} times
   * @returns {ActionInterval}
   */
  repeat: function repeat(times) {
    times = Math.round(times);

    if (isNaN(times) || times < 1) {
      cc.logID(1014);
      return this;
    }

    this._repeatMethod = true; //Compatible with repeat class, Discard after can be deleted

    this._timesForRepeat *= times;
    return this;
  },

  /**
   * !#en
   * Repeats an action for ever.  <br/>
   * To repeat the an action for a limited number of times use the Repeat action. <br/>
   * !#zh 永远地重复一个动作，有限次数内重复一个动作请使用 Repeat 动作。
   * @method repeatForever
   * @returns {ActionInterval}
   */
  repeatForever: function repeatForever() {
    this._repeatMethod = true; //Compatible with repeat class, Discard after can be deleted

    this._timesForRepeat = this.MAX_VALUE;
    this._repeatForever = true;
    return this;
  }
});

cc.actionInterval = function (d) {
  return new cc.ActionInterval(d);
};
/**
 * @module cc
 */

/*
 * Runs actions sequentially, one after another.
 * @class Sequence
 * @extends ActionInterval
 * @param {Array|FiniteTimeAction} tempArray
 * @example
 * // create sequence with actions
 * var seq = new cc.Sequence(act1, act2);
 *
 * // create sequence with array
 * var seq = new cc.Sequence(actArray);
 */


cc.Sequence = cc.Class({
  name: 'cc.Sequence',
  "extends": cc.ActionInterval,
  ctor: function ctor(tempArray) {
    this._actions = [];
    this._split = null;
    this._last = 0;
    this._reversed = false;
    var paramArray = tempArray instanceof Array ? tempArray : arguments;

    if (paramArray.length === 1) {
      cc.errorID(1019);
      return;
    }

    var last = paramArray.length - 1;
    if (last >= 0 && paramArray[last] == null) cc.logID(1015);

    if (last >= 0) {
      var prev = paramArray[0],
          action1;

      for (var i = 1; i < last; i++) {
        if (paramArray[i]) {
          action1 = prev;
          prev = cc.Sequence._actionOneTwo(action1, paramArray[i]);
        }
      }

      this.initWithTwoActions(prev, paramArray[last]);
    }
  },

  /*
   * Initializes the action <br/>
   * @param {FiniteTimeAction} actionOne
   * @param {FiniteTimeAction} actionTwo
   * @return {Boolean}
   */
  initWithTwoActions: function initWithTwoActions(actionOne, actionTwo) {
    if (!actionOne || !actionTwo) {
      cc.errorID(1025);
      return false;
    }

    var durationOne = actionOne._duration,
        durationTwo = actionTwo._duration;
    durationOne *= actionOne._repeatMethod ? actionOne._timesForRepeat : 1;
    durationTwo *= actionTwo._repeatMethod ? actionTwo._timesForRepeat : 1;
    var d = durationOne + durationTwo;
    this.initWithDuration(d);
    this._actions[0] = actionOne;
    this._actions[1] = actionTwo;
    return true;
  },
  clone: function clone() {
    var action = new cc.Sequence();

    this._cloneDecoration(action);

    action.initWithTwoActions(this._actions[0].clone(), this._actions[1].clone());
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._split = this._actions[0]._duration / this._duration;
    this._split *= this._actions[0]._repeatMethod ? this._actions[0]._timesForRepeat : 1;
    this._last = -1;
  },
  stop: function stop() {
    // Issue #1305
    if (this._last !== -1) this._actions[this._last].stop();
    cc.Action.prototype.stop.call(this);
  },
  update: function update(dt) {
    var new_t,
        found = 0;
    var locSplit = this._split,
        locActions = this._actions,
        locLast = this._last,
        actionFound;
    dt = this._computeEaseTime(dt);

    if (dt < locSplit) {
      // action[0]
      new_t = locSplit !== 0 ? dt / locSplit : 1;

      if (found === 0 && locLast === 1 && this._reversed) {
        // Reverse mode ?
        // XXX: Bug. this case doesn't contemplate when _last==-1, found=0 and in "reverse mode"
        // since it will require a hack to know if an action is on reverse mode or not.
        // "step" should be overriden, and the "reverseMode" value propagated to inner Sequences.
        locActions[1].update(0);
        locActions[1].stop();
      }
    } else {
      // action[1]
      found = 1;
      new_t = locSplit === 1 ? 1 : (dt - locSplit) / (1 - locSplit);

      if (locLast === -1) {
        // action[0] was skipped, execute it.
        locActions[0].startWithTarget(this.target);
        locActions[0].update(1);
        locActions[0].stop();
      }

      if (locLast === 0) {
        // switching to action 1. stop action 0.
        locActions[0].update(1);
        locActions[0].stop();
      }
    }

    actionFound = locActions[found]; // Last action found and it is done.

    if (locLast === found && actionFound.isDone()) return; // Last action not found

    if (locLast !== found) actionFound.startWithTarget(this.target);
    new_t = new_t * actionFound._timesForRepeat;
    actionFound.update(new_t > 1 ? new_t % 1 : new_t);
    this._last = found;
  },
  reverse: function reverse() {
    var action = cc.Sequence._actionOneTwo(this._actions[1].reverse(), this._actions[0].reverse());

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    action._reversed = true;
    return action;
  }
});
/**
 * !#en
 * Helper constructor to create an array of sequenceable actions
 * The created action will run actions sequentially, one after another.
 * !#zh 顺序执行动作，创建的动作将按顺序依次运行。
 * @method sequence
 * @param {FiniteTimeAction|FiniteTimeAction[]} actionOrActionArray
 * @param {FiniteTimeAction} ...tempArray
 * @return {ActionInterval}
 * @example
 * // example
 * // create sequence with actions
 * var seq = cc.sequence(act1, act2);
 *
 * // create sequence with array
 * var seq = cc.sequence(actArray);
 */
// todo: It should be use new

cc.sequence = function (
/*Multiple Arguments*/
tempArray) {
  var paramArray = tempArray instanceof Array ? tempArray : arguments;

  if (paramArray.length === 1) {
    cc.errorID(1019);
    return null;
  }

  var last = paramArray.length - 1;
  if (last >= 0 && paramArray[last] == null) cc.logID(1015);
  var result = null;

  if (last >= 0) {
    result = paramArray[0];

    for (var i = 1; i <= last; i++) {
      if (paramArray[i]) {
        result = cc.Sequence._actionOneTwo(result, paramArray[i]);
      }
    }
  }

  return result;
};

cc.Sequence._actionOneTwo = function (actionOne, actionTwo) {
  var sequence = new cc.Sequence();
  sequence.initWithTwoActions(actionOne, actionTwo);
  return sequence;
};
/*
 * Repeats an action a number of times.
 * To repeat an action forever use the CCRepeatForever action.
 * @class Repeat
 * @extends ActionInterval
 * @param {FiniteTimeAction} action
 * @param {Number} times
 * @example
 * var rep = new cc.Repeat(cc.sequence(jump2, jump1), 5);
 */


cc.Repeat = cc.Class({
  name: 'cc.Repeat',
  "extends": cc.ActionInterval,
  ctor: function ctor(action, times) {
    this._times = 0;
    this._total = 0;
    this._nextDt = 0;
    this._actionInstant = false;
    this._innerAction = null;
    times !== undefined && this.initWithAction(action, times);
  },

  /*
   * @param {FiniteTimeAction} action
   * @param {Number} times
   * @return {Boolean}
   */
  initWithAction: function initWithAction(action, times) {
    var duration = action._duration * times;

    if (this.initWithDuration(duration)) {
      this._times = times;
      this._innerAction = action;

      if (action instanceof cc.ActionInstant) {
        this._actionInstant = true;
        this._times -= 1;
      }

      this._total = 0;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.Repeat();

    this._cloneDecoration(action);

    action.initWithAction(this._innerAction.clone(), this._times);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    this._total = 0;
    this._nextDt = this._innerAction._duration / this._duration;
    cc.ActionInterval.prototype.startWithTarget.call(this, target);

    this._innerAction.startWithTarget(target);
  },
  stop: function stop() {
    this._innerAction.stop();

    cc.Action.prototype.stop.call(this);
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);
    var locInnerAction = this._innerAction;
    var locDuration = this._duration;
    var locTimes = this._times;
    var locNextDt = this._nextDt;

    if (dt >= locNextDt) {
      while (dt > locNextDt && this._total < locTimes) {
        locInnerAction.update(1);
        this._total++;
        locInnerAction.stop();
        locInnerAction.startWithTarget(this.target);
        locNextDt += locInnerAction._duration / locDuration;
        this._nextDt = locNextDt > 1 ? 1 : locNextDt;
      } // fix for issue #1288, incorrect end value of repeat


      if (dt >= 1.0 && this._total < locTimes) {
        // fix for cocos-creator/fireball/issues/4310
        locInnerAction.update(1);
        this._total++;
      } // don't set a instant action back or update it, it has no use because it has no duration


      if (!this._actionInstant) {
        if (this._total === locTimes) {
          locInnerAction.stop();
        } else {
          // issue #390 prevent jerk, use right update
          locInnerAction.update(dt - (locNextDt - locInnerAction._duration / locDuration));
        }
      }
    } else {
      locInnerAction.update(dt * locTimes % 1.0);
    }
  },
  isDone: function isDone() {
    return this._total === this._times;
  },
  reverse: function reverse() {
    var action = new cc.Repeat(this._innerAction.reverse(), this._times);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  },

  /*
   * Set inner Action.
   * @param {FiniteTimeAction} action
   */
  setInnerAction: function setInnerAction(action) {
    if (this._innerAction !== action) {
      this._innerAction = action;
    }
  },

  /*
   * Get inner Action.
   * @return {FiniteTimeAction}
   */
  getInnerAction: function getInnerAction() {
    return this._innerAction;
  }
});
/**
 * !#en Creates a Repeat action. Times is an unsigned integer between 1 and pow(2,30)
 * !#zh 重复动作，可以按一定次数重复一个动，如果想永远重复一个动作请使用 repeatForever 动作来完成。
 * @method repeat
 * @param {FiniteTimeAction} action
 * @param {Number} times
 * @return {ActionInterval}
 * @example
 * // example
 * var rep = cc.repeat(cc.sequence(jump2, jump1), 5);
 */

cc.repeat = function (action, times) {
  return new cc.Repeat(action, times);
};
/*
 * Repeats an action for ever.  <br/>
 * To repeat the an action for a limited number of times use the Repeat action. <br/>
 * @warning This action can't be Sequenceable because it is not an IntervalAction
 * @class RepeatForever
 * @extends ActionInterval
 * @param {FiniteTimeAction} action
 * @example
 * var rep = new cc.RepeatForever(cc.sequence(jump2, jump1), 5);
 */


cc.RepeatForever = cc.Class({
  name: 'cc.RepeatForever',
  "extends": cc.ActionInterval,
  ctor: function ctor(action) {
    this._innerAction = null;
    action && this.initWithAction(action);
  },

  /*
   * @param {ActionInterval} action
   * @return {Boolean}
   */
  initWithAction: function initWithAction(action) {
    if (!action) {
      cc.errorID(1026);
      return false;
    }

    this._innerAction = action;
    return true;
  },
  clone: function clone() {
    var action = new cc.RepeatForever();

    this._cloneDecoration(action);

    action.initWithAction(this._innerAction.clone());
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);

    this._innerAction.startWithTarget(target);
  },
  step: function step(dt) {
    var locInnerAction = this._innerAction;
    locInnerAction.step(dt);

    if (locInnerAction.isDone()) {
      //var diff = locInnerAction.getElapsed() - locInnerAction._duration;
      locInnerAction.startWithTarget(this.target); // to prevent jerk. issue #390 ,1247
      //this._innerAction.step(0);
      //this._innerAction.step(diff);

      locInnerAction.step(locInnerAction.getElapsed() - locInnerAction._duration);
    }
  },
  isDone: function isDone() {
    return false;
  },
  reverse: function reverse() {
    var action = new cc.RepeatForever(this._innerAction.reverse());

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  },

  /*
   * Set inner action.
   * @param {ActionInterval} action
   */
  setInnerAction: function setInnerAction(action) {
    if (this._innerAction !== action) {
      this._innerAction = action;
    }
  },

  /*
   * Get inner action.
   * @return {ActionInterval}
   */
  getInnerAction: function getInnerAction() {
    return this._innerAction;
  }
});
/**
 * !#en Create a acton which repeat forever, as it runs forever, it can't be added into cc.sequence and cc.spawn.
 * !#zh 永远地重复一个动作，有限次数内重复一个动作请使用 repeat 动作，由于这个动作不会停止，所以不能被添加到 cc.sequence 或 cc.spawn 中。
 * @method repeatForever
 * @param {FiniteTimeAction} action
 * @return {ActionInterval}
 * @example
 * // example
 * var repeat = cc.repeatForever(cc.rotateBy(1.0, 360));
 */

cc.repeatForever = function (action) {
  return new cc.RepeatForever(action);
};
/* 
 * Spawn a new action immediately
 * @class Spawn
 * @extends ActionInterval
 */


cc.Spawn = cc.Class({
  name: 'cc.Spawn',
  "extends": cc.ActionInterval,
  ctor: function ctor(tempArray) {
    this._one = null;
    this._two = null;
    var paramArray = tempArray instanceof Array ? tempArray : arguments;

    if (paramArray.length === 1) {
      cc.errorID(1020);
      return;
    }

    var last = paramArray.length - 1;
    if (last >= 0 && paramArray[last] == null) cc.logID(1015);

    if (last >= 0) {
      var prev = paramArray[0],
          action1;

      for (var i = 1; i < last; i++) {
        if (paramArray[i]) {
          action1 = prev;
          prev = cc.Spawn._actionOneTwo(action1, paramArray[i]);
        }
      }

      this.initWithTwoActions(prev, paramArray[last]);
    }
  },

  /* initializes the Spawn action with the 2 actions to spawn
   * @param {FiniteTimeAction} action1
   * @param {FiniteTimeAction} action2
   * @return {Boolean}
   */
  initWithTwoActions: function initWithTwoActions(action1, action2) {
    if (!action1 || !action2) {
      cc.errorID(1027);
      return false;
    }

    var ret = false;
    var d1 = action1._duration;
    var d2 = action2._duration;

    if (this.initWithDuration(Math.max(d1, d2))) {
      this._one = action1;
      this._two = action2;

      if (d1 > d2) {
        this._two = cc.Sequence._actionOneTwo(action2, cc.delayTime(d1 - d2));
      } else if (d1 < d2) {
        this._one = cc.Sequence._actionOneTwo(action1, cc.delayTime(d2 - d1));
      }

      ret = true;
    }

    return ret;
  },
  clone: function clone() {
    var action = new cc.Spawn();

    this._cloneDecoration(action);

    action.initWithTwoActions(this._one.clone(), this._two.clone());
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);

    this._one.startWithTarget(target);

    this._two.startWithTarget(target);
  },
  stop: function stop() {
    this._one.stop();

    this._two.stop();

    cc.Action.prototype.stop.call(this);
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);
    if (this._one) this._one.update(dt);
    if (this._two) this._two.update(dt);
  },
  reverse: function reverse() {
    var action = cc.Spawn._actionOneTwo(this._one.reverse(), this._two.reverse());

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en Create a spawn action which runs several actions in parallel.
 * !#zh 同步执行动作，同步执行一组动作。
 * @method spawn
 * @param {FiniteTimeAction|FiniteTimeAction[]} actionOrActionArray
 * @param {FiniteTimeAction} ...tempArray
 * @return {FiniteTimeAction}
 * @example
 * // example
 * var action = cc.spawn(cc.jumpBy(2, cc.v2(300, 0), 50, 4), cc.rotateBy(2, 720));
 * todo:It should be the direct use new
 */

cc.spawn = function (
/*Multiple Arguments*/
tempArray) {
  var paramArray = tempArray instanceof Array ? tempArray : arguments;

  if (paramArray.length === 1) {
    cc.errorID(1020);
    return null;
  }

  if (paramArray.length > 0 && paramArray[paramArray.length - 1] == null) cc.logID(1015);
  var prev = paramArray[0];

  for (var i = 1; i < paramArray.length; i++) {
    if (paramArray[i] != null) prev = cc.Spawn._actionOneTwo(prev, paramArray[i]);
  }

  return prev;
};

cc.Spawn._actionOneTwo = function (action1, action2) {
  var pSpawn = new cc.Spawn();
  pSpawn.initWithTwoActions(action1, action2);
  return pSpawn;
};
/*
 * Rotates a Node object to a certain angle by modifying its angle property. <br/>
 * The direction will be decided by the shortest angle.
 * @class RotateTo
 * @extends ActionInterval
 * @param {Number} duration duration in seconds
 * @param {Number} dstAngle dstAngle in degrees.
 * @example
 * var rotateTo = new cc.RotateTo(2, 61.0);
 */


cc.RotateTo = cc.Class({
  name: 'cc.RotateTo',
  "extends": cc.ActionInterval,
  statics: {
    _reverse: false
  },
  ctor: function ctor(duration, dstAngle) {
    this._startAngle = 0;
    this._dstAngle = 0;
    this._angle = 0;
    dstAngle !== undefined && this.initWithDuration(duration, dstAngle);
  },

  /*
   * Initializes the action.
   * @param {Number} duration
   * @param {Number} dstAngle
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, dstAngle) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      this._dstAngle = dstAngle;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.RotateTo();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._dstAngle);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var startAngle = target.angle % 360;
    var angle = cc.RotateTo._reverse ? this._dstAngle - startAngle : this._dstAngle + startAngle;
    if (angle > 180) angle -= 360;
    if (angle < -180) angle += 360;
    this._startAngle = startAngle;
    this._angle = cc.RotateTo._reverse ? angle : -angle;
  },
  reverse: function reverse() {
    cc.logID(1016);
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    if (this.target) {
      this.target.angle = this._startAngle + this._angle * dt;
    }
  }
});
/**
 * !#en
 * Rotates a Node object to a certain angle by modifying its angle property. <br/>
 * The direction will be decided by the shortest angle.
 * !#zh 旋转到目标角度，通过逐帧修改它的 angle 属性，旋转方向将由最短的角度决定。
 * @method rotateTo
 * @param {Number} duration duration in seconds
 * @param {Number} dstAngle dstAngle in degrees.
 * @return {ActionInterval}
 * @example
 * // example
 * var rotateTo = cc.rotateTo(2, 61.0);
 */

cc.rotateTo = function (duration, dstAngle) {
  return new cc.RotateTo(duration, dstAngle);
};
/*
 * Rotates a Node object clockwise a number of degrees by modifying its angle property.
 * Relative to its properties to modify.
 * @class RotateBy
 * @extends ActionInterval
 * @param {Number} duration duration in seconds
 * @param {Number} deltaAngle deltaAngle in degrees
 * @example
 * var actionBy = new cc.RotateBy(2, 360);
 */


cc.RotateBy = cc.Class({
  name: 'cc.RotateBy',
  "extends": cc.ActionInterval,
  statics: {
    _reverse: false
  },
  ctor: function ctor(duration, deltaAngle) {
    deltaAngle *= cc.RotateBy._reverse ? 1 : -1;
    this._deltaAngle = 0;
    this._startAngle = 0;
    deltaAngle !== undefined && this.initWithDuration(duration, deltaAngle);
  },

  /*
   * Initializes the action.
   * @param {Number} duration duration in seconds
   * @param {Number} deltaAngle deltaAngle in degrees
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, deltaAngle) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      this._deltaAngle = deltaAngle;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.RotateBy();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._deltaAngle);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._startAngle = target.angle;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    if (this.target) {
      this.target.angle = this._startAngle + this._deltaAngle * dt;
    }
  },
  reverse: function reverse() {
    var action = new cc.RotateBy();
    action.initWithDuration(this._duration, -this._deltaAngle);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en
 * Rotates a Node object clockwise a number of degrees by modifying its angle property.
 * Relative to its properties to modify.
 * !#zh 旋转指定的角度。
 * @method rotateBy
 * @param {Number} duration duration in seconds
 * @param {Number} deltaAngle deltaAngle in degrees
 * @return {ActionInterval}
 * @example
 * // example
 * var actionBy = cc.rotateBy(2, 360);
 */

cc.rotateBy = function (duration, deltaAngle) {
  return new cc.RotateBy(duration, deltaAngle);
};
/*
 * <p>
 * Moves a Node object x,y pixels by modifying its position property.                                  <br/>
 * x and y are relative to the position of the object.                                                     <br/>
 * Several MoveBy actions can be concurrently called, and the resulting                                  <br/>
 * movement will be the sum of individual movements.
 * </p>
 * @class MoveBy
 * @extends ActionInterval
 * @param {Number} duration duration in seconds
 * @param {Vec2|Number} deltaPos
 * @param {Number} [deltaY]
 * @example
 * var actionTo = cc.moveBy(2, cc.v2(windowSize.width - 40, windowSize.height - 40));
 */


cc.MoveBy = cc.Class({
  name: 'cc.MoveBy',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, deltaPos, deltaY) {
    this._positionDelta = cc.v2(0, 0);
    this._startPosition = cc.v2(0, 0);
    this._previousPosition = cc.v2(0, 0);
    deltaPos !== undefined && cc.MoveBy.prototype.initWithDuration.call(this, duration, deltaPos, deltaY);
  },

  /*
   * Initializes the action.
   * @param {Number} duration duration in seconds
   * @param {Vec2} position
   * @param {Number} [y]
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, position, y) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      if (position.x !== undefined) {
        y = position.y;
        position = position.x;
      }

      this._positionDelta.x = position;
      this._positionDelta.y = y;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.MoveBy();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._positionDelta);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var locPosX = target.x;
    var locPosY = target.y;
    this._previousPosition.x = locPosX;
    this._previousPosition.y = locPosY;
    this._startPosition.x = locPosX;
    this._startPosition.y = locPosY;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    if (this.target) {
      var x = this._positionDelta.x * dt;
      var y = this._positionDelta.y * dt;
      var locStartPosition = this._startPosition;

      if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
        var targetX = this.target.x;
        var targetY = this.target.y;
        var locPreviousPosition = this._previousPosition;
        locStartPosition.x = locStartPosition.x + targetX - locPreviousPosition.x;
        locStartPosition.y = locStartPosition.y + targetY - locPreviousPosition.y;
        x = x + locStartPosition.x;
        y = y + locStartPosition.y;
        locPreviousPosition.x = x;
        locPreviousPosition.y = y;
        this.target.setPosition(x, y);
      } else {
        this.target.setPosition(locStartPosition.x + x, locStartPosition.y + y);
      }
    }
  },
  reverse: function reverse() {
    var action = new cc.MoveBy(this._duration, cc.v2(-this._positionDelta.x, -this._positionDelta.y));

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en
 * Moves a Node object x,y pixels by modifying its position property.                                  <br/>
 * x and y are relative to the position of the object.                                                     <br/>
 * Several MoveBy actions can be concurrently called, and the resulting                                  <br/>
 * movement will be the sum of individual movements.
 * !#zh 移动指定的距离。
 * @method moveBy
 * @param {Number} duration duration in seconds
 * @param {Vec2|Number} deltaPos
 * @param {Number} [deltaY]
 * @return {ActionInterval}
 * @example
 * // example
 * var actionTo = cc.moveBy(2, cc.v2(windowSize.width - 40, windowSize.height - 40));
 */

cc.moveBy = function (duration, deltaPos, deltaY) {
  return new cc.MoveBy(duration, deltaPos, deltaY);
};
/*
 * Moves a Node object to the position x,y. x and y are absolute coordinates by modifying its position property. <br/>
 * Several MoveTo actions can be concurrently called, and the resulting                                            <br/>
 * movement will be the sum of individual movements.
 * @class MoveTo
 * @extends MoveBy
 * @param {Number} duration duration in seconds
 * @param {Vec2|Number} position
 * @param {Number} [y]
 * @example
 * var actionBy = new cc.MoveTo(2, cc.v2(80, 80));
 */


cc.MoveTo = cc.Class({
  name: 'cc.MoveTo',
  "extends": cc.MoveBy,
  ctor: function ctor(duration, position, y) {
    this._endPosition = cc.v2(0, 0);
    position !== undefined && this.initWithDuration(duration, position, y);
  },

  /*
   * Initializes the action.
   * @param {Number} duration  duration in seconds
   * @param {Vec2} position
   * @param {Number} [y]
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, position, y) {
    if (cc.MoveBy.prototype.initWithDuration.call(this, duration, position, y)) {
      if (position.x !== undefined) {
        y = position.y;
        position = position.x;
      }

      this._endPosition.x = position;
      this._endPosition.y = y;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.MoveTo();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._endPosition);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.MoveBy.prototype.startWithTarget.call(this, target);
    this._positionDelta.x = this._endPosition.x - target.x;
    this._positionDelta.y = this._endPosition.y - target.y;
  }
});
/**
 * !#en
 * Moves a Node object to the position x,y. x and y are absolute coordinates by modifying its position property. <br/>
 * Several MoveTo actions can be concurrently called, and the resulting                                            <br/>
 * movement will be the sum of individual movements.
 * !#zh 移动到目标位置。
 * @method moveTo
 * @param {Number} duration duration in seconds
 * @param {Vec2|Number} position
 * @param {Number} [y]
 * @return {ActionInterval}
 * @example
 * // example
 * var actionBy = cc.moveTo(2, cc.v2(80, 80));
 */

cc.moveTo = function (duration, position, y) {
  return new cc.MoveTo(duration, position, y);
};
/*
 * Skews a Node object to given angles by modifying its skewX and skewY properties
 * @class SkewTo
 * @extends ActionInterval
 * @param {Number} t time in seconds
 * @param {Number} sx
 * @param {Number} sy
 * @example
 * var actionTo = new cc.SkewTo(2, 37.2, -37.2);
 */


cc.SkewTo = cc.Class({
  name: 'cc.SkewTo',
  "extends": cc.ActionInterval,
  ctor: function ctor(t, sx, sy) {
    this._skewX = 0;
    this._skewY = 0;
    this._startSkewX = 0;
    this._startSkewY = 0;
    this._endSkewX = 0;
    this._endSkewY = 0;
    this._deltaX = 0;
    this._deltaY = 0;
    sy !== undefined && cc.SkewTo.prototype.initWithDuration.call(this, t, sx, sy);
  },

  /*
   * Initializes the action.
   * @param {Number} t time in seconds
   * @param {Number} sx
   * @param {Number} sy
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(t, sx, sy) {
    var ret = false;

    if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
      this._endSkewX = sx;
      this._endSkewY = sy;
      ret = true;
    }

    return ret;
  },
  clone: function clone() {
    var action = new cc.SkewTo();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._endSkewX, this._endSkewY);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._startSkewX = target.skewX % 180;
    this._deltaX = this._endSkewX - this._startSkewX;
    if (this._deltaX > 180) this._deltaX -= 360;
    if (this._deltaX < -180) this._deltaX += 360;
    this._startSkewY = target.skewY % 360;
    this._deltaY = this._endSkewY - this._startSkewY;
    if (this._deltaY > 180) this._deltaY -= 360;
    if (this._deltaY < -180) this._deltaY += 360;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);
    this.target.skewX = this._startSkewX + this._deltaX * dt;
    this.target.skewY = this._startSkewY + this._deltaY * dt;
  }
});
/**
 * !#en
 * Create a action which skews a Node object to given angles by modifying its skewX and skewY properties.
 * Changes to the specified value.
 * !#zh 偏斜到目标角度。
 * @method skewTo
 * @param {Number} t time in seconds
 * @param {Number} sx
 * @param {Number} sy
 * @return {ActionInterval}
 * @example
 * // example
 * var actionTo = cc.skewTo(2, 37.2, -37.2);
 */

cc.skewTo = function (t, sx, sy) {
  return new cc.SkewTo(t, sx, sy);
};
/*
 * Skews a Node object by skewX and skewY degrees.
 * Relative to its property modification.
 * @class SkewBy
 * @extends SkewTo
 * @param {Number} t time in seconds
 * @param {Number} sx  skew in degrees for X axis
 * @param {Number} sy  skew in degrees for Y axis
 */


cc.SkewBy = cc.Class({
  name: 'cc.SkewBy',
  "extends": cc.SkewTo,
  ctor: function ctor(t, sx, sy) {
    sy !== undefined && this.initWithDuration(t, sx, sy);
  },

  /*
   * Initializes the action.
   * @param {Number} t time in seconds
   * @param {Number} deltaSkewX  skew in degrees for X axis
   * @param {Number} deltaSkewY  skew in degrees for Y axis
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(t, deltaSkewX, deltaSkewY) {
    var ret = false;

    if (cc.SkewTo.prototype.initWithDuration.call(this, t, deltaSkewX, deltaSkewY)) {
      this._skewX = deltaSkewX;
      this._skewY = deltaSkewY;
      ret = true;
    }

    return ret;
  },
  clone: function clone() {
    var action = new cc.SkewBy();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._skewX, this._skewY);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.SkewTo.prototype.startWithTarget.call(this, target);
    this._deltaX = this._skewX;
    this._deltaY = this._skewY;
    this._endSkewX = this._startSkewX + this._deltaX;
    this._endSkewY = this._startSkewY + this._deltaY;
  },
  reverse: function reverse() {
    var action = new cc.SkewBy(this._duration, -this._skewX, -this._skewY);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en
 * Skews a Node object by skewX and skewY degrees. <br />
 * Relative to its property modification.
 * !#zh 偏斜指定的角度。
 * @method skewBy
 * @param {Number} t time in seconds
 * @param {Number} sx sx skew in degrees for X axis
 * @param {Number} sy sy skew in degrees for Y axis
 * @return {ActionInterval}
 * @example
 * // example
 * var actionBy = cc.skewBy(2, 0, -90);
 */

cc.skewBy = function (t, sx, sy) {
  return new cc.SkewBy(t, sx, sy);
};
/*
 * Moves a Node object simulating a parabolic jump movement by modifying its position property.
 * Relative to its movement.
 * @class JumpBy
 * @extends ActionInterval
 * @param {Number} duration
 * @param {Vec2|Number} position
 * @param {Number} [y]
 * @param {Number} height
 * @param {Number} jumps
 * @example
 * var actionBy = new cc.JumpBy(2, cc.v2(300, 0), 50, 4);
 * var actionBy = new cc.JumpBy(2, 300, 0, 50, 4);
 */


cc.JumpBy = cc.Class({
  name: 'cc.JumpBy',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, position, y, height, jumps) {
    this._startPosition = cc.v2(0, 0);
    this._previousPosition = cc.v2(0, 0);
    this._delta = cc.v2(0, 0);
    this._height = 0;
    this._jumps = 0;
    height !== undefined && cc.JumpBy.prototype.initWithDuration.call(this, duration, position, y, height, jumps);
  },

  /*
   * Initializes the action.
   * @param {Number} duration
   * @param {Vec2|Number} position
   * @param {Number} [y]
   * @param {Number} height
   * @param {Number} jumps
   * @return {Boolean}
   * @example
   * actionBy.initWithDuration(2, cc.v2(300, 0), 50, 4);
   * actionBy.initWithDuration(2, 300, 0, 50, 4);
   */
  initWithDuration: function initWithDuration(duration, position, y, height, jumps) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      if (jumps === undefined) {
        jumps = height;
        height = y;
        y = position.y;
        position = position.x;
      }

      this._delta.x = position;
      this._delta.y = y;
      this._height = height;
      this._jumps = jumps;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.JumpBy();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._delta, this._height, this._jumps);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var locPosX = target.x;
    var locPosY = target.y;
    this._previousPosition.x = locPosX;
    this._previousPosition.y = locPosY;
    this._startPosition.x = locPosX;
    this._startPosition.y = locPosY;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    if (this.target) {
      var frac = dt * this._jumps % 1.0;
      var y = this._height * 4 * frac * (1 - frac);
      y += this._delta.y * dt;
      var x = this._delta.x * dt;
      var locStartPosition = this._startPosition;

      if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
        var targetX = this.target.x;
        var targetY = this.target.y;
        var locPreviousPosition = this._previousPosition;
        locStartPosition.x = locStartPosition.x + targetX - locPreviousPosition.x;
        locStartPosition.y = locStartPosition.y + targetY - locPreviousPosition.y;
        x = x + locStartPosition.x;
        y = y + locStartPosition.y;
        locPreviousPosition.x = x;
        locPreviousPosition.y = y;
        this.target.setPosition(x, y);
      } else {
        this.target.setPosition(locStartPosition.x + x, locStartPosition.y + y);
      }
    }
  },
  reverse: function reverse() {
    var action = new cc.JumpBy(this._duration, cc.v2(-this._delta.x, -this._delta.y), this._height, this._jumps);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en
 * Moves a Node object simulating a parabolic jump movement by modifying it's position property.
 * Relative to its movement.
 * !#zh 用跳跃的方式移动指定的距离。
 * @method jumpBy
 * @param {Number} duration
 * @param {Vec2|Number} position
 * @param {Number} [y]
 * @param {Number} [height]
 * @param {Number} [jumps]
 * @return {ActionInterval}
 * @example
 * // example
 * var actionBy = cc.jumpBy(2, cc.v2(300, 0), 50, 4);
 * var actionBy = cc.jumpBy(2, 300, 0, 50, 4);
 */

cc.jumpBy = function (duration, position, y, height, jumps) {
  return new cc.JumpBy(duration, position, y, height, jumps);
};
/*
 * Moves a Node object to a parabolic position simulating a jump movement by modifying it's position property. <br />
 * Jump to the specified location.
 * @class JumpTo
 * @extends JumpBy
 * @param {Number} duration
 * @param {Vec2|Number} position
 * @param {Number} [y]
 * @param {Number} [height]
 * @param {Number} [jumps]
 * @example
 * var actionTo = new cc.JumpTo(2, cc.v2(300, 0), 50, 4);
 * var actionTo = new cc.JumpTo(2, 300, 0, 50, 4);
 */


cc.JumpTo = cc.Class({
  name: 'cc.JumpTo',
  "extends": cc.JumpBy,
  ctor: function ctor(duration, position, y, height, jumps) {
    this._endPosition = cc.v2(0, 0);
    height !== undefined && this.initWithDuration(duration, position, y, height, jumps);
  },

  /*
   * Initializes the action.
   * @param {Number} duration
   * @param {Vec2|Number} position
   * @param {Number} [y]
   * @param {Number} height
   * @param {Number} jumps
   * @return {Boolean}
   * @example
   * actionTo.initWithDuration(2, cc.v2(300, 0), 50, 4);
   * actionTo.initWithDuration(2, 300, 0, 50, 4);
   */
  initWithDuration: function initWithDuration(duration, position, y, height, jumps) {
    if (cc.JumpBy.prototype.initWithDuration.call(this, duration, position, y, height, jumps)) {
      if (jumps === undefined) {
        y = position.y;
        position = position.x;
      }

      this._endPosition.x = position;
      this._endPosition.y = y;
      return true;
    }

    return false;
  },
  startWithTarget: function startWithTarget(target) {
    cc.JumpBy.prototype.startWithTarget.call(this, target);
    this._delta.x = this._endPosition.x - this._startPosition.x;
    this._delta.y = this._endPosition.y - this._startPosition.y;
  },
  clone: function clone() {
    var action = new cc.JumpTo();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._endPosition, this._height, this._jumps);
    return action;
  }
});
/**
 * !#en
 * Moves a Node object to a parabolic position simulating a jump movement by modifying its position property. <br />
 * Jump to the specified location.
 * !#zh 用跳跃的方式移动到目标位置。
 * @method jumpTo
 * @param {Number} duration
 * @param {Vec2|Number} position
 * @param {Number} [y]
 * @param {Number} [height]
 * @param {Number} [jumps]
 * @return {ActionInterval}
 * @example
 * // example
 * var actionTo = cc.jumpTo(2, cc.v2(300, 300), 50, 4);
 * var actionTo = cc.jumpTo(2, 300, 300, 50, 4);
 */

cc.jumpTo = function (duration, position, y, height, jumps) {
  return new cc.JumpTo(duration, position, y, height, jumps);
};
/* An action that moves the target with a cubic Bezier curve by a certain distance.
 * Relative to its movement.
 * @class BezierBy
 * @extends ActionInterval
 * @param {Number} t - time in seconds
 * @param {Vec2[]} c - Array of points
 * @example
 * var bezier = [cc.v2(0, windowSize.height / 2), cc.v2(300, -windowSize.height / 2), cc.v2(300, 100)];
 * var bezierForward = new cc.BezierBy(3, bezier);
 */


function bezierAt(a, b, c, d, t) {
  return Math.pow(1 - t, 3) * a + 3 * t * Math.pow(1 - t, 2) * b + 3 * Math.pow(t, 2) * (1 - t) * c + Math.pow(t, 3) * d;
}

;
cc.BezierBy = cc.Class({
  name: 'cc.BezierBy',
  "extends": cc.ActionInterval,
  ctor: function ctor(t, c) {
    this._config = [];
    this._startPosition = cc.v2(0, 0);
    this._previousPosition = cc.v2(0, 0);
    c && cc.BezierBy.prototype.initWithDuration.call(this, t, c);
  },

  /*
   * Initializes the action.
   * @param {Number} t - time in seconds
   * @param {Vec2[]} c - Array of points
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(t, c) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
      this._config = c;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.BezierBy();

    this._cloneDecoration(action);

    var newConfigs = [];

    for (var i = 0; i < this._config.length; i++) {
      var selConf = this._config[i];
      newConfigs.push(cc.v2(selConf.x, selConf.y));
    }

    action.initWithDuration(this._duration, newConfigs);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var locPosX = target.x;
    var locPosY = target.y;
    this._previousPosition.x = locPosX;
    this._previousPosition.y = locPosY;
    this._startPosition.x = locPosX;
    this._startPosition.y = locPosY;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    if (this.target) {
      var locConfig = this._config;
      var xa = 0;
      var xb = locConfig[0].x;
      var xc = locConfig[1].x;
      var xd = locConfig[2].x;
      var ya = 0;
      var yb = locConfig[0].y;
      var yc = locConfig[1].y;
      var yd = locConfig[2].y;
      var x = bezierAt(xa, xb, xc, xd, dt);
      var y = bezierAt(ya, yb, yc, yd, dt);
      var locStartPosition = this._startPosition;

      if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
        var targetX = this.target.x;
        var targetY = this.target.y;
        var locPreviousPosition = this._previousPosition;
        locStartPosition.x = locStartPosition.x + targetX - locPreviousPosition.x;
        locStartPosition.y = locStartPosition.y + targetY - locPreviousPosition.y;
        x = x + locStartPosition.x;
        y = y + locStartPosition.y;
        locPreviousPosition.x = x;
        locPreviousPosition.y = y;
        this.target.setPosition(x, y);
      } else {
        this.target.setPosition(locStartPosition.x + x, locStartPosition.y + y);
      }
    }
  },
  reverse: function reverse() {
    var locConfig = this._config;
    var x0 = locConfig[0].x,
        y0 = locConfig[0].y;
    var x1 = locConfig[1].x,
        y1 = locConfig[1].y;
    var x2 = locConfig[2].x,
        y2 = locConfig[2].y;
    var r = [cc.v2(x1 - x2, y1 - y2), cc.v2(x0 - x2, y0 - y2), cc.v2(-x2, -y2)];
    var action = new cc.BezierBy(this._duration, r);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en
 * An action that moves the target with a cubic Bezier curve by a certain distance.
 * Relative to its movement.
 * !#zh 按贝赛尔曲线轨迹移动指定的距离。
 * @method bezierBy
 * @param {Number} t - time in seconds
 * @param {Vec2[]} c - Array of points
 * @return {ActionInterval}
 * @example
 * // example
 * var bezier = [cc.v2(0, windowSize.height / 2), cc.v2(300, -windowSize.height / 2), cc.v2(300, 100)];
 * var bezierForward = cc.bezierBy(3, bezier);
 */

cc.bezierBy = function (t, c) {
  return new cc.BezierBy(t, c);
};
/* An action that moves the target with a cubic Bezier curve to a destination point.
 * @class BezierTo
 * @extends BezierBy
 * @param {Number} t
 * @param {Vec2[]} c - Array of points
 * @example
 * var bezier = [cc.v2(0, windowSize.height / 2), cc.v2(300, -windowSize.height / 2), cc.v2(300, 100)];
 * var bezierTo = new cc.BezierTo(2, bezier);
 */


cc.BezierTo = cc.Class({
  name: 'cc.BezierTo',
  "extends": cc.BezierBy,
  ctor: function ctor(t, c) {
    this._toConfig = [];
    c && this.initWithDuration(t, c);
  },

  /*
   * Initializes the action.
   * @param {Number} t time in seconds
   * @param {Vec2[]} c - Array of points
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(t, c) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
      this._toConfig = c;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.BezierTo();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._toConfig);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.BezierBy.prototype.startWithTarget.call(this, target);
    var locStartPos = this._startPosition;
    var locToConfig = this._toConfig;
    var locConfig = this._config;
    locConfig[0] = locToConfig[0].sub(locStartPos);
    locConfig[1] = locToConfig[1].sub(locStartPos);
    locConfig[2] = locToConfig[2].sub(locStartPos);
  }
});
/**
 * !#en An action that moves the target with a cubic Bezier curve to a destination point.
 * !#zh 按贝赛尔曲线轨迹移动到目标位置。
 * @method bezierTo
 * @param {Number} t
 * @param {Vec2[]} c - Array of points
 * @return {ActionInterval}
 * @example
 * // example
 * var bezier = [cc.v2(0, windowSize.height / 2), cc.v2(300, -windowSize.height / 2), cc.v2(300, 100)];
 * var bezierTo = cc.bezierTo(2, bezier);
 */

cc.bezierTo = function (t, c) {
  return new cc.BezierTo(t, c);
};
/* Scales a Node object to a zoom factor by modifying it's scale property.
 * @warning This action doesn't support "reverse"
 * @class ScaleTo
 * @extends ActionInterval
 * @param {Number} duration
 * @param {Number} sx  scale parameter in X
 * @param {Number} [sy] scale parameter in Y, if Null equal to sx
 * @example
 * // It scales to 0.5 in both X and Y.
 * var actionTo = new cc.ScaleTo(2, 0.5);
 *
 * // It scales to 0.5 in x and 2 in Y
 * var actionTo = new cc.ScaleTo(2, 0.5, 2);
 */


cc.ScaleTo = cc.Class({
  name: 'cc.ScaleTo',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, sx, sy) {
    this._scaleX = 1;
    this._scaleY = 1;
    this._startScaleX = 1;
    this._startScaleY = 1;
    this._endScaleX = 0;
    this._endScaleY = 0;
    this._deltaX = 0;
    this._deltaY = 0;
    sx !== undefined && cc.ScaleTo.prototype.initWithDuration.call(this, duration, sx, sy);
  },

  /*
   * Initializes the action.
   * @param {Number} duration
   * @param {Number} sx
   * @param {Number} [sy=]
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, sx, sy) {
    //function overload here
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      this._endScaleX = sx;
      this._endScaleY = sy != null ? sy : sx;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.ScaleTo();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._endScaleX, this._endScaleY);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._startScaleX = target.scaleX;
    this._startScaleY = target.scaleY;
    this._deltaX = this._endScaleX - this._startScaleX;
    this._deltaY = this._endScaleY - this._startScaleY;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    if (this.target) {
      this.target.scaleX = this._startScaleX + this._deltaX * dt;
      this.target.scaleY = this._startScaleY + this._deltaY * dt;
    }
  }
});
/**
 * !#en Scales a Node object to a zoom factor by modifying it's scale property.
 * !#zh 将节点大小缩放到指定的倍数。
 * @method scaleTo
 * @param {Number} duration
 * @param {Number} sx  scale parameter in X
 * @param {Number} [sy] scale parameter in Y, if Null equal to sx
 * @return {ActionInterval}
 * @example
 * // example
 * // It scales to 0.5 in both X and Y.
 * var actionTo = cc.scaleTo(2, 0.5);
 *
 * // It scales to 0.5 in x and 2 in Y
 * var actionTo = cc.scaleTo(2, 0.5, 2);
 */

cc.scaleTo = function (duration, sx, sy) {
  //function overload
  return new cc.ScaleTo(duration, sx, sy);
};
/* Scales a Node object a zoom factor by modifying it's scale property.
 * Relative to its changes.
 * @class ScaleBy
 * @extends ScaleTo
 */


cc.ScaleBy = cc.Class({
  name: 'cc.ScaleBy',
  "extends": cc.ScaleTo,
  startWithTarget: function startWithTarget(target) {
    cc.ScaleTo.prototype.startWithTarget.call(this, target);
    this._deltaX = this._startScaleX * this._endScaleX - this._startScaleX;
    this._deltaY = this._startScaleY * this._endScaleY - this._startScaleY;
  },
  reverse: function reverse() {
    var action = new cc.ScaleBy(this._duration, 1 / this._endScaleX, 1 / this._endScaleY);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  },
  clone: function clone() {
    var action = new cc.ScaleBy();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._endScaleX, this._endScaleY);
    return action;
  }
});
/**
 * !#en
 * Scales a Node object a zoom factor by modifying it's scale property.
 * Relative to its changes.
 * !#zh 按指定的倍数缩放节点大小。
 * @method scaleBy
 * @param {Number} duration duration in seconds
 * @param {Number} sx sx  scale parameter in X
 * @param {Number|Null} [sy=] sy scale parameter in Y, if Null equal to sx
 * @return {ActionInterval}
 * @example
 * // example without sy, it scales by 2 both in X and Y
 * var actionBy = cc.scaleBy(2, 2);
 *
 * //example with sy, it scales by 0.25 in X and 4.5 in Y
 * var actionBy2 = cc.scaleBy(2, 0.25, 4.5);
 */

cc.scaleBy = function (duration, sx, sy) {
  return new cc.ScaleBy(duration, sx, sy);
};
/* Blinks a Node object by modifying it's visible property
 * @class Blink
 * @extends ActionInterval
 * @param {Number} duration  duration in seconds
 * @param {Number} blinks  blinks in times
 * @example
 * var action = new cc.Blink(2, 10);
 */


cc.Blink = cc.Class({
  name: 'cc.Blink',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, blinks) {
    this._times = 0;
    this._originalState = false;
    blinks !== undefined && this.initWithDuration(duration, blinks);
  },

  /*
   * Initializes the action.
   * @param {Number} duration duration in seconds
   * @param {Number} blinks blinks in times
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, blinks) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      this._times = blinks;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.Blink();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._times);
    return action;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    if (this.target && !this.isDone()) {
      var slice = 1.0 / this._times;
      var m = dt % slice;
      this.target.opacity = m > slice / 2 ? 255 : 0;
    }
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._originalState = target.opacity;
  },
  stop: function stop() {
    this.target.opacity = this._originalState;
    cc.ActionInterval.prototype.stop.call(this);
  },
  reverse: function reverse() {
    var action = new cc.Blink(this._duration, this._times);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en Blinks a Node object by modifying it's visible property.
 * !#zh 闪烁（基于透明度）。
 * @method blink
 * @param {Number} duration  duration in seconds
 * @param {Number} blinks blinks in times
 * @return {ActionInterval}
 * @example
 * // example
 * var action = cc.blink(2, 10);
 */

cc.blink = function (duration, blinks) {
  return new cc.Blink(duration, blinks);
};
/* Fades an object that implements the cc.RGBAProtocol protocol. It modifies the opacity from the current value to a custom one.
 * @warning This action doesn't support "reverse"
 * @class FadeTo
 * @extends ActionInterval
 * @param {Number} duration
 * @param {Number} opacity 0-255, 0 is transparent
 * @example
 * var action = new cc.FadeTo(1.0, 0);
 */


cc.FadeTo = cc.Class({
  name: 'cc.FadeTo',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, opacity) {
    this._toOpacity = 0;
    this._fromOpacity = 0;
    opacity !== undefined && cc.FadeTo.prototype.initWithDuration.call(this, duration, opacity);
  },

  /*
   * Initializes the action.
   * @param {Number} duration  duration in seconds
   * @param {Number} opacity
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, opacity) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      this._toOpacity = opacity;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.FadeTo();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._toOpacity);
    return action;
  },
  update: function update(time) {
    time = this._computeEaseTime(time);
    var fromOpacity = this._fromOpacity !== undefined ? this._fromOpacity : 255;
    this.target.opacity = fromOpacity + (this._toOpacity - fromOpacity) * time;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._fromOpacity = target.opacity;
  }
});
/**
 * !#en
 * Fades an object that implements the cc.RGBAProtocol protocol.
 * It modifies the opacity from the current value to a custom one.
 * !#zh 修改透明度到指定值。
 * @method fadeTo
 * @param {Number} duration
 * @param {Number} opacity 0-255, 0 is transparent
 * @return {ActionInterval}
 * @example
 * // example
 * var action = cc.fadeTo(1.0, 0);
 */

cc.fadeTo = function (duration, opacity) {
  return new cc.FadeTo(duration, opacity);
};
/* Fades In an object that implements the cc.RGBAProtocol protocol. It modifies the opacity from 0 to 255.<br/>
 * The "reverse" of this action is FadeOut
 * @class FadeIn
 * @extends FadeTo
 * @param {Number} duration duration in seconds
 */


cc.FadeIn = cc.Class({
  name: 'cc.FadeIn',
  "extends": cc.FadeTo,
  ctor: function ctor(duration) {
    if (duration == null) duration = 0;
    this._reverseAction = null;
    this.initWithDuration(duration, 255);
  },
  reverse: function reverse() {
    var action = new cc.FadeOut();
    action.initWithDuration(this._duration, 0);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  },
  clone: function clone() {
    var action = new cc.FadeIn();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._toOpacity);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    if (this._reverseAction) this._toOpacity = this._reverseAction._fromOpacity;
    cc.FadeTo.prototype.startWithTarget.call(this, target);
  }
});
/**
 * !#en Fades In an object that implements the cc.RGBAProtocol protocol. It modifies the opacity from 0 to 255.
 * !#zh 渐显效果。
 * @method fadeIn
 * @param {Number} duration duration in seconds
 * @return {ActionInterval}
 * @example
 * //example
 * var action = cc.fadeIn(1.0);
 */

cc.fadeIn = function (duration) {
  return new cc.FadeIn(duration);
};
/* Fades Out an object that implements the cc.RGBAProtocol protocol. It modifies the opacity from 255 to 0.
 * The "reverse" of this action is FadeIn
 * @class FadeOut
 * @extends FadeTo
 * @param {Number} duration duration in seconds
 */


cc.FadeOut = cc.Class({
  name: 'cc.FadeOut',
  "extends": cc.FadeTo,
  ctor: function ctor(duration) {
    if (duration == null) duration = 0;
    this._reverseAction = null;
    this.initWithDuration(duration, 0);
  },
  reverse: function reverse() {
    var action = new cc.FadeIn();
    action._reverseAction = this;
    action.initWithDuration(this._duration, 255);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  },
  clone: function clone() {
    var action = new cc.FadeOut();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._toOpacity);
    return action;
  }
});
/**
 * !#en Fades Out an object that implements the cc.RGBAProtocol protocol. It modifies the opacity from 255 to 0.
 * !#zh 渐隐效果。
 * @method fadeOut
 * @param {Number} d  duration in seconds
 * @return {ActionInterval}
 * @example
 * // example
 * var action = cc.fadeOut(1.0);
 */

cc.fadeOut = function (d) {
  return new cc.FadeOut(d);
};
/* Tints a Node that implements the cc.NodeRGB protocol from current tint to a custom one.
 * @warning This action doesn't support "reverse"
 * @class TintTo
 * @extends ActionInterval
 * @param {Number} duration
 * @param {Number} red 0-255
 * @param {Number} green  0-255
 * @param {Number} blue 0-255
 * @example
 * var action = new cc.TintTo(2, 255, 0, 255);
 */


cc.TintTo = cc.Class({
  name: 'cc.TintTo',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, red, green, blue) {
    this._to = cc.color(0, 0, 0);
    this._from = cc.color(0, 0, 0);

    if (red instanceof cc.Color) {
      blue = red.b;
      green = red.g;
      red = red.r;
    }

    blue !== undefined && this.initWithDuration(duration, red, green, blue);
  },

  /*
   * Initializes the action.
   * @param {Number} duration
   * @param {Number} red 0-255
   * @param {Number} green 0-255
   * @param {Number} blue 0-255
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, red, green, blue) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      this._to = cc.color(red, green, blue);
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.TintTo();

    this._cloneDecoration(action);

    var locTo = this._to;
    action.initWithDuration(this._duration, locTo.r, locTo.g, locTo.b);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._from = this.target.color;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);
    var locFrom = this._from,
        locTo = this._to;

    if (locFrom) {
      this.target.color = cc.color(locFrom.r + (locTo.r - locFrom.r) * dt, locFrom.g + (locTo.g - locFrom.g) * dt, locFrom.b + (locTo.b - locFrom.b) * dt);
    }
  }
});
/**
 * !#en Tints a Node that implements the cc.NodeRGB protocol from current tint to a custom one.
 * !#zh 修改颜色到指定值。
 * @method tintTo
 * @param {Number} duration
 * @param {Number} red 0-255
 * @param {Number} green  0-255
 * @param {Number} blue 0-255
 * @return {ActionInterval}
 * @example
 * // example
 * var action = cc.tintTo(2, 255, 0, 255);
 */

cc.tintTo = function (duration, red, green, blue) {
  return new cc.TintTo(duration, red, green, blue);
};
/* Tints a Node that implements the cc.NodeRGB protocol from current tint to a custom one.
 * Relative to their own color change.
 * @class TintBy
 * @extends ActionInterval
 * @param {Number} duration  duration in seconds
 * @param {Number} deltaRed
 * @param {Number} deltaGreen
 * @param {Number} deltaBlue
 * @example
 * var action = new cc.TintBy(2, -127, -255, -127);
 */


cc.TintBy = cc.Class({
  name: 'cc.TintBy',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, deltaRed, deltaGreen, deltaBlue) {
    this._deltaR = 0;
    this._deltaG = 0;
    this._deltaB = 0;
    this._fromR = 0;
    this._fromG = 0;
    this._fromB = 0;
    deltaBlue !== undefined && this.initWithDuration(duration, deltaRed, deltaGreen, deltaBlue);
  },

  /*
   * Initializes the action.
   * @param {Number} duration
   * @param {Number} deltaRed 0-255
   * @param {Number} deltaGreen 0-255
   * @param {Number} deltaBlue 0-255
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, deltaRed, deltaGreen, deltaBlue) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      this._deltaR = deltaRed;
      this._deltaG = deltaGreen;
      this._deltaB = deltaBlue;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.TintBy();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._deltaR, this._deltaG, this._deltaB);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var color = target.color;
    this._fromR = color.r;
    this._fromG = color.g;
    this._fromB = color.b;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);
    this.target.color = cc.color(this._fromR + this._deltaR * dt, this._fromG + this._deltaG * dt, this._fromB + this._deltaB * dt);
  },
  reverse: function reverse() {
    var action = new cc.TintBy(this._duration, -this._deltaR, -this._deltaG, -this._deltaB);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en
 * Tints a Node that implements the cc.NodeRGB protocol from current tint to a custom one.
 * Relative to their own color change.
 * !#zh 按照指定的增量修改颜色。
 * @method tintBy
 * @param {Number} duration  duration in seconds
 * @param {Number} deltaRed
 * @param {Number} deltaGreen
 * @param {Number} deltaBlue
 * @return {ActionInterval}
 * @example
 * // example
 * var action = cc.tintBy(2, -127, -255, -127);
 */

cc.tintBy = function (duration, deltaRed, deltaGreen, deltaBlue) {
  return new cc.TintBy(duration, deltaRed, deltaGreen, deltaBlue);
};
/* Delays the action a certain amount of seconds
 * @class DelayTime
 * @extends ActionInterval
 */


cc.DelayTime = cc.Class({
  name: 'cc.DelayTime',
  "extends": cc.ActionInterval,
  update: function update(dt) {},
  reverse: function reverse() {
    var action = new cc.DelayTime(this._duration);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  },
  clone: function clone() {
    var action = new cc.DelayTime();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration);
    return action;
  }
});
/**
 * !#en Delays the action a certain amount of seconds.
 * !#zh 延迟指定的时间量。
 * @method delayTime
 * @param {Number} d duration in seconds
 * @return {ActionInterval}
 * @example
 * // example
 * var delay = cc.delayTime(1);
 */

cc.delayTime = function (d) {
  return new cc.DelayTime(d);
};
/*
 * <p>
 * Executes an action in reverse order, from time=duration to time=0                                     <br/>
 * @warning Use this action carefully. This action is not sequenceable.                                 <br/>
 * Use it as the default "reversed" method of your own actions, but using it outside the "reversed"      <br/>
 * scope is not recommended.
 * </p>
 * @class ReverseTime
 * @extends ActionInterval
 * @param {FiniteTimeAction} action
 * @example
 *  var reverse = new cc.ReverseTime(this);
 */


cc.ReverseTime = cc.Class({
  name: 'cc.ReverseTime',
  "extends": cc.ActionInterval,
  ctor: function ctor(action) {
    this._other = null;
    action && this.initWithAction(action);
  },

  /*
   * @param {FiniteTimeAction} action
   * @return {Boolean}
   */
  initWithAction: function initWithAction(action) {
    if (!action) {
      cc.errorID(1028);
      return false;
    }

    if (action === this._other) {
      cc.errorID(1029);
      return false;
    }

    if (cc.ActionInterval.prototype.initWithDuration.call(this, action._duration)) {
      // Don't leak if action is reused
      this._other = action;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.ReverseTime();

    this._cloneDecoration(action);

    action.initWithAction(this._other.clone());
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);

    this._other.startWithTarget(target);
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);
    if (this._other) this._other.update(1 - dt);
  },
  reverse: function reverse() {
    return this._other.clone();
  },
  stop: function stop() {
    this._other.stop();

    cc.Action.prototype.stop.call(this);
  }
});
/**
 * !#en Executes an action in reverse order, from time=duration to time=0.
 * !#zh 反转目标动作的时间轴。
 * @method reverseTime
 * @param {FiniteTimeAction} action
 * @return {ActionInterval}
 * @example
 * // example
 *  var reverse = cc.reverseTime(this);
 */

cc.reverseTime = function (action) {
  return new cc.ReverseTime(action);
};
/*
 * <p>
 * Overrides the target of an action so that it always runs on the target<br/>
 * specified at action creation rather than the one specified by runAction.
 * </p>
 * @class TargetedAction
 * @extends ActionInterval
 * @param {Node} target
 * @param {FiniteTimeAction} action
 */


cc.TargetedAction = cc.Class({
  name: 'cc.TargetedAction',
  "extends": cc.ActionInterval,
  ctor: function ctor(target, action) {
    this._action = null;
    this._forcedTarget = null;
    action && this.initWithTarget(target, action);
  },

  /*
   * Init an action with the specified action and forced target
   * @param {Node} target
   * @param {FiniteTimeAction} action
   * @return {Boolean}
   */
  initWithTarget: function initWithTarget(target, action) {
    if (this.initWithDuration(action._duration)) {
      this._forcedTarget = target;
      this._action = action;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.TargetedAction();

    this._cloneDecoration(action);

    action.initWithTarget(this._forcedTarget, this._action.clone());
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);

    this._action.startWithTarget(this._forcedTarget);
  },
  stop: function stop() {
    this._action.stop();
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    this._action.update(dt);
  },

  /*
   * return the target that the action will be forced to run with
   * @return {Node}
   */
  getForcedTarget: function getForcedTarget() {
    return this._forcedTarget;
  },

  /*
   * set the target that the action will be forced to run with
   * @param {Node} forcedTarget
   */
  setForcedTarget: function setForcedTarget(forcedTarget) {
    if (this._forcedTarget !== forcedTarget) this._forcedTarget = forcedTarget;
  }
});
/**
 * !#en Create an action with the specified action and forced target.
 * !#zh 用已有动作和一个新的目标节点创建动作。
 * @method targetedAction
 * @param {Node} target
 * @param {FiniteTimeAction} action
 * @return {ActionInterval}
 */

cc.targetedAction = function (target, action) {
  return new cc.TargetedAction(target, action);
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9hY3Rpb25zL0NDQWN0aW9uSW50ZXJ2YWwuanMiXSwibmFtZXMiOlsiY2MiLCJBY3Rpb25JbnRlcnZhbCIsIkNsYXNzIiwibmFtZSIsIkZpbml0ZVRpbWVBY3Rpb24iLCJjdG9yIiwiZCIsIk1BWF9WQUxVRSIsIl9lbGFwc2VkIiwiX2ZpcnN0VGljayIsIl9lYXNlTGlzdCIsIl9zcGVlZCIsIl90aW1lc0ZvclJlcGVhdCIsIl9yZXBlYXRGb3JldmVyIiwiX3JlcGVhdE1ldGhvZCIsIl9zcGVlZE1ldGhvZCIsInVuZGVmaW5lZCIsInByb3RvdHlwZSIsImluaXRXaXRoRHVyYXRpb24iLCJjYWxsIiwiZ2V0RWxhcHNlZCIsIl9kdXJhdGlvbiIsIm1hY3JvIiwiRkxUX0VQU0lMT04iLCJpc0RvbmUiLCJfY2xvbmVEZWNvcmF0aW9uIiwiYWN0aW9uIiwiX3JldmVyc2VFYXNlTGlzdCIsImkiLCJsZW5ndGgiLCJwdXNoIiwicmV2ZXJzZSIsImNsb25lIiwiZWFzaW5nIiwiZWFzZU9iaiIsImFyZ3VtZW50cyIsIl9jb21wdXRlRWFzZVRpbWUiLCJkdCIsImxvY0xpc3QiLCJuIiwic3RlcCIsInQiLCJ1cGRhdGUiLCJzdGFydFdpdGhUYXJnZXQiLCJ0YXJnZXQiLCJBY3Rpb24iLCJsb2dJRCIsInNldEFtcGxpdHVkZVJhdGUiLCJhbXAiLCJnZXRBbXBsaXR1ZGVSYXRlIiwic3BlZWQiLCJnZXRTcGVlZCIsInNldFNwZWVkIiwicmVwZWF0IiwidGltZXMiLCJNYXRoIiwicm91bmQiLCJpc05hTiIsInJlcGVhdEZvcmV2ZXIiLCJhY3Rpb25JbnRlcnZhbCIsIlNlcXVlbmNlIiwidGVtcEFycmF5IiwiX2FjdGlvbnMiLCJfc3BsaXQiLCJfbGFzdCIsIl9yZXZlcnNlZCIsInBhcmFtQXJyYXkiLCJBcnJheSIsImVycm9ySUQiLCJsYXN0IiwicHJldiIsImFjdGlvbjEiLCJfYWN0aW9uT25lVHdvIiwiaW5pdFdpdGhUd29BY3Rpb25zIiwiYWN0aW9uT25lIiwiYWN0aW9uVHdvIiwiZHVyYXRpb25PbmUiLCJkdXJhdGlvblR3byIsInN0b3AiLCJuZXdfdCIsImZvdW5kIiwibG9jU3BsaXQiLCJsb2NBY3Rpb25zIiwibG9jTGFzdCIsImFjdGlvbkZvdW5kIiwic2VxdWVuY2UiLCJyZXN1bHQiLCJSZXBlYXQiLCJfdGltZXMiLCJfdG90YWwiLCJfbmV4dER0IiwiX2FjdGlvbkluc3RhbnQiLCJfaW5uZXJBY3Rpb24iLCJpbml0V2l0aEFjdGlvbiIsImR1cmF0aW9uIiwiQWN0aW9uSW5zdGFudCIsImxvY0lubmVyQWN0aW9uIiwibG9jRHVyYXRpb24iLCJsb2NUaW1lcyIsImxvY05leHREdCIsInNldElubmVyQWN0aW9uIiwiZ2V0SW5uZXJBY3Rpb24iLCJSZXBlYXRGb3JldmVyIiwiU3Bhd24iLCJfb25lIiwiX3R3byIsImFjdGlvbjIiLCJyZXQiLCJkMSIsImQyIiwibWF4IiwiZGVsYXlUaW1lIiwic3Bhd24iLCJwU3Bhd24iLCJSb3RhdGVUbyIsInN0YXRpY3MiLCJfcmV2ZXJzZSIsImRzdEFuZ2xlIiwiX3N0YXJ0QW5nbGUiLCJfZHN0QW5nbGUiLCJfYW5nbGUiLCJzdGFydEFuZ2xlIiwiYW5nbGUiLCJyb3RhdGVUbyIsIlJvdGF0ZUJ5IiwiZGVsdGFBbmdsZSIsIl9kZWx0YUFuZ2xlIiwicm90YXRlQnkiLCJNb3ZlQnkiLCJkZWx0YVBvcyIsImRlbHRhWSIsIl9wb3NpdGlvbkRlbHRhIiwidjIiLCJfc3RhcnRQb3NpdGlvbiIsIl9wcmV2aW91c1Bvc2l0aW9uIiwicG9zaXRpb24iLCJ5IiwieCIsImxvY1Bvc1giLCJsb2NQb3NZIiwibG9jU3RhcnRQb3NpdGlvbiIsIkVOQUJMRV9TVEFDS0FCTEVfQUNUSU9OUyIsInRhcmdldFgiLCJ0YXJnZXRZIiwibG9jUHJldmlvdXNQb3NpdGlvbiIsInNldFBvc2l0aW9uIiwibW92ZUJ5IiwiTW92ZVRvIiwiX2VuZFBvc2l0aW9uIiwibW92ZVRvIiwiU2tld1RvIiwic3giLCJzeSIsIl9za2V3WCIsIl9za2V3WSIsIl9zdGFydFNrZXdYIiwiX3N0YXJ0U2tld1kiLCJfZW5kU2tld1giLCJfZW5kU2tld1kiLCJfZGVsdGFYIiwiX2RlbHRhWSIsInNrZXdYIiwic2tld1kiLCJza2V3VG8iLCJTa2V3QnkiLCJkZWx0YVNrZXdYIiwiZGVsdGFTa2V3WSIsInNrZXdCeSIsIkp1bXBCeSIsImhlaWdodCIsImp1bXBzIiwiX2RlbHRhIiwiX2hlaWdodCIsIl9qdW1wcyIsImZyYWMiLCJqdW1wQnkiLCJKdW1wVG8iLCJqdW1wVG8iLCJiZXppZXJBdCIsImEiLCJiIiwiYyIsInBvdyIsIkJlemllckJ5IiwiX2NvbmZpZyIsIm5ld0NvbmZpZ3MiLCJzZWxDb25mIiwibG9jQ29uZmlnIiwieGEiLCJ4YiIsInhjIiwieGQiLCJ5YSIsInliIiwieWMiLCJ5ZCIsIngwIiwieTAiLCJ4MSIsInkxIiwieDIiLCJ5MiIsInIiLCJiZXppZXJCeSIsIkJlemllclRvIiwiX3RvQ29uZmlnIiwibG9jU3RhcnRQb3MiLCJsb2NUb0NvbmZpZyIsInN1YiIsImJlemllclRvIiwiU2NhbGVUbyIsIl9zY2FsZVgiLCJfc2NhbGVZIiwiX3N0YXJ0U2NhbGVYIiwiX3N0YXJ0U2NhbGVZIiwiX2VuZFNjYWxlWCIsIl9lbmRTY2FsZVkiLCJzY2FsZVgiLCJzY2FsZVkiLCJzY2FsZVRvIiwiU2NhbGVCeSIsInNjYWxlQnkiLCJCbGluayIsImJsaW5rcyIsIl9vcmlnaW5hbFN0YXRlIiwic2xpY2UiLCJtIiwib3BhY2l0eSIsImJsaW5rIiwiRmFkZVRvIiwiX3RvT3BhY2l0eSIsIl9mcm9tT3BhY2l0eSIsInRpbWUiLCJmcm9tT3BhY2l0eSIsImZhZGVUbyIsIkZhZGVJbiIsIl9yZXZlcnNlQWN0aW9uIiwiRmFkZU91dCIsImZhZGVJbiIsImZhZGVPdXQiLCJUaW50VG8iLCJyZWQiLCJncmVlbiIsImJsdWUiLCJfdG8iLCJjb2xvciIsIl9mcm9tIiwiQ29sb3IiLCJnIiwibG9jVG8iLCJsb2NGcm9tIiwidGludFRvIiwiVGludEJ5IiwiZGVsdGFSZWQiLCJkZWx0YUdyZWVuIiwiZGVsdGFCbHVlIiwiX2RlbHRhUiIsIl9kZWx0YUciLCJfZGVsdGFCIiwiX2Zyb21SIiwiX2Zyb21HIiwiX2Zyb21CIiwidGludEJ5IiwiRGVsYXlUaW1lIiwiUmV2ZXJzZVRpbWUiLCJfb3RoZXIiLCJyZXZlcnNlVGltZSIsIlRhcmdldGVkQWN0aW9uIiwiX2FjdGlvbiIsIl9mb3JjZWRUYXJnZXQiLCJpbml0V2l0aFRhcmdldCIsImdldEZvcmNlZFRhcmdldCIsInNldEZvcmNlZFRhcmdldCIsImZvcmNlZFRhcmdldCIsInRhcmdldGVkQWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCQTs7OztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkFBLEVBQUUsQ0FBQ0MsY0FBSCxHQUFvQkQsRUFBRSxDQUFDRSxLQUFILENBQVM7QUFDekJDLEVBQUFBLElBQUksRUFBRSxtQkFEbUI7QUFFekIsYUFBU0gsRUFBRSxDQUFDSSxnQkFGYTtBQUl6QkMsRUFBQUEsSUFBSSxFQUFDLGNBQVVDLENBQVYsRUFBYTtBQUNkLFNBQUtDLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLENBQWhCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixLQUFsQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtDLGVBQUwsR0FBdUIsQ0FBdkI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLEtBQXRCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQixLQUFyQixDQVJjLENBUWE7O0FBQzNCLFNBQUtDLFlBQUwsR0FBb0IsS0FBcEIsQ0FUYyxDQVNZOztBQUMxQlQsSUFBQUEsQ0FBQyxLQUFLVSxTQUFOLElBQW1CaEIsRUFBRSxDQUFDQyxjQUFILENBQWtCZ0IsU0FBbEIsQ0FBNEJDLGdCQUE1QixDQUE2Q0MsSUFBN0MsQ0FBa0QsSUFBbEQsRUFBd0RiLENB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O0FBc0R6Qjs7OztBQUlBRyxFQUFBQSxlQUFlLEVBQUMseUJBQVVDLFlBQVYsRUFBd0I7QUFDcEMsUUFBSSxLQUFLSixhQUFMLEtBQXVCSSxZQUEzQixFQUNJLEtBQUtKLGFBQUwsR0FBcUJJLFlBQXJCO0FBQ1A7QUE3RHdCLENBQVQsQ0FBcEI7QUFnRUE7Ozs7Ozs7OztBQVFBalIsRUFBRSxDQUFDa1IsY0FBSCxHQUFvQixVQUFVdE8sTUFBVixFQUFrQmxCLE1BQWxCLEVBQTBCO0FBQzFDLFNBQU8sSUFBSTFCLEVBQUUsQ0FBQzJRLGNBQVAsQ0FBc0IvTixNQUF0QixFQUE4QmxCLE1BQTlCLENBQVA7QUFDSCxDQUZEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMCBSaWNhcmRvIFF1ZXNhZGFcbiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxMiBjb2NvczJkLXgub3JnXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbi8qKlxuICogQG1vZHVsZSBjY1xuICovXG5cbi8qKlxuICogISNlblxuICogPHA+IEFuIGludGVydmFsIGFjdGlvbiBpcyBhbiBhY3Rpb24gdGhhdCB0YWtlcyBwbGFjZSB3aXRoaW4gYSBjZXJ0YWluIHBlcmlvZCBvZiB0aW1lLiA8YnIvPlxuICogSXQgaGFzIGFuIHN0YXJ0IHRpbWUsIGFuZCBhIGZpbmlzaCB0aW1lLiBUaGUgZmluaXNoIHRpbWUgaXMgdGhlIHBhcmFtZXRlcjxici8+XG4gKiBkdXJhdGlvbiBwbHVzIHRoZSBzdGFydCB0aW1lLjwvcD5cbiAqXG4gKiA8cD5UaGVzZSBDQ0FjdGlvbkludGVydmFsIGFjdGlvbnMgaGF2ZSBzb21lIGludGVyZXN0aW5nIHByb3BlcnRpZXMsIGxpa2U6PGJyLz5cbiAqIC0gVGhleSBjYW4gcnVuIG5vcm1hbGx5IChkZWZhdWx0KSAgPGJyLz5cbiAqIC0gVGhleSBjYW4gcnVuIHJldmVyc2VkIHdpdGggdGhlIHJldmVyc2UgbWV0aG9kICAgPGJyLz5cbiAqIC0gVGhleSBjYW4gcnVuIHdpdGggdGhlIHRpbWUgYWx0ZXJlZCB3aXRoIHRoZSBBY2NlbGVyYXRlLCBBY2NlbERlY2NlbCBhbmQgU3BlZWQgYWN0aW9ucy4gPC9wPlxuICpcbiAqIDxwPkZvciBleGFtcGxlLCB5b3UgY2FuIHNpbXVsYXRlIGEgUGluZyBQb25nIGVmZmVjdCBydW5uaW5nIHRoZSBhY3Rpb24gbm9ybWFsbHkgYW5kPGJyLz5cbiAqIHRoZW4gcnVubmluZyBpdCBhZ2FpbiBpbiBSZXZlcnNlIG1vZGUuIDwvcD5cbiAqICEjemgg5pe26Ze06Ze06ZqU5Yqo5L2c77yM6L+Z56eN5Yqo5L2c5Zyo5bey5a6a5pe26Ze05YaF5a6M5oiQ77yM57un5om/IEZpbml0ZVRpbWVBY3Rpb27jgIJcbiAqIEBjbGFzcyBBY3Rpb25JbnRlcnZhbFxuICogQGV4dGVuZHMgRmluaXRlVGltZUFjdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGQgZHVyYXRpb24gaW4gc2Vjb25kc1xuICovXG5jYy5BY3Rpb25JbnRlcnZhbCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuQWN0aW9uSW50ZXJ2YWwnLFxuICAgIGV4dGVuZHM6IGNjLkZpbml0ZVRpbWVBY3Rpb24sXG5cbiAgICBjdG9yOmZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHRoaXMuTUFYX1ZBTFVFID0gMjtcbiAgICAgICAgdGhpcy5fZWxhcHNlZCA9IDA7XG4gICAgICAgIHRoaXMuX2ZpcnN0VGljayA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lYXNlTGlzdCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NwZWVkID0gMTtcbiAgICAgICAgdGhpcy5fdGltZXNGb3JSZXBlYXQgPSAxO1xuICAgICAgICB0aGlzLl9yZXBlYXRGb3JldmVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3JlcGVhdE1ldGhvZCA9IGZhbHNlOy8vQ29tcGF0aWJsZSB3aXRoIHJlcGVhdCBjbGFzcywgRGlzY2FyZCBhZnRlciBjYW4gYmUgZGVsZXRlZFxuICAgICAgICB0aGlzLl9zcGVlZE1ldGhvZCA9IGZhbHNlOy8vQ29tcGF0aWJsZSB3aXRoIHJlcGVhdCBjbGFzcywgRGlzY2FyZCBhZnRlciBjYW4gYmUgZGVsZXRlZFxuICAgICAgICBkICE9PSB1bmRlZmluZWQgJiYgY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCBkKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBIb3cgbWFueSBzZWNvbmRzIGhhZCBlbGFwc2VkIHNpbmNlIHRoZSBhY3Rpb25zIHN0YXJ0ZWQgdG8gcnVuLlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRFbGFwc2VkOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsYXBzZWQ7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGFjdGlvbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZCBkdXJhdGlvbiBpbiBzZWNvbmRzXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpbml0V2l0aER1cmF0aW9uOmZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHRoaXMuX2R1cmF0aW9uID0gKGQgPT09IDApID8gY2MubWFjcm8uRkxUX0VQU0lMT04gOiBkO1xuICAgICAgICAvLyBwcmV2ZW50IGRpdmlzaW9uIGJ5IDBcbiAgICAgICAgLy8gVGhpcyBjb21wYXJpc29uIGNvdWxkIGJlIGluIHN0ZXA6LCBidXQgaXQgbWlnaHQgZGVjcmVhc2UgdGhlIHBlcmZvcm1hbmNlXG4gICAgICAgIC8vIGJ5IDMlIGluIGhlYXZ5IGJhc2VkIGFjdGlvbiBnYW1lcy5cbiAgICAgICAgdGhpcy5fZWxhcHNlZCA9IDA7XG4gICAgICAgIHRoaXMuX2ZpcnN0VGljayA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBpc0RvbmU6ZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuX2VsYXBzZWQgPj0gdGhpcy5fZHVyYXRpb24pO1xuICAgIH0sXG5cbiAgICBfY2xvbmVEZWNvcmF0aW9uOiBmdW5jdGlvbihhY3Rpb24pe1xuICAgICAgICBhY3Rpb24uX3JlcGVhdEZvcmV2ZXIgPSB0aGlzLl9yZXBlYXRGb3JldmVyO1xuICAgICAgICBhY3Rpb24uX3NwZWVkID0gdGhpcy5fc3BlZWQ7XG4gICAgICAgIGFjdGlvbi5fdGltZXNGb3JSZXBlYXQgPSB0aGlzLl90aW1lc0ZvclJlcGVhdDtcbiAgICAgICAgYWN0aW9uLl9lYXNlTGlzdCA9IHRoaXMuX2Vhc2VMaXN0O1xuICAgICAgICBhY3Rpb24uX3NwZWVkTWV0aG9kID0gdGhpcy5fc3BlZWRNZXRob2Q7XG4gICAgICAgIGFjdGlvbi5fcmVwZWF0TWV0aG9kID0gdGhpcy5fcmVwZWF0TWV0aG9kO1xuICAgIH0sXG5cbiAgICBfcmV2ZXJzZUVhc2VMaXN0OiBmdW5jdGlvbihhY3Rpb24pe1xuICAgICAgICBpZih0aGlzLl9lYXNlTGlzdCl7XG4gICAgICAgICAgICBhY3Rpb24uX2Vhc2VMaXN0ID0gW107XG4gICAgICAgICAgICBmb3IodmFyIGk9MDsgaTx0aGlzLl9lYXNlTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgYWN0aW9uLl9lYXNlTGlzdC5wdXNoKHRoaXMuX2Vhc2VMaXN0W2ldLnJldmVyc2UoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLkFjdGlvbkludGVydmFsKHRoaXMuX2R1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gSW1wbGVtZW50YXRpb24gb2YgZWFzZSBtb3Rpb24uXG4gICAgICogISN6aCDnvJPliqjov5DliqjjgIJcbiAgICAgKiBAbWV0aG9kIGVhc2luZ1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlYXNlT2JqXG4gICAgICogQHJldHVybnMge0FjdGlvbkludGVydmFsfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogYWN0aW9uLmVhc2luZyhjYy5lYXNlSW4oMy4wKSk7XG4gICAgICovXG4gICAgZWFzaW5nOiBmdW5jdGlvbiAoZWFzZU9iaikge1xuICAgICAgICBpZiAodGhpcy5fZWFzZUxpc3QpXG4gICAgICAgICAgICB0aGlzLl9lYXNlTGlzdC5sZW5ndGggPSAwO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLl9lYXNlTGlzdCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHRoaXMuX2Vhc2VMaXN0LnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIF9jb21wdXRlRWFzZVRpbWU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICB2YXIgbG9jTGlzdCA9IHRoaXMuX2Vhc2VMaXN0O1xuICAgICAgICBpZiAoKCFsb2NMaXN0KSB8fCAobG9jTGlzdC5sZW5ndGggPT09IDApKVxuICAgICAgICAgICAgcmV0dXJuIGR0O1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbiA9IGxvY0xpc3QubGVuZ3RoOyBpIDwgbjsgaSsrKVxuICAgICAgICAgICAgZHQgPSBsb2NMaXN0W2ldLmVhc2luZyhkdCk7XG4gICAgICAgIHJldHVybiBkdDtcbiAgICB9LFxuXG4gICAgc3RlcDpmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpcnN0VGljaykge1xuICAgICAgICAgICAgdGhpcy5fZmlyc3RUaWNrID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9lbGFwc2VkID0gMDtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICB0aGlzLl9lbGFwc2VkICs9IGR0O1xuXG4gICAgICAgIC8vdGhpcy51cGRhdGUoKDEgPiAodGhpcy5fZWxhcHNlZCAvIHRoaXMuX2R1cmF0aW9uKSkgPyB0aGlzLl9lbGFwc2VkIC8gdGhpcy5fZHVyYXRpb24gOiAxKTtcbiAgICAgICAgLy90aGlzLnVwZGF0ZShNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB0aGlzLl9lbGFwc2VkIC8gTWF0aC5tYXgodGhpcy5fZHVyYXRpb24sIGNjLm1hY3JvLkZMVF9FUFNJTE9OKSkpKTtcbiAgICAgICAgdmFyIHQgPSB0aGlzLl9lbGFwc2VkIC8gKHRoaXMuX2R1cmF0aW9uID4gMC4wMDAwMDAxMTkyMDkyODk2ID8gdGhpcy5fZHVyYXRpb24gOiAwLjAwMDAwMDExOTIwOTI4OTYpO1xuICAgICAgICB0ID0gKDEgPiB0ID8gdCA6IDEpO1xuICAgICAgICB0aGlzLnVwZGF0ZSh0ID4gMCA/IHQgOiAwKTtcblxuICAgICAgICAvL0NvbXBhdGlibGUgd2l0aCByZXBlYXQgY2xhc3MsIERpc2NhcmQgYWZ0ZXIgY2FuIGJlIGRlbGV0ZWQgKHRoaXMuX3JlcGVhdE1ldGhvZClcbiAgICAgICAgaWYodGhpcy5fcmVwZWF0TWV0aG9kICYmIHRoaXMuX3RpbWVzRm9yUmVwZWF0ID4gMSAmJiB0aGlzLmlzRG9uZSgpKXtcbiAgICAgICAgICAgIGlmKCF0aGlzLl9yZXBlYXRGb3JldmVyKXtcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lc0ZvclJlcGVhdC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy92YXIgZGlmZiA9IGxvY0lubmVyQWN0aW9uLmdldEVsYXBzZWQoKSAtIGxvY0lubmVyQWN0aW9uLl9kdXJhdGlvbjtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRXaXRoVGFyZ2V0KHRoaXMudGFyZ2V0KTtcbiAgICAgICAgICAgIC8vIHRvIHByZXZlbnQgamVyay4gaXNzdWUgIzM5MCAsMTI0N1xuICAgICAgICAgICAgLy90aGlzLl9pbm5lckFjdGlvbi5zdGVwKDApO1xuICAgICAgICAgICAgLy90aGlzLl9pbm5lckFjdGlvbi5zdGVwKGRpZmYpO1xuICAgICAgICAgICAgdGhpcy5zdGVwKHRoaXMuX2VsYXBzZWQgLSB0aGlzLl9kdXJhdGlvbik7XG5cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBjYy5BY3Rpb24ucHJvdG90eXBlLnN0YXJ0V2l0aFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICAgIHRoaXMuX2VsYXBzZWQgPSAwO1xuICAgICAgICB0aGlzLl9maXJzdFRpY2sgPSB0cnVlO1xuICAgIH0sXG5cbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MubG9nSUQoMTAxMCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIFNldCBhbXBsaXR1ZGUgcmF0ZS5cbiAgICAgKiBAd2FybmluZyBJdCBzaG91bGQgYmUgb3ZlcnJpZGRlbiBpbiBzdWJjbGFzcy5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYW1wXG4gICAgICovXG4gICAgc2V0QW1wbGl0dWRlUmF0ZTpmdW5jdGlvbiAoYW1wKSB7XG4gICAgICAgIC8vIEFic3RyYWN0IGNsYXNzIG5lZWRzIGltcGxlbWVudGF0aW9uXG4gICAgICAgIGNjLmxvZ0lEKDEwMTEpO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIEdldCBhbXBsaXR1ZGUgcmF0ZS5cbiAgICAgKiBAd2FybmluZyBJdCBzaG91bGQgYmUgb3ZlcnJpZGRlbiBpbiBzdWJjbGFzcy5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IDBcbiAgICAgKi9cbiAgICBnZXRBbXBsaXR1ZGVSYXRlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gQWJzdHJhY3QgY2xhc3MgbmVlZHMgaW1wbGVtZW50YXRpb25cbiAgICAgICAgY2MubG9nSUQoMTAxMik7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ2hhbmdlcyB0aGUgc3BlZWQgb2YgYW4gYWN0aW9uLCBtYWtpbmcgaXQgdGFrZSBsb25nZXIgKHNwZWVkPjEpXG4gICAgICogb3IgbGVzcyAoc3BlZWQ8MSkgdGltZS4gPGJyLz5cbiAgICAgKiBVc2VmdWwgdG8gc2ltdWxhdGUgJ3Nsb3cgbW90aW9uJyBvciAnZmFzdCBmb3J3YXJkJyBlZmZlY3QuXG4gICAgICogISN6aFxuICAgICAqIOaUueWPmOS4gOS4quWKqOS9nOeahOmAn+W6pu+8jOS9v+Wug+eahOaJp+ihjOS9v+eUqOabtOmVv+eahOaXtumXtO+8iHNwZWVkID4gMe+8iTxici8+XG4gICAgICog5oiW5pu05bCR77yIc3BlZWQgPCAx77yJ5Y+v5Lul5pyJ5pWI5b6X5qih5ouf4oCc5oWi5Yqo5L2c4oCd5oiW4oCc5b+r6L+b4oCd55qE5pWI5p6c44CCXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNwZWVkXG4gICAgICogQHJldHVybnMge0FjdGlvbn1cbiAgICAgKi9cbiAgICBzcGVlZDogZnVuY3Rpb24oc3BlZWQpe1xuICAgICAgICBpZihzcGVlZCA8PSAwKXtcbiAgICAgICAgICAgIGNjLmxvZ0lEKDEwMTMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zcGVlZE1ldGhvZCA9IHRydWU7Ly9Db21wYXRpYmxlIHdpdGggcmVwZWF0IGNsYXNzLCBEaXNjYXJkIGFmdGVyIGNhbiBiZSBkZWxldGVkXG4gICAgICAgIHRoaXMuX3NwZWVkICo9IHNwZWVkO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoaXMgYWN0aW9uIHNwZWVkLlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRTcGVlZDogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWVkO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhpcyBhY3Rpb24gc3BlZWQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNwZWVkXG4gICAgICogQHJldHVybnMge0FjdGlvbkludGVydmFsfVxuICAgICAqL1xuICAgIHNldFNwZWVkOiBmdW5jdGlvbihzcGVlZCl7XG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmVwZWF0cyBhbiBhY3Rpb24gYSBudW1iZXIgb2YgdGltZXMuXG4gICAgICogVG8gcmVwZWF0IGFuIGFjdGlvbiBmb3JldmVyIHVzZSB0aGUgQ0NSZXBlYXRGb3JldmVyIGFjdGlvbi5cbiAgICAgKiAhI3poIOmHjeWkjeWKqOS9nOWPr+S7peaMieS4gOWumuasoeaVsOmHjeWkjeS4gOS4quWKqOS9nO+8jOS9v+eUqCBSZXBlYXRGb3JldmVyIOWKqOS9nOadpeawuOi/nOmHjeWkjeS4gOS4quWKqOS9nOOAglxuICAgICAqIEBtZXRob2QgcmVwZWF0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVzXG4gICAgICogQHJldHVybnMge0FjdGlvbkludGVydmFsfVxuICAgICAqL1xuICAgIHJlcGVhdDogZnVuY3Rpb24odGltZXMpe1xuICAgICAgICB0aW1lcyA9IE1hdGgucm91bmQodGltZXMpO1xuICAgICAgICBpZihpc05hTih0aW1lcykgfHwgdGltZXMgPCAxKXtcbiAgICAgICAgICAgIGNjLmxvZ0lEKDEwMTQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVwZWF0TWV0aG9kID0gdHJ1ZTsvL0NvbXBhdGlibGUgd2l0aCByZXBlYXQgY2xhc3MsIERpc2NhcmQgYWZ0ZXIgY2FuIGJlIGRlbGV0ZWRcbiAgICAgICAgdGhpcy5fdGltZXNGb3JSZXBlYXQgKj0gdGltZXM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmVwZWF0cyBhbiBhY3Rpb24gZm9yIGV2ZXIuICA8YnIvPlxuICAgICAqIFRvIHJlcGVhdCB0aGUgYW4gYWN0aW9uIGZvciBhIGxpbWl0ZWQgbnVtYmVyIG9mIHRpbWVzIHVzZSB0aGUgUmVwZWF0IGFjdGlvbi4gPGJyLz5cbiAgICAgKiAhI3poIOawuOi/nOWcsOmHjeWkjeS4gOS4quWKqOS9nO+8jOaciemZkOasoeaVsOWGhemHjeWkjeS4gOS4quWKqOS9nOivt+S9v+eUqCBSZXBlYXQg5Yqo5L2c44CCXG4gICAgICogQG1ldGhvZCByZXBlYXRGb3JldmVyXG4gICAgICogQHJldHVybnMge0FjdGlvbkludGVydmFsfVxuICAgICAqL1xuICAgIHJlcGVhdEZvcmV2ZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuX3JlcGVhdE1ldGhvZCA9IHRydWU7Ly9Db21wYXRpYmxlIHdpdGggcmVwZWF0IGNsYXNzLCBEaXNjYXJkIGFmdGVyIGNhbiBiZSBkZWxldGVkXG4gICAgICAgIHRoaXMuX3RpbWVzRm9yUmVwZWF0ID0gdGhpcy5NQVhfVkFMVUU7XG4gICAgICAgIHRoaXMuX3JlcGVhdEZvcmV2ZXIgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59KTtcblxuY2MuYWN0aW9uSW50ZXJ2YWwgPSBmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBuZXcgY2MuQWN0aW9uSW50ZXJ2YWwoZCk7XG59O1xuXG4vKipcbiAqIEBtb2R1bGUgY2NcbiAqL1xuXG4vKlxuICogUnVucyBhY3Rpb25zIHNlcXVlbnRpYWxseSwgb25lIGFmdGVyIGFub3RoZXIuXG4gKiBAY2xhc3MgU2VxdWVuY2VcbiAqIEBleHRlbmRzIEFjdGlvbkludGVydmFsXG4gKiBAcGFyYW0ge0FycmF5fEZpbml0ZVRpbWVBY3Rpb259IHRlbXBBcnJheVxuICogQGV4YW1wbGVcbiAqIC8vIGNyZWF0ZSBzZXF1ZW5jZSB3aXRoIGFjdGlvbnNcbiAqIHZhciBzZXEgPSBuZXcgY2MuU2VxdWVuY2UoYWN0MSwgYWN0Mik7XG4gKlxuICogLy8gY3JlYXRlIHNlcXVlbmNlIHdpdGggYXJyYXlcbiAqIHZhciBzZXEgPSBuZXcgY2MuU2VxdWVuY2UoYWN0QXJyYXkpO1xuICovXG5jYy5TZXF1ZW5jZSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuU2VxdWVuY2UnLFxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxuXG4gICAgY3RvcjpmdW5jdGlvbiAodGVtcEFycmF5KSB7XG4gICAgICAgIHRoaXMuX2FjdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5fc3BsaXQgPSBudWxsO1xuICAgICAgICB0aGlzLl9sYXN0ID0gMDtcbiAgICAgICAgdGhpcy5fcmV2ZXJzZWQgPSBmYWxzZTtcblxuICAgICAgICB2YXIgcGFyYW1BcnJheSA9ICh0ZW1wQXJyYXkgaW5zdGFuY2VvZiBBcnJheSkgPyB0ZW1wQXJyYXkgOiBhcmd1bWVudHM7XG4gICAgICAgIGlmIChwYXJhbUFycmF5Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgxMDE5KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGFzdCA9IHBhcmFtQXJyYXkubGVuZ3RoIC0gMTtcbiAgICAgICAgaWYgKChsYXN0ID49IDApICYmIChwYXJhbUFycmF5W2xhc3RdID09IG51bGwpKVxuICAgICAgICAgICAgY2MubG9nSUQoMTAxNSk7XG5cbiAgICAgICAgaWYgKGxhc3QgPj0gMCkge1xuICAgICAgICAgICAgdmFyIHByZXYgPSBwYXJhbUFycmF5WzBdLCBhY3Rpb24xO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBsYXN0OyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1BcnJheVtpXSkge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24xID0gcHJldjtcbiAgICAgICAgICAgICAgICAgICAgcHJldiA9IGNjLlNlcXVlbmNlLl9hY3Rpb25PbmVUd28oYWN0aW9uMSwgcGFyYW1BcnJheVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbml0V2l0aFR3b0FjdGlvbnMocHJldiwgcGFyYW1BcnJheVtsYXN0XSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgYWN0aW9uIDxici8+XG4gICAgICogQHBhcmFtIHtGaW5pdGVUaW1lQWN0aW9ufSBhY3Rpb25PbmVcbiAgICAgKiBAcGFyYW0ge0Zpbml0ZVRpbWVBY3Rpb259IGFjdGlvblR3b1xuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaW5pdFdpdGhUd29BY3Rpb25zOmZ1bmN0aW9uIChhY3Rpb25PbmUsIGFjdGlvblR3bykge1xuICAgICAgICBpZiAoIWFjdGlvbk9uZSB8fCAhYWN0aW9uVHdvKSB7XG4gICAgICAgICAgICBjYy5lcnJvcklEKDEwMjUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGR1cmF0aW9uT25lID0gYWN0aW9uT25lLl9kdXJhdGlvbiwgZHVyYXRpb25Ud28gPSBhY3Rpb25Ud28uX2R1cmF0aW9uO1xuICAgICAgICBkdXJhdGlvbk9uZSAqPSBhY3Rpb25PbmUuX3JlcGVhdE1ldGhvZCA/IGFjdGlvbk9uZS5fdGltZXNGb3JSZXBlYXQgOiAxO1xuICAgICAgICBkdXJhdGlvblR3byAqPSBhY3Rpb25Ud28uX3JlcGVhdE1ldGhvZCA/IGFjdGlvblR3by5fdGltZXNGb3JSZXBlYXQgOiAxO1xuICAgICAgICB2YXIgZCA9IGR1cmF0aW9uT25lICsgZHVyYXRpb25Ud287XG4gICAgICAgIHRoaXMuaW5pdFdpdGhEdXJhdGlvbihkKTtcblxuICAgICAgICB0aGlzLl9hY3Rpb25zWzBdID0gYWN0aW9uT25lO1xuICAgICAgICB0aGlzLl9hY3Rpb25zWzFdID0gYWN0aW9uVHdvO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLlNlcXVlbmNlKCk7XG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xuICAgICAgICBhY3Rpb24uaW5pdFdpdGhUd29BY3Rpb25zKHRoaXMuX2FjdGlvbnNbMF0uY2xvbmUoKSwgdGhpcy5fYWN0aW9uc1sxXS5jbG9uZSgpKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9LFxuXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLnN0YXJ0V2l0aFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICAgIHRoaXMuX3NwbGl0ID0gdGhpcy5fYWN0aW9uc1swXS5fZHVyYXRpb24gLyB0aGlzLl9kdXJhdGlvbjtcbiAgICAgICAgdGhpcy5fc3BsaXQgKj0gdGhpcy5fYWN0aW9uc1swXS5fcmVwZWF0TWV0aG9kID8gdGhpcy5fYWN0aW9uc1swXS5fdGltZXNGb3JSZXBlYXQgOiAxO1xuICAgICAgICB0aGlzLl9sYXN0ID0gLTE7XG4gICAgfSxcblxuICAgIHN0b3A6ZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBJc3N1ZSAjMTMwNVxuICAgICAgICBpZiAodGhpcy5fbGFzdCAhPT0gLTEpXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25zW3RoaXMuX2xhc3RdLnN0b3AoKTtcbiAgICAgICAgY2MuQWN0aW9uLnByb3RvdHlwZS5zdG9wLmNhbGwodGhpcyk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTpmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgdmFyIG5ld190LCBmb3VuZCA9IDA7XG4gICAgICAgIHZhciBsb2NTcGxpdCA9IHRoaXMuX3NwbGl0LCBsb2NBY3Rpb25zID0gdGhpcy5fYWN0aW9ucywgbG9jTGFzdCA9IHRoaXMuX2xhc3QsIGFjdGlvbkZvdW5kO1xuXG4gICAgICAgIGR0ID0gdGhpcy5fY29tcHV0ZUVhc2VUaW1lKGR0KTtcbiAgICAgICAgaWYgKGR0IDwgbG9jU3BsaXQpIHtcbiAgICAgICAgICAgIC8vIGFjdGlvblswXVxuICAgICAgICAgICAgbmV3X3QgPSAobG9jU3BsaXQgIT09IDApID8gZHQgLyBsb2NTcGxpdCA6IDE7XG5cbiAgICAgICAgICAgIGlmIChmb3VuZCA9PT0gMCAmJiBsb2NMYXN0ID09PSAxICYmIHRoaXMuX3JldmVyc2VkKSB7XG4gICAgICAgICAgICAgICAgLy8gUmV2ZXJzZSBtb2RlID9cbiAgICAgICAgICAgICAgICAvLyBYWFg6IEJ1Zy4gdGhpcyBjYXNlIGRvZXNuJ3QgY29udGVtcGxhdGUgd2hlbiBfbGFzdD09LTEsIGZvdW5kPTAgYW5kIGluIFwicmV2ZXJzZSBtb2RlXCJcbiAgICAgICAgICAgICAgICAvLyBzaW5jZSBpdCB3aWxsIHJlcXVpcmUgYSBoYWNrIHRvIGtub3cgaWYgYW4gYWN0aW9uIGlzIG9uIHJldmVyc2UgbW9kZSBvciBub3QuXG4gICAgICAgICAgICAgICAgLy8gXCJzdGVwXCIgc2hvdWxkIGJlIG92ZXJyaWRlbiwgYW5kIHRoZSBcInJldmVyc2VNb2RlXCIgdmFsdWUgcHJvcGFnYXRlZCB0byBpbm5lciBTZXF1ZW5jZXMuXG4gICAgICAgICAgICAgICAgbG9jQWN0aW9uc1sxXS51cGRhdGUoMCk7XG4gICAgICAgICAgICAgICAgbG9jQWN0aW9uc1sxXS5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBhY3Rpb25bMV1cbiAgICAgICAgICAgIGZvdW5kID0gMTtcbiAgICAgICAgICAgIG5ld190ID0gKGxvY1NwbGl0ID09PSAxKSA/IDEgOiAoZHQgLSBsb2NTcGxpdCkgLyAoMSAtIGxvY1NwbGl0KTtcblxuICAgICAgICAgICAgaWYgKGxvY0xhc3QgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gYWN0aW9uWzBdIHdhcyBza2lwcGVkLCBleGVjdXRlIGl0LlxuICAgICAgICAgICAgICAgIGxvY0FjdGlvbnNbMF0uc3RhcnRXaXRoVGFyZ2V0KHRoaXMudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBsb2NBY3Rpb25zWzBdLnVwZGF0ZSgxKTtcbiAgICAgICAgICAgICAgICBsb2NBY3Rpb25zWzBdLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsb2NMYXN0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gc3dpdGNoaW5nIHRvIGFjdGlvbiAxLiBzdG9wIGFjdGlvbiAwLlxuICAgICAgICAgICAgICAgIGxvY0FjdGlvbnNbMF0udXBkYXRlKDEpO1xuICAgICAgICAgICAgICAgIGxvY0FjdGlvbnNbMF0uc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYWN0aW9uRm91bmQgPSBsb2NBY3Rpb25zW2ZvdW5kXTtcbiAgICAgICAgLy8gTGFzdCBhY3Rpb24gZm91bmQgYW5kIGl0IGlzIGRvbmUuXG4gICAgICAgIGlmIChsb2NMYXN0ID09PSBmb3VuZCAmJiBhY3Rpb25Gb3VuZC5pc0RvbmUoKSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAvLyBMYXN0IGFjdGlvbiBub3QgZm91bmRcbiAgICAgICAgaWYgKGxvY0xhc3QgIT09IGZvdW5kKVxuICAgICAgICAgICAgYWN0aW9uRm91bmQuc3RhcnRXaXRoVGFyZ2V0KHRoaXMudGFyZ2V0KTtcblxuICAgICAgICBuZXdfdCA9IG5ld190ICogYWN0aW9uRm91bmQuX3RpbWVzRm9yUmVwZWF0O1xuICAgICAgICBhY3Rpb25Gb3VuZC51cGRhdGUobmV3X3QgPiAxID8gbmV3X3QgJSAxIDogbmV3X3QpO1xuICAgICAgICB0aGlzLl9sYXN0ID0gZm91bmQ7XG4gICAgfSxcblxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWN0aW9uID0gY2MuU2VxdWVuY2UuX2FjdGlvbk9uZVR3byh0aGlzLl9hY3Rpb25zWzFdLnJldmVyc2UoKSwgdGhpcy5fYWN0aW9uc1swXS5yZXZlcnNlKCkpO1xuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcbiAgICAgICAgdGhpcy5fcmV2ZXJzZUVhc2VMaXN0KGFjdGlvbik7XG4gICAgICAgIGFjdGlvbi5fcmV2ZXJzZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW5cbiAqIEhlbHBlciBjb25zdHJ1Y3RvciB0byBjcmVhdGUgYW4gYXJyYXkgb2Ygc2VxdWVuY2VhYmxlIGFjdGlvbnNcbiAqIFRoZSBjcmVhdGVkIGFjdGlvbiB3aWxsIHJ1biBhY3Rpb25zIHNlcXVlbnRpYWxseSwgb25lIGFmdGVyIGFub3RoZXIuXG4gKiAhI3poIOmhuuW6j+aJp+ihjOWKqOS9nO+8jOWIm+W7uueahOWKqOS9nOWwhuaMiemhuuW6j+S+neasoei/kOihjOOAglxuICogQG1ldGhvZCBzZXF1ZW5jZVxuICogQHBhcmFtIHtGaW5pdGVUaW1lQWN0aW9ufEZpbml0ZVRpbWVBY3Rpb25bXX0gYWN0aW9uT3JBY3Rpb25BcnJheVxuICogQHBhcmFtIHtGaW5pdGVUaW1lQWN0aW9ufSAuLi50ZW1wQXJyYXlcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxuICogQGV4YW1wbGVcbiAqIC8vIGV4YW1wbGVcbiAqIC8vIGNyZWF0ZSBzZXF1ZW5jZSB3aXRoIGFjdGlvbnNcbiAqIHZhciBzZXEgPSBjYy5zZXF1ZW5jZShhY3QxLCBhY3QyKTtcbiAqXG4gKiAvLyBjcmVhdGUgc2VxdWVuY2Ugd2l0aCBhcnJheVxuICogdmFyIHNlcSA9IGNjLnNlcXVlbmNlKGFjdEFycmF5KTtcbiAqL1xuLy8gdG9kbzogSXQgc2hvdWxkIGJlIHVzZSBuZXdcbmNjLnNlcXVlbmNlID0gZnVuY3Rpb24gKC8qTXVsdGlwbGUgQXJndW1lbnRzKi90ZW1wQXJyYXkpIHtcbiAgICB2YXIgcGFyYW1BcnJheSA9ICh0ZW1wQXJyYXkgaW5zdGFuY2VvZiBBcnJheSkgPyB0ZW1wQXJyYXkgOiBhcmd1bWVudHM7XG4gICAgaWYgKHBhcmFtQXJyYXkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGNjLmVycm9ySUQoMTAxOSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgbGFzdCA9IHBhcmFtQXJyYXkubGVuZ3RoIC0gMTtcbiAgICBpZiAoKGxhc3QgPj0gMCkgJiYgKHBhcmFtQXJyYXlbbGFzdF0gPT0gbnVsbCkpXG4gICAgICAgIGNjLmxvZ0lEKDEwMTUpO1xuXG4gICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgaWYgKGxhc3QgPj0gMCkge1xuICAgICAgICByZXN1bHQgPSBwYXJhbUFycmF5WzBdO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBsYXN0OyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwYXJhbUFycmF5W2ldKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gY2MuU2VxdWVuY2UuX2FjdGlvbk9uZVR3byhyZXN1bHQsIHBhcmFtQXJyYXlbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmNjLlNlcXVlbmNlLl9hY3Rpb25PbmVUd28gPSBmdW5jdGlvbiAoYWN0aW9uT25lLCBhY3Rpb25Ud28pIHtcbiAgICB2YXIgc2VxdWVuY2UgPSBuZXcgY2MuU2VxdWVuY2UoKTtcbiAgICBzZXF1ZW5jZS5pbml0V2l0aFR3b0FjdGlvbnMoYWN0aW9uT25lLCBhY3Rpb25Ud28pO1xuICAgIHJldHVybiBzZXF1ZW5jZTtcbn07XG5cbi8qXG4gKiBSZXBlYXRzIGFuIGFjdGlvbiBhIG51bWJlciBvZiB0aW1lcy5cbiAqIFRvIHJlcGVhdCBhbiBhY3Rpb24gZm9yZXZlciB1c2UgdGhlIENDUmVwZWF0Rm9yZXZlciBhY3Rpb24uXG4gKiBAY2xhc3MgUmVwZWF0XG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnRlcnZhbFxuICogQHBhcmFtIHtGaW5pdGVUaW1lQWN0aW9ufSBhY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lc1xuICogQGV4YW1wbGVcbiAqIHZhciByZXAgPSBuZXcgY2MuUmVwZWF0KGNjLnNlcXVlbmNlKGp1bXAyLCBqdW1wMSksIDUpO1xuICovXG5jYy5SZXBlYXQgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlJlcGVhdCcsXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uSW50ZXJ2YWwsXG5cbiAgICBjdG9yOiBmdW5jdGlvbiAoYWN0aW9uLCB0aW1lcykge1xuICAgICAgICB0aGlzLl90aW1lcyA9IDA7XG4gICAgICAgIHRoaXMuX3RvdGFsID0gMDtcbiAgICAgICAgdGhpcy5fbmV4dER0ID0gMDtcbiAgICAgICAgdGhpcy5fYWN0aW9uSW5zdGFudCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbm5lckFjdGlvbiA9IG51bGw7XG5cdFx0dGltZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmluaXRXaXRoQWN0aW9uKGFjdGlvbiwgdGltZXMpO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIEBwYXJhbSB7RmluaXRlVGltZUFjdGlvbn0gYWN0aW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVzXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpbml0V2l0aEFjdGlvbjpmdW5jdGlvbiAoYWN0aW9uLCB0aW1lcykge1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBhY3Rpb24uX2R1cmF0aW9uICogdGltZXM7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdFdpdGhEdXJhdGlvbihkdXJhdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVzID0gdGltZXM7XG4gICAgICAgICAgICB0aGlzLl9pbm5lckFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgIGlmIChhY3Rpb24gaW5zdGFuY2VvZiBjYy5BY3Rpb25JbnN0YW50KXtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3Rpb25JbnN0YW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lcyAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdG90YWwgPSAwO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuUmVwZWF0KCk7XG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xuICAgICAgICBhY3Rpb24uaW5pdFdpdGhBY3Rpb24odGhpcy5faW5uZXJBY3Rpb24uY2xvbmUoKSwgdGhpcy5fdGltZXMpO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH0sXG5cbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICB0aGlzLl90b3RhbCA9IDA7XG4gICAgICAgIHRoaXMuX25leHREdCA9IHRoaXMuX2lubmVyQWN0aW9uLl9kdXJhdGlvbiAvIHRoaXMuX2R1cmF0aW9uO1xuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5faW5uZXJBY3Rpb24uc3RhcnRXaXRoVGFyZ2V0KHRhcmdldCk7XG4gICAgfSxcblxuICAgIHN0b3A6ZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9pbm5lckFjdGlvbi5zdG9wKCk7XG4gICAgICAgIGNjLkFjdGlvbi5wcm90b3R5cGUuc3RvcC5jYWxsKHRoaXMpO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6ZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIGR0ID0gdGhpcy5fY29tcHV0ZUVhc2VUaW1lKGR0KTtcbiAgICAgICAgdmFyIGxvY0lubmVyQWN0aW9uID0gdGhpcy5faW5uZXJBY3Rpb247XG4gICAgICAgIHZhciBsb2NEdXJhdGlvbiA9IHRoaXMuX2R1cmF0aW9uO1xuICAgICAgICB2YXIgbG9jVGltZXMgPSB0aGlzLl90aW1lcztcbiAgICAgICAgdmFyIGxvY05leHREdCA9IHRoaXMuX25leHREdDtcblxuICAgICAgICBpZiAoZHQgPj0gbG9jTmV4dER0KSB7XG4gICAgICAgICAgICB3aGlsZSAoZHQgPiBsb2NOZXh0RHQgJiYgdGhpcy5fdG90YWwgPCBsb2NUaW1lcykge1xuICAgICAgICAgICAgICAgIGxvY0lubmVyQWN0aW9uLnVwZGF0ZSgxKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90b3RhbCsrO1xuICAgICAgICAgICAgICAgIGxvY0lubmVyQWN0aW9uLnN0b3AoKTtcbiAgICAgICAgICAgICAgICBsb2NJbm5lckFjdGlvbi5zdGFydFdpdGhUYXJnZXQodGhpcy50YXJnZXQpO1xuICAgICAgICAgICAgICAgIGxvY05leHREdCArPSBsb2NJbm5lckFjdGlvbi5fZHVyYXRpb24gLyBsb2NEdXJhdGlvbjtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXh0RHQgPSBsb2NOZXh0RHQgPiAxID8gMSA6IGxvY05leHREdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZml4IGZvciBpc3N1ZSAjMTI4OCwgaW5jb3JyZWN0IGVuZCB2YWx1ZSBvZiByZXBlYXRcbiAgICAgICAgICAgIGlmIChkdCA+PSAxLjAgJiYgdGhpcy5fdG90YWwgPCBsb2NUaW1lcykge1xuICAgICAgICAgICAgICAgIC8vIGZpeCBmb3IgY29jb3MtY3JlYXRvci9maXJlYmFsbC9pc3N1ZXMvNDMxMFxuICAgICAgICAgICAgICAgIGxvY0lubmVyQWN0aW9uLnVwZGF0ZSgxKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90b3RhbCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkb24ndCBzZXQgYSBpbnN0YW50IGFjdGlvbiBiYWNrIG9yIHVwZGF0ZSBpdCwgaXQgaGFzIG5vIHVzZSBiZWNhdXNlIGl0IGhhcyBubyBkdXJhdGlvblxuICAgICAgICAgICAgaWYgKCF0aGlzLl9hY3Rpb25JbnN0YW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RvdGFsID09PSBsb2NUaW1lcykge1xuICAgICAgICAgICAgICAgICAgICBsb2NJbm5lckFjdGlvbi5zdG9wKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXNzdWUgIzM5MCBwcmV2ZW50IGplcmssIHVzZSByaWdodCB1cGRhdGVcbiAgICAgICAgICAgICAgICAgICAgbG9jSW5uZXJBY3Rpb24udXBkYXRlKGR0IC0gKGxvY05leHREdCAtIGxvY0lubmVyQWN0aW9uLl9kdXJhdGlvbiAvIGxvY0R1cmF0aW9uKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9jSW5uZXJBY3Rpb24udXBkYXRlKChkdCAqIGxvY1RpbWVzKSAlIDEuMCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNEb25lOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsID09PSB0aGlzLl90aW1lcztcbiAgICB9LFxuXG4gICAgcmV2ZXJzZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuUmVwZWF0KHRoaXMuX2lubmVyQWN0aW9uLnJldmVyc2UoKSwgdGhpcy5fdGltZXMpO1xuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcbiAgICAgICAgdGhpcy5fcmV2ZXJzZUVhc2VMaXN0KGFjdGlvbik7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0IGlubmVyIEFjdGlvbi5cbiAgICAgKiBAcGFyYW0ge0Zpbml0ZVRpbWVBY3Rpb259IGFjdGlvblxuICAgICAqL1xuICAgIHNldElubmVyQWN0aW9uOmZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuX2lubmVyQWN0aW9uICE9PSBhY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2lubmVyQWN0aW9uID0gYWN0aW9uO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogR2V0IGlubmVyIEFjdGlvbi5cbiAgICAgKiBAcmV0dXJuIHtGaW5pdGVUaW1lQWN0aW9ufVxuICAgICAqL1xuICAgIGdldElubmVyQWN0aW9uOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lubmVyQWN0aW9uO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW4gQ3JlYXRlcyBhIFJlcGVhdCBhY3Rpb24uIFRpbWVzIGlzIGFuIHVuc2lnbmVkIGludGVnZXIgYmV0d2VlbiAxIGFuZCBwb3coMiwzMClcbiAqICEjemgg6YeN5aSN5Yqo5L2c77yM5Y+v5Lul5oyJ5LiA5a6a5qyh5pWw6YeN5aSN5LiA5Liq5Yqo77yM5aaC5p6c5oOz5rC46L+c6YeN5aSN5LiA5Liq5Yqo5L2c6K+35L2/55SoIHJlcGVhdEZvcmV2ZXIg5Yqo5L2c5p2l5a6M5oiQ44CCXG4gKiBAbWV0aG9kIHJlcGVhdFxuICogQHBhcmFtIHtGaW5pdGVUaW1lQWN0aW9ufSBhY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lc1xuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XG4gKiBAZXhhbXBsZVxuICogLy8gZXhhbXBsZVxuICogdmFyIHJlcCA9IGNjLnJlcGVhdChjYy5zZXF1ZW5jZShqdW1wMiwganVtcDEpLCA1KTtcbiAqL1xuY2MucmVwZWF0ID0gZnVuY3Rpb24gKGFjdGlvbiwgdGltZXMpIHtcbiAgICByZXR1cm4gbmV3IGNjLlJlcGVhdChhY3Rpb24sIHRpbWVzKTtcbn07XG5cblxuLypcbiAqIFJlcGVhdHMgYW4gYWN0aW9uIGZvciBldmVyLiAgPGJyLz5cbiAqIFRvIHJlcGVhdCB0aGUgYW4gYWN0aW9uIGZvciBhIGxpbWl0ZWQgbnVtYmVyIG9mIHRpbWVzIHVzZSB0aGUgUmVwZWF0IGFjdGlvbi4gPGJyLz5cbiAqIEB3YXJuaW5nIFRoaXMgYWN0aW9uIGNhbid0IGJlIFNlcXVlbmNlYWJsZSBiZWNhdXNlIGl0IGlzIG5vdCBhbiBJbnRlcnZhbEFjdGlvblxuICogQGNsYXNzIFJlcGVhdEZvcmV2ZXJcbiAqIEBleHRlbmRzIEFjdGlvbkludGVydmFsXG4gKiBAcGFyYW0ge0Zpbml0ZVRpbWVBY3Rpb259IGFjdGlvblxuICogQGV4YW1wbGVcbiAqIHZhciByZXAgPSBuZXcgY2MuUmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShqdW1wMiwganVtcDEpLCA1KTtcbiAqL1xuY2MuUmVwZWF0Rm9yZXZlciA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuUmVwZWF0Rm9yZXZlcicsXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uSW50ZXJ2YWwsXG5cbiAgICBjdG9yOmZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgdGhpcy5faW5uZXJBY3Rpb24gPSBudWxsO1xuXHRcdGFjdGlvbiAmJiB0aGlzLmluaXRXaXRoQWN0aW9uKGFjdGlvbik7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogQHBhcmFtIHtBY3Rpb25JbnRlcnZhbH0gYWN0aW9uXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpbml0V2l0aEFjdGlvbjpmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIGlmICghYWN0aW9uKSB7XG4gICAgICAgICAgICBjYy5lcnJvcklEKDEwMjYpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW5uZXJBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuUmVwZWF0Rm9yZXZlcigpO1xuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoQWN0aW9uKHRoaXMuX2lubmVyQWN0aW9uLmNsb25lKCkpO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH0sXG5cbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5faW5uZXJBY3Rpb24uc3RhcnRXaXRoVGFyZ2V0KHRhcmdldCk7XG4gICAgfSxcblxuICAgIHN0ZXA6ZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIHZhciBsb2NJbm5lckFjdGlvbiA9IHRoaXMuX2lubmVyQWN0aW9uO1xuICAgICAgICBsb2NJbm5lckFjdGlvbi5zdGVwKGR0KTtcbiAgICAgICAgaWYgKGxvY0lubmVyQWN0aW9uLmlzRG9uZSgpKSB7XG4gICAgICAgICAgICAvL3ZhciBkaWZmID0gbG9jSW5uZXJBY3Rpb24uZ2V0RWxhcHNlZCgpIC0gbG9jSW5uZXJBY3Rpb24uX2R1cmF0aW9uO1xuICAgICAgICAgICAgbG9jSW5uZXJBY3Rpb24uc3RhcnRXaXRoVGFyZ2V0KHRoaXMudGFyZ2V0KTtcbiAgICAgICAgICAgIC8vIHRvIHByZXZlbnQgamVyay4gaXNzdWUgIzM5MCAsMTI0N1xuICAgICAgICAgICAgLy90aGlzLl9pbm5lckFjdGlvbi5zdGVwKDApO1xuICAgICAgICAgICAgLy90aGlzLl9pbm5lckFjdGlvbi5zdGVwKGRpZmYpO1xuICAgICAgICAgICAgbG9jSW5uZXJBY3Rpb24uc3RlcChsb2NJbm5lckFjdGlvbi5nZXRFbGFwc2VkKCkgLSBsb2NJbm5lckFjdGlvbi5fZHVyYXRpb24pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGlzRG9uZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgcmV2ZXJzZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuUmVwZWF0Rm9yZXZlcih0aGlzLl9pbm5lckFjdGlvbi5yZXZlcnNlKCkpO1xuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcbiAgICAgICAgdGhpcy5fcmV2ZXJzZUVhc2VMaXN0KGFjdGlvbik7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0IGlubmVyIGFjdGlvbi5cbiAgICAgKiBAcGFyYW0ge0FjdGlvbkludGVydmFsfSBhY3Rpb25cbiAgICAgKi9cbiAgICBzZXRJbm5lckFjdGlvbjpmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbm5lckFjdGlvbiAhPT0gYWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9pbm5lckFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIEdldCBpbm5lciBhY3Rpb24uXG4gICAgICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XG4gICAgICovXG4gICAgZ2V0SW5uZXJBY3Rpb246ZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5uZXJBY3Rpb247XG4gICAgfVxufSk7XG5cbi8qKlxuICogISNlbiBDcmVhdGUgYSBhY3RvbiB3aGljaCByZXBlYXQgZm9yZXZlciwgYXMgaXQgcnVucyBmb3JldmVyLCBpdCBjYW4ndCBiZSBhZGRlZCBpbnRvIGNjLnNlcXVlbmNlIGFuZCBjYy5zcGF3bi5cbiAqICEjemgg5rC46L+c5Zyw6YeN5aSN5LiA5Liq5Yqo5L2c77yM5pyJ6ZmQ5qyh5pWw5YaF6YeN5aSN5LiA5Liq5Yqo5L2c6K+35L2/55SoIHJlcGVhdCDliqjkvZzvvIznlLHkuo7ov5nkuKrliqjkvZzkuI3kvJrlgZzmraLvvIzmiYDku6XkuI3og73ooqvmt7vliqDliLAgY2Muc2VxdWVuY2Ug5oiWIGNjLnNwYXduIOS4reOAglxuICogQG1ldGhvZCByZXBlYXRGb3JldmVyXG4gKiBAcGFyYW0ge0Zpbml0ZVRpbWVBY3Rpb259IGFjdGlvblxuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XG4gKiBAZXhhbXBsZVxuICogLy8gZXhhbXBsZVxuICogdmFyIHJlcGVhdCA9IGNjLnJlcGVhdEZvcmV2ZXIoY2Mucm90YXRlQnkoMS4wLCAzNjApKTtcbiAqL1xuY2MucmVwZWF0Rm9yZXZlciA9IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICByZXR1cm4gbmV3IGNjLlJlcGVhdEZvcmV2ZXIoYWN0aW9uKTtcbn07XG5cblxuLyogXG4gKiBTcGF3biBhIG5ldyBhY3Rpb24gaW1tZWRpYXRlbHlcbiAqIEBjbGFzcyBTcGF3blxuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcbiAqL1xuY2MuU3Bhd24gPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlNwYXduJyxcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnRlcnZhbCxcblxuICAgIGN0b3I6ZnVuY3Rpb24gKHRlbXBBcnJheSkge1xuICAgICAgICB0aGlzLl9vbmUgPSBudWxsO1xuICAgICAgICB0aGlzLl90d28gPSBudWxsO1xuXG5cdFx0dmFyIHBhcmFtQXJyYXkgPSAodGVtcEFycmF5IGluc3RhbmNlb2YgQXJyYXkpID8gdGVtcEFycmF5IDogYXJndW1lbnRzO1xuICAgICAgICBpZiAocGFyYW1BcnJheS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMTAyMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblx0XHR2YXIgbGFzdCA9IHBhcmFtQXJyYXkubGVuZ3RoIC0gMTtcblx0XHRpZiAoKGxhc3QgPj0gMCkgJiYgKHBhcmFtQXJyYXlbbGFzdF0gPT0gbnVsbCkpXG5cdFx0XHRjYy5sb2dJRCgxMDE1KTtcblxuICAgICAgICBpZiAobGFzdCA+PSAwKSB7XG4gICAgICAgICAgICB2YXIgcHJldiA9IHBhcmFtQXJyYXlbMF0sIGFjdGlvbjE7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGxhc3Q7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbUFycmF5W2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjEgPSBwcmV2O1xuICAgICAgICAgICAgICAgICAgICBwcmV2ID0gY2MuU3Bhd24uX2FjdGlvbk9uZVR3byhhY3Rpb24xLCBwYXJhbUFycmF5W2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmluaXRXaXRoVHdvQWN0aW9ucyhwcmV2LCBwYXJhbUFycmF5W2xhc3RdKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKiBpbml0aWFsaXplcyB0aGUgU3Bhd24gYWN0aW9uIHdpdGggdGhlIDIgYWN0aW9ucyB0byBzcGF3blxuICAgICAqIEBwYXJhbSB7RmluaXRlVGltZUFjdGlvbn0gYWN0aW9uMVxuICAgICAqIEBwYXJhbSB7RmluaXRlVGltZUFjdGlvbn0gYWN0aW9uMlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaW5pdFdpdGhUd29BY3Rpb25zOmZ1bmN0aW9uIChhY3Rpb24xLCBhY3Rpb24yKSB7XG4gICAgICAgIGlmICghYWN0aW9uMSB8fCAhYWN0aW9uMikge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgxMDI3KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXQgPSBmYWxzZTtcblxuICAgICAgICB2YXIgZDEgPSBhY3Rpb24xLl9kdXJhdGlvbjtcbiAgICAgICAgdmFyIGQyID0gYWN0aW9uMi5fZHVyYXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdFdpdGhEdXJhdGlvbihNYXRoLm1heChkMSwgZDIpKSkge1xuICAgICAgICAgICAgdGhpcy5fb25lID0gYWN0aW9uMTtcbiAgICAgICAgICAgIHRoaXMuX3R3byA9IGFjdGlvbjI7XG5cbiAgICAgICAgICAgIGlmIChkMSA+IGQyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHdvID0gY2MuU2VxdWVuY2UuX2FjdGlvbk9uZVR3byhhY3Rpb24yLCBjYy5kZWxheVRpbWUoZDEgLSBkMikpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkMSA8IGQyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25lID0gY2MuU2VxdWVuY2UuX2FjdGlvbk9uZVR3byhhY3Rpb24xLCBjYy5kZWxheVRpbWUoZDIgLSBkMSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5TcGF3bigpO1xuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoVHdvQWN0aW9ucyh0aGlzLl9vbmUuY2xvbmUoKSwgdGhpcy5fdHdvLmNsb25lKCkpO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH0sXG5cbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fb25lLnN0YXJ0V2l0aFRhcmdldCh0YXJnZXQpO1xuICAgICAgICB0aGlzLl90d28uc3RhcnRXaXRoVGFyZ2V0KHRhcmdldCk7XG4gICAgfSxcblxuICAgIHN0b3A6ZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9vbmUuc3RvcCgpO1xuICAgICAgICB0aGlzLl90d28uc3RvcCgpO1xuICAgICAgICBjYy5BY3Rpb24ucHJvdG90eXBlLnN0b3AuY2FsbCh0aGlzKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xuICAgICAgICBkdCA9IHRoaXMuX2NvbXB1dGVFYXNlVGltZShkdCk7XG4gICAgICAgIGlmICh0aGlzLl9vbmUpXG4gICAgICAgICAgICB0aGlzLl9vbmUudXBkYXRlKGR0KTtcbiAgICAgICAgaWYgKHRoaXMuX3R3bylcbiAgICAgICAgICAgIHRoaXMuX3R3by51cGRhdGUoZHQpO1xuICAgIH0sXG5cbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IGNjLlNwYXduLl9hY3Rpb25PbmVUd28odGhpcy5fb25lLnJldmVyc2UoKSwgdGhpcy5fdHdvLnJldmVyc2UoKSk7XG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xuICAgICAgICB0aGlzLl9yZXZlcnNlRWFzZUxpc3QoYWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9XG59KTtcblxuLyoqXG4gKiAhI2VuIENyZWF0ZSBhIHNwYXduIGFjdGlvbiB3aGljaCBydW5zIHNldmVyYWwgYWN0aW9ucyBpbiBwYXJhbGxlbC5cbiAqICEjemgg5ZCM5q2l5omn6KGM5Yqo5L2c77yM5ZCM5q2l5omn6KGM5LiA57uE5Yqo5L2c44CCXG4gKiBAbWV0aG9kIHNwYXduXG4gKiBAcGFyYW0ge0Zpbml0ZVRpbWVBY3Rpb258RmluaXRlVGltZUFjdGlvbltdfSBhY3Rpb25PckFjdGlvbkFycmF5XG4gKiBAcGFyYW0ge0Zpbml0ZVRpbWVBY3Rpb259IC4uLnRlbXBBcnJheVxuICogQHJldHVybiB7RmluaXRlVGltZUFjdGlvbn1cbiAqIEBleGFtcGxlXG4gKiAvLyBleGFtcGxlXG4gKiB2YXIgYWN0aW9uID0gY2Muc3Bhd24oY2MuanVtcEJ5KDIsIGNjLnYyKDMwMCwgMCksIDUwLCA0KSwgY2Mucm90YXRlQnkoMiwgNzIwKSk7XG4gKiB0b2RvOkl0IHNob3VsZCBiZSB0aGUgZGlyZWN0IHVzZSBuZXdcbiAqL1xuY2Muc3Bhd24gPSBmdW5jdGlvbiAoLypNdWx0aXBsZSBBcmd1bWVudHMqL3RlbXBBcnJheSkge1xuICAgIHZhciBwYXJhbUFycmF5ID0gKHRlbXBBcnJheSBpbnN0YW5jZW9mIEFycmF5KSA/IHRlbXBBcnJheSA6IGFyZ3VtZW50cztcbiAgICBpZiAocGFyYW1BcnJheS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgY2MuZXJyb3JJRCgxMDIwKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICgocGFyYW1BcnJheS5sZW5ndGggPiAwKSAmJiAocGFyYW1BcnJheVtwYXJhbUFycmF5Lmxlbmd0aCAtIDFdID09IG51bGwpKVxuICAgICAgICBjYy5sb2dJRCgxMDE1KTtcblxuICAgIHZhciBwcmV2ID0gcGFyYW1BcnJheVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IHBhcmFtQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHBhcmFtQXJyYXlbaV0gIT0gbnVsbClcbiAgICAgICAgICAgIHByZXYgPSBjYy5TcGF3bi5fYWN0aW9uT25lVHdvKHByZXYsIHBhcmFtQXJyYXlbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcHJldjtcbn07XG5cbmNjLlNwYXduLl9hY3Rpb25PbmVUd28gPSBmdW5jdGlvbiAoYWN0aW9uMSwgYWN0aW9uMikge1xuICAgIHZhciBwU3Bhd24gPSBuZXcgY2MuU3Bhd24oKTtcbiAgICBwU3Bhd24uaW5pdFdpdGhUd29BY3Rpb25zKGFjdGlvbjEsIGFjdGlvbjIpO1xuICAgIHJldHVybiBwU3Bhd247XG59O1xuXG5cbi8qXG4gKiBSb3RhdGVzIGEgTm9kZSBvYmplY3QgdG8gYSBjZXJ0YWluIGFuZ2xlIGJ5IG1vZGlmeWluZyBpdHMgYW5nbGUgcHJvcGVydHkuIDxici8+XG4gKiBUaGUgZGlyZWN0aW9uIHdpbGwgYmUgZGVjaWRlZCBieSB0aGUgc2hvcnRlc3QgYW5nbGUuXG4gKiBAY2xhc3MgUm90YXRlVG9cbiAqIEBleHRlbmRzIEFjdGlvbkludGVydmFsXG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gZHVyYXRpb24gaW4gc2Vjb25kc1xuICogQHBhcmFtIHtOdW1iZXJ9IGRzdEFuZ2xlIGRzdEFuZ2xlIGluIGRlZ3JlZXMuXG4gKiBAZXhhbXBsZVxuICogdmFyIHJvdGF0ZVRvID0gbmV3IGNjLlJvdGF0ZVRvKDIsIDYxLjApO1xuICovXG5jYy5Sb3RhdGVUbyA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuUm90YXRlVG8nLFxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICBfcmV2ZXJzZTogZmFsc2UsXG4gICAgfSxcblxuICAgIGN0b3I6ZnVuY3Rpb24gKGR1cmF0aW9uLCBkc3RBbmdsZSkge1xuICAgICAgICB0aGlzLl9zdGFydEFuZ2xlID0gMDtcbiAgICAgICAgdGhpcy5fZHN0QW5nbGUgPSAwO1xuICAgICAgICB0aGlzLl9hbmdsZSA9IDA7XG4gICAgICAgIGRzdEFuZ2xlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5pbml0V2l0aER1cmF0aW9uKGR1cmF0aW9uLCBkc3RBbmdsZSk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGFjdGlvbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHN0QW5nbGVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGluaXRXaXRoRHVyYXRpb246ZnVuY3Rpb24gKGR1cmF0aW9uLCBkc3RBbmdsZSkge1xuICAgICAgICBpZiAoY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCBkdXJhdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuX2RzdEFuZ2xlID0gZHN0QW5nbGU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5Sb3RhdGVUbygpO1xuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIHRoaXMuX2RzdEFuZ2xlKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9LFxuXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLnN0YXJ0V2l0aFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCk7XG5cbiAgICAgICAgbGV0IHN0YXJ0QW5nbGUgPSB0YXJnZXQuYW5nbGUgJSAzNjA7XG5cbiAgICAgICAgbGV0IGFuZ2xlID0gY2MuUm90YXRlVG8uX3JldmVyc2UgPyAodGhpcy5fZHN0QW5nbGUgLSBzdGFydEFuZ2xlKSA6ICh0aGlzLl9kc3RBbmdsZSArIHN0YXJ0QW5nbGUpO1xuICAgICAgICBpZiAoYW5nbGUgPiAxODApIGFuZ2xlIC09IDM2MDtcbiAgICAgICAgaWYgKGFuZ2xlIDwgLTE4MCkgYW5nbGUgKz0gMzYwO1xuXG4gICAgICAgIHRoaXMuX3N0YXJ0QW5nbGUgPSBzdGFydEFuZ2xlO1xuICAgICAgICB0aGlzLl9hbmdsZSA9IGNjLlJvdGF0ZVRvLl9yZXZlcnNlID8gYW5nbGUgOiAtYW5nbGU7XG4gICAgfSxcblxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5sb2dJRCgxMDE2KTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xuICAgICAgICBkdCA9IHRoaXMuX2NvbXB1dGVFYXNlVGltZShkdCk7XG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy50YXJnZXQuYW5nbGUgPSB0aGlzLl9zdGFydEFuZ2xlICsgdGhpcy5fYW5nbGUgKiBkdDtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW5cbiAqIFJvdGF0ZXMgYSBOb2RlIG9iamVjdCB0byBhIGNlcnRhaW4gYW5nbGUgYnkgbW9kaWZ5aW5nIGl0cyBhbmdsZSBwcm9wZXJ0eS4gPGJyLz5cbiAqIFRoZSBkaXJlY3Rpb24gd2lsbCBiZSBkZWNpZGVkIGJ5IHRoZSBzaG9ydGVzdCBhbmdsZS5cbiAqICEjemgg5peL6L2s5Yiw55uu5qCH6KeS5bqm77yM6YCa6L+H6YCQ5bin5L+u5pS55a6D55qEIGFuZ2xlIOWxnuaAp++8jOaXi+i9rOaWueWQkeWwhueUseacgOefreeahOinkuW6puWGs+WumuOAglxuICogQG1ldGhvZCByb3RhdGVUb1xuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHNcbiAqIEBwYXJhbSB7TnVtYmVyfSBkc3RBbmdsZSBkc3RBbmdsZSBpbiBkZWdyZWVzLlxuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XG4gKiBAZXhhbXBsZVxuICogLy8gZXhhbXBsZVxuICogdmFyIHJvdGF0ZVRvID0gY2Mucm90YXRlVG8oMiwgNjEuMCk7XG4gKi9cbmNjLnJvdGF0ZVRvID0gZnVuY3Rpb24gKGR1cmF0aW9uLCBkc3RBbmdsZSkge1xuICAgIHJldHVybiBuZXcgY2MuUm90YXRlVG8oZHVyYXRpb24sIGRzdEFuZ2xlKTtcbn07XG5cblxuLypcbiAqIFJvdGF0ZXMgYSBOb2RlIG9iamVjdCBjbG9ja3dpc2UgYSBudW1iZXIgb2YgZGVncmVlcyBieSBtb2RpZnlpbmcgaXRzIGFuZ2xlIHByb3BlcnR5LlxuICogUmVsYXRpdmUgdG8gaXRzIHByb3BlcnRpZXMgdG8gbW9kaWZ5LlxuICogQGNsYXNzIFJvdGF0ZUJ5XG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnRlcnZhbFxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHNcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YUFuZ2xlIGRlbHRhQW5nbGUgaW4gZGVncmVlc1xuICogQGV4YW1wbGVcbiAqIHZhciBhY3Rpb25CeSA9IG5ldyBjYy5Sb3RhdGVCeSgyLCAzNjApO1xuICovXG5jYy5Sb3RhdGVCeSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuUm90YXRlQnknLFxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICBfcmV2ZXJzZTogZmFsc2UsXG4gICAgfSxcblxuICAgIGN0b3I6IGZ1bmN0aW9uIChkdXJhdGlvbiwgZGVsdGFBbmdsZSkge1xuICAgICAgICBkZWx0YUFuZ2xlICo9IGNjLlJvdGF0ZUJ5Ll9yZXZlcnNlID8gMSA6IC0xO1xuXG4gICAgICAgIHRoaXMuX2RlbHRhQW5nbGUgPSAwO1xuICAgICAgICB0aGlzLl9zdGFydEFuZ2xlID0gMDtcbiAgICAgICAgZGVsdGFBbmdsZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuaW5pdFdpdGhEdXJhdGlvbihkdXJhdGlvbiwgZGVsdGFBbmdsZSk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGFjdGlvbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gZHVyYXRpb24gaW4gc2Vjb25kc1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YUFuZ2xlIGRlbHRhQW5nbGUgaW4gZGVncmVlc1xuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaW5pdFdpdGhEdXJhdGlvbjpmdW5jdGlvbiAoZHVyYXRpb24sIGRlbHRhQW5nbGUpIHtcbiAgICAgICAgaWYgKGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgZHVyYXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWx0YUFuZ2xlID0gZGVsdGFBbmdsZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLlJvdGF0ZUJ5KCk7XG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgdGhpcy5fZGVsdGFBbmdsZSk7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfSxcblxuICAgIHN0YXJ0V2l0aFRhcmdldDpmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgICB0aGlzLl9zdGFydEFuZ2xlID0gdGFyZ2V0LmFuZ2xlO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6ZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIGR0ID0gdGhpcy5fY29tcHV0ZUVhc2VUaW1lKGR0KTtcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5hbmdsZSA9IHRoaXMuX3N0YXJ0QW5nbGUgKyB0aGlzLl9kZWx0YUFuZ2xlICogZHQ7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmV2ZXJzZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuUm90YXRlQnkoKTtcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIC10aGlzLl9kZWx0YUFuZ2xlKTtcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XG4gICAgICAgIHRoaXMuX3JldmVyc2VFYXNlTGlzdChhY3Rpb24pO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW5cbiAqIFJvdGF0ZXMgYSBOb2RlIG9iamVjdCBjbG9ja3dpc2UgYSBudW1iZXIgb2YgZGVncmVlcyBieSBtb2RpZnlpbmcgaXRzIGFuZ2xlIHByb3BlcnR5LlxuICogUmVsYXRpdmUgdG8gaXRzIHByb3BlcnRpZXMgdG8gbW9kaWZ5LlxuICogISN6aCDml4vovazmjIflrprnmoTop5LluqbjgIJcbiAqIEBtZXRob2Qgcm90YXRlQnlcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiBkdXJhdGlvbiBpbiBzZWNvbmRzXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsdGFBbmdsZSBkZWx0YUFuZ2xlIGluIGRlZ3JlZXNcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxuICogQGV4YW1wbGVcbiAqIC8vIGV4YW1wbGVcbiAqIHZhciBhY3Rpb25CeSA9IGNjLnJvdGF0ZUJ5KDIsIDM2MCk7XG4gKi9cbmNjLnJvdGF0ZUJ5ID0gZnVuY3Rpb24gKGR1cmF0aW9uLCBkZWx0YUFuZ2xlKSB7XG4gICAgcmV0dXJuIG5ldyBjYy5Sb3RhdGVCeShkdXJhdGlvbiwgZGVsdGFBbmdsZSk7XG59O1xuXG5cbi8qXG4gKiA8cD5cbiAqIE1vdmVzIGEgTm9kZSBvYmplY3QgeCx5IHBpeGVscyBieSBtb2RpZnlpbmcgaXRzIHBvc2l0aW9uIHByb3BlcnR5LiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICogeCBhbmQgeSBhcmUgcmVsYXRpdmUgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBvYmplY3QuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICogU2V2ZXJhbCBNb3ZlQnkgYWN0aW9ucyBjYW4gYmUgY29uY3VycmVudGx5IGNhbGxlZCwgYW5kIHRoZSByZXN1bHRpbmcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAqIG1vdmVtZW50IHdpbGwgYmUgdGhlIHN1bSBvZiBpbmRpdmlkdWFsIG1vdmVtZW50cy5cbiAqIDwvcD5cbiAqIEBjbGFzcyBNb3ZlQnlcbiAqIEBleHRlbmRzIEFjdGlvbkludGVydmFsXG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gZHVyYXRpb24gaW4gc2Vjb25kc1xuICogQHBhcmFtIHtWZWMyfE51bWJlcn0gZGVsdGFQb3NcbiAqIEBwYXJhbSB7TnVtYmVyfSBbZGVsdGFZXVxuICogQGV4YW1wbGVcbiAqIHZhciBhY3Rpb25UbyA9IGNjLm1vdmVCeSgyLCBjYy52Mih3aW5kb3dTaXplLndpZHRoIC0gNDAsIHdpbmRvd1NpemUuaGVpZ2h0IC0gNDApKTtcbiAqL1xuY2MuTW92ZUJ5ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5Nb3ZlQnknLFxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxuXG4gICAgY3RvcjpmdW5jdGlvbiAoZHVyYXRpb24sIGRlbHRhUG9zLCBkZWx0YVkpIHtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25EZWx0YSA9IGNjLnYyKDAsIDApO1xuICAgICAgICB0aGlzLl9zdGFydFBvc2l0aW9uID0gY2MudjIoMCwgMCk7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzUG9zaXRpb24gPSBjYy52MigwLCAwKTtcblxuICAgICAgICBkZWx0YVBvcyAhPT0gdW5kZWZpbmVkICYmIGNjLk1vdmVCeS5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGR1cmF0aW9uLCBkZWx0YVBvcywgZGVsdGFZKTtcdFxuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBhY3Rpb24uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHNcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHBvc2l0aW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt5XVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaW5pdFdpdGhEdXJhdGlvbjpmdW5jdGlvbiAoZHVyYXRpb24sIHBvc2l0aW9uLCB5KSB7XG4gICAgICAgIGlmIChjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGR1cmF0aW9uKSkge1xuXHQgICAgICAgIGlmKHBvc2l0aW9uLnggIT09IHVuZGVmaW5lZCkge1xuXHRcdCAgICAgICAgeSA9IHBvc2l0aW9uLnk7XG5cdFx0ICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uLng7XG5cdCAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9wb3NpdGlvbkRlbHRhLnggPSBwb3NpdGlvbjtcbiAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uRGVsdGEueSA9IHk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5Nb3ZlQnkoKTtcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XG4gICAgICAgIGFjdGlvbi5pbml0V2l0aER1cmF0aW9uKHRoaXMuX2R1cmF0aW9uLCB0aGlzLl9wb3NpdGlvbkRlbHRhKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9LFxuXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLnN0YXJ0V2l0aFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICAgIHZhciBsb2NQb3NYID0gdGFyZ2V0Lng7XG4gICAgICAgIHZhciBsb2NQb3NZID0gdGFyZ2V0Lnk7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzUG9zaXRpb24ueCA9IGxvY1Bvc1g7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzUG9zaXRpb24ueSA9IGxvY1Bvc1k7XG4gICAgICAgIHRoaXMuX3N0YXJ0UG9zaXRpb24ueCA9IGxvY1Bvc1g7XG4gICAgICAgIHRoaXMuX3N0YXJ0UG9zaXRpb24ueSA9IGxvY1Bvc1k7XG4gICAgfSxcblxuICAgIHVwZGF0ZTpmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgZHQgPSB0aGlzLl9jb21wdXRlRWFzZVRpbWUoZHQpO1xuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIHZhciB4ID0gdGhpcy5fcG9zaXRpb25EZWx0YS54ICogZHQ7XG4gICAgICAgICAgICB2YXIgeSA9IHRoaXMuX3Bvc2l0aW9uRGVsdGEueSAqIGR0O1xuICAgICAgICAgICAgdmFyIGxvY1N0YXJ0UG9zaXRpb24gPSB0aGlzLl9zdGFydFBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKGNjLm1hY3JvLkVOQUJMRV9TVEFDS0FCTEVfQUNUSU9OUykge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRYID0gdGhpcy50YXJnZXQueDtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0WSA9IHRoaXMudGFyZ2V0Lnk7XG4gICAgICAgICAgICAgICAgdmFyIGxvY1ByZXZpb3VzUG9zaXRpb24gPSB0aGlzLl9wcmV2aW91c1Bvc2l0aW9uO1xuXG4gICAgICAgICAgICAgICAgbG9jU3RhcnRQb3NpdGlvbi54ID0gbG9jU3RhcnRQb3NpdGlvbi54ICsgdGFyZ2V0WCAtIGxvY1ByZXZpb3VzUG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICBsb2NTdGFydFBvc2l0aW9uLnkgPSBsb2NTdGFydFBvc2l0aW9uLnkgKyB0YXJnZXRZIC0gbG9jUHJldmlvdXNQb3NpdGlvbi55O1xuICAgICAgICAgICAgICAgIHggPSB4ICsgbG9jU3RhcnRQb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIHkgPSB5ICsgbG9jU3RhcnRQb3NpdGlvbi55O1xuXHQgICAgICAgICAgICBsb2NQcmV2aW91c1Bvc2l0aW9uLnggPSB4O1xuXHQgICAgICAgICAgICBsb2NQcmV2aW91c1Bvc2l0aW9uLnkgPSB5O1xuXHQgICAgICAgICAgICB0aGlzLnRhcmdldC5zZXRQb3NpdGlvbih4LCB5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQuc2V0UG9zaXRpb24obG9jU3RhcnRQb3NpdGlvbi54ICsgeCwgbG9jU3RhcnRQb3NpdGlvbi55ICsgeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmV2ZXJzZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuTW92ZUJ5KHRoaXMuX2R1cmF0aW9uLCBjYy52MigtdGhpcy5fcG9zaXRpb25EZWx0YS54LCAtdGhpcy5fcG9zaXRpb25EZWx0YS55KSk7XG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xuICAgICAgICB0aGlzLl9yZXZlcnNlRWFzZUxpc3QoYWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9XG59KTtcblxuLyoqXG4gKiAhI2VuXG4gKiBNb3ZlcyBhIE5vZGUgb2JqZWN0IHgseSBwaXhlbHMgYnkgbW9kaWZ5aW5nIGl0cyBwb3NpdGlvbiBwcm9wZXJ0eS4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAqIHggYW5kIHkgYXJlIHJlbGF0aXZlIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgb2JqZWN0LiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAqIFNldmVyYWwgTW92ZUJ5IGFjdGlvbnMgY2FuIGJlIGNvbmN1cnJlbnRseSBjYWxsZWQsIGFuZCB0aGUgcmVzdWx0aW5nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gKiBtb3ZlbWVudCB3aWxsIGJlIHRoZSBzdW0gb2YgaW5kaXZpZHVhbCBtb3ZlbWVudHMuXG4gKiAhI3poIOenu+WKqOaMh+WumueahOi3neemu+OAglxuICogQG1ldGhvZCBtb3ZlQnlcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiBkdXJhdGlvbiBpbiBzZWNvbmRzXG4gKiBAcGFyYW0ge1ZlYzJ8TnVtYmVyfSBkZWx0YVBvc1xuICogQHBhcmFtIHtOdW1iZXJ9IFtkZWx0YVldXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cbiAqIEBleGFtcGxlXG4gKiAvLyBleGFtcGxlXG4gKiB2YXIgYWN0aW9uVG8gPSBjYy5tb3ZlQnkoMiwgY2MudjIod2luZG93U2l6ZS53aWR0aCAtIDQwLCB3aW5kb3dTaXplLmhlaWdodCAtIDQwKSk7XG4gKi9cbmNjLm1vdmVCeSA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgZGVsdGFQb3MsIGRlbHRhWSkge1xuICAgIHJldHVybiBuZXcgY2MuTW92ZUJ5KGR1cmF0aW9uLCBkZWx0YVBvcywgZGVsdGFZKTtcbn07XG5cblxuLypcbiAqIE1vdmVzIGEgTm9kZSBvYmplY3QgdG8gdGhlIHBvc2l0aW9uIHgseS4geCBhbmQgeSBhcmUgYWJzb2x1dGUgY29vcmRpbmF0ZXMgYnkgbW9kaWZ5aW5nIGl0cyBwb3NpdGlvbiBwcm9wZXJ0eS4gPGJyLz5cbiAqIFNldmVyYWwgTW92ZVRvIGFjdGlvbnMgY2FuIGJlIGNvbmN1cnJlbnRseSBjYWxsZWQsIGFuZCB0aGUgcmVzdWx0aW5nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICogbW92ZW1lbnQgd2lsbCBiZSB0aGUgc3VtIG9mIGluZGl2aWR1YWwgbW92ZW1lbnRzLlxuICogQGNsYXNzIE1vdmVUb1xuICogQGV4dGVuZHMgTW92ZUJ5XG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gZHVyYXRpb24gaW4gc2Vjb25kc1xuICogQHBhcmFtIHtWZWMyfE51bWJlcn0gcG9zaXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBbeV1cbiAqIEBleGFtcGxlXG4gKiB2YXIgYWN0aW9uQnkgPSBuZXcgY2MuTW92ZVRvKDIsIGNjLnYyKDgwLCA4MCkpO1xuICovXG5jYy5Nb3ZlVG8gPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLk1vdmVUbycsXG4gICAgZXh0ZW5kczogY2MuTW92ZUJ5LFxuXG4gICAgY3RvcjpmdW5jdGlvbiAoZHVyYXRpb24sIHBvc2l0aW9uLCB5KSB7XG4gICAgICAgIHRoaXMuX2VuZFBvc2l0aW9uID0gY2MudjIoMCwgMCk7XG5cdFx0cG9zaXRpb24gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmluaXRXaXRoRHVyYXRpb24oZHVyYXRpb24sIHBvc2l0aW9uLCB5KTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgYWN0aW9uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiAgZHVyYXRpb24gaW4gc2Vjb25kc1xuICAgICAqIEBwYXJhbSB7VmVjMn0gcG9zaXRpb25cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3ldXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpbml0V2l0aER1cmF0aW9uOmZ1bmN0aW9uIChkdXJhdGlvbiwgcG9zaXRpb24sIHkpIHtcbiAgICAgICAgaWYgKGNjLk1vdmVCeS5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGR1cmF0aW9uLCBwb3NpdGlvbiwgeSkpIHtcblx0ICAgICAgICBpZihwb3NpdGlvbi54ICE9PSB1bmRlZmluZWQpIHtcblx0XHQgICAgICAgIHkgPSBwb3NpdGlvbi55O1xuXHRcdCAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbi54O1xuXHQgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fZW5kUG9zaXRpb24ueCA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgdGhpcy5fZW5kUG9zaXRpb24ueSA9IHk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5Nb3ZlVG8oKTtcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XG4gICAgICAgIGFjdGlvbi5pbml0V2l0aER1cmF0aW9uKHRoaXMuX2R1cmF0aW9uLCB0aGlzLl9lbmRQb3NpdGlvbik7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfSxcblxuICAgIHN0YXJ0V2l0aFRhcmdldDpmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGNjLk1vdmVCeS5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25EZWx0YS54ID0gdGhpcy5fZW5kUG9zaXRpb24ueCAtIHRhcmdldC54O1xuICAgICAgICB0aGlzLl9wb3NpdGlvbkRlbHRhLnkgPSB0aGlzLl9lbmRQb3NpdGlvbi55IC0gdGFyZ2V0Lnk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogISNlblxuICogTW92ZXMgYSBOb2RlIG9iamVjdCB0byB0aGUgcG9zaXRpb24geCx5LiB4IGFuZCB5IGFyZSBhYnNvbHV0ZSBjb29yZGluYXRlcyBieSBtb2RpZnlpbmcgaXRzIHBvc2l0aW9uIHByb3BlcnR5LiA8YnIvPlxuICogU2V2ZXJhbCBNb3ZlVG8gYWN0aW9ucyBjYW4gYmUgY29uY3VycmVudGx5IGNhbGxlZCwgYW5kIHRoZSByZXN1bHRpbmcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gKiBtb3ZlbWVudCB3aWxsIGJlIHRoZSBzdW0gb2YgaW5kaXZpZHVhbCBtb3ZlbWVudHMuXG4gKiAhI3poIOenu+WKqOWIsOebruagh+S9jee9ruOAglxuICogQG1ldGhvZCBtb3ZlVG9cbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiBkdXJhdGlvbiBpbiBzZWNvbmRzXG4gKiBAcGFyYW0ge1ZlYzJ8TnVtYmVyfSBwb3NpdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IFt5XVxuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XG4gKiBAZXhhbXBsZVxuICogLy8gZXhhbXBsZVxuICogdmFyIGFjdGlvbkJ5ID0gY2MubW92ZVRvKDIsIGNjLnYyKDgwLCA4MCkpO1xuICovXG5jYy5tb3ZlVG8gPSBmdW5jdGlvbiAoZHVyYXRpb24sIHBvc2l0aW9uLCB5KSB7XG4gICAgcmV0dXJuIG5ldyBjYy5Nb3ZlVG8oZHVyYXRpb24sIHBvc2l0aW9uLCB5KTtcbn07XG5cbi8qXG4gKiBTa2V3cyBhIE5vZGUgb2JqZWN0IHRvIGdpdmVuIGFuZ2xlcyBieSBtb2RpZnlpbmcgaXRzIHNrZXdYIGFuZCBza2V3WSBwcm9wZXJ0aWVzXG4gKiBAY2xhc3MgU2tld1RvXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnRlcnZhbFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgdGltZSBpbiBzZWNvbmRzXG4gKiBAcGFyYW0ge051bWJlcn0gc3hcbiAqIEBwYXJhbSB7TnVtYmVyfSBzeVxuICogQGV4YW1wbGVcbiAqIHZhciBhY3Rpb25UbyA9IG5ldyBjYy5Ta2V3VG8oMiwgMzcuMiwgLTM3LjIpO1xuICovXG5jYy5Ta2V3VG8gPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlNrZXdUbycsXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uSW50ZXJ2YWwsXG5cbiAgICBjdG9yOiBmdW5jdGlvbiAodCwgc3gsIHN5KSB7XG4gICAgICAgIHRoaXMuX3NrZXdYID0gMDtcbiAgICAgICAgdGhpcy5fc2tld1kgPSAwO1xuICAgICAgICB0aGlzLl9zdGFydFNrZXdYID0gMDtcbiAgICAgICAgdGhpcy5fc3RhcnRTa2V3WSA9IDA7XG4gICAgICAgIHRoaXMuX2VuZFNrZXdYID0gMDtcbiAgICAgICAgdGhpcy5fZW5kU2tld1kgPSAwO1xuICAgICAgICB0aGlzLl9kZWx0YVggPSAwO1xuICAgICAgICB0aGlzLl9kZWx0YVkgPSAwO1xuICAgICAgICBzeSAhPT0gdW5kZWZpbmVkICYmIGNjLlNrZXdUby5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIHQsIHN4LCBzeSk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGFjdGlvbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdCB0aW1lIGluIHNlY29uZHNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3hcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3lcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGluaXRXaXRoRHVyYXRpb246ZnVuY3Rpb24gKHQsIHN4LCBzeSkge1xuICAgICAgICB2YXIgcmV0ID0gZmFsc2U7XG4gICAgICAgIGlmIChjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIHQpKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmRTa2V3WCA9IHN4O1xuICAgICAgICAgICAgdGhpcy5fZW5kU2tld1kgPSBzeTtcbiAgICAgICAgICAgIHJldCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLlNrZXdUbygpO1xuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIHRoaXMuX2VuZFNrZXdYLCB0aGlzLl9lbmRTa2V3WSk7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfSxcblxuICAgIHN0YXJ0V2l0aFRhcmdldDpmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuXG4gICAgICAgIHRoaXMuX3N0YXJ0U2tld1ggPSB0YXJnZXQuc2tld1ggJSAxODA7XG4gICAgICAgIHRoaXMuX2RlbHRhWCA9IHRoaXMuX2VuZFNrZXdYIC0gdGhpcy5fc3RhcnRTa2V3WDtcbiAgICAgICAgaWYgKHRoaXMuX2RlbHRhWCA+IDE4MClcbiAgICAgICAgICAgIHRoaXMuX2RlbHRhWCAtPSAzNjA7XG4gICAgICAgIGlmICh0aGlzLl9kZWx0YVggPCAtMTgwKVxuICAgICAgICAgICAgdGhpcy5fZGVsdGFYICs9IDM2MDtcblxuICAgICAgICB0aGlzLl9zdGFydFNrZXdZID0gdGFyZ2V0LnNrZXdZICUgMzYwO1xuICAgICAgICB0aGlzLl9kZWx0YVkgPSB0aGlzLl9lbmRTa2V3WSAtIHRoaXMuX3N0YXJ0U2tld1k7XG4gICAgICAgIGlmICh0aGlzLl9kZWx0YVkgPiAxODApXG4gICAgICAgICAgICB0aGlzLl9kZWx0YVkgLT0gMzYwO1xuICAgICAgICBpZiAodGhpcy5fZGVsdGFZIDwgLTE4MClcbiAgICAgICAgICAgIHRoaXMuX2RlbHRhWSArPSAzNjA7XG4gICAgfSxcblxuICAgIHVwZGF0ZTpmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgZHQgPSB0aGlzLl9jb21wdXRlRWFzZVRpbWUoZHQpO1xuICAgICAgICB0aGlzLnRhcmdldC5za2V3WCA9IHRoaXMuX3N0YXJ0U2tld1ggKyB0aGlzLl9kZWx0YVggKiBkdDtcbiAgICAgICAgdGhpcy50YXJnZXQuc2tld1kgPSB0aGlzLl9zdGFydFNrZXdZICsgdGhpcy5fZGVsdGFZICogZHQ7XG4gICAgfVxufSk7XG5cbi8qKlxuICogISNlblxuICogQ3JlYXRlIGEgYWN0aW9uIHdoaWNoIHNrZXdzIGEgTm9kZSBvYmplY3QgdG8gZ2l2ZW4gYW5nbGVzIGJ5IG1vZGlmeWluZyBpdHMgc2tld1ggYW5kIHNrZXdZIHByb3BlcnRpZXMuXG4gKiBDaGFuZ2VzIHRvIHRoZSBzcGVjaWZpZWQgdmFsdWUuXG4gKiAhI3poIOWBj+aWnOWIsOebruagh+inkuW6puOAglxuICogQG1ldGhvZCBza2V3VG9cbiAqIEBwYXJhbSB7TnVtYmVyfSB0IHRpbWUgaW4gc2Vjb25kc1xuICogQHBhcmFtIHtOdW1iZXJ9IHN4XG4gKiBAcGFyYW0ge051bWJlcn0gc3lcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxuICogQGV4YW1wbGVcbiAqIC8vIGV4YW1wbGVcbiAqIHZhciBhY3Rpb25UbyA9IGNjLnNrZXdUbygyLCAzNy4yLCAtMzcuMik7XG4gKi9cbmNjLnNrZXdUbyA9IGZ1bmN0aW9uICh0LCBzeCwgc3kpIHtcbiAgICByZXR1cm4gbmV3IGNjLlNrZXdUbyh0LCBzeCwgc3kpO1xufTtcblxuLypcbiAqIFNrZXdzIGEgTm9kZSBvYmplY3QgYnkgc2tld1ggYW5kIHNrZXdZIGRlZ3JlZXMuXG4gKiBSZWxhdGl2ZSB0byBpdHMgcHJvcGVydHkgbW9kaWZpY2F0aW9uLlxuICogQGNsYXNzIFNrZXdCeVxuICogQGV4dGVuZHMgU2tld1RvXG4gKiBAcGFyYW0ge051bWJlcn0gdCB0aW1lIGluIHNlY29uZHNcbiAqIEBwYXJhbSB7TnVtYmVyfSBzeCAgc2tldyBpbiBkZWdyZWVzIGZvciBYIGF4aXNcbiAqIEBwYXJhbSB7TnVtYmVyfSBzeSAgc2tldyBpbiBkZWdyZWVzIGZvciBZIGF4aXNcbiAqL1xuY2MuU2tld0J5ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5Ta2V3QnknLFxuICAgIGV4dGVuZHM6IGNjLlNrZXdUbyxcblxuXHRjdG9yOiBmdW5jdGlvbih0LCBzeCwgc3kpIHtcblx0XHRzeSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuaW5pdFdpdGhEdXJhdGlvbih0LCBzeCwgc3kpO1xuXHR9LFxuXG4gICAgLypcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgYWN0aW9uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0IHRpbWUgaW4gc2Vjb25kc1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YVNrZXdYICBza2V3IGluIGRlZ3JlZXMgZm9yIFggYXhpc1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YVNrZXdZICBza2V3IGluIGRlZ3JlZXMgZm9yIFkgYXhpc1xuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaW5pdFdpdGhEdXJhdGlvbjpmdW5jdGlvbiAodCwgZGVsdGFTa2V3WCwgZGVsdGFTa2V3WSkge1xuICAgICAgICB2YXIgcmV0ID0gZmFsc2U7XG4gICAgICAgIGlmIChjYy5Ta2V3VG8ucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCB0LCBkZWx0YVNrZXdYLCBkZWx0YVNrZXdZKSkge1xuICAgICAgICAgICAgdGhpcy5fc2tld1ggPSBkZWx0YVNrZXdYO1xuICAgICAgICAgICAgdGhpcy5fc2tld1kgPSBkZWx0YVNrZXdZO1xuICAgICAgICAgICAgcmV0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuU2tld0J5KCk7XG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgdGhpcy5fc2tld1gsIHRoaXMuX3NrZXdZKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9LFxuXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgY2MuU2tld1RvLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgICB0aGlzLl9kZWx0YVggPSB0aGlzLl9za2V3WDtcbiAgICAgICAgdGhpcy5fZGVsdGFZID0gdGhpcy5fc2tld1k7XG4gICAgICAgIHRoaXMuX2VuZFNrZXdYID0gdGhpcy5fc3RhcnRTa2V3WCArIHRoaXMuX2RlbHRhWDtcbiAgICAgICAgdGhpcy5fZW5kU2tld1kgPSB0aGlzLl9zdGFydFNrZXdZICsgdGhpcy5fZGVsdGFZO1xuICAgIH0sXG5cbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5Ta2V3QnkodGhpcy5fZHVyYXRpb24sIC10aGlzLl9za2V3WCwgLXRoaXMuX3NrZXdZKTtcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XG4gICAgICAgIHRoaXMuX3JldmVyc2VFYXNlTGlzdChhY3Rpb24pO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW5cbiAqIFNrZXdzIGEgTm9kZSBvYmplY3QgYnkgc2tld1ggYW5kIHNrZXdZIGRlZ3JlZXMuIDxiciAvPlxuICogUmVsYXRpdmUgdG8gaXRzIHByb3BlcnR5IG1vZGlmaWNhdGlvbi5cbiAqICEjemgg5YGP5pac5oyH5a6a55qE6KeS5bqm44CCXG4gKiBAbWV0aG9kIHNrZXdCeVxuICogQHBhcmFtIHtOdW1iZXJ9IHQgdGltZSBpbiBzZWNvbmRzXG4gKiBAcGFyYW0ge051bWJlcn0gc3ggc3ggc2tldyBpbiBkZWdyZWVzIGZvciBYIGF4aXNcbiAqIEBwYXJhbSB7TnVtYmVyfSBzeSBzeSBza2V3IGluIGRlZ3JlZXMgZm9yIFkgYXhpc1xuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XG4gKiBAZXhhbXBsZVxuICogLy8gZXhhbXBsZVxuICogdmFyIGFjdGlvbkJ5ID0gY2Muc2tld0J5KDIsIDAsIC05MCk7XG4gKi9cbmNjLnNrZXdCeSA9IGZ1bmN0aW9uICh0LCBzeCwgc3kpIHtcbiAgICByZXR1cm4gbmV3IGNjLlNrZXdCeSh0LCBzeCwgc3kpO1xufTtcblxuXG4vKlxuICogTW92ZXMgYSBOb2RlIG9iamVjdCBzaW11bGF0aW5nIGEgcGFyYWJvbGljIGp1bXAgbW92ZW1lbnQgYnkgbW9kaWZ5aW5nIGl0cyBwb3NpdGlvbiBwcm9wZXJ0eS5cbiAqIFJlbGF0aXZlIHRvIGl0cyBtb3ZlbWVudC5cbiAqIEBjbGFzcyBKdW1wQnlcbiAqIEBleHRlbmRzIEFjdGlvbkludGVydmFsXG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cbiAqIEBwYXJhbSB7VmVjMnxOdW1iZXJ9IHBvc2l0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gW3ldXG4gKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XG4gKiBAcGFyYW0ge051bWJlcn0ganVtcHNcbiAqIEBleGFtcGxlXG4gKiB2YXIgYWN0aW9uQnkgPSBuZXcgY2MuSnVtcEJ5KDIsIGNjLnYyKDMwMCwgMCksIDUwLCA0KTtcbiAqIHZhciBhY3Rpb25CeSA9IG5ldyBjYy5KdW1wQnkoMiwgMzAwLCAwLCA1MCwgNCk7XG4gKi9cbmNjLkp1bXBCeSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuSnVtcEJ5JyxcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnRlcnZhbCxcblxuICAgIGN0b3I6ZnVuY3Rpb24gKGR1cmF0aW9uLCBwb3NpdGlvbiwgeSwgaGVpZ2h0LCBqdW1wcykge1xuICAgICAgICB0aGlzLl9zdGFydFBvc2l0aW9uID0gY2MudjIoMCwgMCk7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzUG9zaXRpb24gPSBjYy52MigwLCAwKTtcbiAgICAgICAgdGhpcy5fZGVsdGEgPSBjYy52MigwLCAwKTtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gMDtcbiAgICAgICAgdGhpcy5fanVtcHMgPSAwO1xuXG4gICAgICAgIGhlaWdodCAhPT0gdW5kZWZpbmVkICYmIGNjLkp1bXBCeS5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGR1cmF0aW9uLCBwb3NpdGlvbiwgeSwgaGVpZ2h0LCBqdW1wcyk7XG4gICAgfSxcbiAgICAvKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBhY3Rpb24uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uXG4gICAgICogQHBhcmFtIHtWZWMyfE51bWJlcn0gcG9zaXRpb25cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3ldXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBqdW1wc1xuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBhY3Rpb25CeS5pbml0V2l0aER1cmF0aW9uKDIsIGNjLnYyKDMwMCwgMCksIDUwLCA0KTtcbiAgICAgKiBhY3Rpb25CeS5pbml0V2l0aER1cmF0aW9uKDIsIDMwMCwgMCwgNTAsIDQpO1xuICAgICAqL1xuICAgIGluaXRXaXRoRHVyYXRpb246ZnVuY3Rpb24gKGR1cmF0aW9uLCBwb3NpdGlvbiwgeSwgaGVpZ2h0LCBqdW1wcykge1xuICAgICAgICBpZiAoY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCBkdXJhdGlvbikpIHtcblx0ICAgICAgICBpZiAoanVtcHMgPT09IHVuZGVmaW5lZCkge1xuXHRcdCAgICAgICAganVtcHMgPSBoZWlnaHQ7XG5cdFx0ICAgICAgICBoZWlnaHQgPSB5O1xuXHRcdCAgICAgICAgeSA9IHBvc2l0aW9uLnk7XG5cdFx0ICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uLng7XG5cdCAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZGVsdGEueCA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgdGhpcy5fZGVsdGEueSA9IHk7XG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLl9qdW1wcyA9IGp1bXBzO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuSnVtcEJ5KCk7XG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgdGhpcy5fZGVsdGEsIHRoaXMuX2hlaWdodCwgdGhpcy5fanVtcHMpO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH0sXG5cbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdmFyIGxvY1Bvc1ggPSB0YXJnZXQueDtcbiAgICAgICAgdmFyIGxvY1Bvc1kgPSB0YXJnZXQueTtcbiAgICAgICAgdGhpcy5fcHJldmlvdXNQb3NpdGlvbi54ID0gbG9jUG9zWDtcbiAgICAgICAgdGhpcy5fcHJldmlvdXNQb3NpdGlvbi55ID0gbG9jUG9zWTtcbiAgICAgICAgdGhpcy5fc3RhcnRQb3NpdGlvbi54ID0gbG9jUG9zWDtcbiAgICAgICAgdGhpcy5fc3RhcnRQb3NpdGlvbi55ID0gbG9jUG9zWTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xuICAgICAgICBkdCA9IHRoaXMuX2NvbXB1dGVFYXNlVGltZShkdCk7XG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgdmFyIGZyYWMgPSBkdCAqIHRoaXMuX2p1bXBzICUgMS4wO1xuICAgICAgICAgICAgdmFyIHkgPSB0aGlzLl9oZWlnaHQgKiA0ICogZnJhYyAqICgxIC0gZnJhYyk7XG4gICAgICAgICAgICB5ICs9IHRoaXMuX2RlbHRhLnkgKiBkdDtcblxuICAgICAgICAgICAgdmFyIHggPSB0aGlzLl9kZWx0YS54ICogZHQ7XG4gICAgICAgICAgICB2YXIgbG9jU3RhcnRQb3NpdGlvbiA9IHRoaXMuX3N0YXJ0UG9zaXRpb247XG4gICAgICAgICAgICBpZiAoY2MubWFjcm8uRU5BQkxFX1NUQUNLQUJMRV9BQ1RJT05TKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldFggPSB0aGlzLnRhcmdldC54O1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRZID0gdGhpcy50YXJnZXQueTtcbiAgICAgICAgICAgICAgICB2YXIgbG9jUHJldmlvdXNQb3NpdGlvbiA9IHRoaXMuX3ByZXZpb3VzUG9zaXRpb247XG5cbiAgICAgICAgICAgICAgICBsb2NTdGFydFBvc2l0aW9uLnggPSBsb2NTdGFydFBvc2l0aW9uLnggKyB0YXJnZXRYIC0gbG9jUHJldmlvdXNQb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIGxvY1N0YXJ0UG9zaXRpb24ueSA9IGxvY1N0YXJ0UG9zaXRpb24ueSArIHRhcmdldFkgLSBsb2NQcmV2aW91c1Bvc2l0aW9uLnk7XG4gICAgICAgICAgICAgICAgeCA9IHggKyBsb2NTdGFydFBvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgeSA9IHkgKyBsb2NTdGFydFBvc2l0aW9uLnk7XG5cdCAgICAgICAgICAgIGxvY1ByZXZpb3VzUG9zaXRpb24ueCA9IHg7XG5cdCAgICAgICAgICAgIGxvY1ByZXZpb3VzUG9zaXRpb24ueSA9IHk7XG5cdCAgICAgICAgICAgIHRoaXMudGFyZ2V0LnNldFBvc2l0aW9uKHgsIHkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5zZXRQb3NpdGlvbihsb2NTdGFydFBvc2l0aW9uLnggKyB4LCBsb2NTdGFydFBvc2l0aW9uLnkgKyB5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5KdW1wQnkodGhpcy5fZHVyYXRpb24sIGNjLnYyKC10aGlzLl9kZWx0YS54LCAtdGhpcy5fZGVsdGEueSksIHRoaXMuX2hlaWdodCwgdGhpcy5fanVtcHMpO1xuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcbiAgICAgICAgdGhpcy5fcmV2ZXJzZUVhc2VMaXN0KGFjdGlvbik7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfVxufSk7XG5cbi8qKlxuICogISNlblxuICogTW92ZXMgYSBOb2RlIG9iamVjdCBzaW11bGF0aW5nIGEgcGFyYWJvbGljIGp1bXAgbW92ZW1lbnQgYnkgbW9kaWZ5aW5nIGl0J3MgcG9zaXRpb24gcHJvcGVydHkuXG4gKiBSZWxhdGl2ZSB0byBpdHMgbW92ZW1lbnQuXG4gKiAhI3poIOeUqOi3s+i3g+eahOaWueW8j+enu+WKqOaMh+WumueahOi3neemu+OAglxuICogQG1ldGhvZCBqdW1wQnlcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxuICogQHBhcmFtIHtWZWMyfE51bWJlcn0gcG9zaXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBbeV1cbiAqIEBwYXJhbSB7TnVtYmVyfSBbaGVpZ2h0XVxuICogQHBhcmFtIHtOdW1iZXJ9IFtqdW1wc11cbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxuICogQGV4YW1wbGVcbiAqIC8vIGV4YW1wbGVcbiAqIHZhciBhY3Rpb25CeSA9IGNjLmp1bXBCeSgyLCBjYy52MigzMDAsIDApLCA1MCwgNCk7XG4gKiB2YXIgYWN0aW9uQnkgPSBjYy5qdW1wQnkoMiwgMzAwLCAwLCA1MCwgNCk7XG4gKi9cbmNjLmp1bXBCeSA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgcG9zaXRpb24sIHksIGhlaWdodCwganVtcHMpIHtcbiAgICByZXR1cm4gbmV3IGNjLkp1bXBCeShkdXJhdGlvbiwgcG9zaXRpb24sIHksIGhlaWdodCwganVtcHMpO1xufTtcblxuLypcbiAqIE1vdmVzIGEgTm9kZSBvYmplY3QgdG8gYSBwYXJhYm9saWMgcG9zaXRpb24gc2ltdWxhdGluZyBhIGp1bXAgbW92ZW1lbnQgYnkgbW9kaWZ5aW5nIGl0J3MgcG9zaXRpb24gcHJvcGVydHkuIDxiciAvPlxuICogSnVtcCB0byB0aGUgc3BlY2lmaWVkIGxvY2F0aW9uLlxuICogQGNsYXNzIEp1bXBUb1xuICogQGV4dGVuZHMgSnVtcEJ5XG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cbiAqIEBwYXJhbSB7VmVjMnxOdW1iZXJ9IHBvc2l0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gW3ldXG4gKiBAcGFyYW0ge051bWJlcn0gW2hlaWdodF1cbiAqIEBwYXJhbSB7TnVtYmVyfSBbanVtcHNdXG4gKiBAZXhhbXBsZVxuICogdmFyIGFjdGlvblRvID0gbmV3IGNjLkp1bXBUbygyLCBjYy52MigzMDAsIDApLCA1MCwgNCk7XG4gKiB2YXIgYWN0aW9uVG8gPSBuZXcgY2MuSnVtcFRvKDIsIDMwMCwgMCwgNTAsIDQpO1xuICovXG5jYy5KdW1wVG8gPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkp1bXBUbycsXG4gICAgZXh0ZW5kczogY2MuSnVtcEJ5LFxuXG4gICAgY3RvcjpmdW5jdGlvbiAoZHVyYXRpb24sIHBvc2l0aW9uLCB5LCBoZWlnaHQsIGp1bXBzKSB7XG4gICAgICAgIHRoaXMuX2VuZFBvc2l0aW9uID0gY2MudjIoMCwgMCk7XG4gICAgICAgIGhlaWdodCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuaW5pdFdpdGhEdXJhdGlvbihkdXJhdGlvbiwgcG9zaXRpb24sIHksIGhlaWdodCwganVtcHMpO1xuICAgIH0sXG4gICAgLypcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgYWN0aW9uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxuICAgICAqIEBwYXJhbSB7VmVjMnxOdW1iZXJ9IHBvc2l0aW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt5XVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0ganVtcHNcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBleGFtcGxlXG4gICAgICogYWN0aW9uVG8uaW5pdFdpdGhEdXJhdGlvbigyLCBjYy52MigzMDAsIDApLCA1MCwgNCk7XG4gICAgICogYWN0aW9uVG8uaW5pdFdpdGhEdXJhdGlvbigyLCAzMDAsIDAsIDUwLCA0KTtcbiAgICAgKi9cbiAgICBpbml0V2l0aER1cmF0aW9uOmZ1bmN0aW9uIChkdXJhdGlvbiwgcG9zaXRpb24sIHksIGhlaWdodCwganVtcHMpIHtcbiAgICAgICAgaWYgKGNjLkp1bXBCeS5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGR1cmF0aW9uLCBwb3NpdGlvbiwgeSwgaGVpZ2h0LCBqdW1wcykpIHtcbiAgICAgICAgICAgIGlmIChqdW1wcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgeSA9IHBvc2l0aW9uLnk7XG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbi54O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZW5kUG9zaXRpb24ueCA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgdGhpcy5fZW5kUG9zaXRpb24ueSA9IHk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHN0YXJ0V2l0aFRhcmdldDpmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGNjLkp1bXBCeS5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fZGVsdGEueCA9IHRoaXMuX2VuZFBvc2l0aW9uLnggLSB0aGlzLl9zdGFydFBvc2l0aW9uLng7XG4gICAgICAgIHRoaXMuX2RlbHRhLnkgPSB0aGlzLl9lbmRQb3NpdGlvbi55IC0gdGhpcy5fc3RhcnRQb3NpdGlvbi55O1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuSnVtcFRvKCk7XG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgdGhpcy5fZW5kUG9zaXRpb24sIHRoaXMuX2hlaWdodCwgdGhpcy5fanVtcHMpO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW5cbiAqIE1vdmVzIGEgTm9kZSBvYmplY3QgdG8gYSBwYXJhYm9saWMgcG9zaXRpb24gc2ltdWxhdGluZyBhIGp1bXAgbW92ZW1lbnQgYnkgbW9kaWZ5aW5nIGl0cyBwb3NpdGlvbiBwcm9wZXJ0eS4gPGJyIC8+XG4gKiBKdW1wIHRvIHRoZSBzcGVjaWZpZWQgbG9jYXRpb24uXG4gKiAhI3poIOeUqOi3s+i3g+eahOaWueW8j+enu+WKqOWIsOebruagh+S9jee9ruOAglxuICogQG1ldGhvZCBqdW1wVG9cbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxuICogQHBhcmFtIHtWZWMyfE51bWJlcn0gcG9zaXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBbeV1cbiAqIEBwYXJhbSB7TnVtYmVyfSBbaGVpZ2h0XVxuICogQHBhcmFtIHtOdW1iZXJ9IFtqdW1wc11cbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxuICogQGV4YW1wbGVcbiAqIC8vIGV4YW1wbGVcbiAqIHZhciBhY3Rpb25UbyA9IGNjLmp1bXBUbygyLCBjYy52MigzMDAsIDMwMCksIDUwLCA0KTtcbiAqIHZhciBhY3Rpb25UbyA9IGNjLmp1bXBUbygyLCAzMDAsIDMwMCwgNTAsIDQpO1xuICovXG5jYy5qdW1wVG8gPSBmdW5jdGlvbiAoZHVyYXRpb24sIHBvc2l0aW9uLCB5LCBoZWlnaHQsIGp1bXBzKSB7XG4gICAgcmV0dXJuIG5ldyBjYy5KdW1wVG8oZHVyYXRpb24sIHBvc2l0aW9uLCB5LCBoZWlnaHQsIGp1bXBzKTtcbn07XG5cbi8qIEFuIGFjdGlvbiB0aGF0IG1vdmVzIHRoZSB0YXJnZXQgd2l0aCBhIGN1YmljIEJlemllciBjdXJ2ZSBieSBhIGNlcnRhaW4gZGlzdGFuY2UuXG4gKiBSZWxhdGl2ZSB0byBpdHMgbW92ZW1lbnQuXG4gKiBAY2xhc3MgQmV6aWVyQnlcbiAqIEBleHRlbmRzIEFjdGlvbkludGVydmFsXG4gKiBAcGFyYW0ge051bWJlcn0gdCAtIHRpbWUgaW4gc2Vjb25kc1xuICogQHBhcmFtIHtWZWMyW119IGMgLSBBcnJheSBvZiBwb2ludHNcbiAqIEBleGFtcGxlXG4gKiB2YXIgYmV6aWVyID0gW2NjLnYyKDAsIHdpbmRvd1NpemUuaGVpZ2h0IC8gMiksIGNjLnYyKDMwMCwgLXdpbmRvd1NpemUuaGVpZ2h0IC8gMiksIGNjLnYyKDMwMCwgMTAwKV07XG4gKiB2YXIgYmV6aWVyRm9yd2FyZCA9IG5ldyBjYy5CZXppZXJCeSgzLCBiZXppZXIpO1xuICovXG5mdW5jdGlvbiBiZXppZXJBdCAoYSwgYiwgYywgZCwgdCkge1xuICAgIHJldHVybiAoTWF0aC5wb3coMSAtIHQsIDMpICogYSArXG4gICAgICAgIDMgKiB0ICogKE1hdGgucG93KDEgLSB0LCAyKSkgKiBiICtcbiAgICAgICAgMyAqIE1hdGgucG93KHQsIDIpICogKDEgLSB0KSAqIGMgK1xuICAgICAgICBNYXRoLnBvdyh0LCAzKSAqIGQgKTtcbn07XG5jYy5CZXppZXJCeSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuQmV6aWVyQnknLFxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxuXG4gICAgY3RvcjpmdW5jdGlvbiAodCwgYykge1xuICAgICAgICB0aGlzLl9jb25maWcgPSBbXTtcbiAgICAgICAgdGhpcy5fc3RhcnRQb3NpdGlvbiA9IGNjLnYyKDAsIDApO1xuICAgICAgICB0aGlzLl9wcmV2aW91c1Bvc2l0aW9uID0gY2MudjIoMCwgMCk7XG4gICAgICAgIGMgJiYgY2MuQmV6aWVyQnkucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCB0LCBjKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgYWN0aW9uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gdGltZSBpbiBzZWNvbmRzXG4gICAgICogQHBhcmFtIHtWZWMyW119IGMgLSBBcnJheSBvZiBwb2ludHNcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGluaXRXaXRoRHVyYXRpb246ZnVuY3Rpb24gKHQsIGMpIHtcbiAgICAgICAgaWYgKGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgdCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyA9IGM7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5CZXppZXJCeSgpO1xuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcbiAgICAgICAgdmFyIG5ld0NvbmZpZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9jb25maWcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzZWxDb25mID0gdGhpcy5fY29uZmlnW2ldO1xuICAgICAgICAgICAgbmV3Q29uZmlncy5wdXNoKGNjLnYyKHNlbENvbmYueCwgc2VsQ29uZi55KSk7XG4gICAgICAgIH1cbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIG5ld0NvbmZpZ3MpO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH0sXG5cbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdmFyIGxvY1Bvc1ggPSB0YXJnZXQueDtcbiAgICAgICAgdmFyIGxvY1Bvc1kgPSB0YXJnZXQueTtcbiAgICAgICAgdGhpcy5fcHJldmlvdXNQb3NpdGlvbi54ID0gbG9jUG9zWDtcbiAgICAgICAgdGhpcy5fcHJldmlvdXNQb3NpdGlvbi55ID0gbG9jUG9zWTtcbiAgICAgICAgdGhpcy5fc3RhcnRQb3NpdGlvbi54ID0gbG9jUG9zWDtcbiAgICAgICAgdGhpcy5fc3RhcnRQb3NpdGlvbi55ID0gbG9jUG9zWTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xuICAgICAgICBkdCA9IHRoaXMuX2NvbXB1dGVFYXNlVGltZShkdCk7XG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgdmFyIGxvY0NvbmZpZyA9IHRoaXMuX2NvbmZpZztcbiAgICAgICAgICAgIHZhciB4YSA9IDA7XG4gICAgICAgICAgICB2YXIgeGIgPSBsb2NDb25maWdbMF0ueDtcbiAgICAgICAgICAgIHZhciB4YyA9IGxvY0NvbmZpZ1sxXS54O1xuICAgICAgICAgICAgdmFyIHhkID0gbG9jQ29uZmlnWzJdLng7XG5cbiAgICAgICAgICAgIHZhciB5YSA9IDA7XG4gICAgICAgICAgICB2YXIgeWIgPSBsb2NDb25maWdbMF0ueTtcbiAgICAgICAgICAgIHZhciB5YyA9IGxvY0NvbmZpZ1sxXS55O1xuICAgICAgICAgICAgdmFyIHlkID0gbG9jQ29uZmlnWzJdLnk7XG5cbiAgICAgICAgICAgIHZhciB4ID0gYmV6aWVyQXQoeGEsIHhiLCB4YywgeGQsIGR0KTtcbiAgICAgICAgICAgIHZhciB5ID0gYmV6aWVyQXQoeWEsIHliLCB5YywgeWQsIGR0KTtcblxuICAgICAgICAgICAgdmFyIGxvY1N0YXJ0UG9zaXRpb24gPSB0aGlzLl9zdGFydFBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKGNjLm1hY3JvLkVOQUJMRV9TVEFDS0FCTEVfQUNUSU9OUykge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRYID0gdGhpcy50YXJnZXQueDtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0WSA9IHRoaXMudGFyZ2V0Lnk7XG4gICAgICAgICAgICAgICAgdmFyIGxvY1ByZXZpb3VzUG9zaXRpb24gPSB0aGlzLl9wcmV2aW91c1Bvc2l0aW9uO1xuXG4gICAgICAgICAgICAgICAgbG9jU3RhcnRQb3NpdGlvbi54ID0gbG9jU3RhcnRQb3NpdGlvbi54ICsgdGFyZ2V0WCAtIGxvY1ByZXZpb3VzUG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICBsb2NTdGFydFBvc2l0aW9uLnkgPSBsb2NTdGFydFBvc2l0aW9uLnkgKyB0YXJnZXRZIC0gbG9jUHJldmlvdXNQb3NpdGlvbi55O1xuICAgICAgICAgICAgICAgIHggPSB4ICsgbG9jU3RhcnRQb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIHkgPSB5ICsgbG9jU3RhcnRQb3NpdGlvbi55O1xuXHQgICAgICAgICAgICBsb2NQcmV2aW91c1Bvc2l0aW9uLnggPSB4O1xuXHQgICAgICAgICAgICBsb2NQcmV2aW91c1Bvc2l0aW9uLnkgPSB5O1xuXHQgICAgICAgICAgICB0aGlzLnRhcmdldC5zZXRQb3NpdGlvbih4LCB5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQuc2V0UG9zaXRpb24obG9jU3RhcnRQb3NpdGlvbi54ICsgeCwgbG9jU3RhcnRQb3NpdGlvbi55ICsgeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmV2ZXJzZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsb2NDb25maWcgPSB0aGlzLl9jb25maWc7XG4gICAgICAgIHZhciB4MCA9IGxvY0NvbmZpZ1swXS54LCB5MCA9IGxvY0NvbmZpZ1swXS55O1xuICAgICAgICB2YXIgeDEgPSBsb2NDb25maWdbMV0ueCwgeTEgPSBsb2NDb25maWdbMV0ueTtcbiAgICAgICAgdmFyIHgyID0gbG9jQ29uZmlnWzJdLngsIHkyID0gbG9jQ29uZmlnWzJdLnk7XG4gICAgICAgIHZhciByID0gW1xuICAgICAgICAgICAgY2MudjIoeDEgLSB4MiwgeTEgLSB5MiksXG4gICAgICAgICAgICBjYy52Mih4MCAtIHgyLCB5MCAtIHkyKSxcbiAgICAgICAgICAgIGNjLnYyKC14MiwgLXkyKSBdO1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLkJlemllckJ5KHRoaXMuX2R1cmF0aW9uLCByKTtcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XG4gICAgICAgIHRoaXMuX3JldmVyc2VFYXNlTGlzdChhY3Rpb24pO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW5cbiAqIEFuIGFjdGlvbiB0aGF0IG1vdmVzIHRoZSB0YXJnZXQgd2l0aCBhIGN1YmljIEJlemllciBjdXJ2ZSBieSBhIGNlcnRhaW4gZGlzdGFuY2UuXG4gKiBSZWxhdGl2ZSB0byBpdHMgbW92ZW1lbnQuXG4gKiAhI3poIOaMiei0nei1m+WwlOabsue6v+i9qOi/ueenu+WKqOaMh+WumueahOi3neemu+OAglxuICogQG1ldGhvZCBiZXppZXJCeVxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSB0aW1lIGluIHNlY29uZHNcbiAqIEBwYXJhbSB7VmVjMltdfSBjIC0gQXJyYXkgb2YgcG9pbnRzXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cbiAqIEBleGFtcGxlXG4gKiAvLyBleGFtcGxlXG4gKiB2YXIgYmV6aWVyID0gW2NjLnYyKDAsIHdpbmRvd1NpemUuaGVpZ2h0IC8gMiksIGNjLnYyKDMwMCwgLXdpbmRvd1NpemUuaGVpZ2h0IC8gMiksIGNjLnYyKDMwMCwgMTAwKV07XG4gKiB2YXIgYmV6aWVyRm9yd2FyZCA9IGNjLmJlemllckJ5KDMsIGJlemllcik7XG4gKi9cbmNjLmJlemllckJ5ID0gZnVuY3Rpb24gKHQsIGMpIHtcbiAgICByZXR1cm4gbmV3IGNjLkJlemllckJ5KHQsIGMpO1xufTtcblxuXG4vKiBBbiBhY3Rpb24gdGhhdCBtb3ZlcyB0aGUgdGFyZ2V0IHdpdGggYSBjdWJpYyBCZXppZXIgY3VydmUgdG8gYSBkZXN0aW5hdGlvbiBwb2ludC5cbiAqIEBjbGFzcyBCZXppZXJUb1xuICogQGV4dGVuZHMgQmV6aWVyQnlcbiAqIEBwYXJhbSB7TnVtYmVyfSB0XG4gKiBAcGFyYW0ge1ZlYzJbXX0gYyAtIEFycmF5IG9mIHBvaW50c1xuICogQGV4YW1wbGVcbiAqIHZhciBiZXppZXIgPSBbY2MudjIoMCwgd2luZG93U2l6ZS5oZWlnaHQgLyAyKSwgY2MudjIoMzAwLCAtd2luZG93U2l6ZS5oZWlnaHQgLyAyKSwgY2MudjIoMzAwLCAxMDApXTtcbiAqIHZhciBiZXppZXJUbyA9IG5ldyBjYy5CZXppZXJUbygyLCBiZXppZXIpO1xuICovXG5jYy5CZXppZXJUbyA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuQmV6aWVyVG8nLFxuICAgIGV4dGVuZHM6IGNjLkJlemllckJ5LFxuXG4gICAgY3RvcjpmdW5jdGlvbiAodCwgYykge1xuICAgICAgICB0aGlzLl90b0NvbmZpZyA9IFtdO1xuXHRcdGMgJiYgdGhpcy5pbml0V2l0aER1cmF0aW9uKHQsIGMpO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBhY3Rpb24uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHQgdGltZSBpbiBzZWNvbmRzXG4gICAgICogQHBhcmFtIHtWZWMyW119IGMgLSBBcnJheSBvZiBwb2ludHNcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGluaXRXaXRoRHVyYXRpb246ZnVuY3Rpb24gKHQsIGMpIHtcbiAgICAgICAgaWYgKGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgdCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3RvQ29uZmlnID0gYztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLkJlemllclRvKCk7XG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgdGhpcy5fdG9Db25maWcpO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH0sXG5cbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBjYy5CZXppZXJCeS5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdmFyIGxvY1N0YXJ0UG9zID0gdGhpcy5fc3RhcnRQb3NpdGlvbjtcbiAgICAgICAgdmFyIGxvY1RvQ29uZmlnID0gdGhpcy5fdG9Db25maWc7XG4gICAgICAgIHZhciBsb2NDb25maWcgPSB0aGlzLl9jb25maWc7XG5cbiAgICAgICAgbG9jQ29uZmlnWzBdID0gbG9jVG9Db25maWdbMF0uc3ViKGxvY1N0YXJ0UG9zKTtcbiAgICAgICAgbG9jQ29uZmlnWzFdID0gbG9jVG9Db25maWdbMV0uc3ViKGxvY1N0YXJ0UG9zKTtcbiAgICAgICAgbG9jQ29uZmlnWzJdID0gbG9jVG9Db25maWdbMl0uc3ViKGxvY1N0YXJ0UG9zKTtcbiAgICB9XG59KTtcbi8qKlxuICogISNlbiBBbiBhY3Rpb24gdGhhdCBtb3ZlcyB0aGUgdGFyZ2V0IHdpdGggYSBjdWJpYyBCZXppZXIgY3VydmUgdG8gYSBkZXN0aW5hdGlvbiBwb2ludC5cbiAqICEjemgg5oyJ6LSd6LWb5bCU5puy57q/6L2o6L+556e75Yqo5Yiw55uu5qCH5L2N572u44CCXG4gKiBAbWV0aG9kIGJlemllclRvXG4gKiBAcGFyYW0ge051bWJlcn0gdFxuICogQHBhcmFtIHtWZWMyW119IGMgLSBBcnJheSBvZiBwb2ludHNcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxuICogQGV4YW1wbGVcbiAqIC8vIGV4YW1wbGVcbiAqIHZhciBiZXppZXIgPSBbY2MudjIoMCwgd2luZG93U2l6ZS5oZWlnaHQgLyAyKSwgY2MudjIoMzAwLCAtd2luZG93U2l6ZS5oZWlnaHQgLyAyKSwgY2MudjIoMzAwLCAxMDApXTtcbiAqIHZhciBiZXppZXJUbyA9IGNjLmJlemllclRvKDIsIGJlemllcik7XG4gKi9cbmNjLmJlemllclRvID0gZnVuY3Rpb24gKHQsIGMpIHtcbiAgICByZXR1cm4gbmV3IGNjLkJlemllclRvKHQsIGMpO1xufTtcblxuXG4vKiBTY2FsZXMgYSBOb2RlIG9iamVjdCB0byBhIHpvb20gZmFjdG9yIGJ5IG1vZGlmeWluZyBpdCdzIHNjYWxlIHByb3BlcnR5LlxuICogQHdhcm5pbmcgVGhpcyBhY3Rpb24gZG9lc24ndCBzdXBwb3J0IFwicmV2ZXJzZVwiXG4gKiBAY2xhc3MgU2NhbGVUb1xuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IHN4ICBzY2FsZSBwYXJhbWV0ZXIgaW4gWFxuICogQHBhcmFtIHtOdW1iZXJ9IFtzeV0gc2NhbGUgcGFyYW1ldGVyIGluIFksIGlmIE51bGwgZXF1YWwgdG8gc3hcbiAqIEBleGFtcGxlXG4gKiAvLyBJdCBzY2FsZXMgdG8gMC41IGluIGJvdGggWCBhbmQgWS5cbiAqIHZhciBhY3Rpb25UbyA9IG5ldyBjYy5TY2FsZVRvKDIsIDAuNSk7XG4gKlxuICogLy8gSXQgc2NhbGVzIHRvIDAuNSBpbiB4IGFuZCAyIGluIFlcbiAqIHZhciBhY3Rpb25UbyA9IG5ldyBjYy5TY2FsZVRvKDIsIDAuNSwgMik7XG4gKi9cbmNjLlNjYWxlVG8gPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlNjYWxlVG8nLFxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxuXG4gICAgY3RvcjpmdW5jdGlvbiAoZHVyYXRpb24sIHN4LCBzeSkge1xuICAgICAgICB0aGlzLl9zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSAxO1xuICAgICAgICB0aGlzLl9zdGFydFNjYWxlWCA9IDE7XG4gICAgICAgIHRoaXMuX3N0YXJ0U2NhbGVZID0gMTtcbiAgICAgICAgdGhpcy5fZW5kU2NhbGVYID0gMDtcbiAgICAgICAgdGhpcy5fZW5kU2NhbGVZID0gMDtcbiAgICAgICAgdGhpcy5fZGVsdGFYID0gMDtcbiAgICAgICAgdGhpcy5fZGVsdGFZID0gMDtcbiAgICAgICAgc3ggIT09IHVuZGVmaW5lZCAmJiBjYy5TY2FsZVRvLnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgZHVyYXRpb24sIHN4LCBzeSk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGFjdGlvbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3hcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3N5PV1cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGluaXRXaXRoRHVyYXRpb246ZnVuY3Rpb24gKGR1cmF0aW9uLCBzeCwgc3kpIHsgLy9mdW5jdGlvbiBvdmVybG9hZCBoZXJlXG4gICAgICAgIGlmIChjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGR1cmF0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5fZW5kU2NhbGVYID0gc3g7XG4gICAgICAgICAgICB0aGlzLl9lbmRTY2FsZVkgPSAoc3kgIT0gbnVsbCkgPyBzeSA6IHN4O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuU2NhbGVUbygpO1xuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIHRoaXMuX2VuZFNjYWxlWCwgdGhpcy5fZW5kU2NhbGVZKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9LFxuXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLnN0YXJ0V2l0aFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICAgIHRoaXMuX3N0YXJ0U2NhbGVYID0gdGFyZ2V0LnNjYWxlWDtcbiAgICAgICAgdGhpcy5fc3RhcnRTY2FsZVkgPSB0YXJnZXQuc2NhbGVZO1xuICAgICAgICB0aGlzLl9kZWx0YVggPSB0aGlzLl9lbmRTY2FsZVggLSB0aGlzLl9zdGFydFNjYWxlWDtcbiAgICAgICAgdGhpcy5fZGVsdGFZID0gdGhpcy5fZW5kU2NhbGVZIC0gdGhpcy5fc3RhcnRTY2FsZVk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTpmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgZHQgPSB0aGlzLl9jb21wdXRlRWFzZVRpbWUoZHQpO1xuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnNjYWxlWCA9IHRoaXMuX3N0YXJ0U2NhbGVYICsgdGhpcy5fZGVsdGFYICogZHQ7XG5cdCAgICAgICAgdGhpcy50YXJnZXQuc2NhbGVZID0gdGhpcy5fc3RhcnRTY2FsZVkgKyB0aGlzLl9kZWx0YVkgKiBkdDtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuLyoqXG4gKiAhI2VuIFNjYWxlcyBhIE5vZGUgb2JqZWN0IHRvIGEgem9vbSBmYWN0b3IgYnkgbW9kaWZ5aW5nIGl0J3Mgc2NhbGUgcHJvcGVydHkuXG4gKiAhI3poIOWwhuiKgueCueWkp+Wwj+e8qeaUvuWIsOaMh+WumueahOWAjeaVsOOAglxuICogQG1ldGhvZCBzY2FsZVRvXG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBzeCAgc2NhbGUgcGFyYW1ldGVyIGluIFhcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc3ldIHNjYWxlIHBhcmFtZXRlciBpbiBZLCBpZiBOdWxsIGVxdWFsIHRvIHN4XG4gKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cbiAqIEBleGFtcGxlXG4gKiAvLyBleGFtcGxlXG4gKiAvLyBJdCBzY2FsZXMgdG8gMC41IGluIGJvdGggWCBhbmQgWS5cbiAqIHZhciBhY3Rpb25UbyA9IGNjLnNjYWxlVG8oMiwgMC41KTtcbiAqXG4gKiAvLyBJdCBzY2FsZXMgdG8gMC41IGluIHggYW5kIDIgaW4gWVxuICogdmFyIGFjdGlvblRvID0gY2Muc2NhbGVUbygyLCAwLjUsIDIpO1xuICovXG5jYy5zY2FsZVRvID0gZnVuY3Rpb24gKGR1cmF0aW9uLCBzeCwgc3kpIHsgLy9mdW5jdGlvbiBvdmVybG9hZFxuICAgIHJldHVybiBuZXcgY2MuU2NhbGVUbyhkdXJhdGlvbiwgc3gsIHN5KTtcbn07XG5cblxuLyogU2NhbGVzIGEgTm9kZSBvYmplY3QgYSB6b29tIGZhY3RvciBieSBtb2RpZnlpbmcgaXQncyBzY2FsZSBwcm9wZXJ0eS5cbiAqIFJlbGF0aXZlIHRvIGl0cyBjaGFuZ2VzLlxuICogQGNsYXNzIFNjYWxlQnlcbiAqIEBleHRlbmRzIFNjYWxlVG9cbiAqL1xuY2MuU2NhbGVCeSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuU2NhbGVCeScsXG4gICAgZXh0ZW5kczogY2MuU2NhbGVUbyxcblxuICAgIHN0YXJ0V2l0aFRhcmdldDpmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGNjLlNjYWxlVG8ucHJvdG90eXBlLnN0YXJ0V2l0aFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICAgIHRoaXMuX2RlbHRhWCA9IHRoaXMuX3N0YXJ0U2NhbGVYICogdGhpcy5fZW5kU2NhbGVYIC0gdGhpcy5fc3RhcnRTY2FsZVg7XG4gICAgICAgIHRoaXMuX2RlbHRhWSA9IHRoaXMuX3N0YXJ0U2NhbGVZICogdGhpcy5fZW5kU2NhbGVZIC0gdGhpcy5fc3RhcnRTY2FsZVk7XG4gICAgfSxcblxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLlNjYWxlQnkodGhpcy5fZHVyYXRpb24sIDEgLyB0aGlzLl9lbmRTY2FsZVgsIDEgLyB0aGlzLl9lbmRTY2FsZVkpO1xuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcbiAgICAgICAgdGhpcy5fcmV2ZXJzZUVhc2VMaXN0KGFjdGlvbik7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfSxcblxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5TY2FsZUJ5KCk7XG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgdGhpcy5fZW5kU2NhbGVYLCB0aGlzLl9lbmRTY2FsZVkpO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cbn0pO1xuLyoqXG4gKiAhI2VuXG4gKiBTY2FsZXMgYSBOb2RlIG9iamVjdCBhIHpvb20gZmFjdG9yIGJ5IG1vZGlmeWluZyBpdCdzIHNjYWxlIHByb3BlcnR5LlxuICogUmVsYXRpdmUgdG8gaXRzIGNoYW5nZXMuXG4gKiAhI3poIOaMieaMh+WumueahOWAjeaVsOe8qeaUvuiKgueCueWkp+Wwj+OAglxuICogQG1ldGhvZCBzY2FsZUJ5XG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gZHVyYXRpb24gaW4gc2Vjb25kc1xuICogQHBhcmFtIHtOdW1iZXJ9IHN4IHN4ICBzY2FsZSBwYXJhbWV0ZXIgaW4gWFxuICogQHBhcmFtIHtOdW1iZXJ8TnVsbH0gW3N5PV0gc3kgc2NhbGUgcGFyYW1ldGVyIGluIFksIGlmIE51bGwgZXF1YWwgdG8gc3hcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxuICogQGV4YW1wbGVcbiAqIC8vIGV4YW1wbGUgd2l0aG91dCBzeSwgaXQgc2NhbGVzIGJ5IDIgYm90aCBpbiBYIGFuZCBZXG4gKiB2YXIgYWN0aW9uQnkgPSBjYy5zY2FsZUJ5KDIsIDIpO1xuICpcbiAqIC8vZXhhbXBsZSB3aXRoIHN5LCBpdCBzY2FsZXMgYnkgMC4yNSBpbiBYIGFuZCA0LjUgaW4gWVxuICogdmFyIGFjdGlvbkJ5MiA9IGNjLnNjYWxlQnkoMiwgMC4yNSwgNC41KTtcbiAqL1xuY2Muc2NhbGVCeSA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgc3gsIHN5KSB7XG4gICAgcmV0dXJuIG5ldyBjYy5TY2FsZUJ5KGR1cmF0aW9uLCBzeCwgc3kpO1xufTtcblxuLyogQmxpbmtzIGEgTm9kZSBvYmplY3QgYnkgbW9kaWZ5aW5nIGl0J3MgdmlzaWJsZSBwcm9wZXJ0eVxuICogQGNsYXNzIEJsaW5rXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnRlcnZhbFxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uICBkdXJhdGlvbiBpbiBzZWNvbmRzXG4gKiBAcGFyYW0ge051bWJlcn0gYmxpbmtzICBibGlua3MgaW4gdGltZXNcbiAqIEBleGFtcGxlXG4gKiB2YXIgYWN0aW9uID0gbmV3IGNjLkJsaW5rKDIsIDEwKTtcbiAqL1xuY2MuQmxpbmsgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkJsaW5rJyxcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnRlcnZhbCxcblxuICAgIGN0b3I6ZnVuY3Rpb24gKGR1cmF0aW9uLCBibGlua3MpIHtcbiAgICAgICAgdGhpcy5fdGltZXMgPSAwO1xuICAgICAgICB0aGlzLl9vcmlnaW5hbFN0YXRlID0gZmFsc2U7XG5cdFx0YmxpbmtzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5pbml0V2l0aER1cmF0aW9uKGR1cmF0aW9uLCBibGlua3MpO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBhY3Rpb24uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYmxpbmtzIGJsaW5rcyBpbiB0aW1lc1xuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaW5pdFdpdGhEdXJhdGlvbjpmdW5jdGlvbiAoZHVyYXRpb24sIGJsaW5rcykge1xuICAgICAgICBpZiAoY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCBkdXJhdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVzID0gYmxpbmtzO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuQmxpbmsoKTtcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XG4gICAgICAgIGFjdGlvbi5pbml0V2l0aER1cmF0aW9uKHRoaXMuX2R1cmF0aW9uLCB0aGlzLl90aW1lcyk7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfSxcblxuICAgIHVwZGF0ZTpmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgZHQgPSB0aGlzLl9jb21wdXRlRWFzZVRpbWUoZHQpO1xuICAgICAgICBpZiAodGhpcy50YXJnZXQgJiYgIXRoaXMuaXNEb25lKCkpIHtcbiAgICAgICAgICAgIHZhciBzbGljZSA9IDEuMCAvIHRoaXMuX3RpbWVzO1xuICAgICAgICAgICAgdmFyIG0gPSBkdCAlIHNsaWNlO1xuICAgICAgICAgICAgdGhpcy50YXJnZXQub3BhY2l0eSA9IChtID4gKHNsaWNlIC8gMikpID8gMjU1IDogMDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fb3JpZ2luYWxTdGF0ZSA9IHRhcmdldC5vcGFjaXR5O1xuICAgIH0sXG5cbiAgICBzdG9wOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50YXJnZXQub3BhY2l0eSA9IHRoaXMuX29yaWdpbmFsU3RhdGU7XG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdG9wLmNhbGwodGhpcyk7XG4gICAgfSxcblxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLkJsaW5rKHRoaXMuX2R1cmF0aW9uLCB0aGlzLl90aW1lcyk7XG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xuICAgICAgICB0aGlzLl9yZXZlcnNlRWFzZUxpc3QoYWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9XG59KTtcbi8qKlxuICogISNlbiBCbGlua3MgYSBOb2RlIG9iamVjdCBieSBtb2RpZnlpbmcgaXQncyB2aXNpYmxlIHByb3BlcnR5LlxuICogISN6aCDpl6rng4HvvIjln7rkuo7pgI/mmI7luqbvvInjgIJcbiAqIEBtZXRob2QgYmxpbmtcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiAgZHVyYXRpb24gaW4gc2Vjb25kc1xuICogQHBhcmFtIHtOdW1iZXJ9IGJsaW5rcyBibGlua3MgaW4gdGltZXNcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxuICogQGV4YW1wbGVcbiAqIC8vIGV4YW1wbGVcbiAqIHZhciBhY3Rpb24gPSBjYy5ibGluaygyLCAxMCk7XG4gKi9cbmNjLmJsaW5rID0gZnVuY3Rpb24gKGR1cmF0aW9uLCBibGlua3MpIHtcbiAgICByZXR1cm4gbmV3IGNjLkJsaW5rKGR1cmF0aW9uLCBibGlua3MpO1xufTtcblxuLyogRmFkZXMgYW4gb2JqZWN0IHRoYXQgaW1wbGVtZW50cyB0aGUgY2MuUkdCQVByb3RvY29sIHByb3RvY29sLiBJdCBtb2RpZmllcyB0aGUgb3BhY2l0eSBmcm9tIHRoZSBjdXJyZW50IHZhbHVlIHRvIGEgY3VzdG9tIG9uZS5cbiAqIEB3YXJuaW5nIFRoaXMgYWN0aW9uIGRvZXNuJ3Qgc3VwcG9ydCBcInJldmVyc2VcIlxuICogQGNsYXNzIEZhZGVUb1xuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IG9wYWNpdHkgMC0yNTUsIDAgaXMgdHJhbnNwYXJlbnRcbiAqIEBleGFtcGxlXG4gKiB2YXIgYWN0aW9uID0gbmV3IGNjLkZhZGVUbygxLjAsIDApO1xuICovXG5jYy5GYWRlVG8gPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkZhZGVUbycsXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uSW50ZXJ2YWwsXG5cbiAgICBjdG9yOmZ1bmN0aW9uIChkdXJhdGlvbiwgb3BhY2l0eSkge1xuICAgICAgICB0aGlzLl90b09wYWNpdHkgPSAwO1xuICAgICAgICB0aGlzLl9mcm9tT3BhY2l0eSA9IDA7XG4gICAgICAgIG9wYWNpdHkgIT09IHVuZGVmaW5lZCAmJiBjYy5GYWRlVG8ucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCBkdXJhdGlvbiwgb3BhY2l0eSk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGFjdGlvbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gIGR1cmF0aW9uIGluIHNlY29uZHNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3BhY2l0eVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaW5pdFdpdGhEdXJhdGlvbjpmdW5jdGlvbiAoZHVyYXRpb24sIG9wYWNpdHkpIHtcbiAgICAgICAgaWYgKGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgZHVyYXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLl90b09wYWNpdHkgPSBvcGFjaXR5O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuRmFkZVRvKCk7XG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgdGhpcy5fdG9PcGFjaXR5KTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9LFxuXG4gICAgdXBkYXRlOmZ1bmN0aW9uICh0aW1lKSB7XG4gICAgICAgIHRpbWUgPSB0aGlzLl9jb21wdXRlRWFzZVRpbWUodGltZSk7XG4gICAgICAgIHZhciBmcm9tT3BhY2l0eSA9IHRoaXMuX2Zyb21PcGFjaXR5ICE9PSB1bmRlZmluZWQgPyB0aGlzLl9mcm9tT3BhY2l0eSA6IDI1NTtcbiAgICAgICAgdGhpcy50YXJnZXQub3BhY2l0eSA9IGZyb21PcGFjaXR5ICsgKHRoaXMuX3RvT3BhY2l0eSAtIGZyb21PcGFjaXR5KSAqIHRpbWU7XG4gICAgfSxcblxuICAgIHN0YXJ0V2l0aFRhcmdldDpmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgICB0aGlzLl9mcm9tT3BhY2l0eSA9IHRhcmdldC5vcGFjaXR5O1xuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW5cbiAqIEZhZGVzIGFuIG9iamVjdCB0aGF0IGltcGxlbWVudHMgdGhlIGNjLlJHQkFQcm90b2NvbCBwcm90b2NvbC5cbiAqIEl0IG1vZGlmaWVzIHRoZSBvcGFjaXR5IGZyb20gdGhlIGN1cnJlbnQgdmFsdWUgdG8gYSBjdXN0b20gb25lLlxuICogISN6aCDkv67mlLnpgI/mmI7luqbliLDmjIflrprlgLzjgIJcbiAqIEBtZXRob2QgZmFkZVRvXG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBvcGFjaXR5IDAtMjU1LCAwIGlzIHRyYW5zcGFyZW50XG4gKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cbiAqIEBleGFtcGxlXG4gKiAvLyBleGFtcGxlXG4gKiB2YXIgYWN0aW9uID0gY2MuZmFkZVRvKDEuMCwgMCk7XG4gKi9cbmNjLmZhZGVUbyA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgb3BhY2l0eSkge1xuICAgIHJldHVybiBuZXcgY2MuRmFkZVRvKGR1cmF0aW9uLCBvcGFjaXR5KTtcbn07XG5cbi8qIEZhZGVzIEluIGFuIG9iamVjdCB0aGF0IGltcGxlbWVudHMgdGhlIGNjLlJHQkFQcm90b2NvbCBwcm90b2NvbC4gSXQgbW9kaWZpZXMgdGhlIG9wYWNpdHkgZnJvbSAwIHRvIDI1NS48YnIvPlxuICogVGhlIFwicmV2ZXJzZVwiIG9mIHRoaXMgYWN0aW9uIGlzIEZhZGVPdXRcbiAqIEBjbGFzcyBGYWRlSW5cbiAqIEBleHRlbmRzIEZhZGVUb1xuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHNcbiAqL1xuY2MuRmFkZUluID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5GYWRlSW4nLFxuICAgIGV4dGVuZHM6IGNjLkZhZGVUbyxcblxuICAgIGN0b3I6ZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgICAgIGlmIChkdXJhdGlvbiA9PSBudWxsKVxuICAgICAgICAgICAgZHVyYXRpb24gPSAwO1xuICAgICAgICB0aGlzLl9yZXZlcnNlQWN0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbml0V2l0aER1cmF0aW9uKGR1cmF0aW9uLCAyNTUpO1xuICAgIH0sXG5cbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5GYWRlT3V0KCk7XG4gICAgICAgIGFjdGlvbi5pbml0V2l0aER1cmF0aW9uKHRoaXMuX2R1cmF0aW9uLCAwKTtcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XG4gICAgICAgIHRoaXMuX3JldmVyc2VFYXNlTGlzdChhY3Rpb24pO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuRmFkZUluKCk7XG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgdGhpcy5fdG9PcGFjaXR5KTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9LFxuXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgaWYodGhpcy5fcmV2ZXJzZUFjdGlvbilcbiAgICAgICAgICAgIHRoaXMuX3RvT3BhY2l0eSA9IHRoaXMuX3JldmVyc2VBY3Rpb24uX2Zyb21PcGFjaXR5O1xuICAgICAgICBjYy5GYWRlVG8ucHJvdG90eXBlLnN0YXJ0V2l0aFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogISNlbiBGYWRlcyBJbiBhbiBvYmplY3QgdGhhdCBpbXBsZW1lbnRzIHRoZSBjYy5SR0JBUHJvdG9jb2wgcHJvdG9jb2wuIEl0IG1vZGlmaWVzIHRoZSBvcGFjaXR5IGZyb20gMCB0byAyNTUuXG4gKiAhI3poIOa4kOaYvuaViOaenOOAglxuICogQG1ldGhvZCBmYWRlSW5cbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiBkdXJhdGlvbiBpbiBzZWNvbmRzXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cbiAqIEBleGFtcGxlXG4gKiAvL2V4YW1wbGVcbiAqIHZhciBhY3Rpb24gPSBjYy5mYWRlSW4oMS4wKTtcbiAqL1xuY2MuZmFkZUluID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgcmV0dXJuIG5ldyBjYy5GYWRlSW4oZHVyYXRpb24pO1xufTtcblxuXG4vKiBGYWRlcyBPdXQgYW4gb2JqZWN0IHRoYXQgaW1wbGVtZW50cyB0aGUgY2MuUkdCQVByb3RvY29sIHByb3RvY29sLiBJdCBtb2RpZmllcyB0aGUgb3BhY2l0eSBmcm9tIDI1NSB0byAwLlxuICogVGhlIFwicmV2ZXJzZVwiIG9mIHRoaXMgYWN0aW9uIGlzIEZhZGVJblxuICogQGNsYXNzIEZhZGVPdXRcbiAqIEBleHRlbmRzIEZhZGVUb1xuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHNcbiAqL1xuY2MuRmFkZU91dCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuRmFkZU91dCcsXG4gICAgZXh0ZW5kczogY2MuRmFkZVRvLFxuXG4gICAgY3RvcjpmdW5jdGlvbiAoZHVyYXRpb24pIHtcbiAgICAgICAgaWYgKGR1cmF0aW9uID09IG51bGwpXG4gICAgICAgICAgICBkdXJhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuX3JldmVyc2VBY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLmluaXRXaXRoRHVyYXRpb24oZHVyYXRpb24sIDApO1xuICAgIH0sXG5cbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5GYWRlSW4oKTtcbiAgICAgICAgYWN0aW9uLl9yZXZlcnNlQWN0aW9uID0gdGhpcztcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIDI1NSk7XG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xuICAgICAgICB0aGlzLl9yZXZlcnNlRWFzZUxpc3QoYWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9LFxuXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLkZhZGVPdXQoKTtcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XG4gICAgICAgIGFjdGlvbi5pbml0V2l0aER1cmF0aW9uKHRoaXMuX2R1cmF0aW9uLCB0aGlzLl90b09wYWNpdHkpO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW4gRmFkZXMgT3V0IGFuIG9iamVjdCB0aGF0IGltcGxlbWVudHMgdGhlIGNjLlJHQkFQcm90b2NvbCBwcm90b2NvbC4gSXQgbW9kaWZpZXMgdGhlIG9wYWNpdHkgZnJvbSAyNTUgdG8gMC5cbiAqICEjemgg5riQ6ZqQ5pWI5p6c44CCXG4gKiBAbWV0aG9kIGZhZGVPdXRcbiAqIEBwYXJhbSB7TnVtYmVyfSBkICBkdXJhdGlvbiBpbiBzZWNvbmRzXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cbiAqIEBleGFtcGxlXG4gKiAvLyBleGFtcGxlXG4gKiB2YXIgYWN0aW9uID0gY2MuZmFkZU91dCgxLjApO1xuICovXG5jYy5mYWRlT3V0ID0gZnVuY3Rpb24gKGQpIHtcbiAgICByZXR1cm4gbmV3IGNjLkZhZGVPdXQoZCk7XG59O1xuXG4vKiBUaW50cyBhIE5vZGUgdGhhdCBpbXBsZW1lbnRzIHRoZSBjYy5Ob2RlUkdCIHByb3RvY29sIGZyb20gY3VycmVudCB0aW50IHRvIGEgY3VzdG9tIG9uZS5cbiAqIEB3YXJuaW5nIFRoaXMgYWN0aW9uIGRvZXNuJ3Qgc3VwcG9ydCBcInJldmVyc2VcIlxuICogQGNsYXNzIFRpbnRUb1xuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IHJlZCAwLTI1NVxuICogQHBhcmFtIHtOdW1iZXJ9IGdyZWVuICAwLTI1NVxuICogQHBhcmFtIHtOdW1iZXJ9IGJsdWUgMC0yNTVcbiAqIEBleGFtcGxlXG4gKiB2YXIgYWN0aW9uID0gbmV3IGNjLlRpbnRUbygyLCAyNTUsIDAsIDI1NSk7XG4gKi9cbmNjLlRpbnRUbyA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuVGludFRvJyxcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnRlcnZhbCxcblxuICAgIGN0b3I6ZnVuY3Rpb24gKGR1cmF0aW9uLCByZWQsIGdyZWVuLCBibHVlKSB7XG4gICAgICAgIHRoaXMuX3RvID0gY2MuY29sb3IoMCwgMCwgMCk7XG4gICAgICAgIHRoaXMuX2Zyb20gPSBjYy5jb2xvcigwLCAwLCAwKTtcblxuICAgICAgICBpZiAocmVkIGluc3RhbmNlb2YgY2MuQ29sb3IpIHtcbiAgICAgICAgICAgIGJsdWUgPSByZWQuYjtcbiAgICAgICAgICAgIGdyZWVuID0gcmVkLmc7XG4gICAgICAgICAgICByZWQgPSByZWQucjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJsdWUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmluaXRXaXRoRHVyYXRpb24oZHVyYXRpb24sIHJlZCwgZ3JlZW4sIGJsdWUpO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBhY3Rpb24uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJlZCAwLTI1NVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBncmVlbiAwLTI1NVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBibHVlIDAtMjU1XG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpbml0V2l0aER1cmF0aW9uOmZ1bmN0aW9uIChkdXJhdGlvbiwgcmVkLCBncmVlbiwgYmx1ZSkge1xuICAgICAgICBpZiAoY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCBkdXJhdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuX3RvID0gY2MuY29sb3IocmVkLCBncmVlbiwgYmx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5UaW50VG8oKTtcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XG4gICAgICAgIHZhciBsb2NUbyA9IHRoaXMuX3RvO1xuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgbG9jVG8uciwgbG9jVG8uZywgbG9jVG8uYik7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfSxcblxuICAgIHN0YXJ0V2l0aFRhcmdldDpmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuXG4gICAgICAgIHRoaXMuX2Zyb20gPSB0aGlzLnRhcmdldC5jb2xvcjtcbiAgICB9LFxuXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xuICAgICAgICBkdCA9IHRoaXMuX2NvbXB1dGVFYXNlVGltZShkdCk7XG4gICAgICAgIHZhciBsb2NGcm9tID0gdGhpcy5fZnJvbSwgbG9jVG8gPSB0aGlzLl90bztcbiAgICAgICAgaWYgKGxvY0Zyb20pIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmNvbG9yID0gY2MuY29sb3IoXG4gICAgICAgICAgICAgICAgICAgIGxvY0Zyb20uciArIChsb2NUby5yIC0gbG9jRnJvbS5yKSAqIGR0LFxuICAgICAgICAgICAgICAgICAgICBsb2NGcm9tLmcgKyAobG9jVG8uZyAtIGxvY0Zyb20uZykgKiBkdCxcbiAgICAgICAgICAgICAgICAgICAgbG9jRnJvbS5iICsgKGxvY1RvLmIgLSBsb2NGcm9tLmIpICogZHQpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8qKlxuICogISNlbiBUaW50cyBhIE5vZGUgdGhhdCBpbXBsZW1lbnRzIHRoZSBjYy5Ob2RlUkdCIHByb3RvY29sIGZyb20gY3VycmVudCB0aW50IHRvIGEgY3VzdG9tIG9uZS5cbiAqICEjemgg5L+u5pS56aKc6Imy5Yiw5oyH5a6a5YC844CCXG4gKiBAbWV0aG9kIHRpbnRUb1xuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gcmVkIDAtMjU1XG4gKiBAcGFyYW0ge051bWJlcn0gZ3JlZW4gIDAtMjU1XG4gKiBAcGFyYW0ge051bWJlcn0gYmx1ZSAwLTI1NVxuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XG4gKiBAZXhhbXBsZVxuICogLy8gZXhhbXBsZVxuICogdmFyIGFjdGlvbiA9IGNjLnRpbnRUbygyLCAyNTUsIDAsIDI1NSk7XG4gKi9cbmNjLnRpbnRUbyA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgcmVkLCBncmVlbiwgYmx1ZSkge1xuICAgIHJldHVybiBuZXcgY2MuVGludFRvKGR1cmF0aW9uLCByZWQsIGdyZWVuLCBibHVlKTtcbn07XG5cblxuLyogVGludHMgYSBOb2RlIHRoYXQgaW1wbGVtZW50cyB0aGUgY2MuTm9kZVJHQiBwcm90b2NvbCBmcm9tIGN1cnJlbnQgdGludCB0byBhIGN1c3RvbSBvbmUuXG4gKiBSZWxhdGl2ZSB0byB0aGVpciBvd24gY29sb3IgY2hhbmdlLlxuICogQGNsYXNzIFRpbnRCeVxuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiAgZHVyYXRpb24gaW4gc2Vjb25kc1xuICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhUmVkXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsdGFHcmVlblxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhQmx1ZVxuICogQGV4YW1wbGVcbiAqIHZhciBhY3Rpb24gPSBuZXcgY2MuVGludEJ5KDIsIC0xMjcsIC0yNTUsIC0xMjcpO1xuICovXG5jYy5UaW50QnkgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlRpbnRCeScsXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uSW50ZXJ2YWwsXG5cbiAgICBjdG9yOmZ1bmN0aW9uIChkdXJhdGlvbiwgZGVsdGFSZWQsIGRlbHRhR3JlZW4sIGRlbHRhQmx1ZSkge1xuICAgICAgICB0aGlzLl9kZWx0YVIgPSAwO1xuICAgICAgICB0aGlzLl9kZWx0YUcgPSAwO1xuICAgICAgICB0aGlzLl9kZWx0YUIgPSAwO1xuICAgICAgICB0aGlzLl9mcm9tUiA9IDA7XG4gICAgICAgIHRoaXMuX2Zyb21HID0gMDtcbiAgICAgICAgdGhpcy5fZnJvbUIgPSAwO1xuXHRcdGRlbHRhQmx1ZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuaW5pdFdpdGhEdXJhdGlvbihkdXJhdGlvbiwgZGVsdGFSZWQsIGRlbHRhR3JlZW4sIGRlbHRhQmx1ZSk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGFjdGlvbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGVsdGFSZWQgMC0yNTVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGVsdGFHcmVlbiAwLTI1NVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YUJsdWUgMC0yNTVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGluaXRXaXRoRHVyYXRpb246ZnVuY3Rpb24gKGR1cmF0aW9uLCBkZWx0YVJlZCwgZGVsdGFHcmVlbiwgZGVsdGFCbHVlKSB7XG4gICAgICAgIGlmIChjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGR1cmF0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5fZGVsdGFSID0gZGVsdGFSZWQ7XG4gICAgICAgICAgICB0aGlzLl9kZWx0YUcgPSBkZWx0YUdyZWVuO1xuICAgICAgICAgICAgdGhpcy5fZGVsdGFCID0gZGVsdGFCbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuVGludEJ5KCk7XG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgdGhpcy5fZGVsdGFSLCB0aGlzLl9kZWx0YUcsIHRoaXMuX2RlbHRhQik7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfSxcblxuICAgIHN0YXJ0V2l0aFRhcmdldDpmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuXG4gICAgICAgIHZhciBjb2xvciA9IHRhcmdldC5jb2xvcjtcbiAgICAgICAgdGhpcy5fZnJvbVIgPSBjb2xvci5yO1xuICAgICAgICB0aGlzLl9mcm9tRyA9IGNvbG9yLmc7XG4gICAgICAgIHRoaXMuX2Zyb21CID0gY29sb3IuYjtcbiAgICB9LFxuXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xuICAgICAgICBkdCA9IHRoaXMuX2NvbXB1dGVFYXNlVGltZShkdCk7XG5cbiAgICAgICAgdGhpcy50YXJnZXQuY29sb3IgPSBjYy5jb2xvcih0aGlzLl9mcm9tUiArIHRoaXMuX2RlbHRhUiAqIGR0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZnJvbUcgKyB0aGlzLl9kZWx0YUcgKiBkdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Zyb21CICsgdGhpcy5fZGVsdGFCICogZHQpO1xuICAgIH0sXG5cbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5UaW50QnkodGhpcy5fZHVyYXRpb24sIC10aGlzLl9kZWx0YVIsIC10aGlzLl9kZWx0YUcsIC10aGlzLl9kZWx0YUIpO1xuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcbiAgICAgICAgdGhpcy5fcmV2ZXJzZUVhc2VMaXN0KGFjdGlvbik7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfVxufSk7XG5cbi8qKlxuICogISNlblxuICogVGludHMgYSBOb2RlIHRoYXQgaW1wbGVtZW50cyB0aGUgY2MuTm9kZVJHQiBwcm90b2NvbCBmcm9tIGN1cnJlbnQgdGludCB0byBhIGN1c3RvbSBvbmUuXG4gKiBSZWxhdGl2ZSB0byB0aGVpciBvd24gY29sb3IgY2hhbmdlLlxuICogISN6aCDmjInnhafmjIflrprnmoTlop7ph4/kv67mlLnpopzoibLjgIJcbiAqIEBtZXRob2QgdGludEJ5XG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gIGR1cmF0aW9uIGluIHNlY29uZHNcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YVJlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhR3JlZW5cbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YUJsdWVcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxuICogQGV4YW1wbGVcbiAqIC8vIGV4YW1wbGVcbiAqIHZhciBhY3Rpb24gPSBjYy50aW50QnkoMiwgLTEyNywgLTI1NSwgLTEyNyk7XG4gKi9cbmNjLnRpbnRCeSA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgZGVsdGFSZWQsIGRlbHRhR3JlZW4sIGRlbHRhQmx1ZSkge1xuICAgIHJldHVybiBuZXcgY2MuVGludEJ5KGR1cmF0aW9uLCBkZWx0YVJlZCwgZGVsdGFHcmVlbiwgZGVsdGFCbHVlKTtcbn07XG5cbi8qIERlbGF5cyB0aGUgYWN0aW9uIGEgY2VydGFpbiBhbW91bnQgb2Ygc2Vjb25kc1xuICogQGNsYXNzIERlbGF5VGltZVxuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcbiAqL1xuY2MuRGVsYXlUaW1lID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5EZWxheVRpbWUnLFxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxuXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge30sXG5cbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5EZWxheVRpbWUodGhpcy5fZHVyYXRpb24pO1xuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcbiAgICAgICAgdGhpcy5fcmV2ZXJzZUVhc2VMaXN0KGFjdGlvbik7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfSxcblxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5EZWxheVRpbWUoKTtcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XG4gICAgICAgIGFjdGlvbi5pbml0V2l0aER1cmF0aW9uKHRoaXMuX2R1cmF0aW9uKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9XG59KTtcblxuLyoqXG4gKiAhI2VuIERlbGF5cyB0aGUgYWN0aW9uIGEgY2VydGFpbiBhbW91bnQgb2Ygc2Vjb25kcy5cbiAqICEjemgg5bu26L+f5oyH5a6a55qE5pe26Ze06YeP44CCXG4gKiBAbWV0aG9kIGRlbGF5VGltZVxuICogQHBhcmFtIHtOdW1iZXJ9IGQgZHVyYXRpb24gaW4gc2Vjb25kc1xuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XG4gKiBAZXhhbXBsZVxuICogLy8gZXhhbXBsZVxuICogdmFyIGRlbGF5ID0gY2MuZGVsYXlUaW1lKDEpO1xuICovXG5jYy5kZWxheVRpbWUgPSBmdW5jdGlvbiAoZCkge1xuICAgIHJldHVybiBuZXcgY2MuRGVsYXlUaW1lKGQpO1xufTtcblxuLypcbiAqIDxwPlxuICogRXhlY3V0ZXMgYW4gYWN0aW9uIGluIHJldmVyc2Ugb3JkZXIsIGZyb20gdGltZT1kdXJhdGlvbiB0byB0aW1lPTAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAqIEB3YXJuaW5nIFVzZSB0aGlzIGFjdGlvbiBjYXJlZnVsbHkuIFRoaXMgYWN0aW9uIGlzIG5vdCBzZXF1ZW5jZWFibGUuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAqIFVzZSBpdCBhcyB0aGUgZGVmYXVsdCBcInJldmVyc2VkXCIgbWV0aG9kIG9mIHlvdXIgb3duIGFjdGlvbnMsIGJ1dCB1c2luZyBpdCBvdXRzaWRlIHRoZSBcInJldmVyc2VkXCIgICAgICA8YnIvPlxuICogc2NvcGUgaXMgbm90IHJlY29tbWVuZGVkLlxuICogPC9wPlxuICogQGNsYXNzIFJldmVyc2VUaW1lXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnRlcnZhbFxuICogQHBhcmFtIHtGaW5pdGVUaW1lQWN0aW9ufSBhY3Rpb25cbiAqIEBleGFtcGxlXG4gKiAgdmFyIHJldmVyc2UgPSBuZXcgY2MuUmV2ZXJzZVRpbWUodGhpcyk7XG4gKi9cbmNjLlJldmVyc2VUaW1lID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5SZXZlcnNlVGltZScsXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uSW50ZXJ2YWwsXG5cbiAgICBjdG9yOmZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fb3RoZXIgPSBudWxsO1xuXHRcdGFjdGlvbiAmJiB0aGlzLmluaXRXaXRoQWN0aW9uKGFjdGlvbik7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogQHBhcmFtIHtGaW5pdGVUaW1lQWN0aW9ufSBhY3Rpb25cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGluaXRXaXRoQWN0aW9uOmZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgaWYgKCFhY3Rpb24pIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMTAyOCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gdGhpcy5fb3RoZXIpIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMTAyOSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCBhY3Rpb24uX2R1cmF0aW9uKSkge1xuICAgICAgICAgICAgLy8gRG9uJ3QgbGVhayBpZiBhY3Rpb24gaXMgcmV1c2VkXG4gICAgICAgICAgICB0aGlzLl9vdGhlciA9IGFjdGlvbjtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLlJldmVyc2VUaW1lKCk7XG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xuICAgICAgICBhY3Rpb24uaW5pdFdpdGhBY3Rpb24odGhpcy5fb3RoZXIuY2xvbmUoKSk7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfSxcblxuICAgIHN0YXJ0V2l0aFRhcmdldDpmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgICB0aGlzLl9vdGhlci5zdGFydFdpdGhUYXJnZXQodGFyZ2V0KTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xuICAgICAgICBkdCA9IHRoaXMuX2NvbXB1dGVFYXNlVGltZShkdCk7XG4gICAgICAgIGlmICh0aGlzLl9vdGhlcilcbiAgICAgICAgICAgIHRoaXMuX290aGVyLnVwZGF0ZSgxIC0gZHQpO1xuICAgIH0sXG5cbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX290aGVyLmNsb25lKCk7XG4gICAgfSxcblxuICAgIHN0b3A6ZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9vdGhlci5zdG9wKCk7XG4gICAgICAgIGNjLkFjdGlvbi5wcm90b3R5cGUuc3RvcC5jYWxsKHRoaXMpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW4gRXhlY3V0ZXMgYW4gYWN0aW9uIGluIHJldmVyc2Ugb3JkZXIsIGZyb20gdGltZT1kdXJhdGlvbiB0byB0aW1lPTAuXG4gKiAhI3poIOWPjei9rOebruagh+WKqOS9nOeahOaXtumXtOi9tOOAglxuICogQG1ldGhvZCByZXZlcnNlVGltZVxuICogQHBhcmFtIHtGaW5pdGVUaW1lQWN0aW9ufSBhY3Rpb25cbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxuICogQGV4YW1wbGVcbiAqIC8vIGV4YW1wbGVcbiAqICB2YXIgcmV2ZXJzZSA9IGNjLnJldmVyc2VUaW1lKHRoaXMpO1xuICovXG5jYy5yZXZlcnNlVGltZSA9IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICByZXR1cm4gbmV3IGNjLlJldmVyc2VUaW1lKGFjdGlvbik7XG59O1xuXG4vKlxuICogPHA+XG4gKiBPdmVycmlkZXMgdGhlIHRhcmdldCBvZiBhbiBhY3Rpb24gc28gdGhhdCBpdCBhbHdheXMgcnVucyBvbiB0aGUgdGFyZ2V0PGJyLz5cbiAqIHNwZWNpZmllZCBhdCBhY3Rpb24gY3JlYXRpb24gcmF0aGVyIHRoYW4gdGhlIG9uZSBzcGVjaWZpZWQgYnkgcnVuQWN0aW9uLlxuICogPC9wPlxuICogQGNsYXNzIFRhcmdldGVkQWN0aW9uXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnRlcnZhbFxuICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcbiAqIEBwYXJhbSB7RmluaXRlVGltZUFjdGlvbn0gYWN0aW9uXG4gKi9cbmNjLlRhcmdldGVkQWN0aW9uID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5UYXJnZXRlZEFjdGlvbicsXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uSW50ZXJ2YWwsXG5cbiAgICBjdG9yOiBmdW5jdGlvbiAodGFyZ2V0LCBhY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fYWN0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZm9yY2VkVGFyZ2V0ID0gbnVsbDtcblx0XHRhY3Rpb24gJiYgdGhpcy5pbml0V2l0aFRhcmdldCh0YXJnZXQsIGFjdGlvbik7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogSW5pdCBhbiBhY3Rpb24gd2l0aCB0aGUgc3BlY2lmaWVkIGFjdGlvbiBhbmQgZm9yY2VkIHRhcmdldFxuICAgICAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gICAgICogQHBhcmFtIHtGaW5pdGVUaW1lQWN0aW9ufSBhY3Rpb25cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGluaXRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQsIGFjdGlvbikge1xuICAgICAgICBpZiAodGhpcy5pbml0V2l0aER1cmF0aW9uKGFjdGlvbi5fZHVyYXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLl9mb3JjZWRUYXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5UYXJnZXRlZEFjdGlvbigpO1xuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoVGFyZ2V0KHRoaXMuX2ZvcmNlZFRhcmdldCwgdGhpcy5fYWN0aW9uLmNsb25lKCkpO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH0sXG5cbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fYWN0aW9uLnN0YXJ0V2l0aFRhcmdldCh0aGlzLl9mb3JjZWRUYXJnZXQpO1xuICAgIH0sXG5cbiAgICBzdG9wOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fYWN0aW9uLnN0b3AoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xuICAgICAgICBkdCA9IHRoaXMuX2NvbXB1dGVFYXNlVGltZShkdCk7XG4gICAgICAgIHRoaXMuX2FjdGlvbi51cGRhdGUoZHQpO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIHJldHVybiB0aGUgdGFyZ2V0IHRoYXQgdGhlIGFjdGlvbiB3aWxsIGJlIGZvcmNlZCB0byBydW4gd2l0aFxuICAgICAqIEByZXR1cm4ge05vZGV9XG4gICAgICovXG4gICAgZ2V0Rm9yY2VkVGFyZ2V0OmZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvcmNlZFRhcmdldDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBzZXQgdGhlIHRhcmdldCB0aGF0IHRoZSBhY3Rpb24gd2lsbCBiZSBmb3JjZWQgdG8gcnVuIHdpdGhcbiAgICAgKiBAcGFyYW0ge05vZGV9IGZvcmNlZFRhcmdldFxuICAgICAqL1xuICAgIHNldEZvcmNlZFRhcmdldDpmdW5jdGlvbiAoZm9yY2VkVGFyZ2V0KSB7XG4gICAgICAgIGlmICh0aGlzLl9mb3JjZWRUYXJnZXQgIT09IGZvcmNlZFRhcmdldClcbiAgICAgICAgICAgIHRoaXMuX2ZvcmNlZFRhcmdldCA9IGZvcmNlZFRhcmdldDtcbiAgICB9XG59KTtcblxuLyoqXG4gKiAhI2VuIENyZWF0ZSBhbiBhY3Rpb24gd2l0aCB0aGUgc3BlY2lmaWVkIGFjdGlvbiBhbmQgZm9yY2VkIHRhcmdldC5cbiAqICEjemgg55So5bey5pyJ5Yqo5L2c5ZKM5LiA5Liq5paw55qE55uu5qCH6IqC54K55Yib5bu65Yqo5L2c44CCXG4gKiBAbWV0aG9kIHRhcmdldGVkQWN0aW9uXG4gKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuICogQHBhcmFtIHtGaW5pdGVUaW1lQWN0aW9ufSBhY3Rpb25cbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxuICovXG5jYy50YXJnZXRlZEFjdGlvbiA9IGZ1bmN0aW9uICh0YXJnZXQsIGFjdGlvbikge1xuICAgIHJldHVybiBuZXcgY2MuVGFyZ2V0ZWRBY3Rpb24odGFyZ2V0LCBhY3Rpb24pO1xufTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9