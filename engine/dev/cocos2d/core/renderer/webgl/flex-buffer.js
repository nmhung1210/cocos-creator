
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/flex-buffer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/****************************************************************************
 LICENSING AGREEMENT
 
 Xiamen Yaji Software Co., Ltd., (the “Licensor”) grants the user (the “Licensee”) non-exclusive and non-transferable rights to use the software according to the following conditions:
 a.  The Licensee shall pay royalties to the Licensor, and the amount of those royalties and the payment method are subject to separate negotiations between the parties.
 b.  The software is licensed for use rather than sold, and the Licensor reserves all rights over the software that are not expressly granted (whether by implication, reservation or prohibition).
 c.  The open source codes contained in the software are subject to the MIT Open Source Licensing Agreement (see the attached for the details);
 d.  The Licensee acknowledges and consents to the possibility that errors may occur during the operation of the software for one or more technical reasons, and the Licensee shall take precautions and prepare remedies for such events. In such circumstance, the Licensor shall provide software patches or updates according to the agreement between the two parties. The Licensor will not assume any liability beyond the explicit wording of this Licensing Agreement.
 e.  Where the Licensor must assume liability for the software according to relevant laws, the Licensor’s entire liability is limited to the annual royalty payable by the Licensee.
 f.  The Licensor owns the portions listed in the root directory and subdirectory (if any) in the software and enjoys the intellectual property rights over those portions. As for the portions owned by the Licensor, the Licensee shall not:
 - i. Bypass or avoid any relevant technical protection measures in the products or services;
 - ii. Release the source codes to any other parties;
 - iii. Disassemble, decompile, decipher, attack, emulate, exploit or reverse-engineer these portion of code;
 - iv. Apply it to any third-party products or services without Licensor’s permission;
 - v. Publish, copy, rent, lease, sell, export, import, distribute or lend any products containing these portions of code;
 - vi. Allow others to use any services relevant to the technology of these codes;
 - vii. Conduct any other act beyond the scope of this Licensing Agreement.
 g.  This Licensing Agreement terminates immediately if the Licensee breaches this Agreement. The Licensor may claim compensation from the Licensee where the Licensee’s breach causes any damage to the Licensor.
 h.  The laws of the People's Republic of China apply to this Licensing Agreement.
 i.  This Agreement is made in both Chinese and English, and the Chinese version shall prevail the event of conflict.
 ****************************************************************************/
var FlexBuffer = /*#__PURE__*/function () {
  function FlexBuffer(handler, index, verticesCount, indicesCount, vfmt) {
    this._handler = handler;
    this._index = index;
    this._vfmt = vfmt;
    this._verticesBytes = vfmt._bytes;
    this._initVerticesCount = verticesCount;
    this._initIndicesCount = indicesCount;
    this.reset();
  }

  var _proto = FlexBuffer.prototype;

  _proto._reallocVData = function _reallocVData(floatsCount, oldData) {
    this.vData = new Float32Array(floatsCount);
    this.uintVData = new Uint32Array(this.vData.buffer);

    if (oldData) {
      this.vData.set(oldData);
    }

    this._handler.updateMesh(this._index, this.vData, this.iData);
  };

  _proto._reallocIData = function _reallocIData(indicesCount, oldData) {
    this.iData = new Uint16Array(indicesCount);

    if (oldData) {
      this.iData.set(oldData);
    }

    this._handler.updateMesh(this._index, this.vData, this.iData);
  };

  _proto.reserve = function reserve(verticesCount, indicesCount) {
    var floatsCount = verticesCount * this._verticesBytes >> 2;
    var newFloatsCount = this.vData.length;
    var realloced = false;

    if (floatsCount > newFloatsCount) {
      while (newFloatsCount < floatsCount) {
        newFloatsCount *= 2;
      }

      this._reallocVData(newFloatsCount, this.vData);

      realloced = true;
    }

    var newIndicesCount = this.iData.length;

    if (indicesCount > newIndicesCount) {
      while (newIndicesCount < indicesCount) {
        newIndicesCount *= 2;
      }

      this._reallocIData(indicesCount, this.iData);

      realloced = true;
    }

    return realloced;
  };

  _proto.used = function used(verticesCount, indicesCount) {
    this.usedVertices = verticesCount;
    this.usedIndices = indicesCount;
    this.usedVerticesFloats = verticesCount * this._verticesBytes >> 2;

    this._handler.updateMeshRange(verticesCount, indicesCount);
  };

  _proto.reset = function reset() {
    var floatsCount = this._initVerticesCount * this._verticesBytes >> 2;

    this._reallocVData(floatsCount);

    this._reallocIData(this._initIndicesCount);

    this.usedVertices = 0;
    this.usedVerticesFloats = 0;
    this.usedIndices = 0;
  };

  return FlexBuffer;
}();

exports["default"] = FlexBuffer;
cc.FlexBuffer = FlexBuffer;
module.exports = exports["default"];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL2ZsZXgtYnVmZmVyLmpzIl0sIm5hbWVzIjpbIkZsZXhCdWZmZXIiLCJoYW5kbGVyIiwiaW5kZXgiLCJ2ZXJ0aWNlc0NvdW50IiwiaW5kaWNlc0NvdW50IiwidmZtdCIsIl9oYW5kbGVyIiwiX2luZGV4IiwiX3ZmbXQiLCJfdmVydGljZXNCeXRlcyIsIl9ieXRlcyIsIl9pbml0VmVydGljZXNDb3VudCIsIl9pbml0SW5kaWNlc0NvdW50IiwicmVzZXQiLCJfcmVhbGxvY1ZEYXRhIiwiZmxvYXRzQ291bnQiLCJvbGREYXRhIiwidkRhdGEiLCJGbG9hdDMyQXJyYXkiLCJ1aW50VkRhdGEiLCJVaW50MzJBcnJheSIsImJ1ZmZlciIsInNldCIsInVwZGF0ZU1lc2giLCJpRGF0YSIsIl9yZWFsbG9jSURhdGEiLCJVaW50MTZBcnJheSIsInJlc2VydmUiLCJuZXdGbG9hdHNDb3VudCIsImxlbmd0aCIsInJlYWxsb2NlZCIsIm5ld0luZGljZXNDb3VudCIsInVzZWQiLCJ1c2VkVmVydGljZXMiLCJ1c2VkSW5kaWNlcyIsInVzZWRWZXJ0aWNlc0Zsb2F0cyIsInVwZGF0ZU1lc2hSYW5nZSIsImNjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXNCcUJBO0FBQ2pCLHNCQUFhQyxPQUFiLEVBQXNCQyxLQUF0QixFQUE2QkMsYUFBN0IsRUFBNENDLFlBQTVDLEVBQTBEQyxJQUExRCxFQUFnRTtBQUM1RCxTQUFLQyxRQUFMLEdBQWdCTCxPQUFoQjtBQUNBLFNBQUtNLE1BQUwsR0FBY0wsS0FBZDtBQUNBLFNBQUtNLEtBQUwsR0FBYUgsSUFBYjtBQUNBLFNBQUtJLGNBQUwsR0FBc0JKLElBQUksQ0FBQ0ssTUFBM0I7QUFFQSxTQUFLQyxrQkFBTCxHQUEwQlIsYUFBMUI7QUFDQSxTQUFLUyxpQkFBTCxHQUF5QlIsWUFBekI7QUFFQSxTQUFLUyxLQUFMO0FBQ0g7Ozs7U0FFREMsZ0JBQUEsdUJBQWVDLFdBQWYsRUFBNEJDLE9BQTVCLEVBQXFDO0FBQ2pDLFNBQUtDLEtBQUwsR0FBYSxJQUFJQyxZQUFKLENBQWlCSCxXQUFqQixDQUFiO0FBQ0EsU0FBS0ksU0FBTCxHQUFpQixJQUFJQyxXQUFKLENBQWdCLEtBQUtILEtBQUwsQ0FBV0ksTUFBM0IsQ0FBakI7O0FBRUEsUUFBSUwsT0FBSixFQUFhO0FBQ1QsV0FBS0MsS0FBTCxDQUFXSyxHQUFYLENBQWVOLE9BQWY7QUFDSDs7QUFFRCxTQUFLVixRQUFMLENBQWNpQixVQUFkLENBQXlCLEtBQUtoQixNQUE5QixFQUFzQyxLQUFLVSxLQUEzQyxFQUFrRCxLQUFLTyxLQUF2RDtBQUNIOztTQUVEQyxnQkFBQSx1QkFBZXJCLFlBQWYsRUFBNkJZLE9BQTdCLEVBQXNDO0FBQ2xDLFNBQUtRLEtBQUwsR0FBYSxJQUFJRSxXQUFKLENBQWdCdEIsWUFBaEIsQ0FBYjs7QUFFQSxRQUFJWSxPQUFKLEVBQWE7QUFDVCxXQUFLUSxLQUFMLENBQVdGLEdBQVgsQ0FBZU4sT0FBZjtBQUNIOztBQUVELFNBQUtWLFFBQUwsQ0FBY2lCLFVBQWQsQ0FBeUIsS0FBS2hCLE1BQTlCLEVBQXNDLEtBQUtVLEtBQTNDLEVBQWtELEtBQUtPLEtBQXZEO0FBQ0g7O1NBRURHLFVBQUEsaUJBQVN4QixhQUFULEVBQXdCQyxZQUF4QixFQUFzQztBQUNsQyxRQUFJVyxXQUFXLEdBQUdaLGFBQWEsR0FBRyxLQUFLTSxjQUFyQixJQUF1QyxDQUF6RDtBQUNBLFFBQUltQixjQUFjLEdBQUcsS0FBS1gsS0FBTCxDQUFXWSxNQUFoQztBQUNBLFFBQUlDLFNBQVMsR0FBRyxLQUFoQjs7QUFFQSxRQUFJZixXQUFXLEdBQUdhLGNBQWxCLEVBQWtDO0FBQzlCLGFBQU9BLGNBQWMsR0FBR2IsV0FBeEIsRUFBcUM7QUFDakNhLFFBQUFBLGNBQWMsSUFBSSxDQUFsQjtBQUNIOztBQUNELFdBQUtkLGFBQUwsQ0FBbUJjLGNBQW5CLEVBQW1DLEtBQUtYLEtBQXhDOztBQUNBYSxNQUFBQSxTQUFTLEdBQUcsSUFBWjtBQUNIOztBQUVELFFBQUlDLGVBQWUsR0FBRyxLQUFLUCxLQUFMLENBQVdLLE1BQWpDOztBQUNBLFFBQUl6QixZQUFZLEdBQUcyQixlQUFuQixFQUFvQztBQUNoQyxhQUFPQSxlQUFlLEdBQUczQixZQUF6QixFQUF1QztBQUNuQzJCLFFBQUFBLGVBQWUsSUFBSSxDQUFuQjtBQUNIOztBQUNELFdBQUtOLGFBQUwsQ0FBbUJyQixZQUFuQixFQUFpQyxLQUFLb0IsS0FBdEM7O0FBQ0FNLE1BQUFBLFNBQVMsR0FBRyxJQUFaO0FBQ0g7O0FBRUQsV0FBT0EsU0FBUDtBQUNIOztTQUVERSxPQUFBLGNBQU03QixhQUFOLEVBQXFCQyxZQUFyQixFQUFtQztBQUMvQixTQUFLNkIsWUFBTCxHQUFvQjlCLGFBQXBCO0FBQ0EsU0FBSytCLFdBQUwsR0FBbUI5QixZQUFuQjtBQUNBLFNBQUsrQixrQkFBTCxHQUEwQmhDLGFBQWEsR0FBRyxLQUFLTSxjQUFyQixJQUF1QyxDQUFqRTs7QUFFQSxTQUFLSCxRQUFMLENBQWM4QixlQUFkLENBQThCakMsYUFBOUIsRUFBNkNDLFlBQTdDO0FBQ0g7O1NBRURTLFFBQUEsaUJBQVM7QUFDTCxRQUFJRSxXQUFXLEdBQUcsS0FBS0osa0JBQUwsR0FBMEIsS0FBS0YsY0FBL0IsSUFBaUQsQ0FBbkU7O0FBQ0EsU0FBS0ssYUFBTCxDQUFtQkMsV0FBbkI7O0FBQ0EsU0FBS1UsYUFBTCxDQUFtQixLQUFLYixpQkFBeEI7O0FBRUEsU0FBS3FCLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxTQUFLRSxrQkFBTCxHQUEwQixDQUExQjtBQUNBLFNBQUtELFdBQUwsR0FBbUIsQ0FBbkI7QUFDSDs7Ozs7O0FBR0xHLEVBQUUsQ0FBQ3JDLFVBQUgsR0FBZ0JBLFVBQWhCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBMSUNFTlNJTkcgQUdSRUVNRU5UXG4gXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuLCAodGhlIOKAnExpY2Vuc29y4oCdKSBncmFudHMgdGhlIHVzZXIgKHRoZSDigJxMaWNlbnNlZeKAnSkgbm9uLWV4Y2x1c2l2ZSBhbmQgbm9uLXRyYW5zZmVyYWJsZSByaWdodHMgdG8gdXNlIHRoZSBzb2Z0d2FyZSBhY2NvcmRpbmcgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuIGEuICBUaGUgTGljZW5zZWUgc2hhbGwgcGF5IHJveWFsdGllcyB0byB0aGUgTGljZW5zb3IsIGFuZCB0aGUgYW1vdW50IG9mIHRob3NlIHJveWFsdGllcyBhbmQgdGhlIHBheW1lbnQgbWV0aG9kIGFyZSBzdWJqZWN0IHRvIHNlcGFyYXRlIG5lZ290aWF0aW9ucyBiZXR3ZWVuIHRoZSBwYXJ0aWVzLlxuIGIuICBUaGUgc29mdHdhcmUgaXMgbGljZW5zZWQgZm9yIHVzZSByYXRoZXIgdGhhbiBzb2xkLCBhbmQgdGhlIExpY2Vuc29yIHJlc2VydmVzIGFsbCByaWdodHMgb3ZlciB0aGUgc29mdHdhcmUgdGhhdCBhcmUgbm90IGV4cHJlc3NseSBncmFudGVkICh3aGV0aGVyIGJ5IGltcGxpY2F0aW9uLCByZXNlcnZhdGlvbiBvciBwcm9oaWJpdGlvbikuXG4gYy4gIFRoZSBvcGVuIHNvdXJjZSBjb2RlcyBjb250YWluZWQgaW4gdGhlIHNvZnR3YXJlIGFyZSBzdWJqZWN0IHRvIHRoZSBNSVQgT3BlbiBTb3VyY2UgTGljZW5zaW5nIEFncmVlbWVudCAoc2VlIHRoZSBhdHRhY2hlZCBmb3IgdGhlIGRldGFpbHMpO1xuIGQuICBUaGUgTGljZW5zZWUgYWNrbm93bGVkZ2VzIGFuZCBjb25zZW50cyB0byB0aGUgcG9zc2liaWxpdHkgdGhhdCBlcnJvcnMgbWF5IG9jY3VyIGR1cmluZyB0aGUgb3BlcmF0aW9uIG9mIHRoZSBzb2Z0d2FyZSBmb3Igb25lIG9yIG1vcmUgdGVjaG5pY2FsIHJlYXNvbnMsIGFuZCB0aGUgTGljZW5zZWUgc2hhbGwgdGFrZSBwcmVjYXV0aW9ucyBhbmQgcHJlcGFyZSByZW1lZGllcyBmb3Igc3VjaCBldmVudHMuIEluIHN1Y2ggY2lyY3Vtc3RhbmNlLCB0aGUgTGljZW5zb3Igc2hhbGwgcHJvdmlkZSBzb2Z0d2FyZSBwYXRjaGVzIG9yIHVwZGF0ZXMgYWNjb3JkaW5nIHRvIHRoZSBhZ3JlZW1lbnQgYmV0d2VlbiB0aGUgdHdvIHBhcnRpZXMuIFRoZSBMaWNlbnNvciB3aWxsIG5vdCBhc3N1bWUgYW55IGxpYWJpbGl0eSBiZXlvbmQgdGhlIGV4cGxpY2l0IHdvcmRpbmcgb2YgdGhpcyBMaWNlbnNpbmcgQWdyZWVtZW50LlxuIGUuICBXaGVyZSB0aGUgTGljZW5zb3IgbXVzdCBhc3N1bWUgbGlhYmlsaXR5IGZvciB0aGUgc29mdHdhcmUgYWNjb3JkaW5nIHRvIHJlbGV2YW50IGxhd3MsIHRoZSBMaWNlbnNvcuKAmXMgZW50aXJlIGxpYWJpbGl0eSBpcyBsaW1pdGVkIHRvIHRoZSBhbm51YWwgcm95YWx0eSBwYXlhYmxlIGJ5IHRoZSBMaWNlbnNlZS5cbiBmLiAgVGhlIExpY2Vuc29yIG93bnMgdGhlIHBvcnRpb25zIGxpc3RlZCBpbiB0aGUgcm9vdCBkaXJlY3RvcnkgYW5kIHN1YmRpcmVjdG9yeSAoaWYgYW55KSBpbiB0aGUgc29mdHdhcmUgYW5kIGVuam95cyB0aGUgaW50ZWxsZWN0dWFsIHByb3BlcnR5IHJpZ2h0cyBvdmVyIHRob3NlIHBvcnRpb25zLiBBcyBmb3IgdGhlIHBvcnRpb25zIG93bmVkIGJ5IHRoZSBMaWNlbnNvciwgdGhlIExpY2Vuc2VlIHNoYWxsIG5vdDpcbiAtIGkuIEJ5cGFzcyBvciBhdm9pZCBhbnkgcmVsZXZhbnQgdGVjaG5pY2FsIHByb3RlY3Rpb24gbWVhc3VyZXMgaW4gdGhlIHByb2R1Y3RzIG9yIHNlcnZpY2VzO1xuIC0gaWkuIFJlbGVhc2UgdGhlIHNvdXJjZSBjb2RlcyB0byBhbnkgb3RoZXIgcGFydGllcztcbiAtIGlpaS4gRGlzYXNzZW1ibGUsIGRlY29tcGlsZSwgZGVjaXBoZXIsIGF0dGFjaywgZW11bGF0ZSwgZXhwbG9pdCBvciByZXZlcnNlLWVuZ2luZWVyIHRoZXNlIHBvcnRpb24gb2YgY29kZTtcbiAtIGl2LiBBcHBseSBpdCB0byBhbnkgdGhpcmQtcGFydHkgcHJvZHVjdHMgb3Igc2VydmljZXMgd2l0aG91dCBMaWNlbnNvcuKAmXMgcGVybWlzc2lvbjtcbiAtIHYuIFB1Ymxpc2gsIGNvcHksIHJlbnQsIGxlYXNlLCBzZWxsLCBleHBvcnQsIGltcG9ydCwgZGlzdHJpYnV0ZSBvciBsZW5kIGFueSBwcm9kdWN0cyBjb250YWluaW5nIHRoZXNlIHBvcnRpb25zIG9mIGNvZGU7XG4gLSB2aS4gQWxsb3cgb3RoZXJzIHRvIHVzZSBhbnkgc2VydmljZXMgcmVsZXZhbnQgdG8gdGhlIHRlY2hub2xvZ3kgb2YgdGhlc2UgY29kZXM7XG4gLSB2aWkuIENvbmR1Y3QgYW55IG90aGVyIGFjdCBiZXlvbmQgdGhlIHNjb3BlIG9mIHRoaXMgTGljZW5zaW5nIEFncmVlbWVudC5cbiBnLiAgVGhpcyBMaWNlbnNpbmcgQWdyZWVtZW50IHRlcm1pbmF0ZXMgaW1tZWRpYXRlbHkgaWYgdGhlIExpY2Vuc2VlIGJyZWFjaGVzIHRoaXMgQWdyZWVtZW50LiBUaGUgTGljZW5zb3IgbWF5IGNsYWltIGNvbXBlbnNhdGlvbiBmcm9tIHRoZSBMaWNlbnNlZSB3aGVyZSB0aGUgTGljZW5zZWXigJlzIGJyZWFjaCBjYXVzZXMgYW55IGRhbWFnZSB0byB0aGUgTGljZW5zb3IuXG4gaC4gIFRoZSBsYXdzIG9mIHRoZSBQZW9wbGUncyBSZXB1YmxpYyBvZiBDaGluYSBhcHBseSB0byB0aGlzIExpY2Vuc2luZyBBZ3JlZW1lbnQuXG4gaS4gIFRoaXMgQWdyZWVtZW50IGlzIG1hZGUgaW4gYm90aCBDaGluZXNlIGFuZCBFbmdsaXNoLCBhbmQgdGhlIENoaW5lc2UgdmVyc2lvbiBzaGFsbCBwcmV2YWlsIHRoZSBldmVudCBvZiBjb25mbGljdC5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbGV4QnVmZmVyIHtcbiAgICBjb25zdHJ1Y3RvciAoaGFuZGxlciwgaW5kZXgsIHZlcnRpY2VzQ291bnQsIGluZGljZXNDb3VudCwgdmZtdCkge1xuICAgICAgICB0aGlzLl9oYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgICAgdGhpcy5faW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5fdmZtdCA9IHZmbXQ7XG4gICAgICAgIHRoaXMuX3ZlcnRpY2VzQnl0ZXMgPSB2Zm10Ll9ieXRlcztcblxuICAgICAgICB0aGlzLl9pbml0VmVydGljZXNDb3VudCA9IHZlcnRpY2VzQ291bnQ7XG4gICAgICAgIHRoaXMuX2luaXRJbmRpY2VzQ291bnQgPSBpbmRpY2VzQ291bnQ7XG5cbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cblxuICAgIF9yZWFsbG9jVkRhdGEgKGZsb2F0c0NvdW50LCBvbGREYXRhKSB7XG4gICAgICAgIHRoaXMudkRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KGZsb2F0c0NvdW50KTtcbiAgICAgICAgdGhpcy51aW50VkRhdGEgPSBuZXcgVWludDMyQXJyYXkodGhpcy52RGF0YS5idWZmZXIpO1xuXG4gICAgICAgIGlmIChvbGREYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnZEYXRhLnNldChvbGREYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2hhbmRsZXIudXBkYXRlTWVzaCh0aGlzLl9pbmRleCwgdGhpcy52RGF0YSwgdGhpcy5pRGF0YSk7XG4gICAgfVxuXG4gICAgX3JlYWxsb2NJRGF0YSAoaW5kaWNlc0NvdW50LCBvbGREYXRhKSB7XG4gICAgICAgIHRoaXMuaURhdGEgPSBuZXcgVWludDE2QXJyYXkoaW5kaWNlc0NvdW50KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChvbGREYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmlEYXRhLnNldChvbGREYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2hhbmRsZXIudXBkYXRlTWVzaCh0aGlzLl9pbmRleCwgdGhpcy52RGF0YSwgdGhpcy5pRGF0YSk7XG4gICAgfVxuXG4gICAgcmVzZXJ2ZSAodmVydGljZXNDb3VudCwgaW5kaWNlc0NvdW50KSB7XG4gICAgICAgIGxldCBmbG9hdHNDb3VudCA9IHZlcnRpY2VzQ291bnQgKiB0aGlzLl92ZXJ0aWNlc0J5dGVzID4+IDI7XG4gICAgICAgIGxldCBuZXdGbG9hdHNDb3VudCA9IHRoaXMudkRhdGEubGVuZ3RoO1xuICAgICAgICBsZXQgcmVhbGxvY2VkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGZsb2F0c0NvdW50ID4gbmV3RmxvYXRzQ291bnQpIHtcbiAgICAgICAgICAgIHdoaWxlIChuZXdGbG9hdHNDb3VudCA8IGZsb2F0c0NvdW50KSB7XG4gICAgICAgICAgICAgICAgbmV3RmxvYXRzQ291bnQgKj0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3JlYWxsb2NWRGF0YShuZXdGbG9hdHNDb3VudCwgdGhpcy52RGF0YSk7XG4gICAgICAgICAgICByZWFsbG9jZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld0luZGljZXNDb3VudCA9IHRoaXMuaURhdGEubGVuZ3RoO1xuICAgICAgICBpZiAoaW5kaWNlc0NvdW50ID4gbmV3SW5kaWNlc0NvdW50KSB7XG4gICAgICAgICAgICB3aGlsZSAobmV3SW5kaWNlc0NvdW50IDwgaW5kaWNlc0NvdW50KSB7XG4gICAgICAgICAgICAgICAgbmV3SW5kaWNlc0NvdW50ICo9IDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9yZWFsbG9jSURhdGEoaW5kaWNlc0NvdW50LCB0aGlzLmlEYXRhKTtcbiAgICAgICAgICAgIHJlYWxsb2NlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVhbGxvY2VkO1xuICAgIH1cblxuICAgIHVzZWQgKHZlcnRpY2VzQ291bnQsIGluZGljZXNDb3VudCkge1xuICAgICAgICB0aGlzLnVzZWRWZXJ0aWNlcyA9IHZlcnRpY2VzQ291bnQ7XG4gICAgICAgIHRoaXMudXNlZEluZGljZXMgPSBpbmRpY2VzQ291bnQ7XG4gICAgICAgIHRoaXMudXNlZFZlcnRpY2VzRmxvYXRzID0gdmVydGljZXNDb3VudCAqIHRoaXMuX3ZlcnRpY2VzQnl0ZXMgPj4gMjtcblxuICAgICAgICB0aGlzLl9oYW5kbGVyLnVwZGF0ZU1lc2hSYW5nZSh2ZXJ0aWNlc0NvdW50LCBpbmRpY2VzQ291bnQpO1xuICAgIH1cblxuICAgIHJlc2V0ICgpIHtcbiAgICAgICAgbGV0IGZsb2F0c0NvdW50ID0gdGhpcy5faW5pdFZlcnRpY2VzQ291bnQgKiB0aGlzLl92ZXJ0aWNlc0J5dGVzID4+IDI7XG4gICAgICAgIHRoaXMuX3JlYWxsb2NWRGF0YShmbG9hdHNDb3VudCk7XG4gICAgICAgIHRoaXMuX3JlYWxsb2NJRGF0YSh0aGlzLl9pbml0SW5kaWNlc0NvdW50KTtcblxuICAgICAgICB0aGlzLnVzZWRWZXJ0aWNlcyA9IDA7XG4gICAgICAgIHRoaXMudXNlZFZlcnRpY2VzRmxvYXRzID0gMDtcbiAgICAgICAgdGhpcy51c2VkSW5kaWNlcyA9IDA7XG4gICAgfVxufSBcblxuY2MuRmxleEJ1ZmZlciA9IEZsZXhCdWZmZXJcbiJdLCJzb3VyY2VSb290IjoiLyJ9