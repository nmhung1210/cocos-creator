
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/deserialize-editor.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _deserializeCompiled = _interopRequireDefault(require("./deserialize-compiled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var Attr = require('./attribute');

var CCClass = require('./CCClass');

var misc = require('../utils/misc');

// HELPERS

/**
 * !#en Contains information collected during deserialization
 * !#zh 包含反序列化时的一些信息
 * @class Details
 *
 */
var Details = function Details() {
  /**
   * list of the depends assets' uuid
   * @property {String[]} uuidList
   */
  this.uuidList = [];
  /**
   * the obj list whose field needs to load asset by uuid
   * @property {Object[]} uuidObjList
   */

  this.uuidObjList = [];
  /**
   * the corresponding field name which referenced to the asset
   * @property {String[]} uuidPropList
   */

  this.uuidPropList = [];
};
/**
 * @method reset
 */


Details.prototype.reset = function () {
  this.uuidList.length = 0;
  this.uuidObjList.length = 0;
  this.uuidPropList.length = 0;
};

if (CC_EDITOR || CC_TEST) {
  Details.prototype.assignAssetsBy = function (getter) {
    for (var i = 0, len = this.uuidList.length; i < len; i++) {
      var uuid = this.uuidList[i];
      var obj = this.uuidObjList[i];
      var prop = this.uuidPropList[i];
      obj[prop] = getter(uuid);
    }
  };
} // /**
//  * @method getUuidOf
//  * @param {Object} obj
//  * @param {String} propName
//  * @return {String}
//  */
// Details.prototype.getUuidOf = function (obj, propName) {
//     for (var i = 0; i < this.uuidObjList.length; i++) {
//         if (this.uuidObjList[i] === obj && this.uuidPropList[i] === propName) {
//             return this.uuidList[i];
//         }
//     }
//     return "";
// };

/**
 * @method push
 * @param {Object} obj
 * @param {String} propName
 * @param {String} uuid
 */


Details.prototype.push = function (obj, propName, uuid) {
  this.uuidList.push(uuid);
  this.uuidObjList.push(obj);
  this.uuidPropList.push(propName);
};

Details.pool = new js.Pool(function (obj) {
  obj.reset();
}, 10);

Details.pool.get = function () {
  return this._get() || new Details();
}; // IMPLEMENT OF DESERIALIZATION


var _Deserializer = function () {
  function _Deserializer(result, classFinder, customEnv, ignoreEditorOnly) {
    this.result = result;
    this.customEnv = customEnv;
    this.deserializedList = [];
    this.deserializedData = null;
    this._classFinder = classFinder;

    if (CC_DEV) {
      this._ignoreEditorOnly = ignoreEditorOnly;
    }

    this._idList = [];
    this._idObjList = [];
    this._idPropList = [];
  }

  function _dereference(self) {
    // 这里不采用遍历反序列化结果的方式，因为反序列化的结果如果引用到复杂的外部库，很容易堆栈溢出。
    var deserializedList = self.deserializedList;
    var idPropList = self._idPropList;
    var idList = self._idList;
    var idObjList = self._idObjList;
    var onDereferenced = self._classFinder && self._classFinder.onDereferenced;
    var i, propName, id;

    if (CC_EDITOR && onDereferenced) {
      for (i = 0; i < idList.length; i++) {
        propName = idPropList[i];
        id = idList[i];
        idObjList[i][propName] = deserializedList[id];
        onDereferenced(deserializedList, id, idObjList[i], propName);
      }
    } else {
      for (i = 0; i < idList.length; i++) {
        propName = idPropList[i];
        id = idList[i];
        idObjList[i][propName] = deserializedList[id];
      }
    }
  }

  var prototype = _Deserializer.prototype;

  prototype.deserialize = function (jsonObj) {
    if (Array.isArray(jsonObj)) {
      var jsonArray = jsonObj;
      var refCount = jsonArray.length;
      this.deserializedList.length = refCount; // deserialize

      for (var i = 0; i < refCount; i++) {
        if (jsonArray[i]) {
          if (CC_EDITOR || CC_TEST) {
            this.deserializedList[i] = this._deserializeObject(jsonArray[i], this.deserializedList, '' + i);
          } else {
            this.deserializedList[i] = this._deserializeObject(jsonArray[i]);
          }
        }
      }

      this.deserializedData = refCount > 0 ? this.deserializedList[0] : []; //// callback
      //for (var j = 0; j < refCount; j++) {
      //    if (referencedList[j].onAfterDeserialize) {
      //        referencedList[j].onAfterDeserialize();
      //    }
      //}
    } else {
      this.deserializedList.length = 1;

      if (CC_EDITOR || CC_TEST) {
        this.deserializedData = jsonObj ? this._deserializeObject(jsonObj, this.deserializedList, '0') : null;
      } else {
        this.deserializedData = jsonObj ? this._deserializeObject(jsonObj) : null;
      }

      this.deserializedList[0] = this.deserializedData; //// callback
      //if (deserializedData.onAfterDeserialize) {
      //    deserializedData.onAfterDeserialize();
      //}
    } // dereference


    _dereference(this);

    return this.deserializedData;
  }; ///**
  // * @param {Object} serialized - The obj to deserialize, must be non-nil
  // * @param {Object} [owner] - debug only
  // * @param {String} [propName] - debug only
  // */


  prototype._deserializeObject = function (serialized, owner, propName) {
    var prop;
    var obj = null; // the obj to return

    var klass = null;
    var type = serialized.__type__;

    if (type === 'TypedArray') {
      var array = serialized.array;
      obj = new window[serialized.ctor](array.length);

      for (var i = 0; i < array.length; ++i) {
        obj[i] = array[i];
      }

      return obj;
    } else if (type) {
      // Type Object (including CCClass)
      klass = this._classFinder(type, serialized, owner, propName);

      if (!klass) {
        var notReported = this._classFinder === js._getClassById;

        if (notReported) {
          deserialize.reportMissingClass(type);
        }

        return null;
      } // instantiate a new object


      obj = new klass();

      if (obj._deserialize) {
        obj._deserialize(serialized.content, this);

        return obj;
      }

      if (cc.Class._isCCClass(klass)) {
        _deserializeFireClass(this, obj, serialized, klass);
      } else {
        this._deserializeTypedObject(obj, serialized, klass);
      }
    } else if (!Array.isArray(serialized)) {
      // embedded primitive javascript object
      obj = {};

      this._deserializePrimitiveObject(obj, serialized);
    } else {
      // Array
      obj = new Array(serialized.length);

      for (var _i = 0; _i < serialized.length; _i++) {
        prop = serialized[_i];

        if (typeof prop === 'object' && prop) {
          this._deserializeObjField(obj, prop, '' + _i);
        } else {
          obj[_i] = prop;
        }
      }
    }

    return obj;
  }; // 和 _deserializeObject 不同的地方在于会判断 id 和 uuid


  prototype._deserializeObjField = function (obj, jsonObj, propName) {
    var id = jsonObj.__id__;

    if (id === undefined) {
      var uuid = jsonObj.__uuid__;

      if (uuid) {
        this.result.push(obj, propName, uuid);
      } else {
        if (CC_EDITOR || CC_TEST) {
          obj[propName] = this._deserializeObject(jsonObj, obj, propName);
        } else {
          obj[propName] = this._deserializeObject(jsonObj);
        }
      }
    } else {
      var dObj = this.deserializedList[id];

      if (dObj) {
        obj[propName] = dObj;
      } else {
        this._idList.push(id);

        this._idObjList.push(obj);

        this._idPropList.push(propName);
      }
    }
  };

  prototype._deserializePrimitiveObject = function (instance, serialized) {
    for (var propName in serialized) {
      if (serialized.hasOwnProperty(propName)) {
        var prop = serialized[propName];

        if (typeof prop !== 'object') {
          if (propName !== '__type__'
          /* && k != '__id__'*/
          ) {
              instance[propName] = prop;
            }
        } else {
          if (prop) {
            this._deserializeObjField(instance, prop, propName);
          } else {
            instance[propName] = null;
          }
        }
      }
    }
  }; // function _compileTypedObject (accessor, klass, ctorCode) {
  //     if (klass === cc.Vec2) {
  //         return `{` +
  //                     `o${accessor}.x=prop.x||0;` +
  //                     `o${accessor}.y=prop.y||0;` +
  //                `}`;
  //     }
  //     else if (klass === cc.Color) {
  //         return `{` +
  //                    `o${accessor}.r=prop.r||0;` +
  //                    `o${accessor}.g=prop.g||0;` +
  //                    `o${accessor}.b=prop.b||0;` +
  //                    `o${accessor}.a=(prop.a===undefined?255:prop.a);` +
  //                `}`;
  //     }
  //     else if (klass === cc.Size) {
  //         return `{` +
  //                    `o${accessor}.width=prop.width||0;` +
  //                    `o${accessor}.height=prop.height||0;` +
  //                `}`;
  //     }
  //     else {
  //         return `s._deserializeTypedObject(o${accessor},prop,${ctorCode});`;
  //     }
  // }
  // deserialize ValueType


  prototype._deserializeTypedObject = function (instance, serialized, klass) {
    if (klass === cc.Vec2) {
      instance.x = serialized.x || 0;
      instance.y = serialized.y || 0;
      return;
    } else if (klass === cc.Vec3) {
      instance.x = serialized.x || 0;
      instance.y = serialized.y || 0;
      instance.z = serialized.z || 0;
      return;
    } else if (klass === cc.Color) {
      instance.r = serialized.r || 0;
      instance.g = serialized.g || 0;
      instance.b = serialized.b || 0;
      var a = serialized.a;
      instance.a = a === undefined ? 255 : a;
      return;
    } else if (klass === cc.Size) {
      instance.width = serialized.width || 0;
      instance.height = serialized.height || 0;
      return;
    }

    var DEFAULT = Attr.DELIMETER + 'default';
    var attrs = Attr.getClassAttrs(klass);
    var fastDefinedProps = klass.__props__ || Object.keys(instance); // 遍历 instance，如果具有类型，才不会把 __type__ 也读进来

    for (var i = 0; i < fastDefinedProps.length; i++) {
      var propName = fastDefinedProps[i];
      var value = serialized[propName];

      if (value === undefined || !serialized.hasOwnProperty(propName)) {
        // not serialized,
        // recover to default value in ValueType, because eliminated properties equals to
        // its default value in ValueType, not default value in user class
        value = CCClass.getDefault(attrs[propName + DEFAULT]);
      }

      if (typeof value !== 'object') {
        instance[propName] = value;
      } else if (value) {
        this._deserializeObjField(instance, value, propName);
      } else {
        instance[propName] = null;
      }
    }
  };

  function compileObjectTypeJit(sources, defaultValue, accessorToSet, propNameLiteralToSet, assumeHavePropIfIsValue) {
    if (defaultValue instanceof cc.ValueType) {
      // fast case
      if (!assumeHavePropIfIsValue) {
        sources.push('if(prop){');
      }

      var ctorCode = js.getClassName(defaultValue);
      sources.push("s._deserializeTypedObject(o" + accessorToSet + ",prop," + ctorCode + ");");

      if (!assumeHavePropIfIsValue) {
        sources.push('}else o' + accessorToSet + '=null;');
      }
    } else {
      sources.push('if(prop){');
      sources.push('s._deserializeObjField(o,prop,' + propNameLiteralToSet + ');');
      sources.push('}else o' + accessorToSet + '=null;');
    }
  }

  var compileDeserialize = CC_SUPPORT_JIT ? function (self, klass) {
    var TYPE = Attr.DELIMETER + 'type';
    var EDITOR_ONLY = Attr.DELIMETER + 'editorOnly';
    var DEFAULT = Attr.DELIMETER + 'default';
    var FORMERLY_SERIALIZED_AS = Attr.DELIMETER + 'formerlySerializedAs';
    var attrs = Attr.getClassAttrs(klass);
    var props = klass.__values__; // self, obj, serializedData, klass

    var sources = ['var prop;'];
    var fastMode = misc.BUILTIN_CLASSID_RE.test(js._getClassId(klass)); // sources.push('var vb,vn,vs,vo,vu,vf;');    // boolean, number, string, object, undefined, function

    for (var p = 0; p < props.length; p++) {
      var propName = props[p];

      if ((CC_PREVIEW || CC_EDITOR && self._ignoreEditorOnly) && attrs[propName + EDITOR_ONLY]) {
        continue; // skip editor only if in preview
      }

      var accessorToSet, propNameLiteralToSet;

      if (CCClass.IDENTIFIER_RE.test(propName)) {
        propNameLiteralToSet = '"' + propName + '"';
        accessorToSet = '.' + propName;
      } else {
        propNameLiteralToSet = CCClass.escapeForJS(propName);
        accessorToSet = '[' + propNameLiteralToSet + ']';
      }

      var accessorToGet = accessorToSet;

      if (attrs[propName + FORMERLY_SERIALIZED_AS]) {
        var propNameToRead = attrs[propName + FORMERLY_SERIALIZED_AS];

        if (CCClass.IDENTIFIER_RE.test(propNameToRead)) {
          accessorToGet = '.' + propNameToRead;
        } else {
          accessorToGet = '[' + CCClass.escapeForJS(propNameToRead) + ']';
        }
      }

      sources.push('prop=d' + accessorToGet + ';');
      sources.push("if(typeof " + (CC_JSB || CC_RUNTIME ? '(prop)' : 'prop') + "!==\"undefined\"){"); // function undefined object(null) string boolean number

      var defaultValue = CCClass.getDefault(attrs[propName + DEFAULT]);

      if (fastMode) {
        var isPrimitiveType;
        var userType = attrs[propName + TYPE];

        if (defaultValue === undefined && userType) {
          isPrimitiveType = userType instanceof Attr.PrimitiveType;
        } else {
          var defaultType = typeof defaultValue;
          isPrimitiveType = defaultType === 'string' || defaultType === 'number' || defaultType === 'boolean';
        }

        if (isPrimitiveType) {
          sources.push("o" + accessorToSet + "=prop;");
        } else {
          compileObjectTypeJit(sources, defaultValue, accessorToSet, propNameLiteralToSet, true);
        }
      } else {
        sources.push("if(typeof " + (CC_JSB || CC_RUNTIME ? '(prop)' : 'prop') + "!==\"object\"){" + 'o' + accessorToSet + '=prop;' + '}else{');
        compileObjectTypeJit(sources, defaultValue, accessorToSet, propNameLiteralToSet, false);
        sources.push('}');
      }

      sources.push('}');
    }

    if (cc.js.isChildClassOf(klass, cc._BaseNode) || cc.js.isChildClassOf(klass, cc.Component)) {
      if (CC_PREVIEW || CC_EDITOR && self._ignoreEditorOnly) {
        var mayUsedInPersistRoot = js.isChildClassOf(klass, cc.Node);

        if (mayUsedInPersistRoot) {
          sources.push('d._id&&(o._id=d._id);');
        }
      } else {
        sources.push('d._id&&(o._id=d._id);');
      }
    }

    if (props[props.length - 1] === '_$erialized') {
      // deep copy original serialized data
      sources.push('o._$erialized=JSON.parse(JSON.stringify(d));'); // parse the serialized data as primitive javascript object, so its __id__ will be dereferenced

      sources.push('s._deserializePrimitiveObject(o._$erialized,d);');
    }

    return Function('s', 'o', 'd', 'k', sources.join(''));
  } : function (self, klass) {
    var fastMode = misc.BUILTIN_CLASSID_RE.test(js._getClassId(klass));
    var shouldCopyId = cc.js.isChildClassOf(klass, cc._BaseNode) || cc.js.isChildClassOf(klass, cc.Component);
    var shouldCopyRawData;
    var simpleProps = [];
    var simplePropsToRead = simpleProps;
    var advancedProps = [];
    var advancedPropsToRead = advancedProps;
    var advancedPropsValueType = [];

    (function () {
      var props = klass.__values__;
      shouldCopyRawData = props[props.length - 1] === '_$erialized';
      var attrs = Attr.getClassAttrs(klass);
      var TYPE = Attr.DELIMETER + 'type';
      var DEFAULT = Attr.DELIMETER + 'default';
      var FORMERLY_SERIALIZED_AS = Attr.DELIMETER + 'formerlySerializedAs';

      for (var p = 0; p < props.length; p++) {
        var propName = props[p];
        var propNameToRead = propName;

        if (attrs[propName + FORMERLY_SERIALIZED_AS]) {
          propNameToRead = attrs[propName + FORMERLY_SERIALIZED_AS];
        } // function undefined object(null) string boolean number


        var defaultValue = CCClass.getDefault(attrs[propName + DEFAULT]);
        var isPrimitiveType = false;

        if (fastMode) {
          var userType = attrs[propName + TYPE];

          if (defaultValue === undefined && userType) {
            isPrimitiveType = userType instanceof Attr.PrimitiveType;
          } else {
            var defaultType = typeof defaultValue;
            isPrimitiveType = defaultType === 'string' || defaultType === 'number' || defaultType === 'boolean';
          }
        }

        if (fastMode && isPrimitiveType) {
          if (propNameToRead !== propName && simplePropsToRead === simpleProps) {
            simplePropsToRead = simpleProps.slice();
          }

          simpleProps.push(propName);

          if (simplePropsToRead !== simpleProps) {
            simplePropsToRead.push(propNameToRead);
          }
        } else {
          if (propNameToRead !== propName && advancedPropsToRead === advancedProps) {
            advancedPropsToRead = advancedProps.slice();
          }

          advancedProps.push(propName);

          if (advancedPropsToRead !== advancedProps) {
            advancedPropsToRead.push(propNameToRead);
          }

          advancedPropsValueType.push(defaultValue instanceof cc.ValueType && defaultValue.constructor);
        }
      }
    })();

    return function (s, o, d, k) {
      for (var i = 0; i < simpleProps.length; ++i) {
        var _prop = d[simplePropsToRead[i]];

        if (_prop !== undefined) {
          o[simpleProps[i]] = _prop;
        }
      }

      for (var _i2 = 0; _i2 < advancedProps.length; ++_i2) {
        var propName = advancedProps[_i2];
        var prop = d[advancedPropsToRead[_i2]];

        if (prop === undefined) {
          continue;
        }

        if (!fastMode && typeof prop !== 'object') {
          o[propName] = prop;
        } else {
          // fastMode (so will not simpleProp) or object
          var valueTypeCtor = advancedPropsValueType[_i2];

          if (valueTypeCtor) {
            if (fastMode || prop) {
              s._deserializeTypedObject(o[propName], prop, valueTypeCtor);
            } else {
              o[propName] = null;
            }
          } else {
            if (prop) {
              s._deserializeObjField(o, prop, propName);
            } else {
              o[propName] = null;
            }
          }
        }
      }

      if (shouldCopyId && d._id) {
        o._id = d._id;
      }

      if (shouldCopyRawData) {
        // deep copy original serialized data
        o._$erialized = JSON.parse(JSON.stringify(d)); // parse the serialized data as primitive javascript object, so its __id__ will be dereferenced

        s._deserializePrimitiveObject(o._$erialized, d);
      }
    };
  };

  function unlinkUnusedPrefab(self, serialized, obj) {
    var uuid = serialized['asset'] && serialized['asset'].__uuid__;

    if (uuid) {
      var last = self.result.uuidList.length - 1;

      if (self.result.uuidList[last] === uuid && self.result.uuidObjList[last] === obj && self.result.uuidPropList[last] === 'asset') {
        self.result.uuidList.pop();
        self.result.uuidObjList.pop();
        self.result.uuidPropList.pop();
      } else {
        var debugEnvOnlyInfo = 'Failed to skip prefab asset while deserializing PrefabInfo';
        cc.warn(debugEnvOnlyInfo);
      }
    }
  }

  function _deserializeFireClass(self, obj, serialized, klass) {
    var deserialize;

    if (klass.hasOwnProperty('__deserialize__')) {
      deserialize = klass.__deserialize__;
    } else {
      deserialize = compileDeserialize(self, klass); // if (CC_TEST && !isPhantomJS) {
      //     cc.log(deserialize);
      // }

      js.value(klass, '__deserialize__', deserialize, true);
    }

    deserialize(self, obj, serialized, klass); // if preview or build worker

    if (CC_PREVIEW || CC_EDITOR && self._ignoreEditorOnly) {
      if (klass === cc._PrefabInfo && !obj.sync) {
        unlinkUnusedPrefab(self, serialized, obj);
      }
    }
  }

  _Deserializer.pool = new js.Pool(function (obj) {
    obj.result = null;
    obj.customEnv = null;
    obj.deserializedList.length = 0;
    obj.deserializedData = null;
    obj._classFinder = null;
    obj._idList.length = 0;
    obj._idObjList.length = 0;
    obj._idPropList.length = 0;
  }, 1);

  _Deserializer.pool.get = function (result, classFinder, customEnv, ignoreEditorOnly) {
    var cache = this._get();

    if (cache) {
      cache.result = result;
      cache.customEnv = customEnv;
      cache._classFinder = classFinder;

      if (CC_DEV) {
        cache._ignoreEditorOnly = ignoreEditorOnly;
      }

      return cache;
    } else {
      return new _Deserializer(result, classFinder, customEnv, ignoreEditorOnly);
    }
  };

  return _Deserializer;
}();
/**
 * @module cc
 */

/**
 * !#en Deserialize json to cc.Asset
 * !#zh 将 JSON 反序列化为对象实例。
 *
 * @method deserialize
 * @param {String|Object} data - the serialized cc.Asset json string or json object.
 * @param {Details} [details] - additional loading result
 * @param {Object} [options]
 * @return {object} the main data(asset)
 */


var deserialize = module.exports = function (data, details, options) {
  options = options || {};
  var classFinder = options.classFinder || js._getClassById; // 启用 createAssetRefs 后，如果有 url 属性则会被统一强制设置为 { uuid: 'xxx' }，必须后面再特殊处理

  var createAssetRefs = options.createAssetRefs || cc.sys.platform === cc.sys.EDITOR_CORE;
  var customEnv = options.customEnv;
  var ignoreEditorOnly = options.ignoreEditorOnly; //var oldJson = JSON.stringify(data, null, 2);

  var tempDetails = !details;
  details = details || Details.pool.get();

  var deserializer = _Deserializer.pool.get(details, classFinder, customEnv, ignoreEditorOnly);

  cc.game._isCloning = true;
  var res = deserializer.deserialize(data);
  cc.game._isCloning = false;

  _Deserializer.pool.put(deserializer);

  if (createAssetRefs) {
    details.assignAssetsBy(Editor.serialize.asAsset);
  }

  if (tempDetails) {
    Details.pool.put(details);
  } //var afterJson = JSON.stringify(data, null, 2);
  //if (oldJson !== afterJson) {
  //    throw new Error('JSON SHOULD not changed');
  //}


  return res;
};

deserialize.Details = Details;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL2Rlc2VyaWFsaXplLWVkaXRvci5qcyJdLCJuYW1lcyI6WyJqcyIsInJlcXVpcmUiLCJBdHRyIiwiQ0NDbGFzcyIsIm1pc2MiLCJEZXRhaWxzIiwidXVpZExpc3QiLCJ1dWlkT2JqTGlzdCIsInV1aWRQcm9wTGlzdCIsInByb3RvdHlwZSIsInJlc2V0IiwibGVuZ3RoIiwiQ0NfRURJVE9SIiwiQ0NfVEVTVCIsImFzc2lnbkFzc2V0c0J5IiwiZ2V0dGVyIiwiaSIsImxlbiIsInV1aWQiLCJvYmoiLCJwcm9wIiwicHVzaCIsInByb3BOYW1lIiwicG9vbCIsIlBvb2wiLCJnZXQiLCJfZ2V0IiwiX0Rlc2VyaWFsaXplciIsInJlc3VsdCIsImNsYXNzRmluZGVyIiwiY3VzdG9tRW52IiwiaWdub3JlRWRpdG9yT25seSIsImRlc2VyaWFsaXplZExpc3QiLCJkZXNlcmlhbGl6ZWREYXRhIiwiX2NsYXNzRmluZGVyIiwiQ0NfREVWIiwiX2lnbm9yZUVkaXRvck9ubHkiLCJfaWRMaXN0IiwiX2lkT2JqTGlzdCIsIl9pZFByb3BMaXN0IiwiX2RlcmVmZXJlbmNlIiwic2VsZiIsImlkUHJvcExpc3QiLCJpZExpc3QiLCJpZE9iakxpc3QiLCJvbkRlcmVmZXJlbmNlZCIsImlkIiwiZGVzZXJpYWxpemUiLCJqc29uT2JqIiwiQXJyYXkiLCJpc0FycmF5IiwianNvbkFycmF5IiwicmVmQ291bnQiLCJfZGVzZXJpYWxpemVPYmplY3QiLCJzZXJpYWxpemVkIiwib3duZXIiLCJrbGFzcyIsInR5cGUiLCJfX3R5cGVfXyIsImFycmF5Iiwid2luZG93IiwiY3RvciIsIm5vdFJlcG9ydGVkIiwiX2dldENsYXNzQnlJZCIsInJlcG9ydE1pc3NpbmdDbGFzcyIsIl9kZXNlcmlhbGl6ZSIsImNvbnRlbnQiLCJjYyIsIkNsYXNzIiwiX2lzQ0NDbGFzcyIsIl9kZXNlcmlhbGl6ZUZpcmVDbGFzcyIsIl9kZXNlcmlhbGl6ZVR5cGVkT2JqZWN0IiwiX2Rlc2VyaWFsaXplUHJpbWl0aXZlT2JqZWN0IiwiX2Rlc2VyaWFsaXplT2JqRmllbGQiLCJfX2lkX18iLCJ1bmRlZmluZWQiLCJfX3V1aWRfXyIsImRPYmoiLCJpbnN0YW5jZSIsImhhc093blByb3BlcnR5IiwiVmVjMiIsIngiLCJ5IiwiVmVjMyIsInoiLCJDb2xvciIsInIiLCJnIiwiYiIsImEiLCJTaXplIiwid2lkdGgiLCJoZWlnaHQiLCJERUZBVUxUIiwiREVMSU1FVEVSIiwiYXR0cnMiLCJnZXRDbGFzc0F0dHJzIiwiZmFzdERlZmluZWRQcm9wcyIsIl9fcHJvcHNfXyIsIk9iamVjdCIsImtleXMiLCJ2YWx1ZSIsImdldERlZmF1bHQiLCJjb21waWxlT2JqZWN0VHlwZUppdCIsInNvdXJjZXMiLCJkZWZhdWx0VmFsdWUiLCJhY2Nlc3NvclRvU2V0IiwicHJvcE5hbWVMaXRlcmFsVG9TZXQiLCJhc3N1bWVIYXZlUHJvcElmSXNWYWx1ZSIsIlZhbHVlVHlwZSIsImN0b3JDb2RlIiwiZ2V0Q2xhc3NOYW1lIiwiY29tcGlsZURlc2VyaWFsaXplIiwiQ0NfU1VQUE9SVF9KSVQiLCJUWVBFIiwiRURJVE9SX09OTFkiLCJGT1JNRVJMWV9TRVJJQUxJWkVEX0FTIiwicHJvcHMiLCJfX3ZhbHVlc19fIiwiZmFzdE1vZGUiLCJCVUlMVElOX0NMQVNTSURfUkUiLCJ0ZXN0IiwiX2dldENsYXNzSWQiLCJwIiwiQ0NfUFJFVklFVyIsIklERU5USUZJRVJfUkUiLCJlc2NhcGVGb3JKUyIsImFjY2Vzc29yVG9HZXQiLCJwcm9wTmFtZVRvUmVhZCIsIkNDX0pTQiIsIkNDX1JVTlRJTUUiLCJpc1ByaW1pdGl2ZVR5cGUiLCJ1c2VyVHlwZSIsIlByaW1pdGl2ZVR5cGUiLCJkZWZhdWx0VHlwZSIsImlzQ2hpbGRDbGFzc09mIiwiX0Jhc2VOb2RlIiwiQ29tcG9uZW50IiwibWF5VXNlZEluUGVyc2lzdFJvb3QiLCJOb2RlIiwiRnVuY3Rpb24iLCJqb2luIiwic2hvdWxkQ29weUlkIiwic2hvdWxkQ29weVJhd0RhdGEiLCJzaW1wbGVQcm9wcyIsInNpbXBsZVByb3BzVG9SZWFkIiwiYWR2YW5jZWRQcm9wcyIsImFkdmFuY2VkUHJvcHNUb1JlYWQiLCJhZHZhbmNlZFByb3BzVmFsdWVUeXBlIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsInMiLCJvIiwiZCIsImsiLCJ2YWx1ZVR5cGVDdG9yIiwiX2lkIiwiXyRlcmlhbGl6ZWQiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJ1bmxpbmtVbnVzZWRQcmVmYWIiLCJsYXN0IiwicG9wIiwiZGVidWdFbnZPbmx5SW5mbyIsIndhcm4iLCJfX2Rlc2VyaWFsaXplX18iLCJfUHJlZmFiSW5mbyIsInN5bmMiLCJjYWNoZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJkYXRhIiwiZGV0YWlscyIsIm9wdGlvbnMiLCJjcmVhdGVBc3NldFJlZnMiLCJzeXMiLCJwbGF0Zm9ybSIsIkVESVRPUl9DT1JFIiwidGVtcERldGFpbHMiLCJkZXNlcmlhbGl6ZXIiLCJnYW1lIiwiX2lzQ2xvbmluZyIsInJlcyIsInB1dCIsIkVkaXRvciIsInNlcmlhbGl6ZSIsImFzQXNzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUErQkE7Ozs7QUEvQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBSUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFoQjs7QUFDQSxJQUFJQyxJQUFJLEdBQUdELE9BQU8sQ0FBQyxhQUFELENBQWxCOztBQUNBLElBQUlFLE9BQU8sR0FBR0YsT0FBTyxDQUFDLFdBQUQsQ0FBckI7O0FBQ0EsSUFBSUcsSUFBSSxHQUFHSCxPQUFPLENBQUMsZUFBRCxDQUFsQjs7QUFJQTs7QUFFQTs7Ozs7O0FBTUEsSUFBSUksT0FBTyxHQUFHLFNBQVZBLE9BQVUsR0FBWTtBQUN0Qjs7OztBQUlBLE9BQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQTs7Ozs7QUFJQSxPQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0E7Ozs7O0FBSUEsT0FBS0MsWUFBTCxHQUFv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QUFPLENBQUNrQixJQUFSLENBQWFFLEdBQWIsRUFBckI7O0FBQ0EsTUFBSTJKLFlBQVksR0FBR3pKLGFBQWEsQ0FBQ0osSUFBZCxDQUFtQkUsR0FBbkIsQ0FBdUJvSixPQUF2QixFQUFnQ2hKLFdBQWhDLEVBQTZDQyxTQUE3QyxFQUF3REMsZ0JBQXhELENBQW5COztBQUVBb0MsRUFBQUEsRUFBRSxDQUFDa0gsSUFBSCxDQUFRQyxVQUFSLEdBQXFCLElBQXJCO0FBQ0EsTUFBSUMsR0FBRyxHQUFHSCxZQUFZLENBQUNySSxXQUFiLENBQXlCNkgsSUFBekIsQ0FBVjtBQUNBekcsRUFBQUEsRUFBRSxDQUFDa0gsSUFBSCxDQUFRQyxVQUFSLEdBQXFCLEtBQXJCOztBQUVBM0osRUFBQUEsYUFBYSxDQUFDSixJQUFkLENBQW1CaUssR0FBbkIsQ0FBdUJKLFlBQXZCOztBQUNBLE1BQUlMLGVBQUosRUFBcUI7QUFDakJGLElBQUFBLE9BQU8sQ0FBQy9KLGNBQVIsQ0FBdUIySyxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE9BQXhDO0FBQ0g7O0FBQ0QsTUFBSVIsV0FBSixFQUFpQjtBQUNiOUssSUFBQUEsT0FBTyxDQUFDa0IsSUFBUixDQUFhaUssR0FBYixDQUFpQlgsT0FBakI7QUFDSCxHQXhCZ0UsQ0EwQmpFO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxTQUFPVSxHQUFQO0FBQ0gsQ0FoQ0Q7O0FBa0NBeEksV0FBVyxDQUFDMUMsT0FBWixHQUFzQkEsT0FBdEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBqcyA9IHJlcXVpcmUoJy4vanMnKTtcbnZhciBBdHRyID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGUnKTtcbnZhciBDQ0NsYXNzID0gcmVxdWlyZSgnLi9DQ0NsYXNzJyk7XG52YXIgbWlzYyA9IHJlcXVpcmUoJy4uL3V0aWxzL21pc2MnKTtcblxuaW1wb3J0IGRlc2VyaWFsaXplQ29tcGlsZWQgZnJvbSAnLi9kZXNlcmlhbGl6ZS1jb21waWxlZCc7XG5cbi8vIEhFTFBFUlNcblxuLyoqXG4gKiAhI2VuIENvbnRhaW5zIGluZm9ybWF0aW9uIGNvbGxlY3RlZCBkdXJpbmcgZGVzZXJpYWxpemF0aW9uXG4gKiAhI3poIOWMheWQq+WPjeW6j+WIl+WMluaXtueahOS4gOS6m+S/oeaBr1xuICogQGNsYXNzIERldGFpbHNcbiAqXG4gKi9cbnZhciBEZXRhaWxzID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIGxpc3Qgb2YgdGhlIGRlcGVuZHMgYXNzZXRzJyB1dWlkXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmdbXX0gdXVpZExpc3RcbiAgICAgKi9cbiAgICB0aGlzLnV1aWRMaXN0ID0gW107XG4gICAgLyoqXG4gICAgICogdGhlIG9iaiBsaXN0IHdob3NlIGZpZWxkIG5lZWRzIHRvIGxvYWQgYXNzZXQgYnkgdXVpZFxuICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0W119IHV1aWRPYmpMaXN0XG4gICAgICovXG4gICAgdGhpcy51dWlkT2JqTGlzdCA9IFtdO1xuICAgIC8qKlxuICAgICAqIHRoZSBjb3JyZXNwb25kaW5nIGZpZWxkIG5hbWUgd2hpY2ggcmVmZXJlbmNlZCB0byB0aGUgYXNzZXRcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ1tdfSB1dWlkUHJvcExpc3RcbiAgICAgKi9cbiAgICB0aGlzLnV1aWRQcm9wTGlzdCA9IFtdO1xufTtcbi8qKlxuICogQG1ldGhvZCByZXNldFxuICovXG5EZXRhaWxzLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnV1aWRMaXN0Lmxlbmd0aCA9IDA7XG4gICAgdGhpcy51dWlkT2JqTGlzdC5sZW5ndGggPSAwO1xuICAgIHRoaXMudXVpZFByb3BMaXN0Lmxlbmd0aCA9IDA7XG59O1xuaWYgKENDX0VESVRPUiB8fCBDQ19URVNUKSB7XG4gICAgRGV0YWlscy5wcm90b3R5cGUuYXNzaWduQXNzZXRzQnkgPSBmdW5jdGlvbiAoZ2V0dGVyKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLnV1aWRMaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdXVpZCA9IHRoaXMudXVpZExpc3RbaV07XG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy51dWlkT2JqTGlzdFtpXTtcbiAgICAgICAgICAgIHZhciBwcm9wID0gdGhpcy51dWlkUHJvcExpc3RbaV07XG4gICAgICAgICAgICBvYmpbcHJvcF0gPSBnZXR0ZXIodXVpZCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuLy8gLyoqXG4vLyAgKiBAbWV0aG9kIGdldFV1aWRPZlxuLy8gICogQHBhcmFtIHtPYmplY3R9IG9ialxuLy8gICogQHBhcmFtIHtTdHJpbmd9IHByb3BOYW1lXG4vLyAgKiBAcmV0dXJuIHtTdHJpbmd9XG4vLyAgKi9cbi8vIERldGFpbHMucHJvdG90eXBlLmdldFV1aWRPZiA9IGZ1bmN0aW9uIChvYmosIHByb3BOYW1lKSB7XG4vLyAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnV1aWRPYmpMaXN0Lmxlbmd0aDsgaSsrKSB7XG4vLyAgICAgICAgIGlmICh0aGlzLnV1aWRPYmpMaXN0W2ldID09PSBvYmogJiYgdGhpcy51dWlkUHJvcExpc3RbaV0gPT09IHByb3BOYW1lKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy51dWlkTGlzdFtpXTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vICAgICByZXR1cm4gXCJcIjtcbi8vIH07XG4vKipcbiAqIEBtZXRob2QgcHVzaFxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BOYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gdXVpZFxuICovXG5EZXRhaWxzLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKG9iaiwgcHJvcE5hbWUsIHV1aWQpIHtcbiAgICB0aGlzLnV1aWRMaXN0LnB1c2godXVpZCk7XG4gICAgdGhpcy51dWlkT2JqTGlzdC5wdXNoKG9iaik7XG4gICAgdGhpcy51dWlkUHJvcExpc3QucHVzaChwcm9wTmFtZSk7XG59O1xuXG5EZXRhaWxzLnBvb2wgPSBuZXcganMuUG9vbChmdW5jdGlvbiAob2JqKSB7XG4gICAgb2JqLnJlc2V0KCk7XG59LCAxMCk7XG5cbkRldGFpbHMucG9vbC5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldCgpIHx8IG5ldyBEZXRhaWxzKCk7XG59O1xuXG4vLyBJTVBMRU1FTlQgT0YgREVTRVJJQUxJWkFUSU9OXG5cbnZhciBfRGVzZXJpYWxpemVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBfRGVzZXJpYWxpemVyKHJlc3VsdCwgY2xhc3NGaW5kZXIsIGN1c3RvbUVudiwgaWdub3JlRWRpdG9yT25seSkge1xuICAgICAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgdGhpcy5jdXN0b21FbnYgPSBjdXN0b21FbnY7XG4gICAgICAgIHRoaXMuZGVzZXJpYWxpemVkTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLmRlc2VyaWFsaXplZERhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLl9jbGFzc0ZpbmRlciA9IGNsYXNzRmluZGVyO1xuICAgICAgICBpZiAoQ0NfREVWKSB7XG4gICAgICAgICAgICB0aGlzLl9pZ25vcmVFZGl0b3JPbmx5ID0gaWdub3JlRWRpdG9yT25seTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pZExpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5faWRPYmpMaXN0ID0gW107XG4gICAgICAgIHRoaXMuX2lkUHJvcExpc3QgPSBbXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZGVyZWZlcmVuY2UgKHNlbGYpIHtcbiAgICAgICAgLy8g6L+Z6YeM5LiN6YeH55So6YGN5Y6G5Y+N5bqP5YiX5YyW57uT5p6c55qE5pa55byP77yM5Zug5Li65Y+N5bqP5YiX5YyW55qE57uT5p6c5aaC5p6c5byV55So5Yiw5aSN5p2C55qE5aSW6YOo5bqT77yM5b6I5a655piT5aCG5qCI5rqi5Ye644CCXG4gICAgICAgIHZhciBkZXNlcmlhbGl6ZWRMaXN0ID0gc2VsZi5kZXNlcmlhbGl6ZWRMaXN0O1xuICAgICAgICB2YXIgaWRQcm9wTGlzdCA9IHNlbGYuX2lkUHJvcExpc3Q7XG4gICAgICAgIHZhciBpZExpc3QgPSBzZWxmLl9pZExpc3Q7XG4gICAgICAgIHZhciBpZE9iakxpc3QgPSBzZWxmLl9pZE9iakxpc3Q7XG4gICAgICAgIHZhciBvbkRlcmVmZXJlbmNlZCA9IHNlbGYuX2NsYXNzRmluZGVyICYmIHNlbGYuX2NsYXNzRmluZGVyLm9uRGVyZWZlcmVuY2VkO1xuICAgICAgICB2YXIgaSwgcHJvcE5hbWUsIGlkO1xuICAgICAgICBpZiAoQ0NfRURJVE9SICYmIG9uRGVyZWZlcmVuY2VkKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaWRMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcHJvcE5hbWUgPSBpZFByb3BMaXN0W2ldO1xuICAgICAgICAgICAgICAgIGlkID0gaWRMaXN0W2ldO1xuICAgICAgICAgICAgICAgIGlkT2JqTGlzdFtpXVtwcm9wTmFtZV0gPSBkZXNlcmlhbGl6ZWRMaXN0W2lkXTtcbiAgICAgICAgICAgICAgICBvbkRlcmVmZXJlbmNlZChkZXNlcmlhbGl6ZWRMaXN0LCBpZCwgaWRPYmpMaXN0W2ldLCBwcm9wTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaWRMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcHJvcE5hbWUgPSBpZFByb3BMaXN0W2ldO1xuICAgICAgICAgICAgICAgIGlkID0gaWRMaXN0W2ldO1xuICAgICAgICAgICAgICAgIGlkT2JqTGlzdFtpXVtwcm9wTmFtZV0gPSBkZXNlcmlhbGl6ZWRMaXN0W2lkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcm90b3R5cGUgPSBfRGVzZXJpYWxpemVyLnByb3RvdHlwZTtcblxuICAgIHByb3RvdHlwZS5kZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChqc29uT2JqKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGpzb25PYmopKSB7XG4gICAgICAgICAgICB2YXIganNvbkFycmF5ID0ganNvbk9iajtcbiAgICAgICAgICAgIHZhciByZWZDb3VudCA9IGpzb25BcnJheS5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLmRlc2VyaWFsaXplZExpc3QubGVuZ3RoID0gcmVmQ291bnQ7XG4gICAgICAgICAgICAvLyBkZXNlcmlhbGl6ZVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWZDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGpzb25BcnJheVtpXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SIHx8IENDX1RFU1QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzZXJpYWxpemVkTGlzdFtpXSA9IHRoaXMuX2Rlc2VyaWFsaXplT2JqZWN0KGpzb25BcnJheVtpXSwgdGhpcy5kZXNlcmlhbGl6ZWRMaXN0LCAnJyArIGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZWRMaXN0W2ldID0gdGhpcy5fZGVzZXJpYWxpemVPYmplY3QoanNvbkFycmF5W2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGVzZXJpYWxpemVkRGF0YSA9IHJlZkNvdW50ID4gMCA/IHRoaXMuZGVzZXJpYWxpemVkTGlzdFswXSA6IFtdO1xuXG4gICAgICAgICAgICAvLy8vIGNhbGxiYWNrXG4gICAgICAgICAgICAvL2ZvciAodmFyIGogPSAwOyBqIDwgcmVmQ291bnQ7IGorKykge1xuICAgICAgICAgICAgLy8gICAgaWYgKHJlZmVyZW5jZWRMaXN0W2pdLm9uQWZ0ZXJEZXNlcmlhbGl6ZSkge1xuICAgICAgICAgICAgLy8gICAgICAgIHJlZmVyZW5jZWRMaXN0W2pdLm9uQWZ0ZXJEZXNlcmlhbGl6ZSgpO1xuICAgICAgICAgICAgLy8gICAgfVxuICAgICAgICAgICAgLy99XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlc2VyaWFsaXplZExpc3QubGVuZ3RoID0gMTtcbiAgICAgICAgICAgIGlmIChDQ19FRElUT1IgfHwgQ0NfVEVTVCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVzZXJpYWxpemVkRGF0YSA9IGpzb25PYmogPyB0aGlzLl9kZXNlcmlhbGl6ZU9iamVjdChqc29uT2JqLCB0aGlzLmRlc2VyaWFsaXplZExpc3QsICcwJykgOiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZWREYXRhID0ganNvbk9iaiA/IHRoaXMuX2Rlc2VyaWFsaXplT2JqZWN0KGpzb25PYmopIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGVzZXJpYWxpemVkTGlzdFswXSA9IHRoaXMuZGVzZXJpYWxpemVkRGF0YTtcblxuICAgICAgICAgICAgLy8vLyBjYWxsYmFja1xuICAgICAgICAgICAgLy9pZiAoZGVzZXJpYWxpemVkRGF0YS5vbkFmdGVyRGVzZXJpYWxpemUpIHtcbiAgICAgICAgICAgIC8vICAgIGRlc2VyaWFsaXplZERhdGEub25BZnRlckRlc2VyaWFsaXplKCk7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlcmVmZXJlbmNlXG4gICAgICAgIF9kZXJlZmVyZW5jZSh0aGlzKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5kZXNlcmlhbGl6ZWREYXRhO1xuICAgIH07XG5cbiAgICAvLy8qKlxuICAgIC8vICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGl6ZWQgLSBUaGUgb2JqIHRvIGRlc2VyaWFsaXplLCBtdXN0IGJlIG5vbi1uaWxcbiAgICAvLyAqIEBwYXJhbSB7T2JqZWN0fSBbb3duZXJdIC0gZGVidWcgb25seVxuICAgIC8vICogQHBhcmFtIHtTdHJpbmd9IFtwcm9wTmFtZV0gLSBkZWJ1ZyBvbmx5XG4gICAgLy8gKi9cbiAgICBwcm90b3R5cGUuX2Rlc2VyaWFsaXplT2JqZWN0ID0gZnVuY3Rpb24gKHNlcmlhbGl6ZWQsIG93bmVyLCBwcm9wTmFtZSkge1xuICAgICAgICB2YXIgcHJvcDtcbiAgICAgICAgdmFyIG9iaiA9IG51bGw7ICAgICAvLyB0aGUgb2JqIHRvIHJldHVyblxuICAgICAgICB2YXIga2xhc3MgPSBudWxsO1xuICAgICAgICB2YXIgdHlwZSA9IHNlcmlhbGl6ZWQuX190eXBlX187XG4gICAgICAgIGlmICh0eXBlID09PSAnVHlwZWRBcnJheScpIHtcbiAgICAgICAgICAgIHZhciBhcnJheSA9IHNlcmlhbGl6ZWQuYXJyYXk7XG4gICAgICAgICAgICBvYmogPSBuZXcgd2luZG93W3NlcmlhbGl6ZWQuY3Rvcl0oYXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBvYmpbaV0gPSBhcnJheVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSkge1xuXG4gICAgICAgICAgICAvLyBUeXBlIE9iamVjdCAoaW5jbHVkaW5nIENDQ2xhc3MpXG5cbiAgICAgICAgICAgIGtsYXNzID0gdGhpcy5fY2xhc3NGaW5kZXIodHlwZSwgc2VyaWFsaXplZCwgb3duZXIsIHByb3BOYW1lKTtcbiAgICAgICAgICAgIGlmICgha2xhc3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm90UmVwb3J0ZWQgPSB0aGlzLl9jbGFzc0ZpbmRlciA9PT0ganMuX2dldENsYXNzQnlJZDtcbiAgICAgICAgICAgICAgICBpZiAobm90UmVwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzZXJpYWxpemUucmVwb3J0TWlzc2luZ0NsYXNzKHR5cGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaW5zdGFudGlhdGUgYSBuZXcgb2JqZWN0XG4gICAgICAgICAgICBvYmogPSBuZXcga2xhc3MoKTtcblxuICAgICAgICAgICAgaWYgKG9iai5fZGVzZXJpYWxpemUpIHtcbiAgICAgICAgICAgICAgICBvYmouX2Rlc2VyaWFsaXplKHNlcmlhbGl6ZWQuY29udGVudCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYy5DbGFzcy5faXNDQ0NsYXNzKGtsYXNzKSkge1xuICAgICAgICAgICAgICAgIF9kZXNlcmlhbGl6ZUZpcmVDbGFzcyh0aGlzLCBvYmosIHNlcmlhbGl6ZWQsIGtsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rlc2VyaWFsaXplVHlwZWRPYmplY3Qob2JqLCBzZXJpYWxpemVkLCBrbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoICFBcnJheS5pc0FycmF5KHNlcmlhbGl6ZWQpICkge1xuXG4gICAgICAgICAgICAvLyBlbWJlZGRlZCBwcmltaXRpdmUgamF2YXNjcmlwdCBvYmplY3RcblxuICAgICAgICAgICAgb2JqID0ge307XG4gICAgICAgICAgICB0aGlzLl9kZXNlcmlhbGl6ZVByaW1pdGl2ZU9iamVjdChvYmosIHNlcmlhbGl6ZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAvLyBBcnJheVxuXG4gICAgICAgICAgICBvYmogPSBuZXcgQXJyYXkoc2VyaWFsaXplZC5sZW5ndGgpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlcmlhbGl6ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwcm9wID0gc2VyaWFsaXplZFtpXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByb3AgPT09ICdvYmplY3QnICYmIHByb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVzZXJpYWxpemVPYmpGaWVsZChvYmosIHByb3AsICcnICsgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvYmpbaV0gPSBwcm9wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH07XG5cbiAgICAvLyDlkowgX2Rlc2VyaWFsaXplT2JqZWN0IOS4jeWQjOeahOWcsOaWueWcqOS6juS8muWIpOaWrSBpZCDlkowgdXVpZFxuICAgIHByb3RvdHlwZS5fZGVzZXJpYWxpemVPYmpGaWVsZCA9IGZ1bmN0aW9uIChvYmosIGpzb25PYmosIHByb3BOYW1lKSB7XG4gICAgICAgIHZhciBpZCA9IGpzb25PYmouX19pZF9fO1xuICAgICAgICBpZiAoaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIHV1aWQgPSBqc29uT2JqLl9fdXVpZF9fO1xuICAgICAgICAgICAgaWYgKHV1aWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdC5wdXNoKG9iaiwgcHJvcE5hbWUsIHV1aWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUiB8fCBDQ19URVNUKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialtwcm9wTmFtZV0gPSB0aGlzLl9kZXNlcmlhbGl6ZU9iamVjdChqc29uT2JqLCBvYmosIHByb3BOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialtwcm9wTmFtZV0gPSB0aGlzLl9kZXNlcmlhbGl6ZU9iamVjdChqc29uT2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgZE9iaiA9IHRoaXMuZGVzZXJpYWxpemVkTGlzdFtpZF07XG4gICAgICAgICAgICBpZiAoZE9iaikge1xuICAgICAgICAgICAgICAgIG9ialtwcm9wTmFtZV0gPSBkT2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faWRMaXN0LnB1c2goaWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lkT2JqTGlzdC5wdXNoKG9iaik7XG4gICAgICAgICAgICAgICAgdGhpcy5faWRQcm9wTGlzdC5wdXNoKHByb3BOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcm90b3R5cGUuX2Rlc2VyaWFsaXplUHJpbWl0aXZlT2JqZWN0ID0gZnVuY3Rpb24gKGluc3RhbmNlLCBzZXJpYWxpemVkKSB7XG4gICAgICAgIGZvciAodmFyIHByb3BOYW1lIGluIHNlcmlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGlmIChzZXJpYWxpemVkLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wID0gc2VyaWFsaXplZFtwcm9wTmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcE5hbWUgIT09ICdfX3R5cGVfXycvKiAmJiBrICE9ICdfX2lkX18nKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlW3Byb3BOYW1lXSA9IHByb3A7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZXNlcmlhbGl6ZU9iakZpZWxkKGluc3RhbmNlLCBwcm9wLCBwcm9wTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtwcm9wTmFtZV0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gZnVuY3Rpb24gX2NvbXBpbGVUeXBlZE9iamVjdCAoYWNjZXNzb3IsIGtsYXNzLCBjdG9yQ29kZSkge1xuICAgIC8vICAgICBpZiAoa2xhc3MgPT09IGNjLlZlYzIpIHtcbiAgICAvLyAgICAgICAgIHJldHVybiBge2AgK1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgYG8ke2FjY2Vzc29yfS54PXByb3AueHx8MDtgICtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGBvJHthY2Nlc3Nvcn0ueT1wcm9wLnl8fDA7YCArXG4gICAgLy8gICAgICAgICAgICAgICAgYH1gO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGVsc2UgaWYgKGtsYXNzID09PSBjYy5Db2xvcikge1xuICAgIC8vICAgICAgICAgcmV0dXJuIGB7YCArXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIGBvJHthY2Nlc3Nvcn0ucj1wcm9wLnJ8fDA7YCArXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIGBvJHthY2Nlc3Nvcn0uZz1wcm9wLmd8fDA7YCArXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIGBvJHthY2Nlc3Nvcn0uYj1wcm9wLmJ8fDA7YCArXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIGBvJHthY2Nlc3Nvcn0uYT0ocHJvcC5hPT09dW5kZWZpbmVkPzI1NTpwcm9wLmEpO2AgK1xuICAgIC8vICAgICAgICAgICAgICAgIGB9YDtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBlbHNlIGlmIChrbGFzcyA9PT0gY2MuU2l6ZSkge1xuICAgIC8vICAgICAgICAgcmV0dXJuIGB7YCArXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIGBvJHthY2Nlc3Nvcn0ud2lkdGg9cHJvcC53aWR0aHx8MDtgICtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgYG8ke2FjY2Vzc29yfS5oZWlnaHQ9cHJvcC5oZWlnaHR8fDA7YCArXG4gICAgLy8gICAgICAgICAgICAgICAgYH1gO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGVsc2Uge1xuICAgIC8vICAgICAgICAgcmV0dXJuIGBzLl9kZXNlcmlhbGl6ZVR5cGVkT2JqZWN0KG8ke2FjY2Vzc29yfSxwcm9wLCR7Y3RvckNvZGV9KTtgO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgLy8gZGVzZXJpYWxpemUgVmFsdWVUeXBlXG4gICAgcHJvdG90eXBlLl9kZXNlcmlhbGl6ZVR5cGVkT2JqZWN0ID0gZnVuY3Rpb24gKGluc3RhbmNlLCBzZXJpYWxpemVkLCBrbGFzcykge1xuICAgICAgICBpZiAoa2xhc3MgPT09IGNjLlZlYzIpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnggPSBzZXJpYWxpemVkLnggfHwgMDtcbiAgICAgICAgICAgIGluc3RhbmNlLnkgPSBzZXJpYWxpemVkLnkgfHwgMDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrbGFzcyA9PT0gY2MuVmVjMykge1xuICAgICAgICAgICAgaW5zdGFuY2UueCA9IHNlcmlhbGl6ZWQueCB8fCAwO1xuICAgICAgICAgICAgaW5zdGFuY2UueSA9IHNlcmlhbGl6ZWQueSB8fCAwO1xuICAgICAgICAgICAgaW5zdGFuY2UueiA9IHNlcmlhbGl6ZWQueiB8fCAwO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtsYXNzID09PSBjYy5Db2xvcikge1xuICAgICAgICAgICAgaW5zdGFuY2UuciA9IHNlcmlhbGl6ZWQuciB8fCAwO1xuICAgICAgICAgICAgaW5zdGFuY2UuZyA9IHNlcmlhbGl6ZWQuZyB8fCAwO1xuICAgICAgICAgICAgaW5zdGFuY2UuYiA9IHNlcmlhbGl6ZWQuYiB8fCAwO1xuICAgICAgICAgICAgdmFyIGEgPSBzZXJpYWxpemVkLmE7XG4gICAgICAgICAgICBpbnN0YW5jZS5hID0gKGEgPT09IHVuZGVmaW5lZCA/IDI1NSA6IGEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtsYXNzID09PSBjYy5TaXplKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS53aWR0aCA9IHNlcmlhbGl6ZWQud2lkdGggfHwgMDtcbiAgICAgICAgICAgIGluc3RhbmNlLmhlaWdodCA9IHNlcmlhbGl6ZWQuaGVpZ2h0IHx8IDA7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgREVGQVVMVCA9IEF0dHIuREVMSU1FVEVSICsgJ2RlZmF1bHQnO1xuICAgICAgICB2YXIgYXR0cnMgPSBBdHRyLmdldENsYXNzQXR0cnMoa2xhc3MpO1xuICAgICAgICB2YXIgZmFzdERlZmluZWRQcm9wcyA9IGtsYXNzLl9fcHJvcHNfXyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGluc3RhbmNlKTsgICAgLy8g6YGN5Y6GIGluc3RhbmNl77yM5aaC5p6c5YW35pyJ57G75Z6L77yM5omN5LiN5Lya5oqKIF9fdHlwZV9fIOS5n+ivu+i/m+adpVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZhc3REZWZpbmVkUHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwcm9wTmFtZSA9IGZhc3REZWZpbmVkUHJvcHNbaV07XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBzZXJpYWxpemVkW3Byb3BOYW1lXTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8ICFzZXJpYWxpemVkLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICAgICAgICAgIC8vIG5vdCBzZXJpYWxpemVkLFxuICAgICAgICAgICAgICAgIC8vIHJlY292ZXIgdG8gZGVmYXVsdCB2YWx1ZSBpbiBWYWx1ZVR5cGUsIGJlY2F1c2UgZWxpbWluYXRlZCBwcm9wZXJ0aWVzIGVxdWFscyB0b1xuICAgICAgICAgICAgICAgIC8vIGl0cyBkZWZhdWx0IHZhbHVlIGluIFZhbHVlVHlwZSwgbm90IGRlZmF1bHQgdmFsdWUgaW4gdXNlciBjbGFzc1xuICAgICAgICAgICAgICAgIHZhbHVlID0gQ0NDbGFzcy5nZXREZWZhdWx0KGF0dHJzW3Byb3BOYW1lICsgREVGQVVMVF0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlW3Byb3BOYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXNlcmlhbGl6ZU9iakZpZWxkKGluc3RhbmNlLCB2YWx1ZSwgcHJvcE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VbcHJvcE5hbWVdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjb21waWxlT2JqZWN0VHlwZUppdCAoc291cmNlcywgZGVmYXVsdFZhbHVlLCBhY2Nlc3NvclRvU2V0LCBwcm9wTmFtZUxpdGVyYWxUb1NldCwgYXNzdW1lSGF2ZVByb3BJZklzVmFsdWUpIHtcbiAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSBpbnN0YW5jZW9mIGNjLlZhbHVlVHlwZSkge1xuICAgICAgICAgICAgLy8gZmFzdCBjYXNlXG4gICAgICAgICAgICBpZiAoIWFzc3VtZUhhdmVQcm9wSWZJc1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc291cmNlcy5wdXNoKCdpZihwcm9wKXsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjdG9yQ29kZSA9IGpzLmdldENsYXNzTmFtZShkZWZhdWx0VmFsdWUpO1xuICAgICAgICAgICAgc291cmNlcy5wdXNoKGBzLl9kZXNlcmlhbGl6ZVR5cGVkT2JqZWN0KG8ke2FjY2Vzc29yVG9TZXR9LHByb3AsJHtjdG9yQ29kZX0pO2ApO1xuICAgICAgICAgICAgaWYgKCFhc3N1bWVIYXZlUHJvcElmSXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHNvdXJjZXMucHVzaCgnfWVsc2UgbycgKyBhY2Nlc3NvclRvU2V0ICsgJz1udWxsOycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc291cmNlcy5wdXNoKCdpZihwcm9wKXsnKTtcbiAgICAgICAgICAgICAgICBzb3VyY2VzLnB1c2goJ3MuX2Rlc2VyaWFsaXplT2JqRmllbGQobyxwcm9wLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcE5hbWVMaXRlcmFsVG9TZXQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnKTsnKTtcbiAgICAgICAgICAgIHNvdXJjZXMucHVzaCgnfWVsc2UgbycgKyBhY2Nlc3NvclRvU2V0ICsgJz1udWxsOycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNvbXBpbGVEZXNlcmlhbGl6ZSA9IENDX1NVUFBPUlRfSklUID8gZnVuY3Rpb24gKHNlbGYsIGtsYXNzKSB7XG4gICAgICAgIHZhciBUWVBFID0gQXR0ci5ERUxJTUVURVIgKyAndHlwZSc7XG4gICAgICAgIHZhciBFRElUT1JfT05MWSA9IEF0dHIuREVMSU1FVEVSICsgJ2VkaXRvck9ubHknO1xuICAgICAgICB2YXIgREVGQVVMVCA9IEF0dHIuREVMSU1FVEVSICsgJ2RlZmF1bHQnO1xuICAgICAgICB2YXIgRk9STUVSTFlfU0VSSUFMSVpFRF9BUyA9IEF0dHIuREVMSU1FVEVSICsgJ2Zvcm1lcmx5U2VyaWFsaXplZEFzJztcbiAgICAgICAgdmFyIGF0dHJzID0gQXR0ci5nZXRDbGFzc0F0dHJzKGtsYXNzKTtcblxuICAgICAgICB2YXIgcHJvcHMgPSBrbGFzcy5fX3ZhbHVlc19fO1xuICAgICAgICAvLyBzZWxmLCBvYmosIHNlcmlhbGl6ZWREYXRhLCBrbGFzc1xuICAgICAgICB2YXIgc291cmNlcyA9IFtcbiAgICAgICAgICAgICd2YXIgcHJvcDsnXG4gICAgICAgIF07XG4gICAgICAgIHZhciBmYXN0TW9kZSA9IG1pc2MuQlVJTFRJTl9DTEFTU0lEX1JFLnRlc3QoanMuX2dldENsYXNzSWQoa2xhc3MpKTtcbiAgICAgICAgLy8gc291cmNlcy5wdXNoKCd2YXIgdmIsdm4sdnMsdm8sdnUsdmY7Jyk7ICAgIC8vIGJvb2xlYW4sIG51bWJlciwgc3RyaW5nLCBvYmplY3QsIHVuZGVmaW5lZCwgZnVuY3Rpb25cbiAgICAgICAgZm9yICh2YXIgcCA9IDA7IHAgPCBwcm9wcy5sZW5ndGg7IHArKykge1xuICAgICAgICAgICAgdmFyIHByb3BOYW1lID0gcHJvcHNbcF07XG4gICAgICAgICAgICBpZiAoKENDX1BSRVZJRVcgfHwgKENDX0VESVRPUiAmJiBzZWxmLl9pZ25vcmVFZGl0b3JPbmx5KSkgJiYgYXR0cnNbcHJvcE5hbWUgKyBFRElUT1JfT05MWV0pIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTsgICAvLyBza2lwIGVkaXRvciBvbmx5IGlmIGluIHByZXZpZXdcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFjY2Vzc29yVG9TZXQsIHByb3BOYW1lTGl0ZXJhbFRvU2V0O1xuICAgICAgICAgICAgaWYgKENDQ2xhc3MuSURFTlRJRklFUl9SRS50ZXN0KHByb3BOYW1lKSkge1xuICAgICAgICAgICAgICAgIHByb3BOYW1lTGl0ZXJhbFRvU2V0ID0gJ1wiJyArIHByb3BOYW1lICsgJ1wiJztcbiAgICAgICAgICAgICAgICBhY2Nlc3NvclRvU2V0ID0gJy4nICsgcHJvcE5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9wTmFtZUxpdGVyYWxUb1NldCA9IENDQ2xhc3MuZXNjYXBlRm9ySlMocHJvcE5hbWUpO1xuICAgICAgICAgICAgICAgIGFjY2Vzc29yVG9TZXQgPSAnWycgKyBwcm9wTmFtZUxpdGVyYWxUb1NldCArICddJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFjY2Vzc29yVG9HZXQgPSBhY2Nlc3NvclRvU2V0O1xuICAgICAgICAgICAgaWYgKGF0dHJzW3Byb3BOYW1lICsgRk9STUVSTFlfU0VSSUFMSVpFRF9BU10pIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcE5hbWVUb1JlYWQgPSBhdHRyc1twcm9wTmFtZSArIEZPUk1FUkxZX1NFUklBTElaRURfQVNdO1xuICAgICAgICAgICAgICAgIGlmIChDQ0NsYXNzLklERU5USUZJRVJfUkUudGVzdChwcm9wTmFtZVRvUmVhZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3JUb0dldCA9ICcuJyArIHByb3BOYW1lVG9SZWFkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3JUb0dldCA9ICdbJyArIENDQ2xhc3MuZXNjYXBlRm9ySlMocHJvcE5hbWVUb1JlYWQpICsgJ10nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc291cmNlcy5wdXNoKCdwcm9wPWQnICsgYWNjZXNzb3JUb0dldCArICc7Jyk7XG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goYGlmKHR5cGVvZiAke0NDX0pTQiB8fCBDQ19SVU5USU1FID8gJyhwcm9wKScgOiAncHJvcCd9IT09XCJ1bmRlZmluZWRcIil7YCk7XG5cbiAgICAgICAgICAgIC8vIGZ1bmN0aW9uIHVuZGVmaW5lZCBvYmplY3QobnVsbCkgc3RyaW5nIGJvb2xlYW4gbnVtYmVyXG4gICAgICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0gQ0NDbGFzcy5nZXREZWZhdWx0KGF0dHJzW3Byb3BOYW1lICsgREVGQVVMVF0pO1xuICAgICAgICAgICAgaWYgKGZhc3RNb2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlzUHJpbWl0aXZlVHlwZTtcbiAgICAgICAgICAgICAgICB2YXIgdXNlclR5cGUgPSBhdHRyc1twcm9wTmFtZSArIFRZUEVdO1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0VmFsdWUgPT09IHVuZGVmaW5lZCAmJiB1c2VyVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBpc1ByaW1pdGl2ZVR5cGUgPSB1c2VyVHlwZSBpbnN0YW5jZW9mIEF0dHIuUHJpbWl0aXZlVHlwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWZhdWx0VHlwZSA9IHR5cGVvZiBkZWZhdWx0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlzUHJpbWl0aXZlVHlwZSA9IGRlZmF1bHRUeXBlID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VHlwZSA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFR5cGUgPT09ICdib29sZWFuJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNQcmltaXRpdmVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXMucHVzaChgbyR7YWNjZXNzb3JUb1NldH09cHJvcDtgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBpbGVPYmplY3RUeXBlSml0KHNvdXJjZXMsIGRlZmF1bHRWYWx1ZSwgYWNjZXNzb3JUb1NldCwgcHJvcE5hbWVMaXRlcmFsVG9TZXQsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNvdXJjZXMucHVzaChgaWYodHlwZW9mICR7Q0NfSlNCIHx8IENDX1JVTlRJTUUgPyAnKHByb3ApJyA6ICdwcm9wJ30hPT1cIm9iamVjdFwiKXtgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvJyArIGFjY2Vzc29yVG9TZXQgKyAnPXByb3A7JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9ZWxzZXsnKTtcbiAgICAgICAgICAgICAgICBjb21waWxlT2JqZWN0VHlwZUppdChzb3VyY2VzLCBkZWZhdWx0VmFsdWUsIGFjY2Vzc29yVG9TZXQsIHByb3BOYW1lTGl0ZXJhbFRvU2V0LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgc291cmNlcy5wdXNoKCd9Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goJ30nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2MuanMuaXNDaGlsZENsYXNzT2Yoa2xhc3MsIGNjLl9CYXNlTm9kZSkgfHwgY2MuanMuaXNDaGlsZENsYXNzT2Yoa2xhc3MsIGNjLkNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIGlmIChDQ19QUkVWSUVXIHx8IChDQ19FRElUT1IgJiYgc2VsZi5faWdub3JlRWRpdG9yT25seSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF5VXNlZEluUGVyc2lzdFJvb3QgPSBqcy5pc0NoaWxkQ2xhc3NPZihrbGFzcywgY2MuTm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKG1heVVzZWRJblBlcnNpc3RSb290KSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXMucHVzaCgnZC5faWQmJihvLl9pZD1kLl9pZCk7Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc291cmNlcy5wdXNoKCdkLl9pZCYmKG8uX2lkPWQuX2lkKTsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHNbcHJvcHMubGVuZ3RoIC0gMV0gPT09ICdfJGVyaWFsaXplZCcpIHtcbiAgICAgICAgICAgIC8vIGRlZXAgY29weSBvcmlnaW5hbCBzZXJpYWxpemVkIGRhdGFcbiAgICAgICAgICAgIHNvdXJjZXMucHVzaCgnby5fJGVyaWFsaXplZD1KU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGQpKTsnKTtcbiAgICAgICAgICAgIC8vIHBhcnNlIHRoZSBzZXJpYWxpemVkIGRhdGEgYXMgcHJpbWl0aXZlIGphdmFzY3JpcHQgb2JqZWN0LCBzbyBpdHMgX19pZF9fIHdpbGwgYmUgZGVyZWZlcmVuY2VkXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goJ3MuX2Rlc2VyaWFsaXplUHJpbWl0aXZlT2JqZWN0KG8uXyRlcmlhbGl6ZWQsZCk7Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEZ1bmN0aW9uKCdzJywgJ28nLCAnZCcsICdrJywgc291cmNlcy5qb2luKCcnKSk7XG4gICAgfSA6IGZ1bmN0aW9uIChzZWxmLCBrbGFzcykge1xuICAgICAgICB2YXIgZmFzdE1vZGUgPSBtaXNjLkJVSUxUSU5fQ0xBU1NJRF9SRS50ZXN0KGpzLl9nZXRDbGFzc0lkKGtsYXNzKSk7XG4gICAgICAgIHZhciBzaG91bGRDb3B5SWQgPSBjYy5qcy5pc0NoaWxkQ2xhc3NPZihrbGFzcywgY2MuX0Jhc2VOb2RlKSB8fCBjYy5qcy5pc0NoaWxkQ2xhc3NPZihrbGFzcywgY2MuQ29tcG9uZW50KTtcbiAgICAgICAgdmFyIHNob3VsZENvcHlSYXdEYXRhO1xuXG4gICAgICAgIHZhciBzaW1wbGVQcm9wcyA9IFtdO1xuICAgICAgICB2YXIgc2ltcGxlUHJvcHNUb1JlYWQgPSBzaW1wbGVQcm9wcztcbiAgICAgICAgdmFyIGFkdmFuY2VkUHJvcHMgPSBbXTtcbiAgICAgICAgdmFyIGFkdmFuY2VkUHJvcHNUb1JlYWQgPSBhZHZhbmNlZFByb3BzO1xuICAgICAgICB2YXIgYWR2YW5jZWRQcm9wc1ZhbHVlVHlwZSA9IFtdO1xuXG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcHJvcHMgPSBrbGFzcy5fX3ZhbHVlc19fO1xuICAgICAgICAgICAgc2hvdWxkQ29weVJhd0RhdGEgPSBwcm9wc1twcm9wcy5sZW5ndGggLSAxXSA9PT0gJ18kZXJpYWxpemVkJztcblxuICAgICAgICAgICAgdmFyIGF0dHJzID0gQXR0ci5nZXRDbGFzc0F0dHJzKGtsYXNzKTtcbiAgICAgICAgICAgIHZhciBUWVBFID0gQXR0ci5ERUxJTUVURVIgKyAndHlwZSc7XG4gICAgICAgICAgICB2YXIgREVGQVVMVCA9IEF0dHIuREVMSU1FVEVSICsgJ2RlZmF1bHQnO1xuICAgICAgICAgICAgdmFyIEZPUk1FUkxZX1NFUklBTElaRURfQVMgPSBBdHRyLkRFTElNRVRFUiArICdmb3JtZXJseVNlcmlhbGl6ZWRBcyc7XG5cbiAgICAgICAgICAgIGZvciAodmFyIHAgPSAwOyBwIDwgcHJvcHMubGVuZ3RoOyBwKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcE5hbWUgPSBwcm9wc1twXTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcE5hbWVUb1JlYWQgPSBwcm9wTmFtZTtcbiAgICAgICAgICAgICAgICBpZiAoYXR0cnNbcHJvcE5hbWUgKyBGT1JNRVJMWV9TRVJJQUxJWkVEX0FTXSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9wTmFtZVRvUmVhZCA9IGF0dHJzW3Byb3BOYW1lICsgRk9STUVSTFlfU0VSSUFMSVpFRF9BU107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIHVuZGVmaW5lZCBvYmplY3QobnVsbCkgc3RyaW5nIGJvb2xlYW4gbnVtYmVyXG4gICAgICAgICAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IENDQ2xhc3MuZ2V0RGVmYXVsdChhdHRyc1twcm9wTmFtZSArIERFRkFVTFRdKTtcbiAgICAgICAgICAgICAgICB2YXIgaXNQcmltaXRpdmVUeXBlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGZhc3RNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB1c2VyVHlwZSA9IGF0dHJzW3Byb3BOYW1lICsgVFlQRV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0VmFsdWUgPT09IHVuZGVmaW5lZCAmJiB1c2VyVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNQcmltaXRpdmVUeXBlID0gdXNlclR5cGUgaW5zdGFuY2VvZiBBdHRyLlByaW1pdGl2ZVR5cGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVmYXVsdFR5cGUgPSB0eXBlb2YgZGVmYXVsdFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNQcmltaXRpdmVUeXBlID0gZGVmYXVsdFR5cGUgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VHlwZSA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUeXBlID09PSAnYm9vbGVhbic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZhc3RNb2RlICYmIGlzUHJpbWl0aXZlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcE5hbWVUb1JlYWQgIT09IHByb3BOYW1lICYmIHNpbXBsZVByb3BzVG9SZWFkID09PSBzaW1wbGVQcm9wcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2ltcGxlUHJvcHNUb1JlYWQgPSBzaW1wbGVQcm9wcy5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNpbXBsZVByb3BzLnB1c2gocHJvcE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2ltcGxlUHJvcHNUb1JlYWQgIT09IHNpbXBsZVByb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaW1wbGVQcm9wc1RvUmVhZC5wdXNoKHByb3BOYW1lVG9SZWFkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BOYW1lVG9SZWFkICE9PSBwcm9wTmFtZSAmJiBhZHZhbmNlZFByb3BzVG9SZWFkID09PSBhZHZhbmNlZFByb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlZFByb3BzVG9SZWFkID0gYWR2YW5jZWRQcm9wcy5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFkdmFuY2VkUHJvcHMucHVzaChwcm9wTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhZHZhbmNlZFByb3BzVG9SZWFkICE9PSBhZHZhbmNlZFByb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZHZhbmNlZFByb3BzVG9SZWFkLnB1c2gocHJvcE5hbWVUb1JlYWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFkdmFuY2VkUHJvcHNWYWx1ZVR5cGUucHVzaCgoZGVmYXVsdFZhbHVlIGluc3RhbmNlb2YgY2MuVmFsdWVUeXBlKSAmJiBkZWZhdWx0VmFsdWUuY29uc3RydWN0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHMsIG8sIGQsIGspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2ltcGxlUHJvcHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJvcCA9IGRbc2ltcGxlUHJvcHNUb1JlYWRbaV1dO1xuICAgICAgICAgICAgICAgIGlmIChwcm9wICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb1tzaW1wbGVQcm9wc1tpXV0gPSBwcm9wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWR2YW5jZWRQcm9wcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCBwcm9wTmFtZSA9IGFkdmFuY2VkUHJvcHNbaV07XG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBkW2FkdmFuY2VkUHJvcHNUb1JlYWRbaV1dO1xuICAgICAgICAgICAgICAgIGlmIChwcm9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZmFzdE1vZGUgJiYgdHlwZW9mIHByb3AgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9bcHJvcE5hbWVdID0gcHJvcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZhc3RNb2RlIChzbyB3aWxsIG5vdCBzaW1wbGVQcm9wKSBvciBvYmplY3RcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlVHlwZUN0b3IgPSBhZHZhbmNlZFByb3BzVmFsdWVUeXBlW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVUeXBlQ3Rvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZhc3RNb2RlIHx8IHByb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLl9kZXNlcmlhbGl6ZVR5cGVkT2JqZWN0KG9bcHJvcE5hbWVdLCBwcm9wLCB2YWx1ZVR5cGVDdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bcHJvcE5hbWVdID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5fZGVzZXJpYWxpemVPYmpGaWVsZChvLCBwcm9wLCBwcm9wTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvW3Byb3BOYW1lXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2hvdWxkQ29weUlkICYmIGQuX2lkKSB7XG4gICAgICAgICAgICAgICAgby5faWQgPSBkLl9pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaG91bGRDb3B5UmF3RGF0YSkge1xuICAgICAgICAgICAgICAgIC8vIGRlZXAgY29weSBvcmlnaW5hbCBzZXJpYWxpemVkIGRhdGFcbiAgICAgICAgICAgICAgICBvLl8kZXJpYWxpemVkID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkKSk7XG4gICAgICAgICAgICAgICAgLy8gcGFyc2UgdGhlIHNlcmlhbGl6ZWQgZGF0YSBhcyBwcmltaXRpdmUgamF2YXNjcmlwdCBvYmplY3QsIHNvIGl0cyBfX2lkX18gd2lsbCBiZSBkZXJlZmVyZW5jZWRcbiAgICAgICAgICAgICAgICBzLl9kZXNlcmlhbGl6ZVByaW1pdGl2ZU9iamVjdChvLl8kZXJpYWxpemVkLCBkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1bmxpbmtVbnVzZWRQcmVmYWIgKHNlbGYsIHNlcmlhbGl6ZWQsIG9iaikge1xuICAgICAgICB2YXIgdXVpZCA9IHNlcmlhbGl6ZWRbJ2Fzc2V0J10gJiYgc2VyaWFsaXplZFsnYXNzZXQnXS5fX3V1aWRfXztcbiAgICAgICAgaWYgKHV1aWQpIHtcbiAgICAgICAgICAgIHZhciBsYXN0ID0gc2VsZi5yZXN1bHQudXVpZExpc3QubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGlmIChzZWxmLnJlc3VsdC51dWlkTGlzdFtsYXN0XSA9PT0gdXVpZCAmJlxuICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0LnV1aWRPYmpMaXN0W2xhc3RdID09PSBvYmogJiZcbiAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdC51dWlkUHJvcExpc3RbbGFzdF0gPT09ICdhc3NldCcpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdC51dWlkTGlzdC5wb3AoKTtcbiAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdC51dWlkT2JqTGlzdC5wb3AoKTtcbiAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdC51dWlkUHJvcExpc3QucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVidWdFbnZPbmx5SW5mbyA9ICdGYWlsZWQgdG8gc2tpcCBwcmVmYWIgYXNzZXQgd2hpbGUgZGVzZXJpYWxpemluZyBQcmVmYWJJbmZvJztcbiAgICAgICAgICAgICAgICBjYy53YXJuKGRlYnVnRW52T25seUluZm8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2Rlc2VyaWFsaXplRmlyZUNsYXNzIChzZWxmLCBvYmosIHNlcmlhbGl6ZWQsIGtsYXNzKSB7XG4gICAgICAgIHZhciBkZXNlcmlhbGl6ZTtcbiAgICAgICAgaWYgKGtsYXNzLmhhc093blByb3BlcnR5KCdfX2Rlc2VyaWFsaXplX18nKSkge1xuICAgICAgICAgICAgZGVzZXJpYWxpemUgPSBrbGFzcy5fX2Rlc2VyaWFsaXplX187XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZXNlcmlhbGl6ZSA9IGNvbXBpbGVEZXNlcmlhbGl6ZShzZWxmLCBrbGFzcyk7XG4gICAgICAgICAgICAvLyBpZiAoQ0NfVEVTVCAmJiAhaXNQaGFudG9tSlMpIHtcbiAgICAgICAgICAgIC8vICAgICBjYy5sb2coZGVzZXJpYWxpemUpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAganMudmFsdWUoa2xhc3MsICdfX2Rlc2VyaWFsaXplX18nLCBkZXNlcmlhbGl6ZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZGVzZXJpYWxpemUoc2VsZiwgb2JqLCBzZXJpYWxpemVkLCBrbGFzcyk7XG4gICAgICAgIC8vIGlmIHByZXZpZXcgb3IgYnVpbGQgd29ya2VyXG4gICAgICAgIGlmIChDQ19QUkVWSUVXIHx8IChDQ19FRElUT1IgJiYgc2VsZi5faWdub3JlRWRpdG9yT25seSkpIHtcbiAgICAgICAgICAgIGlmIChrbGFzcyA9PT0gY2MuX1ByZWZhYkluZm8gJiYgIW9iai5zeW5jKSB7XG4gICAgICAgICAgICAgICAgdW5saW5rVW51c2VkUHJlZmFiKHNlbGYsIHNlcmlhbGl6ZWQsIG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfRGVzZXJpYWxpemVyLnBvb2wgPSBuZXcganMuUG9vbChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIG9iai5yZXN1bHQgPSBudWxsO1xuICAgICAgICBvYmouY3VzdG9tRW52ID0gbnVsbDtcbiAgICAgICAgb2JqLmRlc2VyaWFsaXplZExpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgb2JqLmRlc2VyaWFsaXplZERhdGEgPSBudWxsO1xuICAgICAgICBvYmouX2NsYXNzRmluZGVyID0gbnVsbDtcbiAgICAgICAgb2JqLl9pZExpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgb2JqLl9pZE9iakxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgb2JqLl9pZFByb3BMaXN0Lmxlbmd0aCA9IDA7XG4gICAgfSwgMSk7XG5cbiAgICBfRGVzZXJpYWxpemVyLnBvb2wuZ2V0ID0gZnVuY3Rpb24gKHJlc3VsdCwgY2xhc3NGaW5kZXIsIGN1c3RvbUVudiwgaWdub3JlRWRpdG9yT25seSkge1xuICAgICAgICB2YXIgY2FjaGUgPSB0aGlzLl9nZXQoKTtcbiAgICAgICAgaWYgKGNhY2hlKSB7XG4gICAgICAgICAgICBjYWNoZS5yZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgICBjYWNoZS5jdXN0b21FbnYgPSBjdXN0b21FbnY7XG4gICAgICAgICAgICBjYWNoZS5fY2xhc3NGaW5kZXIgPSBjbGFzc0ZpbmRlcjtcbiAgICAgICAgICAgIGlmIChDQ19ERVYpIHtcbiAgICAgICAgICAgICAgICBjYWNoZS5faWdub3JlRWRpdG9yT25seSA9IGlnbm9yZUVkaXRvck9ubHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2FjaGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IF9EZXNlcmlhbGl6ZXIocmVzdWx0LCBjbGFzc0ZpbmRlciwgY3VzdG9tRW52LCBpZ25vcmVFZGl0b3JPbmx5KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gX0Rlc2VyaWFsaXplcjtcbn0pKCk7XG5cbi8qKlxuICogQG1vZHVsZSBjY1xuICovXG5cbi8qKlxuICogISNlbiBEZXNlcmlhbGl6ZSBqc29uIHRvIGNjLkFzc2V0XG4gKiAhI3poIOWwhiBKU09OIOWPjeW6j+WIl+WMluS4uuWvueixoeWunuS+i+OAglxuICpcbiAqIEBtZXRob2QgZGVzZXJpYWxpemVcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZGF0YSAtIHRoZSBzZXJpYWxpemVkIGNjLkFzc2V0IGpzb24gc3RyaW5nIG9yIGpzb24gb2JqZWN0LlxuICogQHBhcmFtIHtEZXRhaWxzfSBbZGV0YWlsc10gLSBhZGRpdGlvbmFsIGxvYWRpbmcgcmVzdWx0XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAcmV0dXJuIHtvYmplY3R9IHRoZSBtYWluIGRhdGEoYXNzZXQpXG4gKi9cbmxldCBkZXNlcmlhbGl6ZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRhdGEsIGRldGFpbHMsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgY2xhc3NGaW5kZXIgPSBvcHRpb25zLmNsYXNzRmluZGVyIHx8IGpzLl9nZXRDbGFzc0J5SWQ7XG4gICAgLy8g5ZCv55SoIGNyZWF0ZUFzc2V0UmVmcyDlkI7vvIzlpoLmnpzmnIkgdXJsIOWxnuaAp+WImeS8muiiq+e7n+S4gOW8uuWItuiuvue9ruS4uiB7IHV1aWQ6ICd4eHgnIH3vvIzlv4XpobvlkI7pnaLlho3nibnmrorlpITnkIZcbiAgICB2YXIgY3JlYXRlQXNzZXRSZWZzID0gb3B0aW9ucy5jcmVhdGVBc3NldFJlZnMgfHwgY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuRURJVE9SX0NPUkU7XG4gICAgdmFyIGN1c3RvbUVudiA9IG9wdGlvbnMuY3VzdG9tRW52O1xuICAgIHZhciBpZ25vcmVFZGl0b3JPbmx5ID0gb3B0aW9ucy5pZ25vcmVFZGl0b3JPbmx5O1xuXG4gICAgLy92YXIgb2xkSnNvbiA9IEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpO1xuXG4gICAgdmFyIHRlbXBEZXRhaWxzID0gIWRldGFpbHM7XG4gICAgZGV0YWlscyA9IGRldGFpbHMgfHwgRGV0YWlscy5wb29sLmdldCgpO1xuICAgIHZhciBkZXNlcmlhbGl6ZXIgPSBfRGVzZXJpYWxpemVyLnBvb2wuZ2V0KGRldGFpbHMsIGNsYXNzRmluZGVyLCBjdXN0b21FbnYsIGlnbm9yZUVkaXRvck9ubHkpO1xuXG4gICAgY2MuZ2FtZS5faXNDbG9uaW5nID0gdHJ1ZTtcbiAgICB2YXIgcmVzID0gZGVzZXJpYWxpemVyLmRlc2VyaWFsaXplKGRhdGEpO1xuICAgIGNjLmdhbWUuX2lzQ2xvbmluZyA9IGZhbHNlO1xuXG4gICAgX0Rlc2VyaWFsaXplci5wb29sLnB1dChkZXNlcmlhbGl6ZXIpO1xuICAgIGlmIChjcmVhdGVBc3NldFJlZnMpIHtcbiAgICAgICAgZGV0YWlscy5hc3NpZ25Bc3NldHNCeShFZGl0b3Iuc2VyaWFsaXplLmFzQXNzZXQpO1xuICAgIH1cbiAgICBpZiAodGVtcERldGFpbHMpIHtcbiAgICAgICAgRGV0YWlscy5wb29sLnB1dChkZXRhaWxzKTtcbiAgICB9XG5cbiAgICAvL3ZhciBhZnRlckpzb24gPSBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKTtcbiAgICAvL2lmIChvbGRKc29uICE9PSBhZnRlckpzb24pIHtcbiAgICAvLyAgICB0aHJvdyBuZXcgRXJyb3IoJ0pTT04gU0hPVUxEIG5vdCBjaGFuZ2VkJyk7XG4gICAgLy99XG5cbiAgICByZXR1cm4gcmVzO1xufTtcblxuZGVzZXJpYWxpemUuRGV0YWlscyA9IERldGFpbHM7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==