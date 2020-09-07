"use strict";

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
var PointFlags = cc.Graphics.Types.PointFlags;
var LineJoin = cc.Graphics.LineJoin;
var LineCap = cc.Graphics.LineCap;
var Earcut = cc.Graphics.earcut;
var Impl = cc.Graphics.Impl;
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
var abs = Math.abs;
var _renderData = null;
var _index = 0;
var _renderHandle = null;
var _impl = null;
var _curColor = 0;

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

cc.Graphics._assembler = {
  useModel: true,
  createImpl: function createImpl(graphics) {
    return new Impl(graphics);
  },
  updateRenderData: function updateRenderData(graphics) {
    var datas = graphics._impl.getRenderDatas(graphics);

    graphics._activateMaterial();

    for (var i = 0, l = datas.length; i < l; i++) {
      graphics._renderHandle.updateMaterial(i, graphics.getMaterial());
    }
  },
  genRenderData: function genRenderData(graphics, cverts) {
    var renderHandle = graphics._renderHandle;
    _impl = graphics._impl;

    var renderDatas = _impl.getRenderDatas(graphics, cverts);

    var renderData = renderDatas[_impl._dataOffset];
    var maxVertsCount = renderData.vertexStart + cverts;

    if (maxVertsCount > MAX_VERTEX || maxVertsCount * 3 > MAX_INDICE) {
      ++_impl._dataOffset;
      maxVertsCount = cverts;

      if (_impl._dataOffset < renderDatas.length) {
        renderData = renderDatas[_impl._dataOffset];
      } else {
        renderData = _impl.requestRenderData(graphics, cverts);
        renderDatas[_impl._dataOffset] = renderData;
      }
    }

    if (maxVertsCount > renderData.vertexOffset) {
      var vertices = _impl.reallocVData(graphics, _impl._dataOffset, cverts);

      var indices = _impl.reallocIData(graphics, _impl._dataOffset, cverts * 3);

      renderHandle.updateMesh(_impl._dataOffset, vertices, indices);
    }

    return renderData;
  },
  stroke: function stroke(graphics) {
    _curColor = graphics._strokeColor._val;
    _renderHandle = graphics._renderHandle;

    this._flattenPaths(graphics._impl);

    this._expandStroke(graphics);

    _renderHandle = null;
    graphics._impl._updatePathOffset = true;
  },
  fill: function fill(graphics) {
    _curColor = graphics._fillColor._val;
    _renderHandle = graphics._renderHandle;

    this._expandFill(graphics);

    _renderHandle = null;
    graphics._impl._updatePathOffset = true;
  },
  _expandStroke: function _expandStroke(graphics) {
    var w = graphics.lineWidth * 0.5,
        lineCap = graphics.lineCap,
        lineJoin = graphics.lineJoin,
        miterLimit = graphics.miterLimit;
    _impl = graphics._impl;
    var ncap = curveDivs(w, PI, _impl._tessTol);

    this._calculateJoins(_impl, w, lineJoin, miterLimit);

    var paths = _impl._paths; // Calculate max vertex usage.

    var cverts = 0;

    for (var i = _impl._pathOffset, l = _impl._pathLength; i < l; i++) {
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

    var renderData = _renderData = this.genRenderData(graphics, cverts),
        renderHandle = graphics._renderHandle,
        vData = renderHandle.vDatas[renderData.index],
        iData = renderHandle.iDatas[renderData.index];

    _index = renderData.index;

    for (var _i = _impl._pathOffset, _l = _impl._pathLength; _i < _l; _i++) {
      var _path = paths[_i];
      var pts = _path.points;
      var _pointsLength = pts.length;
      var offset = renderData.vertexStart;
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

      if (!loop) {
        // Add cap
        var dPos = p1.sub(p0);
        dPos.normalizeSelf();
        var dx = dPos.x;
        var dy = dPos.y;
        if (lineCap === LineCap.BUTT) this._buttCap(p0, dx, dy, w, 0);else if (lineCap === LineCap.SQUARE) this._buttCap(p0, dx, dy, w, w);else if (lineCap === LineCap.ROUND) this._roundCapStart(p0, dx, dy, w, ncap);
      }

      for (var j = start; j < end; ++j) {
        if (lineJoin === LineJoin.ROUND) {
          this._roundJoin(p0, p1, w, w, ncap);
        } else if ((p1.flags & (PointFlags.PT_BEVEL | PointFlags.PT_INNERBEVEL)) !== 0) {
          this._bevelJoin(p0, p1, w, w);
        } else {
          this._vset(p1.x + p1.dmx * w, p1.y + p1.dmy * w);

          this._vset(p1.x - p1.dmx * w, p1.y - p1.dmy * w);
        }

        p0 = p1;
        p1 = pts[j + 1];
      }

      if (loop) {
        // Loop it
        var vDataoOfset = offset * 3;

        this._vset(vData[vDataoOfset], vData[vDataoOfset + 1]);

        this._vset(vData[vDataoOfset + 3], vData[vDataoOfset + 4]);
      } else {
        // Add cap
        var _dPos = p1.sub(p0);

        _dPos.normalizeSelf();

        var _dx = _dPos.x;
        var _dy = _dPos.y;
        if (lineCap === LineCap.BUTT) this._buttCap(p1, _dx, _dy, w, 0);else if (lineCap === LineCap.BUTT || lineCap === LineCap.SQUARE) this._buttCap(p1, _dx, _dy, w, w);else if (lineCap === LineCap.ROUND) this._roundCapEnd(p1, _dx, _dy, w, ncap);
      } // stroke indices


      var indicesOffset = renderData.indiceStart;

      for (var _start = offset + 2, _end = renderData.vertexStart; _start < _end; _start++) {
        iData[indicesOffset++] = _start - 2;
        iData[indicesOffset++] = _start - 1;
        iData[indicesOffset++] = _start;
      }

      renderData.indiceStart = indicesOffset;
    }

    renderHandle.updateIAData(renderData.index, 0, renderData.indiceStart);
    _renderData = null;
    _impl = null;
  },
  _expandFill: function _expandFill(graphics) {
    _impl = graphics._impl;
    var paths = _impl._paths; // Calculate max vertex usage.

    var cverts = 0;

    for (var i = _impl._pathOffset, l = _impl._pathLength; i < l; i++) {
      var path = paths[i];
      var pointsLength = path.points.length;
      cverts += pointsLength;
    }

    var renderData = _renderData = this.genRenderData(graphics, cverts),
        renderHandle = graphics._renderHandle,
        vData = renderHandle.vDatas[renderData.index],
        iData = renderHandle.iDatas[renderData.index];

    _index = renderData.index;

    for (var _i2 = _impl._pathOffset, _l2 = _impl._pathLength; _i2 < _l2; _i2++) {
      var _path2 = paths[_i2];
      var pts = _path2.points;
      var _pointsLength2 = pts.length;

      if (_pointsLength2 === 0) {
        continue;
      } // Calculate shape vertices.


      var offset = renderData.vertexStart;

      for (var j = 0; j < _pointsLength2; ++j) {
        this._vset(pts[j].x, pts[j].y);
      }

      var indicesOffset = renderData.indiceStart;

      if (_path2.complex) {
        var earcutData = [];

        for (var _j = offset, end = renderData.vertexStart; _j < end; _j++) {
          var vDataOffset = _j * 3;
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

        for (var start = offset + 2, _end2 = renderData.vertexStart; start < _end2; start++) {
          iData[indicesOffset++] = first;
          iData[indicesOffset++] = start - 1;
          iData[indicesOffset++] = start;
        }
      }

      renderData.indiceStart = indicesOffset;
    }

    renderHandle.updateIAData(renderData.index, 0, renderData.indiceStart);
    _renderData = null;
    _impl = null;
  },
  _calculateJoins: function _calculateJoins(impl, w, lineJoin, miterLimit) {
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
  },
  _flattenPaths: function _flattenPaths(impl) {
    var paths = impl._paths;

    for (var i = impl._pathOffset, l = impl._pathLength; i < l; i++) {
      var path = paths[i];
      var pts = path.points;
      var p0 = pts[pts.length - 1];
      var p1 = pts[0];

      if (p0.equals(p1)) {
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
  },
  _chooseBevel: function _chooseBevel(bevel, p0, p1, w) {
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
  },
  _buttCap: function _buttCap(p, dx, dy, w, d) {
    var px = p.x - dx * d;
    var py = p.y - dy * d;
    var dlx = dy;
    var dly = -dx;

    this._vset(px + dlx * w, py + dly * w);

    this._vset(px - dlx * w, py - dly * w);
  },
  _roundCapStart: function _roundCapStart(p, dx, dy, w, ncap) {
    var px = p.x;
    var py = p.y;
    var dlx = dy;
    var dly = -dx;

    for (var i = 0; i < ncap; i++) {
      var a = i / (ncap - 1) * PI;
      var ax = cos(a) * w,
          ay = sin(a) * w;

      this._vset(px - dlx * ax - dx * ay, py - dly * ax - dy * ay);

      this._vset(px, py);
    }

    this._vset(px + dlx * w, py + dly * w);

    this._vset(px - dlx * w, py - dly * w);
  },
  _roundCapEnd: function _roundCapEnd(p, dx, dy, w, ncap) {
    var px = p.x;
    var py = p.y;
    var dlx = dy;
    var dly = -dx;

    this._vset(px + dlx * w, py + dly * w);

    this._vset(px - dlx * w, py - dly * w);

    for (var i = 0; i < ncap; i++) {
      var a = i / (ncap - 1) * PI;
      var ax = cos(a) * w,
          ay = sin(a) * w;

      this._vset(px, py);

      this._vset(px - dlx * ax + dx * ay, py - dly * ax + dy * ay);
    }
  },
  _roundJoin: function _roundJoin(p0, p1, lw, rw, ncap) {
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

      this._vset(lx0, ly0);

      this._vset(p1x - dlx0 * rw, p1.y - dly0 * rw);

      var n = clamp(ceil((a0 - a1) / PI) * ncap, 2, ncap);

      for (var i = 0; i < n; i++) {
        var u = i / (n - 1);
        var a = a0 + u * (a1 - a0);
        var rx = p1x + cos(a) * rw;
        var ry = p1y + sin(a) * rw;

        this._vset(p1x, p1y);

        this._vset(rx, ry);
      }

      this._vset(lx1, ly1);

      this._vset(p1x - dlx1 * rw, p1y - dly1 * rw);
    } else {
      var _out = this._chooseBevel(p1.flags & PointFlags.PT_INNERBEVEL, p0, p1, -rw);

      var rx0 = _out[0];
      var ry0 = _out[1];
      var rx1 = _out[2];
      var ry1 = _out[3];

      var _a = atan2(dly0, dlx0);

      var _a2 = atan2(dly1, dlx1);

      if (_a2 < _a) _a2 += PI * 2;

      this._vset(p1x + dlx0 * rw, p1y + dly0 * rw);

      this._vset(rx0, ry0);

      var _n = clamp(ceil((_a2 - _a) / PI) * ncap, 2, ncap);

      for (var _i3 = 0; _i3 < _n; _i3++) {
        var _u = _i3 / (_n - 1);

        var _a3 = _a + _u * (_a2 - _a);

        var lx = p1x + cos(_a3) * lw;
        var ly = p1y + sin(_a3) * lw;

        this._vset(lx, ly);

        this._vset(p1x, p1y);
      }

      this._vset(p1x + dlx1 * rw, p1y + dly1 * rw);

      this._vset(rx1, ry1);
    }
  },
  _bevelJoin: function _bevelJoin(p0, p1, lw, rw) {
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

      this._vset(lx0, ly0);

      this._vset(p1.x - dlx0 * rw, p1.y - dly0 * rw);

      this._vset(lx1, ly1);

      this._vset(p1.x - dlx1 * rw, p1.y - dly1 * rw);
    } else {
      var _out2 = this._chooseBevel(p1.flags & PointFlags.PT_INNERBEVEL, p0, p1, -rw);

      rx0 = _out2[0];
      ry0 = _out2[1];
      rx1 = _out2[2];
      ry1 = _out2[3];

      this._vset(p1.x + dlx0 * lw, p1.y + dly0 * lw);

      this._vset(rx0, ry0);

      this._vset(p1.x + dlx1 * lw, p1.y + dly1 * lw);

      this._vset(rx1, ry1);
    }
  },
  _vset: function _vset(x, y) {
    var dataOffset = _renderData.vertexStart * 3;
    var vData = _renderHandle.vDatas[_index];
    var uintVData = _renderHandle.uintVDatas[_index];
    vData[dataOffset] = x;
    vData[dataOffset + 1] = y;
    uintVData[dataOffset + 2] = _curColor;
    _renderData.vertexStart++;
  },
  updateColor: function updateColor() {}
};