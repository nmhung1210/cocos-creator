
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

      if (regExpToTest.test(msg)) {
        var notReplaceFunction = '' + arg;
        msg = msg.replace(regExpToTest, notReplaceFunction);
      } else msg += ' ' + arg;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL2pzLmpzIl0sIm5hbWVzIjpbInRlbXBDSURHZW5lcmF0ZXIiLCJyZXF1aXJlIiwiX2dldFByb3BlcnR5RGVzY3JpcHRvciIsIm9iaiIsIm5hbWUiLCJwZCIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldFByb3RvdHlwZU9mIiwiX2NvcHlwcm9wIiwic291cmNlIiwidGFyZ2V0IiwiZGVmaW5lUHJvcGVydHkiLCJqcyIsImlzTnVtYmVyIiwiTnVtYmVyIiwiaXNTdHJpbmciLCJTdHJpbmciLCJhZGRvbiIsImkiLCJsZW5ndGgiLCJhcmd1bWVudHMiLCJjYyIsImVycm9ySUQiLCJtaXhpbiIsImV4dGVuZCIsImNscyIsImJhc2UiLCJDQ19ERVYiLCJrZXlzIiwicHJvdG90eXBlIiwicCIsImhhc093blByb3BlcnR5IiwiY3JlYXRlIiwiY29uc3RydWN0b3IiLCJ2YWx1ZSIsIndyaXRhYmxlIiwiY29uZmlndXJhYmxlIiwiZ2V0U3VwZXIiLCJjdG9yIiwicHJvdG8iLCJkdW5kZXJQcm90byIsImlzQ2hpbGRDbGFzc09mIiwic3ViY2xhc3MiLCJzdXBlcmNsYXNzIiwid2FybklEIiwiY2xlYXIiLCJpc0VtcHR5T2JqZWN0Iiwia2V5IiwiZ2V0UHJvcGVydHlEZXNjcmlwdG9yIiwidG1wVmFsdWVEZXNjIiwidW5kZWZpbmVkIiwiZW51bWVyYWJsZSIsInByb3AiLCJ0bXBHZXRTZXREZXNjIiwiZ2V0Iiwic2V0IiwiZ2V0c2V0IiwiZ2V0dGVyIiwic2V0dGVyIiwidG1wR2V0RGVzYyIsInRtcFNldERlc2MiLCJnZXRDbGFzc05hbWUiLCJvYmpPckN0b3IiLCJfX2NsYXNzbmFtZV9fIiwicmV0dmFsIiwidG9TdHJpbmciLCJhcnIiLCJzdHIiLCJjaGFyQXQiLCJtYXRjaCIsImlzVGVtcENsYXNzSWQiLCJpZCIsInN0YXJ0c1dpdGgiLCJwcmVmaXgiLCJfaWRUb0NsYXNzIiwiX25hbWVUb0NsYXNzIiwic2V0dXAiLCJwdWJsaWNOYW1lIiwidGFibGUiLCJhc3NpZ24iLCJyZWdpc3RlcmVkIiwiZXJyb3IiLCJDQ19URVNUIiwiX3NldENsYXNzSWQiLCJkb1NldENsYXNzTmFtZSIsInNldENsYXNzTmFtZSIsImNsYXNzTmFtZSIsImdldE5ld0lkIiwidW5yZWdpc3RlckNsYXNzIiwiY2xhc3NJZCIsIl9fY2lkX18iLCJjbGFzc25hbWUiLCJfZ2V0Q2xhc3NCeUlkIiwiZ2V0Q2xhc3NCeU5hbWUiLCJfZ2V0Q2xhc3NJZCIsImFsbG93VGVtcElkIiwicmVzIiwiQ0NfRURJVE9SIiwib2Jzb2xldGUiLCJvYnNvbGV0ZWQiLCJuZXdFeHByIiwiZXh0cmFjdFByb3BOYW1lIiwib2xkUHJvcCIsImV4ZWMiLCJuZXdQcm9wIiwib2Jzb2xldGVzIiwib2JqTmFtZSIsInByb3BzIiwibmV3TmFtZSIsIlJFR0VYUF9OVU1fT1JfU1RSIiwiUkVHRVhQX1NUUiIsImZvcm1hdFN0ciIsImFyZ0xlbiIsIm1zZyIsImhhc1N1YnN0aXR1dGlvbiIsInRlc3QiLCJhcmciLCJyZWdFeHBUb1Rlc3QiLCJub3RSZXBsYWNlRnVuY3Rpb24iLCJyZXBsYWNlIiwic2hpZnRBcmd1bWVudHMiLCJsZW4iLCJhcmdzIiwiQXJyYXkiLCJjcmVhdGVNYXAiLCJmb3JjZURpY3RNb2RlIiwibWFwIiwiSU5WQUxJRF9JREVOVElGSUVSXzEiLCJJTlZBTElEX0lERU5USUZJRVJfMiIsInJlbW92ZUF0IiwiYXJyYXkiLCJpbmRleCIsInNwbGljZSIsImZhc3RSZW1vdmVBdCIsInJlbW92ZSIsImluZGV4T2YiLCJmYXN0UmVtb3ZlIiwidmVyaWZ5VHlwZSIsInR5cGUiLCJsb2dJRCIsInJlbW92ZUFycmF5IiwibWludXNBcnIiLCJsIiwiYXBwZW5kT2JqZWN0c0F0IiwiYWRkT2JqcyIsImFwcGx5IiwiY29uY2F0IiwiY29udGFpbnMiLCJjb3B5IiwiYXJyX2Nsb25lIiwiTXV0YWJsZUZvcndhcmRJdGVyYXRvciIsIlBvb2wiLCJjbGVhbnVwRnVuYyIsInNpemUiLCJjb3VudCIsIl9wb29sIiwiX2NsZWFudXAiLCJfZ2V0IiwiY2FjaGUiLCJwdXQiLCJwb29sIiwicmVzaXplIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxJQUFNQSxnQkFBZ0IsR0FBRyxLQUFLQyxPQUFPLENBQUMsZ0JBQUQsQ0FBWixFQUFnQyxTQUFoQyxDQUF6Qjs7QUFHQSxTQUFTQyxzQkFBVCxDQUFpQ0MsR0FBakMsRUFBc0NDLElBQXRDLEVBQTRDO0FBQ3hDLFNBQU9ELEdBQVAsRUFBWTtBQUNSLFFBQUlFLEVBQUUsR0FBR0MsTUFBTSxDQUFDQyx3QkFBUCxDQUFnQ0osR0FBaEMsRUFBcUNDLElBQXJDLENBQVQ7O0FBQ0EsUUFBSUMsRUFBSixFQUFRO0FBQ0osYUFBT0EsRUFBUDtBQUNIOztBQUNERixJQUFBQSxHQUFHLEdBQUdHLE1BQU0sQ0FBQ0UsY0FBUCxDQUFzQkwsR0FBdEIsQ0FBTjtBQUNIOztBQUNELFNBQU8sSUFBUDtBQUNIOztBQUVELFNBQVNNLFNBQVQsQ0FBbUJMLElBQW5CLEVBQXlCTSxNQUF6QixFQUFpQ0MsTUFBakMsRUFBeUM7QUFDckMsTUFBSU4sRUFBRSxHQUFHSCxzQkFBc0IsQ0FBQ1EsTUFBRCxFQUFTTixJQUFULENBQS9COztBQUNBRSxFQUFBQSxNQUFNLENBQUNNLGNBQVAsQ0FBc0JELE1BQXRCLEVBQThCUCxJQUE5QixFQUFvQ0MsRUFBcEM7QUFDSDtBQUVEOzs7Ozs7OztBQU1BLElBQUlRLEVBQUUsR0FBRztBQUVMOzs7Ozs7OztBQVFBQyxFQUFBQSxRQUFRLEVBQUUsa0JBQVNYLEdBQVQsRUFBYztBQUNwQixXQUFPLE9BQU9BLEdBQVAsS0FBZSxRQUFmLElBQTJCQSxHQUFHLFlBQVlZLE1BQWpEO0FBQ0gsR0FaSTs7QUFjTDs7Ozs7Ozs7QUFRQUMsRUFBQUEsUUFBUSxFQUFFLGtCQUFTYixHQUFULEVBQWM7QUFDcEIsV0FB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QSIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDA4LTIwMTAgUmljYXJkbyBRdWVzYWRhXG4gQ29weXJpZ2h0IChjKSAyMDExLTIwMTIgY29jb3MyZC14Lm9yZ1xuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgdGVtcENJREdlbmVyYXRlciA9IG5ldyAocmVxdWlyZSgnLi9pZC1nZW5lcmF0ZXInKSkoJ1RtcENJZC4nKTtcblxuXG5mdW5jdGlvbiBfZ2V0UHJvcGVydHlEZXNjcmlwdG9yIChvYmosIG5hbWUpIHtcbiAgICB3aGlsZSAob2JqKSB7XG4gICAgICAgIHZhciBwZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBuYW1lKTtcbiAgICAgICAgaWYgKHBkKSB7XG4gICAgICAgICAgICByZXR1cm4gcGQ7XG4gICAgICAgIH1cbiAgICAgICAgb2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBfY29weXByb3AobmFtZSwgc291cmNlLCB0YXJnZXQpIHtcbiAgICB2YXIgcGQgPSBfZ2V0UHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgbmFtZSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgbmFtZSwgcGQpO1xufVxuXG4vKipcbiAqICEjZW4gVGhpcyBtb2R1bGUgcHJvdmlkZXMgc29tZSBKYXZhU2NyaXB0IHV0aWxpdGllcy4gQWxsIG1lbWJlcnMgY2FuIGJlIGFjY2Vzc2VkIHdpdGggYGNjLmpzYC5cbiAqICEjemgg6L+Z5Liq5qih5Z2X5bCB6KOF5LqGIEphdmFTY3JpcHQg55u45YWz55qE5LiA5Lqb5a6e55So5Ye95pWw77yM5L2g5Y+v5Lul6YCa6L+HIGBjYy5qc2Ag5p2l6K6/6Zeu6L+Z5Liq5qih5Z2X44CCXG4gKiBAc3VibW9kdWxlIGpzXG4gKiBAbW9kdWxlIGpzXG4gKi9cbnZhciBqcyA9IHtcblxuICAgIC8qKlxuICAgICAqIENoZWNrIHRoZSBvYmogd2hldGhlciBpcyBudW1iZXIgb3Igbm90XG4gICAgICogSWYgYSBudW1iZXIgaXMgY3JlYXRlZCBieSB1c2luZyAnbmV3IE51bWJlcigxMDA4NiknLCB0aGUgdHlwZW9mIGl0IHdpbGwgYmUgXCJvYmplY3RcIi4uLlxuICAgICAqIFRoZW4geW91IGNhbiB1c2UgdGhpcyBmdW5jdGlvbiBpZiB5b3UgY2FyZSBhYm91dCB0aGlzIGNhc2UuXG4gICAgICogQG1ldGhvZCBpc051bWJlclxuICAgICAqIEBwYXJhbSB7Kn0gb2JqXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNOdW1iZXI6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgb2JqIGluc3RhbmNlb2YgTnVtYmVyO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB0aGUgb2JqIHdoZXRoZXIgaXMgc3RyaW5nIG9yIG5vdC5cbiAgICAgKiBJZiBhIHN0cmluZyBpcyBjcmVhdGVkIGJ5IHVzaW5nICduZXcgU3RyaW5nKFwiYmxhYmxhXCIpJywgdGhlIHR5cGVvZiBpdCB3aWxsIGJlIFwib2JqZWN0XCIuLi5cbiAgICAgKiBUaGVuIHlvdSBjYW4gdXNlIHRoaXMgZnVuY3Rpb24gaWYgeW91IGNhcmUgYWJvdXQgdGhpcyBjYXNlLlxuICAgICAqIEBtZXRob2QgaXNTdHJpbmdcbiAgICAgKiBAcGFyYW0geyp9IG9ialxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzU3RyaW5nOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8IG9iaiBpbnN0YW5jZW9mIFN0cmluZztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ29weSBhbGwgcHJvcGVydGllcyBub3QgZGVmaW5lZCBpbiBvYmogZnJvbSBhcmd1bWVudHNbMS4uLm5dXG4gICAgICogQG1ldGhvZCBhZGRvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogb2JqZWN0IHRvIGV4dGVuZCBpdHMgcHJvcGVydGllc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAuLi5zb3VyY2VPYmogc291cmNlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICAgICAqIEByZXR1cm4ge09iamVjdH0gdGhlIHJlc3VsdCBvYmpcbiAgICAgKi9cbiAgICBhZGRvbjogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAndXNlIHN0cmljdCc7XG4gICAgICAgIG9iaiA9IG9iaiB8fCB7fTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDEsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3JJRCg1NDAyLCBzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICggdmFyIG5hbWUgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggIShuYW1lIGluIG9iaikgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfY29weXByb3AoIG5hbWUsIHNvdXJjZSwgb2JqKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjb3B5IGFsbCBwcm9wZXJ0aWVzIGZyb20gYXJndW1lbnRzWzEuLi5uXSB0byBvYmpcbiAgICAgKiBAbWV0aG9kIG1peGluXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAuLi5zb3VyY2VPYmpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSByZXN1bHQgb2JqXG4gICAgICovXG4gICAgbWl4aW46IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgICBvYmogPSBvYmogfHwge307XG4gICAgICAgIGZvciAodmFyIGkgPSAxLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoNTQwMywgc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoIHZhciBuYW1lIGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBfY29weXByb3AoIG5hbWUsIHNvdXJjZSwgb2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGVyaXZlIHRoZSBjbGFzcyBmcm9tIHRoZSBzdXBwbGllZCBiYXNlIGNsYXNzLlxuICAgICAqIEJvdGggY2xhc3NlcyBhcmUganVzdCBuYXRpdmUgamF2YXNjcmlwdCBjb25zdHJ1Y3RvcnMsIG5vdCBjcmVhdGVkIGJ5IGNjLkNsYXNzLCBzb1xuICAgICAqIHVzdWFsbHkgeW91IHdpbGwgd2FudCB0byBpbmhlcml0IHVzaW5nIHt7I2Nyb3NzTGluayBcImNjL0NsYXNzOm1ldGhvZFwifX1jYy5DbGFzcyB7ey9jcm9zc0xpbmt9fSBpbnN0ZWFkLlxuICAgICAqIEBtZXRob2QgZXh0ZW5kXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2xzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYmFzZSAtIHRoZSBiYXNlY2xhc3MgdG8gaW5oZXJpdFxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSB0aGUgcmVzdWx0IGNsYXNzXG4gICAgICovXG4gICAgZXh0ZW5kOiBmdW5jdGlvbiAoY2xzLCBiYXNlKSB7XG4gICAgICAgIGlmIChDQ19ERVYpIHtcbiAgICAgICAgICAgIGlmICghYmFzZSkge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoNTQwNCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjbHMpIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDU0MDUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhjbHMucHJvdG90eXBlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3JJRCg1NDA2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBwIGluIGJhc2UpIGlmIChiYXNlLmhhc093blByb3BlcnR5KHApKSBjbHNbcF0gPSBiYXNlW3BdO1xuICAgICAgICBjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShiYXNlLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogY2xzLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNscztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHN1cGVyIGNsYXNzXG4gICAgICogQG1ldGhvZCBnZXRTdXBlclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGN0b3IgLSB0aGUgY29uc3RydWN0b3Igb2Ygc3ViY2xhc3NcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICAgKi9cbiAgICBnZXRTdXBlciAoY3Rvcikge1xuICAgICAgICB2YXIgcHJvdG8gPSBjdG9yLnByb3RvdHlwZTsgLy8gYmluZGVkIGZ1bmN0aW9uIGRvIG5vdCBoYXZlIHByb3RvdHlwZVxuICAgICAgICB2YXIgZHVuZGVyUHJvdG8gPSBwcm90byAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICAgICAgICByZXR1cm4gZHVuZGVyUHJvdG8gJiYgZHVuZGVyUHJvdG8uY29uc3RydWN0b3I7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHN1YmNsYXNzIGlzIGNoaWxkIG9mIHN1cGVyY2xhc3Mgb3IgZXF1YWxzIHRvIHN1cGVyY2xhc3NcbiAgICAgKlxuICAgICAqIEBtZXRob2QgaXNDaGlsZENsYXNzT2ZcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdWJjbGFzc1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHN1cGVyY2xhc3NcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzQ2hpbGRDbGFzc09mIChzdWJjbGFzcywgc3VwZXJjbGFzcykge1xuICAgICAgICBpZiAoc3ViY2xhc3MgJiYgc3VwZXJjbGFzcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdWJjbGFzcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3VwZXJjbGFzcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGlmIChDQ19ERVYpIHtcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybklEKDM2MjUsIHN1cGVyY2xhc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3ViY2xhc3MgPT09IHN1cGVyY2xhc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoOzspIHtcbiAgICAgICAgICAgICAgICBzdWJjbGFzcyA9IGpzLmdldFN1cGVyKHN1YmNsYXNzKTtcbiAgICAgICAgICAgICAgICBpZiAoIXN1YmNsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN1YmNsYXNzID09PSBzdXBlcmNsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIGVudW1lcmFibGUgcHJvcGVydGllcyBmcm9tIG9iamVjdFxuICAgICAqIEBtZXRob2QgY2xlYXJcbiAgICAgKiBAcGFyYW0ge2FueX0gb2JqXG4gICAgICovXG4gICAgY2xlYXI6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmpba2V5c1tpXV07XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgb2JqIGlzIGFuIGVtcHR5IG9iamVjdFxuICAgICAqIEBtZXRob2QgaXNFbXB0eU9iamVjdFxuICAgICAqIEBwYXJhbSB7YW55fSBvYmogXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNFbXB0eU9iamVjdDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBwcm9wZXJ0eSBkZXNjcmlwdG9yIGluIG9iamVjdCBhbmQgYWxsIGl0cyBhbmNlc3RvcnNcbiAgICAgKiBAbWV0aG9kIGdldFByb3BlcnR5RGVzY3JpcHRvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0eURlc2NyaXB0b3I6IF9nZXRQcm9wZXJ0eURlc2NyaXB0b3Jcbn07XG5cblxudmFyIHRtcFZhbHVlRGVzYyA9IHtcbiAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbn07XG5cbi8qKlxuICogRGVmaW5lIHZhbHVlLCBqdXN0IGhlbHAgdG8gY2FsbCBPYmplY3QuZGVmaW5lUHJvcGVydHkuPGJyPlxuICogVGhlIGNvbmZpZ3VyYWJsZSB3aWxsIGJlIHRydWUuXG4gKiBAbWV0aG9kIHZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcFxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFt3cml0YWJsZT1mYWxzZV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2VudW1lcmFibGU9ZmFsc2VdXG4gKi9cbmpzLnZhbHVlID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgdmFsdWUsIHdyaXRhYmxlLCBlbnVtZXJhYmxlKSB7XG4gICAgdG1wVmFsdWVEZXNjLnZhbHVlID0gdmFsdWU7XG4gICAgdG1wVmFsdWVEZXNjLndyaXRhYmxlID0gd3JpdGFibGU7XG4gICAgdG1wVmFsdWVEZXNjLmVudW1lcmFibGUgPSBlbnVtZXJhYmxlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIHRtcFZhbHVlRGVzYyk7XG4gICAgdG1wVmFsdWVEZXNjLnZhbHVlID0gdW5kZWZpbmVkO1xufTtcblxudmFyIHRtcEdldFNldERlc2MgPSB7XG4gICAgZ2V0OiBudWxsLFxuICAgIHNldDogbnVsbCxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbn07XG5cbi8qKlxuICogRGVmaW5lIGdldCBzZXQgYWNjZXNzb3IsIGp1c3QgaGVscCB0byBjYWxsIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSguLi4pXG4gKiBAbWV0aG9kIGdldHNldFxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGdldHRlclxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3NldHRlcj1udWxsXVxuICogQHBhcmFtIHtCb29sZWFufSBbZW51bWVyYWJsZT1mYWxzZV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2NvbmZpZ3VyYWJsZT1mYWxzZV1cbiAqL1xuanMuZ2V0c2V0ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgZ2V0dGVyLCBzZXR0ZXIsIGVudW1lcmFibGUsIGNvbmZpZ3VyYWJsZSkge1xuICAgIGlmICh0eXBlb2Ygc2V0dGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVudW1lcmFibGUgPSBzZXR0ZXI7XG4gICAgICAgIHNldHRlciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdG1wR2V0U2V0RGVzYy5nZXQgPSBnZXR0ZXI7XG4gICAgdG1wR2V0U2V0RGVzYy5zZXQgPSBzZXR0ZXI7XG4gICAgdG1wR2V0U2V0RGVzYy5lbnVtZXJhYmxlID0gZW51bWVyYWJsZTtcbiAgICB0bXBHZXRTZXREZXNjLmNvbmZpZ3VyYWJsZSA9IGNvbmZpZ3VyYWJsZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCB0bXBHZXRTZXREZXNjKTtcbiAgICB0bXBHZXRTZXREZXNjLmdldCA9IG51bGw7XG4gICAgdG1wR2V0U2V0RGVzYy5zZXQgPSBudWxsO1xufTtcblxudmFyIHRtcEdldERlc2MgPSB7XG4gICAgZ2V0OiBudWxsLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogZmFsc2Vcbn07XG5cbi8qKlxuICogRGVmaW5lIGdldCBhY2Nlc3NvciwganVzdCBoZWxwIHRvIGNhbGwgT2JqZWN0LmRlZmluZVByb3BlcnR5KC4uLilcbiAqIEBtZXRob2QgZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZ2V0dGVyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtlbnVtZXJhYmxlPWZhbHNlXVxuICogQHBhcmFtIHtCb29sZWFufSBbY29uZmlndXJhYmxlPWZhbHNlXVxuICovXG5qcy5nZXQgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCBnZXR0ZXIsIGVudW1lcmFibGUsIGNvbmZpZ3VyYWJsZSkge1xuICAgIHRtcEdldERlc2MuZ2V0ID0gZ2V0dGVyO1xuICAgIHRtcEdldERlc2MuZW51bWVyYWJsZSA9IGVudW1lcmFibGU7XG4gICAgdG1wR2V0RGVzYy5jb25maWd1cmFibGUgPSBjb25maWd1cmFibGU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgdG1wR2V0RGVzYyk7XG4gICAgdG1wR2V0RGVzYy5nZXQgPSBudWxsO1xufTtcblxudmFyIHRtcFNldERlc2MgPSB7XG4gICAgc2V0OiBudWxsLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogZmFsc2Vcbn07XG5cbi8qKlxuICogRGVmaW5lIHNldCBhY2Nlc3NvciwganVzdCBoZWxwIHRvIGNhbGwgT2JqZWN0LmRlZmluZVByb3BlcnR5KC4uLilcbiAqIEBtZXRob2Qgc2V0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcFxuICogQHBhcmFtIHtGdW5jdGlvbn0gc2V0dGVyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtlbnVtZXJhYmxlPWZhbHNlXVxuICogQHBhcmFtIHtCb29sZWFufSBbY29uZmlndXJhYmxlPWZhbHNlXVxuICovXG5qcy5zZXQgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCBzZXR0ZXIsIGVudW1lcmFibGUsIGNvbmZpZ3VyYWJsZSkge1xuICAgIHRtcFNldERlc2Muc2V0ID0gc2V0dGVyO1xuICAgIHRtcFNldERlc2MuZW51bWVyYWJsZSA9IGVudW1lcmFibGU7XG4gICAgdG1wU2V0RGVzYy5jb25maWd1cmFibGUgPSBjb25maWd1cmFibGU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgdG1wU2V0RGVzYyk7XG4gICAgdG1wU2V0RGVzYy5zZXQgPSBudWxsO1xufTtcblxuLyoqXG4gKiBHZXQgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBvYmplY3QgaXMganVzdCBhIHt9IChhbmQgd2hpY2ggY2xhc3MgbmFtZWQgJ09iamVjdCcpLCBpdCB3aWxsIHJldHVybiBcIlwiLlxuICogKG1vZGlmaWVkIGZyb20gPGEgaHJlZj1cImh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTI0OTUzMS9ob3ctdG8tZ2V0LWEtamF2YXNjcmlwdC1vYmplY3RzLWNsYXNzXCI+dGhlIGNvZGUgZnJvbSB0aGlzIHN0YWNrb3ZlcmZsb3cgcG9zdDwvYT4pXG4gKiBAbWV0aG9kIGdldENsYXNzTmFtZVxuICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IG9iak9yQ3RvciAtIGluc3RhbmNlIG9yIGNvbnN0cnVjdG9yXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmpzLmdldENsYXNzTmFtZSA9IGZ1bmN0aW9uIChvYmpPckN0b3IpIHtcbiAgICBpZiAodHlwZW9mIG9iak9yQ3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YXIgcHJvdG90eXBlID0gb2JqT3JDdG9yLnByb3RvdHlwZTtcbiAgICAgICAgaWYgKHByb3RvdHlwZSAmJiBwcm90b3R5cGUuaGFzT3duUHJvcGVydHkoJ19fY2xhc3NuYW1lX18nKSAmJiBwcm90b3R5cGUuX19jbGFzc25hbWVfXykge1xuICAgICAgICAgICAgcmV0dXJuIHByb3RvdHlwZS5fX2NsYXNzbmFtZV9fO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXR2YWwgPSAnJztcbiAgICAgICAgLy8gIGZvciBicm93c2VycyB3aGljaCBoYXZlIG5hbWUgcHJvcGVydHkgaW4gdGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBvYmplY3QsIHN1Y2ggYXMgY2hyb21lXG4gICAgICAgIGlmIChvYmpPckN0b3IubmFtZSkge1xuICAgICAgICAgICAgcmV0dmFsID0gb2JqT3JDdG9yLm5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iak9yQ3Rvci50b1N0cmluZykge1xuICAgICAgICAgICAgdmFyIGFyciwgc3RyID0gb2JqT3JDdG9yLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoc3RyLmNoYXJBdCgwKSA9PT0gJ1snKSB7XG4gICAgICAgICAgICAgICAgLy8gc3RyIGlzIFwiW29iamVjdCBvYmplY3RDbGFzc11cIlxuICAgICAgICAgICAgICAgIGFyciA9IHN0ci5tYXRjaCgvXFxbXFx3K1xccyooXFx3KylcXF0vKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHN0ciBpcyBmdW5jdGlvbiBvYmplY3RDbGFzcyAoKSB7fSBmb3IgSUUgRmlyZWZveFxuICAgICAgICAgICAgICAgIGFyciA9IHN0ci5tYXRjaCgvZnVuY3Rpb25cXHMqKFxcdyspLyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXJyICYmIGFyci5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICByZXR2YWwgPSBhcnJbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHZhbCAhPT0gJ09iamVjdCcgPyByZXR2YWwgOiAnJztcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqT3JDdG9yICYmIG9iak9yQ3Rvci5jb25zdHJ1Y3Rvcikge1xuICAgICAgICByZXR1cm4ganMuZ2V0Q2xhc3NOYW1lKG9iak9yQ3Rvci5jb25zdHJ1Y3Rvcik7XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG5cbmZ1bmN0aW9uIGlzVGVtcENsYXNzSWQgKGlkKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBpZCAhPT0gJ3N0cmluZycgfHwgaWQuc3RhcnRzV2l0aCh0ZW1wQ0lER2VuZXJhdGVyLnByZWZpeCk7XG59XG5cbi8vIGlkIOazqOWGjFxuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX2lkVG9DbGFzcyA9IHt9O1xuICAgIHZhciBfbmFtZVRvQ2xhc3MgPSB7fTtcblxuICAgIGZ1bmN0aW9uIHNldHVwIChrZXksIHB1YmxpY05hbWUsIHRhYmxlKSB7XG4gICAgICAgIGpzLmdldHNldChqcywgcHVibGljTmFtZSxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGFibGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGpzLmNsZWFyKHRhYmxlKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRhYmxlLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoaWQsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAvLyBkZXJlZ2lzdGVyIG9sZFxuICAgICAgICAgICAgaWYgKGNvbnN0cnVjdG9yLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRhYmxlW2NvbnN0cnVjdG9yLnByb3RvdHlwZVtrZXldXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGpzLnZhbHVlKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwga2V5LCBpZCk7XG4gICAgICAgICAgICAvLyByZWdpc3RlciBjbGFzc1xuICAgICAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ2lzdGVyZWQgPSB0YWJsZVtpZF07XG4gICAgICAgICAgICAgICAgaWYgKHJlZ2lzdGVyZWQgJiYgcmVnaXN0ZXJlZCAhPT0gY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gJ0EgQ2xhc3MgYWxyZWFkeSBleGlzdHMgd2l0aCB0aGUgc2FtZSAnICsga2V5ICsgJyA6IFwiJyArIGlkICsgJ1wiLic7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19URVNUKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciArPSAnIChUaGlzIG1heSBiZSBjYXVzZWQgYnkgZXJyb3Igb2YgdW5pdCB0ZXN0LikgXFxcbklmIHlvdSBkb250IG5lZWQgc2VyaWFsaXphdGlvbiwgeW91IGNhbiBzZXQgY2xhc3MgaWQgdG8gXCJcIi4gWW91IGNhbiBhbHNvIGNhbGwgXFxcbmNjLmpzLnVucmVnaXN0ZXJDbGFzcyB0byByZW1vdmUgdGhlIGlkIG9mIHVudXNlZCBjbGFzcyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFibGVbaWRdID0gY29uc3RydWN0b3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vaWYgKGlkID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgY29uc29sZS50cmFjZShcIlwiLCB0YWJsZSA9PT0gX25hbWVUb0NsYXNzKTtcbiAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciB0aGUgY2xhc3MgYnkgc3BlY2lmaWVkIGlkLCBpZiBpdHMgY2xhc3NuYW1lIGlzIG5vdCBkZWZpbmVkLCB0aGUgY2xhc3MgbmFtZSB3aWxsIGFsc28gYmUgc2V0LlxuICAgICAqIEBtZXRob2QgX3NldENsYXNzSWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NJZFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICAvKipcbiAgICAgKiAhI2VuIEFsbCBjbGFzc2VzIHJlZ2lzdGVyZWQgaW4gdGhlIGVuZ2luZSwgaW5kZXhlZCBieSBJRC5cbiAgICAgKiAhI3poIOW8leaTjuS4reW3suazqOWGjOeahOaJgOacieexu+Wei++8jOmAmui/hyBJRCDov5vooYzntKLlvJXjgIJcbiAgICAgKiBAcHJvcGVydHkgX3JlZ2lzdGVyZWRDbGFzc0lkc1xuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gc2F2ZSBhbGwgcmVnaXN0ZXJlZCBjbGFzc2VzIGJlZm9yZSBsb2FkaW5nIHNjcmlwdHNcbiAgICAgKiBsZXQgYnVpbHRpbkNsYXNzSWRzID0gY2MuanMuX3JlZ2lzdGVyZWRDbGFzc0lkcztcbiAgICAgKiBsZXQgYnVpbHRpbkNsYXNzTmFtZXMgPSBjYy5qcy5fcmVnaXN0ZXJlZENsYXNzTmFtZXM7XG4gICAgICogLy8gbG9hZCBzb21lIHNjcmlwdHMgdGhhdCBjb250YWluIENDQ2xhc3NcbiAgICAgKiAuLi5cbiAgICAgKiAvLyBjbGVhciBhbGwgbG9hZGVkIGNsYXNzZXNcbiAgICAgKiBjYy5qcy5fcmVnaXN0ZXJlZENsYXNzSWRzID0gYnVpbHRpbkNsYXNzSWRzO1xuICAgICAqIGNjLmpzLl9yZWdpc3RlcmVkQ2xhc3NOYW1lcyA9IGJ1aWx0aW5DbGFzc05hbWVzO1xuICAgICAqL1xuICAgIGpzLl9zZXRDbGFzc0lkID0gc2V0dXAoJ19fY2lkX18nLCAnX3JlZ2lzdGVyZWRDbGFzc0lkcycsIF9pZFRvQ2xhc3MpO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBBbGwgY2xhc3NlcyByZWdpc3RlcmVkIGluIHRoZSBlbmdpbmUsIGluZGV4ZWQgYnkgbmFtZS5cbiAgICAgKiAhI3poIOW8leaTjuS4reW3suazqOWGjOeahOaJgOacieexu+Wei++8jOmAmui/h+WQjeensOi/m+ihjOe0ouW8leOAglxuICAgICAqIEBwcm9wZXJ0eSBfcmVnaXN0ZXJlZENsYXNzTmFtZXNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIHNhdmUgYWxsIHJlZ2lzdGVyZWQgY2xhc3NlcyBiZWZvcmUgbG9hZGluZyBzY3JpcHRzXG4gICAgICogbGV0IGJ1aWx0aW5DbGFzc0lkcyA9IGNjLmpzLl9yZWdpc3RlcmVkQ2xhc3NJZHM7XG4gICAgICogbGV0IGJ1aWx0aW5DbGFzc05hbWVzID0gY2MuanMuX3JlZ2lzdGVyZWRDbGFzc05hbWVzO1xuICAgICAqIC8vIGxvYWQgc29tZSBzY3JpcHRzIHRoYXQgY29udGFpbiBDQ0NsYXNzXG4gICAgICogLi4uXG4gICAgICogLy8gY2xlYXIgYWxsIGxvYWRlZCBjbGFzc2VzXG4gICAgICogY2MuanMuX3JlZ2lzdGVyZWRDbGFzc0lkcyA9IGJ1aWx0aW5DbGFzc0lkcztcbiAgICAgKiBjYy5qcy5fcmVnaXN0ZXJlZENsYXNzTmFtZXMgPSBidWlsdGluQ2xhc3NOYW1lcztcbiAgICAgKi9cbiAgICB2YXIgZG9TZXRDbGFzc05hbWUgPSBzZXR1cCgnX19jbGFzc25hbWVfXycsICdfcmVnaXN0ZXJlZENsYXNzTmFtZXMnLCBfbmFtZVRvQ2xhc3MpO1xuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgdGhlIGNsYXNzIGJ5IHNwZWNpZmllZCBuYW1lIG1hbnVhbGx5XG4gICAgICogQG1ldGhvZCBzZXRDbGFzc05hbWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBqcy5zZXRDbGFzc05hbWUgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICBkb1NldENsYXNzTmFtZShjbGFzc05hbWUsIGNvbnN0cnVjdG9yKTtcbiAgICAgICAgLy8gYXV0byBzZXQgY2xhc3MgaWRcbiAgICAgICAgaWYgKCFjb25zdHJ1Y3Rvci5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoJ19fY2lkX18nKSkge1xuICAgICAgICAgICAgdmFyIGlkID0gY2xhc3NOYW1lIHx8IHRlbXBDSURHZW5lcmF0ZXIuZ2V0TmV3SWQoKTtcbiAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgIGpzLl9zZXRDbGFzc0lkKGlkLCBjb25zdHJ1Y3Rvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVW5yZWdpc3RlciBhIGNsYXNzIGZyb20gZmlyZWJhbGwuXG4gICAgICpcbiAgICAgKiBJZiB5b3UgZG9udCBuZWVkIGEgcmVnaXN0ZXJlZCBjbGFzcyBhbnltb3JlLCB5b3Ugc2hvdWxkIHVucmVnaXN0ZXIgdGhlIGNsYXNzIHNvIHRoYXQgRmlyZWJhbGwgd2lsbCBub3Qga2VlcCBpdHMgcmVmZXJlbmNlIGFueW1vcmUuXG4gICAgICogUGxlYXNlIG5vdGUgdGhhdCBpdHMgc3RpbGwgeW91ciByZXNwb25zaWJpbGl0eSB0byBmcmVlIG90aGVyIHJlZmVyZW5jZXMgdG8gdGhlIGNsYXNzLlxuICAgICAqXG4gICAgICogQG1ldGhvZCB1bnJlZ2lzdGVyQ2xhc3NcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSAuLi5jb25zdHJ1Y3RvciAtIHRoZSBjbGFzcyB5b3Ugd2lsbCB3YW50IHRvIHVucmVnaXN0ZXIsIGFueSBudW1iZXIgb2YgY2xhc3NlcyBjYW4gYmUgYWRkZWRcbiAgICAgKi9cbiAgICBqcy51bnJlZ2lzdGVyQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcCA9IGFyZ3VtZW50c1tpXS5wcm90b3R5cGU7XG4gICAgICAgICAgICB2YXIgY2xhc3NJZCA9IHAuX19jaWRfXztcbiAgICAgICAgICAgIGlmIChjbGFzc0lkKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIF9pZFRvQ2xhc3NbY2xhc3NJZF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2xhc3NuYW1lID0gcC5fX2NsYXNzbmFtZV9fO1xuICAgICAgICAgICAgaWYgKGNsYXNzbmFtZSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBfbmFtZVRvQ2xhc3NbY2xhc3NuYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJlZ2lzdGVyZWQgY2xhc3MgYnkgaWRcbiAgICAgKiBAbWV0aG9kIF9nZXRDbGFzc0J5SWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NJZFxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAganMuX2dldENsYXNzQnlJZCA9IGZ1bmN0aW9uIChjbGFzc0lkKSB7XG4gICAgICAgIHJldHVybiBfaWRUb0NsYXNzW2NsYXNzSWRdO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJlZ2lzdGVyZWQgY2xhc3MgYnkgbmFtZVxuICAgICAqIEBtZXRob2QgZ2V0Q2xhc3NCeU5hbWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NuYW1lXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAganMuZ2V0Q2xhc3NCeU5hbWUgPSBmdW5jdGlvbiAoY2xhc3NuYW1lKSB7XG4gICAgICAgIHJldHVybiBfbmFtZVRvQ2xhc3NbY2xhc3NuYW1lXTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0IGNsYXNzIGlkIG9mIHRoZSBvYmplY3RcbiAgICAgKiBAbWV0aG9kIF9nZXRDbGFzc0lkXG4gICAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IG9iaiAtIGluc3RhbmNlIG9yIGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbYWxsb3dUZW1wSWQ9dHJ1ZV0gLSBjYW4gcmV0dXJuIHRlbXAgaWQgaW4gZWRpdG9yXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAganMuX2dldENsYXNzSWQgPSBmdW5jdGlvbiAob2JqLCBhbGxvd1RlbXBJZCkge1xuICAgICAgICBhbGxvd1RlbXBJZCA9ICh0eXBlb2YgYWxsb3dUZW1wSWQgIT09ICd1bmRlZmluZWQnID8gYWxsb3dUZW1wSWQ6IHRydWUpO1xuXG4gICAgICAgIHZhciByZXM7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nICYmIG9iai5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoJ19fY2lkX18nKSkge1xuICAgICAgICAgICAgcmVzID0gb2JqLnByb3RvdHlwZS5fX2NpZF9fO1xuICAgICAgICAgICAgaWYgKCFhbGxvd1RlbXBJZCAmJiAoQ0NfREVWIHx8IENDX0VESVRPUikgJiYgaXNUZW1wQ2xhc3NJZChyZXMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqICYmIG9iai5jb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgdmFyIHByb3RvdHlwZSA9IG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gICAgICAgICAgICBpZiAocHJvdG90eXBlICYmIHByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgnX19jaWRfXycpKSB7XG4gICAgICAgICAgICAgICAgcmVzID0gb2JqLl9fY2lkX187XG4gICAgICAgICAgICAgICAgaWYgKCFhbGxvd1RlbXBJZCAmJiAoQ0NfREVWIHx8IENDX0VESVRPUikgJiYgaXNUZW1wQ2xhc3NJZChyZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfTtcbn0pKCk7XG5cbi8qKlxuICogRGVmaW5lcyBhIHBvbHlmaWxsIGZpZWxkIGZvciBkZXByZWNhdGVkIGNvZGVzLlxuICogQG1ldGhvZCBvYnNvbGV0ZVxuICogQHBhcmFtIHthbnl9IG9iaiAtIFlvdXJPYmplY3Qgb3IgWW91ckNsYXNzLnByb3RvdHlwZVxuICogQHBhcmFtIHtTdHJpbmd9IG9ic29sZXRlZCAtIFwiT2xkUGFyYW1cIiBvciBcIllvdXJDbGFzcy5PbGRQYXJhbVwiXG4gKiBAcGFyYW0ge1N0cmluZ30gbmV3RXhwciAtIFwiTmV3UGFyYW1cIiBvciBcIllvdXJDbGFzcy5OZXdQYXJhbVwiXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFt3cml0YWJsZT1mYWxzZV1cbiAqL1xuanMub2Jzb2xldGUgPSBmdW5jdGlvbiAob2JqLCBvYnNvbGV0ZWQsIG5ld0V4cHIsIHdyaXRhYmxlKSB7XG4gICAgdmFyIGV4dHJhY3RQcm9wTmFtZSA9IC8oW14uXSspJC87XG4gICAgdmFyIG9sZFByb3AgPSBleHRyYWN0UHJvcE5hbWUuZXhlYyhvYnNvbGV0ZWQpWzBdO1xuICAgIHZhciBuZXdQcm9wID0gZXh0cmFjdFByb3BOYW1lLmV4ZWMobmV3RXhwcilbMF07XG4gICAgZnVuY3Rpb24gZ2V0ICgpIHtcbiAgICAgICAgaWYgKENDX0RFVikge1xuICAgICAgICAgICAgY2Mud2FybklEKDE0MDAsIG9ic29sZXRlZCwgbmV3RXhwcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNbbmV3UHJvcF07XG4gICAgfVxuICAgIGlmICh3cml0YWJsZSkge1xuICAgICAgICBqcy5nZXRzZXQob2JqLCBvbGRQcm9wLFxuICAgICAgICAgICAgZ2V0LFxuICAgICAgICAgICAgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFVikge1xuICAgICAgICAgICAgICAgICAgICBjYy53YXJuSUQoMTQwMCwgb2Jzb2xldGVkLCBuZXdFeHByKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpc1tuZXdQcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAganMuZ2V0KG9iaiwgb2xkUHJvcCwgZ2V0KTtcbiAgICB9XG59O1xuXG4vKipcbiAqIERlZmluZXMgYWxsIHBvbHlmaWxsIGZpZWxkcyBmb3Igb2Jzb2xldGVkIGNvZGVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBwcm9wcy5cbiAqIEBtZXRob2Qgb2Jzb2xldGVzXG4gKiBAcGFyYW0ge2FueX0gb2JqIC0gWW91ck9iamVjdCBvciBZb3VyQ2xhc3MucHJvdG90eXBlXG4gKiBAcGFyYW0ge2FueX0gb2JqTmFtZSAtIFwiWW91ck9iamVjdFwiIG9yIFwiWW91ckNsYXNzXCJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xuICogQHBhcmFtIHtCb29sZWFufSBbd3JpdGFibGU9ZmFsc2VdXG4gKi9cbmpzLm9ic29sZXRlcyA9IGZ1bmN0aW9uIChvYmosIG9iak5hbWUsIHByb3BzLCB3cml0YWJsZSkge1xuICAgIGZvciAodmFyIG9ic29sZXRlZCBpbiBwcm9wcykge1xuICAgICAgICB2YXIgbmV3TmFtZSA9IHByb3BzW29ic29sZXRlZF07XG4gICAgICAgIGpzLm9ic29sZXRlKG9iaiwgb2JqTmFtZSArICcuJyArIG9ic29sZXRlZCwgbmV3TmFtZSwgd3JpdGFibGUpO1xuICAgIH1cbn07XG5cbnZhciBSRUdFWFBfTlVNX09SX1NUUiA9IC8oJWQpfCglcykvO1xudmFyIFJFR0VYUF9TVFIgPSAvJXMvO1xuXG4vKipcbiAqIEEgc3RyaW5nIHRvb2wgdG8gY29uc3RydWN0IGEgc3RyaW5nIHdpdGggZm9ybWF0IHN0cmluZy5cbiAqIEBtZXRob2QgZm9ybWF0U3RyXG4gKiBAcGFyYW0ge1N0cmluZ3xhbnl9IG1zZyAtIEEgSmF2YVNjcmlwdCBzdHJpbmcgY29udGFpbmluZyB6ZXJvIG9yIG1vcmUgc3Vic3RpdHV0aW9uIHN0cmluZ3MgKCVzKS5cbiAqIEBwYXJhbSB7YW55fSAuLi5zdWJzdCAtIEphdmFTY3JpcHQgb2JqZWN0cyB3aXRoIHdoaWNoIHRvIHJlcGxhY2Ugc3Vic3RpdHV0aW9uIHN0cmluZ3Mgd2l0aGluIG1zZy4gVGhpcyBnaXZlcyB5b3UgYWRkaXRpb25hbCBjb250cm9sIG92ZXIgdGhlIGZvcm1hdCBvZiB0aGUgb3V0cHV0LlxuICogQHJldHVybnMge1N0cmluZ31cbiAqIEBleGFtcGxlXG4gKiBjYy5qcy5mb3JtYXRTdHIoXCJhOiAlcywgYjogJXNcIiwgYSwgYik7XG4gKiBjYy5qcy5mb3JtYXRTdHIoYSwgYiwgYyk7XG4gKi9cbmpzLmZvcm1hdFN0ciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJnTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBpZiAoYXJnTGVuID09PSAwKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIG1zZyA9IGFyZ3VtZW50c1swXTtcbiAgICBpZiAoYXJnTGVuID09PSAxKSB7XG4gICAgICAgIHJldHVybiAnJyArIG1zZztcbiAgICB9XG5cbiAgICB2YXIgaGFzU3Vic3RpdHV0aW9uID0gdHlwZW9mIG1zZyA9PT0gJ3N0cmluZycgJiYgUkVHRVhQX05VTV9PUl9TVFIudGVzdChtc2cpO1xuICAgIGlmIChoYXNTdWJzdGl0dXRpb24pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcmdMZW47ICsraSkge1xuICAgICAgICAgICAgdmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIHZhciByZWdFeHBUb1Rlc3QgPSB0eXBlb2YgYXJnID09PSAnbnVtYmVyJyA/IFJFR0VYUF9OVU1fT1JfU1RSIDogUkVHRVhQX1NUUjtcbiAgICAgICAgICAgIGlmIChyZWdFeHBUb1Rlc3QudGVzdChtc2cpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm90UmVwbGFjZUZ1bmN0aW9uID0gJycgKyBhcmc7XG4gICAgICAgICAgICAgICAgbXNnID0gbXNnLnJlcGxhY2UocmVnRXhwVG9UZXN0LCBub3RSZXBsYWNlRnVuY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIG1zZyArPSAnICcgKyBhcmc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYXJnTGVuOyArK2kpIHtcbiAgICAgICAgICAgIG1zZyArPSAnICcgKyBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1zZztcbn07XG5cbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vcGV0a2FhbnRvbm92L2JsdWViaXJkL2lzc3Vlcy8xMzg5XG5qcy5zaGlmdEFyZ3VtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkobGVuKTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgfVxuICAgIHJldHVybiBhcmdzO1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBBIHNpbXBsZSB3cmFwcGVyIG9mIGBPYmplY3QuY3JlYXRlKG51bGwpYCB3aGljaCBlbnN1cmVzIHRoZSByZXR1cm4gb2JqZWN0IGhhdmUgbm8gcHJvdG90eXBlIChhbmQgdGh1cyBubyBpbmhlcml0ZWQgbWVtYmVycykuIFNvIHdlIGNhbiBza2lwIGBoYXNPd25Qcm9wZXJ0eWAgY2FsbHMgb24gcHJvcGVydHkgbG9va3Vwcy4gSXQgaXMgYSB3b3J0aHdoaWxlIG9wdGltaXphdGlvbiB0aGFuIHRoZSBge31gIGxpdGVyYWwgd2hlbiBgaGFzT3duUHJvcGVydHlgIGNhbGxzIGFyZSBuZWNlc3NhcnkuXG4gKiAhI3poXG4gKiDor6Xmlrnms5XmmK/lr7kgYE9iamVjdC5jcmVhdGUobnVsbClgIOeahOeugOWNleWwgeijheOAgmBPYmplY3QuY3JlYXRlKG51bGwpYCDnlKjkuo7liJvlu7rml6AgcHJvdG90eXBlIO+8iOS5n+WwseaXoOe7p+aJv++8ieeahOepuuWvueixoeOAgui/meagt+aIkeS7rOWcqOivpeWvueixoeS4iuafpeaJvuWxnuaAp+aXtu+8jOWwseS4jeeUqOi/m+ihjCBgaGFzT3duUHJvcGVydHlgIOWIpOaWreOAguWcqOmcgOimgemikee5geWIpOaWrSBgaGFzT3duUHJvcGVydHlgIOaXtu+8jOS9v+eUqOi/meS4quaWueazleaAp+iDveS8muavlCBge31gIOabtOmrmOOAglxuICpcbiAqIEBtZXRob2QgY3JlYXRlTWFwXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtmb3JjZURpY3RNb2RlPWZhbHNlXSAtIEFwcGx5IHRoZSBkZWxldGUgb3BlcmF0b3IgdG8gbmV3bHkgY3JlYXRlZCBtYXAgb2JqZWN0LiBUaGlzIGNhdXNlcyBWOCB0byBwdXQgdGhlIG9iamVjdCBpbiBcImRpY3Rpb25hcnkgbW9kZVwiIGFuZCBkaXNhYmxlcyBjcmVhdGlvbiBvZiBoaWRkZW4gY2xhc3NlcyB3aGljaCBhcmUgdmVyeSBleHBlbnNpdmUgZm9yIG9iamVjdHMgdGhhdCBhcmUgY29uc3RhbnRseSBjaGFuZ2luZyBzaGFwZS5cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuanMuY3JlYXRlTWFwID0gZnVuY3Rpb24gKGZvcmNlRGljdE1vZGUpIHtcbiAgICB2YXIgbWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBpZiAoZm9yY2VEaWN0TW9kZSkge1xuICAgICAgICBjb25zdCBJTlZBTElEX0lERU5USUZJRVJfMSA9ICcuJztcbiAgICAgICAgY29uc3QgSU5WQUxJRF9JREVOVElGSUVSXzIgPSAnLyc7XG4gICAgICAgIG1hcFtJTlZBTElEX0lERU5USUZJRVJfMV0gPSB0cnVlO1xuICAgICAgICBtYXBbSU5WQUxJRF9JREVOVElGSUVSXzJdID0gdHJ1ZTtcbiAgICAgICAgZGVsZXRlIG1hcFtJTlZBTElEX0lERU5USUZJRVJfMV07XG4gICAgICAgIGRlbGV0ZSBtYXBbSU5WQUxJRF9JREVOVElGSUVSXzJdO1xuICAgIH1cbiAgICByZXR1cm4gbWFwO1xufTtcblxuLyoqXG4gKiBAY2xhc3MgYXJyYXlcbiAqIEBzdGF0aWNcbiAqL1xuXG4vKipcbiAqIFJlbW92ZXMgdGhlIGFycmF5IGl0ZW0gYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAqIEBtZXRob2QgcmVtb3ZlQXRcbiAqIEBwYXJhbSB7YW55W119IGFycmF5XG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQXQgKGFycmF5LCBpbmRleCkge1xuICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XG59XG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgYXJyYXkgaXRlbSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICogSXQncyBmYXN0ZXIgYnV0IHRoZSBvcmRlciBvZiB0aGUgYXJyYXkgd2lsbCBiZSBjaGFuZ2VkLlxuICogQG1ldGhvZCBmYXN0UmVtb3ZlQXRcbiAqIEBwYXJhbSB7YW55W119IGFycmF5XG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAqL1xuZnVuY3Rpb24gZmFzdFJlbW92ZUF0IChhcnJheSwgaW5kZXgpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gbGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXJyYXlbaW5kZXhdID0gYXJyYXlbbGVuZ3RoIC0gMV07XG4gICAgYXJyYXkubGVuZ3RoID0gbGVuZ3RoIC0gMTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGEgc3BlY2lmaWMgb2JqZWN0IGZyb20gdGhlIGFycmF5LlxuICogQG1ldGhvZCByZW1vdmVcbiAqIEBwYXJhbSB7YW55W119IGFycmF5XG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIHJlbW92ZSAoYXJyYXksIHZhbHVlKSB7XG4gICAgdmFyIGluZGV4ID0gYXJyYXkuaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgcmVtb3ZlQXQoYXJyYXksIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYSBzcGVjaWZpYyBvYmplY3QgZnJvbSB0aGUgYXJyYXkuXG4gKiBJdCdzIGZhc3RlciBidXQgdGhlIG9yZGVyIG9mIHRoZSBhcnJheSB3aWxsIGJlIGNoYW5nZWQuXG4gKiBAbWV0aG9kIGZhc3RSZW1vdmVcbiAqIEBwYXJhbSB7YW55W119IGFycmF5XG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAqL1xuZnVuY3Rpb24gZmFzdFJlbW92ZSAoYXJyYXksIHZhbHVlKSB7XG4gICAgdmFyIGluZGV4ID0gYXJyYXkuaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgYXJyYXlbaW5kZXhdID0gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgICAgIC0tYXJyYXkubGVuZ3RoO1xuICAgIH1cbn1cblxuLyoqXG4gKiBWZXJpZnkgYXJyYXkncyBUeXBlXG4gKiBAbWV0aG9kIHZlcmlmeVR5cGVcbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0eXBlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiB2ZXJpZnlUeXBlIChhcnJheSwgdHlwZSkge1xuICAgIGlmIChhcnJheSAmJiBhcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghKGFycmF5W2ldIGluc3RhbmNlb2YgIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nSUQoMTMwMCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgZnJvbSBhcnJheSBhbGwgdmFsdWVzIGluIG1pbnVzQXJyLiBGb3IgZWFjaCBWYWx1ZSBpbiBtaW51c0FyciwgdGhlIGZpcnN0IG1hdGNoaW5nIGluc3RhbmNlIGluIGFycmF5IHdpbGwgYmUgcmVtb3ZlZC5cbiAqIEBtZXRob2QgcmVtb3ZlQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFNvdXJjZSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gbWludXNBcnIgbWludXMgQXJyYXlcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQXJyYXkgKGFycmF5LCBtaW51c0Fycikge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbWludXNBcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHJlbW92ZShhcnJheSwgbWludXNBcnJbaV0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBJbnNlcnRzIHNvbWUgb2JqZWN0cyBhdCBpbmRleFxuICogQG1ldGhvZCBhcHBlbmRPYmplY3RzQXRcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhZGRPYmpzXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5mdW5jdGlvbiBhcHBlbmRPYmplY3RzQXQgKGFycmF5LCBhZGRPYmpzLCBpbmRleCkge1xuICAgIGFycmF5LnNwbGljZS5hcHBseShhcnJheSwgW2luZGV4LCAwXS5jb25jYXQoYWRkT2JqcykpO1xuICAgIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGFycmF5IGNvbnRhaW5zIGEgc3BlY2lmaWMgdmFsdWUuXG4gKiBAbWV0aG9kIGNvbnRhaW5zXG4gKiBAcGFyYW0ge2FueVtdfSBhcnJheVxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBjb250YWlucyAoYXJyYXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIGFycmF5LmluZGV4T2YodmFsdWUpID49IDA7XG59XG5cbi8qKlxuICogQ29weSBhbiBhcnJheSdzIGl0ZW0gdG8gYSBuZXcgYXJyYXkgKGl0cyBwZXJmb3JtYW5jZSBpcyBiZXR0ZXIgdGhhbiBBcnJheS5zbGljZSlcbiAqIEBtZXRob2QgY29weVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXlcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5mdW5jdGlvbiBjb3B5IChhcnJheSkge1xuICAgIHZhciBpLCBsZW4gPSBhcnJheS5sZW5ndGgsIGFycl9jbG9uZSA9IG5ldyBBcnJheShsZW4pO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMSlcbiAgICAgICAgYXJyX2Nsb25lW2ldID0gYXJyYXlbaV07XG4gICAgcmV0dXJuIGFycl9jbG9uZTtcbn1cblxuanMuYXJyYXkgPSB7XG4gICAgcmVtb3ZlLFxuICAgIGZhc3RSZW1vdmUsXG4gICAgcmVtb3ZlQXQsXG4gICAgZmFzdFJlbW92ZUF0LFxuICAgIGNvbnRhaW5zLFxuICAgIHZlcmlmeVR5cGUsXG4gICAgcmVtb3ZlQXJyYXksXG4gICAgYXBwZW5kT2JqZWN0c0F0LFxuICAgIGNvcHksXG4gICAgTXV0YWJsZUZvcndhcmRJdGVyYXRvcjogcmVxdWlyZSgnLi4vdXRpbHMvbXV0YWJsZS1mb3J3YXJkLWl0ZXJhdG9yJylcbn07XG5cbi8vIE9CSkVDVCBQT09MXG5cbi8qKlxuICogISNlblxuICogQSBmaXhlZC1sZW5ndGggb2JqZWN0IHBvb2wgZGVzaWduZWQgZm9yIGdlbmVyYWwgdHlwZS48YnI+XG4gKiBUaGUgaW1wbGVtZW50YXRpb24gb2YgdGhpcyBvYmplY3QgcG9vbCBpcyB2ZXJ5IHNpbXBsZSxcbiAqIGl0IGNhbiBoZWxwcyB5b3UgdG8gaW1wcm92ZSB5b3VyIGdhbWUgcGVyZm9ybWFuY2UgZm9yIG9iamVjdHMgd2hpY2ggbmVlZCBmcmVxdWVudCByZWxlYXNlIGFuZCByZWNyZWF0ZSBvcGVyYXRpb25zPGJyLz5cbiAqICEjemhcbiAqIOmVv+W6puWbuuWumueahOWvueixoee8k+WtmOaxoO+8jOWPr+S7peeUqOadpee8k+WtmOWQhOenjeWvueixoeexu+Wei+OAgjxici8+XG4gKiDov5nkuKrlr7nosaHmsaDnmoTlrp7njrDpnZ7luLjnsr7nroDvvIzlroPlj6/ku6XluK7liqnmgqjmj5Dpq5jmuLjmiI/mgKfog73vvIzpgILnlKjkuo7kvJjljJblr7nosaHnmoTlj43lpI3liJvlu7rlkozplIDmr4HjgIJcbiAqIEBjbGFzcyBQb29sXG4gKiBAZXhhbXBsZVxuICpcbiAqRXhhbXBsZSAxOlxuICpcbiAqZnVuY3Rpb24gRGV0YWlscyAoKSB7XG4gKiAgICB0aGlzLnV1aWRMaXN0ID0gW107XG4gKn07XG4gKkRldGFpbHMucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICogICAgdGhpcy51dWlkTGlzdC5sZW5ndGggPSAwO1xuICp9O1xuICpEZXRhaWxzLnBvb2wgPSBuZXcganMuUG9vbChmdW5jdGlvbiAob2JqKSB7XG4gKiAgICBvYmoucmVzZXQoKTtcbiAqfSwgNSk7XG4gKkRldGFpbHMucG9vbC5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gKiAgICByZXR1cm4gdGhpcy5fZ2V0KCkgfHwgbmV3IERldGFpbHMoKTtcbiAqfTtcbiAqXG4gKnZhciBkZXRhaWwgPSBEZXRhaWxzLnBvb2wuZ2V0KCk7XG4gKi4uLlxuICpEZXRhaWxzLnBvb2wucHV0KGRldGFpbCk7XG4gKlxuICpFeGFtcGxlIDI6XG4gKlxuICpmdW5jdGlvbiBEZXRhaWxzIChidWZmZXIpIHtcbiAqICAgIHRoaXMudXVpZExpc3QgPSBidWZmZXI7XG4gKn07XG4gKi4uLlxuICpEZXRhaWxzLnBvb2wuZ2V0ID0gZnVuY3Rpb24gKGJ1ZmZlcikge1xuICogICAgdmFyIGNhY2hlZCA9IHRoaXMuX2dldCgpO1xuICogICAgaWYgKGNhY2hlZCkge1xuICogICAgICAgIGNhY2hlZC51dWlkTGlzdCA9IGJ1ZmZlcjtcbiAqICAgICAgICByZXR1cm4gY2FjaGVkO1xuICogICAgfVxuICogICAgZWxzZSB7XG4gKiAgICAgICAgcmV0dXJuIG5ldyBEZXRhaWxzKGJ1ZmZlcik7XG4gKiAgICB9XG4gKn07XG4gKlxuICp2YXIgZGV0YWlsID0gRGV0YWlscy5wb29sLmdldCggW10gKTtcbiAqLi4uXG4gKi9cbi8qKlxuICogISNlblxuICogQ29uc3RydWN0b3IgZm9yIGNyZWF0aW5nIGFuIG9iamVjdCBwb29sIGZvciB0aGUgc3BlY2lmaWMgb2JqZWN0IHR5cGUuXG4gKiBZb3UgY2FuIHBhc3MgYSBjYWxsYmFjayBhcmd1bWVudCBmb3IgcHJvY2VzcyB0aGUgY2xlYW51cCBsb2dpYyB3aGVuIHRoZSBvYmplY3QgaXMgcmVjeWNsZWQuXG4gKiAhI3poXG4gKiDkvb/nlKjmnoTpgKDlh73mlbDmnaXliJvlu7rkuIDkuKrmjIflrprlr7nosaHnsbvlnovnmoTlr7nosaHmsaDvvIzmgqjlj6/ku6XkvKDpgJLkuIDkuKrlm57osIPlh73mlbDvvIznlKjkuo7lpITnkIblr7nosaHlm57mlLbml7bnmoTmuIXnkIbpgLvovpHjgIJcbiAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjbGVhbnVwRnVuY10gLSB0aGUgY2FsbGJhY2sgbWV0aG9kIHVzZWQgdG8gcHJvY2VzcyB0aGUgY2xlYW51cCBsb2dpYyB3aGVuIHRoZSBvYmplY3QgaXMgcmVjeWNsZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gY2xlYW51cEZ1bmMub2JqXG4gKiBAcGFyYW0ge051bWJlcn0gc2l6ZSAtIGluaXRpYWxpemVzIHRoZSBsZW5ndGggb2YgdGhlIGFycmF5XG4gKiBAdHlwZXNjcmlwdFxuICogY29uc3RydWN0b3IoY2xlYW51cEZ1bmM6IChvYmo6IGFueSkgPT4gdm9pZCwgc2l6ZTogbnVtYmVyKVxuICogY29uc3RydWN0b3Ioc2l6ZTogbnVtYmVyKVxuICovXG5mdW5jdGlvbiBQb29sIChjbGVhbnVwRnVuYywgc2l6ZSkge1xuICAgIGlmIChzaXplID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2l6ZSA9IGNsZWFudXBGdW5jO1xuICAgICAgICBjbGVhbnVwRnVuYyA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuZ2V0ID0gbnVsbDtcbiAgICB0aGlzLmNvdW50ID0gMDtcbiAgICB0aGlzLl9wb29sID0gbmV3IEFycmF5KHNpemUpO1xuICAgIHRoaXMuX2NsZWFudXAgPSBjbGVhbnVwRnVuYztcbn1cblxuLyoqXG4gKiAhI2VuXG4gKiBHZXQgYW5kIGluaXRpYWxpemUgYW4gb2JqZWN0IGZyb20gcG9vbC4gVGhpcyBtZXRob2QgZGVmYXVsdHMgdG8gbnVsbCBhbmQgcmVxdWlyZXMgdGhlIHVzZXIgdG8gaW1wbGVtZW50IGl0LlxuICogISN6aFxuICog6I635Y+W5bm25Yid5aeL5YyW5a+56LGh5rGg5Lit55qE5a+56LGh44CC6L+Z5Liq5pa55rOV6buY6K6k5Li656m677yM6ZyA6KaB55So5oi36Ieq5bex5a6e546w44CCXG4gKiBAbWV0aG9kIGdldFxuICogQHBhcmFtIHthbnl9IC4uLnBhcmFtcyAtIHBhcmFtZXRlcnMgdG8gdXNlZCB0byBpbml0aWFsaXplIHRoZSBvYmplY3RcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBUaGUgY3VycmVudCBudW1iZXIgb2YgYXZhaWxhYmxlIG9iamVjdHMsIHRoZSBkZWZhdWx0IGlzIDAsIGl0IHdpbGwgZ3JhZHVhbGx5IGluY3JlYXNlIHdpdGggdGhlIHJlY3ljbGUgb2YgdGhlIG9iamVjdCxcbiAqIHRoZSBtYXhpbXVtIHdpbGwgbm90IGV4Y2VlZCB0aGUgc2l6ZSBzcGVjaWZpZWQgd2hlbiB0aGUgY29uc3RydWN0b3IgaXMgY2FsbGVkLlxuICogISN6aFxuICog5b2T5YmN5Y+v55So5a+56LGh5pWw6YeP77yM5LiA5byA5aeL6buY6K6k5pivIDDvvIzpmo/nnYDlr7nosaHnmoTlm57mlLbkvJrpgJDmuJDlop7lpKfvvIzmnIDlpKfkuI3kvJrotoXov4fosIPnlKjmnoTpgKDlh73mlbDml7bmjIflrprnmoQgc2l6ZeOAglxuICogQHByb3BlcnR5IHtOdW1iZXJ9IGNvdW50XG4gKiBAZGVmYXVsdCAwXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBHZXQgYW4gb2JqZWN0IGZyb20gcG9vbCwgaWYgbm8gYXZhaWxhYmxlIG9iamVjdCBpbiB0aGUgcG9vbCwgbnVsbCB3aWxsIGJlIHJldHVybmVkLlxuICogISN6aFxuICog6I635Y+W5a+56LGh5rGg5Lit55qE5a+56LGh77yM5aaC5p6c5a+56LGh5rGg5rKh5pyJ5Y+v55So5a+56LGh77yM5YiZ6L+U5Zue56m644CCXG4gKiBAbWV0aG9kIF9nZXRcbiAqIEByZXR1cm5zIHtPYmplY3R8bnVsbH1cbiAqL1xuUG9vbC5wcm90b3R5cGUuX2dldCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5jb3VudCA+IDApIHtcbiAgICAgICAgLS10aGlzLmNvdW50O1xuICAgICAgICB2YXIgY2FjaGUgPSB0aGlzLl9wb29sW3RoaXMuY291bnRdO1xuICAgICAgICB0aGlzLl9wb29sW3RoaXMuY291bnRdID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIGNhY2hlO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogISNlbiBQdXQgYW4gb2JqZWN0IGludG8gdGhlIHBvb2wuXG4gKiAhI3poIOWQkeWvueixoeaxoOi/lOi/mOS4gOS4quS4jeWGjemcgOimgeeahOWvueixoeOAglxuICogQG1ldGhvZCBwdXRcbiAqL1xuUG9vbC5wcm90b3R5cGUucHV0ID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBwb29sID0gdGhpcy5fcG9vbDtcbiAgICBpZiAodGhpcy5jb3VudCA8IHBvb2wubGVuZ3RoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jbGVhbnVwICYmIHRoaXMuX2NsZWFudXAob2JqKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBwb29sW3RoaXMuY291bnRdID0gb2JqO1xuICAgICAgICArK3RoaXMuY291bnQ7XG4gICAgfVxufTtcblxuLyoqXG4gKiAhI2VuIFJlc2l6ZSB0aGUgcG9vbC5cbiAqICEjemgg6K6+572u5a+56LGh5rGg5a656YeP44CCXG4gKiBAbWV0aG9kIHJlc2l6ZVxuICovXG5Qb29sLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbiAobGVuZ3RoKSB7XG4gICAgaWYgKGxlbmd0aCA+PSAwKSB7XG4gICAgICAgIHRoaXMuX3Bvb2wubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICBpZiAodGhpcy5jb3VudCA+IGxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jb3VudCA9IGxlbmd0aDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmpzLlBvb2wgPSBQb29sO1xuXG4vL1xuXG5jYy5qcyA9IGpzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGpzO1xuXG4vLyBmaXggc3VibW9kdWxlIHBvbGx1dGUgLi4uXG4vKipcbiAqIEBzdWJtb2R1bGUgY2NcbiAqL1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=