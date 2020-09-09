
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/prefab-helper.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

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
cc._PrefabInfo = cc.Class({
  name: 'cc.PrefabInfo',
  // extends: require('../platform/CCObject'),
  properties: {
    // the most top node of this prefab in the scene
    root: null,
    // 所属的 prefab 资源对象 (cc.Prefab)
    // In Editor, only asset._uuid is usable because asset will be changed.
    asset: null,
    // 用来标识别该节点在 prefab 资源中的位置，因此这个 ID 只需要保证在 Assets 里不重复就行
    fileId: '',
    // Indicates whether this node should always synchronize with the prefab asset, only available in the root node
    sync: false,
    // Indicates whether this node is synchronized, only available in the root node
    _synced: {
      "default": false,
      serializable: false
    }
  } // _instantiate (cloned) {
  //     if (!cloned) {
  //         cloned = new cc._PrefabInfo();
  //     }
  //     cloned.root = this.root;
  //     cloned.asset = this.asset;
  //     cloned.fileId = this.fileId;
  //     cloned.sync = this.sync;
  //     cloned._synced = this._synced;
  //     return cloned;
  // }

}); // prefab helper function

module.exports = {
  // update node to make it sync with prefab
  syncWithPrefab: function syncWithPrefab(node) {
    var _prefab = node._prefab; // non-reentrant

    _prefab._synced = true; //

    if (!_prefab.asset) {
      if (CC_EDITOR) {
        var NodeUtils = Editor.require('scene://utils/node');

        var PrefabUtils = Editor.require('scene://utils/prefab');

        cc.warn(Editor.T('MESSAGE.prefab.missing_prefab', {
          node: NodeUtils.getNodePath(node)
        }));
        node.name += PrefabUtils.MISSING_PREFAB_SUFFIX;
      } else {
        cc.errorID(3701, node.name);
      }

      node._prefab = null;
      return;
    } // save root's preserved props to avoid overwritten by prefab


    var _objFlags = node._objFlags;
    var _parent = node._parent;
    var _id = node._id;
    var _name = node._name;
    var _active = node._active;
    var eulerAnglesX = node._eulerAngles.x;
    var eulerAnglesY = node._eulerAngles.y;
    var eulerAnglesZ = node._eulerAngles.z;
    var _localZOrder = node._localZOrder;
    var _globalZOrder = node._globalZOrder;
    var trs = node._trs;
    var x = trs[0];
    var y = trs[1];
    var z = trs[2]; // instantiate prefab

    cc.game._isCloning = true;

    if (CC_SUPPORT_JIT) {
      _prefab.asset._doInstantiate(node);
    } else {
      // root in prefab asset is always synced
      var prefabRoot = _prefab.asset.data;
      prefabRoot._prefab._synced = true; // use node as the instantiated prefabRoot to make references to prefabRoot in prefab redirect to node

      prefabRoot._iN$t = node; // instantiate prefab and apply to node

      cc.instantiate._clone(prefabRoot, prefabRoot);
    }

    cc.game._isCloning = false; // restore preserved props

    node._objFlags = _objFlags;
    node._parent = _parent;
    node._id = _id;
    node._prefab = _prefab;
    node._name = _name;
    node._active = _active;
    node._localZOrder = _localZOrder;
    node._globalZOrder = _globalZOrder;
    trs = node._trs;
    trs[0] = x;
    trs[1] = y;
    trs[2] = z;
    node._eulerAngles.x = eulerAnglesX;
    node._eulerAngles.y = eulerAnglesY;
    node._eulerAngles.z = eulerAnglesZ;
  }
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL3ByZWZhYi1oZWxwZXIuanMiXSwibmFtZXMiOlsiY2MiLCJfUHJlZmFiSW5mbyIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJyb290IiwiYXNzZXQiLCJmaWxlSWQiLCJzeW5jIiwiX3N5bmNlZCIsInNlcmlhbGl6YWJsZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJzeW5jV2l0aFByZWZhYiIsIm5vZGUiLCJfcHJlZmFiIiwiQ0NfRURJVE9SIiwiTm9kZVV0aWxzIiwiRWRpdG9yIiwicmVxdWlyZSIsIlByZWZhYlV0aWxzIiwid2FybiIsIlQiLCJnZXROb2RlUGF0aCIsIk1JU1NJTkdfUFJFRkFCX1NVRkZJWCIsImVycm9ySUQiLCJfb2JqRmxhZ3MiLCJfcGFyZW50IiwiX2lkIiwiX25hbWUiLCJfYWN0aXZlIiwiZXVsZXJBbmdsZXNYIiwiX2V1bGVyQW5nbGVzIiwieCIsImV1bGVyQW5nbGVzWSIsInkiLCJldWxlckFuZ2xlc1oiLCJ6IiwiX2xvY2FsWk9yZGVyIiwiX2dsb2JhbFpPcmRlciIsInRycyIsIl90cnMiLCJnYW1lIiwiX2lzQ2xvbmluZyIsIkNDX1NVUFBPUlRfSklUIiwiX2RvSW5zdGFudGlhdGUiLCJwcmVmYWJSb290IiwiZGF0YSIsIl9pTiR0IiwiaW5zdGFudGlhdGUiLCJfY2xvbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQUEsRUFBRSxDQUFDQyxXQUFILEdBQWlCRCxFQUFFLENBQUNFLEtBQUgsQ0FBUztBQUN0QkMsRUFBQUEsSUFBSSxFQUFFLGVBRGdCO0FBRXRCO0FBQ0FDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0FDLElBQUFBLElBQUksRUFBRSxJQUZFO0FBSVI7QUFDQTtBQUNBQyxJQUFBQSxLQUFLLEVBQUUsSUFOQztBQVFSO0FBQ0FDLElBQUFBLE1BQU0sRUFBRSxFQVRBO0FBV1I7QUFDQUMsSUFB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KioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jYy5fUHJlZmFiSW5mbyA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuUHJlZmFiSW5mbycsXG4gICAgLy8gZXh0ZW5kczogcmVxdWlyZSgnLi4vcGxhdGZvcm0vQ0NPYmplY3QnKSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIHRoZSBtb3N0IHRvcCBub2RlIG9mIHRoaXMgcHJlZmFiIGluIHRoZSBzY2VuZVxuICAgICAgICByb290OiBudWxsLFxuXG4gICAgICAgIC8vIOaJgOWxnueahCBwcmVmYWIg6LWE5rqQ5a+56LGhIChjYy5QcmVmYWIpXG4gICAgICAgIC8vIEluIEVkaXRvciwgb25seSBhc3NldC5fdXVpZCBpcyB1c2FibGUgYmVjYXVzZSBhc3NldCB3aWxsIGJlIGNoYW5nZWQuXG4gICAgICAgIGFzc2V0OiBudWxsLFxuXG4gICAgICAgIC8vIOeUqOadpeagh+ivhuWIq+ivpeiKgueCueWcqCBwcmVmYWIg6LWE5rqQ5Lit55qE5L2N572u77yM5Zug5q2k6L+Z5LiqIElEIOWPqumcgOimgeS/neivgeWcqCBBc3NldHMg6YeM5LiN6YeN5aSN5bCx6KGMXG4gICAgICAgIGZpbGVJZDogJycsXG5cbiAgICAgICAgLy8gSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBub2RlIHNob3VsZCBhbHdheXMgc3luY2hyb25pemUgd2l0aCB0aGUgcHJlZmFiIGFzc2V0LCBvbmx5IGF2YWlsYWJsZSBpbiB0aGUgcm9vdCBub2RlXG4gICAgICAgIHN5bmM6IGZhbHNlLFxuXG4gICAgICAgIC8vIEluZGljYXRlcyB3aGV0aGVyIHRoaXMgbm9kZSBpcyBzeW5jaHJvbml6ZWQsIG9ubHkgYXZhaWxhYmxlIGluIHRoZSByb290IG5vZGVcbiAgICAgICAgX3N5bmNlZDoge1xuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICAvLyBfaW5zdGFudGlhdGUgKGNsb25lZCkge1xuICAgIC8vICAgICBpZiAoIWNsb25lZCkge1xuICAgIC8vICAgICAgICAgY2xvbmVkID0gbmV3IGNjLl9QcmVmYWJJbmZvKCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgY2xvbmVkLnJvb3QgPSB0aGlzLnJvb3Q7XG4gICAgLy8gICAgIGNsb25lZC5hc3NldCA9IHRoaXMuYXNzZXQ7XG4gICAgLy8gICAgIGNsb25lZC5maWxlSWQgPSB0aGlzLmZpbGVJZDtcbiAgICAvLyAgICAgY2xvbmVkLnN5bmMgPSB0aGlzLnN5bmM7XG4gICAgLy8gICAgIGNsb25lZC5fc3luY2VkID0gdGhpcy5fc3luY2VkO1xuICAgIC8vICAgICByZXR1cm4gY2xvbmVkO1xuICAgIC8vIH1cbn0pO1xuXG4vLyBwcmVmYWIgaGVscGVyIGZ1bmN0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAvLyB1cGRhdGUgbm9kZSB0byBtYWtlIGl0IHN5bmMgd2l0aCBwcmVmYWJcbiAgICBzeW5jV2l0aFByZWZhYjogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdmFyIF9wcmVmYWIgPSBub2RlLl9wcmVmYWI7XG4gICAgICAgIC8vIG5vbi1yZWVudHJhbnRcbiAgICAgICAgX3ByZWZhYi5fc3luY2VkID0gdHJ1ZTtcbiAgICAgICAgLy9cbiAgICAgICAgaWYgKCFfcHJlZmFiLmFzc2V0KSB7XG4gICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgdmFyIE5vZGVVdGlscyA9IEVkaXRvci5yZXF1aXJlKCdzY2VuZTovL3V0aWxzL25vZGUnKTtcbiAgICAgICAgICAgICAgICB2YXIgUHJlZmFiVXRpbHMgPSBFZGl0b3IucmVxdWlyZSgnc2NlbmU6Ly91dGlscy9wcmVmYWInKTtcblxuICAgICAgICAgICAgICAgIGNjLndhcm4oRWRpdG9yLlQoJ01FU1NBR0UucHJlZmFiLm1pc3NpbmdfcHJlZmFiJywgeyBub2RlOiBOb2RlVXRpbHMuZ2V0Tm9kZVBhdGgobm9kZSkgfSkpO1xuICAgICAgICAgICAgICAgIG5vZGUubmFtZSArPSBQcmVmYWJVdGlscy5NSVNTSU5HX1BSRUZBQl9TVUZGSVg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDM3MDEsIG5vZGUubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLl9wcmVmYWIgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2F2ZSByb290J3MgcHJlc2VydmVkIHByb3BzIHRvIGF2b2lkIG92ZXJ3cml0dGVuIGJ5IHByZWZhYlxuICAgICAgICB2YXIgX29iakZsYWdzID0gbm9kZS5fb2JqRmxhZ3M7XG4gICAgICAgIHZhciBfcGFyZW50ID0gbm9kZS5fcGFyZW50O1xuICAgICAgICB2YXIgX2lkID0gbm9kZS5faWQ7XG4gICAgICAgIHZhciBfbmFtZSA9IG5vZGUuX25hbWU7XG4gICAgICAgIHZhciBfYWN0aXZlID0gbm9kZS5fYWN0aXZlO1xuICAgICAgICB2YXIgZXVsZXJBbmdsZXNYID0gbm9kZS5fZXVsZXJBbmdsZXMueDtcbiAgICAgICAgdmFyIGV1bGVyQW5nbGVzWSA9IG5vZGUuX2V1bGVyQW5nbGVzLnk7XG4gICAgICAgIHZhciBldWxlckFuZ2xlc1ogPSBub2RlLl9ldWxlckFuZ2xlcy56O1xuICAgICAgICB2YXIgX2xvY2FsWk9yZGVyID0gbm9kZS5fbG9jYWxaT3JkZXI7XG4gICAgICAgIHZhciBfZ2xvYmFsWk9yZGVyID0gbm9kZS5fZ2xvYmFsWk9yZGVyO1xuICAgICAgICB2YXIgdHJzID0gbm9kZS5fdHJzO1xuICAgICAgICB2YXIgeCA9IHRyc1swXTtcbiAgICAgICAgdmFyIHkgPSB0cnNbMV07XG4gICAgICAgIHZhciB6ID0gdHJzWzJdO1xuXG4gICAgICAgIC8vIGluc3RhbnRpYXRlIHByZWZhYlxuICAgICAgICBjYy5nYW1lLl9pc0Nsb25pbmcgPSB0cnVlO1xuICAgICAgICBpZiAoQ0NfU1VQUE9SVF9KSVQpIHtcbiAgICAgICAgICAgIF9wcmVmYWIuYXNzZXQuX2RvSW5zdGFudGlhdGUobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyByb290IGluIHByZWZhYiBhc3NldCBpcyBhbHdheXMgc3luY2VkXG4gICAgICAgICAgICB2YXIgcHJlZmFiUm9vdCA9IF9wcmVmYWIuYXNzZXQuZGF0YTtcbiAgICAgICAgICAgIHByZWZhYlJvb3QuX3ByZWZhYi5fc3luY2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gdXNlIG5vZGUgYXMgdGhlIGluc3RhbnRpYXRlZCBwcmVmYWJSb290IHRvIG1ha2UgcmVmZXJlbmNlcyB0byBwcmVmYWJSb290IGluIHByZWZhYiByZWRpcmVjdCB0byBub2RlXG4gICAgICAgICAgICBwcmVmYWJSb290Ll9pTiR0ID0gbm9kZTtcblxuICAgICAgICAgICAgLy8gaW5zdGFudGlhdGUgcHJlZmFiIGFuZCBhcHBseSB0byBub2RlXG4gICAgICAgICAgICBjYy5pbnN0YW50aWF0ZS5fY2xvbmUocHJlZmFiUm9vdCwgcHJlZmFiUm9vdCk7XG4gICAgICAgIH1cbiAgICAgICAgY2MuZ2FtZS5faXNDbG9uaW5nID0gZmFsc2U7XG5cbiAgICAgICAgLy8gcmVzdG9yZSBwcmVzZXJ2ZWQgcHJvcHNcbiAgICAgICAgbm9kZS5fb2JqRmxhZ3MgPSBfb2JqRmxhZ3M7XG4gICAgICAgIG5vZGUuX3BhcmVudCA9IF9wYXJlbnQ7XG4gICAgICAgIG5vZGUuX2lkID0gX2lkO1xuICAgICAgICBub2RlLl9wcmVmYWIgPSBfcHJlZmFiO1xuICAgICAgICBub2RlLl9uYW1lID0gX25hbWU7XG4gICAgICAgIG5vZGUuX2FjdGl2ZSA9IF9hY3RpdmU7XG4gICAgICAgIG5vZGUuX2xvY2FsWk9yZGVyID0gX2xvY2FsWk9yZGVyO1xuICAgICAgICBub2RlLl9nbG9iYWxaT3JkZXIgPSBfZ2xvYmFsWk9yZGVyO1xuICAgICAgICB0cnMgPSBub2RlLl90cnM7XG4gICAgICAgIHRyc1swXSA9IHg7XG4gICAgICAgIHRyc1sxXSA9IHk7XG4gICAgICAgIHRyc1syXSA9IHo7XG4gICAgICAgIG5vZGUuX2V1bGVyQW5nbGVzLnggPSBldWxlckFuZ2xlc1g7XG4gICAgICAgIG5vZGUuX2V1bGVyQW5nbGVzLnkgPSBldWxlckFuZ2xlc1k7XG4gICAgICAgIG5vZGUuX2V1bGVyQW5nbGVzLnogPSBldWxlckFuZ2xlc1o7XG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9