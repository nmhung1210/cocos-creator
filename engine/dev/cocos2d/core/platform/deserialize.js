
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/deserialize.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

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

var misc = require('../utils/misc'); // HELPERS

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
          cc.deserialize.reportMissingClass(type);
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


cc.deserialize = function (data, details, options) {
  options = options || {};
  var classFinder = options.classFinder || js._getClassById;
  var createAssetRefs = options.createAssetRefs || cc.sys.platform === cc.sys.EDITOR_CORE;
  var customEnv = options.customEnv;
  var ignoreEditorOnly = options.ignoreEditorOnly;

  if (CC_EDITOR && Buffer.isBuffer(data)) {
    data = data.toString();
  }

  if (typeof data === 'string') {
    data = JSON.parse(data);
  } //var oldJson = JSON.stringify(data, null, 2);


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

cc.deserialize.Details = Details;

cc.deserialize.reportMissingClass = function (id) {
  if (CC_EDITOR && Editor.Utils.UuidUtils.isUuid(id)) {
    id = Editor.Utils.UuidUtils.decompressUuid(id);
    cc.warnID(5301, id);
  } else {
    cc.warnID(5302, id);
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL2Rlc2VyaWFsaXplLmpzIl0sIm5hbWVzIjpbImpzIiwicmVxdWlyZSIsIkF0dHIiLCJDQ0NsYXNzIiwibWlzYyIsIkRldGFpbHMiLCJ1dWlkTGlzdCIsInV1aWRPYmpMaXN0IiwidXVpZFByb3BMaXN0IiwicHJvdG90eXBlIiwicmVzZXQiLCJsZW5ndGgiLCJDQ19FRElUT1IiLCJDQ19URVNUIiwiYXNzaWduQXNzZXRzQnkiLCJnZXR0ZXIiLCJpIiwibGVuIiwidXVpZCIsIm9iaiIsInByb3AiLCJwdXNoIiwicHJvcE5hbWUiLCJwb29sIiwiUG9vbCIsImdldCIsIl9nZXQiLCJfRGVzZXJpYWxpemVyIiwicmVzdWx0IiwiY2xhc3NGaW5kZXIiLCJjdXN0b21FbnYiLCJpZ25vcmVFZGl0b3JPbmx5IiwiZGVzZXJpYWxpemVkTGlzdCIsImRlc2VyaWFsaXplZERhdGEiLCJfY2xhc3NGaW5kZXIiLCJDQ19ERVYiLCJfaWdub3JlRWRpdG9yT25seSIsIl9pZExpc3QiLCJfaWRPYmpMaXN0IiwiX2lkUHJvcExpc3QiLCJfZGVyZWZlcmVuY2UiLCJzZWxmIiwiaWRQcm9wTGlzdCIsImlkTGlzdCIsImlkT2JqTGlzdCIsIm9uRGVyZWZlcmVuY2VkIiwiaWQiLCJkZXNlcmlhbGl6ZSIsImpzb25PYmoiLCJBcnJheSIsImlzQXJyYXkiLCJqc29uQXJyYXkiLCJyZWZDb3VudCIsIl9kZXNlcmlhbGl6ZU9iamVjdCIsInNlcmlhbGl6ZWQiLCJvd25lciIsImtsYXNzIiwidHlwZSIsIl9fdHlwZV9fIiwiYXJyYXkiLCJ3aW5kb3ciLCJjdG9yIiwibm90UmVwb3J0ZWQiLCJfZ2V0Q2xhc3NCeUlkIiwiY2MiLCJyZXBvcnRNaXNzaW5nQ2xhc3MiLCJfZGVzZXJpYWxpemUiLCJjb250ZW50IiwiQ2xhc3MiLCJfaXNDQ0NsYXNzIiwiX2Rlc2VyaWFsaXplRmlyZUNsYXNzIiwiX2Rlc2VyaWFsaXplVHlwZWRPYmplY3QiLCJfZGVzZXJpYWxpemVQcmltaXRpdmVPYmplY3QiLCJfZGVzZXJpYWxpemVPYmpGaWVsZCIsIl9faWRfXyIsInVuZGVmaW5lZCIsIl9fdXVpZF9fIiwiZE9iaiIsImluc3RhbmNlIiwiaGFzT3duUHJvcGVydHkiLCJWZWMyIiwieCIsInkiLCJWZWMzIiwieiIsIkNvbG9yIiwiciIsImciLCJiIiwiYSIsIlNpemUiLCJ3aWR0aCIsImhlaWdodCIsIkRFRkFVTFQiLCJERUxJTUVURVIiLCJhdHRycyIsImdldENsYXNzQXR0cnMiLCJmYXN0RGVmaW5lZFByb3BzIiwiX19wcm9wc19fIiwiT2JqZWN0Iiwia2V5cyIsInZhbHVlIiwiZ2V0RGVmYXVsdCIsImNvbXBpbGVPYmplY3RUeXBlSml0Iiwic291cmNlcyIsImRlZmF1bHRWYWx1ZSIsImFjY2Vzc29yVG9TZXQiLCJwcm9wTmFtZUxpdGVyYWxUb1NldCIsImFzc3VtZUhhdmVQcm9wSWZJc1ZhbHVlIiwiVmFsdWVUeXBlIiwiY3RvckNvZGUiLCJnZXRDbGFzc05hbWUiLCJjb21waWxlRGVzZXJpYWxpemUiLCJDQ19TVVBQT1JUX0pJVCIsIlRZUEUiLCJFRElUT1JfT05MWSIsIkZPUk1FUkxZX1NFUklBTElaRURfQVMiLCJwcm9wcyIsIl9fdmFsdWVzX18iLCJmYXN0TW9kZSIsIkJVSUxUSU5fQ0xBU1NJRF9SRSIsInRlc3QiLCJfZ2V0Q2xhc3NJZCIsInAiLCJDQ19QUkVWSUVXIiwiSURFTlRJRklFUl9SRSIsImVzY2FwZUZvckpTIiwiYWNjZXNzb3JUb0dldCIsInByb3BOYW1lVG9SZWFkIiwiQ0NfSlNCIiwiQ0NfUlVOVElNRSIsImlzUHJpbWl0aXZlVHlwZSIsInVzZXJUeXBlIiwiUHJpbWl0aXZlVHlwZSIsImRlZmF1bHRUeXBlIiwiaXNDaGlsZENsYXNzT2YiLCJfQmFzZU5vZGUiLCJDb21wb25lbnQiLCJtYXlVc2VkSW5QZXJzaXN0Um9vdCIsIk5vZGUiLCJGdW5jdGlvbiIsImpvaW4iLCJzaG91bGRDb3B5SWQiLCJzaG91bGRDb3B5UmF3RGF0YSIsInNpbXBsZVByb3BzIiwic2ltcGxlUHJvcHNUb1JlYWQiLCJhZHZhbmNlZFByb3BzIiwiYWR2YW5jZWRQcm9wc1RvUmVhZCIsImFkdmFuY2VkUHJvcHNWYWx1ZVR5cGUiLCJzbGljZSIsImNvbnN0cnVjdG9yIiwicyIsIm8iLCJkIiwiayIsInZhbHVlVHlwZUN0b3IiLCJfaWQiLCJfJGVyaWFsaXplZCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInVubGlua1VudXNlZFByZWZhYiIsImxhc3QiLCJwb3AiLCJkZWJ1Z0Vudk9ubHlJbmZvIiwid2FybiIsIl9fZGVzZXJpYWxpemVfXyIsIl9QcmVmYWJJbmZvIiwic3luYyIsImNhY2hlIiwiZGF0YSIsImRldGFpbHMiLCJvcHRpb25zIiwiY3JlYXRlQXNzZXRSZWZzIiwic3lzIiwicGxhdGZvcm0iLCJFRElUT1JfQ09SRSIsIkJ1ZmZlciIsImlzQnVmZmVyIiwidG9TdHJpbmciLCJ0ZW1wRGV0YWlscyIsImRlc2VyaWFsaXplciIsImdhbWUiLCJfaXNDbG9uaW5nIiwicmVzIiwicHV0IiwiRWRpdG9yIiwic2VyaWFsaXplIiwiYXNBc3NldCIsIlV0aWxzIiwiVXVpZFV0aWxzIiwiaXNVdWlkIiwiZGVjb21wcmVzc1V1aWQiLCJ3YXJuSUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFJQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQWhCOztBQUNBLElBQUlDLElBQUksR0FBR0QsT0FBTyxDQUFDLGFBQUQsQ0FBbEI7O0FBQ0EsSUFBSUUsT0FBTyxHQUFHRixPQUFPLENBQUMsV0FBRCxDQUFyQjs7QUFDQSxJQUFJRyxJQUFJLEdBQUdILE9BQU8sQ0FBQyxlQUFELENBQWxCLEVBRUE7O0FBRUE7Ozs7Ozs7O0FBTUEsSUFBSUksT0FBTyxHQUFHLFNBQVZBLE9BQVUsR0FBWTtBQUN0Qjs7OztBQUlBLE9BQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQTs7Ozs7QUFJQSxP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eUJBLE9BQXpCOztBQUNBMkQsRUFBRSxDQUFDakIsV0FBSCxDQUFla0Isa0JBQWYsR0FBb0MsVUFBVW5CLEVBQVYsRUFBYztBQUM5QyxNQUFJbEMsU0FBUyxJQUFJOEssTUFBTSxDQUFDRyxLQUFQLENBQWFDLFNBQWIsQ0FBdUJDLE1BQXZCLENBQThCakosRUFBOUIsQ0FBakIsRUFBb0Q7QUFDaERBLElBQUFBLEVBQUUsR0FBRzRJLE1BQU0sQ0FBQ0csS0FBUCxDQUFhQyxTQUFiLENBQXVCRSxjQUF2QixDQUFzQ2xKLEVBQXRDLENBQUw7QUFDQWtCLElBQUFBLEVBQUUsQ0FBQ2lJLE1BQUgsQ0FBVSxJQUFWLEVBQWdCbkosRUFBaEI7QUFDSCxHQUhELE1BSUs7QUFDRGtCLElBQUFBLEVBQUUsQ0FBQ2lJLE1BQUgsQ0FBVSxJQUFWLEVBQWdCbkosRUFBaEI7QUFDSDtBQUNKLENBUkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAyMCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBqcyA9IHJlcXVpcmUoJy4vanMnKTtcbnZhciBBdHRyID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGUnKTtcbnZhciBDQ0NsYXNzID0gcmVxdWlyZSgnLi9DQ0NsYXNzJyk7XG52YXIgbWlzYyA9IHJlcXVpcmUoJy4uL3V0aWxzL21pc2MnKTtcblxuLy8gSEVMUEVSU1xuXG4vKipcbiAqICEjZW4gQ29udGFpbnMgaW5mb3JtYXRpb24gY29sbGVjdGVkIGR1cmluZyBkZXNlcmlhbGl6YXRpb25cbiAqICEjemgg5YyF5ZCr5Y+N5bqP5YiX5YyW5pe255qE5LiA5Lqb5L+h5oGvXG4gKiBAY2xhc3MgRGV0YWlsc1xuICpcbiAqL1xudmFyIERldGFpbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogbGlzdCBvZiB0aGUgZGVwZW5kcyBhc3NldHMnIHV1aWRcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ1tdfSB1dWlkTGlzdFxuICAgICAqL1xuICAgIHRoaXMudXVpZExpc3QgPSBbXTtcbiAgICAvKipcbiAgICAgKiB0aGUgb2JqIGxpc3Qgd2hvc2UgZmllbGQgbmVlZHMgdG8gbG9hZCBhc3NldCBieSB1dWlkXG4gICAgICogQHByb3BlcnR5IHtPYmplY3RbXX0gdXVpZE9iakxpc3RcbiAgICAgKi9cbiAgICB0aGlzLnV1aWRPYmpMaXN0ID0gW107XG4gICAgLyoqXG4gICAgICogdGhlIGNvcnJlc3BvbmRpbmcgZmllbGQgbmFtZSB3aGljaCByZWZlcmVuY2VkIHRvIHRoZSBhc3NldFxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nW119IHV1aWRQcm9wTGlzdFxuICAgICAqL1xuICAgIHRoaXMudXVpZFByb3BMaXN0ID0gW107XG59O1xuLyoqXG4gKiBAbWV0aG9kIHJlc2V0XG4gKi9cbkRldGFpbHMucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudXVpZExpc3QubGVuZ3RoID0gMDtcbiAgICB0aGlzLnV1aWRPYmpMaXN0Lmxlbmd0aCA9IDA7XG4gICAgdGhpcy51dWlkUHJvcExpc3QubGVuZ3RoID0gMDtcbn07XG5pZiAoQ0NfRURJVE9SIHx8IENDX1RFU1QpIHtcbiAgICBEZXRhaWxzLnByb3RvdHlwZS5hc3NpZ25Bc3NldHNCeSA9IGZ1bmN0aW9uIChnZXR0ZXIpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMudXVpZExpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB1dWlkID0gdGhpcy51dWlkTGlzdFtpXTtcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLnV1aWRPYmpMaXN0W2ldO1xuICAgICAgICAgICAgdmFyIHByb3AgPSB0aGlzLnV1aWRQcm9wTGlzdFtpXTtcbiAgICAgICAgICAgIG9ialtwcm9wXSA9IGdldHRlcih1dWlkKTtcbiAgICAgICAgfVxuICAgIH07XG59XG4vLyAvKipcbi8vICAqIEBtZXRob2QgZ2V0VXVpZE9mXG4vLyAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4vLyAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcE5hbWVcbi8vICAqIEByZXR1cm4ge1N0cmluZ31cbi8vICAqL1xuLy8gRGV0YWlscy5wcm90b3R5cGUuZ2V0VXVpZE9mID0gZnVuY3Rpb24gKG9iaiwgcHJvcE5hbWUpIHtcbi8vICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudXVpZE9iakxpc3QubGVuZ3RoOyBpKyspIHtcbi8vICAgICAgICAgaWYgKHRoaXMudXVpZE9iakxpc3RbaV0gPT09IG9iaiAmJiB0aGlzLnV1aWRQcm9wTGlzdFtpXSA9PT0gcHJvcE5hbWUpIHtcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLnV1aWRMaXN0W2ldO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gICAgIHJldHVybiBcIlwiO1xuLy8gfTtcbi8qKlxuICogQG1ldGhvZCBwdXNoXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcE5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSB1dWlkXG4gKi9cbkRldGFpbHMucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAob2JqLCBwcm9wTmFtZSwgdXVpZCkge1xuICAgIHRoaXMudXVpZExpc3QucHVzaCh1dWlkKTtcbiAgICB0aGlzLnV1aWRPYmpMaXN0LnB1c2gob2JqKTtcbiAgICB0aGlzLnV1aWRQcm9wTGlzdC5wdXNoKHByb3BOYW1lKTtcbn07XG5cbkRldGFpbHMucG9vbCA9IG5ldyBqcy5Qb29sKGZ1bmN0aW9uIChvYmopIHtcbiAgICBvYmoucmVzZXQoKTtcbn0sIDEwKTtcblxuRGV0YWlscy5wb29sLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0KCkgfHwgbmV3IERldGFpbHMoKTtcbn07XG5cbi8vIElNUExFTUVOVCBPRiBERVNFUklBTElaQVRJT05cblxudmFyIF9EZXNlcmlhbGl6ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIF9EZXNlcmlhbGl6ZXIocmVzdWx0LCBjbGFzc0ZpbmRlciwgY3VzdG9tRW52LCBpZ25vcmVFZGl0b3JPbmx5KSB7XG4gICAgICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICB0aGlzLmN1c3RvbUVudiA9IGN1c3RvbUVudjtcbiAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZWRMaXN0ID0gW107XG4gICAgICAgIHRoaXMuZGVzZXJpYWxpemVkRGF0YSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NsYXNzRmluZGVyID0gY2xhc3NGaW5kZXI7XG4gICAgICAgIGlmIChDQ19ERVYpIHtcbiAgICAgICAgICAgIHRoaXMuX2lnbm9yZUVkaXRvck9ubHkgPSBpZ25vcmVFZGl0b3JPbmx5O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lkTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLl9pZE9iakxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5faWRQcm9wTGlzdCA9IFtdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9kZXJlZmVyZW5jZSAoc2VsZikge1xuICAgICAgICAvLyDov5nph4zkuI3ph4fnlKjpgY3ljoblj43luo/liJfljJbnu5PmnpznmoTmlrnlvI/vvIzlm6DkuLrlj43luo/liJfljJbnmoTnu5PmnpzlpoLmnpzlvJXnlKjliLDlpI3mnYLnmoTlpJbpg6jlupPvvIzlvojlrrnmmJPloIbmoIjmuqLlh7rjgIJcbiAgICAgICAgdmFyIGRlc2VyaWFsaXplZExpc3QgPSBzZWxmLmRlc2VyaWFsaXplZExpc3Q7XG4gICAgICAgIHZhciBpZFByb3BMaXN0ID0gc2VsZi5faWRQcm9wTGlzdDtcbiAgICAgICAgdmFyIGlkTGlzdCA9IHNlbGYuX2lkTGlzdDtcbiAgICAgICAgdmFyIGlkT2JqTGlzdCA9IHNlbGYuX2lkT2JqTGlzdDtcbiAgICAgICAgdmFyIG9uRGVyZWZlcmVuY2VkID0gc2VsZi5fY2xhc3NGaW5kZXIgJiYgc2VsZi5fY2xhc3NGaW5kZXIub25EZXJlZmVyZW5jZWQ7XG4gICAgICAgIHZhciBpLCBwcm9wTmFtZSwgaWQ7XG4gICAgICAgIGlmIChDQ19FRElUT1IgJiYgb25EZXJlZmVyZW5jZWQpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBpZExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwcm9wTmFtZSA9IGlkUHJvcExpc3RbaV07XG4gICAgICAgICAgICAgICAgaWQgPSBpZExpc3RbaV07XG4gICAgICAgICAgICAgICAgaWRPYmpMaXN0W2ldW3Byb3BOYW1lXSA9IGRlc2VyaWFsaXplZExpc3RbaWRdO1xuICAgICAgICAgICAgICAgIG9uRGVyZWZlcmVuY2VkKGRlc2VyaWFsaXplZExpc3QsIGlkLCBpZE9iakxpc3RbaV0sIHByb3BOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBpZExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwcm9wTmFtZSA9IGlkUHJvcExpc3RbaV07XG4gICAgICAgICAgICAgICAgaWQgPSBpZExpc3RbaV07XG4gICAgICAgICAgICAgICAgaWRPYmpMaXN0W2ldW3Byb3BOYW1lXSA9IGRlc2VyaWFsaXplZExpc3RbaWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByb3RvdHlwZSA9IF9EZXNlcmlhbGl6ZXIucHJvdG90eXBlO1xuXG4gICAgcHJvdG90eXBlLmRlc2VyaWFsaXplID0gZnVuY3Rpb24gKGpzb25PYmopIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoanNvbk9iaikpIHtcbiAgICAgICAgICAgIHZhciBqc29uQXJyYXkgPSBqc29uT2JqO1xuICAgICAgICAgICAgdmFyIHJlZkNvdW50ID0ganNvbkFycmF5Lmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuZGVzZXJpYWxpemVkTGlzdC5sZW5ndGggPSByZWZDb3VudDtcbiAgICAgICAgICAgIC8vIGRlc2VyaWFsaXplXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZkNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoanNvbkFycmF5W2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IgfHwgQ0NfVEVTVCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZWRMaXN0W2ldID0gdGhpcy5fZGVzZXJpYWxpemVPYmplY3QoanNvbkFycmF5W2ldLCB0aGlzLmRlc2VyaWFsaXplZExpc3QsICcnICsgaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc2VyaWFsaXplZExpc3RbaV0gPSB0aGlzLl9kZXNlcmlhbGl6ZU9iamVjdChqc29uQXJyYXlbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZWREYXRhID0gcmVmQ291bnQgPiAwID8gdGhpcy5kZXNlcmlhbGl6ZWRMaXN0WzBdIDogW107XG5cbiAgICAgICAgICAgIC8vLy8gY2FsbGJhY2tcbiAgICAgICAgICAgIC8vZm9yICh2YXIgaiA9IDA7IGogPCByZWZDb3VudDsgaisrKSB7XG4gICAgICAgICAgICAvLyAgICBpZiAocmVmZXJlbmNlZExpc3Rbal0ub25BZnRlckRlc2VyaWFsaXplKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgcmVmZXJlbmNlZExpc3Rbal0ub25BZnRlckRlc2VyaWFsaXplKCk7XG4gICAgICAgICAgICAvLyAgICB9XG4gICAgICAgICAgICAvL31cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVzZXJpYWxpemVkTGlzdC5sZW5ndGggPSAxO1xuICAgICAgICAgICAgaWYgKENDX0VESVRPUiB8fCBDQ19URVNUKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZWREYXRhID0ganNvbk9iaiA/IHRoaXMuX2Rlc2VyaWFsaXplT2JqZWN0KGpzb25PYmosIHRoaXMuZGVzZXJpYWxpemVkTGlzdCwgJzAnKSA6IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2VyaWFsaXplZERhdGEgPSBqc29uT2JqID8gdGhpcy5fZGVzZXJpYWxpemVPYmplY3QoanNvbk9iaikgOiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZWRMaXN0WzBdID0gdGhpcy5kZXNlcmlhbGl6ZWREYXRhO1xuXG4gICAgICAgICAgICAvLy8vIGNhbGxiYWNrXG4gICAgICAgICAgICAvL2lmIChkZXNlcmlhbGl6ZWREYXRhLm9uQWZ0ZXJEZXNlcmlhbGl6ZSkge1xuICAgICAgICAgICAgLy8gICAgZGVzZXJpYWxpemVkRGF0YS5vbkFmdGVyRGVzZXJpYWxpemUoKTtcbiAgICAgICAgICAgIC8vfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVyZWZlcmVuY2VcbiAgICAgICAgX2RlcmVmZXJlbmNlKHRoaXMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRlc2VyaWFsaXplZERhdGE7XG4gICAgfTtcblxuICAgIC8vLyoqXG4gICAgLy8gKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXplZCAtIFRoZSBvYmogdG8gZGVzZXJpYWxpemUsIG11c3QgYmUgbm9uLW5pbFxuICAgIC8vICogQHBhcmFtIHtPYmplY3R9IFtvd25lcl0gLSBkZWJ1ZyBvbmx5XG4gICAgLy8gKiBAcGFyYW0ge1N0cmluZ30gW3Byb3BOYW1lXSAtIGRlYnVnIG9ubHlcbiAgICAvLyAqL1xuICAgIHByb3RvdHlwZS5fZGVzZXJpYWxpemVPYmplY3QgPSBmdW5jdGlvbiAoc2VyaWFsaXplZCwgb3duZXIsIHByb3BOYW1lKSB7XG4gICAgICAgIHZhciBwcm9wO1xuICAgICAgICB2YXIgb2JqID0gbnVsbDsgICAgIC8vIHRoZSBvYmogdG8gcmV0dXJuXG4gICAgICAgIHZhciBrbGFzcyA9IG51bGw7XG4gICAgICAgIHZhciB0eXBlID0gc2VyaWFsaXplZC5fX3R5cGVfXztcbiAgICAgICAgaWYgKHR5cGUgPT09ICdUeXBlZEFycmF5Jykge1xuICAgICAgICAgICAgdmFyIGFycmF5ID0gc2VyaWFsaXplZC5hcnJheTtcbiAgICAgICAgICAgIG9iaiA9IG5ldyB3aW5kb3dbc2VyaWFsaXplZC5jdG9yXShhcnJheS5sZW5ndGgpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIG9ialtpXSA9IGFycmF5W2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlKSB7XG5cbiAgICAgICAgICAgIC8vIFR5cGUgT2JqZWN0IChpbmNsdWRpbmcgQ0NDbGFzcylcblxuICAgICAgICAgICAga2xhc3MgPSB0aGlzLl9jbGFzc0ZpbmRlcih0eXBlLCBzZXJpYWxpemVkLCBvd25lciwgcHJvcE5hbWUpO1xuICAgICAgICAgICAgaWYgKCFrbGFzcykge1xuICAgICAgICAgICAgICAgIHZhciBub3RSZXBvcnRlZCA9IHRoaXMuX2NsYXNzRmluZGVyID09PSBqcy5fZ2V0Q2xhc3NCeUlkO1xuICAgICAgICAgICAgICAgIGlmIChub3RSZXBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICBjYy5kZXNlcmlhbGl6ZS5yZXBvcnRNaXNzaW5nQ2xhc3ModHlwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpbnN0YW50aWF0ZSBhIG5ldyBvYmplY3RcbiAgICAgICAgICAgIG9iaiA9IG5ldyBrbGFzcygpO1xuXG4gICAgICAgICAgICBpZiAob2JqLl9kZXNlcmlhbGl6ZSkge1xuICAgICAgICAgICAgICAgIG9iai5fZGVzZXJpYWxpemUoc2VyaWFsaXplZC5jb250ZW50LCB0aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNjLkNsYXNzLl9pc0NDQ2xhc3Moa2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgX2Rlc2VyaWFsaXplRmlyZUNsYXNzKHRoaXMsIG9iaiwgc2VyaWFsaXplZCwga2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVzZXJpYWxpemVUeXBlZE9iamVjdChvYmosIHNlcmlhbGl6ZWQsIGtsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggIUFycmF5LmlzQXJyYXkoc2VyaWFsaXplZCkgKSB7XG5cbiAgICAgICAgICAgIC8vIGVtYmVkZGVkIHByaW1pdGl2ZSBqYXZhc2NyaXB0IG9iamVjdFxuXG4gICAgICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgICAgIHRoaXMuX2Rlc2VyaWFsaXplUHJpbWl0aXZlT2JqZWN0KG9iaiwgc2VyaWFsaXplZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIEFycmF5XG5cbiAgICAgICAgICAgIG9iaiA9IG5ldyBBcnJheShzZXJpYWxpemVkLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VyaWFsaXplZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHByb3AgPSBzZXJpYWxpemVkW2ldO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcCA9PT0gJ29iamVjdCcgJiYgcHJvcCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZXNlcmlhbGl6ZU9iakZpZWxkKG9iaiwgcHJvcCwgJycgKyBpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialtpXSA9IHByb3A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfTtcblxuICAgIC8vIOWSjCBfZGVzZXJpYWxpemVPYmplY3Qg5LiN5ZCM55qE5Zyw5pa55Zyo5LqO5Lya5Yik5patIGlkIOWSjCB1dWlkXG4gICAgcHJvdG90eXBlLl9kZXNlcmlhbGl6ZU9iakZpZWxkID0gZnVuY3Rpb24gKG9iaiwganNvbk9iaiwgcHJvcE5hbWUpIHtcbiAgICAgICAgdmFyIGlkID0ganNvbk9iai5fX2lkX187XG4gICAgICAgIGlmIChpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgdXVpZCA9IGpzb25PYmouX191dWlkX187XG4gICAgICAgICAgICBpZiAodXVpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0LnB1c2gob2JqLCBwcm9wTmFtZSwgdXVpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SIHx8IENDX1RFU1QpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqW3Byb3BOYW1lXSA9IHRoaXMuX2Rlc2VyaWFsaXplT2JqZWN0KGpzb25PYmosIG9iaiwgcHJvcE5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqW3Byb3BOYW1lXSA9IHRoaXMuX2Rlc2VyaWFsaXplT2JqZWN0KGpzb25PYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBkT2JqID0gdGhpcy5kZXNlcmlhbGl6ZWRMaXN0W2lkXTtcbiAgICAgICAgICAgIGlmIChkT2JqKSB7XG4gICAgICAgICAgICAgICAgb2JqW3Byb3BOYW1lXSA9IGRPYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pZExpc3QucHVzaChpZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faWRPYmpMaXN0LnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pZFByb3BMaXN0LnB1c2gocHJvcE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByb3RvdHlwZS5fZGVzZXJpYWxpemVQcmltaXRpdmVPYmplY3QgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIHNlcmlhbGl6ZWQpIHtcbiAgICAgICAgZm9yICh2YXIgcHJvcE5hbWUgaW4gc2VyaWFsaXplZCkge1xuICAgICAgICAgICAgaWYgKHNlcmlhbGl6ZWQuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBzZXJpYWxpemVkW3Byb3BOYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByb3AgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wTmFtZSAhPT0gJ19fdHlwZV9fJy8qICYmIGsgIT0gJ19faWRfXycqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VbcHJvcE5hbWVdID0gcHJvcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rlc2VyaWFsaXplT2JqRmllbGQoaW5zdGFuY2UsIHByb3AsIHByb3BOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlW3Byb3BOYW1lXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBmdW5jdGlvbiBfY29tcGlsZVR5cGVkT2JqZWN0IChhY2Nlc3Nvciwga2xhc3MsIGN0b3JDb2RlKSB7XG4gICAgLy8gICAgIGlmIChrbGFzcyA9PT0gY2MuVmVjMikge1xuICAgIC8vICAgICAgICAgcmV0dXJuIGB7YCArXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBgbyR7YWNjZXNzb3J9Lng9cHJvcC54fHwwO2AgK1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgYG8ke2FjY2Vzc29yfS55PXByb3AueXx8MDtgICtcbiAgICAvLyAgICAgICAgICAgICAgICBgfWA7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgZWxzZSBpZiAoa2xhc3MgPT09IGNjLkNvbG9yKSB7XG4gICAgLy8gICAgICAgICByZXR1cm4gYHtgICtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgYG8ke2FjY2Vzc29yfS5yPXByb3Aucnx8MDtgICtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgYG8ke2FjY2Vzc29yfS5nPXByb3AuZ3x8MDtgICtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgYG8ke2FjY2Vzc29yfS5iPXByb3AuYnx8MDtgICtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgYG8ke2FjY2Vzc29yfS5hPShwcm9wLmE9PT11bmRlZmluZWQ/MjU1OnByb3AuYSk7YCArXG4gICAgLy8gICAgICAgICAgICAgICAgYH1gO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGVsc2UgaWYgKGtsYXNzID09PSBjYy5TaXplKSB7XG4gICAgLy8gICAgICAgICByZXR1cm4gYHtgICtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgYG8ke2FjY2Vzc29yfS53aWR0aD1wcm9wLndpZHRofHwwO2AgK1xuICAgIC8vICAgICAgICAgICAgICAgICAgICBgbyR7YWNjZXNzb3J9LmhlaWdodD1wcm9wLmhlaWdodHx8MDtgICtcbiAgICAvLyAgICAgICAgICAgICAgICBgfWA7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgZWxzZSB7XG4gICAgLy8gICAgICAgICByZXR1cm4gYHMuX2Rlc2VyaWFsaXplVHlwZWRPYmplY3QobyR7YWNjZXNzb3J9LHByb3AsJHtjdG9yQ29kZX0pO2A7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICAvLyBkZXNlcmlhbGl6ZSBWYWx1ZVR5cGVcbiAgICBwcm90b3R5cGUuX2Rlc2VyaWFsaXplVHlwZWRPYmplY3QgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIHNlcmlhbGl6ZWQsIGtsYXNzKSB7XG4gICAgICAgIGlmIChrbGFzcyA9PT0gY2MuVmVjMikge1xuICAgICAgICAgICAgaW5zdGFuY2UueCA9IHNlcmlhbGl6ZWQueCB8fCAwO1xuICAgICAgICAgICAgaW5zdGFuY2UueSA9IHNlcmlhbGl6ZWQueSB8fCAwO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtsYXNzID09PSBjYy5WZWMzKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS54ID0gc2VyaWFsaXplZC54IHx8IDA7XG4gICAgICAgICAgICBpbnN0YW5jZS55ID0gc2VyaWFsaXplZC55IHx8IDA7XG4gICAgICAgICAgICBpbnN0YW5jZS56ID0gc2VyaWFsaXplZC56IHx8IDA7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2xhc3MgPT09IGNjLkNvbG9yKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5yID0gc2VyaWFsaXplZC5yIHx8IDA7XG4gICAgICAgICAgICBpbnN0YW5jZS5nID0gc2VyaWFsaXplZC5nIHx8IDA7XG4gICAgICAgICAgICBpbnN0YW5jZS5iID0gc2VyaWFsaXplZC5iIHx8IDA7XG4gICAgICAgICAgICB2YXIgYSA9IHNlcmlhbGl6ZWQuYTtcbiAgICAgICAgICAgIGluc3RhbmNlLmEgPSAoYSA9PT0gdW5kZWZpbmVkID8gMjU1IDogYSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2xhc3MgPT09IGNjLlNpemUpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLndpZHRoID0gc2VyaWFsaXplZC53aWR0aCB8fCAwO1xuICAgICAgICAgICAgaW5zdGFuY2UuaGVpZ2h0ID0gc2VyaWFsaXplZC5oZWlnaHQgfHwgMDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBERUZBVUxUID0gQXR0ci5ERUxJTUVURVIgKyAnZGVmYXVsdCc7XG4gICAgICAgIHZhciBhdHRycyA9IEF0dHIuZ2V0Q2xhc3NBdHRycyhrbGFzcyk7XG4gICAgICAgIHZhciBmYXN0RGVmaW5lZFByb3BzID0ga2xhc3MuX19wcm9wc19fIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoaW5zdGFuY2UpOyAgICAvLyDpgY3ljoYgaW5zdGFuY2XvvIzlpoLmnpzlhbfmnInnsbvlnovvvIzmiY3kuI3kvJrmioogX190eXBlX18g5Lmf6K+76L+b5p2lXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmFzdERlZmluZWRQcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHByb3BOYW1lID0gZmFzdERlZmluZWRQcm9wc1tpXTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHNlcmlhbGl6ZWRbcHJvcE5hbWVdO1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgIXNlcmlhbGl6ZWQuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgLy8gbm90IHNlcmlhbGl6ZWQsXG4gICAgICAgICAgICAgICAgLy8gcmVjb3ZlciB0byBkZWZhdWx0IHZhbHVlIGluIFZhbHVlVHlwZSwgYmVjYXVzZSBlbGltaW5hdGVkIHByb3BlcnRpZXMgZXF1YWxzIHRvXG4gICAgICAgICAgICAgICAgLy8gaXRzIGRlZmF1bHQgdmFsdWUgaW4gVmFsdWVUeXBlLCBub3QgZGVmYXVsdCB2YWx1ZSBpbiB1c2VyIGNsYXNzXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBDQ0NsYXNzLmdldERlZmF1bHQoYXR0cnNbcHJvcE5hbWUgKyBERUZBVUxUXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VbcHJvcE5hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rlc2VyaWFsaXplT2JqRmllbGQoaW5zdGFuY2UsIHZhbHVlLCBwcm9wTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtwcm9wTmFtZV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNvbXBpbGVPYmplY3RUeXBlSml0IChzb3VyY2VzLCBkZWZhdWx0VmFsdWUsIGFjY2Vzc29yVG9TZXQsIHByb3BOYW1lTGl0ZXJhbFRvU2V0LCBhc3N1bWVIYXZlUHJvcElmSXNWYWx1ZSkge1xuICAgICAgICBpZiAoZGVmYXVsdFZhbHVlIGluc3RhbmNlb2YgY2MuVmFsdWVUeXBlKSB7XG4gICAgICAgICAgICAvLyBmYXN0IGNhc2VcbiAgICAgICAgICAgIGlmICghYXNzdW1lSGF2ZVByb3BJZklzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VzLnB1c2goJ2lmKHByb3ApeycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGN0b3JDb2RlID0ganMuZ2V0Q2xhc3NOYW1lKGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goYHMuX2Rlc2VyaWFsaXplVHlwZWRPYmplY3QobyR7YWNjZXNzb3JUb1NldH0scHJvcCwke2N0b3JDb2RlfSk7YCk7XG4gICAgICAgICAgICBpZiAoIWFzc3VtZUhhdmVQcm9wSWZJc1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc291cmNlcy5wdXNoKCd9ZWxzZSBvJyArIGFjY2Vzc29yVG9TZXQgKyAnPW51bGw7Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goJ2lmKHByb3ApeycpO1xuICAgICAgICAgICAgICAgIHNvdXJjZXMucHVzaCgncy5fZGVzZXJpYWxpemVPYmpGaWVsZChvLHByb3AsJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wTmFtZUxpdGVyYWxUb1NldCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcpOycpO1xuICAgICAgICAgICAgc291cmNlcy5wdXNoKCd9ZWxzZSBvJyArIGFjY2Vzc29yVG9TZXQgKyAnPW51bGw7Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY29tcGlsZURlc2VyaWFsaXplID0gQ0NfU1VQUE9SVF9KSVQgPyBmdW5jdGlvbiAoc2VsZiwga2xhc3MpIHtcbiAgICAgICAgdmFyIFRZUEUgPSBBdHRyLkRFTElNRVRFUiArICd0eXBlJztcbiAgICAgICAgdmFyIEVESVRPUl9PTkxZID0gQXR0ci5ERUxJTUVURVIgKyAnZWRpdG9yT25seSc7XG4gICAgICAgIHZhciBERUZBVUxUID0gQXR0ci5ERUxJTUVURVIgKyAnZGVmYXVsdCc7XG4gICAgICAgIHZhciBGT1JNRVJMWV9TRVJJQUxJWkVEX0FTID0gQXR0ci5ERUxJTUVURVIgKyAnZm9ybWVybHlTZXJpYWxpemVkQXMnO1xuICAgICAgICB2YXIgYXR0cnMgPSBBdHRyLmdldENsYXNzQXR0cnMoa2xhc3MpO1xuXG4gICAgICAgIHZhciBwcm9wcyA9IGtsYXNzLl9fdmFsdWVzX187XG4gICAgICAgIC8vIHNlbGYsIG9iaiwgc2VyaWFsaXplZERhdGEsIGtsYXNzXG4gICAgICAgIHZhciBzb3VyY2VzID0gW1xuICAgICAgICAgICAgJ3ZhciBwcm9wOydcbiAgICAgICAgXTtcbiAgICAgICAgdmFyIGZhc3RNb2RlID0gbWlzYy5CVUlMVElOX0NMQVNTSURfUkUudGVzdChqcy5fZ2V0Q2xhc3NJZChrbGFzcykpO1xuICAgICAgICAvLyBzb3VyY2VzLnB1c2goJ3ZhciB2Yix2bix2cyx2byx2dSx2ZjsnKTsgICAgLy8gYm9vbGVhbiwgbnVtYmVyLCBzdHJpbmcsIG9iamVjdCwgdW5kZWZpbmVkLCBmdW5jdGlvblxuICAgICAgICBmb3IgKHZhciBwID0gMDsgcCA8IHByb3BzLmxlbmd0aDsgcCsrKSB7XG4gICAgICAgICAgICB2YXIgcHJvcE5hbWUgPSBwcm9wc1twXTtcbiAgICAgICAgICAgIGlmICgoQ0NfUFJFVklFVyB8fCAoQ0NfRURJVE9SICYmIHNlbGYuX2lnbm9yZUVkaXRvck9ubHkpKSAmJiBhdHRyc1twcm9wTmFtZSArIEVESVRPUl9PTkxZXSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlOyAgIC8vIHNraXAgZWRpdG9yIG9ubHkgaWYgaW4gcHJldmlld1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYWNjZXNzb3JUb1NldCwgcHJvcE5hbWVMaXRlcmFsVG9TZXQ7XG4gICAgICAgICAgICBpZiAoQ0NDbGFzcy5JREVOVElGSUVSX1JFLnRlc3QocHJvcE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcHJvcE5hbWVMaXRlcmFsVG9TZXQgPSAnXCInICsgcHJvcE5hbWUgKyAnXCInO1xuICAgICAgICAgICAgICAgIGFjY2Vzc29yVG9TZXQgPSAnLicgKyBwcm9wTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb3BOYW1lTGl0ZXJhbFRvU2V0ID0gQ0NDbGFzcy5lc2NhcGVGb3JKUyhwcm9wTmFtZSk7XG4gICAgICAgICAgICAgICAgYWNjZXNzb3JUb1NldCA9ICdbJyArIHByb3BOYW1lTGl0ZXJhbFRvU2V0ICsgJ10nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYWNjZXNzb3JUb0dldCA9IGFjY2Vzc29yVG9TZXQ7XG4gICAgICAgICAgICBpZiAoYXR0cnNbcHJvcE5hbWUgKyBGT1JNRVJMWV9TRVJJQUxJWkVEX0FTXSkge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wTmFtZVRvUmVhZCA9IGF0dHJzW3Byb3BOYW1lICsgRk9STUVSTFlfU0VSSUFMSVpFRF9BU107XG4gICAgICAgICAgICAgICAgaWYgKENDQ2xhc3MuSURFTlRJRklFUl9SRS50ZXN0KHByb3BOYW1lVG9SZWFkKSkge1xuICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvclRvR2V0ID0gJy4nICsgcHJvcE5hbWVUb1JlYWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvclRvR2V0ID0gJ1snICsgQ0NDbGFzcy5lc2NhcGVGb3JKUyhwcm9wTmFtZVRvUmVhZCkgKyAnXSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goJ3Byb3A9ZCcgKyBhY2Nlc3NvclRvR2V0ICsgJzsnKTtcbiAgICAgICAgICAgIHNvdXJjZXMucHVzaChgaWYodHlwZW9mICR7Q0NfSlNCIHx8IENDX1JVTlRJTUUgPyAnKHByb3ApJyA6ICdwcm9wJ30hPT1cInVuZGVmaW5lZFwiKXtgKTtcblxuICAgICAgICAgICAgLy8gZnVuY3Rpb24gdW5kZWZpbmVkIG9iamVjdChudWxsKSBzdHJpbmcgYm9vbGVhbiBudW1iZXJcbiAgICAgICAgICAgIHZhciBkZWZhdWx0VmFsdWUgPSBDQ0NsYXNzLmdldERlZmF1bHQoYXR0cnNbcHJvcE5hbWUgKyBERUZBVUxUXSk7XG4gICAgICAgICAgICBpZiAoZmFzdE1vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNQcmltaXRpdmVUeXBlO1xuICAgICAgICAgICAgICAgIHZhciB1c2VyVHlwZSA9IGF0dHJzW3Byb3BOYW1lICsgVFlQRV07XG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gdW5kZWZpbmVkICYmIHVzZXJUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzUHJpbWl0aXZlVHlwZSA9IHVzZXJUeXBlIGluc3RhbmNlb2YgQXR0ci5QcmltaXRpdmVUeXBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmF1bHRUeXBlID0gdHlwZW9mIGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaXNQcmltaXRpdmVUeXBlID0gZGVmYXVsdFR5cGUgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUeXBlID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VHlwZSA9PT0gJ2Jvb2xlYW4nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpc1ByaW1pdGl2ZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlcy5wdXNoKGBvJHthY2Nlc3NvclRvU2V0fT1wcm9wO2ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGlsZU9iamVjdFR5cGVKaXQoc291cmNlcywgZGVmYXVsdFZhbHVlLCBhY2Nlc3NvclRvU2V0LCBwcm9wTmFtZUxpdGVyYWxUb1NldCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc291cmNlcy5wdXNoKGBpZih0eXBlb2YgJHtDQ19KU0IgfHwgQ0NfUlVOVElNRSA/ICcocHJvcCknIDogJ3Byb3AnfSE9PVwib2JqZWN0XCIpe2AgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ28nICsgYWNjZXNzb3JUb1NldCArICc9cHJvcDsnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ31lbHNleycpO1xuICAgICAgICAgICAgICAgIGNvbXBpbGVPYmplY3RUeXBlSml0KHNvdXJjZXMsIGRlZmF1bHRWYWx1ZSwgYWNjZXNzb3JUb1NldCwgcHJvcE5hbWVMaXRlcmFsVG9TZXQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzb3VyY2VzLnB1c2goJ30nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNvdXJjZXMucHVzaCgnfScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYy5qcy5pc0NoaWxkQ2xhc3NPZihrbGFzcywgY2MuX0Jhc2VOb2RlKSB8fCBjYy5qcy5pc0NoaWxkQ2xhc3NPZihrbGFzcywgY2MuQ29tcG9uZW50KSkge1xuICAgICAgICAgICAgaWYgKENDX1BSRVZJRVcgfHwgKENDX0VESVRPUiAmJiBzZWxmLl9pZ25vcmVFZGl0b3JPbmx5KSkge1xuICAgICAgICAgICAgICAgIHZhciBtYXlVc2VkSW5QZXJzaXN0Um9vdCA9IGpzLmlzQ2hpbGRDbGFzc09mKGtsYXNzLCBjYy5Ob2RlKTtcbiAgICAgICAgICAgICAgICBpZiAobWF5VXNlZEluUGVyc2lzdFJvb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlcy5wdXNoKCdkLl9pZCYmKG8uX2lkPWQuX2lkKTsnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VzLnB1c2goJ2QuX2lkJiYoby5faWQ9ZC5faWQpOycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wc1twcm9wcy5sZW5ndGggLSAxXSA9PT0gJ18kZXJpYWxpemVkJykge1xuICAgICAgICAgICAgLy8gZGVlcCBjb3B5IG9yaWdpbmFsIHNlcmlhbGl6ZWQgZGF0YVxuICAgICAgICAgICAgc291cmNlcy5wdXNoKCdvLl8kZXJpYWxpemVkPUpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZCkpOycpO1xuICAgICAgICAgICAgLy8gcGFyc2UgdGhlIHNlcmlhbGl6ZWQgZGF0YSBhcyBwcmltaXRpdmUgamF2YXNjcmlwdCBvYmplY3QsIHNvIGl0cyBfX2lkX18gd2lsbCBiZSBkZXJlZmVyZW5jZWRcbiAgICAgICAgICAgIHNvdXJjZXMucHVzaCgncy5fZGVzZXJpYWxpemVQcmltaXRpdmVPYmplY3Qoby5fJGVyaWFsaXplZCxkKTsnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRnVuY3Rpb24oJ3MnLCAnbycsICdkJywgJ2snLCBzb3VyY2VzLmpvaW4oJycpKTtcbiAgICB9IDogZnVuY3Rpb24gKHNlbGYsIGtsYXNzKSB7XG4gICAgICAgIHZhciBmYXN0TW9kZSA9IG1pc2MuQlVJTFRJTl9DTEFTU0lEX1JFLnRlc3QoanMuX2dldENsYXNzSWQoa2xhc3MpKTtcbiAgICAgICAgdmFyIHNob3VsZENvcHlJZCA9IGNjLmpzLmlzQ2hpbGRDbGFzc09mKGtsYXNzLCBjYy5fQmFzZU5vZGUpIHx8IGNjLmpzLmlzQ2hpbGRDbGFzc09mKGtsYXNzLCBjYy5Db21wb25lbnQpO1xuICAgICAgICB2YXIgc2hvdWxkQ29weVJhd0RhdGE7XG5cbiAgICAgICAgdmFyIHNpbXBsZVByb3BzID0gW107XG4gICAgICAgIHZhciBzaW1wbGVQcm9wc1RvUmVhZCA9IHNpbXBsZVByb3BzO1xuICAgICAgICB2YXIgYWR2YW5jZWRQcm9wcyA9IFtdO1xuICAgICAgICB2YXIgYWR2YW5jZWRQcm9wc1RvUmVhZCA9IGFkdmFuY2VkUHJvcHM7XG4gICAgICAgIHZhciBhZHZhbmNlZFByb3BzVmFsdWVUeXBlID0gW107XG5cbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwcm9wcyA9IGtsYXNzLl9fdmFsdWVzX187XG4gICAgICAgICAgICBzaG91bGRDb3B5UmF3RGF0YSA9IHByb3BzW3Byb3BzLmxlbmd0aCAtIDFdID09PSAnXyRlcmlhbGl6ZWQnO1xuXG4gICAgICAgICAgICB2YXIgYXR0cnMgPSBBdHRyLmdldENsYXNzQXR0cnMoa2xhc3MpO1xuICAgICAgICAgICAgdmFyIFRZUEUgPSBBdHRyLkRFTElNRVRFUiArICd0eXBlJztcbiAgICAgICAgICAgIHZhciBERUZBVUxUID0gQXR0ci5ERUxJTUVURVIgKyAnZGVmYXVsdCc7XG4gICAgICAgICAgICB2YXIgRk9STUVSTFlfU0VSSUFMSVpFRF9BUyA9IEF0dHIuREVMSU1FVEVSICsgJ2Zvcm1lcmx5U2VyaWFsaXplZEFzJztcblxuICAgICAgICAgICAgZm9yICh2YXIgcCA9IDA7IHAgPCBwcm9wcy5sZW5ndGg7IHArKykge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wTmFtZSA9IHByb3BzW3BdO1xuICAgICAgICAgICAgICAgIHZhciBwcm9wTmFtZVRvUmVhZCA9IHByb3BOYW1lO1xuICAgICAgICAgICAgICAgIGlmIChhdHRyc1twcm9wTmFtZSArIEZPUk1FUkxZX1NFUklBTElaRURfQVNdKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BOYW1lVG9SZWFkID0gYXR0cnNbcHJvcE5hbWUgKyBGT1JNRVJMWV9TRVJJQUxJWkVEX0FTXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gdW5kZWZpbmVkIG9iamVjdChudWxsKSBzdHJpbmcgYm9vbGVhbiBudW1iZXJcbiAgICAgICAgICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0gQ0NDbGFzcy5nZXREZWZhdWx0KGF0dHJzW3Byb3BOYW1lICsgREVGQVVMVF0pO1xuICAgICAgICAgICAgICAgIHZhciBpc1ByaW1pdGl2ZVR5cGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoZmFzdE1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJUeXBlID0gYXR0cnNbcHJvcE5hbWUgKyBUWVBFXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gdW5kZWZpbmVkICYmIHVzZXJUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ByaW1pdGl2ZVR5cGUgPSB1c2VyVHlwZSBpbnN0YW5jZW9mIEF0dHIuUHJpbWl0aXZlVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWZhdWx0VHlwZSA9IHR5cGVvZiBkZWZhdWx0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ByaW1pdGl2ZVR5cGUgPSBkZWZhdWx0VHlwZSA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUeXBlID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFR5cGUgPT09ICdib29sZWFuJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZmFzdE1vZGUgJiYgaXNQcmltaXRpdmVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wTmFtZVRvUmVhZCAhPT0gcHJvcE5hbWUgJiYgc2ltcGxlUHJvcHNUb1JlYWQgPT09IHNpbXBsZVByb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaW1wbGVQcm9wc1RvUmVhZCA9IHNpbXBsZVByb3BzLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2ltcGxlUHJvcHMucHVzaChwcm9wTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaW1wbGVQcm9wc1RvUmVhZCAhPT0gc2ltcGxlUHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpbXBsZVByb3BzVG9SZWFkLnB1c2gocHJvcE5hbWVUb1JlYWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcE5hbWVUb1JlYWQgIT09IHByb3BOYW1lICYmIGFkdmFuY2VkUHJvcHNUb1JlYWQgPT09IGFkdmFuY2VkUHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkdmFuY2VkUHJvcHNUb1JlYWQgPSBhZHZhbmNlZFByb3BzLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZWRQcm9wcy5wdXNoKHByb3BOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFkdmFuY2VkUHJvcHNUb1JlYWQgIT09IGFkdmFuY2VkUHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkdmFuY2VkUHJvcHNUb1JlYWQucHVzaChwcm9wTmFtZVRvUmVhZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZWRQcm9wc1ZhbHVlVHlwZS5wdXNoKChkZWZhdWx0VmFsdWUgaW5zdGFuY2VvZiBjYy5WYWx1ZVR5cGUpICYmIGRlZmF1bHRWYWx1ZS5jb25zdHJ1Y3Rvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocywgbywgZCwgaykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaW1wbGVQcm9wcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCBwcm9wID0gZFtzaW1wbGVQcm9wc1RvUmVhZFtpXV07XG4gICAgICAgICAgICAgICAgaWYgKHByb3AgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBvW3NpbXBsZVByb3BzW2ldXSA9IHByb3A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZHZhbmNlZFByb3BzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByb3BOYW1lID0gYWR2YW5jZWRQcm9wc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IGRbYWR2YW5jZWRQcm9wc1RvUmVhZFtpXV07XG4gICAgICAgICAgICAgICAgaWYgKHByb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFmYXN0TW9kZSAmJiB0eXBlb2YgcHJvcCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb1twcm9wTmFtZV0gPSBwcm9wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmFzdE1vZGUgKHNvIHdpbGwgbm90IHNpbXBsZVByb3ApIG9yIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVUeXBlQ3RvciA9IGFkdmFuY2VkUHJvcHNWYWx1ZVR5cGVbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVR5cGVDdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmFzdE1vZGUgfHwgcHJvcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuX2Rlc2VyaWFsaXplVHlwZWRPYmplY3Qob1twcm9wTmFtZV0sIHByb3AsIHZhbHVlVHlwZUN0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb1twcm9wTmFtZV0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLl9kZXNlcmlhbGl6ZU9iakZpZWxkKG8sIHByb3AsIHByb3BOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bcHJvcE5hbWVdID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaG91bGRDb3B5SWQgJiYgZC5faWQpIHtcbiAgICAgICAgICAgICAgICBvLl9pZCA9IGQuX2lkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNob3VsZENvcHlSYXdEYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gZGVlcCBjb3B5IG9yaWdpbmFsIHNlcmlhbGl6ZWQgZGF0YVxuICAgICAgICAgICAgICAgIG8uXyRlcmlhbGl6ZWQgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGQpKTtcbiAgICAgICAgICAgICAgICAvLyBwYXJzZSB0aGUgc2VyaWFsaXplZCBkYXRhIGFzIHByaW1pdGl2ZSBqYXZhc2NyaXB0IG9iamVjdCwgc28gaXRzIF9faWRfXyB3aWxsIGJlIGRlcmVmZXJlbmNlZFxuICAgICAgICAgICAgICAgIHMuX2Rlc2VyaWFsaXplUHJpbWl0aXZlT2JqZWN0KG8uXyRlcmlhbGl6ZWQsIGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVubGlua1VudXNlZFByZWZhYiAoc2VsZiwgc2VyaWFsaXplZCwgb2JqKSB7XG4gICAgICAgIHZhciB1dWlkID0gc2VyaWFsaXplZFsnYXNzZXQnXSAmJiBzZXJpYWxpemVkWydhc3NldCddLl9fdXVpZF9fO1xuICAgICAgICBpZiAodXVpZCkge1xuICAgICAgICAgICAgdmFyIGxhc3QgPSBzZWxmLnJlc3VsdC51dWlkTGlzdC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaWYgKHNlbGYucmVzdWx0LnV1aWRMaXN0W2xhc3RdID09PSB1dWlkICYmXG4gICAgICAgICAgICAgICAgc2VsZi5yZXN1bHQudXVpZE9iakxpc3RbbGFzdF0gPT09IG9iaiAmJlxuICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0LnV1aWRQcm9wTGlzdFtsYXN0XSA9PT0gJ2Fzc2V0Jykge1xuICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0LnV1aWRMaXN0LnBvcCgpO1xuICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0LnV1aWRPYmpMaXN0LnBvcCgpO1xuICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0LnV1aWRQcm9wTGlzdC5wb3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBkZWJ1Z0Vudk9ubHlJbmZvID0gJ0ZhaWxlZCB0byBza2lwIHByZWZhYiBhc3NldCB3aGlsZSBkZXNlcmlhbGl6aW5nIFByZWZhYkluZm8nO1xuICAgICAgICAgICAgICAgIGNjLndhcm4oZGVidWdFbnZPbmx5SW5mbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZGVzZXJpYWxpemVGaXJlQ2xhc3MgKHNlbGYsIG9iaiwgc2VyaWFsaXplZCwga2xhc3MpIHtcbiAgICAgICAgdmFyIGRlc2VyaWFsaXplO1xuICAgICAgICBpZiAoa2xhc3MuaGFzT3duUHJvcGVydHkoJ19fZGVzZXJpYWxpemVfXycpKSB7XG4gICAgICAgICAgICBkZXNlcmlhbGl6ZSA9IGtsYXNzLl9fZGVzZXJpYWxpemVfXztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlc2VyaWFsaXplID0gY29tcGlsZURlc2VyaWFsaXplKHNlbGYsIGtsYXNzKTtcbiAgICAgICAgICAgIC8vIGlmIChDQ19URVNUICYmICFpc1BoYW50b21KUykge1xuICAgICAgICAgICAgLy8gICAgIGNjLmxvZyhkZXNlcmlhbGl6ZSk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBqcy52YWx1ZShrbGFzcywgJ19fZGVzZXJpYWxpemVfXycsIGRlc2VyaWFsaXplLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBkZXNlcmlhbGl6ZShzZWxmLCBvYmosIHNlcmlhbGl6ZWQsIGtsYXNzKTtcbiAgICAgICAgLy8gaWYgcHJldmlldyBvciBidWlsZCB3b3JrZXJcbiAgICAgICAgaWYgKENDX1BSRVZJRVcgfHwgKENDX0VESVRPUiAmJiBzZWxmLl9pZ25vcmVFZGl0b3JPbmx5KSkge1xuICAgICAgICAgICAgaWYgKGtsYXNzID09PSBjYy5fUHJlZmFiSW5mbyAmJiAhb2JqLnN5bmMpIHtcbiAgICAgICAgICAgICAgICB1bmxpbmtVbnVzZWRQcmVmYWIoc2VsZiwgc2VyaWFsaXplZCwgb2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9EZXNlcmlhbGl6ZXIucG9vbCA9IG5ldyBqcy5Qb29sKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgb2JqLnJlc3VsdCA9IG51bGw7XG4gICAgICAgIG9iai5jdXN0b21FbnYgPSBudWxsO1xuICAgICAgICBvYmouZGVzZXJpYWxpemVkTGlzdC5sZW5ndGggPSAwO1xuICAgICAgICBvYmouZGVzZXJpYWxpemVkRGF0YSA9IG51bGw7XG4gICAgICAgIG9iai5fY2xhc3NGaW5kZXIgPSBudWxsO1xuICAgICAgICBvYmouX2lkTGlzdC5sZW5ndGggPSAwO1xuICAgICAgICBvYmouX2lkT2JqTGlzdC5sZW5ndGggPSAwO1xuICAgICAgICBvYmouX2lkUHJvcExpc3QubGVuZ3RoID0gMDtcbiAgICB9LCAxKTtcblxuICAgIF9EZXNlcmlhbGl6ZXIucG9vbC5nZXQgPSBmdW5jdGlvbiAocmVzdWx0LCBjbGFzc0ZpbmRlciwgY3VzdG9tRW52LCBpZ25vcmVFZGl0b3JPbmx5KSB7XG4gICAgICAgIHZhciBjYWNoZSA9IHRoaXMuX2dldCgpO1xuICAgICAgICBpZiAoY2FjaGUpIHtcbiAgICAgICAgICAgIGNhY2hlLnJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICAgIGNhY2hlLmN1c3RvbUVudiA9IGN1c3RvbUVudjtcbiAgICAgICAgICAgIGNhY2hlLl9jbGFzc0ZpbmRlciA9IGNsYXNzRmluZGVyO1xuICAgICAgICAgICAgaWYgKENDX0RFVikge1xuICAgICAgICAgICAgICAgIGNhY2hlLl9pZ25vcmVFZGl0b3JPbmx5ID0gaWdub3JlRWRpdG9yT25seTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjYWNoZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgX0Rlc2VyaWFsaXplcihyZXN1bHQsIGNsYXNzRmluZGVyLCBjdXN0b21FbnYsIGlnbm9yZUVkaXRvck9ubHkpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBfRGVzZXJpYWxpemVyO1xufSkoKTtcblxuLyoqXG4gKiBAbW9kdWxlIGNjXG4gKi9cblxuLyoqXG4gKiAhI2VuIERlc2VyaWFsaXplIGpzb24gdG8gY2MuQXNzZXRcbiAqICEjemgg5bCGIEpTT04g5Y+N5bqP5YiX5YyW5Li65a+56LGh5a6e5L6L44CCXG4gKlxuICogQG1ldGhvZCBkZXNlcmlhbGl6ZVxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBkYXRhIC0gdGhlIHNlcmlhbGl6ZWQgY2MuQXNzZXQganNvbiBzdHJpbmcgb3IganNvbiBvYmplY3QuXG4gKiBAcGFyYW0ge0RldGFpbHN9IFtkZXRhaWxzXSAtIGFkZGl0aW9uYWwgbG9hZGluZyByZXN1bHRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEByZXR1cm4ge29iamVjdH0gdGhlIG1haW4gZGF0YShhc3NldClcbiAqL1xuY2MuZGVzZXJpYWxpemUgPSBmdW5jdGlvbiAoZGF0YSwgZGV0YWlscywgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBjbGFzc0ZpbmRlciA9IG9wdGlvbnMuY2xhc3NGaW5kZXIgfHwganMuX2dldENsYXNzQnlJZDtcbiAgICB2YXIgY3JlYXRlQXNzZXRSZWZzID0gb3B0aW9ucy5jcmVhdGVBc3NldFJlZnMgfHwgY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuRURJVE9SX0NPUkU7XG4gICAgdmFyIGN1c3RvbUVudiA9IG9wdGlvbnMuY3VzdG9tRW52O1xuICAgIHZhciBpZ25vcmVFZGl0b3JPbmx5ID0gb3B0aW9ucy5pZ25vcmVFZGl0b3JPbmx5O1xuXG4gICAgaWYgKENDX0VESVRPUiAmJiBCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgIH1cblxuICAgIC8vdmFyIG9sZEpzb24gPSBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKTtcblxuICAgIHZhciB0ZW1wRGV0YWlscyA9ICFkZXRhaWxzO1xuICAgIGRldGFpbHMgPSBkZXRhaWxzIHx8IERldGFpbHMucG9vbC5nZXQoKTtcbiAgICB2YXIgZGVzZXJpYWxpemVyID0gX0Rlc2VyaWFsaXplci5wb29sLmdldChkZXRhaWxzLCBjbGFzc0ZpbmRlciwgY3VzdG9tRW52LCBpZ25vcmVFZGl0b3JPbmx5KTtcblxuICAgIGNjLmdhbWUuX2lzQ2xvbmluZyA9IHRydWU7XG4gICAgdmFyIHJlcyA9IGRlc2VyaWFsaXplci5kZXNlcmlhbGl6ZShkYXRhKTtcbiAgICBjYy5nYW1lLl9pc0Nsb25pbmcgPSBmYWxzZTtcblxuICAgIF9EZXNlcmlhbGl6ZXIucG9vbC5wdXQoZGVzZXJpYWxpemVyKTtcbiAgICBpZiAoY3JlYXRlQXNzZXRSZWZzKSB7XG4gICAgICAgIGRldGFpbHMuYXNzaWduQXNzZXRzQnkoRWRpdG9yLnNlcmlhbGl6ZS5hc0Fzc2V0KTtcbiAgICB9XG4gICAgaWYgKHRlbXBEZXRhaWxzKSB7XG4gICAgICAgIERldGFpbHMucG9vbC5wdXQoZGV0YWlscyk7XG4gICAgfVxuXG4gICAgLy92YXIgYWZ0ZXJKc29uID0gSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMik7XG4gICAgLy9pZiAob2xkSnNvbiAhPT0gYWZ0ZXJKc29uKSB7XG4gICAgLy8gICAgdGhyb3cgbmV3IEVycm9yKCdKU09OIFNIT1VMRCBub3QgY2hhbmdlZCcpO1xuICAgIC8vfVxuXG4gICAgcmV0dXJuIHJlcztcbn07XG5cbmNjLmRlc2VyaWFsaXplLkRldGFpbHMgPSBEZXRhaWxzO1xuY2MuZGVzZXJpYWxpemUucmVwb3J0TWlzc2luZ0NsYXNzID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgaWYgKENDX0VESVRPUiAmJiBFZGl0b3IuVXRpbHMuVXVpZFV0aWxzLmlzVXVpZChpZCkpIHtcbiAgICAgICAgaWQgPSBFZGl0b3IuVXRpbHMuVXVpZFV0aWxzLmRlY29tcHJlc3NVdWlkKGlkKTtcbiAgICAgICAgY2Mud2FybklEKDUzMDEsIGlkKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNjLndhcm5JRCg1MzAyLCBpZCk7XG4gICAgfVxufTsiXSwic291cmNlUm9vdCI6Ii8ifQ==