
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/actions/tween.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _bezier = require("../animation/bezier");

var _tweenID = 0;
var TweenAction = cc.Class({
  name: 'cc.TweenAction',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, props, opts) {
    this._opts = opts = opts || Object.create(null);
    this._props = Object.create(null); // global easing or progress used for this action

    opts.progress = opts.progress || this.progress;

    if (opts.easing && typeof opts.easing === 'string') {
      var easingName = opts.easing;
      opts.easing = cc.easing[easingName];
      !opts.easing && cc.warnID(1031, easingName);
    }

    var relative = this._opts.relative;

    for (var name in props) {
      var value = props[name]; // property may have custom easing or progress function

      var easing = void 0,
          progress = void 0;

      if (value.value !== undefined && (value.easing || value.progress)) {
        if (typeof value.easing === 'string') {
          easing = cc.easing[value.easing];
          !easing && cc.warnID(1031, value.easing);
        } else {
          easing = value.easing;
        }

        progress = value.progress;
        value = value.value;
      }

      var isNumber = typeof value === 'number';

      if (!isNumber && (!value.lerp || relative && !value.add && !value.mul || !value.clone)) {
        cc.warn("Can not animate " + name + " property, because it do not have [lerp, (add|mul), clone] function.");
        continue;
      }

      var prop = Object.create(null);
      prop.value = value;
      prop.easing = easing;
      prop.progress = progress;
      this._props[name] = prop;
    }

    this._originProps = props;
    this.initWithDuration(duration);
  },
  clone: function clone() {
    var action = new TweenAction(this._duration, this._originProps, this._opts);

    this._cloneDecoration(action);

    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var relative = !!this._opts.relative;
    var props = this._props;

    for (var name in props) {
      var value = target[name];
      var prop = props[name];

      if (typeof value === 'number') {
        prop.start = value;
        prop.current = value;
        prop.end = relative ? value + prop.value : prop.value;
      } else {
        prop.start = value.clone();
        prop.current = value.clone();
        prop.end = relative ? (value.add || value.mul).call(value, prop.value) : prop.value;
      }
    }
  },
  update: function update(t) {
    var opts = this._opts;
    var easingTime = t;
    if (opts.easing) easingTime = opts.easing(t);
    var target = this.target;
    if (!target) return;
    var props = this._props;
    var progress = this._opts.progress;

    for (var name in props) {
      var prop = props[name];
      var time = prop.easing ? prop.easing(t) : easingTime;
      var current = prop.current = (prop.progress || progress)(prop.start, prop.end, prop.current, time);
      target[name] = current;
    }
  },
  progress: function progress(start, end, current, t) {
    if (typeof start === 'number') {
      current = start + (end - start) * t;
    } else {
      start.lerp(end, t, current);
    }

    return current;
  }
});
var SetAction = cc.Class({
  name: 'cc.SetAction',
  "extends": cc.ActionInstant,
  ctor: function ctor(props) {
    this._props = {};
    props !== undefined && this.init(props);
  },
  init: function init(props) {
    for (var name in props) {
      this._props[name] = props[name];
    }

    return true;
  },
  update: function update() {
    var props = this._props;
    var target = this.target;

    for (var name in props) {
      target[name] = props[name];
    }
  },
  clone: function clone() {
    var action = new SetAction();
    action.init(this._props);
    return action;
  }
});
/**
 * !#en
 * Tween provide a simple and flexible way to create action.
 * Tween's api is more flexible than cc.Action:
 *  - Support creating an action sequence in chained api,
 *  - Support animate any objects' any properties, not limited to node's properties.
 *    By contrast, cc.Action needs to create a new action class to support new node property.
 *  - Support working with cc.Action,
 *  - Support easing and progress function.
 * !#zh
 * Tween 提供了一个简单灵活的方法来创建 action。
 * 相对于 Cocos 传统的 cc.Action，cc.Tween 在创建动画上要灵活非常多：
 *  - 支持以链式结构的方式创建一个动画序列。
 *  - 支持对任意对象的任意属性进行缓动，不再局限于节点上的属性，而 cc.Action 添加一个属性的支持时还需要添加一个新的 action 类型。
 *  - 支持与 cc.Action 混用
 *  - 支持设置 {{#crossLink "Easing"}}{{/crossLink}} 或者 progress 函数
 * @class Tween
 * @example
 * cc.tween(node)
 *   .to(1, {scale: 2, position: cc.v3(100, 100, 100)})
 *   .call(() => { console.log('This is a callback'); })
 *   .by(1, {scale: 3, position: cc.v3(200, 200, 200)}, {easing: 'sineOutIn'})
 *   .start(cc.find('Canvas/cocos'));
 * @typescript Tween<T = any>
 */

function Tween(target) {
  this._actions = [];
  this._finalAction = null;
  this._target = target;
  this._tag = cc.Action.TAG_INVALID;
}
/**
 * @method constructor
 * @param {Object} [target]
 */

/**
 * !#en Stop all tweens
 * !#zh 停止所有缓动
 * @method stopAll
 * @static
 */


Tween.stopAll = function () {
  cc.director.getActionManager().removeAllActions();
};
/**
 * !#en Stop all tweens by tag
 * !#zh 停止所有指定标签的缓动
 * @method stopAllByTag
 * @static
 * @param {number} tag
 */


Tween.stopAllByTag = function (tag) {
  cc.director.getActionManager().removeActionByTag(tag);
};
/**
 * !#en Stop all tweens by target
 * !#zh 停止所有指定对象的缓动
 * @method stopAllByTarget
 * @static
 * @param {Object} target
 */


Tween.stopAllByTarget = function (target) {
  cc.director.getActionManager().removeAllActionsFromTarget(target);
};
/**
 * !#en
 * Insert an action or tween to this sequence
 * !#zh
 * 插入一个 action 或者 tween 到队列中
 * @method then 
 * @param {Action|Tween} other
 * @return {Tween}
 * @typescript then(other: Action|Tween<T>): Tween<T>
 */


Tween.prototype.then = function (other) {
  if (other instanceof cc.Action) {
    this._actions.push(other.clone());
  } else {
    this._actions.push(other._union());
  }

  return this;
};
/**
 * !#en
 * Set tween target
 * !#zh
 * 设置 tween 的 target
 * @method target
 * @param {Object} target
 * @return {Tween}
 * @typescript target(target: any): Tween<T>
 */


Tween.prototype.target = function (target) {
  this._target = target;
  return this;
};
/**
 * !#en
 * Start this tween
 * !#zh
 * 运行当前 tween
 * @method start
 * @return {Tween}
 * @typescript start(): Tween<T>
 */


Tween.prototype.start = function () {
  var target = this._target;

  if (!target) {
    cc.warn('Please set target to tween first');
    return this;
  }

  if (target instanceof cc.Object && !target.isValid) {
    return;
  }

  if (this._finalAction) {
    cc.director.getActionManager().removeAction(this._finalAction);
  }

  this._finalAction = this._union();

  if (target._id === undefined) {
    target._id = ++_tweenID;
  }

  this._finalAction.setTag(this._tag);

  cc.director.getActionManager().addAction(this._finalAction, target, false);
  return this;
};
/**
 * !#en
 * Stop this tween
 * !#zh
 * 停止当前 tween
 * @method stop
 * @return {Tween}
 * @typescript stop(): Tween<T>
 */


Tween.prototype.stop = function () {
  if (this._finalAction) {
    cc.director.getActionManager().removeAction(this._finalAction);
  }

  return this;
};
/**
 * !#en Sets tween tag
 * !#zh 设置缓动的标签
 * @method tag
 * @param {number} tag
 * @return {Tween}
 * @typescript tag(tag: number): Tween<T>
 */


Tween.prototype.tag = function (tag) {
  this._tag = tag;
  return this;
};
/**
 * !#en
 * Clone a tween
 * !#zh
 * 克隆当前 tween
 * @method clone
 * @param {Object} [target]
 * @return {Tween}
 * @typescript clone(target?: any): Tween<T>
 */


Tween.prototype.clone = function (target) {
  var action = this._union();

  return cc.tween(target).then(action.clone());
};
/**
 * !#en
 * Integrate all previous actions to an action.
 * !#zh
 * 将之前所有的 action 整合为一个 action。
 * @method union
 * @return {Tween}
 * @typescritp union(): Tween<T>
 */


Tween.prototype.union = function () {
  var action = this._union();

  this._actions.length = 0;

  this._actions.push(action);

  return this;
};

Tween.prototype._union = function () {
  var actions = this._actions;

  if (actions.length === 1) {
    actions = actions[0];
  } else {
    actions = cc.sequence(actions);
  }

  return actions;
};

Object.assign(Tween.prototype, {
  /**
   * !#en Sets target's position property according to the bezier curve.
   * !#zh 按照贝塞尔路径设置目标的 position 属性。
   * @method bezierTo
   * @param {number} duration
   * @param {cc.Vec2} c1
   * @param {cc.Vec2} c2
   * @param {cc.Vec2} to
   * @return {Tween}
   * @typescript bezierTo(duration: number, c1: Vec2, c2: Vec2, to: Vec2): Tween<T>
   */
  bezierTo: function bezierTo(duration, c1, c2, to, opts) {
    var c0x = c1.x,
        c0y = c1.y,
        c1x = c2.x,
        c1y = c2.y;
    opts = opts || Object.create(null);

    opts.progress = function (start, end, current, t) {
      current.x = (0, _bezier.bezier)(start.x, c0x, c1x, end.x, t);
      current.y = (0, _bezier.bezier)(start.y, c0y, c1y, end.y, t);
      return current;
    };

    return this.to(duration, {
      position: to
    }, opts);
  },

  /**
   * !#en Sets target's position property according to the bezier curve.
   * !#zh 按照贝塞尔路径设置目标的 position 属性。
   * @method bezierBy
   * @param {number} duration
   * @param {cc.Vec2} c1
   * @param {cc.Vec2} c2
   * @param {cc.Vec2} to
   * @return {Tween}
   * @typescript bezierBy(duration: number, c1: Vec2, c2: Vec2, to: Vec2): Tween<T>
   */
  bezierBy: function bezierBy(duration, c1, c2, to, opts) {
    var c0x = c1.x,
        c0y = c1.y,
        c1x = c2.x,
        c1y = c2.y;
    opts = opts || Object.create(null);

    opts.progress = function (start, end, current, t) {
      var sx = start.x,
          sy = start.y;
      current.x = (0, _bezier.bezier)(sx, c0x + sx, c1x + sx, end.x, t);
      current.y = (0, _bezier.bezier)(sy, c0y + sy, c1y + sy, end.y, t);
      return current;
    };

    return this.by(duration, {
      position: to
    }, opts);
  },

  /**
   * !#en Flips target's scaleX
   * !#zh 翻转目标的 scaleX 属性
   * @method flipX
   * @return {Tween}
   * @typescript flipX(): Tween<T>
   */
  flipX: function flipX() {
    var _this = this;

    return this.call(function () {
      _this._target.scaleX *= -1;
    }, this);
  },

  /**
   * !#en Flips target's scaleY
   * !#zh 翻转目标的 scaleY 属性
   * @method flipY
   * @return {Tween}
   * @typescript flipY(): Tween<T>
   */
  flipY: function flipY() {
    var _this2 = this;

    return this.call(function () {
      _this2._target.scaleY *= -1;
    }, this);
  },

  /**
   * !#en Blinks target by set target's opacity property
   * !#zh 通过设置目标的 opacity 属性达到闪烁效果
   * @method blink
   * @param {number} duration
   * @param {number} times
   * @param {Object} [opts]
   * @param {Function} [opts.progress]
   * @param {Function|String} [opts.easing]
   * @return {Tween}
   * @typescript blink(duration: number, times: number, opts?: {progress?: Function; easing?: Function|string; }): Tween<T>
   */
  blink: function blink(duration, times, opts) {
    var slice = 1.0 / times;
    opts = opts || Object.create(null);

    opts.progress = function (start, end, current, t) {
      if (t >= 1) {
        return start;
      } else {
        var m = t % slice;
        return m > slice / 2 ? 255 : 0;
      }
    };

    return this.to(duration, {
      opacity: 1
    }, opts);
  }
});
var tmp_args = [];

function wrapAction(action) {
  return function () {
    tmp_args.length = 0;

    for (var l = arguments.length, i = 0; i < l; i++) {
      var arg = tmp_args[i] = arguments[i];

      if (arg instanceof Tween) {
        tmp_args[i] = arg._union();
      }
    }

    return action.apply(this, tmp_args);
  };
}

var actions = {
  /**
   * !#en
   * Add an action which calculate with absolute value
   * !#zh
   * 添加一个对属性进行绝对值计算的 action
   * @method to
   * @param {Number} duration
   * @param {Object} props - {scale: 2, position: cc.v3(100, 100, 100)}
   * @param {Object} [opts]
   * @param {Function} [opts.progress]
   * @param {Function|String} [opts.easing]
   * @return {Tween}
   * @typescript
   * to <OPTS extends Partial<{progress: Function, easing: Function|String}>> (duration: number, props: ConstructorType<T>, opts?: OPTS) : Tween<T>
   */
  to: function to(duration, props, opts) {
    opts = opts || Object.create(null);
    opts.relative = false;
    return new TweenAction(duration, props, opts);
  },

  /**
   * !#en
   * Add an action which calculate with relative value
   * !#zh
   * 添加一个对属性进行相对值计算的 action
   * @method by
   * @param {Number} duration
   * @param {Object} props - {scale: 2, position: cc.v3(100, 100, 100)}
   * @param {Object} [opts]
   * @param {Function} [opts.progress]
   * @param {Function|String} [opts.easing]
   * @return {Tween}
   * @typescript
   * by <OPTS extends Partial<{progress: Function, easing: Function|String}>> (duration: number, props: ConstructorType<T>, opts?: OPTS) : Tween<T>
   */
  by: function by(duration, props, opts) {
    opts = opts || Object.create(null);
    opts.relative = true;
    return new TweenAction(duration, props, opts);
  },

  /**
   * !#en
   * Directly set target properties
   * !#zh
   * 直接设置 target 的属性
   * @method set
   * @param {Object} props
   * @return {Tween}
   * @typescript
   * set (props: ConstructorType<T>) : Tween<T>
   */
  set: function set(props) {
    return new SetAction(props);
  },

  /**
   * !#en
   * Add an delay action
   * !#zh
   * 添加一个延时 action
   * @method delay
   * @param {Number} duration
   * @return {Tween}
   * @typescript delay(duration: number): Tween<T>
   */
  delay: cc.delayTime,

  /**
   * !#en
   * Add an callback action
   * !#zh
   * 添加一个回调 action
   * @method call
   * @param {Function} callback
   * @return {Tween}
   * @typescript call(callback: Function): Tween<T>
   */
  call: cc.callFunc,

  /**
   * !#en
   * Add an hide action
   * !#zh
   * 添加一个隐藏 action
   * @method hide
   * @return {Tween}
   * @typescript hide(): Tween<T>
   */
  hide: cc.hide,

  /**
   * !#en
   * Add an show action
   * !#zh
   * 添加一个显示 action
   * @method show
   * @return {Tween}
   * @typescript show(): Tween<T>
   */
  show: cc.show,

  /**
   * !#en
   * Add an removeSelf action
   * !#zh
   * 添加一个移除自己 action
   * @method removeSelf
   * @return {Tween}
   * @typescript removeSelf(): Tween<T>
   */
  removeSelf: cc.removeSelf,

  /**
   * !#en
   * Add an sequence action
   * !#zh
   * 添加一个队列 action
   * @method sequence
   * @param {Action|Tween} action
   * @param {Action|Tween} ...actions
   * @return {Tween}
   * @typescript sequence(action: Action|Tween<T>, ...actions: (Action|Tween<T>)[]): Tween<T>
   */
  sequence: wrapAction(cc.sequence),

  /**
   * !#en
   * Add an parallel action
   * !#zh
   * 添加一个并行 action
   * @method parallel
   * @param {Action|Tween} action
   * @param {Action|Tween} ...actions
   * @return {Tween}
   * @typescript parallel(action: Action|Tween<T>, ...actions: (Action|Tween<T>)[]): Tween<T>
   */
  parallel: wrapAction(cc.spawn)
}; // these action will use previous action as their parameters

var previousAsInputActions = {
  /**
   * !#en
   * Add an repeat action.
   * This action will integrate before actions to a sequence action as their parameters.
   * !#zh
   * 添加一个重复 action，这个 action 会将前一个动作作为他的参数。
   * @method repeat
   * @param {Number} repeatTimes
   * @param {Action | Tween} [action]
   * @return {Tween}
   * @typescript repeat(repeatTimes: number, action?: Action|Tween<T>): Tween<T>
   */
  repeat: cc.repeat,

  /**
   * !#en
   * Add an repeat forever action
   * This action will integrate before actions to a sequence action as their parameters.
   * !#zh
   * 添加一个永久重复 action，这个 action 会将前一个动作作为他的参数。
   * @method repeatForever
   * @param {Action | Tween} [action]
   * @return {Tween}
   * @typescript repeatForever(action?: Action|Tween<T>): Tween<T>
   */
  repeatForever: function repeatForever(action) {
    // TODO: fixed with cc.repeatForever
    return cc.repeat(action, 10e8);
  },

  /**
   * !#en
   * Add an reverse time action.
   * This action will integrate before actions to a sequence action as their parameters.
   * !#zh
   * 添加一个倒置时间 action，这个 action 会将前一个动作作为他的参数。
   * @method reverseTime
   * @param {Action | Tween} [action]
   * @return {Tween}
   * @typescript reverseTime(action?: Action|Tween<T>): Tween<T>
   */
  reverseTime: cc.reverseTime
};
var keys = Object.keys(actions);

var _loop = function _loop(i) {
  var key = keys[i];

  Tween.prototype[key] = function () {
    var action = actions[key].apply(this, arguments);

    this._actions.push(action);

    return this;
  };
};

for (var i = 0; i < keys.length; i++) {
  _loop(i);
}

keys = Object.keys(previousAsInputActions);

var _loop2 = function _loop2(_i) {
  var key = keys[_i];

  Tween.prototype[key] = function () {
    var actions = this._actions;
    var action = arguments[arguments.length - 1];
    var length = arguments.length - 1;

    if (action instanceof cc.Tween) {
      action = action._union();
    } else if (!(action instanceof cc.Action)) {
      action = actions[actions.length - 1];
      actions.length -= 1;
      length += 1;
    }

    var args = [action];

    for (var _i2 = 0; _i2 < length; _i2++) {
      args.push(arguments[_i2]);
    }

    action = previousAsInputActions[key].apply(this, args);
    actions.push(action);
    return this;
  };
};

for (var _i = 0; _i < keys.length; _i++) {
  _loop2(_i);
}
/**
 * @module cc
 */

/**
 * @method tween
 * @param {Object} [target] - the target to animate
 * @return {Tween}
 * @typescript
 * tween<T> (target?: T) : Tween<T>
 */


cc.tween = function (target) {
  return new Tween(target);
};

cc.Tween = Tween;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9hY3Rpb25zL3R3ZWVuLmpzIl0sIm5hbWVzIjpbIl90d2VlbklEIiwiVHdlZW5BY3Rpb24iLCJjYyIsIkNsYXNzIiwibmFtZSIsIkFjdGlvbkludGVydmFsIiwiY3RvciIsImR1cmF0aW9uIiwicHJvcHMiLCJvcHRzIiwiX29wdHMiLCJPYmplY3QiLCJjcmVhdGUiLCJfcHJvcHMiLCJwcm9ncmVzcyIsImVhc2luZyIsImVhc2luZ05hbWUiLCJ3YXJuSUQiLCJyZWxhdGl2ZSIsInZhbHVlIiwidW5kZWZpbmVkIiwiaXNOdW1iZXIiLCJsZXJwIiwiYWRkIiwibXVsIiwiY2xvbmUiLCJ3YXJuIiwicHJvcCIsIl9vcmlnaW5Qcm9wcyIsImluaXRXaXRoRHVyYXRpb24iLCJhY3Rpb24iLCJfZHVyYXRpb24iLCJfY2xvbmVEZWNvcmF0aW9uIiwic3RhcnRXaXRoVGFyZ2V0IiwidGFyZ2V0IiwicHJvdG90eXBlIiwiY2FsbCIsInN0YXJ0IiwiY3VycmVudCIsImVuZCIsInVwZGF0ZSIsInQiLCJlYXNpbmdUaW1lIiwidGltZSIsIlNldEFjdGlvbiIsIkFjdGlvbkluc3RhbnQiLCJpbml0IiwiVHdlZW4iLCJfYWN0aW9ucyIsIl9maW5hbEFjdGlvbiIsIl90YXJnZXQiLCJfdGFnIiwiQWN0aW9uIiwiVEFHX0lOVkFMSUQiLCJzdG9wQWxsIiwiZGlyZWN0b3IiLCJnZXRBY3Rpb25NYW5hZ2VyIiwicmVtb3ZlQWxsQWN0aW9ucyIsInN0b3BBbGxCeVRhZyIsInRhZyIsInJlbW92ZUFjdGlvbkJ5VGFnIiwic3RvcEFsbEJ5VGFyZ2V0IiwicmVtb3ZlQWxsQWN0aW9uc0Zyb21UYXJnZXQiLCJ0aGVuIiwib3RoZXIiLCJwdXNoIiwiX3VuaW9uIiwiaXNWYWxpZCIsInJlbW92ZUFjdGlvbiIsIl9pZCIsInNldFRhZyIsImFkZEFjdGlvbiIsInN0b3AiLCJ0d2VlbiIsInVuaW9uIiwibGVuZ3RoIiwiYWN0aW9ucyIsInNlcXVlbmNlIiwiYXNzaWduIiwiYmV6aWVyVG8iLCJjMSIsImMyIiwidG8iLCJjMHgiLCJ4IiwiYzB5IiwieSIsImMxeCIsImMxeSIsInBvc2l0aW9uIiwiYmV6aWVyQnkiLCJzeCIsInN5IiwiYnkiLCJmbGlwWCIsInNjYWxlWCIsImZsaXBZIiwic2NhbGVZIiwiYmxpbmsiLCJ0aW1lcyIsInNsaWNlIiwibSIsIm9wYWNpdHkiLCJ0bXBfYXJncyIsIndyYXBBY3Rpb24iLCJsIiwiYXJndW1lbnRzIiwiaSIsImFyZyIsImFwcGx5Iiwic2V0IiwiZGVsYXkiLCJkZWxheVRpbWUiLCJjYWxsRnVuYyIsImhpZGUiLCJzaG93IiwicmVtb3ZlU2VsZiIsInBhcmFsbGVsIiwic3Bhd24iLCJwcmV2aW91c0FzSW5wdXRBY3Rpb25zIiwicmVwZWF0IiwicmVwZWF0Rm9yZXZlciIsInJldmVyc2VUaW1lIiwia2V5cyIsImtleSIsImFyZ3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQSxJQUFJQSxRQUFRLEdBQUcsQ0FBZjtBQUVBLElBQUlDLFdBQVcsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdkJDLEVBQUFBLElBQUksRUFBRSxnQkFEaUI7QUFFdkIsYUFBU0YsRUFBRSxDQUFDRyxjQUZXO0FBSXZCQyxFQUFBQSxJQUp1QixnQkFJakJDLFFBSmlCLEVBSVBDLEtBSk8sRUFJQUMsSUFKQSxFQUlNO0FBQ3pCLFNBQUtDLEtBQUwsR0FBYUQsSUFBSSxHQUFHQSxJQUFJLElBQUlFLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsQ0FBNUI7QUFDQSxTQUFLQyxNQUFMLEdBQWNGLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsQ0FBZCxDQUZ5QixDQUl6Qjs7QUFDQUgsSUFBQUEsSUFBSSxDQUFDSyxRQUFMLEdBQWdCTCxJQUFJLENBQUNLLFFBQUwsSUFBaUIsS0FBS0EsUUFBdEM7O0FBQ0EsUUFBSUwsSUFBSSxDQUFDTSxNQUFMLElBQWUsT0FBT04sSUFBSSxDQUFDTSxNQUFaLEtBQXVCLFFBQTFDLEVBQW9E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TUFBTSxHQUFHOEMsT0FBTyxDQUFDQSxPQUFPLENBQUNELE1BQVIsR0FBaUIsQ0FBbEIsQ0FBaEI7QUFDQUMsTUFBQUEsT0FBTyxDQUFDRCxNQUFSLElBQWtCLENBQWxCO0FBQ0FBLE1BQUFBLE1BQU0sSUFBSSxDQUFWO0FBQ0g7O0FBRUQsUUFBSWtELElBQUksR0FBRyxDQUFDL0YsTUFBRCxDQUFYOztBQUNBLFNBQUssSUFBSTZFLEdBQUMsR0FBRyxDQUFiLEVBQWdCQSxHQUFDLEdBQUdoQyxNQUFwQixFQUE0QmdDLEdBQUMsRUFBN0IsRUFBaUM7QUFDN0JrQixNQUFBQSxJQUFJLENBQUM1RCxJQUFMLENBQVV5QyxTQUFTLENBQUNDLEdBQUQsQ0FBbkI7QUFDSDs7QUFFRDdFLElBQUFBLE1BQU0sR0FBR3lGLHNCQUFzQixDQUFDSyxHQUFELENBQXRCLENBQTRCZixLQUE1QixDQUFrQyxJQUFsQyxFQUF3Q2dCLElBQXhDLENBQVQ7QUFDQWpELElBQUFBLE9BQU8sQ0FBQ1gsSUFBUixDQUFhbkMsTUFBYjtBQUVBLFdBQU8sSUFBUDtBQUNILEdBeEJEOzs7QUFGSixLQUFLLElBQUk2RSxFQUFDLEdBQUcsQ0FBYixFQUFnQkEsRUFBQyxHQUFHZ0IsSUFBSSxDQUFDaEQsTUFBekIsRUFBaUNnQyxFQUFDLEVBQWxDLEVBQXNDO0FBQUEsU0FBN0JBLEVBQTZCO0FBMkJyQztBQUVEOzs7O0FBSUE7Ozs7Ozs7OztBQU9BekcsRUFBRSxDQUFDdUUsS0FBSCxHQUFXLFVBQVV2QyxNQUFWLEVBQWtCO0FBQ3pCLFNBQU8sSUFBSWEsS0FBSixDQUFVYixNQUFWLENBQVA7QUFDSCxDQUZEOztBQUlBaEMsRUFBRSxDQUFDNkMsS0FBSCxHQUFXQSxLQUFYIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYmV6aWVyIH0gZnJvbSAnLi4vYW5pbWF0aW9uL2Jlemllcic7XG5cbmxldCBfdHdlZW5JRCA9IDA7XG5cbmxldCBUd2VlbkFjdGlvbiA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuVHdlZW5BY3Rpb24nLFxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxuXG4gICAgY3RvciAoZHVyYXRpb24sIHByb3BzLCBvcHRzKSB7XG4gICAgICAgIHRoaXMuX29wdHMgPSBvcHRzID0gb3B0cyB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9wcm9wcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICAgICAgLy8gZ2xvYmFsIGVhc2luZyBvciBwcm9ncmVzcyB1c2VkIGZvciB0aGlzIGFjdGlvblxuICAgICAgICBvcHRzLnByb2dyZXNzID0gb3B0cy5wcm9ncmVzcyB8fCB0aGlzLnByb2dyZXNzO1xuICAgICAgICBpZiAob3B0cy5lYXNpbmcgJiYgdHlwZW9mIG9wdHMuZWFzaW5nID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgbGV0IGVhc2luZ05hbWUgPSBvcHRzLmVhc2luZztcbiAgICAgICAgICAgIG9wdHMuZWFzaW5nID0gY2MuZWFzaW5nW2Vhc2luZ05hbWVdO1xuICAgICAgICAgICAgIW9wdHMuZWFzaW5nICYmIGNjLndhcm5JRCgxMDMxLCBlYXNpbmdOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZWxhdGl2ZSA9IHRoaXMuX29wdHMucmVsYXRpdmU7XG5cbiAgICAgICAgZm9yIChsZXQgbmFtZSBpbiBwcm9wcykge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gcHJvcHNbbmFtZV07XG5cbiAgICAgICAgICAgIC8vIHByb3BlcnR5IG1heSBoYXZlIGN1c3RvbSBlYXNpbmcgb3IgcHJvZ3Jlc3MgZnVuY3Rpb25cbiAgICAgICAgICAgIGxldCBlYXNpbmcsIHByb2dyZXNzO1xuICAgICAgICAgICAgaWYgKHZhbHVlLnZhbHVlICE9PSB1bmRlZmluZWQgJiYgKHZhbHVlLmVhc2luZyB8fCB2YWx1ZS5wcm9ncmVzcykpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlLmVhc2luZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgZWFzaW5nID0gY2MuZWFzaW5nW3ZhbHVlLmVhc2luZ107XG4gICAgICAgICAgICAgICAgICAgICFlYXNpbmcgJiYgY2Mud2FybklEKDEwMzEsIHZhbHVlLmVhc2luZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlYXNpbmcgPSB2YWx1ZS5lYXNpbmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByb2dyZXNzID0gdmFsdWUucHJvZ3Jlc3M7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGlzTnVtYmVyID0gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJztcbiAgICAgICAgICAgIGlmICghaXNOdW1iZXIgJiYgKCF2YWx1ZS5sZXJwIHx8IChyZWxhdGl2ZSAmJiAhdmFsdWUuYWRkICYmICF2YWx1ZS5tdWwpIHx8ICF2YWx1ZS5jbG9uZSkpIHtcbiAgICAgICAgICAgICAgICBjYy53YXJuKGBDYW4gbm90IGFuaW1hdGUgJHtuYW1lfSBwcm9wZXJ0eSwgYmVjYXVzZSBpdCBkbyBub3QgaGF2ZSBbbGVycCwgKGFkZHxtdWwpLCBjbG9uZV0gZnVuY3Rpb24uYCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBwcm9wID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICAgIHByb3AudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHByb3AuZWFzaW5nID0gZWFzaW5nO1xuICAgICAgICAgICAgcHJvcC5wcm9ncmVzcyA9IHByb2dyZXNzO1xuICAgICAgICAgICAgdGhpcy5fcHJvcHNbbmFtZV0gPSBwcm9wO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb3JpZ2luUHJvcHMgPSBwcm9wcztcbiAgICAgICAgdGhpcy5pbml0V2l0aER1cmF0aW9uKGR1cmF0aW9uKTtcbiAgICB9LFxuXG4gICAgY2xvbmUgKCkge1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IFR3ZWVuQWN0aW9uKHRoaXMuX2R1cmF0aW9uLCB0aGlzLl9vcmlnaW5Qcm9wcywgdGhpcy5fb3B0cyk7XG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH0sXG5cbiAgICBzdGFydFdpdGhUYXJnZXQgKHRhcmdldCkge1xuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcblxuICAgICAgICBsZXQgcmVsYXRpdmUgPSAhIXRoaXMuX29wdHMucmVsYXRpdmU7XG4gICAgICAgIGxldCBwcm9wcyA9IHRoaXMuX3Byb3BzO1xuICAgICAgICBmb3IgKGxldCBuYW1lIGluIHByb3BzKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0YXJnZXRbbmFtZV07XG4gICAgICAgICAgICBsZXQgcHJvcCA9IHByb3BzW25hbWVdO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHByb3Auc3RhcnQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBwcm9wLmN1cnJlbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBwcm9wLmVuZCA9IHJlbGF0aXZlID8gdmFsdWUgKyBwcm9wLnZhbHVlIDogcHJvcC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb3Auc3RhcnQgPSB2YWx1ZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHByb3AuY3VycmVudCA9IHZhbHVlLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgcHJvcC5lbmQgPSByZWxhdGl2ZSA/ICh2YWx1ZS5hZGQgfHwgdmFsdWUubXVsKS5jYWxsKHZhbHVlLCBwcm9wLnZhbHVlKSA6IHByb3AudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlICh0KSB7XG4gICAgICAgIGxldCBvcHRzID0gdGhpcy5fb3B0cztcbiAgICAgICAgbGV0IGVhc2luZ1RpbWUgPSB0O1xuICAgICAgICBpZiAob3B0cy5lYXNpbmcpIGVhc2luZ1RpbWUgPSBvcHRzLmVhc2luZyh0KTtcblxuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgIGlmICghdGFyZ2V0KSByZXR1cm47XG5cbiAgICAgICAgbGV0IHByb3BzID0gdGhpcy5fcHJvcHM7XG4gICAgICAgIGxldCBwcm9ncmVzcyA9IHRoaXMuX29wdHMucHJvZ3Jlc3M7XG4gICAgICAgIGZvciAobGV0IG5hbWUgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgIGxldCBwcm9wID0gcHJvcHNbbmFtZV07XG4gICAgICAgICAgICBsZXQgdGltZSA9IHByb3AuZWFzaW5nID8gcHJvcC5lYXNpbmcodCkgOiBlYXNpbmdUaW1lO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBwcm9wLmN1cnJlbnQgPSAocHJvcC5wcm9ncmVzcyB8fCBwcm9ncmVzcykocHJvcC5zdGFydCwgcHJvcC5lbmQsIHByb3AuY3VycmVudCwgdGltZSk7XG4gICAgICAgICAgICB0YXJnZXRbbmFtZV0gPSBjdXJyZW50O1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHByb2dyZXNzIChzdGFydCwgZW5kLCBjdXJyZW50LCB0KSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gc3RhcnQgKyAoZW5kIC0gc3RhcnQpICogdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0YXJ0LmxlcnAoZW5kLCB0LCBjdXJyZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICB9XG59KTtcblxubGV0IFNldEFjdGlvbiA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuU2V0QWN0aW9uJyxcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnN0YW50LFxuXG4gICAgY3RvciAocHJvcHMpIHtcbiAgICAgICAgdGhpcy5fcHJvcHMgPSB7fTtcbiAgICAgICAgcHJvcHMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmluaXQocHJvcHMpO1xuICAgIH0sXG5cbiAgICBpbml0IChwcm9wcykge1xuICAgICAgICBmb3IgKGxldCBuYW1lIGluIHByb3BzKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9wc1tuYW1lXSA9IHByb3BzW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICB1cGRhdGUgKCkge1xuICAgICAgICBsZXQgcHJvcHMgPSB0aGlzLl9wcm9wcztcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMudGFyZ2V0O1xuICAgICAgICBmb3IgKGxldCBuYW1lIGluIHByb3BzKSB7XG4gICAgICAgICAgICB0YXJnZXRbbmFtZV0gPSBwcm9wc1tuYW1lXTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjbG9uZSAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgU2V0QWN0aW9uKCk7XG4gICAgICAgIGFjdGlvbi5pbml0KHRoaXMuX3Byb3BzKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9XG59KTtcblxuXG5cbi8qKlxuICogISNlblxuICogVHdlZW4gcHJvdmlkZSBhIHNpbXBsZSBhbmQgZmxleGlibGUgd2F5IHRvIGNyZWF0ZSBhY3Rpb24uXG4gKiBUd2VlbidzIGFwaSBpcyBtb3JlIGZsZXhpYmxlIHRoYW4gY2MuQWN0aW9uOlxuICogIC0gU3VwcG9ydCBjcmVhdGluZyBhbiBhY3Rpb24gc2VxdWVuY2UgaW4gY2hhaW5lZCBhcGksXG4gKiAgLSBTdXBwb3J0IGFuaW1hdGUgYW55IG9iamVjdHMnIGFueSBwcm9wZXJ0aWVzLCBub3QgbGltaXRlZCB0byBub2RlJ3MgcHJvcGVydGllcy5cbiAqICAgIEJ5IGNvbnRyYXN0LCBjYy5BY3Rpb24gbmVlZHMgdG8gY3JlYXRlIGEgbmV3IGFjdGlvbiBjbGFzcyB0byBzdXBwb3J0IG5ldyBub2RlIHByb3BlcnR5LlxuICogIC0gU3VwcG9ydCB3b3JraW5nIHdpdGggY2MuQWN0aW9uLFxuICogIC0gU3VwcG9ydCBlYXNpbmcgYW5kIHByb2dyZXNzIGZ1bmN0aW9uLlxuICogISN6aFxuICogVHdlZW4g5o+Q5L6b5LqG5LiA5Liq566A5Y2V54G15rS755qE5pa55rOV5p2l5Yib5bu6IGFjdGlvbuOAglxuICog55u45a+55LqOIENvY29zIOS8oOe7n+eahCBjYy5BY3Rpb27vvIxjYy5Ud2VlbiDlnKjliJvlu7rliqjnlLvkuIropoHngbXmtLvpnZ7luLjlpJrvvJpcbiAqICAtIOaUr+aMgeS7pemTvuW8j+e7k+aehOeahOaWueW8j+WIm+W7uuS4gOS4quWKqOeUu+W6j+WIl+OAglxuICogIC0g5pSv5oyB5a+55Lu75oSP5a+56LGh55qE5Lu75oSP5bGe5oCn6L+b6KGM57yT5Yqo77yM5LiN5YaN5bGA6ZmQ5LqO6IqC54K55LiK55qE5bGe5oCn77yM6ICMIGNjLkFjdGlvbiDmt7vliqDkuIDkuKrlsZ7mgKfnmoTmlK/mjIHml7bov5jpnIDopoHmt7vliqDkuIDkuKrmlrDnmoQgYWN0aW9uIOexu+Wei+OAglxuICogIC0g5pSv5oyB5LiOIGNjLkFjdGlvbiDmt7fnlKhcbiAqICAtIOaUr+aMgeiuvue9riB7eyNjcm9zc0xpbmsgXCJFYXNpbmdcIn19e3svY3Jvc3NMaW5rfX0g5oiW6ICFIHByb2dyZXNzIOWHveaVsFxuICogQGNsYXNzIFR3ZWVuXG4gKiBAZXhhbXBsZVxuICogY2MudHdlZW4obm9kZSlcbiAqICAgLnRvKDEsIHtzY2FsZTogMiwgcG9zaXRpb246IGNjLnYzKDEwMCwgMTAwLCAxMDApfSlcbiAqICAgLmNhbGwoKCkgPT4geyBjb25zb2xlLmxvZygnVGhpcyBpcyBhIGNhbGxiYWNrJyk7IH0pXG4gKiAgIC5ieSgxLCB7c2NhbGU6IDMsIHBvc2l0aW9uOiBjYy52MygyMDAsIDIwMCwgMjAwKX0sIHtlYXNpbmc6ICdzaW5lT3V0SW4nfSlcbiAqICAgLnN0YXJ0KGNjLmZpbmQoJ0NhbnZhcy9jb2NvcycpKTtcbiAqIEB0eXBlc2NyaXB0IFR3ZWVuPFQgPSBhbnk+XG4gKi9cbmZ1bmN0aW9uIFR3ZWVuICh0YXJnZXQpIHtcbiAgICB0aGlzLl9hY3Rpb25zID0gW107XG4gICAgdGhpcy5fZmluYWxBY3Rpb24gPSBudWxsO1xuICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLl90YWcgPSBjYy5BY3Rpb24uVEFHX0lOVkFMSUQ7XG59XG5cbi8qKlxuICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdXG4gKi9cblxuLyoqXG4gKiAhI2VuIFN0b3AgYWxsIHR3ZWVuc1xuICogISN6aCDlgZzmraLmiYDmnInnvJPliqhcbiAqIEBtZXRob2Qgc3RvcEFsbFxuICogQHN0YXRpY1xuICovXG5Ud2Vlbi5zdG9wQWxsID0gZnVuY3Rpb24gKCkge1xuICAgIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5yZW1vdmVBbGxBY3Rpb25zKCk7XG59XG4vKipcbiAqICEjZW4gU3RvcCBhbGwgdHdlZW5zIGJ5IHRhZ1xuICogISN6aCDlgZzmraLmiYDmnInmjIflrprmoIfnrb7nmoTnvJPliqhcbiAqIEBtZXRob2Qgc3RvcEFsbEJ5VGFnXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge251bWJlcn0gdGFnXG4gKi9cblR3ZWVuLnN0b3BBbGxCeVRhZyA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgICBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkucmVtb3ZlQWN0aW9uQnlUYWcodGFnKTtcbn1cbi8qKlxuICogISNlbiBTdG9wIGFsbCB0d2VlbnMgYnkgdGFyZ2V0XG4gKiAhI3poIOWBnOatouaJgOacieaMh+WumuWvueixoeeahOe8k+WKqFxuICogQG1ldGhvZCBzdG9wQWxsQnlUYXJnZXRcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqL1xuVHdlZW4uc3RvcEFsbEJ5VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5yZW1vdmVBbGxBY3Rpb25zRnJvbVRhcmdldCh0YXJnZXQpO1xufVxuXG4vKipcbiAqICEjZW5cbiAqIEluc2VydCBhbiBhY3Rpb24gb3IgdHdlZW4gdG8gdGhpcyBzZXF1ZW5jZVxuICogISN6aFxuICog5o+S5YWl5LiA5LiqIGFjdGlvbiDmiJbogIUgdHdlZW4g5Yiw6Zif5YiX5LitXG4gKiBAbWV0aG9kIHRoZW4gXG4gKiBAcGFyYW0ge0FjdGlvbnxUd2Vlbn0gb3RoZXJcbiAqIEByZXR1cm4ge1R3ZWVufVxuICogQHR5cGVzY3JpcHQgdGhlbihvdGhlcjogQWN0aW9ufFR3ZWVuPFQ+KTogVHdlZW48VD5cbiAqL1xuVHdlZW4ucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICBpZiAob3RoZXIgaW5zdGFuY2VvZiBjYy5BY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fYWN0aW9ucy5wdXNoKG90aGVyLmNsb25lKCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fYWN0aW9ucy5wdXNoKG90aGVyLl91bmlvbigpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qKlxuICogISNlblxuICogU2V0IHR3ZWVuIHRhcmdldFxuICogISN6aFxuICog6K6+572uIHR3ZWVuIOeahCB0YXJnZXRcbiAqIEBtZXRob2QgdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gKiBAcmV0dXJuIHtUd2Vlbn1cbiAqIEB0eXBlc2NyaXB0IHRhcmdldCh0YXJnZXQ6IGFueSk6IFR3ZWVuPFQ+XG4gKi9cblR3ZWVuLnByb3RvdHlwZS50YXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBTdGFydCB0aGlzIHR3ZWVuXG4gKiAhI3poXG4gKiDov5DooYzlvZPliY0gdHdlZW5cbiAqIEBtZXRob2Qgc3RhcnRcbiAqIEByZXR1cm4ge1R3ZWVufVxuICogQHR5cGVzY3JpcHQgc3RhcnQoKTogVHdlZW48VD5cbiAqL1xuVHdlZW4ucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCB0YXJnZXQgPSB0aGlzLl90YXJnZXQ7XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgY2Mud2FybignUGxlYXNlIHNldCB0YXJnZXQgdG8gdHdlZW4gZmlyc3QnKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBjYy5PYmplY3QgJiYgIXRhcmdldC5pc1ZhbGlkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZmluYWxBY3Rpb24pIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnJlbW92ZUFjdGlvbih0aGlzLl9maW5hbEFjdGlvbik7XG4gICAgfVxuICAgIHRoaXMuX2ZpbmFsQWN0aW9uID0gdGhpcy5fdW5pb24oKTtcblxuICAgIGlmICh0YXJnZXQuX2lkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGFyZ2V0Ll9pZCA9ICsrX3R3ZWVuSUQ7XG4gICAgfVxuXG4gICAgdGhpcy5fZmluYWxBY3Rpb24uc2V0VGFnKHRoaXMuX3RhZyk7XG4gICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLmFkZEFjdGlvbih0aGlzLl9maW5hbEFjdGlvbiwgdGFyZ2V0LCBmYWxzZSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIFN0b3AgdGhpcyB0d2VlblxuICogISN6aFxuICog5YGc5q2i5b2T5YmNIHR3ZWVuXG4gKiBAbWV0aG9kIHN0b3BcbiAqIEByZXR1cm4ge1R3ZWVufVxuICogQHR5cGVzY3JpcHQgc3RvcCgpOiBUd2VlbjxUPlxuICovXG5Ud2Vlbi5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fZmluYWxBY3Rpb24pIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnJlbW92ZUFjdGlvbih0aGlzLl9maW5hbEFjdGlvbik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuXG4vKipcbiAqICEjZW4gU2V0cyB0d2VlbiB0YWdcbiAqICEjemgg6K6+572u57yT5Yqo55qE5qCH562+XG4gKiBAbWV0aG9kIHRhZ1xuICogQHBhcmFtIHtudW1iZXJ9IHRhZ1xuICogQHJldHVybiB7VHdlZW59XG4gKiBAdHlwZXNjcmlwdCB0YWcodGFnOiBudW1iZXIpOiBUd2VlbjxUPlxuICovXG5Ud2Vlbi5wcm90b3R5cGUudGFnID0gZnVuY3Rpb24gKHRhZykge1xuICAgIHRoaXMuX3RhZyA9IHRhZztcbiAgICByZXR1cm4gdGhpcztcbn07XG5cblxuLyoqXG4gKiAhI2VuXG4gKiBDbG9uZSBhIHR3ZWVuXG4gKiAhI3poXG4gKiDlhYvpmoblvZPliY0gdHdlZW5cbiAqIEBtZXRob2QgY2xvbmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XVxuICogQHJldHVybiB7VHdlZW59XG4gKiBAdHlwZXNjcmlwdCBjbG9uZSh0YXJnZXQ/OiBhbnkpOiBUd2VlbjxUPlxuICovXG5Ud2Vlbi5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgbGV0IGFjdGlvbiA9IHRoaXMuX3VuaW9uKCk7XG4gICAgcmV0dXJuIGNjLnR3ZWVuKHRhcmdldCkudGhlbihhY3Rpb24uY2xvbmUoKSk7XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIEludGVncmF0ZSBhbGwgcHJldmlvdXMgYWN0aW9ucyB0byBhbiBhY3Rpb24uXG4gKiAhI3poXG4gKiDlsIbkuYvliY3miYDmnInnmoQgYWN0aW9uIOaVtOWQiOS4uuS4gOS4qiBhY3Rpb27jgIJcbiAqIEBtZXRob2QgdW5pb25cbiAqIEByZXR1cm4ge1R3ZWVufVxuICogQHR5cGVzY3JpdHAgdW5pb24oKTogVHdlZW48VD5cbiAqL1xuVHdlZW4ucHJvdG90eXBlLnVuaW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhY3Rpb24gPSB0aGlzLl91bmlvbigpO1xuICAgIHRoaXMuX2FjdGlvbnMubGVuZ3RoID0gMDtcbiAgICB0aGlzLl9hY3Rpb25zLnB1c2goYWN0aW9uKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cblR3ZWVuLnByb3RvdHlwZS5fdW5pb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFjdGlvbnMgPSB0aGlzLl9hY3Rpb25zO1xuXG4gICAgaWYgKGFjdGlvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGFjdGlvbnMgPSBhY3Rpb25zWzBdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYWN0aW9ucyA9IGNjLnNlcXVlbmNlKGFjdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb25zO1xufTtcblxuT2JqZWN0LmFzc2lnbihUd2Vlbi5wcm90b3R5cGUsIHtcbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgdGFyZ2V0J3MgcG9zaXRpb24gcHJvcGVydHkgYWNjb3JkaW5nIHRvIHRoZSBiZXppZXIgY3VydmUuXG4gICAgICogISN6aCDmjInnhafotJ3loZ7lsJTot6/lvoTorr7nva7nm67moIfnmoQgcG9zaXRpb24g5bGe5oCn44CCXG4gICAgICogQG1ldGhvZCBiZXppZXJUb1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvblxuICAgICAqIEBwYXJhbSB7Y2MuVmVjMn0gYzFcbiAgICAgKiBAcGFyYW0ge2NjLlZlYzJ9IGMyXG4gICAgICogQHBhcmFtIHtjYy5WZWMyfSB0b1xuICAgICAqIEByZXR1cm4ge1R3ZWVufVxuICAgICAqIEB0eXBlc2NyaXB0IGJlemllclRvKGR1cmF0aW9uOiBudW1iZXIsIGMxOiBWZWMyLCBjMjogVmVjMiwgdG86IFZlYzIpOiBUd2VlbjxUPlxuICAgICAqL1xuICAgIGJlemllclRvIChkdXJhdGlvbiwgYzEsIGMyLCB0bywgb3B0cykge1xuICAgICAgICBsZXQgYzB4ID0gYzEueCwgYzB5ID0gYzEueSxcbiAgICAgICAgICAgIGMxeCA9IGMyLngsIGMxeSA9IGMyLnk7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIG9wdHMucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCwgY3VycmVudCwgdCkge1xuICAgICAgICAgICAgY3VycmVudC54ID0gYmV6aWVyKHN0YXJ0LngsIGMweCwgYzF4LCBlbmQueCwgdCk7XG4gICAgICAgICAgICBjdXJyZW50LnkgPSBiZXppZXIoc3RhcnQueSwgYzB5LCBjMXksIGVuZC55LCB0KTtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRvKGR1cmF0aW9uLCB7IHBvc2l0aW9uOiB0byB9LCBvcHRzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIHRhcmdldCdzIHBvc2l0aW9uIHByb3BlcnR5IGFjY29yZGluZyB0byB0aGUgYmV6aWVyIGN1cnZlLlxuICAgICAqICEjemgg5oyJ54Wn6LSd5aGe5bCU6Lev5b6E6K6+572u55uu5qCH55qEIHBvc2l0aW9uIOWxnuaAp+OAglxuICAgICAqIEBtZXRob2QgYmV6aWVyQnlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb25cbiAgICAgKiBAcGFyYW0ge2NjLlZlYzJ9IGMxXG4gICAgICogQHBhcmFtIHtjYy5WZWMyfSBjMlxuICAgICAqIEBwYXJhbSB7Y2MuVmVjMn0gdG9cbiAgICAgKiBAcmV0dXJuIHtUd2Vlbn1cbiAgICAgKiBAdHlwZXNjcmlwdCBiZXppZXJCeShkdXJhdGlvbjogbnVtYmVyLCBjMTogVmVjMiwgYzI6IFZlYzIsIHRvOiBWZWMyKTogVHdlZW48VD5cbiAgICAgKi9cbiAgICBiZXppZXJCeSAoZHVyYXRpb24sIGMxLCBjMiwgdG8sIG9wdHMpIHtcbiAgICAgICAgbGV0IGMweCA9IGMxLngsIGMweSA9IGMxLnksXG4gICAgICAgICAgICBjMXggPSBjMi54LCBjMXkgPSBjMi55O1xuICAgICAgICBvcHRzID0gb3B0cyB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBvcHRzLnByb2dyZXNzID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIGN1cnJlbnQsIHQpIHtcbiAgICAgICAgICAgIGxldCBzeCA9IHN0YXJ0LngsIHN5ID0gc3RhcnQueTtcbiAgICAgICAgICAgIGN1cnJlbnQueCA9IGJlemllcihzeCwgYzB4ICsgc3gsIGMxeCArIHN4LCBlbmQueCwgdCk7XG4gICAgICAgICAgICBjdXJyZW50LnkgPSBiZXppZXIoc3ksIGMweSArIHN5LCBjMXkgKyBzeSwgZW5kLnksIHQpO1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYnkoZHVyYXRpb24sIHsgcG9zaXRpb246IHRvIH0sIG9wdHMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEZsaXBzIHRhcmdldCdzIHNjYWxlWFxuICAgICAqICEjemgg57+76L2s55uu5qCH55qEIHNjYWxlWCDlsZ7mgKdcbiAgICAgKiBAbWV0aG9kIGZsaXBYXG4gICAgICogQHJldHVybiB7VHdlZW59XG4gICAgICogQHR5cGVzY3JpcHQgZmxpcFgoKTogVHdlZW48VD5cbiAgICAgKi9cbiAgICBmbGlwWCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGwoKCkgPT4geyB0aGlzLl90YXJnZXQuc2NhbGVYICo9IC0xOyB9LCB0aGlzKTtcbiAgICAgICAgXG4gICAgfSxcbiAgICAvKipcbiAgICAgKiAhI2VuIEZsaXBzIHRhcmdldCdzIHNjYWxlWVxuICAgICAqICEjemgg57+76L2s55uu5qCH55qEIHNjYWxlWSDlsZ7mgKdcbiAgICAgKiBAbWV0aG9kIGZsaXBZXG4gICAgICogQHJldHVybiB7VHdlZW59XG4gICAgICogQHR5cGVzY3JpcHQgZmxpcFkoKTogVHdlZW48VD5cbiAgICAgKi9cbiAgICBmbGlwWSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGwoKCkgPT4geyB0aGlzLl90YXJnZXQuc2NhbGVZICo9IC0xOyB9LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBCbGlua3MgdGFyZ2V0IGJ5IHNldCB0YXJnZXQncyBvcGFjaXR5IHByb3BlcnR5XG4gICAgICogISN6aCDpgJrov4forr7nva7nm67moIfnmoQgb3BhY2l0eSDlsZ7mgKfovr7liLDpl6rng4HmlYjmnpxcbiAgICAgKiBAbWV0aG9kIGJsaW5rXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLnByb2dyZXNzXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBbb3B0cy5lYXNpbmddXG4gICAgICogQHJldHVybiB7VHdlZW59XG4gICAgICogQHR5cGVzY3JpcHQgYmxpbmsoZHVyYXRpb246IG51bWJlciwgdGltZXM6IG51bWJlciwgb3B0cz86IHtwcm9ncmVzcz86IEZ1bmN0aW9uOyBlYXNpbmc/OiBGdW5jdGlvbnxzdHJpbmc7IH0pOiBUd2VlbjxUPlxuICAgICAqL1xuICAgIGJsaW5rIChkdXJhdGlvbiwgdGltZXMsIG9wdHMpIHtcbiAgICAgICAgdmFyIHNsaWNlID0gMS4wIC8gdGltZXM7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIG9wdHMucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCwgY3VycmVudCwgdCkge1xuICAgICAgICAgICAgaWYgKHQgPj0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGFydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBtID0gdCAlIHNsaWNlO1xuICAgICAgICAgICAgICAgIHJldHVybiAobSA+IChzbGljZSAvIDIpKSA/IDI1NSA6IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnRvKGR1cmF0aW9uLCB7IG9wYWNpdHk6IDEgfSwgb3B0cyk7XG4gICAgfSxcbn0pXG5cbmxldCB0bXBfYXJncyA9IFtdO1xuXG5mdW5jdGlvbiB3cmFwQWN0aW9uIChhY3Rpb24pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB0bXBfYXJncy5sZW5ndGggPSAwO1xuICAgICAgICBmb3IgKGxldCBsID0gYXJndW1lbnRzLmxlbmd0aCwgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBhcmcgPSB0bXBfYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGlmIChhcmcgaW5zdGFuY2VvZiBUd2Vlbikge1xuICAgICAgICAgICAgICAgIHRtcF9hcmdzW2ldID0gYXJnLl91bmlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFjdGlvbi5hcHBseSh0aGlzLCB0bXBfYXJncyk7XG4gICAgfTtcbn1cblxubGV0IGFjdGlvbnMgPSB7XG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEFkZCBhbiBhY3Rpb24gd2hpY2ggY2FsY3VsYXRlIHdpdGggYWJzb2x1dGUgdmFsdWVcbiAgICAgKiAhI3poXG4gICAgICog5re75Yqg5LiA5Liq5a+55bGe5oCn6L+b6KGM57ud5a+55YC86K6h566X55qEIGFjdGlvblxuICAgICAqIEBtZXRob2QgdG9cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSB7c2NhbGU6IDIsIHBvc2l0aW9uOiBjYy52MygxMDAsIDEwMCwgMTAwKX1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHNdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMucHJvZ3Jlc3NdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IFtvcHRzLmVhc2luZ11cbiAgICAgKiBAcmV0dXJuIHtUd2Vlbn1cbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHRvIDxPUFRTIGV4dGVuZHMgUGFydGlhbDx7cHJvZ3Jlc3M6IEZ1bmN0aW9uLCBlYXNpbmc6IEZ1bmN0aW9ufFN0cmluZ30+PiAoZHVyYXRpb246IG51bWJlciwgcHJvcHM6IENvbnN0cnVjdG9yVHlwZTxUPiwgb3B0cz86IE9QVFMpIDogVHdlZW48VD5cbiAgICAgKi9cbiAgICB0byAoZHVyYXRpb24sIHByb3BzLCBvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIG9wdHMucmVsYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIG5ldyBUd2VlbkFjdGlvbihkdXJhdGlvbiwgcHJvcHMsIG9wdHMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWRkIGFuIGFjdGlvbiB3aGljaCBjYWxjdWxhdGUgd2l0aCByZWxhdGl2ZSB2YWx1ZVxuICAgICAqICEjemhcbiAgICAgKiDmt7vliqDkuIDkuKrlr7nlsZ7mgKfov5vooYznm7jlr7nlgLzorqHnrpfnmoQgYWN0aW9uXG4gICAgICogQG1ldGhvZCBieVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIHtzY2FsZTogMiwgcG9zaXRpb246IGNjLnYzKDEwMCwgMTAwLCAxMDApfVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0c11cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5wcm9ncmVzc11cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gW29wdHMuZWFzaW5nXVxuICAgICAqIEByZXR1cm4ge1R3ZWVufVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogYnkgPE9QVFMgZXh0ZW5kcyBQYXJ0aWFsPHtwcm9ncmVzczogRnVuY3Rpb24sIGVhc2luZzogRnVuY3Rpb258U3RyaW5nfT4+IChkdXJhdGlvbjogbnVtYmVyLCBwcm9wczogQ29uc3RydWN0b3JUeXBlPFQ+LCBvcHRzPzogT1BUUykgOiBUd2VlbjxUPlxuICAgICAqL1xuICAgIGJ5IChkdXJhdGlvbiwgcHJvcHMsIG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwgT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgb3B0cy5yZWxhdGl2ZSA9IHRydWU7XG4gICAgICAgIHJldHVybiBuZXcgVHdlZW5BY3Rpb24oZHVyYXRpb24sIHByb3BzLCBvcHRzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIERpcmVjdGx5IHNldCB0YXJnZXQgcHJvcGVydGllc1xuICAgICAqICEjemhcbiAgICAgKiDnm7TmjqXorr7nva4gdGFyZ2V0IOeahOWxnuaAp1xuICAgICAqIEBtZXRob2Qgc2V0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzXG4gICAgICogQHJldHVybiB7VHdlZW59XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzZXQgKHByb3BzOiBDb25zdHJ1Y3RvclR5cGU8VD4pIDogVHdlZW48VD5cbiAgICAgKi9cbiAgICBzZXQgKHByb3BzKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2V0QWN0aW9uKHByb3BzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEFkZCBhbiBkZWxheSBhY3Rpb25cbiAgICAgKiAhI3poXG4gICAgICog5re75Yqg5LiA5Liq5bu25pe2IGFjdGlvblxuICAgICAqIEBtZXRob2QgZGVsYXlcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cbiAgICAgKiBAcmV0dXJuIHtUd2Vlbn1cbiAgICAgKiBAdHlwZXNjcmlwdCBkZWxheShkdXJhdGlvbjogbnVtYmVyKTogVHdlZW48VD5cbiAgICAgKi9cbiAgICBkZWxheTogY2MuZGVsYXlUaW1lLFxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBZGQgYW4gY2FsbGJhY2sgYWN0aW9uXG4gICAgICogISN6aFxuICAgICAqIOa3u+WKoOS4gOS4quWbnuiwgyBhY3Rpb25cbiAgICAgKiBAbWV0aG9kIGNhbGxcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEByZXR1cm4ge1R3ZWVufVxuICAgICAqIEB0eXBlc2NyaXB0IGNhbGwoY2FsbGJhY2s6IEZ1bmN0aW9uKTogVHdlZW48VD5cbiAgICAgKi9cbiAgICBjYWxsOiBjYy5jYWxsRnVuYyxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWRkIGFuIGhpZGUgYWN0aW9uXG4gICAgICogISN6aFxuICAgICAqIOa3u+WKoOS4gOS4qumakOiXjyBhY3Rpb25cbiAgICAgKiBAbWV0aG9kIGhpZGVcbiAgICAgKiBAcmV0dXJuIHtUd2Vlbn1cbiAgICAgKiBAdHlwZXNjcmlwdCBoaWRlKCk6IFR3ZWVuPFQ+XG4gICAgICovXG4gICAgaGlkZTogY2MuaGlkZSxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWRkIGFuIHNob3cgYWN0aW9uXG4gICAgICogISN6aFxuICAgICAqIOa3u+WKoOS4gOS4quaYvuekuiBhY3Rpb25cbiAgICAgKiBAbWV0aG9kIHNob3dcbiAgICAgKiBAcmV0dXJuIHtUd2Vlbn1cbiAgICAgKiBAdHlwZXNjcmlwdCBzaG93KCk6IFR3ZWVuPFQ+XG4gICAgICovXG4gICAgc2hvdzogY2Muc2hvdyxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWRkIGFuIHJlbW92ZVNlbGYgYWN0aW9uXG4gICAgICogISN6aFxuICAgICAqIOa3u+WKoOS4gOS4quenu+mZpOiHquW3sSBhY3Rpb25cbiAgICAgKiBAbWV0aG9kIHJlbW92ZVNlbGZcbiAgICAgKiBAcmV0dXJuIHtUd2Vlbn1cbiAgICAgKiBAdHlwZXNjcmlwdCByZW1vdmVTZWxmKCk6IFR3ZWVuPFQ+XG4gICAgICovXG4gICAgcmVtb3ZlU2VsZjogY2MucmVtb3ZlU2VsZixcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWRkIGFuIHNlcXVlbmNlIGFjdGlvblxuICAgICAqICEjemhcbiAgICAgKiDmt7vliqDkuIDkuKrpmJ/liJcgYWN0aW9uXG4gICAgICogQG1ldGhvZCBzZXF1ZW5jZVxuICAgICAqIEBwYXJhbSB7QWN0aW9ufFR3ZWVufSBhY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FjdGlvbnxUd2Vlbn0gLi4uYWN0aW9uc1xuICAgICAqIEByZXR1cm4ge1R3ZWVufVxuICAgICAqIEB0eXBlc2NyaXB0IHNlcXVlbmNlKGFjdGlvbjogQWN0aW9ufFR3ZWVuPFQ+LCAuLi5hY3Rpb25zOiAoQWN0aW9ufFR3ZWVuPFQ+KVtdKTogVHdlZW48VD5cbiAgICAgKi9cbiAgICBzZXF1ZW5jZTogd3JhcEFjdGlvbihjYy5zZXF1ZW5jZSksXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEFkZCBhbiBwYXJhbGxlbCBhY3Rpb25cbiAgICAgKiAhI3poXG4gICAgICog5re75Yqg5LiA5Liq5bm26KGMIGFjdGlvblxuICAgICAqIEBtZXRob2QgcGFyYWxsZWxcbiAgICAgKiBAcGFyYW0ge0FjdGlvbnxUd2Vlbn0gYWN0aW9uXG4gICAgICogQHBhcmFtIHtBY3Rpb258VHdlZW59IC4uLmFjdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtUd2Vlbn1cbiAgICAgKiBAdHlwZXNjcmlwdCBwYXJhbGxlbChhY3Rpb246IEFjdGlvbnxUd2VlbjxUPiwgLi4uYWN0aW9uczogKEFjdGlvbnxUd2VlbjxUPilbXSk6IFR3ZWVuPFQ+XG4gICAgICovXG4gICAgcGFyYWxsZWw6IHdyYXBBY3Rpb24oY2Muc3Bhd24pXG59O1xuXG4vLyB0aGVzZSBhY3Rpb24gd2lsbCB1c2UgcHJldmlvdXMgYWN0aW9uIGFzIHRoZWlyIHBhcmFtZXRlcnNcbmxldCBwcmV2aW91c0FzSW5wdXRBY3Rpb25zID0ge1xuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBZGQgYW4gcmVwZWF0IGFjdGlvbi5cbiAgICAgKiBUaGlzIGFjdGlvbiB3aWxsIGludGVncmF0ZSBiZWZvcmUgYWN0aW9ucyB0byBhIHNlcXVlbmNlIGFjdGlvbiBhcyB0aGVpciBwYXJhbWV0ZXJzLlxuICAgICAqICEjemhcbiAgICAgKiDmt7vliqDkuIDkuKrph43lpI0gYWN0aW9u77yM6L+Z5LiqIGFjdGlvbiDkvJrlsIbliY3kuIDkuKrliqjkvZzkvZzkuLrku5bnmoTlj4LmlbDjgIJcbiAgICAgKiBAbWV0aG9kIHJlcGVhdFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByZXBlYXRUaW1lc1xuICAgICAqIEBwYXJhbSB7QWN0aW9uIHwgVHdlZW59IFthY3Rpb25dXG4gICAgICogQHJldHVybiB7VHdlZW59XG4gICAgICogQHR5cGVzY3JpcHQgcmVwZWF0KHJlcGVhdFRpbWVzOiBudW1iZXIsIGFjdGlvbj86IEFjdGlvbnxUd2VlbjxUPik6IFR3ZWVuPFQ+XG4gICAgICovXG4gICAgcmVwZWF0OiBjYy5yZXBlYXQsXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEFkZCBhbiByZXBlYXQgZm9yZXZlciBhY3Rpb25cbiAgICAgKiBUaGlzIGFjdGlvbiB3aWxsIGludGVncmF0ZSBiZWZvcmUgYWN0aW9ucyB0byBhIHNlcXVlbmNlIGFjdGlvbiBhcyB0aGVpciBwYXJhbWV0ZXJzLlxuICAgICAqICEjemhcbiAgICAgKiDmt7vliqDkuIDkuKrmsLjkuYXph43lpI0gYWN0aW9u77yM6L+Z5LiqIGFjdGlvbiDkvJrlsIbliY3kuIDkuKrliqjkvZzkvZzkuLrku5bnmoTlj4LmlbDjgIJcbiAgICAgKiBAbWV0aG9kIHJlcGVhdEZvcmV2ZXJcbiAgICAgKiBAcGFyYW0ge0FjdGlvbiB8IFR3ZWVufSBbYWN0aW9uXVxuICAgICAqIEByZXR1cm4ge1R3ZWVufVxuICAgICAqIEB0eXBlc2NyaXB0IHJlcGVhdEZvcmV2ZXIoYWN0aW9uPzogQWN0aW9ufFR3ZWVuPFQ+KTogVHdlZW48VD5cbiAgICAgKi9cbiAgICByZXBlYXRGb3JldmVyOiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIC8vIFRPRE86IGZpeGVkIHdpdGggY2MucmVwZWF0Rm9yZXZlclxuICAgICAgICByZXR1cm4gY2MucmVwZWF0KGFjdGlvbiwgMTBlOCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWRkIGFuIHJldmVyc2UgdGltZSBhY3Rpb24uXG4gICAgICogVGhpcyBhY3Rpb24gd2lsbCBpbnRlZ3JhdGUgYmVmb3JlIGFjdGlvbnMgdG8gYSBzZXF1ZW5jZSBhY3Rpb24gYXMgdGhlaXIgcGFyYW1ldGVycy5cbiAgICAgKiAhI3poXG4gICAgICog5re75Yqg5LiA5Liq5YCS572u5pe26Ze0IGFjdGlvbu+8jOi/meS4qiBhY3Rpb24g5Lya5bCG5YmN5LiA5Liq5Yqo5L2c5L2c5Li65LuW55qE5Y+C5pWw44CCXG4gICAgICogQG1ldGhvZCByZXZlcnNlVGltZVxuICAgICAqIEBwYXJhbSB7QWN0aW9uIHwgVHdlZW59IFthY3Rpb25dXG4gICAgICogQHJldHVybiB7VHdlZW59XG4gICAgICogQHR5cGVzY3JpcHQgcmV2ZXJzZVRpbWUoYWN0aW9uPzogQWN0aW9ufFR3ZWVuPFQ+KTogVHdlZW48VD5cbiAgICAgKi9cbiAgICByZXZlcnNlVGltZTogY2MucmV2ZXJzZVRpbWUsXG59O1xuXG5cbmxldCBrZXlzID0gT2JqZWN0LmtleXMoYWN0aW9ucyk7XG5mb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQga2V5ID0ga2V5c1tpXTtcbiAgICBUd2Vlbi5wcm90b3R5cGVba2V5XSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGFjdGlvbiA9IGFjdGlvbnNba2V5XS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB0aGlzLl9hY3Rpb25zLnB1c2goYWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbn1cblxua2V5cyA9IE9iamVjdC5rZXlzKHByZXZpb3VzQXNJbnB1dEFjdGlvbnMpO1xuZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGtleSA9IGtleXNbaV07XG4gICAgVHdlZW4ucHJvdG90eXBlW2tleV0gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgbGV0IGFjdGlvbnMgPSB0aGlzLl9hY3Rpb25zO1xuICAgICAgICBsZXQgYWN0aW9uID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuXG4gICAgICAgIGlmIChhY3Rpb24gaW5zdGFuY2VvZiBjYy5Ud2Vlbikge1xuICAgICAgICAgICAgYWN0aW9uID0gYWN0aW9uLl91bmlvbigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCEoYWN0aW9uIGluc3RhbmNlb2YgY2MuQWN0aW9uKSkge1xuICAgICAgICAgICAgYWN0aW9uID0gYWN0aW9uc1thY3Rpb25zLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgYWN0aW9ucy5sZW5ndGggLT0gMTtcbiAgICAgICAgICAgIGxlbmd0aCArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFyZ3MgPSBbYWN0aW9uXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICBhY3Rpb24gPSBwcmV2aW91c0FzSW5wdXRBY3Rpb25zW2tleV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIGFjdGlvbnMucHVzaChhY3Rpb24pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG59XG5cbi8qKlxuICogQG1vZHVsZSBjY1xuICovXG5cbi8qKlxuICogQG1ldGhvZCB0d2VlblxuICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdIC0gdGhlIHRhcmdldCB0byBhbmltYXRlXG4gKiBAcmV0dXJuIHtUd2Vlbn1cbiAqIEB0eXBlc2NyaXB0XG4gKiB0d2VlbjxUPiAodGFyZ2V0PzogVCkgOiBUd2VlbjxUPlxuICovXG5jYy50d2VlbiA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICByZXR1cm4gbmV3IFR3ZWVuKHRhcmdldCk7XG59O1xuXG5jYy5Ud2VlbiA9IFR3ZWVuO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=