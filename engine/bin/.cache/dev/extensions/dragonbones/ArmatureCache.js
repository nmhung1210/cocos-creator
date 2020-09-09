
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/dragonbones/ArmatureCache.js';
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
var _preColor = null;

var _x, _y; //Cache all frames in an animation


var AnimationCache = cc.Class({
  ctor: function ctor() {
    this._privateMode = false;
    this._inited = false;
    this._invalid = true;
    this._enableCacheAttachedInfo = false;
    this.frames = [];
    this.totalTime = 0;
    this.isCompleted = false;
    this._frameIdx = -1;
    this._armatureInfo = null;
    this._animationName = null;
    this._tempSegments = null;
    this._tempColors = null;
    this._tempBoneInfos = null;
  },
  init: function init(armatureInfo, animationName) {
    this._inited = true;
    this._armatureInfo = armatureInfo;
    this._animationName = animationName;
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
  begin: function begin() {
    if (!this._invalid) return;
    var armatureInfo = this._armatureInfo;
    var curAnimationCache = armatureInfo.curAnimationCache;

    if (curAnimationCache && curAnimationCache != this) {
      if (this._privateMode) {
        curAnimationCache.invalidAllFrame();
      } else {
        curAnimationCache.updateToFrame();
      }
    }

    var armature = armatureInfo.armature;
    var animation = armature.animation;
    animation.play(this._animationName, 1);
    armatureInfo.curAnimationCache = this;
    this._invalid = false;
    this._frameIdx = -1;
    this.totalTime = 0;
    this.isCompleted = false;
  },
  end: function end() {
    if (!this._needToUpdate()) {
      this._armatureInfo.curAnimationCache = null;
      this.frames.length = this._frameIdx + 1;
      this.isCompleted = true;
    }
  },
  _needToUpdate: function _needToUpdate(toFrameIdx) {
    var armatureInfo = this._armatureInfo;
    var armature = armatureInfo.armature;
    var animation = armature.animation;
    return !animation.isCompleted && this.totalTime < MaxCacheTime && (toFrameIdx == undefined || this._frameIdx < toFrameIdx);
  },
  updateToFrame: function updateToFrame(toFrameIdx) {
    if (!this._inited) return;
    this.begin();
    if (!this._needToUpdate(toFrameIdx)) return;
    var armatureInfo = this._armatureInfo;
    var armature = armatureInfo.armature;

    do {
      // Solid update frame rate 1/60.
      armature.advanceTime(FrameTime);
      this._frameIdx++;

      this._updateFrame(armature, this._frameIdx);

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
  _updateFrame: function _updateFrame(armature, index) {
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
    _preColor = null;
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

    this._traverseArmature(armature, 1.0); // At last must handle pre color and segment.
    // Because vertex count will right at the end.
    // Handle pre color.


    if (_colorOffset > 0) {
      colors[_colorOffset - 1].vfOffset = _vfOffset;
    }

    colors.length = _colorOffset;
    boneInfos.length = _boneInfoOffset; // Handle pre segment

    var preSegOffset = _segOffset - 1;

    if (preSegOffset >= 0) {
      if (_segICount > 0) {
        var preSegInfo = segments[preSegOffset];
        preSegInfo.indexCount = _segICount;
        preSegInfo.vfCount = _segVCount * 5;
        preSegInfo.vertexCount = _segVCount;
        segments.length = _segOffset;
      } else {
        segments.length = _segOffset - 1;
      }
    } // Discard all segments.


    if (segments.length === 0) return; // Fill vertices

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

      uintVert[i++] = _vertices[j++]; // color
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
  _traverseArmature: function _traverseArmature(armature, parentOpacity) {
    var colors = this._tempColors;
    var segments = this._tempSegments;
    var boneInfos = this._tempBoneInfos;
    var gVertices = _vertices;
    var gIndices = _indices;
    var slotVertices, slotIndices;
    var slots = armature._slots,
        slot,
        slotMatrix,
        slotMatrixm,
        slotColor,
        colorVal;
    var texture;
    var preSegOffset, preSegInfo;
    var bones = armature._bones;

    if (this._enableCacheAttachedInfo) {
      for (var i = 0, l = bones.length; i < l; i++, _boneInfoOffset++) {
        var bone = bones[i];
        var boneInfo = boneInfos[_boneInfoOffset];

        if (!boneInfo) {
          boneInfo = boneInfos[_boneInfoOffset] = {
            globalTransformMatrix: new dragonBones.Matrix()
          };
        }

        var boneMat = bone.globalTransformMatrix;
        var cacheBoneMat = boneInfo.globalTransformMatrix;
        cacheBoneMat.copyFrom(boneMat);
      }
    }

    for (var _i2 = 0, _l = slots.length; _i2 < _l; _i2++) {
      slot = slots[_i2];
      if (!slot._visible || !slot._displayData) continue;
      slot.updateWorldMatrix();
      slotColor = slot._color;

      if (slot.childArmature) {
        this._traverseArmature(slot.childArmature, parentOpacity * slotColor.a / 255);

        continue;
      }

      texture = slot.getTexture();
      if (!texture) continue;

      if (_preTexUrl !== texture.nativeUrl || _preBlendMode !== slot._blendMode) {
        _preTexUrl = texture.nativeUrl;
        _preBlendMode = slot._blendMode; // Handle pre segment.

        preSegOffset = _segOffset - 1;

        if (preSegOffset >= 0) {
          if (_segICount > 0) {
            preSegInfo = segments[preSegOffset];
            preSegInfo.indexCount = _segICount;
            preSegInfo.vertexCount = _segVCount;
            preSegInfo.vfCount = _segVCount * 5;
          } else {
            // Discard pre segment.
            _segOffset--;
          }
        } // Handle now segment.


        segments[_segOffset] = {
          tex: texture,
          blendMode: slot._blendMode,
          indexCount: 0,
          vertexCount: 0,
          vfCount: 0
        };
        _segOffset++;
        _segICount = 0;
        _segVCount = 0;
      }

      colorVal = (slotColor.a * parentOpacity << 24 >>> 0) + (slotColor.b << 16) + (slotColor.g << 8) + slotColor.r;

      if (_preColor !== colorVal) {
        _preColor = colorVal;

        if (_colorOffset > 0) {
          colors[_colorOffset - 1].vfOffset = _vfOffset;
        }

        colors[_colorOffset++] = {
          r: slotColor.r,
          g: slotColor.g,
          b: slotColor.b,
          a: slotColor.a * parentOpacity,
          vfOffset: 0
        };
      }

      slotVertices = slot._localVertices;
      slotIndices = slot._indices;
      slotMatrix = slot._worldMatrix;
      slotMatrixm = slotMatrix.m;

      for (var j = 0, vl = slotVertices.length; j < vl;) {
        _x = slotVertices[j++];
        _y = slotVertices[j++];
        gVertices[_vfOffset++] = _x * slotMatrixm[0] + _y * slotMatrixm[4] + slotMatrixm[12];
        gVertices[_vfOffset++] = _x * slotMatrixm[1] + _y * slotMatrixm[5] + slotMatrixm[13];
        gVertices[_vfOffset++] = slotVertices[j++];
        gVertices[_vfOffset++] = slotVertices[j++];
        gVertices[_vfOffset++] = colorVal;
      } // This place must use segment vertex count to calculate vertex offset.
      // Assembler will calculate vertex offset again for different segment.


      for (var ii = 0, il = slotIndices.length; ii < il; ii++) {
        gIndices[_indexOffset++] = _segVCount + slotIndices[ii];
      }

      _vertexOffset = _vfOffset / 5;
      _segICount += slotIndices.length;
      _segVCount += slotVertices.length / 4;
    }
  }
});
var ArmatureCache = cc.Class({
  ctor: function ctor() {
    this._privateMode = false;
    this._animationPool = {};
    this._armatureCache = {};
  },
  enablePrivateMode: function enablePrivateMode() {
    this._privateMode = true;
  },
  // If cache is private, cache will be destroy when dragonbones node destroy.
  dispose: function dispose() {
    for (var key in this._armatureCache) {
      var armatureInfo = this._armatureCache[key];

      if (armatureInfo) {
        var armature = armatureInfo.armature;
        armature && armature.dispose();
      }
    }

    this._armatureCache = null;
    this._animationPool = null;
  },
  _removeArmature: function _removeArmature(armatureKey) {
    var armatureInfo = this._armatureCache[armatureKey];
    var animationsCache = armatureInfo.animationsCache;

    for (var aniKey in animationsCache) {
      // Clear cache texture, and put cache into pool.
      // No need to create TypedArray next time.
      var animationCache = animationsCache[aniKey];
      if (!animationCache) continue;
      this._animationPool[armatureKey + "#" + aniKey] = animationCache;
      animationCache.clear();
    }

    var armature = armatureInfo.armature;
    armature && armature.dispose();
    delete this._armatureCache[armatureKey];
  },
  // When db assets be destroy, remove armature from db cache.
  resetArmature: function resetArmature(uuid) {
    for (var armatureKey in this._armatureCache) {
      if (armatureKey.indexOf(uuid) == -1) continue;

      this._removeArmature(armatureKey);
    }
  },
  getArmatureCache: function getArmatureCache(armatureName, armatureKey, atlasUUID) {
    var armatureInfo = this._armatureCache[armatureKey];
    var armature;

    if (!armatureInfo) {
      var factory = dragonBones.CCFactory.getInstance();
      var proxy = factory.buildArmatureDisplay(armatureName, armatureKey, "", atlasUUID);
      if (!proxy || !proxy._armature) return;
      armature = proxy._armature; // If armature has child armature, can not be cache, because it's
      // animation data can not be precompute.

      if (!ArmatureCache.canCache(armature)) {
        armature.dispose();
        return;
      }

      this._armatureCache[armatureKey] = {
        armature: armature,
        // Cache all kinds of animation frame.
        // When armature is dispose, clear all animation cache.
        animationsCache: {},
        curAnimationCache: null
      };
    } else {
      armature = armatureInfo.armature;
    }

    return armature;
  },
  getAnimationCache: function getAnimationCache(armatureKey, animationName) {
    var armatureInfo = this._armatureCache[armatureKey];
    if (!armatureInfo) return null;
    var animationsCache = armatureInfo.animationsCache;
    return animationsCache[animationName];
  },
  initAnimationCache: function initAnimationCache(armatureKey, animationName) {
    if (!animationName) return null;
    var armatureInfo = this._armatureCache[armatureKey];
    var armature = armatureInfo && armatureInfo.armature;
    if (!armature) return null;
    var animation = armature.animation;
    var hasAni = animation.hasAnimation(animationName);
    if (!hasAni) return null;
    var animationsCache = armatureInfo.animationsCache;
    var animationCache = animationsCache[animationName];

    if (!animationCache) {
      // If cache exist in pool, then just use it.
      var poolKey = armatureKey + "#" + animationName;
      animationCache = this._animationPool[poolKey];

      if (animationCache) {
        delete this._animationPool[poolKey];
      } else {
        animationCache = new AnimationCache();
        animationCache._privateMode = this._privateMode;
      }

      animationCache.init(armatureInfo, animationName);
      animationsCache[animationName] = animationCache;
    }

    return animationCache;
  },
  invalidAnimationCache: function invalidAnimationCache(armatureKey) {
    var armatureInfo = this._armatureCache[armatureKey];
    var armature = armatureInfo && armatureInfo.armature;
    if (!armature) return null;
    var animationsCache = armatureInfo.animationsCache;

    for (var aniKey in animationsCache) {
      var animationCache = animationsCache[aniKey];
      animationCache.invalidAllFrame();
    }
  },
  updateAnimationCache: function updateAnimationCache(armatureKey, animationName) {
    if (animationName) {
      var animationCache = this.initAnimationCache(armatureKey, animationName);
      if (!animationCache) return;
      animationCache.updateAllFrame();
    } else {
      var armatureInfo = this._armatureCache[armatureKey];
      var armature = armatureInfo && armatureInfo.armature;
      if (!armature) return null;
      var animationsCache = armatureInfo.animationsCache;

      for (var aniKey in animationsCache) {
        var _animationCache = animationsCache[aniKey];

        _animationCache.updateAllFrame();
      }
    }
  }
});
ArmatureCache.FrameTime = FrameTime;
ArmatureCache.sharedCache = new ArmatureCache();
ArmatureCache.canCache = function (armature) {
  var slots = armature._slots;

  for (var i = 0, l = slots.length; i < l; i++) {
    var slot = slots[i];

    if (slot.childArmature) {
      return false;
    }
  }

  return true;
}, module.exports = ArmatureCache;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvZXh0ZW5zaW9ucy9kcmFnb25ib25lcy9Bcm1hdHVyZUNhY2hlLmpzIl0sIm5hbWVzIjpbIk1heENhY2hlVGltZSIsIkZyYW1lVGltZSIsIl92ZXJ0aWNlcyIsIl9pbmRpY2VzIiwiX2JvbmVJbmZvT2Zmc2V0IiwiX3ZlcnRleE9mZnNldCIsIl9pbmRleE9mZnNldCIsIl92Zk9mZnNldCIsIl9wcmVUZXhVcmwiLCJfcHJlQmxlbmRNb2RlIiwiX3NlZ1ZDb3VudCIsIl9zZWdJQ291bnQiLCJfc2VnT2Zmc2V0IiwiX2NvbG9yT2Zmc2V0IiwiX3ByZUNvbG9yIiwiX3giLCJfeSIsIkFuaW1hdGlvbkNhY2hlIiwiY2MiLCJDbGFzcyIsImN0b3IiLCJfcHJpdmF0ZU1vZGUiLCJfaW5pdGVkIiwiX2ludmFsaWQiLCJfZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8iLCJmcmFtZXMiLCJ0b3RhbFRpbWUiLCJpc0NvbXBsZXRlZCIsIl9mcmFtZUlkeCIsIl9hcm1hdHVyZUluZm8iLCJfYW5pbWF0aW9uTmFtZSIsIl90ZW1wU2VnbWVudHMiLCJfdGVtcENvbG9ycyIsIl90ZW1wQm9uZUluZm9zIiwiaW5pdCIsImFybWF0dXJlSW5mbyIsImFuaW1hdGlvbk5hbWUiLCJjbGVhciIsImkiLCJuIiwibGVuZ3RoIiwiZnJhbWUiLCJzZWdtZW50cyIsImludmFsaWRBbGxGcmFtZSIsImJlZ2luIiwiY3VyQW5pbWF0aW9uQ2FjaGUiLCJ1cGRhdGVUb0ZyYW1lIiwiYXJtYXR1cmUiLCJhbmltYXRpb24iLCJwbGF5IiwiZW5kIiwiX25lZWRUb1VwZGF0ZSIsInRvRnJhbWVJZHgiLCJ1bmRlZmluZWQiLCJhZHZhbmNlVGltZSIsIl91cGRhdGVGcmFtZSIsImlzSW5pdGVkIiwiaXNJbnZhbGlkIiwidXBkYXRlQWxsRnJhbWUiLCJlbmFibGVDYWNoZUF0dGFjaGVkSW5mbyIsImluZGV4IiwiY29sb3JzIiwiYm9uZUluZm9zIiwidmVydGljZXMiLCJ1aW50VmVydCIsImluZGljZXMiLCJfdHJhdmVyc2VBcm1hdHVyZSIsInZmT2Zmc2V0IiwicHJlU2VnT2Zmc2V0IiwicHJlU2VnSW5mbyIsImluZGV4Q291bnQiLCJ2ZkNvdW50IiwidmVydGV4Q291bnQiLCJGbG9hdDMyQXJyYXkiLCJVaW50MzJBcnJheSIsImJ1ZmZlciIsImoiLCJVaW50MTZBcnJheSIsInBhcmVudE9wYWNpdHkiLCJnVmVydGljZXMiLCJnSW5kaWNlcyIsInNsb3RWZXJ0aWNlcyIsInNsb3RJbmRpY2VzIiwic2xvdHMiLCJfc2xvdHMiLCJzbG90Iiwic2xvdE1hdHJpeCIsInNsb3RNYXRyaXhtIiwic2xvdENvbG9yIiwiY29sb3JWYWwiLCJ0ZXh0dXJlIiwiYm9uZXMiLCJfYm9uZXMiLCJsIiwiYm9uZSIsImJvbmVJbmZvIiwiZ2xvYmFsVHJhbnNmb3JtTWF0cml4IiwiZHJhZ29uQm9uZXMiLCJNYXRyaXgiLCJib25lTWF0IiwiY2FjaGVCb25lTWF0IiwiY29weUZyb20iLCJfdmlzaWJsZSIsIl9kaXNwbGF5RGF0YSIsInVwZGF0ZVdvcmxkTWF0cml4IiwiX2NvbG9yIiwiY2hpbGRBcm1hdHVyZSIsImEiLCJnZXRUZXh0dXJlIiwibmF0aXZlVXJsIiwiX2JsZW5kTW9kZSIsInRleCIsImJsZW5kTW9kZSIsImIiLCJnIiwiciIsIl9sb2NhbFZlcnRpY2VzIiwiX3dvcmxkTWF0cml4IiwibSIsInZsIiwiaWkiLCJpbCIsIkFybWF0dXJlQ2FjaGUiLCJfYW5pbWF0aW9uUG9vbCIsIl9hcm1hdHVyZUNhY2hlIiwiZW5hYmxlUHJpdmF0ZU1vZGUiLCJkaXNwb3NlIiwia2V5IiwiX3JlbW92ZUFybWF0dXJlIiwiYXJtYXR1cmVLZXkiLCJhbmltYXRpb25zQ2FjaGUiLCJhbmlLZXkiLCJhbmltYXRpb25DYWNoZSIsInJlc2V0QXJtYXR1cmUiLCJ1dWlkIiwiaW5kZXhPZiIsImdldEFybWF0dXJlQ2FjaGUiLCJhcm1hdHVyZU5hbWUiLCJhdGxhc1VVSUQiLCJmYWN0b3J5IiwiQ0NGYWN0b3J5IiwiZ2V0SW5zdGFuY2UiLCJwcm94eSIsImJ1aWxkQXJtYXR1cmVEaXNwbGF5IiwiX2FybWF0dXJlIiwiY2FuQ2FjaGUiLCJnZXRBbmltYXRpb25DYWNoZSIsImluaXRBbmltYXRpb25DYWNoZSIsImhhc0FuaSIsImhhc0FuaW1hdGlvbiIsInBvb2xLZXkiLCJpbnZhbGlkQW5pbWF0aW9uQ2FjaGUiLCJ1cGRhdGVBbmltYXRpb25DYWNoZSIsInNoYXJlZENhY2hlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsSUFBTUEsWUFBWSxHQUFHLEVBQXJCO0FBQ0EsSUFBTUMsU0FBUyxHQUFHLElBQUksRUFBdEI7QUFFQSxJQUFJQyxTQUFTLEdBQUcsRUFBaEI7QUFDQSxJQUFJQyxRQUFRLEdBQUcsRUFBZjtBQUNBLElBQUlDLGVBQWUsR0FBRyxDQUF0QjtBQUNBLElBQUlDLGFBQWEsR0FBRyxDQUFwQjtBQUNBLElBQUlDLFlBQVksR0FBRyxDQUFuQjtBQUNBLElBQUlDLFNBQVMsR0FBRyxDQUFoQjtBQUNBLElBQUlDLFVBQVUsR0FBRyxJQUFqQjtBQUNBLElBQUlDLGFBQWEsR0FBRyxJQUFwQjtBQUNBLElBQUlDLFVBQVUsR0FBRyxDQUFqQjtBQUNBLElBQUlDLFVBQVUsR0FBRyxDQUFqQjtBQUNBLElBQUlDLFVBQVUsR0FBRyxDQUFqQjtBQUNBLElBQUlDLFlBQVksR0FBRyxDQUFuQjtBQUNBLElBQUlDLFNBQVMsR0FBRyxJQUFoQjs7QUFDQSxJQUFJQyxFQUFKLEVBQVFDLEVBQVIsRUFFQTs7O0FBQ0EsSUFBSUMsY0FBYyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUMxQkMsRUFBQUEsSUFEMEIsa0JBQ2xCO0FBQ0osU0FBS0MsWUFBTCxHQUFvQixLQUFwQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFNBQUtDLHdCQUFMLEdBQWdDLEtBQWhDO0FBQ0EsU0FB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RUFBd0I7QUFDcEIsYUFBTyxLQUFQO0FBQ0g7QUFDSjs7QUFDRCxTQUFPLElBQVA7QUFDSCxDQVRELEVBV0FnRCxNQUFNLENBQUNDLE9BQVAsR0FBaUJqQyxhQVhqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuY29uc3QgTWF4Q2FjaGVUaW1lID0gMzA7XG5jb25zdCBGcmFtZVRpbWUgPSAxIC8gNjA7IFxuXG5sZXQgX3ZlcnRpY2VzID0gW107XG5sZXQgX2luZGljZXMgPSBbXTtcbmxldCBfYm9uZUluZm9PZmZzZXQgPSAwO1xubGV0IF92ZXJ0ZXhPZmZzZXQgPSAwO1xubGV0IF9pbmRleE9mZnNldCA9IDA7XG5sZXQgX3ZmT2Zmc2V0ID0gMDtcbmxldCBfcHJlVGV4VXJsID0gbnVsbDtcbmxldCBfcHJlQmxlbmRNb2RlID0gbnVsbDtcbmxldCBfc2VnVkNvdW50ID0gMDtcbmxldCBfc2VnSUNvdW50ID0gMDtcbmxldCBfc2VnT2Zmc2V0ID0gMDtcbmxldCBfY29sb3JPZmZzZXQgPSAwO1xubGV0IF9wcmVDb2xvciA9IG51bGw7XG5sZXQgX3gsIF95O1xuXG4vL0NhY2hlIGFsbCBmcmFtZXMgaW4gYW4gYW5pbWF0aW9uXG5sZXQgQW5pbWF0aW9uQ2FjaGUgPSBjYy5DbGFzcyh7XG4gICAgY3RvciAoKSB7XG4gICAgICAgIHRoaXMuX3ByaXZhdGVNb2RlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbnZhbGlkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mcmFtZXMgPSBbXTtcbiAgICAgICAgdGhpcy50b3RhbFRpbWUgPSAwO1xuICAgICAgICB0aGlzLmlzQ29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2ZyYW1lSWR4ID0gLTE7XG5cbiAgICAgICAgdGhpcy5fYXJtYXR1cmVJbmZvID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uTmFtZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3RlbXBTZWdtZW50cyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3RlbXBDb2xvcnMgPSBudWxsO1xuICAgICAgICB0aGlzLl90ZW1wQm9uZUluZm9zID0gbnVsbDtcbiAgICB9LFxuXG4gICAgaW5pdCAoYXJtYXR1cmVJbmZvLCBhbmltYXRpb25OYW1lKSB7XG4gICAgICAgIHRoaXMuX2luaXRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2FybWF0dXJlSW5mbyA9IGFybWF0dXJlSW5mbztcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uTmFtZSA9IGFuaW1hdGlvbk5hbWU7XG4gICAgfSxcblxuICAgIC8vIENsZWFyIHRleHR1cmUgcXVvdGUuXG4gICAgY2xlYXIgKCkge1xuICAgICAgICB0aGlzLl9pbml0ZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0aGlzLmZyYW1lcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBmcmFtZSA9IHRoaXMuZnJhbWVzW2ldO1xuICAgICAgICAgICAgZnJhbWUuc2VnbWVudHMubGVuZ3RoID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmludmFsaWRBbGxGcmFtZSgpO1xuICAgIH0sXG5cbiAgICBiZWdpbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5faW52YWxpZCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBhcm1hdHVyZUluZm8gPSB0aGlzLl9hcm1hdHVyZUluZm87XG4gICAgICAgIGxldCBjdXJBbmltYXRpb25DYWNoZSA9IGFybWF0dXJlSW5mby5jdXJBbmltYXRpb25DYWNoZTtcbiAgICAgICAgaWYgKGN1ckFuaW1hdGlvbkNhY2hlICYmIGN1ckFuaW1hdGlvbkNhY2hlICE9IHRoaXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wcml2YXRlTW9kZSkge1xuICAgICAgICAgICAgICAgIGN1ckFuaW1hdGlvbkNhY2hlLmludmFsaWRBbGxGcmFtZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJBbmltYXRpb25DYWNoZS51cGRhdGVUb0ZyYW1lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGFybWF0dXJlID0gYXJtYXR1cmVJbmZvLmFybWF0dXJlO1xuICAgICAgICBsZXQgYW5pbWF0aW9uID0gYXJtYXR1cmUuYW5pbWF0aW9uO1xuICAgICAgICBhbmltYXRpb24ucGxheSh0aGlzLl9hbmltYXRpb25OYW1lLCAxKTtcblxuICAgICAgICBhcm1hdHVyZUluZm8uY3VyQW5pbWF0aW9uQ2FjaGUgPSB0aGlzO1xuICAgICAgICB0aGlzLl9pbnZhbGlkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2ZyYW1lSWR4ID0gLTE7XG4gICAgICAgIHRoaXMudG90YWxUaW1lID0gMDtcbiAgICAgICAgdGhpcy5pc0NvbXBsZXRlZCA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBlbmQgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX25lZWRUb1VwZGF0ZSgpKSB7XG4gICAgICAgICAgICB0aGlzLl9hcm1hdHVyZUluZm8uY3VyQW5pbWF0aW9uQ2FjaGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5mcmFtZXMubGVuZ3RoID0gdGhpcy5fZnJhbWVJZHggKyAxO1xuICAgICAgICAgICAgdGhpcy5pc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX25lZWRUb1VwZGF0ZSAodG9GcmFtZUlkeCkge1xuICAgICAgICBsZXQgYXJtYXR1cmVJbmZvID0gdGhpcy5fYXJtYXR1cmVJbmZvO1xuICAgICAgICBsZXQgYXJtYXR1cmUgPSBhcm1hdHVyZUluZm8uYXJtYXR1cmU7XG4gICAgICAgIGxldCBhbmltYXRpb24gPSBhcm1hdHVyZS5hbmltYXRpb247XG4gICAgICAgIHJldHVybiAhYW5pbWF0aW9uLmlzQ29tcGxldGVkICYmIFxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxUaW1lIDwgTWF4Q2FjaGVUaW1lICYmIFxuICAgICAgICAgICAgICAgICh0b0ZyYW1lSWR4ID09IHVuZGVmaW5lZCB8fCB0aGlzLl9mcmFtZUlkeCA8IHRvRnJhbWVJZHgpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVUb0ZyYW1lICh0b0ZyYW1lSWR4KSB7XG4gICAgICAgIGlmICghdGhpcy5faW5pdGVkKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5iZWdpbigpO1xuXG4gICAgICAgIGlmICghdGhpcy5fbmVlZFRvVXBkYXRlKHRvRnJhbWVJZHgpKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGFybWF0dXJlSW5mbyA9IHRoaXMuX2FybWF0dXJlSW5mbztcbiAgICAgICAgbGV0IGFybWF0dXJlID0gYXJtYXR1cmVJbmZvLmFybWF0dXJlO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIC8vIFNvbGlkIHVwZGF0ZSBmcmFtZSByYXRlIDEvNjAuXG4gICAgICAgICAgICBhcm1hdHVyZS5hZHZhbmNlVGltZShGcmFtZVRpbWUpO1xuICAgICAgICAgICAgdGhpcy5fZnJhbWVJZHgrKztcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUZyYW1lKGFybWF0dXJlLCB0aGlzLl9mcmFtZUlkeCk7XG4gICAgICAgICAgICB0aGlzLnRvdGFsVGltZSArPSBGcmFtZVRpbWU7XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuX25lZWRUb1VwZGF0ZSh0b0ZyYW1lSWR4KSk7XG4gICAgICAgXG4gICAgICAgIHRoaXMuZW5kKCk7XG4gICAgfSxcblxuICAgIGlzSW5pdGVkICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRlZDtcbiAgICB9LFxuXG4gICAgaXNJbnZhbGlkICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludmFsaWQ7XG4gICAgfSxcblxuICAgIGludmFsaWRBbGxGcmFtZSAoKSB7XG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW52YWxpZCA9IHRydWU7XG4gICAgfSxcblxuICAgIHVwZGF0ZUFsbEZyYW1lICgpIHtcbiAgICAgICAgdGhpcy5pbnZhbGlkQWxsRnJhbWUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVUb0ZyYW1lKCk7XG4gICAgfSxcblxuICAgIGVuYWJsZUNhY2hlQXR0YWNoZWRJbmZvICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9lbmFibGVDYWNoZUF0dGFjaGVkSW5mbykge1xuICAgICAgICAgICAgdGhpcy5fZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pbnZhbGlkQWxsRnJhbWUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdXBkYXRlRnJhbWUgKGFybWF0dXJlLCBpbmRleCkge1xuICAgICAgICBfdmZPZmZzZXQgPSAwO1xuICAgICAgICBfYm9uZUluZm9PZmZzZXQgPSAwO1xuICAgICAgICBfaW5kZXhPZmZzZXQgPSAwO1xuICAgICAgICBfdmVydGV4T2Zmc2V0ID0gMDtcbiAgICAgICAgX3ByZVRleFVybCA9IG51bGw7XG4gICAgICAgIF9wcmVCbGVuZE1vZGUgPSBudWxsO1xuICAgICAgICBfc2VnVkNvdW50ID0gMDtcbiAgICAgICAgX3NlZ0lDb3VudCA9IDA7XG4gICAgICAgIF9zZWdPZmZzZXQgPSAwO1xuICAgICAgICBfY29sb3JPZmZzZXQgPSAwO1xuICAgICAgICBfcHJlQ29sb3IgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZnJhbWVzW2luZGV4XSA9IHRoaXMuZnJhbWVzW2luZGV4XSB8fCB7XG4gICAgICAgICAgICBzZWdtZW50cyA6IFtdLFxuICAgICAgICAgICAgY29sb3JzIDogW10sXG4gICAgICAgICAgICBib25lSW5mb3MgOiBbXSxcbiAgICAgICAgICAgIHZlcnRpY2VzIDogbnVsbCxcbiAgICAgICAgICAgIHVpbnRWZXJ0IDogbnVsbCxcbiAgICAgICAgICAgIGluZGljZXMgOiBudWxsLFxuICAgICAgICB9O1xuICAgICAgICBsZXQgZnJhbWUgPSB0aGlzLmZyYW1lc1tpbmRleF07XG5cbiAgICAgICAgbGV0IHNlZ21lbnRzID0gdGhpcy5fdGVtcFNlZ21lbnRzID0gZnJhbWUuc2VnbWVudHM7XG4gICAgICAgIGxldCBjb2xvcnMgPSB0aGlzLl90ZW1wQ29sb3JzID0gZnJhbWUuY29sb3JzO1xuICAgICAgICBsZXQgYm9uZUluZm9zID0gdGhpcy5fdGVtcEJvbmVJbmZvcyA9IGZyYW1lLmJvbmVJbmZvcztcbiAgICAgICAgdGhpcy5fdHJhdmVyc2VBcm1hdHVyZShhcm1hdHVyZSwgMS4wKTtcbiAgICAgICAgLy8gQXQgbGFzdCBtdXN0IGhhbmRsZSBwcmUgY29sb3IgYW5kIHNlZ21lbnQuXG4gICAgICAgIC8vIEJlY2F1c2UgdmVydGV4IGNvdW50IHdpbGwgcmlnaHQgYXQgdGhlIGVuZC5cbiAgICAgICAgLy8gSGFuZGxlIHByZSBjb2xvci5cbiAgICAgICAgaWYgKF9jb2xvck9mZnNldCA+IDApIHtcbiAgICAgICAgICAgIGNvbG9yc1tfY29sb3JPZmZzZXQgLSAxXS52Zk9mZnNldCA9IF92Zk9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICBjb2xvcnMubGVuZ3RoID0gX2NvbG9yT2Zmc2V0O1xuICAgICAgICBib25lSW5mb3MubGVuZ3RoID0gX2JvbmVJbmZvT2Zmc2V0O1xuICAgICAgICBcbiAgICAgICAgLy8gSGFuZGxlIHByZSBzZWdtZW50XG4gICAgICAgIGxldCBwcmVTZWdPZmZzZXQgPSBfc2VnT2Zmc2V0IC0gMTtcbiAgICAgICAgaWYgKHByZVNlZ09mZnNldCA+PSAwKSB7XG4gICAgICAgICAgICBpZiAoX3NlZ0lDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJlU2VnSW5mbyA9IHNlZ21lbnRzW3ByZVNlZ09mZnNldF07XG4gICAgICAgICAgICAgICAgcHJlU2VnSW5mby5pbmRleENvdW50ID0gX3NlZ0lDb3VudDtcbiAgICAgICAgICAgICAgICBwcmVTZWdJbmZvLnZmQ291bnQgPSBfc2VnVkNvdW50ICogNTtcbiAgICAgICAgICAgICAgICBwcmVTZWdJbmZvLnZlcnRleENvdW50ID0gX3NlZ1ZDb3VudDtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5sZW5ndGggPSBfc2VnT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5sZW5ndGggPSBfc2VnT2Zmc2V0IC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERpc2NhcmQgYWxsIHNlZ21lbnRzLlxuICAgICAgICBpZiAoc2VnbWVudHMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgLy8gRmlsbCB2ZXJ0aWNlc1xuICAgICAgICBsZXQgdmVydGljZXMgPSBmcmFtZS52ZXJ0aWNlcztcbiAgICAgICAgbGV0IHVpbnRWZXJ0ID0gZnJhbWUudWludFZlcnQ7XG4gICAgICAgIGlmICghdmVydGljZXMgfHwgdmVydGljZXMubGVuZ3RoIDwgX3ZmT2Zmc2V0KSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcyA9IGZyYW1lLnZlcnRpY2VzID0gbmV3IEZsb2F0MzJBcnJheShfdmZPZmZzZXQpO1xuICAgICAgICAgICAgdWludFZlcnQgPSBmcmFtZS51aW50VmVydCA9IG5ldyBVaW50MzJBcnJheSh2ZXJ0aWNlcy5idWZmZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGogPSAwOyBpIDwgX3ZmT2Zmc2V0Oykge1xuICAgICAgICAgICAgdmVydGljZXNbaSsrXSA9IF92ZXJ0aWNlc1tqKytdOyAvLyB4XG4gICAgICAgICAgICB2ZXJ0aWNlc1tpKytdID0gX3ZlcnRpY2VzW2orK107IC8vIHlcbiAgICAgICAgICAgIHZlcnRpY2VzW2krK10gPSBfdmVydGljZXNbaisrXTsgLy8gdVxuICAgICAgICAgICAgdmVydGljZXNbaSsrXSA9IF92ZXJ0aWNlc1tqKytdOyAvLyB2XG4gICAgICAgICAgICB1aW50VmVydFtpKytdID0gX3ZlcnRpY2VzW2orK107IC8vIGNvbG9yXG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaWxsIGluZGljZXNcbiAgICAgICAgbGV0IGluZGljZXMgPSBmcmFtZS5pbmRpY2VzO1xuICAgICAgICBpZiAoIWluZGljZXMgfHwgaW5kaWNlcy5sZW5ndGggPCBfaW5kZXhPZmZzZXQpIHtcbiAgICAgICAgICAgIGluZGljZXMgPSBmcmFtZS5pbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KF9pbmRleE9mZnNldCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9pbmRleE9mZnNldDsgaSsrKSB7XG4gICAgICAgICAgICBpbmRpY2VzW2ldID0gX2luZGljZXNbaV07XG4gICAgICAgIH1cblxuICAgICAgICBmcmFtZS52ZXJ0aWNlcyA9IHZlcnRpY2VzO1xuICAgICAgICBmcmFtZS51aW50VmVydCA9IHVpbnRWZXJ0O1xuICAgICAgICBmcmFtZS5pbmRpY2VzID0gaW5kaWNlcztcbiAgICB9LFxuXG4gICAgX3RyYXZlcnNlQXJtYXR1cmUgKGFybWF0dXJlLCBwYXJlbnRPcGFjaXR5KSB7XG4gICAgICAgIGxldCBjb2xvcnMgPSB0aGlzLl90ZW1wQ29sb3JzO1xuICAgICAgICBsZXQgc2VnbWVudHMgPSB0aGlzLl90ZW1wU2VnbWVudHM7XG4gICAgICAgIGxldCBib25lSW5mb3MgPSB0aGlzLl90ZW1wQm9uZUluZm9zO1xuICAgICAgICBsZXQgZ1ZlcnRpY2VzID0gX3ZlcnRpY2VzO1xuICAgICAgICBsZXQgZ0luZGljZXMgPSBfaW5kaWNlcztcbiAgICAgICAgbGV0IHNsb3RWZXJ0aWNlcywgc2xvdEluZGljZXM7XG4gICAgICAgIGxldCBzbG90cyA9IGFybWF0dXJlLl9zbG90cywgc2xvdCwgc2xvdE1hdHJpeCwgc2xvdE1hdHJpeG0sIHNsb3RDb2xvciwgY29sb3JWYWw7XG4gICAgICAgIGxldCB0ZXh0dXJlO1xuICAgICAgICBsZXQgcHJlU2VnT2Zmc2V0LCBwcmVTZWdJbmZvO1xuICAgICAgICBsZXQgYm9uZXMgPSBhcm1hdHVyZS5fYm9uZXM7XG5cbiAgICAgICAgaWYgKHRoaXMuX2VuYWJsZUNhY2hlQXR0YWNoZWRJbmZvKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGJvbmVzLmxlbmd0aDsgaSA8IGw7IGkrKywgX2JvbmVJbmZvT2Zmc2V0KyspIHtcbiAgICAgICAgICAgICAgICBsZXQgYm9uZSA9IGJvbmVzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBib25lSW5mbyA9IGJvbmVJbmZvc1tfYm9uZUluZm9PZmZzZXRdO1xuICAgICAgICAgICAgICAgIGlmICghYm9uZUluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgYm9uZUluZm8gPSBib25lSW5mb3NbX2JvbmVJbmZvT2Zmc2V0XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbFRyYW5zZm9ybU1hdHJpeDogbmV3IGRyYWdvbkJvbmVzLk1hdHJpeCgpLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgYm9uZU1hdCA9IGJvbmUuZ2xvYmFsVHJhbnNmb3JtTWF0cml4O1xuICAgICAgICAgICAgICAgIGxldCBjYWNoZUJvbmVNYXQgPSBib25lSW5mby5nbG9iYWxUcmFuc2Zvcm1NYXRyaXg7XG4gICAgICAgICAgICAgICAgY2FjaGVCb25lTWF0LmNvcHlGcm9tKGJvbmVNYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzbG90cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHNsb3QgPSBzbG90c1tpXTtcbiAgICAgICAgICAgIGlmICghc2xvdC5fdmlzaWJsZSB8fCAhc2xvdC5fZGlzcGxheURhdGEpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBzbG90LnVwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgICAgICBzbG90Q29sb3IgPSBzbG90Ll9jb2xvcjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHNsb3QuY2hpbGRBcm1hdHVyZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyYXZlcnNlQXJtYXR1cmUoc2xvdC5jaGlsZEFybWF0dXJlLCBwYXJlbnRPcGFjaXR5ICogc2xvdENvbG9yLmEgLyAyNTUpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZXh0dXJlID0gc2xvdC5nZXRUZXh0dXJlKCk7XG4gICAgICAgICAgICBpZiAoIXRleHR1cmUpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBpZiAoX3ByZVRleFVybCAhPT0gdGV4dHVyZS5uYXRpdmVVcmwgfHwgX3ByZUJsZW5kTW9kZSAhPT0gc2xvdC5fYmxlbmRNb2RlKSB7XG4gICAgICAgICAgICAgICAgX3ByZVRleFVybCA9IHRleHR1cmUubmF0aXZlVXJsO1xuICAgICAgICAgICAgICAgIF9wcmVCbGVuZE1vZGUgPSBzbG90Ll9ibGVuZE1vZGU7XG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIHByZSBzZWdtZW50LlxuICAgICAgICAgICAgICAgIHByZVNlZ09mZnNldCA9IF9zZWdPZmZzZXQgLSAxO1xuICAgICAgICAgICAgICAgIGlmIChwcmVTZWdPZmZzZXQgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3NlZ0lDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZVNlZ0luZm8gPSBzZWdtZW50c1twcmVTZWdPZmZzZXRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJlU2VnSW5mby5pbmRleENvdW50ID0gX3NlZ0lDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZVNlZ0luZm8udmVydGV4Q291bnQgPSBfc2VnVkNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJlU2VnSW5mby52ZkNvdW50ID0gX3NlZ1ZDb3VudCAqIDU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEaXNjYXJkIHByZSBzZWdtZW50LlxuICAgICAgICAgICAgICAgICAgICAgICAgX3NlZ09mZnNldC0tO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBub3cgc2VnbWVudC5cbiAgICAgICAgICAgICAgICBzZWdtZW50c1tfc2VnT2Zmc2V0XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4IDogdGV4dHVyZSxcbiAgICAgICAgICAgICAgICAgICAgYmxlbmRNb2RlIDogc2xvdC5fYmxlbmRNb2RlLFxuICAgICAgICAgICAgICAgICAgICBpbmRleENvdW50IDogMCxcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4Q291bnQgOiAwLFxuICAgICAgICAgICAgICAgICAgICB2ZkNvdW50IDogMFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgX3NlZ09mZnNldCsrO1xuICAgICAgICAgICAgICAgIF9zZWdJQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIF9zZWdWQ291bnQgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb2xvclZhbCA9ICgoc2xvdENvbG9yLmEgKiBwYXJlbnRPcGFjaXR5IDw8IDI0KSA+Pj4gMCkgKyAoc2xvdENvbG9yLmIgPDwgMTYpICsgKHNsb3RDb2xvci5nIDw8IDgpICsgc2xvdENvbG9yLnI7XG5cbiAgICAgICAgICAgIGlmIChfcHJlQ29sb3IgIT09IGNvbG9yVmFsKSB7XG4gICAgICAgICAgICAgICAgX3ByZUNvbG9yID0gY29sb3JWYWw7XG4gICAgICAgICAgICAgICAgaWYgKF9jb2xvck9mZnNldCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3JzW19jb2xvck9mZnNldCAtIDFdLnZmT2Zmc2V0ID0gX3ZmT2Zmc2V0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb2xvcnNbX2NvbG9yT2Zmc2V0KytdID0ge1xuICAgICAgICAgICAgICAgICAgICByIDogc2xvdENvbG9yLnIsXG4gICAgICAgICAgICAgICAgICAgIGcgOiBzbG90Q29sb3IuZyxcbiAgICAgICAgICAgICAgICAgICAgYiA6IHNsb3RDb2xvci5iLFxuICAgICAgICAgICAgICAgICAgICBhIDogc2xvdENvbG9yLmEgKiBwYXJlbnRPcGFjaXR5LFxuICAgICAgICAgICAgICAgICAgICB2Zk9mZnNldCA6IDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNsb3RWZXJ0aWNlcyA9IHNsb3QuX2xvY2FsVmVydGljZXM7XG4gICAgICAgICAgICBzbG90SW5kaWNlcyA9IHNsb3QuX2luZGljZXM7XG5cbiAgICAgICAgICAgIHNsb3RNYXRyaXggPSBzbG90Ll93b3JsZE1hdHJpeDtcbiAgICAgICAgICAgIHNsb3RNYXRyaXhtID0gc2xvdE1hdHJpeC5tO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgdmwgPSBzbG90VmVydGljZXMubGVuZ3RoOyBqIDwgdmw7KSB7XG4gICAgICAgICAgICAgICAgX3ggPSBzbG90VmVydGljZXNbaisrXTtcbiAgICAgICAgICAgICAgICBfeSA9IHNsb3RWZXJ0aWNlc1tqKytdO1xuICAgICAgICAgICAgICAgIGdWZXJ0aWNlc1tfdmZPZmZzZXQrK10gPSBfeCAqIHNsb3RNYXRyaXhtWzBdICsgX3kgKiBzbG90TWF0cml4bVs0XSArIHNsb3RNYXRyaXhtWzEyXTtcbiAgICAgICAgICAgICAgICBnVmVydGljZXNbX3ZmT2Zmc2V0KytdID0gX3ggKiBzbG90TWF0cml4bVsxXSArIF95ICogc2xvdE1hdHJpeG1bNV0gKyBzbG90TWF0cml4bVsxM107XG4gICAgICAgICAgICAgICAgZ1ZlcnRpY2VzW192Zk9mZnNldCsrXSA9IHNsb3RWZXJ0aWNlc1tqKytdO1xuICAgICAgICAgICAgICAgIGdWZXJ0aWNlc1tfdmZPZmZzZXQrK10gPSBzbG90VmVydGljZXNbaisrXTtcbiAgICAgICAgICAgICAgICBnVmVydGljZXNbX3ZmT2Zmc2V0KytdID0gY29sb3JWYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFRoaXMgcGxhY2UgbXVzdCB1c2Ugc2VnbWVudCB2ZXJ0ZXggY291bnQgdG8gY2FsY3VsYXRlIHZlcnRleCBvZmZzZXQuXG4gICAgICAgICAgICAvLyBBc3NlbWJsZXIgd2lsbCBjYWxjdWxhdGUgdmVydGV4IG9mZnNldCBhZ2FpbiBmb3IgZGlmZmVyZW50IHNlZ21lbnQuXG4gICAgICAgICAgICBmb3IgKGxldCBpaSA9IDAsIGlsID0gc2xvdEluZGljZXMubGVuZ3RoOyBpaSA8IGlsOyBpaSArKykge1xuICAgICAgICAgICAgICAgIGdJbmRpY2VzW19pbmRleE9mZnNldCsrXSA9IF9zZWdWQ291bnQgKyBzbG90SW5kaWNlc1tpaV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF92ZXJ0ZXhPZmZzZXQgPSBfdmZPZmZzZXQgLyA1O1xuICAgICAgICAgICAgX3NlZ0lDb3VudCArPSBzbG90SW5kaWNlcy5sZW5ndGg7XG4gICAgICAgICAgICBfc2VnVkNvdW50ICs9IHNsb3RWZXJ0aWNlcy5sZW5ndGggLyA0O1xuICAgICAgICB9XG4gICAgfSxcbn0pO1xuXG5sZXQgQXJtYXR1cmVDYWNoZSA9IGNjLkNsYXNzKHtcbiAgICBjdG9yICgpIHtcbiAgICAgICAgdGhpcy5fcHJpdmF0ZU1vZGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uUG9vbCA9IHt9O1xuICAgICAgICB0aGlzLl9hcm1hdHVyZUNhY2hlID0ge307XG4gICAgfSxcblxuICAgIGVuYWJsZVByaXZhdGVNb2RlICgpIHtcbiAgICAgICAgdGhpcy5fcHJpdmF0ZU1vZGUgPSB0cnVlO1xuICAgIH0sXG5cbiAgICAvLyBJZiBjYWNoZSBpcyBwcml2YXRlLCBjYWNoZSB3aWxsIGJlIGRlc3Ryb3kgd2hlbiBkcmFnb25ib25lcyBub2RlIGRlc3Ryb3kuXG4gICAgZGlzcG9zZSAoKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9hcm1hdHVyZUNhY2hlKSB7XG4gICAgICAgICAgICB2YXIgYXJtYXR1cmVJbmZvID0gdGhpcy5fYXJtYXR1cmVDYWNoZVtrZXldO1xuICAgICAgICAgICAgaWYgKGFybWF0dXJlSW5mbykge1xuICAgICAgICAgICAgICAgIGxldCBhcm1hdHVyZSA9IGFybWF0dXJlSW5mby5hcm1hdHVyZTtcbiAgICAgICAgICAgICAgICBhcm1hdHVyZSAmJiBhcm1hdHVyZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYXJtYXR1cmVDYWNoZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvblBvb2wgPSBudWxsO1xuICAgIH0sXG5cbiAgICBfcmVtb3ZlQXJtYXR1cmUgKGFybWF0dXJlS2V5KSB7XG4gICAgICAgIHZhciBhcm1hdHVyZUluZm8gPSB0aGlzLl9hcm1hdHVyZUNhY2hlW2FybWF0dXJlS2V5XTtcbiAgICAgICAgbGV0IGFuaW1hdGlvbnNDYWNoZSA9IGFybWF0dXJlSW5mby5hbmltYXRpb25zQ2FjaGU7XG4gICAgICAgIGZvciAodmFyIGFuaUtleSBpbiBhbmltYXRpb25zQ2FjaGUpIHtcbiAgICAgICAgICAgIC8vIENsZWFyIGNhY2hlIHRleHR1cmUsIGFuZCBwdXQgY2FjaGUgaW50byBwb29sLlxuICAgICAgICAgICAgLy8gTm8gbmVlZCB0byBjcmVhdGUgVHlwZWRBcnJheSBuZXh0IHRpbWUuXG4gICAgICAgICAgICBsZXQgYW5pbWF0aW9uQ2FjaGUgPSBhbmltYXRpb25zQ2FjaGVbYW5pS2V5XTtcbiAgICAgICAgICAgIGlmICghYW5pbWF0aW9uQ2FjaGUpIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uUG9vbFthcm1hdHVyZUtleSArIFwiI1wiICsgYW5pS2V5XSA9IGFuaW1hdGlvbkNhY2hlO1xuICAgICAgICAgICAgYW5pbWF0aW9uQ2FjaGUuY2xlYXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhcm1hdHVyZSA9IGFybWF0dXJlSW5mby5hcm1hdHVyZTtcbiAgICAgICAgYXJtYXR1cmUgJiYgYXJtYXR1cmUuZGlzcG9zZSgpO1xuICAgICAgICBkZWxldGUgdGhpcy5fYXJtYXR1cmVDYWNoZVthcm1hdHVyZUtleV07XG4gICAgfSxcblxuICAgIC8vIFdoZW4gZGIgYXNzZXRzIGJlIGRlc3Ryb3ksIHJlbW92ZSBhcm1hdHVyZSBmcm9tIGRiIGNhY2hlLlxuICAgIHJlc2V0QXJtYXR1cmUgKHV1aWQpIHtcbiAgICAgICAgZm9yICh2YXIgYXJtYXR1cmVLZXkgaW4gdGhpcy5fYXJtYXR1cmVDYWNoZSkge1xuICAgICAgICAgICAgaWYgKGFybWF0dXJlS2V5LmluZGV4T2YodXVpZCkgPT0gLTEpIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQXJtYXR1cmUoYXJtYXR1cmVLZXkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldEFybWF0dXJlQ2FjaGUgKGFybWF0dXJlTmFtZSwgYXJtYXR1cmVLZXksIGF0bGFzVVVJRCkge1xuICAgICAgICBsZXQgYXJtYXR1cmVJbmZvID0gdGhpcy5fYXJtYXR1cmVDYWNoZVthcm1hdHVyZUtleV07XG4gICAgICAgIGxldCBhcm1hdHVyZTtcbiAgICAgICAgaWYgKCFhcm1hdHVyZUluZm8pIHtcbiAgICAgICAgICAgIGxldCBmYWN0b3J5ID0gZHJhZ29uQm9uZXMuQ0NGYWN0b3J5LmdldEluc3RhbmNlKCk7XG4gICAgICAgICAgICBsZXQgcHJveHkgPSBmYWN0b3J5LmJ1aWxkQXJtYXR1cmVEaXNwbGF5KGFybWF0dXJlTmFtZSwgYXJtYXR1cmVLZXksIFwiXCIsIGF0bGFzVVVJRCk7XG4gICAgICAgICAgICBpZiAoIXByb3h5IHx8ICFwcm94eS5fYXJtYXR1cmUpIHJldHVybjtcbiAgICAgICAgICAgIGFybWF0dXJlID0gcHJveHkuX2FybWF0dXJlO1xuICAgICAgICAgICAgLy8gSWYgYXJtYXR1cmUgaGFzIGNoaWxkIGFybWF0dXJlLCBjYW4gbm90IGJlIGNhY2hlLCBiZWNhdXNlIGl0J3NcbiAgICAgICAgICAgIC8vIGFuaW1hdGlvbiBkYXRhIGNhbiBub3QgYmUgcHJlY29tcHV0ZS5cbiAgICAgICAgICAgIGlmICghQXJtYXR1cmVDYWNoZS5jYW5DYWNoZShhcm1hdHVyZSkpIHtcbiAgICAgICAgICAgICAgICBhcm1hdHVyZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9hcm1hdHVyZUNhY2hlW2FybWF0dXJlS2V5XSA9IHtcbiAgICAgICAgICAgICAgICBhcm1hdHVyZSA6IGFybWF0dXJlLFxuICAgICAgICAgICAgICAgIC8vIENhY2hlIGFsbCBraW5kcyBvZiBhbmltYXRpb24gZnJhbWUuXG4gICAgICAgICAgICAgICAgLy8gV2hlbiBhcm1hdHVyZSBpcyBkaXNwb3NlLCBjbGVhciBhbGwgYW5pbWF0aW9uIGNhY2hlLlxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbnNDYWNoZSA6IHt9LFxuICAgICAgICAgICAgICAgIGN1ckFuaW1hdGlvbkNhY2hlOiBudWxsLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFybWF0dXJlID0gYXJtYXR1cmVJbmZvLmFybWF0dXJlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcm1hdHVyZTtcbiAgICB9LFxuXG4gICAgZ2V0QW5pbWF0aW9uQ2FjaGUgKGFybWF0dXJlS2V5LCBhbmltYXRpb25OYW1lKSB7XG4gICAgICAgIGxldCBhcm1hdHVyZUluZm8gPSB0aGlzLl9hcm1hdHVyZUNhY2hlW2FybWF0dXJlS2V5XTtcbiAgICAgICAgaWYgKCFhcm1hdHVyZUluZm8pIHJldHVybiBudWxsO1xuXG4gICAgICAgIGxldCBhbmltYXRpb25zQ2FjaGUgPSBhcm1hdHVyZUluZm8uYW5pbWF0aW9uc0NhY2hlO1xuICAgICAgICByZXR1cm4gYW5pbWF0aW9uc0NhY2hlW2FuaW1hdGlvbk5hbWVdO1xuICAgIH0sXG5cbiAgICBpbml0QW5pbWF0aW9uQ2FjaGUgKGFybWF0dXJlS2V5LCBhbmltYXRpb25OYW1lKSB7XG4gICAgICAgIGlmICghYW5pbWF0aW9uTmFtZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgbGV0IGFybWF0dXJlSW5mbyA9IHRoaXMuX2FybWF0dXJlQ2FjaGVbYXJtYXR1cmVLZXldO1xuICAgICAgICBsZXQgYXJtYXR1cmUgPSBhcm1hdHVyZUluZm8gJiYgYXJtYXR1cmVJbmZvLmFybWF0dXJlO1xuICAgICAgICBpZiAoIWFybWF0dXJlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgbGV0IGFuaW1hdGlvbiA9IGFybWF0dXJlLmFuaW1hdGlvbjtcbiAgICAgICAgbGV0IGhhc0FuaSA9IGFuaW1hdGlvbi5oYXNBbmltYXRpb24oYW5pbWF0aW9uTmFtZSk7XG4gICAgICAgIGlmICghaGFzQW5pKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBsZXQgYW5pbWF0aW9uc0NhY2hlID0gYXJtYXR1cmVJbmZvLmFuaW1hdGlvbnNDYWNoZTtcbiAgICAgICAgbGV0IGFuaW1hdGlvbkNhY2hlID0gYW5pbWF0aW9uc0NhY2hlW2FuaW1hdGlvbk5hbWVdO1xuICAgICAgICBpZiAoIWFuaW1hdGlvbkNhY2hlKSB7XG4gICAgICAgICAgICAvLyBJZiBjYWNoZSBleGlzdCBpbiBwb29sLCB0aGVuIGp1c3QgdXNlIGl0LlxuICAgICAgICAgICAgbGV0IHBvb2xLZXkgPSBhcm1hdHVyZUtleSArIFwiI1wiICsgYW5pbWF0aW9uTmFtZTtcbiAgICAgICAgICAgIGFuaW1hdGlvbkNhY2hlID0gdGhpcy5fYW5pbWF0aW9uUG9vbFtwb29sS2V5XTtcbiAgICAgICAgICAgIGlmIChhbmltYXRpb25DYWNoZSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9hbmltYXRpb25Qb29sW3Bvb2xLZXldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25DYWNoZSA9IG5ldyBBbmltYXRpb25DYWNoZSgpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkNhY2hlLl9wcml2YXRlTW9kZSA9IHRoaXMuX3ByaXZhdGVNb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYW5pbWF0aW9uQ2FjaGUuaW5pdChhcm1hdHVyZUluZm8sIGFuaW1hdGlvbk5hbWUpO1xuICAgICAgICAgICAgYW5pbWF0aW9uc0NhY2hlW2FuaW1hdGlvbk5hbWVdID0gYW5pbWF0aW9uQ2FjaGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFuaW1hdGlvbkNhY2hlO1xuICAgIH0sXG5cbiAgICBpbnZhbGlkQW5pbWF0aW9uQ2FjaGUgKGFybWF0dXJlS2V5KSB7XG4gICAgICAgIGxldCBhcm1hdHVyZUluZm8gPSB0aGlzLl9hcm1hdHVyZUNhY2hlW2FybWF0dXJlS2V5XTtcbiAgICAgICAgbGV0IGFybWF0dXJlID0gYXJtYXR1cmVJbmZvICYmIGFybWF0dXJlSW5mby5hcm1hdHVyZTtcbiAgICAgICAgaWYgKCFhcm1hdHVyZSkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgbGV0IGFuaW1hdGlvbnNDYWNoZSA9IGFybWF0dXJlSW5mby5hbmltYXRpb25zQ2FjaGU7XG4gICAgICAgIGZvciAodmFyIGFuaUtleSBpbiBhbmltYXRpb25zQ2FjaGUpIHtcbiAgICAgICAgICAgIGxldCBhbmltYXRpb25DYWNoZSA9IGFuaW1hdGlvbnNDYWNoZVthbmlLZXldO1xuICAgICAgICAgICAgYW5pbWF0aW9uQ2FjaGUuaW52YWxpZEFsbEZyYW1lKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlQW5pbWF0aW9uQ2FjaGUgKGFybWF0dXJlS2V5LCBhbmltYXRpb25OYW1lKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25OYW1lKSB7XG4gICAgICAgICAgICBsZXQgYW5pbWF0aW9uQ2FjaGUgPSB0aGlzLmluaXRBbmltYXRpb25DYWNoZShhcm1hdHVyZUtleSwgYW5pbWF0aW9uTmFtZSk7XG4gICAgICAgICAgICBpZiAoIWFuaW1hdGlvbkNhY2hlKSByZXR1cm47XG4gICAgICAgICAgICBhbmltYXRpb25DYWNoZS51cGRhdGVBbGxGcmFtZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGFybWF0dXJlSW5mbyA9IHRoaXMuX2FybWF0dXJlQ2FjaGVbYXJtYXR1cmVLZXldO1xuICAgICAgICAgICAgbGV0IGFybWF0dXJlID0gYXJtYXR1cmVJbmZvICYmIGFybWF0dXJlSW5mby5hcm1hdHVyZTtcbiAgICAgICAgICAgIGlmICghYXJtYXR1cmUpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICBsZXQgYW5pbWF0aW9uc0NhY2hlID0gYXJtYXR1cmVJbmZvLmFuaW1hdGlvbnNDYWNoZTtcbiAgICAgICAgICAgIGZvciAodmFyIGFuaUtleSBpbiBhbmltYXRpb25zQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgYW5pbWF0aW9uQ2FjaGUgPSBhbmltYXRpb25zQ2FjaGVbYW5pS2V5XTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25DYWNoZS51cGRhdGVBbGxGcmFtZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbn0pO1xuXG5Bcm1hdHVyZUNhY2hlLkZyYW1lVGltZSA9IEZyYW1lVGltZTtcbkFybWF0dXJlQ2FjaGUuc2hhcmVkQ2FjaGUgPSBuZXcgQXJtYXR1cmVDYWNoZSgpO1xuQXJtYXR1cmVDYWNoZS5jYW5DYWNoZSA9IGZ1bmN0aW9uIChhcm1hdHVyZSkge1xuICAgIGxldCBzbG90cyA9IGFybWF0dXJlLl9zbG90cztcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHNsb3RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBsZXQgc2xvdCA9IHNsb3RzW2ldO1xuICAgICAgICBpZiAoc2xvdC5jaGlsZEFybWF0dXJlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59LFxuXG5tb2R1bGUuZXhwb3J0cyA9IEFybWF0dXJlQ2FjaGU7Il0sInNvdXJjZVJvb3QiOiIvIn0=