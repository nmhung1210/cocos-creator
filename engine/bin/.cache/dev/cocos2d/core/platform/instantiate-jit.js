
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
  !Uint8ClampedArray.name && (Uint8ClampedArray.name = 'Uint8ClampedArray');
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
  } else if (constructor === Uint8ClampedArray) {
    return 'Uint8ClampedArray';
  } else {
    throw new Error("Unknown TypedArray to instantiate: " + constructor);
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

  if (def && value && typeof def === 'object' && typeof value === 'object' && def.constructor === value.constructor) {
    if (def instanceof cc.ValueType) {
      if (def.equals(value)) {
        return true;
      }
    } else if (Array.isArray(def)) {
      return def.length === 0 && value.length === 0;
    } else if (def.constructor === Object) {
      return js.isEmptyObject(def) && js.isEmptyObject(value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL2luc3RhbnRpYXRlLWppdC5qcyJdLCJuYW1lcyI6WyJDQ09iamVjdCIsInJlcXVpcmUiLCJEZXN0cm95ZWQiLCJGbGFncyIsIlBlcnNpc3RlbnRNYXNrIiwiQXR0ciIsImpzIiwiQ0NDbGFzcyIsIkNvbXBpbGVyIiwiREVGQVVMVCIsIkRFTElNRVRFUiIsIklERU5USUZJRVJfUkUiLCJlc2NhcGVGb3JKUyIsIlZBUiIsIkxPQ0FMX09CSiIsIkxPQ0FMX1RFTVBfT0JKIiwiTE9DQUxfQVJSQVkiLCJMSU5FX0lOREVYX09GX05FV19PQkoiLCJERUZBVUxUX01PRFVMRV9DQUNIRSIsIkZsb2F0MzJBcnJheSIsIm5hbWUiLCJGbG9hdDY0QXJyYXkiLCJJbnQ4QXJyYXkiLCJJbnQxNkFycmF5IiwiSW50MzJBcnJheSIsIlVpbnQ4QXJyYXkiLCJVaW50MTZBcnJheSIsIlVpbnQzMkFycmF5IiwiVWludDhDbGFtcGVkQXJyYXkiLCJlIiwiZ2V0VHlwZWRBcnJheU5hbWUiLCJjb25zdHJ1Y3RvciIsIkVycm9yIiwiRGVjbGFyYXRpb24iLCJ2YXJOYW1lIiwiZXhwcmVzc2lvbiIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwibWVyZ2VEZWNsYXJhdGlvbiIsInN0YXRlbWVudCIsIndyaXRlQXNzaWdubWVudCIsImNvZGVBcnJheSIsIkFycmF5IiwiaXNBcnJheSIsInB1c2giLCJBc3NpZ25tZW50cyIsInRhcmdldEV4cHJlc3Npb24iLCJfZXhwcyIsIl90YXJnZXRFeHAiLCJhcHBlbmQiLCJrZXkiLCJ3cml0ZUNvZGUiLCJ0YXJnZXRWYXIiLCJsZW5ndGgiLCJpIiwicGFpciIsImdldFByb3BBY2Nlc3NvciIsInBvb2wiLCJQb29sIiwib2JqIiwiZ2V0IiwiY2FjaGUiLCJfZ2V0IiwiZXF1YWxzVG9EZWZhdWx0IiwiZGVmIiwidmFsdWUiLCJjYyIsIlZhbHVlVHlwZSIsImVxdWFscyIsIk9iamVjdCIsImlzRW1wdHlPYmplY3QiLCJ0ZXN0IiwiUGFyc2VyIiwicGFyZW50Iiwib2Jqc1RvQ2xlYXJfaU4kdCIsIm9ianMiLCJmdW5jcyIsImZ1bmNNb2R1bGVDYWNoZSIsImNyZWF0ZU1hcCIsIm1peGluIiwiZ2xvYmFsVmFyaWFibGVzIiwiZ2xvYmFsVmFyaWFibGVJZCIsImxvY2FsVmFyaWFibGVJZCIsImdldEZ1bmNNb2R1bGUiLCJnbG9iYWxWYXIiLCJlbnVtZXJhdGVPYmplY3QiLCJnbG9iYWxWYXJpYWJsZXNEZWNsYXJhdGlvbiIsImpvaW4iLCJjb2RlIiwiZmxhdHRlbkNvZGVBcnJheSIsInJlc3VsdCIsIkZ1bmN0aW9uIiwibGVuIiwiX2lOJHQiLCJwcm90byIsImZ1bmMiLCJ1c2VkSW5OZXciLCJjbHNOYW1lIiwiZ2V0Q2xhc3NOYW1lIiwidW5kZWZpbmVkIiwiY2xzTmFtZUlzTW9kdWxlIiwiaW5kZXhPZiIsImluZGV4IiwicmVzIiwiZ2V0T2JqUmVmIiwic2V0VmFsdWVUeXBlIiwiZGVmYXVsdFZhbHVlIiwic3JjVmFsdWUiLCJhc3NpZ25tZW50cyIsImZhc3REZWZpbmVkUHJvcHMiLCJfX3Byb3BzX18iLCJrZXlzIiwicHJvcE5hbWUiLCJwcm9wIiwiZW51bWVyYXRlRmllbGQiLCJwdXQiLCJlbnVtZXJhdGVDQ0NsYXNzIiwia2xhc3MiLCJwcm9wcyIsIl9fdmFsdWVzX18iLCJhdHRycyIsImdldENsYXNzQXR0cnMiLCJwIiwidmFsIiwiZ2V0RGVmYXVsdCIsInNldE9ialByb3AiLCJpbnN0YW50aWF0ZUFycmF5IiwiYXJyYXlWYXIiLCJkZWNsYXJhdGlvbiIsInNvdXJjZSIsImluc3RhbnRpYXRlVHlwZWRBcnJheSIsInR5cGUiLCJsaW5lIiwiQXJyYXlCdWZmZXIiLCJpc1ZpZXciLCJpbnN0YW50aWF0ZU9iaiIsIkNsYXNzIiwiX2lzQ0NDbGFzcyIsImhhc093blByb3BlcnR5IiwiY2hhckNvZGVBdCIsImdldE5ld1ZhbHVlVHlwZUNvZGUiLCJBc3NldCIsIl9vYmpGbGFncyIsImNyZWF0ZUNvZGUiLCJjdG9yIiwiQ29tcG9uZW50IiwiX0Jhc2VOb2RlIiwiaXNDaGlsZE9mIiwibm9kZSIsImNvbXBpbGUiLCJyb290IiwicGFyc2VyIiwibW9kdWxlIiwiZXhwb3J0cyIsIkNDX1RFU1QiLCJfVGVzdCIsIkludGFudGlhdGVKaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTtBQUVBLElBQUlBLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBdEI7O0FBQ0EsSUFBSUMsU0FBUyxHQUFHRixRQUFRLENBQUNHLEtBQVQsQ0FBZUQsU0FBL0I7QUFDQSxJQUFJRSxjQUFjLEdBQUdKLFFBQVEsQ0FBQ0csS0FBVCxDQUFlQyxjQUFwQzs7QUFDQSxJQUFJQyxJQUFJLEdBQUdKLE9BQU8sQ0FBQyxhQUFELENBQWxCOztBQUNBLElBQUlLLEVBQUUsR0FBR0wsT0FBTyxDQUFDLE1BQUQsQ0FBaEI7O0FBQ0EsSUFBSU0sT0FBTyxHQUFHTixPQUFPLENBQUMsV0FBRCxDQUFyQjs7QUFDQSxJQUFJTyxRQUFRLEdBQUdQLE9BQU8sQ0FBQyxZQUFELENBQXRCOztBQUVBLElBQUlRLE9BQU8sR0FBR0osSUFBSSxDQUFDSyxTQUFMLEdBQWlCLFNBQS9CO0FBQ0EsSUFBSUMsYUFBYSxHQUFHSixPQUFPLENBQUNJLGFBQTVCO0FBQ0EsSUFBSUMsV0FBVyxHQUFHTCxPQUFPLENBQUNLLFdBQTFCO0FBRUEsSUFBTUMsR0FBRyxHQUFHLE1BQVo7QUFDQSxJQUFNQyxTQUFTLEdBQUcsR0FBbEI7QUFDQSxJQUFNQyxjQUFjLEdBQUcsR0FBdkI7QUFDQSxJQUFNQyxXQUFXLEdBQUcsR0FBcEI7QUFDQSxJQUFNQyxxQkFBcUIsR0FBRyxDQUE5QjtBQUVBLElBQU1DLG9CQUFvQixHQUFHO0FBQ3pCLGFBQVcsU0FEYztBQUV6QixlQUFhLFdBRlk7QUFHekIsY0FBWSxVQUhhO0FBSXpCLGVBQWEsV0FKWTtBQUt6QixlQUFhLFdBTFk7QUFNekIsa0JBQWdCLGNBTlM7QUFP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QSxPQURJO0FBRWJ0RixFQUFBQSxlQUFlLEVBQUVBO0FBRkosQ0FBakI7O0FBS0EsSUFBSTJGLE9BQUosRUFBYTtBQUNUeEYsRUFBQUEsRUFBRSxDQUFDeUYsS0FBSCxDQUFTQyxhQUFULEdBQXlCSixNQUFNLENBQUNDLE9BQWhDO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8vIFNvbWUgaGVscGVyIG1ldGhvZHMgZm9yIGNvbXBpbGUgaW5zdGFudGlhdGlvbiBjb2RlXG5cbnZhciBDQ09iamVjdCA9IHJlcXVpcmUoJy4vQ0NPYmplY3QnKTtcbnZhciBEZXN0cm95ZWQgPSBDQ09iamVjdC5GbGFncy5EZXN0cm95ZWQ7XG52YXIgUGVyc2lzdGVudE1hc2sgPSBDQ09iamVjdC5GbGFncy5QZXJzaXN0ZW50TWFzaztcbnZhciBBdHRyID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGUnKTtcbnZhciBqcyA9IHJlcXVpcmUoJy4vanMnKTtcbnZhciBDQ0NsYXNzID0gcmVxdWlyZSgnLi9DQ0NsYXNzJyk7XG52YXIgQ29tcGlsZXIgPSByZXF1aXJlKCcuL2NvbXBpbGVyJyk7XG5cbnZhciBERUZBVUxUID0gQXR0ci5ERUxJTUVURVIgKyAnZGVmYXVsdCc7XG52YXIgSURFTlRJRklFUl9SRSA9IENDQ2xhc3MuSURFTlRJRklFUl9SRTtcbnZhciBlc2NhcGVGb3JKUyA9IENDQ2xhc3MuZXNjYXBlRm9ySlM7XG5cbmNvbnN0IFZBUiA9ICd2YXIgJztcbmNvbnN0IExPQ0FMX09CSiA9ICdvJztcbmNvbnN0IExPQ0FMX1RFTVBfT0JKID0gJ3QnO1xuY29uc3QgTE9DQUxfQVJSQVkgPSAnYSc7XG5jb25zdCBMSU5FX0lOREVYX09GX05FV19PQkogPSAwO1xuXG5jb25zdCBERUZBVUxUX01PRFVMRV9DQUNIRSA9IHtcbiAgICAnY2MuTm9kZSc6ICdjYy5Ob2RlJyxcbiAgICAnY2MuU3ByaXRlJzogJ2NjLlNwcml0ZScsXG4gICAgJ2NjLkxhYmVsJzogJ2NjLkxhYmVsJyxcbiAgICAnY2MuQnV0dG9uJzogJ2NjLkJ1dHRvbicsXG4gICAgJ2NjLldpZGdldCc6ICdjYy5XaWRnZXQnLFxuICAgICdjYy5BbmltYXRpb24nOiAnY2MuQW5pbWF0aW9uJyxcbiAgICAnY2MuQ2xpY2tFdmVudCc6IGZhbHNlLFxuICAgICdjYy5QcmVmYWJJbmZvJzogZmFsc2Vcbn07XG5cbnRyeSB7XG4gICAgLy8gY29tcGF0aWJsZSBmb3IgSUVcbiAgICAhRmxvYXQzMkFycmF5Lm5hbWUgJiYgKEZsb2F0MzJBcnJheS5uYW1lID0gJ0Zsb2F0MzJBcnJheScpO1xuICAgICFGbG9hdDY0QXJyYXkubmFtZSAmJiAoRmxvYXQ2NEFycmF5Lm5hbWUgPSAnRmxvYXQ2NEFycmF5Jyk7XG5cbiAgICAhSW50OEFycmF5Lm5hbWUgJiYgKEludDhBcnJheS5uYW1lID0gJ0ludDhBcnJheScpO1xuICAgICFJbnQxNkFycmF5Lm5hbWUgJiYgKEludDE2QXJyYXkubmFtZSA9ICdJbnQxNkFycmF5Jyk7XG4gICAgIUludDMyQXJyYXkubmFtZSAmJiAoSW50MzJBcnJheS5uYW1lID0gJ0ludDMyQXJyYXknKTtcblxuICAgICFVaW50OEFycmF5Lm5hbWUgJiYgKFVpbnQ4QXJyYXkubmFtZSA9ICdVaW50OEFycmF5Jyk7XG4gICAgIVVpbnQxNkFycmF5Lm5hbWUgJiYgKFVpbnQxNkFycmF5Lm5hbWUgPSAnVWludDE2QXJyYXknKTtcbiAgICAhVWludDMyQXJyYXkubmFtZSAmJiAoVWludDMyQXJyYXkubmFtZSA9ICdVaW50MzJBcnJheScpO1xuXG4gICAgIVVpbnQ4Q2xhbXBlZEFycmF5Lm5hbWUgJiYgKFVpbnQ4Q2xhbXBlZEFycmF5Lm5hbWUgPSAnVWludDhDbGFtcGVkQXJyYXknKTtcbn1cbmNhdGNoIChlKSB7fVxuXG4vLyBjb21wYXRpYmxlIGZvciBpT1MgOVxuZnVuY3Rpb24gZ2V0VHlwZWRBcnJheU5hbWUgKGNvbnN0cnVjdG9yKSB7XG4gICAgaWYgKGNvbnN0cnVjdG9yID09PSBGbG9hdDMyQXJyYXkpIHsgcmV0dXJuICdGbG9hdDMyQXJyYXknOyB9XG4gICAgZWxzZSBpZiAoY29uc3RydWN0b3IgPT09IEZsb2F0NjRBcnJheSkgeyByZXR1cm4gJ0Zsb2F0NjRBcnJheSc7IH1cblxuICAgIGVsc2UgaWYgKGNvbnN0cnVjdG9yID09PSBJbnQ4QXJyYXkpIHsgcmV0dXJuICdJbnQ4QXJyYXknOyB9XG4gICAgZWxzZSBpZiAoY29uc3RydWN0b3IgPT09IEludDE2QXJyYXkpIHsgcmV0dXJuICdJbnQxNkFycmF5JzsgfVxuICAgIGVsc2UgaWYgKGNvbnN0cnVjdG9yID09PSBJbnQzMkFycmF5KSB7IHJldHVybiAnSW50MzJBcnJheSc7IH1cblxuICAgIGVsc2UgaWYgKGNvbnN0cnVjdG9yID09PSBVaW50OEFycmF5KSB7IHJldHVybiAnVWludDhBcnJheSc7IH1cbiAgICBlbHNlIGlmIChjb25zdHJ1Y3RvciA9PT0gVWludDE2QXJyYXkpIHsgcmV0dXJuICdVaW50MTZBcnJheSc7IH1cbiAgICBlbHNlIGlmIChjb25zdHJ1Y3RvciA9PT0gVWludDMyQXJyYXkpIHsgcmV0dXJuICdVaW50MzJBcnJheSc7IH1cblxuICAgIGVsc2UgaWYgKGNvbnN0cnVjdG9yID09PSBVaW50OENsYW1wZWRBcnJheSkgeyByZXR1cm4gJ1VpbnQ4Q2xhbXBlZEFycmF5JzsgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gVHlwZWRBcnJheSB0byBpbnN0YW50aWF0ZTogJHtjb25zdHJ1Y3Rvcn1gKTtcbiAgICB9XG59XG5cbi8vIEhFTFBFUiBDTEFTU0VTXG5cbi8vICgnZm9vJywgJ2JhcicpXG4vLyAtPiAndmFyIGZvbyA9IGJhcjsnXG5mdW5jdGlvbiBEZWNsYXJhdGlvbiAodmFyTmFtZSwgZXhwcmVzc2lvbikge1xuICAgIHRoaXMudmFyTmFtZSA9IHZhck5hbWU7XG4gICAgdGhpcy5leHByZXNzaW9uID0gZXhwcmVzc2lvbjtcbn1cbkRlY2xhcmF0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gVkFSICsgdGhpcy52YXJOYW1lICsgJz0nICsgdGhpcy5leHByZXNzaW9uICsgJzsnO1xufTtcblxuLy8gKCdhID0nLCAndmFyIGIgPSB4Jylcbi8vIC0+ICd2YXIgYiA9IGEgPSB4Jztcbi8vICgnYSA9JywgJ3gnKVxuLy8gLT4gJ2EgPSB4JztcbmZ1bmN0aW9uIG1lcmdlRGVjbGFyYXRpb24gKHN0YXRlbWVudCwgZXhwcmVzc2lvbikge1xuICAgIGlmIChleHByZXNzaW9uIGluc3RhbmNlb2YgRGVjbGFyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEZWNsYXJhdGlvbihleHByZXNzaW9uLnZhck5hbWUsIHN0YXRlbWVudCArIGV4cHJlc3Npb24uZXhwcmVzc2lvbik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gc3RhdGVtZW50ICsgZXhwcmVzc2lvbjtcbiAgICB9XG59XG5cbi8vICgnYScsIFsndmFyIGIgPSB4JywgJ2IuZm9vID0gYmFyJ10pXG4vLyAtPiAndmFyIGIgPSBhID0geDsnXG4vLyAtPiAnYi5mb28gPSBiYXI7J1xuLy8gKCdhJywgJ3ZhciBiID0geCcpXG4vLyAtPiAndmFyIGIgPSBhID0geDsnXG4vLyAoJ2EnLCAneCcpXG4vLyAtPiAnYSA9IHg7J1xuZnVuY3Rpb24gd3JpdGVBc3NpZ25tZW50IChjb2RlQXJyYXksIHN0YXRlbWVudCwgZXhwcmVzc2lvbikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGV4cHJlc3Npb24pKSB7XG4gICAgICAgIGV4cHJlc3Npb25bMF0gPSBtZXJnZURlY2xhcmF0aW9uKHN0YXRlbWVudCwgZXhwcmVzc2lvblswXSk7XG4gICAgICAgIGNvZGVBcnJheS5wdXNoKGV4cHJlc3Npb24pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29kZUFycmF5LnB1c2gobWVyZ2VEZWNsYXJhdGlvbihzdGF0ZW1lbnQsIGV4cHJlc3Npb24pICsgJzsnKTtcbiAgICB9XG59XG5cbi8vICgnZm9vJywgJ2JhcicpXG4vLyAtPiAndGFyZ2V0RXhwcmVzc2lvbi5mb28gPSBiYXInXG4vLyAoJ2ZvbzEnLCAnYmFyMScpXG4vLyAoJ2ZvbzInLCAnYmFyMicpXG4vLyAtPiAndCA9IHRhcmdldEV4cHJlc3Npb247J1xuLy8gLT4gJ3QuZm9vMSA9IGJhcjE7J1xuLy8gLT4gJ3QuZm9vMiA9IGJhcjI7J1xuZnVuY3Rpb24gQXNzaWdubWVudHMgKHRhcmdldEV4cHJlc3Npb24pIHtcbiAgICB0aGlzLl9leHBzID0gW107XG4gICAgdGhpcy5fdGFyZ2V0RXhwID0gdGFyZ2V0RXhwcmVzc2lvbjtcbn1cbkFzc2lnbm1lbnRzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiAoa2V5LCBleHByZXNzaW9uKSB7XG4gICAgdGhpcy5fZXhwcy5wdXNoKFtrZXksIGV4cHJlc3Npb25dKTtcbn07XG5Bc3NpZ25tZW50cy5wcm90b3R5cGUud3JpdGVDb2RlID0gZnVuY3Rpb24gKGNvZGVBcnJheSkge1xuICAgIHZhciB0YXJnZXRWYXI7XG4gICAgaWYgKHRoaXMuX2V4cHMubGVuZ3RoID4gMSkge1xuICAgICAgICBjb2RlQXJyYXkucHVzaChMT0NBTF9URU1QX09CSiArICc9JyArIHRoaXMuX3RhcmdldEV4cCArICc7Jyk7XG4gICAgICAgIHRhcmdldFZhciA9IExPQ0FMX1RFTVBfT0JKO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLl9leHBzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0YXJnZXRWYXIgPSB0aGlzLl90YXJnZXRFeHA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZXhwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGFpciA9IHRoaXMuX2V4cHNbaV07XG4gICAgICAgIHdyaXRlQXNzaWdubWVudChjb2RlQXJyYXksIHRhcmdldFZhciArIGdldFByb3BBY2Nlc3NvcihwYWlyWzBdKSArICc9JywgcGFpclsxXSk7XG4gICAgfVxufTtcblxuQXNzaWdubWVudHMucG9vbCA9IG5ldyBqcy5Qb29sKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLl9leHBzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5fdGFyZ2V0RXhwID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxKTtcbkFzc2lnbm1lbnRzLnBvb2wuZ2V0ID0gZnVuY3Rpb24gKHRhcmdldEV4cHJlc3Npb24pIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLl9nZXQoKSB8fCBuZXcgQXNzaWdubWVudHMoKTtcbiAgICBjYWNoZS5fdGFyZ2V0RXhwID0gdGFyZ2V0RXhwcmVzc2lvbjtcbiAgICByZXR1cm4gY2FjaGU7XG59O1xuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG5cbmZ1bmN0aW9uIGVxdWFsc1RvRGVmYXVsdCAoZGVmLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkZWYgPSBkZWYoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChkZWYgPT09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoZGVmICYmIHZhbHVlICYmXG4gICAgICAgIHR5cGVvZiBkZWYgPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgZGVmLmNvbnN0cnVjdG9yID09PSB2YWx1ZS5jb25zdHJ1Y3RvcilcbiAgICB7XG4gICAgICAgIGlmIChkZWYgaW5zdGFuY2VvZiBjYy5WYWx1ZVR5cGUpIHtcbiAgICAgICAgICAgIGlmIChkZWYuZXF1YWxzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGVmKSkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZi5sZW5ndGggPT09IDAgJiYgdmFsdWUubGVuZ3RoID09PSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlZi5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4ganMuaXNFbXB0eU9iamVjdChkZWYpICYmIGpzLmlzRW1wdHlPYmplY3QodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvcEFjY2Vzc29yIChrZXkpIHtcbiAgICByZXR1cm4gSURFTlRJRklFUl9SRS50ZXN0KGtleSkgPyAoJy4nICsga2V5KSA6ICgnWycgKyBlc2NhcGVGb3JKUyhrZXkpICsgJ10nKTtcbn1cblxuLy9cblxuLypcbiAqIFZhcmlhYmxlczpcbiAqIHtPYmplY3RbXX0gTyAtIG9ianMgbGlzdFxuICoge0Z1bmN0aW9uW119IEYgLSBjb25zdHJ1Y3RvciBsaXN0XG4gKiB7Tm9kZX0gW1JdIC0gc3BlY2lmeSBhbiBpbnN0YW50aWF0ZWQgcHJlZmFiUm9vdCB0aGF0IGFsbCByZWZlcmVuY2VzIHRvIHByZWZhYlJvb3QgaW4gcHJlZmFiIHdpbGwgcmVkaXJlY3QgdG9cbiAqIHtPYmplY3R9IG8gLSBjdXJyZW50IGNyZWF0aW5nIG9iamVjdFxuICovXG5cbi8qXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gdGhlIG9iamVjdCB0byBwYXJzZVxuICogQHBhcmFtIHtOb2RlfSBbcGFyZW50XVxuICovXG5mdW5jdGlvbiBQYXJzZXIgKG9iaiwgcGFyZW50KSB7XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgICB0aGlzLm9ianNUb0NsZWFyX2lOJHQgPSBbXTsgICAvLyB1c2VkIHRvIHJlc2V0IF9pTiR0IHZhcmlhYmxlXG4gICAgdGhpcy5jb2RlQXJyYXkgPSBbXTtcblxuICAgIC8vIGRhdGFzIGZvciBnZW5lcmF0ZWQgY29kZVxuICAgIHRoaXMub2JqcyA9IFtdO1xuICAgIHRoaXMuZnVuY3MgPSBbXTtcblxuICAgIHRoaXMuZnVuY01vZHVsZUNhY2hlID0ganMuY3JlYXRlTWFwKCk7XG4gICAganMubWl4aW4odGhpcy5mdW5jTW9kdWxlQ2FjaGUsIERFRkFVTFRfTU9EVUxFX0NBQ0hFKTtcblxuICAgIC8vIHtTdHJpbmdbXX0gLSB2YXJpYWJsZSBuYW1lcyBmb3IgY2lyY3VsYXIgcmVmZXJlbmNlcyxcbiAgICAvLyAgICAgICAgICAgICAgbm90IHJlYWxseSBnbG9iYWwsIGp1c3QgbG9jYWwgdmFyaWFibGVzIHNoYXJlZCBiZXR3ZWVuIHN1YiBmdW5jdGlvbnNcbiAgICB0aGlzLmdsb2JhbFZhcmlhYmxlcyA9IFtdO1xuICAgIC8vIGluY3JlbWVudGFsIGlkIGZvciBuZXcgZ2xvYmFsIHZhcmlhYmxlc1xuICAgIHRoaXMuZ2xvYmFsVmFyaWFibGVJZCA9IDA7XG4gICAgLy8gaW5jcmVtZW50YWwgaWQgZm9yIG5ldyBsb2NhbCB2YXJpYWJsZXNcbiAgICB0aGlzLmxvY2FsVmFyaWFibGVJZCA9IDA7XG5cbiAgICAvLyBnZW5lcmF0ZSBjb2RlQXJyYXlcbiAgICAvL2lmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAvLyAgICB0aGlzLmNvZGVBcnJheS5wdXNoKHRoaXMuaW5zdGFudGlhdGVBcnJheShvYmopKTtcbiAgICAvL31cbiAgICAvL2Vsc2Uge1xuICAgICAgICB0aGlzLmNvZGVBcnJheS5wdXNoKFZBUiArIExPQ0FMX09CSiArICcsJyArIExPQ0FMX1RFTVBfT0JKICsgJzsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKFIpeycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExPQ0FMX09CSiArICc9UjsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ31lbHNleycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExPQ0FMX09CSiArICc9Uj1uZXcgJyArIHRoaXMuZ2V0RnVuY01vZHVsZShvYmouY29uc3RydWN0b3IsIHRydWUpICsgJygpOycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnfScpO1xuICAgICAgICBqcy52YWx1ZShvYmosICdfaU4kdCcsIHsgZ2xvYmFsVmFyOiAnUicgfSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMub2Jqc1RvQ2xlYXJfaU4kdC5wdXNoKG9iaik7XG4gICAgICAgIHRoaXMuZW51bWVyYXRlT2JqZWN0KHRoaXMuY29kZUFycmF5LCBvYmopO1xuICAgIC8vfVxuXG4gICAgLy8gZ2VuZXJhdGUgY29kZVxuICAgIHZhciBnbG9iYWxWYXJpYWJsZXNEZWNsYXJhdGlvbjtcbiAgICBpZiAodGhpcy5nbG9iYWxWYXJpYWJsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBnbG9iYWxWYXJpYWJsZXNEZWNsYXJhdGlvbiA9IFZBUiArIHRoaXMuZ2xvYmFsVmFyaWFibGVzLmpvaW4oJywnKSArICc7JztcbiAgICB9XG4gICAgdmFyIGNvZGUgPSBDb21waWxlci5mbGF0dGVuQ29kZUFycmF5KFsncmV0dXJuIChmdW5jdGlvbihSKXsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsVmFyaWFibGVzRGVjbGFyYXRpb24gfHwgW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvZGVBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZXR1cm4gbzsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ30pJ10pO1xuXG4gICAgLy8gZ2VuZXJhdGUgbWV0aG9kIGFuZCBiaW5kIHdpdGggb2Jqc1xuICAgIHRoaXMucmVzdWx0ID0gRnVuY3Rpb24oJ08nLCAnRicsIGNvZGUpKHRoaXMub2JqcywgdGhpcy5mdW5jcyk7XG5cbiAgICAvLyBpZiAoQ0NfVEVTVCAmJiAhaXNQaGFudG9tSlMpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coY29kZSk7XG4gICAgLy8gfVxuXG4gICAgLy8gY2xlYW51cFxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLm9ianNUb0NsZWFyX2lOJHQubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgdGhpcy5vYmpzVG9DbGVhcl9pTiR0W2ldLl9pTiR0ID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5vYmpzVG9DbGVhcl9pTiR0Lmxlbmd0aCA9IDA7XG59XG5cbnZhciBwcm90byA9IFBhcnNlci5wcm90b3R5cGU7XG5cbnByb3RvLmdldEZ1bmNNb2R1bGUgPSBmdW5jdGlvbiAoZnVuYywgdXNlZEluTmV3KSB7XG4gICAgdmFyIGNsc05hbWUgPSBqcy5nZXRDbGFzc05hbWUoZnVuYyk7XG4gICAgaWYgKGNsc05hbWUpIHtcbiAgICAgICAgdmFyIGNhY2hlID0gdGhpcy5mdW5jTW9kdWxlQ2FjaGVbY2xzTmFtZV07XG4gICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNhY2hlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBjbHNOYW1lSXNNb2R1bGUgPSBjbHNOYW1lLmluZGV4T2YoJy4nKSAhPT0gLTE7XG4gICAgICAgICAgICBpZiAoY2xzTmFtZUlzTW9kdWxlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZW5zdXJlIGlzIG1vZHVsZVxuICAgICAgICAgICAgICAgICAgICBjbHNOYW1lSXNNb2R1bGUgPSAoZnVuYyA9PT0gRnVuY3Rpb24oJ3JldHVybiAnICsgY2xzTmFtZSkoKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbHNOYW1lSXNNb2R1bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnVuY01vZHVsZUNhY2hlW2Nsc05hbWVdID0gY2xzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbHNOYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBpbmRleCA9IHRoaXMuZnVuY3MuaW5kZXhPZihmdW5jKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIGluZGV4ID0gdGhpcy5mdW5jcy5sZW5ndGg7XG4gICAgICAgIHRoaXMuZnVuY3MucHVzaChmdW5jKTtcbiAgICB9XG4gICAgdmFyIHJlcyA9ICdGWycgKyBpbmRleCArICddJztcbiAgICBpZiAodXNlZEluTmV3KSB7XG4gICAgICAgIHJlcyA9ICcoJyArIHJlcyArICcpJztcbiAgICB9XG4gICAgdGhpcy5mdW5jTW9kdWxlQ2FjaGVbY2xzTmFtZV0gPSByZXM7XG4gICAgcmV0dXJuIHJlcztcbn07XG5cbnByb3RvLmdldE9ialJlZiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLm9ianMuaW5kZXhPZihvYmopO1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgaW5kZXggPSB0aGlzLm9ianMubGVuZ3RoO1xuICAgICAgICB0aGlzLm9ianMucHVzaChvYmopO1xuICAgIH1cbiAgICByZXR1cm4gJ09bJyArIGluZGV4ICsgJ10nO1xufTtcblxucHJvdG8uc2V0VmFsdWVUeXBlID0gZnVuY3Rpb24gKGNvZGVBcnJheSwgZGVmYXVsdFZhbHVlLCBzcmNWYWx1ZSwgdGFyZ2V0RXhwcmVzc2lvbikge1xuICAgIHZhciBhc3NpZ25tZW50cyA9IEFzc2lnbm1lbnRzLnBvb2wuZ2V0KHRhcmdldEV4cHJlc3Npb24pO1xuICAgIHZhciBmYXN0RGVmaW5lZFByb3BzID0gZGVmYXVsdFZhbHVlLmNvbnN0cnVjdG9yLl9fcHJvcHNfXztcbiAgICBpZiAoIWZhc3REZWZpbmVkUHJvcHMpIHtcbiAgICAgICAgZmFzdERlZmluZWRQcm9wcyA9IE9iamVjdC5rZXlzKGRlZmF1bHRWYWx1ZSk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmFzdERlZmluZWRQcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcHJvcE5hbWUgPSBmYXN0RGVmaW5lZFByb3BzW2ldO1xuICAgICAgICB2YXIgcHJvcCA9IHNyY1ZhbHVlW3Byb3BOYW1lXTtcbiAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZVtwcm9wTmFtZV0gPT09IHByb3ApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBleHByZXNzaW9uID0gdGhpcy5lbnVtZXJhdGVGaWVsZChzcmNWYWx1ZSwgcHJvcE5hbWUsIHByb3ApO1xuICAgICAgICBhc3NpZ25tZW50cy5hcHBlbmQocHJvcE5hbWUsIGV4cHJlc3Npb24pO1xuICAgIH1cbiAgICBhc3NpZ25tZW50cy53cml0ZUNvZGUoY29kZUFycmF5KTtcbiAgICBBc3NpZ25tZW50cy5wb29sLnB1dChhc3NpZ25tZW50cyk7XG59O1xuXG5wcm90by5lbnVtZXJhdGVDQ0NsYXNzID0gZnVuY3Rpb24gKGNvZGVBcnJheSwgb2JqLCBrbGFzcykge1xuICAgIHZhciBwcm9wcyA9IGtsYXNzLl9fdmFsdWVzX187XG4gICAgdmFyIGF0dHJzID0gQXR0ci5nZXRDbGFzc0F0dHJzKGtsYXNzKTtcbiAgICBmb3IgKHZhciBwID0gMDsgcCA8IHByb3BzLmxlbmd0aDsgcCsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBwcm9wc1twXTtcbiAgICAgICAgdmFyIHZhbCA9IG9ialtrZXldO1xuICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0gYXR0cnNba2V5ICsgREVGQVVMVF07XG4gICAgICAgIGlmIChlcXVhbHNUb0RlZmF1bHQoZGVmYXVsdFZhbHVlLCB2YWwpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsIGluc3RhbmNlb2YgY2MuVmFsdWVUeXBlKSB7XG4gICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSBDQ0NsYXNzLmdldERlZmF1bHQoZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgICAgIGlmIChkZWZhdWx0VmFsdWUgJiYgZGVmYXVsdFZhbHVlLmNvbnN0cnVjdG9yID09PSB2YWwuY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICAvLyBmYXN0IGNhc2VcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0RXhwcmVzc2lvbiA9IExPQ0FMX09CSiArIGdldFByb3BBY2Nlc3NvcihrZXkpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVUeXBlKGNvZGVBcnJheSwgZGVmYXVsdFZhbHVlLCB2YWwsIHRhcmdldEV4cHJlc3Npb24pO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0T2JqUHJvcChjb2RlQXJyYXksIG9iaiwga2V5LCB2YWwpO1xuICAgIH1cbn07XG5cbnByb3RvLmluc3RhbnRpYXRlQXJyYXkgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAnW10nO1xuICAgIH1cblxuICAgIHZhciBhcnJheVZhciA9IExPQ0FMX0FSUkFZICsgKCsrdGhpcy5sb2NhbFZhcmlhYmxlSWQpO1xuICAgIHZhciBkZWNsYXJhdGlvbiA9IG5ldyBEZWNsYXJhdGlvbihhcnJheVZhciwgJ25ldyBBcnJheSgnICsgdmFsdWUubGVuZ3RoICsgJyknKTtcbiAgICB2YXIgY29kZUFycmF5ID0gW2RlY2xhcmF0aW9uXTtcblxuICAgIC8vIGFzc2lnbiBhIF9pTiR0IGZsYWcgdG8gaW5kaWNhdGUgdGhhdCB0aGlzIG9iamVjdCBoYXMgYmVlbiBwYXJzZWQuXG4gICAganMudmFsdWUodmFsdWUsICdfaU4kdCcsIHtcbiAgICAgICAgZ2xvYmFsVmFyOiAnJywgICAgICAvLyB0aGUgbmFtZSBvZiBkZWNsYXJlZCBnbG9iYWwgdmFyaWFibGUgdXNlZCB0byBhY2Nlc3MgdGhpcyBvYmplY3RcbiAgICAgICAgc291cmNlOiBjb2RlQXJyYXksICAvLyB0aGUgc291cmNlIGNvZGUgYXJyYXkgZm9yIHRoaXMgb2JqZWN0XG4gICAgfSwgdHJ1ZSk7XG4gICAgdGhpcy5vYmpzVG9DbGVhcl9pTiR0LnB1c2godmFsdWUpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgc3RhdGVtZW50ID0gYXJyYXlWYXIgKyAnWycgKyBpICsgJ109JztcbiAgICAgICAgdmFyIGV4cHJlc3Npb24gPSB0aGlzLmVudW1lcmF0ZUZpZWxkKHZhbHVlLCBpLCB2YWx1ZVtpXSk7XG4gICAgICAgIHdyaXRlQXNzaWdubWVudChjb2RlQXJyYXksIHN0YXRlbWVudCwgZXhwcmVzc2lvbik7XG4gICAgfVxuICAgIHJldHVybiBjb2RlQXJyYXk7XG59O1xuXG5wcm90by5pbnN0YW50aWF0ZVR5cGVkQXJyYXkgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBsZXQgdHlwZSA9IHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgfHwgZ2V0VHlwZWRBcnJheU5hbWUodmFsdWUuY29uc3RydWN0b3IpO1xuICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuICduZXcgJyArIHR5cGU7XG4gICAgfVxuXG4gICAgbGV0IGFycmF5VmFyID0gTE9DQUxfQVJSQVkgKyAoKyt0aGlzLmxvY2FsVmFyaWFibGVJZCk7XG4gICAgbGV0IGRlY2xhcmF0aW9uID0gbmV3IERlY2xhcmF0aW9uKGFycmF5VmFyLCAnbmV3ICcgKyB0eXBlICsgJygnICsgdmFsdWUubGVuZ3RoICsgJyknKTtcbiAgICBsZXQgY29kZUFycmF5ID0gW2RlY2xhcmF0aW9uXTtcblxuICAgIC8vIGFzc2lnbiBhIF9pTiR0IGZsYWcgdG8gaW5kaWNhdGUgdGhhdCB0aGlzIG9iamVjdCBoYXMgYmVlbiBwYXJzZWQuXG4gICAgdmFsdWUuX2lOJHQgPSB7XG4gICAgICAgIGdsb2JhbFZhcjogJycsICAgICAgLy8gdGhlIG5hbWUgb2YgZGVjbGFyZWQgZ2xvYmFsIHZhcmlhYmxlIHVzZWQgdG8gYWNjZXNzIHRoaXMgb2JqZWN0XG4gICAgICAgIHNvdXJjZTogY29kZUFycmF5LCAgLy8gdGhlIHNvdXJjZSBjb2RlIGFycmF5IGZvciB0aGlzIG9iamVjdFxuICAgIH07XG4gICAgdGhpcy5vYmpzVG9DbGVhcl9pTiR0LnB1c2godmFsdWUpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAodmFsdWVbaV0gIT09IDApIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZW1lbnQgPSBhcnJheVZhciArICdbJyArIGkgKyAnXT0nO1xuICAgICAgICAgICAgd3JpdGVBc3NpZ25tZW50KGNvZGVBcnJheSwgc3RhdGVtZW50LCB2YWx1ZVtpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvZGVBcnJheTtcbn07XG5cbnByb3RvLmVudW1lcmF0ZUZpZWxkID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XG4gICAgICAgIHZhciBfaU4kdCA9IHZhbHVlLl9pTiR0O1xuICAgICAgICBpZiAoX2lOJHQpIHtcbiAgICAgICAgICAgIC8vIHBhcnNlZFxuICAgICAgICAgICAgdmFyIGdsb2JhbFZhciA9IF9pTiR0Lmdsb2JhbFZhcjtcbiAgICAgICAgICAgIGlmICghZ2xvYmFsVmFyKSB7XG4gICAgICAgICAgICAgICAgLy8gZGVjbGFyZSBhIGdsb2JhbCB2YXJcbiAgICAgICAgICAgICAgICBnbG9iYWxWYXIgPSBfaU4kdC5nbG9iYWxWYXIgPSAndicgKyAoKyt0aGlzLmdsb2JhbFZhcmlhYmxlSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsVmFyaWFibGVzLnB1c2goZ2xvYmFsVmFyKTtcbiAgICAgICAgICAgICAgICAvLyBpbnNlcnQgYXNzaWdubWVudCBzdGF0ZW1lbnQgdG8gYXNzaWduIHRvIGdsb2JhbCB2YXJcbiAgICAgICAgICAgICAgICB2YXIgbGluZSA9IF9pTiR0LnNvdXJjZVtMSU5FX0lOREVYX09GX05FV19PQkpdO1xuICAgICAgICAgICAgICAgIF9pTiR0LnNvdXJjZVtMSU5FX0lOREVYX09GX05FV19PQkpdID0gbWVyZ2VEZWNsYXJhdGlvbihnbG9iYWxWYXIgKyAnPScsIGxpbmUpO1xuICAgICAgICAgICAgICAgIC8vIGlmICh0eXBlb2YgbGluZSA9PT0nc3RyaW5nJyAmJiBsaW5lLnN0YXJ0c1dpdGgoVkFSKSkge1xuICAgICAgICAgICAgICAgIC8vICAgICAvLyB2YXIgbz14eHggLT4gdmFyIG89Z2xvYmFsPXh4eFxuICAgICAgICAgICAgICAgIC8vICAgICB2YXIgTEVOX09GX1ZBUl9PID0gNTtcbiAgICAgICAgICAgICAgICAvLyAgICAgX2lOJHQuc291cmNlW0xJTkVfSU5ERVhfT0ZfTkVXX09CSl0gPSBsaW5lLnNsaWNlKDAsIExFTl9PRl9WQVJfTykgKyAnPScgKyBnbG9iYWxWYXIgKyBsaW5lLnNsaWNlKExFTl9PRl9WQVJfTyk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbFZhcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW50aWF0ZVR5cGVkQXJyYXkodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW50aWF0ZUFycmF5KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbnRpYXRlT2JqKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnVuY01vZHVsZSh2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGVzY2FwZUZvckpTKHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChrZXkgPT09ICdfb2JqRmxhZ3MnICYmIChvYmogaW5zdGFuY2VvZiBDQ09iamVjdCkpIHtcbiAgICAgICAgICAgIHZhbHVlICY9IFBlcnNpc3RlbnRNYXNrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59O1xuXG5wcm90by5zZXRPYmpQcm9wID0gZnVuY3Rpb24gKGNvZGVBcnJheSwgb2JqLCBrZXksIHZhbHVlKSB7XG4gICAgdmFyIHN0YXRlbWVudCA9IExPQ0FMX09CSiArIGdldFByb3BBY2Nlc3NvcihrZXkpICsgJz0nO1xuICAgIHZhciBleHByZXNzaW9uID0gdGhpcy5lbnVtZXJhdGVGaWVsZChvYmosIGtleSwgdmFsdWUpO1xuICAgIHdyaXRlQXNzaWdubWVudChjb2RlQXJyYXksIHN0YXRlbWVudCwgZXhwcmVzc2lvbik7XG59O1xuXG4vLyBjb2RlQXJyYXkgLSB0aGUgc291cmNlIGNvZGUgYXJyYXkgZm9yIHRoaXMgb2JqZWN0XG5wcm90by5lbnVtZXJhdGVPYmplY3QgPSBmdW5jdGlvbiAoY29kZUFycmF5LCBvYmopIHtcbiAgICB2YXIga2xhc3MgPSBvYmouY29uc3RydWN0b3I7XG4gICAgaWYgKGNjLkNsYXNzLl9pc0NDQ2xhc3Moa2xhc3MpKSB7XG4gICAgICAgIHRoaXMuZW51bWVyYXRlQ0NDbGFzcyhjb2RlQXJyYXksIG9iaiwga2xhc3MpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gcHJpbWl0aXZlIGphdmFzY3JpcHQgb2JqZWN0XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkgfHxcbiAgICAgICAgICAgICAgICAoa2V5LmNoYXJDb2RlQXQoMCkgPT09IDk1ICYmIGtleS5jaGFyQ29kZUF0KDEpID09PSA5NSAmJiAgIC8vIHN0YXJ0cyB3aXRoIFwiX19cIlxuICAgICAgICAgICAgICAgICBrZXkgIT09ICdfX3R5cGVfXycpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUgPT09IG9iai5faU4kdCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRPYmpQcm9wKGNvZGVBcnJheSwgb2JqLCBrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnByb3RvLmluc3RhbnRpYXRlT2JqID0gZnVuY3Rpb24gKG9iaikge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBjYy5WYWx1ZVR5cGUpIHtcbiAgICAgICAgcmV0dXJuIENDQ2xhc3MuZ2V0TmV3VmFsdWVUeXBlQ29kZShvYmopO1xuICAgIH1cbiAgICBpZiAob2JqIGluc3RhbmNlb2YgY2MuQXNzZXQpIHtcbiAgICAgICAgLy8gcmVnaXN0ZXIgdG8gYXNzZXQgbGlzdCBhbmQganVzdCByZXR1cm4gdGhlIHJlZmVyZW5jZS5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T2JqUmVmKG9iaik7XG4gICAgfVxuICAgIGlmIChvYmouX29iakZsYWdzICYgRGVzdHJveWVkKSB7XG4gICAgICAgIC8vIHRoZSBzYW1lIGFzIGNjLmlzVmFsaWQob2JqKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgY3JlYXRlQ29kZTtcbiAgICB2YXIgY3RvciA9IG9iai5jb25zdHJ1Y3RvcjtcbiAgICBpZiAoY2MuQ2xhc3MuX2lzQ0NDbGFzcyhjdG9yKSkge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudCBpbnN0YW5jZW9mIGNjLkNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBjYy5fQmFzZU5vZGUgfHwgb2JqIGluc3RhbmNlb2YgY2MuQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9ialJlZihvYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucGFyZW50IGluc3RhbmNlb2YgY2MuX0Jhc2VOb2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIGNjLl9CYXNlTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW9iai5pc0NoaWxkT2YodGhpcy5wYXJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzaG91bGQgbm90IGNsb25lIG90aGVyIG5vZGVzIGlmIG5vdCBkZXNjZW5kYW50XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPYmpSZWYob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBjYy5Db21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmoubm9kZS5pc0NoaWxkT2YodGhpcy5wYXJlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzaG91bGQgbm90IGNsb25lIG90aGVyIGNvbXBvbmVudCBpZiBub3QgZGVzY2VuZGFudFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T2JqUmVmKG9iaik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlQ29kZSA9IG5ldyBEZWNsYXJhdGlvbihMT0NBTF9PQkosICduZXcgJyArIHRoaXMuZ2V0RnVuY01vZHVsZShjdG9yLCB0cnVlKSArICcoKScpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjdG9yID09PSBPYmplY3QpIHtcbiAgICAgICAgY3JlYXRlQ29kZSA9IG5ldyBEZWNsYXJhdGlvbihMT0NBTF9PQkosICd7fScpO1xuICAgIH1cbiAgICBlbHNlIGlmICghY3Rvcikge1xuICAgICAgICBjcmVhdGVDb2RlID0gbmV3IERlY2xhcmF0aW9uKExPQ0FMX09CSiwgJ09iamVjdC5jcmVhdGUobnVsbCknKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIGRvIG5vdCBjbG9uZSB1bmtub3duIHR5cGVcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T2JqUmVmKG9iaik7XG4gICAgfVxuXG4gICAgdmFyIGNvZGVBcnJheSA9IFtjcmVhdGVDb2RlXTtcblxuICAgIC8vIGFzc2lnbiBhIF9pTiR0IGZsYWcgdG8gaW5kaWNhdGUgdGhhdCB0aGlzIG9iamVjdCBoYXMgYmVlbiBwYXJzZWQuXG4gICAganMudmFsdWUob2JqLCAnX2lOJHQnLCB7XG4gICAgICAgIGdsb2JhbFZhcjogJycsICAgICAgLy8gdGhlIG5hbWUgb2YgZGVjbGFyZWQgZ2xvYmFsIHZhcmlhYmxlIHVzZWQgdG8gYWNjZXNzIHRoaXMgb2JqZWN0XG4gICAgICAgIHNvdXJjZTogY29kZUFycmF5LCAgLy8gdGhlIHNvdXJjZSBjb2RlIGFycmF5IGZvciB0aGlzIG9iamVjdFxuICAgICAgICAvL3Byb3BOYW1lOiAnJywgICAgIC8vIHRoZSBwcm9wTmFtZSB0aGlzIG9iamVjdCBkZWZpbmVkIGluIGl0cyBzb3VyY2UgY29kZSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAvLyBpZiBkZWZpbmVkLCB1c2UgTE9DQUxfT0JKLnByb3BOYW1lIHRvIGFjY2VzcyB0aGUgb2JqLCBlbHNlIGp1c3QgdXNlIG9cbiAgICB9LCB0cnVlKTtcbiAgICB0aGlzLm9ianNUb0NsZWFyX2lOJHQucHVzaChvYmopO1xuXG4gICAgdGhpcy5lbnVtZXJhdGVPYmplY3QoY29kZUFycmF5LCBvYmopO1xuICAgIHJldHVybiBbJyhmdW5jdGlvbigpeycsXG4gICAgICAgICAgICAgICAgY29kZUFycmF5LFxuICAgICAgICAgICAgJ3JldHVybiBvO30pKCk7J107XG59O1xuXG5cbmZ1bmN0aW9uIGNvbXBpbGUgKG5vZGUpIHtcbiAgICB2YXIgcm9vdCA9IChub2RlIGluc3RhbmNlb2YgY2MuX0Jhc2VOb2RlKSAmJiBub2RlO1xuICAgIHZhciBwYXJzZXIgPSBuZXcgUGFyc2VyKG5vZGUsIHJvb3QpO1xuICAgIHJldHVybiBwYXJzZXIucmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb21waWxlOiBjb21waWxlLFxuICAgIGVxdWFsc1RvRGVmYXVsdDogZXF1YWxzVG9EZWZhdWx0XG59O1xuXG5pZiAoQ0NfVEVTVCkge1xuICAgIGNjLl9UZXN0LkludGFudGlhdGVKaXQgPSBtb2R1bGUuZXhwb3J0cztcbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9