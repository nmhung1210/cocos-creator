
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/attribute.js';
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

var isPlainEmptyObj = require('./utils').isPlainEmptyObj_DEV;

var DELIMETER = '$_$';

function createAttrsSingle(owner, superAttrs) {
  var attrs = superAttrs ? Object.create(superAttrs) : {};
  js.value(owner, '__attrs__', attrs);
  return attrs;
} // subclass should not have __attrs__


function createAttrs(subclass) {
  if (typeof subclass !== 'function') {
    // attributes only in instance
    var instance = subclass;
    return createAttrsSingle(instance, getClassAttrs(instance.constructor));
  }

  var superClass;
  var chains = cc.Class.getInheritanceChain(subclass);

  for (var i = chains.length - 1; i >= 0; i--) {
    var cls = chains[i];

    var attrs = cls.hasOwnProperty('__attrs__') && cls.__attrs__;

    if (!attrs) {
      superClass = chains[i + 1];
      createAttrsSingle(cls, superClass && superClass.__attrs__);
    }
  }

  superClass = chains[0];
  createAttrsSingle(subclass, superClass && superClass.__attrs__);
  return subclass.__attrs__;
} // /**
//  * @class Class
//  */
//  *
//  * Tag the class with any meta attributes, then return all current attributes assigned to it.
//  * This function holds only the attributes, not their implementations.
//  *
//  * @method attr
//  * @param {Function|Object} ctor - the class or instance. If instance, the attribute will be dynamic and only available for the specified instance.
//  * @param {String} propName - the name of property or function, used to retrieve the attributes
//  * @param {Object} [newAttrs] - the attribute table to mark, new attributes will merged with existed attributes. Attribute whose key starts with '_' will be ignored.
//  * @static
//  * @private


function attr(ctor, propName, newAttrs) {
  var attrs = getClassAttrs(ctor);

  if (!CC_DEV || typeof newAttrs === 'undefined') {
    // get
    var prefix = propName + DELIMETER;
    var ret = {};

    for (var key in attrs) {
      if (key.startsWith(prefix)) {
        ret[key.slice(prefix.length)] = attrs[key];
      }
    }

    return ret;
  } else if (CC_DEV && typeof newAttrs === 'object') {
    // set
    cc.warn("`cc.Class.attr(obj, prop, { key: value });` is deprecated, use `cc.Class.Attr.setClassAttr(obj, prop, 'key', value);` instead please.");

    for (var _key in newAttrs) {
      attrs[propName + DELIMETER + _key] = newAttrs[_key];
    }
  }
} // returns a readonly meta object


function getClassAttrs(ctor) {
  return ctor.hasOwnProperty('__attrs__') && ctor.__attrs__ || createAttrs(ctor);
}

function setClassAttr(ctor, propName, key, value) {
  getClassAttrs(ctor)[propName + DELIMETER + key] = value;
}
/**
 * @module cc
 */


function PrimitiveType(name, def) {
  this.name = name;
  this["default"] = def;
}

PrimitiveType.prototype.toString = function () {
  return this.name;
};
/**
 * Specify that the input value must be integer in Inspector.
 * Also used to indicates that the elements in array should be type integer.
 * @property {string} Integer
 * @readonly
 * @example
 * // in cc.Class
 * member: {
 *     default: [],
 *     type: cc.Integer
 * }
 * // ES6 ccclass
 * @cc._decorator.property({
 *     type: cc.Integer
 * })
 * member = [];
 */


cc.Integer = new PrimitiveType('Integer', 0);
/**
 * Indicates that the elements in array should be type double.
 * @property {string} Float
 * @readonly
 * @example
 * // in cc.Class
 * member: {
 *     default: [],
 *     type: cc.Float
 * }
 * // ES6 ccclass
 * @cc._decorator.property({
 *     type: cc.Float
 * })
 * member = [];
 */

cc.Float = new PrimitiveType('Float', 0);

if (CC_EDITOR) {
  js.get(cc, 'Number', function () {
    cc.warnID(3603);
    return cc.Float;
  });
}
/**
 * Indicates that the elements in array should be type boolean.
 * @property {string} Boolean
 * @readonly
 * @example
 * // in cc.Class
 * member: {
 *     default: [],
 *     type: cc.Boolean
 * }
 * // ES6 ccclass
 * @cc._decorator.property({
 *     type: cc.Boolean
 * })
 * member = [];
 */


cc.Boolean = new PrimitiveType('Boolean', false);
/**
 * Indicates that the elements in array should be type string.
 * @property {string} String
 * @readonly
 * @example
 * // in cc.Class
 * member: {
 *     default: [],
 *     type: cc.String
 * }
 * // ES6 ccclass
 * @cc._decorator.property({
 *     type: cc.String
 * })
 * member = [];
 */

cc.String = new PrimitiveType('String', ''); // Ensures the type matches its default value

function getTypeChecker(type, attrName) {
  return function (constructor, mainPropName) {
    var propInfo = '"' + js.getClassName(constructor) + '.' + mainPropName + '"';
    var mainPropAttrs = attr(constructor, mainPropName);
    var mainPropAttrsType = mainPropAttrs.type;

    if (mainPropAttrsType === cc.Integer || mainPropAttrsType === cc.Float) {
      mainPropAttrsType = 'Number';
    } else if (mainPropAttrsType === cc.String || mainPropAttrsType === cc.Boolean) {
      mainPropAttrsType = '' + mainPropAttrsType;
    }

    if (mainPropAttrsType !== type) {
      cc.warnID(3604, propInfo);
      return;
    }

    if (!mainPropAttrs.hasOwnProperty('default')) {
      return;
    }

    var defaultVal = mainPropAttrs["default"];

    if (typeof defaultVal === 'undefined') {
      return;
    }

    var isContainer = Array.isArray(defaultVal) || isPlainEmptyObj(defaultVal);

    if (isContainer) {
      return;
    }

    var defaultType = typeof defaultVal;
    var type_lowerCase = type.toLowerCase();

    if (defaultType === type_lowerCase) {
      if (type_lowerCase === 'object') {
        if (defaultVal && !(defaultVal instanceof mainPropAttrs.ctor)) {
          cc.warnID(3605, propInfo, js.getClassName(mainPropAttrs.ctor));
        } else {
          return;
        }
      } else if (type !== 'Number') {
        cc.warnID(3606, attrName, propInfo, type);
      }
    } else if (defaultType !== 'function') {
      if (type === cc.String && defaultVal == null) {
        cc.warnID(3607, propInfo);
      } else {
        cc.warnID(3611, attrName, propInfo, defaultType);
      }
    } else {
      return;
    }

    delete mainPropAttrs.type;
  };
} // Ensures the type matches its default value


function getObjTypeChecker(typeCtor) {
  return function (classCtor, mainPropName) {
    getTypeChecker('Object', 'type')(classCtor, mainPropName); // check ValueType

    var defaultDef = getClassAttrs(classCtor)[mainPropName + DELIMETER + 'default'];

    var defaultVal = require('./CCClass').getDefault(defaultDef);

    if (!Array.isArray(defaultVal) && js.isChildClassOf(typeCtor, cc.ValueType)) {
      var typename = js.getClassName(typeCtor);
      var info = cc.js.formatStr('No need to specify the "type" of "%s.%s" because %s is a child class of ValueType.', js.getClassName(classCtor), mainPropName, typename);

      if (defaultDef) {
        cc.log(info);
      } else {
        cc.warnID(3612, info, typename, js.getClassName(classCtor), mainPropName, typename);
      }
    }
  };
}

module.exports = {
  PrimitiveType: PrimitiveType,
  attr: attr,
  getClassAttrs: getClassAttrs,
  setClassAttr: setClassAttr,
  DELIMETER: DELIMETER,
  getTypeChecker_ET: (CC_EDITOR && !Editor.isBuilder || CC_TEST) && getTypeChecker,
  getObjTypeChecker_ET: (CC_EDITOR && !Editor.isBuilder || CC_TEST) && getObjTypeChecker,
  ScriptUuid: {} // the value will be represented as a uuid string

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL2F0dHJpYnV0ZS5qcyJdLCJuYW1lcyI6WyJqcyIsInJlcXVpcmUiLCJpc1BsYWluRW1wdHlPYmoiLCJpc1BsYWluRW1wdHlPYmpfREVWIiwiREVMSU1FVEVSIiwiY3JlYXRlQXR0cnNTaW5nbGUiLCJvd25lciIsInN1cGVyQXR0cnMiLCJhdHRycyIsIk9iamVjdCIsImNyZWF0ZSIsInZhbHVlIiwiY3JlYXRlQXR0cnMiLCJzdWJjbGFzcyIsImluc3RhbmNlIiwiZ2V0Q2xhc3NBdHRycyIsImNvbnN0cnVjdG9yIiwic3VwZXJDbGFzcyIsImNoYWlucyIsImNjIiwiQ2xhc3MiLCJnZXRJbmhlcml0YW5jZUNoYWluIiwiaSIsImxlbmd0aCIsImNscyIsImhhc093blByb3BlcnR5IiwiX19hdHRyc19fIiwiYXR0ciIsImN0b3IiLCJwcm9wTmFtZSIsIm5ld0F0dHJzIiwiQ0NfREVWIiwicHJlZml4IiwicmV0Iiwia2V5Iiwic3RhcnRzV2l0aCIsInNsaWNlIiwid2FybiIsInNldENsYXNzQXR0ciIsIlByaW1pdGl2ZVR5cGUiLCJuYW1lIiwiZGVmIiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJJbnRlZ2VyIiwiRmxvYXQiLCJDQ19FRElUT1IiLCJnZXQiLCJ3YXJuSUQiLCJCb29sZWFuIiwiU3RyaW5nIiwiZ2V0VHlwZUNoZWNrZXIiLCJ0eXBlIiwiYXR0ck5hbWUiLCJtYWluUHJvcE5hbWUiLCJwcm9wSW5mbyIsImdldENsYXNzTmFtZSIsIm1haW5Qcm9wQXR0cnMiLCJtYWluUHJvcEF0dHJzVHlwZSIsImRlZmF1bHRWYWwiLCJpc0NvbnRhaW5lciIsIkFycmF5IiwiaXNBcnJheSIsImRlZmF1bHRUeXBlIiwidHlwZV9sb3dlckNhc2UiLCJ0b0xvd2VyQ2FzZSIsImdldE9ialR5cGVDaGVja2VyIiwidHlwZUN0b3IiLCJjbGFzc0N0b3IiLCJkZWZhdWx0RGVmIiwiZ2V0RGVmYXVsdCIsImlzQ2hpbGRDbGFzc09mIiwiVmFsdWVUeXBlIiwidHlwZW5hbWUiLCJpbmZvIiwiZm9ybWF0U3RyIiwibG9nIiwibW9kdWxlIiwiZXhwb3J0cyIsImdldFR5cGVDaGVja2VyX0VUIiwiRWRpdG9yIiwiaXNCdWlsZGVyIiwiQ0NfVEVTVCIsImdldE9ialR5cGVDaGVja2VyX0VUIiwiU2NyaXB0VXVpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkQsSUFBSUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFoQjs7QUFDQSxJQUFJQyxlQUFlLEdBQUdELE9BQU8sQ0FBQyxTQUFELENBQVAsQ0FBbUJFLG1CQUF6Qzs7QUFFQSxJQUFNQyxTQUFTLEdBQUcsS0FBbEI7O0FBRUEsU0FBU0MsaUJBQVQsQ0FBNEJDLEtBQTVCLEVBQW1DQyxVQUFuQyxFQUErQztBQUMzQyxNQUFJQyxLQUFLLEdBQUdELFVBQVUsR0FBR0UsTUFBTSxDQUFDQyxNQUFQLENBQWNILFVBQWQsQ0FBSCxHQUErQixFQUFyRDtBQUNBUCxFQUFBQSxFQUFFLENBQUNXLEtBQUgsQ0FBU0wsS0FBVCxFQUFnQixXQUFoQixFQUE2QkUsS0FBN0I7QUFDQSxTQUFPQSxLQUFQO0FBQ0gsRUFFRDs7O0FBQ0EsU0FBU0ksV0FBVCxDQUFzQkMsUUFBdEIsRUFBZ0M7QUFDNUIsTUFBSSxPQUFPQSxRQUFQLEtBQW9CLFVBQXhCLEVBQW9DO0FBQ2hDO0FBQ0EsUUFBSUMsUUFBUSxHQUFHRCxRQUFmO0FBQ0EsV0FBT1IsaUJBQWlCLENBQUNTLFFBQUQsRUFBV0MsYUFBYSxDQUFDRCxRQUFRLENBQUNFLFdBQVYsQ0FBeEIsQ0FBeEI7QUFDSDs7QUFDRCxNQUFJQyxVQUFKO0FBQ0EsTUFBSUMsTUFBTSxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBU0MsbUJBQVQsQ0FBNkJSLFFBQTdCLENBQWI7O0FBQ0EsT0FBSyxJQUFJUyxDQUFDLEdBQUdKLE1BQU0sQ0FBQ0ssTUFBUCxHQUFnQixDQUE3QixFQUFnQ0QsQ0FB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QUN3RCxZQUFILENBQWdCVyxRQUFoQixDQUFmO0FBQ0EsVUFBSU8sSUFBSSxHQUFHdkQsRUFBRSxDQUFDbkIsRUFBSCxDQUFNMkUsU0FBTixDQUFnQixvRkFBaEIsRUFDUDNFLEVBQUUsQ0FBQ3dELFlBQUgsQ0FBZ0JZLFNBQWhCLENBRE8sRUFDcUJkLFlBRHJCLEVBQ21DbUIsUUFEbkMsQ0FBWDs7QUFFQSxVQUFJSixVQUFKLEVBQWdCO0FBQ1psRCxRQUFBQSxFQUFFLENBQUN5RCxHQUFILENBQU9GLElBQVA7QUFDSCxPQUZELE1BR0s7QUFDRHZELFFBQUFBLEVBQUUsQ0FBQzZCLE1BQUgsQ0FBVSxJQUFWLEVBQWdCMEIsSUFBaEIsRUFBc0JELFFBQXRCLEVBQWdDekUsRUFBRSxDQUFDd0QsWUFBSCxDQUFnQlksU0FBaEIsQ0FBaEMsRUFBNERkLFlBQTVELEVBQTBFbUIsUUFBMUU7QUFDSDtBQUNKO0FBQ0osR0FoQkQ7QUFpQkg7O0FBRURJLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNidkMsRUFBQUEsYUFBYSxFQUFiQSxhQURhO0FBRWJaLEVBQUFBLElBQUksRUFBRUEsSUFGTztBQUdiWixFQUFBQSxhQUFhLEVBQUVBLGFBSEY7QUFJYnVCLEVBQUFBLFlBQVksRUFBRUEsWUFKRDtBQUtibEMsRUFBQUEsU0FBUyxFQUFFQSxTQUxFO0FBTWIyRSxFQUFBQSxpQkFBaUIsRUFBRSxDQUFFakMsU0FBUyxJQUFJLENBQUNrQyxNQUFNLENBQUNDLFNBQXRCLElBQW9DQyxPQUFyQyxLQUFpRC9CLGNBTnZEO0FBT2JnQyxFQUFBQSxvQkFBb0IsRUFBRSxDQUFFckMsU0FBUyxJQUFJLENBQUNrQyxNQUFNLENBQUNDLFNBQXRCLElBQW9DQyxPQUFyQyxLQUFpRGhCLGlCQVAxRDtBQVFia0IsRUFBQUEsVUFBVSxFQUFFLEVBUkMsQ0FRUTs7QUFSUixDQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIu+7vy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIGpzID0gcmVxdWlyZSgnLi9qcycpO1xudmFyIGlzUGxhaW5FbXB0eU9iaiA9IHJlcXVpcmUoJy4vdXRpbHMnKS5pc1BsYWluRW1wdHlPYmpfREVWO1xuXG5jb25zdCBERUxJTUVURVIgPSAnJF8kJztcblxuZnVuY3Rpb24gY3JlYXRlQXR0cnNTaW5nbGUgKG93bmVyLCBzdXBlckF0dHJzKSB7XG4gICAgdmFyIGF0dHJzID0gc3VwZXJBdHRycyA/IE9iamVjdC5jcmVhdGUoc3VwZXJBdHRycykgOiB7fTtcbiAgICBqcy52YWx1ZShvd25lciwgJ19fYXR0cnNfXycsIGF0dHJzKTtcbiAgICByZXR1cm4gYXR0cnM7XG59XG5cbi8vIHN1YmNsYXNzIHNob3VsZCBub3QgaGF2ZSBfX2F0dHJzX19cbmZ1bmN0aW9uIGNyZWF0ZUF0dHJzIChzdWJjbGFzcykge1xuICAgIGlmICh0eXBlb2Ygc3ViY2xhc3MgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gYXR0cmlidXRlcyBvbmx5IGluIGluc3RhbmNlXG4gICAgICAgIGxldCBpbnN0YW5jZSA9IHN1YmNsYXNzO1xuICAgICAgICByZXR1cm4gY3JlYXRlQXR0cnNTaW5nbGUoaW5zdGFuY2UsIGdldENsYXNzQXR0cnMoaW5zdGFuY2UuY29uc3RydWN0b3IpKTtcbiAgICB9XG4gICAgdmFyIHN1cGVyQ2xhc3M7XG4gICAgdmFyIGNoYWlucyA9IGNjLkNsYXNzLmdldEluaGVyaXRhbmNlQ2hhaW4oc3ViY2xhc3MpO1xuICAgIGZvciAodmFyIGkgPSBjaGFpbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgdmFyIGNscyA9IGNoYWluc1tpXTtcbiAgICAgICAgdmFyIGF0dHJzID0gY2xzLmhhc093blByb3BlcnR5KCdfX2F0dHJzX18nKSAmJiBjbHMuX19hdHRyc19fO1xuICAgICAgICBpZiAoIWF0dHJzKSB7XG4gICAgICAgICAgICBzdXBlckNsYXNzID0gY2hhaW5zW2kgKyAxXTtcbiAgICAgICAgICAgIGNyZWF0ZUF0dHJzU2luZ2xlKGNscywgc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLl9fYXR0cnNfXyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3VwZXJDbGFzcyA9IGNoYWluc1swXTtcbiAgICBjcmVhdGVBdHRyc1NpbmdsZShzdWJjbGFzcywgc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLl9fYXR0cnNfXyk7XG4gICAgcmV0dXJuIHN1YmNsYXNzLl9fYXR0cnNfXztcbn1cblxuLy8gLyoqXG4vLyAgKiBAY2xhc3MgQ2xhc3Ncbi8vICAqL1xuXG4vLyAgKlxuLy8gICogVGFnIHRoZSBjbGFzcyB3aXRoIGFueSBtZXRhIGF0dHJpYnV0ZXMsIHRoZW4gcmV0dXJuIGFsbCBjdXJyZW50IGF0dHJpYnV0ZXMgYXNzaWduZWQgdG8gaXQuXG4vLyAgKiBUaGlzIGZ1bmN0aW9uIGhvbGRzIG9ubHkgdGhlIGF0dHJpYnV0ZXMsIG5vdCB0aGVpciBpbXBsZW1lbnRhdGlvbnMuXG4vLyAgKlxuLy8gICogQG1ldGhvZCBhdHRyXG4vLyAgKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdH0gY3RvciAtIHRoZSBjbGFzcyBvciBpbnN0YW5jZS4gSWYgaW5zdGFuY2UsIHRoZSBhdHRyaWJ1dGUgd2lsbCBiZSBkeW5hbWljIGFuZCBvbmx5IGF2YWlsYWJsZSBmb3IgdGhlIHNwZWNpZmllZCBpbnN0YW5jZS5cbi8vICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wTmFtZSAtIHRoZSBuYW1lIG9mIHByb3BlcnR5IG9yIGZ1bmN0aW9uLCB1c2VkIHRvIHJldHJpZXZlIHRoZSBhdHRyaWJ1dGVzXG4vLyAgKiBAcGFyYW0ge09iamVjdH0gW25ld0F0dHJzXSAtIHRoZSBhdHRyaWJ1dGUgdGFibGUgdG8gbWFyaywgbmV3IGF0dHJpYnV0ZXMgd2lsbCBtZXJnZWQgd2l0aCBleGlzdGVkIGF0dHJpYnV0ZXMuIEF0dHJpYnV0ZSB3aG9zZSBrZXkgc3RhcnRzIHdpdGggJ18nIHdpbGwgYmUgaWdub3JlZC5cbi8vICAqIEBzdGF0aWNcbi8vICAqIEBwcml2YXRlXG5mdW5jdGlvbiBhdHRyIChjdG9yLCBwcm9wTmFtZSwgbmV3QXR0cnMpIHtcbiAgICB2YXIgYXR0cnMgPSBnZXRDbGFzc0F0dHJzKGN0b3IpO1xuICAgIGlmICghQ0NfREVWIHx8IHR5cGVvZiBuZXdBdHRycyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gZ2V0XG4gICAgICAgIHZhciBwcmVmaXggPSBwcm9wTmFtZSArIERFTElNRVRFUjtcbiAgICAgICAgdmFyIHJldCA9IHt9O1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYXR0cnMpIHtcbiAgICAgICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aChwcmVmaXgpKSB7XG4gICAgICAgICAgICAgICAgcmV0W2tleS5zbGljZShwcmVmaXgubGVuZ3RoKV0gPSBhdHRyc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKENDX0RFViAmJiB0eXBlb2YgbmV3QXR0cnMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIHNldFxuICAgICAgICBjYy53YXJuKGBcXGBjYy5DbGFzcy5hdHRyKG9iaiwgcHJvcCwgeyBrZXk6IHZhbHVlIH0pO1xcYCBpcyBkZXByZWNhdGVkLCB1c2UgXFxgY2MuQ2xhc3MuQXR0ci5zZXRDbGFzc0F0dHIob2JqLCBwcm9wLCAna2V5JywgdmFsdWUpO1xcYCBpbnN0ZWFkIHBsZWFzZS5gKTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG5ld0F0dHJzKSB7XG4gICAgICAgICAgICBhdHRyc1twcm9wTmFtZSArIERFTElNRVRFUiArIGtleV0gPSBuZXdBdHRyc1trZXldO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyByZXR1cm5zIGEgcmVhZG9ubHkgbWV0YSBvYmplY3RcbmZ1bmN0aW9uIGdldENsYXNzQXR0cnMgKGN0b3IpIHtcbiAgICByZXR1cm4gKGN0b3IuaGFzT3duUHJvcGVydHkoJ19fYXR0cnNfXycpICYmIGN0b3IuX19hdHRyc19fKSB8fCBjcmVhdGVBdHRycyhjdG9yKTtcbn1cblxuZnVuY3Rpb24gc2V0Q2xhc3NBdHRyIChjdG9yLCBwcm9wTmFtZSwga2V5LCB2YWx1ZSkge1xuICAgIGdldENsYXNzQXR0cnMoY3RvcilbcHJvcE5hbWUgKyBERUxJTUVURVIgKyBrZXldID0gdmFsdWU7XG59XG5cbi8qKlxuICogQG1vZHVsZSBjY1xuICovXG5cbmZ1bmN0aW9uIFByaW1pdGl2ZVR5cGUgKG5hbWUsIGRlZikge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kZWZhdWx0ID0gZGVmO1xufVxuUHJpbWl0aXZlVHlwZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbn07XG5cbi8qKlxuICogU3BlY2lmeSB0aGF0IHRoZSBpbnB1dCB2YWx1ZSBtdXN0IGJlIGludGVnZXIgaW4gSW5zcGVjdG9yLlxuICogQWxzbyB1c2VkIHRvIGluZGljYXRlcyB0aGF0IHRoZSBlbGVtZW50cyBpbiBhcnJheSBzaG91bGQgYmUgdHlwZSBpbnRlZ2VyLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEludGVnZXJcbiAqIEByZWFkb25seVxuICogQGV4YW1wbGVcbiAqIC8vIGluIGNjLkNsYXNzXG4gKiBtZW1iZXI6IHtcbiAqICAgICBkZWZhdWx0OiBbXSxcbiAqICAgICB0eXBlOiBjYy5JbnRlZ2VyXG4gKiB9XG4gKiAvLyBFUzYgY2NjbGFzc1xuICogQGNjLl9kZWNvcmF0b3IucHJvcGVydHkoe1xuICogICAgIHR5cGU6IGNjLkludGVnZXJcbiAqIH0pXG4gKiBtZW1iZXIgPSBbXTtcbiAqL1xuY2MuSW50ZWdlciA9IG5ldyBQcmltaXRpdmVUeXBlKCdJbnRlZ2VyJywgMCk7XG5cbi8qKlxuICogSW5kaWNhdGVzIHRoYXQgdGhlIGVsZW1lbnRzIGluIGFycmF5IHNob3VsZCBiZSB0eXBlIGRvdWJsZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBGbG9hdFxuICogQHJlYWRvbmx5XG4gKiBAZXhhbXBsZVxuICogLy8gaW4gY2MuQ2xhc3NcbiAqIG1lbWJlcjoge1xuICogICAgIGRlZmF1bHQ6IFtdLFxuICogICAgIHR5cGU6IGNjLkZsb2F0XG4gKiB9XG4gKiAvLyBFUzYgY2NjbGFzc1xuICogQGNjLl9kZWNvcmF0b3IucHJvcGVydHkoe1xuICogICAgIHR5cGU6IGNjLkZsb2F0XG4gKiB9KVxuICogbWVtYmVyID0gW107XG4gKi9cbmNjLkZsb2F0ID0gbmV3IFByaW1pdGl2ZVR5cGUoJ0Zsb2F0JywgMCk7XG5cbmlmIChDQ19FRElUT1IpIHtcbiAgICBqcy5nZXQoY2MsICdOdW1iZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLndhcm5JRCgzNjAzKTtcbiAgICAgICAgcmV0dXJuIGNjLkZsb2F0O1xuICAgIH0pO1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB0aGF0IHRoZSBlbGVtZW50cyBpbiBhcnJheSBzaG91bGQgYmUgdHlwZSBib29sZWFuLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IEJvb2xlYW5cbiAqIEByZWFkb25seVxuICogQGV4YW1wbGVcbiAqIC8vIGluIGNjLkNsYXNzXG4gKiBtZW1iZXI6IHtcbiAqICAgICBkZWZhdWx0OiBbXSxcbiAqICAgICB0eXBlOiBjYy5Cb29sZWFuXG4gKiB9XG4gKiAvLyBFUzYgY2NjbGFzc1xuICogQGNjLl9kZWNvcmF0b3IucHJvcGVydHkoe1xuICogICAgIHR5cGU6IGNjLkJvb2xlYW5cbiAqIH0pXG4gKiBtZW1iZXIgPSBbXTtcbiAqL1xuY2MuQm9vbGVhbiA9IG5ldyBQcmltaXRpdmVUeXBlKCdCb29sZWFuJywgZmFsc2UpO1xuXG4vKipcbiAqIEluZGljYXRlcyB0aGF0IHRoZSBlbGVtZW50cyBpbiBhcnJheSBzaG91bGQgYmUgdHlwZSBzdHJpbmcuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gU3RyaW5nXG4gKiBAcmVhZG9ubHlcbiAqIEBleGFtcGxlXG4gKiAvLyBpbiBjYy5DbGFzc1xuICogbWVtYmVyOiB7XG4gKiAgICAgZGVmYXVsdDogW10sXG4gKiAgICAgdHlwZTogY2MuU3RyaW5nXG4gKiB9XG4gKiAvLyBFUzYgY2NjbGFzc1xuICogQGNjLl9kZWNvcmF0b3IucHJvcGVydHkoe1xuICogICAgIHR5cGU6IGNjLlN0cmluZ1xuICogfSlcbiAqIG1lbWJlciA9IFtdO1xuICovXG5jYy5TdHJpbmcgPSBuZXcgUHJpbWl0aXZlVHlwZSgnU3RyaW5nJywgJycpO1xuXG4vLyBFbnN1cmVzIHRoZSB0eXBlIG1hdGNoZXMgaXRzIGRlZmF1bHQgdmFsdWVcbmZ1bmN0aW9uIGdldFR5cGVDaGVja2VyICh0eXBlLCBhdHRyTmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoY29uc3RydWN0b3IsIG1haW5Qcm9wTmFtZSkge1xuICAgICAgICB2YXIgcHJvcEluZm8gPSAnXCInICsganMuZ2V0Q2xhc3NOYW1lKGNvbnN0cnVjdG9yKSArICcuJyArIG1haW5Qcm9wTmFtZSArICdcIic7XG4gICAgICAgIHZhciBtYWluUHJvcEF0dHJzID0gYXR0cihjb25zdHJ1Y3RvciwgbWFpblByb3BOYW1lKTtcblxuICAgICAgICB2YXIgbWFpblByb3BBdHRyc1R5cGUgPSBtYWluUHJvcEF0dHJzLnR5cGU7XG4gICAgICAgIGlmIChtYWluUHJvcEF0dHJzVHlwZSA9PT0gY2MuSW50ZWdlciB8fCBtYWluUHJvcEF0dHJzVHlwZSA9PT0gY2MuRmxvYXQpIHtcbiAgICAgICAgICAgIG1haW5Qcm9wQXR0cnNUeXBlID0gJ051bWJlcic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobWFpblByb3BBdHRyc1R5cGUgPT09IGNjLlN0cmluZyB8fCBtYWluUHJvcEF0dHJzVHlwZSA9PT0gY2MuQm9vbGVhbikge1xuICAgICAgICAgICAgbWFpblByb3BBdHRyc1R5cGUgPSAnJyArIG1haW5Qcm9wQXR0cnNUeXBlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYWluUHJvcEF0dHJzVHlwZSAhPT0gdHlwZSkge1xuICAgICAgICAgICAgY2Mud2FybklEKDM2MDQsIHByb3BJbmZvKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbWFpblByb3BBdHRycy5oYXNPd25Qcm9wZXJ0eSgnZGVmYXVsdCcpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlZmF1bHRWYWwgPSBtYWluUHJvcEF0dHJzLmRlZmF1bHQ7XG4gICAgICAgIGlmICh0eXBlb2YgZGVmYXVsdFZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXNDb250YWluZXIgPSBBcnJheS5pc0FycmF5KGRlZmF1bHRWYWwpIHx8IGlzUGxhaW5FbXB0eU9iaihkZWZhdWx0VmFsKTtcbiAgICAgICAgaWYgKGlzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlZmF1bHRUeXBlID0gdHlwZW9mIGRlZmF1bHRWYWw7XG4gICAgICAgIHZhciB0eXBlX2xvd2VyQ2FzZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKGRlZmF1bHRUeXBlID09PSB0eXBlX2xvd2VyQ2FzZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVfbG93ZXJDYXNlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0VmFsICYmICEoZGVmYXVsdFZhbCBpbnN0YW5jZW9mIG1haW5Qcm9wQXR0cnMuY3RvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybklEKDM2MDUsIHByb3BJbmZvLCBqcy5nZXRDbGFzc05hbWUobWFpblByb3BBdHRycy5jdG9yKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZSAhPT0gJ051bWJlcicpIHtcbiAgICAgICAgICAgICAgICBjYy53YXJuSUQoMzYwNiwgYXR0ck5hbWUsIHByb3BJbmZvLCB0eXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZWZhdWx0VHlwZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09IGNjLlN0cmluZyAmJiBkZWZhdWx0VmFsID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjYy53YXJuSUQoMzYwNywgcHJvcEluZm8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybklEKDM2MTEsIGF0dHJOYW1lLCBwcm9wSW5mbywgZGVmYXVsdFR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBtYWluUHJvcEF0dHJzLnR5cGU7XG4gICAgfTtcbn1cblxuLy8gRW5zdXJlcyB0aGUgdHlwZSBtYXRjaGVzIGl0cyBkZWZhdWx0IHZhbHVlXG5mdW5jdGlvbiBnZXRPYmpUeXBlQ2hlY2tlciAodHlwZUN0b3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNsYXNzQ3RvciwgbWFpblByb3BOYW1lKSB7XG4gICAgICAgIGdldFR5cGVDaGVja2VyKCdPYmplY3QnLCAndHlwZScpKGNsYXNzQ3RvciwgbWFpblByb3BOYW1lKTtcbiAgICAgICAgLy8gY2hlY2sgVmFsdWVUeXBlXG4gICAgICAgIHZhciBkZWZhdWx0RGVmID0gZ2V0Q2xhc3NBdHRycyhjbGFzc0N0b3IpW21haW5Qcm9wTmFtZSArIERFTElNRVRFUiArICdkZWZhdWx0J107XG4gICAgICAgIHZhciBkZWZhdWx0VmFsID0gcmVxdWlyZSgnLi9DQ0NsYXNzJykuZ2V0RGVmYXVsdChkZWZhdWx0RGVmKTtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGRlZmF1bHRWYWwpICYmIGpzLmlzQ2hpbGRDbGFzc09mKHR5cGVDdG9yLCBjYy5WYWx1ZVR5cGUpKSB7XG4gICAgICAgICAgICB2YXIgdHlwZW5hbWUgPSBqcy5nZXRDbGFzc05hbWUodHlwZUN0b3IpO1xuICAgICAgICAgICAgdmFyIGluZm8gPSBjYy5qcy5mb3JtYXRTdHIoJ05vIG5lZWQgdG8gc3BlY2lmeSB0aGUgXCJ0eXBlXCIgb2YgXCIlcy4lc1wiIGJlY2F1c2UgJXMgaXMgYSBjaGlsZCBjbGFzcyBvZiBWYWx1ZVR5cGUuJyxcbiAgICAgICAgICAgICAgICBqcy5nZXRDbGFzc05hbWUoY2xhc3NDdG9yKSwgbWFpblByb3BOYW1lLCB0eXBlbmFtZSk7XG4gICAgICAgICAgICBpZiAoZGVmYXVsdERlZikge1xuICAgICAgICAgICAgICAgIGNjLmxvZyhpbmZvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLndhcm5JRCgzNjEyLCBpbmZvLCB0eXBlbmFtZSwganMuZ2V0Q2xhc3NOYW1lKGNsYXNzQ3RvciksIG1haW5Qcm9wTmFtZSwgdHlwZW5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgUHJpbWl0aXZlVHlwZSxcbiAgICBhdHRyOiBhdHRyLFxuICAgIGdldENsYXNzQXR0cnM6IGdldENsYXNzQXR0cnMsXG4gICAgc2V0Q2xhc3NBdHRyOiBzZXRDbGFzc0F0dHIsXG4gICAgREVMSU1FVEVSOiBERUxJTUVURVIsXG4gICAgZ2V0VHlwZUNoZWNrZXJfRVQ6ICgoQ0NfRURJVE9SICYmICFFZGl0b3IuaXNCdWlsZGVyKSB8fCBDQ19URVNUKSAmJiBnZXRUeXBlQ2hlY2tlcixcbiAgICBnZXRPYmpUeXBlQ2hlY2tlcl9FVDogKChDQ19FRElUT1IgJiYgIUVkaXRvci5pc0J1aWxkZXIpIHx8IENDX1RFU1QpICYmIGdldE9ialR5cGVDaGVja2VyLFxuICAgIFNjcmlwdFV1aWQ6IHt9LCAgICAgIC8vIHRoZSB2YWx1ZSB3aWxsIGJlIHJlcHJlc2VudGVkIGFzIGEgdXVpZCBzdHJpbmdcbn07XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==