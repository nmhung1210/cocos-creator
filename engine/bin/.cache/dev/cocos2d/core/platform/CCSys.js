
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCSys.js';
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
var settingPlatform;

if (!CC_EDITOR) {
  settingPlatform = window._CCSettings ? _CCSettings.platform : undefined;
}

var isVivoGame = settingPlatform === 'qgame';
var isOppoGame = settingPlatform === 'quickgame';
var isHuaweiGame = settingPlatform === 'huawei';
var isJKWGame = settingPlatform === 'jkw-game';
var isQttGame = settingPlatform === 'qtt-game';
var isLinkSure = settingPlatform === 'link-sure';

var _global = typeof window === 'undefined' ? global : window;

function initSys() {
  /**
   * System variables
   * @class sys
   * @main
   * @static
   */
  cc.sys = {};
  var sys = cc.sys;
  /**
   * English language code
   * @property {String} LANGUAGE_ENGLISH
   * @readOnly
   */

  sys.LANGUAGE_ENGLISH = "en";
  /**
   * Chinese language code
   * @property {String} LANGUAGE_CHINESE
   * @readOnly
   */

  sys.LANGUAGE_CHINESE = "zh";
  /**
   * French language code
   * @property {String} LANGUAGE_FRENCH
   * @readOnly
   */

  sys.LANGUAGE_FRENCH = "fr";
  /**
   * Italian language code
   * @property {String} LANGUAGE_ITALIAN
   * @readOnly
   */

  sys.LANGUAGE_ITALIAN = "it";
  /**
   * German language code
   * @property {String} LANGUAGE_GERMAN
   * @readOnly
   */

  sys.LANGUAGE_GERMAN = "de";
  /**
   * Spanish language code
   * @property {String} LANGUAGE_SPANISH
   * @readOnly
   */

  sys.LANGUAGE_SPANISH = "es";
  /**
   * Spanish language code
   * @property {String} LANGUAGE_DUTCH
   * @readOnly
   */

  sys.LANGUAGE_DUTCH = "du";
  /**
   * Russian language code
   * @property {String} LANGUAGE_RUSSIAN
   * @readOnly
   */

  sys.LANGUAGE_RUSSIAN = "ru";
  /**
   * Korean language code
   * @property {String} LANGUAGE_KOREAN
   * @readOnly
   */

  sys.LANGUAGE_KOREAN = "ko";
  /**
   * Japanese language code
   * @property {String} LANGUAGE_JAPANESE
   * @readOnly
   */

  sys.LANGUAGE_JAPANESE = "ja";
  /**
   * Hungarian language code
   * @property {String} LANGUAGE_HUNGARIAN
   * @readonly
   */

  sys.LANGUAGE_HUNGARIAN = "hu";
  /**
   * Portuguese language code
   * @property {String} LANGUAGE_PORTUGUESE
   * @readOnly
   */

  sys.LANGUAGE_PORTUGUESE = "pt";
  /**
   * Arabic language code
   * @property {String} LANGUAGE_ARABIC
   * @readOnly
   */

  sys.LANGUAGE_ARABIC = "ar";
  /**
   * Norwegian language code
   * @property {String} LANGUAGE_NORWEGIAN
   * @readOnly
   */

  sys.LANGUAGE_NORWEGIAN = "no";
  /**
   * Polish language code
   * @property {String} LANGUAGE_POLISH
   * @readOnly
   */

  sys.LANGUAGE_POLISH = "pl";
  /**
   * Turkish language code
   * @property {String} LANGUAGE_TURKISH
   * @readOnly
   */

  sys.LANGUAGE_TURKISH = "tr";
  /**
   * Ukrainian language code
   * @property {String} LANGUAGE_UKRAINIAN
   * @readOnly
   */

  sys.LANGUAGE_UKRAINIAN = "uk";
  /**
   * Romanian language code
   * @property {String} LANGUAGE_ROMANIAN
   * @readOnly
   */

  sys.LANGUAGE_ROMANIAN = "ro";
  /**
   * Bulgarian language code
   * @property {String} LANGUAGE_BULGARIAN
   * @readOnly
   */

  sys.LANGUAGE_BULGARIAN = "bg";
  /**
   * Unknown language code
   * @property {String} LANGUAGE_UNKNOWN
   * @readOnly
   */

  sys.LANGUAGE_UNKNOWN = "unknown";
  /**
   * @property {String} OS_IOS
   * @readOnly
   */

  sys.OS_IOS = "iOS";
  /**
   * @property {String} OS_ANDROID
   * @readOnly
   */

  sys.OS_ANDROID = "Android";
  /**
   * @property {String} OS_WINDOWS
   * @readOnly
   */

  sys.OS_WINDOWS = "Windows";
  /**
   * @property {String} OS_MARMALADE
   * @readOnly
   */

  sys.OS_MARMALADE = "Marmalade";
  /**
   * @property {String} OS_LINUX
   * @readOnly
   */

  sys.OS_LINUX = "Linux";
  /**
   * @property {String} OS_BADA
   * @readOnly
   */

  sys.OS_BADA = "Bada";
  /**
   * @property {String} OS_BLACKBERRY
   * @readOnly
   */

  sys.OS_BLACKBERRY = "Blackberry";
  /**
   * @property {String} OS_OSX
   * @readOnly
   */

  sys.OS_OSX = "OS X";
  /**
   * @property {String} OS_WP8
   * @readOnly
   */

  sys.OS_WP8 = "WP8";
  /**
   * @property {String} OS_WINRT
   * @readOnly
   */

  sys.OS_WINRT = "WINRT";
  /**
   * @property {String} OS_UNKNOWN
   * @readOnly
   */

  sys.OS_UNKNOWN = "Unknown";
  /**
   * @property {Number} UNKNOWN
   * @readOnly
   * @default -1
   */

  sys.UNKNOWN = -1;
  /**
   * @property {Number} WIN32
   * @readOnly
   * @default 0
   */

  sys.WIN32 = 0;
  /**
   * @property {Number} LINUX
   * @readOnly
   * @default 1
   */

  sys.LINUX = 1;
  /**
   * @property {Number} MACOS
   * @readOnly
   * @default 2
   */

  sys.MACOS = 2;
  /**
   * @property {Number} ANDROID
   * @readOnly
   * @default 3
   */

  sys.ANDROID = 3;
  /**
   * @property {Number} IPHONE
   * @readOnly
   * @default 4
   */

  sys.IPHONE = 4;
  /**
   * @property {Number} IPAD
   * @readOnly
   * @default 5
   */

  sys.IPAD = 5;
  /**
   * @property {Number} BLACKBERRY
   * @readOnly
   * @default 6
   */

  sys.BLACKBERRY = 6;
  /**
   * @property {Number} NACL
   * @readOnly
   * @default 7
   */

  sys.NACL = 7;
  /**
   * @property {Number} EMSCRIPTEN
   * @readOnly
   * @default 8
   */

  sys.EMSCRIPTEN = 8;
  /**
   * @property {Number} TIZEN
   * @readOnly
   * @default 9
   */

  sys.TIZEN = 9;
  /**
   * @property {Number} WINRT
   * @readOnly
   * @default 10
   */

  sys.WINRT = 10;
  /**
   * @property {Number} WP8
   * @readOnly
   * @default 11
   */

  sys.WP8 = 11;
  /**
   * @property {Number} MOBILE_BROWSER
   * @readOnly
   * @default 100
   */

  sys.MOBILE_BROWSER = 100;
  /**
   * @property {Number} DESKTOP_BROWSER
   * @readOnly
   * @default 101
   */

  sys.DESKTOP_BROWSER = 101;
  /**
   * Indicates whether executes in editor's window process (Electron's renderer context)
   * @property {Number} EDITOR_PAGE
   * @readOnly
   * @default 102
   */

  sys.EDITOR_PAGE = 102;
  /**
   * Indicates whether executes in editor's main process (Electron's browser context)
   * @property {Number} EDITOR_CORE
   * @readOnly
   * @default 103
   */

  sys.EDITOR_CORE = 103;
  /**
   * @property {Number} WECHAT_GAME
   * @readOnly
   * @default 104
   */

  sys.WECHAT_GAME = 104;
  /**
   * @property {Number} QQ_PLAY
   * @readOnly
   * @default 105
   */

  sys.QQ_PLAY = 105;
  /**
   * @property {Number} FB_PLAYABLE_ADS
   * @readOnly
   * @default 106
   */

  sys.FB_PLAYABLE_ADS = 106;
  /**
   * @property {Number} BAIDU_GAME
   * @readOnly
   * @default 107
   */

  sys.BAIDU_GAME = 107;
  /**
   * @property {Number} VIVO_GAME
   * @readOnly
   * @default 108
   */

  sys.VIVO_GAME = 108;
  /**
   * @property {Number} OPPO_GAME
   * @readOnly
   * @default 109
   */

  sys.OPPO_GAME = 109;
  /**
   * @property {Number} HUAWEI_GAME
   * @readOnly
   * @default 110
   */

  sys.HUAWEI_GAME = 110;
  /**
   * @property {Number} XIAOMI_GAME
   * @readOnly
   * @default 111
   */

  sys.XIAOMI_GAME = 111;
  /**
   * @property {Number} JKW_GAME
   * @readOnly
   * @default 112
   */

  sys.JKW_GAME = 112;
  /**
   * @property {Number} ALIPAY_GAME
   * @readOnly
   * @default 113
   */

  sys.ALIPAY_GAME = 113;
  /**
   * @property {Number} WECHAT_GAME_SUB
   * @readOnly
   * @default 114
   */

  sys.WECHAT_GAME_SUB = 114;
  /**
   * @property {Number} BAIDU_GAME_SUB
   * @readOnly
   * @default 115
   */

  sys.BAIDU_GAME_SUB = 115;
  /**
   * @property {Number} QTT_GAME
   * @readOnly
   * @default 116
   */

  sys.QTT_GAME = 116;
  /**
   * @property {Number} BYTEDANCE_GAME
   * @readOnly
   * @default 117
   */

  sys.BYTEDANCE_GAME = 117;
  /**
   * @property {Number} BYTEDANCE_GAME_SUB
   * @readOnly
   * @default 118
   */

  sys.BYTEDANCE_GAME_SUB = 118;
  /**
   * @property {Number} LINKSURE
   * @readOnly
   * @default 119
   */

  sys.LINKSURE = 119;
  /**
   * BROWSER_TYPE_WECHAT
   * @property {String} BROWSER_TYPE_WECHAT
   * @readOnly
   * @default "wechat"
   */

  sys.BROWSER_TYPE_WECHAT = "wechat";
  /**
   *
   * @property {String} BROWSER_TYPE_ANDROID
   * @readOnly
   * @default "androidbrowser"
   */

  sys.BROWSER_TYPE_ANDROID = "androidbrowser";
  /**
   *
   * @property {String} BROWSER_TYPE_IE
   * @readOnly
   * @default "ie"
   */

  sys.BROWSER_TYPE_IE = "ie";
  /**
   *
   * @property {String} BROWSER_TYPE_EDGE
   * @readOnly
   * @default "edge"
   */

  sys.BROWSER_TYPE_EDGE = "edge";
  /**
   *
   * @property {String} BROWSER_TYPE_QQ
   * @readOnly
   * @default "qqbrowser"
   */

  sys.BROWSER_TYPE_QQ = "qqbrowser";
  /**
   *
   * @property {String} BROWSER_TYPE_MOBILE_QQ
   * @readOnly
   * @default "mqqbrowser"
   */

  sys.BROWSER_TYPE_MOBILE_QQ = "mqqbrowser";
  /**
   *
   * @property {String} BROWSER_TYPE_UC
   * @readOnly
   * @default "ucbrowser"
   */

  sys.BROWSER_TYPE_UC = "ucbrowser";
  /**
   * uc third party integration.
   * @property {String} BROWSER_TYPE_UCBS
   * @readOnly
   * @default "ucbs"
   */

  sys.BROWSER_TYPE_UCBS = "ucbs";
  /**
   *
   * @property {String} BROWSER_TYPE_360
   * @readOnly
   * @default "360browser"
   */

  sys.BROWSER_TYPE_360 = "360browser";
  /**
   *
   * @property {String} BROWSER_TYPE_BAIDU_APP
   * @readOnly
   * @default "baiduboxapp"
   */

  sys.BROWSER_TYPE_BAIDU_APP = "baiduboxapp";
  /**
   *
   * @property {String} BROWSER_TYPE_BAIDU
   * @readOnly
   * @default "baidubrowser"
   */

  sys.BROWSER_TYPE_BAIDU = "baidubrowser";
  /**
   *
   * @property {String} BROWSER_TYPE_MAXTHON
   * @readOnly
   * @default "maxthon"
   */

  sys.BROWSER_TYPE_MAXTHON = "maxthon";
  /**
   *
   * @property {String} BROWSER_TYPE_OPERA
   * @readOnly
   * @default "opera"
   */

  sys.BROWSER_TYPE_OPERA = "opera";
  /**
   *
   * @property {String} BROWSER_TYPE_OUPENG
   * @readOnly
   * @default "oupeng"
   */

  sys.BROWSER_TYPE_OUPENG = "oupeng";
  /**
   *
   * @property {String} BROWSER_TYPE_MIUI
   * @readOnly
   * @default "miuibrowser"
   */

  sys.BROWSER_TYPE_MIUI = "miuibrowser";
  /**
   *
   * @property {String} BROWSER_TYPE_FIREFOX
   * @readOnly
   * @default "firefox"
   */

  sys.BROWSER_TYPE_FIREFOX = "firefox";
  /**
   *
   * @property {String} BROWSER_TYPE_SAFARI
   * @readOnly
   * @default "safari"
   */

  sys.BROWSER_TYPE_SAFARI = "safari";
  /**
   *
   * @property {String} BROWSER_TYPE_CHROME
   * @readOnly
   * @default "chrome"
   */

  sys.BROWSER_TYPE_CHROME = "chrome";
  /**
   *
   * @property {String} BROWSER_TYPE_LIEBAO
   * @readOnly
   * @default "liebao"
   */

  sys.BROWSER_TYPE_LIEBAO = "liebao";
  /**
   *
   * @property {String} BROWSER_TYPE_QZONE
   * @readOnly
   * @default "qzone"
   */

  sys.BROWSER_TYPE_QZONE = "qzone";
  /**
   *
   * @property {String} BROWSER_TYPE_SOUGOU
   * @readOnly
   * @default "sogou"
   */

  sys.BROWSER_TYPE_SOUGOU = "sogou";
  /**
   *
   * @property {String} BROWSER_TYPE_UNKNOWN
   * @readOnly
   * @default "unknown"
   */

  sys.BROWSER_TYPE_UNKNOWN = "unknown";
  /**
   * Is native ? This is set to be true in jsb auto.
   * @property {Boolean} isNative
   */

  sys.isNative = CC_JSB || CC_RUNTIME;
  /**
   * Is web browser ?
   * @property {Boolean} isBrowser
   */

  sys.isBrowser = typeof window === 'object' && typeof document === 'object' && !CC_JSB && !CC_RUNTIME;
  /**
   * Is webgl extension support?
   * @method glExtension
   * @param name
   */

  sys.glExtension = function (name) {
    return !!cc.renderer.device.ext(name);
  };
  /**
   * Get max joint matrix size for skinned mesh renderer.
   * @method getMaxJointMatrixSize
   */


  sys.getMaxJointMatrixSize = function () {
    if (!sys._maxJointMatrixSize) {
      var JOINT_MATRICES_SIZE = 50;
      var LEFT_UNIFORM_SIZE = 10;
      var gl = cc.game._renderContext;
      var maxUniforms = Math.floor(gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS) / 4) - LEFT_UNIFORM_SIZE;

      if (maxUniforms < JOINT_MATRICES_SIZE) {
        sys._maxJointMatrixSize = 0;
      } else {
        sys._maxJointMatrixSize = JOINT_MATRICES_SIZE;
      }
    }

    return sys._maxJointMatrixSize;
  };
  /**
   * !#en
   * Returns the safe area of the screen. If the screen is not notched, the design resolution will be returned by default.
   * Only supported on Android, iOS and WeChat Mini Game platform.
   * !#zh
   * 返回手机屏幕安全区域，如果不是异形屏将默认返回设计分辨率尺寸。目前只支持安卓、iOS 原生平台和微信小游戏平台。
   * @method getSafeAreaRect
   * @return {Rect}
  */


  sys.getSafeAreaRect = function () {
    var visibleSize = cc.view.getVisibleSize();
    return cc.rect(0, 0, visibleSize.width, visibleSize.height);
  };

  if (_global.__globalAdapter && _global.__globalAdapter.adaptSys) {
    // init sys info in adapter
    _global.__globalAdapter.adaptSys(sys);
  } else if (CC_EDITOR && Editor.isMainProcess) {
    sys.isMobile = false;
    sys.platform = sys.EDITOR_CORE;
    sys.language = sys.LANGUAGE_UNKNOWN;
    sys.languageCode = undefined;
    sys.os = {
      darwin: sys.OS_OSX,
      win32: sys.OS_WINDOWS,
      linux: sys.OS_LINUX
    }[process.platform] || sys.OS_UNKNOWN;
    sys.browserType = null;
    sys.browserVersion = null;
    sys.windowPixelResolution = {
      width: 0,
      height: 0
    };
    sys.capabilities = {
      'imageBitmap': false
    };
    sys.__audioSupport = {};
  } else if (CC_JSB || CC_RUNTIME) {
    var platform;

    if (isVivoGame) {
      platform = sys.VIVO_GAME;
    } else if (isOppoGame) {
      platform = sys.OPPO_GAME;
    } else if (isHuaweiGame) {
      platform = sys.HUAWEI_GAME;
    } else if (isJKWGame) {
      platform = sys.JKW_GAME;
    } else if (isQttGame) {
      platform = sys.QTT_GAME;
    } else if (isLinkSure) {
      platform = sys.LINKSURE;
    } else {
      platform = __getPlatform();
    }

    sys.platform = platform;
    sys.isMobile = platform === sys.ANDROID || platform === sys.IPAD || platform === sys.IPHONE || platform === sys.WP8 || platform === sys.TIZEN || platform === sys.BLACKBERRY || platform === sys.XIAOMI_GAME || isVivoGame || isOppoGame || isHuaweiGame || isJKWGame || isQttGame;
    sys.os = __getOS();
    sys.language = __getCurrentLanguage();
    var languageCode;

    if (CC_JSB) {
      languageCode = __getCurrentLanguageCode();
    }

    sys.languageCode = languageCode ? languageCode.toLowerCase() : undefined;
    sys.osVersion = __getOSVersion();
    sys.osMainVersion = parseInt(sys.osVersion);
    sys.browserType = null;
    sys.browserVersion = null;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var ratio = window.devicePixelRatio || 1;
    sys.windowPixelResolution = {
      width: ratio * w,
      height: ratio * h
    };
    sys.localStorage = window.localStorage;
    var capabilities;
    capabilities = sys.capabilities = {
      "canvas": false,
      "opengl": true,
      "webp": true
    };

    if (sys.isMobile) {
      capabilities["accelerometer"] = true;
      capabilities["touches"] = true;
    } else {
      // desktop
      capabilities["keyboard"] = true;
      capabilities["mouse"] = true;
      capabilities["touches"] = false;
    }

    capabilities['imageBitmap'] = false;
    sys.__audioSupport = {
      ONLY_ONE: false,
      WEB_AUDIO: false,
      DELAY_CREATE_CTX: false,
      format: ['.mp3']
    };
  } else {
    // browser or runtime
    var win = window,
        nav = win.navigator,
        doc = document,
        docEle = doc.documentElement;
    var ua = nav.userAgent.toLowerCase();

    if (CC_EDITOR) {
      sys.isMobile = false;
      sys.platform = sys.EDITOR_PAGE;
    } else {
      /**
       * Indicate whether system is mobile system
       * @property {Boolean} isMobile
       */
      sys.isMobile = /mobile|android|iphone|ipad/.test(ua);
      /**
       * Indicate the running platform
       * @property {Number} platform
       */

      if (typeof FbPlayableAd !== "undefined") {
        sys.platform = sys.FB_PLAYABLE_ADS;
      } else {
        sys.platform = sys.isMobile ? sys.MOBILE_BROWSER : sys.DESKTOP_BROWSER;
      }
    }

    var currLanguage = nav.language;
    currLanguage = currLanguage ? currLanguage : nav.browserLanguage;
    /**
     * Get current language iso 639-1 code.
     * Examples of valid language codes include "zh-tw", "en", "en-us", "fr", "fr-fr", "es-es", etc.
     * The actual value totally depends on results provided by destination platform.
     * @property {String} languageCode
     */

    sys.languageCode = currLanguage.toLowerCase();
    currLanguage = currLanguage ? currLanguage.split("-")[0] : sys.LANGUAGE_ENGLISH;
    /**
     * Indicate the current language of the running system
     * @property {String} language
     */

    sys.language = currLanguage; // Get the os of system

    var isAndroid = false,
        iOS = false,
        osVersion = '',
        osMainVersion = 0;
    var uaResult = /android\s*(\d+(?:\.\d+)*)/i.exec(ua) || /android\s*(\d+(?:\.\d+)*)/i.exec(nav.platform);

    if (uaResult) {
      isAndroid = true;
      osVersion = uaResult[1] || '';
      osMainVersion = parseInt(osVersion) || 0;
    }

    uaResult = /(iPad|iPhone|iPod).*OS ((\d+_?){2,3})/i.exec(ua);

    if (uaResult) {
      iOS = true;
      osVersion = uaResult[2] || '';
      osMainVersion = parseInt(osVersion) || 0;
    } // refer to https://github.com/cocos-creator/engine/pull/5542 , thanks for contribition from @krapnikkk
    // ipad OS 13 safari identifies itself as "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko)" 
    // so use maxTouchPoints to check whether it's desktop safari or not. 
    // reference: https://stackoverflow.com/questions/58019463/how-to-detect-device-name-in-safari-on-ios-13-while-it-doesnt-show-the-correct
    // FIXME: should remove it when touch-enabled macs are available
    else if (/(iPhone|iPad|iPod)/.exec(nav.platform) || nav.platform === 'MacIntel' && nav.maxTouchPoints && nav.maxTouchPoints > 1) {
        iOS = true;
        osVersion = '';
        osMainVersion = 0;
      }

    var osName = sys.OS_UNKNOWN;
    if (nav.appVersion.indexOf("Win") !== -1) osName = sys.OS_WINDOWS;else if (iOS) osName = sys.OS_IOS;else if (nav.appVersion.indexOf("Mac") !== -1) osName = sys.OS_OSX;else if (nav.appVersion.indexOf("X11") !== -1 && nav.appVersion.indexOf("Linux") === -1) osName = sys.OS_UNIX;else if (isAndroid) osName = sys.OS_ANDROID;else if (nav.appVersion.indexOf("Linux") !== -1 || ua.indexOf("ubuntu") !== -1) osName = sys.OS_LINUX;
    /**
     * Indicate the running os name
     * @property {String} os
     */

    sys.os = osName;
    /**
     * Indicate the running os version
     * @property {String} osVersion
     */

    sys.osVersion = osVersion;
    /**
     * Indicate the running os main version
     * @property {Number} osMainVersion
     */

    sys.osMainVersion = osMainVersion;
    /**
     * Indicate the running browser type
     * @property {String | null} browserType
     */

    sys.browserType = sys.BROWSER_TYPE_UNKNOWN;
    /* Determine the browser type */

    (function () {
      var typeReg1 = /mqqbrowser|micromessenger|qqbrowser|sogou|qzone|liebao|maxthon|ucbs|360 aphone|360browser|baiduboxapp|baidubrowser|maxthon|mxbrowser|miuibrowser/i;
      var typeReg2 = /qq|ucbrowser|ubrowser|edge/i;
      var typeReg3 = /chrome|safari|firefox|trident|opera|opr\/|oupeng/i;
      var browserTypes = typeReg1.exec(ua) || typeReg2.exec(ua) || typeReg3.exec(ua);
      var browserType = browserTypes ? browserTypes[0].toLowerCase() : sys.BROWSER_TYPE_UNKNOWN;
      if (browserType === "safari" && isAndroid) browserType = sys.BROWSER_TYPE_ANDROID;else if (browserType === "qq" && ua.match(/android.*applewebkit/i)) browserType = sys.BROWSER_TYPE_ANDROID;
      var typeMap = {
        'micromessenger': sys.BROWSER_TYPE_WECHAT,
        'trident': sys.BROWSER_TYPE_IE,
        'edge': sys.BROWSER_TYPE_EDGE,
        '360 aphone': sys.BROWSER_TYPE_360,
        'mxbrowser': sys.BROWSER_TYPE_MAXTHON,
        'opr/': sys.BROWSER_TYPE_OPERA,
        'ubrowser': sys.BROWSER_TYPE_UC
      };
      sys.browserType = typeMap[browserType] || browserType;
    })();
    /**
     * Indicate the running browser version
     * @property {String | null} browserVersion
     */


    sys.browserVersion = "";
    /* Determine the browser version number */

    (function () {
      var versionReg1 = /(mqqbrowser|micromessenger|qqbrowser|sogou|qzone|liebao|maxthon|uc|ucbs|360 aphone|360|baiduboxapp|baidu|maxthon|mxbrowser|miui(?:.hybrid)?)(mobile)?(browser)?\/?([\d.]+)/i;
      var versionReg2 = /(qq|chrome|safari|firefox|trident|opera|opr\/|oupeng)(mobile)?(browser)?\/?([\d.]+)/i;
      var tmp = ua.match(versionReg1);
      if (!tmp) tmp = ua.match(versionReg2);
      sys.browserVersion = tmp ? tmp[4] : "";
    })();

    var w = window.innerWidth || document.documentElement.clientWidth;
    var h = window.innerHeight || document.documentElement.clientHeight;
    var ratio = window.devicePixelRatio || 1;
    /**
     * Indicate the real pixel resolution of the whole game window
     * @property {Size} windowPixelResolution
     */

    sys.windowPixelResolution = {
      width: ratio * w,
      height: ratio * h
    };

    sys._checkWebGLRenderMode = function () {
      if (cc.game.renderType !== cc.game.RENDER_TYPE_WEBGL) throw new Error("This feature supports WebGL render mode only.");
    };

    var _tmpCanvas1 = document.createElement("canvas");

    var create3DContext = function create3DContext(canvas, opt_attribs, opt_contextType) {
      if (opt_contextType) {
        try {
          return canvas.getContext(opt_contextType, opt_attribs);
        } catch (e) {
          return null;
        }
      } else {
        return create3DContext(canvas, opt_attribs, "webgl") || create3DContext(canvas, opt_attribs, "experimental-webgl") || create3DContext(canvas, opt_attribs, "webkit-3d") || create3DContext(canvas, opt_attribs, "moz-webgl") || null;
      }
    };
    /**
     * cc.sys.localStorage is a local storage component.
     * @property {Object} localStorage
     */


    try {
      var localStorage = sys.localStorage = win.localStorage;
      localStorage.setItem("storage", "");
      localStorage.removeItem("storage");
      localStorage = null;
    } catch (e) {
      var warn = function warn() {
        cc.warnID(5200);
      };

      sys.localStorage = {
        getItem: warn,
        setItem: warn,
        removeItem: warn,
        clear: warn
      };
    }

    var _supportWebp = _tmpCanvas1.toDataURL('image/webp').startsWith('data:image/webp');

    var _supportCanvas = !!_tmpCanvas1.getContext("2d");

    var _supportWebGL = false;

    if (CC_TEST) {
      _supportWebGL = false;
    } else if (win.WebGLRenderingContext) {
      _supportWebGL = true;
    }
    /**
     * The capabilities of the current platform
     * @property {Object} capabilities
     */


    var capabilities = sys.capabilities = {
      "canvas": _supportCanvas,
      "opengl": _supportWebGL,
      "webp": _supportWebp,
      'imageBitmap': false
    };

    if (typeof createImageBitmap !== 'undefined' && typeof Blob !== 'undefined') {
      _tmpCanvas1.width = _tmpCanvas1.height = 2;
      createImageBitmap(_tmpCanvas1, {}).then(function (imageBitmap) {
        capabilities.imageBitmap = true;
        imageBitmap.close && imageBitmap.close();
      })["catch"](function (err) {});
    }

    if (docEle['ontouchstart'] !== undefined || doc['ontouchstart'] !== undefined || nav.msPointerEnabled) capabilities["touches"] = true;
    if (docEle['onmouseup'] !== undefined) capabilities["mouse"] = true;
    if (docEle['onkeyup'] !== undefined) capabilities["keyboard"] = true;
    if (win.DeviceMotionEvent || win.DeviceOrientationEvent) capabilities["accelerometer"] = true;

    var __audioSupport;
    /**
     * Audio support in the browser
     *
     * MULTI_CHANNEL        : Multiple audio while playing - If it doesn't, you can only play background music
     * WEB_AUDIO            : Support for WebAudio - Support W3C WebAudio standards, all of the audio can be played
     * AUTOPLAY             : Supports auto-play audio - if Don‘t support it, On a touch detecting background music canvas, and then replay
     * REPLAY_AFTER_TOUCH   : The first music will fail, must be replay after touchstart
     * USE_EMPTIED_EVENT    : Whether to use the emptied event to replace load callback
     * DELAY_CREATE_CTX     : delay created the context object - only webAudio
     * NEED_MANUAL_LOOP     : loop attribute failure, need to perform loop manually
     *
     * May be modifications for a few browser version
     */


    (function () {
      var DEBUG = false;
      var version = sys.browserVersion; // check if browser supports Web Audio
      // check Web Audio's context

      var supportWebAudio = !!(window.AudioContext || window.webkitAudioContext || window.mozAudioContext);
      __audioSupport = {
        ONLY_ONE: false,
        WEB_AUDIO: supportWebAudio,
        DELAY_CREATE_CTX: false
      };

      if (sys.os === sys.OS_IOS) {
        // IOS no event that used to parse completed callback
        // this time is not complete, can not play
        //
        __audioSupport.USE_LOADER_EVENT = 'loadedmetadata';
      }

      if (sys.browserType === sys.BROWSER_TYPE_FIREFOX) {
        __audioSupport.DELAY_CREATE_CTX = true;
        __audioSupport.USE_LOADER_EVENT = 'canplay';
      }

      if (sys.os === sys.OS_ANDROID) {
        if (sys.browserType === sys.BROWSER_TYPE_UC) {
          __audioSupport.ONE_SOURCE = true;
        }
      }

      if (DEBUG) {
        setTimeout(function () {
          cc.log('browse type: ' + sys.browserType);
          cc.log('browse version: ' + version);
          cc.log('MULTI_CHANNEL: ' + __audioSupport.MULTI_CHANNEL);
          cc.log('WEB_AUDIO: ' + __audioSupport.WEB_AUDIO);
          cc.log('AUTOPLAY: ' + __audioSupport.AUTOPLAY);
        }, 0);
      }
    })();

    try {
      if (__audioSupport.WEB_AUDIO) {
        __audioSupport.context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();

        if (__audioSupport.DELAY_CREATE_CTX) {
          setTimeout(function () {
            __audioSupport.context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
          }, 0);
        }
      }
    } catch (error) {
      __audioSupport.WEB_AUDIO = false;
      cc.logID(5201);
    }

    var formatSupport = [];

    (function () {
      var audio = document.createElement('audio');

      if (audio.canPlayType) {
        var ogg = audio.canPlayType('audio/ogg; codecs="vorbis"');
        if (ogg) formatSupport.push('.ogg');
        var mp3 = audio.canPlayType('audio/mpeg');
        if (mp3) formatSupport.push('.mp3');
        var wav = audio.canPlayType('audio/wav; codecs="1"');
        if (wav) formatSupport.push('.wav');
        var mp4 = audio.canPlayType('audio/mp4');
        if (mp4) formatSupport.push('.mp4');
        var m4a = audio.canPlayType('audio/x-m4a');
        if (m4a) formatSupport.push('.m4a');
      }
    })();

    __audioSupport.format = formatSupport;
    sys.__audioSupport = __audioSupport;
  }
  /**
   * !#en
   * Network type enumeration
   * !#zh
   * 网络类型枚举
   *
   * @enum sys.NetworkType
   */


  sys.NetworkType = {
    /**
     * !#en
     * Network is unreachable.
     * !#zh
     * 网络不通
     *
     * @property {Number} NONE
     */
    NONE: 0,

    /**
     * !#en
     * Network is reachable via WiFi or cable.
     * !#zh
     * 通过无线或者有线本地网络连接因特网
     *
     * @property {Number} LAN
     */
    LAN: 1,

    /**
     * !#en
     * Network is reachable via Wireless Wide Area Network
     * !#zh
     * 通过蜂窝移动网络连接因特网
     *
     * @property {Number} WWAN
     */
    WWAN: 2
  };
  /**
   * @class sys
   */

  /**
   * !#en
   * Get the network type of current device, return cc.sys.NetworkType.LAN if failure.
   * !#zh
   * 获取当前设备的网络类型, 如果网络类型无法获取，默认将返回 cc.sys.NetworkType.LAN
   *
   * @method getNetworkType
   * @return {NetworkType}
   */

  sys.getNetworkType = function () {
    // TODO: need to implement this for mobile phones.
    return sys.NetworkType.LAN;
  };
  /**
   * !#en
   * Get the battery level of current device, return 1.0 if failure.
   * !#zh
   * 获取当前设备的电池电量，如果电量无法获取，默认将返回 1
   *
   * @method getBatteryLevel
   * @return {Number} - 0.0 ~ 1.0
   */


  sys.getBatteryLevel = function () {
    // TODO: need to implement this for mobile phones.
    return 1.0;
  };
  /**
   * Forces the garbage collection, only available in JSB
   * @method garbageCollect
   */


  sys.garbageCollect = function () {// N/A in web
  };
  /**
   * Restart the JS VM, only available in JSB
   * @method restartVM
   */


  sys.restartVM = function () {// N/A in web
  };
  /**
   * Check whether an object is valid,
   * In web engine, it will return true if the object exist
   * In native engine, it will return true if the JS object and the correspond native object are both valid
   * @method isObjectValid
   * @param {Object} obj
   * @return {Boolean} Validity of the object
   */


  sys.isObjectValid = function (obj) {
    if (obj) {
      return true;
    }

    return false;
  };
  /**
   * Dump system informations
   * @method dump
   */


  sys.dump = function () {
    var self = this;
    var str = "";
    str += "isMobile : " + self.isMobile + "\r\n";
    str += "language : " + self.language + "\r\n";
    str += "browserType : " + self.browserType + "\r\n";
    str += "browserVersion : " + self.browserVersion + "\r\n";
    str += "capabilities : " + JSON.stringify(self.capabilities) + "\r\n";
    str += "os : " + self.os + "\r\n";
    str += "osVersion : " + self.osVersion + "\r\n";
    str += "platform : " + self.platform + "\r\n";
    str += "Using " + (cc.game.renderType === cc.game.RENDER_TYPE_WEBGL ? "WEBGL" : "CANVAS") + " renderer." + "\r\n";
    cc.log(str);
  };
  /**
   * Open a url in browser
   * @method openURL
   * @param {String} url
   */


  sys.openURL = function (url) {
    if (CC_JSB || CC_RUNTIME) {
      jsb.openURL(url);
    } else {
      window.open(url);
    }
  };
  /**
   * Get the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
   * @method now
   * @return {Number}
   */


  sys.now = function () {
    if (Date.now) {
      return Date.now();
    } else {
      return +new Date();
    }
  };

  return sys;
}

var sys = cc && cc.sys ? cc.sys : initSys();
module.exports = sys;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL0NDU3lzLmpzIl0sIm5hbWVzIjpbInNldHRpbmdQbGF0Zm9ybSIsIkNDX0VESVRPUiIsIndpbmRvdyIsIl9DQ1NldHRpbmdzIiwicGxhdGZvcm0iLCJ1bmRlZmluZWQiLCJpc1Zpdm9HYW1lIiwiaXNPcHBvR2FtZSIsImlzSHVhd2VpR2FtZSIsImlzSktXR2FtZSIsImlzUXR0R2FtZSIsImlzTGlua1N1cmUiLCJfZ2xvYmFsIiwiZ2xvYmFsIiwiaW5pdFN5cyIsImNjIiwic3lzIiwiTEFOR1VBR0VfRU5HTElTSCIsIkxBTkdVQUdFX0NISU5FU0UiLCJMQU5HVUFHRV9GUkVOQ0giLCJMQU5HVUFHRV9JVEFMSUFOIiwiTEFOR1VBR0VfR0VSTUFOIiwiTEFOR1VBR0VfU1BBTklTSCIsIkxBTkdVQUdFX0RVVENIIiwiTEFOR1VBR0VfUlVTU0lBTiIsIkxBTkdVQUdFX0tPUkVBTiIsIkxBTkdVQUdFX0pBUEFORVNFIiwiTEFOR1VBR0VfSFVOR0FSSUFOIiwiTEFOR1VBR0VfUE9SVFVHVUVTRSIsIkxBTkdVQUdFX0FSQUJJQyIsIkxBTkdVQUdFX05PUldFR0lBTiIsIkxBTkdVQUdFX1BPTElTSCIsIkxBTkdVQUdFX1RVUktJU0giLCJMQU5HVUFHRV9VS1JBSU5JQU4iLCJMQU5HVUFHRV9ST01BTklBTiIsIkxBTkdVQUdFX0JVTEdBUklBTiIsIkxBTkdVQUdFX1VOS05PV04iLCJPU19JT1MiLCJPU19BTkRST0lEIiwiT1NfV0lORE9XUyIsIk9TX01BUk1BTEFERSIsIk9TX0xJTlVYIiwiT1NfQkFEQSIsIk9TX0JMQUNLQkVSUlkiLCJPU19PU1giLCJPU19XUDgiLCJPU19XSU5SVCIsIk9TX1VOS05PV04iLCJVTktOT1dOIiwiV0lOMzIiLCJMSU5VWCIsIk1BQ09TIiwiQU5EUk9JRCIsIklQSE9ORSIsIklQQUQiLCJCTEFDS0JFUlJZIiwiTkFDTCIsIkVNU0NSSVBURU4iLCJUSVpFTiIsIldJTlJUIiwiV1A4IiwiTU9CSUxFX0JST1dTRVIiLCJERVNLVE9QX0JST1dTRVIiLCJFRElUT1JfUEFHRSIsIkVESVRPUl9DT1JFIiwiV0VDSEFUX0dBTUUiLCJRUV9QTEFZIiwiRkJfUExBWUFCTEVfQURTIiwiQkFJRFVfR0FNRSIsIlZJVk9fR0FNRSIsIk9QUE9fR0FNRSIsIkhVQVdFSV9HQU1FIiwiWElBT01JX0dBTUUiLCJKS1dfR0FNRSIsIkFMSVBBWV9HQU1FIiwiV0VDSEFUX0dBTUVfU1VCIiwiQkFJRFVfR0FNRV9TVUIiLCJRVFRfR0FNRSIsIkJZVEVEQU5DRV9HQU1FIiwiQllURURBTkNFX0dBTUVfU1VCIiwiTElOS1NVUkUiLCJCUk9XU0VSX1RZUEVfV0VDSEFUIiwiQlJPV1NFUl9UWVBFX0FORFJPSUQiLCJCUk9XU0VSX1RZUEVfSUUiLCJCUk9XU0VSX1RZUEVfRURHRSIsIkJST1dTRVJfVFlQRV9RUSIsIkJST1dTRVJfVFlQRV9NT0JJTEVfUVEiLCJCUk9XU0VSX1RZUEVfVUMiLCJCUk9XU0VSX1RZUEVfVUNCUyIsIkJST1dTRVJfVFlQRV8zNjAiLCJCUk9XU0VSX1RZUEVfQkFJRFVfQVBQIiwiQlJPV1NFUl9UWVBFX0JBSURVIiwiQlJPV1NFUl9UWVBFX01BWFRIT04iLCJCUk9XU0VSX1RZUEVfT1BFUkEiLCJCUk9XU0VSX1RZUEVfT1VQRU5HIiwiQlJPV1NFUl9UWVBFX01JVUkiLCJCUk9XU0VSX1RZUEVfRklSRUZPWCIsIkJST1dTRVJfVFlQRV9TQUZBUkkiLCJCUk9XU0VSX1RZUEVfQ0hST01FIiwiQlJPV1NFUl9UWVBFX0xJRUJBTyIsIkJST1dTRVJfVFlQRV9RWk9ORSIsIkJST1dTRVJfVFlQRV9TT1VHT1UiLCJCUk9XU0VSX1RZUEVfVU5LTk9XTiIsImlzTmF0aXZlIiwiQ0NfSlNCIiwiQ0NfUlVOVElNRSIsImlzQnJvd3NlciIsImRvY3VtZW50IiwiZ2xFeHRlbnNpb24iLCJuYW1lIiwicmVuZGVyZXIiLCJkZXZpY2UiLCJleHQiLCJnZXRNYXhKb2ludE1hdHJpeFNpemUiLCJfbWF4Sm9pbnRNYXRyaXhTaXplIiwiSk9JTlRfTUFUUklDRVNfU0laRSIsIkxFRlRfVU5JRk9STV9TSVpFIiwiZ2wiLCJnYW1lIiwiX3JlbmRlckNvbnRleHQiLCJtYXhVbmlmb3JtcyIsIk1hdGgiLCJmbG9vciIsImdldFBhcmFtZXRlciIsIk1BWF9WRVJURVhfVU5JRk9STV9WRUNUT1JTIiwiZ2V0U2FmZUFyZWFSZWN0IiwidmlzaWJsZVNpemUiLCJ2aWV3IiwiZ2V0VmlzaWJsZVNpemUiLCJyZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJfX2dsb2JhbEFkYXB0ZXIiLCJhZGFwdFN5cyIsIkVkaXRvciIsImlzTWFpblByb2Nlc3MiLCJpc01vYmlsZSIsImxhbmd1YWdlIiwibGFuZ3VhZ2VDb2RlIiwib3MiLCJkYXJ3aW4iLCJ3aW4zMiIsImxpbnV4IiwicHJvY2VzcyIsImJyb3dzZXJUeXBlIiwiYnJvd3NlclZlcnNpb24iLCJ3aW5kb3dQaXhlbFJlc29sdXRpb24iLCJjYXBhYmlsaXRpZXMiLCJfX2F1ZGlvU3VwcG9ydCIsIl9fZ2V0UGxhdGZvcm0iLCJfX2dldE9TIiwiX19nZXRDdXJyZW50TGFuZ3VhZ2UiLCJfX2dldEN1cnJlbnRMYW5ndWFnZUNvZGUiLCJ0b0xvd2VyQ2FzZSIsIm9zVmVyc2lvbiIsIl9fZ2V0T1NWZXJzaW9uIiwib3NNYWluVmVyc2lvbiIsInBhcnNlSW50IiwidyIsImlubmVyV2lkdGgiLCJoIiwiaW5uZXJIZWlnaHQiLCJyYXRpbyIsImRldmljZVBpeGVsUmF0aW8iLCJsb2NhbFN0b3JhZ2UiLCJPTkxZX09ORSIsIldFQl9BVURJTyIsIkRFTEFZX0NSRUFURV9DVFgiLCJmb3JtYXQiLCJ3aW4iLCJuYXYiLCJuYXZpZ2F0b3IiLCJkb2MiLCJkb2NFbGUiLCJkb2N1bWVudEVsZW1lbnQiLCJ1YSIsInVzZXJBZ2VudCIsInRlc3QiLCJGYlBsYXlhYmxlQWQiLCJjdXJyTGFuZ3VhZ2UiLCJicm93c2VyTGFuZ3VhZ2UiLCJzcGxpdCIsImlzQW5kcm9pZCIsImlPUyIsInVhUmVzdWx0IiwiZXhlYyIsIm1heFRvdWNoUG9pbnRzIiwib3NOYW1lIiwiYXBwVmVyc2lvbiIsImluZGV4T2YiLCJPU19VTklYIiwidHlwZVJlZzEiLCJ0eXBlUmVnMiIsInR5cGVSZWczIiwiYnJvd3NlclR5cGVzIiwibWF0Y2giLCJ0eXBlTWFwIiwidmVyc2lvblJlZzEiLCJ2ZXJzaW9uUmVnMiIsInRtcCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiX2NoZWNrV2ViR0xSZW5kZXJNb2RlIiwicmVuZGVyVHlwZSIsIlJFTkRFUl9UWVBFX1dFQkdMIiwiRXJyb3IiLCJfdG1wQ2FudmFzMSIsImNyZWF0ZUVsZW1lbnQiLCJjcmVhdGUzRENvbnRleHQiLCJjYW52YXMiLCJvcHRfYXR0cmlicyIsIm9wdF9jb250ZXh0VHlwZSIsImdldENvbnRleHQiLCJlIiwic2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJ3YXJuIiwid2FybklEIiwiZ2V0SXRlbSIsImNsZWFyIiwiX3N1cHBvcnRXZWJwIiwidG9EYXRhVVJMIiwic3RhcnRzV2l0aCIsIl9zdXBwb3J0Q2FudmFzIiwiX3N1cHBvcnRXZWJHTCIsIkNDX1RFU1QiLCJXZWJHTFJlbmRlcmluZ0NvbnRleHQiLCJjcmVhdGVJbWFnZUJpdG1hcCIsIkJsb2IiLCJ0aGVuIiwiaW1hZ2VCaXRtYXAiLCJjbG9zZSIsImVyciIsIm1zUG9pbnRlckVuYWJsZWQiLCJEZXZpY2VNb3Rpb25FdmVudCIsIkRldmljZU9yaWVudGF0aW9uRXZlbnQiLCJERUJVRyIsInZlcnNpb24iLCJzdXBwb3J0V2ViQXVkaW8iLCJBdWRpb0NvbnRleHQiLCJ3ZWJraXRBdWRpb0NvbnRleHQiLCJtb3pBdWRpb0NvbnRleHQiLCJVU0VfTE9BREVSX0VWRU5UIiwiT05FX1NPVVJDRSIsInNldFRpbWVvdXQiLCJsb2ciLCJNVUxUSV9DSEFOTkVMIiwiQVVUT1BMQVkiLCJjb250ZXh0IiwiZXJyb3IiLCJsb2dJRCIsImZvcm1hdFN1cHBvcnQiLCJhdWRpbyIsImNhblBsYXlUeXBlIiwib2dnIiwicHVzaCIsIm1wMyIsIndhdiIsIm1wNCIsIm00YSIsIk5ldHdvcmtUeXBlIiwiTk9ORSIsIkxBTiIsIldXQU4iLCJnZXROZXR3b3JrVHlwZSIsImdldEJhdHRlcnlMZXZlbCIsImdhcmJhZ2VDb2xsZWN0IiwicmVzdGFydFZNIiwiaXNPYmplY3RWYWxpZCIsIm9iaiIsImR1bXAiLCJzZWxmIiwic3RyIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9wZW5VUkwiLCJ1cmwiLCJqc2IiLCJvcGVuIiwibm93IiwiRGF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFJQSxlQUFKOztBQUNDLElBQUksQ0FBQ0MsU0FBTCxFQUFnQjtBQUNiRCxFQUFBQSxlQUFlLEdBQUdFLE1BQU0sQ0FBQ0MsV0FBUCxHQUFxQkEsV0FBVyxDQUFDQyxRQUFqQyxHQUEyQ0MsU0FBN0Q7QUFDRjs7QUFDRixJQUFNQyxVQUFVLEdBQUlOLGVBQWUsS0FBSyxPQUF4QztBQUNBLElBQU1PLFVBQVUsR0FBSVAsZUFBZSxLQUFLLFdBQXhDO0FBQ0EsSUFBTVEsWUFBWSxHQUFJUixlQUFlLEtBQUssUUFBMUM7QUFDQSxJQUFNUyxTQUFTLEdBQUlULGVBQWUsS0FBSyxVQUF2QztBQUNBLElBQU1VLFNBQVMsR0FBSVYsZUFBZSxLQUFLLFVBQXZDO0FBQ0EsSUFBTVcsVUFBVSxHQUFJWCxlQUFlLEtBQUssV0FBeEM7O0FBRUEsSUFBTVksT0FBTyxHQUFHLE9BQU9WLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NXLE1BQWhDLEdBQXlDWCxNQUF6RDs7QUFFQSxTQUFTWSxPQUFULEdBQW9CO0FBQ2hCOzs7Ozs7QUFNQUMsRUFBQUEsRUFBRSxDQUFDQyxHQUFILEdBQVMsRUFBVDtBQUNBLE1BQUlBLEdBQUcsR0FBR0QsRUFBRSxDQUFDQyxHQUFiO0FBRUE7Ozs7OztBQUtBQSxFQUFBQSxHQUFHLENBQUNDLGdCQUFKLEdBQXVCLElBQXZCO0FBRUE7Ozs7OztBQUtBRCxFQUFBQSxHQUFHLENBQUNFLGdCQUFKLEdBQXVCLElBQXZCO0FBRUE7Ozs7OztBQUtBRixFQUFBQSxHQUFHLENBQUNHLGVBQUosR0FBc0IsSUFBdEI7QUFFQTs7Ozs7O0FBS0FILEVBQUFBLEdBQUcsQ0FBQ0ksZ0JBQUosR0FBdUIsSUFBdkI7QUFFQTs7Ozs7O0FBS0FKLEVBQUFBLEdBQUcsQ0FBQ0ssZUFBSixHQUFzQixJQUF0QjtBQUVBOzs7Ozs7QUFLQUwsRUFBQUEsR0FBRyxDQUFDTSxnQkFBSixHQUF1QixJQUF2QjtBQUVBOzs7Ozs7QUFLQU4sRUFBQUEsR0FBRyxDQUFDTyxjQUFKLEdBQXFCLElBQXJCO0FBRUE7Ozs7OztBQUtBUCxFQUFBQSxHQUFHLENBQUNRLGdCQUFKLEdBQXVCLElBQXZCO0FBRUE7Ozs7OztBQUtBUixFQUFBQSxHQUFHLENBQUNTLGVBQUosR0FBc0IsSUFBdEI7QUFFQTs7Ozs7O0FBS0FULEVBQUFBLEdBQUcsQ0FBQ1UsaUJBQUosR0FBd0IsSUFBeEI7QUFFQTs7Ozs7O0FBS0FWLEVBQUFBLEdBQUcsQ0FBQ1csa0JBQUosR0FBeUIsSUFBekI7QUFFQTs7Ozs7O0FBS0FYLEVBQUFBLEdBQUcsQ0FBQ1ksbUJBQUosR0FBMEIsSUFBMUI7QUFFQTs7Ozs7O0FBS0FaLEVBQUFBLEdBQUcsQ0FBQ2EsZUFBSixHQUFzQixJQUF0QjtBQUVBOzs7Ozs7QUFLQWIsRUFBQUEsR0FBRyxDQUFDYyxrQkFBSixHQUF5QixJQUF6QjtBQUVBOzs7Ozs7QUFLQWQsRUFBQUEsR0FBRyxDQUFDZSxlQUFKLEdBQXNCLElBQXRCO0FBRUE7Ozs7OztBQUtBZixFQUFBQSxHQUFHLENBQUNnQixnQkFBSixHQUF1QixJQUF2QjtBQUVBOzs7Ozs7QUFLQWhCLEVBQUFBLEdBQUcsQ0FBQ2lCLGtCQUFKLEdBQXlCLElBQXpCO0FBRUE7Ozs7OztBQUtBakIsRUFBQUEsR0FBRyxDQUFDa0IsaUJBQUosR0FBd0IsSUFBeEI7QUFFQTs7Ozs7O0FBS0FsQixFQUFBQSxHQUFHLENBQUNtQixrQkFBSixHQUF5QixJQUF6QjtBQUVBOzs7Ozs7QUFLQW5CLEVBQUFBLEdBQUcsQ0FBQ29CLGdCQUFKLEdBQXVCLFNBQXZCO0FBRUE7Ozs7O0FBSUFwQixFQUFBQSxHQUFHLENBQUNxQixNQUFKLEdBQWEsS0FBYjtBQUNBOzs7OztBQUlBckIsRUFBQUEsR0FBRyxDQUFDc0IsVUFBSixHQUFpQixTQUFqQjtBQUNBOzs7OztBQUlBdEIsRUFBQUEsR0FBRyxDQUFDdUIsVUFBSixHQUFpQixTQUFqQjtBQUNBOzs7OztBQUlBdkIsRUFBQUEsR0FBRyxDQUFDd0IsWUFBSixHQUFtQixXQUFuQjtBQUNBOzs7OztBQUlBeEIsRUFBQUEsR0FBRyxDQUFDeUIsUUFBSixHQUFlLE9BQWY7QUFDQTs7Ozs7QUFJQXpCLEVBQUFBLEdBQUcsQ0FBQzBCLE9BQUosR0FBYyxNQUFkO0FBQ0E7Ozs7O0FBSUExQixFQUFBQSxHQUFHLENBQUMyQixhQUFKLEdBQW9CLFlBQXBCO0FBQ0E7Ozs7O0FBSUEzQixFQUFBQSxHQUFHLENBQUM0QixNQUFKLEdBQWEsTUFBYjtBQUNBOzs7OztBQUlBNUIsRUFBQUEsR0FBRyxDQUFDNkIsTUFBSixHQUFhLEtBQWI7QUFDQTs7Ozs7QUFJQTdCLEVBQUFBLEdBQUcsQ0FBQzhCLFFBQUosR0FBZSxPQUFmO0FBQ0E7Ozs7O0FBSUE5QixFQUFBQSxHQUFHLENBQUMrQixVQUFKLEdBQWlCLFNBQWpCO0FBRUE7Ozs7OztBQUtBL0IsRUFBQUEsR0FBRyxDQUFDZ0MsT0FBSixHQUFjLENBQUMsQ0FBZjtBQUNBOzs7Ozs7QUFLQWhDLEVBQUFBLEdBQUcsQ0FBQ2lDLEtBQUosR0FBWSxDQUFaO0FBQ0E7Ozs7OztBQUtBakMsRUFBQUEsR0FBRyxDQUFDa0MsS0FBSixHQUFZLENBQVo7QUFDQTs7Ozs7O0FBS0FsQyxFQUFBQSxHQUFHLENBQUNtQyxLQUFKLEdBQVksQ0FBWjtBQUNBOzs7Ozs7QUFLQW5DLEVBQUFBLEdBQUcsQ0FBQ29DLE9BQUosR0FBYyxDQUFkO0FBQ0E7Ozs7OztBQUtBcEMsRUFBQUEsR0FBRyxDQUFDcUMsTUFBSixHQUFhLENBQWI7QUFDQTs7Ozs7O0FBS0FyQyxFQUFBQSxHQUFHLENBQUNzQyxJQUFKLEdBQVcsQ0FBWDtBQUNBOzs7Ozs7QUFLQXRDLEVBQUFBLEdBQUcsQ0FBQ3VDLFVBQUosR0FBaUIsQ0FBakI7QUFDQTs7Ozs7O0FBS0F2QyxFQUFBQSxHQUFHLENBQUN3QyxJQUFKLEdBQVcsQ0FBWDtBQUNBOzs7Ozs7QUFLQXhDLEVBQUFBLEdBQUcsQ0FBQ3lDLFVBQUosR0FBaUIsQ0FBakI7QUFDQTs7Ozs7O0FBS0F6QyxFQUFBQSxHQUFHLENBQUMwQyxLQUFKLEdBQVksQ0FBWjtBQUNBOzs7Ozs7QUFLQTFDLEVBQUFBLEdBQUcsQ0FBQzJDLEtBQUosR0FBWSxFQUFaO0FBQ0E7Ozs7OztBQUtBM0MsRUFBQUEsR0FBRyxDQUFDNEMsR0FBSixHQUFVLEVBQVY7QUFDQTs7Ozs7O0FBS0E1QyxFQUFBQSxHQUFHLENBQUM2QyxjQUFKLEdBQXFCLEdBQXJCO0FBQ0E7Ozs7OztBQUtBN0MsRUFBQUEsR0FBRyxDQUFDOEMsZUFBSixHQUFzQixHQUF0QjtBQUVBOzs7Ozs7O0FBTUE5QyxFQUFBQSxHQUFHLENBQUMrQyxXQUFKLEdBQWtCLEdBQWxCO0FBQ0E7Ozs7Ozs7QUFNQS9DLEVBQUFBLEdBQUcsQ0FBQ2dELFdBQUosR0FBa0IsR0FBbEI7QUFDQTs7Ozs7O0FBS0FoRCxFQUFBQSxHQUFHLENBQUNpRCxXQUFKLEdBQWtCLEdBQWxCO0FBQ0E7Ozs7OztBQUtBakQsRUFBQUEsR0FBRyxDQUFDa0QsT0FBSixHQUFjLEdBQWQ7QUFDQTs7Ozs7O0FBS0FsRCxFQUFBQSxHQUFHLENBQUNtRCxlQUFKLEdBQXNCLEdBQXRCO0FBQ0E7Ozs7OztBQUtBbkQsRUFBQUEsR0FBRyxDQUFDb0QsVUFBSixHQUFpQixHQUFqQjtBQUNBOzs7Ozs7QUFLQXBELEVBQUFBLEdBQUcsQ0FBQ3FELFNBQUosR0FBZ0IsR0FBaEI7QUFDQTs7Ozs7O0FBS0FyRCxFQUFBQSxHQUFHLENBQUNzRCxTQUFKLEdBQWdCLEdBQWhCO0FBQ0E7Ozs7OztBQUtBdEQsRUFBQUEsR0FBRyxDQUFDdUQsV0FBSixHQUFrQixHQUFsQjtBQUNBOzs7Ozs7QUFLQXZELEVBQUFBLEdBQUcsQ0FBQ3dELFdBQUosR0FBa0IsR0FBbEI7QUFDQTs7Ozs7O0FBS0F4RCxFQUFBQSxHQUFHLENBQUN5RCxRQUFKLEdBQWUsR0FBZjtBQUNBOzs7Ozs7QUFLQXpELEVBQUFBLEdBQUcsQ0FBQzBELFdBQUosR0FBa0IsR0FBbEI7QUFDQTs7Ozs7O0FBS0ExRCxFQUFBQSxHQUFHLENBQUMyRCxlQUFKLEdBQXNCLEdBQXRCO0FBQ0E7Ozs7OztBQUtBM0QsRUFBQUEsR0FBRyxDQUFDNEQsY0FBSixHQUFxQixHQUFyQjtBQUNBOzs7Ozs7QUFLQTVELEVBQUFBLEdBQUcsQ0FBQzZELFFBQUosR0FBZSxHQUFmO0FBQ0E7Ozs7OztBQUtBN0QsRUFBQUEsR0FBRyxDQUFDOEQsY0FBSixHQUFxQixHQUFyQjtBQUNBOzs7Ozs7QUFLQTlELEVBQUFBLEdBQUcsQ0FBQytELGtCQUFKLEdBQXlCLEdBQXpCO0FBQ0E7Ozs7OztBQUtBL0QsRUFBQUEsR0FBRyxDQUFDZ0UsUUFBSixHQUFlLEdBQWY7QUFDQTs7Ozs7OztBQU1BaEUsRUFBQUEsR0FBRyxDQUFDaUUsbUJBQUosR0FBMEIsUUFBMUI7QUFDQTs7Ozs7OztBQU1BakUsRUFBQUEsR0FBRyxDQUFDa0Usb0JBQUosR0FBMkIsZ0JBQTNCO0FBQ0E7Ozs7Ozs7QUFNQWxFLEVBQUFBLEdBQUcsQ0FBQ21FLGVBQUosR0FBc0IsSUFBdEI7QUFDQTs7Ozs7OztBQU1BbkUsRUFBQUEsR0FBRyxDQUFDb0UsaUJBQUosR0FBd0IsTUFBeEI7QUFDQTs7Ozs7OztBQU1BcEUsRUFBQUEsR0FBRyxDQUFDcUUsZUFBSixHQUFzQixXQUF0QjtBQUNBOzs7Ozs7O0FBTUFyRSxFQUFBQSxHQUFHLENBQUNzRSxzQkFBSixHQUE2QixZQUE3QjtBQUNBOzs7Ozs7O0FBTUF0RSxFQUFBQSxHQUFHLENBQUN1RSxlQUFKLEdBQXNCLFdBQXRCO0FBQ0E7Ozs7Ozs7QUFNQXZFLEVBQUFBLEdBQUcsQ0FBQ3dFLGlCQUFKLEdBQXdCLE1BQXhCO0FBQ0E7Ozs7Ozs7QUFNQXhFLEVBQUFBLEdBQUcsQ0FBQ3lFLGdCQUFKLEdBQXVCLFlBQXZCO0FBQ0E7Ozs7Ozs7QUFNQXpFLEVBQUFBLEdBQUcsQ0FBQzBFLHNCQUFKLEdBQTZCLGFBQTdCO0FBQ0E7Ozs7Ozs7QUFNQTFFLEVBQUFBLEdBQUcsQ0FBQzJFLGtCQUFKLEdBQXlCLGNBQXpCO0FBQ0E7Ozs7Ozs7QUFNQTNFLEVBQUFBLEdBQUcsQ0FBQzRFLG9CQUFKLEdBQTJCLFNBQTNCO0FBQ0E7Ozs7Ozs7QUFNQTVFLEVBQUFBLEdBQUcsQ0FBQzZFLGtCQUFKLEdBQXlCLE9BQXpCO0FBQ0E7Ozs7Ozs7QUFNQTdFLEVBQUFBLEdBQUcsQ0FBQzhFLG1CQUFKLEdBQTBCLFFBQTFCO0FBQ0E7Ozs7Ozs7QUFNQTlFLEVBQUFBLEdBQUcsQ0FBQytFLGlCQUFKLEdBQXdCLGFBQXhCO0FBQ0E7Ozs7Ozs7QUFNQS9FLEVBQUFBLEdBQUcsQ0FBQ2dGLG9CQUFKLEdBQTJCLFNBQTNCO0FBQ0E7Ozs7Ozs7QUFNQWhGLEVBQUFBLEdBQUcsQ0FBQ2lGLG1CQUFKLEdBQTBCLFFBQTFCO0FBQ0E7Ozs7Ozs7QUFNQWpGLEVBQUFBLEdBQUcsQ0FBQ2tGLG1CQUFKLEdBQTBCLFFBQTFCO0FBQ0E7Ozs7Ozs7QUFNQWxGLEVBQUFBLEdBQUcsQ0FBQ21GLG1CQUFKLEdBQTBCLFFBQTFCO0FBQ0E7Ozs7Ozs7QUFNQW5GLEVBQUFBLEdBQUcsQ0FBQ29GLGtCQUFKLEdBQXlCLE9BQXpCO0FBQ0E7Ozs7Ozs7QUFNQXBGLEVBQUFBLEdBQUcsQ0FBQ3FGLG1CQUFKLEdBQTBCLE9BQTFCO0FBQ0E7Ozs7Ozs7QUFNQXJGLEVBQUFBLEdBQUcsQ0FBQ3NGLG9CQUFKLEdBQTJCLFNBQTNCO0FBRUE7Ozs7O0FBSUF0RixFQUFBQSxHQUFHLENBQUN1RixRQUFKLEdBQWVDLE1BQU0sSUFBSUMsVUFBekI7QUFHQTs7Ozs7QUFJQXpGLEVBQUFBLEdBQUcsQ0FBQzBGLFNBQUosR0FBZ0IsT0FBT3hHLE1BQVAsS0FBa0IsUUFBbEIsSUFBOEIsT0FBT3lHLFFBQVAsS0FBb0IsUUFBbEQsSUFBOEQsQ0FBQ0gsTUFBL0QsSUFBeUUsQ0FBQ0MsVUFBMUY7QUFFQTs7Ozs7O0FBS0F6RixFQUFBQSxHQUFHLENBQUM0RixXQUFKLEdBQWtCLFVBQVVDLElBQVYsRUFBZ0I7QUFDOUIsV0FBTyxDQUFDLENBQUM5RixFQUFFLENBQUMrRixRQUFILENBQVlDLE1BQVosQ0FBbUJDLEdBQW5CLENBQXVCSCxJQUF2QixDQUFUO0FBQ0gsR0FGRDtBQUlBOzs7Ozs7QUFJQTdGLEVBQUFBLEdBQUcsQ0FBQ2lHLHFCQUFKLEdBQTRCLFlBQVk7QUFDcEMsUUFBSSxDQUFDakcsR0FBRyxDQUFDa0csbUJBQVQsRUFBOEI7QUFDMUIsVUFBTUMsbUJBQW1CLEdBQUcsRUFBNUI7QUFDQSxVQUFNQyxpQkFBaUIsR0FBRyxFQUExQjtBQUVBLFVBQUlDLEVBQUUsR0FBR3RHLEVBQUUsQ0FBQ3VHLElBQUgsQ0FBUUMsY0FBakI7QUFDQSxVQUFJQyxXQUFXLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXTCxFQUFFLENBQUNNLFlBQUgsQ0FBZ0JOLEVBQUUsQ0FBQ08sMEJBQW5CLElBQWlELENBQTVELElBQWlFUixpQkFBbkY7O0FBQ0EsVUFBSUksV0FBVyxHQUFHTCxtQkFBbEIsRUFBdUM7QUFDbkNuRyxRQUFBQSxHQUFHLENBQUNrRyxtQkFBSixHQUEwQixDQUExQjtBQUNILE9BRkQsTUFHSztBQUNEbEcsUUFBQUEsR0FBRyxDQUFDa0csbUJBQUosR0FBMEJDLG1CQUExQjtBQUNIO0FBQ0o7O0FBQ0QsV0FBT25HLEdBQUcsQ0FBQ2tHLG1CQUFYO0FBQ0gsR0FmRDtBQWlCQTs7Ozs7Ozs7Ozs7QUFTRGxHLEVBQUFBLEdBQUcsQ0FBQzZHLGVBQUosR0FBc0IsWUFBWTtBQUM3QixRQUFJQyxXQUFXLEdBQUcvRyxFQUFFLENBQUNnSCxJQUFILENBQVFDLGNBQVIsRUFBbEI7QUFDQSxXQUFPakgsRUFBRSxDQUFDa0gsSUFBSCxDQUFRLENBQVIsRUFBVyxDQUFYLEVBQWNILFdBQVcsQ0FBQ0ksS0FBMUIsRUFBaUNKLFdBQVcsQ0FBQ0ssTUFBN0MsQ0FBUDtBQUNILEdBSEY7O0FBS0MsTUFBSXZILE9BQU8sQ0FBQ3dILGVBQVIsSUFBMkJ4SCxPQUFPLENBQUN3SCxlQUFSLENBQXdCQyxRQUF2RCxFQUFpRTtBQUM3RDtBQUNBekgsSUFBQUEsT0FBTyxDQUFDd0gsZUFBUixDQUF3QkMsUUFBeEIsQ0FBaUNySCxHQUFqQztBQUNILEdBSEQsTUFJSyxJQUFJZixTQUFTLElBQUlxSSxNQUFNLENBQUNDLGFBQXhCLEVBQXVDO0FBQ3hDdkgsSUFBQUEsR0FBRyxDQUFDd0gsUUFBSixHQUFlLEtBQWY7QUFDQXhILElBQUFBLEdBQUcsQ0FBQ1osUUFBSixHQUFlWSxHQUFHLENBQUNnRCxXQUFuQjtBQUNBaEQsSUFBQUEsR0FBRyxDQUFDeUgsUUFBSixHQUFlekgsR0FBRyxDQUFDb0IsZ0JBQW5CO0FBQ0FwQixJQUFBQSxHQUFHLENBQUMwSCxZQUFKLEdBQW1CckksU0FBbkI7QUFDQVcsSUFBQUEsR0FBRyxDQUFDMkgsRUFBSixHQUFVO0FBQ05DLE1BQUFBLE1BQU0sRUFBRTVILEdBQUcsQ0FBQzRCLE1BRE47QUFFTmlHLE1BQUFBLEtBQUssRUFBRTdILEdBQUcsQ0FBQ3VCLFVBRkw7QUFHTnVHLE1BQUFBLEtBQUssRUFBRTlILEdBQUcsQ0FBQ3lCO0FBSEwsS0FBRCxDQUlOc0csT0FBTyxDQUFDM0ksUUFKRixLQUllWSxHQUFHLENBQUMrQixVQUo1QjtBQUtBL0IsSUFBQUEsR0FBRyxDQUFDZ0ksV0FBSixHQUFrQixJQUFsQjtBQUNBaEksSUFBQUEsR0FBRyxDQUFDaUksY0FBSixHQUFxQixJQUFyQjtBQUNBakksSUFBQUEsR0FBRyxDQUFDa0kscUJBQUosR0FBNEI7QUFDeEJoQixNQUFBQSxLQUFLLEVBQUUsQ0FEaUI7QUFFeEJDLE1BQUFBLE1BQU0sRUFBRTtBQUZnQixLQUE1QjtBQUlBbkgsSUFBQUEsR0FBRyxDQUFDbUksWUFBSixHQUFtQjtBQUNmLHFCQUFlO0FBREEsS0FBbkI7QUFHQW5JLElBQUFBLEdBQUcsQ0FBQ29JLGNBQUosR0FBcUIsRUFBckI7QUFDSCxHQXBCSSxNQXFCQSxJQUFJNUMsTUFBTSxJQUFJQyxVQUFkLEVBQTBCO0FBQzNCLFFBQUlyRyxRQUFKOztBQUNBLFFBQUlFLFVBQUosRUFBZ0I7QUFDWkYsTUFBQUEsUUFBUSxHQUFHWSxHQUFHLENBQUNxRCxTQUFmO0FBQ0gsS0FGRCxNQUVPLElBQUk5RCxVQUFKLEVBQWdCO0FBQ25CSCxNQUFBQSxRQUFRLEdBQUdZLEdBQUcsQ0FBQ3NELFNBQWY7QUFDSCxLQUZNLE1BRUEsSUFBSTlELFlBQUosRUFBa0I7QUFDckJKLE1BQUFBLFFBQVEsR0FBR1ksR0FBRyxDQUFDdUQsV0FBZjtBQUNILEtBRk0sTUFFQSxJQUFJOUQsU0FBSixFQUFlO0FBQ2xCTCxNQUFBQSxRQUFRLEdBQUdZLEdBQUcsQ0FBQ3lELFFBQWY7QUFDSCxLQUZNLE1BRUEsSUFBSS9ELFNBQUosRUFBZTtBQUNsQk4sTUFBQUEsUUFBUSxHQUFHWSxHQUFHLENBQUM2RCxRQUFmO0FBQ0gsS0FGTSxNQUVBLElBQUlsRSxVQUFKLEVBQWdCO0FBQ25CUCxNQUFBQSxRQUFRLEdBQUdZLEdBQUcsQ0FBQ2dFLFFBQWY7QUFDSCxLQUZNLE1BR0Y7QUFDRDVFLE1BQUFBLFFBQVEsR0FBR2lKLGFBQWEsRUFBeEI7QUFDSDs7QUFDRHJJLElBQUFBLEdBQUcsQ0FBQ1osUUFBSixHQUFlQSxRQUFmO0FBQ0FZLElBQUFBLEdBQUcsQ0FBQ3dILFFBQUosR0FBZ0JwSSxRQUFRLEtBQUtZLEdBQUcsQ0FBQ29DLE9BQWpCLElBQ0FoRCxRQUFRLEtBQUtZLEdBQUcsQ0FBQ3NDLElBRGpCLElBRUFsRCxRQUFRLEtBQUtZLEdBQUcsQ0FBQ3FDLE1BRmpCLElBR0FqRCxRQUFRLEtBQUtZLEdBQUcsQ0FBQzRDLEdBSGpCLElBSUF4RCxRQUFRLEtBQUtZLEdBQUcsQ0FBQzBDLEtBSmpCLElBS0F0RCxRQUFRLEtBQUtZLEdBQUcsQ0FBQ3VDLFVBTGpCLElBTUFuRCxRQUFRLEtBQUtZLEdBQUcsQ0FBQ3dELFdBTmpCLElBT0FsRSxVQVBBLElBUUFDLFVBUkEsSUFTQUMsWUFUQSxJQVVBQyxTQVZBLElBV0FDLFNBWGhCO0FBYUFNLElBQUFBLEdBQUcsQ0FBQzJILEVBQUosR0FBU1csT0FBTyxFQUFoQjtBQUNBdEksSUFBQUEsR0FBRyxDQUFDeUgsUUFBSixHQUFlYyxvQkFBb0IsRUFBbkM7QUFDQSxRQUFJYixZQUFKOztBQUNBLFFBQUlsQyxNQUFKLEVBQVk7QUFDUmtDLE1BQUFBLFlBQVksR0FBR2Msd0JBQXdCLEVBQXZDO0FBQ0g7O0FBQ0R4SSxJQUFBQSxHQUFHLENBQUMwSCxZQUFKLEdBQW1CQSxZQUFZLEdBQUdBLFlBQVksQ0FBQ2UsV0FBYixFQUFILEdBQWdDcEosU0FBL0Q7QUFDQVcsSUFBQUEsR0FBRyxDQUFDMEksU0FBSixHQUFnQkMsY0FBYyxFQUE5QjtBQUNBM0ksSUFBQUEsR0FBRyxDQUFDNEksYUFBSixHQUFvQkMsUUFBUSxDQUFDN0ksR0FBRyxDQUFDMEksU0FBTCxDQUE1QjtBQUNBMUksSUFBQUEsR0FBRyxDQUFDZ0ksV0FBSixHQUFrQixJQUFsQjtBQUNBaEksSUFBQUEsR0FBRyxDQUFDaUksY0FBSixHQUFxQixJQUFyQjtBQUVBLFFBQUlhLENBQUMsR0FBRzVKLE1BQU0sQ0FBQzZKLFVBQWY7QUFDQSxRQUFJQyxDQUFDLEdBQUc5SixNQUFNLENBQUMrSixXQUFmO0FBQ0EsUUFBSUMsS0FBSyxHQUFHaEssTUFBTSxDQUFDaUssZ0JBQVAsSUFBMkIsQ0FBdkM7QUFDQW5KLElBQUFBLEdBQUcsQ0FBQ2tJLHFCQUFKLEdBQTRCO0FBQ3hCaEIsTUFBQUEsS0FBSyxFQUFFZ0MsS0FBSyxHQUFHSixDQURTO0FBRXhCM0IsTUFBQUEsTUFBTSxFQUFFK0IsS0FBSyxHQUFHRjtBQUZRLEtBQTVCO0FBS0FoSixJQUFBQSxHQUFHLENBQUNvSixZQUFKLEdBQW1CbEssTUFBTSxDQUFDa0ssWUFBMUI7QUFFQSxRQUFJakIsWUFBSjtBQUNBQSxJQUFBQSxZQUFZLEdBQUduSSxHQUFHLENBQUNtSSxZQUFKLEdBQW1CO0FBQzlCLGdCQUFVLEtBRG9CO0FBRTlCLGdCQUFVLElBRm9CO0FBRzlCLGNBQVE7QUFIc0IsS0FBbEM7O0FBTUQsUUFBSW5JLEdBQUcsQ0FBQ3dILFFBQVIsRUFBa0I7QUFDYlcsTUFBQUEsWUFBWSxDQUFDLGVBQUQsQ0FBWixHQUFnQyxJQUFoQztBQUNBQSxNQUFBQSxZQUFZLENBQUMsU0FBRCxDQUFaLEdBQTBCLElBQTFCO0FBQ0gsS0FIRixNQUdRO0FBQ0g7QUFDQUEsTUFBQUEsWUFBWSxDQUFDLFVBQUQsQ0FBWixHQUEyQixJQUEzQjtBQUNBQSxNQUFBQSxZQUFZLENBQUMsT0FBRCxDQUFaLEdBQXdCLElBQXhCO0FBQ0FBLE1BQUFBLFlBQVksQ0FBQyxTQUFELENBQVosR0FBMEIsS0FBMUI7QUFDSDs7QUFFREEsSUFBQUEsWUFBWSxDQUFDLGFBQUQsQ0FBWixHQUE4QixLQUE5QjtBQUVBbkksSUFBQUEsR0FBRyxDQUFDb0ksY0FBSixHQUFxQjtBQUNqQmlCLE1BQUFBLFFBQVEsRUFBRSxLQURPO0FBRWpCQyxNQUFBQSxTQUFTLEVBQUUsS0FGTTtBQUdqQkMsTUFBQUEsZ0JBQWdCLEVBQUUsS0FIRDtBQUlqQkMsTUFBQUEsTUFBTSxFQUFFLENBQUMsTUFBRDtBQUpTLEtBQXJCO0FBTUgsR0EvRUksTUFnRkE7QUFDRDtBQUNBLFFBQUlDLEdBQUcsR0FBR3ZLLE1BQVY7QUFBQSxRQUFrQndLLEdBQUcsR0FBR0QsR0FBRyxDQUFDRSxTQUE1QjtBQUFBLFFBQXVDQyxHQUFHLEdBQUdqRSxRQUE3QztBQUFBLFFBQXVEa0UsTUFBTSxHQUFHRCxHQUFHLENBQUNFLGVBQXBFO0FBQ0EsUUFBSUMsRUFBRSxHQUFHTCxHQUFHLENBQUNNLFNBQUosQ0FBY3ZCLFdBQWQsRUFBVDs7QUFFQSxRQUFJeEosU0FBSixFQUFlO0FBQ1hlLE1BQUFBLEdBQUcsQ0FBQ3dILFFBQUosR0FBZSxLQUFmO0FBQ0F4SCxNQUFBQSxHQUFHLENBQUNaLFFBQUosR0FBZVksR0FBRyxDQUFDK0MsV0FBbkI7QUFDSCxLQUhELE1BSUs7QUFDRDs7OztBQUlBL0MsTUFBQUEsR0FBRyxDQUFDd0gsUUFBSixHQUFlLDZCQUE2QnlDLElBQTdCLENBQWtDRixFQUFsQyxDQUFmO0FBRUE7Ozs7O0FBSUEsVUFBSSxPQUFPRyxZQUFQLEtBQXdCLFdBQTVCLEVBQXlDO0FBQ3JDbEssUUFBQUEsR0FBRyxDQUFDWixRQUFKLEdBQWVZLEdBQUcsQ0FBQ21ELGVBQW5CO0FBQ0gsT0FGRCxNQUdLO0FBQ0RuRCxRQUFBQSxHQUFHLENBQUNaLFFBQUosR0FBZVksR0FBRyxDQUFDd0gsUUFBSixHQUFleEgsR0FBRyxDQUFDNkMsY0FBbkIsR0FBb0M3QyxHQUFHLENBQUM4QyxlQUF2RDtBQUNIO0FBQ0o7O0FBRUQsUUFBSXFILFlBQVksR0FBR1QsR0FBRyxDQUFDakMsUUFBdkI7QUFDQTBDLElBQUFBLFlBQVksR0FBR0EsWUFBWSxHQUFHQSxZQUFILEdBQWtCVCxHQUFHLENBQUNVLGVBQWpEO0FBRUE7Ozs7Ozs7QUFNQXBLLElBQUFBLEdBQUcsQ0FBQzBILFlBQUosR0FBbUJ5QyxZQUFZLENBQUMxQixXQUFiLEVBQW5CO0FBRUEwQixJQUFBQSxZQUFZLEdBQUdBLFlBQVksR0FBR0EsWUFBWSxDQUFDRSxLQUFiLENBQW1CLEdBQW5CLEVBQXdCLENBQXhCLENBQUgsR0FBZ0NySyxHQUFHLENBQUNDLGdCQUEvRDtBQUVBOzs7OztBQUlBRCxJQUFBQSxHQUFHLENBQUN5SCxRQUFKLEdBQWUwQyxZQUFmLENBN0NDLENBK0NEOztBQUNBLFFBQUlHLFNBQVMsR0FBRyxLQUFoQjtBQUFBLFFBQXVCQyxHQUFHLEdBQUcsS0FBN0I7QUFBQSxRQUFvQzdCLFNBQVMsR0FBRyxFQUFoRDtBQUFBLFFBQW9ERSxhQUFhLEdBQUcsQ0FBcEU7QUFDQSxRQUFJNEIsUUFBUSxHQUFHLDZCQUE2QkMsSUFBN0IsQ0FBa0NWLEVBQWxDLEtBQXlDLDZCQUE2QlUsSUFBN0IsQ0FBa0NmLEdBQUcsQ0FBQ3RLLFFBQXRDLENBQXhEOztBQUNBLFFBQUlvTCxRQUFKLEVBQWM7QUFDVkYsTUFBQUEsU0FBUyxHQUFHLElBQVo7QUFDQTVCLE1BQUFBLFNBQVMsR0FBRzhCLFFBQVEsQ0FBQyxDQUFELENBQVIsSUFBZSxFQUEzQjtBQUNBNUIsTUFBQUEsYUFBYSxHQUFHQyxRQUFRLENBQUNILFNBQUQsQ0FBUixJQUF1QixDQUF2QztBQUNIOztBQUNEOEIsSUFBQUEsUUFBUSxHQUFHLHlDQUF5Q0MsSUFBekMsQ0FBOENWLEVBQTlDLENBQVg7O0FBQ0EsUUFBSVMsUUFBSixFQUFjO0FBQ1ZELE1BQUFBLEdBQUcsR0FBRyxJQUFOO0FBQ0E3QixNQUFBQSxTQUFTLEdBQUc4QixRQUFRLENBQUMsQ0FBRCxDQUFSLElBQWUsRUFBM0I7QUFDQTVCLE1BQUFBLGFBQWEsR0FBR0MsUUFBUSxDQUFDSCxTQUFELENBQVIsSUFBdUIsQ0FBdkM7QUFDSCxLQUpELENBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBLFNBVUssSUFBSSxxQkFBcUIrQixJQUFyQixDQUEwQmYsR0FBRyxDQUFDdEssUUFBOUIsS0FBNENzSyxHQUFHLENBQUN0SyxRQUFKLEtBQWlCLFVBQWpCLElBQStCc0ssR0FBRyxDQUFDZ0IsY0FBbkMsSUFBcURoQixHQUFHLENBQUNnQixjQUFKLEdBQXFCLENBQTFILEVBQThIO0FBQy9ISCxRQUFBQSxHQUFHLEdBQUcsSUFBTjtBQUNBN0IsUUFBQUEsU0FBUyxHQUFHLEVBQVo7QUFDQUUsUUFBQUEsYUFBYSxHQUFHLENBQWhCO0FBQ0g7O0FBRUQsUUFBSStCLE1BQU0sR0FBRzNLLEdBQUcsQ0FBQytCLFVBQWpCO0FBQ0EsUUFBSTJILEdBQUcsQ0FBQ2tCLFVBQUosQ0FBZUMsT0FBZixDQUF1QixLQUF2QixNQUFrQyxDQUFDLENBQXZDLEVBQTBDRixNQUFNLEdBQUczSyxHQUFHLENBQUN1QixVQUFiLENBQTFDLEtBQ0ssSUFBSWdKLEdBQUosRUFBU0ksTUFBTSxHQUFHM0ssR0FBRyxDQUFDcUIsTUFBYixDQUFULEtBQ0EsSUFBSXFJLEdBQUcsQ0FBQ2tCLFVBQUosQ0FBZUMsT0FBZixDQUF1QixLQUF2QixNQUFrQyxDQUFDLENBQXZDLEVBQTBDRixNQUFNLEdBQUczSyxHQUFHLENBQUM0QixNQUFiLENBQTFDLEtBQ0EsSUFBSThILEdBQUcsQ0FBQ2tCLFVBQUosQ0FBZUMsT0FBZixDQUF1QixLQUF2QixNQUFrQyxDQUFDLENBQW5DLElBQXdDbkIsR0FBRyxDQUFDa0IsVUFBSixDQUFlQyxPQUFmLENBQXVCLE9BQXZCLE1BQW9DLENBQUMsQ0FBakYsRUFBb0ZGLE1BQU0sR0FBRzNLLEdBQUcsQ0FBQzhLLE9BQWIsQ0FBcEYsS0FDQSxJQUFJUixTQUFKLEVBQWVLLE1BQU0sR0FBRzNLLEdBQUcsQ0FBQ3NCLFVBQWIsQ0FBZixLQUNBLElBQUlvSSxHQUFHLENBQUNrQixVQUFKLENBQWVDLE9BQWYsQ0FBdUIsT0FBdkIsTUFBb0MsQ0FBQyxDQUFyQyxJQUEwQ2QsRUFBRSxDQUFDYyxPQUFILENBQVcsUUFBWCxNQUF5QixDQUFDLENBQXhFLEVBQTJFRixNQUFNLEdBQUczSyxHQUFHLENBQUN5QixRQUFiO0FBRWhGOzs7OztBQUlBekIsSUFBQUEsR0FBRyxDQUFDMkgsRUFBSixHQUFTZ0QsTUFBVDtBQUNBOzs7OztBQUlBM0ssSUFBQUEsR0FBRyxDQUFDMEksU0FBSixHQUFnQkEsU0FBaEI7QUFDQTs7Ozs7QUFJQTFJLElBQUFBLEdBQUcsQ0FBQzRJLGFBQUosR0FBb0JBLGFBQXBCO0FBRUE7Ozs7O0FBSUE1SSxJQUFBQSxHQUFHLENBQUNnSSxXQUFKLEdBQWtCaEksR0FBRyxDQUFDc0Ysb0JBQXRCO0FBQ0E7O0FBQ0EsS0FBQyxZQUFVO0FBQ1AsVUFBSXlGLFFBQVEsR0FBRyxtSkFBZjtBQUNBLFVBQUlDLFFBQVEsR0FBRyw2QkFBZjtBQUNBLFVBQUlDLFFBQVEsR0FBRyxtREFBZjtBQUNBLFVBQUlDLFlBQVksR0FBR0gsUUFBUSxDQUFDTixJQUFULENBQWNWLEVBQWQsS0FBcUJpQixRQUFRLENBQUNQLElBQVQsQ0FBY1YsRUFBZCxDQUFyQixJQUEwQ2tCLFFBQVEsQ0FBQ1IsSUFBVCxDQUFjVixFQUFkLENBQTdEO0FBRUEsVUFBSS9CLFdBQVcsR0FBR2tELFlBQVksR0FBR0EsWUFBWSxDQUFDLENBQUQsQ0FBWixDQUFnQnpDLFdBQWhCLEVBQUgsR0FBbUN6SSxHQUFHLENBQUNzRixvQkFBckU7QUFFQSxVQUFJMEMsV0FBVyxLQUFLLFFBQWhCLElBQTRCc0MsU0FBaEMsRUFDSXRDLFdBQVcsR0FBR2hJLEdBQUcsQ0FBQ2tFLG9CQUFsQixDQURKLEtBRUssSUFBSThELFdBQVcsS0FBSyxJQUFoQixJQUF3QitCLEVBQUUsQ0FBQ29CLEtBQUgsQ0FBUyx1QkFBVCxDQUE1QixFQUNEbkQsV0FBVyxHQUFHaEksR0FBRyxDQUFDa0Usb0JBQWxCO0FBQ0osVUFBSWtILE9BQU8sR0FBRztBQUNWLDBCQUFrQnBMLEdBQUcsQ0FBQ2lFLG1CQURaO0FBRVYsbUJBQVdqRSxHQUFHLENBQUNtRSxlQUZMO0FBR1YsZ0JBQVFuRSxHQUFHLENBQUNvRSxpQkFIRjtBQUlWLHNCQUFjcEUsR0FBRyxDQUFDeUUsZ0JBSlI7QUFLVixxQkFBYXpFLEdBQUcsQ0FBQzRFLG9CQUxQO0FBTVYsZ0JBQVE1RSxHQUFHLENBQUM2RSxrQkFORjtBQU9WLG9CQUFZN0UsR0FBRyxDQUFDdUU7QUFQTixPQUFkO0FBVUF2RSxNQUFBQSxHQUFHLENBQUNnSSxXQUFKLEdBQWtCb0QsT0FBTyxDQUFDcEQsV0FBRCxDQUFQLElBQXdCQSxXQUExQztBQUNILEtBdkJEO0FBeUJBOzs7Ozs7QUFJQWhJLElBQUFBLEdBQUcsQ0FBQ2lJLGNBQUosR0FBcUIsRUFBckI7QUFDQTs7QUFDQSxLQUFDLFlBQVU7QUFDUCxVQUFJb0QsV0FBVyxHQUFHLDZLQUFsQjtBQUNBLFVBQUlDLFdBQVcsR0FBRyxzRkFBbEI7QUFDQSxVQUFJQyxHQUFHLEdBQUd4QixFQUFFLENBQUNvQixLQUFILENBQVNFLFdBQVQsQ0FBVjtBQUNBLFVBQUcsQ0FBQ0UsR0FBSixFQUFTQSxHQUFHLEdBQUd4QixFQUFFLENBQUNvQixLQUFILENBQVNHLFdBQVQsQ0FBTjtBQUNUdEwsTUFBQUEsR0FBRyxDQUFDaUksY0FBSixHQUFxQnNELEdBQUcsR0FBR0EsR0FBRyxDQUFDLENBQUQsQ0FBTixHQUFZLEVBQXBDO0FBQ0gsS0FORDs7QUFRQSxRQUFJekMsQ0FBQyxHQUFHNUosTUFBTSxDQUFDNkosVUFBUCxJQUFxQnBELFFBQVEsQ0FBQ21FLGVBQVQsQ0FBeUIwQixXQUF0RDtBQUNBLFFBQUl4QyxDQUFDLEdBQUc5SixNQUFNLENBQUMrSixXQUFQLElBQXNCdEQsUUFBUSxDQUFDbUUsZUFBVCxDQUF5QjJCLFlBQXZEO0FBQ0EsUUFBSXZDLEtBQUssR0FBR2hLLE1BQU0sQ0FBQ2lLLGdCQUFQLElBQTJCLENBQXZDO0FBRUE7Ozs7O0FBSUFuSixJQUFBQSxHQUFHLENBQUNrSSxxQkFBSixHQUE0QjtBQUN4QmhCLE1BQUFBLEtBQUssRUFBRWdDLEtBQUssR0FBR0osQ0FEUztBQUV4QjNCLE1BQUFBLE1BQU0sRUFBRStCLEtBQUssR0FBR0Y7QUFGUSxLQUE1Qjs7QUFLQWhKLElBQUFBLEdBQUcsQ0FBQzBMLHFCQUFKLEdBQTRCLFlBQVk7QUFDcEMsVUFBSTNMLEVBQUUsQ0FBQ3VHLElBQUgsQ0FBUXFGLFVBQVIsS0FBdUI1TCxFQUFFLENBQUN1RyxJQUFILENBQVFzRixpQkFBbkMsRUFDSSxNQUFNLElBQUlDLEtBQUosQ0FBVSwrQ0FBVixDQUFOO0FBQ1AsS0FIRDs7QUFLQSxRQUFJQyxXQUFXLEdBQUduRyxRQUFRLENBQUNvRyxhQUFULENBQXVCLFFBQXZCLENBQWxCOztBQUVBLFFBQUlDLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBVUMsTUFBVixFQUFrQkMsV0FBbEIsRUFBK0JDLGVBQS9CLEVBQWdEO0FBQ2xFLFVBQUlBLGVBQUosRUFBcUI7QUFDakIsWUFBSTtBQUNBLGlCQUFPRixNQUFNLENBQUNHLFVBQVAsQ0FBa0JELGVBQWxCLEVBQW1DRCxXQUFuQyxDQUFQO0FBQ0gsU0FGRCxDQUVFLE9BQU9HLENBQVAsRUFBVTtBQUNSLGlCQUFPLElBQVA7QUFDSDtBQUNKLE9BTkQsTUFPSztBQUNELGVBQU9MLGVBQWUsQ0FBQ0MsTUFBRCxFQUFTQyxXQUFULEVBQXNCLE9BQXRCLENBQWYsSUFDSEYsZUFBZSxDQUFDQyxNQUFELEVBQVNDLFdBQVQsRUFBc0Isb0JBQXRCLENBRFosSUFFSEYsZUFBZSxDQUFDQyxNQUFELEVBQVNDLFdBQVQsRUFBc0IsV0FBdEIsQ0FGWixJQUdIRixlQUFlLENBQUNDLE1BQUQsRUFBU0MsV0FBVCxFQUFzQixXQUF0QixDQUhaLElBSUgsSUFKSjtBQUtIO0FBQ0osS0FmRDtBQWlCQTs7Ozs7O0FBSUEsUUFBSTtBQUNBLFVBQUk5QyxZQUFZLEdBQUdwSixHQUFHLENBQUNvSixZQUFKLEdBQW1CSyxHQUFHLENBQUNMLFlBQTFDO0FBQ0FBLE1BQUFBLFlBQVksQ0FBQ2tELE9BQWIsQ0FBcUIsU0FBckIsRUFBZ0MsRUFBaEM7QUFDQWxELE1BQUFBLFlBQVksQ0FBQ21ELFVBQWIsQ0FBd0IsU0FBeEI7QUFDQW5ELE1BQUFBLFlBQVksR0FBRyxJQUFmO0FBQ0gsS0FMRCxDQUtFLE9BQU9pRCxDQUFQLEVBQVU7QUFDUixVQUFJRyxJQUFJLEdBQUcsU0FBUEEsSUFBTyxHQUFZO0FBQ25Cek0sUUFBQUEsRUFBRSxDQUFDME0sTUFBSCxDQUFVLElBQVY7QUFDSCxPQUZEOztBQUdBek0sTUFBQUEsR0FBRyxDQUFDb0osWUFBSixHQUFtQjtBQUNmc0QsUUFBQUEsT0FBTyxFQUFHRixJQURLO0FBRWZGLFFBQUFBLE9BQU8sRUFBR0UsSUFGSztBQUdmRCxRQUFBQSxVQUFVLEVBQUdDLElBSEU7QUFJZkcsUUFBQUEsS0FBSyxFQUFHSDtBQUpPLE9BQW5CO0FBTUg7O0FBRUQsUUFBSUksWUFBWSxHQUFHZCxXQUFXLENBQUNlLFNBQVosQ0FBc0IsWUFBdEIsRUFBb0NDLFVBQXBDLENBQStDLGlCQUEvQyxDQUFuQjs7QUFDQSxRQUFJQyxjQUFjLEdBQUcsQ0FBQyxDQUFDakIsV0FBVyxDQUFDTSxVQUFaLENBQXVCLElBQXZCLENBQXZCOztBQUNBLFFBQUlZLGFBQWEsR0FBRyxLQUFwQjs7QUFDQSxRQUFJQyxPQUFKLEVBQWE7QUFDVEQsTUFBQUEsYUFBYSxHQUFHLEtBQWhCO0FBQ0gsS0FGRCxNQUdLLElBQUl2RCxHQUFHLENBQUN5RCxxQkFBUixFQUErQjtBQUNoQ0YsTUFBQUEsYUFBYSxHQUFHLElBQWhCO0FBQ0g7QUFFRDs7Ozs7O0FBSUEsUUFBSTdFLFlBQVksR0FBR25JLEdBQUcsQ0FBQ21JLFlBQUosR0FBbUI7QUFDbEMsZ0JBQVU0RSxjQUR3QjtBQUVsQyxnQkFBVUMsYUFGd0I7QUFHbEMsY0FBUUosWUFIMEI7QUFJbEMscUJBQWU7QUFKbUIsS0FBdEM7O0FBT0EsUUFBSSxPQUFPTyxpQkFBUCxLQUE2QixXQUE3QixJQUE0QyxPQUFPQyxJQUFQLEtBQWdCLFdBQWhFLEVBQTZFO0FBQ3pFdEIsTUFBQUEsV0FBVyxDQUFDNUUsS0FBWixHQUFvQjRFLFdBQVcsQ0FBQzNFLE1BQVosR0FBcUIsQ0FBekM7QUFDQWdHLE1BQUFBLGlCQUFpQixDQUFDckIsV0FBRCxFQUFjLEVBQWQsQ0FBakIsQ0FBbUN1QixJQUFuQyxDQUF3QyxVQUFBQyxXQUFXLEVBQUk7QUFDbkRuRixRQUFBQSxZQUFZLENBQUNtRixXQUFiLEdBQTJCLElBQTNCO0FBQ0FBLFFBQUFBLFdBQVcsQ0FBQ0MsS0FBWixJQUFxQkQsV0FBVyxDQUFDQyxLQUFaLEVBQXJCO0FBQ0gsT0FIRCxXQUdTLFVBQUFDLEdBQUcsRUFBSSxDQUFFLENBSGxCO0FBSUg7O0FBQ0QsUUFBSTNELE1BQU0sQ0FBQyxjQUFELENBQU4sS0FBMkJ4SyxTQUEzQixJQUF3Q3VLLEdBQUcsQ0FBQyxjQUFELENBQUgsS0FBd0J2SyxTQUFoRSxJQUE2RXFLLEdBQUcsQ0FBQytELGdCQUFyRixFQUNJdEYsWUFBWSxDQUFDLFNBQUQsQ0FBWixHQUEwQixJQUExQjtBQUNKLFFBQUkwQixNQUFNLENBQUMsV0FBRCxDQUFOLEtBQXdCeEssU0FBNUIsRUFDSThJLFlBQVksQ0FBQyxPQUFELENBQVosR0FBd0IsSUFBeEI7QUFDSixRQUFJMEIsTUFBTSxDQUFDLFNBQUQsQ0FBTixLQUFzQnhLLFNBQTFCLEVBQ0k4SSxZQUFZLENBQUMsVUFBRCxDQUFaLEdBQTJCLElBQTNCO0FBQ0osUUFBSXNCLEdBQUcsQ0FBQ2lFLGlCQUFKLElBQXlCakUsR0FBRyxDQUFDa0Usc0JBQWpDLEVBQ0l4RixZQUFZLENBQUMsZUFBRCxDQUFaLEdBQWdDLElBQWhDOztBQUVKLFFBQUlDLGNBQUo7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FBYUEsS0FBQyxZQUFVO0FBRVAsVUFBSXdGLEtBQUssR0FBRyxLQUFaO0FBRUEsVUFBSUMsT0FBTyxHQUFHN04sR0FBRyxDQUFDaUksY0FBbEIsQ0FKTyxDQU1QO0FBQ0E7O0FBQ0EsVUFBSTZGLGVBQWUsR0FBRyxDQUFDLEVBQUU1TyxNQUFNLENBQUM2TyxZQUFQLElBQXVCN08sTUFBTSxDQUFDOE8sa0JBQTlCLElBQW9EOU8sTUFBTSxDQUFDK08sZUFBN0QsQ0FBdkI7QUFFQTdGLE1BQUFBLGNBQWMsR0FBRztBQUFFaUIsUUFBQUEsUUFBUSxFQUFFLEtBQVo7QUFBbUJDLFFBQUFBLFNBQVMsRUFBRXdFLGVBQTlCO0FBQStDdkUsUUFBQUEsZ0JBQWdCLEVBQUU7QUFBakUsT0FBakI7O0FBRUEsVUFBSXZKLEdBQUcsQ0FBQzJILEVBQUosS0FBVzNILEdBQUcsQ0FBQ3FCLE1BQW5CLEVBQTJCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBK0csUUFBQUEsY0FBYyxDQUFDOEYsZ0JBQWYsR0FBa0MsZ0JBQWxDO0FBQ0g7O0FBRUQsVUFBSWxPLEdBQUcsQ0FBQ2dJLFdBQUosS0FBb0JoSSxHQUFHLENBQUNnRixvQkFBNUIsRUFBa0Q7QUFDOUNvRCxRQUFBQSxjQUFjLENBQUNtQixnQkFBZixHQUFrQyxJQUFsQztBQUNBbkIsUUFBQUEsY0FBYyxDQUFDOEYsZ0JBQWYsR0FBa0MsU0FBbEM7QUFDSDs7QUFFRCxVQUFJbE8sR0FBRyxDQUFDMkgsRUFBSixLQUFXM0gsR0FBRyxDQUFDc0IsVUFBbkIsRUFBK0I7QUFDM0IsWUFBSXRCLEdBQUcsQ0FBQ2dJLFdBQUosS0FBb0JoSSxHQUFHLENBQUN1RSxlQUE1QixFQUE2QztBQUN6QzZELFVBQUFBLGNBQWMsQ0FBQytGLFVBQWYsR0FBNEIsSUFBNUI7QUFDSDtBQUNKOztBQUVELFVBQUdQLEtBQUgsRUFBUztBQUNMUSxRQUFBQSxVQUFVLENBQUMsWUFBVTtBQUNqQnJPLFVBQUFBLEVBQUUsQ0FBQ3NPLEdBQUgsQ0FBTyxrQkFBa0JyTyxHQUFHLENBQUNnSSxXQUE3QjtBQUNBakksVUFBQUEsRUFBRSxDQUFDc08sR0FBSCxDQUFPLHFCQUFxQlIsT0FBNUI7QUFDQTlOLFVBQUFBLEVBQUUsQ0FBQ3NPLEdBQUgsQ0FBTyxvQkFBb0JqRyxjQUFjLENBQUNrRyxhQUExQztBQUNBdk8sVUFBQUEsRUFBRSxDQUFDc08sR0FBSCxDQUFPLGdCQUFnQmpHLGNBQWMsQ0FBQ2tCLFNBQXRDO0FBQ0F2SixVQUFBQSxFQUFFLENBQUNzTyxHQUFILENBQU8sZUFBZWpHLGNBQWMsQ0FBQ21HLFFBQXJDO0FBQ0gsU0FOUyxFQU1QLENBTk8sQ0FBVjtBQU9IO0FBQ0osS0F2Q0Q7O0FBeUNBLFFBQUk7QUFDQSxVQUFJbkcsY0FBYyxDQUFDa0IsU0FBbkIsRUFBOEI7QUFDMUJsQixRQUFBQSxjQUFjLENBQUNvRyxPQUFmLEdBQXlCLEtBQUt0UCxNQUFNLENBQUM2TyxZQUFQLElBQXVCN08sTUFBTSxDQUFDOE8sa0JBQTlCLElBQW9EOU8sTUFBTSxDQUFDK08sZUFBaEUsR0FBekI7O0FBQ0EsWUFBRzdGLGNBQWMsQ0FBQ21CLGdCQUFsQixFQUFvQztBQUNoQzZFLFVBQUFBLFVBQVUsQ0FBQyxZQUFVO0FBQUVoRyxZQUFBQSxjQUFjLENBQUNvRyxPQUFmLEdBQXlCLEtBQUt0UCxNQUFNLENBQUM2TyxZQUFQLElBQXVCN08sTUFBTSxDQUFDOE8sa0JBQTlCLElBQW9EOU8sTUFBTSxDQUFDK08sZUFBaEUsR0FBekI7QUFBOEcsV0FBM0gsRUFBNkgsQ0FBN0gsQ0FBVjtBQUNIO0FBQ0o7QUFDSixLQVBELENBT0UsT0FBTVEsS0FBTixFQUFhO0FBQ1hyRyxNQUFBQSxjQUFjLENBQUNrQixTQUFmLEdBQTJCLEtBQTNCO0FBQ0F2SixNQUFBQSxFQUFFLENBQUMyTyxLQUFILENBQVMsSUFBVDtBQUNIOztBQUVELFFBQUlDLGFBQWEsR0FBRyxFQUFwQjs7QUFFQSxLQUFDLFlBQVU7QUFDUCxVQUFJQyxLQUFLLEdBQUdqSixRQUFRLENBQUNvRyxhQUFULENBQXVCLE9BQXZCLENBQVo7O0FBQ0EsVUFBRzZDLEtBQUssQ0FBQ0MsV0FBVCxFQUFzQjtBQUNsQixZQUFJQyxHQUFHLEdBQUdGLEtBQUssQ0FBQ0MsV0FBTixDQUFrQiw0QkFBbEIsQ0FBVjtBQUNBLFlBQUlDLEdBQUosRUFBU0gsYUFBYSxDQUFDSSxJQUFkLENBQW1CLE1BQW5CO0FBQ1QsWUFBSUMsR0FBRyxHQUFHSixLQUFLLENBQUNDLFdBQU4sQ0FBa0IsWUFBbEIsQ0FBVjtBQUNBLFlBQUlHLEdBQUosRUFBU0wsYUFBYSxDQUFDSSxJQUFkLENBQW1CLE1BQW5CO0FBQ1QsWUFBSUUsR0FBRyxHQUFHTCxLQUFLLENBQUNDLFdBQU4sQ0FBa0IsdUJBQWxCLENBQVY7QUFDQSxZQUFJSSxHQUFKLEVBQVNOLGFBQWEsQ0FBQ0ksSUFBZCxDQUFtQixNQUFuQjtBQUNULFlBQUlHLEdBQUcsR0FBR04sS0FBSyxDQUFDQyxXQUFOLENBQWtCLFdBQWxCLENBQVY7QUFDQSxZQUFJSyxHQUFKLEVBQVNQLGFBQWEsQ0FBQ0ksSUFBZCxDQUFtQixNQUFuQjtBQUNULFlBQUlJLEdBQUcsR0FBR1AsS0FBSyxDQUFDQyxXQUFOLENBQWtCLGFBQWxCLENBQVY7QUFDQSxZQUFJTSxHQUFKLEVBQVNSLGFBQWEsQ0FBQ0ksSUFBZCxDQUFtQixNQUFuQjtBQUNaO0FBQ0osS0FkRDs7QUFlQTNHLElBQUFBLGNBQWMsQ0FBQ29CLE1BQWYsR0FBd0JtRixhQUF4QjtBQUVBM08sSUFBQUEsR0FBRyxDQUFDb0ksY0FBSixHQUFxQkEsY0FBckI7QUFDSDtBQUVEOzs7Ozs7Ozs7O0FBUUFwSSxFQUFBQSxHQUFHLENBQUNvUCxXQUFKLEdBQWtCO0FBQ2Q7Ozs7Ozs7O0FBUUFDLElBQUFBLElBQUksRUFBRSxDQVRROztBQVVkOzs7Ozs7OztBQVFBQyxJQUFBQSxHQUFHLEVBQUUsQ0FsQlM7O0FBbUJkOzs7Ozs7OztBQVFBQyxJQUFBQSxJQUFJLEVBQUU7QUEzQlEsR0FBbEI7QUE4QkE7Ozs7QUFJQTs7Ozs7Ozs7OztBQVNBdlAsRUFBQUEsR0FBRyxDQUFDd1AsY0FBSixHQUFxQixZQUFXO0FBQzVCO0FBQ0EsV0FBT3hQLEdBQUcsQ0FBQ29QLFdBQUosQ0FBZ0JFLEdBQXZCO0FBQ0gsR0FIRDtBQUtBOzs7Ozs7Ozs7OztBQVNBdFAsRUFBQUEsR0FBRyxDQUFDeVAsZUFBSixHQUFzQixZQUFXO0FBQzdCO0FBQ0EsV0FBTyxHQUFQO0FBQ0gsR0FIRDtBQUtBOzs7Ozs7QUFJQXpQLEVBQUFBLEdBQUcsQ0FBQzBQLGNBQUosR0FBcUIsWUFBWSxDQUM3QjtBQUNILEdBRkQ7QUFJQTs7Ozs7O0FBSUExUCxFQUFBQSxHQUFHLENBQUMyUCxTQUFKLEdBQWdCLFlBQVksQ0FDeEI7QUFDSCxHQUZEO0FBSUE7Ozs7Ozs7Ozs7QUFRQTNQLEVBQUFBLEdBQUcsQ0FBQzRQLGFBQUosR0FBb0IsVUFBVUMsR0FBVixFQUFlO0FBQy9CLFFBQUlBLEdBQUosRUFBUztBQUNMLGFBQU8sSUFBUDtBQUNIOztBQUNELFdBQU8sS0FBUDtBQUNILEdBTEQ7QUFPQTs7Ozs7O0FBSUE3UCxFQUFBQSxHQUFHLENBQUM4UCxJQUFKLEdBQVcsWUFBWTtBQUNuQixRQUFJQyxJQUFJLEdBQUcsSUFBWDtBQUNBLFFBQUlDLEdBQUcsR0FBRyxFQUFWO0FBQ0FBLElBQUFBLEdBQUcsSUFBSSxnQkFBZ0JELElBQUksQ0FBQ3ZJLFFBQXJCLEdBQWdDLE1BQXZDO0FBQ0F3SSxJQUFBQSxHQUFHLElBQUksZ0JBQWdCRCxJQUFJLENBQUN0SSxRQUFyQixHQUFnQyxNQUF2QztBQUNBdUksSUFBQUEsR0FBRyxJQUFJLG1CQUFtQkQsSUFBSSxDQUFDL0gsV0FBeEIsR0FBc0MsTUFBN0M7QUFDQWdJLElBQUFBLEdBQUcsSUFBSSxzQkFBc0JELElBQUksQ0FBQzlILGNBQTNCLEdBQTRDLE1BQW5EO0FBQ0ErSCxJQUFBQSxHQUFHLElBQUksb0JBQW9CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUgsSUFBSSxDQUFDNUgsWUFBcEIsQ0FBcEIsR0FBd0QsTUFBL0Q7QUFDQTZILElBQUFBLEdBQUcsSUFBSSxVQUFVRCxJQUFJLENBQUNwSSxFQUFmLEdBQW9CLE1BQTNCO0FBQ0FxSSxJQUFBQSxHQUFHLElBQUksaUJBQWlCRCxJQUFJLENBQUNySCxTQUF0QixHQUFrQyxNQUF6QztBQUNBc0gsSUFBQUEsR0FBRyxJQUFJLGdCQUFnQkQsSUFBSSxDQUFDM1EsUUFBckIsR0FBZ0MsTUFBdkM7QUFDQTRRLElBQUFBLEdBQUcsSUFBSSxZQUFZalEsRUFBRSxDQUFDdUcsSUFBSCxDQUFRcUYsVUFBUixLQUF1QjVMLEVBQUUsQ0FBQ3VHLElBQUgsQ0FBUXNGLGlCQUEvQixHQUFtRCxPQUFuRCxHQUE2RCxRQUF6RSxJQUFxRixZQUFyRixHQUFvRyxNQUEzRztBQUNBN0wsSUFBQUEsRUFBRSxDQUFDc08sR0FBSCxDQUFPMkIsR0FBUDtBQUNILEdBYkQ7QUFlQTs7Ozs7OztBQUtBaFEsRUFBQUEsR0FBRyxDQUFDbVEsT0FBSixHQUFjLFVBQVVDLEdBQVYsRUFBZTtBQUN6QixRQUFJNUssTUFBTSxJQUFJQyxVQUFkLEVBQTBCO0FBQ3RCNEssTUFBQUEsR0FBRyxDQUFDRixPQUFKLENBQVlDLEdBQVo7QUFDSCxLQUZELE1BR0s7QUFDRGxSLE1BQUFBLE1BQU0sQ0FBQ29SLElBQVAsQ0FBWUYsR0FBWjtBQUNIO0FBQ0osR0FQRDtBQVNBOzs7Ozs7O0FBS0FwUSxFQUFBQSxHQUFHLENBQUN1USxHQUFKLEdBQVUsWUFBWTtBQUNsQixRQUFJQyxJQUFJLENBQUNELEdBQVQsRUFBYztBQUNWLGFBQU9DLElBQUksQ0FBQ0QsR0FBTCxFQUFQO0FBQ0gsS0FGRCxNQUdLO0FBQ0QsYUFBTyxDQUFFLElBQUlDLElBQUosRUFBVDtBQUNIO0FBQ0osR0FQRDs7QUFTQSxTQUFPeFEsR0FBUDtBQUNIOztBQUVELElBQUlBLEdBQUcsR0FBR0QsRUFBRSxJQUFJQSxFQUFFLENBQUNDLEdBQVQsR0FBZUQsRUFBRSxDQUFDQyxHQUFsQixHQUF3QkYsT0FBTyxFQUF6QztBQUVBMlEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCMVEsR0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmxldCBzZXR0aW5nUGxhdGZvcm07XG4gaWYgKCFDQ19FRElUT1IpIHtcbiAgICBzZXR0aW5nUGxhdGZvcm0gPSB3aW5kb3cuX0NDU2V0dGluZ3MgPyBfQ0NTZXR0aW5ncy5wbGF0Zm9ybTogdW5kZWZpbmVkO1xuIH1cbmNvbnN0IGlzVml2b0dhbWUgPSAoc2V0dGluZ1BsYXRmb3JtID09PSAncWdhbWUnKTtcbmNvbnN0IGlzT3Bwb0dhbWUgPSAoc2V0dGluZ1BsYXRmb3JtID09PSAncXVpY2tnYW1lJyk7XG5jb25zdCBpc0h1YXdlaUdhbWUgPSAoc2V0dGluZ1BsYXRmb3JtID09PSAnaHVhd2VpJyk7XG5jb25zdCBpc0pLV0dhbWUgPSAoc2V0dGluZ1BsYXRmb3JtID09PSAnamt3LWdhbWUnKTtcbmNvbnN0IGlzUXR0R2FtZSA9IChzZXR0aW5nUGxhdGZvcm0gPT09ICdxdHQtZ2FtZScpO1xuY29uc3QgaXNMaW5rU3VyZSA9IChzZXR0aW5nUGxhdGZvcm0gPT09ICdsaW5rLXN1cmUnKTtcblxuY29uc3QgX2dsb2JhbCA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93O1xuIFxuZnVuY3Rpb24gaW5pdFN5cyAoKSB7XG4gICAgLyoqXG4gICAgICogU3lzdGVtIHZhcmlhYmxlc1xuICAgICAqIEBjbGFzcyBzeXNcbiAgICAgKiBAbWFpblxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBjYy5zeXMgPSB7fTtcbiAgICB2YXIgc3lzID0gY2Muc3lzO1xuXG4gICAgLyoqXG4gICAgICogRW5nbGlzaCBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX0VOR0xJU0hcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuTEFOR1VBR0VfRU5HTElTSCA9IFwiZW5cIjtcblxuICAgIC8qKlxuICAgICAqIENoaW5lc2UgbGFuZ3VhZ2UgY29kZVxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMQU5HVUFHRV9DSElORVNFXG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG4gICAgc3lzLkxBTkdVQUdFX0NISU5FU0UgPSBcInpoXCI7XG5cbiAgICAvKipcbiAgICAgKiBGcmVuY2ggbGFuZ3VhZ2UgY29kZVxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMQU5HVUFHRV9GUkVOQ0hcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuTEFOR1VBR0VfRlJFTkNIID0gXCJmclwiO1xuXG4gICAgLyoqXG4gICAgICogSXRhbGlhbiBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX0lUQUxJQU5cbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuTEFOR1VBR0VfSVRBTElBTiA9IFwiaXRcIjtcblxuICAgIC8qKlxuICAgICAqIEdlcm1hbiBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX0dFUk1BTlxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5MQU5HVUFHRV9HRVJNQU4gPSBcImRlXCI7XG5cbiAgICAvKipcbiAgICAgKiBTcGFuaXNoIGxhbmd1YWdlIGNvZGVcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfU1BBTklTSFxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5MQU5HVUFHRV9TUEFOSVNIID0gXCJlc1wiO1xuXG4gICAgLyoqXG4gICAgICogU3BhbmlzaCBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX0RVVENIXG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG4gICAgc3lzLkxBTkdVQUdFX0RVVENIID0gXCJkdVwiO1xuXG4gICAgLyoqXG4gICAgICogUnVzc2lhbiBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX1JVU1NJQU5cbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuTEFOR1VBR0VfUlVTU0lBTiA9IFwicnVcIjtcblxuICAgIC8qKlxuICAgICAqIEtvcmVhbiBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX0tPUkVBTlxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5MQU5HVUFHRV9LT1JFQU4gPSBcImtvXCI7XG5cbiAgICAvKipcbiAgICAgKiBKYXBhbmVzZSBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX0pBUEFORVNFXG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG4gICAgc3lzLkxBTkdVQUdFX0pBUEFORVNFID0gXCJqYVwiO1xuXG4gICAgLyoqXG4gICAgICogSHVuZ2FyaWFuIGxhbmd1YWdlIGNvZGVcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfSFVOR0FSSUFOXG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgc3lzLkxBTkdVQUdFX0hVTkdBUklBTiA9IFwiaHVcIjtcblxuICAgIC8qKlxuICAgICAqIFBvcnR1Z3Vlc2UgbGFuZ3VhZ2UgY29kZVxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMQU5HVUFHRV9QT1JUVUdVRVNFXG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG4gICAgc3lzLkxBTkdVQUdFX1BPUlRVR1VFU0UgPSBcInB0XCI7XG5cbiAgICAvKipcbiAgICAgKiBBcmFiaWMgbGFuZ3VhZ2UgY29kZVxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMQU5HVUFHRV9BUkFCSUNcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuTEFOR1VBR0VfQVJBQklDID0gXCJhclwiO1xuXG4gICAgLyoqXG4gICAgICogTm9yd2VnaWFuIGxhbmd1YWdlIGNvZGVcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfTk9SV0VHSUFOXG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG4gICAgc3lzLkxBTkdVQUdFX05PUldFR0lBTiA9IFwibm9cIjtcblxuICAgIC8qKlxuICAgICAqIFBvbGlzaCBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX1BPTElTSFxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5MQU5HVUFHRV9QT0xJU0ggPSBcInBsXCI7XG5cbiAgICAvKipcbiAgICAgKiBUdXJraXNoIGxhbmd1YWdlIGNvZGVcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfVFVSS0lTSFxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5MQU5HVUFHRV9UVVJLSVNIID0gXCJ0clwiO1xuXG4gICAgLyoqXG4gICAgICogVWtyYWluaWFuIGxhbmd1YWdlIGNvZGVcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfVUtSQUlOSUFOXG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG4gICAgc3lzLkxBTkdVQUdFX1VLUkFJTklBTiA9IFwidWtcIjtcblxuICAgIC8qKlxuICAgICAqIFJvbWFuaWFuIGxhbmd1YWdlIGNvZGVcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfUk9NQU5JQU5cbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuTEFOR1VBR0VfUk9NQU5JQU4gPSBcInJvXCI7XG5cbiAgICAvKipcbiAgICAgKiBCdWxnYXJpYW4gbGFuZ3VhZ2UgY29kZVxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMQU5HVUFHRV9CVUxHQVJJQU5cbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuTEFOR1VBR0VfQlVMR0FSSUFOID0gXCJiZ1wiO1xuXG4gICAgLyoqXG4gICAgICogVW5rbm93biBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX1VOS05PV05cbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuTEFOR1VBR0VfVU5LTk9XTiA9IFwidW5rbm93blwiO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IE9TX0lPU1xuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5PU19JT1MgPSBcImlPU1wiO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBPU19BTkRST0lEXG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG4gICAgc3lzLk9TX0FORFJPSUQgPSBcIkFuZHJvaWRcIjtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gT1NfV0lORE9XU1xuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5PU19XSU5ET1dTID0gXCJXaW5kb3dzXCI7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IE9TX01BUk1BTEFERVxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5PU19NQVJNQUxBREUgPSBcIk1hcm1hbGFkZVwiO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBPU19MSU5VWFxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5PU19MSU5VWCA9IFwiTGludXhcIjtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gT1NfQkFEQVxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5PU19CQURBID0gXCJCYWRhXCI7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IE9TX0JMQUNLQkVSUllcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuT1NfQkxBQ0tCRVJSWSA9IFwiQmxhY2tiZXJyeVwiO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBPU19PU1hcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuT1NfT1NYID0gXCJPUyBYXCI7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IE9TX1dQOFxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5PU19XUDggPSBcIldQOFwiO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBPU19XSU5SVFxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5PU19XSU5SVCA9IFwiV0lOUlRcIjtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gT1NfVU5LTk9XTlxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5PU19VTktOT1dOID0gXCJVbmtub3duXCI7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gVU5LTk9XTlxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IC0xXG4gICAgICovXG4gICAgc3lzLlVOS05PV04gPSAtMTtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gV0lOMzJcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgc3lzLldJTjMyID0gMDtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTElOVVhcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxXG4gICAgICovXG4gICAgc3lzLkxJTlVYID0gMTtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTUFDT1NcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAyXG4gICAgICovXG4gICAgc3lzLk1BQ09TID0gMjtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQU5EUk9JRFxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IDNcbiAgICAgKi9cbiAgICBzeXMuQU5EUk9JRCA9IDM7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IElQSE9ORVxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IDRcbiAgICAgKi9cbiAgICBzeXMuSVBIT05FID0gNDtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gSVBBRFxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IDVcbiAgICAgKi9cbiAgICBzeXMuSVBBRCA9IDU7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEJMQUNLQkVSUllcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCA2XG4gICAgICovXG4gICAgc3lzLkJMQUNLQkVSUlkgPSA2O1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBOQUNMXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgN1xuICAgICAqL1xuICAgIHN5cy5OQUNMID0gNztcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRU1TQ1JJUFRFTlxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IDhcbiAgICAgKi9cbiAgICBzeXMuRU1TQ1JJUFRFTiA9IDg7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFRJWkVOXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgOVxuICAgICAqL1xuICAgIHN5cy5USVpFTiA9IDk7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFdJTlJUXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTBcbiAgICAgKi9cbiAgICBzeXMuV0lOUlQgPSAxMDtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gV1A4XG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTFcbiAgICAgKi9cbiAgICBzeXMuV1A4ID0gMTE7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IE1PQklMRV9CUk9XU0VSXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTAwXG4gICAgICovXG4gICAgc3lzLk1PQklMRV9CUk9XU0VSID0gMTAwO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBERVNLVE9QX0JST1dTRVJcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxMDFcbiAgICAgKi9cbiAgICBzeXMuREVTS1RPUF9CUk9XU0VSID0gMTAxO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgZXhlY3V0ZXMgaW4gZWRpdG9yJ3Mgd2luZG93IHByb2Nlc3MgKEVsZWN0cm9uJ3MgcmVuZGVyZXIgY29udGV4dClcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRURJVE9SX1BBR0VcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxMDJcbiAgICAgKi9cbiAgICBzeXMuRURJVE9SX1BBR0UgPSAxMDI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgZXhlY3V0ZXMgaW4gZWRpdG9yJ3MgbWFpbiBwcm9jZXNzIChFbGVjdHJvbidzIGJyb3dzZXIgY29udGV4dClcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRURJVE9SX0NPUkVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxMDNcbiAgICAgKi9cbiAgICBzeXMuRURJVE9SX0NPUkUgPSAxMDM7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFdFQ0hBVF9HQU1FXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTA0XG4gICAgICovXG4gICAgc3lzLldFQ0hBVF9HQU1FID0gMTA0O1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBRUV9QTEFZXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTA1XG4gICAgICovXG4gICAgc3lzLlFRX1BMQVkgPSAxMDU7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEZCX1BMQVlBQkxFX0FEU1xuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IDEwNlxuICAgICAqL1xuICAgIHN5cy5GQl9QTEFZQUJMRV9BRFMgPSAxMDY7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEJBSURVX0dBTUVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxMDdcbiAgICAgKi9cbiAgICBzeXMuQkFJRFVfR0FNRSA9IDEwNztcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gVklWT19HQU1FXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTA4XG4gICAgICovXG4gICAgc3lzLlZJVk9fR0FNRSA9IDEwODtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gT1BQT19HQU1FXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTA5XG4gICAgICovXG4gICAgc3lzLk9QUE9fR0FNRSA9IDEwOTtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gSFVBV0VJX0dBTUVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxMTBcbiAgICAgKi9cbiAgICBzeXMuSFVBV0VJX0dBTUUgPSAxMTA7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFhJQU9NSV9HQU1FXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTExXG4gICAgICovXG4gICAgc3lzLlhJQU9NSV9HQU1FID0gMTExO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBKS1dfR0FNRVxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IDExMlxuICAgICAqL1xuICAgIHN5cy5KS1dfR0FNRSA9IDExMjtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQUxJUEFZX0dBTUVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxMTNcbiAgICAgKi9cbiAgICBzeXMuQUxJUEFZX0dBTUUgPSAxMTM7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFdFQ0hBVF9HQU1FX1NVQlxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IDExNFxuICAgICAqL1xuICAgIHN5cy5XRUNIQVRfR0FNRV9TVUIgPSAxMTQ7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEJBSURVX0dBTUVfU1VCXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTE1XG4gICAgICovXG4gICAgc3lzLkJBSURVX0dBTUVfU1VCID0gMTE1O1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBRVFRfR0FNRVxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IDExNlxuICAgICAqL1xuICAgIHN5cy5RVFRfR0FNRSA9IDExNjtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQllURURBTkNFX0dBTUVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxMTdcbiAgICAgKi9cbiAgICBzeXMuQllURURBTkNFX0dBTUUgPSAxMTdcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQllURURBTkNFX0dBTUVfU1VCXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTE4XG4gICAgICovXG4gICAgc3lzLkJZVEVEQU5DRV9HQU1FX1NVQiA9IDExODtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTElOS1NVUkVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxMTlcbiAgICAgKi9cbiAgICBzeXMuTElOS1NVUkUgPSAxMTk7XG4gICAgLyoqXG4gICAgICogQlJPV1NFUl9UWVBFX1dFQ0hBVFxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfV0VDSEFUXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgXCJ3ZWNoYXRcIlxuICAgICAqL1xuICAgIHN5cy5CUk9XU0VSX1RZUEVfV0VDSEFUID0gXCJ3ZWNoYXRcIjtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfQU5EUk9JRFxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IFwiYW5kcm9pZGJyb3dzZXJcIlxuICAgICAqL1xuICAgIHN5cy5CUk9XU0VSX1RZUEVfQU5EUk9JRCA9IFwiYW5kcm9pZGJyb3dzZXJcIjtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfSUVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcImllXCJcbiAgICAgKi9cbiAgICBzeXMuQlJPV1NFUl9UWVBFX0lFID0gXCJpZVwiO1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9FREdFXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgXCJlZGdlXCJcbiAgICAgKi9cbiAgICBzeXMuQlJPV1NFUl9UWVBFX0VER0UgPSBcImVkZ2VcIjtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfUVFcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcInFxYnJvd3NlclwiXG4gICAgICovXG4gICAgc3lzLkJST1dTRVJfVFlQRV9RUSA9IFwicXFicm93c2VyXCI7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX01PQklMRV9RUVxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IFwibXFxYnJvd3NlclwiXG4gICAgICovXG4gICAgc3lzLkJST1dTRVJfVFlQRV9NT0JJTEVfUVEgPSBcIm1xcWJyb3dzZXJcIjtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfVUNcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcInVjYnJvd3NlclwiXG4gICAgICovXG4gICAgc3lzLkJST1dTRVJfVFlQRV9VQyA9IFwidWNicm93c2VyXCI7XG4gICAgLyoqXG4gICAgICogdWMgdGhpcmQgcGFydHkgaW50ZWdyYXRpb24uXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9VQ0JTXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgXCJ1Y2JzXCJcbiAgICAgKi9cbiAgICBzeXMuQlJPV1NFUl9UWVBFX1VDQlMgPSBcInVjYnNcIjtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfMzYwXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgXCIzNjBicm93c2VyXCJcbiAgICAgKi9cbiAgICBzeXMuQlJPV1NFUl9UWVBFXzM2MCA9IFwiMzYwYnJvd3NlclwiO1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9CQUlEVV9BUFBcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcImJhaWR1Ym94YXBwXCJcbiAgICAgKi9cbiAgICBzeXMuQlJPV1NFUl9UWVBFX0JBSURVX0FQUCA9IFwiYmFpZHVib3hhcHBcIjtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfQkFJRFVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcImJhaWR1YnJvd3NlclwiXG4gICAgICovXG4gICAgc3lzLkJST1dTRVJfVFlQRV9CQUlEVSA9IFwiYmFpZHVicm93c2VyXCI7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX01BWFRIT05cbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcIm1heHRob25cIlxuICAgICAqL1xuICAgIHN5cy5CUk9XU0VSX1RZUEVfTUFYVEhPTiA9IFwibWF4dGhvblwiO1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9PUEVSQVxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IFwib3BlcmFcIlxuICAgICAqL1xuICAgIHN5cy5CUk9XU0VSX1RZUEVfT1BFUkEgPSBcIm9wZXJhXCI7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX09VUEVOR1xuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IFwib3VwZW5nXCJcbiAgICAgKi9cbiAgICBzeXMuQlJPV1NFUl9UWVBFX09VUEVORyA9IFwib3VwZW5nXCI7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX01JVUlcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcIm1pdWlicm93c2VyXCJcbiAgICAgKi9cbiAgICBzeXMuQlJPV1NFUl9UWVBFX01JVUkgPSBcIm1pdWlicm93c2VyXCI7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX0ZJUkVGT1hcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcImZpcmVmb3hcIlxuICAgICAqL1xuICAgIHN5cy5CUk9XU0VSX1RZUEVfRklSRUZPWCA9IFwiZmlyZWZveFwiO1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9TQUZBUklcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcInNhZmFyaVwiXG4gICAgICovXG4gICAgc3lzLkJST1dTRVJfVFlQRV9TQUZBUkkgPSBcInNhZmFyaVwiO1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9DSFJPTUVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcImNocm9tZVwiXG4gICAgICovXG4gICAgc3lzLkJST1dTRVJfVFlQRV9DSFJPTUUgPSBcImNocm9tZVwiO1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9MSUVCQU9cbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcImxpZWJhb1wiXG4gICAgICovXG4gICAgc3lzLkJST1dTRVJfVFlQRV9MSUVCQU8gPSBcImxpZWJhb1wiO1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9RWk9ORVxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IFwicXpvbmVcIlxuICAgICAqL1xuICAgIHN5cy5CUk9XU0VSX1RZUEVfUVpPTkUgPSBcInF6b25lXCI7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX1NPVUdPVVxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IFwic29nb3VcIlxuICAgICAqL1xuICAgIHN5cy5CUk9XU0VSX1RZUEVfU09VR09VID0gXCJzb2dvdVwiO1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9VTktOT1dOXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgXCJ1bmtub3duXCJcbiAgICAgKi9cbiAgICBzeXMuQlJPV1NFUl9UWVBFX1VOS05PV04gPSBcInVua25vd25cIjtcblxuICAgIC8qKlxuICAgICAqIElzIG5hdGl2ZSA/IFRoaXMgaXMgc2V0IHRvIGJlIHRydWUgaW4ganNiIGF1dG8uXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBpc05hdGl2ZVxuICAgICAqL1xuICAgIHN5cy5pc05hdGl2ZSA9IENDX0pTQiB8fCBDQ19SVU5USU1FO1xuXG5cbiAgICAvKipcbiAgICAgKiBJcyB3ZWIgYnJvd3NlciA/XG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBpc0Jyb3dzZXJcbiAgICAgKi9cbiAgICBzeXMuaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGRvY3VtZW50ID09PSAnb2JqZWN0JyAmJiAhQ0NfSlNCICYmICFDQ19SVU5USU1FO1xuXG4gICAgLyoqXG4gICAgICogSXMgd2ViZ2wgZXh0ZW5zaW9uIHN1cHBvcnQ/XG4gICAgICogQG1ldGhvZCBnbEV4dGVuc2lvblxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICovXG4gICAgc3lzLmdsRXh0ZW5zaW9uID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuICEhY2MucmVuZGVyZXIuZGV2aWNlLmV4dChuYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgbWF4IGpvaW50IG1hdHJpeCBzaXplIGZvciBza2lubmVkIG1lc2ggcmVuZGVyZXIuXG4gICAgICogQG1ldGhvZCBnZXRNYXhKb2ludE1hdHJpeFNpemVcbiAgICAgKi9cbiAgICBzeXMuZ2V0TWF4Sm9pbnRNYXRyaXhTaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXN5cy5fbWF4Sm9pbnRNYXRyaXhTaXplKSB7XG4gICAgICAgICAgICBjb25zdCBKT0lOVF9NQVRSSUNFU19TSVpFID0gNTA7XG4gICAgICAgICAgICBjb25zdCBMRUZUX1VOSUZPUk1fU0laRSA9IDEwO1xuXG4gICAgICAgICAgICBsZXQgZ2wgPSBjYy5nYW1lLl9yZW5kZXJDb250ZXh0O1xuICAgICAgICAgICAgbGV0IG1heFVuaWZvcm1zID0gTWF0aC5mbG9vcihnbC5nZXRQYXJhbWV0ZXIoZ2wuTUFYX1ZFUlRFWF9VTklGT1JNX1ZFQ1RPUlMpIC8gNCkgLSBMRUZUX1VOSUZPUk1fU0laRTtcbiAgICAgICAgICAgIGlmIChtYXhVbmlmb3JtcyA8IEpPSU5UX01BVFJJQ0VTX1NJWkUpIHtcbiAgICAgICAgICAgICAgICBzeXMuX21heEpvaW50TWF0cml4U2l6ZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzeXMuX21heEpvaW50TWF0cml4U2l6ZSA9IEpPSU5UX01BVFJJQ0VTX1NJWkU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN5cy5fbWF4Sm9pbnRNYXRyaXhTaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSBzYWZlIGFyZWEgb2YgdGhlIHNjcmVlbi4gSWYgdGhlIHNjcmVlbiBpcyBub3Qgbm90Y2hlZCwgdGhlIGRlc2lnbiByZXNvbHV0aW9uIHdpbGwgYmUgcmV0dXJuZWQgYnkgZGVmYXVsdC5cbiAgICAgKiBPbmx5IHN1cHBvcnRlZCBvbiBBbmRyb2lkLCBpT1MgYW5kIFdlQ2hhdCBNaW5pIEdhbWUgcGxhdGZvcm0uXG4gICAgICogISN6aFxuICAgICAqIOi/lOWbnuaJi+acuuWxj+W5leWuieWFqOWMuuWfn++8jOWmguaenOS4jeaYr+W8guW9ouWxj+Wwhum7mOiupOi/lOWbnuiuvuiuoeWIhui+qOeOh+WwuuWvuOOAguebruWJjeWPquaUr+aMgeWuieWNk+OAgWlPUyDljp/nlJ/lubPlj7Dlkozlvq7kv6HlsI/muLjmiI/lubPlj7DjgIJcbiAgICAgKiBAbWV0aG9kIGdldFNhZmVBcmVhUmVjdFxuICAgICAqIEByZXR1cm4ge1JlY3R9XG4gICAgKi9cbiAgIHN5cy5nZXRTYWZlQXJlYVJlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCB2aXNpYmxlU2l6ZSA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKTtcbiAgICAgICAgcmV0dXJuIGNjLnJlY3QoMCwgMCwgdmlzaWJsZVNpemUud2lkdGgsIHZpc2libGVTaXplLmhlaWdodCk7XG4gICAgfTtcblxuICAgIGlmIChfZ2xvYmFsLl9fZ2xvYmFsQWRhcHRlciAmJiBfZ2xvYmFsLl9fZ2xvYmFsQWRhcHRlci5hZGFwdFN5cykge1xuICAgICAgICAvLyBpbml0IHN5cyBpbmZvIGluIGFkYXB0ZXJcbiAgICAgICAgX2dsb2JhbC5fX2dsb2JhbEFkYXB0ZXIuYWRhcHRTeXMoc3lzKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQ0NfRURJVE9SICYmIEVkaXRvci5pc01haW5Qcm9jZXNzKSB7XG4gICAgICAgIHN5cy5pc01vYmlsZSA9IGZhbHNlO1xuICAgICAgICBzeXMucGxhdGZvcm0gPSBzeXMuRURJVE9SX0NPUkU7XG4gICAgICAgIHN5cy5sYW5ndWFnZSA9IHN5cy5MQU5HVUFHRV9VTktOT1dOO1xuICAgICAgICBzeXMubGFuZ3VhZ2VDb2RlID0gdW5kZWZpbmVkO1xuICAgICAgICBzeXMub3MgPSAoe1xuICAgICAgICAgICAgZGFyd2luOiBzeXMuT1NfT1NYLFxuICAgICAgICAgICAgd2luMzI6IHN5cy5PU19XSU5ET1dTLFxuICAgICAgICAgICAgbGludXg6IHN5cy5PU19MSU5VWFxuICAgICAgICB9KVtwcm9jZXNzLnBsYXRmb3JtXSB8fCBzeXMuT1NfVU5LTk9XTjtcbiAgICAgICAgc3lzLmJyb3dzZXJUeXBlID0gbnVsbDtcbiAgICAgICAgc3lzLmJyb3dzZXJWZXJzaW9uID0gbnVsbDtcbiAgICAgICAgc3lzLndpbmRvd1BpeGVsUmVzb2x1dGlvbiA9IHtcbiAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAwXG4gICAgICAgIH07XG4gICAgICAgIHN5cy5jYXBhYmlsaXRpZXMgPSB7XG4gICAgICAgICAgICAnaW1hZ2VCaXRtYXAnOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICBzeXMuX19hdWRpb1N1cHBvcnQgPSB7fTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQ0NfSlNCIHx8IENDX1JVTlRJTUUpIHtcbiAgICAgICAgbGV0IHBsYXRmb3JtO1xuICAgICAgICBpZiAoaXNWaXZvR2FtZSkge1xuICAgICAgICAgICAgcGxhdGZvcm0gPSBzeXMuVklWT19HQU1FO1xuICAgICAgICB9IGVsc2UgaWYgKGlzT3Bwb0dhbWUpIHtcbiAgICAgICAgICAgIHBsYXRmb3JtID0gc3lzLk9QUE9fR0FNRTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0h1YXdlaUdhbWUpIHtcbiAgICAgICAgICAgIHBsYXRmb3JtID0gc3lzLkhVQVdFSV9HQU1FO1xuICAgICAgICB9IGVsc2UgaWYgKGlzSktXR2FtZSkge1xuICAgICAgICAgICAgcGxhdGZvcm0gPSBzeXMuSktXX0dBTUU7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNRdHRHYW1lKSB7XG4gICAgICAgICAgICBwbGF0Zm9ybSA9IHN5cy5RVFRfR0FNRTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0xpbmtTdXJlKSB7XG4gICAgICAgICAgICBwbGF0Zm9ybSA9IHN5cy5MSU5LU1VSRTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBsYXRmb3JtID0gX19nZXRQbGF0Zm9ybSgpO1xuICAgICAgICB9XG4gICAgICAgIHN5cy5wbGF0Zm9ybSA9IHBsYXRmb3JtO1xuICAgICAgICBzeXMuaXNNb2JpbGUgPSAocGxhdGZvcm0gPT09IHN5cy5BTkRST0lEIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybSA9PT0gc3lzLklQQUQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtID09PSBzeXMuSVBIT05FIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybSA9PT0gc3lzLldQOCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm0gPT09IHN5cy5USVpFTiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm0gPT09IHN5cy5CTEFDS0JFUlJZIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybSA9PT0gc3lzLlhJQU9NSV9HQU1FIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1Zpdm9HYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBpc09wcG9HYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0h1YXdlaUdhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzSktXR2FtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNRdHRHYW1lKTtcblxuICAgICAgICBzeXMub3MgPSBfX2dldE9TKCk7XG4gICAgICAgIHN5cy5sYW5ndWFnZSA9IF9fZ2V0Q3VycmVudExhbmd1YWdlKCk7XG4gICAgICAgIHZhciBsYW5ndWFnZUNvZGU7IFxuICAgICAgICBpZiAoQ0NfSlNCKSB7XG4gICAgICAgICAgICBsYW5ndWFnZUNvZGUgPSBfX2dldEN1cnJlbnRMYW5ndWFnZUNvZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBzeXMubGFuZ3VhZ2VDb2RlID0gbGFuZ3VhZ2VDb2RlID8gbGFuZ3VhZ2VDb2RlLnRvTG93ZXJDYXNlKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIHN5cy5vc1ZlcnNpb24gPSBfX2dldE9TVmVyc2lvbigpO1xuICAgICAgICBzeXMub3NNYWluVmVyc2lvbiA9IHBhcnNlSW50KHN5cy5vc1ZlcnNpb24pO1xuICAgICAgICBzeXMuYnJvd3NlclR5cGUgPSBudWxsO1xuICAgICAgICBzeXMuYnJvd3NlclZlcnNpb24gPSBudWxsO1xuXG4gICAgICAgIHZhciB3ID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHZhciBoID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICB2YXIgcmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICAgICAgICBzeXMud2luZG93UGl4ZWxSZXNvbHV0aW9uID0ge1xuICAgICAgICAgICAgd2lkdGg6IHJhdGlvICogdyxcbiAgICAgICAgICAgIGhlaWdodDogcmF0aW8gKiBoXG4gICAgICAgIH07XG5cbiAgICAgICAgc3lzLmxvY2FsU3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG5cbiAgICAgICAgdmFyIGNhcGFiaWxpdGllcztcbiAgICAgICAgY2FwYWJpbGl0aWVzID0gc3lzLmNhcGFiaWxpdGllcyA9IHtcbiAgICAgICAgICAgIFwiY2FudmFzXCI6IGZhbHNlLFxuICAgICAgICAgICAgXCJvcGVuZ2xcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwid2VicFwiOiB0cnVlLFxuICAgICAgICB9O1xuXG4gICAgICAgaWYgKHN5cy5pc01vYmlsZSkge1xuICAgICAgICAgICAgY2FwYWJpbGl0aWVzW1wiYWNjZWxlcm9tZXRlclwiXSA9IHRydWU7XG4gICAgICAgICAgICBjYXBhYmlsaXRpZXNbXCJ0b3VjaGVzXCJdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRlc2t0b3BcbiAgICAgICAgICAgIGNhcGFiaWxpdGllc1tcImtleWJvYXJkXCJdID0gdHJ1ZTtcbiAgICAgICAgICAgIGNhcGFiaWxpdGllc1tcIm1vdXNlXCJdID0gdHJ1ZTtcbiAgICAgICAgICAgIGNhcGFiaWxpdGllc1tcInRvdWNoZXNcIl0gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhcGFiaWxpdGllc1snaW1hZ2VCaXRtYXAnXSA9IGZhbHNlO1xuXG4gICAgICAgIHN5cy5fX2F1ZGlvU3VwcG9ydCA9IHtcbiAgICAgICAgICAgIE9OTFlfT05FOiBmYWxzZSxcbiAgICAgICAgICAgIFdFQl9BVURJTzogZmFsc2UsXG4gICAgICAgICAgICBERUxBWV9DUkVBVEVfQ1RYOiBmYWxzZSxcbiAgICAgICAgICAgIGZvcm1hdDogWycubXAzJ11cbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIGJyb3dzZXIgb3IgcnVudGltZVxuICAgICAgICB2YXIgd2luID0gd2luZG93LCBuYXYgPSB3aW4ubmF2aWdhdG9yLCBkb2MgPSBkb2N1bWVudCwgZG9jRWxlID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgdmFyIHVhID0gbmF2LnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHN5cy5pc01vYmlsZSA9IGZhbHNlO1xuICAgICAgICAgICAgc3lzLnBsYXRmb3JtID0gc3lzLkVESVRPUl9QQUdFO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZSB3aGV0aGVyIHN5c3RlbSBpcyBtb2JpbGUgc3lzdGVtXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzTW9iaWxlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN5cy5pc01vYmlsZSA9IC9tb2JpbGV8YW5kcm9pZHxpcGhvbmV8aXBhZC8udGVzdCh1YSk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGUgdGhlIHJ1bm5pbmcgcGxhdGZvcm1cbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBwbGF0Zm9ybVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAodHlwZW9mIEZiUGxheWFibGVBZCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIHN5cy5wbGF0Zm9ybSA9IHN5cy5GQl9QTEFZQUJMRV9BRFM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzeXMucGxhdGZvcm0gPSBzeXMuaXNNb2JpbGUgPyBzeXMuTU9CSUxFX0JST1dTRVIgOiBzeXMuREVTS1RPUF9CUk9XU0VSO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGN1cnJMYW5ndWFnZSA9IG5hdi5sYW5ndWFnZTtcbiAgICAgICAgY3Vyckxhbmd1YWdlID0gY3Vyckxhbmd1YWdlID8gY3Vyckxhbmd1YWdlIDogbmF2LmJyb3dzZXJMYW5ndWFnZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGN1cnJlbnQgbGFuZ3VhZ2UgaXNvIDYzOS0xIGNvZGUuXG4gICAgICAgICAqIEV4YW1wbGVzIG9mIHZhbGlkIGxhbmd1YWdlIGNvZGVzIGluY2x1ZGUgXCJ6aC10d1wiLCBcImVuXCIsIFwiZW4tdXNcIiwgXCJmclwiLCBcImZyLWZyXCIsIFwiZXMtZXNcIiwgZXRjLlxuICAgICAgICAgKiBUaGUgYWN0dWFsIHZhbHVlIHRvdGFsbHkgZGVwZW5kcyBvbiByZXN1bHRzIHByb3ZpZGVkIGJ5IGRlc3RpbmF0aW9uIHBsYXRmb3JtLlxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gbGFuZ3VhZ2VDb2RlXG4gICAgICAgICAqL1xuICAgICAgICBzeXMubGFuZ3VhZ2VDb2RlID0gY3Vyckxhbmd1YWdlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgY3Vyckxhbmd1YWdlID0gY3Vyckxhbmd1YWdlID8gY3Vyckxhbmd1YWdlLnNwbGl0KFwiLVwiKVswXSA6IHN5cy5MQU5HVUFHRV9FTkdMSVNIO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmRpY2F0ZSB0aGUgY3VycmVudCBsYW5ndWFnZSBvZiB0aGUgcnVubmluZyBzeXN0ZW1cbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IGxhbmd1YWdlXG4gICAgICAgICAqL1xuICAgICAgICBzeXMubGFuZ3VhZ2UgPSBjdXJyTGFuZ3VhZ2U7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBvcyBvZiBzeXN0ZW1cbiAgICAgICAgdmFyIGlzQW5kcm9pZCA9IGZhbHNlLCBpT1MgPSBmYWxzZSwgb3NWZXJzaW9uID0gJycsIG9zTWFpblZlcnNpb24gPSAwO1xuICAgICAgICB2YXIgdWFSZXN1bHQgPSAvYW5kcm9pZFxccyooXFxkKyg/OlxcLlxcZCspKikvaS5leGVjKHVhKSB8fCAvYW5kcm9pZFxccyooXFxkKyg/OlxcLlxcZCspKikvaS5leGVjKG5hdi5wbGF0Zm9ybSk7XG4gICAgICAgIGlmICh1YVJlc3VsdCkge1xuICAgICAgICAgICAgaXNBbmRyb2lkID0gdHJ1ZTtcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IHVhUmVzdWx0WzFdIHx8ICcnO1xuICAgICAgICAgICAgb3NNYWluVmVyc2lvbiA9IHBhcnNlSW50KG9zVmVyc2lvbikgfHwgMDtcbiAgICAgICAgfVxuICAgICAgICB1YVJlc3VsdCA9IC8oaVBhZHxpUGhvbmV8aVBvZCkuKk9TICgoXFxkK18/KXsyLDN9KS9pLmV4ZWModWEpO1xuICAgICAgICBpZiAodWFSZXN1bHQpIHtcbiAgICAgICAgICAgIGlPUyA9IHRydWU7XG4gICAgICAgICAgICBvc1ZlcnNpb24gPSB1YVJlc3VsdFsyXSB8fCAnJztcbiAgICAgICAgICAgIG9zTWFpblZlcnNpb24gPSBwYXJzZUludChvc1ZlcnNpb24pIHx8IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVmZXIgdG8gaHR0cHM6Ly9naXRodWIuY29tL2NvY29zLWNyZWF0b3IvZW5naW5lL3B1bGwvNTU0MiAsIHRoYW5rcyBmb3IgY29udHJpYml0aW9uIGZyb20gQGtyYXBuaWtra1xuICAgICAgICAvLyBpcGFkIE9TIDEzIHNhZmFyaSBpZGVudGlmaWVzIGl0c2VsZiBhcyBcIk1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1KSBBcHBsZVdlYktpdC82MDUuMS4xNSAoS0hUTUwsIGxpa2UgR2Vja28pXCIgXG4gICAgICAgIC8vIHNvIHVzZSBtYXhUb3VjaFBvaW50cyB0byBjaGVjayB3aGV0aGVyIGl0J3MgZGVza3RvcCBzYWZhcmkgb3Igbm90LiBcbiAgICAgICAgLy8gcmVmZXJlbmNlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81ODAxOTQ2My9ob3ctdG8tZGV0ZWN0LWRldmljZS1uYW1lLWluLXNhZmFyaS1vbi1pb3MtMTMtd2hpbGUtaXQtZG9lc250LXNob3ctdGhlLWNvcnJlY3RcbiAgICAgICAgLy8gRklYTUU6IHNob3VsZCByZW1vdmUgaXQgd2hlbiB0b3VjaC1lbmFibGVkIG1hY3MgYXJlIGF2YWlsYWJsZVxuICAgICAgICBlbHNlIGlmICgvKGlQaG9uZXxpUGFkfGlQb2QpLy5leGVjKG5hdi5wbGF0Zm9ybSkgfHwgKG5hdi5wbGF0Zm9ybSA9PT0gJ01hY0ludGVsJyAmJiBuYXYubWF4VG91Y2hQb2ludHMgJiYgbmF2Lm1heFRvdWNoUG9pbnRzID4gMSkpIHsgXG4gICAgICAgICAgICBpT1MgPSB0cnVlO1xuICAgICAgICAgICAgb3NWZXJzaW9uID0gJyc7XG4gICAgICAgICAgICBvc01haW5WZXJzaW9uID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvc05hbWUgPSBzeXMuT1NfVU5LTk9XTjtcbiAgICAgICAgaWYgKG5hdi5hcHBWZXJzaW9uLmluZGV4T2YoXCJXaW5cIikgIT09IC0xKSBvc05hbWUgPSBzeXMuT1NfV0lORE9XUztcbiAgICAgICAgZWxzZSBpZiAoaU9TKSBvc05hbWUgPSBzeXMuT1NfSU9TO1xuICAgICAgICBlbHNlIGlmIChuYXYuYXBwVmVyc2lvbi5pbmRleE9mKFwiTWFjXCIpICE9PSAtMSkgb3NOYW1lID0gc3lzLk9TX09TWDtcbiAgICAgICAgZWxzZSBpZiAobmF2LmFwcFZlcnNpb24uaW5kZXhPZihcIlgxMVwiKSAhPT0gLTEgJiYgbmF2LmFwcFZlcnNpb24uaW5kZXhPZihcIkxpbnV4XCIpID09PSAtMSkgb3NOYW1lID0gc3lzLk9TX1VOSVg7XG4gICAgICAgIGVsc2UgaWYgKGlzQW5kcm9pZCkgb3NOYW1lID0gc3lzLk9TX0FORFJPSUQ7XG4gICAgICAgIGVsc2UgaWYgKG5hdi5hcHBWZXJzaW9uLmluZGV4T2YoXCJMaW51eFwiKSAhPT0gLTEgfHwgdWEuaW5kZXhPZihcInVidW50dVwiKSAhPT0gLTEpIG9zTmFtZSA9IHN5cy5PU19MSU5VWDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5kaWNhdGUgdGhlIHJ1bm5pbmcgb3MgbmFtZVxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gb3NcbiAgICAgICAgICovXG4gICAgICAgIHN5cy5vcyA9IG9zTmFtZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluZGljYXRlIHRoZSBydW5uaW5nIG9zIHZlcnNpb25cbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IG9zVmVyc2lvblxuICAgICAgICAgKi9cbiAgICAgICAgc3lzLm9zVmVyc2lvbiA9IG9zVmVyc2lvbjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluZGljYXRlIHRoZSBydW5uaW5nIG9zIG1haW4gdmVyc2lvblxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gb3NNYWluVmVyc2lvblxuICAgICAgICAgKi9cbiAgICAgICAgc3lzLm9zTWFpblZlcnNpb24gPSBvc01haW5WZXJzaW9uO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmRpY2F0ZSB0aGUgcnVubmluZyBicm93c2VyIHR5cGVcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmcgfCBudWxsfSBicm93c2VyVHlwZVxuICAgICAgICAgKi9cbiAgICAgICAgc3lzLmJyb3dzZXJUeXBlID0gc3lzLkJST1dTRVJfVFlQRV9VTktOT1dOO1xuICAgICAgICAvKiBEZXRlcm1pbmUgdGhlIGJyb3dzZXIgdHlwZSAqL1xuICAgICAgICAoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB0eXBlUmVnMSA9IC9tcXFicm93c2VyfG1pY3JvbWVzc2VuZ2VyfHFxYnJvd3Nlcnxzb2dvdXxxem9uZXxsaWViYW98bWF4dGhvbnx1Y2JzfDM2MCBhcGhvbmV8MzYwYnJvd3NlcnxiYWlkdWJveGFwcHxiYWlkdWJyb3dzZXJ8bWF4dGhvbnxteGJyb3dzZXJ8bWl1aWJyb3dzZXIvaTtcbiAgICAgICAgICAgIHZhciB0eXBlUmVnMiA9IC9xcXx1Y2Jyb3dzZXJ8dWJyb3dzZXJ8ZWRnZS9pO1xuICAgICAgICAgICAgdmFyIHR5cGVSZWczID0gL2Nocm9tZXxzYWZhcml8ZmlyZWZveHx0cmlkZW50fG9wZXJhfG9wclxcL3xvdXBlbmcvaTtcbiAgICAgICAgICAgIHZhciBicm93c2VyVHlwZXMgPSB0eXBlUmVnMS5leGVjKHVhKSB8fCB0eXBlUmVnMi5leGVjKHVhKSB8fCB0eXBlUmVnMy5leGVjKHVhKTtcblxuICAgICAgICAgICAgdmFyIGJyb3dzZXJUeXBlID0gYnJvd3NlclR5cGVzID8gYnJvd3NlclR5cGVzWzBdLnRvTG93ZXJDYXNlKCkgOiBzeXMuQlJPV1NFUl9UWVBFX1VOS05PV047XG5cbiAgICAgICAgICAgIGlmIChicm93c2VyVHlwZSA9PT0gXCJzYWZhcmlcIiAmJiBpc0FuZHJvaWQpXG4gICAgICAgICAgICAgICAgYnJvd3NlclR5cGUgPSBzeXMuQlJPV1NFUl9UWVBFX0FORFJPSUQ7XG4gICAgICAgICAgICBlbHNlIGlmIChicm93c2VyVHlwZSA9PT0gXCJxcVwiICYmIHVhLm1hdGNoKC9hbmRyb2lkLiphcHBsZXdlYmtpdC9pKSlcbiAgICAgICAgICAgICAgICBicm93c2VyVHlwZSA9IHN5cy5CUk9XU0VSX1RZUEVfQU5EUk9JRDtcbiAgICAgICAgICAgIGxldCB0eXBlTWFwID0ge1xuICAgICAgICAgICAgICAgICdtaWNyb21lc3Nlbmdlcic6IHN5cy5CUk9XU0VSX1RZUEVfV0VDSEFULFxuICAgICAgICAgICAgICAgICd0cmlkZW50Jzogc3lzLkJST1dTRVJfVFlQRV9JRSxcbiAgICAgICAgICAgICAgICAnZWRnZSc6IHN5cy5CUk9XU0VSX1RZUEVfRURHRSxcbiAgICAgICAgICAgICAgICAnMzYwIGFwaG9uZSc6IHN5cy5CUk9XU0VSX1RZUEVfMzYwLFxuICAgICAgICAgICAgICAgICdteGJyb3dzZXInOiBzeXMuQlJPV1NFUl9UWVBFX01BWFRIT04sXG4gICAgICAgICAgICAgICAgJ29wci8nOiBzeXMuQlJPV1NFUl9UWVBFX09QRVJBLFxuICAgICAgICAgICAgICAgICd1YnJvd3Nlcic6IHN5cy5CUk9XU0VSX1RZUEVfVUNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHN5cy5icm93c2VyVHlwZSA9IHR5cGVNYXBbYnJvd3NlclR5cGVdIHx8IGJyb3dzZXJUeXBlO1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmRpY2F0ZSB0aGUgcnVubmluZyBicm93c2VyIHZlcnNpb25cbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmcgfCBudWxsfSBicm93c2VyVmVyc2lvblxuICAgICAgICAgKi9cbiAgICAgICAgc3lzLmJyb3dzZXJWZXJzaW9uID0gXCJcIjtcbiAgICAgICAgLyogRGV0ZXJtaW5lIHRoZSBicm93c2VyIHZlcnNpb24gbnVtYmVyICovXG4gICAgICAgIChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZlcnNpb25SZWcxID0gLyhtcXFicm93c2VyfG1pY3JvbWVzc2VuZ2VyfHFxYnJvd3Nlcnxzb2dvdXxxem9uZXxsaWViYW98bWF4dGhvbnx1Y3x1Y2JzfDM2MCBhcGhvbmV8MzYwfGJhaWR1Ym94YXBwfGJhaWR1fG1heHRob258bXhicm93c2VyfG1pdWkoPzouaHlicmlkKT8pKG1vYmlsZSk/KGJyb3dzZXIpP1xcLz8oW1xcZC5dKykvaTtcbiAgICAgICAgICAgIHZhciB2ZXJzaW9uUmVnMiA9IC8ocXF8Y2hyb21lfHNhZmFyaXxmaXJlZm94fHRyaWRlbnR8b3BlcmF8b3ByXFwvfG91cGVuZykobW9iaWxlKT8oYnJvd3Nlcik/XFwvPyhbXFxkLl0rKS9pO1xuICAgICAgICAgICAgdmFyIHRtcCA9IHVhLm1hdGNoKHZlcnNpb25SZWcxKTtcbiAgICAgICAgICAgIGlmKCF0bXApIHRtcCA9IHVhLm1hdGNoKHZlcnNpb25SZWcyKTtcbiAgICAgICAgICAgIHN5cy5icm93c2VyVmVyc2lvbiA9IHRtcCA/IHRtcFs0XSA6IFwiXCI7XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgdmFyIHcgPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBoID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHZhciByYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluZGljYXRlIHRoZSByZWFsIHBpeGVsIHJlc29sdXRpb24gb2YgdGhlIHdob2xlIGdhbWUgd2luZG93XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U2l6ZX0gd2luZG93UGl4ZWxSZXNvbHV0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBzeXMud2luZG93UGl4ZWxSZXNvbHV0aW9uID0ge1xuICAgICAgICAgICAgd2lkdGg6IHJhdGlvICogdyxcbiAgICAgICAgICAgIGhlaWdodDogcmF0aW8gKiBoXG4gICAgICAgIH07XG5cbiAgICAgICAgc3lzLl9jaGVja1dlYkdMUmVuZGVyTW9kZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChjYy5nYW1lLnJlbmRlclR5cGUgIT09IGNjLmdhbWUuUkVOREVSX1RZUEVfV0VCR0wpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBmZWF0dXJlIHN1cHBvcnRzIFdlYkdMIHJlbmRlciBtb2RlIG9ubHkuXCIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBfdG1wQ2FudmFzMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5cbiAgICAgICAgdmFyIGNyZWF0ZTNEQ29udGV4dCA9IGZ1bmN0aW9uIChjYW52YXMsIG9wdF9hdHRyaWJzLCBvcHRfY29udGV4dFR5cGUpIHtcbiAgICAgICAgICAgIGlmIChvcHRfY29udGV4dFR5cGUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FudmFzLmdldENvbnRleHQob3B0X2NvbnRleHRUeXBlLCBvcHRfYXR0cmlicyk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlM0RDb250ZXh0KGNhbnZhcywgb3B0X2F0dHJpYnMsIFwid2ViZ2xcIikgfHxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlM0RDb250ZXh0KGNhbnZhcywgb3B0X2F0dHJpYnMsIFwiZXhwZXJpbWVudGFsLXdlYmdsXCIpIHx8XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZTNEQ29udGV4dChjYW52YXMsIG9wdF9hdHRyaWJzLCBcIndlYmtpdC0zZFwiKSB8fFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGUzRENvbnRleHQoY2FudmFzLCBvcHRfYXR0cmlicywgXCJtb3otd2ViZ2xcIikgfHxcbiAgICAgICAgICAgICAgICAgICAgbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2Muc3lzLmxvY2FsU3RvcmFnZSBpcyBhIGxvY2FsIHN0b3JhZ2UgY29tcG9uZW50LlxuICAgICAgICAgKiBAcHJvcGVydHkge09iamVjdH0gbG9jYWxTdG9yYWdlXG4gICAgICAgICAqL1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGxvY2FsU3RvcmFnZSA9IHN5cy5sb2NhbFN0b3JhZ2UgPSB3aW4ubG9jYWxTdG9yYWdlO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzdG9yYWdlXCIsIFwiXCIpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJzdG9yYWdlXCIpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlID0gbnVsbDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdmFyIHdhcm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybklEKDUyMDApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHN5cy5sb2NhbFN0b3JhZ2UgPSB7XG4gICAgICAgICAgICAgICAgZ2V0SXRlbSA6IHdhcm4sXG4gICAgICAgICAgICAgICAgc2V0SXRlbSA6IHdhcm4sXG4gICAgICAgICAgICAgICAgcmVtb3ZlSXRlbSA6IHdhcm4sXG4gICAgICAgICAgICAgICAgY2xlYXIgOiB3YXJuXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIF9zdXBwb3J0V2VicCA9IF90bXBDYW52YXMxLnRvRGF0YVVSTCgnaW1hZ2Uvd2VicCcpLnN0YXJ0c1dpdGgoJ2RhdGE6aW1hZ2Uvd2VicCcpO1xuICAgICAgICB2YXIgX3N1cHBvcnRDYW52YXMgPSAhIV90bXBDYW52YXMxLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgdmFyIF9zdXBwb3J0V2ViR0wgPSBmYWxzZTtcbiAgICAgICAgaWYgKENDX1RFU1QpIHtcbiAgICAgICAgICAgIF9zdXBwb3J0V2ViR0wgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh3aW4uV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgICAgICAgICBfc3VwcG9ydFdlYkdMID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY2FwYWJpbGl0aWVzIG9mIHRoZSBjdXJyZW50IHBsYXRmb3JtXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBjYXBhYmlsaXRpZXNcbiAgICAgICAgICovXG4gICAgICAgIHZhciBjYXBhYmlsaXRpZXMgPSBzeXMuY2FwYWJpbGl0aWVzID0ge1xuICAgICAgICAgICAgXCJjYW52YXNcIjogX3N1cHBvcnRDYW52YXMsXG4gICAgICAgICAgICBcIm9wZW5nbFwiOiBfc3VwcG9ydFdlYkdMLFxuICAgICAgICAgICAgXCJ3ZWJwXCI6IF9zdXBwb3J0V2VicCxcbiAgICAgICAgICAgICdpbWFnZUJpdG1hcCc6IGZhbHNlLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0eXBlb2YgY3JlYXRlSW1hZ2VCaXRtYXAgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgX3RtcENhbnZhczEud2lkdGggPSBfdG1wQ2FudmFzMS5oZWlnaHQgPSAyO1xuICAgICAgICAgICAgY3JlYXRlSW1hZ2VCaXRtYXAoX3RtcENhbnZhczEsIHt9KS50aGVuKGltYWdlQml0bWFwID0+IHtcbiAgICAgICAgICAgICAgICBjYXBhYmlsaXRpZXMuaW1hZ2VCaXRtYXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGltYWdlQml0bWFwLmNsb3NlICYmIGltYWdlQml0bWFwLmNsb3NlKCk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge30pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkb2NFbGVbJ29udG91Y2hzdGFydCddICE9PSB1bmRlZmluZWQgfHwgZG9jWydvbnRvdWNoc3RhcnQnXSAhPT0gdW5kZWZpbmVkIHx8IG5hdi5tc1BvaW50ZXJFbmFibGVkKVxuICAgICAgICAgICAgY2FwYWJpbGl0aWVzW1widG91Y2hlc1wiXSA9IHRydWU7XG4gICAgICAgIGlmIChkb2NFbGVbJ29ubW91c2V1cCddICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBjYXBhYmlsaXRpZXNbXCJtb3VzZVwiXSA9IHRydWU7XG4gICAgICAgIGlmIChkb2NFbGVbJ29ua2V5dXAnXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgY2FwYWJpbGl0aWVzW1wia2V5Ym9hcmRcIl0gPSB0cnVlO1xuICAgICAgICBpZiAod2luLkRldmljZU1vdGlvbkV2ZW50IHx8IHdpbi5EZXZpY2VPcmllbnRhdGlvbkV2ZW50KVxuICAgICAgICAgICAgY2FwYWJpbGl0aWVzW1wiYWNjZWxlcm9tZXRlclwiXSA9IHRydWU7XG5cbiAgICAgICAgdmFyIF9fYXVkaW9TdXBwb3J0O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBdWRpbyBzdXBwb3J0IGluIHRoZSBicm93c2VyXG4gICAgICAgICAqXG4gICAgICAgICAqIE1VTFRJX0NIQU5ORUwgICAgICAgIDogTXVsdGlwbGUgYXVkaW8gd2hpbGUgcGxheWluZyAtIElmIGl0IGRvZXNuJ3QsIHlvdSBjYW4gb25seSBwbGF5IGJhY2tncm91bmQgbXVzaWNcbiAgICAgICAgICogV0VCX0FVRElPICAgICAgICAgICAgOiBTdXBwb3J0IGZvciBXZWJBdWRpbyAtIFN1cHBvcnQgVzNDIFdlYkF1ZGlvIHN0YW5kYXJkcywgYWxsIG9mIHRoZSBhdWRpbyBjYW4gYmUgcGxheWVkXG4gICAgICAgICAqIEFVVE9QTEFZICAgICAgICAgICAgIDogU3VwcG9ydHMgYXV0by1wbGF5IGF1ZGlvIC0gaWYgRG9u4oCYdCBzdXBwb3J0IGl0LCBPbiBhIHRvdWNoIGRldGVjdGluZyBiYWNrZ3JvdW5kIG11c2ljIGNhbnZhcywgYW5kIHRoZW4gcmVwbGF5XG4gICAgICAgICAqIFJFUExBWV9BRlRFUl9UT1VDSCAgIDogVGhlIGZpcnN0IG11c2ljIHdpbGwgZmFpbCwgbXVzdCBiZSByZXBsYXkgYWZ0ZXIgdG91Y2hzdGFydFxuICAgICAgICAgKiBVU0VfRU1QVElFRF9FVkVOVCAgICA6IFdoZXRoZXIgdG8gdXNlIHRoZSBlbXB0aWVkIGV2ZW50IHRvIHJlcGxhY2UgbG9hZCBjYWxsYmFja1xuICAgICAgICAgKiBERUxBWV9DUkVBVEVfQ1RYICAgICA6IGRlbGF5IGNyZWF0ZWQgdGhlIGNvbnRleHQgb2JqZWN0IC0gb25seSB3ZWJBdWRpb1xuICAgICAgICAgKiBORUVEX01BTlVBTF9MT09QICAgICA6IGxvb3AgYXR0cmlidXRlIGZhaWx1cmUsIG5lZWQgdG8gcGVyZm9ybSBsb29wIG1hbnVhbGx5XG4gICAgICAgICAqXG4gICAgICAgICAqIE1heSBiZSBtb2RpZmljYXRpb25zIGZvciBhIGZldyBicm93c2VyIHZlcnNpb25cbiAgICAgICAgICovXG4gICAgICAgIChmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB2YXIgREVCVUcgPSBmYWxzZTtcblxuICAgICAgICAgICAgdmFyIHZlcnNpb24gPSBzeXMuYnJvd3NlclZlcnNpb247XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGJyb3dzZXIgc3VwcG9ydHMgV2ViIEF1ZGlvXG4gICAgICAgICAgICAvLyBjaGVjayBXZWIgQXVkaW8ncyBjb250ZXh0XG4gICAgICAgICAgICB2YXIgc3VwcG9ydFdlYkF1ZGlvID0gISEod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0IHx8IHdpbmRvdy5tb3pBdWRpb0NvbnRleHQpO1xuXG4gICAgICAgICAgICBfX2F1ZGlvU3VwcG9ydCA9IHsgT05MWV9PTkU6IGZhbHNlLCBXRUJfQVVESU86IHN1cHBvcnRXZWJBdWRpbywgREVMQVlfQ1JFQVRFX0NUWDogZmFsc2UgfTtcblxuICAgICAgICAgICAgaWYgKHN5cy5vcyA9PT0gc3lzLk9TX0lPUykge1xuICAgICAgICAgICAgICAgIC8vIElPUyBubyBldmVudCB0aGF0IHVzZWQgdG8gcGFyc2UgY29tcGxldGVkIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB0aW1lIGlzIG5vdCBjb21wbGV0ZSwgY2FuIG5vdCBwbGF5XG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICBfX2F1ZGlvU3VwcG9ydC5VU0VfTE9BREVSX0VWRU5UID0gJ2xvYWRlZG1ldGFkYXRhJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN5cy5icm93c2VyVHlwZSA9PT0gc3lzLkJST1dTRVJfVFlQRV9GSVJFRk9YKSB7XG4gICAgICAgICAgICAgICAgX19hdWRpb1N1cHBvcnQuREVMQVlfQ1JFQVRFX0NUWCA9IHRydWU7XG4gICAgICAgICAgICAgICAgX19hdWRpb1N1cHBvcnQuVVNFX0xPQURFUl9FVkVOVCA9ICdjYW5wbGF5JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN5cy5vcyA9PT0gc3lzLk9TX0FORFJPSUQpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3lzLmJyb3dzZXJUeXBlID09PSBzeXMuQlJPV1NFUl9UWVBFX1VDKSB7XG4gICAgICAgICAgICAgICAgICAgIF9fYXVkaW9TdXBwb3J0Lk9ORV9TT1VSQ0UgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoREVCVUcpe1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKCdicm93c2UgdHlwZTogJyArIHN5cy5icm93c2VyVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygnYnJvd3NlIHZlcnNpb246ICcgKyB2ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKCdNVUxUSV9DSEFOTkVMOiAnICsgX19hdWRpb1N1cHBvcnQuTVVMVElfQ0hBTk5FTCk7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygnV0VCX0FVRElPOiAnICsgX19hdWRpb1N1cHBvcnQuV0VCX0FVRElPKTtcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKCdBVVRPUExBWTogJyArIF9fYXVkaW9TdXBwb3J0LkFVVE9QTEFZKTtcbiAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKF9fYXVkaW9TdXBwb3J0LldFQl9BVURJTykge1xuICAgICAgICAgICAgICAgIF9fYXVkaW9TdXBwb3J0LmNvbnRleHQgPSBuZXcgKHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCB8fCB3aW5kb3cubW96QXVkaW9Db250ZXh0KSgpO1xuICAgICAgICAgICAgICAgIGlmKF9fYXVkaW9TdXBwb3J0LkRFTEFZX0NSRUFURV9DVFgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyBfX2F1ZGlvU3VwcG9ydC5jb250ZXh0ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQgfHwgd2luZG93Lm1vekF1ZGlvQ29udGV4dCkoKTsgfSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgICAgICBfX2F1ZGlvU3VwcG9ydC5XRUJfQVVESU8gPSBmYWxzZTtcbiAgICAgICAgICAgIGNjLmxvZ0lEKDUyMDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZvcm1hdFN1cHBvcnQgPSBbXTtcblxuICAgICAgICAoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBhdWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyk7XG4gICAgICAgICAgICBpZihhdWRpby5jYW5QbGF5VHlwZSkge1xuICAgICAgICAgICAgICAgIHZhciBvZ2cgPSBhdWRpby5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJ2b3JiaXNcIicpO1xuICAgICAgICAgICAgICAgIGlmIChvZ2cpIGZvcm1hdFN1cHBvcnQucHVzaCgnLm9nZycpO1xuICAgICAgICAgICAgICAgIHZhciBtcDMgPSBhdWRpby5jYW5QbGF5VHlwZSgnYXVkaW8vbXBlZycpO1xuICAgICAgICAgICAgICAgIGlmIChtcDMpIGZvcm1hdFN1cHBvcnQucHVzaCgnLm1wMycpO1xuICAgICAgICAgICAgICAgIHZhciB3YXYgPSBhdWRpby5jYW5QbGF5VHlwZSgnYXVkaW8vd2F2OyBjb2RlY3M9XCIxXCInKTtcbiAgICAgICAgICAgICAgICBpZiAod2F2KSBmb3JtYXRTdXBwb3J0LnB1c2goJy53YXYnKTtcbiAgICAgICAgICAgICAgICB2YXIgbXA0ID0gYXVkaW8uY2FuUGxheVR5cGUoJ2F1ZGlvL21wNCcpO1xuICAgICAgICAgICAgICAgIGlmIChtcDQpIGZvcm1hdFN1cHBvcnQucHVzaCgnLm1wNCcpO1xuICAgICAgICAgICAgICAgIHZhciBtNGEgPSBhdWRpby5jYW5QbGF5VHlwZSgnYXVkaW8veC1tNGEnKTtcbiAgICAgICAgICAgICAgICBpZiAobTRhKSBmb3JtYXRTdXBwb3J0LnB1c2goJy5tNGEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICAgICAgX19hdWRpb1N1cHBvcnQuZm9ybWF0ID0gZm9ybWF0U3VwcG9ydDtcblxuICAgICAgICBzeXMuX19hdWRpb1N1cHBvcnQgPSBfX2F1ZGlvU3VwcG9ydDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogTmV0d29yayB0eXBlIGVudW1lcmF0aW9uXG4gICAgICogISN6aFxuICAgICAqIOe9kee7nOexu+Wei+aemuS4vlxuICAgICAqXG4gICAgICogQGVudW0gc3lzLk5ldHdvcmtUeXBlXG4gICAgICovXG4gICAgc3lzLk5ldHdvcmtUeXBlID0ge1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBOZXR3b3JrIGlzIHVucmVhY2hhYmxlLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOe9kee7nOS4jemAmlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTk9ORVxuICAgICAgICAgKi9cbiAgICAgICAgTk9ORTogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogTmV0d29yayBpcyByZWFjaGFibGUgdmlhIFdpRmkgb3IgY2FibGUuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6YCa6L+H5peg57q/5oiW6ICF5pyJ57q/5pys5Zyw572R57uc6L+e5o6l5Zug54m5572RXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBMQU5cbiAgICAgICAgICovXG4gICAgICAgIExBTjogMSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogTmV0d29yayBpcyByZWFjaGFibGUgdmlhIFdpcmVsZXNzIFdpZGUgQXJlYSBOZXR3b3JrXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6YCa6L+H6JyC56qd56e75Yqo572R57uc6L+e5o6l5Zug54m5572RXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBXV0FOXG4gICAgICAgICAqL1xuICAgICAgICBXV0FOOiAyXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBjbGFzcyBzeXNcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgdGhlIG5ldHdvcmsgdHlwZSBvZiBjdXJyZW50IGRldmljZSwgcmV0dXJuIGNjLnN5cy5OZXR3b3JrVHlwZS5MQU4gaWYgZmFpbHVyZS5cbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W5b2T5YmN6K6+5aSH55qE572R57uc57G75Z6LLCDlpoLmnpznvZHnu5znsbvlnovml6Dms5Xojrflj5bvvIzpu5jorqTlsIbov5Tlm54gY2Muc3lzLk5ldHdvcmtUeXBlLkxBTlxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXROZXR3b3JrVHlwZVxuICAgICAqIEByZXR1cm4ge05ldHdvcmtUeXBlfVxuICAgICAqL1xuICAgIHN5cy5nZXROZXR3b3JrVHlwZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBUT0RPOiBuZWVkIHRvIGltcGxlbWVudCB0aGlzIGZvciBtb2JpbGUgcGhvbmVzLlxuICAgICAgICByZXR1cm4gc3lzLk5ldHdvcmtUeXBlLkxBTjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCB0aGUgYmF0dGVyeSBsZXZlbCBvZiBjdXJyZW50IGRldmljZSwgcmV0dXJuIDEuMCBpZiBmYWlsdXJlLlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5blvZPliY3orr7lpIfnmoTnlLXmsaDnlLXph4/vvIzlpoLmnpznlLXph4/ml6Dms5Xojrflj5bvvIzpu5jorqTlsIbov5Tlm54gMVxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXRCYXR0ZXJ5TGV2ZWxcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IC0gMC4wIH4gMS4wXG4gICAgICovXG4gICAgc3lzLmdldEJhdHRlcnlMZXZlbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBUT0RPOiBuZWVkIHRvIGltcGxlbWVudCB0aGlzIGZvciBtb2JpbGUgcGhvbmVzLlxuICAgICAgICByZXR1cm4gMS4wO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGb3JjZXMgdGhlIGdhcmJhZ2UgY29sbGVjdGlvbiwgb25seSBhdmFpbGFibGUgaW4gSlNCXG4gICAgICogQG1ldGhvZCBnYXJiYWdlQ29sbGVjdFxuICAgICAqL1xuICAgIHN5cy5nYXJiYWdlQ29sbGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gTi9BIGluIHdlYlxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXN0YXJ0IHRoZSBKUyBWTSwgb25seSBhdmFpbGFibGUgaW4gSlNCXG4gICAgICogQG1ldGhvZCByZXN0YXJ0Vk1cbiAgICAgKi9cbiAgICBzeXMucmVzdGFydFZNID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBOL0EgaW4gd2ViXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrIHdoZXRoZXIgYW4gb2JqZWN0IGlzIHZhbGlkLFxuICAgICAqIEluIHdlYiBlbmdpbmUsIGl0IHdpbGwgcmV0dXJuIHRydWUgaWYgdGhlIG9iamVjdCBleGlzdFxuICAgICAqIEluIG5hdGl2ZSBlbmdpbmUsIGl0IHdpbGwgcmV0dXJuIHRydWUgaWYgdGhlIEpTIG9iamVjdCBhbmQgdGhlIGNvcnJlc3BvbmQgbmF0aXZlIG9iamVjdCBhcmUgYm90aCB2YWxpZFxuICAgICAqIEBtZXRob2QgaXNPYmplY3RWYWxpZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBWYWxpZGl0eSBvZiB0aGUgb2JqZWN0XG4gICAgICovXG4gICAgc3lzLmlzT2JqZWN0VmFsaWQgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIGlmIChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRHVtcCBzeXN0ZW0gaW5mb3JtYXRpb25zXG4gICAgICogQG1ldGhvZCBkdW1wXG4gICAgICovXG4gICAgc3lzLmR1bXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHN0ciA9IFwiXCI7XG4gICAgICAgIHN0ciArPSBcImlzTW9iaWxlIDogXCIgKyBzZWxmLmlzTW9iaWxlICsgXCJcXHJcXG5cIjtcbiAgICAgICAgc3RyICs9IFwibGFuZ3VhZ2UgOiBcIiArIHNlbGYubGFuZ3VhZ2UgKyBcIlxcclxcblwiO1xuICAgICAgICBzdHIgKz0gXCJicm93c2VyVHlwZSA6IFwiICsgc2VsZi5icm93c2VyVHlwZSArIFwiXFxyXFxuXCI7XG4gICAgICAgIHN0ciArPSBcImJyb3dzZXJWZXJzaW9uIDogXCIgKyBzZWxmLmJyb3dzZXJWZXJzaW9uICsgXCJcXHJcXG5cIjtcbiAgICAgICAgc3RyICs9IFwiY2FwYWJpbGl0aWVzIDogXCIgKyBKU09OLnN0cmluZ2lmeShzZWxmLmNhcGFiaWxpdGllcykgKyBcIlxcclxcblwiO1xuICAgICAgICBzdHIgKz0gXCJvcyA6IFwiICsgc2VsZi5vcyArIFwiXFxyXFxuXCI7XG4gICAgICAgIHN0ciArPSBcIm9zVmVyc2lvbiA6IFwiICsgc2VsZi5vc1ZlcnNpb24gKyBcIlxcclxcblwiO1xuICAgICAgICBzdHIgKz0gXCJwbGF0Zm9ybSA6IFwiICsgc2VsZi5wbGF0Zm9ybSArIFwiXFxyXFxuXCI7XG4gICAgICAgIHN0ciArPSBcIlVzaW5nIFwiICsgKGNjLmdhbWUucmVuZGVyVHlwZSA9PT0gY2MuZ2FtZS5SRU5ERVJfVFlQRV9XRUJHTCA/IFwiV0VCR0xcIiA6IFwiQ0FOVkFTXCIpICsgXCIgcmVuZGVyZXIuXCIgKyBcIlxcclxcblwiO1xuICAgICAgICBjYy5sb2coc3RyKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogT3BlbiBhIHVybCBpbiBicm93c2VyXG4gICAgICogQG1ldGhvZCBvcGVuVVJMXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICAgICAqL1xuICAgIHN5cy5vcGVuVVJMID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICBpZiAoQ0NfSlNCIHx8IENDX1JVTlRJTUUpIHtcbiAgICAgICAgICAgIGpzYi5vcGVuVVJMKHVybCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cub3Blbih1cmwpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBlbGFwc2VkIHNpbmNlIDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQy5cbiAgICAgKiBAbWV0aG9kIG5vd1xuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBzeXMubm93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoRGF0ZS5ub3cpIHtcbiAgICAgICAgICAgIHJldHVybiBEYXRlLm5vdygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICsobmV3IERhdGUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBzeXM7XG59XG5cbnZhciBzeXMgPSBjYyAmJiBjYy5zeXMgPyBjYy5zeXMgOiBpbml0U3lzKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3lzO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=