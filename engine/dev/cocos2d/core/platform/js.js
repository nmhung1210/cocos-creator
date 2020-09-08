
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/js.js';
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
var tempCIDGenerater = new (require('./id-generater'))('TmpCId.');

function _getPropertyDescriptor(obj, name) {
  while (obj) {
    var pd = Object.getOwnPropertyDescriptor(obj, name);

    if (pd) {
      return pd;
    }

    obj = Object.getPrototypeOf(obj);
  }

  return null;
}

function _copyprop(name, source, target) {
  var pd = _getPropertyDescriptor(source, name);

  Object.defineProperty(target, name, pd);
}
/**
 * !#en This module provides some JavaScript utilities. All members can be accessed with `cc.js`.
 * !#zh 这个模块封装了 JavaScript 相关的一些实用函数，你可以通过 `cc.js` 来访问这个模块。
 * @submodule js
 * @module js
 */


var js = {
  /**
   * Check the obj whether is number or not
   * If a number is created by using 'new Number(10086)', the typeof it will be "object"...
   * Then you can use this function if you care about this case.
   * @method isNumber
   * @param {*} obj
   * @returns {Boolean}
   */
  isNumber: function isNumber(obj) {
    return typeof obj === 'number' || obj instanceof Number;
  },

  /**
   * Check the obj whether is string or not.
   * If a string is created by using 'new String("blabla")', the typeof it will be "object"...
   * Then you can use this function if you care about this case.
   * @method isString
   * @param {*} obj
   * @returns {Boolean}
   */
  isString: function isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
  },

  /**
   * Copy all properties not defined in obj from arguments[1...n]
   * @method addon
   * @param {Object} obj object to extend its properties
   * @param {Object} ...sourceObj source object to copy properties from
   * @return {Object} the result obj
   */
  addon: function addon(obj) {
    'use strict';

    obj = obj || {};

    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];

      if (source) {
        if (typeof source !== 'object') {
          cc.errorID(5402, source);
          continue;
        }

        for (var name in source) {
          if (!(name in obj)) {
            _copyprop(name, source, obj);
          }
        }
      }
    }

    return obj;
  },

  /**
   * copy all properties from arguments[1...n] to obj
   * @method mixin
   * @param {Object} obj
   * @param {Object} ...sourceObj
   * @return {Object} the result obj
   */
  mixin: function mixin(obj) {
    'use strict';

    obj = obj || {};

    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];

      if (source) {
        if (typeof source !== 'object') {
          cc.errorID(5403, source);
          continue;
        }

        for (var name in source) {
          _copyprop(name, source, obj);
        }
      }
    }

    return obj;
  },

  /**
   * Derive the class from the supplied base class.
   * Both classes are just native javascript constructors, not created by cc.Class, so
   * usually you will want to inherit using {{#crossLink "cc/Class:method"}}cc.Class {{/crossLink}} instead.
   * @method extend
   * @param {Function} cls
   * @param {Function} base - the baseclass to inherit
   * @return {Function} the result class
   */
  extend: function extend(cls, base) {
    if (CC_DEV) {
      if (!base) {
        cc.errorID(5404);
        return;
      }

      if (!cls) {
        cc.errorID(5405);
        return;
      }

      if (Object.keys(cls.prototype).length > 0) {
        cc.errorID(5406);
      }
    }

    for (var p in base) {
      if (base.hasOwnProperty(p)) cls[p] = base[p];
    }

    cls.prototype = Object.create(base.prototype, {
      constructor: {
        value: cls,
        writable: true,
        configurable: true
      }
    });
    return cls;
  },

  /**
   * Get super class
   * @method getSuper
   * @param {Function} ctor - the constructor of subclass
   * @return {Function}
   */
  getSuper: function getSuper(ctor) {
    var proto = ctor.prototype; // binded function do not have prototype

    var dunderProto = proto && Object.getPrototypeOf(proto);
    return dunderProto && dunderProto.constructor;
  },

  /**
   * Checks whether subclass is child of superclass or equals to superclass
   *
   * @method isChildClassOf
   * @param {Function} subclass
   * @param {Function} superclass
   * @return {Boolean}
   */
  isChildClassOf: function isChildClassOf(subclass, superclass) {
    if (subclass && superclass) {
      if (typeof subclass !== 'function') {
        return false;
      }

      if (typeof superclass !== 'function') {
        if (CC_DEV) {
          cc.warnID(3625, superclass);
        }

        return false;
      }

      if (subclass === superclass) {
        return true;
      }

      for (;;) {
        subclass = js.getSuper(subclass);

        if (!subclass) {
          return false;
        }

        if (subclass === superclass) {
          return true;
        }
      }
    }

    return false;
  },

  /**
   * Removes all enumerable properties from object
   * @method clear
   * @param {any} obj
   */
  clear: function clear(obj) {
    var keys = Object.keys(obj);

    for (var i = 0; i < keys.length; i++) {
      delete obj[keys[i]];
    }
  },

  /**
   * Checks whether obj is an empty object
   * @method isEmptyObject
   * @param {any} obj 
   * @returns {Boolean}
   */
  isEmptyObject: function isEmptyObject(obj) {
    for (var key in obj) {
      return false;
    }

    return true;
  },

  /**
   * Get property descriptor in object and all its ancestors
   * @method getPropertyDescriptor
   * @param {Object} obj
   * @param {String} name
   * @return {Object}
   */
  getPropertyDescriptor: _getPropertyDescriptor
};
var tmpValueDesc = {
  value: undefined,
  enumerable: false,
  writable: false,
  configurable: true
};
/**
 * Define value, just help to call Object.defineProperty.<br>
 * The configurable will be true.
 * @method value
 * @param {Object} obj
 * @param {String} prop
 * @param {any} value
 * @param {Boolean} [writable=false]
 * @param {Boolean} [enumerable=false]
 */

js.value = function (obj, prop, value, writable, enumerable) {
  tmpValueDesc.value = value;
  tmpValueDesc.writable = writable;
  tmpValueDesc.enumerable = enumerable;
  Object.defineProperty(obj, prop, tmpValueDesc);
  tmpValueDesc.value = undefined;
};

var tmpGetSetDesc = {
  get: null,
  set: null,
  enumerable: false
};
/**
 * Define get set accessor, just help to call Object.defineProperty(...)
 * @method getset
 * @param {Object} obj
 * @param {String} prop
 * @param {Function} getter
 * @param {Function} [setter=null]
 * @param {Boolean} [enumerable=false]
 * @param {Boolean} [configurable=false]
 */

js.getset = function (obj, prop, getter, setter, enumerable, configurable) {
  if (typeof setter !== 'function') {
    enumerable = setter;
    setter = undefined;
  }

  tmpGetSetDesc.get = getter;
  tmpGetSetDesc.set = setter;
  tmpGetSetDesc.enumerable = enumerable;
  tmpGetSetDesc.configurable = configurable;
  Object.defineProperty(obj, prop, tmpGetSetDesc);
  tmpGetSetDesc.get = null;
  tmpGetSetDesc.set = null;
};

var tmpGetDesc = {
  get: null,
  enumerable: false,
  configurable: false
};
/**
 * Define get accessor, just help to call Object.defineProperty(...)
 * @method get
 * @param {Object} obj
 * @param {String} prop
 * @param {Function} getter
 * @param {Boolean} [enumerable=false]
 * @param {Boolean} [configurable=false]
 */

js.get = function (obj, prop, getter, enumerable, configurable) {
  tmpGetDesc.get = getter;
  tmpGetDesc.enumerable = enumerable;
  tmpGetDesc.configurable = configurable;
  Object.defineProperty(obj, prop, tmpGetDesc);
  tmpGetDesc.get = null;
};

var tmpSetDesc = {
  set: null,
  enumerable: false,
  configurable: false
};
/**
 * Define set accessor, just help to call Object.defineProperty(...)
 * @method set
 * @param {Object} obj
 * @param {String} prop
 * @param {Function} setter
 * @param {Boolean} [enumerable=false]
 * @param {Boolean} [configurable=false]
 */

js.set = function (obj, prop, setter, enumerable, configurable) {
  tmpSetDesc.set = setter;
  tmpSetDesc.enumerable = enumerable;
  tmpSetDesc.configurable = configurable;
  Object.defineProperty(obj, prop, tmpSetDesc);
  tmpSetDesc.set = null;
};
/**
 * Get class name of the object, if object is just a {} (and which class named 'Object'), it will return "".
 * (modified from <a href="http://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class">the code from this stackoverflow post</a>)
 * @method getClassName
 * @param {Object|Function} objOrCtor - instance or constructor
 * @return {String}
 */


js.getClassName = function (objOrCtor) {
  if (typeof objOrCtor === 'function') {
    var prototype = objOrCtor.prototype;

    if (prototype && prototype.hasOwnProperty('__classname__') && prototype.__classname__) {
      return prototype.__classname__;
    }

    var retval = ''; //  for browsers which have name property in the constructor of the object, such as chrome

    if (objOrCtor.name) {
      retval = objOrCtor.name;
    }

    if (objOrCtor.toString) {
      var arr,
          str = objOrCtor.toString();

      if (str.charAt(0) === '[') {
        // str is "[object objectClass]"
        arr = str.match(/\[\w+\s*(\w+)\]/);
      } else {
        // str is function objectClass () {} for IE Firefox
        arr = str.match(/function\s*(\w+)/);
      }

      if (arr && arr.length === 2) {
        retval = arr[1];
      }
    }

    return retval !== 'Object' ? retval : '';
  } else if (objOrCtor && objOrCtor.constructor) {
    return js.getClassName(objOrCtor.constructor);
  }

  return '';
};

function isTempClassId(id) {
  return typeof id !== 'string' || id.startsWith(tempCIDGenerater.prefix);
} // id 注册


(function () {
  var _idToClass = {};
  var _nameToClass = {};

  function setup(key, publicName, table) {
    js.getset(js, publicName, function () {
      return Object.assign({}, table);
    }, function (value) {
      js.clear(table);
      Object.assign(table, value);
    });
    return function (id, constructor) {
      // deregister old
      if (constructor.prototype.hasOwnProperty(key)) {
        delete table[constructor.prototype[key]];
      }

      js.value(constructor.prototype, key, id); // register class

      if (id) {
        var registered = table[id];

        if (registered && registered !== constructor) {
          var error = 'A Class already exists with the same ' + key + ' : "' + id + '".';

          if (CC_TEST) {
            error += ' (This may be caused by error of unit test.) \
If you dont need serialization, you can set class id to "". You can also call \
cc.js.unregisterClass to remove the id of unused class';
          }

          cc.error(error);
        } else {
          table[id] = constructor;
        } //if (id === "") {
        //    console.trace("", table === _nameToClass);
        //}

      }
    };
  }
  /**
   * Register the class by specified id, if its classname is not defined, the class name will also be set.
   * @method _setClassId
   * @param {String} classId
   * @param {Function} constructor
   * @private
   */

  /**
   * !#en All classes registered in the engine, indexed by ID.
   * !#zh 引擎中已注册的所有类型，通过 ID 进行索引。
   * @property _registeredClassIds
   * @example
   * // save all registered classes before loading scripts
   * let builtinClassIds = cc.js._registeredClassIds;
   * let builtinClassNames = cc.js._registeredClassNames;
   * // load some scripts that contain CCClass
   * ...
   * // clear all loaded classes
   * cc.js._registeredClassIds = builtinClassIds;
   * cc.js._registeredClassNames = builtinClassNames;
   */


  js._setClassId = setup('__cid__', '_registeredClassIds', _idToClass);
  /**
   * !#en All classes registered in the engine, indexed by name.
   * !#zh 引擎中已注册的所有类型，通过名称进行索引。
   * @property _registeredClassNames
   * @example
   * // save all registered classes before loading scripts
   * let builtinClassIds = cc.js._registeredClassIds;
   * let builtinClassNames = cc.js._registeredClassNames;
   * // load some scripts that contain CCClass
   * ...
   * // clear all loaded classes
   * cc.js._registeredClassIds = builtinClassIds;
   * cc.js._registeredClassNames = builtinClassNames;
   */

  var doSetClassName = setup('__classname__', '_registeredClassNames', _nameToClass);
  /**
   * Register the class by specified name manually
   * @method setClassName
   * @param {String} className
   * @param {Function} constructor
   */

  js.setClassName = function (className, constructor) {
    doSetClassName(className, constructor); // auto set class id

    if (!constructor.prototype.hasOwnProperty('__cid__')) {
      var id = className || tempCIDGenerater.getNewId();

      if (id) {
        js._setClassId(id, constructor);
      }
    }
  };
  /**
   * Unregister a class from fireball.
   *
   * If you dont need a registered class anymore, you should unregister the class so that Fireball will not keep its reference anymore.
   * Please note that its still your responsibility to free other references to the class.
   *
   * @method unregisterClass
   * @param {Function} ...constructor - the class you will want to unregister, any number of classes can be added
   */


  js.unregisterClass = function () {
    for (var i = 0; i < arguments.length; i++) {
      var p = arguments[i].prototype;
      var classId = p.__cid__;

      if (classId) {
        delete _idToClass[classId];
      }

      var classname = p.__classname__;

      if (classname) {
        delete _nameToClass[classname];
      }
    }
  };
  /**
   * Get the registered class by id
   * @method _getClassById
   * @param {String} classId
   * @return {Function} constructor
   * @private
   */


  js._getClassById = function (classId) {
    return _idToClass[classId];
  };
  /**
   * Get the registered class by name
   * @method getClassByName
   * @param {String} classname
   * @return {Function} constructor
   */


  js.getClassByName = function (classname) {
    return _nameToClass[classname];
  };
  /**
   * Get class id of the object
   * @method _getClassId
   * @param {Object|Function} obj - instance or constructor
   * @param {Boolean} [allowTempId=true] - can return temp id in editor
   * @return {String}
   * @private
   */


  js._getClassId = function (obj, allowTempId) {
    allowTempId = typeof allowTempId !== 'undefined' ? allowTempId : true;
    var res;

    if (typeof obj === 'function' && obj.prototype.hasOwnProperty('__cid__')) {
      res = obj.prototype.__cid__;

      if (!allowTempId && (CC_DEV || CC_EDITOR) && isTempClassId(res)) {
        return '';
      }

      return res;
    }

    if (obj && obj.constructor) {
      var prototype = obj.constructor.prototype;

      if (prototype && prototype.hasOwnProperty('__cid__')) {
        res = obj.__cid__;

        if (!allowTempId && (CC_DEV || CC_EDITOR) && isTempClassId(res)) {
          return '';
        }

        return res;
      }
    }

    return '';
  };
})();
/**
 * Defines a polyfill field for deprecated codes.
 * @method obsolete
 * @param {any} obj - YourObject or YourClass.prototype
 * @param {String} obsoleted - "OldParam" or "YourClass.OldParam"
 * @param {String} newExpr - "NewParam" or "YourClass.NewParam"
 * @param {Boolean} [writable=false]
 */


js.obsolete = function (obj, obsoleted, newExpr, writable) {
  var extractPropName = /([^.]+)$/;
  var oldProp = extractPropName.exec(obsoleted)[0];
  var newProp = extractPropName.exec(newExpr)[0];

  function get() {
    if (CC_DEV) {
      cc.warnID(1400, obsoleted, newExpr);
    }

    return this[newProp];
  }

  if (writable) {
    js.getset(obj, oldProp, get, function (value) {
      if (CC_DEV) {
        cc.warnID(1400, obsoleted, newExpr);
      }

      this[newProp] = value;
    });
  } else {
    js.get(obj, oldProp, get);
  }
};
/**
 * Defines all polyfill fields for obsoleted codes corresponding to the enumerable properties of props.
 * @method obsoletes
 * @param {any} obj - YourObject or YourClass.prototype
 * @param {any} objName - "YourObject" or "YourClass"
 * @param {Object} props
 * @param {Boolean} [writable=false]
 */


js.obsoletes = function (obj, objName, props, writable) {
  for (var obsoleted in props) {
    var newName = props[obsoleted];
    js.obsolete(obj, objName + '.' + obsoleted, newName, writable);
  }
};

var REGEXP_NUM_OR_STR = /(%d)|(%s)/;
var REGEXP_STR = /%s/;
/**
 * A string tool to construct a string with format string.
 * @method formatStr
 * @param {String|any} msg - A JavaScript string containing zero or more substitution strings (%s).
 * @param {any} ...subst - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
 * @returns {String}
 * @example
 * cc.js.formatStr("a: %s, b: %s", a, b);
 * cc.js.formatStr(a, b, c);
 */

js.formatStr = function () {
  var argLen = arguments.length;

  if (argLen === 0) {
    return '';
  }

  var msg = arguments[0];

  if (argLen === 1) {
    return '' + msg;
  }

  var hasSubstitution = typeof msg === 'string' && REGEXP_NUM_OR_STR.test(msg);

  if (hasSubstitution) {
    for (var i = 1; i < argLen; ++i) {
      var arg = arguments[i];
      var regExpToTest = typeof arg === 'number' ? REGEXP_NUM_OR_STR : REGEXP_STR;
      if (regExpToTest.test(msg)) msg = msg.replace(regExpToTest, arg);else msg += ' ' + arg;
    }
  } else {
    for (var _i = 1; _i < argLen; ++_i) {
      msg += ' ' + arguments[_i];
    }
  }

  return msg;
}; // see https://github.com/petkaantonov/bluebird/issues/1389


js.shiftArguments = function () {
  var len = arguments.length - 1;
  var args = new Array(len);

  for (var i = 0; i < len; ++i) {
    args[i] = arguments[i + 1];
  }

  return args;
};
/**
 * !#en
 * A simple wrapper of `Object.create(null)` which ensures the return object have no prototype (and thus no inherited members). So we can skip `hasOwnProperty` calls on property lookups. It is a worthwhile optimization than the `{}` literal when `hasOwnProperty` calls are necessary.
 * !#zh
 * 该方法是对 `Object.create(null)` 的简单封装。`Object.create(null)` 用于创建无 prototype （也就无继承）的空对象。这样我们在该对象上查找属性时，就不用进行 `hasOwnProperty` 判断。在需要频繁判断 `hasOwnProperty` 时，使用这个方法性能会比 `{}` 更高。
 *
 * @method createMap
 * @param {Boolean} [forceDictMode=false] - Apply the delete operator to newly created map object. This causes V8 to put the object in "dictionary mode" and disables creation of hidden classes which are very expensive for objects that are constantly changing shape.
 * @return {Object}
 */


js.createMap = function (forceDictMode) {
  var map = Object.create(null);

  if (forceDictMode) {
    var INVALID_IDENTIFIER_1 = '.';
    var INVALID_IDENTIFIER_2 = '/';
    map[INVALID_IDENTIFIER_1] = true;
    map[INVALID_IDENTIFIER_2] = true;
    delete map[INVALID_IDENTIFIER_1];
    delete map[INVALID_IDENTIFIER_2];
  }

  return map;
};
/**
 * @class array
 * @static
 */

/**
 * Removes the array item at the specified index.
 * @method removeAt
 * @param {any[]} array
 * @param {Number} index
 */


function removeAt(array, index) {
  array.splice(index, 1);
}
/**
 * Removes the array item at the specified index.
 * It's faster but the order of the array will be changed.
 * @method fastRemoveAt
 * @param {any[]} array
 * @param {Number} index
 */


function fastRemoveAt(array, index) {
  var length = array.length;

  if (index < 0 || index >= length) {
    return;
  }

  array[index] = array[length - 1];
  array.length = length - 1;
}
/**
 * Removes the first occurrence of a specific object from the array.
 * @method remove
 * @param {any[]} array
 * @param {any} value
 * @return {Boolean}
 */


function remove(array, value) {
  var index = array.indexOf(value);

  if (index >= 0) {
    removeAt(array, index);
    return true;
  } else {
    return false;
  }
}
/**
 * Removes the first occurrence of a specific object from the array.
 * It's faster but the order of the array will be changed.
 * @method fastRemove
 * @param {any[]} array
 * @param {Number} value
 */


function fastRemove(array, value) {
  var index = array.indexOf(value);

  if (index >= 0) {
    array[index] = array[array.length - 1];
    --array.length;
  }
}
/**
 * Verify array's Type
 * @method verifyType
 * @param {array} array
 * @param {Function} type
 * @return {Boolean}
 */


function verifyType(array, type) {
  if (array && array.length > 0) {
    for (var i = 0; i < array.length; i++) {
      if (!(array[i] instanceof type)) {
        cc.logID(1300);
        return false;
      }
    }
  }

  return true;
}
/**
 * Removes from array all values in minusArr. For each Value in minusArr, the first matching instance in array will be removed.
 * @method removeArray
 * @param {Array} array Source Array
 * @param {Array} minusArr minus Array
 */


function removeArray(array, minusArr) {
  for (var i = 0, l = minusArr.length; i < l; i++) {
    remove(array, minusArr[i]);
  }
}
/**
 * Inserts some objects at index
 * @method appendObjectsAt
 * @param {Array} array
 * @param {Array} addObjs
 * @param {Number} index
 * @return {Array}
 */


function appendObjectsAt(array, addObjs, index) {
  array.splice.apply(array, [index, 0].concat(addObjs));
  return array;
}
/**
 * Determines whether the array contains a specific value.
 * @method contains
 * @param {any[]} array
 * @param {any} value
 * @return {Boolean}
 */


function contains(array, value) {
  return array.indexOf(value) >= 0;
}
/**
 * Copy an array's item to a new array (its performance is better than Array.slice)
 * @method copy
 * @param {Array} array
 * @return {Array}
 */


function copy(array) {
  var i,
      len = array.length,
      arr_clone = new Array(len);

  for (i = 0; i < len; i += 1) {
    arr_clone[i] = array[i];
  }

  return arr_clone;
}

js.array = {
  remove: remove,
  fastRemove: fastRemove,
  removeAt: removeAt,
  fastRemoveAt: fastRemoveAt,
  contains: contains,
  verifyType: verifyType,
  removeArray: removeArray,
  appendObjectsAt: appendObjectsAt,
  copy: copy,
  MutableForwardIterator: require('../utils/mutable-forward-iterator')
}; // OBJECT POOL

/**
 * !#en
 * A fixed-length object pool designed for general type.<br>
 * The implementation of this object pool is very simple,
 * it can helps you to improve your game performance for objects which need frequent release and recreate operations<br/>
 * !#zh
 * 长度固定的对象缓存池，可以用来缓存各种对象类型。<br/>
 * 这个对象池的实现非常精简，它可以帮助您提高游戏性能，适用于优化对象的反复创建和销毁。
 * @class Pool
 * @example
 *
 *Example 1:
 *
 *function Details () {
 *    this.uuidList = [];
 *};
 *Details.prototype.reset = function () {
 *    this.uuidList.length = 0;
 *};
 *Details.pool = new js.Pool(function (obj) {
 *    obj.reset();
 *}, 5);
 *Details.pool.get = function () {
 *    return this._get() || new Details();
 *};
 *
 *var detail = Details.pool.get();
 *...
 *Details.pool.put(detail);
 *
 *Example 2:
 *
 *function Details (buffer) {
 *    this.uuidList = buffer;
 *};
 *...
 *Details.pool.get = function (buffer) {
 *    var cached = this._get();
 *    if (cached) {
 *        cached.uuidList = buffer;
 *        return cached;
 *    }
 *    else {
 *        return new Details(buffer);
 *    }
 *};
 *
 *var detail = Details.pool.get( [] );
 *...
 */

/**
 * !#en
 * Constructor for creating an object pool for the specific object type.
 * You can pass a callback argument for process the cleanup logic when the object is recycled.
 * !#zh
 * 使用构造函数来创建一个指定对象类型的对象池，您可以传递一个回调函数，用于处理对象回收时的清理逻辑。
 * @method constructor
 * @param {Function} [cleanupFunc] - the callback method used to process the cleanup logic when the object is recycled.
 * @param {Object} cleanupFunc.obj
 * @param {Number} size - initializes the length of the array
 * @typescript
 * constructor(cleanupFunc: (obj: any) => void, size: number)
 * constructor(size: number)
 */

function Pool(cleanupFunc, size) {
  if (size === undefined) {
    size = cleanupFunc;
    cleanupFunc = null;
  }

  this.get = null;
  this.count = 0;
  this._pool = new Array(size);
  this._cleanup = cleanupFunc;
}
/**
 * !#en
 * Get and initialize an object from pool. This method defaults to null and requires the user to implement it.
 * !#zh
 * 获取并初始化对象池中的对象。这个方法默认为空，需要用户自己实现。
 * @method get
 * @param {any} ...params - parameters to used to initialize the object
 * @returns {Object}
 */

/**
 * !#en
 * The current number of available objects, the default is 0, it will gradually increase with the recycle of the object,
 * the maximum will not exceed the size specified when the constructor is called.
 * !#zh
 * 当前可用对象数量，一开始默认是 0，随着对象的回收会逐渐增大，最大不会超过调用构造函数时指定的 size。
 * @property {Number} count
 * @default 0
 */

/**
 * !#en
 * Get an object from pool, if no available object in the pool, null will be returned.
 * !#zh
 * 获取对象池中的对象，如果对象池没有可用对象，则返回空。
 * @method _get
 * @returns {Object|null}
 */


Pool.prototype._get = function () {
  if (this.count > 0) {
    --this.count;
    var cache = this._pool[this.count];
    this._pool[this.count] = null;
    return cache;
  }

  return null;
};
/**
 * !#en Put an object into the pool.
 * !#zh 向对象池返还一个不再需要的对象。
 * @method put
 */


Pool.prototype.put = function (obj) {
  var pool = this._pool;

  if (this.count < pool.length) {
    if (this._cleanup && this._cleanup(obj) === false) {
      return;
    }

    pool[this.count] = obj;
    ++this.count;
  }
};
/**
 * !#en Resize the pool.
 * !#zh 设置对象池容量。
 * @method resize
 */


Pool.prototype.resize = function (length) {
  if (length >= 0) {
    this._pool.length = length;

    if (this.count > length) {
      this.count = length;
    }
  }
};

js.Pool = Pool; //

cc.js = js;
module.exports = js; // fix submodule pollute ...

/**
 * @submodule cc
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL2pzLmpzIl0sIm5hbWVzIjpbInRlbXBDSURHZW5lcmF0ZXIiLCJyZXF1aXJlIiwiX2dldFByb3BlcnR5RGVzY3JpcHRvciIsIm9iaiIsIm5hbWUiLCJwZCIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldFByb3RvdHlwZU9mIiwiX2NvcHlwcm9wIiwic291cmNlIiwidGFyZ2V0IiwiZGVmaW5lUHJvcGVydHkiLCJqcyIsImlzTnVtYmVyIiwiTnVtYmVyIiwiaXNTdHJpbmciLCJTdHJpbmciLCJhZGRvbiIsImkiLCJsZW5ndGgiLCJhcmd1bWVudHMiLCJjYyIsImVycm9ySUQiLCJtaXhpbiIsImV4dGVuZCIsImNscyIsImJhc2UiLCJDQ19ERVYiLCJrZXlzIiwicHJvdG90eXBlIiwicCIsImhhc093blByb3BlcnR5IiwiY3JlYXRlIiwiY29uc3RydWN0b3IiLCJ2YWx1ZSIsIndyaXRhYmxlIiwiY29uZmlndXJhYmxlIiwiZ2V0U3VwZXIiLCJjdG9yIiwicHJvdG8iLCJkdW5kZXJQcm90byIsImlzQ2hpbGRDbGFzc09mIiwic3ViY2xhc3MiLCJzdXBlcmNsYXNzIiwid2FybklEIiwiY2xlYXIiLCJpc0VtcHR5T2JqZWN0Iiwia2V5IiwiZ2V0UHJvcGVydHlEZXNjcmlwdG9yIiwidG1wVmFsdWVEZXNjIiwidW5kZWZpbmVkIiwiZW51bWVyYWJsZSIsInByb3AiLCJ0bXBHZXRTZXREZXNjIiwiZ2V0Iiwic2V0IiwiZ2V0c2V0IiwiZ2V0dGVyIiwic2V0dGVyIiwidG1wR2V0RGVzYyIsInRtcFNldERlc2MiLCJnZXRDbGFzc05hbWUiLCJvYmpPckN0b3IiLCJfX2NsYXNzbmFtZV9fIiwicmV0dmFsIiwidG9TdHJpbmciLCJhcnIiLCJzdHIiLCJjaGFyQXQiLCJtYXRjaCIsImlzVGVtcENsYXNzSWQiLCJpZCIsInN0YXJ0c1dpdGgiLCJwcmVmaXgiLCJfaWRUb0NsYXNzIiwiX25hbWVUb0NsYXNzIiwic2V0dXAiLCJwdWJsaWNOYW1lIiwidGFibGUiLCJhc3NpZ24iLCJyZWdpc3RlcmVkIiwiZXJyb3IiLCJDQ19URVNUIiwiX3NldENsYXNzSWQiLCJkb1NldENsYXNzTmFtZSIsInNldENsYXNzTmFtZSIsImNsYXNzTmFtZSIsImdldE5ld0lkIiwidW5yZWdpc3RlckNsYXNzIiwiY2xhc3NJZCIsIl9fY2lkX18iLCJjbGFzc25hbWUiLCJfZ2V0Q2xhc3NCeUlkIiwiZ2V0Q2xhc3NCeU5hbWUiLCJfZ2V0Q2xhc3NJZCIsImFsbG93VGVtcElkIiwicmVzIiwiQ0NfRURJVE9SIiwib2Jzb2xldGUiLCJvYnNvbGV0ZWQiLCJuZXdFeHByIiwiZXh0cmFjdFByb3BOYW1lIiwib2xkUHJvcCIsImV4ZWMiLCJuZXdQcm9wIiwib2Jzb2xldGVzIiwib2JqTmFtZSIsInByb3BzIiwibmV3TmFtZSIsIlJFR0VYUF9OVU1fT1JfU1RSIiwiUkVHRVhQX1NUUiIsImZvcm1hdFN0ciIsImFyZ0xlbiIsIm1zZyIsImhhc1N1YnN0aXR1dGlvbiIsInRlc3QiLCJhcmciLCJyZWdFeHBUb1Rlc3QiLCJyZXBsYWNlIiwic2hpZnRBcmd1bWVudHMiLCJsZW4iLCJhcmdzIiwiQXJyYXkiLCJjcmVhdGVNYXAiLCJmb3JjZURpY3RNb2RlIiwibWFwIiwiSU5WQUxJRF9JREVOVElGSUVSXzEiLCJJTlZBTElEX0lERU5USUZJRVJfMiIsInJlbW92ZUF0IiwiYXJyYXkiLCJpbmRleCIsInNwbGljZSIsImZhc3RSZW1vdmVBdCIsInJlbW92ZSIsImluZGV4T2YiLCJmYXN0UmVtb3ZlIiwidmVyaWZ5VHlwZSIsInR5cGUiLCJsb2dJRCIsInJlbW92ZUFycmF5IiwibWludXNBcnIiLCJsIiwiYXBwZW5kT2JqZWN0c0F0IiwiYWRkT2JqcyIsImFwcGx5IiwiY29uY2F0IiwiY29udGFpbnMiLCJjb3B5IiwiYXJyX2Nsb25lIiwiTXV0YWJsZUZvcndhcmRJdGVyYXRvciIsIlBvb2wiLCJjbGVhbnVwRnVuYyIsInNpemUiLCJjb3VudCIsIl9wb29sIiwiX2NsZWFudXAiLCJfZ2V0IiwiY2FjaGUiLCJwdXQiLCJwb29sIiwicmVzaXplIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxJQUFNQSxnQkFBZ0IsR0FBRyxLQUFLQyxPQUFPLENBQUMsZ0JBQUQsQ0FBWixFQUFnQyxTQUFoQyxDQUF6Qjs7QUFHQSxTQUFTQyxzQkFBVCxDQUFpQ0MsR0FBakMsRUFBc0NDLElBQXRDLEVBQTRDO0FBQ3hDLFNBQU9ELEdBQVAsRUFBWTtBQUNSLFFBQUlFLEVBQUUsR0FBR0MsTUFBTSxDQUFDQyx3QkFBUCxDQUFnQ0osR0FBaEMsRUFBcUNDLElBQXJDLENBQVQ7O0FBQ0EsUUFBSUMsRUFBSixFQUFRO0FBQ0osYUFBT0EsRUFBUDtBQUNIOztBQUNERixJQUFBQSxHQUFHLEdBQUdHLE1BQU0sQ0FBQ0UsY0FBUCxDQUFzQkwsR0FBdEIsQ0FBTjtBQUNIOztBQUNELFNBQU8sSUFBUDtBQUNIOztBQUVELFNBQVNNLFNBQVQsQ0FBbUJMLElBQW5CLEVBQXlCTSxNQUF6QixFQUFpQ0MsTUFBakMsRUFBeUM7QUFDckMsTUFBSU4sRUFBRSxHQUFHSCxzQkFBc0IsQ0FBQ1EsTUFBRCxFQUFTTixJQUFULENBQS9COztBQUNBRSxFQUFBQSxNQUFNLENBQUNNLGNBQVAsQ0FBc0JELE1BQXRCLEVBQThCUCxJQUE5QixFQUFvQ0MsRUFBcEM7QUFDSDtBQUVEOzs7Ozs7OztBQU1BLElBQUlRLEVBQUUsR0FBRztBQUVMOzs7Ozs7OztBQVFBQyxFQUFBQSxRQUFRLEVBQUUsa0JBQVNYLEdBQVQsRUFBYztBQUNwQixXQUFPLE9BQU9BLEdBQVAsS0FBZSxRQUFmLElBQTJCQSxHQUFHLFlBQVlZLE1BQWpEO0FBQ0gsR0FaSTs7QUFjTDs7Ozs7Ozs7QUFRQUMsRUFBQUEsUUFBUSxFQUFFLGtCQUFTYixHQUFULEVBQWM7QUFDcEIsV0FBTyxPQUFPQSxHQUFQLEtBQWUsUUFB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SUksS0FBSyxHQUFHLEtBQUtILEtBQUwsQ0FBVyxLQUFLRCxLQUFoQixDQUFaO0FBQ0EsU0FBS0MsS0FBTCxDQUFXLEtBQUtELEtBQWhCLElBQXlCLElBQXpCO0FBQ0EsV0FBT0ksS0FBUDtBQUNIOztBQUNELFNBQU8sSUFBUDtBQUNILENBUkQ7QUFVQTs7Ozs7OztBQUtBUCxJQUFJLENBQUN6SCxTQUFMLENBQWVpSSxHQUFmLEdBQXFCLFVBQVU1SixHQUFWLEVBQWU7QUFDaEMsTUFBSTZKLElBQUksR0FBRyxLQUFLTCxLQUFoQjs7QUFDQSxNQUFJLEtBQUtELEtBQUwsR0FBYU0sSUFBSSxDQUFDNUksTUFBdEIsRUFBOEI7QUFDMUIsUUFBSSxLQUFLd0ksUUFBTCxJQUFpQixLQUFLQSxRQUFMLENBQWN6SixHQUFkLE1BQXVCLEtBQTVDLEVBQW1EO0FBQy9DO0FBQ0g7O0FBQ0Q2SixJQUFBQSxJQUFJLENBQUMsS0FBS04sS0FBTixDQUFKLEdBQW1CdkosR0FBbkI7QUFDQSxNQUFFLEtBQUt1SixLQUFQO0FBQ0g7QUFDSixDQVREO0FBV0E7Ozs7Ozs7QUFLQUgsSUFBSSxDQUFDekgsU0FBTCxDQUFlbUksTUFBZixHQUF3QixVQUFVN0ksTUFBVixFQUFrQjtBQUN0QyxNQUFJQSxNQUFNLElBQUksQ0FBZCxFQUFpQjtBQUNiLFNBQUt1SSxLQUFMLENBQVd2SSxNQUFYLEdBQW9CQSxNQUFwQjs7QUFDQSxRQUFJLEtBQUtzSSxLQUFMLEdBQWF0SSxNQUFqQixFQUF5QjtBQUNyQixXQUFLc0ksS0FBTCxHQUFhdEksTUFBYjtBQUNIO0FBQ0o7QUFDSixDQVBEOztBQVNBUCxFQUFFLENBQUMwSSxJQUFILEdBQVVBLElBQVYsRUFFQTs7QUFFQWpJLEVBQUUsQ0FBQ1QsRUFBSCxHQUFRQSxFQUFSO0FBRUFxSixNQUFNLENBQUNDLE9BQVAsR0FBaUJ0SixFQUFqQixFQUVBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMCBSaWNhcmRvIFF1ZXNhZGFcbiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxMiBjb2NvczJkLXgub3JnXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCB0ZW1wQ0lER2VuZXJhdGVyID0gbmV3IChyZXF1aXJlKCcuL2lkLWdlbmVyYXRlcicpKSgnVG1wQ0lkLicpO1xuXG5cbmZ1bmN0aW9uIF9nZXRQcm9wZXJ0eURlc2NyaXB0b3IgKG9iaiwgbmFtZSkge1xuICAgIHdoaWxlIChvYmopIHtcbiAgICAgICAgdmFyIHBkID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIG5hbWUpO1xuICAgICAgICBpZiAocGQpIHtcbiAgICAgICAgICAgIHJldHVybiBwZDtcbiAgICAgICAgfVxuICAgICAgICBvYmogPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIF9jb3B5cHJvcChuYW1lLCBzb3VyY2UsIHRhcmdldCkge1xuICAgIHZhciBwZCA9IF9nZXRQcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBuYW1lKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBuYW1lLCBwZCk7XG59XG5cbi8qKlxuICogISNlbiBUaGlzIG1vZHVsZSBwcm92aWRlcyBzb21lIEphdmFTY3JpcHQgdXRpbGl0aWVzLiBBbGwgbWVtYmVycyBjYW4gYmUgYWNjZXNzZWQgd2l0aCBgY2MuanNgLlxuICogISN6aCDov5nkuKrmqKHlnZflsIHoo4XkuoYgSmF2YVNjcmlwdCDnm7jlhbPnmoTkuIDkupvlrp7nlKjlh73mlbDvvIzkvaDlj6/ku6XpgJrov4cgYGNjLmpzYCDmnaXorr/pl67ov5nkuKrmqKHlnZfjgIJcbiAqIEBzdWJtb2R1bGUganNcbiAqIEBtb2R1bGUganNcbiAqL1xudmFyIGpzID0ge1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIG9iaiB3aGV0aGVyIGlzIG51bWJlciBvciBub3RcbiAgICAgKiBJZiBhIG51bWJlciBpcyBjcmVhdGVkIGJ5IHVzaW5nICduZXcgTnVtYmVyKDEwMDg2KScsIHRoZSB0eXBlb2YgaXQgd2lsbCBiZSBcIm9iamVjdFwiLi4uXG4gICAgICogVGhlbiB5b3UgY2FuIHVzZSB0aGlzIGZ1bmN0aW9uIGlmIHlvdSBjYXJlIGFib3V0IHRoaXMgY2FzZS5cbiAgICAgKiBAbWV0aG9kIGlzTnVtYmVyXG4gICAgICogQHBhcmFtIHsqfSBvYmpcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc051bWJlcjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCBvYmogaW5zdGFuY2VvZiBOdW1iZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrIHRoZSBvYmogd2hldGhlciBpcyBzdHJpbmcgb3Igbm90LlxuICAgICAqIElmIGEgc3RyaW5nIGlzIGNyZWF0ZWQgYnkgdXNpbmcgJ25ldyBTdHJpbmcoXCJibGFibGFcIiknLCB0aGUgdHlwZW9mIGl0IHdpbGwgYmUgXCJvYmplY3RcIi4uLlxuICAgICAqIFRoZW4geW91IGNhbiB1c2UgdGhpcyBmdW5jdGlvbiBpZiB5b3UgY2FyZSBhYm91dCB0aGlzIGNhc2UuXG4gICAgICogQG1ldGhvZCBpc1N0cmluZ1xuICAgICAqIEBwYXJhbSB7Kn0gb2JqXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNTdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHwgb2JqIGluc3RhbmNlb2YgU3RyaW5nO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDb3B5IGFsbCBwcm9wZXJ0aWVzIG5vdCBkZWZpbmVkIGluIG9iaiBmcm9tIGFyZ3VtZW50c1sxLi4ubl1cbiAgICAgKiBAbWV0aG9kIGFkZG9uXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBvYmplY3QgdG8gZXh0ZW5kIGl0cyBwcm9wZXJ0aWVzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IC4uLnNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gICAgICogQHJldHVybiB7T2JqZWN0fSB0aGUgcmVzdWx0IG9ialxuICAgICAqL1xuICAgIGFkZG9uOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgICAgb2JqID0gb2JqIHx8IHt9O1xuICAgICAgICBmb3IgKHZhciBpID0gMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDU0MDIsIHNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKCB2YXIgbmFtZSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhKG5hbWUgaW4gb2JqKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jb3B5cHJvcCggbmFtZSwgc291cmNlLCBvYmopO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNvcHkgYWxsIHByb3BlcnRpZXMgZnJvbSBhcmd1bWVudHNbMS4uLm5dIHRvIG9ialxuICAgICAqIEBtZXRob2QgbWl4aW5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IC4uLnNvdXJjZU9ialxuICAgICAqIEByZXR1cm4ge09iamVjdH0gdGhlIHJlc3VsdCBvYmpcbiAgICAgKi9cbiAgICBtaXhpbjogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAndXNlIHN0cmljdCc7XG4gICAgICAgIG9iaiA9IG9iaiB8fCB7fTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDEsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3JJRCg1NDAzLCBzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICggdmFyIG5hbWUgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIF9jb3B5cHJvcCggbmFtZSwgc291cmNlLCBvYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZXJpdmUgdGhlIGNsYXNzIGZyb20gdGhlIHN1cHBsaWVkIGJhc2UgY2xhc3MuXG4gICAgICogQm90aCBjbGFzc2VzIGFyZSBqdXN0IG5hdGl2ZSBqYXZhc2NyaXB0IGNvbnN0cnVjdG9ycywgbm90IGNyZWF0ZWQgYnkgY2MuQ2xhc3MsIHNvXG4gICAgICogdXN1YWxseSB5b3Ugd2lsbCB3YW50IHRvIGluaGVyaXQgdXNpbmcge3sjY3Jvc3NMaW5rIFwiY2MvQ2xhc3M6bWV0aG9kXCJ9fWNjLkNsYXNzIHt7L2Nyb3NzTGlua319IGluc3RlYWQuXG4gICAgICogQG1ldGhvZCBleHRlbmRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbHNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBiYXNlIC0gdGhlIGJhc2VjbGFzcyB0byBpbmhlcml0XG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IHRoZSByZXN1bHQgY2xhc3NcbiAgICAgKi9cbiAgICBleHRlbmQ6IGZ1bmN0aW9uIChjbHMsIGJhc2UpIHtcbiAgICAgICAgaWYgKENDX0RFVikge1xuICAgICAgICAgICAgaWYgKCFiYXNlKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3JJRCg1NDA0KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNscykge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoNTQwNSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNscy5wcm90b3R5cGUpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDU0MDYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIHAgaW4gYmFzZSkgaWYgKGJhc2UuaGFzT3duUHJvcGVydHkocCkpIGNsc1twXSA9IGJhc2VbcF07XG4gICAgICAgIGNscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGJhc2UucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBjbHMsXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2xzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgc3VwZXIgY2xhc3NcbiAgICAgKiBAbWV0aG9kIGdldFN1cGVyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY3RvciAtIHRoZSBjb25zdHJ1Y3RvciBvZiBzdWJjbGFzc1xuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAqL1xuICAgIGdldFN1cGVyIChjdG9yKSB7XG4gICAgICAgIHZhciBwcm90byA9IGN0b3IucHJvdG90eXBlOyAvLyBiaW5kZWQgZnVuY3Rpb24gZG8gbm90IGhhdmUgcHJvdG90eXBlXG4gICAgICAgIHZhciBkdW5kZXJQcm90byA9IHByb3RvICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90byk7XG4gICAgICAgIHJldHVybiBkdW5kZXJQcm90byAmJiBkdW5kZXJQcm90by5jb25zdHJ1Y3RvcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgc3ViY2xhc3MgaXMgY2hpbGQgb2Ygc3VwZXJjbGFzcyBvciBlcXVhbHMgdG8gc3VwZXJjbGFzc1xuICAgICAqXG4gICAgICogQG1ldGhvZCBpc0NoaWxkQ2xhc3NPZlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHN1YmNsYXNzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3VwZXJjbGFzc1xuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNDaGlsZENsYXNzT2YgKHN1YmNsYXNzLCBzdXBlcmNsYXNzKSB7XG4gICAgICAgIGlmIChzdWJjbGFzcyAmJiBzdXBlcmNsYXNzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN1YmNsYXNzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdXBlcmNsYXNzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFVikge1xuICAgICAgICAgICAgICAgICAgICBjYy53YXJuSUQoMzYyNSwgc3VwZXJjbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdWJjbGFzcyA9PT0gc3VwZXJjbGFzcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICg7Oykge1xuICAgICAgICAgICAgICAgIHN1YmNsYXNzID0ganMuZ2V0U3VwZXIoc3ViY2xhc3MpO1xuICAgICAgICAgICAgICAgIGlmICghc3ViY2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3ViY2xhc3MgPT09IHN1cGVyY2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGZyb20gb2JqZWN0XG4gICAgICogQG1ldGhvZCBjbGVhclxuICAgICAqIEBwYXJhbSB7YW55fSBvYmpcbiAgICAgKi9cbiAgICBjbGVhcjogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGVsZXRlIG9ialtrZXlzW2ldXTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciBvYmogaXMgYW4gZW1wdHkgb2JqZWN0XG4gICAgICogQG1ldGhvZCBpc0VtcHR5T2JqZWN0XG4gICAgICogQHBhcmFtIHthbnl9IG9iaiBcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0VtcHR5T2JqZWN0OiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHByb3BlcnR5IGRlc2NyaXB0b3IgaW4gb2JqZWN0IGFuZCBhbGwgaXRzIGFuY2VzdG9yc1xuICAgICAqIEBtZXRob2QgZ2V0UHJvcGVydHlEZXNjcmlwdG9yXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldFByb3BlcnR5RGVzY3JpcHRvcjogX2dldFByb3BlcnR5RGVzY3JpcHRvclxufTtcblxuXG52YXIgdG1wVmFsdWVEZXNjID0ge1xuICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxufTtcblxuLyoqXG4gKiBEZWZpbmUgdmFsdWUsIGp1c3QgaGVscCB0byBjYWxsIE9iamVjdC5kZWZpbmVQcm9wZXJ0eS48YnI+XG4gKiBUaGUgY29uZmlndXJhYmxlIHdpbGwgYmUgdHJ1ZS5cbiAqIEBtZXRob2QgdmFsdWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dyaXRhYmxlPWZhbHNlXVxuICogQHBhcmFtIHtCb29sZWFufSBbZW51bWVyYWJsZT1mYWxzZV1cbiAqL1xuanMudmFsdWUgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCB2YWx1ZSwgd3JpdGFibGUsIGVudW1lcmFibGUpIHtcbiAgICB0bXBWYWx1ZURlc2MudmFsdWUgPSB2YWx1ZTtcbiAgICB0bXBWYWx1ZURlc2Mud3JpdGFibGUgPSB3cml0YWJsZTtcbiAgICB0bXBWYWx1ZURlc2MuZW51bWVyYWJsZSA9IGVudW1lcmFibGU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgdG1wVmFsdWVEZXNjKTtcbiAgICB0bXBWYWx1ZURlc2MudmFsdWUgPSB1bmRlZmluZWQ7XG59O1xuXG52YXIgdG1wR2V0U2V0RGVzYyA9IHtcbiAgICBnZXQ6IG51bGwsXG4gICAgc2V0OiBudWxsLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBEZWZpbmUgZ2V0IHNldCBhY2Nlc3NvciwganVzdCBoZWxwIHRvIGNhbGwgT2JqZWN0LmRlZmluZVByb3BlcnR5KC4uLilcbiAqIEBtZXRob2QgZ2V0c2V0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZ2V0dGVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbc2V0dGVyPW51bGxdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtlbnVtZXJhYmxlPWZhbHNlXVxuICogQHBhcmFtIHtCb29sZWFufSBbY29uZmlndXJhYmxlPWZhbHNlXVxuICovXG5qcy5nZXRzZXQgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCBnZXR0ZXIsIHNldHRlciwgZW51bWVyYWJsZSwgY29uZmlndXJhYmxlKSB7XG4gICAgaWYgKHR5cGVvZiBzZXR0ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZW51bWVyYWJsZSA9IHNldHRlcjtcbiAgICAgICAgc2V0dGVyID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0bXBHZXRTZXREZXNjLmdldCA9IGdldHRlcjtcbiAgICB0bXBHZXRTZXREZXNjLnNldCA9IHNldHRlcjtcbiAgICB0bXBHZXRTZXREZXNjLmVudW1lcmFibGUgPSBlbnVtZXJhYmxlO1xuICAgIHRtcEdldFNldERlc2MuY29uZmlndXJhYmxlID0gY29uZmlndXJhYmxlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIHRtcEdldFNldERlc2MpO1xuICAgIHRtcEdldFNldERlc2MuZ2V0ID0gbnVsbDtcbiAgICB0bXBHZXRTZXREZXNjLnNldCA9IG51bGw7XG59O1xuXG52YXIgdG1wR2V0RGVzYyA9IHtcbiAgICBnZXQ6IG51bGwsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiBmYWxzZVxufTtcblxuLyoqXG4gKiBEZWZpbmUgZ2V0IGFjY2Vzc29yLCBqdXN0IGhlbHAgdG8gY2FsbCBPYmplY3QuZGVmaW5lUHJvcGVydHkoLi4uKVxuICogQG1ldGhvZCBnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBnZXR0ZXJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2VudW1lcmFibGU9ZmFsc2VdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtjb25maWd1cmFibGU9ZmFsc2VdXG4gKi9cbmpzLmdldCA9IGZ1bmN0aW9uIChvYmosIHByb3AsIGdldHRlciwgZW51bWVyYWJsZSwgY29uZmlndXJhYmxlKSB7XG4gICAgdG1wR2V0RGVzYy5nZXQgPSBnZXR0ZXI7XG4gICAgdG1wR2V0RGVzYy5lbnVtZXJhYmxlID0gZW51bWVyYWJsZTtcbiAgICB0bXBHZXREZXNjLmNvbmZpZ3VyYWJsZSA9IGNvbmZpZ3VyYWJsZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCB0bXBHZXREZXNjKTtcbiAgICB0bXBHZXREZXNjLmdldCA9IG51bGw7XG59O1xuXG52YXIgdG1wU2V0RGVzYyA9IHtcbiAgICBzZXQ6IG51bGwsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiBmYWxzZVxufTtcblxuLyoqXG4gKiBEZWZpbmUgc2V0IGFjY2Vzc29yLCBqdXN0IGhlbHAgdG8gY2FsbCBPYmplY3QuZGVmaW5lUHJvcGVydHkoLi4uKVxuICogQG1ldGhvZCBzZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzZXR0ZXJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2VudW1lcmFibGU9ZmFsc2VdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtjb25maWd1cmFibGU9ZmFsc2VdXG4gKi9cbmpzLnNldCA9IGZ1bmN0aW9uIChvYmosIHByb3AsIHNldHRlciwgZW51bWVyYWJsZSwgY29uZmlndXJhYmxlKSB7XG4gICAgdG1wU2V0RGVzYy5zZXQgPSBzZXR0ZXI7XG4gICAgdG1wU2V0RGVzYy5lbnVtZXJhYmxlID0gZW51bWVyYWJsZTtcbiAgICB0bXBTZXREZXNjLmNvbmZpZ3VyYWJsZSA9IGNvbmZpZ3VyYWJsZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCB0bXBTZXREZXNjKTtcbiAgICB0bXBTZXREZXNjLnNldCA9IG51bGw7XG59O1xuXG4vKipcbiAqIEdldCBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIG9iamVjdCBpcyBqdXN0IGEge30gKGFuZCB3aGljaCBjbGFzcyBuYW1lZCAnT2JqZWN0JyksIGl0IHdpbGwgcmV0dXJuIFwiXCIuXG4gKiAobW9kaWZpZWQgZnJvbSA8YSBocmVmPVwiaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMjQ5NTMxL2hvdy10by1nZXQtYS1qYXZhc2NyaXB0LW9iamVjdHMtY2xhc3NcIj50aGUgY29kZSBmcm9tIHRoaXMgc3RhY2tvdmVyZmxvdyBwb3N0PC9hPilcbiAqIEBtZXRob2QgZ2V0Q2xhc3NOYW1lXG4gKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gb2JqT3JDdG9yIC0gaW5zdGFuY2Ugb3IgY29uc3RydWN0b3JcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuanMuZ2V0Q2xhc3NOYW1lID0gZnVuY3Rpb24gKG9iak9yQ3Rvcikge1xuICAgIGlmICh0eXBlb2Ygb2JqT3JDdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhciBwcm90b3R5cGUgPSBvYmpPckN0b3IucHJvdG90eXBlO1xuICAgICAgICBpZiAocHJvdG90eXBlICYmIHByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgnX19jbGFzc25hbWVfXycpICYmIHByb3RvdHlwZS5fX2NsYXNzbmFtZV9fKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvdG90eXBlLl9fY2xhc3NuYW1lX187XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJldHZhbCA9ICcnO1xuICAgICAgICAvLyAgZm9yIGJyb3dzZXJzIHdoaWNoIGhhdmUgbmFtZSBwcm9wZXJ0eSBpbiB0aGUgY29uc3RydWN0b3Igb2YgdGhlIG9iamVjdCwgc3VjaCBhcyBjaHJvbWVcbiAgICAgICAgaWYgKG9iak9yQ3Rvci5uYW1lKSB7XG4gICAgICAgICAgICByZXR2YWwgPSBvYmpPckN0b3IubmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqT3JDdG9yLnRvU3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgYXJyLCBzdHIgPSBvYmpPckN0b3IudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmIChzdHIuY2hhckF0KDApID09PSAnWycpIHtcbiAgICAgICAgICAgICAgICAvLyBzdHIgaXMgXCJbb2JqZWN0IG9iamVjdENsYXNzXVwiXG4gICAgICAgICAgICAgICAgYXJyID0gc3RyLm1hdGNoKC9cXFtcXHcrXFxzKihcXHcrKVxcXS8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gc3RyIGlzIGZ1bmN0aW9uIG9iamVjdENsYXNzICgpIHt9IGZvciBJRSBGaXJlZm94XG4gICAgICAgICAgICAgICAgYXJyID0gc3RyLm1hdGNoKC9mdW5jdGlvblxccyooXFx3KykvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhcnIgJiYgYXJyLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHJldHZhbCA9IGFyclsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dmFsICE9PSAnT2JqZWN0JyA/IHJldHZhbCA6ICcnO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmpPckN0b3IgJiYgb2JqT3JDdG9yLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHJldHVybiBqcy5nZXRDbGFzc05hbWUob2JqT3JDdG9yLmNvbnN0cnVjdG9yKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufTtcblxuZnVuY3Rpb24gaXNUZW1wQ2xhc3NJZCAoaWQpIHtcbiAgICByZXR1cm4gdHlwZW9mIGlkICE9PSAnc3RyaW5nJyB8fCBpZC5zdGFydHNXaXRoKHRlbXBDSURHZW5lcmF0ZXIucHJlZml4KTtcbn1cblxuLy8gaWQg5rOo5YaMXG4oZnVuY3Rpb24gKCkge1xuICAgIHZhciBfaWRUb0NsYXNzID0ge307XG4gICAgdmFyIF9uYW1lVG9DbGFzcyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gc2V0dXAgKGtleSwgcHVibGljTmFtZSwgdGFibGUpIHtcbiAgICAgICAganMuZ2V0c2V0KGpzLCBwdWJsaWNOYW1lLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0YWJsZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAganMuY2xlYXIodGFibGUpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGFibGUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpZCwgY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIC8vIGRlcmVnaXN0ZXIgb2xkXG4gICAgICAgICAgICBpZiAoY29uc3RydWN0b3IucHJvdG90eXBlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGFibGVbY29uc3RydWN0b3IucHJvdG90eXBlW2tleV1dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAganMudmFsdWUoY29uc3RydWN0b3IucHJvdG90eXBlLCBrZXksIGlkKTtcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIGNsYXNzXG4gICAgICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVnaXN0ZXJlZCA9IHRhYmxlW2lkXTtcbiAgICAgICAgICAgICAgICBpZiAocmVnaXN0ZXJlZCAmJiByZWdpc3RlcmVkICE9PSBjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSAnQSBDbGFzcyBhbHJlYWR5IGV4aXN0cyB3aXRoIHRoZSBzYW1lICcgKyBrZXkgKyAnIDogXCInICsgaWQgKyAnXCIuJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKENDX1RFU1QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yICs9ICcgKFRoaXMgbWF5IGJlIGNhdXNlZCBieSBlcnJvciBvZiB1bml0IHRlc3QuKSBcXFxuSWYgeW91IGRvbnQgbmVlZCBzZXJpYWxpemF0aW9uLCB5b3UgY2FuIHNldCBjbGFzcyBpZCB0byBcIlwiLiBZb3UgY2FuIGFsc28gY2FsbCBcXFxuY2MuanMudW5yZWdpc3RlckNsYXNzIHRvIHJlbW92ZSB0aGUgaWQgb2YgdW51c2VkIGNsYXNzJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YWJsZVtpZF0gPSBjb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9pZiAoaWQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAvLyAgICBjb25zb2xlLnRyYWNlKFwiXCIsIHRhYmxlID09PSBfbmFtZVRvQ2xhc3MpO1xuICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIHRoZSBjbGFzcyBieSBzcGVjaWZpZWQgaWQsIGlmIGl0cyBjbGFzc25hbWUgaXMgbm90IGRlZmluZWQsIHRoZSBjbGFzcyBuYW1lIHdpbGwgYWxzbyBiZSBzZXQuXG4gICAgICogQG1ldGhvZCBfc2V0Q2xhc3NJZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc0lkXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29uc3RydWN0b3JcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIC8qKlxuICAgICAqICEjZW4gQWxsIGNsYXNzZXMgcmVnaXN0ZXJlZCBpbiB0aGUgZW5naW5lLCBpbmRleGVkIGJ5IElELlxuICAgICAqICEjemgg5byV5pOO5Lit5bey5rOo5YaM55qE5omA5pyJ57G75Z6L77yM6YCa6L+HIElEIOi/m+ihjOe0ouW8leOAglxuICAgICAqIEBwcm9wZXJ0eSBfcmVnaXN0ZXJlZENsYXNzSWRzXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBzYXZlIGFsbCByZWdpc3RlcmVkIGNsYXNzZXMgYmVmb3JlIGxvYWRpbmcgc2NyaXB0c1xuICAgICAqIGxldCBidWlsdGluQ2xhc3NJZHMgPSBjYy5qcy5fcmVnaXN0ZXJlZENsYXNzSWRzO1xuICAgICAqIGxldCBidWlsdGluQ2xhc3NOYW1lcyA9IGNjLmpzLl9yZWdpc3RlcmVkQ2xhc3NOYW1lcztcbiAgICAgKiAvLyBsb2FkIHNvbWUgc2NyaXB0cyB0aGF0IGNvbnRhaW4gQ0NDbGFzc1xuICAgICAqIC4uLlxuICAgICAqIC8vIGNsZWFyIGFsbCBsb2FkZWQgY2xhc3Nlc1xuICAgICAqIGNjLmpzLl9yZWdpc3RlcmVkQ2xhc3NJZHMgPSBidWlsdGluQ2xhc3NJZHM7XG4gICAgICogY2MuanMuX3JlZ2lzdGVyZWRDbGFzc05hbWVzID0gYnVpbHRpbkNsYXNzTmFtZXM7XG4gICAgICovXG4gICAganMuX3NldENsYXNzSWQgPSBzZXR1cCgnX19jaWRfXycsICdfcmVnaXN0ZXJlZENsYXNzSWRzJywgX2lkVG9DbGFzcyk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEFsbCBjbGFzc2VzIHJlZ2lzdGVyZWQgaW4gdGhlIGVuZ2luZSwgaW5kZXhlZCBieSBuYW1lLlxuICAgICAqICEjemgg5byV5pOO5Lit5bey5rOo5YaM55qE5omA5pyJ57G75Z6L77yM6YCa6L+H5ZCN56ew6L+b6KGM57Si5byV44CCXG4gICAgICogQHByb3BlcnR5IF9yZWdpc3RlcmVkQ2xhc3NOYW1lc1xuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gc2F2ZSBhbGwgcmVnaXN0ZXJlZCBjbGFzc2VzIGJlZm9yZSBsb2FkaW5nIHNjcmlwdHNcbiAgICAgKiBsZXQgYnVpbHRpbkNsYXNzSWRzID0gY2MuanMuX3JlZ2lzdGVyZWRDbGFzc0lkcztcbiAgICAgKiBsZXQgYnVpbHRpbkNsYXNzTmFtZXMgPSBjYy5qcy5fcmVnaXN0ZXJlZENsYXNzTmFtZXM7XG4gICAgICogLy8gbG9hZCBzb21lIHNjcmlwdHMgdGhhdCBjb250YWluIENDQ2xhc3NcbiAgICAgKiAuLi5cbiAgICAgKiAvLyBjbGVhciBhbGwgbG9hZGVkIGNsYXNzZXNcbiAgICAgKiBjYy5qcy5fcmVnaXN0ZXJlZENsYXNzSWRzID0gYnVpbHRpbkNsYXNzSWRzO1xuICAgICAqIGNjLmpzLl9yZWdpc3RlcmVkQ2xhc3NOYW1lcyA9IGJ1aWx0aW5DbGFzc05hbWVzO1xuICAgICAqL1xuICAgIHZhciBkb1NldENsYXNzTmFtZSA9IHNldHVwKCdfX2NsYXNzbmFtZV9fJywgJ19yZWdpc3RlcmVkQ2xhc3NOYW1lcycsIF9uYW1lVG9DbGFzcyk7XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciB0aGUgY2xhc3MgYnkgc3BlY2lmaWVkIG5hbWUgbWFudWFsbHlcbiAgICAgKiBAbWV0aG9kIHNldENsYXNzTmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGpzLnNldENsYXNzTmFtZSA9IGZ1bmN0aW9uIChjbGFzc05hbWUsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIGRvU2V0Q2xhc3NOYW1lKGNsYXNzTmFtZSwgY29uc3RydWN0b3IpO1xuICAgICAgICAvLyBhdXRvIHNldCBjbGFzcyBpZFxuICAgICAgICBpZiAoIWNvbnN0cnVjdG9yLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgnX19jaWRfXycpKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSBjbGFzc05hbWUgfHwgdGVtcENJREdlbmVyYXRlci5nZXROZXdJZCgpO1xuICAgICAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICAgICAganMuX3NldENsYXNzSWQoaWQsIGNvbnN0cnVjdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVbnJlZ2lzdGVyIGEgY2xhc3MgZnJvbSBmaXJlYmFsbC5cbiAgICAgKlxuICAgICAqIElmIHlvdSBkb250IG5lZWQgYSByZWdpc3RlcmVkIGNsYXNzIGFueW1vcmUsIHlvdSBzaG91bGQgdW5yZWdpc3RlciB0aGUgY2xhc3Mgc28gdGhhdCBGaXJlYmFsbCB3aWxsIG5vdCBrZWVwIGl0cyByZWZlcmVuY2UgYW55bW9yZS5cbiAgICAgKiBQbGVhc2Ugbm90ZSB0aGF0IGl0cyBzdGlsbCB5b3VyIHJlc3BvbnNpYmlsaXR5IHRvIGZyZWUgb3RoZXIgcmVmZXJlbmNlcyB0byB0aGUgY2xhc3MuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHVucmVnaXN0ZXJDbGFzc1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IC4uLmNvbnN0cnVjdG9yIC0gdGhlIGNsYXNzIHlvdSB3aWxsIHdhbnQgdG8gdW5yZWdpc3RlciwgYW55IG51bWJlciBvZiBjbGFzc2VzIGNhbiBiZSBhZGRlZFxuICAgICAqL1xuICAgIGpzLnVucmVnaXN0ZXJDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwID0gYXJndW1lbnRzW2ldLnByb3RvdHlwZTtcbiAgICAgICAgICAgIHZhciBjbGFzc0lkID0gcC5fX2NpZF9fO1xuICAgICAgICAgICAgaWYgKGNsYXNzSWQpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgX2lkVG9DbGFzc1tjbGFzc0lkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjbGFzc25hbWUgPSBwLl9fY2xhc3NuYW1lX187XG4gICAgICAgICAgICBpZiAoY2xhc3NuYW1lKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIF9uYW1lVG9DbGFzc1tjbGFzc25hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcmVnaXN0ZXJlZCBjbGFzcyBieSBpZFxuICAgICAqIEBtZXRob2QgX2dldENsYXNzQnlJZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc0lkXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBqcy5fZ2V0Q2xhc3NCeUlkID0gZnVuY3Rpb24gKGNsYXNzSWQpIHtcbiAgICAgICAgcmV0dXJuIF9pZFRvQ2xhc3NbY2xhc3NJZF07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcmVnaXN0ZXJlZCBjbGFzcyBieSBuYW1lXG4gICAgICogQG1ldGhvZCBnZXRDbGFzc0J5TmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc25hbWVcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBqcy5nZXRDbGFzc0J5TmFtZSA9IGZ1bmN0aW9uIChjbGFzc25hbWUpIHtcbiAgICAgICAgcmV0dXJuIF9uYW1lVG9DbGFzc1tjbGFzc25hbWVdO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBHZXQgY2xhc3MgaWQgb2YgdGhlIG9iamVjdFxuICAgICAqIEBtZXRob2QgX2dldENsYXNzSWRcbiAgICAgKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gb2JqIC0gaW5zdGFuY2Ugb3IgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxvd1RlbXBJZD10cnVlXSAtIGNhbiByZXR1cm4gdGVtcCBpZCBpbiBlZGl0b3JcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBqcy5fZ2V0Q2xhc3NJZCA9IGZ1bmN0aW9uIChvYmosIGFsbG93VGVtcElkKSB7XG4gICAgICAgIGFsbG93VGVtcElkID0gKHR5cGVvZiBhbGxvd1RlbXBJZCAhPT0gJ3VuZGVmaW5lZCcgPyBhbGxvd1RlbXBJZDogdHJ1ZSk7XG5cbiAgICAgICAgdmFyIHJlcztcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicgJiYgb2JqLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgnX19jaWRfXycpKSB7XG4gICAgICAgICAgICByZXMgPSBvYmoucHJvdG90eXBlLl9fY2lkX187XG4gICAgICAgICAgICBpZiAoIWFsbG93VGVtcElkICYmIChDQ19ERVYgfHwgQ0NfRURJVE9SKSAmJiBpc1RlbXBDbGFzc0lkKHJlcykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvYmogJiYgb2JqLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICB2YXIgcHJvdG90eXBlID0gb2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICAgICAgICAgIGlmIChwcm90b3R5cGUgJiYgcHJvdG90eXBlLmhhc093blByb3BlcnR5KCdfX2NpZF9fJykpIHtcbiAgICAgICAgICAgICAgICByZXMgPSBvYmouX19jaWRfXztcbiAgICAgICAgICAgICAgICBpZiAoIWFsbG93VGVtcElkICYmIChDQ19ERVYgfHwgQ0NfRURJVE9SKSAmJiBpc1RlbXBDbGFzc0lkKHJlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBEZWZpbmVzIGEgcG9seWZpbGwgZmllbGQgZm9yIGRlcHJlY2F0ZWQgY29kZXMuXG4gKiBAbWV0aG9kIG9ic29sZXRlXG4gKiBAcGFyYW0ge2FueX0gb2JqIC0gWW91ck9iamVjdCBvciBZb3VyQ2xhc3MucHJvdG90eXBlXG4gKiBAcGFyYW0ge1N0cmluZ30gb2Jzb2xldGVkIC0gXCJPbGRQYXJhbVwiIG9yIFwiWW91ckNsYXNzLk9sZFBhcmFtXCJcbiAqIEBwYXJhbSB7U3RyaW5nfSBuZXdFeHByIC0gXCJOZXdQYXJhbVwiIG9yIFwiWW91ckNsYXNzLk5ld1BhcmFtXCJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3dyaXRhYmxlPWZhbHNlXVxuICovXG5qcy5vYnNvbGV0ZSA9IGZ1bmN0aW9uIChvYmosIG9ic29sZXRlZCwgbmV3RXhwciwgd3JpdGFibGUpIHtcbiAgICB2YXIgZXh0cmFjdFByb3BOYW1lID0gLyhbXi5dKykkLztcbiAgICB2YXIgb2xkUHJvcCA9IGV4dHJhY3RQcm9wTmFtZS5leGVjKG9ic29sZXRlZClbMF07XG4gICAgdmFyIG5ld1Byb3AgPSBleHRyYWN0UHJvcE5hbWUuZXhlYyhuZXdFeHByKVswXTtcbiAgICBmdW5jdGlvbiBnZXQgKCkge1xuICAgICAgICBpZiAoQ0NfREVWKSB7XG4gICAgICAgICAgICBjYy53YXJuSUQoMTQwMCwgb2Jzb2xldGVkLCBuZXdFeHByKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1tuZXdQcm9wXTtcbiAgICB9XG4gICAgaWYgKHdyaXRhYmxlKSB7XG4gICAgICAgIGpzLmdldHNldChvYmosIG9sZFByb3AsXG4gICAgICAgICAgICBnZXQsXG4gICAgICAgICAgICBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfREVWKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm5JRCgxNDAwLCBvYnNvbGV0ZWQsIG5ld0V4cHIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzW25ld1Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBqcy5nZXQob2JqLCBvbGRQcm9wLCBnZXQpO1xuICAgIH1cbn07XG5cbi8qKlxuICogRGVmaW5lcyBhbGwgcG9seWZpbGwgZmllbGRzIGZvciBvYnNvbGV0ZWQgY29kZXMgY29ycmVzcG9uZGluZyB0byB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHByb3BzLlxuICogQG1ldGhvZCBvYnNvbGV0ZXNcbiAqIEBwYXJhbSB7YW55fSBvYmogLSBZb3VyT2JqZWN0IG9yIFlvdXJDbGFzcy5wcm90b3R5cGVcbiAqIEBwYXJhbSB7YW55fSBvYmpOYW1lIC0gXCJZb3VyT2JqZWN0XCIgb3IgXCJZb3VyQ2xhc3NcIlxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFt3cml0YWJsZT1mYWxzZV1cbiAqL1xuanMub2Jzb2xldGVzID0gZnVuY3Rpb24gKG9iaiwgb2JqTmFtZSwgcHJvcHMsIHdyaXRhYmxlKSB7XG4gICAgZm9yICh2YXIgb2Jzb2xldGVkIGluIHByb3BzKSB7XG4gICAgICAgIHZhciBuZXdOYW1lID0gcHJvcHNbb2Jzb2xldGVkXTtcbiAgICAgICAganMub2Jzb2xldGUob2JqLCBvYmpOYW1lICsgJy4nICsgb2Jzb2xldGVkLCBuZXdOYW1lLCB3cml0YWJsZSk7XG4gICAgfVxufTtcblxudmFyIFJFR0VYUF9OVU1fT1JfU1RSID0gLyglZCl8KCVzKS87XG52YXIgUkVHRVhQX1NUUiA9IC8lcy87XG5cbi8qKlxuICogQSBzdHJpbmcgdG9vbCB0byBjb25zdHJ1Y3QgYSBzdHJpbmcgd2l0aCBmb3JtYXQgc3RyaW5nLlxuICogQG1ldGhvZCBmb3JtYXRTdHJcbiAqIEBwYXJhbSB7U3RyaW5nfGFueX0gbXNnIC0gQSBKYXZhU2NyaXB0IHN0cmluZyBjb250YWluaW5nIHplcm8gb3IgbW9yZSBzdWJzdGl0dXRpb24gc3RyaW5ncyAoJXMpLlxuICogQHBhcmFtIHthbnl9IC4uLnN1YnN0IC0gSmF2YVNjcmlwdCBvYmplY3RzIHdpdGggd2hpY2ggdG8gcmVwbGFjZSBzdWJzdGl0dXRpb24gc3RyaW5ncyB3aXRoaW4gbXNnLiBUaGlzIGdpdmVzIHlvdSBhZGRpdGlvbmFsIGNvbnRyb2wgb3ZlciB0aGUgZm9ybWF0IG9mIHRoZSBvdXRwdXQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICogQGV4YW1wbGVcbiAqIGNjLmpzLmZvcm1hdFN0cihcImE6ICVzLCBiOiAlc1wiLCBhLCBiKTtcbiAqIGNjLmpzLmZvcm1hdFN0cihhLCBiLCBjKTtcbiAqL1xuanMuZm9ybWF0U3RyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcmdMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmIChhcmdMZW4gPT09IDApIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgbXNnID0gYXJndW1lbnRzWzBdO1xuICAgIGlmIChhcmdMZW4gPT09IDEpIHtcbiAgICAgICAgcmV0dXJuICcnICsgbXNnO1xuICAgIH1cblxuICAgIHZhciBoYXNTdWJzdGl0dXRpb24gPSB0eXBlb2YgbXNnID09PSAnc3RyaW5nJyAmJiBSRUdFWFBfTlVNX09SX1NUUi50ZXN0KG1zZyk7XG4gICAgaWYgKGhhc1N1YnN0aXR1dGlvbikge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGFyZ0xlbjsgKytpKSB7XG4gICAgICAgICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgdmFyIHJlZ0V4cFRvVGVzdCA9IHR5cGVvZiBhcmcgPT09ICdudW1iZXInID8gUkVHRVhQX05VTV9PUl9TVFIgOiBSRUdFWFBfU1RSO1xuICAgICAgICAgICAgaWYgKHJlZ0V4cFRvVGVzdC50ZXN0KG1zZykpXG4gICAgICAgICAgICAgICAgbXNnID0gbXNnLnJlcGxhY2UocmVnRXhwVG9UZXN0LCBhcmcpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIG1zZyArPSAnICcgKyBhcmc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYXJnTGVuOyArK2kpIHtcbiAgICAgICAgICAgIG1zZyArPSAnICcgKyBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1zZztcbn07XG5cbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vcGV0a2FhbnRvbm92L2JsdWViaXJkL2lzc3Vlcy8xMzg5XG5qcy5zaGlmdEFyZ3VtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkobGVuKTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgfVxuICAgIHJldHVybiBhcmdzO1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBBIHNpbXBsZSB3cmFwcGVyIG9mIGBPYmplY3QuY3JlYXRlKG51bGwpYCB3aGljaCBlbnN1cmVzIHRoZSByZXR1cm4gb2JqZWN0IGhhdmUgbm8gcHJvdG90eXBlIChhbmQgdGh1cyBubyBpbmhlcml0ZWQgbWVtYmVycykuIFNvIHdlIGNhbiBza2lwIGBoYXNPd25Qcm9wZXJ0eWAgY2FsbHMgb24gcHJvcGVydHkgbG9va3Vwcy4gSXQgaXMgYSB3b3J0aHdoaWxlIG9wdGltaXphdGlvbiB0aGFuIHRoZSBge31gIGxpdGVyYWwgd2hlbiBgaGFzT3duUHJvcGVydHlgIGNhbGxzIGFyZSBuZWNlc3NhcnkuXG4gKiAhI3poXG4gKiDor6Xmlrnms5XmmK/lr7kgYE9iamVjdC5jcmVhdGUobnVsbClgIOeahOeugOWNleWwgeijheOAgmBPYmplY3QuY3JlYXRlKG51bGwpYCDnlKjkuo7liJvlu7rml6AgcHJvdG90eXBlIO+8iOS5n+WwseaXoOe7p+aJv++8ieeahOepuuWvueixoeOAgui/meagt+aIkeS7rOWcqOivpeWvueixoeS4iuafpeaJvuWxnuaAp+aXtu+8jOWwseS4jeeUqOi/m+ihjCBgaGFzT3duUHJvcGVydHlgIOWIpOaWreOAguWcqOmcgOimgemikee5geWIpOaWrSBgaGFzT3duUHJvcGVydHlgIOaXtu+8jOS9v+eUqOi/meS4quaWueazleaAp+iDveS8muavlCBge31gIOabtOmrmOOAglxuICpcbiAqIEBtZXRob2QgY3JlYXRlTWFwXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtmb3JjZURpY3RNb2RlPWZhbHNlXSAtIEFwcGx5IHRoZSBkZWxldGUgb3BlcmF0b3IgdG8gbmV3bHkgY3JlYXRlZCBtYXAgb2JqZWN0LiBUaGlzIGNhdXNlcyBWOCB0byBwdXQgdGhlIG9iamVjdCBpbiBcImRpY3Rpb25hcnkgbW9kZVwiIGFuZCBkaXNhYmxlcyBjcmVhdGlvbiBvZiBoaWRkZW4gY2xhc3NlcyB3aGljaCBhcmUgdmVyeSBleHBlbnNpdmUgZm9yIG9iamVjdHMgdGhhdCBhcmUgY29uc3RhbnRseSBjaGFuZ2luZyBzaGFwZS5cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuanMuY3JlYXRlTWFwID0gZnVuY3Rpb24gKGZvcmNlRGljdE1vZGUpIHtcbiAgICB2YXIgbWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBpZiAoZm9yY2VEaWN0TW9kZSkge1xuICAgICAgICBjb25zdCBJTlZBTElEX0lERU5USUZJRVJfMSA9ICcuJztcbiAgICAgICAgY29uc3QgSU5WQUxJRF9JREVOVElGSUVSXzIgPSAnLyc7XG4gICAgICAgIG1hcFtJTlZBTElEX0lERU5USUZJRVJfMV0gPSB0cnVlO1xuICAgICAgICBtYXBbSU5WQUxJRF9JREVOVElGSUVSXzJdID0gdHJ1ZTtcbiAgICAgICAgZGVsZXRlIG1hcFtJTlZBTElEX0lERU5USUZJRVJfMV07XG4gICAgICAgIGRlbGV0ZSBtYXBbSU5WQUxJRF9JREVOVElGSUVSXzJdO1xuICAgIH1cbiAgICByZXR1cm4gbWFwO1xufTtcblxuLyoqXG4gKiBAY2xhc3MgYXJyYXlcbiAqIEBzdGF0aWNcbiAqL1xuXG4vKipcbiAqIFJlbW92ZXMgdGhlIGFycmF5IGl0ZW0gYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAqIEBtZXRob2QgcmVtb3ZlQXRcbiAqIEBwYXJhbSB7YW55W119IGFycmF5XG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQXQgKGFycmF5LCBpbmRleCkge1xuICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XG59XG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgYXJyYXkgaXRlbSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICogSXQncyBmYXN0ZXIgYnV0IHRoZSBvcmRlciBvZiB0aGUgYXJyYXkgd2lsbCBiZSBjaGFuZ2VkLlxuICogQG1ldGhvZCBmYXN0UmVtb3ZlQXRcbiAqIEBwYXJhbSB7YW55W119IGFycmF5XG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAqL1xuZnVuY3Rpb24gZmFzdFJlbW92ZUF0IChhcnJheSwgaW5kZXgpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gbGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXJyYXlbaW5kZXhdID0gYXJyYXlbbGVuZ3RoIC0gMV07XG4gICAgYXJyYXkubGVuZ3RoID0gbGVuZ3RoIC0gMTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGEgc3BlY2lmaWMgb2JqZWN0IGZyb20gdGhlIGFycmF5LlxuICogQG1ldGhvZCByZW1vdmVcbiAqIEBwYXJhbSB7YW55W119IGFycmF5XG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIHJlbW92ZSAoYXJyYXksIHZhbHVlKSB7XG4gICAgdmFyIGluZGV4ID0gYXJyYXkuaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgcmVtb3ZlQXQoYXJyYXksIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYSBzcGVjaWZpYyBvYmplY3QgZnJvbSB0aGUgYXJyYXkuXG4gKiBJdCdzIGZhc3RlciBidXQgdGhlIG9yZGVyIG9mIHRoZSBhcnJheSB3aWxsIGJlIGNoYW5nZWQuXG4gKiBAbWV0aG9kIGZhc3RSZW1vdmVcbiAqIEBwYXJhbSB7YW55W119IGFycmF5XG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAqL1xuZnVuY3Rpb24gZmFzdFJlbW92ZSAoYXJyYXksIHZhbHVlKSB7XG4gICAgdmFyIGluZGV4ID0gYXJyYXkuaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgYXJyYXlbaW5kZXhdID0gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgICAgIC0tYXJyYXkubGVuZ3RoO1xuICAgIH1cbn1cblxuLyoqXG4gKiBWZXJpZnkgYXJyYXkncyBUeXBlXG4gKiBAbWV0aG9kIHZlcmlmeVR5cGVcbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0eXBlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiB2ZXJpZnlUeXBlIChhcnJheSwgdHlwZSkge1xuICAgIGlmIChhcnJheSAmJiBhcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghKGFycmF5W2ldIGluc3RhbmNlb2YgIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nSUQoMTMwMCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgZnJvbSBhcnJheSBhbGwgdmFsdWVzIGluIG1pbnVzQXJyLiBGb3IgZWFjaCBWYWx1ZSBpbiBtaW51c0FyciwgdGhlIGZpcnN0IG1hdGNoaW5nIGluc3RhbmNlIGluIGFycmF5IHdpbGwgYmUgcmVtb3ZlZC5cbiAqIEBtZXRob2QgcmVtb3ZlQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFNvdXJjZSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gbWludXNBcnIgbWludXMgQXJyYXlcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQXJyYXkgKGFycmF5LCBtaW51c0Fycikge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbWludXNBcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHJlbW92ZShhcnJheSwgbWludXNBcnJbaV0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBJbnNlcnRzIHNvbWUgb2JqZWN0cyBhdCBpbmRleFxuICogQG1ldGhvZCBhcHBlbmRPYmplY3RzQXRcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhZGRPYmpzXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5mdW5jdGlvbiBhcHBlbmRPYmplY3RzQXQgKGFycmF5LCBhZGRPYmpzLCBpbmRleCkge1xuICAgIGFycmF5LnNwbGljZS5hcHBseShhcnJheSwgW2luZGV4LCAwXS5jb25jYXQoYWRkT2JqcykpO1xuICAgIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGFycmF5IGNvbnRhaW5zIGEgc3BlY2lmaWMgdmFsdWUuXG4gKiBAbWV0aG9kIGNvbnRhaW5zXG4gKiBAcGFyYW0ge2FueVtdfSBhcnJheVxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBjb250YWlucyAoYXJyYXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIGFycmF5LmluZGV4T2YodmFsdWUpID49IDA7XG59XG5cbi8qKlxuICogQ29weSBhbiBhcnJheSdzIGl0ZW0gdG8gYSBuZXcgYXJyYXkgKGl0cyBwZXJmb3JtYW5jZSBpcyBiZXR0ZXIgdGhhbiBBcnJheS5zbGljZSlcbiAqIEBtZXRob2QgY29weVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXlcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5mdW5jdGlvbiBjb3B5IChhcnJheSkge1xuICAgIHZhciBpLCBsZW4gPSBhcnJheS5sZW5ndGgsIGFycl9jbG9uZSA9IG5ldyBBcnJheShsZW4pO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSlcbiAgICAgICAgYXJyX2Nsb25lW2ldID0gYXJyYXlbaV07XG4gICAgcmV0dXJuIGFycl9jbG9uZTtcbn1cblxuanMuYXJyYXkgPSB7XG4gICAgcmVtb3ZlLFxuICAgIGZhc3RSZW1vdmUsXG4gICAgcmVtb3ZlQXQsXG4gICAgZmFzdFJlbW92ZUF0LFxuICAgIGNvbnRhaW5zLFxuICAgIHZlcmlmeVR5cGUsXG4gICAgcmVtb3ZlQXJyYXksXG4gICAgYXBwZW5kT2JqZWN0c0F0LFxuICAgIGNvcHksXG4gICAgTXV0YWJsZUZvcndhcmRJdGVyYXRvcjogcmVxdWlyZSgnLi4vdXRpbHMvbXV0YWJsZS1mb3J3YXJkLWl0ZXJhdG9yJylcbn07XG5cbi8vIE9CSkVDVCBQT09MXG5cbi8qKlxuICogISNlblxuICogQSBmaXhlZC1sZW5ndGggb2JqZWN0IHBvb2wgZGVzaWduZWQgZm9yIGdlbmVyYWwgdHlwZS48YnI+XG4gKiBUaGUgaW1wbGVtZW50YXRpb24gb2YgdGhpcyBvYmplY3QgcG9vbCBpcyB2ZXJ5IHNpbXBsZSxcbiAqIGl0IGNhbiBoZWxwcyB5b3UgdG8gaW1wcm92ZSB5b3VyIGdhbWUgcGVyZm9ybWFuY2UgZm9yIG9iamVjdHMgd2hpY2ggbmVlZCBmcmVxdWVudCByZWxlYXNlIGFuZCByZWNyZWF0ZSBvcGVyYXRpb25zPGJyLz5cbiAqICEjemhcbiAqIOmVv+W6puWbuuWumueahOWvueixoee8k+WtmOaxoO+8jOWPr+S7peeUqOadpee8k+WtmOWQhOenjeWvueixoeexu+Wei+OAgjxici8+XG4gKiDov5nkuKrlr7nosaHmsaDnmoTlrp7njrDpnZ7luLjnsr7nroDvvIzlroPlj6/ku6XluK7liqnmgqjmj5Dpq5jmuLjmiI/mgKfog73vvIzpgILnlKjkuo7kvJjljJblr7nosaHnmoTlj43lpI3liJvlu7rlkozplIDmr4HjgIJcbiAqIEBjbGFzcyBQb29sXG4gKiBAZXhhbXBsZVxuICpcbiAqRXhhbXBsZSAxOlxuICpcbiAqZnVuY3Rpb24gRGV0YWlscyAoKSB7XG4gKiAgICB0aGlzLnV1aWRMaXN0ID0gW107XG4gKn07XG4gKkRldGFpbHMucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICogICAgdGhpcy51dWlkTGlzdC5sZW5ndGggPSAwO1xuICp9O1xuICpEZXRhaWxzLnBvb2wgPSBuZXcganMuUG9vbChmdW5jdGlvbiAob2JqKSB7XG4gKiAgICBvYmoucmVzZXQoKTtcbiAqfSwgNSk7XG4gKkRldGFpbHMucG9vbC5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gKiAgICByZXR1cm4gdGhpcy5fZ2V0KCkgfHwgbmV3IERldGFpbHMoKTtcbiAqfTtcbiAqXG4gKnZhciBkZXRhaWwgPSBEZXRhaWxzLnBvb2wuZ2V0KCk7XG4gKi4uLlxuICpEZXRhaWxzLnBvb2wucHV0KGRldGFpbCk7XG4gKlxuICpFeGFtcGxlIDI6XG4gKlxuICpmdW5jdGlvbiBEZXRhaWxzIChidWZmZXIpIHtcbiAqICAgIHRoaXMudXVpZExpc3QgPSBidWZmZXI7XG4gKn07XG4gKi4uLlxuICpEZXRhaWxzLnBvb2wuZ2V0ID0gZnVuY3Rpb24gKGJ1ZmZlcikge1xuICogICAgdmFyIGNhY2hlZCA9IHRoaXMuX2dldCgpO1xuICogICAgaWYgKGNhY2hlZCkge1xuICogICAgICAgIGNhY2hlZC51dWlkTGlzdCA9IGJ1ZmZlcjtcbiAqICAgICAgICByZXR1cm4gY2FjaGVkO1xuICogICAgfVxuICogICAgZWxzZSB7XG4gKiAgICAgICAgcmV0dXJuIG5ldyBEZXRhaWxzKGJ1ZmZlcik7XG4gKiAgICB9XG4gKn07XG4gKlxuICp2YXIgZGV0YWlsID0gRGV0YWlscy5wb29sLmdldCggW10gKTtcbiAqLi4uXG4gKi9cbi8qKlxuICogISNlblxuICogQ29uc3RydWN0b3IgZm9yIGNyZWF0aW5nIGFuIG9iamVjdCBwb29sIGZvciB0aGUgc3BlY2lmaWMgb2JqZWN0IHR5cGUuXG4gKiBZb3UgY2FuIHBhc3MgYSBjYWxsYmFjayBhcmd1bWVudCBmb3IgcHJvY2VzcyB0aGUgY2xlYW51cCBsb2dpYyB3aGVuIHRoZSBvYmplY3QgaXMgcmVjeWNsZWQuXG4gKiAhI3poXG4gKiDkvb/nlKjmnoTpgKDlh73mlbDmnaXliJvlu7rkuIDkuKrmjIflrprlr7nosaHnsbvlnovnmoTlr7nosaHmsaDvvIzmgqjlj6/ku6XkvKDpgJLkuIDkuKrlm57osIPlh73mlbDvvIznlKjkuo7lpITnkIblr7nosaHlm57mlLbml7bnmoTmuIXnkIbpgLvovpHjgIJcbiAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjbGVhbnVwRnVuY10gLSB0aGUgY2FsbGJhY2sgbWV0aG9kIHVzZWQgdG8gcHJvY2VzcyB0aGUgY2xlYW51cCBsb2dpYyB3aGVuIHRoZSBvYmplY3QgaXMgcmVjeWNsZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gY2xlYW51cEZ1bmMub2JqXG4gKiBAcGFyYW0ge051bWJlcn0gc2l6ZSAtIGluaXRpYWxpemVzIHRoZSBsZW5ndGggb2YgdGhlIGFycmF5XG4gKiBAdHlwZXNjcmlwdFxuICogY29uc3RydWN0b3IoY2xlYW51cEZ1bmM6IChvYmo6IGFueSkgPT4gdm9pZCwgc2l6ZTogbnVtYmVyKVxuICogY29uc3RydWN0b3Ioc2l6ZTogbnVtYmVyKVxuICovXG5mdW5jdGlvbiBQb29sIChjbGVhbnVwRnVuYywgc2l6ZSkge1xuICAgIGlmIChzaXplID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2l6ZSA9IGNsZWFudXBGdW5jO1xuICAgICAgICBjbGVhbnVwRnVuYyA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuZ2V0ID0gbnVsbDtcbiAgICB0aGlzLmNvdW50ID0gMDtcbiAgICB0aGlzLl9wb29sID0gbmV3IEFycmF5KHNpemUpO1xuICAgIHRoaXMuX2NsZWFudXAgPSBjbGVhbnVwRnVuYztcbn1cblxuLyoqXG4gKiAhI2VuXG4gKiBHZXQgYW5kIGluaXRpYWxpemUgYW4gb2JqZWN0IGZyb20gcG9vbC4gVGhpcyBtZXRob2QgZGVmYXVsdHMgdG8gbnVsbCBhbmQgcmVxdWlyZXMgdGhlIHVzZXIgdG8gaW1wbGVtZW50IGl0LlxuICogISN6aFxuICog6I635Y+W5bm25Yid5aeL5YyW5a+56LGh5rGg5Lit55qE5a+56LGh44CC6L+Z5Liq5pa55rOV6buY6K6k5Li656m677yM6ZyA6KaB55So5oi36Ieq5bex5a6e546w44CCXG4gKiBAbWV0aG9kIGdldFxuICogQHBhcmFtIHthbnl9IC4uLnBhcmFtcyAtIHBhcmFtZXRlcnMgdG8gdXNlZCB0byBpbml0aWFsaXplIHRoZSBvYmplY3RcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBUaGUgY3VycmVudCBudW1iZXIgb2YgYXZhaWxhYmxlIG9iamVjdHMsIHRoZSBkZWZhdWx0IGlzIDAsIGl0IHdpbGwgZ3JhZHVhbGx5IGluY3JlYXNlIHdpdGggdGhlIHJlY3ljbGUgb2YgdGhlIG9iamVjdCxcbiAqIHRoZSBtYXhpbXVtIHdpbGwgbm90IGV4Y2VlZCB0aGUgc2l6ZSBzcGVjaWZpZWQgd2hlbiB0aGUgY29uc3RydWN0b3IgaXMgY2FsbGVkLlxuICogISN6aFxuICog5b2T5YmN5Y+v55So5a+56LGh5pWw6YeP77yM5LiA5byA5aeL6buY6K6k5pivIDDvvIzpmo/nnYDlr7nosaHnmoTlm57mlLbkvJrpgJDmuJDlop7lpKfvvIzmnIDlpKfkuI3kvJrotoXov4fosIPnlKjmnoTpgKDlh73mlbDml7bmjIflrprnmoQgc2l6ZeOAglxuICogQHByb3BlcnR5IHtOdW1iZXJ9IGNvdW50XG4gKiBAZGVmYXVsdCAwXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBHZXQgYW4gb2JqZWN0IGZyb20gcG9vbCwgaWYgbm8gYXZhaWxhYmxlIG9iamVjdCBpbiB0aGUgcG9vbCwgbnVsbCB3aWxsIGJlIHJldHVybmVkLlxuICogISN6aFxuICog6I635Y+W5a+56LGh5rGg5Lit55qE5a+56LGh77yM5aaC5p6c5a+56LGh5rGg5rKh5pyJ5Y+v55So5a+56LGh77yM5YiZ6L+U5Zue56m644CCXG4gKiBAbWV0aG9kIF9nZXRcbiAqIEByZXR1cm5zIHtPYmplY3R8bnVsbH1cbiAqL1xuUG9vbC5wcm90b3R5cGUuX2dldCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5jb3VudCA+IDApIHtcbiAgICAgICAgLS10aGlzLmNvdW50O1xuICAgICAgICB2YXIgY2FjaGUgPSB0aGlzLl9wb29sW3RoaXMuY291bnRdO1xuICAgICAgICB0aGlzLl9wb29sW3RoaXMuY291bnRdID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIGNhY2hlO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogISNlbiBQdXQgYW4gb2JqZWN0IGludG8gdGhlIHBvb2wuXG4gKiAhI3poIOWQkeWvueixoeaxoOi/lOi/mOS4gOS4quS4jeWGjemcgOimgeeahOWvueixoeOAglxuICogQG1ldGhvZCBwdXRcbiAqL1xuUG9vbC5wcm90b3R5cGUucHV0ID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBwb29sID0gdGhpcy5fcG9vbDtcbiAgICBpZiAodGhpcy5jb3VudCA8IHBvb2wubGVuZ3RoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jbGVhbnVwICYmIHRoaXMuX2NsZWFudXAob2JqKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBwb29sW3RoaXMuY291bnRdID0gb2JqO1xuICAgICAgICArK3RoaXMuY291bnQ7XG4gICAgfVxufTtcblxuLyoqXG4gKiAhI2VuIFJlc2l6ZSB0aGUgcG9vbC5cbiAqICEjemgg6K6+572u5a+56LGh5rGg5a656YeP44CCXG4gKiBAbWV0aG9kIHJlc2l6ZVxuICovXG5Qb29sLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbiAobGVuZ3RoKSB7XG4gICAgaWYgKGxlbmd0aCA+PSAwKSB7XG4gICAgICAgIHRoaXMuX3Bvb2wubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICBpZiAodGhpcy5jb3VudCA+IGxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jb3VudCA9IGxlbmd0aDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmpzLlBvb2wgPSBQb29sO1xuXG4vL1xuXG5jYy5qcyA9IGpzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGpzO1xuXG4vLyBmaXggc3VibW9kdWxlIHBvbGx1dGUgLi4uXG4vKipcbiAqIEBzdWJtb2R1bGUgY2NcbiAqL1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=