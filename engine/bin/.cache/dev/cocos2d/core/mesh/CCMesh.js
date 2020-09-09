
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/mesh/CCMesh.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _inputAssembler = _interopRequireDefault(require("../../renderer/core/input-assembler"));

var _gfx = _interopRequireDefault(require("../../renderer/gfx"));

var _meshData = require("./mesh-data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
var renderer = require('../renderer');

var EventTarget = require('../event/event-target');

function applyColor(data, offset, value) {
  data[offset] = value._val;
}

function applyVec2(data, offset, value) {
  data[offset] = value.x;
  data[offset + 1] = value.y;
}

function applyVec3(data, offset, value) {
  data[offset] = value.x;
  data[offset + 1] = value.y;
  data[offset + 2] = value.z;
}

var _compType2fn = {
  5120: 'getInt8',
  5121: 'getUint8',
  5122: 'getInt16',
  5123: 'getUint16',
  5124: 'getInt32',
  5125: 'getUint32',
  5126: 'getFloat32'
};
var _compType2write = {
  5120: 'setInt8',
  5121: 'setUint8',
  5122: 'setInt16',
  5123: 'setUint16',
  5124: 'setInt32',
  5125: 'setUint32',
  5126: 'setFloat32'
}; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView#Endianness

var littleEndian = function () {
  var buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true); // Int16Array uses the platform's endianness.

  return new Int16Array(buffer)[0] === 256;
}();
/**
* @module cc
*/

/**
 * !#en Mesh Asset.
 * !#zh 网格资源。
 * @class Mesh
 * @extends Asset
 * @uses EventTarget
 */


var Mesh = cc.Class({
  name: 'cc.Mesh',
  "extends": cc.Asset,
  mixins: [EventTarget],
  properties: {
    _nativeAsset: {
      override: true,
      get: function get() {
        return this._buffer;
      },
      set: function set(bin) {
        this._buffer = ArrayBuffer.isView(bin) ? bin.buffer : bin;
        this.initWithBuffer();
      }
    },
    _vertexBundles: {
      "default": null,
      type: _meshData.VertexBundle
    },
    _primitives: {
      "default": null,
      Primitive: _meshData.Primitive
    },
    _minPos: cc.v3(),
    _maxPos: cc.v3(),

    /**
     * !#en Get ir set the sub meshes.
     * !#zh 设置或者获取子网格。
     * @property {[InputAssembler]} subMeshes
     */
    subMeshes: {
      get: function get() {
        return this._subMeshes;
      },
      set: function set(v) {
        this._subMeshes = v;
      }
    },
    subDatas: {
      get: function get() {
        return this._subDatas;
      }
    }
  },
  ctor: function ctor() {
    this._subMeshes = [];
    this._subDatas = [];
    this.loaded = false;
  },
  initWithBuffer: function initWithBuffer() {
    this._subMeshes.length = 0;
    var primitives = this._primitives;

    for (var i = 0; i < primitives.length; i++) {
      var primitive = primitives[i]; // ib

      var ibrange = primitive.data;
      var ibData = new Uint8Array(this._buffer, ibrange.offset, ibrange.length); // vb

      var vertexBundle = this._vertexBundles[primitive.vertexBundleIndices[0]];
      var vbRange = vertexBundle.data;
      var gfxVFmt = new _gfx["default"].VertexFormat(vertexBundle.formats); // Mesh binary may have several data format, must use Uint8Array to store data.

      var vbData = new Uint8Array(this._buffer, vbRange.offset, vbRange.length);

      var canBatch = this._canVertexFormatBatch(gfxVFmt);

      var meshData = new _meshData.MeshData();
      meshData.vData = vbData;
      meshData.iData = ibData;
      meshData.vfm = gfxVFmt;
      meshData.offset = vbRange.offset;
      meshData.canBatch = canBatch;

      this._subDatas.push(meshData);

      if (CC_JSB && CC_NATIVERENDERER) {
        meshData.vDirty = true;
      } else {
        var vbBuffer = new _gfx["default"].VertexBuffer(renderer.device, gfxVFmt, _gfx["default"].USAGE_STATIC, vbData);
        var ibBuffer = new _gfx["default"].IndexBuffer(renderer.device, primitive.indexUnit, _gfx["default"].USAGE_STATIC, ibData); // create sub meshes

        this._subMeshes.push(new _inputAssembler["default"](vbBuffer, ibBuffer));
      }
    }

    this.loaded = true;
    this.emit('load');
  },
  _canVertexFormatBatch: function _canVertexFormatBatch(format) {
    var aPosition = format._attr2el[_gfx["default"].ATTR_POSITION];
    var canBatch = !aPosition || aPosition.type === _gfx["default"].ATTR_TYPE_FLOAT32 && format._bytes % 4 === 0;
    return canBatch;
  },

  /**
   * !#en
   * Init vertex buffer according to the vertex format.
   * !#zh
   * 根据顶点格式初始化顶点内存。
   * @method init
   * @param {gfx.VertexFormat} vertexFormat - vertex format
   * @param {Number} vertexCount - how much vertex should be create in this buffer.
   * @param {Boolean} [dynamic] - whether or not to use dynamic buffer.
   * @param {Boolean} [index]
   */
  init: function init(vertexFormat, vertexCount, dynamic, index) {
    if (dynamic === void 0) {
      dynamic = false;
    }

    if (index === void 0) {
      index = 0;
    }

    var data = new Uint8Array(vertexFormat._bytes * vertexCount);
    var meshData = new _meshData.MeshData();
    meshData.vData = data;
    meshData.vfm = vertexFormat;
    meshData.vDirty = true;
    meshData.canBatch = this._canVertexFormatBatch(vertexFormat);

    if (!(CC_JSB && CC_NATIVERENDERER)) {
      var vb = new _gfx["default"].VertexBuffer(renderer.device, vertexFormat, dynamic ? _gfx["default"].USAGE_DYNAMIC : _gfx["default"].USAGE_STATIC, data);
      meshData.vb = vb;
      this._subMeshes[index] = new _inputAssembler["default"](meshData.vb);
    }

    var oldSubData = this._subDatas[index];

    if (oldSubData) {
      if (oldSubData.vb) {
        oldSubData.vb.destroy();
      }

      if (oldSubData.ib) {
        oldSubData.ib.destroy();
      }
    }

    this._subDatas[index] = meshData;
    this.loaded = true;
    this.emit('load');
    this.emit('init-format');
  },

  /**
   * !#en
   * Set the vertex values.
   * !#zh 
   * 设置顶点数据
   * @method setVertices
   * @param {String} name - the attribute name, e.g. gfx.ATTR_POSITION
   * @param {[Vec2] | [Vec3] | [Color] | [Number] | Uint8Array | Float32Array} values - the vertex values
   */
  setVertices: function setVertices(name, values, index) {
    index = index || 0;
    var subData = this._subDatas[index];
    var el = subData.vfm.element(name);

    if (!el) {
      return cc.warn("Cannot find " + name + " attribute in vertex defines.");
    } // whether the values is expanded


    var isFlatMode = typeof values[0] === 'number';
    var elNum = el.num;
    var verticesCount = isFlatMode ? values.length / elNum | 0 : values.length;

    if (subData.vData.byteLength < verticesCount * el.stride) {
      subData.setVData(new Uint8Array(verticesCount * subData.vfm._bytes));
    }

    var data;
    var bytes = 4;

    if (name === _gfx["default"].ATTR_COLOR) {
      if (!isFlatMode) {
        data = subData.getVData(Uint32Array);
      } else {
        data = subData.getVData();
        bytes = 1;
      }
    } else {
      data = subData.getVData(Float32Array);
    }

    var stride = el.stride / bytes;
    var offset = el.offset / bytes;

    if (isFlatMode) {
      for (var i = 0, l = values.length / elNum; i < l; i++) {
        var sOffset = i * elNum;
        var dOffset = i * stride + offset;

        for (var j = 0; j < elNum; j++) {
          data[dOffset + j] = values[sOffset + j];
        }
      }
    } else {
      var applyFunc;

      if (name === _gfx["default"].ATTR_COLOR) {
        applyFunc = applyColor;
      } else {
        if (elNum === 2) {
          applyFunc = applyVec2;
        } else {
          applyFunc = applyVec3;
        }
      }

      for (var _i = 0, _l = values.length; _i < _l; _i++) {
        var v = values[_i];
        var vOffset = _i * stride + offset;
        applyFunc(data, vOffset, v);
      }
    }

    subData.vDirty = true;
  },

  /**
   * !#en
   * Set the sub mesh indices.
   * !#zh
   * 设置子网格索引。
   * @method setIndices
   * @param {[Number]|Uint16Array|Uint8Array} indices - the sub mesh indices.
   * @param {Number} [index] - sub mesh index.
   * @param {Boolean} [dynamic] - whether or not to use dynamic buffer.
   */
  setIndices: function setIndices(indices, index, dynamic) {
    index = index || 0;
    var iData = indices;

    if (indices instanceof Uint16Array) {
      iData = new Uint8Array(indices.buffer, indices.byteOffset, indices.byteLength);
    } else if (Array.isArray(indices)) {
      iData = new Uint16Array(indices);
      iData = new Uint8Array(iData.buffer, iData.byteOffset, iData.byteLength);
    }

    var usage = dynamic ? _gfx["default"].USAGE_DYNAMIC : _gfx["default"].USAGE_STATIC;
    var subData = this._subDatas[index];

    if (!subData.ib) {
      subData.iData = iData;

      if (!(CC_JSB && CC_NATIVERENDERER)) {
        var buffer = new _gfx["default"].IndexBuffer(renderer.device, _gfx["default"].INDEX_FMT_UINT16, usage, iData, iData.byteLength / _gfx["default"].IndexBuffer.BYTES_PER_INDEX[_gfx["default"].INDEX_FMT_UINT16]);
        subData.ib = buffer;
        this._subMeshes[index]._indexBuffer = subData.ib;
      }
    } else {
      subData.iData = iData;
      subData.iDirty = true;
    }
  },

  /**
   * !#en
   * Set the sub mesh primitive type.
   * !#zh
   * 设置子网格绘制线条的方式。
   * @method setPrimitiveType
   * @param {Number} type 
   * @param {Number} index 
   */
  setPrimitiveType: function setPrimitiveType(type, index) {
    index = index || 0;
    var subMesh = this._subMeshes[index];

    if (!subMesh) {
      cc.warn("Do not have sub mesh at index " + index);
      return;
    }

    this._subMeshes[index]._primitiveType = type;
  },

  /** 
   * !#en
   * Clear the buffer data.
   * !#zh
   * 清除网格创建的内存数据。
   * @method clear
  */
  clear: function clear() {
    this._subMeshes.length = 0;
    var subDatas = this._subDatas;

    for (var i = 0, len = subDatas.length; i < len; i++) {
      var vb = subDatas[i].vb;

      if (vb) {
        vb.destroy();
      }

      var ib = subDatas[i].ib;

      if (ib) {
        ib.destroy();
      }
    }

    subDatas.length = 0;
  },

  /**
   * !#en Set mesh bounding box
   * !#zh 设置网格的包围盒
   * @method setBoundingBox
   * @param {Vec3} min 
   * @param {Vec3} max 
   */
  setBoundingBox: function setBoundingBox(min, max) {
    this._minPos = min;
    this._maxPos = max;
  },
  destroy: function destroy() {
    this.clear();
  },
  _uploadData: function _uploadData() {
    var subDatas = this._subDatas;

    for (var i = 0, len = subDatas.length; i < len; i++) {
      var subData = subDatas[i];

      if (subData.vDirty) {
        var buffer = subData.vb,
            data = subData.vData;
        buffer.update(0, data);
        subData.vDirty = false;
      }

      if (subData.iDirty) {
        var _buffer = subData.ib,
            _data = subData.iData;

        _buffer.update(0, _data);

        subData.iDirty = false;
      }
    }
  },
  _getAttrMeshData: function _getAttrMeshData(subDataIndex, name) {
    var subData = this._subDatas[subDataIndex];
    if (!subData) return [];
    var format = subData.vfm;
    var fmt = format.element(name);
    if (!fmt) return [];

    if (!subData.attrDatas) {
      subData.attrDatas = {};
    }

    var attrDatas = subData.attrDatas;
    var data = attrDatas[name];

    if (data) {
      return data;
    } else {
      data = attrDatas[name] = [];
    }

    var vbData = subData.vData;
    var dv = new DataView(vbData.buffer, vbData.byteOffset, vbData.byteLength);
    var stride = fmt.stride;
    var eleOffset = fmt.offset;
    var eleNum = fmt.num;
    var eleByte = fmt.bytes / eleNum;
    var fn = _compType2fn[fmt.type];
    var vertexCount = vbData.byteLength / format._bytes;

    for (var i = 0; i < vertexCount; i++) {
      var offset = i * stride + eleOffset;

      for (var j = 0; j < eleNum; j++) {
        var v = dv[fn](offset + j * eleByte, littleEndian);
        data.push(v);
      }
    }

    return data;
  },

  /**
   * !#en Read the specified attributes of the subgrid into the target buffer.
   * !#zh 读取子网格的指定属性到目标缓冲区中。
   * @param {Number} primitiveIndex The subgrid index.
   * @param {String} attributeName attribute name.
   * @param {ArrayBuffer} buffer The target buffer.
   * @param {Number} stride The byte interval between adjacent attributes in the target buffer.
   * @param {Number} offset The offset of the first attribute in the target buffer.
   * @returns {Boolean} If the specified sub-grid does not exist, the sub-grid does not exist, or the specified attribute cannot be read, return `false`, otherwise return` true`.
   * @method copyAttribute
   */
  copyAttribute: function copyAttribute(primitiveIndex, attributeName, buffer, stride, offset) {
    var written = false;
    var subData = this._subDatas[primitiveIndex];
    if (!subData) return written;
    var format = subData.vfm;
    var fmt = format.element(attributeName);
    if (!fmt) return written;
    var writter = _compType2write[fmt.type];
    if (!writter) return written;

    var data = this._getAttrMeshData(primitiveIndex, attributeName);

    var vertexCount = subData.vData.byteLength / format._bytes;
    var eleByte = fmt.bytes / fmt.num;

    if (data.length > 0) {
      var outputView = new DataView(buffer, offset);
      var outputStride = stride;
      var num = fmt.num;

      for (var i = 0; i < vertexCount; ++i) {
        var index = i * num;

        for (var j = 0; j < num; ++j) {
          var inputOffset = index + j;
          var outputOffset = outputStride * i + eleByte * j;
          outputView[writter](outputOffset, data[inputOffset], littleEndian);
        }
      }

      written = true;
    }

    return written;
  },

  /**
   * !#en Read the index data of the subgrid into the target array.
   * !#zh 读取子网格的索引数据到目标数组中。
   * @param {Number} primitiveIndex The subgrid index.
   * @param {TypedArray} outputArray The target array.
   * @returns {Boolean} returns `false` if the specified sub-grid does not exist or the sub-grid does not have index data, otherwise returns` true`.
   * @method copyIndices
   */
  copyIndices: function copyIndices(primitiveIndex, outputArray) {
    var subData = this._subDatas[primitiveIndex];
    if (!subData) return false;
    var iData = subData.iData;
    var indexCount = iData.length / 2;
    var dv = new DataView(iData.buffer, iData.byteOffset, iData.byteLength);
    var fn = _compType2fn[_gfx["default"].INDEX_FMT_UINT8];

    for (var i = 0; i < indexCount; ++i) {
      outputArray[i] = dv[fn](i * 2);
    }

    return true;
  }
});
cc.Mesh = module.exports = Mesh;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL21lc2gvQ0NNZXNoLmpzIl0sIm5hbWVzIjpbInJlbmRlcmVyIiwicmVxdWlyZSIsIkV2ZW50VGFyZ2V0IiwiYXBwbHlDb2xvciIsImRhdGEiLCJvZmZzZXQiLCJ2YWx1ZSIsIl92YWwiLCJhcHBseVZlYzIiLCJ4IiwieSIsImFwcGx5VmVjMyIsInoiLCJfY29tcFR5cGUyZm4iLCJfY29tcFR5cGUyd3JpdGUiLCJsaXR0bGVFbmRpYW4iLCJidWZmZXIiLCJBcnJheUJ1ZmZlciIsIkRhdGFWaWV3Iiwic2V0SW50MTYiLCJJbnQxNkFycmF5IiwiTWVzaCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQXNzZXQiLCJtaXhpbnMiLCJwcm9wZXJ0aWVzIiwiX25hdGl2ZUFzc2V0Iiwib3ZlcnJpZGUiLCJnZXQiLCJfYnVmZmVyIiwic2V0IiwiYmluIiwiaXNWaWV3IiwiaW5pdFdpdGhCdWZmZXIiLCJfdmVydGV4QnVuZGxlcyIsInR5cGUiLCJWZXJ0ZXhCdW5kbGUiLCJfcHJpbWl0aXZlcyIsIlByaW1pdGl2ZSIsIl9taW5Qb3MiLCJ2MyIsIl9tYXhQb3MiLCJzdWJNZXNoZXMiLCJfc3ViTWVzaGVzIiwidiIsInN1YkRhdGFzIiwiX3N1YkRhdGFzIiwiY3RvciIsImxvYWRlZCIsImxlbmd0aCIsInByaW1pdGl2ZXMiLCJpIiwicHJpbWl0aXZlIiwiaWJyYW5nZSIsImliRGF0YSIsIlVpbnQ4QXJyYXkiLCJ2ZXJ0ZXhCdW5kbGUiLCJ2ZXJ0ZXhCdW5kbGVJbmRpY2VzIiwidmJSYW5nZSIsImdmeFZGbXQiLCJnZngiLCJWZXJ0ZXhGb3JtYXQiLCJmb3JtYXRzIiwidmJEYXRhIiwiY2FuQmF0Y2giLCJfY2FuVmVydGV4Rm9ybWF0QmF0Y2giLCJtZXNoRGF0YSIsIk1lc2hEYXRhIiwidkRhdGEiLCJpRGF0YSIsInZmbSIsInB1c2giLCJDQ19KU0IiLCJDQ19OQVRJVkVSRU5ERVJFUiIsInZEaXJ0eSIsInZiQnVmZmVyIiwiVmVydGV4QnVmZmVyIiwiZGV2aWNlIiwiVVNBR0VfU1RBVElDIiwiaWJCdWZmZXIiLCJJbmRleEJ1ZmZlciIsImluZGV4VW5pdCIsIklucHV0QXNzZW1ibGVyIiwiZW1pdCIsImZvcm1hdCIsImFQb3NpdGlvbiIsIl9hdHRyMmVsIiwiQVRUUl9QT1NJVElPTiIsIkFUVFJfVFlQRV9GTE9BVDMyIiwiX2J5dGVzIiwiaW5pdCIsInZlcnRleEZvcm1hdCIsInZlcnRleENvdW50IiwiZHluYW1pYyIsImluZGV4IiwidmIiLCJVU0FHRV9EWU5BTUlDIiwib2xkU3ViRGF0YSIsImRlc3Ryb3kiLCJpYiIsInNldFZlcnRpY2VzIiwidmFsdWVzIiwic3ViRGF0YSIsImVsIiwiZWxlbWVudCIsIndhcm4iLCJpc0ZsYXRNb2RlIiwiZWxOdW0iLCJudW0iLCJ2ZXJ0aWNlc0NvdW50IiwiYnl0ZUxlbmd0aCIsInN0cmlkZSIsInNldFZEYXRhIiwiYnl0ZXMiLCJBVFRSX0NPTE9SIiwiZ2V0VkRhdGEiLCJVaW50MzJBcnJheSIsIkZsb2F0MzJBcnJheSIsImwiLCJzT2Zmc2V0IiwiZE9mZnNldCIsImoiLCJhcHBseUZ1bmMiLCJ2T2Zmc2V0Iiwic2V0SW5kaWNlcyIsImluZGljZXMiLCJVaW50MTZBcnJheSIsImJ5dGVPZmZzZXQiLCJBcnJheSIsImlzQXJyYXkiLCJ1c2FnZSIsIklOREVYX0ZNVF9VSU5UMTYiLCJCWVRFU19QRVJfSU5ERVgiLCJfaW5kZXhCdWZmZXIiLCJpRGlydHkiLCJzZXRQcmltaXRpdmVUeXBlIiwic3ViTWVzaCIsIl9wcmltaXRpdmVUeXBlIiwiY2xlYXIiLCJsZW4iLCJzZXRCb3VuZGluZ0JveCIsIm1pbiIsIm1heCIsIl91cGxvYWREYXRhIiwidXBkYXRlIiwiX2dldEF0dHJNZXNoRGF0YSIsInN1YkRhdGFJbmRleCIsImZtdCIsImF0dHJEYXRhcyIsImR2IiwiZWxlT2Zmc2V0IiwiZWxlTnVtIiwiZWxlQnl0ZSIsImZuIiwiY29weUF0dHJpYnV0ZSIsInByaW1pdGl2ZUluZGV4IiwiYXR0cmlidXRlTmFtZSIsIndyaXR0ZW4iLCJ3cml0dGVyIiwib3V0cHV0VmlldyIsIm91dHB1dFN0cmlkZSIsImlucHV0T2Zmc2V0Iiwib3V0cHV0T2Zmc2V0IiwiY29weUluZGljZXMiLCJvdXRwdXRBcnJheSIsImluZGV4Q291bnQiLCJJTkRFWF9GTVRfVUlOVDgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBNEJBOztBQUNBOztBQUNBOzs7O0FBOUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBTUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsYUFBRCxDQUF4Qjs7QUFDQSxJQUFNQyxXQUFXLEdBQUdELE9BQU8sQ0FBQyx1QkFBRCxDQUEzQjs7QUFNQSxTQUFTRSxVQUFULENBQXFCQyxJQUFyQixFQUEyQkMsTUFBM0IsRUFBbUNDLEtBQW5DLEVBQTBDO0FBQ3RDRixFQUFBQSxJQUFJLENBQUNDLE1BQUQsQ0FBSixHQUFlQyxLQUFLLENBQUNDLElBQXJCO0FBQ0g7O0FBRUQsU0FBU0MsU0FBVCxDQUFvQkosSUFBcEIsRUFBMEJDLE1BQTFCLEVBQWtDQyxLQUFsQyxFQUF5QztBQUNyQ0YsRUFBQUEsSUFBSSxDQUFDQyxNQUFELENBQUosR0FBZUMsS0FBSyxDQUFDRyxDQUFyQjtBQUNBTCxFQUFBQSxJQUFJLENBQUNDLE1BQU0sR0FBRyxDQUFWLENBQUosR0FBbUJDLEtBQUssQ0FBQ0ksQ0FBekI7QUFDSDs7QUFFRCxTQUFTQyxTQUFULENBQW9CUCxJQUFwQixFQUEwQkMsTUFBMUIsRUFBa0NDLEtBQWxDLEVBQXlDO0FBQ3JDRixFQUFBQSxJQUFJLENBQUNDLE1BQUQsQ0FBSixHQUFlQyxLQUFLLENBQUNHLENBQXJCO0FBQ0FMLEVBQUFBLElBQUksQ0FBQ0MsTUFBTSxHQUFHLENBQVYsQ0FBSixHQUFtQkMsS0FBSyxDQUFDSSxDQUF6QjtBQUNBTixFQUFBQSxJQUFJLENBQUNDLE1BQU0sR0FBRyxDQUFWLENBQUosR0FBbUJDLEtBQUssQ0FBQ00sQ0FBekI7QUFDSDs7QUFFRCxJQUFNQyxZQUFZLEdBQUc7QUFDakIsUUFBTSxTQURXO0FBRWpCLFFBQU0sVUFGVztBQUdqQixRQUFNLFVBSFc7QUFJakIsUUFBTSxXQUpXO0FBS2pCLFFBQU0sVUFMVztBQU1qQixRQUFNLFdBTlc7QUFPakIsUUFBTTtBQVBXLENBQXJCO0FBVUEsSUFBTUMsZUFBZSxHQUFHO0FBQ3BCLFFBQU0sU0FEYztBQUVwQixRQUFNLFVBRmM7QUFHcEIsUUFBTSxVQUhjO0FBSXBCLFFBQU0sV0FKYztBQUtwQixRQUFNLFVBTGM7QUFNcEIsUUFBTSxXQU5jO0FBT3BCLFFBQU07QUFQYyxDQUF4QixFQVVBOztBQUNBLElBQU1DLFlBQVksR0FBSSxZQUFZO0FBQzlCLE1BQUlDLE1BQU0sR0FBRyxJQUFJQyxXQUFKLENBQWdCLENBQWhCLENBQWI7QUFDQSxNQUFJQyxRQUFKLENBQWFGLE1BQWIsRUFBcUJHLFFBQXJCLENBQThCLENBQTlCLEVBQWlDLEdBQWpDLEVBQXNDLElBQXRDLEVBRjhCLENBRzlCOztBQUNBLFNBQU8sSUFBSUMsVUFBSixDQUFlSixNQUFmLEVBQXVCLENBQXZCLE1BQThCLEdBQXJDO0FBQ0gsQ0FMb0IsRUFBckI7QUFPQTs7OztBQUdBOzs7Ozs7Ozs7QUFPQSxJQUFJSyxJQUFJLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ2hCQyxFQUFBQSxJQUFJLEVBQUUsU0FEVTtBQUVoQixhQUFTRixFQUFFLENBQUNHLEtBRkk7QUFHaEJDLEVBQUFBLE1BQU0sRUFBRSxDQUFDeEIsV0FBRCxDQUhRO0FBS2hCeUIsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFlBQVksRUFBRTtBQUNWQyxNQUFBQSxRQUFRLEVBQUUsSUFEQTtBQUVWQyxNQUFBQSxHQUZVLGlCQUVIO0FBQ0gsZUFBTyxLQUFLQyxPQUFaO0FBQ0gsT0FKUztBQUtWQyxNQUFBQSxHQUxVLGVBS0xDLEdBTEssRUFLQTtBQUNOLGFBQUtGLE9BQUwsR0FBZWQsV0FBVyxDQUFDaUIsTUFBWixDQUFtQkQsR0FBbkIsSUFBMEJBLEdBQUcsQ0FBQ2pCLE1BQTlCLEdBQXVDaUIsR0FBdEQ7QUFDQSxhQUFLRSxjQUFMO0FBQ0g7QUFSUyxLQUROO0FBWVJDLElBQUFBLGNBQWMsRUFBRTtBQUNaLGlCQUFTLElBREc7QUFFWkMsTUFBQUEsSUFBSSxFQUFFQztBQUZNLEtBWlI7QUFnQlJDLElBQUFBLFdBQVcsRUFBRTtBQUNULGlCQUFTLElBREE7QUFFVEMsTUFBQUEsU0FBUyxFQUFUQTtBQUZTLEtBaEJMO0FBb0JSQyxJQUFBQSxPQUFPLEVBQUVuQixFQUFFLENBQUNvQixFQUFILEVBcEJEO0FBcUJSQyxJQUFBQSxPQUFPLEVBQUVyQixFQUFFLENBQUNvQixFQUFILEVBckJEOztBQXVCUjs7Ozs7QUFLQUUsSUFBQUEsU0FBUyxFQUFFO0FBQ1BkLE1BQUFBLEdBRE8saUJBQ0E7QUFDSCxlQUFPLEtBQUtlLFVBQVo7QUFDSCxPQUhNO0FBSVBiLE1BQUFBLEdBSk8sZUFJRmMsQ0FKRSxFQUlDO0FBQ0osYUFBS0QsVUFBTCxHQUFrQkMsQ0FBbEI7QUFDSDtBQU5NLEtBNUJIO0FBcUNSQyxJQUFBQSxRQUFRLEVBQUc7QUFDUGpCLE1BQUFBLEdBRE8saUJBQ0E7QUFDSCxlQUFPLEtBQUtrQixTQUFaO0FBQ0g7QUFITTtBQXJDSCxHQUxJO0FBaURoQkMsRUFBQUEsSUFqRGdCLGtCQWlEUjtBQUNKLFNBQUtKLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxTQUFLRyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsU0FBS0UsTUFBTCxHQUFjLEtBQWQ7QUFDSCxHQXJEZTtBQXVEaEJmLEVBQUFBLGNBdkRnQiw0QkF1REU7QUFDZCxTQUFLVSxVQUFMLENBQWdCTSxNQUFoQixHQUF5QixDQUF6QjtBQUVBLFFBQUlDLFVBQVUsR0FBRyxLQUFLYixXQUF0Qjs7QUFDQSxTQUFLLElBQUljLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdELFVBQVUsQ0FBQ0QsTUFBL0IsRUFBdUNFLENBQUMsRUFBeEMsRUFBNEM7QUFDeEMsVUFBSUMsU0FBUyxHQUFHRixVQUFVLENBQUNDLENBQUQsQ0FBMUIsQ0FEd0MsQ0FHeEM7O0FBQ0EsVUFBSUUsT0FBTyxHQUFHRCxTQUFTLENBQUNsRCxJQUF4QjtBQUNBLFVBQUlvRCxNQUFNLEdBQUcsSUFBSUMsVUFBSixDQUFlLEtBQUsxQixPQUFwQixFQUE2QndCLE9BQU8sQ0FBQ2xELE1BQXJDLEVBQTZDa0QsT0FBTyxDQUFDSixNQUFyRCxDQUFiLENBTHdDLENBT3hDOztBQUNBLFVBQUlPLFlBQVksR0FBRyxLQUFLdEIsY0FBTCxDQUFvQmtCLFNBQVMsQ0FBQ0ssbUJBQVYsQ0FBOEIsQ0FBOUIsQ0FBcEIsQ0FBbkI7QUFDQSxVQUFJQyxPQUFPLEdBQUdGLFlBQVksQ0FBQ3RELElBQTNCO0FBQ0EsVUFBSXlELE9BQU8sR0FBRyxJQUFJQyxnQkFBSUMsWUFBUixDQUFxQkwsWUFBWSxDQUFDTSxPQUFsQyxDQUFkLENBVndDLENBV3hDOztBQUNBLFVBQUlDLE1BQU0sR0FBRyxJQUFJUixVQUFKLENBQWUsS0FBSzFCLE9BQXBCLEVBQTZCNkIsT0FBTyxDQUFDdkQsTUFBckMsRUFBNkN1RCxPQUFPLENBQUNULE1BQXJELENBQWI7O0FBRUEsVUFBSWUsUUFBUSxHQUFHLEtBQUtDLHFCQUFMLENBQTJCTixPQUEzQixDQUFmOztBQUVBLFVBQUlPLFFBQVEsR0FBRyxJQUFJQyxrQkFBSixFQUFmO0FBQ0FELE1BQUFBLFFBQVEsQ0FBQ0UsS0FBVCxHQUFpQkwsTUFBakI7QUFDQUcsTUFBQUEsUUFBUSxDQUFDRyxLQUFULEdBQWlCZixNQUFqQjtBQUNBWSxNQUFBQSxRQUFRLENBQUNJLEdBQVQsR0FBZVgsT0FBZjtBQUNBTyxNQUFBQSxRQUFRLENBQUMvRCxNQUFULEdBQWtCdUQsT0FBTyxDQUFDdkQsTUFBMUI7QUFDQStELE1BQUFBLFFBQVEsQ0FBQ0YsUUFBVCxHQUFvQkEsUUFBcEI7O0FBQ0EsV0FBS2xCLFNBQUwsQ0FBZXlCLElBQWYsQ0FBb0JMLFFBQXBCOztBQUVBLFVBQUlNLE1BQU0sSUFBSUMsaUJBQWQsRUFBaUM7QUFDN0JQLFFBQUFBLFFBQVEsQ0FBQ1EsTUFBVCxHQUFrQixJQUFsQjtBQUNILE9BRkQsTUFFTztBQUNILFlBQUlDLFFBQVEsR0FBRyxJQUFJZixnQkFBSWdCLFlBQVIsQ0FDWDlFLFFBQVEsQ0FBQytFLE1BREUsRUFFWGxCLE9BRlcsRUFHWEMsZ0JBQUlrQixZQUhPLEVBSVhmLE1BSlcsQ0FBZjtBQU9BLFlBQUlnQixRQUFRLEdBQUcsSUFBSW5CLGdCQUFJb0IsV0FBUixDQUNYbEYsUUFBUSxDQUFDK0UsTUFERSxFQUVYekIsU0FBUyxDQUFDNkIsU0FGQyxFQUdYckIsZ0JBQUlrQixZQUhPLEVBSVh4QixNQUpXLENBQWYsQ0FSRyxDQWVIOztBQUNBLGFBQUtYLFVBQUwsQ0FBZ0I0QixJQUFoQixDQUFxQixJQUFJVywwQkFBSixDQUFtQlAsUUFBbkIsRUFBNkJJLFFBQTdCLENBQXJCO0FBQ0g7QUFDSjs7QUFDRCxTQUFLL0IsTUFBTCxHQUFjLElBQWQ7QUFDQSxTQUFLbUMsSUFBTCxDQUFVLE1BQVY7QUFDSCxHQTFHZTtBQTRHaEJsQixFQUFBQSxxQkE1R2dCLGlDQTRHT21CLE1BNUdQLEVBNEdlO0FBQzNCLFFBQUlDLFNBQVMsR0FBR0QsTUFBTSxDQUFDRSxRQUFQLENBQWdCMUIsZ0JBQUkyQixhQUFwQixDQUFoQjtBQUNBLFFBQUl2QixRQUFRLEdBQUcsQ0FBQ3FCLFNBQUQsSUFDVkEsU0FBUyxDQUFDbEQsSUFBVixLQUFtQnlCLGdCQUFJNEIsaUJBQXZCLElBQ0RKLE1BQU0sQ0FBQ0ssTUFBUCxHQUFnQixDQUFoQixLQUFzQixDQUYxQjtBQUdBLFdBQU96QixRQUFQO0FBQ0gsR0FsSGU7O0FBb0hoQjs7Ozs7Ozs7Ozs7QUFXQTBCLEVBQUFBLElBL0hnQixnQkErSFZDLFlBL0hVLEVBK0hJQyxXQS9ISixFQStIaUJDLE9BL0hqQixFQStIa0NDLEtBL0hsQyxFQStINkM7QUFBQSxRQUE1QkQsT0FBNEI7QUFBNUJBLE1BQUFBLE9BQTRCLEdBQWxCLEtBQWtCO0FBQUE7O0FBQUEsUUFBWEMsS0FBVztBQUFYQSxNQUFBQSxLQUFXLEdBQUgsQ0FBRztBQUFBOztBQUN6RCxRQUFJNUYsSUFBSSxHQUFHLElBQUlxRCxVQUFKLENBQWVvQyxZQUFZLENBQUNGLE1BQWIsR0FBc0JHLFdBQXJDLENBQVg7QUFDQSxRQUFJMUIsUUFBUSxHQUFHLElBQUlDLGtCQUFKLEVBQWY7QUFDQUQsSUFBQUEsUUFBUSxDQUFDRSxLQUFULEdBQWlCbEUsSUFBakI7QUFDQWdFLElBQUFBLFFBQVEsQ0FBQ0ksR0FBVCxHQUFlcUIsWUFBZjtBQUNBekIsSUFBQUEsUUFBUSxDQUFDUSxNQUFULEdBQWtCLElBQWxCO0FBQ0FSLElBQUFBLFFBQVEsQ0FBQ0YsUUFBVCxHQUFvQixLQUFLQyxxQkFBTCxDQUEyQjBCLFlBQTNCLENBQXBCOztBQUVBLFFBQUksRUFBRW5CLE1BQU0sSUFBSUMsaUJBQVosQ0FBSixFQUFvQztBQUNoQyxVQUFJc0IsRUFBRSxHQUFHLElBQUluQyxnQkFBSWdCLFlBQVIsQ0FDTDlFLFFBQVEsQ0FBQytFLE1BREosRUFFTGMsWUFGSyxFQUdMRSxPQUFPLEdBQUdqQyxnQkFBSW9DLGFBQVAsR0FBdUJwQyxnQkFBSWtCLFlBSDdCLEVBSUw1RSxJQUpLLENBQVQ7QUFPQWdFLE1BQUFBLFFBQVEsQ0FBQzZCLEVBQVQsR0FBY0EsRUFBZDtBQUNBLFdBQUtwRCxVQUFMLENBQWdCbUQsS0FBaEIsSUFBeUIsSUFBSVosMEJBQUosQ0FBbUJoQixRQUFRLENBQUM2QixFQUE1QixDQUF6QjtBQUNIOztBQUVELFFBQUlFLFVBQVUsR0FBRyxLQUFLbkQsU0FBTCxDQUFlZ0QsS0FBZixDQUFqQjs7QUFDQSxRQUFJRyxVQUFKLEVBQWdCO0FBQ1osVUFBSUEsVUFBVSxDQUFDRixFQUFmLEVBQW1CO0FBQ2ZFLFFBQUFBLFVBQVUsQ0FBQ0YsRUFBWCxDQUFjRyxPQUFkO0FBQ0g7O0FBQ0QsVUFBSUQsVUFBVSxDQUFDRSxFQUFmLEVBQW1CO0FBQ2ZGLFFBQUFBLFVBQVUsQ0FBQ0UsRUFBWCxDQUFjRCxPQUFkO0FBQ0g7QUFDSjs7QUFFRCxTQUFLcEQsU0FBTCxDQUFlZ0QsS0FBZixJQUF3QjVCLFFBQXhCO0FBRUEsU0FBS2xCLE1BQUwsR0FBYyxJQUFkO0FBQ0EsU0FBS21DLElBQUwsQ0FBVSxNQUFWO0FBQ0EsU0FBS0EsSUFBTCxDQUFVLGFBQVY7QUFDSCxHQWxLZTs7QUFvS2hCOzs7Ozs7Ozs7QUFTQWlCLEVBQUFBLFdBN0tnQix1QkE2S0g5RSxJQTdLRyxFQTZLRytFLE1BN0tILEVBNktXUCxLQTdLWCxFQTZLa0I7QUFDOUJBLElBQUFBLEtBQUssR0FBR0EsS0FBSyxJQUFJLENBQWpCO0FBQ0EsUUFBSVEsT0FBTyxHQUFHLEtBQUt4RCxTQUFMLENBQWVnRCxLQUFmLENBQWQ7QUFFQSxRQUFJUyxFQUFFLEdBQUdELE9BQU8sQ0FBQ2hDLEdBQVIsQ0FBWWtDLE9BQVosQ0FBb0JsRixJQUFwQixDQUFUOztBQUNBLFFBQUksQ0FBQ2lGLEVBQUwsRUFBUztBQUNMLGFBQU9uRixFQUFFLENBQUNxRixJQUFILGtCQUF1Qm5GLElBQXZCLG1DQUFQO0FBQ0gsS0FQNkIsQ0FTOUI7OztBQUNBLFFBQUlvRixVQUFVLEdBQUcsT0FBT0wsTUFBTSxDQUFDLENBQUQsQ0FBYixLQUFxQixRQUF0QztBQUVBLFFBQUlNLEtBQUssR0FBR0osRUFBRSxDQUFDSyxHQUFmO0FBQ0EsUUFBSUMsYUFBYSxHQUFHSCxVQUFVLEdBQUtMLE1BQU0sQ0FBQ3BELE1BQVAsR0FBZ0IwRCxLQUFqQixHQUEwQixDQUE5QixHQUFtQ04sTUFBTSxDQUFDcEQsTUFBeEU7O0FBQ0EsUUFBSXFELE9BQU8sQ0FBQ2xDLEtBQVIsQ0FBYzBDLFVBQWQsR0FBMkJELGFBQWEsR0FBR04sRUFBRSxDQUFDUSxNQUFsRCxFQUEwRDtBQUN0RFQsTUFBQUEsT0FBTyxDQUFDVSxRQUFSLENBQWlCLElBQUl6RCxVQUFKLENBQWVzRCxhQUFhLEdBQUdQLE9BQU8sQ0FBQ2hDLEdBQVIsQ0FBWW1CLE1BQTNDLENBQWpCO0FBQ0g7O0FBRUQsUUFBSXZGLElBQUo7QUFDQSxRQUFJK0csS0FBSyxHQUFHLENBQVo7O0FBQ0EsUUFBSTNGLElBQUksS0FBS3NDLGdCQUFJc0QsVUFBakIsRUFBNkI7QUFDekIsVUFBSSxDQUFDUixVQUFMLEVBQWlCO0FBQ2J4RyxRQUFBQSxJQUFJLEdBQUdvRyxPQUFPLENBQUNhLFFBQVIsQ0FBaUJDLFdBQWpCLENBQVA7QUFDSCxPQUZELE1BR0s7QUFDRGxILFFBQUFBLElBQUksR0FBR29HLE9BQU8sQ0FBQ2EsUUFBUixFQUFQO0FBQ0FGLFFBQUFBLEtBQUssR0FBRyxDQUFSO0FBQ0g7QUFDSixLQVJELE1BU0s7QUFDRC9HLE1BQUFBLElBQUksR0FBR29HLE9BQU8sQ0FBQ2EsUUFBUixDQUFpQkUsWUFBakIsQ0FBUDtBQUNIOztBQUVELFFBQUlOLE1BQU0sR0FBR1IsRUFBRSxDQUFDUSxNQUFILEdBQVlFLEtBQXpCO0FBQ0EsUUFBSTlHLE1BQU0sR0FBR29HLEVBQUUsQ0FBQ3BHLE1BQUgsR0FBWThHLEtBQXpCOztBQUVBLFFBQUlQLFVBQUosRUFBZ0I7QUFDWixXQUFLLElBQUl2RCxDQUFDLEdBQUcsQ0FBUixFQUFXbUUsQ0FBQyxHQUFJakIsTUFBTSxDQUFDcEQsTUFBUCxHQUFnQjBELEtBQXJDLEVBQTZDeEQsQ0FBQyxHQUFHbUUsQ0FBakQsRUFBb0RuRSxDQUFDLEVBQXJELEVBQXlEO0FBQ3JELFlBQUlvRSxPQUFPLEdBQUdwRSxDQUFDLEdBQUd3RCxLQUFsQjtBQUNBLFlBQUlhLE9BQU8sR0FBR3JFLENBQUMsR0FBRzRELE1BQUosR0FBYTVHLE1BQTNCOztBQUNBLGFBQUssSUFBSXNILENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdkLEtBQXBCLEVBQTJCYyxDQUFDLEVBQTVCLEVBQWdDO0FBQzVCdkgsVUFBQUEsSUFBSSxDQUFDc0gsT0FBTyxHQUFHQyxDQUFYLENBQUosR0FBb0JwQixNQUFNLENBQUNrQixPQUFPLEdBQUdFLENBQVgsQ0FBMUI7QUFDSDtBQUNKO0FBQ0osS0FSRCxNQVNLO0FBQ0QsVUFBSUMsU0FBSjs7QUFDQSxVQUFJcEcsSUFBSSxLQUFLc0MsZ0JBQUlzRCxVQUFqQixFQUE2QjtBQUN6QlEsUUFBQUEsU0FBUyxHQUFHekgsVUFBWjtBQUNILE9BRkQsTUFHSztBQUNELFlBQUkwRyxLQUFLLEtBQUssQ0FBZCxFQUFpQjtBQUNiZSxVQUFBQSxTQUFTLEdBQUdwSCxTQUFaO0FBQ0gsU0FGRCxNQUdLO0FBQ0RvSCxVQUFBQSxTQUFTLEdBQUdqSCxTQUFaO0FBQ0g7QUFDSjs7QUFFRCxXQUFLLElBQUkwQyxFQUFDLEdBQUcsQ0FBUixFQUFXbUUsRUFBQyxHQUFHakIsTUFBTSxDQUFDcEQsTUFBM0IsRUFBbUNFLEVBQUMsR0FBR21FLEVBQXZDLEVBQTBDbkUsRUFBQyxFQUEzQyxFQUErQztBQUMzQyxZQUFJUCxDQUFDLEdBQUd5RCxNQUFNLENBQUNsRCxFQUFELENBQWQ7QUFDQSxZQUFJd0UsT0FBTyxHQUFHeEUsRUFBQyxHQUFHNEQsTUFBSixHQUFhNUcsTUFBM0I7QUFDQXVILFFBQUFBLFNBQVMsQ0FBQ3hILElBQUQsRUFBT3lILE9BQVAsRUFBZ0IvRSxDQUFoQixDQUFUO0FBQ0g7QUFDSjs7QUFDRDBELElBQUFBLE9BQU8sQ0FBQzVCLE1BQVIsR0FBaUIsSUFBakI7QUFDSCxHQS9PZTs7QUFpUGhCOzs7Ozs7Ozs7O0FBVUFrRCxFQUFBQSxVQTNQZ0Isc0JBMlBKQyxPQTNQSSxFQTJQSy9CLEtBM1BMLEVBMlBZRCxPQTNQWixFQTJQcUI7QUFDakNDLElBQUFBLEtBQUssR0FBR0EsS0FBSyxJQUFJLENBQWpCO0FBRUEsUUFBSXpCLEtBQUssR0FBR3dELE9BQVo7O0FBQ0EsUUFBSUEsT0FBTyxZQUFZQyxXQUF2QixFQUFvQztBQUNoQ3pELE1BQUFBLEtBQUssR0FBRyxJQUFJZCxVQUFKLENBQWVzRSxPQUFPLENBQUMvRyxNQUF2QixFQUErQitHLE9BQU8sQ0FBQ0UsVUFBdkMsRUFBbURGLE9BQU8sQ0FBQ2YsVUFBM0QsQ0FBUjtBQUNILEtBRkQsTUFHSyxJQUFJa0IsS0FBSyxDQUFDQyxPQUFOLENBQWNKLE9BQWQsQ0FBSixFQUE0QjtBQUM3QnhELE1BQUFBLEtBQUssR0FBRyxJQUFJeUQsV0FBSixDQUFnQkQsT0FBaEIsQ0FBUjtBQUNBeEQsTUFBQUEsS0FBSyxHQUFHLElBQUlkLFVBQUosQ0FBZWMsS0FBSyxDQUFDdkQsTUFBckIsRUFBNkJ1RCxLQUFLLENBQUMwRCxVQUFuQyxFQUErQzFELEtBQUssQ0FBQ3lDLFVBQXJELENBQVI7QUFDSDs7QUFFRCxRQUFJb0IsS0FBSyxHQUFHckMsT0FBTyxHQUFHakMsZ0JBQUlvQyxhQUFQLEdBQXVCcEMsZ0JBQUlrQixZQUE5QztBQUVBLFFBQUl3QixPQUFPLEdBQUcsS0FBS3hELFNBQUwsQ0FBZWdELEtBQWYsQ0FBZDs7QUFDQSxRQUFJLENBQUNRLE9BQU8sQ0FBQ0gsRUFBYixFQUFpQjtBQUNiRyxNQUFBQSxPQUFPLENBQUNqQyxLQUFSLEdBQWdCQSxLQUFoQjs7QUFDQSxVQUFJLEVBQUVHLE1BQU0sSUFBSUMsaUJBQVosQ0FBSixFQUFvQztBQUNoQyxZQUFJM0QsTUFBTSxHQUFHLElBQUk4QyxnQkFBSW9CLFdBQVIsQ0FDVGxGLFFBQVEsQ0FBQytFLE1BREEsRUFFVGpCLGdCQUFJdUUsZ0JBRkssRUFHVEQsS0FIUyxFQUlUN0QsS0FKUyxFQUtUQSxLQUFLLENBQUN5QyxVQUFOLEdBQW1CbEQsZ0JBQUlvQixXQUFKLENBQWdCb0QsZUFBaEIsQ0FBZ0N4RSxnQkFBSXVFLGdCQUFwQyxDQUxWLENBQWI7QUFRQTdCLFFBQUFBLE9BQU8sQ0FBQ0gsRUFBUixHQUFhckYsTUFBYjtBQUNBLGFBQUs2QixVQUFMLENBQWdCbUQsS0FBaEIsRUFBdUJ1QyxZQUF2QixHQUFzQy9CLE9BQU8sQ0FBQ0gsRUFBOUM7QUFDSDtBQUNKLEtBZEQsTUFlSztBQUNERyxNQUFBQSxPQUFPLENBQUNqQyxLQUFSLEdBQWdCQSxLQUFoQjtBQUNBaUMsTUFBQUEsT0FBTyxDQUFDZ0MsTUFBUixHQUFpQixJQUFqQjtBQUNIO0FBQ0osR0E3UmU7O0FBK1JoQjs7Ozs7Ozs7O0FBU0FDLEVBQUFBLGdCQXhTZ0IsNEJBd1NFcEcsSUF4U0YsRUF3U1EyRCxLQXhTUixFQXdTZTtBQUMzQkEsSUFBQUEsS0FBSyxHQUFHQSxLQUFLLElBQUksQ0FBakI7QUFDQSxRQUFJMEMsT0FBTyxHQUFHLEtBQUs3RixVQUFMLENBQWdCbUQsS0FBaEIsQ0FBZDs7QUFDQSxRQUFJLENBQUMwQyxPQUFMLEVBQWM7QUFDVnBILE1BQUFBLEVBQUUsQ0FBQ3FGLElBQUgsb0NBQXlDWCxLQUF6QztBQUNBO0FBQ0g7O0FBQ0QsU0FBS25ELFVBQUwsQ0FBZ0JtRCxLQUFoQixFQUF1QjJDLGNBQXZCLEdBQXdDdEcsSUFBeEM7QUFDSCxHQWhUZTs7QUFrVGhCOzs7Ozs7O0FBT0F1RyxFQUFBQSxLQXpUZ0IsbUJBeVRQO0FBQ0wsU0FBSy9GLFVBQUwsQ0FBZ0JNLE1BQWhCLEdBQXlCLENBQXpCO0FBRUEsUUFBSUosUUFBUSxHQUFHLEtBQUtDLFNBQXBCOztBQUNBLFNBQUssSUFBSUssQ0FBQyxHQUFHLENBQVIsRUFBV3dGLEdBQUcsR0FBRzlGLFFBQVEsQ0FBQ0ksTUFBL0IsRUFBdUNFLENBQUMsR0FBR3dGLEdBQTNDLEVBQWdEeEYsQ0FBQyxFQUFqRCxFQUFxRDtBQUNqRCxVQUFJNEMsRUFBRSxHQUFHbEQsUUFBUSxDQUFDTSxDQUFELENBQVIsQ0FBWTRDLEVBQXJCOztBQUNBLFVBQUlBLEVBQUosRUFBUTtBQUNKQSxRQUFBQSxFQUFFLENBQUNHLE9BQUg7QUFDSDs7QUFFRCxVQUFJQyxFQUFFLEdBQUd0RCxRQUFRLENBQUNNLENBQUQsQ0FBUixDQUFZZ0QsRUFBckI7O0FBQ0EsVUFBSUEsRUFBSixFQUFRO0FBQ0pBLFFBQUFBLEVBQUUsQ0FBQ0QsT0FBSDtBQUNIO0FBQ0o7O0FBQ0RyRCxJQUFBQSxRQUFRLENBQUNJLE1BQVQsR0FBa0IsQ0FBbEI7QUFDSCxHQXpVZTs7QUEyVWhCOzs7Ozs7O0FBT0EyRixFQUFBQSxjQWxWZ0IsMEJBa1ZBQyxHQWxWQSxFQWtWS0MsR0FsVkwsRUFrVlU7QUFDdEIsU0FBS3ZHLE9BQUwsR0FBZXNHLEdBQWY7QUFDQSxTQUFLcEcsT0FBTCxHQUFlcUcsR0FBZjtBQUNILEdBclZlO0FBdVZoQjVDLEVBQUFBLE9BdlZnQixxQkF1Vkw7QUFDUCxTQUFLd0MsS0FBTDtBQUNILEdBelZlO0FBMlZoQkssRUFBQUEsV0EzVmdCLHlCQTJWRDtBQUNYLFFBQUlsRyxRQUFRLEdBQUcsS0FBS0MsU0FBcEI7O0FBQ0EsU0FBSyxJQUFJSyxDQUFDLEdBQUcsQ0FBUixFQUFXd0YsR0FBRyxHQUFHOUYsUUFBUSxDQUFDSSxNQUEvQixFQUF1Q0UsQ0FBQyxHQUFHd0YsR0FBM0MsRUFBZ0R4RixDQUFDLEVBQWpELEVBQXFEO0FBQ2pELFVBQUltRCxPQUFPLEdBQUd6RCxRQUFRLENBQUNNLENBQUQsQ0FBdEI7O0FBRUEsVUFBSW1ELE9BQU8sQ0FBQzVCLE1BQVosRUFBb0I7QUFDaEIsWUFBSTVELE1BQU0sR0FBR3dGLE9BQU8sQ0FBQ1AsRUFBckI7QUFBQSxZQUF5QjdGLElBQUksR0FBR29HLE9BQU8sQ0FBQ2xDLEtBQXhDO0FBQ0F0RCxRQUFBQSxNQUFNLENBQUNrSSxNQUFQLENBQWMsQ0FBZCxFQUFpQjlJLElBQWpCO0FBQ0FvRyxRQUFBQSxPQUFPLENBQUM1QixNQUFSLEdBQWlCLEtBQWpCO0FBQ0g7O0FBRUQsVUFBSTRCLE9BQU8sQ0FBQ2dDLE1BQVosRUFBb0I7QUFDaEIsWUFBSXhILE9BQU0sR0FBR3dGLE9BQU8sQ0FBQ0gsRUFBckI7QUFBQSxZQUF5QmpHLEtBQUksR0FBR29HLE9BQU8sQ0FBQ2pDLEtBQXhDOztBQUNBdkQsUUFBQUEsT0FBTSxDQUFDa0ksTUFBUCxDQUFjLENBQWQsRUFBaUI5SSxLQUFqQjs7QUFDQW9HLFFBQUFBLE9BQU8sQ0FBQ2dDLE1BQVIsR0FBaUIsS0FBakI7QUFDSDtBQUNKO0FBQ0osR0E1V2U7QUE4V2hCVyxFQUFBQSxnQkE5V2dCLDRCQThXRUMsWUE5V0YsRUE4V2dCNUgsSUE5V2hCLEVBOFdzQjtBQUNsQyxRQUFJZ0YsT0FBTyxHQUFHLEtBQUt4RCxTQUFMLENBQWVvRyxZQUFmLENBQWQ7QUFDQSxRQUFJLENBQUM1QyxPQUFMLEVBQWMsT0FBTyxFQUFQO0FBRWQsUUFBSWxCLE1BQU0sR0FBR2tCLE9BQU8sQ0FBQ2hDLEdBQXJCO0FBQ0EsUUFBSTZFLEdBQUcsR0FBRy9ELE1BQU0sQ0FBQ29CLE9BQVAsQ0FBZWxGLElBQWYsQ0FBVjtBQUNBLFFBQUksQ0FBQzZILEdBQUwsRUFBVSxPQUFPLEVBQVA7O0FBRVYsUUFBSSxDQUFDN0MsT0FBTyxDQUFDOEMsU0FBYixFQUF3QjtBQUNwQjlDLE1BQUFBLE9BQU8sQ0FBQzhDLFNBQVIsR0FBb0IsRUFBcEI7QUFDSDs7QUFDRCxRQUFJQSxTQUFTLEdBQUc5QyxPQUFPLENBQUM4QyxTQUF4QjtBQUNBLFFBQUlsSixJQUFJLEdBQUdrSixTQUFTLENBQUM5SCxJQUFELENBQXBCOztBQUNBLFFBQUlwQixJQUFKLEVBQVU7QUFDTixhQUFPQSxJQUFQO0FBQ0gsS0FGRCxNQUdLO0FBQ0RBLE1BQUFBLElBQUksR0FBR2tKLFNBQVMsQ0FBQzlILElBQUQsQ0FBVCxHQUFrQixFQUF6QjtBQUNIOztBQUVELFFBQUl5QyxNQUFNLEdBQUd1QyxPQUFPLENBQUNsQyxLQUFyQjtBQUNBLFFBQUlpRixFQUFFLEdBQUcsSUFBSXJJLFFBQUosQ0FBYStDLE1BQU0sQ0FBQ2pELE1BQXBCLEVBQTRCaUQsTUFBTSxDQUFDZ0UsVUFBbkMsRUFBK0NoRSxNQUFNLENBQUMrQyxVQUF0RCxDQUFUO0FBRUEsUUFBSUMsTUFBTSxHQUFHb0MsR0FBRyxDQUFDcEMsTUFBakI7QUFDQSxRQUFJdUMsU0FBUyxHQUFHSCxHQUFHLENBQUNoSixNQUFwQjtBQUNBLFFBQUlvSixNQUFNLEdBQUdKLEdBQUcsQ0FBQ3ZDLEdBQWpCO0FBQ0EsUUFBSTRDLE9BQU8sR0FBR0wsR0FBRyxDQUFDbEMsS0FBSixHQUFZc0MsTUFBMUI7QUFDQSxRQUFJRSxFQUFFLEdBQUc5SSxZQUFZLENBQUN3SSxHQUFHLENBQUNoSCxJQUFMLENBQXJCO0FBQ0EsUUFBSXlELFdBQVcsR0FBRzdCLE1BQU0sQ0FBQytDLFVBQVAsR0FBb0IxQixNQUFNLENBQUNLLE1BQTdDOztBQUVBLFNBQUssSUFBSXRDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd5QyxXQUFwQixFQUFpQ3pDLENBQUMsRUFBbEMsRUFBc0M7QUFDbEMsVUFBSWhELE1BQU0sR0FBR2dELENBQUMsR0FBRzRELE1BQUosR0FBYXVDLFNBQTFCOztBQUNBLFdBQUssSUFBSTdCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUc4QixNQUFwQixFQUE0QjlCLENBQUMsRUFBN0IsRUFBaUM7QUFDN0IsWUFBSTdFLENBQUMsR0FBR3lHLEVBQUUsQ0FBQ0ksRUFBRCxDQUFGLENBQU90SixNQUFNLEdBQUdzSCxDQUFDLEdBQUcrQixPQUFwQixFQUE2QjNJLFlBQTdCLENBQVI7QUFDQVgsUUFBQUEsSUFBSSxDQUFDcUUsSUFBTCxDQUFVM0IsQ0FBVjtBQUNIO0FBQ0o7O0FBRUQsV0FBTzFDLElBQVA7QUFDSCxHQXJaZTs7QUF1WmhCOzs7Ozs7Ozs7OztBQVdBd0osRUFBQUEsYUFsYWdCLHlCQWthREMsY0FsYUMsRUFrYWVDLGFBbGFmLEVBa2E4QjlJLE1BbGE5QixFQWthc0NpRyxNQWxhdEMsRUFrYThDNUcsTUFsYTlDLEVBa2FzRDtBQUNsRSxRQUFJMEosT0FBTyxHQUFHLEtBQWQ7QUFDQSxRQUFJdkQsT0FBTyxHQUFHLEtBQUt4RCxTQUFMLENBQWU2RyxjQUFmLENBQWQ7QUFFQSxRQUFJLENBQUNyRCxPQUFMLEVBQWMsT0FBT3VELE9BQVA7QUFFZCxRQUFJekUsTUFBTSxHQUFHa0IsT0FBTyxDQUFDaEMsR0FBckI7QUFDQSxRQUFJNkUsR0FBRyxHQUFHL0QsTUFBTSxDQUFDb0IsT0FBUCxDQUFlb0QsYUFBZixDQUFWO0FBRUEsUUFBSSxDQUFDVCxHQUFMLEVBQVUsT0FBT1UsT0FBUDtBQUVWLFFBQUlDLE9BQU8sR0FBR2xKLGVBQWUsQ0FBQ3VJLEdBQUcsQ0FBQ2hILElBQUwsQ0FBN0I7QUFFQSxRQUFJLENBQUMySCxPQUFMLEVBQWMsT0FBT0QsT0FBUDs7QUFFZCxRQUFJM0osSUFBSSxHQUFHLEtBQUsrSSxnQkFBTCxDQUFzQlUsY0FBdEIsRUFBc0NDLGFBQXRDLENBQVg7O0FBQ0EsUUFBSWhFLFdBQVcsR0FBR1UsT0FBTyxDQUFDbEMsS0FBUixDQUFjMEMsVUFBZCxHQUEyQjFCLE1BQU0sQ0FBQ0ssTUFBcEQ7QUFDQSxRQUFJK0QsT0FBTyxHQUFHTCxHQUFHLENBQUNsQyxLQUFKLEdBQVlrQyxHQUFHLENBQUN2QyxHQUE5Qjs7QUFFQSxRQUFJMUcsSUFBSSxDQUFDK0MsTUFBTCxHQUFjLENBQWxCLEVBQXFCO0FBQ2pCLFVBQU04RyxVQUFVLEdBQUcsSUFBSS9JLFFBQUosQ0FBYUYsTUFBYixFQUFxQlgsTUFBckIsQ0FBbkI7QUFFQSxVQUFJNkosWUFBWSxHQUFHakQsTUFBbkI7QUFDQSxVQUFJSCxHQUFHLEdBQUd1QyxHQUFHLENBQUN2QyxHQUFkOztBQUVBLFdBQUssSUFBSXpELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd5QyxXQUFwQixFQUFpQyxFQUFFekMsQ0FBbkMsRUFBc0M7QUFDbEMsWUFBSTJDLEtBQUssR0FBRzNDLENBQUMsR0FBR3lELEdBQWhCOztBQUNBLGFBQUssSUFBSWEsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2IsR0FBcEIsRUFBeUIsRUFBRWEsQ0FBM0IsRUFBOEI7QUFDMUIsY0FBTXdDLFdBQVcsR0FBR25FLEtBQUssR0FBRzJCLENBQTVCO0FBQ0EsY0FBTXlDLFlBQVksR0FBR0YsWUFBWSxHQUFHN0csQ0FBZixHQUFtQnFHLE9BQU8sR0FBRy9CLENBQWxEO0FBRUFzQyxVQUFBQSxVQUFVLENBQUNELE9BQUQsQ0FBVixDQUFvQkksWUFBcEIsRUFBa0NoSyxJQUFJLENBQUMrSixXQUFELENBQXRDLEVBQXFEcEosWUFBckQ7QUFDSDtBQUNKOztBQUVEZ0osTUFBQUEsT0FBTyxHQUFHLElBQVY7QUFDSDs7QUFFRCxXQUFPQSxPQUFQO0FBQ0gsR0F6Y2U7O0FBMmNoQjs7Ozs7Ozs7QUFRQU0sRUFBQUEsV0FuZGdCLHVCQW1kSFIsY0FuZEcsRUFtZGFTLFdBbmRiLEVBbWQwQjtBQUN0QyxRQUFJOUQsT0FBTyxHQUFHLEtBQUt4RCxTQUFMLENBQWU2RyxjQUFmLENBQWQ7QUFFQSxRQUFJLENBQUNyRCxPQUFMLEVBQWMsT0FBTyxLQUFQO0FBRWQsUUFBTWpDLEtBQUssR0FBR2lDLE9BQU8sQ0FBQ2pDLEtBQXRCO0FBQ0EsUUFBTWdHLFVBQVUsR0FBR2hHLEtBQUssQ0FBQ3BCLE1BQU4sR0FBZSxDQUFsQztBQUVBLFFBQU1vRyxFQUFFLEdBQUcsSUFBSXJJLFFBQUosQ0FBYXFELEtBQUssQ0FBQ3ZELE1BQW5CLEVBQTJCdUQsS0FBSyxDQUFDMEQsVUFBakMsRUFBNkMxRCxLQUFLLENBQUN5QyxVQUFuRCxDQUFYO0FBQ0EsUUFBTTJDLEVBQUUsR0FBRzlJLFlBQVksQ0FBQ2lELGdCQUFJMEcsZUFBTCxDQUF2Qjs7QUFFQSxTQUFLLElBQUluSCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHa0gsVUFBcEIsRUFBZ0MsRUFBRWxILENBQWxDLEVBQXFDO0FBQ2pDaUgsTUFBQUEsV0FBVyxDQUFDakgsQ0FBRCxDQUFYLEdBQWlCa0csRUFBRSxDQUFDSSxFQUFELENBQUYsQ0FBT3RHLENBQUMsR0FBRyxDQUFYLENBQWpCO0FBQ0g7O0FBRUQsV0FBTyxJQUFQO0FBQ0g7QUFuZWUsQ0FBVCxDQUFYO0FBc2VBL0IsRUFBRSxDQUFDRCxJQUFILEdBQVVvSixNQUFNLENBQUNDLE9BQVAsR0FBaUJySixJQUEzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwOi8vd3d3LmNvY29zLmNvbVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgcmVuZGVyZXIgPSByZXF1aXJlKCcuLi9yZW5kZXJlcicpO1xuY29uc3QgRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuLi9ldmVudC9ldmVudC10YXJnZXQnKTtcblxuaW1wb3J0IElucHV0QXNzZW1ibGVyIGZyb20gJy4uLy4uL3JlbmRlcmVyL2NvcmUvaW5wdXQtYXNzZW1ibGVyJztcbmltcG9ydCBnZnggZnJvbSAnLi4vLi4vcmVuZGVyZXIvZ2Z4JztcbmltcG9ydCB7IFByaW1pdGl2ZSwgVmVydGV4QnVuZGxlLCBNZXNoRGF0YX0gZnJvbSAnLi9tZXNoLWRhdGEnO1xuXG5mdW5jdGlvbiBhcHBseUNvbG9yIChkYXRhLCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgZGF0YVtvZmZzZXRdID0gdmFsdWUuX3ZhbDtcbn1cblxuZnVuY3Rpb24gYXBwbHlWZWMyIChkYXRhLCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgZGF0YVtvZmZzZXRdID0gdmFsdWUueDtcbiAgICBkYXRhW29mZnNldCArIDFdID0gdmFsdWUueTtcbn1cblxuZnVuY3Rpb24gYXBwbHlWZWMzIChkYXRhLCBvZmZzZXQsIHZhbHVlKSB7XG4gICAgZGF0YVtvZmZzZXRdID0gdmFsdWUueDtcbiAgICBkYXRhW29mZnNldCArIDFdID0gdmFsdWUueTtcbiAgICBkYXRhW29mZnNldCArIDJdID0gdmFsdWUuejtcbn1cblxuY29uc3QgX2NvbXBUeXBlMmZuID0ge1xuICAgIDUxMjA6ICdnZXRJbnQ4JyxcbiAgICA1MTIxOiAnZ2V0VWludDgnLFxuICAgIDUxMjI6ICdnZXRJbnQxNicsXG4gICAgNTEyMzogJ2dldFVpbnQxNicsXG4gICAgNTEyNDogJ2dldEludDMyJyxcbiAgICA1MTI1OiAnZ2V0VWludDMyJyxcbiAgICA1MTI2OiAnZ2V0RmxvYXQzMicsXG59O1xuXG5jb25zdCBfY29tcFR5cGUyd3JpdGUgPSB7XG4gICAgNTEyMDogJ3NldEludDgnLFxuICAgIDUxMjE6ICdzZXRVaW50OCcsXG4gICAgNTEyMjogJ3NldEludDE2JyxcbiAgICA1MTIzOiAnc2V0VWludDE2JyxcbiAgICA1MTI0OiAnc2V0SW50MzInLFxuICAgIDUxMjU6ICdzZXRVaW50MzInLFxuICAgIDUxMjY6ICdzZXRGbG9hdDMyJyxcbn07XG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0RhdGFWaWV3I0VuZGlhbm5lc3NcbmNvbnN0IGxpdHRsZUVuZGlhbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcigyKTtcbiAgICBuZXcgRGF0YVZpZXcoYnVmZmVyKS5zZXRJbnQxNigwLCAyNTYsIHRydWUpO1xuICAgIC8vIEludDE2QXJyYXkgdXNlcyB0aGUgcGxhdGZvcm0ncyBlbmRpYW5uZXNzLlxuICAgIHJldHVybiBuZXcgSW50MTZBcnJheShidWZmZXIpWzBdID09PSAyNTY7XG59KSgpO1xuXG4vKipcbiogQG1vZHVsZSBjY1xuKi9cbi8qKlxuICogISNlbiBNZXNoIEFzc2V0LlxuICogISN6aCDnvZHmoLzotYTmupDjgIJcbiAqIEBjbGFzcyBNZXNoXG4gKiBAZXh0ZW5kcyBBc3NldFxuICogQHVzZXMgRXZlbnRUYXJnZXRcbiAqL1xubGV0IE1lc2ggPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLk1lc2gnLFxuICAgIGV4dGVuZHM6IGNjLkFzc2V0LFxuICAgIG1peGluczogW0V2ZW50VGFyZ2V0XSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX25hdGl2ZUFzc2V0OiB7XG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKGJpbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IEFycmF5QnVmZmVyLmlzVmlldyhiaW4pID8gYmluLmJ1ZmZlciA6IGJpbjtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRXaXRoQnVmZmVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3ZlcnRleEJ1bmRsZXM6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBWZXJ0ZXhCdW5kbGVcbiAgICAgICAgfSxcbiAgICAgICAgX3ByaW1pdGl2ZXM6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICBQcmltaXRpdmVcbiAgICAgICAgfSxcbiAgICAgICAgX21pblBvczogY2MudjMoKSxcbiAgICAgICAgX21heFBvczogY2MudjMoKSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBHZXQgaXIgc2V0IHRoZSBzdWIgbWVzaGVzLlxuICAgICAgICAgKiAhI3poIOiuvue9ruaIluiAheiOt+WPluWtkOe9keagvOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge1tJbnB1dEFzc2VtYmxlcl19IHN1Yk1lc2hlc1xuICAgICAgICAgKi9cbiAgICAgICAgc3ViTWVzaGVzOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJNZXNoZXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViTWVzaGVzID0gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBzdWJEYXRhcyA6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1YkRhdGFzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICB0aGlzLl9zdWJNZXNoZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fc3ViRGF0YXMgPSBbXTtcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgaW5pdFdpdGhCdWZmZXIgKCkge1xuICAgICAgICB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoID0gMDtcblxuICAgICAgICBsZXQgcHJpbWl0aXZlcyA9IHRoaXMuX3ByaW1pdGl2ZXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJpbWl0aXZlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHByaW1pdGl2ZSA9IHByaW1pdGl2ZXNbaV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGliXG4gICAgICAgICAgICBsZXQgaWJyYW5nZSA9IHByaW1pdGl2ZS5kYXRhO1xuICAgICAgICAgICAgbGV0IGliRGF0YSA9IG5ldyBVaW50OEFycmF5KHRoaXMuX2J1ZmZlciwgaWJyYW5nZS5vZmZzZXQsIGlicmFuZ2UubGVuZ3RoKTtcblxuICAgICAgICAgICAgLy8gdmJcbiAgICAgICAgICAgIGxldCB2ZXJ0ZXhCdW5kbGUgPSB0aGlzLl92ZXJ0ZXhCdW5kbGVzW3ByaW1pdGl2ZS52ZXJ0ZXhCdW5kbGVJbmRpY2VzWzBdXTtcbiAgICAgICAgICAgIGxldCB2YlJhbmdlID0gdmVydGV4QnVuZGxlLmRhdGE7XG4gICAgICAgICAgICBsZXQgZ2Z4VkZtdCA9IG5ldyBnZnguVmVydGV4Rm9ybWF0KHZlcnRleEJ1bmRsZS5mb3JtYXRzKTtcbiAgICAgICAgICAgIC8vIE1lc2ggYmluYXJ5IG1heSBoYXZlIHNldmVyYWwgZGF0YSBmb3JtYXQsIG11c3QgdXNlIFVpbnQ4QXJyYXkgdG8gc3RvcmUgZGF0YS5cbiAgICAgICAgICAgIGxldCB2YkRhdGEgPSBuZXcgVWludDhBcnJheSh0aGlzLl9idWZmZXIsIHZiUmFuZ2Uub2Zmc2V0LCB2YlJhbmdlLmxlbmd0aCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBjYW5CYXRjaCA9IHRoaXMuX2NhblZlcnRleEZvcm1hdEJhdGNoKGdmeFZGbXQpO1xuXG4gICAgICAgICAgICBsZXQgbWVzaERhdGEgPSBuZXcgTWVzaERhdGEoKTtcbiAgICAgICAgICAgIG1lc2hEYXRhLnZEYXRhID0gdmJEYXRhO1xuICAgICAgICAgICAgbWVzaERhdGEuaURhdGEgPSBpYkRhdGE7XG4gICAgICAgICAgICBtZXNoRGF0YS52Zm0gPSBnZnhWRm10O1xuICAgICAgICAgICAgbWVzaERhdGEub2Zmc2V0ID0gdmJSYW5nZS5vZmZzZXQ7XG4gICAgICAgICAgICBtZXNoRGF0YS5jYW5CYXRjaCA9IGNhbkJhdGNoO1xuICAgICAgICAgICAgdGhpcy5fc3ViRGF0YXMucHVzaChtZXNoRGF0YSk7XG5cbiAgICAgICAgICAgIGlmIChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICAgICAgICAgICAgICBtZXNoRGF0YS52RGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgdmJCdWZmZXIgPSBuZXcgZ2Z4LlZlcnRleEJ1ZmZlcihcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXIuZGV2aWNlLFxuICAgICAgICAgICAgICAgICAgICBnZnhWRm10LFxuICAgICAgICAgICAgICAgICAgICBnZnguVVNBR0VfU1RBVElDLFxuICAgICAgICAgICAgICAgICAgICB2YkRhdGFcbiAgICAgICAgICAgICAgICApO1xuICAgIFxuICAgICAgICAgICAgICAgIGxldCBpYkJ1ZmZlciA9IG5ldyBnZnguSW5kZXhCdWZmZXIoXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyLmRldmljZSxcbiAgICAgICAgICAgICAgICAgICAgcHJpbWl0aXZlLmluZGV4VW5pdCxcbiAgICAgICAgICAgICAgICAgICAgZ2Z4LlVTQUdFX1NUQVRJQyxcbiAgICAgICAgICAgICAgICAgICAgaWJEYXRhXG4gICAgICAgICAgICAgICAgKTtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgc3ViIG1lc2hlc1xuICAgICAgICAgICAgICAgIHRoaXMuX3N1Yk1lc2hlcy5wdXNoKG5ldyBJbnB1dEFzc2VtYmxlcih2YkJ1ZmZlciwgaWJCdWZmZXIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdCgnbG9hZCcpO1xuICAgIH0sXG5cbiAgICBfY2FuVmVydGV4Rm9ybWF0QmF0Y2ggKGZvcm1hdCkge1xuICAgICAgICBsZXQgYVBvc2l0aW9uID0gZm9ybWF0Ll9hdHRyMmVsW2dmeC5BVFRSX1BPU0lUSU9OXTtcbiAgICAgICAgbGV0IGNhbkJhdGNoID0gIWFQb3NpdGlvbiB8fCBcbiAgICAgICAgICAgIChhUG9zaXRpb24udHlwZSA9PT0gZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyICYmIFxuICAgICAgICAgICAgZm9ybWF0Ll9ieXRlcyAlIDQgPT09IDApO1xuICAgICAgICByZXR1cm4gY2FuQmF0Y2g7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBJbml0IHZlcnRleCBidWZmZXIgYWNjb3JkaW5nIHRvIHRoZSB2ZXJ0ZXggZm9ybWF0LlxuICAgICAqICEjemhcbiAgICAgKiDmoLnmja7pobbngrnmoLzlvI/liJ3lp4vljJbpobbngrnlhoXlrZjjgIJcbiAgICAgKiBAbWV0aG9kIGluaXRcbiAgICAgKiBAcGFyYW0ge2dmeC5WZXJ0ZXhGb3JtYXR9IHZlcnRleEZvcm1hdCAtIHZlcnRleCBmb3JtYXRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmVydGV4Q291bnQgLSBob3cgbXVjaCB2ZXJ0ZXggc2hvdWxkIGJlIGNyZWF0ZSBpbiB0aGlzIGJ1ZmZlci5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtkeW5hbWljXSAtIHdoZXRoZXIgb3Igbm90IHRvIHVzZSBkeW5hbWljIGJ1ZmZlci5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtpbmRleF1cbiAgICAgKi9cbiAgICBpbml0ICh2ZXJ0ZXhGb3JtYXQsIHZlcnRleENvdW50LCBkeW5hbWljID0gZmFsc2UsIGluZGV4ID0gMCkge1xuICAgICAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KHZlcnRleEZvcm1hdC5fYnl0ZXMgKiB2ZXJ0ZXhDb3VudCk7XG4gICAgICAgIGxldCBtZXNoRGF0YSA9IG5ldyBNZXNoRGF0YSgpO1xuICAgICAgICBtZXNoRGF0YS52RGF0YSA9IGRhdGE7XG4gICAgICAgIG1lc2hEYXRhLnZmbSA9IHZlcnRleEZvcm1hdDtcbiAgICAgICAgbWVzaERhdGEudkRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgbWVzaERhdGEuY2FuQmF0Y2ggPSB0aGlzLl9jYW5WZXJ0ZXhGb3JtYXRCYXRjaCh2ZXJ0ZXhGb3JtYXQpO1xuXG4gICAgICAgIGlmICghKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikpIHtcbiAgICAgICAgICAgIGxldCB2YiA9IG5ldyBnZnguVmVydGV4QnVmZmVyKFxuICAgICAgICAgICAgICAgIHJlbmRlcmVyLmRldmljZSxcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhGb3JtYXQsXG4gICAgICAgICAgICAgICAgZHluYW1pYyA/IGdmeC5VU0FHRV9EWU5BTUlDIDogZ2Z4LlVTQUdFX1NUQVRJQyxcbiAgICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbWVzaERhdGEudmIgPSB2YjsgXG4gICAgICAgICAgICB0aGlzLl9zdWJNZXNoZXNbaW5kZXhdID0gbmV3IElucHV0QXNzZW1ibGVyKG1lc2hEYXRhLnZiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvbGRTdWJEYXRhID0gdGhpcy5fc3ViRGF0YXNbaW5kZXhdO1xuICAgICAgICBpZiAob2xkU3ViRGF0YSkge1xuICAgICAgICAgICAgaWYgKG9sZFN1YkRhdGEudmIpIHtcbiAgICAgICAgICAgICAgICBvbGRTdWJEYXRhLnZiLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvbGRTdWJEYXRhLmliKSB7XG4gICAgICAgICAgICAgICAgb2xkU3ViRGF0YS5pYi5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zdWJEYXRhc1tpbmRleF0gPSBtZXNoRGF0YTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWl0KCdsb2FkJyk7XG4gICAgICAgIHRoaXMuZW1pdCgnaW5pdC1mb3JtYXQnKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldCB0aGUgdmVydGV4IHZhbHVlcy5cbiAgICAgKiAhI3poIFxuICAgICAqIOiuvue9rumhtueCueaVsOaNrlxuICAgICAqIEBtZXRob2Qgc2V0VmVydGljZXNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIHRoZSBhdHRyaWJ1dGUgbmFtZSwgZS5nLiBnZnguQVRUUl9QT1NJVElPTlxuICAgICAqIEBwYXJhbSB7W1ZlYzJdIHwgW1ZlYzNdIHwgW0NvbG9yXSB8IFtOdW1iZXJdIHwgVWludDhBcnJheSB8IEZsb2F0MzJBcnJheX0gdmFsdWVzIC0gdGhlIHZlcnRleCB2YWx1ZXNcbiAgICAgKi9cbiAgICBzZXRWZXJ0aWNlcyAobmFtZSwgdmFsdWVzLCBpbmRleCkge1xuICAgICAgICBpbmRleCA9IGluZGV4IHx8IDA7XG4gICAgICAgIGxldCBzdWJEYXRhID0gdGhpcy5fc3ViRGF0YXNbaW5kZXhdO1xuXG4gICAgICAgIGxldCBlbCA9IHN1YkRhdGEudmZtLmVsZW1lbnQobmFtZSk7XG4gICAgICAgIGlmICghZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBjYy53YXJuKGBDYW5ub3QgZmluZCAke25hbWV9IGF0dHJpYnV0ZSBpbiB2ZXJ0ZXggZGVmaW5lcy5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdoZXRoZXIgdGhlIHZhbHVlcyBpcyBleHBhbmRlZFxuICAgICAgICBsZXQgaXNGbGF0TW9kZSA9IHR5cGVvZiB2YWx1ZXNbMF0gPT09ICdudW1iZXInO1xuXG4gICAgICAgIGxldCBlbE51bSA9IGVsLm51bTtcbiAgICAgICAgbGV0IHZlcnRpY2VzQ291bnQgPSBpc0ZsYXRNb2RlID8gKCh2YWx1ZXMubGVuZ3RoIC8gZWxOdW0pIHwgMCkgOiB2YWx1ZXMubGVuZ3RoO1xuICAgICAgICBpZiAoc3ViRGF0YS52RGF0YS5ieXRlTGVuZ3RoIDwgdmVydGljZXNDb3VudCAqIGVsLnN0cmlkZSkge1xuICAgICAgICAgICAgc3ViRGF0YS5zZXRWRGF0YShuZXcgVWludDhBcnJheSh2ZXJ0aWNlc0NvdW50ICogc3ViRGF0YS52Zm0uX2J5dGVzKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgbGV0IGJ5dGVzID0gNDtcbiAgICAgICAgaWYgKG5hbWUgPT09IGdmeC5BVFRSX0NPTE9SKSB7XG4gICAgICAgICAgICBpZiAoIWlzRmxhdE1vZGUpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gc3ViRGF0YS5nZXRWRGF0YShVaW50MzJBcnJheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gc3ViRGF0YS5nZXRWRGF0YSgpO1xuICAgICAgICAgICAgICAgIGJ5dGVzID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhID0gc3ViRGF0YS5nZXRWRGF0YShGbG9hdDMyQXJyYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHN0cmlkZSA9IGVsLnN0cmlkZSAvIGJ5dGVzO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gZWwub2Zmc2V0IC8gYnl0ZXM7XG5cbiAgICAgICAgaWYgKGlzRmxhdE1vZGUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gKHZhbHVlcy5sZW5ndGggLyBlbE51bSk7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc09mZnNldCA9IGkgKiBlbE51bTtcbiAgICAgICAgICAgICAgICBsZXQgZE9mZnNldCA9IGkgKiBzdHJpZGUgKyBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBlbE51bTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFbZE9mZnNldCArIGpdID0gdmFsdWVzW3NPZmZzZXQgKyBqXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgYXBwbHlGdW5jO1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGdmeC5BVFRSX0NPTE9SKSB7XG4gICAgICAgICAgICAgICAgYXBwbHlGdW5jID0gYXBwbHlDb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChlbE51bSA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICBhcHBseUZ1bmMgPSBhcHBseVZlYzI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhcHBseUZ1bmMgPSBhcHBseVZlYzM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHZhbHVlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgdiA9IHZhbHVlc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgdk9mZnNldCA9IGkgKiBzdHJpZGUgKyBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgYXBwbHlGdW5jKGRhdGEsIHZPZmZzZXQsIHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1YkRhdGEudkRpcnR5ID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldCB0aGUgc3ViIG1lc2ggaW5kaWNlcy5cbiAgICAgKiAhI3poXG4gICAgICog6K6+572u5a2Q572R5qC857Si5byV44CCXG4gICAgICogQG1ldGhvZCBzZXRJbmRpY2VzXG4gICAgICogQHBhcmFtIHtbTnVtYmVyXXxVaW50MTZBcnJheXxVaW50OEFycmF5fSBpbmRpY2VzIC0gdGhlIHN1YiBtZXNoIGluZGljZXMuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtpbmRleF0gLSBzdWIgbWVzaCBpbmRleC5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtkeW5hbWljXSAtIHdoZXRoZXIgb3Igbm90IHRvIHVzZSBkeW5hbWljIGJ1ZmZlci5cbiAgICAgKi9cbiAgICBzZXRJbmRpY2VzIChpbmRpY2VzLCBpbmRleCwgZHluYW1pYykge1xuICAgICAgICBpbmRleCA9IGluZGV4IHx8IDA7XG5cbiAgICAgICAgbGV0IGlEYXRhID0gaW5kaWNlcztcbiAgICAgICAgaWYgKGluZGljZXMgaW5zdGFuY2VvZiBVaW50MTZBcnJheSkge1xuICAgICAgICAgICAgaURhdGEgPSBuZXcgVWludDhBcnJheShpbmRpY2VzLmJ1ZmZlciwgaW5kaWNlcy5ieXRlT2Zmc2V0LCBpbmRpY2VzLmJ5dGVMZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaW5kaWNlcykpIHtcbiAgICAgICAgICAgIGlEYXRhID0gbmV3IFVpbnQxNkFycmF5KGluZGljZXMpO1xuICAgICAgICAgICAgaURhdGEgPSBuZXcgVWludDhBcnJheShpRGF0YS5idWZmZXIsIGlEYXRhLmJ5dGVPZmZzZXQsIGlEYXRhLmJ5dGVMZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHVzYWdlID0gZHluYW1pYyA/IGdmeC5VU0FHRV9EWU5BTUlDIDogZ2Z4LlVTQUdFX1NUQVRJQztcblxuICAgICAgICBsZXQgc3ViRGF0YSA9IHRoaXMuX3N1YkRhdGFzW2luZGV4XTtcbiAgICAgICAgaWYgKCFzdWJEYXRhLmliKSB7XG4gICAgICAgICAgICBzdWJEYXRhLmlEYXRhID0gaURhdGE7XG4gICAgICAgICAgICBpZiAoIShDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZlciA9IG5ldyBnZnguSW5kZXhCdWZmZXIoXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyLmRldmljZSxcbiAgICAgICAgICAgICAgICAgICAgZ2Z4LklOREVYX0ZNVF9VSU5UMTYsXG4gICAgICAgICAgICAgICAgICAgIHVzYWdlLFxuICAgICAgICAgICAgICAgICAgICBpRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgaURhdGEuYnl0ZUxlbmd0aCAvIGdmeC5JbmRleEJ1ZmZlci5CWVRFU19QRVJfSU5ERVhbZ2Z4LklOREVYX0ZNVF9VSU5UMTZdXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHN1YkRhdGEuaWIgPSBidWZmZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViTWVzaGVzW2luZGV4XS5faW5kZXhCdWZmZXIgPSBzdWJEYXRhLmliO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3ViRGF0YS5pRGF0YSA9IGlEYXRhO1xuICAgICAgICAgICAgc3ViRGF0YS5pRGlydHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXQgdGhlIHN1YiBtZXNoIHByaW1pdGl2ZSB0eXBlLlxuICAgICAqICEjemhcbiAgICAgKiDorr7nva7lrZDnvZHmoLznu5jliLbnur/mnaHnmoTmlrnlvI/jgIJcbiAgICAgKiBAbWV0aG9kIHNldFByaW1pdGl2ZVR5cGVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdHlwZSBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggXG4gICAgICovXG4gICAgc2V0UHJpbWl0aXZlVHlwZSAodHlwZSwgaW5kZXgpIHtcbiAgICAgICAgaW5kZXggPSBpbmRleCB8fCAwO1xuICAgICAgICBsZXQgc3ViTWVzaCA9IHRoaXMuX3N1Yk1lc2hlc1tpbmRleF07XG4gICAgICAgIGlmICghc3ViTWVzaCkge1xuICAgICAgICAgICAgY2Mud2FybihgRG8gbm90IGhhdmUgc3ViIG1lc2ggYXQgaW5kZXggJHtpbmRleH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdWJNZXNoZXNbaW5kZXhdLl9wcmltaXRpdmVUeXBlID0gdHlwZTtcbiAgICB9LFxuXG4gICAgLyoqIFxuICAgICAqICEjZW5cbiAgICAgKiBDbGVhciB0aGUgYnVmZmVyIGRhdGEuXG4gICAgICogISN6aFxuICAgICAqIOa4hemZpOe9keagvOWIm+W7uueahOWGheWtmOaVsOaNruOAglxuICAgICAqIEBtZXRob2QgY2xlYXJcbiAgICAqL1xuICAgIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5fc3ViTWVzaGVzLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgbGV0IHN1YkRhdGFzID0gdGhpcy5fc3ViRGF0YXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzdWJEYXRhcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IHZiID0gc3ViRGF0YXNbaV0udmI7XG4gICAgICAgICAgICBpZiAodmIpIHtcbiAgICAgICAgICAgICAgICB2Yi5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBpYiA9IHN1YkRhdGFzW2ldLmliO1xuICAgICAgICAgICAgaWYgKGliKSB7XG4gICAgICAgICAgICAgICAgaWIuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1YkRhdGFzLmxlbmd0aCA9IDA7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IG1lc2ggYm91bmRpbmcgYm94XG4gICAgICogISN6aCDorr7nva7nvZHmoLznmoTljIXlm7Tnm5JcbiAgICAgKiBAbWV0aG9kIHNldEJvdW5kaW5nQm94XG4gICAgICogQHBhcmFtIHtWZWMzfSBtaW4gXG4gICAgICogQHBhcmFtIHtWZWMzfSBtYXggXG4gICAgICovXG4gICAgc2V0Qm91bmRpbmdCb3ggKG1pbiwgbWF4KSB7XG4gICAgICAgIHRoaXMuX21pblBvcyA9IG1pbjtcbiAgICAgICAgdGhpcy5fbWF4UG9zID0gbWF4O1xuICAgIH0sXG5cbiAgICBkZXN0cm95ICgpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH0sXG5cbiAgICBfdXBsb2FkRGF0YSAoKSB7XG4gICAgICAgIGxldCBzdWJEYXRhcyA9IHRoaXMuX3N1YkRhdGFzO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc3ViRGF0YXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzdWJEYXRhID0gc3ViRGF0YXNbaV07XG5cbiAgICAgICAgICAgIGlmIChzdWJEYXRhLnZEaXJ0eSkge1xuICAgICAgICAgICAgICAgIGxldCBidWZmZXIgPSBzdWJEYXRhLnZiLCBkYXRhID0gc3ViRGF0YS52RGF0YTtcbiAgICAgICAgICAgICAgICBidWZmZXIudXBkYXRlKDAsIGRhdGEpO1xuICAgICAgICAgICAgICAgIHN1YkRhdGEudkRpcnR5ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdWJEYXRhLmlEaXJ0eSkge1xuICAgICAgICAgICAgICAgIGxldCBidWZmZXIgPSBzdWJEYXRhLmliLCBkYXRhID0gc3ViRGF0YS5pRGF0YTtcbiAgICAgICAgICAgICAgICBidWZmZXIudXBkYXRlKDAsIGRhdGEpO1xuICAgICAgICAgICAgICAgIHN1YkRhdGEuaURpcnR5ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2dldEF0dHJNZXNoRGF0YSAoc3ViRGF0YUluZGV4LCBuYW1lKSB7XG4gICAgICAgIGxldCBzdWJEYXRhID0gdGhpcy5fc3ViRGF0YXNbc3ViRGF0YUluZGV4XTtcbiAgICAgICAgaWYgKCFzdWJEYXRhKSByZXR1cm4gW107XG5cbiAgICAgICAgbGV0IGZvcm1hdCA9IHN1YkRhdGEudmZtO1xuICAgICAgICBsZXQgZm10ID0gZm9ybWF0LmVsZW1lbnQobmFtZSk7XG4gICAgICAgIGlmICghZm10KSByZXR1cm4gW107XG5cbiAgICAgICAgaWYgKCFzdWJEYXRhLmF0dHJEYXRhcykge1xuICAgICAgICAgICAgc3ViRGF0YS5hdHRyRGF0YXMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYXR0ckRhdGFzID0gc3ViRGF0YS5hdHRyRGF0YXM7XG4gICAgICAgIGxldCBkYXRhID0gYXR0ckRhdGFzW25hbWVdO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhID0gYXR0ckRhdGFzW25hbWVdID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmJEYXRhID0gc3ViRGF0YS52RGF0YTtcbiAgICAgICAgbGV0IGR2ID0gbmV3IERhdGFWaWV3KHZiRGF0YS5idWZmZXIsIHZiRGF0YS5ieXRlT2Zmc2V0LCB2YkRhdGEuYnl0ZUxlbmd0aCk7XG5cbiAgICAgICAgbGV0IHN0cmlkZSA9IGZtdC5zdHJpZGU7XG4gICAgICAgIGxldCBlbGVPZmZzZXQgPSBmbXQub2Zmc2V0O1xuICAgICAgICBsZXQgZWxlTnVtID0gZm10Lm51bTtcbiAgICAgICAgbGV0IGVsZUJ5dGUgPSBmbXQuYnl0ZXMgLyBlbGVOdW07XG4gICAgICAgIGxldCBmbiA9IF9jb21wVHlwZTJmbltmbXQudHlwZV07XG4gICAgICAgIGxldCB2ZXJ0ZXhDb3VudCA9IHZiRGF0YS5ieXRlTGVuZ3RoIC8gZm9ybWF0Ll9ieXRlcztcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmVydGV4Q291bnQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IG9mZnNldCA9IGkgKiBzdHJpZGUgKyBlbGVPZmZzZXQ7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGVsZU51bTsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHYgPSBkdltmbl0ob2Zmc2V0ICsgaiAqIGVsZUJ5dGUsIGxpdHRsZUVuZGlhbik7XG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmVhZCB0aGUgc3BlY2lmaWVkIGF0dHJpYnV0ZXMgb2YgdGhlIHN1YmdyaWQgaW50byB0aGUgdGFyZ2V0IGJ1ZmZlci5cbiAgICAgKiAhI3poIOivu+WPluWtkOe9keagvOeahOaMh+WumuWxnuaAp+WIsOebruagh+e8k+WGsuWMuuS4reOAglxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwcmltaXRpdmVJbmRleCBUaGUgc3ViZ3JpZCBpbmRleC5cbsKgwqDCoMKgwqAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyaWJ1dGVOYW1lIGF0dHJpYnV0ZSBuYW1lLlxuwqDCoMKgwqDCoCogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYnVmZmVyIFRoZSB0YXJnZXQgYnVmZmVyLlxuwqDCoMKgwqDCoCogQHBhcmFtIHtOdW1iZXJ9IHN0cmlkZSBUaGUgYnl0ZSBpbnRlcnZhbCBiZXR3ZWVuIGFkamFjZW50IGF0dHJpYnV0ZXMgaW4gdGhlIHRhcmdldCBidWZmZXIuXG7CoMKgwqDCoMKgKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgb2YgdGhlIGZpcnN0IGF0dHJpYnV0ZSBpbiB0aGUgdGFyZ2V0IGJ1ZmZlci5cbsKgwqDCoMKgwqAqIEByZXR1cm5zIHtCb29sZWFufSBJZiB0aGUgc3BlY2lmaWVkIHN1Yi1ncmlkIGRvZXMgbm90IGV4aXN0LCB0aGUgc3ViLWdyaWQgZG9lcyBub3QgZXhpc3QsIG9yIHRoZSBzcGVjaWZpZWQgYXR0cmlidXRlIGNhbm5vdCBiZSByZWFkLCByZXR1cm4gYGZhbHNlYCwgb3RoZXJ3aXNlIHJldHVybmAgdHJ1ZWAuXG4gICAgICogQG1ldGhvZCBjb3B5QXR0cmlidXRlXG4gICAgICovXG4gICAgY29weUF0dHJpYnV0ZSAocHJpbWl0aXZlSW5kZXgsIGF0dHJpYnV0ZU5hbWUsIGJ1ZmZlciwgc3RyaWRlLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IHdyaXR0ZW4gPSBmYWxzZTtcbiAgICAgICAgbGV0IHN1YkRhdGEgPSB0aGlzLl9zdWJEYXRhc1twcmltaXRpdmVJbmRleF07XG5cbiAgICAgICAgaWYgKCFzdWJEYXRhKSByZXR1cm4gd3JpdHRlbjtcblxuICAgICAgICBsZXQgZm9ybWF0ID0gc3ViRGF0YS52Zm07XG4gICAgICAgIGxldCBmbXQgPSBmb3JtYXQuZWxlbWVudChhdHRyaWJ1dGVOYW1lKTtcblxuICAgICAgICBpZiAoIWZtdCkgcmV0dXJuIHdyaXR0ZW47XG5cbiAgICAgICAgbGV0IHdyaXR0ZXIgPSBfY29tcFR5cGUyd3JpdGVbZm10LnR5cGVdO1xuXG4gICAgICAgIGlmICghd3JpdHRlcikgcmV0dXJuIHdyaXR0ZW47XG5cbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLl9nZXRBdHRyTWVzaERhdGEocHJpbWl0aXZlSW5kZXgsIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICBsZXQgdmVydGV4Q291bnQgPSBzdWJEYXRhLnZEYXRhLmJ5dGVMZW5ndGggLyBmb3JtYXQuX2J5dGVzO1xuICAgICAgICBsZXQgZWxlQnl0ZSA9IGZtdC5ieXRlcyAvIGZtdC5udW07XG5cbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3Qgb3V0cHV0VmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIsIG9mZnNldCk7XG4gICAgICAgIFxuICAgICAgICAgICAgbGV0IG91dHB1dFN0cmlkZSA9IHN0cmlkZTtcbiAgICAgICAgICAgIGxldCBudW0gPSBmbXQubnVtO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZlcnRleENvdW50OyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBpICogbnVtO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXRPZmZzZXQgPSBpbmRleCArIGo7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG91dHB1dE9mZnNldCA9IG91dHB1dFN0cmlkZSAqIGkgKyBlbGVCeXRlICogajtcblxuICAgICAgICAgICAgICAgICAgICBvdXRwdXRWaWV3W3dyaXR0ZXJdKG91dHB1dE9mZnNldCwgZGF0YVtpbnB1dE9mZnNldF0sIGxpdHRsZUVuZGlhbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3cml0dGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB3cml0dGVuO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJlYWQgdGhlIGluZGV4IGRhdGEgb2YgdGhlIHN1YmdyaWQgaW50byB0aGUgdGFyZ2V0IGFycmF5LlxuICAgICAqICEjemgg6K+75Y+W5a2Q572R5qC855qE57Si5byV5pWw5o2u5Yiw55uu5qCH5pWw57uE5Lit44CCXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHByaW1pdGl2ZUluZGV4IFRoZSBzdWJncmlkIGluZGV4LlxuwqDCoMKgwqDCoCogQHBhcmFtIHtUeXBlZEFycmF5fSBvdXRwdXRBcnJheSBUaGUgdGFyZ2V0IGFycmF5LlxuwqDCoMKgwqDCoCogQHJldHVybnMge0Jvb2xlYW59IHJldHVybnMgYGZhbHNlYCBpZiB0aGUgc3BlY2lmaWVkIHN1Yi1ncmlkIGRvZXMgbm90IGV4aXN0IG9yIHRoZSBzdWItZ3JpZCBkb2VzIG5vdCBoYXZlIGluZGV4IGRhdGEsIG90aGVyd2lzZSByZXR1cm5zYCB0cnVlYC5cbiAgICAgKiBAbWV0aG9kIGNvcHlJbmRpY2VzXG4gICAgICovXG4gICAgY29weUluZGljZXMgKHByaW1pdGl2ZUluZGV4LCBvdXRwdXRBcnJheSkge1xuICAgICAgICBsZXQgc3ViRGF0YSA9IHRoaXMuX3N1YkRhdGFzW3ByaW1pdGl2ZUluZGV4XTtcblxuICAgICAgICBpZiAoIXN1YkRhdGEpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBjb25zdCBpRGF0YSA9IHN1YkRhdGEuaURhdGE7XG4gICAgICAgIGNvbnN0IGluZGV4Q291bnQgPSBpRGF0YS5sZW5ndGggLyAyO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoaURhdGEuYnVmZmVyLCBpRGF0YS5ieXRlT2Zmc2V0LCBpRGF0YS5ieXRlTGVuZ3RoKTtcbiAgICAgICAgY29uc3QgZm4gPSBfY29tcFR5cGUyZm5bZ2Z4LklOREVYX0ZNVF9VSU5UOF07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleENvdW50OyArK2kpIHtcbiAgICAgICAgICAgIG91dHB1dEFycmF5W2ldID0gZHZbZm5dKGkgKiAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0pO1xuXG5jYy5NZXNoID0gbW9kdWxlLmV4cG9ydHMgPSBNZXNoO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=