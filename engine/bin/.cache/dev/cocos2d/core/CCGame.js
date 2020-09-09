
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/CCGame.js';
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
var EventTarget = require('./event/event-target');

require('../audio/CCAudioEngine');

var debug = require('./CCDebug');

var renderer = require('./renderer/index.js');

var dynamicAtlasManager = require('../core/renderer/utils/dynamic-atlas/manager');
/**
 * @module cc
 */

/**
 * !#en An object to boot the game.
 * !#zh 包含游戏主体信息并负责驱动游戏的游戏对象。
 * @class Game
 * @extends EventTarget
 */


var game = {
  /**
   * !#en Event triggered when game hide to background.
   * Please note that this event is not 100% guaranteed to be fired on Web platform,
   * on native platforms, it corresponds to enter background event, os status bar or notification center may not trigger this event.
   * !#zh 游戏进入后台时触发的事件。
   * 请注意，在 WEB 平台，这个事件不一定会 100% 触发，这完全取决于浏览器的回调行为。
   * 在原生平台，它对应的是应用被切换到后台事件，下拉菜单和上拉状态栏等不一定会触发这个事件，这取决于系统行为。
   * @property EVENT_HIDE
   * @type {String}
   * @example
   * cc.game.on(cc.game.EVENT_HIDE, function () {
   *     cc.audioEngine.pauseMusic();
   *     cc.audioEngine.pauseAllEffects();
   * });
   */
  EVENT_HIDE: "game_on_hide",

  /**
   * !#en Event triggered when game back to foreground
   * Please note that this event is not 100% guaranteed to be fired on Web platform,
   * on native platforms, it corresponds to enter foreground event.
   * !#zh 游戏进入前台运行时触发的事件。
   * 请注意，在 WEB 平台，这个事件不一定会 100% 触发，这完全取决于浏览器的回调行为。
   * 在原生平台，它对应的是应用被切换到前台事件。
   * @property EVENT_SHOW
   * @constant
   * @type {String}
   */
  EVENT_SHOW: "game_on_show",

  /**
   * !#en Event triggered when game restart
   * !#zh 调用restart后，触发事件。
   * @property EVENT_RESTART
   * @constant
   * @type {String}
   */
  EVENT_RESTART: "game_on_restart",

  /**
   * Event triggered after game inited, at this point all engine objects and game scripts are loaded
   * @property EVENT_GAME_INITED
   * @constant
   * @type {String}
   */
  EVENT_GAME_INITED: "game_inited",

  /**
   * Event triggered after engine inited, at this point you will be able to use all engine classes. 
   * It was defined as EVENT_RENDERER_INITED in cocos creator v1.x and renamed in v2.0
   * @property EVENT_ENGINE_INITED
   * @constant
   * @type {String}
   */
  EVENT_ENGINE_INITED: "engine_inited",
  // deprecated
  EVENT_RENDERER_INITED: "engine_inited",

  /**
   * Web Canvas 2d API as renderer backend
   * @property RENDER_TYPE_CANVAS
   * @constant
   * @type {Number}
   */
  RENDER_TYPE_CANVAS: 0,

  /**
   * WebGL API as renderer backend
   * @property RENDER_TYPE_WEBGL
   * @constant
   * @type {Number}
   */
  RENDER_TYPE_WEBGL: 1,

  /**
   * OpenGL API as renderer backend
   * @property RENDER_TYPE_OPENGL
   * @constant
   * @type {Number}
   */
  RENDER_TYPE_OPENGL: 2,
  _persistRootNodes: {},
  // states
  _paused: true,
  //whether the game is paused
  _configLoaded: false,
  //whether config loaded
  _isCloning: false,
  // deserializing or instantiating
  _prepared: false,
  //whether the engine has prepared
  _rendererInitialized: false,
  _renderContext: null,
  _intervalId: null,
  //interval target of main
  _lastTime: null,
  _frameTime: null,

  /**
   * !#en The outer frame of the game canvas, parent of game container.
   * !#zh 游戏画布的外框，container 的父容器。
   * @property frame
   * @type {Object}
   */
  frame: null,

  /**
   * !#en The container of game canvas.
   * !#zh 游戏画布的容器。
   * @property container
   * @type {HTMLDivElement}
   */
  container: null,

  /**
   * !#en The canvas of the game.
   * !#zh 游戏的画布。
   * @property canvas
   * @type {HTMLCanvasElement}
   */
  canvas: null,

  /**
   * !#en The renderer backend of the game.
   * !#zh 游戏的渲染器类型。
   * @property renderType
   * @type {Number}
   */
  renderType: -1,

  /**
   * !#en
   * The current game configuration, including:<br/>
   * 1. debugMode<br/>
   *      "debugMode" possible values :<br/>
   *      0 - No message will be printed.                                                      <br/>
   *      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.                      <br/>
   *      2 - cc.error, cc.assert, cc.warn will print in console.                              <br/>
   *      3 - cc.error, cc.assert will print in console.                                       <br/>
   *      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.<br/>
   *      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.        <br/>
   *      6 - cc.error, cc.assert will print on canvas, available only on web.                 <br/>
   * 2. showFPS<br/>
   *      Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.<br/>
   * 3. exposeClassName<br/>
   *      Expose class name to chrome debug tools, the class intantiate performance is a little bit slower when exposed.<br/>
   * 4. frameRate<br/>
   *      "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.<br/>
   * 5. id<br/>
   *      "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.<br/>
   * 6. renderMode<br/>
   *      "renderMode" sets the renderer type, only useful on web :<br/>
   *      0 - Automatically chosen by engine<br/>
   *      1 - Forced to use canvas renderer<br/>
   *      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers<br/>
   *<br/>
   * Please DO NOT modify this object directly, it won't have any effect.<br/>
   * !#zh
   * 当前的游戏配置，包括：                                                                  <br/>
   * 1. debugMode（debug 模式，但是在浏览器中这个选项会被忽略）                                <br/>
   *      "debugMode" 各种设置选项的意义。                                                   <br/>
   *          0 - 没有消息被打印出来。                                                       <br/>
   *          1 - cc.error，cc.assert，cc.warn，cc.log 将打印在 console 中。                  <br/>
   *          2 - cc.error，cc.assert，cc.warn 将打印在 console 中。                          <br/>
   *          3 - cc.error，cc.assert 将打印在 console 中。                                   <br/>
   *          4 - cc.error，cc.assert，cc.warn，cc.log 将打印在 canvas 中（仅适用于 web 端）。 <br/>
   *          5 - cc.error，cc.assert，cc.warn 将打印在 canvas 中（仅适用于 web 端）。         <br/>
   *          6 - cc.error，cc.assert 将打印在 canvas 中（仅适用于 web 端）。                  <br/>
   * 2. showFPS（显示 FPS）                                                            <br/>
   *      当 showFPS 为 true 的时候界面的左下角将显示 fps 的信息，否则被隐藏。              <br/>
   * 3. exposeClassName                                                           <br/>
   *      暴露类名让 Chrome DevTools 可以识别，如果开启会稍稍降低类的创建过程的性能，但对对象构造没有影响。 <br/>
   * 4. frameRate (帧率)                                                              <br/>
   *      “frameRate” 设置想要的帧率你的游戏，但真正的FPS取决于你的游戏实现和运行环境。      <br/>
   * 5. id                                                                            <br/>
   *      "gameCanvas" Web 页面上的 Canvas Element ID，仅适用于 web 端。                         <br/>
   * 6. renderMode（渲染模式）                                                         <br/>
   *      “renderMode” 设置渲染器类型，仅适用于 web 端：                              <br/>
   *          0 - 通过引擎自动选择。                                                     <br/>
   *          1 - 强制使用 canvas 渲染。
   *          2 - 强制使用 WebGL 渲染，但是在部分 Android 浏览器中这个选项会被忽略。     <br/>
   * <br/>
   * 注意：请不要直接修改这个对象，它不会有任何效果。
   * @property config
   * @type {Object}
   */
  config: null,

  /**
   * !#en Callback when the scripts of engine have been load.
   * !#zh 当引擎完成启动后的回调函数。
   * @method onStart
   * @type {Function}
   */
  onStart: null,
  //@Public Methods
  //  @Game play control

  /**
   * !#en Set frame rate of game.
   * !#zh 设置游戏帧率。
   * @method setFrameRate
   * @param {Number} frameRate
   */
  setFrameRate: function setFrameRate(frameRate) {
    var config = this.config;
    config.frameRate = frameRate;
    if (this._intervalId) window.cancelAnimFrame(this._intervalId);
    this._intervalId = 0;
    this._paused = true;

    this._setAnimFrame();

    this._runMainLoop();
  },

  /**
   * !#en Get frame rate set for the game, it doesn't represent the real frame rate.
   * !#zh 获取设置的游戏帧率（不等同于实际帧率）。
   * @method getFrameRate
   * @return {Number} frame rate
   */
  getFrameRate: function getFrameRate() {
    return this.config.frameRate;
  },

  /**
   * !#en Run the game frame by frame.
   * !#zh 执行一帧游戏循环。
   * @method step
   */
  step: function step() {
    cc.director.mainLoop();
  },

  /**
   * !#en Pause the game main loop. This will pause:
   * game logic execution, rendering process, event manager, background music and all audio effects.
   * This is different with cc.director.pause which only pause the game logic execution.
   * !#zh 暂停游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效。这点和只暂停游戏逻辑的 cc.director.pause 不同。
   * @method pause
   */
  pause: function pause() {
    if (this._paused) return;
    this._paused = true; // Pause audio engine

    if (cc.audioEngine) {
      cc.audioEngine._break();
    } // Pause main loop


    if (this._intervalId) window.cancelAnimFrame(this._intervalId);
    this._intervalId = 0;
  },

  /**
   * !#en Resume the game from pause. This will resume:
   * game logic execution, rendering process, event manager, background music and all audio effects.
   * !#zh 恢复游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效。
   * @method resume
   */
  resume: function resume() {
    if (!this._paused) return;
    this._paused = false; // Resume audio engine

    if (cc.audioEngine) {
      cc.audioEngine._restore();
    }

    cc.director._resetDeltaTime(); // Resume main loop


    this._runMainLoop();
  },

  /**
   * !#en Check whether the game is paused.
   * !#zh 判断游戏是否暂停。
   * @method isPaused
   * @return {Boolean}
   */
  isPaused: function isPaused() {
    return this._paused;
  },

  /**
   * !#en Restart game.
   * !#zh 重新开始游戏
   * @method restart
   */
  restart: function restart() {
    cc.director.once(cc.Director.EVENT_AFTER_DRAW, function () {
      for (var id in game._persistRootNodes) {
        game.removePersistRootNode(game._persistRootNodes[id]);
      } // Clear scene


      cc.director.getScene().destroy();

      cc.Object._deferredDestroy(); // Clean up audio


      if (cc.audioEngine) {
        cc.audioEngine.uncacheAll();
      }

      cc.director.reset();
      game.pause();
      cc.assetManager.builtins.init(function () {
        game.onStart();
        game.emit(game.EVENT_RESTART);
      });
    });
  },

  /**
   * !#en End game, it will close the game window
   * !#zh 退出游戏
   * @method end
   */
  end: function end() {
    close();
  },
  //  @Game loading
  _initEngine: function _initEngine() {
    if (this._rendererInitialized) {
      return;
    }

    this._initRenderer();

    if (!CC_EDITOR) {
      this._initEvents();
    }

    this.emit(this.EVENT_ENGINE_INITED);
  },
  _loadPreviewScript: function _loadPreviewScript(cb) {
    if (CC_PREVIEW && window.__quick_compile_project__) {
      window.__quick_compile_project__.load(cb);
    } else {
      cb();
    }
  },
  _prepareFinished: function _prepareFinished(cb) {
    var _this = this;

    // Init engine
    this._initEngine();

    this._setAnimFrame();

    cc.assetManager.builtins.init(function () {
      // Log engine version
      console.log('Cocos Creator v' + cc.ENGINE_VERSION);
      _this._prepared = true;

      _this._runMainLoop();

      _this.emit(_this.EVENT_GAME_INITED);

      if (cb) cb();
    });
  },
  eventTargetOn: EventTarget.prototype.on,
  eventTargetOnce: EventTarget.prototype.once,

  /**
   * !#en
   * Register an callback of a specific event type on the game object.
   * This type of event should be triggered via `emit`.
   * !#zh
   * 注册 game 的特定事件类型回调。这种类型的事件应该被 `emit` 触发。
   *
   * @method on
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} callback - The callback that will be invoked when the event is dispatched.
   *                              The callback is ignored if it is a duplicate (the callbacks are unique).
   * @param {any} [callback.arg1] arg1
   * @param {any} [callback.arg2] arg2
   * @param {any} [callback.arg3] arg3
   * @param {any} [callback.arg4] arg4
   * @param {any} [callback.arg5] arg5
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null
   * @return {Function} - Just returns the incoming callback so you can save the anonymous function easier.
   * @typescript
   * on<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean): T
   */
  on: function on(type, callback, target, once) {
    // Make sure EVENT_ENGINE_INITED and EVENT_GAME_INITED callbacks to be invoked
    if (this._prepared && type === this.EVENT_ENGINE_INITED || !this._paused && type === this.EVENT_GAME_INITED) {
      callback.call(target);
    } else {
      this.eventTargetOn(type, callback, target, once);
    }
  },

  /**
   * !#en
   * Register an callback of a specific event type on the game object,
   * the callback will remove itself after the first time it is triggered.
   * !#zh
   * 注册 game 的特定事件类型回调，回调会在第一时间被触发后删除自身。
   *
   * @method once
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} callback - The callback that will be invoked when the event is dispatched.
   *                              The callback is ignored if it is a duplicate (the callbacks are unique).
   * @param {any} [callback.arg1] arg1
   * @param {any} [callback.arg2] arg2
   * @param {any} [callback.arg3] arg3
   * @param {any} [callback.arg4] arg4
   * @param {any} [callback.arg5] arg5
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null
   */
  once: function once(type, callback, target) {
    // Make sure EVENT_ENGINE_INITED and EVENT_GAME_INITED callbacks to be invoked
    if (this._prepared && type === this.EVENT_ENGINE_INITED || !this._paused && type === this.EVENT_GAME_INITED) {
      callback.call(target);
    } else {
      this.eventTargetOnce(type, callback, target);
    }
  },

  /**
   * !#en Prepare game.
   * !#zh 准备引擎，请不要直接调用这个函数。
   * @param {Function} cb
   * @method prepare
   */
  prepare: function prepare(cb) {
    var _this2 = this;

    // Already prepared
    if (this._prepared) {
      if (cb) cb();
      return;
    }

    this._loadPreviewScript(function () {
      _this2._prepareFinished(cb);
    });
  },

  /**
   * !#en Run game with configuration object and onStart function.
   * !#zh 运行游戏，并且指定引擎配置和 onStart 的回调。
   * @method run
   * @param {Object} config - Pass configuration object or onStart function
   * @param {Function} onStart - function to be executed after game initialized
   */
  run: function run(config, onStart) {
    this._initConfig(config);

    this.onStart = onStart;
    this.prepare(game.onStart && game.onStart.bind(game));
  },
  //  @ Persist root node section

  /**
   * !#en
   * Add a persistent root node to the game, the persistent node won't be destroyed during scene transition.<br/>
   * The target node must be placed in the root level of hierarchy, otherwise this API won't have any effect.
   * !#zh
   * 声明常驻根节点，该节点不会被在场景切换中被销毁。<br/>
   * 目标节点必须位于为层级的根节点，否则无效。
   * @method addPersistRootNode
   * @param {Node} node - The node to be made persistent
   */
  addPersistRootNode: function addPersistRootNode(node) {
    if (!cc.Node.isNode(node) || !node.uuid) {
      cc.warnID(3800);
      return;
    }

    var id = node.uuid;

    if (!this._persistRootNodes[id]) {
      var scene = cc.director._scene;

      if (cc.isValid(scene)) {
        if (!node.parent) {
          node.parent = scene;
        } else if (!(node.parent instanceof cc.Scene)) {
          cc.warnID(3801);
          return;
        } else if (node.parent !== scene) {
          cc.warnID(3802);
          return;
        }
      }

      this._persistRootNodes[id] = node;
      node._persistNode = true;

      cc.assetManager._releaseManager._addPersistNodeRef(node);
    }
  },

  /**
   * !#en Remove a persistent root node.
   * !#zh 取消常驻根节点。
   * @method removePersistRootNode
   * @param {Node} node - The node to be removed from persistent node list
   */
  removePersistRootNode: function removePersistRootNode(node) {
    var id = node.uuid || '';

    if (node === this._persistRootNodes[id]) {
      delete this._persistRootNodes[id];
      node._persistNode = false;

      cc.assetManager._releaseManager._removePersistNodeRef(node);
    }
  },

  /**
   * !#en Check whether the node is a persistent root node.
   * !#zh 检查节点是否是常驻根节点。
   * @method isPersistRootNode
   * @param {Node} node - The node to be checked
   * @return {Boolean}
   */
  isPersistRootNode: function isPersistRootNode(node) {
    return node._persistNode;
  },
  //@Private Methods
  //  @Time ticker section
  _setAnimFrame: function _setAnimFrame() {
    this._lastTime = performance.now();
    var frameRate = game.config.frameRate;
    this._frameTime = 1000 / frameRate;
    cc.director._maxParticleDeltaTime = this._frameTime / 1000 * 2;

    if (CC_JSB || CC_RUNTIME) {
      jsb.setPreferredFramesPerSecond(frameRate);
      window.requestAnimFrame = window.requestAnimationFrame;
      window.cancelAnimFrame = window.cancelAnimationFrame;
    } else {
      if (frameRate !== 60 && frameRate !== 30) {
        window.requestAnimFrame = this._stTime;
        window.cancelAnimFrame = this._ctTime;
      } else {
        window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || this._stTime;
        window.cancelAnimFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame || this._ctTime;
      }
    }
  },
  _stTime: function _stTime(callback) {
    var currTime = performance.now();
    var timeToCall = Math.max(0, game._frameTime - (currTime - game._lastTime));
    var id = window.setTimeout(function () {
      callback();
    }, timeToCall);
    game._lastTime = currTime + timeToCall;
    return id;
  },
  _ctTime: function _ctTime(id) {
    window.clearTimeout(id);
  },
  //Run game.
  _runMainLoop: function _runMainLoop() {
    if (CC_EDITOR) {
      return;
    }

    if (!this._prepared) return;

    var self = this,
        _callback,
        config = self.config,
        director = cc.director,
        skip = true,
        frameRate = config.frameRate;

    debug.setDisplayStats(config.showFPS);

    _callback = function callback(now) {
      if (!self._paused) {
        self._intervalId = window.requestAnimFrame(_callback);

        if (!CC_JSB && !CC_RUNTIME && frameRate === 30) {
          if (skip = !skip) {
            return;
          }
        }

        director.mainLoop(now);
      }
    };

    self._intervalId = window.requestAnimFrame(_callback);
    self._paused = false;
  },
  //  @Game loading section
  _initConfig: function _initConfig(config) {
    // Configs adjustment
    if (typeof config.debugMode !== 'number') {
      config.debugMode = 0;
    }

    config.exposeClassName = !!config.exposeClassName;

    if (typeof config.frameRate !== 'number') {
      config.frameRate = 60;
    }

    var renderMode = config.renderMode;

    if (typeof renderMode !== 'number' || renderMode > 2 || renderMode < 0) {
      config.renderMode = 0;
    }

    if (typeof config.registerSystemEvent !== 'boolean') {
      config.registerSystemEvent = true;
    }

    if (renderMode === 1) {
      config.showFPS = false;
    } else {
      config.showFPS = !!config.showFPS;
    } // Collide Map and Group List


    this.collisionMatrix = config.collisionMatrix || [];
    this.groupList = config.groupList || [];

    debug._resetDebugSetting(config.debugMode);

    this.config = config;
    this._configLoaded = true;
  },
  _determineRenderType: function _determineRenderType() {
    var config = this.config,
        userRenderMode = parseInt(config.renderMode) || 0; // Determine RenderType

    this.renderType = this.RENDER_TYPE_CANVAS;
    var supportRender = false;

    if (userRenderMode === 0) {
      if (cc.sys.capabilities['opengl']) {
        this.renderType = this.RENDER_TYPE_WEBGL;
        supportRender = true;
      } else if (cc.sys.capabilities['canvas']) {
        this.renderType = this.RENDER_TYPE_CANVAS;
        supportRender = true;
      }
    } else if (userRenderMode === 1 && cc.sys.capabilities['canvas']) {
      this.renderType = this.RENDER_TYPE_CANVAS;
      supportRender = true;
    } else if (userRenderMode === 2 && cc.sys.capabilities['opengl']) {
      this.renderType = this.RENDER_TYPE_WEBGL;
      supportRender = true;
    }

    if (!supportRender) {
      throw new Error(debug.getError(3820, userRenderMode));
    }
  },
  _initRenderer: function _initRenderer() {
    // Avoid setup to be called twice.
    if (this._rendererInitialized) return;
    var el = this.config.id,
        width,
        height,
        localCanvas,
        localContainer;

    if (CC_JSB || CC_RUNTIME) {
      this.container = localContainer = document.createElement("DIV");
      this.frame = localContainer.parentNode === document.body ? document.documentElement : localContainer.parentNode;
      localCanvas = window.__canvas;
      this.canvas = localCanvas;
    } else {
      var addClass = function addClass(element, name) {
        var hasClass = (' ' + element.className + ' ').indexOf(' ' + name + ' ') > -1;

        if (!hasClass) {
          if (element.className) {
            element.className += " ";
          }

          element.className += name;
        }
      };

      var element = el instanceof HTMLElement ? el : document.querySelector(el) || document.querySelector('#' + el);

      if (element.tagName === "CANVAS") {
        width = element.width;
        height = element.height; //it is already a canvas, we wrap it around with a div

        this.canvas = localCanvas = element;

        if (CC_EDITOR) {
          //it is already a canvas, we wrap it around with a div
          this.container = localContainer = document.createElement("DIV");
          if (localCanvas.parentNode) localCanvas.parentNode.insertBefore(localContainer, localCanvas);
        } else {
          // Can not move the existing canvas's position in iOS 14, so use canvas.parentNode as container
          this.container = localContainer = localCanvas.parentNode;
        }
      } else {
        //we must make a new canvas and place into this element
        if (element.tagName !== "DIV") {
          cc.warnID(3819);
        }

        width = element.clientWidth;
        height = element.clientHeight;
        this.canvas = localCanvas = document.createElement("CANVAS");
        this.container = localContainer = document.createElement("DIV");
        element.appendChild(localContainer);
        localCanvas.setAttribute('id', 'GameCanvas');
      }

      localContainer.setAttribute('id', 'Cocos2dGameContainer');
      localCanvas.parentNode !== localContainer && localContainer.appendChild(localCanvas);
      this.frame = localContainer.parentNode === document.body ? document.documentElement : localContainer.parentNode;
      addClass(localCanvas, "gameCanvas");
      localCanvas.setAttribute("width", width || 480);
      localCanvas.setAttribute("height", height || 320);
      localCanvas.setAttribute("tabindex", 99);
    }

    this._determineRenderType(); // WebGL context created successfully


    if (this.renderType === this.RENDER_TYPE_WEBGL) {
      var opts = {
        'stencil': true,
        // MSAA is causing serious performance dropdown on some browsers.
        'antialias': cc.macro.ENABLE_WEBGL_ANTIALIAS,
        'alpha': cc.macro.ENABLE_TRANSPARENT_CANVAS
      };
      renderer.initWebGL(localCanvas, opts);
      this._renderContext = renderer.device._gl; // Enable dynamic atlas manager by default

      if (!cc.macro.CLEANUP_IMAGE_CACHE && dynamicAtlasManager) {
        dynamicAtlasManager.enabled = true;
      }
    }

    if (!this._renderContext) {
      this.renderType = this.RENDER_TYPE_CANVAS; // Could be ignored by module settings

      renderer.initCanvas(localCanvas);
      this._renderContext = renderer.device._ctx;
    }

    this.canvas.oncontextmenu = function () {
      if (!cc._isContextMenuEnable) return false;
    };

    this._rendererInitialized = true;
  },
  _initEvents: function _initEvents() {
    var win = window,
        hiddenPropName; // register system events

    if (this.config.registerSystemEvent) cc.internal.inputManager.registerSystemEvent(this.canvas);

    if (typeof document.hidden !== 'undefined') {
      hiddenPropName = "hidden";
    } else if (typeof document.mozHidden !== 'undefined') {
      hiddenPropName = "mozHidden";
    } else if (typeof document.msHidden !== 'undefined') {
      hiddenPropName = "msHidden";
    } else if (typeof document.webkitHidden !== 'undefined') {
      hiddenPropName = "webkitHidden";
    }

    var hidden = false;

    function onHidden() {
      if (!hidden) {
        hidden = true;
        game.emit(game.EVENT_HIDE);
      }
    } // In order to adapt the most of platforms the onshow API.


    function onShown(arg0, arg1, arg2, arg3, arg4) {
      if (hidden) {
        hidden = false;
        game.emit(game.EVENT_SHOW, arg0, arg1, arg2, arg3, arg4);
      }
    }

    if (hiddenPropName) {
      var changeList = ["visibilitychange", "mozvisibilitychange", "msvisibilitychange", "webkitvisibilitychange", "qbrowserVisibilityChange"];

      for (var i = 0; i < changeList.length; i++) {
        document.addEventListener(changeList[i], function (event) {
          var visible = document[hiddenPropName]; // QQ App

          visible = visible || event["hidden"];
          if (visible) onHidden();else onShown();
        });
      }
    } else {
      win.addEventListener("blur", onHidden);
      win.addEventListener("focus", onShown);
    }

    if (navigator.userAgent.indexOf("MicroMessenger") > -1) {
      win.onfocus = onShown;
    }

    if ("onpageshow" in window && "onpagehide" in window) {
      win.addEventListener("pagehide", onHidden);
      win.addEventListener("pageshow", onShown); // Taobao UIWebKit

      document.addEventListener("pagehide", onHidden);
      document.addEventListener("pageshow", onShown);
    }

    this.on(game.EVENT_HIDE, function () {
      game.pause();
    });
    this.on(game.EVENT_SHOW, function () {
      game.resume();
    });
  }
};
EventTarget.call(game);
cc.js.addon(game, EventTarget.prototype);
/**
 * @module cc
 */

/**
 * !#en This is a Game instance.
 * !#zh 这是一个 Game 类的实例，包含游戏主体信息并负责驱动游戏的游戏对象。。
 * @property game
 * @type Game
 */

cc.game = module.exports = game;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL0NDR2FtZS5qcyJdLCJuYW1lcyI6WyJFdmVudFRhcmdldCIsInJlcXVpcmUiLCJkZWJ1ZyIsInJlbmRlcmVyIiwiZHluYW1pY0F0bGFzTWFuYWdlciIsImdhbWUiLCJFVkVOVF9ISURFIiwiRVZFTlRfU0hPVyIsIkVWRU5UX1JFU1RBUlQiLCJFVkVOVF9HQU1FX0lOSVRFRCIsIkVWRU5UX0VOR0lORV9JTklURUQiLCJFVkVOVF9SRU5ERVJFUl9JTklURUQiLCJSRU5ERVJfVFlQRV9DQU5WQVMiLCJSRU5ERVJfVFlQRV9XRUJHTCIsIlJFTkRFUl9UWVBFX09QRU5HTCIsIl9wZXJzaXN0Um9vdE5vZGVzIiwiX3BhdXNlZCIsIl9jb25maWdMb2FkZWQiLCJfaXNDbG9uaW5nIiwiX3ByZXBhcmVkIiwiX3JlbmRlcmVySW5pdGlhbGl6ZWQiLCJfcmVuZGVyQ29udGV4dCIsIl9pbnRlcnZhbElkIiwiX2xhc3RUaW1lIiwiX2ZyYW1lVGltZSIsImZyYW1lIiwiY29udGFpbmVyIiwiY2FudmFzIiwicmVuZGVyVHlwZSIsImNvbmZpZyIsIm9uU3RhcnQiLCJzZXRGcmFtZVJhdGUiLCJmcmFtZVJhdGUiLCJ3aW5kb3ciLCJjYW5jZWxBbmltRnJhbWUiLCJfc2V0QW5pbUZyYW1lIiwiX3J1bk1haW5Mb29wIiwiZ2V0RnJhbWVSYXRlIiwic3RlcCIsImNjIiwiZGlyZWN0b3IiLCJtYWluTG9vcCIsInBhdXNlIiwiYXVkaW9FbmdpbmUiLCJfYnJlYWsiLCJyZXN1bWUiLCJfcmVzdG9yZSIsIl9yZXNldERlbHRhVGltZSIsImlzUGF1c2VkIiwicmVzdGFydCIsIm9uY2UiLCJEaXJlY3RvciIsIkVWRU5UX0FGVEVSX0RSQVciLCJpZCIsInJlbW92ZVBlcnNpc3RSb290Tm9kZSIsImdldFNjZW5lIiwiZGVzdHJveSIsIk9iamVjdCIsIl9kZWZlcnJlZERlc3Ryb3kiLCJ1bmNhY2hlQWxsIiwicmVzZXQiLCJhc3NldE1hbmFnZXIiLCJidWlsdGlucyIsImluaXQiLCJlbWl0IiwiZW5kIiwiY2xvc2UiLCJfaW5pdEVuZ2luZSIsIl9pbml0UmVuZGVyZXIiLCJDQ19FRElUT1IiLCJfaW5pdEV2ZW50cyIsIl9sb2FkUHJldmlld1NjcmlwdCIsImNiIiwiQ0NfUFJFVklFVyIsIl9fcXVpY2tfY29tcGlsZV9wcm9qZWN0X18iLCJsb2FkIiwiX3ByZXBhcmVGaW5pc2hlZCIsImNvbnNvbGUiLCJsb2ciLCJFTkdJTkVfVkVSU0lPTiIsImV2ZW50VGFyZ2V0T24iLCJwcm90b3R5cGUiLCJvbiIsImV2ZW50VGFyZ2V0T25jZSIsInR5cGUiLCJjYWxsYmFjayIsInRhcmdldCIsImNhbGwiLCJwcmVwYXJlIiwicnVuIiwiX2luaXRDb25maWciLCJiaW5kIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwibm9kZSIsIk5vZGUiLCJpc05vZGUiLCJ1dWlkIiwid2FybklEIiwic2NlbmUiLCJfc2NlbmUiLCJpc1ZhbGlkIiwicGFyZW50IiwiU2NlbmUiLCJfcGVyc2lzdE5vZGUiLCJfcmVsZWFzZU1hbmFnZXIiLCJfYWRkUGVyc2lzdE5vZGVSZWYiLCJfcmVtb3ZlUGVyc2lzdE5vZGVSZWYiLCJpc1BlcnNpc3RSb290Tm9kZSIsInBlcmZvcm1hbmNlIiwibm93IiwiX21heFBhcnRpY2xlRGVsdGFUaW1lIiwiQ0NfSlNCIiwiQ0NfUlVOVElNRSIsImpzYiIsInNldFByZWZlcnJlZEZyYW1lc1BlclNlY29uZCIsInJlcXVlc3RBbmltRnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIl9zdFRpbWUiLCJfY3RUaW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwib1JlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibXNDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJvQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibXNDYW5jZWxBbmltYXRpb25GcmFtZSIsIm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lIiwid2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJvQ2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJjdXJyVGltZSIsInRpbWVUb0NhbGwiLCJNYXRoIiwibWF4Iiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsInNlbGYiLCJza2lwIiwic2V0RGlzcGxheVN0YXRzIiwic2hvd0ZQUyIsImRlYnVnTW9kZSIsImV4cG9zZUNsYXNzTmFtZSIsInJlbmRlck1vZGUiLCJyZWdpc3RlclN5c3RlbUV2ZW50IiwiY29sbGlzaW9uTWF0cml4IiwiZ3JvdXBMaXN0IiwiX3Jlc2V0RGVidWdTZXR0aW5nIiwiX2RldGVybWluZVJlbmRlclR5cGUiLCJ1c2VyUmVuZGVyTW9kZSIsInBhcnNlSW50Iiwic3VwcG9ydFJlbmRlciIsInN5cyIsImNhcGFiaWxpdGllcyIsIkVycm9yIiwiZ2V0RXJyb3IiLCJlbCIsIndpZHRoIiwiaGVpZ2h0IiwibG9jYWxDYW52YXMiLCJsb2NhbENvbnRhaW5lciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInBhcmVudE5vZGUiLCJib2R5IiwiZG9jdW1lbnRFbGVtZW50IiwiX19jYW52YXMiLCJhZGRDbGFzcyIsImVsZW1lbnQiLCJuYW1lIiwiaGFzQ2xhc3MiLCJjbGFzc05hbWUiLCJpbmRleE9mIiwiSFRNTEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGFnTmFtZSIsImluc2VydEJlZm9yZSIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiYXBwZW5kQ2hpbGQiLCJzZXRBdHRyaWJ1dGUiLCJvcHRzIiwibWFjcm8iLCJFTkFCTEVfV0VCR0xfQU5USUFMSUFTIiwiRU5BQkxFX1RSQU5TUEFSRU5UX0NBTlZBUyIsImluaXRXZWJHTCIsImRldmljZSIsIl9nbCIsIkNMRUFOVVBfSU1BR0VfQ0FDSEUiLCJlbmFibGVkIiwiaW5pdENhbnZhcyIsIl9jdHgiLCJvbmNvbnRleHRtZW51IiwiX2lzQ29udGV4dE1lbnVFbmFibGUiLCJ3aW4iLCJoaWRkZW5Qcm9wTmFtZSIsImludGVybmFsIiwiaW5wdXRNYW5hZ2VyIiwiaGlkZGVuIiwibW96SGlkZGVuIiwibXNIaWRkZW4iLCJ3ZWJraXRIaWRkZW4iLCJvbkhpZGRlbiIsIm9uU2hvd24iLCJhcmcwIiwiYXJnMSIsImFyZzIiLCJhcmczIiwiYXJnNCIsImNoYW5nZUxpc3QiLCJpIiwibGVuZ3RoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidmlzaWJsZSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm9uZm9jdXMiLCJqcyIsImFkZG9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLFdBQVcsR0FBR0MsT0FBTyxDQUFDLHNCQUFELENBQXpCOztBQUNBQSxPQUFPLENBQUMsd0JBQUQsQ0FBUDs7QUFDQSxJQUFNQyxLQUFLLEdBQUdELE9BQU8sQ0FBQyxXQUFELENBQXJCOztBQUNBLElBQU1FLFFBQVEsR0FBR0YsT0FBTyxDQUFDLHFCQUFELENBQXhCOztBQUNBLElBQU1HLG1CQUFtQixHQUFHSCxPQUFPLENBQUMsOENBQUQsQ0FBbkM7QUFFQTs7OztBQUlBOzs7Ozs7OztBQU1BLElBQUlJLElBQUksR0FBRztBQUNQOzs7Ozs7Ozs7Ozs7Ozs7QUFlQUMsRUFBQUEsVUFBVSxFQUFFLGNBaEJMOztBQWtCUDs7Ozs7Ozs7Ozs7QUFXQUMsRUFBQUEsVUFBVSxFQUFFLGNBN0JMOztBQStCUDs7Ozs7OztBQU9BQyxFQUFBQSxhQUFhLEVBQUUsaUJBdENSOztBQXdDUDs7Ozs7O0FBTUFDLEVBQUFBLGlCQUFpQixFQUFFLGFBOUNaOztBQWdEUDs7Ozs7OztB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RUQsUUFBSVksU0FBUyxDQUFDQyxTQUFWLENBQW9CNUMsT0FBcEIsQ0FBNEIsZ0JBQTVCLElBQWdELENBQUMsQ0FBckQsRUFBd0Q7QUFDcERzQixNQUFBQSxHQUFHLENBQUN1QixPQUFKLEdBQWNkLE9BQWQ7QUFDSDs7QUFFRCxRQUFJLGdCQUFnQjVLLE1BQWhCLElBQTBCLGdCQUFnQkEsTUFBOUMsRUFBc0Q7QUFDbERtSyxNQUFBQSxHQUFHLENBQUNrQixnQkFBSixDQUFxQixVQUFyQixFQUFpQ1YsUUFBakM7QUFDQVIsTUFBQUEsR0FBRyxDQUFDa0IsZ0JBQUosQ0FBcUIsVUFBckIsRUFBaUNULE9BQWpDLEVBRmtELENBR2xEOztBQUNBMUMsTUFBQUEsUUFBUSxDQUFDbUQsZ0JBQVQsQ0FBMEIsVUFBMUIsRUFBc0NWLFFBQXRDO0FBQ0F6QyxNQUFBQSxRQUFRLENBQUNtRCxnQkFBVCxDQUEwQixVQUExQixFQUFzQ1QsT0FBdEM7QUFDSDs7QUFFRCxTQUFLM0gsRUFBTCxDQUFRN0UsSUFBSSxDQUFDQyxVQUFiLEVBQXlCLFlBQVk7QUFDakNELE1BQUFBLElBQUksQ0FBQ3FDLEtBQUw7QUFDSCxLQUZEO0FBR0EsU0FBS3dDLEVBQUwsQ0FBUTdFLElBQUksQ0FBQ0UsVUFBYixFQUF5QixZQUFZO0FBQ2pDRixNQUFBQSxJQUFJLENBQUN3QyxNQUFMO0FBQ0gsS0FGRDtBQUdIO0FBajBCTSxDQUFYO0FBbzBCQTdDLFdBQVcsQ0FBQ3VGLElBQVosQ0FBaUJsRixJQUFqQjtBQUNBa0MsRUFBRSxDQUFDcUwsRUFBSCxDQUFNQyxLQUFOLENBQVl4TixJQUFaLEVBQWtCTCxXQUFXLENBQUNpRixTQUE5QjtBQUVBOzs7O0FBSUE7Ozs7Ozs7QUFNQTFDLEVBQUUsQ0FBQ2xDLElBQUgsR0FBVXlOLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjFOLElBQTNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIgRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50LXRhcmdldCcpO1xucmVxdWlyZSgnLi4vYXVkaW8vQ0NBdWRpb0VuZ2luZScpO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKCcuL0NDRGVidWcnKTtcbmNvbnN0IHJlbmRlcmVyID0gcmVxdWlyZSgnLi9yZW5kZXJlci9pbmRleC5qcycpO1xuY29uc3QgZHluYW1pY0F0bGFzTWFuYWdlciA9IHJlcXVpcmUoJy4uL2NvcmUvcmVuZGVyZXIvdXRpbHMvZHluYW1pYy1hdGxhcy9tYW5hZ2VyJyk7XG5cbi8qKlxuICogQG1vZHVsZSBjY1xuICovXG5cbi8qKlxuICogISNlbiBBbiBvYmplY3QgdG8gYm9vdCB0aGUgZ2FtZS5cbiAqICEjemgg5YyF5ZCr5ri45oiP5Li75L2T5L+h5oGv5bm26LSf6LSj6amx5Yqo5ri45oiP55qE5ri45oiP5a+56LGh44CCXG4gKiBAY2xhc3MgR2FtZVxuICogQGV4dGVuZHMgRXZlbnRUYXJnZXRcbiAqL1xudmFyIGdhbWUgPSB7XG4gICAgLyoqXG4gICAgICogISNlbiBFdmVudCB0cmlnZ2VyZWQgd2hlbiBnYW1lIGhpZGUgdG8gYmFja2dyb3VuZC5cbiAgICAgKiBQbGVhc2Ugbm90ZSB0aGF0IHRoaXMgZXZlbnQgaXMgbm90IDEwMCUgZ3VhcmFudGVlZCB0byBiZSBmaXJlZCBvbiBXZWIgcGxhdGZvcm0sXG4gICAgICogb24gbmF0aXZlIHBsYXRmb3JtcywgaXQgY29ycmVzcG9uZHMgdG8gZW50ZXIgYmFja2dyb3VuZCBldmVudCwgb3Mgc3RhdHVzIGJhciBvciBub3RpZmljYXRpb24gY2VudGVyIG1heSBub3QgdHJpZ2dlciB0aGlzIGV2ZW50LlxuICAgICAqICEjemgg5ri45oiP6L+b5YWl5ZCO5Y+w5pe26Kem5Y+R55qE5LqL5Lu244CCXG4gICAgICog6K+35rOo5oSP77yM5ZyoIFdFQiDlubPlj7DvvIzov5nkuKrkuovku7bkuI3kuIDlrprkvJogMTAwJSDop6blj5HvvIzov5nlrozlhajlj5blhrPkuo7mtY/op4jlmajnmoTlm57osIPooYzkuLrjgIJcbiAgICAgKiDlnKjljp/nlJ/lubPlj7DvvIzlroPlr7nlupTnmoTmmK/lupTnlKjooqvliIfmjaLliLDlkI7lj7Dkuovku7bvvIzkuIvmi4noj5zljZXlkozkuIrmi4nnirbmgIHmoI/nrYnkuI3kuIDlrprkvJrop6blj5Hov5nkuKrkuovku7bvvIzov5nlj5blhrPkuo7ns7vnu5/ooYzkuLrjgIJcbiAgICAgKiBAcHJvcGVydHkgRVZFTlRfSElERVxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfSElERSwgZnVuY3Rpb24gKCkge1xuICAgICAqICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKCk7XG4gICAgICogICAgIGNjLmF1ZGlvRW5naW5lLnBhdXNlQWxsRWZmZWN0cygpO1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIEVWRU5UX0hJREU6IFwiZ2FtZV9vbl9oaWRlXCIsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEV2ZW50IHRyaWdnZXJlZCB3aGVuIGdhbWUgYmFjayB0byBmb3JlZ3JvdW5kXG4gICAgICogUGxlYXNlIG5vdGUgdGhhdCB0aGlzIGV2ZW50IGlzIG5vdCAxMDAlIGd1YXJhbnRlZWQgdG8gYmUgZmlyZWQgb24gV2ViIHBsYXRmb3JtLFxuICAgICAqIG9uIG5hdGl2ZSBwbGF0Zm9ybXMsIGl0IGNvcnJlc3BvbmRzIHRvIGVudGVyIGZvcmVncm91bmQgZXZlbnQuXG4gICAgICogISN6aCDmuLjmiI/ov5vlhaXliY3lj7Dov5DooYzml7bop6blj5HnmoTkuovku7bjgIJcbiAgICAgKiDor7fms6jmhI/vvIzlnKggV0VCIOW5s+WPsO+8jOi/meS4quS6i+S7tuS4jeS4gOWumuS8miAxMDAlIOinpuWPke+8jOi/meWujOWFqOWPluWGs+S6jua1j+iniOWZqOeahOWbnuiwg+ihjOS4uuOAglxuICAgICAqIOWcqOWOn+eUn+W5s+WPsO+8jOWug+WvueW6lOeahOaYr+W6lOeUqOiiq+WIh+aNouWIsOWJjeWPsOS6i+S7tuOAglxuICAgICAqIEBwcm9wZXJ0eSBFVkVOVF9TSE9XXG4gICAgICogQGNvbnN0YW50XG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICBFVkVOVF9TSE9XOiBcImdhbWVfb25fc2hvd1wiLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBFdmVudCB0cmlnZ2VyZWQgd2hlbiBnYW1lIHJlc3RhcnRcbiAgICAgKiAhI3poIOiwg+eUqHJlc3RhcnTlkI7vvIzop6blj5Hkuovku7bjgIJcbiAgICAgKiBAcHJvcGVydHkgRVZFTlRfUkVTVEFSVFxuICAgICAqIEBjb25zdGFudFxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICovXG4gICAgRVZFTlRfUkVTVEFSVDogXCJnYW1lX29uX3Jlc3RhcnRcIixcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IHRyaWdnZXJlZCBhZnRlciBnYW1lIGluaXRlZCwgYXQgdGhpcyBwb2ludCBhbGwgZW5naW5lIG9iamVjdHMgYW5kIGdhbWUgc2NyaXB0cyBhcmUgbG9hZGVkXG4gICAgICogQHByb3BlcnR5IEVWRU5UX0dBTUVfSU5JVEVEXG4gICAgICogQGNvbnN0YW50XG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICBFVkVOVF9HQU1FX0lOSVRFRDogXCJnYW1lX2luaXRlZFwiLFxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgdHJpZ2dlcmVkIGFmdGVyIGVuZ2luZSBpbml0ZWQsIGF0IHRoaXMgcG9pbnQgeW91IHdpbGwgYmUgYWJsZSB0byB1c2UgYWxsIGVuZ2luZSBjbGFzc2VzLiBcbiAgICAgKiBJdCB3YXMgZGVmaW5lZCBhcyBFVkVOVF9SRU5ERVJFUl9JTklURUQgaW4gY29jb3MgY3JlYXRvciB2MS54IGFuZCByZW5hbWVkIGluIHYyLjBcbiAgICAgKiBAcHJvcGVydHkgRVZFTlRfRU5HSU5FX0lOSVRFRFxuICAgICAqIEBjb25zdGFudFxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICovXG4gICAgRVZFTlRfRU5HSU5FX0lOSVRFRDogXCJlbmdpbmVfaW5pdGVkXCIsXG4gICAgLy8gZGVwcmVjYXRlZFxuICAgIEVWRU5UX1JFTkRFUkVSX0lOSVRFRDogXCJlbmdpbmVfaW5pdGVkXCIsXG5cbiAgICAvKipcbiAgICAgKiBXZWIgQ2FudmFzIDJkIEFQSSBhcyByZW5kZXJlciBiYWNrZW5kXG4gICAgICogQHByb3BlcnR5IFJFTkRFUl9UWVBFX0NBTlZBU1xuICAgICAqIEBjb25zdGFudFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgUkVOREVSX1RZUEVfQ0FOVkFTOiAwLFxuICAgIC8qKlxuICAgICAqIFdlYkdMIEFQSSBhcyByZW5kZXJlciBiYWNrZW5kXG4gICAgICogQHByb3BlcnR5IFJFTkRFUl9UWVBFX1dFQkdMXG4gICAgICogQGNvbnN0YW50XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBSRU5ERVJfVFlQRV9XRUJHTDogMSxcbiAgICAvKipcbiAgICAgKiBPcGVuR0wgQVBJIGFzIHJlbmRlcmVyIGJhY2tlbmRcbiAgICAgKiBAcHJvcGVydHkgUkVOREVSX1RZUEVfT1BFTkdMXG4gICAgICogQGNvbnN0YW50XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBSRU5ERVJfVFlQRV9PUEVOR0w6IDIsXG5cbiAgICBfcGVyc2lzdFJvb3ROb2Rlczoge30sXG5cbiAgICAvLyBzdGF0ZXNcbiAgICBfcGF1c2VkOiB0cnVlLC8vd2hldGhlciB0aGUgZ2FtZSBpcyBwYXVzZWRcbiAgICBfY29uZmlnTG9hZGVkOiBmYWxzZSwvL3doZXRoZXIgY29uZmlnIGxvYWRlZFxuICAgIF9pc0Nsb25pbmc6IGZhbHNlLCAgICAvLyBkZXNlcmlhbGl6aW5nIG9yIGluc3RhbnRpYXRpbmdcbiAgICBfcHJlcGFyZWQ6IGZhbHNlLCAvL3doZXRoZXIgdGhlIGVuZ2luZSBoYXMgcHJlcGFyZWRcbiAgICBfcmVuZGVyZXJJbml0aWFsaXplZDogZmFsc2UsXG5cbiAgICBfcmVuZGVyQ29udGV4dDogbnVsbCxcblxuICAgIF9pbnRlcnZhbElkOiBudWxsLC8vaW50ZXJ2YWwgdGFyZ2V0IG9mIG1haW5cblxuICAgIF9sYXN0VGltZTogbnVsbCxcbiAgICBfZnJhbWVUaW1lOiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgb3V0ZXIgZnJhbWUgb2YgdGhlIGdhbWUgY2FudmFzLCBwYXJlbnQgb2YgZ2FtZSBjb250YWluZXIuXG4gICAgICogISN6aCDmuLjmiI/nlLvluIPnmoTlpJbmoYbvvIxjb250YWluZXIg55qE54i25a655Zmo44CCXG4gICAgICogQHByb3BlcnR5IGZyYW1lXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBmcmFtZTogbnVsbCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBjb250YWluZXIgb2YgZ2FtZSBjYW52YXMuXG4gICAgICogISN6aCDmuLjmiI/nlLvluIPnmoTlrrnlmajjgIJcbiAgICAgKiBAcHJvcGVydHkgY29udGFpbmVyXG4gICAgICogQHR5cGUge0hUTUxEaXZFbGVtZW50fVxuICAgICAqL1xuICAgIGNvbnRhaW5lcjogbnVsbCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBjYW52YXMgb2YgdGhlIGdhbWUuXG4gICAgICogISN6aCDmuLjmiI/nmoTnlLvluIPjgIJcbiAgICAgKiBAcHJvcGVydHkgY2FudmFzXG4gICAgICogQHR5cGUge0hUTUxDYW52YXNFbGVtZW50fVxuICAgICAqL1xuICAgIGNhbnZhczogbnVsbCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHJlbmRlcmVyIGJhY2tlbmQgb2YgdGhlIGdhbWUuXG4gICAgICogISN6aCDmuLjmiI/nmoTmuLLmn5PlmajnsbvlnovjgIJcbiAgICAgKiBAcHJvcGVydHkgcmVuZGVyVHlwZVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgcmVuZGVyVHlwZTogLTEsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhlIGN1cnJlbnQgZ2FtZSBjb25maWd1cmF0aW9uLCBpbmNsdWRpbmc6PGJyLz5cbiAgICAgKiAxLiBkZWJ1Z01vZGU8YnIvPlxuICAgICAqICAgICAgXCJkZWJ1Z01vZGVcIiBwb3NzaWJsZSB2YWx1ZXMgOjxici8+XG4gICAgICogICAgICAwIC0gTm8gbWVzc2FnZSB3aWxsIGJlIHByaW50ZWQuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgKiAgICAgIDEgLSBjYy5lcnJvciwgY2MuYXNzZXJ0LCBjYy53YXJuLCBjYy5sb2cgd2lsbCBwcmludCBpbiBjb25zb2xlLiAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAqICAgICAgMiAtIGNjLmVycm9yLCBjYy5hc3NlcnQsIGNjLndhcm4gd2lsbCBwcmludCBpbiBjb25zb2xlLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICogICAgICAzIC0gY2MuZXJyb3IsIGNjLmFzc2VydCB3aWxsIHByaW50IGluIGNvbnNvbGUuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgKiAgICAgIDQgLSBjYy5lcnJvciwgY2MuYXNzZXJ0LCBjYy53YXJuLCBjYy5sb2cgd2lsbCBwcmludCBvbiBjYW52YXMsIGF2YWlsYWJsZSBvbmx5IG9uIHdlYi48YnIvPlxuICAgICAqICAgICAgNSAtIGNjLmVycm9yLCBjYy5hc3NlcnQsIGNjLndhcm4gd2lsbCBwcmludCBvbiBjYW52YXMsIGF2YWlsYWJsZSBvbmx5IG9uIHdlYi4gICAgICAgIDxici8+XG4gICAgICogICAgICA2IC0gY2MuZXJyb3IsIGNjLmFzc2VydCB3aWxsIHByaW50IG9uIGNhbnZhcywgYXZhaWxhYmxlIG9ubHkgb24gd2ViLiAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgKiAyLiBzaG93RlBTPGJyLz5cbiAgICAgKiAgICAgIExlZnQgYm90dG9tIGNvcm5lciBmcHMgaW5mb3JtYXRpb24gd2lsbCBzaG93IHdoZW4gXCJzaG93RlBTXCIgZXF1YWxzIHRydWUsIG90aGVyd2lzZSBpdCB3aWxsIGJlIGhpZGUuPGJyLz5cbiAgICAgKiAzLiBleHBvc2VDbGFzc05hbWU8YnIvPlxuICAgICAqICAgICAgRXhwb3NlIGNsYXNzIG5hbWUgdG8gY2hyb21lIGRlYnVnIHRvb2xzLCB0aGUgY2xhc3MgaW50YW50aWF0ZSBwZXJmb3JtYW5jZSBpcyBhIGxpdHRsZSBiaXQgc2xvd2VyIHdoZW4gZXhwb3NlZC48YnIvPlxuICAgICAqIDQuIGZyYW1lUmF0ZTxici8+XG4gICAgICogICAgICBcImZyYW1lUmF0ZVwiIHNldCB0aGUgd2FudGVkIGZyYW1lIHJhdGUgZm9yIHlvdXIgZ2FtZSwgYnV0IHRoZSByZWFsIGZwcyBkZXBlbmRzIG9uIHlvdXIgZ2FtZSBpbXBsZW1lbnRhdGlvbiBhbmQgdGhlIHJ1bm5pbmcgZW52aXJvbm1lbnQuPGJyLz5cbiAgICAgKiA1LiBpZDxici8+XG4gICAgICogICAgICBcImdhbWVDYW52YXNcIiBzZXRzIHRoZSBpZCBvZiB5b3VyIGNhbnZhcyBlbGVtZW50IG9uIHRoZSB3ZWIgcGFnZSwgaXQncyB1c2VmdWwgb25seSBvbiB3ZWIuPGJyLz5cbiAgICAgKiA2LiByZW5kZXJNb2RlPGJyLz5cbiAgICAgKiAgICAgIFwicmVuZGVyTW9kZVwiIHNldHMgdGhlIHJlbmRlcmVyIHR5cGUsIG9ubHkgdXNlZnVsIG9uIHdlYiA6PGJyLz5cbiAgICAgKiAgICAgIDAgLSBBdXRvbWF0aWNhbGx5IGNob3NlbiBieSBlbmdpbmU8YnIvPlxuICAgICAqICAgICAgMSAtIEZvcmNlZCB0byB1c2UgY2FudmFzIHJlbmRlcmVyPGJyLz5cbiAgICAgKiAgICAgIDIgLSBGb3JjZWQgdG8gdXNlIFdlYkdMIHJlbmRlcmVyLCBidXQgdGhpcyB3aWxsIGJlIGlnbm9yZWQgb24gbW9iaWxlIGJyb3dzZXJzPGJyLz5cbiAgICAgKjxici8+XG4gICAgICogUGxlYXNlIERPIE5PVCBtb2RpZnkgdGhpcyBvYmplY3QgZGlyZWN0bHksIGl0IHdvbid0IGhhdmUgYW55IGVmZmVjdC48YnIvPlxuICAgICAqICEjemhcbiAgICAgKiDlvZPliY3nmoTmuLjmiI/phY3nva7vvIzljIXmi6zvvJogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAqIDEuIGRlYnVnTW9kZe+8iGRlYnVnIOaooeW8j++8jOS9huaYr+WcqOa1j+iniOWZqOS4rei/meS4qumAiemhueS8muiiq+W/veeVpe+8iSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgKiAgICAgIFwiZGVidWdNb2RlXCIg5ZCE56eN6K6+572u6YCJ6aG555qE5oSP5LmJ44CCICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgKiAgICAgICAgICAwIC0g5rKh5pyJ5raI5oGv6KKr5omT5Y2w5Ye65p2l44CCICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICogICAgICAgICAgMSAtIGNjLmVycm9y77yMY2MuYXNzZXJ077yMY2Mud2Fybu+8jGNjLmxvZyDlsIbmiZPljbDlnKggY29uc29sZSDkuK3jgIIgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAqICAgICAgICAgIDIgLSBjYy5lcnJvcu+8jGNjLmFzc2VydO+8jGNjLndhcm4g5bCG5omT5Y2w5ZyoIGNvbnNvbGUg5Lit44CCICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAqICAgICAgICAgIDMgLSBjYy5lcnJvcu+8jGNjLmFzc2VydCDlsIbmiZPljbDlnKggY29uc29sZSDkuK3jgIIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICogICAgICAgICAgNCAtIGNjLmVycm9y77yMY2MuYXNzZXJ077yMY2Mud2Fybu+8jGNjLmxvZyDlsIbmiZPljbDlnKggY2FudmFzIOS4re+8iOS7hemAgueUqOS6jiB3ZWIg56uv77yJ44CCIDxici8+XG4gICAgICogICAgICAgICAgNSAtIGNjLmVycm9y77yMY2MuYXNzZXJ077yMY2Mud2FybiDlsIbmiZPljbDlnKggY2FudmFzIOS4re+8iOS7hemAgueUqOS6jiB3ZWIg56uv77yJ44CCICAgICAgICAgPGJyLz5cbiAgICAgKiAgICAgICAgICA2IC0gY2MuZXJyb3LvvIxjYy5hc3NlcnQg5bCG5omT5Y2w5ZyoIGNhbnZhcyDkuK3vvIjku4XpgILnlKjkuo4gd2ViIOerr++8ieOAgiAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICogMi4gc2hvd0ZQU++8iOaYvuekuiBGUFPvvIkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAqICAgICAg5b2TIHNob3dGUFMg5Li6IHRydWUg55qE5pe25YCZ55WM6Z2i55qE5bem5LiL6KeS5bCG5pi+56S6IGZwcyDnmoTkv6Hmga/vvIzlkKbliJnooqvpmpDol4/jgIIgICAgICAgICAgICAgIDxici8+XG4gICAgICogMy4gZXhwb3NlQ2xhc3NOYW1lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAqICAgICAg5pq06Zyy57G75ZCN6K6pIENocm9tZSBEZXZUb29scyDlj6/ku6Xor4bliKvvvIzlpoLmnpzlvIDlkK/kvJrnqI3nqI3pmY3kvY7nsbvnmoTliJvlu7rov4fnqIvnmoTmgKfog73vvIzkvYblr7nlr7nosaHmnoTpgKDmsqHmnInlvbHlk43jgIIgPGJyLz5cbiAgICAgKiA0LiBmcmFtZVJhdGUgKOW4p+eOhykgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICogICAgICDigJxmcmFtZVJhdGXigJ0g6K6+572u5oOz6KaB55qE5bin546H5L2g55qE5ri45oiP77yM5L2G55yf5q2j55qERlBT5Y+W5Yaz5LqO5L2g55qE5ri45oiP5a6e546w5ZKM6L+Q6KGM546v5aKD44CCICAgICAgPGJyLz5cbiAgICAgKiA1LiBpZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAqICAgICAgXCJnYW1lQ2FudmFzXCIgV2ViIOmhtemdouS4iueahCBDYW52YXMgRWxlbWVudCBJRO+8jOS7hemAgueUqOS6jiB3ZWIg56uv44CCICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICogNi4gcmVuZGVyTW9kZe+8iOa4suafk+aooeW8j++8iSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICogICAgICDigJxyZW5kZXJNb2Rl4oCdIOiuvue9rua4suafk+WZqOexu+Wei++8jOS7hemAgueUqOS6jiB3ZWIg56uv77yaICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgKiAgICAgICAgICAwIC0g6YCa6L+H5byV5pOO6Ieq5Yqo6YCJ5oup44CCICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAqICAgICAgICAgIDEgLSDlvLrliLbkvb/nlKggY2FudmFzIOa4suafk+OAglxuICAgICAqICAgICAgICAgIDIgLSDlvLrliLbkvb/nlKggV2ViR0wg5riy5p+T77yM5L2G5piv5Zyo6YOo5YiGIEFuZHJvaWQg5rWP6KeI5Zmo5Lit6L+Z5Liq6YCJ6aG55Lya6KKr5b+955Wl44CCICAgICA8YnIvPlxuICAgICAqIDxici8+XG4gICAgICog5rOo5oSP77ya6K+35LiN6KaB55u05o6l5L+u5pS56L+Z5Liq5a+56LGh77yM5a6D5LiN5Lya5pyJ5Lu75L2V5pWI5p6c44CCXG4gICAgICogQHByb3BlcnR5IGNvbmZpZ1xuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgY29uZmlnOiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBDYWxsYmFjayB3aGVuIHRoZSBzY3JpcHRzIG9mIGVuZ2luZSBoYXZlIGJlZW4gbG9hZC5cbiAgICAgKiAhI3poIOW9k+W8leaTjuWujOaIkOWQr+WKqOWQjueahOWbnuiwg+WHveaVsOOAglxuICAgICAqIEBtZXRob2Qgb25TdGFydFxuICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICAgKi9cbiAgICBvblN0YXJ0OiBudWxsLFxuXG4vL0BQdWJsaWMgTWV0aG9kc1xuXG4vLyAgQEdhbWUgcGxheSBjb250cm9sXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgZnJhbWUgcmF0ZSBvZiBnYW1lLlxuICAgICAqICEjemgg6K6+572u5ri45oiP5bin546H44CCXG4gICAgICogQG1ldGhvZCBzZXRGcmFtZVJhdGVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZnJhbWVSYXRlXG4gICAgICovXG4gICAgc2V0RnJhbWVSYXRlOiBmdW5jdGlvbiAoZnJhbWVSYXRlKSB7XG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgICAgY29uZmlnLmZyYW1lUmF0ZSA9IGZyYW1lUmF0ZTtcbiAgICAgICAgaWYgKHRoaXMuX2ludGVydmFsSWQpXG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbUZyYW1lKHRoaXMuX2ludGVydmFsSWQpO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbElkID0gMDtcbiAgICAgICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fc2V0QW5pbUZyYW1lKCk7XG4gICAgICAgIHRoaXMuX3J1bk1haW5Mb29wKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0IGZyYW1lIHJhdGUgc2V0IGZvciB0aGUgZ2FtZSwgaXQgZG9lc24ndCByZXByZXNlbnQgdGhlIHJlYWwgZnJhbWUgcmF0ZS5cbiAgICAgKiAhI3poIOiOt+WPluiuvue9rueahOa4uOaIj+W4p+eOh++8iOS4jeetieWQjOS6juWunumZheW4p+eOh++8ieOAglxuICAgICAqIEBtZXRob2QgZ2V0RnJhbWVSYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBmcmFtZSByYXRlXG4gICAgICovXG4gICAgZ2V0RnJhbWVSYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5mcmFtZVJhdGU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUnVuIHRoZSBnYW1lIGZyYW1lIGJ5IGZyYW1lLlxuICAgICAqICEjemgg5omn6KGM5LiA5bin5ri45oiP5b6q546v44CCXG4gICAgICogQG1ldGhvZCBzdGVwXG4gICAgICovXG4gICAgc3RlcDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5tYWluTG9vcCgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFBhdXNlIHRoZSBnYW1lIG1haW4gbG9vcC4gVGhpcyB3aWxsIHBhdXNlOlxuICAgICAqIGdhbWUgbG9naWMgZXhlY3V0aW9uLCByZW5kZXJpbmcgcHJvY2VzcywgZXZlbnQgbWFuYWdlciwgYmFja2dyb3VuZCBtdXNpYyBhbmQgYWxsIGF1ZGlvIGVmZmVjdHMuXG4gICAgICogVGhpcyBpcyBkaWZmZXJlbnQgd2l0aCBjYy5kaXJlY3Rvci5wYXVzZSB3aGljaCBvbmx5IHBhdXNlIHRoZSBnYW1lIGxvZ2ljIGV4ZWN1dGlvbi5cbiAgICAgKiAhI3poIOaaguWBnOa4uOaIj+S4u+W+queOr+OAguWMheWQq++8mua4uOaIj+mAu+i+ke+8jOa4suafk++8jOS6i+S7tuWkhOeQhu+8jOiDjOaZr+mfs+S5kOWSjOaJgOaciemfs+aViOOAgui/meeCueWSjOWPquaaguWBnOa4uOaIj+mAu+i+keeahCBjYy5kaXJlY3Rvci5wYXVzZSDkuI3lkIzjgIJcbiAgICAgKiBAbWV0aG9kIHBhdXNlXG4gICAgICovXG4gICAgcGF1c2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhdXNlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9wYXVzZWQgPSB0cnVlO1xuICAgICAgICAvLyBQYXVzZSBhdWRpbyBlbmdpbmVcbiAgICAgICAgaWYgKGNjLmF1ZGlvRW5naW5lKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5fYnJlYWsoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBQYXVzZSBtYWluIGxvb3BcbiAgICAgICAgaWYgKHRoaXMuX2ludGVydmFsSWQpXG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbUZyYW1lKHRoaXMuX2ludGVydmFsSWQpO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbElkID0gMDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXN1bWUgdGhlIGdhbWUgZnJvbSBwYXVzZS4gVGhpcyB3aWxsIHJlc3VtZTpcbiAgICAgKiBnYW1lIGxvZ2ljIGV4ZWN1dGlvbiwgcmVuZGVyaW5nIHByb2Nlc3MsIGV2ZW50IG1hbmFnZXIsIGJhY2tncm91bmQgbXVzaWMgYW5kIGFsbCBhdWRpbyBlZmZlY3RzLlxuICAgICAqICEjemgg5oGi5aSN5ri45oiP5Li75b6q546v44CC5YyF5ZCr77ya5ri45oiP6YC76L6R77yM5riy5p+T77yM5LqL5Lu25aSE55CG77yM6IOM5pmv6Z+z5LmQ5ZKM5omA5pyJ6Z+z5pWI44CCXG4gICAgICogQG1ldGhvZCByZXN1bWVcbiAgICAgKi9cbiAgICByZXN1bWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wYXVzZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XG4gICAgICAgIC8vIFJlc3VtZSBhdWRpbyBlbmdpbmVcbiAgICAgICAgaWYgKGNjLmF1ZGlvRW5naW5lKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5fcmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNjLmRpcmVjdG9yLl9yZXNldERlbHRhVGltZSgpO1xuICAgICAgICAvLyBSZXN1bWUgbWFpbiBsb29wXG4gICAgICAgIHRoaXMuX3J1bk1haW5Mb29wKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQ2hlY2sgd2hldGhlciB0aGUgZ2FtZSBpcyBwYXVzZWQuXG4gICAgICogISN6aCDliKTmlq3muLjmiI/mmK/lkKbmmoLlgZzjgIJcbiAgICAgKiBAbWV0aG9kIGlzUGF1c2VkXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1BhdXNlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGF1c2VkO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJlc3RhcnQgZ2FtZS5cbiAgICAgKiAhI3poIOmHjeaWsOW8gOWni+a4uOaIj1xuICAgICAqIEBtZXRob2QgcmVzdGFydFxuICAgICAqL1xuICAgIHJlc3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3Iub25jZShjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9EUkFXLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpZCBpbiBnYW1lLl9wZXJzaXN0Um9vdE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgZ2FtZS5yZW1vdmVQZXJzaXN0Um9vdE5vZGUoZ2FtZS5fcGVyc2lzdFJvb3ROb2Rlc1tpZF0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDbGVhciBzY2VuZVxuICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5kZXN0cm95KCk7XG4gICAgICAgICAgICBjYy5PYmplY3QuX2RlZmVycmVkRGVzdHJveSgpO1xuXG4gICAgICAgICAgICAvLyBDbGVhbiB1cCBhdWRpb1xuICAgICAgICAgICAgaWYgKGNjLmF1ZGlvRW5naW5lKSB7XG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUudW5jYWNoZUFsbCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5yZXNldCgpO1xuXG4gICAgICAgICAgICBnYW1lLnBhdXNlKCk7XG4gICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIuYnVpbHRpbnMuaW5pdCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZ2FtZS5vblN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgZ2FtZS5lbWl0KGdhbWUuRVZFTlRfUkVTVEFSVCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gRW5kIGdhbWUsIGl0IHdpbGwgY2xvc2UgdGhlIGdhbWUgd2luZG93XG4gICAgICogISN6aCDpgIDlh7rmuLjmiI9cbiAgICAgKiBAbWV0aG9kIGVuZFxuICAgICAqL1xuICAgIGVuZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjbG9zZSgpO1xuICAgIH0sXG5cbi8vICBAR2FtZSBsb2FkaW5nXG5cbiAgICBfaW5pdEVuZ2luZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZW5kZXJlckluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pbml0UmVuZGVyZXIoKTtcblxuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgdGhpcy5faW5pdEV2ZW50cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0KHRoaXMuRVZFTlRfRU5HSU5FX0lOSVRFRCk7XG4gICAgfSxcblxuICAgIF9sb2FkUHJldmlld1NjcmlwdCAoY2IpIHtcbiAgICAgICAgaWYgKENDX1BSRVZJRVcgJiYgd2luZG93Ll9fcXVpY2tfY29tcGlsZV9wcm9qZWN0X18pIHtcbiAgICAgICAgICAgIHdpbmRvdy5fX3F1aWNrX2NvbXBpbGVfcHJvamVjdF9fLmxvYWQoY2IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfcHJlcGFyZUZpbmlzaGVkIChjYikge1xuICAgICAgICAvLyBJbml0IGVuZ2luZVxuICAgICAgICB0aGlzLl9pbml0RW5naW5lKCk7XG4gICAgICAgIHRoaXMuX3NldEFuaW1GcmFtZSgpO1xuICAgICAgICBjYy5hc3NldE1hbmFnZXIuYnVpbHRpbnMuaW5pdCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBMb2cgZW5naW5lIHZlcnNpb25cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb2NvcyBDcmVhdG9yIHYnICsgY2MuRU5HSU5FX1ZFUlNJT04pO1xuICAgICAgICAgICAgdGhpcy5fcHJlcGFyZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fcnVuTWFpbkxvb3AoKTtcblxuICAgICAgICAgICAgdGhpcy5lbWl0KHRoaXMuRVZFTlRfR0FNRV9JTklURUQpO1xuXG4gICAgICAgICAgICBpZiAoY2IpIGNiKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBldmVudFRhcmdldE9uOiBFdmVudFRhcmdldC5wcm90b3R5cGUub24sXG4gICAgZXZlbnRUYXJnZXRPbmNlOiBFdmVudFRhcmdldC5wcm90b3R5cGUub25jZSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZWdpc3RlciBhbiBjYWxsYmFjayBvZiBhIHNwZWNpZmljIGV2ZW50IHR5cGUgb24gdGhlIGdhbWUgb2JqZWN0LlxuICAgICAqIFRoaXMgdHlwZSBvZiBldmVudCBzaG91bGQgYmUgdHJpZ2dlcmVkIHZpYSBgZW1pdGAuXG4gICAgICogISN6aFxuICAgICAqIOazqOWGjCBnYW1lIOeahOeJueWumuS6i+S7tuexu+Wei+Wbnuiwg+OAgui/meenjeexu+Wei+eahOS6i+S7tuW6lOivpeiiqyBgZW1pdGAg6Kem5Y+R44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIG9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGNhbGxiYWNrIGlzIGlnbm9yZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUgKHRoZSBjYWxsYmFja3MgYXJlIHVuaXF1ZSkuXG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmcxXSBhcmcxXG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmcyXSBhcmcyXG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmczXSBhcmczXG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmc0XSBhcmc0XG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmc1XSBhcmc1XG4gICAgICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdIC0gVGhlIHRhcmdldCAodGhpcyBvYmplY3QpIHRvIGludm9rZSB0aGUgY2FsbGJhY2ssIGNhbiBiZSBudWxsXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IC0gSnVzdCByZXR1cm5zIHRoZSBpbmNvbWluZyBjYWxsYmFjayBzbyB5b3UgY2FuIHNhdmUgdGhlIGFub255bW91cyBmdW5jdGlvbiBlYXNpZXIuXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBvbjxUIGV4dGVuZHMgRnVuY3Rpb24+KHR5cGU6IHN0cmluZywgY2FsbGJhY2s6IFQsIHRhcmdldD86IGFueSwgdXNlQ2FwdHVyZT86IGJvb2xlYW4pOiBUXG4gICAgICovXG4gICAgb24gKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQsIG9uY2UpIHtcbiAgICAgICAgLy8gTWFrZSBzdXJlIEVWRU5UX0VOR0lORV9JTklURUQgYW5kIEVWRU5UX0dBTUVfSU5JVEVEIGNhbGxiYWNrcyB0byBiZSBpbnZva2VkXG4gICAgICAgIGlmICgodGhpcy5fcHJlcGFyZWQgJiYgdHlwZSA9PT0gdGhpcy5FVkVOVF9FTkdJTkVfSU5JVEVEKSB8fFxuICAgICAgICAgICAgKCF0aGlzLl9wYXVzZWQgJiYgdHlwZSA9PT0gdGhpcy5FVkVOVF9HQU1FX0lOSVRFRCkpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRUYXJnZXRPbih0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCBvbmNlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJlZ2lzdGVyIGFuIGNhbGxiYWNrIG9mIGEgc3BlY2lmaWMgZXZlbnQgdHlwZSBvbiB0aGUgZ2FtZSBvYmplY3QsXG4gICAgICogdGhlIGNhbGxiYWNrIHdpbGwgcmVtb3ZlIGl0c2VsZiBhZnRlciB0aGUgZmlyc3QgdGltZSBpdCBpcyB0cmlnZ2VyZWQuXG4gICAgICogISN6aFxuICAgICAqIOazqOWGjCBnYW1lIOeahOeJueWumuS6i+S7tuexu+Wei+Wbnuiwg++8jOWbnuiwg+S8muWcqOesrOS4gOaXtumXtOiiq+inpuWPkeWQjuWIoOmZpOiHqui6q+OAglxuICAgICAqXG4gICAgICogQG1ldGhvZCBvbmNlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGNhbGxiYWNrIGlzIGlnbm9yZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUgKHRoZSBjYWxsYmFja3MgYXJlIHVuaXF1ZSkuXG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmcxXSBhcmcxXG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmcyXSBhcmcyXG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmczXSBhcmczXG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmc0XSBhcmc0XG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmc1XSBhcmc1XG4gICAgICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdIC0gVGhlIHRhcmdldCAodGhpcyBvYmplY3QpIHRvIGludm9rZSB0aGUgY2FsbGJhY2ssIGNhbiBiZSBudWxsXG4gICAgICovXG4gICAgb25jZSAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCkge1xuICAgICAgICAvLyBNYWtlIHN1cmUgRVZFTlRfRU5HSU5FX0lOSVRFRCBhbmQgRVZFTlRfR0FNRV9JTklURUQgY2FsbGJhY2tzIHRvIGJlIGludm9rZWRcbiAgICAgICAgaWYgKCh0aGlzLl9wcmVwYXJlZCAmJiB0eXBlID09PSB0aGlzLkVWRU5UX0VOR0lORV9JTklURUQpIHx8XG4gICAgICAgICAgICAoIXRoaXMuX3BhdXNlZCAmJiB0eXBlID09PSB0aGlzLkVWRU5UX0dBTUVfSU5JVEVEKSkge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ldmVudFRhcmdldE9uY2UodHlwZSwgY2FsbGJhY2ssIHRhcmdldCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBQcmVwYXJlIGdhbWUuXG4gICAgICogISN6aCDlh4blpIflvJXmk47vvIzor7fkuI3opoHnm7TmjqXosIPnlKjov5nkuKrlh73mlbDjgIJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICAgICAqIEBtZXRob2QgcHJlcGFyZVxuICAgICAqL1xuICAgIHByZXBhcmUgKGNiKSB7XG4gICAgICAgIC8vIEFscmVhZHkgcHJlcGFyZWRcbiAgICAgICAgaWYgKHRoaXMuX3ByZXBhcmVkKSB7XG4gICAgICAgICAgICBpZiAoY2IpIGNiKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sb2FkUHJldmlld1NjcmlwdCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9wcmVwYXJlRmluaXNoZWQoY2IpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSdW4gZ2FtZSB3aXRoIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGFuZCBvblN0YXJ0IGZ1bmN0aW9uLlxuICAgICAqICEjemgg6L+Q6KGM5ri45oiP77yM5bm25LiU5oyH5a6a5byV5pOO6YWN572u5ZKMIG9uU3RhcnQg55qE5Zue6LCD44CCXG4gICAgICogQG1ldGhvZCBydW5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gUGFzcyBjb25maWd1cmF0aW9uIG9iamVjdCBvciBvblN0YXJ0IGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25TdGFydCAtIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIGFmdGVyIGdhbWUgaW5pdGlhbGl6ZWRcbiAgICAgKi9cbiAgICBydW46IGZ1bmN0aW9uIChjb25maWcsIG9uU3RhcnQpIHtcbiAgICAgICAgdGhpcy5faW5pdENvbmZpZyhjb25maWcpO1xuICAgICAgICB0aGlzLm9uU3RhcnQgPSBvblN0YXJ0O1xuICAgICAgICB0aGlzLnByZXBhcmUoZ2FtZS5vblN0YXJ0ICYmIGdhbWUub25TdGFydC5iaW5kKGdhbWUpKTtcbiAgICB9LFxuXG4vLyAgQCBQZXJzaXN0IHJvb3Qgbm9kZSBzZWN0aW9uXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEFkZCBhIHBlcnNpc3RlbnQgcm9vdCBub2RlIHRvIHRoZSBnYW1lLCB0aGUgcGVyc2lzdGVudCBub2RlIHdvbid0IGJlIGRlc3Ryb3llZCBkdXJpbmcgc2NlbmUgdHJhbnNpdGlvbi48YnIvPlxuICAgICAqIFRoZSB0YXJnZXQgbm9kZSBtdXN0IGJlIHBsYWNlZCBpbiB0aGUgcm9vdCBsZXZlbCBvZiBoaWVyYXJjaHksIG90aGVyd2lzZSB0aGlzIEFQSSB3b24ndCBoYXZlIGFueSBlZmZlY3QuXG4gICAgICogISN6aFxuICAgICAqIOWjsOaYjuW4uOmpu+agueiKgueCue+8jOivpeiKgueCueS4jeS8muiiq+WcqOWcuuaZr+WIh+aNouS4reiiq+mUgOavgeOAgjxici8+XG4gICAgICog55uu5qCH6IqC54K55b+F6aG75L2N5LqO5Li65bGC57qn55qE5qC56IqC54K577yM5ZCm5YiZ5peg5pWI44CCXG4gICAgICogQG1ldGhvZCBhZGRQZXJzaXN0Um9vdE5vZGVcbiAgICAgKiBAcGFyYW0ge05vZGV9IG5vZGUgLSBUaGUgbm9kZSB0byBiZSBtYWRlIHBlcnNpc3RlbnRcbiAgICAgKi9cbiAgICBhZGRQZXJzaXN0Um9vdE5vZGU6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGlmICghY2MuTm9kZS5pc05vZGUobm9kZSkgfHwgIW5vZGUudXVpZCkge1xuICAgICAgICAgICAgY2Mud2FybklEKDM4MDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpZCA9IG5vZGUudXVpZDtcbiAgICAgICAgaWYgKCF0aGlzLl9wZXJzaXN0Um9vdE5vZGVzW2lkXSkge1xuICAgICAgICAgICAgdmFyIHNjZW5lID0gY2MuZGlyZWN0b3IuX3NjZW5lO1xuICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoc2NlbmUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHNjZW5lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICggIShub2RlLnBhcmVudCBpbnN0YW5jZW9mIGNjLlNjZW5lKSApIHtcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybklEKDM4MDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5vZGUucGFyZW50ICE9PSBzY2VuZSkge1xuICAgICAgICAgICAgICAgICAgICBjYy53YXJuSUQoMzgwMik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9wZXJzaXN0Um9vdE5vZGVzW2lkXSA9IG5vZGU7XG4gICAgICAgICAgICBub2RlLl9wZXJzaXN0Tm9kZSA9IHRydWU7XG4gICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIuX3JlbGVhc2VNYW5hZ2VyLl9hZGRQZXJzaXN0Tm9kZVJlZihub2RlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJlbW92ZSBhIHBlcnNpc3RlbnQgcm9vdCBub2RlLlxuICAgICAqICEjemgg5Y+W5raI5bi46am75qC56IqC54K544CCXG4gICAgICogQG1ldGhvZCByZW1vdmVQZXJzaXN0Um9vdE5vZGVcbiAgICAgKiBAcGFyYW0ge05vZGV9IG5vZGUgLSBUaGUgbm9kZSB0byBiZSByZW1vdmVkIGZyb20gcGVyc2lzdGVudCBub2RlIGxpc3RcbiAgICAgKi9cbiAgICByZW1vdmVQZXJzaXN0Um9vdE5vZGU6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHZhciBpZCA9IG5vZGUudXVpZCB8fCAnJztcbiAgICAgICAgaWYgKG5vZGUgPT09IHRoaXMuX3BlcnNpc3RSb290Tm9kZXNbaWRdKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fcGVyc2lzdFJvb3ROb2Rlc1tpZF07XG4gICAgICAgICAgICBub2RlLl9wZXJzaXN0Tm9kZSA9IGZhbHNlO1xuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLl9yZWxlYXNlTWFuYWdlci5fcmVtb3ZlUGVyc2lzdE5vZGVSZWYobm9kZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBDaGVjayB3aGV0aGVyIHRoZSBub2RlIGlzIGEgcGVyc2lzdGVudCByb290IG5vZGUuXG4gICAgICogISN6aCDmo4Dmn6XoioLngrnmmK/lkKbmmK/luLjpqbvmoLnoioLngrnjgIJcbiAgICAgKiBAbWV0aG9kIGlzUGVyc2lzdFJvb3ROb2RlXG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlIC0gVGhlIG5vZGUgdG8gYmUgY2hlY2tlZFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNQZXJzaXN0Um9vdE5vZGU6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHJldHVybiBub2RlLl9wZXJzaXN0Tm9kZTtcbiAgICB9LFxuXG4vL0BQcml2YXRlIE1ldGhvZHNcblxuLy8gIEBUaW1lIHRpY2tlciBzZWN0aW9uXG4gICAgX3NldEFuaW1GcmFtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9sYXN0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICB2YXIgZnJhbWVSYXRlID0gZ2FtZS5jb25maWcuZnJhbWVSYXRlO1xuICAgICAgICB0aGlzLl9mcmFtZVRpbWUgPSAxMDAwIC8gZnJhbWVSYXRlO1xuICAgICAgICBjYy5kaXJlY3Rvci5fbWF4UGFydGljbGVEZWx0YVRpbWUgPSB0aGlzLl9mcmFtZVRpbWUgLyAxMDAwICogMjtcbiAgICAgICAgaWYgKENDX0pTQiB8fCBDQ19SVU5USU1FKSB7XG4gICAgICAgICAgICBqc2Iuc2V0UHJlZmVycmVkRnJhbWVzUGVyU2Vjb25kKGZyYW1lUmF0ZSk7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbUZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGZyYW1lUmF0ZSAhPT0gNjAgJiYgZnJhbWVSYXRlICE9PSAzMCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gdGhpcy5fc3RUaW1lO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltRnJhbWUgPSB0aGlzLl9jdFRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RUaW1lO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltRnJhbWUgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgd2luZG93Lm1zQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgd2luZG93Lm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgIHdpbmRvdy5vQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgd2luZG93LndlYmtpdENhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgIHdpbmRvdy5tc0NhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgd2luZG93Lm9DYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuX2N0VGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgX3N0VGltZTogZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgICAgICB2YXIgY3VyclRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgdmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCBnYW1lLl9mcmFtZVRpbWUgLSAoY3VyclRpbWUgLSBnYW1lLl9sYXN0VGltZSkpO1xuICAgICAgICB2YXIgaWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FsbGJhY2soKTsgfSxcbiAgICAgICAgICAgIHRpbWVUb0NhbGwpO1xuICAgICAgICBnYW1lLl9sYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH0sXG4gICAgX2N0VGltZTogZnVuY3Rpb24oaWQpe1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGlkKTtcbiAgICB9LFxuICAgIC8vUnVuIGdhbWUuXG4gICAgX3J1bk1haW5Mb29wOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3ByZXBhcmVkKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLCBjYWxsYmFjaywgY29uZmlnID0gc2VsZi5jb25maWcsXG4gICAgICAgICAgICBkaXJlY3RvciA9IGNjLmRpcmVjdG9yLFxuICAgICAgICAgICAgc2tpcCA9IHRydWUsIGZyYW1lUmF0ZSA9IGNvbmZpZy5mcmFtZVJhdGU7XG5cbiAgICAgICAgZGVidWcuc2V0RGlzcGxheVN0YXRzKGNvbmZpZy5zaG93RlBTKTtcblxuICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uIChub3cpIHtcbiAgICAgICAgICAgIGlmICghc2VsZi5fcGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5faW50ZXJ2YWxJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICBpZiAoIUNDX0pTQiAmJiAhQ0NfUlVOVElNRSAmJiBmcmFtZVJhdGUgPT09IDMwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChza2lwID0gIXNraXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkaXJlY3Rvci5tYWluTG9vcChub3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYuX2ludGVydmFsSWQgPSB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZShjYWxsYmFjayk7XG4gICAgICAgIHNlbGYuX3BhdXNlZCA9IGZhbHNlO1xuICAgIH0sXG5cbi8vICBAR2FtZSBsb2FkaW5nIHNlY3Rpb25cbiAgICBfaW5pdENvbmZpZyAoY29uZmlnKSB7XG4gICAgICAgIC8vIENvbmZpZ3MgYWRqdXN0bWVudFxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy5kZWJ1Z01vZGUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb25maWcuZGVidWdNb2RlID0gMDtcbiAgICAgICAgfVxuICAgICAgICBjb25maWcuZXhwb3NlQ2xhc3NOYW1lID0gISFjb25maWcuZXhwb3NlQ2xhc3NOYW1lO1xuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy5mcmFtZVJhdGUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb25maWcuZnJhbWVSYXRlID0gNjA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlbmRlck1vZGUgPSBjb25maWcucmVuZGVyTW9kZTtcbiAgICAgICAgaWYgKHR5cGVvZiByZW5kZXJNb2RlICE9PSAnbnVtYmVyJyB8fCByZW5kZXJNb2RlID4gMiB8fCByZW5kZXJNb2RlIDwgMCkge1xuICAgICAgICAgICAgY29uZmlnLnJlbmRlck1vZGUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLnJlZ2lzdGVyU3lzdGVtRXZlbnQgIT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgY29uZmlnLnJlZ2lzdGVyU3lzdGVtRXZlbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZW5kZXJNb2RlID09PSAxKSB7XG4gICAgICAgICAgICBjb25maWcuc2hvd0ZQUyA9IGZhbHNlOyAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbmZpZy5zaG93RlBTID0gISFjb25maWcuc2hvd0ZQUztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbGxpZGUgTWFwIGFuZCBHcm91cCBMaXN0XG4gICAgICAgIHRoaXMuY29sbGlzaW9uTWF0cml4ID0gY29uZmlnLmNvbGxpc2lvbk1hdHJpeCB8fCBbXTtcbiAgICAgICAgdGhpcy5ncm91cExpc3QgPSBjb25maWcuZ3JvdXBMaXN0IHx8IFtdO1xuXG4gICAgICAgIGRlYnVnLl9yZXNldERlYnVnU2V0dGluZyhjb25maWcuZGVidWdNb2RlKTtcblxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgdGhpcy5fY29uZmlnTG9hZGVkID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgX2RldGVybWluZVJlbmRlclR5cGUgKCkge1xuICAgICAgICBsZXQgY29uZmlnID0gdGhpcy5jb25maWcsXG4gICAgICAgICAgICB1c2VyUmVuZGVyTW9kZSA9IHBhcnNlSW50KGNvbmZpZy5yZW5kZXJNb2RlKSB8fCAwO1xuICAgIFxuICAgICAgICAvLyBEZXRlcm1pbmUgUmVuZGVyVHlwZVxuICAgICAgICB0aGlzLnJlbmRlclR5cGUgPSB0aGlzLlJFTkRFUl9UWVBFX0NBTlZBUztcbiAgICAgICAgbGV0IHN1cHBvcnRSZW5kZXIgPSBmYWxzZTtcbiAgICBcbiAgICAgICAgaWYgKHVzZXJSZW5kZXJNb2RlID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoY2Muc3lzLmNhcGFiaWxpdGllc1snb3BlbmdsJ10pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclR5cGUgPSB0aGlzLlJFTkRFUl9UWVBFX1dFQkdMO1xuICAgICAgICAgICAgICAgIHN1cHBvcnRSZW5kZXIgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2Muc3lzLmNhcGFiaWxpdGllc1snY2FudmFzJ10pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclR5cGUgPSB0aGlzLlJFTkRFUl9UWVBFX0NBTlZBUztcbiAgICAgICAgICAgICAgICBzdXBwb3J0UmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh1c2VyUmVuZGVyTW9kZSA9PT0gMSAmJiBjYy5zeXMuY2FwYWJpbGl0aWVzWydjYW52YXMnXSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUeXBlID0gdGhpcy5SRU5ERVJfVFlQRV9DQU5WQVM7XG4gICAgICAgICAgICBzdXBwb3J0UmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh1c2VyUmVuZGVyTW9kZSA9PT0gMiAmJiBjYy5zeXMuY2FwYWJpbGl0aWVzWydvcGVuZ2wnXSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUeXBlID0gdGhpcy5SRU5ERVJfVFlQRV9XRUJHTDtcbiAgICAgICAgICAgIHN1cHBvcnRSZW5kZXIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmICghc3VwcG9ydFJlbmRlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRlYnVnLmdldEVycm9yKDM4MjAsIHVzZXJSZW5kZXJNb2RlKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2luaXRSZW5kZXJlciAoKSB7XG4gICAgICAgIC8vIEF2b2lkIHNldHVwIHRvIGJlIGNhbGxlZCB0d2ljZS5cbiAgICAgICAgaWYgKHRoaXMuX3JlbmRlcmVySW5pdGlhbGl6ZWQpIHJldHVybjtcblxuICAgICAgICBsZXQgZWwgPSB0aGlzLmNvbmZpZy5pZCxcbiAgICAgICAgICAgIHdpZHRoLCBoZWlnaHQsXG4gICAgICAgICAgICBsb2NhbENhbnZhcywgbG9jYWxDb250YWluZXI7XG5cbiAgICAgICAgaWYgKENDX0pTQiB8fCBDQ19SVU5USU1FKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGxvY2FsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgICAgICAgIHRoaXMuZnJhbWUgPSBsb2NhbENvbnRhaW5lci5wYXJlbnROb2RlID09PSBkb2N1bWVudC5ib2R5ID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IDogbG9jYWxDb250YWluZXIucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGxvY2FsQ2FudmFzID0gd2luZG93Ll9fY2FudmFzO1xuICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBsb2NhbENhbnZhcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gKGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpID8gZWwgOiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCkgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBlbCkpO1xuXG4gICAgICAgICAgICBpZiAoZWxlbWVudC50YWdOYW1lID09PSBcIkNBTlZBU1wiKSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSBlbGVtZW50LndpZHRoO1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IGVsZW1lbnQuaGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgLy9pdCBpcyBhbHJlYWR5IGEgY2FudmFzLCB3ZSB3cmFwIGl0IGFyb3VuZCB3aXRoIGEgZGl2XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBsb2NhbENhbnZhcyA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICAvL2l0IGlzIGFscmVhZHkgYSBjYW52YXMsIHdlIHdyYXAgaXQgYXJvdW5kIHdpdGggYSBkaXZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBsb2NhbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbENhbnZhcy5wYXJlbnROb2RlKVxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxDYW52YXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobG9jYWxDb250YWluZXIsIGxvY2FsQ2FudmFzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENhbiBub3QgbW92ZSB0aGUgZXhpc3RpbmcgY2FudmFzJ3MgcG9zaXRpb24gaW4gaU9TIDE0LCBzbyB1c2UgY2FudmFzLnBhcmVudE5vZGUgYXMgY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gbG9jYWxDb250YWluZXIgPSBsb2NhbENhbnZhcy5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy93ZSBtdXN0IG1ha2UgYSBuZXcgY2FudmFzIGFuZCBwbGFjZSBpbnRvIHRoaXMgZWxlbWVudFxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUgIT09IFwiRElWXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybklEKDM4MTkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBsb2NhbENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJDQU5WQVNcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBsb2NhbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChsb2NhbENvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgbG9jYWxDYW52YXMuc2V0QXR0cmlidXRlKCdpZCcsICdHYW1lQ2FudmFzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhbENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ0NvY29zMmRHYW1lQ29udGFpbmVyJyk7XG4gICAgICAgICAgICBsb2NhbENhbnZhcy5wYXJlbnROb2RlICE9PSBsb2NhbENvbnRhaW5lciAmJiBsb2NhbENvbnRhaW5lci5hcHBlbmRDaGlsZChsb2NhbENhbnZhcyk7XG4gICAgICAgICAgICB0aGlzLmZyYW1lID0gKGxvY2FsQ29udGFpbmVyLnBhcmVudE5vZGUgPT09IGRvY3VtZW50LmJvZHkpID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IDogbG9jYWxDb250YWluZXIucGFyZW50Tm9kZTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkQ2xhc3MgKGVsZW1lbnQsIG5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGFzQ2xhc3MgPSAoJyAnICsgZWxlbWVudC5jbGFzc05hbWUgKyAnICcpLmluZGV4T2YoJyAnICsgbmFtZSArICcgJykgPiAtMTtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc0NsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgKz0gXCIgXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgKz0gbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZGRDbGFzcyhsb2NhbENhbnZhcywgXCJnYW1lQ2FudmFzXCIpO1xuICAgICAgICAgICAgbG9jYWxDYW52YXMuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgd2lkdGggfHwgNDgwKTtcbiAgICAgICAgICAgIGxvY2FsQ2FudmFzLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBoZWlnaHQgfHwgMzIwKTtcbiAgICAgICAgICAgIGxvY2FsQ2FudmFzLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIDk5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RldGVybWluZVJlbmRlclR5cGUoKTtcbiAgICAgICAgLy8gV2ViR0wgY29udGV4dCBjcmVhdGVkIHN1Y2Nlc3NmdWxseVxuICAgICAgICBpZiAodGhpcy5yZW5kZXJUeXBlID09PSB0aGlzLlJFTkRFUl9UWVBFX1dFQkdMKSB7XG4gICAgICAgICAgICB2YXIgb3B0cyA9IHtcbiAgICAgICAgICAgICAgICAnc3RlbmNpbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgLy8gTVNBQSBpcyBjYXVzaW5nIHNlcmlvdXMgcGVyZm9ybWFuY2UgZHJvcGRvd24gb24gc29tZSBicm93c2Vycy5cbiAgICAgICAgICAgICAgICAnYW50aWFsaWFzJzogY2MubWFjcm8uRU5BQkxFX1dFQkdMX0FOVElBTElBUyxcbiAgICAgICAgICAgICAgICAnYWxwaGEnOiBjYy5tYWNyby5FTkFCTEVfVFJBTlNQQVJFTlRfQ0FOVkFTXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVuZGVyZXIuaW5pdFdlYkdMKGxvY2FsQ2FudmFzLCBvcHRzKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckNvbnRleHQgPSByZW5kZXJlci5kZXZpY2UuX2dsO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBFbmFibGUgZHluYW1pYyBhdGxhcyBtYW5hZ2VyIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgIGlmICghY2MubWFjcm8uQ0xFQU5VUF9JTUFHRV9DQUNIRSAmJiBkeW5hbWljQXRsYXNNYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgZHluYW1pY0F0bGFzTWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3JlbmRlckNvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVHlwZSA9IHRoaXMuUkVOREVSX1RZUEVfQ0FOVkFTO1xuICAgICAgICAgICAgLy8gQ291bGQgYmUgaWdub3JlZCBieSBtb2R1bGUgc2V0dGluZ3NcbiAgICAgICAgICAgIHJlbmRlcmVyLmluaXRDYW52YXMobG9jYWxDYW52YXMpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyQ29udGV4dCA9IHJlbmRlcmVyLmRldmljZS5fY3R4O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYW52YXMub25jb250ZXh0bWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghY2MuX2lzQ29udGV4dE1lbnVFbmFibGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9yZW5kZXJlckluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgX2luaXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdpbiA9IHdpbmRvdywgaGlkZGVuUHJvcE5hbWU7XG5cbiAgICAgICAgLy8gcmVnaXN0ZXIgc3lzdGVtIGV2ZW50c1xuICAgICAgICBpZiAodGhpcy5jb25maWcucmVnaXN0ZXJTeXN0ZW1FdmVudClcbiAgICAgICAgICAgIGNjLmludGVybmFsLmlucHV0TWFuYWdlci5yZWdpc3RlclN5c3RlbUV2ZW50KHRoaXMuY2FudmFzKTtcblxuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50LmhpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGhpZGRlblByb3BOYW1lID0gXCJoaWRkZW5cIjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQubW96SGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaGlkZGVuUHJvcE5hbWUgPSBcIm1vekhpZGRlblwiO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC5tc0hpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGhpZGRlblByb3BOYW1lID0gXCJtc0hpZGRlblwiO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC53ZWJraXRIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBoaWRkZW5Qcm9wTmFtZSA9IFwid2Via2l0SGlkZGVuXCI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGlkZGVuID0gZmFsc2U7XG5cbiAgICAgICAgZnVuY3Rpb24gb25IaWRkZW4gKCkge1xuICAgICAgICAgICAgaWYgKCFoaWRkZW4pIHtcbiAgICAgICAgICAgICAgICBoaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGdhbWUuZW1pdChnYW1lLkVWRU5UX0hJREUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEluIG9yZGVyIHRvIGFkYXB0IHRoZSBtb3N0IG9mIHBsYXRmb3JtcyB0aGUgb25zaG93IEFQSS5cbiAgICAgICAgZnVuY3Rpb24gb25TaG93biAoYXJnMCwgYXJnMSwgYXJnMiwgYXJnMywgYXJnNCkge1xuICAgICAgICAgICAgaWYgKGhpZGRlbikge1xuICAgICAgICAgICAgICAgIGhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGdhbWUuZW1pdChnYW1lLkVWRU5UX1NIT1csIGFyZzAsIGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhpZGRlblByb3BOYW1lKSB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlTGlzdCA9IFtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHljaGFuZ2VcIixcbiAgICAgICAgICAgICAgICBcIm1venZpc2liaWxpdHljaGFuZ2VcIixcbiAgICAgICAgICAgICAgICBcIm1zdmlzaWJpbGl0eWNoYW5nZVwiLFxuICAgICAgICAgICAgICAgIFwid2Via2l0dmlzaWJpbGl0eWNoYW5nZVwiLFxuICAgICAgICAgICAgICAgIFwicWJyb3dzZXJWaXNpYmlsaXR5Q2hhbmdlXCJcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYW5nZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGNoYW5nZUxpc3RbaV0sIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmlzaWJsZSA9IGRvY3VtZW50W2hpZGRlblByb3BOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gUVEgQXBwXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGUgPSB2aXNpYmxlIHx8IGV2ZW50W1wiaGlkZGVuXCJdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlzaWJsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uSGlkZGVuKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU2hvd24oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbi5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBvbkhpZGRlbik7XG4gICAgICAgICAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIG9uU2hvd24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1pY3JvTWVzc2VuZ2VyXCIpID4gLTEpIHtcbiAgICAgICAgICAgIHdpbi5vbmZvY3VzID0gb25TaG93bjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcIm9ucGFnZXNob3dcIiBpbiB3aW5kb3cgJiYgXCJvbnBhZ2VoaWRlXCIgaW4gd2luZG93KSB7XG4gICAgICAgICAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIG9uSGlkZGVuKTtcbiAgICAgICAgICAgIHdpbi5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25TaG93bik7XG4gICAgICAgICAgICAvLyBUYW9iYW8gVUlXZWJLaXRcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlaGlkZVwiLCBvbkhpZGRlbik7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgb25TaG93bik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uKGdhbWUuRVZFTlRfSElERSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZ2FtZS5wYXVzZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbihnYW1lLkVWRU5UX1NIT1csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGdhbWUucmVzdW1lKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbkV2ZW50VGFyZ2V0LmNhbGwoZ2FtZSk7XG5jYy5qcy5hZGRvbihnYW1lLCBFdmVudFRhcmdldC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIEBtb2R1bGUgY2NcbiAqL1xuXG4vKipcbiAqICEjZW4gVGhpcyBpcyBhIEdhbWUgaW5zdGFuY2UuXG4gKiAhI3poIOi/meaYr+S4gOS4qiBHYW1lIOexu+eahOWunuS+i++8jOWMheWQq+a4uOaIj+S4u+S9k+S/oeaBr+W5tui0n+i0o+mpseWKqOa4uOaIj+eahOa4uOaIj+WvueixoeOAguOAglxuICogQHByb3BlcnR5IGdhbWVcbiAqIEB0eXBlIEdhbWVcbiAqL1xuY2MuZ2FtZSA9IG1vZHVsZS5leHBvcnRzID0gZ2FtZTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9