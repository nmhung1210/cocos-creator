
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/bundle.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

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
var Config = require('./config');

var releaseManager = require('./releaseManager');

var _require = require('./utilities'),
    parseParameters = _require.parseParameters,
    parseLoadResArgs = _require.parseLoadResArgs;

var _require2 = require('./shared'),
    RequestType = _require2.RequestType,
    assets = _require2.assets,
    bundles = _require2.bundles;
/**
 * @module cc.AssetManager
 */

/**
 * !#en
 * A bundle contains an amount of assets(includes scene), you can load, preload, release asset which is in this bundle
 * 
 * !#zh
 * 一个包含一定数量资源（包括场景）的包，你可以加载，预加载，释放此包内的资源
 * 
 * @class Bundle
 */


function Bundle() {
  this._config = new Config();
}

Bundle.prototype = {
  /**
   * !#en
   * Create a bundle
   * 
   * !#zh
   * 创建一个 bundle
   * 
   * @method constructor
   * 
   * @typescript
   * constructor()
   */
  constructor: Bundle,

  /**
   * !#en
   * The name of this bundle
   * 
   * !#zh
   * 此 bundle 的名称
   * 
   * @property name
   * @type {string}
   */
  get name() {
    return this._config.name;
  },

  /**
   * !#en
   * The dependency of this bundle
   * 
   * !#zh
   * 此 bundle 的依赖
   * 
   * @property deps
   * @type {string[]}
   */
  get deps() {
    return this._config.deps;
  },

  /**
   * !#en
   * The root path of this bundle, such like 'http://example.com/bundle1'
   * 
   * !#zh
   * 此 bundle 的根路径, 例如 'http://example.com/bundle1'
   * 
   * @property base
   * @type {string}
   */
  get base() {
    return this._config.base;
  },

  /**
   * !#en
   * Get asset's info using path, only valid when asset is in bundle folder.
   *  
   * !#zh
   * 使用 path 获取资源的配置信息
   * 
   * @method getInfoWithPath
   * @param {string} path - The relative path of asset, such as 'images/a'
   * @param {Function} [type] - The constructor of asset, such as  `cc.Texture2D`
   * @returns {Object} The asset info 
   * 
   * @example
   * var info = bundle.getInfoWithPath('image/a', cc.Texture2D);
   * 
   * @typescript
   * getInfoWithPath (path: string, type?: typeof cc.Asset): Record<string, any>
   */
  getInfoWithPath: function getInfoWithPath(path, type) {
    return this._config.getInfoWithPath(path, type);
  },

  /**
   * !#en
   * Get all asset's info within specific folder
   * 
   * !#zh
   * 获取在某个指定文件夹下的所有资源信息
   * 
   * @method getDirWithPath
   * @param {string} path - The relative path of folder, such as 'images'
   * @param {Function} [type] - The constructor should be used to filter paths
   * @param {Array} [out] - The output array
   * @returns {Object[]} Infos
   * 
   * @example 
   * var infos = [];
   * bundle.getDirWithPath('images', cc.Texture2D, infos);
   * 
   * @typescript
   * getDirWithPath (path: string, type: typeof cc.Asset, out: Array<Record<string, any>>): Array<Record<string, any>>
   * getDirWithPath (path: string, type: typeof cc.Asset): Array<Record<string, any>>
   * getDirWithPath (path: string): Array<Record<string, any>>
   */
  getDirWithPath: function getDirWithPath(path, type, out) {
    return this._config.getDirWithPath(path, type, out);
  },

  /**
   * !#en
   * Get asset's info with uuid
   * 
   * !#zh
   * 通过 uuid 获取资源信息
   * 
   * @method getAssetInfo
   * @param {string} uuid - The asset's uuid
   * @returns {Object} info 
   * 
   * @example
   * var info = bundle.getAssetInfo('fcmR3XADNLgJ1ByKhqcC5Z');
   * 
   * @typescript
   * getAssetInfo (uuid: string): Record<string, any>
   */
  getAssetInfo: function getAssetInfo(uuid) {
    return this._config.getAssetInfo(uuid);
  },

  /**
   * !#en
   * Get scene'info with name
   * 
   * !#zh
   * 通过场景名获取场景信息
   * 
   * @method getSceneInfo
   * @param {string} name - The name of scene
   * @return {Object} info
   * 
   * @example
   * var info = bundle.getSceneInfo('first.fire');
   * 
   * @typescript
   * getSceneInfo(name: string): Record<string, any>
   */
  getSceneInfo: function getSceneInfo(name) {
    return this._config.getSceneInfo(name);
  },

  /**
   * !#en
   * Initialize this bundle with options
   * 
   * !#zh
   * 初始化此 bundle
   * 
   * @method init
   * @param {Object} options 
   * 
   * @typescript
   * init(options: Record<string, any>): void
   */
  init: function init(options) {
    this._config.init(options);

    bundles.add(options.name, this);
  },

  /**
   * !#en
   * Load the asset within this bundle by the path which is relative to bundle's path
   * 
   * !#zh
   * 通过相对路径加载分包中的资源。路径是相对分包文件夹路径的相对路径
   *
   * @method load
   * @param {String|String[]} paths - Paths of the target assets.The path is relative to the bundle's folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be loaded if this argument is supplied.
   * @param {Function} [onProgress] - Callback invoked when progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed.
   * @param {Number} onProgress.total - The total number of the items.
   * @param {RequestItem} onProgress.item - The finished request item.
   * @param {Function} [onComplete] - Callback invoked when all assets loaded.
   * @param {Error} onComplete.error - The error info or null if loaded successfully.
   * @param {Asset|Asset[]} onComplete.assets - The loaded assets.
   *
   * @example
   * // load the texture (${project}/assets/resources/textures/background.jpg) from resources
   * cc.resources.load('textures/background', cc.Texture2D, (err, texture) => console.log(err));
   * 
   * // load the audio (${project}/assets/resources/music/hit.mp3) from resources
   * cc.resources.load('music/hit', cc.AudioClip, (err, audio) => console.log(err));
   * 
   * // load the prefab (${project}/assets/bundle1/misc/character/cocos) from bundle1 folder
   * bundle1.load('misc/character/cocos', cc.Prefab, (err, prefab) => console.log(err));
   *
   * // load the sprite frame (${project}/assets/some/xxx/bundle2/imgs/cocos.png) from bundle2 folder
   * bundle2.load('imgs/cocos', cc.SpriteFrame, null, (err, spriteFrame) => console.log(err));
   * 
   * @typescript
   * load<T extends cc.Asset>(paths: string|string[], type: typeof cc.Asset, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, assets: T|Array<T>) => void): void
   * load<T extends cc.Asset>(paths: string|string[], onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, assets: T|Array<T>) => void): void
   * load<T extends cc.Asset>(paths: string|string[], type: typeof cc.Asset, onComplete: (error: Error, assets: T|Array<T>) => void): void
   * load<T extends cc.Asset>(paths: string|string[], onComplete: (error: Error, assets: T|Array<T>) => void): void
   * load<T extends cc.Asset>(paths: string|string[], type: typeof cc.Asset): void
   * load<T extends cc.Asset>(paths: string|string[]): void
   */
  load: function load(paths, type, onProgress, onComplete) {
    var _parseLoadResArgs = parseLoadResArgs(type, onProgress, onComplete),
        type = _parseLoadResArgs.type,
        onProgress = _parseLoadResArgs.onProgress,
        onComplete = _parseLoadResArgs.onComplete;

    cc.assetManager.loadAny(paths, {
      __requestType__: RequestType.PATH,
      type: type,
      bundle: this.name
    }, onProgress, onComplete);
  },

  /**
   * !#en
   * Preload the asset within this bundle by the path which is relative to bundle's path. 
   * After calling this method, you still need to finish loading by calling `Bundle.load`.
   * It will be totally fine to call `Bundle.load` at any time even if the preloading is not
   * yet finished
   * 
   * !#zh
   * 通过相对路径预加载分包中的资源。路径是相对分包文件夹路径的相对路径。调用完后，你仍然需要通过 `Bundle.load` 来完成加载。
   * 就算预加载还没完成，你也可以直接调用 `Bundle.load`。
   *
   * @method preload
   * @param {String|String[]} paths - Paths of the target asset.The path is relative to bundle folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be loaded if this argument is supplied.
   * @param {Function} [onProgress] - Callback invoked when progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed.
   * @param {Number} onProgress.total - The total number of the items.
   * @param {RequestItem} onProgress.item - The finished request item.
   * @param {Function} [onComplete] - Callback invoked when the resource loaded.
   * @param {Error} onComplete.error - The error info or null if loaded successfully.
   * @param {RequestItem[]} onComplete.items - The preloaded items.
   * 
   * @example
   * // preload the texture (${project}/assets/resources/textures/background.jpg) from resources
   * cc.resources.preload('textures/background', cc.Texture2D);
   * 
   * // preload the audio (${project}/assets/resources/music/hit.mp3) from resources
   * cc.resources.preload('music/hit', cc.AudioClip);
   * // wait for while
   * cc.resources.load('music/hit', cc.AudioClip, (err, audioClip) => {});
   * 
   * * // preload the prefab (${project}/assets/bundle1/misc/character/cocos) from bundle1 folder
   * bundle1.preload('misc/character/cocos', cc.Prefab);
   *
   * // load the sprite frame of (${project}/assets/bundle2/imgs/cocos.png) from bundle2 folder
   * bundle2.preload('imgs/cocos', cc.SpriteFrame);
   * // wait for while
   * bundle2.load('imgs/cocos', cc.SpriteFrame, (err, spriteFrame) => {});
   * 
   * @typescript
   * preload(paths: string|string[], type: typeof cc.Asset, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preload(paths: string|string[], onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preload(paths: string|string[], type: typeof cc.Asset, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preload(paths: string|string[], type: typeof cc.Asset): void
   * preload(paths: string|string[], onComplete: (error: Error, items: RequestItem[]) => void): void
   * preload(paths: string|string[]): void
   */
  preload: function preload(paths, type, onProgress, onComplete) {
    var _parseLoadResArgs2 = parseLoadResArgs(type, onProgress, onComplete),
        type = _parseLoadResArgs2.type,
        onProgress = _parseLoadResArgs2.onProgress,
        onComplete = _parseLoadResArgs2.onComplete;

    cc.assetManager.preloadAny(paths, {
      __requestType__: RequestType.PATH,
      type: type,
      bundle: this.name
    }, onProgress, onComplete);
  },

  /**
   * !#en
   * Load all assets under a folder inside the bundle folder.<br>
   * <br>
   * Note: All asset paths in Creator use forward slashes, paths using backslashes will not work.
   * 
   * !#zh
   * 加载目标文件夹中的所有资源, 注意：路径中只能使用斜杠，反斜杠将停止工作
   *
   * @method loadDir
   * @param {string} dir - path of the target folder.The path is relative to the bundle folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be loaded if this argument is supplied.
   * @param {Function} [onProgress] - Callback invoked when progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed.
   * @param {Number} onProgress.total - The total number of the items.
   * @param {Object} onProgress.item - The latest request item
   * @param {Function} [onComplete] - A callback which is called when all assets have been loaded, or an error occurs.
   * @param {Error} onComplete.error - If one of the asset failed, the complete callback is immediately called with the error. If all assets are loaded successfully, error will be null.
   * @param {Asset[]|Asset} onComplete.assets - An array of all loaded assets.
   * 
   * @example
   * // load all audios (resources/audios/) 
   * cc.resources.loadDir('audios', cc.AudioClip, (err, audios) => {});
   *
   * // load all textures in "resources/imgs/"
   * cc.resources.loadDir('imgs', cc.Texture2D, null, function (err, textures) {
   *     var texture1 = textures[0];
   *     var texture2 = textures[1];
   * });
   * 
   * // load all prefabs (${project}/assets/bundle1/misc/characters/) from bundle1 folder
   * bundle1.loadDir('misc/characters', cc.Prefab, (err, prefabs) => console.log(err));
   *
   * // load all sprite frame (${project}/assets/some/xxx/bundle2/skills/) from bundle2 folder
   * bundle2.loadDir('skills', cc.SpriteFrame, null, (err, spriteFrames) => console.log(err));
   *
   * @typescript
   * loadDir<T extends cc.Asset>(dir: string, type: typeof cc.Asset, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, assets: Array<T>) => void): void
   * loadDir<T extends cc.Asset>(dir: string, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, assets: Array<T>) => void): void
   * loadDir<T extends cc.Asset>(dir: string, type: typeof cc.Asset, onComplete: (error: Error, assets: Array<T>) => void): void
   * loadDir<T extends cc.Asset>(dir: string, type: typeof cc.Asset): void
   * loadDir<T extends cc.Asset>(dir: string, onComplete: (error: Error, assets: Array<T>) => void): void
   * loadDir<T extends cc.Asset>(dir: string): void
   */
  loadDir: function loadDir(dir, type, onProgress, onComplete) {
    var _parseLoadResArgs3 = parseLoadResArgs(type, onProgress, onComplete),
        type = _parseLoadResArgs3.type,
        onProgress = _parseLoadResArgs3.onProgress,
        onComplete = _parseLoadResArgs3.onComplete;

    cc.assetManager.loadAny(dir, {
      __requestType__: RequestType.DIR,
      type: type,
      bundle: this.name,
      __outputAsArray__: true
    }, onProgress, onComplete);
  },

  /**
   * !#en
   * Preload all assets under a folder inside the bundle folder.<br> After calling this method, you still need to finish loading by calling `Bundle.loadDir`.
   * It will be totally fine to call `Bundle.loadDir` at any time even if the preloading is not yet finished
   * 
   * !#zh
   * 预加载目标文件夹中的所有资源。调用完后，你仍然需要通过 `Bundle.loadDir` 来完成加载。
   * 就算预加载还没完成，你也可以直接调用 `Bundle.loadDir`。
   *
   * @method preloadDir
   * @param {string} dir - path of the target folder.The path is relative to the bundle folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be preloaded if this argument is supplied.
   * @param {Function} [onProgress] - Callback invoked when progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed.
   * @param {Number} onProgress.total - The total number of the items.
   * @param {Object} onProgress.item - The latest request item
   * @param {Function} [onComplete] - A callback which is called when all assets have been loaded, or an error occurs.
   * @param {Error} onComplete.error - If one of the asset failed, the complete callback is immediately called with the error. If all assets are preloaded successfully, error will be null.
   * @param {RequestItem[]} onComplete.items - An array of all preloaded items.
   * 
   * @example
   * // preload all audios (resources/audios/) 
   * cc.resources.preloadDir('audios', cc.AudioClip);
   *
   * // preload all textures in "resources/imgs/"
   * cc.resources.preloadDir('imgs', cc.Texture2D);
   * // wait for while
   * cc.resources.loadDir('imgs', cc.Texture2D, (err, textures) => {});
   * 
   * // preload all prefabs (${project}/assets/bundle1/misc/characters/) from bundle1 folder
   * bundle1.preloadDir('misc/characters', cc.Prefab);
   *
   * // preload all sprite frame (${project}/assets/some/xxx/bundle2/skills/) from bundle2 folder
   * bundle2.preloadDir('skills', cc.SpriteFrame);
   * // wait for while
   * bundle2.loadDir('skills', cc.SpriteFrame, (err, spriteFrames) => {});
   *                                             
   * @typescript
   * preloadDir(dir: string, type: typeof cc.Asset, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preloadDir(dir: string, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preloadDir(dir: string, type: typeof cc.Asset, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preloadDir(dir: string, type: typeof cc.Asset): void
   * preloadDir(dir: string, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preloadDir(dir: string): void
   */
  preloadDir: function preloadDir(dir, type, onProgress, onComplete) {
    var _parseLoadResArgs4 = parseLoadResArgs(type, onProgress, onComplete),
        type = _parseLoadResArgs4.type,
        onProgress = _parseLoadResArgs4.onProgress,
        onComplete = _parseLoadResArgs4.onComplete;

    cc.assetManager.preloadAny(dir, {
      __requestType__: RequestType.DIR,
      type: type,
      bundle: this.name
    }, onProgress, onComplete);
  },

  /**
   * !#en 
   * Loads the scene within this bundle by its name.  
   * 
   * !#zh 
   * 通过场景名称加载分包中的场景。
   *
   * @method loadScene
   * @param {String} sceneName - The name of the scene to load.
   * @param {Object} [options] - Some optional parameters
   * @param {Function} [onProgress] - Callback invoked when progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed.
   * @param {Number} onProgress.total - The total number of the items.
   * @param {Object} onProgress.item - The latest request item
   * @param {Function} [onComplete] - callback, will be called after scene launched.
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {SceneAsset} onComplete.sceneAsset - The scene asset
   * 
   * @example
   * bundle1.loadScene('first', (err, sceneAsset) => cc.director.runScene(sceneAsset));
   * 
   * @typescript
   * loadScene(sceneName: string, options: Record<string, any>, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, sceneAsset: cc.SceneAsset) => void): void
   * loadScene(sceneName: string, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, sceneAsset: cc.SceneAsset) => void): void
   * loadScene(sceneName: string, options: Record<string, any>, onComplete: (error: Error, sceneAsset: cc.SceneAsset) => void): void
   * loadScene(sceneName: string, options: Record<string, any>): void
   * loadScene(sceneName: string, onComplete: (error: Error, sceneAsset: cc.SceneAsset) => void): void
   * loadScene(sceneName: string): void
   */
  loadScene: function loadScene(sceneName, options, onProgress, onComplete) {
    var _parseParameters = parseParameters(options, onProgress, onComplete),
        options = _parseParameters.options,
        onProgress = _parseParameters.onProgress,
        onComplete = _parseParameters.onComplete;

    options.preset = options.preset || 'scene';
    options.bundle = this.name;
    cc.assetManager.loadAny({
      'scene': sceneName
    }, options, onProgress, function (err, sceneAsset) {
      if (err) {
        cc.error(err.message, err.stack);
        onComplete && onComplete(err);
      } else if (sceneAsset instanceof cc.SceneAsset) {
        var scene = sceneAsset.scene;
        scene._id = sceneAsset._uuid;
        scene._name = sceneAsset._name;
        onComplete && onComplete(null, sceneAsset);
      } else {
        onComplete && onComplete(new Error('The asset ' + sceneAsset._uuid + ' is not a scene'));
      }
    });
  },

  /**
   * !#en
   * Preloads the scene within this bundle by its name. After calling this method, you still need to finish loading by calling `Bundle.loadScene` or `cc.director.loadScene`.
   * It will be totally fine to call `Bundle.loadDir` at any time even if the preloading is not yet finished
   * 
   * !#zh 
   * 通过场景名称预加载分包中的场景.调用完后，你仍然需要通过 `Bundle.loadScene` 或 `cc.director.loadScene` 来完成加载。
   * 就算预加载还没完成，你也可以直接调用 `Bundle.loadScene` 或 `cc.director.loadScene`。
   *
   * @method preloadScene
   * @param {String} sceneName - The name of the scene to preload.
   * @param {Object} [options] - Some optional parameters
   * @param {Function} [onProgress] - callback, will be called when the load progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed
   * @param {Number} onProgress.total - The total number of the items
   * @param {RequestItem} onProgress.item The latest request item
   * @param {Function} [onComplete] - callback, will be called after scene loaded.
   * @param {Error} onComplete.error - null or the error object.
   * 
   * @example
   * bundle1.preloadScene('first');
   * // wait for a while
   * bundle1.loadScene('first', (err, scene) => cc.director.runScene(scene));
   * 
   * @typescript
   * preloadScene(sceneName: string, options: Record<string, any>, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error) => void): void
   * preloadScene(sceneName: string, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error) => void): void
   * preloadScene(sceneName: string, options: Record<string, any>, onComplete: (error: Error) => void): void
   * preloadScene(sceneName: string, options: Record<string, any>): void
   * preloadScene(sceneName: string, onComplete: (error: Error) => void): void
   * preloadScene(sceneName: string): void
   */
  preloadScene: function preloadScene(sceneName, options, onProgress, onComplete) {
    var _parseParameters2 = parseParameters(options, onProgress, onComplete),
        options = _parseParameters2.options,
        onProgress = _parseParameters2.onProgress,
        onComplete = _parseParameters2.onComplete;

    options.bundle = this.name;
    cc.assetManager.preloadAny({
      'scene': sceneName
    }, options, onProgress, function (err) {
      if (err) {
        cc.errorID(1210, sceneName, err.message);
      }

      onComplete && onComplete(err);
    });
  },

  /**
   * !#en
   * Get asset within this bundle by path and type. <br>
   * After you load asset with {{#crossLink "Bundle/load:method"}}{{/crossLink}} or {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}},
   * you can acquire them by passing the path to this API.
   * 
   * !#zh
   * 通过路径与类型获取资源。在你使用 {{#crossLink "Bundle/load:method"}}{{/crossLink}} 或者 {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}} 之后，
   * 你能通过传路径通过这个 API 获取到这些资源。
   * 
   * @method get
   * @param {String} path - The path of asset
   * @param {Function} [type] - Only asset of type will be returned if this argument is supplied.
   * @returns {Asset} 
   * 
   * @example
   * bundle1.get('music/hit', cc.AudioClip);
   * 
   * @typescript
   * get (path: string, type?: typeof cc.Asset): cc.Asset
   */
  get: function get(path, type) {
    var info = this.getInfoWithPath(path, type);
    return assets.get(info && info.uuid);
  },

  /**
   * !#en 
   * Release the asset loaded by {{#crossLink "Bundle/load:method"}}{{/crossLink}} or {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}} and it's dependencies. 
   * Refer to {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}} for detailed informations.
   * 
   * !#zh 
   * 释放通过 {{#crossLink "Bundle/load:method"}}{{/crossLink}} 或者 {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}} 加载的资源。详细信息请参考 {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}}
   * 
   * @method release
   * @param {String} path - The path of asset
   * @param {Function} [type] - Only asset of type will be released if this argument is supplied.
   * 
   * @example
   * // release a texture which is no longer need
   * bundle1.release('misc/character/cocos');
   *
   * @typescript
   * release(path: string, type: typeof cc.Asset): void
   * release(path: string): void
   */
  release: function release(path, type) {
    releaseManager.tryRelease(this.get(path, type), true);
  },

  /**
   * !#en 
   * Release all unused assets within this bundle. Refer to {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}} for detailed informations.
   * 
   * !#zh 
   * 释放此包中的所有没有用到的资源。详细信息请参考 {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}}
   *
   * @method releaseUnusedAssets
   * @private
   * 
   * @example
   * // release all unused asset within bundle1
   * bundle1.releaseUnusedAssets();
   * 
   * @typescript
   * releaseUnusedAssets(): void
   */
  releaseUnusedAssets: function releaseUnusedAssets() {
    var self = this;
    assets.forEach(function (asset) {
      var info = self.getAssetInfo(asset._uuid);

      if (info && !info.redirect) {
        releaseManager.tryRelease(asset);
      }
    });
  },

  /**
   * !#en 
   * Release all assets within this bundle. Refer to {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}} for detailed informations.
   * 
   * !#zh 
   * 释放此包中的所有资源。详细信息请参考 {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}}
   *
   * @method releaseAll
   * 
   * @example
   * // release all asset within bundle1
   * bundle1.releaseAll();
   * 
   * @typescript
   * releaseAll(): void
   */
  releaseAll: function releaseAll() {
    var self = this;
    assets.forEach(function (asset) {
      var info = self.getAssetInfo(asset._uuid);

      if (info && !info.redirect) {
        releaseManager.tryRelease(asset, true);
      }
    });
  },
  _destroy: function _destroy() {
    this._config.destroy();
  }
};
module.exports = Bundle;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvYnVuZGxlLmpzIl0sIm5hbWVzIjpbIkNvbmZpZyIsInJlcXVpcmUiLCJyZWxlYXNlTWFuYWdlciIsInBhcnNlUGFyYW1ldGVycyIsInBhcnNlTG9hZFJlc0FyZ3MiLCJSZXF1ZXN0VHlwZSIsImFzc2V0cyIsImJ1bmRsZXMiLCJCdW5kbGUiLCJfY29uZmlnIiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiZGVwcyIsImJhc2UiLCJnZXRJbmZvV2l0aFBhdGgiLCJwYXRoIiwidHlwZSIsImdldERpcldpdGhQYXRoIiwib3V0IiwiZ2V0QXNzZXRJbmZvIiwidXVpZCIsImdldFNjZW5lSW5mbyIsImluaXQiLCJvcHRpb25zIiwiYWRkIiwibG9hZCIsInBhdGhzIiwib25Qcm9ncmVzcyIsIm9uQ29tcGxldGUiLCJjYyIsImFzc2V0TWFuYWdlciIsImxvYWRBbnkiLCJfX3JlcXVlc3RUeXBlX18iLCJQQVRIIiwiYnVuZGxlIiwicHJlbG9hZCIsInByZWxvYWRBbnkiLCJsb2FkRGlyIiwiZGlyIiwiRElSIiwiX19vdXRwdXRBc0FycmF5X18iLCJwcmVsb2FkRGlyIiwibG9hZFNjZW5lIiwic2NlbmVOYW1lIiwicHJlc2V0IiwiZXJyIiwic2NlbmVBc3NldCIsImVycm9yIiwibWVzc2FnZSIsInN0YWNrIiwiU2NlbmVBc3NldCIsInNjZW5lIiwiX2lkIiwiX3V1aWQiLCJfbmFtZSIsIkVycm9yIiwicHJlbG9hZFNjZW5lIiwiZXJyb3JJRCIsImdldCIsImluZm8iLCJyZWxlYXNlIiwidHJ5UmVsZWFzZSIsInJlbGVhc2VVbnVzZWRBc3NldHMiLCJzZWxmIiwiZm9yRWFjaCIsImFzc2V0IiwicmVkaXJlY3QiLCJyZWxlYXNlQWxsIiwiX2Rlc3Ryb3kiLCJkZXN0cm95IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jb25zdCBDb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xuY29uc3QgcmVsZWFzZU1hbmFnZXIgPSByZXF1aXJlKCcuL3JlbGVhc2VNYW5hZ2VyJyk7XG5jb25zdCB7IHBhcnNlUGFyYW1ldGVycywgcGFyc2VMb2FkUmVzQXJncyB9ID0gcmVxdWlyZSgnLi91dGlsaXRpZXMnKTtcbmNvbnN0IHsgUmVxdWVzdFR5cGUsIGFzc2V0cywgYnVuZGxlcyB9ID0gcmVxdWlyZSgnLi9zaGFyZWQnKTtcblxuLyoqXG4gKiBAbW9kdWxlIGNjLkFzc2V0TWFuYWdlclxuICovXG5cbi8qKlxuICogISNlblxuICogQSBidW5kbGUgY29udGFpbnMgYW4gYW1vdW50IG9mIGFzc2V0cyhpbmNsdWRlcyBzY2VuZSksIHlvdSBjYW4gbG9hZCwgcHJlbG9hZCwgcmVsZWFzZSBhc3NldCB3aGljaCBpcyBpbiB0aGlzIGJ1bmRsZVxuICogXG4gKiAhI3poXG4gKiDkuIDkuKrljIXlkKvkuIDlrprmlbDph4/otYTmupDvvIjljIXmi6zlnLrmma/vvInnmoTljIXvvIzkvaDlj6/ku6XliqDovb3vvIzpooTliqDovb3vvIzph4rmlL7mraTljIXlhoXnmoTotYTmupBcbiAqIFxuICogQGNsYXNzIEJ1bmRsZVxuICovXG5mdW5jdGlvbiBCdW5kbGUgKCkge1xuICAgIHRoaXMuX2NvbmZpZyA9IG5ldyBDb25maWcoKTtcbn1cblxuQnVuZGxlLnByb3RvdHlwZSA9IHtcbiAgICBcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ3JlYXRlIGEgYnVuZGxlXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOWIm+W7uuS4gOS4qiBidW5kbGVcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBjb25zdHJ1Y3RvcigpXG4gICAgICovXG4gICAgY29uc3RydWN0b3I6IEJ1bmRsZSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGJ1bmRsZVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDmraQgYnVuZGxlIOeahOWQjeensFxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBuYW1lXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXQgbmFtZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcubmFtZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFRoZSBkZXBlbmRlbmN5IG9mIHRoaXMgYnVuZGxlXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOatpCBidW5kbGUg55qE5L6d6LWWXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IGRlcHNcbiAgICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAgICovXG4gICAgZ2V0IGRlcHMgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmRlcHM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUaGUgcm9vdCBwYXRoIG9mIHRoaXMgYnVuZGxlLCBzdWNoIGxpa2UgJ2h0dHA6Ly9leGFtcGxlLmNvbS9idW5kbGUxJ1xuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDmraQgYnVuZGxlIOeahOaguei3r+W+hCwg5L6L5aaCICdodHRwOi8vZXhhbXBsZS5jb20vYnVuZGxlMSdcbiAgICAgKiBcbiAgICAgKiBAcHJvcGVydHkgYmFzZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0IGJhc2UgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmJhc2U7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgYXNzZXQncyBpbmZvIHVzaW5nIHBhdGgsIG9ubHkgdmFsaWQgd2hlbiBhc3NldCBpcyBpbiBidW5kbGUgZm9sZGVyLlxuICAgICAqICBcbiAgICAgKiAhI3poXG4gICAgICog5L2/55SoIHBhdGgg6I635Y+W6LWE5rqQ55qE6YWN572u5L+h5oGvXG4gICAgICogXG4gICAgICogQG1ldGhvZCBnZXRJbmZvV2l0aFBhdGhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSByZWxhdGl2ZSBwYXRoIG9mIGFzc2V0LCBzdWNoIGFzICdpbWFnZXMvYSdcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHlwZV0gLSBUaGUgY29uc3RydWN0b3Igb2YgYXNzZXQsIHN1Y2ggYXMgIGBjYy5UZXh0dXJlMkRgXG4gICAgICogQHJldHVybnMge09iamVjdH0gVGhlIGFzc2V0IGluZm8gXG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgaW5mbyA9IGJ1bmRsZS5nZXRJbmZvV2l0aFBhdGgoJ2ltYWdlL2EnLCBjYy5UZXh0dXJlMkQpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZ2V0SW5mb1dpdGhQYXRoIChwYXRoOiBzdHJpbmcsIHR5cGU/OiB0eXBlb2YgY2MuQXNzZXQpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+XG4gICAgICovXG4gICAgZ2V0SW5mb1dpdGhQYXRoIChwYXRoLCB0eXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuZ2V0SW5mb1dpdGhQYXRoKHBhdGgsIHR5cGUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IGFsbCBhc3NldCdzIGluZm8gd2l0aGluIHNwZWNpZmljIGZvbGRlclxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDojrflj5blnKjmn5DkuKrmjIflrprmlofku7blpLnkuIvnmoTmiYDmnInotYTmupDkv6Hmga9cbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGdldERpcldpdGhQYXRoXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBUaGUgcmVsYXRpdmUgcGF0aCBvZiBmb2xkZXIsIHN1Y2ggYXMgJ2ltYWdlcydcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHlwZV0gLSBUaGUgY29uc3RydWN0b3Igc2hvdWxkIGJlIHVzZWQgdG8gZmlsdGVyIHBhdGhzXG4gICAgICogQHBhcmFtIHtBcnJheX0gW291dF0gLSBUaGUgb3V0cHV0IGFycmF5XG4gICAgICogQHJldHVybnMge09iamVjdFtdfSBJbmZvc1xuICAgICAqIFxuICAgICAqIEBleGFtcGxlIFxuICAgICAqIHZhciBpbmZvcyA9IFtdO1xuICAgICAqIGJ1bmRsZS5nZXREaXJXaXRoUGF0aCgnaW1hZ2VzJywgY2MuVGV4dHVyZTJELCBpbmZvcyk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBnZXREaXJXaXRoUGF0aCAocGF0aDogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIG91dDogQXJyYXk8UmVjb3JkPHN0cmluZywgYW55Pj4pOiBBcnJheTxSZWNvcmQ8c3RyaW5nLCBhbnk+PlxuICAgICAqIGdldERpcldpdGhQYXRoIChwYXRoOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCk6IEFycmF5PFJlY29yZDxzdHJpbmcsIGFueT4+XG4gICAgICogZ2V0RGlyV2l0aFBhdGggKHBhdGg6IHN0cmluZyk6IEFycmF5PFJlY29yZDxzdHJpbmcsIGFueT4+XG4gICAgICovXG4gICAgZ2V0RGlyV2l0aFBhdGggKHBhdGgsIHR5cGUsIG91dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmdldERpcldpdGhQYXRoKHBhdGgsIHR5cGUsIG91dCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgYXNzZXQncyBpbmZvIHdpdGggdXVpZFxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDpgJrov4cgdXVpZCDojrflj5botYTmupDkv6Hmga9cbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGdldEFzc2V0SW5mb1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1dWlkIC0gVGhlIGFzc2V0J3MgdXVpZFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IGluZm8gXG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgaW5mbyA9IGJ1bmRsZS5nZXRBc3NldEluZm8oJ2ZjbVIzWEFETkxnSjFCeUtocWNDNVonKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGdldEFzc2V0SW5mbyAodXVpZDogc3RyaW5nKTogUmVjb3JkPHN0cmluZywgYW55PlxuICAgICAqL1xuICAgIGdldEFzc2V0SW5mbyAodXVpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmdldEFzc2V0SW5mbyh1dWlkKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCBzY2VuZSdpbmZvIHdpdGggbmFtZVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDpgJrov4flnLrmma/lkI3ojrflj5blnLrmma/kv6Hmga9cbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGdldFNjZW5lSW5mb1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2Ygc2NlbmVcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluZm9cbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBpbmZvID0gYnVuZGxlLmdldFNjZW5lSW5mbygnZmlyc3QuZmlyZScpO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZ2V0U2NlbmVJbmZvKG5hbWU6IHN0cmluZyk6IFJlY29yZDxzdHJpbmcsIGFueT5cbiAgICAgKi9cbiAgICBnZXRTY2VuZUluZm8gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5nZXRTY2VuZUluZm8obmFtZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBJbml0aWFsaXplIHRoaXMgYnVuZGxlIHdpdGggb3B0aW9uc1xuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDliJ3lp4vljJbmraQgYnVuZGxlXG4gICAgICogXG4gICAgICogQG1ldGhvZCBpbml0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgXG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBpbml0KG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4pOiB2b2lkXG4gICAgICovXG4gICAgaW5pdCAob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9jb25maWcuaW5pdChvcHRpb25zKTtcbiAgICAgICAgYnVuZGxlcy5hZGQob3B0aW9ucy5uYW1lLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIExvYWQgdGhlIGFzc2V0IHdpdGhpbiB0aGlzIGJ1bmRsZSBieSB0aGUgcGF0aCB3aGljaCBpcyByZWxhdGl2ZSB0byBidW5kbGUncyBwYXRoXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOmAmui/h+ebuOWvuei3r+W+hOWKoOi9veWIhuWMheS4reeahOi1hOa6kOOAgui3r+W+hOaYr+ebuOWvueWIhuWMheaWh+S7tuWkuei3r+W+hOeahOebuOWvuei3r+W+hFxuICAgICAqXG4gICAgICogQG1ldGhvZCBsb2FkXG4gICAgICogQHBhcmFtIHtTdHJpbmd8U3RyaW5nW119IHBhdGhzIC0gUGF0aHMgb2YgdGhlIHRhcmdldCBhc3NldHMuVGhlIHBhdGggaXMgcmVsYXRpdmUgdG8gdGhlIGJ1bmRsZSdzIGZvbGRlciwgZXh0ZW5zaW9ucyBtdXN0IGJlIG9taXR0ZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3R5cGVdIC0gT25seSBhc3NldCBvZiB0eXBlIHdpbGwgYmUgbG9hZGVkIGlmIHRoaXMgYXJndW1lbnQgaXMgc3VwcGxpZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uUHJvZ3Jlc3NdIC0gQ2FsbGJhY2sgaW52b2tlZCB3aGVuIHByb2dyZXNzaW9uIGNoYW5nZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy5maW5pc2ggLSBUaGUgbnVtYmVyIG9mIHRoZSBpdGVtcyB0aGF0IGFyZSBhbHJlYWR5IGNvbXBsZXRlZC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy50b3RhbCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgdGhlIGl0ZW1zLlxuICAgICAqIEBwYXJhbSB7UmVxdWVzdEl0ZW19IG9uUHJvZ3Jlc3MuaXRlbSAtIFRoZSBmaW5pc2hlZCByZXF1ZXN0IGl0ZW0uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uQ29tcGxldGVdIC0gQ2FsbGJhY2sgaW52b2tlZCB3aGVuIGFsbCBhc3NldHMgbG9hZGVkLlxuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyb3IgLSBUaGUgZXJyb3IgaW5mbyBvciBudWxsIGlmIGxvYWRlZCBzdWNjZXNzZnVsbHkuXG4gICAgICogQHBhcmFtIHtBc3NldHxBc3NldFtdfSBvbkNvbXBsZXRlLmFzc2V0cyAtIFRoZSBsb2FkZWQgYXNzZXRzLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBsb2FkIHRoZSB0ZXh0dXJlICgke3Byb2plY3R9L2Fzc2V0cy9yZXNvdXJjZXMvdGV4dHVyZXMvYmFja2dyb3VuZC5qcGcpIGZyb20gcmVzb3VyY2VzXG4gICAgICogY2MucmVzb3VyY2VzLmxvYWQoJ3RleHR1cmVzL2JhY2tncm91bmQnLCBjYy5UZXh0dXJlMkQsIChlcnIsIHRleHR1cmUpID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAqIFxuICAgICAqIC8vIGxvYWQgdGhlIGF1ZGlvICgke3Byb2plY3R9L2Fzc2V0cy9yZXNvdXJjZXMvbXVzaWMvaGl0Lm1wMykgZnJvbSByZXNvdXJjZXNcbiAgICAgKiBjYy5yZXNvdXJjZXMubG9hZCgnbXVzaWMvaGl0JywgY2MuQXVkaW9DbGlwLCAoZXJyLCBhdWRpbykgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICogXG4gICAgICogLy8gbG9hZCB0aGUgcHJlZmFiICgke3Byb2plY3R9L2Fzc2V0cy9idW5kbGUxL21pc2MvY2hhcmFjdGVyL2NvY29zKSBmcm9tIGJ1bmRsZTEgZm9sZGVyXG4gICAgICogYnVuZGxlMS5sb2FkKCdtaXNjL2NoYXJhY3Rlci9jb2NvcycsIGNjLlByZWZhYiwgKGVyciwgcHJlZmFiKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgKlxuICAgICAqIC8vIGxvYWQgdGhlIHNwcml0ZSBmcmFtZSAoJHtwcm9qZWN0fS9hc3NldHMvc29tZS94eHgvYnVuZGxlMi9pbWdzL2NvY29zLnBuZykgZnJvbSBidW5kbGUyIGZvbGRlclxuICAgICAqIGJ1bmRsZTIubG9hZCgnaW1ncy9jb2NvcycsIGNjLlNwcml0ZUZyYW1lLCBudWxsLCAoZXJyLCBzcHJpdGVGcmFtZSkgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBsb2FkPFQgZXh0ZW5kcyBjYy5Bc3NldD4ocGF0aHM6IHN0cmluZ3xzdHJpbmdbXSwgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBvblByb2dyZXNzOiAoZmluaXNoOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGl0ZW06IFJlcXVlc3RJdGVtKSA9PiB2b2lkLCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBhc3NldHM6IFR8QXJyYXk8VD4pID0+IHZvaWQpOiB2b2lkXG4gICAgICogbG9hZDxUIGV4dGVuZHMgY2MuQXNzZXQ+KHBhdGhzOiBzdHJpbmd8c3RyaW5nW10sIG9uUHJvZ3Jlc3M6IChmaW5pc2g6IG51bWJlciwgdG90YWw6IG51bWJlciwgaXRlbTogUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIGFzc2V0czogVHxBcnJheTxUPikgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBsb2FkPFQgZXh0ZW5kcyBjYy5Bc3NldD4ocGF0aHM6IHN0cmluZ3xzdHJpbmdbXSwgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBhc3NldHM6IFR8QXJyYXk8VD4pID0+IHZvaWQpOiB2b2lkXG4gICAgICogbG9hZDxUIGV4dGVuZHMgY2MuQXNzZXQ+KHBhdGhzOiBzdHJpbmd8c3RyaW5nW10sIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIGFzc2V0czogVHxBcnJheTxUPikgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBsb2FkPFQgZXh0ZW5kcyBjYy5Bc3NldD4ocGF0aHM6IHN0cmluZ3xzdHJpbmdbXSwgdHlwZTogdHlwZW9mIGNjLkFzc2V0KTogdm9pZFxuICAgICAqIGxvYWQ8VCBleHRlbmRzIGNjLkFzc2V0PihwYXRoczogc3RyaW5nfHN0cmluZ1tdKTogdm9pZFxuICAgICAqL1xuICAgIGxvYWQgKHBhdGhzLCB0eXBlLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgIHZhciB7IHR5cGUsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUgfSA9IHBhcnNlTG9hZFJlc0FyZ3ModHlwZSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSk7XG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KHBhdGhzLCB7IF9fcmVxdWVzdFR5cGVfXzogUmVxdWVzdFR5cGUuUEFUSCwgdHlwZTogdHlwZSwgYnVuZGxlOiB0aGlzLm5hbWUgfSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBQcmVsb2FkIHRoZSBhc3NldCB3aXRoaW4gdGhpcyBidW5kbGUgYnkgdGhlIHBhdGggd2hpY2ggaXMgcmVsYXRpdmUgdG8gYnVuZGxlJ3MgcGF0aC4gXG4gICAgICogQWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCwgeW91IHN0aWxsIG5lZWQgdG8gZmluaXNoIGxvYWRpbmcgYnkgY2FsbGluZyBgQnVuZGxlLmxvYWRgLlxuICAgICAqIEl0IHdpbGwgYmUgdG90YWxseSBmaW5lIHRvIGNhbGwgYEJ1bmRsZS5sb2FkYCBhdCBhbnkgdGltZSBldmVuIGlmIHRoZSBwcmVsb2FkaW5nIGlzIG5vdFxuICAgICAqIHlldCBmaW5pc2hlZFxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDpgJrov4fnm7jlr7not6/lvoTpooTliqDovb3liIbljIXkuK3nmoTotYTmupDjgILot6/lvoTmmK/nm7jlr7nliIbljIXmlofku7blpLnot6/lvoTnmoTnm7jlr7not6/lvoTjgILosIPnlKjlrozlkI7vvIzkvaDku43nhLbpnIDopoHpgJrov4cgYEJ1bmRsZS5sb2FkYCDmnaXlrozmiJDliqDovb3jgIJcbiAgICAgKiDlsLHnrpfpooTliqDovb3ov5jmsqHlrozmiJDvvIzkvaDkuZ/lj6/ku6Xnm7TmjqXosIPnlKggYEJ1bmRsZS5sb2FkYOOAglxuICAgICAqXG4gICAgICogQG1ldGhvZCBwcmVsb2FkXG4gICAgICogQHBhcmFtIHtTdHJpbmd8U3RyaW5nW119IHBhdGhzIC0gUGF0aHMgb2YgdGhlIHRhcmdldCBhc3NldC5UaGUgcGF0aCBpcyByZWxhdGl2ZSB0byBidW5kbGUgZm9sZGVyLCBleHRlbnNpb25zIG11c3QgYmUgb21pdHRlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHlwZV0gLSBPbmx5IGFzc2V0IG9mIHR5cGUgd2lsbCBiZSBsb2FkZWQgaWYgdGhpcyBhcmd1bWVudCBpcyBzdXBwbGllZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Qcm9ncmVzc10gLSBDYWxsYmFjayBpbnZva2VkIHdoZW4gcHJvZ3Jlc3Npb24gY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvblByb2dyZXNzLmZpbmlzaCAtIFRoZSBudW1iZXIgb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIGFscmVhZHkgY29tcGxldGVkLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvblByb2dyZXNzLnRvdGFsIC0gVGhlIHRvdGFsIG51bWJlciBvZiB0aGUgaXRlbXMuXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0SXRlbX0gb25Qcm9ncmVzcy5pdGVtIC0gVGhlIGZpbmlzaGVkIHJlcXVlc3QgaXRlbS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Db21wbGV0ZV0gLSBDYWxsYmFjayBpbnZva2VkIHdoZW4gdGhlIHJlc291cmNlIGxvYWRlZC5cbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkNvbXBsZXRlLmVycm9yIC0gVGhlIGVycm9yIGluZm8gb3IgbnVsbCBpZiBsb2FkZWQgc3VjY2Vzc2Z1bGx5LlxuICAgICAqIEBwYXJhbSB7UmVxdWVzdEl0ZW1bXX0gb25Db21wbGV0ZS5pdGVtcyAtIFRoZSBwcmVsb2FkZWQgaXRlbXMuXG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBwcmVsb2FkIHRoZSB0ZXh0dXJlICgke3Byb2plY3R9L2Fzc2V0cy9yZXNvdXJjZXMvdGV4dHVyZXMvYmFja2dyb3VuZC5qcGcpIGZyb20gcmVzb3VyY2VzXG4gICAgICogY2MucmVzb3VyY2VzLnByZWxvYWQoJ3RleHR1cmVzL2JhY2tncm91bmQnLCBjYy5UZXh0dXJlMkQpO1xuICAgICAqIFxuICAgICAqIC8vIHByZWxvYWQgdGhlIGF1ZGlvICgke3Byb2plY3R9L2Fzc2V0cy9yZXNvdXJjZXMvbXVzaWMvaGl0Lm1wMykgZnJvbSByZXNvdXJjZXNcbiAgICAgKiBjYy5yZXNvdXJjZXMucHJlbG9hZCgnbXVzaWMvaGl0JywgY2MuQXVkaW9DbGlwKTtcbiAgICAgKiAvLyB3YWl0IGZvciB3aGlsZVxuICAgICAqIGNjLnJlc291cmNlcy5sb2FkKCdtdXNpYy9oaXQnLCBjYy5BdWRpb0NsaXAsIChlcnIsIGF1ZGlvQ2xpcCkgPT4ge30pO1xuICAgICAqIFxuICAgICAqICogLy8gcHJlbG9hZCB0aGUgcHJlZmFiICgke3Byb2plY3R9L2Fzc2V0cy9idW5kbGUxL21pc2MvY2hhcmFjdGVyL2NvY29zKSBmcm9tIGJ1bmRsZTEgZm9sZGVyXG4gICAgICogYnVuZGxlMS5wcmVsb2FkKCdtaXNjL2NoYXJhY3Rlci9jb2NvcycsIGNjLlByZWZhYik7XG4gICAgICpcbiAgICAgKiAvLyBsb2FkIHRoZSBzcHJpdGUgZnJhbWUgb2YgKCR7cHJvamVjdH0vYXNzZXRzL2J1bmRsZTIvaW1ncy9jb2Nvcy5wbmcpIGZyb20gYnVuZGxlMiBmb2xkZXJcbiAgICAgKiBidW5kbGUyLnByZWxvYWQoJ2ltZ3MvY29jb3MnLCBjYy5TcHJpdGVGcmFtZSk7XG4gICAgICogLy8gd2FpdCBmb3Igd2hpbGVcbiAgICAgKiBidW5kbGUyLmxvYWQoJ2ltZ3MvY29jb3MnLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgc3ByaXRlRnJhbWUpID0+IHt9KTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHByZWxvYWQocGF0aHM6IHN0cmluZ3xzdHJpbmdbXSwgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBvblByb2dyZXNzOiAoZmluaXNoOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGl0ZW06IFJlcXVlc3RJdGVtKSA9PiB2b2lkLCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBpdGVtczogUmVxdWVzdEl0ZW1bXSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBwcmVsb2FkKHBhdGhzOiBzdHJpbmd8c3RyaW5nW10sIG9uUHJvZ3Jlc3M6IChmaW5pc2g6IG51bWJlciwgdG90YWw6IG51bWJlciwgaXRlbTogUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIGl0ZW1zOiBSZXF1ZXN0SXRlbVtdKSA9PiB2b2lkKTogdm9pZFxuICAgICAqIHByZWxvYWQocGF0aHM6IHN0cmluZ3xzdHJpbmdbXSwgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBpdGVtczogUmVxdWVzdEl0ZW1bXSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBwcmVsb2FkKHBhdGhzOiBzdHJpbmd8c3RyaW5nW10sIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCk6IHZvaWRcbiAgICAgKiBwcmVsb2FkKHBhdGhzOiBzdHJpbmd8c3RyaW5nW10sIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIGl0ZW1zOiBSZXF1ZXN0SXRlbVtdKSA9PiB2b2lkKTogdm9pZFxuICAgICAqIHByZWxvYWQocGF0aHM6IHN0cmluZ3xzdHJpbmdbXSk6IHZvaWRcbiAgICAgKi9cbiAgICBwcmVsb2FkIChwYXRocywgdHlwZSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSkge1xuICAgICAgICB2YXIgeyB0eXBlLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlIH0gPSBwYXJzZUxvYWRSZXNBcmdzKHR5cGUsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xuICAgICAgICBjYy5hc3NldE1hbmFnZXIucHJlbG9hZEFueShwYXRocywgeyBfX3JlcXVlc3RUeXBlX186IFJlcXVlc3RUeXBlLlBBVEgsIHR5cGU6IHR5cGUsIGJ1bmRsZTogdGhpcy5uYW1lIH0sIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogTG9hZCBhbGwgYXNzZXRzIHVuZGVyIGEgZm9sZGVyIGluc2lkZSB0aGUgYnVuZGxlIGZvbGRlci48YnI+XG4gICAgICogPGJyPlxuICAgICAqIE5vdGU6IEFsbCBhc3NldCBwYXRocyBpbiBDcmVhdG9yIHVzZSBmb3J3YXJkIHNsYXNoZXMsIHBhdGhzIHVzaW5nIGJhY2tzbGFzaGVzIHdpbGwgbm90IHdvcmsuXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOWKoOi9veebruagh+aWh+S7tuWkueS4reeahOaJgOaciei1hOa6kCwg5rOo5oSP77ya6Lev5b6E5Lit5Y+q6IO95L2/55So5pac5p2g77yM5Y+N5pac5p2g5bCG5YGc5q2i5bel5L2cXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGxvYWREaXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGlyIC0gcGF0aCBvZiB0aGUgdGFyZ2V0IGZvbGRlci5UaGUgcGF0aCBpcyByZWxhdGl2ZSB0byB0aGUgYnVuZGxlIGZvbGRlciwgZXh0ZW5zaW9ucyBtdXN0IGJlIG9taXR0ZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3R5cGVdIC0gT25seSBhc3NldCBvZiB0eXBlIHdpbGwgYmUgbG9hZGVkIGlmIHRoaXMgYXJndW1lbnQgaXMgc3VwcGxpZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uUHJvZ3Jlc3NdIC0gQ2FsbGJhY2sgaW52b2tlZCB3aGVuIHByb2dyZXNzaW9uIGNoYW5nZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy5maW5pc2ggLSBUaGUgbnVtYmVyIG9mIHRoZSBpdGVtcyB0aGF0IGFyZSBhbHJlYWR5IGNvbXBsZXRlZC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy50b3RhbCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgdGhlIGl0ZW1zLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvblByb2dyZXNzLml0ZW0gLSBUaGUgbGF0ZXN0IHJlcXVlc3QgaXRlbVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIEEgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdoZW4gYWxsIGFzc2V0cyBoYXZlIGJlZW4gbG9hZGVkLCBvciBhbiBlcnJvciBvY2N1cnMuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnJvciAtIElmIG9uZSBvZiB0aGUgYXNzZXQgZmFpbGVkLCB0aGUgY29tcGxldGUgY2FsbGJhY2sgaXMgaW1tZWRpYXRlbHkgY2FsbGVkIHdpdGggdGhlIGVycm9yLiBJZiBhbGwgYXNzZXRzIGFyZSBsb2FkZWQgc3VjY2Vzc2Z1bGx5LCBlcnJvciB3aWxsIGJlIG51bGwuXG4gICAgICogQHBhcmFtIHtBc3NldFtdfEFzc2V0fSBvbkNvbXBsZXRlLmFzc2V0cyAtIEFuIGFycmF5IG9mIGFsbCBsb2FkZWQgYXNzZXRzLlxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gbG9hZCBhbGwgYXVkaW9zIChyZXNvdXJjZXMvYXVkaW9zLykgXG4gICAgICogY2MucmVzb3VyY2VzLmxvYWREaXIoJ2F1ZGlvcycsIGNjLkF1ZGlvQ2xpcCwgKGVyciwgYXVkaW9zKSA9PiB7fSk7XG4gICAgICpcbiAgICAgKiAvLyBsb2FkIGFsbCB0ZXh0dXJlcyBpbiBcInJlc291cmNlcy9pbWdzL1wiXG4gICAgICogY2MucmVzb3VyY2VzLmxvYWREaXIoJ2ltZ3MnLCBjYy5UZXh0dXJlMkQsIG51bGwsIGZ1bmN0aW9uIChlcnIsIHRleHR1cmVzKSB7XG4gICAgICogICAgIHZhciB0ZXh0dXJlMSA9IHRleHR1cmVzWzBdO1xuICAgICAqICAgICB2YXIgdGV4dHVyZTIgPSB0ZXh0dXJlc1sxXTtcbiAgICAgKiB9KTtcbiAgICAgKiBcbiAgICAgKiAvLyBsb2FkIGFsbCBwcmVmYWJzICgke3Byb2plY3R9L2Fzc2V0cy9idW5kbGUxL21pc2MvY2hhcmFjdGVycy8pIGZyb20gYnVuZGxlMSBmb2xkZXJcbiAgICAgKiBidW5kbGUxLmxvYWREaXIoJ21pc2MvY2hhcmFjdGVycycsIGNjLlByZWZhYiwgKGVyciwgcHJlZmFicykgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICpcbiAgICAgKiAvLyBsb2FkIGFsbCBzcHJpdGUgZnJhbWUgKCR7cHJvamVjdH0vYXNzZXRzL3NvbWUveHh4L2J1bmRsZTIvc2tpbGxzLykgZnJvbSBidW5kbGUyIGZvbGRlclxuICAgICAqIGJ1bmRsZTIubG9hZERpcignc2tpbGxzJywgY2MuU3ByaXRlRnJhbWUsIG51bGwsIChlcnIsIHNwcml0ZUZyYW1lcykgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICpcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGxvYWREaXI8VCBleHRlbmRzIGNjLkFzc2V0PihkaXI6IHN0cmluZywgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBvblByb2dyZXNzOiAoZmluaXNoOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGl0ZW06IFJlcXVlc3RJdGVtKSA9PiB2b2lkLCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBhc3NldHM6IEFycmF5PFQ+KSA9PiB2b2lkKTogdm9pZFxuICAgICAqIGxvYWREaXI8VCBleHRlbmRzIGNjLkFzc2V0PihkaXI6IHN0cmluZywgb25Qcm9ncmVzczogKGZpbmlzaDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBSZXF1ZXN0SXRlbSkgPT4gdm9pZCwgb25Db21wbGV0ZTogKGVycm9yOiBFcnJvciwgYXNzZXRzOiBBcnJheTxUPikgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBsb2FkRGlyPFQgZXh0ZW5kcyBjYy5Bc3NldD4oZGlyOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCwgb25Db21wbGV0ZTogKGVycm9yOiBFcnJvciwgYXNzZXRzOiBBcnJheTxUPikgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBsb2FkRGlyPFQgZXh0ZW5kcyBjYy5Bc3NldD4oZGlyOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCk6IHZvaWRcbiAgICAgKiBsb2FkRGlyPFQgZXh0ZW5kcyBjYy5Bc3NldD4oZGlyOiBzdHJpbmcsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIGFzc2V0czogQXJyYXk8VD4pID0+IHZvaWQpOiB2b2lkXG4gICAgICogbG9hZERpcjxUIGV4dGVuZHMgY2MuQXNzZXQ+KGRpcjogc3RyaW5nKTogdm9pZFxuICAgICAqL1xuICAgIGxvYWREaXIgKGRpciwgdHlwZSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSkge1xuICAgICAgICB2YXIgeyB0eXBlLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlIH0gPSBwYXJzZUxvYWRSZXNBcmdzKHR5cGUsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xuICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEFueShkaXIsIHsgX19yZXF1ZXN0VHlwZV9fOiBSZXF1ZXN0VHlwZS5ESVIsIHR5cGU6IHR5cGUsIGJ1bmRsZTogdGhpcy5uYW1lLCBfX291dHB1dEFzQXJyYXlfXzogdHJ1ZSB9LCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFByZWxvYWQgYWxsIGFzc2V0cyB1bmRlciBhIGZvbGRlciBpbnNpZGUgdGhlIGJ1bmRsZSBmb2xkZXIuPGJyPiBBZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kLCB5b3Ugc3RpbGwgbmVlZCB0byBmaW5pc2ggbG9hZGluZyBieSBjYWxsaW5nIGBCdW5kbGUubG9hZERpcmAuXG4gICAgICogSXQgd2lsbCBiZSB0b3RhbGx5IGZpbmUgdG8gY2FsbCBgQnVuZGxlLmxvYWREaXJgIGF0IGFueSB0aW1lIGV2ZW4gaWYgdGhlIHByZWxvYWRpbmcgaXMgbm90IHlldCBmaW5pc2hlZFxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDpooTliqDovb3nm67moIfmlofku7blpLnkuK3nmoTmiYDmnInotYTmupDjgILosIPnlKjlrozlkI7vvIzkvaDku43nhLbpnIDopoHpgJrov4cgYEJ1bmRsZS5sb2FkRGlyYCDmnaXlrozmiJDliqDovb3jgIJcbiAgICAgKiDlsLHnrpfpooTliqDovb3ov5jmsqHlrozmiJDvvIzkvaDkuZ/lj6/ku6Xnm7TmjqXosIPnlKggYEJ1bmRsZS5sb2FkRGlyYOOAglxuICAgICAqXG4gICAgICogQG1ldGhvZCBwcmVsb2FkRGlyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpciAtIHBhdGggb2YgdGhlIHRhcmdldCBmb2xkZXIuVGhlIHBhdGggaXMgcmVsYXRpdmUgdG8gdGhlIGJ1bmRsZSBmb2xkZXIsIGV4dGVuc2lvbnMgbXVzdCBiZSBvbWl0dGVkLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFt0eXBlXSAtIE9ubHkgYXNzZXQgb2YgdHlwZSB3aWxsIGJlIHByZWxvYWRlZCBpZiB0aGlzIGFyZ3VtZW50IGlzIHN1cHBsaWVkLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvblByb2dyZXNzXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiBwcm9ncmVzc2lvbiBjaGFuZ2UuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MuZmluaXNoIC0gVGhlIG51bWJlciBvZiB0aGUgaXRlbXMgdGhhdCBhcmUgYWxyZWFkeSBjb21wbGV0ZWQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MudG90YWwgLSBUaGUgdG90YWwgbnVtYmVyIG9mIHRoZSBpdGVtcy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb25Qcm9ncmVzcy5pdGVtIC0gVGhlIGxhdGVzdCByZXF1ZXN0IGl0ZW1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Db21wbGV0ZV0gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbCBhc3NldHMgaGF2ZSBiZWVuIGxvYWRlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLlxuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyb3IgLSBJZiBvbmUgb2YgdGhlIGFzc2V0IGZhaWxlZCwgdGhlIGNvbXBsZXRlIGNhbGxiYWNrIGlzIGltbWVkaWF0ZWx5IGNhbGxlZCB3aXRoIHRoZSBlcnJvci4gSWYgYWxsIGFzc2V0cyBhcmUgcHJlbG9hZGVkIHN1Y2Nlc3NmdWxseSwgZXJyb3Igd2lsbCBiZSBudWxsLlxuICAgICAqIEBwYXJhbSB7UmVxdWVzdEl0ZW1bXX0gb25Db21wbGV0ZS5pdGVtcyAtIEFuIGFycmF5IG9mIGFsbCBwcmVsb2FkZWQgaXRlbXMuXG4gICAgICogXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBwcmVsb2FkIGFsbCBhdWRpb3MgKHJlc291cmNlcy9hdWRpb3MvKSBcbiAgICAgKiBjYy5yZXNvdXJjZXMucHJlbG9hZERpcignYXVkaW9zJywgY2MuQXVkaW9DbGlwKTtcbiAgICAgKlxuICAgICAqIC8vIHByZWxvYWQgYWxsIHRleHR1cmVzIGluIFwicmVzb3VyY2VzL2ltZ3MvXCJcbiAgICAgKiBjYy5yZXNvdXJjZXMucHJlbG9hZERpcignaW1ncycsIGNjLlRleHR1cmUyRCk7XG4gICAgICogLy8gd2FpdCBmb3Igd2hpbGVcbiAgICAgKiBjYy5yZXNvdXJjZXMubG9hZERpcignaW1ncycsIGNjLlRleHR1cmUyRCwgKGVyciwgdGV4dHVyZXMpID0+IHt9KTtcbiAgICAgKiBcbiAgICAgKiAvLyBwcmVsb2FkIGFsbCBwcmVmYWJzICgke3Byb2plY3R9L2Fzc2V0cy9idW5kbGUxL21pc2MvY2hhcmFjdGVycy8pIGZyb20gYnVuZGxlMSBmb2xkZXJcbiAgICAgKiBidW5kbGUxLnByZWxvYWREaXIoJ21pc2MvY2hhcmFjdGVycycsIGNjLlByZWZhYik7XG4gICAgICpcbiAgICAgKiAvLyBwcmVsb2FkIGFsbCBzcHJpdGUgZnJhbWUgKCR7cHJvamVjdH0vYXNzZXRzL3NvbWUveHh4L2J1bmRsZTIvc2tpbGxzLykgZnJvbSBidW5kbGUyIGZvbGRlclxuICAgICAqIGJ1bmRsZTIucHJlbG9hZERpcignc2tpbGxzJywgY2MuU3ByaXRlRnJhbWUpO1xuICAgICAqIC8vIHdhaXQgZm9yIHdoaWxlXG4gICAgICogYnVuZGxlMi5sb2FkRGlyKCdza2lsbHMnLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgc3ByaXRlRnJhbWVzKSA9PiB7fSk7XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHByZWxvYWREaXIoZGlyOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCwgb25Qcm9ncmVzczogKGZpbmlzaDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBSZXF1ZXN0SXRlbSkgPT4gdm9pZCwgb25Db21wbGV0ZTogKGVycm9yOiBFcnJvciwgaXRlbXM6IFJlcXVlc3RJdGVtW10pID0+IHZvaWQpOiB2b2lkXG4gICAgICogcHJlbG9hZERpcihkaXI6IHN0cmluZywgb25Qcm9ncmVzczogKGZpbmlzaDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBSZXF1ZXN0SXRlbSkgPT4gdm9pZCwgb25Db21wbGV0ZTogKGVycm9yOiBFcnJvciwgaXRlbXM6IFJlcXVlc3RJdGVtW10pID0+IHZvaWQpOiB2b2lkXG4gICAgICogcHJlbG9hZERpcihkaXI6IHN0cmluZywgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBpdGVtczogUmVxdWVzdEl0ZW1bXSkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBwcmVsb2FkRGlyKGRpcjogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQpOiB2b2lkXG4gICAgICogcHJlbG9hZERpcihkaXI6IHN0cmluZywgb25Db21wbGV0ZTogKGVycm9yOiBFcnJvciwgaXRlbXM6IFJlcXVlc3RJdGVtW10pID0+IHZvaWQpOiB2b2lkXG4gICAgICogcHJlbG9hZERpcihkaXI6IHN0cmluZyk6IHZvaWRcbiAgICAgKi9cbiAgICBwcmVsb2FkRGlyIChkaXIsIHR5cGUsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpIHtcbiAgICAgICAgdmFyIHsgdHlwZSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSB9ID0gcGFyc2VMb2FkUmVzQXJncyh0eXBlLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKTtcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnByZWxvYWRBbnkoZGlyLCB7IF9fcmVxdWVzdFR5cGVfXzogUmVxdWVzdFR5cGUuRElSLCB0eXBlOiB0eXBlLCBidW5kbGU6IHRoaXMubmFtZSB9LCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBMb2FkcyB0aGUgc2NlbmUgd2l0aGluIHRoaXMgYnVuZGxlIGJ5IGl0cyBuYW1lLiAgXG4gICAgICogXG4gICAgICogISN6aCBcbiAgICAgKiDpgJrov4flnLrmma/lkI3np7DliqDovb3liIbljIXkuK3nmoTlnLrmma/jgIJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgbG9hZFNjZW5lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNjZW5lTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBzY2VuZSB0byBsb2FkLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBTb21lIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Qcm9ncmVzc10gLSBDYWxsYmFjayBpbnZva2VkIHdoZW4gcHJvZ3Jlc3Npb24gY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvblByb2dyZXNzLmZpbmlzaCAtIFRoZSBudW1iZXIgb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIGFscmVhZHkgY29tcGxldGVkLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvblByb2dyZXNzLnRvdGFsIC0gVGhlIHRvdGFsIG51bWJlciBvZiB0aGUgaXRlbXMuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9uUHJvZ3Jlc3MuaXRlbSAtIFRoZSBsYXRlc3QgcmVxdWVzdCBpdGVtXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uQ29tcGxldGVdIC0gY2FsbGJhY2ssIHdpbGwgYmUgY2FsbGVkIGFmdGVyIHNjZW5lIGxhdW5jaGVkLlxuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyIC0gVGhlIG9jY3VycmVkIGVycm9yLCBudWxsIGluZGljZXRlcyBzdWNjZXNzXG4gICAgICogQHBhcmFtIHtTY2VuZUFzc2V0fSBvbkNvbXBsZXRlLnNjZW5lQXNzZXQgLSBUaGUgc2NlbmUgYXNzZXRcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGJ1bmRsZTEubG9hZFNjZW5lKCdmaXJzdCcsIChlcnIsIHNjZW5lQXNzZXQpID0+IGNjLmRpcmVjdG9yLnJ1blNjZW5lKHNjZW5lQXNzZXQpKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGxvYWRTY2VuZShzY2VuZU5hbWU6IHN0cmluZywgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Qcm9ncmVzczogKGZpbmlzaDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBSZXF1ZXN0SXRlbSkgPT4gdm9pZCwgb25Db21wbGV0ZTogKGVycm9yOiBFcnJvciwgc2NlbmVBc3NldDogY2MuU2NlbmVBc3NldCkgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcsIG9uUHJvZ3Jlc3M6IChmaW5pc2g6IG51bWJlciwgdG90YWw6IG51bWJlciwgaXRlbTogUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIHNjZW5lQXNzZXQ6IGNjLlNjZW5lQXNzZXQpID0+IHZvaWQpOiB2b2lkXG4gICAgICogbG9hZFNjZW5lKHNjZW5lTmFtZTogc3RyaW5nLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBzY2VuZUFzc2V0OiBjYy5TY2VuZUFzc2V0KSA9PiB2b2lkKTogdm9pZFxuICAgICAqIGxvYWRTY2VuZShzY2VuZU5hbWU6IHN0cmluZywgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWRcbiAgICAgKiBsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIHNjZW5lQXNzZXQ6IGNjLlNjZW5lQXNzZXQpID0+IHZvaWQpOiB2b2lkXG4gICAgICogbG9hZFNjZW5lKHNjZW5lTmFtZTogc3RyaW5nKTogdm9pZFxuICAgICAqL1xuICAgIGxvYWRTY2VuZSAoc2NlbmVOYW1lLCBvcHRpb25zLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgIHZhciB7IG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUgfSA9IHBhcnNlUGFyYW1ldGVycyhvcHRpb25zLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKTtcbiAgICBcbiAgICAgICAgb3B0aW9ucy5wcmVzZXQgPSBvcHRpb25zLnByZXNldCB8fCAnc2NlbmUnO1xuICAgICAgICBvcHRpb25zLmJ1bmRsZSA9IHRoaXMubmFtZTtcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkoeyAnc2NlbmUnOiBzY2VuZU5hbWUgfSwgb3B0aW9ucywgb25Qcm9ncmVzcywgZnVuY3Rpb24gKGVyciwgc2NlbmVBc3NldCkge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNjLmVycm9yKGVyci5tZXNzYWdlLCBlcnIuc3RhY2spO1xuICAgICAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2NlbmVBc3NldCBpbnN0YW5jZW9mIGNjLlNjZW5lQXNzZXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2NlbmUgPSBzY2VuZUFzc2V0LnNjZW5lO1xuICAgICAgICAgICAgICAgIHNjZW5lLl9pZCA9IHNjZW5lQXNzZXQuX3V1aWQ7XG4gICAgICAgICAgICAgICAgc2NlbmUuX25hbWUgPSBzY2VuZUFzc2V0Ll9uYW1lO1xuICAgICAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShudWxsLCBzY2VuZUFzc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShuZXcgRXJyb3IoJ1RoZSBhc3NldCAnICsgc2NlbmVBc3NldC5fdXVpZCArICcgaXMgbm90IGEgc2NlbmUnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUHJlbG9hZHMgdGhlIHNjZW5lIHdpdGhpbiB0aGlzIGJ1bmRsZSBieSBpdHMgbmFtZS4gQWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCwgeW91IHN0aWxsIG5lZWQgdG8gZmluaXNoIGxvYWRpbmcgYnkgY2FsbGluZyBgQnVuZGxlLmxvYWRTY2VuZWAgb3IgYGNjLmRpcmVjdG9yLmxvYWRTY2VuZWAuXG4gICAgICogSXQgd2lsbCBiZSB0b3RhbGx5IGZpbmUgdG8gY2FsbCBgQnVuZGxlLmxvYWREaXJgIGF0IGFueSB0aW1lIGV2ZW4gaWYgdGhlIHByZWxvYWRpbmcgaXMgbm90IHlldCBmaW5pc2hlZFxuICAgICAqIFxuICAgICAqICEjemggXG4gICAgICog6YCa6L+H5Zy65pmv5ZCN56ew6aKE5Yqg6L295YiG5YyF5Lit55qE5Zy65pmvLuiwg+eUqOWujOWQju+8jOS9oOS7jeeEtumcgOimgemAmui/hyBgQnVuZGxlLmxvYWRTY2VuZWAg5oiWIGBjYy5kaXJlY3Rvci5sb2FkU2NlbmVgIOadpeWujOaIkOWKoOi9veOAglxuICAgICAqIOWwseeul+mihOWKoOi9vei/mOayoeWujOaIkO+8jOS9oOS5n+WPr+S7peebtOaOpeiwg+eUqCBgQnVuZGxlLmxvYWRTY2VuZWAg5oiWIGBjYy5kaXJlY3Rvci5sb2FkU2NlbmVg44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHByZWxvYWRTY2VuZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzY2VuZU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgc2NlbmUgdG8gcHJlbG9hZC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gU29tZSBvcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uUHJvZ3Jlc3NdIC0gY2FsbGJhY2ssIHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGxvYWQgcHJvZ3Jlc3Npb24gY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvblByb2dyZXNzLmZpbmlzaCAtIFRoZSBudW1iZXIgb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIGFscmVhZHkgY29tcGxldGVkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MudG90YWwgLSBUaGUgdG90YWwgbnVtYmVyIG9mIHRoZSBpdGVtc1xuICAgICAqIEBwYXJhbSB7UmVxdWVzdEl0ZW19IG9uUHJvZ3Jlc3MuaXRlbSBUaGUgbGF0ZXN0IHJlcXVlc3QgaXRlbVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIGNhbGxiYWNrLCB3aWxsIGJlIGNhbGxlZCBhZnRlciBzY2VuZSBsb2FkZWQuXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnJvciAtIG51bGwgb3IgdGhlIGVycm9yIG9iamVjdC5cbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGJ1bmRsZTEucHJlbG9hZFNjZW5lKCdmaXJzdCcpO1xuICAgICAqIC8vIHdhaXQgZm9yIGEgd2hpbGVcbiAgICAgKiBidW5kbGUxLmxvYWRTY2VuZSgnZmlyc3QnLCAoZXJyLCBzY2VuZSkgPT4gY2MuZGlyZWN0b3IucnVuU2NlbmUoc2NlbmUpKTtcbiAgICAgKiBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHByZWxvYWRTY2VuZShzY2VuZU5hbWU6IHN0cmluZywgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Qcm9ncmVzczogKGZpbmlzaDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBSZXF1ZXN0SXRlbSkgPT4gdm9pZCwgb25Db21wbGV0ZTogKGVycm9yOiBFcnJvcikgPT4gdm9pZCk6IHZvaWRcbiAgICAgKiBwcmVsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcsIG9uUHJvZ3Jlc3M6IChmaW5pc2g6IG51bWJlciwgdG90YWw6IG51bWJlciwgaXRlbTogUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IpID0+IHZvaWQpOiB2b2lkXG4gICAgICogcHJlbG9hZFNjZW5lKHNjZW5lTmFtZTogc3RyaW5nLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yKSA9PiB2b2lkKTogdm9pZFxuICAgICAqIHByZWxvYWRTY2VuZShzY2VuZU5hbWU6IHN0cmluZywgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWRcbiAgICAgKiBwcmVsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IpID0+IHZvaWQpOiB2b2lkXG4gICAgICogcHJlbG9hZFNjZW5lKHNjZW5lTmFtZTogc3RyaW5nKTogdm9pZFxuICAgICAqL1xuICAgIHByZWxvYWRTY2VuZSAoc2NlbmVOYW1lLCBvcHRpb25zLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKSB7XG4gICAgICAgIHZhciB7IG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUgfSA9IHBhcnNlUGFyYW1ldGVycyhvcHRpb25zLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKTtcblxuICAgICAgICBvcHRpb25zLmJ1bmRsZSA9IHRoaXMubmFtZTtcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnByZWxvYWRBbnkoeydzY2VuZSc6IHNjZW5lTmFtZX0sIG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDEyMTAsIHNjZW5lTmFtZSwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKGVycik7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IGFzc2V0IHdpdGhpbiB0aGlzIGJ1bmRsZSBieSBwYXRoIGFuZCB0eXBlLiA8YnI+XG4gICAgICogQWZ0ZXIgeW91IGxvYWQgYXNzZXQgd2l0aCB7eyNjcm9zc0xpbmsgXCJCdW5kbGUvbG9hZDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gb3Ige3sjY3Jvc3NMaW5rIFwiQnVuZGxlL2xvYWREaXI6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319LFxuICAgICAqIHlvdSBjYW4gYWNxdWlyZSB0aGVtIGJ5IHBhc3NpbmcgdGhlIHBhdGggdG8gdGhpcyBBUEkuXG4gICAgICogXG4gICAgICogISN6aFxuICAgICAqIOmAmui/h+i3r+W+hOS4juexu+Wei+iOt+WPlui1hOa6kOOAguWcqOS9oOS9v+eUqCB7eyNjcm9zc0xpbmsgXCJCdW5kbGUvbG9hZDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0g5oiW6ICFIHt7I2Nyb3NzTGluayBcIkJ1bmRsZS9sb2FkRGlyOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSDkuYvlkI7vvIxcbiAgICAgKiDkvaDog73pgJrov4fkvKDot6/lvoTpgJrov4fov5nkuKogQVBJIOiOt+WPluWIsOi/meS6m+i1hOa6kOOAglxuICAgICAqIFxuICAgICAqIEBtZXRob2QgZ2V0XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggLSBUaGUgcGF0aCBvZiBhc3NldFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFt0eXBlXSAtIE9ubHkgYXNzZXQgb2YgdHlwZSB3aWxsIGJlIHJldHVybmVkIGlmIHRoaXMgYXJndW1lbnQgaXMgc3VwcGxpZWQuXG4gICAgICogQHJldHVybnMge0Fzc2V0fSBcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGJ1bmRsZTEuZ2V0KCdtdXNpYy9oaXQnLCBjYy5BdWRpb0NsaXApO1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZ2V0IChwYXRoOiBzdHJpbmcsIHR5cGU/OiB0eXBlb2YgY2MuQXNzZXQpOiBjYy5Bc3NldFxuICAgICAqL1xuICAgIGdldCAocGF0aCwgdHlwZSkge1xuICAgICAgICB2YXIgaW5mbyA9IHRoaXMuZ2V0SW5mb1dpdGhQYXRoKHBhdGgsIHR5cGUpO1xuICAgICAgICByZXR1cm4gYXNzZXRzLmdldChpbmZvICYmIGluZm8udXVpZCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogUmVsZWFzZSB0aGUgYXNzZXQgbG9hZGVkIGJ5IHt7I2Nyb3NzTGluayBcIkJ1bmRsZS9sb2FkOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBvciB7eyNjcm9zc0xpbmsgXCJCdW5kbGUvbG9hZERpcjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gYW5kIGl0J3MgZGVwZW5kZW5jaWVzLiBcbiAgICAgKiBSZWZlciB0byB7eyNjcm9zc0xpbmsgXCJBc3NldE1hbmFnZXIvcmVsZWFzZUFzc2V0Om1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBmb3IgZGV0YWlsZWQgaW5mb3JtYXRpb25zLlxuICAgICAqIFxuICAgICAqICEjemggXG4gICAgICog6YeK5pS+6YCa6L+HIHt7I2Nyb3NzTGluayBcIkJ1bmRsZS9sb2FkOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSDmiJbogIUge3sjY3Jvc3NMaW5rIFwiQnVuZGxlL2xvYWREaXI6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IOWKoOi9veeahOi1hOa6kOOAguivpue7huS/oeaBr+ivt+WPguiAgyB7eyNjcm9zc0xpbmsgXCJBc3NldE1hbmFnZXIvcmVsZWFzZUFzc2V0Om1ldGhvZFwifX17ey9jcm9zc0xpbmt9fVxuICAgICAqIFxuICAgICAqIEBtZXRob2QgcmVsZWFzZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIC0gVGhlIHBhdGggb2YgYXNzZXRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHlwZV0gLSBPbmx5IGFzc2V0IG9mIHR5cGUgd2lsbCBiZSByZWxlYXNlZCBpZiB0aGlzIGFyZ3VtZW50IGlzIHN1cHBsaWVkLlxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gcmVsZWFzZSBhIHRleHR1cmUgd2hpY2ggaXMgbm8gbG9uZ2VyIG5lZWRcbiAgICAgKiBidW5kbGUxLnJlbGVhc2UoJ21pc2MvY2hhcmFjdGVyL2NvY29zJyk7XG4gICAgICpcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHJlbGVhc2UocGF0aDogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQpOiB2b2lkXG4gICAgICogcmVsZWFzZShwYXRoOiBzdHJpbmcpOiB2b2lkXG4gICAgICovXG4gICAgcmVsZWFzZSAocGF0aCwgdHlwZSkge1xuICAgICAgICByZWxlYXNlTWFuYWdlci50cnlSZWxlYXNlKHRoaXMuZ2V0KHBhdGgsIHR5cGUpLCB0cnVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBSZWxlYXNlIGFsbCB1bnVzZWQgYXNzZXRzIHdpdGhpbiB0aGlzIGJ1bmRsZS4gUmVmZXIgdG8ge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBbGw6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbnMuXG4gICAgICogXG4gICAgICogISN6aCBcbiAgICAgKiDph4rmlL7mraTljIXkuK3nmoTmiYDmnInmsqHmnInnlKjliLDnmoTotYTmupDjgILor6bnu4bkv6Hmga/or7flj4LogIMge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBbGw6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHJlbGVhc2VVbnVzZWRBc3NldHNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gcmVsZWFzZSBhbGwgdW51c2VkIGFzc2V0IHdpdGhpbiBidW5kbGUxXG4gICAgICogYnVuZGxlMS5yZWxlYXNlVW51c2VkQXNzZXRzKCk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByZWxlYXNlVW51c2VkQXNzZXRzKCk6IHZvaWRcbiAgICAgKi9cbiAgICByZWxlYXNlVW51c2VkQXNzZXRzICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBhc3NldHMuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXQpIHtcbiAgICAgICAgICAgIGxldCBpbmZvID0gc2VsZi5nZXRBc3NldEluZm8oYXNzZXQuX3V1aWQpO1xuICAgICAgICAgICAgaWYgKGluZm8gJiYgIWluZm8ucmVkaXJlY3QpIHtcbiAgICAgICAgICAgICAgICByZWxlYXNlTWFuYWdlci50cnlSZWxlYXNlKGFzc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogUmVsZWFzZSBhbGwgYXNzZXRzIHdpdGhpbiB0aGlzIGJ1bmRsZS4gUmVmZXIgdG8ge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBbGw6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbnMuXG4gICAgICogXG4gICAgICogISN6aCBcbiAgICAgKiDph4rmlL7mraTljIXkuK3nmoTmiYDmnInotYTmupDjgILor6bnu4bkv6Hmga/or7flj4LogIMge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBbGw6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHJlbGVhc2VBbGxcbiAgICAgKiBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIHJlbGVhc2UgYWxsIGFzc2V0IHdpdGhpbiBidW5kbGUxXG4gICAgICogYnVuZGxlMS5yZWxlYXNlQWxsKCk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByZWxlYXNlQWxsKCk6IHZvaWRcbiAgICAgKi9cbiAgICByZWxlYXNlQWxsICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBhc3NldHMuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXQpIHtcbiAgICAgICAgICAgIGxldCBpbmZvID0gc2VsZi5nZXRBc3NldEluZm8oYXNzZXQuX3V1aWQpO1xuICAgICAgICAgICAgaWYgKGluZm8gJiYgIWluZm8ucmVkaXJlY3QpIHtcbiAgICAgICAgICAgICAgICByZWxlYXNlTWFuYWdlci50cnlSZWxlYXNlKGFzc2V0LCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIF9kZXN0cm95ICgpIHtcbiAgICAgICAgdGhpcy5fY29uZmlnLmRlc3Ryb3koKTtcbiAgICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQnVuZGxlOyJdLCJzb3VyY2VSb290IjoiLyJ9