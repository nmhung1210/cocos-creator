
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/scene/light.js';
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

var _gfx = _interopRequireDefault(require("../gfx"));

var _enums = _interopRequireDefault(require("../enums"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _forward = cc.v3(0, 0, -1);

var _m4_tmp = cc.mat4();

var _m3_tmp = _valueTypes.Mat3.create();

var _transformedLightDirection = cc.v3(0, 0, 0); // compute light viewProjMat for shadow.


function _computeSpotLightViewProjMatrix(light, outView, outProj) {
  // view matrix
  light._node.getWorldRT(outView);

  _valueTypes.Mat4.invert(outView, outView); // proj matrix


  _valueTypes.Mat4.perspective(outProj, light._spotAngle * light._spotAngleScale, 1, light._shadowMinDepth, light._shadowMaxDepth);
}

function _computeDirectionalLightViewProjMatrix(light, outView, outProj) {
  // view matrix
  light._node.getWorldRT(outView);

  _valueTypes.Mat4.invert(outView, outView); // TODO: should compute directional light frustum based on rendered meshes in scene.
  // proj matrix


  var halfSize = light._shadowFrustumSize / 2;

  _valueTypes.Mat4.ortho(outProj, -halfSize, halfSize, -halfSize, halfSize, light._shadowMinDepth, light._shadowMaxDepth);
}

function _computePointLightViewProjMatrix(light, outView, outProj) {
  // view matrix
  light._node.getWorldRT(outView);

  _valueTypes.Mat4.invert(outView, outView); // The transformation from Cartesian to polar coordinates is not a linear function,
  // so it cannot be achieved by means of a fixed matrix multiplication.
  // Here we just use a nearly 180 degree perspective matrix instead.


  _valueTypes.Mat4.perspective(outProj, (0, _valueTypes.toRadian)(179), 1, light._shadowMinDepth, light._shadowMaxDepth);
}
/**
 * A representation of a light source.
 * Could be a point light, a spot light or a directional light.
 */


var Light = /*#__PURE__*/function () {
  /**
   * Setup a default directional light with no shadows
   */
  function Light() {
    this._poolID = -1;
    this._node = null;
    this._type = _enums["default"].LIGHT_DIRECTIONAL;
    this._color = new _valueTypes.Vec3(1, 1, 1);
    this._intensity = 1; // used for spot and point light

    this._range = 1; // used for spot light, default to 60 degrees

    this._spotAngle = (0, _valueTypes.toRadian)(60);
    this._spotExp = 1; // cached for uniform

    this._directionUniform = new Float32Array(3);
    this._positionUniform = new Float32Array(3);
    this._colorUniform = new Float32Array([this._color.x * this._intensity, this._color.y * this._intensity, this._color.z * this._intensity]);
    this._spotUniform = new Float32Array([Math.cos(this._spotAngle * 0.5), this._spotExp]); // shadow params

    this._shadowType = _enums["default"].SHADOW_NONE;
    this._shadowFrameBuffer = null;
    this._shadowMap = null;
    this._shadowMapDirty = false;
    this._shadowDepthBuffer = null;
    this._shadowResolution = 1024;
    this._shadowBias = 0.0005;
    this._shadowDarkness = 1;
    this._shadowMinDepth = 1;
    this._shadowMaxDepth = 1000;
    this._frustumEdgeFalloff = 0; // used by directional and spot light.

    this._viewProjMatrix = cc.mat4();
    this._spotAngleScale = 1; // used for spot light.

    this._shadowFrustumSize = 50; // used for directional light.
  }
  /**
   * Get the hosting node of this camera
   * @returns {Node} the hosting node
   */


  var _proto = Light.prototype;

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
   * set the color of the light source
   * @param {number} r red channel of the light color
   * @param {number} g green channel of the light color
   * @param {number} b blue channel of the light color
   */
  ;

  _proto.setColor = function setColor(r, g, b) {
    _valueTypes.Vec3.set(this._color, r, g, b);

    this._colorUniform[0] = r * this._intensity;
    this._colorUniform[1] = g * this._intensity;
    this._colorUniform[2] = b * this._intensity;
  }
  /**
   * get the color of the light source
   * @returns {Vec3} the light color
   */
  ;

  /**
   * set the intensity of the light source
   * @param {number} val the light intensity
   */
  _proto.setIntensity = function setIntensity(val) {
    this._intensity = val;
    this._colorUniform[0] = val * this._color.x;
    this._colorUniform[1] = val * this._color.y;
    this._colorUniform[2] = val * this._color.z;
  }
  /**
   * get the intensity of the light source
   * @returns {number} the light intensity
   */
  ;

  /**
   * set the type of the light source
   * @param {number} type light source type
   */
  _proto.setType = function setType(type) {
    this._type = type;
  }
  /**
   * get the type of the light source
   * @returns {number} light source type
   */
  ;

  /**
   * set the spot light angle
   * @param {number} val spot light angle
   */
  _proto.setSpotAngle = function setSpotAngle(val) {
    this._spotAngle = val;
    this._spotUniform[0] = Math.cos(this._spotAngle * 0.5);
  }
  /**
   * get the spot light angle
   * @returns {number} spot light angle
   */
  ;

  /**
   * set the spot light exponential
   * @param {number} val spot light exponential
   */
  _proto.setSpotExp = function setSpotExp(val) {
    this._spotExp = val;
    this._spotUniform[1] = val;
  }
  /**
   * get the spot light exponential
   * @returns {number} spot light exponential
   */
  ;

  /**
   * set the range of the light source
   * @param {number} val light source range
   */
  _proto.setRange = function setRange(val) {
    this._range = val;
  }
  /**
   * get the range of the light source
   * @returns {number} range of the light source
   */
  ;

  /**
   * set the shadow type of the light source
   * @param {number} type light source shadow type
   */
  _proto.setShadowType = function setShadowType(type) {
    if (this._shadowType === _enums["default"].SHADOW_NONE && type !== _enums["default"].SHADOW_NONE) {
      this._shadowMapDirty = true;
    }

    this._shadowType = type;
  }
  /**
   * get the shadow type of the light source
   * @returns {number} light source shadow type
   */
  ;

  /**
   * set the shadow resolution of the light source
   * @param {number} val light source shadow resolution
   */
  _proto.setShadowResolution = function setShadowResolution(val) {
    if (this._shadowResolution !== val) {
      this._shadowMapDirty = true;
    }

    this._shadowResolution = val;
  }
  /**
   * get the shadow resolution of the light source
   * @returns {number} light source shadow resolution
   */
  ;

  /**
   * set the shadow bias of the light source
   * @param {number} val light source shadow bias
   */
  _proto.setShadowBias = function setShadowBias(val) {
    this._shadowBias = val;
  }
  /**
   * get the shadow bias of the light source
   * @returns {number} light source shadow bias
   */
  ;

  /**
   * set the shadow darkness of the light source
   * @param {number} val light source shadow darkness
   */
  _proto.setShadowDarkness = function setShadowDarkness(val) {
    this._shadowDarkness = val;
  }
  /**
   * get the shadow darkness of the light source
   * @returns {number} light source shadow darkness
   */
  ;

  /**
   * set the shadow min depth of the light source
   * @param {number} val light source shadow min depth
   */
  _proto.setShadowMinDepth = function setShadowMinDepth(val) {
    this._shadowMinDepth = val;
  }
  /**
   * get the shadow min depth of the light source
   * @returns {number} light source shadow min depth
   */
  ;

  /**
   * set the shadow max depth of the light source
   * @param {number} val light source shadow max depth
   */
  _proto.setShadowMaxDepth = function setShadowMaxDepth(val) {
    this._shadowMaxDepth = val;
  }
  /**
   * get the shadow max depth of the light source
   * @returns {number} light source shadow max depth
   */
  ;

  /**
   * set the frustum edge falloff of the light source
   * @param {number} val light source frustum edge falloff
   */
  _proto.setFrustumEdgeFalloff = function setFrustumEdgeFalloff(val) {
    this._frustumEdgeFalloff = val;
  }
  /**
   * get the frustum edge falloff of the light source
   * @returns {number} light source frustum edge falloff
   */
  ;

  /**
   * set the shadow frustum size of the light source
   * @param {number} val light source shadow frustum size
   */
  _proto.setShadowFrustumSize = function setShadowFrustumSize(val) {
    this._shadowFrustumSize = val;
  }
  /**
   * get the shadow frustum size of the light source
   * @returns {number} light source shadow frustum size
   */
  ;

  /**
   * extract a view of this light source
   * @param {View} out the receiving view
   * @param {string[]} stages the stages using the view
   */
  _proto.extractView = function extractView(out, stages) {
    // TODO: view should not handle light.
    out._shadowLight = this; // priority. TODO: use varying value for shadow view?

    out._priority = -1; // rect

    out._rect.x = 0;
    out._rect.y = 0;
    out._rect.w = this._shadowResolution;
    out._rect.h = this._shadowResolution; // clear opts

    _valueTypes.Vec3.set(out._color, 1, 1, 1);

    out._depth = 1;
    out._stencil = 1;
    out._clearFlags = _enums["default"].CLEAR_COLOR | _enums["default"].CLEAR_DEPTH; // stages & framebuffer

    out._stages = stages;
    out._framebuffer = this._shadowFrameBuffer; // view projection matrix

    switch (this._type) {
      case _enums["default"].LIGHT_SPOT:
        _computeSpotLightViewProjMatrix(this, out._matView, out._matProj);

        break;

      case _enums["default"].LIGHT_DIRECTIONAL:
        _computeDirectionalLightViewProjMatrix(this, out._matView, out._matProj);

        break;

      case _enums["default"].LIGHT_POINT:
        _computePointLightViewProjMatrix(this, out._matView, out._matProj);

        break;

      case _enums["default"].LIGHT_AMBIENT:
        break;

      default:
        console.warn('shadow of this light type is not supported');
    } // view-projection


    _valueTypes.Mat4.mul(out._matViewProj, out._matProj, out._matView);

    this._viewProjMatrix = out._matViewProj;

    _valueTypes.Mat4.invert(out._matInvViewProj, out._matViewProj); // update view's frustum
    // out._frustum.update(out._matViewProj, out._matInvViewProj);


    out._cullingMask = 0xffffffff;
  };

  _proto._updateLightPositionAndDirection = function _updateLightPositionAndDirection() {
    this._node.getWorldMatrix(_m4_tmp);

    _valueTypes.Mat3.fromMat4(_m3_tmp, _m4_tmp);

    _valueTypes.Vec3.transformMat3(_transformedLightDirection, _forward, _m3_tmp);

    _valueTypes.Vec3.toArray(this._directionUniform, _transformedLightDirection);

    var pos = this._positionUniform;
    var m = _m4_tmp.m;
    pos[0] = m[12];
    pos[1] = m[13];
    pos[2] = m[14];
  };

  _proto._generateShadowMap = function _generateShadowMap(device) {
    this._shadowMap = new _gfx["default"].Texture2D(device, {
      width: this._shadowResolution,
      height: this._shadowResolution,
      format: _gfx["default"].TEXTURE_FMT_RGBA8,
      wrapS: _gfx["default"].WRAP_CLAMP,
      wrapT: _gfx["default"].WRAP_CLAMP
    });
    this._shadowDepthBuffer = new _gfx["default"].RenderBuffer(device, _gfx["default"].RB_FMT_D16, this._shadowResolution, this._shadowResolution);
    this._shadowFrameBuffer = new _gfx["default"].FrameBuffer(device, this._shadowResolution, this._shadowResolution, {
      colors: [this._shadowMap],
      depth: this._shadowDepthBuffer
    });
  };

  _proto._destroyShadowMap = function _destroyShadowMap() {
    if (this._shadowMap) {
      this._shadowMap.destroy();

      this._shadowDepthBuffer.destroy();

      this._shadowFrameBuffer.destroy();

      this._shadowMap = null;
      this._shadowDepthBuffer = null;
      this._shadowFrameBuffer = null;
    }
  }
  /**
   * update the light source
   * @param {Device} device the rendering device
   */
  ;

  _proto.update = function update(device) {
    this._updateLightPositionAndDirection();

    if (this._shadowType === _enums["default"].SHADOW_NONE) {
      this._destroyShadowMap();
    } else if (this._shadowMapDirty) {
      this._destroyShadowMap();

      this._generateShadowMap(device);

      this._shadowMapDirty = false;
    }
  };

  _createClass(Light, [{
    key: "color",
    get: function get() {
      return this._color;
    }
  }, {
    key: "intensity",
    get: function get() {
      return this._intensity;
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    }
  }, {
    key: "spotAngle",
    get: function get() {
      return this._spotAngle;
    }
  }, {
    key: "spotExp",
    get: function get() {
      return this._spotExp;
    }
  }, {
    key: "range",
    get: function get() {
      return this._range;
    }
  }, {
    key: "shadowType",
    get: function get() {
      return this._shadowType;
    }
    /**
     * get the shadowmap of the light source
     * @returns {Texture2D} light source shadowmap
     */

  }, {
    key: "shadowMap",
    get: function get() {
      return this._shadowMap;
    }
    /**
     * get the view-projection matrix of the light source
     * @returns {Mat4} light source view-projection matrix
     */

  }, {
    key: "viewProjMatrix",
    get: function get() {
      return this._viewProjMatrix;
    }
  }, {
    key: "shadowResolution",
    get: function get() {
      return this._shadowResolution;
    }
  }, {
    key: "shadowBias",
    get: function get() {
      return this._shadowBias;
    }
  }, {
    key: "shadowDarkness",
    get: function get() {
      return this._shadowDarkness;
    }
  }, {
    key: "shadowMinDepth",
    get: function get() {
      if (this._type === _enums["default"].LIGHT_DIRECTIONAL) {
        return 1.0;
      }

      return this._shadowMinDepth;
    }
  }, {
    key: "shadowMaxDepth",
    get: function get() {
      if (this._type === _enums["default"].LIGHT_DIRECTIONAL) {
        return 1.0;
      }

      return this._shadowMaxDepth;
    }
  }, {
    key: "frustumEdgeFalloff",
    get: function get() {
      return this._frustumEdgeFalloff;
    }
  }, {
    key: "shadowFrustumSize",
    get: function get() {
      return this._shadowFrustumSize;
    }
  }]);

  return Light;
}();

exports["default"] = Light;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9zY2VuZS9saWdodC5qcyJdLCJuYW1lcyI6WyJfZm9yd2FyZCIsImNjIiwidjMiLCJfbTRfdG1wIiwibWF0NCIsIl9tM190bXAiLCJNYXQzIiwiY3JlYXRlIiwiX3RyYW5zZm9ybWVkTGlnaHREaXJlY3Rpb24iLCJfY29tcHV0ZVNwb3RMaWdodFZpZXdQcm9qTWF0cml4IiwibGlnaHQiLCJvdXRWaWV3Iiwib3V0UHJvaiIsIl9ub2RlIiwiZ2V0V29ybGRSVCIsIk1hdDQiLCJpbnZlcnQiLCJwZXJzcGVjdGl2ZSIsIl9zcG90QW5nbGUiLCJfc3BvdEFuZ2xlU2NhbGUiLCJfc2hhZG93TWluRGVwdGgiLCJfc2hhZG93TWF4RGVwdGgiLCJfY29tcHV0ZURpcmVjdGlvbmFsTGlnaHRWaWV3UHJvak1hdHJpeCIsImhhbGZTaXplIiwiX3NoYWRvd0ZydXN0dW1TaXplIiwib3J0aG8iLCJfY29tcHV0ZVBvaW50TGlnaHRWaWV3UHJvak1hdHJpeCIsIkxpZ2h0IiwiX3Bvb2xJRCIsIl90eXBlIiwiZW51bXMiLCJMSUdIVF9ESVJFQ1RJT05BTCIsIl9jb2xvciIsIlZlYzMiLCJfaW50ZW5zaXR5IiwiX3JhbmdlIiwiX3Nwb3RFeHAiLCJfZGlyZWN0aW9uVW5pZm9ybSIsIkZsb2F0MzJBcnJheSIsIl9wb3NpdGlvblVuaWZvcm0iLCJfY29sb3JVbmlmb3JtIiwieCIsInkiLCJ6IiwiX3Nwb3RVbmlmb3JtIiwiTWF0aCIsImNvcyIsIl9zaGFkb3dUeXBlIiwiU0hBRE9XX05PTkUiLCJfc2hhZG93RnJhbWVCdWZmZXIiLCJfc2hhZG93TWFwIiwiX3NoYWRvd01hcERpcnR5IiwiX3NoYWRvd0RlcHRoQnVmZmVyIiwiX3NoYWRvd1Jlc29sdXRpb24iLCJfc2hhZG93QmlhcyIsIl9zaGFkb3dEYXJrbmVzcyIsIl9mcnVzdHVtRWRnZUZhbGxvZmYiLCJfdmlld1Byb2pNYXRyaXgiLCJnZXROb2RlIiwic2V0Tm9kZSIsIm5vZGUiLCJzZXRDb2xvciIsInIiLCJnIiwiYiIsInNldCIsInNldEludGVuc2l0eSIsInZhbCIsInNldFR5cGUiLCJ0eXBlIiwic2V0U3BvdEFuZ2xlIiwic2V0U3BvdEV4cCIsInNldFJhbmdlIiwic2V0U2hhZG93VHlwZSIsInNldFNoYWRvd1Jlc29sdXRpb24iLCJzZXRTaGFkb3dCaWFzIiwic2V0U2hhZG93RGFya25lc3MiLCJzZXRTaGFkb3dNaW5EZXB0aCIsInNldFNoYWRvd01heERlcHRoIiwic2V0RnJ1c3R1bUVkZ2VGYWxsb2ZmIiwic2V0U2hhZG93RnJ1c3R1bVNpemUiLCJleHRyYWN0VmlldyIsIm91dCIsInN0YWdlcyIsIl9zaGFkb3dMaWdodCIsIl9wcmlvcml0eSIsIl9yZWN0IiwidyIsImgiLCJfZGVwdGgiLCJfc3RlbmNpbCIsIl9jbGVhckZsYWdzIiwiQ0xFQVJfQ09MT1IiLCJDTEVBUl9ERVBUSCIsIl9zdGFnZXMiLCJfZnJhbWVidWZmZXIiLCJMSUdIVF9TUE9UIiwiX21hdFZpZXciLCJfbWF0UHJvaiIsIkxJR0hUX1BPSU5UIiwiTElHSFRfQU1CSUVOVCIsImNvbnNvbGUiLCJ3YXJuIiwibXVsIiwiX21hdFZpZXdQcm9qIiwiX21hdEludlZpZXdQcm9qIiwiX2N1bGxpbmdNYXNrIiwiX3VwZGF0ZUxpZ2h0UG9zaXRpb25BbmREaXJlY3Rpb24iLCJnZXRXb3JsZE1hdHJpeCIsImZyb21NYXQ0IiwidHJhbnNmb3JtTWF0MyIsInRvQXJyYXkiLCJwb3MiLCJtIiwiX2dlbmVyYXRlU2hhZG93TWFwIiwiZGV2aWNlIiwiZ2Z4IiwiVGV4dHVyZTJEIiwid2lkdGgiLCJoZWlnaHQiLCJmb3JtYXQiLCJURVhUVVJFX0ZNVF9SR0JBOCIsIndyYXBTIiwiV1JBUF9DTEFNUCIsIndyYXBUIiwiUmVuZGVyQnVmZmVyIiwiUkJfRk1UX0QxNiIsIkZyYW1lQnVmZmVyIiwiY29sb3JzIiwiZGVwdGgiLCJfZGVzdHJveVNoYWRvd01hcCIsImRlc3Ryb3kiLCJ1cGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7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QUtKLGlCQUFaO0FBQ0Q7Ozt3QkFjZ0I7QUFDZixhQUFPLEtBQUtDLFdBQVo7QUFDRDs7O3dCQWNvQjtBQUNuQixhQUFPLEtBQUtDLGVBQVo7QUFDRDs7O3dCQWNvQjtBQUNuQixVQUFJLEtBQUsxQixLQUFMLEtBQWVDLGtCQUFNQyxpQkFBekIsRUFBNEM7QUFDMUMsZUFBTyxHQUFQO0FBQ0Q7O0FBQ0QsYUFBTyxLQUFLWCxlQUFaO0FBQ0Q7Ozt3QkFjb0I7QUFDbkIsVUFBSSxLQUFLUyxLQUFMLEtBQWVDLGtCQUFNQyxpQkFBekIsRUFBNEM7QUFDMUMsZUFBTyxHQUFQO0FBQ0Q7O0FBQ0QsYUFBTyxLQUFLVixlQUFaO0FBQ0Q7Ozt3QkFjd0I7QUFDdkIsYUFBTyxLQUFLbUMsbUJBQVo7QUFDRDs7O3dCQWN1QjtBQUN0QixhQUFPLEtBQUtoQyxrQkFBWjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbmltcG9ydCB7IE1hdDQsIE1hdDMsIFZlYzMsIHRvUmFkaWFuIH0gZnJvbSAnLi4vLi4vY29yZS92YWx1ZS10eXBlcyc7XG5pbXBvcnQgZ2Z4IGZyb20gJy4uL2dmeCc7XG5cbmltcG9ydCBlbnVtcyBmcm9tICcuLi9lbnVtcyc7XG5cbmNvbnN0IF9mb3J3YXJkID0gY2MudjMoMCwgMCwgLTEpO1xuXG5sZXQgX200X3RtcCA9IGNjLm1hdDQoKTtcbmxldCBfbTNfdG1wID0gTWF0My5jcmVhdGUoKTtcbmxldCBfdHJhbnNmb3JtZWRMaWdodERpcmVjdGlvbiA9IGNjLnYzKDAsIDAsIDApO1xuXG4vLyBjb21wdXRlIGxpZ2h0IHZpZXdQcm9qTWF0IGZvciBzaGFkb3cuXG5mdW5jdGlvbiBfY29tcHV0ZVNwb3RMaWdodFZpZXdQcm9qTWF0cml4KGxpZ2h0LCBvdXRWaWV3LCBvdXRQcm9qKSB7XG4gIC8vIHZpZXcgbWF0cml4XG4gIGxpZ2h0Ll9ub2RlLmdldFdvcmxkUlQob3V0Vmlldyk7XG4gIE1hdDQuaW52ZXJ0KG91dFZpZXcsIG91dFZpZXcpO1xuXG4gIC8vIHByb2ogbWF0cml4XG4gIE1hdDQucGVyc3BlY3RpdmUob3V0UHJvaiwgbGlnaHQuX3Nwb3RBbmdsZSAqIGxpZ2h0Ll9zcG90QW5nbGVTY2FsZSwgMSwgbGlnaHQuX3NoYWRvd01pbkRlcHRoLCBsaWdodC5fc2hhZG93TWF4RGVwdGgpO1xufVxuXG5mdW5jdGlvbiBfY29tcHV0ZURpcmVjdGlvbmFsTGlnaHRWaWV3UHJvak1hdHJpeChsaWdodCwgb3V0Vmlldywgb3V0UHJvaikge1xuICAvLyB2aWV3IG1hdHJpeFxuICBsaWdodC5fbm9kZS5nZXRXb3JsZFJUKG91dFZpZXcpO1xuICBNYXQ0LmludmVydChvdXRWaWV3LCBvdXRWaWV3KTtcblxuICAvLyBUT0RPOiBzaG91bGQgY29tcHV0ZSBkaXJlY3Rpb25hbCBsaWdodCBmcnVzdHVtIGJhc2VkIG9uIHJlbmRlcmVkIG1lc2hlcyBpbiBzY2VuZS5cbiAgLy8gcHJvaiBtYXRyaXhcbiAgbGV0IGhhbGZTaXplID0gbGlnaHQuX3NoYWRvd0ZydXN0dW1TaXplIC8gMjtcbiAgTWF0NC5vcnRobyhvdXRQcm9qLCAtaGFsZlNpemUsIGhhbGZTaXplLCAtaGFsZlNpemUsIGhhbGZTaXplLCBsaWdodC5fc2hhZG93TWluRGVwdGgsIGxpZ2h0Ll9zaGFkb3dNYXhEZXB0aCk7XG59XG5cbmZ1bmN0aW9uIF9jb21wdXRlUG9pbnRMaWdodFZpZXdQcm9qTWF0cml4KGxpZ2h0LCBvdXRWaWV3LCBvdXRQcm9qKSB7XG4gIC8vIHZpZXcgbWF0cml4XG4gIGxpZ2h0Ll9ub2RlLmdldFdvcmxkUlQob3V0Vmlldyk7XG4gIE1hdDQuaW52ZXJ0KG91dFZpZXcsIG91dFZpZXcpO1xuXG4gIC8vIFRoZSB0cmFuc2Zvcm1hdGlvbiBmcm9tIENhcnRlc2lhbiB0byBwb2xhciBjb29yZGluYXRlcyBpcyBub3QgYSBsaW5lYXIgZnVuY3Rpb24sXG4gIC8vIHNvIGl0IGNhbm5vdCBiZSBhY2hpZXZlZCBieSBtZWFucyBvZiBhIGZpeGVkIG1hdHJpeCBtdWx0aXBsaWNhdGlvbi5cbiAgLy8gSGVyZSB3ZSBqdXN0IHVzZSBhIG5lYXJseSAxODAgZGVncmVlIHBlcnNwZWN0aXZlIG1hdHJpeCBpbnN0ZWFkLlxuICBNYXQ0LnBlcnNwZWN0aXZlKG91dFByb2osIHRvUmFkaWFuKDE3OSksIDEsIGxpZ2h0Ll9zaGFkb3dNaW5EZXB0aCwgbGlnaHQuX3NoYWRvd01heERlcHRoKTtcbn1cblxuLyoqXG4gKiBBIHJlcHJlc2VudGF0aW9uIG9mIGEgbGlnaHQgc291cmNlLlxuICogQ291bGQgYmUgYSBwb2ludCBsaWdodCwgYSBzcG90IGxpZ2h0IG9yIGEgZGlyZWN0aW9uYWwgbGlnaHQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpZ2h0IHtcbiAgLyoqXG4gICAqIFNldHVwIGEgZGVmYXVsdCBkaXJlY3Rpb25hbCBsaWdodCB3aXRoIG5vIHNoYWRvd3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3Bvb2xJRCA9IC0xO1xuICAgIHRoaXMuX25vZGUgPSBudWxsO1xuXG4gICAgdGhpcy5fdHlwZSA9IGVudW1zLkxJR0hUX0RJUkVDVElPTkFMO1xuXG4gICAgdGhpcy5fY29sb3IgPSBuZXcgVmVjMygxLCAxLCAxKTtcbiAgICB0aGlzLl9pbnRlbnNpdHkgPSAxO1xuXG4gICAgLy8gdXNlZCBmb3Igc3BvdCBhbmQgcG9pbnQgbGlnaHRcbiAgICB0aGlzLl9yYW5nZSA9IDE7XG4gICAgLy8gdXNlZCBmb3Igc3BvdCBsaWdodCwgZGVmYXVsdCB0byA2MCBkZWdyZWVzXG4gICAgdGhpcy5fc3BvdEFuZ2xlID0gdG9SYWRpYW4oNjApO1xuICAgIHRoaXMuX3Nwb3RFeHAgPSAxO1xuICAgIC8vIGNhY2hlZCBmb3IgdW5pZm9ybVxuICAgIHRoaXMuX2RpcmVjdGlvblVuaWZvcm0gPSBuZXcgRmxvYXQzMkFycmF5KDMpO1xuICAgIHRoaXMuX3Bvc2l0aW9uVW5pZm9ybSA9IG5ldyBGbG9hdDMyQXJyYXkoMyk7XG4gICAgdGhpcy5fY29sb3JVbmlmb3JtID0gbmV3IEZsb2F0MzJBcnJheShbdGhpcy5fY29sb3IueCAqIHRoaXMuX2ludGVuc2l0eSwgdGhpcy5fY29sb3IueSAqIHRoaXMuX2ludGVuc2l0eSwgdGhpcy5fY29sb3IueiAqIHRoaXMuX2ludGVuc2l0eV0pO1xuICAgIHRoaXMuX3Nwb3RVbmlmb3JtID0gbmV3IEZsb2F0MzJBcnJheShbTWF0aC5jb3ModGhpcy5fc3BvdEFuZ2xlICogMC41KSwgdGhpcy5fc3BvdEV4cF0pO1xuXG4gICAgLy8gc2hhZG93IHBhcmFtc1xuICAgIHRoaXMuX3NoYWRvd1R5cGUgPSBlbnVtcy5TSEFET1dfTk9ORTtcbiAgICB0aGlzLl9zaGFkb3dGcmFtZUJ1ZmZlciA9IG51bGw7XG4gICAgdGhpcy5fc2hhZG93TWFwID0gbnVsbDtcbiAgICB0aGlzLl9zaGFkb3dNYXBEaXJ0eSA9IGZhbHNlO1xuICAgIHRoaXMuX3NoYWRvd0RlcHRoQnVmZmVyID0gbnVsbDtcbiAgICB0aGlzLl9zaGFkb3dSZXNvbHV0aW9uID0gMTAyNDtcbiAgICB0aGlzLl9zaGFkb3dCaWFzID0gMC4wMDA1O1xuICAgIHRoaXMuX3NoYWRvd0RhcmtuZXNzID0gMTtcbiAgICB0aGlzLl9zaGFkb3dNaW5EZXB0aCA9IDE7XG4gICAgdGhpcy5fc2hhZG93TWF4RGVwdGggPSAxMDAwO1xuICAgIHRoaXMuX2ZydXN0dW1FZGdlRmFsbG9mZiA9IDA7IC8vIHVzZWQgYnkgZGlyZWN0aW9uYWwgYW5kIHNwb3QgbGlnaHQuXG4gICAgdGhpcy5fdmlld1Byb2pNYXRyaXggPSBjYy5tYXQ0KCk7XG4gICAgdGhpcy5fc3BvdEFuZ2xlU2NhbGUgPSAxOyAvLyB1c2VkIGZvciBzcG90IGxpZ2h0LlxuICAgIHRoaXMuX3NoYWRvd0ZydXN0dW1TaXplID0gNTA7IC8vIHVzZWQgZm9yIGRpcmVjdGlvbmFsIGxpZ2h0LlxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaG9zdGluZyBub2RlIG9mIHRoaXMgY2FtZXJhXG4gICAqIEByZXR1cm5zIHtOb2RlfSB0aGUgaG9zdGluZyBub2RlXG4gICAqL1xuICBnZXROb2RlKCkge1xuICAgIHJldHVybiB0aGlzLl9ub2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgaG9zdGluZyBub2RlIG9mIHRoaXMgY2FtZXJhXG4gICAqIEBwYXJhbSB7Tm9kZX0gbm9kZSB0aGUgaG9zdGluZyBub2RlXG4gICAqL1xuICBzZXROb2RlKG5vZGUpIHtcbiAgICB0aGlzLl9ub2RlID0gbm9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXQgdGhlIGNvbG9yIG9mIHRoZSBsaWdodCBzb3VyY2VcbiAgICogQHBhcmFtIHtudW1iZXJ9IHIgcmVkIGNoYW5uZWwgb2YgdGhlIGxpZ2h0IGNvbG9yXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBnIGdyZWVuIGNoYW5uZWwgb2YgdGhlIGxpZ2h0IGNvbG9yXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBiIGJsdWUgY2hhbm5lbCBvZiB0aGUgbGlnaHQgY29sb3JcbiAgICovXG4gIHNldENvbG9yKHIsIGcsIGIpIHtcbiAgICBWZWMzLnNldCh0aGlzLl9jb2xvciwgciwgZywgYik7XG4gICAgdGhpcy5fY29sb3JVbmlmb3JtWzBdID0gciAqIHRoaXMuX2ludGVuc2l0eTtcbiAgICB0aGlzLl9jb2xvclVuaWZvcm1bMV0gPSBnICogdGhpcy5faW50ZW5zaXR5O1xuICAgIHRoaXMuX2NvbG9yVW5pZm9ybVsyXSA9IGIgKiB0aGlzLl9pbnRlbnNpdHk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHRoZSBjb2xvciBvZiB0aGUgbGlnaHQgc291cmNlXG4gICAqIEByZXR1cm5zIHtWZWMzfSB0aGUgbGlnaHQgY29sb3JcbiAgICovXG4gIGdldCBjb2xvcigpIHtcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gIH1cblxuICAvKipcbiAgICogc2V0IHRoZSBpbnRlbnNpdHkgb2YgdGhlIGxpZ2h0IHNvdXJjZVxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsIHRoZSBsaWdodCBpbnRlbnNpdHlcbiAgICovXG4gIHNldEludGVuc2l0eSh2YWwpIHtcbiAgICB0aGlzLl9pbnRlbnNpdHkgPSB2YWw7XG4gICAgdGhpcy5fY29sb3JVbmlmb3JtWzBdID0gdmFsICogdGhpcy5fY29sb3IueDtcbiAgICB0aGlzLl9jb2xvclVuaWZvcm1bMV0gPSB2YWwgKiB0aGlzLl9jb2xvci55O1xuICAgIHRoaXMuX2NvbG9yVW5pZm9ybVsyXSA9IHZhbCAqIHRoaXMuX2NvbG9yLno7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHRoZSBpbnRlbnNpdHkgb2YgdGhlIGxpZ2h0IHNvdXJjZVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgbGlnaHQgaW50ZW5zaXR5XG4gICAqL1xuICBnZXQgaW50ZW5zaXR5KCkge1xuICAgIHJldHVybiB0aGlzLl9pbnRlbnNpdHk7XG4gIH1cblxuICAvKipcbiAgICogc2V0IHRoZSB0eXBlIG9mIHRoZSBsaWdodCBzb3VyY2VcbiAgICogQHBhcmFtIHtudW1iZXJ9IHR5cGUgbGlnaHQgc291cmNlIHR5cGVcbiAgICovXG4gIHNldFR5cGUodHlwZSkge1xuICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCB0aGUgdHlwZSBvZiB0aGUgbGlnaHQgc291cmNlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGxpZ2h0IHNvdXJjZSB0eXBlXG4gICAqL1xuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXQgdGhlIHNwb3QgbGlnaHQgYW5nbGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbCBzcG90IGxpZ2h0IGFuZ2xlXG4gICAqL1xuICBzZXRTcG90QW5nbGUodmFsKSB7XG4gICAgdGhpcy5fc3BvdEFuZ2xlID0gdmFsO1xuICAgIHRoaXMuX3Nwb3RVbmlmb3JtWzBdID0gTWF0aC5jb3ModGhpcy5fc3BvdEFuZ2xlICogMC41KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIHNwb3QgbGlnaHQgYW5nbGVcbiAgICogQHJldHVybnMge251bWJlcn0gc3BvdCBsaWdodCBhbmdsZVxuICAgKi9cbiAgZ2V0IHNwb3RBbmdsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3BvdEFuZ2xlO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldCB0aGUgc3BvdCBsaWdodCBleHBvbmVudGlhbFxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsIHNwb3QgbGlnaHQgZXhwb25lbnRpYWxcbiAgICovXG4gIHNldFNwb3RFeHAodmFsKSB7XG4gICAgdGhpcy5fc3BvdEV4cCA9IHZhbDtcbiAgICB0aGlzLl9zcG90VW5pZm9ybVsxXSA9IHZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIHNwb3QgbGlnaHQgZXhwb25lbnRpYWxcbiAgICogQHJldHVybnMge251bWJlcn0gc3BvdCBsaWdodCBleHBvbmVudGlhbFxuICAgKi9cbiAgZ2V0IHNwb3RFeHAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Nwb3RFeHA7XG4gIH1cblxuICAvKipcbiAgICogc2V0IHRoZSByYW5nZSBvZiB0aGUgbGlnaHQgc291cmNlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgbGlnaHQgc291cmNlIHJhbmdlXG4gICAqL1xuICBzZXRSYW5nZSh2YWwpIHtcbiAgICB0aGlzLl9yYW5nZSA9IHZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIHJhbmdlIG9mIHRoZSBsaWdodCBzb3VyY2VcbiAgICogQHJldHVybnMge251bWJlcn0gcmFuZ2Ugb2YgdGhlIGxpZ2h0IHNvdXJjZVxuICAgKi9cbiAgZ2V0IHJhbmdlKCkge1xuICAgIHJldHVybiB0aGlzLl9yYW5nZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXQgdGhlIHNoYWRvdyB0eXBlIG9mIHRoZSBsaWdodCBzb3VyY2VcbiAgICogQHBhcmFtIHtudW1iZXJ9IHR5cGUgbGlnaHQgc291cmNlIHNoYWRvdyB0eXBlXG4gICAqL1xuICBzZXRTaGFkb3dUeXBlKHR5cGUpIHtcbiAgICBpZiAodGhpcy5fc2hhZG93VHlwZSA9PT0gZW51bXMuU0hBRE9XX05PTkUgJiYgdHlwZSAhPT0gZW51bXMuU0hBRE9XX05PTkUpIHtcbiAgICAgIHRoaXMuX3NoYWRvd01hcERpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5fc2hhZG93VHlwZSA9IHR5cGU7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHRoZSBzaGFkb3cgdHlwZSBvZiB0aGUgbGlnaHQgc291cmNlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGxpZ2h0IHNvdXJjZSBzaGFkb3cgdHlwZVxuICAgKi9cbiAgZ2V0IHNoYWRvd1R5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NoYWRvd1R5cGU7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHRoZSBzaGFkb3dtYXAgb2YgdGhlIGxpZ2h0IHNvdXJjZVxuICAgKiBAcmV0dXJucyB7VGV4dHVyZTJEfSBsaWdodCBzb3VyY2Ugc2hhZG93bWFwXG4gICAqL1xuICBnZXQgc2hhZG93TWFwKCkge1xuICAgIHJldHVybiB0aGlzLl9zaGFkb3dNYXA7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHRoZSB2aWV3LXByb2plY3Rpb24gbWF0cml4IG9mIHRoZSBsaWdodCBzb3VyY2VcbiAgICogQHJldHVybnMge01hdDR9IGxpZ2h0IHNvdXJjZSB2aWV3LXByb2plY3Rpb24gbWF0cml4XG4gICAqL1xuICBnZXQgdmlld1Byb2pNYXRyaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdQcm9qTWF0cml4O1xuICB9XG5cbiAgLyoqXG4gICAqIHNldCB0aGUgc2hhZG93IHJlc29sdXRpb24gb2YgdGhlIGxpZ2h0IHNvdXJjZVxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsIGxpZ2h0IHNvdXJjZSBzaGFkb3cgcmVzb2x1dGlvblxuICAgKi9cbiAgc2V0U2hhZG93UmVzb2x1dGlvbih2YWwpIHtcbiAgICBpZiAodGhpcy5fc2hhZG93UmVzb2x1dGlvbiAhPT0gdmFsKSB7XG4gICAgICB0aGlzLl9zaGFkb3dNYXBEaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuX3NoYWRvd1Jlc29sdXRpb24gPSB2YWw7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHRoZSBzaGFkb3cgcmVzb2x1dGlvbiBvZiB0aGUgbGlnaHQgc291cmNlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGxpZ2h0IHNvdXJjZSBzaGFkb3cgcmVzb2x1dGlvblxuICAgKi9cbiAgZ2V0IHNoYWRvd1Jlc29sdXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NoYWRvd1Jlc29sdXRpb247XG4gIH1cblxuICAvKipcbiAgICogc2V0IHRoZSBzaGFkb3cgYmlhcyBvZiB0aGUgbGlnaHQgc291cmNlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgbGlnaHQgc291cmNlIHNoYWRvdyBiaWFzXG4gICAqL1xuICBzZXRTaGFkb3dCaWFzKHZhbCkge1xuICAgIHRoaXMuX3NoYWRvd0JpYXMgPSB2YWw7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHRoZSBzaGFkb3cgYmlhcyBvZiB0aGUgbGlnaHQgc291cmNlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGxpZ2h0IHNvdXJjZSBzaGFkb3cgYmlhc1xuICAgKi9cbiAgZ2V0IHNoYWRvd0JpYXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NoYWRvd0JpYXM7XG4gIH1cblxuICAvKipcbiAgICogc2V0IHRoZSBzaGFkb3cgZGFya25lc3Mgb2YgdGhlIGxpZ2h0IHNvdXJjZVxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsIGxpZ2h0IHNvdXJjZSBzaGFkb3cgZGFya25lc3NcbiAgICovXG4gIHNldFNoYWRvd0RhcmtuZXNzKHZhbCkge1xuICAgIHRoaXMuX3NoYWRvd0RhcmtuZXNzID0gdmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCB0aGUgc2hhZG93IGRhcmtuZXNzIG9mIHRoZSBsaWdodCBzb3VyY2VcbiAgICogQHJldHVybnMge251bWJlcn0gbGlnaHQgc291cmNlIHNoYWRvdyBkYXJrbmVzc1xuICAgKi9cbiAgZ2V0IHNoYWRvd0RhcmtuZXNzKCkge1xuICAgIHJldHVybiB0aGlzLl9zaGFkb3dEYXJrbmVzcztcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXQgdGhlIHNoYWRvdyBtaW4gZGVwdGggb2YgdGhlIGxpZ2h0IHNvdXJjZVxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsIGxpZ2h0IHNvdXJjZSBzaGFkb3cgbWluIGRlcHRoXG4gICAqL1xuICBzZXRTaGFkb3dNaW5EZXB0aCh2YWwpIHtcbiAgICB0aGlzLl9zaGFkb3dNaW5EZXB0aCA9IHZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIHNoYWRvdyBtaW4gZGVwdGggb2YgdGhlIGxpZ2h0IHNvdXJjZVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBsaWdodCBzb3VyY2Ugc2hhZG93IG1pbiBkZXB0aFxuICAgKi9cbiAgZ2V0IHNoYWRvd01pbkRlcHRoKCkge1xuICAgIGlmICh0aGlzLl90eXBlID09PSBlbnVtcy5MSUdIVF9ESVJFQ1RJT05BTCkge1xuICAgICAgcmV0dXJuIDEuMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3NoYWRvd01pbkRlcHRoO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldCB0aGUgc2hhZG93IG1heCBkZXB0aCBvZiB0aGUgbGlnaHQgc291cmNlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgbGlnaHQgc291cmNlIHNoYWRvdyBtYXggZGVwdGhcbiAgICovXG4gIHNldFNoYWRvd01heERlcHRoKHZhbCkge1xuICAgIHRoaXMuX3NoYWRvd01heERlcHRoID0gdmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCB0aGUgc2hhZG93IG1heCBkZXB0aCBvZiB0aGUgbGlnaHQgc291cmNlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGxpZ2h0IHNvdXJjZSBzaGFkb3cgbWF4IGRlcHRoXG4gICAqL1xuICBnZXQgc2hhZG93TWF4RGVwdGgoKSB7XG4gICAgaWYgKHRoaXMuX3R5cGUgPT09IGVudW1zLkxJR0hUX0RJUkVDVElPTkFMKSB7XG4gICAgICByZXR1cm4gMS4wO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fc2hhZG93TWF4RGVwdGg7XG4gIH1cblxuICAvKipcbiAgICogc2V0IHRoZSBmcnVzdHVtIGVkZ2UgZmFsbG9mZiBvZiB0aGUgbGlnaHQgc291cmNlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgbGlnaHQgc291cmNlIGZydXN0dW0gZWRnZSBmYWxsb2ZmXG4gICAqL1xuICBzZXRGcnVzdHVtRWRnZUZhbGxvZmYodmFsKSB7XG4gICAgdGhpcy5fZnJ1c3R1bUVkZ2VGYWxsb2ZmID0gdmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCB0aGUgZnJ1c3R1bSBlZGdlIGZhbGxvZmYgb2YgdGhlIGxpZ2h0IHNvdXJjZVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBsaWdodCBzb3VyY2UgZnJ1c3R1bSBlZGdlIGZhbGxvZmZcbiAgICovXG4gIGdldCBmcnVzdHVtRWRnZUZhbGxvZmYoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZydXN0dW1FZGdlRmFsbG9mZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXQgdGhlIHNoYWRvdyBmcnVzdHVtIHNpemUgb2YgdGhlIGxpZ2h0IHNvdXJjZVxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsIGxpZ2h0IHNvdXJjZSBzaGFkb3cgZnJ1c3R1bSBzaXplXG4gICAqL1xuICBzZXRTaGFkb3dGcnVzdHVtU2l6ZSh2YWwpIHtcbiAgICB0aGlzLl9zaGFkb3dGcnVzdHVtU2l6ZSA9IHZhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIHNoYWRvdyBmcnVzdHVtIHNpemUgb2YgdGhlIGxpZ2h0IHNvdXJjZVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBsaWdodCBzb3VyY2Ugc2hhZG93IGZydXN0dW0gc2l6ZVxuICAgKi9cbiAgZ2V0IHNoYWRvd0ZydXN0dW1TaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9zaGFkb3dGcnVzdHVtU2l6ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBleHRyYWN0IGEgdmlldyBvZiB0aGlzIGxpZ2h0IHNvdXJjZVxuICAgKiBAcGFyYW0ge1ZpZXd9IG91dCB0aGUgcmVjZWl2aW5nIHZpZXdcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gc3RhZ2VzIHRoZSBzdGFnZXMgdXNpbmcgdGhlIHZpZXdcbiAgICovXG4gIGV4dHJhY3RWaWV3KG91dCwgc3RhZ2VzKSB7XG4gICAgLy8gVE9ETzogdmlldyBzaG91bGQgbm90IGhhbmRsZSBsaWdodC5cbiAgICBvdXQuX3NoYWRvd0xpZ2h0ID0gdGhpcztcblxuICAgIC8vIHByaW9yaXR5LiBUT0RPOiB1c2UgdmFyeWluZyB2YWx1ZSBmb3Igc2hhZG93IHZpZXc/XG4gICAgb3V0Ll9wcmlvcml0eSA9IC0xO1xuXG4gICAgLy8gcmVjdFxuICAgIG91dC5fcmVjdC54ID0gMDtcbiAgICBvdXQuX3JlY3QueSA9IDA7XG4gICAgb3V0Ll9yZWN0LncgPSB0aGlzLl9zaGFkb3dSZXNvbHV0aW9uO1xuICAgIG91dC5fcmVjdC5oID0gdGhpcy5fc2hhZG93UmVzb2x1dGlvbjtcblxuICAgIC8vIGNsZWFyIG9wdHNcbiAgICBWZWMzLnNldChvdXQuX2NvbG9yLCAxLCAxLCAxKTtcbiAgICBvdXQuX2RlcHRoID0gMTtcbiAgICBvdXQuX3N0ZW5jaWwgPSAxO1xuICAgIG91dC5fY2xlYXJGbGFncyA9IGVudW1zLkNMRUFSX0NPTE9SIHwgZW51bXMuQ0xFQVJfREVQVEg7XG5cbiAgICAvLyBzdGFnZXMgJiBmcmFtZWJ1ZmZlclxuICAgIG91dC5fc3RhZ2VzID0gc3RhZ2VzO1xuICAgIG91dC5fZnJhbWVidWZmZXIgPSB0aGlzLl9zaGFkb3dGcmFtZUJ1ZmZlcjtcblxuICAgIC8vIHZpZXcgcHJvamVjdGlvbiBtYXRyaXhcbiAgICBzd2l0Y2godGhpcy5fdHlwZSkge1xuICAgICAgY2FzZSBlbnVtcy5MSUdIVF9TUE9UOlxuICAgICAgICBfY29tcHV0ZVNwb3RMaWdodFZpZXdQcm9qTWF0cml4KHRoaXMsIG91dC5fbWF0Vmlldywgb3V0Ll9tYXRQcm9qKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgZW51bXMuTElHSFRfRElSRUNUSU9OQUw6XG4gICAgICAgIF9jb21wdXRlRGlyZWN0aW9uYWxMaWdodFZpZXdQcm9qTWF0cml4KHRoaXMsIG91dC5fbWF0Vmlldywgb3V0Ll9tYXRQcm9qKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgZW51bXMuTElHSFRfUE9JTlQ6XG4gICAgICAgIF9jb21wdXRlUG9pbnRMaWdodFZpZXdQcm9qTWF0cml4KHRoaXMsIG91dC5fbWF0Vmlldywgb3V0Ll9tYXRQcm9qKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGVudW1zLkxJR0hUX0FNQklFTlQ6XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKCdzaGFkb3cgb2YgdGhpcyBsaWdodCB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICB9XG5cbiAgICAvLyB2aWV3LXByb2plY3Rpb25cbiAgICBNYXQ0Lm11bChvdXQuX21hdFZpZXdQcm9qLCBvdXQuX21hdFByb2osIG91dC5fbWF0Vmlldyk7XG4gICAgdGhpcy5fdmlld1Byb2pNYXRyaXggPSBvdXQuX21hdFZpZXdQcm9qO1xuICAgIE1hdDQuaW52ZXJ0KG91dC5fbWF0SW52Vmlld1Byb2osIG91dC5fbWF0Vmlld1Byb2opO1xuXG4gICAgLy8gdXBkYXRlIHZpZXcncyBmcnVzdHVtXG4gICAgLy8gb3V0Ll9mcnVzdHVtLnVwZGF0ZShvdXQuX21hdFZpZXdQcm9qLCBvdXQuX21hdEludlZpZXdQcm9qKTtcblxuICAgIG91dC5fY3VsbGluZ01hc2sgPSAweGZmZmZmZmZmO1xuICB9XG5cbiAgX3VwZGF0ZUxpZ2h0UG9zaXRpb25BbmREaXJlY3Rpb24oKSB7XG4gICAgdGhpcy5fbm9kZS5nZXRXb3JsZE1hdHJpeChfbTRfdG1wKTtcbiAgICBNYXQzLmZyb21NYXQ0KF9tM190bXAsIF9tNF90bXApO1xuICAgIFZlYzMudHJhbnNmb3JtTWF0MyhfdHJhbnNmb3JtZWRMaWdodERpcmVjdGlvbiwgX2ZvcndhcmQsIF9tM190bXApO1xuICAgIFZlYzMudG9BcnJheSh0aGlzLl9kaXJlY3Rpb25Vbmlmb3JtLCBfdHJhbnNmb3JtZWRMaWdodERpcmVjdGlvbik7XG4gICAgbGV0IHBvcyA9IHRoaXMuX3Bvc2l0aW9uVW5pZm9ybTtcbiAgICBsZXQgbSA9IF9tNF90bXAubTtcbiAgICBwb3NbMF0gPSBtWzEyXTtcbiAgICBwb3NbMV0gPSBtWzEzXTtcbiAgICBwb3NbMl0gPSBtWzE0XTtcbiAgfVxuXG4gIF9nZW5lcmF0ZVNoYWRvd01hcChkZXZpY2UpIHtcbiAgICB0aGlzLl9zaGFkb3dNYXAgPSBuZXcgZ2Z4LlRleHR1cmUyRChkZXZpY2UsIHtcbiAgICAgIHdpZHRoOiB0aGlzLl9zaGFkb3dSZXNvbHV0aW9uLFxuICAgICAgaGVpZ2h0OiB0aGlzLl9zaGFkb3dSZXNvbHV0aW9uLFxuICAgICAgZm9ybWF0OiBnZnguVEVYVFVSRV9GTVRfUkdCQTgsXG4gICAgICB3cmFwUzogZ2Z4LldSQVBfQ0xBTVAsXG4gICAgICB3cmFwVDogZ2Z4LldSQVBfQ0xBTVAsXG4gICAgfSk7XG4gICAgdGhpcy5fc2hhZG93RGVwdGhCdWZmZXIgPSBuZXcgZ2Z4LlJlbmRlckJ1ZmZlcihkZXZpY2UsXG4gICAgICBnZnguUkJfRk1UX0QxNixcbiAgICAgIHRoaXMuX3NoYWRvd1Jlc29sdXRpb24sXG4gICAgICB0aGlzLl9zaGFkb3dSZXNvbHV0aW9uXG4gICAgKTtcbiAgICB0aGlzLl9zaGFkb3dGcmFtZUJ1ZmZlciA9IG5ldyBnZnguRnJhbWVCdWZmZXIoZGV2aWNlLCB0aGlzLl9zaGFkb3dSZXNvbHV0aW9uLCB0aGlzLl9zaGFkb3dSZXNvbHV0aW9uLCB7XG4gICAgICBjb2xvcnM6IFt0aGlzLl9zaGFkb3dNYXBdLFxuICAgICAgZGVwdGg6IHRoaXMuX3NoYWRvd0RlcHRoQnVmZmVyLFxuICAgIH0pO1xuICB9XG5cbiAgX2Rlc3Ryb3lTaGFkb3dNYXAoKSB7XG4gICAgaWYgKHRoaXMuX3NoYWRvd01hcCkge1xuICAgICAgdGhpcy5fc2hhZG93TWFwLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX3NoYWRvd0RlcHRoQnVmZmVyLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX3NoYWRvd0ZyYW1lQnVmZmVyLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX3NoYWRvd01hcCA9IG51bGw7XG4gICAgICB0aGlzLl9zaGFkb3dEZXB0aEJ1ZmZlciA9IG51bGw7XG4gICAgICB0aGlzLl9zaGFkb3dGcmFtZUJ1ZmZlciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSB0aGUgbGlnaHQgc291cmNlXG4gICAqIEBwYXJhbSB7RGV2aWNlfSBkZXZpY2UgdGhlIHJlbmRlcmluZyBkZXZpY2VcbiAgICovXG4gIHVwZGF0ZShkZXZpY2UpIHtcbiAgICB0aGlzLl91cGRhdGVMaWdodFBvc2l0aW9uQW5kRGlyZWN0aW9uKCk7XG5cbiAgICBpZiAodGhpcy5fc2hhZG93VHlwZSA9PT0gZW51bXMuU0hBRE9XX05PTkUpIHtcbiAgICAgIHRoaXMuX2Rlc3Ryb3lTaGFkb3dNYXAoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NoYWRvd01hcERpcnR5KSB7XG4gICAgICB0aGlzLl9kZXN0cm95U2hhZG93TWFwKCk7XG4gICAgICB0aGlzLl9nZW5lcmF0ZVNoYWRvd01hcChkZXZpY2UpO1xuICAgICAgdGhpcy5fc2hhZG93TWFwRGlydHkgPSBmYWxzZTtcbiAgICB9XG5cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=