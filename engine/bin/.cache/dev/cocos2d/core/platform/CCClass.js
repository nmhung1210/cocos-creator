
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCClass.js';
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
var js = require('./js');

var Enum = require('./CCEnum');

var utils = require('./utils');

var _isPlainEmptyObj_DEV = utils.isPlainEmptyObj_DEV;
var _cloneable_DEV = utils.cloneable_DEV;

var Attr = require('./attribute');

var DELIMETER = Attr.DELIMETER;

var preprocess = require('./preprocess-class');

require('./requiring-frame');

var BUILTIN_ENTRIES = ['name', 'extends', 'mixins', 'ctor', '__ctor__', 'properties', 'statics', 'editor', '__ES6__'];
var INVALID_STATICS_DEV = CC_DEV && ['name', '__ctors__', '__props__', 'arguments', 'call', 'apply', 'caller', 'length', 'prototype'];

function pushUnique(array, item) {
  if (array.indexOf(item) < 0) {
    array.push(item);
  }
}

var deferredInitializer = {
  // Configs for classes which needs deferred initialization
  datas: null,
  // register new class
  // data - {cls: cls, cb: properties, mixins: options.mixins}
  push: function push(data) {
    if (this.datas) {
      this.datas.push(data);
    } else {
      this.datas = [data]; // start a new timer to initialize

      var self = this;
      setTimeout(function () {
        self.init();
      }, 0);
    }
  },
  init: function init() {
    var datas = this.datas;

    if (datas) {
      for (var i = 0; i < datas.length; ++i) {
        var data = datas[i];
        var cls = data.cls;
        var properties = data.props;

        if (typeof properties === 'function') {
          properties = properties();
        }

        var name = js.getClassName(cls);

        if (properties) {
          declareProperties(cls, name, properties, cls.$super, data.mixins);
        } else {
          cc.errorID(3633, name);
        }
      }

      this.datas = null;
    }
  }
}; // both getter and prop must register the name into __props__ array

function appendProp(cls, name) {
  if (CC_DEV) {
    //if (!IDENTIFIER_RE.test(name)) {
    //    cc.error('The property name "' + name + '" is not compliant with JavaScript naming standards');
    //    return;
    //}
    if (name.indexOf('.') !== -1) {
      cc.errorID(3634);
      return;
    }
  }

  pushUnique(cls.__props__, name);
}

function defineProp(cls, className, propName, val, es6) {
  var defaultValue = val["default"];

  if (CC_DEV) {
    if (!es6) {
      // check default object value
      if (typeof defaultValue === 'object' && defaultValue) {
        if (Array.isArray(defaultValue)) {
          // check array empty
          if (defaultValue.length > 0) {
            cc.errorID(3635, className, propName, propName);
            return;
          }
        } else if (!_isPlainEmptyObj_DEV(defaultValue)) {
          // check cloneable
          if (!_cloneable_DEV(defaultValue)) {
            cc.errorID(3636, className, propName, propName);
            return;
          }
        }
      }
    } // check base prototype to avoid name collision


    if (CCClass.getInheritanceChain(cls).some(function (x) {
      return x.prototype.hasOwnProperty(propName);
    })) {
      cc.errorID(3637, className, propName, className);
      return;
    }
  } // set default value


  Attr.setClassAttr(cls, propName, 'default', defaultValue);
  appendProp(cls, propName); // apply attributes

  parseAttributes(cls, val, className, propName, false);

  if (CC_EDITOR && !Editor.isBuilder || CC_TEST) {
    for (var i = 0; i < onAfterProps_ET.length; i++) {
      onAfterProps_ET[i](cls, propName);
    }

    onAfterProps_ET.length = 0;
  }
}

function defineGetSet(cls, name, propName, val, es6) {
  var getter = val.get;
  var setter = val.set;
  var proto = cls.prototype;
  var d = Object.getOwnPropertyDescriptor(proto, propName);
  var setterUndefined = !d;

  if (getter) {
    if (CC_DEV && !es6 && d && d.get) {
      cc.errorID(3638, name, propName);
      return;
    }

    parseAttributes(cls, val, name, propName, true);

    if (CC_EDITOR && !Editor.isBuilder || CC_TEST) {
      onAfterProps_ET.length = 0;
    }

    Attr.setClassAttr(cls, propName, 'serializable', false);

    if (CC_DEV) {
      // 不论是否 visible 都要添加到 props，否则 asset watcher 不能正常工作
      appendProp(cls, propName);
    }

    if (!es6) {
      js.get(proto, propName, getter, setterUndefined, setterUndefined);
    }

    if (CC_EDITOR || CC_DEV) {
      Attr.setClassAttr(cls, propName, 'hasGetter', true); // 方便 editor 做判断
    }
  }

  if (setter) {
    if (!es6) {
      if (CC_DEV && d && d.set) {
        return cc.errorID(3640, name, propName);
      }

      js.set(proto, propName, setter, setterUndefined, setterUndefined);
    }

    if (CC_EDITOR || CC_DEV) {
      Attr.setClassAttr(cls, propName, 'hasSetter', true); // 方便 editor 做判断
    }
  }
}

function getDefault(defaultVal) {
  if (typeof defaultVal === 'function') {
    if (CC_EDITOR) {
      try {
        return defaultVal();
      } catch (e) {
        cc._throw(e);

        return undefined;
      }
    } else {
      return defaultVal();
    }
  }

  return defaultVal;
}

function mixinWithInherited(dest, src, filter) {
  for (var prop in src) {
    if (!dest.hasOwnProperty(prop) && (!filter || filter(prop))) {
      Object.defineProperty(dest, prop, js.getPropertyDescriptor(src, prop));
    }
  }
}

function doDefine(className, baseClass, mixins, options) {
  var shouldAddProtoCtor;
  var __ctor__ = options.__ctor__;
  var ctor = options.ctor;
  var __es6__ = options.__ES6__;

  if (CC_DEV) {
    // check ctor
    var ctorToUse = __ctor__ || ctor;

    if (ctorToUse) {
      if (CCClass._isCCClass(ctorToUse)) {
        cc.errorID(3618, className);
      } else if (typeof ctorToUse !== 'function') {
        cc.errorID(3619, className);
      } else {
        if (baseClass && /\bprototype.ctor\b/.test(ctorToUse)) {
          if (__es6__) {
            cc.errorID(3651, className || "");
          } else {
            cc.warnID(3600, className || "");
            shouldAddProtoCtor = true;
          }
        }
      }

      if (ctor) {
        if (__ctor__) {
          cc.errorID(3649, className);
        } else {
          ctor = options.ctor = _validateCtor_DEV(ctor, baseClass, className, options);
        }
      }
    }
  }

  var ctors;
  var fireClass;

  if (__es6__) {
    ctors = [ctor];
    fireClass = ctor;
  } else {
    ctors = __ctor__ ? [__ctor__] : _getAllCtors(baseClass, mixins, options);
    fireClass = _createCtor(ctors, baseClass, className, options); // extend - Create a new Class that inherits from this Class

    js.value(fireClass, 'extend', function (options) {
      options["extends"] = this;
      return CCClass(options);
    }, true);
  }

  js.value(fireClass, '__ctors__', ctors.length > 0 ? ctors : null, true);
  var prototype = fireClass.prototype;

  if (baseClass) {
    if (!__es6__) {
      js.extend(fireClass, baseClass); // 这里会把父类的 __props__ 复制给子类

      prototype = fireClass.prototype; // get extended prototype
    }

    fireClass.$super = baseClass;

    if (CC_DEV && shouldAddProtoCtor) {
      prototype.ctor = function () {};
    }
  }

  if (mixins) {
    for (var m = mixins.length - 1; m >= 0; m--) {
      var mixin = mixins[m];
      mixinWithInherited(prototype, mixin.prototype); // mixin statics (this will also copy editor attributes for component)

      mixinWithInherited(fireClass, mixin, function (prop) {
        return mixin.hasOwnProperty(prop) && (!CC_DEV || INVALID_STATICS_DEV.indexOf(prop) < 0);
      }); // mixin attributes

      if (CCClass._isCCClass(mixin)) {
        mixinWithInherited(Attr.getClassAttrs(fireClass), Attr.getClassAttrs(mixin));
      }
    } // restore constuctor overridden by mixin


    prototype.constructor = fireClass;
  }

  if (!__es6__) {
    prototype.__initProps__ = compileProps;
  }

  js.setClassName(className, fireClass);
  return fireClass;
}

function define(className, baseClass, mixins, options) {
  var Component = cc.Component;

  var frame = cc._RF.peek();

  if (frame && js.isChildClassOf(baseClass, Component)) {
    // project component
    if (js.isChildClassOf(frame.cls, Component)) {
      cc.errorID(3615);
      return null;
    }

    if (CC_DEV && frame.uuid && className) {
      cc.warnID(3616, className);
    }

    className = className || frame.script;
  }

  var cls = doDefine(className, baseClass, mixins, options);

  if (frame) {
    if (js.isChildClassOf(baseClass, Component)) {
      var uuid = frame.uuid;

      if (uuid) {
        js._setClassId(uuid, cls);

        if (CC_EDITOR) {
          Component._addMenuItem(cls, 'i18n:MAIN_MENU.component.scripts/' + className, -1);

          cls.prototype.__scriptUuid = Editor.Utils.UuidUtils.decompressUuid(uuid);
        }
      }

      frame.cls = cls;
    } else if (!js.isChildClassOf(frame.cls, Component)) {
      frame.cls = cls;
    }
  }

  return cls;
}

function normalizeClassName_DEV(className) {
  var DefaultName = 'CCClass';

  if (className) {
    className = className.replace(/^[^$A-Za-z_]/, '_').replace(/[^0-9A-Za-z_$]/g, '_');

    try {
      // validate name
      Function('function ' + className + '(){}')();
      return className;
    } catch (e) {
      ;
    }
  }

  return DefaultName;
}

function getNewValueTypeCodeJit(value) {
  var clsName = js.getClassName(value);
  var type = value.constructor;
  var res = 'new ' + clsName + '(';

  for (var i = 0; i < type.__props__.length; i++) {
    var prop = type.__props__[i];
    var propVal = value[prop];

    if (CC_DEV && typeof propVal === 'object') {
      cc.errorID(3641, clsName);
      return 'new ' + clsName + '()';
    }

    res += propVal;

    if (i < type.__props__.length - 1) {
      res += ',';
    }
  }

  return res + ')';
} // TODO - move escapeForJS, IDENTIFIER_RE, getNewValueTypeCodeJit to misc.js or a new source file
// convert a normal string including newlines, quotes and unicode characters into a string literal
// ready to use in JavaScript source


function escapeForJS(s) {
  return JSON.stringify(s). // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
  replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}

function getInitPropsJit(attrs, propList) {
  // functions for generated code
  var F = [];
  var func = '';

  for (var i = 0; i < propList.length; i++) {
    var prop = propList[i];
    var attrKey = prop + DELIMETER + 'default';

    if (attrKey in attrs) {
      // getter does not have default
      var statement;

      if (IDENTIFIER_RE.test(prop)) {
        statement = 'this.' + prop + '=';
      } else {
        statement = 'this[' + escapeForJS(prop) + ']=';
      }

      var expression;
      var def = attrs[attrKey];

      if (typeof def === 'object' && def) {
        if (def instanceof cc.ValueType) {
          expression = getNewValueTypeCodeJit(def);
        } else if (Array.isArray(def)) {
          expression = '[]';
        } else {
          expression = '{}';
        }
      } else if (typeof def === 'function') {
        var index = F.length;
        F.push(def);
        expression = 'F[' + index + ']()';

        if (CC_EDITOR) {
          func += 'try {\n' + statement + expression + ';\n}\ncatch(e) {\ncc._throw(e);\n' + statement + 'undefined;\n}\n';
          continue;
        }
      } else if (typeof def === 'string') {
        expression = escapeForJS(def);
      } else {
        // number, boolean, null, undefined
        expression = def;
      }

      statement = statement + expression + ';\n';
      func += statement;
    }
  } // if (CC_TEST && !isPhantomJS) {
  //     console.log(func);
  // }


  var initProps;

  if (F.length === 0) {
    initProps = Function(func);
  } else {
    initProps = Function('F', 'return (function(){\n' + func + '})')(F);
  }

  return initProps;
}

function getInitProps(attrs, propList) {
  var props = null;
  var simpleEnd = 0;
  var valueTypeEnd = 0;

  (function () {
    // triage properties
    var simples = null;
    var valueTypes = null;
    var advanceds = null;

    for (var i = 0; i < propList.length; ++i) {
      var prop = propList[i];
      var attrKey = prop + DELIMETER + 'default';

      if (attrKey in attrs) {
        // getter does not have default
        var def = attrs[attrKey];

        if (typeof def === 'object' && def || typeof def === 'function') {
          if (def instanceof cc.ValueType) {
            if (!valueTypes) {
              valueTypes = [];
            }

            valueTypes.push(prop, def);
          } else {
            if (!advanceds) {
              advanceds = [];
            }

            advanceds.push(prop, def);
          }
        } else {
          // number, boolean, null, undefined, string
          if (!simples) {
            simples = [];
          }

          simples.push(prop, def);
        }
      }
    } // concat in compact memory


    simpleEnd = simples ? simples.length : 0;
    valueTypeEnd = simpleEnd + (valueTypes ? valueTypes.length : 0);
    var totalLength = valueTypeEnd + (advanceds ? advanceds.length : 0);
    props = new Array(totalLength);

    for (var _i = 0; _i < simpleEnd; ++_i) {
      props[_i] = simples[_i];
    }

    for (var _i2 = simpleEnd; _i2 < valueTypeEnd; ++_i2) {
      props[_i2] = valueTypes[_i2 - simpleEnd];
    }

    for (var _i3 = valueTypeEnd; _i3 < totalLength; ++_i3) {
      props[_i3] = advanceds[_i3 - valueTypeEnd];
    }
  })();

  return function () {
    var i = 0;

    for (; i < simpleEnd; i += 2) {
      this[props[i]] = props[i + 1];
    }

    for (; i < valueTypeEnd; i += 2) {
      this[props[i]] = props[i + 1].clone();
    }

    for (; i < props.length; i += 2) {
      var def = props[i + 1];

      if (Array.isArray(def)) {
        this[props[i]] = [];
      } else {
        var value;

        if (typeof def === 'object') {
          value = {};
        } else {
          // def is function
          if (CC_EDITOR) {
            try {
              value = def();
            } catch (err) {
              cc._throw(e);

              continue;
            }
          } else {
            value = def();
          }
        }

        this[props[i]] = value;
      }
    }
  };
} // simple test variable name


var IDENTIFIER_RE = /^[A-Za-z_$][0-9A-Za-z_$]*$/;

function compileProps(actualClass) {
  // init deferred properties
  var attrs = Attr.getClassAttrs(actualClass);
  var propList = actualClass.__props__;

  if (propList === null) {
    deferredInitializer.init();
    propList = actualClass.__props__;
  } // Overwite __initProps__ to avoid compile again.


  var initProps = CC_SUPPORT_JIT ? getInitPropsJit(attrs, propList) : getInitProps(attrs, propList);
  actualClass.prototype.__initProps__ = initProps; // call instantiateProps immediately, no need to pass actualClass into it anymore
  // (use call to manually bind `this` because `this` may not instanceof actualClass)

  initProps.call(this);
}

var _createCtor = CC_SUPPORT_JIT ? function (ctors, baseClass, className, options) {
  var superCallBounded = baseClass && boundSuperCalls(baseClass, options, className);
  var ctorName = CC_DEV ? normalizeClassName_DEV(className) : 'CCClass';
  var body = 'return function ' + ctorName + '(){\n';

  if (superCallBounded) {
    body += 'this._super=null;\n';
  } // instantiate props


  body += 'this.__initProps__(' + ctorName + ');\n'; // call user constructors

  var ctorLen = ctors.length;

  if (ctorLen > 0) {
    var useTryCatch = CC_DEV && !(className && className.startsWith('cc.'));

    if (useTryCatch) {
      body += 'try{\n';
    }

    var SNIPPET = '].apply(this,arguments);\n';

    if (ctorLen === 1) {
      body += ctorName + '.__ctors__[0' + SNIPPET;
    } else {
      body += 'var cs=' + ctorName + '.__ctors__;\n';

      for (var i = 0; i < ctorLen; i++) {
        body += 'cs[' + i + SNIPPET;
      }
    }

    if (useTryCatch) {
      body += '}catch(e){\n' + 'cc._throw(e);\n' + '}\n';
    }
  }

  body += '}';
  return Function(body)();
} : function (ctors, baseClass, className, options) {
  var superCallBounded = baseClass && boundSuperCalls(baseClass, options, className);
  var ctorLen = ctors.length;

  var _Class5;

  if (ctorLen > 0) {
    if (superCallBounded) {
      if (ctorLen === 2) {
        // User Component
        _Class5 = function Class() {
          this._super = null;

          this.__initProps__(_Class5);

          ctors[0].apply(this, arguments);
          ctors[1].apply(this, arguments);
        };
      } else {
        _Class5 = function _Class() {
          this._super = null;

          this.__initProps__(_Class5);

          for (var i = 0; i < ctors.length; ++i) {
            ctors[i].apply(this, arguments);
          }
        };
      }
    } else {
      if (ctorLen === 3) {
        // Node
        _Class5 = function _Class2() {
          this.__initProps__(_Class5);

          ctors[0].apply(this, arguments);
          ctors[1].apply(this, arguments);
          ctors[2].apply(this, arguments);
        };
      } else {
        _Class5 = function _Class3() {
          this.__initProps__(_Class5);

          var ctors = _Class5.__ctors__;

          for (var i = 0; i < ctors.length; ++i) {
            ctors[i].apply(this, arguments);
          }
        };
      }
    }
  } else {
    _Class5 = function _Class4() {
      if (superCallBounded) {
        this._super = null;
      }

      this.__initProps__(_Class5);
    };
  }

  return _Class5;
};

function _validateCtor_DEV(ctor, baseClass, className, options) {
  if (CC_EDITOR && baseClass) {
    // check super call in constructor
    var originCtor = ctor;

    if (SuperCallReg.test(ctor)) {
      if (options.__ES6__) {
        cc.errorID(3651, className);
      } else {
        cc.warnID(3600, className); // suppresss super call

        ctor = function ctor() {
          this._super = function () {};

          var ret = originCtor.apply(this, arguments);
          this._super = null;
          return ret;
        };
      }
    }
  } // check ctor


  if (ctor.length > 0 && (!className || !className.startsWith('cc.'))) {
    // To make a unified CCClass serialization process,
    // we don't allow parameters for constructor when creating instances of CCClass.
    // For advanced user, construct arguments can still get from 'arguments'.
    cc.warnID(3617, className);
  }

  return ctor;
}

function _getAllCtors(baseClass, mixins, options) {
  // get base user constructors
  function getCtors(cls) {
    if (CCClass._isCCClass(cls)) {
      return cls.__ctors__ || [];
    } else {
      return [cls];
    }
  }

  var ctors = []; // if (options.__ES6__) {
  //     if (mixins) {
  //         let baseOrMixins = getCtors(baseClass);
  //         for (let b = 0; b < mixins.length; b++) {
  //             let mixin = mixins[b];
  //             if (mixin) {
  //                 let baseCtors = getCtors(mixin);
  //                 for (let c = 0; c < baseCtors.length; c++) {
  //                     if (baseOrMixins.indexOf(baseCtors[c]) < 0) {
  //                         pushUnique(ctors, baseCtors[c]);
  //                     }
  //                 }
  //             }
  //         }
  //     }
  // }
  // else {

  var baseOrMixins = [baseClass].concat(mixins);

  for (var b = 0; b < baseOrMixins.length; b++) {
    var baseOrMixin = baseOrMixins[b];

    if (baseOrMixin) {
      var baseCtors = getCtors(baseOrMixin);

      for (var c = 0; c < baseCtors.length; c++) {
        pushUnique(ctors, baseCtors[c]);
      }
    }
  } // }
  // append subclass user constructors


  var ctor = options.ctor;

  if (ctor) {
    ctors.push(ctor);
  }

  return ctors;
}

var SuperCallReg = /xyz/.test(function () {
  xyz;
}) ? /\b\._super\b/ : /.*/;
var SuperCallRegStrict = /xyz/.test(function () {
  xyz;
}) ? /this\._super\s*\(/ : /(NONE){99}/;

function boundSuperCalls(baseClass, options, className) {
  var hasSuperCall = false;

  for (var funcName in options) {
    if (BUILTIN_ENTRIES.indexOf(funcName) >= 0) {
      continue;
    }

    var func = options[funcName];

    if (typeof func !== 'function') {
      continue;
    }

    var pd = js.getPropertyDescriptor(baseClass.prototype, funcName);

    if (pd) {
      var superFunc = pd.value; // ignore pd.get, assume that function defined by getter is just for warnings

      if (typeof superFunc === 'function') {
        if (SuperCallReg.test(func)) {
          hasSuperCall = true; // boundSuperCall

          options[funcName] = function (superFunc, func) {
            return function () {
              var tmp = this._super; // Add a new ._super() method that is the same method but on the super-Class

              this._super = superFunc;
              var ret = func.apply(this, arguments); // The method only need to be bound temporarily, so we remove it when we're done executing

              this._super = tmp;
              return ret;
            };
          }(superFunc, func);
        }

        continue;
      }
    }

    if (CC_DEV && SuperCallRegStrict.test(func)) {
      cc.warnID(3620, className, funcName);
    }
  }

  return hasSuperCall;
}

function declareProperties(cls, className, properties, baseClass, mixins, es6) {
  cls.__props__ = [];

  if (baseClass && baseClass.__props__) {
    cls.__props__ = baseClass.__props__.slice();
  }

  if (mixins) {
    for (var m = 0; m < mixins.length; ++m) {
      var mixin = mixins[m];

      if (mixin.__props__) {
        cls.__props__ = cls.__props__.concat(mixin.__props__.filter(function (x) {
          return cls.__props__.indexOf(x) < 0;
        }));
      }
    }
  }

  if (properties) {
    // 预处理属性
    preprocess.preprocessAttrs(properties, className, cls, es6);

    for (var propName in properties) {
      var val = properties[propName];

      if ('default' in val) {
        defineProp(cls, className, propName, val, es6);
      } else {
        defineGetSet(cls, className, propName, val, es6);
      }
    }
  }

  var attrs = Attr.getClassAttrs(cls);
  cls.__values__ = cls.__props__.filter(function (prop) {
    return attrs[prop + DELIMETER + 'serializable'] !== false;
  });
}
/**
 * @module cc
 */

/**
 * !#en Defines a CCClass using the given specification, please see [Class](/docs/editors_and_tools/creator-chapters/scripting/class.html) for details.
 * !#zh 定义一个 CCClass，传入参数必须是一个包含类型参数的字面量对象，具体用法请查阅[类型定义](/docs/creator/scripting/class.html)。
 *
 * @method Class
 *
 * @param {Object} [options]
 * @param {String} [options.name] - The class name used for serialization.
 * @param {Function} [options.extends] - The base class.
 * @param {Function} [options.ctor] - The constructor.
 * @param {Function} [options.__ctor__] - The same as ctor, but less encapsulated.
 * @param {Object} [options.properties] - The property definitions.
 * @param {Object} [options.statics] - The static members.
 * @param {Function[]} [options.mixins]
 *
 * @param {Object} [options.editor] - attributes for Component listed below.
 * @param {Boolean} [options.editor.executeInEditMode=false] - Allows the current component to run in edit mode. By default, all components are executed only at runtime, meaning that they will not have their callback functions executed while the Editor is in edit mode.
 * @param {Function} [options.editor.requireComponent] - Automatically add required component as a dependency.
 * @param {String} [options.editor.menu] - The menu path to register a component to the editors "Component" menu. Eg. "Rendering/Camera".
 * @param {Number} [options.editor.executionOrder=0] - The execution order of lifecycle methods for Component. Those less than 0 will execute before while those greater than 0 will execute after. The order will only affect onLoad, onEnable, start, update and lateUpdate while onDisable and onDestroy will not be affected.
 * @param {Boolean} [options.editor.disallowMultiple] - If specified to a type, prevents Component of the same type (or subtype) to be added more than once to a Node.
 * @param {Boolean} [options.editor.playOnFocus=false] - This property is only available when executeInEditMode is set. If specified, the editor's scene view will keep updating this node in 60 fps when it is selected, otherwise, it will update only if necessary.
 * @param {String} [options.editor.inspector] - Customize the page url used by the current component to render in the Properties.
 * @param {String} [options.editor.icon] - Customize the icon that the current component displays in the editor.
 * @param {String} [options.editor.help] - The custom documentation URL
 *
 * @param {Function} [options.update] - lifecycle method for Component, see {{#crossLink "Component/update:method"}}{{/crossLink}}
 * @param {Function} [options.lateUpdate] - lifecycle method for Component, see {{#crossLink "Component/lateUpdate:method"}}{{/crossLink}}
 * @param {Function} [options.onLoad] - lifecycle method for Component, see {{#crossLink "Component/onLoad:method"}}{{/crossLink}}
 * @param {Function} [options.start] - lifecycle method for Component, see {{#crossLink "Component/start:method"}}{{/crossLink}}
 * @param {Function} [options.onEnable] - lifecycle method for Component, see {{#crossLink "Component/onEnable:method"}}{{/crossLink}}
 * @param {Function} [options.onDisable] - lifecycle method for Component, see {{#crossLink "Component/onDisable:method"}}{{/crossLink}}
 * @param {Function} [options.onDestroy] - lifecycle method for Component, see {{#crossLink "Component/onDestroy:method"}}{{/crossLink}}
 * @param {Function} [options.onFocusInEditor] - lifecycle method for Component, see {{#crossLink "Component/onFocusInEditor:method"}}{{/crossLink}}
 * @param {Function} [options.onLostFocusInEditor] - lifecycle method for Component, see {{#crossLink "Component/onLostFocusInEditor:method"}}{{/crossLink}}
 * @param {Function} [options.resetInEditor] - lifecycle method for Component, see {{#crossLink "Component/resetInEditor:method"}}{{/crossLink}}
 * @param {Function} [options.onRestore] - for Component only, see {{#crossLink "Component/onRestore:method"}}{{/crossLink}}
 * @param {Function} [options._getLocalBounds] - for Component only, see {{#crossLink "Component/_getLocalBounds:method"}}{{/crossLink}}
 *
 * @return {Function} - the created class
 *
 * @example

 // define base class
 var Node = cc.Class();

 // define sub class
 var Sprite = cc.Class({
     name: 'Sprite',
     extends: Node,

     ctor: function () {
         this.url = "";
         this.id = 0;
     },

     statics: {
         // define static members
         count: 0,
         getBounds: function (spriteList) {
             // compute bounds...
         }
     },

     properties {
         width: {
             default: 128,
             type: cc.Integer,
             tooltip: 'The width of sprite'
         },
         height: 128,
         size: {
             get: function () {
                 return cc.v2(this.width, this.height);
             }
         }
     },

     load: function () {
         // load this.url...
     };
 });

 // instantiate

 var obj = new Sprite();
 obj.url = 'sprite.png';
 obj.load();
 */


function CCClass(options) {
  options = options || {};
  var name = options.name;
  var base = options["extends"]
  /* || CCObject*/
  ;
  var mixins = options.mixins; // create constructor

  var cls = define(name, base, mixins, options);

  if (!name) {
    name = cc.js.getClassName(cls);
  }

  cls._sealed = true;

  if (base) {
    base._sealed = false;
  } // define Properties


  var properties = options.properties;

  if (typeof properties === 'function' || base && base.__props__ === null || mixins && mixins.some(function (x) {
    return x.__props__ === null;
  })) {
    if (CC_DEV && options.__ES6__) {
      cc.error('not yet implement deferred properties for ES6 Classes');
    } else {
      deferredInitializer.push({
        cls: cls,
        props: properties,
        mixins: mixins
      });
      cls.__props__ = cls.__values__ = null;
    }
  } else {
    declareProperties(cls, name, properties, base, options.mixins, options.__ES6__);
  } // define statics


  var statics = options.statics;

  if (statics) {
    var staticPropName;

    if (CC_DEV) {
      for (staticPropName in statics) {
        if (INVALID_STATICS_DEV.indexOf(staticPropName) !== -1) {
          cc.errorID(3642, name, staticPropName, staticPropName);
        }
      }
    }

    for (staticPropName in statics) {
      cls[staticPropName] = statics[staticPropName];
    }
  } // define functions


  for (var funcName in options) {
    if (BUILTIN_ENTRIES.indexOf(funcName) >= 0) {
      continue;
    }

    var func = options[funcName];

    if (!preprocess.validateMethodWithProps(func, funcName, name, cls, base)) {
      continue;
    } // use value to redefine some super method defined as getter


    js.value(cls.prototype, funcName, func, true, true);
  }

  var editor = options.editor;

  if (editor) {
    if (js.isChildClassOf(base, cc.Component)) {
      cc.Component._registerEditorProps(cls, editor);
    } else if (CC_DEV) {
      cc.warnID(3623, name);
    }
  }

  return cls;
}
/**
 * Checks whether the constructor is created by cc.Class
 *
 * @method _isCCClass
 * @param {Function} constructor
 * @return {Boolean}
 * @private
 */


CCClass._isCCClass = function (constructor) {
  return constructor && constructor.hasOwnProperty('__ctors__'); // is not inherited __ctors__
}; //
// Optimized define function only for internal classes
//
// @method _fastDefine
// @param {String} className
// @param {Function} constructor
// @param {Object} serializableFields
// @private
//


CCClass._fastDefine = function (className, constructor, serializableFields) {
  js.setClassName(className, constructor); //constructor.__ctors__ = constructor.__ctors__ || null;

  var props = constructor.__props__ = constructor.__values__ = Object.keys(serializableFields);
  var attrs = Attr.getClassAttrs(constructor);

  for (var i = 0; i < props.length; i++) {
    var key = props[i];
    attrs[key + DELIMETER + 'visible'] = false;
    attrs[key + DELIMETER + 'default'] = serializableFields[key];
  }
};

CCClass.Attr = Attr;
CCClass.attr = Attr.attr;
/*
 * Return all super classes
 * @method getInheritanceChain
 * @param {Function} constructor
 * @return {Function[]}
 */

CCClass.getInheritanceChain = function (klass) {
  var chain = [];

  for (;;) {
    klass = js.getSuper(klass);

    if (!klass) {
      break;
    }

    if (klass !== Object) {
      chain.push(klass);
    }
  }

  return chain;
};

var PrimitiveTypes = {
  // Specify that the input value must be integer in Properties.
  // Also used to indicates that the type of elements in array or the type of value in dictionary is integer.
  Integer: 'Number',
  // Indicates that the type of elements in array or the type of value in dictionary is double.
  Float: 'Number',
  Boolean: 'Boolean',
  String: 'String'
};
var onAfterProps_ET = [];

function parseAttributes(cls, attributes, className, propName, usedInGetter) {
  var ERR_Type = CC_DEV ? 'The %s of %s must be type %s' : '';
  var attrs = null;
  var propNamePrefix = '';

  function initAttrs() {
    propNamePrefix = propName + DELIMETER;
    return attrs = Attr.getClassAttrs(cls);
  }

  if (CC_EDITOR && !Editor.isBuilder || CC_TEST) {
    onAfterProps_ET.length = 0;
  }

  var type = attributes.type;

  if (type) {
    var primitiveType = PrimitiveTypes[type];

    if (primitiveType) {
      (attrs || initAttrs())[propNamePrefix + 'type'] = type;

      if ((CC_EDITOR && !Editor.isBuilder || CC_TEST) && !attributes._short) {
        onAfterProps_ET.push(Attr.getTypeChecker_ET(primitiveType, 'cc.' + type));
      }
    } else if (type === 'Object') {
      if (CC_DEV) {
        cc.errorID(3644, className, propName);
      }
    } else {
      if (type === Attr.ScriptUuid) {
        (attrs || initAttrs())[propNamePrefix + 'type'] = 'Script';
        attrs[propNamePrefix + 'ctor'] = cc.ScriptAsset;
      } else {
        if (typeof type === 'object') {
          if (Enum.isEnum(type)) {
            (attrs || initAttrs())[propNamePrefix + 'type'] = 'Enum';
            attrs[propNamePrefix + 'enumList'] = Enum.getList(type);
          } else if (CC_DEV) {
            cc.errorID(3645, className, propName, type);
          }
        } else if (typeof type === 'function') {
          (attrs || initAttrs())[propNamePrefix + 'type'] = 'Object';
          attrs[propNamePrefix + 'ctor'] = type;

          if ((CC_EDITOR && !Editor.isBuilder || CC_TEST) && !attributes._short) {
            onAfterProps_ET.push(Attr.getObjTypeChecker_ET(type));
          }
        } else if (CC_DEV) {
          cc.errorID(3646, className, propName, type);
        }
      }
    }
  }

  function parseSimpleAttr(attrName, expectType) {
    if (attrName in attributes) {
      var val = attributes[attrName];

      if (typeof val === expectType) {
        (attrs || initAttrs())[propNamePrefix + attrName] = val;
      } else if (CC_DEV) {
        cc.error(ERR_Type, attrName, className, propName, expectType);
      }
    }
  }

  if (attributes.editorOnly) {
    if (CC_DEV && usedInGetter) {
      cc.errorID(3613, "editorOnly", name, propName);
    } else {
      (attrs || initAttrs())[propNamePrefix + 'editorOnly'] = true;
    }
  } //parseSimpleAttr('preventDeferredLoad', 'boolean');


  if (CC_DEV) {
    parseSimpleAttr('displayName', 'string');
    parseSimpleAttr('multiline', 'boolean');

    if (attributes.readonly) {
      (attrs || initAttrs())[propNamePrefix + 'readonly'] = true;
    }

    parseSimpleAttr('tooltip', 'string');
    parseSimpleAttr('slide', 'boolean');
  }

  if (attributes.serializable === false) {
    if (CC_DEV && usedInGetter) {
      cc.errorID(3613, "serializable", name, propName);
    } else {
      (attrs || initAttrs())[propNamePrefix + 'serializable'] = false;
    }
  }

  parseSimpleAttr('formerlySerializedAs', 'string');

  if (CC_EDITOR) {
    parseSimpleAttr('notifyFor', 'string');

    if ('animatable' in attributes) {
      (attrs || initAttrs())[propNamePrefix + 'animatable'] = !!attributes.animatable;
    }
  }

  if (CC_DEV) {
    var visible = attributes.visible;

    if (typeof visible !== 'undefined') {
      if (!visible) {
        (attrs || initAttrs())[propNamePrefix + 'visible'] = false;
      } else if (typeof visible === 'function') {
        (attrs || initAttrs())[propNamePrefix + 'visible'] = visible;
      }
    } else {
      var startsWithUS = propName.charCodeAt(0) === 95;

      if (startsWithUS) {
        (attrs || initAttrs())[propNamePrefix + 'visible'] = false;
      }
    }
  }

  var range = attributes.range;

  if (range) {
    if (Array.isArray(range)) {
      if (range.length >= 2) {
        (attrs || initAttrs())[propNamePrefix + 'min'] = range[0];
        attrs[propNamePrefix + 'max'] = range[1];

        if (range.length > 2) {
          attrs[propNamePrefix + 'step'] = range[2];
        }
      } else if (CC_DEV) {
        cc.errorID(3647);
      }
    } else if (CC_DEV) {
      cc.error(ERR_Type, 'range', className, propName, 'array');
    }
  }

  parseSimpleAttr('min', 'number');
  parseSimpleAttr('max', 'number');
  parseSimpleAttr('step', 'number');
}

cc.Class = CCClass;
module.exports = {
  isArray: function isArray(defaultVal) {
    defaultVal = getDefault(defaultVal);
    return Array.isArray(defaultVal);
  },
  fastDefine: CCClass._fastDefine,
  getNewValueTypeCode: CC_SUPPORT_JIT && getNewValueTypeCodeJit,
  IDENTIFIER_RE: IDENTIFIER_RE,
  escapeForJS: escapeForJS,
  getDefault: getDefault
};

if (CC_TEST) {
  js.mixin(CCClass, module.exports);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL0NDQ2xhc3MuanMiXSwibmFtZXMiOlsianMiLCJyZXF1aXJlIiwiRW51bSIsInV0aWxzIiwiX2lzUGxhaW5FbXB0eU9ial9ERVYiLCJpc1BsYWluRW1wdHlPYmpfREVWIiwiX2Nsb25lYWJsZV9ERVYiLCJjbG9uZWFibGVfREVWIiwiQXR0ciIsIkRFTElNRVRFUiIsInByZXByb2Nlc3MiLCJCVUlMVElOX0VOVFJJRVMiLCJJTlZBTElEX1NUQVRJQ1NfREVWIiwiQ0NfREVWIiwicHVzaFVuaXF1ZSIsImFycmF5IiwiaXRlbSIsImluZGV4T2YiLCJwdXNoIiwiZGVmZXJyZWRJbml0aWFsaXplciIsImRhdGFzIiwiZGF0YSIsInNlbGYiLCJzZXRUaW1lb3V0IiwiaW5pdCIsImkiLCJsZW5ndGgiLCJjbHMiLCJwcm9wZXJ0aWVzIiwicHJvcHMiLCJuYW1lIiwiZ2V0Q2xhc3NOYW1lIiwiZGVjbGFyZVByb3BlcnRpZXMiLCIkc3VwZXIiLCJtaXhpbnMiLCJjYyIsImVycm9ySUQiLCJhcHBlbmRQcm9wIiwiX19wcm9wc19fIiwiZGVmaW5lUHJvcCIsImNsYXNzTmFtZSIsInByb3BOYW1lIiwidmFsIiwiZXM2IiwiZGVmYXVsdFZhbHVlIiwiQXJyYXkiLCJpc0FycmF5IiwiQ0NDbGFzcyIsImdldEluaGVyaXRhbmNlQ2hhaW4iLCJzb21lIiwieCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5Iiwic2V0Q2xhc3NBdHRyIiwicGFyc2VBdHRyaWJ1dGVzIiwiQ0NfRURJVE9SIiwiRWRpdG9yIiwiaXNCdWlsZGVyIiwiQ0NfVEVTVCIsIm9uQWZ0ZXJQcm9wc19FVCIsImRlZmluZUdldFNldCIsImdldHRlciIsImdldCIsInNldHRlciIsInNldCIsInByb3RvIiwiZCIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsInNldHRlclVuZGVmaW5lZCIsImdldERlZmF1bHQiLCJkZWZhdWx0VmFsIiwiZSIsIl90aHJvdyIsInVuZGVmaW5lZCIsIm1peGluV2l0aEluaGVyaXRlZCIsImRlc3QiLCJzcmMiLCJmaWx0ZXIiLCJwcm9wIiwiZGVmaW5lUHJvcGVydHkiLCJnZXRQcm9wZXJ0eURlc2NyaXB0b3IiLCJkb0RlZmluZSIsImJhc2VDbGFzcyIsIm9wdGlvbnMiLCJzaG91bGRBZGRQcm90b0N0b3IiLCJfX2N0b3JfXyIsImN0b3IiLCJfX2VzNl9fIiwiX19FUzZfXyIsImN0b3JUb1VzZSIsIl9pc0NDQ2xhc3MiLCJ0ZXN0Iiwid2FybklEIiwiX3ZhbGlkYXRlQ3Rvcl9ERVYiLCJjdG9ycyIsImZpcmVDbGFzcyIsIl9nZXRBbGxDdG9ycyIsIl9jcmVhdGVDdG9yIiwidmFsdWUiLCJleHRlbmQiLCJtIiwibWl4aW4iLCJnZXRDbGFzc0F0dHJzIiwiY29uc3RydWN0b3IiLCJfX2luaXRQcm9wc19fIiwiY29tcGlsZVByb3BzIiwic2V0Q2xhc3NOYW1lIiwiZGVmaW5lIiwiQ29tcG9uZW50IiwiZnJhbWUiLCJfUkYiLCJwZWVrIiwiaXNDaGlsZENsYXNzT2YiLCJ1dWlkIiwic2NyaXB0IiwiX3NldENsYXNzSWQiLCJfYWRkTWVudUl0ZW0iLCJfX3NjcmlwdFV1aWQiLCJVdGlscyIsIlV1aWRVdGlscyIsImRlY29tcHJlc3NVdWlkIiwibm9ybWFsaXplQ2xhc3NOYW1lX0RFViIsIkRlZmF1bHROYW1lIiwicmVwbGFjZSIsIkZ1bmN0aW9uIiwiZ2V0TmV3VmFsdWVUeXBlQ29kZUppdCIsImNsc05hbWUiLCJ0eXBlIiwicmVzIiwicHJvcFZhbCIsImVzY2FwZUZvckpTIiwicyIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZXRJbml0UHJvcHNKaXQiLCJhdHRycyIsInByb3BMaXN0IiwiRiIsImZ1bmMiLCJhdHRyS2V5Iiwic3RhdGVtZW50IiwiSURFTlRJRklFUl9SRSIsImV4cHJlc3Npb24iLCJkZWYiLCJWYWx1ZVR5cGUiLCJpbmRleCIsImluaXRQcm9wcyIsImdldEluaXRQcm9wcyIsInNpbXBsZUVuZCIsInZhbHVlVHlwZUVuZCIsInNpbXBsZXMiLCJ2YWx1ZVR5cGVzIiwiYWR2YW5jZWRzIiwidG90YWxMZW5ndGgiLCJjbG9uZSIsImVyciIsImFjdHVhbENsYXNzIiwiQ0NfU1VQUE9SVF9KSVQiLCJjYWxsIiwic3VwZXJDYWxsQm91bmRlZCIsImJvdW5kU3VwZXJDYWxscyIsImN0b3JOYW1lIiwiYm9keSIsImN0b3JMZW4iLCJ1c2VUcnlDYXRjaCIsInN0YXJ0c1dpdGgiLCJTTklQUEVUIiwiQ2xhc3MiLCJfc3VwZXIiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9fY3RvcnNfXyIsIm9yaWdpbkN0b3IiLCJTdXBlckNhbGxSZWciLCJyZXQiLCJnZXRDdG9ycyIsImJhc2VPck1peGlucyIsImNvbmNhdCIsImIiLCJiYXNlT3JNaXhpbiIsImJhc2VDdG9ycyIsImMiLCJ4eXoiLCJTdXBlckNhbGxSZWdTdHJpY3QiLCJoYXNTdXBlckNhbGwiLCJmdW5jTmFtZSIsInBkIiwic3VwZXJGdW5jIiwidG1wIiwic2xpY2UiLCJwcmVwcm9jZXNzQXR0cnMiLCJfX3ZhbHVlc19fIiwiYmFzZSIsIl9zZWFsZWQiLCJlcnJvciIsInN0YXRpY3MiLCJzdGF0aWNQcm9wTmFtZSIsInZhbGlkYXRlTWV0aG9kV2l0aFByb3BzIiwiZWRpdG9yIiwiX3JlZ2lzdGVyRWRpdG9yUHJvcHMiLCJfZmFzdERlZmluZSIsInNlcmlhbGl6YWJsZUZpZWxkcyIsImtleXMiLCJrZXkiLCJhdHRyIiwia2xhc3MiLCJjaGFpbiIsImdldFN1cGVyIiwiUHJpbWl0aXZlVHlwZXMiLCJJbnRlZ2VyIiwiRmxvYXQiLCJCb29sZWFuIiwiU3RyaW5nIiwiYXR0cmlidXRlcyIsInVzZWRJbkdldHRlciIsIkVSUl9UeXBlIiwicHJvcE5hbWVQcmVmaXgiLCJpbml0QXR0cnMiLCJwcmltaXRpdmVUeXBlIiwiX3Nob3J0IiwiZ2V0VHlwZUNoZWNrZXJfRVQiLCJTY3JpcHRVdWlkIiwiU2NyaXB0QXNzZXQiLCJpc0VudW0iLCJnZXRMaXN0IiwiZ2V0T2JqVHlwZUNoZWNrZXJfRVQiLCJwYXJzZVNpbXBsZUF0dHIiLCJhdHRyTmFtZSIsImV4cGVjdFR5cGUiLCJlZGl0b3JPbmx5IiwicmVhZG9ubHkiLCJzZXJpYWxpemFibGUiLCJhbmltYXRhYmxlIiwidmlzaWJsZSIsInN0YXJ0c1dpdGhVUyIsImNoYXJDb2RlQXQiLCJyYW5nZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJmYXN0RGVmaW5lIiwiZ2V0TmV3VmFsdWVUeXBlQ29kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkQsSUFBSUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFoQjs7QUFDQSxJQUFJQyxJQUFJLEdBQUdELE9BQU8sQ0FBQyxVQUFELENBQWxCOztBQUNBLElBQUlFLEtBQUssR0FBR0YsT0FBTyxDQUFDLFNBQUQsQ0FBbkI7O0FBQ0EsSUFBSUcsb0JBQW9CLEdBQUdELEtBQUssQ0FBQ0UsbUJBQWpDO0FBQ0EsSUFBSUMsY0FBYyxHQUFHSCxLQUFLLENBQUNJLGFBQTNCOztBQUNBLElBQUlDLElBQUksR0FBR1AsT0FBTyxDQUFDLGFBQUQsQ0FBbEI7O0FBQ0EsSUFBSVEsU0FBUyxHQUFHRCxJQUFJLENBQUNDLFNBQXJCOztBQUNBLElBQUlDLFVBQVUsR0FBR1QsT0FBTyxDQUFDLG9CQUFELENBQXhCOztBQUNBQSxPQUFPLENBQUMsbUJBQUQsQ0FBUDs7QUFFQSxJQUFJVSxlQUFlLEdBQUcsQ0FBQyxNQUFELEVBQVMsU0FBVCxFQUFvQixRQUFwQixFQUE4QixNQUE5QixFQUFzQyxVQUF0QyxFQUFrRCxZQUFsRCxFQUFnRSxTQUFoRSxFQUEyRSxRQUEzRSxFQUFxRixTQUFyRixDQUF0QjtBQUVBLElBQUlDLG1CQUFtQixHQUFHQyxNQUFNLElBQUksQ0FBQyxNQUFELEVBQVMsV0FBVCxFQUFzQixXQUF0QixFQUFtQyxXQUFuQyxFQUFnRCxNQUFoRCxFQUF3RCxPQUF4RCxFQUFpRSxRQUFqRSxFQUNiLFFBRGEsRUFDSCxXQURHLENBQXBD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Q0FBQyxNQUFELEVBQVMsUUFBVCxDQUFmO0FBQ0g7O0FBRURoTSxFQUFFLENBQUNxSSxLQUFILEdBQVd6SCxPQUFYO0FBRUErTCxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYmpNLEVBQUFBLE9BQU8sRUFBRSxpQkFBVXlCLFVBQVYsRUFBc0I7QUFDM0JBLElBQUFBLFVBQVUsR0FBR0QsVUFBVSxDQUFDQyxVQUFELENBQXZCO0FBQ0EsV0FBTzFCLEtBQUssQ0FBQ0MsT0FBTixDQUFjeUIsVUFBZCxDQUFQO0FBQ0gsR0FKWTtBQUtieUssRUFBQUEsVUFBVSxFQUFFak0sT0FBTyxDQUFDMEosV0FMUDtBQU1id0MsRUFBQUEsbUJBQW1CLEVBQUVuRixjQUFjLElBQUloQyxzQkFOMUI7QUFPYmdCLEVBQUFBLGFBQWEsRUFBYkEsYUFQYTtBQVFiWCxFQUFBQSxXQUFXLEVBQVhBLFdBUmE7QUFTYjdELEVBQUFBLFVBQVUsRUFBRUE7QUFUQyxDQUFqQjs7QUFZQSxJQUFJWixPQUFKLEVBQWE7QUFDVDFELEVBQUFBLEVBQUUsQ0FBQ3NHLEtBQUgsQ0FBU3ZELE9BQVQsRUFBa0IrTCxNQUFNLENBQUNDLE9BQXpCO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyLvu78vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBqcyA9IHJlcXVpcmUoJy4vanMnKTtcbnZhciBFbnVtID0gcmVxdWlyZSgnLi9DQ0VudW0nKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBfaXNQbGFpbkVtcHR5T2JqX0RFViA9IHV0aWxzLmlzUGxhaW5FbXB0eU9ial9ERVY7XG52YXIgX2Nsb25lYWJsZV9ERVYgPSB1dGlscy5jbG9uZWFibGVfREVWO1xudmFyIEF0dHIgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZScpO1xudmFyIERFTElNRVRFUiA9IEF0dHIuREVMSU1FVEVSO1xudmFyIHByZXByb2Nlc3MgPSByZXF1aXJlKCcuL3ByZXByb2Nlc3MtY2xhc3MnKTtcbnJlcXVpcmUoJy4vcmVxdWlyaW5nLWZyYW1lJyk7XG5cbnZhciBCVUlMVElOX0VOVFJJRVMgPSBbJ25hbWUnLCAnZXh0ZW5kcycsICdtaXhpbnMnLCAnY3RvcicsICdfX2N0b3JfXycsICdwcm9wZXJ0aWVzJywgJ3N0YXRpY3MnLCAnZWRpdG9yJywgJ19fRVM2X18nXTtcblxudmFyIElOVkFMSURfU1RBVElDU19ERVYgPSBDQ19ERVYgJiYgWyduYW1lJywgJ19fY3RvcnNfXycsICdfX3Byb3BzX18nLCAnYXJndW1lbnRzJywgJ2NhbGwnLCAnYXBwbHknLCAnY2FsbGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgJ2xlbmd0aCcsICdwcm90b3R5cGUnXTtcblxuZnVuY3Rpb24gcHVzaFVuaXF1ZSAoYXJyYXksIGl0ZW0pIHtcbiAgICBpZiAoYXJyYXkuaW5kZXhPZihpdGVtKSA8IDApIHtcbiAgICAgICAgYXJyYXkucHVzaChpdGVtKTtcbiAgICB9XG59XG5cbnZhciBkZWZlcnJlZEluaXRpYWxpemVyID0ge1xuXG4gICAgLy8gQ29uZmlncyBmb3IgY2xhc3NlcyB3aGljaCBuZWVkcyBkZWZlcnJlZCBpbml0aWFsaXphdGlvblxuICAgIGRhdGFzOiBudWxsLFxuXG4gICAgLy8gcmVnaXN0ZXIgbmV3IGNsYXNzXG4gICAgLy8gZGF0YSAtIHtjbHM6IGNscywgY2I6IHByb3BlcnRpZXMsIG1peGluczogb3B0aW9ucy5taXhpbnN9XG4gICAgcHVzaDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YXMpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YXMucHVzaChkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YXMgPSBbZGF0YV07XG4gICAgICAgICAgICAvLyBzdGFydCBhIG5ldyB0aW1lciB0byBpbml0aWFsaXplXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmluaXQoKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRhdGFzID0gdGhpcy5kYXRhcztcbiAgICAgICAgaWYgKGRhdGFzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBkYXRhc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgY2xzID0gZGF0YS5jbHM7XG4gICAgICAgICAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBkYXRhLnByb3BzO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcGVydGllcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGpzLmdldENsYXNzTmFtZShjbHMpO1xuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlY2xhcmVQcm9wZXJ0aWVzKGNscywgbmFtZSwgcHJvcGVydGllcywgY2xzLiRzdXBlciwgZGF0YS5taXhpbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3JJRCgzNjMzLCBuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRhdGFzID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8vIGJvdGggZ2V0dGVyIGFuZCBwcm9wIG11c3QgcmVnaXN0ZXIgdGhlIG5hbWUgaW50byBfX3Byb3BzX18gYXJyYXlcbmZ1bmN0aW9uIGFwcGVuZFByb3AgKGNscywgbmFtZSkge1xuICAgIGlmIChDQ19ERVYpIHtcbiAgICAgICAgLy9pZiAoIUlERU5USUZJRVJfUkUudGVzdChuYW1lKSkge1xuICAgICAgICAvLyAgICBjYy5lcnJvcignVGhlIHByb3BlcnR5IG5hbWUgXCInICsgbmFtZSArICdcIiBpcyBub3QgY29tcGxpYW50IHdpdGggSmF2YVNjcmlwdCBuYW1pbmcgc3RhbmRhcmRzJyk7XG4gICAgICAgIC8vICAgIHJldHVybjtcbiAgICAgICAgLy99XG4gICAgICAgIGlmIChuYW1lLmluZGV4T2YoJy4nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMzYzNCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVzaFVuaXF1ZShjbHMuX19wcm9wc19fLCBuYW1lKTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lUHJvcCAoY2xzLCBjbGFzc05hbWUsIHByb3BOYW1lLCB2YWwsIGVzNikge1xuICAgIHZhciBkZWZhdWx0VmFsdWUgPSB2YWwuZGVmYXVsdDtcblxuICAgIGlmIChDQ19ERVYpIHtcbiAgICAgICAgaWYgKCFlczYpIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGRlZmF1bHQgb2JqZWN0IHZhbHVlXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlZmF1bHRWYWx1ZSA9PT0gJ29iamVjdCcgJiYgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmYXVsdFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBhcnJheSBlbXB0eVxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzYzNSwgY2xhc3NOYW1lLCBwcm9wTmFtZSwgcHJvcE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFfaXNQbGFpbkVtcHR5T2JqX0RFVihkZWZhdWx0VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGNsb25lYWJsZVxuICAgICAgICAgICAgICAgICAgICBpZiAoIV9jbG9uZWFibGVfREVWKGRlZmF1bHRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzYzNiwgY2xhc3NOYW1lLCBwcm9wTmFtZSwgcHJvcE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgYmFzZSBwcm90b3R5cGUgdG8gYXZvaWQgbmFtZSBjb2xsaXNpb25cbiAgICAgICAgaWYgKENDQ2xhc3MuZ2V0SW5oZXJpdGFuY2VDaGFpbihjbHMpXG4gICAgICAgICAgICAgICAgICAgLnNvbWUoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgucHJvdG90eXBlLmhhc093blByb3BlcnR5KHByb3BOYW1lKTsgfSkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMzYzNywgY2xhc3NOYW1lLCBwcm9wTmFtZSwgY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNldCBkZWZhdWx0IHZhbHVlXG4gICAgQXR0ci5zZXRDbGFzc0F0dHIoY2xzLCBwcm9wTmFtZSwgJ2RlZmF1bHQnLCBkZWZhdWx0VmFsdWUpO1xuXG4gICAgYXBwZW5kUHJvcChjbHMsIHByb3BOYW1lKTtcblxuICAgIC8vIGFwcGx5IGF0dHJpYnV0ZXNcbiAgICBwYXJzZUF0dHJpYnV0ZXMoY2xzLCB2YWwsIGNsYXNzTmFtZSwgcHJvcE5hbWUsIGZhbHNlKTtcbiAgICBpZiAoKENDX0VESVRPUiAmJiAhRWRpdG9yLmlzQnVpbGRlcikgfHwgQ0NfVEVTVCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9uQWZ0ZXJQcm9wc19FVC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgb25BZnRlclByb3BzX0VUW2ldKGNscywgcHJvcE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIG9uQWZ0ZXJQcm9wc19FVC5sZW5ndGggPSAwO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVmaW5lR2V0U2V0IChjbHMsIG5hbWUsIHByb3BOYW1lLCB2YWwsIGVzNikge1xuICAgIHZhciBnZXR0ZXIgPSB2YWwuZ2V0O1xuICAgIHZhciBzZXR0ZXIgPSB2YWwuc2V0O1xuICAgIHZhciBwcm90byA9IGNscy5wcm90b3R5cGU7XG4gICAgdmFyIGQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBwcm9wTmFtZSk7XG4gICAgdmFyIHNldHRlclVuZGVmaW5lZCA9ICFkO1xuXG4gICAgaWYgKGdldHRlcikge1xuICAgICAgICBpZiAoQ0NfREVWICYmICFlczYgJiYgZCAmJiBkLmdldCkge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgzNjM4LCBuYW1lLCBwcm9wTmFtZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwYXJzZUF0dHJpYnV0ZXMoY2xzLCB2YWwsIG5hbWUsIHByb3BOYW1lLCB0cnVlKTtcbiAgICAgICAgaWYgKChDQ19FRElUT1IgJiYgIUVkaXRvci5pc0J1aWxkZXIpIHx8IENDX1RFU1QpIHtcbiAgICAgICAgICAgIG9uQWZ0ZXJQcm9wc19FVC5sZW5ndGggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgQXR0ci5zZXRDbGFzc0F0dHIoY2xzLCBwcm9wTmFtZSwgJ3NlcmlhbGl6YWJsZScsIGZhbHNlKTtcblxuICAgICAgICBpZiAoQ0NfREVWKSB7XG4gICAgICAgICAgICAvLyDkuI3orrrmmK/lkKYgdmlzaWJsZSDpg73opoHmt7vliqDliLAgcHJvcHPvvIzlkKbliJkgYXNzZXQgd2F0Y2hlciDkuI3og73mraPluLjlt6XkvZxcbiAgICAgICAgICAgIGFwcGVuZFByb3AoY2xzLCBwcm9wTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWVzNikge1xuICAgICAgICAgICAganMuZ2V0KHByb3RvLCBwcm9wTmFtZSwgZ2V0dGVyLCBzZXR0ZXJVbmRlZmluZWQsIHNldHRlclVuZGVmaW5lZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQ0NfRURJVE9SIHx8IENDX0RFVikge1xuICAgICAgICAgICAgQXR0ci5zZXRDbGFzc0F0dHIoY2xzLCBwcm9wTmFtZSwgJ2hhc0dldHRlcicsIHRydWUpOyAvLyDmlrnkvr8gZWRpdG9yIOWBmuWIpOaWrVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNldHRlcikge1xuICAgICAgICBpZiAoIWVzNikge1xuICAgICAgICAgICAgaWYgKENDX0RFViAmJiBkICYmIGQuc2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNjLmVycm9ySUQoMzY0MCwgbmFtZSwgcHJvcE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAganMuc2V0KHByb3RvLCBwcm9wTmFtZSwgc2V0dGVyLCBzZXR0ZXJVbmRlZmluZWQsIHNldHRlclVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENDX0VESVRPUiB8fCBDQ19ERVYpIHtcbiAgICAgICAgICAgIEF0dHIuc2V0Q2xhc3NBdHRyKGNscywgcHJvcE5hbWUsICdoYXNTZXR0ZXInLCB0cnVlKTsgLy8g5pa55L6/IGVkaXRvciDlgZrliKTmlq1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdCAoZGVmYXVsdFZhbCkge1xuICAgIGlmICh0eXBlb2YgZGVmYXVsdFZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNjLl90aHJvdyhlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWwoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFZhbDtcbn1cblxuZnVuY3Rpb24gbWl4aW5XaXRoSW5oZXJpdGVkIChkZXN0LCBzcmMsIGZpbHRlcikge1xuICAgIGZvciAodmFyIHByb3AgaW4gc3JjKSB7XG4gICAgICAgIGlmICghZGVzdC5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiAoIWZpbHRlciB8fCBmaWx0ZXIocHJvcCkpKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwgcHJvcCwganMuZ2V0UHJvcGVydHlEZXNjcmlwdG9yKHNyYywgcHJvcCkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkb0RlZmluZSAoY2xhc3NOYW1lLCBiYXNlQ2xhc3MsIG1peGlucywgb3B0aW9ucykge1xuICAgIHZhciBzaG91bGRBZGRQcm90b0N0b3I7XG4gICAgdmFyIF9fY3Rvcl9fID0gb3B0aW9ucy5fX2N0b3JfXztcbiAgICB2YXIgY3RvciA9IG9wdGlvbnMuY3RvcjtcbiAgICB2YXIgX19lczZfXyA9IG9wdGlvbnMuX19FUzZfXztcblxuICAgIGlmIChDQ19ERVYpIHtcbiAgICAgICAgLy8gY2hlY2sgY3RvclxuICAgICAgICB2YXIgY3RvclRvVXNlID0gX19jdG9yX18gfHwgY3RvcjtcbiAgICAgICAgaWYgKGN0b3JUb1VzZSkge1xuICAgICAgICAgICAgaWYgKENDQ2xhc3MuX2lzQ0NDbGFzcyhjdG9yVG9Vc2UpKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3JJRCgzNjE4LCBjbGFzc05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGN0b3JUb1VzZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzYxOSwgY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChiYXNlQ2xhc3MgJiYgL1xcYnByb3RvdHlwZS5jdG9yXFxiLy50ZXN0KGN0b3JUb1VzZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9fZXM2X18pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzY1MSwgY2xhc3NOYW1lIHx8IFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2Mud2FybklEKDM2MDAsIGNsYXNzTmFtZSB8fCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZEFkZFByb3RvQ3RvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3Rvcikge1xuICAgICAgICAgICAgICAgIGlmIChfX2N0b3JfXykge1xuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDM2NDksIGNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjdG9yID0gb3B0aW9ucy5jdG9yID0gX3ZhbGlkYXRlQ3Rvcl9ERVYoY3RvciwgYmFzZUNsYXNzLCBjbGFzc05hbWUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjdG9ycztcbiAgICB2YXIgZmlyZUNsYXNzO1xuICAgIGlmIChfX2VzNl9fKSB7XG4gICAgICAgIGN0b3JzID0gW2N0b3JdO1xuICAgICAgICBmaXJlQ2xhc3MgPSBjdG9yO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY3RvcnMgPSBfX2N0b3JfXyA/IFtfX2N0b3JfX10gOiBfZ2V0QWxsQ3RvcnMoYmFzZUNsYXNzLCBtaXhpbnMsIG9wdGlvbnMpO1xuICAgICAgICBmaXJlQ2xhc3MgPSBfY3JlYXRlQ3RvcihjdG9ycywgYmFzZUNsYXNzLCBjbGFzc05hbWUsIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vIGV4dGVuZCAtIENyZWF0ZSBhIG5ldyBDbGFzcyB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBDbGFzc1xuICAgICAgICBqcy52YWx1ZShmaXJlQ2xhc3MsICdleHRlbmQnLCBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgb3B0aW9ucy5leHRlbmRzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBDQ0NsYXNzKG9wdGlvbnMpO1xuICAgICAgICB9LCB0cnVlKTtcbiAgICB9XG5cbiAgICBqcy52YWx1ZShmaXJlQ2xhc3MsICdfX2N0b3JzX18nLCBjdG9ycy5sZW5ndGggPiAwID8gY3RvcnMgOiBudWxsLCB0cnVlKTtcblxuXG4gICAgdmFyIHByb3RvdHlwZSA9IGZpcmVDbGFzcy5wcm90b3R5cGU7XG4gICAgaWYgKGJhc2VDbGFzcykge1xuICAgICAgICBpZiAoIV9fZXM2X18pIHtcbiAgICAgICAgICAgIGpzLmV4dGVuZChmaXJlQ2xhc3MsIGJhc2VDbGFzcyk7ICAgICAgICAvLyDov5nph4zkvJrmiorniLbnsbvnmoQgX19wcm9wc19fIOWkjeWItue7meWtkOexu1xuICAgICAgICAgICAgcHJvdG90eXBlID0gZmlyZUNsYXNzLnByb3RvdHlwZTsgICAgICAgIC8vIGdldCBleHRlbmRlZCBwcm90b3R5cGVcbiAgICAgICAgfVxuICAgICAgICBmaXJlQ2xhc3MuJHN1cGVyID0gYmFzZUNsYXNzO1xuICAgICAgICBpZiAoQ0NfREVWICYmIHNob3VsZEFkZFByb3RvQ3Rvcikge1xuICAgICAgICAgICAgcHJvdG90eXBlLmN0b3IgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtaXhpbnMpIHtcbiAgICAgICAgZm9yICh2YXIgbSA9IG1peGlucy5sZW5ndGggLSAxOyBtID49IDA7IG0tLSkge1xuICAgICAgICAgICAgdmFyIG1peGluID0gbWl4aW5zW21dO1xuICAgICAgICAgICAgbWl4aW5XaXRoSW5oZXJpdGVkKHByb3RvdHlwZSwgbWl4aW4ucHJvdG90eXBlKTtcblxuICAgICAgICAgICAgLy8gbWl4aW4gc3RhdGljcyAodGhpcyB3aWxsIGFsc28gY29weSBlZGl0b3IgYXR0cmlidXRlcyBmb3IgY29tcG9uZW50KVxuICAgICAgICAgICAgbWl4aW5XaXRoSW5oZXJpdGVkKGZpcmVDbGFzcywgbWl4aW4sIGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1peGluLmhhc093blByb3BlcnR5KHByb3ApICYmICghQ0NfREVWIHx8IElOVkFMSURfU1RBVElDU19ERVYuaW5kZXhPZihwcm9wKSA8IDApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIG1peGluIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgIGlmIChDQ0NsYXNzLl9pc0NDQ2xhc3MobWl4aW4pKSB7XG4gICAgICAgICAgICAgICAgbWl4aW5XaXRoSW5oZXJpdGVkKEF0dHIuZ2V0Q2xhc3NBdHRycyhmaXJlQ2xhc3MpLCBBdHRyLmdldENsYXNzQXR0cnMobWl4aW4pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyByZXN0b3JlIGNvbnN0dWN0b3Igb3ZlcnJpZGRlbiBieSBtaXhpblxuICAgICAgICBwcm90b3R5cGUuY29uc3RydWN0b3IgPSBmaXJlQ2xhc3M7XG4gICAgfVxuXG4gICAgaWYgKCFfX2VzNl9fKSB7XG4gICAgICAgIHByb3RvdHlwZS5fX2luaXRQcm9wc19fID0gY29tcGlsZVByb3BzO1xuICAgIH1cblxuICAgIGpzLnNldENsYXNzTmFtZShjbGFzc05hbWUsIGZpcmVDbGFzcyk7XG4gICAgcmV0dXJuIGZpcmVDbGFzcztcbn1cblxuZnVuY3Rpb24gZGVmaW5lIChjbGFzc05hbWUsIGJhc2VDbGFzcywgbWl4aW5zLCBvcHRpb25zKSB7XG4gICAgdmFyIENvbXBvbmVudCA9IGNjLkNvbXBvbmVudDtcbiAgICB2YXIgZnJhbWUgPSBjYy5fUkYucGVlaygpO1xuICAgIGlmIChmcmFtZSAmJiBqcy5pc0NoaWxkQ2xhc3NPZihiYXNlQ2xhc3MsIENvbXBvbmVudCkpIHtcbiAgICAgICAgLy8gcHJvamVjdCBjb21wb25lbnRcbiAgICAgICAgaWYgKGpzLmlzQ2hpbGRDbGFzc09mKGZyYW1lLmNscywgQ29tcG9uZW50KSkge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgzNjE1KTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDQ19ERVYgJiYgZnJhbWUudXVpZCAmJiBjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGNjLndhcm5JRCgzNjE2LCBjbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZSB8fCBmcmFtZS5zY3JpcHQ7XG4gICAgfVxuXG4gICAgdmFyIGNscyA9IGRvRGVmaW5lKGNsYXNzTmFtZSwgYmFzZUNsYXNzLCBtaXhpbnMsIG9wdGlvbnMpO1xuXG4gICAgaWYgKGZyYW1lKSB7XG4gICAgICAgIGlmIChqcy5pc0NoaWxkQ2xhc3NPZihiYXNlQ2xhc3MsIENvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIHZhciB1dWlkID0gZnJhbWUudXVpZDtcbiAgICAgICAgICAgIGlmICh1dWlkKSB7XG4gICAgICAgICAgICAgICAganMuX3NldENsYXNzSWQodXVpZCwgY2xzKTtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgIENvbXBvbmVudC5fYWRkTWVudUl0ZW0oY2xzLCAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnNjcmlwdHMvJyArIGNsYXNzTmFtZSwgLTEpO1xuICAgICAgICAgICAgICAgICAgICBjbHMucHJvdG90eXBlLl9fc2NyaXB0VXVpZCA9IEVkaXRvci5VdGlscy5VdWlkVXRpbHMuZGVjb21wcmVzc1V1aWQodXVpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnJhbWUuY2xzID0gY2xzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFqcy5pc0NoaWxkQ2xhc3NPZihmcmFtZS5jbHMsIENvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIGZyYW1lLmNscyA9IGNscztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2xzO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVDbGFzc05hbWVfREVWIChjbGFzc05hbWUpIHtcbiAgICB2YXIgRGVmYXVsdE5hbWUgPSAnQ0NDbGFzcyc7XG4gICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUucmVwbGFjZSgvXlteJEEtWmEtel9dLywgJ18nKS5yZXBsYWNlKC9bXjAtOUEtWmEtel8kXS9nLCAnXycpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gdmFsaWRhdGUgbmFtZVxuICAgICAgICAgICAgRnVuY3Rpb24oJ2Z1bmN0aW9uICcgKyBjbGFzc05hbWUgKyAnKCl7fScpKCk7XG4gICAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIERlZmF1bHROYW1lO1xufVxuXG5mdW5jdGlvbiBnZXROZXdWYWx1ZVR5cGVDb2RlSml0ICh2YWx1ZSkge1xuICAgIHZhciBjbHNOYW1lID0ganMuZ2V0Q2xhc3NOYW1lKHZhbHVlKTtcbiAgICB2YXIgdHlwZSA9IHZhbHVlLmNvbnN0cnVjdG9yO1xuICAgIHZhciByZXMgPSAnbmV3ICcgKyBjbHNOYW1lICsgJygnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZS5fX3Byb3BzX18ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHByb3AgPSB0eXBlLl9fcHJvcHNfX1tpXTtcbiAgICAgICAgdmFyIHByb3BWYWwgPSB2YWx1ZVtwcm9wXTtcbiAgICAgICAgaWYgKENDX0RFViAmJiB0eXBlb2YgcHJvcFZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMzY0MSwgY2xzTmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gJ25ldyAnICsgY2xzTmFtZSArICcoKSc7XG4gICAgICAgIH1cbiAgICAgICAgcmVzICs9IHByb3BWYWw7XG4gICAgICAgIGlmIChpIDwgdHlwZS5fX3Byb3BzX18ubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmVzICs9ICcsJztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzICsgJyknO1xufVxuXG4vLyBUT0RPIC0gbW92ZSBlc2NhcGVGb3JKUywgSURFTlRJRklFUl9SRSwgZ2V0TmV3VmFsdWVUeXBlQ29kZUppdCB0byBtaXNjLmpzIG9yIGEgbmV3IHNvdXJjZSBmaWxlXG5cbi8vIGNvbnZlcnQgYSBub3JtYWwgc3RyaW5nIGluY2x1ZGluZyBuZXdsaW5lcywgcXVvdGVzIGFuZCB1bmljb2RlIGNoYXJhY3RlcnMgaW50byBhIHN0cmluZyBsaXRlcmFsXG4vLyByZWFkeSB0byB1c2UgaW4gSmF2YVNjcmlwdCBzb3VyY2VcbmZ1bmN0aW9uIGVzY2FwZUZvckpTIChzKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHMpLlxuICAgICAgICAvLyBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvSlNPTi9zdHJpbmdpZnlcbiAgICAgICAgcmVwbGFjZSgvXFx1MjAyOC9nLCAnXFxcXHUyMDI4JykuXG4gICAgICAgIHJlcGxhY2UoL1xcdTIwMjkvZywgJ1xcXFx1MjAyOScpO1xufVxuXG5mdW5jdGlvbiBnZXRJbml0UHJvcHNKaXQgKGF0dHJzLCBwcm9wTGlzdCkge1xuICAgIC8vIGZ1bmN0aW9ucyBmb3IgZ2VuZXJhdGVkIGNvZGVcbiAgICB2YXIgRiA9IFtdO1xuICAgIHZhciBmdW5jID0gJyc7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwcm9wID0gcHJvcExpc3RbaV07XG4gICAgICAgIHZhciBhdHRyS2V5ID0gcHJvcCArIERFTElNRVRFUiArICdkZWZhdWx0JztcbiAgICAgICAgaWYgKGF0dHJLZXkgaW4gYXR0cnMpIHsgIC8vIGdldHRlciBkb2VzIG5vdCBoYXZlIGRlZmF1bHRcbiAgICAgICAgICAgIHZhciBzdGF0ZW1lbnQ7XG4gICAgICAgICAgICBpZiAoSURFTlRJRklFUl9SRS50ZXN0KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gJ3RoaXMuJyArIHByb3AgKyAnPSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSAndGhpc1snICsgZXNjYXBlRm9ySlMocHJvcCkgKyAnXT0nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGV4cHJlc3Npb247XG4gICAgICAgICAgICB2YXIgZGVmID0gYXR0cnNbYXR0cktleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlZiA9PT0gJ29iamVjdCcgJiYgZGVmKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlZiBpbnN0YW5jZW9mIGNjLlZhbHVlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uID0gZ2V0TmV3VmFsdWVUeXBlQ29kZUppdChkZWYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRlZikpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9ICdbXSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uID0gJ3t9JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gRi5sZW5ndGg7XG4gICAgICAgICAgICAgICAgRi5wdXNoKGRlZik7XG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9ICdGWycgKyBpbmRleCArICddKCknO1xuICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuYyArPSAndHJ5IHtcXG4nICsgc3RhdGVtZW50ICsgZXhwcmVzc2lvbiArICc7XFxufVxcbmNhdGNoKGUpIHtcXG5jYy5fdGhyb3coZSk7XFxuJyArIHN0YXRlbWVudCArICd1bmRlZmluZWQ7XFxufVxcbic7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBkZWYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9IGVzY2FwZUZvckpTKGRlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBudW1iZXIsIGJvb2xlYW4sIG51bGwsIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb24gPSBkZWY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0ZW1lbnQgPSBzdGF0ZW1lbnQgKyBleHByZXNzaW9uICsgJztcXG4nO1xuICAgICAgICAgICAgZnVuYyArPSBzdGF0ZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiAoQ0NfVEVTVCAmJiAhaXNQaGFudG9tSlMpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coZnVuYyk7XG4gICAgLy8gfVxuXG4gICAgdmFyIGluaXRQcm9wcztcbiAgICBpZiAoRi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaW5pdFByb3BzID0gRnVuY3Rpb24oZnVuYyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpbml0UHJvcHMgPSBGdW5jdGlvbignRicsICdyZXR1cm4gKGZ1bmN0aW9uKCl7XFxuJyArIGZ1bmMgKyAnfSknKShGKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5pdFByb3BzO1xufVxuXG5mdW5jdGlvbiBnZXRJbml0UHJvcHMgKGF0dHJzLCBwcm9wTGlzdCkge1xuICAgIHZhciBwcm9wcyA9IG51bGw7XG4gICAgdmFyIHNpbXBsZUVuZCA9IDA7XG4gICAgdmFyIHZhbHVlVHlwZUVuZCA9IDA7XG5cbiAgICAoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIC8vIHRyaWFnZSBwcm9wZXJ0aWVzXG5cbiAgICAgICAgdmFyIHNpbXBsZXMgPSBudWxsO1xuICAgICAgICB2YXIgdmFsdWVUeXBlcyA9IG51bGw7XG4gICAgICAgIHZhciBhZHZhbmNlZHMgPSBudWxsO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcExpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBwcm9wID0gcHJvcExpc3RbaV07XG4gICAgICAgICAgICB2YXIgYXR0cktleSA9IHByb3AgKyBERUxJTUVURVIgKyAnZGVmYXVsdCc7XG4gICAgICAgICAgICBpZiAoYXR0cktleSBpbiBhdHRycykgeyAvLyBnZXR0ZXIgZG9lcyBub3QgaGF2ZSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgdmFyIGRlZiA9IGF0dHJzW2F0dHJLZXldO1xuICAgICAgICAgICAgICAgIGlmICgodHlwZW9mIGRlZiA9PT0gJ29iamVjdCcgJiYgZGVmKSB8fCB0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWYgaW5zdGFuY2VvZiBjYy5WYWx1ZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsdWVUeXBlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlVHlwZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlVHlwZXMucHVzaChwcm9wLCBkZWYpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhZHZhbmNlZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlZHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFkdmFuY2Vkcy5wdXNoKHByb3AsIGRlZik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG51bWJlciwgYm9vbGVhbiwgbnVsbCwgdW5kZWZpbmVkLCBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzaW1wbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaW1wbGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2ltcGxlcy5wdXNoKHByb3AsIGRlZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uY2F0IGluIGNvbXBhY3QgbWVtb3J5XG5cbiAgICAgICAgc2ltcGxlRW5kID0gc2ltcGxlcyA/IHNpbXBsZXMubGVuZ3RoIDogMDtcbiAgICAgICAgdmFsdWVUeXBlRW5kID0gc2ltcGxlRW5kICsgKHZhbHVlVHlwZXMgPyB2YWx1ZVR5cGVzLmxlbmd0aCA6IDApO1xuICAgICAgICBsZXQgdG90YWxMZW5ndGggPSB2YWx1ZVR5cGVFbmQgKyAoYWR2YW5jZWRzID8gYWR2YW5jZWRzLmxlbmd0aCA6IDApO1xuICAgICAgICBwcm9wcyA9IG5ldyBBcnJheSh0b3RhbExlbmd0aCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaW1wbGVFbmQ7ICsraSkge1xuICAgICAgICAgICAgcHJvcHNbaV0gPSBzaW1wbGVzW2ldO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSBzaW1wbGVFbmQ7IGkgPCB2YWx1ZVR5cGVFbmQ7ICsraSkge1xuICAgICAgICAgICAgcHJvcHNbaV0gPSB2YWx1ZVR5cGVzW2kgLSBzaW1wbGVFbmRdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSB2YWx1ZVR5cGVFbmQ7IGkgPCB0b3RhbExlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBwcm9wc1tpXSA9IGFkdmFuY2Vkc1tpIC0gdmFsdWVUeXBlRW5kXTtcbiAgICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGZvciAoOyBpIDwgc2ltcGxlRW5kOyBpICs9IDIpIHtcbiAgICAgICAgICAgIHRoaXNbcHJvcHNbaV1dID0gcHJvcHNbaSArIDFdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoOyBpIDwgdmFsdWVUeXBlRW5kOyBpICs9IDIpIHtcbiAgICAgICAgICAgIHRoaXNbcHJvcHNbaV1dID0gcHJvcHNbaSArIDFdLmNsb25lKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICg7IGkgPCBwcm9wcy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgdmFyIGRlZiA9IHByb3BzW2kgKyAxXTtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRlZikpIHtcbiAgICAgICAgICAgICAgICB0aGlzW3Byb3BzW2ldXSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGVmID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVmIGlzIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBkZWYoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5fdGhyb3coZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGRlZigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXNbcHJvcHNbaV1dID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4vLyBzaW1wbGUgdGVzdCB2YXJpYWJsZSBuYW1lXG52YXIgSURFTlRJRklFUl9SRSA9IC9eW0EtWmEtel8kXVswLTlBLVphLXpfJF0qJC87XG5mdW5jdGlvbiBjb21waWxlUHJvcHMgKGFjdHVhbENsYXNzKSB7XG4gICAgLy8gaW5pdCBkZWZlcnJlZCBwcm9wZXJ0aWVzXG4gICAgdmFyIGF0dHJzID0gQXR0ci5nZXRDbGFzc0F0dHJzKGFjdHVhbENsYXNzKTtcbiAgICB2YXIgcHJvcExpc3QgPSBhY3R1YWxDbGFzcy5fX3Byb3BzX187XG4gICAgaWYgKHByb3BMaXN0ID09PSBudWxsKSB7XG4gICAgICAgIGRlZmVycmVkSW5pdGlhbGl6ZXIuaW5pdCgpO1xuICAgICAgICBwcm9wTGlzdCA9IGFjdHVhbENsYXNzLl9fcHJvcHNfXztcbiAgICB9XG5cbiAgICAvLyBPdmVyd2l0ZSBfX2luaXRQcm9wc19fIHRvIGF2b2lkIGNvbXBpbGUgYWdhaW4uXG4gICAgdmFyIGluaXRQcm9wcyA9IENDX1NVUFBPUlRfSklUID8gZ2V0SW5pdFByb3BzSml0KGF0dHJzLCBwcm9wTGlzdCkgOiBnZXRJbml0UHJvcHMoYXR0cnMsIHByb3BMaXN0KTtcbiAgICBhY3R1YWxDbGFzcy5wcm90b3R5cGUuX19pbml0UHJvcHNfXyA9IGluaXRQcm9wcztcblxuICAgIC8vIGNhbGwgaW5zdGFudGlhdGVQcm9wcyBpbW1lZGlhdGVseSwgbm8gbmVlZCB0byBwYXNzIGFjdHVhbENsYXNzIGludG8gaXQgYW55bW9yZVxuICAgIC8vICh1c2UgY2FsbCB0byBtYW51YWxseSBiaW5kIGB0aGlzYCBiZWNhdXNlIGB0aGlzYCBtYXkgbm90IGluc3RhbmNlb2YgYWN0dWFsQ2xhc3MpXG4gICAgaW5pdFByb3BzLmNhbGwodGhpcyk7XG59XG5cbnZhciBfY3JlYXRlQ3RvciA9IENDX1NVUFBPUlRfSklUID8gZnVuY3Rpb24gKGN0b3JzLCBiYXNlQ2xhc3MsIGNsYXNzTmFtZSwgb3B0aW9ucykge1xuICAgIHZhciBzdXBlckNhbGxCb3VuZGVkID0gYmFzZUNsYXNzICYmIGJvdW5kU3VwZXJDYWxscyhiYXNlQ2xhc3MsIG9wdGlvbnMsIGNsYXNzTmFtZSk7XG5cbiAgICB2YXIgY3Rvck5hbWUgPSBDQ19ERVYgPyBub3JtYWxpemVDbGFzc05hbWVfREVWKGNsYXNzTmFtZSkgOiAnQ0NDbGFzcyc7XG4gICAgdmFyIGJvZHkgPSAncmV0dXJuIGZ1bmN0aW9uICcgKyBjdG9yTmFtZSArICcoKXtcXG4nO1xuXG4gICAgaWYgKHN1cGVyQ2FsbEJvdW5kZWQpIHtcbiAgICAgICAgYm9keSArPSAndGhpcy5fc3VwZXI9bnVsbDtcXG4nO1xuICAgIH1cblxuICAgIC8vIGluc3RhbnRpYXRlIHByb3BzXG4gICAgYm9keSArPSAndGhpcy5fX2luaXRQcm9wc19fKCcgKyBjdG9yTmFtZSArICcpO1xcbic7XG5cbiAgICAvLyBjYWxsIHVzZXIgY29uc3RydWN0b3JzXG4gICAgdmFyIGN0b3JMZW4gPSBjdG9ycy5sZW5ndGg7XG4gICAgaWYgKGN0b3JMZW4gPiAwKSB7XG4gICAgICAgIHZhciB1c2VUcnlDYXRjaCA9IENDX0RFViAmJiAhIChjbGFzc05hbWUgJiYgY2xhc3NOYW1lLnN0YXJ0c1dpdGgoJ2NjLicpKTtcbiAgICAgICAgaWYgKHVzZVRyeUNhdGNoKSB7XG4gICAgICAgICAgICBib2R5ICs9ICd0cnl7XFxuJztcbiAgICAgICAgfVxuICAgICAgICB2YXIgU05JUFBFVCA9ICddLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtcXG4nO1xuICAgICAgICBpZiAoY3RvckxlbiA9PT0gMSkge1xuICAgICAgICAgICAgYm9keSArPSBjdG9yTmFtZSArICcuX19jdG9yc19fWzAnICsgU05JUFBFVDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGJvZHkgKz0gJ3ZhciBjcz0nICsgY3Rvck5hbWUgKyAnLl9fY3RvcnNfXztcXG4nO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdG9yTGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBib2R5ICs9ICdjc1snICsgaSArIFNOSVBQRVQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVzZVRyeUNhdGNoKSB7XG4gICAgICAgICAgICBib2R5ICs9ICd9Y2F0Y2goZSl7XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnY2MuX3Rocm93KGUpO1xcbicgK1xuICAgICAgICAgICAgICAgICAgICAnfVxcbic7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYm9keSArPSAnfSc7XG5cbiAgICByZXR1cm4gRnVuY3Rpb24oYm9keSkoKTtcbn0gOiBmdW5jdGlvbiAoY3RvcnMsIGJhc2VDbGFzcywgY2xhc3NOYW1lLCBvcHRpb25zKSB7XG4gICAgdmFyIHN1cGVyQ2FsbEJvdW5kZWQgPSBiYXNlQ2xhc3MgJiYgYm91bmRTdXBlckNhbGxzKGJhc2VDbGFzcywgb3B0aW9ucywgY2xhc3NOYW1lKTtcbiAgICB2YXIgY3RvckxlbiA9IGN0b3JzLmxlbmd0aDtcblxuICAgIHZhciBDbGFzcztcblxuICAgIGlmIChjdG9yTGVuID4gMCkge1xuICAgICAgICBpZiAoc3VwZXJDYWxsQm91bmRlZCkge1xuICAgICAgICAgICAgaWYgKGN0b3JMZW4gPT09IDIpIHtcbiAgICAgICAgICAgICAgICAvLyBVc2VyIENvbXBvbmVudFxuICAgICAgICAgICAgICAgIENsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdXBlciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbml0UHJvcHNfXyhDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIGN0b3JzWzBdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIGN0b3JzWzFdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIENsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdXBlciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbml0UHJvcHNfXyhDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3RvcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0b3JzW2ldLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGN0b3JMZW4gPT09IDMpIHtcbiAgICAgICAgICAgICAgICAvLyBOb2RlXG4gICAgICAgICAgICAgICAgQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbml0UHJvcHNfXyhDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIGN0b3JzWzBdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIGN0b3JzWzFdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIGN0b3JzWzJdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIENsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW5pdFByb3BzX18oQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3RvcnMgPSBDbGFzcy5fX2N0b3JzX187XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3RvcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0b3JzW2ldLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzdXBlckNhbGxCb3VuZGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fX2luaXRQcm9wc19fKENsYXNzKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIENsYXNzO1xufTtcblxuZnVuY3Rpb24gX3ZhbGlkYXRlQ3Rvcl9ERVYgKGN0b3IsIGJhc2VDbGFzcywgY2xhc3NOYW1lLCBvcHRpb25zKSB7XG4gICAgaWYgKENDX0VESVRPUiAmJiBiYXNlQ2xhc3MpIHtcbiAgICAgICAgLy8gY2hlY2sgc3VwZXIgY2FsbCBpbiBjb25zdHJ1Y3RvclxuICAgICAgICB2YXIgb3JpZ2luQ3RvciA9IGN0b3I7XG4gICAgICAgIGlmIChTdXBlckNhbGxSZWcudGVzdChjdG9yKSkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuX19FUzZfXykge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzY1MSwgY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLndhcm5JRCgzNjAwLCBjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgIC8vIHN1cHByZXNzcyBzdXBlciBjYWxsXG4gICAgICAgICAgICAgICAgY3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldCA9IG9yaWdpbkN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjaGVjayBjdG9yXG4gICAgaWYgKGN0b3IubGVuZ3RoID4gMCAmJiAoIWNsYXNzTmFtZSB8fCAhY2xhc3NOYW1lLnN0YXJ0c1dpdGgoJ2NjLicpKSkge1xuICAgICAgICAvLyBUbyBtYWtlIGEgdW5pZmllZCBDQ0NsYXNzIHNlcmlhbGl6YXRpb24gcHJvY2VzcyxcbiAgICAgICAgLy8gd2UgZG9uJ3QgYWxsb3cgcGFyYW1ldGVycyBmb3IgY29uc3RydWN0b3Igd2hlbiBjcmVhdGluZyBpbnN0YW5jZXMgb2YgQ0NDbGFzcy5cbiAgICAgICAgLy8gRm9yIGFkdmFuY2VkIHVzZXIsIGNvbnN0cnVjdCBhcmd1bWVudHMgY2FuIHN0aWxsIGdldCBmcm9tICdhcmd1bWVudHMnLlxuICAgICAgICBjYy53YXJuSUQoMzYxNywgY2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3Rvcjtcbn1cblxuZnVuY3Rpb24gX2dldEFsbEN0b3JzIChiYXNlQ2xhc3MsIG1peGlucywgb3B0aW9ucykge1xuICAgIC8vIGdldCBiYXNlIHVzZXIgY29uc3RydWN0b3JzXG4gICAgZnVuY3Rpb24gZ2V0Q3RvcnMgKGNscykge1xuICAgICAgICBpZiAoQ0NDbGFzcy5faXNDQ0NsYXNzKGNscykpIHtcbiAgICAgICAgICAgIHJldHVybiBjbHMuX19jdG9yc19fIHx8IFtdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtjbHNdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGN0b3JzID0gW107XG4gICAgLy8gaWYgKG9wdGlvbnMuX19FUzZfXykge1xuICAgIC8vICAgICBpZiAobWl4aW5zKSB7XG4gICAgLy8gICAgICAgICBsZXQgYmFzZU9yTWl4aW5zID0gZ2V0Q3RvcnMoYmFzZUNsYXNzKTtcbiAgICAvLyAgICAgICAgIGZvciAobGV0IGIgPSAwOyBiIDwgbWl4aW5zLmxlbmd0aDsgYisrKSB7XG4gICAgLy8gICAgICAgICAgICAgbGV0IG1peGluID0gbWl4aW5zW2JdO1xuICAgIC8vICAgICAgICAgICAgIGlmIChtaXhpbikge1xuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgYmFzZUN0b3JzID0gZ2V0Q3RvcnMobWl4aW4pO1xuICAgIC8vICAgICAgICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGJhc2VDdG9ycy5sZW5ndGg7IGMrKykge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VPck1peGlucy5pbmRleE9mKGJhc2VDdG9yc1tjXSkgPCAwKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFVuaXF1ZShjdG9ycywgYmFzZUN0b3JzW2NdKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICAvLyBlbHNlIHtcbiAgICBsZXQgYmFzZU9yTWl4aW5zID0gW2Jhc2VDbGFzc10uY29uY2F0KG1peGlucyk7XG4gICAgZm9yIChsZXQgYiA9IDA7IGIgPCBiYXNlT3JNaXhpbnMubGVuZ3RoOyBiKyspIHtcbiAgICAgICAgbGV0IGJhc2VPck1peGluID0gYmFzZU9yTWl4aW5zW2JdO1xuICAgICAgICBpZiAoYmFzZU9yTWl4aW4pIHtcbiAgICAgICAgICAgIGxldCBiYXNlQ3RvcnMgPSBnZXRDdG9ycyhiYXNlT3JNaXhpbik7XG4gICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGJhc2VDdG9ycy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgICAgIHB1c2hVbmlxdWUoY3RvcnMsIGJhc2VDdG9yc1tjXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gfVxuXG4gICAgLy8gYXBwZW5kIHN1YmNsYXNzIHVzZXIgY29uc3RydWN0b3JzXG4gICAgdmFyIGN0b3IgPSBvcHRpb25zLmN0b3I7XG4gICAgaWYgKGN0b3IpIHtcbiAgICAgICAgY3RvcnMucHVzaChjdG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3RvcnM7XG59XG5cbnZhciBTdXBlckNhbGxSZWcgPSAveHl6Ly50ZXN0KGZ1bmN0aW9uKCl7eHl6fSkgPyAvXFxiXFwuX3N1cGVyXFxiLyA6IC8uKi87XG52YXIgU3VwZXJDYWxsUmVnU3RyaWN0ID0gL3h5ei8udGVzdChmdW5jdGlvbigpe3h5en0pID8gL3RoaXNcXC5fc3VwZXJcXHMqXFwoLyA6IC8oTk9ORSl7OTl9LztcbmZ1bmN0aW9uIGJvdW5kU3VwZXJDYWxscyAoYmFzZUNsYXNzLCBvcHRpb25zLCBjbGFzc05hbWUpIHtcbiAgICB2YXIgaGFzU3VwZXJDYWxsID0gZmFsc2U7XG4gICAgZm9yICh2YXIgZnVuY05hbWUgaW4gb3B0aW9ucykge1xuICAgICAgICBpZiAoQlVJTFRJTl9FTlRSSUVTLmluZGV4T2YoZnVuY05hbWUpID49IDApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmdW5jID0gb3B0aW9uc1tmdW5jTmFtZV07XG4gICAgICAgIGlmICh0eXBlb2YgZnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBkID0ganMuZ2V0UHJvcGVydHlEZXNjcmlwdG9yKGJhc2VDbGFzcy5wcm90b3R5cGUsIGZ1bmNOYW1lKTtcbiAgICAgICAgaWYgKHBkKSB7XG4gICAgICAgICAgICB2YXIgc3VwZXJGdW5jID0gcGQudmFsdWU7XG4gICAgICAgICAgICAvLyBpZ25vcmUgcGQuZ2V0LCBhc3N1bWUgdGhhdCBmdW5jdGlvbiBkZWZpbmVkIGJ5IGdldHRlciBpcyBqdXN0IGZvciB3YXJuaW5nc1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdXBlckZ1bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpZiAoU3VwZXJDYWxsUmVnLnRlc3QoZnVuYykpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzU3VwZXJDYWxsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gYm91bmRTdXBlckNhbGxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1tmdW5jTmFtZV0gPSAoZnVuY3Rpb24gKHN1cGVyRnVuYywgZnVuYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gdGhpcy5fc3VwZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgYSBuZXcgLl9zdXBlcigpIG1ldGhvZCB0aGF0IGlzIHRoZSBzYW1lIG1ldGhvZCBidXQgb24gdGhlIHN1cGVyLUNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSBzdXBlckZ1bmM7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0ID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIG1ldGhvZCBvbmx5IG5lZWQgdG8gYmUgYm91bmQgdGVtcG9yYXJpbHksIHNvIHdlIHJlbW92ZSBpdCB3aGVuIHdlJ3JlIGRvbmUgZXhlY3V0aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3VwZXIgPSB0bXA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSkoc3VwZXJGdW5jLCBmdW5jKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENDX0RFViAmJiBTdXBlckNhbGxSZWdTdHJpY3QudGVzdChmdW5jKSkge1xuICAgICAgICAgICAgY2Mud2FybklEKDM2MjAsIGNsYXNzTmFtZSwgZnVuY05hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoYXNTdXBlckNhbGw7XG59XG5cbmZ1bmN0aW9uIGRlY2xhcmVQcm9wZXJ0aWVzIChjbHMsIGNsYXNzTmFtZSwgcHJvcGVydGllcywgYmFzZUNsYXNzLCBtaXhpbnMsIGVzNikge1xuICAgIGNscy5fX3Byb3BzX18gPSBbXTtcblxuICAgIGlmIChiYXNlQ2xhc3MgJiYgYmFzZUNsYXNzLl9fcHJvcHNfXykge1xuICAgICAgICBjbHMuX19wcm9wc19fID0gYmFzZUNsYXNzLl9fcHJvcHNfXy5zbGljZSgpO1xuICAgIH1cblxuICAgIGlmIChtaXhpbnMpIHtcbiAgICAgICAgZm9yICh2YXIgbSA9IDA7IG0gPCBtaXhpbnMubGVuZ3RoOyArK20pIHtcbiAgICAgICAgICAgIHZhciBtaXhpbiA9IG1peGluc1ttXTtcbiAgICAgICAgICAgIGlmIChtaXhpbi5fX3Byb3BzX18pIHtcbiAgICAgICAgICAgICAgICBjbHMuX19wcm9wc19fID0gY2xzLl9fcHJvcHNfXy5jb25jYXQobWl4aW4uX19wcm9wc19fLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xzLl9fcHJvcHNfXy5pbmRleE9mKHgpIDwgMDtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJvcGVydGllcykge1xuICAgICAgICAvLyDpooTlpITnkIblsZ7mgKdcbiAgICAgICAgcHJlcHJvY2Vzcy5wcmVwcm9jZXNzQXR0cnMocHJvcGVydGllcywgY2xhc3NOYW1lLCBjbHMsIGVzNik7XG5cbiAgICAgICAgZm9yICh2YXIgcHJvcE5hbWUgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgICAgdmFyIHZhbCA9IHByb3BlcnRpZXNbcHJvcE5hbWVdO1xuICAgICAgICAgICAgaWYgKCdkZWZhdWx0JyBpbiB2YWwpIHtcbiAgICAgICAgICAgICAgICBkZWZpbmVQcm9wKGNscywgY2xhc3NOYW1lLCBwcm9wTmFtZSwgdmFsLCBlczYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVmaW5lR2V0U2V0KGNscywgY2xhc3NOYW1lLCBwcm9wTmFtZSwgdmFsLCBlczYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGF0dHJzID0gQXR0ci5nZXRDbGFzc0F0dHJzKGNscyk7XG4gICAgY2xzLl9fdmFsdWVzX18gPSBjbHMuX19wcm9wc19fLmZpbHRlcihmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICByZXR1cm4gYXR0cnNbcHJvcCArIERFTElNRVRFUiArICdzZXJpYWxpemFibGUnXSAhPT0gZmFsc2U7XG4gICAgfSk7XG59XG5cbi8qKlxuICogQG1vZHVsZSBjY1xuICovXG5cbi8qKlxuICogISNlbiBEZWZpbmVzIGEgQ0NDbGFzcyB1c2luZyB0aGUgZ2l2ZW4gc3BlY2lmaWNhdGlvbiwgcGxlYXNlIHNlZSBbQ2xhc3NdKC9kb2NzL2VkaXRvcnNfYW5kX3Rvb2xzL2NyZWF0b3ItY2hhcHRlcnMvc2NyaXB0aW5nL2NsYXNzLmh0bWwpIGZvciBkZXRhaWxzLlxuICogISN6aCDlrprkuYnkuIDkuKogQ0NDbGFzc++8jOS8oOWFpeWPguaVsOW/hemhu+aYr+S4gOS4quWMheWQq+exu+Wei+WPguaVsOeahOWtl+mdoumHj+Wvueixoe+8jOWFt+S9k+eUqOazleivt+afpemYhVvnsbvlnovlrprkuYldKC9kb2NzL2NyZWF0b3Ivc2NyaXB0aW5nL2NsYXNzLmh0bWwp44CCXG4gKlxuICogQG1ldGhvZCBDbGFzc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5uYW1lXSAtIFRoZSBjbGFzcyBuYW1lIHVzZWQgZm9yIHNlcmlhbGl6YXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5leHRlbmRzXSAtIFRoZSBiYXNlIGNsYXNzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuY3Rvcl0gLSBUaGUgY29uc3RydWN0b3IuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5fX2N0b3JfX10gLSBUaGUgc2FtZSBhcyBjdG9yLCBidXQgbGVzcyBlbmNhcHN1bGF0ZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMucHJvcGVydGllc10gLSBUaGUgcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuc3RhdGljc10gLSBUaGUgc3RhdGljIG1lbWJlcnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9uW119IFtvcHRpb25zLm1peGluc11cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuZWRpdG9yXSAtIGF0dHJpYnV0ZXMgZm9yIENvbXBvbmVudCBsaXN0ZWQgYmVsb3cuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmVkaXRvci5leGVjdXRlSW5FZGl0TW9kZT1mYWxzZV0gLSBBbGxvd3MgdGhlIGN1cnJlbnQgY29tcG9uZW50IHRvIHJ1biBpbiBlZGl0IG1vZGUuIEJ5IGRlZmF1bHQsIGFsbCBjb21wb25lbnRzIGFyZSBleGVjdXRlZCBvbmx5IGF0IHJ1bnRpbWUsIG1lYW5pbmcgdGhhdCB0aGV5IHdpbGwgbm90IGhhdmUgdGhlaXIgY2FsbGJhY2sgZnVuY3Rpb25zIGV4ZWN1dGVkIHdoaWxlIHRoZSBFZGl0b3IgaXMgaW4gZWRpdCBtb2RlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuZWRpdG9yLnJlcXVpcmVDb21wb25lbnRdIC0gQXV0b21hdGljYWxseSBhZGQgcmVxdWlyZWQgY29tcG9uZW50IGFzIGEgZGVwZW5kZW5jeS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5lZGl0b3IubWVudV0gLSBUaGUgbWVudSBwYXRoIHRvIHJlZ2lzdGVyIGEgY29tcG9uZW50IHRvIHRoZSBlZGl0b3JzIFwiQ29tcG9uZW50XCIgbWVudS4gRWcuIFwiUmVuZGVyaW5nL0NhbWVyYVwiLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmVkaXRvci5leGVjdXRpb25PcmRlcj0wXSAtIFRoZSBleGVjdXRpb24gb3JkZXIgb2YgbGlmZWN5Y2xlIG1ldGhvZHMgZm9yIENvbXBvbmVudC4gVGhvc2UgbGVzcyB0aGFuIDAgd2lsbCBleGVjdXRlIGJlZm9yZSB3aGlsZSB0aG9zZSBncmVhdGVyIHRoYW4gMCB3aWxsIGV4ZWN1dGUgYWZ0ZXIuIFRoZSBvcmRlciB3aWxsIG9ubHkgYWZmZWN0IG9uTG9hZCwgb25FbmFibGUsIHN0YXJ0LCB1cGRhdGUgYW5kIGxhdGVVcGRhdGUgd2hpbGUgb25EaXNhYmxlIGFuZCBvbkRlc3Ryb3kgd2lsbCBub3QgYmUgYWZmZWN0ZWQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmVkaXRvci5kaXNhbGxvd011bHRpcGxlXSAtIElmIHNwZWNpZmllZCB0byBhIHR5cGUsIHByZXZlbnRzIENvbXBvbmVudCBvZiB0aGUgc2FtZSB0eXBlIChvciBzdWJ0eXBlKSB0byBiZSBhZGRlZCBtb3JlIHRoYW4gb25jZSB0byBhIE5vZGUuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmVkaXRvci5wbGF5T25Gb2N1cz1mYWxzZV0gLSBUaGlzIHByb3BlcnR5IGlzIG9ubHkgYXZhaWxhYmxlIHdoZW4gZXhlY3V0ZUluRWRpdE1vZGUgaXMgc2V0LiBJZiBzcGVjaWZpZWQsIHRoZSBlZGl0b3IncyBzY2VuZSB2aWV3IHdpbGwga2VlcCB1cGRhdGluZyB0aGlzIG5vZGUgaW4gNjAgZnBzIHdoZW4gaXQgaXMgc2VsZWN0ZWQsIG90aGVyd2lzZSwgaXQgd2lsbCB1cGRhdGUgb25seSBpZiBuZWNlc3NhcnkuXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuZWRpdG9yLmluc3BlY3Rvcl0gLSBDdXN0b21pemUgdGhlIHBhZ2UgdXJsIHVzZWQgYnkgdGhlIGN1cnJlbnQgY29tcG9uZW50IHRvIHJlbmRlciBpbiB0aGUgUHJvcGVydGllcy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5lZGl0b3IuaWNvbl0gLSBDdXN0b21pemUgdGhlIGljb24gdGhhdCB0aGUgY3VycmVudCBjb21wb25lbnQgZGlzcGxheXMgaW4gdGhlIGVkaXRvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5lZGl0b3IuaGVscF0gLSBUaGUgY3VzdG9tIGRvY3VtZW50YXRpb24gVVJMXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMudXBkYXRlXSAtIGxpZmVjeWNsZSBtZXRob2QgZm9yIENvbXBvbmVudCwgc2VlIHt7I2Nyb3NzTGluayBcIkNvbXBvbmVudC91cGRhdGU6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5sYXRlVXBkYXRlXSAtIGxpZmVjeWNsZSBtZXRob2QgZm9yIENvbXBvbmVudCwgc2VlIHt7I2Nyb3NzTGluayBcIkNvbXBvbmVudC9sYXRlVXBkYXRlOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25Mb2FkXSAtIGxpZmVjeWNsZSBtZXRob2QgZm9yIENvbXBvbmVudCwgc2VlIHt7I2Nyb3NzTGluayBcIkNvbXBvbmVudC9vbkxvYWQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5zdGFydF0gLSBsaWZlY3ljbGUgbWV0aG9kIGZvciBDb21wb25lbnQsIHNlZSB7eyNjcm9zc0xpbmsgXCJDb21wb25lbnQvc3RhcnQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkVuYWJsZV0gLSBsaWZlY3ljbGUgbWV0aG9kIGZvciBDb21wb25lbnQsIHNlZSB7eyNjcm9zc0xpbmsgXCJDb21wb25lbnQvb25FbmFibGU6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkRpc2FibGVdIC0gbGlmZWN5Y2xlIG1ldGhvZCBmb3IgQ29tcG9uZW50LCBzZWUge3sjY3Jvc3NMaW5rIFwiQ29tcG9uZW50L29uRGlzYWJsZTptZXRob2RcIn19e3svY3Jvc3NMaW5rfX1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uRGVzdHJveV0gLSBsaWZlY3ljbGUgbWV0aG9kIGZvciBDb21wb25lbnQsIHNlZSB7eyNjcm9zc0xpbmsgXCJDb21wb25lbnQvb25EZXN0cm95Om1ldGhvZFwifX17ey9jcm9zc0xpbmt9fVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25Gb2N1c0luRWRpdG9yXSAtIGxpZmVjeWNsZSBtZXRob2QgZm9yIENvbXBvbmVudCwgc2VlIHt7I2Nyb3NzTGluayBcIkNvbXBvbmVudC9vbkZvY3VzSW5FZGl0b3I6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkxvc3RGb2N1c0luRWRpdG9yXSAtIGxpZmVjeWNsZSBtZXRob2QgZm9yIENvbXBvbmVudCwgc2VlIHt7I2Nyb3NzTGluayBcIkNvbXBvbmVudC9vbkxvc3RGb2N1c0luRWRpdG9yOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMucmVzZXRJbkVkaXRvcl0gLSBsaWZlY3ljbGUgbWV0aG9kIGZvciBDb21wb25lbnQsIHNlZSB7eyNjcm9zc0xpbmsgXCJDb21wb25lbnQvcmVzZXRJbkVkaXRvcjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uUmVzdG9yZV0gLSBmb3IgQ29tcG9uZW50IG9ubHksIHNlZSB7eyNjcm9zc0xpbmsgXCJDb21wb25lbnQvb25SZXN0b3JlOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuX2dldExvY2FsQm91bmRzXSAtIGZvciBDb21wb25lbnQgb25seSwgc2VlIHt7I2Nyb3NzTGluayBcIkNvbXBvbmVudC9fZ2V0TG9jYWxCb3VuZHM6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XG4gKlxuICogQHJldHVybiB7RnVuY3Rpb259IC0gdGhlIGNyZWF0ZWQgY2xhc3NcbiAqXG4gKiBAZXhhbXBsZVxuXG4gLy8gZGVmaW5lIGJhc2UgY2xhc3NcbiB2YXIgTm9kZSA9IGNjLkNsYXNzKCk7XG5cbiAvLyBkZWZpbmUgc3ViIGNsYXNzXG4gdmFyIFNwcml0ZSA9IGNjLkNsYXNzKHtcbiAgICAgbmFtZTogJ1Nwcml0ZScsXG4gICAgIGV4dGVuZHM6IE5vZGUsXG5cbiAgICAgY3RvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgdGhpcy51cmwgPSBcIlwiO1xuICAgICAgICAgdGhpcy5pZCA9IDA7XG4gICAgIH0sXG5cbiAgICAgc3RhdGljczoge1xuICAgICAgICAgLy8gZGVmaW5lIHN0YXRpYyBtZW1iZXJzXG4gICAgICAgICBjb3VudDogMCxcbiAgICAgICAgIGdldEJvdW5kczogZnVuY3Rpb24gKHNwcml0ZUxpc3QpIHtcbiAgICAgICAgICAgICAvLyBjb21wdXRlIGJvdW5kcy4uLlxuICAgICAgICAgfVxuICAgICB9LFxuXG4gICAgIHByb3BlcnRpZXMge1xuICAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgICBkZWZhdWx0OiAxMjgsXG4gICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcbiAgICAgICAgICAgICB0b29sdGlwOiAnVGhlIHdpZHRoIG9mIHNwcml0ZSdcbiAgICAgICAgIH0sXG4gICAgICAgICBoZWlnaHQ6IDEyOCxcbiAgICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICB9XG4gICAgIH0sXG5cbiAgICAgbG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgLy8gbG9hZCB0aGlzLnVybC4uLlxuICAgICB9O1xuIH0pO1xuXG4gLy8gaW5zdGFudGlhdGVcblxuIHZhciBvYmogPSBuZXcgU3ByaXRlKCk7XG4gb2JqLnVybCA9ICdzcHJpdGUucG5nJztcbiBvYmoubG9hZCgpO1xuICovXG5mdW5jdGlvbiBDQ0NsYXNzIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YXIgbmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICB2YXIgYmFzZSA9IG9wdGlvbnMuZXh0ZW5kcy8qIHx8IENDT2JqZWN0Ki87XG4gICAgdmFyIG1peGlucyA9IG9wdGlvbnMubWl4aW5zO1xuXG4gICAgLy8gY3JlYXRlIGNvbnN0cnVjdG9yXG4gICAgdmFyIGNscyA9IGRlZmluZShuYW1lLCBiYXNlLCBtaXhpbnMsIG9wdGlvbnMpO1xuICAgIGlmICghbmFtZSkge1xuICAgICAgICBuYW1lID0gY2MuanMuZ2V0Q2xhc3NOYW1lKGNscyk7XG4gICAgfVxuXG4gICAgY2xzLl9zZWFsZWQgPSB0cnVlO1xuICAgIGlmIChiYXNlKSB7XG4gICAgICAgIGJhc2UuX3NlYWxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGRlZmluZSBQcm9wZXJ0aWVzXG4gICAgdmFyIHByb3BlcnRpZXMgPSBvcHRpb25zLnByb3BlcnRpZXM7XG4gICAgaWYgKHR5cGVvZiBwcm9wZXJ0aWVzID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICAgIChiYXNlICYmIGJhc2UuX19wcm9wc19fID09PSBudWxsKSB8fFxuICAgICAgICAobWl4aW5zICYmIG1peGlucy5zb21lKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICByZXR1cm4geC5fX3Byb3BzX18gPT09IG51bGw7XG4gICAgICAgIH0pKVxuICAgICkge1xuICAgICAgICBpZiAoQ0NfREVWICYmIG9wdGlvbnMuX19FUzZfXykge1xuICAgICAgICAgICAgY2MuZXJyb3IoJ25vdCB5ZXQgaW1wbGVtZW50IGRlZmVycmVkIHByb3BlcnRpZXMgZm9yIEVTNiBDbGFzc2VzJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWZlcnJlZEluaXRpYWxpemVyLnB1c2goe2NsczogY2xzLCBwcm9wczogcHJvcGVydGllcywgbWl4aW5zOiBtaXhpbnN9KTtcbiAgICAgICAgICAgIGNscy5fX3Byb3BzX18gPSBjbHMuX192YWx1ZXNfXyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRlY2xhcmVQcm9wZXJ0aWVzKGNscywgbmFtZSwgcHJvcGVydGllcywgYmFzZSwgb3B0aW9ucy5taXhpbnMsIG9wdGlvbnMuX19FUzZfXyk7XG4gICAgfVxuXG4gICAgLy8gZGVmaW5lIHN0YXRpY3NcbiAgICB2YXIgc3RhdGljcyA9IG9wdGlvbnMuc3RhdGljcztcbiAgICBpZiAoc3RhdGljcykge1xuICAgICAgICB2YXIgc3RhdGljUHJvcE5hbWU7XG4gICAgICAgIGlmIChDQ19ERVYpIHtcbiAgICAgICAgICAgIGZvciAoc3RhdGljUHJvcE5hbWUgaW4gc3RhdGljcykge1xuICAgICAgICAgICAgICAgIGlmIChJTlZBTElEX1NUQVRJQ1NfREVWLmluZGV4T2Yoc3RhdGljUHJvcE5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDM2NDIsIG5hbWUsIHN0YXRpY1Byb3BOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljUHJvcE5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHN0YXRpY1Byb3BOYW1lIGluIHN0YXRpY3MpIHtcbiAgICAgICAgICAgIGNsc1tzdGF0aWNQcm9wTmFtZV0gPSBzdGF0aWNzW3N0YXRpY1Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlZmluZSBmdW5jdGlvbnNcbiAgICBmb3IgKHZhciBmdW5jTmFtZSBpbiBvcHRpb25zKSB7XG4gICAgICAgIGlmIChCVUlMVElOX0VOVFJJRVMuaW5kZXhPZihmdW5jTmFtZSkgPj0gMCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZ1bmMgPSBvcHRpb25zW2Z1bmNOYW1lXTtcbiAgICAgICAgaWYgKCFwcmVwcm9jZXNzLnZhbGlkYXRlTWV0aG9kV2l0aFByb3BzKGZ1bmMsIGZ1bmNOYW1lLCBuYW1lLCBjbHMsIGJhc2UpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1c2UgdmFsdWUgdG8gcmVkZWZpbmUgc29tZSBzdXBlciBtZXRob2QgZGVmaW5lZCBhcyBnZXR0ZXJcbiAgICAgICAganMudmFsdWUoY2xzLnByb3RvdHlwZSwgZnVuY05hbWUsIGZ1bmMsIHRydWUsIHRydWUpO1xuICAgIH1cblxuXG4gICAgdmFyIGVkaXRvciA9IG9wdGlvbnMuZWRpdG9yO1xuICAgIGlmIChlZGl0b3IpIHtcbiAgICAgICAgaWYgKGpzLmlzQ2hpbGRDbGFzc09mKGJhc2UsIGNjLkNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIGNjLkNvbXBvbmVudC5fcmVnaXN0ZXJFZGl0b3JQcm9wcyhjbHMsIGVkaXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQ0NfREVWKSB7XG4gICAgICAgICAgICBjYy53YXJuSUQoMzYyMywgbmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2xzO1xufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBjb25zdHJ1Y3RvciBpcyBjcmVhdGVkIGJ5IGNjLkNsYXNzXG4gKlxuICogQG1ldGhvZCBfaXNDQ0NsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbkNDQ2xhc3MuX2lzQ0NDbGFzcyA9IGZ1bmN0aW9uIChjb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBjb25zdHJ1Y3RvciAmJlxuICAgICAgICAgICBjb25zdHJ1Y3Rvci5oYXNPd25Qcm9wZXJ0eSgnX19jdG9yc19fJyk7ICAgICAvLyBpcyBub3QgaW5oZXJpdGVkIF9fY3RvcnNfX1xufTtcblxuLy9cbi8vIE9wdGltaXplZCBkZWZpbmUgZnVuY3Rpb24gb25seSBmb3IgaW50ZXJuYWwgY2xhc3Nlc1xuLy9cbi8vIEBtZXRob2QgX2Zhc3REZWZpbmVcbi8vIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWVcbi8vIEBwYXJhbSB7RnVuY3Rpb259IGNvbnN0cnVjdG9yXG4vLyBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXphYmxlRmllbGRzXG4vLyBAcHJpdmF0ZVxuLy9cbkNDQ2xhc3MuX2Zhc3REZWZpbmUgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCBjb25zdHJ1Y3Rvciwgc2VyaWFsaXphYmxlRmllbGRzKSB7XG4gICAganMuc2V0Q2xhc3NOYW1lKGNsYXNzTmFtZSwgY29uc3RydWN0b3IpO1xuICAgIC8vY29uc3RydWN0b3IuX19jdG9yc19fID0gY29uc3RydWN0b3IuX19jdG9yc19fIHx8IG51bGw7XG4gICAgdmFyIHByb3BzID0gY29uc3RydWN0b3IuX19wcm9wc19fID0gY29uc3RydWN0b3IuX192YWx1ZXNfXyA9IE9iamVjdC5rZXlzKHNlcmlhbGl6YWJsZUZpZWxkcyk7XG4gICAgdmFyIGF0dHJzID0gQXR0ci5nZXRDbGFzc0F0dHJzKGNvbnN0cnVjdG9yKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBwcm9wc1tpXTtcbiAgICAgICAgYXR0cnNba2V5ICsgREVMSU1FVEVSICsgJ3Zpc2libGUnXSA9IGZhbHNlO1xuICAgICAgICBhdHRyc1trZXkgKyBERUxJTUVURVIgKyAnZGVmYXVsdCddID0gc2VyaWFsaXphYmxlRmllbGRzW2tleV07XG4gICAgfVxufTtcblxuQ0NDbGFzcy5BdHRyID0gQXR0cjtcbkNDQ2xhc3MuYXR0ciA9IEF0dHIuYXR0cjtcblxuLypcbiAqIFJldHVybiBhbGwgc3VwZXIgY2xhc3Nlc1xuICogQG1ldGhvZCBnZXRJbmhlcml0YW5jZUNoYWluXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHJldHVybiB7RnVuY3Rpb25bXX1cbiAqL1xuQ0NDbGFzcy5nZXRJbmhlcml0YW5jZUNoYWluID0gZnVuY3Rpb24gKGtsYXNzKSB7XG4gICAgdmFyIGNoYWluID0gW107XG4gICAgZm9yICg7Oykge1xuICAgICAgICBrbGFzcyA9IGpzLmdldFN1cGVyKGtsYXNzKTtcbiAgICAgICAgaWYgKCFrbGFzcykge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtsYXNzICE9PSBPYmplY3QpIHtcbiAgICAgICAgICAgIGNoYWluLnB1c2goa2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjaGFpbjtcbn07XG5cbnZhciBQcmltaXRpdmVUeXBlcyA9IHtcbiAgICAvLyBTcGVjaWZ5IHRoYXQgdGhlIGlucHV0IHZhbHVlIG11c3QgYmUgaW50ZWdlciBpbiBQcm9wZXJ0aWVzLlxuICAgIC8vIEFsc28gdXNlZCB0byBpbmRpY2F0ZXMgdGhhdCB0aGUgdHlwZSBvZiBlbGVtZW50cyBpbiBhcnJheSBvciB0aGUgdHlwZSBvZiB2YWx1ZSBpbiBkaWN0aW9uYXJ5IGlzIGludGVnZXIuXG4gICAgSW50ZWdlcjogJ051bWJlcicsXG4gICAgLy8gSW5kaWNhdGVzIHRoYXQgdGhlIHR5cGUgb2YgZWxlbWVudHMgaW4gYXJyYXkgb3IgdGhlIHR5cGUgb2YgdmFsdWUgaW4gZGljdGlvbmFyeSBpcyBkb3VibGUuXG4gICAgRmxvYXQ6ICdOdW1iZXInLFxuICAgIEJvb2xlYW46ICdCb29sZWFuJyxcbiAgICBTdHJpbmc6ICdTdHJpbmcnLFxufTtcbnZhciBvbkFmdGVyUHJvcHNfRVQgPSBbXTtcbmZ1bmN0aW9uIHBhcnNlQXR0cmlidXRlcyAoY2xzLCBhdHRyaWJ1dGVzLCBjbGFzc05hbWUsIHByb3BOYW1lLCB1c2VkSW5HZXR0ZXIpIHtcbiAgICB2YXIgRVJSX1R5cGUgPSBDQ19ERVYgPyAnVGhlICVzIG9mICVzIG11c3QgYmUgdHlwZSAlcycgOiAnJztcblxuICAgIHZhciBhdHRycyA9IG51bGw7XG4gICAgdmFyIHByb3BOYW1lUHJlZml4ID0gJyc7XG4gICAgZnVuY3Rpb24gaW5pdEF0dHJzICgpIHtcbiAgICAgICAgcHJvcE5hbWVQcmVmaXggPSBwcm9wTmFtZSArIERFTElNRVRFUjtcbiAgICAgICAgcmV0dXJuIGF0dHJzID0gQXR0ci5nZXRDbGFzc0F0dHJzKGNscyk7XG4gICAgfVxuXG4gICAgaWYgKChDQ19FRElUT1IgJiYgIUVkaXRvci5pc0J1aWxkZXIpIHx8IENDX1RFU1QpIHtcbiAgICAgICAgb25BZnRlclByb3BzX0VULmxlbmd0aCA9IDA7XG4gICAgfVxuXG4gICAgdmFyIHR5cGUgPSBhdHRyaWJ1dGVzLnR5cGU7XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgICAgdmFyIHByaW1pdGl2ZVR5cGUgPSBQcmltaXRpdmVUeXBlc1t0eXBlXTtcbiAgICAgICAgaWYgKHByaW1pdGl2ZVR5cGUpIHtcbiAgICAgICAgICAgIChhdHRycyB8fCBpbml0QXR0cnMoKSlbcHJvcE5hbWVQcmVmaXggKyAndHlwZSddID0gdHlwZTtcbiAgICAgICAgICAgIGlmICgoKENDX0VESVRPUiAmJiAhRWRpdG9yLmlzQnVpbGRlcikgfHwgQ0NfVEVTVCkgJiYgIWF0dHJpYnV0ZXMuX3Nob3J0KSB7XG4gICAgICAgICAgICAgICAgb25BZnRlclByb3BzX0VULnB1c2goQXR0ci5nZXRUeXBlQ2hlY2tlcl9FVChwcmltaXRpdmVUeXBlLCAnY2MuJyArIHR5cGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnT2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKENDX0RFVikge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzY0NCwgY2xhc3NOYW1lLCBwcm9wTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gQXR0ci5TY3JpcHRVdWlkKSB7XG4gICAgICAgICAgICAgICAgKGF0dHJzIHx8IGluaXRBdHRycygpKVtwcm9wTmFtZVByZWZpeCArICd0eXBlJ10gPSAnU2NyaXB0JztcbiAgICAgICAgICAgICAgICBhdHRyc1twcm9wTmFtZVByZWZpeCArICdjdG9yJ10gPSBjYy5TY3JpcHRBc3NldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEVudW0uaXNFbnVtKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAoYXR0cnMgfHwgaW5pdEF0dHJzKCkpW3Byb3BOYW1lUHJlZml4ICsgJ3R5cGUnXSA9ICdFbnVtJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzW3Byb3BOYW1lUHJlZml4ICsgJ2VudW1MaXN0J10gPSBFbnVtLmdldExpc3QodHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQ0NfREVWKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDM2NDUsIGNsYXNzTmFtZSwgcHJvcE5hbWUsIHR5cGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIChhdHRycyB8fCBpbml0QXR0cnMoKSlbcHJvcE5hbWVQcmVmaXggKyAndHlwZSddID0gJ09iamVjdCc7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzW3Byb3BOYW1lUHJlZml4ICsgJ2N0b3InXSA9IHR5cGU7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoKENDX0VESVRPUiAmJiAhRWRpdG9yLmlzQnVpbGRlcikgfHwgQ0NfVEVTVCkgJiYgIWF0dHJpYnV0ZXMuX3Nob3J0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFmdGVyUHJvcHNfRVQucHVzaChBdHRyLmdldE9ialR5cGVDaGVja2VyX0VUKHR5cGUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChDQ19ERVYpIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3JJRCgzNjQ2LCBjbGFzc05hbWUsIHByb3BOYW1lLCB0eXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVNpbXBsZUF0dHIgKGF0dHJOYW1lLCBleHBlY3RUeXBlKSB7XG4gICAgICAgIGlmIChhdHRyTmFtZSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gYXR0cmlidXRlc1thdHRyTmFtZV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gZXhwZWN0VHlwZSkge1xuICAgICAgICAgICAgICAgIChhdHRycyB8fCBpbml0QXR0cnMoKSlbcHJvcE5hbWVQcmVmaXggKyBhdHRyTmFtZV0gPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChDQ19ERVYpIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihFUlJfVHlwZSwgYXR0ck5hbWUsIGNsYXNzTmFtZSwgcHJvcE5hbWUsIGV4cGVjdFR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGF0dHJpYnV0ZXMuZWRpdG9yT25seSkge1xuICAgICAgICBpZiAoQ0NfREVWICYmIHVzZWRJbkdldHRlcikge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgzNjEzLCBcImVkaXRvck9ubHlcIiwgbmFtZSwgcHJvcE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgKGF0dHJzIHx8IGluaXRBdHRycygpKVtwcm9wTmFtZVByZWZpeCArICdlZGl0b3JPbmx5J10gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vcGFyc2VTaW1wbGVBdHRyKCdwcmV2ZW50RGVmZXJyZWRMb2FkJywgJ2Jvb2xlYW4nKTtcbiAgICBpZiAoQ0NfREVWKSB7XG4gICAgICAgIHBhcnNlU2ltcGxlQXR0cignZGlzcGxheU5hbWUnLCAnc3RyaW5nJyk7XG4gICAgICAgIHBhcnNlU2ltcGxlQXR0cignbXVsdGlsaW5lJywgJ2Jvb2xlYW4nKTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIChhdHRycyB8fCBpbml0QXR0cnMoKSlbcHJvcE5hbWVQcmVmaXggKyAncmVhZG9ubHknXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcGFyc2VTaW1wbGVBdHRyKCd0b29sdGlwJywgJ3N0cmluZycpO1xuICAgICAgICBwYXJzZVNpbXBsZUF0dHIoJ3NsaWRlJywgJ2Jvb2xlYW4nKTtcbiAgICB9XG5cbiAgICBpZiAoYXR0cmlidXRlcy5zZXJpYWxpemFibGUgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChDQ19ERVYgJiYgdXNlZEluR2V0dGVyKSB7XG4gICAgICAgICAgICBjYy5lcnJvcklEKDM2MTMsIFwic2VyaWFsaXphYmxlXCIsIG5hbWUsIHByb3BOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIChhdHRycyB8fCBpbml0QXR0cnMoKSlbcHJvcE5hbWVQcmVmaXggKyAnc2VyaWFsaXphYmxlJ10gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwYXJzZVNpbXBsZUF0dHIoJ2Zvcm1lcmx5U2VyaWFsaXplZEFzJywgJ3N0cmluZycpO1xuXG4gICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICBwYXJzZVNpbXBsZUF0dHIoJ25vdGlmeUZvcicsICdzdHJpbmcnKTtcblxuICAgICAgICBpZiAoJ2FuaW1hdGFibGUnIGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIChhdHRycyB8fCBpbml0QXR0cnMoKSlbcHJvcE5hbWVQcmVmaXggKyAnYW5pbWF0YWJsZSddID0gISFhdHRyaWJ1dGVzLmFuaW1hdGFibGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoQ0NfREVWKSB7XG4gICAgICAgIHZhciB2aXNpYmxlID0gYXR0cmlidXRlcy52aXNpYmxlO1xuICAgICAgICBpZiAodHlwZW9mIHZpc2libGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAoIXZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAoYXR0cnMgfHwgaW5pdEF0dHJzKCkpW3Byb3BOYW1lUHJlZml4ICsgJ3Zpc2libGUnXSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZpc2libGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAoYXR0cnMgfHwgaW5pdEF0dHJzKCkpW3Byb3BOYW1lUHJlZml4ICsgJ3Zpc2libGUnXSA9IHZpc2libGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgc3RhcnRzV2l0aFVTID0gKHByb3BOYW1lLmNoYXJDb2RlQXQoMCkgPT09IDk1KTtcbiAgICAgICAgICAgIGlmIChzdGFydHNXaXRoVVMpIHtcbiAgICAgICAgICAgICAgICAoYXR0cnMgfHwgaW5pdEF0dHJzKCkpW3Byb3BOYW1lUHJlZml4ICsgJ3Zpc2libGUnXSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHJhbmdlID0gYXR0cmlidXRlcy5yYW5nZTtcbiAgICBpZiAocmFuZ2UpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmFuZ2UpKSB7XG4gICAgICAgICAgICBpZiAocmFuZ2UubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgICAgICAoYXR0cnMgfHwgaW5pdEF0dHJzKCkpW3Byb3BOYW1lUHJlZml4ICsgJ21pbiddID0gcmFuZ2VbMF07XG4gICAgICAgICAgICAgICAgYXR0cnNbcHJvcE5hbWVQcmVmaXggKyAnbWF4J10gPSByYW5nZVsxXTtcbiAgICAgICAgICAgICAgICBpZiAocmFuZ2UubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgICAgICBhdHRyc1twcm9wTmFtZVByZWZpeCArICdzdGVwJ10gPSByYW5nZVsyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChDQ19ERVYpIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDM2NDcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKENDX0RFVikge1xuICAgICAgICAgICAgY2MuZXJyb3IoRVJSX1R5cGUsICdyYW5nZScsIGNsYXNzTmFtZSwgcHJvcE5hbWUsICdhcnJheScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBhcnNlU2ltcGxlQXR0cignbWluJywgJ251bWJlcicpO1xuICAgIHBhcnNlU2ltcGxlQXR0cignbWF4JywgJ251bWJlcicpO1xuICAgIHBhcnNlU2ltcGxlQXR0cignc3RlcCcsICdudW1iZXInKTtcbn1cblxuY2MuQ2xhc3MgPSBDQ0NsYXNzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpc0FycmF5OiBmdW5jdGlvbiAoZGVmYXVsdFZhbCkge1xuICAgICAgICBkZWZhdWx0VmFsID0gZ2V0RGVmYXVsdChkZWZhdWx0VmFsKTtcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZGVmYXVsdFZhbCk7XG4gICAgfSxcbiAgICBmYXN0RGVmaW5lOiBDQ0NsYXNzLl9mYXN0RGVmaW5lLFxuICAgIGdldE5ld1ZhbHVlVHlwZUNvZGU6IENDX1NVUFBPUlRfSklUICYmIGdldE5ld1ZhbHVlVHlwZUNvZGVKaXQsXG4gICAgSURFTlRJRklFUl9SRSxcbiAgICBlc2NhcGVGb3JKUyxcbiAgICBnZXREZWZhdWx0OiBnZXREZWZhdWx0XG59O1xuXG5pZiAoQ0NfVEVTVCkge1xuICAgIGpzLm1peGluKENDQ2xhc3MsIG1vZHVsZS5leHBvcnRzKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9