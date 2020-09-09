
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/mesh/mesh-data.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.MeshData = MeshData;
exports.Primitive = exports.VertexBundle = exports.VertexFormat = exports.BufferRange = void 0;

var _gfx = _interopRequireDefault(require("../../renderer/gfx"));

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

/**
 * The class BufferRange denotes a range of the buffer.
 * @class BufferRange
 */
var BufferRange = cc.Class({
  name: 'cc.BufferRange',
  properties: {
    /**
     * The offset of the range.
     * @property {Number} offset
     */
    offset: 0,

    /**
     * The length of the range.
     * @property {Number} length
     */
    length: 0
  }
});
/**
 * @class VertexFormat
 */

exports.BufferRange = BufferRange;
var VertexFormat = cc.Class({
  name: 'cc.mesh.VertexFormat',
  properties: {
    name: '',
    type: -1,
    num: -1,
    normalize: false
  }
});
/**
 * A vertex bundle describes a serials of vertex attributes.
 * These vertex attributes occupy a range of the buffer and
 * are interleaved, no padding bytes, in the range.
 */

exports.VertexFormat = VertexFormat;
var VertexBundle = cc.Class({
  name: 'cc.mesh.VertexBundle',
  properties: {
    /**
     * The data range of this bundle.
     * This range of data is essentially mapped to a GPU vertex buffer.
     * @property {BufferRange} data
     */
    data: {
      "default": null,
      type: BufferRange
    },

    /**
     * The attribute formats.
     * @property {VertexFormat} formats
     */
    formats: {
      "default": [],
      type: VertexFormat
    },

    /**
     * The bundle's vertices count.
     */
    verticesCount: 0
  }
});
/**
 * A primitive is a geometry constituted with a list of
 * same topology primitive graphic(such as points, lines or triangles).
 */

exports.VertexBundle = VertexBundle;
var Primitive = cc.Class({
  name: 'cc.mesh.Primitive',
  properties: {
    /**
     * The vertex bundle that the primitive use.
     * @property {[Number]} vertexBundleIndices
     */
    vertexBundleIndices: {
      "default": [],
      type: cc.Float
    },

    /**
     * The data range of the primitive.
     * This range of data is essentially mapped to a GPU indices buffer.
     * @property {BufferRange} data
     */
    data: {
      "default": null,
      type: BufferRange
    },

    /**
     * The type of this primitive's indices.
     * @property {Number} indexUnit
     */
    indexUnit: _gfx["default"].INDEX_FMT_UINT16,

    /**
     * The primitive's topology.
     * @property {Number} topology
     */
    topology: _gfx["default"].PT_TRIANGLES
  }
});
exports.Primitive = Primitive;

function MeshData() {
  this.vData = null; // Uint8Array;

  this.float32VData = null;
  this.uint32VData = null;
  this.iData = null; // Uint8Array;

  this.uint16IData = null;
  this.vfm = null;
  this.offset = 0;
  this.vb = null;
  this.ib = null;
  this.vDirty = false;
  this.iDirty = false;
  this.enable = true;
}

MeshData.prototype.setVData = function (data) {
  this.vData = data;
  this.float32VData = null;
  this.uint32VData = null;
};

MeshData.prototype.getVData = function (format) {
  if (format === Float32Array) {
    if (!this.float32VData) {
      this.float32VData = new Float32Array(this.vData.buffer, this.vData.byteOffset, this.vData.byteLength / 4);
    }

    return this.float32VData;
  } else if (format === Uint32Array) {
    if (!this.uint32VData) {
      this.uint32VData = new Uint32Array(this.vData.buffer, this.vData.byteOffset, this.vData.byteLength / 4);
    }

    return this.uint32VData;
  }

  return this.vData;
};

MeshData.prototype.getIData = function (format) {
  if (format === Uint16Array) {
    if (!this.uint16IData) {
      this.uint16IData = new Uint16Array(this.iData.buffer, this.iData.byteOffset, this.iData.byteLength / 2);
    }

    return this.uint16IData;
  }

  return this.iData;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL21lc2gvbWVzaC1kYXRhLmpzIl0sIm5hbWVzIjpbIkJ1ZmZlclJhbmdlIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwib2Zmc2V0IiwibGVuZ3RoIiwiVmVydGV4Rm9ybWF0IiwidHlwZSIsIm51bSIsIm5vcm1hbGl6ZSIsIlZlcnRleEJ1bmRsZSIsImRhdGEiLCJmb3JtYXRzIiwidmVydGljZXNDb3VudCIsIlByaW1pdGl2ZSIsInZlcnRleEJ1bmRsZUluZGljZXMiLCJGbG9hdCIsImluZGV4VW5pdCIsImdmeCIsIklOREVYX0ZNVF9VSU5UMTYiLCJ0b3BvbG9neSIsIlBUX1RSSUFOR0xFUyIsIk1lc2hEYXRhIiwidkRhdGEiLCJmbG9hdDMyVkRhdGEiLCJ1aW50MzJWRGF0YSIsImlEYXRhIiwidWludDE2SURhdGEiLCJ2Zm0iLCJ2YiIsImliIiwidkRpcnR5IiwiaURpcnR5IiwiZW5hYmxlIiwicHJvdG90eXBlIiwic2V0VkRhdGEiLCJnZXRWRGF0YSIsImZvcm1hdCIsIkZsb2F0MzJBcnJheSIsImJ1ZmZlciIsImJ5dGVPZmZzZXQiLCJieXRlTGVuZ3RoIiwiVWludDMyQXJyYXkiLCJnZXRJRGF0YSIsIlVpbnQxNkFycmF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7OztBQXpCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQTs7OztBQUlPLElBQUlBLFdBQVcsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDOUJDLEVBQUFBLElBQUksRUFBRSxnQkFEd0I7QUFHOUJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSOzs7O0FBSUFDLElBQUFBLE1BQU0sRUFBRSxDQUxBOztBQU1SOzs7O0FBSUFDLElBQUFBLE1BQU0sRUFBRTtBQVZBO0FBSGtCLENBQVQsQ0FBbEI7QUFpQlA7Ozs7O0FBR08sSUFBSUMsWUFBWSxHQUFHTixFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUMv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QXVCO0FBQ25CLFdBQUtBLFdBQUwsR0FBbUIsSUFBSWlCLFdBQUosQ0FBZ0IsS0FBS25CLEtBQUwsQ0FBV2dCLE1BQTNCLEVBQW1DLEtBQUtoQixLQUFMLENBQVdpQixVQUE5QyxFQUEwRCxLQUFLakIsS0FBTCxDQUFXa0IsVUFBWCxHQUF3QixDQUFsRixDQUFuQjtBQUNIOztBQUNELFdBQU8sS0FBS2hCLFdBQVo7QUFDSDs7QUFDRCxTQUFPLEtBQUtGLEtBQVo7QUFDSCxDQWREOztBQWdCQUQsUUFBUSxDQUFDWSxTQUFULENBQW1CUyxRQUFuQixHQUE4QixVQUFVTixNQUFWLEVBQWtCO0FBQzVDLE1BQUlBLE1BQU0sS0FBS08sV0FBZixFQUE0QjtBQUN4QixRQUFJLENBQUMsS0FBS2pCLFdBQVYsRUFBdUI7QUFDbkIsV0FBS0EsV0FBTCxHQUFtQixJQUFJaUIsV0FBSixDQUFnQixLQUFLbEIsS0FBTCxDQUFXYSxNQUEzQixFQUFtQyxLQUFLYixLQUFMLENBQVdjLFVBQTlDLEVBQTBELEtBQUtkLEtBQUwsQ0FBV2UsVUFBWCxHQUF3QixDQUFsRixDQUFuQjtBQUNIOztBQUNELFdBQU8sS0FBS2QsV0FBWjtBQUNIOztBQUNELFNBQU8sS0FBS0QsS0FBWjtBQUNILENBUkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cDovL3d3dy5jb2Nvcy5jb21cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBnZnggZnJvbSAnLi4vLi4vcmVuZGVyZXIvZ2Z4JztcblxuLyoqXG4gKiBUaGUgY2xhc3MgQnVmZmVyUmFuZ2UgZGVub3RlcyBhIHJhbmdlIG9mIHRoZSBidWZmZXIuXG4gKiBAY2xhc3MgQnVmZmVyUmFuZ2VcbiAqL1xuZXhwb3J0IGxldCBCdWZmZXJSYW5nZSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuQnVmZmVyUmFuZ2UnLFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG9mZnNldCBvZiB0aGUgcmFuZ2UuXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBvZmZzZXRcbiAgICAgICAgICovXG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBsZW5ndGggb2YgdGhlIHJhbmdlLlxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbGVuZ3RoXG4gICAgICAgICAqL1xuICAgICAgICBsZW5ndGg6IDBcbiAgICB9XG59KTtcblxuLyoqXG4gKiBAY2xhc3MgVmVydGV4Rm9ybWF0XG4gKi9cbmV4cG9ydCBsZXQgVmVydGV4Rm9ybWF0ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5tZXNoLlZlcnRleEZvcm1hdCcsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICB0eXBlOiAtMSxcbiAgICAgICAgbnVtOiAtMSxcbiAgICAgICAgbm9ybWFsaXplOiBmYWxzZVxuICAgIH1cbn0pO1xuXG4vKipcbiAqIEEgdmVydGV4IGJ1bmRsZSBkZXNjcmliZXMgYSBzZXJpYWxzIG9mIHZlcnRleCBhdHRyaWJ1dGVzLlxuICogVGhlc2UgdmVydGV4IGF0dHJpYnV0ZXMgb2NjdXB5IGEgcmFuZ2Ugb2YgdGhlIGJ1ZmZlciBhbmRcbiAqIGFyZSBpbnRlcmxlYXZlZCwgbm8gcGFkZGluZyBieXRlcywgaW4gdGhlIHJhbmdlLlxuICovXG5leHBvcnQgbGV0IFZlcnRleEJ1bmRsZSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MubWVzaC5WZXJ0ZXhCdW5kbGUnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkYXRhIHJhbmdlIG9mIHRoaXMgYnVuZGxlLlxuICAgICAgICAgKiBUaGlzIHJhbmdlIG9mIGRhdGEgaXMgZXNzZW50aWFsbHkgbWFwcGVkIHRvIGEgR1BVIHZlcnRleCBidWZmZXIuXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7QnVmZmVyUmFuZ2V9IGRhdGFcbiAgICAgICAgICovXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBCdWZmZXJSYW5nZVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGF0dHJpYnV0ZSBmb3JtYXRzLlxuICAgICAgICAgKiBAcHJvcGVydHkge1ZlcnRleEZvcm1hdH0gZm9ybWF0c1xuICAgICAgICAgKi9cbiAgICAgICAgZm9ybWF0czoge1xuICAgICAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgICAgICB0eXBlOiBWZXJ0ZXhGb3JtYXRcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBidW5kbGUncyB2ZXJ0aWNlcyBjb3VudC5cbiAgICAgICAgICovXG4gICAgICAgIHZlcnRpY2VzQ291bnQ6IDAsXG4gICAgfVxufSk7XG5cbi8qKlxuICogQSBwcmltaXRpdmUgaXMgYSBnZW9tZXRyeSBjb25zdGl0dXRlZCB3aXRoIGEgbGlzdCBvZlxuICogc2FtZSB0b3BvbG9neSBwcmltaXRpdmUgZ3JhcGhpYyhzdWNoIGFzIHBvaW50cywgbGluZXMgb3IgdHJpYW5nbGVzKS5cbiAqL1xuZXhwb3J0IGxldCBQcmltaXRpdmUgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLm1lc2guUHJpbWl0aXZlJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdmVydGV4IGJ1bmRsZSB0aGF0IHRoZSBwcmltaXRpdmUgdXNlLlxuICAgICAgICAgKiBAcHJvcGVydHkge1tOdW1iZXJdfSB2ZXJ0ZXhCdW5kbGVJbmRpY2VzXG4gICAgICAgICAqL1xuICAgICAgICB2ZXJ0ZXhCdW5kbGVJbmRpY2VzOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IGNjLkZsb2F0XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZGF0YSByYW5nZSBvZiB0aGUgcHJpbWl0aXZlLlxuICAgICAgICAgKiBUaGlzIHJhbmdlIG9mIGRhdGEgaXMgZXNzZW50aWFsbHkgbWFwcGVkIHRvIGEgR1BVIGluZGljZXMgYnVmZmVyLlxuICAgICAgICAgKiBAcHJvcGVydHkge0J1ZmZlclJhbmdlfSBkYXRhXG4gICAgICAgICAqL1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogQnVmZmVyUmFuZ2VcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0eXBlIG9mIHRoaXMgcHJpbWl0aXZlJ3MgaW5kaWNlcy5cbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGluZGV4VW5pdFxuICAgICAgICAgKi9cbiAgICAgICAgaW5kZXhVbml0OiBnZnguSU5ERVhfRk1UX1VJTlQxNixcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBwcmltaXRpdmUncyB0b3BvbG9neS5cbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRvcG9sb2d5XG4gICAgICAgICAqL1xuICAgICAgICB0b3BvbG9neTogZ2Z4LlBUX1RSSUFOR0xFU1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gTWVzaERhdGEgKCkge1xuICAgIHRoaXMudkRhdGEgPSBudWxsOyAgLy8gVWludDhBcnJheTtcbiAgICB0aGlzLmZsb2F0MzJWRGF0YSA9IG51bGw7XG4gICAgdGhpcy51aW50MzJWRGF0YSA9IG51bGw7XG4gICAgdGhpcy5pRGF0YSA9IG51bGw7ICAvLyBVaW50OEFycmF5O1xuICAgIHRoaXMudWludDE2SURhdGEgPSBudWxsO1xuICAgIHRoaXMudmZtID0gbnVsbDtcbiAgICB0aGlzLm9mZnNldCA9IDA7XG5cbiAgICB0aGlzLnZiID0gbnVsbDtcbiAgICB0aGlzLmliID0gbnVsbDtcbiAgICB0aGlzLnZEaXJ0eSA9IGZhbHNlO1xuICAgIHRoaXMuaURpcnR5ID0gZmFsc2U7XG5cbiAgICB0aGlzLmVuYWJsZSA9IHRydWU7XG59XG5cbk1lc2hEYXRhLnByb3RvdHlwZS5zZXRWRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy52RGF0YSA9IGRhdGE7XG4gICAgdGhpcy5mbG9hdDMyVkRhdGEgPSBudWxsO1xuICAgIHRoaXMudWludDMyVkRhdGEgPSBudWxsO1xufVxuXG5NZXNoRGF0YS5wcm90b3R5cGUuZ2V0VkRhdGEgPSBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gRmxvYXQzMkFycmF5KSB7XG4gICAgICAgIGlmICghdGhpcy5mbG9hdDMyVkRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuZmxvYXQzMlZEYXRhID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnZEYXRhLmJ1ZmZlciwgdGhpcy52RGF0YS5ieXRlT2Zmc2V0LCB0aGlzLnZEYXRhLmJ5dGVMZW5ndGggLyA0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5mbG9hdDMyVkRhdGE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGZvcm1hdCA9PT0gVWludDMyQXJyYXkpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVpbnQzMlZEYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnVpbnQzMlZEYXRhID0gbmV3IFVpbnQzMkFycmF5KHRoaXMudkRhdGEuYnVmZmVyLCB0aGlzLnZEYXRhLmJ5dGVPZmZzZXQsIHRoaXMudkRhdGEuYnl0ZUxlbmd0aCAvIDQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVpbnQzMlZEYXRhO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy52RGF0YTtcbn1cblxuTWVzaERhdGEucHJvdG90eXBlLmdldElEYXRhID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IFVpbnQxNkFycmF5KSB7XG4gICAgICAgIGlmICghdGhpcy51aW50MTZJRGF0YSkge1xuICAgICAgICAgICAgdGhpcy51aW50MTZJRGF0YSA9IG5ldyBVaW50MTZBcnJheSh0aGlzLmlEYXRhLmJ1ZmZlciwgdGhpcy5pRGF0YS5ieXRlT2Zmc2V0LCB0aGlzLmlEYXRhLmJ5dGVMZW5ndGggLyAyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy51aW50MTZJRGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaURhdGE7XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==