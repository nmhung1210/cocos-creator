
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/dragonbones/CCArmatureDisplay.js';
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
var EventTarget = require('../../cocos2d/core/event/event-target');

dragonBones.CCArmatureDisplay = cc.Class({
  name: 'dragonBones.CCArmatureDisplay',
  properties: {
    // adapt old api
    node: {
      get: function get() {
        return this;
      }
    }
  },
  ctor: function ctor() {
    this._eventTarget = new EventTarget();
  },
  setEventTarget: function setEventTarget(eventTarget) {
    this._eventTarget = eventTarget;
  },
  getRootDisplay: function getRootDisplay() {
    var parentSlot = this._armature._parent;

    if (!parentSlot) {
      return this;
    }

    var slot;

    while (parentSlot) {
      slot = parentSlot;
      parentSlot = parentSlot._armature._parent;
    }

    return slot._armature.getDisplay();
  },
  convertToRootSpace: function convertToRootSpace(pos) {
    var slot = this._armature._parent;

    if (!slot) {
      return pos;
    }

    slot.updateWorldMatrix();
    var worldMatrix = slot._worldMatrix;
    var worldMatrixm = worldMatrix.m;
    var newPos = cc.v2(0, 0);
    newPos.x = pos.x * worldMatrixm[0] + pos.y * worldMatrixm[4] + worldMatrixm[12];
    newPos.y = pos.x * worldMatrixm[1] + pos.y * worldMatrixm[5] + worldMatrixm[13];
    return newPos;
  },
  convertToWorldSpace: function convertToWorldSpace(point) {
    var newPos = this.convertToRootSpace(point);
    var ccNode = this.getRootNode();
    var finalPos = ccNode.convertToWorldSpaceAR(newPos);
    return finalPos;
  },
  getRootNode: function getRootNode() {
    var rootDisplay = this.getRootDisplay();
    return rootDisplay && rootDisplay._ccNode;
  },
  ////////////////////////////////////
  // dragonbones api
  dbInit: function dbInit(armature) {
    this._armature = armature;
  },
  dbClear: function dbClear() {
    this._armature = null;
  },
  dbUpdate: function dbUpdate() {},
  advanceTimeBySelf: function advanceTimeBySelf(on) {
    this.shouldAdvanced = !!on;
  },
  hasDBEventListener: function hasDBEventListener(type) {
    return this._eventTarget.hasEventListener(type);
  },
  addDBEventListener: function addDBEventListener(type, listener, target) {
    this._eventTarget.on(type, listener, target);
  },
  removeDBEventListener: function removeDBEventListener(type, listener, target) {
    this._eventTarget.off(type, listener, target);
  },
  dispatchDBEvent: function dispatchDBEvent(type, eventObject) {
    this._eventTarget.emit(type, eventObject);
  } ////////////////////////////////////

});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvZXh0ZW5zaW9ucy9kcmFnb25ib25lcy9DQ0FybWF0dXJlRGlzcGxheS5qcyJdLCJuYW1lcyI6WyJFdmVudFRhcmdldCIsInJlcXVpcmUiLCJkcmFnb25Cb25lcyIsIkNDQXJtYXR1cmVEaXNwbGF5IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwibm9kZSIsImdldCIsImN0b3IiLCJfZXZlbnRUYXJnZXQiLCJzZXRFdmVudFRhcmdldCIsImV2ZW50VGFyZ2V0IiwiZ2V0Um9vdERpc3BsYXkiLCJwYXJlbnRTbG90IiwiX2FybWF0dXJlIiwiX3BhcmVudCIsInNsb3QiLCJnZXREaXNwbGF5IiwiY29udmVydFRvUm9vdFNwYWNlIiwicG9zIiwidXBkYXRlV29ybGRNYXRyaXgiLCJ3b3JsZE1hdHJpeCIsIl93b3JsZE1hdHJpeCIsIndvcmxkTWF0cml4bSIsIm0iLCJuZXdQb3MiLCJ2MiIsIngiLCJ5IiwiY29udmVydFRvV29ybGRTcGFjZSIsInBvaW50IiwiY2NOb2RlIiwiZ2V0Um9vdE5vZGUiLCJmaW5hbFBvcyIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsInJvb3REaXNwbGF5IiwiX2NjTm9kZSIsImRiSW5pdCIsImFybWF0dXJlIiwiZGJDbGVhciIsImRiVXBkYXRlIiwiYWR2YW5jZVRpbWVCeVNlbGYiLCJvbiIsInNob3VsZEFkdmFuY2VkIiwiaGFzREJFdmVudExpc3RlbmVyIiwidHlwZSIsImhhc0V2ZW50TGlzdGVuZXIiLCJhZGREQkV2ZW50TGlzdGVuZXIiLCJsaXN0ZW5lciIsInRhcmdldCIsInJlbW92ZURCRXZlbnRMaXN0ZW5lciIsIm9mZiIsImRpc3BhdGNoREJFdmVudCIsImV2ZW50T2JqZWN0IiwiZW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsSUFBSUEsV0FBVyxHQUFHQyxPQUFPLENBQUMsdUNBQUQsQ0FBekI7O0FBRUFDLFdBQVcs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MEIsRUFBQUEsUUF6RXFDLHNCQXlFekIsQ0FFWCxDQTNFb0M7QUE2RXJDQyxFQUFBQSxpQkE3RXFDLDZCQTZFakJDLEVBN0VpQixFQTZFYjtBQUNwQixTQUFLQyxjQUFMLEdBQXNCLENBQUMsQ0FBQ0QsRUFBeEI7QUFDSCxHQS9Fb0M7QUFpRnJDRSxFQUFBQSxrQkFqRnFDLDhCQWlGakJDLElBakZpQixFQWlGWDtBQUN0QixXQUFPLEtBQUtwQyxZQUFMLENBQWtCcUMsZ0JBQWxCLENBQW1DRCxJQUFuQyxDQUFQO0FBQ0gsR0FuRm9DO0FBcUZyQ0UsRUFBQUEsa0JBckZxQyw4QkFxRmpCRixJQXJGaUIsRUFxRlhHLFFBckZXLEVBcUZEQyxNQXJGQyxFQXFGTztBQUN4QyxTQUFLeEMsWUFBTCxDQUFrQmlDLEVBQWxCLENBQXFCRyxJQUFyQixFQUEyQkcsUUFBM0IsRUFBcUNDLE1BQXJDO0FBQ0gsR0F2Rm9DO0FBeUZyQ0MsRUFBQUEscUJBekZxQyxpQ0F5RmRMLElBekZjLEVBeUZSRyxRQXpGUSxFQXlGRUMsTUF6RkYsRUF5RlU7QUFDM0MsU0FBS3hDLFlBQUwsQ0FBa0IwQyxHQUFsQixDQUFzQk4sSUFBdEIsRUFBNEJHLFFBQTVCLEVBQXNDQyxNQUF0QztBQUNILEdBM0ZvQztBQTZGckNHLEVBQUFBLGVBN0ZxQywyQkE2Rm5CUCxJQTdGbUIsRUE2RmJRLFdBN0ZhLEVBNkZBO0FBQ2pDLFNBQUs1QyxZQUFMLENBQWtCNkMsSUFBbEIsQ0FBdUJULElBQXZCLEVBQTZCUSxXQUE3QjtBQUNILEdBL0ZvQyxDQWdHckM7O0FBaEdxQyxDQUFULENBQWhDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5sZXQgRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuLi8uLi9jb2NvczJkL2NvcmUvZXZlbnQvZXZlbnQtdGFyZ2V0Jyk7XG5cbmRyYWdvbkJvbmVzLkNDQXJtYXR1cmVEaXNwbGF5ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdkcmFnb25Cb25lcy5DQ0FybWF0dXJlRGlzcGxheScsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGFkYXB0IG9sZCBhcGlcbiAgICAgICAgbm9kZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgY3RvciAoKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0ID0gbmV3IEV2ZW50VGFyZ2V0KCk7XG4gICAgfSxcblxuICAgIHNldEV2ZW50VGFyZ2V0IChldmVudFRhcmdldCkge1xuICAgICAgICB0aGlzLl9ldmVudFRhcmdldCA9IGV2ZW50VGFyZ2V0O1xuICAgIH0sXG5cbiAgICBnZXRSb290RGlzcGxheSAoKSB7XG4gICAgICAgIHZhciBwYXJlbnRTbG90ID0gdGhpcy5fYXJtYXR1cmUuX3BhcmVudDtcbiAgICAgICAgaWYgKCFwYXJlbnRTbG90KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIHNsb3Q7XG4gICAgICAgIHdoaWxlIChwYXJlbnRTbG90KVxuICAgICAgICB7XG4gICAgICAgICAgICBzbG90ID0gcGFyZW50U2xvdDtcbiAgICAgICAgICAgIHBhcmVudFNsb3QgPSBwYXJlbnRTbG90Ll9hcm1hdHVyZS5fcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzbG90Ll9hcm1hdHVyZS5nZXREaXNwbGF5KCk7XG4gICAgfSxcblxuICAgIGNvbnZlcnRUb1Jvb3RTcGFjZSAocG9zKSB7XG4gICAgICAgIHZhciBzbG90ID0gdGhpcy5fYXJtYXR1cmUuX3BhcmVudDtcbiAgICAgICAgaWYgKCFzbG90KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gcG9zO1xuICAgICAgICB9XG4gICAgICAgIHNsb3QudXBkYXRlV29ybGRNYXRyaXgoKTtcblxuICAgICAgICBsZXQgd29ybGRNYXRyaXggPSBzbG90Ll93b3JsZE1hdHJpeDtcbiAgICAgICAgbGV0IHdvcmxkTWF0cml4bSA9IHdvcmxkTWF0cml4Lm07XG4gICAgICAgIGxldCBuZXdQb3MgPSBjYy52MigwLDApO1xuICAgICAgICBuZXdQb3MueCA9IHBvcy54ICogd29ybGRNYXRyaXhtWzBdICsgcG9zLnkgKiB3b3JsZE1hdHJpeG1bNF0gKyB3b3JsZE1hdHJpeG1bMTJdO1xuICAgICAgICBuZXdQb3MueSA9IHBvcy54ICogd29ybGRNYXRyaXhtWzFdICsgcG9zLnkgKiB3b3JsZE1hdHJpeG1bNV0gKyB3b3JsZE1hdHJpeG1bMTNdO1xuICAgICAgICByZXR1cm4gbmV3UG9zO1xuICAgIH0sXG5cbiAgICBjb252ZXJ0VG9Xb3JsZFNwYWNlIChwb2ludCkge1xuICAgICAgICB2YXIgbmV3UG9zID0gdGhpcy5jb252ZXJ0VG9Sb290U3BhY2UocG9pbnQpO1xuICAgICAgICB2YXIgY2NOb2RlID0gdGhpcy5nZXRSb290Tm9kZSgpO1xuICAgICAgICB2YXIgZmluYWxQb3MgPSBjY05vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKG5ld1Bvcyk7XG4gICAgICAgIHJldHVybiBmaW5hbFBvcztcbiAgICB9LFxuXG4gICAgZ2V0Um9vdE5vZGUgKCkge1xuICAgICAgICB2YXIgcm9vdERpc3BsYXkgPSB0aGlzLmdldFJvb3REaXNwbGF5KCk7XG4gICAgICAgIHJldHVybiByb290RGlzcGxheSAmJiByb290RGlzcGxheS5fY2NOb2RlO1xuICAgIH0sXG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBkcmFnb25ib25lcyBhcGlcbiAgICBkYkluaXQgKGFybWF0dXJlKSB7XG4gICAgICAgIHRoaXMuX2FybWF0dXJlID0gYXJtYXR1cmU7XG4gICAgfSxcblxuICAgIGRiQ2xlYXIgKCkge1xuICAgICAgICB0aGlzLl9hcm1hdHVyZSA9IG51bGw7XG4gICAgfSxcblxuICAgIGRiVXBkYXRlICgpIHtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIGFkdmFuY2VUaW1lQnlTZWxmICAob24pIHtcbiAgICAgICAgdGhpcy5zaG91bGRBZHZhbmNlZCA9ICEhb247XG4gICAgfSxcblxuICAgIGhhc0RCRXZlbnRMaXN0ZW5lciAodHlwZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRUYXJnZXQuaGFzRXZlbnRMaXN0ZW5lcih0eXBlKTtcbiAgICB9LFxuXG4gICAgYWRkREJFdmVudExpc3RlbmVyICh0eXBlLCBsaXN0ZW5lciwgdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0Lm9uKHR5cGUsIGxpc3RlbmVyLCB0YXJnZXQpO1xuICAgIH0sXG5cbiAgICByZW1vdmVEQkV2ZW50TGlzdGVuZXIgKHR5cGUsIGxpc3RlbmVyLCB0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRUYXJnZXQub2ZmKHR5cGUsIGxpc3RlbmVyLCB0YXJnZXQpO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaERCRXZlbnQgICh0eXBlLCBldmVudE9iamVjdCkge1xuICAgICAgICB0aGlzLl9ldmVudFRhcmdldC5lbWl0KHR5cGUsIGV2ZW50T2JqZWN0KTtcbiAgICB9XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=