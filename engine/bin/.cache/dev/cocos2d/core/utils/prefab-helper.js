
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
    // the most top node of this prefab
    root: null,
    // 所属的 prefab 资源对象 (cc.Prefab)
    // In Editor, only asset._uuid is usable because asset will be changed.
    asset: null,
    // To identify the node in the prefab asset, so only needs to be unique.
    // Not available in the root node.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL3ByZWZhYi1oZWxwZXIuanMiXSwibmFtZXMiOlsiY2MiLCJfUHJlZmFiSW5mbyIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJyb290IiwiYXNzZXQiLCJmaWxlSWQiLCJzeW5jIiwiX3N5bmNlZCIsInNlcmlhbGl6YWJsZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJzeW5jV2l0aFByZWZhYiIsIm5vZGUiLCJfcHJlZmFiIiwiQ0NfRURJVE9SIiwiTm9kZVV0aWxzIiwiRWRpdG9yIiwicmVxdWlyZSIsIlByZWZhYlV0aWxzIiwid2FybiIsIlQiLCJnZXROb2RlUGF0aCIsIk1JU1NJTkdfUFJFRkFCX1NVRkZJWCIsImVycm9ySUQiLCJfb2JqRmxhZ3MiLCJfcGFyZW50IiwiX2lkIiwiX25hbWUiLCJfYWN0aXZlIiwiZXVsZXJBbmdsZXNYIiwiX2V1bGVyQW5nbGVzIiwieCIsImV1bGVyQW5nbGVzWSIsInkiLCJldWxlckFuZ2xlc1oiLCJ6IiwiX2xvY2FsWk9yZGVyIiwidHJzIiwiX3RycyIsImdhbWUiLCJfaXNDbG9uaW5nIiwiQ0NfU1VQUE9SVF9KSVQiLCJfZG9JbnN0YW50aWF0ZSIsInByZWZhYlJvb3QiLCJkYXRhIiwiX2lOJHQiLCJpbnN0YW50aWF0ZSIsIl9jbG9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBQSxFQUFFLENBQUNDLFdBQUgsR0FBaUJELEVBQUUsQ0FBQ0UsS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxJQUFJLEVBQUUsZUFEZ0I7QUFFdEI7QUFDQUMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQUMsSUFBQUEsSUFBSSxFQUFFLElBRkU7QUFJUjtBQUNBO0FBQ0FDLElBQUFBLEtBQUssRUFBRSxJQU5DO0FBUVI7QUFDQTtBQUNBQyxJQUFBQSxNQUFNLEVBQUUsRUFWQTtBQVlSO0FBQ0FDLElBQUFBLElBQUksRUFB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ZixDQUFzQkosVUFBdEIsRUFBa0NBLFVBQWxDO0FBQ0g7O0FBQ0Q3QyxJQUFBQSxFQUFFLENBQUN5QyxJQUFILENBQVFDLFVBQVIsR0FBcUIsS0FBckIsQ0FuRDRCLENBcUQ1Qjs7QUFDQTVCLElBQUFBLElBQUksQ0FBQ1ksU0FBTCxHQUFpQkEsU0FBakI7QUFDQVosSUFBQUEsSUFBSSxDQUFDYSxPQUFMLEdBQWVBLE9BQWY7QUFDQWIsSUFBQUEsSUFBSSxDQUFDYyxHQUFMLEdBQVdBLEdBQVg7QUFDQWQsSUFBQUEsSUFBSSxDQUFDQyxPQUFMLEdBQWVBLE9BQWY7QUFDQUQsSUFBQUEsSUFBSSxDQUFDZSxLQUFMLEdBQWFBLEtBQWI7QUFDQWYsSUFBQUEsSUFBSSxDQUFDZ0IsT0FBTCxHQUFlQSxPQUFmO0FBQ0FoQixJQUFBQSxJQUFJLENBQUN3QixZQUFMLEdBQW9CQSxZQUFwQjtBQUNBQyxJQUFBQSxHQUFHLEdBQUd6QixJQUFJLENBQUMwQixJQUFYO0FBQ0FELElBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU04sQ0FBVDtBQUNBTSxJQUFBQSxHQUFHLENBQUMsQ0FBRCxDQUFILEdBQVNKLENBQVQ7QUFDQUksSUFBQUEsR0FBRyxDQUFDLENBQUQsQ0FBSCxHQUFTRixDQUFUO0FBQ0F2QixJQUFBQSxJQUFJLENBQUNrQixZQUFMLENBQWtCQyxDQUFsQixHQUFzQkYsWUFBdEI7QUFDQWpCLElBQUFBLElBQUksQ0FBQ2tCLFlBQUwsQ0FBa0JHLENBQWxCLEdBQXNCRCxZQUF0QjtBQUNBcEIsSUFBQUEsSUFBSSxDQUFDa0IsWUFBTCxDQUFrQkssQ0FBbEIsR0FBc0JELFlBQXRCO0FBQ0g7QUF0RVksQ0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNjLl9QcmVmYWJJbmZvID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5QcmVmYWJJbmZvJyxcbiAgICAvLyBleHRlbmRzOiByZXF1aXJlKCcuLi9wbGF0Zm9ybS9DQ09iamVjdCcpLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gdGhlIG1vc3QgdG9wIG5vZGUgb2YgdGhpcyBwcmVmYWJcbiAgICAgICAgcm9vdDogbnVsbCxcblxuICAgICAgICAvLyDmiYDlsZ7nmoQgcHJlZmFiIOi1hOa6kOWvueixoSAoY2MuUHJlZmFiKVxuICAgICAgICAvLyBJbiBFZGl0b3IsIG9ubHkgYXNzZXQuX3V1aWQgaXMgdXNhYmxlIGJlY2F1c2UgYXNzZXQgd2lsbCBiZSBjaGFuZ2VkLlxuICAgICAgICBhc3NldDogbnVsbCxcblxuICAgICAgICAvLyBUbyBpZGVudGlmeSB0aGUgbm9kZSBpbiB0aGUgcHJlZmFiIGFzc2V0LCBzbyBvbmx5IG5lZWRzIHRvIGJlIHVuaXF1ZS5cbiAgICAgICAgLy8gTm90IGF2YWlsYWJsZSBpbiB0aGUgcm9vdCBub2RlLlxuICAgICAgICBmaWxlSWQ6ICcnLFxuXG4gICAgICAgIC8vIEluZGljYXRlcyB3aGV0aGVyIHRoaXMgbm9kZSBzaG91bGQgYWx3YXlzIHN5bmNocm9uaXplIHdpdGggdGhlIHByZWZhYiBhc3NldCwgb25seSBhdmFpbGFibGUgaW4gdGhlIHJvb3Qgbm9kZVxuICAgICAgICBzeW5jOiBmYWxzZSxcblxuICAgICAgICAvLyBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIG5vZGUgaXMgc3luY2hyb25pemVkLCBvbmx5IGF2YWlsYWJsZSBpbiB0aGUgcm9vdCBub2RlXG4gICAgICAgIF9zeW5jZWQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZVxuICAgICAgICB9LFxuICAgIH0sXG4gICAgLy8gX2luc3RhbnRpYXRlIChjbG9uZWQpIHtcbiAgICAvLyAgICAgaWYgKCFjbG9uZWQpIHtcbiAgICAvLyAgICAgICAgIGNsb25lZCA9IG5ldyBjYy5fUHJlZmFiSW5mbygpO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGNsb25lZC5yb290ID0gdGhpcy5yb290O1xuICAgIC8vICAgICBjbG9uZWQuYXNzZXQgPSB0aGlzLmFzc2V0O1xuICAgIC8vICAgICBjbG9uZWQuZmlsZUlkID0gdGhpcy5maWxlSWQ7XG4gICAgLy8gICAgIGNsb25lZC5zeW5jID0gdGhpcy5zeW5jO1xuICAgIC8vICAgICBjbG9uZWQuX3N5bmNlZCA9IHRoaXMuX3N5bmNlZDtcbiAgICAvLyAgICAgcmV0dXJuIGNsb25lZDtcbiAgICAvLyB9XG59KTtcblxuLy8gcHJlZmFiIGhlbHBlciBmdW5jdGlvblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLy8gdXBkYXRlIG5vZGUgdG8gbWFrZSBpdCBzeW5jIHdpdGggcHJlZmFiXG4gICAgc3luY1dpdGhQcmVmYWI6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHZhciBfcHJlZmFiID0gbm9kZS5fcHJlZmFiO1xuICAgICAgICAvLyBub24tcmVlbnRyYW50XG4gICAgICAgIF9wcmVmYWIuX3N5bmNlZCA9IHRydWU7XG4gICAgICAgIC8vXG4gICAgICAgIGlmICghX3ByZWZhYi5hc3NldCkge1xuICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgIHZhciBOb2RlVXRpbHMgPSBFZGl0b3IucmVxdWlyZSgnc2NlbmU6Ly91dGlscy9ub2RlJyk7XG4gICAgICAgICAgICAgICAgdmFyIFByZWZhYlV0aWxzID0gRWRpdG9yLnJlcXVpcmUoJ3NjZW5lOi8vdXRpbHMvcHJlZmFiJyk7XG5cbiAgICAgICAgICAgICAgICBjYy53YXJuKEVkaXRvci5UKCdNRVNTQUdFLnByZWZhYi5taXNzaW5nX3ByZWZhYicsIHsgbm9kZTogTm9kZVV0aWxzLmdldE5vZGVQYXRoKG5vZGUpIH0pKTtcbiAgICAgICAgICAgICAgICBub2RlLm5hbWUgKz0gUHJlZmFiVXRpbHMuTUlTU0lOR19QUkVGQUJfU1VGRklYO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3JJRCgzNzAxLCBub2RlLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5fcHJlZmFiID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNhdmUgcm9vdCdzIHByZXNlcnZlZCBwcm9wcyB0byBhdm9pZCBvdmVyd3JpdHRlbiBieSBwcmVmYWJcbiAgICAgICAgdmFyIF9vYmpGbGFncyA9IG5vZGUuX29iakZsYWdzO1xuICAgICAgICB2YXIgX3BhcmVudCA9IG5vZGUuX3BhcmVudDtcbiAgICAgICAgdmFyIF9pZCA9IG5vZGUuX2lkO1xuICAgICAgICB2YXIgX25hbWUgPSBub2RlLl9uYW1lO1xuICAgICAgICB2YXIgX2FjdGl2ZSA9IG5vZGUuX2FjdGl2ZTtcbiAgICAgICAgdmFyIGV1bGVyQW5nbGVzWCA9IG5vZGUuX2V1bGVyQW5nbGVzLng7XG4gICAgICAgIHZhciBldWxlckFuZ2xlc1kgPSBub2RlLl9ldWxlckFuZ2xlcy55O1xuICAgICAgICB2YXIgZXVsZXJBbmdsZXNaID0gbm9kZS5fZXVsZXJBbmdsZXMuejtcbiAgICAgICAgdmFyIF9sb2NhbFpPcmRlciA9IG5vZGUuX2xvY2FsWk9yZGVyO1xuICAgICAgICB2YXIgdHJzID0gbm9kZS5fdHJzO1xuICAgICAgICB2YXIgeCA9IHRyc1swXTtcbiAgICAgICAgdmFyIHkgPSB0cnNbMV07XG4gICAgICAgIHZhciB6ID0gdHJzWzJdO1xuXG4gICAgICAgIC8vIGluc3RhbnRpYXRlIHByZWZhYlxuICAgICAgICBjYy5nYW1lLl9pc0Nsb25pbmcgPSB0cnVlO1xuICAgICAgICBpZiAoQ0NfU1VQUE9SVF9KSVQpIHtcbiAgICAgICAgICAgIF9wcmVmYWIuYXNzZXQuX2RvSW5zdGFudGlhdGUobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyByb290IGluIHByZWZhYiBhc3NldCBpcyBhbHdheXMgc3luY2VkXG4gICAgICAgICAgICB2YXIgcHJlZmFiUm9vdCA9IF9wcmVmYWIuYXNzZXQuZGF0YTtcbiAgICAgICAgICAgIHByZWZhYlJvb3QuX3ByZWZhYi5fc3luY2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gdXNlIG5vZGUgYXMgdGhlIGluc3RhbnRpYXRlZCBwcmVmYWJSb290IHRvIG1ha2UgcmVmZXJlbmNlcyB0byBwcmVmYWJSb290IGluIHByZWZhYiByZWRpcmVjdCB0byBub2RlXG4gICAgICAgICAgICBwcmVmYWJSb290Ll9pTiR0ID0gbm9kZTtcblxuICAgICAgICAgICAgLy8gaW5zdGFudGlhdGUgcHJlZmFiIGFuZCBhcHBseSB0byBub2RlXG4gICAgICAgICAgICBjYy5pbnN0YW50aWF0ZS5fY2xvbmUocHJlZmFiUm9vdCwgcHJlZmFiUm9vdCk7XG4gICAgICAgIH1cbiAgICAgICAgY2MuZ2FtZS5faXNDbG9uaW5nID0gZmFsc2U7XG5cbiAgICAgICAgLy8gcmVzdG9yZSBwcmVzZXJ2ZWQgcHJvcHNcbiAgICAgICAgbm9kZS5fb2JqRmxhZ3MgPSBfb2JqRmxhZ3M7XG4gICAgICAgIG5vZGUuX3BhcmVudCA9IF9wYXJlbnQ7XG4gICAgICAgIG5vZGUuX2lkID0gX2lkO1xuICAgICAgICBub2RlLl9wcmVmYWIgPSBfcHJlZmFiO1xuICAgICAgICBub2RlLl9uYW1lID0gX25hbWU7XG4gICAgICAgIG5vZGUuX2FjdGl2ZSA9IF9hY3RpdmU7XG4gICAgICAgIG5vZGUuX2xvY2FsWk9yZGVyID0gX2xvY2FsWk9yZGVyO1xuICAgICAgICB0cnMgPSBub2RlLl90cnM7XG4gICAgICAgIHRyc1swXSA9IHg7XG4gICAgICAgIHRyc1sxXSA9IHk7XG4gICAgICAgIHRyc1syXSA9IHo7XG4gICAgICAgIG5vZGUuX2V1bGVyQW5nbGVzLnggPSBldWxlckFuZ2xlc1g7XG4gICAgICAgIG5vZGUuX2V1bGVyQW5nbGVzLnkgPSBldWxlckFuZ2xlc1k7XG4gICAgICAgIG5vZGUuX2V1bGVyQW5nbGVzLnogPSBldWxlckFuZ2xlc1o7XG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9