
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/CCPrivateNode.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}/****************************************************************************
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
'use strict';

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Node = require('./CCNode');

var RenderFlow = require('./renderer/render-flow');

var HideInHierarchy = cc.Object.Flags.HideInHierarchy;
var LocalDirtyFlag = Node._LocalDirtyFlag;
var POSITION_ON = 1 << 0;
/**
 * !#en
 * Class of private entities in Cocos Creator scenes.<br/>
 * The PrivateNode is hidden in editor, and completely transparent to users.<br/>
 * It's normally used as Node's private content created by components in parent node.<br/>
 * So in theory private nodes are not children, they are part of the parent node.<br/>
 * Private node have two important characteristics:<br/>
 * 1. It has the minimum z index and cannot be modified, because they can't be displayed over real children.<br/>
 * 2. The positioning of private nodes is also special, they will consider the left bottom corner of the parent node's bounding box as the origin of local coordinates.<br/>
 *    In this way, they can be easily kept inside the bounding box.<br/>
 * Currently, it's used by RichText component and TileMap component.
 * !#zh
 * Cocos Creator 场景中的私有节点类。<br/>
 * 私有节点在编辑器中不可见，对用户透明。<br/>
 * 通常私有节点是被一些特殊的组件创建出来作为父节点的一部分而存在的，理论上来说，它们不是子节点，而是父节点的组成部分。<br/>
 * 私有节点有两个非常重要的特性：<br/>
 * 1. 它有着最小的渲染排序的 Z 轴深度，并且无法被更改，因为它们不能被显示在其他正常子节点之上。<br/>
 * 2. 它的定位也是特殊的，对于私有节点来说，父节点包围盒的左下角是它的局部坐标系原点，这个原点相当于父节点的位置减去它锚点的偏移。这样私有节点可以比较容易被控制在包围盒之中。<br/>
 * 目前在引擎中，RichText 和 TileMap 都有可能生成私有节点。
 * @class PrivateNode
 * @constructor
 * @param {String} name
 * @extends Node
 */

var PrivateNode = cc.Class({
  name: 'cc.PrivateNode',
  "extends": Node,
  properties: {
    x: {
      get: function get() {
        return this._originPos.x;
      },
      set: function set(value) {
        var localPosition = this._originPos;

        if (value !== localPosition.x) {
          localPosition.x = value;

          this._posDirty(true);
        }
      },
      override: true
    },
    y: {
      get: function get() {
        return this._originPos.y;
      },
      set: function set(value) {
        var localPosition = this._originPos;

        if (value !== localPosition.y) {
          localPosition.y = value;

          this._posDirty(true);
        }
      },
      override: true
    },
    zIndex: {
      get: function get() {
        return cc.macro.MIN_ZINDEX;
      },
      set: function set() {},
      override: true
    },
    showInEditor: {
      "default": false,
      editorOnly: true,
      override: true
    }
  },

  /**
   * @method constructor
   * @param {String} [name]
   */
  ctor: function ctor(name) {
    this._localZOrder = cc.macro.MIN_ZINDEX << 16;
    this._originPos = cc.v2();

    if (CC_EDITOR) {
      this._objFlags |= HideInHierarchy;
    }
  },
  _posDirty: function _posDirty(sendEvent) {
    this.setLocalDirty(LocalDirtyFlag.POSITION);
    !CC_NATIVERENDERER && (this._renderFlag |= RenderFlow.FLAG_TRANSFORM);

    if (sendEvent === true && this._eventMask & POSITION_ON) {
      this.emit(Node.EventType.POSITION_CHANGED);
    }
  },
  _updateLocalMatrix: function _updateLocalMatrix() {
    if (!this._localMatDirty) return;
    var parent = this.parent;

    if (parent) {
      // Position correction for transform calculation
      this._trs[0] = this._originPos.x - (parent._anchorPoint.x - 0.5) * parent._contentSize.width;
      this._trs[1] = this._originPos.y - (parent._anchorPoint.y - 0.5) * parent._contentSize.height;
    }

    this._super();
  },
  getPosition: function getPosition() {
    return new cc.Vec2(this._originPos);
  },
  setPosition: function setPosition(x, y) {
    if (y === undefined) {
      x = x.x;
      y = x.y;
    }

    var pos = this._originPos;

    if (pos.x === x && pos.y === y) {
      return;
    }

    pos.x = x;
    pos.y = y;

    this._posDirty(true);
  },
  setParent: function setParent(value) {
    var oldParent = this._parent;

    this._super(value);

    if (oldParent !== value) {
      if (oldParent) {
        oldParent.off(Node.EventType.ANCHOR_CHANGED, this._posDirty, this);
      }

      if (value) {
        value.on(Node.EventType.ANCHOR_CHANGED, this._posDirty, this);
      }
    }
  },
  // do not update order of arrival
  _updateOrderOfArrival: function _updateOrderOfArrival() {}
});
var proto = PrivateNode.prototype;
cc.js.getset(proto, "parent", proto.getParent, proto.setParent);
cc.js.getset(proto, "position", proto.getPosition, proto.setPosition);

if (CC_EDITOR) {
  // check components to avoid missing node reference serialied in previous version
  proto._onBatchCreated = function () {
    for (var _iterator = _createForOfIteratorHelperLoose(this._components), _step; !(_step = _iterator()).done;) {
      var comp = _step.value;
      comp.node = this;
    }

    Node.prototype._onBatchCreated.call(this);
  }; // check components to avoid missing node reference serialied in previous version


  proto._onBatchRestored = function () {
    for (var _iterator2 = _createForOfIteratorHelperLoose(this._components), _step2; !(_step2 = _iterator2()).done;) {
      var comp = _step2.value;
      comp.node = this;
    }

    Node.prototype._onBatchRestored.call(this);
  };
}

cc.PrivateNode = module.exports = PrivateNode;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL0NDUHJpdmF0ZU5vZGUuanMiXSwibmFtZXMiOlsiTm9kZSIsInJlcXVpcmUiLCJSZW5kZXJGbG93IiwiSGlkZUluSGllcmFyY2h5IiwiY2MiLCJPYmplY3QiLCJGbGFncyIsIkxvY2FsRGlydHlGbGFnIiwiX0xvY2FsRGlydHlGbGFnIiwiUE9TSVRJT05fT04iLCJQcml2YXRlTm9kZSIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJ4IiwiZ2V0IiwiX29yaWdpblBvcyIsInNldCIsInZhbHVlIiwibG9jYWxQb3NpdGlvbiIsIl9wb3NEaXJ0eSIsIm92ZXJyaWRlIiwieSIsInpJbmRleCIsIm1hY3JvIiwiTUlOX1pJTkRFWCIsInNob3dJbkVkaXRvciIsImVkaXRvck9ubHkiLCJjdG9yIiwiX2xvY2FsWk9yZGVyIiwidjIiLCJDQ19FRElUT1IiLCJfb2JqRmxhZ3MiLCJzZW5kRXZlbnQiLCJzZXRMb2NhbERpcnR5IiwiUE9TSVRJT04iLCJDQ19OQVRJVkVSRU5ERVJFUiIsIl9yZW5kZXJGbGFnIiwiRkxBR19UUkFOU0ZPUk0iLCJfZXZlbnRNYXNrIiwiZW1pdCIsIkV2ZW50VHlwZSIsIlBPU0lUSU9OX0NIQU5HRUQiLCJfdXBkYXRlTG9jYWxNYXRyaXgiLCJfbG9jYWxNYXREaXJ0eSIsInBhcmVudCIsIl90cnMiLCJfYW5jaG9yUG9pbnQiLCJfY29udGVudFNpemUiLCJ3aWR0aCIsImhlaWdodCIsIl9zdXBlciIsImdldFBvc2l0aW9uIiwiVmVjMiIsInNldFBvc2l0aW9uIiwidW5kZWZpbmVkIiwicG9zIiwic2V0UGFyZW50Iiwib2xkUGFyZW50IiwiX3BhcmVudCIsIm9mZiIsIkFOQ0hPUl9DSEFOR0VEIiwib24iLCJfdXBkYXRlT3JkZXJPZkFycml2YWwiLCJwcm90byIsInByb3RvdHlwZSIsImpzIiwiZ2V0c2V0IiwiZ2V0UGFyZW50IiwiX29uQmF0Y2hDcmVhdGVkIiwiX2NvbXBvbmVudHMiLCJjb21w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QUFJdkIsU0FBSixFQUFlO0FBQ1g7QUFDQWlDLEVBQUFBLEtBQUssQ0FBQ0ssZUFBTixHQUF3QixZQUFZO0FBQ2hDLHlEQUFpQixLQUFLQyxXQUF0Qix3Q0FBbUM7QUFBQSxVQUExQkMsSUFBMEI7QUFDL0JBLE1BQUFBLElBQUksQ0FBQ0MsSUFBTCxHQUFZLElBQVo7QUFDSDs7QUFFRHhFLElBQUFBLElBQUksQ0FBQ2lFLFNBQUwsQ0FBZUksZUFBZixDQUErQkksSUFBL0IsQ0FBb0MsSUFBcEM7QUFDSCxHQU5ELENBRlcsQ0FTWDs7O0FBQ0FULEVBQUFBLEtBQUssQ0FBQ1UsZ0JBQU4sR0FBeUIsWUFBWTtBQUNqQywwREFBaUIsS0FBS0osV0FBdEIsMkNBQW1DO0FBQUEsVUFBMUJDLElBQTBCO0FBQy9CQSxNQUFBQSxJQUFJLENBQUNDLElBQUwsR0FBWSxJQUFaO0FBQ0g7O0FBRUR4RSxJQUFBQSxJQUFJLENBQUNpRSxTQUFMLENBQWVTLGdCQUFmLENBQWdDRCxJQUFoQyxDQUFxQyxJQUFyQztBQUNILEdBTkQ7QUFPSDs7QUFFRHJFLEVBQUUsQ0FBQ00sV0FBSCxHQUFpQmlFLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmxFLFdBQWxDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgTm9kZSA9IHJlcXVpcmUoJy4vQ0NOb2RlJyk7XG5jb25zdCBSZW5kZXJGbG93ID0gcmVxdWlyZSgnLi9yZW5kZXJlci9yZW5kZXItZmxvdycpO1xuXG5jb25zdCBIaWRlSW5IaWVyYXJjaHkgPSBjYy5PYmplY3QuRmxhZ3MuSGlkZUluSGllcmFyY2h5O1xuY29uc3QgTG9jYWxEaXJ0eUZsYWcgPSBOb2RlLl9Mb2NhbERpcnR5RmxhZztcbmNvbnN0IFBPU0lUSU9OX09OID0gMSA8PCAwO1xuXG4vKipcbiAqICEjZW5cbiAqIENsYXNzIG9mIHByaXZhdGUgZW50aXRpZXMgaW4gQ29jb3MgQ3JlYXRvciBzY2VuZXMuPGJyLz5cbiAqIFRoZSBQcml2YXRlTm9kZSBpcyBoaWRkZW4gaW4gZWRpdG9yLCBhbmQgY29tcGxldGVseSB0cmFuc3BhcmVudCB0byB1c2Vycy48YnIvPlxuICogSXQncyBub3JtYWxseSB1c2VkIGFzIE5vZGUncyBwcml2YXRlIGNvbnRlbnQgY3JlYXRlZCBieSBjb21wb25lbnRzIGluIHBhcmVudCBub2RlLjxici8+XG4gKiBTbyBpbiB0aGVvcnkgcHJpdmF0ZSBub2RlcyBhcmUgbm90IGNoaWxkcmVuLCB0aGV5IGFyZSBwYXJ0IG9mIHRoZSBwYXJlbnQgbm9kZS48YnIvPlxuICogUHJpdmF0ZSBub2RlIGhhdmUgdHdvIGltcG9ydGFudCBjaGFyYWN0ZXJpc3RpY3M6PGJyLz5cbiAqIDEuIEl0IGhhcyB0aGUgbWluaW11bSB6IGluZGV4IGFuZCBjYW5ub3QgYmUgbW9kaWZpZWQsIGJlY2F1c2UgdGhleSBjYW4ndCBiZSBkaXNwbGF5ZWQgb3ZlciByZWFsIGNoaWxkcmVuLjxici8+XG4gKiAyLiBUaGUgcG9zaXRpb25pbmcgb2YgcHJpdmF0ZSBub2RlcyBpcyBhbHNvIHNwZWNpYWwsIHRoZXkgd2lsbCBjb25zaWRlciB0aGUgbGVmdCBib3R0b20gY29ybmVyIG9mIHRoZSBwYXJlbnQgbm9kZSdzIGJvdW5kaW5nIGJveCBhcyB0aGUgb3JpZ2luIG9mIGxvY2FsIGNvb3JkaW5hdGVzLjxici8+XG4gKiAgICBJbiB0aGlzIHdheSwgdGhleSBjYW4gYmUgZWFzaWx5IGtlcHQgaW5zaWRlIHRoZSBib3VuZGluZyBib3guPGJyLz5cbiAqIEN1cnJlbnRseSwgaXQncyB1c2VkIGJ5IFJpY2hUZXh0IGNvbXBvbmVudCBhbmQgVGlsZU1hcCBjb21wb25lbnQuXG4gKiAhI3poXG4gKiBDb2NvcyBDcmVhdG9yIOWcuuaZr+S4reeahOengeacieiKgueCueexu+OAgjxici8+XG4gKiDnp4HmnInoioLngrnlnKjnvJbovpHlmajkuK3kuI3lj6/op4HvvIzlr7nnlKjmiLfpgI/mmI7jgII8YnIvPlxuICog6YCa5bi456eB5pyJ6IqC54K55piv6KKr5LiA5Lqb54m55q6K55qE57uE5Lu25Yib5bu65Ye65p2l5L2c5Li654i26IqC54K555qE5LiA6YOo5YiG6ICM5a2Y5Zyo55qE77yM55CG6K665LiK5p2l6K+077yM5a6D5Lus5LiN5piv5a2Q6IqC54K577yM6ICM5piv54i26IqC54K555qE57uE5oiQ6YOo5YiG44CCPGJyLz5cbiAqIOengeacieiKgueCueacieS4pOS4qumdnuW4uOmHjeimgeeahOeJueaAp++8mjxici8+XG4gKiAxLiDlroPmnInnnYDmnIDlsI/nmoTmuLLmn5PmjpLluo/nmoQgWiDovbTmt7HluqbvvIzlubbkuJTml6Dms5Xooqvmm7TmlLnvvIzlm6DkuLrlroPku6zkuI3og73ooqvmmL7npLrlnKjlhbbku5bmraPluLjlrZDoioLngrnkuYvkuIrjgII8YnIvPlxuICogMi4g5a6D55qE5a6a5L2N5Lmf5piv54m55q6K55qE77yM5a+55LqO56eB5pyJ6IqC54K55p2l6K+077yM54i26IqC54K55YyF5Zu055uS55qE5bem5LiL6KeS5piv5a6D55qE5bGA6YOo5Z2Q5qCH57O75Y6f54K577yM6L+Z5Liq5Y6f54K555u45b2T5LqO54i26IqC54K555qE5L2N572u5YeP5Y675a6D6ZSa54K555qE5YGP56e744CC6L+Z5qC356eB5pyJ6IqC54K55Y+v5Lul5q+U6L6D5a655piT6KKr5o6n5Yi25Zyo5YyF5Zu055uS5LmL5Lit44CCPGJyLz5cbiAqIOebruWJjeWcqOW8leaTjuS4re+8jFJpY2hUZXh0IOWSjCBUaWxlTWFwIOmDveacieWPr+iDveeUn+aIkOengeacieiKgueCueOAglxuICogQGNsYXNzIFByaXZhdGVOb2RlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAZXh0ZW5kcyBOb2RlXG4gKi9cbmxldCBQcml2YXRlTm9kZSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuUHJpdmF0ZU5vZGUnLFxuICAgIGV4dGVuZHM6IE5vZGUsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHg6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29yaWdpblBvcy54O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbG9jYWxQb3NpdGlvbiA9IHRoaXMuX29yaWdpblBvcztcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IGxvY2FsUG9zaXRpb24ueCkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFBvc2l0aW9uLnggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9zRGlydHkodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHk6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29yaWdpblBvcy55O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbG9jYWxQb3NpdGlvbiA9IHRoaXMuX29yaWdpblBvcztcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IGxvY2FsUG9zaXRpb24ueSkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFBvc2l0aW9uLnkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9zRGlydHkodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHpJbmRleDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2MubWFjcm8uTUlOX1pJTkRFWDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKCkge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHNob3dJbkVkaXRvcjoge1xuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICBlZGl0b3JPbmx5OiB0cnVlLFxuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtuYW1lXVxuICAgICAqL1xuICAgIGN0b3IgKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fbG9jYWxaT3JkZXIgPSBjYy5tYWNyby5NSU5fWklOREVYIDw8IDE2O1xuICAgICAgICB0aGlzLl9vcmlnaW5Qb3MgPSBjYy52MigpO1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB0aGlzLl9vYmpGbGFncyB8PSBIaWRlSW5IaWVyYXJjaHk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3Bvc0RpcnR5IChzZW5kRXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLlBPU0lUSU9OKTtcbiAgICAgICAgIUNDX05BVElWRVJFTkRFUkVSICYmICh0aGlzLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19UUkFOU0ZPUk0pO1xuICAgICAgICBpZiAoc2VuZEV2ZW50ID09PSB0cnVlICYmICh0aGlzLl9ldmVudE1hc2sgJiBQT1NJVElPTl9PTikpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChOb2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VEKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdXBkYXRlTG9jYWxNYXRyaXgoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbG9jYWxNYXREaXJ0eSkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLnBhcmVudDtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgLy8gUG9zaXRpb24gY29ycmVjdGlvbiBmb3IgdHJhbnNmb3JtIGNhbGN1bGF0aW9uXG4gICAgICAgICAgICB0aGlzLl90cnNbMF0gPSB0aGlzLl9vcmlnaW5Qb3MueCAtIChwYXJlbnQuX2FuY2hvclBvaW50LnggLSAwLjUpICogcGFyZW50Ll9jb250ZW50U2l6ZS53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuX3Ryc1sxXSA9IHRoaXMuX29yaWdpblBvcy55IC0gKHBhcmVudC5fYW5jaG9yUG9pbnQueSAtIDAuNSkgKiBwYXJlbnQuX2NvbnRlbnRTaXplLmhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgfSxcblxuICAgIGdldFBvc2l0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5WZWMyKHRoaXMuX29yaWdpblBvcyk7XG4gICAgfSxcblxuICAgIHNldFBvc2l0aW9uICh4LCB5KSB7XG4gICAgICAgIGlmICh5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHggPSB4Lng7XG4gICAgICAgICAgICB5ID0geC55O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuX29yaWdpblBvcztcbiAgICAgICAgaWYgKHBvcy54ID09PSB4ICYmIHBvcy55ID09PSB5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcG9zLnggPSB4O1xuICAgICAgICBwb3MueSA9IHk7XG4gICAgICAgIHRoaXMuX3Bvc0RpcnR5KHRydWUpO1xuICAgIH0sXG5cbiAgICBzZXRQYXJlbnQodmFsdWUpIHtcbiAgICAgICAgbGV0IG9sZFBhcmVudCA9IHRoaXMuX3BhcmVudDtcbiAgICAgICAgdGhpcy5fc3VwZXIodmFsdWUpO1xuICAgICAgICBpZiAob2xkUGFyZW50ICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKG9sZFBhcmVudCkge1xuICAgICAgICAgICAgICAgIG9sZFBhcmVudC5vZmYoTm9kZS5FdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQsIHRoaXMuX3Bvc0RpcnR5LCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlLm9uKE5vZGUuRXZlbnRUeXBlLkFOQ0hPUl9DSEFOR0VELCB0aGlzLl9wb3NEaXJ0eSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gZG8gbm90IHVwZGF0ZSBvcmRlciBvZiBhcnJpdmFsXG4gICAgX3VwZGF0ZU9yZGVyT2ZBcnJpdmFsKCkge30sXG59KTtcblxubGV0IHByb3RvID0gUHJpdmF0ZU5vZGUucHJvdG90eXBlO1xuY2MuanMuZ2V0c2V0KHByb3RvLCBcInBhcmVudFwiLCBwcm90by5nZXRQYXJlbnQsIHByb3RvLnNldFBhcmVudCk7XG5jYy5qcy5nZXRzZXQocHJvdG8sIFwicG9zaXRpb25cIiwgcHJvdG8uZ2V0UG9zaXRpb24sIHByb3RvLnNldFBvc2l0aW9uKTtcblxuaWYgKENDX0VESVRPUikge1xuICAgIC8vIGNoZWNrIGNvbXBvbmVudHMgdG8gYXZvaWQgbWlzc2luZyBub2RlIHJlZmVyZW5jZSBzZXJpYWxpZWQgaW4gcHJldmlvdXMgdmVyc2lvblxuICAgIHByb3RvLl9vbkJhdGNoQ3JlYXRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yIChsZXQgY29tcCBvZiB0aGlzLl9jb21wb25lbnRzKSB7XG4gICAgICAgICAgICBjb21wLm5vZGUgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgTm9kZS5wcm90b3R5cGUuX29uQmF0Y2hDcmVhdGVkLmNhbGwodGhpcyk7XG4gICAgfTtcbiAgICAvLyBjaGVjayBjb21wb25lbnRzIHRvIGF2b2lkIG1pc3Npbmcgbm9kZSByZWZlcmVuY2Ugc2VyaWFsaWVkIGluIHByZXZpb3VzIHZlcnNpb25cbiAgICBwcm90by5fb25CYXRjaFJlc3RvcmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKGxldCBjb21wIG9mIHRoaXMuX2NvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIGNvbXAubm9kZSA9IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIE5vZGUucHJvdG90eXBlLl9vbkJhdGNoUmVzdG9yZWQuY2FsbCh0aGlzKTtcbiAgICB9O1xufVxuXG5jYy5Qcml2YXRlTm9kZSA9IG1vZHVsZS5leHBvcnRzID0gUHJpdmF0ZU5vZGU7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==