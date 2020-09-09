
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/graphics/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _assembler = _interopRequireDefault(require("../../../assembler"));

var _inputAssembler = _interopRequireDefault(require("../../../../../renderer/core/input-assembler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var MeshBuffer = require('../../mesh-buffer');

var renderer = require('../../../index');

var Graphics = require('../../../../graphics/graphics');

var PointFlags = require('../../../../graphics/types').PointFlags;

var LineJoin = Graphics.LineJoin;
var LineCap = Graphics.LineCap;

var Earcut = require('./earcut');

require('./impl');

var MAX_VERTEX = 65535;
var MAX_INDICE = MAX_VERTEX * 2;
var PI = Math.PI;
var min = Math.min;
var max = Math.max;
var ceil = Math.ceil;
var acos = Math.acos;
var cos = Math.cos;
var sin = Math.sin;
var atan2 = Math.atan2;

function curveDivs(r, arc, tol) {
  var da = acos(r / (r + tol)) * 2.0;
  return max(2, ceil(arc / da));
}

function clamp(v, min, max) {
  if (v < min) {
    return min;
  } else if (v > max) {
    return max;
  }

  return v;
}

var gfx = cc.gfx;
var vfmtPosColorSdf = new gfx.VertexFormat([{
  name: gfx.ATTR_POSITION,
  type: gfx.ATTR_TYPE_FLOAT32,
  num: 2
}, {
  name: gfx.ATTR_COLOR,
  type: gfx.ATTR_TYPE_UINT8,
  num: 4,
  normalize: true
}, {
  name: 'a_dist',
  type: gfx.ATTR_TYPE_FLOAT32,
  num: 1
}]);
vfmtPosColorSdf.name = 'vfmtPosColorSdf';

var GraphicsAssembler = /*#__PURE__*/function (_Assembler) {
  _inheritsLoose(GraphicsAssembler, _Assembler);

  function GraphicsAssembler(graphics) {
    var _this;

    _this = _Assembler.call(this, graphics) || this;
    _this._buffer = null;
    _this._buffers = [];
    _this._bufferOffset = 0;
    return _this;
  }

  var _proto = GraphicsAssembler.prototype;

  _proto.getVfmt = function getVfmt() {
    return vfmtPosColorSdf;
  };

  _proto.getVfmtFloatCount = function getVfmtFloatCount() {
    return 4;
  };

  _proto.requestBuffer = function requestBuffer() {
    var buffer = {
      indiceStart: 0,
      vertexStart: 0
    };
    var meshbuffer = new MeshBuffer(renderer._handle, this.getVfmt());
    buffer.meshbuffer = meshbuffer;
    var ia = new _inputAssembler["default"](meshbuffer._vb, meshbuffer._ib);
    buffer.ia = ia;

    this._buffers.push(buffer);

    return buffer;
  };

  _proto.getBuffers = function getBuffers() {
    if (this._buffers.length === 0) {
      this.requestBuffer();
    }

    return this._buffers;
  };

  _proto.clear = function clear(clean) {
    this._bufferOffset = 0;
    var datas = this._buffers;

    if (clean) {
      for (var i = 0, l = datas.length; i < l; i++) {
        var data = datas[i];
        data.meshbuffer.destroy();
        data.meshbuffer = null;
      }

      datas.length = 0;
    } else {
      for (var _i = 0, _l = datas.length; _i < _l; _i++) {
        var _data = datas[_i];
        _data.indiceStart = 0;
        _data.vertexStart = 0;
        var meshbuffer = _data.meshbuffer;
        meshbuffer.reset();
      }
    }
  };

  _proto.fillBuffers = function fillBuffers(graphics, renderer) {
    renderer._flush();

    renderer.node = graphics.node;
    renderer.material = graphics._materials[0];
    var buffers = this.getBuffers();

    for (var index = 0, length = buffers.length; index < length; index++) {
      var buffer = buffers[index];
      var meshbuffer = buffer.meshbuffer;
      buffer.ia._count = buffer.indiceStart;

      renderer._flushIA(buffer.ia);

      meshbuffer.uploadData();
    }
  };

  _proto.genBuffer = function genBuffer(graphics, cverts) {
    var buffers = this.getBuffers();
    var buffer = buffers[this._bufferOffset];
    var meshbuffer = buffer.meshbuffer;
    var maxVertsCount = buffer.vertexStart + cverts;

    if (maxVertsCount > MAX_VERTEX || maxVertsCount * 3 > MAX_INDICE) {
      ++this._bufferOffset;
      maxVertsCount = cverts;

      if (this._bufferOffset < buffers.length) {
        buffer = buffers[this._bufferOffset];
      } else {
        buffer = this.requestBuffer(graphics);
        buffers[this._bufferOffset] = buffer;
      }

      meshbuffer = buffer.meshbuffer;
    }

    if (maxVertsCount > meshbuffer.vertexOffset) {
      meshbuffer.requestStatic(cverts, cverts * 3);
    }

    this._buffer = buffer;
    return buffer;
  };

  _proto.stroke = function stroke(graphics) {
    this._curColor = graphics._strokeColor._val;

    this._flattenPaths(graphics._impl);

    this._expandStroke(graphics);

    graphics._impl._updatePathOffset = true;
  };

  _proto.fill = function fill(graphics) {
    this._curColor = graphics._fillColor._val;

    this._expandFill(graphics);

    graphics._impl._updatePathOffset = true;
  };

  _proto._expandStroke = function _expandStroke(graphics) {
    var w = graphics.lineWidth * 0.5,
        lineCap = graphics.lineCap,
        lineJoin = graphics.lineJoin,
        miterLimit = graphics.miterLimit;
    var impl = graphics._impl;
    var ncap = curveDivs(w, PI, impl._tessTol);

    this._calculateJoins(impl, w, lineJoin, miterLimit);

    var paths = impl._paths; // Calculate max vertex usage.

    var cverts = 0;

    for (var i = impl._pathOffset, l = impl._pathLength; i < l; i++) {
      var path = paths[i];
      var pointsLength = path.points.length;
      if (lineJoin === LineJoin.ROUND) cverts += (pointsLength + path.nbevel * (ncap + 2) + 1) * 2; // plus one for loop
      else cverts += (pointsLength + path.nbevel * 5 + 1) * 2; // plus one for loop

      if (!path.closed) {
        // space for caps
        if (lineCap === LineCap.ROUND) {
          cverts += (ncap * 2 + 2) * 2;
        } else {
          cverts += (3 + 3) * 2;
        }
      }
    }

    var buffer = this.genBuffer(graphics, cverts),
        meshbuffer = buffer.meshbuffer,
        vData = meshbuffer._vData,
        iData = meshbuffer._iData;

    for (var _i2 = impl._pathOffset, _l2 = impl._pathLength; _i2 < _l2; _i2++) {
      var _path = paths[_i2];
      var pts = _path.points;
      var _pointsLength = pts.length;
      var offset = buffer.vertexStart;
      var p0 = void 0,
          p1 = void 0;
      var start = void 0,
          end = void 0,
          loop = void 0;
      loop = _path.closed;

      if (loop) {
        // Looping
        p0 = pts[_pointsLength - 1];
        p1 = pts[0];
        start = 0;
        end = _pointsLength;
      } else {
        // Add cap
        p0 = pts[0];
        p1 = pts[1];
        start = 1;
        end = _pointsLength - 1;
      }

      p1 = p1 || p0;

      if (!loop) {
        // Add cap
        var dPos = p1.sub(p0);
        dPos.normalizeSelf();
        var dx = dPos.x;
        var dy = dPos.y;
        if (lineCap === LineCap.BUTT) this._buttCapStart(p0, dx, dy, w, 0);else if (lineCap === LineCap.SQUARE) this._buttCapStart(p0, dx, dy, w, w);else if (lineCap === LineCap.ROUND) this._roundCapStart(p0, dx, dy, w, ncap);
      }

      for (var j = start; j < end; ++j) {
        if (lineJoin === LineJoin.ROUND) {
          this._roundJoin(p0, p1, w, w, ncap);
        } else if ((p1.flags & (PointFlags.PT_BEVEL | PointFlags.PT_INNERBEVEL)) !== 0) {
          this._bevelJoin(p0, p1, w, w);
        } else {
          this._vset(p1.x + p1.dmx * w, p1.y + p1.dmy * w, 1);

          this._vset(p1.x - p1.dmx * w, p1.y - p1.dmy * w, -1);
        }

        p0 = p1;
        p1 = pts[j + 1];
      }

      if (loop) {
        // Loop it
        var floatCount = this.getVfmtFloatCount();
        var vDataoOfset = offset * floatCount;

        this._vset(vData[vDataoOfset], vData[vDataoOfset + 1], 1);

        this._vset(vData[vDataoOfset + floatCount], vData[vDataoOfset + floatCount + 1], -1);
      } else {
        // Add cap
        var _dPos = p1.sub(p0);

        _dPos.normalizeSelf();

        var _dx = _dPos.x;
        var _dy = _dPos.y;
        if (lineCap === LineCap.BUTT) this._buttCapEnd(p1, _dx, _dy, w, 0);else if (lineCap === LineCap.SQUARE) this._buttCapEnd(p1, _dx, _dy, w, w);else if (lineCap === LineCap.ROUND) this._roundCapEnd(p1, _dx, _dy, w, ncap);
      } // stroke indices


      var indicesOffset = buffer.indiceStart;

      for (var _start = offset + 2, _end = buffer.vertexStart; _start < _end; _start++) {
        iData[indicesOffset++] = _start - 2;
        iData[indicesOffset++] = _start - 1;
        iData[indicesOffset++] = _start;
      }

      buffer.indiceStart = indicesOffset;
    }
  };

  _proto._expandFill = function _expandFill(graphics) {
    var impl = graphics._impl;
    var paths = impl._paths; // Calculate max vertex usage.

    var cverts = 0;

    for (var i = impl._pathOffset, l = impl._pathLength; i < l; i++) {
      var path = paths[i];
      var pointsLength = path.points.length;
      cverts += pointsLength;
    }

    var buffer = this.genBuffer(graphics, cverts),
        meshbuffer = buffer.meshbuffer,
        vData = meshbuffer._vData,
        iData = meshbuffer._iData;

    for (var _i3 = impl._pathOffset, _l3 = impl._pathLength; _i3 < _l3; _i3++) {
      var _path2 = paths[_i3];
      var pts = _path2.points;
      var _pointsLength2 = pts.length;

      if (_pointsLength2 === 0) {
        continue;
      } // Calculate shape vertices.


      var offset = buffer.vertexStart;

      for (var j = 0; j < _pointsLength2; ++j) {
        this._vset(pts[j].x, pts[j].y);
      }

      var indicesOffset = buffer.indiceStart;

      if (_path2.complex) {
        var earcutData = [];
        var floatCount = this.getVfmtFloatCount();

        for (var _j = offset, end = buffer.vertexStart; _j < end; _j++) {
          var vDataOffset = _j * floatCount;
          earcutData.push(vData[vDataOffset]);
          earcutData.push(vData[vDataOffset + 1]);
        }

        var newIndices = Earcut(earcutData, null, 2);

        if (!newIndices || newIndices.length === 0) {
          continue;
        }

        for (var _j2 = 0, nIndices = newIndices.length; _j2 < nIndices; _j2++) {
          iData[indicesOffset++] = newIndices[_j2] + offset;
        }
      } else {
        var first = offset;

        for (var start = offset + 2, _end2 = buffer.vertexStart; start < _end2; start++) {
          iData[indicesOffset++] = first;
          iData[indicesOffset++] = start - 1;
          iData[indicesOffset++] = start;
        }
      }

      buffer.indiceStart = indicesOffset;
    }
  };

  _proto._calculateJoins = function _calculateJoins(impl, w, lineJoin, miterLimit) {
    var iw = 0.0;

    if (w > 0.0) {
      iw = 1 / w;
    } // Calculate which joins needs extra vertices to append, and gather vertex count.


    var paths = impl._paths;

    for (var i = impl._pathOffset, l = impl._pathLength; i < l; i++) {
      var path = paths[i];
      var pts = path.points;
      var ptsLength = pts.length;
      var p0 = pts[ptsLength - 1];
      var p1 = pts[0];
      var nleft = 0;
      path.nbevel = 0;

      for (var j = 0; j < ptsLength; j++) {
        var dmr2 = void 0,
            cross = void 0,
            limit = void 0; // perp normals

        var dlx0 = p0.dy;
        var dly0 = -p0.dx;
        var dlx1 = p1.dy;
        var dly1 = -p1.dx; // Calculate extrusions

        p1.dmx = (dlx0 + dlx1) * 0.5;
        p1.dmy = (dly0 + dly1) * 0.5;
        dmr2 = p1.dmx * p1.dmx + p1.dmy * p1.dmy;

        if (dmr2 > 0.000001) {
          var scale = 1 / dmr2;

          if (scale > 600) {
            scale = 600;
          }

          p1.dmx *= scale;
          p1.dmy *= scale;
        } // Keep track of left turns.


        cross = p1.dx * p0.dy - p0.dx * p1.dy;

        if (cross > 0) {
          nleft++;
          p1.flags |= PointFlags.PT_LEFT;
        } // Calculate if we should use bevel or miter for inner join.


        limit = max(11, min(p0.len, p1.len) * iw);

        if (dmr2 * limit * limit < 1) {
          p1.flags |= PointFlags.PT_INNERBEVEL;
        } // Check to see if the corner needs to be beveled.


        if (p1.flags & PointFlags.PT_CORNER) {
          if (dmr2 * miterLimit * miterLimit < 1 || lineJoin === LineJoin.BEVEL || lineJoin === LineJoin.ROUND) {
            p1.flags |= PointFlags.PT_BEVEL;
          }
        }

        if ((p1.flags & (PointFlags.PT_BEVEL | PointFlags.PT_INNERBEVEL)) !== 0) {
          path.nbevel++;
        }

        p0 = p1;
        p1 = pts[j + 1];
      }
    }
  };

  _proto._flattenPaths = function _flattenPaths(impl) {
    var paths = impl._paths;

    for (var i = impl._pathOffset, l = impl._pathLength; i < l; i++) {
      var path = paths[i];
      var pts = path.points;
      var p0 = pts[pts.length - 1];
      var p1 = pts[0];

      if (pts.length > 2 && p0.equals(p1)) {
        path.closed = true;
        pts.pop();
        p0 = pts[pts.length - 1];
      }

      for (var j = 0, size = pts.length; j < size; j++) {
        // Calculate segment direction and length
        var dPos = p1.sub(p0);
        p0.len = dPos.mag();
        if (dPos.x || dPos.y) dPos.normalizeSelf();
        p0.dx = dPos.x;
        p0.dy = dPos.y; // Advance

        p0 = p1;
        p1 = pts[j + 1];
      }
    }
  };

  _proto._chooseBevel = function _chooseBevel(bevel, p0, p1, w) {
    var x = p1.x;
    var y = p1.y;
    var x0, y0, x1, y1;

    if (bevel !== 0) {
      x0 = x + p0.dy * w;
      y0 = y - p0.dx * w;
      x1 = x + p1.dy * w;
      y1 = y - p1.dx * w;
    } else {
      x0 = x1 = x + p1.dmx * w;
      y0 = y1 = y + p1.dmy * w;
    }

    return [x0, y0, x1, y1];
  };

  _proto._buttCapStart = function _buttCapStart(p, dx, dy, w, d) {
    var px = p.x - dx * d;
    var py = p.y - dy * d;
    var dlx = dy;
    var dly = -dx;

    this._vset(px + dlx * w, py + dly * w, 1);

    this._vset(px - dlx * w, py - dly * w, -1);
  };

  _proto._buttCapEnd = function _buttCapEnd(p, dx, dy, w, d) {
    var px = p.x + dx * d;
    var py = p.y + dy * d;
    var dlx = dy;
    var dly = -dx;

    this._vset(px + dlx * w, py + dly * w, 1);

    this._vset(px - dlx * w, py - dly * w, -1);
  };

  _proto._roundCapStart = function _roundCapStart(p, dx, dy, w, ncap) {
    var px = p.x;
    var py = p.y;
    var dlx = dy;
    var dly = -dx;

    for (var i = 0; i < ncap; i++) {
      var a = i / (ncap - 1) * PI;
      var ax = cos(a) * w,
          ay = sin(a) * w;

      this._vset(px - dlx * ax - dx * ay, py - dly * ax - dy * ay, 1);

      this._vset(px, py, 0);
    }

    this._vset(px + dlx * w, py + dly * w, 1);

    this._vset(px - dlx * w, py - dly * w, -1);
  };

  _proto._roundCapEnd = function _roundCapEnd(p, dx, dy, w, ncap) {
    var px = p.x;
    var py = p.y;
    var dlx = dy;
    var dly = -dx;

    this._vset(px + dlx * w, py + dly * w, 1);

    this._vset(px - dlx * w, py - dly * w, -1);

    for (var i = 0; i < ncap; i++) {
      var a = i / (ncap - 1) * PI;
      var ax = cos(a) * w,
          ay = sin(a) * w;

      this._vset(px, py, 0);

      this._vset(px - dlx * ax + dx * ay, py - dly * ax + dy * ay, 1);
    }
  };

  _proto._roundJoin = function _roundJoin(p0, p1, lw, rw, ncap) {
    var dlx0 = p0.dy;
    var dly0 = -p0.dx;
    var dlx1 = p1.dy;
    var dly1 = -p1.dx;
    var p1x = p1.x;
    var p1y = p1.y;

    if ((p1.flags & PointFlags.PT_LEFT) !== 0) {
      var out = this._chooseBevel(p1.flags & PointFlags.PT_INNERBEVEL, p0, p1, lw);

      var lx0 = out[0];
      var ly0 = out[1];
      var lx1 = out[2];
      var ly1 = out[3];
      var a0 = atan2(-dly0, -dlx0);
      var a1 = atan2(-dly1, -dlx1);
      if (a1 > a0) a1 -= PI * 2;

      this._vset(lx0, ly0, 1);

      this._vset(p1x - dlx0 * rw, p1.y - dly0 * rw, -1);

      var n = clamp(ceil((a0 - a1) / PI) * ncap, 2, ncap);

      for (var i = 0; i < n; i++) {
        var u = i / (n - 1);
        var a = a0 + u * (a1 - a0);
        var rx = p1x + cos(a) * rw;
        var ry = p1y + sin(a) * rw;

        this._vset(p1x, p1y, 0);

        this._vset(rx, ry, -1);
      }

      this._vset(lx1, ly1, 1);

      this._vset(p1x - dlx1 * rw, p1y - dly1 * rw, -1);
    } else {
      var _out = this._chooseBevel(p1.flags & PointFlags.PT_INNERBEVEL, p0, p1, -rw);

      var rx0 = _out[0];
      var ry0 = _out[1];
      var rx1 = _out[2];
      var ry1 = _out[3];

      var _a = atan2(dly0, dlx0);

      var _a2 = atan2(dly1, dlx1);

      if (_a2 < _a) _a2 += PI * 2;

      this._vset(p1x + dlx0 * rw, p1y + dly0 * rw, 1);

      this._vset(rx0, ry0, -1);

      var _n = clamp(ceil((_a2 - _a) / PI) * ncap, 2, ncap);

      for (var _i4 = 0; _i4 < _n; _i4++) {
        var _u = _i4 / (_n - 1);

        var _a3 = _a + _u * (_a2 - _a);

        var lx = p1x + cos(_a3) * lw;
        var ly = p1y + sin(_a3) * lw;

        this._vset(lx, ly, 1);

        this._vset(p1x, p1y, 0);
      }

      this._vset(p1x + dlx1 * rw, p1y + dly1 * rw, 1);

      this._vset(rx1, ry1, -1);
    }
  };

  _proto._bevelJoin = function _bevelJoin(p0, p1, lw, rw) {
    var rx0, ry0, rx1, ry1;
    var lx0, ly0, lx1, ly1;
    var dlx0 = p0.dy;
    var dly0 = -p0.dx;
    var dlx1 = p1.dy;
    var dly1 = -p1.dx;

    if (p1.flags & PointFlags.PT_LEFT) {
      var out = this._chooseBevel(p1.flags & PointFlags.PT_INNERBEVEL, p0, p1, lw);

      lx0 = out[0];
      ly0 = out[1];
      lx1 = out[2];
      ly1 = out[3];

      this._vset(lx0, ly0, 1);

      this._vset(p1.x - dlx0 * rw, p1.y - dly0 * rw, -1);

      this._vset(lx1, ly1, 1);

      this._vset(p1.x - dlx1 * rw, p1.y - dly1 * rw, -1);
    } else {
      var _out2 = this._chooseBevel(p1.flags & PointFlags.PT_INNERBEVEL, p0, p1, -rw);

      rx0 = _out2[0];
      ry0 = _out2[1];
      rx1 = _out2[2];
      ry1 = _out2[3];

      this._vset(p1.x + dlx0 * lw, p1.y + dly0 * lw, 1);

      this._vset(rx0, ry0, -1);

      this._vset(p1.x + dlx1 * lw, p1.y + dly1 * lw, 1);

      this._vset(rx1, ry1, -1);
    }
  };

  _proto._vset = function _vset(x, y, distance) {
    if (distance === void 0) {
      distance = 0;
    }

    var buffer = this._buffer;
    var meshbuffer = buffer.meshbuffer;
    var dataOffset = buffer.vertexStart * this.getVfmtFloatCount();
    var vData = meshbuffer._vData;
    var uintVData = meshbuffer._uintVData;
    vData[dataOffset] = x;
    vData[dataOffset + 1] = y;
    uintVData[dataOffset + 2] = this._curColor;
    vData[dataOffset + 3] = distance;
    buffer.vertexStart++;
    meshbuffer._dirty = true;
  };

  return GraphicsAssembler;
}(_assembler["default"]);

exports["default"] = GraphicsAssembler;

_assembler["default"].register(cc.Graphics, GraphicsAssembler);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL2Fzc2VtYmxlcnMvZ3JhcGhpY3MvaW5kZXguanMiXSwibmFtZXMiOlsiTWVzaEJ1ZmZlciIsInJlcXVpcmUiLCJyZW5kZXJlciIsIkdyYXBoaWNzIiwiUG9pbnRGbGFncyIsIkxpbmVKb2luIiwiTGluZUNhcCIsIkVhcmN1dCIsIk1BWF9WRVJURVgiLCJNQVhfSU5ESUNFIiwiUEkiLCJNYXRoIiwibWluIiwibWF4IiwiY2VpbCIsImFjb3MiLCJjb3MiLCJzaW4iLCJhdGFuMiIsImN1cnZlRGl2cyIsInIiLCJhcmMiLCJ0b2wiLCJkYSIsImNsYW1wIiwidiIsImdmeCIsImNjIiwidmZtdFBvc0NvbG9yU2RmIiwiVmVydGV4Rm9ybWF0IiwibmFtZSIsIkFUVFJfUE9TSVRJT04iLCJ0eXBlIiwiQVRUUl9UWVBFX0ZMT0FUMzIiLCJudW0iLCJBVFRSX0NPTE9SIiwiQVRUUl9UWVBFX1VJTlQ4Iiwibm9ybWFsaXplIiwiR3JhcGhpY3NBc3NlbWJsZXIiLCJncmFwaGljcyIsIl9idWZmZXIiLCJfYnVmZmVycyIsIl9idWZmZXJPZmZzZXQiLCJnZXRWZm10IiwiZ2V0VmZtdEZsb2F0Q291bnQiLCJyZXF1ZXN0QnVmZmVyIiwiYnVmZmVyIiwiaW5kaWNlU3RhcnQiLCJ2ZXJ0ZXhTdGFydCIsIm1lc2hidWZmZXIiLCJfaGFuZGxlIiwiaWEiLCJJbnB1dEFzc2VtYmxlciIsIl92YiIsIl9pYiIsInB1c2giLCJnZXRCdWZmZXJzIiwibGVuZ3RoIiwiY2xlYXIiLCJjbGVhbiIsImRhdGFzIiwiaSIsImwiLCJkYXRhIiwiZGVzdHJveSIsInJlc2V0IiwiZmlsbEJ1ZmZlcnMiLCJfZmx1c2giLCJub2RlIiwibWF0ZXJpYWwiLCJfbWF0ZXJpYWxzIiwiYnVmZmVycyIsImluZGV4IiwiX2NvdW50IiwiX2ZsdXNoSUEiLCJ1cGxvYWREYXRhIiwiZ2VuQnVmZmVyIiwiY3ZlcnRzIiwibWF4VmVydHNDb3VudCIsInZlcnRleE9mZnNldCIsInJlcXVlc3RTdGF0aWMiLCJzdHJva2UiLCJfY3VyQ29sb3IiLCJfc3Ryb2tlQ29sb3IiLCJfdmFsIiwiX2ZsYXR0ZW5QYXRocyIsIl9pbXBsIiwiX2V4cGFuZFN0cm9rZSIsIl91cGRhdGVQYXRoT2Zmc2V0IiwiZmlsbCIsIl9maWxsQ29sb3IiLCJfZXhwYW5kRmlsbCIsInciLCJsaW5lV2lkdGgiLCJsaW5lQ2FwIiwibGluZUpvaW4iLCJtaXRlckxpbWl0IiwiaW1wbCIsIm5jYXAiLCJfdGVzc1RvbCIsIl9jYWxjdWxhdGVKb2lucyIsInBhdGhzIiwiX3BhdGhzIiwiX3BhdGhPZmZzZXQiLCJfcGF0aExlbmd0aCIsInBhdGgiLCJwb2ludHNMZW5ndGgiLCJwb2ludHMiLCJST1VORCIsIm5iZXZlbCIsImNsb3NlZCIsInZEYXRhIiwiX3ZEYXRhIiwiaURhdGEiLCJfaURhdGEiLCJwdHMiLCJvZmZzZXQiLCJwMCIsInAxIiwic3RhcnQiLCJlbmQiLCJsb29wIiwiZFBvcyIsInN1YiIsIm5vcm1hbGl6ZVNlbGYiLCJkeCIsIngiLCJkeSIsInkiLCJCVVRUIiwiX2J1dHRDYXBTdGFydCIsIlNRVUFSRSIsIl9yb3VuZENhcFN0YXJ0IiwiaiIsIl9yb3VuZEpvaW4iLCJmbGFncyIsIlBUX0JFVkVMIiwiUFRfSU5ORVJCRVZFTCIsIl9iZXZlbEpvaW4iLCJfdnNldCIsImRteCIsImRteSIsImZsb2F0Q291bnQiLCJ2RGF0YW9PZnNldCIsIl9idXR0Q2FwRW5kIiwiX3JvdW5kQ2FwRW5kIiwiaW5kaWNlc09mZnNldCIsImNvbXBsZXgiLCJlYXJjdXREYXRhIiwidkRhdGFPZmZzZXQiLCJuZXdJbmRpY2VzIiwibkluZGljZXMiLCJmaXJzdCIsIml3IiwicHRzTGVuZ3RoIiwibmxlZnQiLCJkbXIyIiwiY3Jvc3MiLCJsaW1pdCIsImRseDAiLCJkbHkwIiwiZGx4MSIsImRseTEiLCJzY2FsZSIsIlBUX0xFRlQiLCJsZW4iLCJQVF9DT1JORVIiLCJCRVZFTCIsImVxdWFscyIsInBvcCIsInNpemUiLCJtYWciLCJfY2hvb3NlQmV2ZWwiLCJiZXZlbCIsIngwIiwieTAiLCJ4MSIsInkxIiwicCIsImQiLCJweCIsInB5IiwiZGx4IiwiZGx5IiwiYSIsImF4IiwiYXkiLCJsdyIsInJ3IiwicDF4IiwicDF5Iiwib3V0IiwibHgwIiwibHkwIiwibHgxIiwibHkxIiwiYTAiLCJhMSIsIm4iLCJ1IiwicngiLCJyeSIsInJ4MCIsInJ5MCIsInJ4MSIsInJ5MSIsImx4IiwibHkiLCJkaXN0YW5jZSIsImRhdGFPZmZzZXQiLCJ1aW50VkRhdGEiLCJfdWludFZEYXRhIiwiX2RpcnR5IiwiQXNzZW1ibGVyIiwicmVnaXN0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBRUE7Ozs7OztBQUVBLElBQU1BLFVBQVUsR0FBR0MsT0FBTyxDQUFDLG1CQUFELENBQTFCOztBQUNBLElBQU1DLFFBQVEsR0FBR0QsT0FBTyxDQUFDLGdCQUFELENBQXhCOztBQUVBLElBQU1FLFFBQVEsR0FBR0YsT0FBTyxDQUFDLCtCQUFELENBQXhCOztBQUNBLElBQU1HLFVBQVUsR0FBR0gsT0FBTyxDQUFDLDRCQUFELENBQVAsQ0FBc0NHLFVBQXpEOztBQUNBLElBQU1DLFFBQVEsR0FBR0YsUUFBUSxDQUFDRSxRQUExQjtBQUNBLElBQU1DLE9BQU8sR0FBR0gsUUFBUSxDQUFDRyxPQUF6Qjs7QUFDQSxJQUFNQyxNQUFNLEdBQUdOLE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUNBQSxPQUFPLENBQUMsUUFBRCxDQUFQOztBQUVBLElBQU1PLFVBQVUsR0FBRyxLQUFuQjtBQUNBLElBQU1DLFVBQVUsR0FBR0QsVUFBVSxHQUFHLENBQWhDO0FBRUEsSUFBTUUsRUFBRSxHQUFRQyxJQUFJLENBQUNELEVBQXJCO0FBQ0EsSUFBTUUsR0FBRyxHQUFPRCxJQUFJLENBQUNDLEdBQXJCO0FBQ0EsSUFBTUMsR0FBRyxHQUFPRixJQUFJLENBQUNFLEdBQXJCO0FBQ0EsSUFBTUMsSUFBSSxHQUFNSCxJQUFJLENBQUNHLElBQXJCO0FBQ0EsSUFBTUMsSUFBSSxHQUFNSixJQUFJLENBQUNJLElBQXJCO0FBQ0EsSUFBTUMsR0FBRyxHQUFPTCxJQUFJLENBQUNLLEdBQXJCO0FBQ0EsSUFBTUMsR0FBRyxHQUFPTixJQUFJLENBQUNNLEdBQXJCO0FBQ0EsSUFBTUMsS0FBSyxHQUFLUCxJQUFJLENBQUNPLEtBQXJCOztBQUVBLFNBQVNDLFNBQVQsQ0FBb0JDLENBQXBCLEVBQXVCQyxHQUF2QixFQUE0QkMsR0FBNUIsRUFBaUM7QUFDN0IsTUFBSUMsRUFBRSxHQUFHUixJQUFJLENBQUNLLENBQUMsSUFBSUEsQ0FBQyxHQUFHRSxHQUFSLENBQUYsQ0FBSixHQUFzQixHQUEvQjtBQUNBLFNBQU9ULEdBQUcsQ0FBQyxDQUFELEVBQUlDLElBQUksQ0FBQ08sR0FBRyxHQUFHRSxFQUFQLENBQVIsQ0FBVjtBQUNIOztBQUVELFNBQVNDLEtBQVQsQ0FBZ0JDLENBQWhCLEVBQW1CYixHQUFuQixFQUF3QkMsR0FBeEIsRUFBNkI7QUFDekIsTUFBSVksQ0FBQyxHQUFHYixHQUFSLEVBQWE7QUFDVCxXQUFPQSxHQUFQO0FBQ0gsR0FGRCxNQUdLLElBQUlhLENBQUMsR0FBR1osR0FBUixFQUFhO0FBQ2QsV0FBT0EsR0FBUDtBQUNIOztBQUNELFNBQU9ZLENBQVA7QUFDSDs7QUFHRCxJQUFJQyxHQUFHLEdBQUdDLEVBQUUsQ0FBQ0QsR0FBYjtBQUNBLElBQUlFLGVBQWUsR0FBRyxJQUFJRixHQUFHLENBQUNHLFlBQVIsQ0FBcUIsQ0FDdkM7QUFBRUMsRUFBQUEsSUFBSSxFQUFFSixHQUFHLENBQUNLLGFBQVo7QUFBMkJDLEVBQUFBLElBQUksRUFBRU4sR0FBRyxDQUFDTyxpQkFBckM7QUFBd0RDLEVBQUFBLEdBQUcsRUFBRTtBQUE3RCxDQUR1QyxFQUV2QztBQUFFSixFQUFBQSxJQUFJLEVBQUVKLEdBQUcsQ0FBQ1MsVUFBWjtBQUF3QkgsRUFBQUEsSUFBSSxFQUFFTixHQUFHLENBQUNVLGVBQWxDO0FBQW1ERixFQUFBQSxHQUFHLEVBQUUsQ0FBeEQ7QUFBMkRHLEVBQUFBLFNBQVMsRUFBRTtBQUF0RSxDQUZ1QyxFQUd2QztBQUFFUCxFQUFBQSxJQUFJLEVBQUUsUUFBUjtBQUFrQkUsRUFBQUEsSUFBSSxFQUFFTixHQUFHLENBQUNPLGlCQUE1QjtBQUErQ0MsRUFBQUEsR0FBRyxFQUFFO0FBQXBELENBSHVDLENBQXJCLENBQXRCO0FBS0FOLGVBQWUsQ0FBQ0UsSUFBaEIsR0FBdUIsaUJBQXZCOztJQUVxQlE7OztBQUNqQiw2QkFBYUMsUUFBYixFQUF1QjtBQUFBOztBQUNuQixrQ0FBTUEsUUFBTjtBQUVBLFVBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0EsVUFBS0MsUUFBTCxHQUFnQixFQUFoQjtBQUNBLFVBQUtDLGFBQUwsR0FBcUIsQ0FBckI7QUFMbUI7QUFNdEI7Ozs7U0FFREMsVUFBQSxtQkFBVztBQUNQLFdBQU9mLGVBQVA7QUFDSDs7U0FFRGdCLG9CQUFBLDZCQUFxQjtBQUNqQixXQUFPLENBQVA7QUFDSDs7U0FFREMsZ0JBQUEseUJBQWlCO0FBQ2IsUUFBSUMsTUFBTSxHQUFHO0FBQ1RDLE1BQUFBLFdBQVcsRUFBRSxDQURKO0FBRVRDLE1BQUFBLFdBQVcsRUFBRTtBQUZKLEtBQWI7QUFLQSxRQUFJQyxVQUFVLEdBQUcsSUFBSWpELFVBQUosQ0FBZUUsUUFBUSxDQUFDZ0QsT0FBeEIsRUFBaUMsS0FBS1AsT0FBTCxFQUFqQyxDQUFqQjtBQUNBRyxJQUFBQSxNQUFNLENBQUNHLFVBQVAsR0FBb0JBLFVBQXBCO0FBRUEsUUFBSUUsRUFBRSxHQUFHLElBQUlDLDBCQUFKLENBQW1CSCxVQUFVLENBQUNJLEdBQTlCLEVBQW1DSixVQUFVLENBQUNLLEdBQTlDLENBQVQ7QUFDQVIsSUFBQUEsTUFBTSxDQUFDSyxFQUFQLEdBQVlBLEVBQVo7O0FBRUEsU0FBS1YsUUFBTCxDQUFjYyxJQUFkLENBQW1CVCxNQUFuQjs7QUFFQSxXQUFPQSxNQUFQO0FBQ0g7O1NBRURVLGFBQUEsc0JBQWM7QUFDVixRQUFJLEtBQUtmLFFBQUwsQ0FBY2dCLE1BQWQsS0FBeUIsQ0FBN0IsRUFBZ0M7QUFDNUIsV0FBS1osYUFBTDtBQUNIOztBQUVELFdBQU8sS0FBS0osUUFBWjtBQUNIOztTQUVEaUIsUUFBQSxlQUFPQyxLQUFQLEVBQWM7QUFDVixTQUFLakIsYUFBTCxHQUFxQixDQUFyQjtBQUVBLFFBQUlrQixLQUFLLEdBQUcsS0FBS25CLFFBQWpCOztBQUNBLFFBQUlrQixLQUFKLEVBQVc7QUFDUCxXQUFLLElBQUlFLENBQUMsR0FBRyxDQUFSLEVBQVdDLENBQUMsR0FBR0YsS0FBSyxDQUFDSCxNQUExQixFQUFrQ0ksQ0FBQyxHQUFHQyxDQUF0QyxFQUF5Q0QsQ0FBQyxFQUExQyxFQUE4QztBQUMxQyxZQUFJRSxJQUFJLEdBQUdILEtBQUssQ0FBQ0MsQ0FBRCxDQUFoQjtBQUNBRSxRQUFBQSxJQUFJLENBQUNkLFVBQUwsQ0FBZ0JlLE9BQWhCO0FBQ0FELFFBQUFBLElBQUksQ0FBQ2QsVUFBTCxHQUFrQixJQUFsQjtBQUNIOztBQUNEVyxNQUFBQSxLQUFLLENBQUNILE1BQU4sR0FBZSxDQUFmO0FBQ0gsS0FQRCxNQVFLO0FBQ0QsV0FBSyxJQUFJSSxFQUFDLEdBQUcsQ0FBUixFQUFXQyxFQUFDLEdBQUdGLEtBQUssQ0FBQ0gsTUFBMUIsRUFBa0NJLEVBQUMsR0FBR0MsRUFBdEMsRUFBeUNELEVBQUMsRUFBMUMsRUFBOEM7QUFDMUMsWUFBSUUsS0FBSSxHQUFHSCxLQUFLLENBQUNDLEVBQUQsQ0FBaEI7QUFFQUUsUUFBQUEsS0FBSSxDQUFDaEIsV0FBTCxHQUFtQixDQUFuQjtBQUNBZ0IsUUFBQUEsS0FBSSxDQUFDZixXQUFMLEdBQW1CLENBQW5CO0FBRUEsWUFBSUMsVUFBVSxHQUFHYyxLQUFJLENBQUNkLFVBQXRCO0FBQ0FBLFFBQUFBLFVBQVUsQ0FBQ2dCLEtBQVg7QUFDSDtBQUNKO0FBQ0o7O1NBRURDLGNBQUEscUJBQWEzQixRQUFiLEVBQXVCckMsUUFBdkIsRUFBaUM7QUFDN0JBLElBQUFBLFFBQVEsQ0FBQ2lFLE1BQVQ7O0FBRUFqRSxJQUFBQSxRQUFRLENBQUNrRSxJQUFULEdBQWdCN0IsUUFBUSxDQUFDNkIsSUFBekI7QUFDQWxFLElBQUFBLFFBQVEsQ0FBQ21FLFFBQVQsR0FBb0I5QixRQUFRLENBQUMrQixVQUFULENBQW9CLENBQXBCLENBQXBCO0FBRUEsUUFBSUMsT0FBTyxHQUFHLEtBQUtmLFVBQUwsRUFBZDs7QUFDQSxTQUFLLElBQUlnQixLQUFLLEdBQUcsQ0FBWixFQUFlZixNQUFNLEdBQUdjLE9BQU8sQ0FBQ2QsTUFBckMsRUFBNkNlLEtBQUssR0FBR2YsTUFBckQsRUFBNkRlLEtBQUssRUFBbEUsRUFBc0U7QUFDbEUsVUFBSTFCLE1BQU0sR0FBR3lCLE9BQU8sQ0FBQ0MsS0FBRCxDQUFwQjtBQUNBLFVBQUl2QixVQUFVLEdBQUdILE1BQU0sQ0FBQ0csVUFBeEI7QUFDQUgsTUFBQUEsTUFBTSxDQUFDSyxFQUFQLENBQVVzQixNQUFWLEdBQW1CM0IsTUFBTSxDQUFDQyxXQUExQjs7QUFDQTdDLE1BQUFBLFFBQVEsQ0FBQ3dFLFFBQVQsQ0FBa0I1QixNQUFNLENBQUNLLEVBQXpCOztBQUNBRixNQUFBQSxVQUFVLENBQUMwQixVQUFYO0FBQ0g7QUFDSjs7U0FFREMsWUFBQSxtQkFBV3JDLFFBQVgsRUFBcUJzQyxNQUFyQixFQUE2QjtBQUN6QixRQUFJTixPQUFPLEdBQUcsS0FBS2YsVUFBTCxFQUFkO0FBQ0EsUUFBSVYsTUFBTSxHQUFHeUIsT0FBTyxDQUFDLEtBQUs3QixhQUFOLENBQXBCO0FBQ0EsUUFBSU8sVUFBVSxHQUFHSCxNQUFNLENBQUNHLFVBQXhCO0FBRUEsUUFBSTZCLGFBQWEsR0FBR2hDLE1BQU0sQ0FBQ0UsV0FBUCxHQUFxQjZCLE1BQXpDOztBQUNBLFFBQUlDLGFBQWEsR0FBR3RFLFVBQWhCLElBQ0FzRSxhQUFhLEdBQUcsQ0FBaEIsR0FBb0JyRSxVQUR4QixFQUNvQztBQUNoQyxRQUFFLEtBQUtpQyxhQUFQO0FBQ0FvQyxNQUFBQSxhQUFhLEdBQUdELE1BQWhCOztBQUVBLFVBQUksS0FBS25DLGFBQUwsR0FBcUI2QixPQUFPLENBQUNkLE1BQWpDLEVBQXlDO0FBQ3JDWCxRQUFBQSxNQUFNLEdBQUd5QixPQUFPLENBQUMsS0FBSzdCLGFBQU4sQ0FBaEI7QUFDSCxPQUZELE1BR0s7QUFDREksUUFBQUEsTUFBTSxHQUFHLEtBQUtELGFBQUwsQ0FBbUJOLFFBQW5CLENBQVQ7QUFDQWdDLFFBQUFBLE9BQU8sQ0FBQyxLQUFLN0IsYUFBTixDQUFQLEdBQThCSSxNQUE5QjtBQUNIOztBQUVERyxNQUFBQSxVQUFVLEdBQUdILE1BQU0sQ0FBQ0csVUFBcEI7QUFDSDs7QUFFRCxRQUFJNkIsYUFBYSxHQUFHN0IsVUFBVSxDQUFDOEIsWUFBL0IsRUFBNkM7QUFDekM5QixNQUFBQSxVQUFVLENBQUMrQixhQUFYLENBQXlCSCxNQUF6QixFQUFpQ0EsTUFBTSxHQUFDLENBQXhDO0FBQ0g7O0FBRUQsU0FBS3JDLE9BQUwsR0FBZU0sTUFBZjtBQUNBLFdBQU9BLE1BQVA7QUFDSDs7U0FFRG1DLFNBQUEsZ0JBQVExQyxRQUFSLEVBQWtCO0FBQ2QsU0FBSzJDLFNBQUwsR0FBaUIzQyxRQUFRLENBQUM0QyxZQUFULENBQXNCQyxJQUF2Qzs7QUFFQSxTQUFLQyxhQUFMLENBQW1COUMsUUFBUSxDQUFDK0MsS0FBNUI7O0FBQ0EsU0FBS0MsYUFBTCxDQUFtQmhELFFBQW5COztBQUVBQSxJQUFBQSxRQUFRLENBQUMrQyxLQUFULENBQWVFLGlCQUFmLEdBQW1DLElBQW5DO0FBQ0g7O1NBRURDLE9BQUEsY0FBTWxELFFBQU4sRUFBZ0I7QUFDWixTQUFLMkMsU0FBTCxHQUFpQjNDLFFBQVEsQ0FBQ21ELFVBQVQsQ0FBb0JOLElBQXJDOztBQUVBLFNBQUtPLFdBQUwsQ0FBaUJwRCxRQUFqQjs7QUFDQUEsSUFBQUEsUUFBUSxDQUFDK0MsS0FBVCxDQUFlRSxpQkFBZixHQUFtQyxJQUFuQztBQUNIOztTQUVERCxnQkFBQSx1QkFBZWhELFFBQWYsRUFBeUI7QUFDckIsUUFBSXFELENBQUMsR0FBR3JELFFBQVEsQ0FBQ3NELFNBQVQsR0FBcUIsR0FBN0I7QUFBQSxRQUNJQyxPQUFPLEdBQUd2RCxRQUFRLENBQUN1RCxPQUR2QjtBQUFBLFFBRUlDLFFBQVEsR0FBR3hELFFBQVEsQ0FBQ3dELFFBRnhCO0FBQUEsUUFHSUMsVUFBVSxHQUFHekQsUUFBUSxDQUFDeUQsVUFIMUI7QUFLQSxRQUFJQyxJQUFJLEdBQUcxRCxRQUFRLENBQUMrQyxLQUFwQjtBQUVBLFFBQUlZLElBQUksR0FBRy9FLFNBQVMsQ0FBQ3lFLENBQUQsRUFBSWxGLEVBQUosRUFBUXVGLElBQUksQ0FBQ0UsUUFBYixDQUFwQjs7QUFFQSxTQUFLQyxlQUFMLENBQXFCSCxJQUFyQixFQUEyQkwsQ0FBM0IsRUFBOEJHLFFBQTlCLEVBQXdDQyxVQUF4Qzs7QUFFQSxRQUFJSyxLQUFLLEdBQUdKLElBQUksQ0FBQ0ssTUFBakIsQ0FacUIsQ0FjckI7O0FBQ0EsUUFBSXpCLE1BQU0sR0FBRyxDQUFiOztBQUNBLFNBQUssSUFBSWhCLENBQUMsR0FBR29DLElBQUksQ0FBQ00sV0FBYixFQUEwQnpDLENBQUMsR0FBR21DLElBQUksQ0FBQ08sV0FBeEMsRUFBcUQzQyxDQUFDLEdBQUdDLENBQXpELEVBQTRERCxDQUFDLEVBQTdELEVBQWlFO0FBQzdELFVBQUk0QyxJQUFJLEdBQUdKLEtBQUssQ0FBQ3hDLENBQUQsQ0FBaEI7QUFDQSxVQUFJNkMsWUFBWSxHQUFHRCxJQUFJLENBQUNFLE1BQUwsQ0FBWWxELE1BQS9CO0FBRUEsVUFBSXNDLFFBQVEsS0FBSzFGLFFBQVEsQ0FBQ3VHLEtBQTFCLEVBQWlDL0IsTUFBTSxJQUFJLENBQUM2QixZQUFZLEdBQUdELElBQUksQ0FBQ0ksTUFBTCxJQUFlWCxJQUFJLEdBQUcsQ0FBdEIsQ0FBZixHQUEwQyxDQUEzQyxJQUFnRCxDQUExRCxDQUFqQyxDQUE4RjtBQUE5RixXQUNLckIsTUFBTSxJQUFJLENBQUM2QixZQUFZLEdBQUdELElBQUksQ0FBQ0ksTUFBTCxHQUFjLENBQTdCLEdBQWlDLENBQWxDLElBQXVDLENBQWpELENBTHdELENBS0o7O0FBRXpELFVBQUksQ0FBQ0osSUFBSSxDQUFDSyxNQUFWLEVBQWtCO0FBQ2Q7QUFDQSxZQUFJaEIsT0FBTyxLQUFLeEYsT0FBTyxDQUFDc0csS0FBeEIsRUFBK0I7QUFDM0IvQixVQUFBQSxNQUFNLElBQUksQ0FBQ3FCLElBQUksR0FBRyxDQUFQLEdBQVcsQ0FBWixJQUFpQixDQUEzQjtBQUNILFNBRkQsTUFFTztBQUNIckIsVUFBQUEsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFMLElBQVUsQ0FBcEI7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsUUFBSS9CLE1BQU0sR0FBRyxLQUFLOEIsU0FBTCxDQUFlckMsUUFBZixFQUF5QnNDLE1BQXpCLENBQWI7QUFBQSxRQUNJNUIsVUFBVSxHQUFHSCxNQUFNLENBQUNHLFVBRHhCO0FBQUEsUUFFSThELEtBQUssR0FBRzlELFVBQVUsQ0FBQytELE1BRnZCO0FBQUEsUUFHSUMsS0FBSyxHQUFHaEUsVUFBVSxDQUFDaUUsTUFIdkI7O0FBS0EsU0FBSyxJQUFJckQsR0FBQyxHQUFHb0MsSUFBSSxDQUFDTSxXQUFiLEVBQTBCekMsR0FBQyxHQUFHbUMsSUFBSSxDQUFDTyxXQUF4QyxFQUFxRDNDLEdBQUMsR0FBR0MsR0FBekQsRUFBNERELEdBQUMsRUFBN0QsRUFBaUU7QUFDN0QsVUFBSTRDLEtBQUksR0FBR0osS0FBSyxDQUFDeEMsR0FBRCxDQUFoQjtBQUNBLFVBQUlzRCxHQUFHLEdBQUdWLEtBQUksQ0FBQ0UsTUFBZjtBQUNBLFVBQUlELGFBQVksR0FBR1MsR0FBRyxDQUFDMUQsTUFBdkI7QUFDQSxVQUFJMkQsTUFBTSxHQUFHdEUsTUFBTSxDQUFDRSxXQUFwQjtBQUVBLFVBQUlxRSxFQUFFLFNBQU47QUFBQSxVQUFRQyxFQUFFLFNBQVY7QUFDQSxVQUFJQyxLQUFLLFNBQVQ7QUFBQSxVQUFXQyxHQUFHLFNBQWQ7QUFBQSxVQUFnQkMsSUFBSSxTQUFwQjtBQUNBQSxNQUFBQSxJQUFJLEdBQUdoQixLQUFJLENBQUNLLE1BQVo7O0FBQ0EsVUFBSVcsSUFBSixFQUFVO0FBQ047QUFDQUosUUFBQUEsRUFBRSxHQUFHRixHQUFHLENBQUNULGFBQVksR0FBRyxDQUFoQixDQUFSO0FBQ0FZLFFBQUFBLEVBQUUsR0FBR0gsR0FBRyxDQUFDLENBQUQsQ0FBUjtBQUNBSSxRQUFBQSxLQUFLLEdBQUcsQ0FBUjtBQUNBQyxRQUFBQSxHQUFHLEdBQUdkLGFBQU47QUFDSCxPQU5ELE1BTU87QUFDSDtBQUNBVyxRQUFBQSxFQUFFLEdBQUdGLEdBQUcsQ0FBQyxDQUFELENBQVI7QUFDQUcsUUFBQUEsRUFBRSxHQUFHSCxHQUFHLENBQUMsQ0FBRCxDQUFSO0FBQ0FJLFFBQUFBLEtBQUssR0FBRyxDQUFSO0FBQ0FDLFFBQUFBLEdBQUcsR0FBR2QsYUFBWSxHQUFHLENBQXJCO0FBQ0g7O0FBRURZLE1BQUFBLEVBQUUsR0FBR0EsRUFBRSxJQUFJRCxFQUFYOztBQUVBLFVBQUksQ0FBQ0ksSUFBTCxFQUFXO0FBQ1A7QUFDQSxZQUFJQyxJQUFJLEdBQUdKLEVBQUUsQ0FBQ0ssR0FBSCxDQUFPTixFQUFQLENBQVg7QUFDQUssUUFBQUEsSUFBSSxDQUFDRSxhQUFMO0FBRUEsWUFBSUMsRUFBRSxHQUFHSCxJQUFJLENBQUNJLENBQWQ7QUFDQSxZQUFJQyxFQUFFLEdBQUdMLElBQUksQ0FBQ00sQ0FBZDtBQUVBLFlBQUlsQyxPQUFPLEtBQUt4RixPQUFPLENBQUMySCxJQUF4QixFQUNJLEtBQUtDLGFBQUwsQ0FBbUJiLEVBQW5CLEVBQXVCUSxFQUF2QixFQUEyQkUsRUFBM0IsRUFBK0JuQyxDQUEvQixFQUFrQyxDQUFsQyxFQURKLEtBRUssSUFBSUUsT0FBTyxLQUFLeEYsT0FBTyxDQUFDNkgsTUFBeEIsRUFDRCxLQUFLRCxhQUFMLENBQW1CYixFQUFuQixFQUF1QlEsRUFBdkIsRUFBMkJFLEVBQTNCLEVBQStCbkMsQ0FBL0IsRUFBa0NBLENBQWxDLEVBREMsS0FFQSxJQUFJRSxPQUFPLEtBQUt4RixPQUFPLENBQUNzRyxLQUF4QixFQUNELEtBQUt3QixjQUFMLENBQW9CZixFQUFwQixFQUF3QlEsRUFBeEIsRUFBNEJFLEVBQTVCLEVBQWdDbkMsQ0FBaEMsRUFBbUNNLElBQW5DO0FBQ1A7O0FBRUQsV0FBSyxJQUFJbUMsQ0FBQyxHQUFHZCxLQUFiLEVBQW9CYyxDQUFDLEdBQUdiLEdBQXhCLEVBQTZCLEVBQUVhLENBQS9CLEVBQWtDO0FBQzlCLFlBQUl0QyxRQUFRLEtBQUsxRixRQUFRLENBQUN1RyxLQUExQixFQUFpQztBQUM3QixlQUFLMEIsVUFBTCxDQUFnQmpCLEVBQWhCLEVBQW9CQyxFQUFwQixFQUF3QjFCLENBQXhCLEVBQTJCQSxDQUEzQixFQUE4Qk0sSUFBOUI7QUFDSCxTQUZELE1BR0ssSUFBSSxDQUFDb0IsRUFBRSxDQUFDaUIsS0FBSCxJQUFZbkksVUFBVSxDQUFDb0ksUUFBWCxHQUFzQnBJLFVBQVUsQ0FBQ3FJLGFBQTdDLENBQUQsTUFBa0UsQ0FBdEUsRUFBeUU7QUFDMUUsZUFBS0MsVUFBTCxDQUFnQnJCLEVBQWhCLEVBQW9CQyxFQUFwQixFQUF3QjFCLENBQXhCLEVBQTJCQSxDQUEzQjtBQUNILFNBRkksTUFHQTtBQUNELGVBQUsrQyxLQUFMLENBQVdyQixFQUFFLENBQUNRLENBQUgsR0FBT1IsRUFBRSxDQUFDc0IsR0FBSCxHQUFTaEQsQ0FBM0IsRUFBOEIwQixFQUFFLENBQUNVLENBQUgsR0FBT1YsRUFBRSxDQUFDdUIsR0FBSCxHQUFTakQsQ0FBOUMsRUFBaUQsQ0FBakQ7O0FBQ0EsZUFBSytDLEtBQUwsQ0FBV3JCLEVBQUUsQ0FBQ1EsQ0FBSCxHQUFPUixFQUFFLENBQUNzQixHQUFILEdBQVNoRCxDQUEzQixFQUE4QjBCLEVBQUUsQ0FBQ1UsQ0FBSCxHQUFPVixFQUFFLENBQUN1QixHQUFILEdBQVNqRCxDQUE5QyxFQUFpRCxDQUFDLENBQWxEO0FBQ0g7O0FBRUR5QixRQUFBQSxFQUFFLEdBQUdDLEVBQUw7QUFDQUEsUUFBQUEsRUFBRSxHQUFHSCxHQUFHLENBQUNrQixDQUFDLEdBQUcsQ0FBTCxDQUFSO0FBQ0g7O0FBRUQsVUFBSVosSUFBSixFQUFVO0FBQ047QUFDQSxZQUFJcUIsVUFBVSxHQUFHLEtBQUtsRyxpQkFBTCxFQUFqQjtBQUNBLFlBQUltRyxXQUFXLEdBQUczQixNQUFNLEdBQUcwQixVQUEzQjs7QUFDQSxhQUFLSCxLQUFMLENBQVc1QixLQUFLLENBQUNnQyxXQUFELENBQWhCLEVBQWlDaEMsS0FBSyxDQUFDZ0MsV0FBVyxHQUFDLENBQWIsQ0FBdEMsRUFBdUQsQ0FBdkQ7O0FBQ0EsYUFBS0osS0FBTCxDQUFXNUIsS0FBSyxDQUFDZ0MsV0FBVyxHQUFDRCxVQUFiLENBQWhCLEVBQTBDL0IsS0FBSyxDQUFDZ0MsV0FBVyxHQUFDRCxVQUFaLEdBQXVCLENBQXhCLENBQS9DLEVBQTJFLENBQUMsQ0FBNUU7QUFDSCxPQU5ELE1BTU87QUFDSDtBQUNBLFlBQUlwQixLQUFJLEdBQUdKLEVBQUUsQ0FBQ0ssR0FBSCxDQUFPTixFQUFQLENBQVg7O0FBQ0FLLFFBQUFBLEtBQUksQ0FBQ0UsYUFBTDs7QUFFQSxZQUFJQyxHQUFFLEdBQUdILEtBQUksQ0FBQ0ksQ0FBZDtBQUNBLFlBQUlDLEdBQUUsR0FBR0wsS0FBSSxDQUFDTSxDQUFkO0FBRUEsWUFBSWxDLE9BQU8sS0FBS3hGLE9BQU8sQ0FBQzJILElBQXhCLEVBQ0ksS0FBS2UsV0FBTCxDQUFpQjFCLEVBQWpCLEVBQXFCTyxHQUFyQixFQUF5QkUsR0FBekIsRUFBNkJuQyxDQUE3QixFQUFnQyxDQUFoQyxFQURKLEtBRUssSUFBSUUsT0FBTyxLQUFLeEYsT0FBTyxDQUFDNkgsTUFBeEIsRUFDRCxLQUFLYSxXQUFMLENBQWlCMUIsRUFBakIsRUFBcUJPLEdBQXJCLEVBQXlCRSxHQUF6QixFQUE2Qm5DLENBQTdCLEVBQWdDQSxDQUFoQyxFQURDLEtBRUEsSUFBSUUsT0FBTyxLQUFLeEYsT0FBTyxDQUFDc0csS0FBeEIsRUFDRCxLQUFLcUMsWUFBTCxDQUFrQjNCLEVBQWxCLEVBQXNCTyxHQUF0QixFQUEwQkUsR0FBMUIsRUFBOEJuQyxDQUE5QixFQUFpQ00sSUFBakM7QUFDUCxPQTdFNEQsQ0ErRTdEOzs7QUFDQSxVQUFJZ0QsYUFBYSxHQUFHcEcsTUFBTSxDQUFDQyxXQUEzQjs7QUFDQSxXQUFLLElBQUl3RSxNQUFLLEdBQUdILE1BQU0sR0FBQyxDQUFuQixFQUFzQkksSUFBRyxHQUFHMUUsTUFBTSxDQUFDRSxXQUF4QyxFQUFxRHVFLE1BQUssR0FBR0MsSUFBN0QsRUFBa0VELE1BQUssRUFBdkUsRUFBMkU7QUFDdkVOLFFBQUFBLEtBQUssQ0FBQ2lDLGFBQWEsRUFBZCxDQUFMLEdBQXlCM0IsTUFBSyxHQUFHLENBQWpDO0FBQ0FOLFFBQUFBLEtBQUssQ0FBQ2lDLGFBQWEsRUFBZCxDQUFMLEdBQXlCM0IsTUFBSyxHQUFHLENBQWpDO0FBQ0FOLFFBQUFBLEtBQUssQ0FBQ2lDLGFBQWEsRUFBZCxDQUFMLEdBQXlCM0IsTUFBekI7QUFDSDs7QUFFRHpFLE1BQUFBLE1BQU0sQ0FBQ0MsV0FBUCxHQUFxQm1HLGFBQXJCO0FBQ0g7QUFDSjs7U0FFRHZELGNBQUEscUJBQWFwRCxRQUFiLEVBQXVCO0FBQ25CLFFBQUkwRCxJQUFJLEdBQUcxRCxRQUFRLENBQUMrQyxLQUFwQjtBQUVBLFFBQUllLEtBQUssR0FBR0osSUFBSSxDQUFDSyxNQUFqQixDQUhtQixDQUtuQjs7QUFDQSxRQUFJekIsTUFBTSxHQUFHLENBQWI7O0FBQ0EsU0FBSyxJQUFJaEIsQ0FBQyxHQUFHb0MsSUFBSSxDQUFDTSxXQUFiLEVBQTBCekMsQ0FBQyxHQUFHbUMsSUFBSSxDQUFDTyxXQUF4QyxFQUFxRDNDLENBQUMsR0FBR0MsQ0FBekQsRUFBNERELENBQUMsRUFBN0QsRUFBaUU7QUFDN0QsVUFBSTRDLElBQUksR0FBR0osS0FBSyxDQUFDeEMsQ0FBRCxDQUFoQjtBQUNBLFVBQUk2QyxZQUFZLEdBQUdELElBQUksQ0FBQ0UsTUFBTCxDQUFZbEQsTUFBL0I7QUFFQW9CLE1BQUFBLE1BQU0sSUFBSTZCLFlBQVY7QUFDSDs7QUFFRCxRQUFJNUQsTUFBTSxHQUFHLEtBQUs4QixTQUFMLENBQWVyQyxRQUFmLEVBQXlCc0MsTUFBekIsQ0FBYjtBQUFBLFFBQ0k1QixVQUFVLEdBQUdILE1BQU0sQ0FBQ0csVUFEeEI7QUFBQSxRQUVJOEQsS0FBSyxHQUFHOUQsVUFBVSxDQUFDK0QsTUFGdkI7QUFBQSxRQUdJQyxLQUFLLEdBQUdoRSxVQUFVLENBQUNpRSxNQUh2Qjs7QUFLQSxTQUFLLElBQUlyRCxHQUFDLEdBQUdvQyxJQUFJLENBQUNNLFdBQWIsRUFBMEJ6QyxHQUFDLEdBQUdtQyxJQUFJLENBQUNPLFdBQXhDLEVBQXFEM0MsR0FBQyxHQUFHQyxHQUF6RCxFQUE0REQsR0FBQyxFQUE3RCxFQUFpRTtBQUM3RCxVQUFJNEMsTUFBSSxHQUFHSixLQUFLLENBQUN4QyxHQUFELENBQWhCO0FBQ0EsVUFBSXNELEdBQUcsR0FBR1YsTUFBSSxDQUFDRSxNQUFmO0FBQ0EsVUFBSUQsY0FBWSxHQUFHUyxHQUFHLENBQUMxRCxNQUF2Qjs7QUFFQSxVQUFJaUQsY0FBWSxLQUFLLENBQXJCLEVBQXdCO0FBQ3BCO0FBQ0gsT0FQNEQsQ0FTN0Q7OztBQUNBLFVBQUlVLE1BQU0sR0FBR3RFLE1BQU0sQ0FBQ0UsV0FBcEI7O0FBRUEsV0FBSyxJQUFJcUYsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzNCLGNBQXBCLEVBQWtDLEVBQUUyQixDQUFwQyxFQUF1QztBQUNuQyxhQUFLTSxLQUFMLENBQVd4QixHQUFHLENBQUNrQixDQUFELENBQUgsQ0FBT1AsQ0FBbEIsRUFBcUJYLEdBQUcsQ0FBQ2tCLENBQUQsQ0FBSCxDQUFPTCxDQUE1QjtBQUNIOztBQUVELFVBQUlrQixhQUFhLEdBQUdwRyxNQUFNLENBQUNDLFdBQTNCOztBQUVBLFVBQUkwRCxNQUFJLENBQUMwQyxPQUFULEVBQWtCO0FBQ2QsWUFBSUMsVUFBVSxHQUFHLEVBQWpCO0FBQ0EsWUFBSU4sVUFBVSxHQUFHLEtBQUtsRyxpQkFBTCxFQUFqQjs7QUFDQSxhQUFLLElBQUl5RixFQUFDLEdBQUdqQixNQUFSLEVBQWdCSSxHQUFHLEdBQUcxRSxNQUFNLENBQUNFLFdBQWxDLEVBQStDcUYsRUFBQyxHQUFHYixHQUFuRCxFQUF3RGEsRUFBQyxFQUF6RCxFQUE2RDtBQUN6RCxjQUFJZ0IsV0FBVyxHQUFHaEIsRUFBQyxHQUFHUyxVQUF0QjtBQUNBTSxVQUFBQSxVQUFVLENBQUM3RixJQUFYLENBQWdCd0QsS0FBSyxDQUFDc0MsV0FBRCxDQUFyQjtBQUNBRCxVQUFBQSxVQUFVLENBQUM3RixJQUFYLENBQWdCd0QsS0FBSyxDQUFDc0MsV0FBVyxHQUFDLENBQWIsQ0FBckI7QUFDSDs7QUFFRCxZQUFJQyxVQUFVLEdBQUcvSSxNQUFNLENBQUM2SSxVQUFELEVBQWEsSUFBYixFQUFtQixDQUFuQixDQUF2Qjs7QUFFQSxZQUFJLENBQUNFLFVBQUQsSUFBZUEsVUFBVSxDQUFDN0YsTUFBWCxLQUFzQixDQUF6QyxFQUE0QztBQUN4QztBQUNIOztBQUVELGFBQUssSUFBSTRFLEdBQUMsR0FBRyxDQUFSLEVBQVdrQixRQUFRLEdBQUdELFVBQVUsQ0FBQzdGLE1BQXRDLEVBQThDNEUsR0FBQyxHQUFHa0IsUUFBbEQsRUFBNERsQixHQUFDLEVBQTdELEVBQWlFO0FBQzdEcEIsVUFBQUEsS0FBSyxDQUFDaUMsYUFBYSxFQUFkLENBQUwsR0FBeUJJLFVBQVUsQ0FBQ2pCLEdBQUQsQ0FBVixHQUFnQmpCLE1BQXpDO0FBQ0g7QUFDSixPQWxCRCxNQW1CSztBQUNELFlBQUlvQyxLQUFLLEdBQUdwQyxNQUFaOztBQUNBLGFBQUssSUFBSUcsS0FBSyxHQUFHSCxNQUFNLEdBQUMsQ0FBbkIsRUFBc0JJLEtBQUcsR0FBRzFFLE1BQU0sQ0FBQ0UsV0FBeEMsRUFBcUR1RSxLQUFLLEdBQUdDLEtBQTdELEVBQWtFRCxLQUFLLEVBQXZFLEVBQTJFO0FBQ3ZFTixVQUFBQSxLQUFLLENBQUNpQyxhQUFhLEVBQWQsQ0FBTCxHQUF5Qk0sS0FBekI7QUFDQXZDLFVBQUFBLEtBQUssQ0FBQ2lDLGFBQWEsRUFBZCxDQUFMLEdBQXlCM0IsS0FBSyxHQUFHLENBQWpDO0FBQ0FOLFVBQUFBLEtBQUssQ0FBQ2lDLGFBQWEsRUFBZCxDQUFMLEdBQXlCM0IsS0FBekI7QUFDSDtBQUNKOztBQUVEekUsTUFBQUEsTUFBTSxDQUFDQyxXQUFQLEdBQXFCbUcsYUFBckI7QUFDSDtBQUNKOztTQUVEOUMsa0JBQUEseUJBQWlCSCxJQUFqQixFQUF1QkwsQ0FBdkIsRUFBMEJHLFFBQTFCLEVBQW9DQyxVQUFwQyxFQUFnRDtBQUM1QyxRQUFJeUQsRUFBRSxHQUFHLEdBQVQ7O0FBRUEsUUFBSTdELENBQUMsR0FBRyxHQUFSLEVBQWE7QUFDVDZELE1BQUFBLEVBQUUsR0FBRyxJQUFJN0QsQ0FBVDtBQUNILEtBTDJDLENBTzVDOzs7QUFDQSxRQUFJUyxLQUFLLEdBQUdKLElBQUksQ0FBQ0ssTUFBakI7O0FBQ0EsU0FBSyxJQUFJekMsQ0FBQyxHQUFHb0MsSUFBSSxDQUFDTSxXQUFiLEVBQTBCekMsQ0FBQyxHQUFHbUMsSUFBSSxDQUFDTyxXQUF4QyxFQUFxRDNDLENBQUMsR0FBR0MsQ0FBekQsRUFBNERELENBQUMsRUFBN0QsRUFBaUU7QUFDN0QsVUFBSTRDLElBQUksR0FBR0osS0FBSyxDQUFDeEMsQ0FBRCxDQUFoQjtBQUVBLFVBQUlzRCxHQUFHLEdBQUdWLElBQUksQ0FBQ0UsTUFBZjtBQUNBLFVBQUkrQyxTQUFTLEdBQUd2QyxHQUFHLENBQUMxRCxNQUFwQjtBQUNBLFVBQUk0RCxFQUFFLEdBQUdGLEdBQUcsQ0FBQ3VDLFNBQVMsR0FBRyxDQUFiLENBQVo7QUFDQSxVQUFJcEMsRUFBRSxHQUFHSCxHQUFHLENBQUMsQ0FBRCxDQUFaO0FBQ0EsVUFBSXdDLEtBQUssR0FBRyxDQUFaO0FBRUFsRCxNQUFBQSxJQUFJLENBQUNJLE1BQUwsR0FBYyxDQUFkOztBQUVBLFdBQUssSUFBSXdCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdxQixTQUFwQixFQUErQnJCLENBQUMsRUFBaEMsRUFBb0M7QUFDaEMsWUFBSXVCLElBQUksU0FBUjtBQUFBLFlBQVVDLEtBQUssU0FBZjtBQUFBLFlBQWlCQyxLQUFLLFNBQXRCLENBRGdDLENBR2hDOztBQUNBLFlBQUlDLElBQUksR0FBRzFDLEVBQUUsQ0FBQ1UsRUFBZDtBQUNBLFlBQUlpQyxJQUFJLEdBQUcsQ0FBQzNDLEVBQUUsQ0FBQ1EsRUFBZjtBQUNBLFlBQUlvQyxJQUFJLEdBQUczQyxFQUFFLENBQUNTLEVBQWQ7QUFDQSxZQUFJbUMsSUFBSSxHQUFHLENBQUM1QyxFQUFFLENBQUNPLEVBQWYsQ0FQZ0MsQ0FTaEM7O0FBQ0FQLFFBQUFBLEVBQUUsQ0FBQ3NCLEdBQUgsR0FBUyxDQUFDbUIsSUFBSSxHQUFHRSxJQUFSLElBQWdCLEdBQXpCO0FBQ0EzQyxRQUFBQSxFQUFFLENBQUN1QixHQUFILEdBQVMsQ0FBQ21CLElBQUksR0FBR0UsSUFBUixJQUFnQixHQUF6QjtBQUNBTixRQUFBQSxJQUFJLEdBQUd0QyxFQUFFLENBQUNzQixHQUFILEdBQVN0QixFQUFFLENBQUNzQixHQUFaLEdBQWtCdEIsRUFBRSxDQUFDdUIsR0FBSCxHQUFTdkIsRUFBRSxDQUFDdUIsR0FBckM7O0FBQ0EsWUFBSWUsSUFBSSxHQUFHLFFBQVgsRUFBcUI7QUFDakIsY0FBSU8sS0FBSyxHQUFHLElBQUlQLElBQWhCOztBQUNBLGNBQUlPLEtBQUssR0FBRyxHQUFaLEVBQWlCO0FBQ2JBLFlBQUFBLEtBQUssR0FBRyxHQUFSO0FBQ0g7O0FBQ0Q3QyxVQUFBQSxFQUFFLENBQUNzQixHQUFILElBQVV1QixLQUFWO0FBQ0E3QyxVQUFBQSxFQUFFLENBQUN1QixHQUFILElBQVVzQixLQUFWO0FBQ0gsU0FwQitCLENBc0JoQzs7O0FBQ0FOLFFBQUFBLEtBQUssR0FBR3ZDLEVBQUUsQ0FBQ08sRUFBSCxHQUFRUixFQUFFLENBQUNVLEVBQVgsR0FBZ0JWLEVBQUUsQ0FBQ1EsRUFBSCxHQUFRUCxFQUFFLENBQUNTLEVBQW5DOztBQUNBLFlBQUk4QixLQUFLLEdBQUcsQ0FBWixFQUFlO0FBQ1hGLFVBQUFBLEtBQUs7QUFDTHJDLFVBQUFBLEVBQUUsQ0FBQ2lCLEtBQUgsSUFBWW5JLFVBQVUsQ0FBQ2dLLE9BQXZCO0FBQ0gsU0EzQitCLENBNkJoQzs7O0FBQ0FOLFFBQUFBLEtBQUssR0FBR2pKLEdBQUcsQ0FBQyxFQUFELEVBQUtELEdBQUcsQ0FBQ3lHLEVBQUUsQ0FBQ2dELEdBQUosRUFBUy9DLEVBQUUsQ0FBQytDLEdBQVosQ0FBSCxHQUFzQlosRUFBM0IsQ0FBWDs7QUFDQSxZQUFJRyxJQUFJLEdBQUdFLEtBQVAsR0FBZUEsS0FBZixHQUF1QixDQUEzQixFQUE4QjtBQUMxQnhDLFVBQUFBLEVBQUUsQ0FBQ2lCLEtBQUgsSUFBWW5JLFVBQVUsQ0FBQ3FJLGFBQXZCO0FBQ0gsU0FqQytCLENBbUNoQzs7O0FBQ0EsWUFBSW5CLEVBQUUsQ0FBQ2lCLEtBQUgsR0FBV25JLFVBQVUsQ0FBQ2tLLFNBQTFCLEVBQXFDO0FBQ2pDLGNBQUlWLElBQUksR0FBRzVELFVBQVAsR0FBb0JBLFVBQXBCLEdBQWlDLENBQWpDLElBQXNDRCxRQUFRLEtBQUsxRixRQUFRLENBQUNrSyxLQUE1RCxJQUFxRXhFLFFBQVEsS0FBSzFGLFFBQVEsQ0FBQ3VHLEtBQS9GLEVBQXNHO0FBQ2xHVSxZQUFBQSxFQUFFLENBQUNpQixLQUFILElBQVluSSxVQUFVLENBQUNvSSxRQUF2QjtBQUNIO0FBQ0o7O0FBRUQsWUFBSSxDQUFDbEIsRUFBRSxDQUFDaUIsS0FBSCxJQUFZbkksVUFBVSxDQUFDb0ksUUFBWCxHQUFzQnBJLFVBQVUsQ0FBQ3FJLGFBQTdDLENBQUQsTUFBa0UsQ0FBdEUsRUFBeUU7QUFDckVoQyxVQUFBQSxJQUFJLENBQUNJLE1BQUw7QUFDSDs7QUFFRFEsUUFBQUEsRUFBRSxHQUFHQyxFQUFMO0FBQ0FBLFFBQUFBLEVBQUUsR0FBR0gsR0FBRyxDQUFDa0IsQ0FBQyxHQUFHLENBQUwsQ0FBUjtBQUNIO0FBQ0o7QUFDSjs7U0FFRGhELGdCQUFBLHVCQUFlWSxJQUFmLEVBQXFCO0FBQ2pCLFFBQUlJLEtBQUssR0FBR0osSUFBSSxDQUFDSyxNQUFqQjs7QUFDQSxTQUFLLElBQUl6QyxDQUFDLEdBQUdvQyxJQUFJLENBQUNNLFdBQWIsRUFBMEJ6QyxDQUFDLEdBQUdtQyxJQUFJLENBQUNPLFdBQXhDLEVBQXFEM0MsQ0FBQyxHQUFHQyxDQUF6RCxFQUE0REQsQ0FBQyxFQUE3RCxFQUFpRTtBQUM3RCxVQUFJNEMsSUFBSSxHQUFHSixLQUFLLENBQUN4QyxDQUFELENBQWhCO0FBQ0EsVUFBSXNELEdBQUcsR0FBR1YsSUFBSSxDQUFDRSxNQUFmO0FBRUEsVUFBSVUsRUFBRSxHQUFHRixHQUFHLENBQUNBLEdBQUcsQ0FBQzFELE1BQUosR0FBYSxDQUFkLENBQVo7QUFDQSxVQUFJNkQsRUFBRSxHQUFHSCxHQUFHLENBQUMsQ0FBRCxDQUFaOztBQUVBLFVBQUlBLEdBQUcsQ0FBQzFELE1BQUosR0FBYSxDQUFiLElBQWtCNEQsRUFBRSxDQUFDbUQsTUFBSCxDQUFVbEQsRUFBVixDQUF0QixFQUFxQztBQUNqQ2IsUUFBQUEsSUFBSSxDQUFDSyxNQUFMLEdBQWMsSUFBZDtBQUNBSyxRQUFBQSxHQUFHLENBQUNzRCxHQUFKO0FBQ0FwRCxRQUFBQSxFQUFFLEdBQUdGLEdBQUcsQ0FBQ0EsR0FBRyxDQUFDMUQsTUFBSixHQUFhLENBQWQsQ0FBUjtBQUNIOztBQUVELFdBQUssSUFBSTRFLENBQUMsR0FBRyxDQUFSLEVBQVdxQyxJQUFJLEdBQUd2RCxHQUFHLENBQUMxRCxNQUEzQixFQUFtQzRFLENBQUMsR0FBR3FDLElBQXZDLEVBQTZDckMsQ0FBQyxFQUE5QyxFQUFrRDtBQUM5QztBQUNBLFlBQUlYLElBQUksR0FBR0osRUFBRSxDQUFDSyxHQUFILENBQU9OLEVBQVAsQ0FBWDtBQUNBQSxRQUFBQSxFQUFFLENBQUNnRCxHQUFILEdBQVMzQyxJQUFJLENBQUNpRCxHQUFMLEVBQVQ7QUFDQSxZQUFJakQsSUFBSSxDQUFDSSxDQUFMLElBQVVKLElBQUksQ0FBQ00sQ0FBbkIsRUFDSU4sSUFBSSxDQUFDRSxhQUFMO0FBQ0pQLFFBQUFBLEVBQUUsQ0FBQ1EsRUFBSCxHQUFRSCxJQUFJLENBQUNJLENBQWI7QUFDQVQsUUFBQUEsRUFBRSxDQUFDVSxFQUFILEdBQVFMLElBQUksQ0FBQ00sQ0FBYixDQVA4QyxDQVE5Qzs7QUFDQVgsUUFBQUEsRUFBRSxHQUFHQyxFQUFMO0FBQ0FBLFFBQUFBLEVBQUUsR0FBR0gsR0FBRyxDQUFDa0IsQ0FBQyxHQUFHLENBQUwsQ0FBUjtBQUNIO0FBQ0o7QUFDSjs7U0FFRHVDLGVBQUEsc0JBQWNDLEtBQWQsRUFBcUJ4RCxFQUFyQixFQUF5QkMsRUFBekIsRUFBNkIxQixDQUE3QixFQUFnQztBQUM1QixRQUFJa0MsQ0FBQyxHQUFHUixFQUFFLENBQUNRLENBQVg7QUFDQSxRQUFJRSxDQUFDLEdBQUdWLEVBQUUsQ0FBQ1UsQ0FBWDtBQUNBLFFBQUk4QyxFQUFKLEVBQVFDLEVBQVIsRUFBWUMsRUFBWixFQUFnQkMsRUFBaEI7O0FBRUEsUUFBSUosS0FBSyxLQUFLLENBQWQsRUFBaUI7QUFDYkMsTUFBQUEsRUFBRSxHQUFHaEQsQ0FBQyxHQUFHVCxFQUFFLENBQUNVLEVBQUgsR0FBUW5DLENBQWpCO0FBQ0FtRixNQUFBQSxFQUFFLEdBQUcvQyxDQUFDLEdBQUdYLEVBQUUsQ0FBQ1EsRUFBSCxHQUFRakMsQ0FBakI7QUFDQW9GLE1BQUFBLEVBQUUsR0FBR2xELENBQUMsR0FBR1IsRUFBRSxDQUFDUyxFQUFILEdBQVFuQyxDQUFqQjtBQUNBcUYsTUFBQUEsRUFBRSxHQUFHakQsQ0FBQyxHQUFHVixFQUFFLENBQUNPLEVBQUgsR0FBUWpDLENBQWpCO0FBQ0gsS0FMRCxNQUtPO0FBQ0hrRixNQUFBQSxFQUFFLEdBQUdFLEVBQUUsR0FBR2xELENBQUMsR0FBR1IsRUFBRSxDQUFDc0IsR0FBSCxHQUFTaEQsQ0FBdkI7QUFDQW1GLE1BQUFBLEVBQUUsR0FBR0UsRUFBRSxHQUFHakQsQ0FBQyxHQUFHVixFQUFFLENBQUN1QixHQUFILEdBQVNqRCxDQUF2QjtBQUNIOztBQUVELFdBQU8sQ0FBQ2tGLEVBQUQsRUFBS0MsRUFBTCxFQUFTQyxFQUFULEVBQWFDLEVBQWIsQ0FBUDtBQUNIOztTQUVEL0MsZ0JBQUEsdUJBQWVnRCxDQUFmLEVBQWtCckQsRUFBbEIsRUFBc0JFLEVBQXRCLEVBQTBCbkMsQ0FBMUIsRUFBNkJ1RixDQUE3QixFQUFnQztBQUM1QixRQUFJQyxFQUFFLEdBQUdGLENBQUMsQ0FBQ3BELENBQUYsR0FBTUQsRUFBRSxHQUFHc0QsQ0FBcEI7QUFDQSxRQUFJRSxFQUFFLEdBQUdILENBQUMsQ0FBQ2xELENBQUYsR0FBTUQsRUFBRSxHQUFHb0QsQ0FBcEI7QUFDQSxRQUFJRyxHQUFHLEdBQUd2RCxFQUFWO0FBQ0EsUUFBSXdELEdBQUcsR0FBRyxDQUFDMUQsRUFBWDs7QUFFQSxTQUFLYyxLQUFMLENBQVd5QyxFQUFFLEdBQUdFLEdBQUcsR0FBRzFGLENBQXRCLEVBQXlCeUYsRUFBRSxHQUFHRSxHQUFHLEdBQUczRixDQUFwQyxFQUF1QyxDQUF2Qzs7QUFDQSxTQUFLK0MsS0FBTCxDQUFXeUMsRUFBRSxHQUFHRSxHQUFHLEdBQUcxRixDQUF0QixFQUF5QnlGLEVBQUUsR0FBR0UsR0FBRyxHQUFHM0YsQ0FBcEMsRUFBdUMsQ0FBQyxDQUF4QztBQUNIOztTQUVEb0QsY0FBQSxxQkFBYWtDLENBQWIsRUFBZ0JyRCxFQUFoQixFQUFvQkUsRUFBcEIsRUFBd0JuQyxDQUF4QixFQUEyQnVGLENBQTNCLEVBQThCO0FBQzFCLFFBQUlDLEVBQUUsR0FBR0YsQ0FBQyxDQUFDcEQsQ0FBRixHQUFNRCxFQUFFLEdBQUdzRCxDQUFwQjtBQUNBLFFBQUlFLEVBQUUsR0FBR0gsQ0FBQyxDQUFDbEQsQ0FBRixHQUFNRCxFQUFFLEdBQUdvRCxDQUFwQjtBQUNBLFFBQUlHLEdBQUcsR0FBR3ZELEVBQVY7QUFDQSxRQUFJd0QsR0FBRyxHQUFHLENBQUMxRCxFQUFYOztBQUVBLFNBQUtjLEtBQUwsQ0FBV3lDLEVBQUUsR0FBR0UsR0FBRyxHQUFHMUYsQ0FBdEIsRUFBeUJ5RixFQUFFLEdBQUdFLEdBQUcsR0FBRzNGLENBQXBDLEVBQXVDLENBQXZDOztBQUNBLFNBQUsrQyxLQUFMLENBQVd5QyxFQUFFLEdBQUdFLEdBQUcsR0FBRzFGLENBQXRCLEVBQXlCeUYsRUFBRSxHQUFHRSxHQUFHLEdBQUczRixDQUFwQyxFQUF1QyxDQUFDLENBQXhDO0FBQ0g7O1NBRUR3QyxpQkFBQSx3QkFBZ0I4QyxDQUFoQixFQUFtQnJELEVBQW5CLEVBQXVCRSxFQUF2QixFQUEyQm5DLENBQTNCLEVBQThCTSxJQUE5QixFQUFvQztBQUNoQyxRQUFJa0YsRUFBRSxHQUFHRixDQUFDLENBQUNwRCxDQUFYO0FBQ0EsUUFBSXVELEVBQUUsR0FBR0gsQ0FBQyxDQUFDbEQsQ0FBWDtBQUNBLFFBQUlzRCxHQUFHLEdBQUd2RCxFQUFWO0FBQ0EsUUFBSXdELEdBQUcsR0FBRyxDQUFDMUQsRUFBWDs7QUFFQSxTQUFLLElBQUloRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHcUMsSUFBcEIsRUFBMEJyQyxDQUFDLEVBQTNCLEVBQStCO0FBQzNCLFVBQUkySCxDQUFDLEdBQUczSCxDQUFDLElBQUlxQyxJQUFJLEdBQUcsQ0FBWCxDQUFELEdBQWlCeEYsRUFBekI7QUFDQSxVQUFJK0ssRUFBRSxHQUFHekssR0FBRyxDQUFDd0ssQ0FBRCxDQUFILEdBQVM1RixDQUFsQjtBQUFBLFVBQ0k4RixFQUFFLEdBQUd6SyxHQUFHLENBQUN1SyxDQUFELENBQUgsR0FBUzVGLENBRGxCOztBQUVBLFdBQUsrQyxLQUFMLENBQVd5QyxFQUFFLEdBQUdFLEdBQUcsR0FBR0csRUFBWCxHQUFnQjVELEVBQUUsR0FBRzZELEVBQWhDLEVBQW9DTCxFQUFFLEdBQUdFLEdBQUcsR0FBR0UsRUFBWCxHQUFnQjFELEVBQUUsR0FBRzJELEVBQXpELEVBQTZELENBQTdEOztBQUNBLFdBQUsvQyxLQUFMLENBQVd5QyxFQUFYLEVBQWVDLEVBQWYsRUFBbUIsQ0FBbkI7QUFDSDs7QUFDRCxTQUFLMUMsS0FBTCxDQUFXeUMsRUFBRSxHQUFHRSxHQUFHLEdBQUcxRixDQUF0QixFQUF5QnlGLEVBQUUsR0FBR0UsR0FBRyxHQUFHM0YsQ0FBcEMsRUFBdUMsQ0FBdkM7O0FBQ0EsU0FBSytDLEtBQUwsQ0FBV3lDLEVBQUUsR0FBR0UsR0FBRyxHQUFHMUYsQ0FBdEIsRUFBeUJ5RixFQUFFLEdBQUdFLEdBQUcsR0FBRzNGLENBQXBDLEVBQXVDLENBQUMsQ0FBeEM7QUFDSDs7U0FFRHFELGVBQUEsc0JBQWNpQyxDQUFkLEVBQWlCckQsRUFBakIsRUFBcUJFLEVBQXJCLEVBQXlCbkMsQ0FBekIsRUFBNEJNLElBQTVCLEVBQWtDO0FBQzlCLFFBQUlrRixFQUFFLEdBQUdGLENBQUMsQ0FBQ3BELENBQVg7QUFDQSxRQUFJdUQsRUFBRSxHQUFHSCxDQUFDLENBQUNsRCxDQUFYO0FBQ0EsUUFBSXNELEdBQUcsR0FBR3ZELEVBQVY7QUFDQSxRQUFJd0QsR0FBRyxHQUFHLENBQUMxRCxFQUFYOztBQUVBLFNBQUtjLEtBQUwsQ0FBV3lDLEVBQUUsR0FBR0UsR0FBRyxHQUFHMUYsQ0FBdEIsRUFBeUJ5RixFQUFFLEdBQUdFLEdBQUcsR0FBRzNGLENBQXBDLEVBQXVDLENBQXZDOztBQUNBLFNBQUsrQyxLQUFMLENBQVd5QyxFQUFFLEdBQUdFLEdBQUcsR0FBRzFGLENBQXRCLEVBQXlCeUYsRUFBRSxHQUFHRSxHQUFHLEdBQUczRixDQUFwQyxFQUF1QyxDQUFDLENBQXhDOztBQUNBLFNBQUssSUFBSS9CLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdxQyxJQUFwQixFQUEwQnJDLENBQUMsRUFBM0IsRUFBK0I7QUFDM0IsVUFBSTJILENBQUMsR0FBRzNILENBQUMsSUFBSXFDLElBQUksR0FBRyxDQUFYLENBQUQsR0FBaUJ4RixFQUF6QjtBQUNBLFVBQUkrSyxFQUFFLEdBQUd6SyxHQUFHLENBQUN3SyxDQUFELENBQUgsR0FBUzVGLENBQWxCO0FBQUEsVUFDSThGLEVBQUUsR0FBR3pLLEdBQUcsQ0FBQ3VLLENBQUQsQ0FBSCxHQUFTNUYsQ0FEbEI7O0FBRUEsV0FBSytDLEtBQUwsQ0FBV3lDLEVBQVgsRUFBZUMsRUFBZixFQUFtQixDQUFuQjs7QUFDQSxXQUFLMUMsS0FBTCxDQUFXeUMsRUFBRSxHQUFHRSxHQUFHLEdBQUdHLEVBQVgsR0FBZ0I1RCxFQUFFLEdBQUc2RCxFQUFoQyxFQUFvQ0wsRUFBRSxHQUFHRSxHQUFHLEdBQUdFLEVBQVgsR0FBZ0IxRCxFQUFFLEdBQUcyRCxFQUF6RCxFQUE2RCxDQUE3RDtBQUNIO0FBQ0o7O1NBRURwRCxhQUFBLG9CQUFZakIsRUFBWixFQUFnQkMsRUFBaEIsRUFBb0JxRSxFQUFwQixFQUF3QkMsRUFBeEIsRUFBNEIxRixJQUE1QixFQUFrQztBQUM5QixRQUFJNkQsSUFBSSxHQUFHMUMsRUFBRSxDQUFDVSxFQUFkO0FBQ0EsUUFBSWlDLElBQUksR0FBRyxDQUFDM0MsRUFBRSxDQUFDUSxFQUFmO0FBQ0EsUUFBSW9DLElBQUksR0FBRzNDLEVBQUUsQ0FBQ1MsRUFBZDtBQUNBLFFBQUltQyxJQUFJLEdBQUcsQ0FBQzVDLEVBQUUsQ0FBQ08sRUFBZjtBQUVBLFFBQUlnRSxHQUFHLEdBQUd2RSxFQUFFLENBQUNRLENBQWI7QUFDQSxRQUFJZ0UsR0FBRyxHQUFHeEUsRUFBRSxDQUFDVSxDQUFiOztBQUVBLFFBQUksQ0FBQ1YsRUFBRSxDQUFDaUIsS0FBSCxHQUFXbkksVUFBVSxDQUFDZ0ssT0FBdkIsTUFBb0MsQ0FBeEMsRUFBMkM7QUFDdkMsVUFBSTJCLEdBQUcsR0FBRyxLQUFLbkIsWUFBTCxDQUFrQnRELEVBQUUsQ0FBQ2lCLEtBQUgsR0FBV25JLFVBQVUsQ0FBQ3FJLGFBQXhDLEVBQXVEcEIsRUFBdkQsRUFBMkRDLEVBQTNELEVBQStEcUUsRUFBL0QsQ0FBVjs7QUFDQSxVQUFJSyxHQUFHLEdBQUdELEdBQUcsQ0FBQyxDQUFELENBQWI7QUFDQSxVQUFJRSxHQUFHLEdBQUdGLEdBQUcsQ0FBQyxDQUFELENBQWI7QUFDQSxVQUFJRyxHQUFHLEdBQUdILEdBQUcsQ0FBQyxDQUFELENBQWI7QUFDQSxVQUFJSSxHQUFHLEdBQUdKLEdBQUcsQ0FBQyxDQUFELENBQWI7QUFFQSxVQUFJSyxFQUFFLEdBQUdsTCxLQUFLLENBQUMsQ0FBQzhJLElBQUYsRUFBUSxDQUFDRCxJQUFULENBQWQ7QUFDQSxVQUFJc0MsRUFBRSxHQUFHbkwsS0FBSyxDQUFDLENBQUNnSixJQUFGLEVBQVEsQ0FBQ0QsSUFBVCxDQUFkO0FBQ0EsVUFBSW9DLEVBQUUsR0FBR0QsRUFBVCxFQUFhQyxFQUFFLElBQUkzTCxFQUFFLEdBQUcsQ0FBWDs7QUFFYixXQUFLaUksS0FBTCxDQUFXcUQsR0FBWCxFQUFnQkMsR0FBaEIsRUFBcUIsQ0FBckI7O0FBQ0EsV0FBS3RELEtBQUwsQ0FBV2tELEdBQUcsR0FBRzlCLElBQUksR0FBRzZCLEVBQXhCLEVBQTRCdEUsRUFBRSxDQUFDVSxDQUFILEdBQU9nQyxJQUFJLEdBQUc0QixFQUExQyxFQUE4QyxDQUFDLENBQS9DOztBQUVBLFVBQUlVLENBQUMsR0FBRzlLLEtBQUssQ0FBQ1YsSUFBSSxDQUFDLENBQUNzTCxFQUFFLEdBQUdDLEVBQU4sSUFBWTNMLEVBQWIsQ0FBSixHQUF1QndGLElBQXhCLEVBQThCLENBQTlCLEVBQWlDQSxJQUFqQyxDQUFiOztBQUNBLFdBQUssSUFBSXJDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd5SSxDQUFwQixFQUF1QnpJLENBQUMsRUFBeEIsRUFBNEI7QUFDeEIsWUFBSTBJLENBQUMsR0FBRzFJLENBQUMsSUFBSXlJLENBQUMsR0FBRyxDQUFSLENBQVQ7QUFDQSxZQUFJZCxDQUFDLEdBQUdZLEVBQUUsR0FBR0csQ0FBQyxJQUFJRixFQUFFLEdBQUdELEVBQVQsQ0FBZDtBQUNBLFlBQUlJLEVBQUUsR0FBR1gsR0FBRyxHQUFHN0ssR0FBRyxDQUFDd0ssQ0FBRCxDQUFILEdBQVNJLEVBQXhCO0FBQ0EsWUFBSWEsRUFBRSxHQUFHWCxHQUFHLEdBQUc3SyxHQUFHLENBQUN1SyxDQUFELENBQUgsR0FBU0ksRUFBeEI7O0FBQ0EsYUFBS2pELEtBQUwsQ0FBV2tELEdBQVgsRUFBZ0JDLEdBQWhCLEVBQXFCLENBQXJCOztBQUNBLGFBQUtuRCxLQUFMLENBQVc2RCxFQUFYLEVBQWVDLEVBQWYsRUFBbUIsQ0FBQyxDQUFwQjtBQUNIOztBQUVELFdBQUs5RCxLQUFMLENBQVd1RCxHQUFYLEVBQWdCQyxHQUFoQixFQUFxQixDQUFyQjs7QUFDQSxXQUFLeEQsS0FBTCxDQUFXa0QsR0FBRyxHQUFHNUIsSUFBSSxHQUFHMkIsRUFBeEIsRUFBNEJFLEdBQUcsR0FBRzVCLElBQUksR0FBRzBCLEVBQXpDLEVBQTZDLENBQUMsQ0FBOUM7QUFDSCxLQTFCRCxNQTBCTztBQUNILFVBQUlHLElBQUcsR0FBRyxLQUFLbkIsWUFBTCxDQUFrQnRELEVBQUUsQ0FBQ2lCLEtBQUgsR0FBV25JLFVBQVUsQ0FBQ3FJLGFBQXhDLEVBQXVEcEIsRUFBdkQsRUFBMkRDLEVBQTNELEVBQStELENBQUNzRSxFQUFoRSxDQUFWOztBQUNBLFVBQUljLEdBQUcsR0FBR1gsSUFBRyxDQUFDLENBQUQsQ0FBYjtBQUNBLFVBQUlZLEdBQUcsR0FBR1osSUFBRyxDQUFDLENBQUQsQ0FBYjtBQUNBLFVBQUlhLEdBQUcsR0FBR2IsSUFBRyxDQUFDLENBQUQsQ0FBYjtBQUNBLFVBQUljLEdBQUcsR0FBR2QsSUFBRyxDQUFDLENBQUQsQ0FBYjs7QUFFQSxVQUFJSyxFQUFFLEdBQUdsTCxLQUFLLENBQUM4SSxJQUFELEVBQU9ELElBQVAsQ0FBZDs7QUFDQSxVQUFJc0MsR0FBRSxHQUFHbkwsS0FBSyxDQUFDZ0osSUFBRCxFQUFPRCxJQUFQLENBQWQ7O0FBQ0EsVUFBSW9DLEdBQUUsR0FBR0QsRUFBVCxFQUFhQyxHQUFFLElBQUkzTCxFQUFFLEdBQUcsQ0FBWDs7QUFFYixXQUFLaUksS0FBTCxDQUFXa0QsR0FBRyxHQUFHOUIsSUFBSSxHQUFHNkIsRUFBeEIsRUFBNEJFLEdBQUcsR0FBRzlCLElBQUksR0FBRzRCLEVBQXpDLEVBQTZDLENBQTdDOztBQUNBLFdBQUtqRCxLQUFMLENBQVcrRCxHQUFYLEVBQWdCQyxHQUFoQixFQUFxQixDQUFDLENBQXRCOztBQUVBLFVBQUlMLEVBQUMsR0FBRzlLLEtBQUssQ0FBQ1YsSUFBSSxDQUFDLENBQUN1TCxHQUFFLEdBQUdELEVBQU4sSUFBWTFMLEVBQWIsQ0FBSixHQUF1QndGLElBQXhCLEVBQThCLENBQTlCLEVBQWlDQSxJQUFqQyxDQUFiOztBQUNBLFdBQUssSUFBSXJDLEdBQUMsR0FBRyxDQUFiLEVBQWdCQSxHQUFDLEdBQUd5SSxFQUFwQixFQUF1QnpJLEdBQUMsRUFBeEIsRUFBNEI7QUFDeEIsWUFBSTBJLEVBQUMsR0FBRzFJLEdBQUMsSUFBSXlJLEVBQUMsR0FBRyxDQUFSLENBQVQ7O0FBQ0EsWUFBSWQsR0FBQyxHQUFHWSxFQUFFLEdBQUdHLEVBQUMsSUFBSUYsR0FBRSxHQUFHRCxFQUFULENBQWQ7O0FBQ0EsWUFBSVUsRUFBRSxHQUFHakIsR0FBRyxHQUFHN0ssR0FBRyxDQUFDd0ssR0FBRCxDQUFILEdBQVNHLEVBQXhCO0FBQ0EsWUFBSW9CLEVBQUUsR0FBR2pCLEdBQUcsR0FBRzdLLEdBQUcsQ0FBQ3VLLEdBQUQsQ0FBSCxHQUFTRyxFQUF4Qjs7QUFDQSxhQUFLaEQsS0FBTCxDQUFXbUUsRUFBWCxFQUFlQyxFQUFmLEVBQW1CLENBQW5COztBQUNBLGFBQUtwRSxLQUFMLENBQVdrRCxHQUFYLEVBQWdCQyxHQUFoQixFQUFxQixDQUFyQjtBQUNIOztBQUVELFdBQUtuRCxLQUFMLENBQVdrRCxHQUFHLEdBQUc1QixJQUFJLEdBQUcyQixFQUF4QixFQUE0QkUsR0FBRyxHQUFHNUIsSUFBSSxHQUFHMEIsRUFBekMsRUFBNkMsQ0FBN0M7O0FBQ0EsV0FBS2pELEtBQUwsQ0FBV2lFLEdBQVgsRUFBZ0JDLEdBQWhCLEVBQXFCLENBQUMsQ0FBdEI7QUFDSDtBQUNKOztTQUVEbkUsYUFBQSxvQkFBWXJCLEVBQVosRUFBZ0JDLEVBQWhCLEVBQW9CcUUsRUFBcEIsRUFBd0JDLEVBQXhCLEVBQTRCO0FBQ3hCLFFBQUljLEdBQUosRUFBU0MsR0FBVCxFQUFjQyxHQUFkLEVBQW1CQyxHQUFuQjtBQUNBLFFBQUliLEdBQUosRUFBU0MsR0FBVCxFQUFjQyxHQUFkLEVBQW1CQyxHQUFuQjtBQUNBLFFBQUlwQyxJQUFJLEdBQUcxQyxFQUFFLENBQUNVLEVBQWQ7QUFDQSxRQUFJaUMsSUFBSSxHQUFHLENBQUMzQyxFQUFFLENBQUNRLEVBQWY7QUFDQSxRQUFJb0MsSUFBSSxHQUFHM0MsRUFBRSxDQUFDUyxFQUFkO0FBQ0EsUUFBSW1DLElBQUksR0FBRyxDQUFDNUMsRUFBRSxDQUFDTyxFQUFmOztBQUVBLFFBQUlQLEVBQUUsQ0FBQ2lCLEtBQUgsR0FBV25JLFVBQVUsQ0FBQ2dLLE9BQTFCLEVBQW1DO0FBQy9CLFVBQUkyQixHQUFHLEdBQUcsS0FBS25CLFlBQUwsQ0FBa0J0RCxFQUFFLENBQUNpQixLQUFILEdBQVduSSxVQUFVLENBQUNxSSxhQUF4QyxFQUF1RHBCLEVBQXZELEVBQTJEQyxFQUEzRCxFQUErRHFFLEVBQS9ELENBQVY7O0FBQ0FLLE1BQUFBLEdBQUcsR0FBR0QsR0FBRyxDQUFDLENBQUQsQ0FBVDtBQUNBRSxNQUFBQSxHQUFHLEdBQUdGLEdBQUcsQ0FBQyxDQUFELENBQVQ7QUFDQUcsTUFBQUEsR0FBRyxHQUFHSCxHQUFHLENBQUMsQ0FBRCxDQUFUO0FBQ0FJLE1BQUFBLEdBQUcsR0FBR0osR0FBRyxDQUFDLENBQUQsQ0FBVDs7QUFFQSxXQUFLcEQsS0FBTCxDQUFXcUQsR0FBWCxFQUFnQkMsR0FBaEIsRUFBcUIsQ0FBckI7O0FBQ0EsV0FBS3RELEtBQUwsQ0FBV3JCLEVBQUUsQ0FBQ1EsQ0FBSCxHQUFPaUMsSUFBSSxHQUFHNkIsRUFBekIsRUFBNkJ0RSxFQUFFLENBQUNVLENBQUgsR0FBT2dDLElBQUksR0FBRzRCLEVBQTNDLEVBQStDLENBQUMsQ0FBaEQ7O0FBRUEsV0FBS2pELEtBQUwsQ0FBV3VELEdBQVgsRUFBZ0JDLEdBQWhCLEVBQXFCLENBQXJCOztBQUNBLFdBQUt4RCxLQUFMLENBQVdyQixFQUFFLENBQUNRLENBQUgsR0FBT21DLElBQUksR0FBRzJCLEVBQXpCLEVBQTZCdEUsRUFBRSxDQUFDVSxDQUFILEdBQU9rQyxJQUFJLEdBQUcwQixFQUEzQyxFQUErQyxDQUFDLENBQWhEO0FBQ0gsS0FaRCxNQVlPO0FBQ0gsVUFBSUcsS0FBRyxHQUFHLEtBQUtuQixZQUFMLENBQWtCdEQsRUFBRSxDQUFDaUIsS0FBSCxHQUFXbkksVUFBVSxDQUFDcUksYUFBeEMsRUFBdURwQixFQUF2RCxFQUEyREMsRUFBM0QsRUFBK0QsQ0FBQ3NFLEVBQWhFLENBQVY7O0FBQ0FjLE1BQUFBLEdBQUcsR0FBR1gsS0FBRyxDQUFDLENBQUQsQ0FBVDtBQUNBWSxNQUFBQSxHQUFHLEdBQUdaLEtBQUcsQ0FBQyxDQUFELENBQVQ7QUFDQWEsTUFBQUEsR0FBRyxHQUFHYixLQUFHLENBQUMsQ0FBRCxDQUFUO0FBQ0FjLE1BQUFBLEdBQUcsR0FBR2QsS0FBRyxDQUFDLENBQUQsQ0FBVDs7QUFFQSxXQUFLcEQsS0FBTCxDQUFXckIsRUFBRSxDQUFDUSxDQUFILEdBQU9pQyxJQUFJLEdBQUc0QixFQUF6QixFQUE2QnJFLEVBQUUsQ0FBQ1UsQ0FBSCxHQUFPZ0MsSUFBSSxHQUFHMkIsRUFBM0MsRUFBK0MsQ0FBL0M7O0FBQ0EsV0FBS2hELEtBQUwsQ0FBVytELEdBQVgsRUFBZ0JDLEdBQWhCLEVBQXFCLENBQUMsQ0FBdEI7O0FBRUEsV0FBS2hFLEtBQUwsQ0FBV3JCLEVBQUUsQ0FBQ1EsQ0FBSCxHQUFPbUMsSUFBSSxHQUFHMEIsRUFBekIsRUFBNkJyRSxFQUFFLENBQUNVLENBQUgsR0FBT2tDLElBQUksR0FBR3lCLEVBQTNDLEVBQStDLENBQS9DOztBQUNBLFdBQUtoRCxLQUFMLENBQVdpRSxHQUFYLEVBQWdCQyxHQUFoQixFQUFxQixDQUFDLENBQXRCO0FBQ0g7QUFDSjs7U0FFRGxFLFFBQUEsZUFBT2IsQ0FBUCxFQUFVRSxDQUFWLEVBQWFnRixRQUFiLEVBQTJCO0FBQUEsUUFBZEEsUUFBYztBQUFkQSxNQUFBQSxRQUFjLEdBQUgsQ0FBRztBQUFBOztBQUN2QixRQUFJbEssTUFBTSxHQUFHLEtBQUtOLE9BQWxCO0FBQ0EsUUFBSVMsVUFBVSxHQUFHSCxNQUFNLENBQUNHLFVBQXhCO0FBQ0EsUUFBSWdLLFVBQVUsR0FBR25LLE1BQU0sQ0FBQ0UsV0FBUCxHQUFxQixLQUFLSixpQkFBTCxFQUF0QztBQUVBLFFBQUltRSxLQUFLLEdBQUc5RCxVQUFVLENBQUMrRCxNQUF2QjtBQUNBLFFBQUlrRyxTQUFTLEdBQUdqSyxVQUFVLENBQUNrSyxVQUEzQjtBQUVBcEcsSUFBQUEsS0FBSyxDQUFDa0csVUFBRCxDQUFMLEdBQW9CbkYsQ0FBcEI7QUFDQWYsSUFBQUEsS0FBSyxDQUFDa0csVUFBVSxHQUFDLENBQVosQ0FBTCxHQUFzQmpGLENBQXRCO0FBQ0FrRixJQUFBQSxTQUFTLENBQUNELFVBQVUsR0FBQyxDQUFaLENBQVQsR0FBMEIsS0FBSy9ILFNBQS9CO0FBQ0E2QixJQUFBQSxLQUFLLENBQUNrRyxVQUFVLEdBQUMsQ0FBWixDQUFMLEdBQXNCRCxRQUF0QjtBQUVBbEssSUFBQUEsTUFBTSxDQUFDRSxXQUFQO0FBQ0FDLElBQUFBLFVBQVUsQ0FBQ21LLE1BQVgsR0FBb0IsSUFBcEI7QUFDSDs7O0VBdm1CMENDOzs7O0FBMG1CL0NBLHNCQUFVQyxRQUFWLENBQW1CM0wsRUFBRSxDQUFDeEIsUUFBdEIsRUFBZ0NtQyxpQkFBaEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgQXNzZW1ibGVyIGZyb20gJy4uLy4uLy4uL2Fzc2VtYmxlcic7XG5cbmltcG9ydCBJbnB1dEFzc2VtYmxlciBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZW5kZXJlci9jb3JlL2lucHV0LWFzc2VtYmxlcic7XG5cbmNvbnN0IE1lc2hCdWZmZXIgPSByZXF1aXJlKCcuLi8uLi9tZXNoLWJ1ZmZlcicpO1xuY29uc3QgcmVuZGVyZXIgPSByZXF1aXJlKCcuLi8uLi8uLi9pbmRleCcpO1xuXG5jb25zdCBHcmFwaGljcyA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL2dyYXBoaWNzL2dyYXBoaWNzJyk7XG5jb25zdCBQb2ludEZsYWdzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vZ3JhcGhpY3MvdHlwZXMnKS5Qb2ludEZsYWdzO1xuY29uc3QgTGluZUpvaW4gPSBHcmFwaGljcy5MaW5lSm9pbjtcbmNvbnN0IExpbmVDYXAgPSBHcmFwaGljcy5MaW5lQ2FwO1xuY29uc3QgRWFyY3V0ID0gcmVxdWlyZSgnLi9lYXJjdXQnKTtcbnJlcXVpcmUoJy4vaW1wbCcpO1xuXG5jb25zdCBNQVhfVkVSVEVYID0gNjU1MzU7XG5jb25zdCBNQVhfSU5ESUNFID0gTUFYX1ZFUlRFWCAqIDI7XG5cbmNvbnN0IFBJICAgICAgPSBNYXRoLlBJO1xuY29uc3QgbWluICAgICA9IE1hdGgubWluO1xuY29uc3QgbWF4ICAgICA9IE1hdGgubWF4O1xuY29uc3QgY2VpbCAgICA9IE1hdGguY2VpbDtcbmNvbnN0IGFjb3MgICAgPSBNYXRoLmFjb3M7XG5jb25zdCBjb3MgICAgID0gTWF0aC5jb3M7XG5jb25zdCBzaW4gICAgID0gTWF0aC5zaW47XG5jb25zdCBhdGFuMiAgID0gTWF0aC5hdGFuMjtcblxuZnVuY3Rpb24gY3VydmVEaXZzIChyLCBhcmMsIHRvbCkge1xuICAgIGxldCBkYSA9IGFjb3MociAvIChyICsgdG9sKSkgKiAyLjA7XG4gICAgcmV0dXJuIG1heCgyLCBjZWlsKGFyYyAvIGRhKSk7XG59XG5cbmZ1bmN0aW9uIGNsYW1wICh2LCBtaW4sIG1heCkge1xuICAgIGlmICh2IDwgbWluKSB7XG4gICAgICAgIHJldHVybiBtaW47XG4gICAgfVxuICAgIGVsc2UgaWYgKHYgPiBtYXgpIHtcbiAgICAgICAgcmV0dXJuIG1heDtcbiAgICB9XG4gICAgcmV0dXJuIHY7XG59XG5cblxubGV0IGdmeCA9IGNjLmdmeDtcbmxldCB2Zm10UG9zQ29sb3JTZGYgPSBuZXcgZ2Z4LlZlcnRleEZvcm1hdChbXG4gICAgeyBuYW1lOiBnZnguQVRUUl9QT1NJVElPTiwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDIgfSxcbiAgICB7IG5hbWU6IGdmeC5BVFRSX0NPTE9SLCB0eXBlOiBnZnguQVRUUl9UWVBFX1VJTlQ4LCBudW06IDQsIG5vcm1hbGl6ZTogdHJ1ZSB9LFxuICAgIHsgbmFtZTogJ2FfZGlzdCcsIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAxIH0sXG5dKTtcbnZmbXRQb3NDb2xvclNkZi5uYW1lID0gJ3ZmbXRQb3NDb2xvclNkZic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoaWNzQXNzZW1ibGVyIGV4dGVuZHMgQXNzZW1ibGVyIHtcbiAgICBjb25zdHJ1Y3RvciAoZ3JhcGhpY3MpIHtcbiAgICAgICAgc3VwZXIoZ3JhcGhpY3MpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYnVmZmVycyA9IFtdO1xuICAgICAgICB0aGlzLl9idWZmZXJPZmZzZXQgPSAwO1xuICAgIH1cblxuICAgIGdldFZmbXQgKCkge1xuICAgICAgICByZXR1cm4gdmZtdFBvc0NvbG9yU2RmO1xuICAgIH1cblxuICAgIGdldFZmbXRGbG9hdENvdW50ICgpIHtcbiAgICAgICAgcmV0dXJuIDQ7XG4gICAgfVxuXG4gICAgcmVxdWVzdEJ1ZmZlciAoKSB7XG4gICAgICAgIGxldCBidWZmZXIgPSB7XG4gICAgICAgICAgICBpbmRpY2VTdGFydDogMCxcbiAgICAgICAgICAgIHZlcnRleFN0YXJ0OiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IG1lc2hidWZmZXIgPSBuZXcgTWVzaEJ1ZmZlcihyZW5kZXJlci5faGFuZGxlLCB0aGlzLmdldFZmbXQoKSk7XG4gICAgICAgIGJ1ZmZlci5tZXNoYnVmZmVyID0gbWVzaGJ1ZmZlcjtcblxuICAgICAgICBsZXQgaWEgPSBuZXcgSW5wdXRBc3NlbWJsZXIobWVzaGJ1ZmZlci5fdmIsIG1lc2hidWZmZXIuX2liKTtcbiAgICAgICAgYnVmZmVyLmlhID0gaWE7XG5cbiAgICAgICAgdGhpcy5fYnVmZmVycy5wdXNoKGJ1ZmZlcik7XG5cbiAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcbiAgICB9XG5cbiAgICBnZXRCdWZmZXJzICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2J1ZmZlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RCdWZmZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9idWZmZXJzO1xuICAgIH1cblxuICAgIGNsZWFyIChjbGVhbikge1xuICAgICAgICB0aGlzLl9idWZmZXJPZmZzZXQgPSAwO1xuXG4gICAgICAgIGxldCBkYXRhcyA9IHRoaXMuX2J1ZmZlcnM7XG4gICAgICAgIGlmIChjbGVhbikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBkYXRhcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGRhdGFzW2ldO1xuICAgICAgICAgICAgICAgIGRhdGEubWVzaGJ1ZmZlci5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgZGF0YS5tZXNoYnVmZmVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGFzLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGRhdGFzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gZGF0YXNbaV07XG5cbiAgICAgICAgICAgICAgICBkYXRhLmluZGljZVN0YXJ0ID0gMDtcbiAgICAgICAgICAgICAgICBkYXRhLnZlcnRleFN0YXJ0ID0gMDtcblxuICAgICAgICAgICAgICAgIGxldCBtZXNoYnVmZmVyID0gZGF0YS5tZXNoYnVmZmVyO1xuICAgICAgICAgICAgICAgIG1lc2hidWZmZXIucmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbGxCdWZmZXJzIChncmFwaGljcywgcmVuZGVyZXIpIHtcbiAgICAgICAgcmVuZGVyZXIuX2ZsdXNoKCk7XG5cbiAgICAgICAgcmVuZGVyZXIubm9kZSA9IGdyYXBoaWNzLm5vZGU7XG4gICAgICAgIHJlbmRlcmVyLm1hdGVyaWFsID0gZ3JhcGhpY3MuX21hdGVyaWFsc1swXTtcblxuICAgICAgICBsZXQgYnVmZmVycyA9IHRoaXMuZ2V0QnVmZmVycygpO1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDAsIGxlbmd0aCA9IGJ1ZmZlcnMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IGJ1ZmZlciA9IGJ1ZmZlcnNbaW5kZXhdO1xuICAgICAgICAgICAgbGV0IG1lc2hidWZmZXIgPSBidWZmZXIubWVzaGJ1ZmZlcjtcbiAgICAgICAgICAgIGJ1ZmZlci5pYS5fY291bnQgPSBidWZmZXIuaW5kaWNlU3RhcnQ7XG4gICAgICAgICAgICByZW5kZXJlci5fZmx1c2hJQShidWZmZXIuaWEpO1xuICAgICAgICAgICAgbWVzaGJ1ZmZlci51cGxvYWREYXRhKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5CdWZmZXIgKGdyYXBoaWNzLCBjdmVydHMpIHtcbiAgICAgICAgbGV0IGJ1ZmZlcnMgPSB0aGlzLmdldEJ1ZmZlcnMoKTsgXG4gICAgICAgIGxldCBidWZmZXIgPSBidWZmZXJzW3RoaXMuX2J1ZmZlck9mZnNldF07XG4gICAgICAgIGxldCBtZXNoYnVmZmVyID0gYnVmZmVyLm1lc2hidWZmZXI7XG5cbiAgICAgICAgbGV0IG1heFZlcnRzQ291bnQgPSBidWZmZXIudmVydGV4U3RhcnQgKyBjdmVydHM7XG4gICAgICAgIGlmIChtYXhWZXJ0c0NvdW50ID4gTUFYX1ZFUlRFWCB8fFxuICAgICAgICAgICAgbWF4VmVydHNDb3VudCAqIDMgPiBNQVhfSU5ESUNFKSB7XG4gICAgICAgICAgICArK3RoaXMuX2J1ZmZlck9mZnNldDtcbiAgICAgICAgICAgIG1heFZlcnRzQ291bnQgPSBjdmVydHM7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLl9idWZmZXJPZmZzZXQgPCBidWZmZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlcnNbdGhpcy5fYnVmZmVyT2Zmc2V0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IHRoaXMucmVxdWVzdEJ1ZmZlcihncmFwaGljcyk7XG4gICAgICAgICAgICAgICAgYnVmZmVyc1t0aGlzLl9idWZmZXJPZmZzZXRdID0gYnVmZmVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZXNoYnVmZmVyID0gYnVmZmVyLm1lc2hidWZmZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF4VmVydHNDb3VudCA+IG1lc2hidWZmZXIudmVydGV4T2Zmc2V0KSB7XG4gICAgICAgICAgICBtZXNoYnVmZmVyLnJlcXVlc3RTdGF0aWMoY3ZlcnRzLCBjdmVydHMqMyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9idWZmZXIgPSBidWZmZXI7XG4gICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgfVxuXG4gICAgc3Ryb2tlIChncmFwaGljcykge1xuICAgICAgICB0aGlzLl9jdXJDb2xvciA9IGdyYXBoaWNzLl9zdHJva2VDb2xvci5fdmFsO1xuXG4gICAgICAgIHRoaXMuX2ZsYXR0ZW5QYXRocyhncmFwaGljcy5faW1wbCk7XG4gICAgICAgIHRoaXMuX2V4cGFuZFN0cm9rZShncmFwaGljcyk7XG4gICAgXG4gICAgICAgIGdyYXBoaWNzLl9pbXBsLl91cGRhdGVQYXRoT2Zmc2V0ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBmaWxsIChncmFwaGljcykge1xuICAgICAgICB0aGlzLl9jdXJDb2xvciA9IGdyYXBoaWNzLl9maWxsQ29sb3IuX3ZhbDtcblxuICAgICAgICB0aGlzLl9leHBhbmRGaWxsKGdyYXBoaWNzKTtcbiAgICAgICAgZ3JhcGhpY3MuX2ltcGwuX3VwZGF0ZVBhdGhPZmZzZXQgPSB0cnVlO1xuICAgIH1cblxuICAgIF9leHBhbmRTdHJva2UgKGdyYXBoaWNzKSB7XG4gICAgICAgIGxldCB3ID0gZ3JhcGhpY3MubGluZVdpZHRoICogMC41LFxuICAgICAgICAgICAgbGluZUNhcCA9IGdyYXBoaWNzLmxpbmVDYXAsXG4gICAgICAgICAgICBsaW5lSm9pbiA9IGdyYXBoaWNzLmxpbmVKb2luLFxuICAgICAgICAgICAgbWl0ZXJMaW1pdCA9IGdyYXBoaWNzLm1pdGVyTGltaXQ7XG5cbiAgICAgICAgbGV0IGltcGwgPSBncmFwaGljcy5faW1wbDtcbiAgICBcbiAgICAgICAgbGV0IG5jYXAgPSBjdXJ2ZURpdnModywgUEksIGltcGwuX3Rlc3NUb2wpO1xuICAgIFxuICAgICAgICB0aGlzLl9jYWxjdWxhdGVKb2lucyhpbXBsLCB3LCBsaW5lSm9pbiwgbWl0ZXJMaW1pdCk7XG4gICAgXG4gICAgICAgIGxldCBwYXRocyA9IGltcGwuX3BhdGhzO1xuICAgICAgICBcbiAgICAgICAgLy8gQ2FsY3VsYXRlIG1heCB2ZXJ0ZXggdXNhZ2UuXG4gICAgICAgIGxldCBjdmVydHMgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gaW1wbC5fcGF0aE9mZnNldCwgbCA9IGltcGwuX3BhdGhMZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwYXRoID0gcGF0aHNbaV07XG4gICAgICAgICAgICBsZXQgcG9pbnRzTGVuZ3RoID0gcGF0aC5wb2ludHMubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobGluZUpvaW4gPT09IExpbmVKb2luLlJPVU5EKSBjdmVydHMgKz0gKHBvaW50c0xlbmd0aCArIHBhdGgubmJldmVsICogKG5jYXAgKyAyKSArIDEpICogMjsgLy8gcGx1cyBvbmUgZm9yIGxvb3BcbiAgICAgICAgICAgIGVsc2UgY3ZlcnRzICs9IChwb2ludHNMZW5ndGggKyBwYXRoLm5iZXZlbCAqIDUgKyAxKSAqIDI7IC8vIHBsdXMgb25lIGZvciBsb29wXG5cbiAgICAgICAgICAgIGlmICghcGF0aC5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBzcGFjZSBmb3IgY2Fwc1xuICAgICAgICAgICAgICAgIGlmIChsaW5lQ2FwID09PSBMaW5lQ2FwLlJPVU5EKSB7XG4gICAgICAgICAgICAgICAgICAgIGN2ZXJ0cyArPSAobmNhcCAqIDIgKyAyKSAqIDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3ZlcnRzICs9ICgzICsgMykgKiAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuZ2VuQnVmZmVyKGdyYXBoaWNzLCBjdmVydHMpLFxuICAgICAgICAgICAgbWVzaGJ1ZmZlciA9IGJ1ZmZlci5tZXNoYnVmZmVyLFxuICAgICAgICAgICAgdkRhdGEgPSBtZXNoYnVmZmVyLl92RGF0YSxcbiAgICAgICAgICAgIGlEYXRhID0gbWVzaGJ1ZmZlci5faURhdGE7XG4gICAgICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IGltcGwuX3BhdGhPZmZzZXQsIGwgPSBpbXBsLl9wYXRoTGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcGF0aCA9IHBhdGhzW2ldO1xuICAgICAgICAgICAgbGV0IHB0cyA9IHBhdGgucG9pbnRzO1xuICAgICAgICAgICAgbGV0IHBvaW50c0xlbmd0aCA9IHB0cy5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gYnVmZmVyLnZlcnRleFN0YXJ0O1xuXG4gICAgICAgICAgICBsZXQgcDAsIHAxO1xuICAgICAgICAgICAgbGV0IHN0YXJ0LCBlbmQsIGxvb3A7XG4gICAgICAgICAgICBsb29wID0gcGF0aC5jbG9zZWQ7XG4gICAgICAgICAgICBpZiAobG9vcCkge1xuICAgICAgICAgICAgICAgIC8vIExvb3BpbmdcbiAgICAgICAgICAgICAgICBwMCA9IHB0c1twb2ludHNMZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBwMSA9IHB0c1swXTtcbiAgICAgICAgICAgICAgICBzdGFydCA9IDA7XG4gICAgICAgICAgICAgICAgZW5kID0gcG9pbnRzTGVuZ3RoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgY2FwXG4gICAgICAgICAgICAgICAgcDAgPSBwdHNbMF07XG4gICAgICAgICAgICAgICAgcDEgPSBwdHNbMV07XG4gICAgICAgICAgICAgICAgc3RhcnQgPSAxO1xuICAgICAgICAgICAgICAgIGVuZCA9IHBvaW50c0xlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHAxID0gcDEgfHwgcDA7XG4gICAgXG4gICAgICAgICAgICBpZiAoIWxvb3ApIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgY2FwXG4gICAgICAgICAgICAgICAgbGV0IGRQb3MgPSBwMS5zdWIocDApO1xuICAgICAgICAgICAgICAgIGRQb3Mubm9ybWFsaXplU2VsZigpO1xuICAgIFxuICAgICAgICAgICAgICAgIGxldCBkeCA9IGRQb3MueDtcbiAgICAgICAgICAgICAgICBsZXQgZHkgPSBkUG9zLnk7XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVDYXAgPT09IExpbmVDYXAuQlVUVClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnV0dENhcFN0YXJ0KHAwLCBkeCwgZHksIHcsIDApO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxpbmVDYXAgPT09IExpbmVDYXAuU1FVQVJFKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idXR0Q2FwU3RhcnQocDAsIGR4LCBkeSwgdywgdyk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGluZUNhcCA9PT0gTGluZUNhcC5ST1VORClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91bmRDYXBTdGFydChwMCwgZHgsIGR5LCB3LCBuY2FwKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBzdGFydDsgaiA8IGVuZDsgKytqKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpbmVKb2luID09PSBMaW5lSm9pbi5ST1VORCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3VuZEpvaW4ocDAsIHAxLCB3LCB3LCBuY2FwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoKHAxLmZsYWdzICYgKFBvaW50RmxhZ3MuUFRfQkVWRUwgfCBQb2ludEZsYWdzLlBUX0lOTkVSQkVWRUwpKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iZXZlbEpvaW4ocDAsIHAxLCB3LCB3KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZzZXQocDEueCArIHAxLmRteCAqIHcsIHAxLnkgKyBwMS5kbXkgKiB3LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdnNldChwMS54IC0gcDEuZG14ICogdywgcDEueSAtIHAxLmRteSAqIHcsIC0xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgcDAgPSBwMTtcbiAgICAgICAgICAgICAgICBwMSA9IHB0c1tqICsgMV07XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBpZiAobG9vcCkge1xuICAgICAgICAgICAgICAgIC8vIExvb3AgaXRcbiAgICAgICAgICAgICAgICBsZXQgZmxvYXRDb3VudCA9IHRoaXMuZ2V0VmZtdEZsb2F0Q291bnQoKTtcbiAgICAgICAgICAgICAgICBsZXQgdkRhdGFvT2ZzZXQgPSBvZmZzZXQgKiBmbG9hdENvdW50O1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZzZXQodkRhdGFbdkRhdGFvT2ZzZXRdLCAgIHZEYXRhW3ZEYXRhb09mc2V0KzFdLCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLl92c2V0KHZEYXRhW3ZEYXRhb09mc2V0K2Zsb2F0Q291bnRdLCB2RGF0YVt2RGF0YW9PZnNldCtmbG9hdENvdW50KzFdLCAtMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBjYXBcbiAgICAgICAgICAgICAgICBsZXQgZFBvcyA9IHAxLnN1YihwMCk7XG4gICAgICAgICAgICAgICAgZFBvcy5ub3JtYWxpemVTZWxmKCk7XG4gICAgXG4gICAgICAgICAgICAgICAgbGV0IGR4ID0gZFBvcy54O1xuICAgICAgICAgICAgICAgIGxldCBkeSA9IGRQb3MueTtcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAobGluZUNhcCA9PT0gTGluZUNhcC5CVVRUKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idXR0Q2FwRW5kKHAxLCBkeCwgZHksIHcsIDApO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxpbmVDYXAgPT09IExpbmVDYXAuU1FVQVJFKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idXR0Q2FwRW5kKHAxLCBkeCwgZHksIHcsIHcpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxpbmVDYXAgPT09IExpbmVDYXAuUk9VTkQpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdW5kQ2FwRW5kKHAxLCBkeCwgZHksIHcsIG5jYXApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzdHJva2UgaW5kaWNlc1xuICAgICAgICAgICAgbGV0IGluZGljZXNPZmZzZXQgPSBidWZmZXIuaW5kaWNlU3RhcnQ7XG4gICAgICAgICAgICBmb3IgKGxldCBzdGFydCA9IG9mZnNldCsyLCBlbmQgPSBidWZmZXIudmVydGV4U3RhcnQ7IHN0YXJ0IDwgZW5kOyBzdGFydCsrKSB7XG4gICAgICAgICAgICAgICAgaURhdGFbaW5kaWNlc09mZnNldCsrXSA9IHN0YXJ0IC0gMjtcbiAgICAgICAgICAgICAgICBpRGF0YVtpbmRpY2VzT2Zmc2V0KytdID0gc3RhcnQgLSAxO1xuICAgICAgICAgICAgICAgIGlEYXRhW2luZGljZXNPZmZzZXQrK10gPSBzdGFydDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnVmZmVyLmluZGljZVN0YXJ0ID0gaW5kaWNlc09mZnNldDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBfZXhwYW5kRmlsbCAoZ3JhcGhpY3MpIHtcbiAgICAgICAgbGV0IGltcGwgPSBncmFwaGljcy5faW1wbDtcblxuICAgICAgICBsZXQgcGF0aHMgPSBpbXBsLl9wYXRocztcblxuICAgICAgICAvLyBDYWxjdWxhdGUgbWF4IHZlcnRleCB1c2FnZS5cbiAgICAgICAgbGV0IGN2ZXJ0cyA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSBpbXBsLl9wYXRoT2Zmc2V0LCBsID0gaW1wbC5fcGF0aExlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgbGV0IHBhdGggPSBwYXRoc1tpXTtcbiAgICAgICAgICAgIGxldCBwb2ludHNMZW5ndGggPSBwYXRoLnBvaW50cy5sZW5ndGg7XG5cbiAgICAgICAgICAgIGN2ZXJ0cyArPSBwb2ludHNMZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYnVmZmVyID0gdGhpcy5nZW5CdWZmZXIoZ3JhcGhpY3MsIGN2ZXJ0cyksXG4gICAgICAgICAgICBtZXNoYnVmZmVyID0gYnVmZmVyLm1lc2hidWZmZXIsXG4gICAgICAgICAgICB2RGF0YSA9IG1lc2hidWZmZXIuX3ZEYXRhLFxuICAgICAgICAgICAgaURhdGEgPSBtZXNoYnVmZmVyLl9pRGF0YTtcblxuICAgICAgICBmb3IgKGxldCBpID0gaW1wbC5fcGF0aE9mZnNldCwgbCA9IGltcGwuX3BhdGhMZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwYXRoID0gcGF0aHNbaV07XG4gICAgICAgICAgICBsZXQgcHRzID0gcGF0aC5wb2ludHM7XG4gICAgICAgICAgICBsZXQgcG9pbnRzTGVuZ3RoID0gcHRzLmxlbmd0aDtcbiAgICBcbiAgICAgICAgICAgIGlmIChwb2ludHNMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBzaGFwZSB2ZXJ0aWNlcy5cbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSBidWZmZXIudmVydGV4U3RhcnQ7XG4gICAgXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBvaW50c0xlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdnNldChwdHNbal0ueCwgcHRzW2pdLnkpO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgbGV0IGluZGljZXNPZmZzZXQgPSBidWZmZXIuaW5kaWNlU3RhcnQ7XG4gICAgXG4gICAgICAgICAgICBpZiAocGF0aC5jb21wbGV4KSB7XG4gICAgICAgICAgICAgICAgbGV0IGVhcmN1dERhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgZmxvYXRDb3VudCA9IHRoaXMuZ2V0VmZtdEZsb2F0Q291bnQoKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gb2Zmc2V0LCBlbmQgPSBidWZmZXIudmVydGV4U3RhcnQ7IGogPCBlbmQ7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdkRhdGFPZmZzZXQgPSBqICogZmxvYXRDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgZWFyY3V0RGF0YS5wdXNoKHZEYXRhW3ZEYXRhT2Zmc2V0XSk7XG4gICAgICAgICAgICAgICAgICAgIGVhcmN1dERhdGEucHVzaCh2RGF0YVt2RGF0YU9mZnNldCsxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIGxldCBuZXdJbmRpY2VzID0gRWFyY3V0KGVhcmN1dERhdGEsIG51bGwsIDIpO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmICghbmV3SW5kaWNlcyB8fCBuZXdJbmRpY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIG5JbmRpY2VzID0gbmV3SW5kaWNlcy5sZW5ndGg7IGogPCBuSW5kaWNlczsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlEYXRhW2luZGljZXNPZmZzZXQrK10gPSBuZXdJbmRpY2VzW2pdICsgb2Zmc2V0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBmaXJzdCA9IG9mZnNldDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzdGFydCA9IG9mZnNldCsyLCBlbmQgPSBidWZmZXIudmVydGV4U3RhcnQ7IHN0YXJ0IDwgZW5kOyBzdGFydCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlEYXRhW2luZGljZXNPZmZzZXQrK10gPSBmaXJzdDtcbiAgICAgICAgICAgICAgICAgICAgaURhdGFbaW5kaWNlc09mZnNldCsrXSA9IHN0YXJ0IC0gMTtcbiAgICAgICAgICAgICAgICAgICAgaURhdGFbaW5kaWNlc09mZnNldCsrXSA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnVmZmVyLmluZGljZVN0YXJ0ID0gaW5kaWNlc09mZnNldDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jYWxjdWxhdGVKb2lucyAoaW1wbCwgdywgbGluZUpvaW4sIG1pdGVyTGltaXQpIHtcbiAgICAgICAgbGV0IGl3ID0gMC4wO1xuICAgIFxuICAgICAgICBpZiAodyA+IDAuMCkge1xuICAgICAgICAgICAgaXcgPSAxIC8gdztcbiAgICAgICAgfVxuICAgIFxuICAgICAgICAvLyBDYWxjdWxhdGUgd2hpY2ggam9pbnMgbmVlZHMgZXh0cmEgdmVydGljZXMgdG8gYXBwZW5kLCBhbmQgZ2F0aGVyIHZlcnRleCBjb3VudC5cbiAgICAgICAgbGV0IHBhdGhzID0gaW1wbC5fcGF0aHM7XG4gICAgICAgIGZvciAobGV0IGkgPSBpbXBsLl9wYXRoT2Zmc2V0LCBsID0gaW1wbC5fcGF0aExlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgbGV0IHBhdGggPSBwYXRoc1tpXTtcbiAgICBcbiAgICAgICAgICAgIGxldCBwdHMgPSBwYXRoLnBvaW50cztcbiAgICAgICAgICAgIGxldCBwdHNMZW5ndGggPSBwdHMubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IHAwID0gcHRzW3B0c0xlbmd0aCAtIDFdO1xuICAgICAgICAgICAgbGV0IHAxID0gcHRzWzBdO1xuICAgICAgICAgICAgbGV0IG5sZWZ0ID0gMDtcbiAgICBcbiAgICAgICAgICAgIHBhdGgubmJldmVsID0gMDtcbiAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcHRzTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZG1yMiwgY3Jvc3MsIGxpbWl0O1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIHBlcnAgbm9ybWFsc1xuICAgICAgICAgICAgICAgIGxldCBkbHgwID0gcDAuZHk7XG4gICAgICAgICAgICAgICAgbGV0IGRseTAgPSAtcDAuZHg7XG4gICAgICAgICAgICAgICAgbGV0IGRseDEgPSBwMS5keTtcbiAgICAgICAgICAgICAgICBsZXQgZGx5MSA9IC1wMS5keDtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgZXh0cnVzaW9uc1xuICAgICAgICAgICAgICAgIHAxLmRteCA9IChkbHgwICsgZGx4MSkgKiAwLjU7XG4gICAgICAgICAgICAgICAgcDEuZG15ID0gKGRseTAgKyBkbHkxKSAqIDAuNTtcbiAgICAgICAgICAgICAgICBkbXIyID0gcDEuZG14ICogcDEuZG14ICsgcDEuZG15ICogcDEuZG15O1xuICAgICAgICAgICAgICAgIGlmIChkbXIyID4gMC4wMDAwMDEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gMSAvIGRtcjI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2FsZSA+IDYwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUgPSA2MDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcDEuZG14ICo9IHNjYWxlO1xuICAgICAgICAgICAgICAgICAgICBwMS5kbXkgKj0gc2NhbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIC8vIEtlZXAgdHJhY2sgb2YgbGVmdCB0dXJucy5cbiAgICAgICAgICAgICAgICBjcm9zcyA9IHAxLmR4ICogcDAuZHkgLSBwMC5keCAqIHAxLmR5O1xuICAgICAgICAgICAgICAgIGlmIChjcm9zcyA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbmxlZnQrKztcbiAgICAgICAgICAgICAgICAgICAgcDEuZmxhZ3MgfD0gUG9pbnRGbGFncy5QVF9MRUZUO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgaWYgd2Ugc2hvdWxkIHVzZSBiZXZlbCBvciBtaXRlciBmb3IgaW5uZXIgam9pbi5cbiAgICAgICAgICAgICAgICBsaW1pdCA9IG1heCgxMSwgbWluKHAwLmxlbiwgcDEubGVuKSAqIGl3KTtcbiAgICAgICAgICAgICAgICBpZiAoZG1yMiAqIGxpbWl0ICogbGltaXQgPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHAxLmZsYWdzIHw9IFBvaW50RmxhZ3MuUFRfSU5ORVJCRVZFTDtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBjb3JuZXIgbmVlZHMgdG8gYmUgYmV2ZWxlZC5cbiAgICAgICAgICAgICAgICBpZiAocDEuZmxhZ3MgJiBQb2ludEZsYWdzLlBUX0NPUk5FUikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG1yMiAqIG1pdGVyTGltaXQgKiBtaXRlckxpbWl0IDwgMSB8fCBsaW5lSm9pbiA9PT0gTGluZUpvaW4uQkVWRUwgfHwgbGluZUpvaW4gPT09IExpbmVKb2luLlJPVU5EKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwMS5mbGFncyB8PSBQb2ludEZsYWdzLlBUX0JFVkVMO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIGlmICgocDEuZmxhZ3MgJiAoUG9pbnRGbGFncy5QVF9CRVZFTCB8IFBvaW50RmxhZ3MuUFRfSU5ORVJCRVZFTCkpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGgubmJldmVsKys7XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIHAwID0gcDE7XG4gICAgICAgICAgICAgICAgcDEgPSBwdHNbaiArIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIF9mbGF0dGVuUGF0aHMgKGltcGwpIHtcbiAgICAgICAgbGV0IHBhdGhzID0gaW1wbC5fcGF0aHM7XG4gICAgICAgIGZvciAobGV0IGkgPSBpbXBsLl9wYXRoT2Zmc2V0LCBsID0gaW1wbC5fcGF0aExlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgbGV0IHBhdGggPSBwYXRoc1tpXTtcbiAgICAgICAgICAgIGxldCBwdHMgPSBwYXRoLnBvaW50cztcbiAgICBcbiAgICAgICAgICAgIGxldCBwMCA9IHB0c1twdHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBsZXQgcDEgPSBwdHNbMF07XG4gICAgXG4gICAgICAgICAgICBpZiAocHRzLmxlbmd0aCA+IDIgJiYgcDAuZXF1YWxzKHAxKSkge1xuICAgICAgICAgICAgICAgIHBhdGguY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwdHMucG9wKCk7XG4gICAgICAgICAgICAgICAgcDAgPSBwdHNbcHRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIHNpemUgPSBwdHMubGVuZ3RoOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHNlZ21lbnQgZGlyZWN0aW9uIGFuZCBsZW5ndGhcbiAgICAgICAgICAgICAgICBsZXQgZFBvcyA9IHAxLnN1YihwMCk7XG4gICAgICAgICAgICAgICAgcDAubGVuID0gZFBvcy5tYWcoKTtcbiAgICAgICAgICAgICAgICBpZiAoZFBvcy54IHx8IGRQb3MueSlcbiAgICAgICAgICAgICAgICAgICAgZFBvcy5ub3JtYWxpemVTZWxmKCk7XG4gICAgICAgICAgICAgICAgcDAuZHggPSBkUG9zLng7XG4gICAgICAgICAgICAgICAgcDAuZHkgPSBkUG9zLnk7XG4gICAgICAgICAgICAgICAgLy8gQWR2YW5jZVxuICAgICAgICAgICAgICAgIHAwID0gcDE7XG4gICAgICAgICAgICAgICAgcDEgPSBwdHNbaiArIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2Nob29zZUJldmVsIChiZXZlbCwgcDAsIHAxLCB3KSB7XG4gICAgICAgIGxldCB4ID0gcDEueDtcbiAgICAgICAgbGV0IHkgPSBwMS55O1xuICAgICAgICBsZXQgeDAsIHkwLCB4MSwgeTE7XG4gICAgXG4gICAgICAgIGlmIChiZXZlbCAhPT0gMCkge1xuICAgICAgICAgICAgeDAgPSB4ICsgcDAuZHkgKiB3O1xuICAgICAgICAgICAgeTAgPSB5IC0gcDAuZHggKiB3O1xuICAgICAgICAgICAgeDEgPSB4ICsgcDEuZHkgKiB3O1xuICAgICAgICAgICAgeTEgPSB5IC0gcDEuZHggKiB3O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeDAgPSB4MSA9IHggKyBwMS5kbXggKiB3O1xuICAgICAgICAgICAgeTAgPSB5MSA9IHkgKyBwMS5kbXkgKiB3O1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBbeDAsIHkwLCB4MSwgeTFdO1xuICAgIH1cbiAgICBcbiAgICBfYnV0dENhcFN0YXJ0IChwLCBkeCwgZHksIHcsIGQpIHtcbiAgICAgICAgbGV0IHB4ID0gcC54IC0gZHggKiBkO1xuICAgICAgICBsZXQgcHkgPSBwLnkgLSBkeSAqIGQ7XG4gICAgICAgIGxldCBkbHggPSBkeTtcbiAgICAgICAgbGV0IGRseSA9IC1keDtcbiAgICBcbiAgICAgICAgdGhpcy5fdnNldChweCArIGRseCAqIHcsIHB5ICsgZGx5ICogdywgMSk7XG4gICAgICAgIHRoaXMuX3ZzZXQocHggLSBkbHggKiB3LCBweSAtIGRseSAqIHcsIC0xKTtcbiAgICB9XG5cbiAgICBfYnV0dENhcEVuZCAocCwgZHgsIGR5LCB3LCBkKSB7XG4gICAgICAgIGxldCBweCA9IHAueCArIGR4ICogZDtcbiAgICAgICAgbGV0IHB5ID0gcC55ICsgZHkgKiBkO1xuICAgICAgICBsZXQgZGx4ID0gZHk7XG4gICAgICAgIGxldCBkbHkgPSAtZHg7XG4gICAgXG4gICAgICAgIHRoaXMuX3ZzZXQocHggKyBkbHggKiB3LCBweSArIGRseSAqIHcsIDEpO1xuICAgICAgICB0aGlzLl92c2V0KHB4IC0gZGx4ICogdywgcHkgLSBkbHkgKiB3LCAtMSk7XG4gICAgfVxuICAgIFxuICAgIF9yb3VuZENhcFN0YXJ0IChwLCBkeCwgZHksIHcsIG5jYXApIHtcbiAgICAgICAgbGV0IHB4ID0gcC54O1xuICAgICAgICBsZXQgcHkgPSBwLnk7XG4gICAgICAgIGxldCBkbHggPSBkeTtcbiAgICAgICAgbGV0IGRseSA9IC1keDtcbiAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuY2FwOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBhID0gaSAvIChuY2FwIC0gMSkgKiBQSTtcbiAgICAgICAgICAgIGxldCBheCA9IGNvcyhhKSAqIHcsXG4gICAgICAgICAgICAgICAgYXkgPSBzaW4oYSkgKiB3O1xuICAgICAgICAgICAgdGhpcy5fdnNldChweCAtIGRseCAqIGF4IC0gZHggKiBheSwgcHkgLSBkbHkgKiBheCAtIGR5ICogYXksIDEpO1xuICAgICAgICAgICAgdGhpcy5fdnNldChweCwgcHksIDApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ZzZXQocHggKyBkbHggKiB3LCBweSArIGRseSAqIHcsIDEpO1xuICAgICAgICB0aGlzLl92c2V0KHB4IC0gZGx4ICogdywgcHkgLSBkbHkgKiB3LCAtMSk7XG4gICAgfVxuICAgIFxuICAgIF9yb3VuZENhcEVuZCAocCwgZHgsIGR5LCB3LCBuY2FwKSB7XG4gICAgICAgIGxldCBweCA9IHAueDtcbiAgICAgICAgbGV0IHB5ID0gcC55O1xuICAgICAgICBsZXQgZGx4ID0gZHk7XG4gICAgICAgIGxldCBkbHkgPSAtZHg7XG4gICAgXG4gICAgICAgIHRoaXMuX3ZzZXQocHggKyBkbHggKiB3LCBweSArIGRseSAqIHcsIDEpO1xuICAgICAgICB0aGlzLl92c2V0KHB4IC0gZGx4ICogdywgcHkgLSBkbHkgKiB3LCAtMSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmNhcDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYSA9IGkgLyAobmNhcCAtIDEpICogUEk7XG4gICAgICAgICAgICBsZXQgYXggPSBjb3MoYSkgKiB3LFxuICAgICAgICAgICAgICAgIGF5ID0gc2luKGEpICogdztcbiAgICAgICAgICAgIHRoaXMuX3ZzZXQocHgsIHB5LCAwKTtcbiAgICAgICAgICAgIHRoaXMuX3ZzZXQocHggLSBkbHggKiBheCArIGR4ICogYXksIHB5IC0gZGx5ICogYXggKyBkeSAqIGF5LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBfcm91bmRKb2luIChwMCwgcDEsIGx3LCBydywgbmNhcCkge1xuICAgICAgICBsZXQgZGx4MCA9IHAwLmR5O1xuICAgICAgICBsZXQgZGx5MCA9IC1wMC5keDtcbiAgICAgICAgbGV0IGRseDEgPSBwMS5keTtcbiAgICAgICAgbGV0IGRseTEgPSAtcDEuZHg7XG4gICAgXG4gICAgICAgIGxldCBwMXggPSBwMS54O1xuICAgICAgICBsZXQgcDF5ID0gcDEueTtcbiAgICBcbiAgICAgICAgaWYgKChwMS5mbGFncyAmIFBvaW50RmxhZ3MuUFRfTEVGVCkgIT09IDApIHtcbiAgICAgICAgICAgIGxldCBvdXQgPSB0aGlzLl9jaG9vc2VCZXZlbChwMS5mbGFncyAmIFBvaW50RmxhZ3MuUFRfSU5ORVJCRVZFTCwgcDAsIHAxLCBsdyk7XG4gICAgICAgICAgICBsZXQgbHgwID0gb3V0WzBdO1xuICAgICAgICAgICAgbGV0IGx5MCA9IG91dFsxXTtcbiAgICAgICAgICAgIGxldCBseDEgPSBvdXRbMl07XG4gICAgICAgICAgICBsZXQgbHkxID0gb3V0WzNdO1xuICAgIFxuICAgICAgICAgICAgbGV0IGEwID0gYXRhbjIoLWRseTAsIC1kbHgwKTtcbiAgICAgICAgICAgIGxldCBhMSA9IGF0YW4yKC1kbHkxLCAtZGx4MSk7XG4gICAgICAgICAgICBpZiAoYTEgPiBhMCkgYTEgLT0gUEkgKiAyO1xuICAgIFxuICAgICAgICAgICAgdGhpcy5fdnNldChseDAsIGx5MCwgMSk7XG4gICAgICAgICAgICB0aGlzLl92c2V0KHAxeCAtIGRseDAgKiBydywgcDEueSAtIGRseTAgKiBydywgLTEpO1xuICAgIFxuICAgICAgICAgICAgbGV0IG4gPSBjbGFtcChjZWlsKChhMCAtIGExKSAvIFBJKSAqIG5jYXAsIDIsIG5jYXApO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgdSA9IGkgLyAobiAtIDEpO1xuICAgICAgICAgICAgICAgIGxldCBhID0gYTAgKyB1ICogKGExIC0gYTApO1xuICAgICAgICAgICAgICAgIGxldCByeCA9IHAxeCArIGNvcyhhKSAqIHJ3O1xuICAgICAgICAgICAgICAgIGxldCByeSA9IHAxeSArIHNpbihhKSAqIHJ3O1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZzZXQocDF4LCBwMXksIDApO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZzZXQocngsIHJ5LCAtMSk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB0aGlzLl92c2V0KGx4MSwgbHkxLCAxKTtcbiAgICAgICAgICAgIHRoaXMuX3ZzZXQocDF4IC0gZGx4MSAqIHJ3LCBwMXkgLSBkbHkxICogcncsIC0xKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBvdXQgPSB0aGlzLl9jaG9vc2VCZXZlbChwMS5mbGFncyAmIFBvaW50RmxhZ3MuUFRfSU5ORVJCRVZFTCwgcDAsIHAxLCAtcncpO1xuICAgICAgICAgICAgbGV0IHJ4MCA9IG91dFswXTtcbiAgICAgICAgICAgIGxldCByeTAgPSBvdXRbMV07XG4gICAgICAgICAgICBsZXQgcngxID0gb3V0WzJdO1xuICAgICAgICAgICAgbGV0IHJ5MSA9IG91dFszXTtcbiAgICBcbiAgICAgICAgICAgIGxldCBhMCA9IGF0YW4yKGRseTAsIGRseDApO1xuICAgICAgICAgICAgbGV0IGExID0gYXRhbjIoZGx5MSwgZGx4MSk7XG4gICAgICAgICAgICBpZiAoYTEgPCBhMCkgYTEgKz0gUEkgKiAyO1xuICAgIFxuICAgICAgICAgICAgdGhpcy5fdnNldChwMXggKyBkbHgwICogcncsIHAxeSArIGRseTAgKiBydywgMSk7XG4gICAgICAgICAgICB0aGlzLl92c2V0KHJ4MCwgcnkwLCAtMSk7XG4gICAgXG4gICAgICAgICAgICBsZXQgbiA9IGNsYW1wKGNlaWwoKGExIC0gYTApIC8gUEkpICogbmNhcCwgMiwgbmNhcCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB1ID0gaSAvIChuIC0gMSk7XG4gICAgICAgICAgICAgICAgbGV0IGEgPSBhMCArIHUgKiAoYTEgLSBhMCk7XG4gICAgICAgICAgICAgICAgbGV0IGx4ID0gcDF4ICsgY29zKGEpICogbHc7XG4gICAgICAgICAgICAgICAgbGV0IGx5ID0gcDF5ICsgc2luKGEpICogbHc7XG4gICAgICAgICAgICAgICAgdGhpcy5fdnNldChseCwgbHksIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZzZXQocDF4LCBwMXksIDApO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgdGhpcy5fdnNldChwMXggKyBkbHgxICogcncsIHAxeSArIGRseTEgKiBydywgMSk7XG4gICAgICAgICAgICB0aGlzLl92c2V0KHJ4MSwgcnkxLCAtMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgX2JldmVsSm9pbiAocDAsIHAxLCBsdywgcncpIHtcbiAgICAgICAgbGV0IHJ4MCwgcnkwLCByeDEsIHJ5MTtcbiAgICAgICAgbGV0IGx4MCwgbHkwLCBseDEsIGx5MTtcbiAgICAgICAgbGV0IGRseDAgPSBwMC5keTtcbiAgICAgICAgbGV0IGRseTAgPSAtcDAuZHg7XG4gICAgICAgIGxldCBkbHgxID0gcDEuZHk7XG4gICAgICAgIGxldCBkbHkxID0gLXAxLmR4O1xuICAgIFxuICAgICAgICBpZiAocDEuZmxhZ3MgJiBQb2ludEZsYWdzLlBUX0xFRlQpIHtcbiAgICAgICAgICAgIGxldCBvdXQgPSB0aGlzLl9jaG9vc2VCZXZlbChwMS5mbGFncyAmIFBvaW50RmxhZ3MuUFRfSU5ORVJCRVZFTCwgcDAsIHAxLCBsdyk7XG4gICAgICAgICAgICBseDAgPSBvdXRbMF07XG4gICAgICAgICAgICBseTAgPSBvdXRbMV07XG4gICAgICAgICAgICBseDEgPSBvdXRbMl07XG4gICAgICAgICAgICBseTEgPSBvdXRbM107XG4gICAgXG4gICAgICAgICAgICB0aGlzLl92c2V0KGx4MCwgbHkwLCAxKTtcbiAgICAgICAgICAgIHRoaXMuX3ZzZXQocDEueCAtIGRseDAgKiBydywgcDEueSAtIGRseTAgKiBydywgLTEpO1xuICAgIFxuICAgICAgICAgICAgdGhpcy5fdnNldChseDEsIGx5MSwgMSk7XG4gICAgICAgICAgICB0aGlzLl92c2V0KHAxLnggLSBkbHgxICogcncsIHAxLnkgLSBkbHkxICogcncsIC0xKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBvdXQgPSB0aGlzLl9jaG9vc2VCZXZlbChwMS5mbGFncyAmIFBvaW50RmxhZ3MuUFRfSU5ORVJCRVZFTCwgcDAsIHAxLCAtcncpO1xuICAgICAgICAgICAgcngwID0gb3V0WzBdO1xuICAgICAgICAgICAgcnkwID0gb3V0WzFdO1xuICAgICAgICAgICAgcngxID0gb3V0WzJdO1xuICAgICAgICAgICAgcnkxID0gb3V0WzNdO1xuICAgIFxuICAgICAgICAgICAgdGhpcy5fdnNldChwMS54ICsgZGx4MCAqIGx3LCBwMS55ICsgZGx5MCAqIGx3LCAxKTtcbiAgICAgICAgICAgIHRoaXMuX3ZzZXQocngwLCByeTAsIC0xKTtcbiAgICBcbiAgICAgICAgICAgIHRoaXMuX3ZzZXQocDEueCArIGRseDEgKiBsdywgcDEueSArIGRseTEgKiBsdywgMSk7XG4gICAgICAgICAgICB0aGlzLl92c2V0KHJ4MSwgcnkxLCAtMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgX3ZzZXQgKHgsIHksIGRpc3RhbmNlID0gMCkge1xuICAgICAgICBsZXQgYnVmZmVyID0gdGhpcy5fYnVmZmVyO1xuICAgICAgICBsZXQgbWVzaGJ1ZmZlciA9IGJ1ZmZlci5tZXNoYnVmZmVyO1xuICAgICAgICBsZXQgZGF0YU9mZnNldCA9IGJ1ZmZlci52ZXJ0ZXhTdGFydCAqIHRoaXMuZ2V0VmZtdEZsb2F0Q291bnQoKTtcblxuICAgICAgICBsZXQgdkRhdGEgPSBtZXNoYnVmZmVyLl92RGF0YTtcbiAgICAgICAgbGV0IHVpbnRWRGF0YSA9IG1lc2hidWZmZXIuX3VpbnRWRGF0YTtcblxuICAgICAgICB2RGF0YVtkYXRhT2Zmc2V0XSA9IHg7XG4gICAgICAgIHZEYXRhW2RhdGFPZmZzZXQrMV0gPSB5O1xuICAgICAgICB1aW50VkRhdGFbZGF0YU9mZnNldCsyXSA9IHRoaXMuX2N1ckNvbG9yO1xuICAgICAgICB2RGF0YVtkYXRhT2Zmc2V0KzNdID0gZGlzdGFuY2U7XG5cbiAgICAgICAgYnVmZmVyLnZlcnRleFN0YXJ0ICsrO1xuICAgICAgICBtZXNoYnVmZmVyLl9kaXJ0eSA9IHRydWU7XG4gICAgfVxufVxuXG5Bc3NlbWJsZXIucmVnaXN0ZXIoY2MuR3JhcGhpY3MsIEdyYXBoaWNzQXNzZW1ibGVyKTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9