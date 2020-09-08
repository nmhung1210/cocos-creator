
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/webview/CCWebView.js';
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
var WebViewImpl = require('./webview-impl');
/**
 * !#en WebView event type
 * !#zh 网页视图事件类型
 * @enum WebView.EventType
 */


var EventType = WebViewImpl.EventType;
/**
 * !#en Web page Load completed.
 * !#zh  网页加载完成
 * @property {String} LOADED
 */

/**
 * !#en Web page is loading.
 * !#zh  网页加载中
 * @property {String} LOADING
 */

/**
 * !#en Web page error occurs when loading.
 * !#zh  网页加载出错
 * @property {String} ERROR
 */
//

function emptyCallback() {}
/**
 * !#en cc.WebView is a component for display web pages in the game. Because different platforms have different authorization, API and control methods for WebView component. And have not yet formed a unified standard, only Web, iOS, and Android platforms are currently supported.
 * !#zh WebView 组件，用于在游戏中显示网页。由于不同平台对于 WebView 组件的授权、API、控制方式都不同，还没有形成统一的标准，所以目前只支持 Web、iOS 和 Android 平台。
 * @class WebView
 * @extends Component
 */


var WebView = cc.Class({
  name: 'cc.WebView',
  "extends": cc.Component,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/WebView',
    executeInEditMode: true
  },
  properties: {
    _useOriginalSize: true,
    _url: '',

    /**
     * !#en A given URL to be loaded by the WebView, it should have a http or https prefix.
     * !#zh 指定 WebView 加载的网址，它应该是一个 http 或者 https 开头的字符串
     * @property {String} url
     */
    url: {
      type: cc.String,
      tooltip: CC_DEV && 'i18n:COMPONENT.webview.url',
      get: function get() {
        return this._url;
      },
      set: function set(url) {
        this._url = url;
        var impl = this._impl;

        if (impl) {
          impl.loadURL(url);
        }
      }
    },

    /**
     * !#en The webview's event callback , it will be triggered when certain webview event occurs.
     * !#zh WebView 的回调事件，当网页加载过程中，加载完成后或者加载出错时都会回调此函数
     * @property {Component.EventHandler[]} webviewLoadedEvents
     */
    webviewEvents: {
      "default": [],
      type: cc.Component.EventHandler
    }
  },
  statics: {
    EventType: EventType,
    // Impl will be overrided in the different platform.
    Impl: WebViewImpl
  },
  ctor: function ctor() {
    this._impl = new WebView.Impl();
  },
  onRestore: function onRestore() {
    if (!this._impl) {
      this._impl = new WebView.Impl();
    }
  },
  onEnable: function onEnable() {
    var impl = this._impl;
    impl.createDomElementIfNeeded(this.node.width, this.node.height);

    if (!CC_EDITOR) {
      impl.setEventListener(EventType.LOADED, this._onWebViewLoaded.bind(this));
      impl.setEventListener(EventType.LOADING, this._onWebViewLoading.bind(this));
      impl.setEventListener(EventType.ERROR, this._onWebViewLoadError.bind(this));
    }

    impl.loadURL(this._url);
    impl.setVisible(true);
  },
  onDisable: function onDisable() {
    var impl = this._impl;
    impl.setVisible(false);

    if (!CC_EDITOR) {
      impl.setEventListener(EventType.LOADED, emptyCallback);
      impl.setEventListener(EventType.LOADING, emptyCallback);
      impl.setEventListener(EventType.ERROR, emptyCallback);
    }
  },
  onDestroy: function onDestroy() {
    if (this._impl) {
      this._impl.destroy();

      this._impl = null;
    }
  },
  update: function update(dt) {
    if (this._impl) {
      this._impl.updateMatrix(this.node);
    }
  },
  _onWebViewLoaded: function _onWebViewLoaded() {
    cc.Component.EventHandler.emitEvents(this.webviewEvents, this, EventType.LOADED);
    this.node.emit('loaded', this);
  },
  _onWebViewLoading: function _onWebViewLoading() {
    cc.Component.EventHandler.emitEvents(this.webviewEvents, this, EventType.LOADING);
    this.node.emit('loading', this);
    return true;
  },
  _onWebViewLoadError: function _onWebViewLoadError() {
    cc.Component.EventHandler.emitEvents(this.webviewEvents, this, EventType.ERROR);
    this.node.emit('error', this);
  },

  /**
   * !#en
   * Set javascript interface scheme (see also setOnJSCallback). <br/>
   * Note: Supports only on the Android and iOS. For HTML5, please refer to the official documentation.<br/>
   * Please refer to the official documentation for more details.
   * !#zh
   * 设置 JavaScript 接口方案（与 'setOnJSCallback' 配套使用）。<br/>
   * 注意：只支持 Android 和 iOS ，Web 端用法请前往官方文档查看。<br/>
   * 详情请参阅官方文档
   * @method setJavascriptInterfaceScheme
   * @param {String} scheme
   */
  setJavascriptInterfaceScheme: function setJavascriptInterfaceScheme(scheme) {
    if (this._impl) {
      this._impl.setJavascriptInterfaceScheme(scheme);
    }
  },

  /**
   * !#en
   * This callback called when load URL that start with javascript
   * interface scheme (see also setJavascriptInterfaceScheme). <br/>
   * Note: Supports only on the Android and iOS. For HTML5, please refer to the official documentation.<br/>
   * Please refer to the official documentation for more details.
   * !#zh
   * 当加载 URL 以 JavaScript 接口方案开始时调用这个回调函数。<br/>
   * 注意：只支持 Android 和 iOS，Web 端用法请前往官方文档查看。
   * 详情请参阅官方文档
   * @method setOnJSCallback
   * @param {Function} callback
   */
  setOnJSCallback: function setOnJSCallback(callback) {
    if (this._impl) {
      this._impl.setOnJSCallback(callback);
    }
  },

  /**
   * !#en
   * Evaluates JavaScript in the context of the currently displayed page. <br/>
   * Please refer to the official document for more details <br/>
   * Note: Cross domain issues need to be resolved by yourself <br/>
   * !#zh
   * 执行 WebView 内部页面脚本（详情请参阅官方文档） <br/>
   * 注意：需要自行解决跨域问题
   * @method evaluateJS
   * @param {String} str
   */
  evaluateJS: function evaluateJS(str) {
    if (this._impl) {
      this._impl.evaluateJS(str);
    }
  }
});
cc.WebView = module.exports = WebView;
/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event loaded
 * @param {Event.EventCustom} event
 * @param {WebView} webView - The WebView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event loading
 * @param {Event.EventCustom} event
 * @param {WebView} webView - The WebView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event error
 * @param {Event.EventCustom} event
 * @param {WebView} webView - The WebView component.
 */

/**
 * !#en if you don't need the WebView and it isn't in any running Scene, you should
 * call the destroy method on this component or the associated node explicitly.
 * Otherwise, the created DOM element won't be removed from web page.
 * !#zh
 * 如果你不再使用 WebView，并且组件未添加到场景中，那么你必须手动对组件或所在节点调用 destroy。
 * 这样才能移除网页上的 DOM 节点，避免 Web 平台内存泄露。
 * @example
 * webview.node.parent = null;  // or  webview.node.removeFromParent(false);
 * // when you don't need webview anymore
 * webview.node.destroy();
 * @method destroy
 * @return {Boolean} whether it is the first time the destroy being called
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC93ZWJ2aWV3L0NDV2ViVmlldy5qcyJdLCJuYW1lcyI6WyJXZWJWaWV3SW1wbCIsInJlcXVpcmUiLCJFdmVudFR5cGUiLCJlbXB0eUNhbGxiYWNrIiwiV2ViVmlldyIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImV4ZWN1dGVJbkVkaXRNb2RlIiwicHJvcGVydGllcyIsIl91c2VPcmlnaW5hbFNpemUiLCJfdXJsIiwidXJsIiwidHlwZSIsIlN0cmluZyIsInRvb2x0aXAiLCJDQ19ERVYiLCJnZXQiLCJzZXQiLCJpbXBsIiwiX2ltcGwiLCJsb2FkVVJMIiwid2Vidmlld0V2ZW50cyIsIkV2ZW50SGFuZGxlciIsInN0YXRpY3MiLCJJbXBsIiwiY3RvciIsIm9uUmVzdG9yZSIsIm9uRW5hYmxlIiwiY3JlYXRlRG9tRWxlbWVudElmTmVlZGVkIiwibm9kZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2V0RXZlbnRMaXN0ZW5lciIsIkxPQURFRCIsIl9vbldlYlZpZXdMb2FkZWQiLCJiaW5kIiwiTE9BRElORyIsIl9vbldlYlZpZXdMb2FkaW5nIiwiRVJST1IiLCJfb25XZWJWaWV3TG9hZEVycm9yIiwic2V0VmlzaWJsZSIsIm9uRGlzYWJsZSIsIm9uRGVzdHJveSIsImRlc3Ryb3kiLCJ1cGRhdGUiLCJkdCIsInVwZGF0ZU1hdHJpeCIsImVtaXRFdmVudHMiLCJlbWl0Iiwic2V0SmF2YXNjcmlwdEludGVyZmFjZVNjaGVtZSIsInNjaGVtZSIsInNldE9uSlNDYWxsYmFjayIsImNhbGxiYWNrIiwiZXZhbHVhdGVKUyIsInN0ciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFNQSxXQUFXLEdBQUdDLE9BQU8sQ0FBQyxnQkFBRCxDQUEzQjtBQUVBOzs7Ozs7O0FBS0EsSUFB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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBXZWJWaWV3SW1wbCA9IHJlcXVpcmUoJy4vd2Vidmlldy1pbXBsJyk7XG5cbi8qKlxuICogISNlbiBXZWJWaWV3IGV2ZW50IHR5cGVcbiAqICEjemgg572R6aG16KeG5Zu+5LqL5Lu257G75Z6LXG4gKiBAZW51bSBXZWJWaWV3LkV2ZW50VHlwZVxuICovXG5jb25zdCBFdmVudFR5cGUgPSBXZWJWaWV3SW1wbC5FdmVudFR5cGU7XG5cblxuLyoqXG4gKiAhI2VuIFdlYiBwYWdlIExvYWQgY29tcGxldGVkLlxuICogISN6aCAg572R6aG15Yqg6L295a6M5oiQXG4gKiBAcHJvcGVydHkge1N0cmluZ30gTE9BREVEXG4gKi9cblxuLyoqXG4gKiAhI2VuIFdlYiBwYWdlIGlzIGxvYWRpbmcuXG4gKiAhI3poICDnvZHpobXliqDovb3kuK1cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMT0FESU5HXG4gKi9cblxuLyoqXG4gKiAhI2VuIFdlYiBwYWdlIGVycm9yIG9jY3VycyB3aGVuIGxvYWRpbmcuXG4gKiAhI3poICDnvZHpobXliqDovb3lh7rplJlcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBFUlJPUlxuICovXG5cbi8vXG5mdW5jdGlvbiBlbXB0eUNhbGxiYWNrICgpIHsgfVxuXG4vKipcbiAqICEjZW4gY2MuV2ViVmlldyBpcyBhIGNvbXBvbmVudCBmb3IgZGlzcGxheSB3ZWIgcGFnZXMgaW4gdGhlIGdhbWUuIEJlY2F1c2UgZGlmZmVyZW50IHBsYXRmb3JtcyBoYXZlIGRpZmZlcmVudCBhdXRob3JpemF0aW9uLCBBUEkgYW5kIGNvbnRyb2wgbWV0aG9kcyBmb3IgV2ViVmlldyBjb21wb25lbnQuIEFuZCBoYXZlIG5vdCB5ZXQgZm9ybWVkIGEgdW5pZmllZCBzdGFuZGFyZCwgb25seSBXZWIsIGlPUywgYW5kIEFuZHJvaWQgcGxhdGZvcm1zIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLlxuICogISN6aCBXZWJWaWV3IOe7hOS7tu+8jOeUqOS6juWcqOa4uOaIj+S4reaYvuekuue9kemhteOAgueUseS6juS4jeWQjOW5s+WPsOWvueS6jiBXZWJWaWV3IOe7hOS7tueahOaOiOadg+OAgUFQSeOAgeaOp+WItuaWueW8j+mDveS4jeWQjO+8jOi/mOayoeacieW9ouaIkOe7n+S4gOeahOagh+WHhu+8jOaJgOS7peebruWJjeWPquaUr+aMgSBXZWLjgIFpT1Mg5ZKMIEFuZHJvaWQg5bmz5Y+w44CCXG4gKiBAY2xhc3MgV2ViVmlld1xuICogQGV4dGVuZHMgQ29tcG9uZW50XG4gKi9cbmxldCBXZWJWaWV3ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5XZWJWaWV3JyxcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQudWkvV2ViVmlldycsXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX3VzZU9yaWdpbmFsU2l6ZTogdHJ1ZSxcblxuICAgICAgICBfdXJsOiAnJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQSBnaXZlbiBVUkwgdG8gYmUgbG9hZGVkIGJ5IHRoZSBXZWJWaWV3LCBpdCBzaG91bGQgaGF2ZSBhIGh0dHAgb3IgaHR0cHMgcHJlZml4LlxuICAgICAgICAgKiAhI3poIOaMh+WumiBXZWJWaWV3IOWKoOi9veeahOe9keWdgO+8jOWug+W6lOivpeaYr+S4gOS4qiBodHRwIOaIluiAhSBodHRwcyDlvIDlpLTnmoTlrZfnrKbkuLJcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IHVybFxuICAgICAgICAgKi9cbiAgICAgICAgdXJsOiB7XG4gICAgICAgICAgICB0eXBlOiBjYy5TdHJpbmcsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULndlYnZpZXcudXJsJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl91cmw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXJsID0gdXJsO1xuICAgICAgICAgICAgICAgIGxldCBpbXBsID0gdGhpcy5faW1wbDtcbiAgICAgICAgICAgICAgICBpZiAoaW1wbCkge1xuICAgICAgICAgICAgICAgICAgICBpbXBsLmxvYWRVUkwodXJsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIHdlYnZpZXcncyBldmVudCBjYWxsYmFjayAsIGl0IHdpbGwgYmUgdHJpZ2dlcmVkIHdoZW4gY2VydGFpbiB3ZWJ2aWV3IGV2ZW50IG9jY3Vycy5cbiAgICAgICAgICogISN6aCBXZWJWaWV3IOeahOWbnuiwg+S6i+S7tu+8jOW9k+e9kemhteWKoOi9vei/h+eoi+S4re+8jOWKoOi9veWujOaIkOWQjuaIluiAheWKoOi9veWHuumUmeaXtumDveS8muWbnuiwg+atpOWHveaVsFxuICAgICAgICAgKiBAcHJvcGVydHkge0NvbXBvbmVudC5FdmVudEhhbmRsZXJbXX0gd2Vidmlld0xvYWRlZEV2ZW50c1xuICAgICAgICAgKi9cbiAgICAgICAgd2Vidmlld0V2ZW50czoge1xuICAgICAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgICAgICB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLFxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIEV2ZW50VHlwZTogRXZlbnRUeXBlLFxuICAgICAgICAvLyBJbXBsIHdpbGwgYmUgb3ZlcnJpZGVkIGluIHRoZSBkaWZmZXJlbnQgcGxhdGZvcm0uXG4gICAgICAgIEltcGw6IFdlYlZpZXdJbXBsXG4gICAgfSxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICB0aGlzLl9pbXBsID0gbmV3IFdlYlZpZXcuSW1wbCgpO1xuICAgIH0sXG5cbiAgICBvblJlc3RvcmUgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2ltcGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2ltcGwgPSBuZXcgV2ViVmlldy5JbXBsKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25FbmFibGUgKCkge1xuICAgICAgICBsZXQgaW1wbCA9IHRoaXMuX2ltcGw7XG4gICAgICAgIGltcGwuY3JlYXRlRG9tRWxlbWVudElmTmVlZGVkKHRoaXMubm9kZS53aWR0aCwgdGhpcy5ub2RlLmhlaWdodCk7XG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICBpbXBsLnNldEV2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLkxPQURFRCwgdGhpcy5fb25XZWJWaWV3TG9hZGVkLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgaW1wbC5zZXRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5MT0FESU5HLCB0aGlzLl9vbldlYlZpZXdMb2FkaW5nLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgaW1wbC5zZXRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5FUlJPUiwgdGhpcy5fb25XZWJWaWV3TG9hZEVycm9yLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIGltcGwubG9hZFVSTCh0aGlzLl91cmwpO1xuICAgICAgICBpbXBsLnNldFZpc2libGUodHJ1ZSk7XG4gICAgfSxcblxuICAgIG9uRGlzYWJsZSAoKSB7XG4gICAgICAgIGxldCBpbXBsID0gdGhpcy5faW1wbDtcbiAgICAgICAgaW1wbC5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIGltcGwuc2V0RXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuTE9BREVELCBlbXB0eUNhbGxiYWNrKTtcbiAgICAgICAgICAgIGltcGwuc2V0RXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuTE9BRElORywgZW1wdHlDYWxsYmFjayk7XG4gICAgICAgICAgICBpbXBsLnNldEV2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLkVSUk9SLCBlbXB0eUNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3kgKCkge1xuICAgICAgICBpZiAodGhpcy5faW1wbCkge1xuICAgICAgICAgICAgdGhpcy5faW1wbC5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLl9pbXBsID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLl9pbXBsKSB7XG4gICAgICAgICAgICB0aGlzLl9pbXBsLnVwZGF0ZU1hdHJpeCh0aGlzLm5vZGUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9vbldlYlZpZXdMb2FkZWQgKCkge1xuICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy53ZWJ2aWV3RXZlbnRzLCB0aGlzLCBFdmVudFR5cGUuTE9BREVEKTtcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoJ2xvYWRlZCcsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBfb25XZWJWaWV3TG9hZGluZyAoKSB7XG4gICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyh0aGlzLndlYnZpZXdFdmVudHMsIHRoaXMsIEV2ZW50VHlwZS5MT0FESU5HKTtcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoJ2xvYWRpbmcnLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIF9vbldlYlZpZXdMb2FkRXJyb3IgKCkge1xuICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy53ZWJ2aWV3RXZlbnRzLCB0aGlzLCBFdmVudFR5cGUuRVJST1IpO1xuICAgICAgICB0aGlzLm5vZGUuZW1pdCgnZXJyb3InLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldCBqYXZhc2NyaXB0IGludGVyZmFjZSBzY2hlbWUgKHNlZSBhbHNvIHNldE9uSlNDYWxsYmFjaykuIDxici8+XG4gICAgICogTm90ZTogU3VwcG9ydHMgb25seSBvbiB0aGUgQW5kcm9pZCBhbmQgaU9TLiBGb3IgSFRNTDUsIHBsZWFzZSByZWZlciB0byB0aGUgb2ZmaWNpYWwgZG9jdW1lbnRhdGlvbi48YnIvPlxuICAgICAqIFBsZWFzZSByZWZlciB0byB0aGUgb2ZmaWNpYWwgZG9jdW1lbnRhdGlvbiBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqICEjemhcbiAgICAgKiDorr7nva4gSmF2YVNjcmlwdCDmjqXlj6PmlrnmoYjvvIjkuI4gJ3NldE9uSlNDYWxsYmFjaycg6YWN5aWX5L2/55So77yJ44CCPGJyLz5cbiAgICAgKiDms6jmhI/vvJrlj6rmlK/mjIEgQW5kcm9pZCDlkowgaU9TIO+8jFdlYiDnq6/nlKjms5Xor7fliY3lvoDlrpjmlrnmlofmoaPmn6XnnIvjgII8YnIvPlxuICAgICAqIOivpuaDheivt+WPgumYheWumOaWueaWh+aho1xuICAgICAqIEBtZXRob2Qgc2V0SmF2YXNjcmlwdEludGVyZmFjZVNjaGVtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzY2hlbWVcbiAgICAgKi9cbiAgICBzZXRKYXZhc2NyaXB0SW50ZXJmYWNlU2NoZW1lIChzY2hlbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2ltcGwuc2V0SmF2YXNjcmlwdEludGVyZmFjZVNjaGVtZShzY2hlbWUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUaGlzIGNhbGxiYWNrIGNhbGxlZCB3aGVuIGxvYWQgVVJMIHRoYXQgc3RhcnQgd2l0aCBqYXZhc2NyaXB0XG4gICAgICogaW50ZXJmYWNlIHNjaGVtZSAoc2VlIGFsc28gc2V0SmF2YXNjcmlwdEludGVyZmFjZVNjaGVtZSkuIDxici8+XG4gICAgICogTm90ZTogU3VwcG9ydHMgb25seSBvbiB0aGUgQW5kcm9pZCBhbmQgaU9TLiBGb3IgSFRNTDUsIHBsZWFzZSByZWZlciB0byB0aGUgb2ZmaWNpYWwgZG9jdW1lbnRhdGlvbi48YnIvPlxuICAgICAqIFBsZWFzZSByZWZlciB0byB0aGUgb2ZmaWNpYWwgZG9jdW1lbnRhdGlvbiBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqICEjemhcbiAgICAgKiDlvZPliqDovb0gVVJMIOS7pSBKYXZhU2NyaXB0IOaOpeWPo+aWueahiOW8gOWni+aXtuiwg+eUqOi/meS4quWbnuiwg+WHveaVsOOAgjxici8+XG4gICAgICog5rOo5oSP77ya5Y+q5pSv5oyBIEFuZHJvaWQg5ZKMIGlPU++8jFdlYiDnq6/nlKjms5Xor7fliY3lvoDlrpjmlrnmlofmoaPmn6XnnIvjgIJcbiAgICAgKiDor6bmg4Xor7flj4LpmIXlrpjmlrnmlofmoaNcbiAgICAgKiBAbWV0aG9kIHNldE9uSlNDYWxsYmFja1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG4gICAgc2V0T25KU0NhbGxiYWNrIChjYWxsYmFjaykge1xuICAgICAgICBpZiAodGhpcy5faW1wbCkge1xuICAgICAgICAgICAgdGhpcy5faW1wbC5zZXRPbkpTQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBFdmFsdWF0ZXMgSmF2YVNjcmlwdCBpbiB0aGUgY29udGV4dCBvZiB0aGUgY3VycmVudGx5IGRpc3BsYXllZCBwYWdlLiA8YnIvPlxuICAgICAqIFBsZWFzZSByZWZlciB0byB0aGUgb2ZmaWNpYWwgZG9jdW1lbnQgZm9yIG1vcmUgZGV0YWlscyA8YnIvPlxuICAgICAqIE5vdGU6IENyb3NzIGRvbWFpbiBpc3N1ZXMgbmVlZCB0byBiZSByZXNvbHZlZCBieSB5b3Vyc2VsZiA8YnIvPlxuICAgICAqICEjemhcbiAgICAgKiDmiafooYwgV2ViVmlldyDlhoXpg6jpobXpnaLohJrmnKzvvIjor6bmg4Xor7flj4LpmIXlrpjmlrnmlofmoaPvvIkgPGJyLz5cbiAgICAgKiDms6jmhI/vvJrpnIDopoHoh6rooYzop6PlhrPot6jln5/pl67pophcbiAgICAgKiBAbWV0aG9kIGV2YWx1YXRlSlNcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAgICovXG4gICAgZXZhbHVhdGVKUyAoc3RyKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbXBsKSB7XG4gICAgICAgICAgICB0aGlzLl9pbXBsLmV2YWx1YXRlSlMoc3RyKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbn0pO1xuXG5jYy5XZWJWaWV3ID0gbW9kdWxlLmV4cG9ydHMgPSBXZWJWaWV3O1xuLyoqXG4gKiAhI2VuXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXG4gKiAhI3poXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcbiAqIEBldmVudCBsb2FkZWRcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XG4gKiBAcGFyYW0ge1dlYlZpZXd9IHdlYlZpZXcgLSBUaGUgV2ViVmlldyBjb21wb25lbnQuXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXG4gKiAhI3poXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcbiAqIEBldmVudCBsb2FkaW5nXG4gKiBAcGFyYW0ge0V2ZW50LkV2ZW50Q3VzdG9tfSBldmVudFxuICogQHBhcmFtIHtXZWJWaWV3fSB3ZWJWaWV3IC0gVGhlIFdlYlZpZXcgY29tcG9uZW50LlxuICovXG5cbi8qKlxuICogISNlblxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxuICogISN6aFxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXG4gKiBAZXZlbnQgZXJyb3JcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XG4gKiBAcGFyYW0ge1dlYlZpZXd9IHdlYlZpZXcgLSBUaGUgV2ViVmlldyBjb21wb25lbnQuXG4gKi9cblxuLyoqXG4gKiAhI2VuIGlmIHlvdSBkb24ndCBuZWVkIHRoZSBXZWJWaWV3IGFuZCBpdCBpc24ndCBpbiBhbnkgcnVubmluZyBTY2VuZSwgeW91IHNob3VsZFxuICogY2FsbCB0aGUgZGVzdHJveSBtZXRob2Qgb24gdGhpcyBjb21wb25lbnQgb3IgdGhlIGFzc29jaWF0ZWQgbm9kZSBleHBsaWNpdGx5LlxuICogT3RoZXJ3aXNlLCB0aGUgY3JlYXRlZCBET00gZWxlbWVudCB3b24ndCBiZSByZW1vdmVkIGZyb20gd2ViIHBhZ2UuXG4gKiAhI3poXG4gKiDlpoLmnpzkvaDkuI3lho3kvb/nlKggV2ViVmlld++8jOW5tuS4lOe7hOS7tuacqua3u+WKoOWIsOWcuuaZr+S4re+8jOmCo+S5iOS9oOW/hemhu+aJi+WKqOWvuee7hOS7tuaIluaJgOWcqOiKgueCueiwg+eUqCBkZXN0cm9544CCXG4gKiDov5nmoLfmiY3og73np7vpmaTnvZHpobXkuIrnmoQgRE9NIOiKgueCue+8jOmBv+WFjSBXZWIg5bmz5Y+w5YaF5a2Y5rOE6Zyy44CCXG4gKiBAZXhhbXBsZVxuICogd2Vidmlldy5ub2RlLnBhcmVudCA9IG51bGw7ICAvLyBvciAgd2Vidmlldy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xuICogLy8gd2hlbiB5b3UgZG9uJ3QgbmVlZCB3ZWJ2aWV3IGFueW1vcmVcbiAqIHdlYnZpZXcubm9kZS5kZXN0cm95KCk7XG4gKiBAbWV0aG9kIGRlc3Ryb3lcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHdoZXRoZXIgaXQgaXMgdGhlIGZpcnN0IHRpbWUgdGhlIGRlc3Ryb3kgYmVpbmcgY2FsbGVkXG4gKi9cbiJdLCJzb3VyY2VSb290IjoiLyJ9