
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/actions/CCActionInstant.js';
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
 * !#en Instant actions are immediate actions. They don't have a duration like the ActionInterval actions.
 * !#zh 即时动作，这种动作立即就会执行，继承自 FiniteTimeAction。
 * @class ActionInstant
 * @extends FiniteTimeAction
 */
cc.ActionInstant = cc.Class({
  name: 'cc.ActionInstant',
  "extends": cc.FiniteTimeAction,
  isDone: function isDone() {
    return true;
  },
  step: function step(dt) {
    this.update(1);
  },
  update: function update(dt) {//nothing
  },

  /**
   * returns a reversed action. <br />
   * For example: <br />
   * - The action is x coordinates of 0 move to 100. <br />
   * - The reversed action will be x of 100 move to 0.
   * @returns {Action}
   */
  reverse: function reverse() {
    return this.clone();
  },
  clone: function clone() {
    return new cc.ActionInstant();
  }
});
/**
 * @module cc
 */

/*
 * Show the node.
 * @class Show
 * @extends ActionInstant
 */

cc.Show = cc.Class({
  name: 'cc.Show',
  "extends": cc.ActionInstant,
  update: function update(dt) {
    var _renderComps = this.target.getComponentsInChildren(cc.RenderComponent);

    for (var i = 0; i < _renderComps.length; ++i) {
      var render = _renderComps[i];
      render.enabled = true;
    }
  },
  reverse: function reverse() {
    return new cc.Hide();
  },
  clone: function clone() {
    return new cc.Show();
  }
});
/**
 * !#en Show the Node.
 * !#zh 立即显示。
 * @method show
 * @return {ActionInstant}
 * @example
 * // example
 * var showAction = cc.show();
 */

cc.show = function () {
  return new cc.Show();
};
/*
 * Hide the node.
 * @class Hide
 * @extends ActionInstant
 */


cc.Hide = cc.Class({
  name: 'cc.Hide',
  "extends": cc.ActionInstant,
  update: function update(dt) {
    var _renderComps = this.target.getComponentsInChildren(cc.RenderComponent);

    for (var i = 0; i < _renderComps.length; ++i) {
      var render = _renderComps[i];
      render.enabled = false;
    }
  },
  reverse: function reverse() {
    return new cc.Show();
  },
  clone: function clone() {
    return new cc.Hide();
  }
});
/**
 * !#en Hide the node.
 * !#zh 立即隐藏。
 * @method hide
 * @return {ActionInstant}
 * @example
 * // example
 * var hideAction = cc.hide();
 */

cc.hide = function () {
  return new cc.Hide();
};
/*
 * Toggles the visibility of a node.
 * @class ToggleVisibility
 * @extends ActionInstant
 */


cc.ToggleVisibility = cc.Class({
  name: 'cc.ToggleVisibility',
  "extends": cc.ActionInstant,
  update: function update(dt) {
    var _renderComps = this.target.getComponentsInChildren(cc.RenderComponent);

    for (var i = 0; i < _renderComps.length; ++i) {
      var render = _renderComps[i];
      render.enabled = !render.enabled;
    }
  },
  reverse: function reverse() {
    return new cc.ToggleVisibility();
  },
  clone: function clone() {
    return new cc.ToggleVisibility();
  }
});
/**
 * !#en Toggles the visibility of a node.
 * !#zh 显隐状态切换。
 * @method toggleVisibility
 * @return {ActionInstant}
 * @example
 * // example
 * var toggleVisibilityAction = cc.toggleVisibility();
 */

cc.toggleVisibility = function () {
  return new cc.ToggleVisibility();
};
/*
 * Delete self in the next frame.
 * @class RemoveSelf
 * @extends ActionInstant
 * @param {Boolean} [isNeedCleanUp=true]
 *
 * @example
 * // example
 * var removeSelfAction = new cc.RemoveSelf(false);
 */


cc.RemoveSelf = cc.Class({
  name: 'cc.RemoveSelf',
  "extends": cc.ActionInstant,
  ctor: function ctor(isNeedCleanUp) {
    this._isNeedCleanUp = true;
    isNeedCleanUp !== undefined && this.init(isNeedCleanUp);
  },
  update: function update(dt) {
    this.target.removeFromParent(this._isNeedCleanUp);
  },
  init: function init(isNeedCleanUp) {
    this._isNeedCleanUp = isNeedCleanUp;
    return true;
  },
  reverse: function reverse() {
    return new cc.RemoveSelf(this._isNeedCleanUp);
  },
  clone: function clone() {
    return new cc.RemoveSelf(this._isNeedCleanUp);
  }
});
/**
 * !#en Create a RemoveSelf object with a flag indicate whether the target should be cleaned up while removing.
 * !#zh 从父节点移除自身。
 * @method removeSelf
 * @param {Boolean} [isNeedCleanUp = true]
 * @return {ActionInstant}
 *
 * @example
 * // example
 * var removeSelfAction = cc.removeSelf();
 */

cc.removeSelf = function (isNeedCleanUp) {
  return new cc.RemoveSelf(isNeedCleanUp);
};
/*
 * Create an action to destroy self.
 * @class DestroySelf
 * @extends ActionInstant
 *
 * @example
 * var destroySelfAction = new cc.DestroySelf();
 */


cc.DestroySelf = cc.Class({
  name: 'cc.DestroySelf',
  "extends": cc.ActionInstant,
  update: function update() {
    this.target.destroy();
  },
  reverse: function reverse() {
    return new cc.DestroySelf();
  },
  clone: function clone() {
    return new cc.DestroySelf();
  }
});
/**
 * !#en Destroy self
 * !#zh 创建一个销毁自身的动作。
 * @method destroySelf
 * @return {ActionInstant}
 *
 * @example
 * var destroySelfAction = cc.destroySelf();
 */

cc.destroySelf = function () {
  return new cc.DestroySelf();
};
/*
 * Flips the sprite horizontally.
 * @class FlipX
 * @extends ActionInstant
 * @param {Boolean} flip Indicate whether the target should be flipped or not
 *
 * @example
 * var flipXAction = new cc.FlipX(true);
 */


cc.FlipX = cc.Class({
  name: 'cc.FlipX',
  "extends": cc.ActionInstant,
  ctor: function ctor(flip) {
    this._flippedX = false;
    flip !== undefined && this.initWithFlipX(flip);
  },

  /*
   * initializes the action with a set flipX.
   * @param {Boolean} flip
   * @return {Boolean}
   */
  initWithFlipX: function initWithFlipX(flip) {
    this._flippedX = flip;
    return true;
  },
  update: function update(dt) {
    this.target.scaleX = Math.abs(this.target.scaleX) * (this._flippedX ? -1 : 1);
  },
  reverse: function reverse() {
    return new cc.FlipX(!this._flippedX);
  },
  clone: function clone() {
    var action = new cc.FlipX();
    action.initWithFlipX(this._flippedX);
    return action;
  }
});
/**
 * !#en Create a FlipX action to flip or unflip the target.
 * !#zh X轴翻转。
 * @method flipX
 * @param {Boolean} flip Indicate whether the target should be flipped or not
 * @return {ActionInstant}
 * @example
 * var flipXAction = cc.flipX(true);
 */

cc.flipX = function (flip) {
  return new cc.FlipX(flip);
};
/*
 * Flips the sprite vertically
 * @class FlipY
 * @extends ActionInstant
 * @param {Boolean} flip
 * @example
 * var flipYAction = new cc.FlipY(true);
 */


cc.FlipY = cc.Class({
  name: 'cc.FlipY',
  "extends": cc.ActionInstant,
  ctor: function ctor(flip) {
    this._flippedY = false;
    flip !== undefined && this.initWithFlipY(flip);
  },

  /*
   * initializes the action with a set flipY.
   * @param {Boolean} flip
   * @return {Boolean}
   */
  initWithFlipY: function initWithFlipY(flip) {
    this._flippedY = flip;
    return true;
  },
  update: function update(dt) {
    this.target.scaleY = Math.abs(this.target.scaleY) * (this._flippedY ? -1 : 1);
  },
  reverse: function reverse() {
    return new cc.FlipY(!this._flippedY);
  },
  clone: function clone() {
    var action = new cc.FlipY();
    action.initWithFlipY(this._flippedY);
    return action;
  }
});
/**
 * !#en Create a FlipY action to flip or unflip the target.
 * !#zh Y轴翻转。
 * @method flipY
 * @param {Boolean} flip
 * @return {ActionInstant}
 * @example
 * var flipYAction = cc.flipY(true);
 */

cc.flipY = function (flip) {
  return new cc.FlipY(flip);
};
/*
 * Places the node in a certain position
 * @class Place
 * @extends ActionInstant
 * @param {Vec2|Number} pos
 * @param {Number} [y]
 * @example
 * var placeAction = new cc.Place(cc.v2(200, 200));
 * var placeAction = new cc.Place(200, 200);
 */


cc.Place = cc.Class({
  name: 'cc.Place',
  "extends": cc.ActionInstant,
  ctor: function ctor(pos, y) {
    this._x = 0;
    this._y = 0;

    if (pos !== undefined) {
      if (pos.x !== undefined) {
        y = pos.y;
        pos = pos.x;
      }

      this.initWithPosition(pos, y);
    }
  },

  /*
   * Initializes a Place action with a position
   * @param {number} x
   * @param {number} y
   * @return {Boolean}
   */
  initWithPosition: function initWithPosition(x, y) {
    this._x = x;
    this._y = y;
    return true;
  },
  update: function update(dt) {
    this.target.setPosition(this._x, this._y);
  },
  clone: function clone() {
    var action = new cc.Place();
    action.initWithPosition(this._x, this._y);
    return action;
  }
});
/**
 * !#en Creates a Place action with a position.
 * !#zh 放置在目标位置。
 * @method place
 * @param {Vec2|Number} pos
 * @param {Number} [y]
 * @return {ActionInstant}
 * @example
 * // example
 * var placeAction = cc.place(cc.v2(200, 200));
 * var placeAction = cc.place(200, 200);
 */

cc.place = function (pos, y) {
  return new cc.Place(pos, y);
};
/*
 * Calls a 'callback'.
 * @class CallFunc
 * @extends ActionInstant
 * @param {function} selector
 * @param {object} [selectorTarget=null]
 * @param {*} [data=null] data for function, it accepts all data types.
 * @example
 * // example
 * // CallFunc without data
 * var finish = new cc.CallFunc(this.removeSprite, this);
 *
 * // CallFunc with data
 * var finish = new cc.CallFunc(this.removeFromParentAndCleanup, this,  true);
 */


cc.CallFunc = cc.Class({
  name: 'cc.CallFunc',
  "extends": cc.ActionInstant,

  /*
   * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
  * Creates a CallFunc action with the callback.
  * @param {function} selector
  * @param {object} [selectorTarget=null]
  * @param {*} [data=null] data for function, it accepts all data types.
  */
  ctor: function ctor(selector, selectorTarget, data) {
    this._selectorTarget = null;
    this._function = null;
    this._data = null;
    this.initWithFunction(selector, selectorTarget, data);
  },

  /*
   * Initializes the action with a function or function and its target
   * @param {function} selector
   * @param {object|Null} selectorTarget
   * @param {*|Null} [data] data for function, it accepts all data types.
   * @return {Boolean}
   */
  initWithFunction: function initWithFunction(selector, selectorTarget, data) {
    if (selector) {
      this._function = selector;
    }

    if (selectorTarget) {
      this._selectorTarget = selectorTarget;
    }

    if (data !== undefined) {
      this._data = data;
    }

    return true;
  },

  /*
   * execute the function.
   */
  execute: function execute() {
    if (this._function) {
      this._function.call(this._selectorTarget, this.target, this._data);
    }
  },
  update: function update(dt) {
    this.execute();
  },

  /*
   * Get selectorTarget.
   * @return {object}
   */
  getTargetCallback: function getTargetCallback() {
    return this._selectorTarget;
  },

  /*
   * Set selectorTarget.
   * @param {object} sel
   */
  setTargetCallback: function setTargetCallback(sel) {
    if (sel !== this._selectorTarget) {
      if (this._selectorTarget) this._selectorTarget = null;
      this._selectorTarget = sel;
    }
  },
  clone: function clone() {
    var action = new cc.CallFunc();
    action.initWithFunction(this._function, this._selectorTarget, this._data);
    return action;
  }
});
/**
 * !#en Creates the action with the callback.
 * !#zh 执行回调函数。
 * @method callFunc
 * @param {function} selector
 * @param {object} [selectorTarget=null]
 * @param {*} [data=null] - data for function, it accepts all data types.
 * @return {ActionInstant}
 * @example
 * // example
 * // CallFunc without data
 * var finish = cc.callFunc(this.removeSprite, this);
 *
 * // CallFunc with data
 * var finish = cc.callFunc(this.removeFromParentAndCleanup, this._grossini,  true);
 */

cc.callFunc = function (selector, selectorTarget, data) {
  return new cc.CallFunc(selector, selectorTarget, data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9hY3Rpb25zL0NDQWN0aW9uSW5zdGFudC5qcyJdLCJuYW1lcyI6WyJjYyIsIkFjdGlvbkluc3RhbnQiLCJDbGFzcyIsIm5hbWUiLCJGaW5pdGVUaW1lQWN0aW9uIiwiaXNEb25lIiwic3RlcCIsImR0IiwidXBkYXRlIiwicmV2ZXJzZSIsImNsb25lIiwiU2hvdyIsIl9yZW5kZXJDb21wcyIsInRhcmdldCIsImdldENvbXBvbmVudHNJbkNoaWxkcmVuIiwiUmVuZGVyQ29tcG9uZW50IiwiaSIsImxlbmd0aCIsInJlbmRlciIsImVuYWJsZWQiLCJIaWRlIiwic2hvdyIsImhpZGUiLCJUb2dnbGVWaXNpYmlsaXR5IiwidG9nZ2xlVmlzaWJpbGl0eSIsIlJlbW92ZVNlbGYiLCJjdG9yIiwiaXNOZWVkQ2xlYW5VcCIsIl9pc05lZWRDbGVhblVwIiwidW5kZWZpbmVkIiwiaW5pdCIsInJlbW92ZUZyb21QYXJlbnQiLCJyZW1vdmVTZWxmIiwiRGVzdHJveVNlbGYiLCJkZXN0cm95IiwiZGVzdHJveVNlbGYiLCJGbGlwWCIsImZsaXAiLCJfZmxpcHBlZFgiLCJpbml0V2l0aEZsaXBYIiwic2NhbGVYIiwiTWF0aCIsImFicyIsImFjdGlvbiIsImZsaXBYIiwiRmxpcFkiLCJfZmxpcHBlZFkiLCJpbml0V2l0aEZsaXBZIiwic2NhbGVZIiwiZmxpcFkiLCJQbGFjZSIsInBvcyIsInkiLCJfeCIsIl95IiwieCIsImluaXRXaXRoUG9zaXRpb24iLCJzZXRQb3NpdGlvbiIsInBsYWNlIiwiQ2FsbEZ1bmMiLCJzZWxlY3RvciIsInNlbGVjdG9yVGFyZ2V0IiwiZGF0YSIsIl9zZWxlY3RvclRhcmdldCIsIl9mdW5jdGlvbiIsIl9kYXRhIiwiaW5pdFdpdGhGdW5jdGlvbiIsImV4ZWN1dGUiLCJjYWxsIiwiZ2V0VGFyZ2V0Q2FsbGJhY2siLCJzZXRUYXJnZXRDYWxsYmFjayIsInNlbCIsImNhbGxGdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7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N0IsRUFBd0MsS0FBS0QsZUFBN0MsRUFBOEQsS0FBS0UsS0FBbkU7QUFDQSxXQUFPdEIsTUFBUDtBQUNIO0FBM0VrQixDQUFULENBQWQ7QUE4RUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBM0MsRUFBRSxDQUFDd0UsUUFBSCxHQUFjLFVBQVVaLFFBQVYsRUFBb0JDLGNBQXBCLEVBQW9DQyxJQUFwQyxFQUEwQztBQUNwRCxTQUFPLElBQUk5RCxFQUFFLENBQUMyRCxRQUFQLENBQWdCQyxRQUFoQixFQUEwQkMsY0FBMUIsRUFBMENDLElBQTFDLENBQVA7QUFDSCxDQUZEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMCBSaWNhcmRvIFF1ZXNhZGFcbiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxMiBjb2NvczJkLXgub3JnXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKipcbiAqIEBtb2R1bGUgY2NcbiAqL1xuXG4vKipcbiAqICEjZW4gSW5zdGFudCBhY3Rpb25zIGFyZSBpbW1lZGlhdGUgYWN0aW9ucy4gVGhleSBkb24ndCBoYXZlIGEgZHVyYXRpb24gbGlrZSB0aGUgQWN0aW9uSW50ZXJ2YWwgYWN0aW9ucy5cbiAqICEjemgg5Y2z5pe25Yqo5L2c77yM6L+Z56eN5Yqo5L2c56uL5Y2z5bCx5Lya5omn6KGM77yM57un5om/6IeqIEZpbml0ZVRpbWVBY3Rpb27jgIJcbiAqIEBjbGFzcyBBY3Rpb25JbnN0YW50XG4gKiBAZXh0ZW5kcyBGaW5pdGVUaW1lQWN0aW9uXG4gKi9cbmNjLkFjdGlvbkluc3RhbnQgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkFjdGlvbkluc3RhbnQnLFxuICAgIGV4dGVuZHM6IGNjLkZpbml0ZVRpbWVBY3Rpb24sXG4gICAgaXNEb25lOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIHN0ZXA6ZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIHRoaXMudXBkYXRlKDEpO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6ZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIC8vbm90aGluZ1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiByZXR1cm5zIGEgcmV2ZXJzZWQgYWN0aW9uLiA8YnIgLz5cbiAgICAgKiBGb3IgZXhhbXBsZTogPGJyIC8+XG4gICAgICogLSBUaGUgYWN0aW9uIGlzIHggY29vcmRpbmF0ZXMgb2YgMCBtb3ZlIHRvIDEwMC4gPGJyIC8+XG4gICAgICogLSBUaGUgcmV2ZXJzZWQgYWN0aW9uIHdpbGwgYmUgeCBvZiAxMDAgbW92ZSB0byAwLlxuICAgICAqIEByZXR1cm5zIHtBY3Rpb259XG4gICAgICovXG4gICAgcmV2ZXJzZTpmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpO1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gbmV3IGNjLkFjdGlvbkluc3RhbnQoKTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBAbW9kdWxlIGNjXG4gKi9cblxuLypcbiAqIFNob3cgdGhlIG5vZGUuXG4gKiBAY2xhc3MgU2hvd1xuICogQGV4dGVuZHMgQWN0aW9uSW5zdGFudFxuICovXG5jYy5TaG93ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5TaG93JyxcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnN0YW50LFxuXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xuICAgICAgICB2YXIgX3JlbmRlckNvbXBzID0gdGhpcy50YXJnZXQuZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4oY2MuUmVuZGVyQ29tcG9uZW50KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfcmVuZGVyQ29tcHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciByZW5kZXIgPSBfcmVuZGVyQ29tcHNbaV07XG4gICAgICAgICAgICByZW5kZXIuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmV2ZXJzZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgY2MuSGlkZSgpO1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gbmV3IGNjLlNob3coKTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiAhI2VuIFNob3cgdGhlIE5vZGUuXG4gKiAhI3poIOeri+WNs+aYvuekuuOAglxuICogQG1ldGhvZCBzaG93XG4gKiBAcmV0dXJuIHtBY3Rpb25JbnN0YW50fVxuICogQGV4YW1wbGVcbiAqIC8vIGV4YW1wbGVcbiAqIHZhciBzaG93QWN0aW9uID0gY2Muc2hvdygpO1xuICovXG5jYy5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBuZXcgY2MuU2hvdygpO1xufTtcblxuLypcbiAqIEhpZGUgdGhlIG5vZGUuXG4gKiBAY2xhc3MgSGlkZVxuICogQGV4dGVuZHMgQWN0aW9uSW5zdGFudFxuICovXG5jYy5IaWRlID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5IaWRlJyxcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnN0YW50LFxuXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xuICAgICAgICB2YXIgX3JlbmRlckNvbXBzID0gdGhpcy50YXJnZXQuZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4oY2MuUmVuZGVyQ29tcG9uZW50KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfcmVuZGVyQ29tcHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciByZW5kZXIgPSBfcmVuZGVyQ29tcHNbaV07XG4gICAgICAgICAgICByZW5kZXIuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IGNjLlNob3coKTtcbiAgICB9LFxuXG4gICAgY2xvbmU6ZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5IaWRlKCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogISNlbiBIaWRlIHRoZSBub2RlLlxuICogISN6aCDnq4vljbPpmpDol4/jgIJcbiAqIEBtZXRob2QgaGlkZVxuICogQHJldHVybiB7QWN0aW9uSW5zdGFudH1cbiAqIEBleGFtcGxlXG4gKiAvLyBleGFtcGxlXG4gKiB2YXIgaGlkZUFjdGlvbiA9IGNjLmhpZGUoKTtcbiAqL1xuY2MuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmV3IGNjLkhpZGUoKTtcbn07XG5cbi8qXG4gKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIGEgbm9kZS5cbiAqIEBjbGFzcyBUb2dnbGVWaXNpYmlsaXR5XG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnN0YW50XG4gKi9cbmNjLlRvZ2dsZVZpc2liaWxpdHkgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlRvZ2dsZVZpc2liaWxpdHknLFxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkluc3RhbnQsXG5cbiAgICB1cGRhdGU6ZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIHZhciBfcmVuZGVyQ29tcHMgPSB0aGlzLnRhcmdldC5nZXRDb21wb25lbnRzSW5DaGlsZHJlbihjYy5SZW5kZXJDb21wb25lbnQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9yZW5kZXJDb21wcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIHJlbmRlciA9IF9yZW5kZXJDb21wc1tpXTtcbiAgICAgICAgICAgIHJlbmRlci5lbmFibGVkID0gIXJlbmRlci5lbmFibGVkO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IGNjLlRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICB9LFxuXG4gICAgY2xvbmU6ZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5Ub2dnbGVWaXNpYmlsaXR5KCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogISNlbiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIGEgbm9kZS5cbiAqICEjemgg5pi+6ZqQ54q25oCB5YiH5o2i44CCXG4gKiBAbWV0aG9kIHRvZ2dsZVZpc2liaWxpdHlcbiAqIEByZXR1cm4ge0FjdGlvbkluc3RhbnR9XG4gKiBAZXhhbXBsZVxuICogLy8gZXhhbXBsZVxuICogdmFyIHRvZ2dsZVZpc2liaWxpdHlBY3Rpb24gPSBjYy50b2dnbGVWaXNpYmlsaXR5KCk7XG4gKi9cbmNjLnRvZ2dsZVZpc2liaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG5ldyBjYy5Ub2dnbGVWaXNpYmlsaXR5KCk7XG59O1xuXG4vKlxuICogRGVsZXRlIHNlbGYgaW4gdGhlIG5leHQgZnJhbWUuXG4gKiBAY2xhc3MgUmVtb3ZlU2VsZlxuICogQGV4dGVuZHMgQWN0aW9uSW5zdGFudFxuICogQHBhcmFtIHtCb29sZWFufSBbaXNOZWVkQ2xlYW5VcD10cnVlXVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBleGFtcGxlXG4gKiB2YXIgcmVtb3ZlU2VsZkFjdGlvbiA9IG5ldyBjYy5SZW1vdmVTZWxmKGZhbHNlKTtcbiAqL1xuY2MuUmVtb3ZlU2VsZiA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuUmVtb3ZlU2VsZicsXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uSW5zdGFudCxcblxuICAgIGN0b3I6ZnVuY3Rpb24oaXNOZWVkQ2xlYW5VcCl7XG4gICAgICAgIHRoaXMuX2lzTmVlZENsZWFuVXAgPSB0cnVlO1xuXHQgICAgaXNOZWVkQ2xlYW5VcCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuaW5pdChpc05lZWRDbGVhblVwKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOmZ1bmN0aW9uKGR0KXtcbiAgICAgICAgdGhpcy50YXJnZXQucmVtb3ZlRnJvbVBhcmVudCh0aGlzLl9pc05lZWRDbGVhblVwKTtcbiAgICB9LFxuXG4gICAgaW5pdDpmdW5jdGlvbihpc05lZWRDbGVhblVwKXtcbiAgICAgICAgdGhpcy5faXNOZWVkQ2xlYW5VcCA9IGlzTmVlZENsZWFuVXA7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICByZXZlcnNlOmZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBuZXcgY2MuUmVtb3ZlU2VsZih0aGlzLl9pc05lZWRDbGVhblVwKTtcbiAgICB9LFxuXG4gICAgY2xvbmU6ZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5SZW1vdmVTZWxmKHRoaXMuX2lzTmVlZENsZWFuVXApO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW4gQ3JlYXRlIGEgUmVtb3ZlU2VsZiBvYmplY3Qgd2l0aCBhIGZsYWcgaW5kaWNhdGUgd2hldGhlciB0aGUgdGFyZ2V0IHNob3VsZCBiZSBjbGVhbmVkIHVwIHdoaWxlIHJlbW92aW5nLlxuICogISN6aCDku47niLboioLngrnnp7vpmaToh6rouqvjgIJcbiAqIEBtZXRob2QgcmVtb3ZlU2VsZlxuICogQHBhcmFtIHtCb29sZWFufSBbaXNOZWVkQ2xlYW5VcCA9IHRydWVdXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnN0YW50fVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBleGFtcGxlXG4gKiB2YXIgcmVtb3ZlU2VsZkFjdGlvbiA9IGNjLnJlbW92ZVNlbGYoKTtcbiAqL1xuY2MucmVtb3ZlU2VsZiA9IGZ1bmN0aW9uKGlzTmVlZENsZWFuVXApe1xuICAgIHJldHVybiBuZXcgY2MuUmVtb3ZlU2VsZihpc05lZWRDbGVhblVwKTtcbn07XG5cbi8qXG4gKiBDcmVhdGUgYW4gYWN0aW9uIHRvIGRlc3Ryb3kgc2VsZi5cbiAqIEBjbGFzcyBEZXN0cm95U2VsZlxuICogQGV4dGVuZHMgQWN0aW9uSW5zdGFudFxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgZGVzdHJveVNlbGZBY3Rpb24gPSBuZXcgY2MuRGVzdHJveVNlbGYoKTtcbiAqL1xuY2MuRGVzdHJveVNlbGYgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkRlc3Ryb3lTZWxmJyxcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnN0YW50LFxuXG4gICAgdXBkYXRlICgpIHtcbiAgICAgICAgdGhpcy50YXJnZXQuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICByZXZlcnNlICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5EZXN0cm95U2VsZigpO1xuICAgIH0sXG5cbiAgICBjbG9uZSAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgY2MuRGVzdHJveVNlbGYoKTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiAhI2VuIERlc3Ryb3kgc2VsZlxuICogISN6aCDliJvlu7rkuIDkuKrplIDmr4Hoh6rouqvnmoTliqjkvZzjgIJcbiAqIEBtZXRob2QgZGVzdHJveVNlbGZcbiAqIEByZXR1cm4ge0FjdGlvbkluc3RhbnR9XG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBkZXN0cm95U2VsZkFjdGlvbiA9IGNjLmRlc3Ryb3lTZWxmKCk7XG4gKi9cbmNjLmRlc3Ryb3lTZWxmID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBuZXcgY2MuRGVzdHJveVNlbGYoKTtcbn07XG5cbi8qXG4gKiBGbGlwcyB0aGUgc3ByaXRlIGhvcml6b250YWxseS5cbiAqIEBjbGFzcyBGbGlwWFxuICogQGV4dGVuZHMgQWN0aW9uSW5zdGFudFxuICogQHBhcmFtIHtCb29sZWFufSBmbGlwIEluZGljYXRlIHdoZXRoZXIgdGhlIHRhcmdldCBzaG91bGQgYmUgZmxpcHBlZCBvciBub3RcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIGZsaXBYQWN0aW9uID0gbmV3IGNjLkZsaXBYKHRydWUpO1xuICovXG5jYy5GbGlwWCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuRmxpcFgnLFxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkluc3RhbnQsXG5cbiAgICBjdG9yOmZ1bmN0aW9uKGZsaXApe1xuICAgICAgICB0aGlzLl9mbGlwcGVkWCA9IGZhbHNlO1xuXHRcdGZsaXAgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmluaXRXaXRoRmxpcFgoZmxpcCk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogaW5pdGlhbGl6ZXMgdGhlIGFjdGlvbiB3aXRoIGEgc2V0IGZsaXBYLlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZmxpcFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaW5pdFdpdGhGbGlwWDpmdW5jdGlvbiAoZmxpcCkge1xuICAgICAgICB0aGlzLl9mbGlwcGVkWCA9IGZsaXA7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6ZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIHRoaXMudGFyZ2V0LnNjYWxlWCA9IE1hdGguYWJzKHRoaXMudGFyZ2V0LnNjYWxlWCkgKiAodGhpcy5fZmxpcHBlZFggPyAtMSA6IDEpO1xuICAgIH0sXG5cbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5GbGlwWCghdGhpcy5fZmxpcHBlZFgpO1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbigpe1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLkZsaXBYKCk7XG4gICAgICAgIGFjdGlvbi5pbml0V2l0aEZsaXBYKHRoaXMuX2ZsaXBwZWRYKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9XG59KTtcblxuLyoqXG4gKiAhI2VuIENyZWF0ZSBhIEZsaXBYIGFjdGlvbiB0byBmbGlwIG9yIHVuZmxpcCB0aGUgdGFyZ2V0LlxuICogISN6aCBY6L2057+76L2s44CCXG4gKiBAbWV0aG9kIGZsaXBYXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGZsaXAgSW5kaWNhdGUgd2hldGhlciB0aGUgdGFyZ2V0IHNob3VsZCBiZSBmbGlwcGVkIG9yIG5vdFxuICogQHJldHVybiB7QWN0aW9uSW5zdGFudH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmxpcFhBY3Rpb24gPSBjYy5mbGlwWCh0cnVlKTtcbiAqL1xuY2MuZmxpcFggPSBmdW5jdGlvbiAoZmxpcCkge1xuICAgIHJldHVybiBuZXcgY2MuRmxpcFgoZmxpcCk7XG59O1xuXG4vKlxuICogRmxpcHMgdGhlIHNwcml0ZSB2ZXJ0aWNhbGx5XG4gKiBAY2xhc3MgRmxpcFlcbiAqIEBleHRlbmRzIEFjdGlvbkluc3RhbnRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZmxpcFxuICogQGV4YW1wbGVcbiAqIHZhciBmbGlwWUFjdGlvbiA9IG5ldyBjYy5GbGlwWSh0cnVlKTtcbiAqL1xuY2MuRmxpcFkgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkZsaXBZJyxcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnN0YW50LFxuXG4gICAgY3RvcjogZnVuY3Rpb24oZmxpcCl7XG4gICAgICAgIHRoaXMuX2ZsaXBwZWRZID0gZmFsc2U7XG5cdFx0ZmxpcCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuaW5pdFdpdGhGbGlwWShmbGlwKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBpbml0aWFsaXplcyB0aGUgYWN0aW9uIHdpdGggYSBzZXQgZmxpcFkuXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBmbGlwXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpbml0V2l0aEZsaXBZOmZ1bmN0aW9uIChmbGlwKSB7XG4gICAgICAgIHRoaXMuX2ZsaXBwZWRZID0gZmxpcDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIHVwZGF0ZTpmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgdGhpcy50YXJnZXQuc2NhbGVZID0gTWF0aC5hYnModGhpcy50YXJnZXQuc2NhbGVZKSAqICh0aGlzLl9mbGlwcGVkWSA/IC0xIDogMSk7XG4gICAgfSxcblxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IGNjLkZsaXBZKCF0aGlzLl9mbGlwcGVkWSk7XG4gICAgfSxcblxuICAgIGNsb25lOmZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuRmxpcFkoKTtcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRmxpcFkodGhpcy5fZmxpcHBlZFkpO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW4gQ3JlYXRlIGEgRmxpcFkgYWN0aW9uIHRvIGZsaXAgb3IgdW5mbGlwIHRoZSB0YXJnZXQuXG4gKiAhI3poIFnovbTnv7vovazjgIJcbiAqIEBtZXRob2QgZmxpcFlcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZmxpcFxuICogQHJldHVybiB7QWN0aW9uSW5zdGFudH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgZmxpcFlBY3Rpb24gPSBjYy5mbGlwWSh0cnVlKTtcbiAqL1xuY2MuZmxpcFkgPSBmdW5jdGlvbiAoZmxpcCkge1xuICAgIHJldHVybiBuZXcgY2MuRmxpcFkoZmxpcCk7XG59O1xuXG4vKlxuICogUGxhY2VzIHRoZSBub2RlIGluIGEgY2VydGFpbiBwb3NpdGlvblxuICogQGNsYXNzIFBsYWNlXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnN0YW50XG4gKiBAcGFyYW0ge1ZlYzJ8TnVtYmVyfSBwb3NcbiAqIEBwYXJhbSB7TnVtYmVyfSBbeV1cbiAqIEBleGFtcGxlXG4gKiB2YXIgcGxhY2VBY3Rpb24gPSBuZXcgY2MuUGxhY2UoY2MudjIoMjAwLCAyMDApKTtcbiAqIHZhciBwbGFjZUFjdGlvbiA9IG5ldyBjYy5QbGFjZSgyMDAsIDIwMCk7XG4gKi9cbmNjLlBsYWNlID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5QbGFjZScsXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uSW5zdGFudCxcblxuICAgIGN0b3I6ZnVuY3Rpb24ocG9zLCB5KXtcbiAgICAgICAgdGhpcy5feCA9IDA7XG5cdCAgICB0aGlzLl95ID0gMDtcblxuXHRcdGlmIChwb3MgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0aWYgKHBvcy54ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0eSA9IHBvcy55O1xuXHRcdFx0XHRwb3MgPSBwb3MueDtcblx0XHRcdH1cblx0XHRcdHRoaXMuaW5pdFdpdGhQb3NpdGlvbihwb3MsIHkpO1xuXHRcdH1cbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBJbml0aWFsaXplcyBhIFBsYWNlIGFjdGlvbiB3aXRoIGEgcG9zaXRpb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpbml0V2l0aFBvc2l0aW9uOiBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6ZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIHRoaXMudGFyZ2V0LnNldFBvc2l0aW9uKHRoaXMuX3gsIHRoaXMuX3kpO1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbigpe1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLlBsYWNlKCk7XG4gICAgICAgIGFjdGlvbi5pbml0V2l0aFBvc2l0aW9uKHRoaXMuX3gsIHRoaXMuX3kpO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW4gQ3JlYXRlcyBhIFBsYWNlIGFjdGlvbiB3aXRoIGEgcG9zaXRpb24uXG4gKiAhI3poIOaUvue9ruWcqOebruagh+S9jee9ruOAglxuICogQG1ldGhvZCBwbGFjZVxuICogQHBhcmFtIHtWZWMyfE51bWJlcn0gcG9zXG4gKiBAcGFyYW0ge051bWJlcn0gW3ldXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnN0YW50fVxuICogQGV4YW1wbGVcbiAqIC8vIGV4YW1wbGVcbiAqIHZhciBwbGFjZUFjdGlvbiA9IGNjLnBsYWNlKGNjLnYyKDIwMCwgMjAwKSk7XG4gKiB2YXIgcGxhY2VBY3Rpb24gPSBjYy5wbGFjZSgyMDAsIDIwMCk7XG4gKi9cbmNjLnBsYWNlID0gZnVuY3Rpb24gKHBvcywgeSkge1xuICAgIHJldHVybiBuZXcgY2MuUGxhY2UocG9zLCB5KTtcbn07XG5cblxuLypcbiAqIENhbGxzIGEgJ2NhbGxiYWNrJy5cbiAqIEBjbGFzcyBDYWxsRnVuY1xuICogQGV4dGVuZHMgQWN0aW9uSW5zdGFudFxuICogQHBhcmFtIHtmdW5jdGlvbn0gc2VsZWN0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBbc2VsZWN0b3JUYXJnZXQ9bnVsbF1cbiAqIEBwYXJhbSB7Kn0gW2RhdGE9bnVsbF0gZGF0YSBmb3IgZnVuY3Rpb24sIGl0IGFjY2VwdHMgYWxsIGRhdGEgdHlwZXMuXG4gKiBAZXhhbXBsZVxuICogLy8gZXhhbXBsZVxuICogLy8gQ2FsbEZ1bmMgd2l0aG91dCBkYXRhXG4gKiB2YXIgZmluaXNoID0gbmV3IGNjLkNhbGxGdW5jKHRoaXMucmVtb3ZlU3ByaXRlLCB0aGlzKTtcbiAqXG4gKiAvLyBDYWxsRnVuYyB3aXRoIGRhdGFcbiAqIHZhciBmaW5pc2ggPSBuZXcgY2MuQ2FsbEZ1bmModGhpcy5yZW1vdmVGcm9tUGFyZW50QW5kQ2xlYW51cCwgdGhpcywgIHRydWUpO1xuICovXG5jYy5DYWxsRnVuYyA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuQ2FsbEZ1bmMnLFxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkluc3RhbnQsXG5cbiAgICAvKlxuICAgICAqIENvbnN0cnVjdG9yIGZ1bmN0aW9uLCBvdmVycmlkZSBpdCB0byBleHRlbmQgdGhlIGNvbnN0cnVjdGlvbiBiZWhhdmlvciwgcmVtZW1iZXIgdG8gY2FsbCBcInRoaXMuX3N1cGVyKClcIiBpbiB0aGUgZXh0ZW5kZWQgXCJjdG9yXCIgZnVuY3Rpb24uIDxiciAvPlxuXHQgKiBDcmVhdGVzIGEgQ2FsbEZ1bmMgYWN0aW9uIHdpdGggdGhlIGNhbGxiYWNrLlxuXHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBzZWxlY3RvclxuXHQgKiBAcGFyYW0ge29iamVjdH0gW3NlbGVjdG9yVGFyZ2V0PW51bGxdXG5cdCAqIEBwYXJhbSB7Kn0gW2RhdGE9bnVsbF0gZGF0YSBmb3IgZnVuY3Rpb24sIGl0IGFjY2VwdHMgYWxsIGRhdGEgdHlwZXMuXG5cdCAqL1xuICAgIGN0b3I6ZnVuY3Rpb24oc2VsZWN0b3IsIHNlbGVjdG9yVGFyZ2V0LCBkYXRhKXtcbiAgICAgICAgdGhpcy5fc2VsZWN0b3JUYXJnZXQgPSBudWxsO1xuICAgICAgICB0aGlzLl9mdW5jdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLmluaXRXaXRoRnVuY3Rpb24oc2VsZWN0b3IsIHNlbGVjdG9yVGFyZ2V0LCBkYXRhKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgYWN0aW9uIHdpdGggYSBmdW5jdGlvbiBvciBmdW5jdGlvbiBhbmQgaXRzIHRhcmdldFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtvYmplY3R8TnVsbH0gc2VsZWN0b3JUYXJnZXRcbiAgICAgKiBAcGFyYW0geyp8TnVsbH0gW2RhdGFdIGRhdGEgZm9yIGZ1bmN0aW9uLCBpdCBhY2NlcHRzIGFsbCBkYXRhIHR5cGVzLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaW5pdFdpdGhGdW5jdGlvbjpmdW5jdGlvbiAoc2VsZWN0b3IsIHNlbGVjdG9yVGFyZ2V0LCBkYXRhKSB7XG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5fZnVuY3Rpb24gPSBzZWxlY3RvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZWN0b3JUYXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdG9yVGFyZ2V0ID0gc2VsZWN0b3JUYXJnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogZXhlY3V0ZSB0aGUgZnVuY3Rpb24uXG4gICAgICovXG4gICAgZXhlY3V0ZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9mdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fZnVuY3Rpb24uY2FsbCh0aGlzLl9zZWxlY3RvclRhcmdldCwgdGhpcy50YXJnZXQsIHRoaXMuX2RhdGEpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZTpmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgdGhpcy5leGVjdXRlKCk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogR2V0IHNlbGVjdG9yVGFyZ2V0LlxuICAgICAqIEByZXR1cm4ge29iamVjdH1cbiAgICAgKi9cbiAgICBnZXRUYXJnZXRDYWxsYmFjazpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RvclRhcmdldDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBTZXQgc2VsZWN0b3JUYXJnZXQuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHNlbFxuICAgICAqL1xuICAgIHNldFRhcmdldENhbGxiYWNrOmZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgaWYgKHNlbCAhPT0gdGhpcy5fc2VsZWN0b3JUYXJnZXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZWxlY3RvclRhcmdldClcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RvclRhcmdldCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RvclRhcmdldCA9IHNlbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbigpe1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLkNhbGxGdW5jKCk7XG4gICAgICAgIGFjdGlvbi5pbml0V2l0aEZ1bmN0aW9uKHRoaXMuX2Z1bmN0aW9uLCB0aGlzLl9zZWxlY3RvclRhcmdldCwgdGhpcy5fZGF0YSk7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfVxufSk7XG5cbi8qKlxuICogISNlbiBDcmVhdGVzIHRoZSBhY3Rpb24gd2l0aCB0aGUgY2FsbGJhY2suXG4gKiAhI3poIOaJp+ihjOWbnuiwg+WHveaVsOOAglxuICogQG1ldGhvZCBjYWxsRnVuY1xuICogQHBhcmFtIHtmdW5jdGlvbn0gc2VsZWN0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBbc2VsZWN0b3JUYXJnZXQ9bnVsbF1cbiAqIEBwYXJhbSB7Kn0gW2RhdGE9bnVsbF0gLSBkYXRhIGZvciBmdW5jdGlvbiwgaXQgYWNjZXB0cyBhbGwgZGF0YSB0eXBlcy5cbiAqIEByZXR1cm4ge0FjdGlvbkluc3RhbnR9XG4gKiBAZXhhbXBsZVxuICogLy8gZXhhbXBsZVxuICogLy8gQ2FsbEZ1bmMgd2l0aG91dCBkYXRhXG4gKiB2YXIgZmluaXNoID0gY2MuY2FsbEZ1bmModGhpcy5yZW1vdmVTcHJpdGUsIHRoaXMpO1xuICpcbiAqIC8vIENhbGxGdW5jIHdpdGggZGF0YVxuICogdmFyIGZpbmlzaCA9IGNjLmNhbGxGdW5jKHRoaXMucmVtb3ZlRnJvbVBhcmVudEFuZENsZWFudXAsIHRoaXMuX2dyb3NzaW5pLCAgdHJ1ZSk7XG4gKi9cbmNjLmNhbGxGdW5jID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBzZWxlY3RvclRhcmdldCwgZGF0YSkge1xuICAgIHJldHVybiBuZXcgY2MuQ2FsbEZ1bmMoc2VsZWN0b3IsIHNlbGVjdG9yVGFyZ2V0LCBkYXRhKTtcbn07XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==