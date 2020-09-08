
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/SubContextView.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

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
var Component = require('./CCComponent');
/**
 * !#en SubContextView is a view component which controls open data context viewport in minigame platform.<br/>
 * The component's node size decide the viewport of the sub context content in main context, 
 * the entire sub context texture will be scaled to the node's bounding box area.<br/>
 * This component provides multiple important features:<br/>
 * 1. Sub context could use its own resolution size and policy.<br/>
 * 2. Sub context could be minized to smallest size it needed.<br/>
 * 3. Resolution of sub context content could be increased.<br/>
 * 4. User touch input is transformed to the correct viewport.<br/>
 * 5. Texture update is handled by this component. User don't need to worry.<br/>
 * One important thing to be noted, whenever the node's bounding box change, 
 * !#zh SubContextView 可以用来控制小游戏平台开放数据域在主域中的视窗的位置。<br/>
 * 这个组件的节点尺寸决定了开放数据域内容在主域中的尺寸，整个开放数据域会被缩放到节点的包围盒范围内。<br/>
 * 在这个组件的控制下，用户可以更自由得控制开放数据域：<br/>
 * 1. 子域中可以使用独立的设计分辨率和适配模式<br/>
 * 2. 子域区域尺寸可以缩小到只容纳内容即可<br/>
 * 3. 子域的分辨率也可以被放大，以便获得更清晰的显示效果<br/>
 * 4. 用户输入坐标会被自动转换到正确的子域视窗中<br/>
 * 5. 子域内容贴图的更新由组件负责，用户不需要处理<br/>
 * @class SubContextView
 * @extends Component
 */


var SubContextView = cc.Class({
  name: 'cc.SubContextView',
  "extends": Component,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.others/SubContextView',
    help: 'i18n:COMPONENT.help_url.subcontext_view'
  },
  properties: {
    _firstlyEnabled: true,
    _fps: 60,
    fps: {
      get: function get() {
        return this._fps;
      },
      set: function set(value) {
        if (this._fps === value) {
          return;
        }

        this._fps = value;
        this._updateInterval = 1 / value;

        this._updateSubContextFrameRate();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.subcontext_view.fps'
    }
  },
  ctor: function ctor() {
    this._sprite = null;
    this._tex = new cc.Texture2D();
    this._context = null;
    this._updatedTime = performance.now();
    this._updateInterval = 0;
  },
  onLoad: function onLoad() {
    // Setup subcontext canvas size
    if (window.__globalAdapter && __globalAdapter.getOpenDataContext) {
      this._updateInterval = 1000 / this._fps;
      this._context = __globalAdapter.getOpenDataContext();
      this.reset();
      var sharedCanvas = this._context.canvas;

      this._tex.setPremultiplyAlpha(true);

      this._tex.initWithElement(sharedCanvas);

      this._sprite = this.node.getComponent(cc.Sprite);

      if (!this._sprite) {
        this._sprite = this.node.addComponent(cc.Sprite);
        this._sprite.srcBlendFactor = cc.macro.BlendFactor.ONE;
      }

      this._sprite.spriteFrame = new cc.SpriteFrame(this._tex);
    } else {
      this.enabled = false;
    }
  },

  /**
   * !#en Reset open data context size and viewport
   * !#zh 重置开放数据域的尺寸和视窗
   * @method reset
   */
  reset: function reset() {
    if (this._context) {
      this.updateSubContextViewport();
      var sharedCanvas = this._context.canvas;

      if (sharedCanvas) {
        sharedCanvas.width = this.node.width;
        sharedCanvas.height = this.node.height;
      }
    }
  },
  onEnable: function onEnable() {
    if (this._firstlyEnabled && this._context) {
      this._context.postMessage({
        fromEngine: true,
        event: 'boot'
      });

      this._firstlyEnabled = false;
    } else {
      this._runSubContextMainLoop();
    }

    this._registerNodeEvent();

    this._updateSubContextFrameRate();

    this.updateSubContextViewport();
  },
  onDisable: function onDisable() {
    this._unregisterNodeEvent();

    this._stopSubContextMainLoop();
  },
  update: function update(dt) {
    var calledUpdateMannually = dt === undefined;

    if (calledUpdateMannually) {
      this._context && this._context.postMessage({
        fromEngine: true,
        event: 'step'
      });

      this._updateSubContextTexture();

      return;
    }

    var now = performance.now();
    var deltaTime = now - this._updatedTime;

    if (deltaTime >= this._updateInterval) {
      this._updatedTime += this._updateInterval;

      this._updateSubContextTexture();
    }
  },
  _updateSubContextTexture: function _updateSubContextTexture() {
    if (!this._tex || !this._context) {
      return;
    }

    this._tex.initWithElement(this._context.canvas);

    this._sprite._activateMaterial();
  },

  /**
   * !#en Update the sub context viewport manually, it should be called whenever the node's bounding box changes.
   * !#zh 更新开放数据域相对于主域的 viewport，这个函数应该在节点包围盒改变时手动调用。
   * @method updateSubContextViewport
   */
  updateSubContextViewport: function updateSubContextViewport() {
    if (this._context) {
      var box = this.node.getBoundingBoxToWorld();
      var sx = cc.view._scaleX;
      var sy = cc.view._scaleY;

      this._context.postMessage({
        fromEngine: true,
        event: 'viewport',
        x: box.x * sx + cc.view._viewportRect.x,
        y: box.y * sy + cc.view._viewportRect.y,
        width: box.width * sx,
        height: box.height * sy
      });
    }
  },
  _registerNodeEvent: function _registerNodeEvent() {
    this.node.on('position-changed', this.updateSubContextViewport, this);
    this.node.on('scale-changed', this.updateSubContextViewport, this);
    this.node.on('size-changed', this.updateSubContextViewport, this);
  },
  _unregisterNodeEvent: function _unregisterNodeEvent() {
    this.node.off('position-changed', this.updateSubContextViewport, this);
    this.node.off('scale-changed', this.updateSubContextViewport, this);
    this.node.off('size-changed', this.updateSubContextViewport, this);
  },
  _runSubContextMainLoop: function _runSubContextMainLoop() {
    if (this._context) {
      this._context.postMessage({
        fromEngine: true,
        event: 'mainLoop',
        value: true
      });
    }
  },
  _stopSubContextMainLoop: function _stopSubContextMainLoop() {
    if (this._context) {
      this._context.postMessage({
        fromEngine: true,
        event: 'mainLoop',
        value: false
      });
    }
  },
  _updateSubContextFrameRate: function _updateSubContextFrameRate() {
    if (this._context) {
      this._context.postMessage({
        fromEngine: true,
        event: 'frameRate',
        value: this._fps
      });
    }
  }
});
cc.SubContextView = module.exports = SubContextView;
/**
 * !#en WXSubContextView is deprecated since v2.4.1, please use SubContextView instead.
 * !#zh 自 v2.4.1 起，WXSubContextView 已经废弃，请使用 SubContextView
 * @class WXSubContextView
 * @extends Component
 * @deprecated since v2.4.1
 */

cc.WXSubContextView = SubContextView;
/**
 * !#en SwanSubContextView is deprecated since v2.4.1, please use SubContextView instead.
 * !#zh 自 v2.4.1 起，SwanSubContextView 已经废弃，请使用 SubContextView
 * @class SwanSubContextView
 * @extends Component
 * @deprecated since v2.4.1
 */

cc.SwanSubContextView = SubContextView;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvU3ViQ29udGV4dFZpZXcuanMiXSwibmFtZXMiOlsiQ29tcG9uZW50IiwicmVxdWlyZSIsIlN1YkNvbnRleHRWaWV3IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwiaGVscCIsInByb3BlcnRpZXMiLCJfZmlyc3RseUVuYWJsZWQiLCJfZnBzIiwiZnBzIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJfdXBkYXRlSW50ZXJ2YWwiLCJfdXBkYXRlU3ViQ29udGV4dEZyYW1lUmF0ZSIsInRvb2x0aXAiLCJDQ19ERVYiLCJjdG9yIiwiX3Nwcml0ZSIsIl90ZXgiLCJUZXh0dXJlMkQiLCJfY29udGV4dCIsIl91cGRhdGVkVGltZSIsInBlcmZvcm1hbmNlIiwibm93Iiwib25Mb2FkIiwid2luZG93IiwiX19nbG9iYWxBZGFwdGVyIiwiZ2V0T3BlbkRhdGFDb250ZXh0IiwicmVzZXQiLCJzaGFyZWRDYW52YXMiLCJjYW52YXMiLCJzZXRQcmVtdWx0aXBseUFscGhhIiwiaW5pdFdpdGhFbGVtZW50Iiwibm9kZSIsImdldENvbXBvbmVudCIsIlNwcml0ZSIsImFkZENvbXBvbmVudCIsInNyY0JsZW5kRmFjdG9yIiwibWFjcm8iLCJCbGVuZEZhY3RvciIsIk9ORSIsInNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJlbmFibGVkIiwidXBkYXRlU3ViQ29udGV4dFZpZXdwb3J0Iiwid2lkdGgiLCJoZWlnaHQiLCJvbkVuYWJsZSIsInBvc3RNZXNzYWdlIiwiZnJvbUVuZ2luZSIsImV2ZW50IiwiX3J1blN1YkNvbnRleHRNYWluTG9vcCIsIl9yZWdpc3Rlck5vZGVFdmVudCIsIm9uRGlzYWJsZSIsIl91bnJlZ2lzdGVyTm9kZUV2ZW50IiwiX3N0b3BTdWJDb250ZXh0TWFpbkxvb3AiLCJ1cGRhdGUiLCJkdCIsImNhbGxlZFVwZGF0ZU1hbm51YWxseSIsInVuZGVmaW5lZCIsIl91cGRhdGVTdWJDb250ZXh0VGV4dHVyZSIsImRlbHRhVGltZSIsIl9hY3RpdmF0ZU1hdGVyaWFsIiwiYm94IiwiZ2V0Qm91bmRpbmdCb3hUb1dvcmxkIiwic3giLCJ2aWV3IiwiX3NjYWxlWCIsInN5IiwiX3NjYWxlWSIsIngiLCJfdmlld3BvcnRSZWN0IiwieSIsIm9uIiwib2ZmIiwibW9kdWxlIiwiZXhwb3J0cyIsIldYU3ViQ29udGV4dFZpZXciLCJTd2FuU3ViQ29udGV4dFZpZXciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQU1BLFNBQVMsR0FBR0MsT0FBTyxDQUFDLGVBQUQsQ0FBekI7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLElBQUlDLGNBQWMsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDMUJDLEVBQUFBLElBQUksRUFBRSxtQkFEb0I7QUFFMUIsYUFBU0wsU0FGaUI7QUFJMUJNLEVBQUFBLE1BQU0sRUFBRUMsU0FBUyxJQUFJO0FBQ2pCQyxJQUFBQSxJQUFJLEVBQUUsZ0RBRFc7QUFFakJDLElBQUFBLElBQUksRUFBRTtBQUZXLEdBSks7QUFTMUJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxlQUFlLEVBQUUsSUFEVDtBQUdSQyxJQUFBQSxJQUFJLEVBQUUsRUFIRTtBQUtSQyxJQUFBQSxHQUFHLEVBQUU7QUFDREMsTUFBQUEsR0FEQyxpQkFDTTtBQUNILGVBQU8sS0FBS0YsSUFBWjtBQUNILE9BSEE7QUFJREcsTUFBQUEsR0FKQyxlQUlJQyxLQUpKLEVBSVc7QUFDUixZQUFJLEtBQUtKLElBQUwsS0FBY0ksS0FBbEIsRUFBeUI7QUFDckI7QUFDSDs7QUFDRCxhQUFLSixJQUFMLEdBQVlJLEtBQVo7QUFDQSxhQUFLQyxlQUFMLEdBQXVCLElBQUlELEtBQTNCOztBQUNBLGFBQUtFLDBCQUFMO0FBQ0gsT0FYQTtBQVlEQyxNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSTtBQVpsQjtB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dEJ2QyxRQUFBQSxLQUFLLEVBQUU7QUFIZSxPQUExQjtBQUtIO0FBQ0osR0FwS3lCO0FBc0sxQjRDLEVBQUFBLHVCQXRLMEIscUNBc0tDO0FBQ3ZCLFFBQUksS0FBS25DLFFBQVQsRUFBbUI7QUFDZixXQUFLQSxRQUFMLENBQWM0QixXQUFkLENBQTBCO0FBQ3RCQyxRQUFBQSxVQUFVLEVBQUUsSUFEVTtBQUV0QkMsUUFBQUEsS0FBSyxFQUFFLFVBRmU7QUFHdEJ2QyxRQUFBQSxLQUFLLEVBQUU7QUFIZSxPQUExQjtBQUtIO0FBQ0osR0E5S3lCO0FBZ0wxQkUsRUFBQUEsMEJBaEwwQix3Q0FnTEk7QUFDMUIsUUFBSSxLQUFLTyxRQUFULEVBQW1CO0FBQ2YsV0FBS0EsUUFBTCxDQUFjNEIsV0FBZCxDQUEwQjtBQUN0QkMsUUFBQUEsVUFBVSxFQUFFLElBRFU7QUFFdEJDLFFBQUFBLEtBQUssRUFBRSxXQUZlO0FBR3RCdkMsUUFBQUEsS0FBSyxFQUFFLEtBQUtKO0FBSFUsT0FBMUI7QUFLSDtBQUNKO0FBeEx5QixDQUFULENBQXJCO0FBMkxBVCxFQUFFLENBQUNELGNBQUgsR0FBb0I4RSxNQUFNLENBQUNDLE9BQVAsR0FBaUIvRSxjQUFyQztBQUVBOzs7Ozs7OztBQU9BQyxFQUFFLENBQUMrRSxnQkFBSCxHQUFzQmhGLGNBQXRCO0FBRUE7Ozs7Ozs7O0FBT0FDLEVBQUUsQ0FBQ2dGLGtCQUFILEdBQXdCakYsY0FBeEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAyMCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IENvbXBvbmVudCA9IHJlcXVpcmUoJy4vQ0NDb21wb25lbnQnKTtcblxuLyoqXG4gKiAhI2VuIFN1YkNvbnRleHRWaWV3IGlzIGEgdmlldyBjb21wb25lbnQgd2hpY2ggY29udHJvbHMgb3BlbiBkYXRhIGNvbnRleHQgdmlld3BvcnQgaW4gbWluaWdhbWUgcGxhdGZvcm0uPGJyLz5cbiAqIFRoZSBjb21wb25lbnQncyBub2RlIHNpemUgZGVjaWRlIHRoZSB2aWV3cG9ydCBvZiB0aGUgc3ViIGNvbnRleHQgY29udGVudCBpbiBtYWluIGNvbnRleHQsIFxuICogdGhlIGVudGlyZSBzdWIgY29udGV4dCB0ZXh0dXJlIHdpbGwgYmUgc2NhbGVkIHRvIHRoZSBub2RlJ3MgYm91bmRpbmcgYm94IGFyZWEuPGJyLz5cbiAqIFRoaXMgY29tcG9uZW50IHByb3ZpZGVzIG11bHRpcGxlIGltcG9ydGFudCBmZWF0dXJlczo8YnIvPlxuICogMS4gU3ViIGNvbnRleHQgY291bGQgdXNlIGl0cyBvd24gcmVzb2x1dGlvbiBzaXplIGFuZCBwb2xpY3kuPGJyLz5cbiAqIDIuIFN1YiBjb250ZXh0IGNvdWxkIGJlIG1pbml6ZWQgdG8gc21hbGxlc3Qgc2l6ZSBpdCBuZWVkZWQuPGJyLz5cbiAqIDMuIFJlc29sdXRpb24gb2Ygc3ViIGNvbnRleHQgY29udGVudCBjb3VsZCBiZSBpbmNyZWFzZWQuPGJyLz5cbiAqIDQuIFVzZXIgdG91Y2ggaW5wdXQgaXMgdHJhbnNmb3JtZWQgdG8gdGhlIGNvcnJlY3Qgdmlld3BvcnQuPGJyLz5cbiAqIDUuIFRleHR1cmUgdXBkYXRlIGlzIGhhbmRsZWQgYnkgdGhpcyBjb21wb25lbnQuIFVzZXIgZG9uJ3QgbmVlZCB0byB3b3JyeS48YnIvPlxuICogT25lIGltcG9ydGFudCB0aGluZyB0byBiZSBub3RlZCwgd2hlbmV2ZXIgdGhlIG5vZGUncyBib3VuZGluZyBib3ggY2hhbmdlLCBcbiAqICEjemggU3ViQ29udGV4dFZpZXcg5Y+v5Lul55So5p2l5o6n5Yi25bCP5ri45oiP5bmz5Y+w5byA5pS+5pWw5o2u5Z+f5Zyo5Li75Z+f5Lit55qE6KeG56qX55qE5L2N572u44CCPGJyLz5cbiAqIOi/meS4que7hOS7tueahOiKgueCueWwuuWvuOWGs+WumuS6huW8gOaUvuaVsOaNruWfn+WGheWuueWcqOS4u+Wfn+S4reeahOWwuuWvuO+8jOaVtOS4quW8gOaUvuaVsOaNruWfn+S8muiiq+e8qeaUvuWIsOiKgueCueeahOWMheWbtOebkuiMg+WbtOWGheOAgjxici8+XG4gKiDlnKjov5nkuKrnu4Tku7bnmoTmjqfliLbkuIvvvIznlKjmiLflj6/ku6Xmm7Toh6rnlLHlvpfmjqfliLblvIDmlL7mlbDmja7ln5/vvJo8YnIvPlxuICogMS4g5a2Q5Z+f5Lit5Y+v5Lul5L2/55So54us56uL55qE6K6+6K6h5YiG6L6o546H5ZKM6YCC6YWN5qih5byPPGJyLz5cbiAqIDIuIOWtkOWfn+WMuuWfn+WwuuWvuOWPr+S7pee8qeWwj+WIsOWPquWuuee6s+WGheWuueWNs+WPrzxici8+XG4gKiAzLiDlrZDln5/nmoTliIbovqjnjofkuZ/lj6/ku6XooqvmlL7lpKfvvIzku6Xkvr/ojrflvpfmm7TmuIXmmbDnmoTmmL7npLrmlYjmnpw8YnIvPlxuICogNC4g55So5oi36L6T5YWl5Z2Q5qCH5Lya6KKr6Ieq5Yqo6L2s5o2i5Yiw5q2j56Gu55qE5a2Q5Z+f6KeG56qX5LitPGJyLz5cbiAqIDUuIOWtkOWfn+WGheWuuei0tOWbvueahOabtOaWsOeUsee7hOS7tui0n+i0o++8jOeUqOaIt+S4jemcgOimgeWkhOeQhjxici8+XG4gKiBAY2xhc3MgU3ViQ29udGV4dFZpZXdcbiAqIEBleHRlbmRzIENvbXBvbmVudFxuICovXG5sZXQgU3ViQ29udGV4dFZpZXcgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlN1YkNvbnRleHRWaWV3JyxcbiAgICBleHRlbmRzOiBDb21wb25lbnQsXG5cbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQub3RoZXJzL1N1YkNvbnRleHRWaWV3JyxcbiAgICAgICAgaGVscDogJ2kxOG46Q09NUE9ORU5ULmhlbHBfdXJsLnN1YmNvbnRleHRfdmlldycsXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX2ZpcnN0bHlFbmFibGVkOiB0cnVlLFxuICAgICAgICBcbiAgICAgICAgX2ZwczogNjAsXG5cbiAgICAgICAgZnBzOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9mcHM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9mcHMgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fZnBzID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlSW50ZXJ2YWwgPSAxIC8gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3ViQ29udGV4dEZyYW1lUmF0ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc3ViY29udGV4dF92aWV3LmZwcydcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjdG9yICgpIHtcbiAgICAgICAgdGhpcy5fc3ByaXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdGV4ID0gbmV3IGNjLlRleHR1cmUyRCgpO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdXBkYXRlZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlSW50ZXJ2YWwgPSAwO1xuICAgIH0sXG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICAvLyBTZXR1cCBzdWJjb250ZXh0IGNhbnZhcyBzaXplXG4gICAgICAgIGlmICh3aW5kb3cuX19nbG9iYWxBZGFwdGVyICYmIF9fZ2xvYmFsQWRhcHRlci5nZXRPcGVuRGF0YUNvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUludGVydmFsID0gMTAwMCAvIHRoaXMuX2ZwcztcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQgPSBfX2dsb2JhbEFkYXB0ZXIuZ2V0T3BlbkRhdGFDb250ZXh0KCk7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICBsZXQgc2hhcmVkQ2FudmFzID0gdGhpcy5fY29udGV4dC5jYW52YXM7XG4gICAgICAgICAgICB0aGlzLl90ZXguc2V0UHJlbXVsdGlwbHlBbHBoYSh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuX3RleC5pbml0V2l0aEVsZW1lbnQoc2hhcmVkQ2FudmFzKTtcblxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9zcHJpdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zcHJpdGUgPSB0aGlzLm5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlLnNyY0JsZW5kRmFjdG9yID0gY2MubWFjcm8uQmxlbmRGYWN0b3IuT05FO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRoaXMuX3RleCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJlc2V0IG9wZW4gZGF0YSBjb250ZXh0IHNpemUgYW5kIHZpZXdwb3J0XG4gICAgICogISN6aCDph43nva7lvIDmlL7mlbDmja7ln5/nmoTlsLrlr7jlkozop4bnqpdcbiAgICAgKiBAbWV0aG9kIHJlc2V0XG4gICAgICovXG4gICAgcmVzZXQgKCkge1xuICAgICAgICBpZiAodGhpcy5fY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTdWJDb250ZXh0Vmlld3BvcnQoKTtcbiAgICAgICAgICAgIGxldCBzaGFyZWRDYW52YXMgPSB0aGlzLl9jb250ZXh0LmNhbnZhcztcbiAgICAgICAgICAgIGlmIChzaGFyZWRDYW52YXMpIHtcbiAgICAgICAgICAgICAgICBzaGFyZWRDYW52YXMud2lkdGggPSB0aGlzLm5vZGUud2lkdGg7XG4gICAgICAgICAgICAgICAgc2hhcmVkQ2FudmFzLmhlaWdodCA9IHRoaXMubm9kZS5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25FbmFibGUgKCkge1xuICAgICAgICBpZiAodGhpcy5fZmlyc3RseUVuYWJsZWQgJiYgdGhpcy5fY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgZnJvbUVuZ2luZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBldmVudDogJ2Jvb3QnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9maXJzdGx5RW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcnVuU3ViQ29udGV4dE1haW5Mb29wKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJOb2RlRXZlbnQoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU3ViQ29udGV4dEZyYW1lUmF0ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVN1YkNvbnRleHRWaWV3cG9ydCgpO1xuICAgIH0sXG5cbiAgICBvbkRpc2FibGUgKCkge1xuICAgICAgICB0aGlzLl91bnJlZ2lzdGVyTm9kZUV2ZW50KCk7XG4gICAgICAgIHRoaXMuX3N0b3BTdWJDb250ZXh0TWFpbkxvb3AoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlIChkdCkge1xuICAgICAgICBsZXQgY2FsbGVkVXBkYXRlTWFubnVhbGx5ID0gKGR0ID09PSB1bmRlZmluZWQpO1xuICAgICAgICBpZiAoY2FsbGVkVXBkYXRlTWFubnVhbGx5KSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0ICYmIHRoaXMuX2NvbnRleHQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGZyb21FbmdpbmU6IHRydWUsXG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdzdGVwJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3ViQ29udGV4dFRleHR1cmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIGxldCBkZWx0YVRpbWUgPSAobm93IC0gdGhpcy5fdXBkYXRlZFRpbWUpO1xuICAgICAgICBpZiAoZGVsdGFUaW1lID49IHRoaXMuX3VwZGF0ZUludGVydmFsKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVkVGltZSArPSB0aGlzLl91cGRhdGVJbnRlcnZhbDtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN1YkNvbnRleHRUZXh0dXJlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3VwZGF0ZVN1YkNvbnRleHRUZXh0dXJlICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl90ZXggfHwgIXRoaXMuX2NvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90ZXguaW5pdFdpdGhFbGVtZW50KHRoaXMuX2NvbnRleHQuY2FudmFzKTtcbiAgICAgICAgdGhpcy5fc3ByaXRlLl9hY3RpdmF0ZU1hdGVyaWFsKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVXBkYXRlIHRoZSBzdWIgY29udGV4dCB2aWV3cG9ydCBtYW51YWxseSwgaXQgc2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgbm9kZSdzIGJvdW5kaW5nIGJveCBjaGFuZ2VzLlxuICAgICAqICEjemgg5pu05paw5byA5pS+5pWw5o2u5Z+f55u45a+55LqO5Li75Z+f55qEIHZpZXdwb3J077yM6L+Z5Liq5Ye95pWw5bqU6K+l5Zyo6IqC54K55YyF5Zu055uS5pS55Y+Y5pe25omL5Yqo6LCD55So44CCXG4gICAgICogQG1ldGhvZCB1cGRhdGVTdWJDb250ZXh0Vmlld3BvcnRcbiAgICAgKi9cbiAgICB1cGRhdGVTdWJDb250ZXh0Vmlld3BvcnQgKCkge1xuICAgICAgICBpZiAodGhpcy5fY29udGV4dCkge1xuICAgICAgICAgICAgbGV0IGJveCA9IHRoaXMubm9kZS5nZXRCb3VuZGluZ0JveFRvV29ybGQoKTtcbiAgICAgICAgICAgIGxldCBzeCA9IGNjLnZpZXcuX3NjYWxlWDtcbiAgICAgICAgICAgIGxldCBzeSA9IGNjLnZpZXcuX3NjYWxlWTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGZyb21FbmdpbmU6IHRydWUsXG4gICAgICAgICAgICAgICAgZXZlbnQ6ICd2aWV3cG9ydCcsXG4gICAgICAgICAgICAgICAgeDogYm94LnggKiBzeCArIGNjLnZpZXcuX3ZpZXdwb3J0UmVjdC54LFxuICAgICAgICAgICAgICAgIHk6IGJveC55ICogc3kgKyBjYy52aWV3Ll92aWV3cG9ydFJlY3QueSxcbiAgICAgICAgICAgICAgICB3aWR0aDogYm94LndpZHRoICogc3gsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBib3guaGVpZ2h0ICogc3lcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9yZWdpc3Rlck5vZGVFdmVudCAoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vbigncG9zaXRpb24tY2hhbmdlZCcsIHRoaXMudXBkYXRlU3ViQ29udGV4dFZpZXdwb3J0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKCdzY2FsZS1jaGFuZ2VkJywgdGhpcy51cGRhdGVTdWJDb250ZXh0Vmlld3BvcnQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oJ3NpemUtY2hhbmdlZCcsIHRoaXMudXBkYXRlU3ViQ29udGV4dFZpZXdwb3J0LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgX3VucmVnaXN0ZXJOb2RlRXZlbnQgKCkge1xuICAgICAgICB0aGlzLm5vZGUub2ZmKCdwb3NpdGlvbi1jaGFuZ2VkJywgdGhpcy51cGRhdGVTdWJDb250ZXh0Vmlld3BvcnQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKCdzY2FsZS1jaGFuZ2VkJywgdGhpcy51cGRhdGVTdWJDb250ZXh0Vmlld3BvcnQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKCdzaXplLWNoYW5nZWQnLCB0aGlzLnVwZGF0ZVN1YkNvbnRleHRWaWV3cG9ydCwgdGhpcyk7XG4gICAgfSxcblxuICAgIF9ydW5TdWJDb250ZXh0TWFpbkxvb3AgKCkge1xuICAgICAgICBpZiAodGhpcy5fY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgZnJvbUVuZ2luZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBldmVudDogJ21haW5Mb29wJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9zdG9wU3ViQ29udGV4dE1haW5Mb29wICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGZyb21FbmdpbmU6IHRydWUsXG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdtYWluTG9vcCcsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3VwZGF0ZVN1YkNvbnRleHRGcmFtZVJhdGUgKCkge1xuICAgICAgICBpZiAodGhpcy5fY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgZnJvbUVuZ2luZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBldmVudDogJ2ZyYW1lUmF0ZScsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuX2ZwcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn0pO1xuXG5jYy5TdWJDb250ZXh0VmlldyA9IG1vZHVsZS5leHBvcnRzID0gU3ViQ29udGV4dFZpZXc7XG5cbi8qKlxuICogISNlbiBXWFN1YkNvbnRleHRWaWV3IGlzIGRlcHJlY2F0ZWQgc2luY2UgdjIuNC4xLCBwbGVhc2UgdXNlIFN1YkNvbnRleHRWaWV3IGluc3RlYWQuXG4gKiAhI3poIOiHqiB2Mi40LjEg6LW377yMV1hTdWJDb250ZXh0VmlldyDlt7Lnu4/lup/lvIPvvIzor7fkvb/nlKggU3ViQ29udGV4dFZpZXdcbiAqIEBjbGFzcyBXWFN1YkNvbnRleHRWaWV3XG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjQuMVxuICovXG5jYy5XWFN1YkNvbnRleHRWaWV3ID0gU3ViQ29udGV4dFZpZXc7XG5cbi8qKlxuICogISNlbiBTd2FuU3ViQ29udGV4dFZpZXcgaXMgZGVwcmVjYXRlZCBzaW5jZSB2Mi40LjEsIHBsZWFzZSB1c2UgU3ViQ29udGV4dFZpZXcgaW5zdGVhZC5cbiAqICEjemgg6IeqIHYyLjQuMSDotbfvvIxTd2FuU3ViQ29udGV4dFZpZXcg5bey57uP5bqf5byD77yM6K+35L2/55SoIFN1YkNvbnRleHRWaWV3XG4gKiBAY2xhc3MgU3dhblN1YkNvbnRleHRWaWV3XG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjQuMVxuICovXG5jYy5Td2FuU3ViQ29udGV4dFZpZXcgPSBTdWJDb250ZXh0VmlldzsiXSwic291cmNlUm9vdCI6Ii8ifQ==