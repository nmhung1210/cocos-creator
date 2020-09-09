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
var misc = require('../utils/misc');

// HELPERS

/**
 * !#en Contains information collected during deserialization
 * !#zh 包含反序列化时的一些信息
 * @class Details
 *
 */
var Details = function () {
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
}
// /**
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
};

// IMPLEMENT OF DESERIALIZATION

var _Deserializer = (function () {
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

    function _dereference (self) {
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
        }
        else {
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
            this.deserializedList.length = refCount;
            // deserialize
            for (var i = 0; i < refCount; i++) {
                if (jsonArray[i]) {
                    if (CC_EDITOR || CC_TEST) {
                        this.deserializedList[i] = this._deserializeObject(jsonArray[i], this.deserializedList, '' + i);
                    }
                    else {
                        this.deserializedList[i] = this._deserializeObject(jsonArray[i]);
                    }
                }
            }
            this.deserializedData = refCount > 0 ? this.deserializedList[0] : [];

            //// callback
            //for (var j = 0; j < refCount; j++) {
            //    if (referencedList[j].onAfterDeserialize) {
            //        referencedList[j].onAfterDeserialize();
            //    }
            //}
        }
        else {
            this.deserializedList.length = 1;
            if (CC_EDITOR || CC_TEST) {
                this.deserializedData = jsonObj ? this._deserializeObject(jsonObj, this.deserializedList, '0') : null;
            }
            else {
                this.deserializedData = jsonObj ? this._deserializeObject(jsonObj) : null;
            }
            this.deserializedList[0] = this.deserializedData;

            //// callback
            //if (deserializedData.onAfterDeserialize) {
            //    deserializedData.onAfterDeserialize();
            //}
        }

        // dereference
        _dereference(this);

        return this.deserializedData;
    };

    ///**
    // * @param {Object} serialized - The obj to deserialize, must be non-nil
    // * @param {Object} [owner] - debug only
    // * @param {String} [propName] - debug only
    // */
    prototype._deserializeObject = function (serialized, owner, propName) {
        var prop;
        var obj = null;     // the obj to return
        var klass = null;
        var type = serialized.__type__;
        if (type === 'TypedArray') {
            var array = serialized.array;
            obj = new window[serialized.ctor](array.length);
            for (let i = 0; i < array.length; ++i) {
                obj[i] = array[i];
            }
            return obj;
        }
        else if (type) {

            // Type Object (including CCClass)

            klass = this._classFinder(type, serialized, owner, propName);
            if (!klass) {
                var notReported = this._classFinder === js._getClassById;
                if (notReported) {
                    cc.deserialize.reportMissingClass(type);
                }
                return null;
            }

            // instantiate a new object
            obj = new klass();

            if (obj._deserialize) {
                obj._deserialize(serialized.content, this);
                return obj;
            }
            if (cc.Class._isCCClass(klass)) {
                _deserializeFireClass(this, obj, serialized, klass);
            }
            else {
                this._deserializeTypedObject(obj, serialized, klass);
            }
        }
        else if ( !Array.isArray(serialized) ) {

            // embedded primitive javascript object

            obj = {};
            this._deserializePrimitiveObject(obj, serialized);
        }
        else {

            // Array

            obj = new Array(serialized.length);

            for (let i = 0; i < serialized.length; i++) {
                prop = serialized[i];
                if (typeof prop === 'object' && prop) {
                    this._deserializeObjField(obj, prop, '' + i);
                }
                else {
                    obj[i] = prop;
                }
            }
        }
        return obj;
    };

    // 和 _deserializeObject 不同的地方在于会判断 id 和 uuid
    prototype._deserializeObjField = function (obj, jsonObj, propName) {
        var id = jsonObj.__id__;
        if (id === undefined) {
            var uuid = jsonObj.__uuid__;
            if (uuid) {
                this.result.push(obj, propName, uuid);
            }
            else {
                if (CC_EDITOR || CC_TEST) {
                    obj[propName] = this._deserializeObject(jsonObj, obj, propName);
                }
                else {
                    obj[propName] = this._deserializeObject(jsonObj);
                }
            }
        }
        else {
            var dObj = this.deserializedList[id];
            if (dObj) {
                obj[propName] = dObj;
            }
            else {
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
                    if (propName !== '__type__'/* && k != '__id__'*/) {
                        instance[propName] = prop;
                    }
                }
                else {
                    if (prop) {
                        this._deserializeObjField(instance, prop, propName);
                    }
                    else {
                        instance[propName] = null;
                    }
                }

            }
        }
    };

    // function _compileTypedObject (accessor, klass, ctorCode) {
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
        }
        else if (klass === cc.Vec3) {
            instance.x = serialized.x || 0;
            instance.y = serialized.y || 0;
            instance.z = serialized.z || 0;
            return;
        }
        else if (klass === cc.Color) {
            instance.r = serialized.r || 0;
            instance.g = serialized.g || 0;
            instance.b = serialized.b || 0;
            var a = serialized.a;
            instance.a = (a === undefined ? 255 : a);
            return;
        }
        else if (klass === cc.Size) {
            instance.width = serialized.width || 0;
            instance.height = serialized.height || 0;
            return;
        }

        var DEFAULT = Attr.DELIMETER + 'default';
        var attrs = Attr.getClassAttrs(klass);
        var fastDefinedProps = klass.__props__ ||
                               Object.keys(instance);    // 遍历 instance，如果具有类型，才不会把 __type__ 也读进来
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
            }
            else if (value) {
                this._deserializeObjField(instance, value, propName);
            }
            else {
                instance[propName] = null;
            }
        }
    };

    function compileObjectTypeJit (sources, defaultValue, accessorToSet, propNameLiteralToSet, assumeHavePropIfIsValue) {
        if (defaultValue instanceof cc.ValueType) {
            // fast case
            if (!assumeHavePropIfIsValue) {
                sources.push('if(prop){');
            }
            var ctorCode = js.getClassName(defaultValue);
            sources.push(`s._deserializeTypedObject(o${accessorToSet},prop,${ctorCode});`);
            if (!assumeHavePropIfIsValue) {
                sources.push('}else o' + accessorToSet + '=null;');
            }
        }
        else {
            sources.push('if(prop){');
                sources.push('s._deserializeObjField(o,prop,' +
                                 propNameLiteralToSet +
                             ');');
            sources.push('}else o' + accessorToSet + '=null;');
        }
    }

    var compileDeserialize = CC_SUPPORT_JIT ? function (self, klass) {
        var TYPE = Attr.DELIMETER + 'type';
        var EDITOR_ONLY = Attr.DELIMETER + 'editorOnly';
        var DEFAULT = Attr.DELIMETER + 'default';
        var FORMERLY_SERIALIZED_AS = Attr.DELIMETER + 'formerlySerializedAs';
        var attrs = Attr.getClassAttrs(klass);

        var props = klass.__values__;
        // self, obj, serializedData, klass
        var sources = [
            'var prop;'
        ];
        var fastMode = misc.BUILTIN_CLASSID_RE.test(js._getClassId(klass));
        // sources.push('var vb,vn,vs,vo,vu,vf;');    // boolean, number, string, object, undefined, function
        for (var p = 0; p < props.length; p++) {
            var propName = props[p];
            if ((CC_PREVIEW || (CC_EDITOR && self._ignoreEditorOnly)) && attrs[propName + EDITOR_ONLY]) {
                continue;   // skip editor only if in preview
            }

            var accessorToSet, propNameLiteralToSet;
            if (CCClass.IDENTIFIER_RE.test(propName)) {
                propNameLiteralToSet = '"' + propName + '"';
                accessorToSet = '.' + propName;
            }
            else {
                propNameLiteralToSet = CCClass.escapeForJS(propName);
                accessorToSet = '[' + propNameLiteralToSet + ']';
            }

            var accessorToGet = accessorToSet;
            if (attrs[propName + FORMERLY_SERIALIZED_AS]) {
                var propNameToRead = attrs[propName + FORMERLY_SERIALIZED_AS];
                if (CCClass.IDENTIFIER_RE.test(propNameToRead)) {
                    accessorToGet = '.' + propNameToRead;
                }
                else {
                    accessorToGet = '[' + CCClass.escapeForJS(propNameToRead) + ']';
                }
            }

            sources.push('prop=d' + accessorToGet + ';');
            sources.push(`if(typeof ${CC_JSB || CC_RUNTIME ? '(prop)' : 'prop'}!=="undefined"){`);

            // function undefined object(null) string boolean number
            var defaultValue = CCClass.getDefault(attrs[propName + DEFAULT]);
            if (fastMode) {
                var isPrimitiveType;
                var userType = attrs[propName + TYPE];
                if (defaultValue === undefined && userType) {
                    isPrimitiveType = userType instanceof Attr.PrimitiveType;
                }
                else {
                    var defaultType = typeof defaultValue;
                    isPrimitiveType = defaultType === 'string' ||
                                      defaultType === 'number' ||
                                      defaultType === 'boolean';
                }

                if (isPrimitiveType) {
                    sources.push(`o${accessorToSet}=prop;`);
                }
                else {
                    compileObjectTypeJit(sources, defaultValue, accessorToSet, propNameLiteralToSet, true);
                }
            }
            else {
                sources.push(`if(typeof ${CC_JSB || CC_RUNTIME ? '(prop)' : 'prop'}!=="object"){` +
                                 'o' + accessorToSet + '=prop;' +
                             '}else{');
                compileObjectTypeJit(sources, defaultValue, accessorToSet, propNameLiteralToSet, false);
                sources.push('}');
            }
            sources.push('}');
        }
        if (cc.js.isChildClassOf(klass, cc._BaseNode) || cc.js.isChildClassOf(klass, cc.Component)) {
            if (CC_PREVIEW || (CC_EDITOR && self._ignoreEditorOnly)) {
                var mayUsedInPersistRoot = js.isChildClassOf(klass, cc.Node);
                if (mayUsedInPersistRoot) {
                    sources.push('d._id&&(o._id=d._id);');
                }
            }
            else {
                sources.push('d._id&&(o._id=d._id);');
            }
        }
        if (props[props.length - 1] === '_$erialized') {
            // deep copy original serialized data
            sources.push('o._$erialized=JSON.parse(JSON.stringify(d));');
            // parse the serialized data as primitive javascript object, so its __id__ will be dereferenced
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
                }
                // function undefined object(null) string boolean number
                var defaultValue = CCClass.getDefault(attrs[propName + DEFAULT]);
                var isPrimitiveType = false;
                if (fastMode) {
                    var userType = attrs[propName + TYPE];
                    if (defaultValue === undefined && userType) {
                        isPrimitiveType = userType instanceof Attr.PrimitiveType;
                    }
                    else {
                        var defaultType = typeof defaultValue;
                        isPrimitiveType = defaultType === 'string' ||
                                          defaultType === 'number' ||
                                          defaultType === 'boolean';
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
                }
                else {
                    if (propNameToRead !== propName && advancedPropsToRead === advancedProps) {
                        advancedPropsToRead = advancedProps.slice();
                    }
                    advancedProps.push(propName);
                    if (advancedPropsToRead !== advancedProps) {
                        advancedPropsToRead.push(propNameToRead);
                    }
                    advancedPropsValueType.push((defaultValue instanceof cc.ValueType) && defaultValue.constructor);
                }
            }
        })();

        return function (s, o, d, k) {
            for (let i = 0; i < simpleProps.length; ++i) {
                let prop = d[simplePropsToRead[i]];
                if (prop !== undefined) {
                    o[simpleProps[i]] = prop;
                }
            }
            for (let i = 0; i < advancedProps.length; ++i) {
                let propName = advancedProps[i];
                var prop = d[advancedPropsToRead[i]];
                if (prop === undefined) {
                    continue;
                }
                if (!fastMode && typeof prop !== 'object') {
                    o[propName] = prop;
                }
                else {
                    // fastMode (so will not simpleProp) or object
                    var valueTypeCtor = advancedPropsValueType[i];
                    if (valueTypeCtor) {
                        if (fastMode || prop) {
                            s._deserializeTypedObject(o[propName], prop, valueTypeCtor);
                        }
                        else {
                            o[propName] = null;
                        }
                    }
                    else {
                        if (prop) {
                            s._deserializeObjField(o, prop, propName);
                        }
                        else {
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
                o._$erialized = JSON.parse(JSON.stringify(d));
                // parse the serialized data as primitive javascript object, so its __id__ will be dereferenced
                s._deserializePrimitiveObject(o._$erialized, d);
            }
        }
    };

    function unlinkUnusedPrefab (self, serialized, obj) {
        var uuid = serialized['asset'] && serialized['asset'].__uuid__;
        if (uuid) {
            var last = self.result.uuidList.length - 1;
            if (self.result.uuidList[last] === uuid &&
                self.result.uuidObjList[last] === obj &&
                self.result.uuidPropList[last] === 'asset') {
                self.result.uuidList.pop();
                self.result.uuidObjList.pop();
                self.result.uuidPropList.pop();
            }
            else {
                var debugEnvOnlyInfo = 'Failed to skip prefab asset while deserializing PrefabInfo';
                cc.warn(debugEnvOnlyInfo);
            }
        }
    }

    function _deserializeFireClass (self, obj, serialized, klass) {
        var deserialize;
        if (klass.hasOwnProperty('__deserialize__')) {
            deserialize = klass.__deserialize__;
        }
        else {
            deserialize = compileDeserialize(self, klass);
            // if (CC_TEST && !isPhantomJS) {
            //     cc.log(deserialize);
            // }
            js.value(klass, '__deserialize__', deserialize, true);
        }
        deserialize(self, obj, serialized, klass);
        // if preview or build worker
        if (CC_PREVIEW || (CC_EDITOR && self._ignoreEditorOnly)) {
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
        }
        else {
            return new _Deserializer(result, classFinder, customEnv, ignoreEditorOnly);
        }
    };

    return _Deserializer;
})();

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
    }

    //var oldJson = JSON.stringify(data, null, 2);

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
    }

    //var afterJson = JSON.stringify(data, null, 2);
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
    }
    else {
        cc.warnID(5302, id);
    }
};