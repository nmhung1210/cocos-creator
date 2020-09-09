
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/spine/AttachUtil.js';
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
 * @module sp
 */

/**
 * !#en Attach node tool
 * !#zh 挂点工具类
 * @class sp.AttachUtil
 */


var AttachUtil = cc.Class({
  name: 'sp.AttachUtil',
  ctor: function ctor() {
    this._inited = false;
    this._skeleton = null;
    this._skeletonNode = null;
    this._skeletonComp = null;
    this._attachedRootNode = null;
    this._attachedNodeArray = [];
    this._boneIndexToNode = {};
  },
  init: function init(skeletonComp) {
    this._inited = true;
    this._skeleton = skeletonComp._skeleton;
    this._skeletonNode = skeletonComp.node;
    this._skeletonComp = skeletonComp;
  },
  reset: function reset() {
    this._inited = false;
    this._skeleton = null;
    this._skeletonNode = null;
    this._skeletonComp = null;
  },
  _prepareAttachNode: function _prepareAttachNode() {
    var armature = this._skeleton;

    if (!armature) {
      return;
    }

    var rootNode = this._skeletonNode.getChildByName(ATTACHED_ROOT_NAME);

    if (!rootNode || !rootNode.isValid) {
      rootNode = new cc.Node(ATTACHED_ROOT_NAME);
      limitNode(rootNode);

      this._skeletonNode.addChild(rootNode);
    }

    var isCached = this._skeletonComp.isAnimationCached();

    if (isCached && this._skeletonComp._frameCache) {
      this._skeletonComp._frameCache.enableCacheAttachedInfo();
    }

    this._attachedRootNode = rootNode;
    return rootNode;
  },
  _buildBoneAttachedNode: function _buildBoneAttachedNode(bone, boneIndex) {
    var boneNodeName = ATTACHED_PRE_NAME + bone.data.name;
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
    var res = [];
    var bones = this._skeleton.bones;

    for (var i = 0, n = bones.length; i < n; i++) {
      var bone = bones[i];
      var boneData = bone.data;

      if (boneData.name == boneName) {
        res.push(bone);
      }
    }

    var buildBoneTree = function (bone) {
      if (!bone) return;
      var boneData = bone.data;

      var boneNode = this._getNodeByBoneIndex(boneData.index);

      if (boneNode) return boneNode;
      boneNode = this._buildBoneAttachedNode(bone, boneData.index);
      var parentBoneNode = buildBoneTree(bone.parent) || rootNode;
      boneNode.parent = parentBoneNode;
      return boneNode;
    }.bind(this);

    for (var _i = 0, _n = res.length; _i < _n; _i++) {
      var targetNode = buildBoneTree(res[_i]);
      targetNodes.push(targetNode);
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

    var rootNode = this._skeletonNode.getChildByName(ATTACHED_ROOT_NAME);

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
    var bones = this._skeleton.bones;

    for (var i = 0, n = bones.length; i < n; i++) {
      var bone = bones[i];
      var boneData = bone.data;
      var parentNode = null;

      if (bone.parent) {
        var parentIndex = bone.parent.data.index;
        parentNode = this._boneIndexToNode[parentIndex];
      } else {
        parentNode = rootNode;
      }

      if (parentNode) {
        var boneNode = parentNode.getChildByName(ATTACHED_PRE_NAME + boneData.name);

        if (!boneNode || !boneNode.isValid) {
          boneNode = this._buildBoneAttachedNode(bone, boneData.index);
          parentNode.addChild(boneNode);
        } else {
          this._buildBoneRelation(boneNode, bone, boneData.index);
        }
      }
    }

    return rootNode;
  },
  _hasAttachedNode: function _hasAttachedNode() {
    if (!this._inited) return false;

    var attachedRootNode = this._skeletonNode.getChildByName(ATTACHED_ROOT_NAME);

    return !!attachedRootNode;
  },
  _associateAttachedNode: function _associateAttachedNode() {
    if (!this._inited) return;

    var rootNode = this._skeletonNode.getChildByName(ATTACHED_ROOT_NAME);

    if (!rootNode || !rootNode.isValid) return;
    this._attachedRootNode = rootNode; // clear all records

    this._boneIndexToNode = {};
    var nodeArray = this._attachedNodeArray;
    nodeArray.length = 0;
    limitNode(rootNode);

    if (!CC_NATIVERENDERER) {
      var isCached = this._skeletonComp.isAnimationCached();

      if (isCached && this._skeletonComp._frameCache) {
        this._skeletonComp._frameCache.enableCacheAttachedInfo();
      }
    }

    var bones = this._skeleton.bones;

    for (var i = 0, n = bones.length; i < n; i++) {
      var bone = bones[i];
      var boneData = bone.data;
      var parentNode = null;

      if (bone.parent) {
        var parentIndex = bone.parent.data.index;
        parentNode = this._boneIndexToNode[parentIndex];
      } else {
        parentNode = rootNode;
      }

      if (parentNode) {
        var boneNode = parentNode.getChildByName(ATTACHED_PRE_NAME + boneData.name);

        if (boneNode && boneNode.isValid) {
          this._buildBoneRelation(boneNode, bone, boneData.index);
        }
      }
    }
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

    var rootMatrix = this._skeletonNode._worldMatrix;

    _mat["default"].copy(rootNode._worldMatrix, rootMatrix);

    rootNode._renderFlag &= ~FLAG_TRANSFORM;
    var boneInfos = null;

    var isCached = this._skeletonComp.isAnimationCached();

    if (isCached) {
      boneInfos = this._skeletonComp._curFrame && this._skeletonComp._curFrame.boneInfos;
    } else {
      boneInfos = this._skeleton.bones;
    }

    if (!boneInfos) return;
    var mulMat = this._skeletonNode._mulMat;

    var matrixHandle = function matrixHandle(nodeMat, parentMat, bone) {
      var tm = _tempMat4.m;
      tm[0] = bone.a;
      tm[1] = bone.c;
      tm[4] = bone.b;
      tm[5] = bone.d;
      tm[12] = bone.worldX;
      tm[13] = bone.worldY;
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

      var bone = boneInfos[boneNode._boneIndex]; // Bone has been destroy

      if (!bone) {
        boneNode.removeFromParent(true);
        boneNode.destroy();
        nodeArray[i] = null;
        nodeArrayDirty = true;
        continue;
      }

      matrixHandle(boneNode._worldMatrix, rootNode._worldMatrix, bone);
      boneNode._renderFlag &= ~FLAG_TRANSFORM;
    }

    if (nodeArrayDirty) {
      this._rebuildNodeArray();
    }
  }
});
module.exports = sp.AttachUtil = AttachUtil;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvZXh0ZW5zaW9ucy9zcGluZS9BdHRhY2hVdGlsLmpzIl0sIm5hbWVzIjpbIlJlbmRlckZsb3ciLCJyZXF1aXJlIiwiRkxBR19UUkFOU0ZPUk0iLCJFbXB0eUhhbmRsZSIsIkFUVEFDSEVEX1JPT1RfTkFNRSIsIkFUVEFDSEVEX1BSRV9OQU1FIiwibGltaXROb2RlIiwibm9kZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJfY2FsY3VsV29ybGRNYXRyaXgiLCJfbXVsTWF0IiwiX3RlbXBNYXQ0IiwiTWF0NCIsIkF0dGFjaFV0aWwiLCJjYyIsIkNsYXNzIiwibmFtZSIsImN0b3IiLCJfaW5pdGVkIiwiX3NrZWxldG9uIiwiX3NrZWxldG9uTm9kZSIsIl9za2VsZXRvbkNvbXAiLCJfYXR0YWNoZWRSb290Tm9kZSIsIl9hdHRhY2hlZE5vZGVBcnJheSIsIl9ib25lSW5kZXhUb05vZGUiLCJpbml0Iiwic2tlbGV0b25Db21wIiwicmVzZXQiLCJfcHJlcGFyZUF0dGFjaE5vZGUiLCJhcm1hdHVyZSIsInJvb3ROb2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJpc1ZhbGlkIiwiTm9kZSIsImFkZENoaWxkIiwiaXNDYWNoZWQiLCJpc0FuaW1hdGlvbkNhY2hlZCIsIl9mcmFtZUNhY2hlIiwiZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8iLCJfYnVpbGRCb25lQXR0YWNoZWROb2RlIiwiYm9uZSIsImJvbmVJbmRleCIsImJvbmVOb2RlTmFtZSIsImRhdGEiLCJib25lTm9kZSIsIl9idWlsZEJvbmVSZWxhdGlvbiIsIl9ib25lIiwiX2JvbmVJbmRleCIsInB1c2giLCJnZXRBdHRhY2hlZFJvb3ROb2RlIiwiZ2V0QXR0YWNoZWROb2RlcyIsImJvbmVOYW1lIiwibm9kZUFycmF5IiwicmVzIiwiaSIsIm4iLCJsZW5ndGgiLCJfcmVidWlsZE5vZGVBcnJheSIsImZpbmRNYXAiLCJvbGROb2RlQXJyYXkiLCJfdG9SZW1vdmUiLCJfc29ydE5vZGVBcnJheSIsInNvcnQiLCJhIiwiYiIsIl9nZXROb2RlQnlCb25lSW5kZXgiLCJkZXN0cm95QXR0YWNoZWROb2RlcyIsIm1hcmtUcmVlIiwiY2hpbGRyZW4iLCJjIiwiZGVsTmFtZSIsInNwbGl0IiwicmVtb3ZlRnJvbVBhcmVudCIsImRlc3Ryb3kiLCJnZW5lcmF0ZUF0dGFjaGVkTm9kZXMiLCJ0YXJnZXROb2RlcyIsImJvbmVzIiwiYm9uZURhdGEiLCJidWlsZEJvbmVUcmVlIiwiaW5kZXgiLCJwYXJlbnRCb25lTm9kZSIsInBhcmVudCIsImJpbmQiLCJ0YXJnZXROb2RlIiwiZGVzdHJveUFsbEF0dGFjaGVkTm9kZXMiLCJnZW5lcmF0ZUFsbEF0dGFjaGVkTm9kZXMiLCJwYXJlbnROb2RlIiwicGFyZW50SW5kZXgiLCJfaGFzQXR0YWNoZWROb2RlIiwiYXR0YWNoZWRSb290Tm9kZSIsIl9hc3NvY2lhdGVBdHRhY2hlZE5vZGUiLCJDQ19OQVRJVkVSRU5ERVJFUiIsIl9zeW5jQXR0YWNoZWROb2RlIiwicm9vdE1hdHJpeCIsIl93b3JsZE1hdHJpeCIsImNvcHkiLCJfcmVuZGVyRmxhZyIsImJvbmVJbmZvcyIsIl9jdXJGcmFtZSIsIm11bE1hdCIsIm1hdHJpeEhhbmRsZSIsIm5vZGVNYXQiLCJwYXJlbnRNYXQiLCJ0bSIsIm0iLCJkIiwid29ybGRYIiwid29ybGRZIiwibm9kZUFycmF5RGlydHkiLCJtb2R1bGUiLCJleHBvcnRzIiwic3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUF5QkE7Ozs7QUF6QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFNQSxVQUFVLEdBQUdDLE9BQU8sQ0FBQyx5Q0FBRCxDQUExQjs7QUFDQSxJQUFNQyxjQUFjLEdBQUdGLFVBQVUsQ0FBQ0UsY0FBbEM7O0FBQ0EsSUFBTUMsV0FBVyxHQUFHLFNBQWRBLFdBQWMsR0FBWSxDQUFFLENBQWxDOztBQUNBLElBQU1DLGtCQUFrQixHQUFHLG9CQUEzQjtBQUNBLElBQU1DLGlCQUFpQixH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Q1AsSUFBTCxFQUFXO0FBQ1BJLFFBQUFBLFFBQVEsQ0FBQzRCLGdCQUFULENBQTBCLElBQTFCO0FBQ0E1QixRQUFBQSxRQUFRLENBQUM2QixPQUFUO0FBQ0FyQixRQUFBQSxTQUFTLENBQUNFLENBQUQsQ0FBVCxHQUFlLElBQWY7QUFDQXNELFFBQUFBLGNBQWMsR0FBRyxJQUFqQjtBQUNBO0FBQ0g7O0FBQ0RSLE1BQUFBLFlBQVksQ0FBQ3hELFFBQVEsQ0FBQ2tELFlBQVYsRUFBd0JoRSxRQUFRLENBQUNnRSxZQUFqQyxFQUErQ3RELElBQS9DLENBQVo7QUFDQUksTUFBQUEsUUFBUSxDQUFDb0QsV0FBVCxJQUF3QixDQUFDbEcsY0FBekI7QUFDSDs7QUFDRCxRQUFJOEcsY0FBSixFQUFvQjtBQUNoQixXQUFLbkQsaUJBQUw7QUFDSDtBQUNKO0FBclhxQixDQUFULENBQWpCO0FBd1hBb0QsTUFBTSxDQUFDQyxPQUFQLEdBQWlCQyxFQUFFLENBQUNsRyxVQUFILEdBQWdCQSxVQUFqQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgTWF0NCBmcm9tICcuLi8uLi9jb2NvczJkL2NvcmUvdmFsdWUtdHlwZXMvbWF0NCc7XG5jb25zdCBSZW5kZXJGbG93ID0gcmVxdWlyZSgnLi4vLi4vY29jb3MyZC9jb3JlL3JlbmRlcmVyL3JlbmRlci1mbG93Jyk7XG5jb25zdCBGTEFHX1RSQU5TRk9STSA9IFJlbmRlckZsb3cuRkxBR19UUkFOU0ZPUk07XG5jb25zdCBFbXB0eUhhbmRsZSA9IGZ1bmN0aW9uICgpIHt9XG5jb25zdCBBVFRBQ0hFRF9ST09UX05BTUUgPSAnQVRUQUNIRURfTk9ERV9UUkVFJztcbmNvbnN0IEFUVEFDSEVEX1BSRV9OQU1FID0gJ0FUVEFDSEVEX05PREU6JztcbmNvbnN0IGxpbWl0Tm9kZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgLy8gYXR0YWNoZWQgbm9kZSdzIHdvcmxkIG1hdHJpeCB1cGRhdGUgcGVyIGZyYW1lXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5vZGUsICdfd29ybGRNYXREaXJ0eScsIHtcbiAgICAgICAgZ2V0ICgpIHsgcmV0dXJuIHRydWU7IH0sXG4gICAgICAgIHNldCAodmFsdWUpIHsvKiBkbyBub3RoaW5nICovfVxuICAgIH0pO1xuICAgIC8vIHNoaWVsZCB3b3JsZCBtYXRyaXggY2FsY3VsYXRlIGludGVyZmFjZVxuICAgIG5vZGUuX2NhbGN1bFdvcmxkTWF0cml4ID0gRW1wdHlIYW5kbGU7XG4gICAgbm9kZS5fbXVsTWF0ID0gRW1wdHlIYW5kbGU7XG59O1xubGV0IF90ZW1wTWF0NCA9IG5ldyBNYXQ0KCk7XG5cbi8qKlxuICogQG1vZHVsZSBzcFxuICovXG5cbi8qKlxuICogISNlbiBBdHRhY2ggbm9kZSB0b29sXG4gKiAhI3poIOaMgueCueW3peWFt+exu1xuICogQGNsYXNzIHNwLkF0dGFjaFV0aWxcbiAqL1xubGV0IEF0dGFjaFV0aWwgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ3NwLkF0dGFjaFV0aWwnLFxuXG4gICAgY3RvciAoKSB7XG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9za2VsZXRvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NrZWxldG9uTm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NrZWxldG9uQ29tcCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fYXR0YWNoZWRSb290Tm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2F0dGFjaGVkTm9kZUFycmF5ID0gW107XG4gICAgICAgIHRoaXMuX2JvbmVJbmRleFRvTm9kZSA9IHt9O1xuICAgIH0sXG5cbiAgICBpbml0IChza2VsZXRvbkNvbXApIHtcbiAgICAgICAgdGhpcy5faW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fc2tlbGV0b24gPSBza2VsZXRvbkNvbXAuX3NrZWxldG9uO1xuICAgICAgICB0aGlzLl9za2VsZXRvbk5vZGUgPSBza2VsZXRvbkNvbXAubm9kZTtcbiAgICAgICAgdGhpcy5fc2tlbGV0b25Db21wID0gc2tlbGV0b25Db21wO1xuICAgIH0sXG5cbiAgICByZXNldCAoKSB7XG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9za2VsZXRvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NrZWxldG9uTm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NrZWxldG9uQ29tcCA9IG51bGw7XG4gICAgfSxcblxuICAgIF9wcmVwYXJlQXR0YWNoTm9kZSAoKSB7XG4gICAgICAgIGxldCBhcm1hdHVyZSA9IHRoaXMuX3NrZWxldG9uO1xuICAgICAgICBpZiAoIWFybWF0dXJlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcm9vdE5vZGUgPSB0aGlzLl9za2VsZXRvbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoQVRUQUNIRURfUk9PVF9OQU1FKTtcbiAgICAgICAgaWYgKCFyb290Tm9kZSB8fCAhcm9vdE5vZGUuaXNWYWxpZCkge1xuICAgICAgICAgICAgcm9vdE5vZGUgPSBuZXcgY2MuTm9kZShBVFRBQ0hFRF9ST09UX05BTUUpO1xuICAgICAgICAgICAgbGltaXROb2RlKHJvb3ROb2RlKTtcbiAgICAgICAgICAgIHRoaXMuX3NrZWxldG9uTm9kZS5hZGRDaGlsZChyb290Tm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaXNDYWNoZWQgPSB0aGlzLl9za2VsZXRvbkNvbXAuaXNBbmltYXRpb25DYWNoZWQoKTtcbiAgICAgICAgaWYgKGlzQ2FjaGVkICYmIHRoaXMuX3NrZWxldG9uQ29tcC5fZnJhbWVDYWNoZSkge1xuICAgICAgICAgICAgdGhpcy5fc2tlbGV0b25Db21wLl9mcmFtZUNhY2hlLmVuYWJsZUNhY2hlQXR0YWNoZWRJbmZvKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9hdHRhY2hlZFJvb3ROb2RlID0gcm9vdE5vZGU7XG4gICAgICAgIHJldHVybiByb290Tm9kZTtcbiAgICB9LFxuXG4gICAgX2J1aWxkQm9uZUF0dGFjaGVkTm9kZSAoYm9uZSwgYm9uZUluZGV4KSB7XG4gICAgICAgIGxldCBib25lTm9kZU5hbWUgPSBBVFRBQ0hFRF9QUkVfTkFNRSArIGJvbmUuZGF0YS5uYW1lO1xuICAgICAgICBsZXQgYm9uZU5vZGUgPSBuZXcgY2MuTm9kZShib25lTm9kZU5hbWUpO1xuICAgICAgICB0aGlzLl9idWlsZEJvbmVSZWxhdGlvbihib25lTm9kZSwgYm9uZSwgYm9uZUluZGV4KTtcbiAgICAgICAgcmV0dXJuIGJvbmVOb2RlO1xuICAgIH0sXG5cbiAgICBfYnVpbGRCb25lUmVsYXRpb24gKGJvbmVOb2RlLCBib25lLCBib25lSW5kZXgpIHtcbiAgICAgICAgbGltaXROb2RlKGJvbmVOb2RlKTtcbiAgICAgICAgYm9uZU5vZGUuX2JvbmUgPSBib25lO1xuICAgICAgICBib25lTm9kZS5fYm9uZUluZGV4ID0gYm9uZUluZGV4O1xuICAgICAgICB0aGlzLl9hdHRhY2hlZE5vZGVBcnJheS5wdXNoKGJvbmVOb2RlKTtcbiAgICAgICAgdGhpcy5fYm9uZUluZGV4VG9Ob2RlW2JvbmVJbmRleF0gPSBib25lTm9kZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXRzIGF0dGFjaGVkIHJvb3Qgbm9kZS5cbiAgICAgKiAhI3poIOiOt+WPluaMguaOpeiKgueCueagkeeahOagueiKgueCuVxuICAgICAqIEBtZXRob2QgZ2V0QXR0YWNoZWRSb290Tm9kZVxuICAgICAqIEByZXR1cm4ge2NjLk5vZGV9XG4gICAgICovXG4gICAgZ2V0QXR0YWNoZWRSb290Tm9kZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdHRhY2hlZFJvb3ROb2RlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHMgYXR0YWNoZWQgbm9kZSB3aGljaCB5b3Ugd2FudC5cbiAgICAgKiAhI3poIOiOt+W+l+WvueW6lOeahOaMgueCuVxuICAgICAqIEBtZXRob2QgZ2V0QXR0YWNoZWROb2Rlc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBib25lTmFtZVxuICAgICAqIEByZXR1cm4ge05vZGVbXX1cbiAgICAgKi9cbiAgICBnZXRBdHRhY2hlZE5vZGVzIChib25lTmFtZSkge1xuICAgICAgICBsZXQgbm9kZUFycmF5ID0gdGhpcy5fYXR0YWNoZWROb2RlQXJyYXk7XG4gICAgICAgIGxldCByZXMgPSBbXTtcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0ZWQpIHJldHVybiByZXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gbm9kZUFycmF5Lmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgbGV0IGJvbmVOb2RlID0gbm9kZUFycmF5W2ldO1xuICAgICAgICAgICAgaWYgKCFib25lTm9kZSB8fCAhYm9uZU5vZGUuaXNWYWxpZCkgY29udGludWU7XG4gICAgICAgICAgICBpZiAoYm9uZU5vZGUubmFtZSA9PT0gQVRUQUNIRURfUFJFX05BTUUgKyBib25lTmFtZSkge1xuICAgICAgICAgICAgICAgIHJlcy5wdXNoKGJvbmVOb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH0sXG5cbiAgICBfcmVidWlsZE5vZGVBcnJheSAoKSB7XG4gICAgICAgIGxldCBmaW5kTWFwID0gdGhpcy5fYm9uZUluZGV4VG9Ob2RlID0ge307XG4gICAgICAgIGxldCBvbGROb2RlQXJyYXkgPSB0aGlzLl9hdHRhY2hlZE5vZGVBcnJheTtcbiAgICAgICAgbGV0IG5vZGVBcnJheSA9IHRoaXMuX2F0dGFjaGVkTm9kZUFycmF5ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gb2xkTm9kZUFycmF5Lmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgbGV0IGJvbmVOb2RlID0gb2xkTm9kZUFycmF5W2ldO1xuICAgICAgICAgICAgaWYgKCFib25lTm9kZSB8fCAhYm9uZU5vZGUuaXNWYWxpZCB8fCBib25lTm9kZS5fdG9SZW1vdmUpIGNvbnRpbnVlO1xuICAgICAgICAgICAgbm9kZUFycmF5LnB1c2goYm9uZU5vZGUpO1xuICAgICAgICAgICAgZmluZE1hcFtib25lTm9kZS5fYm9uZUluZGV4XSA9IGJvbmVOb2RlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9zb3J0Tm9kZUFycmF5ICgpIHtcbiAgICAgICAgbGV0IG5vZGVBcnJheSA9IHRoaXMuX2F0dGFjaGVkTm9kZUFycmF5O1xuICAgICAgICBub2RlQXJyYXkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEuX2JvbmVJbmRleCA8IGIuX2JvbmVJbmRleD8gLTEgOiAxO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgX2dldE5vZGVCeUJvbmVJbmRleCAoYm9uZUluZGV4KSB7XG4gICAgICAgIGxldCBmaW5kTWFwID0gdGhpcy5fYm9uZUluZGV4VG9Ob2RlO1xuICAgICAgICBsZXQgYm9uZU5vZGUgPSBmaW5kTWFwW2JvbmVJbmRleF07XG4gICAgICAgIGlmICghYm9uZU5vZGUgfHwgIWJvbmVOb2RlLmlzVmFsaWQpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gYm9uZU5vZGU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gRGVzdHJveSBhdHRhY2hlZCBub2RlIHdoaWNoIHlvdSB3YW50LlxuICAgICAqICEjemgg6ZSA5q+B5a+55bqU55qE5oyC54K5XG4gICAgICogQG1ldGhvZCBkZXN0cm95QXR0YWNoZWROb2Rlc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBib25lTmFtZVxuICAgICAqL1xuICAgIGRlc3Ryb3lBdHRhY2hlZE5vZGVzIChib25lTmFtZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBub2RlQXJyYXkgPSB0aGlzLl9hdHRhY2hlZE5vZGVBcnJheTtcbiAgICAgICAgbGV0IG1hcmtUcmVlID0gZnVuY3Rpb24gKHJvb3ROb2RlKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSByb290Tm9kZS5jaGlsZHJlbjtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGMgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBpZiAoYykgbWFya1RyZWUoYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb290Tm9kZS5fdG9SZW1vdmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBub2RlQXJyYXkubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYm9uZU5vZGUgPSBub2RlQXJyYXlbaV07XG4gICAgICAgICAgICBpZiAoIWJvbmVOb2RlIHx8ICFib25lTm9kZS5pc1ZhbGlkKSBjb250aW51ZTtcblxuICAgICAgICAgICAgbGV0IGRlbE5hbWUgPSBib25lTm9kZS5uYW1lLnNwbGl0KEFUVEFDSEVEX1BSRV9OQU1FKVsxXTtcbiAgICAgICAgICAgIGlmIChkZWxOYW1lID09PSBib25lTmFtZSkge1xuICAgICAgICAgICAgICAgIG1hcmtUcmVlKGJvbmVOb2RlKTtcbiAgICAgICAgICAgICAgICBib25lTm9kZS5yZW1vdmVGcm9tUGFyZW50KHRydWUpO1xuICAgICAgICAgICAgICAgIGJvbmVOb2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBub2RlQXJyYXlbaV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcmVidWlsZE5vZGVBcnJheSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRyYXZlcnNlIGFsbCBib25lcyB0byBnZW5lcmF0ZSB0aGUgbWluaW11bSBub2RlIHRyZWUgY29udGFpbmluZyB0aGUgZ2l2ZW4gYm9uZSBuYW1lcywgTk9URSB0aGF0IG1ha2Ugc3VyZSB0aGUgc2tlbGV0b24gaGFzIGluaXRpYWxpemVkIGJlZm9yZSBjYWxsaW5nIHRoaXMgaW50ZXJmYWNlLlxuICAgICAqICEjemgg6YGN5Y6G5omA5pyJ5o+S5qe977yM55Sf5oiQ5YyF5ZCr5omA5pyJ57uZ5a6a5o+S5qe95ZCN56ew55qE5pyA5bCP6IqC54K55qCR77yM5rOo5oSP77yM6LCD55So6K+l5o6l5Y+j5YmN6K+356Gu5L+d6aqo6aq85Yqo55S75bey57uP5Yid5aeL5YyW5aW944CCXG4gICAgICogQG1ldGhvZCBnZW5lcmF0ZUF0dGFjaGVkTm9kZXNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYm9uZU5hbWVcbiAgICAgKiBAcmV0dXJuIHtOb2RlW119IGF0dGFjaGVkIG5vZGUgYXJyYXlcbiAgICAgKi9cbiAgICBnZW5lcmF0ZUF0dGFjaGVkTm9kZXMgKGJvbmVOYW1lKSB7XG4gICAgICAgIGxldCB0YXJnZXROb2RlcyA9IFtdO1xuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuIHRhcmdldE5vZGVzO1xuXG4gICAgICAgIGxldCByb290Tm9kZSA9IHRoaXMuX3ByZXBhcmVBdHRhY2hOb2RlKCk7XG4gICAgICAgIGlmICghcm9vdE5vZGUpIHJldHVybiB0YXJnZXROb2RlcztcblxuICAgICAgICBsZXQgcmVzID0gW107XG4gICAgICAgIGxldCBib25lcyA9IHRoaXMuX3NrZWxldG9uLmJvbmVzO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IGJvbmVzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgbGV0IGJvbmUgPSBib25lc1tpXTtcbiAgICAgICAgICAgIGxldCBib25lRGF0YSA9IGJvbmUuZGF0YTtcbiAgICAgICAgICAgIGlmIChib25lRGF0YS5uYW1lID09IGJvbmVOYW1lKSB7XG4gICAgICAgICAgICAgICAgcmVzLnB1c2goYm9uZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYnVpbGRCb25lVHJlZSA9IGZ1bmN0aW9uIChib25lKSB7XG4gICAgICAgICAgICBpZiAoIWJvbmUpIHJldHVybjtcbiAgICAgICAgICAgIGxldCBib25lRGF0YSA9IGJvbmUuZGF0YTtcbiAgICAgICAgICAgIGxldCBib25lTm9kZSA9IHRoaXMuX2dldE5vZGVCeUJvbmVJbmRleChib25lRGF0YS5pbmRleCk7XG4gICAgICAgICAgICBpZiAoYm9uZU5vZGUpIHJldHVybiBib25lTm9kZTtcblxuICAgICAgICAgICAgYm9uZU5vZGUgPSB0aGlzLl9idWlsZEJvbmVBdHRhY2hlZE5vZGUoYm9uZSwgYm9uZURhdGEuaW5kZXgpO1xuXG4gICAgICAgICAgICBsZXQgcGFyZW50Qm9uZU5vZGUgPSBidWlsZEJvbmVUcmVlKGJvbmUucGFyZW50KSB8fCByb290Tm9kZTtcbiAgICAgICAgICAgIGJvbmVOb2RlLnBhcmVudCA9IHBhcmVudEJvbmVOb2RlO1xuXG4gICAgICAgICAgICByZXR1cm4gYm9uZU5vZGU7XG4gICAgICAgIH0uYmluZCh0aGlzKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IHJlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXROb2RlID0gYnVpbGRCb25lVHJlZShyZXNbaV0pO1xuICAgICAgICAgICAgdGFyZ2V0Tm9kZXMucHVzaCh0YXJnZXROb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NvcnROb2RlQXJyYXkoKTtcbiAgICAgICAgcmV0dXJuIHRhcmdldE5vZGVzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIERlc3Ryb3kgYWxsIGF0dGFjaGVkIG5vZGUuXG4gICAgICogISN6aCDplIDmr4HmiYDmnInmjILngrlcbiAgICAgKiBAbWV0aG9kIGRlc3Ryb3lBbGxBdHRhY2hlZE5vZGVzXG4gICAgICovXG4gICAgZGVzdHJveUFsbEF0dGFjaGVkTm9kZXMgKCkge1xuICAgICAgICB0aGlzLl9hdHRhY2hlZFJvb3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYXR0YWNoZWROb2RlQXJyYXkubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fYm9uZUluZGV4VG9Ob2RlID0ge307XG4gICAgICAgIGlmICghdGhpcy5faW5pdGVkKSByZXR1cm47XG5cbiAgICAgICAgbGV0IHJvb3ROb2RlID0gdGhpcy5fc2tlbGV0b25Ob2RlLmdldENoaWxkQnlOYW1lKEFUVEFDSEVEX1JPT1RfTkFNRSk7XG4gICAgICAgIGlmIChyb290Tm9kZSkge1xuICAgICAgICAgICAgcm9vdE5vZGUucmVtb3ZlRnJvbVBhcmVudCh0cnVlKTtcbiAgICAgICAgICAgIHJvb3ROb2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHJvb3ROb2RlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRyYXZlcnNlIGFsbCBib25lcyB0byBnZW5lcmF0ZSBhIHRyZWUgY29udGFpbmluZyBhbGwgYm9uZXMgbm9kZXMsIE5PVEUgdGhhdCBtYWtlIHN1cmUgdGhlIHNrZWxldG9uIGhhcyBpbml0aWFsaXplZCBiZWZvcmUgY2FsbGluZyB0aGlzIGludGVyZmFjZS5cbiAgICAgKiAhI3poIOmBjeWOhuaJgOacieaPkuanve+8jOeUn+aIkOWMheWQq+aJgOacieaPkuanveeahOiKgueCueagke+8jOazqOaEj++8jOiwg+eUqOivpeaOpeWPo+WJjeivt+ehruS/nemqqOmqvOWKqOeUu+W3sue7j+WIneWni+WMluWlveOAglxuICAgICAqIEBtZXRob2QgZ2VuZXJhdGVBbGxBdHRhY2hlZE5vZGVzXG4gICAgICogQHJldHVybiB7Y2MuTm9kZX0gcm9vdCBub2RlXG4gICAgICovXG4gICAgZ2VuZXJhdGVBbGxBdHRhY2hlZE5vZGVzICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0ZWQpIHJldHVybjtcblxuICAgICAgICAvLyBjbGVhciBhbGwgcmVjb3Jkc1xuICAgICAgICB0aGlzLl9ib25lSW5kZXhUb05vZGUgPSB7fTtcbiAgICAgICAgdGhpcy5fYXR0YWNoZWROb2RlQXJyYXkubGVuZ3RoID0gMDtcbiAgICAgICAgXG4gICAgICAgIGxldCByb290Tm9kZSA9IHRoaXMuX3ByZXBhcmVBdHRhY2hOb2RlKCk7XG4gICAgICAgIGlmICghcm9vdE5vZGUpIHJldHVybjtcblxuICAgICAgICBsZXQgYm9uZXMgPSB0aGlzLl9za2VsZXRvbi5ib25lcztcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBib25lcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBib25lID0gYm9uZXNbaV07XG4gICAgICAgICAgICBsZXQgYm9uZURhdGEgPSBib25lLmRhdGE7XG4gICAgICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAoYm9uZS5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50SW5kZXggPSBib25lLnBhcmVudC5kYXRhLmluZGV4O1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUgPSB0aGlzLl9ib25lSW5kZXhUb05vZGVbcGFyZW50SW5kZXhdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlID0gcm9vdE5vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJvbmVOb2RlID0gcGFyZW50Tm9kZS5nZXRDaGlsZEJ5TmFtZShBVFRBQ0hFRF9QUkVfTkFNRSArIGJvbmVEYXRhLm5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICghYm9uZU5vZGUgfHwgIWJvbmVOb2RlLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYm9uZU5vZGUgPSB0aGlzLl9idWlsZEJvbmVBdHRhY2hlZE5vZGUoYm9uZSwgYm9uZURhdGEuaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlLmFkZENoaWxkKGJvbmVOb2RlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWlsZEJvbmVSZWxhdGlvbihib25lTm9kZSwgYm9uZSwgYm9uZURhdGEuaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm9vdE5vZGU7XG4gICAgfSxcblxuICAgIF9oYXNBdHRhY2hlZE5vZGUgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGxldCBhdHRhY2hlZFJvb3ROb2RlID0gdGhpcy5fc2tlbGV0b25Ob2RlLmdldENoaWxkQnlOYW1lKEFUVEFDSEVEX1JPT1RfTkFNRSk7XG4gICAgICAgIHJldHVybiAhIWF0dGFjaGVkUm9vdE5vZGU7XG4gICAgfSxcblxuICAgIF9hc3NvY2lhdGVBdHRhY2hlZE5vZGUgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCByb290Tm9kZSA9IHRoaXMuX3NrZWxldG9uTm9kZS5nZXRDaGlsZEJ5TmFtZShBVFRBQ0hFRF9ST09UX05BTUUpO1xuICAgICAgICBpZiAoIXJvb3ROb2RlIHx8ICFyb290Tm9kZS5pc1ZhbGlkKSByZXR1cm47XG4gICAgICAgIHRoaXMuX2F0dGFjaGVkUm9vdE5vZGUgPSByb290Tm9kZTtcblxuICAgICAgICAvLyBjbGVhciBhbGwgcmVjb3Jkc1xuICAgICAgICB0aGlzLl9ib25lSW5kZXhUb05vZGUgPSB7fTtcbiAgICAgICAgbGV0IG5vZGVBcnJheSA9IHRoaXMuX2F0dGFjaGVkTm9kZUFycmF5O1xuICAgICAgICBub2RlQXJyYXkubGVuZ3RoID0gMDtcbiAgICAgICAgbGltaXROb2RlKHJvb3ROb2RlKTtcblxuICAgICAgICBpZiAoIUNDX05BVElWRVJFTkRFUkVSKSB7XG4gICAgICAgICAgICBsZXQgaXNDYWNoZWQgPSB0aGlzLl9za2VsZXRvbkNvbXAuaXNBbmltYXRpb25DYWNoZWQoKTtcbiAgICAgICAgICAgIGlmIChpc0NhY2hlZCAmJiB0aGlzLl9za2VsZXRvbkNvbXAuX2ZyYW1lQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9za2VsZXRvbkNvbXAuX2ZyYW1lQ2FjaGUuZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBib25lcyA9IHRoaXMuX3NrZWxldG9uLmJvbmVzO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IGJvbmVzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgbGV0IGJvbmUgPSBib25lc1tpXTtcbiAgICAgICAgICAgIGxldCBib25lRGF0YSA9IGJvbmUuZGF0YTtcbiAgICAgICAgICAgIGxldCBwYXJlbnROb2RlID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChib25lLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIGxldCBwYXJlbnRJbmRleCA9IGJvbmUucGFyZW50LmRhdGEuaW5kZXg7XG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZSA9IHRoaXMuX2JvbmVJbmRleFRvTm9kZVtwYXJlbnRJbmRleF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUgPSByb290Tm9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgYm9uZU5vZGUgPSBwYXJlbnROb2RlLmdldENoaWxkQnlOYW1lKEFUVEFDSEVEX1BSRV9OQU1FICsgYm9uZURhdGEubmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKGJvbmVOb2RlICYmIGJvbmVOb2RlLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVpbGRCb25lUmVsYXRpb24oYm9uZU5vZGUsIGJvbmUsIGJvbmVEYXRhLmluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3N5bmNBdHRhY2hlZE5vZGUgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCByb290Tm9kZSA9IHRoaXMuX2F0dGFjaGVkUm9vdE5vZGU7XG4gICAgICAgIGxldCBub2RlQXJyYXkgPSB0aGlzLl9hdHRhY2hlZE5vZGVBcnJheTtcbiAgICAgICAgaWYgKCFyb290Tm9kZSB8fCAhcm9vdE5vZGUuaXNWYWxpZCkge1xuICAgICAgICAgICAgdGhpcy5fYXR0YWNoZWRSb290Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICBub2RlQXJyYXkubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHJvb3RNYXRyaXggPSB0aGlzLl9za2VsZXRvbk5vZGUuX3dvcmxkTWF0cml4O1xuICAgICAgICBNYXQ0LmNvcHkocm9vdE5vZGUuX3dvcmxkTWF0cml4LCByb290TWF0cml4KTtcbiAgICAgICAgcm9vdE5vZGUuX3JlbmRlckZsYWcgJj0gfkZMQUdfVFJBTlNGT1JNO1xuXG4gICAgICAgIGxldCBib25lSW5mb3MgPSBudWxsO1xuICAgICAgICBsZXQgaXNDYWNoZWQgPSB0aGlzLl9za2VsZXRvbkNvbXAuaXNBbmltYXRpb25DYWNoZWQoKTtcbiAgICAgICAgaWYgKGlzQ2FjaGVkKSB7XG4gICAgICAgICAgICBib25lSW5mb3MgPSB0aGlzLl9za2VsZXRvbkNvbXAuX2N1ckZyYW1lICYmIHRoaXMuX3NrZWxldG9uQ29tcC5fY3VyRnJhbWUuYm9uZUluZm9zO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9uZUluZm9zID0gdGhpcy5fc2tlbGV0b24uYm9uZXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWJvbmVJbmZvcykgcmV0dXJuO1xuXG4gICAgICAgIGxldCBtdWxNYXQgPSB0aGlzLl9za2VsZXRvbk5vZGUuX211bE1hdDtcbiAgICAgICAgbGV0IG1hdHJpeEhhbmRsZSA9IGZ1bmN0aW9uIChub2RlTWF0LCBwYXJlbnRNYXQsIGJvbmUpIHtcbiAgICAgICAgICAgIGxldCB0bSA9IF90ZW1wTWF0NC5tO1xuICAgICAgICAgICAgdG1bMF0gPSBib25lLmE7XG4gICAgICAgICAgICB0bVsxXSA9IGJvbmUuYztcbiAgICAgICAgICAgIHRtWzRdID0gYm9uZS5iO1xuICAgICAgICAgICAgdG1bNV0gPSBib25lLmQ7XG4gICAgICAgICAgICB0bVsxMl0gPSBib25lLndvcmxkWDtcbiAgICAgICAgICAgIHRtWzEzXSA9IGJvbmUud29ybGRZO1xuICAgICAgICAgICAgbXVsTWF0KG5vZGVNYXQsIHBhcmVudE1hdCwgX3RlbXBNYXQ0KTtcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgbm9kZUFycmF5RGlydHkgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBub2RlQXJyYXkubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYm9uZU5vZGUgPSBub2RlQXJyYXlbaV07XG4gICAgICAgICAgICAvLyBOb2RlIGhhcyBiZWVuIGRlc3Ryb3lcbiAgICAgICAgICAgIGlmICghYm9uZU5vZGUgfHwgIWJvbmVOb2RlLmlzVmFsaWQpIHsgXG4gICAgICAgICAgICAgICAgbm9kZUFycmF5W2ldID0gbnVsbDtcbiAgICAgICAgICAgICAgICBub2RlQXJyYXlEaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgYm9uZSA9IGJvbmVJbmZvc1tib25lTm9kZS5fYm9uZUluZGV4XTtcbiAgICAgICAgICAgIC8vIEJvbmUgaGFzIGJlZW4gZGVzdHJveVxuICAgICAgICAgICAgaWYgKCFib25lKSB7XG4gICAgICAgICAgICAgICAgYm9uZU5vZGUucmVtb3ZlRnJvbVBhcmVudCh0cnVlKTtcbiAgICAgICAgICAgICAgICBib25lTm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgbm9kZUFycmF5W2ldID0gbnVsbDtcbiAgICAgICAgICAgICAgICBub2RlQXJyYXlEaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXRyaXhIYW5kbGUoYm9uZU5vZGUuX3dvcmxkTWF0cml4LCByb290Tm9kZS5fd29ybGRNYXRyaXgsIGJvbmUpO1xuICAgICAgICAgICAgYm9uZU5vZGUuX3JlbmRlckZsYWcgJj0gfkZMQUdfVFJBTlNGT1JNO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlQXJyYXlEaXJ0eSkge1xuICAgICAgICAgICAgdGhpcy5fcmVidWlsZE5vZGVBcnJheSgpO1xuICAgICAgICB9XG4gICAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNwLkF0dGFjaFV0aWwgPSBBdHRhY2hVdGlsOyJdLCJzb3VyY2VSb290IjoiLyJ9