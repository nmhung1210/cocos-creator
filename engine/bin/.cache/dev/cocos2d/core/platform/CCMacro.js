
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCMacro.js';
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

/**
 * Predefined constants
 * @class macro
 * @static
 */
cc.macro = {
  /**
   * PI / 180
   * @property RAD
   * @type {Number}
   */
  RAD: Math.PI / 180,

  /**
   * One degree
   * @property DEG
   * @type {Number}
   */
  DEG: 180 / Math.PI,

  /**
   * @property REPEAT_FOREVER
   * @type {Number}
   */
  REPEAT_FOREVER: Number.MAX_VALUE - 1,

  /**
   * @property FLT_EPSILON
   * @type {Number}
   */
  FLT_EPSILON: 0.0000001192092896,

  /**
   * Minimum z index value for node
   * @property MIN_ZINDEX
   * @type {Number}
   */
  MIN_ZINDEX: -Math.pow(2, 15),

  /**
   * Maximum z index value for node
   * @property MAX_ZINDEX
   * @type {Number}
   */
  MAX_ZINDEX: Math.pow(2, 15) - 1,
  //some gl constant variable

  /**
   * @property ONE
   * @type {Number}
   */
  ONE: 1,

  /**
   * @property ZERO
   * @type {Number}
   */
  ZERO: 0,

  /**
   * @property SRC_ALPHA
   * @type {Number}
   */
  SRC_ALPHA: 0x0302,

  /**
   * @property SRC_ALPHA_SATURATE
   * @type {Number}
   */
  SRC_ALPHA_SATURATE: 0x308,

  /**
   * @property SRC_COLOR
   * @type {Number}
   */
  SRC_COLOR: 0x300,

  /**
   * @property DST_ALPHA
   * @type {Number}
   */
  DST_ALPHA: 0x304,

  /**
   * @property DST_COLOR
   * @type {Number}
   */
  DST_COLOR: 0x306,

  /**
   * @property ONE_MINUS_SRC_ALPHA
   * @type {Number}
   */
  ONE_MINUS_SRC_ALPHA: 0x0303,

  /**
   * @property ONE_MINUS_SRC_COLOR
   * @type {Number}
   */
  ONE_MINUS_SRC_COLOR: 0x301,

  /**
   * @property ONE_MINUS_DST_ALPHA
   * @type {Number}
   */
  ONE_MINUS_DST_ALPHA: 0x305,

  /**
   * @property ONE_MINUS_DST_COLOR
   * @type {Number}
   */
  ONE_MINUS_DST_COLOR: 0x0307,

  /**
   * @property ONE_MINUS_CONSTANT_ALPHA
   * @type {Number}
   */
  ONE_MINUS_CONSTANT_ALPHA: 0x8004,

  /**
   * @property ONE_MINUS_CONSTANT_COLOR
   * @type {Number}
   */
  ONE_MINUS_CONSTANT_COLOR: 0x8002,
  //Possible device orientations

  /**
   * Oriented vertically
   * @property ORIENTATION_PORTRAIT
   * @type {Number}
   */
  ORIENTATION_PORTRAIT: 1,

  /**
   * Oriented horizontally
   * @property ORIENTATION_LANDSCAPE
   * @type {Number}
   */
  ORIENTATION_LANDSCAPE: 2,

  /**
   * Oriented automatically
   * @property ORIENTATION_AUTO
   * @type {Number}
   */
  ORIENTATION_AUTO: 3,
  DENSITYDPI_DEVICE: 'device-dpi',
  DENSITYDPI_HIGH: 'high-dpi',
  DENSITYDPI_MEDIUM: 'medium-dpi',
  DENSITYDPI_LOW: 'low-dpi',
  // General configurations

  /**
   * <p>
   *   If enabled, the texture coordinates will be calculated by using this formula: <br/>
   *      - texCoord.left = (rect.x*2+1) / (texture.wide*2);                  <br/>
   *      - texCoord.right = texCoord.left + (rect.width*2-2)/(texture.wide*2); <br/>
   *                                                                                 <br/>
   *  The same for bottom and top.                                                   <br/>
   *                                                                                 <br/>
   *  This formula prevents artifacts by using 99% of the texture.                   <br/>
   *  The "correct" way to prevent artifacts is by expand the texture's border with the same color by 1 pixel<br/>
   *                                                                                  <br/>
   *  Affected component:                                                                 <br/>
   *      - cc.TMXLayer                                                       <br/>
   *                                                                                  <br/>
   *  Enabled by default. To disabled set it to 0. <br/>
   *  To modify it, in Web engine please refer to CCMacro.js, in JSB please refer to CCConfig.h
   * </p>
   *
   * @property {Number} FIX_ARTIFACTS_BY_STRECHING_TEXEL_TMX
   */
  FIX_ARTIFACTS_BY_STRECHING_TEXEL_TMX: true,

  /**
   * Position of the FPS (Default: 0,0 (bottom-left corner))<br/>
   * To modify it, in Web engine please refer to CCMacro.js, in JSB please refer to CCConfig.h
   * @property {Vec2} DIRECTOR_STATS_POSITION
   */
  DIRECTOR_STATS_POSITION: cc.v2(0, 0),

  /**
   * <p>
   *    If enabled, actions that alter the position property (eg: CCMoveBy, CCJumpBy, CCBezierBy, etc..) will be stacked.                  <br/>
   *    If you run 2 or more 'position' actions at the same time on a node, then end position will be the sum of all the positions.        <br/>
   *    If disabled, only the last run action will take effect.
   * </p>
   * @property {Number} ENABLE_STACKABLE_ACTIONS
   */
  ENABLE_STACKABLE_ACTIONS: true,

  /**
   * !#en 
   * The timeout to determine whether a touch is no longer active and should be removed.
   * The reason to add this timeout is due to an issue in X5 browser core, 
   * when X5 is presented in wechat on Android, if a touch is glissed from the bottom up, and leave the page area,
   * no touch cancel event is triggered, and the touch will be considered active forever. 
   * After multiple times of this action, our maximum touches number will be reached and all new touches will be ignored.
   * So this new mechanism can remove the touch that should be inactive if it's not updated during the last 5000 milliseconds.
   * Though it might remove a real touch if it's just not moving for the last 5 seconds which is not easy with the sensibility of mobile touch screen.
   * You can modify this value to have a better behavior if you find it's not enough.
   * !#zh
   * 用于甄别一个触点对象是否已经失效并且可以被移除的延时时长
   * 添加这个时长的原因是 X5 内核在微信浏览器中出现的一个 bug。
   * 在这个环境下，如果用户将一个触点从底向上移出页面区域，将不会触发任何 touch cancel 或 touch end 事件，而这个触点会被永远当作停留在页面上的有效触点。
   * 重复这样操作几次之后，屏幕上的触点数量将达到我们的事件系统所支持的最高触点数量，之后所有的触摸事件都将被忽略。
   * 所以这个新的机制可以在触点在一定时间内没有任何更新的情况下视为失效触点并从事件系统中移除。
   * 当然，这也可能移除一个真实的触点，如果用户的触点真的在一定时间段内完全没有移动（这在当前手机屏幕的灵敏度下会很难）。
   * 你可以修改这个值来获得你需要的效果，默认值是 5000 毫秒。
   * @property {Number} TOUCH_TIMEOUT
   */
  TOUCH_TIMEOUT: 5000,

  /**
   * !#en 
   * The maximum vertex count for a single batched draw call.
   * !#zh
   * 最大可以被单次批处理渲染的顶点数量。
   * @property {Number} BATCH_VERTEX_COUNT
   */
  BATCH_VERTEX_COUNT: 20000,

  /**
   * !#en 
   * Whether or not enabled tiled map auto culling. If you set the TiledMap skew or rotation, then need to manually disable this, otherwise, the rendering will be wrong.
   * !#zh
   * 是否开启瓦片地图的自动裁减功能。瓦片地图如果设置了 skew, rotation 或者采用了摄像机的话，需要手动关闭，否则渲染会出错。
   * @property {Boolean} ENABLE_TILEDMAP_CULLING
   * @default true
   */
  ENABLE_TILEDMAP_CULLING: true,

  /**
   * !#en 
   * Boolean that indicates if the canvas contains an alpha channel, default sets to false for better performance.
   * Though if you want to make your canvas background transparent and show other dom elements at the background, 
   * you can set it to true before `cc.game.run`.
   * Web only.
   * !#zh
   * 用于设置 Canvas 背景是否支持 alpha 通道，默认为 false，这样可以有更高的性能表现。
   * 如果你希望 Canvas 背景是透明的，并显示背后的其他 DOM 元素，你可以在 `cc.game.run` 之前将这个值设为 true。
   * 仅支持 Web
   * @property {Boolean} ENABLE_TRANSPARENT_CANVAS
   * @default false
   */
  ENABLE_TRANSPARENT_CANVAS: false,

  /**
   * !#en
   * Boolean that indicates if the WebGL context is created with `antialias` option turned on, default value is false.
   * Set it to true could make your game graphics slightly smoother, like texture hard edges when rotated.
   * Whether to use this really depend on your game design and targeted platform, 
   * device with retina display usually have good detail on graphics with or without this option, 
   * you probably don't want antialias if your game style is pixel art based.
   * Also, it could have great performance impact with some browser / device using software MSAA.
   * You can set it to true before `cc.game.run`.
   * Web only.
   * !#zh
   * 用于设置在创建 WebGL Context 时是否开启抗锯齿选项，默认值是 false。
   * 将这个选项设置为 true 会让你的游戏画面稍稍平滑一些，比如旋转硬边贴图时的锯齿。是否开启这个选项很大程度上取决于你的游戏和面向的平台。
   * 在大多数拥有 retina 级别屏幕的设备上用户往往无法区分这个选项带来的变化；如果你的游戏选择像素艺术风格，你也多半不会想开启这个选项。
   * 同时，在少部分使用软件级别抗锯齿算法的设备或浏览器上，这个选项会对性能产生比较大的影响。
   * 你可以在 `cc.game.run` 之前设置这个值，否则它不会生效。
   * 仅支持 Web
   * @property {Boolean} ENABLE_WEBGL_ANTIALIAS
   * @default false
   */
  ENABLE_WEBGL_ANTIALIAS: false,

  /**
   * !#en
   * Whether or not enable auto culling.
   * This feature have been removed in v2.0 new renderer due to overall performance consumption.
   * We have no plan currently to re-enable auto culling.
   * If your game have more dynamic objects, we suggest to disable auto culling.
   * If your game have more static objects, we suggest to enable auto culling.
   * !#zh
   * 是否开启自动裁减功能，开启裁减功能将会把在屏幕外的物体从渲染队列中去除掉。
   * 这个功能在 v2.0 的新渲染器中被移除了，因为它在大多数游戏中所带来的损耗要高于性能的提升，目前我们没有计划重新支持自动裁剪。
   * 如果游戏中的动态物体比较多的话，建议将此选项关闭。
   * 如果游戏中的静态物体比较多的话，建议将此选项打开。
   * @property {Boolean} ENABLE_CULLING
   * @deprecated since v2.0
   * @default false
   */
  ENABLE_CULLING: false,

  /**
   * !#en
   * Whether to clear the original image cache after uploaded a texture to GPU. If cleared, [Dynamic Atlas](https://docs.cocos.com/creator/manual/en/advanced-topics/dynamic-atlas.html) will not be supported.
   * Normally you don't need to enable this option on the web platform, because Image object doesn't consume too much memory.
   * But on WeChat Game platform, the current version cache decoded data in Image object, which has high memory usage.
   * So we enabled this option by default on WeChat, so that we can release Image cache immediately after uploaded to GPU.
   * !#zh
   * 是否在将贴图上传至 GPU 之后删除原始图片缓存，删除之后图片将无法进行 [动态合图](https://docs.cocos.com/creator/manual/zh/advanced-topics/dynamic-atlas.html)。
   * 在 Web 平台，你通常不需要开启这个选项，因为在 Web 平台 Image 对象所占用的内存很小。
   * 但是在微信小游戏平台的当前版本，Image 对象会缓存解码后的图片数据，它所占用的内存空间很大。
   * 所以我们在微信平台默认开启了这个选项，这样我们就可以在上传 GL 贴图之后立即释放 Image 对象的内存，避免过高的内存占用。
   * @property {Boolean} CLEANUP_IMAGE_CACHE
   * @default false
   */
  CLEANUP_IMAGE_CACHE: false,

  /**
   * !#en
   * Whether or not show mesh wire frame.
   * !#zh
   * 是否显示网格的线框。
   * @property {Boolean} SHOW_MESH_WIREFRAME
   * @default false
   */
  SHOW_MESH_WIREFRAME: false,

  /**
   * !#en
   * Whether or not show mesh normal.
   * !#zh
   * 是否显示网格的法线。
   * @property {Boolean} SHOW_MESH_NORMAL
   * @default false
   */
  SHOW_MESH_NORMAL: false,

  /**
   * !#en
   * Whether to enable multi-touch.
   * !#zh
   * 是否开启多点触摸
   * @property {Boolean} ENABLE_MULTI_TOUCH
   * @default true
   */
  ENABLE_MULTI_TOUCH: true,

  /**
   * References: 
   * https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap
   * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap
   * 
   * !#en
   * Whether to use image bitmap first. If enabled, memory usage will increase.
   * 
   * !#zh
   * 是否优先使用 image bitmap，启用之后，内存占用会变高
   * 
   * @property {Boolean} ALLOW_IMAGE_BITMAP
   * @default true
   */
  ALLOW_IMAGE_BITMAP: !cc.sys.isMobile
};
Object.defineProperty(cc.macro, 'ROTATE_ACTION_CCW', {
  set: function set(value) {
    if (cc.RotateTo && cc.RotateBy) {
      cc.RotateTo._reverse = cc.RotateBy._reverse = value;
    }
  }
});
var SUPPORT_TEXTURE_FORMATS = ['.pkm', '.pvr', '.webp', '.jpg', '.jpeg', '.bmp', '.png'];
/**
 * !#en
 * The image format supported by the engine defaults, and the supported formats may differ in different build platforms and device types.
 * Currently all platform and device support ['.webp', '.jpg', '.jpeg', '.bmp', '.png'], The iOS mobile platform also supports the PVR format。
 * !#zh
 * 引擎默认支持的图片格式，支持的格式可能在不同的构建平台和设备类型上有所差别。
 * 目前所有平台和设备支持的格式有 ['.webp', '.jpg', '.jpeg', '.bmp', '.png']. 另外 Ios 手机平台还额外支持了 PVR 格式。
 * @property {String[]} SUPPORT_TEXTURE_FORMATS
 */

cc.macro.SUPPORT_TEXTURE_FORMATS = SUPPORT_TEXTURE_FORMATS;
/**
 * !#en Key map for keyboard event
 * !#zh 键盘事件的按键值
 * @enum macro.KEY
 * @example {@link cocos2d/core/platform/CCCommon/KEY.js}
 */

cc.macro.KEY = {
  /**
   * !#en None
   * !#zh 没有分配
   * @property none
   * @type {Number}
   * @readonly
   */
  none: 0,
  // android

  /**
   * !#en The back key
   * !#zh 返回键
   * @property back
   * @type {Number}
   * @readonly
   */
  back: 6,

  /**
   * !#en The menu key
   * !#zh 菜单键
   * @property menu
   * @type {Number}
   * @readonly
   */
  menu: 18,

  /**
   * !#en The backspace key
   * !#zh 退格键
   * @property backspace
   * @type {Number}
   * @readonly
   */
  backspace: 8,

  /**
   * !#en The tab key
   * !#zh Tab 键
   * @property tab
   * @type {Number}
   * @readonly
   */
  tab: 9,

  /**
   * !#en The enter key
   * !#zh 回车键
   * @property enter
   * @type {Number}
   * @readonly
   */
  enter: 13,

  /**
   * !#en The shift key
   * !#zh Shift 键
   * @property shift
   * @type {Number}
   * @readonly
   */
  shift: 16,
  //should use shiftkey instead

  /**
   * !#en The ctrl key
   * !#zh Ctrl 键
   * @property ctrl
   * @type {Number}
   * @readonly
   */
  ctrl: 17,
  //should use ctrlkey

  /**
   * !#en The alt key
   * !#zh Alt 键
   * @property alt
   * @type {Number}
   * @readonly
   */
  alt: 18,
  //should use altkey

  /**
   * !#en The pause key
   * !#zh 暂停键
   * @property pause
   * @type {Number}
   * @readonly
   */
  pause: 19,

  /**
   * !#en The caps lock key
   * !#zh 大写锁定键
   * @property capslock
   * @type {Number}
   * @readonly
   */
  capslock: 20,

  /**
   * !#en The esc key
   * !#zh ESC 键
   * @property escape
   * @type {Number}
   * @readonly
   */
  escape: 27,

  /**
   * !#en The space key
   * !#zh 空格键
   * @property space
   * @type {Number}
   * @readonly
   */
  space: 32,

  /**
   * !#en The page up key
   * !#zh 向上翻页键
   * @property pageup
   * @type {Number}
   * @readonly
   */
  pageup: 33,

  /**
   * !#en The page down key
   * !#zh 向下翻页键
   * @property pagedown
   * @type {Number}
   * @readonly
   */
  pagedown: 34,

  /**
   * !#en The end key
   * !#zh 结束键
   * @property end
   * @type {Number}
   * @readonly
   */
  end: 35,

  /**
   * !#en The home key
   * !#zh 主菜单键
   * @property home
   * @type {Number}
   * @readonly
   */
  home: 36,

  /**
   * !#en The left key
   * !#zh 向左箭头键
   * @property left
   * @type {Number}
   * @readonly
   */
  left: 37,

  /**
   * !#en The up key
   * !#zh 向上箭头键
   * @property up
   * @type {Number}
   * @readonly
   */
  up: 38,

  /**
   * !#en The right key
   * !#zh 向右箭头键
   * @property right
   * @type {Number}
   * @readonly
   */
  right: 39,

  /**
   * !#en The down key
   * !#zh 向下箭头键
   * @property down
   * @type {Number}
   * @readonly
   */
  down: 40,

  /**
   * !#en The select key
   * !#zh Select 键
   * @property select
   * @type {Number}
   * @readonly
   */
  select: 41,

  /**
   * !#en The insert key
   * !#zh 插入键
   * @property insert
   * @type {Number}
   * @readonly
   */
  insert: 45,

  /**
   * !#en The Delete key
   * !#zh 删除键
   * @property Delete
   * @type {Number}
   * @readonly
   */
  Delete: 46,

  /**
   * !#en The '0' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 0 键
   * @property 0
   * @type {Number}
   * @readonly
   */
  0: 48,

  /**
   * !#en The '1' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 1 键
   * @property 1
   * @type {Number}
   * @readonly
   */
  1: 49,

  /**
   * !#en The '2' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 2 键
   * @property 2
   * @type {Number}
   * @readonly
   */
  2: 50,

  /**
   * !#en The '3' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 3 键
   * @property 3
   * @type {Number}
   * @readonly
   */
  3: 51,

  /**
   * !#en The '4' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 4 键
   * @property 4
   * @type {Number}
   * @readonly
   */
  4: 52,

  /**
   * !#en The '5' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 5 键
   * @property 5
   * @type {Number}
   * @readonly
   */
  5: 53,

  /**
   * !#en The '6' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 6 键
   * @property 6
   * @type {Number}
   * @readonly
   */
  6: 54,

  /**
   * !#en The '7' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 7 键
   * @property 7
   * @type {Number}
   * @readonly
   */
  7: 55,

  /**
   * !#en The '8' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 8 键
   * @property 8
   * @type {Number}
   * @readonly
   */
  8: 56,

  /**
   * !#en The '9' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 9 键
   * @property 9
   * @type {Number}
   * @readonly
   */
  9: 57,

  /**
   * !#en The a key
   * !#zh A 键
   * @property a
   * @type {Number}
   * @readonly
   */
  a: 65,

  /**
   * !#en The b key
   * !#zh B 键
   * @property b
   * @type {Number}
   * @readonly
   */
  b: 66,

  /**
   * !#en The c key
   * !#zh C 键
   * @property c
   * @type {Number}
   * @readonly
   */
  c: 67,

  /**
   * !#en The d key
   * !#zh D 键
   * @property d
   * @type {Number}
   * @readonly
   */
  d: 68,

  /**
   * !#en The e key
   * !#zh E 键
   * @property e
   * @type {Number}
   * @readonly
   */
  e: 69,

  /**
   * !#en The f key
   * !#zh F 键
   * @property f
   * @type {Number}
   * @readonly
   */
  f: 70,

  /**
   * !#en The g key
   * !#zh G 键
   * @property g
   * @type {Number}
   * @readonly
   */
  g: 71,

  /**
   * !#en The h key
   * !#zh H 键
   * @property h
   * @type {Number}
   * @readonly
   */
  h: 72,

  /**
   * !#en The i key
   * !#zh I 键
   * @property i
   * @type {Number}
   * @readonly
   */
  i: 73,

  /**
   * !#en The j key
   * !#zh J 键
   * @property j
   * @type {Number}
   * @readonly
   */
  j: 74,

  /**
   * !#en The k key
   * !#zh K 键
   * @property k
   * @type {Number}
   * @readonly
   */
  k: 75,

  /**
   * !#en The l key
   * !#zh L 键
   * @property l
   * @type {Number}
   * @readonly
   */
  l: 76,

  /**
   * !#en The m key
   * !#zh M 键
   * @property m
   * @type {Number}
   * @readonly
   */
  m: 77,

  /**
   * !#en The n key
   * !#zh N 键
   * @property n
   * @type {Number}
   * @readonly
   */
  n: 78,

  /**
   * !#en The o key
   * !#zh O 键
   * @property o
   * @type {Number}
   * @readonly
   */
  o: 79,

  /**
   * !#en The p key
   * !#zh P 键
   * @property p
   * @type {Number}
   * @readonly
   */
  p: 80,

  /**
   * !#en The q key
   * !#zh Q 键
   * @property q
   * @type {Number}
   * @readonly
   */
  q: 81,

  /**
   * !#en The r key
   * !#zh R 键
   * @property r
   * @type {Number}
   * @readonly
   */
  r: 82,

  /**
   * !#en The s key
   * !#zh S 键
   * @property s
   * @type {Number}
   * @readonly
   */
  s: 83,

  /**
   * !#en The t key
   * !#zh T 键
   * @property t
   * @type {Number}
   * @readonly
   */
  t: 84,

  /**
   * !#en The u key
   * !#zh U 键
   * @property u
   * @type {Number}
   * @readonly
   */
  u: 85,

  /**
   * !#en The v key
   * !#zh V 键
   * @property v
   * @type {Number}
   * @readonly
   */
  v: 86,

  /**
   * !#en The w key
   * !#zh W 键
   * @property w
   * @type {Number}
   * @readonly
   */
  w: 87,

  /**
   * !#en The x key
   * !#zh X 键
   * @property x
   * @type {Number}
   * @readonly
   */
  x: 88,

  /**
   * !#en The y key
   * !#zh Y 键
   * @property y
   * @type {Number}
   * @readonly
   */
  y: 89,

  /**
   * !#en The z key
   * !#zh Z 键
   * @property z
   * @type {Number}
   * @readonly
   */
  z: 90,

  /**
   * !#en The numeric keypad 0
   * !#zh 数字键盘 0
   * @property num0
   * @type {Number}
   * @readonly
   */
  num0: 96,

  /**
   * !#en The numeric keypad 1
   * !#zh 数字键盘 1
   * @property num1
   * @type {Number}
   * @readonly
   */
  num1: 97,

  /**
   * !#en The numeric keypad 2
   * !#zh 数字键盘 2
   * @property num2
   * @type {Number}
   * @readonly
   */
  num2: 98,

  /**
   * !#en The numeric keypad 3
   * !#zh 数字键盘 3
   * @property num3
   * @type {Number}
   * @readonly
   */
  num3: 99,

  /**
   * !#en The numeric keypad 4
   * !#zh 数字键盘 4
   * @property num4
   * @type {Number}
   * @readonly
   */
  num4: 100,

  /**
   * !#en The numeric keypad 5
   * !#zh 数字键盘 5
   * @property num5
   * @type {Number}
   * @readonly
   */
  num5: 101,

  /**
   * !#en The numeric keypad 6
   * !#zh 数字键盘 6
   * @property num6
   * @type {Number}
   * @readonly
   */
  num6: 102,

  /**
   * !#en The numeric keypad 7
   * !#zh 数字键盘 7
   * @property num7
   * @type {Number}
   * @readonly
   */
  num7: 103,

  /**
   * !#en The numeric keypad 8
   * !#zh 数字键盘 8
   * @property num8
   * @type {Number}
   * @readonly
   */
  num8: 104,

  /**
   * !#en The numeric keypad 9
   * !#zh 数字键盘 9
   * @property num9
   * @type {Number}
   * @readonly
   */
  num9: 105,

  /**
   * !#en The numeric keypad '*'
   * !#zh 数字键盘 *
   * @property *
   * @type {Number}
   * @readonly
   */
  '*': 106,

  /**
   * !#en The numeric keypad '+'
   * !#zh 数字键盘 +
   * @property +
   * @type {Number}
   * @readonly
   */
  '+': 107,

  /**
   * !#en The numeric keypad '-'
   * !#zh 数字键盘 -
   * @property -
   * @type {Number}
   * @readonly
   */
  '-': 109,

  /**
   * !#en The numeric keypad 'delete'
   * !#zh 数字键盘删除键
   * @property numdel
   * @type {Number}
   * @readonly
   */
  'numdel': 110,

  /**
   * !#en The numeric keypad '/'
   * !#zh 数字键盘 /
   * @property /
   * @type {Number}
   * @readonly
   */
  '/': 111,

  /**
   * !#en The F1 function key
   * !#zh F1 功能键
   * @property f1
   * @type {Number}
   * @readonly
   */
  f1: 112,
  //f1-f12 dont work on ie

  /**
   * !#en The F2 function key
   * !#zh F2 功能键
   * @property f2
   * @type {Number}
   * @readonly
   */
  f2: 113,

  /**
   * !#en The F3 function key
   * !#zh F3 功能键
   * @property f3
   * @type {Number}
   * @readonly
   */
  f3: 114,

  /**
   * !#en The F4 function key
   * !#zh F4 功能键
   * @property f4
   * @type {Number}
   * @readonly
   */
  f4: 115,

  /**
   * !#en The F5 function key
   * !#zh F5 功能键
   * @property f5
   * @type {Number}
   * @readonly
   */
  f5: 116,

  /**
   * !#en The F6 function key
   * !#zh F6 功能键
   * @property f6
   * @type {Number}
   * @readonly
   */
  f6: 117,

  /**
   * !#en The F7 function key
   * !#zh F7 功能键
   * @property f7
   * @type {Number}
   * @readonly
   */
  f7: 118,

  /**
   * !#en The F8 function key
   * !#zh F8 功能键
   * @property f8
   * @type {Number}
   * @readonly
   */
  f8: 119,

  /**
   * !#en The F9 function key
   * !#zh F9 功能键
   * @property f9
   * @type {Number}
   * @readonly
   */
  f9: 120,

  /**
   * !#en The F10 function key
   * !#zh F10 功能键
   * @property f10
   * @type {Number}
   * @readonly
   */
  f10: 121,

  /**
   * !#en The F11 function key
   * !#zh F11 功能键
   * @property f11
   * @type {Number}
   * @readonly
   */
  f11: 122,

  /**
   * !#en The F12 function key
   * !#zh F12 功能键
   * @property f12
   * @type {Number}
   * @readonly
   */
  f12: 123,

  /**
   * !#en The numlock key
   * !#zh 数字锁定键
   * @property numlock
   * @type {Number}
   * @readonly
   */
  numlock: 144,

  /**
   * !#en The scroll lock key
   * !#zh 滚动锁定键
   * @property scrolllock
   * @type {Number}
   * @readonly
   */
  scrolllock: 145,

  /**
   * !#en The ';' key.
   * !#zh 分号键
   * @property ;
   * @type {Number}
   * @readonly
   */
  ';': 186,

  /**
   * !#en The ';' key.
   * !#zh 分号键
   * @property semicolon
   * @type {Number}
   * @readonly
   */
  semicolon: 186,

  /**
   * !#en The '=' key.
   * !#zh 等于号键
   * @property equal
   * @type {Number}
   * @readonly
   */
  equal: 187,

  /**
   * !#en The '=' key.
   * !#zh 等于号键
   * @property =
   * @type {Number}
   * @readonly
   */
  '=': 187,

  /**
   * !#en The ',' key.
   * !#zh 逗号键
   * @property ,
   * @type {Number}
   * @readonly
   */
  ',': 188,

  /**
   * !#en The ',' key.
   * !#zh 逗号键
   * @property comma
   * @type {Number}
   * @readonly
   */
  comma: 188,

  /**
   * !#en The dash '-' key.
   * !#zh 中划线键
   * @property dash
   * @type {Number}
   * @readonly
   */
  dash: 189,

  /**
   * !#en The '.' key.
   * !#zh 句号键
   * @property .
   * @type {Number}
   * @readonly
   */
  '.': 190,

  /**
   * !#en The '.' key
   * !#zh 句号键
   * @property period
   * @type {Number}
   * @readonly
   */
  period: 190,

  /**
   * !#en The forward slash key
   * !#zh 正斜杠键
   * @property forwardslash
   * @type {Number}
   * @readonly
   */
  forwardslash: 191,

  /**
   * !#en The grave key
   * !#zh 按键 `
   * @property grave
   * @type {Number}
   * @readonly
   */
  grave: 192,

  /**
   * !#en The '[' key
   * !#zh 按键 [
   * @property [
   * @type {Number}
   * @readonly
   */
  '[': 219,

  /**
   * !#en The '[' key
   * !#zh 按键 [
   * @property openbracket
   * @type {Number}
   * @readonly
   */
  openbracket: 219,

  /**
   * !#en The '\' key
   * !#zh 反斜杠键
   * @property backslash
   * @type {Number}
   * @readonly
   */
  backslash: 220,

  /**
   * !#en The ']' key
   * !#zh 按键 ]
   * @property ]
   * @type {Number}
   * @readonly
   */
  ']': 221,

  /**
   * !#en The ']' key
   * !#zh 按键 ]
   * @property closebracket
   * @type {Number}
   * @readonly
   */
  closebracket: 221,

  /**
   * !#en The quote key
   * !#zh 单引号键
   * @property quote
   * @type {Number}
   * @readonly
   */
  quote: 222,
  // gamepad controll

  /**
   * !#en The dpad left key
   * !#zh 导航键 向左
   * @property dpadLeft
   * @type {Number}
   * @readonly
   */
  dpadLeft: 1000,

  /**
   * !#en The dpad right key
   * !#zh 导航键 向右
   * @property dpadRight
   * @type {Number}
   * @readonly
   */
  dpadRight: 1001,

  /**
   * !#en The dpad up key
   * !#zh 导航键 向上
   * @property dpadUp
   * @type {Number}
   * @readonly
   */
  dpadUp: 1003,

  /**
   * !#en The dpad down key
   * !#zh 导航键 向下
   * @property dpadDown
   * @type {Number}
   * @readonly
   */
  dpadDown: 1004,

  /**
   * !#en The dpad center key
   * !#zh 导航键 确定键
   * @property dpadCenter
   * @type {Number}
   * @readonly
   */
  dpadCenter: 1005
};
/**
 * Image formats
 * @enum macro.ImageFormat
 */

cc.macro.ImageFormat = cc.Enum({
  /**
   * Image Format:JPG
   * @property JPG
   * @type {Number}
   */
  JPG: 0,

  /**
   * Image Format:PNG
   * @property PNG
   * @type {Number}
   */
  PNG: 1,

  /**
   * Image Format:TIFF
   * @property TIFF
   * @type {Number}
   */
  TIFF: 2,

  /**
   * Image Format:WEBP
   * @property WEBP
   * @type {Number}
   */
  WEBP: 3,

  /**
   * Image Format:PVR
   * @property PVR
   * @type {Number}
   */
  PVR: 4,

  /**
   * Image Format:ETC
   * @property ETC
   * @type {Number}
   */
  ETC: 5,

  /**
   * Image Format:S3TC
   * @property S3TC
   * @type {Number}
   */
  S3TC: 6,

  /**
   * Image Format:ATITC
   * @property ATITC
   * @type {Number}
   */
  ATITC: 7,

  /**
   * Image Format:TGA
   * @property TGA
   * @type {Number}
   */
  TGA: 8,

  /**
   * Image Format:RAWDATA
   * @property RAWDATA
   * @type {Number}
   */
  RAWDATA: 9,

  /**
   * Image Format:UNKNOWN
   * @property UNKNOWN
   * @type {Number}
   */
  UNKNOWN: 10
});
/**
 * !#en
 * Enum for blend factor
 * Refer to: http://www.andersriggelsen.dk/glblendfunc.php
 * !#zh
 * 混合因子
 * 可参考: http://www.andersriggelsen.dk/glblendfunc.php
 * @enum macro.BlendFactor
 */

cc.macro.BlendFactor = cc.Enum({
  /**
   * !#en All use
   * !#zh 全部使用
   * @property {Number} ONE
   */
  ONE: 1,
  //cc.macro.ONE

  /**
   * !#en Not all
   * !#zh 全部不用
   * @property {Number} ZERO
   */
  ZERO: 0,
  //cc.ZERO

  /**
   * !#en Using the source alpha
   * !#zh 使用源颜色的透明度
   * @property {Number} SRC_ALPHA
   */
  SRC_ALPHA: 0x302,
  //cc.SRC_ALPHA

  /**
   * !#en Using the source color
   * !#zh 使用源颜色
   * @property {Number} SRC_COLOR
   */
  SRC_COLOR: 0x300,
  //cc.SRC_COLOR

  /**
   * !#en Using the target alpha
   * !#zh 使用目标颜色的透明度
   * @property {Number} DST_ALPHA
   */
  DST_ALPHA: 0x304,
  //cc.DST_ALPHA

  /**
   * !#en Using the target color
   * !#zh 使用目标颜色
   * @property {Number} DST_COLOR
   */
  DST_COLOR: 0x306,
  //cc.DST_COLOR

  /**
   * !#en Minus the source alpha
   * !#zh 减去源颜色的透明度
   * @property {Number} ONE_MINUS_SRC_ALPHA
   */
  ONE_MINUS_SRC_ALPHA: 0x303,
  //cc.ONE_MINUS_SRC_ALPHA

  /**
   * !#en Minus the source color
   * !#zh 减去源颜色
   * @property {Number} ONE_MINUS_SRC_COLOR
   */
  ONE_MINUS_SRC_COLOR: 0x301,
  //cc.ONE_MINUS_SRC_COLOR

  /**
   * !#en Minus the target alpha
   * !#zh 减去目标颜色的透明度
   * @property {Number} ONE_MINUS_DST_ALPHA
   */
  ONE_MINUS_DST_ALPHA: 0x305,
  //cc.ONE_MINUS_DST_ALPHA

  /**
   * !#en Minus the target color
   * !#zh 减去目标颜色
   * @property {Number} ONE_MINUS_DST_COLOR
   */
  ONE_MINUS_DST_COLOR: 0x307 //cc.ONE_MINUS_DST_COLOR

});
/**
 * @enum macro.TextAlignment
 */

cc.macro.TextAlignment = cc.Enum({
  /**
   * @property {Number} LEFT
   */
  LEFT: 0,

  /**
   * @property {Number} CENTER
   */
  CENTER: 1,

  /**
   * @property {Number} RIGHT
   */
  RIGHT: 2
});
/**
 * @enum VerticalTextAlignment
 */

cc.macro.VerticalTextAlignment = cc.Enum({
  /**
   * @property {Number} TOP
   */
  TOP: 0,

  /**
   * @property {Number} CENTER
   */
  CENTER: 1,

  /**
   * @property {Number} BOTTOM
   */
  BOTTOM: 2
});
module.exports = cc.macro;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL0NDTWFjcm8uanMiXSwibmFtZXMiOlsiY2MiLCJtYWNybyIsIlJBRCIsIk1hdGgiLCJQSSIsIkRFRyIsIlJFUEVBVF9GT1JFVkVSIiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwiRkxUX0VQU0lMT04iLCJNSU5fWklOREVYIiwicG93IiwiTUFYX1pJTkRFWCIsIk9ORSIsIlpFUk8iLCJTUkNfQUxQSEEiLCJTUkNfQUxQSEFfU0FUVVJBVEUiLCJTUkNfQ09MT1IiLCJEU1RfQUxQSEEiLCJEU1RfQ09MT1IiLCJPTkVfTUlOVVNfU1JDX0FMUEhBIiwiT05FX01JTlVTX1NSQ19DT0xPUiIsIk9ORV9NSU5VU19EU1RfQUxQSEEiLCJPTkVfTUlOVVNfRFNUX0NPTE9SIiwiT05FX01JTlVTX0NPTlNUQU5UX0FMUEhBIiwiT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SIiwiT1JJRU5UQVRJT05fUE9SVFJBSVQiLCJPUklFTlRBVElPTl9MQU5EU0NBUEUiLCJPUklFTlRBVElPTl9BVVRPIiwiREVOU0lUWURQSV9ERVZJQ0UiLCJERU5TSVRZRFBJX0hJR0giLCJERU5TSVRZRFBJX01FRElVTSIsIkRFTlNJVFlEUElfTE9XIiwiRklYX0FSVElGQUNUU19CWV9TVFJFQ0hJTkdfVEVYRUxfVE1YIiwiRElSRUNUT1JfU1RBVFNfUE9TSVRJT04iLCJ2MiIsIkVOQUJMRV9TVEFDS0FCTEVfQUNUSU9OUyIsIlRPVUNIX1RJTUVPVVQiLCJCQVRDSF9WRVJURVhfQ09VTlQiLCJFTkFCTEVfVElMRURNQVBfQ1VMTElORyIsIkVOQUJMRV9UUkFOU1BBUkVOVF9DQU5WQVMiLCJFTkFCTEVfV0VCR0xfQU5USUFMSUFTIiwiRU5BQkxFX0NVTExJTkciLCJDTEVBTlVQX0lNQUdFX0NBQ0hFIiwiU0hPV19NRVNIX1dJUkVGUkFNRSIsIlNIT1dfTUVTSF9OT1JNQUwiLCJFTkFCTEVfTVVMVElfVE9VQ0giLCJBTExPV19JTUFHRV9CSVRNQVAiLCJzeXMiLCJpc01vYmlsZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwic2V0IiwidmFsdWUiLCJSb3RhdGVUbyIsIlJvdGF0ZUJ5IiwiX3JldmVyc2UiLCJTVVBQT1JUX1RFWFRVUkVfRk9STUFUUyIsIktFWSIsIm5vbmUiLCJiYWNrIiwibWVudSIsImJhY2tzcGFjZSIsInRhYiIsImVudGVyIiwic2hpZnQiLCJjdHJsIiwiYWx0IiwicGF1c2UiLCJjYXBzbG9jayIsImVzY2FwZSIsInNwYWNlIiwicGFnZXVwIiwicGFnZWRvd24iLCJlbmQiLCJob21lIiwibGVmdCIsInVwIiwicmlnaHQiLCJkb3duIiwic2VsZWN0IiwiaW5zZXJ0IiwiRGVsZXRlIiwiYSIsImIiLCJjIiwiZCIsImUiLCJmIiwiZyIsImgiLCJpIiwiaiIsImsiLCJsIiwibSIsIm4iLCJvIiwicCIsInEiLCJyIiwicyIsInQiLCJ1IiwidiIsInciLCJ4IiwieSIsInoiLCJudW0wIiwibnVtMSIsIm51bTIiLCJudW0zIiwibnVtNCIsIm51bTUiLCJudW02IiwibnVtNyIsIm51bTgiLCJudW05IiwiZjEiLCJmMiIsImYzIiwiZjQiLCJmNSIsImY2IiwiZjciLCJmOCIsImY5IiwiZjEwIiwiZjExIiwiZjEyIiwibnVtbG9jayIsInNjcm9sbGxvY2siLCJzZW1pY29sb24iLCJlcXVhbCIsImNvbW1hIiwiZGFzaCIsInBlcmlvZCIsImZvcndhcmRzbGFzaCIsImdyYXZlIiwib3BlbmJyYWNrZXQiLCJiYWNrc2xhc2giLCJjbG9zZWJyYWNrZXQiLCJxdW90ZSIsImRwYWRMZWZ0IiwiZHBhZFJpZ2h0IiwiZHBhZFVwIiwiZHBhZERvd24iLCJkcGFkQ2VudGVyIiwiSW1hZ2VGb3JtYXQiLCJFbnVtIiwiSlBHIiwiUE5HIiwiVElGRiIsIldFQlAiLCJQVlIiLCJFVEMiLCJTM1RDIiwiQVRJVEMiLCJUR0EiLCJSQVdEQVRBIiwiVU5LTk9XTiIsIkJsZW5kRmFjdG9yIiwiVGV4dEFsaWdubWVudCIsIkxFRlQiLCJDRU5URVIiLCJSSUdIVCIsIlZlcnRpY2FsVGV4dEFsaWdubWVudCIsIlRPUCIsIkJPVFRPTSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBOzs7OztBQUtBQSxFQUFFLENBQUNDLEtBQUgsR0FBVztBQUNQOzs7OztBQUtBQyxFQUFBQSxHQUFHLEVBQUVDLElBQUksQ0FBQ0MsRUFBTCxHQUFVLEdBTlI7O0FBUVA7Ozs7O0FBS0FDLEVBQUFBLEdBQUcsRUFBRSxNQUFNRixJQUFJLENBQUNDLEVBYlQ7O0FBZVA7Ozs7QUFJQUUsRUFBQUEsY0FBYyxFQUFHQyxNQUFNLENBQUNDLFNBQVAsR0FBbUIsQ0FuQjdCOztBQXFCUDs7OztBQUlBQyxFQUFBQSxXQUFXLEVBQUUsa0JBekJOOztBQTJCUDs7Ozs7QUFLQUMsRUFBQUEsVUFBVSxFQUFFLENBQUNQLElBQUksQ0FBQ1EsR0FBTCxDQUFTLENBQVQsRUFBWSxFQUFaLENBaENOOztBQWtDUDs7Ozs7QUFLQUMsRUFBQUEsVUFBVSxFQUFFVCxJQUFJLENBQUNRLEdBQUwsQ0FBUyxDQUFULEVBQVksRUFBWixJQUFrQixDQXZDdkI7QUF5Q1A7O0FBQ0E7Ozs7QUFJQUUsRUFBQUEsR0FBRyxFQUFFLENBOUNFOztBQWdEUDs7OztBQUlBQyxFQUFBQSxJQUFJLEVBQUUsQ0FwREM7O0FBc0RQOzs7O0FBSUFDLEVBQUFBLFNBQVMsRUFBRSxNQTFESjs7QUE0RFA7Ozs7QUFJQUMsRUFBQUEsa0JBQWtCLEVBQUUsS0FoRWI7O0FBa0VQOzs7O0FBSUFDLEVBQUFBLFNBQVMsRUFBRSxLQXRFSjs7QUF3RVA7Ozs7QUFJQUMsRUFBQUEsU0FBUyxFQUFFLEtBNUVKOztBQThFUDs7OztBQUlBQyxFQUFBQSxTQUFTLEVBQUUsS0FsRko7O0FBb0ZQOzs7O0FBSUFDLEVBQUFBLG1CQUFtQixFQUFFLE1BeEZkOztBQTBGUDs7OztBQUlBQyxFQUFBQSxtQkFBbUIsRUFBRSxLQTlGZDs7QUFnR1A7Ozs7QUFJQUMsRUFB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Q0FBQ0MsS0FBSCxDQUFTa0ssYUFBVCxHQUF5Qm5LLEVBQUUsQ0FBQ3NKLElBQUgsQ0FBUTtBQUM3Qjs7O0FBR0FjLEVBQUFBLElBQUksRUFBRSxDQUp1Qjs7QUFLN0I7OztBQUdBQyxFQUFBQSxNQUFNLEVBQUUsQ0FScUI7O0FBUzdCOzs7QUFHQUMsRUFBQUEsS0FBSyxFQUFFO0FBWnNCLENBQVIsQ0FBekI7QUFlQTs7OztBQUdBdEssRUFBRSxDQUFDQyxLQUFILENBQVNzSyxxQkFBVCxHQUFpQ3ZLLEVBQUUsQ0FBQ3NKLElBQUgsQ0FBUTtBQUNyQzs7O0FBR0FrQixFQUFBQSxHQUFHLEVBQUUsQ0FKZ0M7O0FBS3JDOzs7QUFHQUgsRUFBQUEsTUFBTSxFQUFFLENBUjZCOztBQVNyQzs7O0FBR0FJLEVBQUFBLE1BQU0sRUFBRTtBQVo2QixDQUFSLENBQWpDO0FBZUFDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjNLLEVBQUUsQ0FBQ0MsS0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAwOC0yMDEwIFJpY2FyZG8gUXVlc2FkYVxuIENvcHlyaWdodCAoYykgMjAxMS0yMDEyIGNvY29zMmQteC5vcmdcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogUHJlZGVmaW5lZCBjb25zdGFudHNcbiAqIEBjbGFzcyBtYWNyb1xuICogQHN0YXRpY1xuICovXG5jYy5tYWNybyA9IHtcbiAgICAvKipcbiAgICAgKiBQSSAvIDE4MFxuICAgICAqIEBwcm9wZXJ0eSBSQURcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIFJBRDogTWF0aC5QSSAvIDE4MCxcblxuICAgIC8qKlxuICAgICAqIE9uZSBkZWdyZWVcbiAgICAgKiBAcHJvcGVydHkgREVHXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBERUc6IDE4MCAvIE1hdGguUEksXG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgUkVQRUFUX0ZPUkVWRVJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIFJFUEVBVF9GT1JFVkVSOiAoTnVtYmVyLk1BWF9WQUxVRSAtIDEpLFxuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IEZMVF9FUFNJTE9OXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBGTFRfRVBTSUxPTjogMC4wMDAwMDAxMTkyMDkyODk2LFxuXG4gICAgLyoqXG4gICAgICogTWluaW11bSB6IGluZGV4IHZhbHVlIGZvciBub2RlXG4gICAgICogQHByb3BlcnR5IE1JTl9aSU5ERVhcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIE1JTl9aSU5ERVg6IC1NYXRoLnBvdygyLCAxNSksXG5cbiAgICAvKipcbiAgICAgKiBNYXhpbXVtIHogaW5kZXggdmFsdWUgZm9yIG5vZGVcbiAgICAgKiBAcHJvcGVydHkgTUFYX1pJTkRFWFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgTUFYX1pJTkRFWDogTWF0aC5wb3coMiwgMTUpIC0gMSxcblxuICAgIC8vc29tZSBnbCBjb25zdGFudCB2YXJpYWJsZVxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBPTkVcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIE9ORTogMSxcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBaRVJPXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBaRVJPOiAwLFxuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IFNSQ19BTFBIQVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgU1JDX0FMUEhBOiAweDAzMDIsXG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgU1JDX0FMUEhBX1NBVFVSQVRFXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBTUkNfQUxQSEFfU0FUVVJBVEU6IDB4MzA4LFxuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IFNSQ19DT0xPUlxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgU1JDX0NPTE9SOiAweDMwMCxcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBEU1RfQUxQSEFcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIERTVF9BTFBIQTogMHgzMDQsXG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgRFNUX0NPTE9SXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBEU1RfQ09MT1I6IDB4MzA2LFxuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IE9ORV9NSU5VU19TUkNfQUxQSEFcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIE9ORV9NSU5VU19TUkNfQUxQSEE6IDB4MDMwMyxcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBPTkVfTUlOVVNfU1JDX0NPTE9SXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBPTkVfTUlOVVNfU1JDX0NPTE9SOiAweDMwMSxcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBPTkVfTUlOVVNfRFNUX0FMUEhBXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBPTkVfTUlOVVNfRFNUX0FMUEhBOiAweDMwNSxcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBPTkVfTUlOVVNfRFNUX0NPTE9SXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBPTkVfTUlOVVNfRFNUX0NPTE9SOiAweDAzMDcsXG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgT05FX01JTlVTX0NPTlNUQU5UX0FMUEhBXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBPTkVfTUlOVVNfQ09OU1RBTlRfQUxQSEE6IDB4ODAwNCxcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBPTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1JcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIE9ORV9NSU5VU19DT05TVEFOVF9DT0xPUjogMHg4MDAyLFxuXG4gICAgLy9Qb3NzaWJsZSBkZXZpY2Ugb3JpZW50YXRpb25zXG4gICAgLyoqXG4gICAgICogT3JpZW50ZWQgdmVydGljYWxseVxuICAgICAqIEBwcm9wZXJ0eSBPUklFTlRBVElPTl9QT1JUUkFJVFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgT1JJRU5UQVRJT05fUE9SVFJBSVQ6IDEsXG5cbiAgICAvKipcbiAgICAgKiBPcmllbnRlZCBob3Jpem9udGFsbHlcbiAgICAgKiBAcHJvcGVydHkgT1JJRU5UQVRJT05fTEFORFNDQVBFXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBPUklFTlRBVElPTl9MQU5EU0NBUEU6IDIsXG5cbiAgICAvKipcbiAgICAgKiBPcmllbnRlZCBhdXRvbWF0aWNhbGx5XG4gICAgICogQHByb3BlcnR5IE9SSUVOVEFUSU9OX0FVVE9cbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIE9SSUVOVEFUSU9OX0FVVE86IDMsXG5cbiAgICBERU5TSVRZRFBJX0RFVklDRTogJ2RldmljZS1kcGknLFxuICAgIERFTlNJVFlEUElfSElHSDogJ2hpZ2gtZHBpJyxcbiAgICBERU5TSVRZRFBJX01FRElVTTogJ21lZGl1bS1kcGknLFxuICAgIERFTlNJVFlEUElfTE9XOiAnbG93LWRwaScsXG5cbiAgICAvLyBHZW5lcmFsIGNvbmZpZ3VyYXRpb25zXG5cbiAgICAvKipcbiAgICAgKiA8cD5cbiAgICAgKiAgIElmIGVuYWJsZWQsIHRoZSB0ZXh0dXJlIGNvb3JkaW5hdGVzIHdpbGwgYmUgY2FsY3VsYXRlZCBieSB1c2luZyB0aGlzIGZvcm11bGE6IDxici8+XG4gICAgICogICAgICAtIHRleENvb3JkLmxlZnQgPSAocmVjdC54KjIrMSkgLyAodGV4dHVyZS53aWRlKjIpOyAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICogICAgICAtIHRleENvb3JkLnJpZ2h0ID0gdGV4Q29vcmQubGVmdCArIChyZWN0LndpZHRoKjItMikvKHRleHR1cmUud2lkZSoyKTsgPGJyLz5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICogIFRoZSBzYW1lIGZvciBib3R0b20gYW5kIHRvcC4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgKiAgVGhpcyBmb3JtdWxhIHByZXZlbnRzIGFydGlmYWN0cyBieSB1c2luZyA5OSUgb2YgdGhlIHRleHR1cmUuICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICogIFRoZSBcImNvcnJlY3RcIiB3YXkgdG8gcHJldmVudCBhcnRpZmFjdHMgaXMgYnkgZXhwYW5kIHRoZSB0ZXh0dXJlJ3MgYm9yZGVyIHdpdGggdGhlIHNhbWUgY29sb3IgYnkgMSBwaXhlbDxici8+XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgKiAgQWZmZWN0ZWQgY29tcG9uZW50OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgKiAgICAgIC0gY2MuVE1YTGF5ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAqICBFbmFibGVkIGJ5IGRlZmF1bHQuIFRvIGRpc2FibGVkIHNldCBpdCB0byAwLiA8YnIvPlxuICAgICAqICBUbyBtb2RpZnkgaXQsIGluIFdlYiBlbmdpbmUgcGxlYXNlIHJlZmVyIHRvIENDTWFjcm8uanMsIGluIEpTQiBwbGVhc2UgcmVmZXIgdG8gQ0NDb25maWcuaFxuICAgICAqIDwvcD5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBGSVhfQVJUSUZBQ1RTX0JZX1NUUkVDSElOR19URVhFTF9UTVhcbiAgICAgKi9cbiAgICBGSVhfQVJUSUZBQ1RTX0JZX1NUUkVDSElOR19URVhFTF9UTVg6IHRydWUsXG5cbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiBvZiB0aGUgRlBTIChEZWZhdWx0OiAwLDAgKGJvdHRvbS1sZWZ0IGNvcm5lcikpPGJyLz5cbiAgICAgKiBUbyBtb2RpZnkgaXQsIGluIFdlYiBlbmdpbmUgcGxlYXNlIHJlZmVyIHRvIENDTWFjcm8uanMsIGluIEpTQiBwbGVhc2UgcmVmZXIgdG8gQ0NDb25maWcuaFxuICAgICAqIEBwcm9wZXJ0eSB7VmVjMn0gRElSRUNUT1JfU1RBVFNfUE9TSVRJT05cbiAgICAgKi9cbiAgICBESVJFQ1RPUl9TVEFUU19QT1NJVElPTjogY2MudjIoMCwgMCksXG5cbiAgICAvKipcbiAgICAgKiA8cD5cbiAgICAgKiAgICBJZiBlbmFibGVkLCBhY3Rpb25zIHRoYXQgYWx0ZXIgdGhlIHBvc2l0aW9uIHByb3BlcnR5IChlZzogQ0NNb3ZlQnksIENDSnVtcEJ5LCBDQ0JlemllckJ5LCBldGMuLikgd2lsbCBiZSBzdGFja2VkLiAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICogICAgSWYgeW91IHJ1biAyIG9yIG1vcmUgJ3Bvc2l0aW9uJyBhY3Rpb25zIGF0IHRoZSBzYW1lIHRpbWUgb24gYSBub2RlLCB0aGVuIGVuZCBwb3NpdGlvbiB3aWxsIGJlIHRoZSBzdW0gb2YgYWxsIHRoZSBwb3NpdGlvbnMuICAgICAgICA8YnIvPlxuICAgICAqICAgIElmIGRpc2FibGVkLCBvbmx5IHRoZSBsYXN0IHJ1biBhY3Rpb24gd2lsbCB0YWtlIGVmZmVjdC5cbiAgICAgKiA8L3A+XG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEVOQUJMRV9TVEFDS0FCTEVfQUNUSU9OU1xuICAgICAqL1xuICAgIEVOQUJMRV9TVEFDS0FCTEVfQUNUSU9OUzogdHJ1ZSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogVGhlIHRpbWVvdXQgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgYSB0b3VjaCBpcyBubyBsb25nZXIgYWN0aXZlIGFuZCBzaG91bGQgYmUgcmVtb3ZlZC5cbiAgICAgKiBUaGUgcmVhc29uIHRvIGFkZCB0aGlzIHRpbWVvdXQgaXMgZHVlIHRvIGFuIGlzc3VlIGluIFg1IGJyb3dzZXIgY29yZSwgXG4gICAgICogd2hlbiBYNSBpcyBwcmVzZW50ZWQgaW4gd2VjaGF0IG9uIEFuZHJvaWQsIGlmIGEgdG91Y2ggaXMgZ2xpc3NlZCBmcm9tIHRoZSBib3R0b20gdXAsIGFuZCBsZWF2ZSB0aGUgcGFnZSBhcmVhLFxuICAgICAqIG5vIHRvdWNoIGNhbmNlbCBldmVudCBpcyB0cmlnZ2VyZWQsIGFuZCB0aGUgdG91Y2ggd2lsbCBiZSBjb25zaWRlcmVkIGFjdGl2ZSBmb3JldmVyLiBcbiAgICAgKiBBZnRlciBtdWx0aXBsZSB0aW1lcyBvZiB0aGlzIGFjdGlvbiwgb3VyIG1heGltdW0gdG91Y2hlcyBudW1iZXIgd2lsbCBiZSByZWFjaGVkIGFuZCBhbGwgbmV3IHRvdWNoZXMgd2lsbCBiZSBpZ25vcmVkLlxuICAgICAqIFNvIHRoaXMgbmV3IG1lY2hhbmlzbSBjYW4gcmVtb3ZlIHRoZSB0b3VjaCB0aGF0IHNob3VsZCBiZSBpbmFjdGl2ZSBpZiBpdCdzIG5vdCB1cGRhdGVkIGR1cmluZyB0aGUgbGFzdCA1MDAwIG1pbGxpc2Vjb25kcy5cbiAgICAgKiBUaG91Z2ggaXQgbWlnaHQgcmVtb3ZlIGEgcmVhbCB0b3VjaCBpZiBpdCdzIGp1c3Qgbm90IG1vdmluZyBmb3IgdGhlIGxhc3QgNSBzZWNvbmRzIHdoaWNoIGlzIG5vdCBlYXN5IHdpdGggdGhlIHNlbnNpYmlsaXR5IG9mIG1vYmlsZSB0b3VjaCBzY3JlZW4uXG4gICAgICogWW91IGNhbiBtb2RpZnkgdGhpcyB2YWx1ZSB0byBoYXZlIGEgYmV0dGVyIGJlaGF2aW9yIGlmIHlvdSBmaW5kIGl0J3Mgbm90IGVub3VnaC5cbiAgICAgKiAhI3poXG4gICAgICog55So5LqO55SE5Yir5LiA5Liq6Kem54K55a+56LGh5piv5ZCm5bey57uP5aSx5pWI5bm25LiU5Y+v5Lul6KKr56e76Zmk55qE5bu25pe25pe26ZW/XG4gICAgICog5re75Yqg6L+Z5Liq5pe26ZW/55qE5Y6f5Zug5pivIFg1IOWGheaguOWcqOW+ruS/oea1j+iniOWZqOS4reWHuueOsOeahOS4gOS4qiBidWfjgIJcbiAgICAgKiDlnKjov5nkuKrnjq/looPkuIvvvIzlpoLmnpznlKjmiLflsIbkuIDkuKrop6bngrnku47lupXlkJHkuIrnp7vlh7rpobXpnaLljLrln5/vvIzlsIbkuI3kvJrop6blj5Hku7vkvZUgdG91Y2ggY2FuY2VsIOaIliB0b3VjaCBlbmQg5LqL5Lu277yM6ICM6L+Z5Liq6Kem54K55Lya6KKr5rC46L+c5b2T5L2c5YGc55WZ5Zyo6aG16Z2i5LiK55qE5pyJ5pWI6Kem54K544CCXG4gICAgICog6YeN5aSN6L+Z5qC35pON5L2c5Yeg5qyh5LmL5ZCO77yM5bGP5bmV5LiK55qE6Kem54K55pWw6YeP5bCG6L6+5Yiw5oiR5Lus55qE5LqL5Lu257O757uf5omA5pSv5oyB55qE5pyA6auY6Kem54K55pWw6YeP77yM5LmL5ZCO5omA5pyJ55qE6Kem5pG45LqL5Lu26YO95bCG6KKr5b+955Wl44CCXG4gICAgICog5omA5Lul6L+Z5Liq5paw55qE5py65Yi25Y+v5Lul5Zyo6Kem54K55Zyo5LiA5a6a5pe26Ze05YaF5rKh5pyJ5Lu75L2V5pu05paw55qE5oOF5Ya15LiL6KeG5Li65aSx5pWI6Kem54K55bm25LuO5LqL5Lu257O757uf5Lit56e76Zmk44CCXG4gICAgICog5b2T54S277yM6L+Z5Lmf5Y+v6IO956e76Zmk5LiA5Liq55yf5a6e55qE6Kem54K577yM5aaC5p6c55So5oi355qE6Kem54K555yf55qE5Zyo5LiA5a6a5pe26Ze05q615YaF5a6M5YWo5rKh5pyJ56e75Yqo77yI6L+Z5Zyo5b2T5YmN5omL5py65bGP5bmV55qE54G15pWP5bqm5LiL5Lya5b6I6Zq+77yJ44CCXG4gICAgICog5L2g5Y+v5Lul5L+u5pS56L+Z5Liq5YC85p2l6I635b6X5L2g6ZyA6KaB55qE5pWI5p6c77yM6buY6K6k5YC85pivIDUwMDAg5q+r56eS44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFRPVUNIX1RJTUVPVVRcbiAgICAgKi9cbiAgICBUT1VDSF9USU1FT1VUOiA1MDAwLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBUaGUgbWF4aW11bSB2ZXJ0ZXggY291bnQgZm9yIGEgc2luZ2xlIGJhdGNoZWQgZHJhdyBjYWxsLlxuICAgICAqICEjemhcbiAgICAgKiDmnIDlpKflj6/ku6XooqvljZXmrKHmibnlpITnkIbmuLLmn5PnmoTpobbngrnmlbDph4/jgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQkFUQ0hfVkVSVEVYX0NPVU5UXG4gICAgICovXG4gICAgQkFUQ0hfVkVSVEVYX0NPVU5UOiAyMDAwMCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogV2hldGhlciBvciBub3QgZW5hYmxlZCB0aWxlZCBtYXAgYXV0byBjdWxsaW5nLiBJZiB5b3Ugc2V0IHRoZSBUaWxlZE1hcCBza2V3IG9yIHJvdGF0aW9uLCB0aGVuIG5lZWQgdG8gbWFudWFsbHkgZGlzYWJsZSB0aGlzLCBvdGhlcndpc2UsIHRoZSByZW5kZXJpbmcgd2lsbCBiZSB3cm9uZy5cbiAgICAgKiAhI3poXG4gICAgICog5piv5ZCm5byA5ZCv55Om54mH5Zyw5Zu+55qE6Ieq5Yqo6KOB5YeP5Yqf6IO944CC55Om54mH5Zyw5Zu+5aaC5p6c6K6+572u5LqGIHNrZXcsIHJvdGF0aW9uIOaIluiAhemHh+eUqOS6huaRhOWDj+acuueahOivne+8jOmcgOimgeaJi+WKqOWFs+mXre+8jOWQpuWImea4suafk+S8muWHuumUmeOAglxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gRU5BQkxFX1RJTEVETUFQX0NVTExJTkdcbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgRU5BQkxFX1RJTEVETUFQX0NVTExJTkc6IHRydWUsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIEJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgaWYgdGhlIGNhbnZhcyBjb250YWlucyBhbiBhbHBoYSBjaGFubmVsLCBkZWZhdWx0IHNldHMgdG8gZmFsc2UgZm9yIGJldHRlciBwZXJmb3JtYW5jZS5cbiAgICAgKiBUaG91Z2ggaWYgeW91IHdhbnQgdG8gbWFrZSB5b3VyIGNhbnZhcyBiYWNrZ3JvdW5kIHRyYW5zcGFyZW50IGFuZCBzaG93IG90aGVyIGRvbSBlbGVtZW50cyBhdCB0aGUgYmFja2dyb3VuZCwgXG4gICAgICogeW91IGNhbiBzZXQgaXQgdG8gdHJ1ZSBiZWZvcmUgYGNjLmdhbWUucnVuYC5cbiAgICAgKiBXZWIgb25seS5cbiAgICAgKiAhI3poXG4gICAgICog55So5LqO6K6+572uIENhbnZhcyDog4zmma/mmK/lkKbmlK/mjIEgYWxwaGEg6YCa6YGT77yM6buY6K6k5Li6IGZhbHNl77yM6L+Z5qC35Y+v5Lul5pyJ5pu06auY55qE5oCn6IO96KGo546w44CCXG4gICAgICog5aaC5p6c5L2g5biM5pybIENhbnZhcyDog4zmma/mmK/pgI/mmI7nmoTvvIzlubbmmL7npLrog4zlkI7nmoTlhbbku5YgRE9NIOWFg+e0oO+8jOS9oOWPr+S7peWcqCBgY2MuZ2FtZS5ydW5gIOS5i+WJjeWwhui/meS4quWAvOiuvuS4uiB0cnVl44CCXG4gICAgICog5LuF5pSv5oyBIFdlYlxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gRU5BQkxFX1RSQU5TUEFSRU5UX0NBTlZBU1xuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgRU5BQkxFX1RSQU5TUEFSRU5UX0NBTlZBUzogZmFsc2UsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQm9vbGVhbiB0aGF0IGluZGljYXRlcyBpZiB0aGUgV2ViR0wgY29udGV4dCBpcyBjcmVhdGVkIHdpdGggYGFudGlhbGlhc2Agb3B0aW9uIHR1cm5lZCBvbiwgZGVmYXVsdCB2YWx1ZSBpcyBmYWxzZS5cbiAgICAgKiBTZXQgaXQgdG8gdHJ1ZSBjb3VsZCBtYWtlIHlvdXIgZ2FtZSBncmFwaGljcyBzbGlnaHRseSBzbW9vdGhlciwgbGlrZSB0ZXh0dXJlIGhhcmQgZWRnZXMgd2hlbiByb3RhdGVkLlxuICAgICAqIFdoZXRoZXIgdG8gdXNlIHRoaXMgcmVhbGx5IGRlcGVuZCBvbiB5b3VyIGdhbWUgZGVzaWduIGFuZCB0YXJnZXRlZCBwbGF0Zm9ybSwgXG4gICAgICogZGV2aWNlIHdpdGggcmV0aW5hIGRpc3BsYXkgdXN1YWxseSBoYXZlIGdvb2QgZGV0YWlsIG9uIGdyYXBoaWNzIHdpdGggb3Igd2l0aG91dCB0aGlzIG9wdGlvbiwgXG4gICAgICogeW91IHByb2JhYmx5IGRvbid0IHdhbnQgYW50aWFsaWFzIGlmIHlvdXIgZ2FtZSBzdHlsZSBpcyBwaXhlbCBhcnQgYmFzZWQuXG4gICAgICogQWxzbywgaXQgY291bGQgaGF2ZSBncmVhdCBwZXJmb3JtYW5jZSBpbXBhY3Qgd2l0aCBzb21lIGJyb3dzZXIgLyBkZXZpY2UgdXNpbmcgc29mdHdhcmUgTVNBQS5cbiAgICAgKiBZb3UgY2FuIHNldCBpdCB0byB0cnVlIGJlZm9yZSBgY2MuZ2FtZS5ydW5gLlxuICAgICAqIFdlYiBvbmx5LlxuICAgICAqICEjemhcbiAgICAgKiDnlKjkuo7orr7nva7lnKjliJvlu7ogV2ViR0wgQ29udGV4dCDml7bmmK/lkKblvIDlkK/mipfplK/pvb/pgInpobnvvIzpu5jorqTlgLzmmK8gZmFsc2XjgIJcbiAgICAgKiDlsIbov5nkuKrpgInpobnorr7nva7kuLogdHJ1ZSDkvJrorqnkvaDnmoTmuLjmiI/nlLvpnaLnqI3nqI3lubPmu5HkuIDkupvvvIzmr5TlpoLml4vovaznoazovrnotLTlm77ml7bnmoTplK/pvb/jgILmmK/lkKblvIDlkK/ov5nkuKrpgInpobnlvojlpKfnqIvluqbkuIrlj5blhrPkuo7kvaDnmoTmuLjmiI/lkozpnaLlkJHnmoTlubPlj7DjgIJcbiAgICAgKiDlnKjlpKflpJrmlbDmi6XmnIkgcmV0aW5hIOe6p+WIq+Wxj+W5leeahOiuvuWkh+S4iueUqOaIt+W+gOW+gOaXoOazleWMuuWIhui/meS4qumAiemhueW4puadpeeahOWPmOWMlu+8m+WmguaenOS9oOeahOa4uOaIj+mAieaLqeWDj+e0oOiJuuacr+mjjuagvO+8jOS9oOS5n+WkmuWNiuS4jeS8muaDs+W8gOWQr+i/meS4qumAiemhueOAglxuICAgICAqIOWQjOaXtu+8jOWcqOWwkemDqOWIhuS9v+eUqOi9r+S7tue6p+WIq+aKl+mUr+m9v+eul+azleeahOiuvuWkh+aIlua1j+iniOWZqOS4iu+8jOi/meS4qumAiemhueS8muWvueaAp+iDveS6p+eUn+avlOi+g+Wkp+eahOW9seWTjeOAglxuICAgICAqIOS9oOWPr+S7peWcqCBgY2MuZ2FtZS5ydW5gIOS5i+WJjeiuvue9rui/meS4quWAvO+8jOWQpuWImeWug+S4jeS8mueUn+aViOOAglxuICAgICAqIOS7heaUr+aMgSBXZWJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IEVOQUJMRV9XRUJHTF9BTlRJQUxJQVNcbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIEVOQUJMRV9XRUJHTF9BTlRJQUxJQVM6IGZhbHNlLFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFdoZXRoZXIgb3Igbm90IGVuYWJsZSBhdXRvIGN1bGxpbmcuXG4gICAgICogVGhpcyBmZWF0dXJlIGhhdmUgYmVlbiByZW1vdmVkIGluIHYyLjAgbmV3IHJlbmRlcmVyIGR1ZSB0byBvdmVyYWxsIHBlcmZvcm1hbmNlIGNvbnN1bXB0aW9uLlxuICAgICAqIFdlIGhhdmUgbm8gcGxhbiBjdXJyZW50bHkgdG8gcmUtZW5hYmxlIGF1dG8gY3VsbGluZy5cbiAgICAgKiBJZiB5b3VyIGdhbWUgaGF2ZSBtb3JlIGR5bmFtaWMgb2JqZWN0cywgd2Ugc3VnZ2VzdCB0byBkaXNhYmxlIGF1dG8gY3VsbGluZy5cbiAgICAgKiBJZiB5b3VyIGdhbWUgaGF2ZSBtb3JlIHN0YXRpYyBvYmplY3RzLCB3ZSBzdWdnZXN0IHRvIGVuYWJsZSBhdXRvIGN1bGxpbmcuXG4gICAgICogISN6aFxuICAgICAqIOaYr+WQpuW8gOWQr+iHquWKqOijgeWHj+WKn+iDve+8jOW8gOWQr+ijgeWHj+WKn+iDveWwhuS8muaKiuWcqOWxj+W5leWklueahOeJqeS9k+S7jua4suafk+mYn+WIl+S4reWOu+mZpOaOieOAglxuICAgICAqIOi/meS4quWKn+iDveWcqCB2Mi4wIOeahOaWsOa4suafk+WZqOS4reiiq+enu+mZpOS6hu+8jOWboOS4uuWug+WcqOWkp+WkmuaVsOa4uOaIj+S4reaJgOW4puadpeeahOaNn+iAl+imgemrmOS6juaAp+iDveeahOaPkOWNh++8jOebruWJjeaIkeS7rOayoeacieiuoeWIkumHjeaWsOaUr+aMgeiHquWKqOijgeWJquOAglxuICAgICAqIOWmguaenOa4uOaIj+S4reeahOWKqOaAgeeJqeS9k+avlOi+g+WkmueahOivne+8jOW7uuiuruWwhuatpOmAiemhueWFs+mXreOAglxuICAgICAqIOWmguaenOa4uOaIj+S4reeahOmdmeaAgeeJqeS9k+avlOi+g+WkmueahOivne+8jOW7uuiuruWwhuatpOmAiemhueaJk+W8gOOAglxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gRU5BQkxFX0NVTExJTkdcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBFTkFCTEVfQ1VMTElORzogZmFsc2UsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogV2hldGhlciB0byBjbGVhciB0aGUgb3JpZ2luYWwgaW1hZ2UgY2FjaGUgYWZ0ZXIgdXBsb2FkZWQgYSB0ZXh0dXJlIHRvIEdQVS4gSWYgY2xlYXJlZCwgW0R5bmFtaWMgQXRsYXNdKGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vYWR2YW5jZWQtdG9waWNzL2R5bmFtaWMtYXRsYXMuaHRtbCkgd2lsbCBub3QgYmUgc3VwcG9ydGVkLlxuICAgICAqIE5vcm1hbGx5IHlvdSBkb24ndCBuZWVkIHRvIGVuYWJsZSB0aGlzIG9wdGlvbiBvbiB0aGUgd2ViIHBsYXRmb3JtLCBiZWNhdXNlIEltYWdlIG9iamVjdCBkb2Vzbid0IGNvbnN1bWUgdG9vIG11Y2ggbWVtb3J5LlxuICAgICAqIEJ1dCBvbiBXZUNoYXQgR2FtZSBwbGF0Zm9ybSwgdGhlIGN1cnJlbnQgdmVyc2lvbiBjYWNoZSBkZWNvZGVkIGRhdGEgaW4gSW1hZ2Ugb2JqZWN0LCB3aGljaCBoYXMgaGlnaCBtZW1vcnkgdXNhZ2UuXG4gICAgICogU28gd2UgZW5hYmxlZCB0aGlzIG9wdGlvbiBieSBkZWZhdWx0IG9uIFdlQ2hhdCwgc28gdGhhdCB3ZSBjYW4gcmVsZWFzZSBJbWFnZSBjYWNoZSBpbW1lZGlhdGVseSBhZnRlciB1cGxvYWRlZCB0byBHUFUuXG4gICAgICogISN6aFxuICAgICAqIOaYr+WQpuWcqOWwhui0tOWbvuS4iuS8oOiHsyBHUFUg5LmL5ZCO5Yig6Zmk5Y6f5aeL5Zu+54mH57yT5a2Y77yM5Yig6Zmk5LmL5ZCO5Zu+54mH5bCG5peg5rOV6L+b6KGMIFvliqjmgIHlkIjlm75dKGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvYWR2YW5jZWQtdG9waWNzL2R5bmFtaWMtYXRsYXMuaHRtbCnjgIJcbiAgICAgKiDlnKggV2ViIOW5s+WPsO+8jOS9oOmAmuW4uOS4jemcgOimgeW8gOWQr+i/meS4qumAiemhue+8jOWboOS4uuWcqCBXZWIg5bmz5Y+wIEltYWdlIOWvueixoeaJgOWNoOeUqOeahOWGheWtmOW+iOWwj+OAglxuICAgICAqIOS9huaYr+WcqOW+ruS/oeWwj+a4uOaIj+W5s+WPsOeahOW9k+WJjeeJiOacrO+8jEltYWdlIOWvueixoeS8mue8k+WtmOino+eggeWQjueahOWbvueJh+aVsOaNru+8jOWug+aJgOWNoOeUqOeahOWGheWtmOepuumXtOW+iOWkp+OAglxuICAgICAqIOaJgOS7peaIkeS7rOWcqOW+ruS/oeW5s+WPsOm7mOiupOW8gOWQr+S6hui/meS4qumAiemhue+8jOi/meagt+aIkeS7rOWwseWPr+S7peWcqOS4iuS8oCBHTCDotLTlm77kuYvlkI7nq4vljbPph4rmlL4gSW1hZ2Ug5a+56LGh55qE5YaF5a2Y77yM6YG/5YWN6L+H6auY55qE5YaF5a2Y5Y2g55So44CCXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBDTEVBTlVQX0lNQUdFX0NBQ0hFXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBDTEVBTlVQX0lNQUdFX0NBQ0hFOiBmYWxzZSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBXaGV0aGVyIG9yIG5vdCBzaG93IG1lc2ggd2lyZSBmcmFtZS5cbiAgICAgKiAhI3poXG4gICAgICog5piv5ZCm5pi+56S6572R5qC855qE57q/5qGG44CCXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBTSE9XX01FU0hfV0lSRUZSQU1FXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBTSE9XX01FU0hfV0lSRUZSQU1FOiBmYWxzZSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBXaGV0aGVyIG9yIG5vdCBzaG93IG1lc2ggbm9ybWFsLlxuICAgICAqICEjemhcbiAgICAgKiDmmK/lkKbmmL7npLrnvZHmoLznmoTms5Xnur/jgIJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IFNIT1dfTUVTSF9OT1JNQUxcbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIFNIT1dfTUVTSF9OT1JNQUw6IGZhbHNlLFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFdoZXRoZXIgdG8gZW5hYmxlIG11bHRpLXRvdWNoLlxuICAgICAqICEjemhcbiAgICAgKiDmmK/lkKblvIDlkK/lpJrngrnop6bmkbhcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IEVOQUJMRV9NVUxUSV9UT1VDSFxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBFTkFCTEVfTVVMVElfVE9VQ0g6IHRydWUsXG5cbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2VzOiBcbiAgICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSW1hZ2VCaXRtYXBcbiAgICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2luZG93T3JXb3JrZXJHbG9iYWxTY29wZS9jcmVhdGVJbWFnZUJpdG1hcFxuICAgICAqIFxuICAgICAqICEjZW5cbiAgICAgKiBXaGV0aGVyIHRvIHVzZSBpbWFnZSBiaXRtYXAgZmlyc3QuIElmIGVuYWJsZWQsIG1lbW9yeSB1c2FnZSB3aWxsIGluY3JlYXNlLlxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDmmK/lkKbkvJjlhYjkvb/nlKggaW1hZ2UgYml0bWFw77yM5ZCv55So5LmL5ZCO77yM5YaF5a2Y5Y2g55So5Lya5Y+Y6auYXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBBTExPV19JTUFHRV9CSVRNQVBcbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgQUxMT1dfSU1BR0VfQklUTUFQOiAhY2Muc3lzLmlzTW9iaWxlXG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoY2MubWFjcm8sICdST1RBVEVfQUNUSU9OX0NDVycsIHtcbiAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIGlmIChjYy5Sb3RhdGVUbyAmJiBjYy5Sb3RhdGVCeSkge1xuICAgICAgICAgICAgY2MuUm90YXRlVG8uX3JldmVyc2UgPSBjYy5Sb3RhdGVCeS5fcmV2ZXJzZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmxldCBTVVBQT1JUX1RFWFRVUkVfRk9STUFUUyA9IFsnLnBrbScsICcucHZyJywgJy53ZWJwJywgJy5qcGcnLCAnLmpwZWcnLCAnLmJtcCcsICcucG5nJ107XG5cbi8qKlxuICogISNlblxuICogVGhlIGltYWdlIGZvcm1hdCBzdXBwb3J0ZWQgYnkgdGhlIGVuZ2luZSBkZWZhdWx0cywgYW5kIHRoZSBzdXBwb3J0ZWQgZm9ybWF0cyBtYXkgZGlmZmVyIGluIGRpZmZlcmVudCBidWlsZCBwbGF0Zm9ybXMgYW5kIGRldmljZSB0eXBlcy5cbiAqIEN1cnJlbnRseSBhbGwgcGxhdGZvcm0gYW5kIGRldmljZSBzdXBwb3J0IFsnLndlYnAnLCAnLmpwZycsICcuanBlZycsICcuYm1wJywgJy5wbmcnXSwgVGhlIGlPUyBtb2JpbGUgcGxhdGZvcm0gYWxzbyBzdXBwb3J0cyB0aGUgUFZSIGZvcm1hdOOAglxuICogISN6aFxuICog5byV5pOO6buY6K6k5pSv5oyB55qE5Zu+54mH5qC85byP77yM5pSv5oyB55qE5qC85byP5Y+v6IO95Zyo5LiN5ZCM55qE5p6E5bu65bmz5Y+w5ZKM6K6+5aSH57G75Z6L5LiK5pyJ5omA5beu5Yir44CCXG4gKiDnm67liY3miYDmnInlubPlj7Dlkozorr7lpIfmlK/mjIHnmoTmoLzlvI/mnIkgWycud2VicCcsICcuanBnJywgJy5qcGVnJywgJy5ibXAnLCAnLnBuZyddLiDlj6blpJYgSW9zIOaJi+acuuW5s+WPsOi/mOmineWkluaUr+aMgeS6hiBQVlIg5qC85byP44CCXG4gKiBAcHJvcGVydHkge1N0cmluZ1tdfSBTVVBQT1JUX1RFWFRVUkVfRk9STUFUU1xuICovXG5jYy5tYWNyby5TVVBQT1JUX1RFWFRVUkVfRk9STUFUUyA9IFNVUFBPUlRfVEVYVFVSRV9GT1JNQVRTO1xuXG5cbi8qKlxuICogISNlbiBLZXkgbWFwIGZvciBrZXlib2FyZCBldmVudFxuICogISN6aCDplK7nm5jkuovku7bnmoTmjInplK7lgLxcbiAqIEBlbnVtIG1hY3JvLktFWVxuICogQGV4YW1wbGUge0BsaW5rIGNvY29zMmQvY29yZS9wbGF0Zm9ybS9DQ0NvbW1vbi9LRVkuanN9XG4gKi9cbmNjLm1hY3JvLktFWSA9IHtcbiAgICAvKipcbiAgICAgKiAhI2VuIE5vbmVcbiAgICAgKiAhI3poIOayoeacieWIhumFjVxuICAgICAqIEBwcm9wZXJ0eSBub25lXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBub25lOjAsXG5cbiAgICAvLyBhbmRyb2lkXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgYmFjayBrZXlcbiAgICAgKiAhI3poIOi/lOWbnumUrlxuICAgICAqIEBwcm9wZXJ0eSBiYWNrXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBiYWNrOjYsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgbWVudSBrZXlcbiAgICAgKiAhI3poIOiPnOWNlemUrlxuICAgICAqIEBwcm9wZXJ0eSBtZW51XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBtZW51OjE4LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgYmFja3NwYWNlIGtleVxuICAgICAqICEjemgg6YCA5qC86ZSuXG4gICAgICogQHByb3BlcnR5IGJhY2tzcGFjZVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgYmFja3NwYWNlOjgsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSB0YWIga2V5XG4gICAgICogISN6aCBUYWIg6ZSuXG4gICAgICogQHByb3BlcnR5IHRhYlxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgdGFiOjksXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBlbnRlciBrZXlcbiAgICAgKiAhI3poIOWbnui9pumUrlxuICAgICAqIEBwcm9wZXJ0eSBlbnRlclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZW50ZXI6MTMsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBzaGlmdCBrZXlcbiAgICAgKiAhI3poIFNoaWZ0IOmUrlxuICAgICAqIEBwcm9wZXJ0eSBzaGlmdFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgc2hpZnQ6MTYsIC8vc2hvdWxkIHVzZSBzaGlmdGtleSBpbnN0ZWFkXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBjdHJsIGtleVxuICAgICAqICEjemggQ3RybCDplK5cbiAgICAgKiBAcHJvcGVydHkgY3RybFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgY3RybDoxNywgLy9zaG91bGQgdXNlIGN0cmxrZXlcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGFsdCBrZXlcbiAgICAgKiAhI3poIEFsdCDplK5cbiAgICAgKiBAcHJvcGVydHkgYWx0XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBhbHQ6MTgsIC8vc2hvdWxkIHVzZSBhbHRrZXlcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHBhdXNlIGtleVxuICAgICAqICEjemgg5pqC5YGc6ZSuXG4gICAgICogQHByb3BlcnR5IHBhdXNlXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBwYXVzZToxOSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGNhcHMgbG9jayBrZXlcbiAgICAgKiAhI3poIOWkp+WGmemUgeWumumUrlxuICAgICAqIEBwcm9wZXJ0eSBjYXBzbG9ja1xuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgY2Fwc2xvY2s6MjAsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBlc2Mga2V5XG4gICAgICogISN6aCBFU0Mg6ZSuXG4gICAgICogQHByb3BlcnR5IGVzY2FwZVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZXNjYXBlOjI3LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgc3BhY2Uga2V5XG4gICAgICogISN6aCDnqbrmoLzplK5cbiAgICAgKiBAcHJvcGVydHkgc3BhY2VcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIHNwYWNlOjMyLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgcGFnZSB1cCBrZXlcbiAgICAgKiAhI3poIOWQkeS4iue/u+mhtemUrlxuICAgICAqIEBwcm9wZXJ0eSBwYWdldXBcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIHBhZ2V1cDozMyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHBhZ2UgZG93biBrZXlcbiAgICAgKiAhI3poIOWQkeS4i+e/u+mhtemUrlxuICAgICAqIEBwcm9wZXJ0eSBwYWdlZG93blxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgcGFnZWRvd246MzQsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBlbmQga2V5XG4gICAgICogISN6aCDnu5PmnZ/plK5cbiAgICAgKiBAcHJvcGVydHkgZW5kXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBlbmQ6MzUsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBob21lIGtleVxuICAgICAqICEjemgg5Li76I+c5Y2V6ZSuXG4gICAgICogQHByb3BlcnR5IGhvbWVcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGhvbWU6MzYsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBsZWZ0IGtleVxuICAgICAqICEjemgg5ZCR5bem566t5aS06ZSuXG4gICAgICogQHByb3BlcnR5IGxlZnRcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGxlZnQ6MzcsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSB1cCBrZXlcbiAgICAgKiAhI3poIOWQkeS4iueureWktOmUrlxuICAgICAqIEBwcm9wZXJ0eSB1cFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgdXA6MzgsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSByaWdodCBrZXlcbiAgICAgKiAhI3poIOWQkeWPs+eureWktOmUrlxuICAgICAqIEBwcm9wZXJ0eSByaWdodFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgcmlnaHQ6MzksXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBkb3duIGtleVxuICAgICAqICEjemgg5ZCR5LiL566t5aS06ZSuXG4gICAgICogQHByb3BlcnR5IGRvd25cbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGRvd246NDAsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBzZWxlY3Qga2V5XG4gICAgICogISN6aCBTZWxlY3Qg6ZSuXG4gICAgICogQHByb3BlcnR5IHNlbGVjdFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgc2VsZWN0OjQxLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgaW5zZXJ0IGtleVxuICAgICAqICEjemgg5o+S5YWl6ZSuXG4gICAgICogQHByb3BlcnR5IGluc2VydFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgaW5zZXJ0OjQ1LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgRGVsZXRlIGtleVxuICAgICAqICEjemgg5Yig6Zmk6ZSuXG4gICAgICogQHByb3BlcnR5IERlbGV0ZVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgRGVsZXRlOjQ2LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgJzAnIGtleSBvbiB0aGUgdG9wIG9mIHRoZSBhbHBoYW51bWVyaWMga2V5Ym9hcmQuXG4gICAgICogISN6aCDlrZfmr43plK7nm5jkuIrnmoQgMCDplK5cbiAgICAgKiBAcHJvcGVydHkgMFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgMDo0OCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlICcxJyBrZXkgb24gdGhlIHRvcCBvZiB0aGUgYWxwaGFudW1lcmljIGtleWJvYXJkLlxuICAgICAqICEjemgg5a2X5q+N6ZSu55uY5LiK55qEIDEg6ZSuXG4gICAgICogQHByb3BlcnR5IDFcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIDE6NDksXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSAnMicga2V5IG9uIHRoZSB0b3Agb2YgdGhlIGFscGhhbnVtZXJpYyBrZXlib2FyZC5cbiAgICAgKiAhI3poIOWtl+avjemUruebmOS4iueahCAyIOmUrlxuICAgICAqIEBwcm9wZXJ0eSAyXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICAyOjUwLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgJzMnIGtleSBvbiB0aGUgdG9wIG9mIHRoZSBhbHBoYW51bWVyaWMga2V5Ym9hcmQuXG4gICAgICogISN6aCDlrZfmr43plK7nm5jkuIrnmoQgMyDplK5cbiAgICAgKiBAcHJvcGVydHkgM1xuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgMzo1MSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlICc0JyBrZXkgb24gdGhlIHRvcCBvZiB0aGUgYWxwaGFudW1lcmljIGtleWJvYXJkLlxuICAgICAqICEjemgg5a2X5q+N6ZSu55uY5LiK55qEIDQg6ZSuXG4gICAgICogQHByb3BlcnR5IDRcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIDQ6NTIsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSAnNScga2V5IG9uIHRoZSB0b3Agb2YgdGhlIGFscGhhbnVtZXJpYyBrZXlib2FyZC5cbiAgICAgKiAhI3poIOWtl+avjemUruebmOS4iueahCA1IOmUrlxuICAgICAqIEBwcm9wZXJ0eSA1XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICA1OjUzLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgJzYnIGtleSBvbiB0aGUgdG9wIG9mIHRoZSBhbHBoYW51bWVyaWMga2V5Ym9hcmQuXG4gICAgICogISN6aCDlrZfmr43plK7nm5jkuIrnmoQgNiDplK5cbiAgICAgKiBAcHJvcGVydHkgNlxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgNjo1NCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlICc3JyBrZXkgb24gdGhlIHRvcCBvZiB0aGUgYWxwaGFudW1lcmljIGtleWJvYXJkLlxuICAgICAqICEjemgg5a2X5q+N6ZSu55uY5LiK55qEIDcg6ZSuXG4gICAgICogQHByb3BlcnR5IDdcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIDc6NTUsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSAnOCcga2V5IG9uIHRoZSB0b3Agb2YgdGhlIGFscGhhbnVtZXJpYyBrZXlib2FyZC5cbiAgICAgKiAhI3poIOWtl+avjemUruebmOS4iueahCA4IOmUrlxuICAgICAqIEBwcm9wZXJ0eSA4XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICA4OjU2LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgJzknIGtleSBvbiB0aGUgdG9wIG9mIHRoZSBhbHBoYW51bWVyaWMga2V5Ym9hcmQuXG4gICAgICogISN6aCDlrZfmr43plK7nm5jkuIrnmoQgOSDplK5cbiAgICAgKiBAcHJvcGVydHkgOVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgOTo1NyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGEga2V5XG4gICAgICogISN6aCBBIOmUrlxuICAgICAqIEBwcm9wZXJ0eSBhXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBhOjY1LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgYiBrZXlcbiAgICAgKiAhI3poIEIg6ZSuXG4gICAgICogQHByb3BlcnR5IGJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGI6NjYsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBjIGtleVxuICAgICAqICEjemggQyDplK5cbiAgICAgKiBAcHJvcGVydHkgY1xuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgYzo2NyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGQga2V5XG4gICAgICogISN6aCBEIOmUrlxuICAgICAqIEBwcm9wZXJ0eSBkXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBkOjY4LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZSBrZXlcbiAgICAgKiAhI3poIEUg6ZSuXG4gICAgICogQHByb3BlcnR5IGVcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGU6NjksXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBmIGtleVxuICAgICAqICEjemggRiDplK5cbiAgICAgKiBAcHJvcGVydHkgZlxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZjo3MCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGcga2V5XG4gICAgICogISN6aCBHIOmUrlxuICAgICAqIEBwcm9wZXJ0eSBnXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnOjcxLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgaCBrZXlcbiAgICAgKiAhI3poIEgg6ZSuXG4gICAgICogQHByb3BlcnR5IGhcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGg6NzIsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBpIGtleVxuICAgICAqICEjemggSSDplK5cbiAgICAgKiBAcHJvcGVydHkgaVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgaTo3MyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGoga2V5XG4gICAgICogISN6aCBKIOmUrlxuICAgICAqIEBwcm9wZXJ0eSBqXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBqOjc0LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgayBrZXlcbiAgICAgKiAhI3poIEsg6ZSuXG4gICAgICogQHByb3BlcnR5IGtcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGs6NzUsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBsIGtleVxuICAgICAqICEjemggTCDplK5cbiAgICAgKiBAcHJvcGVydHkgbFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgbDo3NixcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIG0ga2V5XG4gICAgICogISN6aCBNIOmUrlxuICAgICAqIEBwcm9wZXJ0eSBtXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBtOjc3LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgbiBrZXlcbiAgICAgKiAhI3poIE4g6ZSuXG4gICAgICogQHByb3BlcnR5IG5cbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIG46NzgsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBvIGtleVxuICAgICAqICEjemggTyDplK5cbiAgICAgKiBAcHJvcGVydHkgb1xuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgbzo3OSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHAga2V5XG4gICAgICogISN6aCBQIOmUrlxuICAgICAqIEBwcm9wZXJ0eSBwXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBwOjgwLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgcSBrZXlcbiAgICAgKiAhI3poIFEg6ZSuXG4gICAgICogQHByb3BlcnR5IHFcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIHE6ODEsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSByIGtleVxuICAgICAqICEjemggUiDplK5cbiAgICAgKiBAcHJvcGVydHkgclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgcjo4MixcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHMga2V5XG4gICAgICogISN6aCBTIOmUrlxuICAgICAqIEBwcm9wZXJ0eSBzXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBzOjgzLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgdCBrZXlcbiAgICAgKiAhI3poIFQg6ZSuXG4gICAgICogQHByb3BlcnR5IHRcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIHQ6ODQsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSB1IGtleVxuICAgICAqICEjemggVSDplK5cbiAgICAgKiBAcHJvcGVydHkgdVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgdTo4NSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHYga2V5XG4gICAgICogISN6aCBWIOmUrlxuICAgICAqIEBwcm9wZXJ0eSB2XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICB2Ojg2LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgdyBrZXlcbiAgICAgKiAhI3poIFcg6ZSuXG4gICAgICogQHByb3BlcnR5IHdcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIHc6ODcsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSB4IGtleVxuICAgICAqICEjemggWCDplK5cbiAgICAgKiBAcHJvcGVydHkgeFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgeDo4OCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHkga2V5XG4gICAgICogISN6aCBZIOmUrlxuICAgICAqIEBwcm9wZXJ0eSB5XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICB5Ojg5LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgeiBrZXlcbiAgICAgKiAhI3poIFog6ZSuXG4gICAgICogQHByb3BlcnR5IHpcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIHo6OTAsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBudW1lcmljIGtleXBhZCAwXG4gICAgICogISN6aCDmlbDlrZfplK7nm5ggMFxuICAgICAqIEBwcm9wZXJ0eSBudW0wXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBudW0wOjk2LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgbnVtZXJpYyBrZXlwYWQgMVxuICAgICAqICEjemgg5pWw5a2X6ZSu55uYIDFcbiAgICAgKiBAcHJvcGVydHkgbnVtMVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgbnVtMTo5NyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIG51bWVyaWMga2V5cGFkIDJcbiAgICAgKiAhI3poIOaVsOWtl+mUruebmCAyXG4gICAgICogQHByb3BlcnR5IG51bTJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIG51bTI6OTgsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBudW1lcmljIGtleXBhZCAzXG4gICAgICogISN6aCDmlbDlrZfplK7nm5ggM1xuICAgICAqIEBwcm9wZXJ0eSBudW0zXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBudW0zOjk5LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgbnVtZXJpYyBrZXlwYWQgNFxuICAgICAqICEjemgg5pWw5a2X6ZSu55uYIDRcbiAgICAgKiBAcHJvcGVydHkgbnVtNFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgbnVtNDoxMDAsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBudW1lcmljIGtleXBhZCA1XG4gICAgICogISN6aCDmlbDlrZfplK7nm5ggNVxuICAgICAqIEBwcm9wZXJ0eSBudW01XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBudW01OjEwMSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIG51bWVyaWMga2V5cGFkIDZcbiAgICAgKiAhI3poIOaVsOWtl+mUruebmCA2XG4gICAgICogQHByb3BlcnR5IG51bTZcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIG51bTY6MTAyLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgbnVtZXJpYyBrZXlwYWQgN1xuICAgICAqICEjemgg5pWw5a2X6ZSu55uYIDdcbiAgICAgKiBAcHJvcGVydHkgbnVtN1xuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgbnVtNzoxMDMsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBudW1lcmljIGtleXBhZCA4XG4gICAgICogISN6aCDmlbDlrZfplK7nm5ggOFxuICAgICAqIEBwcm9wZXJ0eSBudW04XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBudW04OjEwNCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIG51bWVyaWMga2V5cGFkIDlcbiAgICAgKiAhI3poIOaVsOWtl+mUruebmCA5XG4gICAgICogQHByb3BlcnR5IG51bTlcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIG51bTk6MTA1LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgbnVtZXJpYyBrZXlwYWQgJyonXG4gICAgICogISN6aCDmlbDlrZfplK7nm5ggKlxuICAgICAqIEBwcm9wZXJ0eSAqXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICAnKic6MTA2LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgbnVtZXJpYyBrZXlwYWQgJysnXG4gICAgICogISN6aCDmlbDlrZfplK7nm5ggK1xuICAgICAqIEBwcm9wZXJ0eSArXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICAnKyc6MTA3LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgbnVtZXJpYyBrZXlwYWQgJy0nXG4gICAgICogISN6aCDmlbDlrZfplK7nm5ggLVxuICAgICAqIEBwcm9wZXJ0eSAtXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICAnLSc6MTA5LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgbnVtZXJpYyBrZXlwYWQgJ2RlbGV0ZSdcbiAgICAgKiAhI3poIOaVsOWtl+mUruebmOWIoOmZpOmUrlxuICAgICAqIEBwcm9wZXJ0eSBudW1kZWxcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgICdudW1kZWwnOjExMCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIG51bWVyaWMga2V5cGFkICcvJ1xuICAgICAqICEjemgg5pWw5a2X6ZSu55uYIC9cbiAgICAgKiBAcHJvcGVydHkgL1xuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgJy8nOjExMSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIEYxIGZ1bmN0aW9uIGtleVxuICAgICAqICEjemggRjEg5Yqf6IO96ZSuXG4gICAgICogQHByb3BlcnR5IGYxXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBmMToxMTIsIC8vZjEtZjEyIGRvbnQgd29yayBvbiBpZVxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgRjIgZnVuY3Rpb24ga2V5XG4gICAgICogISN6aCBGMiDlip/og73plK5cbiAgICAgKiBAcHJvcGVydHkgZjJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGYyOjExMyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIEYzIGZ1bmN0aW9uIGtleVxuICAgICAqICEjemggRjMg5Yqf6IO96ZSuXG4gICAgICogQHByb3BlcnR5IGYzXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBmMzoxMTQsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBGNCBmdW5jdGlvbiBrZXlcbiAgICAgKiAhI3poIEY0IOWKn+iDvemUrlxuICAgICAqIEBwcm9wZXJ0eSBmNFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZjQ6MTE1LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgRjUgZnVuY3Rpb24ga2V5XG4gICAgICogISN6aCBGNSDlip/og73plK5cbiAgICAgKiBAcHJvcGVydHkgZjVcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGY1OjExNixcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIEY2IGZ1bmN0aW9uIGtleVxuICAgICAqICEjemggRjYg5Yqf6IO96ZSuXG4gICAgICogQHByb3BlcnR5IGY2XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBmNjoxMTcsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBGNyBmdW5jdGlvbiBrZXlcbiAgICAgKiAhI3poIEY3IOWKn+iDvemUrlxuICAgICAqIEBwcm9wZXJ0eSBmN1xuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZjc6MTE4LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgRjggZnVuY3Rpb24ga2V5XG4gICAgICogISN6aCBGOCDlip/og73plK5cbiAgICAgKiBAcHJvcGVydHkgZjhcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGY4OjExOSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIEY5IGZ1bmN0aW9uIGtleVxuICAgICAqICEjemggRjkg5Yqf6IO96ZSuXG4gICAgICogQHByb3BlcnR5IGY5XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBmOToxMjAsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBGMTAgZnVuY3Rpb24ga2V5XG4gICAgICogISN6aCBGMTAg5Yqf6IO96ZSuXG4gICAgICogQHByb3BlcnR5IGYxMFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZjEwOjEyMSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIEYxMSBmdW5jdGlvbiBrZXlcbiAgICAgKiAhI3poIEYxMSDlip/og73plK5cbiAgICAgKiBAcHJvcGVydHkgZjExXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBmMTE6MTIyLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgRjEyIGZ1bmN0aW9uIGtleVxuICAgICAqICEjemggRjEyIOWKn+iDvemUrlxuICAgICAqIEBwcm9wZXJ0eSBmMTJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGYxMjoxMjMsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBudW1sb2NrIGtleVxuICAgICAqICEjemgg5pWw5a2X6ZSB5a6a6ZSuXG4gICAgICogQHByb3BlcnR5IG51bWxvY2tcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIG51bWxvY2s6MTQ0LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgc2Nyb2xsIGxvY2sga2V5XG4gICAgICogISN6aCDmu5rliqjplIHlrprplK5cbiAgICAgKiBAcHJvcGVydHkgc2Nyb2xsbG9ja1xuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgc2Nyb2xsbG9jazoxNDUsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSAnOycga2V5LlxuICAgICAqICEjemgg5YiG5Y+36ZSuXG4gICAgICogQHByb3BlcnR5IDtcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgICc7JzoxODYsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSAnOycga2V5LlxuICAgICAqICEjemgg5YiG5Y+36ZSuXG4gICAgICogQHByb3BlcnR5IHNlbWljb2xvblxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgc2VtaWNvbG9uOjE4NixcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlICc9JyBrZXkuXG4gICAgICogISN6aCDnrYnkuo7lj7fplK5cbiAgICAgKiBAcHJvcGVydHkgZXF1YWxcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGVxdWFsOjE4NyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlICc9JyBrZXkuXG4gICAgICogISN6aCDnrYnkuo7lj7fplK5cbiAgICAgKiBAcHJvcGVydHkgPVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgJz0nOjE4NyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlICcsJyBrZXkuXG4gICAgICogISN6aCDpgJflj7fplK5cbiAgICAgKiBAcHJvcGVydHkgLFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgJywnOjE4OCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlICcsJyBrZXkuXG4gICAgICogISN6aCDpgJflj7fplK5cbiAgICAgKiBAcHJvcGVydHkgY29tbWFcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGNvbW1hOjE4OCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGRhc2ggJy0nIGtleS5cbiAgICAgKiAhI3poIOS4reWIkue6v+mUrlxuICAgICAqIEBwcm9wZXJ0eSBkYXNoXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBkYXNoOjE4OSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlICcuJyBrZXkuXG4gICAgICogISN6aCDlj6Xlj7fplK5cbiAgICAgKiBAcHJvcGVydHkgLlxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgJy4nOjE5MCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlICcuJyBrZXlcbiAgICAgKiAhI3poIOWPpeWPt+mUrlxuICAgICAqIEBwcm9wZXJ0eSBwZXJpb2RcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIHBlcmlvZDoxOTAsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBmb3J3YXJkIHNsYXNoIGtleVxuICAgICAqICEjemgg5q2j5pac5p2g6ZSuXG4gICAgICogQHByb3BlcnR5IGZvcndhcmRzbGFzaFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZm9yd2FyZHNsYXNoOjE5MSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGdyYXZlIGtleVxuICAgICAqICEjemgg5oyJ6ZSuIGBcbiAgICAgKiBAcHJvcGVydHkgZ3JhdmVcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdyYXZlOjE5MixcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlICdbJyBrZXlcbiAgICAgKiAhI3poIOaMiemUriBbXG4gICAgICogQHByb3BlcnR5IFtcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgICdbJzoyMTksXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSAnWycga2V5XG4gICAgICogISN6aCDmjInplK4gW1xuICAgICAqIEBwcm9wZXJ0eSBvcGVuYnJhY2tldFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgb3BlbmJyYWNrZXQ6MjE5LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgJ1xcJyBrZXlcbiAgICAgKiAhI3poIOWPjeaWnOadoOmUrlxuICAgICAqIEBwcm9wZXJ0eSBiYWNrc2xhc2hcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGJhY2tzbGFzaDoyMjAsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSAnXScga2V5XG4gICAgICogISN6aCDmjInplK4gXVxuICAgICAqIEBwcm9wZXJ0eSBdXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICAnXSc6MjIxLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgJ10nIGtleVxuICAgICAqICEjemgg5oyJ6ZSuIF1cbiAgICAgKiBAcHJvcGVydHkgY2xvc2VicmFja2V0XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBjbG9zZWJyYWNrZXQ6MjIxLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgcXVvdGUga2V5XG4gICAgICogISN6aCDljZXlvJXlj7fplK5cbiAgICAgKiBAcHJvcGVydHkgcXVvdGVcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIHF1b3RlOjIyMixcblxuICAgIC8vIGdhbWVwYWQgY29udHJvbGxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGRwYWQgbGVmdCBrZXlcbiAgICAgKiAhI3poIOWvvOiIqumUriDlkJHlt6ZcbiAgICAgKiBAcHJvcGVydHkgZHBhZExlZnRcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGRwYWRMZWZ0OjEwMDAsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBkcGFkIHJpZ2h0IGtleVxuICAgICAqICEjemgg5a+86Iiq6ZSuIOWQkeWPs1xuICAgICAqIEBwcm9wZXJ0eSBkcGFkUmlnaHRcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGRwYWRSaWdodDoxMDAxLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZHBhZCB1cCBrZXlcbiAgICAgKiAhI3poIOWvvOiIqumUriDlkJHkuIpcbiAgICAgKiBAcHJvcGVydHkgZHBhZFVwXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBkcGFkVXA6MTAwMyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGRwYWQgZG93biBrZXlcbiAgICAgKiAhI3poIOWvvOiIqumUriDlkJHkuItcbiAgICAgKiBAcHJvcGVydHkgZHBhZERvd25cbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGRwYWREb3duOjEwMDQsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBkcGFkIGNlbnRlciBrZXlcbiAgICAgKiAhI3poIOWvvOiIqumUriDnoa7lrprplK5cbiAgICAgKiBAcHJvcGVydHkgZHBhZENlbnRlclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgZHBhZENlbnRlcjoxMDA1XG59O1xuXG4vKipcbiAqIEltYWdlIGZvcm1hdHNcbiAqIEBlbnVtIG1hY3JvLkltYWdlRm9ybWF0XG4gKi9cbmNjLm1hY3JvLkltYWdlRm9ybWF0ID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogSW1hZ2UgRm9ybWF0OkpQR1xuICAgICAqIEBwcm9wZXJ0eSBKUEdcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIEpQRzogMCxcbiAgICAvKipcbiAgICAgKiBJbWFnZSBGb3JtYXQ6UE5HXG4gICAgICogQHByb3BlcnR5IFBOR1xuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgUE5HOiAxLFxuICAgIC8qKlxuICAgICAqIEltYWdlIEZvcm1hdDpUSUZGXG4gICAgICogQHByb3BlcnR5IFRJRkZcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIFRJRkY6IDIsXG4gICAgLyoqXG4gICAgICogSW1hZ2UgRm9ybWF0OldFQlBcbiAgICAgKiBAcHJvcGVydHkgV0VCUFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgV0VCUDogMyxcbiAgICAvKipcbiAgICAgKiBJbWFnZSBGb3JtYXQ6UFZSXG4gICAgICogQHByb3BlcnR5IFBWUlxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgUFZSOiA0LFxuICAgIC8qKlxuICAgICAqIEltYWdlIEZvcm1hdDpFVENcbiAgICAgKiBAcHJvcGVydHkgRVRDXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBFVEM6IDUsXG4gICAgLyoqXG4gICAgICogSW1hZ2UgRm9ybWF0OlMzVENcbiAgICAgKiBAcHJvcGVydHkgUzNUQ1xuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgUzNUQzogNixcbiAgICAvKipcbiAgICAgKiBJbWFnZSBGb3JtYXQ6QVRJVENcbiAgICAgKiBAcHJvcGVydHkgQVRJVENcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIEFUSVRDOiA3LFxuICAgIC8qKlxuICAgICAqIEltYWdlIEZvcm1hdDpUR0FcbiAgICAgKiBAcHJvcGVydHkgVEdBXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBUR0E6IDgsXG4gICAgLyoqXG4gICAgICogSW1hZ2UgRm9ybWF0OlJBV0RBVEFcbiAgICAgKiBAcHJvcGVydHkgUkFXREFUQVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgUkFXREFUQTogOSxcbiAgICAvKipcbiAgICAgKiBJbWFnZSBGb3JtYXQ6VU5LTk9XTlxuICAgICAqIEBwcm9wZXJ0eSBVTktOT1dOXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBVTktOT1dOOiAxMFxufSk7XG5cbi8qKlxuICogISNlblxuICogRW51bSBmb3IgYmxlbmQgZmFjdG9yXG4gKiBSZWZlciB0bzogaHR0cDovL3d3dy5hbmRlcnNyaWdnZWxzZW4uZGsvZ2xibGVuZGZ1bmMucGhwXG4gKiAhI3poXG4gKiDmt7flkIjlm6DlrZBcbiAqIOWPr+WPguiAgzogaHR0cDovL3d3dy5hbmRlcnNyaWdnZWxzZW4uZGsvZ2xibGVuZGZ1bmMucGhwXG4gKiBAZW51bSBtYWNyby5CbGVuZEZhY3RvclxuICovXG5jYy5tYWNyby5CbGVuZEZhY3RvciA9IGNjLkVudW0oe1xuICAgIC8qKlxuICAgICAqICEjZW4gQWxsIHVzZVxuICAgICAqICEjemgg5YWo6YOo5L2/55SoXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IE9ORVxuICAgICAqL1xuICAgIE9ORTogICAgICAgICAgICAgICAgICAgIDEsICAvL2NjLm1hY3JvLk9ORVxuICAgIC8qKlxuICAgICAqICEjZW4gTm90IGFsbFxuICAgICAqICEjemgg5YWo6YOo5LiN55SoXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFpFUk9cbiAgICAgKi9cbiAgICBaRVJPOiAgICAgICAgICAgICAgICAgICAwLCAgICAgIC8vY2MuWkVST1xuICAgIC8qKlxuICAgICAqICEjZW4gVXNpbmcgdGhlIHNvdXJjZSBhbHBoYVxuICAgICAqICEjemgg5L2/55So5rqQ6aKc6Imy55qE6YCP5piO5bqmXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNSQ19BTFBIQVxuICAgICAqL1xuICAgIFNSQ19BTFBIQTogICAgICAgICAgICAgIDB4MzAyLCAgLy9jYy5TUkNfQUxQSEFcbiAgICAvKipcbiAgICAgKiAhI2VuIFVzaW5nIHRoZSBzb3VyY2UgY29sb3JcbiAgICAgKiAhI3poIOS9v+eUqOa6kOminOiJslxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTUkNfQ09MT1JcbiAgICAgKi9cbiAgICBTUkNfQ09MT1I6ICAgICAgICAgICAgICAweDMwMCwgIC8vY2MuU1JDX0NPTE9SXG4gICAgLyoqXG4gICAgICogISNlbiBVc2luZyB0aGUgdGFyZ2V0IGFscGhhXG4gICAgICogISN6aCDkvb/nlKjnm67moIfpopzoibLnmoTpgI/mmI7luqZcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRFNUX0FMUEhBXG4gICAgICovXG4gICAgRFNUX0FMUEhBOiAgICAgICAgICAgICAgMHgzMDQsICAvL2NjLkRTVF9BTFBIQVxuICAgIC8qKlxuICAgICAqICEjZW4gVXNpbmcgdGhlIHRhcmdldCBjb2xvclxuICAgICAqICEjemgg5L2/55So55uu5qCH6aKc6ImyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IERTVF9DT0xPUlxuICAgICAqL1xuICAgIERTVF9DT0xPUjogICAgICAgICAgICAgIDB4MzA2LCAgLy9jYy5EU1RfQ09MT1JcbiAgICAvKipcbiAgICAgKiAhI2VuIE1pbnVzIHRoZSBzb3VyY2UgYWxwaGFcbiAgICAgKiAhI3poIOWHj+WOu+a6kOminOiJsueahOmAj+aYjuW6plxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBPTkVfTUlOVVNfU1JDX0FMUEhBXG4gICAgICovXG4gICAgT05FX01JTlVTX1NSQ19BTFBIQTogICAgMHgzMDMsICAvL2NjLk9ORV9NSU5VU19TUkNfQUxQSEFcbiAgICAvKipcbiAgICAgKiAhI2VuIE1pbnVzIHRoZSBzb3VyY2UgY29sb3JcbiAgICAgKiAhI3poIOWHj+WOu+a6kOminOiJslxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBPTkVfTUlOVVNfU1JDX0NPTE9SXG4gICAgICovXG4gICAgT05FX01JTlVTX1NSQ19DT0xPUjogICAgMHgzMDEsICAvL2NjLk9ORV9NSU5VU19TUkNfQ09MT1JcbiAgICAvKipcbiAgICAgKiAhI2VuIE1pbnVzIHRoZSB0YXJnZXQgYWxwaGFcbiAgICAgKiAhI3poIOWHj+WOu+ebruagh+minOiJsueahOmAj+aYjuW6plxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBPTkVfTUlOVVNfRFNUX0FMUEhBXG4gICAgICovXG4gICAgT05FX01JTlVTX0RTVF9BTFBIQTogICAgMHgzMDUsICAvL2NjLk9ORV9NSU5VU19EU1RfQUxQSEFcbiAgICAvKipcbiAgICAgKiAhI2VuIE1pbnVzIHRoZSB0YXJnZXQgY29sb3JcbiAgICAgKiAhI3poIOWHj+WOu+ebruagh+minOiJslxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBPTkVfTUlOVVNfRFNUX0NPTE9SXG4gICAgICovXG4gICAgT05FX01JTlVTX0RTVF9DT0xPUjogICAgMHgzMDcsICAvL2NjLk9ORV9NSU5VU19EU1RfQ09MT1Jcbn0pO1xuXG4vKipcbiAqIEBlbnVtIG1hY3JvLlRleHRBbGlnbm1lbnRcbiAqL1xuY2MubWFjcm8uVGV4dEFsaWdubWVudCA9IGNjLkVudW0oe1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBMRUZUXG4gICAgICovXG4gICAgTEVGVDogMCxcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQ0VOVEVSXG4gICAgICovXG4gICAgQ0VOVEVSOiAxLFxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBSSUdIVFxuICAgICAqL1xuICAgIFJJR0hUOiAyXG59KTtcblxuLyoqXG4gKiBAZW51bSBWZXJ0aWNhbFRleHRBbGlnbm1lbnRcbiAqL1xuY2MubWFjcm8uVmVydGljYWxUZXh0QWxpZ25tZW50ID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFRPUFxuICAgICAqL1xuICAgIFRPUDogMCxcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQ0VOVEVSXG4gICAgICovXG4gICAgQ0VOVEVSOiAxLFxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBCT1RUT01cbiAgICAgKi9cbiAgICBCT1RUT006IDJcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNjLm1hY3JvO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=