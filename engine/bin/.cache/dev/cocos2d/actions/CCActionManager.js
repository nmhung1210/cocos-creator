
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/actions/CCActionManager.js';
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

var js = require('../core/platform/js');
/*
 * @class HashElement
 * @constructor
 * @private
 */


var HashElement = function HashElement() {
  this.actions = [];
  this.target = null; //ccobject

  this.actionIndex = 0;
  this.currentAction = null; //CCAction

  this.paused = false;
  this.lock = false;
};
/**
 * !#en
 * cc.ActionManager is a class that can manage actions.<br/>
 * Normally you won't need to use this class directly. 99% of the cases you will use the CCNode interface,
 * which uses this class's singleton object.
 * But there are some cases where you might need to use this class. <br/>
 * Examples:<br/>
 * - When you want to run an action where the target is different from a CCNode.<br/>
 * - When you want to pause / resume the actions<br/>
 * !#zh
 * cc.ActionManager 是可以管理动作的单例类。<br/>
 * 通常你并不需要直接使用这个类，99%的情况您将使用 CCNode 的接口。<br/>
 * 但也有一些情况下，您可能需要使用这个类。 <br/>
 * 例如：
 *  - 当你想要运行一个动作，但目标不是 CCNode 类型时。 <br/>
 *  - 当你想要暂停/恢复动作时。 <br/>
 * @class ActionManager
 * @example {@link cocos2d/core/CCActionManager/ActionManager.js}
 */


cc.ActionManager = function () {
  this._hashTargets = js.createMap(true);
  this._arrayTargets = [];
  this._currentTarget = null;
  cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
};

cc.ActionManager.prototype = {
  constructor: cc.ActionManager,
  _elementPool: [],
  _searchElementByTarget: function _searchElementByTarget(arr, target) {
    for (var k = 0; k < arr.length; k++) {
      if (target === arr[k].target) return arr[k];
    }

    return null;
  },
  _getElement: function _getElement(target, paused) {
    var element = this._elementPool.pop();

    if (!element) {
      element = new HashElement();
    }

    element.target = target;
    element.paused = !!paused;
    return element;
  },
  _putElement: function _putElement(element) {
    element.actions.length = 0;
    element.actionIndex = 0;
    element.currentAction = null;
    element.paused = false;
    element.target = null;
    element.lock = false;

    this._elementPool.push(element);
  },

  /**
   * !#en
   * Adds an action with a target.<br/>
   * If the target is already present, then the action will be added to the existing target.
   * If the target is not present, a new instance of this target will be created either paused or not, and the action will be added to the newly created target.
   * When the target is paused, the queued actions won't be 'ticked'.
   * !#zh
   * 增加一个动作，同时还需要提供动作的目标对象，目标对象是否暂停作为参数。<br/>
   * 如果目标已存在，动作将会被直接添加到现有的节点中。<br/>
   * 如果目标不存在，将为这一目标创建一个新的实例，并将动作添加进去。<br/>
   * 当目标状态的 paused 为 true，动作将不会被执行
   *
   * @method addAction
   * @param {Action} action
   * @param {Node} target
   * @param {Boolean} paused
   */
  addAction: function addAction(action, target, paused) {
    if (!action || !target) {
      cc.errorID(1000);
      return;
    } //check if the action target already exists


    var element = this._hashTargets[target._id]; //if doesn't exists, create a hashelement and push in mpTargets

    if (!element) {
      element = this._getElement(target, paused);
      this._hashTargets[target._id] = element;

      this._arrayTargets.push(element);
    } else if (!element.actions) {
      element.actions = [];
    }

    element.actions.push(action);
    action.startWithTarget(target);
  },

  /**
   * !#en Removes all actions from all the targets.
   * !#zh 移除所有对象的所有动作。
   * @method removeAllActions
   */
  removeAllActions: function removeAllActions() {
    var locTargets = this._arrayTargets;

    for (var i = 0; i < locTargets.length; i++) {
      var element = locTargets[i];
      if (element) this._putElement(element);
    }

    this._arrayTargets.length = 0;
    this._hashTargets = js.createMap(true);
  },

  /**
   * !#en
   * Removes all actions from a certain target. <br/>
   * All the actions that belongs to the target will be removed.
   * !#zh
   * 移除指定对象上的所有动作。<br/>
   * 属于该目标的所有的动作将被删除。
   * @method removeAllActionsFromTarget
   * @param {Node} target
   * @param {Boolean} forceDelete
   */
  removeAllActionsFromTarget: function removeAllActionsFromTarget(target, forceDelete) {
    // explicit null handling
    if (target == null) return;
    var element = this._hashTargets[target._id];

    if (element) {
      element.actions.length = 0;

      this._deleteHashElement(element);
    }
  },

  /**
   * !#en Removes an action given an action reference.
   * !#zh 移除指定的动作。
   * @method removeAction 
   * @param {Action} action
   */
  removeAction: function removeAction(action) {
    // explicit null handling
    if (!action) {
      return;
    }

    var target = action.getOriginalTarget();
    var element = this._hashTargets[target._id];

    if (!element) {
      return;
    }

    for (var i = 0; i < element.actions.length; i++) {
      if (element.actions[i] === action) {
        element.actions.splice(i, 1); // update actionIndex in case we are in tick. looping over the actions

        if (element.actionIndex >= i) element.actionIndex--;
        break;
      }
    }
  },
  _removeActionByTag: function _removeActionByTag(tag, element, target) {
    for (var i = 0, l = element.actions.length; i < l; ++i) {
      var action = element.actions[i];

      if (action && action.getTag() === tag) {
        if (target && action.getOriginalTarget() !== target) {
          continue;
        }

        this._removeActionAtIndex(i, element);

        break;
      }
    }
  },

  /**
   * !#en Removes an action given its tag and the target.
   * !#zh 删除指定对象下特定标签的一个动作，将删除首个匹配到的动作。
   * @method removeActionByTag
   * @param {Number} tag
   * @param {Node} [target]
   */
  removeActionByTag: function removeActionByTag(tag, target) {
    if (tag === cc.Action.TAG_INVALID) cc.logID(1002);
    var hashTargets = this._hashTargets;

    if (target) {
      var element = hashTargets[target._id];

      if (element) {
        this._removeActionByTag(tag, element, target);
      }
    } else {
      for (var name in hashTargets) {
        var _element = hashTargets[name];

        this._removeActionByTag(tag, _element);
      }
    }
  },

  /**
   * !#en Gets an action given its tag an a target.
   * !#zh 通过目标对象和标签获取一个动作。
   * @method getActionByTag
   * @param {Number} tag
   * @param {Node} target
   * @return {Action|Null}  return the Action with the given tag on success
   */
  getActionByTag: function getActionByTag(tag, target) {
    if (tag === cc.Action.TAG_INVALID) cc.logID(1004);
    var element = this._hashTargets[target._id];

    if (element) {
      if (element.actions != null) {
        for (var i = 0; i < element.actions.length; ++i) {
          var action = element.actions[i];
          if (action && action.getTag() === tag) return action;
        }
      }

      cc.logID(1005, tag);
    }

    return null;
  },

  /**
   * !#en
   * Returns the numbers of actions that are running in a certain target. <br/>
   * Composable actions are counted as 1 action. <br/>
   * Example: <br/>
   * - If you are running 1 Sequence of 7 actions, it will return 1. <br/>
   * - If you are running 7 Sequences of 2 actions, it will return 7.
   * !#zh
   * 返回指定对象下所有正在运行的动作数量。 <br/>
   * 组合动作被算作一个动作。<br/>
   * 例如：<br/>
   *  - 如果您正在运行 7 个动作组成的序列动作（Sequence），这个函数将返回 1。<br/>
   *  - 如果你正在运行 2 个序列动作（Sequence）和 5 个普通动作，这个函数将返回 7。<br/>
   *
   * @method getNumberOfRunningActionsInTarget
   * @param {Node} target
   * @return {Number}
   */
  getNumberOfRunningActionsInTarget: function getNumberOfRunningActionsInTarget(target) {
    var element = this._hashTargets[target._id];
    if (element) return element.actions ? element.actions.length : 0;
    return 0;
  },

  /**
   * !#en Pauses the target: all running actions and newly added actions will be paused.
   * !#zh 暂停指定对象：所有正在运行的动作和新添加的动作都将会暂停。
   * @method pauseTarget
   * @param {Node} target
   */
  pauseTarget: function pauseTarget(target) {
    var element = this._hashTargets[target._id];
    if (element) element.paused = true;
  },

  /**
   * !#en Resumes the target. All queued actions will be resumed.
   * !#zh 让指定目标恢复运行。在执行序列中所有被暂停的动作将重新恢复运行。
   * @method resumeTarget
   * @param {Node} target
   */
  resumeTarget: function resumeTarget(target) {
    var element = this._hashTargets[target._id];
    if (element) element.paused = false;
  },

  /**
   * !#en Pauses all running actions, returning a list of targets whose actions were paused.
   * !#zh 暂停所有正在运行的动作，返回一个包含了那些动作被暂停了的目标对象的列表。
   * @method pauseAllRunningActions
   * @return {Array}  a list of targets whose actions were paused.
   */
  pauseAllRunningActions: function pauseAllRunningActions() {
    var idsWithActions = [];
    var locTargets = this._arrayTargets;

    for (var i = 0; i < locTargets.length; i++) {
      var element = locTargets[i];

      if (element && !element.paused) {
        element.paused = true;
        idsWithActions.push(element.target);
      }
    }

    return idsWithActions;
  },

  /**
   * !#en Resume a set of targets (convenience function to reverse a pauseAllRunningActions or pauseTargets call).
   * !#zh 让一组指定对象恢复运行（用来逆转 pauseAllRunningActions 效果的便捷函数）。
   * @method resumeTargets
   * @param {Array} targetsToResume
   */
  resumeTargets: function resumeTargets(targetsToResume) {
    if (!targetsToResume) return;

    for (var i = 0; i < targetsToResume.length; i++) {
      if (targetsToResume[i]) this.resumeTarget(targetsToResume[i]);
    }
  },

  /**
   * !#en Pause a set of targets.
   * !#zh 暂停一组指定对象。
   * @method pauseTargets
   * @param {Array} targetsToPause
   */
  pauseTargets: function pauseTargets(targetsToPause) {
    if (!targetsToPause) return;

    for (var i = 0; i < targetsToPause.length; i++) {
      if (targetsToPause[i]) this.pauseTarget(targetsToPause[i]);
    }
  },

  /**
   * !#en
   * purges the shared action manager. It releases the retained instance. <br/>
   * because it uses this, so it can not be static.
   * !#zh
   * 清除共用的动作管理器。它释放了持有的实例。 <br/>
   * 因为它使用 this，因此它不能是静态的。
   * @method purgeSharedManager
   */
  purgeSharedManager: function purgeSharedManager() {
    cc.director.getScheduler().unscheduleUpdate(this);
  },
  //protected
  _removeActionAtIndex: function _removeActionAtIndex(index, element) {
    var action = element.actions[index];
    element.actions.splice(index, 1); // update actionIndex in case we are in tick. looping over the actions

    if (element.actionIndex >= index) element.actionIndex--;

    if (element.actions.length === 0) {
      this._deleteHashElement(element);
    }
  },
  _deleteHashElement: function _deleteHashElement(element) {
    var ret = false;

    if (element && !element.lock) {
      if (this._hashTargets[element.target._id]) {
        delete this._hashTargets[element.target._id];
        var targets = this._arrayTargets;

        for (var i = 0, l = targets.length; i < l; i++) {
          if (targets[i] === element) {
            targets.splice(i, 1);
            break;
          }
        }

        this._putElement(element);

        ret = true;
      }
    }

    return ret;
  },

  /**
   * !#en The ActionManager update。
   * !#zh ActionManager 主循环。
   * @method update
   * @param {Number} dt delta time in seconds
   */
  update: function update(dt) {
    var locTargets = this._arrayTargets,
        locCurrTarget;

    for (var elt = 0; elt < locTargets.length; elt++) {
      this._currentTarget = locTargets[elt];
      locCurrTarget = this._currentTarget;

      if (!locCurrTarget.paused && locCurrTarget.actions) {
        locCurrTarget.lock = true; // The 'actions' CCMutableArray may change while inside this loop.

        for (locCurrTarget.actionIndex = 0; locCurrTarget.actionIndex < locCurrTarget.actions.length; locCurrTarget.actionIndex++) {
          locCurrTarget.currentAction = locCurrTarget.actions[locCurrTarget.actionIndex];
          if (!locCurrTarget.currentAction) continue; //use for speed

          locCurrTarget.currentAction.step(dt * (locCurrTarget.currentAction._speedMethod ? locCurrTarget.currentAction._speed : 1));

          if (locCurrTarget.currentAction && locCurrTarget.currentAction.isDone()) {
            locCurrTarget.currentAction.stop();
            var action = locCurrTarget.currentAction; // Make currentAction nil to prevent removeAction from salvaging it.

            locCurrTarget.currentAction = null;
            this.removeAction(action);
          }

          locCurrTarget.currentAction = null;
        }

        locCurrTarget.lock = false;
      } // only delete currentTarget if no actions were scheduled during the cycle (issue #481)


      if (locCurrTarget.actions.length === 0) {
        this._deleteHashElement(locCurrTarget) && elt--;
      }
    }
  }
};

if (CC_TEST) {
  cc.ActionManager.prototype.isTargetPaused_TEST = function (target) {
    var element = this._hashTargets[target._id];
    return element.paused;
  };
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9hY3Rpb25zL0NDQWN0aW9uTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwianMiLCJIYXNoRWxlbWVudCIsImFjdGlvbnMiLCJ0YXJnZXQiLCJhY3Rpb25JbmRleCIsImN1cnJlbnRBY3Rpb24iLCJwYXVzZWQiLCJsb2NrIiwiY2MiLCJBY3Rpb25NYW5hZ2VyIiwiX2hhc2hUYXJnZXRzIiwiY3JlYXRlTWFwIiwiX2FycmF5VGFyZ2V0cyIsIl9jdXJyZW50VGFyZ2V0IiwiZGlyZWN0b3IiLCJfc2NoZWR1bGVyIiwiZW5hYmxlRm9yVGFyZ2V0IiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJfZWxlbWVudFBvb2wiLCJfc2VhcmNoRWxlbWVudEJ5VGFyZ2V0IiwiYXJyIiwiayIsImxlbmd0aCIsIl9nZXRFbGVtZW50IiwiZWxlbWVudCIsInBvcCIsIl9wdXRFbGVtZW50IiwicHVzaCIsImFkZEFjdGlvbiIsImFjdGlvbiIsImVycm9ySUQiLCJfaWQiLCJzdGFydFdpdGhUYXJnZXQiLCJyZW1vdmVBbGxBY3Rpb25zIiwibG9jVGFyZ2V0cyIsImkiLCJyZW1vdmVBbGxBY3Rpb25zRnJvbVRhcmdldCIsImZvcmNlRGVsZXRlIiwiX2RlbGV0ZUhhc2hFbGVtZW50IiwicmVtb3ZlQWN0aW9uIiwiZ2V0T3JpZ2luYWxUYXJnZXQiLCJzcGxpY2UiLCJfcmVtb3ZlQWN0aW9uQnlUYWciLCJ0YWciLCJsIiwiZ2V0VGFnIiwiX3JlbW92ZUFjdGlvbkF0SW5kZXgiLCJyZW1vdmVBY3Rpb25CeVRhZyIsIkFjdGlvbiIsIlRBR19JTlZBTElEIiwibG9nSUQiLCJoYXNoVGFyZ2V0cyIsIm5hbWUiLCJnZXRBY3Rpb25CeVRhZyIsImdldE51bWJlck9mUnVubmluZ0FjdGlvbnNJblRhcmdldCIsInBhdXNlVGFyZ2V0IiwicmVzdW1lVGFyZ2V0IiwicGF1c2VBbGxSdW5uaW5nQWN0aW9ucyIsImlkc1dpdGhBY3Rpb25zIiwicmVzdW1lVGFyZ2V0cyIsInRhcmdldHNUb1Jlc3VtZSIsInBhdXNlVGFyZ2V0cyIsInRhcmdldHNUb1BhdXNlIiwicHVyZ2VTaGFyZWRNYW5hZ2VyIiwiZ2V0U2NoZWR1bGVyIiwidW5zY2hlZHVsZVVwZGF0ZSIsImluZGV4IiwicmV0IiwidGFyZ2V0cyIsInVwZGF0ZSIsImR0IiwibG9jQ3VyclRhcmdldCIsImVsdCIsInN0ZXAiLCJfc3BlZWRNZXRob2QiLCJfc3BlZWQiLCJpc0RvbmUiLCJzdG9wIiwiQ0NfVEVTVCIsImlzVGFyZ2V0UGF1c2VkX1RFU1QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkFBLE9BQU8sQ0FBQywwQkFBRCxDQUFQOztBQUNBLElBQUlDLEVBQUUsR0FBR0QsT0FBTyxDQUFDLHFCQUFELENBQWhCO0FBRUE7Ozs7Ozs7QUFLQSxJQUFJRSxXQUFXLEdBQUcsU0FBZEEsV0FBYyxHQUFZO0FBQzFCLE9BQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EsT0FBS0MsTUFBTCxHQUFjLElBQWQsQ0FGMEIsQ0FFTjs7QUFDcEIsT0FBS0MsV0FBTCxHQUFtQixDQUFuQjtBQUNBLE9BQUtDLGFBQUwsR0FBcUIsSUFBckIsQ0FKMEIsQ0FJQzs7QUFDM0IsT0FBS0MsTUFBTCxHQUFjLEtBQWQ7QUFDQSxPQUFLQyxJQUFMLEdBQVksS0FBWjtBQUNILENBUEQ7QUFTQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBQyxFQUFFLENBQUNDLGFBQUgsR0FBbUIsWUFBWTtBQUMzQixPQUFLQyxZQUFMLEdBQW9CVixFQUFFLENBQUNXLFNBQUgsQ0FBYSxJQUFiLENBQXBCO0FBQ0EsT0FBS0MsYUFBTCxHQUFxQixFQUFyQjtBQUNBLE9BQUtDLGNBQUwsR0FBc0IsSUFBdEI7QUFDQUwsRUFBQUEsRUFBRSxDQUFDTSxRQUFILENBQVlDLFVBQVosSUFBMEJQLEVBQUUsQ0FBQ00sUUFBSCxDQUFZQyxVQUFaLENBQXVCQyxlQUF2QixDQUF1QyxJQUF2QyxDQUEx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QUFhLENBQUNuRSxhQUFkLENBQTRCc0UsWUFBNUIsR0FBMkNILGFBQWEsQ0FBQ25FLGFBQWQsQ0FBNEJ1RSxNQUF2RSxHQUFnRixDQUFyRixDQUFuQzs7QUFFQSxjQUFJSixhQUFhLENBQUNuRSxhQUFkLElBQStCbUUsYUFBYSxDQUFDbkUsYUFBZCxDQUE0QndFLE1BQTVCLEVBQW5DLEVBQXlFO0FBQ3JFTCxZQUFBQSxhQUFhLENBQUNuRSxhQUFkLENBQTRCeUUsSUFBNUI7QUFDQSxnQkFBSWhELE1BQU0sR0FBRzBDLGFBQWEsQ0FBQ25FLGFBQTNCLENBRnFFLENBR3JFOztBQUNBbUUsWUFBQUEsYUFBYSxDQUFDbkUsYUFBZCxHQUE4QixJQUE5QjtBQUNBLGlCQUFLbUMsWUFBTCxDQUFrQlYsTUFBbEI7QUFDSDs7QUFFRDBDLFVBQUFBLGFBQWEsQ0FBQ25FLGFBQWQsR0FBOEIsSUFBOUI7QUFDSDs7QUFDRG1FLFFBQUFBLGFBQWEsQ0FBQ2pFLElBQWQsR0FBcUIsS0FBckI7QUFDSCxPQXpCNkMsQ0EwQjlDOzs7QUFDQSxVQUFJaUUsYUFBYSxDQUFDdEUsT0FBZCxDQUFzQnFCLE1BQXRCLEtBQWlDLENBQXJDLEVBQXdDO0FBQ3BDLGFBQUtnQixrQkFBTCxDQUF3QmlDLGFBQXhCLEtBQTBDQyxHQUFHLEVBQTdDO0FBQ0g7QUFDSjtBQUNKO0FBbll3QixDQUE3Qjs7QUFzWUEsSUFBSU0sT0FBSixFQUFhO0FBQ1R2RSxFQUFBQSxFQUFFLENBQUNDLGFBQUgsQ0FBaUJRLFNBQWpCLENBQTJCK0QsbUJBQTNCLEdBQWlELFVBQVU3RSxNQUFWLEVBQWtCO0FBQy9ELFFBQUlzQixPQUFPLEdBQUcsS0FBS2YsWUFBTCxDQUFrQlAsTUFBTSxDQUFDNkIsR0FBekIsQ0FBZDtBQUNBLFdBQU9QLE9BQU8sQ0FBQ25CLE1BQWY7QUFDSCxHQUhEO0FBSUgiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAwOC0yMDEwIFJpY2FyZG8gUXVlc2FkYVxuIENvcHlyaWdodCAoYykgMjAxMS0yMDEyIGNvY29zMmQteC5vcmdcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnJlcXVpcmUoJy4uL2NvcmUvcGxhdGZvcm0vQ0NDbGFzcycpO1xudmFyIGpzID0gcmVxdWlyZSgnLi4vY29yZS9wbGF0Zm9ybS9qcycpO1xuXG4vKlxuICogQGNsYXNzIEhhc2hFbGVtZW50XG4gKiBAY29uc3RydWN0b3JcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBIYXNoRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmFjdGlvbnMgPSBbXTtcbiAgICB0aGlzLnRhcmdldCA9IG51bGw7IC8vY2NvYmplY3RcbiAgICB0aGlzLmFjdGlvbkluZGV4ID0gMDtcbiAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBudWxsOyAvL0NDQWN0aW9uXG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmxvY2sgPSBmYWxzZTtcbn07XG5cbi8qKlxuICogISNlblxuICogY2MuQWN0aW9uTWFuYWdlciBpcyBhIGNsYXNzIHRoYXQgY2FuIG1hbmFnZSBhY3Rpb25zLjxici8+XG4gKiBOb3JtYWxseSB5b3Ugd29uJ3QgbmVlZCB0byB1c2UgdGhpcyBjbGFzcyBkaXJlY3RseS4gOTklIG9mIHRoZSBjYXNlcyB5b3Ugd2lsbCB1c2UgdGhlIENDTm9kZSBpbnRlcmZhY2UsXG4gKiB3aGljaCB1c2VzIHRoaXMgY2xhc3MncyBzaW5nbGV0b24gb2JqZWN0LlxuICogQnV0IHRoZXJlIGFyZSBzb21lIGNhc2VzIHdoZXJlIHlvdSBtaWdodCBuZWVkIHRvIHVzZSB0aGlzIGNsYXNzLiA8YnIvPlxuICogRXhhbXBsZXM6PGJyLz5cbiAqIC0gV2hlbiB5b3Ugd2FudCB0byBydW4gYW4gYWN0aW9uIHdoZXJlIHRoZSB0YXJnZXQgaXMgZGlmZmVyZW50IGZyb20gYSBDQ05vZGUuPGJyLz5cbiAqIC0gV2hlbiB5b3Ugd2FudCB0byBwYXVzZSAvIHJlc3VtZSB0aGUgYWN0aW9uczxici8+XG4gKiAhI3poXG4gKiBjYy5BY3Rpb25NYW5hZ2VyIOaYr+WPr+S7peeuoeeQhuWKqOS9nOeahOWNleS+i+exu+OAgjxici8+XG4gKiDpgJrluLjkvaDlubbkuI3pnIDopoHnm7TmjqXkvb/nlKjov5nkuKrnsbvvvIw5OSXnmoTmg4XlhrXmgqjlsIbkvb/nlKggQ0NOb2RlIOeahOaOpeWPo+OAgjxici8+XG4gKiDkvYbkuZ/mnInkuIDkupvmg4XlhrXkuIvvvIzmgqjlj6/og73pnIDopoHkvb/nlKjov5nkuKrnsbvjgIIgPGJyLz5cbiAqIOS+i+Wmgu+8mlxuICogIC0g5b2T5L2g5oOz6KaB6L+Q6KGM5LiA5Liq5Yqo5L2c77yM5L2G55uu5qCH5LiN5pivIENDTm9kZSDnsbvlnovml7bjgIIgPGJyLz5cbiAqICAtIOW9k+S9oOaDs+imgeaaguWBnC/mgaLlpI3liqjkvZzml7bjgIIgPGJyLz5cbiAqIEBjbGFzcyBBY3Rpb25NYW5hZ2VyXG4gKiBAZXhhbXBsZSB7QGxpbmsgY29jb3MyZC9jb3JlL0NDQWN0aW9uTWFuYWdlci9BY3Rpb25NYW5hZ2VyLmpzfVxuICovXG5jYy5BY3Rpb25NYW5hZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2hhc2hUYXJnZXRzID0ganMuY3JlYXRlTWFwKHRydWUpO1xuICAgIHRoaXMuX2FycmF5VGFyZ2V0cyA9IFtdO1xuICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSBudWxsO1xuICAgIGNjLmRpcmVjdG9yLl9zY2hlZHVsZXIgJiYgY2MuZGlyZWN0b3IuX3NjaGVkdWxlci5lbmFibGVGb3JUYXJnZXQodGhpcyk7XG59O1xuY2MuQWN0aW9uTWFuYWdlci5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IGNjLkFjdGlvbk1hbmFnZXIsXG4gICAgX2VsZW1lbnRQb29sOiBbXSxcblxuICAgIF9zZWFyY2hFbGVtZW50QnlUYXJnZXQ6ZnVuY3Rpb24gKGFyciwgdGFyZ2V0KSB7XG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgYXJyLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBhcnJba10udGFyZ2V0KVxuICAgICAgICAgICAgICAgIHJldHVybiBhcnJba107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIF9nZXRFbGVtZW50OiBmdW5jdGlvbiAodGFyZ2V0LCBwYXVzZWQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UG9vbC5wb3AoKTtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gbmV3IEhhc2hFbGVtZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIGVsZW1lbnQucGF1c2VkID0gISFwYXVzZWQ7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0sXG5cbiAgICBfcHV0RWxlbWVudDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5hY3Rpb25zLmxlbmd0aCA9IDA7XG4gICAgICAgIGVsZW1lbnQuYWN0aW9uSW5kZXggPSAwO1xuICAgICAgICBlbGVtZW50LmN1cnJlbnRBY3Rpb24gPSBudWxsO1xuICAgICAgICBlbGVtZW50LnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICBlbGVtZW50LnRhcmdldCA9IG51bGw7XG4gICAgICAgIGVsZW1lbnQubG9jayA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lbGVtZW50UG9vbC5wdXNoKGVsZW1lbnQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWRkcyBhbiBhY3Rpb24gd2l0aCBhIHRhcmdldC48YnIvPlxuICAgICAqIElmIHRoZSB0YXJnZXQgaXMgYWxyZWFkeSBwcmVzZW50LCB0aGVuIHRoZSBhY3Rpb24gd2lsbCBiZSBhZGRlZCB0byB0aGUgZXhpc3RpbmcgdGFyZ2V0LlxuICAgICAqIElmIHRoZSB0YXJnZXQgaXMgbm90IHByZXNlbnQsIGEgbmV3IGluc3RhbmNlIG9mIHRoaXMgdGFyZ2V0IHdpbGwgYmUgY3JlYXRlZCBlaXRoZXIgcGF1c2VkIG9yIG5vdCwgYW5kIHRoZSBhY3Rpb24gd2lsbCBiZSBhZGRlZCB0byB0aGUgbmV3bHkgY3JlYXRlZCB0YXJnZXQuXG4gICAgICogV2hlbiB0aGUgdGFyZ2V0IGlzIHBhdXNlZCwgdGhlIHF1ZXVlZCBhY3Rpb25zIHdvbid0IGJlICd0aWNrZWQnLlxuICAgICAqICEjemhcbiAgICAgKiDlop7liqDkuIDkuKrliqjkvZzvvIzlkIzml7bov5jpnIDopoHmj5DkvpvliqjkvZznmoTnm67moIflr7nosaHvvIznm67moIflr7nosaHmmK/lkKbmmoLlgZzkvZzkuLrlj4LmlbDjgII8YnIvPlxuICAgICAqIOWmguaenOebruagh+W3suWtmOWcqO+8jOWKqOS9nOWwhuS8muiiq+ebtOaOpea3u+WKoOWIsOeOsOacieeahOiKgueCueS4reOAgjxici8+XG4gICAgICog5aaC5p6c55uu5qCH5LiN5a2Y5Zyo77yM5bCG5Li66L+Z5LiA55uu5qCH5Yib5bu65LiA5Liq5paw55qE5a6e5L6L77yM5bm25bCG5Yqo5L2c5re75Yqg6L+b5Y6744CCPGJyLz5cbiAgICAgKiDlvZPnm67moIfnirbmgIHnmoQgcGF1c2VkIOS4uiB0cnVl77yM5Yqo5L2c5bCG5LiN5Lya6KKr5omn6KGMXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGFkZEFjdGlvblxuICAgICAqIEBwYXJhbSB7QWN0aW9ufSBhY3Rpb25cbiAgICAgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcGF1c2VkXG4gICAgICovXG4gICAgYWRkQWN0aW9uOmZ1bmN0aW9uIChhY3Rpb24sIHRhcmdldCwgcGF1c2VkKSB7XG4gICAgICAgIGlmICghYWN0aW9uIHx8ICF0YXJnZXQpIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMTAwMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL2NoZWNrIGlmIHRoZSBhY3Rpb24gdGFyZ2V0IGFscmVhZHkgZXhpc3RzXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5faGFzaFRhcmdldHNbdGFyZ2V0Ll9pZF07XG4gICAgICAgIC8vaWYgZG9lc24ndCBleGlzdHMsIGNyZWF0ZSBhIGhhc2hlbGVtZW50IGFuZCBwdXNoIGluIG1wVGFyZ2V0c1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLl9nZXRFbGVtZW50KHRhcmdldCwgcGF1c2VkKTtcbiAgICAgICAgICAgIHRoaXMuX2hhc2hUYXJnZXRzW3RhcmdldC5faWRdID0gZWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuX2FycmF5VGFyZ2V0cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFlbGVtZW50LmFjdGlvbnMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWN0aW9ucyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5hY3Rpb25zLnB1c2goYWN0aW9uKTtcbiAgICAgICAgYWN0aW9uLnN0YXJ0V2l0aFRhcmdldCh0YXJnZXQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJlbW92ZXMgYWxsIGFjdGlvbnMgZnJvbSBhbGwgdGhlIHRhcmdldHMuXG4gICAgICogISN6aCDnp7vpmaTmiYDmnInlr7nosaHnmoTmiYDmnInliqjkvZzjgIJcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUFsbEFjdGlvbnNcbiAgICAgKi9cbiAgICByZW1vdmVBbGxBY3Rpb25zOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxvY1RhcmdldHMgPSB0aGlzLl9hcnJheVRhcmdldHM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jVGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBsb2NUYXJnZXRzW2ldO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgdGhpcy5fcHV0RWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hcnJheVRhcmdldHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5faGFzaFRhcmdldHMgPSBqcy5jcmVhdGVNYXAodHJ1ZSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmVtb3ZlcyBhbGwgYWN0aW9ucyBmcm9tIGEgY2VydGFpbiB0YXJnZXQuIDxici8+XG4gICAgICogQWxsIHRoZSBhY3Rpb25zIHRoYXQgYmVsb25ncyB0byB0aGUgdGFyZ2V0IHdpbGwgYmUgcmVtb3ZlZC5cbiAgICAgKiAhI3poXG4gICAgICog56e76Zmk5oyH5a6a5a+56LGh5LiK55qE5omA5pyJ5Yqo5L2c44CCPGJyLz5cbiAgICAgKiDlsZ7kuo7or6Xnm67moIfnmoTmiYDmnInnmoTliqjkvZzlsIbooqvliKDpmaTjgIJcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUFsbEFjdGlvbnNGcm9tVGFyZ2V0XG4gICAgICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZvcmNlRGVsZXRlXG4gICAgICovXG4gICAgcmVtb3ZlQWxsQWN0aW9uc0Zyb21UYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCwgZm9yY2VEZWxldGUpIHtcbiAgICAgICAgLy8gZXhwbGljaXQgbnVsbCBoYW5kbGluZ1xuICAgICAgICBpZiAodGFyZ2V0ID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5faGFzaFRhcmdldHNbdGFyZ2V0Ll9pZF07XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50LmFjdGlvbnMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2RlbGV0ZUhhc2hFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiAhI2VuIFJlbW92ZXMgYW4gYWN0aW9uIGdpdmVuIGFuIGFjdGlvbiByZWZlcmVuY2UuXG4gICAgICogISN6aCDnp7vpmaTmjIflrprnmoTliqjkvZzjgIJcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUFjdGlvbiBcbiAgICAgKiBAcGFyYW0ge0FjdGlvbn0gYWN0aW9uXG4gICAgICovXG4gICAgcmVtb3ZlQWN0aW9uOmZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgLy8gZXhwbGljaXQgbnVsbCBoYW5kbGluZ1xuICAgICAgICBpZiAoIWFjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0YXJnZXQgPSBhY3Rpb24uZ2V0T3JpZ2luYWxUYXJnZXQoKTtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLl9oYXNoVGFyZ2V0c1t0YXJnZXQuX2lkXTtcblxuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudC5hY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5hY3Rpb25zW2ldID09PSBhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFjdGlvbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBhY3Rpb25JbmRleCBpbiBjYXNlIHdlIGFyZSBpbiB0aWNrLiBsb29waW5nIG92ZXIgdGhlIGFjdGlvbnNcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5hY3Rpb25JbmRleCA+PSBpKVxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFjdGlvbkluZGV4LS07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3JlbW92ZUFjdGlvbkJ5VGFnICh0YWcsIGVsZW1lbnQsIHRhcmdldCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGVsZW1lbnQuYWN0aW9ucy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBlbGVtZW50LmFjdGlvbnNbaV07XG4gICAgICAgICAgICBpZiAoYWN0aW9uICYmIGFjdGlvbi5nZXRUYWcoKSA9PT0gdGFnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCAmJiBhY3Rpb24uZ2V0T3JpZ2luYWxUYXJnZXQoKSAhPT0gdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVBY3Rpb25BdEluZGV4KGksIGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmVtb3ZlcyBhbiBhY3Rpb24gZ2l2ZW4gaXRzIHRhZyBhbmQgdGhlIHRhcmdldC5cbiAgICAgKiAhI3poIOWIoOmZpOaMh+WumuWvueixoeS4i+eJueWumuagh+etvueahOS4gOS4quWKqOS9nO+8jOWwhuWIoOmZpOmmluS4quWMuemFjeWIsOeahOWKqOS9nOOAglxuICAgICAqIEBtZXRob2QgcmVtb3ZlQWN0aW9uQnlUYWdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGFnXG4gICAgICogQHBhcmFtIHtOb2RlfSBbdGFyZ2V0XVxuICAgICAqL1xuICAgIHJlbW92ZUFjdGlvbkJ5VGFnOmZ1bmN0aW9uICh0YWcsIHRhcmdldCkge1xuICAgICAgICBpZih0YWcgPT09IGNjLkFjdGlvbi5UQUdfSU5WQUxJRClcbiAgICAgICAgICAgIGNjLmxvZ0lEKDEwMDIpO1xuXG4gICAgICAgIGxldCBoYXNoVGFyZ2V0cyA9IHRoaXMuX2hhc2hUYXJnZXRzO1xuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGhhc2hUYXJnZXRzW3RhcmdldC5faWRdO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVBY3Rpb25CeVRhZyh0YWcsIGVsZW1lbnQsIHRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBuYW1lIGluIGhhc2hUYXJnZXRzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBoYXNoVGFyZ2V0c1tuYW1lXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVBY3Rpb25CeVRhZyh0YWcsIGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0cyBhbiBhY3Rpb24gZ2l2ZW4gaXRzIHRhZyBhbiBhIHRhcmdldC5cbiAgICAgKiAhI3poIOmAmui/h+ebruagh+WvueixoeWSjOagh+etvuiOt+WPluS4gOS4quWKqOS9nOOAglxuICAgICAqIEBtZXRob2QgZ2V0QWN0aW9uQnlUYWdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGFnXG4gICAgICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcbiAgICAgKiBAcmV0dXJuIHtBY3Rpb258TnVsbH0gIHJldHVybiB0aGUgQWN0aW9uIHdpdGggdGhlIGdpdmVuIHRhZyBvbiBzdWNjZXNzXG4gICAgICovXG4gICAgZ2V0QWN0aW9uQnlUYWc6ZnVuY3Rpb24gKHRhZywgdGFyZ2V0KSB7XG4gICAgICAgIGlmKHRhZyA9PT0gY2MuQWN0aW9uLlRBR19JTlZBTElEKVxuICAgICAgICAgICAgY2MubG9nSUQoMTAwNCk7XG5cbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLl9oYXNoVGFyZ2V0c1t0YXJnZXQuX2lkXTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmFjdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudC5hY3Rpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBlbGVtZW50LmFjdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gJiYgYWN0aW9uLmdldFRhZygpID09PSB0YWcpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNjLmxvZ0lEKDEwMDUsIHRhZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIG51bWJlcnMgb2YgYWN0aW9ucyB0aGF0IGFyZSBydW5uaW5nIGluIGEgY2VydGFpbiB0YXJnZXQuIDxici8+XG4gICAgICogQ29tcG9zYWJsZSBhY3Rpb25zIGFyZSBjb3VudGVkIGFzIDEgYWN0aW9uLiA8YnIvPlxuICAgICAqIEV4YW1wbGU6IDxici8+XG4gICAgICogLSBJZiB5b3UgYXJlIHJ1bm5pbmcgMSBTZXF1ZW5jZSBvZiA3IGFjdGlvbnMsIGl0IHdpbGwgcmV0dXJuIDEuIDxici8+XG4gICAgICogLSBJZiB5b3UgYXJlIHJ1bm5pbmcgNyBTZXF1ZW5jZXMgb2YgMiBhY3Rpb25zLCBpdCB3aWxsIHJldHVybiA3LlxuICAgICAqICEjemhcbiAgICAgKiDov5Tlm57mjIflrprlr7nosaHkuIvmiYDmnInmraPlnKjov5DooYznmoTliqjkvZzmlbDph4/jgIIgPGJyLz5cbiAgICAgKiDnu4TlkIjliqjkvZzooqvnrpfkvZzkuIDkuKrliqjkvZzjgII8YnIvPlxuICAgICAqIOS+i+Wmgu+8mjxici8+XG4gICAgICogIC0g5aaC5p6c5oKo5q2j5Zyo6L+Q6KGMIDcg5Liq5Yqo5L2c57uE5oiQ55qE5bqP5YiX5Yqo5L2c77yIU2VxdWVuY2XvvInvvIzov5nkuKrlh73mlbDlsIbov5Tlm54gMeOAgjxici8+XG4gICAgICogIC0g5aaC5p6c5L2g5q2j5Zyo6L+Q6KGMIDIg5Liq5bqP5YiX5Yqo5L2c77yIU2VxdWVuY2XvvInlkowgNSDkuKrmma7pgJrliqjkvZzvvIzov5nkuKrlh73mlbDlsIbov5Tlm54gN+OAgjxici8+XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGdldE51bWJlck9mUnVubmluZ0FjdGlvbnNJblRhcmdldFxuICAgICAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldE51bWJlck9mUnVubmluZ0FjdGlvbnNJblRhcmdldDpmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5faGFzaFRhcmdldHNbdGFyZ2V0Ll9pZF07XG4gICAgICAgIGlmIChlbGVtZW50KVxuICAgICAgICAgICAgcmV0dXJuIChlbGVtZW50LmFjdGlvbnMpID8gZWxlbWVudC5hY3Rpb25zLmxlbmd0aCA6IDA7XG5cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiAhI2VuIFBhdXNlcyB0aGUgdGFyZ2V0OiBhbGwgcnVubmluZyBhY3Rpb25zIGFuZCBuZXdseSBhZGRlZCBhY3Rpb25zIHdpbGwgYmUgcGF1c2VkLlxuICAgICAqICEjemgg5pqC5YGc5oyH5a6a5a+56LGh77ya5omA5pyJ5q2j5Zyo6L+Q6KGM55qE5Yqo5L2c5ZKM5paw5re75Yqg55qE5Yqo5L2c6YO95bCG5Lya5pqC5YGc44CCXG4gICAgICogQG1ldGhvZCBwYXVzZVRhcmdldFxuICAgICAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gICAgICovXG4gICAgcGF1c2VUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMuX2hhc2hUYXJnZXRzW3RhcmdldC5faWRdO1xuICAgICAgICBpZiAoZWxlbWVudClcbiAgICAgICAgICAgIGVsZW1lbnQucGF1c2VkID0gdHJ1ZTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqICEjZW4gUmVzdW1lcyB0aGUgdGFyZ2V0LiBBbGwgcXVldWVkIGFjdGlvbnMgd2lsbCBiZSByZXN1bWVkLlxuICAgICAqICEjemgg6K6p5oyH5a6a55uu5qCH5oGi5aSN6L+Q6KGM44CC5Zyo5omn6KGM5bqP5YiX5Lit5omA5pyJ6KKr5pqC5YGc55qE5Yqo5L2c5bCG6YeN5paw5oGi5aSN6L+Q6KGM44CCXG4gICAgICogQG1ldGhvZCByZXN1bWVUYXJnZXRcbiAgICAgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuICAgICAqL1xuICAgIHJlc3VtZVRhcmdldDpmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5faGFzaFRhcmdldHNbdGFyZ2V0Ll9pZF07XG4gICAgICAgIGlmIChlbGVtZW50KVxuICAgICAgICAgICAgZWxlbWVudC5wYXVzZWQgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBQYXVzZXMgYWxsIHJ1bm5pbmcgYWN0aW9ucywgcmV0dXJuaW5nIGEgbGlzdCBvZiB0YXJnZXRzIHdob3NlIGFjdGlvbnMgd2VyZSBwYXVzZWQuXG4gICAgICogISN6aCDmmoLlgZzmiYDmnInmraPlnKjov5DooYznmoTliqjkvZzvvIzov5Tlm57kuIDkuKrljIXlkKvkuobpgqPkupvliqjkvZzooqvmmoLlgZzkuobnmoTnm67moIflr7nosaHnmoTliJfooajjgIJcbiAgICAgKiBAbWV0aG9kIHBhdXNlQWxsUnVubmluZ0FjdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gIGEgbGlzdCBvZiB0YXJnZXRzIHdob3NlIGFjdGlvbnMgd2VyZSBwYXVzZWQuXG4gICAgICovXG4gICAgcGF1c2VBbGxSdW5uaW5nQWN0aW9uczpmdW5jdGlvbigpe1xuICAgICAgICB2YXIgaWRzV2l0aEFjdGlvbnMgPSBbXTtcbiAgICAgICAgdmFyIGxvY1RhcmdldHMgPSB0aGlzLl9hcnJheVRhcmdldHM7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGk8IGxvY1RhcmdldHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBsb2NUYXJnZXRzW2ldO1xuICAgICAgICAgICAgaWYoZWxlbWVudCAmJiAhZWxlbWVudC5wYXVzZWQpe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZHNXaXRoQWN0aW9ucy5wdXNoKGVsZW1lbnQudGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWRzV2l0aEFjdGlvbnM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmVzdW1lIGEgc2V0IG9mIHRhcmdldHMgKGNvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIHJldmVyc2UgYSBwYXVzZUFsbFJ1bm5pbmdBY3Rpb25zIG9yIHBhdXNlVGFyZ2V0cyBjYWxsKS5cbiAgICAgKiAhI3poIOiuqeS4gOe7hOaMh+WumuWvueixoeaBouWkjei/kOihjO+8iOeUqOadpemAhui9rCBwYXVzZUFsbFJ1bm5pbmdBY3Rpb25zIOaViOaenOeahOS+v+aNt+WHveaVsO+8ieOAglxuICAgICAqIEBtZXRob2QgcmVzdW1lVGFyZ2V0c1xuICAgICAqIEBwYXJhbSB7QXJyYXl9IHRhcmdldHNUb1Jlc3VtZVxuICAgICAqL1xuICAgIHJlc3VtZVRhcmdldHM6ZnVuY3Rpb24odGFyZ2V0c1RvUmVzdW1lKXtcbiAgICAgICAgaWYgKCF0YXJnZXRzVG9SZXN1bWUpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGk8IHRhcmdldHNUb1Jlc3VtZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYodGFyZ2V0c1RvUmVzdW1lW2ldKVxuICAgICAgICAgICAgICAgIHRoaXMucmVzdW1lVGFyZ2V0KHRhcmdldHNUb1Jlc3VtZVtpXSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBQYXVzZSBhIHNldCBvZiB0YXJnZXRzLlxuICAgICAqICEjemgg5pqC5YGc5LiA57uE5oyH5a6a5a+56LGh44CCXG4gICAgICogQG1ldGhvZCBwYXVzZVRhcmdldHNcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB0YXJnZXRzVG9QYXVzZVxuICAgICAqL1xuICAgIHBhdXNlVGFyZ2V0czpmdW5jdGlvbih0YXJnZXRzVG9QYXVzZSl7XG4gICAgICAgIGlmICghdGFyZ2V0c1RvUGF1c2UpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGk8IHRhcmdldHNUb1BhdXNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0c1RvUGF1c2VbaV0pXG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZVRhcmdldCh0YXJnZXRzVG9QYXVzZVtpXSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIHB1cmdlcyB0aGUgc2hhcmVkIGFjdGlvbiBtYW5hZ2VyLiBJdCByZWxlYXNlcyB0aGUgcmV0YWluZWQgaW5zdGFuY2UuIDxici8+XG4gICAgICogYmVjYXVzZSBpdCB1c2VzIHRoaXMsIHNvIGl0IGNhbiBub3QgYmUgc3RhdGljLlxuICAgICAqICEjemhcbiAgICAgKiDmuIXpmaTlhbHnlKjnmoTliqjkvZznrqHnkIblmajjgILlroPph4rmlL7kuobmjIHmnInnmoTlrp7kvovjgIIgPGJyLz5cbiAgICAgKiDlm6DkuLrlroPkvb/nlKggdGhpc++8jOWboOatpOWug+S4jeiDveaYr+mdmeaAgeeahOOAglxuICAgICAqIEBtZXRob2QgcHVyZ2VTaGFyZWRNYW5hZ2VyXG4gICAgICovXG4gICAgcHVyZ2VTaGFyZWRNYW5hZ2VyOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkudW5zY2hlZHVsZVVwZGF0ZSh0aGlzKTtcbiAgICB9LFxuXG4gICAgLy9wcm90ZWN0ZWRcbiAgICBfcmVtb3ZlQWN0aW9uQXRJbmRleDpmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IGVsZW1lbnQuYWN0aW9uc1tpbmRleF07XG5cbiAgICAgICAgZWxlbWVudC5hY3Rpb25zLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIGFjdGlvbkluZGV4IGluIGNhc2Ugd2UgYXJlIGluIHRpY2suIGxvb3Bpbmcgb3ZlciB0aGUgYWN0aW9uc1xuICAgICAgICBpZiAoZWxlbWVudC5hY3Rpb25JbmRleCA+PSBpbmRleClcbiAgICAgICAgICAgIGVsZW1lbnQuYWN0aW9uSW5kZXgtLTtcblxuICAgICAgICBpZiAoZWxlbWVudC5hY3Rpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fZGVsZXRlSGFzaEVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2RlbGV0ZUhhc2hFbGVtZW50OmZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciByZXQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGVsZW1lbnQgJiYgIWVsZW1lbnQubG9jaykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2hhc2hUYXJnZXRzW2VsZW1lbnQudGFyZ2V0Ll9pZF0pIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5faGFzaFRhcmdldHNbZWxlbWVudC50YXJnZXQuX2lkXTtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0cyA9IHRoaXMuX2FycmF5VGFyZ2V0cztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRhcmdldHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRzW2ldID09PSBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3B1dEVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgcmV0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBBY3Rpb25NYW5hZ2VyIHVwZGF0ZeOAglxuICAgICAqICEjemggQWN0aW9uTWFuYWdlciDkuLvlvqrnjq/jgIJcbiAgICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdCBkZWx0YSB0aW1lIGluIHNlY29uZHNcbiAgICAgKi9cbiAgICB1cGRhdGU6ZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIHZhciBsb2NUYXJnZXRzID0gdGhpcy5fYXJyYXlUYXJnZXRzICwgbG9jQ3VyclRhcmdldDtcbiAgICAgICAgZm9yICh2YXIgZWx0ID0gMDsgZWx0IDwgbG9jVGFyZ2V0cy5sZW5ndGg7IGVsdCsrKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50VGFyZ2V0ID0gbG9jVGFyZ2V0c1tlbHRdO1xuICAgICAgICAgICAgbG9jQ3VyclRhcmdldCA9IHRoaXMuX2N1cnJlbnRUYXJnZXQ7XG4gICAgICAgICAgICBpZiAoIWxvY0N1cnJUYXJnZXQucGF1c2VkICYmIGxvY0N1cnJUYXJnZXQuYWN0aW9ucykge1xuICAgICAgICAgICAgICAgIGxvY0N1cnJUYXJnZXQubG9jayA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gVGhlICdhY3Rpb25zJyBDQ011dGFibGVBcnJheSBtYXkgY2hhbmdlIHdoaWxlIGluc2lkZSB0aGlzIGxvb3AuXG4gICAgICAgICAgICAgICAgZm9yIChsb2NDdXJyVGFyZ2V0LmFjdGlvbkluZGV4ID0gMDsgbG9jQ3VyclRhcmdldC5hY3Rpb25JbmRleCA8IGxvY0N1cnJUYXJnZXQuYWN0aW9ucy5sZW5ndGg7IGxvY0N1cnJUYXJnZXQuYWN0aW9uSW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICBsb2NDdXJyVGFyZ2V0LmN1cnJlbnRBY3Rpb24gPSBsb2NDdXJyVGFyZ2V0LmFjdGlvbnNbbG9jQ3VyclRhcmdldC5hY3Rpb25JbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGlmICghbG9jQ3VyclRhcmdldC5jdXJyZW50QWN0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy91c2UgZm9yIHNwZWVkXG4gICAgICAgICAgICAgICAgICAgIGxvY0N1cnJUYXJnZXQuY3VycmVudEFjdGlvbi5zdGVwKGR0ICogKCBsb2NDdXJyVGFyZ2V0LmN1cnJlbnRBY3Rpb24uX3NwZWVkTWV0aG9kID8gbG9jQ3VyclRhcmdldC5jdXJyZW50QWN0aW9uLl9zcGVlZCA6IDEgKSApO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvY0N1cnJUYXJnZXQuY3VycmVudEFjdGlvbiAmJiBsb2NDdXJyVGFyZ2V0LmN1cnJlbnRBY3Rpb24uaXNEb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY0N1cnJUYXJnZXQuY3VycmVudEFjdGlvbi5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0gbG9jQ3VyclRhcmdldC5jdXJyZW50QWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBjdXJyZW50QWN0aW9uIG5pbCB0byBwcmV2ZW50IHJlbW92ZUFjdGlvbiBmcm9tIHNhbHZhZ2luZyBpdC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY0N1cnJUYXJnZXQuY3VycmVudEFjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUFjdGlvbihhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbG9jQ3VyclRhcmdldC5jdXJyZW50QWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbG9jQ3VyclRhcmdldC5sb2NrID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBvbmx5IGRlbGV0ZSBjdXJyZW50VGFyZ2V0IGlmIG5vIGFjdGlvbnMgd2VyZSBzY2hlZHVsZWQgZHVyaW5nIHRoZSBjeWNsZSAoaXNzdWUgIzQ4MSlcbiAgICAgICAgICAgIGlmIChsb2NDdXJyVGFyZ2V0LmFjdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVsZXRlSGFzaEVsZW1lbnQobG9jQ3VyclRhcmdldCkgJiYgZWx0LS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5pZiAoQ0NfVEVTVCkge1xuICAgIGNjLkFjdGlvbk1hbmFnZXIucHJvdG90eXBlLmlzVGFyZ2V0UGF1c2VkX1RFU1QgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5faGFzaFRhcmdldHNbdGFyZ2V0Ll9pZF07XG4gICAgICAgIHJldHVybiBlbGVtZW50LnBhdXNlZDtcbiAgICB9O1xufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=