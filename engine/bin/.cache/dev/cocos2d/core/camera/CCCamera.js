
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/camera/CCCamera.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _valueTypes = require("../value-types");

var _geomUtils = require("../geom-utils");

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
var AffineTrans = require('../utils/affine-transform');

var renderer = require('../renderer/index');

var RenderFlow = require('../renderer/render-flow');

var game = require('../CCGame');

var RendererCamera = null;

if (CC_JSB && CC_NATIVERENDERER) {
  RendererCamera = window.renderer.Camera;
} else {
  RendererCamera = require('../../renderer/scene/camera');
}

var _mat4_temp_1 = cc.mat4();

var _mat4_temp_2 = cc.mat4();

var _v3_temp_1 = cc.v3();

var _v3_temp_2 = cc.v3();

var _v3_temp_3 = cc.v3();

var _cameras = []; // unstable array

function updateMainCamera() {
  for (var i = 0, minDepth = Number.MAX_VALUE; i < _cameras.length; i++) {
    var camera = _cameras[i];

    if (camera._depth < minDepth) {
      Camera.main = camera;
      minDepth = camera._depth;
    }
  }
}

var _debugCamera = null;

function repositionDebugCamera() {
  if (!_debugCamera) return;

  var node = _debugCamera.getNode();

  var canvas = cc.game.canvas;
  node.z = canvas.height / 1.1566;
  node.x = canvas.width / 2;
  node.y = canvas.height / 2;
}
/**
 * !#en Values for Camera.clearFlags, determining what to clear when rendering a Camera.
 * !#zh 摄像机清除标记位，决定摄像机渲染时会清除哪些状态
 * @enum Camera.ClearFlags
 */


var ClearFlags = cc.Enum({
  /**
   * !#en
   * Clear the background color.
   * !#zh
   * 清除背景颜色
   * @property COLOR
   */
  COLOR: 1,

  /**
   * !#en
   * Clear the depth buffer.
   * !#zh
   * 清除深度缓冲区
   * @property DEPTH
   */
  DEPTH: 2,

  /**
   * !#en
   * Clear the stencil.
   * !#zh
   * 清除模板缓冲区
   * @property STENCIL
   */
  STENCIL: 4
});
var StageFlags = cc.Enum({
  OPAQUE: 1,
  TRANSPARENT: 2
});
/**
 * !#en
 * Camera is usefull when making reel game or other games which need scroll screen.
 * Using camera will be more efficient than moving node to scroll screen.
 * Camera 
 * !#zh
 * 摄像机在制作卷轴或是其他需要移动屏幕的游戏时比较有用，使用摄像机将会比移动节点来移动屏幕更加高效。
 * @class Camera
 * @extends Component
 */

var Camera = cc.Class({
  name: 'cc.Camera',
  "extends": cc.Component,
  ctor: function ctor() {
    if (game.renderType !== game.RENDER_TYPE_CANVAS) {
      var camera = new RendererCamera();
      camera.setStages(['opaque']);
      camera.dirty = true;
      this._inited = false;
      this._camera = camera;
    } else {
      this._inited = true;
    }
  },
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.others/Camera',
    inspector: 'packages://inspector/inspectors/comps/camera.js',
    executeInEditMode: true
  },
  properties: {
    _cullingMask: 0xffffffff,
    _clearFlags: ClearFlags.DEPTH | ClearFlags.STENCIL,
    _backgroundColor: cc.color(0, 0, 0, 255),
    _depth: 0,
    _zoomRatio: 1,
    _targetTexture: null,
    _fov: 60,
    _orthoSize: 10,
    _nearClip: 1,
    _farClip: 4096,
    _ortho: true,
    _rect: cc.rect(0, 0, 1, 1),
    _renderStages: 1,
    _alignWithScreen: true,

    /**
     * !#en
     * The camera zoom ratio, only support 2D camera.
     * !#zh
     * 摄像机缩放比率, 只支持 2D camera。
     * @property {Number} zoomRatio
     */
    zoomRatio: {
      get: function get() {
        return this._zoomRatio;
      },
      set: function set(value) {
        this._zoomRatio = value;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.zoomRatio'
    },

    /**
     * !#en
     * Field of view. The width of the Camera’s view angle, measured in degrees along the local Y axis.
     * !#zh
     * 决定摄像机视角的宽度，当摄像机处于透视投影模式下这个属性才会生效。
     * @property {Number} fov
     * @default 60
     */
    fov: {
      get: function get() {
        return this._fov;
      },
      set: function set(v) {
        this._fov = v;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.fov'
    },

    /**
     * !#en
     * The viewport size of the Camera when set to orthographic projection.
     * !#zh
     * 摄像机在正交投影模式下的视窗大小。
     * @property {Number} orthoSize
     * @default 10
     */
    orthoSize: {
      get: function get() {
        return this._orthoSize;
      },
      set: function set(v) {
        this._orthoSize = v;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.orthoSize'
    },

    /**
     * !#en
     * The near clipping plane.
     * !#zh
     * 摄像机的近剪裁面。
     * @property {Number} nearClip
     * @default 0.1
     */
    nearClip: {
      get: function get() {
        return this._nearClip;
      },
      set: function set(v) {
        this._nearClip = v;

        this._updateClippingpPlanes();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.nearClip'
    },

    /**
     * !#en
     * The far clipping plane.
     * !#zh
     * 摄像机的远剪裁面。
     * @property {Number} farClip
     * @default 4096
     */
    farClip: {
      get: function get() {
        return this._farClip;
      },
      set: function set(v) {
        this._farClip = v;

        this._updateClippingpPlanes();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.farClip'
    },

    /**
     * !#en
     * Is the camera orthographic (true) or perspective (false)?
     * !#zh
     * 设置摄像机的投影模式是正交还是透视模式。
     * @property {Boolean} ortho
     * @default false
     */
    ortho: {
      get: function get() {
        return this._ortho;
      },
      set: function set(v) {
        this._ortho = v;

        this._updateProjection();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.ortho'
    },

    /**
     * !#en
     * Four values (0 ~ 1) that indicate where on the screen this camera view will be drawn.
     * !#zh
     * 决定摄像机绘制在屏幕上哪个位置，值为（0 ~ 1）。
     * @property {Rect} rect
     * @default cc.rect(0,0,1,1)
     */
    rect: {
      get: function get() {
        return this._rect;
      },
      set: function set(v) {
        this._rect = v;

        this._updateRect();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.rect'
    },

    /**
     * !#en
     * This is used to render parts of the scene selectively.
     * !#zh
     * 决定摄像机会渲染场景的哪一部分。
     * @property {Number} cullingMask
     */
    cullingMask: {
      get: function get() {
        return this._cullingMask;
      },
      set: function set(value) {
        this._cullingMask = value;

        this._updateCameraMask();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.cullingMask'
    },

    /**
     * !#en
     * Determining what to clear when camera rendering.
     * !#zh
     * 决定摄像机渲染时会清除哪些状态。
     * @property {Camera.ClearFlags} clearFlags
     */
    clearFlags: {
      get: function get() {
        return this._clearFlags;
      },
      set: function set(value) {
        this._clearFlags = value;

        if (this._camera) {
          this._camera.setClearFlags(value);
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.clearFlags'
    },

    /**
     * !#en
     * The color with which the screen will be cleared.
     * !#zh
     * 摄像机用于清除屏幕的背景色。
     * @property {Color} backgroundColor
     */
    backgroundColor: {
      get: function get() {
        return this._backgroundColor;
      },
      set: function set(value) {
        if (!this._backgroundColor.equals(value)) {
          this._backgroundColor.set(value);

          this._updateBackgroundColor();
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.backgroundColor'
    },

    /**
     * !#en
     * Camera's depth in the camera rendering order. Cameras with higher depth are rendered after cameras with lower depth.
     * !#zh
     * 摄像机深度。用于决定摄像机的渲染顺序，值越大渲染在越上层。
     * @property {Number} depth
     */
    depth: {
      get: function get() {
        return this._depth;
      },
      set: function set(value) {
        if (Camera.main === this) {
          if (this._depth < value) {
            updateMainCamera();
          }
        } else if (Camera.main && value < Camera.main._depth && _cameras.includes(this)) {
          Camera.main = this;
        }

        this._depth = value;

        if (this._camera) {
          this._camera.setPriority(value);
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.depth'
    },

    /**
     * !#en
     * Destination render texture.
     * Usually cameras render directly to screen, but for some effects it is useful to make a camera render into a texture.
     * !#zh
     * 摄像机渲染的目标 RenderTexture。
     * 一般摄像机会直接渲染到屏幕上，但是有一些效果可以使用摄像机渲染到 RenderTexture 上再对 RenderTexture 进行处理来实现。
     * @property {RenderTexture} targetTexture
     */
    targetTexture: {
      get: function get() {
        return this._targetTexture;
      },
      set: function set(value) {
        this._targetTexture = value;

        this._updateTargetTexture();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.targetTexture'
    },

    /**
     * !#en
     * Sets the camera's render stages.
     * !#zh
     * 设置摄像机渲染的阶段
     * @property {Number} renderStages
     */
    renderStages: {
      get: function get() {
        return this._renderStages;
      },
      set: function set(val) {
        this._renderStages = val;

        this._updateStages();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.renderStages'
    },

    /**
     * !#en Whether auto align camera viewport to screen
     * !#zh 是否自动将摄像机的视口对准屏幕
     * @property {Boolean} alignWithScreen
     */
    alignWithScreen: {
      get: function get() {
        return this._alignWithScreen;
      },
      set: function set(v) {
        this._alignWithScreen = v;
      }
    },
    _is3D: {
      get: function get() {
        return this.node && this.node._is3DNode;
      }
    }
  },
  statics: {
    /**
     * !#en
     * The primary camera in the scene. Returns the rear most rendered camera, which is the camera with the lowest depth.
     * !#zh
     * 当前场景中激活的主摄像机。将会返回渲染在屏幕最底层，也就是 depth 最小的摄像机。
     * @property {Camera} main
     * @static
     */
    main: null,

    /**
     * !#en
     * All enabled cameras.
     * !#zh
     * 当前激活的所有摄像机。
     * @property {[Camera]} cameras
     * @static
     */
    cameras: _cameras,
    ClearFlags: ClearFlags,

    /**
     * !#en
     * Get the first camera which the node belong to.
     * !#zh
     * 获取节点所在的第一个摄像机。
     * @method findCamera
     * @param {Node} node 
     * @return {Camera}
     * @static
     */
    findCamera: function findCamera(node) {
      for (var i = 0, l = _cameras.length; i < l; i++) {
        var camera = _cameras[i];

        if (camera.containsNode(node)) {
          return camera;
        }
      }

      return null;
    },
    _findRendererCamera: function _findRendererCamera(node) {
      var cameras = renderer.scene._cameras;

      for (var i = 0; i < cameras._count; i++) {
        if (cameras._data[i]._cullingMask & node._cullingMask) {
          return cameras._data[i];
        }
      }

      return null;
    },
    _setupDebugCamera: function _setupDebugCamera() {
      if (_debugCamera) return;
      if (game.renderType === game.RENDER_TYPE_CANVAS) return;
      var camera = new RendererCamera();
      _debugCamera = camera;
      camera.setStages(['opaque']);
      camera.setFov(Math.PI * 60 / 180);
      camera.setNear(0.1);
      camera.setFar(4096);
      camera.dirty = true;
      camera.cullingMask = 1 << cc.Node.BuiltinGroupIndex.DEBUG;
      camera.setPriority(cc.macro.MAX_ZINDEX);
      camera.setClearFlags(0);
      camera.setColor(0, 0, 0, 0);
      var node = new cc.Node();
      camera.setNode(node);
      repositionDebugCamera();
      cc.view.on('design-resolution-changed', repositionDebugCamera);
      renderer.scene.addCamera(camera);
    }
  },
  _updateCameraMask: function _updateCameraMask() {
    if (this._camera) {
      var mask = this._cullingMask & ~(1 << cc.Node.BuiltinGroupIndex.DEBUG);
      this._camera.cullingMask = mask;
    }
  },
  _updateBackgroundColor: function _updateBackgroundColor() {
    if (!this._camera) return;
    var color = this._backgroundColor;

    this._camera.setColor(color.r / 255, color.g / 255, color.b / 255, color.a / 255);
  },
  _updateTargetTexture: function _updateTargetTexture() {
    if (!this._camera) return;
    var texture = this._targetTexture;

    this._camera.setFrameBuffer(texture ? texture._framebuffer : null);
  },
  _updateClippingpPlanes: function _updateClippingpPlanes() {
    if (!this._camera) return;

    this._camera.setNear(this._nearClip);

    this._camera.setFar(this._farClip);
  },
  _updateProjection: function _updateProjection() {
    if (!this._camera) return;
    var type = this._ortho ? 1 : 0;

    this._camera.setType(type);
  },
  _updateRect: function _updateRect() {
    if (!this._camera) return;
    var rect = this._rect;

    this._camera.setRect(rect.x, rect.y, rect.width, rect.height);
  },
  _updateStages: function _updateStages() {
    var flags = this._renderStages;
    var stages = [];

    if (flags & StageFlags.OPAQUE) {
      stages.push('opaque');
    }

    if (flags & StageFlags.TRANSPARENT) {
      stages.push('transparent');
    }

    this._camera.setStages(stages);
  },
  _init: function _init() {
    if (this._inited) return;
    this._inited = true;
    var camera = this._camera;
    if (!camera) return;
    camera.setNode(this.node);
    camera.setClearFlags(this._clearFlags);
    camera.setPriority(this._depth);

    this._updateBackgroundColor();

    this._updateCameraMask();

    this._updateTargetTexture();

    this._updateClippingpPlanes();

    this._updateProjection();

    this._updateStages();

    this._updateRect();

    this.beforeDraw();
  },
  onLoad: function onLoad() {
    this._init();
  },
  onEnable: function onEnable() {
    if (!CC_EDITOR && game.renderType !== game.RENDER_TYPE_CANVAS) {
      cc.director.on(cc.Director.EVENT_BEFORE_DRAW, this.beforeDraw, this);
      renderer.scene.addCamera(this._camera);
    }

    _cameras.push(this);

    if (!Camera.main || this._depth < Camera.main._depth) {
      Camera.main = this;
    }
  },
  onDisable: function onDisable() {
    if (!CC_EDITOR && game.renderType !== game.RENDER_TYPE_CANVAS) {
      cc.director.off(cc.Director.EVENT_BEFORE_DRAW, this.beforeDraw, this);
      renderer.scene.removeCamera(this._camera);
    }

    cc.js.array.fastRemove(_cameras, this);

    if (Camera.main === this) {
      Camera.main = null;
      updateMainCamera();
    }
  },

  /**
   * !#en
   * Get the screen to world matrix, only support 2D camera which alignWithScreen is true.
   * !#zh
   * 获取屏幕坐标系到世界坐标系的矩阵，只适用于 alignWithScreen 为 true 的 2D 摄像机。
   * @method getScreenToWorldMatrix2D
   * @param {Mat4} out - the matrix to receive the result
   * @return {Mat4} out
   */
  getScreenToWorldMatrix2D: function getScreenToWorldMatrix2D(out) {
    this.getWorldToScreenMatrix2D(out);

    _valueTypes.Mat4.invert(out, out);

    return out;
  },

  /**
   * !#en
   * Get the world to camera matrix, only support 2D camera which alignWithScreen is true.
   * !#zh
   * 获取世界坐标系到摄像机坐标系的矩阵，只适用于 alignWithScreen 为 true 的 2D 摄像机。
   * @method getWorldToScreenMatrix2D
   * @param {Mat4} out - the matrix to receive the result
   * @return {Mat4} out
   */
  getWorldToScreenMatrix2D: function getWorldToScreenMatrix2D(out) {
    this.node.getWorldRT(_mat4_temp_1);
    var zoomRatio = this.zoomRatio;
    var _mat4_temp_1m = _mat4_temp_1.m;
    _mat4_temp_1m[0] *= zoomRatio;
    _mat4_temp_1m[1] *= zoomRatio;
    _mat4_temp_1m[4] *= zoomRatio;
    _mat4_temp_1m[5] *= zoomRatio;
    var m12 = _mat4_temp_1m[12];
    var m13 = _mat4_temp_1m[13];
    var center = cc.visibleRect.center;
    _mat4_temp_1m[12] = center.x - (_mat4_temp_1m[0] * m12 + _mat4_temp_1m[4] * m13);
    _mat4_temp_1m[13] = center.y - (_mat4_temp_1m[1] * m12 + _mat4_temp_1m[5] * m13);

    if (out !== _mat4_temp_1) {
      _valueTypes.Mat4.copy(out, _mat4_temp_1);
    }

    return out;
  },

  /**
   * !#en
   * Convert point from screen to world.
   * !#zh
   * 将坐标从屏幕坐标系转换到世界坐标系。
   * @method getScreenToWorldPoint
   * @param {Vec3|Vec2} screenPosition 
   * @param {Vec3|Vec2} [out] 
   * @return {Vec3|Vec2} out
   */
  getScreenToWorldPoint: function getScreenToWorldPoint(screenPosition, out) {
    if (this.node.is3DNode) {
      out = out || new cc.Vec3();

      this._camera.screenToWorld(out, screenPosition, cc.visibleRect.width, cc.visibleRect.height);
    } else {
      out = out || new cc.Vec2();
      this.getScreenToWorldMatrix2D(_mat4_temp_1);

      _valueTypes.Vec2.transformMat4(out, screenPosition, _mat4_temp_1);
    }

    return out;
  },

  /**
   * !#en
   * Convert point from world to screen.
   * !#zh
   * 将坐标从世界坐标系转化到屏幕坐标系。
   * @method getWorldToScreenPoint
   * @param {Vec3|Vec2} worldPosition 
   * @param {Vec3|Vec2} [out] 
   * @return {Vec3|Vec2} out
   */
  getWorldToScreenPoint: function getWorldToScreenPoint(worldPosition, out) {
    if (this.node.is3DNode) {
      out = out || new cc.Vec3();

      this._camera.worldToScreen(out, worldPosition, cc.visibleRect.width, cc.visibleRect.height);
    } else {
      out = out || new cc.Vec2();
      this.getWorldToScreenMatrix2D(_mat4_temp_1);

      _valueTypes.Vec2.transformMat4(out, worldPosition, _mat4_temp_1);
    }

    return out;
  },

  /**
   * !#en
   * Get a ray from screen position
   * !#zh
   * 从屏幕坐标获取一条射线
   * @method getRay
   * @param {Vec2} screenPos
   * @return {Ray}
   */
  getRay: function getRay(screenPos) {
    if (!cc.geomUtils) return screenPos;

    _valueTypes.Vec3.set(_v3_temp_3, screenPos.x, screenPos.y, 1);

    this._camera.screenToWorld(_v3_temp_2, _v3_temp_3, cc.visibleRect.width, cc.visibleRect.height);

    if (this.ortho) {
      _valueTypes.Vec3.set(_v3_temp_3, screenPos.x, screenPos.y, -1);

      this._camera.screenToWorld(_v3_temp_1, _v3_temp_3, cc.visibleRect.width, cc.visibleRect.height);
    } else {
      this.node.getWorldPosition(_v3_temp_1);
    }

    return _geomUtils.Ray.fromPoints(new _geomUtils.Ray(), _v3_temp_1, _v3_temp_2);
  },

  /**
   * !#en
   * Check whether the node is in the camera.
   * !#zh
   * 检测节点是否被此摄像机影响
   * @method containsNode
   * @param {Node} node - the node which need to check
   * @return {Boolean}
   */
  containsNode: function containsNode(node) {
    return (node._cullingMask & this.cullingMask) > 0;
  },

  /**
   * !#en
   * Render the camera manually.
   * !#zh
   * 手动渲染摄像机。
   * @method render
   * @param {Node} [rootNode] 
   */
  render: function render(rootNode) {
    rootNode = rootNode || cc.director.getScene();
    if (!rootNode) return null; // force update node world matrix

    this.node.getWorldMatrix(_mat4_temp_1);
    this.beforeDraw();
    RenderFlow.renderCamera(this._camera, rootNode);
  },
  _onAlignWithScreen: function _onAlignWithScreen() {
    var height = cc.game.canvas.height / cc.view._scaleY;
    var targetTexture = this._targetTexture;

    if (targetTexture) {
      if (CC_EDITOR) {
        height = cc.engine.getDesignResolutionSize().height;
      } else {
        height = cc.visibleRect.height;
      }
    }

    var fov = this._fov * cc.macro.RAD;
    this.node.z = height / (Math.tan(fov / 2) * 2);
    fov = Math.atan(Math.tan(fov / 2) / this.zoomRatio) * 2;

    this._camera.setFov(fov);

    this._camera.setOrthoHeight(height / 2 / this.zoomRatio);

    this.node.setRotation(0, 0, 0, 1);
  },
  beforeDraw: function beforeDraw() {
    if (!this._camera) return;

    if (this._alignWithScreen) {
      this._onAlignWithScreen();
    } else {
      var fov = this._fov * cc.macro.RAD;
      fov = Math.atan(Math.tan(fov / 2) / this.zoomRatio) * 2;

      this._camera.setFov(fov);

      this._camera.setOrthoHeight(this._orthoSize / this.zoomRatio);
    }

    this._camera.dirty = true;
  }
}); // deprecated

cc.js.mixin(Camera.prototype, {
  /**
   * !#en
   * Returns the matrix that transform the node's (local) space coordinates into the camera's space coordinates.
   * !#zh
   * 返回一个将节点坐标系转换到摄像机坐标系下的矩阵
   * @method getNodeToCameraTransform
   * @deprecated since v2.0.0
   * @param {Node} node - the node which should transform
   * @return {AffineTransform}
   */
  getNodeToCameraTransform: function getNodeToCameraTransform(node) {
    var out = AffineTrans.identity();
    node.getWorldMatrix(_mat4_temp_2);

    if (this.containsNode(node)) {
      this.getWorldToCameraMatrix(_mat4_temp_1);

      _valueTypes.Mat4.mul(_mat4_temp_2, _mat4_temp_2, _mat4_temp_1);
    }

    AffineTrans.fromMat4(out, _mat4_temp_2);
    return out;
  },

  /**
   * !#en
   * Conver a camera coordinates point to world coordinates.
   * !#zh
   * 将一个摄像机坐标系下的点转换到世界坐标系下。
   * @method getCameraToWorldPoint
   * @deprecated since v2.1.3
   * @param {Vec2} point - the point which should transform
   * @param {Vec2} [out] - the point to receive the result
   * @return {Vec2} out
   */
  getCameraToWorldPoint: function getCameraToWorldPoint(point, out) {
    return this.getScreenToWorldPoint(point, out);
  },

  /**
   * !#en
   * Conver a world coordinates point to camera coordinates.
   * !#zh
   * 将一个世界坐标系下的点转换到摄像机坐标系下。
   * @method getWorldToCameraPoint
   * @deprecated since v2.1.3
   * @param {Vec2} point 
   * @param {Vec2} [out] - the point to receive the result
   * @return {Vec2} out
   */
  getWorldToCameraPoint: function getWorldToCameraPoint(point, out) {
    return this.getWorldToScreenPoint(point, out);
  },

  /**
   * !#en
   * Get the camera to world matrix
   * !#zh
   * 获取摄像机坐标系到世界坐标系的矩阵
   * @method getCameraToWorldMatrix
   * @deprecated since v2.1.3
   * @param {Mat4} out - the matrix to receive the result
   * @return {Mat4} out
   */
  getCameraToWorldMatrix: function getCameraToWorldMatrix(out) {
    return this.getScreenToWorldMatrix2D(out);
  },

  /**
   * !#en
   * Get the world to camera matrix
   * !#zh
   * 获取世界坐标系到摄像机坐标系的矩阵
   * @method getWorldToCameraMatrix
   * @deprecated since v2.1.3
   * @param {Mat4} out - the matrix to receive the result
   * @return {Mat4} out
   */
  getWorldToCameraMatrix: function getWorldToCameraMatrix(out) {
    return this.getWorldToScreenMatrix2D(out);
  }
});
module.exports = cc.Camera = Camera;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NhbWVyYS9DQ0NhbWVyYS5qcyJdLCJuYW1lcyI6WyJBZmZpbmVUcmFucyIsInJlcXVpcmUiLCJyZW5kZXJlciIsIlJlbmRlckZsb3ciLCJnYW1lIiwiUmVuZGVyZXJDYW1lcmEiLCJDQ19KU0IiLCJDQ19OQVRJVkVSRU5ERVJFUiIsIndpbmRvdyIsIkNhbWVyYSIsIl9tYXQ0X3RlbXBfMSIsImNjIiwibWF0NCIsIl9tYXQ0X3RlbXBfMiIsIl92M190ZW1wXzEiLCJ2MyIsIl92M190ZW1wXzIiLCJfdjNfdGVtcF8zIiwiX2NhbWVyYXMiLCJ1cGRhdGVNYWluQ2FtZXJhIiwiaSIsIm1pbkRlcHRoIiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwibGVuZ3RoIiwiY2FtZXJhIiwiX2RlcHRoIiwibWFpbiIsIl9kZWJ1Z0NhbWVyYSIsInJlcG9zaXRpb25EZWJ1Z0NhbWVyYSIsIm5vZGUiLCJnZXROb2RlIiwiY2FudmFzIiwieiIsImhlaWdodCIsIngiLCJ3aWR0aCIsInkiLCJDbGVhckZsYWdzIiwiRW51bSIsIkNPTE9SIiwiREVQVEgiLCJTVEVOQ0lMIiwiU3RhZ2VGbGFncyIsIk9QQVFVRSIsIlRSQU5TUEFSRU5UIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwiY3RvciIsInJlbmRlclR5cGUiLCJSRU5ERVJfVFlQRV9DQU5WQVMiLCJzZXRTdGFnZXMiLCJkaXJ0eSIsIl9pbml0ZWQiLCJfY2FtZXJhIiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImluc3BlY3RvciIsImV4ZWN1dGVJbkVkaXRNb2RlIiwicHJvcGVydGllcyIsIl9jdWxsaW5nTWFzayIsIl9jbGVhckZsYWdzIiwiX2JhY2tncm91bmRDb2xvciIsImNvbG9yIiwiX3pvb21SYXRpbyIsIl90YXJnZXRUZXh0dXJlIiwiX2ZvdiIsIl9vcnRob1NpemUiLCJfbmVhckNsaXAiLCJfZmFyQ2xpcCIsIl9vcnRobyIsIl9yZWN0IiwicmVjdCIsIl9yZW5kZXJTdGFnZXMiLCJfYWxpZ25XaXRoU2NyZWVuIiwiem9vbVJhdGlvIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJ0b29sdGlwIiwiQ0NfREVWIiwiZm92IiwidiIsIm9ydGhvU2l6ZSIsIm5lYXJDbGlwIiwiX3VwZGF0ZUNsaXBwaW5ncFBsYW5lcyIsImZhckNsaXAiLCJvcnRobyIsIl91cGRhdGVQcm9qZWN0aW9uIiwiX3VwZGF0ZVJlY3QiLCJjdWxsaW5nTWFzayIsIl91cGRhdGVDYW1lcmFNYXNrIiwiY2xlYXJGbGFncyIsInNldENsZWFyRmxhZ3MiLCJiYWNrZ3JvdW5kQ29sb3IiLCJlcXVhbHMiLCJfdXBkYXRlQmFja2dyb3VuZENvbG9yIiwiZGVwdGgiLCJpbmNsdWRlcyIsInNldFByaW9yaXR5IiwidGFyZ2V0VGV4dHVyZSIsIl91cGRhdGVUYXJnZXRUZXh0dXJlIiwicmVuZGVyU3RhZ2VzIiwidmFsIiwiX3VwZGF0ZVN0YWdlcyIsImFsaWduV2l0aFNjcmVlbiIsIl9pczNEIiwiX2lzM0ROb2RlIiwic3RhdGljcyIsImNhbWVyYXMiLCJmaW5kQ2FtZXJhIiwibCIsImNvbnRhaW5zTm9kZSIsIl9maW5kUmVuZGVyZXJDYW1lcmEiLCJzY2VuZSIsIl9jb3VudCIsIl9kYXRhIiwiX3NldHVwRGVidWdDYW1lcmEiLCJzZXRGb3YiLCJNYXRoIiwiUEkiLCJzZXROZWFyIiwic2V0RmFyIiwiTm9kZSIsIkJ1aWx0aW5Hcm91cEluZGV4IiwiREVCVUciLCJtYWNybyIsIk1BWF9aSU5ERVgiLCJzZXRDb2xvciIsInNldE5vZGUiLCJ2aWV3Iiwib24iLCJhZGRDYW1lcmEiLCJtYXNrIiwiciIsImciLCJiIiwiYSIsInRleHR1cmUiLCJzZXRGcmFtZUJ1ZmZlciIsIl9mcmFtZWJ1ZmZlciIsInR5cGUiLCJzZXRUeXBlIiwic2V0UmVjdCIsImZsYWdzIiwic3RhZ2VzIiwicHVzaCIsIl9pbml0IiwiYmVmb3JlRHJhdyIsIm9uTG9hZCIsIm9uRW5hYmxlIiwiZGlyZWN0b3IiLCJEaXJlY3RvciIsIkVWRU5UX0JFRk9SRV9EUkFXIiwib25EaXNhYmxlIiwib2ZmIiwicmVtb3ZlQ2FtZXJhIiwianMiLCJhcnJheSIsImZhc3RSZW1vdmUiLCJnZXRTY3JlZW5Ub1dvcmxkTWF0cml4MkQiLCJvdXQiLCJnZXRXb3JsZFRvU2NyZWVuTWF0cml4MkQiLCJNYXQ0IiwiaW52ZXJ0IiwiZ2V0V29ybGRSVCIsIl9tYXQ0X3RlbXBfMW0iLCJtIiwibTEyIiwibTEzIiwiY2VudGVyIiwidmlzaWJsZVJlY3QiLCJjb3B5IiwiZ2V0U2NyZWVuVG9Xb3JsZFBvaW50Iiwic2NyZWVuUG9zaXRpb24iLCJpczNETm9kZSIsIlZlYzMiLCJzY3JlZW5Ub1dvcmxkIiwiVmVjMiIsInRyYW5zZm9ybU1hdDQiLCJnZXRXb3JsZFRvU2NyZWVuUG9pbnQiLCJ3b3JsZFBvc2l0aW9uIiwid29ybGRUb1NjcmVlbiIsImdldFJheSIsInNjcmVlblBvcyIsImdlb21VdGlscyIsImdldFdvcmxkUG9zaXRpb24iLCJSYXkiLCJmcm9tUG9pbnRzIiwicmVuZGVyIiwicm9vdE5vZGUiLCJnZXRTY2VuZSIsImdldFdvcmxkTWF0cml4IiwicmVuZGVyQ2FtZXJhIiwiX29uQWxpZ25XaXRoU2NyZWVuIiwiX3NjYWxlWSIsImVuZ2luZSIsImdldERlc2lnblJlc29sdXRpb25TaXplIiwiUkFEIiwidGFuIiwiYXRhbiIsInNldE9ydGhvSGVpZ2h0Iiwic2V0Um90YXRpb24iLCJtaXhpbiIsInByb3RvdHlwZSIsImdldE5vZGVUb0NhbWVyYVRyYW5zZm9ybSIsImlkZW50aXR5IiwiZ2V0V29ybGRUb0NhbWVyYU1hdHJpeCIsIm11bCIsImZyb21NYXQ0IiwiZ2V0Q2FtZXJhVG9Xb3JsZFBvaW50IiwicG9pbnQiLCJnZXRXb3JsZFRvQ2FtZXJhUG9pbnQiLCJnZXRDYW1lcmFUb1dvcmxkTWF0cml4IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQTBCQTs7QUFDQTs7QUEzQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2QkEs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UUFBSSxLQUFLcUcsWUFBTCxDQUFrQnBGLElBQWxCLENBQUosRUFBNkI7QUFDekIsV0FBS21MLHNCQUFMLENBQTRCdk0sWUFBNUI7O0FBQ0EySix1QkFBSzZDLEdBQUwsQ0FBU3JNLFlBQVQsRUFBdUJBLFlBQXZCLEVBQXFDSCxZQUFyQztBQUNIOztBQUNEVixJQUFBQSxXQUFXLENBQUNtTixRQUFaLENBQXFCaEQsR0FBckIsRUFBMEJ0SixZQUExQjtBQUNBLFdBQU9zSixHQUFQO0FBQ0gsR0FwQnlCOztBQXNCMUI7Ozs7Ozs7Ozs7O0FBV0FpRCxFQUFBQSxxQkFqQzBCLGlDQWlDSEMsS0FqQ0csRUFpQ0lsRCxHQWpDSixFQWlDUztBQUMvQixXQUFPLEtBQUtZLHFCQUFMLENBQTJCc0MsS0FBM0IsRUFBa0NsRCxHQUFsQyxDQUFQO0FBQ0gsR0FuQ3lCOztBQXFDMUI7Ozs7Ozs7Ozs7O0FBV0FtRCxFQUFBQSxxQkFoRDBCLGlDQWdESEQsS0FoREcsRUFnRElsRCxHQWhESixFQWdEUztBQUMvQixXQUFPLEtBQUttQixxQkFBTCxDQUEyQitCLEtBQTNCLEVBQWtDbEQsR0FBbEMsQ0FBUDtBQUNILEdBbER5Qjs7QUFvRDFCOzs7Ozs7Ozs7O0FBVUFvRCxFQUFBQSxzQkE5RDBCLGtDQThERnBELEdBOURFLEVBOERHO0FBQ3pCLFdBQU8sS0FBS0Qsd0JBQUwsQ0FBOEJDLEdBQTlCLENBQVA7QUFDSCxHQWhFeUI7O0FBbUUxQjs7Ozs7Ozs7OztBQVVBOEMsRUFBQUEsc0JBN0UwQixrQ0E2RUY5QyxHQTdFRSxFQTZFRztBQUN6QixXQUFPLEtBQUtDLHdCQUFMLENBQThCRCxHQUE5QixDQUFQO0FBQ0g7QUEvRXlCLENBQTlCO0FBa0ZBcUQsTUFBTSxDQUFDQyxPQUFQLEdBQWlCOU0sRUFBRSxDQUFDRixNQUFILEdBQVlBLE1BQTdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgeyBNYXQ0LCBWZWMyLCBWZWMzIH0gZnJvbSAnLi4vdmFsdWUtdHlwZXMnO1xuaW1wb3J0IHsgUmF5IH0gZnJvbSAnLi4vZ2VvbS11dGlscyc7XG5cbmNvbnN0IEFmZmluZVRyYW5zID0gcmVxdWlyZSgnLi4vdXRpbHMvYWZmaW5lLXRyYW5zZm9ybScpO1xuY29uc3QgcmVuZGVyZXIgPSByZXF1aXJlKCcuLi9yZW5kZXJlci9pbmRleCcpO1xuY29uc3QgUmVuZGVyRmxvdyA9IHJlcXVpcmUoJy4uL3JlbmRlcmVyL3JlbmRlci1mbG93Jyk7XG5jb25zdCBnYW1lID0gcmVxdWlyZSgnLi4vQ0NHYW1lJyk7XG5cbmxldCBSZW5kZXJlckNhbWVyYSA9IG51bGw7XG5pZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XG4gICAgUmVuZGVyZXJDYW1lcmEgPSB3aW5kb3cucmVuZGVyZXIuQ2FtZXJhO1xufSBlbHNlIHtcbiAgICBSZW5kZXJlckNhbWVyYSA9IHJlcXVpcmUoJy4uLy4uL3JlbmRlcmVyL3NjZW5lL2NhbWVyYScpO1xufVxuXG5sZXQgX21hdDRfdGVtcF8xID0gY2MubWF0NCgpO1xubGV0IF9tYXQ0X3RlbXBfMiA9IGNjLm1hdDQoKTtcblxubGV0IF92M190ZW1wXzEgPSBjYy52MygpO1xubGV0IF92M190ZW1wXzIgPSBjYy52MygpO1xubGV0IF92M190ZW1wXzMgPSBjYy52MygpO1xuXG5sZXQgX2NhbWVyYXMgPSBbXTsgIC8vIHVuc3RhYmxlIGFycmF5XG5cbmZ1bmN0aW9uIHVwZGF0ZU1haW5DYW1lcmEgKCkge1xuICAgIGZvciAobGV0IGkgPSAwLCBtaW5EZXB0aCA9IE51bWJlci5NQVhfVkFMVUU7IGkgPCBfY2FtZXJhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgY2FtZXJhID0gX2NhbWVyYXNbaV07XG4gICAgICAgIGlmIChjYW1lcmEuX2RlcHRoIDwgbWluRGVwdGgpIHtcbiAgICAgICAgICAgIENhbWVyYS5tYWluID0gY2FtZXJhO1xuICAgICAgICAgICAgbWluRGVwdGggPSBjYW1lcmEuX2RlcHRoO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5sZXQgX2RlYnVnQ2FtZXJhID0gbnVsbDtcblxuZnVuY3Rpb24gcmVwb3NpdGlvbkRlYnVnQ2FtZXJhICgpIHtcbiAgICBpZiAoIV9kZWJ1Z0NhbWVyYSkgcmV0dXJuO1xuXG4gICAgbGV0IG5vZGUgPSBfZGVidWdDYW1lcmEuZ2V0Tm9kZSgpO1xuICAgIGxldCBjYW52YXMgPSBjYy5nYW1lLmNhbnZhcztcbiAgICBub2RlLnogPSBjYW52YXMuaGVpZ2h0IC8gMS4xNTY2O1xuICAgIG5vZGUueCA9IGNhbnZhcy53aWR0aCAvIDI7XG4gICAgbm9kZS55ID0gY2FudmFzLmhlaWdodCAvIDI7XG59XG5cbi8qKlxuICogISNlbiBWYWx1ZXMgZm9yIENhbWVyYS5jbGVhckZsYWdzLCBkZXRlcm1pbmluZyB3aGF0IHRvIGNsZWFyIHdoZW4gcmVuZGVyaW5nIGEgQ2FtZXJhLlxuICogISN6aCDmkYTlg4/mnLrmuIXpmaTmoIforrDkvY3vvIzlhrPlrprmkYTlg4/mnLrmuLLmn5Pml7bkvJrmuIXpmaTlk6rkupvnirbmgIFcbiAqIEBlbnVtIENhbWVyYS5DbGVhckZsYWdzXG4gKi9cbmxldCBDbGVhckZsYWdzID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIENsZWFyIHRoZSBiYWNrZ3JvdW5kIGNvbG9yLlxuICAgICAqICEjemhcbiAgICAgKiDmuIXpmaTog4zmma/popzoibJcbiAgICAgKiBAcHJvcGVydHkgQ09MT1JcbiAgICAgKi9cbiAgICBDT0xPUjogMSxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ2xlYXIgdGhlIGRlcHRoIGJ1ZmZlci5cbiAgICAgKiAhI3poXG4gICAgICog5riF6Zmk5rex5bqm57yT5Yay5Yy6XG4gICAgICogQHByb3BlcnR5IERFUFRIXG4gICAgICovXG4gICAgREVQVEg6IDIsXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIENsZWFyIHRoZSBzdGVuY2lsLlxuICAgICAqICEjemhcbiAgICAgKiDmuIXpmaTmqKHmnb/nvJPlhrLljLpcbiAgICAgKiBAcHJvcGVydHkgU1RFTkNJTFxuICAgICAqL1xuICAgIFNURU5DSUw6IDQsXG59KTtcblxubGV0IFN0YWdlRmxhZ3MgPSBjYy5FbnVtKHtcbiAgICBPUEFRVUU6IDEsXG4gICAgVFJBTlNQQVJFTlQ6IDJcbn0pO1xuXG4vKipcbiAqICEjZW5cbiAqIENhbWVyYSBpcyB1c2VmdWxsIHdoZW4gbWFraW5nIHJlZWwgZ2FtZSBvciBvdGhlciBnYW1lcyB3aGljaCBuZWVkIHNjcm9sbCBzY3JlZW4uXG4gKiBVc2luZyBjYW1lcmEgd2lsbCBiZSBtb3JlIGVmZmljaWVudCB0aGFuIG1vdmluZyBub2RlIHRvIHNjcm9sbCBzY3JlZW4uXG4gKiBDYW1lcmEgXG4gKiAhI3poXG4gKiDmkYTlg4/mnLrlnKjliLbkvZzljbfovbTmiJbmmK/lhbbku5bpnIDopoHnp7vliqjlsY/luZXnmoTmuLjmiI/ml7bmr5TovoPmnInnlKjvvIzkvb/nlKjmkYTlg4/mnLrlsIbkvJrmr5Tnp7vliqjoioLngrnmnaXnp7vliqjlsY/luZXmm7TliqDpq5jmlYjjgIJcbiAqIEBjbGFzcyBDYW1lcmFcbiAqIEBleHRlbmRzIENvbXBvbmVudFxuICovXG5sZXQgQ2FtZXJhID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5DYW1lcmEnLFxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICBpZiAoZ2FtZS5yZW5kZXJUeXBlICE9PSBnYW1lLlJFTkRFUl9UWVBFX0NBTlZBUykge1xuICAgICAgICAgICAgbGV0IGNhbWVyYSA9IG5ldyBSZW5kZXJlckNhbWVyYSgpO1xuXG4gICAgICAgICAgICBjYW1lcmEuc2V0U3RhZ2VzKFtcbiAgICAgICAgICAgICAgICAnb3BhcXVlJyxcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICBjYW1lcmEuZGlydHkgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLl9pbml0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2NhbWVyYSA9IGNhbWVyYTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50Lm90aGVycy9DYW1lcmEnLFxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL2NhbWVyYS5qcycsXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX2N1bGxpbmdNYXNrOiAweGZmZmZmZmZmLFxuICAgICAgICBfY2xlYXJGbGFnczogQ2xlYXJGbGFncy5ERVBUSCB8IENsZWFyRmxhZ3MuU1RFTkNJTCxcbiAgICAgICAgX2JhY2tncm91bmRDb2xvcjogY2MuY29sb3IoMCwgMCwgMCwgMjU1KSxcbiAgICAgICAgX2RlcHRoOiAwLFxuICAgICAgICBfem9vbVJhdGlvOiAxLFxuICAgICAgICBfdGFyZ2V0VGV4dHVyZTogbnVsbCxcbiAgICAgICAgX2ZvdjogNjAsXG4gICAgICAgIF9vcnRob1NpemU6IDEwLFxuICAgICAgICBfbmVhckNsaXA6IDEsXG4gICAgICAgIF9mYXJDbGlwOiA0MDk2LFxuICAgICAgICBfb3J0aG86IHRydWUsXG4gICAgICAgIF9yZWN0OiBjYy5yZWN0KDAsIDAsIDEsIDEpLFxuICAgICAgICBfcmVuZGVyU3RhZ2VzOiAxLFxuICAgICAgICBfYWxpZ25XaXRoU2NyZWVuOiB0cnVlLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBjYW1lcmEgem9vbSByYXRpbywgb25seSBzdXBwb3J0IDJEIGNhbWVyYS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDmkYTlg4/mnLrnvKnmlL7mr5TnjocsIOWPquaUr+aMgSAyRCBjYW1lcmHjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHpvb21SYXRpb1xuICAgICAgICAgKi9cbiAgICAgICAgem9vbVJhdGlvOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl96b29tUmF0aW87XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3pvb21SYXRpbyA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuY2FtZXJhLnpvb21SYXRpbycsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogRmllbGQgb2Ygdmlldy4gVGhlIHdpZHRoIG9mIHRoZSBDYW1lcmHigJlzIHZpZXcgYW5nbGUsIG1lYXN1cmVkIGluIGRlZ3JlZXMgYWxvbmcgdGhlIGxvY2FsIFkgYXhpcy5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDlhrPlrprmkYTlg4/mnLrop4bop5LnmoTlrr3luqbvvIzlvZPmkYTlg4/mnLrlpITkuo7pgI/op4bmipXlvbHmqKHlvI/kuIvov5nkuKrlsZ7mgKfmiY3kvJrnlJ/mlYjjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGZvdlxuICAgICAgICAgKiBAZGVmYXVsdCA2MFxuICAgICAgICAgKi9cbiAgICAgICAgZm92OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb3Y7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZm92ID0gdjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmNhbWVyYS5mb3YnLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSB2aWV3cG9ydCBzaXplIG9mIHRoZSBDYW1lcmEgd2hlbiBzZXQgdG8gb3J0aG9ncmFwaGljIHByb2plY3Rpb24uXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5pGE5YOP5py65Zyo5q2j5Lqk5oqV5b2x5qih5byP5LiL55qE6KeG56qX5aSn5bCP44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBvcnRob1NpemVcbiAgICAgICAgICogQGRlZmF1bHQgMTBcbiAgICAgICAgICovXG4gICAgICAgIG9ydGhvU2l6ZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb3J0aG9TaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX29ydGhvU2l6ZSA9IHY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5jYW1lcmEub3J0aG9TaXplJyxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgbmVhciBjbGlwcGluZyBwbGFuZS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDmkYTlg4/mnLrnmoTov5Hliaroo4HpnaLjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG5lYXJDbGlwXG4gICAgICAgICAqIEBkZWZhdWx0IDAuMVxuICAgICAgICAgKi9cbiAgICAgICAgbmVhckNsaXA6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25lYXJDbGlwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX25lYXJDbGlwID0gdjtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVDbGlwcGluZ3BQbGFuZXMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmNhbWVyYS5uZWFyQ2xpcCcsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIGZhciBjbGlwcGluZyBwbGFuZS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDmkYTlg4/mnLrnmoTov5zliaroo4HpnaLjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGZhckNsaXBcbiAgICAgICAgICogQGRlZmF1bHQgNDA5NlxuICAgICAgICAgKi9cbiAgICAgICAgZmFyQ2xpcDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZmFyQ2xpcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mYXJDbGlwID0gdjtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVDbGlwcGluZ3BQbGFuZXMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmNhbWVyYS5mYXJDbGlwJyxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBJcyB0aGUgY2FtZXJhIG9ydGhvZ3JhcGhpYyAodHJ1ZSkgb3IgcGVyc3BlY3RpdmUgKGZhbHNlKT9cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDorr7nva7mkYTlg4/mnLrnmoTmipXlvbHmqKHlvI/mmK/mraPkuqTov5jmmK/pgI/op4bmqKHlvI/jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBvcnRob1xuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgb3J0aG86IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29ydGhvO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX29ydGhvID0gdjtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVQcm9qZWN0aW9uKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5jYW1lcmEub3J0aG8nLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIEZvdXIgdmFsdWVzICgwIH4gMSkgdGhhdCBpbmRpY2F0ZSB3aGVyZSBvbiB0aGUgc2NyZWVuIHRoaXMgY2FtZXJhIHZpZXcgd2lsbCBiZSBkcmF3bi5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDlhrPlrprmkYTlg4/mnLrnu5jliLblnKjlsY/luZXkuIrlk6rkuKrkvY3nva7vvIzlgLzkuLrvvIgwIH4gMe+8ieOAglxuICAgICAgICAgKiBAcHJvcGVydHkge1JlY3R9IHJlY3RcbiAgICAgICAgICogQGRlZmF1bHQgY2MucmVjdCgwLDAsMSwxKVxuICAgICAgICAgKi9cbiAgICAgICAgcmVjdDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWN0ID0gdjtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSZWN0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5jYW1lcmEucmVjdCcsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhpcyBpcyB1c2VkIHRvIHJlbmRlciBwYXJ0cyBvZiB0aGUgc2NlbmUgc2VsZWN0aXZlbHkuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5Yaz5a6a5pGE5YOP5py65Lya5riy5p+T5Zy65pmv55qE5ZOq5LiA6YOo5YiG44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBjdWxsaW5nTWFza1xuICAgICAgICAgKi9cbiAgICAgICAgY3VsbGluZ01hc2s6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1bGxpbmdNYXNrO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdWxsaW5nTWFzayA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNhbWVyYU1hc2soKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmNhbWVyYS5jdWxsaW5nTWFzaycsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogRGV0ZXJtaW5pbmcgd2hhdCB0byBjbGVhciB3aGVuIGNhbWVyYSByZW5kZXJpbmcuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5Yaz5a6a5pGE5YOP5py65riy5p+T5pe25Lya5riF6Zmk5ZOq5Lqb54q25oCB44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Q2FtZXJhLkNsZWFyRmxhZ3N9IGNsZWFyRmxhZ3NcbiAgICAgICAgICovXG4gICAgICAgIGNsZWFyRmxhZ3M6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NsZWFyRmxhZ3M7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NsZWFyRmxhZ3MgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FtZXJhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbWVyYS5zZXRDbGVhckZsYWdzKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5jYW1lcmEuY2xlYXJGbGFncycsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIGNvbG9yIHdpdGggd2hpY2ggdGhlIHNjcmVlbiB3aWxsIGJlIGNsZWFyZWQuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5pGE5YOP5py655So5LqO5riF6Zmk5bGP5bmV55qE6IOM5pmv6Imy44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Q29sb3J9IGJhY2tncm91bmRDb2xvclxuICAgICAgICAgKi9cbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fYmFja2dyb3VuZENvbG9yLmVxdWFscyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmFja2dyb3VuZENvbG9yLnNldCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUJhY2tncm91bmRDb2xvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmNhbWVyYS5iYWNrZ3JvdW5kQ29sb3InLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIENhbWVyYSdzIGRlcHRoIGluIHRoZSBjYW1lcmEgcmVuZGVyaW5nIG9yZGVyLiBDYW1lcmFzIHdpdGggaGlnaGVyIGRlcHRoIGFyZSByZW5kZXJlZCBhZnRlciBjYW1lcmFzIHdpdGggbG93ZXIgZGVwdGguXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5pGE5YOP5py65rex5bqm44CC55So5LqO5Yaz5a6a5pGE5YOP5py655qE5riy5p+T6aG65bqP77yM5YC86LaK5aSn5riy5p+T5Zyo6LaK5LiK5bGC44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkZXB0aFxuICAgICAgICAgKi9cbiAgICAgICAgZGVwdGg6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlcHRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoQ2FtZXJhLm1haW4gPT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RlcHRoIDwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZU1haW5DYW1lcmEoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChDYW1lcmEubWFpbiAmJiB2YWx1ZSA8IENhbWVyYS5tYWluLl9kZXB0aCAmJiBfY2FtZXJhcy5pbmNsdWRlcyh0aGlzKSkge1xuICAgICAgICAgICAgICAgICAgICBDYW1lcmEubWFpbiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVwdGggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FtZXJhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbWVyYS5zZXRQcmlvcml0eSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuY2FtZXJhLmRlcHRoJyxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBEZXN0aW5hdGlvbiByZW5kZXIgdGV4dHVyZS5cbiAgICAgICAgICogVXN1YWxseSBjYW1lcmFzIHJlbmRlciBkaXJlY3RseSB0byBzY3JlZW4sIGJ1dCBmb3Igc29tZSBlZmZlY3RzIGl0IGlzIHVzZWZ1bCB0byBtYWtlIGEgY2FtZXJhIHJlbmRlciBpbnRvIGEgdGV4dHVyZS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDmkYTlg4/mnLrmuLLmn5PnmoTnm67moIcgUmVuZGVyVGV4dHVyZeOAglxuICAgICAgICAgKiDkuIDoiKzmkYTlg4/mnLrkvJrnm7TmjqXmuLLmn5PliLDlsY/luZXkuIrvvIzkvYbmmK/mnInkuIDkupvmlYjmnpzlj6/ku6Xkvb/nlKjmkYTlg4/mnLrmuLLmn5PliLAgUmVuZGVyVGV4dHVyZSDkuIrlho3lr7kgUmVuZGVyVGV4dHVyZSDov5vooYzlpITnkIbmnaXlrp7njrDjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtSZW5kZXJUZXh0dXJlfSB0YXJnZXRUZXh0dXJlXG4gICAgICAgICAqL1xuICAgICAgICB0YXJnZXRUZXh0dXJlOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90YXJnZXRUZXh0dXJlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXRUZXh0dXJlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlVGFyZ2V0VGV4dHVyZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuY2FtZXJhLnRhcmdldFRleHR1cmUnLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFNldHMgdGhlIGNhbWVyYSdzIHJlbmRlciBzdGFnZXMuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6K6+572u5pGE5YOP5py65riy5p+T55qE6Zi25q61XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByZW5kZXJTdGFnZXNcbiAgICAgICAgICovXG4gICAgICAgIHJlbmRlclN0YWdlczoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU3RhZ2VzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3RhZ2VzID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YWdlcygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuY2FtZXJhLnJlbmRlclN0YWdlcycsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gV2hldGhlciBhdXRvIGFsaWduIGNhbWVyYSB2aWV3cG9ydCB0byBzY3JlZW5cbiAgICAgICAgICogISN6aCDmmK/lkKboh6rliqjlsIbmkYTlg4/mnLrnmoTop4blj6Plr7nlh4blsY/luZVcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBhbGlnbldpdGhTY3JlZW5cbiAgICAgICAgICovXG4gICAgICAgIGFsaWduV2l0aFNjcmVlbjoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYWxpZ25XaXRoU2NyZWVuO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FsaWduV2l0aFNjcmVlbiA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2lzM0Q6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuX2lzM0ROb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIHByaW1hcnkgY2FtZXJhIGluIHRoZSBzY2VuZS4gUmV0dXJucyB0aGUgcmVhciBtb3N0IHJlbmRlcmVkIGNhbWVyYSwgd2hpY2ggaXMgdGhlIGNhbWVyYSB3aXRoIHRoZSBsb3dlc3QgZGVwdGguXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5b2T5YmN5Zy65pmv5Lit5r+A5rS755qE5Li75pGE5YOP5py644CC5bCG5Lya6L+U5Zue5riy5p+T5Zyo5bGP5bmV5pyA5bqV5bGC77yM5Lmf5bCx5pivIGRlcHRoIOacgOWwj+eahOaRhOWDj+acuuOAglxuICAgICAgICAgKiBAcHJvcGVydHkge0NhbWVyYX0gbWFpblxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBtYWluOiBudWxsLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIEFsbCBlbmFibGVkIGNhbWVyYXMuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5b2T5YmN5r+A5rS755qE5omA5pyJ5pGE5YOP5py644CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7W0NhbWVyYV19IGNhbWVyYXNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgY2FtZXJhczogX2NhbWVyYXMsXG5cbiAgICAgICAgQ2xlYXJGbGFnczogQ2xlYXJGbGFncyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBHZXQgdGhlIGZpcnN0IGNhbWVyYSB3aGljaCB0aGUgbm9kZSBiZWxvbmcgdG8uXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6I635Y+W6IqC54K55omA5Zyo55qE56ys5LiA5Liq5pGE5YOP5py644CCXG4gICAgICAgICAqIEBtZXRob2QgZmluZENhbWVyYVxuICAgICAgICAgKiBAcGFyYW0ge05vZGV9IG5vZGUgXG4gICAgICAgICAqIEByZXR1cm4ge0NhbWVyYX1cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgZmluZENhbWVyYSAobm9kZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBfY2FtZXJhcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FtZXJhID0gX2NhbWVyYXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGNhbWVyYS5jb250YWluc05vZGUobm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbWVyYTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9maW5kUmVuZGVyZXJDYW1lcmEgKG5vZGUpIHtcbiAgICAgICAgICAgIGxldCBjYW1lcmFzID0gcmVuZGVyZXIuc2NlbmUuX2NhbWVyYXM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbWVyYXMuX2NvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FtZXJhcy5fZGF0YVtpXS5fY3VsbGluZ01hc2sgJiBub2RlLl9jdWxsaW5nTWFzaykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FtZXJhcy5fZGF0YVtpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICBfc2V0dXBEZWJ1Z0NhbWVyYSAoKSB7XG4gICAgICAgICAgICBpZiAoX2RlYnVnQ2FtZXJhKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoZ2FtZS5yZW5kZXJUeXBlID09PSBnYW1lLlJFTkRFUl9UWVBFX0NBTlZBUykgcmV0dXJuO1xuICAgICAgICAgICAgbGV0IGNhbWVyYSA9IG5ldyBSZW5kZXJlckNhbWVyYSgpO1xuICAgICAgICAgICAgX2RlYnVnQ2FtZXJhID0gY2FtZXJhO1xuXG4gICAgICAgICAgICBjYW1lcmEuc2V0U3RhZ2VzKFtcbiAgICAgICAgICAgICAgICAnb3BhcXVlJyxcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYW1lcmEuc2V0Rm92KE1hdGguUEkgKiA2MCAvIDE4MCk7XG4gICAgICAgICAgICBjYW1lcmEuc2V0TmVhcigwLjEpO1xuICAgICAgICAgICAgY2FtZXJhLnNldEZhcig0MDk2KTtcblxuICAgICAgICAgICAgY2FtZXJhLmRpcnR5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgY2FtZXJhLmN1bGxpbmdNYXNrID0gMSA8PCBjYy5Ob2RlLkJ1aWx0aW5Hcm91cEluZGV4LkRFQlVHO1xuICAgICAgICAgICAgY2FtZXJhLnNldFByaW9yaXR5KGNjLm1hY3JvLk1BWF9aSU5ERVgpO1xuICAgICAgICAgICAgY2FtZXJhLnNldENsZWFyRmxhZ3MoMCk7XG4gICAgICAgICAgICBjYW1lcmEuc2V0Q29sb3IoMCwgMCwgMCwgMCk7XG5cbiAgICAgICAgICAgIGxldCBub2RlID0gbmV3IGNjLk5vZGUoKTtcbiAgICAgICAgICAgIGNhbWVyYS5zZXROb2RlKG5vZGUpO1xuXG4gICAgICAgICAgICByZXBvc2l0aW9uRGVidWdDYW1lcmEoKTtcbiAgICAgICAgICAgIGNjLnZpZXcub24oJ2Rlc2lnbi1yZXNvbHV0aW9uLWNoYW5nZWQnLCByZXBvc2l0aW9uRGVidWdDYW1lcmEpO1xuXG4gICAgICAgICAgICByZW5kZXJlci5zY2VuZS5hZGRDYW1lcmEoY2FtZXJhKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdXBkYXRlQ2FtZXJhTWFzayAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYW1lcmEpIHtcbiAgICAgICAgICAgIGxldCBtYXNrID0gdGhpcy5fY3VsbGluZ01hc2sgJiAofigxIDw8IGNjLk5vZGUuQnVpbHRpbkdyb3VwSW5kZXguREVCVUcpKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbWVyYS5jdWxsaW5nTWFzayA9IG1hc2s7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3VwZGF0ZUJhY2tncm91bmRDb2xvciAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2FtZXJhKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5fYmFja2dyb3VuZENvbG9yO1xuICAgICAgICB0aGlzLl9jYW1lcmEuc2V0Q29sb3IoXG4gICAgICAgICAgICBjb2xvci5yIC8gMjU1LFxuICAgICAgICAgICAgY29sb3IuZyAvIDI1NSxcbiAgICAgICAgICAgIGNvbG9yLmIgLyAyNTUsXG4gICAgICAgICAgICBjb2xvci5hIC8gMjU1LFxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlVGFyZ2V0VGV4dHVyZSAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2FtZXJhKSByZXR1cm47XG5cbiAgICAgICAgbGV0IHRleHR1cmUgPSB0aGlzLl90YXJnZXRUZXh0dXJlO1xuICAgICAgICB0aGlzLl9jYW1lcmEuc2V0RnJhbWVCdWZmZXIodGV4dHVyZSA/IHRleHR1cmUuX2ZyYW1lYnVmZmVyIDogbnVsbCk7XG4gICAgfSxcblxuICAgIF91cGRhdGVDbGlwcGluZ3BQbGFuZXMgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2NhbWVyYSkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9jYW1lcmEuc2V0TmVhcih0aGlzLl9uZWFyQ2xpcCk7XG4gICAgICAgIHRoaXMuX2NhbWVyYS5zZXRGYXIodGhpcy5fZmFyQ2xpcCk7XG4gICAgfSxcblxuICAgIF91cGRhdGVQcm9qZWN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYW1lcmEpIHJldHVybjtcbiAgICAgICAgbGV0IHR5cGUgPSB0aGlzLl9vcnRobyA/IDEgOiAwO1xuICAgICAgICB0aGlzLl9jYW1lcmEuc2V0VHlwZSh0eXBlKTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZVJlY3QgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2NhbWVyYSkgcmV0dXJuO1xuICAgICAgICBsZXQgcmVjdCA9IHRoaXMuX3JlY3Q7XG4gICAgICAgIHRoaXMuX2NhbWVyYS5zZXRSZWN0KHJlY3QueCwgcmVjdC55LCByZWN0LndpZHRoLCByZWN0LmhlaWdodCk7XG4gICAgfSxcblxuICAgIF91cGRhdGVTdGFnZXMgKCkge1xuICAgICAgICBsZXQgZmxhZ3MgPSB0aGlzLl9yZW5kZXJTdGFnZXM7XG4gICAgICAgIGxldCBzdGFnZXMgPSBbXTtcbiAgICAgICAgaWYgKGZsYWdzICYgU3RhZ2VGbGFncy5PUEFRVUUpIHtcbiAgICAgICAgICAgIHN0YWdlcy5wdXNoKCdvcGFxdWUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmxhZ3MgJiBTdGFnZUZsYWdzLlRSQU5TUEFSRU5UKSB7XG4gICAgICAgICAgICBzdGFnZXMucHVzaCgndHJhbnNwYXJlbnQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jYW1lcmEuc2V0U3RhZ2VzKHN0YWdlcyk7XG4gICAgfSxcblxuICAgIF9pbml0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luaXRlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xuXG4gICAgICAgIGxldCBjYW1lcmEgPSB0aGlzLl9jYW1lcmE7XG4gICAgICAgIGlmICghY2FtZXJhKSByZXR1cm47XG4gICAgICAgIGNhbWVyYS5zZXROb2RlKHRoaXMubm9kZSk7XG4gICAgICAgIGNhbWVyYS5zZXRDbGVhckZsYWdzKHRoaXMuX2NsZWFyRmxhZ3MpO1xuICAgICAgICBjYW1lcmEuc2V0UHJpb3JpdHkodGhpcy5fZGVwdGgpO1xuICAgICAgICB0aGlzLl91cGRhdGVCYWNrZ3JvdW5kQ29sb3IoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2FtZXJhTWFzaygpO1xuICAgICAgICB0aGlzLl91cGRhdGVUYXJnZXRUZXh0dXJlKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNsaXBwaW5ncFBsYW5lcygpO1xuICAgICAgICB0aGlzLl91cGRhdGVQcm9qZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVN0YWdlcygpO1xuICAgICAgICB0aGlzLl91cGRhdGVSZWN0KCk7XG4gICAgICAgIHRoaXMuYmVmb3JlRHJhdygpO1xuICAgIH0sXG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfSxcblxuICAgIG9uRW5hYmxlICgpIHtcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgZ2FtZS5yZW5kZXJUeXBlICE9PSBnYW1lLlJFTkRFUl9UWVBFX0NBTlZBUykge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3Iub24oY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX0RSQVcsIHRoaXMuYmVmb3JlRHJhdywgdGhpcyk7XG4gICAgICAgICAgICByZW5kZXJlci5zY2VuZS5hZGRDYW1lcmEodGhpcy5fY2FtZXJhKTtcbiAgICAgICAgfVxuICAgICAgICBfY2FtZXJhcy5wdXNoKHRoaXMpO1xuICAgICAgICBpZiAoIUNhbWVyYS5tYWluIHx8ICh0aGlzLl9kZXB0aCA8IENhbWVyYS5tYWluLl9kZXB0aCkpIHtcbiAgICAgICAgICAgIENhbWVyYS5tYWluID0gdGhpcztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkRpc2FibGUgKCkge1xuICAgICAgICBpZiAoIUNDX0VESVRPUiAmJiBnYW1lLnJlbmRlclR5cGUgIT09IGdhbWUuUkVOREVSX1RZUEVfQ0FOVkFTKSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5vZmYoY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX0RSQVcsIHRoaXMuYmVmb3JlRHJhdywgdGhpcyk7XG4gICAgICAgICAgICByZW5kZXJlci5zY2VuZS5yZW1vdmVDYW1lcmEodGhpcy5fY2FtZXJhKTtcbiAgICAgICAgfVxuICAgICAgICBjYy5qcy5hcnJheS5mYXN0UmVtb3ZlKF9jYW1lcmFzLCB0aGlzKTtcbiAgICAgICAgaWYgKENhbWVyYS5tYWluID09PSB0aGlzKSB7XG4gICAgICAgICAgICBDYW1lcmEubWFpbiA9IG51bGw7XG4gICAgICAgICAgICB1cGRhdGVNYWluQ2FtZXJhKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCB0aGUgc2NyZWVuIHRvIHdvcmxkIG1hdHJpeCwgb25seSBzdXBwb3J0IDJEIGNhbWVyYSB3aGljaCBhbGlnbldpdGhTY3JlZW4gaXMgdHJ1ZS5cbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W5bGP5bmV5Z2Q5qCH57O75Yiw5LiW55WM5Z2Q5qCH57O755qE55+p6Zi177yM5Y+q6YCC55So5LqOIGFsaWduV2l0aFNjcmVlbiDkuLogdHJ1ZSDnmoQgMkQg5pGE5YOP5py644CCXG4gICAgICogQG1ldGhvZCBnZXRTY3JlZW5Ub1dvcmxkTWF0cml4MkRcbiAgICAgKiBAcGFyYW0ge01hdDR9IG91dCAtIHRoZSBtYXRyaXggdG8gcmVjZWl2ZSB0aGUgcmVzdWx0XG4gICAgICogQHJldHVybiB7TWF0NH0gb3V0XG4gICAgICovXG4gICAgZ2V0U2NyZWVuVG9Xb3JsZE1hdHJpeDJEIChvdXQpIHtcbiAgICAgICAgdGhpcy5nZXRXb3JsZFRvU2NyZWVuTWF0cml4MkQob3V0KTtcbiAgICAgICAgTWF0NC5pbnZlcnQob3V0LCBvdXQpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHRoZSB3b3JsZCB0byBjYW1lcmEgbWF0cml4LCBvbmx5IHN1cHBvcnQgMkQgY2FtZXJhIHdoaWNoIGFsaWduV2l0aFNjcmVlbiBpcyB0cnVlLlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5bkuJbnlYzlnZDmoIfns7vliLDmkYTlg4/mnLrlnZDmoIfns7vnmoTnn6npmLXvvIzlj6rpgILnlKjkuo4gYWxpZ25XaXRoU2NyZWVuIOS4uiB0cnVlIOeahCAyRCDmkYTlg4/mnLrjgIJcbiAgICAgKiBAbWV0aG9kIGdldFdvcmxkVG9TY3JlZW5NYXRyaXgyRFxuICAgICAqIEBwYXJhbSB7TWF0NH0gb3V0IC0gdGhlIG1hdHJpeCB0byByZWNlaXZlIHRoZSByZXN1bHRcbiAgICAgKiBAcmV0dXJuIHtNYXQ0fSBvdXRcbiAgICAgKi9cbiAgICBnZXRXb3JsZFRvU2NyZWVuTWF0cml4MkQgKG91dCkge1xuICAgICAgICB0aGlzLm5vZGUuZ2V0V29ybGRSVChfbWF0NF90ZW1wXzEpO1xuXG4gICAgICAgIGxldCB6b29tUmF0aW8gPSB0aGlzLnpvb21SYXRpbztcbiAgICAgICAgbGV0IF9tYXQ0X3RlbXBfMW0gPSBfbWF0NF90ZW1wXzEubTtcbiAgICAgICAgX21hdDRfdGVtcF8xbVswXSAqPSB6b29tUmF0aW87XG4gICAgICAgIF9tYXQ0X3RlbXBfMW1bMV0gKj0gem9vbVJhdGlvO1xuICAgICAgICBfbWF0NF90ZW1wXzFtWzRdICo9IHpvb21SYXRpbztcbiAgICAgICAgX21hdDRfdGVtcF8xbVs1XSAqPSB6b29tUmF0aW87XG5cbiAgICAgICAgbGV0IG0xMiA9IF9tYXQ0X3RlbXBfMW1bMTJdO1xuICAgICAgICBsZXQgbTEzID0gX21hdDRfdGVtcF8xbVsxM107XG5cbiAgICAgICAgbGV0IGNlbnRlciA9IGNjLnZpc2libGVSZWN0LmNlbnRlcjtcbiAgICAgICAgX21hdDRfdGVtcF8xbVsxMl0gPSBjZW50ZXIueCAtIChfbWF0NF90ZW1wXzFtWzBdICogbTEyICsgX21hdDRfdGVtcF8xbVs0XSAqIG0xMyk7XG4gICAgICAgIF9tYXQ0X3RlbXBfMW1bMTNdID0gY2VudGVyLnkgLSAoX21hdDRfdGVtcF8xbVsxXSAqIG0xMiArIF9tYXQ0X3RlbXBfMW1bNV0gKiBtMTMpO1xuXG4gICAgICAgIGlmIChvdXQgIT09IF9tYXQ0X3RlbXBfMSkge1xuICAgICAgICAgICAgTWF0NC5jb3B5KG91dCwgX21hdDRfdGVtcF8xKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ29udmVydCBwb2ludCBmcm9tIHNjcmVlbiB0byB3b3JsZC5cbiAgICAgKiAhI3poXG4gICAgICog5bCG5Z2Q5qCH5LuO5bGP5bmV5Z2Q5qCH57O76L2s5o2i5Yiw5LiW55WM5Z2Q5qCH57O744CCXG4gICAgICogQG1ldGhvZCBnZXRTY3JlZW5Ub1dvcmxkUG9pbnRcbiAgICAgKiBAcGFyYW0ge1ZlYzN8VmVjMn0gc2NyZWVuUG9zaXRpb24gXG4gICAgICogQHBhcmFtIHtWZWMzfFZlYzJ9IFtvdXRdIFxuICAgICAqIEByZXR1cm4ge1ZlYzN8VmVjMn0gb3V0XG4gICAgICovXG4gICAgZ2V0U2NyZWVuVG9Xb3JsZFBvaW50IChzY3JlZW5Qb3NpdGlvbiwgb3V0KSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGUuaXMzRE5vZGUpIHtcbiAgICAgICAgICAgIG91dCA9IG91dCB8fCBuZXcgY2MuVmVjMygpO1xuICAgICAgICAgICAgdGhpcy5fY2FtZXJhLnNjcmVlblRvV29ybGQob3V0LCBzY3JlZW5Qb3NpdGlvbiwgY2MudmlzaWJsZVJlY3Qud2lkdGgsIGNjLnZpc2libGVSZWN0LmhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IGNjLlZlYzIoKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0U2NyZWVuVG9Xb3JsZE1hdHJpeDJEKF9tYXQ0X3RlbXBfMSk7XG4gICAgICAgICAgICBWZWMyLnRyYW5zZm9ybU1hdDQob3V0LCBzY3JlZW5Qb3NpdGlvbiwgX21hdDRfdGVtcF8xKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ29udmVydCBwb2ludCBmcm9tIHdvcmxkIHRvIHNjcmVlbi5cbiAgICAgKiAhI3poXG4gICAgICog5bCG5Z2Q5qCH5LuO5LiW55WM5Z2Q5qCH57O76L2s5YyW5Yiw5bGP5bmV5Z2Q5qCH57O744CCXG4gICAgICogQG1ldGhvZCBnZXRXb3JsZFRvU2NyZWVuUG9pbnRcbiAgICAgKiBAcGFyYW0ge1ZlYzN8VmVjMn0gd29ybGRQb3NpdGlvbiBcbiAgICAgKiBAcGFyYW0ge1ZlYzN8VmVjMn0gW291dF0gXG4gICAgICogQHJldHVybiB7VmVjM3xWZWMyfSBvdXRcbiAgICAgKi9cbiAgICBnZXRXb3JsZFRvU2NyZWVuUG9pbnQgKHdvcmxkUG9zaXRpb24sIG91dCkge1xuICAgICAgICBpZiAodGhpcy5ub2RlLmlzM0ROb2RlKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IGNjLlZlYzMoKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbWVyYS53b3JsZFRvU2NyZWVuKG91dCwgd29ybGRQb3NpdGlvbiwgY2MudmlzaWJsZVJlY3Qud2lkdGgsIGNjLnZpc2libGVSZWN0LmhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IGNjLlZlYzIoKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0V29ybGRUb1NjcmVlbk1hdHJpeDJEKF9tYXQ0X3RlbXBfMSk7XG4gICAgICAgICAgICBWZWMyLnRyYW5zZm9ybU1hdDQob3V0LCB3b3JsZFBvc2l0aW9uLCBfbWF0NF90ZW1wXzEpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IGEgcmF5IGZyb20gc2NyZWVuIHBvc2l0aW9uXG4gICAgICogISN6aFxuICAgICAqIOS7juWxj+W5leWdkOagh+iOt+WPluS4gOadoeWwhOe6v1xuICAgICAqIEBtZXRob2QgZ2V0UmF5XG4gICAgICogQHBhcmFtIHtWZWMyfSBzY3JlZW5Qb3NcbiAgICAgKiBAcmV0dXJuIHtSYXl9XG4gICAgICovXG4gICAgZ2V0UmF5IChzY3JlZW5Qb3MpIHtcbiAgICAgICAgaWYgKCFjYy5nZW9tVXRpbHMpIHJldHVybiBzY3JlZW5Qb3M7XG4gICAgICAgIFxuICAgICAgICBWZWMzLnNldChfdjNfdGVtcF8zLCBzY3JlZW5Qb3MueCwgc2NyZWVuUG9zLnksIDEpO1xuICAgICAgICB0aGlzLl9jYW1lcmEuc2NyZWVuVG9Xb3JsZChfdjNfdGVtcF8yLCBfdjNfdGVtcF8zLCBjYy52aXNpYmxlUmVjdC53aWR0aCwgY2MudmlzaWJsZVJlY3QuaGVpZ2h0KTtcblxuICAgICAgICBpZiAodGhpcy5vcnRobykge1xuICAgICAgICAgICAgVmVjMy5zZXQoX3YzX3RlbXBfMywgc2NyZWVuUG9zLngsIHNjcmVlblBvcy55LCAtMSk7XG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEuc2NyZWVuVG9Xb3JsZChfdjNfdGVtcF8xLCBfdjNfdGVtcF8zLCBjYy52aXNpYmxlUmVjdC53aWR0aCwgY2MudmlzaWJsZVJlY3QuaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRXb3JsZFBvc2l0aW9uKF92M190ZW1wXzEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFJheS5mcm9tUG9pbnRzKG5ldyBSYXkoKSwgX3YzX3RlbXBfMSwgX3YzX3RlbXBfMik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBDaGVjayB3aGV0aGVyIHRoZSBub2RlIGlzIGluIHRoZSBjYW1lcmEuXG4gICAgICogISN6aFxuICAgICAqIOajgOa1i+iKgueCueaYr+WQpuiiq+atpOaRhOWDj+acuuW9seWTjVxuICAgICAqIEBtZXRob2QgY29udGFpbnNOb2RlXG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlIC0gdGhlIG5vZGUgd2hpY2ggbmVlZCB0byBjaGVja1xuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgY29udGFpbnNOb2RlIChub2RlKSB7XG4gICAgICAgIHJldHVybiAobm9kZS5fY3VsbGluZ01hc2sgJiB0aGlzLmN1bGxpbmdNYXNrKSA+IDA7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZW5kZXIgdGhlIGNhbWVyYSBtYW51YWxseS5cbiAgICAgKiAhI3poXG4gICAgICog5omL5Yqo5riy5p+T5pGE5YOP5py644CCXG4gICAgICogQG1ldGhvZCByZW5kZXJcbiAgICAgKiBAcGFyYW0ge05vZGV9IFtyb290Tm9kZV0gXG4gICAgICovXG4gICAgcmVuZGVyIChyb290Tm9kZSkge1xuICAgICAgICByb290Tm9kZSA9IHJvb3ROb2RlIHx8IGNjLmRpcmVjdG9yLmdldFNjZW5lKCk7XG4gICAgICAgIGlmICghcm9vdE5vZGUpIHJldHVybiBudWxsO1xuXG4gICAgICAgIC8vIGZvcmNlIHVwZGF0ZSBub2RlIHdvcmxkIG1hdHJpeFxuICAgICAgICB0aGlzLm5vZGUuZ2V0V29ybGRNYXRyaXgoX21hdDRfdGVtcF8xKTtcbiAgICAgICAgdGhpcy5iZWZvcmVEcmF3KCk7XG5cbiAgICAgICAgUmVuZGVyRmxvdy5yZW5kZXJDYW1lcmEodGhpcy5fY2FtZXJhLCByb290Tm9kZSk7XG4gICAgfSxcblxuICAgIF9vbkFsaWduV2l0aFNjcmVlbiAoKSB7XG4gICAgICAgIGxldCBoZWlnaHQgPSBjYy5nYW1lLmNhbnZhcy5oZWlnaHQgLyBjYy52aWV3Ll9zY2FsZVk7XG5cbiAgICAgICAgbGV0IHRhcmdldFRleHR1cmUgPSB0aGlzLl90YXJnZXRUZXh0dXJlO1xuICAgICAgICBpZiAodGFyZ2V0VGV4dHVyZSkge1xuICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IGNjLmVuZ2luZS5nZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSgpLmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IGNjLnZpc2libGVSZWN0LmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmb3YgPSB0aGlzLl9mb3YgKiBjYy5tYWNyby5SQUQ7XG4gICAgICAgIHRoaXMubm9kZS56ID0gaGVpZ2h0IC8gKE1hdGgudGFuKGZvdiAvIDIpICogMik7XG5cbiAgICAgICAgZm92ID0gTWF0aC5hdGFuKE1hdGgudGFuKGZvdiAvIDIpIC8gdGhpcy56b29tUmF0aW8pICogMjtcbiAgICAgICAgdGhpcy5fY2FtZXJhLnNldEZvdihmb3YpO1xuICAgICAgICB0aGlzLl9jYW1lcmEuc2V0T3J0aG9IZWlnaHQoaGVpZ2h0IC8gMiAvIHRoaXMuem9vbVJhdGlvKTtcbiAgICAgICAgdGhpcy5ub2RlLnNldFJvdGF0aW9uKDAsIDAsIDAsIDEpO1xuICAgIH0sXG5cbiAgICBiZWZvcmVEcmF3ICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jYW1lcmEpIHJldHVybjtcblxuICAgICAgICBpZiAodGhpcy5fYWxpZ25XaXRoU2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9vbkFsaWduV2l0aFNjcmVlbigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IGZvdiA9IHRoaXMuX2ZvdiAqIGNjLm1hY3JvLlJBRDtcbiAgICAgICAgICAgIGZvdiA9IE1hdGguYXRhbihNYXRoLnRhbihmb3YgLyAyKSAvIHRoaXMuem9vbVJhdGlvKSAqIDI7XG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEuc2V0Rm92KGZvdik7XG5cbiAgICAgICAgICAgIHRoaXMuX2NhbWVyYS5zZXRPcnRob0hlaWdodCh0aGlzLl9vcnRob1NpemUgLyB0aGlzLnpvb21SYXRpbyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jYW1lcmEuZGlydHkgPSB0cnVlO1xuICAgIH1cbn0pO1xuXG4vLyBkZXByZWNhdGVkXG5jYy5qcy5taXhpbihDYW1lcmEucHJvdG90eXBlLCB7XG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIG1hdHJpeCB0aGF0IHRyYW5zZm9ybSB0aGUgbm9kZSdzIChsb2NhbCkgc3BhY2UgY29vcmRpbmF0ZXMgaW50byB0aGUgY2FtZXJhJ3Mgc3BhY2UgY29vcmRpbmF0ZXMuXG4gICAgICogISN6aFxuICAgICAqIOi/lOWbnuS4gOS4quWwhuiKgueCueWdkOagh+ezu+i9rOaNouWIsOaRhOWDj+acuuWdkOagh+ezu+S4i+eahOefqemYtVxuICAgICAqIEBtZXRob2QgZ2V0Tm9kZVRvQ2FtZXJhVHJhbnNmb3JtXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMC4wXG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlIC0gdGhlIG5vZGUgd2hpY2ggc2hvdWxkIHRyYW5zZm9ybVxuICAgICAqIEByZXR1cm4ge0FmZmluZVRyYW5zZm9ybX1cbiAgICAgKi9cbiAgICBnZXROb2RlVG9DYW1lcmFUcmFuc2Zvcm0gKG5vZGUpIHtcbiAgICAgICAgbGV0IG91dCA9IEFmZmluZVRyYW5zLmlkZW50aXR5KCk7XG4gICAgICAgIG5vZGUuZ2V0V29ybGRNYXRyaXgoX21hdDRfdGVtcF8yKTtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbnNOb2RlKG5vZGUpKSB7XG4gICAgICAgICAgICB0aGlzLmdldFdvcmxkVG9DYW1lcmFNYXRyaXgoX21hdDRfdGVtcF8xKTtcbiAgICAgICAgICAgIE1hdDQubXVsKF9tYXQ0X3RlbXBfMiwgX21hdDRfdGVtcF8yLCBfbWF0NF90ZW1wXzEpO1xuICAgICAgICB9XG4gICAgICAgIEFmZmluZVRyYW5zLmZyb21NYXQ0KG91dCwgX21hdDRfdGVtcF8yKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIENvbnZlciBhIGNhbWVyYSBjb29yZGluYXRlcyBwb2ludCB0byB3b3JsZCBjb29yZGluYXRlcy5cbiAgICAgKiAhI3poXG4gICAgICog5bCG5LiA5Liq5pGE5YOP5py65Z2Q5qCH57O75LiL55qE54K56L2s5o2i5Yiw5LiW55WM5Z2Q5qCH57O75LiL44CCXG4gICAgICogQG1ldGhvZCBnZXRDYW1lcmFUb1dvcmxkUG9pbnRcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4xLjNcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHBvaW50IC0gdGhlIHBvaW50IHdoaWNoIHNob3VsZCB0cmFuc2Zvcm1cbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IFtvdXRdIC0gdGhlIHBvaW50IHRvIHJlY2VpdmUgdGhlIHJlc3VsdFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IG91dFxuICAgICAqL1xuICAgIGdldENhbWVyYVRvV29ybGRQb2ludCAocG9pbnQsIG91dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTY3JlZW5Ub1dvcmxkUG9pbnQocG9pbnQsIG91dCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBDb252ZXIgYSB3b3JsZCBjb29yZGluYXRlcyBwb2ludCB0byBjYW1lcmEgY29vcmRpbmF0ZXMuXG4gICAgICogISN6aFxuICAgICAqIOWwhuS4gOS4quS4lueVjOWdkOagh+ezu+S4i+eahOeCuei9rOaNouWIsOaRhOWDj+acuuWdkOagh+ezu+S4i+OAglxuICAgICAqIEBtZXRob2QgZ2V0V29ybGRUb0NhbWVyYVBvaW50XG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMS4zXG4gICAgICogQHBhcmFtIHtWZWMyfSBwb2ludCBcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IFtvdXRdIC0gdGhlIHBvaW50IHRvIHJlY2VpdmUgdGhlIHJlc3VsdFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IG91dFxuICAgICAqL1xuICAgIGdldFdvcmxkVG9DYW1lcmFQb2ludCAocG9pbnQsIG91dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRXb3JsZFRvU2NyZWVuUG9pbnQocG9pbnQsIG91dCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgdGhlIGNhbWVyYSB0byB3b3JsZCBtYXRyaXhcbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W5pGE5YOP5py65Z2Q5qCH57O75Yiw5LiW55WM5Z2Q5qCH57O755qE55+p6Zi1XG4gICAgICogQG1ldGhvZCBnZXRDYW1lcmFUb1dvcmxkTWF0cml4XG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMS4zXG4gICAgICogQHBhcmFtIHtNYXQ0fSBvdXQgLSB0aGUgbWF0cml4IHRvIHJlY2VpdmUgdGhlIHJlc3VsdFxuICAgICAqIEByZXR1cm4ge01hdDR9IG91dFxuICAgICAqL1xuICAgIGdldENhbWVyYVRvV29ybGRNYXRyaXggKG91dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTY3JlZW5Ub1dvcmxkTWF0cml4MkQob3V0KTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHRoZSB3b3JsZCB0byBjYW1lcmEgbWF0cml4XG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluS4lueVjOWdkOagh+ezu+WIsOaRhOWDj+acuuWdkOagh+ezu+eahOefqemYtVxuICAgICAqIEBtZXRob2QgZ2V0V29ybGRUb0NhbWVyYU1hdHJpeFxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjEuM1xuICAgICAqIEBwYXJhbSB7TWF0NH0gb3V0IC0gdGhlIG1hdHJpeCB0byByZWNlaXZlIHRoZSByZXN1bHRcbiAgICAgKiBAcmV0dXJuIHtNYXQ0fSBvdXRcbiAgICAgKi9cbiAgICBnZXRXb3JsZFRvQ2FtZXJhTWF0cml4IChvdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0V29ybGRUb1NjcmVlbk1hdHJpeDJEKG91dCk7XG4gICAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNjLkNhbWVyYSA9IENhbWVyYTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9