
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/dragonbones/AttachUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _mat = _interopRequireDefault(require("../../cocos2d/core/value-types/mat4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

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
var RenderFlow = require('../../cocos2d/core/renderer/render-flow');

var FLAG_TRANSFORM = RenderFlow.FLAG_TRANSFORM;

var EmptyHandle = function EmptyHandle() {};

var ATTACHED_ROOT_NAME = 'ATTACHED_NODE_TREE';
var ATTACHED_PRE_NAME = 'ATTACHED_NODE:';

var limitNode = function limitNode(node) {
  // attached node's world matrix update per frame
  Object.defineProperty(node, '_worldMatDirty', {
    get: function get() {
      return true;
    },
    set: function set(value) {
      /* do nothing */
    }
  }); // shield world matrix calculate interface

  node._calculWorldMatrix = EmptyHandle;
  node._mulMat = EmptyHandle;
};

var _tempMat4 = new _mat["default"]();
/**
 * @module dragonBones
 */

/**
 * !#en Attach node tool
 * !#zh 挂点工具类
 * @class dragonBones.AttachUtil
 */


var AttachUtil = cc.Class({
  name: 'dragonBones.AttachUtil',
  ctor: function ctor() {
    this._inited = false;
    this._armature = null;
    this._armatureNode = null;
    this._armatureDisplay = null;
    this._attachedRootNode = null;
    this._attachedNodeArray = [];
    this._boneIndexToNode = {};
  },
  init: function init(armatureDisplay) {
    this._inited = true;
    this._armature = armatureDisplay._armature;
    this._armatureNode = armatureDisplay.node;
    this._armatureDisplay = armatureDisplay;
  },
  reset: function reset() {
    this._inited = false;
    this._armature = null;
    this._armatureNode = null;
    this._armatureDisplay = null;
  },
  _prepareAttachNode: function _prepareAttachNode() {
    var armature = this._armature;

    if (!armature) {
      return;
    }

    var rootNode = this._armatureNode.getChildByName(ATTACHED_ROOT_NAME);

    if (!rootNode || !rootNode.isValid) {
      rootNode = new cc.Node(ATTACHED_ROOT_NAME);
      limitNode(rootNode);

      this._armatureNode.addChild(rootNode);
    }

    var isCached = this._armatureDisplay.isAnimationCached();

    if (isCached && this._armatureDisplay._frameCache) {
      this._armatureDisplay._frameCache.enableCacheAttachedInfo();
    }

    this._attachedRootNode = rootNode;
    return rootNode;
  },
  _buildBoneAttachedNode: function _buildBoneAttachedNode(bone, boneIndex) {
    var boneNodeName = ATTACHED_PRE_NAME + bone.name;
    var boneNode = new cc.Node(boneNodeName);

    this._buildBoneRelation(boneNode, bone, boneIndex);

    return boneNode;
  },
  _buildBoneRelation: function _buildBoneRelation(boneNode, bone, boneIndex) {
    limitNode(boneNode);
    boneNode._bone = bone;
    boneNode._boneIndex = boneIndex;

    this._attachedNodeArray.push(boneNode);

    this._boneIndexToNode[boneIndex] = boneNode;
  },

  /**
   * !#en Gets attached root node.
   * !#zh 获取挂接节点树的根节点
   * @method getAttachedRootNode
   * @return {cc.Node}
   */
  getAttachedRootNode: function getAttachedRootNode() {
    return this._attachedRootNode;
  },

  /**
   * !#en Gets attached node which you want.
   * !#zh 获得对应的挂点
   * @method getAttachedNodes
   * @param {String} boneName
   * @return {Node[]}
   */
  getAttachedNodes: function getAttachedNodes(boneName) {
    var nodeArray = this._attachedNodeArray;
    var res = [];
    if (!this._inited) return res;

    for (var i = 0, n = nodeArray.length; i < n; i++) {
      var boneNode = nodeArray[i];
      if (!boneNode || !boneNode.isValid) continue;

      if (boneNode.name === ATTACHED_PRE_NAME + boneName) {
        res.push(boneNode);
      }
    }

    return res;
  },
  _rebuildNodeArray: function _rebuildNodeArray() {
    var findMap = this._boneIndexToNode = {};
    var oldNodeArray = this._attachedNodeArray;
    var nodeArray = this._attachedNodeArray = [];

    for (var i = 0, n = oldNodeArray.length; i < n; i++) {
      var boneNode = oldNodeArray[i];
      if (!boneNode || !boneNode.isValid || boneNode._toRemove) continue;
      nodeArray.push(boneNode);
      findMap[boneNode._boneIndex] = boneNode;
    }
  },
  _sortNodeArray: function _sortNodeArray() {
    var nodeArray = this._attachedNodeArray;
    nodeArray.sort(function (a, b) {
      return a._boneIndex < b._boneIndex ? -1 : 1;
    });
  },
  _getNodeByBoneIndex: function _getNodeByBoneIndex(boneIndex) {
    var findMap = this._boneIndexToNode;
    var boneNode = findMap[boneIndex];
    if (!boneNode || !boneNode.isValid) return null;
    return boneNode;
  },

  /**
   * !#en Destroy attached node which you want.
   * !#zh 销毁对应的挂点
   * @method destroyAttachedNodes
   * @param {String} boneName
   */
  destroyAttachedNodes: function destroyAttachedNodes(boneName) {
    if (!this._inited) return;
    var nodeArray = this._attachedNodeArray;

    var markTree = function markTree(rootNode) {
      var children = rootNode.children;

      for (var i = 0, n = children.length; i < n; i++) {
        var c = children[i];
        if (c) markTree(c);
      }

      rootNode._toRemove = true;
    };

    for (var i = 0, n = nodeArray.length; i < n; i++) {
      var boneNode = nodeArray[i];
      if (!boneNode || !boneNode.isValid) continue;
      var delName = boneNode.name.split(ATTACHED_PRE_NAME)[1];

      if (delName === boneName) {
        markTree(boneNode);
        boneNode.removeFromParent(true);
        boneNode.destroy();
        nodeArray[i] = null;
      }
    }

    this._rebuildNodeArray();
  },

  /**
   * !#en Traverse all bones to generate the minimum node tree containing the given bone names, NOTE that make sure the skeleton has initialized before calling this interface.
   * !#zh 遍历所有插槽，生成包含所有给定插槽名称的最小节点树，注意，调用该接口前请确保骨骼动画已经初始化好。
   * @method generateAttachedNodes
   * @param {String} boneName
   * @return {Node[]} attached node array 
   */
  generateAttachedNodes: function generateAttachedNodes(boneName) {
    var targetNodes = [];
    if (!this._inited) return targetNodes;

    var rootNode = this._prepareAttachNode();

    if (!rootNode) return targetNodes;
    var boneIndex = 0;
    var res = [];

    var attachedTraverse = function (armature) {
      if (!armature) return;
      var bones = armature.getBones(),
          bone;

      for (var i = 0, l = bones.length; i < l; i++) {
        bone = bones[i];
        bone._boneIndex = boneIndex++;

        if (boneName === bone.name) {
          res.push(bone);
        }
      }

      var slots = armature.getSlots(),
          slot;

      for (var _i = 0, _l = slots.length; _i < _l; _i++) {
        slot = slots[_i];

        if (slot.childArmature) {
          attachedTraverse(slot.childArmature);
        }
      }
    }.bind(this);

    attachedTraverse(this._armature);

    var buildBoneTree = function (bone) {
      if (!bone) return;

      var boneNode = this._getNodeByBoneIndex(bone._boneIndex);

      if (boneNode) return boneNode;
      boneNode = this._buildBoneAttachedNode(bone, bone._boneIndex);
      var subArmatureParentBone = null;

      if (bone.armature.parent) {
        var parentSlot = bone.armature.parent;
        subArmatureParentBone = parentSlot.parent;
      }

      var parentBoneNode = buildBoneTree(bone.parent || subArmatureParentBone) || rootNode;
      boneNode.parent = parentBoneNode;

      if (bone.parent) {
        boneNode._rootNode = parentBoneNode._rootNode;
      } else {
        boneNode._rootNode = parentBoneNode;
      }

      return boneNode;
    }.bind(this);

    for (var i = 0, n = res.length; i < n; i++) {
      var targetNode = buildBoneTree(res[i]);

      if (targetNode) {
        targetNodes.push(targetNode);
      }
    }

    this._sortNodeArray();

    return targetNodes;
  },

  /**
   * !#en Destroy all attached node.
   * !#zh 销毁所有挂点
   * @method destroyAllAttachedNodes
   */
  destroyAllAttachedNodes: function destroyAllAttachedNodes() {
    this._attachedRootNode = null;
    this._attachedNodeArray.length = 0;
    this._boneIndexToNode = {};
    if (!this._inited) return;

    var rootNode = this._armatureNode.getChildByName(ATTACHED_ROOT_NAME);

    if (rootNode) {
      rootNode.removeFromParent(true);
      rootNode.destroy();
      rootNode = null;
    }
  },

  /**
   * !#en Traverse all bones to generate a tree containing all bones nodes, NOTE that make sure the skeleton has initialized before calling this interface.
   * !#zh 遍历所有插槽，生成包含所有插槽的节点树，注意，调用该接口前请确保骨骼动画已经初始化好。
   * @method generateAllAttachedNodes
   * @return {cc.Node} root node
   */
  generateAllAttachedNodes: function generateAllAttachedNodes() {
    if (!this._inited) return; // clear all records

    this._boneIndexToNode = {};
    this._attachedNodeArray.length = 0;

    var rootNode = this._prepareAttachNode();

    if (!rootNode) return;
    var boneIndex = 0;

    var attachedTraverse = function (armature) {
      if (!armature) return;
      var subArmatureParentNode = rootNode;

      if (armature.parent) {
        var parentSlot = armature.parent;
        var parentBone = parentSlot.parent;
        subArmatureParentNode = parentBone._attachedNode;
      }

      var bones = armature.getBones(),
          bone;

      for (var i = 0, l = bones.length; i < l; i++) {
        var curBoneIndex = boneIndex++;
        bone = bones[i];
        bone._attachedNode = null;
        var parentNode = null;

        if (bone.parent) {
          parentNode = bone.parent._attachedNode;
        } else {
          parentNode = subArmatureParentNode;
        }

        if (parentNode) {
          var boneNode = parentNode.getChildByName(ATTACHED_PRE_NAME + bone.name);

          if (!boneNode || !boneNode.isValid) {
            boneNode = this._buildBoneAttachedNode(bone, curBoneIndex);
            parentNode.addChild(boneNode);
          } else {
            this._buildBoneRelation(boneNode, bone, curBoneIndex);
          }

          boneNode._rootNode = subArmatureParentNode;
          bone._attachedNode = boneNode;
        }
      }

      var slots = armature.getSlots(),
          slot;

      for (var _i2 = 0, _l2 = slots.length; _i2 < _l2; _i2++) {
        slot = slots[_i2];

        if (slot.childArmature) {
          attachedTraverse(slot.childArmature);
        }
      }
    }.bind(this);

    attachedTraverse(this._armature);
    return rootNode;
  },
  _hasAttachedNode: function _hasAttachedNode() {
    if (!this._inited) return false;

    var attachedRootNode = this._armatureNode.getChildByName(ATTACHED_ROOT_NAME);

    return !!attachedRootNode;
  },
  _associateAttachedNode: function _associateAttachedNode() {
    if (!this._inited) return;

    var rootNode = this._armatureNode.getChildByName(ATTACHED_ROOT_NAME);

    if (!rootNode || !rootNode.isValid) return;
    this._attachedRootNode = rootNode; // clear all records

    this._boneIndexToNode = {};
    var nodeArray = this._attachedNodeArray;
    nodeArray.length = 0;
    var armature = this._armature;

    if (!armature) {
      return;
    }

    limitNode(rootNode);

    if (!CC_NATIVERENDERER) {
      var isCached = this._armatureDisplay.isAnimationCached();

      if (isCached && this._armatureDisplay._frameCache) {
        this._armatureDisplay._frameCache.enableCacheAttachedInfo();
      }
    }

    var boneIndex = 0;

    var attachedTraverse = function (armature) {
      if (!armature) return;
      var subArmatureParentNode = rootNode;

      if (armature.parent) {
        var parentSlot = armature.parent;
        var parentBone = parentSlot.parent;
        subArmatureParentNode = parentBone._attachedNode;
      }

      var bones = armature.getBones(),
          bone;

      for (var i = 0, l = bones.length; i < l; i++) {
        var curBoneIndex = boneIndex++;
        bone = bones[i];
        bone._attachedNode = null;
        var parentNode = null;

        if (bone.parent) {
          parentNode = bone.parent._attachedNode;
        } else {
          parentNode = subArmatureParentNode;
        }

        if (parentNode) {
          var boneNode = parentNode.getChildByName(ATTACHED_PRE_NAME + bone.name);

          if (boneNode && boneNode.isValid) {
            this._buildBoneRelation(boneNode, bone, curBoneIndex);

            boneNode._rootNode = subArmatureParentNode;
            bone._attachedNode = boneNode;
          }
        }
      }

      var slots = armature.getSlots(),
          slot;

      for (var _i3 = 0, _l3 = slots.length; _i3 < _l3; _i3++) {
        slot = slots[_i3];

        if (slot.childArmature) {
          attachedTraverse(slot.childArmature);
        }
      }
    }.bind(this);

    attachedTraverse(armature);
  },
  _syncAttachedNode: function _syncAttachedNode() {
    if (!this._inited) return;
    var rootNode = this._attachedRootNode;
    var nodeArray = this._attachedNodeArray;

    if (!rootNode || !rootNode.isValid) {
      this._attachedRootNode = null;
      nodeArray.length = 0;
      return;
    }

    var rootMatrix = this._armatureNode._worldMatrix;

    _mat["default"].copy(rootNode._worldMatrix, rootMatrix);

    rootNode._renderFlag &= ~FLAG_TRANSFORM;
    var boneInfos = null;

    var isCached = this._armatureDisplay.isAnimationCached();

    if (isCached) {
      boneInfos = this._armatureDisplay._curFrame && this._armatureDisplay._curFrame.boneInfos;
      if (!boneInfos) return;
    }

    var mulMat = this._armatureNode._mulMat;

    var matrixHandle = function matrixHandle(nodeMat, parentMat, boneMat) {
      var tm = _tempMat4.m;
      tm[0] = boneMat.a;
      tm[1] = boneMat.b;
      tm[4] = -boneMat.c;
      tm[5] = -boneMat.d;
      tm[12] = boneMat.tx;
      tm[13] = boneMat.ty;
      mulMat(nodeMat, parentMat, _tempMat4);
    };

    var nodeArrayDirty = false;

    for (var i = 0, n = nodeArray.length; i < n; i++) {
      var boneNode = nodeArray[i]; // Node has been destroy

      if (!boneNode || !boneNode.isValid) {
        nodeArray[i] = null;
        nodeArrayDirty = true;
        continue;
      }

      var bone = isCached ? boneInfos[boneNode._boneIndex] : boneNode._bone; // Bone has been destroy

      if (!bone || bone._isInPool) {
        boneNode.removeFromParent(true);
        boneNode.destroy();
        nodeArray[i] = null;
        nodeArrayDirty = true;
        continue;
      }

      matrixHandle(boneNode._worldMatrix, boneNode._rootNode._worldMatrix, bone.globalTransformMatrix);
      boneNode._renderFlag &= ~FLAG_TRANSFORM;
    }

    if (nodeArrayDirty) {
      this._rebuildNodeArray();
    }
  }
});
module.exports = dragonBones.AttachUtil = AttachUtil;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvZXh0ZW5zaW9ucy9kcmFnb25ib25lcy9BdHRhY2hVdGlsLmpzIl0sIm5hbWVzIjpbIlJlbmRlckZsb3ciLCJyZXF1aXJlIiwiRkxBR19UUkFOU0ZPUk0iLCJFbXB0eUhhbmRsZSIsIkFUVEFDSEVEX1JPT1RfTkFNRSIsIkFUVEFDSEVEX1BSRV9OQU1FIiwibGltaXROb2RlIiwibm9kZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJfY2FsY3VsV29ybGRNYXRyaXgiLCJfbXVsTWF0IiwiX3RlbXBNYXQ0IiwiTWF0NCIsIkF0dGFjaFV0aWwiLCJjYyIsIkNsYXNzIiwibmFtZSIsImN0b3IiLCJfaW5pdGVkIiwiX2FybWF0dXJlIiwiX2FybWF0dXJlTm9kZSIsIl9hcm1hdHVyZURpc3BsYXkiLCJfYXR0YWNoZWRSb290Tm9kZSIsIl9hdHRhY2hlZE5vZGVBcnJheSIsIl9ib25lSW5kZXhUb05vZGUiLCJpbml0IiwiYXJtYXR1cmVEaXNwbGF5IiwicmVzZXQiLCJfcHJlcGFyZUF0dGFjaE5vZGUiLCJhcm1hdHVyZSIsInJvb3ROb2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJpc1ZhbGlkIiwiTm9kZSIsImFkZENoaWxkIiwiaXNDYWNoZWQiLCJpc0FuaW1hdGlvbkNhY2hlZCIsIl9mcmFtZUNhY2hlIiwiZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8iLCJfYnVpbGRCb25lQXR0YWNoZWROb2RlIiwiYm9uZSIsImJvbmVJbmRleCIsImJvbmVOb2RlTmFtZSIsImJvbmVOb2RlIiwiX2J1aWxkQm9uZVJlbGF0aW9uIiwiX2JvbmUiLCJfYm9uZUluZGV4IiwicHVzaCIsImdldEF0dGFjaGVkUm9vdE5vZGUiLCJnZXRBdHRhY2hlZE5vZGVzIiwiYm9uZU5hbWUiLCJub2RlQXJyYXkiLCJyZXMiLCJpIiwibiIsImxlbmd0aCIsIl9yZWJ1aWxkTm9kZUFycmF5IiwiZmluZE1hcCIsIm9sZE5vZGVBcnJheSIsIl90b1JlbW92ZSIsIl9zb3J0Tm9kZUFycmF5Iiwic29ydCIsImEiLCJiIiwiX2dldE5vZGVCeUJvbmVJbmRleCIsImRlc3Ryb3lBdHRhY2hlZE5vZGVzIiwibWFya1RyZWUiLCJjaGlsZHJlbiIsImMiLCJkZWxOYW1lIiwic3BsaXQiLCJyZW1vdmVGcm9tUGFyZW50IiwiZGVzdHJveSIsImdlbmVyYXRlQXR0YWNoZWROb2RlcyIsInRhcmdldE5vZGVzIiwiYXR0YWNoZWRUcmF2ZXJzZSIsImJvbmVzIiwiZ2V0Qm9uZXMiLCJsIiwic2xvdHMiLCJnZXRTbG90cyIsInNsb3QiLCJjaGlsZEFybWF0dXJlIiwiYmluZCIsImJ1aWxkQm9uZVRyZWUiLCJzdWJBcm1hdHVyZVBhcmVudEJvbmUiLCJwYXJlbnQiLCJwYXJlbnRTbG90IiwicGFyZW50Qm9uZU5vZGUiLCJfcm9vdE5vZGUiLCJ0YXJnZXROb2RlIiwiZGVzdHJveUFsbEF0dGFjaGVkTm9kZXMiLCJnZW5lcmF0ZUFsbEF0dGFjaGVkTm9kZXMiLCJzdWJBcm1hdHVyZVBhcmVudE5vZGUiLCJwYXJlbnRCb25lIiwiX2F0dGFjaGVkTm9kZSIsImN1ckJvbmVJbmRleCIsInBhcmVudE5vZGUiLCJfaGFzQXR0YWNoZWROb2RlIiwiYXR0YWNoZWRSb290Tm9kZSIsIl9hc3NvY2lhdGVBdHRhY2hlZE5vZGUiLCJDQ19OQVRJVkVSRU5ERVJFUiIsIl9zeW5jQXR0YWNoZWROb2RlIiwicm9vdE1hdHJpeCIsIl93b3JsZE1hdHJpeCIsImNvcHkiLCJfcmVuZGVyRmxhZyIsImJvbmVJbmZvcyIsIl9jdXJGcmFtZSIsIm11bE1hdCIsIm1hdHJpeEhhbmRsZSIsIm5vZGVNYXQiLCJwYXJlbnRNYXQiLCJib25lTWF0IiwidG0iLCJtIiwiZCIsInR4IiwidHkiLCJub2RlQXJyYXlEaXJ0eSIsIl9pc0luUG9vbCIsImdsb2JhbFRyYW5zZm9ybU1hdHJpeCIsIm1vZHVsZSIsImV4cG9ydHMiLCJkcmFnb25Cb25lcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQXlCQTs7OztB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O0FBQ3pCN0UsUUFBQUEsUUFBUSxDQUFDNEIsZ0JBQVQsQ0FBMEIsSUFBMUI7QUFDQTVCLFFBQUFBLFFBQVEsQ0FBQzZCLE9BQVQ7QUFDQXJCLFFBQUFBLFNBQVMsQ0FBQ0UsQ0FBRCxDQUFULEdBQWUsSUFBZjtBQUNBa0UsUUFBQUEsY0FBYyxHQUFHLElBQWpCO0FBQ0E7QUFDSDs7QUFDRFQsTUFBQUEsWUFBWSxDQUFDbkUsUUFBUSxDQUFDNkQsWUFBVixFQUF3QjdELFFBQVEsQ0FBQzhDLFNBQVQsQ0FBbUJlLFlBQTNDLEVBQXlEaEUsSUFBSSxDQUFDaUYscUJBQTlELENBQVo7QUFDQTlFLE1BQUFBLFFBQVEsQ0FBQytELFdBQVQsSUFBd0IsQ0FBQzVHLGNBQXpCO0FBQ0g7O0FBQ0QsUUFBSXlILGNBQUosRUFBb0I7QUFDaEIsV0FBSy9ELGlCQUFMO0FBQ0g7QUFDSjtBQWxjcUIsQ0FBVCxDQUFqQjtBQXFjQWtFLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQkMsV0FBVyxDQUFDL0csVUFBWixHQUF5QkEsVUFBMUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IE1hdDQgZnJvbSAnLi4vLi4vY29jb3MyZC9jb3JlL3ZhbHVlLXR5cGVzL21hdDQnO1xuY29uc3QgUmVuZGVyRmxvdyA9IHJlcXVpcmUoJy4uLy4uL2NvY29zMmQvY29yZS9yZW5kZXJlci9yZW5kZXItZmxvdycpO1xuY29uc3QgRkxBR19UUkFOU0ZPUk0gPSBSZW5kZXJGbG93LkZMQUdfVFJBTlNGT1JNO1xuY29uc3QgRW1wdHlIYW5kbGUgPSBmdW5jdGlvbiAoKSB7fVxuY29uc3QgQVRUQUNIRURfUk9PVF9OQU1FID0gJ0FUVEFDSEVEX05PREVfVFJFRSc7XG5jb25zdCBBVFRBQ0hFRF9QUkVfTkFNRSA9ICdBVFRBQ0hFRF9OT0RFOic7XG5jb25zdCBsaW1pdE5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIC8vIGF0dGFjaGVkIG5vZGUncyB3b3JsZCBtYXRyaXggdXBkYXRlIHBlciBmcmFtZVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShub2RlLCAnX3dvcmxkTWF0RGlydHknLCB7XG4gICAgICAgIGdldCAoKSB7IHJldHVybiB0cnVlOyB9LFxuICAgICAgICBzZXQgKHZhbHVlKSB7LyogZG8gbm90aGluZyAqL31cbiAgICB9KTtcbiAgICAvLyBzaGllbGQgd29ybGQgbWF0cml4IGNhbGN1bGF0ZSBpbnRlcmZhY2VcbiAgICBub2RlLl9jYWxjdWxXb3JsZE1hdHJpeCA9IEVtcHR5SGFuZGxlO1xuICAgIG5vZGUuX211bE1hdCA9IEVtcHR5SGFuZGxlO1xufTtcbmxldCBfdGVtcE1hdDQgPSBuZXcgTWF0NCgpO1xuXG4vKipcbiAqIEBtb2R1bGUgZHJhZ29uQm9uZXNcbiAqL1xuXG4vKipcbiAqICEjZW4gQXR0YWNoIG5vZGUgdG9vbFxuICogISN6aCDmjILngrnlt6XlhbfnsbtcbiAqIEBjbGFzcyBkcmFnb25Cb25lcy5BdHRhY2hVdGlsXG4gKi9cbmxldCBBdHRhY2hVdGlsID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdkcmFnb25Cb25lcy5BdHRhY2hVdGlsJyxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICB0aGlzLl9pbml0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fYXJtYXR1cmUgPSBudWxsO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZU5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkgPSBudWxsO1xuICAgICAgICB0aGlzLl9hdHRhY2hlZFJvb3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYXR0YWNoZWROb2RlQXJyYXkgPSBbXTtcbiAgICAgICAgdGhpcy5fYm9uZUluZGV4VG9Ob2RlID0ge307XG4gICAgfSxcblxuICAgIGluaXQgKGFybWF0dXJlRGlzcGxheSkge1xuICAgICAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZSA9IGFybWF0dXJlRGlzcGxheS5fYXJtYXR1cmU7XG4gICAgICAgIHRoaXMuX2FybWF0dXJlTm9kZSA9IGFybWF0dXJlRGlzcGxheS5ub2RlO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkgPSBhcm1hdHVyZURpc3BsYXk7XG4gICAgfSxcblxuICAgIHJlc2V0ICgpIHtcbiAgICAgICAgdGhpcy5faW5pdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2FybWF0dXJlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYXJtYXR1cmVOb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5ID0gbnVsbDtcbiAgICB9LFxuXG4gICAgX3ByZXBhcmVBdHRhY2hOb2RlICgpIHtcbiAgICAgICAgbGV0IGFybWF0dXJlID0gdGhpcy5fYXJtYXR1cmU7XG4gICAgICAgIGlmICghYXJtYXR1cmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByb290Tm9kZSA9IHRoaXMuX2FybWF0dXJlTm9kZS5nZXRDaGlsZEJ5TmFtZShBVFRBQ0hFRF9ST09UX05BTUUpO1xuICAgICAgICBpZiAoIXJvb3ROb2RlIHx8ICFyb290Tm9kZS5pc1ZhbGlkKSB7XG4gICAgICAgICAgICByb290Tm9kZSA9IG5ldyBjYy5Ob2RlKEFUVEFDSEVEX1JPT1RfTkFNRSk7XG4gICAgICAgICAgICBsaW1pdE5vZGUocm9vdE5vZGUpO1xuICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmVOb2RlLmFkZENoaWxkKHJvb3ROb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpc0NhY2hlZCA9IHRoaXMuX2FybWF0dXJlRGlzcGxheS5pc0FuaW1hdGlvbkNhY2hlZCgpO1xuICAgICAgICBpZiAoaXNDYWNoZWQgJiYgdGhpcy5fYXJtYXR1cmVEaXNwbGF5Ll9mcmFtZUNhY2hlKSB7XG4gICAgICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkuX2ZyYW1lQ2FjaGUuZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2F0dGFjaGVkUm9vdE5vZGUgPSByb290Tm9kZTtcbiAgICAgICAgcmV0dXJuIHJvb3ROb2RlO1xuICAgIH0sXG5cbiAgICBfYnVpbGRCb25lQXR0YWNoZWROb2RlIChib25lLCBib25lSW5kZXgpIHtcbiAgICAgICAgbGV0IGJvbmVOb2RlTmFtZSA9IEFUVEFDSEVEX1BSRV9OQU1FICsgYm9uZS5uYW1lO1xuICAgICAgICBsZXQgYm9uZU5vZGUgPSBuZXcgY2MuTm9kZShib25lTm9kZU5hbWUpO1xuICAgICAgICB0aGlzLl9idWlsZEJvbmVSZWxhdGlvbihib25lTm9kZSwgYm9uZSwgYm9uZUluZGV4KTtcbiAgICAgICAgcmV0dXJuIGJvbmVOb2RlO1xuICAgIH0sXG5cbiAgICBfYnVpbGRCb25lUmVsYXRpb24gKGJvbmVOb2RlLCBib25lLCBib25lSW5kZXgpIHtcbiAgICAgICAgbGltaXROb2RlKGJvbmVOb2RlKTtcbiAgICAgICAgYm9uZU5vZGUuX2JvbmUgPSBib25lO1xuICAgICAgICBib25lTm9kZS5fYm9uZUluZGV4ID0gYm9uZUluZGV4O1xuICAgICAgICB0aGlzLl9hdHRhY2hlZE5vZGVBcnJheS5wdXNoKGJvbmVOb2RlKTtcbiAgICAgICAgdGhpcy5fYm9uZUluZGV4VG9Ob2RlW2JvbmVJbmRleF0gPSBib25lTm9kZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXRzIGF0dGFjaGVkIHJvb3Qgbm9kZS5cbiAgICAgKiAhI3poIOiOt+WPluaMguaOpeiKgueCueagkeeahOagueiKgueCuVxuICAgICAqIEBtZXRob2QgZ2V0QXR0YWNoZWRSb290Tm9kZVxuICAgICAqIEByZXR1cm4ge2NjLk5vZGV9XG4gICAgICovXG4gICAgZ2V0QXR0YWNoZWRSb290Tm9kZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdHRhY2hlZFJvb3ROb2RlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHMgYXR0YWNoZWQgbm9kZSB3aGljaCB5b3Ugd2FudC5cbiAgICAgKiAhI3poIOiOt+W+l+WvueW6lOeahOaMgueCuVxuICAgICAqIEBtZXRob2QgZ2V0QXR0YWNoZWROb2Rlc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBib25lTmFtZVxuICAgICAqIEByZXR1cm4ge05vZGVbXX1cbiAgICAgKi9cbiAgICBnZXRBdHRhY2hlZE5vZGVzIChib25lTmFtZSkge1xuICAgICAgICBsZXQgbm9kZUFycmF5ID0gdGhpcy5fYXR0YWNoZWROb2RlQXJyYXk7XG4gICAgICAgIGxldCByZXMgPSBbXTtcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0ZWQpIHJldHVybiByZXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gbm9kZUFycmF5Lmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgbGV0IGJvbmVOb2RlID0gbm9kZUFycmF5W2ldO1xuICAgICAgICAgICAgaWYgKCFib25lTm9kZSB8fCAhYm9uZU5vZGUuaXNWYWxpZCkgY29udGludWU7XG4gICAgICAgICAgICBpZiAoYm9uZU5vZGUubmFtZSA9PT0gQVRUQUNIRURfUFJFX05BTUUgKyBib25lTmFtZSkge1xuICAgICAgICAgICAgICAgIHJlcy5wdXNoKGJvbmVOb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH0sXG5cbiAgICBfcmVidWlsZE5vZGVBcnJheSAoKSB7XG4gICAgICAgIGxldCBmaW5kTWFwID0gdGhpcy5fYm9uZUluZGV4VG9Ob2RlID0ge307XG4gICAgICAgIGxldCBvbGROb2RlQXJyYXkgPSB0aGlzLl9hdHRhY2hlZE5vZGVBcnJheTtcbiAgICAgICAgbGV0IG5vZGVBcnJheSA9IHRoaXMuX2F0dGFjaGVkTm9kZUFycmF5ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gb2xkTm9kZUFycmF5Lmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgbGV0IGJvbmVOb2RlID0gb2xkTm9kZUFycmF5W2ldO1xuICAgICAgICAgICAgaWYgKCFib25lTm9kZSB8fCAhYm9uZU5vZGUuaXNWYWxpZCB8fCBib25lTm9kZS5fdG9SZW1vdmUpIGNvbnRpbnVlO1xuICAgICAgICAgICAgbm9kZUFycmF5LnB1c2goYm9uZU5vZGUpO1xuICAgICAgICAgICAgZmluZE1hcFtib25lTm9kZS5fYm9uZUluZGV4XSA9IGJvbmVOb2RlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9zb3J0Tm9kZUFycmF5ICgpIHtcbiAgICAgICAgbGV0IG5vZGVBcnJheSA9IHRoaXMuX2F0dGFjaGVkTm9kZUFycmF5O1xuICAgICAgICBub2RlQXJyYXkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEuX2JvbmVJbmRleCA8IGIuX2JvbmVJbmRleD8gLTEgOiAxO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgX2dldE5vZGVCeUJvbmVJbmRleCAoYm9uZUluZGV4KSB7XG4gICAgICAgIGxldCBmaW5kTWFwID0gdGhpcy5fYm9uZUluZGV4VG9Ob2RlO1xuICAgICAgICBsZXQgYm9uZU5vZGUgPSBmaW5kTWFwW2JvbmVJbmRleF07XG4gICAgICAgIGlmICghYm9uZU5vZGUgfHwgIWJvbmVOb2RlLmlzVmFsaWQpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gYm9uZU5vZGU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gRGVzdHJveSBhdHRhY2hlZCBub2RlIHdoaWNoIHlvdSB3YW50LlxuICAgICAqICEjemgg6ZSA5q+B5a+55bqU55qE5oyC54K5XG4gICAgICogQG1ldGhvZCBkZXN0cm95QXR0YWNoZWROb2Rlc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBib25lTmFtZVxuICAgICAqL1xuICAgIGRlc3Ryb3lBdHRhY2hlZE5vZGVzIChib25lTmFtZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBub2RlQXJyYXkgPSB0aGlzLl9hdHRhY2hlZE5vZGVBcnJheTtcbiAgICAgICAgbGV0IG1hcmtUcmVlID0gZnVuY3Rpb24gKHJvb3ROb2RlKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSByb290Tm9kZS5jaGlsZHJlbjtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGMgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBpZiAoYykgbWFya1RyZWUoYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb290Tm9kZS5fdG9SZW1vdmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBub2RlQXJyYXkubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYm9uZU5vZGUgPSBub2RlQXJyYXlbaV07XG4gICAgICAgICAgICBpZiAoIWJvbmVOb2RlIHx8ICFib25lTm9kZS5pc1ZhbGlkKSBjb250aW51ZTtcblxuICAgICAgICAgICAgbGV0IGRlbE5hbWUgPSBib25lTm9kZS5uYW1lLnNwbGl0KEFUVEFDSEVEX1BSRV9OQU1FKVsxXTtcbiAgICAgICAgICAgIGlmIChkZWxOYW1lID09PSBib25lTmFtZSkge1xuICAgICAgICAgICAgICAgIG1hcmtUcmVlKGJvbmVOb2RlKTtcbiAgICAgICAgICAgICAgICBib25lTm9kZS5yZW1vdmVGcm9tUGFyZW50KHRydWUpO1xuICAgICAgICAgICAgICAgIGJvbmVOb2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBub2RlQXJyYXlbaV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcmVidWlsZE5vZGVBcnJheSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRyYXZlcnNlIGFsbCBib25lcyB0byBnZW5lcmF0ZSB0aGUgbWluaW11bSBub2RlIHRyZWUgY29udGFpbmluZyB0aGUgZ2l2ZW4gYm9uZSBuYW1lcywgTk9URSB0aGF0IG1ha2Ugc3VyZSB0aGUgc2tlbGV0b24gaGFzIGluaXRpYWxpemVkIGJlZm9yZSBjYWxsaW5nIHRoaXMgaW50ZXJmYWNlLlxuICAgICAqICEjemgg6YGN5Y6G5omA5pyJ5o+S5qe977yM55Sf5oiQ5YyF5ZCr5omA5pyJ57uZ5a6a5o+S5qe95ZCN56ew55qE5pyA5bCP6IqC54K55qCR77yM5rOo5oSP77yM6LCD55So6K+l5o6l5Y+j5YmN6K+356Gu5L+d6aqo6aq85Yqo55S75bey57uP5Yid5aeL5YyW5aW944CCXG4gICAgICogQG1ldGhvZCBnZW5lcmF0ZUF0dGFjaGVkTm9kZXNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYm9uZU5hbWVcbiAgICAgKiBAcmV0dXJuIHtOb2RlW119IGF0dGFjaGVkIG5vZGUgYXJyYXkgXG4gICAgICovXG4gICAgZ2VuZXJhdGVBdHRhY2hlZE5vZGVzIChib25lTmFtZSkge1xuICAgICAgICBsZXQgdGFyZ2V0Tm9kZXMgPSBbXTtcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0ZWQpIHJldHVybiB0YXJnZXROb2RlcztcblxuICAgICAgICBsZXQgcm9vdE5vZGUgPSB0aGlzLl9wcmVwYXJlQXR0YWNoTm9kZSgpO1xuICAgICAgICBpZiAoIXJvb3ROb2RlKSByZXR1cm4gdGFyZ2V0Tm9kZXM7XG5cbiAgICAgICAgbGV0IGJvbmVJbmRleCA9IDA7XG4gICAgICAgIGxldCByZXMgPSBbXTtcbiAgICAgICAgbGV0IGF0dGFjaGVkVHJhdmVyc2UgPSBmdW5jdGlvbiAoYXJtYXR1cmUpIHtcbiAgICAgICAgICAgIGlmICghYXJtYXR1cmUpIHJldHVybjtcblxuICAgICAgICAgICAgbGV0IGJvbmVzID0gYXJtYXR1cmUuZ2V0Qm9uZXMoKSwgYm9uZTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDAsIGwgPSBib25lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBib25lID0gYm9uZXNbaV07XG4gICAgICAgICAgICAgICAgYm9uZS5fYm9uZUluZGV4ID0gYm9uZUluZGV4Kys7XG4gICAgICAgICAgICAgICAgaWYgKGJvbmVOYW1lID09PSBib25lLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goYm9uZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc2xvdHMgPSBhcm1hdHVyZS5nZXRTbG90cygpLCBzbG90O1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzbG90cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzbG90ID0gc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHNsb3QuY2hpbGRBcm1hdHVyZSkge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2hlZFRyYXZlcnNlKHNsb3QuY2hpbGRBcm1hdHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcyk7XG4gICAgICAgIGF0dGFjaGVkVHJhdmVyc2UodGhpcy5fYXJtYXR1cmUpO1xuXG4gICAgICAgIGxldCBidWlsZEJvbmVUcmVlID0gZnVuY3Rpb24gKGJvbmUpIHtcbiAgICAgICAgICAgIGlmICghYm9uZSkgcmV0dXJuO1xuICAgICAgICAgICAgbGV0IGJvbmVOb2RlID0gdGhpcy5fZ2V0Tm9kZUJ5Qm9uZUluZGV4KGJvbmUuX2JvbmVJbmRleCk7XG4gICAgICAgICAgICBpZiAoYm9uZU5vZGUpIHJldHVybiBib25lTm9kZTtcblxuICAgICAgICAgICAgYm9uZU5vZGUgPSB0aGlzLl9idWlsZEJvbmVBdHRhY2hlZE5vZGUoYm9uZSwgYm9uZS5fYm9uZUluZGV4KTtcblxuICAgICAgICAgICAgbGV0IHN1YkFybWF0dXJlUGFyZW50Qm9uZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAoYm9uZS5hcm1hdHVyZS5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50U2xvdCA9IGJvbmUuYXJtYXR1cmUucGFyZW50O1xuICAgICAgICAgICAgICAgIHN1YkFybWF0dXJlUGFyZW50Qm9uZSA9IHBhcmVudFNsb3QucGFyZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcGFyZW50Qm9uZU5vZGUgPSBidWlsZEJvbmVUcmVlKGJvbmUucGFyZW50IHx8IHN1YkFybWF0dXJlUGFyZW50Qm9uZSkgfHwgcm9vdE5vZGU7XG4gICAgICAgICAgICBib25lTm9kZS5wYXJlbnQgPSBwYXJlbnRCb25lTm9kZTtcblxuICAgICAgICAgICAgaWYgKGJvbmUucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgYm9uZU5vZGUuX3Jvb3ROb2RlID0gcGFyZW50Qm9uZU5vZGUuX3Jvb3ROb2RlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBib25lTm9kZS5fcm9vdE5vZGUgPSBwYXJlbnRCb25lTm9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGJvbmVOb2RlO1xuICAgICAgICB9LmJpbmQodGhpcyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSByZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0Tm9kZSA9IGJ1aWxkQm9uZVRyZWUocmVzW2ldKTtcbiAgICAgICAgICAgIGlmICh0YXJnZXROb2RlKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Tm9kZXMucHVzaCh0YXJnZXROb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NvcnROb2RlQXJyYXkoKTtcbiAgICAgICAgcmV0dXJuIHRhcmdldE5vZGVzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIERlc3Ryb3kgYWxsIGF0dGFjaGVkIG5vZGUuXG4gICAgICogISN6aCDplIDmr4HmiYDmnInmjILngrlcbiAgICAgKiBAbWV0aG9kIGRlc3Ryb3lBbGxBdHRhY2hlZE5vZGVzXG4gICAgICovXG4gICAgZGVzdHJveUFsbEF0dGFjaGVkTm9kZXMgKCkge1xuICAgICAgICB0aGlzLl9hdHRhY2hlZFJvb3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYXR0YWNoZWROb2RlQXJyYXkubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fYm9uZUluZGV4VG9Ob2RlID0ge307XG4gICAgICAgIGlmICghdGhpcy5faW5pdGVkKSByZXR1cm47XG5cbiAgICAgICAgbGV0IHJvb3ROb2RlID0gdGhpcy5fYXJtYXR1cmVOb2RlLmdldENoaWxkQnlOYW1lKEFUVEFDSEVEX1JPT1RfTkFNRSk7XG4gICAgICAgIGlmIChyb290Tm9kZSkge1xuICAgICAgICAgICAgcm9vdE5vZGUucmVtb3ZlRnJvbVBhcmVudCh0cnVlKTtcbiAgICAgICAgICAgIHJvb3ROb2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHJvb3ROb2RlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRyYXZlcnNlIGFsbCBib25lcyB0byBnZW5lcmF0ZSBhIHRyZWUgY29udGFpbmluZyBhbGwgYm9uZXMgbm9kZXMsIE5PVEUgdGhhdCBtYWtlIHN1cmUgdGhlIHNrZWxldG9uIGhhcyBpbml0aWFsaXplZCBiZWZvcmUgY2FsbGluZyB0aGlzIGludGVyZmFjZS5cbiAgICAgKiAhI3poIOmBjeWOhuaJgOacieaPkuanve+8jOeUn+aIkOWMheWQq+aJgOacieaPkuanveeahOiKgueCueagke+8jOazqOaEj++8jOiwg+eUqOivpeaOpeWPo+WJjeivt+ehruS/nemqqOmqvOWKqOeUu+W3sue7j+WIneWni+WMluWlveOAglxuICAgICAqIEBtZXRob2QgZ2VuZXJhdGVBbGxBdHRhY2hlZE5vZGVzXG4gICAgICogQHJldHVybiB7Y2MuTm9kZX0gcm9vdCBub2RlXG4gICAgICovXG4gICAgZ2VuZXJhdGVBbGxBdHRhY2hlZE5vZGVzICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0ZWQpIHJldHVybjtcblxuICAgICAgICAvLyBjbGVhciBhbGwgcmVjb3Jkc1xuICAgICAgICB0aGlzLl9ib25lSW5kZXhUb05vZGUgPSB7fTtcbiAgICAgICAgdGhpcy5fYXR0YWNoZWROb2RlQXJyYXkubGVuZ3RoID0gMDtcblxuICAgICAgICBsZXQgcm9vdE5vZGUgPSB0aGlzLl9wcmVwYXJlQXR0YWNoTm9kZSgpO1xuICAgICAgICBpZiAoIXJvb3ROb2RlKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGJvbmVJbmRleCA9IDA7XG4gICAgICAgIGxldCBhdHRhY2hlZFRyYXZlcnNlID0gZnVuY3Rpb24gKGFybWF0dXJlKSB7XG4gICAgICAgICAgICBpZiAoIWFybWF0dXJlKSByZXR1cm47XG5cbiAgICAgICAgICAgIGxldCBzdWJBcm1hdHVyZVBhcmVudE5vZGUgPSByb290Tm9kZTtcbiAgICAgICAgICAgIGlmIChhcm1hdHVyZS5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50U2xvdCA9IGFybWF0dXJlLnBhcmVudDtcbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50Qm9uZSA9IHBhcmVudFNsb3QucGFyZW50O1xuICAgICAgICAgICAgICAgIHN1YkFybWF0dXJlUGFyZW50Tm9kZSA9IHBhcmVudEJvbmUuX2F0dGFjaGVkTm9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGJvbmVzID0gYXJtYXR1cmUuZ2V0Qm9uZXMoKSwgYm9uZTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDAsIGwgPSBib25lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY3VyQm9uZUluZGV4ID0gYm9uZUluZGV4Kys7XG4gICAgICAgICAgICAgICAgYm9uZSA9IGJvbmVzW2ldO1xuICAgICAgICAgICAgICAgIGJvbmUuX2F0dGFjaGVkTm9kZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKGJvbmUucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGUgPSBib25lLnBhcmVudC5fYXR0YWNoZWROb2RlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGUgPSBzdWJBcm1hdHVyZVBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJvbmVOb2RlID0gcGFyZW50Tm9kZS5nZXRDaGlsZEJ5TmFtZShBVFRBQ0hFRF9QUkVfTkFNRSArIGJvbmUubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghYm9uZU5vZGUgfHwgIWJvbmVOb2RlLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvbmVOb2RlID0gdGhpcy5fYnVpbGRCb25lQXR0YWNoZWROb2RlKGJvbmUsIGN1ckJvbmVJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlLmFkZENoaWxkKGJvbmVOb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1aWxkQm9uZVJlbGF0aW9uKGJvbmVOb2RlLCBib25lLCBjdXJCb25lSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJvbmVOb2RlLl9yb290Tm9kZSA9IHN1YkFybWF0dXJlUGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgYm9uZS5fYXR0YWNoZWROb2RlID0gYm9uZU5vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc2xvdHMgPSBhcm1hdHVyZS5nZXRTbG90cygpLCBzbG90O1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzbG90cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzbG90ID0gc2xvdHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHNsb3QuY2hpbGRBcm1hdHVyZSkge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2hlZFRyYXZlcnNlKHNsb3QuY2hpbGRBcm1hdHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcyk7XG4gICAgICAgIGF0dGFjaGVkVHJhdmVyc2UodGhpcy5fYXJtYXR1cmUpO1xuICAgICAgICByZXR1cm4gcm9vdE5vZGU7XG4gICAgfSxcblxuICAgIF9oYXNBdHRhY2hlZE5vZGUgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGxldCBhdHRhY2hlZFJvb3ROb2RlID0gdGhpcy5fYXJtYXR1cmVOb2RlLmdldENoaWxkQnlOYW1lKEFUVEFDSEVEX1JPT1RfTkFNRSk7XG4gICAgICAgIHJldHVybiAhIWF0dGFjaGVkUm9vdE5vZGU7XG4gICAgfSxcblxuICAgIF9hc3NvY2lhdGVBdHRhY2hlZE5vZGUgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCByb290Tm9kZSA9IHRoaXMuX2FybWF0dXJlTm9kZS5nZXRDaGlsZEJ5TmFtZShBVFRBQ0hFRF9ST09UX05BTUUpO1xuICAgICAgICBpZiAoIXJvb3ROb2RlIHx8ICFyb290Tm9kZS5pc1ZhbGlkKSByZXR1cm47XG4gICAgICAgIHRoaXMuX2F0dGFjaGVkUm9vdE5vZGUgPSByb290Tm9kZTtcblxuICAgICAgICAvLyBjbGVhciBhbGwgcmVjb3Jkc1xuICAgICAgICB0aGlzLl9ib25lSW5kZXhUb05vZGUgPSB7fTtcbiAgICAgICAgbGV0IG5vZGVBcnJheSA9IHRoaXMuX2F0dGFjaGVkTm9kZUFycmF5O1xuICAgICAgICBub2RlQXJyYXkubGVuZ3RoID0gMDtcblxuICAgICAgICBsZXQgYXJtYXR1cmUgPSB0aGlzLl9hcm1hdHVyZTtcbiAgICAgICAgaWYgKCFhcm1hdHVyZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGltaXROb2RlKHJvb3ROb2RlKTtcblxuICAgICAgICBpZiAoIUNDX05BVElWRVJFTkRFUkVSKSB7XG4gICAgICAgICAgICBsZXQgaXNDYWNoZWQgPSB0aGlzLl9hcm1hdHVyZURpc3BsYXkuaXNBbmltYXRpb25DYWNoZWQoKTtcbiAgICAgICAgICAgIGlmIChpc0NhY2hlZCAmJiB0aGlzLl9hcm1hdHVyZURpc3BsYXkuX2ZyYW1lQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkuX2ZyYW1lQ2FjaGUuZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBib25lSW5kZXggPSAwO1xuICAgICAgICBsZXQgYXR0YWNoZWRUcmF2ZXJzZSA9IGZ1bmN0aW9uIChhcm1hdHVyZSkge1xuICAgICAgICAgICAgaWYgKCFhcm1hdHVyZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBsZXQgc3ViQXJtYXR1cmVQYXJlbnROb2RlID0gcm9vdE5vZGU7XG4gICAgICAgICAgICBpZiAoYXJtYXR1cmUucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudFNsb3QgPSBhcm1hdHVyZS5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudEJvbmUgPSBwYXJlbnRTbG90LnBhcmVudDtcbiAgICAgICAgICAgICAgICBzdWJBcm1hdHVyZVBhcmVudE5vZGUgPSBwYXJlbnRCb25lLl9hdHRhY2hlZE5vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBib25lcyA9IGFybWF0dXJlLmdldEJvbmVzKCksIGJvbmU7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwLCBsID0gYm9uZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1ckJvbmVJbmRleCA9IGJvbmVJbmRleCsrO1xuICAgICAgICAgICAgICAgIGJvbmUgPSBib25lc1tpXTtcbiAgICAgICAgICAgICAgICBib25lLl9hdHRhY2hlZE5vZGUgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudE5vZGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChib25lLnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlID0gYm9uZS5wYXJlbnQuX2F0dGFjaGVkTm9kZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlID0gc3ViQXJtYXR1cmVQYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBib25lTm9kZSA9IHBhcmVudE5vZGUuZ2V0Q2hpbGRCeU5hbWUoQVRUQUNIRURfUFJFX05BTUUgKyBib25lLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYm9uZU5vZGUgJiYgYm9uZU5vZGUuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVpbGRCb25lUmVsYXRpb24oYm9uZU5vZGUsIGJvbmUsIGN1ckJvbmVJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBib25lTm9kZS5fcm9vdE5vZGUgPSBzdWJBcm1hdHVyZVBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBib25lLl9hdHRhY2hlZE5vZGUgPSBib25lTm9kZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHNsb3RzID0gYXJtYXR1cmUuZ2V0U2xvdHMoKSwgc2xvdDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gc2xvdHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc2xvdCA9IHNsb3RzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChzbG90LmNoaWxkQXJtYXR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoZWRUcmF2ZXJzZShzbG90LmNoaWxkQXJtYXR1cmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuICAgICAgICBhdHRhY2hlZFRyYXZlcnNlKGFybWF0dXJlKTtcbiAgICB9LFxuXG4gICAgX3N5bmNBdHRhY2hlZE5vZGUgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCByb290Tm9kZSA9IHRoaXMuX2F0dGFjaGVkUm9vdE5vZGU7XG4gICAgICAgIGxldCBub2RlQXJyYXkgPSB0aGlzLl9hdHRhY2hlZE5vZGVBcnJheTtcbiAgICAgICAgaWYgKCFyb290Tm9kZSB8fCAhcm9vdE5vZGUuaXNWYWxpZCkge1xuICAgICAgICAgICAgdGhpcy5fYXR0YWNoZWRSb290Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICBub2RlQXJyYXkubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHJvb3RNYXRyaXggPSB0aGlzLl9hcm1hdHVyZU5vZGUuX3dvcmxkTWF0cml4O1xuICAgICAgICBNYXQ0LmNvcHkocm9vdE5vZGUuX3dvcmxkTWF0cml4LCByb290TWF0cml4KTtcbiAgICAgICAgcm9vdE5vZGUuX3JlbmRlckZsYWcgJj0gfkZMQUdfVFJBTlNGT1JNO1xuXG4gICAgICAgIGxldCBib25lSW5mb3MgPSBudWxsO1xuICAgICAgICBsZXQgaXNDYWNoZWQgPSB0aGlzLl9hcm1hdHVyZURpc3BsYXkuaXNBbmltYXRpb25DYWNoZWQoKTtcbiAgICAgICAgaWYgKGlzQ2FjaGVkKSB7XG4gICAgICAgICAgICBib25lSW5mb3MgPSB0aGlzLl9hcm1hdHVyZURpc3BsYXkuX2N1ckZyYW1lICYmIHRoaXMuX2FybWF0dXJlRGlzcGxheS5fY3VyRnJhbWUuYm9uZUluZm9zO1xuICAgICAgICAgICAgaWYgKCFib25lSW5mb3MpIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtdWxNYXQgPSB0aGlzLl9hcm1hdHVyZU5vZGUuX211bE1hdDtcbiAgICAgICAgbGV0IG1hdHJpeEhhbmRsZSA9IGZ1bmN0aW9uIChub2RlTWF0LCBwYXJlbnRNYXQsIGJvbmVNYXQpIHtcbiAgICAgICAgICAgIGxldCB0bSA9IF90ZW1wTWF0NC5tO1xuICAgICAgICAgICAgdG1bMF0gPSBib25lTWF0LmE7XG4gICAgICAgICAgICB0bVsxXSA9IGJvbmVNYXQuYjtcbiAgICAgICAgICAgIHRtWzRdID0gLWJvbmVNYXQuYztcbiAgICAgICAgICAgIHRtWzVdID0gLWJvbmVNYXQuZDtcbiAgICAgICAgICAgIHRtWzEyXSA9IGJvbmVNYXQudHg7XG4gICAgICAgICAgICB0bVsxM10gPSBib25lTWF0LnR5O1xuICAgICAgICAgICAgbXVsTWF0KG5vZGVNYXQsIHBhcmVudE1hdCwgX3RlbXBNYXQ0KTtcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgbm9kZUFycmF5RGlydHkgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBub2RlQXJyYXkubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYm9uZU5vZGUgPSBub2RlQXJyYXlbaV07XG4gICAgICAgICAgICAvLyBOb2RlIGhhcyBiZWVuIGRlc3Ryb3lcbiAgICAgICAgICAgIGlmICghYm9uZU5vZGUgfHwgIWJvbmVOb2RlLmlzVmFsaWQpIHsgXG4gICAgICAgICAgICAgICAgbm9kZUFycmF5W2ldID0gbnVsbDtcbiAgICAgICAgICAgICAgICBub2RlQXJyYXlEaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgYm9uZSA9IGlzQ2FjaGVkID8gYm9uZUluZm9zW2JvbmVOb2RlLl9ib25lSW5kZXhdIDogYm9uZU5vZGUuX2JvbmU7XG4gICAgICAgICAgICAvLyBCb25lIGhhcyBiZWVuIGRlc3Ryb3lcbiAgICAgICAgICAgIGlmICghYm9uZSB8fCBib25lLl9pc0luUG9vbCkge1xuICAgICAgICAgICAgICAgIGJvbmVOb2RlLnJlbW92ZUZyb21QYXJlbnQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgYm9uZU5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIG5vZGVBcnJheVtpXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgbm9kZUFycmF5RGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0cml4SGFuZGxlKGJvbmVOb2RlLl93b3JsZE1hdHJpeCwgYm9uZU5vZGUuX3Jvb3ROb2RlLl93b3JsZE1hdHJpeCwgYm9uZS5nbG9iYWxUcmFuc2Zvcm1NYXRyaXgpO1xuICAgICAgICAgICAgYm9uZU5vZGUuX3JlbmRlckZsYWcgJj0gfkZMQUdfVFJBTlNGT1JNO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlQXJyYXlEaXJ0eSkge1xuICAgICAgICAgICAgdGhpcy5fcmVidWlsZE5vZGVBcnJheSgpO1xuICAgICAgICB9XG4gICAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRyYWdvbkJvbmVzLkF0dGFjaFV0aWwgPSBBdHRhY2hVdGlsOyJdLCJzb3VyY2VSb290IjoiLyJ9