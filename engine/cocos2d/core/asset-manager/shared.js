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
const Cache = require('./cache');
const Pipeline = require('./pipeline');

var assets = new Cache();
var files = new Cache();
var parsed = new Cache();
var bundles = new Cache();
var pipeline = new Pipeline('normal load', []);
var fetchPipeline = new Pipeline('fetch', []);
var transformPipeline = new Pipeline('transform url', []);

/**
 * @module cc.AssetManager
 */

var RequestType = {
    
    UUID: 'uuid',

    PATH: 'path',

    DIR: 'dir',

    URL: 'url',

    SCENE: 'scene'
};

/**
 * !#en
 * The builtin bundles 
 * 
 * !#zh
 * 内置 bundle
 * 
 * @enum BuiltinBundleName
 */
var BuiltinBundleName = {
    /**
     * !#en
     * The builtin bundle corresponds to 'assets/resources'.
     * 
     * !#zh
     * 内置 bundle, 对应 'assets/resources' 目录
     * 
     * @property RESOURCES
     * @readonly
     * @type {String}
     */
    RESOURCES: 'resources',

    /**
     * !#en
     * The builtin bundle corresponds to 'internal/resources'.
     * 
     * !#zh
     * 内置 bundle, 对应 'internal/resources' 目录
     * 
     * @property INTERNAL
     * @readonly
     * @type {String}
     */
    INTERNAL: 'internal',

    /**
     * !#en
     * The builtin bundle
     * 
     * !#zh
     * 内置 bundle
     * 
     * @property MAIN
     * @readonly
     * @type {String}
     */
    MAIN: 'main',

    /**
     * !#en
     * The builtin bundle, exists when Start Scene asset bundle is checked on the project building panel
     * 
     * !#zh
     * 内置 bundle, 如果构建面板开启了首场景分包，则会有 START_SCENE bundle
     * 
     * @property START_SCENE
     * @readonly
     * @type {String}
     */
    START_SCENE: 'start-scene',
};

module.exports = { assets, files, parsed, pipeline, fetchPipeline, transformPipeline, RequestType, bundles, BuiltinBundleName };