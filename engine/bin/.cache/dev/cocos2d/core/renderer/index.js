
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _gfx = _interopRequireDefault(require("../../renderer/gfx"));

var _inputAssembler = _interopRequireDefault(require("../../renderer/core/input-assembler"));

var _pass = _interopRequireDefault(require("../../renderer/core/pass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
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
// const RenderFlow = require('./render-flow');
function _initBuiltins(device) {
  var defaultTexture = new _gfx["default"].Texture2D(device, {
    images: [],
    width: 128,
    height: 128,
    wrapS: _gfx["default"].WRAP_REPEAT,
    wrapT: _gfx["default"].WRAP_REPEAT,
    format: _gfx["default"].TEXTURE_FMT_RGB8,
    mipmap: false
  });
  return {
    defaultTexture: defaultTexture,
    programTemplates: [],
    programChunks: {}
  };
}
/**
 * @module cc
 */

/**
 * !#en The renderer object which provide access to render system APIs, 
 * detailed APIs will be available progressively.
 * !#zh 提供基础渲染接口的渲染器对象，渲染层的基础接口将逐步开放给用户
 * @class renderer
 * @static
 */


var _default = cc.renderer = {
  Texture2D: null,
  InputAssembler: _inputAssembler["default"],
  Pass: _pass["default"],

  /**
   * !#en The render engine is available only after cc.game.EVENT_ENGINE_INITED event.<br/>
   * Normally it will be inited as the webgl render engine, but in wechat open context domain,
   * it will be inited as the canvas render engine. Canvas render engine is no longer available for other use case since v2.0.
   * !#zh 基础渲染引擎对象只在 cc.game.EVENT_ENGINE_INITED 事件触发后才可获取。<br/>
   * 大多数情况下，它都会是 WebGL 渲染引擎实例，但是在微信开放数据域当中，它会是 Canvas 渲染引擎实例。请注意，从 2.0 开始，我们在其他平台和环境下都废弃了 Canvas 渲染器。
   * @property renderEngine
   * @deprecated
   * @type {Object}
   */
  renderEngine: null,

  /*
   * !#en The canvas object which provides the rendering context
   * !#zh 用于渲染的 Canvas 对象
   * @property canvas
   * @type {HTMLCanvasElement}
   */
  canvas: null,

  /*
   * !#en The device object which provides device related rendering functionality, it divers for different render engine type.
   * !#zh 提供设备渲染能力的对象，它对于不同的渲染环境功能也不相同。
   * @property device
   * @type {renderer.Device}
   */
  device: null,
  scene: null,

  /**
   * !#en The total draw call count in last rendered frame.
   * !#zh 上一次渲染帧所提交的渲染批次总数。
   * @property drawCalls
   * @type {Number}
   */
  drawCalls: 0,
  // Render component handler
  _handle: null,
  _cameraNode: null,
  _camera: null,
  _forward: null,
  _flow: null,
  initWebGL: function initWebGL(canvas, opts) {
    require('./webgl/assemblers');

    var ModelBatcher = require('./webgl/model-batcher');

    this.Texture2D = _gfx["default"].Texture2D;
    this.canvas = canvas;
    this._flow = cc.RenderFlow;

    if (CC_JSB && CC_NATIVERENDERER) {
      // native codes will create an instance of Device, so just use the global instance.
      this.device = _gfx["default"].Device.getInstance();
      this.scene = new renderer.Scene();

      var builtins = _initBuiltins(this.device);

      this._forward = new renderer.ForwardRenderer(this.device, builtins);
      var nativeFlow = new renderer.RenderFlow(this.device, this.scene, this._forward);

      this._flow.init(nativeFlow);
    } else {
      var Scene = require('../../renderer/scene/scene');

      var ForwardRenderer = require('../../renderer/renderers/forward-renderer');

      this.device = new _gfx["default"].Device(canvas, opts);
      this.scene = new Scene();

      var _builtins = _initBuiltins(this.device);

      this._forward = new ForwardRenderer(this.device, _builtins);
      this._handle = new ModelBatcher(this.device, this.scene);

      this._flow.init(this._handle, this._forward);
    }
  },
  initCanvas: function initCanvas(canvas) {
    var canvasRenderer = require('./canvas');

    var Texture2D = require('./canvas/Texture2D');

    var Device = require('./canvas/Device'); // It's actually running with original render engine


    this.Device = Device;
    this.Texture2D = Texture2D;
    this.canvas = canvas;
    this.device = new Device(canvas);
    this._camera = {
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      tx: 0,
      ty: 0
    };
    this._handle = new canvasRenderer.RenderComponentHandle(this.device, this._camera);
    this._forward = new canvasRenderer.ForwardRenderer();
    this._flow = cc.RenderFlow;

    this._flow.init(this._handle, this._forward);
  },
  updateCameraViewport: function updateCameraViewport() {
    // TODO: remove HACK
    if (!CC_EDITOR && cc.director) {
      var ecScene = cc.director.getScene();
      if (ecScene) ecScene.setScale(1, 1, 1);
    }

    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
      var vp = cc.view.getViewportRect();
      this.device.setViewport(vp.x, vp.y, vp.width, vp.height);
      this._camera.a = cc.view.getScaleX();
      this._camera.d = cc.view.getScaleY();
      this._camera.tx = vp.x;
      this._camera.ty = vp.y + vp.height;
    }
  },
  render: function render(ecScene, dt) {
    this.device.resetDrawCalls();

    if (ecScene) {
      // walk entity component scene to generate models
      this._flow.render(ecScene, dt);

      this.drawCalls = this.device.getDrawCalls();
    }
  },
  clear: function clear() {
    this._handle.reset();

    this._forward.clear();
  }
};

exports["default"] = _default;
module.exports = exports["default"];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2luZGV4LmpzIl0sIm5hbWVzIjpbIl9pbml0QnVpbHRpbnMiLCJkZXZpY2UiLCJkZWZhdWx0VGV4dHVyZSIsImdmeCIsIlRleHR1cmUyRCIsImltYWdlcyIsIndpZHRoIiwiaGVpZ2h0Iiwid3JhcFMiLCJXUkFQX1JFUEVBVCIsIndyYXBUIiwiZm9ybWF0IiwiVEVYVFVSRV9GTVRfUkdCOCIsIm1pcG1hcCIsInByb2dyYW1UZW1wbGF0ZXMiLCJwcm9ncmFtQ2h1bmtzIiwiY2MiLCJyZW5kZXJlciIsIklucHV0QXNzZW1ibGVyIiwiUGFzcyIsInJlbmRlckVuZ2luZSIsImNhbnZhcyIsInNjZW5lIiwiZHJhd0NhbGxzIiwiX2hhbmRsZSIsIl9jYW1lcmFOb2RlIiwiX2NhbWVyYSIsIl9mb3J3YXJkIiwiX2Zsb3ciLCJpbml0V2ViR0wiLCJvcHRzIiwicmVxdWlyZSIsIk1vZGVsQmF0Y2hlciIsIlJlbmRlckZsb3ciLCJDQ19KU0IiLCJDQ19OQVRJVkVSRU5ERVJFUiIsIkRldmljZSIsImdldEluc3RhbmNlIiwiU2NlbmUiLCJidWlsdGlucyIsIkZvcndhcmRSZW5kZXJlciIsIm5hdGl2ZUZsb3ciLCJpbml0IiwiaW5pdENhbnZhcyIsImNhbnZhc1JlbmRlcmVyIiwiYSIsImIiLCJjIiwiZCIsInR4IiwidHkiLCJSZW5kZXJDb21wb25lbnRIYW5kbGUiLCJ1cGRhdGVDYW1lcmFWaWV3cG9ydCIsIkNDX0VESVRPUiIsImRpcmVjdG9yIiwiZWNTY2VuZSIsImdldFNjZW5lIiwic2V0U2NhbGUiLCJnYW1lIiwicmVuZGVyVHlwZSIsIlJFTkRFUl9UWVBFX0NBTlZBUyIsInZwIiwidmlldyIsImdldFZpZXdwb3J0UmVjdCIsInNldFZpZXdwb3J0IiwieCIsInkiLCJnZXRTY2FsZVgiLCJnZXRTY2FsZVkiLCJyZW5kZXIiLCJkdCIsInJlc2V0RHJhd0NhbGxzIiwiZ2V0RHJhd0NhbGxzIiwiY2xlYXIiLCJy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QWpCO0FBQ0EsV0FBSzFDLE9BQUwsQ0FBYXVCLEVBQWIsR0FBa0JZLEVBQUUsQ0FBQ0ksQ0FBckI7QUFDQSxXQUFLdkMsT0FBTCxDQUFhd0IsRUFBYixHQUFrQlcsRUFBRSxDQUFDSyxDQUFILEdBQU9MLEVBQUUsQ0FBQ3RELE1BQTVCO0FBQ0g7QUFDSixHQWhId0I7QUFrSHpCOEQsRUFBQUEsTUFsSHlCLGtCQWtIakJkLE9BbEhpQixFQWtIUmUsRUFsSFEsRUFrSEo7QUFDakIsU0FBS3JFLE1BQUwsQ0FBWXNFLGNBQVo7O0FBQ0EsUUFBSWhCLE9BQUosRUFBYTtBQUNUO0FBQ0EsV0FBSzNCLEtBQUwsQ0FBV3lDLE1BQVgsQ0FBa0JkLE9BQWxCLEVBQTJCZSxFQUEzQjs7QUFDQSxXQUFLL0MsU0FBTCxHQUFpQixLQUFLdEIsTUFBTCxDQUFZdUUsWUFBWixFQUFqQjtBQUNIO0FBQ0osR0F6SHdCO0FBMkh6QkMsRUFBQUEsS0EzSHlCLG1CQTJIaEI7QUFDTCxTQUFLakQsT0FBTCxDQUFha0QsS0FBYjs7QUFDQSxTQUFLL0MsUUFBTCxDQUFjOEMsS0FBZDtBQUNIO0FBOUh3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5pbXBvcnQgZ2Z4IGZyb20gJy4uLy4uL3JlbmRlcmVyL2dmeCc7XG5cbmltcG9ydCBJbnB1dEFzc2VtYmxlciBmcm9tICcuLi8uLi9yZW5kZXJlci9jb3JlL2lucHV0LWFzc2VtYmxlcic7XG5pbXBvcnQgUGFzcyBmcm9tICcuLi8uLi9yZW5kZXJlci9jb3JlL3Bhc3MnO1xuXG4vLyBjb25zdCBSZW5kZXJGbG93ID0gcmVxdWlyZSgnLi9yZW5kZXItZmxvdycpO1xuXG5mdW5jdGlvbiBfaW5pdEJ1aWx0aW5zKGRldmljZSkge1xuICAgIGxldCBkZWZhdWx0VGV4dHVyZSA9IG5ldyBnZnguVGV4dHVyZTJEKGRldmljZSwge1xuICAgICAgICBpbWFnZXM6IFtdLFxuICAgICAgICB3aWR0aDogMTI4LFxuICAgICAgICBoZWlnaHQ6IDEyOCxcbiAgICAgICAgd3JhcFM6IGdmeC5XUkFQX1JFUEVBVCxcbiAgICAgICAgd3JhcFQ6IGdmeC5XUkFQX1JFUEVBVCxcbiAgICAgICAgZm9ybWF0OiBnZnguVEVYVFVSRV9GTVRfUkdCOCxcbiAgICAgICAgbWlwbWFwOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRlZmF1bHRUZXh0dXJlOiBkZWZhdWx0VGV4dHVyZSxcbiAgICAgICAgcHJvZ3JhbVRlbXBsYXRlczogW10sXG4gICAgICAgIHByb2dyYW1DaHVua3M6IHt9LFxuICAgIH07XG59XG5cbi8qKlxuICogQG1vZHVsZSBjY1xuICovXG5cbi8qKlxuICogISNlbiBUaGUgcmVuZGVyZXIgb2JqZWN0IHdoaWNoIHByb3ZpZGUgYWNjZXNzIHRvIHJlbmRlciBzeXN0ZW0gQVBJcywgXG4gKiBkZXRhaWxlZCBBUElzIHdpbGwgYmUgYXZhaWxhYmxlIHByb2dyZXNzaXZlbHkuXG4gKiAhI3poIOaPkOS+m+WfuuehgOa4suafk+aOpeWPo+eahOa4suafk+WZqOWvueixoe+8jOa4suafk+WxgueahOWfuuehgOaOpeWPo+WwhumAkOatpeW8gOaUvue7meeUqOaIt1xuICogQGNsYXNzIHJlbmRlcmVyXG4gKiBAc3RhdGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNjLnJlbmRlcmVyID0ge1xuICAgIFRleHR1cmUyRDogbnVsbCxcblxuICAgIElucHV0QXNzZW1ibGVyOiBJbnB1dEFzc2VtYmxlcixcbiAgICBQYXNzOiBQYXNzLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgcmVuZGVyIGVuZ2luZSBpcyBhdmFpbGFibGUgb25seSBhZnRlciBjYy5nYW1lLkVWRU5UX0VOR0lORV9JTklURUQgZXZlbnQuPGJyLz5cbiAgICAgKiBOb3JtYWxseSBpdCB3aWxsIGJlIGluaXRlZCBhcyB0aGUgd2ViZ2wgcmVuZGVyIGVuZ2luZSwgYnV0IGluIHdlY2hhdCBvcGVuIGNvbnRleHQgZG9tYWluLFxuICAgICAqIGl0IHdpbGwgYmUgaW5pdGVkIGFzIHRoZSBjYW52YXMgcmVuZGVyIGVuZ2luZS4gQ2FudmFzIHJlbmRlciBlbmdpbmUgaXMgbm8gbG9uZ2VyIGF2YWlsYWJsZSBmb3Igb3RoZXIgdXNlIGNhc2Ugc2luY2UgdjIuMC5cbiAgICAgKiAhI3poIOWfuuehgOa4suafk+W8leaTjuWvueixoeWPquWcqCBjYy5nYW1lLkVWRU5UX0VOR0lORV9JTklURUQg5LqL5Lu26Kem5Y+R5ZCO5omN5Y+v6I635Y+W44CCPGJyLz5cbiAgICAgKiDlpKflpJrmlbDmg4XlhrXkuIvvvIzlroPpg73kvJrmmK8gV2ViR0wg5riy5p+T5byV5pOO5a6e5L6L77yM5L2G5piv5Zyo5b6u5L+h5byA5pS+5pWw5o2u5Z+f5b2T5Lit77yM5a6D5Lya5pivIENhbnZhcyDmuLLmn5PlvJXmk47lrp7kvovjgILor7fms6jmhI/vvIzku44gMi4wIOW8gOWni++8jOaIkeS7rOWcqOWFtuS7luW5s+WPsOWSjOeOr+Wig+S4i+mDveW6n+W8g+S6hiBDYW52YXMg5riy5p+T5Zmo44CCXG4gICAgICogQHByb3BlcnR5IHJlbmRlckVuZ2luZVxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICByZW5kZXJFbmdpbmU6IG51bGwsXG5cbiAgICAvKlxuICAgICAqICEjZW4gVGhlIGNhbnZhcyBvYmplY3Qgd2hpY2ggcHJvdmlkZXMgdGhlIHJlbmRlcmluZyBjb250ZXh0XG4gICAgICogISN6aCDnlKjkuo7muLLmn5PnmoQgQ2FudmFzIOWvueixoVxuICAgICAqIEBwcm9wZXJ0eSBjYW52YXNcbiAgICAgKiBAdHlwZSB7SFRNTENhbnZhc0VsZW1lbnR9XG4gICAgICovXG4gICAgY2FudmFzOiBudWxsLFxuICAgIC8qXG4gICAgICogISNlbiBUaGUgZGV2aWNlIG9iamVjdCB3aGljaCBwcm92aWRlcyBkZXZpY2UgcmVsYXRlZCByZW5kZXJpbmcgZnVuY3Rpb25hbGl0eSwgaXQgZGl2ZXJzIGZvciBkaWZmZXJlbnQgcmVuZGVyIGVuZ2luZSB0eXBlLlxuICAgICAqICEjemgg5o+Q5L6b6K6+5aSH5riy5p+T6IO95Yqb55qE5a+56LGh77yM5a6D5a+55LqO5LiN5ZCM55qE5riy5p+T546v5aKD5Yqf6IO95Lmf5LiN55u45ZCM44CCXG4gICAgICogQHByb3BlcnR5IGRldmljZVxuICAgICAqIEB0eXBlIHtyZW5kZXJlci5EZXZpY2V9XG4gICAgICovXG4gICAgZGV2aWNlOiBudWxsLFxuICAgIHNjZW5lOiBudWxsLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHRvdGFsIGRyYXcgY2FsbCBjb3VudCBpbiBsYXN0IHJlbmRlcmVkIGZyYW1lLlxuICAgICAqICEjemgg5LiK5LiA5qyh5riy5p+T5bin5omA5o+Q5Lqk55qE5riy5p+T5om55qyh5oC75pWw44CCXG4gICAgICogQHByb3BlcnR5IGRyYXdDYWxsc1xuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZHJhd0NhbGxzOiAwLFxuICAgIC8vIFJlbmRlciBjb21wb25lbnQgaGFuZGxlclxuICAgIF9oYW5kbGU6IG51bGwsXG4gICAgX2NhbWVyYU5vZGU6IG51bGwsXG4gICAgX2NhbWVyYTogbnVsbCxcbiAgICBfZm9yd2FyZDogbnVsbCxcbiAgICBfZmxvdzogbnVsbCxcblxuICAgIGluaXRXZWJHTCAoY2FudmFzLCBvcHRzKSB7XG4gICAgICAgIHJlcXVpcmUoJy4vd2ViZ2wvYXNzZW1ibGVycycpO1xuICAgICAgICBjb25zdCBNb2RlbEJhdGNoZXIgPSByZXF1aXJlKCcuL3dlYmdsL21vZGVsLWJhdGNoZXInKTtcblxuICAgICAgICB0aGlzLlRleHR1cmUyRCA9IGdmeC5UZXh0dXJlMkQ7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLl9mbG93ID0gY2MuUmVuZGVyRmxvdztcbiAgICAgICAgXG4gICAgICAgIGlmIChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICAgICAgICAgIC8vIG5hdGl2ZSBjb2RlcyB3aWxsIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiBEZXZpY2UsIHNvIGp1c3QgdXNlIHRoZSBnbG9iYWwgaW5zdGFuY2UuXG4gICAgICAgICAgICB0aGlzLmRldmljZSA9IGdmeC5EZXZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgcmVuZGVyZXIuU2NlbmUoKTtcbiAgICAgICAgICAgIGxldCBidWlsdGlucyA9IF9pbml0QnVpbHRpbnModGhpcy5kZXZpY2UpO1xuICAgICAgICAgICAgdGhpcy5fZm9yd2FyZCA9IG5ldyByZW5kZXJlci5Gb3J3YXJkUmVuZGVyZXIodGhpcy5kZXZpY2UsIGJ1aWx0aW5zKTtcbiAgICAgICAgICAgIGxldCBuYXRpdmVGbG93ID0gbmV3IHJlbmRlcmVyLlJlbmRlckZsb3codGhpcy5kZXZpY2UsIHRoaXMuc2NlbmUsIHRoaXMuX2ZvcndhcmQpO1xuICAgICAgICAgICAgdGhpcy5fZmxvdy5pbml0KG5hdGl2ZUZsb3cpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IFNjZW5lID0gcmVxdWlyZSgnLi4vLi4vcmVuZGVyZXIvc2NlbmUvc2NlbmUnKTtcbiAgICAgICAgICAgIGxldCBGb3J3YXJkUmVuZGVyZXIgPSByZXF1aXJlKCcuLi8uLi9yZW5kZXJlci9yZW5kZXJlcnMvZm9yd2FyZC1yZW5kZXJlcicpO1xuICAgICAgICAgICAgdGhpcy5kZXZpY2UgPSBuZXcgZ2Z4LkRldmljZShjYW52YXMsIG9wdHMpO1xuICAgICAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBTY2VuZSgpO1xuICAgICAgICAgICAgbGV0IGJ1aWx0aW5zID0gX2luaXRCdWlsdGlucyh0aGlzLmRldmljZSk7XG4gICAgICAgICAgICB0aGlzLl9mb3J3YXJkID0gbmV3IEZvcndhcmRSZW5kZXJlcih0aGlzLmRldmljZSwgYnVpbHRpbnMpO1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlID0gbmV3IE1vZGVsQmF0Y2hlcih0aGlzLmRldmljZSwgdGhpcy5zY2VuZSk7XG4gICAgICAgICAgICB0aGlzLl9mbG93LmluaXQodGhpcy5faGFuZGxlLCB0aGlzLl9mb3J3YXJkKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpbml0Q2FudmFzIChjYW52YXMpIHtcbiAgICAgICAgY29uc3QgY2FudmFzUmVuZGVyZXIgPSByZXF1aXJlKCcuL2NhbnZhcycpO1xuICAgICAgICBjb25zdCBUZXh0dXJlMkQgPSByZXF1aXJlKCcuL2NhbnZhcy9UZXh0dXJlMkQnKTtcbiAgICAgICAgY29uc3QgRGV2aWNlID0gcmVxdWlyZSgnLi9jYW52YXMvRGV2aWNlJyk7XG5cbiAgICAgICAgLy8gSXQncyBhY3R1YWxseSBydW5uaW5nIHdpdGggb3JpZ2luYWwgcmVuZGVyIGVuZ2luZVxuICAgICAgICB0aGlzLkRldmljZSA9IERldmljZTtcblxuICAgICAgICB0aGlzLlRleHR1cmUyRCA9IFRleHR1cmUyRDtcblxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5kZXZpY2UgPSBuZXcgRGV2aWNlKGNhbnZhcyk7XG4gICAgICAgIHRoaXMuX2NhbWVyYSA9IHtcbiAgICAgICAgICAgIGE6IDEsIGI6IDAsIGM6IDAsIGQ6IDEsIHR4OiAwLCB0eTogMFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9oYW5kbGUgPSBuZXcgY2FudmFzUmVuZGVyZXIuUmVuZGVyQ29tcG9uZW50SGFuZGxlKHRoaXMuZGV2aWNlLCB0aGlzLl9jYW1lcmEpO1xuICAgICAgICB0aGlzLl9mb3J3YXJkID0gbmV3IGNhbnZhc1JlbmRlcmVyLkZvcndhcmRSZW5kZXJlcigpO1xuICAgICAgICB0aGlzLl9mbG93ID0gY2MuUmVuZGVyRmxvdztcbiAgICAgICAgdGhpcy5fZmxvdy5pbml0KHRoaXMuX2hhbmRsZSwgdGhpcy5fZm9yd2FyZCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZUNhbWVyYVZpZXdwb3J0ICgpIHtcbiAgICAgICAgLy8gVE9ETzogcmVtb3ZlIEhBQ0tcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgY2MuZGlyZWN0b3IpIHtcbiAgICAgICAgICAgIGxldCBlY1NjZW5lID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcbiAgICAgICAgICAgIGlmIChlY1NjZW5lKSBlY1NjZW5lLnNldFNjYWxlKDEsIDEsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNjLmdhbWUucmVuZGVyVHlwZSA9PT0gY2MuZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMpIHtcbiAgICAgICAgICAgIGxldCB2cCA9IGNjLnZpZXcuZ2V0Vmlld3BvcnRSZWN0KCk7XG4gICAgICAgICAgICB0aGlzLmRldmljZS5zZXRWaWV3cG9ydCh2cC54LCB2cC55LCB2cC53aWR0aCwgdnAuaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuX2NhbWVyYS5hID0gY2Mudmlldy5nZXRTY2FsZVgoKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbWVyYS5kID0gY2Mudmlldy5nZXRTY2FsZVkoKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbWVyYS50eCA9IHZwLng7XG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEudHkgPSB2cC55ICsgdnAuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbmRlciAoZWNTY2VuZSwgZHQpIHtcbiAgICAgICAgdGhpcy5kZXZpY2UucmVzZXREcmF3Q2FsbHMoKTtcbiAgICAgICAgaWYgKGVjU2NlbmUpIHtcbiAgICAgICAgICAgIC8vIHdhbGsgZW50aXR5IGNvbXBvbmVudCBzY2VuZSB0byBnZW5lcmF0ZSBtb2RlbHNcbiAgICAgICAgICAgIHRoaXMuX2Zsb3cucmVuZGVyKGVjU2NlbmUsIGR0KTtcbiAgICAgICAgICAgIHRoaXMuZHJhd0NhbGxzID0gdGhpcy5kZXZpY2UuZ2V0RHJhd0NhbGxzKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY2xlYXIgKCkge1xuICAgICAgICB0aGlzLl9oYW5kbGUucmVzZXQoKTtcbiAgICAgICAgdGhpcy5fZm9yd2FyZC5jbGVhcigpO1xuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==