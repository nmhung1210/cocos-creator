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
var PI_2 = Math.PI * 2;
var _vertPos = [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)];
var _vertices = [0, 0, 0, 0];
var _uvs = [0, 0, 0, 0, 0, 0, 0, 0];
var _intersectPoint_1 = [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)];
var _intersectPoint_2 = [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)];

var _center = cc.v2(0, 0);

var _triangles = [];
var _verts = [];

function _calcInsectedPoints(left, right, bottom, top, center, angle, intersectPoints) {
  //left bottom, right, top
  var sinAngle = Math.sin(angle);
  var cosAngle = Math.cos(angle);
  var tanAngle, cotAngle;

  if (Math.cos(angle) !== 0) {
    tanAngle = sinAngle / cosAngle; //calculate right and left

    if ((left - center.x) * cosAngle > 0) {
      var yleft = center.y + tanAngle * (left - center.x);
      intersectPoints[0].x = left;
      intersectPoints[0].y = yleft;
    }

    if ((right - center.x) * cosAngle > 0) {
      var yright = center.y + tanAngle * (right - center.x);
      intersectPoints[2].x = right;
      intersectPoints[2].y = yright;
    }
  }

  if (Math.sin(angle) !== 0) {
    cotAngle = cosAngle / sinAngle; //calculate  top and bottom

    if ((top - center.y) * sinAngle > 0) {
      var xtop = center.x + cotAngle * (top - center.y);
      intersectPoints[3].x = xtop;
      intersectPoints[3].y = top;
    }

    if ((bottom - center.y) * sinAngle > 0) {
      var xbottom = center.x + cotAngle * (bottom - center.y);
      intersectPoints[1].x = xbottom;
      intersectPoints[1].y = bottom;
    }
  }
}

function _calculateVertices(sprite) {
  var node = sprite.node,
      width = node.width,
      height = node.height,
      appx = node.anchorX * width,
      appy = node.anchorY * height;
  var l = -appx,
      b = -appy,
      r = width - appx,
      t = height - appy;
  var vertices = _vertices;
  vertices[0] = l;
  vertices[1] = b;
  vertices[2] = r;
  vertices[3] = t;
  var fillCenter = sprite._fillCenter,
      cx = _center.x = Math.min(Math.max(0, fillCenter.x), 1) * (r - l) + l,
      cy = _center.y = Math.min(Math.max(0, fillCenter.y), 1) * (t - b) + b;
  _vertPos[0].x = _vertPos[3].x = l;
  _vertPos[1].x = _vertPos[2].x = r;
  _vertPos[0].y = _vertPos[1].y = b;
  _vertPos[2].y = _vertPos[3].y = t;
  _triangles.length = 0;

  if (cx !== vertices[0]) {
    _triangles[0] = [3, 0];
  }

  if (cx !== vertices[2]) {
    _triangles[2] = [1, 2];
  }

  if (cy !== vertices[1]) {
    _triangles[1] = [0, 1];
  }

  if (cy !== vertices[3]) {
    _triangles[3] = [2, 3];
  }
}

function _calculateUVs(spriteFrame) {
  var atlasWidth = spriteFrame._texture.width;
  var atlasHeight = spriteFrame._texture.height;
  var textureRect = spriteFrame._rect;
  var u0, u1, v0, v1;
  var uvs = _uvs;

  if (spriteFrame._rotated) {
    u0 = textureRect.x / atlasWidth;
    u1 = (textureRect.x + textureRect.height) / atlasWidth;
    v0 = textureRect.y / atlasHeight;
    v1 = (textureRect.y + textureRect.width) / atlasHeight;
    uvs[0] = uvs[2] = u0;
    uvs[4] = uvs[6] = u1;
    uvs[3] = uvs[7] = v1;
    uvs[1] = uvs[5] = v0;
  } else {
    u0 = textureRect.x / atlasWidth;
    u1 = (textureRect.x + textureRect.width) / atlasWidth;
    v0 = textureRect.y / atlasHeight;
    v1 = (textureRect.y + textureRect.height) / atlasHeight;
    uvs[0] = uvs[4] = u0;
    uvs[2] = uvs[6] = u1;
    uvs[1] = uvs[3] = v1;
    uvs[5] = uvs[7] = v0;
  }
}

function _getVertAngle(start, end) {
  var placementX, placementY;
  placementX = end.x - start.x;
  placementY = end.y - start.y;

  if (placementX === 0 && placementY === 0) {
    return undefined;
  } else if (placementX === 0) {
    if (placementY > 0) {
      return Math.PI * 0.5;
    } else {
      return Math.PI * 1.5;
    }
  } else {
    var angle = Math.atan(placementY / placementX);

    if (placementX < 0) {
      angle += Math.PI;
    }

    return angle;
  }
}

function _generateTriangle(verts, offset, vert0, vert1, vert2) {
  var vertices = _vertices;
  var v0x = vertices[0];
  var v0y = vertices[1];
  var v1x = vertices[2];
  var v1y = vertices[3];
  verts[offset] = vert0.x;
  verts[offset + 1] = vert0.y;
  verts[offset + 5] = vert1.x;
  verts[offset + 6] = vert1.y;
  verts[offset + 10] = vert2.x;
  verts[offset + 11] = vert2.y;
  var progressX, progressY;
  progressX = (vert0.x - v0x) / (v1x - v0x);
  progressY = (vert0.y - v0y) / (v1y - v0y);

  _generateUV(progressX, progressY, verts, offset + 2);

  progressX = (vert1.x - v0x) / (v1x - v0x);
  progressY = (vert1.y - v0y) / (v1y - v0y);

  _generateUV(progressX, progressY, verts, offset + 7);

  progressX = (vert2.x - v0x) / (v1x - v0x);
  progressY = (vert2.y - v0y) / (v1y - v0y);

  _generateUV(progressX, progressY, verts, offset + 12);
}

function _generateUV(progressX, progressY, verts, offset) {
  var uvs = _uvs;
  var px1 = uvs[0] + (uvs[2] - uvs[0]) * progressX;
  var px2 = uvs[4] + (uvs[6] - uvs[4]) * progressX;
  var py1 = uvs[1] + (uvs[3] - uvs[1]) * progressX;
  var py2 = uvs[5] + (uvs[7] - uvs[5]) * progressX;
  verts[offset] = px1 + (px2 - px1) * progressY;
  verts[offset + 1] = py1 + (py2 - py1) * progressY;
}

cc.Sprite._assembler.radialFilled = {
  useModel: false,
  createData: function createData(sprite) {
    return sprite._renderHandle;
  },
  updateRenderData: function updateRenderData(sprite) {
    var frame = sprite.spriteFrame;
    var renderHandle = sprite._renderHandle;

    if (frame) {
      if (sprite._material._texture !== frame._texture) {
        sprite._activateMaterial();
      }

      renderHandle.updateMaterial(0, sprite._material);
    }

    if (frame && sprite._vertsDirty) {
      var fillStart = sprite._fillStart;
      var fillRange = sprite._fillRange;

      if (fillRange < 0) {
        fillStart += fillRange;
        fillRange = -fillRange;
      } //do round fill start [0,1), include 0, exclude 1


      while (fillStart >= 1.0) {
        fillStart -= 1.0;
      }

      while (fillStart < 0.0) {
        fillStart += 1.0;
      }

      fillStart *= PI_2;
      fillRange *= PI_2; //build vertices

      _calculateVertices(sprite); //build uvs


      _calculateUVs(frame);

      _calcInsectedPoints(_vertices[0], _vertices[2], _vertices[1], _vertices[3], _center, fillStart, _intersectPoint_1);

      _calcInsectedPoints(_vertices[0], _vertices[2], _vertices[1], _vertices[3], _center, fillStart + fillRange, _intersectPoint_2);

      this.updateVerts(fillStart, fillRange);
      this.fillVerts(sprite);
      sprite._vertsDirty = false;
    }

    _verts.length = 0;
  },
  updateVerts: function updateVerts(fillStart, fillRange) {
    var fillEnd = fillStart + fillRange;
    var offset = 0;
    var bytePerVertex = 3 * 5;

    for (var triangleIndex = 0; triangleIndex < 4; ++triangleIndex) {
      var triangle = _triangles[triangleIndex];

      if (!triangle) {
        continue;
      } //all in


      if (fillRange >= PI_2) {
        _verts.length = offset + bytePerVertex;

        _generateTriangle(_verts, offset, _center, _vertPos[triangle[0]], _vertPos[triangle[1]]);

        offset += bytePerVertex;
        continue;
      } //test against


      var startAngle = _getVertAngle(_center, _vertPos[triangle[0]]);

      var endAngle = _getVertAngle(_center, _vertPos[triangle[1]]);

      if (endAngle < startAngle) endAngle += PI_2;
      startAngle -= PI_2;
      endAngle -= PI_2; //testing

      for (var testIndex = 0; testIndex < 3; ++testIndex) {
        if (startAngle >= fillEnd) {//all out
        } else if (startAngle >= fillStart) {
          _verts.length = offset + bytePerVertex;

          if (endAngle >= fillEnd) {
            //startAngle to fillEnd
            _generateTriangle(_verts, offset, _center, _vertPos[triangle[0]], _intersectPoint_2[triangleIndex]);
          } else {
            //startAngle to endAngle
            _generateTriangle(_verts, offset, _center, _vertPos[triangle[0]], _vertPos[triangle[1]]);
          }

          offset += bytePerVertex;
        } else {
          //startAngle < fillStart
          if (endAngle <= fillStart) {//all out
          } else if (endAngle <= fillEnd) {
            _verts.length = offset + bytePerVertex; //fillStart to endAngle

            _generateTriangle(_verts, offset, _center, _intersectPoint_1[triangleIndex], _vertPos[triangle[1]]);

            offset += bytePerVertex;
          } else {
            _verts.length = offset + bytePerVertex; //fillStart to fillEnd

            _generateTriangle(_verts, offset, _center, _intersectPoint_1[triangleIndex], _intersectPoint_2[triangleIndex]);

            offset += bytePerVertex;
          }
        } //add 2 * PI


        startAngle += PI_2;
        endAngle += PI_2;
      }
    }
  },
  fillVerts: function fillVerts(sprite) {
    var color = sprite.node._color._val;
    var renderHandle = sprite._renderHandle;
    var count = _verts.length / 5; // update data property

    var vBytes = count * 5 * 4;
    var iBytes = count * 2;
    var needUpdateArray = false;

    if (!renderHandle.flexBuffer) {
      var bytes = 24 * (20 + 2);
      renderHandle.flexBuffer = new cc.FlexBuffer(bytes);
      needUpdateArray = true;
    }

    var buffer = renderHandle.flexBuffer.buffer;
    var vData = renderHandle.vDatas[0];

    if (needUpdateArray || !vData || vData.length != count) {
      var vertices = new Float32Array(buffer, 0, vBytes / 4);
      var indices = new Uint16Array(buffer, vBytes, iBytes / 2);

      for (var i = 0; i < count; i++) {
        indices[i] = i;
      }

      renderHandle.updateMesh(0, vertices, indices);
    }

    var verts = renderHandle.vDatas[0],
        uintVerts = renderHandle.uintVDatas[0];
    var vertexOffset = 0;

    for (var _i = 0; _i < count; _i++) {
      verts[vertexOffset] = _verts[vertexOffset];
      verts[vertexOffset + 1] = _verts[vertexOffset + 1];
      verts[vertexOffset + 2] = _verts[vertexOffset + 2];
      verts[vertexOffset + 3] = _verts[vertexOffset + 3];
      uintVerts[vertexOffset + 4] = color;
      vertexOffset += 5;
    }
  },
  updateColor: function updateColor(sprite, color) {
    var uintVerts = sprite._renderHandle.uintVDatas[0];

    if (uintVerts) {
      color = ((uintVerts[4] & 0xff000000) >>> 0 | color & 0x00ffffff) >>> 0;
      var length = uintVerts.length;

      for (var offset = 4; offset < length; offset += 5) {
        uintVerts[offset] = color;
      }
    }
  }
};