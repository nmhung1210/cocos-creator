
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/instantiate-jit.js';
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
// Some helper methods for compile instantiation code
var CCObject = require('./CCObject');

var Destroyed = CCObject.Flags.Destroyed;
var PersistentMask = CCObject.Flags.PersistentMask;

var Attr = require('./attribute');

var js = require('./js');

var CCClass = require('./CCClass');

var Compiler = require('./compiler');

var DEFAULT = Attr.DELIMETER + 'default';
var IDENTIFIER_RE = CCClass.IDENTIFIER_RE;
var escapeForJS = CCClass.escapeForJS;
var VAR = 'var ';
var LOCAL_OBJ = 'o';
var LOCAL_TEMP_OBJ = 't';
var LOCAL_ARRAY = 'a';
var LINE_INDEX_OF_NEW_OBJ = 0;
var DEFAULT_MODULE_CACHE = {
  'cc.Node': 'cc.Node',
  'cc.Sprite': 'cc.Sprite',
  'cc.Label': 'cc.Label',
  'cc.Button': 'cc.Button',
  'cc.Widget': 'cc.Widget',
  'cc.Animation': 'cc.Animation',
  'cc.ClickEvent': false,
  'cc.PrefabInfo': false
};

try {
  // compatible for IE
  !Float32Array.name && (Float32Array.name = 'Float32Array');
  !Float64Array.name && (Float64Array.name = 'Float64Array');
  !Int8Array.name && (Int8Array.name = 'Int8Array');
  !Int16Array.name && (Int16Array.name = 'Int16Array');
  !Int32Array.name && (Int32Array.name = 'Int32Array');
  !Uint8Array.name && (Uint8Array.name = 'Uint8Array');
  !Uint16Array.name && (Uint16Array.name = 'Uint16Array');
  !Uint32Array.name && (Uint32Array.name = 'Uint32Array');
} catch (e) {} // compatible for iOS 9


function getTypedArrayName(constructor) {
  if (constructor === Float32Array) {
    return 'Float32Array';
  } else if (constructor === Float64Array) {
    return 'Float64Array';
  } else if (constructor === Int8Array) {
    return 'Int8Array';
  } else if (constructor === Int16Array) {
    return 'Int16Array';
  } else if (constructor === Int32Array) {
    return 'Int32Array';
  } else if (constructor === Uint8Array) {
    return 'Uint8Array';
  } else if (constructor === Uint16Array) {
    return 'Uint16Array';
  } else if (constructor === Uint32Array) {
    return 'Uint32Array';
  } else {
    throw new Error("Unknown TypedArray could not be instantiated: " + constructor);
  }
} // HELPER CLASSES
// ('foo', 'bar')
// -> 'var foo = bar;'


function Declaration(varName, expression) {
  this.varName = varName;
  this.expression = expression;
}

Declaration.prototype.toString = function () {
  return VAR + this.varName + '=' + this.expression + ';';
}; // ('a =', 'var b = x')
// -> 'var b = a = x';
// ('a =', 'x')
// -> 'a = x';


function mergeDeclaration(statement, expression) {
  if (expression instanceof Declaration) {
    return new Declaration(expression.varName, statement + expression.expression);
  } else {
    return statement + expression;
  }
} // ('a', ['var b = x', 'b.foo = bar'])
// -> 'var b = a = x;'
// -> 'b.foo = bar;'
// ('a', 'var b = x')
// -> 'var b = a = x;'
// ('a', 'x')
// -> 'a = x;'


function writeAssignment(codeArray, statement, expression) {
  if (Array.isArray(expression)) {
    expression[0] = mergeDeclaration(statement, expression[0]);
    codeArray.push(expression);
  } else {
    codeArray.push(mergeDeclaration(statement, expression) + ';');
  }
} // ('foo', 'bar')
// -> 'targetExpression.foo = bar'
// ('foo1', 'bar1')
// ('foo2', 'bar2')
// -> 't = targetExpression;'
// -> 't.foo1 = bar1;'
// -> 't.foo2 = bar2;'


function Assignments(targetExpression) {
  this._exps = [];
  this._targetExp = targetExpression;
}

Assignments.prototype.append = function (key, expression) {
  this._exps.push([key, expression]);
};

Assignments.prototype.writeCode = function (codeArray) {
  var targetVar;

  if (this._exps.length > 1) {
    codeArray.push(LOCAL_TEMP_OBJ + '=' + this._targetExp + ';');
    targetVar = LOCAL_TEMP_OBJ;
  } else if (this._exps.length === 1) {
    targetVar = this._targetExp;
  } else {
    return;
  }

  for (var i = 0; i < this._exps.length; i++) {
    var pair = this._exps[i];
    writeAssignment(codeArray, targetVar + getPropAccessor(pair[0]) + '=', pair[1]);
  }
};

Assignments.pool = new js.Pool(function (obj) {
  obj._exps.length = 0;
  obj._targetExp = null;
}, 1);

Assignments.pool.get = function (targetExpression) {
  var cache = this._get() || new Assignments();
  cache._targetExp = targetExpression;
  return cache;
}; // HELPER FUNCTIONS


function equalsToDefault(def, value) {
  if (typeof def === 'function') {
    try {
      def = def();
    } catch (e) {
      return false;
    }
  }

  if (def === value) {
    return true;
  }

  if (def && value) {
    if (def instanceof cc.ValueType && def.equals(value)) {
      return true;
    }

    if (Array.isArray(def) && Array.isArray(value) || def.constructor === Object && value.constructor === Object) {
      try {
        return Array.isArray(def) && Array.isArray(value) && def.length === 0 && value.length === 0;
      } catch (e) {}
    }
  }

  return false;
}

function getPropAccessor(key) {
  return IDENTIFIER_RE.test(key) ? '.' + key : '[' + escapeForJS(key) + ']';
} //

/*
 * Variables:
 * {Object[]} O - objs list
 * {Function[]} F - constructor list
 * {Node} [R] - specify an instantiated prefabRoot that all references to prefabRoot in prefab will redirect to
 * {Object} o - current creating object
 */

/*
 * @param {Object} obj - the object to parse
 * @param {Node} [parent]
 */


function Parser(obj, parent) {
  this.parent = parent;
  this.objsToClear_iN$t = []; // used to reset _iN$t variable

  this.codeArray = []; // datas for generated code

  this.objs = [];
  this.funcs = [];
  this.funcModuleCache = js.createMap();
  js.mixin(this.funcModuleCache, DEFAULT_MODULE_CACHE); // {String[]} - variable names for circular references,
  //              not really global, just local variables shared between sub functions

  this.globalVariables = []; // incremental id for new global variables

  this.globalVariableId = 0; // incremental id for new local variables

  this.localVariableId = 0; // generate codeArray
  //if (Array.isArray(obj)) {
  //    this.codeArray.push(this.instantiateArray(obj));
  //}
  //else {

  this.codeArray.push(VAR + LOCAL_OBJ + ',' + LOCAL_TEMP_OBJ + ';', 'if(R){', LOCAL_OBJ + '=R;', '}else{', LOCAL_OBJ + '=R=new ' + this.getFuncModule(obj.constructor, true) + '();', '}');
  js.value(obj, '_iN$t', {
    globalVar: 'R'
  }, true);
  this.objsToClear_iN$t.push(obj);
  this.enumerateObject(this.codeArray, obj); //}
  // generate code

  var globalVariablesDeclaration;

  if (this.globalVariables.length > 0) {
    globalVariablesDeclaration = VAR + this.globalVariables.join(',') + ';';
  }

  var code = Compiler.flattenCodeArray(['return (function(R){', globalVariablesDeclaration || [], this.codeArray, 'return o;', '})']); // generate method and bind with objs

  this.result = Function('O', 'F', code)(this.objs, this.funcs); // if (CC_TEST && !isPhantomJS) {
  //     console.log(code);
  // }
  // cleanup

  for (var i = 0, len = this.objsToClear_iN$t.length; i < len; ++i) {
    this.objsToClear_iN$t[i]._iN$t = null;
  }

  this.objsToClear_iN$t.length = 0;
}

var proto = Parser.prototype;

proto.getFuncModule = function (func, usedInNew) {
  var clsName = js.getClassName(func);

  if (clsName) {
    var cache = this.funcModuleCache[clsName];

    if (cache) {
      return cache;
    } else if (cache === undefined) {
      var clsNameIsModule = clsName.indexOf('.') !== -1;

      if (clsNameIsModule) {
        try {
          // ensure is module
          clsNameIsModule = func === Function('return ' + clsName)();

          if (clsNameIsModule) {
            this.funcModuleCache[clsName] = clsName;
            return clsName;
          }
        } catch (e) {}
      }
    }
  }

  var index = this.funcs.indexOf(func);

  if (index < 0) {
    index = this.funcs.length;
    this.funcs.push(func);
  }

  var res = 'F[' + index + ']';

  if (usedInNew) {
    res = '(' + res + ')';
  }

  this.funcModuleCache[clsName] = res;
  return res;
};

proto.getObjRef = function (obj) {
  var index = this.objs.indexOf(obj);

  if (index < 0) {
    index = this.objs.length;
    this.objs.push(obj);
  }

  return 'O[' + index + ']';
};

proto.setValueType = function (codeArray, defaultValue, srcValue, targetExpression) {
  var assignments = Assignments.pool.get(targetExpression);
  var fastDefinedProps = defaultValue.constructor.__props__;

  if (!fastDefinedProps) {
    fastDefinedProps = Object.keys(defaultValue);
  }

  for (var i = 0; i < fastDefinedProps.length; i++) {
    var propName = fastDefinedProps[i];
    var prop = srcValue[propName];

    if (defaultValue[propName] === prop) {
      continue;
    }

    var expression = this.enumerateField(srcValue, propName, prop);
    assignments.append(propName, expression);
  }

  assignments.writeCode(codeArray);
  Assignments.pool.put(assignments);
};

proto.enumerateCCClass = function (codeArray, obj, klass) {
  var props = klass.__values__;
  var attrs = Attr.getClassAttrs(klass);

  for (var p = 0; p < props.length; p++) {
    var key = props[p];
    var val = obj[key];
    var defaultValue = attrs[key + DEFAULT];

    if (equalsToDefault(defaultValue, val)) {
      continue;
    }

    if (typeof val === 'object' && val instanceof cc.ValueType) {
      defaultValue = CCClass.getDefault(defaultValue);

      if (defaultValue && defaultValue.constructor === val.constructor) {
        // fast case
        var targetExpression = LOCAL_OBJ + getPropAccessor(key);
        this.setValueType(codeArray, defaultValue, val, targetExpression);
        continue;
      }
    }

    this.setObjProp(codeArray, obj, key, val);
  }
};

proto.instantiateArray = function (value) {
  if (value.length === 0) {
    return '[]';
  }

  var arrayVar = LOCAL_ARRAY + ++this.localVariableId;
  var declaration = new Declaration(arrayVar, 'new Array(' + value.length + ')');
  var codeArray = [declaration]; // assign a _iN$t flag to indicate that this object has been parsed.

  js.value(value, '_iN$t', {
    globalVar: '',
    // the name of declared global variable used to access this object
    source: codeArray // the source code array for this object

  }, true);
  this.objsToClear_iN$t.push(value);

  for (var i = 0; i < value.length; ++i) {
    var statement = arrayVar + '[' + i + ']=';
    var expression = this.enumerateField(value, i, value[i]);
    writeAssignment(codeArray, statement, expression);
  }

  return codeArray;
};

proto.instantiateTypedArray = function (value) {
  var type = value.constructor.name || getTypedArrayName(value.constructor);

  if (value.length === 0) {
    return 'new ' + type;
  }

  var arrayVar = LOCAL_ARRAY + ++this.localVariableId;
  var declaration = new Declaration(arrayVar, 'new ' + type + '(' + value.length + ')');
  var codeArray = [declaration]; // assign a _iN$t flag to indicate that this object has been parsed.

  value._iN$t = {
    globalVar: '',
    // the name of declared global variable used to access this object
    source: codeArray // the source code array for this object

  };
  this.objsToClear_iN$t.push(value);

  for (var i = 0; i < value.length; ++i) {
    if (value[i] !== 0) {
      var statement = arrayVar + '[' + i + ']=';
      writeAssignment(codeArray, statement, value[i]);
    }
  }

  return codeArray;
};

proto.enumerateField = function (obj, key, value) {
  if (typeof value === 'object' && value) {
    var _iN$t = value._iN$t;

    if (_iN$t) {
      // parsed
      var globalVar = _iN$t.globalVar;

      if (!globalVar) {
        // declare a global var
        globalVar = _iN$t.globalVar = 'v' + ++this.globalVariableId;
        this.globalVariables.push(globalVar); // insert assignment statement to assign to global var

        var line = _iN$t.source[LINE_INDEX_OF_NEW_OBJ];
        _iN$t.source[LINE_INDEX_OF_NEW_OBJ] = mergeDeclaration(globalVar + '=', line); // if (typeof line ==='string' && line.startsWith(VAR)) {
        //     // var o=xxx -> var o=global=xxx
        //     var LEN_OF_VAR_O = 5;
        //     _iN$t.source[LINE_INDEX_OF_NEW_OBJ] = line.slice(0, LEN_OF_VAR_O) + '=' + globalVar + line.slice(LEN_OF_VAR_O);
        // }
      }

      return globalVar;
    } else if (ArrayBuffer.isView(value)) {
      return this.instantiateTypedArray(value);
    } else if (Array.isArray(value)) {
      return this.instantiateArray(value);
    } else {
      return this.instantiateObj(value);
    }
  } else if (typeof value === 'function') {
    return this.getFuncModule(value);
  } else if (typeof value === 'string') {
    return escapeForJS(value);
  } else {
    if (key === '_objFlags' && obj instanceof CCObject) {
      value &= PersistentMask;
    }

    return value;
  }
};

proto.setObjProp = function (codeArray, obj, key, value) {
  var statement = LOCAL_OBJ + getPropAccessor(key) + '=';
  var expression = this.enumerateField(obj, key, value);
  writeAssignment(codeArray, statement, expression);
}; // codeArray - the source code array for this object


proto.enumerateObject = function (codeArray, obj) {
  var klass = obj.constructor;

  if (cc.Class._isCCClass(klass)) {
    this.enumerateCCClass(codeArray, obj, klass);
  } else {
    // primitive javascript object
    for (var key in obj) {
      if (!obj.hasOwnProperty(key) || key.charCodeAt(0) === 95 && key.charCodeAt(1) === 95 && // starts with "__"
      key !== '__type__') {
        continue;
      }

      var value = obj[key];

      if (typeof value === 'object' && value && value === obj._iN$t) {
        continue;
      }

      this.setObjProp(codeArray, obj, key, value);
    }
  }
};

proto.instantiateObj = function (obj) {
  if (obj instanceof cc.ValueType) {
    return CCClass.getNewValueTypeCode(obj);
  }

  if (obj instanceof cc.Asset) {
    // register to asset list and just return the reference.
    return this.getObjRef(obj);
  }

  if (obj._objFlags & Destroyed) {
    // the same as cc.isValid(obj)
    return null;
  }

  var createCode;
  var ctor = obj.constructor;

  if (cc.Class._isCCClass(ctor)) {
    if (this.parent) {
      if (this.parent instanceof cc.Component) {
        if (obj instanceof cc._BaseNode || obj instanceof cc.Component) {
          return this.getObjRef(obj);
        }
      } else if (this.parent instanceof cc._BaseNode) {
        if (obj instanceof cc._BaseNode) {
          if (!obj.isChildOf(this.parent)) {
            // should not clone other nodes if not descendant
            return this.getObjRef(obj);
          }
        } else if (obj instanceof cc.Component) {
          if (!obj.node.isChildOf(this.parent)) {
            // should not clone other component if not descendant
            return this.getObjRef(obj);
          }
        }
      }
    }

    createCode = new Declaration(LOCAL_OBJ, 'new ' + this.getFuncModule(ctor, true) + '()');
  } else if (ctor === Object) {
    createCode = new Declaration(LOCAL_OBJ, '{}');
  } else if (!ctor) {
    createCode = new Declaration(LOCAL_OBJ, 'Object.create(null)');
  } else {
    // do not clone unknown type
    return this.getObjRef(obj);
  }

  var codeArray = [createCode]; // assign a _iN$t flag to indicate that this object has been parsed.

  js.value(obj, '_iN$t', {
    globalVar: '',
    // the name of declared global variable used to access this object
    source: codeArray // the source code array for this object
    //propName: '',     // the propName this object defined in its source code,
    //                  // if defined, use LOCAL_OBJ.propName to access the obj, else just use o

  }, true);
  this.objsToClear_iN$t.push(obj);
  this.enumerateObject(codeArray, obj);
  return ['(function(){', codeArray, 'return o;})();'];
};

function compile(node) {
  var root = node instanceof cc._BaseNode && node;
  var parser = new Parser(node, root);
  return parser.result;
}

module.exports = {
  compile: compile,
  equalsToDefault: equalsToDefault
};

if (CC_TEST) {
  cc._Test.IntantiateJit = module.exports;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL2luc3RhbnRpYXRlLWppdC5qcyJdLCJuYW1lcyI6WyJDQ09iamVjdCIsInJlcXVpcmUiLCJEZXN0cm95ZWQiLCJGbGFncyIsIlBlcnNpc3RlbnRNYXNrIiwiQXR0ciIsImpzIiwiQ0NDbGFzcyIsIkNvbXBpbGVyIiwiREVGQVVMVCIsIkRFTElNRVRFUiIsIklERU5USUZJRVJfUkUiLCJlc2NhcGVGb3JKUyIsIlZBUiIsIkxPQ0FMX09CSiIsIkxPQ0FMX1RFTVBfT0JKIiwiTE9DQUxfQVJSQVkiLCJMSU5FX0lOREVYX09GX05FV19PQkoiLCJERUZBVUxUX01PRFVMRV9DQUNIRSIsIkZsb2F0MzJBcnJheSIsIm5hbWUiLCJGbG9hdDY0QXJyYXkiLCJJbnQ4QXJyYXkiLCJJbnQxNkFycmF5IiwiSW50MzJBcnJheSIsIlVpbnQ4QXJyYXkiLCJVaW50MTZBcnJheSIsIlVpbnQzMkFycmF5IiwiZSIsImdldFR5cGVkQXJyYXlOYW1lIiwiY29uc3RydWN0b3IiLCJFcnJvciIsIkRlY2xhcmF0aW9uIiwidmFyTmFtZSIsImV4cHJlc3Npb24iLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsIm1lcmdlRGVjbGFyYXRpb24iLCJzdGF0ZW1lbnQiLCJ3cml0ZUFzc2lnbm1lbnQiLCJjb2RlQXJyYXkiLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwiQXNzaWdubWVudHMiLCJ0YXJnZXRFeHByZXNzaW9uIiwiX2V4cHMiLCJfdGFyZ2V0RXhwIiwiYXBwZW5kIiwia2V5Iiwid3JpdGVDb2RlIiwidGFyZ2V0VmFyIiwibGVuZ3RoIiwiaSIsInBhaXIiLCJnZXRQcm9wQWNjZXNzb3IiLCJwb29sIiwiUG9vbCIsIm9iaiIsImdldCIsImNhY2hlIiwiX2dldCIsImVxdWFsc1RvRGVmYXVsdCIsImRlZiIsInZhbHVlIiwiY2MiLCJWYWx1ZVR5cGUiLCJlcXVhbHMiLCJPYmplY3QiLCJ0ZXN0IiwiUGFyc2VyIiwicGFyZW50Iiwib2Jqc1RvQ2xlYXJfaU4kdCIsIm9ianMiLCJmdW5jcyIsImZ1bmNNb2R1bGVDYWNoZSIsImNyZWF0ZU1hcCIsIm1peGluIiwiZ2xvYmFsVmFyaWFibGVzIiwiZ2xvYmFsVmFyaWFibGVJZCIsImxvY2FsVmFyaWFibGVJZCIsImdldEZ1bmNNb2R1bGUiLCJnbG9iYWxWYXIiLCJlbnVtZXJhdGVPYmplY3QiLCJnbG9iYWxWYXJpYWJsZXNEZWNsYXJhdGlvbiIsImpvaW4iLCJjb2RlIiwiZmxhdHRlbkNvZGVBcnJheSIsInJlc3VsdCIsIkZ1bmN0aW9uIiwibGVuIiwiX2lOJHQiLCJwcm90byIsImZ1bmMiLCJ1c2VkSW5OZXciLCJjbHNOYW1lIiwiZ2V0Q2xhc3NOYW1lIiwidW5kZWZpbmVkIiwiY2xzTmFtZUlzTW9kdWxlIiwiaW5kZXhPZiIsImluZGV4IiwicmVzIiwiZ2V0T2JqUmVmIiwic2V0VmFsdWVUeXBlIiwiZGVmYXVsdFZhbHVlIiwic3JjVmFsdWUiLCJhc3NpZ25tZW50cyIsImZhc3REZWZpbmVkUHJvcHMiLCJfX3Byb3BzX18iLCJrZXlzIiwicHJvcE5hbWUiLCJwcm9wIiwiZW51bWVyYXRlRmllbGQiLCJwdXQiLCJlbnVtZXJhdGVDQ0NsYXNzIiwia2xhc3MiLCJwcm9wcyIsIl9fdmFsdWVzX18iLCJhdHRycyIsImdldENsYXNzQXR0cnMiLCJwIiwidmFsIiwiZ2V0RGVmYXVsdCIsInNldE9ialByb3AiLCJpbnN0YW50aWF0ZUFycmF5IiwiYXJyYXlWYXIiLCJkZWNsYXJhdGlvbiIsInNvdXJjZSIsImluc3RhbnRpYXRlVHlwZWRBcnJheSIsInR5cGUiLCJsaW5lIiwiQXJyYXlCdWZmZXIiLCJpc1ZpZXciLCJpbnN0YW50aWF0ZU9iaiIsIkNsYXNzIiwiX2lzQ0NDbGFzcyIsImhhc093blByb3BlcnR5IiwiY2hhckNvZGVBdCIsImdldE5ld1ZhbHVlVHlwZUNvZGUiLCJBc3NldCIsIl9vYmpGbGFncyIsImNyZWF0ZUNvZGUiLCJjdG9yIiwiQ29tcG9uZW50IiwiX0Jhc2VOb2RlIiwiaXNDaGlsZE9mIiwibm9kZSIsImNvbXBpbGUiLCJyb290IiwicGFyc2VyIiwibW9kdWxlIiwiZXhwb3J0cyIsIkNDX1RFU1QiLCJfVGVzdCIsIkludGFudGlhdGVKaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTtBQUVBLElBQUlBLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBdEI7O0FBQ0EsSUFBSUMsU0FBUyxHQUFHRixRQUFRLENBQUNHLEtBQVQsQ0FBZUQsU0FBL0I7QUFDQSxJQUFJRSxjQUFjLEdBQUdKLFFBQVEsQ0FBQ0csS0FBVCxDQUFlQyxjQUFwQzs7QUFDQSxJQUFJQyxJQUFJLEdBQUdKLE9BQU8sQ0FBQyxhQUFELENBQWxCOztBQUNBLElBQUlLLEVBQUUsR0FBR0wsT0FBTyxDQUFDLE1BQUQsQ0FBaEI7O0FBQ0EsSUFBSU0sT0FBTyxHQUFHTixPQUFPLENBQUMsV0FBRCxDQUFyQjs7QUFDQSxJQUFJTyxRQUFRLEdBQUdQLE9BQU8sQ0FBQyxZQUFELENBQXRCOztBQUVBLElBQUlRLE9BQU8sR0FBR0osSUFBSSxDQUFDSyxTQUFMLEdBQWlCLFNBQS9CO0FBQ0EsSUFBSUMsYUFBYSxHQUFHSixPQUFPLENBQUNJLGFBQTVCO0FBQ0EsSUFBSUMsV0FBVyxHQUFHTCxPQUFPLENBQUNLLFdBQTFCO0FBRUEsSUFBTUMsR0FBRyxHQUFHLE1BQVo7QUFDQSxJQUFNQyxTQUFTLEdBQUcsR0FBbEI7QUFDQSxJQUFNQyxjQUFjLEdBQUcsR0FBdkI7QUFDQSxJQUFNQyxXQUFXLEdBQUcsR0FBcEI7QUFDQSxJQUFNQyxxQkFBcUIsR0FBRyxDQUE5QjtBQUVBLElBQU1DLG9CQUFvQixHQUFHO0FBQ3pCLGFBQVcsU0FEYztBQUV6QixlQUFhLFdBRlk7QUFHekIsY0FBWSxVQUhhO0FBSXpCLGVBQWEsV0FKWTtBQUt6QixlQUFhLFdBTFk7QUFNekIsa0JBQWdCLGNBTlM7QUFPekIsbUJBQWlCLEtBUFE7QUFRekIsbUJBQWlCO0FBUlEsQ0FBN0I7O0FBV0EsSUFBSTtBQUNBO0FBQ0EsR0FBQ0MsWUFBWSxDQUFDQyxJQUFkLEtBQXVCRCxZQUFZLENBQUNDLElBQWIsR0FBb0IsY0FBM0M7QUFDQSxHQUFDQyxZQUFZLENBQUNELElBQWQsS0FBdUJDLFlBQVksQ0FBQ0QsSUFBYixHQUFvQixjQUEzQztBQUVBLEdBQUNFLFNBQVMsQ0FBQ0YsSUFBWCxLQUFvQkUsU0FBUyxDQUFDRixJQUFWLEdBQWlCLFdBQXJDO0FBQ0EsR0FBQ0csVUFBVSxDQUFDSCxJQUFaLEtBQXFCRyxVQUFVLENBQUNILElBQVgsR0FBa0IsWUFBdkM7QUFDQSxHQUFDSSxVQUFVLENBQUNKLElBQVosS0FBcUJJLFVBQVUsQ0FBQ0osSUFBWCxHQUFrQixZQUF2QztBQUVBLEdBQUNLLFVBQVUsQ0FBQ0wsSUFBWixLQUFxQkssVUFBVSxDQUFDTCxJQUFYLEdBQWtCLFlBQXZDO0FBQ0EsR0FBQ00sV0FBVyxDQUFDTixJQUFiLEtBQXNCTSxXQUFXLENBQUNOLElBQVosR0FBbUIsYUFBekM7QUFDQSxHQUFDTyxXQUFXLENBQUNQLElBQWIsS0FBc0JPLFdBQVcsQ0FBQ1AsSUFBWixHQUFtQixhQUF6QztBQUNILENBWkQsQ0FhQSxPQUFPUSxDQUFQLEVBQVUsQ0FBRSxFQUVaOzs7QUFDQSxTQUFTQyxpQkFBVCxDQUE0QkMsV0FBNUIsRUFBeUM7QUFDckMsTUFBSUEsV0FBVyxLQUFLWCxZQUFwQixFQUFrQztBQUFFLFdBQU8sY0FBUDtBQUF3QixHQUE1RCxNQUNLLElBQUlXLFdBQVcsS0FBS1QsWUFBcEIsRUFBa0M7QUFBRSxXQUFPLGNBQVA7QUFBd0IsR0FBNUQsTUFFQSxJQUFJUyxXQUFXLEtBQUtSLFNBQXBCLEVBQStCO0FBQUUsV0FBTyxXQUFQO0FBQXFCLEdBQXRELE1BQ0EsSUFBSVEsV0FBVyxLQUFLUCxVQUFwQixFQUFnQztBQUFFLFdBQU8sWUFBUDtBQUFzQixHQUF4RCxNQUNBLElBQUlPLFdBQVcsS0FBS04sVUFBcEIsRUFBZ0M7QUFBRSxXQUFPLFlBQVA7QUFBc0IsR0FBeEQsTUFFQSxJQUFJTSxXQUFXLEtBQUtMLFVBQXBCLEVBQWdDO0FBQUUsV0FBTyxZQUFQO0FBQXNCLEdBQXhELE1BQ0EsSUFBSUssV0FBVyxLQUFLSixXQUFwQixFQUFpQztBQUFFLFdBQU8sYUFBUDtBQUF1QixHQUExRCxNQUNBLElBQUlJLFdBQVcsS0FBS0gsV0FBcEIsRUFBaUM7QUFBRSxXQUFPLGFBQVA7QUFBdUIsR0FBMUQsTUFDQTtBQUNELFVBQU0sSUFBSUksS0FBSixvREFBMkRELFdBQTNELENBQU47QUFDSDtBQUNKLEVBRUQ7QUFFQTtBQUNBOzs7QUFDQSxTQUFTRSxXQUFULENBQXNCQyxPQUF0QixFQUErQkMsVUFBL0IsRUFBMkM7QUFDdkMsT0FBS0QsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFDSDs7QUFDREYsV0FBVyxDQUFDRyxTQUFaLENBQXNCQyxRQUF0QixHQUFpQyxZQUFZO0FBQ3pDLFNBQU92QixHQUFHLEdBQUcsS0FBS29CLE9BQVgsR0FBcUIsR0FBckIsR0FBMkIsS0FBS0MsVUFBaEMsR0FBNkMsR0FBcEQ7QUFDSCxDQUZELEVBSUE7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLFNBQVNHLGdCQUFULENBQTJCQyxTQUEzQixFQUFzQ0osVUFBdEMsRUFBa0Q7QUFDOUMsTUFBSUEsVUFBVSxZQUFZRixXQUExQixFQUF1QztBQUNuQyxXQUFPLElBQUlBLFdBQUosQ0FBZ0JFLFVBQVUsQ0FBQ0QsT0FBM0IsRUFBb0NLLFNBQVMsR0FBR0osVUFBVSxDQUFDQSxVQUEzRCxDQUFQO0FBQ0gsR0FGRCxNQUdLO0FBQ0QsV0FBT0ksU0FBUyxHQUFHSixVQUFuQjtBQUNIO0FBQ0osRUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsU0FBU0ssZUFBVCxDQUEwQkMsU0FBMUIsRUFBcUNGLFNBQXJDLEVBQWdESixVQUFoRCxFQUE0RDtBQUN4RCxNQUFJTyxLQUFLLENBQUNDLE9BQU4sQ0FBY1IsVUFBZCxDQUFKLEVBQStCO0FBQzNCQSxJQUFBQSxVQUFVLENBQUMsQ0FBRCxDQUFWLEdBQWdCRyxnQkFBZ0IsQ0FBQ0MsU0FBRCxFQUFZSixVQUFVLENBQUMsQ0FBRCxDQUF0QixDQUFoQztBQUNBTSxJQUFBQSxTQUFTLENBQUNHLElBQVYsQ0FBZVQsVUFBZjtBQUNILEdBSEQsTUFJSztBQUNETSxJQUFBQSxTQUFTLENBQUNHLElBQVYsQ0FBZU4sZ0JBQWdCLENBQUNDLFNBQUQsRUFBWUosVUFBWixDQUFoQixHQUEwQyxHQUF6RDtBQUNIO0FBQ0osRUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsU0FBU1UsV0FBVCxDQUFzQkMsZ0JBQXRCLEVBQXdDO0FBQ3BDLE9BQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQkYsZ0JBQWxCO0FBQ0g7O0FBQ0RELFdBQVcsQ0FBQ1QsU0FBWixDQUFzQmEsTUFBdEIsR0FBK0IsVUFBVUMsR0FBVixFQUFlZixVQUFmLEVBQTJCO0FBQ3RELE9BQUtZLEtBQUwsQ0FBV0gsSUFBWCxDQUFnQixDQUFDTSxHQUFELEVBQU1mLFVBQU4sQ0FBaEI7QUFDSCxDQUZEOztBQUdBVSxXQUFXLENBQUNULFNBQVosQ0FBc0JlLFNBQXRCLEdBQWtDLFVBQVVWLFNBQVYsRUFBcUI7QUFDbkQsTUFBSVcsU0FBSjs7QUFDQSxNQUFJLEtBQUtMLEtBQUwsQ0FBV00sTUFBWCxHQUFvQixDQUF4QixFQUEyQjtBQUN2QlosSUFBQUEsU0FBUyxDQUFDRyxJQUFWLENBQWU1QixjQUFjLEdBQUcsR0FBakIsR0FBdUIsS0FBS2dDLFVBQTVCLEdBQXlDLEdBQXhEO0FBQ0FJLElBQUFBLFNBQVMsR0FBR3BDLGNBQVo7QUFDSCxHQUhELE1BSUssSUFBSSxLQUFLK0IsS0FBTCxDQUFXTSxNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQzlCRCxJQUFBQSxTQUFTLEdBQUcsS0FBS0osVUFBakI7QUFDSCxHQUZJLE1BR0E7QUFDRDtBQUNIOztBQUNELE9BQUssSUFBSU0sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLUCxLQUFMLENBQVdNLE1BQS9CLEVBQXVDQyxDQUFDLEVBQXhDLEVBQTRDO0FBQ3hDLFFBQUlDLElBQUksR0FBRyxLQUFLUixLQUFMLENBQVdPLENBQVgsQ0FBWDtBQUNBZCxJQUFBQSxlQUFlLENBQUNDLFNBQUQsRUFBWVcsU0FBUyxHQUFHSSxlQUFlLENBQUNELElBQUksQ0FBQyxDQUFELENBQUwsQ0FBM0IsR0FBdUMsR0FBbkQsRUFBd0RBLElBQUksQ0FBQyxDQUFELENBQTVELENBQWY7QUFDSDtBQUNKLENBaEJEOztBQWtCQVYsV0FBVyxDQUFDWSxJQUFaLEdBQW1CLElBQUlsRCxFQUFFLENBQUNtRCxJQUFQLENBQVksVUFBVUMsR0FBVixFQUFlO0FBQ2RBLEVBQUFBLEdBQUcsQ0FBQ1osS0FBSixDQUFVTSxNQUFWLEdBQW1CLENBQW5CO0FBQ0FNLEVBQUFBLEdBQUcsQ0FBQ1gsVUFBSixHQUFpQixJQUFqQjtBQUNILENBSFYsRUFHWSxDQUhaLENBQW5COztBQUlBSCxXQUFXLENBQUNZLElBQVosQ0FBaUJHLEdBQWpCLEdBQXVCLFVBQVVkLGdCQUFWLEVBQTRCO0FBQy9DLE1BQUllLEtBQUssR0FBRyxLQUFLQyxJQUFMLE1BQWUsSUFBSWpCLFdBQUosRUFBM0I7QUFDQWdCLEVBQUFBLEtBQUssQ0FBQ2IsVUFBTixHQUFtQkYsZ0JBQW5CO0FBQ0EsU0FBT2UsS0FBUDtBQUNILENBSkQsRUFNQTs7O0FBRUEsU0FBU0UsZUFBVCxDQUEwQkMsR0FBMUIsRUFBK0JDLEtBQS9CLEVBQXNDO0FBQ2xDLE1BQUksT0FBT0QsR0FBUCxLQUFlLFVBQW5CLEVBQStCO0FBQzNCLFFBQUk7QUFDQUEsTUFBQUEsR0FBRyxHQUFHQSxHQUFHLEVBQVQ7QUFDSCxLQUZELENBR0EsT0FBT25DLENBQVAsRUFBVTtBQUNOLGFBQU8sS0FBUDtBQUNIO0FBQ0o7O0FBQ0QsTUFBSW1DLEdBQUcsS0FBS0MsS0FBWixFQUFtQjtBQUNmLFdBQU8sSUFBUDtBQUNIOztBQUNELE1BQUlELEdBQUcsSUFBSUMsS0FBWCxFQUFrQjtBQUNkLFFBQUlELEdBQUcsWUFBWUUsRUFBRSxDQUFDQyxTQUFsQixJQUErQkgsR0FBRyxDQUFDSSxNQUFKLENBQVdILEtBQVgsQ0FBbkMsRUFBc0Q7QUFDbEQsYUFBTyxJQUFQO0FBQ0g7O0FBQ0QsUUFBS3ZCLEtBQUssQ0FBQ0MsT0FBTixDQUFjcUIsR0FBZCxLQUFzQnRCLEtBQUssQ0FBQ0MsT0FBTixDQUFjc0IsS0FBZCxDQUF2QixJQUNDRCxHQUFHLENBQUNqQyxXQUFKLEtBQW9Cc0MsTUFBcEIsSUFBOEJKLEtBQUssQ0FBQ2xDLFdBQU4sS0FBc0JzQyxNQUR6RCxFQUVFO0FBQ0UsVUFBSTtBQUNBLGVBQU8zQixLQUFLLENBQUNDLE9BQU4sQ0FBY3FCLEdBQWQsS0FBc0J0QixLQUFLLENBQUNDLE9BQU4sQ0FBY3NCLEtBQWQsQ0FBdEIsSUFBOENELEdBQUcsQ0FBQ1gsTUFBSixLQUFlLENBQTdELElBQWtFWSxLQUFLLENBQUNaLE1BQU4sS0FBaUIsQ0FBMUY7QUFDSCxPQUZELENBR0EsT0FBT3hCLENBQVAsRUFBVSxDQUNUO0FBQ0o7QUFDSjs7QUFDRCxTQUFPLEtBQVA7QUFDSDs7QUFFRCxTQUFTMkIsZUFBVCxDQUEwQk4sR0FBMUIsRUFBK0I7QUFDM0IsU0FBT3RDLGFBQWEsQ0FBQzBELElBQWQsQ0FBbUJwQixHQUFuQixJQUEyQixNQUFNQSxHQUFqQyxHQUF5QyxNQUFNckMsV0FBVyxDQUFDcUMsR0FBRCxDQUFqQixHQUF5QixHQUF6RTtBQUNILEVBRUQ7O0FBRUE7Ozs7Ozs7O0FBUUE7Ozs7OztBQUlBLFNBQVNxQixNQUFULENBQWlCWixHQUFqQixFQUFzQmEsTUFBdEIsRUFBOEI7QUFDMUIsT0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBRUEsT0FBS0MsZ0JBQUwsR0FBd0IsRUFBeEIsQ0FIMEIsQ0FHSTs7QUFDOUIsT0FBS2hDLFNBQUwsR0FBaUIsRUFBakIsQ0FKMEIsQ0FNMUI7O0FBQ0EsT0FBS2lDLElBQUwsR0FBWSxFQUFaO0FBQ0EsT0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFFQSxPQUFLQyxlQUFMLEdBQXVCckUsRUFBRSxDQUFDc0UsU0FBSCxFQUF2QjtBQUNBdEUsRUFBQUEsRUFBRSxDQUFDdUUsS0FBSCxDQUFTLEtBQUtGLGVBQWQsRUFBK0J6RCxvQkFBL0IsRUFYMEIsQ0FhMUI7QUFDQTs7QUFDQSxPQUFLNEQsZUFBTCxHQUF1QixFQUF2QixDQWYwQixDQWdCMUI7O0FBQ0EsT0FBS0MsZ0JBQUwsR0FBd0IsQ0FBeEIsQ0FqQjBCLENBa0IxQjs7QUFDQSxPQUFLQyxlQUFMLEdBQXVCLENBQXZCLENBbkIwQixDQXFCMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDSSxPQUFLeEMsU0FBTCxDQUFlRyxJQUFmLENBQW9COUIsR0FBRyxHQUFHQyxTQUFOLEdBQWtCLEdBQWxCLEdBQXdCQyxjQUF4QixHQUF5QyxHQUE3RCxFQUNtQixRQURuQixFQUV3QkQsU0FBUyxHQUFHLEtBRnBDLEVBR21CLFFBSG5CLEVBSXdCQSxTQUFTLEdBQUcsU0FBWixHQUF3QixLQUFLbUUsYUFBTCxDQUFtQnZCLEdBQUcsQ0FBQzVCLFdBQXZCLEVBQW9DLElBQXBDLENBQXhCLEdBQW9FLEtBSjVGLEVBS21CLEdBTG5CO0FBTUF4QixFQUFBQSxFQUFFLENBQUMwRCxLQUFILENBQVNOLEdBQVQsRUFBYyxPQUFkLEVBQXVCO0FBQUV3QixJQUFBQSxTQUFTLEVBQUU7QUFBYixHQUF2QixFQUEyQyxJQUEzQztBQUNBLE9BQUtWLGdCQUFMLENBQXNCN0IsSUFBdEIsQ0FBMkJlLEdBQTNCO0FBQ0EsT0FBS3lCLGVBQUwsQ0FBcUIsS0FBSzNDLFNBQTFCLEVBQXFDa0IsR0FBckMsRUFsQ3NCLENBbUMxQjtBQUVBOztBQUNBLE1BQUkwQiwwQkFBSjs7QUFDQSxNQUFJLEtBQUtOLGVBQUwsQ0FBcUIxQixNQUFyQixHQUE4QixDQUFsQyxFQUFxQztBQUNqQ2dDLElBQUFBLDBCQUEwQixHQUFHdkUsR0FBRyxHQUFHLEtBQUtpRSxlQUFMLENBQXFCTyxJQUFyQixDQUEwQixHQUExQixDQUFOLEdBQXVDLEdBQXBFO0FBQ0g7O0FBQ0QsTUFBSUMsSUFBSSxHQUFHOUUsUUFBUSxDQUFDK0UsZ0JBQVQsQ0FBMEIsQ0FBQyxzQkFBRCxFQUNMSCwwQkFBMEIsSUFBSSxFQUR6QixFQUVMLEtBQUs1QyxTQUZBLEVBR0wsV0FISyxFQUlSLElBSlEsQ0FBMUIsQ0FBWCxDQTFDMEIsQ0FnRDFCOztBQUNBLE9BQUtnRCxNQUFMLEdBQWNDLFFBQVEsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXSCxJQUFYLENBQVIsQ0FBeUIsS0FBS2IsSUFBOUIsRUFBb0MsS0FBS0MsS0FBekMsQ0FBZCxDQWpEMEIsQ0FtRDFCO0FBQ0E7QUFDQTtBQUVBOztBQUNBLE9BQUssSUFBSXJCLENBQUMsR0FBRyxDQUFSLEVBQVdxQyxHQUFHLEdBQUcsS0FBS2xCLGdCQUFMLENBQXNCcEIsTUFBNUMsRUFBb0RDLENBQUMsR0FBR3FDLEdBQXhELEVBQTZELEVBQUVyQyxDQUEvRCxFQUFrRTtBQUM5RCxTQUFLbUIsZ0JBQUwsQ0FBc0JuQixDQUF0QixFQUF5QnNDLEtBQXpCLEdBQWlDLElBQWpDO0FBQ0g7O0FBQ0QsT0FBS25CLGdCQUFMLENBQXNCcEIsTUFBdEIsR0FBK0IsQ0FBL0I7QUFDSDs7QUFFRCxJQUFJd0MsS0FBSyxHQUFHdEIsTUFBTSxDQUFDbkMsU0FBbkI7O0FBRUF5RCxLQUFLLENBQUNYLGFBQU4sR0FBc0IsVUFBVVksSUFBVixFQUFnQkMsU0FBaEIsRUFBMkI7QUFDN0MsTUFBSUMsT0FBTyxHQUFHekYsRUFBRSxDQUFDMEYsWUFBSCxDQUFnQkgsSUFBaEIsQ0FBZDs7QUFDQSxNQUFJRSxPQUFKLEVBQWE7QUFDVCxRQUFJbkMsS0FBSyxHQUFHLEtBQUtlLGVBQUwsQ0FBcUJvQixPQUFyQixDQUFaOztBQUNBLFFBQUluQyxLQUFKLEVBQVc7QUFDUCxhQUFPQSxLQUFQO0FBQ0gsS0FGRCxNQUdLLElBQUlBLEtBQUssS0FBS3FDLFNBQWQsRUFBeUI7QUFDMUIsVUFBSUMsZUFBZSxHQUFHSCxPQUFPLENBQUNJLE9BQVIsQ0FBZ0IsR0FBaEIsTUFBeUIsQ0FBQyxDQUFoRDs7QUFDQSxVQUFJRCxlQUFKLEVBQXFCO0FBQ2pCLFlBQUk7QUFDQTtBQUNBQSxVQUFBQSxlQUFlLEdBQUlMLElBQUksS0FBS0osUUFBUSxDQUFDLFlBQVlNLE9BQWIsQ0FBUixFQUE1Qjs7QUFDQSxjQUFJRyxlQUFKLEVBQXFCO0FBQ2pCLGlCQUFLdkIsZUFBTCxDQUFxQm9CLE9BQXJCLElBQWdDQSxPQUFoQztBQUNBLG1CQUFPQSxPQUFQO0FBQ0g7QUFDSixTQVBELENBUUEsT0FBT25FLENBQVAsRUFBVSxDQUFFO0FBQ2Y7QUFDSjtBQUNKOztBQUNELE1BQUl3RSxLQUFLLEdBQUcsS0FBSzFCLEtBQUwsQ0FBV3lCLE9BQVgsQ0FBbUJOLElBQW5CLENBQVo7O0FBQ0EsTUFBSU8sS0FBSyxHQUFHLENBQVosRUFBZTtBQUNYQSxJQUFBQSxLQUFLLEdBQUcsS0FBSzFCLEtBQUwsQ0FBV3RCLE1BQW5CO0FBQ0EsU0FBS3NCLEtBQUwsQ0FBVy9CLElBQVgsQ0FBZ0JrRCxJQUFoQjtBQUNIOztBQUNELE1BQUlRLEdBQUcsR0FBRyxPQUFPRCxLQUFQLEdBQWUsR0FBekI7O0FBQ0EsTUFBSU4sU0FBSixFQUFlO0FBQ1hPLElBQUFBLEdBQUcsR0FBRyxNQUFNQSxHQUFOLEdBQVksR0FBbEI7QUFDSDs7QUFDRCxPQUFLMUIsZUFBTCxDQUFxQm9CLE9BQXJCLElBQWdDTSxHQUFoQztBQUNBLFNBQU9BLEdBQVA7QUFDSCxDQWpDRDs7QUFtQ0FULEtBQUssQ0FBQ1UsU0FBTixHQUFrQixVQUFVNUMsR0FBVixFQUFlO0FBQzdCLE1BQUkwQyxLQUFLLEdBQUcsS0FBSzNCLElBQUwsQ0FBVTBCLE9BQVYsQ0FBa0J6QyxHQUFsQixDQUFaOztBQUNBLE1BQUkwQyxLQUFLLEdBQUcsQ0FBWixFQUFlO0FBQ1hBLElBQUFBLEtBQUssR0FBRyxLQUFLM0IsSUFBTCxDQUFVckIsTUFBbEI7QUFDQSxTQUFLcUIsSUFBTCxDQUFVOUIsSUFBVixDQUFlZSxHQUFmO0FBQ0g7O0FBQ0QsU0FBTyxPQUFPMEMsS0FBUCxHQUFlLEdBQXRCO0FBQ0gsQ0FQRDs7QUFTQVIsS0FBSyxDQUFDVyxZQUFOLEdBQXFCLFVBQVUvRCxTQUFWLEVBQXFCZ0UsWUFBckIsRUFBbUNDLFFBQW5DLEVBQTZDNUQsZ0JBQTdDLEVBQStEO0FBQ2hGLE1BQUk2RCxXQUFXLEdBQUc5RCxXQUFXLENBQUNZLElBQVosQ0FBaUJHLEdBQWpCLENBQXFCZCxnQkFBckIsQ0FBbEI7QUFDQSxNQUFJOEQsZ0JBQWdCLEdBQUdILFlBQVksQ0FBQzFFLFdBQWIsQ0FBeUI4RSxTQUFoRDs7QUFDQSxNQUFJLENBQUNELGdCQUFMLEVBQXVCO0FBQ25CQSxJQUFBQSxnQkFBZ0IsR0FBR3ZDLE1BQU0sQ0FBQ3lDLElBQVAsQ0FBWUwsWUFBWixDQUFuQjtBQUNIOztBQUNELE9BQUssSUFBSW5ELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdzRCxnQkFBZ0IsQ0FBQ3ZELE1BQXJDLEVBQTZDQyxDQUFDLEVBQTlDLEVBQWtEO0FBQzlDLFFBQUl5RCxRQUFRLEdBQUdILGdCQUFnQixDQUFDdEQsQ0FBRCxDQUEvQjtBQUNBLFFBQUkwRCxJQUFJLEdBQUdOLFFBQVEsQ0FBQ0ssUUFBRCxDQUFuQjs7QUFDQSxRQUFJTixZQUFZLENBQUNNLFFBQUQsQ0FBWixLQUEyQkMsSUFBL0IsRUFBcUM7QUFDakM7QUFDSDs7QUFDRCxRQUFJN0UsVUFBVSxHQUFHLEtBQUs4RSxjQUFMLENBQW9CUCxRQUFwQixFQUE4QkssUUFBOUIsRUFBd0NDLElBQXhDLENBQWpCO0FBQ0FMLElBQUFBLFdBQVcsQ0FBQzFELE1BQVosQ0FBbUI4RCxRQUFuQixFQUE2QjVFLFVBQTdCO0FBQ0g7O0FBQ0R3RSxFQUFBQSxXQUFXLENBQUN4RCxTQUFaLENBQXNCVixTQUF0QjtBQUNBSSxFQUFBQSxXQUFXLENBQUNZLElBQVosQ0FBaUJ5RCxHQUFqQixDQUFxQlAsV0FBckI7QUFDSCxDQWpCRDs7QUFtQkFkLEtBQUssQ0FBQ3NCLGdCQUFOLEdBQXlCLFVBQVUxRSxTQUFWLEVBQXFCa0IsR0FBckIsRUFBMEJ5RCxLQUExQixFQUFpQztBQUN0RCxNQUFJQyxLQUFLLEdBQUdELEtBQUssQ0FBQ0UsVUFBbEI7QUFDQSxNQUFJQyxLQUFLLEdBQUdqSCxJQUFJLENBQUNrSCxhQUFMLENBQW1CSixLQUFuQixDQUFaOztBQUNBLE9BQUssSUFBSUssQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0osS0FBSyxDQUFDaEUsTUFBMUIsRUFBa0NvRSxDQUFDLEVBQW5DLEVBQXVDO0FBQ25DLFFBQUl2RSxHQUFHLEdBQUdtRSxLQUFLLENBQUNJLENBQUQsQ0FBZjtBQUNBLFFBQUlDLEdBQUcsR0FBRy9ELEdBQUcsQ0FBQ1QsR0FBRCxDQUFiO0FBQ0EsUUFBSXVELFlBQVksR0FBR2MsS0FBSyxDQUFDckUsR0FBRyxHQUFHeEMsT0FBUCxDQUF4Qjs7QUFDQSxRQUFJcUQsZUFBZSxDQUFDMEMsWUFBRCxFQUFlaUIsR0FBZixDQUFuQixFQUF3QztBQUNwQztBQUNIOztBQUNELFFBQUksT0FBT0EsR0FBUCxLQUFlLFFBQWYsSUFBMkJBLEdBQUcsWUFBWXhELEVBQUUsQ0FBQ0MsU0FBakQsRUFBNEQ7QUFDeERzQyxNQUFBQSxZQUFZLEdBQUdqRyxPQUFPLENBQUNtSCxVQUFSLENBQW1CbEIsWUFBbkIsQ0FBZjs7QUFDQSxVQUFJQSxZQUFZLElBQUlBLFlBQVksQ0FBQzFFLFdBQWIsS0FBNkIyRixHQUFHLENBQUMzRixXQUFyRCxFQUFrRTtBQUM5RDtBQUNBLFlBQUllLGdCQUFnQixHQUFHL0IsU0FBUyxHQUFHeUMsZUFBZSxDQUFDTixHQUFELENBQWxEO0FBQ0EsYUFBS3NELFlBQUwsQ0FBa0IvRCxTQUFsQixFQUE2QmdFLFlBQTdCLEVBQTJDaUIsR0FBM0MsRUFBZ0Q1RSxnQkFBaEQ7QUFDQTtBQUNIO0FBQ0o7O0FBQ0QsU0FBSzhFLFVBQUwsQ0FBZ0JuRixTQUFoQixFQUEyQmtCLEdBQTNCLEVBQWdDVCxHQUFoQyxFQUFxQ3dFLEdBQXJDO0FBQ0g7QUFDSixDQXJCRDs7QUF1QkE3QixLQUFLLENBQUNnQyxnQkFBTixHQUF5QixVQUFVNUQsS0FBVixFQUFpQjtBQUN0QyxNQUFJQSxLQUFLLENBQUNaLE1BQU4sS0FBaUIsQ0FBckIsRUFBd0I7QUFDcEIsV0FBTyxJQUFQO0FBQ0g7O0FBRUQsTUFBSXlFLFFBQVEsR0FBRzdHLFdBQVcsR0FBSSxFQUFFLEtBQUtnRSxlQUFyQztBQUNBLE1BQUk4QyxXQUFXLEdBQUcsSUFBSTlGLFdBQUosQ0FBZ0I2RixRQUFoQixFQUEwQixlQUFlN0QsS0FBSyxDQUFDWixNQUFyQixHQUE4QixHQUF4RCxDQUFsQjtBQUNBLE1BQUlaLFNBQVMsR0FBRyxDQUFDc0YsV0FBRCxDQUFoQixDQVBzQyxDQVN0Qzs7QUFDQXhILEVBQUFBLEVBQUUsQ0FBQzBELEtBQUgsQ0FBU0EsS0FBVCxFQUFnQixPQUFoQixFQUF5QjtBQUNyQmtCLElBQUFBLFNBQVMsRUFBRSxFQURVO0FBQ0Q7QUFDcEI2QyxJQUFBQSxNQUFNLEVBQUV2RixTQUZhLENBRUQ7O0FBRkMsR0FBekIsRUFHRyxJQUhIO0FBSUEsT0FBS2dDLGdCQUFMLENBQXNCN0IsSUFBdEIsQ0FBMkJxQixLQUEzQjs7QUFFQSxPQUFLLElBQUlYLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdXLEtBQUssQ0FBQ1osTUFBMUIsRUFBa0MsRUFBRUMsQ0FBcEMsRUFBdUM7QUFDbkMsUUFBSWYsU0FBUyxHQUFHdUYsUUFBUSxHQUFHLEdBQVgsR0FBaUJ4RSxDQUFqQixHQUFxQixJQUFyQztBQUNBLFFBQUluQixVQUFVLEdBQUcsS0FBSzhFLGNBQUwsQ0FBb0JoRCxLQUFwQixFQUEyQlgsQ0FBM0IsRUFBOEJXLEtBQUssQ0FBQ1gsQ0FBRCxDQUFuQyxDQUFqQjtBQUNBZCxJQUFBQSxlQUFlLENBQUNDLFNBQUQsRUFBWUYsU0FBWixFQUF1QkosVUFBdkIsQ0FBZjtBQUNIOztBQUNELFNBQU9NLFNBQVA7QUFDSCxDQXRCRDs7QUF3QkFvRCxLQUFLLENBQUNvQyxxQkFBTixHQUE4QixVQUFVaEUsS0FBVixFQUFpQjtBQUMzQyxNQUFJaUUsSUFBSSxHQUFHakUsS0FBSyxDQUFDbEMsV0FBTixDQUFrQlYsSUFBbEIsSUFBMEJTLGlCQUFpQixDQUFDbUMsS0FBSyxDQUFDbEMsV0FBUCxDQUF0RDs7QUFDQSxNQUFJa0MsS0FBSyxDQUFDWixNQUFOLEtBQWlCLENBQXJCLEVBQXdCO0FBQ3BCLFdBQU8sU0FBUzZFLElBQWhCO0FBQ0g7O0FBRUQsTUFBSUosUUFBUSxHQUFHN0csV0FBVyxHQUFJLEVBQUUsS0FBS2dFLGVBQXJDO0FBQ0EsTUFBSThDLFdBQVcsR0FBRyxJQUFJOUYsV0FBSixDQUFnQjZGLFFBQWhCLEVBQTBCLFNBQVNJLElBQVQsR0FBZ0IsR0FBaEIsR0FBc0JqRSxLQUFLLENBQUNaLE1BQTVCLEdBQXFDLEdBQS9ELENBQWxCO0FBQ0EsTUFBSVosU0FBUyxHQUFHLENBQUNzRixXQUFELENBQWhCLENBUjJDLENBVTNDOztBQUNBOUQsRUFBQUEsS0FBSyxDQUFDMkIsS0FBTixHQUFjO0FBQ1ZULElBQUFBLFNBQVMsRUFBRSxFQUREO0FBQ1U7QUFDcEI2QyxJQUFBQSxNQUFNLEVBQUV2RixTQUZFLENBRVU7O0FBRlYsR0FBZDtBQUlBLE9BQUtnQyxnQkFBTCxDQUFzQjdCLElBQXRCLENBQTJCcUIsS0FBM0I7O0FBRUEsT0FBSyxJQUFJWCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHVyxLQUFLLENBQUNaLE1BQTFCLEVBQWtDLEVBQUVDLENBQXBDLEVBQXVDO0FBQ25DLFFBQUlXLEtBQUssQ0FBQ1gsQ0FBRCxDQUFMLEtBQWEsQ0FBakIsRUFBb0I7QUFDaEIsVUFBSWYsU0FBUyxHQUFHdUYsUUFBUSxHQUFHLEdBQVgsR0FBaUJ4RSxDQUFqQixHQUFxQixJQUFyQztBQUNBZCxNQUFBQSxlQUFlLENBQUNDLFNBQUQsRUFBWUYsU0FBWixFQUF1QjBCLEtBQUssQ0FBQ1gsQ0FBRCxDQUE1QixDQUFmO0FBQ0g7QUFDSjs7QUFDRCxTQUFPYixTQUFQO0FBQ0gsQ0F4QkQ7O0FBMEJBb0QsS0FBSyxDQUFDb0IsY0FBTixHQUF1QixVQUFVdEQsR0FBVixFQUFlVCxHQUFmLEVBQW9CZSxLQUFwQixFQUEyQjtBQUM5QyxNQUFJLE9BQU9BLEtBQVAsS0FBaUIsUUFBakIsSUFBNkJBLEtBQWpDLEVBQXdDO0FBQ3BDLFFBQUkyQixLQUFLLEdBQUczQixLQUFLLENBQUMyQixLQUFsQjs7QUFDQSxRQUFJQSxLQUFKLEVBQVc7QUFDUDtBQUNBLFVBQUlULFNBQVMsR0FBR1MsS0FBSyxDQUFDVCxTQUF0Qjs7QUFDQSxVQUFJLENBQUNBLFNBQUwsRUFBZ0I7QUFDWjtBQUNBQSxRQUFBQSxTQUFTLEdBQUdTLEtBQUssQ0FBQ1QsU0FBTixHQUFrQixNQUFPLEVBQUUsS0FBS0gsZ0JBQTVDO0FBQ0EsYUFBS0QsZUFBTCxDQUFxQm5DLElBQXJCLENBQTBCdUMsU0FBMUIsRUFIWSxDQUlaOztBQUNBLFlBQUlnRCxJQUFJLEdBQUd2QyxLQUFLLENBQUNvQyxNQUFOLENBQWE5RyxxQkFBYixDQUFYO0FBQ0EwRSxRQUFBQSxLQUFLLENBQUNvQyxNQUFOLENBQWE5RyxxQkFBYixJQUFzQ29CLGdCQUFnQixDQUFDNkMsU0FBUyxHQUFHLEdBQWIsRUFBa0JnRCxJQUFsQixDQUF0RCxDQU5ZLENBT1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIOztBQUNELGFBQU9oRCxTQUFQO0FBQ0gsS0FqQkQsTUFrQkssSUFBSWlELFdBQVcsQ0FBQ0MsTUFBWixDQUFtQnBFLEtBQW5CLENBQUosRUFBK0I7QUFDaEMsYUFBTyxLQUFLZ0UscUJBQUwsQ0FBMkJoRSxLQUEzQixDQUFQO0FBQ0gsS0FGSSxNQUdBLElBQUl2QixLQUFLLENBQUNDLE9BQU4sQ0FBY3NCLEtBQWQsQ0FBSixFQUEwQjtBQUMzQixhQUFPLEtBQUs0RCxnQkFBTCxDQUFzQjVELEtBQXRCLENBQVA7QUFDSCxLQUZJLE1BR0E7QUFDRCxhQUFPLEtBQUtxRSxjQUFMLENBQW9CckUsS0FBcEIsQ0FBUDtBQUNIO0FBQ0osR0E3QkQsTUE4QkssSUFBSSxPQUFPQSxLQUFQLEtBQWlCLFVBQXJCLEVBQWlDO0FBQ2xDLFdBQU8sS0FBS2lCLGFBQUwsQ0FBbUJqQixLQUFuQixDQUFQO0FBQ0gsR0FGSSxNQUdBLElBQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUNoQyxXQUFPcEQsV0FBVyxDQUFDb0QsS0FBRCxDQUFsQjtBQUNILEdBRkksTUFHQTtBQUNELFFBQUlmLEdBQUcsS0FBSyxXQUFSLElBQXdCUyxHQUFHLFlBQVkxRCxRQUEzQyxFQUFzRDtBQUNsRGdFLE1BQUFBLEtBQUssSUFBSTVELGNBQVQ7QUFDSDs7QUFDRCxXQUFPNEQsS0FBUDtBQUNIO0FBQ0osQ0EzQ0Q7O0FBNkNBNEIsS0FBSyxDQUFDK0IsVUFBTixHQUFtQixVQUFVbkYsU0FBVixFQUFxQmtCLEdBQXJCLEVBQTBCVCxHQUExQixFQUErQmUsS0FBL0IsRUFBc0M7QUFDckQsTUFBSTFCLFNBQVMsR0FBR3hCLFNBQVMsR0FBR3lDLGVBQWUsQ0FBQ04sR0FBRCxDQUEzQixHQUFtQyxHQUFuRDtBQUNBLE1BQUlmLFVBQVUsR0FBRyxLQUFLOEUsY0FBTCxDQUFvQnRELEdBQXBCLEVBQXlCVCxHQUF6QixFQUE4QmUsS0FBOUIsQ0FBakI7QUFDQXpCLEVBQUFBLGVBQWUsQ0FBQ0MsU0FBRCxFQUFZRixTQUFaLEVBQXVCSixVQUF2QixDQUFmO0FBQ0gsQ0FKRCxFQU1BOzs7QUFDQTBELEtBQUssQ0FBQ1QsZUFBTixHQUF3QixVQUFVM0MsU0FBVixFQUFxQmtCLEdBQXJCLEVBQTBCO0FBQzlDLE1BQUl5RCxLQUFLLEdBQUd6RCxHQUFHLENBQUM1QixXQUFoQjs7QUFDQSxNQUFJbUMsRUFBRSxDQUFDcUUsS0FBSCxDQUFTQyxVQUFULENBQW9CcEIsS0FBcEIsQ0FBSixFQUFnQztBQUM1QixTQUFLRCxnQkFBTCxDQUFzQjFFLFNBQXRCLEVBQWlDa0IsR0FBakMsRUFBc0N5RCxLQUF0QztBQUNILEdBRkQsTUFHSztBQUNEO0FBQ0EsU0FBSyxJQUFJbEUsR0FBVCxJQUFnQlMsR0FBaEIsRUFBcUI7QUFDakIsVUFBSSxDQUFDQSxHQUFHLENBQUM4RSxjQUFKLENBQW1CdkYsR0FBbkIsQ0FBRCxJQUNDQSxHQUFHLENBQUN3RixVQUFKLENBQWUsQ0FBZixNQUFzQixFQUF0QixJQUE0QnhGLEdBQUcsQ0FBQ3dGLFVBQUosQ0FBZSxDQUFmLE1BQXNCLEVBQWxELElBQTBEO0FBQzFEeEYsTUFBQUEsR0FBRyxLQUFLLFVBRmIsRUFHRTtBQUNFO0FBQ0g7O0FBQ0QsVUFBSWUsS0FBSyxHQUFHTixHQUFHLENBQUNULEdBQUQsQ0FBZjs7QUFDQSxVQUFJLE9BQU9lLEtBQVAsS0FBaUIsUUFBakIsSUFBNkJBLEtBQTdCLElBQXNDQSxLQUFLLEtBQUtOLEdBQUcsQ0FBQ2lDLEtBQXhELEVBQStEO0FBQzNEO0FBQ0g7O0FBQ0QsV0FBS2dDLFVBQUwsQ0FBZ0JuRixTQUFoQixFQUEyQmtCLEdBQTNCLEVBQWdDVCxHQUFoQyxFQUFxQ2UsS0FBckM7QUFDSDtBQUNKO0FBQ0osQ0FyQkQ7O0FBdUJBNEIsS0FBSyxDQUFDeUMsY0FBTixHQUF1QixVQUFVM0UsR0FBVixFQUFlO0FBQ2xDLE1BQUlBLEdBQUcsWUFBWU8sRUFBRSxDQUFDQyxTQUF0QixFQUFpQztBQUM3QixXQUFPM0QsT0FBTyxDQUFDbUksbUJBQVIsQ0FBNEJoRixHQUE1QixDQUFQO0FBQ0g7O0FBQ0QsTUFBSUEsR0FBRyxZQUFZTyxFQUFFLENBQUMwRSxLQUF0QixFQUE2QjtBQUN6QjtBQUNBLFdBQU8sS0FBS3JDLFNBQUwsQ0FBZTVDLEdBQWYsQ0FBUDtBQUNIOztBQUNELE1BQUlBLEdBQUcsQ0FBQ2tGLFNBQUosR0FBZ0IxSSxTQUFwQixFQUErQjtBQUMzQjtBQUNBLFdBQU8sSUFBUDtBQUNIOztBQUVELE1BQUkySSxVQUFKO0FBQ0EsTUFBSUMsSUFBSSxHQUFHcEYsR0FBRyxDQUFDNUIsV0FBZjs7QUFDQSxNQUFJbUMsRUFBRSxDQUFDcUUsS0FBSCxDQUFTQyxVQUFULENBQW9CTyxJQUFwQixDQUFKLEVBQStCO0FBQzNCLFFBQUksS0FBS3ZFLE1BQVQsRUFBaUI7QUFDYixVQUFJLEtBQUtBLE1BQUwsWUFBdUJOLEVBQUUsQ0FBQzhFLFNBQTlCLEVBQXlDO0FBQ3JDLFlBQUlyRixHQUFHLFlBQVlPLEVBQUUsQ0FBQytFLFNBQWxCLElBQStCdEYsR0FBRyxZQUFZTyxFQUFFLENBQUM4RSxTQUFyRCxFQUFnRTtBQUM1RCxpQkFBTyxLQUFLekMsU0FBTCxDQUFlNUMsR0FBZixDQUFQO0FBQ0g7QUFDSixPQUpELE1BS0ssSUFBSSxLQUFLYSxNQUFMLFlBQXVCTixFQUFFLENBQUMrRSxTQUE5QixFQUF5QztBQUMxQyxZQUFJdEYsR0FBRyxZQUFZTyxFQUFFLENBQUMrRSxTQUF0QixFQUFpQztBQUM3QixjQUFJLENBQUN0RixHQUFHLENBQUN1RixTQUFKLENBQWMsS0FBSzFFLE1BQW5CLENBQUwsRUFBaUM7QUFDN0I7QUFDQSxtQkFBTyxLQUFLK0IsU0FBTCxDQUFlNUMsR0FBZixDQUFQO0FBQ0g7QUFDSixTQUxELE1BTUssSUFBSUEsR0FBRyxZQUFZTyxFQUFFLENBQUM4RSxTQUF0QixFQUFpQztBQUNsQyxjQUFJLENBQUNyRixHQUFHLENBQUN3RixJQUFKLENBQVNELFNBQVQsQ0FBbUIsS0FBSzFFLE1BQXhCLENBQUwsRUFBc0M7QUFDbEM7QUFDQSxtQkFBTyxLQUFLK0IsU0FBTCxDQUFlNUMsR0FBZixDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7O0FBQ0RtRixJQUFBQSxVQUFVLEdBQUcsSUFBSTdHLFdBQUosQ0FBZ0JsQixTQUFoQixFQUEyQixTQUFTLEtBQUttRSxhQUFMLENBQW1CNkQsSUFBbkIsRUFBeUIsSUFBekIsQ0FBVCxHQUEwQyxJQUFyRSxDQUFiO0FBQ0gsR0F2QkQsTUF3QkssSUFBSUEsSUFBSSxLQUFLMUUsTUFBYixFQUFxQjtBQUN0QnlFLElBQUFBLFVBQVUsR0FBRyxJQUFJN0csV0FBSixDQUFnQmxCLFNBQWhCLEVBQTJCLElBQTNCLENBQWI7QUFDSCxHQUZJLE1BR0EsSUFBSSxDQUFDZ0ksSUFBTCxFQUFXO0FBQ1pELElBQUFBLFVBQVUsR0FBRyxJQUFJN0csV0FBSixDQUFnQmxCLFNBQWhCLEVBQTJCLHFCQUEzQixDQUFiO0FBQ0gsR0FGSSxNQUdBO0FBQ0Q7QUFDQSxXQUFPLEtBQUt3RixTQUFMLENBQWU1QyxHQUFmLENBQVA7QUFDSDs7QUFFRCxNQUFJbEIsU0FBUyxHQUFHLENBQUNxRyxVQUFELENBQWhCLENBbERrQyxDQW9EbEM7O0FBQ0F2SSxFQUFBQSxFQUFFLENBQUMwRCxLQUFILENBQVNOLEdBQVQsRUFBYyxPQUFkLEVBQXVCO0FBQ25Cd0IsSUFBQUEsU0FBUyxFQUFFLEVBRFE7QUFDQztBQUNwQjZDLElBQUFBLE1BQU0sRUFBRXZGLFNBRlcsQ0FFQztBQUNwQjtBQUNBOztBQUptQixHQUF2QixFQUtHLElBTEg7QUFNQSxPQUFLZ0MsZ0JBQUwsQ0FBc0I3QixJQUF0QixDQUEyQmUsR0FBM0I7QUFFQSxPQUFLeUIsZUFBTCxDQUFxQjNDLFNBQXJCLEVBQWdDa0IsR0FBaEM7QUFDQSxTQUFPLENBQUMsY0FBRCxFQUNLbEIsU0FETCxFQUVDLGdCQUZELENBQVA7QUFHSCxDQWpFRDs7QUFvRUEsU0FBUzJHLE9BQVQsQ0FBa0JELElBQWxCLEVBQXdCO0FBQ3BCLE1BQUlFLElBQUksR0FBSUYsSUFBSSxZQUFZakYsRUFBRSxDQUFDK0UsU0FBcEIsSUFBa0NFLElBQTdDO0FBQ0EsTUFBSUcsTUFBTSxHQUFHLElBQUkvRSxNQUFKLENBQVc0RSxJQUFYLEVBQWlCRSxJQUFqQixDQUFiO0FBQ0EsU0FBT0MsTUFBTSxDQUFDN0QsTUFBZDtBQUNIOztBQUVEOEQsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2JKLEVBQUFBLE9BQU8sRUFBRUEsT0FESTtBQUVickYsRUFBQUEsZUFBZSxFQUFFQTtBQUZKLENBQWpCOztBQUtBLElBQUkwRixPQUFKLEVBQWE7QUFDVHZGLEVBQUFBLEVBQUUsQ0FBQ3dGLEtBQUgsQ0FBU0MsYUFBVCxHQUF5QkosTUFBTSxDQUFDQyxPQUFoQztBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vLyBTb21lIGhlbHBlciBtZXRob2RzIGZvciBjb21waWxlIGluc3RhbnRpYXRpb24gY29kZVxuXG52YXIgQ0NPYmplY3QgPSByZXF1aXJlKCcuL0NDT2JqZWN0Jyk7XG52YXIgRGVzdHJveWVkID0gQ0NPYmplY3QuRmxhZ3MuRGVzdHJveWVkO1xudmFyIFBlcnNpc3RlbnRNYXNrID0gQ0NPYmplY3QuRmxhZ3MuUGVyc2lzdGVudE1hc2s7XG52YXIgQXR0ciA9IHJlcXVpcmUoJy4vYXR0cmlidXRlJyk7XG52YXIganMgPSByZXF1aXJlKCcuL2pzJyk7XG52YXIgQ0NDbGFzcyA9IHJlcXVpcmUoJy4vQ0NDbGFzcycpO1xudmFyIENvbXBpbGVyID0gcmVxdWlyZSgnLi9jb21waWxlcicpO1xuXG52YXIgREVGQVVMVCA9IEF0dHIuREVMSU1FVEVSICsgJ2RlZmF1bHQnO1xudmFyIElERU5USUZJRVJfUkUgPSBDQ0NsYXNzLklERU5USUZJRVJfUkU7XG52YXIgZXNjYXBlRm9ySlMgPSBDQ0NsYXNzLmVzY2FwZUZvckpTO1xuXG5jb25zdCBWQVIgPSAndmFyICc7XG5jb25zdCBMT0NBTF9PQkogPSAnbyc7XG5jb25zdCBMT0NBTF9URU1QX09CSiA9ICd0JztcbmNvbnN0IExPQ0FMX0FSUkFZID0gJ2EnO1xuY29uc3QgTElORV9JTkRFWF9PRl9ORVdfT0JKID0gMDtcblxuY29uc3QgREVGQVVMVF9NT0RVTEVfQ0FDSEUgPSB7XG4gICAgJ2NjLk5vZGUnOiAnY2MuTm9kZScsXG4gICAgJ2NjLlNwcml0ZSc6ICdjYy5TcHJpdGUnLFxuICAgICdjYy5MYWJlbCc6ICdjYy5MYWJlbCcsXG4gICAgJ2NjLkJ1dHRvbic6ICdjYy5CdXR0b24nLFxuICAgICdjYy5XaWRnZXQnOiAnY2MuV2lkZ2V0JyxcbiAgICAnY2MuQW5pbWF0aW9uJzogJ2NjLkFuaW1hdGlvbicsXG4gICAgJ2NjLkNsaWNrRXZlbnQnOiBmYWxzZSxcbiAgICAnY2MuUHJlZmFiSW5mbyc6IGZhbHNlXG59O1xuXG50cnkge1xuICAgIC8vIGNvbXBhdGlibGUgZm9yIElFXG4gICAgIUZsb2F0MzJBcnJheS5uYW1lICYmIChGbG9hdDMyQXJyYXkubmFtZSA9ICdGbG9hdDMyQXJyYXknKTtcbiAgICAhRmxvYXQ2NEFycmF5Lm5hbWUgJiYgKEZsb2F0NjRBcnJheS5uYW1lID0gJ0Zsb2F0NjRBcnJheScpO1xuXG4gICAgIUludDhBcnJheS5uYW1lICYmIChJbnQ4QXJyYXkubmFtZSA9ICdJbnQ4QXJyYXknKTtcbiAgICAhSW50MTZBcnJheS5uYW1lICYmIChJbnQxNkFycmF5Lm5hbWUgPSAnSW50MTZBcnJheScpO1xuICAgICFJbnQzMkFycmF5Lm5hbWUgJiYgKEludDMyQXJyYXkubmFtZSA9ICdJbnQzMkFycmF5Jyk7XG5cbiAgICAhVWludDhBcnJheS5uYW1lICYmIChVaW50OEFycmF5Lm5hbWUgPSAnVWludDhBcnJheScpO1xuICAgICFVaW50MTZBcnJheS5uYW1lICYmIChVaW50MTZBcnJheS5uYW1lID0gJ1VpbnQxNkFycmF5Jyk7XG4gICAgIVVpbnQzMkFycmF5Lm5hbWUgJiYgKFVpbnQzMkFycmF5Lm5hbWUgPSAnVWludDMyQXJyYXknKTtcbn1cbmNhdGNoIChlKSB7fVxuXG4vLyBjb21wYXRpYmxlIGZvciBpT1MgOVxuZnVuY3Rpb24gZ2V0VHlwZWRBcnJheU5hbWUgKGNvbnN0cnVjdG9yKSB7XG4gICAgaWYgKGNvbnN0cnVjdG9yID09PSBGbG9hdDMyQXJyYXkpIHsgcmV0dXJuICdGbG9hdDMyQXJyYXknOyB9XG4gICAgZWxzZSBpZiAoY29uc3RydWN0b3IgPT09IEZsb2F0NjRBcnJheSkgeyByZXR1cm4gJ0Zsb2F0NjRBcnJheSc7IH1cblxuICAgIGVsc2UgaWYgKGNvbnN0cnVjdG9yID09PSBJbnQ4QXJyYXkpIHsgcmV0dXJuICdJbnQ4QXJyYXknOyB9XG4gICAgZWxzZSBpZiAoY29uc3RydWN0b3IgPT09IEludDE2QXJyYXkpIHsgcmV0dXJuICdJbnQxNkFycmF5JzsgfVxuICAgIGVsc2UgaWYgKGNvbnN0cnVjdG9yID09PSBJbnQzMkFycmF5KSB7IHJldHVybiAnSW50MzJBcnJheSc7IH1cblxuICAgIGVsc2UgaWYgKGNvbnN0cnVjdG9yID09PSBVaW50OEFycmF5KSB7IHJldHVybiAnVWludDhBcnJheSc7IH1cbiAgICBlbHNlIGlmIChjb25zdHJ1Y3RvciA9PT0gVWludDE2QXJyYXkpIHsgcmV0dXJuICdVaW50MTZBcnJheSc7IH1cbiAgICBlbHNlIGlmIChjb25zdHJ1Y3RvciA9PT0gVWludDMyQXJyYXkpIHsgcmV0dXJuICdVaW50MzJBcnJheSc7IH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIFR5cGVkQXJyYXkgY291bGQgbm90IGJlIGluc3RhbnRpYXRlZDogJHtjb25zdHJ1Y3Rvcn1gKTtcbiAgICB9XG59XG5cbi8vIEhFTFBFUiBDTEFTU0VTXG5cbi8vICgnZm9vJywgJ2JhcicpXG4vLyAtPiAndmFyIGZvbyA9IGJhcjsnXG5mdW5jdGlvbiBEZWNsYXJhdGlvbiAodmFyTmFtZSwgZXhwcmVzc2lvbikge1xuICAgIHRoaXMudmFyTmFtZSA9IHZhck5hbWU7XG4gICAgdGhpcy5leHByZXNzaW9uID0gZXhwcmVzc2lvbjtcbn1cbkRlY2xhcmF0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gVkFSICsgdGhpcy52YXJOYW1lICsgJz0nICsgdGhpcy5leHByZXNzaW9uICsgJzsnO1xufTtcblxuLy8gKCdhID0nLCAndmFyIGIgPSB4Jylcbi8vIC0+ICd2YXIgYiA9IGEgPSB4Jztcbi8vICgnYSA9JywgJ3gnKVxuLy8gLT4gJ2EgPSB4JztcbmZ1bmN0aW9uIG1lcmdlRGVjbGFyYXRpb24gKHN0YXRlbWVudCwgZXhwcmVzc2lvbikge1xuICAgIGlmIChleHByZXNzaW9uIGluc3RhbmNlb2YgRGVjbGFyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEZWNsYXJhdGlvbihleHByZXNzaW9uLnZhck5hbWUsIHN0YXRlbWVudCArIGV4cHJlc3Npb24uZXhwcmVzc2lvbik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gc3RhdGVtZW50ICsgZXhwcmVzc2lvbjtcbiAgICB9XG59XG5cbi8vICgnYScsIFsndmFyIGIgPSB4JywgJ2IuZm9vID0gYmFyJ10pXG4vLyAtPiAndmFyIGIgPSBhID0geDsnXG4vLyAtPiAnYi5mb28gPSBiYXI7J1xuLy8gKCdhJywgJ3ZhciBiID0geCcpXG4vLyAtPiAndmFyIGIgPSBhID0geDsnXG4vLyAoJ2EnLCAneCcpXG4vLyAtPiAnYSA9IHg7J1xuZnVuY3Rpb24gd3JpdGVBc3NpZ25tZW50IChjb2RlQXJyYXksIHN0YXRlbWVudCwgZXhwcmVzc2lvbikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGV4cHJlc3Npb24pKSB7XG4gICAgICAgIGV4cHJlc3Npb25bMF0gPSBtZXJnZURlY2xhcmF0aW9uKHN0YXRlbWVudCwgZXhwcmVzc2lvblswXSk7XG4gICAgICAgIGNvZGVBcnJheS5wdXNoKGV4cHJlc3Npb24pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29kZUFycmF5LnB1c2gobWVyZ2VEZWNsYXJhdGlvbihzdGF0ZW1lbnQsIGV4cHJlc3Npb24pICsgJzsnKTtcbiAgICB9XG59XG5cbi8vICgnZm9vJywgJ2JhcicpXG4vLyAtPiAndGFyZ2V0RXhwcmVzc2lvbi5mb28gPSBiYXInXG4vLyAoJ2ZvbzEnLCAnYmFyMScpXG4vLyAoJ2ZvbzInLCAnYmFyMicpXG4vLyAtPiAndCA9IHRhcmdldEV4cHJlc3Npb247J1xuLy8gLT4gJ3QuZm9vMSA9IGJhcjE7J1xuLy8gLT4gJ3QuZm9vMiA9IGJhcjI7J1xuZnVuY3Rpb24gQXNzaWdubWVudHMgKHRhcmdldEV4cHJlc3Npb24pIHtcbiAgICB0aGlzLl9leHBzID0gW107XG4gICAgdGhpcy5fdGFyZ2V0RXhwID0gdGFyZ2V0RXhwcmVzc2lvbjtcbn1cbkFzc2lnbm1lbnRzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiAoa2V5LCBleHByZXNzaW9uKSB7XG4gICAgdGhpcy5fZXhwcy5wdXNoKFtrZXksIGV4cHJlc3Npb25dKTtcbn07XG5Bc3NpZ25tZW50cy5wcm90b3R5cGUud3JpdGVDb2RlID0gZnVuY3Rpb24gKGNvZGVBcnJheSkge1xuICAgIHZhciB0YXJnZXRWYXI7XG4gICAgaWYgKHRoaXMuX2V4cHMubGVuZ3RoID4gMSkge1xuICAgICAgICBjb2RlQXJyYXkucHVzaChMT0NBTF9URU1QX09CSiArICc9JyArIHRoaXMuX3RhcmdldEV4cCArICc7Jyk7XG4gICAgICAgIHRhcmdldFZhciA9IExPQ0FMX1RFTVBfT0JKO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLl9leHBzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0YXJnZXRWYXIgPSB0aGlzLl90YXJnZXRFeHA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZXhwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGFpciA9IHRoaXMuX2V4cHNbaV07XG4gICAgICAgIHdyaXRlQXNzaWdubWVudChjb2RlQXJyYXksIHRhcmdldFZhciArIGdldFByb3BBY2Nlc3NvcihwYWlyWzBdKSArICc9JywgcGFpclsxXSk7XG4gICAgfVxufTtcblxuQXNzaWdubWVudHMucG9vbCA9IG5ldyBqcy5Qb29sKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLl9leHBzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5fdGFyZ2V0RXhwID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxKTtcbkFzc2lnbm1lbnRzLnBvb2wuZ2V0ID0gZnVuY3Rpb24gKHRhcmdldEV4cHJlc3Npb24pIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLl9nZXQoKSB8fCBuZXcgQXNzaWdubWVudHMoKTtcbiAgICBjYWNoZS5fdGFyZ2V0RXhwID0gdGFyZ2V0RXhwcmVzc2lvbjtcbiAgICByZXR1cm4gY2FjaGU7XG59O1xuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG5cbmZ1bmN0aW9uIGVxdWFsc1RvRGVmYXVsdCAoZGVmLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkZWYgPSBkZWYoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChkZWYgPT09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoZGVmICYmIHZhbHVlKSB7XG4gICAgICAgIGlmIChkZWYgaW5zdGFuY2VvZiBjYy5WYWx1ZVR5cGUgJiYgZGVmLmVxdWFscyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoQXJyYXkuaXNBcnJheShkZWYpICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB8fFxuICAgICAgICAgICAgKGRlZi5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0ICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBPYmplY3QpXG4gICAgICAgICkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShkZWYpICYmIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIGRlZi5sZW5ndGggPT09IDAgJiYgdmFsdWUubGVuZ3RoID09PSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldFByb3BBY2Nlc3NvciAoa2V5KSB7XG4gICAgcmV0dXJuIElERU5USUZJRVJfUkUudGVzdChrZXkpID8gKCcuJyArIGtleSkgOiAoJ1snICsgZXNjYXBlRm9ySlMoa2V5KSArICddJyk7XG59XG5cbi8vXG5cbi8qXG4gKiBWYXJpYWJsZXM6XG4gKiB7T2JqZWN0W119IE8gLSBvYmpzIGxpc3RcbiAqIHtGdW5jdGlvbltdfSBGIC0gY29uc3RydWN0b3IgbGlzdFxuICoge05vZGV9IFtSXSAtIHNwZWNpZnkgYW4gaW5zdGFudGlhdGVkIHByZWZhYlJvb3QgdGhhdCBhbGwgcmVmZXJlbmNlcyB0byBwcmVmYWJSb290IGluIHByZWZhYiB3aWxsIHJlZGlyZWN0IHRvXG4gKiB7T2JqZWN0fSBvIC0gY3VycmVudCBjcmVhdGluZyBvYmplY3RcbiAqL1xuXG4vKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIHRoZSBvYmplY3QgdG8gcGFyc2VcbiAqIEBwYXJhbSB7Tm9kZX0gW3BhcmVudF1cbiAqL1xuZnVuY3Rpb24gUGFyc2VyIChvYmosIHBhcmVudCkge1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuXG4gICAgdGhpcy5vYmpzVG9DbGVhcl9pTiR0ID0gW107ICAgLy8gdXNlZCB0byByZXNldCBfaU4kdCB2YXJpYWJsZVxuICAgIHRoaXMuY29kZUFycmF5ID0gW107XG5cbiAgICAvLyBkYXRhcyBmb3IgZ2VuZXJhdGVkIGNvZGVcbiAgICB0aGlzLm9ianMgPSBbXTtcbiAgICB0aGlzLmZ1bmNzID0gW107XG5cbiAgICB0aGlzLmZ1bmNNb2R1bGVDYWNoZSA9IGpzLmNyZWF0ZU1hcCgpO1xuICAgIGpzLm1peGluKHRoaXMuZnVuY01vZHVsZUNhY2hlLCBERUZBVUxUX01PRFVMRV9DQUNIRSk7XG5cbiAgICAvLyB7U3RyaW5nW119IC0gdmFyaWFibGUgbmFtZXMgZm9yIGNpcmN1bGFyIHJlZmVyZW5jZXMsXG4gICAgLy8gICAgICAgICAgICAgIG5vdCByZWFsbHkgZ2xvYmFsLCBqdXN0IGxvY2FsIHZhcmlhYmxlcyBzaGFyZWQgYmV0d2VlbiBzdWIgZnVuY3Rpb25zXG4gICAgdGhpcy5nbG9iYWxWYXJpYWJsZXMgPSBbXTtcbiAgICAvLyBpbmNyZW1lbnRhbCBpZCBmb3IgbmV3IGdsb2JhbCB2YXJpYWJsZXNcbiAgICB0aGlzLmdsb2JhbFZhcmlhYmxlSWQgPSAwO1xuICAgIC8vIGluY3JlbWVudGFsIGlkIGZvciBuZXcgbG9jYWwgdmFyaWFibGVzXG4gICAgdGhpcy5sb2NhbFZhcmlhYmxlSWQgPSAwO1xuXG4gICAgLy8gZ2VuZXJhdGUgY29kZUFycmF5XG4gICAgLy9pZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgLy8gICAgdGhpcy5jb2RlQXJyYXkucHVzaCh0aGlzLmluc3RhbnRpYXRlQXJyYXkob2JqKSk7XG4gICAgLy99XG4gICAgLy9lbHNlIHtcbiAgICAgICAgdGhpcy5jb2RlQXJyYXkucHVzaChWQVIgKyBMT0NBTF9PQkogKyAnLCcgKyBMT0NBTF9URU1QX09CSiArICc7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZihSKXsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMT0NBTF9PQkogKyAnPVI7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd9ZWxzZXsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMT0NBTF9PQkogKyAnPVI9bmV3ICcgKyB0aGlzLmdldEZ1bmNNb2R1bGUob2JqLmNvbnN0cnVjdG9yLCB0cnVlKSArICcoKTsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30nKTtcbiAgICAgICAganMudmFsdWUob2JqLCAnX2lOJHQnLCB7IGdsb2JhbFZhcjogJ1InIH0sIHRydWUpO1xuICAgICAgICB0aGlzLm9ianNUb0NsZWFyX2lOJHQucHVzaChvYmopO1xuICAgICAgICB0aGlzLmVudW1lcmF0ZU9iamVjdCh0aGlzLmNvZGVBcnJheSwgb2JqKTtcbiAgICAvL31cblxuICAgIC8vIGdlbmVyYXRlIGNvZGVcbiAgICB2YXIgZ2xvYmFsVmFyaWFibGVzRGVjbGFyYXRpb247XG4gICAgaWYgKHRoaXMuZ2xvYmFsVmFyaWFibGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZ2xvYmFsVmFyaWFibGVzRGVjbGFyYXRpb24gPSBWQVIgKyB0aGlzLmdsb2JhbFZhcmlhYmxlcy5qb2luKCcsJykgKyAnOyc7XG4gICAgfVxuICAgIHZhciBjb2RlID0gQ29tcGlsZXIuZmxhdHRlbkNvZGVBcnJheShbJ3JldHVybiAoZnVuY3Rpb24oUil7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbFZhcmlhYmxlc0RlY2xhcmF0aW9uIHx8IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2RlQXJyYXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmV0dXJuIG87JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9KSddKTtcblxuICAgIC8vIGdlbmVyYXRlIG1ldGhvZCBhbmQgYmluZCB3aXRoIG9ianNcbiAgICB0aGlzLnJlc3VsdCA9IEZ1bmN0aW9uKCdPJywgJ0YnLCBjb2RlKSh0aGlzLm9ianMsIHRoaXMuZnVuY3MpO1xuXG4gICAgLy8gaWYgKENDX1RFU1QgJiYgIWlzUGhhbnRvbUpTKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGNvZGUpO1xuICAgIC8vIH1cblxuICAgIC8vIGNsZWFudXBcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5vYmpzVG9DbGVhcl9pTiR0Lmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIHRoaXMub2Jqc1RvQ2xlYXJfaU4kdFtpXS5faU4kdCA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMub2Jqc1RvQ2xlYXJfaU4kdC5sZW5ndGggPSAwO1xufVxuXG52YXIgcHJvdG8gPSBQYXJzZXIucHJvdG90eXBlO1xuXG5wcm90by5nZXRGdW5jTW9kdWxlID0gZnVuY3Rpb24gKGZ1bmMsIHVzZWRJbk5ldykge1xuICAgIHZhciBjbHNOYW1lID0ganMuZ2V0Q2xhc3NOYW1lKGZ1bmMpO1xuICAgIGlmIChjbHNOYW1lKSB7XG4gICAgICAgIHZhciBjYWNoZSA9IHRoaXMuZnVuY01vZHVsZUNhY2hlW2Nsc05hbWVdO1xuICAgICAgICBpZiAoY2FjaGUpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjYWNoZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgY2xzTmFtZUlzTW9kdWxlID0gY2xzTmFtZS5pbmRleE9mKCcuJykgIT09IC0xO1xuICAgICAgICAgICAgaWYgKGNsc05hbWVJc01vZHVsZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVuc3VyZSBpcyBtb2R1bGVcbiAgICAgICAgICAgICAgICAgICAgY2xzTmFtZUlzTW9kdWxlID0gKGZ1bmMgPT09IEZ1bmN0aW9uKCdyZXR1cm4gJyArIGNsc05hbWUpKCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xzTmFtZUlzTW9kdWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZ1bmNNb2R1bGVDYWNoZVtjbHNOYW1lXSA9IGNsc05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgaW5kZXggPSB0aGlzLmZ1bmNzLmluZGV4T2YoZnVuYyk7XG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICBpbmRleCA9IHRoaXMuZnVuY3MubGVuZ3RoO1xuICAgICAgICB0aGlzLmZ1bmNzLnB1c2goZnVuYyk7XG4gICAgfVxuICAgIHZhciByZXMgPSAnRlsnICsgaW5kZXggKyAnXSc7XG4gICAgaWYgKHVzZWRJbk5ldykge1xuICAgICAgICByZXMgPSAnKCcgKyByZXMgKyAnKSc7XG4gICAgfVxuICAgIHRoaXMuZnVuY01vZHVsZUNhY2hlW2Nsc05hbWVdID0gcmVzO1xuICAgIHJldHVybiByZXM7XG59O1xuXG5wcm90by5nZXRPYmpSZWYgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5vYmpzLmluZGV4T2Yob2JqKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIGluZGV4ID0gdGhpcy5vYmpzLmxlbmd0aDtcbiAgICAgICAgdGhpcy5vYmpzLnB1c2gob2JqKTtcbiAgICB9XG4gICAgcmV0dXJuICdPWycgKyBpbmRleCArICddJztcbn07XG5cbnByb3RvLnNldFZhbHVlVHlwZSA9IGZ1bmN0aW9uIChjb2RlQXJyYXksIGRlZmF1bHRWYWx1ZSwgc3JjVmFsdWUsIHRhcmdldEV4cHJlc3Npb24pIHtcbiAgICB2YXIgYXNzaWdubWVudHMgPSBBc3NpZ25tZW50cy5wb29sLmdldCh0YXJnZXRFeHByZXNzaW9uKTtcbiAgICB2YXIgZmFzdERlZmluZWRQcm9wcyA9IGRlZmF1bHRWYWx1ZS5jb25zdHJ1Y3Rvci5fX3Byb3BzX187XG4gICAgaWYgKCFmYXN0RGVmaW5lZFByb3BzKSB7XG4gICAgICAgIGZhc3REZWZpbmVkUHJvcHMgPSBPYmplY3Qua2V5cyhkZWZhdWx0VmFsdWUpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZhc3REZWZpbmVkUHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHByb3BOYW1lID0gZmFzdERlZmluZWRQcm9wc1tpXTtcbiAgICAgICAgdmFyIHByb3AgPSBzcmNWYWx1ZVtwcm9wTmFtZV07XG4gICAgICAgIGlmIChkZWZhdWx0VmFsdWVbcHJvcE5hbWVdID09PSBwcm9wKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXhwcmVzc2lvbiA9IHRoaXMuZW51bWVyYXRlRmllbGQoc3JjVmFsdWUsIHByb3BOYW1lLCBwcm9wKTtcbiAgICAgICAgYXNzaWdubWVudHMuYXBwZW5kKHByb3BOYW1lLCBleHByZXNzaW9uKTtcbiAgICB9XG4gICAgYXNzaWdubWVudHMud3JpdGVDb2RlKGNvZGVBcnJheSk7XG4gICAgQXNzaWdubWVudHMucG9vbC5wdXQoYXNzaWdubWVudHMpO1xufTtcblxucHJvdG8uZW51bWVyYXRlQ0NDbGFzcyA9IGZ1bmN0aW9uIChjb2RlQXJyYXksIG9iaiwga2xhc3MpIHtcbiAgICB2YXIgcHJvcHMgPSBrbGFzcy5fX3ZhbHVlc19fO1xuICAgIHZhciBhdHRycyA9IEF0dHIuZ2V0Q2xhc3NBdHRycyhrbGFzcyk7XG4gICAgZm9yICh2YXIgcCA9IDA7IHAgPCBwcm9wcy5sZW5ndGg7IHArKykge1xuICAgICAgICB2YXIga2V5ID0gcHJvcHNbcF07XG4gICAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcbiAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IGF0dHJzW2tleSArIERFRkFVTFRdO1xuICAgICAgICBpZiAoZXF1YWxzVG9EZWZhdWx0KGRlZmF1bHRWYWx1ZSwgdmFsKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCBpbnN0YW5jZW9mIGNjLlZhbHVlVHlwZSkge1xuICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gQ0NDbGFzcy5nZXREZWZhdWx0KGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoZGVmYXVsdFZhbHVlICYmIGRlZmF1bHRWYWx1ZS5jb25zdHJ1Y3RvciA9PT0gdmFsLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgLy8gZmFzdCBjYXNlXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldEV4cHJlc3Npb24gPSBMT0NBTF9PQkogKyBnZXRQcm9wQWNjZXNzb3Ioa2V5KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlVHlwZShjb2RlQXJyYXksIGRlZmF1bHRWYWx1ZSwgdmFsLCB0YXJnZXRFeHByZXNzaW9uKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldE9ialByb3AoY29kZUFycmF5LCBvYmosIGtleSwgdmFsKTtcbiAgICB9XG59O1xuXG5wcm90by5pbnN0YW50aWF0ZUFycmF5ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gJ1tdJztcbiAgICB9XG5cbiAgICB2YXIgYXJyYXlWYXIgPSBMT0NBTF9BUlJBWSArICgrK3RoaXMubG9jYWxWYXJpYWJsZUlkKTtcbiAgICB2YXIgZGVjbGFyYXRpb24gPSBuZXcgRGVjbGFyYXRpb24oYXJyYXlWYXIsICduZXcgQXJyYXkoJyArIHZhbHVlLmxlbmd0aCArICcpJyk7XG4gICAgdmFyIGNvZGVBcnJheSA9IFtkZWNsYXJhdGlvbl07XG5cbiAgICAvLyBhc3NpZ24gYSBfaU4kdCBmbGFnIHRvIGluZGljYXRlIHRoYXQgdGhpcyBvYmplY3QgaGFzIGJlZW4gcGFyc2VkLlxuICAgIGpzLnZhbHVlKHZhbHVlLCAnX2lOJHQnLCB7XG4gICAgICAgIGdsb2JhbFZhcjogJycsICAgICAgLy8gdGhlIG5hbWUgb2YgZGVjbGFyZWQgZ2xvYmFsIHZhcmlhYmxlIHVzZWQgdG8gYWNjZXNzIHRoaXMgb2JqZWN0XG4gICAgICAgIHNvdXJjZTogY29kZUFycmF5LCAgLy8gdGhlIHNvdXJjZSBjb2RlIGFycmF5IGZvciB0aGlzIG9iamVjdFxuICAgIH0sIHRydWUpO1xuICAgIHRoaXMub2Jqc1RvQ2xlYXJfaU4kdC5wdXNoKHZhbHVlKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHN0YXRlbWVudCA9IGFycmF5VmFyICsgJ1snICsgaSArICddPSc7XG4gICAgICAgIHZhciBleHByZXNzaW9uID0gdGhpcy5lbnVtZXJhdGVGaWVsZCh2YWx1ZSwgaSwgdmFsdWVbaV0pO1xuICAgICAgICB3cml0ZUFzc2lnbm1lbnQoY29kZUFycmF5LCBzdGF0ZW1lbnQsIGV4cHJlc3Npb24pO1xuICAgIH1cbiAgICByZXR1cm4gY29kZUFycmF5O1xufTtcblxucHJvdG8uaW5zdGFudGlhdGVUeXBlZEFycmF5ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgbGV0IHR5cGUgPSB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lIHx8IGdldFR5cGVkQXJyYXlOYW1lKHZhbHVlLmNvbnN0cnVjdG9yKTtcbiAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAnbmV3ICcgKyB0eXBlO1xuICAgIH1cblxuICAgIGxldCBhcnJheVZhciA9IExPQ0FMX0FSUkFZICsgKCsrdGhpcy5sb2NhbFZhcmlhYmxlSWQpO1xuICAgIGxldCBkZWNsYXJhdGlvbiA9IG5ldyBEZWNsYXJhdGlvbihhcnJheVZhciwgJ25ldyAnICsgdHlwZSArICcoJyArIHZhbHVlLmxlbmd0aCArICcpJyk7XG4gICAgbGV0IGNvZGVBcnJheSA9IFtkZWNsYXJhdGlvbl07XG5cbiAgICAvLyBhc3NpZ24gYSBfaU4kdCBmbGFnIHRvIGluZGljYXRlIHRoYXQgdGhpcyBvYmplY3QgaGFzIGJlZW4gcGFyc2VkLlxuICAgIHZhbHVlLl9pTiR0ID0ge1xuICAgICAgICBnbG9iYWxWYXI6ICcnLCAgICAgIC8vIHRoZSBuYW1lIG9mIGRlY2xhcmVkIGdsb2JhbCB2YXJpYWJsZSB1c2VkIHRvIGFjY2VzcyB0aGlzIG9iamVjdFxuICAgICAgICBzb3VyY2U6IGNvZGVBcnJheSwgIC8vIHRoZSBzb3VyY2UgY29kZSBhcnJheSBmb3IgdGhpcyBvYmplY3RcbiAgICB9O1xuICAgIHRoaXMub2Jqc1RvQ2xlYXJfaU4kdC5wdXNoKHZhbHVlKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHZhbHVlW2ldICE9PSAwKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGVtZW50ID0gYXJyYXlWYXIgKyAnWycgKyBpICsgJ109JztcbiAgICAgICAgICAgIHdyaXRlQXNzaWdubWVudChjb2RlQXJyYXksIHN0YXRlbWVudCwgdmFsdWVbaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2RlQXJyYXk7XG59O1xuXG5wcm90by5lbnVtZXJhdGVGaWVsZCA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuICAgICAgICB2YXIgX2lOJHQgPSB2YWx1ZS5faU4kdDtcbiAgICAgICAgaWYgKF9pTiR0KSB7XG4gICAgICAgICAgICAvLyBwYXJzZWRcbiAgICAgICAgICAgIHZhciBnbG9iYWxWYXIgPSBfaU4kdC5nbG9iYWxWYXI7XG4gICAgICAgICAgICBpZiAoIWdsb2JhbFZhcikge1xuICAgICAgICAgICAgICAgIC8vIGRlY2xhcmUgYSBnbG9iYWwgdmFyXG4gICAgICAgICAgICAgICAgZ2xvYmFsVmFyID0gX2lOJHQuZ2xvYmFsVmFyID0gJ3YnICsgKCsrdGhpcy5nbG9iYWxWYXJpYWJsZUlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbFZhcmlhYmxlcy5wdXNoKGdsb2JhbFZhcik7XG4gICAgICAgICAgICAgICAgLy8gaW5zZXJ0IGFzc2lnbm1lbnQgc3RhdGVtZW50IHRvIGFzc2lnbiB0byBnbG9iYWwgdmFyXG4gICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBfaU4kdC5zb3VyY2VbTElORV9JTkRFWF9PRl9ORVdfT0JKXTtcbiAgICAgICAgICAgICAgICBfaU4kdC5zb3VyY2VbTElORV9JTkRFWF9PRl9ORVdfT0JKXSA9IG1lcmdlRGVjbGFyYXRpb24oZ2xvYmFsVmFyICsgJz0nLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAvLyBpZiAodHlwZW9mIGxpbmUgPT09J3N0cmluZycgJiYgbGluZS5zdGFydHNXaXRoKFZBUikpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8gdmFyIG89eHh4IC0+IHZhciBvPWdsb2JhbD14eHhcbiAgICAgICAgICAgICAgICAvLyAgICAgdmFyIExFTl9PRl9WQVJfTyA9IDU7XG4gICAgICAgICAgICAgICAgLy8gICAgIF9pTiR0LnNvdXJjZVtMSU5FX0lOREVYX09GX05FV19PQkpdID0gbGluZS5zbGljZSgwLCBMRU5fT0ZfVkFSX08pICsgJz0nICsgZ2xvYmFsVmFyICsgbGluZS5zbGljZShMRU5fT0ZfVkFSX08pO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBnbG9iYWxWYXI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFudGlhdGVUeXBlZEFycmF5KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFudGlhdGVBcnJheSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW50aWF0ZU9iaih2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZ1bmNNb2R1bGUodmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBlc2NhcGVGb3JKUyh2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoa2V5ID09PSAnX29iakZsYWdzJyAmJiAob2JqIGluc3RhbmNlb2YgQ0NPYmplY3QpKSB7XG4gICAgICAgICAgICB2YWx1ZSAmPSBQZXJzaXN0ZW50TWFzaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufTtcblxucHJvdG8uc2V0T2JqUHJvcCA9IGZ1bmN0aW9uIChjb2RlQXJyYXksIG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIHZhciBzdGF0ZW1lbnQgPSBMT0NBTF9PQkogKyBnZXRQcm9wQWNjZXNzb3Ioa2V5KSArICc9JztcbiAgICB2YXIgZXhwcmVzc2lvbiA9IHRoaXMuZW51bWVyYXRlRmllbGQob2JqLCBrZXksIHZhbHVlKTtcbiAgICB3cml0ZUFzc2lnbm1lbnQoY29kZUFycmF5LCBzdGF0ZW1lbnQsIGV4cHJlc3Npb24pO1xufTtcblxuLy8gY29kZUFycmF5IC0gdGhlIHNvdXJjZSBjb2RlIGFycmF5IGZvciB0aGlzIG9iamVjdFxucHJvdG8uZW51bWVyYXRlT2JqZWN0ID0gZnVuY3Rpb24gKGNvZGVBcnJheSwgb2JqKSB7XG4gICAgdmFyIGtsYXNzID0gb2JqLmNvbnN0cnVjdG9yO1xuICAgIGlmIChjYy5DbGFzcy5faXNDQ0NsYXNzKGtsYXNzKSkge1xuICAgICAgICB0aGlzLmVudW1lcmF0ZUNDQ2xhc3MoY29kZUFycmF5LCBvYmosIGtsYXNzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIHByaW1pdGl2ZSBqYXZhc2NyaXB0IG9iamVjdFxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8XG4gICAgICAgICAgICAgICAgKGtleS5jaGFyQ29kZUF0KDApID09PSA5NSAmJiBrZXkuY2hhckNvZGVBdCgxKSA9PT0gOTUgJiYgICAvLyBzdGFydHMgd2l0aCBcIl9fXCJcbiAgICAgICAgICAgICAgICAga2V5ICE9PSAnX190eXBlX18nKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlID09PSBvYmouX2lOJHQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0T2JqUHJvcChjb2RlQXJyYXksIG9iaiwga2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5wcm90by5pbnN0YW50aWF0ZU9iaiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgY2MuVmFsdWVUeXBlKSB7XG4gICAgICAgIHJldHVybiBDQ0NsYXNzLmdldE5ld1ZhbHVlVHlwZUNvZGUob2JqKTtcbiAgICB9XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIGNjLkFzc2V0KSB7XG4gICAgICAgIC8vIHJlZ2lzdGVyIHRvIGFzc2V0IGxpc3QgYW5kIGp1c3QgcmV0dXJuIHRoZSByZWZlcmVuY2UuXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9ialJlZihvYmopO1xuICAgIH1cbiAgICBpZiAob2JqLl9vYmpGbGFncyAmIERlc3Ryb3llZCkge1xuICAgICAgICAvLyB0aGUgc2FtZSBhcyBjYy5pc1ZhbGlkKG9iailcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGNyZWF0ZUNvZGU7XG4gICAgdmFyIGN0b3IgPSBvYmouY29uc3RydWN0b3I7XG4gICAgaWYgKGNjLkNsYXNzLl9pc0NDQ2xhc3MoY3RvcikpIHtcbiAgICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnQgaW5zdGFuY2VvZiBjYy5Db21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgY2MuX0Jhc2VOb2RlIHx8IG9iaiBpbnN0YW5jZW9mIGNjLkNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPYmpSZWYob2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnBhcmVudCBpbnN0YW5jZW9mIGNjLl9CYXNlTm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBjYy5fQmFzZU5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmouaXNDaGlsZE9mKHRoaXMucGFyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2hvdWxkIG5vdCBjbG9uZSBvdGhlciBub2RlcyBpZiBub3QgZGVzY2VuZGFudFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T2JqUmVmKG9iaik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgY2MuQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqLm5vZGUuaXNDaGlsZE9mKHRoaXMucGFyZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2hvdWxkIG5vdCBjbG9uZSBvdGhlciBjb21wb25lbnQgaWYgbm90IGRlc2NlbmRhbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9ialJlZihvYmopO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNyZWF0ZUNvZGUgPSBuZXcgRGVjbGFyYXRpb24oTE9DQUxfT0JKLCAnbmV3ICcgKyB0aGlzLmdldEZ1bmNNb2R1bGUoY3RvciwgdHJ1ZSkgKyAnKCknKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgIGNyZWF0ZUNvZGUgPSBuZXcgRGVjbGFyYXRpb24oTE9DQUxfT0JKLCAne30nKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIWN0b3IpIHtcbiAgICAgICAgY3JlYXRlQ29kZSA9IG5ldyBEZWNsYXJhdGlvbihMT0NBTF9PQkosICdPYmplY3QuY3JlYXRlKG51bGwpJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBkbyBub3QgY2xvbmUgdW5rbm93biB0eXBlXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9ialJlZihvYmopO1xuICAgIH1cblxuICAgIHZhciBjb2RlQXJyYXkgPSBbY3JlYXRlQ29kZV07XG5cbiAgICAvLyBhc3NpZ24gYSBfaU4kdCBmbGFnIHRvIGluZGljYXRlIHRoYXQgdGhpcyBvYmplY3QgaGFzIGJlZW4gcGFyc2VkLlxuICAgIGpzLnZhbHVlKG9iaiwgJ19pTiR0Jywge1xuICAgICAgICBnbG9iYWxWYXI6ICcnLCAgICAgIC8vIHRoZSBuYW1lIG9mIGRlY2xhcmVkIGdsb2JhbCB2YXJpYWJsZSB1c2VkIHRvIGFjY2VzcyB0aGlzIG9iamVjdFxuICAgICAgICBzb3VyY2U6IGNvZGVBcnJheSwgIC8vIHRoZSBzb3VyY2UgY29kZSBhcnJheSBmb3IgdGhpcyBvYmplY3RcbiAgICAgICAgLy9wcm9wTmFtZTogJycsICAgICAvLyB0aGUgcHJvcE5hbWUgdGhpcyBvYmplY3QgZGVmaW5lZCBpbiBpdHMgc291cmNlIGNvZGUsXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgLy8gaWYgZGVmaW5lZCwgdXNlIExPQ0FMX09CSi5wcm9wTmFtZSB0byBhY2Nlc3MgdGhlIG9iaiwgZWxzZSBqdXN0IHVzZSBvXG4gICAgfSwgdHJ1ZSk7XG4gICAgdGhpcy5vYmpzVG9DbGVhcl9pTiR0LnB1c2gob2JqKTtcblxuICAgIHRoaXMuZW51bWVyYXRlT2JqZWN0KGNvZGVBcnJheSwgb2JqKTtcbiAgICByZXR1cm4gWycoZnVuY3Rpb24oKXsnLFxuICAgICAgICAgICAgICAgIGNvZGVBcnJheSxcbiAgICAgICAgICAgICdyZXR1cm4gbzt9KSgpOyddO1xufTtcblxuXG5mdW5jdGlvbiBjb21waWxlIChub2RlKSB7XG4gICAgdmFyIHJvb3QgPSAobm9kZSBpbnN0YW5jZW9mIGNjLl9CYXNlTm9kZSkgJiYgbm9kZTtcbiAgICB2YXIgcGFyc2VyID0gbmV3IFBhcnNlcihub2RlLCByb290KTtcbiAgICByZXR1cm4gcGFyc2VyLnJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29tcGlsZTogY29tcGlsZSxcbiAgICBlcXVhbHNUb0RlZmF1bHQ6IGVxdWFsc1RvRGVmYXVsdFxufTtcblxuaWYgKENDX1RFU1QpIHtcbiAgICBjYy5fVGVzdC5JbnRhbnRpYXRlSml0ID0gbW9kdWxlLmV4cG9ydHM7XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==