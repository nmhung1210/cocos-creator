
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/CCDirector.js';
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
var EventTarget = require('./event/event-target');

var ComponentScheduler = require('./component-scheduler');

var NodeActivator = require('./node-activator');

var Obj = require('./platform/CCObject');

var game = require('./CCGame');

var renderer = require('./renderer');

var eventManager = require('./event-manager');

var Scheduler = require('./CCScheduler'); //----------------------------------------------------------------------------------------------------------------------

/**
 * !#en
 * <p>
 *    ATTENTION: USE cc.director INSTEAD OF cc.Director.<br/>
 *    cc.director is a singleton object which manage your game's logic flow.<br/>
 *    Since the cc.director is a singleton, you don't need to call any constructor or create functions,<br/>
 *    the standard way to use it is by calling:<br/>
 *      - cc.director.methodName(); <br/>
 *
 *    It creates and handle the main Window and manages how and when to execute the Scenes.<br/>
 *    <br/>
 *    The cc.director is also responsible for:<br/>
 *      - initializing the OpenGL context<br/>
 *      - setting the OpenGL pixel format (default on is RGB565)<br/>
 *      - setting the OpenGL buffer depth (default on is 0-bit)<br/>
 *      - setting the color for clear screen (default one is BLACK)<br/>
 *      - setting the projection (default one is 3D)<br/>
 *      - setting the orientation (default one is Portrait)<br/>
 *      <br/>
 *    <br/>
 *    The cc.director also sets the default OpenGL context:<br/>
 *      - GL_TEXTURE_2D is enabled<br/>
 *      - GL_VERTEX_ARRAY is enabled<br/>
 *      - GL_COLOR_ARRAY is enabled<br/>
 *      - GL_TEXTURE_COORD_ARRAY is enabled<br/>
 * </p>
 * <p>
 *   cc.director also synchronizes timers with the refresh rate of the display.<br/>
 *   Features and Limitations:<br/>
 *      - Scheduled timers & drawing are synchronizes with the refresh rate of the display<br/>
 *      - Only supports animation intervals of 1/60 1/30 & 1/15<br/>
 * </p>
 *
 * !#zh
 * <p>
 *     注意：用 cc.director 代替 cc.Director。<br/>
 *     cc.director 一个管理你的游戏的逻辑流程的单例对象。<br/>
 *     由于 cc.director 是一个单例，你不需要调用任何构造函数或创建函数，<br/>
 *     使用它的标准方法是通过调用：<br/>
 *       - cc.director.methodName();
 *     <br/>
 *     它创建和处理主窗口并且管理什么时候执行场景。<br/>
 *     <br/>
 *     cc.director 还负责：<br/>
 *      - 初始化 OpenGL 环境。<br/>
 *      - 设置OpenGL像素格式。(默认是 RGB565)<br/>
 *      - 设置OpenGL缓冲区深度 (默认是 0-bit)<br/>
 *      - 设置空白场景的颜色 (默认是 黑色)<br/>
 *      - 设置投影 (默认是 3D)<br/>
 *      - 设置方向 (默认是 Portrait)<br/>
 *    <br/>
 *    cc.director 设置了 OpenGL 默认环境 <br/>
 *      - GL_TEXTURE_2D   启用。<br/>
 *      - GL_VERTEX_ARRAY 启用。<br/>
 *      - GL_COLOR_ARRAY  启用。<br/>
 *      - GL_TEXTURE_COORD_ARRAY 启用。<br/>
 * </p>
 * <p>
 *   cc.director 也同步定时器与显示器的刷新速率。
 *   <br/>
 *   特点和局限性: <br/>
 *      - 将计时器 & 渲染与显示器的刷新频率同步。<br/>
 *      - 只支持动画的间隔 1/60 1/30 & 1/15。<br/>
 * </p>
 *
 * @class Director
 * @extends EventTarget
 */


cc.Director = function () {
  EventTarget.call(this); // paused?

  this._paused = false; // purge?

  this._purgeDirectorInNextLoop = false;
  this._winSizeInPoints = null; // scenes

  this._scene = null;
  this._loadingScene = ''; // FPS

  this._totalFrames = 0;
  this._lastUpdate = 0;
  this._deltaTime = 0.0;
  this._startTime = 0.0; // ParticleSystem max step delta time

  this._maxParticleDeltaTime = 0.0; // Scheduler for user registration update

  this._scheduler = null; // Scheduler for life-cycle methods in component

  this._compScheduler = null; // Node activator

  this._nodeActivator = null; // Action manager

  this._actionManager = null;
  var self = this;
  game.on(game.EVENT_SHOW, function () {
    self._lastUpdate = performance.now();
  });
  game.once(game.EVENT_ENGINE_INITED, this.init, this);
};

cc.Director.prototype = {
  constructor: cc.Director,
  init: function init() {
    this._totalFrames = 0;
    this._lastUpdate = performance.now();
    this._startTime = this._lastUpdate;
    this._paused = false;
    this._purgeDirectorInNextLoop = false;
    this._winSizeInPoints = cc.size(0, 0);
    this._scheduler = new Scheduler();

    if (cc.ActionManager) {
      this._actionManager = new cc.ActionManager();

      this._scheduler.scheduleUpdate(this._actionManager, Scheduler.PRIORITY_SYSTEM, false);
    } else {
      this._actionManager = null;
    }

    this.sharedInit();
    return true;
  },

  /*
   * Manage all init process shared between the web engine and jsb engine.
   * All platform independent init process should be occupied here.
   */
  sharedInit: function sharedInit() {
    this._compScheduler = new ComponentScheduler();
    this._nodeActivator = new NodeActivator(); // Event manager

    if (eventManager) {
      eventManager.setEnabled(true);
    } // Animation manager


    if (cc.AnimationManager) {
      this._animationManager = new cc.AnimationManager();

      this._scheduler.scheduleUpdate(this._animationManager, Scheduler.PRIORITY_SYSTEM, false);
    } else {
      this._animationManager = null;
    } // collision manager


    if (cc.CollisionManager) {
      this._collisionManager = new cc.CollisionManager();

      this._scheduler.scheduleUpdate(this._collisionManager, Scheduler.PRIORITY_SYSTEM, false);
    } else {
      this._collisionManager = null;
    } // physics manager


    if (cc.PhysicsManager) {
      this._physicsManager = new cc.PhysicsManager();

      this._scheduler.scheduleUpdate(this._physicsManager, Scheduler.PRIORITY_SYSTEM, false);
    } else {
      this._physicsManager = null;
    } // physics 3d manager


    if (cc.Physics3DManager) {
      this._physics3DManager = new cc.Physics3DManager();

      this._scheduler.scheduleUpdate(this._physics3DManager, Scheduler.PRIORITY_SYSTEM, false);
    } else {
      this._physics3DManager = null;
    } // WidgetManager


    if (cc._widgetManager) {
      cc._widgetManager.init(this);
    }
  },

  /**
   * calculates delta time since last time it was called
   */
  calculateDeltaTime: function calculateDeltaTime(now) {
    if (!now) now = performance.now(); // avoid delta time from being negative
    // negative deltaTime would be caused by the precision of now's value, for details please see: https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame

    this._deltaTime = now > this._lastUpdate ? (now - this._lastUpdate) / 1000 : 0;
    if (CC_DEBUG && this._deltaTime > 1) this._deltaTime = 1 / 60.0;
    this._lastUpdate = now;
  },

  /**
   * !#en
   * Converts a view coordinate to an WebGL coordinate<br/>
   * Useful to convert (multi) touches coordinates to the current layout (portrait or landscape)<br/>
   * Implementation can be found in CCDirectorWebGL.
   * !#zh 将触摸点的屏幕坐标转换为 WebGL View 下的坐标。
   * @method convertToGL
   * @param {Vec2} uiPoint
   * @return {Vec2}
   * @deprecated since v2.0
   */
  convertToGL: function convertToGL(uiPoint) {
    var container = game.container;
    var view = cc.view;
    var box = container.getBoundingClientRect();
    var left = box.left + window.pageXOffset - container.clientLeft;
    var top = box.top + window.pageYOffset - container.clientTop;
    var x = view._devicePixelRatio * (uiPoint.x - left);
    var y = view._devicePixelRatio * (top + box.height - uiPoint.y);
    return view._isRotated ? cc.v2(view._viewportRect.width - y, x) : cc.v2(x, y);
  },

  /**
   * !#en
   * Converts an OpenGL coordinate to a view coordinate<br/>
   * Useful to convert node points to window points for calls such as glScissor<br/>
   * Implementation can be found in CCDirectorWebGL.
   * !#zh 将触摸点的 WebGL View 坐标转换为屏幕坐标。
   * @method convertToUI
   * @param {Vec2} glPoint
   * @return {Vec2}
   * @deprecated since v2.0
   */
  convertToUI: function convertToUI(glPoint) {
    var container = game.container;
    var view = cc.view;
    var box = container.getBoundingClientRect();
    var left = box.left + window.pageXOffset - container.clientLeft;
    var top = box.top + window.pageYOffset - container.clientTop;
    var uiPoint = cc.v2(0, 0);

    if (view._isRotated) {
      uiPoint.x = left + glPoint.y / view._devicePixelRatio;
      uiPoint.y = top + box.height - (view._viewportRect.width - glPoint.x) / view._devicePixelRatio;
    } else {
      uiPoint.x = left + glPoint.x * view._devicePixelRatio;
      uiPoint.y = top + box.height - glPoint.y * view._devicePixelRatio;
    }

    return uiPoint;
  },

  /**
   * End the life of director in the next frame
   * @method end
   */
  end: function end() {
    this._purgeDirectorInNextLoop = true;
  },

  /**
   * !#en
   * Returns the size of the WebGL view in points.<br/>
   * It takes into account any possible rotation (device orientation) of the window.
   * !#zh 获取视图的大小，以点为单位。
   * @method getWinSize
   * @return {Size}
   * @deprecated since v2.0
   */
  getWinSize: function getWinSize() {
    return cc.size(cc.winSize);
  },

  /**
   * !#en
   * Returns the size of the OpenGL view in pixels.<br/>
   * It takes into account any possible rotation (device orientation) of the window.<br/>
   * On Mac winSize and winSizeInPixels return the same value.
   * (The pixel here refers to the resource resolution. If you want to get the physics resolution of device, you need to use cc.view.getFrameSize())
   * !#zh
   * 获取视图大小，以像素为单位（这里的像素指的是资源分辨率。
   * 如果要获取屏幕物理分辨率，需要用 cc.view.getFrameSize()）
   * @method getWinSizeInPixels
   * @return {Size}
   * @deprecated since v2.0
   */
  getWinSizeInPixels: function getWinSizeInPixels() {
    return cc.size(cc.winSize);
  },

  /**
   * !#en Pause the director's ticker, only involve the game logic execution.
   * It won't pause the rendering process nor the event manager.
   * If you want to pause the entier game including rendering, audio and event, 
   * please use {{#crossLink "Game.pause"}}cc.game.pause{{/crossLink}}
   * !#zh 暂停正在运行的场景，该暂停只会停止游戏逻辑执行，但是不会停止渲染和 UI 响应。
   * 如果想要更彻底得暂停游戏，包含渲染，音频和事件，请使用 {{#crossLink "Game.pause"}}cc.game.pause{{/crossLink}}。
   * @method pause
   */
  pause: function pause() {
    if (this._paused) return;
    this._paused = true;
  },

  /**
   * Removes cached all cocos2d cached data.
   * @deprecated since v2.0
   */
  purgeCachedData: function purgeCachedData() {
    cc.assetManager.releaseAll();
  },

  /**
   * Purge the cc.director itself, including unschedule all schedule, remove all event listeners, clean up and exit the running scene, stops all animations, clear cached data.
   */
  purgeDirector: function purgeDirector() {
    //cleanup scheduler
    this._scheduler.unscheduleAll();

    this._compScheduler.unscheduleAll();

    this._nodeActivator.reset(); // Disable event dispatching


    if (eventManager) eventManager.setEnabled(false);

    if (!CC_EDITOR) {
      if (cc.isValid(this._scene)) {
        this._scene.destroy();
      }

      this._scene = null;
      cc.renderer.clear();
      cc.assetManager.builtins.clear();
    }

    cc.game.pause(); // Clear all caches

    cc.assetManager.releaseAll();
  },

  /**
   * Reset the cc.director, can be used to restart the director after purge
   */
  reset: function reset() {
    this.purgeDirector();
    if (eventManager) eventManager.setEnabled(true); // Action manager

    if (this._actionManager) {
      this._scheduler.scheduleUpdate(this._actionManager, cc.Scheduler.PRIORITY_SYSTEM, false);
    } // Animation manager


    if (this._animationManager) {
      this._scheduler.scheduleUpdate(this._animationManager, cc.Scheduler.PRIORITY_SYSTEM, false);
    } // Collider manager


    if (this._collisionManager) {
      this._scheduler.scheduleUpdate(this._collisionManager, cc.Scheduler.PRIORITY_SYSTEM, false);
    } // Physics manager


    if (this._physicsManager) {
      this._scheduler.scheduleUpdate(this._physicsManager, cc.Scheduler.PRIORITY_SYSTEM, false);
    }

    cc.game.resume();
  },

  /**
   * !#en
   * Run a scene. Replaces the running scene with a new one or enter the first scene.<br/>
   * The new scene will be launched immediately.
   * !#zh 立刻切换指定场景。
   * @method runSceneImmediate
   * @param {Scene|SceneAsset} scene - The need run scene.
   * @param {Function} [onBeforeLoadScene] - The function invoked at the scene before loading.
   * @param {Function} [onLaunched] - The function invoked at the scene after launch.
   */
  runSceneImmediate: function runSceneImmediate(scene, onBeforeLoadScene, onLaunched) {
    cc.assertID(scene instanceof cc.Scene || scene instanceof cc.SceneAsset, 1216);
    if (scene instanceof cc.SceneAsset) scene = scene.scene;
    CC_BUILD && CC_DEBUG && console.time('InitScene');

    scene._load(); // ensure scene initialized


    CC_BUILD && CC_DEBUG && console.timeEnd('InitScene'); // Re-attach or replace persist nodes

    CC_BUILD && CC_DEBUG && console.time('AttachPersist');
    var persistNodeList = Object.keys(game._persistRootNodes).map(function (x) {
      return game._persistRootNodes[x];
    });

    for (var i = 0; i < persistNodeList.length; i++) {
      var node = persistNodeList[i];
      var existNode = scene.getChildByUuid(node.uuid);

      if (existNode) {
        // scene also contains the persist node, select the old one
        var index = existNode.getSiblingIndex();

        existNode._destroyImmediate();

        scene.insertChild(node, index);
      } else {
        node.parent = scene;
      }
    }

    CC_BUILD && CC_DEBUG && console.timeEnd('AttachPersist');
    var oldScene = this._scene;

    if (!CC_EDITOR) {
      // auto release assets
      CC_BUILD && CC_DEBUG && console.time('AutoRelease');

      cc.assetManager._releaseManager._autoRelease(oldScene, scene, persistNodeList);

      CC_BUILD && CC_DEBUG && console.timeEnd('AutoRelease');
    } // unload scene


    CC_BUILD && CC_DEBUG && console.time('Destroy');

    if (cc.isValid(oldScene)) {
      oldScene.destroy();
    }

    this._scene = null; // purge destroyed nodes belongs to old scene

    Obj._deferredDestroy();

    CC_BUILD && CC_DEBUG && console.timeEnd('Destroy');

    if (onBeforeLoadScene) {
      onBeforeLoadScene();
    }

    this.emit(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, scene); // Run an Entity Scene

    this._scene = scene;
    CC_BUILD && CC_DEBUG && console.time('Activate');

    scene._activate();

    CC_BUILD && CC_DEBUG && console.timeEnd('Activate'); //start scene

    cc.game.resume();

    if (onLaunched) {
      onLaunched(null, scene);
    }

    this.emit(cc.Director.EVENT_AFTER_SCENE_LAUNCH, scene);
  },

  /**
   * !#en
   * Run a scene. Replaces the running scene with a new one or enter the first scene.
   * The new scene will be launched at the end of the current frame.
   * !#zh 运行指定场景。
   * @method runScene
   * @param {Scene|SceneAsset} scene - The need run scene.
   * @param {Function} [onBeforeLoadScene] - The function invoked at the scene before loading.
   * @param {Function} [onLaunched] - The function invoked at the scene after launch.
   */
  runScene: function runScene(scene, onBeforeLoadScene, onLaunched) {
    cc.assertID(scene, 1205);
    cc.assertID(scene instanceof cc.Scene || scene instanceof cc.SceneAsset, 1216);
    if (scene instanceof cc.SceneAsset) scene = scene.scene; // ensure scene initialized

    scene._load(); // Delay run / replace scene to the end of the frame


    this.once(cc.Director.EVENT_AFTER_DRAW, function () {
      this.runSceneImmediate(scene, onBeforeLoadScene, onLaunched);
    }, this);
  },

  /**
   * !#en Loads the scene by its name.
   * !#zh 通过场景名称进行加载场景。
   *
   * @method loadScene
   * @param {String} sceneName - The name of the scene to load.
   * @param {Function} [onLaunched] - callback, will be called after scene launched.
   * @return {Boolean} if error, return false
   */
  loadScene: function loadScene(sceneName, onLaunched, _onUnloaded) {
    if (this._loadingScene) {
      cc.warnID(1208, sceneName, this._loadingScene);
      return false;
    }

    var bundle = cc.assetManager.bundles.find(function (bundle) {
      return bundle.getSceneInfo(sceneName);
    });

    if (bundle) {
      this.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, sceneName);
      this._loadingScene = sceneName;
      var self = this;
      console.time('LoadScene ' + sceneName);
      bundle.loadScene(sceneName, function (err, scene) {
        console.timeEnd('LoadScene ' + sceneName);
        self._loadingScene = '';

        if (err) {
          err = 'Failed to load scene: ' + err;
          cc.error(err);
          onLaunched && onLaunched(err);
        } else {
          self.runSceneImmediate(scene, _onUnloaded, onLaunched);
          return;
        }
      });
      return true;
    } else {
      cc.errorID(1209, sceneName);
      return false;
    }
  },

  /**
  * !#en
  * Preloads the scene to reduces loading time. You can call this method at any time you want.
  * After calling this method, you still need to launch the scene by `cc.director.loadScene`.
  * It will be totally fine to call `cc.director.loadScene` at any time even if the preloading is not
  * yet finished, the scene will be launched after loaded automatically.
  * !#zh 预加载场景，你可以在任何时候调用这个方法。
  * 调用完后，你仍然需要通过 `cc.director.loadScene` 来启动场景，因为这个方法不会执行场景加载操作。
  * 就算预加载还没完成，你也可以直接调用 `cc.director.loadScene`，加载完成后场景就会启动。
  *
  * @method preloadScene
  * @param {String} sceneName - The name of the scene to preload.
  * @param {Function} [onProgress] - callback, will be called when the load progression change.
  * @param {Number} onProgress.completedCount - The number of the items that are already completed
  * @param {Number} onProgress.totalCount - The total number of the items
  * @param {Object} onProgress.item - The latest item which flow out the pipeline
  * @param {Function} [onLoaded] - callback, will be called after scene loaded.
  * @param {Error} onLoaded.error - null or the error object.
  */
  preloadScene: function preloadScene(sceneName, onProgress, onLoaded) {
    var bundle = cc.assetManager.bundles.find(function (bundle) {
      return bundle.getSceneInfo(sceneName);
    });

    if (bundle) {
      bundle.preloadScene(sceneName, null, onProgress, onLoaded);
    } else {
      cc.errorID(1209, sceneName);
      return null;
    }
  },

  /**
   * !#en Resume game logic execution after pause, if the current scene is not paused, nothing will happen.
   * !#zh 恢复暂停场景的游戏逻辑，如果当前场景没有暂停将没任何事情发生。
   * @method resume
   */
  resume: function resume() {
    if (!this._paused) {
      return;
    }

    this._lastUpdate = performance.now();

    if (!this._lastUpdate) {
      cc.logID(1200);
    }

    this._paused = false;
    this._deltaTime = 0;
  },

  /**
   * !#en
   * Enables or disables WebGL depth test.<br/>
   * Implementation can be found in CCDirectorCanvas.js/CCDirectorWebGL.js
   * !#zh 启用/禁用深度测试（在 Canvas 渲染模式下不会生效）。
   * @method setDepthTest
   * @param {Boolean} on
   * @deprecated since v2.0
   */
  setDepthTest: function setDepthTest(value) {
    if (!cc.Camera.main) {
      return;
    }

    cc.Camera.main.depth = !!value;
  },

  /**
   * !#en
   * Set color for clear screen.<br/>
   * (Implementation can be found in CCDirectorCanvas.js/CCDirectorWebGL.js)
   * !#zh
   * 设置场景的默认擦除颜色。<br/>
   * 支持全透明，但不支持透明度为中间值。要支持全透明需手工开启 cc.macro.ENABLE_TRANSPARENT_CANVAS。
   * @method setClearColor
   * @param {Color} clearColor
   * @deprecated since v2.0
   */
  setClearColor: function setClearColor(clearColor) {
    if (!cc.Camera.main) {
      return;
    }

    cc.Camera.main.backgroundColor = clearColor;
  },

  /**
   * !#en Returns current logic Scene.
   * !#zh 获取当前逻辑场景。
   * @method getRunningScene
   * @private
   * @return {Scene}
   * @deprecated since v2.0
   */
  getRunningScene: function getRunningScene() {
    return this._scene;
  },

  /**
   * !#en Returns current logic Scene.
   * !#zh 获取当前逻辑场景。
   * @method getScene
   * @return {Scene}
   * @example
   *  // This will help you to get the Canvas node in scene
   *  cc.director.getScene().getChildByName('Canvas');
   */
  getScene: function getScene() {
    return this._scene;
  },

  /**
   * !#en Returns the FPS value. Please use {{#crossLink "Game.setFrameRate"}}cc.game.setFrameRate{{/crossLink}} to control animation interval.
   * !#zh 获取单位帧执行时间。请使用 {{#crossLink "Game.setFrameRate"}}cc.game.setFrameRate{{/crossLink}} 来控制游戏帧率。
   * @method getAnimationInterval
   * @deprecated since v2.0
   * @return {Number}
   */
  getAnimationInterval: function getAnimationInterval() {
    return 1000 / game.getFrameRate();
  },

  /**
   * Sets animation interval, this doesn't control the main loop.
   * To control the game's frame rate overall, please use {{#crossLink "Game.setFrameRate"}}cc.game.setFrameRate{{/crossLink}}
   * @method setAnimationInterval
   * @deprecated since v2.0
   * @param {Number} value - The animation interval desired.
   */
  setAnimationInterval: function setAnimationInterval(value) {
    game.setFrameRate(Math.round(1000 / value));
  },

  /**
   * !#en Returns the delta time since last frame.
   * !#zh 获取上一帧的增量时间。
   * @method getDeltaTime
   * @return {Number}
   */
  getDeltaTime: function getDeltaTime() {
    return this._deltaTime;
  },

  /**
   * !#en Returns the total passed time since game start, unit: ms
   * !#zh 获取从游戏开始到现在总共经过的时间，单位为 ms
   * @method getTotalTime
   * @return {Number}
   */
  getTotalTime: function getTotalTime() {
    return performance.now() - this._startTime;
  },

  /**
   * !#en Returns how many frames were called since the director started.
   * !#zh 获取 director 启动以来游戏运行的总帧数。
   * @method getTotalFrames
   * @return {Number}
   */
  getTotalFrames: function getTotalFrames() {
    return this._totalFrames;
  },

  /**
   * !#en Returns whether or not the Director is paused.
   * !#zh 是否处于暂停状态。
   * @method isPaused
   * @return {Boolean}
   */
  isPaused: function isPaused() {
    return this._paused;
  },

  /**
   * !#en Returns the cc.Scheduler associated with this director.
   * !#zh 获取和 director 相关联的 cc.Scheduler。
   * @method getScheduler
   * @return {Scheduler}
   */
  getScheduler: function getScheduler() {
    return this._scheduler;
  },

  /**
   * !#en Sets the cc.Scheduler associated with this director.
   * !#zh 设置和 director 相关联的 cc.Scheduler。
   * @method setScheduler
   * @param {Scheduler} scheduler
   */
  setScheduler: function setScheduler(scheduler) {
    if (this._scheduler !== scheduler) {
      this._scheduler = scheduler;
    }
  },

  /**
   * !#en Returns the cc.ActionManager associated with this director.
   * !#zh 获取和 director 相关联的 cc.ActionManager（动作管理器）。
   * @method getActionManager
   * @return {ActionManager}
   */
  getActionManager: function getActionManager() {
    return this._actionManager;
  },

  /**
   * !#en Sets the cc.ActionManager associated with this director.
   * !#zh 设置和 director 相关联的 cc.ActionManager（动作管理器）。
   * @method setActionManager
   * @param {ActionManager} actionManager
   */
  setActionManager: function setActionManager(actionManager) {
    if (this._actionManager !== actionManager) {
      if (this._actionManager) {
        this._scheduler.unscheduleUpdate(this._actionManager);
      }

      this._actionManager = actionManager;

      this._scheduler.scheduleUpdate(this._actionManager, cc.Scheduler.PRIORITY_SYSTEM, false);
    }
  },

  /* 
   * !#en Returns the cc.AnimationManager associated with this director.
   * !#zh 获取和 director 相关联的 cc.AnimationManager（动画管理器）。
   * @method getAnimationManager
   * @return {AnimationManager}
   */
  getAnimationManager: function getAnimationManager() {
    return this._animationManager;
  },

  /**
   * !#en Returns the cc.CollisionManager associated with this director.
   * !#zh 获取和 director 相关联的 cc.CollisionManager （碰撞管理器）。
   * @method getCollisionManager
   * @return {CollisionManager}
   */
  getCollisionManager: function getCollisionManager() {
    return this._collisionManager;
  },

  /**
   * !#en Returns the cc.PhysicsManager associated with this director.
   * !#zh 返回与 director 相关联的 cc.PhysicsManager （物理管理器）。
   * @method getPhysicsManager
   * @return {PhysicsManager}
   */
  getPhysicsManager: function getPhysicsManager() {
    return this._physicsManager;
  },

  /**
   * !#en Returns the cc.Physics3DManager associated with this director.
   * !#zh 返回与 director 相关联的 cc.Physics3DManager （物理管理器）。
   * @method getPhysics3DManager
   * @return {Physics3DManager}
   */
  getPhysics3DManager: function getPhysics3DManager() {
    return this._physics3DManager;
  },
  // Loop management

  /*
   * Starts Animation
   * @deprecated since v2.1.2
   */
  startAnimation: function startAnimation() {
    cc.game.resume();
  },

  /*
   * Stops animation
   * @deprecated since v2.1.2
   */
  stopAnimation: function stopAnimation() {
    cc.game.pause();
  },
  _resetDeltaTime: function _resetDeltaTime() {
    this._lastUpdate = performance.now();
    this._deltaTime = 0;
  },

  /*
   * Run main loop of director
   */
  mainLoop: CC_EDITOR ? function (deltaTime, updateAnimate) {
    this._deltaTime = deltaTime; // Update

    if (!this._paused) {
      this.emit(cc.Director.EVENT_BEFORE_UPDATE);

      this._compScheduler.startPhase();

      this._compScheduler.updatePhase(deltaTime);

      if (updateAnimate) {
        this._scheduler.update(deltaTime);
      }

      this._compScheduler.lateUpdatePhase(deltaTime);

      this.emit(cc.Director.EVENT_AFTER_UPDATE);
    } // Render


    this.emit(cc.Director.EVENT_BEFORE_DRAW);
    renderer.render(this._scene, deltaTime); // After draw

    this.emit(cc.Director.EVENT_AFTER_DRAW);
    this._totalFrames++;
  } : function (now) {
    if (this._purgeDirectorInNextLoop) {
      this._purgeDirectorInNextLoop = false;
      this.purgeDirector();
    } else {
      // calculate "global" dt
      this.calculateDeltaTime(now); // Update

      if (!this._paused) {
        // before update
        this.emit(cc.Director.EVENT_BEFORE_UPDATE); // Call start for new added components

        this._compScheduler.startPhase(); // Update for components


        this._compScheduler.updatePhase(this._deltaTime); // Engine update with scheduler


        this._scheduler.update(this._deltaTime); // Late update for components


        this._compScheduler.lateUpdatePhase(this._deltaTime); // User can use this event to do things after update


        this.emit(cc.Director.EVENT_AFTER_UPDATE); // Destroy entities that have been removed recently

        Obj._deferredDestroy();
      } // Render


      this.emit(cc.Director.EVENT_BEFORE_DRAW);
      renderer.render(this._scene, this._deltaTime); // After draw

      this.emit(cc.Director.EVENT_AFTER_DRAW);
      eventManager.frameUpdateListeners();
      this._totalFrames++;
    }
  },
  __fastOn: function __fastOn(type, callback, target) {
    this.on(type, callback, target);
  },
  __fastOff: function __fastOff(type, callback, target) {
    this.off(type, callback, target);
  }
}; // Event target

cc.js.addon(cc.Director.prototype, EventTarget.prototype);
/**
 * !#en The event projection changed of cc.Director. This event will not get triggered since v2.0
 * !#zh cc.Director 投影变化的事件。从 v2.0 开始这个事件不会再被触发
 * @property {String} EVENT_PROJECTION_CHANGED
 * @readonly
 * @static
 * @deprecated since v2.0
 */

cc.Director.EVENT_PROJECTION_CHANGED = "director_projection_changed";
/**
 * !#en The event which will be triggered before loading a new scene.
 * !#zh 加载新场景之前所触发的事件。
 * @event cc.Director.EVENT_BEFORE_SCENE_LOADING
 * @param {String} sceneName - The loading scene name
 */

/**
 * !#en The event which will be triggered before loading a new scene.
 * !#zh 加载新场景之前所触发的事件。
 * @property {String} EVENT_BEFORE_SCENE_LOADING
 * @readonly
 * @static
 */

cc.Director.EVENT_BEFORE_SCENE_LOADING = "director_before_scene_loading";
/*
 * !#en The event which will be triggered before launching a new scene.
 * !#zh 运行新场景之前所触发的事件。
 * @event cc.Director.EVENT_BEFORE_SCENE_LAUNCH
 * @param {String} sceneName - New scene which will be launched
 */

/**
 * !#en The event which will be triggered before launching a new scene.
 * !#zh 运行新场景之前所触发的事件。
 * @property {String} EVENT_BEFORE_SCENE_LAUNCH
 * @readonly
 * @static
 */

cc.Director.EVENT_BEFORE_SCENE_LAUNCH = "director_before_scene_launch";
/**
 * !#en The event which will be triggered after launching a new scene.
 * !#zh 运行新场景之后所触发的事件。
 * @event cc.Director.EVENT_AFTER_SCENE_LAUNCH
 * @param {String} sceneName - New scene which is launched
 */

/**
 * !#en The event which will be triggered after launching a new scene.
 * !#zh 运行新场景之后所触发的事件。
 * @property {String} EVENT_AFTER_SCENE_LAUNCH
 * @readonly
 * @static
 */

cc.Director.EVENT_AFTER_SCENE_LAUNCH = "director_after_scene_launch";
/**
 * !#en The event which will be triggered at the beginning of every frame.
 * !#zh 每个帧的开始时所触发的事件。
 * @event cc.Director.EVENT_BEFORE_UPDATE
 */

/**
 * !#en The event which will be triggered at the beginning of every frame.
 * !#zh 每个帧的开始时所触发的事件。
 * @property {String} EVENT_BEFORE_UPDATE
 * @readonly
 * @static
 */

cc.Director.EVENT_BEFORE_UPDATE = "director_before_update";
/**
 * !#en The event which will be triggered after engine and components update logic.
 * !#zh 将在引擎和组件 “update” 逻辑之后所触发的事件。
 * @event cc.Director.EVENT_AFTER_UPDATE
 */

/**
 * !#en The event which will be triggered after engine and components update logic.
 * !#zh 将在引擎和组件 “update” 逻辑之后所触发的事件。
 * @property {String} EVENT_AFTER_UPDATE
 * @readonly
 * @static
 */

cc.Director.EVENT_AFTER_UPDATE = "director_after_update";
/**
 * !#en The event is deprecated since v2.0, please use cc.Director.EVENT_BEFORE_DRAW instead
 * !#zh 这个事件从 v2.0 开始被废弃，请直接使用 cc.Director.EVENT_BEFORE_DRAW
 * @property {String} EVENT_BEFORE_VISIT
 * @readonly
 * @deprecated since v2.0
 * @static
 */

cc.Director.EVENT_BEFORE_VISIT = "director_before_draw";
/**
 * !#en The event is deprecated since v2.0, please use cc.Director.EVENT_BEFORE_DRAW instead
 * !#zh 这个事件从 v2.0 开始被废弃，请直接使用 cc.Director.EVENT_BEFORE_DRAW
 * @property {String} EVENT_AFTER_VISIT
 * @readonly
 * @deprecated since v2.0
 * @static
 */

cc.Director.EVENT_AFTER_VISIT = "director_before_draw";
/**
 * !#en The event which will be triggered before the rendering process.
 * !#zh 渲染过程之前所触发的事件。
 * @event cc.Director.EVENT_BEFORE_DRAW
 */

/**
 * !#en The event which will be triggered before the rendering process.
 * !#zh 渲染过程之前所触发的事件。
 * @property {String} EVENT_BEFORE_DRAW
 * @readonly
 * @static
 */

cc.Director.EVENT_BEFORE_DRAW = "director_before_draw";
/**
 * !#en The event which will be triggered after the rendering process.
 * !#zh 渲染过程之后所触发的事件。
 * @event cc.Director.EVENT_AFTER_DRAW
 */

/**
 * !#en The event which will be triggered after the rendering process.
 * !#zh 渲染过程之后所触发的事件。
 * @property {String} EVENT_AFTER_DRAW
 * @readonly
 * @static
 */

cc.Director.EVENT_AFTER_DRAW = "director_after_draw"; //Possible OpenGL projections used by director

/**
 * Constant for 2D projection (orthogonal projection)
 * @property {Number} PROJECTION_2D
 * @default 0
 * @readonly
 * @static
 * @deprecated since v2.0
 */

cc.Director.PROJECTION_2D = 0;
/**
 * Constant for 3D projection with a fovy=60, znear=0.5f and zfar=1500.
 * @property {Number} PROJECTION_3D
 * @default 1
 * @readonly
 * @static
 * @deprecated since v2.0
 */

cc.Director.PROJECTION_3D = 1;
/**
 * Constant for custom projection, if cc.Director's projection set to it, it calls "updateProjection" on the projection delegate.
 * @property {Number} PROJECTION_CUSTOM
 * @default 3
 * @readonly
 * @static
 * @deprecated since v2.0
 */

cc.Director.PROJECTION_CUSTOM = 3;
/**
 * Constant for default projection of cc.Director, default projection is 2D projection
 * @property {Number} PROJECTION_DEFAULT
 * @default cc.Director.PROJECTION_2D
 * @readonly
 * @static
 * @deprecated since v2.0
 */

cc.Director.PROJECTION_DEFAULT = cc.Director.PROJECTION_2D;
/**
 * The event which will be triggered before the physics process.<br/>
 * 物理过程之前所触发的事件。
 * @event Director.EVENT_BEFORE_PHYSICS
 * @readonly
 */

cc.Director.EVENT_BEFORE_PHYSICS = 'director_before_physics';
/**
 * The event which will be triggered after the physics process.<br/>
 * 物理过程之后所触发的事件。
 * @event Director.EVENT_AFTER_PHYSICS
 * @readonly
 */

cc.Director.EVENT_AFTER_PHYSICS = 'director_after_physics';
/**
 * @module cc
 */

/**
 * !#en Director
 * !#zh 导演类。
 * @property director
 * @type {Director}
 */

cc.director = new cc.Director();
module.exports = cc.director;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL0NDRGlyZWN0b3IuanMiXSwibmFtZXMiOlsiRXZlbnRUYXJnZXQiLCJyZXF1aXJlIiwiQ29tcG9uZW50U2NoZWR1bGVyIiwiTm9kZUFjdGl2YXRvciIsIk9iaiIsImdhbWUiLCJyZW5kZXJlciIsImV2ZW50TWFuYWdlciIsIlNjaGVkdWxlciIsImNjIiwiRGlyZWN0b3IiLCJjYWxsIiwiX3BhdXNlZCIsIl9wdXJnZURpcmVjdG9ySW5OZXh0TG9vcCIsIl93aW5TaXplSW5Qb2ludHMiLCJfc2NlbmUiLCJfbG9hZGluZ1NjZW5lIiwiX3RvdGFsRnJhbWVzIiwiX2xhc3RVcGRhdGUiLCJfZGVsdGFUaW1lIiwiX3N0YXJ0VGltZSIsIl9tYXhQYXJ0aWNsZURlbHRhVGltZSIsIl9zY2hlZHVsZXIiLCJfY29tcFNjaGVkdWxlciIsIl9ub2RlQWN0aXZhdG9yIiwiX2FjdGlvbk1hbmFnZXIiLCJzZWxmIiwib24iLCJFVkVOVF9TSE9XIiwicGVyZm9ybWFuY2UiLCJub3ciLCJvbmNlIiwiRVZFTlRfRU5HSU5FX0lOSVRFRCIsImluaXQiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsInNpemUiLCJBY3Rpb25NYW5hZ2VyIiwic2NoZWR1bGVVcGRhdGUiLCJQUklPUklUWV9TWVNURU0iLCJzaGFyZWRJbml0Iiwic2V0RW5hYmxlZCIsIkFuaW1hdGlvbk1hbmFnZXIiLCJfYW5pbWF0aW9uTWFuYWdlciIsIkNvbGxpc2lvbk1hbmFnZXIiLCJfY29sbGlzaW9uTWFuYWdlciIsIlBoeXNpY3NNYW5hZ2VyIiwiX3BoeXNpY3NNYW5hZ2VyIiwiUGh5c2ljczNETWFuYWdlciIsIl9waHlzaWNzM0RNYW5hZ2VyIiwiX3dpZGdldE1hbmFnZXIiLCJjYWxjdWxhdGVEZWx0YVRpbWUiLCJDQ19ERUJVRyIsImNvbnZlcnRUb0dMIiwidWlQb2ludCIsImNvbnRhaW5lciIsInZpZXciLCJib3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJsZWZ0Iiwid2luZG93IiwicGFnZVhPZmZzZXQiLCJjbGllbnRMZWZ0IiwidG9wIiwicGFnZVlPZmZzZXQiLCJjbGllbnRUb3AiLCJ4IiwiX2RldmljZVBpeGVsUmF0aW8iLCJ5IiwiaGVpZ2h0IiwiX2lzUm90YXRlZCIsInYyIiwiX3ZpZXdwb3J0UmVjdCIsIndpZHRoIiwiY29udmVydFRvVUkiLCJnbFBvaW50IiwiZW5kIiwiZ2V0V2luU2l6ZSIsIndpblNpemUiLCJnZXRXaW5TaXplSW5QaXhlbHMiLCJwYXVzZSIsInB1cmdlQ2FjaGVkRGF0YSIsImFzc2V0TWFuYWdlciIsInJlbGVhc2VBbGwiLCJwdXJnZURpcmVjdG9yIiwidW5zY2hlZHVsZUFsbCIsInJlc2V0IiwiQ0NfRURJVE9SIiwiaXNWYWxpZCIsImRlc3Ryb3kiLCJjbGVhciIsImJ1aWx0aW5zIiwicmVzdW1lIiwicnVuU2NlbmVJbW1lZGlhdGUiLCJzY2VuZSIsIm9uQmVmb3JlTG9hZFNjZW5lIiwib25MYXVuY2hlZCIsImFzc2VydElEIiwiU2NlbmUiLCJTY2VuZUFzc2V0IiwiQ0NfQlVJTEQiLCJjb25zb2xlIiwidGltZSIsIl9sb2FkIiwidGltZUVuZCIsInBlcnNpc3ROb2RlTGlzdCIsIk9iamVjdCIsImtleXMiLCJfcGVyc2lzdFJvb3ROb2RlcyIsIm1hcCIsImkiLCJsZW5ndGgiLCJub2RlIiwiZXhpc3ROb2RlIiwiZ2V0Q2hpbGRCeVV1aWQiLCJ1dWlkIiwiaW5kZXgiLCJnZXRTaWJsaW5nSW5kZXgiLCJfZGVzdHJveUltbWVkaWF0ZSIsImluc2VydENoaWxkIiwicGFyZW50Iiwib2xkU2NlbmUiLCJfcmVsZWFzZU1hbmFnZXIiLCJfYXV0b1JlbGVhc2UiLCJfZGVmZXJyZWREZXN0cm95IiwiZW1pdCIsIkVWRU5UX0JFRk9SRV9TQ0VORV9MQVVOQ0giLCJfYWN0aXZhdGUiLCJFVkVOVF9BRlRFUl9TQ0VORV9MQVVOQ0giLCJydW5TY2VuZSIsIkVWRU5UX0FGVEVSX0RSQVciLCJsb2FkU2NlbmUiLCJzY2VuZU5hbWUiLCJfb25VbmxvYWRlZCIsIndhcm5JRCIsImJ1bmRsZSIsImJ1bmRsZXMiLCJmaW5kIiwiZ2V0U2NlbmVJbmZvIiwiRVZFTlRfQkVGT1JFX1NDRU5FX0xPQURJTkciLCJlcnIiLCJlcnJvciIsImVycm9ySUQiLCJwcmVsb2FkU2NlbmUiLCJvblByb2dyZXNzIiwib25Mb2FkZWQiLCJsb2dJRCIsInNldERlcHRoVGVzdCIsInZhbHVlIiwiQ2FtZXJhIiwibWFpbiIsImRlcHRoIiwic2V0Q2xlYXJDb2xvciIsImNsZWFyQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJnZXRSdW5uaW5nU2NlbmUiLCJnZXRTY2VuZSIsImdldEFuaW1hdGlvbkludGVydmFsIiwiZ2V0RnJhbWVSYXRlIiwic2V0QW5pbWF0aW9uSW50ZXJ2YWwiLCJzZXRGcmFtZVJhdGUiLCJNYXRoIiwicm91bmQiLCJnZXREZWx0YVRpbWUiLCJnZXRUb3RhbFRpbWUiLCJnZXRUb3RhbEZyYW1lcyIsImlzUGF1c2VkIiwiZ2V0U2NoZWR1bGVyIiwic2V0U2NoZWR1bGVyIiwic2NoZWR1bGVyIiwiZ2V0QWN0aW9uTWFuYWdlciIsInNldEFjdGlvbk1hbmFnZXIiLCJhY3Rpb25NYW5hZ2VyIiwidW5zY2hlZHVsZVVwZGF0ZSIsImdldEFuaW1hdGlvbk1hbmFnZXIiLCJnZXRDb2xsaXNpb25NYW5hZ2VyIiwiZ2V0UGh5c2ljc01hbmFnZXIiLCJnZXRQaHlzaWNzM0RNYW5hZ2VyIiwic3RhcnRBbmltYXRpb24iLCJzdG9wQW5pbWF0aW9uIiwiX3Jlc2V0RGVsdGFUaW1lIiwibWFpbkxvb3AiLCJkZWx0YVRpbWUiLCJ1cGRhdGVBbmltYXRlIiwiRVZFTlRfQkVGT1JFX1VQREFURSIsInN0YXJ0UGhhc2UiLCJ1cGRhdGVQaGFzZSIsInVwZGF0ZSIsImxhdGVVcGRhdGVQaGFzZSIsIkVWRU5UX0FGVEVSX1VQREFURSIsIkVWRU5UX0JFRk9SRV9EUkFXIiwicmVuZGVyIiwiZnJhbWVVcGRhdGVMaXN0ZW5lcnMiLCJfX2Zhc3RPbiIsInR5cGUiLCJjYWxsYmFjayIsInRhcmdldCIsIl9fZmFzdE9mZiIsIm9mZiIsImpzIiwiYWRkb24iLCJFVkVOVF9QUk9KRUNUSU9OX0NIQU5HRUQiLCJFVkVOVF9CRUZPUkVfVklTSVQiLCJFVkVOVF9BRlRFUl9WSVNJVCIsIlBST0pFQ1RJT05fMkQiLCJQUk9KRUNUSU9OXzNEIiwiUFJPSkVDVElPTl9DVVNUT00iLCJQUk9KRUNUSU9OX0RFRkFVTFQiLCJFVkVOVF9CRUZPUkVfUEhZU0lDUyIsIkVWRU5UX0FGVEVSX1BIWVNJQ1MiLCJkaXJlY3RvciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsSUFBTUEsV0FBVyxHQUFHQyxPQUFPLENBQUMsc0JBQUQsQ0FBM0I7O0FBQ0EsSUFBTUMsa0JBQWtCLEdBQUdELE9BQU8sQ0FBQyx1QkFBRCxDQUFsQzs7QUFDQSxJQUFNRSxhQUFhLEdBQUdGLE9BQU8sQ0FBQyxrQkFBRCxDQUE3Qjs7QUFDQSxJQUFNRyxHQUFHLEdBQUdILE9BQU8sQ0FBQyxxQkFBRCxDQUFuQjs7QUFDQSxJQUFNSSxJQUFJLEdBQUdKLE9BQU8sQ0FBQyxVQUFELENBQXBCOztBQUNBLElBQU1LLFFBQVEsR0FBR0wsT0FBTyxDQUFDLFlBQUQsQ0FBeEI7O0FBQ0EsSUFBTU0sWUFBWSxHQUFHTixPQUFPLENBQUMsaUJBQUQsQ0FBNUI7O0FBQ0EsSUFBTU8sU0FBUyxHQUFHUCxPQUFPLENBQUMsZUFBRCxDQUF6QixFQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0VBUSxFQUFFLENBQUNDLFFBQUgsR0FBYyxZQUFZO0FBQ3RCVixFQUFBQSxXQUFXLENBQUNXLElBQVosQ0FBaUIsSUFBakIsRUFEc0IsQ0FHdEI7O0FBQ0EsT0FBS0MsT0FBTCxHQUFlLEtBQWYsQ0FKc0IsQ0FLdEI7O0FBQ0EsT0FBS0Msd0JBQUwsR0FBZ0Ms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WixHQUFnQyxzQkFBaEM7QUFFQTs7Ozs7O0FBS0E7Ozs7Ozs7O0FBT0FyTCxFQUFFLENBQUNDLFFBQUgsQ0FBWXdILGdCQUFaLEdBQStCLHFCQUEvQixFQUVBOztBQUVBOzs7Ozs7Ozs7QUFRQXpILEVBQUUsQ0FBQ0MsUUFBSCxDQUFZa00sYUFBWixHQUE0QixDQUE1QjtBQUVBOzs7Ozs7Ozs7QUFRQW5NLEVBQUUsQ0FBQ0MsUUFBSCxDQUFZbU0sYUFBWixHQUE0QixDQUE1QjtBQUVBOzs7Ozs7Ozs7QUFRQXBNLEVBQUUsQ0FBQ0MsUUFBSCxDQUFZb00saUJBQVosR0FBZ0MsQ0FBaEM7QUFFQTs7Ozs7Ozs7O0FBUUFyTSxFQUFFLENBQUNDLFFBQUgsQ0FBWXFNLGtCQUFaLEdBQWlDdE0sRUFBRSxDQUFDQyxRQUFILENBQVlrTSxhQUE3QztBQUVBOzs7Ozs7O0FBTUFuTSxFQUFFLENBQUNDLFFBQUgsQ0FBWXNNLG9CQUFaLEdBQW1DLHlCQUFuQztBQUVBOzs7Ozs7O0FBTUF2TSxFQUFFLENBQUNDLFFBQUgsQ0FBWXVNLG1CQUFaLEdBQWtDLHdCQUFsQztBQUVBOzs7O0FBSUE7Ozs7Ozs7QUFNQXhNLEVBQUUsQ0FBQ3lNLFFBQUgsR0FBYyxJQUFJek0sRUFBRSxDQUFDQyxRQUFQLEVBQWQ7QUFFQXlNLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjNNLEVBQUUsQ0FBQ3lNLFFBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMCBSaWNhcmRvIFF1ZXNhZGFcbiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxMiBjb2NvczJkLXgub3JnXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBFdmVudFRhcmdldCA9IHJlcXVpcmUoJy4vZXZlbnQvZXZlbnQtdGFyZ2V0Jyk7XG5jb25zdCBDb21wb25lbnRTY2hlZHVsZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudC1zY2hlZHVsZXInKTtcbmNvbnN0IE5vZGVBY3RpdmF0b3IgPSByZXF1aXJlKCcuL25vZGUtYWN0aXZhdG9yJyk7XG5jb25zdCBPYmogPSByZXF1aXJlKCcuL3BsYXRmb3JtL0NDT2JqZWN0Jyk7XG5jb25zdCBnYW1lID0gcmVxdWlyZSgnLi9DQ0dhbWUnKTtcbmNvbnN0IHJlbmRlcmVyID0gcmVxdWlyZSgnLi9yZW5kZXJlcicpO1xuY29uc3QgZXZlbnRNYW5hZ2VyID0gcmVxdWlyZSgnLi9ldmVudC1tYW5hZ2VyJyk7XG5jb25zdCBTY2hlZHVsZXIgPSByZXF1aXJlKCcuL0NDU2NoZWR1bGVyJyk7XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKipcbiAqICEjZW5cbiAqIDxwPlxuICogICAgQVRURU5USU9OOiBVU0UgY2MuZGlyZWN0b3IgSU5TVEVBRCBPRiBjYy5EaXJlY3Rvci48YnIvPlxuICogICAgY2MuZGlyZWN0b3IgaXMgYSBzaW5nbGV0b24gb2JqZWN0IHdoaWNoIG1hbmFnZSB5b3VyIGdhbWUncyBsb2dpYyBmbG93Ljxici8+XG4gKiAgICBTaW5jZSB0aGUgY2MuZGlyZWN0b3IgaXMgYSBzaW5nbGV0b24sIHlvdSBkb24ndCBuZWVkIHRvIGNhbGwgYW55IGNvbnN0cnVjdG9yIG9yIGNyZWF0ZSBmdW5jdGlvbnMsPGJyLz5cbiAqICAgIHRoZSBzdGFuZGFyZCB3YXkgdG8gdXNlIGl0IGlzIGJ5IGNhbGxpbmc6PGJyLz5cbiAqICAgICAgLSBjYy5kaXJlY3Rvci5tZXRob2ROYW1lKCk7IDxici8+XG4gKlxuICogICAgSXQgY3JlYXRlcyBhbmQgaGFuZGxlIHRoZSBtYWluIFdpbmRvdyBhbmQgbWFuYWdlcyBob3cgYW5kIHdoZW4gdG8gZXhlY3V0ZSB0aGUgU2NlbmVzLjxici8+XG4gKiAgICA8YnIvPlxuICogICAgVGhlIGNjLmRpcmVjdG9yIGlzIGFsc28gcmVzcG9uc2libGUgZm9yOjxici8+XG4gKiAgICAgIC0gaW5pdGlhbGl6aW5nIHRoZSBPcGVuR0wgY29udGV4dDxici8+XG4gKiAgICAgIC0gc2V0dGluZyB0aGUgT3BlbkdMIHBpeGVsIGZvcm1hdCAoZGVmYXVsdCBvbiBpcyBSR0I1NjUpPGJyLz5cbiAqICAgICAgLSBzZXR0aW5nIHRoZSBPcGVuR0wgYnVmZmVyIGRlcHRoIChkZWZhdWx0IG9uIGlzIDAtYml0KTxici8+XG4gKiAgICAgIC0gc2V0dGluZyB0aGUgY29sb3IgZm9yIGNsZWFyIHNjcmVlbiAoZGVmYXVsdCBvbmUgaXMgQkxBQ0spPGJyLz5cbiAqICAgICAgLSBzZXR0aW5nIHRoZSBwcm9qZWN0aW9uIChkZWZhdWx0IG9uZSBpcyAzRCk8YnIvPlxuICogICAgICAtIHNldHRpbmcgdGhlIG9yaWVudGF0aW9uIChkZWZhdWx0IG9uZSBpcyBQb3J0cmFpdCk8YnIvPlxuICogICAgICA8YnIvPlxuICogICAgPGJyLz5cbiAqICAgIFRoZSBjYy5kaXJlY3RvciBhbHNvIHNldHMgdGhlIGRlZmF1bHQgT3BlbkdMIGNvbnRleHQ6PGJyLz5cbiAqICAgICAgLSBHTF9URVhUVVJFXzJEIGlzIGVuYWJsZWQ8YnIvPlxuICogICAgICAtIEdMX1ZFUlRFWF9BUlJBWSBpcyBlbmFibGVkPGJyLz5cbiAqICAgICAgLSBHTF9DT0xPUl9BUlJBWSBpcyBlbmFibGVkPGJyLz5cbiAqICAgICAgLSBHTF9URVhUVVJFX0NPT1JEX0FSUkFZIGlzIGVuYWJsZWQ8YnIvPlxuICogPC9wPlxuICogPHA+XG4gKiAgIGNjLmRpcmVjdG9yIGFsc28gc3luY2hyb25pemVzIHRpbWVycyB3aXRoIHRoZSByZWZyZXNoIHJhdGUgb2YgdGhlIGRpc3BsYXkuPGJyLz5cbiAqICAgRmVhdHVyZXMgYW5kIExpbWl0YXRpb25zOjxici8+XG4gKiAgICAgIC0gU2NoZWR1bGVkIHRpbWVycyAmIGRyYXdpbmcgYXJlIHN5bmNocm9uaXplcyB3aXRoIHRoZSByZWZyZXNoIHJhdGUgb2YgdGhlIGRpc3BsYXk8YnIvPlxuICogICAgICAtIE9ubHkgc3VwcG9ydHMgYW5pbWF0aW9uIGludGVydmFscyBvZiAxLzYwIDEvMzAgJiAxLzE1PGJyLz5cbiAqIDwvcD5cbiAqXG4gKiAhI3poXG4gKiA8cD5cbiAqICAgICDms6jmhI/vvJrnlKggY2MuZGlyZWN0b3Ig5Luj5pu/IGNjLkRpcmVjdG9y44CCPGJyLz5cbiAqICAgICBjYy5kaXJlY3RvciDkuIDkuKrnrqHnkIbkvaDnmoTmuLjmiI/nmoTpgLvovpHmtYHnqIvnmoTljZXkvovlr7nosaHjgII8YnIvPlxuICogICAgIOeUseS6jiBjYy5kaXJlY3RvciDmmK/kuIDkuKrljZXkvovvvIzkvaDkuI3pnIDopoHosIPnlKjku7vkvZXmnoTpgKDlh73mlbDmiJbliJvlu7rlh73mlbDvvIw8YnIvPlxuICogICAgIOS9v+eUqOWug+eahOagh+WHhuaWueazleaYr+mAmui/h+iwg+eUqO+8mjxici8+XG4gKiAgICAgICAtIGNjLmRpcmVjdG9yLm1ldGhvZE5hbWUoKTtcbiAqICAgICA8YnIvPlxuICogICAgIOWug+WIm+W7uuWSjOWkhOeQhuS4u+eql+WPo+W5tuS4lOeuoeeQhuS7gOS5iOaXtuWAmeaJp+ihjOWcuuaZr+OAgjxici8+XG4gKiAgICAgPGJyLz5cbiAqICAgICBjYy5kaXJlY3RvciDov5jotJ/otKPvvJo8YnIvPlxuICogICAgICAtIOWIneWni+WMliBPcGVuR0wg546v5aKD44CCPGJyLz5cbiAqICAgICAgLSDorr7nva5PcGVuR0zlg4/ntKDmoLzlvI/jgIIo6buY6K6k5pivIFJHQjU2NSk8YnIvPlxuICogICAgICAtIOiuvue9rk9wZW5HTOe8k+WGsuWMuua3seW6piAo6buY6K6k5pivIDAtYml0KTxici8+XG4gKiAgICAgIC0g6K6+572u56m655m95Zy65pmv55qE6aKc6ImyICjpu5jorqTmmK8g6buR6ImyKTxici8+XG4gKiAgICAgIC0g6K6+572u5oqV5b2xICjpu5jorqTmmK8gM0QpPGJyLz5cbiAqICAgICAgLSDorr7nva7mlrnlkJEgKOm7mOiupOaYryBQb3J0cmFpdCk8YnIvPlxuICogICAgPGJyLz5cbiAqICAgIGNjLmRpcmVjdG9yIOiuvue9ruS6hiBPcGVuR0wg6buY6K6k546v5aKDIDxici8+XG4gKiAgICAgIC0gR0xfVEVYVFVSRV8yRCAgIOWQr+eUqOOAgjxici8+XG4gKiAgICAgIC0gR0xfVkVSVEVYX0FSUkFZIOWQr+eUqOOAgjxici8+XG4gKiAgICAgIC0gR0xfQ09MT1JfQVJSQVkgIOWQr+eUqOOAgjxici8+XG4gKiAgICAgIC0gR0xfVEVYVFVSRV9DT09SRF9BUlJBWSDlkK/nlKjjgII8YnIvPlxuICogPC9wPlxuICogPHA+XG4gKiAgIGNjLmRpcmVjdG9yIOS5n+WQjOatpeWumuaXtuWZqOS4juaYvuekuuWZqOeahOWIt+aWsOmAn+eOh+OAglxuICogICA8YnIvPlxuICogICDnibnngrnlkozlsYDpmZDmgKc6IDxici8+XG4gKiAgICAgIC0g5bCG6K6h5pe25ZmoICYg5riy5p+T5LiO5pi+56S65Zmo55qE5Yi35paw6aKR546H5ZCM5q2l44CCPGJyLz5cbiAqICAgICAgLSDlj6rmlK/mjIHliqjnlLvnmoTpl7TpmpQgMS82MCAxLzMwICYgMS8xNeOAgjxici8+XG4gKiA8L3A+XG4gKlxuICogQGNsYXNzIERpcmVjdG9yXG4gKiBAZXh0ZW5kcyBFdmVudFRhcmdldFxuICovXG5jYy5EaXJlY3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgICBFdmVudFRhcmdldC5jYWxsKHRoaXMpO1xuXG4gICAgLy8gcGF1c2VkP1xuICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xuICAgIC8vIHB1cmdlP1xuICAgIHRoaXMuX3B1cmdlRGlyZWN0b3JJbk5leHRMb29wID0gZmFsc2U7XG5cbiAgICB0aGlzLl93aW5TaXplSW5Qb2ludHMgPSBudWxsO1xuXG4gICAgLy8gc2NlbmVzXG4gICAgdGhpcy5fc2NlbmUgPSBudWxsO1xuICAgIHRoaXMuX2xvYWRpbmdTY2VuZSA9ICcnO1xuXG4gICAgLy8gRlBTXG4gICAgdGhpcy5fdG90YWxGcmFtZXMgPSAwO1xuICAgIHRoaXMuX2xhc3RVcGRhdGUgPSAwO1xuICAgIHRoaXMuX2RlbHRhVGltZSA9IDAuMDtcbiAgICB0aGlzLl9zdGFydFRpbWUgPSAwLjA7XG5cbiAgICAvLyBQYXJ0aWNsZVN5c3RlbSBtYXggc3RlcCBkZWx0YSB0aW1lXG4gICAgdGhpcy5fbWF4UGFydGljbGVEZWx0YVRpbWUgPSAwLjA7XG5cbiAgICAvLyBTY2hlZHVsZXIgZm9yIHVzZXIgcmVnaXN0cmF0aW9uIHVwZGF0ZVxuICAgIHRoaXMuX3NjaGVkdWxlciA9IG51bGw7XG4gICAgLy8gU2NoZWR1bGVyIGZvciBsaWZlLWN5Y2xlIG1ldGhvZHMgaW4gY29tcG9uZW50XG4gICAgdGhpcy5fY29tcFNjaGVkdWxlciA9IG51bGw7XG4gICAgLy8gTm9kZSBhY3RpdmF0b3JcbiAgICB0aGlzLl9ub2RlQWN0aXZhdG9yID0gbnVsbDtcbiAgICAvLyBBY3Rpb24gbWFuYWdlclxuICAgIHRoaXMuX2FjdGlvbk1hbmFnZXIgPSBudWxsO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGdhbWUub24oZ2FtZS5FVkVOVF9TSE9XLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuX2xhc3RVcGRhdGUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICB9KTtcblxuICAgIGdhbWUub25jZShnYW1lLkVWRU5UX0VOR0lORV9JTklURUQsIHRoaXMuaW5pdCwgdGhpcyk7XG59O1xuXG5jYy5EaXJlY3Rvci5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IGNjLkRpcmVjdG9yLFxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdG90YWxGcmFtZXMgPSAwO1xuICAgICAgICB0aGlzLl9sYXN0VXBkYXRlID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IHRoaXMuX2xhc3RVcGRhdGU7XG4gICAgICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wdXJnZURpcmVjdG9ySW5OZXh0TG9vcCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl93aW5TaXplSW5Qb2ludHMgPSBjYy5zaXplKDAsIDApO1xuICAgICAgICB0aGlzLl9zY2hlZHVsZXIgPSBuZXcgU2NoZWR1bGVyKCk7XG5cbiAgICAgICAgaWYgKGNjLkFjdGlvbk1hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbk1hbmFnZXIgPSBuZXcgY2MuQWN0aW9uTWFuYWdlcigpO1xuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVyLnNjaGVkdWxlVXBkYXRlKHRoaXMuX2FjdGlvbk1hbmFnZXIsIFNjaGVkdWxlci5QUklPUklUWV9TWVNURU0sIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbk1hbmFnZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaGFyZWRJbml0KCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIE1hbmFnZSBhbGwgaW5pdCBwcm9jZXNzIHNoYXJlZCBiZXR3ZWVuIHRoZSB3ZWIgZW5naW5lIGFuZCBqc2IgZW5naW5lLlxuICAgICAqIEFsbCBwbGF0Zm9ybSBpbmRlcGVuZGVudCBpbml0IHByb2Nlc3Mgc2hvdWxkIGJlIG9jY3VwaWVkIGhlcmUuXG4gICAgICovXG4gICAgc2hhcmVkSW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9jb21wU2NoZWR1bGVyID0gbmV3IENvbXBvbmVudFNjaGVkdWxlcigpO1xuICAgICAgICB0aGlzLl9ub2RlQWN0aXZhdG9yID0gbmV3IE5vZGVBY3RpdmF0b3IoKTtcblxuICAgICAgICAvLyBFdmVudCBtYW5hZ2VyXG4gICAgICAgIGlmIChldmVudE1hbmFnZXIpIHtcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5zZXRFbmFibGVkKHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQW5pbWF0aW9uIG1hbmFnZXJcbiAgICAgICAgaWYgKGNjLkFuaW1hdGlvbk1hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbk1hbmFnZXIgPSBuZXcgY2MuQW5pbWF0aW9uTWFuYWdlcigpO1xuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVyLnNjaGVkdWxlVXBkYXRlKHRoaXMuX2FuaW1hdGlvbk1hbmFnZXIsIFNjaGVkdWxlci5QUklPUklUWV9TWVNURU0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbk1hbmFnZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29sbGlzaW9uIG1hbmFnZXJcbiAgICAgICAgaWYgKGNjLkNvbGxpc2lvbk1hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxpc2lvbk1hbmFnZXIgPSBuZXcgY2MuQ29sbGlzaW9uTWFuYWdlcigpO1xuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVyLnNjaGVkdWxlVXBkYXRlKHRoaXMuX2NvbGxpc2lvbk1hbmFnZXIsIFNjaGVkdWxlci5QUklPUklUWV9TWVNURU0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxpc2lvbk1hbmFnZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGh5c2ljcyBtYW5hZ2VyXG4gICAgICAgIGlmIChjYy5QaHlzaWNzTWFuYWdlcikge1xuICAgICAgICAgICAgdGhpcy5fcGh5c2ljc01hbmFnZXIgPSBuZXcgY2MuUGh5c2ljc01hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci5zY2hlZHVsZVVwZGF0ZSh0aGlzLl9waHlzaWNzTWFuYWdlciwgU2NoZWR1bGVyLlBSSU9SSVRZX1NZU1RFTSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcGh5c2ljc01hbmFnZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGh5c2ljcyAzZCBtYW5hZ2VyXG4gICAgICAgIGlmIChjYy5QaHlzaWNzM0RNYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9waHlzaWNzM0RNYW5hZ2VyID0gbmV3IGNjLlBoeXNpY3MzRE1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci5zY2hlZHVsZVVwZGF0ZSh0aGlzLl9waHlzaWNzM0RNYW5hZ2VyLCBTY2hlZHVsZXIuUFJJT1JJVFlfU1lTVEVNLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9waHlzaWNzM0RNYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdpZGdldE1hbmFnZXJcbiAgICAgICAgaWYgKGNjLl93aWRnZXRNYW5hZ2VyKSB7XG4gICAgICAgICAgICBjYy5fd2lkZ2V0TWFuYWdlci5pbml0KHRoaXMpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGNhbGN1bGF0ZXMgZGVsdGEgdGltZSBzaW5jZSBsYXN0IHRpbWUgaXQgd2FzIGNhbGxlZFxuICAgICAqL1xuICAgIGNhbGN1bGF0ZURlbHRhVGltZTogZnVuY3Rpb24gKG5vdykge1xuICAgICAgICBpZiAoIW5vdykgbm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICAgICAgLy8gYXZvaWQgZGVsdGEgdGltZSBmcm9tIGJlaW5nIG5lZ2F0aXZlXG4gICAgICAgIC8vIG5lZ2F0aXZlIGRlbHRhVGltZSB3b3VsZCBiZSBjYXVzZWQgYnkgdGhlIHByZWNpc2lvbiBvZiBub3cncyB2YWx1ZSwgZm9yIGRldGFpbHMgcGxlYXNlIHNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvemgtQ04vZG9jcy9XZWIvQVBJL3dpbmRvdy9yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAgdGhpcy5fZGVsdGFUaW1lID0gbm93ID4gdGhpcy5fbGFzdFVwZGF0ZSA/IChub3cgLSB0aGlzLl9sYXN0VXBkYXRlKSAvIDEwMDAgOiAwO1xuICAgICAgICBpZiAoQ0NfREVCVUcgJiYgKHRoaXMuX2RlbHRhVGltZSA+IDEpKVxuICAgICAgICAgICAgdGhpcy5fZGVsdGFUaW1lID0gMSAvIDYwLjA7XG5cbiAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZSA9IG5vdztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIENvbnZlcnRzIGEgdmlldyBjb29yZGluYXRlIHRvIGFuIFdlYkdMIGNvb3JkaW5hdGU8YnIvPlxuICAgICAqIFVzZWZ1bCB0byBjb252ZXJ0IChtdWx0aSkgdG91Y2hlcyBjb29yZGluYXRlcyB0byB0aGUgY3VycmVudCBsYXlvdXQgKHBvcnRyYWl0IG9yIGxhbmRzY2FwZSk8YnIvPlxuICAgICAqIEltcGxlbWVudGF0aW9uIGNhbiBiZSBmb3VuZCBpbiBDQ0RpcmVjdG9yV2ViR0wuXG4gICAgICogISN6aCDlsIbop6bmkbjngrnnmoTlsY/luZXlnZDmoIfovazmjaLkuLogV2ViR0wgVmlldyDkuIvnmoTlnZDmoIfjgIJcbiAgICAgKiBAbWV0aG9kIGNvbnZlcnRUb0dMXG4gICAgICogQHBhcmFtIHtWZWMyfSB1aVBvaW50XG4gICAgICogQHJldHVybiB7VmVjMn1cbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICovXG4gICAgY29udmVydFRvR0w6IGZ1bmN0aW9uICh1aVBvaW50KSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBnYW1lLmNvbnRhaW5lcjtcbiAgICAgICAgdmFyIHZpZXcgPSBjYy52aWV3O1xuICAgICAgICB2YXIgYm94ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgbGVmdCA9IGJveC5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0IC0gY29udGFpbmVyLmNsaWVudExlZnQ7XG4gICAgICAgIHZhciB0b3AgPSBib3gudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gY29udGFpbmVyLmNsaWVudFRvcDtcbiAgICAgICAgdmFyIHggPSB2aWV3Ll9kZXZpY2VQaXhlbFJhdGlvICogKHVpUG9pbnQueCAtIGxlZnQpO1xuICAgICAgICB2YXIgeSA9IHZpZXcuX2RldmljZVBpeGVsUmF0aW8gKiAodG9wICsgYm94LmhlaWdodCAtIHVpUG9pbnQueSk7XG4gICAgICAgIHJldHVybiB2aWV3Ll9pc1JvdGF0ZWQgPyBjYy52Mih2aWV3Ll92aWV3cG9ydFJlY3Qud2lkdGggLSB5LCB4KSA6IGNjLnYyKHgsIHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ29udmVydHMgYW4gT3BlbkdMIGNvb3JkaW5hdGUgdG8gYSB2aWV3IGNvb3JkaW5hdGU8YnIvPlxuICAgICAqIFVzZWZ1bCB0byBjb252ZXJ0IG5vZGUgcG9pbnRzIHRvIHdpbmRvdyBwb2ludHMgZm9yIGNhbGxzIHN1Y2ggYXMgZ2xTY2lzc29yPGJyLz5cbiAgICAgKiBJbXBsZW1lbnRhdGlvbiBjYW4gYmUgZm91bmQgaW4gQ0NEaXJlY3RvcldlYkdMLlxuICAgICAqICEjemgg5bCG6Kem5pG454K555qEIFdlYkdMIFZpZXcg5Z2Q5qCH6L2s5o2i5Li65bGP5bmV5Z2Q5qCH44CCXG4gICAgICogQG1ldGhvZCBjb252ZXJ0VG9VSVxuICAgICAqIEBwYXJhbSB7VmVjMn0gZ2xQb2ludFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqL1xuICAgIGNvbnZlcnRUb1VJOiBmdW5jdGlvbiAoZ2xQb2ludCkge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZ2FtZS5jb250YWluZXI7XG4gICAgICAgIHZhciB2aWV3ID0gY2MudmlldztcbiAgICAgICAgdmFyIGJveCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIGxlZnQgPSBib3gubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCAtIGNvbnRhaW5lci5jbGllbnRMZWZ0O1xuICAgICAgICB2YXIgdG9wID0gYm94LnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCAtIGNvbnRhaW5lci5jbGllbnRUb3A7XG4gICAgICAgIHZhciB1aVBvaW50ID0gY2MudjIoMCwgMCk7XG4gICAgICAgIGlmICh2aWV3Ll9pc1JvdGF0ZWQpIHtcbiAgICAgICAgICAgIHVpUG9pbnQueCA9IGxlZnQgKyBnbFBvaW50LnkgLyB2aWV3Ll9kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICAgICAgdWlQb2ludC55ID0gdG9wICsgYm94LmhlaWdodCAtICh2aWV3Ll92aWV3cG9ydFJlY3Qud2lkdGggLSBnbFBvaW50LngpIC8gdmlldy5fZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHVpUG9pbnQueCA9IGxlZnQgKyBnbFBvaW50LnggKiB2aWV3Ll9kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICAgICAgdWlQb2ludC55ID0gdG9wICsgYm94LmhlaWdodCAtIGdsUG9pbnQueSAqIHZpZXcuX2RldmljZVBpeGVsUmF0aW87XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVpUG9pbnQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEVuZCB0aGUgbGlmZSBvZiBkaXJlY3RvciBpbiB0aGUgbmV4dCBmcmFtZVxuICAgICAqIEBtZXRob2QgZW5kXG4gICAgICovXG4gICAgZW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3B1cmdlRGlyZWN0b3JJbk5leHRMb29wID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIHNpemUgb2YgdGhlIFdlYkdMIHZpZXcgaW4gcG9pbnRzLjxici8+XG4gICAgICogSXQgdGFrZXMgaW50byBhY2NvdW50IGFueSBwb3NzaWJsZSByb3RhdGlvbiAoZGV2aWNlIG9yaWVudGF0aW9uKSBvZiB0aGUgd2luZG93LlxuICAgICAqICEjemgg6I635Y+W6KeG5Zu+55qE5aSn5bCP77yM5Lul54K55Li65Y2V5L2N44CCXG4gICAgICogQG1ldGhvZCBnZXRXaW5TaXplXG4gICAgICogQHJldHVybiB7U2l6ZX1cbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICovXG4gICAgZ2V0V2luU2l6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2Muc2l6ZShjYy53aW5TaXplKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIHNpemUgb2YgdGhlIE9wZW5HTCB2aWV3IGluIHBpeGVscy48YnIvPlxuICAgICAqIEl0IHRha2VzIGludG8gYWNjb3VudCBhbnkgcG9zc2libGUgcm90YXRpb24gKGRldmljZSBvcmllbnRhdGlvbikgb2YgdGhlIHdpbmRvdy48YnIvPlxuICAgICAqIE9uIE1hYyB3aW5TaXplIGFuZCB3aW5TaXplSW5QaXhlbHMgcmV0dXJuIHRoZSBzYW1lIHZhbHVlLlxuICAgICAqIChUaGUgcGl4ZWwgaGVyZSByZWZlcnMgdG8gdGhlIHJlc291cmNlIHJlc29sdXRpb24uIElmIHlvdSB3YW50IHRvIGdldCB0aGUgcGh5c2ljcyByZXNvbHV0aW9uIG9mIGRldmljZSwgeW91IG5lZWQgdG8gdXNlIGNjLnZpZXcuZ2V0RnJhbWVTaXplKCkpXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluinhuWbvuWkp+Wwj++8jOS7peWDj+e0oOS4uuWNleS9je+8iOi/memHjOeahOWDj+e0oOaMh+eahOaYr+i1hOa6kOWIhui+qOeOh+OAglxuICAgICAqIOWmguaenOimgeiOt+WPluWxj+W5leeJqeeQhuWIhui+qOeOh++8jOmcgOimgeeUqCBjYy52aWV3LmdldEZyYW1lU2l6ZSgp77yJXG4gICAgICogQG1ldGhvZCBnZXRXaW5TaXplSW5QaXhlbHNcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKi9cbiAgICBnZXRXaW5TaXplSW5QaXhlbHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLnNpemUoY2Mud2luU2l6ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGF1c2UgdGhlIGRpcmVjdG9yJ3MgdGlja2VyLCBvbmx5IGludm9sdmUgdGhlIGdhbWUgbG9naWMgZXhlY3V0aW9uLlxuICAgICAqIEl0IHdvbid0IHBhdXNlIHRoZSByZW5kZXJpbmcgcHJvY2VzcyBub3IgdGhlIGV2ZW50IG1hbmFnZXIuXG4gICAgICogSWYgeW91IHdhbnQgdG8gcGF1c2UgdGhlIGVudGllciBnYW1lIGluY2x1ZGluZyByZW5kZXJpbmcsIGF1ZGlvIGFuZCBldmVudCwgXG4gICAgICogcGxlYXNlIHVzZSB7eyNjcm9zc0xpbmsgXCJHYW1lLnBhdXNlXCJ9fWNjLmdhbWUucGF1c2V7ey9jcm9zc0xpbmt9fVxuICAgICAqICEjemgg5pqC5YGc5q2j5Zyo6L+Q6KGM55qE5Zy65pmv77yM6K+l5pqC5YGc5Y+q5Lya5YGc5q2i5ri45oiP6YC76L6R5omn6KGM77yM5L2G5piv5LiN5Lya5YGc5q2i5riy5p+T5ZKMIFVJIOWTjeW6lOOAglxuICAgICAqIOWmguaenOaDs+imgeabtOW9u+W6leW+l+aaguWBnOa4uOaIj++8jOWMheWQq+a4suafk++8jOmfs+mikeWSjOS6i+S7tu+8jOivt+S9v+eUqCB7eyNjcm9zc0xpbmsgXCJHYW1lLnBhdXNlXCJ9fWNjLmdhbWUucGF1c2V7ey9jcm9zc0xpbmt9feOAglxuICAgICAqIEBtZXRob2QgcGF1c2VcbiAgICAgKi9cbiAgICBwYXVzZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fcGF1c2VkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLl9wYXVzZWQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGNhY2hlZCBhbGwgY29jb3MyZCBjYWNoZWQgZGF0YS5cbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICovXG4gICAgcHVyZ2VDYWNoZWREYXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5yZWxlYXNlQWxsKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFB1cmdlIHRoZSBjYy5kaXJlY3RvciBpdHNlbGYsIGluY2x1ZGluZyB1bnNjaGVkdWxlIGFsbCBzY2hlZHVsZSwgcmVtb3ZlIGFsbCBldmVudCBsaXN0ZW5lcnMsIGNsZWFuIHVwIGFuZCBleGl0IHRoZSBydW5uaW5nIHNjZW5lLCBzdG9wcyBhbGwgYW5pbWF0aW9ucywgY2xlYXIgY2FjaGVkIGRhdGEuXG4gICAgICovXG4gICAgcHVyZ2VEaXJlY3RvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAvL2NsZWFudXAgc2NoZWR1bGVyXG4gICAgICAgIHRoaXMuX3NjaGVkdWxlci51bnNjaGVkdWxlQWxsKCk7XG4gICAgICAgIHRoaXMuX2NvbXBTY2hlZHVsZXIudW5zY2hlZHVsZUFsbCgpO1xuXG4gICAgICAgIHRoaXMuX25vZGVBY3RpdmF0b3IucmVzZXQoKTtcblxuICAgICAgICAvLyBEaXNhYmxlIGV2ZW50IGRpc3BhdGNoaW5nXG4gICAgICAgIGlmIChldmVudE1hbmFnZXIpXG4gICAgICAgICAgICBldmVudE1hbmFnZXIuc2V0RW5hYmxlZChmYWxzZSk7XG5cbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKHRoaXMuX3NjZW5lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NjZW5lLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3NjZW5lID0gbnVsbDtcblxuICAgICAgICAgICAgY2MucmVuZGVyZXIuY2xlYXIoKTtcbiAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5idWlsdGlucy5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2MuZ2FtZS5wYXVzZSgpO1xuXG4gICAgICAgIC8vIENsZWFyIGFsbCBjYWNoZXNcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBbGwoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVzZXQgdGhlIGNjLmRpcmVjdG9yLCBjYW4gYmUgdXNlZCB0byByZXN0YXJ0IHRoZSBkaXJlY3RvciBhZnRlciBwdXJnZVxuICAgICAqL1xuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucHVyZ2VEaXJlY3RvcigpO1xuXG4gICAgICAgIGlmIChldmVudE1hbmFnZXIpXG4gICAgICAgICAgICBldmVudE1hbmFnZXIuc2V0RW5hYmxlZCh0cnVlKTtcblxuICAgICAgICAvLyBBY3Rpb24gbWFuYWdlclxuICAgICAgICBpZiAodGhpcy5fYWN0aW9uTWFuYWdlcil7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIuc2NoZWR1bGVVcGRhdGUodGhpcy5fYWN0aW9uTWFuYWdlciwgY2MuU2NoZWR1bGVyLlBSSU9SSVRZX1NZU1RFTSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQW5pbWF0aW9uIG1hbmFnZXJcbiAgICAgICAgaWYgKHRoaXMuX2FuaW1hdGlvbk1hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci5zY2hlZHVsZVVwZGF0ZSh0aGlzLl9hbmltYXRpb25NYW5hZ2VyLCBjYy5TY2hlZHVsZXIuUFJJT1JJVFlfU1lTVEVNLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb2xsaWRlciBtYW5hZ2VyXG4gICAgICAgIGlmICh0aGlzLl9jb2xsaXNpb25NYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIuc2NoZWR1bGVVcGRhdGUodGhpcy5fY29sbGlzaW9uTWFuYWdlciwgY2MuU2NoZWR1bGVyLlBSSU9SSVRZX1NZU1RFTSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUGh5c2ljcyBtYW5hZ2VyXG4gICAgICAgIGlmICh0aGlzLl9waHlzaWNzTWFuYWdlcikge1xuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVyLnNjaGVkdWxlVXBkYXRlKHRoaXMuX3BoeXNpY3NNYW5hZ2VyLCBjYy5TY2hlZHVsZXIuUFJJT1JJVFlfU1lTVEVNLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjYy5nYW1lLnJlc3VtZSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUnVuIGEgc2NlbmUuIFJlcGxhY2VzIHRoZSBydW5uaW5nIHNjZW5lIHdpdGggYSBuZXcgb25lIG9yIGVudGVyIHRoZSBmaXJzdCBzY2VuZS48YnIvPlxuICAgICAqIFRoZSBuZXcgc2NlbmUgd2lsbCBiZSBsYXVuY2hlZCBpbW1lZGlhdGVseS5cbiAgICAgKiAhI3poIOeri+WIu+WIh+aNouaMh+WumuWcuuaZr+OAglxuICAgICAqIEBtZXRob2QgcnVuU2NlbmVJbW1lZGlhdGVcbiAgICAgKiBAcGFyYW0ge1NjZW5lfFNjZW5lQXNzZXR9IHNjZW5lIC0gVGhlIG5lZWQgcnVuIHNjZW5lLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkJlZm9yZUxvYWRTY2VuZV0gLSBUaGUgZnVuY3Rpb24gaW52b2tlZCBhdCB0aGUgc2NlbmUgYmVmb3JlIGxvYWRpbmcuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uTGF1bmNoZWRdIC0gVGhlIGZ1bmN0aW9uIGludm9rZWQgYXQgdGhlIHNjZW5lIGFmdGVyIGxhdW5jaC5cbiAgICAgKi9cbiAgICBydW5TY2VuZUltbWVkaWF0ZTogZnVuY3Rpb24gKHNjZW5lLCBvbkJlZm9yZUxvYWRTY2VuZSwgb25MYXVuY2hlZCkge1xuICAgICAgICBjYy5hc3NlcnRJRChzY2VuZSBpbnN0YW5jZW9mIGNjLlNjZW5lIHx8IHNjZW5lIGluc3RhbmNlb2YgY2MuU2NlbmVBc3NldCwgMTIxNik7XG5cbiAgICAgICAgaWYgKHNjZW5lIGluc3RhbmNlb2YgY2MuU2NlbmVBc3NldCkgc2NlbmUgPSBzY2VuZS5zY2VuZTtcblxuICAgICAgICBDQ19CVUlMRCAmJiBDQ19ERUJVRyAmJiBjb25zb2xlLnRpbWUoJ0luaXRTY2VuZScpO1xuICAgICAgICBzY2VuZS5fbG9hZCgpOyAgLy8gZW5zdXJlIHNjZW5lIGluaXRpYWxpemVkXG4gICAgICAgIENDX0JVSUxEICYmIENDX0RFQlVHICYmIGNvbnNvbGUudGltZUVuZCgnSW5pdFNjZW5lJyk7XG5cbiAgICAgICAgLy8gUmUtYXR0YWNoIG9yIHJlcGxhY2UgcGVyc2lzdCBub2Rlc1xuICAgICAgICBDQ19CVUlMRCAmJiBDQ19ERUJVRyAmJiBjb25zb2xlLnRpbWUoJ0F0dGFjaFBlcnNpc3QnKTtcbiAgICAgICAgdmFyIHBlcnNpc3ROb2RlTGlzdCA9IE9iamVjdC5rZXlzKGdhbWUuX3BlcnNpc3RSb290Tm9kZXMpLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgcmV0dXJuIGdhbWUuX3BlcnNpc3RSb290Tm9kZXNbeF07XG4gICAgICAgIH0pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBlcnNpc3ROb2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBwZXJzaXN0Tm9kZUxpc3RbaV07XG4gICAgICAgICAgICB2YXIgZXhpc3ROb2RlID0gc2NlbmUuZ2V0Q2hpbGRCeVV1aWQobm9kZS51dWlkKTtcbiAgICAgICAgICAgIGlmIChleGlzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICAvLyBzY2VuZSBhbHNvIGNvbnRhaW5zIHRoZSBwZXJzaXN0IG5vZGUsIHNlbGVjdCB0aGUgb2xkIG9uZVxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGV4aXN0Tm9kZS5nZXRTaWJsaW5nSW5kZXgoKTtcbiAgICAgICAgICAgICAgICBleGlzdE5vZGUuX2Rlc3Ryb3lJbW1lZGlhdGUoKTtcbiAgICAgICAgICAgICAgICBzY2VuZS5pbnNlcnRDaGlsZChub2RlLCBpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHNjZW5lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIENDX0JVSUxEICYmIENDX0RFQlVHICYmIGNvbnNvbGUudGltZUVuZCgnQXR0YWNoUGVyc2lzdCcpO1xuXG4gICAgICAgIHZhciBvbGRTY2VuZSA9IHRoaXMuX3NjZW5lO1xuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgLy8gYXV0byByZWxlYXNlIGFzc2V0c1xuICAgICAgICAgICAgQ0NfQlVJTEQgJiYgQ0NfREVCVUcgJiYgY29uc29sZS50aW1lKCdBdXRvUmVsZWFzZScpO1xuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLl9yZWxlYXNlTWFuYWdlci5fYXV0b1JlbGVhc2Uob2xkU2NlbmUsIHNjZW5lLCBwZXJzaXN0Tm9kZUxpc3QpO1xuICAgICAgICAgICAgQ0NfQlVJTEQgJiYgQ0NfREVCVUcgJiYgY29uc29sZS50aW1lRW5kKCdBdXRvUmVsZWFzZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdW5sb2FkIHNjZW5lXG4gICAgICAgIENDX0JVSUxEICYmIENDX0RFQlVHICYmIGNvbnNvbGUudGltZSgnRGVzdHJveScpO1xuICAgICAgICBpZiAoY2MuaXNWYWxpZChvbGRTY2VuZSkpIHtcbiAgICAgICAgICAgIG9sZFNjZW5lLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NjZW5lID0gbnVsbDtcblxuICAgICAgICAvLyBwdXJnZSBkZXN0cm95ZWQgbm9kZXMgYmVsb25ncyB0byBvbGQgc2NlbmVcbiAgICAgICAgT2JqLl9kZWZlcnJlZERlc3Ryb3koKTtcbiAgICAgICAgQ0NfQlVJTEQgJiYgQ0NfREVCVUcgJiYgY29uc29sZS50aW1lRW5kKCdEZXN0cm95Jyk7XG5cbiAgICAgICAgaWYgKG9uQmVmb3JlTG9hZFNjZW5lKSB7XG4gICAgICAgICAgICBvbkJlZm9yZUxvYWRTY2VuZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfU0NFTkVfTEFVTkNILCBzY2VuZSk7XG5cbiAgICAgICAgLy8gUnVuIGFuIEVudGl0eSBTY2VuZVxuICAgICAgICB0aGlzLl9zY2VuZSA9IHNjZW5lO1xuXG4gICAgICAgIENDX0JVSUxEICYmIENDX0RFQlVHICYmIGNvbnNvbGUudGltZSgnQWN0aXZhdGUnKTtcbiAgICAgICAgc2NlbmUuX2FjdGl2YXRlKCk7XG4gICAgICAgIENDX0JVSUxEICYmIENDX0RFQlVHICYmIGNvbnNvbGUudGltZUVuZCgnQWN0aXZhdGUnKTtcblxuICAgICAgICAvL3N0YXJ0IHNjZW5lXG4gICAgICAgIGNjLmdhbWUucmVzdW1lKCk7XG5cbiAgICAgICAgaWYgKG9uTGF1bmNoZWQpIHtcbiAgICAgICAgICAgIG9uTGF1bmNoZWQobnVsbCwgc2NlbmUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9TQ0VORV9MQVVOQ0gsIHNjZW5lKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJ1biBhIHNjZW5lLiBSZXBsYWNlcyB0aGUgcnVubmluZyBzY2VuZSB3aXRoIGEgbmV3IG9uZSBvciBlbnRlciB0aGUgZmlyc3Qgc2NlbmUuXG4gICAgICogVGhlIG5ldyBzY2VuZSB3aWxsIGJlIGxhdW5jaGVkIGF0IHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgZnJhbWUuXG4gICAgICogISN6aCDov5DooYzmjIflrprlnLrmma/jgIJcbiAgICAgKiBAbWV0aG9kIHJ1blNjZW5lXG4gICAgICogQHBhcmFtIHtTY2VuZXxTY2VuZUFzc2V0fSBzY2VuZSAtIFRoZSBuZWVkIHJ1biBzY2VuZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25CZWZvcmVMb2FkU2NlbmVdIC0gVGhlIGZ1bmN0aW9uIGludm9rZWQgYXQgdGhlIHNjZW5lIGJlZm9yZSBsb2FkaW5nLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkxhdW5jaGVkXSAtIFRoZSBmdW5jdGlvbiBpbnZva2VkIGF0IHRoZSBzY2VuZSBhZnRlciBsYXVuY2guXG4gICAgICovXG4gICAgcnVuU2NlbmU6IGZ1bmN0aW9uIChzY2VuZSwgb25CZWZvcmVMb2FkU2NlbmUsIG9uTGF1bmNoZWQpIHtcbiAgICAgICAgY2MuYXNzZXJ0SUQoc2NlbmUsIDEyMDUpO1xuICAgICAgICBjYy5hc3NlcnRJRChzY2VuZSBpbnN0YW5jZW9mIGNjLlNjZW5lIHx8IHNjZW5lIGluc3RhbmNlb2YgY2MuU2NlbmVBc3NldCwgMTIxNik7XG5cbiAgICAgICAgaWYgKHNjZW5lIGluc3RhbmNlb2YgY2MuU2NlbmVBc3NldCkgc2NlbmUgPSBzY2VuZS5zY2VuZTtcbiAgICAgICAgLy8gZW5zdXJlIHNjZW5lIGluaXRpYWxpemVkXG4gICAgICAgIHNjZW5lLl9sb2FkKCk7XG5cbiAgICAgICAgLy8gRGVsYXkgcnVuIC8gcmVwbGFjZSBzY2VuZSB0byB0aGUgZW5kIG9mIHRoZSBmcmFtZVxuICAgICAgICB0aGlzLm9uY2UoY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfRFJBVywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5ydW5TY2VuZUltbWVkaWF0ZShzY2VuZSwgb25CZWZvcmVMb2FkU2NlbmUsIG9uTGF1bmNoZWQpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBMb2FkcyB0aGUgc2NlbmUgYnkgaXRzIG5hbWUuXG4gICAgICogISN6aCDpgJrov4flnLrmma/lkI3np7Dov5vooYzliqDovb3lnLrmma/jgIJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgbG9hZFNjZW5lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNjZW5lTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBzY2VuZSB0byBsb2FkLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkxhdW5jaGVkXSAtIGNhbGxiYWNrLCB3aWxsIGJlIGNhbGxlZCBhZnRlciBzY2VuZSBsYXVuY2hlZC5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBpZiBlcnJvciwgcmV0dXJuIGZhbHNlXG4gICAgICovXG4gICAgbG9hZFNjZW5lOiBmdW5jdGlvbiAoc2NlbmVOYW1lLCBvbkxhdW5jaGVkLCBfb25VbmxvYWRlZCkge1xuICAgICAgICBpZiAodGhpcy5fbG9hZGluZ1NjZW5lKSB7XG4gICAgICAgICAgICBjYy53YXJuSUQoMTIwOCwgc2NlbmVOYW1lLCB0aGlzLl9sb2FkaW5nU2NlbmUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBidW5kbGUgPSBjYy5hc3NldE1hbmFnZXIuYnVuZGxlcy5maW5kKGZ1bmN0aW9uIChidW5kbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBidW5kbGUuZ2V0U2NlbmVJbmZvKHNjZW5lTmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYnVuZGxlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX1NDRU5FX0xPQURJTkcsIHNjZW5lTmFtZSk7XG4gICAgICAgICAgICB0aGlzLl9sb2FkaW5nU2NlbmUgPSBzY2VuZU5hbWU7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBjb25zb2xlLnRpbWUoJ0xvYWRTY2VuZSAnICsgc2NlbmVOYW1lKTtcbiAgICAgICAgICAgIGJ1bmRsZS5sb2FkU2NlbmUoc2NlbmVOYW1lLCBmdW5jdGlvbiAoZXJyLCBzY2VuZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUudGltZUVuZCgnTG9hZFNjZW5lICcgKyBzY2VuZU5hbWUpO1xuICAgICAgICAgICAgICAgIHNlbGYuX2xvYWRpbmdTY2VuZSA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyID0gJ0ZhaWxlZCB0byBsb2FkIHNjZW5lOiAnICsgZXJyO1xuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICBvbkxhdW5jaGVkICYmIG9uTGF1bmNoZWQoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucnVuU2NlbmVJbW1lZGlhdGUoc2NlbmUsIF9vblVubG9hZGVkLCBvbkxhdW5jaGVkKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYy5lcnJvcklEKDEyMDksIHNjZW5lTmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBQcmVsb2FkcyB0aGUgc2NlbmUgdG8gcmVkdWNlcyBsb2FkaW5nIHRpbWUuIFlvdSBjYW4gY2FsbCB0aGlzIG1ldGhvZCBhdCBhbnkgdGltZSB5b3Ugd2FudC5cbiAgICAgKiBBZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kLCB5b3Ugc3RpbGwgbmVlZCB0byBsYXVuY2ggdGhlIHNjZW5lIGJ5IGBjYy5kaXJlY3Rvci5sb2FkU2NlbmVgLlxuICAgICAqIEl0IHdpbGwgYmUgdG90YWxseSBmaW5lIHRvIGNhbGwgYGNjLmRpcmVjdG9yLmxvYWRTY2VuZWAgYXQgYW55IHRpbWUgZXZlbiBpZiB0aGUgcHJlbG9hZGluZyBpcyBub3RcbiAgICAgKiB5ZXQgZmluaXNoZWQsIHRoZSBzY2VuZSB3aWxsIGJlIGxhdW5jaGVkIGFmdGVyIGxvYWRlZCBhdXRvbWF0aWNhbGx5LlxuICAgICAqICEjemgg6aKE5Yqg6L295Zy65pmv77yM5L2g5Y+v5Lul5Zyo5Lu75L2V5pe25YCZ6LCD55So6L+Z5Liq5pa55rOV44CCXG4gICAgICog6LCD55So5a6M5ZCO77yM5L2g5LuN54S26ZyA6KaB6YCa6L+HIGBjYy5kaXJlY3Rvci5sb2FkU2NlbmVgIOadpeWQr+WKqOWcuuaZr++8jOWboOS4uui/meS4quaWueazleS4jeS8muaJp+ihjOWcuuaZr+WKoOi9veaTjeS9nOOAglxuICAgICAqIOWwseeul+mihOWKoOi9vei/mOayoeWujOaIkO+8jOS9oOS5n+WPr+S7peebtOaOpeiwg+eUqCBgY2MuZGlyZWN0b3IubG9hZFNjZW5lYO+8jOWKoOi9veWujOaIkOWQjuWcuuaZr+WwseS8muWQr+WKqOOAglxuICAgICAqXG4gICAgICogQG1ldGhvZCBwcmVsb2FkU2NlbmVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2NlbmVOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHNjZW5lIHRvIHByZWxvYWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uUHJvZ3Jlc3NdIC0gY2FsbGJhY2ssIHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGxvYWQgcHJvZ3Jlc3Npb24gY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvblByb2dyZXNzLmNvbXBsZXRlZENvdW50IC0gVGhlIG51bWJlciBvZiB0aGUgaXRlbXMgdGhhdCBhcmUgYWxyZWFkeSBjb21wbGV0ZWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy50b3RhbENvdW50IC0gVGhlIHRvdGFsIG51bWJlciBvZiB0aGUgaXRlbXNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb25Qcm9ncmVzcy5pdGVtIC0gVGhlIGxhdGVzdCBpdGVtIHdoaWNoIGZsb3cgb3V0IHRoZSBwaXBlbGluZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkxvYWRlZF0gLSBjYWxsYmFjaywgd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgc2NlbmUgbG9hZGVkLlxuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uTG9hZGVkLmVycm9yIC0gbnVsbCBvciB0aGUgZXJyb3Igb2JqZWN0LlxuICAgICAqL1xuICAgIHByZWxvYWRTY2VuZSAoc2NlbmVOYW1lLCBvblByb2dyZXNzLCBvbkxvYWRlZCkge1xuICAgICAgICB2YXIgYnVuZGxlID0gY2MuYXNzZXRNYW5hZ2VyLmJ1bmRsZXMuZmluZChmdW5jdGlvbiAoYnVuZGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gYnVuZGxlLmdldFNjZW5lSW5mbyhzY2VuZU5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGJ1bmRsZSkge1xuICAgICAgICAgICAgYnVuZGxlLnByZWxvYWRTY2VuZShzY2VuZU5hbWUsIG51bGwsIG9uUHJvZ3Jlc3MsIG9uTG9hZGVkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMTIwOSwgc2NlbmVOYW1lKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXN1bWUgZ2FtZSBsb2dpYyBleGVjdXRpb24gYWZ0ZXIgcGF1c2UsIGlmIHRoZSBjdXJyZW50IHNjZW5lIGlzIG5vdCBwYXVzZWQsIG5vdGhpbmcgd2lsbCBoYXBwZW4uXG4gICAgICogISN6aCDmgaLlpI3mmoLlgZzlnLrmma/nmoTmuLjmiI/pgLvovpHvvIzlpoLmnpzlvZPliY3lnLrmma/msqHmnInmmoLlgZzlsIbmsqHku7vkvZXkuovmg4Xlj5HnlJ/jgIJcbiAgICAgKiBAbWV0aG9kIHJlc3VtZVxuICAgICAqL1xuICAgIHJlc3VtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3BhdXNlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICBpZiAoIXRoaXMuX2xhc3RVcGRhdGUpIHtcbiAgICAgICAgICAgIGNjLmxvZ0lEKDEyMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2RlbHRhVGltZSA9IDA7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBFbmFibGVzIG9yIGRpc2FibGVzIFdlYkdMIGRlcHRoIHRlc3QuPGJyLz5cbiAgICAgKiBJbXBsZW1lbnRhdGlvbiBjYW4gYmUgZm91bmQgaW4gQ0NEaXJlY3RvckNhbnZhcy5qcy9DQ0RpcmVjdG9yV2ViR0wuanNcbiAgICAgKiAhI3poIOWQr+eUqC/npoHnlKjmt7HluqbmtYvor5XvvIjlnKggQ2FudmFzIOa4suafk+aooeW8j+S4i+S4jeS8mueUn+aViO+8ieOAglxuICAgICAqIEBtZXRob2Qgc2V0RGVwdGhUZXN0XG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvblxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKi9cbiAgICBzZXREZXB0aFRlc3Q6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIWNjLkNhbWVyYS5tYWluKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2MuQ2FtZXJhLm1haW4uZGVwdGggPSAhIXZhbHVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU2V0IGNvbG9yIGZvciBjbGVhciBzY3JlZW4uPGJyLz5cbiAgICAgKiAoSW1wbGVtZW50YXRpb24gY2FuIGJlIGZvdW5kIGluIENDRGlyZWN0b3JDYW52YXMuanMvQ0NEaXJlY3RvcldlYkdMLmpzKVxuICAgICAqICEjemhcbiAgICAgKiDorr7nva7lnLrmma/nmoTpu5jorqTmk6bpmaTpopzoibLjgII8YnIvPlxuICAgICAqIOaUr+aMgeWFqOmAj+aYju+8jOS9huS4jeaUr+aMgemAj+aYjuW6puS4uuS4remXtOWAvOOAguimgeaUr+aMgeWFqOmAj+aYjumcgOaJi+W3peW8gOWQryBjYy5tYWNyby5FTkFCTEVfVFJBTlNQQVJFTlRfQ0FOVkFT44CCXG4gICAgICogQG1ldGhvZCBzZXRDbGVhckNvbG9yXG4gICAgICogQHBhcmFtIHtDb2xvcn0gY2xlYXJDb2xvclxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKi9cbiAgICBzZXRDbGVhckNvbG9yOiBmdW5jdGlvbiAoY2xlYXJDb2xvcikge1xuICAgICAgICBpZiAoIWNjLkNhbWVyYS5tYWluKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2MuQ2FtZXJhLm1haW4uYmFja2dyb3VuZENvbG9yID0gY2xlYXJDb2xvcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIGN1cnJlbnQgbG9naWMgU2NlbmUuXG4gICAgICogISN6aCDojrflj5blvZPliY3pgLvovpHlnLrmma/jgIJcbiAgICAgKiBAbWV0aG9kIGdldFJ1bm5pbmdTY2VuZVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHJldHVybiB7U2NlbmV9XG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqL1xuICAgIGdldFJ1bm5pbmdTY2VuZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NlbmU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyBjdXJyZW50IGxvZ2ljIFNjZW5lLlxuICAgICAqICEjemgg6I635Y+W5b2T5YmN6YC76L6R5Zy65pmv44CCXG4gICAgICogQG1ldGhvZCBnZXRTY2VuZVxuICAgICAqIEByZXR1cm4ge1NjZW5lfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogIC8vIFRoaXMgd2lsbCBoZWxwIHlvdSB0byBnZXQgdGhlIENhbnZhcyBub2RlIGluIHNjZW5lXG4gICAgICogIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ0NhbnZhcycpO1xuICAgICAqL1xuICAgIGdldFNjZW5lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2VuZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBGUFMgdmFsdWUuIFBsZWFzZSB1c2Uge3sjY3Jvc3NMaW5rIFwiR2FtZS5zZXRGcmFtZVJhdGVcIn19Y2MuZ2FtZS5zZXRGcmFtZVJhdGV7ey9jcm9zc0xpbmt9fSB0byBjb250cm9sIGFuaW1hdGlvbiBpbnRlcnZhbC5cbiAgICAgKiAhI3poIOiOt+WPluWNleS9jeW4p+aJp+ihjOaXtumXtOOAguivt+S9v+eUqCB7eyNjcm9zc0xpbmsgXCJHYW1lLnNldEZyYW1lUmF0ZVwifX1jYy5nYW1lLnNldEZyYW1lUmF0ZXt7L2Nyb3NzTGlua319IOadpeaOp+WItua4uOaIj+W4p+eOh+OAglxuICAgICAqIEBtZXRob2QgZ2V0QW5pbWF0aW9uSW50ZXJ2YWxcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldEFuaW1hdGlvbkludGVydmFsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAxMDAwIC8gZ2FtZS5nZXRGcmFtZVJhdGUoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhbmltYXRpb24gaW50ZXJ2YWwsIHRoaXMgZG9lc24ndCBjb250cm9sIHRoZSBtYWluIGxvb3AuXG4gICAgICogVG8gY29udHJvbCB0aGUgZ2FtZSdzIGZyYW1lIHJhdGUgb3ZlcmFsbCwgcGxlYXNlIHVzZSB7eyNjcm9zc0xpbmsgXCJHYW1lLnNldEZyYW1lUmF0ZVwifX1jYy5nYW1lLnNldEZyYW1lUmF0ZXt7L2Nyb3NzTGlua319XG4gICAgICogQG1ldGhvZCBzZXRBbmltYXRpb25JbnRlcnZhbFxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBUaGUgYW5pbWF0aW9uIGludGVydmFsIGRlc2lyZWQuXG4gICAgICovXG4gICAgc2V0QW5pbWF0aW9uSW50ZXJ2YWw6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBnYW1lLnNldEZyYW1lUmF0ZShNYXRoLnJvdW5kKDEwMDAgLyB2YWx1ZSkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIGRlbHRhIHRpbWUgc2luY2UgbGFzdCBmcmFtZS5cbiAgICAgKiAhI3poIOiOt+WPluS4iuS4gOW4p+eahOWinumHj+aXtumXtOOAglxuICAgICAqIEBtZXRob2QgZ2V0RGVsdGFUaW1lXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldERlbHRhVGltZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVsdGFUaW1lO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIHRvdGFsIHBhc3NlZCB0aW1lIHNpbmNlIGdhbWUgc3RhcnQsIHVuaXQ6IG1zXG4gICAgICogISN6aCDojrflj5bku47muLjmiI/lvIDlp4vliLDnjrDlnKjmgLvlhbHnu4/ov4fnmoTml7bpl7TvvIzljZXkvY3kuLogbXNcbiAgICAgKiBAbWV0aG9kIGdldFRvdGFsVGltZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRUb3RhbFRpbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHBlcmZvcm1hbmNlLm5vdygpIC0gdGhpcy5fc3RhcnRUaW1lO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgaG93IG1hbnkgZnJhbWVzIHdlcmUgY2FsbGVkIHNpbmNlIHRoZSBkaXJlY3RvciBzdGFydGVkLlxuICAgICAqICEjemgg6I635Y+WIGRpcmVjdG9yIOWQr+WKqOS7peadpea4uOaIj+i/kOihjOeahOaAu+W4p+aVsOOAglxuICAgICAqIEBtZXRob2QgZ2V0VG90YWxGcmFtZXNcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0VG90YWxGcmFtZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsRnJhbWVzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIERpcmVjdG9yIGlzIHBhdXNlZC5cbiAgICAgKiAhI3poIOaYr+WQpuWkhOS6juaaguWBnOeKtuaAgeOAglxuICAgICAqIEBtZXRob2QgaXNQYXVzZWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzUGF1c2VkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXVzZWQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgY2MuU2NoZWR1bGVyIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGRpcmVjdG9yLlxuICAgICAqICEjemgg6I635Y+W5ZKMIGRpcmVjdG9yIOebuOWFs+iBlOeahCBjYy5TY2hlZHVsZXLjgIJcbiAgICAgKiBAbWV0aG9kIGdldFNjaGVkdWxlclxuICAgICAqIEByZXR1cm4ge1NjaGVkdWxlcn1cbiAgICAgKi9cbiAgICBnZXRTY2hlZHVsZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjaGVkdWxlcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIHRoZSBjYy5TY2hlZHVsZXIgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZGlyZWN0b3IuXG4gICAgICogISN6aCDorr7nva7lkowgZGlyZWN0b3Ig55u45YWz6IGU55qEIGNjLlNjaGVkdWxlcuOAglxuICAgICAqIEBtZXRob2Qgc2V0U2NoZWR1bGVyXG4gICAgICogQHBhcmFtIHtTY2hlZHVsZXJ9IHNjaGVkdWxlclxuICAgICAqL1xuICAgIHNldFNjaGVkdWxlcjogZnVuY3Rpb24gKHNjaGVkdWxlcikge1xuICAgICAgICBpZiAodGhpcy5fc2NoZWR1bGVyICE9PSBzY2hlZHVsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIGNjLkFjdGlvbk1hbmFnZXIgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZGlyZWN0b3IuXG4gICAgICogISN6aCDojrflj5blkowgZGlyZWN0b3Ig55u45YWz6IGU55qEIGNjLkFjdGlvbk1hbmFnZXLvvIjliqjkvZznrqHnkIblmajvvInjgIJcbiAgICAgKiBAbWV0aG9kIGdldEFjdGlvbk1hbmFnZXJcbiAgICAgKiBAcmV0dXJuIHtBY3Rpb25NYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldEFjdGlvbk1hbmFnZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGlvbk1hbmFnZXI7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgdGhlIGNjLkFjdGlvbk1hbmFnZXIgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZGlyZWN0b3IuXG4gICAgICogISN6aCDorr7nva7lkowgZGlyZWN0b3Ig55u45YWz6IGU55qEIGNjLkFjdGlvbk1hbmFnZXLvvIjliqjkvZznrqHnkIblmajvvInjgIJcbiAgICAgKiBAbWV0aG9kIHNldEFjdGlvbk1hbmFnZXJcbiAgICAgKiBAcGFyYW0ge0FjdGlvbk1hbmFnZXJ9IGFjdGlvbk1hbmFnZXJcbiAgICAgKi9cbiAgICBzZXRBY3Rpb25NYW5hZ2VyOiBmdW5jdGlvbiAoYWN0aW9uTWFuYWdlcikge1xuICAgICAgICBpZiAodGhpcy5fYWN0aW9uTWFuYWdlciAhPT0gYWN0aW9uTWFuYWdlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGlvbk1hbmFnZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIudW5zY2hlZHVsZVVwZGF0ZSh0aGlzLl9hY3Rpb25NYW5hZ2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbk1hbmFnZXIgPSBhY3Rpb25NYW5hZ2VyO1xuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVyLnNjaGVkdWxlVXBkYXRlKHRoaXMuX2FjdGlvbk1hbmFnZXIsIGNjLlNjaGVkdWxlci5QUklPUklUWV9TWVNURU0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKiBcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIGNjLkFuaW1hdGlvbk1hbmFnZXIgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZGlyZWN0b3IuXG4gICAgICogISN6aCDojrflj5blkowgZGlyZWN0b3Ig55u45YWz6IGU55qEIGNjLkFuaW1hdGlvbk1hbmFnZXLvvIjliqjnlLvnrqHnkIblmajvvInjgIJcbiAgICAgKiBAbWV0aG9kIGdldEFuaW1hdGlvbk1hbmFnZXJcbiAgICAgKiBAcmV0dXJuIHtBbmltYXRpb25NYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldEFuaW1hdGlvbk1hbmFnZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuaW1hdGlvbk1hbmFnZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgY2MuQ29sbGlzaW9uTWFuYWdlciBhc3NvY2lhdGVkIHdpdGggdGhpcyBkaXJlY3Rvci5cbiAgICAgKiAhI3poIOiOt+WPluWSjCBkaXJlY3RvciDnm7jlhbPogZTnmoQgY2MuQ29sbGlzaW9uTWFuYWdlciDvvIjnorDmkp7nrqHnkIblmajvvInjgIJcbiAgICAgKiBAbWV0aG9kIGdldENvbGxpc2lvbk1hbmFnZXJcbiAgICAgKiBAcmV0dXJuIHtDb2xsaXNpb25NYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldENvbGxpc2lvbk1hbmFnZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbGxpc2lvbk1hbmFnZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgY2MuUGh5c2ljc01hbmFnZXIgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZGlyZWN0b3IuXG4gICAgICogISN6aCDov5Tlm57kuI4gZGlyZWN0b3Ig55u45YWz6IGU55qEIGNjLlBoeXNpY3NNYW5hZ2VyIO+8iOeJqeeQhueuoeeQhuWZqO+8ieOAglxuICAgICAqIEBtZXRob2QgZ2V0UGh5c2ljc01hbmFnZXJcbiAgICAgKiBAcmV0dXJuIHtQaHlzaWNzTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXRQaHlzaWNzTWFuYWdlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGh5c2ljc01hbmFnZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgY2MuUGh5c2ljczNETWFuYWdlciBhc3NvY2lhdGVkIHdpdGggdGhpcyBkaXJlY3Rvci5cbiAgICAgKiAhI3poIOi/lOWbnuS4jiBkaXJlY3RvciDnm7jlhbPogZTnmoQgY2MuUGh5c2ljczNETWFuYWdlciDvvIjniannkIbnrqHnkIblmajvvInjgIJcbiAgICAgKiBAbWV0aG9kIGdldFBoeXNpY3MzRE1hbmFnZXJcbiAgICAgKiBAcmV0dXJuIHtQaHlzaWNzM0RNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldFBoeXNpY3MzRE1hbmFnZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BoeXNpY3MzRE1hbmFnZXI7XG4gICAgfSxcblxuICAgIC8vIExvb3AgbWFuYWdlbWVudFxuICAgIC8qXG4gICAgICogU3RhcnRzIEFuaW1hdGlvblxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjEuMlxuICAgICAqL1xuICAgIHN0YXJ0QW5pbWF0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmdhbWUucmVzdW1lKCk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU3RvcHMgYW5pbWF0aW9uXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMS4yXG4gICAgICovXG4gICAgc3RvcEFuaW1hdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5nYW1lLnBhdXNlKCk7XG4gICAgfSxcblxuICAgIF9yZXNldERlbHRhVGltZSAoKSB7XG4gICAgICAgIHRoaXMuX2xhc3RVcGRhdGUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgdGhpcy5fZGVsdGFUaW1lID0gMDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBSdW4gbWFpbiBsb29wIG9mIGRpcmVjdG9yXG4gICAgICovXG4gICAgbWFpbkxvb3A6IENDX0VESVRPUiA/IGZ1bmN0aW9uIChkZWx0YVRpbWUsIHVwZGF0ZUFuaW1hdGUpIHtcbiAgICAgICAgdGhpcy5fZGVsdGFUaW1lID0gZGVsdGFUaW1lO1xuXG4gICAgICAgIC8vIFVwZGF0ZVxuICAgICAgICBpZiAoIXRoaXMuX3BhdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KGNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9VUERBVEUpO1xuXG4gICAgICAgICAgICB0aGlzLl9jb21wU2NoZWR1bGVyLnN0YXJ0UGhhc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBTY2hlZHVsZXIudXBkYXRlUGhhc2UoZGVsdGFUaW1lKTtcblxuICAgICAgICAgICAgaWYgKHVwZGF0ZUFuaW1hdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIudXBkYXRlKGRlbHRhVGltZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBTY2hlZHVsZXIubGF0ZVVwZGF0ZVBoYXNlKGRlbHRhVGltZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9VUERBVEUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVuZGVyXG4gICAgICAgIHRoaXMuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfRFJBVyk7XG4gICAgICAgIHJlbmRlcmVyLnJlbmRlcih0aGlzLl9zY2VuZSwgZGVsdGFUaW1lKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFmdGVyIGRyYXdcbiAgICAgICAgdGhpcy5lbWl0KGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX0RSQVcpO1xuXG4gICAgICAgIHRoaXMuX3RvdGFsRnJhbWVzKys7XG5cbiAgICB9IDogZnVuY3Rpb24gKG5vdykge1xuICAgICAgICBpZiAodGhpcy5fcHVyZ2VEaXJlY3RvckluTmV4dExvb3ApIHtcbiAgICAgICAgICAgIHRoaXMuX3B1cmdlRGlyZWN0b3JJbk5leHRMb29wID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnB1cmdlRGlyZWN0b3IoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBcImdsb2JhbFwiIGR0XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZURlbHRhVGltZShub3cpO1xuXG4gICAgICAgICAgICAvLyBVcGRhdGVcbiAgICAgICAgICAgIGlmICghdGhpcy5fcGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgLy8gYmVmb3JlIHVwZGF0ZVxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfVVBEQVRFKTtcblxuICAgICAgICAgICAgICAgIC8vIENhbGwgc3RhcnQgZm9yIG5ldyBhZGRlZCBjb21wb25lbnRzXG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcFNjaGVkdWxlci5zdGFydFBoYXNlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgZm9yIGNvbXBvbmVudHNcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wU2NoZWR1bGVyLnVwZGF0ZVBoYXNlKHRoaXMuX2RlbHRhVGltZSk7XG4gICAgICAgICAgICAgICAgLy8gRW5naW5lIHVwZGF0ZSB3aXRoIHNjaGVkdWxlclxuICAgICAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci51cGRhdGUodGhpcy5fZGVsdGFUaW1lKTtcblxuICAgICAgICAgICAgICAgIC8vIExhdGUgdXBkYXRlIGZvciBjb21wb25lbnRzXG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcFNjaGVkdWxlci5sYXRlVXBkYXRlUGhhc2UodGhpcy5fZGVsdGFUaW1lKTtcblxuICAgICAgICAgICAgICAgIC8vIFVzZXIgY2FuIHVzZSB0aGlzIGV2ZW50IHRvIGRvIHRoaW5ncyBhZnRlciB1cGRhdGVcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfVVBEQVRFKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBEZXN0cm95IGVudGl0aWVzIHRoYXQgaGF2ZSBiZWVuIHJlbW92ZWQgcmVjZW50bHlcbiAgICAgICAgICAgICAgICBPYmouX2RlZmVycmVkRGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZW5kZXJcbiAgICAgICAgICAgIHRoaXMuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfRFJBVyk7XG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIodGhpcy5fc2NlbmUsIHRoaXMuX2RlbHRhVGltZSk7XG5cbiAgICAgICAgICAgIC8vIEFmdGVyIGRyYXdcbiAgICAgICAgICAgIHRoaXMuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9EUkFXKTtcblxuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLmZyYW1lVXBkYXRlTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB0aGlzLl90b3RhbEZyYW1lcysrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9fZmFzdE9uOiBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCkge1xuICAgICAgICB0aGlzLm9uKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpO1xuICAgIH0sXG5cbiAgICBfX2Zhc3RPZmY6IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMub2ZmKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpO1xuICAgIH0sXG59O1xuXG4vLyBFdmVudCB0YXJnZXRcbmNjLmpzLmFkZG9uKGNjLkRpcmVjdG9yLnByb3RvdHlwZSwgRXZlbnRUYXJnZXQucHJvdG90eXBlKTtcblxuLyoqXG4gKiAhI2VuIFRoZSBldmVudCBwcm9qZWN0aW9uIGNoYW5nZWQgb2YgY2MuRGlyZWN0b3IuIFRoaXMgZXZlbnQgd2lsbCBub3QgZ2V0IHRyaWdnZXJlZCBzaW5jZSB2Mi4wXG4gKiAhI3poIGNjLkRpcmVjdG9yIOaKleW9seWPmOWMlueahOS6i+S7tuOAguS7jiB2Mi4wIOW8gOWni+i/meS4quS6i+S7tuS4jeS8muWGjeiiq+inpuWPkVxuICogQHByb3BlcnR5IHtTdHJpbmd9IEVWRU5UX1BST0pFQ1RJT05fQ0hBTkdFRFxuICogQHJlYWRvbmx5XG4gKiBAc3RhdGljXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gKi9cbmNjLkRpcmVjdG9yLkVWRU5UX1BST0pFQ1RJT05fQ0hBTkdFRCA9IFwiZGlyZWN0b3JfcHJvamVjdGlvbl9jaGFuZ2VkXCI7XG5cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgd2hpY2ggd2lsbCBiZSB0cmlnZ2VyZWQgYmVmb3JlIGxvYWRpbmcgYSBuZXcgc2NlbmUuXG4gKiAhI3poIOWKoOi9veaWsOWcuuaZr+S5i+WJjeaJgOinpuWPkeeahOS6i+S7tuOAglxuICogQGV2ZW50IGNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9TQ0VORV9MT0FESU5HXG4gKiBAcGFyYW0ge1N0cmluZ30gc2NlbmVOYW1lIC0gVGhlIGxvYWRpbmcgc2NlbmUgbmFtZVxuICovXG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IHdoaWNoIHdpbGwgYmUgdHJpZ2dlcmVkIGJlZm9yZSBsb2FkaW5nIGEgbmV3IHNjZW5lLlxuICogISN6aCDliqDovb3mlrDlnLrmma/kuYvliY3miYDop6blj5HnmoTkuovku7bjgIJcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBFVkVOVF9CRUZPUkVfU0NFTkVfTE9BRElOR1xuICogQHJlYWRvbmx5XG4gKiBAc3RhdGljXG4gKi9cbmNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9TQ0VORV9MT0FESU5HID0gXCJkaXJlY3Rvcl9iZWZvcmVfc2NlbmVfbG9hZGluZ1wiO1xuXG4vKlxuICogISNlbiBUaGUgZXZlbnQgd2hpY2ggd2lsbCBiZSB0cmlnZ2VyZWQgYmVmb3JlIGxhdW5jaGluZyBhIG5ldyBzY2VuZS5cbiAqICEjemgg6L+Q6KGM5paw5Zy65pmv5LmL5YmN5omA6Kem5Y+R55qE5LqL5Lu244CCXG4gKiBAZXZlbnQgY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX1NDRU5FX0xBVU5DSFxuICogQHBhcmFtIHtTdHJpbmd9IHNjZW5lTmFtZSAtIE5ldyBzY2VuZSB3aGljaCB3aWxsIGJlIGxhdW5jaGVkXG4gKi9cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgd2hpY2ggd2lsbCBiZSB0cmlnZ2VyZWQgYmVmb3JlIGxhdW5jaGluZyBhIG5ldyBzY2VuZS5cbiAqICEjemgg6L+Q6KGM5paw5Zy65pmv5LmL5YmN5omA6Kem5Y+R55qE5LqL5Lu244CCXG4gKiBAcHJvcGVydHkge1N0cmluZ30gRVZFTlRfQkVGT1JFX1NDRU5FX0xBVU5DSFxuICogQHJlYWRvbmx5XG4gKiBAc3RhdGljXG4gKi9cbmNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9TQ0VORV9MQVVOQ0ggPSBcImRpcmVjdG9yX2JlZm9yZV9zY2VuZV9sYXVuY2hcIjtcblxuLyoqXG4gKiAhI2VuIFRoZSBldmVudCB3aGljaCB3aWxsIGJlIHRyaWdnZXJlZCBhZnRlciBsYXVuY2hpbmcgYSBuZXcgc2NlbmUuXG4gKiAhI3poIOi/kOihjOaWsOWcuuaZr+S5i+WQjuaJgOinpuWPkeeahOS6i+S7tuOAglxuICogQGV2ZW50IGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1NDRU5FX0xBVU5DSFxuICogQHBhcmFtIHtTdHJpbmd9IHNjZW5lTmFtZSAtIE5ldyBzY2VuZSB3aGljaCBpcyBsYXVuY2hlZFxuICovXG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IHdoaWNoIHdpbGwgYmUgdHJpZ2dlcmVkIGFmdGVyIGxhdW5jaGluZyBhIG5ldyBzY2VuZS5cbiAqICEjemgg6L+Q6KGM5paw5Zy65pmv5LmL5ZCO5omA6Kem5Y+R55qE5LqL5Lu244CCXG4gKiBAcHJvcGVydHkge1N0cmluZ30gRVZFTlRfQUZURVJfU0NFTkVfTEFVTkNIXG4gKiBAcmVhZG9ubHlcbiAqIEBzdGF0aWNcbiAqL1xuY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfU0NFTkVfTEFVTkNIID0gXCJkaXJlY3Rvcl9hZnRlcl9zY2VuZV9sYXVuY2hcIjtcblxuLyoqXG4gKiAhI2VuIFRoZSBldmVudCB3aGljaCB3aWxsIGJlIHRyaWdnZXJlZCBhdCB0aGUgYmVnaW5uaW5nIG9mIGV2ZXJ5IGZyYW1lLlxuICogISN6aCDmr4/kuKrluKfnmoTlvIDlp4vml7bmiYDop6blj5HnmoTkuovku7bjgIJcbiAqIEBldmVudCBjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfVVBEQVRFXG4gKi9cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgd2hpY2ggd2lsbCBiZSB0cmlnZ2VyZWQgYXQgdGhlIGJlZ2lubmluZyBvZiBldmVyeSBmcmFtZS5cbiAqICEjemgg5q+P5Liq5bin55qE5byA5aeL5pe25omA6Kem5Y+R55qE5LqL5Lu244CCXG4gKiBAcHJvcGVydHkge1N0cmluZ30gRVZFTlRfQkVGT1JFX1VQREFURVxuICogQHJlYWRvbmx5XG4gKiBAc3RhdGljXG4gKi9cbmNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9VUERBVEUgPSBcImRpcmVjdG9yX2JlZm9yZV91cGRhdGVcIjtcblxuLyoqXG4gKiAhI2VuIFRoZSBldmVudCB3aGljaCB3aWxsIGJlIHRyaWdnZXJlZCBhZnRlciBlbmdpbmUgYW5kIGNvbXBvbmVudHMgdXBkYXRlIGxvZ2ljLlxuICogISN6aCDlsIblnKjlvJXmk47lkoznu4Tku7Yg4oCcdXBkYXRl4oCdIOmAu+i+keS5i+WQjuaJgOinpuWPkeeahOS6i+S7tuOAglxuICogQGV2ZW50IGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1VQREFURVxuICovXG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IHdoaWNoIHdpbGwgYmUgdHJpZ2dlcmVkIGFmdGVyIGVuZ2luZSBhbmQgY29tcG9uZW50cyB1cGRhdGUgbG9naWMuXG4gKiAhI3poIOWwhuWcqOW8leaTjuWSjOe7hOS7tiDigJx1cGRhdGXigJ0g6YC76L6R5LmL5ZCO5omA6Kem5Y+R55qE5LqL5Lu244CCXG4gKiBAcHJvcGVydHkge1N0cmluZ30gRVZFTlRfQUZURVJfVVBEQVRFXG4gKiBAcmVhZG9ubHlcbiAqIEBzdGF0aWNcbiAqL1xuY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfVVBEQVRFID0gXCJkaXJlY3Rvcl9hZnRlcl91cGRhdGVcIjtcblxuLyoqXG4gKiAhI2VuIFRoZSBldmVudCBpcyBkZXByZWNhdGVkIHNpbmNlIHYyLjAsIHBsZWFzZSB1c2UgY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX0RSQVcgaW5zdGVhZFxuICogISN6aCDov5nkuKrkuovku7bku44gdjIuMCDlvIDlp4vooqvlup/lvIPvvIzor7fnm7TmjqXkvb/nlKggY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX0RSQVdcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBFVkVOVF9CRUZPUkVfVklTSVRcbiAqIEByZWFkb25seVxuICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICogQHN0YXRpY1xuICovXG5jYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfVklTSVQgPSBcImRpcmVjdG9yX2JlZm9yZV9kcmF3XCI7XG5cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgaXMgZGVwcmVjYXRlZCBzaW5jZSB2Mi4wLCBwbGVhc2UgdXNlIGNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9EUkFXIGluc3RlYWRcbiAqICEjemgg6L+Z5Liq5LqL5Lu25LuOIHYyLjAg5byA5aeL6KKr5bqf5byD77yM6K+355u05o6l5L2/55SoIGNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9EUkFXXG4gKiBAcHJvcGVydHkge1N0cmluZ30gRVZFTlRfQUZURVJfVklTSVRcbiAqIEByZWFkb25seVxuICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICogQHN0YXRpY1xuICovXG5jYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9WSVNJVCA9IFwiZGlyZWN0b3JfYmVmb3JlX2RyYXdcIjtcblxuLyoqXG4gKiAhI2VuIFRoZSBldmVudCB3aGljaCB3aWxsIGJlIHRyaWdnZXJlZCBiZWZvcmUgdGhlIHJlbmRlcmluZyBwcm9jZXNzLlxuICogISN6aCDmuLLmn5Pov4fnqIvkuYvliY3miYDop6blj5HnmoTkuovku7bjgIJcbiAqIEBldmVudCBjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfRFJBV1xuICovXG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IHdoaWNoIHdpbGwgYmUgdHJpZ2dlcmVkIGJlZm9yZSB0aGUgcmVuZGVyaW5nIHByb2Nlc3MuXG4gKiAhI3poIOa4suafk+i/h+eoi+S5i+WJjeaJgOinpuWPkeeahOS6i+S7tuOAglxuICogQHByb3BlcnR5IHtTdHJpbmd9IEVWRU5UX0JFRk9SRV9EUkFXXG4gKiBAcmVhZG9ubHlcbiAqIEBzdGF0aWNcbiAqL1xuY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX0RSQVcgPSBcImRpcmVjdG9yX2JlZm9yZV9kcmF3XCI7XG5cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgd2hpY2ggd2lsbCBiZSB0cmlnZ2VyZWQgYWZ0ZXIgdGhlIHJlbmRlcmluZyBwcm9jZXNzLlxuICogISN6aCDmuLLmn5Pov4fnqIvkuYvlkI7miYDop6blj5HnmoTkuovku7bjgIJcbiAqIEBldmVudCBjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9EUkFXXG4gKi9cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgd2hpY2ggd2lsbCBiZSB0cmlnZ2VyZWQgYWZ0ZXIgdGhlIHJlbmRlcmluZyBwcm9jZXNzLlxuICogISN6aCDmuLLmn5Pov4fnqIvkuYvlkI7miYDop6blj5HnmoTkuovku7bjgIJcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBFVkVOVF9BRlRFUl9EUkFXXG4gKiBAcmVhZG9ubHlcbiAqIEBzdGF0aWNcbiAqL1xuY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfRFJBVyA9IFwiZGlyZWN0b3JfYWZ0ZXJfZHJhd1wiO1xuXG4vL1Bvc3NpYmxlIE9wZW5HTCBwcm9qZWN0aW9ucyB1c2VkIGJ5IGRpcmVjdG9yXG5cbi8qKlxuICogQ29uc3RhbnQgZm9yIDJEIHByb2plY3Rpb24gKG9ydGhvZ29uYWwgcHJvamVjdGlvbilcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQUk9KRUNUSU9OXzJEXG4gKiBAZGVmYXVsdCAwXG4gKiBAcmVhZG9ubHlcbiAqIEBzdGF0aWNcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAqL1xuY2MuRGlyZWN0b3IuUFJPSkVDVElPTl8yRCA9IDA7XG5cbi8qKlxuICogQ29uc3RhbnQgZm9yIDNEIHByb2plY3Rpb24gd2l0aCBhIGZvdnk9NjAsIHpuZWFyPTAuNWYgYW5kIHpmYXI9MTUwMC5cbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQUk9KRUNUSU9OXzNEXG4gKiBAZGVmYXVsdCAxXG4gKiBAcmVhZG9ubHlcbiAqIEBzdGF0aWNcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAqL1xuY2MuRGlyZWN0b3IuUFJPSkVDVElPTl8zRCA9IDE7XG5cbi8qKlxuICogQ29uc3RhbnQgZm9yIGN1c3RvbSBwcm9qZWN0aW9uLCBpZiBjYy5EaXJlY3RvcidzIHByb2plY3Rpb24gc2V0IHRvIGl0LCBpdCBjYWxscyBcInVwZGF0ZVByb2plY3Rpb25cIiBvbiB0aGUgcHJvamVjdGlvbiBkZWxlZ2F0ZS5cbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQUk9KRUNUSU9OX0NVU1RPTVxuICogQGRlZmF1bHQgM1xuICogQHJlYWRvbmx5XG4gKiBAc3RhdGljXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gKi9cbmNjLkRpcmVjdG9yLlBST0pFQ1RJT05fQ1VTVE9NID0gMztcblxuLyoqXG4gKiBDb25zdGFudCBmb3IgZGVmYXVsdCBwcm9qZWN0aW9uIG9mIGNjLkRpcmVjdG9yLCBkZWZhdWx0IHByb2plY3Rpb24gaXMgMkQgcHJvamVjdGlvblxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFBST0pFQ1RJT05fREVGQVVMVFxuICogQGRlZmF1bHQgY2MuRGlyZWN0b3IuUFJPSkVDVElPTl8yRFxuICogQHJlYWRvbmx5XG4gKiBAc3RhdGljXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gKi9cbmNjLkRpcmVjdG9yLlBST0pFQ1RJT05fREVGQVVMVCA9IGNjLkRpcmVjdG9yLlBST0pFQ1RJT05fMkQ7XG5cbi8qKlxuICogVGhlIGV2ZW50IHdoaWNoIHdpbGwgYmUgdHJpZ2dlcmVkIGJlZm9yZSB0aGUgcGh5c2ljcyBwcm9jZXNzLjxici8+XG4gKiDniannkIbov4fnqIvkuYvliY3miYDop6blj5HnmoTkuovku7bjgIJcbiAqIEBldmVudCBEaXJlY3Rvci5FVkVOVF9CRUZPUkVfUEhZU0lDU1xuICogQHJlYWRvbmx5XG4gKi9cbmNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9QSFlTSUNTID0gJ2RpcmVjdG9yX2JlZm9yZV9waHlzaWNzJztcblxuLyoqXG4gKiBUaGUgZXZlbnQgd2hpY2ggd2lsbCBiZSB0cmlnZ2VyZWQgYWZ0ZXIgdGhlIHBoeXNpY3MgcHJvY2Vzcy48YnIvPlxuICog54mp55CG6L+H56iL5LmL5ZCO5omA6Kem5Y+R55qE5LqL5Lu244CCXG4gKiBAZXZlbnQgRGlyZWN0b3IuRVZFTlRfQUZURVJfUEhZU0lDU1xuICogQHJlYWRvbmx5XG4gKi9cbmNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1BIWVNJQ1MgPSAnZGlyZWN0b3JfYWZ0ZXJfcGh5c2ljcyc7XG5cbi8qKlxuICogQG1vZHVsZSBjY1xuICovXG5cbi8qKlxuICogISNlbiBEaXJlY3RvclxuICogISN6aCDlr7zmvJTnsbvjgIJcbiAqIEBwcm9wZXJ0eSBkaXJlY3RvclxuICogQHR5cGUge0RpcmVjdG9yfVxuICovXG5jYy5kaXJlY3RvciA9IG5ldyBjYy5EaXJlY3RvcigpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNjLmRpcmVjdG9yOyJdLCJzb3VyY2VSb290IjoiLyJ9