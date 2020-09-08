
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
    var justTranslate = a === 1 && b === 0 && c === 0 && d === 1;

    if (justTranslate) {
      // left bottom
      verts[0] = vl + tx;
      verts[1] = vb + ty; // right bottom

      verts[5] = vr + tx;
      verts[6] = vb + ty; // left top

      verts[10] = vl + tx;
      verts[11] = vt + ty; // right top

      verts[15] = vr + tx;
      verts[16] = vt + ty;
    } else {
      var al = a * vl,
          ar = a * vr,
          bl = b * vl,
          br = b * vr,
          cb = c * vb,
          ct = c * vt,
          db = d * vb,
          dt = d * vt; // left bottom

      verts[0] = al + cb + tx;
      verts[1] = bl + db + ty; // right bottom

      verts[5] = ar + cb + tx;
      verts[6] = br + db + ty; // left top

      verts[10] = al + ct + tx;
      verts[11] = bl + dt + ty; // right top

      verts[15] = ar + ct + tx;
      verts[16] = br + dt + ty;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2Fzc2VtYmxlci0yZC5qcyJdLCJuYW1lcyI6WyJBc3NlbWJsZXIyRCIsIl9yZW5kZXJEYXRhIiwiUmVuZGVyRGF0YSIsImluaXQiLCJpbml0RGF0YSIsImluaXRMb2NhbCIsImRhdGEiLCJjcmVhdGVRdWFkRGF0YSIsInZlcnRpY2VzRmxvYXRzIiwiaW5kaWNlc0NvdW50IiwiX2xvY2FsIiwibGVuZ3RoIiwidXBkYXRlQ29sb3IiLCJjb21wIiwiY29sb3IiLCJ1aW50VmVydHMiLCJ1aW50VkRhdGFzIiwibm9kZSIsIl92YWwiLCJmbG9hdHNQZXJWZXJ0IiwiY29sb3JPZmZzZXQiLCJpIiwibCIsImdldEJ1ZmZlciIsImNjIiwicmVuZGVyZXIiLCJfaGFuZGxlIiwiX21lc2hCdWZmZXIiLCJ1cGRhdGVXb3JsZFZlcnRzIiwibG9jYWwiLCJ2ZXJ0cyIsInZEYXRhcyIsIm1hdHJpeCIsIl93b3JsZE1hdHJpeCIsIm1hdHJpeG0iLCJtIiwiYSIsImIiLCJjIiwiZCIsInR4IiwidHkiLCJ2bCIsInZyIiwidmIiLCJ2dCIsImp1c3RUcmFuc2xhdGUiLCJhbCIsImFyIiwiYmwiLCJiciIsImNiIiwiY3QiLCJkYiIsImR0IiwiZmlsbEJ1ZmZlcnMiLCJ3b3JsZE1hdERpcnR5IiwicmVuZGVyRGF0YSIsInZEYXRhIiwiaURhdGEiLCJpRGF0YXMiLCJidWZmZXIiLCJvZmZzZXRJbmZvIiwicmVxdWVzdCIsInZlcnRpY2VzQ291bnQiLCJ2ZXJ0ZXhPZmZzZXQiLCJieXRlT2Zmc2V0IiwidmJ1ZiIsIl92RGF0YSIsInNldCIsInN1YmFycmF5IiwiaWJ1ZiIsIl9pRGF0YSIsImluZGljZU9mZnNldCIsInZlcnRleElkIiwicGFja1RvRHluYW1pY0F0bGFzIiwiZnJhbWUiLCJDQ19URVNUIiwiX29yaWdpbmFsIiwiZHluYW1pY0F0bGFzTWFuYWdlciIsIl90ZXh0dXJlIiwicGFja2FibGUiLCJwYWNrZWRGcmFtZSIsImluc2VydFNwcml0ZUZyYW1lIiwiX3NldER5bmFtaWNBdGxhc0ZyYW1lIiwibWF0ZXJpYWwiLCJfbWF0ZXJpYWxzIiwiZ2V0UHJvcGVydHkiLCJfdmVydHNEaXJ0eSIsIl91cGRhdGVNYXRlcmlhbCIsIkFzc2VtYmxlciIsImpzIiwiYWRkb24iLCJwcm90b3R5cGUiLCJ1dk9mZnNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBOzs7QUFDakIseUJBQWU7QUFBQTs7QUFDWDtBQUVBLFVBQUtDLFdBQUwsR0FBbUIsSUFBSUMsc0JBQUosRUFBbkI7O0FBQ0EsVUFBS0QsV0FBTCxDQUFpQkUsSUFBakI7O0FBRUEsVUFBS0MsUUFBTDs7QUFDQSxVQUFLQyxTQUFMOztBQVBXO0FBUWQ7Ozs7U0FNREQsV0FBQSxvQkFBWTtBQUNSLFFBQUlFLElBQUksR0FBRyxLQUFLTCxXQUFoQjtBQUNBSyxJQUFBQSxJQUFJLENBQUNDLGNBQUwsQ0FBb0IsQ0FBcEIsRUFBdUIsS0FBS0MsY0FBNUIsRUFBNEMsS0FBS0MsWUFBakQ7QUFDSDs7U0FDREosWUFBQSxxQkFBYTtBQUNULFNBQUtLLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0EsTUFBTCxDQUFZQyxNQUFaLEdBQXFCLENBQXJCO0FBQ0g7O1NBRURDLGNBQUEscUJBQWFDLElBQWIsRUFBbUJDLEtBQW5CLEVBQTBCO0FBQ3RCLFFBQUlDLFNBQVMsR0FBRyxLQUFLZCxXQUFMLENBQWlCZSxVQUFqQixDQUE0QixDQUE1QixDQUFoQjtBQUNBLFFBQUksQ0FBQ0QsU0FBTCxFQUFnQjtBQUNoQkQsSUFBQUEsS0FBSyxHQUFHQSxLQUFLLElBQUksSUFBVCxHQUFnQkEsS0FBaEIsR0FBd0JELElBQUksQ0FBQ0ksSUFBTCxDQUFVSCxLQUFWLENBQWdCSSxJQUFoRDtBQUNBLFFBQUlDLGFBQWEsR0FBRyxLQUFLQSxhQUF6QjtBQUNBLFFBQUlDLFdBQVcsR0FBRyxLQUFLQSxXQUF2Qjs7QUFDQSxT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YTs7QUFFYixRQUFJLENBQUNELEtBQUssQ0FBQ0UsU0FBUCxJQUFvQkMsbUJBQXBCLElBQTJDSCxLQUFLLENBQUNJLFFBQU4sQ0FBZUMsUUFBOUQsRUFBd0U7QUFDcEUsVUFBSUMsV0FBVyxHQUFHSCxvQkFBb0JJLGlCQUFwQixDQUFzQ1AsS0FBdEMsQ0FBbEI7O0FBQ0EsVUFBSU0sV0FBSixFQUFpQjtBQUNiTixRQUFBQSxLQUFLLENBQUNRLHFCQUFOLENBQTRCRixXQUE1QjtBQUNIO0FBQ0o7O0FBQ0QsUUFBSUcsUUFBUSxHQUFHeEUsSUFBSSxDQUFDeUUsVUFBTCxDQUFnQixDQUFoQixDQUFmO0FBQ0EsUUFBSSxDQUFDRCxRQUFMLEVBQWU7O0FBRWYsUUFBSUEsUUFBUSxDQUFDRSxXQUFULENBQXFCLFNBQXJCLE1BQW9DWCxLQUFLLENBQUNJLFFBQTlDLEVBQXdEO0FBQ3BEO0FBQ0FuRSxNQUFBQSxJQUFJLENBQUMyRSxXQUFMLEdBQW1CLElBQW5COztBQUNBM0UsTUFBQUEsSUFBSSxDQUFDNEUsZUFBTDtBQUNIO0FBQ0o7Ozs7d0JBOUhxQjtBQUNsQixhQUFPLEtBQUt6QixhQUFMLEdBQXFCLEtBQUs3QyxhQUFqQztBQUNIOzs7O0VBYm9DdUU7OztBQTRJekNsRSxFQUFFLENBQUNtRSxFQUFILENBQU1DLEtBQU4sQ0FBWTVGLFdBQVcsQ0FBQzZGLFNBQXhCLEVBQW1DO0FBQy9CMUUsRUFBQUEsYUFBYSxFQUFFLENBRGdCO0FBRy9CNkMsRUFBQUEsYUFBYSxFQUFFLENBSGdCO0FBSS9CdkQsRUFBQUEsWUFBWSxFQUFFLENBSmlCO0FBTS9CcUYsRUFBQUEsUUFBUSxFQUFFLENBTnFCO0FBTy9CMUUsRUFBQUEsV0FBVyxFQUFFO0FBUGtCLENBQW5DO0FBVUFJLEVBQUUsQ0FBQ3hCLFdBQUgsR0FBaUJBLFdBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFzc2VtYmxlciBmcm9tICcuL2Fzc2VtYmxlcic7XG5pbXBvcnQgZHluYW1pY0F0bGFzTWFuYWdlciBmcm9tICcuL3V0aWxzL2R5bmFtaWMtYXRsYXMvbWFuYWdlcic7XG5pbXBvcnQgUmVuZGVyRGF0YSBmcm9tICcuL3dlYmdsL3JlbmRlci1kYXRhJztcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAnLi4vdmFsdWUtdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBc3NlbWJsZXIyRCBleHRlbmRzIEFzc2VtYmxlciB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX3JlbmRlckRhdGEgPSBuZXcgUmVuZGVyRGF0YSgpO1xuICAgICAgICB0aGlzLl9yZW5kZXJEYXRhLmluaXQodGhpcyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdExvY2FsKCk7XG4gICAgfVxuXG4gICAgZ2V0IHZlcnRpY2VzRmxvYXRzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVydGljZXNDb3VudCAqIHRoaXMuZmxvYXRzUGVyVmVydDtcbiAgICB9XG5cbiAgICBpbml0RGF0YSAoKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5fcmVuZGVyRGF0YTtcbiAgICAgICAgZGF0YS5jcmVhdGVRdWFkRGF0YSgwLCB0aGlzLnZlcnRpY2VzRmxvYXRzLCB0aGlzLmluZGljZXNDb3VudCk7XG4gICAgfVxuICAgIGluaXRMb2NhbCAoKSB7XG4gICAgICAgIHRoaXMuX2xvY2FsID0gW107XG4gICAgICAgIHRoaXMuX2xvY2FsLmxlbmd0aCA9IDQ7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29sb3IgKGNvbXAsIGNvbG9yKSB7XG4gICAgICAgIGxldCB1aW50VmVydHMgPSB0aGlzLl9yZW5kZXJEYXRhLnVpbnRWRGF0YXNbMF07XG4gICAgICAgIGlmICghdWludFZlcnRzKSByZXR1cm47XG4gICAgICAgIGNvbG9yID0gY29sb3IgIT0gbnVsbCA/IGNvbG9yIDogY29tcC5ub2RlLmNvbG9yLl92YWw7XG4gICAgICAgIGxldCBmbG9hdHNQZXJWZXJ0ID0gdGhpcy5mbG9hdHNQZXJWZXJ0O1xuICAgICAgICBsZXQgY29sb3JPZmZzZXQgPSB0aGlzLmNvbG9yT2Zmc2V0O1xuICAgICAgICBmb3IgKGxldCBpID0gY29sb3JPZmZzZXQsIGwgPSB1aW50VmVydHMubGVuZ3RoOyBpIDwgbDsgaSArPSBmbG9hdHNQZXJWZXJ0KSB7XG4gICAgICAgICAgICB1aW50VmVydHNbaV0gPSBjb2xvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEJ1ZmZlciAoKSB7XG4gICAgICAgIHJldHVybiBjYy5yZW5kZXJlci5faGFuZGxlLl9tZXNoQnVmZmVyO1xuICAgIH1cblxuICAgIHVwZGF0ZVdvcmxkVmVydHMgKGNvbXApIHtcbiAgICAgICAgbGV0IGxvY2FsID0gdGhpcy5fbG9jYWw7XG4gICAgICAgIGxldCB2ZXJ0cyA9IHRoaXMuX3JlbmRlckRhdGEudkRhdGFzWzBdO1xuXG4gICAgICAgIGxldCBtYXRyaXggPSBjb21wLm5vZGUuX3dvcmxkTWF0cml4O1xuICAgICAgICBsZXQgbWF0cml4bSA9IG1hdHJpeC5tLFxuICAgICAgICAgICAgYSA9IG1hdHJpeG1bMF0sIGIgPSBtYXRyaXhtWzFdLCBjID0gbWF0cml4bVs0XSwgZCA9IG1hdHJpeG1bNV0sXG4gICAgICAgICAgICB0eCA9IG1hdHJpeG1bMTJdLCB0eSA9IG1hdHJpeG1bMTNdO1xuXG4gICAgICAgIGxldCB2bCA9IGxvY2FsWzBdLCB2ciA9IGxvY2FsWzJdLFxuICAgICAgICAgICAgdmIgPSBsb2NhbFsxXSwgdnQgPSBsb2NhbFszXTtcbiAgICAgICAgXG4gICAgICAgIGxldCBqdXN0VHJhbnNsYXRlID0gYSA9PT0gMSAmJiBiID09PSAwICYmIGMgPT09IDAgJiYgZCA9PT0gMTtcblxuICAgICAgICBpZiAoanVzdFRyYW5zbGF0ZSkge1xuICAgICAgICAgICAgLy8gbGVmdCBib3R0b21cbiAgICAgICAgICAgIHZlcnRzWzBdID0gdmwgKyB0eDtcbiAgICAgICAgICAgIHZlcnRzWzFdID0gdmIgKyB0eTtcbiAgICAgICAgICAgIC8vIHJpZ2h0IGJvdHRvbVxuICAgICAgICAgICAgdmVydHNbNV0gPSB2ciArIHR4O1xuICAgICAgICAgICAgdmVydHNbNl0gPSB2YiArIHR5O1xuICAgICAgICAgICAgLy8gbGVmdCB0b3BcbiAgICAgICAgICAgIHZlcnRzWzEwXSA9IHZsICsgdHg7XG4gICAgICAgICAgICB2ZXJ0c1sxMV0gPSB2dCArIHR5O1xuICAgICAgICAgICAgLy8gcmlnaHQgdG9wXG4gICAgICAgICAgICB2ZXJ0c1sxNV0gPSB2ciArIHR4O1xuICAgICAgICAgICAgdmVydHNbMTZdID0gdnQgKyB0eTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBhbCA9IGEgKiB2bCwgYXIgPSBhICogdnIsXG4gICAgICAgICAgICBibCA9IGIgKiB2bCwgYnIgPSBiICogdnIsXG4gICAgICAgICAgICBjYiA9IGMgKiB2YiwgY3QgPSBjICogdnQsXG4gICAgICAgICAgICBkYiA9IGQgKiB2YiwgZHQgPSBkICogdnQ7XG5cbiAgICAgICAgICAgIC8vIGxlZnQgYm90dG9tXG4gICAgICAgICAgICB2ZXJ0c1swXSA9IGFsICsgY2IgKyB0eDtcbiAgICAgICAgICAgIHZlcnRzWzFdID0gYmwgKyBkYiArIHR5O1xuICAgICAgICAgICAgLy8gcmlnaHQgYm90dG9tXG4gICAgICAgICAgICB2ZXJ0c1s1XSA9IGFyICsgY2IgKyB0eDtcbiAgICAgICAgICAgIHZlcnRzWzZdID0gYnIgKyBkYiArIHR5O1xuICAgICAgICAgICAgLy8gbGVmdCB0b3BcbiAgICAgICAgICAgIHZlcnRzWzEwXSA9IGFsICsgY3QgKyB0eDtcbiAgICAgICAgICAgIHZlcnRzWzExXSA9IGJsICsgZHQgKyB0eTtcbiAgICAgICAgICAgIC8vIHJpZ2h0IHRvcFxuICAgICAgICAgICAgdmVydHNbMTVdID0gYXIgKyBjdCArIHR4O1xuICAgICAgICAgICAgdmVydHNbMTZdID0gYnIgKyBkdCArIHR5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmlsbEJ1ZmZlcnMgKGNvbXAsIHJlbmRlcmVyKSB7XG4gICAgICAgIGlmIChyZW5kZXJlci53b3JsZE1hdERpcnR5KSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVdvcmxkVmVydHMoY29tcCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVuZGVyRGF0YSA9IHRoaXMuX3JlbmRlckRhdGE7XG4gICAgICAgIGxldCB2RGF0YSA9IHJlbmRlckRhdGEudkRhdGFzWzBdO1xuICAgICAgICBsZXQgaURhdGEgPSByZW5kZXJEYXRhLmlEYXRhc1swXTtcblxuICAgICAgICBsZXQgYnVmZmVyID0gdGhpcy5nZXRCdWZmZXIocmVuZGVyZXIpO1xuICAgICAgICBsZXQgb2Zmc2V0SW5mbyA9IGJ1ZmZlci5yZXF1ZXN0KHRoaXMudmVydGljZXNDb3VudCwgdGhpcy5pbmRpY2VzQ291bnQpO1xuXG4gICAgICAgIC8vIGJ1ZmZlciBkYXRhIG1heSBiZSByZWFsbG9jLCBuZWVkIGdldCByZWZlcmVuY2UgYWZ0ZXIgcmVxdWVzdC5cblxuICAgICAgICAvLyBmaWxsIHZlcnRpY2VzXG4gICAgICAgIGxldCB2ZXJ0ZXhPZmZzZXQgPSBvZmZzZXRJbmZvLmJ5dGVPZmZzZXQgPj4gMixcbiAgICAgICAgICAgIHZidWYgPSBidWZmZXIuX3ZEYXRhO1xuXG4gICAgICAgIGlmICh2RGF0YS5sZW5ndGggKyB2ZXJ0ZXhPZmZzZXQgPiB2YnVmLmxlbmd0aCkge1xuICAgICAgICAgICAgdmJ1Zi5zZXQodkRhdGEuc3ViYXJyYXkoMCwgdmJ1Zi5sZW5ndGggLSB2ZXJ0ZXhPZmZzZXQpLCB2ZXJ0ZXhPZmZzZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmJ1Zi5zZXQodkRhdGEsIHZlcnRleE9mZnNldCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaWxsIGluZGljZXNcbiAgICAgICAgbGV0IGlidWYgPSBidWZmZXIuX2lEYXRhLFxuICAgICAgICAgICAgaW5kaWNlT2Zmc2V0ID0gb2Zmc2V0SW5mby5pbmRpY2VPZmZzZXQsXG4gICAgICAgICAgICB2ZXJ0ZXhJZCA9IG9mZnNldEluZm8udmVydGV4T2Zmc2V0O1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGlEYXRhLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWJ1ZltpbmRpY2VPZmZzZXQrK10gPSB2ZXJ0ZXhJZCArIGlEYXRhW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGFja1RvRHluYW1pY0F0bGFzIChjb21wLCBmcmFtZSkge1xuICAgICAgICBpZiAoQ0NfVEVTVCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFmcmFtZS5fb3JpZ2luYWwgJiYgZHluYW1pY0F0bGFzTWFuYWdlciAmJiBmcmFtZS5fdGV4dHVyZS5wYWNrYWJsZSkge1xuICAgICAgICAgICAgbGV0IHBhY2tlZEZyYW1lID0gZHluYW1pY0F0bGFzTWFuYWdlci5pbnNlcnRTcHJpdGVGcmFtZShmcmFtZSk7XG4gICAgICAgICAgICBpZiAocGFja2VkRnJhbWUpIHtcbiAgICAgICAgICAgICAgICBmcmFtZS5fc2V0RHluYW1pY0F0bGFzRnJhbWUocGFja2VkRnJhbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBtYXRlcmlhbCA9IGNvbXAuX21hdGVyaWFsc1swXTtcbiAgICAgICAgaWYgKCFtYXRlcmlhbCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgaWYgKG1hdGVyaWFsLmdldFByb3BlcnR5KCd0ZXh0dXJlJykgIT09IGZyYW1lLl90ZXh0dXJlKSB7XG4gICAgICAgICAgICAvLyB0ZXh0dXJlIHdhcyBwYWNrZWQgdG8gZHluYW1pYyBhdGxhcywgc2hvdWxkIHVwZGF0ZSB1dnNcbiAgICAgICAgICAgIGNvbXAuX3ZlcnRzRGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgY29tcC5fdXBkYXRlTWF0ZXJpYWwoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2MuanMuYWRkb24oQXNzZW1ibGVyMkQucHJvdG90eXBlLCB7XG4gICAgZmxvYXRzUGVyVmVydDogNSxcblxuICAgIHZlcnRpY2VzQ291bnQ6IDQsXG4gICAgaW5kaWNlc0NvdW50OiA2LFxuXG4gICAgdXZPZmZzZXQ6IDIsXG4gICAgY29sb3JPZmZzZXQ6IDQsXG59KTtcblxuY2MuQXNzZW1ibGVyMkQgPSBBc3NlbWJsZXIyRDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9