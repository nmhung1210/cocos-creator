
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
        return this._color.clone();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NNb3Rpb25TdHJlYWsuanMiXSwibmFtZXMiOlsiUmVuZGVyQ29tcG9uZW50IiwicmVxdWlyZSIsIkJsZW5kRnVuYyIsIk1vdGlvblN0cmVhayIsImNjIiwiQ2xhc3MiLCJuYW1lIiwibWl4aW5zIiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImhlbHAiLCJwbGF5T25Gb2N1cyIsImV4ZWN1dGVJbkVkaXRNb2RlIiwiY3RvciIsIl9wb2ludHMiLCJwcm9wZXJ0aWVzIiwicHJldmlldyIsImVkaXRvck9ubHkiLCJub3RpZnkiLCJyZXNldCIsImFuaW1hdGFibGUiLCJfZmFkZVRpbWUiLCJmYWRlVGltZSIsImdldCIsInNldCIsInZhbHVlIiwidG9vbHRpcCIsIkNDX0RFViIsIl9taW5TZWciLCJtaW5TZWciLCJfc3Ryb2tlIiwic3Ryb2tlIiwiX3RleHR1cmUiLCJ0eXBlIiwiVGV4dHVyZTJEIiwidGV4dHVyZSIsIl91cGRhdGVNYXRlcmlhbCIsIl9jb2xvciIsIkNvbG9yIiwiV0hJVEUiLCJjb2xvciIsImNsb25lIiwiZXF1YWxzIiwiX2Zhc3RNb2RlIiwiZmFzdE1vZGUiLCJvbkVuYWJsZSIsIl9zdXBlciIsIm1hdGVyaWFsIiwiZ2V0TWF0ZXJpYWwiLCJzZXRQcm9wZXJ0eSIsInByb3RvdHlwZSIsImNhbGwiLCJvbkZvY3VzSW5FZGl0b3IiLCJvbkxvc3RGb2N1c0luRWRpdG9yIiwibGVuZ3RoIiwiX2Fzc2VtYmxlciIsIl9yZW5kZXJEYXRhIiwiY2xlYXIiLCJlbmdpbmUiLCJyZXBhaW50SW5FZGl0TW9kZSIsImxhdGVVcGRhdGUiLCJkdCIsInVwZGF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFNQSxlQUFlLEdBQUdDLE9BQU8sQ0FBQyxpQ0FBRCxDQUEvQjs7QUFDQSxJ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QVEsQ0FBQ0UsV0FBVCxDQUFxQixTQUFyQixFQUFnQyxLQUFLakIsUUFBckMsQ0FBWjs7QUFFQS9CLElBQUFBLFNBQVMsQ0FBQ2lELFNBQVYsQ0FBb0JkLGVBQXBCLENBQW9DZSxJQUFwQyxDQUF5QyxJQUF6QztBQUNILEdBckx1QjtBQXVMeEJDLEVBQUFBLGVBQWUsRUFBRTVDLFNBQVMsSUFBSSxZQUFZO0FBQ3RDLFFBQUksS0FBS1EsT0FBVCxFQUFrQjtBQUNkLFdBQUtHLEtBQUw7QUFDSDtBQUNKLEdBM0x1QjtBQTZMeEJrQyxFQUFBQSxtQkFBbUIsRUFBRTdDLFNBQVMsSUFBSSxZQUFZO0FBQzFDLFFBQUksS0FBS1EsT0FBVCxFQUFrQjtBQUNkLFdBQUtHLEtBQUw7QUFDSDtBQUNKLEdBak11Qjs7QUFtTXhCOzs7Ozs7OztBQVFBQSxFQUFBQSxLQTNNd0IsbUJBMk1mO0FBQ0wsU0FBS0wsT0FBTCxDQUFhd0MsTUFBYixHQUFzQixDQUF0QjtBQUNBLFNBQUtDLFVBQUwsSUFBbUIsS0FBS0EsVUFBTCxDQUFnQkMsV0FBaEIsQ0FBNEJDLEtBQTVCLEVBQW5COztBQUNBLFFBQUlqRCxTQUFKLEVBQWU7QUFDWEwsTUFBQUEsRUFBRSxDQUFDdUQsTUFBSCxDQUFVQyxpQkFBVjtBQUNIO0FBQ0osR0FqTnVCO0FBbU54QkMsRUFBQUEsVUFuTndCLHNCQW1OWkMsRUFuTlksRUFtTlI7QUFDWixTQUFLTixVQUFMLElBQW1CLEtBQUtBLFVBQUwsQ0FBZ0JPLE1BQWhCLENBQXVCLElBQXZCLEVBQTZCRCxFQUE3QixDQUFuQjtBQUNIO0FBck51QixDQUFULENBQW5CO0FBd05BMUQsRUFBRSxDQUFDRCxZQUFILEdBQWtCNkQsTUFBTSxDQUFDQyxPQUFQLEdBQWlCOUQsWUFBbkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgUmVuZGVyQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9DQ1JlbmRlckNvbXBvbmVudCcpO1xuY29uc3QgQmxlbmRGdW5jID0gcmVxdWlyZSgnLi4vLi4vY29yZS91dGlscy9ibGVuZC1mdW5jJyk7XG5cbi8qKlxuICogISNlblxuICogY2MuTW90aW9uU3RyZWFrIG1hbmFnZXMgYSBSaWJib24gYmFzZWQgb24gaXQncyBtb3Rpb24gaW4gYWJzb2x1dGUgc3BhY2UuICAgICAgICAgICAgICAgICA8YnIvPlxuICogWW91IGNvbnN0cnVjdCBpdCB3aXRoIGEgZmFkZVRpbWUsIG1pbmltdW0gc2VnbWVudCBzaXplLCB0ZXh0dXJlIHBhdGgsIHRleHR1cmUgICAgICAgICAgICA8YnIvPlxuICogbGVuZ3RoIGFuZCBjb2xvci4gVGhlIGZhZGVUaW1lIGNvbnRyb2xzIGhvdyBsb25nIGl0IHRha2VzIGVhY2ggdmVydGV4IGluICAgICAgICAgICAgICAgICA8YnIvPlxuICogdGhlIHN0cmVhayB0byBmYWRlIG91dCwgdGhlIG1pbmltdW0gc2VnbWVudCBzaXplIGl0IGhvdyBtYW55IHBpeGVscyB0aGUgICAgICAgICAgICAgICAgICA8YnIvPlxuICogc3RyZWFrIHdpbGwgbW92ZSBiZWZvcmUgYWRkaW5nIGEgbmV3IHJpYmJvbiBzZWdtZW50LCBhbmQgdGhlIHRleHR1cmUgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICogbGVuZ3RoIGlzIHRoZSBob3cgbWFueSBwaXhlbHMgdGhlIHRleHR1cmUgaXMgc3RyZXRjaGVkIGFjcm9zcy4gVGhlIHRleHR1cmUgICAgICAgICAgICAgICA8YnIvPlxuICogaXMgdmVydGljYWxseSBhbGlnbmVkIGFsb25nIHRoZSBzdHJlYWsgc2VnbWVudC5cbiAqICEjemgg6L+Q5Yqo6L2o6L+577yM55So5LqO5ri45oiP5a+56LGh55qE6L+Q5Yqo6L2o6L+55LiK5a6e546w5ouW5bC+5riQ6ZqQ5pWI5p6c44CCXG4gKiBAY2xhc3MgTW90aW9uU3RyZWFrXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcbiAqIEB1c2VzIEJsZW5kRnVuY1xuICovXG52YXIgTW90aW9uU3RyZWFrID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5Nb3Rpb25TdHJlYWsnLFxuXG4gICAgLy8gVG8gYXZvaWQgY29uZmxpY3Qgd2l0aCBvdGhlciByZW5kZXIgY29tcG9uZW50LCB3ZSBoYXZlbid0IHVzZSBDb21wb25lbnRVbmRlclNHLFxuICAgIC8vIGl0cyBpbXBsZW1lbnRhdGlvbiBhbHNvIHJlcXVpcmVzIHNvbWUgZGlmZmVyZW50IGFwcHJvYWNoOlxuICAgIC8vICAgMS5OZWVkZWQgYSBwYXJlbnQgbm9kZSB0byBtYWtlIG1vdGlvbiBzdHJlYWsncyBwb3NpdGlvbiBnbG9iYWwgcmVsYXRlZC5cbiAgICAvLyAgIDIuTmVlZCB0byB1cGRhdGUgdGhlIHBvc2l0aW9uIGluIGVhY2ggZnJhbWUgYnkgaXRzZWxmIGJlY2F1c2Ugd2UgZG9uJ3Qga25vd1xuICAgIC8vICAgICB3aGV0aGVyIHRoZSBnbG9iYWwgcG9zaXRpb24gaGF2ZSBjaGFuZ2VkXG4gICAgZXh0ZW5kczogUmVuZGVyQ29tcG9uZW50LFxuICAgIG1peGluczogW0JsZW5kRnVuY10sXG5cbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQub3RoZXJzL01vdGlvblN0cmVhaycsXG4gICAgICAgIGhlbHA6ICdpMThuOkNPTVBPTkVOVC5oZWxwX3VybC5tb3Rpb25TdHJlYWsnLFxuICAgICAgICBwbGF5T25Gb2N1czogdHJ1ZSxcbiAgICAgICAgZXhlY3V0ZUluRWRpdE1vZGU6IHRydWVcbiAgICB9LFxuXG4gICAgY3RvciAoKSB7XG4gICAgICAgIHRoaXMuX3BvaW50cyA9IFtdO1xuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqICEjemgg5Zyo57yW6L6R5Zmo5qih5byP5LiL6aKE6KeI5ouW5bC+5pWI5p6c44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcHJldmlld1xuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcHJldmlldzoge1xuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICBlZGl0b3JPbmx5OiB0cnVlLFxuICAgICAgICAgICAgbm90aWZ5OiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBmYWRlIHRpbWUgdG8gZmFkZS5cbiAgICAgICAgICogISN6aCDmi5blsL7nmoTmuJDpmpDml7bpl7TvvIzku6Xnp5LkuLrljZXkvY3jgIJcbiAgICAgICAgICogQHByb3BlcnR5IGZhZGVUaW1lXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG1vdGlvblN0cmVhay5mYWRlVGltZSA9IDM7XG4gICAgICAgICAqL1xuICAgICAgICBfZmFkZVRpbWU6IDEsXG4gICAgICAgIGZhZGVUaW1lOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9mYWRlVGltZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmFkZVRpbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULm1vdGlvblN0cmVhay5mYWRlVGltZSdcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgbWluaW11bSBzZWdtZW50IHNpemUuXG4gICAgICAgICAqICEjemgg5ouW5bC+5LmL6Ze05pyA5bCP6Led56a744CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBtaW5TZWdcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbW90aW9uU3RyZWFrLm1pblNlZyA9IDM7XG4gICAgICAgICAqL1xuICAgICAgICBfbWluU2VnOiAxLFxuICAgICAgICBtaW5TZWc6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21pblNlZztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWluU2VnID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULm1vdGlvblN0cmVhay5taW5TZWcnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIHN0cm9rZSdzIHdpZHRoLlxuICAgICAgICAgKiAhI3poIOaLluWwvueahOWuveW6puOAglxuICAgICAgICAgKiBAcHJvcGVydHkgc3Ryb2tlXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG1vdGlvblN0cmVhay5zdHJva2UgPSA2NDtcbiAgICAgICAgICovXG4gICAgICAgIF9zdHJva2U6IDY0LFxuICAgICAgICBzdHJva2U6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0cm9rZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3Ryb2tlID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULm1vdGlvblN0cmVhay5zdHJva2UnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIHRleHR1cmUgb2YgdGhlIE1vdGlvblN0cmVhay5cbiAgICAgICAgICogISN6aCDmi5blsL7nmoTotLTlm77jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHRleHR1cmVcbiAgICAgICAgICogQHR5cGUge1RleHR1cmUyRH1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbW90aW9uU3RyZWFrLnRleHR1cmUgPSBuZXdUZXh0dXJlO1xuICAgICAgICAgKi9cbiAgICAgICAgX3RleHR1cmU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0dXJlMkRcbiAgICAgICAgfSxcbiAgICAgICAgdGV4dHVyZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdGV4dHVyZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUgPT09IHZhbHVlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0dXJlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlTWF0ZXJpYWwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0dXJlMkQsXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubW90aW9uU3RyZWFrLnRleHR1cmUnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGNvbG9yIG9mIHRoZSBNb3Rpb25TdHJlYWsuXG4gICAgICAgICAqICEjemgg5ouW5bC+55qE6aKc6ImyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBjb2xvclxuICAgICAgICAgKiBAdHlwZSB7Q29sb3J9XG4gICAgICAgICAqIEBkZWZhdWx0IGNjLkNvbG9yLldISVRFXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG1vdGlvblN0cmVhay5jb2xvciA9IG5ldyBjYy5Db2xvcigyNTUsIDI1NSwgMjU1KTtcbiAgICAgICAgICovXG4gICAgICAgIF9jb2xvcjogY2MuQ29sb3IuV0hJVEUsXG4gICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2xvci5jbG9uZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2NvbG9yLmVxdWFscyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29sb3Iuc2V0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogY2MuQ29sb3IsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULm1vdGlvblN0cmVhay5jb2xvcidcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgZmFzdCBNb2RlLlxuICAgICAgICAgKiAhI3poIOaYr+WQpuWQr+eUqOS6huW/q+mAn+aooeW8j+OAguW9k+WQr+eUqOW/q+mAn+aooeW8j++8jOaWsOeahOeCueS8muiiq+abtOW/q+WcsOa3u+WKoO+8jOS9hueyvuW6pui+g+S9juOAglxuICAgICAgICAgKiBAcHJvcGVydHkgZmFzdE1vZGVcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG1vdGlvblN0cmVhay5mYXN0TW9kZSA9IHRydWU7XG4gICAgICAgICAqL1xuICAgICAgICBfZmFzdE1vZGU6IGZhbHNlLFxuICAgICAgICBmYXN0TW9kZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZmFzdE1vZGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Zhc3RNb2RlID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULm1vdGlvblN0cmVhay5mYXN0TW9kZSdcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkVuYWJsZSAoKSB7XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZU1hdGVyaWFsICgpIHtcbiAgICAgICAgbGV0IG1hdGVyaWFsID0gdGhpcy5nZXRNYXRlcmlhbCgwKTtcbiAgICAgICAgbWF0ZXJpYWwgJiYgbWF0ZXJpYWwuc2V0UHJvcGVydHkoJ3RleHR1cmUnLCB0aGlzLl90ZXh0dXJlKTtcblxuICAgICAgICBCbGVuZEZ1bmMucHJvdG90eXBlLl91cGRhdGVNYXRlcmlhbC5jYWxsKHRoaXMpO1xuICAgIH0sXG5cbiAgICBvbkZvY3VzSW5FZGl0b3I6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnByZXZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkxvc3RGb2N1c0luRWRpdG9yOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5wcmV2aWV3KSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZW1vdmUgYWxsIGxpdmluZyBzZWdtZW50cyBvZiB0aGUgcmliYm9uLlxuICAgICAqICEjemgg5Yig6Zmk5b2T5YmN5omA5pyJ55qE5ouW5bC+54mH5q6144CCXG4gICAgICogQG1ldGhvZCByZXNldFxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gUmVtb3ZlIGFsbCBsaXZpbmcgc2VnbWVudHMgb2YgdGhlIHJpYmJvbi5cbiAgICAgKiBteU1vdGlvblN0cmVhay5yZXNldCgpO1xuICAgICAqL1xuICAgIHJlc2V0ICgpIHtcbiAgICAgICAgdGhpcy5fcG9pbnRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlciAmJiB0aGlzLl9hc3NlbWJsZXIuX3JlbmRlckRhdGEuY2xlYXIoKTtcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgY2MuZW5naW5lLnJlcGFpbnRJbkVkaXRNb2RlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbGF0ZVVwZGF0ZSAoZHQpIHtcbiAgICAgICAgdGhpcy5fYXNzZW1ibGVyICYmIHRoaXMuX2Fzc2VtYmxlci51cGRhdGUodGhpcywgZHQpO1xuICAgIH1cbn0pO1xuXG5jYy5Nb3Rpb25TdHJlYWsgPSBtb2R1bGUuZXhwb3J0cyA9IE1vdGlvblN0cmVhaztcbiJdLCJzb3VyY2VSb290IjoiLyJ9