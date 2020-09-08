
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
        return this._color;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NMYWJlbFNoYWRvdy5qcyJdLCJuYW1lcyI6WyJMYWJlbFNoYWRvdyIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicmVxdWlyZSIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJleGVjdXRlSW5FZGl0TW9kZSIsInJlcXVpcmVDb21wb25lbnQiLCJMYWJlbCIsInByb3BlcnRpZXMiLCJfY29sb3IiLCJDb2xvciIsIldISVRFIiwiX29mZnNldCIsInYyIiwiX2JsdXIiLCJjb2xvciIsInRvb2x0aXAiLCJDQ19ERVYiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsImVxdWFscyIsIl91cGRhdGVSZW5kZXJEYXRhIiwib2Zmc2V0IiwiYmx1ciIsInJhbmdlIiwib25FbmFibGUiLCJvbkRpc2FibGUiLCJsYWJlbCIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJtYXJrRm9yUmVuZGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7Ozs7Ozs7Ozs7OztBQWNBLElBQUlBLFdBQVcsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdkJDLEVBQUFBLElBQUksRUFBRSxnQkFEaUI7QUFFdkIsYUFBU0MsT0FBTyxDQUFDLGVBQUQsQ0FGTztBQUd2QkMsRUFBQUEsTUFBTSxFQUFFQyxTQUFTLElBQUk7QUFDakJDLElBQUFBLElBQUksRUFBRSxnREFEVztBQUVqQkMsSUFBQUEsaUJBQWlCLEVBQUUsSUFGRjtBQUdqQkMsSUFBQUEsZ0JBQWdCLEVBQUVSLEVBQUUsQ0FBQ1M7QUFISixHQUhFO0FBU3ZCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsTUFBTSxFQUFFWCxFQUFFLENBQUNZLEtBQUgsQ0FBU0MsS0FEVDtBQUVSQyxJQUFBQSxPQUFPLEVBQUVkLEVBQUUsQ0FBQ2UsRUFBSCxDQUFNLENBQU4sRUFBUyxDQUFULENBRkQ7QUFHUkMsSUFBQUEsS0FBSyxFQUFFLENBSEM7O0FBS1I7Ozs7Ozs7O0FBUUFDLElBQUFBLEtBQUssRUFBRTtBQUNIQyxNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSw2QkFEaEI7QUFFSEMsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixlQUFPLEtBQUtULE1BQVo7QUFDSCxPQUpFO0FBS0hVLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLFlBQUksQ0FBQyxLQUFLWCxNQUFMLENBQVlZLE1BQVosQ0FBbUJELEtBQW5CLENBQUwsRUFBZ0M7QUFDNUIsZUFBS1gsTUFBTCxDQUFZVSxHQUFaLENBQWdCQyxLQUFoQjtBQUNIOztBQUNELGFBQUtFLGlCQUFMO0FBQ0g7QUFWRSxLQWJDOztBQTBCUjs7Ozs7Ozs7QUFRQUMsSUFBQUEsTUFBTSxFQUFFO0FBQ0pQLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLDhCQURmO0FBRUpDLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLTixPQUFaO0FBQ0gsT0FKRztBQUtKTyxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixhQUFLUixPQUFMLEdBQWVRLEtBQWY7O0FBQ0EsYUFBS0UsaUJBQUw7QUFDSDtBQVJHLEtBbENBOztBQTZDUjs7Ozs7Ozs7QUFRQUUsSUFBQUEsSUFBSSxFQUFFO0FBQ0ZSLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLDRCQURqQjtBQUVGQyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS0osS0FBWjtBQUNILE9BSkM7QUFLRkssTUFBQUEsR0FBRyxFQUFFLGFBQVVDLEtBQVYsRUFBaUI7QUFDbEIsYUFBS04sS0FBTCxHQUFhTSxLQUFiOztBQUNBLGFBQUtFLGlCQUFMO0FBQ0gsT0FSQztBQVNGRyxNQUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFELEVBQUksSUFBSjtBQVRMO0FBckRFLEdBVFc7QUEyRXZCQyxFQUFBQSxRQTNFdUIsc0JBMkVYO0FBQ1IsU0FBS0osaUJBQUw7QUFDSCxHQTdFc0I7QUErRXZCSyxFQUFBQSxTQS9FdUIsdUJBK0VWO0FBQ1QsU0FBS0wsaUJBQUw7QUFDSCxHQWpGc0I7QUFtRnZCQSxFQUFBQSxpQkFuRnVCLCtCQW1GRjtBQUNqQixRQUFJTSxLQUFLLEdBQUcsS0FBS0MsSUFBTCxDQUFVQyxZQUFWLENBQXVCaEMsRUFBRSxDQUFDUyxLQUExQixDQUFaOztBQUNBLFFBQUlxQixLQUFKLEVBQVc7QUFDUEEsTUFBQUEsS0FBSyxDQUFDRyxhQUFOLENBQW9CLElBQXBCO0FBQ0g7QUFDSjtBQXhGc0IsQ0FBVCxDQUFsQjtBQTRGQWpDLEVBQUUsQ0FBQ0QsV0FBSCxHQUFpQm1DLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnBDLFdBQWxDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogISNlbiBTaGFkb3cgZWZmZWN0IGZvciBMYWJlbCBjb21wb25lbnQsIG9ubHkgZm9yIHN5c3RlbSBmb250cyBvciBUVEYgZm9udHNcbiAqICEjemgg55So5LqO57uZIExhYmVsIOe7hOS7tua3u+WKoOmYtOW9seaViOaenO+8jOWPquiDveeUqOS6juezu+e7n+Wtl+S9k+aIliB0dGYg5a2X5L2TXG4gKiBAY2xhc3MgTGFiZWxTaGFkb3dcbiAqIEBleHRlbmRzIENvbXBvbmVudFxuICogQGV4YW1wbGVcbiAqICAvLyBDcmVhdGUgYSBuZXcgbm9kZSBhbmQgYWRkIGxhYmVsIGNvbXBvbmVudHMuXG4gKiAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZShcIk5ldyBMYWJlbFwiKTtcbiAqICB2YXIgbGFiZWwgPSBub2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XG4gKiAgbGFiZWwuc3RyaW5nID0gXCJoZWxsbyB3b3JsZFwiO1xuICogIHZhciBsYWJlbFNoYWRvdyA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsU2hhZG93KTtcbiAqICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAqL1xuXG5sZXQgTGFiZWxTaGFkb3cgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkxhYmVsU2hhZG93JyxcbiAgICBleHRlbmRzOiByZXF1aXJlKCcuL0NDQ29tcG9uZW50JyksXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnJlbmRlcmVycy9MYWJlbFNoYWRvdycsXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlLFxuICAgICAgICByZXF1aXJlQ29tcG9uZW50OiBjYy5MYWJlbCxcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfY29sb3I6IGNjLkNvbG9yLldISVRFLFxuICAgICAgICBfb2Zmc2V0OiBjYy52MigyLCAyKSxcbiAgICAgICAgX2JsdXI6IDIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIHNoYWRvdyBjb2xvclxuICAgICAgICAgKiAhI3poIOmYtOW9seeahOminOiJslxuICAgICAgICAgKiBAcHJvcGVydHkgY29sb3JcbiAgICAgICAgICogQHR5cGUge0NvbG9yfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBsYWJlbFNoYWRvdy5jb2xvciA9IGNjLkNvbG9yLllFTExPVztcbiAgICAgICAgICovXG4gICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNoYWRvdy5jb2xvcicsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2NvbG9yLmVxdWFscyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29sb3Iuc2V0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmVuZGVyRGF0YSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIE9mZnNldCBiZXR3ZWVuIGZvbnQgYW5kIHNoYWRvd1xuICAgICAgICAgKiAhI3poIOWtl+S9k+S4jumYtOW9seeahOWBj+enu1xuICAgICAgICAgKiBAcHJvcGVydHkgb2Zmc2V0XG4gICAgICAgICAqIEB0eXBlIHtWZWMyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBsYWJlbFNoYWRvdy5vZmZzZXQgPSBuZXcgY2MuVmVjMigyLCAyKTtcbiAgICAgICAgICovXG4gICAgICAgIG9mZnNldDoge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5zaGFkb3cub2Zmc2V0JyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vZmZzZXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSZW5kZXJEYXRhKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQSBub24tbmVnYXRpdmUgZmxvYXQgc3BlY2lmeWluZyB0aGUgbGV2ZWwgb2Ygc2hhZG93IGJsdXJcbiAgICAgICAgICogISN6aCDpmLTlvbHnmoTmqKHns4rnqIvluqZcbiAgICAgICAgICogQHByb3BlcnR5IGJsdXJcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbGFiZWxTaGFkb3cuYmx1ciA9IDI7XG4gICAgICAgICAqL1xuICAgICAgICBibHVyOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNoYWRvdy5ibHVyJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ibHVyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmx1ciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJlbmRlckRhdGEoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByYW5nZTogWzAsIDEwMjRdLFxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBvbkVuYWJsZSAoKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlbmRlckRhdGEoKTtcbiAgICB9LFxuXG4gICAgb25EaXNhYmxlICgpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlUmVuZGVyRGF0YSgpO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlUmVuZGVyRGF0YSAoKSB7XG4gICAgICAgIGxldCBsYWJlbCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgIGxhYmVsLm1hcmtGb3JSZW5kZXIodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pO1xuXG5jYy5MYWJlbFNoYWRvdyA9IG1vZHVsZS5leHBvcnRzID0gTGFiZWxTaGFkb3c7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==