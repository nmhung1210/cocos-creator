
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/scene/camera.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _valueTypes = require("../../core/value-types");

var _geomUtils = require("../../core/geom-utils");

var _enums = _interopRequireDefault(require("../enums"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _tmp_mat4 = new _valueTypes.Mat4();

var _matView = new _valueTypes.Mat4();

var _matViewInv = new _valueTypes.Mat4();

var _matProj = new _valueTypes.Mat4();

var _matViewProj = new _valueTypes.Mat4();

var _matInvViewProj = new _valueTypes.Mat4();

var _tmp_v3 = new _valueTypes.Vec3();

var _tmp2_v3 = new _valueTypes.Vec3();
/**
 * A representation of a camera instance
 */


var Camera = /*#__PURE__*/function () {
  function Camera() {
    this._poolID = -1;
    this._node = null;
    this._projection = _enums["default"].PROJ_PERSPECTIVE;
    this._priority = 0;
    this._color = new _valueTypes.Vec4(0.2, 0.3, 0.47, 1);
    this._depth = 1;
    this._stencil = 0;
    this._clearFlags = _enums["default"].CLEAR_COLOR | _enums["default"].CLEAR_DEPTH;
    this._clearModel = null;
    this._stages = [];
    this._framebuffer = null;
    this._near = 0.01;
    this._far = 1000.0;
    this._fov = Math.PI / 4.0;
    this._rect = {
      x: 0,
      y: 0,
      w: 1,
      h: 1
    };
    this._orthoHeight = 10;
    this._cullingMask = 0xffffffff;
  }

  var _proto = Camera.prototype;

  _proto.setCullingMask = function setCullingMask(mask) {
    this._cullingMask = mask;
  }
  /**
   * Get the hosting node of this camera
   * @returns {Node} the hosting node
   */
  ;

  _proto.getNode = function getNode() {
    return this._node;
  }
  /**
   * Set the hosting node of this camera
   * @param {Node} node the hosting node
   */
  ;

  _proto.setNode = function setNode(node) {
    this._node = node;
  }
  /**
   * Get the projection type of the camera
   * @returns {number} camera projection type
   */
  ;

  _proto.getType = function getType() {
    return this._projection;
  }
  /**
   * Set the projection type of the camera
   * @param {number} type camera projection type
   */
  ;

  _proto.setType = function setType(type) {
    this._projection = type;
  }
  /**
   * Get the priority of the camera
   * @returns {number} camera priority
   */
  ;

  _proto.getPriority = function getPriority() {
    return this._priority;
  }
  /**
   * Set the priority of the camera
   * @param {number} priority camera priority
   */
  ;

  _proto.setPriority = function setPriority(priority) {
    this._priority = priority;
  }
  /**
   * Get the orthogonal height of the camera
   * @returns {number} camera height
   */
  ;

  _proto.getOrthoHeight = function getOrthoHeight() {
    return this._orthoHeight;
  }
  /**
   * Set the orthogonal height of the camera
   * @param {number} val camera height
   */
  ;

  _proto.setOrthoHeight = function setOrthoHeight(val) {
    this._orthoHeight = val;
  }
  /**
   * Get the field of view of the camera
   * @returns {number} camera field of view
   */
  ;

  _proto.getFov = function getFov() {
    return this._fov;
  }
  /**
   * Set the field of view of the camera
   * @param {number} fov camera field of view
   */
  ;

  _proto.setFov = function setFov(fov) {
    this._fov = fov;
  }
  /**
   * Get the near clipping distance of the camera
   * @returns {number} camera near clipping distance
   */
  ;

  _proto.getNear = function getNear() {
    return this._near;
  }
  /**
   * Set the near clipping distance of the camera
   * @param {number} near camera near clipping distance
   */
  ;

  _proto.setNear = function setNear(near) {
    this._near = near;
  }
  /**
   * Get the far clipping distance of the camera
   * @returns {number} camera far clipping distance
   */
  ;

  _proto.getFar = function getFar() {
    return this._far;
  }
  /**
   * Set the far clipping distance of the camera
   * @param {number} far camera far clipping distance
   */
  ;

  _proto.setFar = function setFar(far) {
    this._far = far;
  }
  /**
   * Get the clear color of the camera
   * @returns {Vec4} out the receiving color vector
   */
  ;

  _proto.getColor = function getColor(out) {
    return _valueTypes.Vec4.copy(out, this._color);
  }
  /**
   * Set the clear color of the camera
   * @param {number} r red channel of camera clear color
   * @param {number} g green channel of camera clear color
   * @param {number} b blue channel of camera clear color
   * @param {number} a alpha channel of camera clear color
   */
  ;

  _proto.setColor = function setColor(r, g, b, a) {
    _valueTypes.Vec4.set(this._color, r, g, b, a);
  }
  /**
   * Get the clear depth of the camera
   * @returns {number} camera clear depth
   */
  ;

  _proto.getDepth = function getDepth() {
    return this._depth;
  }
  /**
   * Set the clear depth of the camera
   * @param {number} depth camera clear depth
   */
  ;

  _proto.setDepth = function setDepth(depth) {
    this._depth = depth;
  }
  /**
   * Get the clearing stencil value of the camera
   * @returns {number} camera clearing stencil value
   */
  ;

  _proto.getStencil = function getStencil() {
    return this._stencil;
  }
  /**
   * Set the clearing stencil value of the camera
   * @param {number} stencil camera clearing stencil value
   */
  ;

  _proto.setStencil = function setStencil(stencil) {
    this._stencil = stencil;
  }
  /**
   * Get the clearing flags of the camera
   * @returns {number} camera clearing flags
   */
  ;

  _proto.getClearFlags = function getClearFlags() {
    return this._clearFlags;
  }
  /**
   * Set the clearing flags of the camera
   * @param {number} flags camera clearing flags
   */
  ;

  _proto.setClearFlags = function setClearFlags(flags) {
    this._clearFlags = flags;
  }
  /**
   * Get the rect of the camera
   * @param {Object} out the receiving object
   * @returns {Object} camera rect
   */
  ;

  _proto.getRect = function getRect(out) {
    out.x = this._rect.x;
    out.y = this._rect.y;
    out.w = this._rect.w;
    out.h = this._rect.h;
    return out;
  }
  /**
   * Set the rect of the camera
   * @param {Number} x - [0,1]
   * @param {Number} y - [0,1]
   * @param {Number} w - [0,1]
   * @param {Number} h - [0,1]
   */
  ;

  _proto.setRect = function setRect(x, y, w, h) {
    this._rect.x = x;
    this._rect.y = y;
    this._rect.w = w;
    this._rect.h = h;
  }
  /**
   * Get the stages of the camera
   * @returns {string[]} camera stages
   */
  ;

  _proto.getStages = function getStages() {
    return this._stages;
  }
  /**
   * Set the stages of the camera
   * @param {string[]} stages camera stages
   */
  ;

  _proto.setStages = function setStages(stages) {
    this._stages = stages;
  }
  /**
   * Get the framebuffer of the camera
   * @returns {FrameBuffer} camera framebuffer
   */
  ;

  _proto.getFramebuffer = function getFramebuffer() {
    return this._framebuffer;
  }
  /**
   * Set the framebuffer of the camera
   * @param {FrameBuffer} framebuffer camera framebuffer
   */
  ;

  _proto.setFrameBuffer = function setFrameBuffer(framebuffer) {
    this._framebuffer = framebuffer;
  };

  _proto._calcMatrices = function _calcMatrices(width, height) {
    // view matrix
    this._node.getWorldRT(_matViewInv);

    _valueTypes.Mat4.invert(_matView, _matViewInv); // projection matrix


    var aspect = width / height;

    if (this._projection === _enums["default"].PROJ_PERSPECTIVE) {
      _valueTypes.Mat4.perspective(_matProj, this._fov, aspect, this._near, this._far);
    } else {
      var x = this._orthoHeight * aspect;
      var y = this._orthoHeight;

      _valueTypes.Mat4.ortho(_matProj, -x, x, -y, y, this._near, this._far);
    } // view-projection


    _valueTypes.Mat4.mul(_matViewProj, _matProj, _matView); // inv view-projection


    _valueTypes.Mat4.invert(_matInvViewProj, _matViewProj);
  }
  /**
   * extract a view of this camera
   * @param {View} out the receiving view
   * @param {number} width framebuffer width
   * @param {number} height framebuffer height
   */
  ;

  _proto.extractView = function extractView(out, width, height) {
    if (this._framebuffer) {
      width = this._framebuffer._width;
      height = this._framebuffer._height;
    } // priority


    out._priority = this._priority; // rect

    out._rect.x = this._rect.x * width;
    out._rect.y = this._rect.y * height;
    out._rect.w = this._rect.w * width;
    out._rect.h = this._rect.h * height; // clear opts

    this.getColor(out._color);
    out._depth = this._depth;
    out._stencil = this._stencil;
    out._clearFlags = this._clearFlags;
    out._clearModel = this._clearModel; // stages & framebuffer

    out._stages = this._stages;
    out._framebuffer = this._framebuffer;

    this._calcMatrices(width, height);

    _valueTypes.Mat4.copy(out._matView, _matView);

    _valueTypes.Mat4.copy(out._matViewInv, _matViewInv);

    _valueTypes.Mat4.copy(out._matProj, _matProj);

    _valueTypes.Mat4.copy(out._matViewProj, _matViewProj);

    _valueTypes.Mat4.copy(out._matInvViewProj, _matInvViewProj);

    out._cullingMask = this._cullingMask;
  }
  /**
   * transform a screen position to a world space ray
   * @param {number} x the screen x position to be transformed
   * @param {number} y the screen y position to be transformed
   * @param {number} width framebuffer width
   * @param {number} height framebuffer height
   * @param {Ray} out the resulting ray
   * @returns {Ray} the resulting ray
   */
  ;

  _proto.screenPointToRay = function screenPointToRay(x, y, width, height, out) {
    if (!cc.geomUtils) return out;
    out = out || new _geomUtils.Ray();

    this._calcMatrices(width, height);

    var cx = this._rect.x * width;
    var cy = this._rect.y * height;
    var cw = this._rect.w * width;
    var ch = this._rect.h * height; // far plane intersection

    _valueTypes.Vec3.set(_tmp2_v3, (x - cx) / cw * 2 - 1, (y - cy) / ch * 2 - 1, 1);

    _valueTypes.Vec3.transformMat4(_tmp2_v3, _tmp2_v3, _matInvViewProj);

    if (this._projection === _enums["default"].PROJ_PERSPECTIVE) {
      // camera origin
      this._node.getWorldPosition(_tmp_v3);
    } else {
      // near plane intersection
      _valueTypes.Vec3.set(_tmp_v3, (x - cx) / cw * 2 - 1, (y - cy) / ch * 2 - 1, -1);

      _valueTypes.Vec3.transformMat4(_tmp_v3, _tmp_v3, _matInvViewProj);
    }

    return _geomUtils.Ray.fromPoints(out, _tmp_v3, _tmp2_v3);
  }
  /**
   * transform a screen position to world space
   * @param {Vec3} out the resulting vector
   * @param {Vec3} screenPos the screen position to be transformed
   * @param {number} width framebuffer width
   * @param {number} height framebuffer height
   * @returns {Vec3} the resulting vector
   */
  ;

  _proto.screenToWorld = function screenToWorld(out, screenPos, width, height) {
    this._calcMatrices(width, height);

    var cx = this._rect.x * width;
    var cy = this._rect.y * height;
    var cw = this._rect.w * width;
    var ch = this._rect.h * height;

    if (this._projection === _enums["default"].PROJ_PERSPECTIVE) {
      // calculate screen pos in far clip plane
      _valueTypes.Vec3.set(out, (screenPos.x - cx) / cw * 2 - 1, (screenPos.y - cy) / ch * 2 - 1, 0.9999); // transform to world


      _valueTypes.Vec3.transformMat4(out, out, _matInvViewProj); // lerp to depth z


      this._node.getWorldPosition(_tmp_v3);

      _valueTypes.Vec3.lerp(out, _tmp_v3, out, (0, _valueTypes.lerp)(this._near / this._far, 1, screenPos.z));
    } else {
      _valueTypes.Vec3.set(out, (screenPos.x - cx) / cw * 2 - 1, (screenPos.y - cy) / ch * 2 - 1, screenPos.z * 2 - 1); // transform to world


      _valueTypes.Vec3.transformMat4(out, out, _matInvViewProj);
    }

    return out;
  }
  /**
   * transform a world space position to screen space
   * @param {Vec3} out the resulting vector
   * @param {Vec3} worldPos the world space position to be transformed
   * @param {number} width framebuffer width
   * @param {number} height framebuffer height
   * @returns {Vec3} the resulting vector
   */
  ;

  _proto.worldToScreen = function worldToScreen(out, worldPos, width, height) {
    this._calcMatrices(width, height);

    var cx = this._rect.x * width;
    var cy = this._rect.y * height;
    var cw = this._rect.w * width;
    var ch = this._rect.h * height;

    _valueTypes.Vec3.transformMat4(out, worldPos, _matViewProj);

    out.x = cx + (out.x + 1) * 0.5 * cw;
    out.y = cy + (out.y + 1) * 0.5 * ch;
    out.z = out.z * 0.5 + 0.5;
    return out;
  }
  /**
   * transform a world space matrix to screen space
   * @param {Mat4} out the resulting vector
   * @param {Mat4} worldMatrix the world space matrix to be transformed
   * @param {number} width framebuffer width
   * @param {number} height framebuffer height
   * @returns {Mat4} the resulting vector
   */
  ;

  _proto.worldMatrixToScreen = function worldMatrixToScreen(out, worldMatrix, width, height) {
    this._calcMatrices(width, height);

    _valueTypes.Mat4.mul(out, _matViewProj, worldMatrix);

    var halfWidth = width / 2;
    var halfHeight = height / 2;

    _valueTypes.Mat4.identity(_tmp_mat4);

    _valueTypes.Mat4.transform(_tmp_mat4, _tmp_mat4, _valueTypes.Vec3.set(_tmp_v3, halfWidth, halfHeight, 0));

    _valueTypes.Mat4.scale(_tmp_mat4, _tmp_mat4, _valueTypes.Vec3.set(_tmp_v3, halfWidth, halfHeight, 1));

    _valueTypes.Mat4.mul(out, _tmp_mat4, out);

    return out;
  };

  _createClass(Camera, [{
    key: "cullingMask",
    // culling mask
    get: function get() {
      return this._cullingMask;
    },
    set: function set(mask) {
      this._cullingMask = mask;
    }
  }]);

  return Camera;
}();

exports["default"] = Camera;
module.exports = exports["default"];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9zY2VuZS9jYW1lcmEuanMiXSwibmFtZXMiOlsiX3RtcF9tYXQ0IiwiTWF0NCIsIl9tYXRWaWV3IiwiX21hdFZpZXdJbnYiLCJfbWF0UHJvaiIsIl9tYXRWaWV3UHJvaiIsIl9tYXRJbnZWaWV3UHJvaiIsIl90bXBfdjMiLCJWZWMzIiwiX3RtcDJfdjMiLCJDYW1lcmEiLCJfcG9vbElEIiwiX25vZGUiLCJfcHJvamVjdGlvbiIsImVudW1zIiwiUFJPSl9QRVJTUEVDVElWRSIsIl9wcmlvcml0eSIsIl9jb2xvciIsIlZlYzQiLCJfZGVwdGgiLCJfc3RlbmNpbCIsIl9jbGVhckZsYWdzIiwiQ0xFQVJfQ09MT1IiLCJDTEVBUl9ERVBUSCIsIl9jbGVhck1vZGVsIiwiX3N0YWdlcyIsIl9mcmFtZWJ1ZmZlciIsIl9uZWFyIiwiX2ZhciIsIl9mb3YiLCJNYXRoIiwiUEkiLCJfcmVjdCIsIngiLCJ5IiwidyIsImgiLCJfb3J0aG9IZWlnaHQiLCJfY3VsbGluZ01hc2siLCJzZXRDdWxsaW5nTWFzayIsIm1hc2siLCJnZXROb2RlIiwic2V0Tm9kZSIsIm5vZGUiLCJnZXRUeXBlIiwic2V0VHlwZSIsInR5cGUiLCJnZXRQcmlvcml0eSIsInNldFByaW9yaXR5IiwicHJpb3JpdHkiLCJnZXRPcnRob0hlaWdodCIsInNldE9ydGhvSGVpZ2h0IiwidmFsIiwiZ2V0Rm92Iiwic2V0Rm92IiwiZm92IiwiZ2V0TmVhciIsInNldE5lYXIiLCJuZWFyIiwiZ2V0RmFyIiwic2V0RmFyIiwiZmFyIiwiZ2V0Q29sb3IiLCJvdXQiLCJjb3B5Iiwic2V0Q29sb3IiLCJyIiwiZyIsImIiLCJhIiwic2V0IiwiZ2V0RGVwdGgiLCJzZXREZXB0aCIsImRlcHRoIiwiZ2V0U3RlbmNpbCIsInNldFN0ZW5jaWwiLCJzdGVuY2lsIiwiZ2V0Q2xlYXJGbGFncyIsInNldENsZWFyRmxhZ3MiLCJmbGFncyIsImdldFJlY3QiLCJzZXRSZWN0IiwiZ2V0U3RhZ2VzIiwic2V0U3RhZ2VzIiwic3RhZ2VzIiwiZ2V0RnJhbWVidWZmZXIiLCJzZXRGcmFtZUJ1ZmZlciIsImZyYW1lYnVmZmVyIiwiX2NhbGNNYXRyaWNlcyIsIndpZHRoIiwiaGVpZ2h0IiwiZ2V0V29ybGRSVCIsImludmVydCIsImFzcGVjdCIsInBlcnNwZWN0aXZlIiwib3J0aG8iLCJtdWwiLCJleHRyYWN0VmlldyIsIl93aWR0aCIsIl9oZWlnaHQiLCJzY3JlZW5Qb2ludFRvUmF5IiwiY2MiLCJnZW9tVXRpbHMiLCJSYXkiLCJjeCIsImN5IiwiY3ciLCJjaCIsInRyYW5zZm9ybU1hdDQiLCJnZXRXb3JsZFBvc2l0aW9uIiwiZnJvbVBvaW50cyIsInNjcmVlblRvV29ybGQiLCJzY3JlZW5Qb3MiLCJsZXJwIiwieiIsIndvcmxkVG9TY3JlZW4iLCJ3b3JsZFBvcyIsIndvcmxkTWF0cml4VG9TY3JlZW4iLCJ3b3JsZE1hdHJpeCIsImhhbGZXaWR0aCIsImhhbGZIZWlnaHQiLCJpZGVudGl0eSIsInRyYW5zZm9ybSIsInNjYWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBUyxHQUFHLElBQUlDLGdCQUFKLEVBQWhCOztBQUVBLElBQUlDLFFBQVEsR0FBRyxJQUFJRCxnQkFBSixFQUFmOztBQUNBLElBQUlFLFdBQVcsR0FBRyxJQUFJRixnQkFBSixFQUFsQjs7QUFDQSxJQUFJRyxRQUFRLEdBQUcsSUFBSUgsZ0JBQUosRUFBZjs7QUFDQSxJQUFJSSxZQUFZLEdBQUcsSUFBSUosZ0JBQUosRUFBbkI7O0FBQ0EsSUFBSUssZUFBZSxHQUFHLElBQUlMLGdCQUFKLEVBQXRCOztBQUNBLElBQUlNLE9BQU8sR0FBRyxJQUFJQyxnQkFBSixFQUFkOztBQUNBLElBQUlDLFFBQVEsR0FBRyxJQUFJRCxnQkFBSixFQUFmO0FBRUE7Ozs7O0lBR3FCRTs7U0FDbkJDLFVBQVUsQ0FBQztTQUNYQyxRQUFRO1NBQ1JDLGNBQWNDLGtCQUFN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QyxNQUExQjs7QUFFQXpGLHFCQUFLK0YsR0FBTCxDQUFTakMsR0FBVCxFQUFjMUQsWUFBZCxFQUE0QmlILFdBQTVCOztBQUVBLFFBQUlDLFNBQVMsR0FBRzlCLEtBQUssR0FBRyxDQUF4QjtBQUNBLFFBQUkrQixVQUFVLEdBQUc5QixNQUFNLEdBQUcsQ0FBMUI7O0FBQ0F6RixxQkFBS3dILFFBQUwsQ0FBY3pILFNBQWQ7O0FBQ0FDLHFCQUFLeUgsU0FBTCxDQUFlMUgsU0FBZixFQUEwQkEsU0FBMUIsRUFBcUNRLGlCQUFLOEQsR0FBTCxDQUFTL0QsT0FBVCxFQUFrQmdILFNBQWxCLEVBQTZCQyxVQUE3QixFQUF5QyxDQUF6QyxDQUFyQzs7QUFDQXZILHFCQUFLMEgsS0FBTCxDQUFXM0gsU0FBWCxFQUFzQkEsU0FBdEIsRUFBaUNRLGlCQUFLOEQsR0FBTCxDQUFTL0QsT0FBVCxFQUFrQmdILFNBQWxCLEVBQTZCQyxVQUE3QixFQUF5QyxDQUF6QyxDQUFqQzs7QUFFQXZILHFCQUFLK0YsR0FBTCxDQUFTakMsR0FBVCxFQUFjL0QsU0FBZCxFQUF5QitELEdBQXpCOztBQUVBLFdBQU9BLEdBQVA7QUFDRDs7OztBQWpjRDt3QkFDbUI7QUFDakIsYUFBTyxLQUFLekIsWUFBWjtBQUNEO3NCQUVnQkUsTUFBTTtBQUNyQixXQUFLRixZQUFMLEdBQW9CRSxJQUFwQjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbmltcG9ydCB7IFZlYzMsIE1hdDQsIGxlcnAsIFZlYzQgfSBmcm9tICcuLi8uLi9jb3JlL3ZhbHVlLXR5cGVzJztcbmltcG9ydCB7IFJheSB9IGZyb20gJy4uLy4uL2NvcmUvZ2VvbS11dGlscyc7XG5pbXBvcnQgZW51bXMgZnJvbSAnLi4vZW51bXMnO1xuXG5sZXQgX3RtcF9tYXQ0ID0gbmV3IE1hdDQoKTtcblxubGV0IF9tYXRWaWV3ID0gbmV3IE1hdDQoKTtcbmxldCBfbWF0Vmlld0ludiA9IG5ldyBNYXQ0KCk7XG5sZXQgX21hdFByb2ogPSBuZXcgTWF0NCgpO1xubGV0IF9tYXRWaWV3UHJvaiA9IG5ldyBNYXQ0KCk7XG5sZXQgX21hdEludlZpZXdQcm9qID0gbmV3IE1hdDQoKTtcbmxldCBfdG1wX3YzID0gbmV3IFZlYzMoKTtcbmxldCBfdG1wMl92MyA9IG5ldyBWZWMzKCk7XG5cbi8qKlxuICogQSByZXByZXNlbnRhdGlvbiBvZiBhIGNhbWVyYSBpbnN0YW5jZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW1lcmEge1xuICBfcG9vbElEID0gLTE7XG4gIF9ub2RlID0gbnVsbDtcbiAgX3Byb2plY3Rpb24gPSBlbnVtcy5QUk9KX1BFUlNQRUNUSVZFO1xuXG4gIC8vIHByaW9yaXR5LiB0aGUgc21hbGxlciBvbmUgd2lsbCBiZSByZW5kZXJlZCBmaXJzdFxuICBfcHJpb3JpdHkgPSAwO1xuXG4gIC8vIGNsZWFyIG9wdGlvbnNcbiAgX2NvbG9yID0gbmV3IFZlYzQoMC4yLCAwLjMsIDAuNDcsIDEpO1xuICBfZGVwdGggPSAxO1xuICBfc3RlbmNpbCA9IDA7XG4gIF9jbGVhckZsYWdzID0gZW51bXMuQ0xFQVJfQ09MT1IgfCBlbnVtcy5DTEVBUl9ERVBUSDtcbiAgX2NsZWFyTW9kZWwgPSBudWxsO1xuXG4gIC8vIHN0YWdlcyAmIGZyYW1lYnVmZmVyXG4gIF9zdGFnZXMgPSBbXTtcbiAgX2ZyYW1lYnVmZmVyID0gbnVsbDtcblxuICAvLyBwcm9qZWN0aW9uIHByb3BlcnRpZXNcbiAgX25lYXIgPSAwLjAxO1xuICBfZmFyID0gMTAwMC4wO1xuICBfZm92ID0gTWF0aC5QSSAvIDQuMDsgLy8gdmVydGljYWwgZm92XG4gIF9yZWN0ID0ge1xuICAgIHg6IDAsIHk6IDAsIHc6IDEsIGg6IDFcbiAgfTtcblxuICAvLyBvcnRobyBwcm9wZXJ0aWVzXG4gIF9vcnRob0hlaWdodCA9IDEwO1xuXG4gIF9jdWxsaW5nTWFzayA9IDB4ZmZmZmZmZmY7XG5cblxuICAvLyBjdWxsaW5nIG1hc2tcbiAgZ2V0IGN1bGxpbmdNYXNrICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VsbGluZ01hc2s7XG4gIH1cblxuICBzZXQgY3VsbGluZ01hc2sgKG1hc2spIHtcbiAgICB0aGlzLl9jdWxsaW5nTWFzayA9IG1hc2s7XG4gIH1cblxuICBzZXRDdWxsaW5nTWFzayAobWFzaykge1xuICAgIHRoaXMuX2N1bGxpbmdNYXNrID0gbWFzaztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGhvc3Rpbmcgbm9kZSBvZiB0aGlzIGNhbWVyYVxuICAgKiBAcmV0dXJucyB7Tm9kZX0gdGhlIGhvc3Rpbmcgbm9kZVxuICAgKi9cbiAgZ2V0Tm9kZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGU7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBob3N0aW5nIG5vZGUgb2YgdGhpcyBjYW1lcmFcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlIHRoZSBob3N0aW5nIG5vZGVcbiAgICovXG4gIHNldE5vZGUgKG5vZGUpIHtcbiAgICB0aGlzLl9ub2RlID0gbm9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHByb2plY3Rpb24gdHlwZSBvZiB0aGUgY2FtZXJhXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGNhbWVyYSBwcm9qZWN0aW9uIHR5cGVcbiAgICovXG4gIGdldFR5cGUgKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9qZWN0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgcHJvamVjdGlvbiB0eXBlIG9mIHRoZSBjYW1lcmFcbiAgICogQHBhcmFtIHtudW1iZXJ9IHR5cGUgY2FtZXJhIHByb2plY3Rpb24gdHlwZVxuICAgKi9cbiAgc2V0VHlwZSAodHlwZSkge1xuICAgIHRoaXMuX3Byb2plY3Rpb24gPSB0eXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcHJpb3JpdHkgb2YgdGhlIGNhbWVyYVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBjYW1lcmEgcHJpb3JpdHlcbiAgICovXG4gIGdldFByaW9yaXR5ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJpb3JpdHk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBwcmlvcml0eSBvZiB0aGUgY2FtZXJhXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwcmlvcml0eSBjYW1lcmEgcHJpb3JpdHlcbiAgICovXG4gIHNldFByaW9yaXR5IChwcmlvcml0eSkge1xuICAgIHRoaXMuX3ByaW9yaXR5ID0gcHJpb3JpdHk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBvcnRob2dvbmFsIGhlaWdodCBvZiB0aGUgY2FtZXJhXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGNhbWVyYSBoZWlnaHRcbiAgICovXG4gIGdldE9ydGhvSGVpZ2h0ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fb3J0aG9IZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBvcnRob2dvbmFsIGhlaWdodCBvZiB0aGUgY2FtZXJhXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgY2FtZXJhIGhlaWdodFxuICAgKi9cbiAgc2V0T3J0aG9IZWlnaHQgKHZhbCkge1xuICAgIHRoaXMuX29ydGhvSGVpZ2h0ID0gdmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZmllbGQgb2YgdmlldyBvZiB0aGUgY2FtZXJhXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGNhbWVyYSBmaWVsZCBvZiB2aWV3XG4gICAqL1xuICBnZXRGb3YgKCkge1xuICAgIHJldHVybiB0aGlzLl9mb3Y7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBmaWVsZCBvZiB2aWV3IG9mIHRoZSBjYW1lcmFcbiAgICogQHBhcmFtIHtudW1iZXJ9IGZvdiBjYW1lcmEgZmllbGQgb2Ygdmlld1xuICAgKi9cbiAgc2V0Rm92IChmb3YpIHtcbiAgICB0aGlzLl9mb3YgPSBmb3Y7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBuZWFyIGNsaXBwaW5nIGRpc3RhbmNlIG9mIHRoZSBjYW1lcmFcbiAgICogQHJldHVybnMge251bWJlcn0gY2FtZXJhIG5lYXIgY2xpcHBpbmcgZGlzdGFuY2VcbiAgICovXG4gIGdldE5lYXIgKCkge1xuICAgIHJldHVybiB0aGlzLl9uZWFyO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgbmVhciBjbGlwcGluZyBkaXN0YW5jZSBvZiB0aGUgY2FtZXJhXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIGNhbWVyYSBuZWFyIGNsaXBwaW5nIGRpc3RhbmNlXG4gICAqL1xuICBzZXROZWFyIChuZWFyKSB7XG4gICAgdGhpcy5fbmVhciA9IG5lYXI7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmYXIgY2xpcHBpbmcgZGlzdGFuY2Ugb2YgdGhlIGNhbWVyYVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBjYW1lcmEgZmFyIGNsaXBwaW5nIGRpc3RhbmNlXG4gICAqL1xuICBnZXRGYXIgKCkge1xuICAgIHJldHVybiB0aGlzLl9mYXI7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBmYXIgY2xpcHBpbmcgZGlzdGFuY2Ugb2YgdGhlIGNhbWVyYVxuICAgKiBAcGFyYW0ge251bWJlcn0gZmFyIGNhbWVyYSBmYXIgY2xpcHBpbmcgZGlzdGFuY2VcbiAgICovXG4gIHNldEZhciAoZmFyKSB7XG4gICAgdGhpcy5fZmFyID0gZmFyO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY2xlYXIgY29sb3Igb2YgdGhlIGNhbWVyYVxuICAgKiBAcmV0dXJucyB7VmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgY29sb3IgdmVjdG9yXG4gICAqL1xuICBnZXRDb2xvciAob3V0KSB7XG4gICAgcmV0dXJuIFZlYzQuY29weShvdXQsIHRoaXMuX2NvbG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGNsZWFyIGNvbG9yIG9mIHRoZSBjYW1lcmFcbiAgICogQHBhcmFtIHtudW1iZXJ9IHIgcmVkIGNoYW5uZWwgb2YgY2FtZXJhIGNsZWFyIGNvbG9yXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBnIGdyZWVuIGNoYW5uZWwgb2YgY2FtZXJhIGNsZWFyIGNvbG9yXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBiIGJsdWUgY2hhbm5lbCBvZiBjYW1lcmEgY2xlYXIgY29sb3JcbiAgICogQHBhcmFtIHtudW1iZXJ9IGEgYWxwaGEgY2hhbm5lbCBvZiBjYW1lcmEgY2xlYXIgY29sb3JcbiAgICovXG4gIHNldENvbG9yIChyLCBnLCBiLCBhKSB7XG4gICAgVmVjNC5zZXQodGhpcy5fY29sb3IsIHIsIGcsIGIsIGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY2xlYXIgZGVwdGggb2YgdGhlIGNhbWVyYVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBjYW1lcmEgY2xlYXIgZGVwdGhcbiAgICovXG4gIGdldERlcHRoICgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGVwdGg7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBjbGVhciBkZXB0aCBvZiB0aGUgY2FtZXJhXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aCBjYW1lcmEgY2xlYXIgZGVwdGhcbiAgICovXG4gIHNldERlcHRoIChkZXB0aCkge1xuICAgIHRoaXMuX2RlcHRoID0gZGVwdGg7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjbGVhcmluZyBzdGVuY2lsIHZhbHVlIG9mIHRoZSBjYW1lcmFcbiAgICogQHJldHVybnMge251bWJlcn0gY2FtZXJhIGNsZWFyaW5nIHN0ZW5jaWwgdmFsdWVcbiAgICovXG4gIGdldFN0ZW5jaWwgKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGVuY2lsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY2xlYXJpbmcgc3RlbmNpbCB2YWx1ZSBvZiB0aGUgY2FtZXJhXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzdGVuY2lsIGNhbWVyYSBjbGVhcmluZyBzdGVuY2lsIHZhbHVlXG4gICAqL1xuICBzZXRTdGVuY2lsIChzdGVuY2lsKSB7XG4gICAgdGhpcy5fc3RlbmNpbCA9IHN0ZW5jaWw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjbGVhcmluZyBmbGFncyBvZiB0aGUgY2FtZXJhXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGNhbWVyYSBjbGVhcmluZyBmbGFnc1xuICAgKi9cbiAgZ2V0Q2xlYXJGbGFncyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NsZWFyRmxhZ3M7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBjbGVhcmluZyBmbGFncyBvZiB0aGUgY2FtZXJhXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBmbGFncyBjYW1lcmEgY2xlYXJpbmcgZmxhZ3NcbiAgICovXG4gIHNldENsZWFyRmxhZ3MgKGZsYWdzKSB7XG4gICAgdGhpcy5fY2xlYXJGbGFncyA9IGZsYWdzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcmVjdCBvZiB0aGUgY2FtZXJhXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvdXQgdGhlIHJlY2VpdmluZyBvYmplY3RcbiAgICogQHJldHVybnMge09iamVjdH0gY2FtZXJhIHJlY3RcbiAgICovXG4gIGdldFJlY3QgKG91dCkge1xuICAgIG91dC54ID0gdGhpcy5fcmVjdC54O1xuICAgIG91dC55ID0gdGhpcy5fcmVjdC55O1xuICAgIG91dC53ID0gdGhpcy5fcmVjdC53O1xuICAgIG91dC5oID0gdGhpcy5fcmVjdC5oO1xuXG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHJlY3Qgb2YgdGhlIGNhbWVyYVxuICAgKiBAcGFyYW0ge051bWJlcn0geCAtIFswLDFdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gWzAsMV1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHcgLSBbMCwxXVxuICAgKiBAcGFyYW0ge051bWJlcn0gaCAtIFswLDFdXG4gICAqL1xuICBzZXRSZWN0ICh4LCB5LCB3LCBoKSB7XG4gICAgdGhpcy5fcmVjdC54ID0geDtcbiAgICB0aGlzLl9yZWN0LnkgPSB5O1xuICAgIHRoaXMuX3JlY3QudyA9IHc7XG4gICAgdGhpcy5fcmVjdC5oID0gaDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHN0YWdlcyBvZiB0aGUgY2FtZXJhXG4gICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gY2FtZXJhIHN0YWdlc1xuICAgKi9cbiAgZ2V0U3RhZ2VzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhZ2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgc3RhZ2VzIG9mIHRoZSBjYW1lcmFcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gc3RhZ2VzIGNhbWVyYSBzdGFnZXNcbiAgICovXG4gIHNldFN0YWdlcyAoc3RhZ2VzKSB7XG4gICAgdGhpcy5fc3RhZ2VzID0gc3RhZ2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZnJhbWVidWZmZXIgb2YgdGhlIGNhbWVyYVxuICAgKiBAcmV0dXJucyB7RnJhbWVCdWZmZXJ9IGNhbWVyYSBmcmFtZWJ1ZmZlclxuICAgKi9cbiAgZ2V0RnJhbWVidWZmZXIgKCkge1xuICAgIHJldHVybiB0aGlzLl9mcmFtZWJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGZyYW1lYnVmZmVyIG9mIHRoZSBjYW1lcmFcbiAgICogQHBhcmFtIHtGcmFtZUJ1ZmZlcn0gZnJhbWVidWZmZXIgY2FtZXJhIGZyYW1lYnVmZmVyXG4gICAqL1xuICBzZXRGcmFtZUJ1ZmZlciAoZnJhbWVidWZmZXIpIHtcbiAgICB0aGlzLl9mcmFtZWJ1ZmZlciA9IGZyYW1lYnVmZmVyO1xuICB9XG5cbiAgX2NhbGNNYXRyaWNlcyAod2lkdGgsIGhlaWdodCkge1xuICAgIC8vIHZpZXcgbWF0cml4XG4gICAgdGhpcy5fbm9kZS5nZXRXb3JsZFJUKF9tYXRWaWV3SW52KTtcbiAgICBNYXQ0LmludmVydChfbWF0VmlldywgX21hdFZpZXdJbnYpO1xuXG4gICAgLy8gcHJvamVjdGlvbiBtYXRyaXhcbiAgICBsZXQgYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgaWYgKHRoaXMuX3Byb2plY3Rpb24gPT09IGVudW1zLlBST0pfUEVSU1BFQ1RJVkUpIHtcbiAgICAgIE1hdDQucGVyc3BlY3RpdmUoX21hdFByb2osXG4gICAgICAgIHRoaXMuX2ZvdixcbiAgICAgICAgYXNwZWN0LFxuICAgICAgICB0aGlzLl9uZWFyLFxuICAgICAgICB0aGlzLl9mYXJcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB4ID0gdGhpcy5fb3J0aG9IZWlnaHQgKiBhc3BlY3Q7XG4gICAgICBsZXQgeSA9IHRoaXMuX29ydGhvSGVpZ2h0O1xuICAgICAgTWF0NC5vcnRobyhfbWF0UHJvaixcbiAgICAgICAgLXgsIHgsIC15LCB5LCB0aGlzLl9uZWFyLCB0aGlzLl9mYXJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gdmlldy1wcm9qZWN0aW9uXG4gICAgTWF0NC5tdWwoX21hdFZpZXdQcm9qLCBfbWF0UHJvaiwgX21hdFZpZXcpO1xuICAgIC8vIGludiB2aWV3LXByb2plY3Rpb25cbiAgICBNYXQ0LmludmVydChfbWF0SW52Vmlld1Byb2osIF9tYXRWaWV3UHJvaik7XG4gIH1cblxuICAvKipcbiAgICogZXh0cmFjdCBhIHZpZXcgb2YgdGhpcyBjYW1lcmFcbiAgICogQHBhcmFtIHtWaWV3fSBvdXQgdGhlIHJlY2VpdmluZyB2aWV3XG4gICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCBmcmFtZWJ1ZmZlciB3aWR0aFxuICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IGZyYW1lYnVmZmVyIGhlaWdodFxuICAgKi9cbiAgZXh0cmFjdFZpZXcgKG91dCwgd2lkdGgsIGhlaWdodCkge1xuICAgIGlmICh0aGlzLl9mcmFtZWJ1ZmZlcikge1xuICAgICAgd2lkdGggPSB0aGlzLl9mcmFtZWJ1ZmZlci5fd2lkdGg7XG4gICAgICBoZWlnaHQgPSB0aGlzLl9mcmFtZWJ1ZmZlci5faGVpZ2h0O1xuICAgIH1cblxuICAgIC8vIHByaW9yaXR5XG4gICAgb3V0Ll9wcmlvcml0eSA9IHRoaXMuX3ByaW9yaXR5O1xuXG4gICAgLy8gcmVjdFxuICAgIG91dC5fcmVjdC54ID0gdGhpcy5fcmVjdC54ICogd2lkdGg7XG4gICAgb3V0Ll9yZWN0LnkgPSB0aGlzLl9yZWN0LnkgKiBoZWlnaHQ7XG4gICAgb3V0Ll9yZWN0LncgPSB0aGlzLl9yZWN0LncgKiB3aWR0aDtcbiAgICBvdXQuX3JlY3QuaCA9IHRoaXMuX3JlY3QuaCAqIGhlaWdodDtcblxuICAgIC8vIGNsZWFyIG9wdHNcbiAgICB0aGlzLmdldENvbG9yKG91dC5fY29sb3IpO1xuICAgIG91dC5fZGVwdGggPSB0aGlzLl9kZXB0aDtcbiAgICBvdXQuX3N0ZW5jaWwgPSB0aGlzLl9zdGVuY2lsO1xuICAgIG91dC5fY2xlYXJGbGFncyA9IHRoaXMuX2NsZWFyRmxhZ3M7XG4gICAgb3V0Ll9jbGVhck1vZGVsID0gdGhpcy5fY2xlYXJNb2RlbDtcblxuICAgIC8vIHN0YWdlcyAmIGZyYW1lYnVmZmVyXG4gICAgb3V0Ll9zdGFnZXMgPSB0aGlzLl9zdGFnZXM7XG4gICAgb3V0Ll9mcmFtZWJ1ZmZlciA9IHRoaXMuX2ZyYW1lYnVmZmVyO1xuXG4gICAgdGhpcy5fY2FsY01hdHJpY2VzKHdpZHRoLCBoZWlnaHQpO1xuICAgIE1hdDQuY29weShvdXQuX21hdFZpZXcsIF9tYXRWaWV3KTtcbiAgICBNYXQ0LmNvcHkob3V0Ll9tYXRWaWV3SW52LCBfbWF0Vmlld0ludik7XG4gICAgTWF0NC5jb3B5KG91dC5fbWF0UHJvaiwgX21hdFByb2opO1xuICAgIE1hdDQuY29weShvdXQuX21hdFZpZXdQcm9qLCBfbWF0Vmlld1Byb2opO1xuICAgIE1hdDQuY29weShvdXQuX21hdEludlZpZXdQcm9qLCBfbWF0SW52Vmlld1Byb2opO1xuXG4gICAgb3V0Ll9jdWxsaW5nTWFzayA9IHRoaXMuX2N1bGxpbmdNYXNrO1xuICB9XG5cbiAgLyoqXG4gICAqIHRyYW5zZm9ybSBhIHNjcmVlbiBwb3NpdGlvbiB0byBhIHdvcmxkIHNwYWNlIHJheVxuICAgKiBAcGFyYW0ge251bWJlcn0geCB0aGUgc2NyZWVuIHggcG9zaXRpb24gdG8gYmUgdHJhbnNmb3JtZWRcbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgdGhlIHNjcmVlbiB5IHBvc2l0aW9uIHRvIGJlIHRyYW5zZm9ybWVkXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCBmcmFtZWJ1ZmZlciB3aWR0aFxuICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IGZyYW1lYnVmZmVyIGhlaWdodFxuICAgKiBAcGFyYW0ge1JheX0gb3V0IHRoZSByZXN1bHRpbmcgcmF5XG4gICAqIEByZXR1cm5zIHtSYXl9IHRoZSByZXN1bHRpbmcgcmF5XG4gICAqL1xuICBzY3JlZW5Qb2ludFRvUmF5ICh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBvdXQpIHtcbiAgICBpZiAoIWNjLmdlb21VdGlscykgcmV0dXJuIG91dDtcblxuICAgIG91dCA9IG91dCB8fCBuZXcgUmF5KCk7XG4gICAgdGhpcy5fY2FsY01hdHJpY2VzKHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgbGV0IGN4ID0gdGhpcy5fcmVjdC54ICogd2lkdGg7XG4gICAgbGV0IGN5ID0gdGhpcy5fcmVjdC55ICogaGVpZ2h0O1xuICAgIGxldCBjdyA9IHRoaXMuX3JlY3QudyAqIHdpZHRoO1xuICAgIGxldCBjaCA9IHRoaXMuX3JlY3QuaCAqIGhlaWdodDtcblxuICAgIC8vIGZhciBwbGFuZSBpbnRlcnNlY3Rpb25cbiAgICBWZWMzLnNldChfdG1wMl92MywgKHggLSBjeCkgLyBjdyAqIDIgLSAxLCAoeSAtIGN5KSAvIGNoICogMiAtIDEsIDEpO1xuICAgIFZlYzMudHJhbnNmb3JtTWF0NChfdG1wMl92MywgX3RtcDJfdjMsIF9tYXRJbnZWaWV3UHJvaik7XG5cbiAgICBpZiAodGhpcy5fcHJvamVjdGlvbiA9PT0gZW51bXMuUFJPSl9QRVJTUEVDVElWRSkge1xuICAgICAgLy8gY2FtZXJhIG9yaWdpblxuICAgICAgdGhpcy5fbm9kZS5nZXRXb3JsZFBvc2l0aW9uKF90bXBfdjMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBuZWFyIHBsYW5lIGludGVyc2VjdGlvblxuICAgICAgVmVjMy5zZXQoX3RtcF92MywgKHggLSBjeCkgLyBjdyAqIDIgLSAxLCAoeSAtIGN5KSAvIGNoICogMiAtIDEsIC0xKTtcbiAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChfdG1wX3YzLCBfdG1wX3YzLCBfbWF0SW52Vmlld1Byb2opO1xuICAgIH1cblxuICAgIHJldHVybiBSYXkuZnJvbVBvaW50cyhvdXQsIF90bXBfdjMsIF90bXAyX3YzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0cmFuc2Zvcm0gYSBzY3JlZW4gcG9zaXRpb24gdG8gd29ybGQgc3BhY2VcbiAgICogQHBhcmFtIHtWZWMzfSBvdXQgdGhlIHJlc3VsdGluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtWZWMzfSBzY3JlZW5Qb3MgdGhlIHNjcmVlbiBwb3NpdGlvbiB0byBiZSB0cmFuc2Zvcm1lZFxuICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGggZnJhbWVidWZmZXIgd2lkdGhcbiAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCBmcmFtZWJ1ZmZlciBoZWlnaHRcbiAgICogQHJldHVybnMge1ZlYzN9IHRoZSByZXN1bHRpbmcgdmVjdG9yXG4gICAqL1xuICBzY3JlZW5Ub1dvcmxkIChvdXQsIHNjcmVlblBvcywgd2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuX2NhbGNNYXRyaWNlcyh3aWR0aCwgaGVpZ2h0KTtcblxuICAgIGxldCBjeCA9IHRoaXMuX3JlY3QueCAqIHdpZHRoO1xuICAgIGxldCBjeSA9IHRoaXMuX3JlY3QueSAqIGhlaWdodDtcbiAgICBsZXQgY3cgPSB0aGlzLl9yZWN0LncgKiB3aWR0aDtcbiAgICBsZXQgY2ggPSB0aGlzLl9yZWN0LmggKiBoZWlnaHQ7XG5cbiAgICBpZiAodGhpcy5fcHJvamVjdGlvbiA9PT0gZW51bXMuUFJPSl9QRVJTUEVDVElWRSkge1xuICAgICAgLy8gY2FsY3VsYXRlIHNjcmVlbiBwb3MgaW4gZmFyIGNsaXAgcGxhbmVcbiAgICAgIFZlYzMuc2V0KG91dCxcbiAgICAgICAgKHNjcmVlblBvcy54IC0gY3gpIC8gY3cgKiAyIC0gMSxcbiAgICAgICAgKHNjcmVlblBvcy55IC0gY3kpIC8gY2ggKiAyIC0gMSxcbiAgICAgICAgMC45OTk5XG4gICAgICApO1xuXG4gICAgICAvLyB0cmFuc2Zvcm0gdG8gd29ybGRcbiAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChvdXQsIG91dCwgX21hdEludlZpZXdQcm9qKTtcblxuICAgICAgLy8gbGVycCB0byBkZXB0aCB6XG4gICAgICB0aGlzLl9ub2RlLmdldFdvcmxkUG9zaXRpb24oX3RtcF92Myk7XG5cbiAgICAgIFZlYzMubGVycChvdXQsIF90bXBfdjMsIG91dCwgbGVycCh0aGlzLl9uZWFyIC8gdGhpcy5fZmFyLCAxLCBzY3JlZW5Qb3MueikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBWZWMzLnNldChvdXQsXG4gICAgICAgIChzY3JlZW5Qb3MueCAtIGN4KSAvIGN3ICogMiAtIDEsXG4gICAgICAgIChzY3JlZW5Qb3MueSAtIGN5KSAvIGNoICogMiAtIDEsXG4gICAgICAgIHNjcmVlblBvcy56ICogMiAtIDFcbiAgICAgICk7XG5cbiAgICAgIC8vIHRyYW5zZm9ybSB0byB3b3JsZFxuICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KG91dCwgb3V0LCBfbWF0SW52Vmlld1Byb2opO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG4gIH1cblxuICAvKipcbiAgICogdHJhbnNmb3JtIGEgd29ybGQgc3BhY2UgcG9zaXRpb24gdG8gc2NyZWVuIHNwYWNlXG4gICAqIEBwYXJhbSB7VmVjM30gb3V0IHRoZSByZXN1bHRpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7VmVjM30gd29ybGRQb3MgdGhlIHdvcmxkIHNwYWNlIHBvc2l0aW9uIHRvIGJlIHRyYW5zZm9ybWVkXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCBmcmFtZWJ1ZmZlciB3aWR0aFxuICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IGZyYW1lYnVmZmVyIGhlaWdodFxuICAgKiBAcmV0dXJucyB7VmVjM30gdGhlIHJlc3VsdGluZyB2ZWN0b3JcbiAgICovXG4gIHdvcmxkVG9TY3JlZW4gKG91dCwgd29ybGRQb3MsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLl9jYWxjTWF0cmljZXMod2lkdGgsIGhlaWdodCk7XG5cbiAgICBsZXQgY3ggPSB0aGlzLl9yZWN0LnggKiB3aWR0aDtcbiAgICBsZXQgY3kgPSB0aGlzLl9yZWN0LnkgKiBoZWlnaHQ7XG4gICAgbGV0IGN3ID0gdGhpcy5fcmVjdC53ICogd2lkdGg7XG4gICAgbGV0IGNoID0gdGhpcy5fcmVjdC5oICogaGVpZ2h0O1xuXG4gICAgVmVjMy50cmFuc2Zvcm1NYXQ0KG91dCwgd29ybGRQb3MsIF9tYXRWaWV3UHJvaik7XG4gICAgb3V0LnggPSBjeCArIChvdXQueCArIDEpICogMC41ICogY3c7XG4gICAgb3V0LnkgPSBjeSArIChvdXQueSArIDEpICogMC41ICogY2g7XG4gICAgb3V0LnogPSBvdXQueiAqIDAuNSArIDAuNTtcblxuICAgIHJldHVybiBvdXQ7XG4gIH1cblxuICAvKipcbiAgICogdHJhbnNmb3JtIGEgd29ybGQgc3BhY2UgbWF0cml4IHRvIHNjcmVlbiBzcGFjZVxuICAgKiBAcGFyYW0ge01hdDR9IG91dCB0aGUgcmVzdWx0aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge01hdDR9IHdvcmxkTWF0cml4IHRoZSB3b3JsZCBzcGFjZSBtYXRyaXggdG8gYmUgdHJhbnNmb3JtZWRcbiAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIGZyYW1lYnVmZmVyIHdpZHRoXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgZnJhbWVidWZmZXIgaGVpZ2h0XG4gICAqIEByZXR1cm5zIHtNYXQ0fSB0aGUgcmVzdWx0aW5nIHZlY3RvclxuICAgKi9cbiAgd29ybGRNYXRyaXhUb1NjcmVlbiAob3V0LCB3b3JsZE1hdHJpeCwgd2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuX2NhbGNNYXRyaWNlcyh3aWR0aCwgaGVpZ2h0KTtcblxuICAgIE1hdDQubXVsKG91dCwgX21hdFZpZXdQcm9qLCB3b3JsZE1hdHJpeCk7XG5cbiAgICBsZXQgaGFsZldpZHRoID0gd2lkdGggLyAyO1xuICAgIGxldCBoYWxmSGVpZ2h0ID0gaGVpZ2h0IC8gMjtcbiAgICBNYXQ0LmlkZW50aXR5KF90bXBfbWF0NCk7XG4gICAgTWF0NC50cmFuc2Zvcm0oX3RtcF9tYXQ0LCBfdG1wX21hdDQsIFZlYzMuc2V0KF90bXBfdjMsIGhhbGZXaWR0aCwgaGFsZkhlaWdodCwgMCkpO1xuICAgIE1hdDQuc2NhbGUoX3RtcF9tYXQ0LCBfdG1wX21hdDQsIFZlYzMuc2V0KF90bXBfdjMsIGhhbGZXaWR0aCwgaGFsZkhlaWdodCwgMSkpO1xuXG4gICAgTWF0NC5tdWwob3V0LCBfdG1wX21hdDQsIG91dCk7XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==