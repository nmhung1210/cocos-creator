
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCMotionStreak.js';
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
var RenderComponent = require('../components/CCRenderComponent');

var BlendFunc = require('../../core/utils/blend-func');
/**
 * !#en
 * cc.MotionStreak manages a Ribbon based on it's motion in absolute space.                 <br/>
 * You construct it with a fadeTime, minimum segment size, texture path, texture            <br/>
 * length and color. The fadeTime controls how long it takes each vertex in                 <br/>
 * the streak to fade out, the minimum segment size it how many pixels the                  <br/>
 * streak will move before adding a new ribbon segment, and the texture                     <br/>
 * length is the how many pixels the texture is stretched across. The texture               <br/>
 * is vertically aligned along the streak segment.
 * !#zh 运动轨迹，用于游戏对象的运动轨迹上实现拖尾渐隐效果。
 * @class MotionStreak
 * @extends Component
 * @uses BlendFunc
 */


var MotionStreak = cc.Class({
  name: 'cc.MotionStreak',
  // To avoid conflict with other render component, we haven't use ComponentUnderSG,
  // its implementation also requires some different approach:
  //   1.Needed a parent node to make motion streak's position global related.
  //   2.Need to update the position in each frame by itself because we don't know
  //     whether the global position have changed
  "extends": RenderComponent,
  mixins: [BlendFunc],
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.others/MotionStreak',
    help: 'i18n:COMPONENT.help_url.motionStreak',
    playOnFocus: true,
    executeInEditMode: true
  },
  ctor: function ctor() {
    this._points = [];
  },
  properties: {
    /**
     * !#en
     * !#zh 在编辑器模式下预览拖尾效果。
     * @property {Boolean} preview
     * @default false
     */
    preview: {
      "default": false,
      editorOnly: true,
      notify: CC_EDITOR && function () {
        this.reset();
      },
      animatable: false
    },

    /**
     * !#en The fade time to fade.
     * !#zh 拖尾的渐隐时间，以秒为单位。
     * @property fadeTime
     * @type {Number}
     * @example
     * motionStreak.fadeTime = 3;
     */
    _fadeTime: 1,
    fadeTime: {
      get: function get() {
        return this._fadeTime;
      },
      set: function set(value) {
        this._fadeTime = value;
        this.reset();
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.motionStreak.fadeTime'
    },

    /**
     * !#en The minimum segment size.
     * !#zh 拖尾之间最小距离。
     * @property minSeg
     * @type {Number}
     * @example
     * motionStreak.minSeg = 3;
     */
    _minSeg: 1,
    minSeg: {
      get: function get() {
        return this._minSeg;
      },
      set: function set(value) {
        this._minSeg = value;
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.motionStreak.minSeg'
    },

    /**
     * !#en The stroke's width.
     * !#zh 拖尾的宽度。
     * @property stroke
     * @type {Number}
     * @example
     * motionStreak.stroke = 64;
     */
    _stroke: 64,
    stroke: {
      get: function get() {
        return this._stroke;
      },
      set: function set(value) {
        this._stroke = value;
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.motionStreak.stroke'
    },

    /**
     * !#en The texture of the MotionStreak.
     * !#zh 拖尾的贴图。
     * @property texture
     * @type {Texture2D}
     * @example
     * motionStreak.texture = newTexture;
     */
    _texture: {
      "default": null,
      type: cc.Texture2D
    },
    texture: {
      get: function get() {
        return this._texture;
      },
      set: function set(value) {
        if (this._texture === value) return;
        this._texture = value;

        this._updateMaterial();
      },
      type: cc.Texture2D,
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.motionStreak.texture'
    },

    /**
     * !#en The color of the MotionStreak.
     * !#zh 拖尾的颜色
     * @property color
     * @type {Color}
     * @default cc.Color.WHITE
     * @example
     * motionStreak.color = new cc.Color(255, 255, 255);
     */
    _color: cc.Color.WHITE,
    color: {
      get: function get() {
        return this._color;
      },
      set: function set(value) {
        if (!this._color.equals(value)) {
          this._color.set(value);
        }
      },
      type: cc.Color,
      tooltip: CC_DEV && 'i18n:COMPONENT.motionStreak.color'
    },

    /**
     * !#en The fast Mode.
     * !#zh 是否启用了快速模式。当启用快速模式，新的点会被更快地添加，但精度较低。
     * @property fastMode
     * @type {Boolean}
     * @default false
     * @example
     * motionStreak.fastMode = true;
     */
    _fastMode: false,
    fastMode: {
      get: function get() {
        return this._fastMode;
      },
      set: function set(value) {
        this._fastMode = value;
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.motionStreak.fastMode'
    }
  },
  onEnable: function onEnable() {
    this._super();

    this.reset();
  },
  _updateMaterial: function _updateMaterial() {
    var material = this.getMaterial(0);
    material && material.setProperty('texture', this._texture);

    BlendFunc.prototype._updateMaterial.call(this);
  },
  onFocusInEditor: CC_EDITOR && function () {
    if (this.preview) {
      this.reset();
    }
  },
  onLostFocusInEditor: CC_EDITOR && function () {
    if (this.preview) {
      this.reset();
    }
  },

  /**
   * !#en Remove all living segments of the ribbon.
   * !#zh 删除当前所有的拖尾片段。
   * @method reset
   * @example
   * // Remove all living segments of the ribbon.
   * myMotionStreak.reset();
   */
  reset: function reset() {
    this._points.length = 0;
    this._assembler && this._assembler._renderData.clear();

    if (CC_EDITOR) {
      cc.engine.repaintInEditMode();
    }
  },
  lateUpdate: function lateUpdate(dt) {
    this._assembler && this._assembler.update(this, dt);
  }
});
cc.MotionStreak = module.exports = MotionStreak;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NNb3Rpb25TdHJlYWsuanMiXSwibmFtZXMiOlsiUmVuZGVyQ29tcG9uZW50IiwicmVxdWlyZSIsIkJsZW5kRnVuYyIsIk1vdGlvblN0cmVhayIsImNjIiwiQ2xhc3MiLCJuYW1lIiwibWl4aW5zIiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImhlbHAiLCJwbGF5T25Gb2N1cyIsImV4ZWN1dGVJbkVkaXRNb2RlIiwiY3RvciIsIl9wb2ludHMiLCJwcm9wZXJ0aWVzIiwicHJldmlldyIsImVkaXRvck9ubHkiLCJub3RpZnkiLCJyZXNldCIsImFuaW1hdGFibGUiLCJfZmFkZVRpbWUiLCJmYWRlVGltZSIsImdldCIsInNldCIsInZhbHVlIiwidG9vbHRpcCIsIkNDX0RFViIsIl9taW5TZWciLCJtaW5TZWciLCJfc3Ryb2tlIiwic3Ryb2tlIiwiX3RleHR1cmUiLCJ0eXBlIiwiVGV4dHVyZTJEIiwidGV4dHVyZSIsIl91cGRhdGVNYXRlcmlhbCIsIl9jb2xvciIsIkNvbG9yIiwiV0hJVEUiLCJjb2xvciIsImVxdWFscyIsIl9mYXN0TW9kZSIsImZhc3RNb2RlIiwib25FbmFibGUiLCJfc3VwZXIiLCJtYXRlcmlhbCIsImdldE1hdGVyaWFsIiwic2V0UHJvcGVydHkiLCJwcm90b3R5cGUiLCJjYWxsIiwib25Gb2N1c0luRWRpdG9yIiwib25Mb3N0Rm9jdXNJbkVkaXRvciIsImxlbmd0aCIsIl9hc3NlbWJsZXIiLCJfcmVuZGVyRGF0YSIsImNsZWFyIiwiZW5naW5lIiwicmVwYWludEluRWRpdE1vZGUiLCJsYXRlVXBkYXRlIiwiZHQiLCJ1cGRhdGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBTUEsZUFBZSxHQUFHQyxPQUFPLENBQUMsaUNBQUQsQ0FBL0I7O0FBQ0EsSUFBTUMsU0FB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RUFBZ0MsS0FBS2hCLFFBQXJDLENBQVo7O0FBRUEvQixJQUFBQSxTQUFTLENBQUNnRCxTQUFWLENBQW9CYixlQUFwQixDQUFvQ2MsSUFBcEMsQ0FBeUMsSUFBekM7QUFDSCxHQXJMdUI7QUF1THhCQyxFQUFBQSxlQUFlLEVBQUUzQyxTQUFTLElBQUksWUFBWTtBQUN0QyxRQUFJLEtBQUtRLE9BQVQsRUFBa0I7QUFDZCxXQUFLRyxLQUFMO0FBQ0g7QUFDSixHQTNMdUI7QUE2THhCaUMsRUFBQUEsbUJBQW1CLEVBQUU1QyxTQUFTLElBQUksWUFBWTtBQUMxQyxRQUFJLEtBQUtRLE9BQVQsRUFBa0I7QUFDZCxXQUFLRyxLQUFMO0FBQ0g7QUFDSixHQWpNdUI7O0FBbU14Qjs7Ozs7Ozs7QUFRQUEsRUFBQUEsS0EzTXdCLG1CQTJNZjtBQUNMLFNBQUtMLE9BQUwsQ0FBYXVDLE1BQWIsR0FBc0IsQ0FBdEI7QUFDQSxTQUFLQyxVQUFMLElBQW1CLEtBQUtBLFVBQUwsQ0FBZ0JDLFdBQWhCLENBQTRCQyxLQUE1QixFQUFuQjs7QUFDQSxRQUFJaEQsU0FBSixFQUFlO0FBQ1hMLE1BQUFBLEVBQUUsQ0FBQ3NELE1BQUgsQ0FBVUMsaUJBQVY7QUFDSDtBQUNKLEdBak51QjtBQW1OeEJDLEVBQUFBLFVBbk53QixzQkFtTlpDLEVBbk5ZLEVBbU5SO0FBQ1osU0FBS04sVUFBTCxJQUFtQixLQUFLQSxVQUFMLENBQWdCTyxNQUFoQixDQUF1QixJQUF2QixFQUE2QkQsRUFBN0IsQ0FBbkI7QUFDSDtBQXJOdUIsQ0FBVCxDQUFuQjtBQXdOQXpELEVBQUUsQ0FBQ0QsWUFBSCxHQUFrQjRELE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjdELFlBQW5DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IFJlbmRlckNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvQ0NSZW5kZXJDb21wb25lbnQnKTtcbmNvbnN0IEJsZW5kRnVuYyA9IHJlcXVpcmUoJy4uLy4uL2NvcmUvdXRpbHMvYmxlbmQtZnVuYycpO1xuXG4vKipcbiAqICEjZW5cbiAqIGNjLk1vdGlvblN0cmVhayBtYW5hZ2VzIGEgUmliYm9uIGJhc2VkIG9uIGl0J3MgbW90aW9uIGluIGFic29sdXRlIHNwYWNlLiAgICAgICAgICAgICAgICAgPGJyLz5cbiAqIFlvdSBjb25zdHJ1Y3QgaXQgd2l0aCBhIGZhZGVUaW1lLCBtaW5pbXVtIHNlZ21lbnQgc2l6ZSwgdGV4dHVyZSBwYXRoLCB0ZXh0dXJlICAgICAgICAgICAgPGJyLz5cbiAqIGxlbmd0aCBhbmQgY29sb3IuIFRoZSBmYWRlVGltZSBjb250cm9scyBob3cgbG9uZyBpdCB0YWtlcyBlYWNoIHZlcnRleCBpbiAgICAgICAgICAgICAgICAgPGJyLz5cbiAqIHRoZSBzdHJlYWsgdG8gZmFkZSBvdXQsIHRoZSBtaW5pbXVtIHNlZ21lbnQgc2l6ZSBpdCBob3cgbWFueSBwaXhlbHMgdGhlICAgICAgICAgICAgICAgICAgPGJyLz5cbiAqIHN0cmVhayB3aWxsIG1vdmUgYmVmb3JlIGFkZGluZyBhIG5ldyByaWJib24gc2VnbWVudCwgYW5kIHRoZSB0ZXh0dXJlICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAqIGxlbmd0aCBpcyB0aGUgaG93IG1hbnkgcGl4ZWxzIHRoZSB0ZXh0dXJlIGlzIHN0cmV0Y2hlZCBhY3Jvc3MuIFRoZSB0ZXh0dXJlICAgICAgICAgICAgICAgPGJyLz5cbiAqIGlzIHZlcnRpY2FsbHkgYWxpZ25lZCBhbG9uZyB0aGUgc3RyZWFrIHNlZ21lbnQuXG4gKiAhI3poIOi/kOWKqOi9qOi/ue+8jOeUqOS6jua4uOaIj+WvueixoeeahOi/kOWKqOi9qOi/ueS4iuWunueOsOaLluWwvua4kOmakOaViOaenOOAglxuICogQGNsYXNzIE1vdGlvblN0cmVha1xuICogQGV4dGVuZHMgQ29tcG9uZW50XG4gKiBAdXNlcyBCbGVuZEZ1bmNcbiAqL1xudmFyIE1vdGlvblN0cmVhayA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuTW90aW9uU3RyZWFrJyxcblxuICAgIC8vIFRvIGF2b2lkIGNvbmZsaWN0IHdpdGggb3RoZXIgcmVuZGVyIGNvbXBvbmVudCwgd2UgaGF2ZW4ndCB1c2UgQ29tcG9uZW50VW5kZXJTRyxcbiAgICAvLyBpdHMgaW1wbGVtZW50YXRpb24gYWxzbyByZXF1aXJlcyBzb21lIGRpZmZlcmVudCBhcHByb2FjaDpcbiAgICAvLyAgIDEuTmVlZGVkIGEgcGFyZW50IG5vZGUgdG8gbWFrZSBtb3Rpb24gc3RyZWFrJ3MgcG9zaXRpb24gZ2xvYmFsIHJlbGF0ZWQuXG4gICAgLy8gICAyLk5lZWQgdG8gdXBkYXRlIHRoZSBwb3NpdGlvbiBpbiBlYWNoIGZyYW1lIGJ5IGl0c2VsZiBiZWNhdXNlIHdlIGRvbid0IGtub3dcbiAgICAvLyAgICAgd2hldGhlciB0aGUgZ2xvYmFsIHBvc2l0aW9uIGhhdmUgY2hhbmdlZFxuICAgIGV4dGVuZHM6IFJlbmRlckNvbXBvbmVudCxcbiAgICBtaXhpbnM6IFtCbGVuZEZ1bmNdLFxuXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50Lm90aGVycy9Nb3Rpb25TdHJlYWsnLFxuICAgICAgICBoZWxwOiAnaTE4bjpDT01QT05FTlQuaGVscF91cmwubW90aW9uU3RyZWFrJyxcbiAgICAgICAgcGxheU9uRm9jdXM6IHRydWUsXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlXG4gICAgfSxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICB0aGlzLl9wb2ludHMgPSBbXTtcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiAhI3poIOWcqOe8lui+keWZqOaooeW8j+S4i+mihOiniOaLluWwvuaViOaenOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IHByZXZpZXdcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgZWRpdG9yT25seTogdHJ1ZSxcbiAgICAgICAgICAgIG5vdGlmeTogQ0NfRURJVE9SICYmIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgZmFkZSB0aW1lIHRvIGZhZGUuXG4gICAgICAgICAqICEjemgg5ouW5bC+55qE5riQ6ZqQ5pe26Ze077yM5Lul56eS5Li65Y2V5L2N44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBmYWRlVGltZVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBtb3Rpb25TdHJlYWsuZmFkZVRpbWUgPSAzO1xuICAgICAgICAgKi9cbiAgICAgICAgX2ZhZGVUaW1lOiAxLFxuICAgICAgICBmYWRlVGltZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZmFkZVRpbWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZhZGVUaW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5tb3Rpb25TdHJlYWsuZmFkZVRpbWUnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIG1pbmltdW0gc2VnbWVudCBzaXplLlxuICAgICAgICAgKiAhI3poIOaLluWwvuS5i+mXtOacgOWwj+i3neemu+OAglxuICAgICAgICAgKiBAcHJvcGVydHkgbWluU2VnXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG1vdGlvblN0cmVhay5taW5TZWcgPSAzO1xuICAgICAgICAgKi9cbiAgICAgICAgX21pblNlZzogMSxcbiAgICAgICAgbWluU2VnOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9taW5TZWc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21pblNlZyA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5tb3Rpb25TdHJlYWsubWluU2VnJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBzdHJva2UncyB3aWR0aC5cbiAgICAgICAgICogISN6aCDmi5blsL7nmoTlrr3luqbjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHN0cm9rZVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBtb3Rpb25TdHJlYWsuc3Ryb2tlID0gNjQ7XG4gICAgICAgICAqL1xuICAgICAgICBfc3Ryb2tlOiA2NCxcbiAgICAgICAgc3Ryb2tlOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHJva2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0cm9rZSA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5tb3Rpb25TdHJlYWsuc3Ryb2tlJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSB0ZXh0dXJlIG9mIHRoZSBNb3Rpb25TdHJlYWsuXG4gICAgICAgICAqICEjemgg5ouW5bC+55qE6LS05Zu+44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB0ZXh0dXJlXG4gICAgICAgICAqIEB0eXBlIHtUZXh0dXJlMkR9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG1vdGlvblN0cmVhay50ZXh0dXJlID0gbmV3VGV4dHVyZTtcbiAgICAgICAgICovXG4gICAgICAgIF90ZXh0dXJlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dHVyZTJEXG4gICAgICAgIH0sXG4gICAgICAgIHRleHR1cmU6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RleHR1cmU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90ZXh0dXJlID09PSB2YWx1ZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dHVyZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1hdGVyaWFsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dHVyZTJELFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULm1vdGlvblN0cmVhay50ZXh0dXJlJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBjb2xvciBvZiB0aGUgTW90aW9uU3RyZWFrLlxuICAgICAgICAgKiAhI3poIOaLluWwvueahOminOiJslxuICAgICAgICAgKiBAcHJvcGVydHkgY29sb3JcbiAgICAgICAgICogQHR5cGUge0NvbG9yfVxuICAgICAgICAgKiBAZGVmYXVsdCBjYy5Db2xvci5XSElURVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBtb3Rpb25TdHJlYWsuY29sb3IgPSBuZXcgY2MuQ29sb3IoMjU1LCAyNTUsIDI1NSk7XG4gICAgICAgICAqL1xuICAgICAgICBfY29sb3I6IGNjLkNvbG9yLldISVRFLFxuICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY29sb3IuZXF1YWxzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb2xvci5zZXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBjYy5Db2xvcixcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubW90aW9uU3RyZWFrLmNvbG9yJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBmYXN0IE1vZGUuXG4gICAgICAgICAqICEjemgg5piv5ZCm5ZCv55So5LqG5b+r6YCf5qih5byP44CC5b2T5ZCv55So5b+r6YCf5qih5byP77yM5paw55qE54K55Lya6KKr5pu05b+r5Zyw5re75Yqg77yM5L2G57K+5bqm6L6D5L2O44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBmYXN0TW9kZVxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbW90aW9uU3RyZWFrLmZhc3RNb2RlID0gdHJ1ZTtcbiAgICAgICAgICovXG4gICAgICAgIF9mYXN0TW9kZTogZmFsc2UsXG4gICAgICAgIGZhc3RNb2RlOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9mYXN0TW9kZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmFzdE1vZGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubW90aW9uU3RyZWFrLmZhc3RNb2RlJ1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uRW5hYmxlICgpIHtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlTWF0ZXJpYWwgKCkge1xuICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLmdldE1hdGVyaWFsKDApO1xuICAgICAgICBtYXRlcmlhbCAmJiBtYXRlcmlhbC5zZXRQcm9wZXJ0eSgndGV4dHVyZScsIHRoaXMuX3RleHR1cmUpO1xuXG4gICAgICAgIEJsZW5kRnVuYy5wcm90b3R5cGUuX3VwZGF0ZU1hdGVyaWFsLmNhbGwodGhpcyk7XG4gICAgfSxcblxuICAgIG9uRm9jdXNJbkVkaXRvcjogQ0NfRURJVE9SICYmIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJldmlldykge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uTG9zdEZvY3VzSW5FZGl0b3I6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnByZXZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJlbW92ZSBhbGwgbGl2aW5nIHNlZ21lbnRzIG9mIHRoZSByaWJib24uXG4gICAgICogISN6aCDliKDpmaTlvZPliY3miYDmnInnmoTmi5blsL7niYfmrrXjgIJcbiAgICAgKiBAbWV0aG9kIHJlc2V0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBSZW1vdmUgYWxsIGxpdmluZyBzZWdtZW50cyBvZiB0aGUgcmliYm9uLlxuICAgICAqIG15TW90aW9uU3RyZWFrLnJlc2V0KCk7XG4gICAgICovXG4gICAgcmVzZXQgKCkge1xuICAgICAgICB0aGlzLl9wb2ludHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fYXNzZW1ibGVyICYmIHRoaXMuX2Fzc2VtYmxlci5fcmVuZGVyRGF0YS5jbGVhcigpO1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICBjYy5lbmdpbmUucmVwYWludEluRWRpdE1vZGUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBsYXRlVXBkYXRlIChkdCkge1xuICAgICAgICB0aGlzLl9hc3NlbWJsZXIgJiYgdGhpcy5fYXNzZW1ibGVyLnVwZGF0ZSh0aGlzLCBkdCk7XG4gICAgfVxufSk7XG5cbmNjLk1vdGlvblN0cmVhayA9IG1vZHVsZS5leHBvcnRzID0gTW90aW9uU3RyZWFrO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=