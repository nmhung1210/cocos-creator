
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/assembler-2d.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _assembler = _interopRequireDefault(require("./assembler"));

var _manager = _interopRequireDefault(require("./utils/dynamic-atlas/manager"));

var _renderData = _interopRequireDefault(require("./webgl/render-data"));

var _valueTypes = require("../value-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Assembler2D = /*#__PURE__*/function (_Assembler) {
  _inheritsLoose(Assembler2D, _Assembler);

  function Assembler2D() {
    var _this;

    _this = _Assembler.call(this) || this;
    _this._renderData = new _renderData["default"]();

    _this._renderData.init(_assertThisInitialized(_this));

    _this.initData();

    _this.initLocal();

    return _this;
  }

  var _proto = Assembler2D.prototype;

  _proto.initData = function initData() {
    var data = this._renderData;
    data.createQuadData(0, this.verticesFloats, this.indicesCount);
  };

  _proto.initLocal = function initLocal() {
    this._local = [];
    this._local.length = 4;
  };

  _proto.updateColor = function updateColor(comp, color) {
    var uintVerts = this._renderData.uintVDatas[0];
    if (!uintVerts) return;
    color = color != null ? color : comp.node.color._val;
    var floatsPerVert = this.floatsPerVert;
    var colorOffset = this.colorOffset;

    for (var i = colorOffset, l = uintVerts.length; i < l; i += floatsPerVert) {
      uintVerts[i] = color;
    }
  };

  _proto.getBuffer = function getBuffer() {
    return cc.renderer._handle._meshBuffer;
  };

  _proto.updateWorldVerts = function updateWorldVerts(comp) {
    var local = this._local;
    var verts = this._renderData.vDatas[0];
    var matrix = comp.node._worldMatrix;
    var matrixm = matrix.m,
        a = matrixm[0],
        b = matrixm[1],
        c = matrixm[4],
        d = matrixm[5],
        tx = matrixm[12],
        ty = matrixm[13];
    var vl = local[0],
        vr = local[2],
        vb = local[1],
        vt = local[3];
    var floatsPerVert = this.floatsPerVert;
    var vertexOffset = 0;
    var justTranslate = a === 1 && b === 0 && c === 0 && d === 1;

    if (justTranslate) {
      // left bottom
      verts[vertexOffset] = vl + tx;
      verts[vertexOffset + 1] = vb + ty;
      vertexOffset += floatsPerVert; // right bottom

      verts[vertexOffset] = vr + tx;
      verts[vertexOffset + 1] = vb + ty;
      vertexOffset += floatsPerVert; // left top

      verts[vertexOffset] = vl + tx;
      verts[vertexOffset + 1] = vt + ty;
      vertexOffset += floatsPerVert; // right top

      verts[vertexOffset] = vr + tx;
      verts[vertexOffset + 1] = vt + ty;
    } else {
      var al = a * vl,
          ar = a * vr,
          bl = b * vl,
          br = b * vr,
          cb = c * vb,
          ct = c * vt,
          db = d * vb,
          dt = d * vt; // left bottom

      verts[vertexOffset] = al + cb + tx;
      verts[vertexOffset + 1] = bl + db + ty;
      vertexOffset += floatsPerVert; // right bottom

      verts[vertexOffset] = ar + cb + tx;
      verts[vertexOffset + 1] = br + db + ty;
      vertexOffset += floatsPerVert; // left top

      verts[vertexOffset] = al + ct + tx;
      verts[vertexOffset + 1] = bl + dt + ty;
      vertexOffset += floatsPerVert; // right top

      verts[vertexOffset] = ar + ct + tx;
      verts[vertexOffset + 1] = br + dt + ty;
    }
  };

  _proto.fillBuffers = function fillBuffers(comp, renderer) {
    if (renderer.worldMatDirty) {
      this.updateWorldVerts(comp);
    }

    var renderData = this._renderData;
    var vData = renderData.vDatas[0];
    var iData = renderData.iDatas[0];
    var buffer = this.getBuffer(renderer);
    var offsetInfo = buffer.request(this.verticesCount, this.indicesCount); // buffer data may be realloc, need get reference after request.
    // fill vertices

    var vertexOffset = offsetInfo.byteOffset >> 2,
        vbuf = buffer._vData;

    if (vData.length + vertexOffset > vbuf.length) {
      vbuf.set(vData.subarray(0, vbuf.length - vertexOffset), vertexOffset);
    } else {
      vbuf.set(vData, vertexOffset);
    } // fill indices


    var ibuf = buffer._iData,
        indiceOffset = offsetInfo.indiceOffset,
        vertexId = offsetInfo.vertexOffset;

    for (var i = 0, l = iData.length; i < l; i++) {
      ibuf[indiceOffset++] = vertexId + iData[i];
    }
  };

  _proto.packToDynamicAtlas = function packToDynamicAtlas(comp, frame) {
    if (CC_TEST) return;

    if (!frame._original && _manager["default"] && frame._texture.packable) {
      var packedFrame = _manager["default"].insertSpriteFrame(frame);

      if (packedFrame) {
        frame._setDynamicAtlasFrame(packedFrame);
      }
    }

    var material = comp._materials[0];
    if (!material) return;

    if (material.getProperty('texture') !== frame._texture) {
      // texture was packed to dynamic atlas, should update uvs
      comp._vertsDirty = true;

      comp._updateMaterial();
    }
  };

  _createClass(Assembler2D, [{
    key: "verticesFloats",
    get: function get() {
      return this.verticesCount * this.floatsPerVert;
    }
  }]);

  return Assembler2D;
}(_assembler["default"]);

exports["default"] = Assembler2D;
cc.js.addon(Assembler2D.prototype, {
  floatsPerVert: 5,
  verticesCount: 4,
  indicesCount: 6,
  uvOffset: 2,
  colorOffset: 4
});
cc.Assembler2D = Assembler2D;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2Fzc2VtYmxlci0yZC5qcyJdLCJuYW1lcyI6WyJBc3NlbWJsZXIyRCIsIl9yZW5kZXJEYXRhIiwiUmVuZGVyRGF0YSIsImluaXQiLCJpbml0RGF0YSIsImluaXRMb2NhbCIsImRhdGEiLCJjcmVhdGVRdWFkRGF0YSIsInZlcnRpY2VzRmxvYXRzIiwiaW5kaWNlc0NvdW50IiwiX2xvY2FsIiwibGVuZ3RoIiwidXBkYXRlQ29sb3IiLCJjb21wIiwiY29sb3IiLCJ1aW50VmVydHMiLCJ1aW50VkRhdGFzIiwibm9kZSIsIl92YWwiLCJmbG9hdHNQZXJWZXJ0IiwiY29sb3JPZmZzZXQiLCJpIiwibCIsImdldEJ1ZmZlciIsImNjIiwicmVuZGVyZXIiLCJfaGFuZGxlIiwiX21lc2hCdWZmZXIiLCJ1cGRhdGVXb3JsZFZlcnRzIiwibG9jYWwiLCJ2ZXJ0cyIsInZEYXRhcyIsIm1hdHJpeCIsIl93b3JsZE1hdHJpeCIsIm1hdHJpeG0iLCJtIiwiYSIsImIiLCJjIiwiZCIsInR4IiwidHkiLCJ2bCIsInZyIiwidmIiLCJ2dCIsInZlcnRleE9mZnNldCIsImp1c3RUcmFuc2xhdGUiLCJhbCIsImFyIiwiYmwiLCJiciIsImNiIiwiY3QiLCJkYiIsImR0IiwiZmlsbEJ1ZmZlcnMiLCJ3b3JsZE1hdERpcnR5IiwicmVuZGVyRGF0YSIsInZEYXRhIiwiaURhdGEiLCJpRGF0YXMiLCJidWZmZXIiLCJvZmZzZXRJbmZvIiwicmVxdWVzdCIsInZlcnRpY2VzQ291bnQiLCJieXRlT2Zmc2V0IiwidmJ1ZiIsIl92RGF0YSIsInNldCIsInN1YmFycmF5IiwiaWJ1ZiIsIl9pRGF0YSIsImluZGljZU9mZnNldCIsInZlcnRleElkIiwicGFja1RvRHluYW1pY0F0bGFzIiwiZnJhbWUiLCJDQ19URVNUIiwiX29yaWdpbmFsIiwiZHluYW1pY0F0bGFzTWFuYWdlciIsIl90ZXh0dXJlIiwicGFja2FibGUiLCJwYWNrZWRGcmFtZSIsImluc2VydFNwcml0ZUZyYW1lIiwiX3NldER5bmFtaWNBdGxhc0ZyYW1lIiwibWF0ZXJpYWwiLCJfbWF0ZXJpYWxzIiwiZ2V0UHJvcGVydHkiLCJfdmVydHNEaXJ0eSIsIl91cGRhdGVNYXRlcmlhbCIsIkFzc2VtYmxlciIsImpzIiwiYWRkb24iLCJwcm90b3R5cGUiLCJ1dk9mZnNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBOzs7QUFDakIseUJBQWU7QUFBQTs7QUFDWDtBQUVBLFVBQUtDLFdBQUwsR0FBbUIsSUFBSUMsc0JBQUosRUFBbkI7O0FBQ0EsVUFBS0QsV0FBTCxDQUFpQkUsSUFBakI7O0FBRUEsVUFBS0MsUUFBTDs7QUFDQSxVQUFLQyxTQUFMOztBQVBXO0FBUWQ7Ozs7U0FNREQsV0FBQSxvQkFBWTtBQUNSLFFBQUlFLElBQUksR0FBRyxLQUFLTCxXQUFoQjtBQUNBSyxJQUFBQSxJQUFJLENBQUNDLGNBQUwsQ0FBb0IsQ0FBcEIsRUFBdUIsS0FBS0MsY0FBNUIsRUFBNEMsS0FBS0MsWUFBakQ7QUFDSDs7U0FDREosWUFBQSxxQkFBYTtBQUNULFNBQUtLLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0EsTUFBTCxDQUFZQyxNQUFaLEdBQXFCLENBQXJCO0FBQ0g7O1NBRURDLGNBQUEscUJBQWFDLElBQWIsRUFBbUJDLEtBQW5CLEVBQTBCO0FBQ3RCLFFBQUlDLFNBQVMsR0FBRyxLQUFLZCxXQUFMLENBQWlCZSxVQUFqQixDQUE0QixDQUE1QixDQUFoQjtBQUNBLFFBQUksQ0FBQ0QsU0FBTCxFQUFnQjtBQUNoQkQsSUFBQUEsS0FBSyxHQUFHQSxLQUFLLElBQUksSUFBVCxHQUFnQkEsS0FBaEIsR0FBd0JELElBQUksQ0FBQ0ksSUFBTCxDQUFVSCxLQUFWLENBQWdCSSxJQUFoRDtBQUNBLFFBQUlDLGFBQWEsR0FBRyxLQUFLQSxhQUF6QjtBQUNBLFFBQUlDLFdBQVcsR0FBRyxLQUFLQSxXQUF2Qjs7QUFDQSxT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Ozs7O0VBYm9DdUU7OztBQW9KekNsRSxFQUFFLENBQUNtRSxFQUFILENBQU1DLEtBQU4sQ0FBWTVGLFdBQVcsQ0FBQzZGLFNBQXhCLEVBQW1DO0FBQy9CMUUsRUFBQUEsYUFBYSxFQUFFLENBRGdCO0FBRy9COEMsRUFBQUEsYUFBYSxFQUFFLENBSGdCO0FBSS9CeEQsRUFBQUEsWUFBWSxFQUFFLENBSmlCO0FBTS9CcUYsRUFBQUEsUUFBUSxFQUFFLENBTnFCO0FBTy9CMUUsRUFBQUEsV0FBVyxFQUFFO0FBUGtCLENBQW5DO0FBVUFJLEVBQUUsQ0FBQ3hCLFdBQUgsR0FBaUJBLFdBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFzc2VtYmxlciBmcm9tICcuL2Fzc2VtYmxlcic7XG5pbXBvcnQgZHluYW1pY0F0bGFzTWFuYWdlciBmcm9tICcuL3V0aWxzL2R5bmFtaWMtYXRsYXMvbWFuYWdlcic7XG5pbXBvcnQgUmVuZGVyRGF0YSBmcm9tICcuL3dlYmdsL3JlbmRlci1kYXRhJztcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAnLi4vdmFsdWUtdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBc3NlbWJsZXIyRCBleHRlbmRzIEFzc2VtYmxlciB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX3JlbmRlckRhdGEgPSBuZXcgUmVuZGVyRGF0YSgpO1xuICAgICAgICB0aGlzLl9yZW5kZXJEYXRhLmluaXQodGhpcyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdExvY2FsKCk7XG4gICAgfVxuXG4gICAgZ2V0IHZlcnRpY2VzRmxvYXRzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVydGljZXNDb3VudCAqIHRoaXMuZmxvYXRzUGVyVmVydDtcbiAgICB9XG5cbiAgICBpbml0RGF0YSAoKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5fcmVuZGVyRGF0YTtcbiAgICAgICAgZGF0YS5jcmVhdGVRdWFkRGF0YSgwLCB0aGlzLnZlcnRpY2VzRmxvYXRzLCB0aGlzLmluZGljZXNDb3VudCk7XG4gICAgfVxuICAgIGluaXRMb2NhbCAoKSB7XG4gICAgICAgIHRoaXMuX2xvY2FsID0gW107XG4gICAgICAgIHRoaXMuX2xvY2FsLmxlbmd0aCA9IDQ7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29sb3IgKGNvbXAsIGNvbG9yKSB7XG4gICAgICAgIGxldCB1aW50VmVydHMgPSB0aGlzLl9yZW5kZXJEYXRhLnVpbnRWRGF0YXNbMF07XG4gICAgICAgIGlmICghdWludFZlcnRzKSByZXR1cm47XG4gICAgICAgIGNvbG9yID0gY29sb3IgIT0gbnVsbCA/IGNvbG9yIDogY29tcC5ub2RlLmNvbG9yLl92YWw7XG4gICAgICAgIGxldCBmbG9hdHNQZXJWZXJ0ID0gdGhpcy5mbG9hdHNQZXJWZXJ0O1xuICAgICAgICBsZXQgY29sb3JPZmZzZXQgPSB0aGlzLmNvbG9yT2Zmc2V0O1xuICAgICAgICBmb3IgKGxldCBpID0gY29sb3JPZmZzZXQsIGwgPSB1aW50VmVydHMubGVuZ3RoOyBpIDwgbDsgaSArPSBmbG9hdHNQZXJWZXJ0KSB7XG4gICAgICAgICAgICB1aW50VmVydHNbaV0gPSBjb2xvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEJ1ZmZlciAoKSB7XG4gICAgICAgIHJldHVybiBjYy5yZW5kZXJlci5faGFuZGxlLl9tZXNoQnVmZmVyO1xuICAgIH1cblxuICAgIHVwZGF0ZVdvcmxkVmVydHMgKGNvbXApIHtcbiAgICAgICAgbGV0IGxvY2FsID0gdGhpcy5fbG9jYWw7XG4gICAgICAgIGxldCB2ZXJ0cyA9IHRoaXMuX3JlbmRlckRhdGEudkRhdGFzWzBdO1xuXG4gICAgICAgIGxldCBtYXRyaXggPSBjb21wLm5vZGUuX3dvcmxkTWF0cml4O1xuICAgICAgICBsZXQgbWF0cml4bSA9IG1hdHJpeC5tLFxuICAgICAgICAgICAgYSA9IG1hdHJpeG1bMF0sIGIgPSBtYXRyaXhtWzFdLCBjID0gbWF0cml4bVs0XSwgZCA9IG1hdHJpeG1bNV0sXG4gICAgICAgICAgICB0eCA9IG1hdHJpeG1bMTJdLCB0eSA9IG1hdHJpeG1bMTNdO1xuXG4gICAgICAgIGxldCB2bCA9IGxvY2FsWzBdLCB2ciA9IGxvY2FsWzJdLFxuICAgICAgICAgICAgdmIgPSBsb2NhbFsxXSwgdnQgPSBsb2NhbFszXTtcbiAgICAgICAgXG4gICAgICAgIGxldCBmbG9hdHNQZXJWZXJ0ID0gdGhpcy5mbG9hdHNQZXJWZXJ0O1xuICAgICAgICBsZXQgdmVydGV4T2Zmc2V0ID0gMDtcbiAgICAgICAgbGV0IGp1c3RUcmFuc2xhdGUgPSBhID09PSAxICYmIGIgPT09IDAgJiYgYyA9PT0gMCAmJiBkID09PSAxO1xuXG4gICAgICAgIGlmIChqdXN0VHJhbnNsYXRlKSB7XG4gICAgICAgICAgICAvLyBsZWZ0IGJvdHRvbVxuICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0XSA9IHZsICsgdHg7XG4gICAgICAgICAgICB2ZXJ0c1t2ZXJ0ZXhPZmZzZXQgKyAxXSA9IHZiICsgdHk7XG4gICAgICAgICAgICB2ZXJ0ZXhPZmZzZXQgKz0gZmxvYXRzUGVyVmVydDtcbiAgICAgICAgICAgIC8vIHJpZ2h0IGJvdHRvbVxuICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0XSA9IHZyICsgdHg7XG4gICAgICAgICAgICB2ZXJ0c1t2ZXJ0ZXhPZmZzZXQgKyAxXSA9IHZiICsgdHk7XG4gICAgICAgICAgICB2ZXJ0ZXhPZmZzZXQgKz0gZmxvYXRzUGVyVmVydDtcbiAgICAgICAgICAgIC8vIGxlZnQgdG9wXG4gICAgICAgICAgICB2ZXJ0c1t2ZXJ0ZXhPZmZzZXRdID0gdmwgKyB0eDtcbiAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldCArIDFdID0gdnQgKyB0eTtcbiAgICAgICAgICAgIHZlcnRleE9mZnNldCArPSBmbG9hdHNQZXJWZXJ0O1xuICAgICAgICAgICAgLy8gcmlnaHQgdG9wXG4gICAgICAgICAgICB2ZXJ0c1t2ZXJ0ZXhPZmZzZXRdID0gdnIgKyB0eDtcbiAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldCArIDFdID0gdnQgKyB0eTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBhbCA9IGEgKiB2bCwgYXIgPSBhICogdnIsXG4gICAgICAgICAgICBibCA9IGIgKiB2bCwgYnIgPSBiICogdnIsXG4gICAgICAgICAgICBjYiA9IGMgKiB2YiwgY3QgPSBjICogdnQsXG4gICAgICAgICAgICBkYiA9IGQgKiB2YiwgZHQgPSBkICogdnQ7XG5cbiAgICAgICAgICAgIC8vIGxlZnQgYm90dG9tXG4gICAgICAgICAgICB2ZXJ0c1t2ZXJ0ZXhPZmZzZXRdID0gYWwgKyBjYiArIHR4O1xuICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0ICsgMV0gPSBibCArIGRiICsgdHk7XG4gICAgICAgICAgICB2ZXJ0ZXhPZmZzZXQgKz0gZmxvYXRzUGVyVmVydDtcbiAgICAgICAgICAgIC8vIHJpZ2h0IGJvdHRvbVxuICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0XSA9IGFyICsgY2IgKyB0eDtcbiAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldCArIDFdID0gYnIgKyBkYiArIHR5O1xuICAgICAgICAgICAgdmVydGV4T2Zmc2V0ICs9IGZsb2F0c1BlclZlcnQ7XG4gICAgICAgICAgICAvLyBsZWZ0IHRvcFxuICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0XSA9IGFsICsgY3QgKyB0eDtcbiAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldCArIDFdID0gYmwgKyBkdCArIHR5O1xuICAgICAgICAgICAgdmVydGV4T2Zmc2V0ICs9IGZsb2F0c1BlclZlcnQ7XG4gICAgICAgICAgICAvLyByaWdodCB0b3BcbiAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldF0gPSBhciArIGN0ICsgdHg7XG4gICAgICAgICAgICB2ZXJ0c1t2ZXJ0ZXhPZmZzZXQgKyAxXSA9IGJyICsgZHQgKyB0eTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbGxCdWZmZXJzIChjb21wLCByZW5kZXJlcikge1xuICAgICAgICBpZiAocmVuZGVyZXIud29ybGRNYXREaXJ0eSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVXb3JsZFZlcnRzKGNvbXApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlbmRlckRhdGEgPSB0aGlzLl9yZW5kZXJEYXRhO1xuICAgICAgICBsZXQgdkRhdGEgPSByZW5kZXJEYXRhLnZEYXRhc1swXTtcbiAgICAgICAgbGV0IGlEYXRhID0gcmVuZGVyRGF0YS5pRGF0YXNbMF07XG5cbiAgICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuZ2V0QnVmZmVyKHJlbmRlcmVyKTtcbiAgICAgICAgbGV0IG9mZnNldEluZm8gPSBidWZmZXIucmVxdWVzdCh0aGlzLnZlcnRpY2VzQ291bnQsIHRoaXMuaW5kaWNlc0NvdW50KTtcblxuICAgICAgICAvLyBidWZmZXIgZGF0YSBtYXkgYmUgcmVhbGxvYywgbmVlZCBnZXQgcmVmZXJlbmNlIGFmdGVyIHJlcXVlc3QuXG5cbiAgICAgICAgLy8gZmlsbCB2ZXJ0aWNlc1xuICAgICAgICBsZXQgdmVydGV4T2Zmc2V0ID0gb2Zmc2V0SW5mby5ieXRlT2Zmc2V0ID4+IDIsXG4gICAgICAgICAgICB2YnVmID0gYnVmZmVyLl92RGF0YTtcblxuICAgICAgICBpZiAodkRhdGEubGVuZ3RoICsgdmVydGV4T2Zmc2V0ID4gdmJ1Zi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZidWYuc2V0KHZEYXRhLnN1YmFycmF5KDAsIHZidWYubGVuZ3RoIC0gdmVydGV4T2Zmc2V0KSwgdmVydGV4T2Zmc2V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZidWYuc2V0KHZEYXRhLCB2ZXJ0ZXhPZmZzZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmlsbCBpbmRpY2VzXG4gICAgICAgIGxldCBpYnVmID0gYnVmZmVyLl9pRGF0YSxcbiAgICAgICAgICAgIGluZGljZU9mZnNldCA9IG9mZnNldEluZm8uaW5kaWNlT2Zmc2V0LFxuICAgICAgICAgICAgdmVydGV4SWQgPSBvZmZzZXRJbmZvLnZlcnRleE9mZnNldDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBpRGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlidWZbaW5kaWNlT2Zmc2V0KytdID0gdmVydGV4SWQgKyBpRGF0YVtpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhY2tUb0R5bmFtaWNBdGxhcyAoY29tcCwgZnJhbWUpIHtcbiAgICAgICAgaWYgKENDX1RFU1QpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGlmICghZnJhbWUuX29yaWdpbmFsICYmIGR5bmFtaWNBdGxhc01hbmFnZXIgJiYgZnJhbWUuX3RleHR1cmUucGFja2FibGUpIHtcbiAgICAgICAgICAgIGxldCBwYWNrZWRGcmFtZSA9IGR5bmFtaWNBdGxhc01hbmFnZXIuaW5zZXJ0U3ByaXRlRnJhbWUoZnJhbWUpO1xuICAgICAgICAgICAgaWYgKHBhY2tlZEZyYW1lKSB7XG4gICAgICAgICAgICAgICAgZnJhbWUuX3NldER5bmFtaWNBdGxhc0ZyYW1lKHBhY2tlZEZyYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgbWF0ZXJpYWwgPSBjb21wLl9tYXRlcmlhbHNbMF07XG4gICAgICAgIGlmICghbWF0ZXJpYWwpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGlmIChtYXRlcmlhbC5nZXRQcm9wZXJ0eSgndGV4dHVyZScpICE9PSBmcmFtZS5fdGV4dHVyZSkge1xuICAgICAgICAgICAgLy8gdGV4dHVyZSB3YXMgcGFja2VkIHRvIGR5bmFtaWMgYXRsYXMsIHNob3VsZCB1cGRhdGUgdXZzXG4gICAgICAgICAgICBjb21wLl92ZXJ0c0RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbXAuX3VwZGF0ZU1hdGVyaWFsKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNjLmpzLmFkZG9uKEFzc2VtYmxlcjJELnByb3RvdHlwZSwge1xuICAgIGZsb2F0c1BlclZlcnQ6IDUsXG5cbiAgICB2ZXJ0aWNlc0NvdW50OiA0LFxuICAgIGluZGljZXNDb3VudDogNixcblxuICAgIHV2T2Zmc2V0OiAyLFxuICAgIGNvbG9yT2Zmc2V0OiA0LFxufSk7XG5cbmNjLkFzc2VtYmxlcjJEID0gQXNzZW1ibGVyMkQ7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==