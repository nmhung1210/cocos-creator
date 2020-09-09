
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/package.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}module.exports = {
  "name": "cocos-creator-js",
  "version": "2.4.1",
  "description": "Cocos Creator is a complete package of game development tools and workflow, including a game engine, resource management, scene editing, game preview, debug and publish one project to multiple platforms.",
  "homepage": "https://www.cocos.com",
  "license": "MIT",
  "scripts": {
    "test": "gulp test-in-ci",
    "build-chunks": "node ./cocos2d/renderer/build/build-chunks",
    "build-mapping": "node ./cocos2d/renderer/build/build-mapping"
  },
  "devDependencies": {
    "@babel/core": "^7.4.4",
    "@babel/plugin-proposal-class-properties": "^7.1.0",
    "@babel/plugin-proposal-decorators": "^7.1.6",
    "@babel/preset-env": "^7.1.6",
    "@babel/preset-typescript": "^7.1.0",
    "babel-plugin-add-module-exports": "^0.2.1",
    "babel-plugin-parser-opts": "1.0.1",
    "babel-plugin-transform-export-extensions": "^6.22.0",
    "aliasify": "^2.1.0",
    "async": "1.5.2",
    "babelify": "10.0.0",
    "browserify": "13.0.0",
    "chalk": "1.1.0",
    "del": "3.0.0",
    "event-stream": "3.3.2",
    "fire-fs": "0.2.1",
    "glsl-tokenizer": "2.1.5",
    "gulp": "^4.0.2",
    "gulp-babel": "^8.0.0",
    "gulp-cached": "1.1.0",
    "gulp-concat": "2.6.0",
    "gulp-fb": "0.5.1",
    "gulp-header": "1.2.2",
    "gulp-jshint": "1.11.2",
    "gulp-mirror": "0.4.0",
    "gulp-optimize-js": "^1.1.0",
    "gulp-plumber": "0.6.6",
    "gulp-rename": "1.2.2",
    "gulp-shell": "0.4.1",
    "gulp-size": "2.1.0",
    "gulp-sourcemaps": "2.6.5",
    "gulp-uglify": "^3.0.0",
    "gulp-util": "3.0.6",
    "js-sha1": "^0.6.0",
    "jshint-stylish": "2.1.0",
    "multipipe": "0.3.0",
    "persistify": "^1.1.1",
    "require-dir": "0.3.0",
    "rollup": "^0.66.6",
    "rollup-plugin-node-resolve": "3.4.0",
    "uglify-es": "3.3.7",
    "vinyl": "1.1.0",
    "vinyl-buffer": "1.0.1",
    "vinyl-source-stream": "2.0.0",
    "watchify": "3.7.0"
  }
}

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