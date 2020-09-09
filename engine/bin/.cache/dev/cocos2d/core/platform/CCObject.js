
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCObject.js';
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
var js = require('./js');

var CCClass = require('./CCClass'); // definitions for CCObject.Flags


var Destroyed = 1 << 0;
var RealDestroyed = 1 << 1;
var ToDestroy = 1 << 2;
var DontSave = 1 << 3;
var EditorOnly = 1 << 4;
var Dirty = 1 << 5;
var DontDestroy = 1 << 6;
var Destroying = 1 << 7;
var Deactivating = 1 << 8;
var LockedInEditor = 1 << 9; //var HideInGame = 1 << 9;

var HideInHierarchy = 1 << 10;
var IsOnEnableCalled = 1 << 11;
var IsEditorOnEnableCalled = 1 << 12;
var IsPreloadStarted = 1 << 13;
var IsOnLoadCalled = 1 << 14;
var IsOnLoadStarted = 1 << 15;
var IsStartCalled = 1 << 16;
var IsRotationLocked = 1 << 17;
var IsScaleLocked = 1 << 18;
var IsAnchorLocked = 1 << 19;
var IsSizeLocked = 1 << 20;
var IsPositionLocked = 1 << 21; // var Hide = HideInGame | HideInHierarchy;
// should not clone or serialize these flags

var PersistentMask = ~(ToDestroy | Dirty | Destroying | DontDestroy | Deactivating | IsPreloadStarted | IsOnLoadStarted | IsOnLoadCalled | IsStartCalled | IsOnEnableCalled | IsEditorOnEnableCalled | IsRotationLocked | IsScaleLocked | IsAnchorLocked | IsSizeLocked | IsPositionLocked
/*RegisteredInEditor*/
);
/**
 * The base class of most of all the objects in Fireball.
 * @class Object
 *
 * @main
 * @private
 */

function CCObject() {
  /**
   * @property {String} _name
   * @default ""
   * @private
   */
  this._name = '';
  /**
   * @property {Number} _objFlags
   * @default 0
   * @private
   */

  this._objFlags = 0;
}

CCClass.fastDefine('cc.Object', CCObject, {
  _name: '',
  _objFlags: 0
});
/**
 * Bit mask that controls object states.
 * @enum Flags
 * @static
 * @private
 */

js.value(CCObject, 'Flags', {
  Destroyed: Destroyed,
  //ToDestroy: ToDestroy,

  /**
   * !#en The object will not be saved.
   * !#zh 该对象将不会被保存。
   * @property {Number} DontSave
   */
  DontSave: DontSave,

  /**
   * !#en The object will not be saved when building a player.
   * !#zh 构建项目时，该对象将不会被保存。
   * @property {Number} EditorOnly
   */
  EditorOnly: EditorOnly,
  Dirty: Dirty,

  /**
   * !#en Dont destroy automatically when loading a new scene.
   * !#zh 加载一个新场景时，不自动删除该对象。
   * @property DontDestroy
   * @private
   */
  DontDestroy: DontDestroy,
  PersistentMask: PersistentMask,
  // FLAGS FOR ENGINE
  Destroying: Destroying,

  /**
   * !#en The node is deactivating.
   * !#zh 节点正在反激活的过程中。
   * @property Deactivating
   * @private
   */
  Deactivating: Deactivating,

  /**
   * !#en The lock node, when the node is locked, cannot be clicked in the scene.
   * !#zh 锁定节点，锁定后场景内不能点击。
   * 
   * @property LockedInEditor
   * @private
   */
  LockedInEditor: LockedInEditor,
  ///**
  // * !#en
  // * Hide in game and hierarchy.
  // * This flag is readonly, it can only be used as an argument of `scene.addEntity()` or `Entity.createWithFlags()`.
  // * !#zh
  // * 在游戏和层级中隐藏该对象。<br/>
  // * 该标记只读，它只能被用作 `scene.addEntity()` 或者 `Entity.createWithFlags()` 的一个参数。
  // * @property {Number} HideInGame
  // */
  //HideInGame: HideInGame,
  // FLAGS FOR EDITOR

  /**
   * !#en Hide the object in editor.
   * !#zh 在编辑器中隐藏该对象。
   * @property {Number} HideInHierarchy
   */
  HideInHierarchy: HideInHierarchy,
  ///**
  // * !#en
  // * Hide in game view, hierarchy, and scene view... etc.
  // * This flag is readonly, it can only be used as an argument of `scene.addEntity()` or `Entity.createWithFlags()`.
  // * !#zh
  // * 在游戏视图，层级，场景视图等等...中隐藏该对象。
  // * 该标记只读，它只能被用作 `scene.addEntity()` 或者 `Entity.createWithFlags()` 的一个参数。
  // * @property {Number} Hide
  // */
  //Hide: Hide,
  // FLAGS FOR COMPONENT
  IsPreloadStarted: IsPreloadStarted,
  IsOnLoadStarted: IsOnLoadStarted,
  IsOnLoadCalled: IsOnLoadCalled,
  IsOnEnableCalled: IsOnEnableCalled,
  IsStartCalled: IsStartCalled,
  IsEditorOnEnableCalled: IsEditorOnEnableCalled,
  IsPositionLocked: IsPositionLocked,
  IsRotationLocked: IsRotationLocked,
  IsScaleLocked: IsScaleLocked,
  IsAnchorLocked: IsAnchorLocked,
  IsSizeLocked: IsSizeLocked
});
var objectsToDestroy = [];

function deferredDestroy() {
  var deleteCount = objectsToDestroy.length;

  for (var i = 0; i < deleteCount; ++i) {
    var obj = objectsToDestroy[i];

    if (!(obj._objFlags & Destroyed)) {
      obj._destroyImmediate();
    }
  } // if we called b.destory() in a.onDestroy(), objectsToDestroy will be resized,
  // but we only destroy the objects which called destory in this frame.


  if (deleteCount === objectsToDestroy.length) {
    objectsToDestroy.length = 0;
  } else {
    objectsToDestroy.splice(0, deleteCount);
  }

  if (CC_EDITOR) {
    deferredDestroyTimer = null;
  }
}

js.value(CCObject, '_deferredDestroy', deferredDestroy);

if (CC_EDITOR) {
  js.value(CCObject, '_clearDeferredDestroyTimer', function () {
    if (deferredDestroyTimer !== null) {
      clearImmediate(deferredDestroyTimer);
      deferredDestroyTimer = null;
    }
  });
} // MEMBER

/**
 * @class Object
 */


var prototype = CCObject.prototype;
/**
 * !#en The name of the object.
 * !#zh 该对象的名称。
 * @property {String} name
 * @default ""
 * @example
 * obj.name = "New Obj";
 */

js.getset(prototype, 'name', function () {
  return this._name;
}, function (value) {
  this._name = value;
}, true);
/**
 * !#en
 * Indicates whether the object is not yet destroyed. (It will not be available after being destroyed)<br>
 * When an object's `destroy` is called, it is actually destroyed after the end of this frame.
 * So `isValid` will return false from the next frame, while `isValid` in the current frame will still be true.
 * If you want to determine whether the current frame has called `destroy`, use `cc.isValid(obj, true)`,
 * but this is often caused by a particular logical requirements, which is not normally required.
 *
 * !#zh
 * 表示该对象是否可用（被 destroy 后将不可用）。<br>
 * 当一个对象的 `destroy` 调用以后，会在这一帧结束后才真正销毁。因此从下一帧开始 `isValid` 就会返回 false，而当前帧内 `isValid` 仍然会是 true。如果希望判断当前帧是否调用过 `destroy`，请使用 `cc.isValid(obj, true)`，不过这往往是特殊的业务需求引起的，通常情况下不需要这样。
 *
 * @property {Boolean} isValid
 * @default true
 * @readOnly
 * @example
 * var node = new cc.Node();
 * cc.log(node.isValid);    // true
 * node.destroy();
 * cc.log(node.isValid);    // true, still valid in this frame
 * // after a frame...
 * cc.log(node.isValid);    // false, destroyed in the end of last frame
 */

js.get(prototype, 'isValid', function () {
  return !(this._objFlags & Destroyed);
}, true);

if (CC_EDITOR || CC_TEST) {
  js.get(prototype, 'isRealValid', function () {
    return !(this._objFlags & RealDestroyed);
  });
}

var deferredDestroyTimer = null;
/**
 * !#en
 * Destroy this Object, and release all its own references to other objects.<br/>
 * Actual object destruction will delayed until before rendering.
 * From the next frame, this object is not usable anymore.
 * You can use `cc.isValid(obj)` to check whether the object is destroyed before accessing it.
 * !#zh
 * 销毁该对象，并释放所有它对其它对象的引用。<br/>
 * 实际销毁操作会延迟到当前帧渲染前执行。从下一帧开始，该对象将不再可用。
 * 您可以在访问对象之前使用 `cc.isValid(obj)` 来检查对象是否已被销毁。
 * @method destroy
 * @return {Boolean} whether it is the first time the destroy being called
 * @example
 * obj.destroy();
 */

prototype.destroy = function () {
  if (this._objFlags & Destroyed) {
    cc.warnID(5000);
    return false;
  }

  if (this._objFlags & ToDestroy) {
    return false;
  }

  this._objFlags |= ToDestroy;
  objectsToDestroy.push(this);

  if (CC_EDITOR && deferredDestroyTimer === null && cc.engine && !cc.engine._isUpdating) {
    // auto destroy immediate in edit mode
    deferredDestroyTimer = setImmediate(deferredDestroy);
  }

  return true;
};

if (CC_EDITOR || CC_TEST) {
  /*
   * !#en
   * In fact, Object's "destroy" will not trigger the destruct operation in Firebal Editor.
   * The destruct operation will be executed by Undo system later.
   * !#zh
   * 事实上，对象的 “destroy” 不会在编辑器中触发析构操作，
   * 析构操作将在 Undo 系统中 **延后** 执行。
   * @method realDestroyInEditor
   * @private
   */
  prototype.realDestroyInEditor = function () {
    if (!(this._objFlags & Destroyed)) {
      cc.warnID(5001);
      return;
    }

    if (this._objFlags & RealDestroyed) {
      cc.warnID(5000);
      return;
    }

    this._destruct();

    this._objFlags |= RealDestroyed;
  };
}

function compileDestruct(obj, ctor) {
  var shouldSkipId = obj instanceof cc._BaseNode || obj instanceof cc.Component;
  var idToSkip = shouldSkipId ? '_id' : null;
  var key,
      propsToReset = {};

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === idToSkip) {
        continue;
      }

      switch (typeof obj[key]) {
        case 'string':
          propsToReset[key] = '';
          break;

        case 'object':
        case 'function':
          propsToReset[key] = null;
          break;
      }
    }
  } // Overwrite propsToReset according to Class


  if (cc.Class._isCCClass(ctor)) {
    var attrs = cc.Class.Attr.getClassAttrs(ctor);
    var propList = ctor.__props__;

    for (var i = 0; i < propList.length; i++) {
      key = propList[i];
      var attrKey = key + cc.Class.Attr.DELIMETER + 'default';

      if (attrKey in attrs) {
        if (shouldSkipId && key === '_id') {
          continue;
        }

        switch (typeof attrs[attrKey]) {
          case 'string':
            propsToReset[key] = '';
            break;

          case 'object':
          case 'function':
            propsToReset[key] = null;
            break;

          case 'undefined':
            propsToReset[key] = undefined;
            break;
        }
      }
    }
  }

  if (CC_SUPPORT_JIT) {
    // compile code
    var func = '';

    for (key in propsToReset) {
      var statement;

      if (CCClass.IDENTIFIER_RE.test(key)) {
        statement = 'o.' + key + '=';
      } else {
        statement = 'o[' + CCClass.escapeForJS(key) + ']=';
      }

      var val = propsToReset[key];

      if (val === '') {
        val = '""';
      }

      func += statement + val + ';\n';
    }

    return Function('o', func);
  } else {
    return function (o) {
      for (var key in propsToReset) {
        o[key] = propsToReset[key];
      }
    };
  }
}
/**
 * !#en
 * Clear all references in the instance.
 *
 * NOTE: this method will not clear the `getter` or `setter` functions which defined in the instance of `CCObject`.
 * You can override the `_destruct` method if you need, for example:
 * 
 * ```js
 * _destruct: function () {
 *     for (var key in this) {
 *         if (this.hasOwnProperty(key)) {
 *             switch (typeof this[key]) {
 *                 case 'string':
 *                     this[key] = '';
 *                     break;
 *                 case 'object':
 *                 case 'function':
 *                     this[key] = null;
 *                     break;
 *         }
 *     }
 * }
 * ```
 * !#zh
 * 清除实例中的所有引用。
 * 
 * 注意：此方法不会清除在 `CCObject` 实例中定义的 `getter` 或 `setter`。如果需要，你可以重写 `_destruct` 方法。例如：
 * 
 * ```js
 * _destruct: function () {
 *     for (var key in this) {
 *         if (this.hasOwnProperty(key)) {
 *             switch (typeof this[key]) {
 *                 case 'string':
 *                     this[key] = '';
 *                     break;
 *                 case 'object':
 *                 case 'function':
 *                     this[key] = null;
 *                     break;
 *         }
 *     }
 * }
 * ```
 * @method _destruct
 * @private
 */


prototype._destruct = function () {
  var ctor = this.constructor;
  var destruct = ctor.__destruct__;

  if (!destruct) {
    destruct = compileDestruct(this, ctor);
    js.value(ctor, '__destruct__', destruct, true);
  }

  destruct(this);
};
/**
 * !#en
 * Called before the object being destroyed.
 * !#zh
 * 在对象被销毁之前调用。
 * @method _onPreDestroy
 * @private
 */


prototype._onPreDestroy = null;

prototype._destroyImmediate = function () {
  if (this._objFlags & Destroyed) {
    cc.errorID(5000);
    return;
  } // engine internal callback


  if (this._onPreDestroy) {
    this._onPreDestroy();
  }

  if ((CC_TEST ?
  /* make CC_EDITOR mockable*/
  Function('return !CC_EDITOR')() : !CC_EDITOR) || cc.engine._isPlaying) {
    this._destruct();
  }

  this._objFlags |= Destroyed;
};

if (CC_EDITOR) {
  /**
   * !#en
   * The customized serialization for this object. (Editor Only)
   * !#zh
   * 为此对象定制序列化。
   * @method _serialize
   * @param {Boolean} exporting
   * @return {object} the serialized json data object
   * @private
   */
  prototype._serialize = null;
}
/**
 * !#en
 * Init this object from the custom serialized data.
 * !#zh
 * 从自定义序列化数据初始化此对象。
 * @method _deserialize
 * @param {Object} data - the serialized json data
 * @param {_Deserializer} ctx
 * @private
 */


prototype._deserialize = null;
/**
 * @module cc
 */

/**
 * !#en
 * Checks whether the object is non-nil and not yet destroyed.<br>
 * When an object's `destroy` is called, it is actually destroyed after the end of this frame.
 * So `isValid` will return false from the next frame, while `isValid` in the current frame will still be true.
 * If you want to determine whether the current frame has called `destroy`, use `cc.isValid(obj, true)`,
 * but this is often caused by a particular logical requirements, which is not normally required.
 *
 * !#zh
 * 检查该对象是否不为 null 并且尚未销毁。<br>
 * 当一个对象的 `destroy` 调用以后，会在这一帧结束后才真正销毁。因此从下一帧开始 `isValid` 就会返回 false，而当前帧内 `isValid` 仍然会是 true。如果希望判断当前帧是否调用过 `destroy`，请使用 `cc.isValid(obj, true)`，不过这往往是特殊的业务需求引起的，通常情况下不需要这样。
 *
 * @method isValid
 * @param {any} value
 * @param {Boolean} [strictMode=false] - If true, Object called destroy() in this frame will also treated as invalid.
 * @return {Boolean} whether is valid
 * @example
 * var node = new cc.Node();
 * cc.log(cc.isValid(node));    // true
 * node.destroy();
 * cc.log(cc.isValid(node));    // true, still valid in this frame
 * // after a frame...
 * cc.log(cc.isValid(node));    // false, destroyed in the end of last frame
 */

cc.isValid = function (value, strictMode) {
  if (typeof value === 'object') {
    return !!value && !(value._objFlags & (strictMode ? Destroyed | ToDestroy : Destroyed));
  } else {
    return typeof value !== 'undefined';
  }
};

if (CC_EDITOR || CC_TEST) {
  js.value(CCObject, '_willDestroy', function (obj) {
    return !(obj._objFlags & Destroyed) && (obj._objFlags & ToDestroy) > 0;
  });
  js.value(CCObject, '_cancelDestroy', function (obj) {
    obj._objFlags &= ~ToDestroy;
    js.array.fastRemove(objectsToDestroy, obj);
  });
}

cc.Object = module.exports = CCObject;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL0NDT2JqZWN0LmpzIl0sIm5hbWVzIjpbImpzIiwicmVxdWlyZSIsIkNDQ2xhc3MiLCJEZXN0cm95ZWQiLCJSZWFsRGVzdHJveWVkIiwiVG9EZXN0cm95IiwiRG9udFNhdmUiLCJFZGl0b3JPbmx5IiwiRGlydHkiLCJEb250RGVzdHJveSIsIkRlc3Ryb3lpbmciLCJEZWFjdGl2YXRpbmciLCJMb2NrZWRJbkVkaXRvciIsIkhpZGVJbkhpZXJhcmNoeSIsIklzT25FbmFibGVDYWxsZWQiLCJJc0VkaXRvck9uRW5hYmxlQ2FsbGVkIiwiSXNQcmVsb2FkU3RhcnRlZCIsIklzT25Mb2FkQ2FsbGVkIiwiSXNPbkxvYWRTdGFydGVkIiwiSXNTdGFydENhbGxlZCIsIklzUm90YXRpb25Mb2NrZWQiLCJJc1NjYWxlTG9ja2VkIiwiSXNBbmNob3JMb2NrZWQiLCJJc1NpemVMb2NrZWQiLCJJc1Bvc2l0aW9uTG9ja2VkIiwiUGVyc2lzdGVudE1hc2siLCJDQ09iamVjdCIsIl9uYW1lIiwiX29iakZsYWdzIiwiZmFzdERlZmluZSIsInZhbHVlIiwib2JqZWN0c1RvRGVzdHJveSIsImRlZmVycmVkRGVzdHJveSIsImRlbGV0ZUNvdW50IiwibGVuZ3RoIiwiaSIsIm9iaiIsIl9kZXN0cm95SW1tZWRpYXRlIiwic3BsaWNlIiwiQ0NfRURJVE9SIiwiZGVmZXJyZWREZXN0cm95VGltZXIiLCJjbGVhckltbWVkaWF0ZSIsInByb3RvdHlwZSIsImdldHNldCIsImdldCIsIkNDX1RFU1QiLCJkZXN0cm95IiwiY2MiLCJ3YXJuSUQiLCJwdXNoIiwiZW5naW5lIiwiX2lzVXBkYXRpbmciLCJzZXRJbW1lZGlhdGUiLCJyZWFsRGVzdHJveUluRWRpdG9yIiwiX2Rlc3RydWN0IiwiY29tcGlsZURlc3RydWN0IiwiY3RvciIsInNob3VsZFNraXBJZCIsIl9CYXNlTm9kZSIsIkNvbXBvbmVudCIsImlkVG9Ta2lwIiwia2V5IiwicHJvcHNUb1Jlc2V0IiwiaGFzT3duUHJvcGVydHkiLCJDbGFzcyIsIl9pc0NDQ2xhc3MiLCJhdHRycyIsIkF0dHIiLCJnZXRDbGFzc0F0dHJzIiwicHJvcExpc3QiLCJfX3Byb3BzX18iLCJhdHRyS2V5IiwiREVMSU1FVEVSIiwidW5kZWZpbmVkIiwiQ0NfU1VQUE9SVF9KSVQiLCJmdW5jIiwic3RhdGVtZW50IiwiSURFTlRJRklFUl9SRSIsInRlc3QiLCJlc2NhcGVGb3JKUyIsInZhbCIsIkZ1bmN0aW9uIiwibyIsImNvbnN0cnVjdG9yIiwiZGVzdHJ1Y3QiLCJfX2Rlc3RydWN0X18iLCJfb25QcmVEZXN0cm95IiwiZXJyb3JJRCIsIl9pc1BsYXlpbmciLCJfc2VyaWFsaXplIiwiX2Rlc2VyaWFsaXplIiwiaXNWYWxpZCIsInN0cmljdE1vZGUiLCJhcnJheSIsImZhc3RSZW1vdmUiLCJPYmplY3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxJQUFJQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQWhCOztBQUNBLElBQUlDLE9BQU8sR0FBR0QsT0FBTyxDQUFDLFdBQUQsQ0FBckIsRUFFQTs7O0FBRUEsSUFBSUUsU0FBUyxHQUFHLEtBQUssQ0FBckI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsS0FBSyxDQUF6QjtBQUNBLElBQUlDLFNBQVMsR0FBRyxLQUFLLENBQXJCO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLEtBQUssQ0FBcEI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsS0FBSyxDQUF0QjtBQUNBLElBQUlDLEtBQUssR0FBRyxLQUFLLENBQWpCO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEtBQUssQ0FBdkI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsS0FBSyxDQUF0QjtBQUNBLElBQUlDLFlBQVksR0FBRyxLQUFLLENBQXhCO0FBQ0EsSUFBSUMsY0FBYyxHQUFHLEtBQUssQ0FBMUIsRUFDQTs7QUFDQSxJQUFJQyxlQUFl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QixXQUFPLENBQUMsQ0FBQ0EsS0FBRixJQUFXLEVBQUVBLEtBQUssQ0FBQ0YsU0FBTixJQUFtQmdFLFVBQVUsR0FBSXpGLFNBQVMsR0FBR0UsU0FBaEIsR0FBNkJGLFNBQTFELENBQUYsQ0FBbEI7QUFDSCxHQUZELE1BR0s7QUFDRCxXQUFPLE9BQU8yQixLQUFQLEtBQWlCLFdBQXhCO0FBQ0g7QUFDSixDQVBEOztBQVNBLElBQUlTLFNBQVMsSUFBSU0sT0FBakIsRUFBMEI7QUFDdEI3QyxFQUFBQSxFQUFFLENBQUM4QixLQUFILENBQVNKLFFBQVQsRUFBbUIsY0FBbkIsRUFBbUMsVUFBVVUsR0FBVixFQUFlO0FBQzlDLFdBQU8sRUFBRUEsR0FBRyxDQUFDUixTQUFKLEdBQWdCekIsU0FBbEIsS0FBZ0MsQ0FBQ2lDLEdBQUcsQ0FBQ1IsU0FBSixHQUFnQnZCLFNBQWpCLElBQThCLENBQXJFO0FBQ0gsR0FGRDtBQUdBTCxFQUFBQSxFQUFFLENBQUM4QixLQUFILENBQVNKLFFBQVQsRUFBbUIsZ0JBQW5CLEVBQXFDLFVBQVVVLEdBQVYsRUFBZTtBQUNoREEsSUFBQUEsR0FBRyxDQUFDUixTQUFKLElBQWlCLENBQUN2QixTQUFsQjtBQUNBTCxJQUFBQSxFQUFFLENBQUM2RixLQUFILENBQVNDLFVBQVQsQ0FBb0IvRCxnQkFBcEIsRUFBc0NLLEdBQXRDO0FBQ0gsR0FIRDtBQUlIOztBQUVEVyxFQUFFLENBQUNnRCxNQUFILEdBQVlDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnZFLFFBQTdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIGpzID0gcmVxdWlyZSgnLi9qcycpO1xudmFyIENDQ2xhc3MgPSByZXF1aXJlKCcuL0NDQ2xhc3MnKTtcblxuLy8gZGVmaW5pdGlvbnMgZm9yIENDT2JqZWN0LkZsYWdzXG5cbnZhciBEZXN0cm95ZWQgPSAxIDw8IDA7XG52YXIgUmVhbERlc3Ryb3llZCA9IDEgPDwgMTtcbnZhciBUb0Rlc3Ryb3kgPSAxIDw8IDI7XG52YXIgRG9udFNhdmUgPSAxIDw8IDM7XG52YXIgRWRpdG9yT25seSA9IDEgPDwgNDtcbnZhciBEaXJ0eSA9IDEgPDwgNTtcbnZhciBEb250RGVzdHJveSA9IDEgPDwgNjtcbnZhciBEZXN0cm95aW5nID0gMSA8PCA3O1xudmFyIERlYWN0aXZhdGluZyA9IDEgPDwgODtcbnZhciBMb2NrZWRJbkVkaXRvciA9IDEgPDwgOTtcbi8vdmFyIEhpZGVJbkdhbWUgPSAxIDw8IDk7XG52YXIgSGlkZUluSGllcmFyY2h5ID0gMSA8PCAxMDtcblxudmFyIElzT25FbmFibGVDYWxsZWQgPSAxIDw8IDExO1xudmFyIElzRWRpdG9yT25FbmFibGVDYWxsZWQgPSAxIDw8IDEyO1xudmFyIElzUHJlbG9hZFN0YXJ0ZWQgPSAxIDw8IDEzO1xudmFyIElzT25Mb2FkQ2FsbGVkID0gMSA8PCAxNDtcbnZhciBJc09uTG9hZFN0YXJ0ZWQgPSAxIDw8IDE1O1xudmFyIElzU3RhcnRDYWxsZWQgPSAxIDw8IDE2O1xuXG52YXIgSXNSb3RhdGlvbkxvY2tlZCA9IDEgPDwgMTc7XG52YXIgSXNTY2FsZUxvY2tlZCA9IDEgPDwgMTg7XG52YXIgSXNBbmNob3JMb2NrZWQgPSAxIDw8IDE5O1xudmFyIElzU2l6ZUxvY2tlZCA9IDEgPDwgMjA7XG52YXIgSXNQb3NpdGlvbkxvY2tlZCA9IDEgPDwgMjE7XG5cbi8vIHZhciBIaWRlID0gSGlkZUluR2FtZSB8IEhpZGVJbkhpZXJhcmNoeTtcbi8vIHNob3VsZCBub3QgY2xvbmUgb3Igc2VyaWFsaXplIHRoZXNlIGZsYWdzXG52YXIgUGVyc2lzdGVudE1hc2sgPSB+KFRvRGVzdHJveSB8IERpcnR5IHwgRGVzdHJveWluZyB8IERvbnREZXN0cm95IHwgRGVhY3RpdmF0aW5nIHxcbiAgICAgICAgICAgICAgICAgICAgICAgSXNQcmVsb2FkU3RhcnRlZCB8IElzT25Mb2FkU3RhcnRlZCB8IElzT25Mb2FkQ2FsbGVkIHwgSXNTdGFydENhbGxlZCB8XG4gICAgICAgICAgICAgICAgICAgICAgIElzT25FbmFibGVDYWxsZWQgfCBJc0VkaXRvck9uRW5hYmxlQ2FsbGVkIHxcbiAgICAgICAgICAgICAgICAgICAgICAgSXNSb3RhdGlvbkxvY2tlZCB8IElzU2NhbGVMb2NrZWQgfCBJc0FuY2hvckxvY2tlZCB8IElzU2l6ZUxvY2tlZCB8IElzUG9zaXRpb25Mb2NrZWRcbiAgICAgICAgICAgICAgICAgICAgICAgLypSZWdpc3RlcmVkSW5FZGl0b3IqLyk7XG5cbi8qKlxuICogVGhlIGJhc2UgY2xhc3Mgb2YgbW9zdCBvZiBhbGwgdGhlIG9iamVjdHMgaW4gRmlyZWJhbGwuXG4gKiBAY2xhc3MgT2JqZWN0XG4gKlxuICogQG1haW5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIENDT2JqZWN0ICgpIHtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gX25hbWVcbiAgICAgKiBAZGVmYXVsdCBcIlwiXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLl9uYW1lID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gX29iakZsYWdzXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fb2JqRmxhZ3MgPSAwO1xufVxuQ0NDbGFzcy5mYXN0RGVmaW5lKCdjYy5PYmplY3QnLCBDQ09iamVjdCwgeyBfbmFtZTogJycsIF9vYmpGbGFnczogMCB9KTtcblxuLyoqXG4gKiBCaXQgbWFzayB0aGF0IGNvbnRyb2xzIG9iamVjdCBzdGF0ZXMuXG4gKiBAZW51bSBGbGFnc1xuICogQHN0YXRpY1xuICogQHByaXZhdGVcbiAqL1xuanMudmFsdWUoQ0NPYmplY3QsICdGbGFncycsIHtcblxuICAgIERlc3Ryb3llZCxcbiAgICAvL1RvRGVzdHJveTogVG9EZXN0cm95LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgb2JqZWN0IHdpbGwgbm90IGJlIHNhdmVkLlxuICAgICAqICEjemgg6K+l5a+56LGh5bCG5LiN5Lya6KKr5L+d5a2Y44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IERvbnRTYXZlXG4gICAgICovXG4gICAgRG9udFNhdmUsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBvYmplY3Qgd2lsbCBub3QgYmUgc2F2ZWQgd2hlbiBidWlsZGluZyBhIHBsYXllci5cbiAgICAgKiAhI3poIOaehOW7uumhueebruaXtu+8jOivpeWvueixoeWwhuS4jeS8muiiq+S/neWtmOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBFZGl0b3JPbmx5XG4gICAgICovXG4gICAgRWRpdG9yT25seSxcblxuICAgIERpcnR5LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBEb250IGRlc3Ryb3kgYXV0b21hdGljYWxseSB3aGVuIGxvYWRpbmcgYSBuZXcgc2NlbmUuXG4gICAgICogISN6aCDliqDovb3kuIDkuKrmlrDlnLrmma/ml7bvvIzkuI3oh6rliqjliKDpmaTor6Xlr7nosaHjgIJcbiAgICAgKiBAcHJvcGVydHkgRG9udERlc3Ryb3lcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIERvbnREZXN0cm95LFxuXG4gICAgUGVyc2lzdGVudE1hc2ssXG5cbiAgICAvLyBGTEFHUyBGT1IgRU5HSU5FXG5cbiAgICBEZXN0cm95aW5nLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgbm9kZSBpcyBkZWFjdGl2YXRpbmcuXG4gICAgICogISN6aCDoioLngrnmraPlnKjlj43mv4DmtLvnmoTov4fnqIvkuK3jgIJcbiAgICAgKiBAcHJvcGVydHkgRGVhY3RpdmF0aW5nXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBEZWFjdGl2YXRpbmcsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBsb2NrIG5vZGUsIHdoZW4gdGhlIG5vZGUgaXMgbG9ja2VkLCBjYW5ub3QgYmUgY2xpY2tlZCBpbiB0aGUgc2NlbmUuXG4gICAgICogISN6aCDplIHlrproioLngrnvvIzplIHlrprlkI7lnLrmma/lhoXkuI3og73ngrnlh7vjgIJcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgTG9ja2VkSW5FZGl0b3JcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIExvY2tlZEluRWRpdG9yLFxuXG4gICAgLy8vKipcbiAgICAvLyAqICEjZW5cbiAgICAvLyAqIEhpZGUgaW4gZ2FtZSBhbmQgaGllcmFyY2h5LlxuICAgIC8vICogVGhpcyBmbGFnIGlzIHJlYWRvbmx5LCBpdCBjYW4gb25seSBiZSB1c2VkIGFzIGFuIGFyZ3VtZW50IG9mIGBzY2VuZS5hZGRFbnRpdHkoKWAgb3IgYEVudGl0eS5jcmVhdGVXaXRoRmxhZ3MoKWAuXG4gICAgLy8gKiAhI3poXG4gICAgLy8gKiDlnKjmuLjmiI/lkozlsYLnuqfkuK3pmpDol4/or6Xlr7nosaHjgII8YnIvPlxuICAgIC8vICog6K+l5qCH6K6w5Y+q6K+777yM5a6D5Y+q6IO96KKr55So5L2cIGBzY2VuZS5hZGRFbnRpdHkoKWAg5oiW6ICFIGBFbnRpdHkuY3JlYXRlV2l0aEZsYWdzKClgIOeahOS4gOS4quWPguaVsOOAglxuICAgIC8vICogQHByb3BlcnR5IHtOdW1iZXJ9IEhpZGVJbkdhbWVcbiAgICAvLyAqL1xuICAgIC8vSGlkZUluR2FtZTogSGlkZUluR2FtZSxcblxuICAgIC8vIEZMQUdTIEZPUiBFRElUT1JcblxuICAgIC8qKlxuICAgICAqICEjZW4gSGlkZSB0aGUgb2JqZWN0IGluIGVkaXRvci5cbiAgICAgKiAhI3poIOWcqOe8lui+keWZqOS4remakOiXj+ivpeWvueixoeOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBIaWRlSW5IaWVyYXJjaHlcbiAgICAgKi9cbiAgICBIaWRlSW5IaWVyYXJjaHk6IEhpZGVJbkhpZXJhcmNoeSxcblxuICAgIC8vLyoqXG4gICAgLy8gKiAhI2VuXG4gICAgLy8gKiBIaWRlIGluIGdhbWUgdmlldywgaGllcmFyY2h5LCBhbmQgc2NlbmUgdmlldy4uLiBldGMuXG4gICAgLy8gKiBUaGlzIGZsYWcgaXMgcmVhZG9ubHksIGl0IGNhbiBvbmx5IGJlIHVzZWQgYXMgYW4gYXJndW1lbnQgb2YgYHNjZW5lLmFkZEVudGl0eSgpYCBvciBgRW50aXR5LmNyZWF0ZVdpdGhGbGFncygpYC5cbiAgICAvLyAqICEjemhcbiAgICAvLyAqIOWcqOa4uOaIj+inhuWbvu+8jOWxgue6p++8jOWcuuaZr+inhuWbvuetieetiS4uLuS4remakOiXj+ivpeWvueixoeOAglxuICAgIC8vICog6K+l5qCH6K6w5Y+q6K+777yM5a6D5Y+q6IO96KKr55So5L2cIGBzY2VuZS5hZGRFbnRpdHkoKWAg5oiW6ICFIGBFbnRpdHkuY3JlYXRlV2l0aEZsYWdzKClgIOeahOS4gOS4quWPguaVsOOAglxuICAgIC8vICogQHByb3BlcnR5IHtOdW1iZXJ9IEhpZGVcbiAgICAvLyAqL1xuICAgIC8vSGlkZTogSGlkZSxcblxuICAgIC8vIEZMQUdTIEZPUiBDT01QT05FTlRcblxuICAgIElzUHJlbG9hZFN0YXJ0ZWQsXG4gICAgSXNPbkxvYWRTdGFydGVkLFxuICAgIElzT25Mb2FkQ2FsbGVkLFxuICAgIElzT25FbmFibGVDYWxsZWQsXG4gICAgSXNTdGFydENhbGxlZCxcbiAgICBJc0VkaXRvck9uRW5hYmxlQ2FsbGVkLFxuXG4gICAgSXNQb3NpdGlvbkxvY2tlZCxcbiAgICBJc1JvdGF0aW9uTG9ja2VkLFxuICAgIElzU2NhbGVMb2NrZWQsXG4gICAgSXNBbmNob3JMb2NrZWQsXG4gICAgSXNTaXplTG9ja2VkLFxufSk7XG5cbnZhciBvYmplY3RzVG9EZXN0cm95ID0gW107XG5cbmZ1bmN0aW9uIGRlZmVycmVkRGVzdHJveSAoKSB7XG4gICAgdmFyIGRlbGV0ZUNvdW50ID0gb2JqZWN0c1RvRGVzdHJveS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZWxldGVDb3VudDsgKytpKSB7XG4gICAgICAgIHZhciBvYmogPSBvYmplY3RzVG9EZXN0cm95W2ldO1xuICAgICAgICBpZiAoIShvYmouX29iakZsYWdzICYgRGVzdHJveWVkKSkge1xuICAgICAgICAgICAgb2JqLl9kZXN0cm95SW1tZWRpYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gaWYgd2UgY2FsbGVkIGIuZGVzdG9yeSgpIGluIGEub25EZXN0cm95KCksIG9iamVjdHNUb0Rlc3Ryb3kgd2lsbCBiZSByZXNpemVkLFxuICAgIC8vIGJ1dCB3ZSBvbmx5IGRlc3Ryb3kgdGhlIG9iamVjdHMgd2hpY2ggY2FsbGVkIGRlc3RvcnkgaW4gdGhpcyBmcmFtZS5cbiAgICBpZiAoZGVsZXRlQ291bnQgPT09IG9iamVjdHNUb0Rlc3Ryb3kubGVuZ3RoKSB7XG4gICAgICAgIG9iamVjdHNUb0Rlc3Ryb3kubGVuZ3RoID0gMDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG9iamVjdHNUb0Rlc3Ryb3kuc3BsaWNlKDAsIGRlbGV0ZUNvdW50KTtcbiAgICB9XG5cbiAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgIGRlZmVycmVkRGVzdHJveVRpbWVyID0gbnVsbDtcbiAgICB9XG59XG5cbmpzLnZhbHVlKENDT2JqZWN0LCAnX2RlZmVycmVkRGVzdHJveScsIGRlZmVycmVkRGVzdHJveSk7XG5cbmlmIChDQ19FRElUT1IpIHtcbiAgICBqcy52YWx1ZShDQ09iamVjdCwgJ19jbGVhckRlZmVycmVkRGVzdHJveVRpbWVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoZGVmZXJyZWREZXN0cm95VGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlKGRlZmVycmVkRGVzdHJveVRpbWVyKTtcbiAgICAgICAgICAgIGRlZmVycmVkRGVzdHJveVRpbWVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vLyBNRU1CRVJcblxuLyoqXG4gKiBAY2xhc3MgT2JqZWN0XG4gKi9cblxudmFyIHByb3RvdHlwZSA9IENDT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiAhI2VuIFRoZSBuYW1lIG9mIHRoZSBvYmplY3QuXG4gKiAhI3poIOivpeWvueixoeeahOWQjeensOOAglxuICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWVcbiAqIEBkZWZhdWx0IFwiXCJcbiAqIEBleGFtcGxlXG4gKiBvYmoubmFtZSA9IFwiTmV3IE9ialwiO1xuICovXG5qcy5nZXRzZXQocHJvdG90eXBlLCAnbmFtZScsXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9LFxuICAgIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gICAgfSxcbiAgICB0cnVlXG4pO1xuXG4vKipcbiAqICEjZW5cbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBvYmplY3QgaXMgbm90IHlldCBkZXN0cm95ZWQuIChJdCB3aWxsIG5vdCBiZSBhdmFpbGFibGUgYWZ0ZXIgYmVpbmcgZGVzdHJveWVkKTxicj5cbiAqIFdoZW4gYW4gb2JqZWN0J3MgYGRlc3Ryb3lgIGlzIGNhbGxlZCwgaXQgaXMgYWN0dWFsbHkgZGVzdHJveWVkIGFmdGVyIHRoZSBlbmQgb2YgdGhpcyBmcmFtZS5cbiAqIFNvIGBpc1ZhbGlkYCB3aWxsIHJldHVybiBmYWxzZSBmcm9tIHRoZSBuZXh0IGZyYW1lLCB3aGlsZSBgaXNWYWxpZGAgaW4gdGhlIGN1cnJlbnQgZnJhbWUgd2lsbCBzdGlsbCBiZSB0cnVlLlxuICogSWYgeW91IHdhbnQgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgZnJhbWUgaGFzIGNhbGxlZCBgZGVzdHJveWAsIHVzZSBgY2MuaXNWYWxpZChvYmosIHRydWUpYCxcbiAqIGJ1dCB0aGlzIGlzIG9mdGVuIGNhdXNlZCBieSBhIHBhcnRpY3VsYXIgbG9naWNhbCByZXF1aXJlbWVudHMsIHdoaWNoIGlzIG5vdCBub3JtYWxseSByZXF1aXJlZC5cbiAqXG4gKiAhI3poXG4gKiDooajnpLror6Xlr7nosaHmmK/lkKblj6/nlKjvvIjooqsgZGVzdHJveSDlkI7lsIbkuI3lj6/nlKjvvInjgII8YnI+XG4gKiDlvZPkuIDkuKrlr7nosaHnmoQgYGRlc3Ryb3lgIOiwg+eUqOS7peWQju+8jOS8muWcqOi/meS4gOW4p+e7k+adn+WQjuaJjeecn+ato+mUgOavgeOAguWboOatpOS7juS4i+S4gOW4p+W8gOWniyBgaXNWYWxpZGAg5bCx5Lya6L+U5ZueIGZhbHNl77yM6ICM5b2T5YmN5bin5YaFIGBpc1ZhbGlkYCDku43nhLbkvJrmmK8gdHJ1ZeOAguWmguaenOW4jOacm+WIpOaWreW9k+WJjeW4p+aYr+WQpuiwg+eUqOi/hyBgZGVzdHJveWDvvIzor7fkvb/nlKggYGNjLmlzVmFsaWQob2JqLCB0cnVlKWDvvIzkuI3ov4fov5nlvoDlvoDmmK/nibnmrornmoTkuJrliqHpnIDmsYLlvJXotbfnmoTvvIzpgJrluLjmg4XlhrXkuIvkuI3pnIDopoHov5nmoLfjgIJcbiAqXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzVmFsaWRcbiAqIEBkZWZhdWx0IHRydWVcbiAqIEByZWFkT25seVxuICogQGV4YW1wbGVcbiAqIHZhciBub2RlID0gbmV3IGNjLk5vZGUoKTtcbiAqIGNjLmxvZyhub2RlLmlzVmFsaWQpOyAgICAvLyB0cnVlXG4gKiBub2RlLmRlc3Ryb3koKTtcbiAqIGNjLmxvZyhub2RlLmlzVmFsaWQpOyAgICAvLyB0cnVlLCBzdGlsbCB2YWxpZCBpbiB0aGlzIGZyYW1lXG4gKiAvLyBhZnRlciBhIGZyYW1lLi4uXG4gKiBjYy5sb2cobm9kZS5pc1ZhbGlkKTsgICAgLy8gZmFsc2UsIGRlc3Ryb3llZCBpbiB0aGUgZW5kIG9mIGxhc3QgZnJhbWVcbiAqL1xuanMuZ2V0KHByb3RvdHlwZSwgJ2lzVmFsaWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICEodGhpcy5fb2JqRmxhZ3MgJiBEZXN0cm95ZWQpO1xufSwgdHJ1ZSk7XG5cbmlmIChDQ19FRElUT1IgfHwgQ0NfVEVTVCkge1xuICAgIGpzLmdldChwcm90b3R5cGUsICdpc1JlYWxWYWxpZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICEodGhpcy5fb2JqRmxhZ3MgJiBSZWFsRGVzdHJveWVkKTtcbiAgICB9KTtcbn1cblxudmFyIGRlZmVycmVkRGVzdHJveVRpbWVyID0gbnVsbDtcblxuLyoqXG4gKiAhI2VuXG4gKiBEZXN0cm95IHRoaXMgT2JqZWN0LCBhbmQgcmVsZWFzZSBhbGwgaXRzIG93biByZWZlcmVuY2VzIHRvIG90aGVyIG9iamVjdHMuPGJyLz5cbiAqIEFjdHVhbCBvYmplY3QgZGVzdHJ1Y3Rpb24gd2lsbCBkZWxheWVkIHVudGlsIGJlZm9yZSByZW5kZXJpbmcuXG4gKiBGcm9tIHRoZSBuZXh0IGZyYW1lLCB0aGlzIG9iamVjdCBpcyBub3QgdXNhYmxlIGFueW1vcmUuXG4gKiBZb3UgY2FuIHVzZSBgY2MuaXNWYWxpZChvYmopYCB0byBjaGVjayB3aGV0aGVyIHRoZSBvYmplY3QgaXMgZGVzdHJveWVkIGJlZm9yZSBhY2Nlc3NpbmcgaXQuXG4gKiAhI3poXG4gKiDplIDmr4Hor6Xlr7nosaHvvIzlubbph4rmlL7miYDmnInlroPlr7nlhbblroPlr7nosaHnmoTlvJXnlKjjgII8YnIvPlxuICog5a6e6ZmF6ZSA5q+B5pON5L2c5Lya5bu26L+f5Yiw5b2T5YmN5bin5riy5p+T5YmN5omn6KGM44CC5LuO5LiL5LiA5bin5byA5aeL77yM6K+l5a+56LGh5bCG5LiN5YaN5Y+v55So44CCXG4gKiDmgqjlj6/ku6XlnKjorr/pl67lr7nosaHkuYvliY3kvb/nlKggYGNjLmlzVmFsaWQob2JqKWAg5p2l5qOA5p+l5a+56LGh5piv5ZCm5bey6KKr6ZSA5q+B44CCXG4gKiBAbWV0aG9kIGRlc3Ryb3lcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHdoZXRoZXIgaXQgaXMgdGhlIGZpcnN0IHRpbWUgdGhlIGRlc3Ryb3kgYmVpbmcgY2FsbGVkXG4gKiBAZXhhbXBsZVxuICogb2JqLmRlc3Ryb3koKTtcbiAqL1xucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX29iakZsYWdzICYgRGVzdHJveWVkKSB7XG4gICAgICAgIGNjLndhcm5JRCg1MDAwKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fb2JqRmxhZ3MgJiBUb0Rlc3Ryb3kpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9vYmpGbGFncyB8PSBUb0Rlc3Ryb3k7XG4gICAgb2JqZWN0c1RvRGVzdHJveS5wdXNoKHRoaXMpO1xuXG4gICAgaWYgKENDX0VESVRPUiAmJiBkZWZlcnJlZERlc3Ryb3lUaW1lciA9PT0gbnVsbCAmJiBjYy5lbmdpbmUgJiYgISBjYy5lbmdpbmUuX2lzVXBkYXRpbmcpIHtcbiAgICAgICAgLy8gYXV0byBkZXN0cm95IGltbWVkaWF0ZSBpbiBlZGl0IG1vZGVcbiAgICAgICAgZGVmZXJyZWREZXN0cm95VGltZXIgPSBzZXRJbW1lZGlhdGUoZGVmZXJyZWREZXN0cm95KTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5pZiAoQ0NfRURJVE9SIHx8IENDX1RFU1QpIHtcbiAgICAvKlxuICAgICAqICEjZW5cbiAgICAgKiBJbiBmYWN0LCBPYmplY3QncyBcImRlc3Ryb3lcIiB3aWxsIG5vdCB0cmlnZ2VyIHRoZSBkZXN0cnVjdCBvcGVyYXRpb24gaW4gRmlyZWJhbCBFZGl0b3IuXG4gICAgICogVGhlIGRlc3RydWN0IG9wZXJhdGlvbiB3aWxsIGJlIGV4ZWN1dGVkIGJ5IFVuZG8gc3lzdGVtIGxhdGVyLlxuICAgICAqICEjemhcbiAgICAgKiDkuovlrp7kuIrvvIzlr7nosaHnmoQg4oCcZGVzdHJveeKAnSDkuI3kvJrlnKjnvJbovpHlmajkuK3op6blj5HmnpDmnoTmk43kvZzvvIxcbiAgICAgKiDmnpDmnoTmk43kvZzlsIblnKggVW5kbyDns7vnu5/kuK0gKirlu7blkI4qKiDmiafooYzjgIJcbiAgICAgKiBAbWV0aG9kIHJlYWxEZXN0cm95SW5FZGl0b3JcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByb3RvdHlwZS5yZWFsRGVzdHJveUluRWRpdG9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoICEodGhpcy5fb2JqRmxhZ3MgJiBEZXN0cm95ZWQpICkge1xuICAgICAgICAgICAgY2Mud2FybklEKDUwMDEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9vYmpGbGFncyAmIFJlYWxEZXN0cm95ZWQpIHtcbiAgICAgICAgICAgIGNjLndhcm5JRCg1MDAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kZXN0cnVjdCgpO1xuICAgICAgICB0aGlzLl9vYmpGbGFncyB8PSBSZWFsRGVzdHJveWVkO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGNvbXBpbGVEZXN0cnVjdCAob2JqLCBjdG9yKSB7XG4gICAgdmFyIHNob3VsZFNraXBJZCA9IG9iaiBpbnN0YW5jZW9mIGNjLl9CYXNlTm9kZSB8fCBvYmogaW5zdGFuY2VvZiBjYy5Db21wb25lbnQ7XG4gICAgdmFyIGlkVG9Ta2lwID0gc2hvdWxkU2tpcElkID8gJ19pZCcgOiBudWxsO1xuXG4gICAgdmFyIGtleSwgcHJvcHNUb1Jlc2V0ID0ge307XG4gICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gaWRUb1NraXApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIG9ialtrZXldKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgcHJvcHNUb1Jlc2V0W2tleV0gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIHByb3BzVG9SZXNldFtrZXldID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gT3ZlcndyaXRlIHByb3BzVG9SZXNldCBhY2NvcmRpbmcgdG8gQ2xhc3NcbiAgICBpZiAoY2MuQ2xhc3MuX2lzQ0NDbGFzcyhjdG9yKSkge1xuICAgICAgICB2YXIgYXR0cnMgPSBjYy5DbGFzcy5BdHRyLmdldENsYXNzQXR0cnMoY3Rvcik7XG4gICAgICAgIHZhciBwcm9wTGlzdCA9IGN0b3IuX19wcm9wc19fO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBrZXkgPSBwcm9wTGlzdFtpXTtcbiAgICAgICAgICAgIHZhciBhdHRyS2V5ID0ga2V5ICsgY2MuQ2xhc3MuQXR0ci5ERUxJTUVURVIgKyAnZGVmYXVsdCc7XG4gICAgICAgICAgICBpZiAoYXR0cktleSBpbiBhdHRycykge1xuICAgICAgICAgICAgICAgIGlmIChzaG91bGRTa2lwSWQgJiYga2V5ID09PSAnX2lkJykge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgYXR0cnNbYXR0cktleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzVG9SZXNldFtrZXldID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHNUb1Jlc2V0W2tleV0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wc1RvUmVzZXRba2V5XSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChDQ19TVVBQT1JUX0pJVCkge1xuICAgICAgICAvLyBjb21waWxlIGNvZGVcbiAgICAgICAgdmFyIGZ1bmMgPSAnJztcbiAgICAgICAgZm9yIChrZXkgaW4gcHJvcHNUb1Jlc2V0KSB7XG4gICAgICAgICAgICB2YXIgc3RhdGVtZW50O1xuICAgICAgICAgICAgaWYgKENDQ2xhc3MuSURFTlRJRklFUl9SRS50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSAnby4nICsga2V5ICsgJz0nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gJ29bJyArIENDQ2xhc3MuZXNjYXBlRm9ySlMoa2V5KSArICddPSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdmFsID0gcHJvcHNUb1Jlc2V0W2tleV07XG4gICAgICAgICAgICBpZiAodmFsID09PSAnJykge1xuICAgICAgICAgICAgICAgIHZhbCA9ICdcIlwiJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmMgKz0gKHN0YXRlbWVudCArIHZhbCArICc7XFxuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEZ1bmN0aW9uKCdvJywgZnVuYyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wc1RvUmVzZXQpIHtcbiAgICAgICAgICAgICAgICBvW2tleV0gPSBwcm9wc1RvUmVzZXRba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8qKlxuICogISNlblxuICogQ2xlYXIgYWxsIHJlZmVyZW5jZXMgaW4gdGhlIGluc3RhbmNlLlxuICpcbiAqIE5PVEU6IHRoaXMgbWV0aG9kIHdpbGwgbm90IGNsZWFyIHRoZSBgZ2V0dGVyYCBvciBgc2V0dGVyYCBmdW5jdGlvbnMgd2hpY2ggZGVmaW5lZCBpbiB0aGUgaW5zdGFuY2Ugb2YgYENDT2JqZWN0YC5cbiAqIFlvdSBjYW4gb3ZlcnJpZGUgdGhlIGBfZGVzdHJ1Y3RgIG1ldGhvZCBpZiB5b3UgbmVlZCwgZm9yIGV4YW1wbGU6XG4gKiBcbiAqIGBgYGpzXG4gKiBfZGVzdHJ1Y3Q6IGZ1bmN0aW9uICgpIHtcbiAqICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuICogICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gKiAgICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0aGlzW2tleV0pIHtcbiAqICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICogICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAnJztcbiAqICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gKiAgICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAqICAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gKiAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG51bGw7XG4gKiAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICogICAgICAgICB9XG4gKiAgICAgfVxuICogfVxuICogYGBgXG4gKiAhI3poXG4gKiDmuIXpmaTlrp7kvovkuK3nmoTmiYDmnInlvJXnlKjjgIJcbiAqIFxuICog5rOo5oSP77ya5q2k5pa55rOV5LiN5Lya5riF6Zmk5ZyoIGBDQ09iamVjdGAg5a6e5L6L5Lit5a6a5LmJ55qEIGBnZXR0ZXJgIOaIliBgc2V0dGVyYOOAguWmguaenOmcgOimge+8jOS9oOWPr+S7pemHjeWGmSBgX2Rlc3RydWN0YCDmlrnms5XjgILkvovlpoLvvJpcbiAqIFxuICogYGBganNcbiAqIF9kZXN0cnVjdDogZnVuY3Rpb24gKCkge1xuICogICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG4gKiAgICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAqICAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIHRoaXNba2V5XSkge1xuICogICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gKiAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9ICcnO1xuICogICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAqICAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICogICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAqICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gbnVsbDtcbiAqICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gKiAgICAgICAgIH1cbiAqICAgICB9XG4gKiB9XG4gKiBgYGBcbiAqIEBtZXRob2QgX2Rlc3RydWN0XG4gKiBAcHJpdmF0ZVxuICovXG5wcm90b3R5cGUuX2Rlc3RydWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICB2YXIgZGVzdHJ1Y3QgPSBjdG9yLl9fZGVzdHJ1Y3RfXztcbiAgICBpZiAoIWRlc3RydWN0KSB7XG4gICAgICAgIGRlc3RydWN0ID0gY29tcGlsZURlc3RydWN0KHRoaXMsIGN0b3IpO1xuICAgICAgICBqcy52YWx1ZShjdG9yLCAnX19kZXN0cnVjdF9fJywgZGVzdHJ1Y3QsIHRydWUpO1xuICAgIH1cbiAgICBkZXN0cnVjdCh0aGlzKTtcbn07XG5cbi8qKlxuICogISNlblxuICogQ2FsbGVkIGJlZm9yZSB0aGUgb2JqZWN0IGJlaW5nIGRlc3Ryb3llZC5cbiAqICEjemhcbiAqIOWcqOWvueixoeiiq+mUgOavgeS5i+WJjeiwg+eUqOOAglxuICogQG1ldGhvZCBfb25QcmVEZXN0cm95XG4gKiBAcHJpdmF0ZVxuICovXG5wcm90b3R5cGUuX29uUHJlRGVzdHJveSA9IG51bGw7XG5cbnByb3RvdHlwZS5fZGVzdHJveUltbWVkaWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fb2JqRmxhZ3MgJiBEZXN0cm95ZWQpIHtcbiAgICAgICAgY2MuZXJyb3JJRCg1MDAwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBlbmdpbmUgaW50ZXJuYWwgY2FsbGJhY2tcbiAgICBpZiAodGhpcy5fb25QcmVEZXN0cm95KSB7XG4gICAgICAgIHRoaXMuX29uUHJlRGVzdHJveSgpO1xuICAgIH1cblxuICAgIGlmICgoQ0NfVEVTVCA/ICgvKiBtYWtlIENDX0VESVRPUiBtb2NrYWJsZSovIEZ1bmN0aW9uKCdyZXR1cm4gIUNDX0VESVRPUicpKSgpIDogIUNDX0VESVRPUikgfHwgY2MuZW5naW5lLl9pc1BsYXlpbmcpIHtcbiAgICAgICAgdGhpcy5fZGVzdHJ1Y3QoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9vYmpGbGFncyB8PSBEZXN0cm95ZWQ7XG59O1xuXG5pZiAoQ0NfRURJVE9SKSB7XG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFRoZSBjdXN0b21pemVkIHNlcmlhbGl6YXRpb24gZm9yIHRoaXMgb2JqZWN0LiAoRWRpdG9yIE9ubHkpXG4gICAgICogISN6aFxuICAgICAqIOS4uuatpOWvueixoeWumuWItuW6j+WIl+WMluOAglxuICAgICAqIEBtZXRob2QgX3NlcmlhbGl6ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZXhwb3J0aW5nXG4gICAgICogQHJldHVybiB7b2JqZWN0fSB0aGUgc2VyaWFsaXplZCBqc29uIGRhdGEgb2JqZWN0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcm90b3R5cGUuX3NlcmlhbGl6ZSA9IG51bGw7XG59XG5cbi8qKlxuICogISNlblxuICogSW5pdCB0aGlzIG9iamVjdCBmcm9tIHRoZSBjdXN0b20gc2VyaWFsaXplZCBkYXRhLlxuICogISN6aFxuICog5LuO6Ieq5a6a5LmJ5bqP5YiX5YyW5pWw5o2u5Yid5aeL5YyW5q2k5a+56LGh44CCXG4gKiBAbWV0aG9kIF9kZXNlcmlhbGl6ZVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0aGUgc2VyaWFsaXplZCBqc29uIGRhdGFcbiAqIEBwYXJhbSB7X0Rlc2VyaWFsaXplcn0gY3R4XG4gKiBAcHJpdmF0ZVxuICovXG5wcm90b3R5cGUuX2Rlc2VyaWFsaXplID0gbnVsbDtcblxuLyoqXG4gKiBAbW9kdWxlIGNjXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgb2JqZWN0IGlzIG5vbi1uaWwgYW5kIG5vdCB5ZXQgZGVzdHJveWVkLjxicj5cbiAqIFdoZW4gYW4gb2JqZWN0J3MgYGRlc3Ryb3lgIGlzIGNhbGxlZCwgaXQgaXMgYWN0dWFsbHkgZGVzdHJveWVkIGFmdGVyIHRoZSBlbmQgb2YgdGhpcyBmcmFtZS5cbiAqIFNvIGBpc1ZhbGlkYCB3aWxsIHJldHVybiBmYWxzZSBmcm9tIHRoZSBuZXh0IGZyYW1lLCB3aGlsZSBgaXNWYWxpZGAgaW4gdGhlIGN1cnJlbnQgZnJhbWUgd2lsbCBzdGlsbCBiZSB0cnVlLlxuICogSWYgeW91IHdhbnQgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgZnJhbWUgaGFzIGNhbGxlZCBgZGVzdHJveWAsIHVzZSBgY2MuaXNWYWxpZChvYmosIHRydWUpYCxcbiAqIGJ1dCB0aGlzIGlzIG9mdGVuIGNhdXNlZCBieSBhIHBhcnRpY3VsYXIgbG9naWNhbCByZXF1aXJlbWVudHMsIHdoaWNoIGlzIG5vdCBub3JtYWxseSByZXF1aXJlZC5cbiAqXG4gKiAhI3poXG4gKiDmo4Dmn6Xor6Xlr7nosaHmmK/lkKbkuI3kuLogbnVsbCDlubbkuJTlsJrmnKrplIDmr4HjgII8YnI+XG4gKiDlvZPkuIDkuKrlr7nosaHnmoQgYGRlc3Ryb3lgIOiwg+eUqOS7peWQju+8jOS8muWcqOi/meS4gOW4p+e7k+adn+WQjuaJjeecn+ato+mUgOavgeOAguWboOatpOS7juS4i+S4gOW4p+W8gOWniyBgaXNWYWxpZGAg5bCx5Lya6L+U5ZueIGZhbHNl77yM6ICM5b2T5YmN5bin5YaFIGBpc1ZhbGlkYCDku43nhLbkvJrmmK8gdHJ1ZeOAguWmguaenOW4jOacm+WIpOaWreW9k+WJjeW4p+aYr+WQpuiwg+eUqOi/hyBgZGVzdHJveWDvvIzor7fkvb/nlKggYGNjLmlzVmFsaWQob2JqLCB0cnVlKWDvvIzkuI3ov4fov5nlvoDlvoDmmK/nibnmrornmoTkuJrliqHpnIDmsYLlvJXotbfnmoTvvIzpgJrluLjmg4XlhrXkuIvkuI3pnIDopoHov5nmoLfjgIJcbiAqXG4gKiBAbWV0aG9kIGlzVmFsaWRcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHBhcmFtIHtCb29sZWFufSBbc3RyaWN0TW9kZT1mYWxzZV0gLSBJZiB0cnVlLCBPYmplY3QgY2FsbGVkIGRlc3Ryb3koKSBpbiB0aGlzIGZyYW1lIHdpbGwgYWxzbyB0cmVhdGVkIGFzIGludmFsaWQuXG4gKiBAcmV0dXJuIHtCb29sZWFufSB3aGV0aGVyIGlzIHZhbGlkXG4gKiBAZXhhbXBsZVxuICogdmFyIG5vZGUgPSBuZXcgY2MuTm9kZSgpO1xuICogY2MubG9nKGNjLmlzVmFsaWQobm9kZSkpOyAgICAvLyB0cnVlXG4gKiBub2RlLmRlc3Ryb3koKTtcbiAqIGNjLmxvZyhjYy5pc1ZhbGlkKG5vZGUpKTsgICAgLy8gdHJ1ZSwgc3RpbGwgdmFsaWQgaW4gdGhpcyBmcmFtZVxuICogLy8gYWZ0ZXIgYSBmcmFtZS4uLlxuICogY2MubG9nKGNjLmlzVmFsaWQobm9kZSkpOyAgICAvLyBmYWxzZSwgZGVzdHJveWVkIGluIHRoZSBlbmQgb2YgbGFzdCBmcmFtZVxuICovXG5jYy5pc1ZhbGlkID0gZnVuY3Rpb24gKHZhbHVlLCBzdHJpY3RNb2RlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuICEhdmFsdWUgJiYgISh2YWx1ZS5fb2JqRmxhZ3MgJiAoc3RyaWN0TW9kZSA/IChEZXN0cm95ZWQgfCBUb0Rlc3Ryb3kpIDogRGVzdHJveWVkKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJztcbiAgICB9XG59O1xuXG5pZiAoQ0NfRURJVE9SIHx8IENDX1RFU1QpIHtcbiAgICBqcy52YWx1ZShDQ09iamVjdCwgJ193aWxsRGVzdHJveScsIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuICEob2JqLl9vYmpGbGFncyAmIERlc3Ryb3llZCkgJiYgKG9iai5fb2JqRmxhZ3MgJiBUb0Rlc3Ryb3kpID4gMDtcbiAgICB9KTtcbiAgICBqcy52YWx1ZShDQ09iamVjdCwgJ19jYW5jZWxEZXN0cm95JywgZnVuY3Rpb24gKG9iaikge1xuICAgICAgICBvYmouX29iakZsYWdzICY9IH5Ub0Rlc3Ryb3k7XG4gICAgICAgIGpzLmFycmF5LmZhc3RSZW1vdmUob2JqZWN0c1RvRGVzdHJveSwgb2JqKTtcbiAgICB9KTtcbn1cblxuY2MuT2JqZWN0ID0gbW9kdWxlLmV4cG9ydHMgPSBDQ09iamVjdDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9