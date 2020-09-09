
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
   * @return {sys.NetworkType}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL0NDU3lzLmpzIl0sIm5hbWVzIjpbInNldHRpbmdQbGF0Zm9ybSIsIkNDX0VESVRPUiIsIndpbmRvdyIsIl9DQ1NldHRpbmdzIiwicGxhdGZvcm0iLCJ1bmRlZmluZWQiLCJpc1Zpdm9HYW1lIiwiaXNPcHBvR2FtZSIsImlzSHVhd2VpR2FtZSIsImlzSktXR2FtZSIsImlzUXR0R2FtZSIsImlzTGlua1N1cmUiLCJfZ2xvYmFsIiwiZ2xvYmFsIiwiaW5pdFN5cyIsImNjIiwic3lzIiwiTEFOR1VBR0VfRU5HTElTSCIsIkxBTkdVQUdFX0NISU5FU0UiLCJMQU5HVUFHRV9GUkVOQ0giLCJMQU5HVUFHRV9JVEFMSUFOIiwiTEFOR1VBR0VfR0VSTUFOIiwiTEFOR1VBR0VfU1BBTklTSCIsIkxBTkdVQUdFX0RVVENIIiwiTEFOR1VBR0VfUlVTU0lBTiIsIkxBTkdVQUdFX0tPUkVBTiIsIkxBTkdVQUdFX0pBUEFORVNFIiwiTEFOR1VBR0VfSFVOR0FSSUFOIiwiTEFOR1VBR0VfUE9SVFVHVUVTRSIsIkxBTkdVQUdFX0FSQUJJQyIsIkxBTkdVQUdFX05PUldFR0lBTiIsIkxBTkdVQUdFX1BPTElTSCIsIkxBTkdVQUdFX1RVUktJU0giLCJMQU5HVUFHRV9VS1JBSU5JQU4iLCJMQU5HVUFHRV9ST01BTklBTiIsIkxBTkdVQUdFX0JVTEdBUklBTiIsIkxBTkdVQUdFX1VOS05PV04iLCJPU19JT1MiLCJPU19BTkRST0lEIiwiT1NfV0lORE9XUyIsIk9TX01BUk1BTEFERSIsIk9TX0xJTlVYIiwiT1NfQkFEQSIsIk9TX0JMQUNLQkVSUlkiLCJPU19PU1giLCJPU19XUDgiLCJPU19XSU5SVCIsIk9TX1VOS05PV04iLCJVTktOT1dOIiwiV0lOMzIiLCJMSU5VWCIsIk1BQ09TIiwiQU5EUk9JRCIsIklQSE9ORSIsIklQQUQiLCJCTEFDS0JFUlJZIiwiTkFDTCIsIkVNU0NSSVBURU4iLCJUSVpFTiIsIldJTlJUIiwiV1A4IiwiTU9CSUxFX0JST1dTRVIiLCJERVNLVE9QX0JST1dTRVIiLCJFRElUT1JfUEFHRSIsIkVESVRPUl9DT1JFIiwiV0VDSEFUX0dBTUUiLCJRUV9QTEFZIiwiRkJfUExBWUFCTEVfQURTIiwiQkFJRFVfR0FNRSIsIlZJVk9fR0FNRSIsIk9QUE9fR0FNRSIsIkhVQVdFSV9HQU1FIiwiWElBT01JX0dBTUUiLCJKS1dfR0FNRSIsIkFMSVBBWV9HQU1FIiwiV0VDSEFUX0dBTUVfU1VCIiwiQkFJRFVfR0FNRV9TVUIiLCJRVFRfR0FNRSIsIkJZVEVEQU5DRV9HQU1FIiwiQllURURBTkNFX0dBTUVfU1VCIiwiTElOS1NVUkUiLCJCUk9XU0VSX1RZUEVfV0VDSEFUIiwiQlJPV1NFUl9UWVBFX0FORFJPSUQiLCJCUk9XU0VSX1RZUEVfSUUiLCJCUk9XU0VSX1RZUEVfRURHRSIsIkJST1dTRVJfVFlQRV9RUSIsIkJST1dTRVJfVFlQRV9NT0JJTEVfUVEiLCJCUk9XU0VSX1RZUEVfVUMiLCJCUk9XU0VSX1RZUEVfVUNCUyIsIkJST1dTRVJfVFlQRV8zNjAiLCJCUk9XU0VSX1RZUEVfQkFJRFVfQVBQIiwiQlJPV1NFUl9UWVBFX0JBSURVIiwiQlJPV1NFUl9UWVBFX01BWFRIT04iLCJCUk9XU0VSX1RZUEVfT1BFUkEiLCJCUk9XU0VSX1RZUEVfT1VQRU5HIiwiQlJPV1NFUl9UWVBFX01JVUkiLCJCUk9XU0VSX1RZUEVfRklSRUZPWCIsIkJST1dTRVJfVFlQRV9TQUZBUkkiLCJCUk9XU0VSX1RZUEVfQ0hST01FIiwiQlJPV1NFUl9UWVBFX0xJRUJBTyIsIkJST1dTRVJfVFlQRV9RWk9ORSIsIkJST1dTRVJfVFlQRV9TT1VHT1UiLCJCUk9XU0VSX1RZUEVfVU5LTk9XTiIsImlzTmF0aXZlIiwiQ0NfSlNCIiwiQ0NfUlVOVElNRSIsImlzQnJvd3NlciIsImRvY3VtZW50IiwiZ2xFeHRlbnNpb24iLCJuYW1lIiwicmVuZGVyZXIiLCJkZXZpY2UiLCJleHQiLCJnZXRNYXhKb2ludE1hdHJpeFNpemUiLCJfbWF4Sm9pbnRNYXRyaXhTaXplIiwiSk9JTlRfTUFUUklDRVNfU0laRSIsIkxFRlRfVU5JRk9STV9TSVpFIiwiZ2wiLCJnYW1lIiwiX3JlbmRlckNvbnRleHQiLCJtYXhVbmlmb3JtcyIsIk1hdGgiLCJmbG9vciIsImdldFBhcmFtZXRlciIsIk1BWF9WRVJURVhfVU5JRk9STV9WRUNUT1JTIiwiZ2V0U2FmZUFyZWFSZWN0IiwidmlzaWJsZVNpemUiLCJ2aWV3IiwiZ2V0VmlzaWJsZVNpemUiLCJyZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJfX2dsb2JhbEFkYXB0ZXIiLCJhZGFwdFN5cyIsIkVkaXRvciIsImlzTWFpblByb2Nlc3MiLCJpc01vYmlsZSIsImxhbmd1YWdlIiwibGFuZ3VhZ2VDb2RlIiwib3MiLCJkYXJ3aW4iLCJ3aW4zMiIsImxpbnV4IiwicHJvY2VzcyIsImJyb3dzZXJUeXBlIiwiYnJvd3NlclZlcnNpb24iLCJ3aW5kb3dQaXhlbFJlc29sdXRpb24iLCJjYXBhYmlsaXRpZXMiLCJfX2F1ZGlvU3VwcG9ydCIsIl9fZ2V0UGxhdGZvcm0iLCJfX2dldE9TIiwiX19nZXRDdXJyZW50TGFuZ3VhZ2UiLCJfX2dldEN1cnJlbnRMYW5ndWFnZUNvZGUiLCJ0b0xvd2VyQ2FzZSIsIm9zVmVyc2lvbiIsIl9fZ2V0T1NWZXJzaW9uIiwib3NNYWluVmVyc2lvbiIsInBhcnNlSW50IiwidyIsImlubmVyV2lkdGgiLCJoIiwiaW5uZXJIZWlnaHQiLCJyYXRpbyIsImRldmljZVBpeGVsUmF0aW8iLCJsb2NhbFN0b3JhZ2UiLCJPTkxZX09ORSIsIldFQl9BVURJTyIsIkRFTEFZX0NSRUFURV9DVFgiLCJmb3JtYXQiLCJ3aW4iLCJuYXYiLCJuYXZpZ2F0b3IiLCJkb2MiLCJkb2NFbGUiLCJkb2N1bWVudEVsZW1lbnQiLCJ1YSIsInVzZXJBZ2VudCIsInRlc3QiLCJGYlBsYXlhYmxlQWQiLCJjdXJyTGFuZ3VhZ2UiLCJicm93c2VyTGFuZ3VhZ2UiLCJzcGxpdCIsImlzQW5kcm9pZCIsImlPUyIsInVhUmVzdWx0IiwiZXhlYyIsIm1heFRvdWNoUG9pbnRzIiwib3NOYW1lIiwiYXBwVmVyc2lvbiIsImluZGV4T2YiLCJPU19VTklYIiwidHlwZVJlZzEiLCJ0eXBlUmVnMiIsInR5cGVSZWczIiwiYnJvd3NlclR5cGVzIiwibWF0Y2giLCJ0eXBlTWFwIiwidmVyc2lvblJlZzEiLCJ2ZXJzaW9uUmVnMiIsInRtcCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiX2NoZWNrV2ViR0xSZW5kZXJNb2RlIiwicmVuZGVyVHlwZSIsIlJFTkRFUl9UWVBFX1dFQkdMIiwiRXJyb3IiLCJfdG1wQ2FudmFzMSIsImNyZWF0ZUVsZW1lbnQiLCJjcmVhdGUzRENvbnRleHQiLCJjYW52YXMiLCJvcHRfYXR0cmlicyIsIm9wdF9jb250ZXh0VHlwZSIsImdldENvbnRleHQiLCJlIiwic2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJ3YXJuIiwid2FybklEIiwiZ2V0SXRlbSIsImNsZWFyIiwiX3N1cHBvcnRXZWJwIiwidG9EYXRhVVJMIiwic3RhcnRzV2l0aCIsIl9zdXBwb3J0Q2FudmFzIiwiX3N1cHBvcnRXZWJHTCIsIkNDX1RFU1QiLCJXZWJHTFJlbmRlcmluZ0NvbnRleHQiLCJjcmVhdGVJbWFnZUJpdG1hcCIsIkJsb2IiLCJ0aGVuIiwiaW1hZ2VCaXRtYXAiLCJjbG9zZSIsImVyciIsIm1zUG9pbnRlckVuYWJsZWQiLCJEZXZpY2VNb3Rpb25FdmVudCIsIkRldmljZU9yaWVudGF0aW9uRXZlbnQiLCJERUJVRyIsInZlcnNpb24iLCJzdXBwb3J0V2ViQXVkaW8iLCJBdWRpb0NvbnRleHQiLCJ3ZWJraXRBdWRpb0NvbnRleHQiLCJtb3pBdWRpb0NvbnRleHQiLCJVU0VfTE9BREVSX0VWRU5UIiwiT05FX1NPVVJDRSIsInNldFRpbWVvdXQiLCJsb2ciLCJNVUxUSV9DSEFOTkVMIiwiQVVUT1BMQVkiLCJjb250ZXh0IiwiZXJyb3IiLCJsb2dJRCIsImZvcm1hdFN1cHBvcnQiLCJhdWRpbyIsImNhblBsYXlUeXBlIiwib2dnIiwicHVzaCIsIm1wMyIsIndhdiIsIm1wNCIsIm00YSIsIk5ldHdvcmtUeXBlIiwiTk9ORSIsIkxBTiIsIldXQU4iLCJnZXROZXR3b3JrVHlwZSIsImdldEJhdHRlcnlMZXZlbCIsImdhcmJhZ2VDb2xsZWN0IiwicmVzdGFydFZNIiwiaXNPYmplY3RWYWxpZCIsIm9iaiIsImR1bXAiLCJzZWxmIiwic3RyIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9wZW5VUkwiLCJ1cmwiLCJqc2IiLCJvcGVuIiwibm93IiwiRGF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFJQSxlQUFKOztBQUNDLElBQUksQ0FBQ0MsU0FBTCxFQUFnQjtBQUNiRCxFQUFBQSxlQUFlLEdBQUdFLE1BQU0sQ0FBQ0MsV0FBUCxHQUFxQkEsV0FBVyxDQUFDQyxRQUFqQyxHQUEyQ0MsU0FBN0Q7QUFDRjs7QUFDRixJQUFNQyxVQUFVLEdBQUlOLGVBQWUsS0FBSyxPQUF4QztBQUNBLElBQU1PLFVBQVUsR0FBSVAsZUFBZSxLQUFLLFdBQXhDO0FBQ0EsSUFBTVEsWUFBWSxHQUFJUixlQUFlLEtBQUssUUFBMUM7QUFDQSxJQUFNUyxTQUFTLEdBQUlULGVBQWUsS0FBSyxVQUF2QztBQUNBLElBQU1VLFNBQVMsR0FBSVYsZUFBZSxLQUFLLFVBQXZDO0FBQ0EsSUFBTVcsVUFBVSxHQUFJWCxlQUFlLEtBQUssV0FBeEM7O0FBRUEsSUFBTVksT0FBTyxHQUFHLE9BQU9WLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NXLE1BQWhDLEdBQXlDWCxNQUF6RDs7QUFFQSxTQUFTWSxPQUFULEdBQW9CO0FBQ2hCOzs7Ozs7QUFNQUMsRUFBQUEsRUFBRSxDQUFDQyxHQUFILEdBQVMsRUFBVDtBQUNBLE1BQUlBLEdBQUcsR0FBR0QsRUFBRSxDQUFDQyxHQUFiO0FBRUE7Ozs7OztBQUtBQSxFQUFBQSxHQUFHLENBQUNDLGdCQUFKLEdBQXVCLElBQXZCO0FBRUE7Ozs7OztBQUtBRCxFQUFB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VDtBQUNIO0FBQ0osR0FQRDs7QUFTQSxTQUFPeFEsR0FBUDtBQUNIOztBQUVELElBQUlBLEdBQUcsR0FBR0QsRUFBRSxJQUFJQSxFQUFFLENBQUNDLEdBQVQsR0FBZUQsRUFBRSxDQUFDQyxHQUFsQixHQUF3QkYsT0FBTyxFQUF6QztBQUVBMlEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCMVEsR0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmxldCBzZXR0aW5nUGxhdGZvcm07XG4gaWYgKCFDQ19FRElUT1IpIHtcbiAgICBzZXR0aW5nUGxhdGZvcm0gPSB3aW5kb3cuX0NDU2V0dGluZ3MgPyBfQ0NTZXR0aW5ncy5wbGF0Zm9ybTogdW5kZWZpbmVkO1xuIH1cbmNvbnN0IGlzVml2b0dhbWUgPSAoc2V0dGluZ1BsYXRmb3JtID09PSAncWdhbWUnKTtcbmNvbnN0IGlzT3Bwb0dhbWUgPSAoc2V0dGluZ1BsYXRmb3JtID09PSAncXVpY2tnYW1lJyk7XG5jb25zdCBpc0h1YXdlaUdhbWUgPSAoc2V0dGluZ1BsYXRmb3JtID09PSAnaHVhd2VpJyk7XG5jb25zdCBpc0pLV0dhbWUgPSAoc2V0dGluZ1BsYXRmb3JtID09PSAnamt3LWdhbWUnKTtcbmNvbnN0IGlzUXR0R2FtZSA9IChzZXR0aW5nUGxhdGZvcm0gPT09ICdxdHQtZ2FtZScpO1xuY29uc3QgaXNMaW5rU3VyZSA9IChzZXR0aW5nUGxhdGZvcm0gPT09ICdsaW5rLXN1cmUnKTtcblxuY29uc3QgX2dsb2JhbCA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93O1xuIFxuZnVuY3Rpb24gaW5pdFN5cyAoKSB7XG4gICAgLyoqXG4gICAgICogU3lzdGVtIHZhcmlhYmxlc1xuICAgICAqIEBjbGFzcyBzeXNcbiAgICAgKiBAbWFpblxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBjYy5zeXMgPSB7fTtcbiAgICB2YXIgc3lzID0gY2Muc3lzO1xuXG4gICAgLyoqXG4gICAgICogRW5nbGlzaCBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX0VOR0xJU0hcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuTEFOR1VBR0VfRU5HTElTSCA9IFwiZW5cIjtcblxuICAgIC8qKlxuICAgICAqIENoaW5lc2UgbGFuZ3VhZ2UgY29kZVxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMQU5HVUFHRV9DSElORVNFXG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG4gICAgc3lzLkxBTkdVQUdFX0NISU5FU0UgPSBcInpoXCI7XG5cbiAgICAvKipcbiAgICAgKiBGcmVuY2ggbGFuZ3VhZ2UgY29kZVxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMQU5HVUFHRV9GUkVOQ0hcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuTEFOR1VBR0VfRlJFTkNIID0gXCJmclwiO1xuXG4gICAgLyoqXG4gICAgICogSXRhbGlhbiBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX0lUQUxJQU5cbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuTEFOR1VBR0VfSVRBTElBTiA9IFwiaXRcIjtcblxuICAgIC8qKlxuICAgICAqIEdlcm1hbiBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX0dFUk1BTlxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5MQU5HVUFHRV9HRVJNQU4gPSBcImRlXCI7XG5cbiAgICAvKipcbiAgICAgKiBTcGFuaXNoIGxhbmd1YWdlIGNvZGVcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfU1BBTklTSFxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5MQU5HVUFHRV9TUEFOSVNIID0gXCJlc1wiO1xuXG4gICAgLyoqXG4gICAgICogU3BhbmlzaCBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX0RVVENIXG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG4gICAgc3lzLkxBTkdVQUdFX0RVVENIID0gXCJkdVwiO1xuXG4gICAgLyoqXG4gICAgICogUnVzc2lhbiBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX1JVU1NJQU5cbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuTEFOR1VBR0VfUlVTU0lBTiA9IFwicnVcIjtcblxuICAgIC8qKlxuICAgICAqIEtvcmVhbiBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX0tPUkVBTlxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5MQU5HVUFHRV9LT1JFQU4gPSBcImtvXCI7XG5cbiAgICAvKipcbiAgICAgKiBKYXBhbmVzZSBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX0pBUEFORVNFXG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG4gICAgc3lzLkxBTkdVQUdFX0pBUEFORVNFID0gXCJqYVwiO1xuXG4gICAgLyoqXG4gICAgICogSHVuZ2FyaWFuIGxhbmd1YWdlIGNvZGVcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfSFVOR0FSSUFOXG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgc3lzLkxBTkdVQUdFX0hVTkdBUklBTiA9IFwiaHVcIjtcblxuICAgIC8qKlxuICAgICAqIFBvcnR1Z3Vlc2UgbGFuZ3VhZ2UgY29kZVxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMQU5HVUFHRV9QT1JUVUdVRVNFXG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG4gICAgc3lzLkxBTkdVQUdFX1BPUlRVR1VFU0UgPSBcInB0XCI7XG5cbiAgICAvKipcbiAgICAgKiBBcmFiaWMgbGFuZ3VhZ2UgY29kZVxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMQU5HVUFHRV9BUkFCSUNcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuTEFOR1VBR0VfQVJBQklDID0gXCJhclwiO1xuXG4gICAgLyoqXG4gICAgICogTm9yd2VnaWFuIGxhbmd1YWdlIGNvZGVcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfTk9SV0VHSUFOXG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG4gICAgc3lzLkxBTkdVQUdFX05PUldFR0lBTiA9IFwibm9cIjtcblxuICAgIC8qKlxuICAgICAqIFBvbGlzaCBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX1BPTElTSFxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5MQU5HVUFHRV9QT0xJU0ggPSBcInBsXCI7XG5cbiAgICAvKipcbiAgICAgKiBUdXJraXNoIGxhbmd1YWdlIGNvZGVcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfVFVSS0lTSFxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5MQU5HVUFHRV9UVVJLSVNIID0gXCJ0clwiO1xuXG4gICAgLyoqXG4gICAgICogVWtyYWluaWFuIGxhbmd1YWdlIGNvZGVcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfVUtSQUlOSUFOXG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG4gICAgc3lzLkxBTkdVQUdFX1VLUkFJTklBTiA9IFwidWtcIjtcblxuICAgIC8qKlxuICAgICAqIFJvbWFuaWFuIGxhbmd1YWdlIGNvZGVcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfUk9NQU5JQU5cbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuTEFOR1VBR0VfUk9NQU5JQU4gPSBcInJvXCI7XG5cbiAgICAvKipcbiAgICAgKiBCdWxnYXJpYW4gbGFuZ3VhZ2UgY29kZVxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMQU5HVUFHRV9CVUxHQVJJQU5cbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuTEFOR1VBR0VfQlVMR0FSSUFOID0gXCJiZ1wiO1xuXG4gICAgLyoqXG4gICAgICogVW5rbm93biBsYW5ndWFnZSBjb2RlXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX1VOS05PV05cbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuTEFOR1VBR0VfVU5LTk9XTiA9IFwidW5rbm93blwiO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IE9TX0lPU1xuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5PU19JT1MgPSBcImlPU1wiO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBPU19BTkRST0lEXG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG4gICAgc3lzLk9TX0FORFJPSUQgPSBcIkFuZHJvaWRcIjtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gT1NfV0lORE9XU1xuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5PU19XSU5ET1dTID0gXCJXaW5kb3dzXCI7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IE9TX01BUk1BTEFERVxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5PU19NQVJNQUxBREUgPSBcIk1hcm1hbGFkZVwiO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBPU19MSU5VWFxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5PU19MSU5VWCA9IFwiTGludXhcIjtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gT1NfQkFEQVxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5PU19CQURBID0gXCJCYWRhXCI7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IE9TX0JMQUNLQkVSUllcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuT1NfQkxBQ0tCRVJSWSA9IFwiQmxhY2tiZXJyeVwiO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBPU19PU1hcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBzeXMuT1NfT1NYID0gXCJPUyBYXCI7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IE9TX1dQOFxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5PU19XUDggPSBcIldQOFwiO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBPU19XSU5SVFxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5PU19XSU5SVCA9IFwiV0lOUlRcIjtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gT1NfVU5LTk9XTlxuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHN5cy5PU19VTktOT1dOID0gXCJVbmtub3duXCI7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gVU5LTk9XTlxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IC0xXG4gICAgICovXG4gICAgc3lzLlVOS05PV04gPSAtMTtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gV0lOMzJcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgc3lzLldJTjMyID0gMDtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTElOVVhcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxXG4gICAgICovXG4gICAgc3lzLkxJTlVYID0gMTtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTUFDT1NcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAyXG4gICAgICovXG4gICAgc3lzLk1BQ09TID0gMjtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQU5EUk9JRFxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IDNcbiAgICAgKi9cbiAgICBzeXMuQU5EUk9JRCA9IDM7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IElQSE9ORVxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IDRcbiAgICAgKi9cbiAgICBzeXMuSVBIT05FID0gNDtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gSVBBRFxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IDVcbiAgICAgKi9cbiAgICBzeXMuSVBBRCA9IDU7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEJMQUNLQkVSUllcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCA2XG4gICAgICovXG4gICAgc3lzLkJMQUNLQkVSUlkgPSA2O1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBOQUNMXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgN1xuICAgICAqL1xuICAgIHN5cy5OQUNMID0gNztcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRU1TQ1JJUFRFTlxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IDhcbiAgICAgKi9cbiAgICBzeXMuRU1TQ1JJUFRFTiA9IDg7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFRJWkVOXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgOVxuICAgICAqL1xuICAgIHN5cy5USVpFTiA9IDk7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFdJTlJUXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTBcbiAgICAgKi9cbiAgICBzeXMuV0lOUlQgPSAxMDtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gV1A4XG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTFcbiAgICAgKi9cbiAgICBzeXMuV1A4ID0gMTE7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IE1PQklMRV9CUk9XU0VSXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTAwXG4gICAgICovXG4gICAgc3lzLk1PQklMRV9CUk9XU0VSID0gMTAwO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBERVNLVE9QX0JST1dTRVJcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxMDFcbiAgICAgKi9cbiAgICBzeXMuREVTS1RPUF9CUk9XU0VSID0gMTAxO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgZXhlY3V0ZXMgaW4gZWRpdG9yJ3Mgd2luZG93IHByb2Nlc3MgKEVsZWN0cm9uJ3MgcmVuZGVyZXIgY29udGV4dClcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRURJVE9SX1BBR0VcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxMDJcbiAgICAgKi9cbiAgICBzeXMuRURJVE9SX1BBR0UgPSAxMDI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgZXhlY3V0ZXMgaW4gZWRpdG9yJ3MgbWFpbiBwcm9jZXNzIChFbGVjdHJvbidzIGJyb3dzZXIgY29udGV4dClcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRURJVE9SX0NPUkVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxMDNcbiAgICAgKi9cbiAgICBzeXMuRURJVE9SX0NPUkUgPSAxMDM7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFdFQ0hBVF9HQU1FXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTA0XG4gICAgICovXG4gICAgc3lzLldFQ0hBVF9HQU1FID0gMTA0O1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBRUV9QTEFZXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTA1XG4gICAgICovXG4gICAgc3lzLlFRX1BMQVkgPSAxMDU7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEZCX1BMQVlBQkxFX0FEU1xuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IDEwNlxuICAgICAqL1xuICAgIHN5cy5GQl9QTEFZQUJMRV9BRFMgPSAxMDY7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEJBSURVX0dBTUVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxMDdcbiAgICAgKi9cbiAgICBzeXMuQkFJRFVfR0FNRSA9IDEwNztcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gVklWT19HQU1FXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTA4XG4gICAgICovXG4gICAgc3lzLlZJVk9fR0FNRSA9IDEwODtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gT1BQT19HQU1FXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTA5XG4gICAgICovXG4gICAgc3lzLk9QUE9fR0FNRSA9IDEwOTtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gSFVBV0VJX0dBTUVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxMTBcbiAgICAgKi9cbiAgICBzeXMuSFVBV0VJX0dBTUUgPSAxMTA7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFhJQU9NSV9HQU1FXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTExXG4gICAgICovXG4gICAgc3lzLlhJQU9NSV9HQU1FID0gMTExO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBKS1dfR0FNRVxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IDExMlxuICAgICAqL1xuICAgIHN5cy5KS1dfR0FNRSA9IDExMjtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQUxJUEFZX0dBTUVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxMTNcbiAgICAgKi9cbiAgICBzeXMuQUxJUEFZX0dBTUUgPSAxMTM7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFdFQ0hBVF9HQU1FX1NVQlxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IDExNFxuICAgICAqL1xuICAgIHN5cy5XRUNIQVRfR0FNRV9TVUIgPSAxMTQ7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEJBSURVX0dBTUVfU1VCXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTE1XG4gICAgICovXG4gICAgc3lzLkJBSURVX0dBTUVfU1VCID0gMTE1O1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBRVFRfR0FNRVxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IDExNlxuICAgICAqL1xuICAgIHN5cy5RVFRfR0FNRSA9IDExNjtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQllURURBTkNFX0dBTUVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxMTdcbiAgICAgKi9cbiAgICBzeXMuQllURURBTkNFX0dBTUUgPSAxMTdcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQllURURBTkNFX0dBTUVfU1VCXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgMTE4XG4gICAgICovXG4gICAgc3lzLkJZVEVEQU5DRV9HQU1FX1NVQiA9IDExODtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTElOS1NVUkVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCAxMTlcbiAgICAgKi9cbiAgICBzeXMuTElOS1NVUkUgPSAxMTk7XG4gICAgLyoqXG4gICAgICogQlJPV1NFUl9UWVBFX1dFQ0hBVFxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfV0VDSEFUXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgXCJ3ZWNoYXRcIlxuICAgICAqL1xuICAgIHN5cy5CUk9XU0VSX1RZUEVfV0VDSEFUID0gXCJ3ZWNoYXRcIjtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfQU5EUk9JRFxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IFwiYW5kcm9pZGJyb3dzZXJcIlxuICAgICAqL1xuICAgIHN5cy5CUk9XU0VSX1RZUEVfQU5EUk9JRCA9IFwiYW5kcm9pZGJyb3dzZXJcIjtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfSUVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcImllXCJcbiAgICAgKi9cbiAgICBzeXMuQlJPV1NFUl9UWVBFX0lFID0gXCJpZVwiO1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9FREdFXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgXCJlZGdlXCJcbiAgICAgKi9cbiAgICBzeXMuQlJPV1NFUl9UWVBFX0VER0UgPSBcImVkZ2VcIjtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfUVFcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcInFxYnJvd3NlclwiXG4gICAgICovXG4gICAgc3lzLkJST1dTRVJfVFlQRV9RUSA9IFwicXFicm93c2VyXCI7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX01PQklMRV9RUVxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IFwibXFxYnJvd3NlclwiXG4gICAgICovXG4gICAgc3lzLkJST1dTRVJfVFlQRV9NT0JJTEVfUVEgPSBcIm1xcWJyb3dzZXJcIjtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfVUNcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcInVjYnJvd3NlclwiXG4gICAgICovXG4gICAgc3lzLkJST1dTRVJfVFlQRV9VQyA9IFwidWNicm93c2VyXCI7XG4gICAgLyoqXG4gICAgICogdWMgdGhpcmQgcGFydHkgaW50ZWdyYXRpb24uXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9VQ0JTXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgXCJ1Y2JzXCJcbiAgICAgKi9cbiAgICBzeXMuQlJPV1NFUl9UWVBFX1VDQlMgPSBcInVjYnNcIjtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfMzYwXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgXCIzNjBicm93c2VyXCJcbiAgICAgKi9cbiAgICBzeXMuQlJPV1NFUl9UWVBFXzM2MCA9IFwiMzYwYnJvd3NlclwiO1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9CQUlEVV9BUFBcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcImJhaWR1Ym94YXBwXCJcbiAgICAgKi9cbiAgICBzeXMuQlJPV1NFUl9UWVBFX0JBSURVX0FQUCA9IFwiYmFpZHVib3hhcHBcIjtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfQkFJRFVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcImJhaWR1YnJvd3NlclwiXG4gICAgICovXG4gICAgc3lzLkJST1dTRVJfVFlQRV9CQUlEVSA9IFwiYmFpZHVicm93c2VyXCI7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX01BWFRIT05cbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcIm1heHRob25cIlxuICAgICAqL1xuICAgIHN5cy5CUk9XU0VSX1RZUEVfTUFYVEhPTiA9IFwibWF4dGhvblwiO1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9PUEVSQVxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IFwib3BlcmFcIlxuICAgICAqL1xuICAgIHN5cy5CUk9XU0VSX1RZUEVfT1BFUkEgPSBcIm9wZXJhXCI7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX09VUEVOR1xuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IFwib3VwZW5nXCJcbiAgICAgKi9cbiAgICBzeXMuQlJPV1NFUl9UWVBFX09VUEVORyA9IFwib3VwZW5nXCI7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX01JVUlcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcIm1pdWlicm93c2VyXCJcbiAgICAgKi9cbiAgICBzeXMuQlJPV1NFUl9UWVBFX01JVUkgPSBcIm1pdWlicm93c2VyXCI7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX0ZJUkVGT1hcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcImZpcmVmb3hcIlxuICAgICAqL1xuICAgIHN5cy5CUk9XU0VSX1RZUEVfRklSRUZPWCA9IFwiZmlyZWZveFwiO1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9TQUZBUklcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcInNhZmFyaVwiXG4gICAgICovXG4gICAgc3lzLkJST1dTRVJfVFlQRV9TQUZBUkkgPSBcInNhZmFyaVwiO1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9DSFJPTUVcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcImNocm9tZVwiXG4gICAgICovXG4gICAgc3lzLkJST1dTRVJfVFlQRV9DSFJPTUUgPSBcImNocm9tZVwiO1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9MSUVCQU9cbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAZGVmYXVsdCBcImxpZWJhb1wiXG4gICAgICovXG4gICAgc3lzLkJST1dTRVJfVFlQRV9MSUVCQU8gPSBcImxpZWJhb1wiO1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9RWk9ORVxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IFwicXpvbmVcIlxuICAgICAqL1xuICAgIHN5cy5CUk9XU0VSX1RZUEVfUVpPTkUgPSBcInF6b25lXCI7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX1NPVUdPVVxuICAgICAqIEByZWFkT25seVxuICAgICAqIEBkZWZhdWx0IFwic29nb3VcIlxuICAgICAqL1xuICAgIHN5cy5CUk9XU0VSX1RZUEVfU09VR09VID0gXCJzb2dvdVwiO1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9VTktOT1dOXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQGRlZmF1bHQgXCJ1bmtub3duXCJcbiAgICAgKi9cbiAgICBzeXMuQlJPV1NFUl9UWVBFX1VOS05PV04gPSBcInVua25vd25cIjtcblxuICAgIC8qKlxuICAgICAqIElzIG5hdGl2ZSA/IFRoaXMgaXMgc2V0IHRvIGJlIHRydWUgaW4ganNiIGF1dG8uXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBpc05hdGl2ZVxuICAgICAqL1xuICAgIHN5cy5pc05hdGl2ZSA9IENDX0pTQiB8fCBDQ19SVU5USU1FO1xuXG4gICAgLyoqXG4gICAgICogSXMgd2ViIGJyb3dzZXIgP1xuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNCcm93c2VyXG4gICAgICovXG4gICAgc3lzLmlzQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHR5cGVvZiBkb2N1bWVudCA9PT0gJ29iamVjdCcgJiYgIUNDX0pTQiAmJiAhQ0NfUlVOVElNRTtcblxuICAgIC8qKlxuICAgICAqIElzIHdlYmdsIGV4dGVuc2lvbiBzdXBwb3J0P1xuICAgICAqIEBtZXRob2QgZ2xFeHRlbnNpb25cbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqL1xuICAgIHN5cy5nbEV4dGVuc2lvbiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiAhIWNjLnJlbmRlcmVyLmRldmljZS5leHQobmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IG1heCBqb2ludCBtYXRyaXggc2l6ZSBmb3Igc2tpbm5lZCBtZXNoIHJlbmRlcmVyLlxuICAgICAqIEBtZXRob2QgZ2V0TWF4Sm9pbnRNYXRyaXhTaXplXG4gICAgICovXG4gICAgc3lzLmdldE1heEpvaW50TWF0cml4U2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFzeXMuX21heEpvaW50TWF0cml4U2l6ZSkge1xuICAgICAgICAgICAgY29uc3QgSk9JTlRfTUFUUklDRVNfU0laRSA9IDUwO1xuICAgICAgICAgICAgY29uc3QgTEVGVF9VTklGT1JNX1NJWkUgPSAxMDtcblxuICAgICAgICAgICAgbGV0IGdsID0gY2MuZ2FtZS5fcmVuZGVyQ29udGV4dDtcbiAgICAgICAgICAgIGxldCBtYXhVbmlmb3JtcyA9IE1hdGguZmxvb3IoZ2wuZ2V0UGFyYW1ldGVyKGdsLk1BWF9WRVJURVhfVU5JRk9STV9WRUNUT1JTKSAvIDQpIC0gTEVGVF9VTklGT1JNX1NJWkU7XG4gICAgICAgICAgICBpZiAobWF4VW5pZm9ybXMgPCBKT0lOVF9NQVRSSUNFU19TSVpFKSB7XG4gICAgICAgICAgICAgICAgc3lzLl9tYXhKb2ludE1hdHJpeFNpemUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3lzLl9tYXhKb2ludE1hdHJpeFNpemUgPSBKT0lOVF9NQVRSSUNFU19TSVpFO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzeXMuX21heEpvaW50TWF0cml4U2l6ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyB0aGUgc2FmZSBhcmVhIG9mIHRoZSBzY3JlZW4uIElmIHRoZSBzY3JlZW4gaXMgbm90IG5vdGNoZWQsIHRoZSBkZXNpZ24gcmVzb2x1dGlvbiB3aWxsIGJlIHJldHVybmVkIGJ5IGRlZmF1bHQuXG4gICAgICogT25seSBzdXBwb3J0ZWQgb24gQW5kcm9pZCwgaU9TIGFuZCBXZUNoYXQgTWluaSBHYW1lIHBsYXRmb3JtLlxuICAgICAqICEjemhcbiAgICAgKiDov5Tlm57miYvmnLrlsY/luZXlronlhajljLrln5/vvIzlpoLmnpzkuI3mmK/lvILlvaLlsY/lsIbpu5jorqTov5Tlm57orr7orqHliIbovqjnjoflsLrlr7jjgILnm67liY3lj6rmlK/mjIHlronljZPjgIFpT1Mg5Y6f55Sf5bmz5Y+w5ZKM5b6u5L+h5bCP5ri45oiP5bmz5Y+w44CCXG4gICAgICogQG1ldGhvZCBnZXRTYWZlQXJlYVJlY3RcbiAgICAgKiBAcmV0dXJuIHtSZWN0fVxuICAgICovXG4gICBzeXMuZ2V0U2FmZUFyZWFSZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgdmlzaWJsZVNpemUgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCk7XG4gICAgICAgIHJldHVybiBjYy5yZWN0KDAsIDAsIHZpc2libGVTaXplLndpZHRoLCB2aXNpYmxlU2l6ZS5oZWlnaHQpO1xuICAgIH07XG5cbiAgICBpZiAoX2dsb2JhbC5fX2dsb2JhbEFkYXB0ZXIgJiYgX2dsb2JhbC5fX2dsb2JhbEFkYXB0ZXIuYWRhcHRTeXMpIHtcbiAgICAgICAgLy8gaW5pdCBzeXMgaW5mbyBpbiBhZGFwdGVyXG4gICAgICAgIF9nbG9iYWwuX19nbG9iYWxBZGFwdGVyLmFkYXB0U3lzKHN5cyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKENDX0VESVRPUiAmJiBFZGl0b3IuaXNNYWluUHJvY2Vzcykge1xuICAgICAgICBzeXMuaXNNb2JpbGUgPSBmYWxzZTtcbiAgICAgICAgc3lzLnBsYXRmb3JtID0gc3lzLkVESVRPUl9DT1JFO1xuICAgICAgICBzeXMubGFuZ3VhZ2UgPSBzeXMuTEFOR1VBR0VfVU5LTk9XTjtcbiAgICAgICAgc3lzLmxhbmd1YWdlQ29kZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgc3lzLm9zID0gKHtcbiAgICAgICAgICAgIGRhcndpbjogc3lzLk9TX09TWCxcbiAgICAgICAgICAgIHdpbjMyOiBzeXMuT1NfV0lORE9XUyxcbiAgICAgICAgICAgIGxpbnV4OiBzeXMuT1NfTElOVVhcbiAgICAgICAgfSlbcHJvY2Vzcy5wbGF0Zm9ybV0gfHwgc3lzLk9TX1VOS05PV047XG4gICAgICAgIHN5cy5icm93c2VyVHlwZSA9IG51bGw7XG4gICAgICAgIHN5cy5icm93c2VyVmVyc2lvbiA9IG51bGw7XG4gICAgICAgIHN5cy53aW5kb3dQaXhlbFJlc29sdXRpb24gPSB7XG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgIGhlaWdodDogMFxuICAgICAgICB9O1xuICAgICAgICBzeXMuY2FwYWJpbGl0aWVzID0ge1xuICAgICAgICAgICAgJ2ltYWdlQml0bWFwJzogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgc3lzLl9fYXVkaW9TdXBwb3J0ID0ge307XG4gICAgfVxuICAgIGVsc2UgaWYgKENDX0pTQiB8fCBDQ19SVU5USU1FKSB7XG4gICAgICAgIGxldCBwbGF0Zm9ybTtcbiAgICAgICAgaWYgKGlzVml2b0dhbWUpIHtcbiAgICAgICAgICAgIHBsYXRmb3JtID0gc3lzLlZJVk9fR0FNRTtcbiAgICAgICAgfSBlbHNlIGlmIChpc09wcG9HYW1lKSB7XG4gICAgICAgICAgICBwbGF0Zm9ybSA9IHN5cy5PUFBPX0dBTUU7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNIdWF3ZWlHYW1lKSB7XG4gICAgICAgICAgICBwbGF0Zm9ybSA9IHN5cy5IVUFXRUlfR0FNRTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0pLV0dhbWUpIHtcbiAgICAgICAgICAgIHBsYXRmb3JtID0gc3lzLkpLV19HQU1FO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUXR0R2FtZSkge1xuICAgICAgICAgICAgcGxhdGZvcm0gPSBzeXMuUVRUX0dBTUU7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNMaW5rU3VyZSkge1xuICAgICAgICAgICAgcGxhdGZvcm0gPSBzeXMuTElOS1NVUkU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwbGF0Zm9ybSA9IF9fZ2V0UGxhdGZvcm0oKTtcbiAgICAgICAgfVxuICAgICAgICBzeXMucGxhdGZvcm0gPSBwbGF0Zm9ybTtcbiAgICAgICAgc3lzLmlzTW9iaWxlID0gKHBsYXRmb3JtID09PSBzeXMuQU5EUk9JRCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm0gPT09IHN5cy5JUEFEIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybSA9PT0gc3lzLklQSE9ORSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm0gPT09IHN5cy5XUDggfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtID09PSBzeXMuVElaRU4gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtID09PSBzeXMuQkxBQ0tCRVJSWSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm0gPT09IHN5cy5YSUFPTUlfR0FNRSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNWaXZvR2FtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNPcHBvR2FtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNIdWF3ZWlHYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0pLV0dhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUXR0R2FtZSk7XG5cbiAgICAgICAgc3lzLm9zID0gX19nZXRPUygpO1xuICAgICAgICBzeXMubGFuZ3VhZ2UgPSBfX2dldEN1cnJlbnRMYW5ndWFnZSgpO1xuICAgICAgICB2YXIgbGFuZ3VhZ2VDb2RlOyBcbiAgICAgICAgaWYgKENDX0pTQikge1xuICAgICAgICAgICAgbGFuZ3VhZ2VDb2RlID0gX19nZXRDdXJyZW50TGFuZ3VhZ2VDb2RlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3lzLmxhbmd1YWdlQ29kZSA9IGxhbmd1YWdlQ29kZSA/IGxhbmd1YWdlQ29kZS50b0xvd2VyQ2FzZSgpIDogdW5kZWZpbmVkO1xuICAgICAgICBzeXMub3NWZXJzaW9uID0gX19nZXRPU1ZlcnNpb24oKTtcbiAgICAgICAgc3lzLm9zTWFpblZlcnNpb24gPSBwYXJzZUludChzeXMub3NWZXJzaW9uKTtcbiAgICAgICAgc3lzLmJyb3dzZXJUeXBlID0gbnVsbDtcbiAgICAgICAgc3lzLmJyb3dzZXJWZXJzaW9uID0gbnVsbDtcblxuICAgICAgICB2YXIgdyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB2YXIgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgdmFyIHJhdGlvID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgICAgICAgc3lzLndpbmRvd1BpeGVsUmVzb2x1dGlvbiA9IHtcbiAgICAgICAgICAgIHdpZHRoOiByYXRpbyAqIHcsXG4gICAgICAgICAgICBoZWlnaHQ6IHJhdGlvICogaFxuICAgICAgICB9O1xuXG4gICAgICAgIHN5cy5sb2NhbFN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuXG4gICAgICAgIHZhciBjYXBhYmlsaXRpZXM7XG4gICAgICAgIGNhcGFiaWxpdGllcyA9IHN5cy5jYXBhYmlsaXRpZXMgPSB7XG4gICAgICAgICAgICBcImNhbnZhc1wiOiBmYWxzZSxcbiAgICAgICAgICAgIFwib3BlbmdsXCI6IHRydWUsXG4gICAgICAgICAgICBcIndlYnBcIjogdHJ1ZSxcbiAgICAgICAgfTtcblxuICAgICAgIGlmIChzeXMuaXNNb2JpbGUpIHtcbiAgICAgICAgICAgIGNhcGFiaWxpdGllc1tcImFjY2VsZXJvbWV0ZXJcIl0gPSB0cnVlO1xuICAgICAgICAgICAgY2FwYWJpbGl0aWVzW1widG91Y2hlc1wiXSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkZXNrdG9wXG4gICAgICAgICAgICBjYXBhYmlsaXRpZXNbXCJrZXlib2FyZFwiXSA9IHRydWU7XG4gICAgICAgICAgICBjYXBhYmlsaXRpZXNbXCJtb3VzZVwiXSA9IHRydWU7XG4gICAgICAgICAgICBjYXBhYmlsaXRpZXNbXCJ0b3VjaGVzXCJdID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjYXBhYmlsaXRpZXNbJ2ltYWdlQml0bWFwJ10gPSBmYWxzZTtcblxuICAgICAgICBzeXMuX19hdWRpb1N1cHBvcnQgPSB7XG4gICAgICAgICAgICBPTkxZX09ORTogZmFsc2UsXG4gICAgICAgICAgICBXRUJfQVVESU86IGZhbHNlLFxuICAgICAgICAgICAgREVMQVlfQ1JFQVRFX0NUWDogZmFsc2UsXG4gICAgICAgICAgICBmb3JtYXQ6IFsnLm1wMyddXG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBicm93c2VyIG9yIHJ1bnRpbWVcbiAgICAgICAgdmFyIHdpbiA9IHdpbmRvdywgbmF2ID0gd2luLm5hdmlnYXRvciwgZG9jID0gZG9jdW1lbnQsIGRvY0VsZSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHZhciB1YSA9IG5hdi51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICBzeXMuaXNNb2JpbGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHN5cy5wbGF0Zm9ybSA9IHN5cy5FRElUT1JfUEFHRTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGUgd2hldGhlciBzeXN0ZW0gaXMgbW9iaWxlIHN5c3RlbVxuICAgICAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBpc01vYmlsZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzeXMuaXNNb2JpbGUgPSAvbW9iaWxlfGFuZHJvaWR8aXBob25lfGlwYWQvLnRlc3QodWEpO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGljYXRlIHRoZSBydW5uaW5nIHBsYXRmb3JtXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gcGxhdGZvcm1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBGYlBsYXlhYmxlQWQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICBzeXMucGxhdGZvcm0gPSBzeXMuRkJfUExBWUFCTEVfQURTO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3lzLnBsYXRmb3JtID0gc3lzLmlzTW9iaWxlID8gc3lzLk1PQklMRV9CUk9XU0VSIDogc3lzLkRFU0tUT1BfQlJPV1NFUjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjdXJyTGFuZ3VhZ2UgPSBuYXYubGFuZ3VhZ2U7XG4gICAgICAgIGN1cnJMYW5ndWFnZSA9IGN1cnJMYW5ndWFnZSA/IGN1cnJMYW5ndWFnZSA6IG5hdi5icm93c2VyTGFuZ3VhZ2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBjdXJyZW50IGxhbmd1YWdlIGlzbyA2MzktMSBjb2RlLlxuICAgICAgICAgKiBFeGFtcGxlcyBvZiB2YWxpZCBsYW5ndWFnZSBjb2RlcyBpbmNsdWRlIFwiemgtdHdcIiwgXCJlblwiLCBcImVuLXVzXCIsIFwiZnJcIiwgXCJmci1mclwiLCBcImVzLWVzXCIsIGV0Yy5cbiAgICAgICAgICogVGhlIGFjdHVhbCB2YWx1ZSB0b3RhbGx5IGRlcGVuZHMgb24gcmVzdWx0cyBwcm92aWRlZCBieSBkZXN0aW5hdGlvbiBwbGF0Zm9ybS5cbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IGxhbmd1YWdlQ29kZVxuICAgICAgICAgKi9cbiAgICAgICAgc3lzLmxhbmd1YWdlQ29kZSA9IGN1cnJMYW5ndWFnZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGN1cnJMYW5ndWFnZSA9IGN1cnJMYW5ndWFnZSA/IGN1cnJMYW5ndWFnZS5zcGxpdChcIi1cIilbMF0gOiBzeXMuTEFOR1VBR0VfRU5HTElTSDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5kaWNhdGUgdGhlIGN1cnJlbnQgbGFuZ3VhZ2Ugb2YgdGhlIHJ1bm5pbmcgc3lzdGVtXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBsYW5ndWFnZVxuICAgICAgICAgKi9cbiAgICAgICAgc3lzLmxhbmd1YWdlID0gY3Vyckxhbmd1YWdlO1xuXG4gICAgICAgIC8vIEdldCB0aGUgb3Mgb2Ygc3lzdGVtXG4gICAgICAgIHZhciBpc0FuZHJvaWQgPSBmYWxzZSwgaU9TID0gZmFsc2UsIG9zVmVyc2lvbiA9ICcnLCBvc01haW5WZXJzaW9uID0gMDtcbiAgICAgICAgdmFyIHVhUmVzdWx0ID0gL2FuZHJvaWRcXHMqKFxcZCsoPzpcXC5cXGQrKSopL2kuZXhlYyh1YSkgfHwgL2FuZHJvaWRcXHMqKFxcZCsoPzpcXC5cXGQrKSopL2kuZXhlYyhuYXYucGxhdGZvcm0pO1xuICAgICAgICBpZiAodWFSZXN1bHQpIHtcbiAgICAgICAgICAgIGlzQW5kcm9pZCA9IHRydWU7XG4gICAgICAgICAgICBvc1ZlcnNpb24gPSB1YVJlc3VsdFsxXSB8fCAnJztcbiAgICAgICAgICAgIG9zTWFpblZlcnNpb24gPSBwYXJzZUludChvc1ZlcnNpb24pIHx8IDA7XG4gICAgICAgIH1cbiAgICAgICAgdWFSZXN1bHQgPSAvKGlQYWR8aVBob25lfGlQb2QpLipPUyAoKFxcZCtfPyl7MiwzfSkvaS5leGVjKHVhKTtcbiAgICAgICAgaWYgKHVhUmVzdWx0KSB7XG4gICAgICAgICAgICBpT1MgPSB0cnVlO1xuICAgICAgICAgICAgb3NWZXJzaW9uID0gdWFSZXN1bHRbMl0gfHwgJyc7XG4gICAgICAgICAgICBvc01haW5WZXJzaW9uID0gcGFyc2VJbnQob3NWZXJzaW9uKSB8fCAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlZmVyIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9jb2Nvcy1jcmVhdG9yL2VuZ2luZS9wdWxsLzU1NDIgLCB0aGFua3MgZm9yIGNvbnRyaWJpdGlvbiBmcm9tIEBrcmFwbmlra2tcbiAgICAgICAgLy8gaXBhZCBPUyAxMyBzYWZhcmkgaWRlbnRpZmllcyBpdHNlbGYgYXMgXCJNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMF8xNSkgQXBwbGVXZWJLaXQvNjA1LjEuMTUgKEtIVE1MLCBsaWtlIEdlY2tvKVwiIFxuICAgICAgICAvLyBzbyB1c2UgbWF4VG91Y2hQb2ludHMgdG8gY2hlY2sgd2hldGhlciBpdCdzIGRlc2t0b3Agc2FmYXJpIG9yIG5vdC4gXG4gICAgICAgIC8vIHJlZmVyZW5jZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTgwMTk0NjMvaG93LXRvLWRldGVjdC1kZXZpY2UtbmFtZS1pbi1zYWZhcmktb24taW9zLTEzLXdoaWxlLWl0LWRvZXNudC1zaG93LXRoZS1jb3JyZWN0XG4gICAgICAgIC8vIEZJWE1FOiBzaG91bGQgcmVtb3ZlIGl0IHdoZW4gdG91Y2gtZW5hYmxlZCBtYWNzIGFyZSBhdmFpbGFibGVcbiAgICAgICAgZWxzZSBpZiAoLyhpUGhvbmV8aVBhZHxpUG9kKS8uZXhlYyhuYXYucGxhdGZvcm0pIHx8IChuYXYucGxhdGZvcm0gPT09ICdNYWNJbnRlbCcgJiYgbmF2Lm1heFRvdWNoUG9pbnRzICYmIG5hdi5tYXhUb3VjaFBvaW50cyA+IDEpKSB7IFxuICAgICAgICAgICAgaU9TID0gdHJ1ZTtcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9ICcnO1xuICAgICAgICAgICAgb3NNYWluVmVyc2lvbiA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3NOYW1lID0gc3lzLk9TX1VOS05PV047XG4gICAgICAgIGlmIChuYXYuYXBwVmVyc2lvbi5pbmRleE9mKFwiV2luXCIpICE9PSAtMSkgb3NOYW1lID0gc3lzLk9TX1dJTkRPV1M7XG4gICAgICAgIGVsc2UgaWYgKGlPUykgb3NOYW1lID0gc3lzLk9TX0lPUztcbiAgICAgICAgZWxzZSBpZiAobmF2LmFwcFZlcnNpb24uaW5kZXhPZihcIk1hY1wiKSAhPT0gLTEpIG9zTmFtZSA9IHN5cy5PU19PU1g7XG4gICAgICAgIGVsc2UgaWYgKG5hdi5hcHBWZXJzaW9uLmluZGV4T2YoXCJYMTFcIikgIT09IC0xICYmIG5hdi5hcHBWZXJzaW9uLmluZGV4T2YoXCJMaW51eFwiKSA9PT0gLTEpIG9zTmFtZSA9IHN5cy5PU19VTklYO1xuICAgICAgICBlbHNlIGlmIChpc0FuZHJvaWQpIG9zTmFtZSA9IHN5cy5PU19BTkRST0lEO1xuICAgICAgICBlbHNlIGlmIChuYXYuYXBwVmVyc2lvbi5pbmRleE9mKFwiTGludXhcIikgIT09IC0xIHx8IHVhLmluZGV4T2YoXCJ1YnVudHVcIikgIT09IC0xKSBvc05hbWUgPSBzeXMuT1NfTElOVVg7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluZGljYXRlIHRoZSBydW5uaW5nIG9zIG5hbWVcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IG9zXG4gICAgICAgICAqL1xuICAgICAgICBzeXMub3MgPSBvc05hbWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmRpY2F0ZSB0aGUgcnVubmluZyBvcyB2ZXJzaW9uXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBvc1ZlcnNpb25cbiAgICAgICAgICovXG4gICAgICAgIHN5cy5vc1ZlcnNpb24gPSBvc1ZlcnNpb247XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmRpY2F0ZSB0aGUgcnVubmluZyBvcyBtYWluIHZlcnNpb25cbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG9zTWFpblZlcnNpb25cbiAgICAgICAgICovXG4gICAgICAgIHN5cy5vc01haW5WZXJzaW9uID0gb3NNYWluVmVyc2lvbjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5kaWNhdGUgdGhlIHJ1bm5pbmcgYnJvd3NlciB0eXBlXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nIHwgbnVsbH0gYnJvd3NlclR5cGVcbiAgICAgICAgICovXG4gICAgICAgIHN5cy5icm93c2VyVHlwZSA9IHN5cy5CUk9XU0VSX1RZUEVfVU5LTk9XTjtcbiAgICAgICAgLyogRGV0ZXJtaW5lIHRoZSBicm93c2VyIHR5cGUgKi9cbiAgICAgICAgKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdHlwZVJlZzEgPSAvbXFxYnJvd3NlcnxtaWNyb21lc3NlbmdlcnxxcWJyb3dzZXJ8c29nb3V8cXpvbmV8bGllYmFvfG1heHRob258dWNic3wzNjAgYXBob25lfDM2MGJyb3dzZXJ8YmFpZHVib3hhcHB8YmFpZHVicm93c2VyfG1heHRob258bXhicm93c2VyfG1pdWlicm93c2VyL2k7XG4gICAgICAgICAgICB2YXIgdHlwZVJlZzIgPSAvcXF8dWNicm93c2VyfHVicm93c2VyfGVkZ2UvaTtcbiAgICAgICAgICAgIHZhciB0eXBlUmVnMyA9IC9jaHJvbWV8c2FmYXJpfGZpcmVmb3h8dHJpZGVudHxvcGVyYXxvcHJcXC98b3VwZW5nL2k7XG4gICAgICAgICAgICB2YXIgYnJvd3NlclR5cGVzID0gdHlwZVJlZzEuZXhlYyh1YSkgfHwgdHlwZVJlZzIuZXhlYyh1YSkgfHwgdHlwZVJlZzMuZXhlYyh1YSk7XG5cbiAgICAgICAgICAgIHZhciBicm93c2VyVHlwZSA9IGJyb3dzZXJUeXBlcyA/IGJyb3dzZXJUeXBlc1swXS50b0xvd2VyQ2FzZSgpIDogc3lzLkJST1dTRVJfVFlQRV9VTktOT1dOO1xuXG4gICAgICAgICAgICBpZiAoYnJvd3NlclR5cGUgPT09IFwic2FmYXJpXCIgJiYgaXNBbmRyb2lkKVxuICAgICAgICAgICAgICAgIGJyb3dzZXJUeXBlID0gc3lzLkJST1dTRVJfVFlQRV9BTkRST0lEO1xuICAgICAgICAgICAgZWxzZSBpZiAoYnJvd3NlclR5cGUgPT09IFwicXFcIiAmJiB1YS5tYXRjaCgvYW5kcm9pZC4qYXBwbGV3ZWJraXQvaSkpXG4gICAgICAgICAgICAgICAgYnJvd3NlclR5cGUgPSBzeXMuQlJPV1NFUl9UWVBFX0FORFJPSUQ7XG4gICAgICAgICAgICBsZXQgdHlwZU1hcCA9IHtcbiAgICAgICAgICAgICAgICAnbWljcm9tZXNzZW5nZXInOiBzeXMuQlJPV1NFUl9UWVBFX1dFQ0hBVCxcbiAgICAgICAgICAgICAgICAndHJpZGVudCc6IHN5cy5CUk9XU0VSX1RZUEVfSUUsXG4gICAgICAgICAgICAgICAgJ2VkZ2UnOiBzeXMuQlJPV1NFUl9UWVBFX0VER0UsXG4gICAgICAgICAgICAgICAgJzM2MCBhcGhvbmUnOiBzeXMuQlJPV1NFUl9UWVBFXzM2MCxcbiAgICAgICAgICAgICAgICAnbXhicm93c2VyJzogc3lzLkJST1dTRVJfVFlQRV9NQVhUSE9OLFxuICAgICAgICAgICAgICAgICdvcHIvJzogc3lzLkJST1dTRVJfVFlQRV9PUEVSQSxcbiAgICAgICAgICAgICAgICAndWJyb3dzZXInOiBzeXMuQlJPV1NFUl9UWVBFX1VDXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzeXMuYnJvd3NlclR5cGUgPSB0eXBlTWFwW2Jyb3dzZXJUeXBlXSB8fCBicm93c2VyVHlwZTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5kaWNhdGUgdGhlIHJ1bm5pbmcgYnJvd3NlciB2ZXJzaW9uXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nIHwgbnVsbH0gYnJvd3NlclZlcnNpb25cbiAgICAgICAgICovXG4gICAgICAgIHN5cy5icm93c2VyVmVyc2lvbiA9IFwiXCI7XG4gICAgICAgIC8qIERldGVybWluZSB0aGUgYnJvd3NlciB2ZXJzaW9uIG51bWJlciAqL1xuICAgICAgICAoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2ZXJzaW9uUmVnMSA9IC8obXFxYnJvd3NlcnxtaWNyb21lc3NlbmdlcnxxcWJyb3dzZXJ8c29nb3V8cXpvbmV8bGllYmFvfG1heHRob258dWN8dWNic3wzNjAgYXBob25lfDM2MHxiYWlkdWJveGFwcHxiYWlkdXxtYXh0aG9ufG14YnJvd3NlcnxtaXVpKD86Lmh5YnJpZCk/KShtb2JpbGUpPyhicm93c2VyKT9cXC8/KFtcXGQuXSspL2k7XG4gICAgICAgICAgICB2YXIgdmVyc2lvblJlZzIgPSAvKHFxfGNocm9tZXxzYWZhcml8ZmlyZWZveHx0cmlkZW50fG9wZXJhfG9wclxcL3xvdXBlbmcpKG1vYmlsZSk/KGJyb3dzZXIpP1xcLz8oW1xcZC5dKykvaTtcbiAgICAgICAgICAgIHZhciB0bXAgPSB1YS5tYXRjaCh2ZXJzaW9uUmVnMSk7XG4gICAgICAgICAgICBpZighdG1wKSB0bXAgPSB1YS5tYXRjaCh2ZXJzaW9uUmVnMik7XG4gICAgICAgICAgICBzeXMuYnJvd3NlclZlcnNpb24gPSB0bXAgPyB0bXBbNF0gOiBcIlwiO1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIHZhciB3ID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICB2YXIgaCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICB2YXIgcmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmRpY2F0ZSB0aGUgcmVhbCBwaXhlbCByZXNvbHV0aW9uIG9mIHRoZSB3aG9sZSBnYW1lIHdpbmRvd1xuICAgICAgICAgKiBAcHJvcGVydHkge1NpemV9IHdpbmRvd1BpeGVsUmVzb2x1dGlvblxuICAgICAgICAgKi9cbiAgICAgICAgc3lzLndpbmRvd1BpeGVsUmVzb2x1dGlvbiA9IHtcbiAgICAgICAgICAgIHdpZHRoOiByYXRpbyAqIHcsXG4gICAgICAgICAgICBoZWlnaHQ6IHJhdGlvICogaFxuICAgICAgICB9O1xuXG4gICAgICAgIHN5cy5fY2hlY2tXZWJHTFJlbmRlck1vZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoY2MuZ2FtZS5yZW5kZXJUeXBlICE9PSBjYy5nYW1lLlJFTkRFUl9UWVBFX1dFQkdMKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgZmVhdHVyZSBzdXBwb3J0cyBXZWJHTCByZW5kZXIgbW9kZSBvbmx5LlwiKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgX3RtcENhbnZhczEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuXG4gICAgICAgIHZhciBjcmVhdGUzRENvbnRleHQgPSBmdW5jdGlvbiAoY2FudmFzLCBvcHRfYXR0cmlicywgb3B0X2NvbnRleHRUeXBlKSB7XG4gICAgICAgICAgICBpZiAob3B0X2NvbnRleHRUeXBlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbnZhcy5nZXRDb250ZXh0KG9wdF9jb250ZXh0VHlwZSwgb3B0X2F0dHJpYnMpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZTNEQ29udGV4dChjYW52YXMsIG9wdF9hdHRyaWJzLCBcIndlYmdsXCIpIHx8XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZTNEQ29udGV4dChjYW52YXMsIG9wdF9hdHRyaWJzLCBcImV4cGVyaW1lbnRhbC13ZWJnbFwiKSB8fFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGUzRENvbnRleHQoY2FudmFzLCBvcHRfYXR0cmlicywgXCJ3ZWJraXQtM2RcIikgfHxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlM0RDb250ZXh0KGNhbnZhcywgb3B0X2F0dHJpYnMsIFwibW96LXdlYmdsXCIpIHx8XG4gICAgICAgICAgICAgICAgICAgIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNjLnN5cy5sb2NhbFN0b3JhZ2UgaXMgYSBsb2NhbCBzdG9yYWdlIGNvbXBvbmVudC5cbiAgICAgICAgICogQHByb3BlcnR5IHtPYmplY3R9IGxvY2FsU3RvcmFnZVxuICAgICAgICAgKi9cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBsb2NhbFN0b3JhZ2UgPSBzeXMubG9jYWxTdG9yYWdlID0gd2luLmxvY2FsU3RvcmFnZTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic3RvcmFnZVwiLCBcIlwiKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwic3RvcmFnZVwiKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZSA9IG51bGw7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHZhciB3YXJuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNjLndhcm5JRCg1MjAwKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzeXMubG9jYWxTdG9yYWdlID0ge1xuICAgICAgICAgICAgICAgIGdldEl0ZW0gOiB3YXJuLFxuICAgICAgICAgICAgICAgIHNldEl0ZW0gOiB3YXJuLFxuICAgICAgICAgICAgICAgIHJlbW92ZUl0ZW0gOiB3YXJuLFxuICAgICAgICAgICAgICAgIGNsZWFyIDogd2FyblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfc3VwcG9ydFdlYnAgPSBfdG1wQ2FudmFzMS50b0RhdGFVUkwoJ2ltYWdlL3dlYnAnKS5zdGFydHNXaXRoKCdkYXRhOmltYWdlL3dlYnAnKTtcbiAgICAgICAgdmFyIF9zdXBwb3J0Q2FudmFzID0gISFfdG1wQ2FudmFzMS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHZhciBfc3VwcG9ydFdlYkdMID0gZmFsc2U7XG4gICAgICAgIGlmIChDQ19URVNUKSB7XG4gICAgICAgICAgICBfc3VwcG9ydFdlYkdMID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAod2luLldlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xuICAgICAgICAgICAgX3N1cHBvcnRXZWJHTCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNhcGFiaWxpdGllcyBvZiB0aGUgY3VycmVudCBwbGF0Zm9ybVxuICAgICAgICAgKiBAcHJvcGVydHkge09iamVjdH0gY2FwYWJpbGl0aWVzXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgY2FwYWJpbGl0aWVzID0gc3lzLmNhcGFiaWxpdGllcyA9IHtcbiAgICAgICAgICAgIFwiY2FudmFzXCI6IF9zdXBwb3J0Q2FudmFzLFxuICAgICAgICAgICAgXCJvcGVuZ2xcIjogX3N1cHBvcnRXZWJHTCxcbiAgICAgICAgICAgIFwid2VicFwiOiBfc3VwcG9ydFdlYnAsXG4gICAgICAgICAgICAnaW1hZ2VCaXRtYXAnOiBmYWxzZSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodHlwZW9mIGNyZWF0ZUltYWdlQml0bWFwICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIF90bXBDYW52YXMxLndpZHRoID0gX3RtcENhbnZhczEuaGVpZ2h0ID0gMjtcbiAgICAgICAgICAgIGNyZWF0ZUltYWdlQml0bWFwKF90bXBDYW52YXMxLCB7fSkudGhlbihpbWFnZUJpdG1hcCA9PiB7XG4gICAgICAgICAgICAgICAgY2FwYWJpbGl0aWVzLmltYWdlQml0bWFwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpbWFnZUJpdG1hcC5jbG9zZSAmJiBpbWFnZUJpdG1hcC5jbG9zZSgpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHt9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZG9jRWxlWydvbnRvdWNoc3RhcnQnXSAhPT0gdW5kZWZpbmVkIHx8IGRvY1snb250b3VjaHN0YXJ0J10gIT09IHVuZGVmaW5lZCB8fCBuYXYubXNQb2ludGVyRW5hYmxlZClcbiAgICAgICAgICAgIGNhcGFiaWxpdGllc1tcInRvdWNoZXNcIl0gPSB0cnVlO1xuICAgICAgICBpZiAoZG9jRWxlWydvbm1vdXNldXAnXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgY2FwYWJpbGl0aWVzW1wibW91c2VcIl0gPSB0cnVlO1xuICAgICAgICBpZiAoZG9jRWxlWydvbmtleXVwJ10gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGNhcGFiaWxpdGllc1tcImtleWJvYXJkXCJdID0gdHJ1ZTtcbiAgICAgICAgaWYgKHdpbi5EZXZpY2VNb3Rpb25FdmVudCB8fCB3aW4uRGV2aWNlT3JpZW50YXRpb25FdmVudClcbiAgICAgICAgICAgIGNhcGFiaWxpdGllc1tcImFjY2VsZXJvbWV0ZXJcIl0gPSB0cnVlO1xuXG4gICAgICAgIHZhciBfX2F1ZGlvU3VwcG9ydDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQXVkaW8gc3VwcG9ydCBpbiB0aGUgYnJvd3NlclxuICAgICAgICAgKlxuICAgICAgICAgKiBNVUxUSV9DSEFOTkVMICAgICAgICA6IE11bHRpcGxlIGF1ZGlvIHdoaWxlIHBsYXlpbmcgLSBJZiBpdCBkb2Vzbid0LCB5b3UgY2FuIG9ubHkgcGxheSBiYWNrZ3JvdW5kIG11c2ljXG4gICAgICAgICAqIFdFQl9BVURJTyAgICAgICAgICAgIDogU3VwcG9ydCBmb3IgV2ViQXVkaW8gLSBTdXBwb3J0IFczQyBXZWJBdWRpbyBzdGFuZGFyZHMsIGFsbCBvZiB0aGUgYXVkaW8gY2FuIGJlIHBsYXllZFxuICAgICAgICAgKiBBVVRPUExBWSAgICAgICAgICAgICA6IFN1cHBvcnRzIGF1dG8tcGxheSBhdWRpbyAtIGlmIERvbuKAmHQgc3VwcG9ydCBpdCwgT24gYSB0b3VjaCBkZXRlY3RpbmcgYmFja2dyb3VuZCBtdXNpYyBjYW52YXMsIGFuZCB0aGVuIHJlcGxheVxuICAgICAgICAgKiBSRVBMQVlfQUZURVJfVE9VQ0ggICA6IFRoZSBmaXJzdCBtdXNpYyB3aWxsIGZhaWwsIG11c3QgYmUgcmVwbGF5IGFmdGVyIHRvdWNoc3RhcnRcbiAgICAgICAgICogVVNFX0VNUFRJRURfRVZFTlQgICAgOiBXaGV0aGVyIHRvIHVzZSB0aGUgZW1wdGllZCBldmVudCB0byByZXBsYWNlIGxvYWQgY2FsbGJhY2tcbiAgICAgICAgICogREVMQVlfQ1JFQVRFX0NUWCAgICAgOiBkZWxheSBjcmVhdGVkIHRoZSBjb250ZXh0IG9iamVjdCAtIG9ubHkgd2ViQXVkaW9cbiAgICAgICAgICogTkVFRF9NQU5VQUxfTE9PUCAgICAgOiBsb29wIGF0dHJpYnV0ZSBmYWlsdXJlLCBuZWVkIHRvIHBlcmZvcm0gbG9vcCBtYW51YWxseVxuICAgICAgICAgKlxuICAgICAgICAgKiBNYXkgYmUgbW9kaWZpY2F0aW9ucyBmb3IgYSBmZXcgYnJvd3NlciB2ZXJzaW9uXG4gICAgICAgICAqL1xuICAgICAgICAoZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdmFyIERFQlVHID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHZhciB2ZXJzaW9uID0gc3lzLmJyb3dzZXJWZXJzaW9uO1xuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiBicm93c2VyIHN1cHBvcnRzIFdlYiBBdWRpb1xuICAgICAgICAgICAgLy8gY2hlY2sgV2ViIEF1ZGlvJ3MgY29udGV4dFxuICAgICAgICAgICAgdmFyIHN1cHBvcnRXZWJBdWRpbyA9ICEhKHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCB8fCB3aW5kb3cubW96QXVkaW9Db250ZXh0KTtcblxuICAgICAgICAgICAgX19hdWRpb1N1cHBvcnQgPSB7IE9OTFlfT05FOiBmYWxzZSwgV0VCX0FVRElPOiBzdXBwb3J0V2ViQXVkaW8sIERFTEFZX0NSRUFURV9DVFg6IGZhbHNlIH07XG5cbiAgICAgICAgICAgIGlmIChzeXMub3MgPT09IHN5cy5PU19JT1MpIHtcbiAgICAgICAgICAgICAgICAvLyBJT1Mgbm8gZXZlbnQgdGhhdCB1c2VkIHRvIHBhcnNlIGNvbXBsZXRlZCBjYWxsYmFja1xuICAgICAgICAgICAgICAgIC8vIHRoaXMgdGltZSBpcyBub3QgY29tcGxldGUsIGNhbiBub3QgcGxheVxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgX19hdWRpb1N1cHBvcnQuVVNFX0xPQURFUl9FVkVOVCA9ICdsb2FkZWRtZXRhZGF0YSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzeXMuYnJvd3NlclR5cGUgPT09IHN5cy5CUk9XU0VSX1RZUEVfRklSRUZPWCkge1xuICAgICAgICAgICAgICAgIF9fYXVkaW9TdXBwb3J0LkRFTEFZX0NSRUFURV9DVFggPSB0cnVlO1xuICAgICAgICAgICAgICAgIF9fYXVkaW9TdXBwb3J0LlVTRV9MT0FERVJfRVZFTlQgPSAnY2FucGxheSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzeXMub3MgPT09IHN5cy5PU19BTkRST0lEKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN5cy5icm93c2VyVHlwZSA9PT0gc3lzLkJST1dTRVJfVFlQRV9VQykge1xuICAgICAgICAgICAgICAgICAgICBfX2F1ZGlvU3VwcG9ydC5PTkVfU09VUkNFID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKERFQlVHKXtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygnYnJvd3NlIHR5cGU6ICcgKyBzeXMuYnJvd3NlclR5cGUpO1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ2Jyb3dzZSB2ZXJzaW9uOiAnICsgdmVyc2lvbik7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygnTVVMVElfQ0hBTk5FTDogJyArIF9fYXVkaW9TdXBwb3J0Lk1VTFRJX0NIQU5ORUwpO1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ1dFQl9BVURJTzogJyArIF9fYXVkaW9TdXBwb3J0LldFQl9BVURJTyk7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygnQVVUT1BMQVk6ICcgKyBfX2F1ZGlvU3VwcG9ydC5BVVRPUExBWSk7XG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChfX2F1ZGlvU3VwcG9ydC5XRUJfQVVESU8pIHtcbiAgICAgICAgICAgICAgICBfX2F1ZGlvU3VwcG9ydC5jb250ZXh0ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQgfHwgd2luZG93Lm1vekF1ZGlvQ29udGV4dCkoKTtcbiAgICAgICAgICAgICAgICBpZihfX2F1ZGlvU3VwcG9ydC5ERUxBWV9DUkVBVEVfQ1RYKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgX19hdWRpb1N1cHBvcnQuY29udGV4dCA9IG5ldyAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0IHx8IHdpbmRvdy5tb3pBdWRpb0NvbnRleHQpKCk7IH0sIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICAgICAgX19hdWRpb1N1cHBvcnQuV0VCX0FVRElPID0gZmFsc2U7XG4gICAgICAgICAgICBjYy5sb2dJRCg1MjAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmb3JtYXRTdXBwb3J0ID0gW107XG5cbiAgICAgICAgKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgYXVkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpO1xuICAgICAgICAgICAgaWYoYXVkaW8uY2FuUGxheVR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2dnID0gYXVkaW8uY2FuUGxheVR5cGUoJ2F1ZGlvL29nZzsgY29kZWNzPVwidm9yYmlzXCInKTtcbiAgICAgICAgICAgICAgICBpZiAob2dnKSBmb3JtYXRTdXBwb3J0LnB1c2goJy5vZ2cnKTtcbiAgICAgICAgICAgICAgICB2YXIgbXAzID0gYXVkaW8uY2FuUGxheVR5cGUoJ2F1ZGlvL21wZWcnKTtcbiAgICAgICAgICAgICAgICBpZiAobXAzKSBmb3JtYXRTdXBwb3J0LnB1c2goJy5tcDMnKTtcbiAgICAgICAgICAgICAgICB2YXIgd2F2ID0gYXVkaW8uY2FuUGxheVR5cGUoJ2F1ZGlvL3dhdjsgY29kZWNzPVwiMVwiJyk7XG4gICAgICAgICAgICAgICAgaWYgKHdhdikgZm9ybWF0U3VwcG9ydC5wdXNoKCcud2F2Jyk7XG4gICAgICAgICAgICAgICAgdmFyIG1wNCA9IGF1ZGlvLmNhblBsYXlUeXBlKCdhdWRpby9tcDQnKTtcbiAgICAgICAgICAgICAgICBpZiAobXA0KSBmb3JtYXRTdXBwb3J0LnB1c2goJy5tcDQnKTtcbiAgICAgICAgICAgICAgICB2YXIgbTRhID0gYXVkaW8uY2FuUGxheVR5cGUoJ2F1ZGlvL3gtbTRhJyk7XG4gICAgICAgICAgICAgICAgaWYgKG00YSkgZm9ybWF0U3VwcG9ydC5wdXNoKCcubTRhJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgICAgIF9fYXVkaW9TdXBwb3J0LmZvcm1hdCA9IGZvcm1hdFN1cHBvcnQ7XG5cbiAgICAgICAgc3lzLl9fYXVkaW9TdXBwb3J0ID0gX19hdWRpb1N1cHBvcnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIE5ldHdvcmsgdHlwZSBlbnVtZXJhdGlvblxuICAgICAqICEjemhcbiAgICAgKiDnvZHnu5znsbvlnovmnprkuL5cbiAgICAgKlxuICAgICAqIEBlbnVtIHN5cy5OZXR3b3JrVHlwZVxuICAgICAqL1xuICAgIHN5cy5OZXR3b3JrVHlwZSA9IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogTmV0d29yayBpcyB1bnJlYWNoYWJsZS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDnvZHnu5zkuI3pgJpcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IE5PTkVcbiAgICAgICAgICovXG4gICAgICAgIE5PTkU6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIE5ldHdvcmsgaXMgcmVhY2hhYmxlIHZpYSBXaUZpIG9yIGNhYmxlLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOmAmui/h+aXoOe6v+aIluiAheaciee6v+acrOWcsOe9kee7nOi/nuaOpeWboOeJuee9kVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTEFOXG4gICAgICAgICAqL1xuICAgICAgICBMQU46IDEsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIE5ldHdvcmsgaXMgcmVhY2hhYmxlIHZpYSBXaXJlbGVzcyBXaWRlIEFyZWEgTmV0d29ya1xuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOmAmui/h+icgueqneenu+WKqOe9kee7nOi/nuaOpeWboOeJuee9kVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gV1dBTlxuICAgICAgICAgKi9cbiAgICAgICAgV1dBTjogMlxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAY2xhc3Mgc3lzXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHRoZSBuZXR3b3JrIHR5cGUgb2YgY3VycmVudCBkZXZpY2UsIHJldHVybiBjYy5zeXMuTmV0d29ya1R5cGUuTEFOIGlmIGZhaWx1cmUuXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluW9k+WJjeiuvuWkh+eahOe9kee7nOexu+Weiywg5aaC5p6c572R57uc57G75Z6L5peg5rOV6I635Y+W77yM6buY6K6k5bCG6L+U5ZueIGNjLnN5cy5OZXR3b3JrVHlwZS5MQU5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0TmV0d29ya1R5cGVcbiAgICAgKiBAcmV0dXJuIHtzeXMuTmV0d29ya1R5cGV9XG4gICAgICovXG4gICAgc3lzLmdldE5ldHdvcmtUeXBlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFRPRE86IG5lZWQgdG8gaW1wbGVtZW50IHRoaXMgZm9yIG1vYmlsZSBwaG9uZXMuXG4gICAgICAgIHJldHVybiBzeXMuTmV0d29ya1R5cGUuTEFOO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHRoZSBiYXR0ZXJ5IGxldmVsIG9mIGN1cnJlbnQgZGV2aWNlLCByZXR1cm4gMS4wIGlmIGZhaWx1cmUuXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluW9k+WJjeiuvuWkh+eahOeUteaxoOeUtemHj++8jOWmguaenOeUtemHj+aXoOazleiOt+WPlu+8jOm7mOiupOWwhui/lOWbniAxXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGdldEJhdHRlcnlMZXZlbFxuICAgICAqIEByZXR1cm4ge051bWJlcn0gLSAwLjAgfiAxLjBcbiAgICAgKi9cbiAgICBzeXMuZ2V0QmF0dGVyeUxldmVsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFRPRE86IG5lZWQgdG8gaW1wbGVtZW50IHRoaXMgZm9yIG1vYmlsZSBwaG9uZXMuXG4gICAgICAgIHJldHVybiAxLjA7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZvcmNlcyB0aGUgZ2FyYmFnZSBjb2xsZWN0aW9uLCBvbmx5IGF2YWlsYWJsZSBpbiBKU0JcbiAgICAgKiBAbWV0aG9kIGdhcmJhZ2VDb2xsZWN0XG4gICAgICovXG4gICAgc3lzLmdhcmJhZ2VDb2xsZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBOL0EgaW4gd2ViXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlc3RhcnQgdGhlIEpTIFZNLCBvbmx5IGF2YWlsYWJsZSBpbiBKU0JcbiAgICAgKiBAbWV0aG9kIHJlc3RhcnRWTVxuICAgICAqL1xuICAgIHN5cy5yZXN0YXJ0Vk0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIE4vQSBpbiB3ZWJcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgd2hldGhlciBhbiBvYmplY3QgaXMgdmFsaWQsXG4gICAgICogSW4gd2ViIGVuZ2luZSwgaXQgd2lsbCByZXR1cm4gdHJ1ZSBpZiB0aGUgb2JqZWN0IGV4aXN0XG4gICAgICogSW4gbmF0aXZlIGVuZ2luZSwgaXQgd2lsbCByZXR1cm4gdHJ1ZSBpZiB0aGUgSlMgb2JqZWN0IGFuZCB0aGUgY29ycmVzcG9uZCBuYXRpdmUgb2JqZWN0IGFyZSBib3RoIHZhbGlkXG4gICAgICogQG1ldGhvZCBpc09iamVjdFZhbGlkXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFZhbGlkaXR5IG9mIHRoZSBvYmplY3RcbiAgICAgKi9cbiAgICBzeXMuaXNPYmplY3RWYWxpZCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgaWYgKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEdW1wIHN5c3RlbSBpbmZvcm1hdGlvbnNcbiAgICAgKiBAbWV0aG9kIGR1bXBcbiAgICAgKi9cbiAgICBzeXMuZHVtcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgc3RyID0gXCJcIjtcbiAgICAgICAgc3RyICs9IFwiaXNNb2JpbGUgOiBcIiArIHNlbGYuaXNNb2JpbGUgKyBcIlxcclxcblwiO1xuICAgICAgICBzdHIgKz0gXCJsYW5ndWFnZSA6IFwiICsgc2VsZi5sYW5ndWFnZSArIFwiXFxyXFxuXCI7XG4gICAgICAgIHN0ciArPSBcImJyb3dzZXJUeXBlIDogXCIgKyBzZWxmLmJyb3dzZXJUeXBlICsgXCJcXHJcXG5cIjtcbiAgICAgICAgc3RyICs9IFwiYnJvd3NlclZlcnNpb24gOiBcIiArIHNlbGYuYnJvd3NlclZlcnNpb24gKyBcIlxcclxcblwiO1xuICAgICAgICBzdHIgKz0gXCJjYXBhYmlsaXRpZXMgOiBcIiArIEpTT04uc3RyaW5naWZ5KHNlbGYuY2FwYWJpbGl0aWVzKSArIFwiXFxyXFxuXCI7XG4gICAgICAgIHN0ciArPSBcIm9zIDogXCIgKyBzZWxmLm9zICsgXCJcXHJcXG5cIjtcbiAgICAgICAgc3RyICs9IFwib3NWZXJzaW9uIDogXCIgKyBzZWxmLm9zVmVyc2lvbiArIFwiXFxyXFxuXCI7XG4gICAgICAgIHN0ciArPSBcInBsYXRmb3JtIDogXCIgKyBzZWxmLnBsYXRmb3JtICsgXCJcXHJcXG5cIjtcbiAgICAgICAgc3RyICs9IFwiVXNpbmcgXCIgKyAoY2MuZ2FtZS5yZW5kZXJUeXBlID09PSBjYy5nYW1lLlJFTkRFUl9UWVBFX1dFQkdMID8gXCJXRUJHTFwiIDogXCJDQU5WQVNcIikgKyBcIiByZW5kZXJlci5cIiArIFwiXFxyXFxuXCI7XG4gICAgICAgIGNjLmxvZyhzdHIpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBPcGVuIGEgdXJsIGluIGJyb3dzZXJcbiAgICAgKiBAbWV0aG9kIG9wZW5VUkxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gICAgICovXG4gICAgc3lzLm9wZW5VUkwgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIGlmIChDQ19KU0IgfHwgQ0NfUlVOVElNRSkge1xuICAgICAgICAgICAganNiLm9wZW5VUkwodXJsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKHVybCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGVsYXBzZWQgc2luY2UgMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDLlxuICAgICAqIEBtZXRob2Qgbm93XG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIHN5cy5ub3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChEYXRlLm5vdykge1xuICAgICAgICAgICAgcmV0dXJuIERhdGUubm93KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKyhuZXcgRGF0ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHN5cztcbn1cblxudmFyIHN5cyA9IGNjICYmIGNjLnN5cyA/IGNjLnN5cyA6IGluaXRTeXMoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBzeXM7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==