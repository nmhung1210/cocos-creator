
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCLabelShadow.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2019 Xiamen Yaji Software Co., Ltd.

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

/**
 * !#en Shadow effect for Label component, only for system fonts or TTF fonts
 * !#zh 用于给 Label 组件添加阴影效果，只能用于系统字体或 ttf 字体
 * @class LabelShadow
 * @extends Component
 * @example
 *  // Create a new node and add label components.
 *  var node = new cc.Node("New Label");
 *  var label = node.addComponent(cc.Label);
 *  label.string = "hello world";
 *  var labelShadow = node.addComponent(cc.LabelShadow);
 *  node.parent = this.node;
 */
var LabelShadow = cc.Class({
  name: 'cc.LabelShadow',
  "extends": require('./CCComponent'),
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/LabelShadow',
    executeInEditMode: true,
    requireComponent: cc.Label
  },
  properties: {
    _color: cc.Color.WHITE,
    _offset: cc.v2(2, 2),
    _blur: 2,

    /**
     * !#en The shadow color
     * !#zh 阴影的颜色
     * @property color
     * @type {Color}
     * @example
     * labelShadow.color = cc.Color.YELLOW;
     */
    color: {
      tooltip: CC_DEV && 'i18n:COMPONENT.shadow.color',
      get: function get() {
        return this._color.clone();
      },
      set: function set(value) {
        if (!this._color.equals(value)) {
          this._color.set(value);
        }

        this._updateRenderData();
      }
    },

    /**
     * !#en Offset between font and shadow
     * !#zh 字体与阴影的偏移
     * @property offset
     * @type {Vec2}
     * @example
     * labelShadow.offset = new cc.Vec2(2, 2);
     */
    offset: {
      tooltip: CC_DEV && 'i18n:COMPONENT.shadow.offset',
      get: function get() {
        return this._offset;
      },
      set: function set(value) {
        this._offset = value;

        this._updateRenderData();
      }
    },

    /**
     * !#en A non-negative float specifying the level of shadow blur
     * !#zh 阴影的模糊程度
     * @property blur
     * @type {Number}
     * @example
     * labelShadow.blur = 2;
     */
    blur: {
      tooltip: CC_DEV && 'i18n:COMPONENT.shadow.blur',
      get: function get() {
        return this._blur;
      },
      set: function set(value) {
        this._blur = value;

        this._updateRenderData();
      },
      range: [0, 1024]
    }
  },
  onEnable: function onEnable() {
    this._updateRenderData();
  },
  onDisable: function onDisable() {
    this._updateRenderData();
  },
  _updateRenderData: function _updateRenderData() {
    var label = this.node.getComponent(cc.Label);

    if (label) {
      label.markForRender(true);
    }
  }
});
cc.LabelShadow = module.exports = LabelShadow;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NMYWJlbFNoYWRvdy5qcyJdLCJuYW1lcyI6WyJMYWJlbFNoYWRvdyIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicmVxdWlyZSIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJleGVjdXRlSW5FZGl0TW9kZSIsInJlcXVpcmVDb21wb25lbnQiLCJMYWJlbCIsInByb3BlcnRpZXMiLCJfY29sb3IiLCJDb2xvciIsIldISVRFIiwiX29mZnNldCIsInYyIiwiX2JsdXIiLCJjb2xvciIsInRvb2x0aXAiLCJDQ19ERVYiLCJnZXQiLCJjbG9uZSIsInNldCIsInZhbHVlIiwiZXF1YWxzIiwiX3VwZGF0ZVJlbmRlckRhdGEiLCJvZmZzZXQiLCJibHVyIiwicmFuZ2UiLCJvbkVuYWJsZSIsIm9uRGlzYWJsZSIsImxhYmVsIiwibm9kZSIsImdldENvbXBvbmVudCIsIm1hcmtGb3JSZW5kZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBOzs7Ozs7Ozs7Ozs7O0FBY0EsSUFBSUEsV0FBVyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUN2QkMsRUFBQUEsSUFBSSxFQUFFLGdCQURpQjtBQUV2QixhQUFTQyxPQUFPLENBQUMsZUFBRCxDQUZPO0FBR3ZCQyxFQUFBQSxNQUFNLEVBQUVDLFNBQVMsSUFBSTtBQUNqQkMsSUFBQUEsSUFBSSxFQUFFLGdEQURXO0FBRWpCQyxJQUFBQSxpQkFBaUIsRUFBRSxJQUZGO0FBR2pCQyxJQUFBQSxnQkFBZ0IsRUFBRVIsRUFBRSxDQUFDUztBQUhKLEdBSEU7QUFTdkJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxNQUFNLEVBQUVYLEVBQUUsQ0FBQ1ksS0FBSCxDQUFTQyxLQURUO0FBRVJDLElBQUFBLE9BQU8sRUFBRWQsRUFBRSxDQUFDZSxFQUFILENBQU0sQ0FBTixFQUFTLENBQVQsQ0FGRDtBQUdSQyxJQUFBQSxLQUFLLEVBQUUsQ0FIQzs7QUFLUjs7Ozs7Ozs7QUFRQUMsSUFBQUEsS0FBSyxFQUFFO0FBQ0hDLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLDZCQURoQjtBQUVIQyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS1QsTUFBTCxDQUFZVSxLQUFaLEVBQVA7QUFDSCxPQUpFO0FBS0hDLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLFlBQUksQ0FBQyxLQUFLWixNQUFMLENBQVlhLE1BQVosQ0FBbUJELEtBQW5CLENBQUwsRUFBZ0M7QUFDNUIsZUFBS1osTUFBTCxDQUFZVyxHQUFaLENBQWdCQyxLQUFoQjtBQUNIOztBQUNELGFBQUtFLGlCQUFMO0FBQ0g7QUFWRSxLQWJDOztBQTBCUjs7Ozs7Ozs7QUFRQUMsSUFBQUEsTUFBTSxFQUFFO0FBQ0pSLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLDhCQURmO0FBRUpDLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLTixPQUFaO0FBQ0gsT0FKRztBQUtKUSxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixhQUFLVCxPQUFMLEdBQWVTLEtBQWY7O0FBQ0EsYUFBS0UsaUJBQUw7QUFDSDtBQVJHLEtBbENBOztBQTZDUjs7Ozs7Ozs7QUFRQUUsSUFBQUEsSUFBSSxFQUFFO0FBQ0ZULE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLDRCQURqQjtBQUVGQyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS0osS0FBWjtBQUNILE9BSkM7QUFLRk0sTUFBQUEsR0FBRyxFQUFFLGFBQVVDLEtBQVYsRUFBaUI7QUFDbEIsYUFBS1AsS0FBTCxHQUFhTyxLQUFiOztBQUNBLGFBQUtFLGlCQUFMO0FBQ0gsT0FSQztBQVNGRyxNQUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFELEVBQUksSUFBSjtBQVRMO0FBckRFLEdBVFc7QUEyRXZCQyxFQUFBQSxRQTNFdUIsc0JBMkVYO0FBQ1IsU0FBS0osaUJBQUw7QUFDSCxHQTdFc0I7QUErRXZCSyxFQUFBQSxTQS9FdUIsdUJBK0VWO0FBQ1QsU0FBS0wsaUJBQUw7QUFDSCxHQWpGc0I7QUFtRnZCQSxFQUFBQSxpQkFuRnVCLCtCQW1GRjtBQUNqQixRQUFJTSxLQUFLLEdBQUcsS0FBS0MsSUFBTCxDQUFVQyxZQUFWLENBQXVCakMsRUFBRSxDQUFDUyxLQUExQixDQUFaOztBQUNBLFFBQUlzQixLQUFKLEVBQVc7QUFDUEEsTUFBQUEsS0FBSyxDQUFDRyxhQUFOLENBQW9CLElBQXBCO0FBQ0g7QUFDSjtBQXhGc0IsQ0FBVCxDQUFsQjtBQTRGQWxDLEVBQUUsQ0FBQ0QsV0FBSCxHQUFpQm9DLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnJDLFdBQWxDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogISNlbiBTaGFkb3cgZWZmZWN0IGZvciBMYWJlbCBjb21wb25lbnQsIG9ubHkgZm9yIHN5c3RlbSBmb250cyBvciBUVEYgZm9udHNcbiAqICEjemgg55So5LqO57uZIExhYmVsIOe7hOS7tua3u+WKoOmYtOW9seaViOaenO+8jOWPquiDveeUqOS6juezu+e7n+Wtl+S9k+aIliB0dGYg5a2X5L2TXG4gKiBAY2xhc3MgTGFiZWxTaGFkb3dcbiAqIEBleHRlbmRzIENvbXBvbmVudFxuICogQGV4YW1wbGVcbiAqICAvLyBDcmVhdGUgYSBuZXcgbm9kZSBhbmQgYWRkIGxhYmVsIGNvbXBvbmVudHMuXG4gKiAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZShcIk5ldyBMYWJlbFwiKTtcbiAqICB2YXIgbGFiZWwgPSBub2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XG4gKiAgbGFiZWwuc3RyaW5nID0gXCJoZWxsbyB3b3JsZFwiO1xuICogIHZhciBsYWJlbFNoYWRvdyA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsU2hhZG93KTtcbiAqICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAqL1xuXG5sZXQgTGFiZWxTaGFkb3cgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkxhYmVsU2hhZG93JyxcbiAgICBleHRlbmRzOiByZXF1aXJlKCcuL0NDQ29tcG9uZW50JyksXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnJlbmRlcmVycy9MYWJlbFNoYWRvdycsXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlLFxuICAgICAgICByZXF1aXJlQ29tcG9uZW50OiBjYy5MYWJlbCxcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfY29sb3I6IGNjLkNvbG9yLldISVRFLFxuICAgICAgICBfb2Zmc2V0OiBjYy52MigyLCAyKSxcbiAgICAgICAgX2JsdXI6IDIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIHNoYWRvdyBjb2xvclxuICAgICAgICAgKiAhI3poIOmYtOW9seeahOminOiJslxuICAgICAgICAgKiBAcHJvcGVydHkgY29sb3JcbiAgICAgICAgICogQHR5cGUge0NvbG9yfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBsYWJlbFNoYWRvdy5jb2xvciA9IGNjLkNvbG9yLllFTExPVztcbiAgICAgICAgICovXG4gICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNoYWRvdy5jb2xvcicsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29sb3IuY2xvbmUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY29sb3IuZXF1YWxzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb2xvci5zZXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSZW5kZXJEYXRhKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gT2Zmc2V0IGJldHdlZW4gZm9udCBhbmQgc2hhZG93XG4gICAgICAgICAqICEjemgg5a2X5L2T5LiO6Zi05b2x55qE5YGP56e7XG4gICAgICAgICAqIEBwcm9wZXJ0eSBvZmZzZXRcbiAgICAgICAgICogQHR5cGUge1ZlYzJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGxhYmVsU2hhZG93Lm9mZnNldCA9IG5ldyBjYy5WZWMyKDIsIDIpO1xuICAgICAgICAgKi9cbiAgICAgICAgb2Zmc2V0OiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNoYWRvdy5vZmZzZXQnLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNldDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJlbmRlckRhdGEoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBBIG5vbi1uZWdhdGl2ZSBmbG9hdCBzcGVjaWZ5aW5nIHRoZSBsZXZlbCBvZiBzaGFkb3cgYmx1clxuICAgICAgICAgKiAhI3poIOmYtOW9seeahOaooeeziueoi+W6plxuICAgICAgICAgKiBAcHJvcGVydHkgYmx1clxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBsYWJlbFNoYWRvdy5ibHVyID0gMjtcbiAgICAgICAgICovXG4gICAgICAgIGJsdXI6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2hhZG93LmJsdXInLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JsdXI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ibHVyID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmVuZGVyRGF0YSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJhbmdlOiBbMCwgMTAyNF0sXG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIG9uRW5hYmxlICgpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlUmVuZGVyRGF0YSgpO1xuICAgIH0sXG5cbiAgICBvbkRpc2FibGUgKCkge1xuICAgICAgICB0aGlzLl91cGRhdGVSZW5kZXJEYXRhKCk7XG4gICAgfSxcblxuICAgIF91cGRhdGVSZW5kZXJEYXRhICgpIHtcbiAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgbGFiZWwubWFya0ZvclJlbmRlcih0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxufSk7XG5cbmNjLkxhYmVsU2hhZG93ID0gbW9kdWxlLmV4cG9ydHMgPSBMYWJlbFNoYWRvdztcbiJdLCJzb3VyY2VSb290IjoiLyJ9