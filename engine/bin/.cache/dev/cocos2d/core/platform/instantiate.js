
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/instantiate.js';
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
var CCObject = require('./CCObject');

var CCValueType = require('../value-types/value-type');

var Destroyed = CCObject.Flags.Destroyed;
var PersistentMask = CCObject.Flags.PersistentMask;

var _isDomNode = require('./utils').isDomNode;

var js = require('./js');
/**
 * !#en Clones the object `original` and returns the clone, or instantiate a node from the Prefab.
 * !#zh 克隆指定的任意类型的对象，或者从 Prefab 实例化出新节点。
 *
 * （Instantiate 时，function 和 dom 等非可序列化对象会直接保留原有引用，Asset 会直接进行浅拷贝，可序列化类型会进行深拷贝。）
 *
 * @method instantiate
 * @param {Prefab|Node|Object} original - An existing object that you want to make a copy of.
 * @return {Node|Object} the newly instantiated object
 * @typescript
 * instantiate(original: Prefab): Node
 * instantiate<T>(original: T): T
 * @example
 * // instantiate node from prefab
 * var scene = cc.director.getScene();
 * var node = cc.instantiate(prefabAsset);
 * node.parent = scene;
 * // clone node
 * var scene = cc.director.getScene();
 * var node = cc.instantiate(targetNode);
 * node.parent = scene;
 */


function instantiate(original, internal_force) {
  if (!internal_force) {
    if (typeof original !== 'object' || Array.isArray(original)) {
      if (CC_DEV) {
        cc.errorID(6900);
      }

      return null;
    }

    if (!original) {
      if (CC_DEV) {
        cc.errorID(6901);
      }

      return null;
    }

    if (!cc.isValid(original)) {
      if (CC_DEV) {
        cc.errorID(6902);
      }

      return null;
    }

    if (CC_DEV && original instanceof cc.Component) {
      cc.warn('Should not instantiate a single cc.Component directly, you must instantiate the entire node.');
    }
  }

  var clone;

  if (original instanceof CCObject) {
    // Invoke _instantiate method if supplied.
    // The _instantiate callback will be called only on the root object, its associated object will not be called.
    // @callback associated
    // @param {Object} [instantiated] - If supplied, _instantiate just need to initialize the instantiated object,
    //                                  no need to create new object by itself.
    // @returns {Object} - the instantiated object
    if (original._instantiate) {
      cc.game._isCloning = true;
      clone = original._instantiate();
      cc.game._isCloning = false;
      return clone;
    } else if (original instanceof cc.Asset) {
      // 不允许用通用方案实例化资源
      if (CC_DEV) {
        cc.errorID(6903);
      }

      return null;
    }
  }

  cc.game._isCloning = true;
  clone = doInstantiate(original);
  cc.game._isCloning = false;
  return clone;
}

var objsToClearTmpVar = []; // used to reset _iN$t variable
///**
// * Do instantiate object, the object to instantiate must be non-nil.
// * 这是一个通用的 instantiate 方法，可能效率比较低。
// * 之后可以给各种类型重写快速实例化的特殊实现，但应该在单元测试中将结果和这个方法的结果进行对比。
// * 值得注意的是，这个方法不可重入。
// *
// * @param {Object} obj - 该方法仅供内部使用，用户需负责保证参数合法。什么参数是合法的请参考 cc.instantiate 的实现。
// * @param {Node} [parent] - 只有在该对象下的场景物体会被克隆。
// * @return {Object}
// * @private
// */

function doInstantiate(obj, parent) {
  if (Array.isArray(obj)) {
    if (CC_DEV) {
      cc.errorID(6904);
    }

    return null;
  }

  if (_isDomNode && _isDomNode(obj)) {
    if (CC_DEV) {
      cc.errorID(6905);
    }

    return null;
  }

  var clone;

  if (obj._iN$t) {
    // User can specify an existing object by assigning the "_iN$t" property.
    // enumerateObject will always push obj to objsToClearTmpVar
    clone = obj._iN$t;
  } else if (obj.constructor) {
    var klass = obj.constructor;
    clone = new klass();
  } else {
    clone = Object.create(null);
  }

  enumerateObject(obj, clone, parent);

  for (var i = 0, len = objsToClearTmpVar.length; i < len; ++i) {
    objsToClearTmpVar[i]._iN$t = null;
  }

  objsToClearTmpVar.length = 0;
  return clone;
} // @param {Object} obj - The object to instantiate, typeof must be 'object' and should not be an array.


function enumerateCCClass(klass, obj, clone, parent) {
  var props = klass.__values__;

  for (var p = 0; p < props.length; p++) {
    var key = props[p];
    var value = obj[key];

    if (typeof value === 'object' && value) {
      var initValue = clone[key];

      if (initValue instanceof CCValueType && initValue.constructor === value.constructor) {
        initValue.set(value);
      } else {
        clone[key] = value._iN$t || instantiateObj(value, parent);
      }
    } else {
      clone[key] = value;
    }
  }
}

function enumerateObject(obj, clone, parent) {
  // 目前使用“_iN$t”这个特殊字段来存实例化后的对象，这样做主要是为了防止循环引用
  // 注意，为了避免循环引用，所有新创建的实例，必须在赋值前被设为源对象的_iN$t
  js.value(obj, '_iN$t', clone, true);
  objsToClearTmpVar.push(obj);
  var klass = obj.constructor;

  if (cc.Class._isCCClass(klass)) {
    enumerateCCClass(klass, obj, clone, parent);
  } else {
    // primitive javascript object
    for (var key in obj) {
      if (!obj.hasOwnProperty(key) || key.charCodeAt(0) === 95 && key.charCodeAt(1) === 95 && // starts with "__"
      key !== '__type__') {
        continue;
      }

      var value = obj[key];

      if (typeof value === 'object' && value) {
        if (value === clone) {
          continue; // value is obj._iN$t
        }

        clone[key] = value._iN$t || instantiateObj(value, parent);
      } else {
        clone[key] = value;
      }
    }
  }

  if (obj instanceof CCObject) {
    clone._objFlags &= PersistentMask;
  }
}
/*
 * @param {Object|Array} obj - the original non-nil object, typeof must be 'object'
 * @return {Object|Array} - the original non-nil object, typeof must be 'object'
 */


function instantiateObj(obj, parent) {
  if (obj instanceof CCValueType) {
    return obj.clone();
  }

  if (obj instanceof cc.Asset) {
    // 所有资源直接引用，不需要拷贝
    return obj;
  }

  var clone;

  if (ArrayBuffer.isView(obj)) {
    var len = obj.length;
    clone = new obj.constructor(len);
    obj._iN$t = clone;
    objsToClearTmpVar.push(obj);

    for (var i = 0; i < len; ++i) {
      clone[i] = obj[i];
    }

    return clone;
  }

  if (Array.isArray(obj)) {
    var _len = obj.length;
    clone = new Array(_len);
    js.value(obj, '_iN$t', clone, true);
    objsToClearTmpVar.push(obj);

    for (var _i = 0; _i < _len; ++_i) {
      var value = obj[_i];

      if (typeof value === 'object' && value) {
        clone[_i] = value._iN$t || instantiateObj(value, parent);
      } else {
        clone[_i] = value;
      }
    }

    return clone;
  } else if (obj._objFlags & Destroyed) {
    // the same as cc.isValid(obj)
    return null;
  }

  var ctor = obj.constructor;

  if (cc.Class._isCCClass(ctor)) {
    if (parent) {
      if (parent instanceof cc.Component) {
        if (obj instanceof cc._BaseNode || obj instanceof cc.Component) {
          return obj;
        }
      } else if (parent instanceof cc._BaseNode) {
        if (obj instanceof cc._BaseNode) {
          if (!obj.isChildOf(parent)) {
            // should not clone other nodes if not descendant
            return obj;
          }
        } else if (obj instanceof cc.Component) {
          if (!obj.node.isChildOf(parent)) {
            // should not clone other component if not descendant
            return obj;
          }
        }
      }
    }

    clone = new ctor();
  } else if (ctor === Object) {
    clone = {};
  } else if (!ctor) {
    clone = Object.create(null);
  } else {
    // unknown type
    return obj;
  }

  enumerateObject(obj, clone, parent);
  return clone;
}

instantiate._clone = doInstantiate;
cc.instantiate = instantiate;
module.exports = instantiate;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL2luc3RhbnRpYXRlLmpzIl0sIm5hbWVzIjpbIkNDT2JqZWN0IiwicmVxdWlyZSIsIkNDVmFsdWVUeXBlIiwiRGVzdHJveWVkIiwiRmxhZ3MiLCJQZXJzaXN0ZW50TWFzayIsIl9pc0RvbU5vZGUiLCJpc0RvbU5vZGUiLCJqcyIsImluc3RhbnRpYXRlIiwib3JpZ2luYWwiLCJpbnRlcm5hbF9mb3JjZSIsIkFycmF5IiwiaXNBcnJheSIsIkNDX0RFViIsImNjIiwiZXJyb3JJRCIsImlzVmFsaWQiLCJDb21wb25lbnQiLCJ3YXJuIiwiY2xvbmUiLCJfaW5zdGFudGlhdGUiLCJnYW1lIiwiX2lzQ2xvbmluZyIsIkFzc2V0IiwiZG9JbnN0YW50aWF0ZSIsIm9ianNUb0NsZWFyVG1wVmFyIiwib2JqIiwicGFyZW50IiwiX2lOJHQiLCJjb25zdHJ1Y3RvciIsImtsYXNzIiwiT2JqZWN0IiwiY3JlYXRlIiwiZW51bWVyYXRlT2JqZWN0IiwiaSIsImxlbiIsImxlbmd0aCIsImVudW1lcmF0ZUNDQ2xhc3MiLCJwcm9wcyIsIl9fdmFsdWVzX18iLCJwIiwia2V5IiwidmFsdWUiLCJpbml0VmFsdWUiLCJzZXQiLCJpbnN0YW50aWF0ZU9iaiIsInB1c2giLCJDbGFzcyIsIl9pc0NDQ2xhc3MiLCJoYXNPd25Qcm9wZXJ0eSIsImNoYXJDb2RlQXQiLCJfb2JqRmxhZ3MiLCJBcnJheUJ1ZmZlciIsImlzVmlldyIsImN0b3IiLCJfQmFzZU5vZGUiLCJpc0NoaWxkT2YiLCJub2RlIiwiX2Nsb25lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJELElBQUlBLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBdEI7O0FBQ0EsSUFBSUMsV0FBVyxHQUFHRCxPQUFPLENBQUMsMkJBQUQsQ0FBekI7O0FBQ0EsSUFBSUUsU0FBUyxH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SSxDQUFDbUMsSUFBTCxFQUFXO0FBQ1puQyxJQUFBQSxLQUFLLEdBQUdZLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsQ0FBUjtBQUNILEdBRkksTUFHQTtBQUNEO0FBQ0EsV0FBT04sR0FBUDtBQUNIOztBQUNETyxFQUFBQSxlQUFlLENBQUNQLEdBQUQsRUFBTVAsS0FBTixFQUFhUSxNQUFiLENBQWY7QUFDQSxTQUFPUixLQUFQO0FBQ0g7O0FBRURYLFdBQVcsQ0FBQ2tELE1BQVosR0FBcUJsQyxhQUFyQjtBQUNBVixFQUFFLENBQUNOLFdBQUgsR0FBaUJBLFdBQWpCO0FBQ0FtRCxNQUFNLENBQUNDLE9BQVAsR0FBaUJwRCxXQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIu+7vy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbnZhciBDQ09iamVjdCA9IHJlcXVpcmUoJy4vQ0NPYmplY3QnKTtcclxudmFyIENDVmFsdWVUeXBlID0gcmVxdWlyZSgnLi4vdmFsdWUtdHlwZXMvdmFsdWUtdHlwZScpO1xyXG52YXIgRGVzdHJveWVkID0gQ0NPYmplY3QuRmxhZ3MuRGVzdHJveWVkO1xyXG52YXIgUGVyc2lzdGVudE1hc2sgPSBDQ09iamVjdC5GbGFncy5QZXJzaXN0ZW50TWFzaztcclxudmFyIF9pc0RvbU5vZGUgPSByZXF1aXJlKCcuL3V0aWxzJykuaXNEb21Ob2RlO1xyXG52YXIganMgPSByZXF1aXJlKCcuL2pzJyk7XHJcblxyXG4vKipcclxuICogISNlbiBDbG9uZXMgdGhlIG9iamVjdCBgb3JpZ2luYWxgIGFuZCByZXR1cm5zIHRoZSBjbG9uZSwgb3IgaW5zdGFudGlhdGUgYSBub2RlIGZyb20gdGhlIFByZWZhYi5cclxuICogISN6aCDlhYvpmobmjIflrprnmoTku7vmhI/nsbvlnovnmoTlr7nosaHvvIzmiJbogIXku44gUHJlZmFiIOWunuS+i+WMluWHuuaWsOiKgueCueOAglxyXG4gKlxyXG4gKiDvvIhJbnN0YW50aWF0ZSDml7bvvIxmdW5jdGlvbiDlkowgZG9tIOetiemdnuWPr+W6j+WIl+WMluWvueixoeS8muebtOaOpeS/neeVmeWOn+acieW8leeUqO+8jEFzc2V0IOS8muebtOaOpei/m+ihjOa1heaLt+i0ne+8jOWPr+W6j+WIl+WMluexu+Wei+S8mui/m+ihjOa3seaLt+i0neOAgu+8iVxyXG4gKlxyXG4gKiBAbWV0aG9kIGluc3RhbnRpYXRlXHJcbiAqIEBwYXJhbSB7UHJlZmFifE5vZGV8T2JqZWN0fSBvcmlnaW5hbCAtIEFuIGV4aXN0aW5nIG9iamVjdCB0aGF0IHlvdSB3YW50IHRvIG1ha2UgYSBjb3B5IG9mLlxyXG4gKiBAcmV0dXJuIHtOb2RlfE9iamVjdH0gdGhlIG5ld2x5IGluc3RhbnRpYXRlZCBvYmplY3RcclxuICogQHR5cGVzY3JpcHRcclxuICogaW5zdGFudGlhdGUob3JpZ2luYWw6IFByZWZhYik6IE5vZGVcclxuICogaW5zdGFudGlhdGU8VD4ob3JpZ2luYWw6IFQpOiBUXHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIGluc3RhbnRpYXRlIG5vZGUgZnJvbSBwcmVmYWJcclxuICogdmFyIHNjZW5lID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcclxuICogdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWJBc3NldCk7XHJcbiAqIG5vZGUucGFyZW50ID0gc2NlbmU7XHJcbiAqIC8vIGNsb25lIG5vZGVcclxuICogdmFyIHNjZW5lID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcclxuICogdmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0YXJnZXROb2RlKTtcclxuICogbm9kZS5wYXJlbnQgPSBzY2VuZTtcclxuICovXHJcbmZ1bmN0aW9uIGluc3RhbnRpYXRlIChvcmlnaW5hbCwgaW50ZXJuYWxfZm9yY2UpIHtcclxuICAgIGlmICghaW50ZXJuYWxfZm9yY2UpIHtcclxuICAgICAgICBpZiAodHlwZW9mIG9yaWdpbmFsICE9PSAnb2JqZWN0JyB8fCBBcnJheS5pc0FycmF5KG9yaWdpbmFsKSkge1xyXG4gICAgICAgICAgICBpZiAoQ0NfREVWKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDY5MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW9yaWdpbmFsKSB7XHJcbiAgICAgICAgICAgIGlmIChDQ19ERVYpIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoNjkwMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY2MuaXNWYWxpZChvcmlnaW5hbCkpIHtcclxuICAgICAgICAgICAgaWYgKENDX0RFVikge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3JJRCg2OTAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKENDX0RFViAmJiBvcmlnaW5hbCBpbnN0YW5jZW9mIGNjLkNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBjYy53YXJuKCdTaG91bGQgbm90IGluc3RhbnRpYXRlIGEgc2luZ2xlIGNjLkNvbXBvbmVudCBkaXJlY3RseSwgeW91IG11c3QgaW5zdGFudGlhdGUgdGhlIGVudGlyZSBub2RlLicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2xvbmU7XHJcbiAgICBpZiAob3JpZ2luYWwgaW5zdGFuY2VvZiBDQ09iamVjdCkge1xyXG4gICAgICAgIC8vIEludm9rZSBfaW5zdGFudGlhdGUgbWV0aG9kIGlmIHN1cHBsaWVkLlxyXG4gICAgICAgIC8vIFRoZSBfaW5zdGFudGlhdGUgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgb25seSBvbiB0aGUgcm9vdCBvYmplY3QsIGl0cyBhc3NvY2lhdGVkIG9iamVjdCB3aWxsIG5vdCBiZSBjYWxsZWQuXHJcbiAgICAgICAgLy8gQGNhbGxiYWNrIGFzc29jaWF0ZWRcclxuICAgICAgICAvLyBAcGFyYW0ge09iamVjdH0gW2luc3RhbnRpYXRlZF0gLSBJZiBzdXBwbGllZCwgX2luc3RhbnRpYXRlIGp1c3QgbmVlZCB0byBpbml0aWFsaXplIHRoZSBpbnN0YW50aWF0ZWQgb2JqZWN0LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vIG5lZWQgdG8gY3JlYXRlIG5ldyBvYmplY3QgYnkgaXRzZWxmLlxyXG4gICAgICAgIC8vIEByZXR1cm5zIHtPYmplY3R9IC0gdGhlIGluc3RhbnRpYXRlZCBvYmplY3RcclxuICAgICAgICBpZiAob3JpZ2luYWwuX2luc3RhbnRpYXRlKSB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuX2lzQ2xvbmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGNsb25lID0gb3JpZ2luYWwuX2luc3RhbnRpYXRlKCk7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuX2lzQ2xvbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xvbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG9yaWdpbmFsIGluc3RhbmNlb2YgY2MuQXNzZXQpIHtcclxuICAgICAgICAgICAgLy8g5LiN5YWB6K6455So6YCa55So5pa55qGI5a6e5L6L5YyW6LWE5rqQXHJcbiAgICAgICAgICAgIGlmIChDQ19ERVYpIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoNjkwMyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNjLmdhbWUuX2lzQ2xvbmluZyA9IHRydWU7XHJcbiAgICBjbG9uZSA9IGRvSW5zdGFudGlhdGUob3JpZ2luYWwpO1xyXG4gICAgY2MuZ2FtZS5faXNDbG9uaW5nID0gZmFsc2U7XHJcbiAgICByZXR1cm4gY2xvbmU7XHJcbn1cclxuXHJcbnZhciBvYmpzVG9DbGVhclRtcFZhciA9IFtdOyAgIC8vIHVzZWQgdG8gcmVzZXQgX2lOJHQgdmFyaWFibGVcclxuXHJcbi8vLyoqXHJcbi8vICogRG8gaW5zdGFudGlhdGUgb2JqZWN0LCB0aGUgb2JqZWN0IHRvIGluc3RhbnRpYXRlIG11c3QgYmUgbm9uLW5pbC5cclxuLy8gKiDov5nmmK/kuIDkuKrpgJrnlKjnmoQgaW5zdGFudGlhdGUg5pa55rOV77yM5Y+v6IO95pWI546H5q+U6L6D5L2O44CCXHJcbi8vICog5LmL5ZCO5Y+v5Lul57uZ5ZCE56eN57G75Z6L6YeN5YaZ5b+r6YCf5a6e5L6L5YyW55qE54m55q6K5a6e546w77yM5L2G5bqU6K+l5Zyo5Y2V5YWD5rWL6K+V5Lit5bCG57uT5p6c5ZKM6L+Z5Liq5pa55rOV55qE57uT5p6c6L+b6KGM5a+55q+U44CCXHJcbi8vICog5YC85b6X5rOo5oSP55qE5piv77yM6L+Z5Liq5pa55rOV5LiN5Y+v6YeN5YWl44CCXHJcbi8vICpcclxuLy8gKiBAcGFyYW0ge09iamVjdH0gb2JqIC0g6K+l5pa55rOV5LuF5L6b5YaF6YOo5L2/55So77yM55So5oi36ZyA6LSf6LSj5L+d6K+B5Y+C5pWw5ZCI5rOV44CC5LuA5LmI5Y+C5pWw5piv5ZCI5rOV55qE6K+35Y+C6ICDIGNjLmluc3RhbnRpYXRlIOeahOWunueOsOOAglxyXG4vLyAqIEBwYXJhbSB7Tm9kZX0gW3BhcmVudF0gLSDlj6rmnInlnKjor6Xlr7nosaHkuIvnmoTlnLrmma/niankvZPkvJrooqvlhYvpmobjgIJcclxuLy8gKiBAcmV0dXJuIHtPYmplY3R9XHJcbi8vICogQHByaXZhdGVcclxuLy8gKi9cclxuZnVuY3Rpb24gZG9JbnN0YW50aWF0ZSAob2JqLCBwYXJlbnQpIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuICAgICAgICBpZiAoQ0NfREVWKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9ySUQoNjkwNCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKF9pc0RvbU5vZGUgJiYgX2lzRG9tTm9kZShvYmopKSB7XHJcbiAgICAgICAgaWYgKENDX0RFVikge1xyXG4gICAgICAgICAgICBjYy5lcnJvcklEKDY5MDUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2xvbmU7XHJcbiAgICBpZiAob2JqLl9pTiR0KSB7XHJcbiAgICAgICAgLy8gVXNlciBjYW4gc3BlY2lmeSBhbiBleGlzdGluZyBvYmplY3QgYnkgYXNzaWduaW5nIHRoZSBcIl9pTiR0XCIgcHJvcGVydHkuXHJcbiAgICAgICAgLy8gZW51bWVyYXRlT2JqZWN0IHdpbGwgYWx3YXlzIHB1c2ggb2JqIHRvIG9ianNUb0NsZWFyVG1wVmFyXHJcbiAgICAgICAgY2xvbmUgPSBvYmouX2lOJHQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChvYmouY29uc3RydWN0b3IpIHtcclxuICAgICAgICB2YXIga2xhc3MgPSBvYmouY29uc3RydWN0b3I7XHJcbiAgICAgICAgY2xvbmUgPSBuZXcga2xhc3MoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNsb25lID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBlbnVtZXJhdGVPYmplY3Qob2JqLCBjbG9uZSwgcGFyZW50KTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gb2Jqc1RvQ2xlYXJUbXBWYXIubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICBvYmpzVG9DbGVhclRtcFZhcltpXS5faU4kdCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBvYmpzVG9DbGVhclRtcFZhci5sZW5ndGggPSAwO1xyXG5cclxuICAgIHJldHVybiBjbG9uZTtcclxufVxyXG5cclxuLy8gQHBhcmFtIHtPYmplY3R9IG9iaiAtIFRoZSBvYmplY3QgdG8gaW5zdGFudGlhdGUsIHR5cGVvZiBtdXN0IGJlICdvYmplY3QnIGFuZCBzaG91bGQgbm90IGJlIGFuIGFycmF5LlxyXG5cclxuZnVuY3Rpb24gZW51bWVyYXRlQ0NDbGFzcyAoa2xhc3MsIG9iaiwgY2xvbmUsIHBhcmVudCkge1xyXG4gICAgdmFyIHByb3BzID0ga2xhc3MuX192YWx1ZXNfXztcclxuICAgIGZvciAodmFyIHAgPSAwOyBwIDwgcHJvcHMubGVuZ3RoOyBwKyspIHtcclxuICAgICAgICB2YXIga2V5ID0gcHJvcHNbcF07XHJcbiAgICAgICAgdmFyIHZhbHVlID0gb2JqW2tleV07XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGluaXRWYWx1ZSA9IGNsb25lW2tleV07XHJcbiAgICAgICAgICAgIGlmIChpbml0VmFsdWUgaW5zdGFuY2VvZiBDQ1ZhbHVlVHlwZSAmJlxyXG4gICAgICAgICAgICAgICAgaW5pdFZhbHVlLmNvbnN0cnVjdG9yID09PSB2YWx1ZS5jb25zdHJ1Y3Rvcikge1xyXG4gICAgICAgICAgICAgICAgaW5pdFZhbHVlLnNldCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbG9uZVtrZXldID0gdmFsdWUuX2lOJHQgfHwgaW5zdGFudGlhdGVPYmoodmFsdWUsIHBhcmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNsb25lW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVudW1lcmF0ZU9iamVjdCAob2JqLCBjbG9uZSwgcGFyZW50KSB7XHJcbiAgICAvLyDnm67liY3kvb/nlKjigJxfaU4kdOKAnei/meS4queJueauiuWtl+auteadpeWtmOWunuS+i+WMluWQjueahOWvueixoe+8jOi/meagt+WBmuS4u+imgeaYr+S4uuS6humYsuatouW+queOr+W8leeUqFxyXG4gICAgLy8g5rOo5oSP77yM5Li65LqG6YG/5YWN5b6q546v5byV55So77yM5omA5pyJ5paw5Yib5bu655qE5a6e5L6L77yM5b+F6aG75Zyo6LWL5YC85YmN6KKr6K6+5Li65rqQ5a+56LGh55qEX2lOJHRcclxuICAgIGpzLnZhbHVlKG9iaiwgJ19pTiR0JywgY2xvbmUsIHRydWUpO1xyXG4gICAgb2Jqc1RvQ2xlYXJUbXBWYXIucHVzaChvYmopO1xyXG4gICAgdmFyIGtsYXNzID0gb2JqLmNvbnN0cnVjdG9yO1xyXG4gICAgaWYgKGNjLkNsYXNzLl9pc0NDQ2xhc3Moa2xhc3MpKSB7XHJcbiAgICAgICAgZW51bWVyYXRlQ0NDbGFzcyhrbGFzcywgb2JqLCBjbG9uZSwgcGFyZW50KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIC8vIHByaW1pdGl2ZSBqYXZhc2NyaXB0IG9iamVjdFxyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSB8fFxyXG4gICAgICAgICAgICAgICAgKGtleS5jaGFyQ29kZUF0KDApID09PSA5NSAmJiBrZXkuY2hhckNvZGVBdCgxKSA9PT0gOTUgJiYgICAvLyBzdGFydHMgd2l0aCBcIl9fXCJcclxuICAgICAgICAgICAgICAgICBrZXkgIT09ICdfX3R5cGVfXycpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gb2JqW2tleV07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IGNsb25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7ICAgLy8gdmFsdWUgaXMgb2JqLl9pTiR0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjbG9uZVtrZXldID0gdmFsdWUuX2lOJHQgfHwgaW5zdGFudGlhdGVPYmoodmFsdWUsIHBhcmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbG9uZVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQ0NPYmplY3QpIHtcclxuICAgICAgICBjbG9uZS5fb2JqRmxhZ3MgJj0gUGVyc2lzdGVudE1hc2s7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qXHJcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogLSB0aGUgb3JpZ2luYWwgbm9uLW5pbCBvYmplY3QsIHR5cGVvZiBtdXN0IGJlICdvYmplY3QnXHJcbiAqIEByZXR1cm4ge09iamVjdHxBcnJheX0gLSB0aGUgb3JpZ2luYWwgbm9uLW5pbCBvYmplY3QsIHR5cGVvZiBtdXN0IGJlICdvYmplY3QnXHJcbiAqL1xyXG5mdW5jdGlvbiBpbnN0YW50aWF0ZU9iaiAob2JqLCBwYXJlbnQpIHtcclxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBDQ1ZhbHVlVHlwZSkge1xyXG4gICAgICAgIHJldHVybiBvYmouY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBjYy5Bc3NldCkge1xyXG4gICAgICAgIC8vIOaJgOaciei1hOa6kOebtOaOpeW8leeUqO+8jOS4jemcgOimgeaLt+i0nVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICB2YXIgY2xvbmU7XHJcbiAgICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KG9iaikpIHtcclxuICAgICAgICBsZXQgbGVuID0gb2JqLmxlbmd0aDtcclxuICAgICAgICBjbG9uZSA9IG5ldyAob2JqLmNvbnN0cnVjdG9yKShsZW4pO1xyXG4gICAgICAgIG9iai5faU4kdCA9IGNsb25lO1xyXG4gICAgICAgIG9ianNUb0NsZWFyVG1wVmFyLnB1c2gob2JqKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgIGNsb25lW2ldID0gb2JqW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2xvbmU7XHJcbiAgICB9XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcbiAgICAgICAgbGV0IGxlbiA9IG9iai5sZW5ndGg7XHJcbiAgICAgICAgY2xvbmUgPSBuZXcgQXJyYXkobGVuKTtcclxuICAgICAgICBqcy52YWx1ZShvYmosICdfaU4kdCcsIGNsb25lLCB0cnVlKTtcclxuICAgICAgICBvYmpzVG9DbGVhclRtcFZhci5wdXNoKG9iaik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBvYmpbaV07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9uZVtpXSA9IHZhbHVlLl9pTiR0IHx8IGluc3RhbnRpYXRlT2JqKHZhbHVlLCBwYXJlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2xvbmVbaV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2xvbmU7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChvYmouX29iakZsYWdzICYgRGVzdHJveWVkKSB7XHJcbiAgICAgICAgLy8gdGhlIHNhbWUgYXMgY2MuaXNWYWxpZChvYmopXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGN0b3IgPSBvYmouY29uc3RydWN0b3I7XHJcbiAgICBpZiAoY2MuQ2xhc3MuX2lzQ0NDbGFzcyhjdG9yKSkge1xyXG4gICAgICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgICAgICAgaWYgKHBhcmVudCBpbnN0YW5jZW9mIGNjLkNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIGNjLl9CYXNlTm9kZSB8fCBvYmogaW5zdGFuY2VvZiBjYy5Db21wb25lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHBhcmVudCBpbnN0YW5jZW9mIGNjLl9CYXNlTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIGNjLl9CYXNlTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqLmlzQ2hpbGRPZihwYXJlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNob3VsZCBub3QgY2xvbmUgb3RoZXIgbm9kZXMgaWYgbm90IGRlc2NlbmRhbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBjYy5Db21wb25lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9iai5ub2RlLmlzQ2hpbGRPZihwYXJlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNob3VsZCBub3QgY2xvbmUgb3RoZXIgY29tcG9uZW50IGlmIG5vdCBkZXNjZW5kYW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsb25lID0gbmV3IGN0b3IoKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGN0b3IgPT09IE9iamVjdCkge1xyXG4gICAgICAgIGNsb25lID0ge307XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICghY3Rvcikge1xyXG4gICAgICAgIGNsb25lID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIC8vIHVua25vd24gdHlwZVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICBlbnVtZXJhdGVPYmplY3Qob2JqLCBjbG9uZSwgcGFyZW50KTtcclxuICAgIHJldHVybiBjbG9uZTtcclxufVxyXG5cclxuaW5zdGFudGlhdGUuX2Nsb25lID0gZG9JbnN0YW50aWF0ZTtcclxuY2MuaW5zdGFudGlhdGUgPSBpbnN0YW50aWF0ZTtcclxubW9kdWxlLmV4cG9ydHMgPSBpbnN0YW50aWF0ZTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=