
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/spine/skeleton-cache.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

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
var TrackEntryListeners = require('./track-entry-listeners');

var spine = require('./lib/spine'); // Permit max cache time, unit is second.


var MaxCacheTime = 30;
var FrameTime = 1 / 60;
var _vertices = [];
var _indices = [];
var _boneInfoOffset = 0;
var _vertexOffset = 0;
var _indexOffset = 0;
var _vfOffset = 0;
var _preTexUrl = null;
var _preBlendMode = null;
var _segVCount = 0;
var _segICount = 0;
var _segOffset = 0;
var _colorOffset = 0;
var _preFinalColor = null;
var _preDarkColor = null; // x y u v c1 c2

var _perVertexSize = 6; // x y u v r1 g1 b1 a1 r2 g2 b2 a2

var _perClipVertexSize = 12;
var _vfCount = 0,
    _indexCount = 0;

var _tempr, _tempg, _tempb, _tempa;

var _finalColor32, _darkColor32;

var _finalColor = new spine.Color(1, 1, 1, 1);

var _darkColor = new spine.Color(1, 1, 1, 1);

var _quadTriangles = [0, 1, 2, 2, 3, 0]; //Cache all frames in an animation

var AnimationCache = cc.Class({
  ctor: function ctor() {
    this._privateMode = false;
    this._inited = false;
    this._invalid = true;
    this._enableCacheAttachedInfo = false;
    this.frames = [];
    this.totalTime = 0;
    this._frameIdx = -1;
    this.isCompleted = false;
    this._skeletonInfo = null;
    this._animationName = null;
    this._tempSegments = null;
    this._tempColors = null;
    this._tempBoneInfos = null;
  },
  init: function init(skeletonInfo, animationName) {
    this._inited = true;
    this._animationName = animationName;
    this._skeletonInfo = skeletonInfo;
  },
  // Clear texture quote.
  clear: function clear() {
    this._inited = false;

    for (var i = 0, n = this.frames.length; i < n; i++) {
      var frame = this.frames[i];
      frame.segments.length = 0;
    }

    this.invalidAllFrame();
  },
  bind: function bind(listener) {
    var completeHandle = function (entry) {
      if (entry && entry.animation.name === this._animationName) {
        this.isCompleted = true;
      }
    }.bind(this);

    listener.complete = completeHandle;
  },
  unbind: function unbind(listener) {
    listener.complete = null;
  },
  begin: function begin() {
    if (!this._invalid) return;
    var skeletonInfo = this._skeletonInfo;
    var preAnimationCache = skeletonInfo.curAnimationCache;

    if (preAnimationCache && preAnimationCache !== this) {
      if (this._privateMode) {
        // Private cache mode just invalid pre animation frame.
        preAnimationCache.invalidAllFrame();
      } else {
        // If pre animation not finished, play it to the end.
        preAnimationCache.updateToFrame();
      }
    }

    var skeleton = skeletonInfo.skeleton;
    var listener = skeletonInfo.listener;
    var state = skeletonInfo.state;
    var animation = skeleton.data.findAnimation(this._animationName);
    state.setAnimationWith(0, animation, false);
    this.bind(listener); // record cur animation cache

    skeletonInfo.curAnimationCache = this;
    this._frameIdx = -1;
    this.isCompleted = false;
    this.totalTime = 0;
    this._invalid = false;
  },
  end: function end() {
    if (!this._needToUpdate()) {
      // clear cur animation cache
      this._skeletonInfo.curAnimationCache = null;
      this.frames.length = this._frameIdx + 1;
      this.isCompleted = true;
      this.unbind(this._skeletonInfo.listener);
    }
  },
  _needToUpdate: function _needToUpdate(toFrameIdx) {
    return !this.isCompleted && this.totalTime < MaxCacheTime && (toFrameIdx == undefined || this._frameIdx < toFrameIdx);
  },
  updateToFrame: function updateToFrame(toFrameIdx) {
    if (!this._inited) return;
    this.begin();
    if (!this._needToUpdate(toFrameIdx)) return;
    var skeletonInfo = this._skeletonInfo;
    var skeleton = skeletonInfo.skeleton;
    var clipper = skeletonInfo.clipper;
    var state = skeletonInfo.state;

    do {
      // Solid update frame rate 1/60.
      skeleton.update(FrameTime);
      state.update(FrameTime);
      state.apply(skeleton);
      skeleton.updateWorldTransform();
      this._frameIdx++;

      this._updateFrame(skeleton, clipper, this._frameIdx);

      this.totalTime += FrameTime;
    } while (this._needToUpdate(toFrameIdx));

    this.end();
  },
  isInited: function isInited() {
    return this._inited;
  },
  isInvalid: function isInvalid() {
    return this._invalid;
  },
  invalidAllFrame: function invalidAllFrame() {
    this.isCompleted = false;
    this._invalid = true;
  },
  updateAllFrame: function updateAllFrame() {
    this.invalidAllFrame();
    this.updateToFrame();
  },
  enableCacheAttachedInfo: function enableCacheAttachedInfo() {
    if (!this._enableCacheAttachedInfo) {
      this._enableCacheAttachedInfo = true;
      this.invalidAllFrame();
    }
  },
  _updateFrame: function _updateFrame(skeleton, clipper, index) {
    _vfOffset = 0;
    _boneInfoOffset = 0;
    _indexOffset = 0;
    _vertexOffset = 0;
    _preTexUrl = null;
    _preBlendMode = null;
    _segVCount = 0;
    _segICount = 0;
    _segOffset = 0;
    _colorOffset = 0;
    _preFinalColor = null;
    _preDarkColor = null;
    this.frames[index] = this.frames[index] || {
      segments: [],
      colors: [],
      boneInfos: [],
      vertices: null,
      uintVert: null,
      indices: null
    };
    var frame = this.frames[index];
    var segments = this._tempSegments = frame.segments;
    var colors = this._tempColors = frame.colors;
    var boneInfos = this._tempBoneInfos = frame.boneInfos;

    this._traverseSkeleton(skeleton, clipper);

    if (_colorOffset > 0) {
      colors[_colorOffset - 1].vfOffset = _vfOffset;
    }

    colors.length = _colorOffset;
    boneInfos.length = _boneInfoOffset; // Handle pre segment.

    var preSegOffset = _segOffset - 1;

    if (preSegOffset >= 0) {
      // Judge segment vertex count is not empty.
      if (_segICount > 0) {
        var preSegInfo = segments[preSegOffset];
        preSegInfo.indexCount = _segICount;
        preSegInfo.vfCount = _segVCount * _perVertexSize;
        preSegInfo.vertexCount = _segVCount;
        segments.length = _segOffset;
      } else {
        // Discard pre segment.
        segments.length = _segOffset - 1;
      }
    } // Segments is empty,discard all segments.


    if (segments.length == 0) return; // Fill vertices

    var vertices = frame.vertices;
    var uintVert = frame.uintVert;

    if (!vertices || vertices.length < _vfOffset) {
      vertices = frame.vertices = new Float32Array(_vfOffset);
      uintVert = frame.uintVert = new Uint32Array(vertices.buffer);
    }

    for (var i = 0, j = 0; i < _vfOffset;) {
      vertices[i++] = _vertices[j++]; // x

      vertices[i++] = _vertices[j++]; // y

      vertices[i++] = _vertices[j++]; // u

      vertices[i++] = _vertices[j++]; // v

      uintVert[i++] = _vertices[j++]; // color1

      uintVert[i++] = _vertices[j++]; // color2
    } // Fill indices


    var indices = frame.indices;

    if (!indices || indices.length < _indexOffset) {
      indices = frame.indices = new Uint16Array(_indexOffset);
    }

    for (var _i = 0; _i < _indexOffset; _i++) {
      indices[_i] = _indices[_i];
    }

    frame.vertices = vertices;
    frame.uintVert = uintVert;
    frame.indices = indices;
  },
  fillVertices: function fillVertices(skeletonColor, attachmentColor, slotColor, clipper, slot) {
    _tempa = slotColor.a * attachmentColor.a * skeletonColor.a * 255;
    _tempr = attachmentColor.r * skeletonColor.r * 255;
    _tempg = attachmentColor.g * skeletonColor.g * 255;
    _tempb = attachmentColor.b * skeletonColor.b * 255;
    _finalColor.r = _tempr * slotColor.r;
    _finalColor.g = _tempg * slotColor.g;
    _finalColor.b = _tempb * slotColor.b;
    _finalColor.a = _tempa;

    if (slot.darkColor == null) {
      _darkColor.set(0.0, 0, 0, 1.0);
    } else {
      _darkColor.r = slot.darkColor.r * _tempr;
      _darkColor.g = slot.darkColor.g * _tempg;
      _darkColor.b = slot.darkColor.b * _tempb;
    }

    _darkColor.a = 0;
    _finalColor32 = (_finalColor.a << 24 >>> 0) + (_finalColor.b << 16) + (_finalColor.g << 8) + _finalColor.r;
    _darkColor32 = (_darkColor.a << 24 >>> 0) + (_darkColor.b << 16) + (_darkColor.g << 8) + _darkColor.r;

    if (_preFinalColor !== _finalColor32 || _preDarkColor !== _darkColor32) {
      var colors = this._tempColors;
      _preFinalColor = _finalColor32;
      _preDarkColor = _darkColor32;

      if (_colorOffset > 0) {
        colors[_colorOffset - 1].vfOffset = _vfOffset;
      }

      colors[_colorOffset++] = {
        fr: _finalColor.r,
        fg: _finalColor.g,
        fb: _finalColor.b,
        fa: _finalColor.a,
        dr: _darkColor.r,
        dg: _darkColor.g,
        db: _darkColor.b,
        da: _darkColor.a,
        vfOffset: 0
      };
    }

    if (!clipper.isClipping()) {
      for (var v = _vfOffset, n = _vfOffset + _vfCount; v < n; v += _perVertexSize) {
        _vertices[v + 4] = _finalColor32; // light color

        _vertices[v + 5] = _darkColor32; // dark color
      }
    } else {
      clipper.clipTriangles(_vertices, _vfCount, _indices, _indexCount, _vertices, _finalColor, _darkColor, true, _perVertexSize, _indexOffset, _vfOffset, _vfOffset + 2);
      var clippedVertices = clipper.clippedVertices;
      var clippedTriangles = clipper.clippedTriangles; // insure capacity

      _indexCount = clippedTriangles.length;
      _vfCount = clippedVertices.length / _perClipVertexSize * _perVertexSize; // fill indices

      for (var ii = 0, jj = _indexOffset, nn = clippedTriangles.length; ii < nn;) {
        _indices[jj++] = clippedTriangles[ii++];
      } // fill vertices contain x y u v light color dark color


      for (var _v = 0, _n = clippedVertices.length, offset = _vfOffset; _v < _n; _v += 12, offset += _perVertexSize) {
        _vertices[offset] = clippedVertices[_v]; // x

        _vertices[offset + 1] = clippedVertices[_v + 1]; // y

        _vertices[offset + 2] = clippedVertices[_v + 6]; // u

        _vertices[offset + 3] = clippedVertices[_v + 7]; // v

        _vertices[offset + 4] = _finalColor32;
        _vertices[offset + 5] = _darkColor32;
      }
    }
  },
  _traverseSkeleton: function _traverseSkeleton(skeleton, clipper) {
    var segments = this._tempSegments;
    var boneInfos = this._tempBoneInfos;
    var skeletonColor = skeleton.color;
    var attachment, attachmentColor, slotColor, uvs, triangles;
    var isRegion, isMesh, isClip;
    var texture;
    var preSegOffset, preSegInfo;
    var blendMode;
    var slot;
    var bones = skeleton.bones;

    if (this._enableCacheAttachedInfo) {
      for (var i = 0, l = bones.length; i < l; i++, _boneInfoOffset++) {
        var bone = bones[i];
        var boneInfo = boneInfos[_boneInfoOffset];

        if (!boneInfo) {
          boneInfo = boneInfos[_boneInfoOffset] = {};
        }

        boneInfo.a = bone.a;
        boneInfo.b = bone.b;
        boneInfo.c = bone.c;
        boneInfo.d = bone.d;
        boneInfo.worldX = bone.worldX;
        boneInfo.worldY = bone.worldY;
      }
    }

    for (var slotIdx = 0, slotCount = skeleton.drawOrder.length; slotIdx < slotCount; slotIdx++) {
      slot = skeleton.drawOrder[slotIdx];
      _vfCount = 0;
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

      texture = attachment.region.texture._texture;

      if (!texture) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      blendMode = slot.data.blendMode;

      if (_preTexUrl !== texture.nativeUrl || _preBlendMode !== blendMode) {
        _preTexUrl = texture.nativeUrl;
        _preBlendMode = blendMode; // Handle pre segment.

        preSegOffset = _segOffset - 1;

        if (preSegOffset >= 0) {
          if (_segICount > 0) {
            preSegInfo = segments[preSegOffset];
            preSegInfo.indexCount = _segICount;
            preSegInfo.vertexCount = _segVCount;
            preSegInfo.vfCount = _segVCount * _perVertexSize;
          } else {
            // Discard pre segment.
            _segOffset--;
          }
        } // Handle now segment.


        segments[_segOffset] = {
          tex: texture,
          blendMode: blendMode,
          indexCount: 0,
          vertexCount: 0,
          vfCount: 0
        };
        _segOffset++;
        _segICount = 0;
        _segVCount = 0;
      }

      if (isRegion) {
        triangles = _quadTriangles; // insure capacity

        _vfCount = 4 * _perVertexSize;
        _indexCount = 6; // compute vertex and fill x y

        attachment.computeWorldVertices(slot.bone, _vertices, _vfOffset, _perVertexSize);
      } else if (isMesh) {
        triangles = attachment.triangles; // insure capacity

        _vfCount = (attachment.worldVerticesLength >> 1) * _perVertexSize;
        _indexCount = triangles.length; // compute vertex and fill x y

        attachment.computeWorldVertices(slot, 0, attachment.worldVerticesLength, _vertices, _vfOffset, _perVertexSize);
      }

      if (_vfCount == 0 || _indexCount == 0) {
        clipper.clipEndWithSlot(slot);
        continue;
      } // fill indices


      for (var ii = 0, jj = _indexOffset, nn = triangles.length; ii < nn;) {
        _indices[jj++] = triangles[ii++];
      } // fill u v


      uvs = attachment.uvs;

      for (var v = _vfOffset, n = _vfOffset + _vfCount, u = 0; v < n; v += _perVertexSize, u += 2) {
        _vertices[v + 2] = uvs[u]; // u

        _vertices[v + 3] = uvs[u + 1]; // v
      }

      attachmentColor = attachment.color;
      slotColor = slot.color;
      this.fillVertices(skeletonColor, attachmentColor, slotColor, clipper, slot);

      if (_indexCount > 0) {
        for (var _ii = _indexOffset, _nn = _indexOffset + _indexCount; _ii < _nn; _ii++) {
          _indices[_ii] += _segVCount;
        }

        _indexOffset += _indexCount;
        _vfOffset += _vfCount;
        _vertexOffset = _vfOffset / _perVertexSize;
        _segICount += _indexCount;
        _segVCount += _vfCount / _perVertexSize;
      }

      clipper.clipEndWithSlot(slot);
    }

    clipper.clipEnd();
  }
});
var SkeletonCache = cc.Class({
  ctor: function ctor() {
    this._privateMode = false;
    this._animationPool = {};
    this._skeletonCache = {};
  },
  enablePrivateMode: function enablePrivateMode() {
    this._privateMode = true;
  },
  clear: function clear() {
    this._animationPool = {};
    this._skeletonCache = {};
  },
  removeSkeleton: function removeSkeleton(uuid) {
    var skeletonInfo = this._skeletonCache[uuid];
    if (!skeletonInfo) return;
    var animationsCache = skeletonInfo.animationsCache;

    for (var aniKey in animationsCache) {
      // Clear cache texture, and put cache into pool.
      // No need to create TypedArray next time.
      var animationCache = animationsCache[aniKey];
      if (!animationCache) continue;
      this._animationPool[uuid + "#" + aniKey] = animationCache;
      animationCache.clear();
    }

    delete this._skeletonCache[uuid];
  },
  getSkeletonCache: function getSkeletonCache(uuid, skeletonData) {
    var skeletonInfo = this._skeletonCache[uuid];

    if (!skeletonInfo) {
      var skeleton = new spine.Skeleton(skeletonData);
      var clipper = new spine.SkeletonClipping();
      var stateData = new spine.AnimationStateData(skeleton.data);
      var state = new spine.AnimationState(stateData);
      var listener = new TrackEntryListeners();
      state.addListener(listener);
      this._skeletonCache[uuid] = skeletonInfo = {
        skeleton: skeleton,
        clipper: clipper,
        state: state,
        listener: listener,
        // Cache all kinds of animation frame.
        // When skeleton is dispose, clear all animation cache.
        animationsCache: {},
        curAnimationCache: null
      };
    }

    return skeletonInfo;
  },
  getAnimationCache: function getAnimationCache(uuid, animationName) {
    var skeletonInfo = this._skeletonCache[uuid];
    if (!skeletonInfo) return null;
    var animationsCache = skeletonInfo.animationsCache;
    return animationsCache[animationName];
  },
  invalidAnimationCache: function invalidAnimationCache(uuid) {
    var skeletonInfo = this._skeletonCache[uuid];
    var skeleton = skeletonInfo && skeletonInfo.skeleton;
    if (!skeleton) return;
    var animationsCache = skeletonInfo.animationsCache;

    for (var aniKey in animationsCache) {
      var animationCache = animationsCache[aniKey];
      animationCache.invalidAllFrame();
    }
  },
  initAnimationCache: function initAnimationCache(uuid, animationName) {
    if (!animationName) return null;
    var skeletonInfo = this._skeletonCache[uuid];
    var skeleton = skeletonInfo && skeletonInfo.skeleton;
    if (!skeleton) return null;
    var animation = skeleton.data.findAnimation(animationName);

    if (!animation) {
      return null;
    }

    var animationsCache = skeletonInfo.animationsCache;
    var animationCache = animationsCache[animationName];

    if (!animationCache) {
      // If cache exist in pool, then just use it.
      var poolKey = uuid + "#" + animationName;
      animationCache = this._animationPool[poolKey];

      if (animationCache) {
        delete this._animationPool[poolKey];
      } else {
        animationCache = new AnimationCache();
        animationCache._privateMode = this._privateMode;
      }

      animationCache.init(skeletonInfo, animationName);
      animationsCache[animationName] = animationCache;
    }

    return animationCache;
  },
  updateAnimationCache: function updateAnimationCache(uuid, animationName) {
    if (animationName) {
      var animationCache = this.initAnimationCache(uuid, animationName);
      if (!animationCache) return null;
      animationCache.updateAllFrame();
    } else {
      var skeletonInfo = this._skeletonCache[uuid];
      var skeleton = skeletonInfo && skeletonInfo.skeleton;
      if (!skeleton) return;
      var animationsCache = skeletonInfo.animationsCache;

      for (var aniKey in animationsCache) {
        var _animationCache = animationsCache[aniKey];

        _animationCache.updateAllFrame();
      }
    }
  }
});
SkeletonCache.FrameTime = FrameTime;
SkeletonCache.sharedCache = new SkeletonCache();
module.exports = SkeletonCache;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvZXh0ZW5zaW9ucy9zcGluZS9za2VsZXRvbi1jYWNoZS5qcyJdLCJuYW1lcyI6WyJUcmFja0VudHJ5TGlzdGVuZXJzIiwicmVxdWlyZSIsInNwaW5lIiwiTWF4Q2FjaGVUaW1lIiwiRnJhbWVUaW1lIiwiX3ZlcnRpY2VzIiwiX2luZGljZXMiLCJfYm9uZUluZm9PZmZzZXQiLCJfdmVydGV4T2Zmc2V0IiwiX2luZGV4T2Zmc2V0IiwiX3ZmT2Zmc2V0IiwiX3ByZVRleFVybCIsIl9wcmVCbGVuZE1vZGUiLCJfc2VnVkNvdW50IiwiX3NlZ0lDb3VudCIsIl9zZWdPZmZzZXQiLCJfY29sb3JPZmZzZXQiLCJfcHJlRmluYWxDb2xvciIsIl9wcmVEYXJrQ29sb3IiLCJfcGVyVmVydGV4U2l6ZSIsIl9wZXJDbGlwVmVydGV4U2l6ZSIsIl92ZkNvdW50IiwiX2luZGV4Q291bnQiLCJfdGVtcHIiLCJfdGVtcGciLCJfdGVtcGIiLCJfdGVtcGEiLCJfZmluYWxDb2xvcjMyIiwiX2RhcmtDb2xvcjMyIiwiX2ZpbmFsQ29sb3IiLCJDb2xvciIsIl9kYXJrQ29sb3IiLCJfcXVhZFRyaWFuZ2xlcyIsIkFuaW1hdGlvbkNhY2hlIiwiY2MiLCJDbGFzcyIsImN0b3IiLCJfcHJpdmF0ZU1vZGUiLCJfaW5pdGVkIiwiX2ludmFsaWQiLCJfZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8iLCJmcmFtZXMiLCJ0b3RhbFRpbWUiLCJfZnJhbWVJZHgiLCJpc0NvbXBsZXRlZCIsIl9za2VsZXRvbkluZm8iLCJfYW5pbWF0aW9uTmFtZSIsIl90ZW1wU2VnbWVudHMiLCJfdGVtcENvbG9ycyIsIl90ZW1wQm9uZUluZm9zIiwiaW5pdCIsInNrZWxldG9uSW5mbyIsImFuaW1hdGlvbk5hbWUiLCJjbGVhciIsImkiLCJuIiwibGVuZ3RoIiwiZnJhbWUiLCJzZWdtZW50cyIsImludmFsaWRBbGxGcmFtZSIsImJpbmQiLCJsaXN0ZW5lciIsImNvbXBsZXRlSGFuZGxlIiwiZW50cnkiLCJhbmltYXRpb24iLCJuYW1lIiwiY29tcGxldGUiLCJ1bmJpbmQiLCJiZWdpbiIsInByZUFuaW1hdGlvbkNhY2hlIiwiY3VyQW5pbWF0aW9uQ2FjaGUiLCJ1cGRhdGVUb0ZyYW1lIiwic2tlbGV0b24iLCJzdGF0ZSIsImRhdGEiLCJmaW5kQW5pbWF0aW9uIiwic2V0QW5pbWF0aW9uV2l0aCIsImVuZCIsIl9uZWVkVG9VcGRhdGUiLCJ0b0ZyYW1lSWR4IiwidW5kZWZpbmVkIiwiY2xpcHBlciIsInVwZGF0ZSIsImFwcGx5IiwidXBkYXRlV29ybGRUcmFuc2Zvcm0iLCJfdXBkYXRlRnJhbWUiLCJpc0luaXRlZCIsImlzSW52YWxpZCIsInVwZGF0ZUFsbEZyYW1lIiwiZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8iLCJpbmRleCIsImNvbG9ycyIsImJvbmVJbmZvcyIsInZlcnRpY2VzIiwidWludFZlcnQiLCJpbmRpY2VzIiwiX3RyYXZlcnNlU2tlbGV0b24iLCJ2Zk9mZnNldCIsInByZVNlZ09mZnNldCIsInByZVNlZ0luZm8iLCJpbmRleENvdW50IiwidmZDb3VudCIsInZlcnRleENvdW50IiwiRmxvYXQzMkFycmF5IiwiVWludDMyQXJyYXkiLCJidWZmZXIiLCJqIiwiVWludDE2QXJyYXkiLCJmaWxsVmVydGljZXMiLCJza2VsZXRvbkNvbG9yIiwiYXR0YWNobWVudENvbG9yIiwic2xvdENvbG9yIiwic2xvdCIsImEiLCJyIiwiZyIsImIiLCJkYXJrQ29sb3IiLCJzZXQiLCJmciIsImZnIiwiZmIiLCJmYSIsImRyIiwiZGciLCJkYiIsImRhIiwiaXNDbGlwcGluZyIsInYiLCJjbGlwVHJpYW5nbGVzIiwiY2xpcHBlZFZlcnRpY2VzIiwiY2xpcHBlZFRyaWFuZ2xlcyIsImlpIiwiamoiLCJubiIsIm9mZnNldCIsImNvbG9yIiwiYXR0YWNobWVudCIsInV2cyIsInRyaWFuZ2xlcyIsImlzUmVnaW9uIiwiaXNNZXNoIiwiaXNDbGlwIiwidGV4dHVyZSIsImJsZW5kTW9kZSIsImJvbmVzIiwibCIsImJvbmUiLCJib25lSW5mbyIsImMiLCJkIiwid29ybGRYIiwid29ybGRZIiwic2xvdElkeCIsInNsb3RDb3VudCIsImRyYXdPcmRlciIsImdldEF0dGFjaG1lbnQiLCJjbGlwRW5kV2l0aFNsb3QiLCJSZWdpb25BdHRhY2htZW50IiwiTWVzaEF0dGFjaG1lbnQiLCJDbGlwcGluZ0F0dGFjaG1lbnQiLCJjbGlwU3RhcnQiLCJyZWdpb24iLCJfdGV4dHVyZSIsIm5hdGl2ZVVybCIsInRleCIsImNvbXB1dGVXb3JsZFZlcnRpY2VzIiwid29ybGRWZXJ0aWNlc0xlbmd0aCIsInUiLCJjbGlwRW5kIiwiU2tlbGV0b25DYWNoZSIsIl9hbmltYXRpb25Qb29sIiwiX3NrZWxldG9uQ2FjaGUiLCJlbmFibGVQcml2YXRlTW9kZSIsInJlbW92ZVNrZWxldG9uIiwidXVpZCIsImFuaW1hdGlvbnNDYWNoZSIsImFuaUtleSIsImFuaW1hdGlvbkNhY2hlIiwiZ2V0U2tlbGV0b25DYWNoZSIsInNrZWxldG9uRGF0YSIsIlNrZWxldG9uIiwiU2tlbGV0b25DbGlwcGluZyIsInN0YXRlRGF0YSIsIkFuaW1hdGlvblN0YXRlRGF0YSIsIkFuaW1hdGlvblN0YXRlIiwiYWRkTGlzdGVuZXIiLCJnZXRBbmltYXRpb25DYWNoZSIsImludmFsaWRBbmltYXRpb25DYWNoZSIsImluaXRBbmltYXRpb25DYWNoZSIsInBvb2xLZXkiLCJ1cGRhdGVBbmltYXRpb25DYWNoZSIsInNoYXJlZENhY2hlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsSUFBTUEsbUJBQW1CLEdBQUdDLE9BQU8sQ0FBQyx5QkFBRCxDQUFuQzs7QUFDQSxJQUFNQyxLQUFLLEdBQUdELE9BQU8sQ0FBQyxhQUFELENBQXJCLEVBQ0E7OztBQUNBLElBQU1FLFlBQVksR0FBRyxFQUFyQjtBQUNBLElBQU1DLFNBQVMsR0FBRyxJQUFJLEVBQXRCO0FBRUEsSUFBSUMsU0FBUyxHQUFH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T0FBUCxHQUFpQnhCLGFBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jb25zdCBUcmFja0VudHJ5TGlzdGVuZXJzID0gcmVxdWlyZSgnLi90cmFjay1lbnRyeS1saXN0ZW5lcnMnKTtcbmNvbnN0IHNwaW5lID0gcmVxdWlyZSgnLi9saWIvc3BpbmUnKTtcbi8vIFBlcm1pdCBtYXggY2FjaGUgdGltZSwgdW5pdCBpcyBzZWNvbmQuXG5jb25zdCBNYXhDYWNoZVRpbWUgPSAzMDtcbmNvbnN0IEZyYW1lVGltZSA9IDEgLyA2MDtcblxubGV0IF92ZXJ0aWNlcyA9IFtdO1xubGV0IF9pbmRpY2VzID0gW107XG5sZXQgX2JvbmVJbmZvT2Zmc2V0ID0gMDtcbmxldCBfdmVydGV4T2Zmc2V0ID0gMDtcbmxldCBfaW5kZXhPZmZzZXQgPSAwO1xubGV0IF92Zk9mZnNldCA9IDA7XG5sZXQgX3ByZVRleFVybCA9IG51bGw7XG5sZXQgX3ByZUJsZW5kTW9kZSA9IG51bGw7XG5sZXQgX3NlZ1ZDb3VudCA9IDA7XG5sZXQgX3NlZ0lDb3VudCA9IDA7XG5sZXQgX3NlZ09mZnNldCA9IDA7XG5sZXQgX2NvbG9yT2Zmc2V0ID0gMDtcbmxldCBfcHJlRmluYWxDb2xvciA9IG51bGw7XG5sZXQgX3ByZURhcmtDb2xvciA9IG51bGw7XG4vLyB4IHkgdSB2IGMxIGMyXG5sZXQgX3BlclZlcnRleFNpemUgPSA2O1xuLy8geCB5IHUgdiByMSBnMSBiMSBhMSByMiBnMiBiMiBhMlxubGV0IF9wZXJDbGlwVmVydGV4U2l6ZSA9IDEyO1xubGV0IF92ZkNvdW50ID0gMCwgX2luZGV4Q291bnQgPSAwO1xubGV0IF90ZW1wciwgX3RlbXBnLCBfdGVtcGIsIF90ZW1wYTtcbmxldCBfZmluYWxDb2xvcjMyLCBfZGFya0NvbG9yMzI7XG5sZXQgX2ZpbmFsQ29sb3IgPSBuZXcgc3BpbmUuQ29sb3IoMSwgMSwgMSwgMSk7XG5sZXQgX2RhcmtDb2xvciA9IG5ldyBzcGluZS5Db2xvcigxLCAxLCAxLCAxKTtcbmxldCBfcXVhZFRyaWFuZ2xlcyA9IFswLCAxLCAyLCAyLCAzLCAwXTtcblxuLy9DYWNoZSBhbGwgZnJhbWVzIGluIGFuIGFuaW1hdGlvblxubGV0IEFuaW1hdGlvbkNhY2hlID0gY2MuQ2xhc3Moe1xuICAgIGN0b3IgKCkge1xuICAgICAgICB0aGlzLl9wcml2YXRlTW9kZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbml0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW52YWxpZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2VuYWJsZUNhY2hlQXR0YWNoZWRJbmZvID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZnJhbWVzID0gW107XG4gICAgICAgIHRoaXMudG90YWxUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fZnJhbWVJZHggPSAtMTtcbiAgICAgICAgdGhpcy5pc0NvbXBsZXRlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX3NrZWxldG9uSW5mbyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbk5hbWUgPSBudWxsO1xuICAgICAgICB0aGlzLl90ZW1wU2VnbWVudHMgPSBudWxsO1xuICAgICAgICB0aGlzLl90ZW1wQ29sb3JzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdGVtcEJvbmVJbmZvcyA9IG51bGw7XG4gICAgfSxcblxuICAgIGluaXQgKHNrZWxldG9uSW5mbywgYW5pbWF0aW9uTmFtZSkge1xuICAgICAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9hbmltYXRpb25OYW1lID0gYW5pbWF0aW9uTmFtZTtcbiAgICAgICAgdGhpcy5fc2tlbGV0b25JbmZvID0gc2tlbGV0b25JbmZvO1xuICAgIH0sXG5cbiAgICAvLyBDbGVhciB0ZXh0dXJlIHF1b3RlLlxuICAgIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5faW5pdGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gdGhpcy5mcmFtZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZnJhbWUgPSB0aGlzLmZyYW1lc1tpXTtcbiAgICAgICAgICAgIGZyYW1lLnNlZ21lbnRzLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbnZhbGlkQWxsRnJhbWUoKTtcbiAgICB9LFxuXG4gICAgYmluZCAobGlzdGVuZXIpIHtcbiAgICAgICAgbGV0IGNvbXBsZXRlSGFuZGxlID0gZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICBpZiAoZW50cnkgJiYgZW50cnkuYW5pbWF0aW9uLm5hbWUgPT09IHRoaXMuX2FuaW1hdGlvbk5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIGxpc3RlbmVyLmNvbXBsZXRlID0gY29tcGxldGVIYW5kbGU7XG4gICAgfSxcblxuICAgIHVuYmluZCAobGlzdGVuZXIpIHtcbiAgICAgICAgbGlzdGVuZXIuY29tcGxldGUgPSBudWxsO1xuICAgIH0sXG5cbiAgICBiZWdpbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5faW52YWxpZCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBza2VsZXRvbkluZm8gPSB0aGlzLl9za2VsZXRvbkluZm87XG4gICAgICAgIGxldCBwcmVBbmltYXRpb25DYWNoZSA9IHNrZWxldG9uSW5mby5jdXJBbmltYXRpb25DYWNoZTtcbiAgICAgICAgXG4gICAgICAgIGlmIChwcmVBbmltYXRpb25DYWNoZSAmJiBwcmVBbmltYXRpb25DYWNoZSAhPT0gdGhpcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3ByaXZhdGVNb2RlKSB7XG4gICAgICAgICAgICAgICAgLy8gUHJpdmF0ZSBjYWNoZSBtb2RlIGp1c3QgaW52YWxpZCBwcmUgYW5pbWF0aW9uIGZyYW1lLlxuICAgICAgICAgICAgICAgIHByZUFuaW1hdGlvbkNhY2hlLmludmFsaWRBbGxGcmFtZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBwcmUgYW5pbWF0aW9uIG5vdCBmaW5pc2hlZCwgcGxheSBpdCB0byB0aGUgZW5kLlxuICAgICAgICAgICAgICAgIHByZUFuaW1hdGlvbkNhY2hlLnVwZGF0ZVRvRnJhbWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBza2VsZXRvbiA9IHNrZWxldG9uSW5mby5za2VsZXRvbjtcbiAgICAgICAgbGV0IGxpc3RlbmVyID0gc2tlbGV0b25JbmZvLmxpc3RlbmVyO1xuICAgICAgICBsZXQgc3RhdGUgPSBza2VsZXRvbkluZm8uc3RhdGU7XG5cbiAgICAgICAgbGV0IGFuaW1hdGlvbiA9IHNrZWxldG9uLmRhdGEuZmluZEFuaW1hdGlvbih0aGlzLl9hbmltYXRpb25OYW1lKTtcbiAgICAgICAgc3RhdGUuc2V0QW5pbWF0aW9uV2l0aCgwLCBhbmltYXRpb24sIGZhbHNlKTtcbiAgICAgICAgdGhpcy5iaW5kKGxpc3RlbmVyKTtcblxuICAgICAgICAvLyByZWNvcmQgY3VyIGFuaW1hdGlvbiBjYWNoZVxuICAgICAgICBza2VsZXRvbkluZm8uY3VyQW5pbWF0aW9uQ2FjaGUgPSB0aGlzO1xuICAgICAgICB0aGlzLl9mcmFtZUlkeCA9IC0xO1xuICAgICAgICB0aGlzLmlzQ29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudG90YWxUaW1lID0gMDtcbiAgICAgICAgdGhpcy5faW52YWxpZCA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBlbmQgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX25lZWRUb1VwZGF0ZSgpKSB7XG4gICAgICAgICAgICAvLyBjbGVhciBjdXIgYW5pbWF0aW9uIGNhY2hlXG4gICAgICAgICAgICB0aGlzLl9za2VsZXRvbkluZm8uY3VyQW5pbWF0aW9uQ2FjaGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5mcmFtZXMubGVuZ3RoID0gdGhpcy5fZnJhbWVJZHggKyAxO1xuICAgICAgICAgICAgdGhpcy5pc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnVuYmluZCh0aGlzLl9za2VsZXRvbkluZm8ubGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9uZWVkVG9VcGRhdGUgKHRvRnJhbWVJZHgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzQ29tcGxldGVkICYmIFxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxUaW1lIDwgTWF4Q2FjaGVUaW1lICYmIFxuICAgICAgICAgICAgICAgICh0b0ZyYW1lSWR4ID09IHVuZGVmaW5lZCB8fCB0aGlzLl9mcmFtZUlkeCA8IHRvRnJhbWVJZHgpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVUb0ZyYW1lICh0b0ZyYW1lSWR4KSB7XG4gICAgICAgIGlmICghdGhpcy5faW5pdGVkKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5iZWdpbigpO1xuXG4gICAgICAgIGlmICghdGhpcy5fbmVlZFRvVXBkYXRlKHRvRnJhbWVJZHgpKSByZXR1cm47XG5cbiAgICAgICAgbGV0IHNrZWxldG9uSW5mbyA9IHRoaXMuX3NrZWxldG9uSW5mbztcbiAgICAgICAgbGV0IHNrZWxldG9uID0gc2tlbGV0b25JbmZvLnNrZWxldG9uO1xuICAgICAgICBsZXQgY2xpcHBlciA9IHNrZWxldG9uSW5mby5jbGlwcGVyO1xuICAgICAgICBsZXQgc3RhdGUgPSBza2VsZXRvbkluZm8uc3RhdGU7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgLy8gU29saWQgdXBkYXRlIGZyYW1lIHJhdGUgMS82MC5cbiAgICAgICAgICAgIHNrZWxldG9uLnVwZGF0ZShGcmFtZVRpbWUpO1xuICAgICAgICAgICAgc3RhdGUudXBkYXRlKEZyYW1lVGltZSk7XG4gICAgICAgICAgICBzdGF0ZS5hcHBseShza2VsZXRvbik7XG4gICAgICAgICAgICBza2VsZXRvbi51cGRhdGVXb3JsZFRyYW5zZm9ybSgpO1xuICAgICAgICAgICAgdGhpcy5fZnJhbWVJZHgrKztcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUZyYW1lKHNrZWxldG9uLCBjbGlwcGVyLCB0aGlzLl9mcmFtZUlkeCk7XG4gICAgICAgICAgICB0aGlzLnRvdGFsVGltZSArPSBGcmFtZVRpbWU7XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuX25lZWRUb1VwZGF0ZSh0b0ZyYW1lSWR4KSk7XG5cbiAgICAgICAgdGhpcy5lbmQoKTtcbiAgICB9LFxuXG4gICAgaXNJbml0ZWQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5pdGVkO1xuICAgIH0sXG5cbiAgICBpc0ludmFsaWQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52YWxpZDtcbiAgICB9LFxuXG4gICAgaW52YWxpZEFsbEZyYW1lICgpIHtcbiAgICAgICAgdGhpcy5pc0NvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbnZhbGlkID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgdXBkYXRlQWxsRnJhbWUgKCkge1xuICAgICAgICB0aGlzLmludmFsaWRBbGxGcmFtZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVRvRnJhbWUoKTtcbiAgICB9LFxuXG4gICAgZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8gKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2VuYWJsZUNhY2hlQXR0YWNoZWRJbmZvKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmFibGVDYWNoZUF0dGFjaGVkSW5mbyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmludmFsaWRBbGxGcmFtZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF91cGRhdGVGcmFtZSAoc2tlbGV0b24sIGNsaXBwZXIsIGluZGV4KSB7XG4gICAgICAgIF92Zk9mZnNldCA9IDA7XG4gICAgICAgIF9ib25lSW5mb09mZnNldCA9IDA7XG4gICAgICAgIF9pbmRleE9mZnNldCA9IDA7XG4gICAgICAgIF92ZXJ0ZXhPZmZzZXQgPSAwO1xuICAgICAgICBfcHJlVGV4VXJsID0gbnVsbDtcbiAgICAgICAgX3ByZUJsZW5kTW9kZSA9IG51bGw7XG4gICAgICAgIF9zZWdWQ291bnQgPSAwO1xuICAgICAgICBfc2VnSUNvdW50ID0gMDtcbiAgICAgICAgX3NlZ09mZnNldCA9IDA7XG4gICAgICAgIF9jb2xvck9mZnNldCA9IDA7XG4gICAgICAgIF9wcmVGaW5hbENvbG9yID0gbnVsbDtcbiAgICAgICAgX3ByZURhcmtDb2xvciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5mcmFtZXNbaW5kZXhdID0gdGhpcy5mcmFtZXNbaW5kZXhdIHx8IHtcbiAgICAgICAgICAgIHNlZ21lbnRzIDogW10sXG4gICAgICAgICAgICBjb2xvcnMgOiBbXSxcbiAgICAgICAgICAgIGJvbmVJbmZvcyA6IFtdLFxuICAgICAgICAgICAgdmVydGljZXMgOiBudWxsLFxuICAgICAgICAgICAgdWludFZlcnQgOiBudWxsLFxuICAgICAgICAgICAgaW5kaWNlcyA6IG51bGwsXG4gICAgICAgIH07XG4gICAgICAgIGxldCBmcmFtZSA9IHRoaXMuZnJhbWVzW2luZGV4XTtcblxuICAgICAgICBsZXQgc2VnbWVudHMgPSB0aGlzLl90ZW1wU2VnbWVudHMgPSBmcmFtZS5zZWdtZW50cztcbiAgICAgICAgbGV0IGNvbG9ycyA9IHRoaXMuX3RlbXBDb2xvcnMgPSBmcmFtZS5jb2xvcnM7XG4gICAgICAgIGxldCBib25lSW5mb3MgPSB0aGlzLl90ZW1wQm9uZUluZm9zID0gZnJhbWUuYm9uZUluZm9zO1xuICAgICAgICB0aGlzLl90cmF2ZXJzZVNrZWxldG9uKHNrZWxldG9uLCBjbGlwcGVyKTtcbiAgICAgICAgaWYgKF9jb2xvck9mZnNldCA+IDApIHtcbiAgICAgICAgICAgIGNvbG9yc1tfY29sb3JPZmZzZXQgLSAxXS52Zk9mZnNldCA9IF92Zk9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICBjb2xvcnMubGVuZ3RoID0gX2NvbG9yT2Zmc2V0O1xuICAgICAgICBib25lSW5mb3MubGVuZ3RoID0gX2JvbmVJbmZvT2Zmc2V0O1xuICAgICAgICAvLyBIYW5kbGUgcHJlIHNlZ21lbnQuXG4gICAgICAgIGxldCBwcmVTZWdPZmZzZXQgPSBfc2VnT2Zmc2V0IC0gMTtcbiAgICAgICAgaWYgKHByZVNlZ09mZnNldCA+PSAwKSB7XG4gICAgICAgICAgICAvLyBKdWRnZSBzZWdtZW50IHZlcnRleCBjb3VudCBpcyBub3QgZW1wdHkuXG4gICAgICAgICAgICBpZiAoX3NlZ0lDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJlU2VnSW5mbyA9IHNlZ21lbnRzW3ByZVNlZ09mZnNldF07XG4gICAgICAgICAgICAgICAgcHJlU2VnSW5mby5pbmRleENvdW50ID0gX3NlZ0lDb3VudDtcbiAgICAgICAgICAgICAgICBwcmVTZWdJbmZvLnZmQ291bnQgPSBfc2VnVkNvdW50ICogX3BlclZlcnRleFNpemU7XG4gICAgICAgICAgICAgICAgcHJlU2VnSW5mby52ZXJ0ZXhDb3VudCA9IF9zZWdWQ291bnQ7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMubGVuZ3RoID0gX3NlZ09mZnNldDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gRGlzY2FyZCBwcmUgc2VnbWVudC5cbiAgICAgICAgICAgICAgICBzZWdtZW50cy5sZW5ndGggPSBfc2VnT2Zmc2V0IC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNlZ21lbnRzIGlzIGVtcHR5LGRpc2NhcmQgYWxsIHNlZ21lbnRzLlxuICAgICAgICBpZiAoc2VnbWVudHMubGVuZ3RoID09IDApIHJldHVybjtcblxuICAgICAgICAvLyBGaWxsIHZlcnRpY2VzXG4gICAgICAgIGxldCB2ZXJ0aWNlcyA9IGZyYW1lLnZlcnRpY2VzO1xuICAgICAgICBsZXQgdWludFZlcnQgPSBmcmFtZS51aW50VmVydDtcbiAgICAgICAgaWYgKCF2ZXJ0aWNlcyB8fCB2ZXJ0aWNlcy5sZW5ndGggPCBfdmZPZmZzZXQpIHtcbiAgICAgICAgICAgIHZlcnRpY2VzID0gZnJhbWUudmVydGljZXMgPSBuZXcgRmxvYXQzMkFycmF5KF92Zk9mZnNldCk7XG4gICAgICAgICAgICB1aW50VmVydCA9IGZyYW1lLnVpbnRWZXJ0ID0gbmV3IFVpbnQzMkFycmF5KHZlcnRpY2VzLmJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGogPSAwOyBpIDwgX3ZmT2Zmc2V0Oykge1xuICAgICAgICAgICAgdmVydGljZXNbaSsrXSA9IF92ZXJ0aWNlc1tqKytdOyAvLyB4XG4gICAgICAgICAgICB2ZXJ0aWNlc1tpKytdID0gX3ZlcnRpY2VzW2orK107IC8vIHlcbiAgICAgICAgICAgIHZlcnRpY2VzW2krK10gPSBfdmVydGljZXNbaisrXTsgLy8gdVxuICAgICAgICAgICAgdmVydGljZXNbaSsrXSA9IF92ZXJ0aWNlc1tqKytdOyAvLyB2XG4gICAgICAgICAgICB1aW50VmVydFtpKytdID0gX3ZlcnRpY2VzW2orK107IC8vIGNvbG9yMVxuICAgICAgICAgICAgdWludFZlcnRbaSsrXSA9IF92ZXJ0aWNlc1tqKytdOyAvLyBjb2xvcjJcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbGwgaW5kaWNlc1xuICAgICAgICBsZXQgaW5kaWNlcyA9IGZyYW1lLmluZGljZXM7XG4gICAgICAgIGlmICghaW5kaWNlcyB8fCBpbmRpY2VzLmxlbmd0aCA8IF9pbmRleE9mZnNldCkge1xuICAgICAgICAgICAgaW5kaWNlcyA9IGZyYW1lLmluZGljZXMgPSBuZXcgVWludDE2QXJyYXkoX2luZGV4T2Zmc2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX2luZGV4T2Zmc2V0OyBpKyspIHtcbiAgICAgICAgICAgIGluZGljZXNbaV0gPSBfaW5kaWNlc1tpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZyYW1lLnZlcnRpY2VzID0gdmVydGljZXM7XG4gICAgICAgIGZyYW1lLnVpbnRWZXJ0ID0gdWludFZlcnQ7XG4gICAgICAgIGZyYW1lLmluZGljZXMgPSBpbmRpY2VzO1xuICAgIH0sXG5cbiAgICBmaWxsVmVydGljZXMgKHNrZWxldG9uQ29sb3IsIGF0dGFjaG1lbnRDb2xvciwgc2xvdENvbG9yLCBjbGlwcGVyLCBzbG90KSB7XG5cbiAgICAgICAgX3RlbXBhID0gc2xvdENvbG9yLmEgKiBhdHRhY2htZW50Q29sb3IuYSAqIHNrZWxldG9uQ29sb3IuYSAqIDI1NTtcbiAgICAgICAgX3RlbXByID0gYXR0YWNobWVudENvbG9yLnIgKiBza2VsZXRvbkNvbG9yLnIgKiAyNTU7XG4gICAgICAgIF90ZW1wZyA9IGF0dGFjaG1lbnRDb2xvci5nICogc2tlbGV0b25Db2xvci5nICogMjU1O1xuICAgICAgICBfdGVtcGIgPSBhdHRhY2htZW50Q29sb3IuYiAqIHNrZWxldG9uQ29sb3IuYiAqIDI1NTtcbiAgICAgICAgXG4gICAgICAgIF9maW5hbENvbG9yLnIgPSBfdGVtcHIgKiBzbG90Q29sb3IucjtcbiAgICAgICAgX2ZpbmFsQ29sb3IuZyA9IF90ZW1wZyAqIHNsb3RDb2xvci5nO1xuICAgICAgICBfZmluYWxDb2xvci5iID0gX3RlbXBiICogc2xvdENvbG9yLmI7XG4gICAgICAgIF9maW5hbENvbG9yLmEgPSBfdGVtcGE7XG5cbiAgICAgICAgaWYgKHNsb3QuZGFya0NvbG9yID09IG51bGwpIHtcbiAgICAgICAgICAgIF9kYXJrQ29sb3Iuc2V0KDAuMCwgMCwgMCwgMS4wKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9kYXJrQ29sb3IuciA9IHNsb3QuZGFya0NvbG9yLnIgKiBfdGVtcHI7XG4gICAgICAgICAgICBfZGFya0NvbG9yLmcgPSBzbG90LmRhcmtDb2xvci5nICogX3RlbXBnO1xuICAgICAgICAgICAgX2RhcmtDb2xvci5iID0gc2xvdC5kYXJrQ29sb3IuYiAqIF90ZW1wYjtcbiAgICAgICAgfVxuICAgICAgICBfZGFya0NvbG9yLmEgPSAwO1xuXG4gICAgICAgIF9maW5hbENvbG9yMzIgPSAoKF9maW5hbENvbG9yLmE8PDI0KSA+Pj4gMCkgKyAoX2ZpbmFsQ29sb3IuYjw8MTYpICsgKF9maW5hbENvbG9yLmc8PDgpICsgX2ZpbmFsQ29sb3IucjtcbiAgICAgICAgX2RhcmtDb2xvcjMyID0gKChfZGFya0NvbG9yLmE8PDI0KSA+Pj4gMCkgKyAoX2RhcmtDb2xvci5iPDwxNikgKyAoX2RhcmtDb2xvci5nPDw4KSArIF9kYXJrQ29sb3IucjtcblxuICAgICAgICBpZiAoX3ByZUZpbmFsQ29sb3IgIT09IF9maW5hbENvbG9yMzIgfHwgX3ByZURhcmtDb2xvciAhPT0gX2RhcmtDb2xvcjMyKSB7XG4gICAgICAgICAgICBsZXQgY29sb3JzID0gdGhpcy5fdGVtcENvbG9ycztcbiAgICAgICAgICAgIF9wcmVGaW5hbENvbG9yID0gX2ZpbmFsQ29sb3IzMjtcbiAgICAgICAgICAgIF9wcmVEYXJrQ29sb3IgPSBfZGFya0NvbG9yMzI7XG4gICAgICAgICAgICBpZiAoX2NvbG9yT2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbG9yc1tfY29sb3JPZmZzZXQgLSAxXS52Zk9mZnNldCA9IF92Zk9mZnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbG9yc1tfY29sb3JPZmZzZXQrK10gPSB7XG4gICAgICAgICAgICAgICAgZnIgOiBfZmluYWxDb2xvci5yLFxuICAgICAgICAgICAgICAgIGZnIDogX2ZpbmFsQ29sb3IuZyxcbiAgICAgICAgICAgICAgICBmYiA6IF9maW5hbENvbG9yLmIsXG4gICAgICAgICAgICAgICAgZmEgOiBfZmluYWxDb2xvci5hLFxuICAgICAgICAgICAgICAgIGRyIDogX2RhcmtDb2xvci5yLFxuICAgICAgICAgICAgICAgIGRnIDogX2RhcmtDb2xvci5nLFxuICAgICAgICAgICAgICAgIGRiIDogX2RhcmtDb2xvci5iLFxuICAgICAgICAgICAgICAgIGRhIDogX2RhcmtDb2xvci5hLFxuICAgICAgICAgICAgICAgIHZmT2Zmc2V0IDogMFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjbGlwcGVyLmlzQ2xpcHBpbmcoKSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCB2ID0gX3ZmT2Zmc2V0LCBuID0gX3ZmT2Zmc2V0ICsgX3ZmQ291bnQ7IHYgPCBuOyB2ICs9IF9wZXJWZXJ0ZXhTaXplKSB7XG4gICAgICAgICAgICAgICAgX3ZlcnRpY2VzW3YgKyA0XSAgPSBfZmluYWxDb2xvcjMyOyAgICAgLy8gbGlnaHQgY29sb3JcbiAgICAgICAgICAgICAgICBfdmVydGljZXNbdiArIDVdICA9IF9kYXJrQ29sb3IzMjsgICAgICAvLyBkYXJrIGNvbG9yXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNsaXBwZXIuY2xpcFRyaWFuZ2xlcyhfdmVydGljZXMsIF92ZkNvdW50LCBfaW5kaWNlcywgX2luZGV4Q291bnQsIF92ZXJ0aWNlcywgX2ZpbmFsQ29sb3IsIF9kYXJrQ29sb3IsIHRydWUsIF9wZXJWZXJ0ZXhTaXplLCBfaW5kZXhPZmZzZXQsIF92Zk9mZnNldCwgX3ZmT2Zmc2V0ICsgMik7XG4gICAgICAgICAgICBsZXQgY2xpcHBlZFZlcnRpY2VzID0gY2xpcHBlci5jbGlwcGVkVmVydGljZXM7XG4gICAgICAgICAgICBsZXQgY2xpcHBlZFRyaWFuZ2xlcyA9IGNsaXBwZXIuY2xpcHBlZFRyaWFuZ2xlcztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gaW5zdXJlIGNhcGFjaXR5XG4gICAgICAgICAgICBfaW5kZXhDb3VudCA9IGNsaXBwZWRUcmlhbmdsZXMubGVuZ3RoO1xuICAgICAgICAgICAgX3ZmQ291bnQgPSBjbGlwcGVkVmVydGljZXMubGVuZ3RoIC8gX3BlckNsaXBWZXJ0ZXhTaXplICogX3BlclZlcnRleFNpemU7XG5cbiAgICAgICAgICAgIC8vIGZpbGwgaW5kaWNlc1xuICAgICAgICAgICAgZm9yIChsZXQgaWkgPSAwLCBqaiA9IF9pbmRleE9mZnNldCwgbm4gPSBjbGlwcGVkVHJpYW5nbGVzLmxlbmd0aDsgaWkgPCBubjspIHtcbiAgICAgICAgICAgICAgICBfaW5kaWNlc1tqaisrXSA9IGNsaXBwZWRUcmlhbmdsZXNbaWkrK107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZpbGwgdmVydGljZXMgY29udGFpbiB4IHkgdSB2IGxpZ2h0IGNvbG9yIGRhcmsgY29sb3JcbiAgICAgICAgICAgIGZvciAobGV0IHYgPSAwLCBuID0gY2xpcHBlZFZlcnRpY2VzLmxlbmd0aCwgb2Zmc2V0ID0gX3ZmT2Zmc2V0OyB2IDwgbjsgdiArPSAxMiwgb2Zmc2V0ICs9IF9wZXJWZXJ0ZXhTaXplKSB7XG4gICAgICAgICAgICAgICAgX3ZlcnRpY2VzW29mZnNldF0gPSBjbGlwcGVkVmVydGljZXNbdl07ICAgICAgICAgICAgICAgICAvLyB4XG4gICAgICAgICAgICAgICAgX3ZlcnRpY2VzW29mZnNldCArIDFdID0gY2xpcHBlZFZlcnRpY2VzW3YgKyAxXTsgICAgICAgICAvLyB5XG4gICAgICAgICAgICAgICAgX3ZlcnRpY2VzW29mZnNldCArIDJdID0gY2xpcHBlZFZlcnRpY2VzW3YgKyA2XTsgICAgICAgICAvLyB1XG4gICAgICAgICAgICAgICAgX3ZlcnRpY2VzW29mZnNldCArIDNdID0gY2xpcHBlZFZlcnRpY2VzW3YgKyA3XTsgICAgICAgICAvLyB2XG5cbiAgICAgICAgICAgICAgICBfdmVydGljZXNbb2Zmc2V0ICsgNF0gPSBfZmluYWxDb2xvcjMyO1xuICAgICAgICAgICAgICAgIF92ZXJ0aWNlc1tvZmZzZXQgKyA1XSA9IF9kYXJrQ29sb3IzMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdHJhdmVyc2VTa2VsZXRvbiAoc2tlbGV0b24sIGNsaXBwZXIpIHtcbiAgICAgICAgbGV0IHNlZ21lbnRzID0gdGhpcy5fdGVtcFNlZ21lbnRzO1xuICAgICAgICBsZXQgYm9uZUluZm9zID0gdGhpcy5fdGVtcEJvbmVJbmZvcztcbiAgICAgICAgbGV0IHNrZWxldG9uQ29sb3IgPSBza2VsZXRvbi5jb2xvcjtcbiAgICAgICAgbGV0IGF0dGFjaG1lbnQsIGF0dGFjaG1lbnRDb2xvciwgc2xvdENvbG9yLCB1dnMsIHRyaWFuZ2xlcztcbiAgICAgICAgbGV0IGlzUmVnaW9uLCBpc01lc2gsIGlzQ2xpcDtcbiAgICAgICAgbGV0IHRleHR1cmU7XG4gICAgICAgIGxldCBwcmVTZWdPZmZzZXQsIHByZVNlZ0luZm87XG4gICAgICAgIGxldCBibGVuZE1vZGU7XG4gICAgICAgIGxldCBzbG90O1xuXG4gICAgICAgIGxldCBib25lcyA9IHNrZWxldG9uLmJvbmVzO1xuICAgICAgICBpZiAodGhpcy5fZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gYm9uZXMubGVuZ3RoOyBpIDwgbDsgaSsrLCBfYm9uZUluZm9PZmZzZXQrKykge1xuICAgICAgICAgICAgICAgIGxldCBib25lID0gYm9uZXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGJvbmVJbmZvID0gYm9uZUluZm9zW19ib25lSW5mb09mZnNldF07XG4gICAgICAgICAgICAgICAgaWYgKCFib25lSW5mbykge1xuICAgICAgICAgICAgICAgICAgICBib25lSW5mbyA9IGJvbmVJbmZvc1tfYm9uZUluZm9PZmZzZXRdID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJvbmVJbmZvLmEgPSBib25lLmE7XG4gICAgICAgICAgICAgICAgYm9uZUluZm8uYiA9IGJvbmUuYjtcbiAgICAgICAgICAgICAgICBib25lSW5mby5jID0gYm9uZS5jO1xuICAgICAgICAgICAgICAgIGJvbmVJbmZvLmQgPSBib25lLmQ7XG4gICAgICAgICAgICAgICAgYm9uZUluZm8ud29ybGRYID0gYm9uZS53b3JsZFg7XG4gICAgICAgICAgICAgICAgYm9uZUluZm8ud29ybGRZID0gYm9uZS53b3JsZFk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBzbG90SWR4ID0gMCwgc2xvdENvdW50ID0gc2tlbGV0b24uZHJhd09yZGVyLmxlbmd0aDsgc2xvdElkeCA8IHNsb3RDb3VudDsgc2xvdElkeCsrKSB7XG4gICAgICAgICAgICBzbG90ID0gc2tlbGV0b24uZHJhd09yZGVyW3Nsb3RJZHhdO1xuICAgIFxuICAgICAgICAgICAgX3ZmQ291bnQgPSAwO1xuICAgICAgICAgICAgX2luZGV4Q291bnQgPSAwO1xuXG4gICAgICAgICAgICBhdHRhY2htZW50ID0gc2xvdC5nZXRBdHRhY2htZW50KCk7XG4gICAgICAgICAgICBpZiAoIWF0dGFjaG1lbnQpIHtcbiAgICAgICAgICAgICAgICBjbGlwcGVyLmNsaXBFbmRXaXRoU2xvdChzbG90KTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXNSZWdpb24gPSBhdHRhY2htZW50IGluc3RhbmNlb2Ygc3BpbmUuUmVnaW9uQXR0YWNobWVudDtcbiAgICAgICAgICAgIGlzTWVzaCA9IGF0dGFjaG1lbnQgaW5zdGFuY2VvZiBzcGluZS5NZXNoQXR0YWNobWVudDtcbiAgICAgICAgICAgIGlzQ2xpcCA9IGF0dGFjaG1lbnQgaW5zdGFuY2VvZiBzcGluZS5DbGlwcGluZ0F0dGFjaG1lbnQ7XG5cbiAgICAgICAgICAgIGlmIChpc0NsaXApIHtcbiAgICAgICAgICAgICAgICBjbGlwcGVyLmNsaXBTdGFydChzbG90LCBhdHRhY2htZW50KTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpc1JlZ2lvbiAmJiAhaXNNZXNoKSB7XG4gICAgICAgICAgICAgICAgY2xpcHBlci5jbGlwRW5kV2l0aFNsb3Qoc2xvdCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRleHR1cmUgPSBhdHRhY2htZW50LnJlZ2lvbi50ZXh0dXJlLl90ZXh0dXJlO1xuICAgICAgICAgICAgaWYgKCF0ZXh0dXJlKSB7XG4gICAgICAgICAgICAgICAgY2xpcHBlci5jbGlwRW5kV2l0aFNsb3Qoc2xvdCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBibGVuZE1vZGUgPSBzbG90LmRhdGEuYmxlbmRNb2RlO1xuICAgICAgICAgICAgaWYgKF9wcmVUZXhVcmwgIT09IHRleHR1cmUubmF0aXZlVXJsIHx8IF9wcmVCbGVuZE1vZGUgIT09IGJsZW5kTW9kZSkge1xuICAgICAgICAgICAgICAgIF9wcmVUZXhVcmwgPSB0ZXh0dXJlLm5hdGl2ZVVybDtcbiAgICAgICAgICAgICAgICBfcHJlQmxlbmRNb2RlID0gYmxlbmRNb2RlO1xuICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBwcmUgc2VnbWVudC5cbiAgICAgICAgICAgICAgICBwcmVTZWdPZmZzZXQgPSBfc2VnT2Zmc2V0IC0gMTtcbiAgICAgICAgICAgICAgICBpZiAocHJlU2VnT2Zmc2V0ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9zZWdJQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVTZWdJbmZvID0gc2VnbWVudHNbcHJlU2VnT2Zmc2V0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZVNlZ0luZm8uaW5kZXhDb3VudCA9IF9zZWdJQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVTZWdJbmZvLnZlcnRleENvdW50ID0gX3NlZ1ZDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZVNlZ0luZm8udmZDb3VudCA9IF9zZWdWQ291bnQgKiBfcGVyVmVydGV4U2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERpc2NhcmQgcHJlIHNlZ21lbnQuXG4gICAgICAgICAgICAgICAgICAgICAgICBfc2VnT2Zmc2V0LS07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIG5vdyBzZWdtZW50LlxuICAgICAgICAgICAgICAgIHNlZ21lbnRzW19zZWdPZmZzZXRdID0ge1xuICAgICAgICAgICAgICAgICAgICB0ZXggOiB0ZXh0dXJlLFxuICAgICAgICAgICAgICAgICAgICBibGVuZE1vZGUgOiBibGVuZE1vZGUsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4Q291bnQgOiAwLFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhDb3VudCA6IDAsXG4gICAgICAgICAgICAgICAgICAgIHZmQ291bnQgOiAwXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBfc2VnT2Zmc2V0Kys7XG4gICAgICAgICAgICAgICAgX3NlZ0lDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgX3NlZ1ZDb3VudCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc1JlZ2lvbikge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRyaWFuZ2xlcyA9IF9xdWFkVHJpYW5nbGVzO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIGluc3VyZSBjYXBhY2l0eVxuICAgICAgICAgICAgICAgIF92ZkNvdW50ID0gNCAqIF9wZXJWZXJ0ZXhTaXplO1xuICAgICAgICAgICAgICAgIF9pbmRleENvdW50ID0gNjtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBjb21wdXRlIHZlcnRleCBhbmQgZmlsbCB4IHlcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50LmNvbXB1dGVXb3JsZFZlcnRpY2VzKHNsb3QuYm9uZSwgX3ZlcnRpY2VzLCBfdmZPZmZzZXQsIF9wZXJWZXJ0ZXhTaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzTWVzaCkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRyaWFuZ2xlcyA9IGF0dGFjaG1lbnQudHJpYW5nbGVzO1xuICAgIFxuICAgICAgICAgICAgICAgIC8vIGluc3VyZSBjYXBhY2l0eVxuICAgICAgICAgICAgICAgIF92ZkNvdW50ID0gKGF0dGFjaG1lbnQud29ybGRWZXJ0aWNlc0xlbmd0aCA+PiAxKSAqIF9wZXJWZXJ0ZXhTaXplO1xuICAgICAgICAgICAgICAgIF9pbmRleENvdW50ID0gdHJpYW5nbGVzLmxlbmd0aDtcbiAgICBcbiAgICAgICAgICAgICAgICAvLyBjb21wdXRlIHZlcnRleCBhbmQgZmlsbCB4IHlcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50LmNvbXB1dGVXb3JsZFZlcnRpY2VzKHNsb3QsIDAsIGF0dGFjaG1lbnQud29ybGRWZXJ0aWNlc0xlbmd0aCwgX3ZlcnRpY2VzLCBfdmZPZmZzZXQsIF9wZXJWZXJ0ZXhTaXplKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGlmIChfdmZDb3VudCA9PSAwIHx8IF9pbmRleENvdW50ID09IDApIHtcbiAgICAgICAgICAgICAgICBjbGlwcGVyLmNsaXBFbmRXaXRoU2xvdChzbG90KTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIC8vIGZpbGwgaW5kaWNlc1xuICAgICAgICAgICAgZm9yIChsZXQgaWkgPSAwLCBqaiA9IF9pbmRleE9mZnNldCwgbm4gPSB0cmlhbmdsZXMubGVuZ3RoOyBpaSA8IG5uOykge1xuICAgICAgICAgICAgICAgIF9pbmRpY2VzW2pqKytdID0gdHJpYW5nbGVzW2lpKytdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBmaWxsIHUgdlxuICAgICAgICAgICAgdXZzID0gYXR0YWNobWVudC51dnM7XG4gICAgICAgICAgICBmb3IgKGxldCB2ID0gX3ZmT2Zmc2V0LCBuID0gX3ZmT2Zmc2V0ICsgX3ZmQ291bnQsIHUgPSAwOyB2IDwgbjsgdiArPSBfcGVyVmVydGV4U2l6ZSwgdSArPSAyKSB7XG4gICAgICAgICAgICAgICAgX3ZlcnRpY2VzW3YgKyAyXSA9IHV2c1t1XTsgICAgICAgICAgIC8vIHVcbiAgICAgICAgICAgICAgICBfdmVydGljZXNbdiArIDNdID0gdXZzW3UgKyAxXTsgICAgICAgLy8gdlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhdHRhY2htZW50Q29sb3IgPSBhdHRhY2htZW50LmNvbG9yO1xuICAgICAgICAgICAgc2xvdENvbG9yID0gc2xvdC5jb2xvcjtcblxuICAgICAgICAgICAgdGhpcy5maWxsVmVydGljZXMoc2tlbGV0b25Db2xvciwgYXR0YWNobWVudENvbG9yLCBzbG90Q29sb3IsIGNsaXBwZXIsIHNsb3QpO1xuICAgIFxuICAgICAgICAgICAgaWYgKF9pbmRleENvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGlpID0gX2luZGV4T2Zmc2V0LCBubiA9IF9pbmRleE9mZnNldCArIF9pbmRleENvdW50OyBpaSA8IG5uOyBpaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIF9pbmRpY2VzW2lpXSArPSBfc2VnVkNvdW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfaW5kZXhPZmZzZXQgKz0gX2luZGV4Q291bnQ7XG4gICAgICAgICAgICAgICAgX3ZmT2Zmc2V0ICs9IF92ZkNvdW50O1xuICAgICAgICAgICAgICAgIF92ZXJ0ZXhPZmZzZXQgPSBfdmZPZmZzZXQgLyBfcGVyVmVydGV4U2l6ZTtcbiAgICAgICAgICAgICAgICBfc2VnSUNvdW50ICs9IF9pbmRleENvdW50O1xuICAgICAgICAgICAgICAgIF9zZWdWQ291bnQgKz0gX3ZmQ291bnQgLyBfcGVyVmVydGV4U2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGNsaXBwZXIuY2xpcEVuZFdpdGhTbG90KHNsb3QpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNsaXBwZXIuY2xpcEVuZCgpO1xuICAgIH1cbn0pO1xuXG5sZXQgU2tlbGV0b25DYWNoZSA9IGNjLkNsYXNzKHtcbiAgICBjdG9yICgpIHtcbiAgICAgICAgdGhpcy5fcHJpdmF0ZU1vZGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uUG9vbCA9IHt9O1xuICAgICAgICB0aGlzLl9za2VsZXRvbkNhY2hlID0ge307XG4gICAgfSxcblxuICAgIGVuYWJsZVByaXZhdGVNb2RlICgpIHtcbiAgICAgICAgdGhpcy5fcHJpdmF0ZU1vZGUgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvblBvb2wgPSB7fTtcbiAgICAgICAgdGhpcy5fc2tlbGV0b25DYWNoZSA9IHt9O1xuICAgIH0sXG5cbiAgICByZW1vdmVTa2VsZXRvbiAodXVpZCkge1xuICAgICAgICB2YXIgc2tlbGV0b25JbmZvID0gdGhpcy5fc2tlbGV0b25DYWNoZVt1dWlkXTtcbiAgICAgICAgaWYgKCFza2VsZXRvbkluZm8pIHJldHVybjtcbiAgICAgICAgbGV0IGFuaW1hdGlvbnNDYWNoZSA9IHNrZWxldG9uSW5mby5hbmltYXRpb25zQ2FjaGU7XG4gICAgICAgIGZvciAodmFyIGFuaUtleSBpbiBhbmltYXRpb25zQ2FjaGUpIHtcbiAgICAgICAgICAgIC8vIENsZWFyIGNhY2hlIHRleHR1cmUsIGFuZCBwdXQgY2FjaGUgaW50byBwb29sLlxuICAgICAgICAgICAgLy8gTm8gbmVlZCB0byBjcmVhdGUgVHlwZWRBcnJheSBuZXh0IHRpbWUuXG4gICAgICAgICAgICBsZXQgYW5pbWF0aW9uQ2FjaGUgPSBhbmltYXRpb25zQ2FjaGVbYW5pS2V5XTtcbiAgICAgICAgICAgIGlmICghYW5pbWF0aW9uQ2FjaGUpIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uUG9vbFt1dWlkICsgXCIjXCIgKyBhbmlLZXldID0gYW5pbWF0aW9uQ2FjaGU7XG4gICAgICAgICAgICBhbmltYXRpb25DYWNoZS5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIHRoaXMuX3NrZWxldG9uQ2FjaGVbdXVpZF07XG4gICAgfSxcblxuICAgIGdldFNrZWxldG9uQ2FjaGUgKHV1aWQsIHNrZWxldG9uRGF0YSkge1xuICAgICAgICBsZXQgc2tlbGV0b25JbmZvID0gdGhpcy5fc2tlbGV0b25DYWNoZVt1dWlkXTtcbiAgICAgICAgaWYgKCFza2VsZXRvbkluZm8pIHtcbiAgICAgICAgICAgIGxldCBza2VsZXRvbiA9IG5ldyBzcGluZS5Ta2VsZXRvbihza2VsZXRvbkRhdGEpO1xuICAgICAgICAgICAgbGV0IGNsaXBwZXIgPSBuZXcgc3BpbmUuU2tlbGV0b25DbGlwcGluZygpO1xuICAgICAgICAgICAgbGV0IHN0YXRlRGF0YSA9IG5ldyBzcGluZS5BbmltYXRpb25TdGF0ZURhdGEoc2tlbGV0b24uZGF0YSk7XG4gICAgICAgICAgICBsZXQgc3RhdGUgPSBuZXcgc3BpbmUuQW5pbWF0aW9uU3RhdGUoc3RhdGVEYXRhKTtcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lciA9IG5ldyBUcmFja0VudHJ5TGlzdGVuZXJzKCk7XG4gICAgICAgICAgICBzdGF0ZS5hZGRMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgICAgICAgIHRoaXMuX3NrZWxldG9uQ2FjaGVbdXVpZF0gPSBza2VsZXRvbkluZm8gPSB7XG4gICAgICAgICAgICAgICAgc2tlbGV0b24gOiBza2VsZXRvbixcbiAgICAgICAgICAgICAgICBjbGlwcGVyIDogY2xpcHBlcixcbiAgICAgICAgICAgICAgICBzdGF0ZSA6IHN0YXRlLFxuICAgICAgICAgICAgICAgIGxpc3RlbmVyIDogbGlzdGVuZXIsXG4gICAgICAgICAgICAgICAgLy8gQ2FjaGUgYWxsIGtpbmRzIG9mIGFuaW1hdGlvbiBmcmFtZS5cbiAgICAgICAgICAgICAgICAvLyBXaGVuIHNrZWxldG9uIGlzIGRpc3Bvc2UsIGNsZWFyIGFsbCBhbmltYXRpb24gY2FjaGUuXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uc0NhY2hlIDoge30sXG4gICAgICAgICAgICAgICAgY3VyQW5pbWF0aW9uQ2FjaGU6IG51bGxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNrZWxldG9uSW5mbztcbiAgICB9LFxuXG4gICAgZ2V0QW5pbWF0aW9uQ2FjaGUgKHV1aWQsIGFuaW1hdGlvbk5hbWUpIHtcbiAgICAgICAgbGV0IHNrZWxldG9uSW5mbyA9IHRoaXMuX3NrZWxldG9uQ2FjaGVbdXVpZF07XG4gICAgICAgIGlmICghc2tlbGV0b25JbmZvKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBsZXQgYW5pbWF0aW9uc0NhY2hlID0gc2tlbGV0b25JbmZvLmFuaW1hdGlvbnNDYWNoZTtcbiAgICAgICAgcmV0dXJuIGFuaW1hdGlvbnNDYWNoZVthbmltYXRpb25OYW1lXTtcbiAgICB9LFxuXG4gICAgaW52YWxpZEFuaW1hdGlvbkNhY2hlICh1dWlkKSB7XG4gICAgICAgIGxldCBza2VsZXRvbkluZm8gPSB0aGlzLl9za2VsZXRvbkNhY2hlW3V1aWRdO1xuICAgICAgICBsZXQgc2tlbGV0b24gPSBza2VsZXRvbkluZm8gJiYgc2tlbGV0b25JbmZvLnNrZWxldG9uO1xuICAgICAgICBpZiAoIXNrZWxldG9uKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGFuaW1hdGlvbnNDYWNoZSA9IHNrZWxldG9uSW5mby5hbmltYXRpb25zQ2FjaGU7XG4gICAgICAgIGZvciAodmFyIGFuaUtleSBpbiBhbmltYXRpb25zQ2FjaGUpIHtcbiAgICAgICAgICAgIGxldCBhbmltYXRpb25DYWNoZSA9IGFuaW1hdGlvbnNDYWNoZVthbmlLZXldO1xuICAgICAgICAgICAgYW5pbWF0aW9uQ2FjaGUuaW52YWxpZEFsbEZyYW1lKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaW5pdEFuaW1hdGlvbkNhY2hlICh1dWlkLCBhbmltYXRpb25OYW1lKSB7XG4gICAgICAgIGlmICghYW5pbWF0aW9uTmFtZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGxldCBza2VsZXRvbkluZm8gPSB0aGlzLl9za2VsZXRvbkNhY2hlW3V1aWRdO1xuICAgICAgICBsZXQgc2tlbGV0b24gPSBza2VsZXRvbkluZm8gJiYgc2tlbGV0b25JbmZvLnNrZWxldG9uO1xuICAgICAgICBpZiAoIXNrZWxldG9uKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBsZXQgYW5pbWF0aW9uID0gc2tlbGV0b24uZGF0YS5maW5kQW5pbWF0aW9uKGFuaW1hdGlvbk5hbWUpO1xuICAgICAgICBpZiAoIWFuaW1hdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYW5pbWF0aW9uc0NhY2hlID0gc2tlbGV0b25JbmZvLmFuaW1hdGlvbnNDYWNoZTtcbiAgICAgICAgbGV0IGFuaW1hdGlvbkNhY2hlID0gYW5pbWF0aW9uc0NhY2hlW2FuaW1hdGlvbk5hbWVdO1xuICAgICAgICBpZiAoIWFuaW1hdGlvbkNhY2hlKSB7XG4gICAgICAgICAgICAvLyBJZiBjYWNoZSBleGlzdCBpbiBwb29sLCB0aGVuIGp1c3QgdXNlIGl0LlxuICAgICAgICAgICAgbGV0IHBvb2xLZXkgPSB1dWlkICsgXCIjXCIgKyBhbmltYXRpb25OYW1lO1xuICAgICAgICAgICAgYW5pbWF0aW9uQ2FjaGUgPSB0aGlzLl9hbmltYXRpb25Qb29sW3Bvb2xLZXldO1xuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkNhY2hlKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2FuaW1hdGlvblBvb2xbcG9vbEtleV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkNhY2hlID0gbmV3IEFuaW1hdGlvbkNhY2hlKCk7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uQ2FjaGUuX3ByaXZhdGVNb2RlID0gdGhpcy5fcHJpdmF0ZU1vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbmltYXRpb25DYWNoZS5pbml0KHNrZWxldG9uSW5mbywgYW5pbWF0aW9uTmFtZSk7XG4gICAgICAgICAgICBhbmltYXRpb25zQ2FjaGVbYW5pbWF0aW9uTmFtZV0gPSBhbmltYXRpb25DYWNoZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYW5pbWF0aW9uQ2FjaGU7XG4gICAgfSxcblxuICAgIHVwZGF0ZUFuaW1hdGlvbkNhY2hlICh1dWlkLCBhbmltYXRpb25OYW1lKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25OYW1lKSB7XG4gICAgICAgICAgICBsZXQgYW5pbWF0aW9uQ2FjaGUgPSB0aGlzLmluaXRBbmltYXRpb25DYWNoZSh1dWlkLCBhbmltYXRpb25OYW1lKTtcbiAgICAgICAgICAgIGlmICghYW5pbWF0aW9uQ2FjaGUpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgYW5pbWF0aW9uQ2FjaGUudXBkYXRlQWxsRnJhbWUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBza2VsZXRvbkluZm8gPSB0aGlzLl9za2VsZXRvbkNhY2hlW3V1aWRdO1xuICAgICAgICAgICAgbGV0IHNrZWxldG9uID0gc2tlbGV0b25JbmZvICYmIHNrZWxldG9uSW5mby5za2VsZXRvbjtcbiAgICAgICAgICAgIGlmICghc2tlbGV0b24pIHJldHVybjtcblxuICAgICAgICAgICAgbGV0IGFuaW1hdGlvbnNDYWNoZSA9IHNrZWxldG9uSW5mby5hbmltYXRpb25zQ2FjaGU7XG4gICAgICAgICAgICBmb3IgKHZhciBhbmlLZXkgaW4gYW5pbWF0aW9uc0NhY2hlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFuaW1hdGlvbkNhY2hlID0gYW5pbWF0aW9uc0NhY2hlW2FuaUtleV07XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uQ2FjaGUudXBkYXRlQWxsRnJhbWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5Ta2VsZXRvbkNhY2hlLkZyYW1lVGltZSA9IEZyYW1lVGltZTtcblNrZWxldG9uQ2FjaGUuc2hhcmVkQ2FjaGUgPSBuZXcgU2tlbGV0b25DYWNoZSgpO1xubW9kdWxlLmV4cG9ydHMgPSBTa2VsZXRvbkNhY2hlOyJdLCJzb3VyY2VSb290IjoiLyJ9