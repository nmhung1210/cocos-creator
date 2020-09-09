
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL0NDRGlyZWN0b3IuanMiXSwibmFtZXMiOlsiRXZlbnRUYXJnZXQiLCJyZXF1aXJlIiwiQ29tcG9uZW50U2NoZWR1bGVyIiwiTm9kZUFjdGl2YXRvciIsIk9iaiIsImdhbWUiLCJyZW5kZXJlciIsImV2ZW50TWFuYWdlciIsIlNjaGVkdWxlciIsImNjIiwiRGlyZWN0b3IiLCJjYWxsIiwiX3BhdXNlZCIsIl9wdXJnZURpcmVjdG9ySW5OZXh0TG9vcCIsIl93aW5TaXplSW5Qb2ludHMiLCJfc2NlbmUiLCJfbG9hZGluZ1NjZW5lIiwiX3RvdGFsRnJhbWVzIiwiX2xhc3RVcGRhdGUiLCJfZGVsdGFUaW1lIiwiX3N0YXJ0VGltZSIsIl9tYXhQYXJ0aWNsZURlbHRhVGltZSIsIl9zY2hlZHVsZXIiLCJfY29tcFNjaGVkdWxlciIsIl9ub2RlQWN0aXZhdG9yIiwiX2FjdGlvbk1hbmFnZXIiLCJzZWxmIiwib24iLCJFVkVOVF9TSE9XIiwicGVyZm9ybWFuY2UiLCJub3ciLCJvbmNlIiwiRVZFTlRfRU5HSU5FX0lOSVRFRCIsImluaXQiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsInNpemUiLCJBY3Rpb25NYW5hZ2VyIiwic2NoZWR1bGVVcGRhdGUiLCJQUklPUklUWV9TWVNURU0iLCJzaGFyZWRJbml0Iiwic2V0RW5hYmxlZCIsIkFuaW1hdGlvbk1hbmFnZXIiLCJfYW5pbWF0aW9uTWFuYWdlciIsIkNvbGxpc2lvbk1hbmFnZXIiLCJfY29sbGlzaW9uTWFuYWdlciIsIlBoeXNpY3NNYW5hZ2VyIiwiX3BoeXNpY3NNYW5hZ2VyIiwiUGh5c2ljczNETWFuYWdlciIsIl9waHlzaWNzM0RNYW5hZ2VyIiwiX3dpZGdldE1hbmFnZXIiLCJjYWxjdWxhdGVEZWx0YVRpbWUiLCJDQ19ERUJVRyIsImNvbnZlcnRUb0dMIiwidWlQb2ludCIsImNvbnRhaW5lciIsInZpZXciLCJib3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJsZWZ0Iiwid2luZG93IiwicGFnZVhPZmZzZXQiLCJjbGllbnRMZWZ0IiwidG9wIiwicGFnZVlPZmZzZXQiLCJjbGllbnRUb3AiLCJ4IiwiX2RldmljZVBpeGVsUmF0aW8iLCJ5IiwiaGVpZ2h0IiwiX2lzUm90YXRlZCIsInYyIiwiX3ZpZXdwb3J0UmVjdCIsIndpZHRoIiwiY29udmVydFRvVUkiLCJnbFBvaW50IiwiZW5kIiwiZ2V0V2luU2l6ZSIsIndpblNpemUiLCJnZXRXaW5TaXplSW5QaXhlbHMiLCJwYXVzZSIsInB1cmdlQ2FjaGVkRGF0YSIsImFzc2V0TWFuYWdlciIsInJlbGVhc2VBbGwiLCJwdXJnZURpcmVjdG9yIiwidW5zY2hlZHVsZUFsbCIsInJlc2V0IiwiQ0NfRURJVE9SIiwiaXNWYWxpZCIsImRlc3Ryb3kiLCJjbGVhciIsImJ1aWx0aW5zIiwicmVzdW1lIiwicnVuU2NlbmVJbW1lZGlhdGUiLCJzY2VuZSIsIm9uQmVmb3JlTG9hZFNjZW5lIiwib25MYXVuY2hlZCIsImFzc2VydElEIiwiU2NlbmUiLCJTY2VuZUFzc2V0IiwiQ0NfQlVJTEQiLCJjb25zb2xlIiwidGltZSIsIl9sb2FkIiwidGltZUVuZCIsInBlcnNpc3ROb2RlTGlzdCIsIk9iamVjdCIsImtleXMiLCJfcGVyc2lzdFJvb3ROb2RlcyIsIm1hcCIsImkiLCJsZW5ndGgiLCJub2RlIiwiZXhpc3ROb2RlIiwiZ2V0Q2hpbGRCeVV1aWQiLCJ1dWlkIiwiaW5kZXgiLCJnZXRTaWJsaW5nSW5kZXgiLCJfZGVzdHJveUltbWVkaWF0ZSIsImluc2VydENoaWxkIiwicGFyZW50Iiwib2xkU2NlbmUiLCJfcmVsZWFzZU1hbmFnZXIiLCJfYXV0b1JlbGVhc2UiLCJfZGVmZXJyZWREZXN0cm95IiwiZW1pdCIsIkVWRU5UX0JFRk9SRV9TQ0VORV9MQVVOQ0giLCJfYWN0aXZhdGUiLCJFVkVOVF9BRlRFUl9TQ0VORV9MQVVOQ0giLCJydW5TY2VuZSIsIkVWRU5UX0FGVEVSX0RSQVciLCJsb2FkU2NlbmUiLCJzY2VuZU5hbWUiLCJfb25VbmxvYWRlZCIsIndhcm5JRCIsImJ1bmRsZSIsImJ1bmRsZXMiLCJmaW5kIiwiZ2V0U2NlbmVJbmZvIiwiRVZFTlRfQkVGT1JFX1NDRU5FX0xPQURJTkciLCJlcnIiLCJlcnJvciIsImVycm9ySUQiLCJwcmVsb2FkU2NlbmUiLCJvblByb2dyZXNzIiwib25Mb2FkZWQiLCJsb2dJRCIsInNldERlcHRoVGVzdCIsInZhbHVlIiwiQ2FtZXJhIiwibWFpbiIsImRlcHRoIiwic2V0Q2xlYXJDb2xvciIsImNsZWFyQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJnZXRSdW5uaW5nU2NlbmUiLCJnZXRTY2VuZSIsImdldEFuaW1hdGlvbkludGVydmFsIiwiZ2V0RnJhbWVSYXRlIiwic2V0QW5pbWF0aW9uSW50ZXJ2YWwiLCJzZXRGcmFtZVJhdGUiLCJNYXRoIiwicm91bmQiLCJnZXREZWx0YVRpbWUiLCJnZXRUb3RhbFRpbWUiLCJnZXRUb3RhbEZyYW1lcyIsImlzUGF1c2VkIiwiZ2V0U2NoZWR1bGVyIiwic2V0U2NoZWR1bGVyIiwic2NoZWR1bGVyIiwiZ2V0QWN0aW9uTWFuYWdlciIsInNldEFjdGlvbk1hbmFnZXIiLCJhY3Rpb25NYW5hZ2VyIiwidW5zY2hlZHVsZVVwZGF0ZSIsImdldEFuaW1hdGlvbk1hbmFnZXIiLCJnZXRDb2xsaXNpb25NYW5hZ2VyIiwiZ2V0UGh5c2ljc01hbmFnZXIiLCJnZXRQaHlzaWNzM0RNYW5hZ2VyIiwic3RhcnRBbmltYXRpb24iLCJzdG9wQW5pbWF0aW9uIiwiX3Jlc2V0RGVsdGFUaW1lIiwibWFpbkxvb3AiLCJkZWx0YVRpbWUiLCJ1cGRhdGVBbmltYXRlIiwiRVZFTlRfQkVGT1JFX1VQREFURSIsInN0YXJ0UGhhc2UiLCJ1cGRhdGVQaGFzZSIsInVwZGF0ZSIsImxhdGVVcGRhdGVQaGFzZSIsIkVWRU5UX0FGVEVSX1VQREFURSIsIkVWRU5UX0JFRk9SRV9EUkFXIiwicmVuZGVyIiwiZnJhbWVVcGRhdGVMaXN0ZW5lcnMiLCJfX2Zhc3RPbiIsInR5cGUiLCJjYWxsYmFjayIsInRhcmdldCIsIl9fZmFzdE9mZiIsIm9mZiIsImpzIiwiYWRkb24iLCJFVkVOVF9QUk9KRUNUSU9OX0NIQU5HRUQiLCJFVkVOVF9CRUZPUkVfVklTSVQiLCJFVkVOVF9BRlRFUl9WSVNJVCIsIlBST0pFQ1RJT05fMkQiLCJQUk9KRUNUSU9OXzNEIiwiUFJPSkVDVElPTl9DVVNUT00iLCJQUk9KRUNUSU9OX0RFRkFVTFQiLCJFVkVOVF9CRUZPUkVfUEhZU0lDUyIsIkVWRU5UX0FGVEVSX1BIWVNJQ1MiLCJkaXJlY3RvciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsSUFBTUEsV0FBVyxHQUFHQyxPQUFPLENBQUMsc0JBQUQsQ0FBM0I7O0FBQ0EsSUFBTUMsa0JBQWtCLEdBQUdELE9BQU8sQ0FBQyx1QkFBRCxDQUFsQzs7QUFDQSxJQUFNRSxhQUFhLEdBQUdGLE9BQU8sQ0FBQyxrQkFBRCxDQUE3Qjs7QUFDQSxJQUFNRyxHQUFHLEdBQUdILE9BQU8sQ0FBQyxxQkFBRCxDQUFuQjs7QUFDQSxJQUFNSSxJQUFJLEdBQUdKLE9BQU8sQ0FBQyxVQUFELENBQXBCOztBQUNBLElBQU1LLFFBQVEsR0FBR0wsT0FBTyxDQUFDLFlBQUQsQ0FBeEI7O0FBQ0EsSUFBTU0sWUFBWSxHQUFHTixPQUFPLENBQUMsaUJBQUQsQ0FBNUI7O0FBQ0EsSUFBTU8sU0FBUyxHQUFHUCxPQUFPLENBQUMsZUFBRCxDQUF6QixFQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0VBUSxFQUFFLENBQUNDLFFBQUgsR0FBYyxZQUFZO0FBQ3RCVixFQUFBQSxXQUFXLENBQUNXLElBQVosQ0FBaUIsSUFBakIsRUFEc0IsQ0FHdEI7O0FBQ0EsT0FBS0MsT0FBTCxHQUFlLEtBQWYsQ0FKc0IsQ0FLdEI7O0FBQ0EsT0FBS0Msd0JBQUwsR0FBZ0Ms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Z0Msc0JBQWhDO0FBRUE7Ozs7OztBQUtBOzs7Ozs7OztBQU9BckwsRUFBRSxDQUFDQyxRQUFILENBQVl3SCxnQkFBWixHQUErQixxQkFBL0IsRUFFQTs7QUFFQTs7Ozs7Ozs7O0FBUUF6SCxFQUFFLENBQUNDLFFBQUgsQ0FBWWtNLGFBQVosR0FBNEIsQ0FBNUI7QUFFQTs7Ozs7Ozs7O0FBUUFuTSxFQUFFLENBQUNDLFFBQUgsQ0FBWW1NLGFBQVosR0FBNEIsQ0FBNUI7QUFFQTs7Ozs7Ozs7O0FBUUFwTSxFQUFFLENBQUNDLFFBQUgsQ0FBWW9NLGlCQUFaLEdBQWdDLENBQWhDO0FBRUE7Ozs7Ozs7OztBQVFBck0sRUFBRSxDQUFDQyxRQUFILENBQVlxTSxrQkFBWixHQUFpQ3RNLEVBQUUsQ0FBQ0MsUUFBSCxDQUFZa00sYUFBN0M7QUFFQTs7Ozs7OztBQU1Bbk0sRUFBRSxDQUFDQyxRQUFILENBQVlzTSxvQkFBWixHQUFtQyx5QkFBbkM7QUFFQTs7Ozs7OztBQU1Bdk0sRUFBRSxDQUFDQyxRQUFILENBQVl1TSxtQkFBWixHQUFrQyx3QkFBbEM7QUFFQTs7OztBQUlBOzs7Ozs7O0FBTUF4TSxFQUFFLENBQUN5TSxRQUFILEdBQWMsSUFBSXpNLEVBQUUsQ0FBQ0MsUUFBUCxFQUFkO0FBRUF5TSxNQUFNLENBQUNDLE9BQVAsR0FBaUIzTSxFQUFFLENBQUN5TSxRQUFwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDA4LTIwMTAgUmljYXJkbyBRdWVzYWRhXG4gQ29weXJpZ2h0IChjKSAyMDExLTIwMTIgY29jb3MyZC14Lm9yZ1xuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50LXRhcmdldCcpO1xuY29uc3QgQ29tcG9uZW50U2NoZWR1bGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnQtc2NoZWR1bGVyJyk7XG5jb25zdCBOb2RlQWN0aXZhdG9yID0gcmVxdWlyZSgnLi9ub2RlLWFjdGl2YXRvcicpO1xuY29uc3QgT2JqID0gcmVxdWlyZSgnLi9wbGF0Zm9ybS9DQ09iamVjdCcpO1xuY29uc3QgZ2FtZSA9IHJlcXVpcmUoJy4vQ0NHYW1lJyk7XG5jb25zdCByZW5kZXJlciA9IHJlcXVpcmUoJy4vcmVuZGVyZXInKTtcbmNvbnN0IGV2ZW50TWFuYWdlciA9IHJlcXVpcmUoJy4vZXZlbnQtbWFuYWdlcicpO1xuY29uc3QgU2NoZWR1bGVyID0gcmVxdWlyZSgnLi9DQ1NjaGVkdWxlcicpO1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gKiAhI2VuXG4gKiA8cD5cbiAqICAgIEFUVEVOVElPTjogVVNFIGNjLmRpcmVjdG9yIElOU1RFQUQgT0YgY2MuRGlyZWN0b3IuPGJyLz5cbiAqICAgIGNjLmRpcmVjdG9yIGlzIGEgc2luZ2xldG9uIG9iamVjdCB3aGljaCBtYW5hZ2UgeW91ciBnYW1lJ3MgbG9naWMgZmxvdy48YnIvPlxuICogICAgU2luY2UgdGhlIGNjLmRpcmVjdG9yIGlzIGEgc2luZ2xldG9uLCB5b3UgZG9uJ3QgbmVlZCB0byBjYWxsIGFueSBjb25zdHJ1Y3RvciBvciBjcmVhdGUgZnVuY3Rpb25zLDxici8+XG4gKiAgICB0aGUgc3RhbmRhcmQgd2F5IHRvIHVzZSBpdCBpcyBieSBjYWxsaW5nOjxici8+XG4gKiAgICAgIC0gY2MuZGlyZWN0b3IubWV0aG9kTmFtZSgpOyA8YnIvPlxuICpcbiAqICAgIEl0IGNyZWF0ZXMgYW5kIGhhbmRsZSB0aGUgbWFpbiBXaW5kb3cgYW5kIG1hbmFnZXMgaG93IGFuZCB3aGVuIHRvIGV4ZWN1dGUgdGhlIFNjZW5lcy48YnIvPlxuICogICAgPGJyLz5cbiAqICAgIFRoZSBjYy5kaXJlY3RvciBpcyBhbHNvIHJlc3BvbnNpYmxlIGZvcjo8YnIvPlxuICogICAgICAtIGluaXRpYWxpemluZyB0aGUgT3BlbkdMIGNvbnRleHQ8YnIvPlxuICogICAgICAtIHNldHRpbmcgdGhlIE9wZW5HTCBwaXhlbCBmb3JtYXQgKGRlZmF1bHQgb24gaXMgUkdCNTY1KTxici8+XG4gKiAgICAgIC0gc2V0dGluZyB0aGUgT3BlbkdMIGJ1ZmZlciBkZXB0aCAoZGVmYXVsdCBvbiBpcyAwLWJpdCk8YnIvPlxuICogICAgICAtIHNldHRpbmcgdGhlIGNvbG9yIGZvciBjbGVhciBzY3JlZW4gKGRlZmF1bHQgb25lIGlzIEJMQUNLKTxici8+XG4gKiAgICAgIC0gc2V0dGluZyB0aGUgcHJvamVjdGlvbiAoZGVmYXVsdCBvbmUgaXMgM0QpPGJyLz5cbiAqICAgICAgLSBzZXR0aW5nIHRoZSBvcmllbnRhdGlvbiAoZGVmYXVsdCBvbmUgaXMgUG9ydHJhaXQpPGJyLz5cbiAqICAgICAgPGJyLz5cbiAqICAgIDxici8+XG4gKiAgICBUaGUgY2MuZGlyZWN0b3IgYWxzbyBzZXRzIHRoZSBkZWZhdWx0IE9wZW5HTCBjb250ZXh0Ojxici8+XG4gKiAgICAgIC0gR0xfVEVYVFVSRV8yRCBpcyBlbmFibGVkPGJyLz5cbiAqICAgICAgLSBHTF9WRVJURVhfQVJSQVkgaXMgZW5hYmxlZDxici8+XG4gKiAgICAgIC0gR0xfQ09MT1JfQVJSQVkgaXMgZW5hYmxlZDxici8+XG4gKiAgICAgIC0gR0xfVEVYVFVSRV9DT09SRF9BUlJBWSBpcyBlbmFibGVkPGJyLz5cbiAqIDwvcD5cbiAqIDxwPlxuICogICBjYy5kaXJlY3RvciBhbHNvIHN5bmNocm9uaXplcyB0aW1lcnMgd2l0aCB0aGUgcmVmcmVzaCByYXRlIG9mIHRoZSBkaXNwbGF5Ljxici8+XG4gKiAgIEZlYXR1cmVzIGFuZCBMaW1pdGF0aW9uczo8YnIvPlxuICogICAgICAtIFNjaGVkdWxlZCB0aW1lcnMgJiBkcmF3aW5nIGFyZSBzeW5jaHJvbml6ZXMgd2l0aCB0aGUgcmVmcmVzaCByYXRlIG9mIHRoZSBkaXNwbGF5PGJyLz5cbiAqICAgICAgLSBPbmx5IHN1cHBvcnRzIGFuaW1hdGlvbiBpbnRlcnZhbHMgb2YgMS82MCAxLzMwICYgMS8xNTxici8+XG4gKiA8L3A+XG4gKlxuICogISN6aFxuICogPHA+XG4gKiAgICAg5rOo5oSP77ya55SoIGNjLmRpcmVjdG9yIOS7o+abvyBjYy5EaXJlY3RvcuOAgjxici8+XG4gKiAgICAgY2MuZGlyZWN0b3Ig5LiA5Liq566h55CG5L2g55qE5ri45oiP55qE6YC76L6R5rWB56iL55qE5Y2V5L6L5a+56LGh44CCPGJyLz5cbiAqICAgICDnlLHkuo4gY2MuZGlyZWN0b3Ig5piv5LiA5Liq5Y2V5L6L77yM5L2g5LiN6ZyA6KaB6LCD55So5Lu75L2V5p6E6YCg5Ye95pWw5oiW5Yib5bu65Ye95pWw77yMPGJyLz5cbiAqICAgICDkvb/nlKjlroPnmoTmoIflh4bmlrnms5XmmK/pgJrov4fosIPnlKjvvJo8YnIvPlxuICogICAgICAgLSBjYy5kaXJlY3Rvci5tZXRob2ROYW1lKCk7XG4gKiAgICAgPGJyLz5cbiAqICAgICDlroPliJvlu7rlkozlpITnkIbkuLvnqpflj6PlubbkuJTnrqHnkIbku4DkuYjml7blgJnmiafooYzlnLrmma/jgII8YnIvPlxuICogICAgIDxici8+XG4gKiAgICAgY2MuZGlyZWN0b3Ig6L+Y6LSf6LSj77yaPGJyLz5cbiAqICAgICAgLSDliJ3lp4vljJYgT3BlbkdMIOeOr+Wig+OAgjxici8+XG4gKiAgICAgIC0g6K6+572uT3BlbkdM5YOP57Sg5qC85byP44CCKOm7mOiupOaYryBSR0I1NjUpPGJyLz5cbiAqICAgICAgLSDorr7nva5PcGVuR0znvJPlhrLljLrmt7HluqYgKOm7mOiupOaYryAwLWJpdCk8YnIvPlxuICogICAgICAtIOiuvue9ruepuueZveWcuuaZr+eahOminOiJsiAo6buY6K6k5pivIOm7keiJsik8YnIvPlxuICogICAgICAtIOiuvue9ruaKleW9sSAo6buY6K6k5pivIDNEKTxici8+XG4gKiAgICAgIC0g6K6+572u5pa55ZCRICjpu5jorqTmmK8gUG9ydHJhaXQpPGJyLz5cbiAqICAgIDxici8+XG4gKiAgICBjYy5kaXJlY3RvciDorr7nva7kuoYgT3BlbkdMIOm7mOiupOeOr+WigyA8YnIvPlxuICogICAgICAtIEdMX1RFWFRVUkVfMkQgICDlkK/nlKjjgII8YnIvPlxuICogICAgICAtIEdMX1ZFUlRFWF9BUlJBWSDlkK/nlKjjgII8YnIvPlxuICogICAgICAtIEdMX0NPTE9SX0FSUkFZICDlkK/nlKjjgII8YnIvPlxuICogICAgICAtIEdMX1RFWFRVUkVfQ09PUkRfQVJSQVkg5ZCv55So44CCPGJyLz5cbiAqIDwvcD5cbiAqIDxwPlxuICogICBjYy5kaXJlY3RvciDkuZ/lkIzmraXlrprml7blmajkuI7mmL7npLrlmajnmoTliLfmlrDpgJ/njofjgIJcbiAqICAgPGJyLz5cbiAqICAg54m554K55ZKM5bGA6ZmQ5oCnOiA8YnIvPlxuICogICAgICAtIOWwhuiuoeaXtuWZqCAmIOa4suafk+S4juaYvuekuuWZqOeahOWIt+aWsOmikeeOh+WQjOatpeOAgjxici8+XG4gKiAgICAgIC0g5Y+q5pSv5oyB5Yqo55S755qE6Ze06ZqUIDEvNjAgMS8zMCAmIDEvMTXjgII8YnIvPlxuICogPC9wPlxuICpcbiAqIEBjbGFzcyBEaXJlY3RvclxuICogQGV4dGVuZHMgRXZlbnRUYXJnZXRcbiAqL1xuY2MuRGlyZWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgRXZlbnRUYXJnZXQuY2FsbCh0aGlzKTtcblxuICAgIC8vIHBhdXNlZD9cbiAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZTtcbiAgICAvLyBwdXJnZT9cbiAgICB0aGlzLl9wdXJnZURpcmVjdG9ySW5OZXh0TG9vcCA9IGZhbHNlO1xuXG4gICAgdGhpcy5fd2luU2l6ZUluUG9pbnRzID0gbnVsbDtcblxuICAgIC8vIHNjZW5lc1xuICAgIHRoaXMuX3NjZW5lID0gbnVsbDtcbiAgICB0aGlzLl9sb2FkaW5nU2NlbmUgPSAnJztcblxuICAgIC8vIEZQU1xuICAgIHRoaXMuX3RvdGFsRnJhbWVzID0gMDtcbiAgICB0aGlzLl9sYXN0VXBkYXRlID0gMDtcbiAgICB0aGlzLl9kZWx0YVRpbWUgPSAwLjA7XG4gICAgdGhpcy5fc3RhcnRUaW1lID0gMC4wO1xuXG4gICAgLy8gUGFydGljbGVTeXN0ZW0gbWF4IHN0ZXAgZGVsdGEgdGltZVxuICAgIHRoaXMuX21heFBhcnRpY2xlRGVsdGFUaW1lID0gMC4wO1xuXG4gICAgLy8gU2NoZWR1bGVyIGZvciB1c2VyIHJlZ2lzdHJhdGlvbiB1cGRhdGVcbiAgICB0aGlzLl9zY2hlZHVsZXIgPSBudWxsO1xuICAgIC8vIFNjaGVkdWxlciBmb3IgbGlmZS1jeWNsZSBtZXRob2RzIGluIGNvbXBvbmVudFxuICAgIHRoaXMuX2NvbXBTY2hlZHVsZXIgPSBudWxsO1xuICAgIC8vIE5vZGUgYWN0aXZhdG9yXG4gICAgdGhpcy5fbm9kZUFjdGl2YXRvciA9IG51bGw7XG4gICAgLy8gQWN0aW9uIG1hbmFnZXJcbiAgICB0aGlzLl9hY3Rpb25NYW5hZ2VyID0gbnVsbDtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBnYW1lLm9uKGdhbWUuRVZFTlRfU0hPVywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLl9sYXN0VXBkYXRlID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgfSk7XG5cbiAgICBnYW1lLm9uY2UoZ2FtZS5FVkVOVF9FTkdJTkVfSU5JVEVELCB0aGlzLmluaXQsIHRoaXMpO1xufTtcblxuY2MuRGlyZWN0b3IucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBjYy5EaXJlY3RvcixcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RvdGFsRnJhbWVzID0gMDtcbiAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSB0aGlzLl9sYXN0VXBkYXRlO1xuICAgICAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcHVyZ2VEaXJlY3RvckluTmV4dExvb3AgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fd2luU2l6ZUluUG9pbnRzID0gY2Muc2l6ZSgwLCAwKTtcbiAgICAgICAgdGhpcy5fc2NoZWR1bGVyID0gbmV3IFNjaGVkdWxlcigpO1xuXG4gICAgICAgIGlmIChjYy5BY3Rpb25NYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25NYW5hZ2VyID0gbmV3IGNjLkFjdGlvbk1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci5zY2hlZHVsZVVwZGF0ZSh0aGlzLl9hY3Rpb25NYW5hZ2VyLCBTY2hlZHVsZXIuUFJJT1JJVFlfU1lTVEVNLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25NYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2hhcmVkSW5pdCgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBNYW5hZ2UgYWxsIGluaXQgcHJvY2VzcyBzaGFyZWQgYmV0d2VlbiB0aGUgd2ViIGVuZ2luZSBhbmQganNiIGVuZ2luZS5cbiAgICAgKiBBbGwgcGxhdGZvcm0gaW5kZXBlbmRlbnQgaW5pdCBwcm9jZXNzIHNob3VsZCBiZSBvY2N1cGllZCBoZXJlLlxuICAgICAqL1xuICAgIHNoYXJlZEluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY29tcFNjaGVkdWxlciA9IG5ldyBDb21wb25lbnRTY2hlZHVsZXIoKTtcbiAgICAgICAgdGhpcy5fbm9kZUFjdGl2YXRvciA9IG5ldyBOb2RlQWN0aXZhdG9yKCk7XG5cbiAgICAgICAgLy8gRXZlbnQgbWFuYWdlclxuICAgICAgICBpZiAoZXZlbnRNYW5hZ2VyKSB7XG4gICAgICAgICAgICBldmVudE1hbmFnZXIuc2V0RW5hYmxlZCh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFuaW1hdGlvbiBtYW5hZ2VyXG4gICAgICAgIGlmIChjYy5BbmltYXRpb25NYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25NYW5hZ2VyID0gbmV3IGNjLkFuaW1hdGlvbk1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci5zY2hlZHVsZVVwZGF0ZSh0aGlzLl9hbmltYXRpb25NYW5hZ2VyLCBTY2hlZHVsZXIuUFJJT1JJVFlfU1lTVEVNLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25NYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbGxpc2lvbiBtYW5hZ2VyXG4gICAgICAgIGlmIChjYy5Db2xsaXNpb25NYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsaXNpb25NYW5hZ2VyID0gbmV3IGNjLkNvbGxpc2lvbk1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci5zY2hlZHVsZVVwZGF0ZSh0aGlzLl9jb2xsaXNpb25NYW5hZ2VyLCBTY2hlZHVsZXIuUFJJT1JJVFlfU1lTVEVNLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsaXNpb25NYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBoeXNpY3MgbWFuYWdlclxuICAgICAgICBpZiAoY2MuUGh5c2ljc01hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3BoeXNpY3NNYW5hZ2VyID0gbmV3IGNjLlBoeXNpY3NNYW5hZ2VyKCk7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIuc2NoZWR1bGVVcGRhdGUodGhpcy5fcGh5c2ljc01hbmFnZXIsIFNjaGVkdWxlci5QUklPUklUWV9TWVNURU0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BoeXNpY3NNYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBoeXNpY3MgM2QgbWFuYWdlclxuICAgICAgICBpZiAoY2MuUGh5c2ljczNETWFuYWdlcikge1xuICAgICAgICAgICAgdGhpcy5fcGh5c2ljczNETWFuYWdlciA9IG5ldyBjYy5QaHlzaWNzM0RNYW5hZ2VyKCk7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIuc2NoZWR1bGVVcGRhdGUodGhpcy5fcGh5c2ljczNETWFuYWdlciwgU2NoZWR1bGVyLlBSSU9SSVRZX1NZU1RFTSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcGh5c2ljczNETWFuYWdlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXaWRnZXRNYW5hZ2VyXG4gICAgICAgIGlmIChjYy5fd2lkZ2V0TWFuYWdlcikge1xuICAgICAgICAgICAgY2MuX3dpZGdldE1hbmFnZXIuaW5pdCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjYWxjdWxhdGVzIGRlbHRhIHRpbWUgc2luY2UgbGFzdCB0aW1lIGl0IHdhcyBjYWxsZWRcbiAgICAgKi9cbiAgICBjYWxjdWxhdGVEZWx0YVRpbWU6IGZ1bmN0aW9uIChub3cpIHtcbiAgICAgICAgaWYgKCFub3cpIG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG4gICAgICAgIC8vIGF2b2lkIGRlbHRhIHRpbWUgZnJvbSBiZWluZyBuZWdhdGl2ZVxuICAgICAgICAvLyBuZWdhdGl2ZSBkZWx0YVRpbWUgd291bGQgYmUgY2F1c2VkIGJ5IHRoZSBwcmVjaXNpb24gb2Ygbm93J3MgdmFsdWUsIGZvciBkZXRhaWxzIHBsZWFzZSBzZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL3poLUNOL2RvY3MvV2ViL0FQSS93aW5kb3cvcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHRoaXMuX2RlbHRhVGltZSA9IG5vdyA+IHRoaXMuX2xhc3RVcGRhdGUgPyAobm93IC0gdGhpcy5fbGFzdFVwZGF0ZSkgLyAxMDAwIDogMDtcbiAgICAgICAgaWYgKENDX0RFQlVHICYmICh0aGlzLl9kZWx0YVRpbWUgPiAxKSlcbiAgICAgICAgICAgIHRoaXMuX2RlbHRhVGltZSA9IDEgLyA2MC4wO1xuXG4gICAgICAgIHRoaXMuX2xhc3RVcGRhdGUgPSBub3c7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBDb252ZXJ0cyBhIHZpZXcgY29vcmRpbmF0ZSB0byBhbiBXZWJHTCBjb29yZGluYXRlPGJyLz5cbiAgICAgKiBVc2VmdWwgdG8gY29udmVydCAobXVsdGkpIHRvdWNoZXMgY29vcmRpbmF0ZXMgdG8gdGhlIGN1cnJlbnQgbGF5b3V0IChwb3J0cmFpdCBvciBsYW5kc2NhcGUpPGJyLz5cbiAgICAgKiBJbXBsZW1lbnRhdGlvbiBjYW4gYmUgZm91bmQgaW4gQ0NEaXJlY3RvcldlYkdMLlxuICAgICAqICEjemgg5bCG6Kem5pG454K555qE5bGP5bmV5Z2Q5qCH6L2s5o2i5Li6IFdlYkdMIFZpZXcg5LiL55qE5Z2Q5qCH44CCXG4gICAgICogQG1ldGhvZCBjb252ZXJ0VG9HTFxuICAgICAqIEBwYXJhbSB7VmVjMn0gdWlQb2ludFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqL1xuICAgIGNvbnZlcnRUb0dMOiBmdW5jdGlvbiAodWlQb2ludCkge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZ2FtZS5jb250YWluZXI7XG4gICAgICAgIHZhciB2aWV3ID0gY2MudmlldztcbiAgICAgICAgdmFyIGJveCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIGxlZnQgPSBib3gubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCAtIGNvbnRhaW5lci5jbGllbnRMZWZ0O1xuICAgICAgICB2YXIgdG9wID0gYm94LnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCAtIGNvbnRhaW5lci5jbGllbnRUb3A7XG4gICAgICAgIHZhciB4ID0gdmlldy5fZGV2aWNlUGl4ZWxSYXRpbyAqICh1aVBvaW50LnggLSBsZWZ0KTtcbiAgICAgICAgdmFyIHkgPSB2aWV3Ll9kZXZpY2VQaXhlbFJhdGlvICogKHRvcCArIGJveC5oZWlnaHQgLSB1aVBvaW50LnkpO1xuICAgICAgICByZXR1cm4gdmlldy5faXNSb3RhdGVkID8gY2MudjIodmlldy5fdmlld3BvcnRSZWN0LndpZHRoIC0geSwgeCkgOiBjYy52Mih4LCB5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIENvbnZlcnRzIGFuIE9wZW5HTCBjb29yZGluYXRlIHRvIGEgdmlldyBjb29yZGluYXRlPGJyLz5cbiAgICAgKiBVc2VmdWwgdG8gY29udmVydCBub2RlIHBvaW50cyB0byB3aW5kb3cgcG9pbnRzIGZvciBjYWxscyBzdWNoIGFzIGdsU2Npc3Nvcjxici8+XG4gICAgICogSW1wbGVtZW50YXRpb24gY2FuIGJlIGZvdW5kIGluIENDRGlyZWN0b3JXZWJHTC5cbiAgICAgKiAhI3poIOWwhuinpuaRuOeCueeahCBXZWJHTCBWaWV3IOWdkOagh+i9rOaNouS4uuWxj+W5leWdkOagh+OAglxuICAgICAqIEBtZXRob2QgY29udmVydFRvVUlcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IGdsUG9pbnRcbiAgICAgKiBAcmV0dXJuIHtWZWMyfVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKi9cbiAgICBjb252ZXJ0VG9VSTogZnVuY3Rpb24gKGdsUG9pbnQpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGdhbWUuY29udGFpbmVyO1xuICAgICAgICB2YXIgdmlldyA9IGNjLnZpZXc7XG4gICAgICAgIHZhciBib3ggPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBsZWZ0ID0gYm94LmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQgLSBjb250YWluZXIuY2xpZW50TGVmdDtcbiAgICAgICAgdmFyIHRvcCA9IGJveC50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQgLSBjb250YWluZXIuY2xpZW50VG9wO1xuICAgICAgICB2YXIgdWlQb2ludCA9IGNjLnYyKDAsIDApO1xuICAgICAgICBpZiAodmlldy5faXNSb3RhdGVkKSB7XG4gICAgICAgICAgICB1aVBvaW50LnggPSBsZWZ0ICsgZ2xQb2ludC55IC8gdmlldy5fZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgICAgIHVpUG9pbnQueSA9IHRvcCArIGJveC5oZWlnaHQgLSAodmlldy5fdmlld3BvcnRSZWN0LndpZHRoIC0gZ2xQb2ludC54KSAvIHZpZXcuX2RldmljZVBpeGVsUmF0aW87XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB1aVBvaW50LnggPSBsZWZ0ICsgZ2xQb2ludC54ICogdmlldy5fZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgICAgIHVpUG9pbnQueSA9IHRvcCArIGJveC5oZWlnaHQgLSBnbFBvaW50LnkgKiB2aWV3Ll9kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1aVBvaW50O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFbmQgdGhlIGxpZmUgb2YgZGlyZWN0b3IgaW4gdGhlIG5leHQgZnJhbWVcbiAgICAgKiBAbWV0aG9kIGVuZFxuICAgICAqL1xuICAgIGVuZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9wdXJnZURpcmVjdG9ySW5OZXh0TG9vcCA9IHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSBzaXplIG9mIHRoZSBXZWJHTCB2aWV3IGluIHBvaW50cy48YnIvPlxuICAgICAqIEl0IHRha2VzIGludG8gYWNjb3VudCBhbnkgcG9zc2libGUgcm90YXRpb24gKGRldmljZSBvcmllbnRhdGlvbikgb2YgdGhlIHdpbmRvdy5cbiAgICAgKiAhI3poIOiOt+WPluinhuWbvueahOWkp+Wwj++8jOS7peeCueS4uuWNleS9jeOAglxuICAgICAqIEBtZXRob2QgZ2V0V2luU2l6ZVxuICAgICAqIEByZXR1cm4ge1NpemV9XG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqL1xuICAgIGdldFdpblNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLnNpemUoY2Mud2luU2l6ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSBzaXplIG9mIHRoZSBPcGVuR0wgdmlldyBpbiBwaXhlbHMuPGJyLz5cbiAgICAgKiBJdCB0YWtlcyBpbnRvIGFjY291bnQgYW55IHBvc3NpYmxlIHJvdGF0aW9uIChkZXZpY2Ugb3JpZW50YXRpb24pIG9mIHRoZSB3aW5kb3cuPGJyLz5cbiAgICAgKiBPbiBNYWMgd2luU2l6ZSBhbmQgd2luU2l6ZUluUGl4ZWxzIHJldHVybiB0aGUgc2FtZSB2YWx1ZS5cbiAgICAgKiAoVGhlIHBpeGVsIGhlcmUgcmVmZXJzIHRvIHRoZSByZXNvdXJjZSByZXNvbHV0aW9uLiBJZiB5b3Ugd2FudCB0byBnZXQgdGhlIHBoeXNpY3MgcmVzb2x1dGlvbiBvZiBkZXZpY2UsIHlvdSBuZWVkIHRvIHVzZSBjYy52aWV3LmdldEZyYW1lU2l6ZSgpKVxuICAgICAqICEjemhcbiAgICAgKiDojrflj5bop4blm77lpKflsI/vvIzku6Xlg4/ntKDkuLrljZXkvY3vvIjov5nph4znmoTlg4/ntKDmjIfnmoTmmK/otYTmupDliIbovqjnjofjgIJcbiAgICAgKiDlpoLmnpzopoHojrflj5blsY/luZXniannkIbliIbovqjnjofvvIzpnIDopoHnlKggY2Mudmlldy5nZXRGcmFtZVNpemUoKe+8iVxuICAgICAqIEBtZXRob2QgZ2V0V2luU2l6ZUluUGl4ZWxzXG4gICAgICogQHJldHVybiB7U2l6ZX1cbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICovXG4gICAgZ2V0V2luU2l6ZUluUGl4ZWxzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjYy5zaXplKGNjLndpblNpemUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFBhdXNlIHRoZSBkaXJlY3RvcidzIHRpY2tlciwgb25seSBpbnZvbHZlIHRoZSBnYW1lIGxvZ2ljIGV4ZWN1dGlvbi5cbiAgICAgKiBJdCB3b24ndCBwYXVzZSB0aGUgcmVuZGVyaW5nIHByb2Nlc3Mgbm9yIHRoZSBldmVudCBtYW5hZ2VyLlxuICAgICAqIElmIHlvdSB3YW50IHRvIHBhdXNlIHRoZSBlbnRpZXIgZ2FtZSBpbmNsdWRpbmcgcmVuZGVyaW5nLCBhdWRpbyBhbmQgZXZlbnQsIFxuICAgICAqIHBsZWFzZSB1c2Uge3sjY3Jvc3NMaW5rIFwiR2FtZS5wYXVzZVwifX1jYy5nYW1lLnBhdXNle3svY3Jvc3NMaW5rfX1cbiAgICAgKiAhI3poIOaaguWBnOato+WcqOi/kOihjOeahOWcuuaZr++8jOivpeaaguWBnOWPquS8muWBnOatoua4uOaIj+mAu+i+keaJp+ihjO+8jOS9huaYr+S4jeS8muWBnOatoua4suafk+WSjCBVSSDlk43lupTjgIJcbiAgICAgKiDlpoLmnpzmg7PopoHmm7TlvbvlupXlvpfmmoLlgZzmuLjmiI/vvIzljIXlkKvmuLLmn5PvvIzpn7PpopHlkozkuovku7bvvIzor7fkvb/nlKgge3sjY3Jvc3NMaW5rIFwiR2FtZS5wYXVzZVwifX1jYy5nYW1lLnBhdXNle3svY3Jvc3NMaW5rfX3jgIJcbiAgICAgKiBAbWV0aG9kIHBhdXNlXG4gICAgICovXG4gICAgcGF1c2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhdXNlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBjYWNoZWQgYWxsIGNvY29zMmQgY2FjaGVkIGRhdGEuXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqL1xuICAgIHB1cmdlQ2FjaGVkRGF0YTogZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5hc3NldE1hbmFnZXIucmVsZWFzZUFsbCgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQdXJnZSB0aGUgY2MuZGlyZWN0b3IgaXRzZWxmLCBpbmNsdWRpbmcgdW5zY2hlZHVsZSBhbGwgc2NoZWR1bGUsIHJlbW92ZSBhbGwgZXZlbnQgbGlzdGVuZXJzLCBjbGVhbiB1cCBhbmQgZXhpdCB0aGUgcnVubmluZyBzY2VuZSwgc3RvcHMgYWxsIGFuaW1hdGlvbnMsIGNsZWFyIGNhY2hlZCBkYXRhLlxuICAgICAqL1xuICAgIHB1cmdlRGlyZWN0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9jbGVhbnVwIHNjaGVkdWxlclxuICAgICAgICB0aGlzLl9zY2hlZHVsZXIudW5zY2hlZHVsZUFsbCgpO1xuICAgICAgICB0aGlzLl9jb21wU2NoZWR1bGVyLnVuc2NoZWR1bGVBbGwoKTtcblxuICAgICAgICB0aGlzLl9ub2RlQWN0aXZhdG9yLnJlc2V0KCk7XG5cbiAgICAgICAgLy8gRGlzYWJsZSBldmVudCBkaXNwYXRjaGluZ1xuICAgICAgICBpZiAoZXZlbnRNYW5hZ2VyKVxuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLnNldEVuYWJsZWQoZmFsc2UpO1xuXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZCh0aGlzLl9zY2VuZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2VuZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zY2VuZSA9IG51bGw7XG5cbiAgICAgICAgICAgIGNjLnJlbmRlcmVyLmNsZWFyKCk7XG4gICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIuYnVpbHRpbnMuY2xlYXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNjLmdhbWUucGF1c2UoKTtcblxuICAgICAgICAvLyBDbGVhciBhbGwgY2FjaGVzXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5yZWxlYXNlQWxsKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRoZSBjYy5kaXJlY3RvciwgY2FuIGJlIHVzZWQgdG8gcmVzdGFydCB0aGUgZGlyZWN0b3IgYWZ0ZXIgcHVyZ2VcbiAgICAgKi9cbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnB1cmdlRGlyZWN0b3IoKTtcblxuICAgICAgICBpZiAoZXZlbnRNYW5hZ2VyKVxuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLnNldEVuYWJsZWQodHJ1ZSk7XG5cbiAgICAgICAgLy8gQWN0aW9uIG1hbmFnZXJcbiAgICAgICAgaWYgKHRoaXMuX2FjdGlvbk1hbmFnZXIpe1xuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVyLnNjaGVkdWxlVXBkYXRlKHRoaXMuX2FjdGlvbk1hbmFnZXIsIGNjLlNjaGVkdWxlci5QUklPUklUWV9TWVNURU0sIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFuaW1hdGlvbiBtYW5hZ2VyXG4gICAgICAgIGlmICh0aGlzLl9hbmltYXRpb25NYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIuc2NoZWR1bGVVcGRhdGUodGhpcy5fYW5pbWF0aW9uTWFuYWdlciwgY2MuU2NoZWR1bGVyLlBSSU9SSVRZX1NZU1RFTSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29sbGlkZXIgbWFuYWdlclxuICAgICAgICBpZiAodGhpcy5fY29sbGlzaW9uTWFuYWdlcikge1xuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVyLnNjaGVkdWxlVXBkYXRlKHRoaXMuX2NvbGxpc2lvbk1hbmFnZXIsIGNjLlNjaGVkdWxlci5QUklPUklUWV9TWVNURU0sIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBoeXNpY3MgbWFuYWdlclxuICAgICAgICBpZiAodGhpcy5fcGh5c2ljc01hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci5zY2hlZHVsZVVwZGF0ZSh0aGlzLl9waHlzaWNzTWFuYWdlciwgY2MuU2NoZWR1bGVyLlBSSU9SSVRZX1NZU1RFTSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2MuZ2FtZS5yZXN1bWUoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJ1biBhIHNjZW5lLiBSZXBsYWNlcyB0aGUgcnVubmluZyBzY2VuZSB3aXRoIGEgbmV3IG9uZSBvciBlbnRlciB0aGUgZmlyc3Qgc2NlbmUuPGJyLz5cbiAgICAgKiBUaGUgbmV3IHNjZW5lIHdpbGwgYmUgbGF1bmNoZWQgaW1tZWRpYXRlbHkuXG4gICAgICogISN6aCDnq4vliLvliIfmjaLmjIflrprlnLrmma/jgIJcbiAgICAgKiBAbWV0aG9kIHJ1blNjZW5lSW1tZWRpYXRlXG4gICAgICogQHBhcmFtIHtTY2VuZXxTY2VuZUFzc2V0fSBzY2VuZSAtIFRoZSBuZWVkIHJ1biBzY2VuZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25CZWZvcmVMb2FkU2NlbmVdIC0gVGhlIGZ1bmN0aW9uIGludm9rZWQgYXQgdGhlIHNjZW5lIGJlZm9yZSBsb2FkaW5nLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkxhdW5jaGVkXSAtIFRoZSBmdW5jdGlvbiBpbnZva2VkIGF0IHRoZSBzY2VuZSBhZnRlciBsYXVuY2guXG4gICAgICovXG4gICAgcnVuU2NlbmVJbW1lZGlhdGU6IGZ1bmN0aW9uIChzY2VuZSwgb25CZWZvcmVMb2FkU2NlbmUsIG9uTGF1bmNoZWQpIHtcbiAgICAgICAgY2MuYXNzZXJ0SUQoc2NlbmUgaW5zdGFuY2VvZiBjYy5TY2VuZSB8fCBzY2VuZSBpbnN0YW5jZW9mIGNjLlNjZW5lQXNzZXQsIDEyMTYpO1xuXG4gICAgICAgIGlmIChzY2VuZSBpbnN0YW5jZW9mIGNjLlNjZW5lQXNzZXQpIHNjZW5lID0gc2NlbmUuc2NlbmU7XG5cbiAgICAgICAgQ0NfQlVJTEQgJiYgQ0NfREVCVUcgJiYgY29uc29sZS50aW1lKCdJbml0U2NlbmUnKTtcbiAgICAgICAgc2NlbmUuX2xvYWQoKTsgIC8vIGVuc3VyZSBzY2VuZSBpbml0aWFsaXplZFxuICAgICAgICBDQ19CVUlMRCAmJiBDQ19ERUJVRyAmJiBjb25zb2xlLnRpbWVFbmQoJ0luaXRTY2VuZScpO1xuXG4gICAgICAgIC8vIFJlLWF0dGFjaCBvciByZXBsYWNlIHBlcnNpc3Qgbm9kZXNcbiAgICAgICAgQ0NfQlVJTEQgJiYgQ0NfREVCVUcgJiYgY29uc29sZS50aW1lKCdBdHRhY2hQZXJzaXN0Jyk7XG4gICAgICAgIHZhciBwZXJzaXN0Tm9kZUxpc3QgPSBPYmplY3Qua2V5cyhnYW1lLl9wZXJzaXN0Um9vdE5vZGVzKS5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgIHJldHVybiBnYW1lLl9wZXJzaXN0Um9vdE5vZGVzW3hdO1xuICAgICAgICB9KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwZXJzaXN0Tm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gcGVyc2lzdE5vZGVMaXN0W2ldO1xuICAgICAgICAgICAgdmFyIGV4aXN0Tm9kZSA9IHNjZW5lLmdldENoaWxkQnlVdWlkKG5vZGUudXVpZCk7XG4gICAgICAgICAgICBpZiAoZXhpc3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgLy8gc2NlbmUgYWxzbyBjb250YWlucyB0aGUgcGVyc2lzdCBub2RlLCBzZWxlY3QgdGhlIG9sZCBvbmVcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBleGlzdE5vZGUuZ2V0U2libGluZ0luZGV4KCk7XG4gICAgICAgICAgICAgICAgZXhpc3ROb2RlLl9kZXN0cm95SW1tZWRpYXRlKCk7XG4gICAgICAgICAgICAgICAgc2NlbmUuaW5zZXJ0Q2hpbGQobm9kZSwgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBzY2VuZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBDQ19CVUlMRCAmJiBDQ19ERUJVRyAmJiBjb25zb2xlLnRpbWVFbmQoJ0F0dGFjaFBlcnNpc3QnKTtcblxuICAgICAgICB2YXIgb2xkU2NlbmUgPSB0aGlzLl9zY2VuZTtcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIC8vIGF1dG8gcmVsZWFzZSBhc3NldHNcbiAgICAgICAgICAgIENDX0JVSUxEICYmIENDX0RFQlVHICYmIGNvbnNvbGUudGltZSgnQXV0b1JlbGVhc2UnKTtcbiAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5fcmVsZWFzZU1hbmFnZXIuX2F1dG9SZWxlYXNlKG9sZFNjZW5lLCBzY2VuZSwgcGVyc2lzdE5vZGVMaXN0KTtcbiAgICAgICAgICAgIENDX0JVSUxEICYmIENDX0RFQlVHICYmIGNvbnNvbGUudGltZUVuZCgnQXV0b1JlbGVhc2UnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVubG9hZCBzY2VuZVxuICAgICAgICBDQ19CVUlMRCAmJiBDQ19ERUJVRyAmJiBjb25zb2xlLnRpbWUoJ0Rlc3Ryb3knKTtcbiAgICAgICAgaWYgKGNjLmlzVmFsaWQob2xkU2NlbmUpKSB7XG4gICAgICAgICAgICBvbGRTY2VuZS5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zY2VuZSA9IG51bGw7XG5cbiAgICAgICAgLy8gcHVyZ2UgZGVzdHJveWVkIG5vZGVzIGJlbG9uZ3MgdG8gb2xkIHNjZW5lXG4gICAgICAgIE9iai5fZGVmZXJyZWREZXN0cm95KCk7XG4gICAgICAgIENDX0JVSUxEICYmIENDX0RFQlVHICYmIGNvbnNvbGUudGltZUVuZCgnRGVzdHJveScpO1xuXG4gICAgICAgIGlmIChvbkJlZm9yZUxvYWRTY2VuZSkge1xuICAgICAgICAgICAgb25CZWZvcmVMb2FkU2NlbmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVtaXQoY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX1NDRU5FX0xBVU5DSCwgc2NlbmUpO1xuXG4gICAgICAgIC8vIFJ1biBhbiBFbnRpdHkgU2NlbmVcbiAgICAgICAgdGhpcy5fc2NlbmUgPSBzY2VuZTtcblxuICAgICAgICBDQ19CVUlMRCAmJiBDQ19ERUJVRyAmJiBjb25zb2xlLnRpbWUoJ0FjdGl2YXRlJyk7XG4gICAgICAgIHNjZW5lLl9hY3RpdmF0ZSgpO1xuICAgICAgICBDQ19CVUlMRCAmJiBDQ19ERUJVRyAmJiBjb25zb2xlLnRpbWVFbmQoJ0FjdGl2YXRlJyk7XG5cbiAgICAgICAgLy9zdGFydCBzY2VuZVxuICAgICAgICBjYy5nYW1lLnJlc3VtZSgpO1xuXG4gICAgICAgIGlmIChvbkxhdW5jaGVkKSB7XG4gICAgICAgICAgICBvbkxhdW5jaGVkKG51bGwsIHNjZW5lKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVtaXQoY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfU0NFTkVfTEFVTkNILCBzY2VuZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSdW4gYSBzY2VuZS4gUmVwbGFjZXMgdGhlIHJ1bm5pbmcgc2NlbmUgd2l0aCBhIG5ldyBvbmUgb3IgZW50ZXIgdGhlIGZpcnN0IHNjZW5lLlxuICAgICAqIFRoZSBuZXcgc2NlbmUgd2lsbCBiZSBsYXVuY2hlZCBhdCB0aGUgZW5kIG9mIHRoZSBjdXJyZW50IGZyYW1lLlxuICAgICAqICEjemgg6L+Q6KGM5oyH5a6a5Zy65pmv44CCXG4gICAgICogQG1ldGhvZCBydW5TY2VuZVxuICAgICAqIEBwYXJhbSB7U2NlbmV8U2NlbmVBc3NldH0gc2NlbmUgLSBUaGUgbmVlZCBydW4gc2NlbmUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uQmVmb3JlTG9hZFNjZW5lXSAtIFRoZSBmdW5jdGlvbiBpbnZva2VkIGF0IHRoZSBzY2VuZSBiZWZvcmUgbG9hZGluZy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25MYXVuY2hlZF0gLSBUaGUgZnVuY3Rpb24gaW52b2tlZCBhdCB0aGUgc2NlbmUgYWZ0ZXIgbGF1bmNoLlxuICAgICAqL1xuICAgIHJ1blNjZW5lOiBmdW5jdGlvbiAoc2NlbmUsIG9uQmVmb3JlTG9hZFNjZW5lLCBvbkxhdW5jaGVkKSB7XG4gICAgICAgIGNjLmFzc2VydElEKHNjZW5lLCAxMjA1KTtcbiAgICAgICAgY2MuYXNzZXJ0SUQoc2NlbmUgaW5zdGFuY2VvZiBjYy5TY2VuZSB8fCBzY2VuZSBpbnN0YW5jZW9mIGNjLlNjZW5lQXNzZXQsIDEyMTYpO1xuXG4gICAgICAgIGlmIChzY2VuZSBpbnN0YW5jZW9mIGNjLlNjZW5lQXNzZXQpIHNjZW5lID0gc2NlbmUuc2NlbmU7XG4gICAgICAgIC8vIGVuc3VyZSBzY2VuZSBpbml0aWFsaXplZFxuICAgICAgICBzY2VuZS5fbG9hZCgpO1xuXG4gICAgICAgIC8vIERlbGF5IHJ1biAvIHJlcGxhY2Ugc2NlbmUgdG8gdGhlIGVuZCBvZiB0aGUgZnJhbWVcbiAgICAgICAgdGhpcy5vbmNlKGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX0RSQVcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMucnVuU2NlbmVJbW1lZGlhdGUoc2NlbmUsIG9uQmVmb3JlTG9hZFNjZW5lLCBvbkxhdW5jaGVkKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gTG9hZHMgdGhlIHNjZW5lIGJ5IGl0cyBuYW1lLlxuICAgICAqICEjemgg6YCa6L+H5Zy65pmv5ZCN56ew6L+b6KGM5Yqg6L295Zy65pmv44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGxvYWRTY2VuZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzY2VuZU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgc2NlbmUgdG8gbG9hZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25MYXVuY2hlZF0gLSBjYWxsYmFjaywgd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgc2NlbmUgbGF1bmNoZWQuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gaWYgZXJyb3IsIHJldHVybiBmYWxzZVxuICAgICAqL1xuICAgIGxvYWRTY2VuZTogZnVuY3Rpb24gKHNjZW5lTmFtZSwgb25MYXVuY2hlZCwgX29uVW5sb2FkZWQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdTY2VuZSkge1xuICAgICAgICAgICAgY2Mud2FybklEKDEyMDgsIHNjZW5lTmFtZSwgdGhpcy5fbG9hZGluZ1NjZW5lKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYnVuZGxlID0gY2MuYXNzZXRNYW5hZ2VyLmJ1bmRsZXMuZmluZChmdW5jdGlvbiAoYnVuZGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gYnVuZGxlLmdldFNjZW5lSW5mbyhzY2VuZU5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGJ1bmRsZSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KGNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9TQ0VORV9MT0FESU5HLCBzY2VuZU5hbWUpO1xuICAgICAgICAgICAgdGhpcy5fbG9hZGluZ1NjZW5lID0gc2NlbmVOYW1lO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgY29uc29sZS50aW1lKCdMb2FkU2NlbmUgJyArIHNjZW5lTmFtZSk7XG4gICAgICAgICAgICBidW5kbGUubG9hZFNjZW5lKHNjZW5lTmFtZSwgZnVuY3Rpb24gKGVyciwgc2NlbmUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLnRpbWVFbmQoJ0xvYWRTY2VuZSAnICsgc2NlbmVOYW1lKTtcbiAgICAgICAgICAgICAgICBzZWxmLl9sb2FkaW5nU2NlbmUgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGVyciA9ICdGYWlsZWQgdG8gbG9hZCBzY2VuZTogJyArIGVycjtcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgb25MYXVuY2hlZCAmJiBvbkxhdW5jaGVkKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnJ1blNjZW5lSW1tZWRpYXRlKHNjZW5lLCBfb25VbmxvYWRlZCwgb25MYXVuY2hlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMTIwOSwgc2NlbmVOYW1lKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFByZWxvYWRzIHRoZSBzY2VuZSB0byByZWR1Y2VzIGxvYWRpbmcgdGltZS4gWW91IGNhbiBjYWxsIHRoaXMgbWV0aG9kIGF0IGFueSB0aW1lIHlvdSB3YW50LlxuICAgICAqIEFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QsIHlvdSBzdGlsbCBuZWVkIHRvIGxhdW5jaCB0aGUgc2NlbmUgYnkgYGNjLmRpcmVjdG9yLmxvYWRTY2VuZWAuXG4gICAgICogSXQgd2lsbCBiZSB0b3RhbGx5IGZpbmUgdG8gY2FsbCBgY2MuZGlyZWN0b3IubG9hZFNjZW5lYCBhdCBhbnkgdGltZSBldmVuIGlmIHRoZSBwcmVsb2FkaW5nIGlzIG5vdFxuICAgICAqIHlldCBmaW5pc2hlZCwgdGhlIHNjZW5lIHdpbGwgYmUgbGF1bmNoZWQgYWZ0ZXIgbG9hZGVkIGF1dG9tYXRpY2FsbHkuXG4gICAgICogISN6aCDpooTliqDovb3lnLrmma/vvIzkvaDlj6/ku6XlnKjku7vkvZXml7blgJnosIPnlKjov5nkuKrmlrnms5XjgIJcbiAgICAgKiDosIPnlKjlrozlkI7vvIzkvaDku43nhLbpnIDopoHpgJrov4cgYGNjLmRpcmVjdG9yLmxvYWRTY2VuZWAg5p2l5ZCv5Yqo5Zy65pmv77yM5Zug5Li66L+Z5Liq5pa55rOV5LiN5Lya5omn6KGM5Zy65pmv5Yqg6L295pON5L2c44CCXG4gICAgICog5bCx566X6aKE5Yqg6L296L+Y5rKh5a6M5oiQ77yM5L2g5Lmf5Y+v5Lul55u05o6l6LCD55SoIGBjYy5kaXJlY3Rvci5sb2FkU2NlbmVg77yM5Yqg6L295a6M5oiQ5ZCO5Zy65pmv5bCx5Lya5ZCv5Yqo44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHByZWxvYWRTY2VuZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzY2VuZU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgc2NlbmUgdG8gcHJlbG9hZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Qcm9ncmVzc10gLSBjYWxsYmFjaywgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgbG9hZCBwcm9ncmVzc2lvbiBjaGFuZ2UuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MuY29tcGxldGVkQ291bnQgLSBUaGUgbnVtYmVyIG9mIHRoZSBpdGVtcyB0aGF0IGFyZSBhbHJlYWR5IGNvbXBsZXRlZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvblByb2dyZXNzLnRvdGFsQ291bnQgLSBUaGUgdG90YWwgbnVtYmVyIG9mIHRoZSBpdGVtc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvblByb2dyZXNzLml0ZW0gLSBUaGUgbGF0ZXN0IGl0ZW0gd2hpY2ggZmxvdyBvdXQgdGhlIHBpcGVsaW5lXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uTG9hZGVkXSAtIGNhbGxiYWNrLCB3aWxsIGJlIGNhbGxlZCBhZnRlciBzY2VuZSBsb2FkZWQuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Mb2FkZWQuZXJyb3IgLSBudWxsIG9yIHRoZSBlcnJvciBvYmplY3QuXG4gICAgICovXG4gICAgcHJlbG9hZFNjZW5lIChzY2VuZU5hbWUsIG9uUHJvZ3Jlc3MsIG9uTG9hZGVkKSB7XG4gICAgICAgIHZhciBidW5kbGUgPSBjYy5hc3NldE1hbmFnZXIuYnVuZGxlcy5maW5kKGZ1bmN0aW9uIChidW5kbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBidW5kbGUuZ2V0U2NlbmVJbmZvKHNjZW5lTmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYnVuZGxlKSB7XG4gICAgICAgICAgICBidW5kbGUucHJlbG9hZFNjZW5lKHNjZW5lTmFtZSwgbnVsbCwgb25Qcm9ncmVzcywgb25Mb2FkZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgxMjA5LCBzY2VuZU5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJlc3VtZSBnYW1lIGxvZ2ljIGV4ZWN1dGlvbiBhZnRlciBwYXVzZSwgaWYgdGhlIGN1cnJlbnQgc2NlbmUgaXMgbm90IHBhdXNlZCwgbm90aGluZyB3aWxsIGhhcHBlbi5cbiAgICAgKiAhI3poIOaBouWkjeaaguWBnOWcuuaZr+eahOa4uOaIj+mAu+i+ke+8jOWmguaenOW9k+WJjeWcuuaZr+ayoeacieaaguWBnOWwhuayoeS7u+S9leS6i+aDheWPkeeUn+OAglxuICAgICAqIEBtZXRob2QgcmVzdW1lXG4gICAgICovXG4gICAgcmVzdW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fcGF1c2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sYXN0VXBkYXRlID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIGlmICghdGhpcy5fbGFzdFVwZGF0ZSkge1xuICAgICAgICAgICAgY2MubG9nSUQoMTIwMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGVsdGFUaW1lID0gMDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEVuYWJsZXMgb3IgZGlzYWJsZXMgV2ViR0wgZGVwdGggdGVzdC48YnIvPlxuICAgICAqIEltcGxlbWVudGF0aW9uIGNhbiBiZSBmb3VuZCBpbiBDQ0RpcmVjdG9yQ2FudmFzLmpzL0NDRGlyZWN0b3JXZWJHTC5qc1xuICAgICAqICEjemgg5ZCv55SoL+emgeeUqOa3seW6pua1i+ivle+8iOWcqCBDYW52YXMg5riy5p+T5qih5byP5LiL5LiN5Lya55Sf5pWI77yJ44CCXG4gICAgICogQG1ldGhvZCBzZXREZXB0aFRlc3RcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9uXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqL1xuICAgIHNldERlcHRoVGVzdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghY2MuQ2FtZXJhLm1haW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYy5DYW1lcmEubWFpbi5kZXB0aCA9ICEhdmFsdWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXQgY29sb3IgZm9yIGNsZWFyIHNjcmVlbi48YnIvPlxuICAgICAqIChJbXBsZW1lbnRhdGlvbiBjYW4gYmUgZm91bmQgaW4gQ0NEaXJlY3RvckNhbnZhcy5qcy9DQ0RpcmVjdG9yV2ViR0wuanMpXG4gICAgICogISN6aFxuICAgICAqIOiuvue9ruWcuuaZr+eahOm7mOiupOaTpumZpOminOiJsuOAgjxici8+XG4gICAgICog5pSv5oyB5YWo6YCP5piO77yM5L2G5LiN5pSv5oyB6YCP5piO5bqm5Li65Lit6Ze05YC844CC6KaB5pSv5oyB5YWo6YCP5piO6ZyA5omL5bel5byA5ZCvIGNjLm1hY3JvLkVOQUJMRV9UUkFOU1BBUkVOVF9DQU5WQVPjgIJcbiAgICAgKiBAbWV0aG9kIHNldENsZWFyQ29sb3JcbiAgICAgKiBAcGFyYW0ge0NvbG9yfSBjbGVhckNvbG9yXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqL1xuICAgIHNldENsZWFyQ29sb3I6IGZ1bmN0aW9uIChjbGVhckNvbG9yKSB7XG4gICAgICAgIGlmICghY2MuQ2FtZXJhLm1haW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYy5DYW1lcmEubWFpbi5iYWNrZ3JvdW5kQ29sb3IgPSBjbGVhckNvbG9yO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgY3VycmVudCBsb2dpYyBTY2VuZS5cbiAgICAgKiAhI3poIOiOt+WPluW9k+WJjemAu+i+keWcuuaZr+OAglxuICAgICAqIEBtZXRob2QgZ2V0UnVubmluZ1NjZW5lXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcmV0dXJuIHtTY2VuZX1cbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICovXG4gICAgZ2V0UnVubmluZ1NjZW5lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2VuZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIGN1cnJlbnQgbG9naWMgU2NlbmUuXG4gICAgICogISN6aCDojrflj5blvZPliY3pgLvovpHlnLrmma/jgIJcbiAgICAgKiBAbWV0aG9kIGdldFNjZW5lXG4gICAgICogQHJldHVybiB7U2NlbmV9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgLy8gVGhpcyB3aWxsIGhlbHAgeW91IHRvIGdldCB0aGUgQ2FudmFzIG5vZGUgaW4gc2NlbmVcbiAgICAgKiAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnQ2FudmFzJyk7XG4gICAgICovXG4gICAgZ2V0U2NlbmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjZW5lO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIEZQUyB2YWx1ZS4gUGxlYXNlIHVzZSB7eyNjcm9zc0xpbmsgXCJHYW1lLnNldEZyYW1lUmF0ZVwifX1jYy5nYW1lLnNldEZyYW1lUmF0ZXt7L2Nyb3NzTGlua319IHRvIGNvbnRyb2wgYW5pbWF0aW9uIGludGVydmFsLlxuICAgICAqICEjemgg6I635Y+W5Y2V5L2N5bin5omn6KGM5pe26Ze044CC6K+35L2/55SoIHt7I2Nyb3NzTGluayBcIkdhbWUuc2V0RnJhbWVSYXRlXCJ9fWNjLmdhbWUuc2V0RnJhbWVSYXRle3svY3Jvc3NMaW5rfX0g5p2l5o6n5Yi25ri45oiP5bin546H44CCXG4gICAgICogQG1ldGhvZCBnZXRBbmltYXRpb25JbnRlcnZhbFxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0QW5pbWF0aW9uSW50ZXJ2YWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIDEwMDAgLyBnYW1lLmdldEZyYW1lUmF0ZSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFuaW1hdGlvbiBpbnRlcnZhbCwgdGhpcyBkb2Vzbid0IGNvbnRyb2wgdGhlIG1haW4gbG9vcC5cbiAgICAgKiBUbyBjb250cm9sIHRoZSBnYW1lJ3MgZnJhbWUgcmF0ZSBvdmVyYWxsLCBwbGVhc2UgdXNlIHt7I2Nyb3NzTGluayBcIkdhbWUuc2V0RnJhbWVSYXRlXCJ9fWNjLmdhbWUuc2V0RnJhbWVSYXRle3svY3Jvc3NMaW5rfX1cbiAgICAgKiBAbWV0aG9kIHNldEFuaW1hdGlvbkludGVydmFsXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIFRoZSBhbmltYXRpb24gaW50ZXJ2YWwgZGVzaXJlZC5cbiAgICAgKi9cbiAgICBzZXRBbmltYXRpb25JbnRlcnZhbDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGdhbWUuc2V0RnJhbWVSYXRlKE1hdGgucm91bmQoMTAwMCAvIHZhbHVlKSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgZGVsdGEgdGltZSBzaW5jZSBsYXN0IGZyYW1lLlxuICAgICAqICEjemgg6I635Y+W5LiK5LiA5bin55qE5aKe6YeP5pe26Ze044CCXG4gICAgICogQG1ldGhvZCBnZXREZWx0YVRpbWVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0RGVsdGFUaW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWx0YVRpbWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgdG90YWwgcGFzc2VkIHRpbWUgc2luY2UgZ2FtZSBzdGFydCwgdW5pdDogbXNcbiAgICAgKiAhI3poIOiOt+WPluS7jua4uOaIj+W8gOWni+WIsOeOsOWcqOaAu+WFsee7j+i/h+eahOaXtumXtO+8jOWNleS9jeS4uiBtc1xuICAgICAqIEBtZXRob2QgZ2V0VG90YWxUaW1lXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldFRvdGFsVGltZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcGVyZm9ybWFuY2Uubm93KCkgLSB0aGlzLl9zdGFydFRpbWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyBob3cgbWFueSBmcmFtZXMgd2VyZSBjYWxsZWQgc2luY2UgdGhlIGRpcmVjdG9yIHN0YXJ0ZWQuXG4gICAgICogISN6aCDojrflj5YgZGlyZWN0b3Ig5ZCv5Yqo5Lul5p2l5ri45oiP6L+Q6KGM55qE5oC75bin5pWw44CCXG4gICAgICogQG1ldGhvZCBnZXRUb3RhbEZyYW1lc1xuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRUb3RhbEZyYW1lczogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG90YWxGcmFtZXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgRGlyZWN0b3IgaXMgcGF1c2VkLlxuICAgICAqICEjemgg5piv5ZCm5aSE5LqO5pqC5YGc54q25oCB44CCXG4gICAgICogQG1ldGhvZCBpc1BhdXNlZFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNQYXVzZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdXNlZDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBjYy5TY2hlZHVsZXIgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZGlyZWN0b3IuXG4gICAgICogISN6aCDojrflj5blkowgZGlyZWN0b3Ig55u45YWz6IGU55qEIGNjLlNjaGVkdWxlcuOAglxuICAgICAqIEBtZXRob2QgZ2V0U2NoZWR1bGVyXG4gICAgICogQHJldHVybiB7U2NoZWR1bGVyfVxuICAgICAqL1xuICAgIGdldFNjaGVkdWxlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NoZWR1bGVyO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgdGhlIGNjLlNjaGVkdWxlciBhc3NvY2lhdGVkIHdpdGggdGhpcyBkaXJlY3Rvci5cbiAgICAgKiAhI3poIOiuvue9ruWSjCBkaXJlY3RvciDnm7jlhbPogZTnmoQgY2MuU2NoZWR1bGVy44CCXG4gICAgICogQG1ldGhvZCBzZXRTY2hlZHVsZXJcbiAgICAgKiBAcGFyYW0ge1NjaGVkdWxlcn0gc2NoZWR1bGVyXG4gICAgICovXG4gICAgc2V0U2NoZWR1bGVyOiBmdW5jdGlvbiAoc2NoZWR1bGVyKSB7XG4gICAgICAgIGlmICh0aGlzLl9zY2hlZHVsZXIgIT09IHNjaGVkdWxlcikge1xuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgY2MuQWN0aW9uTWFuYWdlciBhc3NvY2lhdGVkIHdpdGggdGhpcyBkaXJlY3Rvci5cbiAgICAgKiAhI3poIOiOt+WPluWSjCBkaXJlY3RvciDnm7jlhbPogZTnmoQgY2MuQWN0aW9uTWFuYWdlcu+8iOWKqOS9nOeuoeeQhuWZqO+8ieOAglxuICAgICAqIEBtZXRob2QgZ2V0QWN0aW9uTWFuYWdlclxuICAgICAqIEByZXR1cm4ge0FjdGlvbk1hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0QWN0aW9uTWFuYWdlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aW9uTWFuYWdlcjtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0cyB0aGUgY2MuQWN0aW9uTWFuYWdlciBhc3NvY2lhdGVkIHdpdGggdGhpcyBkaXJlY3Rvci5cbiAgICAgKiAhI3poIOiuvue9ruWSjCBkaXJlY3RvciDnm7jlhbPogZTnmoQgY2MuQWN0aW9uTWFuYWdlcu+8iOWKqOS9nOeuoeeQhuWZqO+8ieOAglxuICAgICAqIEBtZXRob2Qgc2V0QWN0aW9uTWFuYWdlclxuICAgICAqIEBwYXJhbSB7QWN0aW9uTWFuYWdlcn0gYWN0aW9uTWFuYWdlclxuICAgICAqL1xuICAgIHNldEFjdGlvbk1hbmFnZXI6IGZ1bmN0aW9uIChhY3Rpb25NYW5hZ2VyKSB7XG4gICAgICAgIGlmICh0aGlzLl9hY3Rpb25NYW5hZ2VyICE9PSBhY3Rpb25NYW5hZ2VyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fYWN0aW9uTWFuYWdlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci51bnNjaGVkdWxlVXBkYXRlKHRoaXMuX2FjdGlvbk1hbmFnZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uTWFuYWdlciA9IGFjdGlvbk1hbmFnZXI7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIuc2NoZWR1bGVVcGRhdGUodGhpcy5fYWN0aW9uTWFuYWdlciwgY2MuU2NoZWR1bGVyLlBSSU9SSVRZX1NZU1RFTSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qIFxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgY2MuQW5pbWF0aW9uTWFuYWdlciBhc3NvY2lhdGVkIHdpdGggdGhpcyBkaXJlY3Rvci5cbiAgICAgKiAhI3poIOiOt+WPluWSjCBkaXJlY3RvciDnm7jlhbPogZTnmoQgY2MuQW5pbWF0aW9uTWFuYWdlcu+8iOWKqOeUu+euoeeQhuWZqO+8ieOAglxuICAgICAqIEBtZXRob2QgZ2V0QW5pbWF0aW9uTWFuYWdlclxuICAgICAqIEByZXR1cm4ge0FuaW1hdGlvbk1hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0QW5pbWF0aW9uTWFuYWdlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5pbWF0aW9uTWFuYWdlcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBjYy5Db2xsaXNpb25NYW5hZ2VyIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGRpcmVjdG9yLlxuICAgICAqICEjemgg6I635Y+W5ZKMIGRpcmVjdG9yIOebuOWFs+iBlOeahCBjYy5Db2xsaXNpb25NYW5hZ2VyIO+8iOeisOaSnueuoeeQhuWZqO+8ieOAglxuICAgICAqIEBtZXRob2QgZ2V0Q29sbGlzaW9uTWFuYWdlclxuICAgICAqIEByZXR1cm4ge0NvbGxpc2lvbk1hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0Q29sbGlzaW9uTWFuYWdlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sbGlzaW9uTWFuYWdlcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBjYy5QaHlzaWNzTWFuYWdlciBhc3NvY2lhdGVkIHdpdGggdGhpcyBkaXJlY3Rvci5cbiAgICAgKiAhI3poIOi/lOWbnuS4jiBkaXJlY3RvciDnm7jlhbPogZTnmoQgY2MuUGh5c2ljc01hbmFnZXIg77yI54mp55CG566h55CG5Zmo77yJ44CCXG4gICAgICogQG1ldGhvZCBnZXRQaHlzaWNzTWFuYWdlclxuICAgICAqIEByZXR1cm4ge1BoeXNpY3NNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldFBoeXNpY3NNYW5hZ2VyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9waHlzaWNzTWFuYWdlcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBjYy5QaHlzaWNzM0RNYW5hZ2VyIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGRpcmVjdG9yLlxuICAgICAqICEjemgg6L+U5Zue5LiOIGRpcmVjdG9yIOebuOWFs+iBlOeahCBjYy5QaHlzaWNzM0RNYW5hZ2VyIO+8iOeJqeeQhueuoeeQhuWZqO+8ieOAglxuICAgICAqIEBtZXRob2QgZ2V0UGh5c2ljczNETWFuYWdlclxuICAgICAqIEByZXR1cm4ge1BoeXNpY3MzRE1hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0UGh5c2ljczNETWFuYWdlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGh5c2ljczNETWFuYWdlcjtcbiAgICB9LFxuXG4gICAgLy8gTG9vcCBtYW5hZ2VtZW50XG4gICAgLypcbiAgICAgKiBTdGFydHMgQW5pbWF0aW9uXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMS4yXG4gICAgICovXG4gICAgc3RhcnRBbmltYXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZ2FtZS5yZXN1bWUoKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBTdG9wcyBhbmltYXRpb25cbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4xLjJcbiAgICAgKi9cbiAgICBzdG9wQW5pbWF0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmdhbWUucGF1c2UoKTtcbiAgICB9LFxuXG4gICAgX3Jlc2V0RGVsdGFUaW1lICgpIHtcbiAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICB0aGlzLl9kZWx0YVRpbWUgPSAwO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIFJ1biBtYWluIGxvb3Agb2YgZGlyZWN0b3JcbiAgICAgKi9cbiAgICBtYWluTG9vcDogQ0NfRURJVE9SID8gZnVuY3Rpb24gKGRlbHRhVGltZSwgdXBkYXRlQW5pbWF0ZSkge1xuICAgICAgICB0aGlzLl9kZWx0YVRpbWUgPSBkZWx0YVRpbWU7XG5cbiAgICAgICAgLy8gVXBkYXRlXG4gICAgICAgIGlmICghdGhpcy5fcGF1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX1VQREFURSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBTY2hlZHVsZXIuc3RhcnRQaGFzZSgpO1xuICAgICAgICAgICAgdGhpcy5fY29tcFNjaGVkdWxlci51cGRhdGVQaGFzZShkZWx0YVRpbWUpO1xuXG4gICAgICAgICAgICBpZiAodXBkYXRlQW5pbWF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci51cGRhdGUoZGVsdGFUaW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fY29tcFNjaGVkdWxlci5sYXRlVXBkYXRlUGhhc2UoZGVsdGFUaW1lKTtcblxuICAgICAgICAgICAgdGhpcy5lbWl0KGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1VQREFURSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW5kZXJcbiAgICAgICAgdGhpcy5lbWl0KGNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9EUkFXKTtcbiAgICAgICAgcmVuZGVyZXIucmVuZGVyKHRoaXMuX3NjZW5lLCBkZWx0YVRpbWUpO1xuICAgICAgICBcbiAgICAgICAgLy8gQWZ0ZXIgZHJhd1xuICAgICAgICB0aGlzLmVtaXQoY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfRFJBVyk7XG5cbiAgICAgICAgdGhpcy5fdG90YWxGcmFtZXMrKztcblxuICAgIH0gOiBmdW5jdGlvbiAobm93KSB7XG4gICAgICAgIGlmICh0aGlzLl9wdXJnZURpcmVjdG9ySW5OZXh0TG9vcCkge1xuICAgICAgICAgICAgdGhpcy5fcHVyZ2VEaXJlY3RvckluTmV4dExvb3AgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucHVyZ2VEaXJlY3RvcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIFwiZ2xvYmFsXCIgZHRcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlRGVsdGFUaW1lKG5vdyk7XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZVxuICAgICAgICAgICAgaWYgKCF0aGlzLl9wYXVzZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBiZWZvcmUgdXBkYXRlXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KGNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9VUERBVEUpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2FsbCBzdGFydCBmb3IgbmV3IGFkZGVkIGNvbXBvbmVudHNcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wU2NoZWR1bGVyLnN0YXJ0UGhhc2UoKTtcblxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBmb3IgY29tcG9uZW50c1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBTY2hlZHVsZXIudXBkYXRlUGhhc2UodGhpcy5fZGVsdGFUaW1lKTtcbiAgICAgICAgICAgICAgICAvLyBFbmdpbmUgdXBkYXRlIHdpdGggc2NoZWR1bGVyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVyLnVwZGF0ZSh0aGlzLl9kZWx0YVRpbWUpO1xuXG4gICAgICAgICAgICAgICAgLy8gTGF0ZSB1cGRhdGUgZm9yIGNvbXBvbmVudHNcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wU2NoZWR1bGVyLmxhdGVVcGRhdGVQaGFzZSh0aGlzLl9kZWx0YVRpbWUpO1xuXG4gICAgICAgICAgICAgICAgLy8gVXNlciBjYW4gdXNlIHRoaXMgZXZlbnQgdG8gZG8gdGhpbmdzIGFmdGVyIHVwZGF0ZVxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9VUERBVEUpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIERlc3Ryb3kgZW50aXRpZXMgdGhhdCBoYXZlIGJlZW4gcmVtb3ZlZCByZWNlbnRseVxuICAgICAgICAgICAgICAgIE9iai5fZGVmZXJyZWREZXN0cm95KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlbmRlclxuICAgICAgICAgICAgdGhpcy5lbWl0KGNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9EUkFXKTtcbiAgICAgICAgICAgIHJlbmRlcmVyLnJlbmRlcih0aGlzLl9zY2VuZSwgdGhpcy5fZGVsdGFUaW1lKTtcblxuICAgICAgICAgICAgLy8gQWZ0ZXIgZHJhd1xuICAgICAgICAgICAgdGhpcy5lbWl0KGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX0RSQVcpO1xuXG4gICAgICAgICAgICBldmVudE1hbmFnZXIuZnJhbWVVcGRhdGVMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIHRoaXMuX3RvdGFsRnJhbWVzKys7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX19mYXN0T246IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMub24odHlwZSwgY2FsbGJhY2ssIHRhcmdldCk7XG4gICAgfSxcblxuICAgIF9fZmFzdE9mZjogZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5vZmYodHlwZSwgY2FsbGJhY2ssIHRhcmdldCk7XG4gICAgfSxcbn07XG5cbi8vIEV2ZW50IHRhcmdldFxuY2MuanMuYWRkb24oY2MuRGlyZWN0b3IucHJvdG90eXBlLCBFdmVudFRhcmdldC5wcm90b3R5cGUpO1xuXG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IHByb2plY3Rpb24gY2hhbmdlZCBvZiBjYy5EaXJlY3Rvci4gVGhpcyBldmVudCB3aWxsIG5vdCBnZXQgdHJpZ2dlcmVkIHNpbmNlIHYyLjBcbiAqICEjemggY2MuRGlyZWN0b3Ig5oqV5b2x5Y+Y5YyW55qE5LqL5Lu244CC5LuOIHYyLjAg5byA5aeL6L+Z5Liq5LqL5Lu25LiN5Lya5YaN6KKr6Kem5Y+RXG4gKiBAcHJvcGVydHkge1N0cmluZ30gRVZFTlRfUFJPSkVDVElPTl9DSEFOR0VEXG4gKiBAcmVhZG9ubHlcbiAqIEBzdGF0aWNcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAqL1xuY2MuRGlyZWN0b3IuRVZFTlRfUFJPSkVDVElPTl9DSEFOR0VEID0gXCJkaXJlY3Rvcl9wcm9qZWN0aW9uX2NoYW5nZWRcIjtcblxuLyoqXG4gKiAhI2VuIFRoZSBldmVudCB3aGljaCB3aWxsIGJlIHRyaWdnZXJlZCBiZWZvcmUgbG9hZGluZyBhIG5ldyBzY2VuZS5cbiAqICEjemgg5Yqg6L295paw5Zy65pmv5LmL5YmN5omA6Kem5Y+R55qE5LqL5Lu244CCXG4gKiBAZXZlbnQgY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX1NDRU5FX0xPQURJTkdcbiAqIEBwYXJhbSB7U3RyaW5nfSBzY2VuZU5hbWUgLSBUaGUgbG9hZGluZyBzY2VuZSBuYW1lXG4gKi9cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgd2hpY2ggd2lsbCBiZSB0cmlnZ2VyZWQgYmVmb3JlIGxvYWRpbmcgYSBuZXcgc2NlbmUuXG4gKiAhI3poIOWKoOi9veaWsOWcuuaZr+S5i+WJjeaJgOinpuWPkeeahOS6i+S7tuOAglxuICogQHByb3BlcnR5IHtTdHJpbmd9IEVWRU5UX0JFRk9SRV9TQ0VORV9MT0FESU5HXG4gKiBAcmVhZG9ubHlcbiAqIEBzdGF0aWNcbiAqL1xuY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX1NDRU5FX0xPQURJTkcgPSBcImRpcmVjdG9yX2JlZm9yZV9zY2VuZV9sb2FkaW5nXCI7XG5cbi8qXG4gKiAhI2VuIFRoZSBldmVudCB3aGljaCB3aWxsIGJlIHRyaWdnZXJlZCBiZWZvcmUgbGF1bmNoaW5nIGEgbmV3IHNjZW5lLlxuICogISN6aCDov5DooYzmlrDlnLrmma/kuYvliY3miYDop6blj5HnmoTkuovku7bjgIJcbiAqIEBldmVudCBjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfU0NFTkVfTEFVTkNIXG4gKiBAcGFyYW0ge1N0cmluZ30gc2NlbmVOYW1lIC0gTmV3IHNjZW5lIHdoaWNoIHdpbGwgYmUgbGF1bmNoZWRcbiAqL1xuLyoqXG4gKiAhI2VuIFRoZSBldmVudCB3aGljaCB3aWxsIGJlIHRyaWdnZXJlZCBiZWZvcmUgbGF1bmNoaW5nIGEgbmV3IHNjZW5lLlxuICogISN6aCDov5DooYzmlrDlnLrmma/kuYvliY3miYDop6blj5HnmoTkuovku7bjgIJcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBFVkVOVF9CRUZPUkVfU0NFTkVfTEFVTkNIXG4gKiBAcmVhZG9ubHlcbiAqIEBzdGF0aWNcbiAqL1xuY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX1NDRU5FX0xBVU5DSCA9IFwiZGlyZWN0b3JfYmVmb3JlX3NjZW5lX2xhdW5jaFwiO1xuXG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IHdoaWNoIHdpbGwgYmUgdHJpZ2dlcmVkIGFmdGVyIGxhdW5jaGluZyBhIG5ldyBzY2VuZS5cbiAqICEjemgg6L+Q6KGM5paw5Zy65pmv5LmL5ZCO5omA6Kem5Y+R55qE5LqL5Lu244CCXG4gKiBAZXZlbnQgY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfU0NFTkVfTEFVTkNIXG4gKiBAcGFyYW0ge1N0cmluZ30gc2NlbmVOYW1lIC0gTmV3IHNjZW5lIHdoaWNoIGlzIGxhdW5jaGVkXG4gKi9cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgd2hpY2ggd2lsbCBiZSB0cmlnZ2VyZWQgYWZ0ZXIgbGF1bmNoaW5nIGEgbmV3IHNjZW5lLlxuICogISN6aCDov5DooYzmlrDlnLrmma/kuYvlkI7miYDop6blj5HnmoTkuovku7bjgIJcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBFVkVOVF9BRlRFUl9TQ0VORV9MQVVOQ0hcbiAqIEByZWFkb25seVxuICogQHN0YXRpY1xuICovXG5jYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9TQ0VORV9MQVVOQ0ggPSBcImRpcmVjdG9yX2FmdGVyX3NjZW5lX2xhdW5jaFwiO1xuXG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IHdoaWNoIHdpbGwgYmUgdHJpZ2dlcmVkIGF0IHRoZSBiZWdpbm5pbmcgb2YgZXZlcnkgZnJhbWUuXG4gKiAhI3poIOavj+S4quW4p+eahOW8gOWni+aXtuaJgOinpuWPkeeahOS6i+S7tuOAglxuICogQGV2ZW50IGNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9VUERBVEVcbiAqL1xuLyoqXG4gKiAhI2VuIFRoZSBldmVudCB3aGljaCB3aWxsIGJlIHRyaWdnZXJlZCBhdCB0aGUgYmVnaW5uaW5nIG9mIGV2ZXJ5IGZyYW1lLlxuICogISN6aCDmr4/kuKrluKfnmoTlvIDlp4vml7bmiYDop6blj5HnmoTkuovku7bjgIJcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBFVkVOVF9CRUZPUkVfVVBEQVRFXG4gKiBAcmVhZG9ubHlcbiAqIEBzdGF0aWNcbiAqL1xuY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX1VQREFURSA9IFwiZGlyZWN0b3JfYmVmb3JlX3VwZGF0ZVwiO1xuXG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IHdoaWNoIHdpbGwgYmUgdHJpZ2dlcmVkIGFmdGVyIGVuZ2luZSBhbmQgY29tcG9uZW50cyB1cGRhdGUgbG9naWMuXG4gKiAhI3poIOWwhuWcqOW8leaTjuWSjOe7hOS7tiDigJx1cGRhdGXigJ0g6YC76L6R5LmL5ZCO5omA6Kem5Y+R55qE5LqL5Lu244CCXG4gKiBAZXZlbnQgY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfVVBEQVRFXG4gKi9cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgd2hpY2ggd2lsbCBiZSB0cmlnZ2VyZWQgYWZ0ZXIgZW5naW5lIGFuZCBjb21wb25lbnRzIHVwZGF0ZSBsb2dpYy5cbiAqICEjemgg5bCG5Zyo5byV5pOO5ZKM57uE5Lu2IOKAnHVwZGF0ZeKAnSDpgLvovpHkuYvlkI7miYDop6blj5HnmoTkuovku7bjgIJcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBFVkVOVF9BRlRFUl9VUERBVEVcbiAqIEByZWFkb25seVxuICogQHN0YXRpY1xuICovXG5jYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9VUERBVEUgPSBcImRpcmVjdG9yX2FmdGVyX3VwZGF0ZVwiO1xuXG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IGlzIGRlcHJlY2F0ZWQgc2luY2UgdjIuMCwgcGxlYXNlIHVzZSBjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfRFJBVyBpbnN0ZWFkXG4gKiAhI3poIOi/meS4quS6i+S7tuS7jiB2Mi4wIOW8gOWni+iiq+W6n+W8g++8jOivt+ebtOaOpeS9v+eUqCBjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfRFJBV1xuICogQHByb3BlcnR5IHtTdHJpbmd9IEVWRU5UX0JFRk9SRV9WSVNJVFxuICogQHJlYWRvbmx5XG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gKiBAc3RhdGljXG4gKi9cbmNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9WSVNJVCA9IFwiZGlyZWN0b3JfYmVmb3JlX2RyYXdcIjtcblxuLyoqXG4gKiAhI2VuIFRoZSBldmVudCBpcyBkZXByZWNhdGVkIHNpbmNlIHYyLjAsIHBsZWFzZSB1c2UgY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX0RSQVcgaW5zdGVhZFxuICogISN6aCDov5nkuKrkuovku7bku44gdjIuMCDlvIDlp4vooqvlup/lvIPvvIzor7fnm7TmjqXkvb/nlKggY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX0RSQVdcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBFVkVOVF9BRlRFUl9WSVNJVFxuICogQHJlYWRvbmx5XG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gKiBAc3RhdGljXG4gKi9cbmNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1ZJU0lUID0gXCJkaXJlY3Rvcl9iZWZvcmVfZHJhd1wiO1xuXG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IHdoaWNoIHdpbGwgYmUgdHJpZ2dlcmVkIGJlZm9yZSB0aGUgcmVuZGVyaW5nIHByb2Nlc3MuXG4gKiAhI3poIOa4suafk+i/h+eoi+S5i+WJjeaJgOinpuWPkeeahOS6i+S7tuOAglxuICogQGV2ZW50IGNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9EUkFXXG4gKi9cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgd2hpY2ggd2lsbCBiZSB0cmlnZ2VyZWQgYmVmb3JlIHRoZSByZW5kZXJpbmcgcHJvY2Vzcy5cbiAqICEjemgg5riy5p+T6L+H56iL5LmL5YmN5omA6Kem5Y+R55qE5LqL5Lu244CCXG4gKiBAcHJvcGVydHkge1N0cmluZ30gRVZFTlRfQkVGT1JFX0RSQVdcbiAqIEByZWFkb25seVxuICogQHN0YXRpY1xuICovXG5jYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfRFJBVyA9IFwiZGlyZWN0b3JfYmVmb3JlX2RyYXdcIjtcblxuLyoqXG4gKiAhI2VuIFRoZSBldmVudCB3aGljaCB3aWxsIGJlIHRyaWdnZXJlZCBhZnRlciB0aGUgcmVuZGVyaW5nIHByb2Nlc3MuXG4gKiAhI3poIOa4suafk+i/h+eoi+S5i+WQjuaJgOinpuWPkeeahOS6i+S7tuOAglxuICogQGV2ZW50IGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX0RSQVdcbiAqL1xuLyoqXG4gKiAhI2VuIFRoZSBldmVudCB3aGljaCB3aWxsIGJlIHRyaWdnZXJlZCBhZnRlciB0aGUgcmVuZGVyaW5nIHByb2Nlc3MuXG4gKiAhI3poIOa4suafk+i/h+eoi+S5i+WQjuaJgOinpuWPkeeahOS6i+S7tuOAglxuICogQHByb3BlcnR5IHtTdHJpbmd9IEVWRU5UX0FGVEVSX0RSQVdcbiAqIEByZWFkb25seVxuICogQHN0YXRpY1xuICovXG5jYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9EUkFXID0gXCJkaXJlY3Rvcl9hZnRlcl9kcmF3XCI7XG5cbi8vUG9zc2libGUgT3BlbkdMIHByb2plY3Rpb25zIHVzZWQgYnkgZGlyZWN0b3JcblxuLyoqXG4gKiBDb25zdGFudCBmb3IgMkQgcHJvamVjdGlvbiAob3J0aG9nb25hbCBwcm9qZWN0aW9uKVxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFBST0pFQ1RJT05fMkRcbiAqIEBkZWZhdWx0IDBcbiAqIEByZWFkb25seVxuICogQHN0YXRpY1xuICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICovXG5jYy5EaXJlY3Rvci5QUk9KRUNUSU9OXzJEID0gMDtcblxuLyoqXG4gKiBDb25zdGFudCBmb3IgM0QgcHJvamVjdGlvbiB3aXRoIGEgZm92eT02MCwgem5lYXI9MC41ZiBhbmQgemZhcj0xNTAwLlxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFBST0pFQ1RJT05fM0RcbiAqIEBkZWZhdWx0IDFcbiAqIEByZWFkb25seVxuICogQHN0YXRpY1xuICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICovXG5jYy5EaXJlY3Rvci5QUk9KRUNUSU9OXzNEID0gMTtcblxuLyoqXG4gKiBDb25zdGFudCBmb3IgY3VzdG9tIHByb2plY3Rpb24sIGlmIGNjLkRpcmVjdG9yJ3MgcHJvamVjdGlvbiBzZXQgdG8gaXQsIGl0IGNhbGxzIFwidXBkYXRlUHJvamVjdGlvblwiIG9uIHRoZSBwcm9qZWN0aW9uIGRlbGVnYXRlLlxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFBST0pFQ1RJT05fQ1VTVE9NXG4gKiBAZGVmYXVsdCAzXG4gKiBAcmVhZG9ubHlcbiAqIEBzdGF0aWNcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAqL1xuY2MuRGlyZWN0b3IuUFJPSkVDVElPTl9DVVNUT00gPSAzO1xuXG4vKipcbiAqIENvbnN0YW50IGZvciBkZWZhdWx0IHByb2plY3Rpb24gb2YgY2MuRGlyZWN0b3IsIGRlZmF1bHQgcHJvamVjdGlvbiBpcyAyRCBwcm9qZWN0aW9uXG4gKiBAcHJvcGVydHkge051bWJlcn0gUFJPSkVDVElPTl9ERUZBVUxUXG4gKiBAZGVmYXVsdCBjYy5EaXJlY3Rvci5QUk9KRUNUSU9OXzJEXG4gKiBAcmVhZG9ubHlcbiAqIEBzdGF0aWNcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAqL1xuY2MuRGlyZWN0b3IuUFJPSkVDVElPTl9ERUZBVUxUID0gY2MuRGlyZWN0b3IuUFJPSkVDVElPTl8yRDtcblxuLyoqXG4gKiBUaGUgZXZlbnQgd2hpY2ggd2lsbCBiZSB0cmlnZ2VyZWQgYmVmb3JlIHRoZSBwaHlzaWNzIHByb2Nlc3MuPGJyLz5cbiAqIOeJqeeQhui/h+eoi+S5i+WJjeaJgOinpuWPkeeahOS6i+S7tuOAglxuICogQGV2ZW50IERpcmVjdG9yLkVWRU5UX0JFRk9SRV9QSFlTSUNTXG4gKiBAcmVhZG9ubHlcbiAqL1xuY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX1BIWVNJQ1MgPSAnZGlyZWN0b3JfYmVmb3JlX3BoeXNpY3MnO1xuXG4vKipcbiAqIFRoZSBldmVudCB3aGljaCB3aWxsIGJlIHRyaWdnZXJlZCBhZnRlciB0aGUgcGh5c2ljcyBwcm9jZXNzLjxici8+XG4gKiDniannkIbov4fnqIvkuYvlkI7miYDop6blj5HnmoTkuovku7bjgIJcbiAqIEBldmVudCBEaXJlY3Rvci5FVkVOVF9BRlRFUl9QSFlTSUNTXG4gKiBAcmVhZG9ubHlcbiAqL1xuY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfUEhZU0lDUyA9ICdkaXJlY3Rvcl9hZnRlcl9waHlzaWNzJztcblxuLyoqXG4gKiBAbW9kdWxlIGNjXG4gKi9cblxuLyoqXG4gKiAhI2VuIERpcmVjdG9yXG4gKiAhI3poIOWvvOa8lOexu+OAglxuICogQHByb3BlcnR5IGRpcmVjdG9yXG4gKiBAdHlwZSB7RGlyZWN0b3J9XG4gKi9cbmNjLmRpcmVjdG9yID0gbmV3IGNjLkRpcmVjdG9yKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2MuZGlyZWN0b3I7Il0sInNvdXJjZVJvb3QiOiIvIn0=