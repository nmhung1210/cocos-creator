
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCView.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var EventTarget = require('../event/event-target');

var js = require('../platform/js');

var renderer = require('../renderer');

require('../platform/CCClass');

var __BrowserGetter = {
  init: function init() {
    this.html = document.getElementsByTagName("html")[0];
  },
  availWidth: function availWidth(frame) {
    if (!frame || frame === this.html) return window.innerWidth;else return frame.clientWidth;
  },
  availHeight: function availHeight(frame) {
    if (!frame || frame === this.html) return window.innerHeight;else return frame.clientHeight;
  },
  meta: {
    "width": "device-width"
  },
  adaptationType: cc.sys.browserType
};
if (cc.sys.os === cc.sys.OS_IOS) // All browsers are WebView
  __BrowserGetter.adaptationType = cc.sys.BROWSER_TYPE_SAFARI;

switch (__BrowserGetter.adaptationType) {
  case cc.sys.BROWSER_TYPE_SAFARI:
  case cc.sys.BROWSER_TYPE_SOUGOU:
  case cc.sys.BROWSER_TYPE_UC:
    __BrowserGetter.meta["minimal-ui"] = "true";

    __BrowserGetter.availWidth = function (frame) {
      return frame.clientWidth;
    };

    __BrowserGetter.availHeight = function (frame) {
      return frame.clientHeight;
    };

    break;
}

var _scissorRect = null;
/**
 * cc.view is the singleton object which represents the game window.<br/>
 * It's main task include: <br/>
 *  - Apply the design resolution policy<br/>
 *  - Provide interaction with the window, like resize event on web, retina display support, etc...<br/>
 *  - Manage the game view port which can be different with the window<br/>
 *  - Manage the content scale and translation<br/>
 * <br/>
 * Since the cc.view is a singleton, you don't need to call any constructor or create functions,<br/>
 * the standard way to use it is by calling:<br/>
 *  - cc.view.methodName(); <br/>
 *
 * @class View
 * @extends EventTarget
 */

var View = function View() {
  EventTarget.call(this);

  var _t = this,
      _strategyer = cc.ContainerStrategy,
      _strategy = cc.ContentStrategy;

  __BrowserGetter.init(this); // Size of parent node that contains cc.game.container and cc.game.canvas


  _t._frameSize = cc.size(0, 0); // resolution size, it is the size appropriate for the app resources.

  _t._designResolutionSize = cc.size(0, 0);
  _t._originalDesignResolutionSize = cc.size(0, 0);
  _t._scaleX = 1;
  _t._scaleY = 1; // Viewport is the container's rect related to content's coordinates in pixel

  _t._viewportRect = cc.rect(0, 0, 0, 0); // The visible rect in content's coordinate in point

  _t._visibleRect = cc.rect(0, 0, 0, 0); // Auto full screen disabled by default

  _t._autoFullScreen = false; // The device's pixel ratio (for retina displays)

  _t._devicePixelRatio = 1;

  if (CC_JSB) {
    _t._maxPixelRatio = 4;
  } else {
    _t._maxPixelRatio = 2;
  } // Retina disabled by default


  _t._retinaEnabled = false; // Custom callback for resize event

  _t._resizeCallback = null;
  _t._resizing = false;
  _t._resizeWithBrowserSize = false;
  _t._orientationChanging = true;
  _t._isRotated = false;
  _t._orientation = cc.macro.ORIENTATION_AUTO;
  _t._isAdjustViewport = true;
  _t._antiAliasEnabled = false; // Setup system default resolution policies

  _t._resolutionPolicy = null;
  _t._rpExactFit = new cc.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.EXACT_FIT);
  _t._rpShowAll = new cc.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.SHOW_ALL);
  _t._rpNoBorder = new cc.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.NO_BORDER);
  _t._rpFixedHeight = new cc.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.FIXED_HEIGHT);
  _t._rpFixedWidth = new cc.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.FIXED_WIDTH);
  cc.game.once(cc.game.EVENT_ENGINE_INITED, this.init, this);
};

cc.js.extend(View, EventTarget);
cc.js.mixin(View.prototype, {
  init: function init() {
    this._initFrameSize();

    var w = cc.game.canvas.width,
        h = cc.game.canvas.height;
    this._designResolutionSize.width = w;
    this._designResolutionSize.height = h;
    this._originalDesignResolutionSize.width = w;
    this._originalDesignResolutionSize.height = h;
    this._viewportRect.width = w;
    this._viewportRect.height = h;
    this._visibleRect.width = w;
    this._visibleRect.height = h;
    cc.winSize.width = this._visibleRect.width;
    cc.winSize.height = this._visibleRect.height;
    cc.visibleRect && cc.visibleRect.init(this._visibleRect);
  },
  // Resize helper functions
  _resizeEvent: function _resizeEvent(forceOrEvent) {
    var view;

    if (this.setDesignResolutionSize) {
      view = this;
    } else {
      view = cc.view;
    } // HACK: some browsers can't update window size immediately
    // need to handle resize event callback on the next tick


    var sys = cc.sys;

    if (sys.browserType === sys.BROWSER_TYPE_UC && sys.os === sys.OS_IOS) {
      setTimeout(function () {
        view._resizeEvent(forceOrEvent);
      }, 0);
      return;
    } // Check frame size changed or not


    var prevFrameW = view._frameSize.width,
        prevFrameH = view._frameSize.height,
        prevRotated = view._isRotated;

    if (cc.sys.isMobile) {
      var containerStyle = cc.game.container.style,
          margin = containerStyle.margin;
      containerStyle.margin = '0';
      containerStyle.display = 'none';

      view._initFrameSize();

      containerStyle.margin = margin;
      containerStyle.display = 'block';
    } else {
      view._initFrameSize();
    }

    if (forceOrEvent !== true && view._isRotated === prevRotated && view._frameSize.width === prevFrameW && view._frameSize.height === prevFrameH) return; // Frame size changed, do resize works

    var width = view._originalDesignResolutionSize.width;
    var height = view._originalDesignResolutionSize.height;
    view._resizing = true;
    if (width > 0) view.setDesignResolutionSize(width, height, view._resolutionPolicy);
    view._resizing = false;
    view.emit('canvas-resize');

    if (view._resizeCallback) {
      view._resizeCallback.call();
    }
  },
  _orientationChange: function _orientationChange() {
    cc.view._orientationChanging = true;

    cc.view._resizeEvent(); // HACK: show nav bar on iOS safari
    // safari will enter fullscreen when rotate to landscape
    // need to exit fullscreen when rotate back to portrait, scrollTo(0, 1) works.


    if (cc.sys.browserType === cc.sys.BROWSER_TYPE_SAFARI && cc.sys.isMobile) {
      setTimeout(function () {
        if (window.innerHeight > window.innerWidth) {
          window.scrollTo(0, 1);
        }
      }, 500);
    }
  },
  _resize: function _resize() {
    //force resize when size is changed at native
    cc.view._resizeEvent(CC_JSB);
  },

  /**
   * !#en
   * Sets view's target-densitydpi for android mobile browser. it can be set to:           <br/>
   *   1. cc.macro.DENSITYDPI_DEVICE, value is "device-dpi"                                      <br/>
   *   2. cc.macro.DENSITYDPI_HIGH, value is "high-dpi"  (default value)                         <br/>
   *   3. cc.macro.DENSITYDPI_MEDIUM, value is "medium-dpi" (browser's default value)            <br/>
   *   4. cc.macro.DENSITYDPI_LOW, value is "low-dpi"                                            <br/>
   *   5. Custom value, e.g: "480"                                                         <br/>
   * !#zh 设置目标内容的每英寸像素点密度。
   *
   * @method setTargetDensityDPI
   * @param {String} densityDPI
   * @deprecated since v2.0
   */

  /**
   * !#en
   * Returns the current target-densitydpi value of cc.view.
   * !#zh 获取目标内容的每英寸像素点密度。
   * @method getTargetDensityDPI
   * @returns {String}
   * @deprecated since v2.0
   */

  /**
   * !#en
   * Sets whether resize canvas automatically when browser's size changed.<br/>
   * Useful only on web.
   * !#zh 设置当发现浏览器的尺寸改变时，是否自动调整 canvas 尺寸大小。
   * 仅在 Web 模式下有效。
   * @method resizeWithBrowserSize
   * @param {Boolean} enabled - Whether enable automatic resize with browser's resize event
   */
  resizeWithBrowserSize: function resizeWithBrowserSize(enabled) {
    if (enabled) {
      //enable
      if (!this._resizeWithBrowserSize) {
        this._resizeWithBrowserSize = true;
        window.addEventListener('resize', this._resize);
        window.addEventListener('orientationchange', this._orientationChange);
      }
    } else {
      //disable
      if (this._resizeWithBrowserSize) {
        this._resizeWithBrowserSize = false;
        window.removeEventListener('resize', this._resize);
        window.removeEventListener('orientationchange', this._orientationChange);
      }
    }
  },

  /**
   * !#en
   * Sets the callback function for cc.view's resize action,<br/>
   * this callback will be invoked before applying resolution policy, <br/>
   * so you can do any additional modifications within the callback.<br/>
   * Useful only on web.
   * !#zh 设置 cc.view 调整视窗尺寸行为的回调函数，
   * 这个回调函数会在应用适配模式之前被调用，
   * 因此你可以在这个回调函数内添加任意附加改变，
   * 仅在 Web 平台下有效。
   * @method setResizeCallback
   * @param {Function|Null} callback - The callback function
   */
  setResizeCallback: function setResizeCallback(callback) {
    if (CC_EDITOR) return;

    if (typeof callback === 'function' || callback == null) {
      this._resizeCallback = callback;
    }
  },

  /**
   * !#en
   * Sets the orientation of the game, it can be landscape, portrait or auto.
   * When set it to landscape or portrait, and screen w/h ratio doesn't fit, 
   * cc.view will automatically rotate the game canvas using CSS.
   * Note that this function doesn't have any effect in native, 
   * in native, you need to set the application orientation in native project settings
   * !#zh 设置游戏屏幕朝向，它能够是横版，竖版或自动。
   * 当设置为横版或竖版，并且屏幕的宽高比例不匹配时，
   * cc.view 会自动用 CSS 旋转游戏场景的 canvas，
   * 这个方法不会对 native 部分产生任何影响，对于 native 而言，你需要在应用设置中的设置排版。
   * @method setOrientation
   * @param {Number} orientation - Possible values: cc.macro.ORIENTATION_LANDSCAPE | cc.macro.ORIENTATION_PORTRAIT | cc.macro.ORIENTATION_AUTO
   */
  setOrientation: function setOrientation(orientation) {
    orientation = orientation & cc.macro.ORIENTATION_AUTO;

    if (orientation && this._orientation !== orientation) {
      this._orientation = orientation;
      var designWidth = this._originalDesignResolutionSize.width;
      var designHeight = this._originalDesignResolutionSize.height;
      this.setDesignResolutionSize(designWidth, designHeight, this._resolutionPolicy);
    }
  },
  _initFrameSize: function _initFrameSize() {
    var locFrameSize = this._frameSize;

    var w = __BrowserGetter.availWidth(cc.game.frame);

    var h = __BrowserGetter.availHeight(cc.game.frame);

    var isLandscape = w >= h;

    if (CC_EDITOR || !cc.sys.isMobile || isLandscape && this._orientation & cc.macro.ORIENTATION_LANDSCAPE || !isLandscape && this._orientation & cc.macro.ORIENTATION_PORTRAIT) {
      locFrameSize.width = w;
      locFrameSize.height = h;
      cc.game.container.style['-webkit-transform'] = 'rotate(0deg)';
      cc.game.container.style.transform = 'rotate(0deg)';
      this._isRotated = false;
    } else {
      locFrameSize.width = h;
      locFrameSize.height = w;
      cc.game.container.style['-webkit-transform'] = 'rotate(90deg)';
      cc.game.container.style.transform = 'rotate(90deg)';
      cc.game.container.style['-webkit-transform-origin'] = '0px 0px 0px';
      cc.game.container.style.transformOrigin = '0px 0px 0px';
      this._isRotated = true;
    }

    if (this._orientationChanging) {
      setTimeout(function () {
        cc.view._orientationChanging = false;
      }, 1000);
    }
  },
  _setViewportMeta: function _setViewportMeta(metas, overwrite) {
    var vp = document.getElementById("cocosMetaElement");

    if (vp && overwrite) {
      document.head.removeChild(vp);
    }

    var elems = document.getElementsByName("viewport"),
        currentVP = elems ? elems[0] : null,
        content,
        key,
        pattern;
    content = currentVP ? currentVP.content : "";
    vp = vp || document.createElement("meta");
    vp.id = "cocosMetaElement";
    vp.name = "viewport";
    vp.content = "";

    for (key in metas) {
      if (content.indexOf(key) == -1) {
        content += "," + key + "=" + metas[key];
      } else if (overwrite) {
        pattern = new RegExp(key + "\s*=\s*[^,]+");
        content.replace(pattern, key + "=" + metas[key]);
      }
    }

    if (/^,/.test(content)) content = content.substr(1);
    vp.content = content; // For adopting certain android devices which don't support second viewport

    if (currentVP) currentVP.content = content;
    document.head.appendChild(vp);
  },
  _adjustViewportMeta: function _adjustViewportMeta() {
    if (this._isAdjustViewport && !CC_JSB && !CC_RUNTIME) {
      this._setViewportMeta(__BrowserGetter.meta, false);

      this._isAdjustViewport = false;
    }
  },

  /**
   * !#en
   * Sets whether the engine modify the "viewport" meta in your web page.<br/>
   * It's enabled by default, we strongly suggest you not to disable it.<br/>
   * And even when it's enabled, you can still set your own "viewport" meta, it won't be overridden<br/>
   * Only useful on web
   * !#zh 设置引擎是否调整 viewport meta 来配合屏幕适配。
   * 默认设置为启动，我们强烈建议你不要将它设置为关闭。
   * 即使当它启动时，你仍然能够设置你的 viewport meta，它不会被覆盖。
   * 仅在 Web 模式下有效
   * @method adjustViewportMeta
   * @param {Boolean} enabled - Enable automatic modification to "viewport" meta
   */
  adjustViewportMeta: function adjustViewportMeta(enabled) {
    this._isAdjustViewport = enabled;
  },

  /**
   * !#en
   * Retina support is enabled by default for Apple device but disabled for other devices,<br/>
   * it takes effect only when you called setDesignResolutionPolicy<br/>
   * Only useful on web
   * !#zh 对于 Apple 这种支持 Retina 显示的设备上默认进行优化而其他类型设备默认不进行优化，
   * 它仅会在你调用 setDesignResolutionPolicy 方法时有影响。
   * 仅在 Web 模式下有效。
   * @method enableRetina
   * @param {Boolean} enabled - Enable or disable retina display
   */
  enableRetina: function enableRetina(enabled) {
    if (CC_EDITOR && enabled) {
      cc.warn('Can not enable retina in Editor.');
      return;
    }

    this._retinaEnabled = !!enabled;
  },

  /**
   * !#en
   * Check whether retina display is enabled.<br/>
   * Only useful on web
   * !#zh 检查是否对 Retina 显示设备进行优化。
   * 仅在 Web 模式下有效。
   * @method isRetinaEnabled
   * @return {Boolean}
   */
  isRetinaEnabled: function isRetinaEnabled() {
    if (CC_EDITOR) {
      return false;
    }

    return this._retinaEnabled;
  },

  /**
   * !#en Whether to Enable on anti-alias
   * !#zh 控制抗锯齿是否开启
   * @method enableAntiAlias
   * @param {Boolean} enabled - Enable or not anti-alias
   * @deprecated cc.view.enableAntiAlias is deprecated, please use cc.Texture2D.setFilters instead
   * @since v2.3.0
   */
  enableAntiAlias: function enableAntiAlias(enabled) {
    cc.warnID(9200);

    if (this._antiAliasEnabled === enabled) {
      return;
    }

    this._antiAliasEnabled = enabled;

    if (cc.game.renderType === cc.game.RENDER_TYPE_WEBGL) {
      var cache = cc.assetManager.assets;
      cache.forEach(function (asset) {
        if (asset instanceof cc.Texture2D) {
          var Filter = cc.Texture2D.Filter;

          if (enabled) {
            asset.setFilters(Filter.LINEAR, Filter.LINEAR);
          } else {
            asset.setFilters(Filter.NEAREST, Filter.NEAREST);
          }
        }
      });
    } else if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
      var ctx = cc.game.canvas.getContext('2d');
      ctx.imageSmoothingEnabled = enabled;
      ctx.mozImageSmoothingEnabled = enabled;
    }
  },

  /**
   * !#en Returns whether the current enable on anti-alias
   * !#zh 返回当前是否抗锯齿
   * @method isAntiAliasEnabled
   * @return {Boolean}
   */
  isAntiAliasEnabled: function isAntiAliasEnabled() {
    return this._antiAliasEnabled;
  },

  /**
   * !#en
   * If enabled, the application will try automatically to enter full screen mode on mobile devices<br/>
   * You can pass true as parameter to enable it and disable it by passing false.<br/>
   * Only useful on web
   * !#zh 启动时，移动端游戏会在移动端自动尝试进入全屏模式。
   * 你能够传入 true 为参数去启动它，用 false 参数来关闭它。
   * @method enableAutoFullScreen
   * @param {Boolean} enabled - Enable or disable auto full screen on mobile devices
   */
  enableAutoFullScreen: function enableAutoFullScreen(enabled) {
    if (enabled && enabled !== this._autoFullScreen && cc.sys.isMobile) {
      // Automatically full screen when user touches on mobile version
      this._autoFullScreen = true;
      cc.screen.autoFullScreen(cc.game.frame);
    } else {
      this._autoFullScreen = false;
      cc.screen.disableAutoFullScreen(cc.game.frame);
    }
  },

  /**
   * !#en
   * Check whether auto full screen is enabled.<br/>
   * Only useful on web
   * !#zh 检查自动进入全屏模式是否启动。
   * 仅在 Web 模式下有效。
   * @method isAutoFullScreenEnabled
   * @return {Boolean} Auto full screen enabled or not
   */
  isAutoFullScreenEnabled: function isAutoFullScreenEnabled() {
    return this._autoFullScreen;
  },

  /*
   * Not support on native.<br/>
   * On web, it sets the size of the canvas.
   * !#zh 这个方法并不支持 native 平台，在 Web 平台下，可以用来设置 canvas 尺寸。
   * @method setCanvasSize
   * @param {Number} width
   * @param {Number} height
   */
  setCanvasSize: function setCanvasSize(width, height) {
    var canvas = cc.game.canvas;
    var container = cc.game.container;
    canvas.width = width * this._devicePixelRatio;
    canvas.height = height * this._devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    container.style.width = width + 'px';
    container.style.height = height + 'px';

    this._resizeEvent();
  },

  /**
   * !#en
   * Returns the canvas size of the view.<br/>
   * On native platforms, it returns the screen size since the view is a fullscreen view.<br/>
   * On web, it returns the size of the canvas element.
   * !#zh 返回视图中 canvas 的尺寸。
   * 在 native 平台下，它返回全屏视图下屏幕的尺寸。
   * 在 Web 平台下，它返回 canvas 元素尺寸。
   * @method getCanvasSize
   * @return {Size}
   */
  getCanvasSize: function getCanvasSize() {
    return cc.size(cc.game.canvas.width, cc.game.canvas.height);
  },

  /**
   * !#en
   * Returns the frame size of the view.<br/>
   * On native platforms, it returns the screen size since the view is a fullscreen view.<br/>
   * On web, it returns the size of the canvas's outer DOM element.
   * !#zh 返回视图中边框尺寸。
   * 在 native 平台下，它返回全屏视图下屏幕的尺寸。
   * 在 web 平台下，它返回 canvas 元素的外层 DOM 元素尺寸。
   * @method getFrameSize
   * @return {Size}
   */
  getFrameSize: function getFrameSize() {
    return cc.size(this._frameSize.width, this._frameSize.height);
  },

  /**
   * !#en
   * On native, it sets the frame size of view.<br/>
   * On web, it sets the size of the canvas's outer DOM element.
   * !#zh 在 native 平台下，设置视图框架尺寸。
   * 在 web 平台下，设置 canvas 外层 DOM 元素尺寸。
   * @method setFrameSize
   * @param {Number} width
   * @param {Number} height
   */
  setFrameSize: function setFrameSize(width, height) {
    this._frameSize.width = width;
    this._frameSize.height = height;
    cc.game.frame.style.width = width + "px";
    cc.game.frame.style.height = height + "px";

    this._resizeEvent(true);
  },

  /**
   * !#en
   * Returns the visible area size of the view port.
   * !#zh 返回视图窗口可见区域尺寸。
   * @method getVisibleSize
   * @return {Size}
   */
  getVisibleSize: function getVisibleSize() {
    return cc.size(this._visibleRect.width, this._visibleRect.height);
  },

  /**
   * !#en
   * Returns the visible area size of the view port.
   * !#zh 返回视图窗口可见区域像素尺寸。
   * @method getVisibleSizeInPixel
   * @return {Size}
   */
  getVisibleSizeInPixel: function getVisibleSizeInPixel() {
    return cc.size(this._visibleRect.width * this._scaleX, this._visibleRect.height * this._scaleY);
  },

  /**
   * !#en
   * Returns the visible origin of the view port.
   * !#zh 返回视图窗口可见区域原点。
   * @method getVisibleOrigin
   * @return {Vec2}
   */
  getVisibleOrigin: function getVisibleOrigin() {
    return cc.v2(this._visibleRect.x, this._visibleRect.y);
  },

  /**
   * !#en
   * Returns the visible origin of the view port.
   * !#zh 返回视图窗口可见区域像素原点。
   * @method getVisibleOriginInPixel
   * @return {Vec2}
   */
  getVisibleOriginInPixel: function getVisibleOriginInPixel() {
    return cc.v2(this._visibleRect.x * this._scaleX, this._visibleRect.y * this._scaleY);
  },

  /**
   * !#en
   * Returns the current resolution policy
   * !#zh 返回当前分辨率方案
   * @see cc.ResolutionPolicy
   * @method getResolutionPolicy
   * @return {ResolutionPolicy}
   */
  getResolutionPolicy: function getResolutionPolicy() {
    return this._resolutionPolicy;
  },

  /**
   * !#en
   * Sets the current resolution policy
   * !#zh 设置当前分辨率模式
   * @see cc.ResolutionPolicy
   * @method setResolutionPolicy
   * @param {ResolutionPolicy|Number} resolutionPolicy
   */
  setResolutionPolicy: function setResolutionPolicy(resolutionPolicy) {
    var _t = this;

    if (resolutionPolicy instanceof cc.ResolutionPolicy) {
      _t._resolutionPolicy = resolutionPolicy;
    } // Ensure compatibility with JSB
    else {
        var _locPolicy = cc.ResolutionPolicy;
        if (resolutionPolicy === _locPolicy.EXACT_FIT) _t._resolutionPolicy = _t._rpExactFit;
        if (resolutionPolicy === _locPolicy.SHOW_ALL) _t._resolutionPolicy = _t._rpShowAll;
        if (resolutionPolicy === _locPolicy.NO_BORDER) _t._resolutionPolicy = _t._rpNoBorder;
        if (resolutionPolicy === _locPolicy.FIXED_HEIGHT) _t._resolutionPolicy = _t._rpFixedHeight;
        if (resolutionPolicy === _locPolicy.FIXED_WIDTH) _t._resolutionPolicy = _t._rpFixedWidth;
      }
  },

  /**
   * !#en
   * Sets the resolution policy with designed view size in points.<br/>
   * The resolution policy include: <br/>
   * [1] ResolutionExactFit       Fill screen by stretch-to-fit: if the design resolution ratio of width to height is different from the screen resolution ratio, your game view will be stretched.<br/>
   * [2] ResolutionNoBorder       Full screen without black border: if the design resolution ratio of width to height is different from the screen resolution ratio, two areas of your game view will be cut.<br/>
   * [3] ResolutionShowAll        Full screen with black border: if the design resolution ratio of width to height is different from the screen resolution ratio, two black borders will be shown.<br/>
   * [4] ResolutionFixedHeight    Scale the content's height to screen's height and proportionally scale its width<br/>
   * [5] ResolutionFixedWidth     Scale the content's width to screen's width and proportionally scale its height<br/>
   * [cc.ResolutionPolicy]        [Web only feature] Custom resolution policy, constructed by cc.ResolutionPolicy<br/>
   * !#zh 通过设置设计分辨率和匹配模式来进行游戏画面的屏幕适配。
   * @method setDesignResolutionSize
   * @param {Number} width Design resolution width.
   * @param {Number} height Design resolution height.
   * @param {ResolutionPolicy|Number} resolutionPolicy The resolution policy desired
   */
  setDesignResolutionSize: function setDesignResolutionSize(width, height, resolutionPolicy) {
    // Defensive code
    if (!(width > 0 || height > 0)) {
      cc.errorID(2200);
      return;
    }

    this.setResolutionPolicy(resolutionPolicy);
    var policy = this._resolutionPolicy;

    if (policy) {
      policy.preApply(this);
    } // Reinit frame size


    if (cc.sys.isMobile) this._adjustViewportMeta(); // Permit to re-detect the orientation of device.

    this._orientationChanging = true; // If resizing, then frame size is already initialized, this logic should be improved

    if (!this._resizing) this._initFrameSize();

    if (!policy) {
      cc.logID(2201);
      return;
    }

    this._originalDesignResolutionSize.width = this._designResolutionSize.width = width;
    this._originalDesignResolutionSize.height = this._designResolutionSize.height = height;
    var result = policy.apply(this, this._designResolutionSize);

    if (result.scale && result.scale.length === 2) {
      this._scaleX = result.scale[0];
      this._scaleY = result.scale[1];
    }

    if (result.viewport) {
      var vp = this._viewportRect,
          vb = this._visibleRect,
          rv = result.viewport;
      vp.x = rv.x;
      vp.y = rv.y;
      vp.width = rv.width;
      vp.height = rv.height;
      vb.x = 0;
      vb.y = 0;
      vb.width = rv.width / this._scaleX;
      vb.height = rv.height / this._scaleY;
    }

    policy.postApply(this);
    cc.winSize.width = this._visibleRect.width;
    cc.winSize.height = this._visibleRect.height;
    cc.visibleRect && cc.visibleRect.init(this._visibleRect);
    renderer.updateCameraViewport();

    cc.internal.inputManager._updateCanvasBoundingRect();

    this.emit('design-resolution-changed');
  },

  /**
   * !#en
   * Returns the designed size for the view.
   * Default resolution size is the same as 'getFrameSize'.
   * !#zh 返回视图的设计分辨率。
   * 默认下分辨率尺寸同 `getFrameSize` 方法相同
   * @method getDesignResolutionSize
   * @return {Size}
   */
  getDesignResolutionSize: function getDesignResolutionSize() {
    return cc.size(this._designResolutionSize.width, this._designResolutionSize.height);
  },

  /**
   * !#en
   * Sets the container to desired pixel resolution and fit the game content to it.
   * This function is very useful for adaptation in mobile browsers.
   * In some HD android devices, the resolution is very high, but its browser performance may not be very good.
   * In this case, enabling retina display is very costy and not suggested, and if retina is disabled, the image may be blurry.
   * But this API can be helpful to set a desired pixel resolution which is in between.
   * This API will do the following:
   *     1. Set viewport's width to the desired width in pixel
   *     2. Set body width to the exact pixel resolution
   *     3. The resolution policy will be reset with designed view size in points.
   * !#zh 设置容器（container）需要的像素分辨率并且适配相应分辨率的游戏内容。
   * @method setRealPixelResolution
   * @param {Number} width Design resolution width.
   * @param {Number} height Design resolution height.
   * @param {ResolutionPolicy|Number} resolutionPolicy The resolution policy desired
   */
  setRealPixelResolution: function setRealPixelResolution(width, height, resolutionPolicy) {
    if (!CC_JSB && !CC_RUNTIME) {
      // Set viewport's width
      this._setViewportMeta({
        "width": width
      }, true); // Set body width to the exact pixel resolution


      document.documentElement.style.width = width + "px";
      document.body.style.width = width + "px";
      document.body.style.left = "0px";
      document.body.style.top = "0px";
    } // Reset the resolution size and policy


    this.setDesignResolutionSize(width, height, resolutionPolicy);
  },

  /**
   * !#en
   * Sets view port rectangle with points.
   * !#zh 用设计分辨率下的点尺寸来设置视窗。
   * @method setViewportInPoints
   * @deprecated since v2.0
   * @param {Number} x
   * @param {Number} y
   * @param {Number} w width
   * @param {Number} h height
   */
  setViewportInPoints: function setViewportInPoints(x, y, w, h) {
    var locScaleX = this._scaleX,
        locScaleY = this._scaleY;

    cc.game._renderContext.viewport(x * locScaleX + this._viewportRect.x, y * locScaleY + this._viewportRect.y, w * locScaleX, h * locScaleY);
  },

  /**
   * !#en
   * Sets Scissor rectangle with points.
   * !#zh 用设计分辨率下的点的尺寸来设置 scissor 剪裁区域。
   * @method setScissorInPoints
   * @deprecated since v2.0
   * @param {Number} x
   * @param {Number} y
   * @param {Number} w
   * @param {Number} h
   */
  setScissorInPoints: function setScissorInPoints(x, y, w, h) {
    var scaleX = this._scaleX,
        scaleY = this._scaleY;
    var sx = Math.ceil(x * scaleX + this._viewportRect.x);
    var sy = Math.ceil(y * scaleY + this._viewportRect.y);
    var sw = Math.ceil(w * scaleX);
    var sh = Math.ceil(h * scaleY);
    var gl = cc.game._renderContext;

    if (!_scissorRect) {
      var boxArr = gl.getParameter(gl.SCISSOR_BOX);
      _scissorRect = cc.rect(boxArr[0], boxArr[1], boxArr[2], boxArr[3]);
    }

    if (_scissorRect.x !== sx || _scissorRect.y !== sy || _scissorRect.width !== sw || _scissorRect.height !== sh) {
      _scissorRect.x = sx;
      _scissorRect.y = sy;
      _scissorRect.width = sw;
      _scissorRect.height = sh;
      gl.scissor(sx, sy, sw, sh);
    }
  },

  /**
   * !#en
   * Returns whether GL_SCISSOR_TEST is enable
   * !#zh 检查 scissor 是否生效。
   * @method isScissorEnabled
   * @deprecated since v2.0
   * @return {Boolean}
   */
  isScissorEnabled: function isScissorEnabled() {
    return cc.game._renderContext.isEnabled(gl.SCISSOR_TEST);
  },

  /**
   * !#en
   * Returns the current scissor rectangle
   * !#zh 返回当前的 scissor 剪裁区域。
   * @method getScissorRect
   * @deprecated since v2.0
   * @return {Rect}
   */
  getScissorRect: function getScissorRect() {
    if (!_scissorRect) {
      var boxArr = gl.getParameter(gl.SCISSOR_BOX);
      _scissorRect = cc.rect(boxArr[0], boxArr[1], boxArr[2], boxArr[3]);
    }

    var scaleXFactor = 1 / this._scaleX;
    var scaleYFactor = 1 / this._scaleY;
    return cc.rect((_scissorRect.x - this._viewportRect.x) * scaleXFactor, (_scissorRect.y - this._viewportRect.y) * scaleYFactor, _scissorRect.width * scaleXFactor, _scissorRect.height * scaleYFactor);
  },

  /**
   * !#en
   * Returns the view port rectangle.
   * !#zh 返回视窗剪裁区域。
   * @method getViewportRect
   * @return {Rect}
   */
  getViewportRect: function getViewportRect() {
    return this._viewportRect;
  },

  /**
   * !#en
   * Returns scale factor of the horizontal direction (X axis).
   * !#zh 返回横轴的缩放比，这个缩放比是将画布像素分辨率放到设计分辨率的比例。
   * @method getScaleX
   * @return {Number}
   */
  getScaleX: function getScaleX() {
    return this._scaleX;
  },

  /**
   * !#en
   * Returns scale factor of the vertical direction (Y axis).
   * !#zh 返回纵轴的缩放比，这个缩放比是将画布像素分辨率缩放到设计分辨率的比例。
   * @method getScaleY
   * @return {Number}
   */
  getScaleY: function getScaleY() {
    return this._scaleY;
  },

  /**
   * !#en
   * Returns device pixel ratio for retina display.
   * !#zh 返回设备或浏览器像素比例。
   * @method getDevicePixelRatio
   * @return {Number}
   */
  getDevicePixelRatio: function getDevicePixelRatio() {
    return this._devicePixelRatio;
  },

  /**
   * !#en
   * Returns the real location in view for a translation based on a related position
   * !#zh 将屏幕坐标转换为游戏视图下的坐标。
   * @method convertToLocationInView
   * @param {Number} tx - The X axis translation
   * @param {Number} ty - The Y axis translation
   * @param {Object} relatedPos - The related position object including "left", "top", "width", "height" informations
   * @return {Vec2}
   */
  convertToLocationInView: function convertToLocationInView(tx, ty, relatedPos, out) {
    var result = out || cc.v2();
    var posLeft = relatedPos.adjustedLeft ? relatedPos.adjustedLeft : relatedPos.left;
    var posTop = relatedPos.adjustedTop ? relatedPos.adjustedTop : relatedPos.top;
    var x = this._devicePixelRatio * (tx - posLeft);
    var y = this._devicePixelRatio * (posTop + relatedPos.height - ty);

    if (this._isRotated) {
      result.x = cc.game.canvas.width - y;
      result.y = x;
    } else {
      result.x = x;
      result.y = y;
    }

    return result;
  },
  _convertMouseToLocationInView: function _convertMouseToLocationInView(in_out_point, relatedPos) {
    var viewport = this._viewportRect,
        _t = this;

    in_out_point.x = (_t._devicePixelRatio * (in_out_point.x - relatedPos.left) - viewport.x) / _t._scaleX;
    in_out_point.y = (_t._devicePixelRatio * (relatedPos.top + relatedPos.height - in_out_point.y) - viewport.y) / _t._scaleY;
  },
  _convertPointWithScale: function _convertPointWithScale(point) {
    var viewport = this._viewportRect;
    point.x = (point.x - viewport.x) / this._scaleX;
    point.y = (point.y - viewport.y) / this._scaleY;
  },
  _convertTouchesWithScale: function _convertTouchesWithScale(touches) {
    var viewport = this._viewportRect,
        scaleX = this._scaleX,
        scaleY = this._scaleY,
        selTouch,
        selPoint,
        selPrePoint;

    for (var i = 0; i < touches.length; i++) {
      selTouch = touches[i];
      selPoint = selTouch._point;
      selPrePoint = selTouch._prevPoint;
      selPoint.x = (selPoint.x - viewport.x) / scaleX;
      selPoint.y = (selPoint.y - viewport.y) / scaleY;
      selPrePoint.x = (selPrePoint.x - viewport.x) / scaleX;
      selPrePoint.y = (selPrePoint.y - viewport.y) / scaleY;
    }
  }
});
/**
 * !#en
 * Emit when design resolution changed.
 * !#zh
 * 当设计分辨率改变时发送。
 * @event design-resolution-changed
 */

/**
* !#en
* Emit when canvas resize.
* !#zh
* 当画布大小改变时发送。
* @event canvas-resize
*/

/**
 * <p>cc.game.containerStrategy class is the root strategy class of container's scale strategy,
 * it controls the behavior of how to scale the cc.game.container and cc.game.canvas object</p>
 *
 * @class ContainerStrategy
 */

cc.ContainerStrategy = cc.Class({
  name: "ContainerStrategy",

  /**
   * !#en
   * Manipulation before appling the strategy
   * !#zh 在应用策略之前的操作
   * @method preApply
   * @param {View} view - The target view
   */
  preApply: function preApply(view) {},

  /**
   * !#en
   * Function to apply this strategy
   * !#zh 策略应用方法
   * @method apply
   * @param {View} view
   * @param {Size} designedResolution
   */
  apply: function apply(view, designedResolution) {},

  /**
   * !#en
   * Manipulation after applying the strategy
   * !#zh 策略调用之后的操作
   * @method postApply
   * @param {View} view  The target view
   */
  postApply: function postApply(view) {},
  _setupContainer: function _setupContainer(view, w, h) {
    var locCanvas = cc.game.canvas;

    this._setupStyle(view, w, h); // Setup pixel ratio for retina display


    var devicePixelRatio = view._devicePixelRatio = 1;

    if (CC_JSB) {
      // view.isRetinaEnabled only work on web. 
      devicePixelRatio = view._devicePixelRatio = window.devicePixelRatio;
    } else if (view.isRetinaEnabled()) {
      devicePixelRatio = view._devicePixelRatio = Math.min(view._maxPixelRatio, window.devicePixelRatio || 1);
    } // Setup canvas


    locCanvas.width = w * devicePixelRatio;
    locCanvas.height = h * devicePixelRatio;
  },
  _setupStyle: function _setupStyle(view, w, h) {
    var locCanvas = cc.game.canvas;
    var locContainer = cc.game.container;

    if (cc.sys.os === cc.sys.OS_ANDROID) {
      document.body.style.width = (view._isRotated ? h : w) + 'px';
      document.body.style.height = (view._isRotated ? w : h) + 'px';
    } // Setup style


    locContainer.style.width = locCanvas.style.width = w + 'px';
    locContainer.style.height = locCanvas.style.height = h + 'px';
  },
  _fixContainer: function _fixContainer() {
    // Add container to document body
    document.body.insertBefore(cc.game.container, document.body.firstChild); // Set body's width height to window's size, and forbid overflow, so that game will be centered

    var bs = document.body.style;
    bs.width = window.innerWidth + "px";
    bs.height = window.innerHeight + "px";
    bs.overflow = "hidden"; // Body size solution doesn't work on all mobile browser so this is the aleternative: fixed container

    var contStyle = cc.game.container.style;
    contStyle.position = "fixed";
    contStyle.left = contStyle.top = "0px"; // Reposition body

    document.body.scrollTop = 0;
  }
});
/**
 * <p>cc.ContentStrategy class is the root strategy class of content's scale strategy,
 * it controls the behavior of how to scale the scene and setup the viewport for the game</p>
 *
 * @class ContentStrategy
 */

cc.ContentStrategy = cc.Class({
  name: "ContentStrategy",
  ctor: function ctor() {
    this._result = {
      scale: [1, 1],
      viewport: null
    };
  },
  _buildResult: function _buildResult(containerW, containerH, contentW, contentH, scaleX, scaleY) {
    // Makes content fit better the canvas
    Math.abs(containerW - contentW) < 2 && (contentW = containerW);
    Math.abs(containerH - contentH) < 2 && (contentH = containerH);
    var viewport = cc.rect((containerW - contentW) / 2, (containerH - contentH) / 2, contentW, contentH); // Translate the content

    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {//TODO: modify something for setTransform
      //cc.game._renderContext.translate(viewport.x, viewport.y + contentH);
    }

    this._result.scale = [scaleX, scaleY];
    this._result.viewport = viewport;
    return this._result;
  },

  /**
   * !#en
   * Manipulation before applying the strategy
   * !#zh 策略应用前的操作
   * @method preApply
   * @param {View} view - The target view
   */
  preApply: function preApply(view) {},

  /**
   * !#en Function to apply this strategy
   * The return value is {scale: [scaleX, scaleY], viewport: {cc.Rect}},
   * The target view can then apply these value to itself, it's preferred not to modify directly its private variables
   * !#zh 调用策略方法
   * @method apply
   * @param {View} view
   * @param {Size} designedResolution
   * @return {Object} scaleAndViewportRect
   */
  apply: function apply(view, designedResolution) {
    return {
      "scale": [1, 1]
    };
  },

  /**
   * !#en
   * Manipulation after applying the strategy
   * !#zh 策略调用之后的操作
   * @method postApply
   * @param {View} view - The target view
   */
  postApply: function postApply(view) {}
});

(function () {
  // Container scale strategys

  /**
   * @class EqualToFrame
   * @extends ContainerStrategy
   */
  var EqualToFrame = cc.Class({
    name: "EqualToFrame",
    "extends": cc.ContainerStrategy,
    apply: function apply(view) {
      var frameH = view._frameSize.height,
          containerStyle = cc.game.container.style;

      this._setupContainer(view, view._frameSize.width, view._frameSize.height); // Setup container's margin and padding


      if (view._isRotated) {
        containerStyle.margin = '0 0 0 ' + frameH + 'px';
      } else {
        containerStyle.margin = '0px';
      }

      containerStyle.padding = "0px";
    }
  });
  /**
   * @class ProportionalToFrame
   * @extends ContainerStrategy
   */

  var ProportionalToFrame = cc.Class({
    name: "ProportionalToFrame",
    "extends": cc.ContainerStrategy,
    apply: function apply(view, designedResolution) {
      var frameW = view._frameSize.width,
          frameH = view._frameSize.height,
          containerStyle = cc.game.container.style,
          designW = designedResolution.width,
          designH = designedResolution.height,
          scaleX = frameW / designW,
          scaleY = frameH / designH,
          containerW,
          containerH;
      scaleX < scaleY ? (containerW = frameW, containerH = designH * scaleX) : (containerW = designW * scaleY, containerH = frameH); // Adjust container size with integer value

      var offx = Math.round((frameW - containerW) / 2);
      var offy = Math.round((frameH - containerH) / 2);
      containerW = frameW - 2 * offx;
      containerH = frameH - 2 * offy;

      this._setupContainer(view, containerW, containerH);

      if (!CC_EDITOR) {
        // Setup container's margin and padding
        if (view._isRotated) {
          containerStyle.margin = '0 0 0 ' + frameH + 'px';
        } else {
          containerStyle.margin = '0px';
        }

        containerStyle.paddingLeft = offx + "px";
        containerStyle.paddingRight = offx + "px";
        containerStyle.paddingTop = offy + "px";
        containerStyle.paddingBottom = offy + "px";
      }
    }
  });
  /**
   * @class EqualToWindow
   * @extends EqualToFrame
   */

  var EqualToWindow = cc.Class({
    name: "EqualToWindow",
    "extends": EqualToFrame,
    preApply: function preApply(view) {
      this._super(view);

      cc.game.frame = document.documentElement;
    },
    apply: function apply(view) {
      this._super(view);

      this._fixContainer();
    }
  });
  /**
   * @class ProportionalToWindow
   * @extends ProportionalToFrame
   */

  var ProportionalToWindow = cc.Class({
    name: "ProportionalToWindow",
    "extends": ProportionalToFrame,
    preApply: function preApply(view) {
      this._super(view);

      cc.game.frame = document.documentElement;
    },
    apply: function apply(view, designedResolution) {
      this._super(view, designedResolution);

      this._fixContainer();
    }
  });
  /**
   * @class OriginalContainer
   * @extends ContainerStrategy
   */

  var OriginalContainer = cc.Class({
    name: "OriginalContainer",
    "extends": cc.ContainerStrategy,
    apply: function apply(view) {
      this._setupContainer(view, cc.game.canvas.width, cc.game.canvas.height);
    }
  }); // need to adapt prototype before instantiating

  var _global = typeof window === 'undefined' ? global : window;

  var globalAdapter = _global.__globalAdapter;

  if (globalAdapter) {
    if (globalAdapter.adaptContainerStrategy) {
      globalAdapter.adaptContainerStrategy(cc.ContainerStrategy.prototype);
    }

    if (globalAdapter.adaptView) {
      globalAdapter.adaptView(View.prototype);
    }
  } // #NOT STABLE on Android# Alias: Strategy that makes the container's size equals to the window's size
  //    cc.ContainerStrategy.EQUAL_TO_WINDOW = new EqualToWindow();
  // #NOT STABLE on Android# Alias: Strategy that scale proportionally the container's size to window's size
  //    cc.ContainerStrategy.PROPORTION_TO_WINDOW = new ProportionalToWindow();
  // Alias: Strategy that makes the container's size equals to the frame's size


  cc.ContainerStrategy.EQUAL_TO_FRAME = new EqualToFrame(); // Alias: Strategy that scale proportionally the container's size to frame's size

  cc.ContainerStrategy.PROPORTION_TO_FRAME = new ProportionalToFrame(); // Alias: Strategy that keeps the original container's size

  cc.ContainerStrategy.ORIGINAL_CONTAINER = new OriginalContainer(); // Content scale strategys

  var ExactFit = cc.Class({
    name: "ExactFit",
    "extends": cc.ContentStrategy,
    apply: function apply(view, designedResolution) {
      var containerW = cc.game.canvas.width,
          containerH = cc.game.canvas.height,
          scaleX = containerW / designedResolution.width,
          scaleY = containerH / designedResolution.height;
      return this._buildResult(containerW, containerH, containerW, containerH, scaleX, scaleY);
    }
  });
  var ShowAll = cc.Class({
    name: "ShowAll",
    "extends": cc.ContentStrategy,
    apply: function apply(view, designedResolution) {
      var containerW = cc.game.canvas.width,
          containerH = cc.game.canvas.height,
          designW = designedResolution.width,
          designH = designedResolution.height,
          scaleX = containerW / designW,
          scaleY = containerH / designH,
          scale = 0,
          contentW,
          contentH;
      scaleX < scaleY ? (scale = scaleX, contentW = containerW, contentH = designH * scale) : (scale = scaleY, contentW = designW * scale, contentH = containerH);
      return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
    }
  });
  var NoBorder = cc.Class({
    name: "NoBorder",
    "extends": cc.ContentStrategy,
    apply: function apply(view, designedResolution) {
      var containerW = cc.game.canvas.width,
          containerH = cc.game.canvas.height,
          designW = designedResolution.width,
          designH = designedResolution.height,
          scaleX = containerW / designW,
          scaleY = containerH / designH,
          scale,
          contentW,
          contentH;
      scaleX < scaleY ? (scale = scaleY, contentW = designW * scale, contentH = containerH) : (scale = scaleX, contentW = containerW, contentH = designH * scale);
      return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
    }
  });
  var FixedHeight = cc.Class({
    name: "FixedHeight",
    "extends": cc.ContentStrategy,
    apply: function apply(view, designedResolution) {
      var containerW = cc.game.canvas.width,
          containerH = cc.game.canvas.height,
          designH = designedResolution.height,
          scale = containerH / designH,
          contentW = containerW,
          contentH = containerH;
      return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
    }
  });
  var FixedWidth = cc.Class({
    name: "FixedWidth",
    "extends": cc.ContentStrategy,
    apply: function apply(view, designedResolution) {
      var containerW = cc.game.canvas.width,
          containerH = cc.game.canvas.height,
          designW = designedResolution.width,
          scale = containerW / designW,
          contentW = containerW,
          contentH = containerH;
      return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
    }
  }); // Alias: Strategy to scale the content's size to container's size, non proportional

  cc.ContentStrategy.EXACT_FIT = new ExactFit(); // Alias: Strategy to scale the content's size proportionally to maximum size and keeps the whole content area to be visible

  cc.ContentStrategy.SHOW_ALL = new ShowAll(); // Alias: Strategy to scale the content's size proportionally to fill the whole container area

  cc.ContentStrategy.NO_BORDER = new NoBorder(); // Alias: Strategy to scale the content's height to container's height and proportionally scale its width

  cc.ContentStrategy.FIXED_HEIGHT = new FixedHeight(); // Alias: Strategy to scale the content's width to container's width and proportionally scale its height

  cc.ContentStrategy.FIXED_WIDTH = new FixedWidth();
})();
/**
 * <p>cc.ResolutionPolicy class is the root strategy class of scale strategy,
 * its main task is to maintain the compatibility with Cocos2d-x</p>
 *
 * @class ResolutionPolicy
 */

/**
 * @method constructor
 * @param {ContainerStrategy} containerStg The container strategy
 * @param {ContentStrategy} contentStg The content strategy
 */


cc.ResolutionPolicy = cc.Class({
  name: "cc.ResolutionPolicy",

  /**
   * Constructor of cc.ResolutionPolicy
   * @param {ContainerStrategy} containerStg
   * @param {ContentStrategy} contentStg
   */
  ctor: function ctor(containerStg, contentStg) {
    this._containerStrategy = null;
    this._contentStrategy = null;
    this.setContainerStrategy(containerStg);
    this.setContentStrategy(contentStg);
  },

  /**
   * !#en Manipulation before applying the resolution policy
   * !#zh 策略应用前的操作
   * @method preApply
   * @param {View} view The target view
   */
  preApply: function preApply(view) {
    this._containerStrategy.preApply(view);

    this._contentStrategy.preApply(view);
  },

  /**
   * !#en Function to apply this resolution policy
   * The return value is {scale: [scaleX, scaleY], viewport: {cc.Rect}},
   * The target view can then apply these value to itself, it's preferred not to modify directly its private variables
   * !#zh 调用策略方法
   * @method apply
   * @param {View} view - The target view
   * @param {Size} designedResolution - The user defined design resolution
   * @return {Object} An object contains the scale X/Y values and the viewport rect
   */
  apply: function apply(view, designedResolution) {
    this._containerStrategy.apply(view, designedResolution);

    return this._contentStrategy.apply(view, designedResolution);
  },

  /**
   * !#en Manipulation after appyling the strategy
   * !#zh 策略应用之后的操作
   * @method postApply
   * @param {View} view - The target view
   */
  postApply: function postApply(view) {
    this._containerStrategy.postApply(view);

    this._contentStrategy.postApply(view);
  },

  /**
   * !#en
   * Setup the container's scale strategy
   * !#zh 设置容器的适配策略
   * @method setContainerStrategy
   * @param {ContainerStrategy} containerStg
   */
  setContainerStrategy: function setContainerStrategy(containerStg) {
    if (containerStg instanceof cc.ContainerStrategy) this._containerStrategy = containerStg;
  },

  /**
   * !#en
   * Setup the content's scale strategy
   * !#zh 设置内容的适配策略
   * @method setContentStrategy
   * @param {ContentStrategy} contentStg
   */
  setContentStrategy: function setContentStrategy(contentStg) {
    if (contentStg instanceof cc.ContentStrategy) this._contentStrategy = contentStg;
  }
});
js.get(cc.ResolutionPolicy.prototype, "canvasSize", function () {
  return cc.v2(cc.game.canvas.width, cc.game.canvas.height);
});
/**
 * The entire application is visible in the specified area without trying to preserve the original aspect ratio.<br/>
 * Distortion can occur, and the application may appear stretched or compressed.
 * @property {Number} EXACT_FIT
 * @readonly
 * @static
 */

cc.ResolutionPolicy.EXACT_FIT = 0;
/**
 * The entire application fills the specified area, without distortion but possibly with some cropping,<br/>
 * while maintaining the original aspect ratio of the application.
 * @property {Number} NO_BORDER
 * @readonly
 * @static
 */

cc.ResolutionPolicy.NO_BORDER = 1;
/**
 * The entire application is visible in the specified area without distortion while maintaining the original<br/>
 * aspect ratio of the application. Borders can appear on two sides of the application.
 * @property {Number} SHOW_ALL
 * @readonly
 * @static
 */

cc.ResolutionPolicy.SHOW_ALL = 2;
/**
 * The application takes the height of the design resolution size and modifies the width of the internal<br/>
 * canvas so that it fits the aspect ratio of the device<br/>
 * no distortion will occur however you must make sure your application works on different<br/>
 * aspect ratios
 * @property {Number} FIXED_HEIGHT
 * @readonly
 * @static
 */

cc.ResolutionPolicy.FIXED_HEIGHT = 3;
/**
 * The application takes the width of the design resolution size and modifies the height of the internal<br/>
 * canvas so that it fits the aspect ratio of the device<br/>
 * no distortion will occur however you must make sure your application works on different<br/>
 * aspect ratios
 * @property {Number} FIXED_WIDTH
 * @readonly
 * @static
 */

cc.ResolutionPolicy.FIXED_WIDTH = 4;
/**
 * Unknow policy
 * @property {Number} UNKNOWN
 * @readonly
 * @static
 */

cc.ResolutionPolicy.UNKNOWN = 5;
/**
 * @module cc
 */

/**
 * !#en cc.view is the shared view object.
 * !#zh cc.view 是全局的视图对象。
 * @property view
 * @static
 * @type {View}
 */

cc.view = new View();
/**
 * !#en cc.winSize is the alias object for the size of the current game window.
 * !#zh cc.winSize 为当前的游戏窗口的大小。
 * @property winSize
 * @type Size
 */

cc.winSize = cc.size();
module.exports = cc.view;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL0NDVmlldy5qcyJdLCJuYW1lcyI6WyJFdmVudFRhcmdldCIsInJlcXVpcmUiLCJqcyIsInJlbmRlcmVyIiwiX19Ccm93c2VyR2V0dGVyIiwiaW5pdCIsImh0bWwiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXZhaWxXaWR0aCIsImZyYW1lIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImNsaWVudFdpZHRoIiwiYXZhaWxIZWlnaHQiLCJpbm5lckhlaWdodCIsImNsaWVudEhlaWdodCIsIm1ldGEiLCJhZGFwdGF0aW9uVHlwZSIsImNjIiwic3lzIiwiYnJvd3NlclR5cGUiLCJvcyIsIk9TX0lPUyIsIkJST1dTRVJfVFlQRV9TQUZBUkkiLCJCUk9XU0VSX1RZUEVfU09VR09VIiwiQlJPV1NFUl9UWVBFX1VDIiwiX3NjaXNzb3JSZWN0IiwiVmlldyIsImNhbGwiLCJfdCIsIl9zdHJhdGVneWVyIiwiQ29udGFpbmVyU3RyYXRlZ3kiLCJfc3RyYXRlZ3kiLCJDb250ZW50U3RyYXRlZ3kiLCJfZnJhbWVTaXplIiwic2l6ZSIsIl9kZXNpZ25SZXNvbHV0aW9uU2l6ZSIsIl9vcmlnaW5hbERlc2lnblJlc29sdXRpb25TaXplIiwiX3NjYWxlWCIsIl9zY2FsZVkiLCJfdmlld3BvcnRSZWN0IiwicmVjdCIsIl92aXNpYmxlUmVjdCIsIl9hdXRvRnVsbFNjcmVlbiIsIl9kZXZpY2VQaXhlbFJhdGlvIiwiQ0NfSlNCIiwiX21heFBpeGVsUmF0aW8iLCJfcmV0aW5hRW5hYmxlZCIsIl9yZXNpemVDYWxsYmFjayIsIl9yZXNpemluZyIsIl9yZXNpemVXaXRoQnJvd3NlclNpemUiLCJfb3JpZW50YXRpb25DaGFuZ2luZyIsIl9pc1JvdGF0ZWQiLCJfb3JpZW50YXRpb24iLCJtYWNybyIsIk9SSUVOVEFUSU9OX0FVVE8iLCJfaXNBZGp1c3RWaWV3cG9ydCIsIl9hbnRpQWxpYXNFbmFibGVkIiwiX3Jlc29sdXRpb25Qb2xpY3kiLCJfcnBFeGFjdEZpdCIsIlJlc29sdXRpb25Qb2xpY3kiLCJFUVVBTF9UT19GUkFNRSIsIkVYQUNUX0ZJVCIsIl9ycFNob3dBbGwiLCJTSE9XX0FMTCIsIl9ycE5vQm9yZGVyIiwiTk9fQk9SREVSIiwiX3JwRml4ZWRIZWlnaHQiLCJGSVhFRF9IRUlHSFQiLCJfcnBGaXhlZFdpZHRoIiwiRklYRURfV0lEVEgiLCJnYW1lIiwib25jZSIsIkVWRU5UX0VOR0lORV9JTklURUQiLCJleHRlbmQiLCJtaXhpbiIsInByb3RvdHlwZSIsIl9pbml0RnJhbWVTaXplIiwidyIsImNhbnZhcyIsIndpZHRoIiwiaCIsImhlaWdodCIsIndpblNpemUiLCJ2aXNpYmxlUmVjdCIsIl9yZXNpemVFdmVudCIsImZvcmNlT3JFdmVudCIsInZpZXciLCJzZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSIsInNldFRpbWVvdXQiLCJwcmV2RnJhbWVXIiwicHJldkZyYW1lSCIsInByZXZSb3RhdGVkIiwiaXNNb2JpbGUiLCJjb250YWluZXJTdHlsZSIsImNvbnRhaW5lciIsInN0eWxlIiwibWFyZ2luIiwiZGlzcGxheSIsImVtaXQiLCJfb3JpZW50YXRpb25DaGFuZ2UiLCJzY3JvbGxUbyIsIl9yZXNpemUiLCJyZXNpemVXaXRoQnJvd3NlclNpemUiLCJlbmFibGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRSZXNpemVDYWxsYmFjayIsImNhbGxiYWNrIiwiQ0NfRURJVE9SIiwic2V0T3JpZW50YXRpb24iLCJvcmllbnRhdGlvbiIsImRlc2lnbldpZHRoIiwiZGVzaWduSGVpZ2h0IiwibG9jRnJhbWVTaXplIiwiaXNMYW5kc2NhcGUiLCJPUklFTlRBVElPTl9MQU5EU0NBUEUiLCJPUklFTlRBVElPTl9QT1JUUkFJVCIsInRyYW5zZm9ybSIsInRyYW5zZm9ybU9yaWdpbiIsIl9zZXRWaWV3cG9ydE1ldGEiLCJtZXRhcyIsIm92ZXJ3cml0ZSIsInZwIiwiZ2V0RWxlbWVudEJ5SWQiLCJoZWFkIiwicmVtb3ZlQ2hpbGQiLCJlbGVtcyIsImdldEVsZW1lbnRzQnlOYW1lIiwiY3VycmVudFZQIiwiY29udGVudCIsImtleSIsInBhdHRlcm4iLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJuYW1lIiwiaW5kZXhPZiIsIlJlZ0V4cCIsInJlcGxhY2UiLCJ0ZXN0Iiwic3Vic3RyIiwiYXBwZW5kQ2hpbGQiLCJfYWRqdXN0Vmlld3BvcnRNZXRhIiwiQ0NfUlVOVElNRSIsImFkanVzdFZpZXdwb3J0TWV0YSIsImVuYWJsZVJldGluYSIsIndhcm4iLCJpc1JldGluYUVuYWJsZWQiLCJlbmFibGVBbnRpQWxpYXMiLCJ3YXJuSUQiLCJyZW5kZXJUeXBlIiwiUkVOREVSX1RZUEVfV0VCR0wiLCJjYWNoZSIsImFzc2V0TWFuYWdlciIsImFzc2V0cyIsImZvckVhY2giLCJhc3NldCIsIlRleHR1cmUyRCIsIkZpbHRlciIsInNldEZpbHRlcnMiLCJMSU5FQVIiLCJORUFSRVNUIiwiUkVOREVSX1RZUEVfQ0FOVkFTIiwiY3R4IiwiZ2V0Q29udGV4dCIsImltYWdlU21vb3RoaW5nRW5hYmxlZCIsIm1vekltYWdlU21vb3RoaW5nRW5hYmxlZCIsImlzQW50aUFsaWFzRW5hYmxlZCIsImVuYWJsZUF1dG9GdWxsU2NyZWVuIiwic2NyZWVuIiwiYXV0b0Z1bGxTY3JlZW4iLCJkaXNhYmxlQXV0b0Z1bGxTY3JlZW4iLCJpc0F1dG9GdWxsU2NyZWVuRW5hYmxlZCIsInNldENhbnZhc1NpemUiLCJnZXRDYW52YXNTaXplIiwiZ2V0RnJhbWVTaXplIiwic2V0RnJhbWVTaXplIiwiZ2V0VmlzaWJsZVNpemUiLCJnZXRWaXNpYmxlU2l6ZUluUGl4ZWwiLCJnZXRWaXNpYmxlT3JpZ2luIiwidjIiLCJ4IiwieSIsImdldFZpc2libGVPcmlnaW5JblBpeGVsIiwiZ2V0UmVzb2x1dGlvblBvbGljeSIsInNldFJlc29sdXRpb25Qb2xpY3kiLCJyZXNvbHV0aW9uUG9saWN5IiwiX2xvY1BvbGljeSIsImVycm9ySUQiLCJwb2xpY3kiLCJwcmVBcHBseSIsImxvZ0lEIiwicmVzdWx0IiwiYXBwbHkiLCJzY2FsZSIsImxlbmd0aCIsInZpZXdwb3J0IiwidmIiLCJydiIsInBvc3RBcHBseSIsInVwZGF0ZUNhbWVyYVZpZXdwb3J0IiwiaW50ZXJuYWwiLCJpbnB1dE1hbmFnZXIiLCJfdXBkYXRlQ2FudmFzQm91bmRpbmdSZWN0IiwiZ2V0RGVzaWduUmVzb2x1dGlvblNpemUiLCJzZXRSZWFsUGl4ZWxSZXNvbHV0aW9uIiwiZG9jdW1lbnRFbGVtZW50IiwiYm9keSIsImxlZnQiLCJ0b3AiLCJzZXRWaWV3cG9ydEluUG9pbnRzIiwibG9jU2NhbGVYIiwibG9jU2NhbGVZIiwiX3JlbmRlckNvbnRleHQiLCJzZXRTY2lzc29ySW5Qb2ludHMiLCJzY2FsZVgiLCJzY2FsZVkiLCJzeCIsIk1hdGgiLCJjZWlsIiwic3kiLCJzdyIsInNoIiwiZ2wiLCJib3hBcnIiLCJnZXRQYXJhbWV0ZXIiLCJTQ0lTU09SX0JPWCIsInNjaXNzb3IiLCJpc1NjaXNzb3JFbmFibGVkIiwiaXNFbmFibGVkIiwiU0NJU1NPUl9URVNUIiwiZ2V0U2Npc3NvclJlY3QiLCJzY2FsZVhGYWN0b3IiLCJzY2FsZVlGYWN0b3IiLCJnZXRWaWV3cG9ydFJlY3QiLCJnZXRTY2FsZVgiLCJnZXRTY2FsZVkiLCJnZXREZXZpY2VQaXhlbFJhdGlvIiwiY29udmVydFRvTG9jYXRpb25JblZpZXciLCJ0eCIsInR5IiwicmVsYXRlZFBvcyIsIm91dCIsInBvc0xlZnQiLCJhZGp1c3RlZExlZnQiLCJwb3NUb3AiLCJhZGp1c3RlZFRvcCIsIl9jb252ZXJ0TW91c2VUb0xvY2F0aW9uSW5WaWV3IiwiaW5fb3V0X3BvaW50IiwiX2NvbnZlcnRQb2ludFdpdGhTY2FsZSIsInBvaW50IiwiX2NvbnZlcnRUb3VjaGVzV2l0aFNjYWxlIiwidG91Y2hlcyIsInNlbFRvdWNoIiwic2VsUG9pbnQiLCJzZWxQcmVQb2ludCIsImkiLCJfcG9pbnQiLCJfcHJldlBvaW50IiwiQ2xhc3MiLCJkZXNpZ25lZFJlc29sdXRpb24iLCJfc2V0dXBDb250YWluZXIiLCJsb2NDYW52YXMiLCJfc2V0dXBTdHlsZSIsImRldmljZVBpeGVsUmF0aW8iLCJtaW4iLCJsb2NDb250YWluZXIiLCJPU19BTkRST0lEIiwiX2ZpeENvbnRhaW5lciIsImluc2VydEJlZm9yZSIsImZpcnN0Q2hpbGQiLCJicyIsIm92ZXJmbG93IiwiY29udFN0eWxlIiwicG9zaXRpb24iLCJzY3JvbGxUb3AiLCJjdG9yIiwiX3Jlc3VsdCIsIl9idWlsZFJlc3VsdCIsImNvbnRhaW5lclciLCJjb250YWluZXJIIiwiY29udGVudFciLCJjb250ZW50SCIsImFicyIsIkVxdWFsVG9GcmFtZSIsImZyYW1lSCIsInBhZGRpbmciLCJQcm9wb3J0aW9uYWxUb0ZyYW1lIiwiZnJhbWVXIiwiZGVzaWduVyIsImRlc2lnbkgiLCJvZmZ4Iiwicm91bmQiLCJvZmZ5IiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsIkVxdWFsVG9XaW5kb3ciLCJfc3VwZXIiLCJQcm9wb3J0aW9uYWxUb1dpbmRvdyIsIk9yaWdpbmFsQ29udGFpbmVyIiwiX2dsb2JhbCIsImdsb2JhbCIsImdsb2JhbEFkYXB0ZXIiLCJfX2dsb2JhbEFkYXB0ZXIiLCJhZGFwdENvbnRhaW5lclN0cmF0ZWd5IiwiYWRhcHRWaWV3IiwiUFJPUE9SVElPTl9UT19GUkFNRSIsIk9SSUdJTkFMX0NPTlRBSU5FUiIsIkV4YWN0Rml0IiwiU2hvd0FsbCIsIk5vQm9yZGVyIiwiRml4ZWRIZWlnaHQiLCJGaXhlZFdpZHRoIiwiY29udGFpbmVyU3RnIiwiY29udGVudFN0ZyIsIl9jb250YWluZXJTdHJhdGVneSIsIl9jb250ZW50U3RyYXRlZ3kiLCJzZXRDb250YWluZXJTdHJhdGVneSIsInNldENvbnRlbnRTdHJhdGVneSIsImdldCIsIlVOS05PV04iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBLElBQU1BLFdBQVcsR0FBR0MsT0FBTyxDQUFDLHVCQUFELENBQTNCOztBQUNBLElBQU1DLEVBQUUsR0FBR0QsT0FBTyxDQUFDLGdCQUFELENBQWxCOztBQUNBLElBQU1FLFFBQVEsR0FBR0YsT0FBTyxDQUFDLGFBQUQsQ0FBeEI7O0FBQ0FBLE9BQU8sQ0FBQyxxQkFBRCxDQUFQOztBQUVBLElBQUlHLGVBQWUsR0FBRztBQUNsQkMsRUFBQUEsSUFBSSxFQUFFLGdCQUFVO0FBQ1osU0FBS0MsSUFBTCxHQUFZQyxRQUFRLENBQUNDLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLENBQVo7QUFDSCxHQUhpQjtBQUlsQkMsRUFBQUEsVUFBVSxFQUFFLG9CQUFTQyxLQUFULEVBQWU7QUFDdkIsUUFBSSxDQUFDQSxLQUFELElBQVVBLEtBQUssS0FBSyxLQUFLSixJQUE3QixFQUNJLE9BQU9LLE1BQU0sQ0FBQ0MsVUFBZCxDQURKLEtBR0ksT0FBT0YsS0FBSyxDQUFDRyxXQUFiO0FBQ1AsR0FUaUI7QUFVbEJDLEVBQUFBLFdBQVcsRUFBRSxxQkFBU0osS0FBVCxFQUFlO0FBQ3hCLFFBQUksQ0FBQ0EsS0FBRCxJQUFVQSxLQUFLLEtBQUssS0FBS0osSUFBN0IsRUFDSSxPQUFPSyxNQUFNLENBQUNJLFdBQWQsQ0FESixLQUdJLE9BQU9MLEtBQUssQ0FBQ00sWUFBYjtBQUNQLEdBZmlCO0FBZ0JsQkMsRUFBQUEsSUFBSSxFQUFFO0FBQ0YsYUFBUztBQURQLEdBaEJZO0FBbUJsQkMsRUFBQUEsY0FBYyxFQUFFQyxFQUFFLENBQUNDLEdBQUgsQ0FBT0M7QUFuQkwsQ0FBdEI7QUFzQkEsSUFBSUYsRUFBRSxDQUFDQyxHQUFILENBQU9FLEVBQVAsS0FBY0gsRUFBRSxDQUFDQyxHQUFILENBQU9HLE1BQXpCLEVBQWlDO0FBQzdCbkIsRUFBQUEsZUFBZSxDQUFDYyxjQUFoQixHQUFpQ0MsRUFBRSxDQUFDQyxHQUFILENBQU9JLG1CQUF4Qzs7QUFFSixRQUFRcEIsZUFBZSxDQUFDYyxjQUF4QjtBQUNJLE9BQUtDLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPSSxtQkFBWjtBQUNBLE9BQUtMLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPSyxtQkFBWjtBQUNBLE9BQUtOLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPTSxlQUFaO0FBQ0l0QixJQUFBQSxlQUFlLENBQUNhLElBQWhCLENBQXFCLFlBQXJCLElBQXFDLE1BQXJDOztBQUNBYixJQUFBQSxlQUFlLENBQUNLLFVBQWhCLEdBQTZCLFVBQVNDLEtBQVQsRUFBZTtBQUN4QyxhQUFPQSxLQUFLLENBQUNHLFdBQWI7QUFDSCxLQUZEOztBQUdBVCxJQUFBQSxlQUFlLENBQUNVLFdBQWhCLEdBQThCLFVBQVNKLEtBQVQsRUFBZTtBQUN6QyxhQUFPQSxLQUFLLENBQUNNLFlBQWI7QUFDSCxLQUZEOztBQUdBO0FBWFI7O0FBY0EsSUFBSVcsWUFBWSxHQUFHLElBQW5CO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxJQUFJQyxJQUFJLEdBQUcsU0FBUEEsSUFBTyxHQUFZO0FBQ25CNUIsRUFBQUEsV0FBVyxDQUFDNkIsSUFBWixDQUFpQixJQUFqQjs7QUFFQSxNQUFJQyxFQUFFLEdBQUcsSUFBVDtBQUFBLE1BQWVDLFdBQVcsR0FBR1osRUFBRSxDQUFDYSxpQkFBaEM7QUFBQSxNQUFtREMsU0FBUyxHQUFHZCxFQUFFLENBQUNlLGVBQWxFOztBQUVBOUIsRUFBQUEsZUFBZSxDQUFDQyxJQUFoQixDQUFxQixJQUFyQixFQUxtQixDQU9uQjs7O0FBQ0F5QixFQUFBQSxFQUFFLENBQUNLLFVBQUgsR0FBZ0JoQixFQUFFLENBQUNpQixJQUFILENBQVEsQ0FBUixFQUFXLENBQVgsQ0FBaEIsQ0FSbUIsQ0FVbkI7O0FBQ0FOLEVBQUFBLEVBQUUsQ0FBQ08scUJBQUgsR0FBMkJsQixFQUFFLENBQUNpQixJQUFILENBQVEsQ0FBUixFQUFXLENBQVgsQ0FBM0I7QUFDQU4sRUFBQUEsRUFBRSxDQUFDUSw2QkFBSCxHQUFtQ25CLEVBQUUsQ0FBQ2lCLElBQUgsQ0FBUSxDQUFSLEVBQVcsQ0FBWCxDQUFuQztBQUNBTixFQUFBQSxFQUFFLENBQUNTLE9BQUgsR0FBYSxDQUFiO0FBQ0FULEVBQUFBLEVBQUUsQ0FBQ1UsT0FBSCxHQUFhLENBQWIsQ0FkbUIsQ0FlbkI7O0FBQ0FWLEVBQUFBLEVBQUUsQ0FBQ1csYUFBSCxHQUFtQnRCLEVBQUUsQ0FBQ3VCLElBQUgsQ0FBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsQ0FBbkIsQ0FoQm1CLENBaUJuQjs7QUFDQVosRUFBQUEsRUFBRSxDQUFDYSxZQUFILEdBQWtCeEIsRUFBRSxDQUFDdUIsSUFBSCxDQUFRLENBQVIsRUFBVyxDQUFYLEVBQWMsQ0FBZCxFQUFpQixDQUFqQixDQUFsQixDQWxCbUIsQ0FtQm5COztBQUNBWixFQUFBQSxFQUFFLENBQUNjLGVBQUgsR0FBcUIsS0FBckIsQ0FwQm1CLENBcUJuQjs7QUFDQWQsRUFBQUEsRUFBRSxDQUFDZSxpQkFBSCxHQUF1QixDQUF2Qjs7QUFDQSxNQUFHQyxNQUFILEVBQVc7QUFDUGhCLElBQUFBLEVBQUUsQ0FBQ2lCLGNBQUgsR0FBb0IsQ0FBcEI7QUFDSCxHQUZELE1BRU87QUFDSGpCLElBQUFBLEVBQUUsQ0FBQ2lCLGNBQUgsR0FBb0IsQ0FBcEI7QUFDSCxHQTNCa0IsQ0E0Qm5COzs7QUFDQWpCLEVBQUFBLEVBQUUsQ0FBQ2tCLGNBQUgsR0FBb0IsS0FBcEIsQ0E3Qm1CLENBOEJuQjs7QUFDQWxCLEVBQUFBLEVBQUUsQ0FBQ21CLGVBQUgsR0FBcUIsSUFBckI7QUFDQW5CLEVBQUFBLEVBQUUsQ0FBQ29CLFNBQUgsR0FBZSxLQUFmO0FBQ0FwQixFQUFBQSxFQUFFLENBQUNxQixzQkFBSCxHQUE0QixLQUE1QjtBQUNBckIsRUFBQUEsRUFBRSxDQUFDc0Isb0JBQUgsR0FBMEIsSUFBMUI7QUFDQXRCLEVBQUFBLEVBQUUsQ0FBQ3VCLFVBQUgsR0FBZ0IsS0FBaEI7QUFDQXZCLEVBQUFBLEVBQUUsQ0FBQ3dCLFlBQUgsR0FBa0JuQyxFQUFFLENBQUNvQyxLQUFILENBQVNDLGdCQUEzQjtBQUNBMUIsRUFBQUEsRUFBRSxDQUFDMkIsaUJBQUgsR0FBdUIsSUFBdkI7QUFDQTNCLEVBQUFBLEVBQUUsQ0FBQzRCLGlCQUFILEdBQXVCLEtBQXZCLENBdENtQixDQXdDbkI7O0FBQ0E1QixFQUFBQSxFQUFFLENBQUM2QixpQkFBSCxHQUF1QixJQUF2QjtBQUNBN0IsRUFBQUEsRUFBRSxDQUFDOEIsV0FBSCxHQUFpQixJQUFJekMsRUFBRSxDQUFDMEMsZ0JBQVAsQ0FBd0I5QixXQUFXLENBQUMrQixjQUFwQyxFQUFvRDdCLFNBQVMsQ0FBQzhCLFNBQTlELENBQWpCO0FBQ0FqQyxFQUFBQSxFQUFFLENBQUNrQyxVQUFILEdBQWdCLElBQUk3QyxFQUFFLENBQUMwQyxnQkFBUCxDQUF3QjlCLFdBQVcsQ0FBQytCLGNBQXBDLEVBQW9EN0IsU0FBUyxDQUFDZ0MsUUFBOUQsQ0FBaEI7QUFDQW5DLEVBQUFBLEVBQUUsQ0FBQ29DLFdBQUgsR0FBaUIsSUFBSS9DLEVBQUUsQ0FBQzBDLGdCQUFQLENBQXdCOUIsV0FBVyxDQUFDK0IsY0FBcEMsRUFBb0Q3QixTQUFTLENBQUNrQyxTQUE5RCxDQUFqQjtBQUNBckMsRUFBQUEsRUFBRSxDQUFDc0MsY0FBSCxHQUFvQixJQUFJakQsRUFBRSxDQUFDMEMsZ0JBQVAsQ0FBd0I5QixXQUFXLENBQUMrQixjQUFwQyxFQUFvRDdCLFNBQVMsQ0FBQ29DLFlBQTlELENBQXBCO0FBQ0F2QyxFQUFBQSxFQUFFLENBQUN3QyxhQUFILEdBQW1CLElBQUluRCxFQUFFLENBQUMwQyxnQkFBUCxDQUF3QjlCLFdBQVcsQ0FBQytCLGNBQXBDLEVBQW9EN0IsU0FBUyxDQUFDc0MsV0FBOUQsQ0FBbkI7QUFFQXBELEVBQUFBLEVBQUUsQ0FBQ3FELElBQUgsQ0FBUUMsSUFBUixDQUFhdEQsRUFBRSxDQUFDcUQsSUFBSCxDQUFRRSxtQkFBckIsRUFBMEMsS0FBS3JFLElBQS9DLEVBQXFELElBQXJEO0FBQ0gsQ0FqREQ7O0FBbURBYyxFQUFFLENBQUNqQixFQUFILENBQU15RSxNQUFOLENBQWEvQyxJQUFiLEVBQW1CNUIsV0FBbkI7QUFFQW1CLEVBQUUsQ0FBQ2pCLEVBQUgsQ0FBTTBFLEtBQU4sQ0FBWWhELElBQUksQ0FBQ2lELFNBQWpCLEVBQTRCO0FBQ3hCeEUsRUFBQUEsSUFEd0Isa0JBQ2hCO0FBQ0osU0FBS3lFLGNBQUw7O0FBRUEsUUFBSUMsQ0FBQyxHQUFHNUQsRUFBRSxDQUFDcUQsSUFBSCxDQUFRUSxNQUFSLENBQWVDLEtBQXZCO0FBQUEsUUFBOEJDLENBQUMsR0FBRy9ELEVBQUUsQ0FBQ3FELElBQUgsQ0FBUVEsTUFBUixDQUFlRyxNQUFqRDtBQUNBLFNBQUs5QyxxQkFBTCxDQUEyQjRDLEtBQTNCLEdBQW1DRixDQUFuQztBQUNBLFNBQUsxQyxxQkFBTCxDQUEyQjhDLE1BQTNCLEdBQW9DRCxDQUFwQztBQUNBLFNBQUs1Qyw2QkFBTCxDQUFtQzJDLEtBQW5DLEdBQTJDRixDQUEzQztBQUNBLFNBQUt6Qyw2QkFBTCxDQUFtQzZDLE1BQW5DLEdBQTRDRCxDQUE1QztBQUNBLFNBQUt6QyxhQUFMLENBQW1Cd0MsS0FBbkIsR0FBMkJGLENBQTNCO0FBQ0EsU0FBS3RDLGFBQUwsQ0FBbUIwQyxNQUFuQixHQUE0QkQsQ0FBNUI7QUFDQSxTQUFLdkMsWUFBTCxDQUFrQnNDLEtBQWxCLEdBQTBCRixDQUExQjtBQUNBLFNBQUtwQyxZQUFMLENBQWtCd0MsTUFBbEIsR0FBMkJELENBQTNCO0FBRUEvRCxJQUFBQSxFQUFFLENBQUNpRSxPQUFILENBQVdILEtBQVgsR0FBbUIsS0FBS3RDLFlBQUwsQ0FBa0JzQyxLQUFyQztBQUNBOUQsSUFBQUEsRUFBRSxDQUFDaUUsT0FBSCxDQUFXRCxNQUFYLEdBQW9CLEtBQUt4QyxZQUFMLENBQWtCd0MsTUFBdEM7QUFDQWhFLElBQUFBLEVBQUUsQ0FBQ2tFLFdBQUgsSUFBa0JsRSxFQUFFLENBQUNrRSxXQUFILENBQWVoRixJQUFmLENBQW9CLEtBQUtzQyxZQUF6QixDQUFsQjtBQUNILEdBakJ1QjtBQW1CeEI7QUFDQTJDLEVBQUFBLFlBQVksRUFBRSxzQkFBVUMsWUFBVixFQUF3QjtBQUNsQyxRQUFJQyxJQUFKOztBQUNBLFFBQUksS0FBS0MsdUJBQVQsRUFBa0M7QUFDOUJELE1BQUFBLElBQUksR0FBRyxJQUFQO0FBQ0gsS0FGRCxNQUVPO0FBQ0hBLE1BQUFBLElBQUksR0FBR3JFLEVBQUUsQ0FBQ3FFLElBQVY7QUFDSCxLQU5pQyxDQU9sQztBQUNBOzs7QUFDQSxRQUFJcEUsR0FBRyxHQUFHRCxFQUFFLENBQUNDLEdBQWI7O0FBQ0EsUUFBSUEsR0FBRyxDQUFDQyxXQUFKLEtBQW9CRCxHQUFHLENBQUNNLGVBQXhCLElBQTJDTixHQUFHLENBQUNFLEVBQUosS0FBV0YsR0FBRyxDQUFDRyxNQUE5RCxFQUFzRTtBQUNsRW1FLE1BQUFBLFVBQVUsQ0FBQyxZQUFZO0FBQ25CRixRQUFBQSxJQUFJLENBQUNGLFlBQUwsQ0FBa0JDLFlBQWxCO0FBQ0gsT0FGUyxFQUVQLENBRk8sQ0FBVjtBQUdBO0FBQ0gsS0FmaUMsQ0FpQmxDOzs7QUFDQSxRQUFJSSxVQUFVLEdBQUdILElBQUksQ0FBQ3JELFVBQUwsQ0FBZ0I4QyxLQUFqQztBQUFBLFFBQXdDVyxVQUFVLEdBQUdKLElBQUksQ0FBQ3JELFVBQUwsQ0FBZ0JnRCxNQUFyRTtBQUFBLFFBQTZFVSxXQUFXLEdBQUdMLElBQUksQ0FBQ25DLFVBQWhHOztBQUNBLFFBQUlsQyxFQUFFLENBQUNDLEdBQUgsQ0FBTzBFLFFBQVgsRUFBcUI7QUFDakIsVUFBSUMsY0FBYyxHQUFHNUUsRUFBRSxDQUFDcUQsSUFBSCxDQUFRd0IsU0FBUixDQUFrQkMsS0FBdkM7QUFBQSxVQUNJQyxNQUFNLEdBQUdILGNBQWMsQ0FBQ0csTUFENUI7QUFFQUgsTUFBQUEsY0FBYyxDQUFDRyxNQUFmLEdBQXdCLEdBQXhCO0FBQ0FILE1BQUFBLGNBQWMsQ0FBQ0ksT0FBZixHQUF5QixNQUF6Qjs7QUFDQVgsTUFBQUEsSUFBSSxDQUFDVixjQUFMOztBQUNBaUIsTUFBQUEsY0FBYyxDQUFDRyxNQUFmLEdBQXdCQSxNQUF4QjtBQUNBSCxNQUFBQSxjQUFjLENBQUNJLE9BQWYsR0FBeUIsT0FBekI7QUFDSCxLQVJELE1BU0s7QUFDRFgsTUFBQUEsSUFBSSxDQUFDVixjQUFMO0FBQ0g7O0FBQ0QsUUFBSVMsWUFBWSxLQUFLLElBQWpCLElBQXlCQyxJQUFJLENBQUNuQyxVQUFMLEtBQW9Cd0MsV0FBN0MsSUFBNERMLElBQUksQ0FBQ3JELFVBQUwsQ0FBZ0I4QyxLQUFoQixLQUEwQlUsVUFBdEYsSUFBb0dILElBQUksQ0FBQ3JELFVBQUwsQ0FBZ0JnRCxNQUFoQixLQUEyQlMsVUFBbkksRUFDSSxPQWhDOEIsQ0FrQ2xDOztBQUNBLFFBQUlYLEtBQUssR0FBR08sSUFBSSxDQUFDbEQsNkJBQUwsQ0FBbUMyQyxLQUEvQztBQUNBLFFBQUlFLE1BQU0sR0FBR0ssSUFBSSxDQUFDbEQsNkJBQUwsQ0FBbUM2QyxNQUFoRDtBQUNBSyxJQUFBQSxJQUFJLENBQUN0QyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsUUFBSStCLEtBQUssR0FBRyxDQUFaLEVBQ0lPLElBQUksQ0FBQ0MsdUJBQUwsQ0FBNkJSLEtBQTdCLEVBQW9DRSxNQUFwQyxFQUE0Q0ssSUFBSSxDQUFDN0IsaUJBQWpEO0FBQ0o2QixJQUFBQSxJQUFJLENBQUN0QyxTQUFMLEdBQWlCLEtBQWpCO0FBRUFzQyxJQUFBQSxJQUFJLENBQUNZLElBQUwsQ0FBVSxlQUFWOztBQUNBLFFBQUlaLElBQUksQ0FBQ3ZDLGVBQVQsRUFBMEI7QUFDdEJ1QyxNQUFBQSxJQUFJLENBQUN2QyxlQUFMLENBQXFCcEIsSUFBckI7QUFDSDtBQUNKLEdBbEV1QjtBQW9FeEJ3RSxFQUFBQSxrQkFBa0IsRUFBRSw4QkFBWTtBQUM1QmxGLElBQUFBLEVBQUUsQ0FBQ3FFLElBQUgsQ0FBUXBDLG9CQUFSLEdBQStCLElBQS9COztBQUNBakMsSUFBQUEsRUFBRSxDQUFDcUUsSUFBSCxDQUFRRixZQUFSLEdBRjRCLENBRzVCO0FBQ0E7QUFDQTs7O0FBQ0EsUUFBSW5FLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPQyxXQUFQLEtBQXVCRixFQUFFLENBQUNDLEdBQUgsQ0FBT0ksbUJBQTlCLElBQXFETCxFQUFFLENBQUNDLEdBQUgsQ0FBTzBFLFFBQWhFLEVBQTBFO0FBQ3RFSixNQUFBQSxVQUFVLENBQUMsWUFBTTtBQUNiLFlBQUkvRSxNQUFNLENBQUNJLFdBQVAsR0FBcUJKLE1BQU0sQ0FBQ0MsVUFBaEMsRUFBNEM7QUFDeENELFVBQUFBLE1BQU0sQ0FBQzJGLFFBQVAsQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkI7QUFDSDtBQUNKLE9BSlMsRUFJUCxHQUpPLENBQVY7QUFLSDtBQUNKLEdBakZ1QjtBQW1GeEJDLEVBQUFBLE9BQU8sRUFBRSxtQkFBVztBQUNoQjtBQUNBcEYsSUFBQUEsRUFBRSxDQUFDcUUsSUFBSCxDQUFRRixZQUFSLENBQXFCeEMsTUFBckI7QUFDSCxHQXRGdUI7O0FBd0Z4Qjs7Ozs7Ozs7Ozs7Ozs7O0FBZUE7Ozs7Ozs7OztBQVNBOzs7Ozs7Ozs7QUFTQTBELEVBQUFBLHFCQUFxQixFQUFFLCtCQUFVQyxPQUFWLEVBQW1CO0FBQ3RDLFFBQUlBLE9BQUosRUFBYTtBQUNUO0FBQ0EsVUFBSSxDQUFDLEtBQUt0RCxzQkFBVixFQUFrQztBQUM5QixhQUFLQSxzQkFBTCxHQUE4QixJQUE5QjtBQUNBeEMsUUFBQUEsTUFBTSxDQUFDK0YsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBS0gsT0FBdkM7QUFDQTVGLFFBQUFBLE1BQU0sQ0FBQytGLGdCQUFQLENBQXdCLG1CQUF4QixFQUE2QyxLQUFLTCxrQkFBbEQ7QUFDSDtBQUNKLEtBUEQsTUFPTztBQUNIO0FBQ0EsVUFBSSxLQUFLbEQsc0JBQVQsRUFBaUM7QUFDN0IsYUFBS0Esc0JBQUwsR0FBOEIsS0FBOUI7QUFDQXhDLFFBQUFBLE1BQU0sQ0FBQ2dHLG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDLEtBQUtKLE9BQTFDO0FBQ0E1RixRQUFBQSxNQUFNLENBQUNnRyxtQkFBUCxDQUEyQixtQkFBM0IsRUFBZ0QsS0FBS04sa0JBQXJEO0FBQ0g7QUFDSjtBQUNKLEdBekl1Qjs7QUEySXhCOzs7Ozs7Ozs7Ozs7O0FBYUFPLEVBQUFBLGlCQUFpQixFQUFFLDJCQUFVQyxRQUFWLEVBQW9CO0FBQ25DLFFBQUlDLFNBQUosRUFBZTs7QUFDZixRQUFJLE9BQU9ELFFBQVAsS0FBb0IsVUFBcEIsSUFBa0NBLFFBQVEsSUFBSSxJQUFsRCxFQUF3RDtBQUNwRCxXQUFLNUQsZUFBTCxHQUF1QjRELFFBQXZCO0FBQ0g7QUFDSixHQTdKdUI7O0FBK0p4Qjs7Ozs7Ozs7Ozs7Ozs7QUFjQUUsRUFBQUEsY0FBYyxFQUFFLHdCQUFVQyxXQUFWLEVBQXVCO0FBQ25DQSxJQUFBQSxXQUFXLEdBQUdBLFdBQVcsR0FBRzdGLEVBQUUsQ0FBQ29DLEtBQUgsQ0FBU0MsZ0JBQXJDOztBQUNBLFFBQUl3RCxXQUFXLElBQUksS0FBSzFELFlBQUwsS0FBc0IwRCxXQUF6QyxFQUFzRDtBQUNsRCxXQUFLMUQsWUFBTCxHQUFvQjBELFdBQXBCO0FBQ0EsVUFBSUMsV0FBVyxHQUFHLEtBQUszRSw2QkFBTCxDQUFtQzJDLEtBQXJEO0FBQ0EsVUFBSWlDLFlBQVksR0FBRyxLQUFLNUUsNkJBQUwsQ0FBbUM2QyxNQUF0RDtBQUNBLFdBQUtNLHVCQUFMLENBQTZCd0IsV0FBN0IsRUFBMENDLFlBQTFDLEVBQXdELEtBQUt2RCxpQkFBN0Q7QUFDSDtBQUNKLEdBckx1QjtBQXVMeEJtQixFQUFBQSxjQUFjLEVBQUUsMEJBQVk7QUFDeEIsUUFBSXFDLFlBQVksR0FBRyxLQUFLaEYsVUFBeEI7O0FBQ0EsUUFBSTRDLENBQUMsR0FBRzNFLGVBQWUsQ0FBQ0ssVUFBaEIsQ0FBMkJVLEVBQUUsQ0FBQ3FELElBQUgsQ0FBUTlELEtBQW5DLENBQVI7O0FBQ0EsUUFBSXdFLENBQUMsR0FBRzlFLGVBQWUsQ0FBQ1UsV0FBaEIsQ0FBNEJLLEVBQUUsQ0FBQ3FELElBQUgsQ0FBUTlELEtBQXBDLENBQVI7O0FBQ0EsUUFBSTBHLFdBQVcsR0FBR3JDLENBQUMsSUFBSUcsQ0FBdkI7O0FBRUEsUUFBSTRCLFNBQVMsSUFBSSxDQUFDM0YsRUFBRSxDQUFDQyxHQUFILENBQU8wRSxRQUFyQixJQUNDc0IsV0FBVyxJQUFJLEtBQUs5RCxZQUFMLEdBQW9CbkMsRUFBRSxDQUFDb0MsS0FBSCxDQUFTOEQscUJBRDdDLElBRUMsQ0FBQ0QsV0FBRCxJQUFnQixLQUFLOUQsWUFBTCxHQUFvQm5DLEVBQUUsQ0FBQ29DLEtBQUgsQ0FBUytELG9CQUZsRCxFQUV5RTtBQUNyRUgsTUFBQUEsWUFBWSxDQUFDbEMsS0FBYixHQUFxQkYsQ0FBckI7QUFDQW9DLE1BQUFBLFlBQVksQ0FBQ2hDLE1BQWIsR0FBc0JELENBQXRCO0FBQ0EvRCxNQUFBQSxFQUFFLENBQUNxRCxJQUFILENBQVF3QixTQUFSLENBQWtCQyxLQUFsQixDQUF3QixtQkFBeEIsSUFBK0MsY0FBL0M7QUFDQTlFLE1BQUFBLEVBQUUsQ0FBQ3FELElBQUgsQ0FBUXdCLFNBQVIsQ0FBa0JDLEtBQWxCLENBQXdCc0IsU0FBeEIsR0FBb0MsY0FBcEM7QUFDQSxXQUFLbEUsVUFBTCxHQUFrQixLQUFsQjtBQUNILEtBUkQsTUFTSztBQUNEOEQsTUFBQUEsWUFBWSxDQUFDbEMsS0FBYixHQUFxQkMsQ0FBckI7QUFDQWlDLE1BQUFBLFlBQVksQ0FBQ2hDLE1BQWIsR0FBc0JKLENBQXRCO0FBQ0E1RCxNQUFBQSxFQUFFLENBQUNxRCxJQUFILENBQVF3QixTQUFSLENBQWtCQyxLQUFsQixDQUF3QixtQkFBeEIsSUFBK0MsZUFBL0M7QUFDQTlFLE1BQUFBLEVBQUUsQ0FBQ3FELElBQUgsQ0FBUXdCLFNBQVIsQ0FBa0JDLEtBQWxCLENBQXdCc0IsU0FBeEIsR0FBb0MsZUFBcEM7QUFDQXBHLE1BQUFBLEVBQUUsQ0FBQ3FELElBQUgsQ0FBUXdCLFNBQVIsQ0FBa0JDLEtBQWxCLENBQXdCLDBCQUF4QixJQUFzRCxhQUF0RDtBQUNBOUUsTUFBQUEsRUFBRSxDQUFDcUQsSUFBSCxDQUFRd0IsU0FBUixDQUFrQkMsS0FBbEIsQ0FBd0J1QixlQUF4QixHQUEwQyxhQUExQztBQUNBLFdBQUtuRSxVQUFMLEdBQWtCLElBQWxCO0FBQ0g7O0FBQ0QsUUFBSSxLQUFLRCxvQkFBVCxFQUErQjtBQUMzQnNDLE1BQUFBLFVBQVUsQ0FBQyxZQUFZO0FBQ25CdkUsUUFBQUEsRUFBRSxDQUFDcUUsSUFBSCxDQUFRcEMsb0JBQVIsR0FBK0IsS0FBL0I7QUFDSCxPQUZTLEVBRVAsSUFGTyxDQUFWO0FBR0g7QUFDSixHQXBOdUI7QUFzTnhCcUUsRUFBQUEsZ0JBQWdCLEVBQUUsMEJBQVVDLEtBQVYsRUFBaUJDLFNBQWpCLEVBQTRCO0FBQzFDLFFBQUlDLEVBQUUsR0FBR3JILFFBQVEsQ0FBQ3NILGNBQVQsQ0FBd0Isa0JBQXhCLENBQVQ7O0FBQ0EsUUFBR0QsRUFBRSxJQUFJRCxTQUFULEVBQW1CO0FBQ2ZwSCxNQUFBQSxRQUFRLENBQUN1SCxJQUFULENBQWNDLFdBQWQsQ0FBMEJILEVBQTFCO0FBQ0g7O0FBRUQsUUFBSUksS0FBSyxHQUFHekgsUUFBUSxDQUFDMEgsaUJBQVQsQ0FBMkIsVUFBM0IsQ0FBWjtBQUFBLFFBQ0lDLFNBQVMsR0FBR0YsS0FBSyxHQUFHQSxLQUFLLENBQUMsQ0FBRCxDQUFSLEdBQWMsSUFEbkM7QUFBQSxRQUVJRyxPQUZKO0FBQUEsUUFFYUMsR0FGYjtBQUFBLFFBRWtCQyxPQUZsQjtBQUlBRixJQUFBQSxPQUFPLEdBQUdELFNBQVMsR0FBR0EsU0FBUyxDQUFDQyxPQUFiLEdBQXVCLEVBQTFDO0FBQ0FQLElBQUFBLEVBQUUsR0FBR0EsRUFBRSxJQUFJckgsUUFBUSxDQUFDK0gsYUFBVCxDQUF1QixNQUF2QixDQUFYO0FBQ0FWLElBQUFBLEVBQUUsQ0FBQ1csRUFBSCxHQUFRLGtCQUFSO0FBQ0FYLElBQUFBLEVBQUUsQ0FBQ1ksSUFBSCxHQUFVLFVBQVY7QUFDQVosSUFBQUEsRUFBRSxDQUFDTyxPQUFILEdBQWEsRUFBYjs7QUFFQSxTQUFLQyxHQUFMLElBQVlWLEtBQVosRUFBbUI7QUFDZixVQUFJUyxPQUFPLENBQUNNLE9BQVIsQ0FBZ0JMLEdBQWhCLEtBQXdCLENBQUMsQ0FBN0IsRUFBZ0M7QUFDNUJELFFBQUFBLE9BQU8sSUFBSSxNQUFNQyxHQUFOLEdBQVksR0FBWixHQUFrQlYsS0FBSyxDQUFDVSxHQUFELENBQWxDO0FBQ0gsT0FGRCxNQUdLLElBQUlULFNBQUosRUFBZTtBQUNoQlUsUUFBQUEsT0FBTyxHQUFHLElBQUlLLE1BQUosQ0FBV04sR0FBRyxHQUFDLGNBQWYsQ0FBVjtBQUNBRCxRQUFBQSxPQUFPLENBQUNRLE9BQVIsQ0FBZ0JOLE9BQWhCLEVBQXlCRCxHQUFHLEdBQUcsR0FBTixHQUFZVixLQUFLLENBQUNVLEdBQUQsQ0FBMUM7QUFDSDtBQUNKOztBQUNELFFBQUcsS0FBS1EsSUFBTCxDQUFVVCxPQUFWLENBQUgsRUFDSUEsT0FBTyxHQUFHQSxPQUFPLENBQUNVLE1BQVIsQ0FBZSxDQUFmLENBQVY7QUFFSmpCLElBQUFBLEVBQUUsQ0FBQ08sT0FBSCxHQUFhQSxPQUFiLENBNUIwQyxDQTZCMUM7O0FBQ0EsUUFBSUQsU0FBSixFQUNJQSxTQUFTLENBQUNDLE9BQVYsR0FBb0JBLE9BQXBCO0FBRUo1SCxJQUFBQSxRQUFRLENBQUN1SCxJQUFULENBQWNnQixXQUFkLENBQTBCbEIsRUFBMUI7QUFDSCxHQXhQdUI7QUEwUHhCbUIsRUFBQUEsbUJBQW1CLEVBQUUsK0JBQVk7QUFDN0IsUUFBSSxLQUFLdEYsaUJBQUwsSUFBMEIsQ0FBQ1gsTUFBM0IsSUFBcUMsQ0FBQ2tHLFVBQTFDLEVBQXNEO0FBQ2xELFdBQUt2QixnQkFBTCxDQUFzQnJILGVBQWUsQ0FBQ2EsSUFBdEMsRUFBNEMsS0FBNUM7O0FBQ0EsV0FBS3dDLGlCQUFMLEdBQXlCLEtBQXpCO0FBQ0g7QUFDSixHQS9QdUI7O0FBaVF4Qjs7Ozs7Ozs7Ozs7OztBQWFBd0YsRUFBQUEsa0JBQWtCLEVBQUUsNEJBQVV4QyxPQUFWLEVBQW1CO0FBQ25DLFNBQUtoRCxpQkFBTCxHQUF5QmdELE9BQXpCO0FBQ0gsR0FoUnVCOztBQWtSeEI7Ozs7Ozs7Ozs7O0FBV0F5QyxFQUFBQSxZQUFZLEVBQUUsc0JBQVN6QyxPQUFULEVBQWtCO0FBQzVCLFFBQUlLLFNBQVMsSUFBSUwsT0FBakIsRUFBMEI7QUFDdEJ0RixNQUFBQSxFQUFFLENBQUNnSSxJQUFILENBQVEsa0NBQVI7QUFDQTtBQUNIOztBQUNELFNBQUtuRyxjQUFMLEdBQXNCLENBQUMsQ0FBQ3lELE9BQXhCO0FBQ0gsR0FuU3VCOztBQXFTeEI7Ozs7Ozs7OztBQVNBMkMsRUFBQUEsZUFBZSxFQUFFLDJCQUFXO0FBQ3hCLFFBQUl0QyxTQUFKLEVBQWU7QUFDWCxhQUFPLEtBQVA7QUFDSDs7QUFDRCxXQUFPLEtBQUs5RCxjQUFaO0FBQ0gsR0FuVHVCOztBQXFUeEI7Ozs7Ozs7O0FBUUFxRyxFQUFBQSxlQUFlLEVBQUUseUJBQVU1QyxPQUFWLEVBQW1CO0FBQ2hDdEYsSUFBQUEsRUFBRSxDQUFDbUksTUFBSCxDQUFVLElBQVY7O0FBQ0EsUUFBSSxLQUFLNUYsaUJBQUwsS0FBMkIrQyxPQUEvQixFQUF3QztBQUNwQztBQUNIOztBQUNELFNBQUsvQyxpQkFBTCxHQUF5QitDLE9BQXpCOztBQUNBLFFBQUd0RixFQUFFLENBQUNxRCxJQUFILENBQVErRSxVQUFSLEtBQXVCcEksRUFBRSxDQUFDcUQsSUFBSCxDQUFRZ0YsaUJBQWxDLEVBQXFEO0FBQ2pELFVBQUlDLEtBQUssR0FBR3RJLEVBQUUsQ0FBQ3VJLFlBQUgsQ0FBZ0JDLE1BQTVCO0FBQ0FGLE1BQUFBLEtBQUssQ0FBQ0csT0FBTixDQUFjLFVBQVVDLEtBQVYsRUFBaUI7QUFDM0IsWUFBSUEsS0FBSyxZQUFZMUksRUFBRSxDQUFDMkksU0FBeEIsRUFBbUM7QUFDL0IsY0FBSUMsTUFBTSxHQUFHNUksRUFBRSxDQUFDMkksU0FBSCxDQUFhQyxNQUExQjs7QUFDQSxjQUFJdEQsT0FBSixFQUFhO0FBQ1RvRCxZQUFBQSxLQUFLLENBQUNHLFVBQU4sQ0FBaUJELE1BQU0sQ0FBQ0UsTUFBeEIsRUFBZ0NGLE1BQU0sQ0FBQ0UsTUFBdkM7QUFDSCxXQUZELE1BR0s7QUFDREosWUFBQUEsS0FBSyxDQUFDRyxVQUFOLENBQWlCRCxNQUFNLENBQUNHLE9BQXhCLEVBQWlDSCxNQUFNLENBQUNHLE9BQXhDO0FBQ0g7QUFDSjtBQUNKLE9BVkQ7QUFXSCxLQWJELE1BY0ssSUFBRy9JLEVBQUUsQ0FBQ3FELElBQUgsQ0FBUStFLFVBQVIsS0FBdUJwSSxFQUFFLENBQUNxRCxJQUFILENBQVEyRixrQkFBbEMsRUFBc0Q7QUFDdkQsVUFBSUMsR0FBRyxHQUFHakosRUFBRSxDQUFDcUQsSUFBSCxDQUFRUSxNQUFSLENBQWVxRixVQUFmLENBQTBCLElBQTFCLENBQVY7QUFDQUQsTUFBQUEsR0FBRyxDQUFDRSxxQkFBSixHQUE0QjdELE9BQTVCO0FBQ0EyRCxNQUFBQSxHQUFHLENBQUNHLHdCQUFKLEdBQStCOUQsT0FBL0I7QUFDSDtBQUNKLEdBdFZ1Qjs7QUF3VnhCOzs7Ozs7QUFNQStELEVBQUFBLGtCQUFrQixFQUFFLDhCQUFZO0FBQzVCLFdBQU8sS0FBSzlHLGlCQUFaO0FBQ0gsR0FoV3VCOztBQWlXeEI7Ozs7Ozs7Ozs7QUFVQStHLEVBQUFBLG9CQUFvQixFQUFFLDhCQUFTaEUsT0FBVCxFQUFrQjtBQUNwQyxRQUFJQSxPQUFPLElBQ1BBLE9BQU8sS0FBSyxLQUFLN0QsZUFEakIsSUFFQXpCLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPMEUsUUFGWCxFQUVxQjtBQUNqQjtBQUNBLFdBQUtsRCxlQUFMLEdBQXVCLElBQXZCO0FBQ0F6QixNQUFBQSxFQUFFLENBQUN1SixNQUFILENBQVVDLGNBQVYsQ0FBeUJ4SixFQUFFLENBQUNxRCxJQUFILENBQVE5RCxLQUFqQztBQUNILEtBTkQsTUFPSztBQUNELFdBQUtrQyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0F6QixNQUFBQSxFQUFFLENBQUN1SixNQUFILENBQVVFLHFCQUFWLENBQWdDekosRUFBRSxDQUFDcUQsSUFBSCxDQUFROUQsS0FBeEM7QUFDSDtBQUNKLEdBdlh1Qjs7QUF5WHhCOzs7Ozs7Ozs7QUFTQW1LLEVBQUFBLHVCQUF1QixFQUFFLG1DQUFXO0FBQ2hDLFdBQU8sS0FBS2pJLGVBQVo7QUFDSCxHQXBZdUI7O0FBc1l4Qjs7Ozs7Ozs7QUFRQWtJLEVBQUFBLGFBQWEsRUFBRSx1QkFBVTdGLEtBQVYsRUFBaUJFLE1BQWpCLEVBQXlCO0FBQ3BDLFFBQUlILE1BQU0sR0FBRzdELEVBQUUsQ0FBQ3FELElBQUgsQ0FBUVEsTUFBckI7QUFDQSxRQUFJZ0IsU0FBUyxHQUFHN0UsRUFBRSxDQUFDcUQsSUFBSCxDQUFRd0IsU0FBeEI7QUFFQWhCLElBQUFBLE1BQU0sQ0FBQ0MsS0FBUCxHQUFlQSxLQUFLLEdBQUcsS0FBS3BDLGlCQUE1QjtBQUNBbUMsSUFBQUEsTUFBTSxDQUFDRyxNQUFQLEdBQWdCQSxNQUFNLEdBQUcsS0FBS3RDLGlCQUE5QjtBQUVBbUMsSUFBQUEsTUFBTSxDQUFDaUIsS0FBUCxDQUFhaEIsS0FBYixHQUFxQkEsS0FBSyxHQUFHLElBQTdCO0FBQ0FELElBQUFBLE1BQU0sQ0FBQ2lCLEtBQVAsQ0FBYWQsTUFBYixHQUFzQkEsTUFBTSxHQUFHLElBQS9CO0FBRUFhLElBQUFBLFNBQVMsQ0FBQ0MsS0FBVixDQUFnQmhCLEtBQWhCLEdBQXdCQSxLQUFLLEdBQUcsSUFBaEM7QUFDQWUsSUFBQUEsU0FBUyxDQUFDQyxLQUFWLENBQWdCZCxNQUFoQixHQUF5QkEsTUFBTSxHQUFHLElBQWxDOztBQUVBLFNBQUtHLFlBQUw7QUFDSCxHQTVadUI7O0FBOFp4Qjs7Ozs7Ozs7Ozs7QUFXQXlGLEVBQUFBLGFBQWEsRUFBRSx5QkFBWTtBQUN2QixXQUFPNUosRUFBRSxDQUFDaUIsSUFBSCxDQUFRakIsRUFBRSxDQUFDcUQsSUFBSCxDQUFRUSxNQUFSLENBQWVDLEtBQXZCLEVBQThCOUQsRUFBRSxDQUFDcUQsSUFBSCxDQUFRUSxNQUFSLENBQWVHLE1BQTdDLENBQVA7QUFDSCxHQTNhdUI7O0FBNmF4Qjs7Ozs7Ozs7Ozs7QUFXQTZGLEVBQUFBLFlBQVksRUFBRSx3QkFBWTtBQUN0QixXQUFPN0osRUFBRSxDQUFDaUIsSUFBSCxDQUFRLEtBQUtELFVBQUwsQ0FBZ0I4QyxLQUF4QixFQUErQixLQUFLOUMsVUFBTCxDQUFnQmdELE1BQS9DLENBQVA7QUFDSCxHQTFidUI7O0FBNGJ4Qjs7Ozs7Ozs7OztBQVVBOEYsRUFBQUEsWUFBWSxFQUFFLHNCQUFVaEcsS0FBVixFQUFpQkUsTUFBakIsRUFBeUI7QUFDbkMsU0FBS2hELFVBQUwsQ0FBZ0I4QyxLQUFoQixHQUF3QkEsS0FBeEI7QUFDQSxTQUFLOUMsVUFBTCxDQUFnQmdELE1BQWhCLEdBQXlCQSxNQUF6QjtBQUNBaEUsSUFBQUEsRUFBRSxDQUFDcUQsSUFBSCxDQUFROUQsS0FBUixDQUFjdUYsS0FBZCxDQUFvQmhCLEtBQXBCLEdBQTRCQSxLQUFLLEdBQUcsSUFBcEM7QUFDQTlELElBQUFBLEVBQUUsQ0FBQ3FELElBQUgsQ0FBUTlELEtBQVIsQ0FBY3VGLEtBQWQsQ0FBb0JkLE1BQXBCLEdBQTZCQSxNQUFNLEdBQUcsSUFBdEM7O0FBQ0EsU0FBS0csWUFBTCxDQUFrQixJQUFsQjtBQUNILEdBNWN1Qjs7QUE4Y3hCOzs7Ozs7O0FBT0E0RixFQUFBQSxjQUFjLEVBQUUsMEJBQVk7QUFDeEIsV0FBTy9KLEVBQUUsQ0FBQ2lCLElBQUgsQ0FBUSxLQUFLTyxZQUFMLENBQWtCc0MsS0FBMUIsRUFBZ0MsS0FBS3RDLFlBQUwsQ0FBa0J3QyxNQUFsRCxDQUFQO0FBQ0gsR0F2ZHVCOztBQXlkeEI7Ozs7Ozs7QUFPQWdHLEVBQUFBLHFCQUFxQixFQUFFLGlDQUFZO0FBQy9CLFdBQU9oSyxFQUFFLENBQUNpQixJQUFILENBQVMsS0FBS08sWUFBTCxDQUFrQnNDLEtBQWxCLEdBQTBCLEtBQUsxQyxPQUF4QyxFQUNTLEtBQUtJLFlBQUwsQ0FBa0J3QyxNQUFsQixHQUEyQixLQUFLM0MsT0FEekMsQ0FBUDtBQUVILEdBbmV1Qjs7QUFxZXhCOzs7Ozs7O0FBT0E0SSxFQUFBQSxnQkFBZ0IsRUFBRSw0QkFBWTtBQUMxQixXQUFPakssRUFBRSxDQUFDa0ssRUFBSCxDQUFNLEtBQUsxSSxZQUFMLENBQWtCMkksQ0FBeEIsRUFBMEIsS0FBSzNJLFlBQUwsQ0FBa0I0SSxDQUE1QyxDQUFQO0FBQ0gsR0E5ZXVCOztBQWdmeEI7Ozs7Ozs7QUFPQUMsRUFBQUEsdUJBQXVCLEVBQUUsbUNBQVk7QUFDakMsV0FBT3JLLEVBQUUsQ0FBQ2tLLEVBQUgsQ0FBTSxLQUFLMUksWUFBTCxDQUFrQjJJLENBQWxCLEdBQXNCLEtBQUsvSSxPQUFqQyxFQUNLLEtBQUtJLFlBQUwsQ0FBa0I0SSxDQUFsQixHQUFzQixLQUFLL0ksT0FEaEMsQ0FBUDtBQUVILEdBMWZ1Qjs7QUE0ZnhCOzs7Ozs7OztBQVFBaUosRUFBQUEsbUJBQW1CLEVBQUUsK0JBQVk7QUFDN0IsV0FBTyxLQUFLOUgsaUJBQVo7QUFDSCxHQXRnQnVCOztBQXdnQnhCOzs7Ozs7OztBQVFBK0gsRUFBQUEsbUJBQW1CLEVBQUUsNkJBQVVDLGdCQUFWLEVBQTRCO0FBQzdDLFFBQUk3SixFQUFFLEdBQUcsSUFBVDs7QUFDQSxRQUFJNkosZ0JBQWdCLFlBQVl4SyxFQUFFLENBQUMwQyxnQkFBbkMsRUFBcUQ7QUFDakQvQixNQUFBQSxFQUFFLENBQUM2QixpQkFBSCxHQUF1QmdJLGdCQUF2QjtBQUNILEtBRkQsQ0FHQTtBQUhBLFNBSUs7QUFDRCxZQUFJQyxVQUFVLEdBQUd6SyxFQUFFLENBQUMwQyxnQkFBcEI7QUFDQSxZQUFHOEgsZ0JBQWdCLEtBQUtDLFVBQVUsQ0FBQzdILFNBQW5DLEVBQ0lqQyxFQUFFLENBQUM2QixpQkFBSCxHQUF1QjdCLEVBQUUsQ0FBQzhCLFdBQTFCO0FBQ0osWUFBRytILGdCQUFnQixLQUFLQyxVQUFVLENBQUMzSCxRQUFuQyxFQUNJbkMsRUFBRSxDQUFDNkIsaUJBQUgsR0FBdUI3QixFQUFFLENBQUNrQyxVQUExQjtBQUNKLFlBQUcySCxnQkFBZ0IsS0FBS0MsVUFBVSxDQUFDekgsU0FBbkMsRUFDSXJDLEVBQUUsQ0FBQzZCLGlCQUFILEdBQXVCN0IsRUFBRSxDQUFDb0MsV0FBMUI7QUFDSixZQUFHeUgsZ0JBQWdCLEtBQUtDLFVBQVUsQ0FBQ3ZILFlBQW5DLEVBQ0l2QyxFQUFFLENBQUM2QixpQkFBSCxHQUF1QjdCLEVBQUUsQ0FBQ3NDLGNBQTFCO0FBQ0osWUFBR3VILGdCQUFnQixLQUFLQyxVQUFVLENBQUNySCxXQUFuQyxFQUNJekMsRUFBRSxDQUFDNkIsaUJBQUgsR0FBdUI3QixFQUFFLENBQUN3QyxhQUExQjtBQUNQO0FBQ0osR0FuaUJ1Qjs7QUFxaUJ4Qjs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQW1CLEVBQUFBLHVCQUF1QixFQUFFLGlDQUFVUixLQUFWLEVBQWlCRSxNQUFqQixFQUF5QndHLGdCQUF6QixFQUEyQztBQUNoRTtBQUNBLFFBQUksRUFBRTFHLEtBQUssR0FBRyxDQUFSLElBQWFFLE1BQU0sR0FBRyxDQUF4QixDQUFKLEVBQWdDO0FBQzVCaEUsTUFBQUEsRUFBRSxDQUFDMEssT0FBSCxDQUFXLElBQVg7QUFDQTtBQUNIOztBQUVELFNBQUtILG1CQUFMLENBQXlCQyxnQkFBekI7QUFDQSxRQUFJRyxNQUFNLEdBQUcsS0FBS25JLGlCQUFsQjs7QUFDQSxRQUFJbUksTUFBSixFQUFZO0FBQ1JBLE1BQUFBLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQixJQUFoQjtBQUNILEtBWCtELENBYWhFOzs7QUFDQSxRQUFJNUssRUFBRSxDQUFDQyxHQUFILENBQU8wRSxRQUFYLEVBQ0ksS0FBS2lELG1CQUFMLEdBZjRELENBaUJoRTs7QUFDQSxTQUFLM0Ysb0JBQUwsR0FBNEIsSUFBNUIsQ0FsQmdFLENBbUJoRTs7QUFDQSxRQUFJLENBQUMsS0FBS0YsU0FBVixFQUNJLEtBQUs0QixjQUFMOztBQUVKLFFBQUksQ0FBQ2dILE1BQUwsRUFBYTtBQUNUM0ssTUFBQUEsRUFBRSxDQUFDNkssS0FBSCxDQUFTLElBQVQ7QUFDQTtBQUNIOztBQUVELFNBQUsxSiw2QkFBTCxDQUFtQzJDLEtBQW5DLEdBQTJDLEtBQUs1QyxxQkFBTCxDQUEyQjRDLEtBQTNCLEdBQW1DQSxLQUE5RTtBQUNBLFNBQUszQyw2QkFBTCxDQUFtQzZDLE1BQW5DLEdBQTRDLEtBQUs5QyxxQkFBTCxDQUEyQjhDLE1BQTNCLEdBQW9DQSxNQUFoRjtBQUVBLFFBQUk4RyxNQUFNLEdBQUdILE1BQU0sQ0FBQ0ksS0FBUCxDQUFhLElBQWIsRUFBbUIsS0FBSzdKLHFCQUF4QixDQUFiOztBQUVBLFFBQUc0SixNQUFNLENBQUNFLEtBQVAsSUFBZ0JGLE1BQU0sQ0FBQ0UsS0FBUCxDQUFhQyxNQUFiLEtBQXdCLENBQTNDLEVBQTZDO0FBQ3pDLFdBQUs3SixPQUFMLEdBQWUwSixNQUFNLENBQUNFLEtBQVAsQ0FBYSxDQUFiLENBQWY7QUFDQSxXQUFLM0osT0FBTCxHQUFleUosTUFBTSxDQUFDRSxLQUFQLENBQWEsQ0FBYixDQUFmO0FBQ0g7O0FBRUQsUUFBR0YsTUFBTSxDQUFDSSxRQUFWLEVBQW1CO0FBQ2YsVUFBSXpFLEVBQUUsR0FBRyxLQUFLbkYsYUFBZDtBQUFBLFVBQ0k2SixFQUFFLEdBQUcsS0FBSzNKLFlBRGQ7QUFBQSxVQUVJNEosRUFBRSxHQUFHTixNQUFNLENBQUNJLFFBRmhCO0FBSUF6RSxNQUFBQSxFQUFFLENBQUMwRCxDQUFILEdBQU9pQixFQUFFLENBQUNqQixDQUFWO0FBQ0ExRCxNQUFBQSxFQUFFLENBQUMyRCxDQUFILEdBQU9nQixFQUFFLENBQUNoQixDQUFWO0FBQ0EzRCxNQUFBQSxFQUFFLENBQUMzQyxLQUFILEdBQVdzSCxFQUFFLENBQUN0SCxLQUFkO0FBQ0EyQyxNQUFBQSxFQUFFLENBQUN6QyxNQUFILEdBQVlvSCxFQUFFLENBQUNwSCxNQUFmO0FBRUFtSCxNQUFBQSxFQUFFLENBQUNoQixDQUFILEdBQU8sQ0FBUDtBQUNBZ0IsTUFBQUEsRUFBRSxDQUFDZixDQUFILEdBQU8sQ0FBUDtBQUNBZSxNQUFBQSxFQUFFLENBQUNySCxLQUFILEdBQVdzSCxFQUFFLENBQUN0SCxLQUFILEdBQVcsS0FBSzFDLE9BQTNCO0FBQ0ErSixNQUFBQSxFQUFFLENBQUNuSCxNQUFILEdBQVlvSCxFQUFFLENBQUNwSCxNQUFILEdBQVksS0FBSzNDLE9BQTdCO0FBQ0g7O0FBRURzSixJQUFBQSxNQUFNLENBQUNVLFNBQVAsQ0FBaUIsSUFBakI7QUFDQXJMLElBQUFBLEVBQUUsQ0FBQ2lFLE9BQUgsQ0FBV0gsS0FBWCxHQUFtQixLQUFLdEMsWUFBTCxDQUFrQnNDLEtBQXJDO0FBQ0E5RCxJQUFBQSxFQUFFLENBQUNpRSxPQUFILENBQVdELE1BQVgsR0FBb0IsS0FBS3hDLFlBQUwsQ0FBa0J3QyxNQUF0QztBQUVBaEUsSUFBQUEsRUFBRSxDQUFDa0UsV0FBSCxJQUFrQmxFLEVBQUUsQ0FBQ2tFLFdBQUgsQ0FBZWhGLElBQWYsQ0FBb0IsS0FBS3NDLFlBQXpCLENBQWxCO0FBRUF4QyxJQUFBQSxRQUFRLENBQUNzTSxvQkFBVDs7QUFDQXRMLElBQUFBLEVBQUUsQ0FBQ3VMLFFBQUgsQ0FBWUMsWUFBWixDQUF5QkMseUJBQXpCOztBQUNBLFNBQUt4RyxJQUFMLENBQVUsMkJBQVY7QUFDSCxHQXBuQnVCOztBQXNuQnhCOzs7Ozs7Ozs7QUFTQXlHLEVBQUFBLHVCQUF1QixFQUFFLG1DQUFZO0FBQ2pDLFdBQU8xTCxFQUFFLENBQUNpQixJQUFILENBQVEsS0FBS0MscUJBQUwsQ0FBMkI0QyxLQUFuQyxFQUEwQyxLQUFLNUMscUJBQUwsQ0FBMkI4QyxNQUFyRSxDQUFQO0FBQ0gsR0Fqb0J1Qjs7QUFtb0J4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEySCxFQUFBQSxzQkFBc0IsRUFBRSxnQ0FBVTdILEtBQVYsRUFBaUJFLE1BQWpCLEVBQXlCd0csZ0JBQXpCLEVBQTJDO0FBQy9ELFFBQUksQ0FBQzdJLE1BQUQsSUFBVyxDQUFDa0csVUFBaEIsRUFBNEI7QUFDeEI7QUFDQSxXQUFLdkIsZ0JBQUwsQ0FBc0I7QUFBQyxpQkFBU3hDO0FBQVYsT0FBdEIsRUFBd0MsSUFBeEMsRUFGd0IsQ0FJeEI7OztBQUNBMUUsTUFBQUEsUUFBUSxDQUFDd00sZUFBVCxDQUF5QjlHLEtBQXpCLENBQStCaEIsS0FBL0IsR0FBdUNBLEtBQUssR0FBRyxJQUEvQztBQUNBMUUsTUFBQUEsUUFBUSxDQUFDeU0sSUFBVCxDQUFjL0csS0FBZCxDQUFvQmhCLEtBQXBCLEdBQTRCQSxLQUFLLEdBQUcsSUFBcEM7QUFDQTFFLE1BQUFBLFFBQVEsQ0FBQ3lNLElBQVQsQ0FBYy9HLEtBQWQsQ0FBb0JnSCxJQUFwQixHQUEyQixLQUEzQjtBQUNBMU0sTUFBQUEsUUFBUSxDQUFDeU0sSUFBVCxDQUFjL0csS0FBZCxDQUFvQmlILEdBQXBCLEdBQTBCLEtBQTFCO0FBQ0gsS0FWOEQsQ0FZL0Q7OztBQUNBLFNBQUt6SCx1QkFBTCxDQUE2QlIsS0FBN0IsRUFBb0NFLE1BQXBDLEVBQTRDd0csZ0JBQTVDO0FBQ0gsR0FscUJ1Qjs7QUFvcUJ4Qjs7Ozs7Ozs7Ozs7QUFXQXdCLEVBQUFBLG1CQUFtQixFQUFFLDZCQUFVN0IsQ0FBVixFQUFhQyxDQUFiLEVBQWdCeEcsQ0FBaEIsRUFBbUJHLENBQW5CLEVBQXNCO0FBQ3ZDLFFBQUlrSSxTQUFTLEdBQUcsS0FBSzdLLE9BQXJCO0FBQUEsUUFBOEI4SyxTQUFTLEdBQUcsS0FBSzdLLE9BQS9DOztBQUNBckIsSUFBQUEsRUFBRSxDQUFDcUQsSUFBSCxDQUFROEksY0FBUixDQUF1QmpCLFFBQXZCLENBQWlDZixDQUFDLEdBQUc4QixTQUFKLEdBQWdCLEtBQUszSyxhQUFMLENBQW1CNkksQ0FBcEUsRUFDS0MsQ0FBQyxHQUFHOEIsU0FBSixHQUFnQixLQUFLNUssYUFBTCxDQUFtQjhJLENBRHhDLEVBRUt4RyxDQUFDLEdBQUdxSSxTQUZULEVBR0tsSSxDQUFDLEdBQUdtSSxTQUhUO0FBSUgsR0FyckJ1Qjs7QUF1ckJ4Qjs7Ozs7Ozs7Ozs7QUFXQUUsRUFBQUEsa0JBQWtCLEVBQUUsNEJBQVVqQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0J4RyxDQUFoQixFQUFtQkcsQ0FBbkIsRUFBc0I7QUFDdEMsUUFBSXNJLE1BQU0sR0FBRyxLQUFLakwsT0FBbEI7QUFBQSxRQUEyQmtMLE1BQU0sR0FBRyxLQUFLakwsT0FBekM7QUFDQSxRQUFJa0wsRUFBRSxHQUFHQyxJQUFJLENBQUNDLElBQUwsQ0FBVXRDLENBQUMsR0FBR2tDLE1BQUosR0FBYSxLQUFLL0ssYUFBTCxDQUFtQjZJLENBQTFDLENBQVQ7QUFDQSxRQUFJdUMsRUFBRSxHQUFHRixJQUFJLENBQUNDLElBQUwsQ0FBVXJDLENBQUMsR0FBR2tDLE1BQUosR0FBYSxLQUFLaEwsYUFBTCxDQUFtQjhJLENBQTFDLENBQVQ7QUFDQSxRQUFJdUMsRUFBRSxHQUFHSCxJQUFJLENBQUNDLElBQUwsQ0FBVTdJLENBQUMsR0FBR3lJLE1BQWQsQ0FBVDtBQUNBLFFBQUlPLEVBQUUsR0FBR0osSUFBSSxDQUFDQyxJQUFMLENBQVUxSSxDQUFDLEdBQUd1SSxNQUFkLENBQVQ7QUFDQSxRQUFJTyxFQUFFLEdBQUc3TSxFQUFFLENBQUNxRCxJQUFILENBQVE4SSxjQUFqQjs7QUFFQSxRQUFJLENBQUMzTCxZQUFMLEVBQW1CO0FBQ2YsVUFBSXNNLE1BQU0sR0FBR0QsRUFBRSxDQUFDRSxZQUFILENBQWdCRixFQUFFLENBQUNHLFdBQW5CLENBQWI7QUFDQXhNLE1BQUFBLFlBQVksR0FBR1IsRUFBRSxDQUFDdUIsSUFBSCxDQUFRdUwsTUFBTSxDQUFDLENBQUQsQ0FBZCxFQUFtQkEsTUFBTSxDQUFDLENBQUQsQ0FBekIsRUFBOEJBLE1BQU0sQ0FBQyxDQUFELENBQXBDLEVBQXlDQSxNQUFNLENBQUMsQ0FBRCxDQUEvQyxDQUFmO0FBQ0g7O0FBRUQsUUFBSXRNLFlBQVksQ0FBQzJKLENBQWIsS0FBbUJvQyxFQUFuQixJQUF5Qi9MLFlBQVksQ0FBQzRKLENBQWIsS0FBbUJzQyxFQUE1QyxJQUFrRGxNLFlBQVksQ0FBQ3NELEtBQWIsS0FBdUI2SSxFQUF6RSxJQUErRW5NLFlBQVksQ0FBQ3dELE1BQWIsS0FBd0I0SSxFQUEzRyxFQUErRztBQUMzR3BNLE1BQUFBLFlBQVksQ0FBQzJKLENBQWIsR0FBaUJvQyxFQUFqQjtBQUNBL0wsTUFBQUEsWUFBWSxDQUFDNEosQ0FBYixHQUFpQnNDLEVBQWpCO0FBQ0FsTSxNQUFBQSxZQUFZLENBQUNzRCxLQUFiLEdBQXFCNkksRUFBckI7QUFDQW5NLE1BQUFBLFlBQVksQ0FBQ3dELE1BQWIsR0FBc0I0SSxFQUF0QjtBQUNBQyxNQUFBQSxFQUFFLENBQUNJLE9BQUgsQ0FBV1YsRUFBWCxFQUFlRyxFQUFmLEVBQW1CQyxFQUFuQixFQUF1QkMsRUFBdkI7QUFDSDtBQUNKLEdBdHRCdUI7O0FBd3RCeEI7Ozs7Ozs7O0FBUUFNLEVBQUFBLGdCQUFnQixFQUFFLDRCQUFZO0FBQzFCLFdBQU9sTixFQUFFLENBQUNxRCxJQUFILENBQVE4SSxjQUFSLENBQXVCZ0IsU0FBdkIsQ0FBaUNOLEVBQUUsQ0FBQ08sWUFBcEMsQ0FBUDtBQUNILEdBbHVCdUI7O0FBb3VCeEI7Ozs7Ozs7O0FBUUFDLEVBQUFBLGNBQWMsRUFBRSwwQkFBWTtBQUN4QixRQUFJLENBQUM3TSxZQUFMLEVBQW1CO0FBQ2YsVUFBSXNNLE1BQU0sR0FBR0QsRUFBRSxDQUFDRSxZQUFILENBQWdCRixFQUFFLENBQUNHLFdBQW5CLENBQWI7QUFDQXhNLE1BQUFBLFlBQVksR0FBR1IsRUFBRSxDQUFDdUIsSUFBSCxDQUFRdUwsTUFBTSxDQUFDLENBQUQsQ0FBZCxFQUFtQkEsTUFBTSxDQUFDLENBQUQsQ0FBekIsRUFBOEJBLE1BQU0sQ0FBQyxDQUFELENBQXBDLEVBQXlDQSxNQUFNLENBQUMsQ0FBRCxDQUEvQyxDQUFmO0FBQ0g7O0FBQ0QsUUFBSVEsWUFBWSxHQUFHLElBQUksS0FBS2xNLE9BQTVCO0FBQ0EsUUFBSW1NLFlBQVksR0FBRyxJQUFJLEtBQUtsTSxPQUE1QjtBQUNBLFdBQU9yQixFQUFFLENBQUN1QixJQUFILENBQ0gsQ0FBQ2YsWUFBWSxDQUFDMkosQ0FBYixHQUFpQixLQUFLN0ksYUFBTCxDQUFtQjZJLENBQXJDLElBQTBDbUQsWUFEdkMsRUFFSCxDQUFDOU0sWUFBWSxDQUFDNEosQ0FBYixHQUFpQixLQUFLOUksYUFBTCxDQUFtQjhJLENBQXJDLElBQTBDbUQsWUFGdkMsRUFHSC9NLFlBQVksQ0FBQ3NELEtBQWIsR0FBcUJ3SixZQUhsQixFQUlIOU0sWUFBWSxDQUFDd0QsTUFBYixHQUFzQnVKLFlBSm5CLENBQVA7QUFNSCxHQXp2QnVCOztBQTJ2QnhCOzs7Ozs7O0FBT0FDLEVBQUFBLGVBQWUsRUFBRSwyQkFBWTtBQUN6QixXQUFPLEtBQUtsTSxhQUFaO0FBQ0gsR0Fwd0J1Qjs7QUFzd0J4Qjs7Ozs7OztBQU9BbU0sRUFBQUEsU0FBUyxFQUFFLHFCQUFZO0FBQ25CLFdBQU8sS0FBS3JNLE9BQVo7QUFDSCxHQS93QnVCOztBQWl4QnhCOzs7Ozs7O0FBT0FzTSxFQUFBQSxTQUFTLEVBQUUscUJBQVk7QUFDbkIsV0FBTyxLQUFLck0sT0FBWjtBQUNILEdBMXhCdUI7O0FBNHhCeEI7Ozs7Ozs7QUFPQXNNLEVBQUFBLG1CQUFtQixFQUFFLCtCQUFXO0FBQzVCLFdBQU8sS0FBS2pNLGlCQUFaO0FBQ0gsR0FyeUJ1Qjs7QUF1eUJ4Qjs7Ozs7Ozs7OztBQVVBa00sRUFBQUEsdUJBQXVCLEVBQUUsaUNBQVVDLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkMsVUFBbEIsRUFBOEJDLEdBQTlCLEVBQW1DO0FBQ3hELFFBQUlsRCxNQUFNLEdBQUdrRCxHQUFHLElBQUloTyxFQUFFLENBQUNrSyxFQUFILEVBQXBCO0FBQ0EsUUFBSStELE9BQU8sR0FBR0YsVUFBVSxDQUFDRyxZQUFYLEdBQTBCSCxVQUFVLENBQUNHLFlBQXJDLEdBQW9ESCxVQUFVLENBQUNqQyxJQUE3RTtBQUNBLFFBQUlxQyxNQUFNLEdBQUdKLFVBQVUsQ0FBQ0ssV0FBWCxHQUF5QkwsVUFBVSxDQUFDSyxXQUFwQyxHQUFrREwsVUFBVSxDQUFDaEMsR0FBMUU7QUFDQSxRQUFJNUIsQ0FBQyxHQUFHLEtBQUt6SSxpQkFBTCxJQUEwQm1NLEVBQUUsR0FBR0ksT0FBL0IsQ0FBUjtBQUNBLFFBQUk3RCxDQUFDLEdBQUcsS0FBSzFJLGlCQUFMLElBQTBCeU0sTUFBTSxHQUFHSixVQUFVLENBQUMvSixNQUFwQixHQUE2QjhKLEVBQXZELENBQVI7O0FBQ0EsUUFBSSxLQUFLNUwsVUFBVCxFQUFxQjtBQUNqQjRJLE1BQUFBLE1BQU0sQ0FBQ1gsQ0FBUCxHQUFXbkssRUFBRSxDQUFDcUQsSUFBSCxDQUFRUSxNQUFSLENBQWVDLEtBQWYsR0FBdUJzRyxDQUFsQztBQUNBVSxNQUFBQSxNQUFNLENBQUNWLENBQVAsR0FBV0QsQ0FBWDtBQUNILEtBSEQsTUFJSztBQUNEVyxNQUFBQSxNQUFNLENBQUNYLENBQVAsR0FBV0EsQ0FBWDtBQUNBVyxNQUFBQSxNQUFNLENBQUNWLENBQVAsR0FBV0EsQ0FBWDtBQUNIOztBQUNELFdBQU9VLE1BQVA7QUFDSCxHQWgwQnVCO0FBazBCeEJ1RCxFQUFBQSw2QkFBNkIsRUFBRSx1Q0FBVUMsWUFBVixFQUF3QlAsVUFBeEIsRUFBb0M7QUFDL0QsUUFBSTdDLFFBQVEsR0FBRyxLQUFLNUosYUFBcEI7QUFBQSxRQUFtQ1gsRUFBRSxHQUFHLElBQXhDOztBQUNBMk4sSUFBQUEsWUFBWSxDQUFDbkUsQ0FBYixHQUFpQixDQUFFeEosRUFBRSxDQUFDZSxpQkFBSCxJQUF3QjRNLFlBQVksQ0FBQ25FLENBQWIsR0FBaUI0RCxVQUFVLENBQUNqQyxJQUFwRCxDQUFELEdBQThEWixRQUFRLENBQUNmLENBQXhFLElBQTZFeEosRUFBRSxDQUFDUyxPQUFqRztBQUNBa04sSUFBQUEsWUFBWSxDQUFDbEUsQ0FBYixHQUFpQixDQUFDekosRUFBRSxDQUFDZSxpQkFBSCxJQUF3QnFNLFVBQVUsQ0FBQ2hDLEdBQVgsR0FBaUJnQyxVQUFVLENBQUMvSixNQUE1QixHQUFxQ3NLLFlBQVksQ0FBQ2xFLENBQTFFLElBQStFYyxRQUFRLENBQUNkLENBQXpGLElBQThGekosRUFBRSxDQUFDVSxPQUFsSDtBQUNILEdBdDBCdUI7QUF3MEJ4QmtOLEVBQUFBLHNCQUFzQixFQUFFLGdDQUFVQyxLQUFWLEVBQWlCO0FBQ3JDLFFBQUl0RCxRQUFRLEdBQUcsS0FBSzVKLGFBQXBCO0FBQ0FrTixJQUFBQSxLQUFLLENBQUNyRSxDQUFOLEdBQVUsQ0FBQ3FFLEtBQUssQ0FBQ3JFLENBQU4sR0FBVWUsUUFBUSxDQUFDZixDQUFwQixJQUF5QixLQUFLL0ksT0FBeEM7QUFDQW9OLElBQUFBLEtBQUssQ0FBQ3BFLENBQU4sR0FBVSxDQUFDb0UsS0FBSyxDQUFDcEUsQ0FBTixHQUFVYyxRQUFRLENBQUNkLENBQXBCLElBQXlCLEtBQUsvSSxPQUF4QztBQUNILEdBNTBCdUI7QUE4MEJ4Qm9OLEVBQUFBLHdCQUF3QixFQUFFLGtDQUFVQyxPQUFWLEVBQW1CO0FBQ3pDLFFBQUl4RCxRQUFRLEdBQUcsS0FBSzVKLGFBQXBCO0FBQUEsUUFBbUMrSyxNQUFNLEdBQUcsS0FBS2pMLE9BQWpEO0FBQUEsUUFBMERrTCxNQUFNLEdBQUcsS0FBS2pMLE9BQXhFO0FBQUEsUUFDSXNOLFFBREo7QUFBQSxRQUNjQyxRQURkO0FBQUEsUUFDd0JDLFdBRHhCOztBQUVBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0osT0FBTyxDQUFDekQsTUFBNUIsRUFBb0M2RCxDQUFDLEVBQXJDLEVBQXlDO0FBQ3JDSCxNQUFBQSxRQUFRLEdBQUdELE9BQU8sQ0FBQ0ksQ0FBRCxDQUFsQjtBQUNBRixNQUFBQSxRQUFRLEdBQUdELFFBQVEsQ0FBQ0ksTUFBcEI7QUFDQUYsTUFBQUEsV0FBVyxHQUFHRixRQUFRLENBQUNLLFVBQXZCO0FBRUFKLE1BQUFBLFFBQVEsQ0FBQ3pFLENBQVQsR0FBYSxDQUFDeUUsUUFBUSxDQUFDekUsQ0FBVCxHQUFhZSxRQUFRLENBQUNmLENBQXZCLElBQTRCa0MsTUFBekM7QUFDQXVDLE1BQUFBLFFBQVEsQ0FBQ3hFLENBQVQsR0FBYSxDQUFDd0UsUUFBUSxDQUFDeEUsQ0FBVCxHQUFhYyxRQUFRLENBQUNkLENBQXZCLElBQTRCa0MsTUFBekM7QUFDQXVDLE1BQUFBLFdBQVcsQ0FBQzFFLENBQVosR0FBZ0IsQ0FBQzBFLFdBQVcsQ0FBQzFFLENBQVosR0FBZ0JlLFFBQVEsQ0FBQ2YsQ0FBMUIsSUFBK0JrQyxNQUEvQztBQUNBd0MsTUFBQUEsV0FBVyxDQUFDekUsQ0FBWixHQUFnQixDQUFDeUUsV0FBVyxDQUFDekUsQ0FBWixHQUFnQmMsUUFBUSxDQUFDZCxDQUExQixJQUErQmtDLE1BQS9DO0FBQ0g7QUFDSjtBQTMxQnVCLENBQTVCO0FBODFCQTs7Ozs7Ozs7QUFPQzs7Ozs7Ozs7QUFTRDs7Ozs7OztBQU1BdE0sRUFBRSxDQUFDYSxpQkFBSCxHQUF1QmIsRUFBRSxDQUFDaVAsS0FBSCxDQUFTO0FBQzVCNUgsRUFBQUEsSUFBSSxFQUFFLG1CQURzQjs7QUFFNUI7Ozs7Ozs7QUFPQXVELEVBQUFBLFFBQVEsRUFBRSxrQkFBVXZHLElBQVYsRUFBZ0IsQ0FDekIsQ0FWMkI7O0FBWTVCOzs7Ozs7OztBQVFBMEcsRUFBQUEsS0FBSyxFQUFFLGVBQVUxRyxJQUFWLEVBQWdCNkssa0JBQWhCLEVBQW9DLENBQzFDLENBckIyQjs7QUF1QjVCOzs7Ozs7O0FBT0E3RCxFQUFBQSxTQUFTLEVBQUUsbUJBQVVoSCxJQUFWLEVBQWdCLENBRTFCLENBaEMyQjtBQWtDNUI4SyxFQUFBQSxlQUFlLEVBQUUseUJBQVU5SyxJQUFWLEVBQWdCVCxDQUFoQixFQUFtQkcsQ0FBbkIsRUFBc0I7QUFDbkMsUUFBSXFMLFNBQVMsR0FBR3BQLEVBQUUsQ0FBQ3FELElBQUgsQ0FBUVEsTUFBeEI7O0FBRUEsU0FBS3dMLFdBQUwsQ0FBaUJoTCxJQUFqQixFQUF1QlQsQ0FBdkIsRUFBMEJHLENBQTFCLEVBSG1DLENBS25DOzs7QUFDQSxRQUFJdUwsZ0JBQWdCLEdBQUdqTCxJQUFJLENBQUMzQyxpQkFBTCxHQUF5QixDQUFoRDs7QUFDQSxRQUFHQyxNQUFILEVBQVU7QUFDTjtBQUNBMk4sTUFBQUEsZ0JBQWdCLEdBQUdqTCxJQUFJLENBQUMzQyxpQkFBTCxHQUF5QmxDLE1BQU0sQ0FBQzhQLGdCQUFuRDtBQUNILEtBSEQsTUFHTSxJQUFJakwsSUFBSSxDQUFDNEQsZUFBTCxFQUFKLEVBQTRCO0FBQzlCcUgsTUFBQUEsZ0JBQWdCLEdBQUdqTCxJQUFJLENBQUMzQyxpQkFBTCxHQUF5QjhLLElBQUksQ0FBQytDLEdBQUwsQ0FBU2xMLElBQUksQ0FBQ3pDLGNBQWQsRUFBOEJwQyxNQUFNLENBQUM4UCxnQkFBUCxJQUEyQixDQUF6RCxDQUE1QztBQUNILEtBWmtDLENBYW5DOzs7QUFDQUYsSUFBQUEsU0FBUyxDQUFDdEwsS0FBVixHQUFrQkYsQ0FBQyxHQUFHMEwsZ0JBQXRCO0FBQ0FGLElBQUFBLFNBQVMsQ0FBQ3BMLE1BQVYsR0FBbUJELENBQUMsR0FBR3VMLGdCQUF2QjtBQUNILEdBbEQyQjtBQW9ENUJELEVBQUFBLFdBQVcsRUFBRSxxQkFBVWhMLElBQVYsRUFBZ0JULENBQWhCLEVBQW1CRyxDQUFuQixFQUFzQjtBQUMvQixRQUFJcUwsU0FBUyxHQUFHcFAsRUFBRSxDQUFDcUQsSUFBSCxDQUFRUSxNQUF4QjtBQUNBLFFBQUkyTCxZQUFZLEdBQUd4UCxFQUFFLENBQUNxRCxJQUFILENBQVF3QixTQUEzQjs7QUFDQSxRQUFJN0UsRUFBRSxDQUFDQyxHQUFILENBQU9FLEVBQVAsS0FBY0gsRUFBRSxDQUFDQyxHQUFILENBQU93UCxVQUF6QixFQUFxQztBQUNqQ3JRLE1BQUFBLFFBQVEsQ0FBQ3lNLElBQVQsQ0FBYy9HLEtBQWQsQ0FBb0JoQixLQUFwQixHQUE0QixDQUFDTyxJQUFJLENBQUNuQyxVQUFMLEdBQWtCNkIsQ0FBbEIsR0FBc0JILENBQXZCLElBQTRCLElBQXhEO0FBQ0F4RSxNQUFBQSxRQUFRLENBQUN5TSxJQUFULENBQWMvRyxLQUFkLENBQW9CZCxNQUFwQixHQUE2QixDQUFDSyxJQUFJLENBQUNuQyxVQUFMLEdBQWtCMEIsQ0FBbEIsR0FBc0JHLENBQXZCLElBQTRCLElBQXpEO0FBQ0gsS0FOOEIsQ0FPL0I7OztBQUNBeUwsSUFBQUEsWUFBWSxDQUFDMUssS0FBYixDQUFtQmhCLEtBQW5CLEdBQTJCc0wsU0FBUyxDQUFDdEssS0FBVixDQUFnQmhCLEtBQWhCLEdBQXdCRixDQUFDLEdBQUcsSUFBdkQ7QUFDQTRMLElBQUFBLFlBQVksQ0FBQzFLLEtBQWIsQ0FBbUJkLE1BQW5CLEdBQTRCb0wsU0FBUyxDQUFDdEssS0FBVixDQUFnQmQsTUFBaEIsR0FBeUJELENBQUMsR0FBRyxJQUF6RDtBQUNILEdBOUQyQjtBQWdFNUIyTCxFQUFBQSxhQUFhLEVBQUUseUJBQVk7QUFDdkI7QUFDQXRRLElBQUFBLFFBQVEsQ0FBQ3lNLElBQVQsQ0FBYzhELFlBQWQsQ0FBMkIzUCxFQUFFLENBQUNxRCxJQUFILENBQVF3QixTQUFuQyxFQUE4Q3pGLFFBQVEsQ0FBQ3lNLElBQVQsQ0FBYytELFVBQTVELEVBRnVCLENBR3ZCOztBQUNBLFFBQUlDLEVBQUUsR0FBR3pRLFFBQVEsQ0FBQ3lNLElBQVQsQ0FBYy9HLEtBQXZCO0FBQ0ErSyxJQUFBQSxFQUFFLENBQUMvTCxLQUFILEdBQVd0RSxNQUFNLENBQUNDLFVBQVAsR0FBb0IsSUFBL0I7QUFDQW9RLElBQUFBLEVBQUUsQ0FBQzdMLE1BQUgsR0FBWXhFLE1BQU0sQ0FBQ0ksV0FBUCxHQUFxQixJQUFqQztBQUNBaVEsSUFBQUEsRUFBRSxDQUFDQyxRQUFILEdBQWMsUUFBZCxDQVB1QixDQVF2Qjs7QUFDQSxRQUFJQyxTQUFTLEdBQUcvUCxFQUFFLENBQUNxRCxJQUFILENBQVF3QixTQUFSLENBQWtCQyxLQUFsQztBQUNBaUwsSUFBQUEsU0FBUyxDQUFDQyxRQUFWLEdBQXFCLE9BQXJCO0FBQ0FELElBQUFBLFNBQVMsQ0FBQ2pFLElBQVYsR0FBaUJpRSxTQUFTLENBQUNoRSxHQUFWLEdBQWdCLEtBQWpDLENBWHVCLENBWXZCOztBQUNBM00sSUFBQUEsUUFBUSxDQUFDeU0sSUFBVCxDQUFjb0UsU0FBZCxHQUEwQixDQUExQjtBQUNIO0FBOUUyQixDQUFULENBQXZCO0FBaUZBOzs7Ozs7O0FBTUFqUSxFQUFFLENBQUNlLGVBQUgsR0FBcUJmLEVBQUUsQ0FBQ2lQLEtBQUgsQ0FBUztBQUMxQjVILEVBQUFBLElBQUksRUFBRSxpQkFEb0I7QUFHMUI2SSxFQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZCxTQUFLQyxPQUFMLEdBQWU7QUFDWG5GLE1BQUFBLEtBQUssRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKLENBREk7QUFFWEUsTUFBQUEsUUFBUSxFQUFFO0FBRkMsS0FBZjtBQUlILEdBUnlCO0FBVTFCa0YsRUFBQUEsWUFBWSxFQUFFLHNCQUFVQyxVQUFWLEVBQXNCQyxVQUF0QixFQUFrQ0MsUUFBbEMsRUFBNENDLFFBQTVDLEVBQXNEbkUsTUFBdEQsRUFBOERDLE1BQTlELEVBQXNFO0FBQ2hGO0FBQ0FFLElBQUFBLElBQUksQ0FBQ2lFLEdBQUwsQ0FBU0osVUFBVSxHQUFHRSxRQUF0QixJQUFrQyxDQUFsQyxLQUF3Q0EsUUFBUSxHQUFHRixVQUFuRDtBQUNBN0QsSUFBQUEsSUFBSSxDQUFDaUUsR0FBTCxDQUFTSCxVQUFVLEdBQUdFLFFBQXRCLElBQWtDLENBQWxDLEtBQXdDQSxRQUFRLEdBQUdGLFVBQW5EO0FBRUEsUUFBSXBGLFFBQVEsR0FBR2xMLEVBQUUsQ0FBQ3VCLElBQUgsQ0FBUSxDQUFDOE8sVUFBVSxHQUFHRSxRQUFkLElBQTBCLENBQWxDLEVBQXFDLENBQUNELFVBQVUsR0FBR0UsUUFBZCxJQUEwQixDQUEvRCxFQUFrRUQsUUFBbEUsRUFBNEVDLFFBQTVFLENBQWYsQ0FMZ0YsQ0FPaEY7O0FBQ0EsUUFBSXhRLEVBQUUsQ0FBQ3FELElBQUgsQ0FBUStFLFVBQVIsS0FBdUJwSSxFQUFFLENBQUNxRCxJQUFILENBQVEyRixrQkFBbkMsRUFBc0QsQ0FDbEQ7QUFDQTtBQUNIOztBQUVELFNBQUttSCxPQUFMLENBQWFuRixLQUFiLEdBQXFCLENBQUNxQixNQUFELEVBQVNDLE1BQVQsQ0FBckI7QUFDQSxTQUFLNkQsT0FBTCxDQUFhakYsUUFBYixHQUF3QkEsUUFBeEI7QUFDQSxXQUFPLEtBQUtpRixPQUFaO0FBQ0gsR0ExQnlCOztBQTRCMUI7Ozs7Ozs7QUFPQXZGLEVBQUFBLFFBQVEsRUFBRSxrQkFBVXZHLElBQVYsRUFBZ0IsQ0FDekIsQ0FwQ3lCOztBQXNDMUI7Ozs7Ozs7Ozs7QUFVQTBHLEVBQUFBLEtBQUssRUFBRSxlQUFVMUcsSUFBVixFQUFnQjZLLGtCQUFoQixFQUFvQztBQUN2QyxXQUFPO0FBQUMsZUFBUyxDQUFDLENBQUQsRUFBSSxDQUFKO0FBQVYsS0FBUDtBQUNILEdBbER5Qjs7QUFvRDFCOzs7Ozs7O0FBT0E3RCxFQUFBQSxTQUFTLEVBQUUsbUJBQVVoSCxJQUFWLEVBQWdCLENBQzFCO0FBNUR5QixDQUFULENBQXJCOztBQStEQSxDQUFDLFlBQVk7QUFFYjs7QUFDSTs7OztBQUlBLE1BQUlxTSxZQUFZLEdBQUcxUSxFQUFFLENBQUNpUCxLQUFILENBQVM7QUFDeEI1SCxJQUFBQSxJQUFJLEVBQUUsY0FEa0I7QUFFeEIsZUFBU3JILEVBQUUsQ0FBQ2EsaUJBRlk7QUFHeEJrSyxJQUFBQSxLQUFLLEVBQUUsZUFBVTFHLElBQVYsRUFBZ0I7QUFDbkIsVUFBSXNNLE1BQU0sR0FBR3RNLElBQUksQ0FBQ3JELFVBQUwsQ0FBZ0JnRCxNQUE3QjtBQUFBLFVBQXFDWSxjQUFjLEdBQUc1RSxFQUFFLENBQUNxRCxJQUFILENBQVF3QixTQUFSLENBQWtCQyxLQUF4RTs7QUFDQSxXQUFLcUssZUFBTCxDQUFxQjlLLElBQXJCLEVBQTJCQSxJQUFJLENBQUNyRCxVQUFMLENBQWdCOEMsS0FBM0MsRUFBa0RPLElBQUksQ0FBQ3JELFVBQUwsQ0FBZ0JnRCxNQUFsRSxFQUZtQixDQUduQjs7O0FBQ0EsVUFBSUssSUFBSSxDQUFDbkMsVUFBVCxFQUFxQjtBQUNqQjBDLFFBQUFBLGNBQWMsQ0FBQ0csTUFBZixHQUF3QixXQUFXNEwsTUFBWCxHQUFvQixJQUE1QztBQUNILE9BRkQsTUFHSztBQUNEL0wsUUFBQUEsY0FBYyxDQUFDRyxNQUFmLEdBQXdCLEtBQXhCO0FBQ0g7O0FBQ0RILE1BQUFBLGNBQWMsQ0FBQ2dNLE9BQWYsR0FBeUIsS0FBekI7QUFDSDtBQWR1QixHQUFULENBQW5CO0FBaUJBOzs7OztBQUlBLE1BQUlDLG1CQUFtQixHQUFHN1EsRUFBRSxDQUFDaVAsS0FBSCxDQUFTO0FBQy9CNUgsSUFBQUEsSUFBSSxFQUFFLHFCQUR5QjtBQUUvQixlQUFTckgsRUFBRSxDQUFDYSxpQkFGbUI7QUFHL0JrSyxJQUFBQSxLQUFLLEVBQUUsZUFBVTFHLElBQVYsRUFBZ0I2SyxrQkFBaEIsRUFBb0M7QUFDdkMsVUFBSTRCLE1BQU0sR0FBR3pNLElBQUksQ0FBQ3JELFVBQUwsQ0FBZ0I4QyxLQUE3QjtBQUFBLFVBQW9DNk0sTUFBTSxHQUFHdE0sSUFBSSxDQUFDckQsVUFBTCxDQUFnQmdELE1BQTdEO0FBQUEsVUFBcUVZLGNBQWMsR0FBRzVFLEVBQUUsQ0FBQ3FELElBQUgsQ0FBUXdCLFNBQVIsQ0FBa0JDLEtBQXhHO0FBQUEsVUFDSWlNLE9BQU8sR0FBRzdCLGtCQUFrQixDQUFDcEwsS0FEakM7QUFBQSxVQUN3Q2tOLE9BQU8sR0FBRzlCLGtCQUFrQixDQUFDbEwsTUFEckU7QUFBQSxVQUVJcUksTUFBTSxHQUFHeUUsTUFBTSxHQUFHQyxPQUZ0QjtBQUFBLFVBRStCekUsTUFBTSxHQUFHcUUsTUFBTSxHQUFHSyxPQUZqRDtBQUFBLFVBR0lYLFVBSEo7QUFBQSxVQUdnQkMsVUFIaEI7QUFLQWpFLE1BQUFBLE1BQU0sR0FBR0MsTUFBVCxJQUFtQitELFVBQVUsR0FBR1MsTUFBYixFQUFxQlIsVUFBVSxHQUFHVSxPQUFPLEdBQUczRSxNQUEvRCxLQUEwRWdFLFVBQVUsR0FBR1UsT0FBTyxHQUFHekUsTUFBdkIsRUFBK0JnRSxVQUFVLEdBQUdLLE1BQXRILEVBTnVDLENBUXZDOztBQUNBLFVBQUlNLElBQUksR0FBR3pFLElBQUksQ0FBQzBFLEtBQUwsQ0FBVyxDQUFDSixNQUFNLEdBQUdULFVBQVYsSUFBd0IsQ0FBbkMsQ0FBWDtBQUNBLFVBQUljLElBQUksR0FBRzNFLElBQUksQ0FBQzBFLEtBQUwsQ0FBVyxDQUFDUCxNQUFNLEdBQUdMLFVBQVYsSUFBd0IsQ0FBbkMsQ0FBWDtBQUNBRCxNQUFBQSxVQUFVLEdBQUdTLE1BQU0sR0FBRyxJQUFJRyxJQUExQjtBQUNBWCxNQUFBQSxVQUFVLEdBQUdLLE1BQU0sR0FBRyxJQUFJUSxJQUExQjs7QUFFQSxXQUFLaEMsZUFBTCxDQUFxQjlLLElBQXJCLEVBQTJCZ00sVUFBM0IsRUFBdUNDLFVBQXZDOztBQUNBLFVBQUksQ0FBQzNLLFNBQUwsRUFBZ0I7QUFDWjtBQUNBLFlBQUl0QixJQUFJLENBQUNuQyxVQUFULEVBQXFCO0FBQ2pCMEMsVUFBQUEsY0FBYyxDQUFDRyxNQUFmLEdBQXdCLFdBQVc0TCxNQUFYLEdBQW9CLElBQTVDO0FBQ0gsU0FGRCxNQUdLO0FBQ0QvTCxVQUFBQSxjQUFjLENBQUNHLE1BQWYsR0FBd0IsS0FBeEI7QUFDSDs7QUFDREgsUUFBQUEsY0FBYyxDQUFDd00sV0FBZixHQUE2QkgsSUFBSSxHQUFHLElBQXBDO0FBQ0FyTSxRQUFBQSxjQUFjLENBQUN5TSxZQUFmLEdBQThCSixJQUFJLEdBQUcsSUFBckM7QUFDQXJNLFFBQUFBLGNBQWMsQ0FBQzBNLFVBQWYsR0FBNEJILElBQUksR0FBRyxJQUFuQztBQUNBdk0sUUFBQUEsY0FBYyxDQUFDMk0sYUFBZixHQUErQkosSUFBSSxHQUFHLElBQXRDO0FBQ0g7QUFDSjtBQS9COEIsR0FBVCxDQUExQjtBQWtDQTs7Ozs7QUFJQSxNQUFJSyxhQUFhLEdBQUd4UixFQUFFLENBQUNpUCxLQUFILENBQVM7QUFDekI1SCxJQUFBQSxJQUFJLEVBQUUsZUFEbUI7QUFFekIsZUFBU3FKLFlBRmdCO0FBR3pCOUYsSUFBQUEsUUFBUSxFQUFFLGtCQUFVdkcsSUFBVixFQUFnQjtBQUN0QixXQUFLb04sTUFBTCxDQUFZcE4sSUFBWjs7QUFDQXJFLE1BQUFBLEVBQUUsQ0FBQ3FELElBQUgsQ0FBUTlELEtBQVIsR0FBZ0JILFFBQVEsQ0FBQ3dNLGVBQXpCO0FBQ0gsS0FOd0I7QUFRekJiLElBQUFBLEtBQUssRUFBRSxlQUFVMUcsSUFBVixFQUFnQjtBQUNuQixXQUFLb04sTUFBTCxDQUFZcE4sSUFBWjs7QUFDQSxXQUFLcUwsYUFBTDtBQUNIO0FBWHdCLEdBQVQsQ0FBcEI7QUFjQTs7Ozs7QUFJQSxNQUFJZ0Msb0JBQW9CLEdBQUcxUixFQUFFLENBQUNpUCxLQUFILENBQVM7QUFDaEM1SCxJQUFBQSxJQUFJLEVBQUUsc0JBRDBCO0FBRWhDLGVBQVN3SixtQkFGdUI7QUFHaENqRyxJQUFBQSxRQUFRLEVBQUUsa0JBQVV2RyxJQUFWLEVBQWdCO0FBQ3RCLFdBQUtvTixNQUFMLENBQVlwTixJQUFaOztBQUNBckUsTUFBQUEsRUFBRSxDQUFDcUQsSUFBSCxDQUFROUQsS0FBUixHQUFnQkgsUUFBUSxDQUFDd00sZUFBekI7QUFDSCxLQU4rQjtBQVFoQ2IsSUFBQUEsS0FBSyxFQUFFLGVBQVUxRyxJQUFWLEVBQWdCNkssa0JBQWhCLEVBQW9DO0FBQ3ZDLFdBQUt1QyxNQUFMLENBQVlwTixJQUFaLEVBQWtCNkssa0JBQWxCOztBQUNBLFdBQUtRLGFBQUw7QUFDSDtBQVgrQixHQUFULENBQTNCO0FBY0E7Ozs7O0FBSUEsTUFBSWlDLGlCQUFpQixHQUFHM1IsRUFBRSxDQUFDaVAsS0FBSCxDQUFTO0FBQzdCNUgsSUFBQUEsSUFBSSxFQUFFLG1CQUR1QjtBQUU3QixlQUFTckgsRUFBRSxDQUFDYSxpQkFGaUI7QUFHN0JrSyxJQUFBQSxLQUFLLEVBQUUsZUFBVTFHLElBQVYsRUFBZ0I7QUFDbkIsV0FBSzhLLGVBQUwsQ0FBcUI5SyxJQUFyQixFQUEyQnJFLEVBQUUsQ0FBQ3FELElBQUgsQ0FBUVEsTUFBUixDQUFlQyxLQUExQyxFQUFpRDlELEVBQUUsQ0FBQ3FELElBQUgsQ0FBUVEsTUFBUixDQUFlRyxNQUFoRTtBQUNIO0FBTDRCLEdBQVQsQ0FBeEIsQ0F0R1MsQ0E4R1Q7O0FBQ0EsTUFBSTROLE9BQU8sR0FBRyxPQUFPcFMsTUFBUCxLQUFrQixXQUFsQixHQUFnQ3FTLE1BQWhDLEdBQXlDclMsTUFBdkQ7O0FBQ0EsTUFBSXNTLGFBQWEsR0FBR0YsT0FBTyxDQUFDRyxlQUE1Qjs7QUFDQSxNQUFJRCxhQUFKLEVBQW1CO0FBQ2YsUUFBSUEsYUFBYSxDQUFDRSxzQkFBbEIsRUFBMEM7QUFDdENGLE1BQUFBLGFBQWEsQ0FBQ0Usc0JBQWQsQ0FBcUNoUyxFQUFFLENBQUNhLGlCQUFILENBQXFCNkMsU0FBMUQ7QUFDSDs7QUFDRCxRQUFJb08sYUFBYSxDQUFDRyxTQUFsQixFQUE2QjtBQUN6QkgsTUFBQUEsYUFBYSxDQUFDRyxTQUFkLENBQXdCeFIsSUFBSSxDQUFDaUQsU0FBN0I7QUFDSDtBQUNKLEdBeEhRLENBMEhiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNJMUQsRUFBQUEsRUFBRSxDQUFDYSxpQkFBSCxDQUFxQjhCLGNBQXJCLEdBQXNDLElBQUkrTixZQUFKLEVBQXRDLENBL0hTLENBZ0liOztBQUNJMVEsRUFBQUEsRUFBRSxDQUFDYSxpQkFBSCxDQUFxQnFSLG1CQUFyQixHQUEyQyxJQUFJckIsbUJBQUosRUFBM0MsQ0FqSVMsQ0FrSWI7O0FBQ0k3USxFQUFBQSxFQUFFLENBQUNhLGlCQUFILENBQXFCc1Isa0JBQXJCLEdBQTBDLElBQUlSLGlCQUFKLEVBQTFDLENBbklTLENBcUliOztBQUNJLE1BQUlTLFFBQVEsR0FBR3BTLEVBQUUsQ0FBQ2lQLEtBQUgsQ0FBUztBQUNwQjVILElBQUFBLElBQUksRUFBRSxVQURjO0FBRXBCLGVBQVNySCxFQUFFLENBQUNlLGVBRlE7QUFHcEJnSyxJQUFBQSxLQUFLLEVBQUUsZUFBVTFHLElBQVYsRUFBZ0I2SyxrQkFBaEIsRUFBb0M7QUFDdkMsVUFBSW1CLFVBQVUsR0FBR3JRLEVBQUUsQ0FBQ3FELElBQUgsQ0FBUVEsTUFBUixDQUFlQyxLQUFoQztBQUFBLFVBQXVDd00sVUFBVSxHQUFHdFEsRUFBRSxDQUFDcUQsSUFBSCxDQUFRUSxNQUFSLENBQWVHLE1BQW5FO0FBQUEsVUFDSXFJLE1BQU0sR0FBR2dFLFVBQVUsR0FBR25CLGtCQUFrQixDQUFDcEwsS0FEN0M7QUFBQSxVQUNvRHdJLE1BQU0sR0FBR2dFLFVBQVUsR0FBR3BCLGtCQUFrQixDQUFDbEwsTUFEN0Y7QUFHQSxhQUFPLEtBQUtvTSxZQUFMLENBQWtCQyxVQUFsQixFQUE4QkMsVUFBOUIsRUFBMENELFVBQTFDLEVBQXNEQyxVQUF0RCxFQUFrRWpFLE1BQWxFLEVBQTBFQyxNQUExRSxDQUFQO0FBQ0g7QUFSbUIsR0FBVCxDQUFmO0FBV0EsTUFBSStGLE9BQU8sR0FBR3JTLEVBQUUsQ0FBQ2lQLEtBQUgsQ0FBUztBQUNuQjVILElBQUFBLElBQUksRUFBRSxTQURhO0FBRW5CLGVBQVNySCxFQUFFLENBQUNlLGVBRk87QUFHbkJnSyxJQUFBQSxLQUFLLEVBQUUsZUFBVTFHLElBQVYsRUFBZ0I2SyxrQkFBaEIsRUFBb0M7QUFDdkMsVUFBSW1CLFVBQVUsR0FBR3JRLEVBQUUsQ0FBQ3FELElBQUgsQ0FBUVEsTUFBUixDQUFlQyxLQUFoQztBQUFBLFVBQXVDd00sVUFBVSxHQUFHdFEsRUFBRSxDQUFDcUQsSUFBSCxDQUFRUSxNQUFSLENBQWVHLE1BQW5FO0FBQUEsVUFDSStNLE9BQU8sR0FBRzdCLGtCQUFrQixDQUFDcEwsS0FEakM7QUFBQSxVQUN3Q2tOLE9BQU8sR0FBRzlCLGtCQUFrQixDQUFDbEwsTUFEckU7QUFBQSxVQUVJcUksTUFBTSxHQUFHZ0UsVUFBVSxHQUFHVSxPQUYxQjtBQUFBLFVBRW1DekUsTUFBTSxHQUFHZ0UsVUFBVSxHQUFHVSxPQUZ6RDtBQUFBLFVBRWtFaEcsS0FBSyxHQUFHLENBRjFFO0FBQUEsVUFHSXVGLFFBSEo7QUFBQSxVQUdjQyxRQUhkO0FBS0FuRSxNQUFBQSxNQUFNLEdBQUdDLE1BQVQsSUFBbUJ0QixLQUFLLEdBQUdxQixNQUFSLEVBQWdCa0UsUUFBUSxHQUFHRixVQUEzQixFQUF1Q0csUUFBUSxHQUFHUSxPQUFPLEdBQUdoRyxLQUEvRSxLQUNPQSxLQUFLLEdBQUdzQixNQUFSLEVBQWdCaUUsUUFBUSxHQUFHUSxPQUFPLEdBQUcvRixLQUFyQyxFQUE0Q3dGLFFBQVEsR0FBR0YsVUFEOUQ7QUFHQSxhQUFPLEtBQUtGLFlBQUwsQ0FBa0JDLFVBQWxCLEVBQThCQyxVQUE5QixFQUEwQ0MsUUFBMUMsRUFBb0RDLFFBQXBELEVBQThEeEYsS0FBOUQsRUFBcUVBLEtBQXJFLENBQVA7QUFDSDtBQWJrQixHQUFULENBQWQ7QUFnQkEsTUFBSXNILFFBQVEsR0FBR3RTLEVBQUUsQ0FBQ2lQLEtBQUgsQ0FBUztBQUNwQjVILElBQUFBLElBQUksRUFBRSxVQURjO0FBRXBCLGVBQVNySCxFQUFFLENBQUNlLGVBRlE7QUFHcEJnSyxJQUFBQSxLQUFLLEVBQUUsZUFBVTFHLElBQVYsRUFBZ0I2SyxrQkFBaEIsRUFBb0M7QUFDdkMsVUFBSW1CLFVBQVUsR0FBR3JRLEVBQUUsQ0FBQ3FELElBQUgsQ0FBUVEsTUFBUixDQUFlQyxLQUFoQztBQUFBLFVBQXVDd00sVUFBVSxHQUFHdFEsRUFBRSxDQUFDcUQsSUFBSCxDQUFRUSxNQUFSLENBQWVHLE1BQW5FO0FBQUEsVUFDSStNLE9BQU8sR0FBRzdCLGtCQUFrQixDQUFDcEwsS0FEakM7QUFBQSxVQUN3Q2tOLE9BQU8sR0FBRzlCLGtCQUFrQixDQUFDbEwsTUFEckU7QUFBQSxVQUVJcUksTUFBTSxHQUFHZ0UsVUFBVSxHQUFHVSxPQUYxQjtBQUFBLFVBRW1DekUsTUFBTSxHQUFHZ0UsVUFBVSxHQUFHVSxPQUZ6RDtBQUFBLFVBRWtFaEcsS0FGbEU7QUFBQSxVQUdJdUYsUUFISjtBQUFBLFVBR2NDLFFBSGQ7QUFLQW5FLE1BQUFBLE1BQU0sR0FBR0MsTUFBVCxJQUFtQnRCLEtBQUssR0FBR3NCLE1BQVIsRUFBZ0JpRSxRQUFRLEdBQUdRLE9BQU8sR0FBRy9GLEtBQXJDLEVBQTRDd0YsUUFBUSxHQUFHRixVQUExRSxLQUNPdEYsS0FBSyxHQUFHcUIsTUFBUixFQUFnQmtFLFFBQVEsR0FBR0YsVUFBM0IsRUFBdUNHLFFBQVEsR0FBR1EsT0FBTyxHQUFHaEcsS0FEbkU7QUFHQSxhQUFPLEtBQUtvRixZQUFMLENBQWtCQyxVQUFsQixFQUE4QkMsVUFBOUIsRUFBMENDLFFBQTFDLEVBQW9EQyxRQUFwRCxFQUE4RHhGLEtBQTlELEVBQXFFQSxLQUFyRSxDQUFQO0FBQ0g7QUFibUIsR0FBVCxDQUFmO0FBZ0JBLE1BQUl1SCxXQUFXLEdBQUd2UyxFQUFFLENBQUNpUCxLQUFILENBQVM7QUFDdkI1SCxJQUFBQSxJQUFJLEVBQUUsYUFEaUI7QUFFdkIsZUFBU3JILEVBQUUsQ0FBQ2UsZUFGVztBQUd2QmdLLElBQUFBLEtBQUssRUFBRSxlQUFVMUcsSUFBVixFQUFnQjZLLGtCQUFoQixFQUFvQztBQUN2QyxVQUFJbUIsVUFBVSxHQUFHclEsRUFBRSxDQUFDcUQsSUFBSCxDQUFRUSxNQUFSLENBQWVDLEtBQWhDO0FBQUEsVUFBdUN3TSxVQUFVLEdBQUd0USxFQUFFLENBQUNxRCxJQUFILENBQVFRLE1BQVIsQ0FBZUcsTUFBbkU7QUFBQSxVQUNJZ04sT0FBTyxHQUFHOUIsa0JBQWtCLENBQUNsTCxNQURqQztBQUFBLFVBQ3lDZ0gsS0FBSyxHQUFHc0YsVUFBVSxHQUFHVSxPQUQ5RDtBQUFBLFVBRUlULFFBQVEsR0FBR0YsVUFGZjtBQUFBLFVBRTJCRyxRQUFRLEdBQUdGLFVBRnRDO0FBSUEsYUFBTyxLQUFLRixZQUFMLENBQWtCQyxVQUFsQixFQUE4QkMsVUFBOUIsRUFBMENDLFFBQTFDLEVBQW9EQyxRQUFwRCxFQUE4RHhGLEtBQTlELEVBQXFFQSxLQUFyRSxDQUFQO0FBQ0g7QUFUc0IsR0FBVCxDQUFsQjtBQVlBLE1BQUl3SCxVQUFVLEdBQUd4UyxFQUFFLENBQUNpUCxLQUFILENBQVM7QUFDdEI1SCxJQUFBQSxJQUFJLEVBQUUsWUFEZ0I7QUFFdEIsZUFBU3JILEVBQUUsQ0FBQ2UsZUFGVTtBQUd0QmdLLElBQUFBLEtBQUssRUFBRSxlQUFVMUcsSUFBVixFQUFnQjZLLGtCQUFoQixFQUFvQztBQUN2QyxVQUFJbUIsVUFBVSxHQUFHclEsRUFBRSxDQUFDcUQsSUFBSCxDQUFRUSxNQUFSLENBQWVDLEtBQWhDO0FBQUEsVUFBdUN3TSxVQUFVLEdBQUd0USxFQUFFLENBQUNxRCxJQUFILENBQVFRLE1BQVIsQ0FBZUcsTUFBbkU7QUFBQSxVQUNJK00sT0FBTyxHQUFHN0Isa0JBQWtCLENBQUNwTCxLQURqQztBQUFBLFVBQ3dDa0gsS0FBSyxHQUFHcUYsVUFBVSxHQUFHVSxPQUQ3RDtBQUFBLFVBRUlSLFFBQVEsR0FBR0YsVUFGZjtBQUFBLFVBRTJCRyxRQUFRLEdBQUdGLFVBRnRDO0FBSUEsYUFBTyxLQUFLRixZQUFMLENBQWtCQyxVQUFsQixFQUE4QkMsVUFBOUIsRUFBMENDLFFBQTFDLEVBQW9EQyxRQUFwRCxFQUE4RHhGLEtBQTlELEVBQXFFQSxLQUFyRSxDQUFQO0FBQ0g7QUFUcUIsR0FBVCxDQUFqQixDQTdMUyxDQXlNYjs7QUFDSWhMLEVBQUFBLEVBQUUsQ0FBQ2UsZUFBSCxDQUFtQjZCLFNBQW5CLEdBQStCLElBQUl3UCxRQUFKLEVBQS9CLENBMU1TLENBMk1iOztBQUNJcFMsRUFBQUEsRUFBRSxDQUFDZSxlQUFILENBQW1CK0IsUUFBbkIsR0FBOEIsSUFBSXVQLE9BQUosRUFBOUIsQ0E1TVMsQ0E2TWI7O0FBQ0lyUyxFQUFBQSxFQUFFLENBQUNlLGVBQUgsQ0FBbUJpQyxTQUFuQixHQUErQixJQUFJc1AsUUFBSixFQUEvQixDQTlNUyxDQStNYjs7QUFDSXRTLEVBQUFBLEVBQUUsQ0FBQ2UsZUFBSCxDQUFtQm1DLFlBQW5CLEdBQWtDLElBQUlxUCxXQUFKLEVBQWxDLENBaE5TLENBaU5iOztBQUNJdlMsRUFBQUEsRUFBRSxDQUFDZSxlQUFILENBQW1CcUMsV0FBbkIsR0FBaUMsSUFBSW9QLFVBQUosRUFBakM7QUFFSCxDQXBORDtBQXNOQTs7Ozs7OztBQU1BOzs7Ozs7O0FBS0F4UyxFQUFFLENBQUMwQyxnQkFBSCxHQUFzQjFDLEVBQUUsQ0FBQ2lQLEtBQUgsQ0FBUztBQUMzQjVILEVBQUFBLElBQUksRUFBRSxxQkFEcUI7O0FBRTNCOzs7OztBQUtBNkksRUFBQUEsSUFBSSxFQUFFLGNBQVV1QyxZQUFWLEVBQXdCQyxVQUF4QixFQUFvQztBQUN0QyxTQUFLQyxrQkFBTCxHQUEwQixJQUExQjtBQUNBLFNBQUtDLGdCQUFMLEdBQXdCLElBQXhCO0FBQ0EsU0FBS0Msb0JBQUwsQ0FBMEJKLFlBQTFCO0FBQ0EsU0FBS0ssa0JBQUwsQ0FBd0JKLFVBQXhCO0FBQ0gsR0FaMEI7O0FBYzNCOzs7Ozs7QUFNQTlILEVBQUFBLFFBQVEsRUFBRSxrQkFBVXZHLElBQVYsRUFBZ0I7QUFDdEIsU0FBS3NPLGtCQUFMLENBQXdCL0gsUUFBeEIsQ0FBaUN2RyxJQUFqQzs7QUFDQSxTQUFLdU8sZ0JBQUwsQ0FBc0JoSSxRQUF0QixDQUErQnZHLElBQS9CO0FBQ0gsR0F2QjBCOztBQXlCM0I7Ozs7Ozs7Ozs7QUFVQTBHLEVBQUFBLEtBQUssRUFBRSxlQUFVMUcsSUFBVixFQUFnQjZLLGtCQUFoQixFQUFvQztBQUN2QyxTQUFLeUQsa0JBQUwsQ0FBd0I1SCxLQUF4QixDQUE4QjFHLElBQTlCLEVBQW9DNkssa0JBQXBDOztBQUNBLFdBQU8sS0FBSzBELGdCQUFMLENBQXNCN0gsS0FBdEIsQ0FBNEIxRyxJQUE1QixFQUFrQzZLLGtCQUFsQyxDQUFQO0FBQ0gsR0F0QzBCOztBQXdDM0I7Ozs7OztBQU1BN0QsRUFBQUEsU0FBUyxFQUFFLG1CQUFVaEgsSUFBVixFQUFnQjtBQUN2QixTQUFLc08sa0JBQUwsQ0FBd0J0SCxTQUF4QixDQUFrQ2hILElBQWxDOztBQUNBLFNBQUt1TyxnQkFBTCxDQUFzQnZILFNBQXRCLENBQWdDaEgsSUFBaEM7QUFDSCxHQWpEMEI7O0FBbUQzQjs7Ozs7OztBQU9Bd08sRUFBQUEsb0JBQW9CLEVBQUUsOEJBQVVKLFlBQVYsRUFBd0I7QUFDMUMsUUFBSUEsWUFBWSxZQUFZelMsRUFBRSxDQUFDYSxpQkFBL0IsRUFDSSxLQUFLOFIsa0JBQUwsR0FBMEJGLFlBQTFCO0FBQ1AsR0E3RDBCOztBQStEM0I7Ozs7Ozs7QUFPQUssRUFBQUEsa0JBQWtCLEVBQUUsNEJBQVVKLFVBQVYsRUFBc0I7QUFDdEMsUUFBSUEsVUFBVSxZQUFZMVMsRUFBRSxDQUFDZSxlQUE3QixFQUNJLEtBQUs2UixnQkFBTCxHQUF3QkYsVUFBeEI7QUFDUDtBQXpFMEIsQ0FBVCxDQUF0QjtBQTRFQTNULEVBQUUsQ0FBQ2dVLEdBQUgsQ0FBTy9TLEVBQUUsQ0FBQzBDLGdCQUFILENBQW9CZ0IsU0FBM0IsRUFBc0MsWUFBdEMsRUFBb0QsWUFBWTtBQUM1RCxTQUFPMUQsRUFBRSxDQUFDa0ssRUFBSCxDQUFNbEssRUFBRSxDQUFDcUQsSUFBSCxDQUFRUSxNQUFSLENBQWVDLEtBQXJCLEVBQTRCOUQsRUFBRSxDQUFDcUQsSUFBSCxDQUFRUSxNQUFSLENBQWVHLE1BQTNDLENBQVA7QUFDSCxDQUZEO0FBSUE7Ozs7Ozs7O0FBT0FoRSxFQUFFLENBQUMwQyxnQkFBSCxDQUFvQkUsU0FBcEIsR0FBZ0MsQ0FBaEM7QUFFQTs7Ozs7Ozs7QUFPQTVDLEVBQUUsQ0FBQzBDLGdCQUFILENBQW9CTSxTQUFwQixHQUFnQyxDQUFoQztBQUVBOzs7Ozs7OztBQU9BaEQsRUFBRSxDQUFDMEMsZ0JBQUgsQ0FBb0JJLFFBQXBCLEdBQStCLENBQS9CO0FBRUE7Ozs7Ozs7Ozs7QUFTQTlDLEVBQUUsQ0FBQzBDLGdCQUFILENBQW9CUSxZQUFwQixHQUFtQyxDQUFuQztBQUVBOzs7Ozs7Ozs7O0FBU0FsRCxFQUFFLENBQUMwQyxnQkFBSCxDQUFvQlUsV0FBcEIsR0FBa0MsQ0FBbEM7QUFFQTs7Ozs7OztBQU1BcEQsRUFBRSxDQUFDMEMsZ0JBQUgsQ0FBb0JzUSxPQUFwQixHQUE4QixDQUE5QjtBQUVBOzs7O0FBSUE7Ozs7Ozs7O0FBT0FoVCxFQUFFLENBQUNxRSxJQUFILEdBQVUsSUFBSTVELElBQUosRUFBVjtBQUVBOzs7Ozs7O0FBTUFULEVBQUUsQ0FBQ2lFLE9BQUgsR0FBYWpFLEVBQUUsQ0FBQ2lCLElBQUgsRUFBYjtBQUVBZ1MsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbFQsRUFBRSxDQUFDcUUsSUFBcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAwOC0yMDEwIFJpY2FyZG8gUXVlc2FkYVxuIENvcHlyaWdodCAoYykgMjAxMS0yMDEyIGNvY29zMmQteC5vcmdcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IEV2ZW50VGFyZ2V0ID0gcmVxdWlyZSgnLi4vZXZlbnQvZXZlbnQtdGFyZ2V0Jyk7XG5jb25zdCBqcyA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2pzJyk7XG5jb25zdCByZW5kZXJlciA9IHJlcXVpcmUoJy4uL3JlbmRlcmVyJyk7XG5yZXF1aXJlKCcuLi9wbGF0Zm9ybS9DQ0NsYXNzJyk7XG5cbnZhciBfX0Jyb3dzZXJHZXR0ZXIgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5odG1sID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJodG1sXCIpWzBdO1xuICAgIH0sXG4gICAgYXZhaWxXaWR0aDogZnVuY3Rpb24oZnJhbWUpe1xuICAgICAgICBpZiAoIWZyYW1lIHx8IGZyYW1lID09PSB0aGlzLmh0bWwpXG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBmcmFtZS5jbGllbnRXaWR0aDtcbiAgICB9LFxuICAgIGF2YWlsSGVpZ2h0OiBmdW5jdGlvbihmcmFtZSl7XG4gICAgICAgIGlmICghZnJhbWUgfHwgZnJhbWUgPT09IHRoaXMuaHRtbClcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBmcmFtZS5jbGllbnRIZWlnaHQ7XG4gICAgfSxcbiAgICBtZXRhOiB7XG4gICAgICAgIFwid2lkdGhcIjogXCJkZXZpY2Utd2lkdGhcIlxuICAgIH0sXG4gICAgYWRhcHRhdGlvblR5cGU6IGNjLnN5cy5icm93c2VyVHlwZVxufTtcblxuaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0lPUykgLy8gQWxsIGJyb3dzZXJzIGFyZSBXZWJWaWV3XG4gICAgX19Ccm93c2VyR2V0dGVyLmFkYXB0YXRpb25UeXBlID0gY2Muc3lzLkJST1dTRVJfVFlQRV9TQUZBUkk7XG5cbnN3aXRjaCAoX19Ccm93c2VyR2V0dGVyLmFkYXB0YXRpb25UeXBlKSB7XG4gICAgY2FzZSBjYy5zeXMuQlJPV1NFUl9UWVBFX1NBRkFSSTpcbiAgICBjYXNlIGNjLnN5cy5CUk9XU0VSX1RZUEVfU09VR09VOlxuICAgIGNhc2UgY2Muc3lzLkJST1dTRVJfVFlQRV9VQzpcbiAgICAgICAgX19Ccm93c2VyR2V0dGVyLm1ldGFbXCJtaW5pbWFsLXVpXCJdID0gXCJ0cnVlXCI7XG4gICAgICAgIF9fQnJvd3NlckdldHRlci5hdmFpbFdpZHRoID0gZnVuY3Rpb24oZnJhbWUpe1xuICAgICAgICAgICAgcmV0dXJuIGZyYW1lLmNsaWVudFdpZHRoO1xuICAgICAgICB9O1xuICAgICAgICBfX0Jyb3dzZXJHZXR0ZXIuYXZhaWxIZWlnaHQgPSBmdW5jdGlvbihmcmFtZSl7XG4gICAgICAgICAgICByZXR1cm4gZnJhbWUuY2xpZW50SGVpZ2h0O1xuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbn1cblxudmFyIF9zY2lzc29yUmVjdCA9IG51bGw7XG5cbi8qKlxuICogY2MudmlldyBpcyB0aGUgc2luZ2xldG9uIG9iamVjdCB3aGljaCByZXByZXNlbnRzIHRoZSBnYW1lIHdpbmRvdy48YnIvPlxuICogSXQncyBtYWluIHRhc2sgaW5jbHVkZTogPGJyLz5cbiAqICAtIEFwcGx5IHRoZSBkZXNpZ24gcmVzb2x1dGlvbiBwb2xpY3k8YnIvPlxuICogIC0gUHJvdmlkZSBpbnRlcmFjdGlvbiB3aXRoIHRoZSB3aW5kb3csIGxpa2UgcmVzaXplIGV2ZW50IG9uIHdlYiwgcmV0aW5hIGRpc3BsYXkgc3VwcG9ydCwgZXRjLi4uPGJyLz5cbiAqICAtIE1hbmFnZSB0aGUgZ2FtZSB2aWV3IHBvcnQgd2hpY2ggY2FuIGJlIGRpZmZlcmVudCB3aXRoIHRoZSB3aW5kb3c8YnIvPlxuICogIC0gTWFuYWdlIHRoZSBjb250ZW50IHNjYWxlIGFuZCB0cmFuc2xhdGlvbjxici8+XG4gKiA8YnIvPlxuICogU2luY2UgdGhlIGNjLnZpZXcgaXMgYSBzaW5nbGV0b24sIHlvdSBkb24ndCBuZWVkIHRvIGNhbGwgYW55IGNvbnN0cnVjdG9yIG9yIGNyZWF0ZSBmdW5jdGlvbnMsPGJyLz5cbiAqIHRoZSBzdGFuZGFyZCB3YXkgdG8gdXNlIGl0IGlzIGJ5IGNhbGxpbmc6PGJyLz5cbiAqICAtIGNjLnZpZXcubWV0aG9kTmFtZSgpOyA8YnIvPlxuICpcbiAqIEBjbGFzcyBWaWV3XG4gKiBAZXh0ZW5kcyBFdmVudFRhcmdldFxuICovXG52YXIgVmlldyA9IGZ1bmN0aW9uICgpIHtcbiAgICBFdmVudFRhcmdldC5jYWxsKHRoaXMpO1xuXG4gICAgdmFyIF90ID0gdGhpcywgX3N0cmF0ZWd5ZXIgPSBjYy5Db250YWluZXJTdHJhdGVneSwgX3N0cmF0ZWd5ID0gY2MuQ29udGVudFN0cmF0ZWd5O1xuXG4gICAgX19Ccm93c2VyR2V0dGVyLmluaXQodGhpcyk7XG5cbiAgICAvLyBTaXplIG9mIHBhcmVudCBub2RlIHRoYXQgY29udGFpbnMgY2MuZ2FtZS5jb250YWluZXIgYW5kIGNjLmdhbWUuY2FudmFzXG4gICAgX3QuX2ZyYW1lU2l6ZSA9IGNjLnNpemUoMCwgMCk7XG5cbiAgICAvLyByZXNvbHV0aW9uIHNpemUsIGl0IGlzIHRoZSBzaXplIGFwcHJvcHJpYXRlIGZvciB0aGUgYXBwIHJlc291cmNlcy5cbiAgICBfdC5fZGVzaWduUmVzb2x1dGlvblNpemUgPSBjYy5zaXplKDAsIDApO1xuICAgIF90Ll9vcmlnaW5hbERlc2lnblJlc29sdXRpb25TaXplID0gY2Muc2l6ZSgwLCAwKTtcbiAgICBfdC5fc2NhbGVYID0gMTtcbiAgICBfdC5fc2NhbGVZID0gMTtcbiAgICAvLyBWaWV3cG9ydCBpcyB0aGUgY29udGFpbmVyJ3MgcmVjdCByZWxhdGVkIHRvIGNvbnRlbnQncyBjb29yZGluYXRlcyBpbiBwaXhlbFxuICAgIF90Ll92aWV3cG9ydFJlY3QgPSBjYy5yZWN0KDAsIDAsIDAsIDApO1xuICAgIC8vIFRoZSB2aXNpYmxlIHJlY3QgaW4gY29udGVudCdzIGNvb3JkaW5hdGUgaW4gcG9pbnRcbiAgICBfdC5fdmlzaWJsZVJlY3QgPSBjYy5yZWN0KDAsIDAsIDAsIDApO1xuICAgIC8vIEF1dG8gZnVsbCBzY3JlZW4gZGlzYWJsZWQgYnkgZGVmYXVsdFxuICAgIF90Ll9hdXRvRnVsbFNjcmVlbiA9IGZhbHNlO1xuICAgIC8vIFRoZSBkZXZpY2UncyBwaXhlbCByYXRpbyAoZm9yIHJldGluYSBkaXNwbGF5cylcbiAgICBfdC5fZGV2aWNlUGl4ZWxSYXRpbyA9IDE7XG4gICAgaWYoQ0NfSlNCKSB7XG4gICAgICAgIF90Ll9tYXhQaXhlbFJhdGlvID0gNDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBfdC5fbWF4UGl4ZWxSYXRpbyA9IDI7XG4gICAgfVxuICAgIC8vIFJldGluYSBkaXNhYmxlZCBieSBkZWZhdWx0XG4gICAgX3QuX3JldGluYUVuYWJsZWQgPSBmYWxzZTtcbiAgICAvLyBDdXN0b20gY2FsbGJhY2sgZm9yIHJlc2l6ZSBldmVudFxuICAgIF90Ll9yZXNpemVDYWxsYmFjayA9IG51bGw7XG4gICAgX3QuX3Jlc2l6aW5nID0gZmFsc2U7XG4gICAgX3QuX3Jlc2l6ZVdpdGhCcm93c2VyU2l6ZSA9IGZhbHNlO1xuICAgIF90Ll9vcmllbnRhdGlvbkNoYW5naW5nID0gdHJ1ZTtcbiAgICBfdC5faXNSb3RhdGVkID0gZmFsc2U7XG4gICAgX3QuX29yaWVudGF0aW9uID0gY2MubWFjcm8uT1JJRU5UQVRJT05fQVVUTztcbiAgICBfdC5faXNBZGp1c3RWaWV3cG9ydCA9IHRydWU7XG4gICAgX3QuX2FudGlBbGlhc0VuYWJsZWQgPSBmYWxzZTtcblxuICAgIC8vIFNldHVwIHN5c3RlbSBkZWZhdWx0IHJlc29sdXRpb24gcG9saWNpZXNcbiAgICBfdC5fcmVzb2x1dGlvblBvbGljeSA9IG51bGw7XG4gICAgX3QuX3JwRXhhY3RGaXQgPSBuZXcgY2MuUmVzb2x1dGlvblBvbGljeShfc3RyYXRlZ3llci5FUVVBTF9UT19GUkFNRSwgX3N0cmF0ZWd5LkVYQUNUX0ZJVCk7XG4gICAgX3QuX3JwU2hvd0FsbCA9IG5ldyBjYy5SZXNvbHV0aW9uUG9saWN5KF9zdHJhdGVneWVyLkVRVUFMX1RPX0ZSQU1FLCBfc3RyYXRlZ3kuU0hPV19BTEwpO1xuICAgIF90Ll9ycE5vQm9yZGVyID0gbmV3IGNjLlJlc29sdXRpb25Qb2xpY3koX3N0cmF0ZWd5ZXIuRVFVQUxfVE9fRlJBTUUsIF9zdHJhdGVneS5OT19CT1JERVIpO1xuICAgIF90Ll9ycEZpeGVkSGVpZ2h0ID0gbmV3IGNjLlJlc29sdXRpb25Qb2xpY3koX3N0cmF0ZWd5ZXIuRVFVQUxfVE9fRlJBTUUsIF9zdHJhdGVneS5GSVhFRF9IRUlHSFQpO1xuICAgIF90Ll9ycEZpeGVkV2lkdGggPSBuZXcgY2MuUmVzb2x1dGlvblBvbGljeShfc3RyYXRlZ3llci5FUVVBTF9UT19GUkFNRSwgX3N0cmF0ZWd5LkZJWEVEX1dJRFRIKTtcblxuICAgIGNjLmdhbWUub25jZShjYy5nYW1lLkVWRU5UX0VOR0lORV9JTklURUQsIHRoaXMuaW5pdCwgdGhpcyk7XG59O1xuXG5jYy5qcy5leHRlbmQoVmlldywgRXZlbnRUYXJnZXQpO1xuXG5jYy5qcy5taXhpbihWaWV3LnByb3RvdHlwZSwge1xuICAgIGluaXQgKCkge1xuICAgICAgICB0aGlzLl9pbml0RnJhbWVTaXplKCk7XG5cbiAgICAgICAgdmFyIHcgPSBjYy5nYW1lLmNhbnZhcy53aWR0aCwgaCA9IGNjLmdhbWUuY2FudmFzLmhlaWdodDtcbiAgICAgICAgdGhpcy5fZGVzaWduUmVzb2x1dGlvblNpemUud2lkdGggPSB3O1xuICAgICAgICB0aGlzLl9kZXNpZ25SZXNvbHV0aW9uU2l6ZS5oZWlnaHQgPSBoO1xuICAgICAgICB0aGlzLl9vcmlnaW5hbERlc2lnblJlc29sdXRpb25TaXplLndpZHRoID0gdztcbiAgICAgICAgdGhpcy5fb3JpZ2luYWxEZXNpZ25SZXNvbHV0aW9uU2l6ZS5oZWlnaHQgPSBoO1xuICAgICAgICB0aGlzLl92aWV3cG9ydFJlY3Qud2lkdGggPSB3O1xuICAgICAgICB0aGlzLl92aWV3cG9ydFJlY3QuaGVpZ2h0ID0gaDtcbiAgICAgICAgdGhpcy5fdmlzaWJsZVJlY3Qud2lkdGggPSB3O1xuICAgICAgICB0aGlzLl92aXNpYmxlUmVjdC5oZWlnaHQgPSBoO1xuXG4gICAgICAgIGNjLndpblNpemUud2lkdGggPSB0aGlzLl92aXNpYmxlUmVjdC53aWR0aDtcbiAgICAgICAgY2Mud2luU2l6ZS5oZWlnaHQgPSB0aGlzLl92aXNpYmxlUmVjdC5oZWlnaHQ7XG4gICAgICAgIGNjLnZpc2libGVSZWN0ICYmIGNjLnZpc2libGVSZWN0LmluaXQodGhpcy5fdmlzaWJsZVJlY3QpO1xuICAgIH0sXG5cbiAgICAvLyBSZXNpemUgaGVscGVyIGZ1bmN0aW9uc1xuICAgIF9yZXNpemVFdmVudDogZnVuY3Rpb24gKGZvcmNlT3JFdmVudCkge1xuICAgICAgICB2YXIgdmlldztcbiAgICAgICAgaWYgKHRoaXMuc2V0RGVzaWduUmVzb2x1dGlvblNpemUpIHtcbiAgICAgICAgICAgIHZpZXcgPSB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmlldyA9IGNjLnZpZXc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSEFDSzogc29tZSBicm93c2VycyBjYW4ndCB1cGRhdGUgd2luZG93IHNpemUgaW1tZWRpYXRlbHlcbiAgICAgICAgLy8gbmVlZCB0byBoYW5kbGUgcmVzaXplIGV2ZW50IGNhbGxiYWNrIG9uIHRoZSBuZXh0IHRpY2tcbiAgICAgICAgbGV0IHN5cyA9IGNjLnN5cztcbiAgICAgICAgaWYgKHN5cy5icm93c2VyVHlwZSA9PT0gc3lzLkJST1dTRVJfVFlQRV9VQyAmJiBzeXMub3MgPT09IHN5cy5PU19JT1MpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZpZXcuX3Jlc2l6ZUV2ZW50KGZvcmNlT3JFdmVudCk7XG4gICAgICAgICAgICB9LCAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgZnJhbWUgc2l6ZSBjaGFuZ2VkIG9yIG5vdFxuICAgICAgICB2YXIgcHJldkZyYW1lVyA9IHZpZXcuX2ZyYW1lU2l6ZS53aWR0aCwgcHJldkZyYW1lSCA9IHZpZXcuX2ZyYW1lU2l6ZS5oZWlnaHQsIHByZXZSb3RhdGVkID0gdmlldy5faXNSb3RhdGVkO1xuICAgICAgICBpZiAoY2Muc3lzLmlzTW9iaWxlKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyU3R5bGUgPSBjYy5nYW1lLmNvbnRhaW5lci5zdHlsZSxcbiAgICAgICAgICAgICAgICBtYXJnaW4gPSBjb250YWluZXJTdHlsZS5tYXJnaW47XG4gICAgICAgICAgICBjb250YWluZXJTdHlsZS5tYXJnaW4gPSAnMCc7XG4gICAgICAgICAgICBjb250YWluZXJTdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdmlldy5faW5pdEZyYW1lU2l6ZSgpO1xuICAgICAgICAgICAgY29udGFpbmVyU3R5bGUubWFyZ2luID0gbWFyZ2luO1xuICAgICAgICAgICAgY29udGFpbmVyU3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2aWV3Ll9pbml0RnJhbWVTaXplKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcmNlT3JFdmVudCAhPT0gdHJ1ZSAmJiB2aWV3Ll9pc1JvdGF0ZWQgPT09IHByZXZSb3RhdGVkICYmIHZpZXcuX2ZyYW1lU2l6ZS53aWR0aCA9PT0gcHJldkZyYW1lVyAmJiB2aWV3Ll9mcmFtZVNpemUuaGVpZ2h0ID09PSBwcmV2RnJhbWVIKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIC8vIEZyYW1lIHNpemUgY2hhbmdlZCwgZG8gcmVzaXplIHdvcmtzXG4gICAgICAgIHZhciB3aWR0aCA9IHZpZXcuX29yaWdpbmFsRGVzaWduUmVzb2x1dGlvblNpemUud2lkdGg7XG4gICAgICAgIHZhciBoZWlnaHQgPSB2aWV3Ll9vcmlnaW5hbERlc2lnblJlc29sdXRpb25TaXplLmhlaWdodDtcbiAgICAgICAgdmlldy5fcmVzaXppbmcgPSB0cnVlO1xuICAgICAgICBpZiAod2lkdGggPiAwKVxuICAgICAgICAgICAgdmlldy5zZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSh3aWR0aCwgaGVpZ2h0LCB2aWV3Ll9yZXNvbHV0aW9uUG9saWN5KTtcbiAgICAgICAgdmlldy5fcmVzaXppbmcgPSBmYWxzZTtcblxuICAgICAgICB2aWV3LmVtaXQoJ2NhbnZhcy1yZXNpemUnKTtcbiAgICAgICAgaWYgKHZpZXcuX3Jlc2l6ZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2aWV3Ll9yZXNpemVDYWxsYmFjay5jYWxsKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29yaWVudGF0aW9uQ2hhbmdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLnZpZXcuX29yaWVudGF0aW9uQ2hhbmdpbmcgPSB0cnVlO1xuICAgICAgICBjYy52aWV3Ll9yZXNpemVFdmVudCgpO1xuICAgICAgICAvLyBIQUNLOiBzaG93IG5hdiBiYXIgb24gaU9TIHNhZmFyaVxuICAgICAgICAvLyBzYWZhcmkgd2lsbCBlbnRlciBmdWxsc2NyZWVuIHdoZW4gcm90YXRlIHRvIGxhbmRzY2FwZVxuICAgICAgICAvLyBuZWVkIHRvIGV4aXQgZnVsbHNjcmVlbiB3aGVuIHJvdGF0ZSBiYWNrIHRvIHBvcnRyYWl0LCBzY3JvbGxUbygwLCAxKSB3b3Jrcy5cbiAgICAgICAgaWYgKGNjLnN5cy5icm93c2VyVHlwZSA9PT0gY2Muc3lzLkJST1dTRVJfVFlQRV9TQUZBUkkgJiYgY2Muc3lzLmlzTW9iaWxlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmlubmVySGVpZ2h0ID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3Jlc2l6ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vZm9yY2UgcmVzaXplIHdoZW4gc2l6ZSBpcyBjaGFuZ2VkIGF0IG5hdGl2ZVxuICAgICAgICBjYy52aWV3Ll9yZXNpemVFdmVudChDQ19KU0IpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU2V0cyB2aWV3J3MgdGFyZ2V0LWRlbnNpdHlkcGkgZm9yIGFuZHJvaWQgbW9iaWxlIGJyb3dzZXIuIGl0IGNhbiBiZSBzZXQgdG86ICAgICAgICAgICA8YnIvPlxuICAgICAqICAgMS4gY2MubWFjcm8uREVOU0lUWURQSV9ERVZJQ0UsIHZhbHVlIGlzIFwiZGV2aWNlLWRwaVwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAqICAgMi4gY2MubWFjcm8uREVOU0lUWURQSV9ISUdILCB2YWx1ZSBpcyBcImhpZ2gtZHBpXCIgIChkZWZhdWx0IHZhbHVlKSAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAqICAgMy4gY2MubWFjcm8uREVOU0lUWURQSV9NRURJVU0sIHZhbHVlIGlzIFwibWVkaXVtLWRwaVwiIChicm93c2VyJ3MgZGVmYXVsdCB2YWx1ZSkgICAgICAgICAgICA8YnIvPlxuICAgICAqICAgNC4gY2MubWFjcm8uREVOU0lUWURQSV9MT1csIHZhbHVlIGlzIFwibG93LWRwaVwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAqICAgNS4gQ3VzdG9tIHZhbHVlLCBlLmc6IFwiNDgwXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAqICEjemgg6K6+572u55uu5qCH5YaF5a6555qE5q+P6Iux5a+45YOP57Sg54K55a+G5bqm44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHNldFRhcmdldERlbnNpdHlEUElcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGVuc2l0eURQSVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHRhcmdldC1kZW5zaXR5ZHBpIHZhbHVlIG9mIGNjLnZpZXcuXG4gICAgICogISN6aCDojrflj5bnm67moIflhoXlrrnnmoTmr4/oi7Hlr7jlg4/ntKDngrnlr4bluqbjgIJcbiAgICAgKiBAbWV0aG9kIGdldFRhcmdldERlbnNpdHlEUElcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXRzIHdoZXRoZXIgcmVzaXplIGNhbnZhcyBhdXRvbWF0aWNhbGx5IHdoZW4gYnJvd3NlcidzIHNpemUgY2hhbmdlZC48YnIvPlxuICAgICAqIFVzZWZ1bCBvbmx5IG9uIHdlYi5cbiAgICAgKiAhI3poIOiuvue9ruW9k+WPkeeOsOa1j+iniOWZqOeahOWwuuWvuOaUueWPmOaXtu+8jOaYr+WQpuiHquWKqOiwg+aVtCBjYW52YXMg5bC65a+45aSn5bCP44CCXG4gICAgICog5LuF5ZyoIFdlYiDmqKHlvI/kuIvmnInmlYjjgIJcbiAgICAgKiBAbWV0aG9kIHJlc2l6ZVdpdGhCcm93c2VyU2l6ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZW5hYmxlZCAtIFdoZXRoZXIgZW5hYmxlIGF1dG9tYXRpYyByZXNpemUgd2l0aCBicm93c2VyJ3MgcmVzaXplIGV2ZW50XG4gICAgICovXG4gICAgcmVzaXplV2l0aEJyb3dzZXJTaXplOiBmdW5jdGlvbiAoZW5hYmxlZCkge1xuICAgICAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgICAgICAgLy9lbmFibGVcbiAgICAgICAgICAgIGlmICghdGhpcy5fcmVzaXplV2l0aEJyb3dzZXJTaXplKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzaXplV2l0aEJyb3dzZXJTaXplID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fcmVzaXplKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL2Rpc2FibGVcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZXNpemVXaXRoQnJvd3NlclNpemUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNpemVXaXRoQnJvd3NlclNpemUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fcmVzaXplKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldHMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciBjYy52aWV3J3MgcmVzaXplIGFjdGlvbiw8YnIvPlxuICAgICAqIHRoaXMgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkIGJlZm9yZSBhcHBseWluZyByZXNvbHV0aW9uIHBvbGljeSwgPGJyLz5cbiAgICAgKiBzbyB5b3UgY2FuIGRvIGFueSBhZGRpdGlvbmFsIG1vZGlmaWNhdGlvbnMgd2l0aGluIHRoZSBjYWxsYmFjay48YnIvPlxuICAgICAqIFVzZWZ1bCBvbmx5IG9uIHdlYi5cbiAgICAgKiAhI3poIOiuvue9riBjYy52aWV3IOiwg+aVtOinhueql+WwuuWvuOihjOS4uueahOWbnuiwg+WHveaVsO+8jFxuICAgICAqIOi/meS4quWbnuiwg+WHveaVsOS8muWcqOW6lOeUqOmAgumFjeaooeW8j+S5i+WJjeiiq+iwg+eUqO+8jFxuICAgICAqIOWboOatpOS9oOWPr+S7peWcqOi/meS4quWbnuiwg+WHveaVsOWGhea3u+WKoOS7u+aEj+mZhOWKoOaUueWPmO+8jFxuICAgICAqIOS7heWcqCBXZWIg5bmz5Y+w5LiL5pyJ5pWI44CCXG4gICAgICogQG1ldGhvZCBzZXRSZXNpemVDYWxsYmFja1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258TnVsbH0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKi9cbiAgICBzZXRSZXNpemVDYWxsYmFjazogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHJldHVybjtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyB8fCBjYWxsYmFjayA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNpemVDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXRzIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgZ2FtZSwgaXQgY2FuIGJlIGxhbmRzY2FwZSwgcG9ydHJhaXQgb3IgYXV0by5cbiAgICAgKiBXaGVuIHNldCBpdCB0byBsYW5kc2NhcGUgb3IgcG9ydHJhaXQsIGFuZCBzY3JlZW4gdy9oIHJhdGlvIGRvZXNuJ3QgZml0LCBcbiAgICAgKiBjYy52aWV3IHdpbGwgYXV0b21hdGljYWxseSByb3RhdGUgdGhlIGdhbWUgY2FudmFzIHVzaW5nIENTUy5cbiAgICAgKiBOb3RlIHRoYXQgdGhpcyBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgYW55IGVmZmVjdCBpbiBuYXRpdmUsIFxuICAgICAqIGluIG5hdGl2ZSwgeW91IG5lZWQgdG8gc2V0IHRoZSBhcHBsaWNhdGlvbiBvcmllbnRhdGlvbiBpbiBuYXRpdmUgcHJvamVjdCBzZXR0aW5nc1xuICAgICAqICEjemgg6K6+572u5ri45oiP5bGP5bmV5pyd5ZCR77yM5a6D6IO95aSf5piv5qiq54mI77yM56uW54mI5oiW6Ieq5Yqo44CCXG4gICAgICog5b2T6K6+572u5Li65qiq54mI5oiW56uW54mI77yM5bm25LiU5bGP5bmV55qE5a696auY5q+U5L6L5LiN5Yy56YWN5pe277yMXG4gICAgICogY2MudmlldyDkvJroh6rliqjnlKggQ1NTIOaXi+i9rOa4uOaIj+WcuuaZr+eahCBjYW52YXPvvIxcbiAgICAgKiDov5nkuKrmlrnms5XkuI3kvJrlr7kgbmF0aXZlIOmDqOWIhuS6p+eUn+S7u+S9leW9seWTje+8jOWvueS6jiBuYXRpdmUg6ICM6KiA77yM5L2g6ZyA6KaB5Zyo5bqU55So6K6+572u5Lit55qE6K6+572u5o6S54mI44CCXG4gICAgICogQG1ldGhvZCBzZXRPcmllbnRhdGlvblxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcmllbnRhdGlvbiAtIFBvc3NpYmxlIHZhbHVlczogY2MubWFjcm8uT1JJRU5UQVRJT05fTEFORFNDQVBFIHwgY2MubWFjcm8uT1JJRU5UQVRJT05fUE9SVFJBSVQgfCBjYy5tYWNyby5PUklFTlRBVElPTl9BVVRPXG4gICAgICovXG4gICAgc2V0T3JpZW50YXRpb246IGZ1bmN0aW9uIChvcmllbnRhdGlvbikge1xuICAgICAgICBvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uICYgY2MubWFjcm8uT1JJRU5UQVRJT05fQVVUTztcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uICYmIHRoaXMuX29yaWVudGF0aW9uICE9PSBvcmllbnRhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICAgICAgICAgIHZhciBkZXNpZ25XaWR0aCA9IHRoaXMuX29yaWdpbmFsRGVzaWduUmVzb2x1dGlvblNpemUud2lkdGg7XG4gICAgICAgICAgICB2YXIgZGVzaWduSGVpZ2h0ID0gdGhpcy5fb3JpZ2luYWxEZXNpZ25SZXNvbHV0aW9uU2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnNldERlc2lnblJlc29sdXRpb25TaXplKGRlc2lnbldpZHRoLCBkZXNpZ25IZWlnaHQsIHRoaXMuX3Jlc29sdXRpb25Qb2xpY3kpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9pbml0RnJhbWVTaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsb2NGcmFtZVNpemUgPSB0aGlzLl9mcmFtZVNpemU7XG4gICAgICAgIHZhciB3ID0gX19Ccm93c2VyR2V0dGVyLmF2YWlsV2lkdGgoY2MuZ2FtZS5mcmFtZSk7XG4gICAgICAgIHZhciBoID0gX19Ccm93c2VyR2V0dGVyLmF2YWlsSGVpZ2h0KGNjLmdhbWUuZnJhbWUpO1xuICAgICAgICB2YXIgaXNMYW5kc2NhcGUgPSB3ID49IGg7XG5cbiAgICAgICAgaWYgKENDX0VESVRPUiB8fCAhY2Muc3lzLmlzTW9iaWxlIHx8XG4gICAgICAgICAgICAoaXNMYW5kc2NhcGUgJiYgdGhpcy5fb3JpZW50YXRpb24gJiBjYy5tYWNyby5PUklFTlRBVElPTl9MQU5EU0NBUEUpIHx8IFxuICAgICAgICAgICAgKCFpc0xhbmRzY2FwZSAmJiB0aGlzLl9vcmllbnRhdGlvbiAmIGNjLm1hY3JvLk9SSUVOVEFUSU9OX1BPUlRSQUlUKSkge1xuICAgICAgICAgICAgbG9jRnJhbWVTaXplLndpZHRoID0gdztcbiAgICAgICAgICAgIGxvY0ZyYW1lU2l6ZS5oZWlnaHQgPSBoO1xuICAgICAgICAgICAgY2MuZ2FtZS5jb250YWluZXIuc3R5bGVbJy13ZWJraXQtdHJhbnNmb3JtJ10gPSAncm90YXRlKDBkZWcpJztcbiAgICAgICAgICAgIGNjLmdhbWUuY29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGUoMGRlZyknO1xuICAgICAgICAgICAgdGhpcy5faXNSb3RhdGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2NGcmFtZVNpemUud2lkdGggPSBoO1xuICAgICAgICAgICAgbG9jRnJhbWVTaXplLmhlaWdodCA9IHc7XG4gICAgICAgICAgICBjYy5nYW1lLmNvbnRhaW5lci5zdHlsZVsnLXdlYmtpdC10cmFuc2Zvcm0nXSA9ICdyb3RhdGUoOTBkZWcpJztcbiAgICAgICAgICAgIGNjLmdhbWUuY29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGUoOTBkZWcpJztcbiAgICAgICAgICAgIGNjLmdhbWUuY29udGFpbmVyLnN0eWxlWyctd2Via2l0LXRyYW5zZm9ybS1vcmlnaW4nXSA9ICcwcHggMHB4IDBweCc7XG4gICAgICAgICAgICBjYy5nYW1lLmNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSAnMHB4IDBweCAwcHgnO1xuICAgICAgICAgICAgdGhpcy5faXNSb3RhdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fb3JpZW50YXRpb25DaGFuZ2luZykge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2Mudmlldy5fb3JpZW50YXRpb25DaGFuZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3NldFZpZXdwb3J0TWV0YTogZnVuY3Rpb24gKG1ldGFzLCBvdmVyd3JpdGUpIHtcbiAgICAgICAgdmFyIHZwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb2Nvc01ldGFFbGVtZW50XCIpO1xuICAgICAgICBpZih2cCAmJiBvdmVyd3JpdGUpe1xuICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZCh2cCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcInZpZXdwb3J0XCIpLFxuICAgICAgICAgICAgY3VycmVudFZQID0gZWxlbXMgPyBlbGVtc1swXSA6IG51bGwsXG4gICAgICAgICAgICBjb250ZW50LCBrZXksIHBhdHRlcm47XG5cbiAgICAgICAgY29udGVudCA9IGN1cnJlbnRWUCA/IGN1cnJlbnRWUC5jb250ZW50IDogXCJcIjtcbiAgICAgICAgdnAgPSB2cCB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWV0YVwiKTtcbiAgICAgICAgdnAuaWQgPSBcImNvY29zTWV0YUVsZW1lbnRcIjtcbiAgICAgICAgdnAubmFtZSA9IFwidmlld3BvcnRcIjtcbiAgICAgICAgdnAuY29udGVudCA9IFwiXCI7XG5cbiAgICAgICAgZm9yIChrZXkgaW4gbWV0YXMpIHtcbiAgICAgICAgICAgIGlmIChjb250ZW50LmluZGV4T2Yoa2V5KSA9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gXCIsXCIgKyBrZXkgKyBcIj1cIiArIG1ldGFzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvdmVyd3JpdGUpIHtcbiAgICAgICAgICAgICAgICBwYXR0ZXJuID0gbmV3IFJlZ0V4cChrZXkrXCJcXHMqPVxccypbXixdK1wiKTtcbiAgICAgICAgICAgICAgICBjb250ZW50LnJlcGxhY2UocGF0dGVybiwga2V5ICsgXCI9XCIgKyBtZXRhc1trZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZigvXiwvLnRlc3QoY29udGVudCkpXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5zdWJzdHIoMSk7XG5cbiAgICAgICAgdnAuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIC8vIEZvciBhZG9wdGluZyBjZXJ0YWluIGFuZHJvaWQgZGV2aWNlcyB3aGljaCBkb24ndCBzdXBwb3J0IHNlY29uZCB2aWV3cG9ydFxuICAgICAgICBpZiAoY3VycmVudFZQKVxuICAgICAgICAgICAgY3VycmVudFZQLmNvbnRlbnQgPSBjb250ZW50O1xuXG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodnApO1xuICAgIH0sXG5cbiAgICBfYWRqdXN0Vmlld3BvcnRNZXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0FkanVzdFZpZXdwb3J0ICYmICFDQ19KU0IgJiYgIUNDX1JVTlRJTUUpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldFZpZXdwb3J0TWV0YShfX0Jyb3dzZXJHZXR0ZXIubWV0YSwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5faXNBZGp1c3RWaWV3cG9ydCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIGVuZ2luZSBtb2RpZnkgdGhlIFwidmlld3BvcnRcIiBtZXRhIGluIHlvdXIgd2ViIHBhZ2UuPGJyLz5cbiAgICAgKiBJdCdzIGVuYWJsZWQgYnkgZGVmYXVsdCwgd2Ugc3Ryb25nbHkgc3VnZ2VzdCB5b3Ugbm90IHRvIGRpc2FibGUgaXQuPGJyLz5cbiAgICAgKiBBbmQgZXZlbiB3aGVuIGl0J3MgZW5hYmxlZCwgeW91IGNhbiBzdGlsbCBzZXQgeW91ciBvd24gXCJ2aWV3cG9ydFwiIG1ldGEsIGl0IHdvbid0IGJlIG92ZXJyaWRkZW48YnIvPlxuICAgICAqIE9ubHkgdXNlZnVsIG9uIHdlYlxuICAgICAqICEjemgg6K6+572u5byV5pOO5piv5ZCm6LCD5pW0IHZpZXdwb3J0IG1ldGEg5p2l6YWN5ZCI5bGP5bmV6YCC6YWN44CCXG4gICAgICog6buY6K6k6K6+572u5Li65ZCv5Yqo77yM5oiR5Lus5by654OI5bu66K6u5L2g5LiN6KaB5bCG5a6D6K6+572u5Li65YWz6Zet44CCXG4gICAgICog5Y2z5L2/5b2T5a6D5ZCv5Yqo5pe277yM5L2g5LuN54S26IO95aSf6K6+572u5L2g55qEIHZpZXdwb3J0IG1ldGHvvIzlroPkuI3kvJrooqvopobnm5bjgIJcbiAgICAgKiDku4XlnKggV2ViIOaooeW8j+S4i+acieaViFxuICAgICAqIEBtZXRob2QgYWRqdXN0Vmlld3BvcnRNZXRhXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBlbmFibGVkIC0gRW5hYmxlIGF1dG9tYXRpYyBtb2RpZmljYXRpb24gdG8gXCJ2aWV3cG9ydFwiIG1ldGFcbiAgICAgKi9cbiAgICBhZGp1c3RWaWV3cG9ydE1ldGE6IGZ1bmN0aW9uIChlbmFibGVkKSB7XG4gICAgICAgIHRoaXMuX2lzQWRqdXN0Vmlld3BvcnQgPSBlbmFibGVkO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0aW5hIHN1cHBvcnQgaXMgZW5hYmxlZCBieSBkZWZhdWx0IGZvciBBcHBsZSBkZXZpY2UgYnV0IGRpc2FibGVkIGZvciBvdGhlciBkZXZpY2VzLDxici8+XG4gICAgICogaXQgdGFrZXMgZWZmZWN0IG9ubHkgd2hlbiB5b3UgY2FsbGVkIHNldERlc2lnblJlc29sdXRpb25Qb2xpY3k8YnIvPlxuICAgICAqIE9ubHkgdXNlZnVsIG9uIHdlYlxuICAgICAqICEjemgg5a+55LqOIEFwcGxlIOi/meenjeaUr+aMgSBSZXRpbmEg5pi+56S655qE6K6+5aSH5LiK6buY6K6k6L+b6KGM5LyY5YyW6ICM5YW25LuW57G75Z6L6K6+5aSH6buY6K6k5LiN6L+b6KGM5LyY5YyW77yMXG4gICAgICog5a6D5LuF5Lya5Zyo5L2g6LCD55SoIHNldERlc2lnblJlc29sdXRpb25Qb2xpY3kg5pa55rOV5pe25pyJ5b2x5ZON44CCXG4gICAgICog5LuF5ZyoIFdlYiDmqKHlvI/kuIvmnInmlYjjgIJcbiAgICAgKiBAbWV0aG9kIGVuYWJsZVJldGluYVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZW5hYmxlZCAtIEVuYWJsZSBvciBkaXNhYmxlIHJldGluYSBkaXNwbGF5XG4gICAgICovXG4gICAgZW5hYmxlUmV0aW5hOiBmdW5jdGlvbihlbmFibGVkKSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IgJiYgZW5hYmxlZCkge1xuICAgICAgICAgICAgY2Mud2FybignQ2FuIG5vdCBlbmFibGUgcmV0aW5hIGluIEVkaXRvci4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZXRpbmFFbmFibGVkID0gISFlbmFibGVkO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ2hlY2sgd2hldGhlciByZXRpbmEgZGlzcGxheSBpcyBlbmFibGVkLjxici8+XG4gICAgICogT25seSB1c2VmdWwgb24gd2ViXG4gICAgICogISN6aCDmo4Dmn6XmmK/lkKblr7kgUmV0aW5hIOaYvuekuuiuvuWkh+i/m+ihjOS8mOWMluOAglxuICAgICAqIOS7heWcqCBXZWIg5qih5byP5LiL5pyJ5pWI44CCXG4gICAgICogQG1ldGhvZCBpc1JldGluYUVuYWJsZWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzUmV0aW5hRW5hYmxlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcmV0aW5hRW5hYmxlZDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBXaGV0aGVyIHRvIEVuYWJsZSBvbiBhbnRpLWFsaWFzXG4gICAgICogISN6aCDmjqfliLbmipfplK/pvb/mmK/lkKblvIDlkK9cbiAgICAgKiBAbWV0aG9kIGVuYWJsZUFudGlBbGlhc1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZW5hYmxlZCAtIEVuYWJsZSBvciBub3QgYW50aS1hbGlhc1xuICAgICAqIEBkZXByZWNhdGVkIGNjLnZpZXcuZW5hYmxlQW50aUFsaWFzIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgY2MuVGV4dHVyZTJELnNldEZpbHRlcnMgaW5zdGVhZFxuICAgICAqIEBzaW5jZSB2Mi4zLjBcbiAgICAgKi9cbiAgICBlbmFibGVBbnRpQWxpYXM6IGZ1bmN0aW9uIChlbmFibGVkKSB7XG4gICAgICAgIGNjLndhcm5JRCg5MjAwKTtcbiAgICAgICAgaWYgKHRoaXMuX2FudGlBbGlhc0VuYWJsZWQgPT09IGVuYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hbnRpQWxpYXNFbmFibGVkID0gZW5hYmxlZDtcbiAgICAgICAgaWYoY2MuZ2FtZS5yZW5kZXJUeXBlID09PSBjYy5nYW1lLlJFTkRFUl9UWVBFX1dFQkdMKSB7XG4gICAgICAgICAgICB2YXIgY2FjaGUgPSBjYy5hc3NldE1hbmFnZXIuYXNzZXRzO1xuICAgICAgICAgICAgY2FjaGUuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXNzZXQgaW5zdGFuY2VvZiBjYy5UZXh0dXJlMkQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIEZpbHRlciA9IGNjLlRleHR1cmUyRC5GaWx0ZXI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NldC5zZXRGaWx0ZXJzKEZpbHRlci5MSU5FQVIsIEZpbHRlci5MSU5FQVIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXQuc2V0RmlsdGVycyhGaWx0ZXIuTkVBUkVTVCwgRmlsdGVyLk5FQVJFU1QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihjYy5nYW1lLnJlbmRlclR5cGUgPT09IGNjLmdhbWUuUkVOREVSX1RZUEVfQ0FOVkFTKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gY2MuZ2FtZS5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgIGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBlbmFibGVkO1xuICAgICAgICAgICAgY3R4Lm1vekltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGVuYWJsZWQ7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHdoZXRoZXIgdGhlIGN1cnJlbnQgZW5hYmxlIG9uIGFudGktYWxpYXNcbiAgICAgKiAhI3poIOi/lOWbnuW9k+WJjeaYr+WQpuaKl+mUr+m9v1xuICAgICAqIEBtZXRob2QgaXNBbnRpQWxpYXNFbmFibGVkXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0FudGlBbGlhc0VuYWJsZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FudGlBbGlhc0VuYWJsZWQ7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogSWYgZW5hYmxlZCwgdGhlIGFwcGxpY2F0aW9uIHdpbGwgdHJ5IGF1dG9tYXRpY2FsbHkgdG8gZW50ZXIgZnVsbCBzY3JlZW4gbW9kZSBvbiBtb2JpbGUgZGV2aWNlczxici8+XG4gICAgICogWW91IGNhbiBwYXNzIHRydWUgYXMgcGFyYW1ldGVyIHRvIGVuYWJsZSBpdCBhbmQgZGlzYWJsZSBpdCBieSBwYXNzaW5nIGZhbHNlLjxici8+XG4gICAgICogT25seSB1c2VmdWwgb24gd2ViXG4gICAgICogISN6aCDlkK/liqjml7bvvIznp7vliqjnq6/muLjmiI/kvJrlnKjnp7vliqjnq6/oh6rliqjlsJ3or5Xov5vlhaXlhajlsY/mqKHlvI/jgIJcbiAgICAgKiDkvaDog73lpJ/kvKDlhaUgdHJ1ZSDkuLrlj4LmlbDljrvlkK/liqjlroPvvIznlKggZmFsc2Ug5Y+C5pWw5p2l5YWz6Zet5a6D44CCXG4gICAgICogQG1ldGhvZCBlbmFibGVBdXRvRnVsbFNjcmVlblxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZW5hYmxlZCAtIEVuYWJsZSBvciBkaXNhYmxlIGF1dG8gZnVsbCBzY3JlZW4gb24gbW9iaWxlIGRldmljZXNcbiAgICAgKi9cbiAgICBlbmFibGVBdXRvRnVsbFNjcmVlbjogZnVuY3Rpb24oZW5hYmxlZCkge1xuICAgICAgICBpZiAoZW5hYmxlZCAmJiBcbiAgICAgICAgICAgIGVuYWJsZWQgIT09IHRoaXMuX2F1dG9GdWxsU2NyZWVuICYmIFxuICAgICAgICAgICAgY2Muc3lzLmlzTW9iaWxlKSB7XG4gICAgICAgICAgICAvLyBBdXRvbWF0aWNhbGx5IGZ1bGwgc2NyZWVuIHdoZW4gdXNlciB0b3VjaGVzIG9uIG1vYmlsZSB2ZXJzaW9uXG4gICAgICAgICAgICB0aGlzLl9hdXRvRnVsbFNjcmVlbiA9IHRydWU7XG4gICAgICAgICAgICBjYy5zY3JlZW4uYXV0b0Z1bGxTY3JlZW4oY2MuZ2FtZS5mcmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hdXRvRnVsbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICAgICAgY2Muc2NyZWVuLmRpc2FibGVBdXRvRnVsbFNjcmVlbihjYy5nYW1lLmZyYW1lKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ2hlY2sgd2hldGhlciBhdXRvIGZ1bGwgc2NyZWVuIGlzIGVuYWJsZWQuPGJyLz5cbiAgICAgKiBPbmx5IHVzZWZ1bCBvbiB3ZWJcbiAgICAgKiAhI3poIOajgOafpeiHquWKqOi/m+WFpeWFqOWxj+aooeW8j+aYr+WQpuWQr+WKqOOAglxuICAgICAqIOS7heWcqCBXZWIg5qih5byP5LiL5pyJ5pWI44CCXG4gICAgICogQG1ldGhvZCBpc0F1dG9GdWxsU2NyZWVuRW5hYmxlZFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IEF1dG8gZnVsbCBzY3JlZW4gZW5hYmxlZCBvciBub3RcbiAgICAgKi9cbiAgICBpc0F1dG9GdWxsU2NyZWVuRW5hYmxlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvRnVsbFNjcmVlbjtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBOb3Qgc3VwcG9ydCBvbiBuYXRpdmUuPGJyLz5cbiAgICAgKiBPbiB3ZWIsIGl0IHNldHMgdGhlIHNpemUgb2YgdGhlIGNhbnZhcy5cbiAgICAgKiAhI3poIOi/meS4quaWueazleW5tuS4jeaUr+aMgSBuYXRpdmUg5bmz5Y+w77yM5ZyoIFdlYiDlubPlj7DkuIvvvIzlj6/ku6XnlKjmnaXorr7nva4gY2FudmFzIOWwuuWvuOOAglxuICAgICAqIEBtZXRob2Qgc2V0Q2FudmFzU2l6ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHRcbiAgICAgKi9cbiAgICBzZXRDYW52YXNTaXplOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICB2YXIgY2FudmFzID0gY2MuZ2FtZS5jYW52YXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBjYy5nYW1lLmNvbnRhaW5lcjtcblxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aCAqIHRoaXMuX2RldmljZVBpeGVsUmF0aW87XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQgKiB0aGlzLl9kZXZpY2VQaXhlbFJhdGlvO1xuXG4gICAgICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICAgICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG5cbiAgICAgICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcblxuICAgICAgICB0aGlzLl9yZXNpemVFdmVudCgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyB0aGUgY2FudmFzIHNpemUgb2YgdGhlIHZpZXcuPGJyLz5cbiAgICAgKiBPbiBuYXRpdmUgcGxhdGZvcm1zLCBpdCByZXR1cm5zIHRoZSBzY3JlZW4gc2l6ZSBzaW5jZSB0aGUgdmlldyBpcyBhIGZ1bGxzY3JlZW4gdmlldy48YnIvPlxuICAgICAqIE9uIHdlYiwgaXQgcmV0dXJucyB0aGUgc2l6ZSBvZiB0aGUgY2FudmFzIGVsZW1lbnQuXG4gICAgICogISN6aCDov5Tlm57op4blm77kuK0gY2FudmFzIOeahOWwuuWvuOOAglxuICAgICAqIOWcqCBuYXRpdmUg5bmz5Y+w5LiL77yM5a6D6L+U5Zue5YWo5bGP6KeG5Zu+5LiL5bGP5bmV55qE5bC65a+444CCXG4gICAgICog5ZyoIFdlYiDlubPlj7DkuIvvvIzlroPov5Tlm54gY2FudmFzIOWFg+e0oOWwuuWvuOOAglxuICAgICAqIEBtZXRob2QgZ2V0Q2FudmFzU2l6ZVxuICAgICAqIEByZXR1cm4ge1NpemV9XG4gICAgICovXG4gICAgZ2V0Q2FudmFzU2l6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2Muc2l6ZShjYy5nYW1lLmNhbnZhcy53aWR0aCwgY2MuZ2FtZS5jYW52YXMuaGVpZ2h0KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIGZyYW1lIHNpemUgb2YgdGhlIHZpZXcuPGJyLz5cbiAgICAgKiBPbiBuYXRpdmUgcGxhdGZvcm1zLCBpdCByZXR1cm5zIHRoZSBzY3JlZW4gc2l6ZSBzaW5jZSB0aGUgdmlldyBpcyBhIGZ1bGxzY3JlZW4gdmlldy48YnIvPlxuICAgICAqIE9uIHdlYiwgaXQgcmV0dXJucyB0aGUgc2l6ZSBvZiB0aGUgY2FudmFzJ3Mgb3V0ZXIgRE9NIGVsZW1lbnQuXG4gICAgICogISN6aCDov5Tlm57op4blm77kuK3ovrnmoYblsLrlr7jjgIJcbiAgICAgKiDlnKggbmF0aXZlIOW5s+WPsOS4i++8jOWug+i/lOWbnuWFqOWxj+inhuWbvuS4i+Wxj+W5leeahOWwuuWvuOOAglxuICAgICAqIOWcqCB3ZWIg5bmz5Y+w5LiL77yM5a6D6L+U5ZueIGNhbnZhcyDlhYPntKDnmoTlpJblsYIgRE9NIOWFg+e0oOWwuuWvuOOAglxuICAgICAqIEBtZXRob2QgZ2V0RnJhbWVTaXplXG4gICAgICogQHJldHVybiB7U2l6ZX1cbiAgICAgKi9cbiAgICBnZXRGcmFtZVNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLnNpemUodGhpcy5fZnJhbWVTaXplLndpZHRoLCB0aGlzLl9mcmFtZVNpemUuaGVpZ2h0KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIE9uIG5hdGl2ZSwgaXQgc2V0cyB0aGUgZnJhbWUgc2l6ZSBvZiB2aWV3Ljxici8+XG4gICAgICogT24gd2ViLCBpdCBzZXRzIHRoZSBzaXplIG9mIHRoZSBjYW52YXMncyBvdXRlciBET00gZWxlbWVudC5cbiAgICAgKiAhI3poIOWcqCBuYXRpdmUg5bmz5Y+w5LiL77yM6K6+572u6KeG5Zu+5qGG5p625bC65a+444CCXG4gICAgICog5ZyoIHdlYiDlubPlj7DkuIvvvIzorr7nva4gY2FudmFzIOWkluWxgiBET00g5YWD57Sg5bC65a+444CCXG4gICAgICogQG1ldGhvZCBzZXRGcmFtZVNpemVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XG4gICAgICovXG4gICAgc2V0RnJhbWVTaXplOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLl9mcmFtZVNpemUud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5fZnJhbWVTaXplLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgY2MuZ2FtZS5mcmFtZS5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuICAgICAgICBjYy5nYW1lLmZyYW1lLnN0eWxlLmhlaWdodCA9IGhlaWdodCArIFwicHhcIjtcbiAgICAgICAgdGhpcy5fcmVzaXplRXZlbnQodHJ1ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSB2aXNpYmxlIGFyZWEgc2l6ZSBvZiB0aGUgdmlldyBwb3J0LlxuICAgICAqICEjemgg6L+U5Zue6KeG5Zu+56qX5Y+j5Y+v6KeB5Yy65Z+f5bC65a+444CCXG4gICAgICogQG1ldGhvZCBnZXRWaXNpYmxlU2l6ZVxuICAgICAqIEByZXR1cm4ge1NpemV9XG4gICAgICovXG4gICAgZ2V0VmlzaWJsZVNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLnNpemUodGhpcy5fdmlzaWJsZVJlY3Qud2lkdGgsdGhpcy5fdmlzaWJsZVJlY3QuaGVpZ2h0KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIHZpc2libGUgYXJlYSBzaXplIG9mIHRoZSB2aWV3IHBvcnQuXG4gICAgICogISN6aCDov5Tlm57op4blm77nqpflj6Plj6/op4HljLrln5/lg4/ntKDlsLrlr7jjgIJcbiAgICAgKiBAbWV0aG9kIGdldFZpc2libGVTaXplSW5QaXhlbFxuICAgICAqIEByZXR1cm4ge1NpemV9XG4gICAgICovXG4gICAgZ2V0VmlzaWJsZVNpemVJblBpeGVsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjYy5zaXplKCB0aGlzLl92aXNpYmxlUmVjdC53aWR0aCAqIHRoaXMuX3NjYWxlWCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Zpc2libGVSZWN0LmhlaWdodCAqIHRoaXMuX3NjYWxlWSApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyB0aGUgdmlzaWJsZSBvcmlnaW4gb2YgdGhlIHZpZXcgcG9ydC5cbiAgICAgKiAhI3poIOi/lOWbnuinhuWbvueql+WPo+WPr+ingeWMuuWfn+WOn+eCueOAglxuICAgICAqIEBtZXRob2QgZ2V0VmlzaWJsZU9yaWdpblxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICovXG4gICAgZ2V0VmlzaWJsZU9yaWdpbjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2MudjIodGhpcy5fdmlzaWJsZVJlY3QueCx0aGlzLl92aXNpYmxlUmVjdC55KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIHZpc2libGUgb3JpZ2luIG9mIHRoZSB2aWV3IHBvcnQuXG4gICAgICogISN6aCDov5Tlm57op4blm77nqpflj6Plj6/op4HljLrln5/lg4/ntKDljp/ngrnjgIJcbiAgICAgKiBAbWV0aG9kIGdldFZpc2libGVPcmlnaW5JblBpeGVsXG4gICAgICogQHJldHVybiB7VmVjMn1cbiAgICAgKi9cbiAgICBnZXRWaXNpYmxlT3JpZ2luSW5QaXhlbDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2MudjIodGhpcy5fdmlzaWJsZVJlY3QueCAqIHRoaXMuX3NjYWxlWCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlzaWJsZVJlY3QueSAqIHRoaXMuX3NjYWxlWSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHJlc29sdXRpb24gcG9saWN5XG4gICAgICogISN6aCDov5Tlm57lvZPliY3liIbovqjnjofmlrnmoYhcbiAgICAgKiBAc2VlIGNjLlJlc29sdXRpb25Qb2xpY3lcbiAgICAgKiBAbWV0aG9kIGdldFJlc29sdXRpb25Qb2xpY3lcbiAgICAgKiBAcmV0dXJuIHtSZXNvbHV0aW9uUG9saWN5fVxuICAgICAqL1xuICAgIGdldFJlc29sdXRpb25Qb2xpY3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc29sdXRpb25Qb2xpY3k7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHJlc29sdXRpb24gcG9saWN5XG4gICAgICogISN6aCDorr7nva7lvZPliY3liIbovqjnjofmqKHlvI9cbiAgICAgKiBAc2VlIGNjLlJlc29sdXRpb25Qb2xpY3lcbiAgICAgKiBAbWV0aG9kIHNldFJlc29sdXRpb25Qb2xpY3lcbiAgICAgKiBAcGFyYW0ge1Jlc29sdXRpb25Qb2xpY3l8TnVtYmVyfSByZXNvbHV0aW9uUG9saWN5XG4gICAgICovXG4gICAgc2V0UmVzb2x1dGlvblBvbGljeTogZnVuY3Rpb24gKHJlc29sdXRpb25Qb2xpY3kpIHtcbiAgICAgICAgdmFyIF90ID0gdGhpcztcbiAgICAgICAgaWYgKHJlc29sdXRpb25Qb2xpY3kgaW5zdGFuY2VvZiBjYy5SZXNvbHV0aW9uUG9saWN5KSB7XG4gICAgICAgICAgICBfdC5fcmVzb2x1dGlvblBvbGljeSA9IHJlc29sdXRpb25Qb2xpY3k7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRW5zdXJlIGNvbXBhdGliaWxpdHkgd2l0aCBKU0JcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgX2xvY1BvbGljeSA9IGNjLlJlc29sdXRpb25Qb2xpY3k7XG4gICAgICAgICAgICBpZihyZXNvbHV0aW9uUG9saWN5ID09PSBfbG9jUG9saWN5LkVYQUNUX0ZJVClcbiAgICAgICAgICAgICAgICBfdC5fcmVzb2x1dGlvblBvbGljeSA9IF90Ll9ycEV4YWN0Rml0O1xuICAgICAgICAgICAgaWYocmVzb2x1dGlvblBvbGljeSA9PT0gX2xvY1BvbGljeS5TSE9XX0FMTClcbiAgICAgICAgICAgICAgICBfdC5fcmVzb2x1dGlvblBvbGljeSA9IF90Ll9ycFNob3dBbGw7XG4gICAgICAgICAgICBpZihyZXNvbHV0aW9uUG9saWN5ID09PSBfbG9jUG9saWN5Lk5PX0JPUkRFUilcbiAgICAgICAgICAgICAgICBfdC5fcmVzb2x1dGlvblBvbGljeSA9IF90Ll9ycE5vQm9yZGVyO1xuICAgICAgICAgICAgaWYocmVzb2x1dGlvblBvbGljeSA9PT0gX2xvY1BvbGljeS5GSVhFRF9IRUlHSFQpXG4gICAgICAgICAgICAgICAgX3QuX3Jlc29sdXRpb25Qb2xpY3kgPSBfdC5fcnBGaXhlZEhlaWdodDtcbiAgICAgICAgICAgIGlmKHJlc29sdXRpb25Qb2xpY3kgPT09IF9sb2NQb2xpY3kuRklYRURfV0lEVEgpXG4gICAgICAgICAgICAgICAgX3QuX3Jlc29sdXRpb25Qb2xpY3kgPSBfdC5fcnBGaXhlZFdpZHRoO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXRzIHRoZSByZXNvbHV0aW9uIHBvbGljeSB3aXRoIGRlc2lnbmVkIHZpZXcgc2l6ZSBpbiBwb2ludHMuPGJyLz5cbiAgICAgKiBUaGUgcmVzb2x1dGlvbiBwb2xpY3kgaW5jbHVkZTogPGJyLz5cbiAgICAgKiBbMV0gUmVzb2x1dGlvbkV4YWN0Rml0ICAgICAgIEZpbGwgc2NyZWVuIGJ5IHN0cmV0Y2gtdG8tZml0OiBpZiB0aGUgZGVzaWduIHJlc29sdXRpb24gcmF0aW8gb2Ygd2lkdGggdG8gaGVpZ2h0IGlzIGRpZmZlcmVudCBmcm9tIHRoZSBzY3JlZW4gcmVzb2x1dGlvbiByYXRpbywgeW91ciBnYW1lIHZpZXcgd2lsbCBiZSBzdHJldGNoZWQuPGJyLz5cbiAgICAgKiBbMl0gUmVzb2x1dGlvbk5vQm9yZGVyICAgICAgIEZ1bGwgc2NyZWVuIHdpdGhvdXQgYmxhY2sgYm9yZGVyOiBpZiB0aGUgZGVzaWduIHJlc29sdXRpb24gcmF0aW8gb2Ygd2lkdGggdG8gaGVpZ2h0IGlzIGRpZmZlcmVudCBmcm9tIHRoZSBzY3JlZW4gcmVzb2x1dGlvbiByYXRpbywgdHdvIGFyZWFzIG9mIHlvdXIgZ2FtZSB2aWV3IHdpbGwgYmUgY3V0Ljxici8+XG4gICAgICogWzNdIFJlc29sdXRpb25TaG93QWxsICAgICAgICBGdWxsIHNjcmVlbiB3aXRoIGJsYWNrIGJvcmRlcjogaWYgdGhlIGRlc2lnbiByZXNvbHV0aW9uIHJhdGlvIG9mIHdpZHRoIHRvIGhlaWdodCBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgc2NyZWVuIHJlc29sdXRpb24gcmF0aW8sIHR3byBibGFjayBib3JkZXJzIHdpbGwgYmUgc2hvd24uPGJyLz5cbiAgICAgKiBbNF0gUmVzb2x1dGlvbkZpeGVkSGVpZ2h0ICAgIFNjYWxlIHRoZSBjb250ZW50J3MgaGVpZ2h0IHRvIHNjcmVlbidzIGhlaWdodCBhbmQgcHJvcG9ydGlvbmFsbHkgc2NhbGUgaXRzIHdpZHRoPGJyLz5cbiAgICAgKiBbNV0gUmVzb2x1dGlvbkZpeGVkV2lkdGggICAgIFNjYWxlIHRoZSBjb250ZW50J3Mgd2lkdGggdG8gc2NyZWVuJ3Mgd2lkdGggYW5kIHByb3BvcnRpb25hbGx5IHNjYWxlIGl0cyBoZWlnaHQ8YnIvPlxuICAgICAqIFtjYy5SZXNvbHV0aW9uUG9saWN5XSAgICAgICAgW1dlYiBvbmx5IGZlYXR1cmVdIEN1c3RvbSByZXNvbHV0aW9uIHBvbGljeSwgY29uc3RydWN0ZWQgYnkgY2MuUmVzb2x1dGlvblBvbGljeTxici8+XG4gICAgICogISN6aCDpgJrov4forr7nva7orr7orqHliIbovqjnjoflkozljLnphY3mqKHlvI/mnaXov5vooYzmuLjmiI/nlLvpnaLnmoTlsY/luZXpgILphY3jgIJcbiAgICAgKiBAbWV0aG9kIHNldERlc2lnblJlc29sdXRpb25TaXplXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIERlc2lnbiByZXNvbHV0aW9uIHdpZHRoLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgRGVzaWduIHJlc29sdXRpb24gaGVpZ2h0LlxuICAgICAqIEBwYXJhbSB7UmVzb2x1dGlvblBvbGljeXxOdW1iZXJ9IHJlc29sdXRpb25Qb2xpY3kgVGhlIHJlc29sdXRpb24gcG9saWN5IGRlc2lyZWRcbiAgICAgKi9cbiAgICBzZXREZXNpZ25SZXNvbHV0aW9uU2l6ZTogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIHJlc29sdXRpb25Qb2xpY3kpIHtcbiAgICAgICAgLy8gRGVmZW5zaXZlIGNvZGVcbiAgICAgICAgaWYoICEod2lkdGggPiAwIHx8IGhlaWdodCA+IDApICl7XG4gICAgICAgICAgICBjYy5lcnJvcklEKDIyMDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRSZXNvbHV0aW9uUG9saWN5KHJlc29sdXRpb25Qb2xpY3kpO1xuICAgICAgICB2YXIgcG9saWN5ID0gdGhpcy5fcmVzb2x1dGlvblBvbGljeTtcbiAgICAgICAgaWYgKHBvbGljeSkge1xuICAgICAgICAgICAgcG9saWN5LnByZUFwcGx5KHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVpbml0IGZyYW1lIHNpemVcbiAgICAgICAgaWYgKGNjLnN5cy5pc01vYmlsZSlcbiAgICAgICAgICAgIHRoaXMuX2FkanVzdFZpZXdwb3J0TWV0YSgpO1xuXG4gICAgICAgIC8vIFBlcm1pdCB0byByZS1kZXRlY3QgdGhlIG9yaWVudGF0aW9uIG9mIGRldmljZS5cbiAgICAgICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2luZyA9IHRydWU7XG4gICAgICAgIC8vIElmIHJlc2l6aW5nLCB0aGVuIGZyYW1lIHNpemUgaXMgYWxyZWFkeSBpbml0aWFsaXplZCwgdGhpcyBsb2dpYyBzaG91bGQgYmUgaW1wcm92ZWRcbiAgICAgICAgaWYgKCF0aGlzLl9yZXNpemluZylcbiAgICAgICAgICAgIHRoaXMuX2luaXRGcmFtZVNpemUoKTtcblxuICAgICAgICBpZiAoIXBvbGljeSkge1xuICAgICAgICAgICAgY2MubG9nSUQoMjIwMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9vcmlnaW5hbERlc2lnblJlc29sdXRpb25TaXplLndpZHRoID0gdGhpcy5fZGVzaWduUmVzb2x1dGlvblNpemUud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5fb3JpZ2luYWxEZXNpZ25SZXNvbHV0aW9uU2l6ZS5oZWlnaHQgPSB0aGlzLl9kZXNpZ25SZXNvbHV0aW9uU2l6ZS5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IHBvbGljeS5hcHBseSh0aGlzLCB0aGlzLl9kZXNpZ25SZXNvbHV0aW9uU2l6ZSk7XG5cbiAgICAgICAgaWYocmVzdWx0LnNjYWxlICYmIHJlc3VsdC5zY2FsZS5sZW5ndGggPT09IDIpe1xuICAgICAgICAgICAgdGhpcy5fc2NhbGVYID0gcmVzdWx0LnNjYWxlWzBdO1xuICAgICAgICAgICAgdGhpcy5fc2NhbGVZID0gcmVzdWx0LnNjYWxlWzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYocmVzdWx0LnZpZXdwb3J0KXtcbiAgICAgICAgICAgIHZhciB2cCA9IHRoaXMuX3ZpZXdwb3J0UmVjdCxcbiAgICAgICAgICAgICAgICB2YiA9IHRoaXMuX3Zpc2libGVSZWN0LFxuICAgICAgICAgICAgICAgIHJ2ID0gcmVzdWx0LnZpZXdwb3J0O1xuXG4gICAgICAgICAgICB2cC54ID0gcnYueDtcbiAgICAgICAgICAgIHZwLnkgPSBydi55O1xuICAgICAgICAgICAgdnAud2lkdGggPSBydi53aWR0aDtcbiAgICAgICAgICAgIHZwLmhlaWdodCA9IHJ2LmhlaWdodDtcblxuICAgICAgICAgICAgdmIueCA9IDA7XG4gICAgICAgICAgICB2Yi55ID0gMDtcbiAgICAgICAgICAgIHZiLndpZHRoID0gcnYud2lkdGggLyB0aGlzLl9zY2FsZVg7XG4gICAgICAgICAgICB2Yi5oZWlnaHQgPSBydi5oZWlnaHQgLyB0aGlzLl9zY2FsZVk7XG4gICAgICAgIH1cblxuICAgICAgICBwb2xpY3kucG9zdEFwcGx5KHRoaXMpO1xuICAgICAgICBjYy53aW5TaXplLndpZHRoID0gdGhpcy5fdmlzaWJsZVJlY3Qud2lkdGg7XG4gICAgICAgIGNjLndpblNpemUuaGVpZ2h0ID0gdGhpcy5fdmlzaWJsZVJlY3QuaGVpZ2h0O1xuXG4gICAgICAgIGNjLnZpc2libGVSZWN0ICYmIGNjLnZpc2libGVSZWN0LmluaXQodGhpcy5fdmlzaWJsZVJlY3QpO1xuXG4gICAgICAgIHJlbmRlcmVyLnVwZGF0ZUNhbWVyYVZpZXdwb3J0KCk7XG4gICAgICAgIGNjLmludGVybmFsLmlucHV0TWFuYWdlci5fdXBkYXRlQ2FudmFzQm91bmRpbmdSZWN0KCk7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVzaWduLXJlc29sdXRpb24tY2hhbmdlZCcpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyB0aGUgZGVzaWduZWQgc2l6ZSBmb3IgdGhlIHZpZXcuXG4gICAgICogRGVmYXVsdCByZXNvbHV0aW9uIHNpemUgaXMgdGhlIHNhbWUgYXMgJ2dldEZyYW1lU2l6ZScuXG4gICAgICogISN6aCDov5Tlm57op4blm77nmoTorr7orqHliIbovqjnjofjgIJcbiAgICAgKiDpu5jorqTkuIvliIbovqjnjoflsLrlr7jlkIwgYGdldEZyYW1lU2l6ZWAg5pa55rOV55u45ZCMXG4gICAgICogQG1ldGhvZCBnZXREZXNpZ25SZXNvbHV0aW9uU2l6ZVxuICAgICAqIEByZXR1cm4ge1NpemV9XG4gICAgICovXG4gICAgZ2V0RGVzaWduUmVzb2x1dGlvblNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLnNpemUodGhpcy5fZGVzaWduUmVzb2x1dGlvblNpemUud2lkdGgsIHRoaXMuX2Rlc2lnblJlc29sdXRpb25TaXplLmhlaWdodCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXRzIHRoZSBjb250YWluZXIgdG8gZGVzaXJlZCBwaXhlbCByZXNvbHV0aW9uIGFuZCBmaXQgdGhlIGdhbWUgY29udGVudCB0byBpdC5cbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHZlcnkgdXNlZnVsIGZvciBhZGFwdGF0aW9uIGluIG1vYmlsZSBicm93c2Vycy5cbiAgICAgKiBJbiBzb21lIEhEIGFuZHJvaWQgZGV2aWNlcywgdGhlIHJlc29sdXRpb24gaXMgdmVyeSBoaWdoLCBidXQgaXRzIGJyb3dzZXIgcGVyZm9ybWFuY2UgbWF5IG5vdCBiZSB2ZXJ5IGdvb2QuXG4gICAgICogSW4gdGhpcyBjYXNlLCBlbmFibGluZyByZXRpbmEgZGlzcGxheSBpcyB2ZXJ5IGNvc3R5IGFuZCBub3Qgc3VnZ2VzdGVkLCBhbmQgaWYgcmV0aW5hIGlzIGRpc2FibGVkLCB0aGUgaW1hZ2UgbWF5IGJlIGJsdXJyeS5cbiAgICAgKiBCdXQgdGhpcyBBUEkgY2FuIGJlIGhlbHBmdWwgdG8gc2V0IGEgZGVzaXJlZCBwaXhlbCByZXNvbHV0aW9uIHdoaWNoIGlzIGluIGJldHdlZW4uXG4gICAgICogVGhpcyBBUEkgd2lsbCBkbyB0aGUgZm9sbG93aW5nOlxuICAgICAqICAgICAxLiBTZXQgdmlld3BvcnQncyB3aWR0aCB0byB0aGUgZGVzaXJlZCB3aWR0aCBpbiBwaXhlbFxuICAgICAqICAgICAyLiBTZXQgYm9keSB3aWR0aCB0byB0aGUgZXhhY3QgcGl4ZWwgcmVzb2x1dGlvblxuICAgICAqICAgICAzLiBUaGUgcmVzb2x1dGlvbiBwb2xpY3kgd2lsbCBiZSByZXNldCB3aXRoIGRlc2lnbmVkIHZpZXcgc2l6ZSBpbiBwb2ludHMuXG4gICAgICogISN6aCDorr7nva7lrrnlmajvvIhjb250YWluZXLvvInpnIDopoHnmoTlg4/ntKDliIbovqjnjoflubbkuJTpgILphY3nm7jlupTliIbovqjnjofnmoTmuLjmiI/lhoXlrrnjgIJcbiAgICAgKiBAbWV0aG9kIHNldFJlYWxQaXhlbFJlc29sdXRpb25cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggRGVzaWduIHJlc29sdXRpb24gd2lkdGguXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodCBEZXNpZ24gcmVzb2x1dGlvbiBoZWlnaHQuXG4gICAgICogQHBhcmFtIHtSZXNvbHV0aW9uUG9saWN5fE51bWJlcn0gcmVzb2x1dGlvblBvbGljeSBUaGUgcmVzb2x1dGlvbiBwb2xpY3kgZGVzaXJlZFxuICAgICAqL1xuICAgIHNldFJlYWxQaXhlbFJlc29sdXRpb246IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCByZXNvbHV0aW9uUG9saWN5KSB7XG4gICAgICAgIGlmICghQ0NfSlNCICYmICFDQ19SVU5USU1FKSB7XG4gICAgICAgICAgICAvLyBTZXQgdmlld3BvcnQncyB3aWR0aFxuICAgICAgICAgICAgdGhpcy5fc2V0Vmlld3BvcnRNZXRhKHtcIndpZHRoXCI6IHdpZHRofSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIFNldCBib2R5IHdpZHRoIHRvIHRoZSBleGFjdCBwaXhlbCByZXNvbHV0aW9uXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUud2lkdGggPSB3aWR0aCArIFwicHhcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUud2lkdGggPSB3aWR0aCArIFwicHhcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUubGVmdCA9IFwiMHB4XCI7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnRvcCA9IFwiMHB4XCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXNldCB0aGUgcmVzb2x1dGlvbiBzaXplIGFuZCBwb2xpY3lcbiAgICAgICAgdGhpcy5zZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSh3aWR0aCwgaGVpZ2h0LCByZXNvbHV0aW9uUG9saWN5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldHMgdmlldyBwb3J0IHJlY3RhbmdsZSB3aXRoIHBvaW50cy5cbiAgICAgKiAhI3poIOeUqOiuvuiuoeWIhui+qOeOh+S4i+eahOeCueWwuuWvuOadpeiuvue9ruinhueql+OAglxuICAgICAqIEBtZXRob2Qgc2V0Vmlld3BvcnRJblBvaW50c1xuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHcgd2lkdGhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaCBoZWlnaHRcbiAgICAgKi9cbiAgICBzZXRWaWV3cG9ydEluUG9pbnRzOiBmdW5jdGlvbiAoeCwgeSwgdywgaCkge1xuICAgICAgICB2YXIgbG9jU2NhbGVYID0gdGhpcy5fc2NhbGVYLCBsb2NTY2FsZVkgPSB0aGlzLl9zY2FsZVk7XG4gICAgICAgIGNjLmdhbWUuX3JlbmRlckNvbnRleHQudmlld3BvcnQoKHggKiBsb2NTY2FsZVggKyB0aGlzLl92aWV3cG9ydFJlY3QueCksXG4gICAgICAgICAgICAoeSAqIGxvY1NjYWxlWSArIHRoaXMuX3ZpZXdwb3J0UmVjdC55KSxcbiAgICAgICAgICAgICh3ICogbG9jU2NhbGVYKSxcbiAgICAgICAgICAgIChoICogbG9jU2NhbGVZKSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXRzIFNjaXNzb3IgcmVjdGFuZ2xlIHdpdGggcG9pbnRzLlxuICAgICAqICEjemgg55So6K6+6K6h5YiG6L6o546H5LiL55qE54K555qE5bC65a+45p2l6K6+572uIHNjaXNzb3Ig5Ymq6KOB5Yy65Z+f44CCXG4gICAgICogQG1ldGhvZCBzZXRTY2lzc29ySW5Qb2ludHNcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGhcbiAgICAgKi9cbiAgICBzZXRTY2lzc29ySW5Qb2ludHM6IGZ1bmN0aW9uICh4LCB5LCB3LCBoKSB7XG4gICAgICAgIGxldCBzY2FsZVggPSB0aGlzLl9zY2FsZVgsIHNjYWxlWSA9IHRoaXMuX3NjYWxlWTtcbiAgICAgICAgbGV0IHN4ID0gTWF0aC5jZWlsKHggKiBzY2FsZVggKyB0aGlzLl92aWV3cG9ydFJlY3QueCk7XG4gICAgICAgIGxldCBzeSA9IE1hdGguY2VpbCh5ICogc2NhbGVZICsgdGhpcy5fdmlld3BvcnRSZWN0LnkpO1xuICAgICAgICBsZXQgc3cgPSBNYXRoLmNlaWwodyAqIHNjYWxlWCk7XG4gICAgICAgIGxldCBzaCA9IE1hdGguY2VpbChoICogc2NhbGVZKTtcbiAgICAgICAgbGV0IGdsID0gY2MuZ2FtZS5fcmVuZGVyQ29udGV4dDtcblxuICAgICAgICBpZiAoIV9zY2lzc29yUmVjdCkge1xuICAgICAgICAgICAgdmFyIGJveEFyciA9IGdsLmdldFBhcmFtZXRlcihnbC5TQ0lTU09SX0JPWCk7XG4gICAgICAgICAgICBfc2Npc3NvclJlY3QgPSBjYy5yZWN0KGJveEFyclswXSwgYm94QXJyWzFdLCBib3hBcnJbMl0sIGJveEFyclszXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX3NjaXNzb3JSZWN0LnggIT09IHN4IHx8IF9zY2lzc29yUmVjdC55ICE9PSBzeSB8fCBfc2Npc3NvclJlY3Qud2lkdGggIT09IHN3IHx8IF9zY2lzc29yUmVjdC5oZWlnaHQgIT09IHNoKSB7XG4gICAgICAgICAgICBfc2Npc3NvclJlY3QueCA9IHN4O1xuICAgICAgICAgICAgX3NjaXNzb3JSZWN0LnkgPSBzeTtcbiAgICAgICAgICAgIF9zY2lzc29yUmVjdC53aWR0aCA9IHN3O1xuICAgICAgICAgICAgX3NjaXNzb3JSZWN0LmhlaWdodCA9IHNoO1xuICAgICAgICAgICAgZ2wuc2Npc3NvcihzeCwgc3ksIHN3LCBzaCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgd2hldGhlciBHTF9TQ0lTU09SX1RFU1QgaXMgZW5hYmxlXG4gICAgICogISN6aCDmo4Dmn6Ugc2Npc3NvciDmmK/lkKbnlJ/mlYjjgIJcbiAgICAgKiBAbWV0aG9kIGlzU2Npc3NvckVuYWJsZWRcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1NjaXNzb3JFbmFibGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjYy5nYW1lLl9yZW5kZXJDb250ZXh0LmlzRW5hYmxlZChnbC5TQ0lTU09SX1RFU1QpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBzY2lzc29yIHJlY3RhbmdsZVxuICAgICAqICEjemgg6L+U5Zue5b2T5YmN55qEIHNjaXNzb3Ig5Ymq6KOB5Yy65Z+f44CCXG4gICAgICogQG1ldGhvZCBnZXRTY2lzc29yUmVjdFxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKiBAcmV0dXJuIHtSZWN0fVxuICAgICAqL1xuICAgIGdldFNjaXNzb3JSZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghX3NjaXNzb3JSZWN0KSB7XG4gICAgICAgICAgICB2YXIgYm94QXJyID0gZ2wuZ2V0UGFyYW1ldGVyKGdsLlNDSVNTT1JfQk9YKTtcbiAgICAgICAgICAgIF9zY2lzc29yUmVjdCA9IGNjLnJlY3QoYm94QXJyWzBdLCBib3hBcnJbMV0sIGJveEFyclsyXSwgYm94QXJyWzNdKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2NhbGVYRmFjdG9yID0gMSAvIHRoaXMuX3NjYWxlWDtcbiAgICAgICAgdmFyIHNjYWxlWUZhY3RvciA9IDEgLyB0aGlzLl9zY2FsZVk7XG4gICAgICAgIHJldHVybiBjYy5yZWN0KFxuICAgICAgICAgICAgKF9zY2lzc29yUmVjdC54IC0gdGhpcy5fdmlld3BvcnRSZWN0LngpICogc2NhbGVYRmFjdG9yLFxuICAgICAgICAgICAgKF9zY2lzc29yUmVjdC55IC0gdGhpcy5fdmlld3BvcnRSZWN0LnkpICogc2NhbGVZRmFjdG9yLFxuICAgICAgICAgICAgX3NjaXNzb3JSZWN0LndpZHRoICogc2NhbGVYRmFjdG9yLFxuICAgICAgICAgICAgX3NjaXNzb3JSZWN0LmhlaWdodCAqIHNjYWxlWUZhY3RvclxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyB0aGUgdmlldyBwb3J0IHJlY3RhbmdsZS5cbiAgICAgKiAhI3poIOi/lOWbnuinhueql+WJquijgeWMuuWfn+OAglxuICAgICAqIEBtZXRob2QgZ2V0Vmlld3BvcnRSZWN0XG4gICAgICogQHJldHVybiB7UmVjdH1cbiAgICAgKi9cbiAgICBnZXRWaWV3cG9ydFJlY3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZpZXdwb3J0UmVjdDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgc2NhbGUgZmFjdG9yIG9mIHRoZSBob3Jpem9udGFsIGRpcmVjdGlvbiAoWCBheGlzKS5cbiAgICAgKiAhI3poIOi/lOWbnuaoqui9tOeahOe8qeaUvuavlO+8jOi/meS4que8qeaUvuavlOaYr+WwhueUu+W4g+WDj+e0oOWIhui+qOeOh+aUvuWIsOiuvuiuoeWIhui+qOeOh+eahOavlOS+i+OAglxuICAgICAqIEBtZXRob2QgZ2V0U2NhbGVYXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldFNjYWxlWDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVYO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyBzY2FsZSBmYWN0b3Igb2YgdGhlIHZlcnRpY2FsIGRpcmVjdGlvbiAoWSBheGlzKS5cbiAgICAgKiAhI3poIOi/lOWbnue6tei9tOeahOe8qeaUvuavlO+8jOi/meS4que8qeaUvuavlOaYr+WwhueUu+W4g+WDj+e0oOWIhui+qOeOh+e8qeaUvuWIsOiuvuiuoeWIhui+qOeOh+eahOavlOS+i+OAglxuICAgICAqIEBtZXRob2QgZ2V0U2NhbGVZXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldFNjYWxlWTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGVZO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyBkZXZpY2UgcGl4ZWwgcmF0aW8gZm9yIHJldGluYSBkaXNwbGF5LlxuICAgICAqICEjemgg6L+U5Zue6K6+5aSH5oiW5rWP6KeI5Zmo5YOP57Sg5q+U5L6L44CCXG4gICAgICogQG1ldGhvZCBnZXREZXZpY2VQaXhlbFJhdGlvXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldERldmljZVBpeGVsUmF0aW86IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGV2aWNlUGl4ZWxSYXRpbztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIHJlYWwgbG9jYXRpb24gaW4gdmlldyBmb3IgYSB0cmFuc2xhdGlvbiBiYXNlZCBvbiBhIHJlbGF0ZWQgcG9zaXRpb25cbiAgICAgKiAhI3poIOWwhuWxj+W5leWdkOagh+i9rOaNouS4uua4uOaIj+inhuWbvuS4i+eahOWdkOagh+OAglxuICAgICAqIEBtZXRob2QgY29udmVydFRvTG9jYXRpb25JblZpZXdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdHggLSBUaGUgWCBheGlzIHRyYW5zbGF0aW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHR5IC0gVGhlIFkgYXhpcyB0cmFuc2xhdGlvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZWxhdGVkUG9zIC0gVGhlIHJlbGF0ZWQgcG9zaXRpb24gb2JqZWN0IGluY2x1ZGluZyBcImxlZnRcIiwgXCJ0b3BcIiwgXCJ3aWR0aFwiLCBcImhlaWdodFwiIGluZm9ybWF0aW9uc1xuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICovXG4gICAgY29udmVydFRvTG9jYXRpb25JblZpZXc6IGZ1bmN0aW9uICh0eCwgdHksIHJlbGF0ZWRQb3MsIG91dCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gb3V0IHx8IGNjLnYyKCk7XG4gICAgICAgIGxldCBwb3NMZWZ0ID0gcmVsYXRlZFBvcy5hZGp1c3RlZExlZnQgPyByZWxhdGVkUG9zLmFkanVzdGVkTGVmdCA6IHJlbGF0ZWRQb3MubGVmdDtcbiAgICAgICAgbGV0IHBvc1RvcCA9IHJlbGF0ZWRQb3MuYWRqdXN0ZWRUb3AgPyByZWxhdGVkUG9zLmFkanVzdGVkVG9wIDogcmVsYXRlZFBvcy50b3A7XG4gICAgICAgIGxldCB4ID0gdGhpcy5fZGV2aWNlUGl4ZWxSYXRpbyAqICh0eCAtIHBvc0xlZnQpO1xuICAgICAgICBsZXQgeSA9IHRoaXMuX2RldmljZVBpeGVsUmF0aW8gKiAocG9zVG9wICsgcmVsYXRlZFBvcy5oZWlnaHQgLSB0eSk7XG4gICAgICAgIGlmICh0aGlzLl9pc1JvdGF0ZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdC54ID0gY2MuZ2FtZS5jYW52YXMud2lkdGggLSB5O1xuICAgICAgICAgICAgcmVzdWx0LnkgPSB4O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnggPSB4O1xuICAgICAgICAgICAgcmVzdWx0LnkgPSB5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIF9jb252ZXJ0TW91c2VUb0xvY2F0aW9uSW5WaWV3OiBmdW5jdGlvbiAoaW5fb3V0X3BvaW50LCByZWxhdGVkUG9zKSB7XG4gICAgICAgIHZhciB2aWV3cG9ydCA9IHRoaXMuX3ZpZXdwb3J0UmVjdCwgX3QgPSB0aGlzO1xuICAgICAgICBpbl9vdXRfcG9pbnQueCA9ICgoX3QuX2RldmljZVBpeGVsUmF0aW8gKiAoaW5fb3V0X3BvaW50LnggLSByZWxhdGVkUG9zLmxlZnQpKSAtIHZpZXdwb3J0LngpIC8gX3QuX3NjYWxlWDtcbiAgICAgICAgaW5fb3V0X3BvaW50LnkgPSAoX3QuX2RldmljZVBpeGVsUmF0aW8gKiAocmVsYXRlZFBvcy50b3AgKyByZWxhdGVkUG9zLmhlaWdodCAtIGluX291dF9wb2ludC55KSAtIHZpZXdwb3J0LnkpIC8gX3QuX3NjYWxlWTtcbiAgICB9LFxuXG4gICAgX2NvbnZlcnRQb2ludFdpdGhTY2FsZTogZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgIHZhciB2aWV3cG9ydCA9IHRoaXMuX3ZpZXdwb3J0UmVjdDtcbiAgICAgICAgcG9pbnQueCA9IChwb2ludC54IC0gdmlld3BvcnQueCkgLyB0aGlzLl9zY2FsZVg7XG4gICAgICAgIHBvaW50LnkgPSAocG9pbnQueSAtIHZpZXdwb3J0LnkpIC8gdGhpcy5fc2NhbGVZO1xuICAgIH0sXG5cbiAgICBfY29udmVydFRvdWNoZXNXaXRoU2NhbGU6IGZ1bmN0aW9uICh0b3VjaGVzKSB7XG4gICAgICAgIHZhciB2aWV3cG9ydCA9IHRoaXMuX3ZpZXdwb3J0UmVjdCwgc2NhbGVYID0gdGhpcy5fc2NhbGVYLCBzY2FsZVkgPSB0aGlzLl9zY2FsZVksXG4gICAgICAgICAgICBzZWxUb3VjaCwgc2VsUG9pbnQsIHNlbFByZVBvaW50O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNlbFRvdWNoID0gdG91Y2hlc1tpXTtcbiAgICAgICAgICAgIHNlbFBvaW50ID0gc2VsVG91Y2guX3BvaW50O1xuICAgICAgICAgICAgc2VsUHJlUG9pbnQgPSBzZWxUb3VjaC5fcHJldlBvaW50O1xuXG4gICAgICAgICAgICBzZWxQb2ludC54ID0gKHNlbFBvaW50LnggLSB2aWV3cG9ydC54KSAvIHNjYWxlWDtcbiAgICAgICAgICAgIHNlbFBvaW50LnkgPSAoc2VsUG9pbnQueSAtIHZpZXdwb3J0LnkpIC8gc2NhbGVZO1xuICAgICAgICAgICAgc2VsUHJlUG9pbnQueCA9IChzZWxQcmVQb2ludC54IC0gdmlld3BvcnQueCkgLyBzY2FsZVg7XG4gICAgICAgICAgICBzZWxQcmVQb2ludC55ID0gKHNlbFByZVBvaW50LnkgLSB2aWV3cG9ydC55KSAvIHNjYWxlWTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW5cbiAqIEVtaXQgd2hlbiBkZXNpZ24gcmVzb2x1dGlvbiBjaGFuZ2VkLlxuICogISN6aFxuICog5b2T6K6+6K6h5YiG6L6o546H5pS55Y+Y5pe25Y+R6YCB44CCXG4gKiBAZXZlbnQgZGVzaWduLXJlc29sdXRpb24tY2hhbmdlZFxuICovXG4gLyoqXG4gKiAhI2VuXG4gKiBFbWl0IHdoZW4gY2FudmFzIHJlc2l6ZS5cbiAqICEjemhcbiAqIOW9k+eUu+W4g+Wkp+Wwj+aUueWPmOaXtuWPkemAgeOAglxuICogQGV2ZW50IGNhbnZhcy1yZXNpemVcbiAqL1xuXG5cbi8qKlxuICogPHA+Y2MuZ2FtZS5jb250YWluZXJTdHJhdGVneSBjbGFzcyBpcyB0aGUgcm9vdCBzdHJhdGVneSBjbGFzcyBvZiBjb250YWluZXIncyBzY2FsZSBzdHJhdGVneSxcbiAqIGl0IGNvbnRyb2xzIHRoZSBiZWhhdmlvciBvZiBob3cgdG8gc2NhbGUgdGhlIGNjLmdhbWUuY29udGFpbmVyIGFuZCBjYy5nYW1lLmNhbnZhcyBvYmplY3Q8L3A+XG4gKlxuICogQGNsYXNzIENvbnRhaW5lclN0cmF0ZWd5XG4gKi9cbmNjLkNvbnRhaW5lclN0cmF0ZWd5ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6IFwiQ29udGFpbmVyU3RyYXRlZ3lcIixcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogTWFuaXB1bGF0aW9uIGJlZm9yZSBhcHBsaW5nIHRoZSBzdHJhdGVneVxuICAgICAqICEjemgg5Zyo5bqU55So562W55Wl5LmL5YmN55qE5pON5L2cXG4gICAgICogQG1ldGhvZCBwcmVBcHBseVxuICAgICAqIEBwYXJhbSB7Vmlld30gdmlldyAtIFRoZSB0YXJnZXQgdmlld1xuICAgICAqL1xuICAgIHByZUFwcGx5OiBmdW5jdGlvbiAodmlldykge1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogRnVuY3Rpb24gdG8gYXBwbHkgdGhpcyBzdHJhdGVneVxuICAgICAqICEjemgg562W55Wl5bqU55So5pa55rOVXG4gICAgICogQG1ldGhvZCBhcHBseVxuICAgICAqIEBwYXJhbSB7Vmlld30gdmlld1xuICAgICAqIEBwYXJhbSB7U2l6ZX0gZGVzaWduZWRSZXNvbHV0aW9uXG4gICAgICovXG4gICAgYXBwbHk6IGZ1bmN0aW9uICh2aWV3LCBkZXNpZ25lZFJlc29sdXRpb24pIHtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIE1hbmlwdWxhdGlvbiBhZnRlciBhcHBseWluZyB0aGUgc3RyYXRlZ3lcbiAgICAgKiAhI3poIOetlueVpeiwg+eUqOS5i+WQjueahOaTjeS9nFxuICAgICAqIEBtZXRob2QgcG9zdEFwcGx5XG4gICAgICogQHBhcmFtIHtWaWV3fSB2aWV3ICBUaGUgdGFyZ2V0IHZpZXdcbiAgICAgKi9cbiAgICBwb3N0QXBwbHk6IGZ1bmN0aW9uICh2aWV3KSB7XG5cbiAgICB9LFxuXG4gICAgX3NldHVwQ29udGFpbmVyOiBmdW5jdGlvbiAodmlldywgdywgaCkge1xuICAgICAgICB2YXIgbG9jQ2FudmFzID0gY2MuZ2FtZS5jYW52YXM7XG5cbiAgICAgICAgdGhpcy5fc2V0dXBTdHlsZSh2aWV3LCB3LCBoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFNldHVwIHBpeGVsIHJhdGlvIGZvciByZXRpbmEgZGlzcGxheVxuICAgICAgICB2YXIgZGV2aWNlUGl4ZWxSYXRpbyA9IHZpZXcuX2RldmljZVBpeGVsUmF0aW8gPSAxO1xuICAgICAgICBpZihDQ19KU0Ipe1xuICAgICAgICAgICAgLy8gdmlldy5pc1JldGluYUVuYWJsZWQgb25seSB3b3JrIG9uIHdlYi4gXG4gICAgICAgICAgICBkZXZpY2VQaXhlbFJhdGlvID0gdmlldy5fZGV2aWNlUGl4ZWxSYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICB9ZWxzZSBpZiAodmlldy5pc1JldGluYUVuYWJsZWQoKSkge1xuICAgICAgICAgICAgZGV2aWNlUGl4ZWxSYXRpbyA9IHZpZXcuX2RldmljZVBpeGVsUmF0aW8gPSBNYXRoLm1pbih2aWV3Ll9tYXhQaXhlbFJhdGlvLCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXR1cCBjYW52YXNcbiAgICAgICAgbG9jQ2FudmFzLndpZHRoID0gdyAqIGRldmljZVBpeGVsUmF0aW87XG4gICAgICAgIGxvY0NhbnZhcy5oZWlnaHQgPSBoICogZGV2aWNlUGl4ZWxSYXRpbztcbiAgICB9LFxuXG4gICAgX3NldHVwU3R5bGU6IGZ1bmN0aW9uICh2aWV3LCB3LCBoKSB7XG4gICAgICAgIGxldCBsb2NDYW52YXMgPSBjYy5nYW1lLmNhbnZhcztcbiAgICAgICAgbGV0IGxvY0NvbnRhaW5lciA9IGNjLmdhbWUuY29udGFpbmVyO1xuICAgICAgICBpZiAoY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS53aWR0aCA9ICh2aWV3Ll9pc1JvdGF0ZWQgPyBoIDogdykgKyAncHgnO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5oZWlnaHQgPSAodmlldy5faXNSb3RhdGVkID8gdyA6IGgpICsgJ3B4JztcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXR1cCBzdHlsZVxuICAgICAgICBsb2NDb250YWluZXIuc3R5bGUud2lkdGggPSBsb2NDYW52YXMuc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgICAgICAgbG9jQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGxvY0NhbnZhcy5zdHlsZS5oZWlnaHQgPSBoICsgJ3B4JztcbiAgICB9LFxuXG4gICAgX2ZpeENvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBBZGQgY29udGFpbmVyIHRvIGRvY3VtZW50IGJvZHlcbiAgICAgICAgZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUoY2MuZ2FtZS5jb250YWluZXIsIGRvY3VtZW50LmJvZHkuZmlyc3RDaGlsZCk7XG4gICAgICAgIC8vIFNldCBib2R5J3Mgd2lkdGggaGVpZ2h0IHRvIHdpbmRvdydzIHNpemUsIGFuZCBmb3JiaWQgb3ZlcmZsb3csIHNvIHRoYXQgZ2FtZSB3aWxsIGJlIGNlbnRlcmVkXG4gICAgICAgIHZhciBicyA9IGRvY3VtZW50LmJvZHkuc3R5bGU7XG4gICAgICAgIGJzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggKyBcInB4XCI7XG4gICAgICAgIGJzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCArIFwicHhcIjtcbiAgICAgICAgYnMub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgICAgICAvLyBCb2R5IHNpemUgc29sdXRpb24gZG9lc24ndCB3b3JrIG9uIGFsbCBtb2JpbGUgYnJvd3NlciBzbyB0aGlzIGlzIHRoZSBhbGV0ZXJuYXRpdmU6IGZpeGVkIGNvbnRhaW5lclxuICAgICAgICB2YXIgY29udFN0eWxlID0gY2MuZ2FtZS5jb250YWluZXIuc3R5bGU7XG4gICAgICAgIGNvbnRTdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgICAgICAgY29udFN0eWxlLmxlZnQgPSBjb250U3R5bGUudG9wID0gXCIwcHhcIjtcbiAgICAgICAgLy8gUmVwb3NpdGlvbiBib2R5XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcbiAgICB9XG59KTtcblxuLyoqXG4gKiA8cD5jYy5Db250ZW50U3RyYXRlZ3kgY2xhc3MgaXMgdGhlIHJvb3Qgc3RyYXRlZ3kgY2xhc3Mgb2YgY29udGVudCdzIHNjYWxlIHN0cmF0ZWd5LFxuICogaXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIGhvdyB0byBzY2FsZSB0aGUgc2NlbmUgYW5kIHNldHVwIHRoZSB2aWV3cG9ydCBmb3IgdGhlIGdhbWU8L3A+XG4gKlxuICogQGNsYXNzIENvbnRlbnRTdHJhdGVneVxuICovXG5jYy5Db250ZW50U3RyYXRlZ3kgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogXCJDb250ZW50U3RyYXRlZ3lcIixcblxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcmVzdWx0ID0ge1xuICAgICAgICAgICAgc2NhbGU6IFsxLCAxXSxcbiAgICAgICAgICAgIHZpZXdwb3J0OiBudWxsXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIF9idWlsZFJlc3VsdDogZnVuY3Rpb24gKGNvbnRhaW5lclcsIGNvbnRhaW5lckgsIGNvbnRlbnRXLCBjb250ZW50SCwgc2NhbGVYLCBzY2FsZVkpIHtcbiAgICAgICAgLy8gTWFrZXMgY29udGVudCBmaXQgYmV0dGVyIHRoZSBjYW52YXNcbiAgICAgICAgTWF0aC5hYnMoY29udGFpbmVyVyAtIGNvbnRlbnRXKSA8IDIgJiYgKGNvbnRlbnRXID0gY29udGFpbmVyVyk7XG4gICAgICAgIE1hdGguYWJzKGNvbnRhaW5lckggLSBjb250ZW50SCkgPCAyICYmIChjb250ZW50SCA9IGNvbnRhaW5lckgpO1xuXG4gICAgICAgIHZhciB2aWV3cG9ydCA9IGNjLnJlY3QoKGNvbnRhaW5lclcgLSBjb250ZW50VykgLyAyLCAoY29udGFpbmVySCAtIGNvbnRlbnRIKSAvIDIsIGNvbnRlbnRXLCBjb250ZW50SCk7XG5cbiAgICAgICAgLy8gVHJhbnNsYXRlIHRoZSBjb250ZW50XG4gICAgICAgIGlmIChjYy5nYW1lLnJlbmRlclR5cGUgPT09IGNjLmdhbWUuUkVOREVSX1RZUEVfQ0FOVkFTKXtcbiAgICAgICAgICAgIC8vVE9ETzogbW9kaWZ5IHNvbWV0aGluZyBmb3Igc2V0VHJhbnNmb3JtXG4gICAgICAgICAgICAvL2NjLmdhbWUuX3JlbmRlckNvbnRleHQudHJhbnNsYXRlKHZpZXdwb3J0LngsIHZpZXdwb3J0LnkgKyBjb250ZW50SCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZXN1bHQuc2NhbGUgPSBbc2NhbGVYLCBzY2FsZVldO1xuICAgICAgICB0aGlzLl9yZXN1bHQudmlld3BvcnQgPSB2aWV3cG9ydDtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3VsdDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIE1hbmlwdWxhdGlvbiBiZWZvcmUgYXBwbHlpbmcgdGhlIHN0cmF0ZWd5XG4gICAgICogISN6aCDnrZbnlaXlupTnlKjliY3nmoTmk43kvZxcbiAgICAgKiBAbWV0aG9kIHByZUFwcGx5XG4gICAgICogQHBhcmFtIHtWaWV3fSB2aWV3IC0gVGhlIHRhcmdldCB2aWV3XG4gICAgICovXG4gICAgcHJlQXBwbHk6IGZ1bmN0aW9uICh2aWV3KSB7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gRnVuY3Rpb24gdG8gYXBwbHkgdGhpcyBzdHJhdGVneVxuICAgICAqIFRoZSByZXR1cm4gdmFsdWUgaXMge3NjYWxlOiBbc2NhbGVYLCBzY2FsZVldLCB2aWV3cG9ydDoge2NjLlJlY3R9fSxcbiAgICAgKiBUaGUgdGFyZ2V0IHZpZXcgY2FuIHRoZW4gYXBwbHkgdGhlc2UgdmFsdWUgdG8gaXRzZWxmLCBpdCdzIHByZWZlcnJlZCBub3QgdG8gbW9kaWZ5IGRpcmVjdGx5IGl0cyBwcml2YXRlIHZhcmlhYmxlc1xuICAgICAqICEjemgg6LCD55So562W55Wl5pa55rOVXG4gICAgICogQG1ldGhvZCBhcHBseVxuICAgICAqIEBwYXJhbSB7Vmlld30gdmlld1xuICAgICAqIEBwYXJhbSB7U2l6ZX0gZGVzaWduZWRSZXNvbHV0aW9uXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBzY2FsZUFuZFZpZXdwb3J0UmVjdFxuICAgICAqL1xuICAgIGFwcGx5OiBmdW5jdGlvbiAodmlldywgZGVzaWduZWRSZXNvbHV0aW9uKSB7XG4gICAgICAgIHJldHVybiB7XCJzY2FsZVwiOiBbMSwgMV19O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogTWFuaXB1bGF0aW9uIGFmdGVyIGFwcGx5aW5nIHRoZSBzdHJhdGVneVxuICAgICAqICEjemgg562W55Wl6LCD55So5LmL5ZCO55qE5pON5L2cXG4gICAgICogQG1ldGhvZCBwb3N0QXBwbHlcbiAgICAgKiBAcGFyYW0ge1ZpZXd9IHZpZXcgLSBUaGUgdGFyZ2V0IHZpZXdcbiAgICAgKi9cbiAgICBwb3N0QXBwbHk6IGZ1bmN0aW9uICh2aWV3KSB7XG4gICAgfVxufSk7XG5cbihmdW5jdGlvbiAoKSB7XG5cbi8vIENvbnRhaW5lciBzY2FsZSBzdHJhdGVneXNcbiAgICAvKipcbiAgICAgKiBAY2xhc3MgRXF1YWxUb0ZyYW1lXG4gICAgICogQGV4dGVuZHMgQ29udGFpbmVyU3RyYXRlZ3lcbiAgICAgKi9cbiAgICB2YXIgRXF1YWxUb0ZyYW1lID0gY2MuQ2xhc3Moe1xuICAgICAgICBuYW1lOiBcIkVxdWFsVG9GcmFtZVwiLFxuICAgICAgICBleHRlbmRzOiBjYy5Db250YWluZXJTdHJhdGVneSxcbiAgICAgICAgYXBwbHk6IGZ1bmN0aW9uICh2aWV3KSB7XG4gICAgICAgICAgICB2YXIgZnJhbWVIID0gdmlldy5fZnJhbWVTaXplLmhlaWdodCwgY29udGFpbmVyU3R5bGUgPSBjYy5nYW1lLmNvbnRhaW5lci5zdHlsZTtcbiAgICAgICAgICAgIHRoaXMuX3NldHVwQ29udGFpbmVyKHZpZXcsIHZpZXcuX2ZyYW1lU2l6ZS53aWR0aCwgdmlldy5fZnJhbWVTaXplLmhlaWdodCk7XG4gICAgICAgICAgICAvLyBTZXR1cCBjb250YWluZXIncyBtYXJnaW4gYW5kIHBhZGRpbmdcbiAgICAgICAgICAgIGlmICh2aWV3Ll9pc1JvdGF0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJTdHlsZS5tYXJnaW4gPSAnMCAwIDAgJyArIGZyYW1lSCArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJTdHlsZS5tYXJnaW4gPSAnMHB4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRhaW5lclN0eWxlLnBhZGRpbmcgPSBcIjBweFwiO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBAY2xhc3MgUHJvcG9ydGlvbmFsVG9GcmFtZVxuICAgICAqIEBleHRlbmRzIENvbnRhaW5lclN0cmF0ZWd5XG4gICAgICovXG4gICAgdmFyIFByb3BvcnRpb25hbFRvRnJhbWUgPSBjYy5DbGFzcyh7XG4gICAgICAgIG5hbWU6IFwiUHJvcG9ydGlvbmFsVG9GcmFtZVwiLFxuICAgICAgICBleHRlbmRzOiBjYy5Db250YWluZXJTdHJhdGVneSxcbiAgICAgICAgYXBwbHk6IGZ1bmN0aW9uICh2aWV3LCBkZXNpZ25lZFJlc29sdXRpb24pIHtcbiAgICAgICAgICAgIHZhciBmcmFtZVcgPSB2aWV3Ll9mcmFtZVNpemUud2lkdGgsIGZyYW1lSCA9IHZpZXcuX2ZyYW1lU2l6ZS5oZWlnaHQsIGNvbnRhaW5lclN0eWxlID0gY2MuZ2FtZS5jb250YWluZXIuc3R5bGUsXG4gICAgICAgICAgICAgICAgZGVzaWduVyA9IGRlc2lnbmVkUmVzb2x1dGlvbi53aWR0aCwgZGVzaWduSCA9IGRlc2lnbmVkUmVzb2x1dGlvbi5oZWlnaHQsXG4gICAgICAgICAgICAgICAgc2NhbGVYID0gZnJhbWVXIC8gZGVzaWduVywgc2NhbGVZID0gZnJhbWVIIC8gZGVzaWduSCxcbiAgICAgICAgICAgICAgICBjb250YWluZXJXLCBjb250YWluZXJIO1xuXG4gICAgICAgICAgICBzY2FsZVggPCBzY2FsZVkgPyAoY29udGFpbmVyVyA9IGZyYW1lVywgY29udGFpbmVySCA9IGRlc2lnbkggKiBzY2FsZVgpIDogKGNvbnRhaW5lclcgPSBkZXNpZ25XICogc2NhbGVZLCBjb250YWluZXJIID0gZnJhbWVIKTtcblxuICAgICAgICAgICAgLy8gQWRqdXN0IGNvbnRhaW5lciBzaXplIHdpdGggaW50ZWdlciB2YWx1ZVxuICAgICAgICAgICAgdmFyIG9mZnggPSBNYXRoLnJvdW5kKChmcmFtZVcgLSBjb250YWluZXJXKSAvIDIpO1xuICAgICAgICAgICAgdmFyIG9mZnkgPSBNYXRoLnJvdW5kKChmcmFtZUggLSBjb250YWluZXJIKSAvIDIpO1xuICAgICAgICAgICAgY29udGFpbmVyVyA9IGZyYW1lVyAtIDIgKiBvZmZ4O1xuICAgICAgICAgICAgY29udGFpbmVySCA9IGZyYW1lSCAtIDIgKiBvZmZ5O1xuXG4gICAgICAgICAgICB0aGlzLl9zZXR1cENvbnRhaW5lcih2aWV3LCBjb250YWluZXJXLCBjb250YWluZXJIKTtcbiAgICAgICAgICAgIGlmICghQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgLy8gU2V0dXAgY29udGFpbmVyJ3MgbWFyZ2luIGFuZCBwYWRkaW5nXG4gICAgICAgICAgICAgICAgaWYgKHZpZXcuX2lzUm90YXRlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJTdHlsZS5tYXJnaW4gPSAnMCAwIDAgJyArIGZyYW1lSCArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJTdHlsZS5tYXJnaW4gPSAnMHB4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGFpbmVyU3R5bGUucGFkZGluZ0xlZnQgPSBvZmZ4ICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lclN0eWxlLnBhZGRpbmdSaWdodCA9IG9mZnggKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyU3R5bGUucGFkZGluZ1RvcCA9IG9mZnkgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyU3R5bGUucGFkZGluZ0JvdHRvbSA9IG9mZnkgKyBcInB4XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEBjbGFzcyBFcXVhbFRvV2luZG93XG4gICAgICogQGV4dGVuZHMgRXF1YWxUb0ZyYW1lXG4gICAgICovXG4gICAgdmFyIEVxdWFsVG9XaW5kb3cgPSBjYy5DbGFzcyh7XG4gICAgICAgIG5hbWU6IFwiRXF1YWxUb1dpbmRvd1wiLFxuICAgICAgICBleHRlbmRzOiBFcXVhbFRvRnJhbWUsXG4gICAgICAgIHByZUFwcGx5OiBmdW5jdGlvbiAodmlldykge1xuICAgICAgICAgICAgdGhpcy5fc3VwZXIodmlldyk7XG4gICAgICAgICAgICBjYy5nYW1lLmZyYW1lID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICB9LFxuXG4gICAgICAgIGFwcGx5OiBmdW5jdGlvbiAodmlldykge1xuICAgICAgICAgICAgdGhpcy5fc3VwZXIodmlldyk7XG4gICAgICAgICAgICB0aGlzLl9maXhDb250YWluZXIoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQGNsYXNzIFByb3BvcnRpb25hbFRvV2luZG93XG4gICAgICogQGV4dGVuZHMgUHJvcG9ydGlvbmFsVG9GcmFtZVxuICAgICAqL1xuICAgIHZhciBQcm9wb3J0aW9uYWxUb1dpbmRvdyA9IGNjLkNsYXNzKHtcbiAgICAgICAgbmFtZTogXCJQcm9wb3J0aW9uYWxUb1dpbmRvd1wiLFxuICAgICAgICBleHRlbmRzOiBQcm9wb3J0aW9uYWxUb0ZyYW1lLFxuICAgICAgICBwcmVBcHBseTogZnVuY3Rpb24gKHZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1cGVyKHZpZXcpO1xuICAgICAgICAgICAgY2MuZ2FtZS5mcmFtZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgfSxcblxuICAgICAgICBhcHBseTogZnVuY3Rpb24gKHZpZXcsIGRlc2lnbmVkUmVzb2x1dGlvbikge1xuICAgICAgICAgICAgdGhpcy5fc3VwZXIodmlldywgZGVzaWduZWRSZXNvbHV0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuX2ZpeENvbnRhaW5lcigpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBAY2xhc3MgT3JpZ2luYWxDb250YWluZXJcbiAgICAgKiBAZXh0ZW5kcyBDb250YWluZXJTdHJhdGVneVxuICAgICAqL1xuICAgIHZhciBPcmlnaW5hbENvbnRhaW5lciA9IGNjLkNsYXNzKHtcbiAgICAgICAgbmFtZTogXCJPcmlnaW5hbENvbnRhaW5lclwiLFxuICAgICAgICBleHRlbmRzOiBjYy5Db250YWluZXJTdHJhdGVneSxcbiAgICAgICAgYXBwbHk6IGZ1bmN0aW9uICh2aWV3KSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR1cENvbnRhaW5lcih2aWV3LCBjYy5nYW1lLmNhbnZhcy53aWR0aCwgY2MuZ2FtZS5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gbmVlZCB0byBhZGFwdCBwcm90b3R5cGUgYmVmb3JlIGluc3RhbnRpYXRpbmdcbiAgICBsZXQgX2dsb2JhbCA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93O1xuICAgIGxldCBnbG9iYWxBZGFwdGVyID0gX2dsb2JhbC5fX2dsb2JhbEFkYXB0ZXI7XG4gICAgaWYgKGdsb2JhbEFkYXB0ZXIpIHtcbiAgICAgICAgaWYgKGdsb2JhbEFkYXB0ZXIuYWRhcHRDb250YWluZXJTdHJhdGVneSkge1xuICAgICAgICAgICAgZ2xvYmFsQWRhcHRlci5hZGFwdENvbnRhaW5lclN0cmF0ZWd5KGNjLkNvbnRhaW5lclN0cmF0ZWd5LnByb3RvdHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdsb2JhbEFkYXB0ZXIuYWRhcHRWaWV3KSB7XG4gICAgICAgICAgICBnbG9iYWxBZGFwdGVyLmFkYXB0VmlldyhWaWV3LnByb3RvdHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbi8vICNOT1QgU1RBQkxFIG9uIEFuZHJvaWQjIEFsaWFzOiBTdHJhdGVneSB0aGF0IG1ha2VzIHRoZSBjb250YWluZXIncyBzaXplIGVxdWFscyB0byB0aGUgd2luZG93J3Mgc2l6ZVxuLy8gICAgY2MuQ29udGFpbmVyU3RyYXRlZ3kuRVFVQUxfVE9fV0lORE9XID0gbmV3IEVxdWFsVG9XaW5kb3coKTtcbi8vICNOT1QgU1RBQkxFIG9uIEFuZHJvaWQjIEFsaWFzOiBTdHJhdGVneSB0aGF0IHNjYWxlIHByb3BvcnRpb25hbGx5IHRoZSBjb250YWluZXIncyBzaXplIHRvIHdpbmRvdydzIHNpemVcbi8vICAgIGNjLkNvbnRhaW5lclN0cmF0ZWd5LlBST1BPUlRJT05fVE9fV0lORE9XID0gbmV3IFByb3BvcnRpb25hbFRvV2luZG93KCk7XG4vLyBBbGlhczogU3RyYXRlZ3kgdGhhdCBtYWtlcyB0aGUgY29udGFpbmVyJ3Mgc2l6ZSBlcXVhbHMgdG8gdGhlIGZyYW1lJ3Mgc2l6ZVxuICAgIGNjLkNvbnRhaW5lclN0cmF0ZWd5LkVRVUFMX1RPX0ZSQU1FID0gbmV3IEVxdWFsVG9GcmFtZSgpO1xuLy8gQWxpYXM6IFN0cmF0ZWd5IHRoYXQgc2NhbGUgcHJvcG9ydGlvbmFsbHkgdGhlIGNvbnRhaW5lcidzIHNpemUgdG8gZnJhbWUncyBzaXplXG4gICAgY2MuQ29udGFpbmVyU3RyYXRlZ3kuUFJPUE9SVElPTl9UT19GUkFNRSA9IG5ldyBQcm9wb3J0aW9uYWxUb0ZyYW1lKCk7XG4vLyBBbGlhczogU3RyYXRlZ3kgdGhhdCBrZWVwcyB0aGUgb3JpZ2luYWwgY29udGFpbmVyJ3Mgc2l6ZVxuICAgIGNjLkNvbnRhaW5lclN0cmF0ZWd5Lk9SSUdJTkFMX0NPTlRBSU5FUiA9IG5ldyBPcmlnaW5hbENvbnRhaW5lcigpO1xuXG4vLyBDb250ZW50IHNjYWxlIHN0cmF0ZWd5c1xuICAgIHZhciBFeGFjdEZpdCA9IGNjLkNsYXNzKHtcbiAgICAgICAgbmFtZTogXCJFeGFjdEZpdFwiLFxuICAgICAgICBleHRlbmRzOiBjYy5Db250ZW50U3RyYXRlZ3ksXG4gICAgICAgIGFwcGx5OiBmdW5jdGlvbiAodmlldywgZGVzaWduZWRSZXNvbHV0aW9uKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyVyA9IGNjLmdhbWUuY2FudmFzLndpZHRoLCBjb250YWluZXJIID0gY2MuZ2FtZS5jYW52YXMuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHNjYWxlWCA9IGNvbnRhaW5lclcgLyBkZXNpZ25lZFJlc29sdXRpb24ud2lkdGgsIHNjYWxlWSA9IGNvbnRhaW5lckggLyBkZXNpZ25lZFJlc29sdXRpb24uaGVpZ2h0O1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYnVpbGRSZXN1bHQoY29udGFpbmVyVywgY29udGFpbmVySCwgY29udGFpbmVyVywgY29udGFpbmVySCwgc2NhbGVYLCBzY2FsZVkpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgU2hvd0FsbCA9IGNjLkNsYXNzKHtcbiAgICAgICAgbmFtZTogXCJTaG93QWxsXCIsXG4gICAgICAgIGV4dGVuZHM6IGNjLkNvbnRlbnRTdHJhdGVneSxcbiAgICAgICAgYXBwbHk6IGZ1bmN0aW9uICh2aWV3LCBkZXNpZ25lZFJlc29sdXRpb24pIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXJXID0gY2MuZ2FtZS5jYW52YXMud2lkdGgsIGNvbnRhaW5lckggPSBjYy5nYW1lLmNhbnZhcy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgZGVzaWduVyA9IGRlc2lnbmVkUmVzb2x1dGlvbi53aWR0aCwgZGVzaWduSCA9IGRlc2lnbmVkUmVzb2x1dGlvbi5oZWlnaHQsXG4gICAgICAgICAgICAgICAgc2NhbGVYID0gY29udGFpbmVyVyAvIGRlc2lnblcsIHNjYWxlWSA9IGNvbnRhaW5lckggLyBkZXNpZ25ILCBzY2FsZSA9IDAsXG4gICAgICAgICAgICAgICAgY29udGVudFcsIGNvbnRlbnRIO1xuXG4gICAgICAgICAgICBzY2FsZVggPCBzY2FsZVkgPyAoc2NhbGUgPSBzY2FsZVgsIGNvbnRlbnRXID0gY29udGFpbmVyVywgY29udGVudEggPSBkZXNpZ25IICogc2NhbGUpXG4gICAgICAgICAgICAgICAgOiAoc2NhbGUgPSBzY2FsZVksIGNvbnRlbnRXID0gZGVzaWduVyAqIHNjYWxlLCBjb250ZW50SCA9IGNvbnRhaW5lckgpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYnVpbGRSZXN1bHQoY29udGFpbmVyVywgY29udGFpbmVySCwgY29udGVudFcsIGNvbnRlbnRILCBzY2FsZSwgc2NhbGUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgTm9Cb3JkZXIgPSBjYy5DbGFzcyh7XG4gICAgICAgIG5hbWU6IFwiTm9Cb3JkZXJcIixcbiAgICAgICAgZXh0ZW5kczogY2MuQ29udGVudFN0cmF0ZWd5LFxuICAgICAgICBhcHBseTogZnVuY3Rpb24gKHZpZXcsIGRlc2lnbmVkUmVzb2x1dGlvbikge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lclcgPSBjYy5nYW1lLmNhbnZhcy53aWR0aCwgY29udGFpbmVySCA9IGNjLmdhbWUuY2FudmFzLmhlaWdodCxcbiAgICAgICAgICAgICAgICBkZXNpZ25XID0gZGVzaWduZWRSZXNvbHV0aW9uLndpZHRoLCBkZXNpZ25IID0gZGVzaWduZWRSZXNvbHV0aW9uLmhlaWdodCxcbiAgICAgICAgICAgICAgICBzY2FsZVggPSBjb250YWluZXJXIC8gZGVzaWduVywgc2NhbGVZID0gY29udGFpbmVySCAvIGRlc2lnbkgsIHNjYWxlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRXLCBjb250ZW50SDtcblxuICAgICAgICAgICAgc2NhbGVYIDwgc2NhbGVZID8gKHNjYWxlID0gc2NhbGVZLCBjb250ZW50VyA9IGRlc2lnblcgKiBzY2FsZSwgY29udGVudEggPSBjb250YWluZXJIKVxuICAgICAgICAgICAgICAgIDogKHNjYWxlID0gc2NhbGVYLCBjb250ZW50VyA9IGNvbnRhaW5lclcsIGNvbnRlbnRIID0gZGVzaWduSCAqIHNjYWxlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1aWxkUmVzdWx0KGNvbnRhaW5lclcsIGNvbnRhaW5lckgsIGNvbnRlbnRXLCBjb250ZW50SCwgc2NhbGUsIHNjYWxlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIEZpeGVkSGVpZ2h0ID0gY2MuQ2xhc3Moe1xuICAgICAgICBuYW1lOiBcIkZpeGVkSGVpZ2h0XCIsXG4gICAgICAgIGV4dGVuZHM6IGNjLkNvbnRlbnRTdHJhdGVneSxcbiAgICAgICAgYXBwbHk6IGZ1bmN0aW9uICh2aWV3LCBkZXNpZ25lZFJlc29sdXRpb24pIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXJXID0gY2MuZ2FtZS5jYW52YXMud2lkdGgsIGNvbnRhaW5lckggPSBjYy5nYW1lLmNhbnZhcy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgZGVzaWduSCA9IGRlc2lnbmVkUmVzb2x1dGlvbi5oZWlnaHQsIHNjYWxlID0gY29udGFpbmVySCAvIGRlc2lnbkgsXG4gICAgICAgICAgICAgICAgY29udGVudFcgPSBjb250YWluZXJXLCBjb250ZW50SCA9IGNvbnRhaW5lckg7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9idWlsZFJlc3VsdChjb250YWluZXJXLCBjb250YWluZXJILCBjb250ZW50VywgY29udGVudEgsIHNjYWxlLCBzY2FsZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBGaXhlZFdpZHRoID0gY2MuQ2xhc3Moe1xuICAgICAgICBuYW1lOiBcIkZpeGVkV2lkdGhcIixcbiAgICAgICAgZXh0ZW5kczogY2MuQ29udGVudFN0cmF0ZWd5LFxuICAgICAgICBhcHBseTogZnVuY3Rpb24gKHZpZXcsIGRlc2lnbmVkUmVzb2x1dGlvbikge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lclcgPSBjYy5nYW1lLmNhbnZhcy53aWR0aCwgY29udGFpbmVySCA9IGNjLmdhbWUuY2FudmFzLmhlaWdodCxcbiAgICAgICAgICAgICAgICBkZXNpZ25XID0gZGVzaWduZWRSZXNvbHV0aW9uLndpZHRoLCBzY2FsZSA9IGNvbnRhaW5lclcgLyBkZXNpZ25XLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRXID0gY29udGFpbmVyVywgY29udGVudEggPSBjb250YWluZXJIO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYnVpbGRSZXN1bHQoY29udGFpbmVyVywgY29udGFpbmVySCwgY29udGVudFcsIGNvbnRlbnRILCBzY2FsZSwgc2NhbGUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbi8vIEFsaWFzOiBTdHJhdGVneSB0byBzY2FsZSB0aGUgY29udGVudCdzIHNpemUgdG8gY29udGFpbmVyJ3Mgc2l6ZSwgbm9uIHByb3BvcnRpb25hbFxuICAgIGNjLkNvbnRlbnRTdHJhdGVneS5FWEFDVF9GSVQgPSBuZXcgRXhhY3RGaXQoKTtcbi8vIEFsaWFzOiBTdHJhdGVneSB0byBzY2FsZSB0aGUgY29udGVudCdzIHNpemUgcHJvcG9ydGlvbmFsbHkgdG8gbWF4aW11bSBzaXplIGFuZCBrZWVwcyB0aGUgd2hvbGUgY29udGVudCBhcmVhIHRvIGJlIHZpc2libGVcbiAgICBjYy5Db250ZW50U3RyYXRlZ3kuU0hPV19BTEwgPSBuZXcgU2hvd0FsbCgpO1xuLy8gQWxpYXM6IFN0cmF0ZWd5IHRvIHNjYWxlIHRoZSBjb250ZW50J3Mgc2l6ZSBwcm9wb3J0aW9uYWxseSB0byBmaWxsIHRoZSB3aG9sZSBjb250YWluZXIgYXJlYVxuICAgIGNjLkNvbnRlbnRTdHJhdGVneS5OT19CT1JERVIgPSBuZXcgTm9Cb3JkZXIoKTtcbi8vIEFsaWFzOiBTdHJhdGVneSB0byBzY2FsZSB0aGUgY29udGVudCdzIGhlaWdodCB0byBjb250YWluZXIncyBoZWlnaHQgYW5kIHByb3BvcnRpb25hbGx5IHNjYWxlIGl0cyB3aWR0aFxuICAgIGNjLkNvbnRlbnRTdHJhdGVneS5GSVhFRF9IRUlHSFQgPSBuZXcgRml4ZWRIZWlnaHQoKTtcbi8vIEFsaWFzOiBTdHJhdGVneSB0byBzY2FsZSB0aGUgY29udGVudCdzIHdpZHRoIHRvIGNvbnRhaW5lcidzIHdpZHRoIGFuZCBwcm9wb3J0aW9uYWxseSBzY2FsZSBpdHMgaGVpZ2h0XG4gICAgY2MuQ29udGVudFN0cmF0ZWd5LkZJWEVEX1dJRFRIID0gbmV3IEZpeGVkV2lkdGgoKTtcblxufSkoKTtcblxuLyoqXG4gKiA8cD5jYy5SZXNvbHV0aW9uUG9saWN5IGNsYXNzIGlzIHRoZSByb290IHN0cmF0ZWd5IGNsYXNzIG9mIHNjYWxlIHN0cmF0ZWd5LFxuICogaXRzIG1haW4gdGFzayBpcyB0byBtYWludGFpbiB0aGUgY29tcGF0aWJpbGl0eSB3aXRoIENvY29zMmQteDwvcD5cbiAqXG4gKiBAY2xhc3MgUmVzb2x1dGlvblBvbGljeVxuICovXG4vKipcbiAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7Q29udGFpbmVyU3RyYXRlZ3l9IGNvbnRhaW5lclN0ZyBUaGUgY29udGFpbmVyIHN0cmF0ZWd5XG4gKiBAcGFyYW0ge0NvbnRlbnRTdHJhdGVneX0gY29udGVudFN0ZyBUaGUgY29udGVudCBzdHJhdGVneVxuICovXG5jYy5SZXNvbHV0aW9uUG9saWN5ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6IFwiY2MuUmVzb2x1dGlvblBvbGljeVwiLFxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yIG9mIGNjLlJlc29sdXRpb25Qb2xpY3lcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lclN0cmF0ZWd5fSBjb250YWluZXJTdGdcbiAgICAgKiBAcGFyYW0ge0NvbnRlbnRTdHJhdGVneX0gY29udGVudFN0Z1xuICAgICAqL1xuICAgIGN0b3I6IGZ1bmN0aW9uIChjb250YWluZXJTdGcsIGNvbnRlbnRTdGcpIHtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyU3RyYXRlZ3kgPSBudWxsO1xuICAgICAgICB0aGlzLl9jb250ZW50U3RyYXRlZ3kgPSBudWxsO1xuICAgICAgICB0aGlzLnNldENvbnRhaW5lclN0cmF0ZWd5KGNvbnRhaW5lclN0Zyk7XG4gICAgICAgIHRoaXMuc2V0Q29udGVudFN0cmF0ZWd5KGNvbnRlbnRTdGcpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIE1hbmlwdWxhdGlvbiBiZWZvcmUgYXBwbHlpbmcgdGhlIHJlc29sdXRpb24gcG9saWN5XG4gICAgICogISN6aCDnrZbnlaXlupTnlKjliY3nmoTmk43kvZxcbiAgICAgKiBAbWV0aG9kIHByZUFwcGx5XG4gICAgICogQHBhcmFtIHtWaWV3fSB2aWV3IFRoZSB0YXJnZXQgdmlld1xuICAgICAqL1xuICAgIHByZUFwcGx5OiBmdW5jdGlvbiAodmlldykge1xuICAgICAgICB0aGlzLl9jb250YWluZXJTdHJhdGVneS5wcmVBcHBseSh2aWV3KTtcbiAgICAgICAgdGhpcy5fY29udGVudFN0cmF0ZWd5LnByZUFwcGx5KHZpZXcpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEZ1bmN0aW9uIHRvIGFwcGx5IHRoaXMgcmVzb2x1dGlvbiBwb2xpY3lcbiAgICAgKiBUaGUgcmV0dXJuIHZhbHVlIGlzIHtzY2FsZTogW3NjYWxlWCwgc2NhbGVZXSwgdmlld3BvcnQ6IHtjYy5SZWN0fX0sXG4gICAgICogVGhlIHRhcmdldCB2aWV3IGNhbiB0aGVuIGFwcGx5IHRoZXNlIHZhbHVlIHRvIGl0c2VsZiwgaXQncyBwcmVmZXJyZWQgbm90IHRvIG1vZGlmeSBkaXJlY3RseSBpdHMgcHJpdmF0ZSB2YXJpYWJsZXNcbiAgICAgKiAhI3poIOiwg+eUqOetlueVpeaWueazlVxuICAgICAqIEBtZXRob2QgYXBwbHlcbiAgICAgKiBAcGFyYW0ge1ZpZXd9IHZpZXcgLSBUaGUgdGFyZ2V0IHZpZXdcbiAgICAgKiBAcGFyYW0ge1NpemV9IGRlc2lnbmVkUmVzb2x1dGlvbiAtIFRoZSB1c2VyIGRlZmluZWQgZGVzaWduIHJlc29sdXRpb25cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCBjb250YWlucyB0aGUgc2NhbGUgWC9ZIHZhbHVlcyBhbmQgdGhlIHZpZXdwb3J0IHJlY3RcbiAgICAgKi9cbiAgICBhcHBseTogZnVuY3Rpb24gKHZpZXcsIGRlc2lnbmVkUmVzb2x1dGlvbikge1xuICAgICAgICB0aGlzLl9jb250YWluZXJTdHJhdGVneS5hcHBseSh2aWV3LCBkZXNpZ25lZFJlc29sdXRpb24pO1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudFN0cmF0ZWd5LmFwcGx5KHZpZXcsIGRlc2lnbmVkUmVzb2x1dGlvbik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gTWFuaXB1bGF0aW9uIGFmdGVyIGFwcHlsaW5nIHRoZSBzdHJhdGVneVxuICAgICAqICEjemgg562W55Wl5bqU55So5LmL5ZCO55qE5pON5L2cXG4gICAgICogQG1ldGhvZCBwb3N0QXBwbHlcbiAgICAgKiBAcGFyYW0ge1ZpZXd9IHZpZXcgLSBUaGUgdGFyZ2V0IHZpZXdcbiAgICAgKi9cbiAgICBwb3N0QXBwbHk6IGZ1bmN0aW9uICh2aWV3KSB7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lclN0cmF0ZWd5LnBvc3RBcHBseSh2aWV3KTtcbiAgICAgICAgdGhpcy5fY29udGVudFN0cmF0ZWd5LnBvc3RBcHBseSh2aWV3KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldHVwIHRoZSBjb250YWluZXIncyBzY2FsZSBzdHJhdGVneVxuICAgICAqICEjemgg6K6+572u5a655Zmo55qE6YCC6YWN562W55WlXG4gICAgICogQG1ldGhvZCBzZXRDb250YWluZXJTdHJhdGVneVxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyU3RyYXRlZ3l9IGNvbnRhaW5lclN0Z1xuICAgICAqL1xuICAgIHNldENvbnRhaW5lclN0cmF0ZWd5OiBmdW5jdGlvbiAoY29udGFpbmVyU3RnKSB7XG4gICAgICAgIGlmIChjb250YWluZXJTdGcgaW5zdGFuY2VvZiBjYy5Db250YWluZXJTdHJhdGVneSlcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lclN0cmF0ZWd5ID0gY29udGFpbmVyU3RnO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU2V0dXAgdGhlIGNvbnRlbnQncyBzY2FsZSBzdHJhdGVneVxuICAgICAqICEjemgg6K6+572u5YaF5a6555qE6YCC6YWN562W55WlXG4gICAgICogQG1ldGhvZCBzZXRDb250ZW50U3RyYXRlZ3lcbiAgICAgKiBAcGFyYW0ge0NvbnRlbnRTdHJhdGVneX0gY29udGVudFN0Z1xuICAgICAqL1xuICAgIHNldENvbnRlbnRTdHJhdGVneTogZnVuY3Rpb24gKGNvbnRlbnRTdGcpIHtcbiAgICAgICAgaWYgKGNvbnRlbnRTdGcgaW5zdGFuY2VvZiBjYy5Db250ZW50U3RyYXRlZ3kpXG4gICAgICAgICAgICB0aGlzLl9jb250ZW50U3RyYXRlZ3kgPSBjb250ZW50U3RnO1xuICAgIH1cbn0pO1xuXG5qcy5nZXQoY2MuUmVzb2x1dGlvblBvbGljeS5wcm90b3R5cGUsIFwiY2FudmFzU2l6ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNjLnYyKGNjLmdhbWUuY2FudmFzLndpZHRoLCBjYy5nYW1lLmNhbnZhcy5oZWlnaHQpO1xufSk7XG5cbi8qKlxuICogVGhlIGVudGlyZSBhcHBsaWNhdGlvbiBpcyB2aXNpYmxlIGluIHRoZSBzcGVjaWZpZWQgYXJlYSB3aXRob3V0IHRyeWluZyB0byBwcmVzZXJ2ZSB0aGUgb3JpZ2luYWwgYXNwZWN0IHJhdGlvLjxici8+XG4gKiBEaXN0b3J0aW9uIGNhbiBvY2N1ciwgYW5kIHRoZSBhcHBsaWNhdGlvbiBtYXkgYXBwZWFyIHN0cmV0Y2hlZCBvciBjb21wcmVzc2VkLlxuICogQHByb3BlcnR5IHtOdW1iZXJ9IEVYQUNUX0ZJVFxuICogQHJlYWRvbmx5XG4gKiBAc3RhdGljXG4gKi9cbmNjLlJlc29sdXRpb25Qb2xpY3kuRVhBQ1RfRklUID0gMDtcblxuLyoqXG4gKiBUaGUgZW50aXJlIGFwcGxpY2F0aW9uIGZpbGxzIHRoZSBzcGVjaWZpZWQgYXJlYSwgd2l0aG91dCBkaXN0b3J0aW9uIGJ1dCBwb3NzaWJseSB3aXRoIHNvbWUgY3JvcHBpbmcsPGJyLz5cbiAqIHdoaWxlIG1haW50YWluaW5nIHRoZSBvcmlnaW5hbCBhc3BlY3QgcmF0aW8gb2YgdGhlIGFwcGxpY2F0aW9uLlxuICogQHByb3BlcnR5IHtOdW1iZXJ9IE5PX0JPUkRFUlxuICogQHJlYWRvbmx5XG4gKiBAc3RhdGljXG4gKi9cbmNjLlJlc29sdXRpb25Qb2xpY3kuTk9fQk9SREVSID0gMTtcblxuLyoqXG4gKiBUaGUgZW50aXJlIGFwcGxpY2F0aW9uIGlzIHZpc2libGUgaW4gdGhlIHNwZWNpZmllZCBhcmVhIHdpdGhvdXQgZGlzdG9ydGlvbiB3aGlsZSBtYWludGFpbmluZyB0aGUgb3JpZ2luYWw8YnIvPlxuICogYXNwZWN0IHJhdGlvIG9mIHRoZSBhcHBsaWNhdGlvbi4gQm9yZGVycyBjYW4gYXBwZWFyIG9uIHR3byBzaWRlcyBvZiB0aGUgYXBwbGljYXRpb24uXG4gKiBAcHJvcGVydHkge051bWJlcn0gU0hPV19BTExcbiAqIEByZWFkb25seVxuICogQHN0YXRpY1xuICovXG5jYy5SZXNvbHV0aW9uUG9saWN5LlNIT1dfQUxMID0gMjtcblxuLyoqXG4gKiBUaGUgYXBwbGljYXRpb24gdGFrZXMgdGhlIGhlaWdodCBvZiB0aGUgZGVzaWduIHJlc29sdXRpb24gc2l6ZSBhbmQgbW9kaWZpZXMgdGhlIHdpZHRoIG9mIHRoZSBpbnRlcm5hbDxici8+XG4gKiBjYW52YXMgc28gdGhhdCBpdCBmaXRzIHRoZSBhc3BlY3QgcmF0aW8gb2YgdGhlIGRldmljZTxici8+XG4gKiBubyBkaXN0b3J0aW9uIHdpbGwgb2NjdXIgaG93ZXZlciB5b3UgbXVzdCBtYWtlIHN1cmUgeW91ciBhcHBsaWNhdGlvbiB3b3JrcyBvbiBkaWZmZXJlbnQ8YnIvPlxuICogYXNwZWN0IHJhdGlvc1xuICogQHByb3BlcnR5IHtOdW1iZXJ9IEZJWEVEX0hFSUdIVFxuICogQHJlYWRvbmx5XG4gKiBAc3RhdGljXG4gKi9cbmNjLlJlc29sdXRpb25Qb2xpY3kuRklYRURfSEVJR0hUID0gMztcblxuLyoqXG4gKiBUaGUgYXBwbGljYXRpb24gdGFrZXMgdGhlIHdpZHRoIG9mIHRoZSBkZXNpZ24gcmVzb2x1dGlvbiBzaXplIGFuZCBtb2RpZmllcyB0aGUgaGVpZ2h0IG9mIHRoZSBpbnRlcm5hbDxici8+XG4gKiBjYW52YXMgc28gdGhhdCBpdCBmaXRzIHRoZSBhc3BlY3QgcmF0aW8gb2YgdGhlIGRldmljZTxici8+XG4gKiBubyBkaXN0b3J0aW9uIHdpbGwgb2NjdXIgaG93ZXZlciB5b3UgbXVzdCBtYWtlIHN1cmUgeW91ciBhcHBsaWNhdGlvbiB3b3JrcyBvbiBkaWZmZXJlbnQ8YnIvPlxuICogYXNwZWN0IHJhdGlvc1xuICogQHByb3BlcnR5IHtOdW1iZXJ9IEZJWEVEX1dJRFRIXG4gKiBAcmVhZG9ubHlcbiAqIEBzdGF0aWNcbiAqL1xuY2MuUmVzb2x1dGlvblBvbGljeS5GSVhFRF9XSURUSCA9IDQ7XG5cbi8qKlxuICogVW5rbm93IHBvbGljeVxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFVOS05PV05cbiAqIEByZWFkb25seVxuICogQHN0YXRpY1xuICovXG5jYy5SZXNvbHV0aW9uUG9saWN5LlVOS05PV04gPSA1O1xuXG4vKipcbiAqIEBtb2R1bGUgY2NcbiAqL1xuXG4vKipcbiAqICEjZW4gY2MudmlldyBpcyB0aGUgc2hhcmVkIHZpZXcgb2JqZWN0LlxuICogISN6aCBjYy52aWV3IOaYr+WFqOWxgOeahOinhuWbvuWvueixoeOAglxuICogQHByb3BlcnR5IHZpZXdcbiAqIEBzdGF0aWNcbiAqIEB0eXBlIHtWaWV3fVxuICovXG5jYy52aWV3ID0gbmV3IFZpZXcoKTtcblxuLyoqXG4gKiAhI2VuIGNjLndpblNpemUgaXMgdGhlIGFsaWFzIG9iamVjdCBmb3IgdGhlIHNpemUgb2YgdGhlIGN1cnJlbnQgZ2FtZSB3aW5kb3cuXG4gKiAhI3poIGNjLndpblNpemUg5Li65b2T5YmN55qE5ri45oiP56qX5Y+j55qE5aSn5bCP44CCXG4gKiBAcHJvcGVydHkgd2luU2l6ZVxuICogQHR5cGUgU2l6ZVxuICovXG5jYy53aW5TaXplID0gY2Muc2l6ZSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNjLnZpZXc7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==