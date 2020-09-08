
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/spine/spine-assembler.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _assembler = _interopRequireDefault(require("../../cocos2d/core/renderer/assembler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Skeleton = require('./Skeleton');

var spine = require('./lib/spine');

var RenderFlow = require('../../cocos2d/core/renderer/render-flow');

var VertexFormat = require('../../cocos2d/core/renderer/webgl/vertex-format');

var VFOneColor = VertexFormat.vfmtPosUvColor;
var VFTwoColor = VertexFormat.vfmtPosUvTwoColor;
var gfx = cc.gfx;
var FLAG_BATCH = 0x10;
var FLAG_TWO_COLOR = 0x01;
var _handleVal = 0x00;
var _quadTriangles = [0, 1, 2, 2, 3, 0];

var _slotColor = cc.color(0, 0, 255, 255);

var _boneColor = cc.color(255, 0, 0, 255);

var _originColor = cc.color(0, 255, 0, 255);

var _meshColor = cc.color(255, 255, 0, 255);

var _finalColor = null;
var _darkColor = null;
var _tempPos = null,
    _tempUv = null;

if (!CC_NATIVERENDERER) {
  _finalColor = new spine.Color(1, 1, 1, 1);
  _darkColor = new spine.Color(1, 1, 1, 1);
  _tempPos = new spine.Vector2();
  _tempUv = new spine.Vector2();
}

var _premultipliedAlpha;

var _multiplier;

var _slotRangeStart;

var _slotRangeEnd;

var _useTint;

var _debugSlots;

var _debugBones;

var _debugMesh;

var _nodeR, _nodeG, _nodeB, _nodeA;

var _finalColor32, _darkColor32;

var _vertexFormat;

var _perVertexSize;

var _perClipVertexSize;

var _vertexFloatCount = 0,
    _vertexCount = 0,
    _vertexFloatOffset = 0,
    _vertexOffset = 0,
    _indexCount = 0,
    _indexOffset = 0,
    _vfOffset = 0;

var _tempr, _tempg, _tempb;

var _inRange;

var _mustFlush;

var _x, _y, _m00, _m04, _m12, _m01, _m05, _m13;

var _r, _g, _b, _fr, _fg, _fb, _fa, _dr, _dg, _db, _da;

var _comp, _buffer, _renderer, _node, _needColor, _vertexEffect;

function _getSlotMaterial(tex, blendMode) {
  var src, dst;

  switch (blendMode) {
    case spine.BlendMode.Additive:
      src = _premultipliedAlpha ? cc.macro.ONE : cc.macro.SRC_ALPHA;
      dst = cc.macro.ONE;
      break;

    case spine.BlendMode.Multiply:
      src = cc.macro.DST_COLOR;
      dst = cc.macro.ONE_MINUS_SRC_ALPHA;
      break;

    case spine.BlendMode.Screen:
      src = cc.macro.ONE;
      dst = cc.macro.ONE_MINUS_SRC_COLOR;
      break;

    case spine.BlendMode.Normal:
    default:
      src = _premultipliedAlpha ? cc.macro.ONE : cc.macro.SRC_ALPHA;
      dst = cc.macro.ONE_MINUS_SRC_ALPHA;
      break;
  }

  var useModel = !_comp.enableBatch;
  var baseMaterial = _comp._materials[0];
  if (!baseMaterial) return null; // The key use to find corresponding material

  var key = tex.getId() + src + dst + _useTint + useModel;
  var materialCache = _comp._materialCache;
  var material = materialCache[key];

  if (!material) {
    if (!materialCache.baseMaterial) {
      material = baseMaterial;
      materialCache.baseMaterial = baseMaterial;
    } else {
      material = cc.MaterialVariant.create(baseMaterial);
    }

    material.define('CC_USE_MODEL', useModel);
    material.define('USE_TINT', _useTint); // update texture

    material.setProperty('texture', tex); // update blend function

    material.setBlend(true, gfx.BLEND_FUNC_ADD, src, dst, gfx.BLEND_FUNC_ADD, src, dst);
    materialCache[key] = material;
  }

  return material;
}

function _handleColor(color) {
  // temp rgb has multiply 255, so need divide 255;
  _fa = color.fa * _nodeA;
  _multiplier = _premultipliedAlpha ? _fa / 255 : 1;
  _r = _nodeR * _multiplier;
  _g = _nodeG * _multiplier;
  _b = _nodeB * _multiplier;
  _fr = color.fr * _r;
  _fg = color.fg * _g;
  _fb = color.fb * _b;
  _finalColor32 = (_fa << 24 >>> 0) + (_fb << 16) + (_fg << 8) + _fr;
  _dr = color.dr * _r;
  _dg = color.dg * _g;
  _db = color.db * _b;
  _da = _premultipliedAlpha ? 255 : 0;
  _darkColor32 = (_da << 24 >>> 0) + (_db << 16) + (_dg << 8) + _dr;
}

function _spineColorToInt32(spineColor) {
  return (spineColor.a << 24 >>> 0) + (spineColor.b << 16) + (spineColor.g << 8) + spineColor.r;
}

var SpineAssembler = /*#__PURE__*/function (_Assembler) {
  _inheritsLoose(SpineAssembler, _Assembler);

  function SpineAssembler() {
    return _Assembler.apply(this, arguments) || this;
  }

  var _proto = SpineAssembler.prototype;

  _proto.updateRenderData = function updateRenderData(comp) {
    if (comp.isAnimationCached()) return;
    var skeleton = comp._skeleton;

    if (skeleton) {
      skeleton.updateWorldTransform();
    }
  };

  _proto.fillVertices = function fillVertices(skeletonColor, attachmentColor, slotColor, clipper, slot) {
    var vbuf = _buffer._vData,
        ibuf = _buffer._iData,
        uintVData = _buffer._uintVData;
    var offsetInfo;
    _finalColor.a = slotColor.a * attachmentColor.a * skeletonColor.a * _nodeA * 255;
    _multiplier = _premultipliedAlpha ? _finalColor.a : 255;
    _tempr = _nodeR * attachmentColor.r * skeletonColor.r * _multiplier;
    _tempg = _nodeG * attachmentColor.g * skeletonColor.g * _multiplier;
    _tempb = _nodeB * attachmentColor.b * skeletonColor.b * _multiplier;
    _finalColor.r = _tempr * slotColor.r;
    _finalColor.g = _tempg * slotColor.g;
    _finalColor.b = _tempb * slotColor.b;

    if (slot.darkColor == null) {
      _darkColor.set(0.0, 0.0, 0.0, 1.0);
    } else {
      _darkColor.r = slot.darkColor.r * _tempr;
      _darkColor.g = slot.darkColor.g * _tempg;
      _darkColor.b = slot.darkColor.b * _tempb;
    }

    _darkColor.a = _premultipliedAlpha ? 255 : 0;

    if (!clipper.isClipping()) {
      if (_vertexEffect) {
        for (var v = _vertexFloatOffset, n = _vertexFloatOffset + _vertexFloatCount; v < n; v += _perVertexSize) {
          _tempPos.x = vbuf[v];
          _tempPos.y = vbuf[v + 1];
          _tempUv.x = vbuf[v + 2];
          _tempUv.y = vbuf[v + 3];

          _vertexEffect.transform(_tempPos, _tempUv, _finalColor, _darkColor);

          vbuf[v] = _tempPos.x; // x

          vbuf[v + 1] = _tempPos.y; // y

          vbuf[v + 2] = _tempUv.x; // u

          vbuf[v + 3] = _tempUv.y; // v

          uintVData[v + 4] = _spineColorToInt32(_finalColor); // light color

          _useTint && (uintVData[v + 5] = _spineColorToInt32(_darkColor)); // dark color
        }
      } else {
        _finalColor32 = _spineColorToInt32(_finalColor);
        _darkColor32 = _spineColorToInt32(_darkColor);

        for (var _v = _vertexFloatOffset, _n = _vertexFloatOffset + _vertexFloatCount; _v < _n; _v += _perVertexSize) {
          uintVData[_v + 4] = _finalColor32; // light color

          _useTint && (uintVData[_v + 5] = _darkColor32); // dark color
        }
      }
    } else {
      var uvs = vbuf.subarray(_vertexFloatOffset + 2);
      clipper.clipTriangles(vbuf.subarray(_vertexFloatOffset), _vertexFloatCount, ibuf.subarray(_indexOffset), _indexCount, uvs, _finalColor, _darkColor, _useTint, _perVertexSize);
      var clippedVertices = new Float32Array(clipper.clippedVertices);
      var clippedTriangles = clipper.clippedTriangles; // insure capacity

      _indexCount = clippedTriangles.length;
      _vertexFloatCount = clippedVertices.length / _perClipVertexSize * _perVertexSize;
      offsetInfo = _buffer.request(_vertexFloatCount / _perVertexSize, _indexCount);
      _indexOffset = offsetInfo.indiceOffset, _vertexOffset = offsetInfo.vertexOffset, _vertexFloatOffset = offsetInfo.byteOffset >> 2;
      vbuf = _buffer._vData, ibuf = _buffer._iData;
      uintVData = _buffer._uintVData; // fill indices

      ibuf.set(clippedTriangles, _indexOffset); // fill vertices contain x y u v light color dark color

      if (_vertexEffect) {
        for (var _v2 = 0, _n2 = clippedVertices.length, offset = _vertexFloatOffset; _v2 < _n2; _v2 += _perClipVertexSize, offset += _perVertexSize) {
          _tempPos.x = clippedVertices[_v2];
          _tempPos.y = clippedVertices[_v2 + 1];

          _finalColor.set(clippedVertices[_v2 + 2], clippedVertices[_v2 + 3], clippedVertices[_v2 + 4], clippedVertices[_v2 + 5]);

          _tempUv.x = clippedVertices[_v2 + 6];
          _tempUv.y = clippedVertices[_v2 + 7];

          if (_useTint) {
            _darkColor.set(clippedVertices[_v2 + 8], clippedVertices[_v2 + 9], clippedVertices[_v2 + 10], clippedVertices[_v2 + 11]);
          } else {
            _darkColor.set(0, 0, 0, 0);
          }

          _vertexEffect.transform(_tempPos, _tempUv, _finalColor, _darkColor);

          vbuf[offset] = _tempPos.x; // x

          vbuf[offset + 1] = _tempPos.y; // y

          vbuf[offset + 2] = _tempUv.x; // u

          vbuf[offset + 3] = _tempUv.y; // v

          uintVData[offset + 4] = _spineColorToInt32(_finalColor);

          if (_useTint) {
            uintVData[offset + 5] = _spineColorToInt32(_darkColor);
          }
        }
      } else {
        for (var _v3 = 0, _n3 = clippedVertices.length, _offset = _vertexFloatOffset; _v3 < _n3; _v3 += _perClipVertexSize, _offset += _perVertexSize) {
          vbuf[_offset] = clippedVertices[_v3]; // x

          vbuf[_offset + 1] = clippedVertices[_v3 + 1]; // y

          vbuf[_offset + 2] = clippedVertices[_v3 + 6]; // u

          vbuf[_offset + 3] = clippedVertices[_v3 + 7]; // v

          _finalColor32 = (clippedVertices[_v3 + 5] << 24 >>> 0) + (clippedVertices[_v3 + 4] << 16) + (clippedVertices[_v3 + 3] << 8) + clippedVertices[_v3 + 2];
          uintVData[_offset + 4] = _finalColor32;

          if (_useTint) {
            _darkColor32 = (clippedVertices[_v3 + 11] << 24 >>> 0) + (clippedVertices[_v3 + 10] << 16) + (clippedVertices[_v3 + 9] << 8) + clippedVertices[_v3 + 8];
            uintVData[_offset + 5] = _darkColor32;
          }
        }
      }
    }
  };

  _proto.realTimeTraverse = function realTimeTraverse(worldMat) {
    var vbuf;
    var ibuf;
    var locSkeleton = _comp._skeleton;
    var skeletonColor = locSkeleton.color;
    var graphics = _comp._debugRenderer;
    var clipper = _comp._clipper;
    var material = null;
    var attachment, attachmentColor, slotColor, uvs, triangles;
    var isRegion, isMesh, isClip;
    var offsetInfo;
    var slot;
    var worldMatm;
    _slotRangeStart = _comp._startSlotIndex;
    _slotRangeEnd = _comp._endSlotIndex;
    _inRange = false;
    if (_slotRangeStart == -1) _inRange = true;
    _debugSlots = _comp.debugSlots;
    _debugBones = _comp.debugBones;
    _debugMesh = _comp.debugMesh;

    if (graphics && (_debugBones || _debugSlots || _debugMesh)) {
      graphics.clear();
      graphics.lineWidth = 2;
    } // x y u v r1 g1 b1 a1 r2 g2 b2 a2 or x y u v r g b a 


    _perClipVertexSize = _useTint ? 12 : 8;
    _vertexFloatCount = 0;
    _vertexFloatOffset = 0;
    _vertexOffset = 0;
    _indexCount = 0;
    _indexOffset = 0;

    for (var slotIdx = 0, slotCount = locSkeleton.drawOrder.length; slotIdx < slotCount; slotIdx++) {
      slot = locSkeleton.drawOrder[slotIdx];

      if (slot == undefined) {
        continue;
      }

      if (_slotRangeStart >= 0 && _slotRangeStart == slot.data.index) {
        _inRange = true;
      }

      if (!_inRange) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      if (_slotRangeEnd >= 0 && _slotRangeEnd == slot.data.index) {
        _inRange = false;
      }

      _vertexFloatCount = 0;
      _indexCount = 0;
      attachment = slot.getAttachment();

      if (!attachment) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      isRegion = attachment instanceof spine.RegionAttachment;
      isMesh = attachment instanceof spine.MeshAttachment;
      isClip = attachment instanceof spine.ClippingAttachment;

      if (isClip) {
        clipper.clipStart(slot, attachment);
        continue;
      }

      if (!isRegion && !isMesh) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      material = _getSlotMaterial(attachment.region.texture._texture, slot.data.blendMode);

      if (!material) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      if (_mustFlush || material.getHash() !== _renderer.material.getHash()) {
        _mustFlush = false;

        _renderer._flush();

        _renderer.node = _node;
        _renderer.material = material;
      }

      if (isRegion) {
        triangles = _quadTriangles; // insure capacity

        _vertexFloatCount = 4 * _perVertexSize;
        _indexCount = 6;
        offsetInfo = _buffer.request(4, 6);
        _indexOffset = offsetInfo.indiceOffset, _vertexOffset = offsetInfo.vertexOffset, _vertexFloatOffset = offsetInfo.byteOffset >> 2;
        vbuf = _buffer._vData, ibuf = _buffer._iData; // compute vertex and fill x y

        attachment.computeWorldVertices(slot.bone, vbuf, _vertexFloatOffset, _perVertexSize); // draw debug slots if enabled graphics

        if (graphics && _debugSlots) {
          graphics.strokeColor = _slotColor;
          graphics.moveTo(vbuf[_vertexFloatOffset], vbuf[_vertexFloatOffset + 1]);

          for (var ii = _vertexFloatOffset + _perVertexSize, nn = _vertexFloatOffset + _vertexFloatCount; ii < nn; ii += _perVertexSize) {
            graphics.lineTo(vbuf[ii], vbuf[ii + 1]);
          }

          graphics.close();
          graphics.stroke();
        }
      } else if (isMesh) {
        triangles = attachment.triangles; // insure capacity

        _vertexFloatCount = (attachment.worldVerticesLength >> 1) * _perVertexSize;
        _indexCount = triangles.length;
        offsetInfo = _buffer.request(_vertexFloatCount / _perVertexSize, _indexCount);
        _indexOffset = offsetInfo.indiceOffset, _vertexOffset = offsetInfo.vertexOffset, _vertexFloatOffset = offsetInfo.byteOffset >> 2;
        vbuf = _buffer._vData, ibuf = _buffer._iData; // compute vertex and fill x y

        attachment.computeWorldVertices(slot, 0, attachment.worldVerticesLength, vbuf, _vertexFloatOffset, _perVertexSize); // draw debug mesh if enabled graphics

        if (graphics && _debugMesh) {
          graphics.strokeColor = _meshColor;

          for (var _ii = 0, _nn = triangles.length; _ii < _nn; _ii += 3) {
            var v1 = triangles[_ii] * _perVertexSize + _vertexFloatOffset;
            var v2 = triangles[_ii + 1] * _perVertexSize + _vertexFloatOffset;
            var v3 = triangles[_ii + 2] * _perVertexSize + _vertexFloatOffset;
            graphics.moveTo(vbuf[v1], vbuf[v1 + 1]);
            graphics.lineTo(vbuf[v2], vbuf[v2 + 1]);
            graphics.lineTo(vbuf[v3], vbuf[v3 + 1]);
            graphics.close();
            graphics.stroke();
          }
        }
      }

      if (_vertexFloatCount == 0 || _indexCount == 0) {
        clipper.clipEndWithSlot(slot);
        continue;
      } // fill indices


      ibuf.set(triangles, _indexOffset); // fill u v

      uvs = attachment.uvs;

      for (var v = _vertexFloatOffset, n = _vertexFloatOffset + _vertexFloatCount, u = 0; v < n; v += _perVertexSize, u += 2) {
        vbuf[v + 2] = uvs[u]; // u

        vbuf[v + 3] = uvs[u + 1]; // v
      }

      attachmentColor = attachment.color, slotColor = slot.color;
      this.fillVertices(skeletonColor, attachmentColor, slotColor, clipper, slot); // reset buffer pointer, because clipper maybe realloc a new buffer in file Vertices function.

      vbuf = _buffer._vData, ibuf = _buffer._iData;

      if (_indexCount > 0) {
        for (var _ii2 = _indexOffset, _nn2 = _indexOffset + _indexCount; _ii2 < _nn2; _ii2++) {
          ibuf[_ii2] += _vertexOffset;
        }

        if (worldMat) {
          worldMatm = worldMat.m;
          _m00 = worldMatm[0];
          _m04 = worldMatm[4];
          _m12 = worldMatm[12];
          _m01 = worldMatm[1];
          _m05 = worldMatm[5];
          _m13 = worldMatm[13];

          for (var _ii3 = _vertexFloatOffset, _nn3 = _vertexFloatOffset + _vertexFloatCount; _ii3 < _nn3; _ii3 += _perVertexSize) {
            _x = vbuf[_ii3];
            _y = vbuf[_ii3 + 1];
            vbuf[_ii3] = _x * _m00 + _y * _m04 + _m12;
            vbuf[_ii3 + 1] = _x * _m01 + _y * _m05 + _m13;
          }
        }

        _buffer.adjust(_vertexFloatCount / _perVertexSize, _indexCount);
      }

      clipper.clipEndWithSlot(slot);
    }

    clipper.clipEnd();

    if (graphics && _debugBones) {
      var bone;
      graphics.strokeColor = _boneColor;
      graphics.fillColor = _slotColor; // Root bone color is same as slot color.

      for (var i = 0, _n4 = locSkeleton.bones.length; i < _n4; i++) {
        bone = locSkeleton.bones[i];
        var x = bone.data.length * bone.a + bone.worldX;
        var y = bone.data.length * bone.c + bone.worldY; // Bone lengths.

        graphics.moveTo(bone.worldX, bone.worldY);
        graphics.lineTo(x, y);
        graphics.stroke(); // Bone origins.

        graphics.circle(bone.worldX, bone.worldY, Math.PI * 1.5);
        graphics.fill();

        if (i === 0) {
          graphics.fillColor = _originColor;
        }
      }
    }
  };

  _proto.cacheTraverse = function cacheTraverse(worldMat) {
    var frame = _comp._curFrame;
    if (!frame) return;
    var segments = frame.segments;
    if (segments.length == 0) return;
    var vbuf, ibuf, uintbuf;
    var material;
    var offsetInfo;
    var vertices = frame.vertices;
    var indices = frame.indices;
    var worldMatm;
    var frameVFOffset = 0,
        frameIndexOffset = 0,
        segVFCount = 0;

    if (worldMat) {
      worldMatm = worldMat.m;
      _m00 = worldMatm[0];
      _m01 = worldMatm[1];
      _m04 = worldMatm[4];
      _m05 = worldMatm[5];
      _m12 = worldMatm[12];
      _m13 = worldMatm[13];
    }

    var justTranslate = _m00 === 1 && _m01 === 0 && _m04 === 0 && _m05 === 1;
    var needBatch = _handleVal & FLAG_BATCH;
    var calcTranslate = needBatch && justTranslate;
    var colorOffset = 0;
    var colors = frame.colors;
    var nowColor = colors[colorOffset++];
    var maxVFOffset = nowColor.vfOffset;

    _handleColor(nowColor);

    for (var i = 0, n = segments.length; i < n; i++) {
      var segInfo = segments[i];
      material = _getSlotMaterial(segInfo.tex, segInfo.blendMode);
      if (!material) continue;

      if (_mustFlush || material.getHash() !== _renderer.material.getHash()) {
        _mustFlush = false;

        _renderer._flush();

        _renderer.node = _node;
        _renderer.material = material;
      }

      _vertexCount = segInfo.vertexCount;
      _indexCount = segInfo.indexCount;
      offsetInfo = _buffer.request(_vertexCount, _indexCount);
      _indexOffset = offsetInfo.indiceOffset;
      _vertexOffset = offsetInfo.vertexOffset;
      _vfOffset = offsetInfo.byteOffset >> 2;
      vbuf = _buffer._vData;
      ibuf = _buffer._iData;
      uintbuf = _buffer._uintVData;

      for (var ii = _indexOffset, il = _indexOffset + _indexCount; ii < il; ii++) {
        ibuf[ii] = _vertexOffset + indices[frameIndexOffset++];
      }

      segVFCount = segInfo.vfCount;
      vbuf.set(vertices.subarray(frameVFOffset, frameVFOffset + segVFCount), _vfOffset);
      frameVFOffset += segVFCount;

      if (calcTranslate) {
        for (var _ii4 = _vfOffset, _il = _vfOffset + segVFCount; _ii4 < _il; _ii4 += 6) {
          vbuf[_ii4] += _m12;
          vbuf[_ii4 + 1] += _m13;
        }
      } else if (needBatch) {
        for (var _ii5 = _vfOffset, _il2 = _vfOffset + segVFCount; _ii5 < _il2; _ii5 += 6) {
          _x = vbuf[_ii5];
          _y = vbuf[_ii5 + 1];
          vbuf[_ii5] = _x * _m00 + _y * _m04 + _m12;
          vbuf[_ii5 + 1] = _x * _m01 + _y * _m05 + _m13;
        }
      }

      _buffer.adjust(_vertexCount, _indexCount);

      if (!_needColor) continue; // handle color

      var frameColorOffset = frameVFOffset - segVFCount;

      for (var _ii6 = _vfOffset + 4, _il3 = _vfOffset + 4 + segVFCount; _ii6 < _il3; _ii6 += 6, frameColorOffset += 6) {
        if (frameColorOffset >= maxVFOffset) {
          nowColor = colors[colorOffset++];

          _handleColor(nowColor);

          maxVFOffset = nowColor.vfOffset;
        }

        uintbuf[_ii6] = _finalColor32;
        uintbuf[_ii6 + 1] = _darkColor32;
      }
    }
  };

  _proto.fillBuffers = function fillBuffers(comp, renderer) {
    var node = comp.node;
    node._renderFlag |= RenderFlow.FLAG_UPDATE_RENDER_DATA;
    if (!comp._skeleton) return;
    var nodeColor = node._color;
    _nodeR = nodeColor.r / 255;
    _nodeG = nodeColor.g / 255;
    _nodeB = nodeColor.b / 255;
    _nodeA = nodeColor.a / 255;
    _useTint = comp.useTint || comp.isAnimationCached();
    _vertexFormat = _useTint ? VFTwoColor : VFOneColor; // x y u v color1 color2 or x y u v color

    _perVertexSize = _useTint ? 6 : 5;
    _node = comp.node;
    _buffer = renderer.getBuffer('spine', _vertexFormat);
    _renderer = renderer;
    _comp = comp;
    _mustFlush = true;
    _premultipliedAlpha = comp.premultipliedAlpha;
    _multiplier = 1.0;
    _handleVal = 0x00;
    _needColor = false;
    _vertexEffect = comp._effectDelegate && comp._effectDelegate._vertexEffect;

    if (nodeColor._val !== 0xffffffff || _premultipliedAlpha) {
      _needColor = true;
    }

    if (_useTint) {
      _handleVal |= FLAG_TWO_COLOR;
    }

    var worldMat = undefined;

    if (_comp.enableBatch) {
      worldMat = _node._worldMatrix;
      _mustFlush = false;
      _handleVal |= FLAG_BATCH;
    }

    if (comp.isAnimationCached()) {
      // Traverse input assembler.
      this.cacheTraverse(worldMat);
    } else {
      if (_vertexEffect) _vertexEffect.begin(comp._skeleton);
      this.realTimeTraverse(worldMat);
      if (_vertexEffect) _vertexEffect.end();
    } // sync attached node matrix


    renderer.worldMatDirty++;

    comp.attachUtil._syncAttachedNode(); // Clear temp var.


    _node = undefined;
    _buffer = undefined;
    _renderer = undefined;
    _comp = undefined;
    _vertexEffect = null;
  };

  _proto.postFillBuffers = function postFillBuffers(comp, renderer) {
    renderer.worldMatDirty--;
  };

  return SpineAssembler;
}(_assembler["default"]);

exports["default"] = SpineAssembler;

_assembler["default"].register(Skeleton, SpineAssembler);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvZXh0ZW5zaW9ucy9zcGluZS9zcGluZS1hc3NlbWJsZXIuanMiXSwibmFtZXMiOlsiU2tlbGV0b24iLCJyZXF1aXJlIiwic3BpbmUiLCJSZW5kZXJGbG93IiwiVmVydGV4Rm9ybWF0IiwiVkZPbmVDb2xvciIsInZmbXRQb3NVdkNvbG9yIiwiVkZUd29Db2xvciIsInZmbXRQb3NVdlR3b0NvbG9yIiwiZ2Z4IiwiY2MiLCJGTEFHX0JBVENIIiwiRkxBR19UV09fQ09MT1IiLCJfaGFuZGxlVmFsIiwiX3F1YWRUcmlhbmdsZXMiLCJfc2xvdENvbG9yIiwiY29sb3IiLCJfYm9uZUNvbG9yIiwiX29yaWdpbkNvbG9yIiwiX21lc2hDb2xvciIsIl9maW5hbENvbG9yIiwiX2RhcmtDb2xvciIsIl90ZW1wUG9zIiwiX3RlbXBVdiIsIkNDX05BVElWRVJFTkRFUkVSIiwiQ29sb3IiLCJWZWN0b3IyIiwiX3ByZW11bHRpcGxpZWRBbHBoYSIsIl9tdWx0aXBsaWVyIiwiX3Nsb3RSYW5nZVN0YXJ0IiwiX3Nsb3RSYW5nZUVuZCIsIl91c2VUaW50IiwiX2RlYnVnU2xvdHMiLCJfZGVidWdCb25lcyIsIl9kZWJ1Z01lc2giLCJfbm9kZVIiLCJfbm9kZUciLCJfbm9kZUIiLCJfbm9kZUEiLCJfZmluYWxDb2xvcjMyIiwiX2RhcmtDb2xvcjMyIiwiX3ZlcnRleEZvcm1hdCIsIl9wZXJWZXJ0ZXhTaXplIiwiX3BlckNsaXBWZXJ0ZXhTaXplIiwiX3ZlcnRleEZsb2F0Q291bnQiLCJfdmVydGV4Q291bnQiLCJfdmVydGV4RmxvYXRPZmZzZXQiLCJfdmVydGV4T2Zmc2V0IiwiX2luZGV4Q291bnQiLCJfaW5kZXhPZmZzZXQiLCJfdmZPZmZzZXQiLCJfdGVtcHIiLCJfdGVtcGciLCJfdGVtcGIiLCJfaW5SYW5nZSIsIl9tdXN0Rmx1c2giLCJfeCIsIl95IiwiX20wMCIsIl9tMDQiLCJfbTEyIiwiX20wMSIsIl9tMDUiLCJfbTEzIiwiX3IiLCJfZyIsIl9iIiwiX2ZyIiwiX2ZnIiwiX2ZiIiwiX2ZhIiwiX2RyIiwiX2RnIiwiX2RiIiwiX2RhIiwiX2NvbXAiLCJfYnVmZmVyIiwiX3JlbmRlcmVyIiwiX25vZGUiLCJfbmVlZENvbG9yIiwiX3ZlcnRleEVmZmVjdCIsIl9nZXRTbG90TWF0ZXJpYWwiLCJ0ZXgiLCJibGVuZE1vZGUiLCJzcmMiLCJkc3QiLCJCbGVuZE1vZGUiLCJBZGRpdGl2ZSIsIm1hY3JvIiwiT05FIiwiU1JDX0FMUEhBIiwiTXVsdGlwbHkiLCJEU1RfQ09MT1IiLCJPTkVfTUlOVVNfU1JDX0FMUEhBIiwiU2NyZWVuIiwiT05FX01JTlVTX1NSQ19DT0xPUiIsIk5vcm1hbCIsInVzZU1vZGVsIiwiZW5hYmxlQmF0Y2giLCJiYXNlTWF0ZXJpYWwiLCJfbWF0ZXJpYWxzIiwia2V5IiwiZ2V0SWQiLCJtYXRlcmlhbENhY2hlIiwiX21hdGVyaWFsQ2FjaGUiLCJtYXRlcmlhbCIsIk1hdGVyaWFsVmFyaWFudCIsImNyZWF0ZSIsImRlZmluZSIsInNldFByb3BlcnR5Iiwic2V0QmxlbmQiLCJCTEVORF9GVU5DX0FERCIsIl9oYW5kbGVDb2xvciIsImZhIiwiZnIiLCJmZyIsImZiIiwiZHIiLCJkZyIsImRiIiwiX3NwaW5lQ29sb3JUb0ludDMyIiwic3BpbmVDb2xvciIsImEiLCJiIiwiZyIsInIiLCJTcGluZUFzc2VtYmxlciIsInVwZGF0ZVJlbmRlckRhdGEiLCJjb21wIiwiaXNBbmltYXRpb25DYWNoZWQiLCJza2VsZXRvbiIsIl9za2VsZXRvbiIsInVwZGF0ZVdvcmxkVHJhbnNmb3JtIiwiZmlsbFZlcnRpY2VzIiwic2tlbGV0b25Db2xvciIsImF0dGFjaG1lbnRDb2xvciIsInNsb3RDb2xvciIsImNsaXBwZXIiLCJzbG90IiwidmJ1ZiIsIl92RGF0YSIsImlidWYiLCJfaURhdGEiLCJ1aW50VkRhdGEiLCJfdWludFZEYXRhIiwib2Zmc2V0SW5mbyIsImRhcmtDb2xvciIsInNldCIsImlzQ2xpcHBpbmciLCJ2IiwibiIsIngiLCJ5IiwidHJhbnNmb3JtIiwidXZzIiwic3ViYXJyYXkiLCJjbGlwVHJpYW5nbGVzIiwiY2xpcHBlZFZlcnRpY2VzIiwiRmxvYXQzMkFycmF5IiwiY2xpcHBlZFRyaWFuZ2xlcyIsImxlbmd0aCIsInJlcXVlc3QiLCJpbmRpY2VPZmZzZXQiLCJ2ZXJ0ZXhPZmZzZXQiLCJieXRlT2Zmc2V0Iiwib2Zmc2V0IiwicmVhbFRpbWVUcmF2ZXJzZSIsIndvcmxkTWF0IiwibG9jU2tlbGV0b24iLCJncmFwaGljcyIsIl9kZWJ1Z1JlbmRlcmVyIiwiX2NsaXBwZXIiLCJhdHRhY2htZW50IiwidHJpYW5nbGVzIiwiaXNSZWdpb24iLCJpc01lc2giLCJpc0NsaXAiLCJ3b3JsZE1hdG0iLCJfc3RhcnRTbG90SW5kZXgiLCJfZW5kU2xvdEluZGV4IiwiZGVidWdTbG90cyIsImRlYnVnQm9uZXMiLCJkZWJ1Z01lc2giLCJjbGVhciIsImxpbmVXaWR0aCIsInNsb3RJZHgiLCJzbG90Q291bnQiLCJkcmF3T3JkZXIiLCJ1bmRlZmluZWQiLCJkYXRhIiwiaW5kZXgiLCJjbGlwRW5kV2l0aFNsb3QiLCJnZXRBdHRhY2htZW50IiwiUmVnaW9uQXR0YWNobWVudCIsIk1lc2hBdHRhY2htZW50IiwiQ2xpcHBpbmdBdHRhY2htZW50IiwiY2xpcFN0YXJ0IiwicmVnaW9uIiwidGV4dHVyZSIsIl90ZXh0dXJlIiwiZ2V0SGFzaCIsIl9mbHVzaCIsIm5vZGUiLCJjb21wdXRlV29ybGRWZXJ0aWNlcyIsImJvbmUiLCJzdHJva2VDb2xvciIsIm1vdmVUbyIsImlpIiwibm4iLCJsaW5lVG8iLCJjbG9zZSIsInN0cm9rZSIsIndvcmxkVmVydGljZXNMZW5ndGgiLCJ2MSIsInYyIiwidjMiLCJ1IiwibSIsImFkanVzdCIsImNsaXBFbmQiLCJmaWxsQ29sb3IiLCJpIiwiYm9uZXMiLCJ3b3JsZFgiLCJjIiwid29ybGRZIiwiY2lyY2xlIiwiTWF0aCIsIlBJIiwiZmlsbCIsImNhY2hlVHJhdmVyc2UiLCJmcmFtZSIsIl9jdXJGcmFtZSIsInNlZ21lbnRzIiwidWludGJ1ZiIsInZlcnRpY2VzIiwiaW5kaWNlcyIsImZyYW1lVkZPZmZzZXQiLCJmcmFtZUluZGV4T2Zmc2V0Iiwic2VnVkZDb3VudCIsImp1c3RUcmFuc2xhdGUiLCJuZWVkQmF0Y2giLCJjYWxjVHJhbnNsYXRlIiwiY29sb3JPZmZzZXQiLCJjb2xvcnMiLCJub3dDb2xvciIsIm1heFZGT2Zmc2V0IiwidmZPZmZzZXQiLCJzZWdJbmZvIiwidmVydGV4Q291bnQiLCJpbmRleENvdW50IiwiaWwiLCJ2ZkNvdW50IiwiZnJhbWVDb2xvck9mZnNldCIsImZpbGxCdWZmZXJzIiwicmVuZGVyZXIiLCJfcmVuZGVyRmxhZyIsIkZMQUdfVVBEQVRFX1JFTkRFUl9EQVRBIiwibm9kZUNvbG9yIiwiX2NvbG9yIiwidXNlVGludCIsImdldEJ1ZmZlciIsInByZW11bHRpcGxpZWRBbHBoYSIsIl9lZmZlY3REZWxlZ2F0ZSIsIl92YWwiLCJfd29ybGRNYXRyaXgiLCJiZWdpbiIsImVuZCIsIndvcmxkTWF0RGlydHkiLCJhdHRhY2hVdGlsIiwiX3N5bmNBdHRhY2hlZE5vZGUiLCJwb3N0RmlsbEJ1ZmZlcnMiLCJBc3NlbWJsZXIiLCJyZWdpc3RlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7Ozs7O0FBRUEsSUFBTUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUF4Qjs7QUFDQSxJQUFNQyxLQUFLLEdBQUdELE9BQU8sQ0FBQyxhQUFELENBQXJCOztBQUNBLElBQU1FLFVBQVUsR0FBR0YsT0FBTyxDQUFDLHlDQUFELENBQTFCOztBQUNBLElBQU1HLFlBQVksR0FBR0gsT0FBTyxDQUFDLGlEQUFELENBQTVCOztBQUNBLElBQU1JLFVBQVUsR0FBR0QsWUFBWSxDQUFDRSxjQUFoQztBQUNBLElBQU1DLFVBQVUsR0FBR0gsWUFBWSxDQUFDSSxpQkFBaEM7QUFDQSxJQUFNQyxHQUFHLEdBQUdDLEVBQUUsQ0FBQ0QsR0FBZjtBQUVBLElBQU1FLFVBQVUsR0FBRyxJQUFuQjtBQUNBLElBQU1DLGNBQWMsR0FBRyxJ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SSxJQUFqQixFQUF1QitILFFBQXZCLEVBQWlDO0FBQzdCQSxJQUFBQSxRQUFRLENBQUNhLGFBQVQ7QUFDSDs7O0VBNWdCdUNJOzs7O0FBK2dCNUNBLHNCQUFVQyxRQUFWLENBQW1CalIsUUFBbkIsRUFBNkI4SCxjQUE3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBBc3NlbWJsZXIgZnJvbSAnLi4vLi4vY29jb3MyZC9jb3JlL3JlbmRlcmVyL2Fzc2VtYmxlcic7XG5cbmNvbnN0IFNrZWxldG9uID0gcmVxdWlyZSgnLi9Ta2VsZXRvbicpO1xuY29uc3Qgc3BpbmUgPSByZXF1aXJlKCcuL2xpYi9zcGluZScpO1xuY29uc3QgUmVuZGVyRmxvdyA9IHJlcXVpcmUoJy4uLy4uL2NvY29zMmQvY29yZS9yZW5kZXJlci9yZW5kZXItZmxvdycpO1xuY29uc3QgVmVydGV4Rm9ybWF0ID0gcmVxdWlyZSgnLi4vLi4vY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL3ZlcnRleC1mb3JtYXQnKVxuY29uc3QgVkZPbmVDb2xvciA9IFZlcnRleEZvcm1hdC52Zm10UG9zVXZDb2xvcjtcbmNvbnN0IFZGVHdvQ29sb3IgPSBWZXJ0ZXhGb3JtYXQudmZtdFBvc1V2VHdvQ29sb3I7XG5jb25zdCBnZnggPSBjYy5nZng7XG5cbmNvbnN0IEZMQUdfQkFUQ0ggPSAweDEwO1xuY29uc3QgRkxBR19UV09fQ09MT1IgPSAweDAxO1xuXG5sZXQgX2hhbmRsZVZhbCA9IDB4MDA7XG5sZXQgX3F1YWRUcmlhbmdsZXMgPSBbMCwgMSwgMiwgMiwgMywgMF07XG5sZXQgX3Nsb3RDb2xvciA9IGNjLmNvbG9yKDAsIDAsIDI1NSwgMjU1KTtcbmxldCBfYm9uZUNvbG9yID0gY2MuY29sb3IoMjU1LCAwLCAwLCAyNTUpO1xubGV0IF9vcmlnaW5Db2xvciA9IGNjLmNvbG9yKDAsIDI1NSwgMCwgMjU1KTtcbmxldCBfbWVzaENvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDAsIDI1NSk7XG5cbmxldCBfZmluYWxDb2xvciA9IG51bGw7XG5sZXQgX2RhcmtDb2xvciA9IG51bGw7XG5sZXQgX3RlbXBQb3MgPSBudWxsLCBfdGVtcFV2ID0gbnVsbDtcbmlmICghQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICBfZmluYWxDb2xvciA9IG5ldyBzcGluZS5Db2xvcigxLCAxLCAxLCAxKTtcbiAgICBfZGFya0NvbG9yID0gbmV3IHNwaW5lLkNvbG9yKDEsIDEsIDEsIDEpO1xuICAgIF90ZW1wUG9zID0gbmV3IHNwaW5lLlZlY3RvcjIoKTtcbiAgICBfdGVtcFV2ID0gbmV3IHNwaW5lLlZlY3RvcjIoKTtcbn1cblxubGV0IF9wcmVtdWx0aXBsaWVkQWxwaGE7XG5sZXQgX211bHRpcGxpZXI7XG5sZXQgX3Nsb3RSYW5nZVN0YXJ0O1xubGV0IF9zbG90UmFuZ2VFbmQ7XG5sZXQgX3VzZVRpbnQ7XG5sZXQgX2RlYnVnU2xvdHM7XG5sZXQgX2RlYnVnQm9uZXM7XG5sZXQgX2RlYnVnTWVzaDtcbmxldCBfbm9kZVIsXG4gICAgX25vZGVHLFxuICAgIF9ub2RlQixcbiAgICBfbm9kZUE7XG5sZXQgX2ZpbmFsQ29sb3IzMiwgX2RhcmtDb2xvcjMyO1xubGV0IF92ZXJ0ZXhGb3JtYXQ7XG5sZXQgX3BlclZlcnRleFNpemU7XG5sZXQgX3BlckNsaXBWZXJ0ZXhTaXplO1xuXG5sZXQgX3ZlcnRleEZsb2F0Q291bnQgPSAwLCBfdmVydGV4Q291bnQgPSAwLCBfdmVydGV4RmxvYXRPZmZzZXQgPSAwLCBfdmVydGV4T2Zmc2V0ID0gMCxcbiAgICBfaW5kZXhDb3VudCA9IDAsIF9pbmRleE9mZnNldCA9IDAsIF92Zk9mZnNldCA9IDA7XG5sZXQgX3RlbXByLCBfdGVtcGcsIF90ZW1wYjtcbmxldCBfaW5SYW5nZTtcbmxldCBfbXVzdEZsdXNoO1xubGV0IF94LCBfeSwgX20wMCwgX20wNCwgX20xMiwgX20wMSwgX20wNSwgX20xMztcbmxldCBfciwgX2csIF9iLCBfZnIsIF9mZywgX2ZiLCBfZmEsIF9kciwgX2RnLCBfZGIsIF9kYTtcbmxldCBfY29tcCwgX2J1ZmZlciwgX3JlbmRlcmVyLCBfbm9kZSwgX25lZWRDb2xvciwgX3ZlcnRleEVmZmVjdDtcblxuZnVuY3Rpb24gX2dldFNsb3RNYXRlcmlhbCAodGV4LCBibGVuZE1vZGUpIHtcbiAgICBsZXQgc3JjLCBkc3Q7XG4gICAgc3dpdGNoIChibGVuZE1vZGUpIHtcbiAgICAgICAgY2FzZSBzcGluZS5CbGVuZE1vZGUuQWRkaXRpdmU6XG4gICAgICAgICAgICBzcmMgPSBfcHJlbXVsdGlwbGllZEFscGhhID8gY2MubWFjcm8uT05FIDogY2MubWFjcm8uU1JDX0FMUEhBO1xuICAgICAgICAgICAgZHN0ID0gY2MubWFjcm8uT05FO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Ugc3BpbmUuQmxlbmRNb2RlLk11bHRpcGx5OlxuICAgICAgICAgICAgc3JjID0gY2MubWFjcm8uRFNUX0NPTE9SO1xuICAgICAgICAgICAgZHN0ID0gY2MubWFjcm8uT05FX01JTlVTX1NSQ19BTFBIQTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHNwaW5lLkJsZW5kTW9kZS5TY3JlZW46XG4gICAgICAgICAgICBzcmMgPSBjYy5tYWNyby5PTkU7XG4gICAgICAgICAgICBkc3QgPSBjYy5tYWNyby5PTkVfTUlOVVNfU1JDX0NPTE9SO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Ugc3BpbmUuQmxlbmRNb2RlLk5vcm1hbDpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHNyYyA9IF9wcmVtdWx0aXBsaWVkQWxwaGEgPyBjYy5tYWNyby5PTkUgOiBjYy5tYWNyby5TUkNfQUxQSEE7XG4gICAgICAgICAgICBkc3QgPSBjYy5tYWNyby5PTkVfTUlOVVNfU1JDX0FMUEhBO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgbGV0IHVzZU1vZGVsID0gIV9jb21wLmVuYWJsZUJhdGNoO1xuICAgIGxldCBiYXNlTWF0ZXJpYWwgPSBfY29tcC5fbWF0ZXJpYWxzWzBdO1xuICAgIGlmICghYmFzZU1hdGVyaWFsKSByZXR1cm4gbnVsbDtcblxuICAgIC8vIFRoZSBrZXkgdXNlIHRvIGZpbmQgY29ycmVzcG9uZGluZyBtYXRlcmlhbFxuICAgIGxldCBrZXkgPSB0ZXguZ2V0SWQoKSArIHNyYyArIGRzdCArIF91c2VUaW50ICsgdXNlTW9kZWw7XG4gICAgbGV0IG1hdGVyaWFsQ2FjaGUgPSBfY29tcC5fbWF0ZXJpYWxDYWNoZTtcbiAgICBsZXQgbWF0ZXJpYWwgPSBtYXRlcmlhbENhY2hlW2tleV07XG4gICAgaWYgKCFtYXRlcmlhbCkge1xuICAgICAgICBpZiAoIW1hdGVyaWFsQ2FjaGUuYmFzZU1hdGVyaWFsKSB7XG4gICAgICAgICAgICBtYXRlcmlhbCA9IGJhc2VNYXRlcmlhbDtcbiAgICAgICAgICAgIG1hdGVyaWFsQ2FjaGUuYmFzZU1hdGVyaWFsID0gYmFzZU1hdGVyaWFsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWF0ZXJpYWwgPSBjYy5NYXRlcmlhbFZhcmlhbnQuY3JlYXRlKGJhc2VNYXRlcmlhbCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIG1hdGVyaWFsLmRlZmluZSgnQ0NfVVNFX01PREVMJywgdXNlTW9kZWwpO1xuICAgICAgICBtYXRlcmlhbC5kZWZpbmUoJ1VTRV9USU5UJywgX3VzZVRpbnQpO1xuICAgICAgICAvLyB1cGRhdGUgdGV4dHVyZVxuICAgICAgICBtYXRlcmlhbC5zZXRQcm9wZXJ0eSgndGV4dHVyZScsIHRleCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIGJsZW5kIGZ1bmN0aW9uXG4gICAgICAgIG1hdGVyaWFsLnNldEJsZW5kKFxuICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIGdmeC5CTEVORF9GVU5DX0FERCxcbiAgICAgICAgICAgIHNyYywgZHN0LFxuICAgICAgICAgICAgZ2Z4LkJMRU5EX0ZVTkNfQURELFxuICAgICAgICAgICAgc3JjLCBkc3RcbiAgICAgICAgKTtcbiAgICAgICAgbWF0ZXJpYWxDYWNoZVtrZXldID0gbWF0ZXJpYWw7XG4gICAgfVxuICAgIHJldHVybiBtYXRlcmlhbDtcbn1cblxuZnVuY3Rpb24gX2hhbmRsZUNvbG9yIChjb2xvcikge1xuICAgIC8vIHRlbXAgcmdiIGhhcyBtdWx0aXBseSAyNTUsIHNvIG5lZWQgZGl2aWRlIDI1NTtcbiAgICBfZmEgPSBjb2xvci5mYSAqIF9ub2RlQTtcbiAgICBfbXVsdGlwbGllciA9IF9wcmVtdWx0aXBsaWVkQWxwaGEgPyBfZmEgLyAyNTUgOiAxO1xuICAgIF9yID0gX25vZGVSICogX211bHRpcGxpZXI7XG4gICAgX2cgPSBfbm9kZUcgKiBfbXVsdGlwbGllcjtcbiAgICBfYiA9IF9ub2RlQiAqIF9tdWx0aXBsaWVyO1xuXG4gICAgX2ZyID0gY29sb3IuZnIgKiBfcjtcbiAgICBfZmcgPSBjb2xvci5mZyAqIF9nO1xuICAgIF9mYiA9IGNvbG9yLmZiICogX2I7XG4gICAgX2ZpbmFsQ29sb3IzMiA9ICgoX2ZhPDwyNCkgPj4+IDApICsgKF9mYjw8MTYpICsgKF9mZzw8OCkgKyBfZnI7XG5cbiAgICBfZHIgPSBjb2xvci5kciAqIF9yO1xuICAgIF9kZyA9IGNvbG9yLmRnICogX2c7XG4gICAgX2RiID0gY29sb3IuZGIgKiBfYjtcbiAgICBfZGEgPSBfcHJlbXVsdGlwbGllZEFscGhhID8gMjU1IDogMDtcbiAgICBfZGFya0NvbG9yMzIgPSAoKF9kYTw8MjQpID4+PiAwKSArIChfZGI8PDE2KSArIChfZGc8PDgpICsgX2RyO1xufVxuXG5mdW5jdGlvbiBfc3BpbmVDb2xvclRvSW50MzIgKHNwaW5lQ29sb3IpIHtcbiAgICByZXR1cm4gKChzcGluZUNvbG9yLmE8PDI0KSA+Pj4gMCkgKyAoc3BpbmVDb2xvci5iPDwxNikgKyAoc3BpbmVDb2xvci5nPDw4KSArIHNwaW5lQ29sb3Iucjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BpbmVBc3NlbWJsZXIgZXh0ZW5kcyBBc3NlbWJsZXIge1xuICAgIHVwZGF0ZVJlbmRlckRhdGEgKGNvbXApIHtcbiAgICAgICAgaWYgKGNvbXAuaXNBbmltYXRpb25DYWNoZWQoKSkgcmV0dXJuO1xuICAgICAgICBsZXQgc2tlbGV0b24gPSBjb21wLl9za2VsZXRvbjtcbiAgICAgICAgaWYgKHNrZWxldG9uKSB7XG4gICAgICAgICAgICBza2VsZXRvbi51cGRhdGVXb3JsZFRyYW5zZm9ybSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmlsbFZlcnRpY2VzIChza2VsZXRvbkNvbG9yLCBhdHRhY2htZW50Q29sb3IsIHNsb3RDb2xvciwgY2xpcHBlciwgc2xvdCkge1xuXG4gICAgICAgIGxldCB2YnVmID0gX2J1ZmZlci5fdkRhdGEsXG4gICAgICAgICAgICBpYnVmID0gX2J1ZmZlci5faURhdGEsXG4gICAgICAgICAgICB1aW50VkRhdGEgPSBfYnVmZmVyLl91aW50VkRhdGE7XG4gICAgICAgIGxldCBvZmZzZXRJbmZvO1xuXG4gICAgICAgIF9maW5hbENvbG9yLmEgPSBzbG90Q29sb3IuYSAqIGF0dGFjaG1lbnRDb2xvci5hICogc2tlbGV0b25Db2xvci5hICogX25vZGVBICogMjU1O1xuICAgICAgICBfbXVsdGlwbGllciA9IF9wcmVtdWx0aXBsaWVkQWxwaGE/IF9maW5hbENvbG9yLmEgOiAyNTU7XG4gICAgICAgIF90ZW1wciA9IF9ub2RlUiAqIGF0dGFjaG1lbnRDb2xvci5yICogc2tlbGV0b25Db2xvci5yICogX211bHRpcGxpZXI7XG4gICAgICAgIF90ZW1wZyA9IF9ub2RlRyAqIGF0dGFjaG1lbnRDb2xvci5nICogc2tlbGV0b25Db2xvci5nICogX211bHRpcGxpZXI7XG4gICAgICAgIF90ZW1wYiA9IF9ub2RlQiAqIGF0dGFjaG1lbnRDb2xvci5iICogc2tlbGV0b25Db2xvci5iICogX211bHRpcGxpZXI7XG4gICAgICAgIFxuICAgICAgICBfZmluYWxDb2xvci5yID0gX3RlbXByICogc2xvdENvbG9yLnI7XG4gICAgICAgIF9maW5hbENvbG9yLmcgPSBfdGVtcGcgKiBzbG90Q29sb3IuZztcbiAgICAgICAgX2ZpbmFsQ29sb3IuYiA9IF90ZW1wYiAqIHNsb3RDb2xvci5iO1xuXG4gICAgICAgIGlmIChzbG90LmRhcmtDb2xvciA9PSBudWxsKSB7XG4gICAgICAgICAgICBfZGFya0NvbG9yLnNldCgwLjAsIDAuMCwgMC4wLCAxLjApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX2RhcmtDb2xvci5yID0gc2xvdC5kYXJrQ29sb3IuciAqIF90ZW1wcjtcbiAgICAgICAgICAgIF9kYXJrQ29sb3IuZyA9IHNsb3QuZGFya0NvbG9yLmcgKiBfdGVtcGc7XG4gICAgICAgICAgICBfZGFya0NvbG9yLmIgPSBzbG90LmRhcmtDb2xvci5iICogX3RlbXBiO1xuICAgICAgICB9XG4gICAgICAgIF9kYXJrQ29sb3IuYSA9IF9wcmVtdWx0aXBsaWVkQWxwaGEgPyAyNTUgOiAwO1xuXG4gICAgICAgIGlmICghY2xpcHBlci5pc0NsaXBwaW5nKCkpIHtcbiAgICAgICAgICAgIGlmIChfdmVydGV4RWZmZWN0KSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdiA9IF92ZXJ0ZXhGbG9hdE9mZnNldCwgbiA9IF92ZXJ0ZXhGbG9hdE9mZnNldCArIF92ZXJ0ZXhGbG9hdENvdW50OyB2IDwgbjsgdiArPSBfcGVyVmVydGV4U2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICBfdGVtcFBvcy54ID0gdmJ1Zlt2XTtcbiAgICAgICAgICAgICAgICAgICAgX3RlbXBQb3MueSA9IHZidWZbdiArIDFdO1xuICAgICAgICAgICAgICAgICAgICBfdGVtcFV2LnggPSB2YnVmW3YgKyAyXTtcbiAgICAgICAgICAgICAgICAgICAgX3RlbXBVdi55ID0gdmJ1Zlt2ICsgM107XG4gICAgICAgICAgICAgICAgICAgIF92ZXJ0ZXhFZmZlY3QudHJhbnNmb3JtKF90ZW1wUG9zLCBfdGVtcFV2LCBfZmluYWxDb2xvciwgX2RhcmtDb2xvcik7XG5cbiAgICAgICAgICAgICAgICAgICAgdmJ1Zlt2XSAgICAgPSBfdGVtcFBvcy54OyAgICAgICAgLy8geFxuICAgICAgICAgICAgICAgICAgICB2YnVmW3YgKyAxXSA9IF90ZW1wUG9zLnk7ICAgICAgICAvLyB5XG4gICAgICAgICAgICAgICAgICAgIHZidWZbdiArIDJdID0gX3RlbXBVdi54OyAgICAgICAgIC8vIHVcbiAgICAgICAgICAgICAgICAgICAgdmJ1Zlt2ICsgM10gPSBfdGVtcFV2Lnk7ICAgICAgICAgLy8gdlxuICAgICAgICAgICAgICAgICAgICB1aW50VkRhdGFbdiArIDRdICA9IF9zcGluZUNvbG9yVG9JbnQzMihfZmluYWxDb2xvcik7ICAgICAgICAgICAgICAgICAgLy8gbGlnaHQgY29sb3JcbiAgICAgICAgICAgICAgICAgICAgX3VzZVRpbnQgJiYgKHVpbnRWRGF0YVt2ICsgNV0gPSBfc3BpbmVDb2xvclRvSW50MzIoX2RhcmtDb2xvcikpOyAgICAgIC8vIGRhcmsgY29sb3JcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9maW5hbENvbG9yMzIgPSBfc3BpbmVDb2xvclRvSW50MzIoX2ZpbmFsQ29sb3IpO1xuICAgICAgICAgICAgICAgIF9kYXJrQ29sb3IzMiA9IF9zcGluZUNvbG9yVG9JbnQzMihfZGFya0NvbG9yKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB2ID0gX3ZlcnRleEZsb2F0T2Zmc2V0LCBuID0gX3ZlcnRleEZsb2F0T2Zmc2V0ICsgX3ZlcnRleEZsb2F0Q291bnQ7IHYgPCBuOyB2ICs9IF9wZXJWZXJ0ZXhTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIHVpbnRWRGF0YVt2ICsgNF0gID0gX2ZpbmFsQ29sb3IzMjsgICAgICAgICAgICAgICAgICAgLy8gbGlnaHQgY29sb3JcbiAgICAgICAgICAgICAgICAgICAgX3VzZVRpbnQgJiYgKHVpbnRWRGF0YVt2ICsgNV0gID0gX2RhcmtDb2xvcjMyKTsgICAgICAvLyBkYXJrIGNvbG9yXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHV2cyA9IHZidWYuc3ViYXJyYXkoX3ZlcnRleEZsb2F0T2Zmc2V0ICsgMik7XG4gICAgICAgICAgICBjbGlwcGVyLmNsaXBUcmlhbmdsZXModmJ1Zi5zdWJhcnJheShfdmVydGV4RmxvYXRPZmZzZXQpLCBfdmVydGV4RmxvYXRDb3VudCwgaWJ1Zi5zdWJhcnJheShfaW5kZXhPZmZzZXQpLCBfaW5kZXhDb3VudCwgdXZzLCBfZmluYWxDb2xvciwgX2RhcmtDb2xvciwgX3VzZVRpbnQsIF9wZXJWZXJ0ZXhTaXplKTtcbiAgICAgICAgICAgIGxldCBjbGlwcGVkVmVydGljZXMgPSBuZXcgRmxvYXQzMkFycmF5KGNsaXBwZXIuY2xpcHBlZFZlcnRpY2VzKTtcbiAgICAgICAgICAgIGxldCBjbGlwcGVkVHJpYW5nbGVzID0gY2xpcHBlci5jbGlwcGVkVHJpYW5nbGVzO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBpbnN1cmUgY2FwYWNpdHlcbiAgICAgICAgICAgIF9pbmRleENvdW50ID0gY2xpcHBlZFRyaWFuZ2xlcy5sZW5ndGg7XG4gICAgICAgICAgICBfdmVydGV4RmxvYXRDb3VudCA9IGNsaXBwZWRWZXJ0aWNlcy5sZW5ndGggLyBfcGVyQ2xpcFZlcnRleFNpemUgKiBfcGVyVmVydGV4U2l6ZTtcblxuICAgICAgICAgICAgb2Zmc2V0SW5mbyA9IF9idWZmZXIucmVxdWVzdChfdmVydGV4RmxvYXRDb3VudCAvIF9wZXJWZXJ0ZXhTaXplLCBfaW5kZXhDb3VudCk7XG4gICAgICAgICAgICBfaW5kZXhPZmZzZXQgPSBvZmZzZXRJbmZvLmluZGljZU9mZnNldCxcbiAgICAgICAgICAgIF92ZXJ0ZXhPZmZzZXQgPSBvZmZzZXRJbmZvLnZlcnRleE9mZnNldCxcbiAgICAgICAgICAgIF92ZXJ0ZXhGbG9hdE9mZnNldCA9IG9mZnNldEluZm8uYnl0ZU9mZnNldCA+PiAyO1xuICAgICAgICAgICAgdmJ1ZiA9IF9idWZmZXIuX3ZEYXRhLFxuICAgICAgICAgICAgaWJ1ZiA9IF9idWZmZXIuX2lEYXRhO1xuICAgICAgICAgICAgdWludFZEYXRhID0gX2J1ZmZlci5fdWludFZEYXRhO1xuXG4gICAgICAgICAgICAvLyBmaWxsIGluZGljZXNcbiAgICAgICAgICAgIGlidWYuc2V0KGNsaXBwZWRUcmlhbmdsZXMsIF9pbmRleE9mZnNldCk7XG5cbiAgICAgICAgICAgIC8vIGZpbGwgdmVydGljZXMgY29udGFpbiB4IHkgdSB2IGxpZ2h0IGNvbG9yIGRhcmsgY29sb3JcbiAgICAgICAgICAgIGlmIChfdmVydGV4RWZmZWN0KSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdiA9IDAsIG4gPSBjbGlwcGVkVmVydGljZXMubGVuZ3RoLCBvZmZzZXQgPSBfdmVydGV4RmxvYXRPZmZzZXQ7IHYgPCBuOyB2ICs9IF9wZXJDbGlwVmVydGV4U2l6ZSwgb2Zmc2V0ICs9IF9wZXJWZXJ0ZXhTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIF90ZW1wUG9zLnggPSBjbGlwcGVkVmVydGljZXNbdl07XG4gICAgICAgICAgICAgICAgICAgIF90ZW1wUG9zLnkgPSBjbGlwcGVkVmVydGljZXNbdiArIDFdO1xuICAgICAgICAgICAgICAgICAgICBfZmluYWxDb2xvci5zZXQoY2xpcHBlZFZlcnRpY2VzW3YgKyAyXSwgY2xpcHBlZFZlcnRpY2VzW3YgKyAzXSwgY2xpcHBlZFZlcnRpY2VzW3YgKyA0XSwgY2xpcHBlZFZlcnRpY2VzW3YgKyA1XSk7XG4gICAgICAgICAgICAgICAgICAgIF90ZW1wVXYueCA9IGNsaXBwZWRWZXJ0aWNlc1t2ICsgNl07XG4gICAgICAgICAgICAgICAgICAgIF90ZW1wVXYueSA9IGNsaXBwZWRWZXJ0aWNlc1t2ICsgN107XG4gICAgICAgICAgICAgICAgICAgIGlmIChfdXNlVGludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2RhcmtDb2xvci5zZXQoY2xpcHBlZFZlcnRpY2VzW3YgKyA4XSwgY2xpcHBlZFZlcnRpY2VzW3YgKyA5XSwgY2xpcHBlZFZlcnRpY2VzW3YgKyAxMF0sIGNsaXBwZWRWZXJ0aWNlc1t2ICsgMTFdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9kYXJrQ29sb3Iuc2V0KDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF92ZXJ0ZXhFZmZlY3QudHJhbnNmb3JtKF90ZW1wUG9zLCBfdGVtcFV2LCBfZmluYWxDb2xvciwgX2RhcmtDb2xvcik7XG5cbiAgICAgICAgICAgICAgICAgICAgdmJ1ZltvZmZzZXRdID0gX3RlbXBQb3MueDsgICAgICAgICAgICAgLy8geFxuICAgICAgICAgICAgICAgICAgICB2YnVmW29mZnNldCArIDFdID0gX3RlbXBQb3MueTsgICAgICAgICAvLyB5XG4gICAgICAgICAgICAgICAgICAgIHZidWZbb2Zmc2V0ICsgMl0gPSBfdGVtcFV2Lng7ICAgICAgICAgIC8vIHVcbiAgICAgICAgICAgICAgICAgICAgdmJ1ZltvZmZzZXQgKyAzXSA9IF90ZW1wVXYueTsgICAgICAgICAgLy8gdlxuICAgICAgICAgICAgICAgICAgICB1aW50VkRhdGFbb2Zmc2V0ICsgNF0gPSBfc3BpbmVDb2xvclRvSW50MzIoX2ZpbmFsQ29sb3IpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3VzZVRpbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpbnRWRGF0YVtvZmZzZXQgKyA1XSA9IF9zcGluZUNvbG9yVG9JbnQzMihfZGFya0NvbG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdiA9IDAsIG4gPSBjbGlwcGVkVmVydGljZXMubGVuZ3RoLCBvZmZzZXQgPSBfdmVydGV4RmxvYXRPZmZzZXQ7IHYgPCBuOyB2ICs9IF9wZXJDbGlwVmVydGV4U2l6ZSwgb2Zmc2V0ICs9IF9wZXJWZXJ0ZXhTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIHZidWZbb2Zmc2V0XSAgICAgPSBjbGlwcGVkVmVydGljZXNbdl07ICAgICAgICAgLy8geFxuICAgICAgICAgICAgICAgICAgICB2YnVmW29mZnNldCArIDFdID0gY2xpcHBlZFZlcnRpY2VzW3YgKyAxXTsgICAgIC8vIHlcbiAgICAgICAgICAgICAgICAgICAgdmJ1ZltvZmZzZXQgKyAyXSA9IGNsaXBwZWRWZXJ0aWNlc1t2ICsgNl07ICAgICAvLyB1XG4gICAgICAgICAgICAgICAgICAgIHZidWZbb2Zmc2V0ICsgM10gPSBjbGlwcGVkVmVydGljZXNbdiArIDddOyAgICAgLy8gdlxuXG4gICAgICAgICAgICAgICAgICAgIF9maW5hbENvbG9yMzIgPSAoKGNsaXBwZWRWZXJ0aWNlc1t2ICsgNV08PDI0KSA+Pj4gMCkgKyAoY2xpcHBlZFZlcnRpY2VzW3YgKyA0XTw8MTYpICsgKGNsaXBwZWRWZXJ0aWNlc1t2ICsgM108PDgpICsgY2xpcHBlZFZlcnRpY2VzW3YgKyAyXTtcbiAgICAgICAgICAgICAgICAgICAgdWludFZEYXRhW29mZnNldCArIDRdID0gX2ZpbmFsQ29sb3IzMjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoX3VzZVRpbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9kYXJrQ29sb3IzMiA9ICgoY2xpcHBlZFZlcnRpY2VzW3YgKyAxMV08PDI0KSA+Pj4gMCkgKyAoY2xpcHBlZFZlcnRpY2VzW3YgKyAxMF08PDE2KSArIChjbGlwcGVkVmVydGljZXNbdiArIDldPDw4KSArIGNsaXBwZWRWZXJ0aWNlc1t2ICsgOF07XG4gICAgICAgICAgICAgICAgICAgICAgICB1aW50VkRhdGFbb2Zmc2V0ICsgNV0gPSBfZGFya0NvbG9yMzI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWFsVGltZVRyYXZlcnNlICh3b3JsZE1hdCkge1xuICAgICAgICBsZXQgdmJ1ZjtcbiAgICAgICAgbGV0IGlidWY7XG5cbiAgICAgICAgbGV0IGxvY1NrZWxldG9uID0gX2NvbXAuX3NrZWxldG9uO1xuICAgICAgICBsZXQgc2tlbGV0b25Db2xvciA9IGxvY1NrZWxldG9uLmNvbG9yO1xuICAgICAgICBsZXQgZ3JhcGhpY3MgPSBfY29tcC5fZGVidWdSZW5kZXJlcjtcbiAgICAgICAgbGV0IGNsaXBwZXIgPSBfY29tcC5fY2xpcHBlcjtcbiAgICAgICAgbGV0IG1hdGVyaWFsID0gbnVsbDtcbiAgICAgICAgbGV0IGF0dGFjaG1lbnQsIGF0dGFjaG1lbnRDb2xvciwgc2xvdENvbG9yLCB1dnMsIHRyaWFuZ2xlcztcbiAgICAgICAgbGV0IGlzUmVnaW9uLCBpc01lc2gsIGlzQ2xpcDtcbiAgICAgICAgbGV0IG9mZnNldEluZm87XG4gICAgICAgIGxldCBzbG90O1xuICAgICAgICBsZXQgd29ybGRNYXRtO1xuXG4gICAgICAgIF9zbG90UmFuZ2VTdGFydCA9IF9jb21wLl9zdGFydFNsb3RJbmRleDtcbiAgICAgICAgX3Nsb3RSYW5nZUVuZCA9IF9jb21wLl9lbmRTbG90SW5kZXg7XG4gICAgICAgIF9pblJhbmdlID0gZmFsc2U7XG4gICAgICAgIGlmIChfc2xvdFJhbmdlU3RhcnQgPT0gLTEpIF9pblJhbmdlID0gdHJ1ZTtcblxuICAgICAgICBfZGVidWdTbG90cyA9IF9jb21wLmRlYnVnU2xvdHM7XG4gICAgICAgIF9kZWJ1Z0JvbmVzID0gX2NvbXAuZGVidWdCb25lcztcbiAgICAgICAgX2RlYnVnTWVzaCA9IF9jb21wLmRlYnVnTWVzaDtcbiAgICAgICAgaWYgKGdyYXBoaWNzICYmIChfZGVidWdCb25lcyB8fCBfZGVidWdTbG90cyB8fCBfZGVidWdNZXNoKSkge1xuICAgICAgICAgICAgZ3JhcGhpY3MuY2xlYXIoKTtcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDI7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgLy8geCB5IHUgdiByMSBnMSBiMSBhMSByMiBnMiBiMiBhMiBvciB4IHkgdSB2IHIgZyBiIGEgXG4gICAgICAgIF9wZXJDbGlwVmVydGV4U2l6ZSA9IF91c2VUaW50ID8gMTIgOiA4O1xuICAgIFxuICAgICAgICBfdmVydGV4RmxvYXRDb3VudCA9IDA7XG4gICAgICAgIF92ZXJ0ZXhGbG9hdE9mZnNldCA9IDA7XG4gICAgICAgIF92ZXJ0ZXhPZmZzZXQgPSAwO1xuICAgICAgICBfaW5kZXhDb3VudCA9IDA7XG4gICAgICAgIF9pbmRleE9mZnNldCA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgc2xvdElkeCA9IDAsIHNsb3RDb3VudCA9IGxvY1NrZWxldG9uLmRyYXdPcmRlci5sZW5ndGg7IHNsb3RJZHggPCBzbG90Q291bnQ7IHNsb3RJZHgrKykge1xuICAgICAgICAgICAgc2xvdCA9IGxvY1NrZWxldG9uLmRyYXdPcmRlcltzbG90SWR4XTtcblxuICAgICAgICAgICAgaWYoc2xvdCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF9zbG90UmFuZ2VTdGFydCA+PSAwICYmIF9zbG90UmFuZ2VTdGFydCA9PSBzbG90LmRhdGEuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBfaW5SYW5nZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghX2luUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBjbGlwcGVyLmNsaXBFbmRXaXRoU2xvdChzbG90KTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGlmIChfc2xvdFJhbmdlRW5kID49IDAgJiYgX3Nsb3RSYW5nZUVuZCA9PSBzbG90LmRhdGEuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBfaW5SYW5nZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgX3ZlcnRleEZsb2F0Q291bnQgPSAwO1xuICAgICAgICAgICAgX2luZGV4Q291bnQgPSAwO1xuXG4gICAgICAgICAgICBhdHRhY2htZW50ID0gc2xvdC5nZXRBdHRhY2htZW50KCk7XG4gICAgICAgICAgICBpZiAoIWF0dGFjaG1lbnQpIHtcbiAgICAgICAgICAgICAgICBjbGlwcGVyLmNsaXBFbmRXaXRoU2xvdChzbG90KTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXNSZWdpb24gPSBhdHRhY2htZW50IGluc3RhbmNlb2Ygc3BpbmUuUmVnaW9uQXR0YWNobWVudDtcbiAgICAgICAgICAgIGlzTWVzaCA9IGF0dGFjaG1lbnQgaW5zdGFuY2VvZiBzcGluZS5NZXNoQXR0YWNobWVudDtcbiAgICAgICAgICAgIGlzQ2xpcCA9IGF0dGFjaG1lbnQgaW5zdGFuY2VvZiBzcGluZS5DbGlwcGluZ0F0dGFjaG1lbnQ7XG5cbiAgICAgICAgICAgIGlmIChpc0NsaXApIHtcbiAgICAgICAgICAgICAgICBjbGlwcGVyLmNsaXBTdGFydChzbG90LCBhdHRhY2htZW50KTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpc1JlZ2lvbiAmJiAhaXNNZXNoKSB7XG4gICAgICAgICAgICAgICAgY2xpcHBlci5jbGlwRW5kV2l0aFNsb3Qoc2xvdCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1hdGVyaWFsID0gX2dldFNsb3RNYXRlcmlhbChhdHRhY2htZW50LnJlZ2lvbi50ZXh0dXJlLl90ZXh0dXJlLCBzbG90LmRhdGEuYmxlbmRNb2RlKTtcbiAgICAgICAgICAgIGlmICghbWF0ZXJpYWwpIHtcbiAgICAgICAgICAgICAgICBjbGlwcGVyLmNsaXBFbmRXaXRoU2xvdChzbG90KTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF9tdXN0Rmx1c2ggfHwgbWF0ZXJpYWwuZ2V0SGFzaCgpICE9PSBfcmVuZGVyZXIubWF0ZXJpYWwuZ2V0SGFzaCgpKSB7XG4gICAgICAgICAgICAgICAgX211c3RGbHVzaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIF9yZW5kZXJlci5fZmx1c2goKTtcbiAgICAgICAgICAgICAgICBfcmVuZGVyZXIubm9kZSA9IF9ub2RlO1xuICAgICAgICAgICAgICAgIF9yZW5kZXJlci5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNSZWdpb24pIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0cmlhbmdsZXMgPSBfcXVhZFRyaWFuZ2xlcztcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBpbnN1cmUgY2FwYWNpdHlcbiAgICAgICAgICAgICAgICBfdmVydGV4RmxvYXRDb3VudCA9IDQgKiBfcGVyVmVydGV4U2l6ZTtcbiAgICAgICAgICAgICAgICBfaW5kZXhDb3VudCA9IDY7XG5cbiAgICAgICAgICAgICAgICBvZmZzZXRJbmZvID0gX2J1ZmZlci5yZXF1ZXN0KDQsIDYpO1xuICAgICAgICAgICAgICAgIF9pbmRleE9mZnNldCA9IG9mZnNldEluZm8uaW5kaWNlT2Zmc2V0LFxuICAgICAgICAgICAgICAgIF92ZXJ0ZXhPZmZzZXQgPSBvZmZzZXRJbmZvLnZlcnRleE9mZnNldCxcbiAgICAgICAgICAgICAgICBfdmVydGV4RmxvYXRPZmZzZXQgPSBvZmZzZXRJbmZvLmJ5dGVPZmZzZXQgPj4gMjtcbiAgICAgICAgICAgICAgICB2YnVmID0gX2J1ZmZlci5fdkRhdGEsXG4gICAgICAgICAgICAgICAgaWJ1ZiA9IF9idWZmZXIuX2lEYXRhO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIGNvbXB1dGUgdmVydGV4IGFuZCBmaWxsIHggeVxuICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQuY29tcHV0ZVdvcmxkVmVydGljZXMoc2xvdC5ib25lLCB2YnVmLCBfdmVydGV4RmxvYXRPZmZzZXQsIF9wZXJWZXJ0ZXhTaXplKTtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBkcmF3IGRlYnVnIHNsb3RzIGlmIGVuYWJsZWQgZ3JhcGhpY3NcbiAgICAgICAgICAgICAgICBpZiAoZ3JhcGhpY3MgJiYgX2RlYnVnU2xvdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlQ29sb3IgPSBfc2xvdENvbG9yO1xuICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5tb3ZlVG8odmJ1ZltfdmVydGV4RmxvYXRPZmZzZXRdLCB2YnVmW192ZXJ0ZXhGbG9hdE9mZnNldCArIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaWkgPSBfdmVydGV4RmxvYXRPZmZzZXQgKyBfcGVyVmVydGV4U2l6ZSwgbm4gPSBfdmVydGV4RmxvYXRPZmZzZXQgKyBfdmVydGV4RmxvYXRDb3VudDsgaWkgPCBubjsgaWkgKz0gX3BlclZlcnRleFNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbyh2YnVmW2lpXSwgdmJ1ZltpaSArIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc01lc2gpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0cmlhbmdsZXMgPSBhdHRhY2htZW50LnRyaWFuZ2xlcztcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBpbnN1cmUgY2FwYWNpdHlcbiAgICAgICAgICAgICAgICBfdmVydGV4RmxvYXRDb3VudCA9IChhdHRhY2htZW50LndvcmxkVmVydGljZXNMZW5ndGggPj4gMSkgKiBfcGVyVmVydGV4U2l6ZTtcbiAgICAgICAgICAgICAgICBfaW5kZXhDb3VudCA9IHRyaWFuZ2xlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBvZmZzZXRJbmZvID0gX2J1ZmZlci5yZXF1ZXN0KF92ZXJ0ZXhGbG9hdENvdW50IC8gX3BlclZlcnRleFNpemUsIF9pbmRleENvdW50KTtcbiAgICAgICAgICAgICAgICBfaW5kZXhPZmZzZXQgPSBvZmZzZXRJbmZvLmluZGljZU9mZnNldCxcbiAgICAgICAgICAgICAgICBfdmVydGV4T2Zmc2V0ID0gb2Zmc2V0SW5mby52ZXJ0ZXhPZmZzZXQsXG4gICAgICAgICAgICAgICAgX3ZlcnRleEZsb2F0T2Zmc2V0ID0gb2Zmc2V0SW5mby5ieXRlT2Zmc2V0ID4+IDI7XG4gICAgICAgICAgICAgICAgdmJ1ZiA9IF9idWZmZXIuX3ZEYXRhLFxuICAgICAgICAgICAgICAgIGlidWYgPSBfYnVmZmVyLl9pRGF0YTtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBjb21wdXRlIHZlcnRleCBhbmQgZmlsbCB4IHlcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50LmNvbXB1dGVXb3JsZFZlcnRpY2VzKHNsb3QsIDAsIGF0dGFjaG1lbnQud29ybGRWZXJ0aWNlc0xlbmd0aCwgdmJ1ZiwgX3ZlcnRleEZsb2F0T2Zmc2V0LCBfcGVyVmVydGV4U2l6ZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBkcmF3IGRlYnVnIG1lc2ggaWYgZW5hYmxlZCBncmFwaGljc1xuICAgICAgICAgICAgICAgIGlmIChncmFwaGljcyAmJiBfZGVidWdNZXNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gX21lc2hDb2xvcjtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpaSA9IDAsIG5uID0gdHJpYW5nbGVzLmxlbmd0aDsgaWkgPCBubjsgaWkgKz0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHYxID0gdHJpYW5nbGVzW2lpXSAqIF9wZXJWZXJ0ZXhTaXplICsgX3ZlcnRleEZsb2F0T2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHYyID0gdHJpYW5nbGVzW2lpICsgMV0gKiBfcGVyVmVydGV4U2l6ZSArIF92ZXJ0ZXhGbG9hdE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2MyA9IHRyaWFuZ2xlc1tpaSArIDJdICogX3BlclZlcnRleFNpemUgKyBfdmVydGV4RmxvYXRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLm1vdmVUbyh2YnVmW3YxXSwgdmJ1Zlt2MSArIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbyh2YnVmW3YyXSwgdmJ1Zlt2MiArIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbyh2YnVmW3YzXSwgdmJ1Zlt2MyArIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGlmIChfdmVydGV4RmxvYXRDb3VudCA9PSAwIHx8IF9pbmRleENvdW50ID09IDApIHtcbiAgICAgICAgICAgICAgICBjbGlwcGVyLmNsaXBFbmRXaXRoU2xvdChzbG90KTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIC8vIGZpbGwgaW5kaWNlc1xuICAgICAgICAgICAgaWJ1Zi5zZXQodHJpYW5nbGVzLCBfaW5kZXhPZmZzZXQpO1xuXG4gICAgICAgICAgICAvLyBmaWxsIHUgdlxuICAgICAgICAgICAgdXZzID0gYXR0YWNobWVudC51dnM7XG4gICAgICAgICAgICBmb3IgKGxldCB2ID0gX3ZlcnRleEZsb2F0T2Zmc2V0LCBuID0gX3ZlcnRleEZsb2F0T2Zmc2V0ICsgX3ZlcnRleEZsb2F0Q291bnQsIHUgPSAwOyB2IDwgbjsgdiArPSBfcGVyVmVydGV4U2l6ZSwgdSArPSAyKSB7XG4gICAgICAgICAgICAgICAgdmJ1Zlt2ICsgMl0gPSB1dnNbdV07ICAgICAgICAgICAvLyB1XG4gICAgICAgICAgICAgICAgdmJ1Zlt2ICsgM10gPSB1dnNbdSArIDFdOyAgICAgICAvLyB2XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF0dGFjaG1lbnRDb2xvciA9IGF0dGFjaG1lbnQuY29sb3IsXG4gICAgICAgICAgICBzbG90Q29sb3IgPSBzbG90LmNvbG9yO1xuXG4gICAgICAgICAgICB0aGlzLmZpbGxWZXJ0aWNlcyhza2VsZXRvbkNvbG9yLCBhdHRhY2htZW50Q29sb3IsIHNsb3RDb2xvciwgY2xpcHBlciwgc2xvdCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHJlc2V0IGJ1ZmZlciBwb2ludGVyLCBiZWNhdXNlIGNsaXBwZXIgbWF5YmUgcmVhbGxvYyBhIG5ldyBidWZmZXIgaW4gZmlsZSBWZXJ0aWNlcyBmdW5jdGlvbi5cbiAgICAgICAgICAgIHZidWYgPSBfYnVmZmVyLl92RGF0YSxcbiAgICAgICAgICAgIGlidWYgPSBfYnVmZmVyLl9pRGF0YTtcbiAgICBcbiAgICAgICAgICAgIGlmIChfaW5kZXhDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpaSA9IF9pbmRleE9mZnNldCwgbm4gPSBfaW5kZXhPZmZzZXQgKyBfaW5kZXhDb3VudDsgaWkgPCBubjsgaWkrKykge1xuICAgICAgICAgICAgICAgICAgICBpYnVmW2lpXSArPSBfdmVydGV4T2Zmc2V0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh3b3JsZE1hdCkge1xuICAgICAgICAgICAgICAgICAgICB3b3JsZE1hdG0gPSB3b3JsZE1hdC5tO1xuICAgICAgICAgICAgICAgICAgICBfbTAwID0gd29ybGRNYXRtWzBdO1xuICAgICAgICAgICAgICAgICAgICBfbTA0ID0gd29ybGRNYXRtWzRdO1xuICAgICAgICAgICAgICAgICAgICBfbTEyID0gd29ybGRNYXRtWzEyXTtcbiAgICAgICAgICAgICAgICAgICAgX20wMSA9IHdvcmxkTWF0bVsxXTtcbiAgICAgICAgICAgICAgICAgICAgX20wNSA9IHdvcmxkTWF0bVs1XTtcbiAgICAgICAgICAgICAgICAgICAgX20xMyA9IHdvcmxkTWF0bVsxM107XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlpID0gX3ZlcnRleEZsb2F0T2Zmc2V0LCBubiA9IF92ZXJ0ZXhGbG9hdE9mZnNldCArIF92ZXJ0ZXhGbG9hdENvdW50OyBpaSA8IG5uOyBpaSArPSBfcGVyVmVydGV4U2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ggPSB2YnVmW2lpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF95ID0gdmJ1ZltpaSArIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmJ1ZltpaV0gPSBfeCAqIF9tMDAgKyBfeSAqIF9tMDQgKyBfbTEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmJ1ZltpaSArIDFdID0gX3ggKiBfbTAxICsgX3kgKiBfbTA1ICsgX20xMztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfYnVmZmVyLmFkanVzdChfdmVydGV4RmxvYXRDb3VudCAvIF9wZXJWZXJ0ZXhTaXplLCBfaW5kZXhDb3VudCk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBjbGlwcGVyLmNsaXBFbmRXaXRoU2xvdChzbG90KTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjbGlwcGVyLmNsaXBFbmQoKTtcbiAgICBcbiAgICAgICAgaWYgKGdyYXBoaWNzICYmIF9kZWJ1Z0JvbmVzKSB7XG4gICAgICAgICAgICBsZXQgYm9uZTtcbiAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZUNvbG9yID0gX2JvbmVDb2xvcjtcbiAgICAgICAgICAgIGdyYXBoaWNzLmZpbGxDb2xvciA9IF9zbG90Q29sb3I7IC8vIFJvb3QgYm9uZSBjb2xvciBpcyBzYW1lIGFzIHNsb3QgY29sb3IuXG4gICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IGxvY1NrZWxldG9uLmJvbmVzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgICAgIGJvbmUgPSBsb2NTa2VsZXRvbi5ib25lc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IGJvbmUuZGF0YS5sZW5ndGggKiBib25lLmEgKyBib25lLndvcmxkWDtcbiAgICAgICAgICAgICAgICBsZXQgeSA9IGJvbmUuZGF0YS5sZW5ndGggKiBib25lLmMgKyBib25lLndvcmxkWTtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBCb25lIGxlbmd0aHMuXG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MubW92ZVRvKGJvbmUud29ybGRYLCBib25lLndvcmxkWSk7XG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKHgsIHkpO1xuICAgICAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIEJvbmUgb3JpZ2lucy5cbiAgICAgICAgICAgICAgICBncmFwaGljcy5jaXJjbGUoYm9uZS53b3JsZFgsIGJvbmUud29ybGRZLCBNYXRoLlBJICogMS41KTtcbiAgICAgICAgICAgICAgICBncmFwaGljcy5maWxsKCk7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MuZmlsbENvbG9yID0gX29yaWdpbkNvbG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhY2hlVHJhdmVyc2UgKHdvcmxkTWF0KSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgZnJhbWUgPSBfY29tcC5fY3VyRnJhbWU7XG4gICAgICAgIGlmICghZnJhbWUpIHJldHVybjtcblxuICAgICAgICBsZXQgc2VnbWVudHMgPSBmcmFtZS5zZWdtZW50cztcbiAgICAgICAgaWYgKHNlZ21lbnRzLmxlbmd0aCA9PSAwKSByZXR1cm47XG5cbiAgICAgICAgbGV0IHZidWYsIGlidWYsIHVpbnRidWY7XG4gICAgICAgIGxldCBtYXRlcmlhbDtcbiAgICAgICAgbGV0IG9mZnNldEluZm87XG4gICAgICAgIGxldCB2ZXJ0aWNlcyA9IGZyYW1lLnZlcnRpY2VzO1xuICAgICAgICBsZXQgaW5kaWNlcyA9IGZyYW1lLmluZGljZXM7XG4gICAgICAgIGxldCB3b3JsZE1hdG07XG5cbiAgICAgICAgbGV0IGZyYW1lVkZPZmZzZXQgPSAwLCBmcmFtZUluZGV4T2Zmc2V0ID0gMCwgc2VnVkZDb3VudCA9IDA7XG4gICAgICAgIGlmICh3b3JsZE1hdCkge1xuICAgICAgICAgICAgd29ybGRNYXRtID0gd29ybGRNYXQubTtcbiAgICAgICAgICAgIF9tMDAgPSB3b3JsZE1hdG1bMF07XG4gICAgICAgICAgICBfbTAxID0gd29ybGRNYXRtWzFdO1xuICAgICAgICAgICAgX20wNCA9IHdvcmxkTWF0bVs0XTtcbiAgICAgICAgICAgIF9tMDUgPSB3b3JsZE1hdG1bNV07XG4gICAgICAgICAgICBfbTEyID0gd29ybGRNYXRtWzEyXTtcbiAgICAgICAgICAgIF9tMTMgPSB3b3JsZE1hdG1bMTNdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGp1c3RUcmFuc2xhdGUgPSBfbTAwID09PSAxICYmIF9tMDEgPT09IDAgJiYgX20wNCA9PT0gMCAmJiBfbTA1ID09PSAxO1xuICAgICAgICBsZXQgbmVlZEJhdGNoID0gKF9oYW5kbGVWYWwgJiBGTEFHX0JBVENIKTtcbiAgICAgICAgbGV0IGNhbGNUcmFuc2xhdGUgPSBuZWVkQmF0Y2ggJiYganVzdFRyYW5zbGF0ZTtcblxuICAgICAgICBsZXQgY29sb3JPZmZzZXQgPSAwO1xuICAgICAgICBsZXQgY29sb3JzID0gZnJhbWUuY29sb3JzO1xuICAgICAgICBsZXQgbm93Q29sb3IgPSBjb2xvcnNbY29sb3JPZmZzZXQrK107XG4gICAgICAgIGxldCBtYXhWRk9mZnNldCA9IG5vd0NvbG9yLnZmT2Zmc2V0O1xuICAgICAgICBfaGFuZGxlQ29sb3Iobm93Q29sb3IpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gc2VnbWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc2VnSW5mbyA9IHNlZ21lbnRzW2ldO1xuICAgICAgICAgICAgbWF0ZXJpYWwgPSBfZ2V0U2xvdE1hdGVyaWFsKHNlZ0luZm8udGV4LCBzZWdJbmZvLmJsZW5kTW9kZSk7XG4gICAgICAgICAgICBpZiAoIW1hdGVyaWFsKSBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYgKF9tdXN0Rmx1c2ggfHwgbWF0ZXJpYWwuZ2V0SGFzaCgpICE9PSBfcmVuZGVyZXIubWF0ZXJpYWwuZ2V0SGFzaCgpKSB7XG4gICAgICAgICAgICAgICAgX211c3RGbHVzaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIF9yZW5kZXJlci5fZmx1c2goKTtcbiAgICAgICAgICAgICAgICBfcmVuZGVyZXIubm9kZSA9IF9ub2RlO1xuICAgICAgICAgICAgICAgIF9yZW5kZXJlci5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfdmVydGV4Q291bnQgPSBzZWdJbmZvLnZlcnRleENvdW50O1xuICAgICAgICAgICAgX2luZGV4Q291bnQgPSBzZWdJbmZvLmluZGV4Q291bnQ7XG5cbiAgICAgICAgICAgIG9mZnNldEluZm8gPSBfYnVmZmVyLnJlcXVlc3QoX3ZlcnRleENvdW50LCBfaW5kZXhDb3VudCk7XG4gICAgICAgICAgICBfaW5kZXhPZmZzZXQgPSBvZmZzZXRJbmZvLmluZGljZU9mZnNldDtcbiAgICAgICAgICAgIF92ZXJ0ZXhPZmZzZXQgPSBvZmZzZXRJbmZvLnZlcnRleE9mZnNldDtcbiAgICAgICAgICAgIF92Zk9mZnNldCA9IG9mZnNldEluZm8uYnl0ZU9mZnNldCA+PiAyO1xuICAgICAgICAgICAgdmJ1ZiA9IF9idWZmZXIuX3ZEYXRhO1xuICAgICAgICAgICAgaWJ1ZiA9IF9idWZmZXIuX2lEYXRhO1xuICAgICAgICAgICAgdWludGJ1ZiA9IF9idWZmZXIuX3VpbnRWRGF0YTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaWkgPSBfaW5kZXhPZmZzZXQsIGlsID0gX2luZGV4T2Zmc2V0ICsgX2luZGV4Q291bnQ7IGlpIDwgaWw7IGlpKyspIHtcbiAgICAgICAgICAgICAgICBpYnVmW2lpXSA9IF92ZXJ0ZXhPZmZzZXQgKyBpbmRpY2VzW2ZyYW1lSW5kZXhPZmZzZXQrK107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlZ1ZGQ291bnQgPSBzZWdJbmZvLnZmQ291bnQ7XG4gICAgICAgICAgICB2YnVmLnNldCh2ZXJ0aWNlcy5zdWJhcnJheShmcmFtZVZGT2Zmc2V0LCBmcmFtZVZGT2Zmc2V0ICsgc2VnVkZDb3VudCksIF92Zk9mZnNldCk7XG4gICAgICAgICAgICBmcmFtZVZGT2Zmc2V0ICs9IHNlZ1ZGQ291bnQ7XG5cbiAgICAgICAgICAgIGlmIChjYWxjVHJhbnNsYXRlKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaWkgPSBfdmZPZmZzZXQsIGlsID0gX3ZmT2Zmc2V0ICsgc2VnVkZDb3VudDsgaWkgPCBpbDsgaWkgKz0gNikge1xuICAgICAgICAgICAgICAgICAgICB2YnVmW2lpXSArPSBfbTEyO1xuICAgICAgICAgICAgICAgICAgICB2YnVmW2lpICsgMV0gKz0gX20xMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5lZWRCYXRjaCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGlpID0gX3ZmT2Zmc2V0LCBpbCA9IF92Zk9mZnNldCArIHNlZ1ZGQ291bnQ7IGlpIDwgaWw7IGlpICs9IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ggPSB2YnVmW2lpXTtcbiAgICAgICAgICAgICAgICAgICAgX3kgPSB2YnVmW2lpICsgMV07XG4gICAgICAgICAgICAgICAgICAgIHZidWZbaWldID0gX3ggKiBfbTAwICsgX3kgKiBfbTA0ICsgX20xMjtcbiAgICAgICAgICAgICAgICAgICAgdmJ1ZltpaSArIDFdID0gX3ggKiBfbTAxICsgX3kgKiBfbTA1ICsgX20xMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF9idWZmZXIuYWRqdXN0KF92ZXJ0ZXhDb3VudCwgX2luZGV4Q291bnQpO1xuICAgICAgICAgICAgaWYgKCAhX25lZWRDb2xvciApIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgY29sb3JcbiAgICAgICAgICAgIGxldCBmcmFtZUNvbG9yT2Zmc2V0ID0gZnJhbWVWRk9mZnNldCAtIHNlZ1ZGQ291bnQ7XG4gICAgICAgICAgICBmb3IgKGxldCBpaSA9IF92Zk9mZnNldCArIDQsIGlsID0gX3ZmT2Zmc2V0ICsgNCArIHNlZ1ZGQ291bnQ7IGlpIDwgaWw7IGlpICs9IDYsIGZyYW1lQ29sb3JPZmZzZXQgKz0gNikge1xuICAgICAgICAgICAgICAgIGlmIChmcmFtZUNvbG9yT2Zmc2V0ID49IG1heFZGT2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5vd0NvbG9yID0gY29sb3JzW2NvbG9yT2Zmc2V0KytdO1xuICAgICAgICAgICAgICAgICAgICBfaGFuZGxlQ29sb3Iobm93Q29sb3IpO1xuICAgICAgICAgICAgICAgICAgICBtYXhWRk9mZnNldCA9IG5vd0NvbG9yLnZmT2Zmc2V0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1aW50YnVmW2lpXSA9IF9maW5hbENvbG9yMzI7XG4gICAgICAgICAgICAgICAgdWludGJ1ZltpaSArIDFdID0gX2RhcmtDb2xvcjMyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmlsbEJ1ZmZlcnMgKGNvbXAsIHJlbmRlcmVyKSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgbm9kZSA9IGNvbXAubm9kZTtcbiAgICAgICAgbm9kZS5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfVVBEQVRFX1JFTkRFUl9EQVRBO1xuICAgICAgICBpZiAoIWNvbXAuX3NrZWxldG9uKSByZXR1cm47XG5cbiAgICAgICAgbGV0IG5vZGVDb2xvciA9IG5vZGUuX2NvbG9yO1xuICAgICAgICBfbm9kZVIgPSBub2RlQ29sb3IuciAvIDI1NTtcbiAgICAgICAgX25vZGVHID0gbm9kZUNvbG9yLmcgLyAyNTU7XG4gICAgICAgIF9ub2RlQiA9IG5vZGVDb2xvci5iIC8gMjU1O1xuICAgICAgICBfbm9kZUEgPSBub2RlQ29sb3IuYSAvIDI1NTtcblxuICAgICAgICBfdXNlVGludCA9IGNvbXAudXNlVGludCB8fCBjb21wLmlzQW5pbWF0aW9uQ2FjaGVkKCk7XG4gICAgICAgIF92ZXJ0ZXhGb3JtYXQgPSBfdXNlVGludD8gVkZUd29Db2xvciA6IFZGT25lQ29sb3I7XG4gICAgICAgIC8vIHggeSB1IHYgY29sb3IxIGNvbG9yMiBvciB4IHkgdSB2IGNvbG9yXG4gICAgICAgIF9wZXJWZXJ0ZXhTaXplID0gX3VzZVRpbnQgPyA2IDogNTtcblxuICAgICAgICBfbm9kZSA9IGNvbXAubm9kZTtcbiAgICAgICAgX2J1ZmZlciA9IHJlbmRlcmVyLmdldEJ1ZmZlcignc3BpbmUnLCBfdmVydGV4Rm9ybWF0KTtcbiAgICAgICAgX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgICAgIF9jb21wID0gY29tcDtcblxuICAgICAgICBfbXVzdEZsdXNoID0gdHJ1ZTtcbiAgICAgICAgX3ByZW11bHRpcGxpZWRBbHBoYSA9IGNvbXAucHJlbXVsdGlwbGllZEFscGhhO1xuICAgICAgICBfbXVsdGlwbGllciA9IDEuMDtcbiAgICAgICAgX2hhbmRsZVZhbCA9IDB4MDA7XG4gICAgICAgIF9uZWVkQ29sb3IgPSBmYWxzZTtcbiAgICAgICAgX3ZlcnRleEVmZmVjdCA9IGNvbXAuX2VmZmVjdERlbGVnYXRlICYmIGNvbXAuX2VmZmVjdERlbGVnYXRlLl92ZXJ0ZXhFZmZlY3Q7XG5cbiAgICAgICAgaWYgKG5vZGVDb2xvci5fdmFsICE9PSAweGZmZmZmZmZmIHx8IF9wcmVtdWx0aXBsaWVkQWxwaGEpIHtcbiAgICAgICAgICAgIF9uZWVkQ29sb3IgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF91c2VUaW50KSB7XG4gICAgICAgICAgICBfaGFuZGxlVmFsIHw9IEZMQUdfVFdPX0NPTE9SO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHdvcmxkTWF0ID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoX2NvbXAuZW5hYmxlQmF0Y2gpIHtcbiAgICAgICAgICAgIHdvcmxkTWF0ID0gX25vZGUuX3dvcmxkTWF0cml4O1xuICAgICAgICAgICAgX211c3RGbHVzaCA9IGZhbHNlO1xuICAgICAgICAgICAgX2hhbmRsZVZhbCB8PSBGTEFHX0JBVENIO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbXAuaXNBbmltYXRpb25DYWNoZWQoKSkge1xuICAgICAgICAgICAgLy8gVHJhdmVyc2UgaW5wdXQgYXNzZW1ibGVyLlxuICAgICAgICAgICAgdGhpcy5jYWNoZVRyYXZlcnNlKHdvcmxkTWF0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChfdmVydGV4RWZmZWN0KSBfdmVydGV4RWZmZWN0LmJlZ2luKGNvbXAuX3NrZWxldG9uKTtcbiAgICAgICAgICAgIHRoaXMucmVhbFRpbWVUcmF2ZXJzZSh3b3JsZE1hdCk7XG4gICAgICAgICAgICBpZiAoX3ZlcnRleEVmZmVjdCkgX3ZlcnRleEVmZmVjdC5lbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN5bmMgYXR0YWNoZWQgbm9kZSBtYXRyaXhcbiAgICAgICAgcmVuZGVyZXIud29ybGRNYXREaXJ0eSsrO1xuICAgICAgICBjb21wLmF0dGFjaFV0aWwuX3N5bmNBdHRhY2hlZE5vZGUoKTtcblxuICAgICAgICAvLyBDbGVhciB0ZW1wIHZhci5cbiAgICAgICAgX25vZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIF9idWZmZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIF9yZW5kZXJlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgX2NvbXAgPSB1bmRlZmluZWQ7XG4gICAgICAgIF92ZXJ0ZXhFZmZlY3QgPSBudWxsO1xuICAgIH1cblxuICAgIHBvc3RGaWxsQnVmZmVycyAoY29tcCwgcmVuZGVyZXIpIHtcbiAgICAgICAgcmVuZGVyZXIud29ybGRNYXREaXJ0eS0tO1xuICAgIH1cbn1cblxuQXNzZW1ibGVyLnJlZ2lzdGVyKFNrZWxldG9uLCBTcGluZUFzc2VtYmxlcik7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==