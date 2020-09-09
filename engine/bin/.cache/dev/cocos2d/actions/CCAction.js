
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/actions/CCAction.js';
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
require('../core/platform/CCClass');

var misc = require('../core/utils/misc');
/**
 * @module cc
 */

/**
 * !#en Base class cc.Action for action classes.
 * !#zh Action 类是所有动作类型的基类。
 * @class Action
 */


cc.Action = cc.Class({
  name: 'cc.Action',
  //**************Public Functions***********
  ctor: function ctor() {
    this.originalTarget = null;
    this.target = null;
    this.tag = cc.Action.TAG_INVALID;
  },

  /**
   * !#en
   * to copy object with deep copy.
   * returns a clone of action.
   * !#zh 返回一个克隆的动作。
   * @method clone
   * @return {Action}
   */
  clone: function clone() {
    var action = new cc.Action();
    action.originalTarget = null;
    action.target = null;
    action.tag = this.tag;
    return action;
  },

  /**
   * !#en
   * return true if the action has finished.
   * !#zh 如果动作已完成就返回 true。
   * @method isDone
   * @return {Boolean}
   */
  isDone: function isDone() {
    return true;
  },
  // called before the action start. It will also set the target.
  startWithTarget: function startWithTarget(target) {
    this.originalTarget = target;
    this.target = target;
  },
  // called after the action has finished. It will set the 'target' to nil.
  stop: function stop() {
    this.target = null;
  },
  // called every frame with it's delta time. <br />
  step: function step(dt) {
    cc.logID(1006);
  },
  // Called once per frame. Time is the number of seconds of a frame interval.
  update: function update(dt) {
    cc.logID(1007);
  },

  /**
   * !#en get the target.
   * !#zh 获取当前目标节点。
   * @method getTarget
   * @return {Node}
   */
  getTarget: function getTarget() {
    return this.target;
  },

  /**
   * !#en The action will modify the target properties.
   * !#zh 设置目标节点。
   * @method setTarget
   * @param {Node} target
   */
  setTarget: function setTarget(target) {
    this.target = target;
  },

  /**
   * !#en get the original target.
   * !#zh 获取原始目标节点。
   * @method getOriginalTarget
   * @return {Node}
   */
  getOriginalTarget: function getOriginalTarget() {
    return this.originalTarget;
  },
  // Set the original target, since target can be nil.
  // Is the target that were used to run the action.
  // Unless you are doing something complex, like cc.ActionManager, you should NOT call this method.
  setOriginalTarget: function setOriginalTarget(originalTarget) {
    this.originalTarget = originalTarget;
  },

  /**
   * !#en get tag number.
   * !#zh 获取用于识别动作的标签。
   * @method getTag
   * @return {Number}
   */
  getTag: function getTag() {
    return this.tag;
  },

  /**
   * !#en set tag number.
   * !#zh 设置标签，用于识别动作。
   * @method setTag
   * @param {Number} tag
   */
  setTag: function setTag(tag) {
    this.tag = tag;
  },
  // Currently JavaScript Bindigns (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
  // and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
  // This is a hack, and should be removed once JSB fixes the retain/release bug.
  retain: function retain() {},
  // Currently JavaScript Bindigns (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
  // and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
  // This is a hack, and should be removed once JSB fixes the retain/release bug.
  release: function release() {}
});
/**
 * !#en Default Action tag.
 * !#zh 默认动作标签。
 * @property TAG_INVALID
 * @constant
 * @static
 * @type {Number}
 * @default -1
 */

cc.Action.TAG_INVALID = -1;
/**
 * !#en
 * Base class actions that do have a finite time duration. <br/>
 * Possible actions: <br/>
 * - An action with a duration of 0 seconds. <br/>
 * - An action with a duration of 35.5 seconds.
 *
 * Infinite time actions are valid
 * !#zh 有限时间动作，这种动作拥有时长 duration 属性。
 * @class FiniteTimeAction
 * @extends Action
 */

cc.FiniteTimeAction = cc.Class({
  name: 'cc.FiniteTimeAction',
  "extends": cc.Action,
  ctor: function ctor() {
    //! duration in seconds
    this._duration = 0;
  },

  /**
   * !#en get duration of the action. (seconds).
   * !#zh 获取动作以秒为单位的持续时间。
   * @method getDuration
   * @return {Number}
   */
  getDuration: function getDuration() {
    return this._duration * (this._timesForRepeat || 1);
  },

  /**
   * !#en set duration of the action. (seconds).
   * !#zh 设置动作以秒为单位的持续时间。
   * @method setDuration
   * @param {Number} duration
   */
  setDuration: function setDuration(duration) {
    this._duration = duration;
  },

  /**
   * !#en
   * Returns a reversed action. <br />
   * For example: <br />
   * - The action will be x coordinates of 0 move to 100. <br />
   * - The reversed action will be x of 100 move to 0.
   * - Will be rewritten
   * !#zh 返回一个新的动作，执行与原动作完全相反的动作。
   * @method reverse
   * @return {Null}
   */
  reverse: function reverse() {
    cc.logID(1008);
    return null;
  },

  /**
   * !#en
   * to copy object with deep copy.
   * returns a clone of action.
   * !#zh 返回一个克隆的动作。
   * @method clone
   * @return {FiniteTimeAction}
   */
  clone: function clone() {
    return new cc.FiniteTimeAction();
  }
});
/**
 * @module cc
 */

/*
 * Changes the speed of an action, making it take longer (speed > 1)
 * or less (speed < 1) time. <br/>
 * Useful to simulate 'slow motion' or 'fast forward' effect.
 *
 * @warning This action can't be Sequenceable because it is not an cc.IntervalAction
 * @class Speed
 * @extends Action
 *
 * @param {ActionInterval} action
 * @param {Number} speed
 */

cc.Speed = cc.Class({
  name: 'cc.Speed',
  "extends": cc.Action,
  ctor: function ctor(action, speed) {
    this._speed = 0;
    this._innerAction = null;
    action && this.initWithAction(action, speed);
  },

  /*
   * Gets the current running speed. <br />
   * Will get a percentage number, compared to the original speed.
   *
   * @method getSpeed
   * @return {Number}
   */
  getSpeed: function getSpeed() {
    return this._speed;
  },

  /*
   * alter the speed of the inner function in runtime.
   * @method setSpeed
   * @param {Number} speed
   */
  setSpeed: function setSpeed(speed) {
    this._speed = speed;
  },

  /*
   * initializes the action.
   * @method initWithAction
   * @param {ActionInterval} action
   * @param {Number} speed
   * @return {Boolean}
   */
  initWithAction: function initWithAction(action, speed) {
    if (!action) {
      cc.errorID(1021);
      return false;
    }

    this._innerAction = action;
    this._speed = speed;
    return true;
  },
  clone: function clone() {
    var action = new cc.Speed();
    action.initWithAction(this._innerAction.clone(), this._speed);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.Action.prototype.startWithTarget.call(this, target);

    this._innerAction.startWithTarget(target);
  },
  stop: function stop() {
    this._innerAction.stop();

    cc.Action.prototype.stop.call(this);
  },
  step: function step(dt) {
    this._innerAction.step(dt * this._speed);
  },
  isDone: function isDone() {
    return this._innerAction.isDone();
  },
  reverse: function reverse() {
    return new cc.Speed(this._innerAction.reverse(), this._speed);
  },

  /*
   * Set inner Action.
   * @method setInnerAction
   * @param {ActionInterval} action
   */
  setInnerAction: function setInnerAction(action) {
    if (this._innerAction !== action) {
      this._innerAction = action;
    }
  },

  /*
   * Get inner Action.
   * @method getInnerAction
   * @return {ActionInterval}
   */
  getInnerAction: function getInnerAction() {
    return this._innerAction;
  }
});
/**
 * @module cc
 */

/**
 * !#en
 * Creates the speed action which changes the speed of an action, making it take longer (speed > 1)
 * or less (speed < 1) time. <br/>
 * Useful to simulate 'slow motion' or 'fast forward' effect.
 * !#zh 修改目标动作的速率。
 * @warning This action can't be Sequenceable because it is not an cc.IntervalAction
 *
 * @method speed
 * @param {ActionInterval} action
 * @param {Number} speed
 * @return {Action}
 * @example
 * // change the target action speed;
 * var action = cc.scaleTo(0.2, 1, 0.6);
 * var newAction = cc.speed(action, 0.5);
 */

cc.speed = function (action, speed) {
  return new cc.Speed(action, speed);
};
/*
 * cc.Follow is a follow action which makes its target follows another node.
 *
 * @example
 * //example
 * //Instead of using cc.Camera as a "follower", use this action instead.
 * layer.runAction(cc.follow(hero));
 *
 * @property {Number}  leftBoundary - world leftBoundary.
 * @property {Number}  rightBoundary - world rightBoundary.
 * @property {Number}  topBoundary - world topBoundary.
 * @property {Number}  bottomBoundary - world bottomBoundary.
 *
 * @param {cc.Node} followedNode
 * @param {Rect} rect
 * @example
 * // creates the action with a set boundary
 * var followAction = new cc.Follow(node, cc.rect(0, 0, s.width * 2 - 100, s.height));
 * this.runAction(followAction);
 *
 * // creates the action with no boundary set
 * var followAction = new cc.Follow(node);
 * this.runAction(followAction);
 *
 * @class
 * @extends Action
 */


cc.Follow = cc.Class({
  name: 'cc.Follow',
  "extends": cc.Action,

  /*
      * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
   * creates the action with a set boundary. <br/>
   * creates the action with no boundary set.
      * @param {cc.Node} followedNode
      * @param {Rect} rect
   */
  ctor: function ctor(followedNode, rect) {
    // node to follow
    this._followedNode = null; // whether camera should be limited to certain area

    this._boundarySet = false; // if screen size is bigger than the boundary - update not needed

    this._boundaryFullyCovered = false; // fast access to the screen dimensions

    this._halfScreenSize = null;
    this._fullScreenSize = null;
    this.leftBoundary = 0.0;
    this.rightBoundary = 0.0;
    this.topBoundary = 0.0;
    this.bottomBoundary = 0.0;
    this._worldRect = cc.rect(0, 0, 0, 0);
    if (followedNode) rect ? this.initWithTarget(followedNode, rect) : this.initWithTarget(followedNode);
  },
  clone: function clone() {
    var action = new cc.Follow();
    var locRect = this._worldRect;
    var rect = new cc.Rect(locRect.x, locRect.y, locRect.width, locRect.height);
    action.initWithTarget(this._followedNode, rect);
    return action;
  },

  /*
   * Get whether camera should be limited to certain area.
   *
   * @return {Boolean}
   */
  isBoundarySet: function isBoundarySet() {
    return this._boundarySet;
  },

  /*
   * alter behavior - turn on/off boundary.
   *
   * @param {Boolean} value
   */
  setBoudarySet: function setBoudarySet(value) {
    this._boundarySet = value;
  },

  /*
   * initializes the action with a set boundary.
   *
   * @param {cc.Node} followedNode
   * @param {Rect} [rect=]
   * @return {Boolean}
   */
  initWithTarget: function initWithTarget(followedNode, rect) {
    if (!followedNode) {
      cc.errorID(1022);
      return false;
    }

    var _this = this;

    rect = rect || cc.rect(0, 0, 0, 0);
    _this._followedNode = followedNode;
    _this._worldRect = rect;
    _this._boundarySet = !(rect.width === 0 && rect.height === 0);
    _this._boundaryFullyCovered = false;
    var winSize = cc.winSize;
    _this._fullScreenSize = cc.v2(winSize.width, winSize.height);
    _this._halfScreenSize = _this._fullScreenSize.mul(0.5);

    if (_this._boundarySet) {
      _this.leftBoundary = -(rect.x + rect.width - _this._fullScreenSize.x);
      _this.rightBoundary = -rect.x;
      _this.topBoundary = -rect.y;
      _this.bottomBoundary = -(rect.y + rect.height - _this._fullScreenSize.y);

      if (_this.rightBoundary < _this.leftBoundary) {
        // screen width is larger than world's boundary width
        //set both in the middle of the world
        _this.rightBoundary = _this.leftBoundary = (_this.leftBoundary + _this.rightBoundary) / 2;
      }

      if (_this.topBoundary < _this.bottomBoundary) {
        // screen width is larger than world's boundary width
        //set both in the middle of the world
        _this.topBoundary = _this.bottomBoundary = (_this.topBoundary + _this.bottomBoundary) / 2;
      }

      if (_this.topBoundary === _this.bottomBoundary && _this.leftBoundary === _this.rightBoundary) _this._boundaryFullyCovered = true;
    }

    return true;
  },
  step: function step(dt) {
    var targetWorldPos = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);

    var followedWorldPos = this._followedNode.convertToWorldSpaceAR(cc.Vec2.ZERO); // compute the offset between followed and target node


    var delta = targetWorldPos.sub(followedWorldPos);
    var tempPos = this.target.parent.convertToNodeSpaceAR(delta.add(this._halfScreenSize));

    if (this._boundarySet) {
      // whole map fits inside a single screen, no need to modify the position - unless map boundaries are increased
      if (this._boundaryFullyCovered) return;
      this.target.setPosition(misc.clampf(tempPos.x, this.leftBoundary, this.rightBoundary), misc.clampf(tempPos.y, this.bottomBoundary, this.topBoundary));
    } else {
      this.target.setPosition(tempPos.x, tempPos.y);
    }
  },
  isDone: function isDone() {
    return !this._followedNode.activeInHierarchy;
  },
  stop: function stop() {
    this.target = null;
    cc.Action.prototype.stop.call(this);
  }
});
/**
 * !#en Create a follow action which makes its target follows another node.
 * !#zh 追踪目标节点的位置。
 * @method follow
 * @param {Node} followedNode
 * @param {Rect} rect
 * @return {Action|Null} returns the cc.Follow object on success
 * @example
 * // example
 * // creates the action with a set boundary
 * var followAction = cc.follow(targetNode, cc.rect(0, 0, screenWidth * 2 - 100, screenHeight));
 * node.runAction(followAction);
 *
 * // creates the action with no boundary set
 * var followAction = cc.follow(targetNode);
 * node.runAction(followAction);
 */

cc.follow = function (followedNode, rect) {
  return new cc.Follow(followedNode, rect);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9hY3Rpb25zL0NDQWN0aW9uLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJtaXNjIiwiY2MiLCJBY3Rpb24iLCJDbGFzcyIsIm5hbWUiLCJjdG9yIiwib3JpZ2luYWxUYXJnZXQiLCJ0YXJnZXQiLCJ0YWciLCJUQUdfSU5WQUxJRCIsImNsb25lIiwiYWN0aW9uIiwiaXNEb25lIiwic3RhcnRXaXRoVGFyZ2V0Iiwic3RvcCIsInN0ZXAiLCJkdCIsImxvZ0lEIiwidXBkYXRlIiwiZ2V0VGFyZ2V0Iiwic2V0VGFyZ2V0IiwiZ2V0T3JpZ2luYWxUYXJnZXQiLCJzZXRPcmlnaW5hbFRhcmdldCIsImdldFRhZyIsInNldFRhZyIsInJldGFpbiIsInJlbGVhc2UiLCJGaW5pdGVUaW1lQWN0aW9uIiwiX2R1cmF0aW9uIiwiZ2V0RHVyYXRpb24iLCJfdGltZXNGb3JSZXBlYXQiLCJzZXREdXJhdGlvbiIsImR1cmF0aW9uIiwicmV2ZXJzZSIsIlNwZWVkIiwic3BlZWQiLCJfc3BlZWQiLCJfaW5uZXJBY3Rpb24iLCJpbml0V2l0aEFjdGlvbiIsImdldFNwZWVkIiwic2V0U3BlZWQiLCJlcnJvcklEIiwicHJvdG90eXBlIiwiY2FsbCIsInNldElubmVyQWN0aW9uIiwiZ2V0SW5uZXJBY3Rpb24iLCJGb2xsb3ciLCJmb2xsb3dlZE5vZGUiLCJyZWN0IiwiX2ZvbGxvd2VkTm9kZSIsIl9ib3VuZGFyeVNldCIsIl9ib3VuZGFyeUZ1bGx5Q292ZXJlZCIsIl9oYWxmU2NyZWVuU2l6ZSIsIl9mdWxsU2NyZWVuU2l6ZSIsImxlZnRCb3VuZGFyeSIsInJpZ2h0Qm91bmRhcnkiLCJ0b3BCb3VuZGFyeSIsImJvdHRvbUJvdW5kYXJ5IiwiX3dvcmxkUmVjdCIsImluaXRXaXRoVGFyZ2V0IiwibG9jUmVjdCIsIlJlY3QiLCJ4IiwieSIsIndpZHRoIiwiaGVpZ2h0IiwiaXNCb3VuZGFyeVNldCIsInNldEJvdWRhcnlTZXQiLCJ2YWx1ZSIsIl90aGlzIiwid2luU2l6ZSIsInYyIiwibXVsIiwidGFyZ2V0V29ybGRQb3MiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJWZWMyIiwiWkVSTyIsImZvbGxvd2VkV29ybGRQb3MiLCJkZWx0YSIsInN1YiIsInRlbXBQb3MiLCJwYXJlbnQiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsImFkZCIsInNldFBvc2l0aW9uIiwiY2xhbXBmIiwiYWN0aXZlSW5IaWVyYXJjaHkiLCJmb2xsb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkFBLE9BQU8sQ0FBQywwQkFBRCxDQUFQOztBQUNBLElBQU1DLElBQUksR0FBR0QsT0FBTyxDQUFDLG9CQUFELENBQXBCO0FBRUE7Ozs7QUFJQTs7Ozs7OztBQUtBRSxFQUFFLENBQUNDLE1BQUgsR0FBWUQsRUFBRSxDQUFDRSxLQUFILENBQVM7QUFDakJDLEVBQUFBLElBQUksRUFBRSxXQURXO0FBR2pCO0FBRUFDLEVBQUFBLElBQUksRUFBQyxnQkFBWTtBQUNiLFNBQUtDLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUtDLEdBQUwsR0FBV1AsRUFBRSxDQUFDQyxNQUFILENBQVVPLFdBQXJCO0FBQ0gsR0FUZ0I7O0FBV2pCOzs7Ozs7OztBQVFBQyxFQUFBQSxLQUFLLEVBQUMsaUJBQVk7QUFDZCxRQUFJQyxNQUFNLEdBQUcsSUFBSVYsRUFBRSxDQUFDQyxNQUFQLEVBQWI7QUFDQVMsSUFBQUEsTUFBTSxDQUFDTCxjQUFQLEdBQXdCLElBQXhCO0FBQ0FLLElBQUFBLE1BQU0sQ0FBQ0osTUFBUCxHQUFnQixJQUFoQjtBQUNBSSxJQUFBQSxNQUFNLENBQUNILEdBQVAsR0FBYSxLQUFLQSxHQUFsQjtBQUNBLFdBQU9HLE1BQVA7QUFDSCxHQXpCZ0I7O0FBMkJqQjs7Ozs7OztBQU9BQyxFQUFBQSxNQUFNLEVBQUMsa0JBQVk7QUFDZixXQUFPLElBQVA7QUFDSCxHQXBDZ0I7QUFzQ2pC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RUFBMEMsS0FBS0MsYUFBL0MsQ0FBeEIsRUFBdUZ2RCxJQUFJLENBQUNxRixNQUFMLENBQVlMLE9BQU8sQ0FBQ2pCLENBQXBCLEVBQXVCLEtBQUtOLGNBQTVCLEVBQTRDLEtBQUtELFdBQWpELENBQXZGO0FBQ0EsS0FORCxNQU1PO0FBQ0gsV0FBS2pELE1BQUwsQ0FBWTZFLFdBQVosQ0FBd0JKLE9BQU8sQ0FBQ2xCLENBQWhDLEVBQW1Da0IsT0FBTyxDQUFDakIsQ0FBM0M7QUFDSDtBQUNKLEdBNUhnQjtBQThIakJuRCxFQUFBQSxNQUFNLEVBQUMsa0JBQVk7QUFDZixXQUFTLENBQUMsS0FBS3FDLGFBQUwsQ0FBbUJxQyxpQkFBN0I7QUFDSCxHQWhJZ0I7QUFrSWpCeEUsRUFBQUEsSUFBSSxFQUFDLGdCQUFZO0FBQ2IsU0FBS1AsTUFBTCxHQUFjLElBQWQ7QUFDQU4sSUFBQUEsRUFBRSxDQUFDQyxNQUFILENBQVV3QyxTQUFWLENBQW9CNUIsSUFBcEIsQ0FBeUI2QixJQUF6QixDQUE4QixJQUE5QjtBQUNIO0FBcklnQixDQUFULENBQVo7QUF3SUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQTFDLEVBQUUsQ0FBQ3NGLE1BQUgsR0FBWSxVQUFVeEMsWUFBVixFQUF3QkMsSUFBeEIsRUFBOEI7QUFDdEMsU0FBTyxJQUFJL0MsRUFBRSxDQUFDNkMsTUFBUCxDQUFjQyxZQUFkLEVBQTRCQyxJQUE1QixDQUFQO0FBQ0gsQ0FGRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDA4LTIwMTAgUmljYXJkbyBRdWVzYWRhXG4gQ29weXJpZ2h0IChjKSAyMDExLTIwMTIgY29jb3MyZC14Lm9yZ1xuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxucmVxdWlyZSgnLi4vY29yZS9wbGF0Zm9ybS9DQ0NsYXNzJyk7XG5jb25zdCBtaXNjID0gcmVxdWlyZSgnLi4vY29yZS91dGlscy9taXNjJyk7XG5cbi8qKlxuICogQG1vZHVsZSBjY1xuICovXG5cbi8qKlxuICogISNlbiBCYXNlIGNsYXNzIGNjLkFjdGlvbiBmb3IgYWN0aW9uIGNsYXNzZXMuXG4gKiAhI3poIEFjdGlvbiDnsbvmmK/miYDmnInliqjkvZznsbvlnovnmoTln7rnsbvjgIJcbiAqIEBjbGFzcyBBY3Rpb25cbiAqL1xuY2MuQWN0aW9uID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5BY3Rpb24nLFxuXG4gICAgLy8qKioqKioqKioqKioqKlB1YmxpYyBGdW5jdGlvbnMqKioqKioqKioqKlxuXG4gICAgY3RvcjpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMub3JpZ2luYWxUYXJnZXQgPSBudWxsO1xuICAgICAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgICAgIHRoaXMudGFnID0gY2MuQWN0aW9uLlRBR19JTlZBTElEO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogdG8gY29weSBvYmplY3Qgd2l0aCBkZWVwIGNvcHkuXG4gICAgICogcmV0dXJucyBhIGNsb25lIG9mIGFjdGlvbi5cbiAgICAgKiAhI3poIOi/lOWbnuS4gOS4quWFi+mahueahOWKqOS9nOOAglxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAcmV0dXJuIHtBY3Rpb259XG4gICAgICovXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLkFjdGlvbigpO1xuICAgICAgICBhY3Rpb24ub3JpZ2luYWxUYXJnZXQgPSBudWxsO1xuICAgICAgICBhY3Rpb24udGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgYWN0aW9uLnRhZyA9IHRoaXMudGFnO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhlIGFjdGlvbiBoYXMgZmluaXNoZWQuXG4gICAgICogISN6aCDlpoLmnpzliqjkvZzlt7LlrozmiJDlsLHov5Tlm54gdHJ1ZeOAglxuICAgICAqIEBtZXRob2QgaXNEb25lXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0RvbmU6ZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGJlZm9yZSB0aGUgYWN0aW9uIHN0YXJ0LiBJdCB3aWxsIGFsc28gc2V0IHRoZSB0YXJnZXQuXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBhZnRlciB0aGUgYWN0aW9uIGhhcyBmaW5pc2hlZC4gSXQgd2lsbCBzZXQgdGhlICd0YXJnZXQnIHRvIG5pbC5cbiAgICBzdG9wOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUgd2l0aCBpdCdzIGRlbHRhIHRpbWUuIDxiciAvPlxuICAgIHN0ZXA6ZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIGNjLmxvZ0lEKDEwMDYpO1xuICAgIH0sXG5cbiAgICAvLyBDYWxsZWQgb25jZSBwZXIgZnJhbWUuIFRpbWUgaXMgdGhlIG51bWJlciBvZiBzZWNvbmRzIG9mIGEgZnJhbWUgaW50ZXJ2YWwuXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xuICAgICAgICBjYy5sb2dJRCgxMDA3KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBnZXQgdGhlIHRhcmdldC5cbiAgICAgKiAhI3poIOiOt+WPluW9k+WJjeebruagh+iKgueCueOAglxuICAgICAqIEBtZXRob2QgZ2V0VGFyZ2V0XG4gICAgICogQHJldHVybiB7Tm9kZX1cbiAgICAgKi9cbiAgICBnZXRUYXJnZXQ6ZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50YXJnZXQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGFjdGlvbiB3aWxsIG1vZGlmeSB0aGUgdGFyZ2V0IHByb3BlcnRpZXMuXG4gICAgICogISN6aCDorr7nva7nm67moIfoioLngrnjgIJcbiAgICAgKiBAbWV0aG9kIHNldFRhcmdldFxuICAgICAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gICAgICovXG4gICAgc2V0VGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gZ2V0IHRoZSBvcmlnaW5hbCB0YXJnZXQuXG4gICAgICogISN6aCDojrflj5bljp/lp4vnm67moIfoioLngrnjgIJcbiAgICAgKiBAbWV0aG9kIGdldE9yaWdpbmFsVGFyZ2V0XG4gICAgICogQHJldHVybiB7Tm9kZX1cbiAgICAgKi9cbiAgICBnZXRPcmlnaW5hbFRhcmdldDpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsVGFyZ2V0O1xuICAgIH0sXG5cbiAgICAvLyBTZXQgdGhlIG9yaWdpbmFsIHRhcmdldCwgc2luY2UgdGFyZ2V0IGNhbiBiZSBuaWwuXG4gICAgLy8gSXMgdGhlIHRhcmdldCB0aGF0IHdlcmUgdXNlZCB0byBydW4gdGhlIGFjdGlvbi5cbiAgICAvLyBVbmxlc3MgeW91IGFyZSBkb2luZyBzb21ldGhpbmcgY29tcGxleCwgbGlrZSBjYy5BY3Rpb25NYW5hZ2VyLCB5b3Ugc2hvdWxkIE5PVCBjYWxsIHRoaXMgbWV0aG9kLlxuICAgIHNldE9yaWdpbmFsVGFyZ2V0OmZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCkge1xuICAgICAgICB0aGlzLm9yaWdpbmFsVGFyZ2V0ID0gb3JpZ2luYWxUYXJnZXQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gZ2V0IHRhZyBudW1iZXIuXG4gICAgICogISN6aCDojrflj5bnlKjkuo7or4bliKvliqjkvZznmoTmoIfnrb7jgIJcbiAgICAgKiBAbWV0aG9kIGdldFRhZ1xuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRUYWc6ZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50YWc7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gc2V0IHRhZyBudW1iZXIuXG4gICAgICogISN6aCDorr7nva7moIfnrb7vvIznlKjkuo7or4bliKvliqjkvZzjgIJcbiAgICAgKiBAbWV0aG9kIHNldFRhZ1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0YWdcbiAgICAgKi9cbiAgICBzZXRUYWc6ZnVuY3Rpb24gKHRhZykge1xuICAgICAgICB0aGlzLnRhZyA9IHRhZztcbiAgICB9LFxuXG4gICAgLy8gQ3VycmVudGx5IEphdmFTY3JpcHQgQmluZGlnbnMgKEpTQiksIGluIHNvbWUgY2FzZXMsIG5lZWRzIHRvIHVzZSByZXRhaW4gYW5kIHJlbGVhc2UuIFRoaXMgaXMgYSBidWcgaW4gSlNCLFxuICAgIC8vIGFuZCB0aGUgdWdseSB3b3JrYXJvdW5kIGlzIHRvIHVzZSByZXRhaW4vcmVsZWFzZS4gU28sIHRoZXNlIDIgbWV0aG9kcyB3ZXJlIGFkZGVkIHRvIGJlIGNvbXBhdGlibGUgd2l0aCBKU0IuXG4gICAgLy8gVGhpcyBpcyBhIGhhY2ssIGFuZCBzaG91bGQgYmUgcmVtb3ZlZCBvbmNlIEpTQiBmaXhlcyB0aGUgcmV0YWluL3JlbGVhc2UgYnVnLlxuICAgIHJldGFpbjpmdW5jdGlvbiAoKSB7XG4gICAgfSxcblxuICAgIC8vIEN1cnJlbnRseSBKYXZhU2NyaXB0IEJpbmRpZ25zIChKU0IpLCBpbiBzb21lIGNhc2VzLCBuZWVkcyB0byB1c2UgcmV0YWluIGFuZCByZWxlYXNlLiBUaGlzIGlzIGEgYnVnIGluIEpTQixcbiAgICAvLyBhbmQgdGhlIHVnbHkgd29ya2Fyb3VuZCBpcyB0byB1c2UgcmV0YWluL3JlbGVhc2UuIFNvLCB0aGVzZSAyIG1ldGhvZHMgd2VyZSBhZGRlZCB0byBiZSBjb21wYXRpYmxlIHdpdGggSlNCLlxuICAgIC8vIFRoaXMgaXMgYSBoYWNrLCBhbmQgc2hvdWxkIGJlIHJlbW92ZWQgb25jZSBKU0IgZml4ZXMgdGhlIHJldGFpbi9yZWxlYXNlIGJ1Zy5cbiAgICByZWxlYXNlOmZ1bmN0aW9uICgpIHtcbiAgICB9XG59KTtcblxuLyoqXG4gKiAhI2VuIERlZmF1bHQgQWN0aW9uIHRhZy5cbiAqICEjemgg6buY6K6k5Yqo5L2c5qCH562+44CCXG4gKiBAcHJvcGVydHkgVEFHX0lOVkFMSURcbiAqIEBjb25zdGFudFxuICogQHN0YXRpY1xuICogQHR5cGUge051bWJlcn1cbiAqIEBkZWZhdWx0IC0xXG4gKi9cbmNjLkFjdGlvbi5UQUdfSU5WQUxJRCA9IC0xO1xuXG5cbi8qKlxuICogISNlblxuICogQmFzZSBjbGFzcyBhY3Rpb25zIHRoYXQgZG8gaGF2ZSBhIGZpbml0ZSB0aW1lIGR1cmF0aW9uLiA8YnIvPlxuICogUG9zc2libGUgYWN0aW9uczogPGJyLz5cbiAqIC0gQW4gYWN0aW9uIHdpdGggYSBkdXJhdGlvbiBvZiAwIHNlY29uZHMuIDxici8+XG4gKiAtIEFuIGFjdGlvbiB3aXRoIGEgZHVyYXRpb24gb2YgMzUuNSBzZWNvbmRzLlxuICpcbiAqIEluZmluaXRlIHRpbWUgYWN0aW9ucyBhcmUgdmFsaWRcbiAqICEjemgg5pyJ6ZmQ5pe26Ze05Yqo5L2c77yM6L+Z56eN5Yqo5L2c5oul5pyJ5pe26ZW/IGR1cmF0aW9uIOWxnuaAp+OAglxuICogQGNsYXNzIEZpbml0ZVRpbWVBY3Rpb25cbiAqIEBleHRlbmRzIEFjdGlvblxuICovXG5jYy5GaW5pdGVUaW1lQWN0aW9uID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5GaW5pdGVUaW1lQWN0aW9uJyxcbiAgICBleHRlbmRzOiBjYy5BY3Rpb24sXG5cbiAgICBjdG9yOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8hIGR1cmF0aW9uIGluIHNlY29uZHNcbiAgICAgICAgdGhpcy5fZHVyYXRpb24gPSAwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIGdldCBkdXJhdGlvbiBvZiB0aGUgYWN0aW9uLiAoc2Vjb25kcykuXG4gICAgICogISN6aCDojrflj5bliqjkvZzku6Xnp5LkuLrljZXkvY3nmoTmjIHnu63ml7bpl7TjgIJcbiAgICAgKiBAbWV0aG9kIGdldER1cmF0aW9uXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldER1cmF0aW9uOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R1cmF0aW9uICogKHRoaXMuX3RpbWVzRm9yUmVwZWF0IHx8IDEpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIHNldCBkdXJhdGlvbiBvZiB0aGUgYWN0aW9uLiAoc2Vjb25kcykuXG4gICAgICogISN6aCDorr7nva7liqjkvZzku6Xnp5LkuLrljZXkvY3nmoTmjIHnu63ml7bpl7TjgIJcbiAgICAgKiBAbWV0aG9kIHNldER1cmF0aW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uXG4gICAgICovXG4gICAgc2V0RHVyYXRpb246ZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgICAgIHRoaXMuX2R1cmF0aW9uID0gZHVyYXRpb247XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIGEgcmV2ZXJzZWQgYWN0aW9uLiA8YnIgLz5cbiAgICAgKiBGb3IgZXhhbXBsZTogPGJyIC8+XG4gICAgICogLSBUaGUgYWN0aW9uIHdpbGwgYmUgeCBjb29yZGluYXRlcyBvZiAwIG1vdmUgdG8gMTAwLiA8YnIgLz5cbiAgICAgKiAtIFRoZSByZXZlcnNlZCBhY3Rpb24gd2lsbCBiZSB4IG9mIDEwMCBtb3ZlIHRvIDAuXG4gICAgICogLSBXaWxsIGJlIHJld3JpdHRlblxuICAgICAqICEjemgg6L+U5Zue5LiA5Liq5paw55qE5Yqo5L2c77yM5omn6KGM5LiO5Y6f5Yqo5L2c5a6M5YWo55u45Y+N55qE5Yqo5L2c44CCXG4gICAgICogQG1ldGhvZCByZXZlcnNlXG4gICAgICogQHJldHVybiB7TnVsbH1cbiAgICAgKi9cbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MubG9nSUQoMTAwOCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogdG8gY29weSBvYmplY3Qgd2l0aCBkZWVwIGNvcHkuXG4gICAgICogcmV0dXJucyBhIGNsb25lIG9mIGFjdGlvbi5cbiAgICAgKiAhI3poIOi/lOWbnuS4gOS4quWFi+mahueahOWKqOS9nOOAglxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAcmV0dXJuIHtGaW5pdGVUaW1lQWN0aW9ufVxuICAgICAqL1xuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5GaW5pdGVUaW1lQWN0aW9uKCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQG1vZHVsZSBjY1xuICovXG5cbi8qXG4gKiBDaGFuZ2VzIHRoZSBzcGVlZCBvZiBhbiBhY3Rpb24sIG1ha2luZyBpdCB0YWtlIGxvbmdlciAoc3BlZWQgPiAxKVxuICogb3IgbGVzcyAoc3BlZWQgPCAxKSB0aW1lLiA8YnIvPlxuICogVXNlZnVsIHRvIHNpbXVsYXRlICdzbG93IG1vdGlvbicgb3IgJ2Zhc3QgZm9yd2FyZCcgZWZmZWN0LlxuICpcbiAqIEB3YXJuaW5nIFRoaXMgYWN0aW9uIGNhbid0IGJlIFNlcXVlbmNlYWJsZSBiZWNhdXNlIGl0IGlzIG5vdCBhbiBjYy5JbnRlcnZhbEFjdGlvblxuICogQGNsYXNzIFNwZWVkXG4gKiBAZXh0ZW5kcyBBY3Rpb25cbiAqXG4gKiBAcGFyYW0ge0FjdGlvbkludGVydmFsfSBhY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBzcGVlZFxuICovXG5jYy5TcGVlZCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuU3BlZWQnLFxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbixcblxuICAgIGN0b3I6ZnVuY3Rpb24gKGFjdGlvbiwgc3BlZWQpIHtcbiAgICAgICAgdGhpcy5fc3BlZWQgPSAwO1xuICAgICAgICB0aGlzLl9pbm5lckFjdGlvbiA9IG51bGw7XG5cblx0XHRhY3Rpb24gJiYgdGhpcy5pbml0V2l0aEFjdGlvbihhY3Rpb24sIHNwZWVkKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHJ1bm5pbmcgc3BlZWQuIDxiciAvPlxuICAgICAqIFdpbGwgZ2V0IGEgcGVyY2VudGFnZSBudW1iZXIsIGNvbXBhcmVkIHRvIHRoZSBvcmlnaW5hbCBzcGVlZC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0U3BlZWRcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0U3BlZWQ6ZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3BlZWQ7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogYWx0ZXIgdGhlIHNwZWVkIG9mIHRoZSBpbm5lciBmdW5jdGlvbiBpbiBydW50aW1lLlxuICAgICAqIEBtZXRob2Qgc2V0U3BlZWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3BlZWRcbiAgICAgKi9cbiAgICBzZXRTcGVlZDpmdW5jdGlvbiAoc3BlZWQpIHtcbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBpbml0aWFsaXplcyB0aGUgYWN0aW9uLlxuICAgICAqIEBtZXRob2QgaW5pdFdpdGhBY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FjdGlvbkludGVydmFsfSBhY3Rpb25cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3BlZWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGluaXRXaXRoQWN0aW9uOmZ1bmN0aW9uIChhY3Rpb24sIHNwZWVkKSB7XG4gICAgICAgIGlmICghYWN0aW9uKSB7XG4gICAgICAgICAgICBjYy5lcnJvcklEKDEwMjEpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW5uZXJBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQ7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuU3BlZWQoKTtcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoQWN0aW9uKHRoaXMuX2lubmVyQWN0aW9uLmNsb25lKCksIHRoaXMuX3NwZWVkKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9LFxuXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgY2MuQWN0aW9uLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgICB0aGlzLl9pbm5lckFjdGlvbi5zdGFydFdpdGhUYXJnZXQodGFyZ2V0KTtcbiAgICB9LFxuXG4gICAgc3RvcDpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2lubmVyQWN0aW9uLnN0b3AoKTtcbiAgICAgICAgY2MuQWN0aW9uLnByb3RvdHlwZS5zdG9wLmNhbGwodGhpcyk7XG4gICAgfSxcblxuICAgIHN0ZXA6ZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIHRoaXMuX2lubmVyQWN0aW9uLnN0ZXAoZHQgKiB0aGlzLl9zcGVlZCk7XG4gICAgfSxcblxuICAgIGlzRG9uZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbm5lckFjdGlvbi5pc0RvbmUoKTtcbiAgICB9LFxuXG4gICAgcmV2ZXJzZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgY2MuU3BlZWQodGhpcy5faW5uZXJBY3Rpb24ucmV2ZXJzZSgpLCB0aGlzLl9zcGVlZCk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0IGlubmVyIEFjdGlvbi5cbiAgICAgKiBAbWV0aG9kIHNldElubmVyQWN0aW9uXG4gICAgICogQHBhcmFtIHtBY3Rpb25JbnRlcnZhbH0gYWN0aW9uXG4gICAgICovXG4gICAgc2V0SW5uZXJBY3Rpb246ZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICBpZiAodGhpcy5faW5uZXJBY3Rpb24gIT09IGFjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5faW5uZXJBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBHZXQgaW5uZXIgQWN0aW9uLlxuICAgICAqIEBtZXRob2QgZ2V0SW5uZXJBY3Rpb25cbiAgICAgKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cbiAgICAgKi9cbiAgICBnZXRJbm5lckFjdGlvbjpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbm5lckFjdGlvbjtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBAbW9kdWxlIGNjXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGVzIHRoZSBzcGVlZCBhY3Rpb24gd2hpY2ggY2hhbmdlcyB0aGUgc3BlZWQgb2YgYW4gYWN0aW9uLCBtYWtpbmcgaXQgdGFrZSBsb25nZXIgKHNwZWVkID4gMSlcbiAqIG9yIGxlc3MgKHNwZWVkIDwgMSkgdGltZS4gPGJyLz5cbiAqIFVzZWZ1bCB0byBzaW11bGF0ZSAnc2xvdyBtb3Rpb24nIG9yICdmYXN0IGZvcndhcmQnIGVmZmVjdC5cbiAqICEjemgg5L+u5pS555uu5qCH5Yqo5L2c55qE6YCf546H44CCXG4gKiBAd2FybmluZyBUaGlzIGFjdGlvbiBjYW4ndCBiZSBTZXF1ZW5jZWFibGUgYmVjYXVzZSBpdCBpcyBub3QgYW4gY2MuSW50ZXJ2YWxBY3Rpb25cbiAqXG4gKiBAbWV0aG9kIHNwZWVkXG4gKiBAcGFyYW0ge0FjdGlvbkludGVydmFsfSBhY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBzcGVlZFxuICogQHJldHVybiB7QWN0aW9ufVxuICogQGV4YW1wbGVcbiAqIC8vIGNoYW5nZSB0aGUgdGFyZ2V0IGFjdGlvbiBzcGVlZDtcbiAqIHZhciBhY3Rpb24gPSBjYy5zY2FsZVRvKDAuMiwgMSwgMC42KTtcbiAqIHZhciBuZXdBY3Rpb24gPSBjYy5zcGVlZChhY3Rpb24sIDAuNSk7XG4gKi9cbmNjLnNwZWVkID0gZnVuY3Rpb24gKGFjdGlvbiwgc3BlZWQpIHtcbiAgICByZXR1cm4gbmV3IGNjLlNwZWVkKGFjdGlvbiwgc3BlZWQpO1xufTtcblxuLypcbiAqIGNjLkZvbGxvdyBpcyBhIGZvbGxvdyBhY3Rpb24gd2hpY2ggbWFrZXMgaXRzIHRhcmdldCBmb2xsb3dzIGFub3RoZXIgbm9kZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy9leGFtcGxlXG4gKiAvL0luc3RlYWQgb2YgdXNpbmcgY2MuQ2FtZXJhIGFzIGEgXCJmb2xsb3dlclwiLCB1c2UgdGhpcyBhY3Rpb24gaW5zdGVhZC5cbiAqIGxheWVyLnJ1bkFjdGlvbihjYy5mb2xsb3coaGVybykpO1xuICpcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSAgbGVmdEJvdW5kYXJ5IC0gd29ybGQgbGVmdEJvdW5kYXJ5LlxuICogQHByb3BlcnR5IHtOdW1iZXJ9ICByaWdodEJvdW5kYXJ5IC0gd29ybGQgcmlnaHRCb3VuZGFyeS5cbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSAgdG9wQm91bmRhcnkgLSB3b3JsZCB0b3BCb3VuZGFyeS5cbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSAgYm90dG9tQm91bmRhcnkgLSB3b3JsZCBib3R0b21Cb3VuZGFyeS5cbiAqXG4gKiBAcGFyYW0ge2NjLk5vZGV9IGZvbGxvd2VkTm9kZVxuICogQHBhcmFtIHtSZWN0fSByZWN0XG4gKiBAZXhhbXBsZVxuICogLy8gY3JlYXRlcyB0aGUgYWN0aW9uIHdpdGggYSBzZXQgYm91bmRhcnlcbiAqIHZhciBmb2xsb3dBY3Rpb24gPSBuZXcgY2MuRm9sbG93KG5vZGUsIGNjLnJlY3QoMCwgMCwgcy53aWR0aCAqIDIgLSAxMDAsIHMuaGVpZ2h0KSk7XG4gKiB0aGlzLnJ1bkFjdGlvbihmb2xsb3dBY3Rpb24pO1xuICpcbiAqIC8vIGNyZWF0ZXMgdGhlIGFjdGlvbiB3aXRoIG5vIGJvdW5kYXJ5IHNldFxuICogdmFyIGZvbGxvd0FjdGlvbiA9IG5ldyBjYy5Gb2xsb3cobm9kZSk7XG4gKiB0aGlzLnJ1bkFjdGlvbihmb2xsb3dBY3Rpb24pO1xuICpcbiAqIEBjbGFzc1xuICogQGV4dGVuZHMgQWN0aW9uXG4gKi9cbmNjLkZvbGxvdyA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuRm9sbG93JyxcbiAgICBleHRlbmRzOiBjYy5BY3Rpb24sXG5cblx0LypcbiAgICAgKiBDb25zdHJ1Y3RvciBmdW5jdGlvbiwgb3ZlcnJpZGUgaXQgdG8gZXh0ZW5kIHRoZSBjb25zdHJ1Y3Rpb24gYmVoYXZpb3IsIHJlbWVtYmVyIHRvIGNhbGwgXCJ0aGlzLl9zdXBlcigpXCIgaW4gdGhlIGV4dGVuZGVkIFwiY3RvclwiIGZ1bmN0aW9uLiA8YnIgLz5cblx0ICogY3JlYXRlcyB0aGUgYWN0aW9uIHdpdGggYSBzZXQgYm91bmRhcnkuIDxici8+XG5cdCAqIGNyZWF0ZXMgdGhlIGFjdGlvbiB3aXRoIG5vIGJvdW5kYXJ5IHNldC5cbiAgICAgKiBAcGFyYW0ge2NjLk5vZGV9IGZvbGxvd2VkTm9kZVxuICAgICAqIEBwYXJhbSB7UmVjdH0gcmVjdFxuXHQgKi9cbiAgICBjdG9yOmZ1bmN0aW9uIChmb2xsb3dlZE5vZGUsIHJlY3QpIHtcbiAgICAgICAgLy8gbm9kZSB0byBmb2xsb3dcbiAgICAgICAgdGhpcy5fZm9sbG93ZWROb2RlID0gbnVsbDtcbiAgICAgICAgLy8gd2hldGhlciBjYW1lcmEgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gY2VydGFpbiBhcmVhXG4gICAgICAgIHRoaXMuX2JvdW5kYXJ5U2V0ID0gZmFsc2U7XG4gICAgICAgIC8vIGlmIHNjcmVlbiBzaXplIGlzIGJpZ2dlciB0aGFuIHRoZSBib3VuZGFyeSAtIHVwZGF0ZSBub3QgbmVlZGVkXG4gICAgICAgIHRoaXMuX2JvdW5kYXJ5RnVsbHlDb3ZlcmVkID0gZmFsc2U7XG4gICAgICAgIC8vIGZhc3QgYWNjZXNzIHRvIHRoZSBzY3JlZW4gZGltZW5zaW9uc1xuICAgICAgICB0aGlzLl9oYWxmU2NyZWVuU2l6ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2Z1bGxTY3JlZW5TaXplID0gbnVsbDtcblxuICAgICAgICB0aGlzLmxlZnRCb3VuZGFyeSA9IDAuMDtcbiAgICAgICAgdGhpcy5yaWdodEJvdW5kYXJ5ID0gMC4wO1xuICAgICAgICB0aGlzLnRvcEJvdW5kYXJ5ID0gMC4wO1xuICAgICAgICB0aGlzLmJvdHRvbUJvdW5kYXJ5ID0gMC4wO1xuICAgICAgICB0aGlzLl93b3JsZFJlY3QgPSBjYy5yZWN0KDAsIDAsIDAsIDApO1xuXG5cdFx0aWYoZm9sbG93ZWROb2RlKVxuXHRcdFx0cmVjdCA/IHRoaXMuaW5pdFdpdGhUYXJnZXQoZm9sbG93ZWROb2RlLCByZWN0KVxuXHRcdFx0XHQgOiB0aGlzLmluaXRXaXRoVGFyZ2V0KGZvbGxvd2VkTm9kZSk7XG4gICAgfSxcblxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5Gb2xsb3coKTtcbiAgICAgICAgdmFyIGxvY1JlY3QgPSB0aGlzLl93b3JsZFJlY3Q7XG4gICAgICAgIHZhciByZWN0ID0gbmV3IGNjLlJlY3QobG9jUmVjdC54LCBsb2NSZWN0LnksIGxvY1JlY3Qud2lkdGgsIGxvY1JlY3QuaGVpZ2h0KTtcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoVGFyZ2V0KHRoaXMuX2ZvbGxvd2VkTm9kZSwgcmVjdCk7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogR2V0IHdoZXRoZXIgY2FtZXJhIHNob3VsZCBiZSBsaW1pdGVkIHRvIGNlcnRhaW4gYXJlYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNCb3VuZGFyeVNldDpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib3VuZGFyeVNldDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBhbHRlciBiZWhhdmlvciAtIHR1cm4gb24vb2ZmIGJvdW5kYXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqL1xuICAgIHNldEJvdWRhcnlTZXQ6ZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2JvdW5kYXJ5U2V0ID0gdmFsdWU7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogaW5pdGlhbGl6ZXMgdGhlIGFjdGlvbiB3aXRoIGEgc2V0IGJvdW5kYXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtjYy5Ob2RlfSBmb2xsb3dlZE5vZGVcbiAgICAgKiBAcGFyYW0ge1JlY3R9IFtyZWN0PV1cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGluaXRXaXRoVGFyZ2V0OmZ1bmN0aW9uIChmb2xsb3dlZE5vZGUsIHJlY3QpIHtcbiAgICAgICAgaWYgKCFmb2xsb3dlZE5vZGUpIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMTAyMik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZWN0ID0gcmVjdCB8fCBjYy5yZWN0KDAsIDAsIDAsIDApO1xuICAgICAgICBfdGhpcy5fZm9sbG93ZWROb2RlID0gZm9sbG93ZWROb2RlO1xuICAgICAgICBfdGhpcy5fd29ybGRSZWN0ID0gcmVjdDtcblxuICAgICAgICBfdGhpcy5fYm91bmRhcnlTZXQgPSAhKHJlY3Qud2lkdGggPT09IDAgJiYgcmVjdC5oZWlnaHQgPT09IDApO1xuXG4gICAgICAgIF90aGlzLl9ib3VuZGFyeUZ1bGx5Q292ZXJlZCA9IGZhbHNlO1xuXG4gICAgICAgIHZhciB3aW5TaXplID0gY2Mud2luU2l6ZTtcbiAgICAgICAgX3RoaXMuX2Z1bGxTY3JlZW5TaXplID0gY2MudjIod2luU2l6ZS53aWR0aCwgd2luU2l6ZS5oZWlnaHQpO1xuICAgICAgICBfdGhpcy5faGFsZlNjcmVlblNpemUgPSBfdGhpcy5fZnVsbFNjcmVlblNpemUubXVsKDAuNSk7XG5cbiAgICAgICAgaWYgKF90aGlzLl9ib3VuZGFyeVNldCkge1xuICAgICAgICAgICAgX3RoaXMubGVmdEJvdW5kYXJ5ID0gLSgocmVjdC54ICsgcmVjdC53aWR0aCkgLSBfdGhpcy5fZnVsbFNjcmVlblNpemUueCk7XG4gICAgICAgICAgICBfdGhpcy5yaWdodEJvdW5kYXJ5ID0gLXJlY3QueDtcbiAgICAgICAgICAgIF90aGlzLnRvcEJvdW5kYXJ5ID0gLXJlY3QueTtcbiAgICAgICAgICAgIF90aGlzLmJvdHRvbUJvdW5kYXJ5ID0gLSgocmVjdC55ICsgcmVjdC5oZWlnaHQpIC0gX3RoaXMuX2Z1bGxTY3JlZW5TaXplLnkpO1xuXG4gICAgICAgICAgICBpZiAoX3RoaXMucmlnaHRCb3VuZGFyeSA8IF90aGlzLmxlZnRCb3VuZGFyeSkge1xuICAgICAgICAgICAgICAgIC8vIHNjcmVlbiB3aWR0aCBpcyBsYXJnZXIgdGhhbiB3b3JsZCdzIGJvdW5kYXJ5IHdpZHRoXG4gICAgICAgICAgICAgICAgLy9zZXQgYm90aCBpbiB0aGUgbWlkZGxlIG9mIHRoZSB3b3JsZFxuICAgICAgICAgICAgICAgIF90aGlzLnJpZ2h0Qm91bmRhcnkgPSBfdGhpcy5sZWZ0Qm91bmRhcnkgPSAoX3RoaXMubGVmdEJvdW5kYXJ5ICsgX3RoaXMucmlnaHRCb3VuZGFyeSkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF90aGlzLnRvcEJvdW5kYXJ5IDwgX3RoaXMuYm90dG9tQm91bmRhcnkpIHtcbiAgICAgICAgICAgICAgICAvLyBzY3JlZW4gd2lkdGggaXMgbGFyZ2VyIHRoYW4gd29ybGQncyBib3VuZGFyeSB3aWR0aFxuICAgICAgICAgICAgICAgIC8vc2V0IGJvdGggaW4gdGhlIG1pZGRsZSBvZiB0aGUgd29ybGRcbiAgICAgICAgICAgICAgICBfdGhpcy50b3BCb3VuZGFyeSA9IF90aGlzLmJvdHRvbUJvdW5kYXJ5ID0gKF90aGlzLnRvcEJvdW5kYXJ5ICsgX3RoaXMuYm90dG9tQm91bmRhcnkpIC8gMjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKChfdGhpcy50b3BCb3VuZGFyeSA9PT0gX3RoaXMuYm90dG9tQm91bmRhcnkpICYmIChfdGhpcy5sZWZ0Qm91bmRhcnkgPT09IF90aGlzLnJpZ2h0Qm91bmRhcnkpKVxuICAgICAgICAgICAgICAgIF90aGlzLl9ib3VuZGFyeUZ1bGx5Q292ZXJlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIHN0ZXA6ZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIHZhciB0YXJnZXRXb3JsZFBvcyA9IHRoaXMudGFyZ2V0LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyLlpFUk8pO1xuICAgICAgICB2YXIgZm9sbG93ZWRXb3JsZFBvcyA9IHRoaXMuX2ZvbGxvd2VkTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMi5aRVJPKTtcbiAgICAgICAgLy8gY29tcHV0ZSB0aGUgb2Zmc2V0IGJldHdlZW4gZm9sbG93ZWQgYW5kIHRhcmdldCBub2RlXG4gICAgICAgIHZhciBkZWx0YSA9IHRhcmdldFdvcmxkUG9zLnN1Yihmb2xsb3dlZFdvcmxkUG9zKTtcbiAgICAgICAgdmFyIHRlbXBQb3MgPSB0aGlzLnRhcmdldC5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIoZGVsdGEuYWRkKHRoaXMuX2hhbGZTY3JlZW5TaXplKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvdW5kYXJ5U2V0KSB7XG4gICAgICAgICAgICAvLyB3aG9sZSBtYXAgZml0cyBpbnNpZGUgYSBzaW5nbGUgc2NyZWVuLCBubyBuZWVkIHRvIG1vZGlmeSB0aGUgcG9zaXRpb24gLSB1bmxlc3MgbWFwIGJvdW5kYXJpZXMgYXJlIGluY3JlYXNlZFxuICAgICAgICAgICAgaWYgKHRoaXMuX2JvdW5kYXJ5RnVsbHlDb3ZlcmVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuXHQgICAgICAgIHRoaXMudGFyZ2V0LnNldFBvc2l0aW9uKG1pc2MuY2xhbXBmKHRlbXBQb3MueCwgdGhpcy5sZWZ0Qm91bmRhcnksIHRoaXMucmlnaHRCb3VuZGFyeSksIG1pc2MuY2xhbXBmKHRlbXBQb3MueSwgdGhpcy5ib3R0b21Cb3VuZGFyeSwgdGhpcy50b3BCb3VuZGFyeSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50YXJnZXQuc2V0UG9zaXRpb24odGVtcFBvcy54LCB0ZW1wUG9zLnkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGlzRG9uZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoICF0aGlzLl9mb2xsb3dlZE5vZGUuYWN0aXZlSW5IaWVyYXJjaHkgKTtcbiAgICB9LFxuXG4gICAgc3RvcDpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgY2MuQWN0aW9uLnByb3RvdHlwZS5zdG9wLmNhbGwodGhpcyk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogISNlbiBDcmVhdGUgYSBmb2xsb3cgYWN0aW9uIHdoaWNoIG1ha2VzIGl0cyB0YXJnZXQgZm9sbG93cyBhbm90aGVyIG5vZGUuXG4gKiAhI3poIOi/vei4quebruagh+iKgueCueeahOS9jee9ruOAglxuICogQG1ldGhvZCBmb2xsb3dcbiAqIEBwYXJhbSB7Tm9kZX0gZm9sbG93ZWROb2RlXG4gKiBAcGFyYW0ge1JlY3R9IHJlY3RcbiAqIEByZXR1cm4ge0FjdGlvbnxOdWxsfSByZXR1cm5zIHRoZSBjYy5Gb2xsb3cgb2JqZWN0IG9uIHN1Y2Nlc3NcbiAqIEBleGFtcGxlXG4gKiAvLyBleGFtcGxlXG4gKiAvLyBjcmVhdGVzIHRoZSBhY3Rpb24gd2l0aCBhIHNldCBib3VuZGFyeVxuICogdmFyIGZvbGxvd0FjdGlvbiA9IGNjLmZvbGxvdyh0YXJnZXROb2RlLCBjYy5yZWN0KDAsIDAsIHNjcmVlbldpZHRoICogMiAtIDEwMCwgc2NyZWVuSGVpZ2h0KSk7XG4gKiBub2RlLnJ1bkFjdGlvbihmb2xsb3dBY3Rpb24pO1xuICpcbiAqIC8vIGNyZWF0ZXMgdGhlIGFjdGlvbiB3aXRoIG5vIGJvdW5kYXJ5IHNldFxuICogdmFyIGZvbGxvd0FjdGlvbiA9IGNjLmZvbGxvdyh0YXJnZXROb2RlKTtcbiAqIG5vZGUucnVuQWN0aW9uKGZvbGxvd0FjdGlvbik7XG4gKi9cbmNjLmZvbGxvdyA9IGZ1bmN0aW9uIChmb2xsb3dlZE5vZGUsIHJlY3QpIHtcbiAgICByZXR1cm4gbmV3IGNjLkZvbGxvdyhmb2xsb3dlZE5vZGUsIHJlY3QpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9