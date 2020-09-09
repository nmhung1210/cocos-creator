
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/device.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _state = _interopRequireDefault(require("./state"));

var _enums = require("./enums");

var _texture2d = _interopRequireDefault(require("./texture-2d"));

var _textureCube = _interopRequireDefault(require("./texture-cube"));

var _type2uniformCommit2, _type2uniformArrayCom;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GL_INT = 5124;
var GL_FLOAT = 5126;
var GL_FLOAT_VEC2 = 35664;
var GL_FLOAT_VEC3 = 35665;
var GL_FLOAT_VEC4 = 35666;
var GL_INT_VEC2 = 35667;
var GL_INT_VEC3 = 35668;
var GL_INT_VEC4 = 35669;
var GL_BOOL = 35670;
var GL_BOOL_VEC2 = 35671;
var GL_BOOL_VEC3 = 35672;
var GL_BOOL_VEC4 = 35673;
var GL_FLOAT_MAT2 = 35674;
var GL_FLOAT_MAT3 = 35675;
var GL_FLOAT_MAT4 = 35676;
var GL_SAMPLER_2D = 35678;
var GL_SAMPLER_CUBE = 35680;
/**
 * _type2uniformCommit
 */

var _type2uniformCommit = (_type2uniformCommit2 = {}, _type2uniformCommit2[GL_INT] = function (gl, id, value) {
  gl.uniform1i(id, value);
}, _type2uniformCommit2[GL_FLOAT] = function (gl, id, value) {
  gl.uniform1f(id, value);
}, _type2uniformCommit2[GL_FLOAT_VEC2] = function (gl, id, value) {
  gl.uniform2fv(id, value);
}, _type2uniformCommit2[GL_FLOAT_VEC3] = function (gl, id, value) {
  gl.uniform3fv(id, value);
}, _type2uniformCommit2[GL_FLOAT_VEC4] = function (gl, id, value) {
  gl.uniform4fv(id, value);
}, _type2uniformCommit2[GL_INT_VEC2] = function (gl, id, value) {
  gl.uniform2iv(id, value);
}, _type2uniformCommit2[GL_INT_VEC3] = function (gl, id, value) {
  gl.uniform3iv(id, value);
}, _type2uniformCommit2[GL_INT_VEC4] = function (gl, id, value) {
  gl.uniform4iv(id, value);
}, _type2uniformCommit2[GL_BOOL] = function (gl, id, value) {
  gl.uniform1i(id, value);
}, _type2uniformCommit2[GL_BOOL_VEC2] = function (gl, id, value) {
  gl.uniform2iv(id, value);
}, _type2uniformCommit2[GL_BOOL_VEC3] = function (gl, id, value) {
  gl.uniform3iv(id, value);
}, _type2uniformCommit2[GL_BOOL_VEC4] = function (gl, id, value) {
  gl.uniform4iv(id, value);
}, _type2uniformCommit2[GL_FLOAT_MAT2] = function (gl, id, value) {
  gl.uniformMatrix2fv(id, false, value);
}, _type2uniformCommit2[GL_FLOAT_MAT3] = function (gl, id, value) {
  gl.uniformMatrix3fv(id, false, value);
}, _type2uniformCommit2[GL_FLOAT_MAT4] = function (gl, id, value) {
  gl.uniformMatrix4fv(id, false, value);
}, _type2uniformCommit2[GL_SAMPLER_2D] = function (gl, id, value) {
  gl.uniform1i(id, value);
}, _type2uniformCommit2[GL_SAMPLER_CUBE] = function (gl, id, value) {
  gl.uniform1i(id, value);
}, _type2uniformCommit2);
/**
 * _type2uniformArrayCommit
 */


var _type2uniformArrayCommit = (_type2uniformArrayCom = {}, _type2uniformArrayCom[GL_INT] = function (gl, id, value) {
  gl.uniform1iv(id, value);
}, _type2uniformArrayCom[GL_FLOAT] = function (gl, id, value) {
  gl.uniform1fv(id, value);
}, _type2uniformArrayCom[GL_FLOAT_VEC2] = function (gl, id, value) {
  gl.uniform2fv(id, value);
}, _type2uniformArrayCom[GL_FLOAT_VEC3] = function (gl, id, value) {
  gl.uniform3fv(id, value);
}, _type2uniformArrayCom[GL_FLOAT_VEC4] = function (gl, id, value) {
  gl.uniform4fv(id, value);
}, _type2uniformArrayCom[GL_INT_VEC2] = function (gl, id, value) {
  gl.uniform2iv(id, value);
}, _type2uniformArrayCom[GL_INT_VEC3] = function (gl, id, value) {
  gl.uniform3iv(id, value);
}, _type2uniformArrayCom[GL_INT_VEC4] = function (gl, id, value) {
  gl.uniform4iv(id, value);
}, _type2uniformArrayCom[GL_BOOL] = function (gl, id, value) {
  gl.uniform1iv(id, value);
}, _type2uniformArrayCom[GL_BOOL_VEC2] = function (gl, id, value) {
  gl.uniform2iv(id, value);
}, _type2uniformArrayCom[GL_BOOL_VEC3] = function (gl, id, value) {
  gl.uniform3iv(id, value);
}, _type2uniformArrayCom[GL_BOOL_VEC4] = function (gl, id, value) {
  gl.uniform4iv(id, value);
}, _type2uniformArrayCom[GL_FLOAT_MAT2] = function (gl, id, value) {
  gl.uniformMatrix2fv(id, false, value);
}, _type2uniformArrayCom[GL_FLOAT_MAT3] = function (gl, id, value) {
  gl.uniformMatrix3fv(id, false, value);
}, _type2uniformArrayCom[GL_FLOAT_MAT4] = function (gl, id, value) {
  gl.uniformMatrix4fv(id, false, value);
}, _type2uniformArrayCom[GL_SAMPLER_2D] = function (gl, id, value) {
  gl.uniform1iv(id, value);
}, _type2uniformArrayCom[GL_SAMPLER_CUBE] = function (gl, id, value) {
  gl.uniform1iv(id, value);
}, _type2uniformArrayCom);
/**
 * _commitBlendStates
 */


function _commitBlendStates(gl, cur, next) {
  // enable/disable blend
  if (cur.blend !== next.blend) {
    if (!next.blend) {
      gl.disable(gl.BLEND);
      return;
    }

    gl.enable(gl.BLEND);

    if (next.blendSrc === _enums.enums.BLEND_CONSTANT_COLOR || next.blendSrc === _enums.enums.BLEND_ONE_MINUS_CONSTANT_COLOR || next.blendDst === _enums.enums.BLEND_CONSTANT_COLOR || next.blendDst === _enums.enums.BLEND_ONE_MINUS_CONSTANT_COLOR) {
      gl.blendColor((next.blendColor >> 24) / 255, (next.blendColor >> 16 & 0xff) / 255, (next.blendColor >> 8 & 0xff) / 255, (next.blendColor & 0xff) / 255);
    }

    if (next.blendSep) {
      gl.blendFuncSeparate(next.blendSrc, next.blendDst, next.blendSrcAlpha, next.blendDstAlpha);
      gl.blendEquationSeparate(next.blendEq, next.blendAlphaEq);
    } else {
      gl.blendFunc(next.blendSrc, next.blendDst);
      gl.blendEquation(next.blendEq);
    }

    return;
  } // nothing to update


  if (next.blend === false) {
    return;
  } // blend-color


  if (cur.blendColor !== next.blendColor) {
    gl.blendColor((next.blendColor >> 24) / 255, (next.blendColor >> 16 & 0xff) / 255, (next.blendColor >> 8 & 0xff) / 255, (next.blendColor & 0xff) / 255);
  } // separate diff, reset all


  if (cur.blendSep !== next.blendSep) {
    if (next.blendSep) {
      gl.blendFuncSeparate(next.blendSrc, next.blendDst, next.blendSrcAlpha, next.blendDstAlpha);
      gl.blendEquationSeparate(next.blendEq, next.blendAlphaEq);
    } else {
      gl.blendFunc(next.blendSrc, next.blendDst);
      gl.blendEquation(next.blendEq);
    }

    return;
  }

  if (next.blendSep) {
    // blend-func-separate
    if (cur.blendSrc !== next.blendSrc || cur.blendDst !== next.blendDst || cur.blendSrcAlpha !== next.blendSrcAlpha || cur.blendDstAlpha !== next.blendDstAlpha) {
      gl.blendFuncSeparate(next.blendSrc, next.blendDst, next.blendSrcAlpha, next.blendDstAlpha);
    } // blend-equation-separate


    if (cur.blendEq !== next.blendEq || cur.blendAlphaEq !== next.blendAlphaEq) {
      gl.blendEquationSeparate(next.blendEq, next.blendAlphaEq);
    }
  } else {
    // blend-func
    if (cur.blendSrc !== next.blendSrc || cur.blendDst !== next.blendDst) {
      gl.blendFunc(next.blendSrc, next.blendDst);
    } // blend-equation


    if (cur.blendEq !== next.blendEq) {
      gl.blendEquation(next.blendEq);
    }
  }
}
/**
 * _commitDepthStates
 */


function _commitDepthStates(gl, cur, next) {
  // enable/disable depth-test
  if (cur.depthTest !== next.depthTest) {
    if (!next.depthTest) {
      gl.disable(gl.DEPTH_TEST);
      return;
    }

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(next.depthFunc);
    gl.depthMask(next.depthWrite);
    return;
  } // commit depth-write


  if (cur.depthWrite !== next.depthWrite) {
    gl.depthMask(next.depthWrite);
  } // check if depth-write enabled


  if (next.depthTest === false) {
    if (next.depthWrite) {
      next.depthTest = true;
      next.depthFunc = _enums.enums.DS_FUNC_ALWAYS;
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(next.depthFunc);
    }

    return;
  } // depth-func


  if (cur.depthFunc !== next.depthFunc) {
    gl.depthFunc(next.depthFunc);
  }
}
/**
 * _commitStencilStates
 */


function _commitStencilStates(gl, cur, next) {
  // inherit stencil states
  if (next.stencilTest === _enums.enums.STENCIL_INHERIT) {
    return;
  }

  if (next.stencilTest !== cur.stencilTest) {
    if (next.stencilTest === _enums.enums.STENCIL_DISABLE) {
      gl.disable(gl.STENCIL_TEST);
      return;
    }

    gl.enable(gl.STENCIL_TEST);

    if (next.stencilSep) {
      gl.stencilFuncSeparate(gl.FRONT, next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
      gl.stencilMaskSeparate(gl.FRONT, next.stencilWriteMaskFront);
      gl.stencilOpSeparate(gl.FRONT, next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
      gl.stencilFuncSeparate(gl.BACK, next.stencilFuncBack, next.stencilRefBack, next.stencilMaskBack);
      gl.stencilMaskSeparate(gl.BACK, next.stencilWriteMaskBack);
      gl.stencilOpSeparate(gl.BACK, next.stencilFailOpBack, next.stencilZFailOpBack, next.stencilZPassOpBack);
    } else {
      gl.stencilFunc(next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
      gl.stencilMask(next.stencilWriteMaskFront);
      gl.stencilOp(next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
    }

    return;
  } // fast return


  if (next.stencilTest === _enums.enums.STENCIL_DISABLE) {
    return;
  }

  if (cur.stencilSep !== next.stencilSep) {
    if (next.stencilSep) {
      gl.stencilFuncSeparate(gl.FRONT, next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
      gl.stencilMaskSeparate(gl.FRONT, next.stencilWriteMaskFront);
      gl.stencilOpSeparate(gl.FRONT, next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
      gl.stencilFuncSeparate(gl.BACK, next.stencilFuncBack, next.stencilRefBack, next.stencilMaskBack);
      gl.stencilMaskSeparate(gl.BACK, next.stencilWriteMaskBack);
      gl.stencilOpSeparate(gl.BACK, next.stencilFailOpBack, next.stencilZFailOpBack, next.stencilZPassOpBack);
    } else {
      gl.stencilFunc(next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
      gl.stencilMask(next.stencilWriteMaskFront);
      gl.stencilOp(next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
    }

    return;
  }

  if (next.stencilSep) {
    // front
    if (cur.stencilFuncFront !== next.stencilFuncFront || cur.stencilRefFront !== next.stencilRefFront || cur.stencilMaskFront !== next.stencilMaskFront) {
      gl.stencilFuncSeparate(gl.FRONT, next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
    }

    if (cur.stencilWriteMaskFront !== next.stencilWriteMaskFront) {
      gl.stencilMaskSeparate(gl.FRONT, next.stencilWriteMaskFront);
    }

    if (cur.stencilFailOpFront !== next.stencilFailOpFront || cur.stencilZFailOpFront !== next.stencilZFailOpFront || cur.stencilZPassOpFront !== next.stencilZPassOpFront) {
      gl.stencilOpSeparate(gl.FRONT, next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
    } // back


    if (cur.stencilFuncBack !== next.stencilFuncBack || cur.stencilRefBack !== next.stencilRefBack || cur.stencilMaskBack !== next.stencilMaskBack) {
      gl.stencilFuncSeparate(gl.BACK, next.stencilFuncBack, next.stencilRefBack, next.stencilMaskBack);
    }

    if (cur.stencilWriteMaskBack !== next.stencilWriteMaskBack) {
      gl.stencilMaskSeparate(gl.BACK, next.stencilWriteMaskBack);
    }

    if (cur.stencilFailOpBack !== next.stencilFailOpBack || cur.stencilZFailOpBack !== next.stencilZFailOpBack || cur.stencilZPassOpBack !== next.stencilZPassOpBack) {
      gl.stencilOpSeparate(gl.BACK, next.stencilFailOpBack, next.stencilZFailOpBack, next.stencilZPassOpBack);
    }
  } else {
    if (cur.stencilFuncFront !== next.stencilFuncFront || cur.stencilRefFront !== next.stencilRefFront || cur.stencilMaskFront !== next.stencilMaskFront) {
      gl.stencilFunc(next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
    }

    if (cur.stencilWriteMaskFront !== next.stencilWriteMaskFront) {
      gl.stencilMask(next.stencilWriteMaskFront);
    }

    if (cur.stencilFailOpFront !== next.stencilFailOpFront || cur.stencilZFailOpFront !== next.stencilZFailOpFront || cur.stencilZPassOpFront !== next.stencilZPassOpFront) {
      gl.stencilOp(next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
    }
  }
}
/**
 * _commitCullMode
 */


function _commitCullMode(gl, cur, next) {
  if (cur.cullMode === next.cullMode) {
    return;
  }

  if (next.cullMode === _enums.enums.CULL_NONE) {
    gl.disable(gl.CULL_FACE);
    return;
  }

  gl.enable(gl.CULL_FACE);
  gl.cullFace(next.cullMode);
}
/**
 * _commitVertexBuffers
 */


function _commitVertexBuffers(device, gl, cur, next) {
  var attrsDirty = false; // nothing changed for vertex buffer

  if (next.maxStream === -1) {
    return;
  }

  if (cur.maxStream !== next.maxStream) {
    attrsDirty = true;
  } else if (cur.program !== next.program) {
    attrsDirty = true;
  } else {
    for (var i = 0; i < next.maxStream + 1; ++i) {
      if (cur.vertexBuffers[i] !== next.vertexBuffers[i] || cur.vertexBufferOffsets[i] !== next.vertexBufferOffsets[i]) {
        attrsDirty = true;
        break;
      }
    }
  }

  if (attrsDirty) {
    for (var _i = 0; _i < device._caps.maxVertexAttribs; ++_i) {
      device._newAttributes[_i] = 0;
    }

    for (var _i2 = 0; _i2 < next.maxStream + 1; ++_i2) {
      var vb = next.vertexBuffers[_i2];
      var vbOffset = next.vertexBufferOffsets[_i2];

      if (!vb || vb._glID === -1) {
        continue;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, vb._glID);

      for (var j = 0; j < next.program._attributes.length; ++j) {
        var attr = next.program._attributes[j];

        var el = vb._format.element(attr.name);

        if (!el) {
          console.warn("Can not find vertex attribute: " + attr.name);
          continue;
        }

        if (device._enabledAttributes[attr.location] === 0) {
          gl.enableVertexAttribArray(attr.location);
          device._enabledAttributes[attr.location] = 1;
        }

        device._newAttributes[attr.location] = 1;
        gl.vertexAttribPointer(attr.location, el.num, el.type, el.normalize, el.stride, el.offset + vbOffset * el.stride);
      }
    } // disable unused attributes


    for (var _i3 = 0; _i3 < device._caps.maxVertexAttribs; ++_i3) {
      if (device._enabledAttributes[_i3] !== device._newAttributes[_i3]) {
        gl.disableVertexAttribArray(_i3);
        device._enabledAttributes[_i3] = 0;
      }
    }
  }
}
/**
 * _commitTextures
 */


function _commitTextures(gl, cur, next) {
  for (var i = 0; i < next.maxTextureSlot + 1; ++i) {
    if (cur.textureUnits[i] !== next.textureUnits[i]) {
      var texture = next.textureUnits[i];

      if (texture && texture._glID !== -1) {
        gl.activeTexture(gl.TEXTURE0 + i);
        gl.bindTexture(texture._target, texture._glID);
      }
    }
  }
}
/**
 * _attach
 */


function _attach(gl, location, attachment, face) {
  if (face === void 0) {
    face = 0;
  }

  if (attachment instanceof _texture2d["default"]) {
    gl.framebufferTexture2D(gl.FRAMEBUFFER, location, gl.TEXTURE_2D, attachment._glID, 0);
  } else if (attachment instanceof _textureCube["default"]) {
    gl.framebufferTexture2D(gl.FRAMEBUFFER, location, gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, attachment._glID, 0);
  } else {
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, location, gl.RENDERBUFFER, attachment._glID);
  }
}

var Device = /*#__PURE__*/function () {
  _createClass(Device, [{
    key: "caps",

    /**
     * @property caps
     */
    get: function get() {
      return this._caps;
    }
    /**
     * @param {HTMLElement} canvasEL
     * @param {object} opts
     */

  }]);

  function Device(canvasEL, opts) {
    var gl; // default options

    opts = opts || {};

    if (opts.alpha === undefined) {
      opts.alpha = false;
    }

    if (opts.stencil === undefined) {
      opts.stencil = true;
    }

    if (opts.depth === undefined) {
      opts.depth = true;
    }

    if (opts.antialias === undefined) {
      opts.antialias = false;
    } // NOTE: it is said the performance improved in mobile device with this flag off.


    if (opts.preserveDrawingBuffer === undefined) {
      opts.preserveDrawingBuffer = false;
    }

    try {
      gl = canvasEL.getContext('webgl', opts) || canvasEL.getContext('experimental-webgl', opts) || canvasEL.getContext('webkit-3d', opts) || canvasEL.getContext('moz-webgl', opts);
    } catch (err) {
      console.error(err);
      return;
    } // No errors are thrown using try catch
    // Tested through ios baidu browser 4.14.1


    if (!gl) {
      console.error('This device does not support webgl');
    } // statics

    /**
     * @type {WebGLRenderingContext}
     */


    this._gl = gl;
    this._extensions = {};
    this._caps = {}; // capability

    this._stats = {
      texture: 0,
      vb: 0,
      ib: 0,
      drawcalls: 0
    }; // https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Using_Extensions

    this._initExtensions(['EXT_texture_filter_anisotropic', 'EXT_shader_texture_lod', 'OES_standard_derivatives', 'OES_texture_float', 'OES_texture_float_linear', 'OES_texture_half_float', 'OES_texture_half_float_linear', 'OES_vertex_array_object', 'WEBGL_compressed_texture_atc', 'WEBGL_compressed_texture_etc', 'WEBGL_compressed_texture_etc1', 'WEBGL_compressed_texture_pvrtc', 'WEBGL_compressed_texture_s3tc', 'WEBGL_depth_texture', 'WEBGL_draw_buffers']);

    this._initCaps();

    this._initStates(); // runtime


    _state["default"].initDefault(this);

    this._current = new _state["default"](this);
    this._next = new _state["default"](this);
    this._uniforms = {}; // name: { value, num, dirty }

    this._vx = this._vy = this._vw = this._vh = 0;
    this._sx = this._sy = this._sw = this._sh = 0;
    this._framebuffer = null; //

    this._enabledAttributes = new Array(this._caps.maxVertexAttribs);
    this._newAttributes = new Array(this._caps.maxVertexAttribs);

    for (var i = 0; i < this._caps.maxVertexAttribs; ++i) {
      this._enabledAttributes[i] = 0;
      this._newAttributes[i] = 0;
    }
  }

  var _proto = Device.prototype;

  _proto._initExtensions = function _initExtensions(extensions) {
    var gl = this._gl;

    for (var i = 0; i < extensions.length; ++i) {
      var name = extensions[i];
      var vendorPrefixes = ["", "WEBKIT_", "MOZ_"];

      for (var j = 0; j < vendorPrefixes.length; j++) {
        try {
          var ext = gl.getExtension(vendorPrefixes[j] + name);

          if (ext) {
            this._extensions[name] = ext;
            break;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  _proto._initCaps = function _initCaps() {
    var gl = this._gl;
    var extDrawBuffers = this.ext('WEBGL_draw_buffers');
    this._caps.maxVertexStreams = 4;
    this._caps.maxVertexTextures = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    this._caps.maxFragUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
    this._caps.maxTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    this._caps.maxVertexAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
    this._caps.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    this._caps.maxDrawBuffers = extDrawBuffers ? gl.getParameter(extDrawBuffers.MAX_DRAW_BUFFERS_WEBGL) : 1;
    this._caps.maxColorAttachments = extDrawBuffers ? gl.getParameter(extDrawBuffers.MAX_COLOR_ATTACHMENTS_WEBGL) : 1;
  };

  _proto._initStates = function _initStates() {
    var gl = this._gl; // gl.frontFace(gl.CCW);

    gl.disable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ZERO);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendColor(1, 1, 1, 1);
    gl.colorMask(true, true, true, true);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.disable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    gl.depthMask(false);
    gl.disable(gl.POLYGON_OFFSET_FILL);
    gl.depthRange(0, 1);
    gl.disable(gl.STENCIL_TEST);
    gl.stencilFunc(gl.ALWAYS, 0, 0xFF);
    gl.stencilMask(0xFF);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP); // TODO:
    // this.setAlphaToCoverage(false);
    // this.setTransformFeedbackBuffer(null);
    // this.setRaster(true);
    // this.setDepthBias(false);

    gl.clearDepth(1);
    gl.clearColor(0, 0, 0, 0);
    gl.clearStencil(0);
    gl.disable(gl.SCISSOR_TEST);
  };

  _proto._restoreTexture = function _restoreTexture(unit) {
    var gl = this._gl;
    var texture = this._current.textureUnits[unit];

    if (texture && texture._glID !== -1) {
      gl.bindTexture(texture._target, texture._glID);
    } else {
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
  };

  _proto._restoreIndexBuffer = function _restoreIndexBuffer() {
    var gl = this._gl;
    var ib = this._current.indexBuffer;

    if (ib && ib._glID !== -1) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib._glID);
    } else {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
  }
  /**
   * @method ext
   * @param {string} name
   */
  ;

  _proto.ext = function ext(name) {
    return this._extensions[name];
  };

  _proto.allowFloatTexture = function allowFloatTexture() {
    return this.ext("OES_texture_float") != null;
  } // ===============================
  // Immediate Settings
  // ===============================

  /**
   * @method setFrameBuffer
   * @param {FrameBuffer} fb - null means use the backbuffer
   */
  ;

  _proto.setFrameBuffer = function setFrameBuffer(fb) {
    if (this._framebuffer === fb) {
      return;
    }

    this._framebuffer = fb;
    var gl = this._gl;

    if (!fb) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      return;
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, fb._glID);
    var numColors = fb._colors.length;

    for (var i = 0; i < numColors; ++i) {
      var colorBuffer = fb._colors[i];

      _attach(gl, gl.COLOR_ATTACHMENT0 + i, colorBuffer); // TODO: what about cubemap face??? should be the target parameter for colorBuffer

    }

    for (var _i4 = numColors; _i4 < this._caps.maxColorAttachments; ++_i4) {
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + _i4, gl.TEXTURE_2D, null, 0);
    }

    if (fb._depth) {
      _attach(gl, gl.DEPTH_ATTACHMENT, fb._depth);
    }

    if (fb._stencil) {
      _attach(gl, gl.STENCIL_ATTACHMENT, fb._stencil);
    }

    if (fb._depthStencil) {
      _attach(gl, gl.DEPTH_STENCIL_ATTACHMENT, fb._depthStencil);
    }
  }
  /**
   * @method setViewport
   * @param {Number} x
   * @param {Number} y
   * @param {Number} w
   * @param {Number} h
   */
  ;

  _proto.setViewport = function setViewport(x, y, w, h) {
    if (this._vx !== x || this._vy !== y || this._vw !== w || this._vh !== h) {
      this._gl.viewport(x, y, w, h);

      this._vx = x;
      this._vy = y;
      this._vw = w;
      this._vh = h;
    }
  }
  /**
   * @method setScissor
   * @param {Number} x
   * @param {Number} y
   * @param {Number} w
   * @param {Number} h
   */
  ;

  _proto.setScissor = function setScissor(x, y, w, h) {
    if (this._sx !== x || this._sy !== y || this._sw !== w || this._sh !== h) {
      this._gl.scissor(x, y, w, h);

      this._sx = x;
      this._sy = y;
      this._sw = w;
      this._sh = h;
    }
  }
  /**
   * @method clear
   * @param {Object} opts
   * @param {Array} opts.color
   * @param {Number} opts.depth
   * @param {Number} opts.stencil
   */
  ;

  _proto.clear = function clear(opts) {
    if (opts.color === undefined && opts.depth === undefined && opts.stencil === undefined) {
      return;
    }

    var gl = this._gl;
    var flags = 0;

    if (opts.color !== undefined) {
      flags |= gl.COLOR_BUFFER_BIT;
      gl.clearColor(opts.color[0], opts.color[1], opts.color[2], opts.color[3]);
    }

    if (opts.depth !== undefined) {
      flags |= gl.DEPTH_BUFFER_BIT;
      gl.clearDepth(opts.depth);
      gl.enable(gl.DEPTH_TEST);
      gl.depthMask(true);
      gl.depthFunc(gl.ALWAYS);
    }

    if (opts.stencil !== undefined) {
      flags |= gl.STENCIL_BUFFER_BIT;
      gl.clearStencil(opts.stencil);
    }

    gl.clear(flags); // restore depth-write

    if (opts.depth !== undefined) {
      if (this._current.depthTest === false) {
        gl.disable(gl.DEPTH_TEST);
      } else {
        if (this._current.depthWrite === false) {
          gl.depthMask(false);
        }

        if (this._current.depthFunc !== _enums.enums.DS_FUNC_ALWAYS) {
          gl.depthFunc(this._current.depthFunc);
        }
      }
    }
  } // ===============================
  // Deferred States
  // ===============================

  /**
   * @method enableBlend
   */
  ;

  _proto.enableBlend = function enableBlend() {
    this._next.blend = true;
  }
  /**
   * @method enableDepthTest
   */
  ;

  _proto.enableDepthTest = function enableDepthTest() {
    this._next.depthTest = true;
  }
  /**
   * @method enableDepthWrite
   */
  ;

  _proto.enableDepthWrite = function enableDepthWrite() {
    this._next.depthWrite = true;
  }
  /**
   * @method enableStencilTest
   * @param {Number} stencilTest
   */
  ;

  _proto.setStencilTest = function setStencilTest(stencilTest) {
    this._next.stencilTest = stencilTest;
  }
  /**
   * @method setStencilFunc
   * @param {DS_FUNC_*} func
   * @param {Number} ref
   * @param {Number} mask
   */
  ;

  _proto.setStencilFunc = function setStencilFunc(func, ref, mask) {
    this._next.stencilSep = false;
    this._next.stencilFuncFront = this._next.stencilFuncBack = func;
    this._next.stencilRefFront = this._next.stencilRefBack = ref;
    this._next.stencilMaskFront = this._next.stencilMaskBack = mask;
  }
  /**
   * @method setStencilFuncFront
   * @param {DS_FUNC_*} func
   * @param {Number} ref
   * @param {Number} mask
   */
  ;

  _proto.setStencilFuncFront = function setStencilFuncFront(func, ref, mask) {
    this._next.stencilSep = true;
    this._next.stencilFuncFront = func;
    this._next.stencilRefFront = ref;
    this._next.stencilMaskFront = mask;
  }
  /**
   * @method setStencilFuncBack
   * @param {DS_FUNC_*} func
   * @param {Number} ref
   * @param {Number} mask
   */
  ;

  _proto.setStencilFuncBack = function setStencilFuncBack(func, ref, mask) {
    this._next.stencilSep = true;
    this._next.stencilFuncBack = func;
    this._next.stencilRefBack = ref;
    this._next.stencilMaskBack = mask;
  }
  /**
   * @method setStencilOp
   * @param {STENCIL_OP_*} failOp
   * @param {STENCIL_OP_*} zFailOp
   * @param {STENCIL_OP_*} zPassOp
   * @param {Number} writeMask
   */
  ;

  _proto.setStencilOp = function setStencilOp(failOp, zFailOp, zPassOp, writeMask) {
    this._next.stencilFailOpFront = this._next.stencilFailOpBack = failOp;
    this._next.stencilZFailOpFront = this._next.stencilZFailOpBack = zFailOp;
    this._next.stencilZPassOpFront = this._next.stencilZPassOpBack = zPassOp;
    this._next.stencilWriteMaskFront = this._next.stencilWriteMaskBack = writeMask;
  }
  /**
   * @method setStencilOpFront
   * @param {STENCIL_OP_*} failOp
   * @param {STENCIL_OP_*} zFailOp
   * @param {STENCIL_OP_*} zPassOp
   * @param {Number} writeMask
   */
  ;

  _proto.setStencilOpFront = function setStencilOpFront(failOp, zFailOp, zPassOp, writeMask) {
    this._next.stencilSep = true;
    this._next.stencilFailOpFront = failOp;
    this._next.stencilZFailOpFront = zFailOp;
    this._next.stencilZPassOpFront = zPassOp;
    this._next.stencilWriteMaskFront = writeMask;
  }
  /**
   * @method setStencilOpBack
   * @param {STENCIL_OP_*} failOp
   * @param {STENCIL_OP_*} zFailOp
   * @param {STENCIL_OP_*} zPassOp
   * @param {Number} writeMask
   */
  ;

  _proto.setStencilOpBack = function setStencilOpBack(failOp, zFailOp, zPassOp, writeMask) {
    this._next.stencilSep = true;
    this._next.stencilFailOpBack = failOp;
    this._next.stencilZFailOpBack = zFailOp;
    this._next.stencilZPassOpBack = zPassOp;
    this._next.stencilWriteMaskBack = writeMask;
  }
  /**
   * @method setDepthFunc
   * @param {DS_FUNC_*} depthFunc
   */
  ;

  _proto.setDepthFunc = function setDepthFunc(depthFunc) {
    this._next.depthFunc = depthFunc;
  }
  /**
   * @method setBlendColor32
   * @param {Number} rgba
   */
  ;

  _proto.setBlendColor32 = function setBlendColor32(rgba) {
    this._next.blendColor = rgba;
  }
  /**
   * @method setBlendColor
   * @param {Number} r
   * @param {Number} g
   * @param {Number} b
   * @param {Number} a
   */
  ;

  _proto.setBlendColor = function setBlendColor(r, g, b, a) {
    this._next.blendColor = (r * 255 << 24 | g * 255 << 16 | b * 255 << 8 | a * 255) >>> 0;
  }
  /**
   * @method setBlendFunc
   * @param {BELND_*} src
   * @param {BELND_*} dst
   */
  ;

  _proto.setBlendFunc = function setBlendFunc(src, dst) {
    this._next.blendSep = false;
    this._next.blendSrc = src;
    this._next.blendDst = dst;
  }
  /**
   * @method setBlendFuncSep
   * @param {BELND_*} src
   * @param {BELND_*} dst
   * @param {BELND_*} srcAlpha
   * @param {BELND_*} dstAlpha
   */
  ;

  _proto.setBlendFuncSep = function setBlendFuncSep(src, dst, srcAlpha, dstAlpha) {
    this._next.blendSep = true;
    this._next.blendSrc = src;
    this._next.blendDst = dst;
    this._next.blendSrcAlpha = srcAlpha;
    this._next.blendDstAlpha = dstAlpha;
  }
  /**
   * @method setBlendEq
   * @param {BELND_FUNC_*} eq
   */
  ;

  _proto.setBlendEq = function setBlendEq(eq) {
    this._next.blendSep = false;
    this._next.blendEq = eq;
  }
  /**
   * @method setBlendEqSep
   * @param {BELND_FUNC_*} eq
   * @param {BELND_FUNC_*} alphaEq
   */
  ;

  _proto.setBlendEqSep = function setBlendEqSep(eq, alphaEq) {
    this._next.blendSep = true;
    this._next.blendEq = eq;
    this._next.blendAlphaEq = alphaEq;
  }
  /**
   * @method setCullMode
   * @param {CULL_*} mode
   */
  ;

  _proto.setCullMode = function setCullMode(mode) {
    this._next.cullMode = mode;
  }
  /**
   * @method setVertexBuffer
   * @param {Number} stream
   * @param {VertexBuffer} buffer
   * @param {Number} start - start vertex
   */
  ;

  _proto.setVertexBuffer = function setVertexBuffer(stream, buffer, start) {
    if (start === void 0) {
      start = 0;
    }

    this._next.vertexBuffers[stream] = buffer;
    this._next.vertexBufferOffsets[stream] = start;

    if (this._next.maxStream < stream) {
      this._next.maxStream = stream;
    }
  }
  /**
   * @method setIndexBuffer
   * @param {IndexBuffer} buffer
   */
  ;

  _proto.setIndexBuffer = function setIndexBuffer(buffer) {
    this._next.indexBuffer = buffer;
  }
  /**
   * @method setProgram
   * @param {Program} program
   */
  ;

  _proto.setProgram = function setProgram(program) {
    this._next.program = program;
  }
  /**
   * @method setTexture
   * @param {String} name
   * @param {Texture} texture
   * @param {Number} slot
   */
  ;

  _proto.setTexture = function setTexture(name, texture, slot) {
    if (slot >= this._caps.maxTextureUnits) {
      console.warn("Can not set texture " + name + " at stage " + slot + ", max texture exceed: " + this._caps.maxTextureUnits);
      return;
    }

    this._next.textureUnits[slot] = texture;
    this.setUniform(name, slot);

    if (this._next.maxTextureSlot < slot) {
      this._next.maxTextureSlot = slot;
    }
  }
  /**
   * @method setTextureArray
   * @param {String} name
   * @param {Array} textures
   * @param {Int32Array} slots
   */
  ;

  _proto.setTextureArray = function setTextureArray(name, textures, slots) {
    var len = textures.length;

    if (len >= this._caps.maxTextureUnits) {
      console.warn("Can not set " + len + " textures for " + name + ", max texture exceed: " + this._caps.maxTextureUnits);
      return;
    }

    for (var i = 0; i < len; ++i) {
      var slot = slots[i];
      this._next.textureUnits[slot] = textures[i];

      if (this._next.maxTextureSlot < slot) {
        this._next.maxTextureSlot = slot;
      }
    }

    this.setUniform(name, slots);
  }
  /**
   * @method setUniform
   * @param {String} name
   * @param {*} value
   */
  ;

  _proto.setUniform = function setUniform(name, value) {
    var uniform = this._uniforms[name];
    var sameType = false;
    var isArray = false,
        isFloat32Array = false,
        isInt32Array = false;

    do {
      if (!uniform) {
        break;
      }

      isFloat32Array = Array.isArray(value) || value instanceof Float32Array;
      isInt32Array = value instanceof Int32Array;
      isArray = isFloat32Array || isInt32Array;

      if (uniform.isArray !== isArray) {
        break;
      }

      if (uniform.isArray && uniform.value.length !== value.length) {
        break;
      }

      sameType = true;
    } while (false);

    if (!sameType) {
      var newValue = value;

      if (isFloat32Array) {
        newValue = new Float32Array(value);
      } else if (isInt32Array) {
        newValue = new Int32Array(value);
      }

      uniform = {
        dirty: true,
        value: newValue,
        isArray: isArray
      };
    } else {
      var oldValue = uniform.value;
      var dirty = false;

      if (uniform.isArray) {
        for (var i = 0, l = oldValue.length; i < l; i++) {
          if (oldValue[i] !== value[i]) {
            dirty = true;
            oldValue[i] = value[i];
          }
        }
      } else {
        if (oldValue !== value) {
          dirty = true;
          uniform.value = value;
        }
      }

      if (dirty) {
        uniform.dirty = true;
      }
    }

    this._uniforms[name] = uniform;
  };

  _proto.setUniformDirectly = function setUniformDirectly(name, value) {
    var uniform = this._uniforms[name];

    if (!uniform) {
      this._uniforms[name] = uniform = {};
    }

    uniform.dirty = true;
    uniform.value = value;
  }
  /**
   * @method setPrimitiveType
   * @param {PT_*} type
   */
  ;

  _proto.setPrimitiveType = function setPrimitiveType(type) {
    this._next.primitiveType = type;
  }
  /**
   * @method resetDrawCalls
   */
  ;

  _proto.resetDrawCalls = function resetDrawCalls() {
    this._stats.drawcalls = 0;
  }
  /**
   * @method getDrawCalls
   */
  ;

  _proto.getDrawCalls = function getDrawCalls() {
    return this._stats.drawcalls;
  }
  /**
   * @method draw
   * @param {Number} base
   * @param {Number} count
   */
  ;

  _proto.draw = function draw(base, count) {
    var gl = this._gl;
    var cur = this._current;
    var next = this._next; // commit blend

    _commitBlendStates(gl, cur, next); // commit depth


    _commitDepthStates(gl, cur, next); // commit stencil


    _commitStencilStates(gl, cur, next); // commit cull


    _commitCullMode(gl, cur, next); // commit vertex-buffer


    _commitVertexBuffers(this, gl, cur, next); // commit index-buffer


    if (cur.indexBuffer !== next.indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, next.indexBuffer && next.indexBuffer._glID !== -1 ? next.indexBuffer._glID : null);
    } // commit program


    var programDirty = false;

    if (cur.program !== next.program) {
      if (next.program._linked) {
        gl.useProgram(next.program._glID);
      } else {
        console.warn('Failed to use program: has not linked yet.');
      }

      programDirty = true;
    } // commit texture/sampler


    _commitTextures(gl, cur, next); // commit uniforms


    for (var i = 0; i < next.program._uniforms.length; ++i) {
      var uniformInfo = next.program._uniforms[i];
      var uniform = this._uniforms[uniformInfo.name];

      if (!uniform) {
        // console.warn(`Can not find uniform ${uniformInfo.name}`);
        continue;
      }

      if (!programDirty && !uniform.dirty) {
        continue;
      }

      uniform.dirty = false; // TODO: please consider array uniform: uniformInfo.size > 0

      var commitFunc = uniformInfo.size === undefined ? _type2uniformCommit[uniformInfo.type] : _type2uniformArrayCommit[uniformInfo.type];

      if (!commitFunc) {
        console.warn("Can not find commit function for uniform " + uniformInfo.name);
        continue;
      }

      commitFunc(gl, uniformInfo.location, uniform.value);
    }

    if (count) {
      // drawPrimitives
      if (next.indexBuffer) {
        gl.drawElements(this._next.primitiveType, count, next.indexBuffer._format, base * next.indexBuffer._bytesPerIndex);
      } else {
        gl.drawArrays(this._next.primitiveType, base, count);
      } // update stats


      this._stats.drawcalls++;
    } // TODO: autogen mipmap for color buffer
    // if (this._framebuffer && this._framebuffer.colors[0].mipmap) {
    //   gl.bindTexture(this._framebuffer.colors[i]._target, colors[i]._glID);
    //   gl.generateMipmap(this._framebuffer.colors[i]._target);
    // }
    // reset states


    cur.set(next);
    next.reset();
  };

  return Device;
}();

exports["default"] = Device;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9nZngvZGV2aWNlLmpzIl0sIm5hbWVzIjpbIkdMX0lOVCIsIkdMX0ZMT0FUIiwiR0xfRkxPQVRfVkVDMiIsIkdMX0ZMT0FUX1ZFQzMiLCJHTF9GTE9BVF9WRUM0IiwiR0xfSU5UX1ZFQzIiLCJHTF9JTlRfVkVDMyIsIkdMX0lOVF9WRUM0IiwiR0xfQk9PTCIsIkdMX0JPT0xfVkVDMiIsIkdMX0JPT0xfVkVDMyIsIkdMX0JPT0xfVkVDNCIsIkdMX0ZMT0FUX01BVDIiLCJHTF9GTE9BVF9NQVQzIiwiR0xfRkxPQVRfTUFUNCIsIkdMX1NBTVBMRVJfMkQiLCJHTF9TQU1QTEVSX0NVQkUiLCJfdHlwZTJ1bmlmb3JtQ29tbWl0IiwiZ2wiLCJpZCIsInZhbHVlIiwidW5pZm9ybTFpIiwidW5pZm9ybTFmIiwidW5pZm9ybTJmdiIsInVuaWZvcm0zZnYiLCJ1bmlmb3JtNGZ2IiwidW5pZm9ybTJpdiIsInVuaWZvcm0zaXYiLCJ1bmlmb3JtNGl2IiwidW5pZm9ybU1hdHJpeDJmdiIsInVuaWZvcm1NYXRyaXgzZnYiLCJ1bmlmb3JtTWF0cml4NGZ2IiwiX3R5cGUydW5pZm9ybUFycmF5Q29tbWl0IiwidW5pZm9ybTFpdiIsInVuaWZvcm0xZnYiLCJfY29tbWl0QmxlbmRTdGF0ZXMiLCJjdXIiLCJuZXh0IiwiYmxlbmQiLCJkaXNhYmxlIiwiQkxFTkQiLCJlbmFibGUiLCJibGVuZFNyYyIsImVudW1zIiwiQkxFTkRfQ09OU1RBTlRfQ09MT1IiLCJCTEVORF9PTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1IiLCJibGVuZERzdCIsImJsZW5kQ29sb3IiLCJibGVuZFNlcCIsImJsZW5kRnVuY1NlcGFyYXRlIiwiYmxlbmRTcmNBbHBoYSIsImJsZW5kRHN0QWxwaGEiLCJibGVuZEVxdWF0aW9uU2VwYXJhdGUiLCJibGVuZEVxIiwiYmxlbmRBbHBoYUVxIiwiYmxlbmRGdW5jIiwiYmxlbmRFcXVhdGlvbiIsIl9jb21taXREZXB0aFN0YXRlcyIsImRlcHRoVGVzdCIsIkRFUFRIX1RFU1QiLCJkZXB0aEZ1bmMiLCJkZXB0aE1hc2siLCJkZXB0aFdyaXRlIiwiRFNfRlVOQ19BTFdBWVMiLCJfY29tbWl0U3RlbmNpbFN0YXRlcyIsInN0ZW5jaWxUZXN0IiwiU1RFTkNJTF9JTkhFUklUIiwiU1RFTkNJTF9ESVNBQkxFIiwiU1RFTkNJTF9URVNUIiwic3RlbmNpbFNlcCIsInN0ZW5jaWxGdW5jU2VwYXJhdGUiLCJGUk9OVCIsInN0ZW5jaWxGdW5jRnJvbnQiLCJzdGVuY2lsUmVmRnJvbnQiLCJzdGVuY2lsTWFza0Zyb250Iiwic3RlbmNpbE1hc2tTZXBhcmF0ZSIsInN0ZW5jaWxXcml0ZU1hc2tGcm9udCIsInN0ZW5jaWxPcFNlcGFyYXRlIiwic3RlbmNpbEZhaWxPcEZyb250Iiwic3RlbmNpbFpGYWlsT3BGcm9udCIsInN0ZW5jaWxaUGFzc09wRnJvbnQiLCJCQUNLIiwic3RlbmNpbEZ1bmNCYWNrIiwic3RlbmNpbFJlZkJhY2siLCJzdGVuY2lsTWFza0JhY2siLCJzdGVuY2lsV3JpdGVNYXNrQmFjayIsInN0ZW5jaWxGYWlsT3BCYWNrIiwic3RlbmNpbFpGYWlsT3BCYWNrIiwic3RlbmNpbFpQYXNzT3BCYWNrIiwic3RlbmNpbEZ1bmMiLCJzdGVuY2lsTWFzayIsInN0ZW5jaWxPcCIsIl9jb21taXRDdWxsTW9kZSIsImN1bGxNb2RlIiwiQ1VMTF9OT05FIiwiQ1VMTF9GQUNFIiwiY3VsbEZhY2UiLCJfY29tbWl0VmVydGV4QnVmZmVycyIsImRldmljZSIsImF0dHJzRGlydHkiLCJtYXhTdHJlYW0iLCJwcm9ncmFtIiwiaSIsInZlcnRleEJ1ZmZlcnMiLCJ2ZXJ0ZXhCdWZmZXJPZmZzZXRzIiwiX2NhcHMiLCJtYXhWZXJ0ZXhBdHRyaWJzIiwiX25ld0F0dHJpYnV0ZXMiLCJ2YiIsInZiT2Zmc2V0IiwiX2dsSUQiLCJiaW5kQnVmZmVyIiwiQVJSQVlfQlVGRkVSIiwiaiIsIl9hdHRyaWJ1dGVzIiwibGVuZ3RoIiwiYXR0ciIsImVsIiwiX2Zvcm1hdCIsImVsZW1lbnQiLCJuYW1lIiwiY29uc29sZSIsIndhcm4iLCJfZW5hYmxlZEF0dHJpYnV0ZXMiLCJsb2NhdGlvbiIsImVuYWJsZVZlcnRleEF0dHJpYkFycmF5IiwidmVydGV4QXR0cmliUG9pbnRlciIsIm51bSIsInR5cGUiLCJub3JtYWxpemUiLCJzdHJpZGUiLCJvZmZzZXQiLCJkaXNhYmxlVmVydGV4QXR0cmliQXJyYXkiLCJfY29tbWl0VGV4dHVyZXMiLCJtYXhUZXh0dXJlU2xvdCIsInRleHR1cmVVbml0cyIsInRleHR1cmUiLCJhY3RpdmVUZXh0dXJlIiwiVEVYVFVSRTAiLCJiaW5kVGV4dHVyZSIsIl90YXJnZXQiLCJfYXR0YWNoIiwiYXR0YWNobWVudCIsImZhY2UiLCJUZXh0dXJlMkQiLCJmcmFtZWJ1ZmZlclRleHR1cmUyRCIsIkZSQU1FQlVGRkVSIiwiVEVYVFVSRV8yRCIsIlRleHR1cmVDdWJlIiwiVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YIiwiZnJhbWVidWZmZXJSZW5kZXJidWZmZXIiLCJSRU5ERVJCVUZGRVIiLCJEZXZpY2UiLCJjYW52YXNFTCIsIm9wdHMiLCJhbHBoYSIsInVuZGVmaW5lZCIsInN0ZW5jaWwiLCJkZXB0aCIsImFudGlhbGlhcyIsInByZXNlcnZlRHJhd2luZ0J1ZmZlciIsImdldENvbnRleHQiLCJlcnIiLCJlcnJvciIsIl9nbCIsIl9leHRlbnNpb25zIiwiX3N0YXRzIiwiaWIiLCJkcmF3Y2FsbHMiLCJfaW5pdEV4dGVuc2lvbnMiLCJfaW5pdENhcHMiLCJfaW5pdFN0YXRlcyIsIlN0YXRlIiwiaW5pdERlZmF1bHQiLCJfY3VycmVudCIsIl9uZXh0IiwiX3VuaWZvcm1zIiwiX3Z4IiwiX3Z5IiwiX3Z3IiwiX3ZoIiwiX3N4IiwiX3N5IiwiX3N3IiwiX3NoIiwiX2ZyYW1lYnVmZmVyIiwiQXJyYXkiLCJleHRlbnNpb25zIiwidmVuZG9yUHJlZml4ZXMiLCJleHQiLCJnZXRFeHRlbnNpb24iLCJlIiwiZXh0RHJhd0J1ZmZlcnMiLCJtYXhWZXJ0ZXhTdHJlYW1zIiwibWF4VmVydGV4VGV4dHVyZXMiLCJnZXRQYXJhbWV0ZXIiLCJNQVhfVkVSVEVYX1RFWFRVUkVfSU1BR0VfVU5JVFMiLCJtYXhGcmFnVW5pZm9ybXMiLCJNQVhfRlJBR01FTlRfVU5JRk9STV9WRUNUT1JTIiwibWF4VGV4dHVyZVVuaXRzIiwiTUFYX1RFWFRVUkVfSU1BR0VfVU5JVFMiLCJNQVhfVkVSVEVYX0FUVFJJQlMiLCJtYXhUZXh0dXJlU2l6ZSIsIk1BWF9URVhUVVJFX1NJWkUiLCJtYXhEcmF3QnVmZmVycyIsIk1BWF9EUkFXX0JVRkZFUlNfV0VCR0wiLCJtYXhDb2xvckF0dGFjaG1lbnRzIiwiTUFYX0NPTE9SX0FUVEFDSE1FTlRTX1dFQkdMIiwiT05FIiwiWkVSTyIsIkZVTkNfQUREIiwiY29sb3JNYXNrIiwiTEVTUyIsIlBPTFlHT05fT0ZGU0VUX0ZJTEwiLCJkZXB0aFJhbmdlIiwiQUxXQVlTIiwiS0VFUCIsImNsZWFyRGVwdGgiLCJjbGVhckNvbG9yIiwiY2xlYXJTdGVuY2lsIiwiU0NJU1NPUl9URVNUIiwiX3Jlc3RvcmVUZXh0dXJlIiwidW5pdCIsIl9yZXN0b3JlSW5kZXhCdWZmZXIiLCJpbmRleEJ1ZmZlciIsIkVMRU1FTlRfQVJSQVlfQlVGRkVSIiwiYWxsb3dGbG9hdFRleHR1cmUiLCJzZXRGcmFtZUJ1ZmZlciIsImZiIiwiYmluZEZyYW1lYnVmZmVyIiwibnVtQ29sb3JzIiwiX2NvbG9ycyIsImNvbG9yQnVmZmVyIiwiQ09MT1JfQVRUQUNITUVOVDAiLCJfZGVwdGgiLCJERVBUSF9BVFRBQ0hNRU5UIiwiX3N0ZW5jaWwiLCJTVEVOQ0lMX0FUVEFDSE1FTlQiLCJfZGVwdGhTdGVuY2lsIiwiREVQVEhfU1RFTkNJTF9BVFRBQ0hNRU5UIiwic2V0Vmlld3BvcnQiLCJ4IiwieSIsInciLCJoIiwidmlld3BvcnQiLCJzZXRTY2lzc29yIiwic2Npc3NvciIsImNsZWFyIiwiY29sb3IiLCJmbGFncyIsIkNPTE9SX0JVRkZFUl9CSVQiLCJERVBUSF9CVUZGRVJfQklUIiwiU1RFTkNJTF9CVUZGRVJfQklUIiwiZW5hYmxlQmxlbmQiLCJlbmFibGVEZXB0aFRlc3QiLCJlbmFibGVEZXB0aFdyaXRlIiwic2V0U3RlbmNpbFRlc3QiLCJzZXRTdGVuY2lsRnVuYyIsImZ1bmMiLCJyZWYiLCJtYXNrIiwic2V0U3RlbmNpbEZ1bmNGcm9udCIsInNldFN0ZW5jaWxGdW5jQmFjayIsInNldFN0ZW5jaWxPcCIsImZhaWxPcCIsInpGYWlsT3AiLCJ6UGFzc09wIiwid3JpdGVNYXNrIiwic2V0U3RlbmNpbE9wRnJvbnQiLCJzZXRTdGVuY2lsT3BCYWNrIiwic2V0RGVwdGhGdW5jIiwic2V0QmxlbmRDb2xvcjMyIiwicmdiYSIsInNldEJsZW5kQ29sb3IiLCJyIiwiZyIsImIiLCJhIiwic2V0QmxlbmRGdW5jIiwic3JjIiwiZHN0Iiwic2V0QmxlbmRGdW5jU2VwIiwic3JjQWxwaGEiLCJkc3RBbHBoYSIsInNldEJsZW5kRXEiLCJlcSIsInNldEJsZW5kRXFTZXAiLCJhbHBoYUVxIiwic2V0Q3VsbE1vZGUiLCJtb2RlIiwic2V0VmVydGV4QnVmZmVyIiwic3RyZWFtIiwiYnVmZmVyIiwic3RhcnQiLCJzZXRJbmRleEJ1ZmZlciIsInNldFByb2dyYW0iLCJzZXRUZXh0dXJlIiwic2xvdCIsInNldFVuaWZvcm0iLCJzZXRUZXh0dXJlQXJyYXkiLCJ0ZXh0dXJlcyIsInNsb3RzIiwibGVuIiwidW5pZm9ybSIsInNhbWVUeXBlIiwiaXNBcnJheSIsImlzRmxvYXQzMkFycmF5IiwiaXNJbnQzMkFycmF5IiwiRmxvYXQzMkFycmF5IiwiSW50MzJBcnJheSIsIm5ld1ZhbHVlIiwiZGlydHkiLCJvbGRWYWx1ZSIsImwiLCJzZXRVbmlmb3JtRGlyZWN0bHkiLCJzZXRQcmltaXRpdmVUeXBlIiwicHJpbWl0aXZlVHlwZSIsInJlc2V0RHJhd0NhbGxzIiwiZ2V0RHJhd0NhbGxzIiwiZHJhdyIsImJhc2UiLCJjb3VudCIsInByb2dyYW1EaXJ0eSIsIl9saW5rZWQiLCJ1c2VQcm9ncmFtIiwidW5pZm9ybUluZm8iLCJjb21taXRGdW5jIiwic2l6ZSIsImRyYXdFbGVtZW50cyIsIl9ieXRlc1BlckluZGV4IiwiZHJhd0FycmF5cyIsInNldCIsInJlc2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNLEdBQUcsSUFBZjtBQUNBLElBQU1DLFFBQVEsR0FBRyxJQUFqQjtBQUNBLElBQU1DLGFBQWEsR0FBRyxLQUF0QjtBQUNBLElBQU1DLGFBQWEsR0FBRyxLQUF0QjtBQUNBLElBQU1DLGFBQWEsR0FBRyxLQUF0QjtBQUNBLElBQU1DLFdBQVcsR0FBRyxLQUFwQjtBQUNBLElBQU1DLFdBQVcsR0FBRyxLQUFwQjtBQUNBLElBQU1DLFdBQVcsR0FBRyxLQUFwQjtBQUNBLElBQU1DLE9BQU8sR0FBRyxLQUFoQjtBQUNBLElBQU1DLFlBQVksR0FBRyxLQUFyQjtBQUNBLElBQU1DLFlBQVksR0FBRyxLQUFyQjtBQUNBLElBQU1DLFlBQVksR0FBRyxLQUFyQjtBQUNBLElBQU1DLGFBQWEsR0FBRyxLQUF0QjtBQUNBLElBQU1DLGFBQWEsR0FBRyxLQUF0QjtBQUNBLElBQU1DLGFBQWEsR0FBRyxLQUF0QjtBQUNBLElBQU1DLGFBQWEsR0FBRyxLQUF0QjtBQUNBLElBQU1DLGVBQWUsR0FBRyxLQUF4QjtBQUVBOzs7O0FBR0EsSUFBSUMsbUJBQW1CLG9EQUNwQmpCLE1BRG9CLElBQ1gsVUFBVWtCLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkMsS0FBbEIsRUFBeUI7QUFDakNGLEVBQUFBLEVBQUUsQ0FBQ0csU0FBSCxDQUFhRixFQUFiLEVBQWlCQyxLQUFqQjtBQUNELENBSG9CLHVCQUtwQm5CLFFBTG9CLElBS1QsVUFBVWlCLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkMsS0FBbEIsRUFBeUI7QUFDbkNGLEVBQUFBLEVBQUUsQ0FBQ0ksU0FBSCxDQUFhSCxFQUFiLEVBQWlCQyxLQUFqQjtBQUNELENBUG9CLHVCQVNwQmxCLGFBVG9CLElBU0osVUFBVWdCLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkMsS0FBbEIsRUFBeUI7QUFDeENGLEVBQUFBLEVBQUUsQ0FBQ0ssVUFBSCxDQUFjSixFQUFkLEVBQWtCQyxLQUFsQjtBQUNELENBWG9CLHVCQWFwQmpCLGFBYm9CLElBYUosVUFBVWUsRUFBVixFQUFjQyxFQUFkLEVBQWtCQyxLQUFsQixFQUF5QjtBQUN4Q0YsRUFBQUEsRUFBRSxDQUFDTSxVQUFILENBQWNMLEVBQWQsRUFBa0JDLEtBQWxCO0FBQ0QsQ0Fmb0IsdUJBaUJwQmhCLGFBakJvQixJQWlCSixVQUFVYyxFQUFWLEVBQWNDLEVBQWQsRUFBa0JDLEtBQWxCLEVBQXlCO0FBQ3hDRixFQUFBQSxFQUFFLENBQUNPLFVBQUgsQ0FBY04sRUFBZCxFQUFrQkMsS0FBbEI7QUFDRCxDQW5Cb0IsdUJBcUJwQmYsV0FyQm9CLElBcUJOLFVBQVVhLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkMsS0FBbEIsRUFBeUI7QUFDdENGLEVBQUFBLEVBQUUsQ0FBQ1EsVUFBSCxDQUFjUCxFQUFkLEVBQWtCQyxLQUFsQjtBQUNELENBdkJvQix1QkF5QnBCZCxXQXpCb0IsSUF5Qk4sVUFBVVksRUFBVixFQUFjQyxFQUFkLEVBQWtCQyxLQUFsQixFQUF5QjtBQUN0Q0YsRUFBQUEsRUFBRSxDQUFDUyxVQUFILENBQWNSLEVBQWQsRUFBa0JDLEtBQWxCO0FBQ0QsQ0EzQm9CLHVCQTZCcEJiLFdBN0JvQixJQTZCTixVQUFVVyxFQUFWLEVBQWNDLEVBQWQsRUFBa0JDLEtBQWxCLEVBQXlCO0FBQ3RDRixFQUFBQSxFQUFFLENBQUNVLFVBQUgsQ0FBY1QsRUFBZCxFQUFrQkMsS0FBbEI7QUFDRCxDQS9Cb0IsdUJBaUNwQlosT0FqQ29CLElBaUNWLFVBQVVVLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkMsS0FBbEIsRUFBeUI7QUFDbENGLEVBQUFBLEVBQUUsQ0FBQ0csU0FBSCxDQUFhRixFQUFiLEVBQWlCQyxLQUFqQjtBQUNELENBbkNvQix1QkFxQ3BCWCxZQXJDb0IsSUFxQ0wsVUFBVVMsRUFBVixFQUFjQyxFQUFkLEVBQWtCQyxLQUFsQixFQUF5QjtBQUN2Q0YsRUFBQUEsRUFBRSxDQUFDUSxVQUFILENBQWNQLEVBQWQsRUFBa0JDLEtBQWxCO0FBQ0QsQ0F2Q29CLHVCQXlDcEJWLFlBekNvQixJQXlDTCxVQUFVUSxFQUFWLEVBQWNDLEVBQWQsRUFBa0JDLEtBQWxCLEVBQXlCO0FBQ3ZDRixFQUFBQSxFQUFFLENBQUNTLFVBQUgsQ0FBY1IsRUFBZCxFQUFrQkMsS0FBbEI7QUFDRCxDQTNDb0IsdUJBNkNwQlQsWUE3Q29CLElBNkNMLFVBQVVPLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkMsS0FBbEIsRUFBeUI7QUFDdkNGLEVBQUFBLEVBQUUsQ0FBQ1UsVUFBSCxDQUFjVCxFQUFkLEVBQWtCQyxLQUFsQjtBQUNELENBL0NvQix1QkFpRHBCUixhQWpEb0IsSUFpREosVUFBVU0sRUFBVixFQUFjQyxFQUFkLEVBQWtCQyxLQUFsQixFQUF5QjtBQUN4Q0YsRUFBQUEsRUFBRSxDQUFDVyxnQkFBSCxDQUFvQlYsRUFBcEIsRUFBd0IsS0FBeEIsRUFBK0JDLEtBQS9CO0FBQ0QsQ0FuRG9CLHVCQXFEcEJQLGFBckRvQixJQXFESixVQUFVSyxFQUFWLEVBQWNDLEVBQWQsRUFBa0JDLEtBQWxCLEVBQXlCO0FBQ3hDRixFQUFBQSxFQUFFLENBQUNZLGdCQUFILENBQW9CWCxFQUFwQixFQUF3QixLQUF4QixFQUErQkMsS0FBL0I7QUFDRCxDQXZEb0IsdUJBeURwQk4sYUF6RG9CLElBeURKLFVBQVVJLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkMsS0FBbEIsRUFBeUI7QUFDeENGLEVBQUFBLEVBQUUsQ0FBQ2EsZ0JBQUgsQ0FBb0JaLEVBQXBCLEVBQXdCLEtBQXhCLEVBQStCQyxLQUEvQjtBQUNELENBM0RvQix1QkE2RHBCTCxhQTdEb0IsSUE2REosVUFBVUcsRUFBVixFQUFjQyxFQUFkLEVBQWtCQyxLQUFsQixFQUF5QjtBQUN4Q0YsRUFBQUEsRUFBRSxDQUFDRyxTQUFILENBQWFGLEVBQWIsRUFBaUJDLEtBQWpCO0FBQ0QsQ0EvRG9CLHVCQWlFcEJKLGVBakVvQixJQWlFRixVQUFVRSxFQUFWLEVBQWNDLEVBQWQsRUFBa0JDLEtBQWxCLEVBQXlCO0FBQzFDRixFQUFBQSxFQUFFLENBQUNHLFNBQUgsQ0FBYUYsRUFBYixFQUFpQkMsS0FBakI7QUFDRCxDQW5Fb0IsdUJBQXZCO0FBc0VBOzs7OztBQUdBLElBQUlZLHdCQUF3QixzREFDekJoQyxNQUR5QixJQUNoQixVQUFVa0IsRUFBVixFQUFjQyxFQUFkLEVBQWtCQyxLQUFsQixFQUF5QjtBQUNqQ0YsRUFBQUEsRUFBRSxDQUFDZSxVQUFILENBQWNkLEVBQWQsRUFBa0JDLEtBQWxCO0FBQ0QsQ0FIeUIsd0JBS3pCbkIsUUFMeUIsSUFLZCxVQUFVaUIsRUFBVixFQUFjQyxFQUFkLEVBQWtCQyxLQUFsQixFQUF5QjtBQUNuQ0YsRUFBQUEsRUFBRSxDQUFDZ0IsVUFBSCxDQUFjZixFQUFkLEVBQWtCQyxLQUFsQjtBQUNELENBUHlCLHdCQVN6QmxCLGFBVHlCLElBU1QsVUFBVWdCLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkMsS0FBbEIsRUFBeUI7QUFDeENGLEVBQUFBLEVBQUUsQ0FBQ0ssVUFBSCxDQUFjSixFQUFkLEVBQWtCQyxLQUFsQjtBQUNELENBWHlCLHdCQWF6QmpCLGFBYnlCLElBYVQsVUFBVWUsRUFBVixFQUFjQyxFQUFkLEVBQWtCQyxLQUFsQixFQUF5QjtBQUN4Q0YsRUFBQUEsRUFBRSxDQUFDTSxVQUFILENBQWNMLEVBQWQsRUFBa0JDLEtBQWxCO0FBQ0QsQ0FmeUIsd0JBaUJ6QmhCLGFBakJ5QixJQWlCVCxVQUFVYyxFQUFWLEVBQWNDLEVBQWQsRUFBa0JDLEtBQWxCLEVBQXlCO0FBQ3hDRixFQUFBQSxFQUFFLENBQUNPLFVBQUgsQ0FBY04sRUFBZCxFQUFrQkMsS0FBbEI7QUFDRCxDQW5CeUIsd0JBcUJ6QmYsV0FyQnlCLElBcUJYLFVBQVVhLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkMsS0FBbEIsRUFBeUI7QUFDdENGLEVBQUFBLEVBQUUsQ0FBQ1EsVUFBSCxDQUFjUCxFQUFkLEVBQWtCQyxLQUFsQjtBQUNELENBdkJ5Qix3QkF5QnpCZCxXQXpCeUIsSUF5QlgsVUFBVVksRUFBVixFQUFjQyxFQUFkLEVBQWtCQyxLQUFsQixFQUF5QjtBQUN0Q0YsRUFBQUEsRUFBRSxDQUFDUyxVQUFILENBQWNSLEVBQWQsRUFBa0JDLEtBQWxCO0FBQ0QsQ0EzQnlCLHdCQTZCekJiLFdBN0J5QixJQTZCWCxVQUFVVyxFQUFWLEVBQWNDLEVBQWQsRUFBa0JDLEtBQWxCLEVBQXlCO0FBQ3RDRixFQUFBQSxFQUFFLENBQUNVLFVBQUgsQ0FBY1QsRUFBZCxFQUFrQkMsS0FBbEI7QUFDRCxDQS9CeUIsd0JBaUN6QlosT0FqQ3lCLElBaUNmLFVBQVVVLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkMsS0FBbEIsRUFBeUI7QUFDbENGLEVBQUFBLEVBQUUsQ0FBQ2UsVUFBSCxDQUFjZCxFQUFkLEVBQWtCQyxLQUFsQjtBQUNELENBbkN5Qix3QkFxQ3pCWCxZQXJDeUIsSUFxQ1YsVUFBVVMsRUFBVixFQUFjQyxFQUFkLEVBQWtCQyxLQUFsQixFQUF5QjtBQUN2Q0YsRUFBQUEsRUFBRSxDQUFDUSxVQUFILENBQWNQLEVBQWQsRUFBa0JDLEtBQWxCO0FBQ0QsQ0F2Q3lCLHdCQXlDekJWLFlBekN5QixJQXlDVixVQUFVUSxFQUFWLEVBQWNDLEVBQWQsRUFBa0JDLEtBQWxCLEVBQXlCO0FBQ3ZDRixFQUFBQSxFQUFFLENBQUNTLFVBQUgsQ0FBY1IsRUFBZCxFQUFrQkMsS0FBbEI7QUFDRCxDQTNDeUIsd0JBNkN6QlQsWUE3Q3lCLElBNkNWLFVBQVVPLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkMsS0FBbEIsRUFBeUI7QUFDdkNGLEVBQUFBLEVBQUUsQ0FBQ1UsVUFBSCxDQUFjVCxFQUFkLEVBQWtCQyxLQUFsQjtBQUNELENBL0N5Qix3QkFpRHpCUixhQWpEeUIsSUFpRFQsVUFBVU0sRUFBVixFQUFjQyxFQUFkLEVBQWtCQyxLQUFsQixFQUF5QjtBQUN4Q0YsRUFBQUEsRUFBRSxDQUFDVyxnQkFBSCxDQUFvQlYsRUFBcEIsRUFBd0IsS0FBeEIsRUFBK0JDLEtBQS9CO0FBQ0QsQ0FuRHlCLHdCQXFEekJQLGFBckR5QixJQXFEVCxVQUFVSyxFQUFWLEVBQWNDLEVBQWQsRUFBa0JDLEtBQWxCLEVBQXlCO0FBQ3hDRixFQUFBQSxFQUFFLENBQUNZLGdCQUFILENBQW9CWCxFQUFwQixFQUF3QixLQUF4QixFQUErQkMsS0FBL0I7QUFDRCxDQXZEeUIsd0JBeUR6Qk4sYUF6RHlCLElBeURULFVBQVVJLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkMsS0FBbEIsRUFBeUI7QUFDeENGLEVBQUFBLEVBQUUsQ0FBQ2EsZ0JBQUgsQ0FBb0JaLEVBQXBCLEVBQXdCLEtBQXhCLEVBQStCQyxLQUEvQjtBQUNELENBM0R5Qix3QkE2RHpCTCxhQTdEeUIsSUE2RFQsVUFBVUcsRUFBVixFQUFjQyxFQUFkLEVBQWtCQyxLQUFsQixFQUF5QjtBQUN4Q0YsRUFBQUEsRUFBRSxDQUFDZSxVQUFILENBQWNkLEVBQWQsRUFBa0JDLEtBQWxCO0FBQ0QsQ0EvRHlCLHdCQWlFekJKLGVBakV5QixJQWlFUCxVQUFVRSxFQUFWLEVBQWNDLEVBQWQsRUFBa0JDLEtBQWxCLEVBQXlCO0FBQzFDRixFQUFBQSxFQUFFLENBQUNlLFVBQUgsQ0FBY2QsRUFBZCxFQUFrQkMsS0FBbEI7QUFDRCxDQW5FeUIsd0JBQTVCO0FBc0VBOzs7OztBQUdBLFNBQVNlLGtCQUFULENBQTRCakIsRUFBNUIsRUFBZ0NrQixHQUFoQyxFQUFxQ0MsSUFBckMsRUFBMkM7QUFDekM7QUFDQSxNQUFJRCxHQUFHLENBQUNFLEtBQUosS0FBY0QsSUFBSSxDQUFDQyxLQUF2QixFQUE4QjtBQUM1QixRQUFJLENBQUNELElBQUksQ0FBQ0MsS0FBVixFQUFpQjtBQUNmcEIsTUFBQUEsRUFBRSxDQUFDcUIsT0FBSCxDQUFXckIsRUFBRSxDQUFDc0IsS0FBZDtBQUNBO0FBQ0Q7O0FBRUR0QixJQUFBQSxFQUFFLENBQUN1QixNQUFILENBQVV2QixFQUFFLENBQUNzQixLQUFiOztBQUVBLFFBQ0VILElBQUksQ0FBQ0ssUUFBTCxLQUFrQkMsYUFBTUMsb0JBQXhCLElBQ0FQLElBQUksQ0FBQ0ssUUFBTCxLQUFrQkMsYUFBTUUsOEJBRHhCLElBRUFSLElBQUksQ0FBQ1MsUUFBTCxLQUFrQkgsYUFBTUMsb0JBRnhCLElBR0FQLElBQUksQ0FBQ1MsUUFBTCxLQUFrQkgsYUFBTUUsOEJBSjFCLEVBS0U7QUFDQTNCLE1BQUFBLEVBQUUsQ0FBQzZCLFVBQUgsQ0FDRSxDQUFDVixJQUFJLENBQUNVLFVBQUwsSUFBbUIsRUFBcEIsSUFBMEIsR0FENUIsRUFFRSxDQUFDVixJQUFJLENBQUNVLFVBQUwsSUFBbUIsRUFBbkIsR0FBd0IsSUFBekIsSUFBaUMsR0FGbkMsRUFHRSxDQUFDVixJQUFJLENBQUNVLFVBQUwsSUFBbUIsQ0FBbkIsR0FBdUIsSUFBeEIsSUFBZ0MsR0FIbEMsRUFJRSxDQUFDVixJQUFJLENBQUNVLFVBQUwsR0FBa0IsSUFBbkIsSUFBMkIsR0FKN0I7QUFNRDs7QUFFRCxRQUFJVixJQUFJLENBQUNXLFFBQVQsRUFBbUI7QUFDakI5QixNQUFBQSxFQUFFLENBQUMrQixpQkFBSCxDQUFxQlosSUFBSSxDQUFDSyxRQUExQixFQUFvQ0wsSUFBSSxDQUFDUyxRQUF6QyxFQUFtRFQsSUFBSSxDQUFDYSxhQUF4RCxFQUF1RWIsSUFBSSxDQUFDYyxhQUE1RTtBQUNBakMsTUFBQUEsRUFBRSxDQUFDa0MscUJBQUgsQ0FBeUJmLElBQUksQ0FBQ2dCLE9BQTlCLEVBQXVDaEIsSUFBSSxDQUFDaUIsWUFBNUM7QUFDRCxLQUhELE1BR087QUFDTHBDLE1BQUFBLEVBQUUsQ0FBQ3FDLFNBQUgsQ0FBYWxCLElBQUksQ0FBQ0ssUUFBbEIsRUFBNEJMLElBQUksQ0FBQ1MsUUFBakM7QUFDQTVCLE1BQUFBLEVBQUUsQ0FBQ3NDLGFBQUgsQ0FBaUJuQixJQUFJLENBQUNnQixPQUF0QjtBQUNEOztBQUVEO0FBQ0QsR0FqQ3dDLENBbUN6Qzs7O0FBQ0EsTUFBSWhCLElBQUksQ0FBQ0MsS0FBTCxLQUFlLEtBQW5CLEVBQTBCO0FBQ3hCO0FBQ0QsR0F0Q3dDLENBd0N6Qzs7O0FBQ0EsTUFBSUYsR0FBRyxDQUFDVyxVQUFKLEtBQW1CVixJQUFJLENBQUNVLFVBQTVCLEVBQXdDO0FBQ3RDN0IsSUFBQUEsRUFBRSxDQUFDNkIsVUFBSCxDQUNFLENBQUNWLElBQUksQ0FBQ1UsVUFBTCxJQUFtQixFQUFwQixJQUEwQixHQUQ1QixFQUVFLENBQUNWLElBQUksQ0FBQ1UsVUFBTCxJQUFtQixFQUFuQixHQUF3QixJQUF6QixJQUFpQyxHQUZuQyxFQUdFLENBQUNWLElBQUksQ0FBQ1UsVUFBTCxJQUFtQixDQUFuQixHQUF1QixJQUF4QixJQUFnQyxHQUhsQyxFQUlFLENBQUNWLElBQUksQ0FBQ1UsVUFBTCxHQUFrQixJQUFuQixJQUEyQixHQUo3QjtBQU1ELEdBaER3QyxDQWtEekM7OztBQUNBLE1BQUlYLEdBQUcsQ0FBQ1ksUUFBSixLQUFpQlgsSUFBSSxDQUFDVyxRQUExQixFQUFvQztBQUNsQyxRQUFJWCxJQUFJLENBQUNXLFFBQVQsRUFBbUI7QUFDakI5QixNQUFBQSxFQUFFLENBQUMrQixpQkFBSCxDQUFxQlosSUFBSSxDQUFDSyxRQUExQixFQUFvQ0wsSUFBSSxDQUFDUyxRQUF6QyxFQUFtRFQsSUFBSSxDQUFDYSxhQUF4RCxFQUF1RWIsSUFBSSxDQUFDYyxhQUE1RTtBQUNBakMsTUFBQUEsRUFBRSxDQUFDa0MscUJBQUgsQ0FBeUJmLElBQUksQ0FBQ2dCLE9BQTlCLEVBQXVDaEIsSUFBSSxDQUFDaUIsWUFBNUM7QUFDRCxLQUhELE1BR087QUFDTHBDLE1BQUFBLEVBQUUsQ0FBQ3FDLFNBQUgsQ0FBYWxCLElBQUksQ0FBQ0ssUUFBbEIsRUFBNEJMLElBQUksQ0FBQ1MsUUFBakM7QUFDQTVCLE1BQUFBLEVBQUUsQ0FBQ3NDLGFBQUgsQ0FBaUJuQixJQUFJLENBQUNnQixPQUF0QjtBQUNEOztBQUVEO0FBQ0Q7O0FBRUQsTUFBSWhCLElBQUksQ0FBQ1csUUFBVCxFQUFtQjtBQUNqQjtBQUNBLFFBQ0VaLEdBQUcsQ0FBQ00sUUFBSixLQUFpQkwsSUFBSSxDQUFDSyxRQUF0QixJQUNBTixHQUFHLENBQUNVLFFBQUosS0FBaUJULElBQUksQ0FBQ1MsUUFEdEIsSUFFQVYsR0FBRyxDQUFDYyxhQUFKLEtBQXNCYixJQUFJLENBQUNhLGFBRjNCLElBR0FkLEdBQUcsQ0FBQ2UsYUFBSixLQUFzQmQsSUFBSSxDQUFDYyxhQUo3QixFQUtFO0FBQ0FqQyxNQUFBQSxFQUFFLENBQUMrQixpQkFBSCxDQUFxQlosSUFBSSxDQUFDSyxRQUExQixFQUFvQ0wsSUFBSSxDQUFDUyxRQUF6QyxFQUFtRFQsSUFBSSxDQUFDYSxhQUF4RCxFQUF1RWIsSUFBSSxDQUFDYyxhQUE1RTtBQUNELEtBVGdCLENBV2pCOzs7QUFDQSxRQUNFZixHQUFHLENBQUNpQixPQUFKLEtBQWdCaEIsSUFBSSxDQUFDZ0IsT0FBckIsSUFDQWpCLEdBQUcsQ0FBQ2tCLFlBQUosS0FBcUJqQixJQUFJLENBQUNpQixZQUY1QixFQUdFO0FBQ0FwQyxNQUFBQSxFQUFFLENBQUNrQyxxQkFBSCxDQUF5QmYsSUFBSSxDQUFDZ0IsT0FBOUIsRUFBdUNoQixJQUFJLENBQUNpQixZQUE1QztBQUNEO0FBQ0YsR0FsQkQsTUFrQk87QUFDTDtBQUNBLFFBQ0VsQixHQUFHLENBQUNNLFFBQUosS0FBaUJMLElBQUksQ0FBQ0ssUUFBdEIsSUFDQU4sR0FBRyxDQUFDVSxRQUFKLEtBQWlCVCxJQUFJLENBQUNTLFFBRnhCLEVBR0U7QUFDQTVCLE1BQUFBLEVBQUUsQ0FBQ3FDLFNBQUgsQ0FBYWxCLElBQUksQ0FBQ0ssUUFBbEIsRUFBNEJMLElBQUksQ0FBQ1MsUUFBakM7QUFDRCxLQVBJLENBU0w7OztBQUNBLFFBQUlWLEdBQUcsQ0FBQ2lCLE9BQUosS0FBZ0JoQixJQUFJLENBQUNnQixPQUF6QixFQUFrQztBQUNoQ25DLE1BQUFBLEVBQUUsQ0FBQ3NDLGFBQUgsQ0FBaUJuQixJQUFJLENBQUNnQixPQUF0QjtBQUNEO0FBQ0Y7QUFDRjtBQUVEOzs7OztBQUdBLFNBQVNJLGtCQUFULENBQTRCdkMsRUFBNUIsRUFBZ0NrQixHQUFoQyxFQUFxQ0MsSUFBckMsRUFBMkM7QUFDekM7QUFDQSxNQUFJRCxHQUFHLENBQUNzQixTQUFKLEtBQWtCckIsSUFBSSxDQUFDcUIsU0FBM0IsRUFBc0M7QUFDcEMsUUFBSSxDQUFDckIsSUFBSSxDQUFDcUIsU0FBVixFQUFxQjtBQUNuQnhDLE1BQUFBLEVBQUUsQ0FBQ3FCLE9BQUgsQ0FBV3JCLEVBQUUsQ0FBQ3lDLFVBQWQ7QUFDQTtBQUNEOztBQUVEekMsSUFBQUEsRUFBRSxDQUFDdUIsTUFBSCxDQUFVdkIsRUFBRSxDQUFDeUMsVUFBYjtBQUNBekMsSUFBQUEsRUFBRSxDQUFDMEMsU0FBSCxDQUFhdkIsSUFBSSxDQUFDdUIsU0FBbEI7QUFDQTFDLElBQUFBLEVBQUUsQ0FBQzJDLFNBQUgsQ0FBYXhCLElBQUksQ0FBQ3lCLFVBQWxCO0FBRUE7QUFDRCxHQWJ3QyxDQWV6Qzs7O0FBQ0EsTUFBSTFCLEdBQUcsQ0FBQzBCLFVBQUosS0FBbUJ6QixJQUFJLENBQUN5QixVQUE1QixFQUF3QztBQUN0QzVDLElBQUFBLEVBQUUsQ0FBQzJDLFNBQUgsQ0FBYXhCLElBQUksQ0FBQ3lCLFVBQWxCO0FBQ0QsR0FsQndDLENBb0J6Qzs7O0FBQ0EsTUFBSXpCLElBQUksQ0FBQ3FCLFNBQUwsS0FBbUIsS0FBdkIsRUFBOEI7QUFDNUIsUUFBSXJCLElBQUksQ0FBQ3lCLFVBQVQsRUFBcUI7QUFDbkJ6QixNQUFBQSxJQUFJLENBQUNxQixTQUFMLEdBQWlCLElBQWpCO0FBQ0FyQixNQUFBQSxJQUFJLENBQUN1QixTQUFMLEdBQWlCakIsYUFBTW9CLGNBQXZCO0FBRUE3QyxNQUFBQSxFQUFFLENBQUN1QixNQUFILENBQVV2QixFQUFFLENBQUN5QyxVQUFiO0FBQ0F6QyxNQUFBQSxFQUFFLENBQUMwQyxTQUFILENBQWF2QixJQUFJLENBQUN1QixTQUFsQjtBQUNEOztBQUVEO0FBQ0QsR0EvQndDLENBaUN6Qzs7O0FBQ0EsTUFBSXhCLEdBQUcsQ0FBQ3dCLFNBQUosS0FBa0J2QixJQUFJLENBQUN1QixTQUEzQixFQUFzQztBQUNwQzFDLElBQUFBLEVBQUUsQ0FBQzBDLFNBQUgsQ0FBYXZCLElBQUksQ0FBQ3VCLFNBQWxCO0FBQ0Q7QUFDRjtBQUVEOzs7OztBQUdBLFNBQVNJLG9CQUFULENBQThCOUMsRUFBOUIsRUFBa0NrQixHQUFsQyxFQUF1Q0MsSUFBdkMsRUFBNkM7QUFDM0M7QUFDQSxNQUFJQSxJQUFJLENBQUM0QixXQUFMLEtBQXFCdEIsYUFBTXVCLGVBQS9CLEVBQWdEO0FBQzlDO0FBQ0Q7O0FBRUQsTUFBSTdCLElBQUksQ0FBQzRCLFdBQUwsS0FBcUI3QixHQUFHLENBQUM2QixXQUE3QixFQUEwQztBQUN4QyxRQUFJNUIsSUFBSSxDQUFDNEIsV0FBTCxLQUFxQnRCLGFBQU13QixlQUEvQixFQUFnRDtBQUM5Q2pELE1BQUFBLEVBQUUsQ0FBQ3FCLE9BQUgsQ0FBV3JCLEVBQUUsQ0FBQ2tELFlBQWQ7QUFDQTtBQUNEOztBQUVEbEQsSUFBQUEsRUFBRSxDQUFDdUIsTUFBSCxDQUFVdkIsRUFBRSxDQUFDa0QsWUFBYjs7QUFFQSxRQUFJL0IsSUFBSSxDQUFDZ0MsVUFBVCxFQUFxQjtBQUNuQm5ELE1BQUFBLEVBQUUsQ0FBQ29ELG1CQUFILENBQXVCcEQsRUFBRSxDQUFDcUQsS0FBMUIsRUFBaUNsQyxJQUFJLENBQUNtQyxnQkFBdEMsRUFBd0RuQyxJQUFJLENBQUNvQyxlQUE3RCxFQUE4RXBDLElBQUksQ0FBQ3FDLGdCQUFuRjtBQUNBeEQsTUFBQUEsRUFBRSxDQUFDeUQsbUJBQUgsQ0FBdUJ6RCxFQUFFLENBQUNxRCxLQUExQixFQUFpQ2xDLElBQUksQ0FBQ3VDLHFCQUF0QztBQUNBMUQsTUFBQUEsRUFBRSxDQUFDMkQsaUJBQUgsQ0FBcUIzRCxFQUFFLENBQUNxRCxLQUF4QixFQUErQmxDLElBQUksQ0FBQ3lDLGtCQUFwQyxFQUF3RHpDLElBQUksQ0FBQzBDLG1CQUE3RCxFQUFrRjFDLElBQUksQ0FBQzJDLG1CQUF2RjtBQUNBOUQsTUFBQUEsRUFBRSxDQUFDb0QsbUJBQUgsQ0FBdUJwRCxFQUFFLENBQUMrRCxJQUExQixFQUFnQzVDLElBQUksQ0FBQzZDLGVBQXJDLEVBQXNEN0MsSUFBSSxDQUFDOEMsY0FBM0QsRUFBMkU5QyxJQUFJLENBQUMrQyxlQUFoRjtBQUNBbEUsTUFBQUEsRUFBRSxDQUFDeUQsbUJBQUgsQ0FBdUJ6RCxFQUFFLENBQUMrRCxJQUExQixFQUFnQzVDLElBQUksQ0FBQ2dELG9CQUFyQztBQUNBbkUsTUFBQUEsRUFBRSxDQUFDMkQsaUJBQUgsQ0FBcUIzRCxFQUFFLENBQUMrRCxJQUF4QixFQUE4QjVDLElBQUksQ0FBQ2lELGlCQUFuQyxFQUFzRGpELElBQUksQ0FBQ2tELGtCQUEzRCxFQUErRWxELElBQUksQ0FBQ21ELGtCQUFwRjtBQUNELEtBUEQsTUFPTztBQUNMdEUsTUFBQUEsRUFBRSxDQUFDdUUsV0FBSCxDQUFlcEQsSUFBSSxDQUFDbUMsZ0JBQXBCLEVBQXNDbkMsSUFBSSxDQUFDb0MsZUFBM0MsRUFBNERwQyxJQUFJLENBQUNxQyxnQkFBakU7QUFDQXhELE1BQUFBLEVBQUUsQ0FBQ3dFLFdBQUgsQ0FBZXJELElBQUksQ0FBQ3VDLHFCQUFwQjtBQUNBMUQsTUFBQUEsRUFBRSxDQUFDeUUsU0FBSCxDQUFhdEQsSUFBSSxDQUFDeUMsa0JBQWxCLEVBQXNDekMsSUFBSSxDQUFDMEMsbUJBQTNDLEVBQWdFMUMsSUFBSSxDQUFDMkMsbUJBQXJFO0FBQ0Q7O0FBRUQ7QUFDRCxHQTVCMEMsQ0E4QjNDOzs7QUFDQSxNQUFJM0MsSUFBSSxDQUFDNEIsV0FBTCxLQUFxQnRCLGFBQU13QixlQUEvQixFQUFnRDtBQUM5QztBQUNEOztBQUVELE1BQUkvQixHQUFHLENBQUNpQyxVQUFKLEtBQW1CaEMsSUFBSSxDQUFDZ0MsVUFBNUIsRUFBd0M7QUFDdEMsUUFBSWhDLElBQUksQ0FBQ2dDLFVBQVQsRUFBcUI7QUFDbkJuRCxNQUFBQSxFQUFFLENBQUNvRCxtQkFBSCxDQUF1QnBELEVBQUUsQ0FBQ3FELEtBQTFCLEVBQWlDbEMsSUFBSSxDQUFDbUMsZ0JBQXRDLEVBQXdEbkMsSUFBSSxDQUFDb0MsZUFBN0QsRUFBOEVwQyxJQUFJLENBQUNxQyxnQkFBbkY7QUFDQXhELE1BQUFBLEVBQUUsQ0FBQ3lELG1CQUFILENBQXVCekQsRUFBRSxDQUFDcUQsS0FBMUIsRUFBaUNsQyxJQUFJLENBQUN1QyxxQkFBdEM7QUFDQTFELE1BQUFBLEVBQUUsQ0FBQzJELGlCQUFILENBQXFCM0QsRUFBRSxDQUFDcUQsS0FBeEIsRUFBK0JsQyxJQUFJLENBQUN5QyxrQkFBcEMsRUFBd0R6QyxJQUFJLENBQUMwQyxtQkFBN0QsRUFBa0YxQyxJQUFJLENBQUMyQyxtQkFBdkY7QUFDQTlELE1BQUFBLEVBQUUsQ0FBQ29ELG1CQUFILENBQXVCcEQsRUFBRSxDQUFDK0QsSUFBMUIsRUFBZ0M1QyxJQUFJLENBQUM2QyxlQUFyQyxFQUFzRDdDLElBQUksQ0FBQzhDLGNBQTNELEVBQTJFOUMsSUFBSSxDQUFDK0MsZUFBaEY7QUFDQWxFLE1BQUFBLEVBQUUsQ0FBQ3lELG1CQUFILENBQXVCekQsRUFBRSxDQUFDK0QsSUFBMUIsRUFBZ0M1QyxJQUFJLENBQUNnRCxvQkFBckM7QUFDQW5FLE1BQUFBLEVBQUUsQ0FBQzJELGlCQUFILENBQXFCM0QsRUFBRSxDQUFDK0QsSUFBeEIsRUFBOEI1QyxJQUFJLENBQUNpRCxpQkFBbkMsRUFBc0RqRCxJQUFJLENBQUNrRCxrQkFBM0QsRUFBK0VsRCxJQUFJLENBQUNtRCxrQkFBcEY7QUFDRCxLQVBELE1BT087QUFDTHRFLE1BQUFBLEVBQUUsQ0FBQ3VFLFdBQUgsQ0FBZXBELElBQUksQ0FBQ21DLGdCQUFwQixFQUFzQ25DLElBQUksQ0FBQ29DLGVBQTNDLEVBQTREcEMsSUFBSSxDQUFDcUMsZ0JBQWpFO0FBQ0F4RCxNQUFBQSxFQUFFLENBQUN3RSxXQUFILENBQWVyRCxJQUFJLENBQUN1QyxxQkFBcEI7QUFDQTFELE1BQUFBLEVBQUUsQ0FBQ3lFLFNBQUgsQ0FBYXRELElBQUksQ0FBQ3lDLGtCQUFsQixFQUFzQ3pDLElBQUksQ0FBQzBDLG1CQUEzQyxFQUFnRTFDLElBQUksQ0FBQzJDLG1CQUFyRTtBQUNEOztBQUNEO0FBQ0Q7O0FBRUQsTUFBSTNDLElBQUksQ0FBQ2dDLFVBQVQsRUFBcUI7QUFDbkI7QUFDQSxRQUNFakMsR0FBRyxDQUFDb0MsZ0JBQUosS0FBeUJuQyxJQUFJLENBQUNtQyxnQkFBOUIsSUFDQXBDLEdBQUcsQ0FBQ3FDLGVBQUosS0FBd0JwQyxJQUFJLENBQUNvQyxlQUQ3QixJQUVBckMsR0FBRyxDQUFDc0MsZ0JBQUosS0FBeUJyQyxJQUFJLENBQUNxQyxnQkFIaEMsRUFJRTtBQUNBeEQsTUFBQUEsRUFBRSxDQUFDb0QsbUJBQUgsQ0FBdUJwRCxFQUFFLENBQUNxRCxLQUExQixFQUFpQ2xDLElBQUksQ0FBQ21DLGdCQUF0QyxFQUF3RG5DLElBQUksQ0FBQ29DLGVBQTdELEVBQThFcEMsSUFBSSxDQUFDcUMsZ0JBQW5GO0FBQ0Q7O0FBQ0QsUUFBSXRDLEdBQUcsQ0FBQ3dDLHFCQUFKLEtBQThCdkMsSUFBSSxDQUFDdUMscUJBQXZDLEVBQThEO0FBQzVEMUQsTUFBQUEsRUFBRSxDQUFDeUQsbUJBQUgsQ0FBdUJ6RCxFQUFFLENBQUNxRCxLQUExQixFQUFpQ2xDLElBQUksQ0FBQ3VDLHFCQUF0QztBQUNEOztBQUNELFFBQ0V4QyxHQUFHLENBQUMwQyxrQkFBSixLQUEyQnpDLElBQUksQ0FBQ3lDLGtCQUFoQyxJQUNBMUMsR0FBRyxDQUFDMkMsbUJBQUosS0FBNEIxQyxJQUFJLENBQUMwQyxtQkFEakMsSUFFQTNDLEdBQUcsQ0FBQzRDLG1CQUFKLEtBQTRCM0MsSUFBSSxDQUFDMkMsbUJBSG5DLEVBSUU7QUFDQTlELE1BQUFBLEVBQUUsQ0FBQzJELGlCQUFILENBQXFCM0QsRUFBRSxDQUFDcUQsS0FBeEIsRUFBK0JsQyxJQUFJLENBQUN5QyxrQkFBcEMsRUFBd0R6QyxJQUFJLENBQUMwQyxtQkFBN0QsRUFBa0YxQyxJQUFJLENBQUMyQyxtQkFBdkY7QUFDRCxLQWxCa0IsQ0FvQm5COzs7QUFDQSxRQUNFNUMsR0FBRyxDQUFDOEMsZUFBSixLQUF3QjdDLElBQUksQ0FBQzZDLGVBQTdCLElBQ0E5QyxHQUFHLENBQUMrQyxjQUFKLEtBQXVCOUMsSUFBSSxDQUFDOEMsY0FENUIsSUFFQS9DLEdBQUcsQ0FBQ2dELGVBQUosS0FBd0IvQyxJQUFJLENBQUMrQyxlQUgvQixFQUlFO0FBQ0FsRSxNQUFBQSxFQUFFLENBQUNvRCxtQkFBSCxDQUF1QnBELEVBQUUsQ0FBQytELElBQTFCLEVBQWdDNUMsSUFBSSxDQUFDNkMsZUFBckMsRUFBc0Q3QyxJQUFJLENBQUM4QyxjQUEzRCxFQUEyRTlDLElBQUksQ0FBQytDLGVBQWhGO0FBQ0Q7O0FBQ0QsUUFBSWhELEdBQUcsQ0FBQ2lELG9CQUFKLEtBQTZCaEQsSUFBSSxDQUFDZ0Qsb0JBQXRDLEVBQTREO0FBQzFEbkUsTUFBQUEsRUFBRSxDQUFDeUQsbUJBQUgsQ0FBdUJ6RCxFQUFFLENBQUMrRCxJQUExQixFQUFnQzVDLElBQUksQ0FBQ2dELG9CQUFyQztBQUNEOztBQUNELFFBQ0VqRCxHQUFHLENBQUNrRCxpQkFBSixLQUEwQmpELElBQUksQ0FBQ2lELGlCQUEvQixJQUNBbEQsR0FBRyxDQUFDbUQsa0JBQUosS0FBMkJsRCxJQUFJLENBQUNrRCxrQkFEaEMsSUFFQW5ELEdBQUcsQ0FBQ29ELGtCQUFKLEtBQTJCbkQsSUFBSSxDQUFDbUQsa0JBSGxDLEVBSUU7QUFDQXRFLE1BQUFBLEVBQUUsQ0FBQzJELGlCQUFILENBQXFCM0QsRUFBRSxDQUFDK0QsSUFBeEIsRUFBOEI1QyxJQUFJLENBQUNpRCxpQkFBbkMsRUFBc0RqRCxJQUFJLENBQUNrRCxrQkFBM0QsRUFBK0VsRCxJQUFJLENBQUNtRCxrQkFBcEY7QUFDRDtBQUNGLEdBdENELE1Bc0NPO0FBQ0wsUUFDRXBELEdBQUcsQ0FBQ29DLGdCQUFKLEtBQXlCbkMsSUFBSSxDQUFDbUMsZ0JBQTlCLElBQ0FwQyxHQUFHLENBQUNxQyxlQUFKLEtBQXdCcEMsSUFBSSxDQUFDb0MsZUFEN0IsSUFFQXJDLEdBQUcsQ0FBQ3NDLGdCQUFKLEtBQXlCckMsSUFBSSxDQUFDcUMsZ0JBSGhDLEVBSUU7QUFDQXhELE1BQUFBLEVBQUUsQ0FBQ3VFLFdBQUgsQ0FBZXBELElBQUksQ0FBQ21DLGdCQUFwQixFQUFzQ25DLElBQUksQ0FBQ29DLGVBQTNDLEVBQTREcEMsSUFBSSxDQUFDcUMsZ0JBQWpFO0FBQ0Q7O0FBQ0QsUUFBSXRDLEdBQUcsQ0FBQ3dDLHFCQUFKLEtBQThCdkMsSUFBSSxDQUFDdUMscUJBQXZDLEVBQThEO0FBQzVEMUQsTUFBQUEsRUFBRSxDQUFDd0UsV0FBSCxDQUFlckQsSUFBSSxDQUFDdUMscUJBQXBCO0FBQ0Q7O0FBQ0QsUUFDRXhDLEdBQUcsQ0FBQzBDLGtCQUFKLEtBQTJCekMsSUFBSSxDQUFDeUMsa0JBQWhDLElBQ0ExQyxHQUFHLENBQUMyQyxtQkFBSixLQUE0QjFDLElBQUksQ0FBQzBDLG1CQURqQyxJQUVBM0MsR0FBRyxDQUFDNEMsbUJBQUosS0FBNEIzQyxJQUFJLENBQUMyQyxtQkFIbkMsRUFJRTtBQUNBOUQsTUFBQUEsRUFBRSxDQUFDeUUsU0FBSCxDQUFhdEQsSUFBSSxDQUFDeUMsa0JBQWxCLEVBQXNDekMsSUFBSSxDQUFDMEMsbUJBQTNDLEVBQWdFMUMsSUFBSSxDQUFDMkMsbUJBQXJFO0FBQ0Q7QUFDRjtBQUVGO0FBRUQ7Ozs7O0FBR0EsU0FBU1ksZUFBVCxDQUF5QjFFLEVBQXpCLEVBQTZCa0IsR0FBN0IsRUFBa0NDLElBQWxDLEVBQXdDO0FBQ3RDLE1BQUlELEdBQUcsQ0FBQ3lELFFBQUosS0FBaUJ4RCxJQUFJLENBQUN3RCxRQUExQixFQUFvQztBQUNsQztBQUNEOztBQUVELE1BQUl4RCxJQUFJLENBQUN3RCxRQUFMLEtBQWtCbEQsYUFBTW1ELFNBQTVCLEVBQXVDO0FBQ3JDNUUsSUFBQUEsRUFBRSxDQUFDcUIsT0FBSCxDQUFXckIsRUFBRSxDQUFDNkUsU0FBZDtBQUNBO0FBQ0Q7O0FBRUQ3RSxFQUFBQSxFQUFFLENBQUN1QixNQUFILENBQVV2QixFQUFFLENBQUM2RSxTQUFiO0FBQ0E3RSxFQUFBQSxFQUFFLENBQUM4RSxRQUFILENBQVkzRCxJQUFJLENBQUN3RCxRQUFqQjtBQUNEO0FBRUQ7Ozs7O0FBR0EsU0FBU0ksb0JBQVQsQ0FBOEJDLE1BQTlCLEVBQXNDaEYsRUFBdEMsRUFBMENrQixHQUExQyxFQUErQ0MsSUFBL0MsRUFBcUQ7QUFDbkQsTUFBSThELFVBQVUsR0FBRyxLQUFqQixDQURtRCxDQUduRDs7QUFDQSxNQUFJOUQsSUFBSSxDQUFDK0QsU0FBTCxLQUFtQixDQUFDLENBQXhCLEVBQTJCO0FBQ3pCO0FBQ0Q7O0FBRUQsTUFBSWhFLEdBQUcsQ0FBQ2dFLFNBQUosS0FBa0IvRCxJQUFJLENBQUMrRCxTQUEzQixFQUFzQztBQUNwQ0QsSUFBQUEsVUFBVSxHQUFHLElBQWI7QUFDRCxHQUZELE1BRU8sSUFBSS9ELEdBQUcsQ0FBQ2lFLE9BQUosS0FBZ0JoRSxJQUFJLENBQUNnRSxPQUF6QixFQUFrQztBQUN2Q0YsSUFBQUEsVUFBVSxHQUFHLElBQWI7QUFDRCxHQUZNLE1BRUE7QUFDTCxTQUFLLElBQUlHLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdqRSxJQUFJLENBQUMrRCxTQUFMLEdBQWlCLENBQXJDLEVBQXdDLEVBQUVFLENBQTFDLEVBQTZDO0FBQzNDLFVBQ0VsRSxHQUFHLENBQUNtRSxhQUFKLENBQWtCRCxDQUFsQixNQUF5QmpFLElBQUksQ0FBQ2tFLGFBQUwsQ0FBbUJELENBQW5CLENBQXpCLElBQ0FsRSxHQUFHLENBQUNvRSxtQkFBSixDQUF3QkYsQ0FBeEIsTUFBK0JqRSxJQUFJLENBQUNtRSxtQkFBTCxDQUF5QkYsQ0FBekIsQ0FGakMsRUFHRTtBQUNBSCxRQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBO0FBQ0Q7QUFDRjtBQUNGOztBQUVELE1BQUlBLFVBQUosRUFBZ0I7QUFDZCxTQUFLLElBQUlHLEVBQUMsR0FBRyxDQUFiLEVBQWdCQSxFQUFDLEdBQUdKLE1BQU0sQ0FBQ08sS0FBUCxDQUFhQyxnQkFBakMsRUFBbUQsRUFBRUosRUFBckQsRUFBd0Q7QUFDdERKLE1BQUFBLE1BQU0sQ0FBQ1MsY0FBUCxDQUFzQkwsRUFBdEIsSUFBMkIsQ0FBM0I7QUFDRDs7QUFFRCxTQUFLLElBQUlBLEdBQUMsR0FBRyxDQUFiLEVBQWdCQSxHQUFDLEdBQUdqRSxJQUFJLENBQUMrRCxTQUFMLEdBQWlCLENBQXJDLEVBQXdDLEVBQUVFLEdBQTFDLEVBQTZDO0FBQzNDLFVBQUlNLEVBQUUsR0FBR3ZFLElBQUksQ0FBQ2tFLGFBQUwsQ0FBbUJELEdBQW5CLENBQVQ7QUFDQSxVQUFJTyxRQUFRLEdBQUd4RSxJQUFJLENBQUNtRSxtQkFBTCxDQUF5QkYsR0FBekIsQ0FBZjs7QUFDQSxVQUFJLENBQUNNLEVBQUQsSUFBT0EsRUFBRSxDQUFDRSxLQUFILEtBQWEsQ0FBQyxDQUF6QixFQUE0QjtBQUMxQjtBQUNEOztBQUVENUYsTUFBQUEsRUFBRSxDQUFDNkYsVUFBSCxDQUFjN0YsRUFBRSxDQUFDOEYsWUFBakIsRUFBK0JKLEVBQUUsQ0FBQ0UsS0FBbEM7O0FBRUEsV0FBSyxJQUFJRyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHNUUsSUFBSSxDQUFDZ0UsT0FBTCxDQUFhYSxXQUFiLENBQXlCQyxNQUE3QyxFQUFxRCxFQUFFRixDQUF2RCxFQUEwRDtBQUN4RCxZQUFJRyxJQUFJLEdBQUcvRSxJQUFJLENBQUNnRSxPQUFMLENBQWFhLFdBQWIsQ0FBeUJELENBQXpCLENBQVg7O0FBRUEsWUFBSUksRUFBRSxHQUFHVCxFQUFFLENBQUNVLE9BQUgsQ0FBV0MsT0FBWCxDQUFtQkgsSUFBSSxDQUFDSSxJQUF4QixDQUFUOztBQUNBLFlBQUksQ0FBQ0gsRUFBTCxFQUFTO0FBQ1BJLFVBQUFBLE9BQU8sQ0FBQ0MsSUFBUixxQ0FBK0NOLElBQUksQ0FBQ0ksSUFBcEQ7QUFDQTtBQUNEOztBQUVELFlBQUl0QixNQUFNLENBQUN5QixrQkFBUCxDQUEwQlAsSUFBSSxDQUFDUSxRQUEvQixNQUE2QyxDQUFqRCxFQUFvRDtBQUNsRDFHLFVBQUFBLEVBQUUsQ0FBQzJHLHVCQUFILENBQTJCVCxJQUFJLENBQUNRLFFBQWhDO0FBQ0ExQixVQUFBQSxNQUFNLENBQUN5QixrQkFBUCxDQUEwQlAsSUFBSSxDQUFDUSxRQUEvQixJQUEyQyxDQUEzQztBQUNEOztBQUNEMUIsUUFBQUEsTUFBTSxDQUFDUyxjQUFQLENBQXNCUyxJQUFJLENBQUNRLFFBQTNCLElBQXVDLENBQXZDO0FBRUExRyxRQUFBQSxFQUFFLENBQUM0RyxtQkFBSCxDQUNFVixJQUFJLENBQUNRLFFBRFAsRUFFRVAsRUFBRSxDQUFDVSxHQUZMLEVBR0VWLEVBQUUsQ0FBQ1csSUFITCxFQUlFWCxFQUFFLENBQUNZLFNBSkwsRUFLRVosRUFBRSxDQUFDYSxNQUxMLEVBTUViLEVBQUUsQ0FBQ2MsTUFBSCxHQUFZdEIsUUFBUSxHQUFHUSxFQUFFLENBQUNhLE1BTjVCO0FBUUQ7QUFDRixLQXRDYSxDQXdDZDs7O0FBQ0EsU0FBSyxJQUFJNUIsR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBR0osTUFBTSxDQUFDTyxLQUFQLENBQWFDLGdCQUFqQyxFQUFtRCxFQUFFSixHQUFyRCxFQUF3RDtBQUN0RCxVQUFJSixNQUFNLENBQUN5QixrQkFBUCxDQUEwQnJCLEdBQTFCLE1BQWlDSixNQUFNLENBQUNTLGNBQVAsQ0FBc0JMLEdBQXRCLENBQXJDLEVBQStEO0FBQzdEcEYsUUFBQUEsRUFBRSxDQUFDa0gsd0JBQUgsQ0FBNEI5QixHQUE1QjtBQUNBSixRQUFBQSxNQUFNLENBQUN5QixrQkFBUCxDQUEwQnJCLEdBQTFCLElBQStCLENBQS9CO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUFFRDs7Ozs7QUFHQSxTQUFTK0IsZUFBVCxDQUF5Qm5ILEVBQXpCLEVBQTZCa0IsR0FBN0IsRUFBa0NDLElBQWxDLEVBQXdDO0FBQ3RDLE9BQUssSUFBSWlFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdqRSxJQUFJLENBQUNpRyxjQUFMLEdBQXNCLENBQTFDLEVBQTZDLEVBQUVoQyxDQUEvQyxFQUFrRDtBQUNoRCxRQUFJbEUsR0FBRyxDQUFDbUcsWUFBSixDQUFpQmpDLENBQWpCLE1BQXdCakUsSUFBSSxDQUFDa0csWUFBTCxDQUFrQmpDLENBQWxCLENBQTVCLEVBQWtEO0FBQ2hELFVBQUlrQyxPQUFPLEdBQUduRyxJQUFJLENBQUNrRyxZQUFMLENBQWtCakMsQ0FBbEIsQ0FBZDs7QUFDQSxVQUFJa0MsT0FBTyxJQUFJQSxPQUFPLENBQUMxQixLQUFSLEtBQWtCLENBQUMsQ0FBbEMsRUFBcUM7QUFDbkM1RixRQUFBQSxFQUFFLENBQUN1SCxhQUFILENBQWlCdkgsRUFBRSxDQUFDd0gsUUFBSCxHQUFjcEMsQ0FBL0I7QUFDQXBGLFFBQUFBLEVBQUUsQ0FBQ3lILFdBQUgsQ0FBZUgsT0FBTyxDQUFDSSxPQUF2QixFQUFnQ0osT0FBTyxDQUFDMUIsS0FBeEM7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUVEOzs7OztBQUdBLFNBQVMrQixPQUFULENBQWlCM0gsRUFBakIsRUFBcUIwRyxRQUFyQixFQUErQmtCLFVBQS9CLEVBQTJDQyxJQUEzQyxFQUFxRDtBQUFBLE1BQVZBLElBQVU7QUFBVkEsSUFBQUEsSUFBVSxHQUFILENBQUc7QUFBQTs7QUFDbkQsTUFBSUQsVUFBVSxZQUFZRSxxQkFBMUIsRUFBcUM7QUFDbkM5SCxJQUFBQSxFQUFFLENBQUMrSCxvQkFBSCxDQUNFL0gsRUFBRSxDQUFDZ0ksV0FETCxFQUVFdEIsUUFGRixFQUdFMUcsRUFBRSxDQUFDaUksVUFITCxFQUlFTCxVQUFVLENBQUNoQyxLQUpiLEVBS0UsQ0FMRjtBQU9ELEdBUkQsTUFRTyxJQUFJZ0MsVUFBVSxZQUFZTSx1QkFBMUIsRUFBdUM7QUFDNUNsSSxJQUFBQSxFQUFFLENBQUMrSCxvQkFBSCxDQUNFL0gsRUFBRSxDQUFDZ0ksV0FETCxFQUVFdEIsUUFGRixFQUdFMUcsRUFBRSxDQUFDbUksMkJBQUgsR0FBaUNOLElBSG5DLEVBSUVELFVBQVUsQ0FBQ2hDLEtBSmIsRUFLRSxDQUxGO0FBT0QsR0FSTSxNQVFBO0FBQ0w1RixJQUFBQSxFQUFFLENBQUNvSSx1QkFBSCxDQUNFcEksRUFBRSxDQUFDZ0ksV0FETCxFQUVFdEIsUUFGRixFQUdFMUcsRUFBRSxDQUFDcUksWUFITCxFQUlFVCxVQUFVLENBQUNoQyxLQUpiO0FBTUQ7QUFDRjs7SUFFb0IwQzs7OztBQUNuQjs7O3dCQUdXO0FBQ1QsYUFBTyxLQUFLL0MsS0FBWjtBQUNEO0FBRUQ7Ozs7Ozs7QUFJQSxrQkFBWWdELFFBQVosRUFBc0JDLElBQXRCLEVBQTRCO0FBQzFCLFFBQUl4SSxFQUFKLENBRDBCLENBRzFCOztBQUNBd0ksSUFBQUEsSUFBSSxHQUFHQSxJQUFJLElBQUksRUFBZjs7QUFDQSxRQUFJQSxJQUFJLENBQUNDLEtBQUwsS0FBZUMsU0FBbkIsRUFBOEI7QUFDNUJGLE1BQUFBLElBQUksQ0FBQ0MsS0FBTCxHQUFhLEtBQWI7QUFDRDs7QUFDRCxRQUFJRCxJQUFJLENBQUNHLE9BQUwsS0FBaUJELFNBQXJCLEVBQWdDO0FBQzlCRixNQUFBQSxJQUFJLENBQUNHLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7O0FBQ0QsUUFBSUgsSUFBSSxDQUFDSSxLQUFMLEtBQWVGLFNBQW5CLEVBQThCO0FBQzVCRixNQUFBQSxJQUFJLENBQUNJLEtBQUwsR0FBYSxJQUFiO0FBQ0Q7O0FBQ0QsUUFBSUosSUFBSSxDQUFDSyxTQUFMLEtBQW1CSCxTQUF2QixFQUFrQztBQUNoQ0YsTUFBQUEsSUFBSSxDQUFDSyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0QsS0FoQnlCLENBaUIxQjs7O0FBQ0EsUUFBSUwsSUFBSSxDQUFDTSxxQkFBTCxLQUErQkosU0FBbkMsRUFBOEM7QUFDNUNGLE1BQUFBLElBQUksQ0FBQ00scUJBQUwsR0FBNkIsS0FBN0I7QUFDRDs7QUFFRCxRQUFJO0FBQ0Y5SSxNQUFBQSxFQUFFLEdBQUd1SSxRQUFRLENBQUNRLFVBQVQsQ0FBb0IsT0FBcEIsRUFBNkJQLElBQTdCLEtBQ0FELFFBQVEsQ0FBQ1EsVUFBVCxDQUFvQixvQkFBcEIsRUFBMENQLElBQTFDLENBREEsSUFFQUQsUUFBUSxDQUFDUSxVQUFULENBQW9CLFdBQXBCLEVBQWlDUCxJQUFqQyxDQUZBLElBR0FELFFBQVEsQ0FBQ1EsVUFBVCxDQUFvQixXQUFwQixFQUFpQ1AsSUFBakMsQ0FITDtBQUlELEtBTEQsQ0FLRSxPQUFPUSxHQUFQLEVBQVk7QUFDWnpDLE1BQUFBLE9BQU8sQ0FBQzBDLEtBQVIsQ0FBY0QsR0FBZDtBQUNBO0FBQ0QsS0E5QnlCLENBZ0MxQjtBQUNBOzs7QUFDQSxRQUFJLENBQUNoSixFQUFMLEVBQVM7QUFDUHVHLE1BQUFBLE9BQU8sQ0FBQzBDLEtBQVIsQ0FBYyxvQ0FBZDtBQUNELEtBcEN5QixDQXNDMUI7O0FBQ0E7Ozs7O0FBR0EsU0FBS0MsR0FBTCxHQUFXbEosRUFBWDtBQUNBLFNBQUttSixXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsU0FBSzVELEtBQUwsR0FBYSxFQUFiLENBNUMwQixDQTRDVDs7QUFDakIsU0FBSzZELE1BQUwsR0FBYztBQUNaOUIsTUFBQUEsT0FBTyxFQUFFLENBREc7QUFFWjVCLE1BQUFBLEVBQUUsRUFBRSxDQUZRO0FBR1oyRCxNQUFBQSxFQUFFLEVBQUUsQ0FIUTtBQUlaQyxNQUFBQSxTQUFTLEVBQUU7QUFKQyxLQUFkLENBN0MwQixDQW9EMUI7O0FBQ0EsU0FBS0MsZUFBTCxDQUFxQixDQUNuQixnQ0FEbUIsRUFFbkIsd0JBRm1CLEVBR25CLDBCQUhtQixFQUluQixtQkFKbUIsRUFLbkIsMEJBTG1CLEVBTW5CLHdCQU5tQixFQU9uQiwrQkFQbUIsRUFRbkIseUJBUm1CLEVBU25CLDhCQVRtQixFQVVuQiw4QkFWbUIsRUFXbkIsK0JBWG1CLEVBWW5CLGdDQVptQixFQWFuQiwrQkFibUIsRUFjbkIscUJBZG1CLEVBZW5CLG9CQWZtQixDQUFyQjs7QUFpQkEsU0FBS0MsU0FBTDs7QUFDQSxTQUFLQyxXQUFMLEdBdkUwQixDQXlFMUI7OztBQUNBQyxzQkFBTUMsV0FBTixDQUFrQixJQUFsQjs7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLElBQUlGLGlCQUFKLENBQVUsSUFBVixDQUFoQjtBQUNBLFNBQUtHLEtBQUwsR0FBYSxJQUFJSCxpQkFBSixDQUFVLElBQVYsQ0FBYjtBQUNBLFNBQUtJLFNBQUwsR0FBaUIsRUFBakIsQ0E3RTBCLENBNkVMOztBQUNyQixTQUFLQyxHQUFMLEdBQVcsS0FBS0MsR0FBTCxHQUFXLEtBQUtDLEdBQUwsR0FBVyxLQUFLQyxHQUFMLEdBQVcsQ0FBNUM7QUFDQSxTQUFLQyxHQUFMLEdBQVcsS0FBS0MsR0FBTCxHQUFXLEtBQUtDLEdBQUwsR0FBVyxLQUFLQyxHQUFMLEdBQVcsQ0FBNUM7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLElBQXBCLENBaEYwQixDQWtGMUI7O0FBQ0EsU0FBSzlELGtCQUFMLEdBQTBCLElBQUkrRCxLQUFKLENBQVUsS0FBS2pGLEtBQUwsQ0FBV0MsZ0JBQXJCLENBQTFCO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQixJQUFJK0UsS0FBSixDQUFVLEtBQUtqRixLQUFMLENBQVdDLGdCQUFyQixDQUF0Qjs7QUFFQSxTQUFLLElBQUlKLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS0csS0FBTCxDQUFXQyxnQkFBL0IsRUFBaUQsRUFBRUosQ0FBbkQsRUFBc0Q7QUFDcEQsV0FBS3FCLGtCQUFMLENBQXdCckIsQ0FBeEIsSUFBNkIsQ0FBN0I7QUFDQSxXQUFLSyxjQUFMLENBQW9CTCxDQUFwQixJQUF5QixDQUF6QjtBQUNEO0FBQ0Y7Ozs7U0FFRG1FLGtCQUFBLHlCQUFnQmtCLFVBQWhCLEVBQTRCO0FBQzFCLFFBQU16SyxFQUFFLEdBQUcsS0FBS2tKLEdBQWhCOztBQUVBLFNBQUssSUFBSTlELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdxRixVQUFVLENBQUN4RSxNQUEvQixFQUF1QyxFQUFFYixDQUF6QyxFQUE0QztBQUMxQyxVQUFJa0IsSUFBSSxHQUFHbUUsVUFBVSxDQUFDckYsQ0FBRCxDQUFyQjtBQUNBLFVBQUlzRixjQUFjLEdBQUcsQ0FBQyxFQUFELEVBQUssU0FBTCxFQUFnQixNQUFoQixDQUFyQjs7QUFFQSxXQUFLLElBQUkzRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHMkUsY0FBYyxDQUFDekUsTUFBbkMsRUFBMkNGLENBQUMsRUFBNUMsRUFBZ0Q7QUFDOUMsWUFBSTtBQUNGLGNBQUk0RSxHQUFHLEdBQUczSyxFQUFFLENBQUM0SyxZQUFILENBQWdCRixjQUFjLENBQUMzRSxDQUFELENBQWQsR0FBb0JPLElBQXBDLENBQVY7O0FBQ0EsY0FBSXFFLEdBQUosRUFBUztBQUNQLGlCQUFLeEIsV0FBTCxDQUFpQjdDLElBQWpCLElBQXlCcUUsR0FBekI7QUFDQTtBQUNEO0FBQ0YsU0FORCxDQU1FLE9BQU9FLENBQVAsRUFBVTtBQUNWdEUsVUFBQUEsT0FBTyxDQUFDMEMsS0FBUixDQUFjNEIsQ0FBZDtBQUNEO0FBQ0Y7QUFDRjtBQUNGOztTQUVEckIsWUFBQSxxQkFBWTtBQUNWLFFBQU14SixFQUFFLEdBQUcsS0FBS2tKLEdBQWhCO0FBQ0EsUUFBTTRCLGNBQWMsR0FBRyxLQUFLSCxHQUFMLENBQVMsb0JBQVQsQ0FBdkI7QUFFQSxTQUFLcEYsS0FBTCxDQUFXd0YsZ0JBQVgsR0FBOEIsQ0FBOUI7QUFDQSxTQUFLeEYsS0FBTCxDQUFXeUYsaUJBQVgsR0FBK0JoTCxFQUFFLENBQUNpTCxZQUFILENBQWdCakwsRUFBRSxDQUFDa0wsOEJBQW5CLENBQS9CO0FBQ0EsU0FBSzNGLEtBQUwsQ0FBVzRGLGVBQVgsR0FBNkJuTCxFQUFFLENBQUNpTCxZQUFILENBQWdCakwsRUFBRSxDQUFDb0wsNEJBQW5CLENBQTdCO0FBQ0EsU0FBSzdGLEtBQUwsQ0FBVzhGLGVBQVgsR0FBNkJyTCxFQUFFLENBQUNpTCxZQUFILENBQWdCakwsRUFBRSxDQUFDc0wsdUJBQW5CLENBQTdCO0FBQ0EsU0FBSy9GLEtBQUwsQ0FBV0MsZ0JBQVgsR0FBOEJ4RixFQUFFLENBQUNpTCxZQUFILENBQWdCakwsRUFBRSxDQUFDdUwsa0JBQW5CLENBQTlCO0FBQ0EsU0FBS2hHLEtBQUwsQ0FBV2lHLGNBQVgsR0FBNEJ4TCxFQUFFLENBQUNpTCxZQUFILENBQWdCakwsRUFBRSxDQUFDeUwsZ0JBQW5CLENBQTVCO0FBRUEsU0FBS2xHLEtBQUwsQ0FBV21HLGNBQVgsR0FBNEJaLGNBQWMsR0FBRzlLLEVBQUUsQ0FBQ2lMLFlBQUgsQ0FBZ0JILGNBQWMsQ0FBQ2Esc0JBQS9CLENBQUgsR0FBNEQsQ0FBdEc7QUFDQSxTQUFLcEcsS0FBTCxDQUFXcUcsbUJBQVgsR0FBaUNkLGNBQWMsR0FBRzlLLEVBQUUsQ0FBQ2lMLFlBQUgsQ0FBZ0JILGNBQWMsQ0FBQ2UsMkJBQS9CLENBQUgsR0FBaUUsQ0FBaEg7QUFDRDs7U0FFRHBDLGNBQUEsdUJBQWM7QUFDWixRQUFNekosRUFBRSxHQUFHLEtBQUtrSixHQUFoQixDQURZLENBR1o7O0FBQ0FsSixJQUFBQSxFQUFFLENBQUNxQixPQUFILENBQVdyQixFQUFFLENBQUNzQixLQUFkO0FBQ0F0QixJQUFBQSxFQUFFLENBQUNxQyxTQUFILENBQWFyQyxFQUFFLENBQUM4TCxHQUFoQixFQUFxQjlMLEVBQUUsQ0FBQytMLElBQXhCO0FBQ0EvTCxJQUFBQSxFQUFFLENBQUNzQyxhQUFILENBQWlCdEMsRUFBRSxDQUFDZ00sUUFBcEI7QUFDQWhNLElBQUFBLEVBQUUsQ0FBQzZCLFVBQUgsQ0FBYyxDQUFkLEVBQWdCLENBQWhCLEVBQWtCLENBQWxCLEVBQW9CLENBQXBCO0FBRUE3QixJQUFBQSxFQUFFLENBQUNpTSxTQUFILENBQWEsSUFBYixFQUFtQixJQUFuQixFQUF5QixJQUF6QixFQUErQixJQUEvQjtBQUVBak0sSUFBQUEsRUFBRSxDQUFDdUIsTUFBSCxDQUFVdkIsRUFBRSxDQUFDNkUsU0FBYjtBQUNBN0UsSUFBQUEsRUFBRSxDQUFDOEUsUUFBSCxDQUFZOUUsRUFBRSxDQUFDK0QsSUFBZjtBQUVBL0QsSUFBQUEsRUFBRSxDQUFDcUIsT0FBSCxDQUFXckIsRUFBRSxDQUFDeUMsVUFBZDtBQUNBekMsSUFBQUEsRUFBRSxDQUFDMEMsU0FBSCxDQUFhMUMsRUFBRSxDQUFDa00sSUFBaEI7QUFDQWxNLElBQUFBLEVBQUUsQ0FBQzJDLFNBQUgsQ0FBYSxLQUFiO0FBQ0EzQyxJQUFBQSxFQUFFLENBQUNxQixPQUFILENBQVdyQixFQUFFLENBQUNtTSxtQkFBZDtBQUNBbk0sSUFBQUEsRUFBRSxDQUFDb00sVUFBSCxDQUFjLENBQWQsRUFBZ0IsQ0FBaEI7QUFFQXBNLElBQUFBLEVBQUUsQ0FBQ3FCLE9BQUgsQ0FBV3JCLEVBQUUsQ0FBQ2tELFlBQWQ7QUFDQWxELElBQUFBLEVBQUUsQ0FBQ3VFLFdBQUgsQ0FBZXZFLEVBQUUsQ0FBQ3FNLE1BQWxCLEVBQTBCLENBQTFCLEVBQTZCLElBQTdCO0FBQ0FyTSxJQUFBQSxFQUFFLENBQUN3RSxXQUFILENBQWUsSUFBZjtBQUNBeEUsSUFBQUEsRUFBRSxDQUFDeUUsU0FBSCxDQUFhekUsRUFBRSxDQUFDc00sSUFBaEIsRUFBc0J0TSxFQUFFLENBQUNzTSxJQUF6QixFQUErQnRNLEVBQUUsQ0FBQ3NNLElBQWxDLEVBdkJZLENBeUJaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUF0TSxJQUFBQSxFQUFFLENBQUN1TSxVQUFILENBQWMsQ0FBZDtBQUNBdk0sSUFBQUEsRUFBRSxDQUFDd00sVUFBSCxDQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkI7QUFDQXhNLElBQUFBLEVBQUUsQ0FBQ3lNLFlBQUgsQ0FBZ0IsQ0FBaEI7QUFFQXpNLElBQUFBLEVBQUUsQ0FBQ3FCLE9BQUgsQ0FBV3JCLEVBQUUsQ0FBQzBNLFlBQWQ7QUFDRDs7U0FFREMsa0JBQUEseUJBQWdCQyxJQUFoQixFQUFzQjtBQUNwQixRQUFNNU0sRUFBRSxHQUFHLEtBQUtrSixHQUFoQjtBQUVBLFFBQUk1QixPQUFPLEdBQUcsS0FBS3NDLFFBQUwsQ0FBY3ZDLFlBQWQsQ0FBMkJ1RixJQUEzQixDQUFkOztBQUNBLFFBQUl0RixPQUFPLElBQUlBLE9BQU8sQ0FBQzFCLEtBQVIsS0FBa0IsQ0FBQyxDQUFsQyxFQUFxQztBQUNuQzVGLE1BQUFBLEVBQUUsQ0FBQ3lILFdBQUgsQ0FBZUgsT0FBTyxDQUFDSSxPQUF2QixFQUFnQ0osT0FBTyxDQUFDMUIsS0FBeEM7QUFDRCxLQUZELE1BRU87QUFDTDVGLE1BQUFBLEVBQUUsQ0FBQ3lILFdBQUgsQ0FBZXpILEVBQUUsQ0FBQ2lJLFVBQWxCLEVBQThCLElBQTlCO0FBQ0Q7QUFDRjs7U0FFRDRFLHNCQUFBLCtCQUF1QjtBQUNyQixRQUFNN00sRUFBRSxHQUFHLEtBQUtrSixHQUFoQjtBQUVBLFFBQUlHLEVBQUUsR0FBRyxLQUFLTyxRQUFMLENBQWNrRCxXQUF2Qjs7QUFDQSxRQUFJekQsRUFBRSxJQUFJQSxFQUFFLENBQUN6RCxLQUFILEtBQWEsQ0FBQyxDQUF4QixFQUEyQjtBQUN6QjVGLE1BQUFBLEVBQUUsQ0FBQzZGLFVBQUgsQ0FBYzdGLEVBQUUsQ0FBQytNLG9CQUFqQixFQUF1QzFELEVBQUUsQ0FBQ3pELEtBQTFDO0FBQ0QsS0FGRCxNQUdLO0FBQ0g1RixNQUFBQSxFQUFFLENBQUM2RixVQUFILENBQWM3RixFQUFFLENBQUMrTSxvQkFBakIsRUFBdUMsSUFBdkM7QUFDRDtBQUNGO0FBRUQ7Ozs7OztTQUlBcEMsTUFBQSxhQUFJckUsSUFBSixFQUFVO0FBQ1IsV0FBTyxLQUFLNkMsV0FBTCxDQUFpQjdDLElBQWpCLENBQVA7QUFDRDs7U0FFRDBHLG9CQUFBLDZCQUFvQjtBQUNsQixXQUFPLEtBQUtyQyxHQUFMLENBQVMsbUJBQVQsS0FBaUMsSUFBeEM7QUFDRCxJQUVEO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7O1NBSUFzQyxpQkFBQSx3QkFBZUMsRUFBZixFQUFtQjtBQUNqQixRQUFJLEtBQUszQyxZQUFMLEtBQXNCMkMsRUFBMUIsRUFBOEI7QUFDNUI7QUFDRDs7QUFFRCxTQUFLM0MsWUFBTCxHQUFvQjJDLEVBQXBCO0FBQ0EsUUFBTWxOLEVBQUUsR0FBRyxLQUFLa0osR0FBaEI7O0FBRUEsUUFBSSxDQUFDZ0UsRUFBTCxFQUFTO0FBQ1BsTixNQUFBQSxFQUFFLENBQUNtTixlQUFILENBQW1Cbk4sRUFBRSxDQUFDZ0ksV0FBdEIsRUFBbUMsSUFBbkM7QUFDQTtBQUNEOztBQUVEaEksSUFBQUEsRUFBRSxDQUFDbU4sZUFBSCxDQUFtQm5OLEVBQUUsQ0FBQ2dJLFdBQXRCLEVBQW1Da0YsRUFBRSxDQUFDdEgsS0FBdEM7QUFFQSxRQUFJd0gsU0FBUyxHQUFHRixFQUFFLENBQUNHLE9BQUgsQ0FBV3BILE1BQTNCOztBQUNBLFNBQUssSUFBSWIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2dJLFNBQXBCLEVBQStCLEVBQUVoSSxDQUFqQyxFQUFvQztBQUNsQyxVQUFJa0ksV0FBVyxHQUFHSixFQUFFLENBQUNHLE9BQUgsQ0FBV2pJLENBQVgsQ0FBbEI7O0FBQ0F1QyxNQUFBQSxPQUFPLENBQUMzSCxFQUFELEVBQUtBLEVBQUUsQ0FBQ3VOLGlCQUFILEdBQXVCbkksQ0FBNUIsRUFBK0JrSSxXQUEvQixDQUFQLENBRmtDLENBSWxDOztBQUNEOztBQUNELFNBQUssSUFBSWxJLEdBQUMsR0FBR2dJLFNBQWIsRUFBd0JoSSxHQUFDLEdBQUcsS0FBS0csS0FBTCxDQUFXcUcsbUJBQXZDLEVBQTRELEVBQUV4RyxHQUE5RCxFQUFpRTtBQUMvRHBGLE1BQUFBLEVBQUUsQ0FBQytILG9CQUFILENBQ0UvSCxFQUFFLENBQUNnSSxXQURMLEVBRUVoSSxFQUFFLENBQUN1TixpQkFBSCxHQUF1Qm5JLEdBRnpCLEVBR0VwRixFQUFFLENBQUNpSSxVQUhMLEVBSUUsSUFKRixFQUtFLENBTEY7QUFPRDs7QUFFRCxRQUFJaUYsRUFBRSxDQUFDTSxNQUFQLEVBQWU7QUFDYjdGLE1BQUFBLE9BQU8sQ0FBQzNILEVBQUQsRUFBS0EsRUFBRSxDQUFDeU4sZ0JBQVIsRUFBMEJQLEVBQUUsQ0FBQ00sTUFBN0IsQ0FBUDtBQUNEOztBQUVELFFBQUlOLEVBQUUsQ0FBQ1EsUUFBUCxFQUFpQjtBQUNmL0YsTUFBQUEsT0FBTyxDQUFDM0gsRUFBRCxFQUFLQSxFQUFFLENBQUMyTixrQkFBUixFQUE0QlQsRUFBRSxDQUFDUSxRQUEvQixDQUFQO0FBQ0Q7O0FBRUQsUUFBSVIsRUFBRSxDQUFDVSxhQUFQLEVBQXNCO0FBQ3BCakcsTUFBQUEsT0FBTyxDQUFDM0gsRUFBRCxFQUFLQSxFQUFFLENBQUM2Tix3QkFBUixFQUFrQ1gsRUFBRSxDQUFDVSxhQUFyQyxDQUFQO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7Ozs7U0FPQUUsY0FBQSxxQkFBWUMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0I7QUFDdEIsUUFDRSxLQUFLbkUsR0FBTCxLQUFhZ0UsQ0FBYixJQUNBLEtBQUsvRCxHQUFMLEtBQWFnRSxDQURiLElBRUEsS0FBSy9ELEdBQUwsS0FBYWdFLENBRmIsSUFHQSxLQUFLL0QsR0FBTCxLQUFhZ0UsQ0FKZixFQUtFO0FBQ0EsV0FBS2hGLEdBQUwsQ0FBU2lGLFFBQVQsQ0FBa0JKLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QkMsQ0FBeEIsRUFBMkJDLENBQTNCOztBQUNBLFdBQUtuRSxHQUFMLEdBQVdnRSxDQUFYO0FBQ0EsV0FBSy9ELEdBQUwsR0FBV2dFLENBQVg7QUFDQSxXQUFLL0QsR0FBTCxHQUFXZ0UsQ0FBWDtBQUNBLFdBQUsvRCxHQUFMLEdBQVdnRSxDQUFYO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7Ozs7U0FPQUUsYUFBQSxvQkFBV0wsQ0FBWCxFQUFjQyxDQUFkLEVBQWlCQyxDQUFqQixFQUFvQkMsQ0FBcEIsRUFBdUI7QUFDckIsUUFDRSxLQUFLL0QsR0FBTCxLQUFhNEQsQ0FBYixJQUNBLEtBQUszRCxHQUFMLEtBQWE0RCxDQURiLElBRUEsS0FBSzNELEdBQUwsS0FBYTRELENBRmIsSUFHQSxLQUFLM0QsR0FBTCxLQUFhNEQsQ0FKZixFQUtFO0FBQ0EsV0FBS2hGLEdBQUwsQ0FBU21GLE9BQVQsQ0FBaUJOLENBQWpCLEVBQW9CQyxDQUFwQixFQUF1QkMsQ0FBdkIsRUFBMEJDLENBQTFCOztBQUNBLFdBQUsvRCxHQUFMLEdBQVc0RCxDQUFYO0FBQ0EsV0FBSzNELEdBQUwsR0FBVzRELENBQVg7QUFDQSxXQUFLM0QsR0FBTCxHQUFXNEQsQ0FBWDtBQUNBLFdBQUszRCxHQUFMLEdBQVc0RCxDQUFYO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7Ozs7U0FPQUksUUFBQSxlQUFNOUYsSUFBTixFQUFZO0FBQ1YsUUFBSUEsSUFBSSxDQUFDK0YsS0FBTCxLQUFlN0YsU0FBZixJQUE0QkYsSUFBSSxDQUFDSSxLQUFMLEtBQWVGLFNBQTNDLElBQXdERixJQUFJLENBQUNHLE9BQUwsS0FBaUJELFNBQTdFLEVBQXdGO0FBQ3BGO0FBQ0g7O0FBQ0QsUUFBTTFJLEVBQUUsR0FBRyxLQUFLa0osR0FBaEI7QUFDQSxRQUFJc0YsS0FBSyxHQUFHLENBQVo7O0FBRUEsUUFBSWhHLElBQUksQ0FBQytGLEtBQUwsS0FBZTdGLFNBQW5CLEVBQThCO0FBQzVCOEYsTUFBQUEsS0FBSyxJQUFJeE8sRUFBRSxDQUFDeU8sZ0JBQVo7QUFDQXpPLE1BQUFBLEVBQUUsQ0FBQ3dNLFVBQUgsQ0FBY2hFLElBQUksQ0FBQytGLEtBQUwsQ0FBVyxDQUFYLENBQWQsRUFBNkIvRixJQUFJLENBQUMrRixLQUFMLENBQVcsQ0FBWCxDQUE3QixFQUE0Qy9GLElBQUksQ0FBQytGLEtBQUwsQ0FBVyxDQUFYLENBQTVDLEVBQTJEL0YsSUFBSSxDQUFDK0YsS0FBTCxDQUFXLENBQVgsQ0FBM0Q7QUFDRDs7QUFFRCxRQUFJL0YsSUFBSSxDQUFDSSxLQUFMLEtBQWVGLFNBQW5CLEVBQThCO0FBQzVCOEYsTUFBQUEsS0FBSyxJQUFJeE8sRUFBRSxDQUFDME8sZ0JBQVo7QUFDQTFPLE1BQUFBLEVBQUUsQ0FBQ3VNLFVBQUgsQ0FBYy9ELElBQUksQ0FBQ0ksS0FBbkI7QUFFQTVJLE1BQUFBLEVBQUUsQ0FBQ3VCLE1BQUgsQ0FBVXZCLEVBQUUsQ0FBQ3lDLFVBQWI7QUFDQXpDLE1BQUFBLEVBQUUsQ0FBQzJDLFNBQUgsQ0FBYSxJQUFiO0FBQ0EzQyxNQUFBQSxFQUFFLENBQUMwQyxTQUFILENBQWExQyxFQUFFLENBQUNxTSxNQUFoQjtBQUNEOztBQUVELFFBQUk3RCxJQUFJLENBQUNHLE9BQUwsS0FBaUJELFNBQXJCLEVBQWdDO0FBQzlCOEYsTUFBQUEsS0FBSyxJQUFJeE8sRUFBRSxDQUFDMk8sa0JBQVo7QUFDQTNPLE1BQUFBLEVBQUUsQ0FBQ3lNLFlBQUgsQ0FBZ0JqRSxJQUFJLENBQUNHLE9BQXJCO0FBQ0Q7O0FBRUQzSSxJQUFBQSxFQUFFLENBQUNzTyxLQUFILENBQVNFLEtBQVQsRUExQlUsQ0E0QlY7O0FBQ0EsUUFBSWhHLElBQUksQ0FBQ0ksS0FBTCxLQUFlRixTQUFuQixFQUE4QjtBQUM1QixVQUFJLEtBQUtrQixRQUFMLENBQWNwSCxTQUFkLEtBQTRCLEtBQWhDLEVBQXVDO0FBQ3JDeEMsUUFBQUEsRUFBRSxDQUFDcUIsT0FBSCxDQUFXckIsRUFBRSxDQUFDeUMsVUFBZDtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUksS0FBS21ILFFBQUwsQ0FBY2hILFVBQWQsS0FBNkIsS0FBakMsRUFBd0M7QUFDdEM1QyxVQUFBQSxFQUFFLENBQUMyQyxTQUFILENBQWEsS0FBYjtBQUNEOztBQUNELFlBQUksS0FBS2lILFFBQUwsQ0FBY2xILFNBQWQsS0FBNEJqQixhQUFNb0IsY0FBdEMsRUFBc0Q7QUFDcEQ3QyxVQUFBQSxFQUFFLENBQUMwQyxTQUFILENBQWEsS0FBS2tILFFBQUwsQ0FBY2xILFNBQTNCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsSUFFRDtBQUNBO0FBQ0E7O0FBRUE7Ozs7O1NBR0FrTSxjQUFBLHVCQUFjO0FBQ1osU0FBSy9FLEtBQUwsQ0FBV3pJLEtBQVgsR0FBbUIsSUFBbkI7QUFDRDtBQUVEOzs7OztTQUdBeU4sa0JBQUEsMkJBQWtCO0FBQ2hCLFNBQUtoRixLQUFMLENBQVdySCxTQUFYLEdBQXVCLElBQXZCO0FBQ0Q7QUFFRDs7Ozs7U0FHQXNNLG1CQUFBLDRCQUFtQjtBQUNqQixTQUFLakYsS0FBTCxDQUFXakgsVUFBWCxHQUF3QixJQUF4QjtBQUNEO0FBRUQ7Ozs7OztTQUlBbU0saUJBQUEsd0JBQWVoTSxXQUFmLEVBQTRCO0FBQzFCLFNBQUs4RyxLQUFMLENBQVc5RyxXQUFYLEdBQXlCQSxXQUF6QjtBQUNEO0FBRUQ7Ozs7Ozs7O1NBTUFpTSxpQkFBQSx3QkFBZUMsSUFBZixFQUFxQkMsR0FBckIsRUFBMEJDLElBQTFCLEVBQWdDO0FBQzlCLFNBQUt0RixLQUFMLENBQVcxRyxVQUFYLEdBQXdCLEtBQXhCO0FBQ0EsU0FBSzBHLEtBQUwsQ0FBV3ZHLGdCQUFYLEdBQThCLEtBQUt1RyxLQUFMLENBQVc3RixlQUFYLEdBQTZCaUwsSUFBM0Q7QUFDQSxTQUFLcEYsS0FBTCxDQUFXdEcsZUFBWCxHQUE2QixLQUFLc0csS0FBTCxDQUFXNUYsY0FBWCxHQUE0QmlMLEdBQXpEO0FBQ0EsU0FBS3JGLEtBQUwsQ0FBV3JHLGdCQUFYLEdBQThCLEtBQUtxRyxLQUFMLENBQVczRixlQUFYLEdBQTZCaUwsSUFBM0Q7QUFDRDtBQUVEOzs7Ozs7OztTQU1BQyxzQkFBQSw2QkFBb0JILElBQXBCLEVBQTBCQyxHQUExQixFQUErQkMsSUFBL0IsRUFBcUM7QUFDbkMsU0FBS3RGLEtBQUwsQ0FBVzFHLFVBQVgsR0FBd0IsSUFBeEI7QUFDQSxTQUFLMEcsS0FBTCxDQUFXdkcsZ0JBQVgsR0FBOEIyTCxJQUE5QjtBQUNBLFNBQUtwRixLQUFMLENBQVd0RyxlQUFYLEdBQTZCMkwsR0FBN0I7QUFDQSxTQUFLckYsS0FBTCxDQUFXckcsZ0JBQVgsR0FBOEIyTCxJQUE5QjtBQUNEO0FBRUQ7Ozs7Ozs7O1NBTUFFLHFCQUFBLDRCQUFtQkosSUFBbkIsRUFBeUJDLEdBQXpCLEVBQThCQyxJQUE5QixFQUFvQztBQUNsQyxTQUFLdEYsS0FBTCxDQUFXMUcsVUFBWCxHQUF3QixJQUF4QjtBQUNBLFNBQUswRyxLQUFMLENBQVc3RixlQUFYLEdBQTZCaUwsSUFBN0I7QUFDQSxTQUFLcEYsS0FBTCxDQUFXNUYsY0FBWCxHQUE0QmlMLEdBQTVCO0FBQ0EsU0FBS3JGLEtBQUwsQ0FBVzNGLGVBQVgsR0FBNkJpTCxJQUE3QjtBQUNEO0FBRUQ7Ozs7Ozs7OztTQU9BRyxlQUFBLHNCQUFhQyxNQUFiLEVBQXFCQyxPQUFyQixFQUE4QkMsT0FBOUIsRUFBdUNDLFNBQXZDLEVBQWtEO0FBQ2hELFNBQUs3RixLQUFMLENBQVdqRyxrQkFBWCxHQUFnQyxLQUFLaUcsS0FBTCxDQUFXekYsaUJBQVgsR0FBK0JtTCxNQUEvRDtBQUNBLFNBQUsxRixLQUFMLENBQVdoRyxtQkFBWCxHQUFpQyxLQUFLZ0csS0FBTCxDQUFXeEYsa0JBQVgsR0FBZ0NtTCxPQUFqRTtBQUNBLFNBQUszRixLQUFMLENBQVcvRixtQkFBWCxHQUFpQyxLQUFLK0YsS0FBTCxDQUFXdkYsa0JBQVgsR0FBZ0NtTCxPQUFqRTtBQUNBLFNBQUs1RixLQUFMLENBQVduRyxxQkFBWCxHQUFtQyxLQUFLbUcsS0FBTCxDQUFXMUYsb0JBQVgsR0FBa0N1TCxTQUFyRTtBQUNEO0FBRUQ7Ozs7Ozs7OztTQU9BQyxvQkFBQSwyQkFBa0JKLE1BQWxCLEVBQTBCQyxPQUExQixFQUFtQ0MsT0FBbkMsRUFBNENDLFNBQTVDLEVBQXVEO0FBQ3JELFNBQUs3RixLQUFMLENBQVcxRyxVQUFYLEdBQXdCLElBQXhCO0FBQ0EsU0FBSzBHLEtBQUwsQ0FBV2pHLGtCQUFYLEdBQWdDMkwsTUFBaEM7QUFDQSxTQUFLMUYsS0FBTCxDQUFXaEcsbUJBQVgsR0FBaUMyTCxPQUFqQztBQUNBLFNBQUszRixLQUFMLENBQVcvRixtQkFBWCxHQUFpQzJMLE9BQWpDO0FBQ0EsU0FBSzVGLEtBQUwsQ0FBV25HLHFCQUFYLEdBQW1DZ00sU0FBbkM7QUFDRDtBQUVEOzs7Ozs7Ozs7U0FPQUUsbUJBQUEsMEJBQWlCTCxNQUFqQixFQUF5QkMsT0FBekIsRUFBa0NDLE9BQWxDLEVBQTJDQyxTQUEzQyxFQUFzRDtBQUNwRCxTQUFLN0YsS0FBTCxDQUFXMUcsVUFBWCxHQUF3QixJQUF4QjtBQUNBLFNBQUswRyxLQUFMLENBQVd6RixpQkFBWCxHQUErQm1MLE1BQS9CO0FBQ0EsU0FBSzFGLEtBQUwsQ0FBV3hGLGtCQUFYLEdBQWdDbUwsT0FBaEM7QUFDQSxTQUFLM0YsS0FBTCxDQUFXdkYsa0JBQVgsR0FBZ0NtTCxPQUFoQztBQUNBLFNBQUs1RixLQUFMLENBQVcxRixvQkFBWCxHQUFrQ3VMLFNBQWxDO0FBQ0Q7QUFFRDs7Ozs7O1NBSUFHLGVBQUEsc0JBQWFuTixTQUFiLEVBQXdCO0FBQ3RCLFNBQUttSCxLQUFMLENBQVduSCxTQUFYLEdBQXVCQSxTQUF2QjtBQUNEO0FBRUQ7Ozs7OztTQUlBb04sa0JBQUEseUJBQWdCQyxJQUFoQixFQUFzQjtBQUNwQixTQUFLbEcsS0FBTCxDQUFXaEksVUFBWCxHQUF3QmtPLElBQXhCO0FBQ0Q7QUFFRDs7Ozs7Ozs7O1NBT0FDLGdCQUFBLHVCQUFjQyxDQUFkLEVBQWlCQyxDQUFqQixFQUFvQkMsQ0FBcEIsRUFBdUJDLENBQXZCLEVBQTBCO0FBQ3hCLFNBQUt2RyxLQUFMLENBQVdoSSxVQUFYLEdBQXdCLENBQUVvTyxDQUFDLEdBQUcsR0FBTCxJQUFhLEVBQWIsR0FBbUJDLENBQUMsR0FBRyxHQUFMLElBQWEsRUFBL0IsR0FBcUNDLENBQUMsR0FBRyxHQUFMLElBQWEsQ0FBakQsR0FBcURDLENBQUMsR0FBRyxHQUExRCxNQUFtRSxDQUEzRjtBQUNEO0FBRUQ7Ozs7Ozs7U0FLQUMsZUFBQSxzQkFBYUMsR0FBYixFQUFrQkMsR0FBbEIsRUFBdUI7QUFDckIsU0FBSzFHLEtBQUwsQ0FBVy9ILFFBQVgsR0FBc0IsS0FBdEI7QUFDQSxTQUFLK0gsS0FBTCxDQUFXckksUUFBWCxHQUFzQjhPLEdBQXRCO0FBQ0EsU0FBS3pHLEtBQUwsQ0FBV2pJLFFBQVgsR0FBc0IyTyxHQUF0QjtBQUNEO0FBRUQ7Ozs7Ozs7OztTQU9BQyxrQkFBQSx5QkFBZ0JGLEdBQWhCLEVBQXFCQyxHQUFyQixFQUEwQkUsUUFBMUIsRUFBb0NDLFFBQXBDLEVBQThDO0FBQzVDLFNBQUs3RyxLQUFMLENBQVcvSCxRQUFYLEdBQXNCLElBQXRCO0FBQ0EsU0FBSytILEtBQUwsQ0FBV3JJLFFBQVgsR0FBc0I4TyxHQUF0QjtBQUNBLFNBQUt6RyxLQUFMLENBQVdqSSxRQUFYLEdBQXNCMk8sR0FBdEI7QUFDQSxTQUFLMUcsS0FBTCxDQUFXN0gsYUFBWCxHQUEyQnlPLFFBQTNCO0FBQ0EsU0FBSzVHLEtBQUwsQ0FBVzVILGFBQVgsR0FBMkJ5TyxRQUEzQjtBQUNEO0FBRUQ7Ozs7OztTQUlBQyxhQUFBLG9CQUFXQyxFQUFYLEVBQWU7QUFDYixTQUFLL0csS0FBTCxDQUFXL0gsUUFBWCxHQUFzQixLQUF0QjtBQUNBLFNBQUsrSCxLQUFMLENBQVcxSCxPQUFYLEdBQXFCeU8sRUFBckI7QUFDRDtBQUVEOzs7Ozs7O1NBS0FDLGdCQUFBLHVCQUFjRCxFQUFkLEVBQWtCRSxPQUFsQixFQUEyQjtBQUN6QixTQUFLakgsS0FBTCxDQUFXL0gsUUFBWCxHQUFzQixJQUF0QjtBQUNBLFNBQUsrSCxLQUFMLENBQVcxSCxPQUFYLEdBQXFCeU8sRUFBckI7QUFDQSxTQUFLL0csS0FBTCxDQUFXekgsWUFBWCxHQUEwQjBPLE9BQTFCO0FBQ0Q7QUFFRDs7Ozs7O1NBSUFDLGNBQUEscUJBQVlDLElBQVosRUFBa0I7QUFDaEIsU0FBS25ILEtBQUwsQ0FBV2xGLFFBQVgsR0FBc0JxTSxJQUF0QjtBQUNEO0FBRUQ7Ozs7Ozs7O1NBTUFDLGtCQUFBLHlCQUFnQkMsTUFBaEIsRUFBd0JDLE1BQXhCLEVBQWdDQyxLQUFoQyxFQUEyQztBQUFBLFFBQVhBLEtBQVc7QUFBWEEsTUFBQUEsS0FBVyxHQUFILENBQUc7QUFBQTs7QUFDekMsU0FBS3ZILEtBQUwsQ0FBV3hFLGFBQVgsQ0FBeUI2TCxNQUF6QixJQUFtQ0MsTUFBbkM7QUFDQSxTQUFLdEgsS0FBTCxDQUFXdkUsbUJBQVgsQ0FBK0I0TCxNQUEvQixJQUF5Q0UsS0FBekM7O0FBQ0EsUUFBSSxLQUFLdkgsS0FBTCxDQUFXM0UsU0FBWCxHQUF1QmdNLE1BQTNCLEVBQW1DO0FBQ2pDLFdBQUtySCxLQUFMLENBQVczRSxTQUFYLEdBQXVCZ00sTUFBdkI7QUFDRDtBQUNGO0FBRUQ7Ozs7OztTQUlBRyxpQkFBQSx3QkFBZUYsTUFBZixFQUF1QjtBQUNyQixTQUFLdEgsS0FBTCxDQUFXaUQsV0FBWCxHQUF5QnFFLE1BQXpCO0FBQ0Q7QUFFRDs7Ozs7O1NBSUFHLGFBQUEsb0JBQVduTSxPQUFYLEVBQW9CO0FBQ2xCLFNBQUswRSxLQUFMLENBQVcxRSxPQUFYLEdBQXFCQSxPQUFyQjtBQUNEO0FBRUQ7Ozs7Ozs7O1NBTUFvTSxhQUFBLG9CQUFXakwsSUFBWCxFQUFpQmdCLE9BQWpCLEVBQTBCa0ssSUFBMUIsRUFBZ0M7QUFDOUIsUUFBSUEsSUFBSSxJQUFJLEtBQUtqTSxLQUFMLENBQVc4RixlQUF2QixFQUF3QztBQUN0QzlFLE1BQUFBLE9BQU8sQ0FBQ0MsSUFBUiwwQkFBb0NGLElBQXBDLGtCQUFxRGtMLElBQXJELDhCQUFrRixLQUFLak0sS0FBTCxDQUFXOEYsZUFBN0Y7QUFDQTtBQUNEOztBQUVELFNBQUt4QixLQUFMLENBQVd4QyxZQUFYLENBQXdCbUssSUFBeEIsSUFBZ0NsSyxPQUFoQztBQUNBLFNBQUttSyxVQUFMLENBQWdCbkwsSUFBaEIsRUFBc0JrTCxJQUF0Qjs7QUFFQSxRQUFJLEtBQUszSCxLQUFMLENBQVd6QyxjQUFYLEdBQTRCb0ssSUFBaEMsRUFBc0M7QUFDcEMsV0FBSzNILEtBQUwsQ0FBV3pDLGNBQVgsR0FBNEJvSyxJQUE1QjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7Ozs7U0FNQUUsa0JBQUEseUJBQWdCcEwsSUFBaEIsRUFBc0JxTCxRQUF0QixFQUFnQ0MsS0FBaEMsRUFBdUM7QUFDckMsUUFBSUMsR0FBRyxHQUFHRixRQUFRLENBQUMxTCxNQUFuQjs7QUFDQSxRQUFJNEwsR0FBRyxJQUFJLEtBQUt0TSxLQUFMLENBQVc4RixlQUF0QixFQUF1QztBQUNyQzlFLE1BQUFBLE9BQU8sQ0FBQ0MsSUFBUixrQkFBNEJxTCxHQUE1QixzQkFBZ0R2TCxJQUFoRCw4QkFBNkUsS0FBS2YsS0FBTCxDQUFXOEYsZUFBeEY7QUFDQTtBQUNEOztBQUNELFNBQUssSUFBSWpHLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd5TSxHQUFwQixFQUF5QixFQUFFek0sQ0FBM0IsRUFBOEI7QUFDNUIsVUFBSW9NLElBQUksR0FBR0ksS0FBSyxDQUFDeE0sQ0FBRCxDQUFoQjtBQUNBLFdBQUt5RSxLQUFMLENBQVd4QyxZQUFYLENBQXdCbUssSUFBeEIsSUFBZ0NHLFFBQVEsQ0FBQ3ZNLENBQUQsQ0FBeEM7O0FBRUEsVUFBSSxLQUFLeUUsS0FBTCxDQUFXekMsY0FBWCxHQUE0Qm9LLElBQWhDLEVBQXNDO0FBQ3BDLGFBQUszSCxLQUFMLENBQVd6QyxjQUFYLEdBQTRCb0ssSUFBNUI7QUFDRDtBQUNGOztBQUNELFNBQUtDLFVBQUwsQ0FBZ0JuTCxJQUFoQixFQUFzQnNMLEtBQXRCO0FBQ0Q7QUFFRDs7Ozs7OztTQUtBSCxhQUFBLG9CQUFXbkwsSUFBWCxFQUFpQnBHLEtBQWpCLEVBQXdCO0FBQ3RCLFFBQUk0UixPQUFPLEdBQUcsS0FBS2hJLFNBQUwsQ0FBZXhELElBQWYsQ0FBZDtBQUVBLFFBQUl5TCxRQUFRLEdBQUcsS0FBZjtBQUNBLFFBQUlDLE9BQU8sR0FBRyxLQUFkO0FBQUEsUUFBcUJDLGNBQWMsR0FBRyxLQUF0QztBQUFBLFFBQTZDQyxZQUFZLEdBQUcsS0FBNUQ7O0FBQ0EsT0FBRztBQUNELFVBQUksQ0FBQ0osT0FBTCxFQUFjO0FBQ1o7QUFDRDs7QUFFREcsTUFBQUEsY0FBYyxHQUFHekgsS0FBSyxDQUFDd0gsT0FBTixDQUFjOVIsS0FBZCxLQUF3QkEsS0FBSyxZQUFZaVMsWUFBMUQ7QUFDQUQsTUFBQUEsWUFBWSxHQUFHaFMsS0FBSyxZQUFZa1MsVUFBaEM7QUFDQUosTUFBQUEsT0FBTyxHQUFHQyxjQUFjLElBQUlDLFlBQTVCOztBQUNBLFVBQUlKLE9BQU8sQ0FBQ0UsT0FBUixLQUFvQkEsT0FBeEIsRUFBaUM7QUFDL0I7QUFDRDs7QUFFRCxVQUFJRixPQUFPLENBQUNFLE9BQVIsSUFBbUJGLE9BQU8sQ0FBQzVSLEtBQVIsQ0FBYytGLE1BQWQsS0FBeUIvRixLQUFLLENBQUMrRixNQUF0RCxFQUE4RDtBQUM1RDtBQUNEOztBQUVEOEwsTUFBQUEsUUFBUSxHQUFHLElBQVg7QUFDRCxLQWpCRCxRQWlCUyxLQWpCVDs7QUFtQkEsUUFBSSxDQUFDQSxRQUFMLEVBQWU7QUFDYixVQUFJTSxRQUFRLEdBQUduUyxLQUFmOztBQUNBLFVBQUkrUixjQUFKLEVBQW9CO0FBQ2xCSSxRQUFBQSxRQUFRLEdBQUcsSUFBSUYsWUFBSixDQUFpQmpTLEtBQWpCLENBQVg7QUFDRCxPQUZELE1BR0ssSUFBSWdTLFlBQUosRUFBa0I7QUFDckJHLFFBQUFBLFFBQVEsR0FBRyxJQUFJRCxVQUFKLENBQWVsUyxLQUFmLENBQVg7QUFDRDs7QUFFRDRSLE1BQUFBLE9BQU8sR0FBRztBQUNSUSxRQUFBQSxLQUFLLEVBQUUsSUFEQztBQUVScFMsUUFBQUEsS0FBSyxFQUFFbVMsUUFGQztBQUdSTCxRQUFBQSxPQUFPLEVBQUVBO0FBSEQsT0FBVjtBQUtELEtBZEQsTUFjTztBQUNMLFVBQUlPLFFBQVEsR0FBR1QsT0FBTyxDQUFDNVIsS0FBdkI7QUFDQSxVQUFJb1MsS0FBSyxHQUFHLEtBQVo7O0FBQ0EsVUFBSVIsT0FBTyxDQUFDRSxPQUFaLEVBQXFCO0FBQ25CLGFBQUssSUFBSTVNLENBQUMsR0FBRyxDQUFSLEVBQVdvTixDQUFDLEdBQUdELFFBQVEsQ0FBQ3RNLE1BQTdCLEVBQXFDYixDQUFDLEdBQUdvTixDQUF6QyxFQUE0Q3BOLENBQUMsRUFBN0MsRUFBaUQ7QUFDL0MsY0FBSW1OLFFBQVEsQ0FBQ25OLENBQUQsQ0FBUixLQUFnQmxGLEtBQUssQ0FBQ2tGLENBQUQsQ0FBekIsRUFBOEI7QUFDNUJrTixZQUFBQSxLQUFLLEdBQUcsSUFBUjtBQUNBQyxZQUFBQSxRQUFRLENBQUNuTixDQUFELENBQVIsR0FBY2xGLEtBQUssQ0FBQ2tGLENBQUQsQ0FBbkI7QUFDRDtBQUNGO0FBQ0YsT0FQRCxNQVFLO0FBQ0gsWUFBSW1OLFFBQVEsS0FBS3JTLEtBQWpCLEVBQXdCO0FBQ3RCb1MsVUFBQUEsS0FBSyxHQUFHLElBQVI7QUFDQVIsVUFBQUEsT0FBTyxDQUFDNVIsS0FBUixHQUFnQkEsS0FBaEI7QUFDRDtBQUNGOztBQUVELFVBQUlvUyxLQUFKLEVBQVc7QUFDVFIsUUFBQUEsT0FBTyxDQUFDUSxLQUFSLEdBQWdCLElBQWhCO0FBQ0Q7QUFDRjs7QUFDRCxTQUFLeEksU0FBTCxDQUFleEQsSUFBZixJQUF1QndMLE9BQXZCO0FBQ0Q7O1NBRURXLHFCQUFBLDRCQUFtQm5NLElBQW5CLEVBQXlCcEcsS0FBekIsRUFBZ0M7QUFDOUIsUUFBSTRSLE9BQU8sR0FBRyxLQUFLaEksU0FBTCxDQUFleEQsSUFBZixDQUFkOztBQUNBLFFBQUksQ0FBQ3dMLE9BQUwsRUFBYztBQUNaLFdBQUtoSSxTQUFMLENBQWV4RCxJQUFmLElBQXVCd0wsT0FBTyxHQUFHLEVBQWpDO0FBQ0Q7O0FBQ0RBLElBQUFBLE9BQU8sQ0FBQ1EsS0FBUixHQUFnQixJQUFoQjtBQUNBUixJQUFBQSxPQUFPLENBQUM1UixLQUFSLEdBQWdCQSxLQUFoQjtBQUNEO0FBRUQ7Ozs7OztTQUlBd1MsbUJBQUEsMEJBQWlCNUwsSUFBakIsRUFBdUI7QUFDckIsU0FBSytDLEtBQUwsQ0FBVzhJLGFBQVgsR0FBMkI3TCxJQUEzQjtBQUNEO0FBRUQ7Ozs7O1NBR0E4TCxpQkFBQSwwQkFBa0I7QUFDaEIsU0FBS3hKLE1BQUwsQ0FBWUUsU0FBWixHQUF3QixDQUF4QjtBQUNEO0FBRUQ7Ozs7O1NBR0F1SixlQUFBLHdCQUFnQjtBQUNkLFdBQU8sS0FBS3pKLE1BQUwsQ0FBWUUsU0FBbkI7QUFDRDtBQUVEOzs7Ozs7O1NBS0F3SixPQUFBLGNBQUtDLElBQUwsRUFBV0MsS0FBWCxFQUFrQjtBQUNoQixRQUFNaFQsRUFBRSxHQUFHLEtBQUtrSixHQUFoQjtBQUNBLFFBQUloSSxHQUFHLEdBQUcsS0FBSzBJLFFBQWY7QUFDQSxRQUFJekksSUFBSSxHQUFHLEtBQUswSSxLQUFoQixDQUhnQixDQUtoQjs7QUFDQTVJLElBQUFBLGtCQUFrQixDQUFDakIsRUFBRCxFQUFLa0IsR0FBTCxFQUFVQyxJQUFWLENBQWxCLENBTmdCLENBUWhCOzs7QUFDQW9CLElBQUFBLGtCQUFrQixDQUFDdkMsRUFBRCxFQUFLa0IsR0FBTCxFQUFVQyxJQUFWLENBQWxCLENBVGdCLENBV2hCOzs7QUFDQTJCLElBQUFBLG9CQUFvQixDQUFDOUMsRUFBRCxFQUFLa0IsR0FBTCxFQUFVQyxJQUFWLENBQXBCLENBWmdCLENBY2hCOzs7QUFDQXVELElBQUFBLGVBQWUsQ0FBQzFFLEVBQUQsRUFBS2tCLEdBQUwsRUFBVUMsSUFBVixDQUFmLENBZmdCLENBaUJoQjs7O0FBQ0E0RCxJQUFBQSxvQkFBb0IsQ0FBQyxJQUFELEVBQU8vRSxFQUFQLEVBQVdrQixHQUFYLEVBQWdCQyxJQUFoQixDQUFwQixDQWxCZ0IsQ0FvQmhCOzs7QUFDQSxRQUFJRCxHQUFHLENBQUM0TCxXQUFKLEtBQW9CM0wsSUFBSSxDQUFDMkwsV0FBN0IsRUFBMEM7QUFDeEM5TSxNQUFBQSxFQUFFLENBQUM2RixVQUFILENBQWM3RixFQUFFLENBQUMrTSxvQkFBakIsRUFBdUM1TCxJQUFJLENBQUMyTCxXQUFMLElBQW9CM0wsSUFBSSxDQUFDMkwsV0FBTCxDQUFpQmxILEtBQWpCLEtBQTJCLENBQUMsQ0FBaEQsR0FBb0R6RSxJQUFJLENBQUMyTCxXQUFMLENBQWlCbEgsS0FBckUsR0FBNkUsSUFBcEg7QUFDRCxLQXZCZSxDQXlCaEI7OztBQUNBLFFBQUlxTixZQUFZLEdBQUcsS0FBbkI7O0FBQ0EsUUFBSS9SLEdBQUcsQ0FBQ2lFLE9BQUosS0FBZ0JoRSxJQUFJLENBQUNnRSxPQUF6QixFQUFrQztBQUNoQyxVQUFJaEUsSUFBSSxDQUFDZ0UsT0FBTCxDQUFhK04sT0FBakIsRUFBMEI7QUFDeEJsVCxRQUFBQSxFQUFFLENBQUNtVCxVQUFILENBQWNoUyxJQUFJLENBQUNnRSxPQUFMLENBQWFTLEtBQTNCO0FBQ0QsT0FGRCxNQUVPO0FBQ0xXLFFBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLDRDQUFiO0FBQ0Q7O0FBQ0R5TSxNQUFBQSxZQUFZLEdBQUcsSUFBZjtBQUNELEtBbENlLENBb0NoQjs7O0FBQ0E5TCxJQUFBQSxlQUFlLENBQUNuSCxFQUFELEVBQUtrQixHQUFMLEVBQVVDLElBQVYsQ0FBZixDQXJDZ0IsQ0F1Q2hCOzs7QUFDQSxTQUFLLElBQUlpRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHakUsSUFBSSxDQUFDZ0UsT0FBTCxDQUFhMkUsU0FBYixDQUF1QjdELE1BQTNDLEVBQW1ELEVBQUViLENBQXJELEVBQXdEO0FBQ3RELFVBQUlnTyxXQUFXLEdBQUdqUyxJQUFJLENBQUNnRSxPQUFMLENBQWEyRSxTQUFiLENBQXVCMUUsQ0FBdkIsQ0FBbEI7QUFDQSxVQUFJME0sT0FBTyxHQUFHLEtBQUtoSSxTQUFMLENBQWVzSixXQUFXLENBQUM5TSxJQUEzQixDQUFkOztBQUNBLFVBQUksQ0FBQ3dMLE9BQUwsRUFBYztBQUNaO0FBQ0E7QUFDRDs7QUFFRCxVQUFJLENBQUNtQixZQUFELElBQWlCLENBQUNuQixPQUFPLENBQUNRLEtBQTlCLEVBQXFDO0FBQ25DO0FBQ0Q7O0FBRURSLE1BQUFBLE9BQU8sQ0FBQ1EsS0FBUixHQUFnQixLQUFoQixDQVpzRCxDQWN0RDs7QUFFQSxVQUFJZSxVQUFVLEdBQUlELFdBQVcsQ0FBQ0UsSUFBWixLQUFxQjVLLFNBQXRCLEdBQW1DM0ksbUJBQW1CLENBQUNxVCxXQUFXLENBQUN0TSxJQUFiLENBQXRELEdBQTJFaEcsd0JBQXdCLENBQUNzUyxXQUFXLENBQUN0TSxJQUFiLENBQXBIOztBQUNBLFVBQUksQ0FBQ3VNLFVBQUwsRUFBaUI7QUFDZjlNLFFBQUFBLE9BQU8sQ0FBQ0MsSUFBUiwrQ0FBeUQ0TSxXQUFXLENBQUM5TSxJQUFyRTtBQUNBO0FBQ0Q7O0FBRUQrTSxNQUFBQSxVQUFVLENBQUNyVCxFQUFELEVBQUtvVCxXQUFXLENBQUMxTSxRQUFqQixFQUEyQm9MLE9BQU8sQ0FBQzVSLEtBQW5DLENBQVY7QUFDRDs7QUFFRCxRQUFJOFMsS0FBSixFQUFXO0FBQ1Q7QUFDQSxVQUFJN1IsSUFBSSxDQUFDMkwsV0FBVCxFQUFzQjtBQUNwQjlNLFFBQUFBLEVBQUUsQ0FBQ3VULFlBQUgsQ0FDRSxLQUFLMUosS0FBTCxDQUFXOEksYUFEYixFQUVFSyxLQUZGLEVBR0U3UixJQUFJLENBQUMyTCxXQUFMLENBQWlCMUcsT0FIbkIsRUFJRTJNLElBQUksR0FBRzVSLElBQUksQ0FBQzJMLFdBQUwsQ0FBaUIwRyxjQUoxQjtBQU1ELE9BUEQsTUFPTztBQUNMeFQsUUFBQUEsRUFBRSxDQUFDeVQsVUFBSCxDQUNFLEtBQUs1SixLQUFMLENBQVc4SSxhQURiLEVBRUVJLElBRkYsRUFHRUMsS0FIRjtBQUtELE9BZlEsQ0FpQlQ7OztBQUNBLFdBQUs1SixNQUFMLENBQVlFLFNBQVo7QUFDRCxLQXBGZSxDQXNGaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFDQXBJLElBQUFBLEdBQUcsQ0FBQ3dTLEdBQUosQ0FBUXZTLElBQVI7QUFDQUEsSUFBQUEsSUFBSSxDQUFDd1MsS0FBTDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0YXRlIGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHsgZW51bXMgfSBmcm9tICcuL2VudW1zJztcblxuaW1wb3J0IFRleHR1cmUyRCBmcm9tICcuL3RleHR1cmUtMmQnO1xuaW1wb3J0IFRleHR1cmVDdWJlIGZyb20gJy4vdGV4dHVyZS1jdWJlJztcblxuY29uc3QgR0xfSU5UID0gNTEyNDtcbmNvbnN0IEdMX0ZMT0FUID0gNTEyNjtcbmNvbnN0IEdMX0ZMT0FUX1ZFQzIgPSAzNTY2NDtcbmNvbnN0IEdMX0ZMT0FUX1ZFQzMgPSAzNTY2NTtcbmNvbnN0IEdMX0ZMT0FUX1ZFQzQgPSAzNTY2NjtcbmNvbnN0IEdMX0lOVF9WRUMyID0gMzU2Njc7XG5jb25zdCBHTF9JTlRfVkVDMyA9IDM1NjY4O1xuY29uc3QgR0xfSU5UX1ZFQzQgPSAzNTY2OTtcbmNvbnN0IEdMX0JPT0wgPSAzNTY3MDtcbmNvbnN0IEdMX0JPT0xfVkVDMiA9IDM1NjcxO1xuY29uc3QgR0xfQk9PTF9WRUMzID0gMzU2NzI7XG5jb25zdCBHTF9CT09MX1ZFQzQgPSAzNTY3MztcbmNvbnN0IEdMX0ZMT0FUX01BVDIgPSAzNTY3NDtcbmNvbnN0IEdMX0ZMT0FUX01BVDMgPSAzNTY3NTtcbmNvbnN0IEdMX0ZMT0FUX01BVDQgPSAzNTY3NjtcbmNvbnN0IEdMX1NBTVBMRVJfMkQgPSAzNTY3ODtcbmNvbnN0IEdMX1NBTVBMRVJfQ1VCRSA9IDM1NjgwO1xuXG4vKipcbiAqIF90eXBlMnVuaWZvcm1Db21taXRcbiAqL1xubGV0IF90eXBlMnVuaWZvcm1Db21taXQgPSB7XG4gIFtHTF9JTlRdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xuICAgIGdsLnVuaWZvcm0xaShpZCwgdmFsdWUpO1xuICB9LFxuXG4gIFtHTF9GTE9BVF06IGZ1bmN0aW9uIChnbCwgaWQsIHZhbHVlKSB7XG4gICAgZ2wudW5pZm9ybTFmKGlkLCB2YWx1ZSk7XG4gIH0sXG5cbiAgW0dMX0ZMT0FUX1ZFQzJdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xuICAgIGdsLnVuaWZvcm0yZnYoaWQsIHZhbHVlKTtcbiAgfSxcblxuICBbR0xfRkxPQVRfVkVDM106IGZ1bmN0aW9uIChnbCwgaWQsIHZhbHVlKSB7XG4gICAgZ2wudW5pZm9ybTNmdihpZCwgdmFsdWUpO1xuICB9LFxuXG4gIFtHTF9GTE9BVF9WRUM0XTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcbiAgICBnbC51bmlmb3JtNGZ2KGlkLCB2YWx1ZSk7XG4gIH0sXG5cbiAgW0dMX0lOVF9WRUMyXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcbiAgICBnbC51bmlmb3JtMml2KGlkLCB2YWx1ZSk7XG4gIH0sXG5cbiAgW0dMX0lOVF9WRUMzXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcbiAgICBnbC51bmlmb3JtM2l2KGlkLCB2YWx1ZSk7XG4gIH0sXG5cbiAgW0dMX0lOVF9WRUM0XTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcbiAgICBnbC51bmlmb3JtNGl2KGlkLCB2YWx1ZSk7XG4gIH0sXG5cbiAgW0dMX0JPT0xdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xuICAgIGdsLnVuaWZvcm0xaShpZCwgdmFsdWUpO1xuICB9LFxuXG4gIFtHTF9CT09MX1ZFQzJdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xuICAgIGdsLnVuaWZvcm0yaXYoaWQsIHZhbHVlKTtcbiAgfSxcblxuICBbR0xfQk9PTF9WRUMzXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcbiAgICBnbC51bmlmb3JtM2l2KGlkLCB2YWx1ZSk7XG4gIH0sXG5cbiAgW0dMX0JPT0xfVkVDNF06IGZ1bmN0aW9uIChnbCwgaWQsIHZhbHVlKSB7XG4gICAgZ2wudW5pZm9ybTRpdihpZCwgdmFsdWUpO1xuICB9LFxuXG4gIFtHTF9GTE9BVF9NQVQyXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcbiAgICBnbC51bmlmb3JtTWF0cml4MmZ2KGlkLCBmYWxzZSwgdmFsdWUpO1xuICB9LFxuXG4gIFtHTF9GTE9BVF9NQVQzXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcbiAgICBnbC51bmlmb3JtTWF0cml4M2Z2KGlkLCBmYWxzZSwgdmFsdWUpO1xuICB9LFxuXG4gIFtHTF9GTE9BVF9NQVQ0XTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KGlkLCBmYWxzZSwgdmFsdWUpO1xuICB9LFxuXG4gIFtHTF9TQU1QTEVSXzJEXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcbiAgICBnbC51bmlmb3JtMWkoaWQsIHZhbHVlKTtcbiAgfSxcblxuICBbR0xfU0FNUExFUl9DVUJFXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcbiAgICBnbC51bmlmb3JtMWkoaWQsIHZhbHVlKTtcbiAgfSxcbn07XG5cbi8qKlxuICogX3R5cGUydW5pZm9ybUFycmF5Q29tbWl0XG4gKi9cbmxldCBfdHlwZTJ1bmlmb3JtQXJyYXlDb21taXQgPSB7XG4gIFtHTF9JTlRdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xuICAgIGdsLnVuaWZvcm0xaXYoaWQsIHZhbHVlKTtcbiAgfSxcblxuICBbR0xfRkxPQVRdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xuICAgIGdsLnVuaWZvcm0xZnYoaWQsIHZhbHVlKTtcbiAgfSxcblxuICBbR0xfRkxPQVRfVkVDMl06IGZ1bmN0aW9uIChnbCwgaWQsIHZhbHVlKSB7XG4gICAgZ2wudW5pZm9ybTJmdihpZCwgdmFsdWUpO1xuICB9LFxuXG4gIFtHTF9GTE9BVF9WRUMzXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcbiAgICBnbC51bmlmb3JtM2Z2KGlkLCB2YWx1ZSk7XG4gIH0sXG5cbiAgW0dMX0ZMT0FUX1ZFQzRdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xuICAgIGdsLnVuaWZvcm00ZnYoaWQsIHZhbHVlKTtcbiAgfSxcblxuICBbR0xfSU5UX1ZFQzJdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xuICAgIGdsLnVuaWZvcm0yaXYoaWQsIHZhbHVlKTtcbiAgfSxcblxuICBbR0xfSU5UX1ZFQzNdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xuICAgIGdsLnVuaWZvcm0zaXYoaWQsIHZhbHVlKTtcbiAgfSxcblxuICBbR0xfSU5UX1ZFQzRdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xuICAgIGdsLnVuaWZvcm00aXYoaWQsIHZhbHVlKTtcbiAgfSxcblxuICBbR0xfQk9PTF06IGZ1bmN0aW9uIChnbCwgaWQsIHZhbHVlKSB7XG4gICAgZ2wudW5pZm9ybTFpdihpZCwgdmFsdWUpO1xuICB9LFxuXG4gIFtHTF9CT09MX1ZFQzJdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xuICAgIGdsLnVuaWZvcm0yaXYoaWQsIHZhbHVlKTtcbiAgfSxcblxuICBbR0xfQk9PTF9WRUMzXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcbiAgICBnbC51bmlmb3JtM2l2KGlkLCB2YWx1ZSk7XG4gIH0sXG5cbiAgW0dMX0JPT0xfVkVDNF06IGZ1bmN0aW9uIChnbCwgaWQsIHZhbHVlKSB7XG4gICAgZ2wudW5pZm9ybTRpdihpZCwgdmFsdWUpO1xuICB9LFxuXG4gIFtHTF9GTE9BVF9NQVQyXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcbiAgICBnbC51bmlmb3JtTWF0cml4MmZ2KGlkLCBmYWxzZSwgdmFsdWUpO1xuICB9LFxuXG4gIFtHTF9GTE9BVF9NQVQzXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcbiAgICBnbC51bmlmb3JtTWF0cml4M2Z2KGlkLCBmYWxzZSwgdmFsdWUpO1xuICB9LFxuXG4gIFtHTF9GTE9BVF9NQVQ0XTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KGlkLCBmYWxzZSwgdmFsdWUpO1xuICB9LFxuXG4gIFtHTF9TQU1QTEVSXzJEXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcbiAgICBnbC51bmlmb3JtMWl2KGlkLCB2YWx1ZSk7XG4gIH0sXG5cbiAgW0dMX1NBTVBMRVJfQ1VCRV06IGZ1bmN0aW9uIChnbCwgaWQsIHZhbHVlKSB7XG4gICAgZ2wudW5pZm9ybTFpdihpZCwgdmFsdWUpO1xuICB9LFxufTtcblxuLyoqXG4gKiBfY29tbWl0QmxlbmRTdGF0ZXNcbiAqL1xuZnVuY3Rpb24gX2NvbW1pdEJsZW5kU3RhdGVzKGdsLCBjdXIsIG5leHQpIHtcbiAgLy8gZW5hYmxlL2Rpc2FibGUgYmxlbmRcbiAgaWYgKGN1ci5ibGVuZCAhPT0gbmV4dC5ibGVuZCkge1xuICAgIGlmICghbmV4dC5ibGVuZCkge1xuICAgICAgZ2wuZGlzYWJsZShnbC5CTEVORCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZ2wuZW5hYmxlKGdsLkJMRU5EKTtcblxuICAgIGlmIChcbiAgICAgIG5leHQuYmxlbmRTcmMgPT09IGVudW1zLkJMRU5EX0NPTlNUQU5UX0NPTE9SIHx8XG4gICAgICBuZXh0LmJsZW5kU3JjID09PSBlbnVtcy5CTEVORF9PTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1IgfHxcbiAgICAgIG5leHQuYmxlbmREc3QgPT09IGVudW1zLkJMRU5EX0NPTlNUQU5UX0NPTE9SIHx8XG4gICAgICBuZXh0LmJsZW5kRHN0ID09PSBlbnVtcy5CTEVORF9PTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1JcbiAgICApIHtcbiAgICAgIGdsLmJsZW5kQ29sb3IoXG4gICAgICAgIChuZXh0LmJsZW5kQ29sb3IgPj4gMjQpIC8gMjU1LFxuICAgICAgICAobmV4dC5ibGVuZENvbG9yID4+IDE2ICYgMHhmZikgLyAyNTUsXG4gICAgICAgIChuZXh0LmJsZW5kQ29sb3IgPj4gOCAmIDB4ZmYpIC8gMjU1LFxuICAgICAgICAobmV4dC5ibGVuZENvbG9yICYgMHhmZikgLyAyNTVcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKG5leHQuYmxlbmRTZXApIHtcbiAgICAgIGdsLmJsZW5kRnVuY1NlcGFyYXRlKG5leHQuYmxlbmRTcmMsIG5leHQuYmxlbmREc3QsIG5leHQuYmxlbmRTcmNBbHBoYSwgbmV4dC5ibGVuZERzdEFscGhhKTtcbiAgICAgIGdsLmJsZW5kRXF1YXRpb25TZXBhcmF0ZShuZXh0LmJsZW5kRXEsIG5leHQuYmxlbmRBbHBoYUVxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2wuYmxlbmRGdW5jKG5leHQuYmxlbmRTcmMsIG5leHQuYmxlbmREc3QpO1xuICAgICAgZ2wuYmxlbmRFcXVhdGlvbihuZXh0LmJsZW5kRXEpO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIG5vdGhpbmcgdG8gdXBkYXRlXG4gIGlmIChuZXh0LmJsZW5kID09PSBmYWxzZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGJsZW5kLWNvbG9yXG4gIGlmIChjdXIuYmxlbmRDb2xvciAhPT0gbmV4dC5ibGVuZENvbG9yKSB7XG4gICAgZ2wuYmxlbmRDb2xvcihcbiAgICAgIChuZXh0LmJsZW5kQ29sb3IgPj4gMjQpIC8gMjU1LFxuICAgICAgKG5leHQuYmxlbmRDb2xvciA+PiAxNiAmIDB4ZmYpIC8gMjU1LFxuICAgICAgKG5leHQuYmxlbmRDb2xvciA+PiA4ICYgMHhmZikgLyAyNTUsXG4gICAgICAobmV4dC5ibGVuZENvbG9yICYgMHhmZikgLyAyNTVcbiAgICApO1xuICB9XG5cbiAgLy8gc2VwYXJhdGUgZGlmZiwgcmVzZXQgYWxsXG4gIGlmIChjdXIuYmxlbmRTZXAgIT09IG5leHQuYmxlbmRTZXApIHtcbiAgICBpZiAobmV4dC5ibGVuZFNlcCkge1xuICAgICAgZ2wuYmxlbmRGdW5jU2VwYXJhdGUobmV4dC5ibGVuZFNyYywgbmV4dC5ibGVuZERzdCwgbmV4dC5ibGVuZFNyY0FscGhhLCBuZXh0LmJsZW5kRHN0QWxwaGEpO1xuICAgICAgZ2wuYmxlbmRFcXVhdGlvblNlcGFyYXRlKG5leHQuYmxlbmRFcSwgbmV4dC5ibGVuZEFscGhhRXEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnbC5ibGVuZEZ1bmMobmV4dC5ibGVuZFNyYywgbmV4dC5ibGVuZERzdCk7XG4gICAgICBnbC5ibGVuZEVxdWF0aW9uKG5leHQuYmxlbmRFcSk7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKG5leHQuYmxlbmRTZXApIHtcbiAgICAvLyBibGVuZC1mdW5jLXNlcGFyYXRlXG4gICAgaWYgKFxuICAgICAgY3VyLmJsZW5kU3JjICE9PSBuZXh0LmJsZW5kU3JjIHx8XG4gICAgICBjdXIuYmxlbmREc3QgIT09IG5leHQuYmxlbmREc3QgfHxcbiAgICAgIGN1ci5ibGVuZFNyY0FscGhhICE9PSBuZXh0LmJsZW5kU3JjQWxwaGEgfHxcbiAgICAgIGN1ci5ibGVuZERzdEFscGhhICE9PSBuZXh0LmJsZW5kRHN0QWxwaGFcbiAgICApIHtcbiAgICAgIGdsLmJsZW5kRnVuY1NlcGFyYXRlKG5leHQuYmxlbmRTcmMsIG5leHQuYmxlbmREc3QsIG5leHQuYmxlbmRTcmNBbHBoYSwgbmV4dC5ibGVuZERzdEFscGhhKTtcbiAgICB9XG5cbiAgICAvLyBibGVuZC1lcXVhdGlvbi1zZXBhcmF0ZVxuICAgIGlmIChcbiAgICAgIGN1ci5ibGVuZEVxICE9PSBuZXh0LmJsZW5kRXEgfHxcbiAgICAgIGN1ci5ibGVuZEFscGhhRXEgIT09IG5leHQuYmxlbmRBbHBoYUVxXG4gICAgKSB7XG4gICAgICBnbC5ibGVuZEVxdWF0aW9uU2VwYXJhdGUobmV4dC5ibGVuZEVxLCBuZXh0LmJsZW5kQWxwaGFFcSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGJsZW5kLWZ1bmNcbiAgICBpZiAoXG4gICAgICBjdXIuYmxlbmRTcmMgIT09IG5leHQuYmxlbmRTcmMgfHxcbiAgICAgIGN1ci5ibGVuZERzdCAhPT0gbmV4dC5ibGVuZERzdFxuICAgICkge1xuICAgICAgZ2wuYmxlbmRGdW5jKG5leHQuYmxlbmRTcmMsIG5leHQuYmxlbmREc3QpO1xuICAgIH1cblxuICAgIC8vIGJsZW5kLWVxdWF0aW9uXG4gICAgaWYgKGN1ci5ibGVuZEVxICE9PSBuZXh0LmJsZW5kRXEpIHtcbiAgICAgIGdsLmJsZW5kRXF1YXRpb24obmV4dC5ibGVuZEVxKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBfY29tbWl0RGVwdGhTdGF0ZXNcbiAqL1xuZnVuY3Rpb24gX2NvbW1pdERlcHRoU3RhdGVzKGdsLCBjdXIsIG5leHQpIHtcbiAgLy8gZW5hYmxlL2Rpc2FibGUgZGVwdGgtdGVzdFxuICBpZiAoY3VyLmRlcHRoVGVzdCAhPT0gbmV4dC5kZXB0aFRlc3QpIHtcbiAgICBpZiAoIW5leHQuZGVwdGhUZXN0KSB7XG4gICAgICBnbC5kaXNhYmxlKGdsLkRFUFRIX1RFU1QpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcbiAgICBnbC5kZXB0aEZ1bmMobmV4dC5kZXB0aEZ1bmMpO1xuICAgIGdsLmRlcHRoTWFzayhuZXh0LmRlcHRoV3JpdGUpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gY29tbWl0IGRlcHRoLXdyaXRlXG4gIGlmIChjdXIuZGVwdGhXcml0ZSAhPT0gbmV4dC5kZXB0aFdyaXRlKSB7XG4gICAgZ2wuZGVwdGhNYXNrKG5leHQuZGVwdGhXcml0ZSk7XG4gIH1cblxuICAvLyBjaGVjayBpZiBkZXB0aC13cml0ZSBlbmFibGVkXG4gIGlmIChuZXh0LmRlcHRoVGVzdCA9PT0gZmFsc2UpIHtcbiAgICBpZiAobmV4dC5kZXB0aFdyaXRlKSB7XG4gICAgICBuZXh0LmRlcHRoVGVzdCA9IHRydWU7XG4gICAgICBuZXh0LmRlcHRoRnVuYyA9IGVudW1zLkRTX0ZVTkNfQUxXQVlTO1xuXG4gICAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgICBnbC5kZXB0aEZ1bmMobmV4dC5kZXB0aEZ1bmMpO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGRlcHRoLWZ1bmNcbiAgaWYgKGN1ci5kZXB0aEZ1bmMgIT09IG5leHQuZGVwdGhGdW5jKSB7XG4gICAgZ2wuZGVwdGhGdW5jKG5leHQuZGVwdGhGdW5jKTtcbiAgfVxufVxuXG4vKipcbiAqIF9jb21taXRTdGVuY2lsU3RhdGVzXG4gKi9cbmZ1bmN0aW9uIF9jb21taXRTdGVuY2lsU3RhdGVzKGdsLCBjdXIsIG5leHQpIHtcbiAgLy8gaW5oZXJpdCBzdGVuY2lsIHN0YXRlc1xuICBpZiAobmV4dC5zdGVuY2lsVGVzdCA9PT0gZW51bXMuU1RFTkNJTF9JTkhFUklUKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKG5leHQuc3RlbmNpbFRlc3QgIT09IGN1ci5zdGVuY2lsVGVzdCkge1xuICAgIGlmIChuZXh0LnN0ZW5jaWxUZXN0ID09PSBlbnVtcy5TVEVOQ0lMX0RJU0FCTEUpIHtcbiAgICAgIGdsLmRpc2FibGUoZ2wuU1RFTkNJTF9URVNUKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBnbC5lbmFibGUoZ2wuU1RFTkNJTF9URVNUKTtcblxuICAgIGlmIChuZXh0LnN0ZW5jaWxTZXApIHtcbiAgICAgIGdsLnN0ZW5jaWxGdW5jU2VwYXJhdGUoZ2wuRlJPTlQsIG5leHQuc3RlbmNpbEZ1bmNGcm9udCwgbmV4dC5zdGVuY2lsUmVmRnJvbnQsIG5leHQuc3RlbmNpbE1hc2tGcm9udCk7XG4gICAgICBnbC5zdGVuY2lsTWFza1NlcGFyYXRlKGdsLkZST05ULCBuZXh0LnN0ZW5jaWxXcml0ZU1hc2tGcm9udCk7XG4gICAgICBnbC5zdGVuY2lsT3BTZXBhcmF0ZShnbC5GUk9OVCwgbmV4dC5zdGVuY2lsRmFpbE9wRnJvbnQsIG5leHQuc3RlbmNpbFpGYWlsT3BGcm9udCwgbmV4dC5zdGVuY2lsWlBhc3NPcEZyb250KTtcbiAgICAgIGdsLnN0ZW5jaWxGdW5jU2VwYXJhdGUoZ2wuQkFDSywgbmV4dC5zdGVuY2lsRnVuY0JhY2ssIG5leHQuc3RlbmNpbFJlZkJhY2ssIG5leHQuc3RlbmNpbE1hc2tCYWNrKTtcbiAgICAgIGdsLnN0ZW5jaWxNYXNrU2VwYXJhdGUoZ2wuQkFDSywgbmV4dC5zdGVuY2lsV3JpdGVNYXNrQmFjayk7XG4gICAgICBnbC5zdGVuY2lsT3BTZXBhcmF0ZShnbC5CQUNLLCBuZXh0LnN0ZW5jaWxGYWlsT3BCYWNrLCBuZXh0LnN0ZW5jaWxaRmFpbE9wQmFjaywgbmV4dC5zdGVuY2lsWlBhc3NPcEJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBnbC5zdGVuY2lsRnVuYyhuZXh0LnN0ZW5jaWxGdW5jRnJvbnQsIG5leHQuc3RlbmNpbFJlZkZyb250LCBuZXh0LnN0ZW5jaWxNYXNrRnJvbnQpO1xuICAgICAgZ2wuc3RlbmNpbE1hc2sobmV4dC5zdGVuY2lsV3JpdGVNYXNrRnJvbnQpO1xuICAgICAgZ2wuc3RlbmNpbE9wKG5leHQuc3RlbmNpbEZhaWxPcEZyb250LCBuZXh0LnN0ZW5jaWxaRmFpbE9wRnJvbnQsIG5leHQuc3RlbmNpbFpQYXNzT3BGcm9udCk7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gZmFzdCByZXR1cm5cbiAgaWYgKG5leHQuc3RlbmNpbFRlc3QgPT09IGVudW1zLlNURU5DSUxfRElTQUJMRSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChjdXIuc3RlbmNpbFNlcCAhPT0gbmV4dC5zdGVuY2lsU2VwKSB7XG4gICAgaWYgKG5leHQuc3RlbmNpbFNlcCkge1xuICAgICAgZ2wuc3RlbmNpbEZ1bmNTZXBhcmF0ZShnbC5GUk9OVCwgbmV4dC5zdGVuY2lsRnVuY0Zyb250LCBuZXh0LnN0ZW5jaWxSZWZGcm9udCwgbmV4dC5zdGVuY2lsTWFza0Zyb250KTtcbiAgICAgIGdsLnN0ZW5jaWxNYXNrU2VwYXJhdGUoZ2wuRlJPTlQsIG5leHQuc3RlbmNpbFdyaXRlTWFza0Zyb250KTtcbiAgICAgIGdsLnN0ZW5jaWxPcFNlcGFyYXRlKGdsLkZST05ULCBuZXh0LnN0ZW5jaWxGYWlsT3BGcm9udCwgbmV4dC5zdGVuY2lsWkZhaWxPcEZyb250LCBuZXh0LnN0ZW5jaWxaUGFzc09wRnJvbnQpO1xuICAgICAgZ2wuc3RlbmNpbEZ1bmNTZXBhcmF0ZShnbC5CQUNLLCBuZXh0LnN0ZW5jaWxGdW5jQmFjaywgbmV4dC5zdGVuY2lsUmVmQmFjaywgbmV4dC5zdGVuY2lsTWFza0JhY2spO1xuICAgICAgZ2wuc3RlbmNpbE1hc2tTZXBhcmF0ZShnbC5CQUNLLCBuZXh0LnN0ZW5jaWxXcml0ZU1hc2tCYWNrKTtcbiAgICAgIGdsLnN0ZW5jaWxPcFNlcGFyYXRlKGdsLkJBQ0ssIG5leHQuc3RlbmNpbEZhaWxPcEJhY2ssIG5leHQuc3RlbmNpbFpGYWlsT3BCYWNrLCBuZXh0LnN0ZW5jaWxaUGFzc09wQmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdsLnN0ZW5jaWxGdW5jKG5leHQuc3RlbmNpbEZ1bmNGcm9udCwgbmV4dC5zdGVuY2lsUmVmRnJvbnQsIG5leHQuc3RlbmNpbE1hc2tGcm9udCk7XG4gICAgICBnbC5zdGVuY2lsTWFzayhuZXh0LnN0ZW5jaWxXcml0ZU1hc2tGcm9udCk7XG4gICAgICBnbC5zdGVuY2lsT3AobmV4dC5zdGVuY2lsRmFpbE9wRnJvbnQsIG5leHQuc3RlbmNpbFpGYWlsT3BGcm9udCwgbmV4dC5zdGVuY2lsWlBhc3NPcEZyb250KTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKG5leHQuc3RlbmNpbFNlcCkge1xuICAgIC8vIGZyb250XG4gICAgaWYgKFxuICAgICAgY3VyLnN0ZW5jaWxGdW5jRnJvbnQgIT09IG5leHQuc3RlbmNpbEZ1bmNGcm9udCB8fFxuICAgICAgY3VyLnN0ZW5jaWxSZWZGcm9udCAhPT0gbmV4dC5zdGVuY2lsUmVmRnJvbnQgfHxcbiAgICAgIGN1ci5zdGVuY2lsTWFza0Zyb250ICE9PSBuZXh0LnN0ZW5jaWxNYXNrRnJvbnRcbiAgICApIHtcbiAgICAgIGdsLnN0ZW5jaWxGdW5jU2VwYXJhdGUoZ2wuRlJPTlQsIG5leHQuc3RlbmNpbEZ1bmNGcm9udCwgbmV4dC5zdGVuY2lsUmVmRnJvbnQsIG5leHQuc3RlbmNpbE1hc2tGcm9udCk7XG4gICAgfVxuICAgIGlmIChjdXIuc3RlbmNpbFdyaXRlTWFza0Zyb250ICE9PSBuZXh0LnN0ZW5jaWxXcml0ZU1hc2tGcm9udCkge1xuICAgICAgZ2wuc3RlbmNpbE1hc2tTZXBhcmF0ZShnbC5GUk9OVCwgbmV4dC5zdGVuY2lsV3JpdGVNYXNrRnJvbnQpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBjdXIuc3RlbmNpbEZhaWxPcEZyb250ICE9PSBuZXh0LnN0ZW5jaWxGYWlsT3BGcm9udCB8fFxuICAgICAgY3VyLnN0ZW5jaWxaRmFpbE9wRnJvbnQgIT09IG5leHQuc3RlbmNpbFpGYWlsT3BGcm9udCB8fFxuICAgICAgY3VyLnN0ZW5jaWxaUGFzc09wRnJvbnQgIT09IG5leHQuc3RlbmNpbFpQYXNzT3BGcm9udFxuICAgICkge1xuICAgICAgZ2wuc3RlbmNpbE9wU2VwYXJhdGUoZ2wuRlJPTlQsIG5leHQuc3RlbmNpbEZhaWxPcEZyb250LCBuZXh0LnN0ZW5jaWxaRmFpbE9wRnJvbnQsIG5leHQuc3RlbmNpbFpQYXNzT3BGcm9udCk7XG4gICAgfVxuXG4gICAgLy8gYmFja1xuICAgIGlmIChcbiAgICAgIGN1ci5zdGVuY2lsRnVuY0JhY2sgIT09IG5leHQuc3RlbmNpbEZ1bmNCYWNrIHx8XG4gICAgICBjdXIuc3RlbmNpbFJlZkJhY2sgIT09IG5leHQuc3RlbmNpbFJlZkJhY2sgfHxcbiAgICAgIGN1ci5zdGVuY2lsTWFza0JhY2sgIT09IG5leHQuc3RlbmNpbE1hc2tCYWNrXG4gICAgKSB7XG4gICAgICBnbC5zdGVuY2lsRnVuY1NlcGFyYXRlKGdsLkJBQ0ssIG5leHQuc3RlbmNpbEZ1bmNCYWNrLCBuZXh0LnN0ZW5jaWxSZWZCYWNrLCBuZXh0LnN0ZW5jaWxNYXNrQmFjayk7XG4gICAgfVxuICAgIGlmIChjdXIuc3RlbmNpbFdyaXRlTWFza0JhY2sgIT09IG5leHQuc3RlbmNpbFdyaXRlTWFza0JhY2spIHtcbiAgICAgIGdsLnN0ZW5jaWxNYXNrU2VwYXJhdGUoZ2wuQkFDSywgbmV4dC5zdGVuY2lsV3JpdGVNYXNrQmFjayk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGN1ci5zdGVuY2lsRmFpbE9wQmFjayAhPT0gbmV4dC5zdGVuY2lsRmFpbE9wQmFjayB8fFxuICAgICAgY3VyLnN0ZW5jaWxaRmFpbE9wQmFjayAhPT0gbmV4dC5zdGVuY2lsWkZhaWxPcEJhY2sgfHxcbiAgICAgIGN1ci5zdGVuY2lsWlBhc3NPcEJhY2sgIT09IG5leHQuc3RlbmNpbFpQYXNzT3BCYWNrXG4gICAgKSB7XG4gICAgICBnbC5zdGVuY2lsT3BTZXBhcmF0ZShnbC5CQUNLLCBuZXh0LnN0ZW5jaWxGYWlsT3BCYWNrLCBuZXh0LnN0ZW5jaWxaRmFpbE9wQmFjaywgbmV4dC5zdGVuY2lsWlBhc3NPcEJhY2spO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoXG4gICAgICBjdXIuc3RlbmNpbEZ1bmNGcm9udCAhPT0gbmV4dC5zdGVuY2lsRnVuY0Zyb250IHx8XG4gICAgICBjdXIuc3RlbmNpbFJlZkZyb250ICE9PSBuZXh0LnN0ZW5jaWxSZWZGcm9udCB8fFxuICAgICAgY3VyLnN0ZW5jaWxNYXNrRnJvbnQgIT09IG5leHQuc3RlbmNpbE1hc2tGcm9udFxuICAgICkge1xuICAgICAgZ2wuc3RlbmNpbEZ1bmMobmV4dC5zdGVuY2lsRnVuY0Zyb250LCBuZXh0LnN0ZW5jaWxSZWZGcm9udCwgbmV4dC5zdGVuY2lsTWFza0Zyb250KTtcbiAgICB9XG4gICAgaWYgKGN1ci5zdGVuY2lsV3JpdGVNYXNrRnJvbnQgIT09IG5leHQuc3RlbmNpbFdyaXRlTWFza0Zyb250KSB7XG4gICAgICBnbC5zdGVuY2lsTWFzayhuZXh0LnN0ZW5jaWxXcml0ZU1hc2tGcm9udCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGN1ci5zdGVuY2lsRmFpbE9wRnJvbnQgIT09IG5leHQuc3RlbmNpbEZhaWxPcEZyb250IHx8XG4gICAgICBjdXIuc3RlbmNpbFpGYWlsT3BGcm9udCAhPT0gbmV4dC5zdGVuY2lsWkZhaWxPcEZyb250IHx8XG4gICAgICBjdXIuc3RlbmNpbFpQYXNzT3BGcm9udCAhPT0gbmV4dC5zdGVuY2lsWlBhc3NPcEZyb250XG4gICAgKSB7XG4gICAgICBnbC5zdGVuY2lsT3AobmV4dC5zdGVuY2lsRmFpbE9wRnJvbnQsIG5leHQuc3RlbmNpbFpGYWlsT3BGcm9udCwgbmV4dC5zdGVuY2lsWlBhc3NPcEZyb250KTtcbiAgICB9XG4gIH1cblxufVxuXG4vKipcbiAqIF9jb21taXRDdWxsTW9kZVxuICovXG5mdW5jdGlvbiBfY29tbWl0Q3VsbE1vZGUoZ2wsIGN1ciwgbmV4dCkge1xuICBpZiAoY3VyLmN1bGxNb2RlID09PSBuZXh0LmN1bGxNb2RlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKG5leHQuY3VsbE1vZGUgPT09IGVudW1zLkNVTExfTk9ORSkge1xuICAgIGdsLmRpc2FibGUoZ2wuQ1VMTF9GQUNFKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBnbC5lbmFibGUoZ2wuQ1VMTF9GQUNFKTtcbiAgZ2wuY3VsbEZhY2UobmV4dC5jdWxsTW9kZSk7XG59XG5cbi8qKlxuICogX2NvbW1pdFZlcnRleEJ1ZmZlcnNcbiAqL1xuZnVuY3Rpb24gX2NvbW1pdFZlcnRleEJ1ZmZlcnMoZGV2aWNlLCBnbCwgY3VyLCBuZXh0KSB7XG4gIGxldCBhdHRyc0RpcnR5ID0gZmFsc2U7XG5cbiAgLy8gbm90aGluZyBjaGFuZ2VkIGZvciB2ZXJ0ZXggYnVmZmVyXG4gIGlmIChuZXh0Lm1heFN0cmVhbSA9PT0gLTEpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY3VyLm1heFN0cmVhbSAhPT0gbmV4dC5tYXhTdHJlYW0pIHtcbiAgICBhdHRyc0RpcnR5ID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChjdXIucHJvZ3JhbSAhPT0gbmV4dC5wcm9ncmFtKSB7XG4gICAgYXR0cnNEaXJ0eSA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXh0Lm1heFN0cmVhbSArIDE7ICsraSkge1xuICAgICAgaWYgKFxuICAgICAgICBjdXIudmVydGV4QnVmZmVyc1tpXSAhPT0gbmV4dC52ZXJ0ZXhCdWZmZXJzW2ldIHx8XG4gICAgICAgIGN1ci52ZXJ0ZXhCdWZmZXJPZmZzZXRzW2ldICE9PSBuZXh0LnZlcnRleEJ1ZmZlck9mZnNldHNbaV1cbiAgICAgICkge1xuICAgICAgICBhdHRyc0RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGF0dHJzRGlydHkpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRldmljZS5fY2Fwcy5tYXhWZXJ0ZXhBdHRyaWJzOyArK2kpIHtcbiAgICAgIGRldmljZS5fbmV3QXR0cmlidXRlc1tpXSA9IDA7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXh0Lm1heFN0cmVhbSArIDE7ICsraSkge1xuICAgICAgbGV0IHZiID0gbmV4dC52ZXJ0ZXhCdWZmZXJzW2ldO1xuICAgICAgbGV0IHZiT2Zmc2V0ID0gbmV4dC52ZXJ0ZXhCdWZmZXJPZmZzZXRzW2ldO1xuICAgICAgaWYgKCF2YiB8fCB2Yi5fZ2xJRCA9PT0gLTEpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2Yi5fZ2xJRCk7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbmV4dC5wcm9ncmFtLl9hdHRyaWJ1dGVzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGxldCBhdHRyID0gbmV4dC5wcm9ncmFtLl9hdHRyaWJ1dGVzW2pdO1xuXG4gICAgICAgIGxldCBlbCA9IHZiLl9mb3JtYXQuZWxlbWVudChhdHRyLm5hbWUpO1xuICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKGBDYW4gbm90IGZpbmQgdmVydGV4IGF0dHJpYnV0ZTogJHthdHRyLm5hbWV9YCk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGV2aWNlLl9lbmFibGVkQXR0cmlidXRlc1thdHRyLmxvY2F0aW9uXSA9PT0gMCkge1xuICAgICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dHIubG9jYXRpb24pO1xuICAgICAgICAgIGRldmljZS5fZW5hYmxlZEF0dHJpYnV0ZXNbYXR0ci5sb2NhdGlvbl0gPSAxO1xuICAgICAgICB9XG4gICAgICAgIGRldmljZS5fbmV3QXR0cmlidXRlc1thdHRyLmxvY2F0aW9uXSA9IDE7XG5cbiAgICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihcbiAgICAgICAgICBhdHRyLmxvY2F0aW9uLFxuICAgICAgICAgIGVsLm51bSxcbiAgICAgICAgICBlbC50eXBlLFxuICAgICAgICAgIGVsLm5vcm1hbGl6ZSxcbiAgICAgICAgICBlbC5zdHJpZGUsXG4gICAgICAgICAgZWwub2Zmc2V0ICsgdmJPZmZzZXQgKiBlbC5zdHJpZGVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkaXNhYmxlIHVudXNlZCBhdHRyaWJ1dGVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXZpY2UuX2NhcHMubWF4VmVydGV4QXR0cmliczsgKytpKSB7XG4gICAgICBpZiAoZGV2aWNlLl9lbmFibGVkQXR0cmlidXRlc1tpXSAhPT0gZGV2aWNlLl9uZXdBdHRyaWJ1dGVzW2ldKSB7XG4gICAgICAgIGdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheShpKTtcbiAgICAgICAgZGV2aWNlLl9lbmFibGVkQXR0cmlidXRlc1tpXSA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogX2NvbW1pdFRleHR1cmVzXG4gKi9cbmZ1bmN0aW9uIF9jb21taXRUZXh0dXJlcyhnbCwgY3VyLCBuZXh0KSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmV4dC5tYXhUZXh0dXJlU2xvdCArIDE7ICsraSkge1xuICAgIGlmIChjdXIudGV4dHVyZVVuaXRzW2ldICE9PSBuZXh0LnRleHR1cmVVbml0c1tpXSkge1xuICAgICAgbGV0IHRleHR1cmUgPSBuZXh0LnRleHR1cmVVbml0c1tpXTtcbiAgICAgIGlmICh0ZXh0dXJlICYmIHRleHR1cmUuX2dsSUQgIT09IC0xKSB7XG4gICAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyBpKTtcbiAgICAgICAgZ2wuYmluZFRleHR1cmUodGV4dHVyZS5fdGFyZ2V0LCB0ZXh0dXJlLl9nbElEKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBfYXR0YWNoXG4gKi9cbmZ1bmN0aW9uIF9hdHRhY2goZ2wsIGxvY2F0aW9uLCBhdHRhY2htZW50LCBmYWNlID0gMCkge1xuICBpZiAoYXR0YWNobWVudCBpbnN0YW5jZW9mIFRleHR1cmUyRCkge1xuICAgIGdsLmZyYW1lYnVmZmVyVGV4dHVyZTJEKFxuICAgICAgZ2wuRlJBTUVCVUZGRVIsXG4gICAgICBsb2NhdGlvbixcbiAgICAgIGdsLlRFWFRVUkVfMkQsXG4gICAgICBhdHRhY2htZW50Ll9nbElELFxuICAgICAgMFxuICAgICk7XG4gIH0gZWxzZSBpZiAoYXR0YWNobWVudCBpbnN0YW5jZW9mIFRleHR1cmVDdWJlKSB7XG4gICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoXG4gICAgICBnbC5GUkFNRUJVRkZFUixcbiAgICAgIGxvY2F0aW9uLFxuICAgICAgZ2wuVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YICsgZmFjZSxcbiAgICAgIGF0dGFjaG1lbnQuX2dsSUQsXG4gICAgICAwXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBnbC5mcmFtZWJ1ZmZlclJlbmRlcmJ1ZmZlcihcbiAgICAgIGdsLkZSQU1FQlVGRkVSLFxuICAgICAgbG9jYXRpb24sXG4gICAgICBnbC5SRU5ERVJCVUZGRVIsXG4gICAgICBhdHRhY2htZW50Ll9nbElEXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXZpY2Uge1xuICAvKipcbiAgICogQHByb3BlcnR5IGNhcHNcbiAgICovXG4gIGdldCBjYXBzKCkge1xuICAgIHJldHVybiB0aGlzLl9jYXBzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNhbnZhc0VMXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjYW52YXNFTCwgb3B0cykge1xuICAgIGxldCBnbDtcblxuICAgIC8vIGRlZmF1bHQgb3B0aW9uc1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIGlmIChvcHRzLmFscGhhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9wdHMuYWxwaGEgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKG9wdHMuc3RlbmNpbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcHRzLnN0ZW5jaWwgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAob3B0cy5kZXB0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcHRzLmRlcHRoID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG9wdHMuYW50aWFsaWFzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9wdHMuYW50aWFsaWFzID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIE5PVEU6IGl0IGlzIHNhaWQgdGhlIHBlcmZvcm1hbmNlIGltcHJvdmVkIGluIG1vYmlsZSBkZXZpY2Ugd2l0aCB0aGlzIGZsYWcgb2ZmLlxuICAgIGlmIChvcHRzLnByZXNlcnZlRHJhd2luZ0J1ZmZlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBvcHRzLnByZXNlcnZlRHJhd2luZ0J1ZmZlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBnbCA9IGNhbnZhc0VMLmdldENvbnRleHQoJ3dlYmdsJywgb3B0cylcbiAgICAgICAgfHwgY2FudmFzRUwuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJywgb3B0cylcbiAgICAgICAgfHwgY2FudmFzRUwuZ2V0Q29udGV4dCgnd2Via2l0LTNkJywgb3B0cylcbiAgICAgICAgfHwgY2FudmFzRUwuZ2V0Q29udGV4dCgnbW96LXdlYmdsJywgb3B0cyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTm8gZXJyb3JzIGFyZSB0aHJvd24gdXNpbmcgdHJ5IGNhdGNoXG4gICAgLy8gVGVzdGVkIHRocm91Z2ggaW9zIGJhaWR1IGJyb3dzZXIgNC4xNC4xXG4gICAgaWYgKCFnbCkge1xuICAgICAgY29uc29sZS5lcnJvcignVGhpcyBkZXZpY2UgZG9lcyBub3Qgc3VwcG9ydCB3ZWJnbCcpO1xuICAgIH1cblxuICAgIC8vIHN0YXRpY3NcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fVxuICAgICAqL1xuICAgIHRoaXMuX2dsID0gZ2w7XG4gICAgdGhpcy5fZXh0ZW5zaW9ucyA9IHt9O1xuICAgIHRoaXMuX2NhcHMgPSB7fTsgLy8gY2FwYWJpbGl0eVxuICAgIHRoaXMuX3N0YXRzID0ge1xuICAgICAgdGV4dHVyZTogMCxcbiAgICAgIHZiOiAwLFxuICAgICAgaWI6IDAsXG4gICAgICBkcmF3Y2FsbHM6IDAsXG4gICAgfTtcblxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL3poLUNOL2RvY3MvV2ViL0FQSS9XZWJHTF9BUEkvVXNpbmdfRXh0ZW5zaW9uc1xuICAgIHRoaXMuX2luaXRFeHRlbnNpb25zKFtcbiAgICAgICdFWFRfdGV4dHVyZV9maWx0ZXJfYW5pc290cm9waWMnLFxuICAgICAgJ0VYVF9zaGFkZXJfdGV4dHVyZV9sb2QnLFxuICAgICAgJ09FU19zdGFuZGFyZF9kZXJpdmF0aXZlcycsXG4gICAgICAnT0VTX3RleHR1cmVfZmxvYXQnLFxuICAgICAgJ09FU190ZXh0dXJlX2Zsb2F0X2xpbmVhcicsXG4gICAgICAnT0VTX3RleHR1cmVfaGFsZl9mbG9hdCcsXG4gICAgICAnT0VTX3RleHR1cmVfaGFsZl9mbG9hdF9saW5lYXInLFxuICAgICAgJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JyxcbiAgICAgICdXRUJHTF9jb21wcmVzc2VkX3RleHR1cmVfYXRjJyxcbiAgICAgICdXRUJHTF9jb21wcmVzc2VkX3RleHR1cmVfZXRjJyxcbiAgICAgICdXRUJHTF9jb21wcmVzc2VkX3RleHR1cmVfZXRjMScsXG4gICAgICAnV0VCR0xfY29tcHJlc3NlZF90ZXh0dXJlX3B2cnRjJyxcbiAgICAgICdXRUJHTF9jb21wcmVzc2VkX3RleHR1cmVfczN0YycsXG4gICAgICAnV0VCR0xfZGVwdGhfdGV4dHVyZScsXG4gICAgICAnV0VCR0xfZHJhd19idWZmZXJzJyxcbiAgICBdKTtcbiAgICB0aGlzLl9pbml0Q2FwcygpO1xuICAgIHRoaXMuX2luaXRTdGF0ZXMoKTtcblxuICAgIC8vIHJ1bnRpbWVcbiAgICBTdGF0ZS5pbml0RGVmYXVsdCh0aGlzKTtcbiAgICB0aGlzLl9jdXJyZW50ID0gbmV3IFN0YXRlKHRoaXMpO1xuICAgIHRoaXMuX25leHQgPSBuZXcgU3RhdGUodGhpcyk7XG4gICAgdGhpcy5fdW5pZm9ybXMgPSB7fTsgLy8gbmFtZTogeyB2YWx1ZSwgbnVtLCBkaXJ0eSB9XG4gICAgdGhpcy5fdnggPSB0aGlzLl92eSA9IHRoaXMuX3Z3ID0gdGhpcy5fdmggPSAwO1xuICAgIHRoaXMuX3N4ID0gdGhpcy5fc3kgPSB0aGlzLl9zdyA9IHRoaXMuX3NoID0gMDtcbiAgICB0aGlzLl9mcmFtZWJ1ZmZlciA9IG51bGw7XG5cbiAgICAvL1xuICAgIHRoaXMuX2VuYWJsZWRBdHRyaWJ1dGVzID0gbmV3IEFycmF5KHRoaXMuX2NhcHMubWF4VmVydGV4QXR0cmlicyk7XG4gICAgdGhpcy5fbmV3QXR0cmlidXRlcyA9IG5ldyBBcnJheSh0aGlzLl9jYXBzLm1heFZlcnRleEF0dHJpYnMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jYXBzLm1heFZlcnRleEF0dHJpYnM7ICsraSkge1xuICAgICAgdGhpcy5fZW5hYmxlZEF0dHJpYnV0ZXNbaV0gPSAwO1xuICAgICAgdGhpcy5fbmV3QXR0cmlidXRlc1tpXSA9IDA7XG4gICAgfVxuICB9XG5cbiAgX2luaXRFeHRlbnNpb25zKGV4dGVuc2lvbnMpIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleHRlbnNpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICBsZXQgbmFtZSA9IGV4dGVuc2lvbnNbaV07XG4gICAgICBsZXQgdmVuZG9yUHJlZml4ZXMgPSBbXCJcIiwgXCJXRUJLSVRfXCIsIFwiTU9aX1wiXTtcblxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2ZW5kb3JQcmVmaXhlcy5sZW5ndGg7IGorKykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxldCBleHQgPSBnbC5nZXRFeHRlbnNpb24odmVuZG9yUHJlZml4ZXNbal0gKyBuYW1lKTtcbiAgICAgICAgICBpZiAoZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl9leHRlbnNpb25zW25hbWVdID0gZXh0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9pbml0Q2FwcygpIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuICAgIGNvbnN0IGV4dERyYXdCdWZmZXJzID0gdGhpcy5leHQoJ1dFQkdMX2RyYXdfYnVmZmVycycpO1xuXG4gICAgdGhpcy5fY2Fwcy5tYXhWZXJ0ZXhTdHJlYW1zID0gNDtcbiAgICB0aGlzLl9jYXBzLm1heFZlcnRleFRleHR1cmVzID0gZ2wuZ2V0UGFyYW1ldGVyKGdsLk1BWF9WRVJURVhfVEVYVFVSRV9JTUFHRV9VTklUUyk7XG4gICAgdGhpcy5fY2Fwcy5tYXhGcmFnVW5pZm9ybXMgPSBnbC5nZXRQYXJhbWV0ZXIoZ2wuTUFYX0ZSQUdNRU5UX1VOSUZPUk1fVkVDVE9SUyk7XG4gICAgdGhpcy5fY2Fwcy5tYXhUZXh0dXJlVW5pdHMgPSBnbC5nZXRQYXJhbWV0ZXIoZ2wuTUFYX1RFWFRVUkVfSU1BR0VfVU5JVFMpO1xuICAgIHRoaXMuX2NhcHMubWF4VmVydGV4QXR0cmlicyA9IGdsLmdldFBhcmFtZXRlcihnbC5NQVhfVkVSVEVYX0FUVFJJQlMpO1xuICAgIHRoaXMuX2NhcHMubWF4VGV4dHVyZVNpemUgPSBnbC5nZXRQYXJhbWV0ZXIoZ2wuTUFYX1RFWFRVUkVfU0laRSk7XG5cbiAgICB0aGlzLl9jYXBzLm1heERyYXdCdWZmZXJzID0gZXh0RHJhd0J1ZmZlcnMgPyBnbC5nZXRQYXJhbWV0ZXIoZXh0RHJhd0J1ZmZlcnMuTUFYX0RSQVdfQlVGRkVSU19XRUJHTCkgOiAxO1xuICAgIHRoaXMuX2NhcHMubWF4Q29sb3JBdHRhY2htZW50cyA9IGV4dERyYXdCdWZmZXJzID8gZ2wuZ2V0UGFyYW1ldGVyKGV4dERyYXdCdWZmZXJzLk1BWF9DT0xPUl9BVFRBQ0hNRU5UU19XRUJHTCkgOiAxO1xuICB9XG5cbiAgX2luaXRTdGF0ZXMoKSB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcblxuICAgIC8vIGdsLmZyb250RmFjZShnbC5DQ1cpO1xuICAgIGdsLmRpc2FibGUoZ2wuQkxFTkQpO1xuICAgIGdsLmJsZW5kRnVuYyhnbC5PTkUsIGdsLlpFUk8pO1xuICAgIGdsLmJsZW5kRXF1YXRpb24oZ2wuRlVOQ19BREQpO1xuICAgIGdsLmJsZW5kQ29sb3IoMSwxLDEsMSk7XG5cbiAgICBnbC5jb2xvck1hc2sodHJ1ZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICBnbC5lbmFibGUoZ2wuQ1VMTF9GQUNFKTtcbiAgICBnbC5jdWxsRmFjZShnbC5CQUNLKTtcblxuICAgIGdsLmRpc2FibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgZ2wuZGVwdGhGdW5jKGdsLkxFU1MpO1xuICAgIGdsLmRlcHRoTWFzayhmYWxzZSk7XG4gICAgZ2wuZGlzYWJsZShnbC5QT0xZR09OX09GRlNFVF9GSUxMKTtcbiAgICBnbC5kZXB0aFJhbmdlKDAsMSk7XG5cbiAgICBnbC5kaXNhYmxlKGdsLlNURU5DSUxfVEVTVCk7XG4gICAgZ2wuc3RlbmNpbEZ1bmMoZ2wuQUxXQVlTLCAwLCAweEZGKTtcbiAgICBnbC5zdGVuY2lsTWFzaygweEZGKTtcbiAgICBnbC5zdGVuY2lsT3AoZ2wuS0VFUCwgZ2wuS0VFUCwgZ2wuS0VFUCk7XG5cbiAgICAvLyBUT0RPOlxuICAgIC8vIHRoaXMuc2V0QWxwaGFUb0NvdmVyYWdlKGZhbHNlKTtcbiAgICAvLyB0aGlzLnNldFRyYW5zZm9ybUZlZWRiYWNrQnVmZmVyKG51bGwpO1xuICAgIC8vIHRoaXMuc2V0UmFzdGVyKHRydWUpO1xuICAgIC8vIHRoaXMuc2V0RGVwdGhCaWFzKGZhbHNlKTtcblxuICAgIGdsLmNsZWFyRGVwdGgoMSk7XG4gICAgZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAwKTtcbiAgICBnbC5jbGVhclN0ZW5jaWwoMCk7XG5cbiAgICBnbC5kaXNhYmxlKGdsLlNDSVNTT1JfVEVTVCk7XG4gIH1cblxuICBfcmVzdG9yZVRleHR1cmUodW5pdCkge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG5cbiAgICBsZXQgdGV4dHVyZSA9IHRoaXMuX2N1cnJlbnQudGV4dHVyZVVuaXRzW3VuaXRdO1xuICAgIGlmICh0ZXh0dXJlICYmIHRleHR1cmUuX2dsSUQgIT09IC0xKSB7XG4gICAgICBnbC5iaW5kVGV4dHVyZSh0ZXh0dXJlLl90YXJnZXQsIHRleHR1cmUuX2dsSUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcbiAgICB9XG4gIH1cblxuICBfcmVzdG9yZUluZGV4QnVmZmVyICgpIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuXG4gICAgbGV0IGliID0gdGhpcy5fY3VycmVudC5pbmRleEJ1ZmZlcjtcbiAgICBpZiAoaWIgJiYgaWIuX2dsSUQgIT09IC0xKSB7XG4gICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpYi5fZ2xJRCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbnVsbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZXh0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqL1xuICBleHQobmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9leHRlbnNpb25zW25hbWVdO1xuICB9XG5cbiAgYWxsb3dGbG9hdFRleHR1cmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXh0KFwiT0VTX3RleHR1cmVfZmxvYXRcIikgIT0gbnVsbDtcbiAgfVxuXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgLy8gSW1tZWRpYXRlIFNldHRpbmdzXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRGcmFtZUJ1ZmZlclxuICAgKiBAcGFyYW0ge0ZyYW1lQnVmZmVyfSBmYiAtIG51bGwgbWVhbnMgdXNlIHRoZSBiYWNrYnVmZmVyXG4gICAqL1xuICBzZXRGcmFtZUJ1ZmZlcihmYikge1xuICAgIGlmICh0aGlzLl9mcmFtZWJ1ZmZlciA9PT0gZmIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9mcmFtZWJ1ZmZlciA9IGZiO1xuICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG5cbiAgICBpZiAoIWZiKSB7XG4gICAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIG51bGwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgZmIuX2dsSUQpO1xuXG4gICAgbGV0IG51bUNvbG9ycyA9IGZiLl9jb2xvcnMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ29sb3JzOyArK2kpIHtcbiAgICAgIGxldCBjb2xvckJ1ZmZlciA9IGZiLl9jb2xvcnNbaV07XG4gICAgICBfYXR0YWNoKGdsLCBnbC5DT0xPUl9BVFRBQ0hNRU5UMCArIGksIGNvbG9yQnVmZmVyKTtcblxuICAgICAgLy8gVE9ETzogd2hhdCBhYm91dCBjdWJlbWFwIGZhY2U/Pz8gc2hvdWxkIGJlIHRoZSB0YXJnZXQgcGFyYW1ldGVyIGZvciBjb2xvckJ1ZmZlclxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gbnVtQ29sb3JzOyBpIDwgdGhpcy5fY2Fwcy5tYXhDb2xvckF0dGFjaG1lbnRzOyArK2kpIHtcbiAgICAgIGdsLmZyYW1lYnVmZmVyVGV4dHVyZTJEKFxuICAgICAgICBnbC5GUkFNRUJVRkZFUixcbiAgICAgICAgZ2wuQ09MT1JfQVRUQUNITUVOVDAgKyBpLFxuICAgICAgICBnbC5URVhUVVJFXzJELFxuICAgICAgICBudWxsLFxuICAgICAgICAwXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChmYi5fZGVwdGgpIHtcbiAgICAgIF9hdHRhY2goZ2wsIGdsLkRFUFRIX0FUVEFDSE1FTlQsIGZiLl9kZXB0aCk7XG4gICAgfVxuXG4gICAgaWYgKGZiLl9zdGVuY2lsKSB7XG4gICAgICBfYXR0YWNoKGdsLCBnbC5TVEVOQ0lMX0FUVEFDSE1FTlQsIGZiLl9zdGVuY2lsKTtcbiAgICB9XG5cbiAgICBpZiAoZmIuX2RlcHRoU3RlbmNpbCkge1xuICAgICAgX2F0dGFjaChnbCwgZ2wuREVQVEhfU1RFTkNJTF9BVFRBQ0hNRU5ULCBmYi5fZGVwdGhTdGVuY2lsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRWaWV3cG9ydFxuICAgKiBAcGFyYW0ge051bWJlcn0geFxuICAgKiBAcGFyYW0ge051bWJlcn0geVxuICAgKiBAcGFyYW0ge051bWJlcn0gd1xuICAgKiBAcGFyYW0ge051bWJlcn0gaFxuICAgKi9cbiAgc2V0Vmlld3BvcnQoeCwgeSwgdywgaCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuX3Z4ICE9PSB4IHx8XG4gICAgICB0aGlzLl92eSAhPT0geSB8fFxuICAgICAgdGhpcy5fdncgIT09IHcgfHxcbiAgICAgIHRoaXMuX3ZoICE9PSBoXG4gICAgKSB7XG4gICAgICB0aGlzLl9nbC52aWV3cG9ydCh4LCB5LCB3LCBoKTtcbiAgICAgIHRoaXMuX3Z4ID0geDtcbiAgICAgIHRoaXMuX3Z5ID0geTtcbiAgICAgIHRoaXMuX3Z3ID0gdztcbiAgICAgIHRoaXMuX3ZoID0gaDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRTY2lzc29yXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBoXG4gICAqL1xuICBzZXRTY2lzc29yKHgsIHksIHcsIGgpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLl9zeCAhPT0geCB8fFxuICAgICAgdGhpcy5fc3kgIT09IHkgfHxcbiAgICAgIHRoaXMuX3N3ICE9PSB3IHx8XG4gICAgICB0aGlzLl9zaCAhPT0gaFxuICAgICkge1xuICAgICAgdGhpcy5fZ2wuc2Npc3Nvcih4LCB5LCB3LCBoKTtcbiAgICAgIHRoaXMuX3N4ID0geDtcbiAgICAgIHRoaXMuX3N5ID0geTtcbiAgICAgIHRoaXMuX3N3ID0gdztcbiAgICAgIHRoaXMuX3NoID0gaDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBjbGVhclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRzLmNvbG9yXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLmRlcHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLnN0ZW5jaWxcbiAgICovXG4gIGNsZWFyKG9wdHMpIHtcbiAgICBpZiAob3B0cy5jb2xvciA9PT0gdW5kZWZpbmVkICYmIG9wdHMuZGVwdGggPT09IHVuZGVmaW5lZCAmJiBvcHRzLnN0ZW5jaWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgbGV0IGZsYWdzID0gMDtcblxuICAgIGlmIChvcHRzLmNvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZsYWdzIHw9IGdsLkNPTE9SX0JVRkZFUl9CSVQ7XG4gICAgICBnbC5jbGVhckNvbG9yKG9wdHMuY29sb3JbMF0sIG9wdHMuY29sb3JbMV0sIG9wdHMuY29sb3JbMl0sIG9wdHMuY29sb3JbM10pO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmRlcHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZsYWdzIHw9IGdsLkRFUFRIX0JVRkZFUl9CSVQ7XG4gICAgICBnbC5jbGVhckRlcHRoKG9wdHMuZGVwdGgpO1xuXG4gICAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgICBnbC5kZXB0aE1hc2sodHJ1ZSk7XG4gICAgICBnbC5kZXB0aEZ1bmMoZ2wuQUxXQVlTKTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5zdGVuY2lsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZsYWdzIHw9IGdsLlNURU5DSUxfQlVGRkVSX0JJVDtcbiAgICAgIGdsLmNsZWFyU3RlbmNpbChvcHRzLnN0ZW5jaWwpO1xuICAgIH1cblxuICAgIGdsLmNsZWFyKGZsYWdzKTtcblxuICAgIC8vIHJlc3RvcmUgZGVwdGgtd3JpdGVcbiAgICBpZiAob3B0cy5kZXB0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodGhpcy5fY3VycmVudC5kZXB0aFRlc3QgPT09IGZhbHNlKSB7XG4gICAgICAgIGdsLmRpc2FibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudC5kZXB0aFdyaXRlID09PSBmYWxzZSkge1xuICAgICAgICAgIGdsLmRlcHRoTWFzayhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnQuZGVwdGhGdW5jICE9PSBlbnVtcy5EU19GVU5DX0FMV0FZUykge1xuICAgICAgICAgIGdsLmRlcHRoRnVuYyh0aGlzLl9jdXJyZW50LmRlcHRoRnVuYyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIC8vIERlZmVycmVkIFN0YXRlc1xuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZW5hYmxlQmxlbmRcbiAgICovXG4gIGVuYWJsZUJsZW5kKCkge1xuICAgIHRoaXMuX25leHQuYmxlbmQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZW5hYmxlRGVwdGhUZXN0XG4gICAqL1xuICBlbmFibGVEZXB0aFRlc3QoKSB7XG4gICAgdGhpcy5fbmV4dC5kZXB0aFRlc3QgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZW5hYmxlRGVwdGhXcml0ZVxuICAgKi9cbiAgZW5hYmxlRGVwdGhXcml0ZSgpIHtcbiAgICB0aGlzLl9uZXh0LmRlcHRoV3JpdGUgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZW5hYmxlU3RlbmNpbFRlc3RcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHN0ZW5jaWxUZXN0XG4gICAqL1xuICBzZXRTdGVuY2lsVGVzdChzdGVuY2lsVGVzdCkge1xuICAgIHRoaXMuX25leHQuc3RlbmNpbFRlc3QgPSBzdGVuY2lsVGVzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFN0ZW5jaWxGdW5jXG4gICAqIEBwYXJhbSB7RFNfRlVOQ18qfSBmdW5jXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByZWZcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG1hc2tcbiAgICovXG4gIHNldFN0ZW5jaWxGdW5jKGZ1bmMsIHJlZiwgbWFzaykge1xuICAgIHRoaXMuX25leHQuc3RlbmNpbFNlcCA9IGZhbHNlO1xuICAgIHRoaXMuX25leHQuc3RlbmNpbEZ1bmNGcm9udCA9IHRoaXMuX25leHQuc3RlbmNpbEZ1bmNCYWNrID0gZnVuYztcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxSZWZGcm9udCA9IHRoaXMuX25leHQuc3RlbmNpbFJlZkJhY2sgPSByZWY7XG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsTWFza0Zyb250ID0gdGhpcy5fbmV4dC5zdGVuY2lsTWFza0JhY2sgPSBtYXNrO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0U3RlbmNpbEZ1bmNGcm9udFxuICAgKiBAcGFyYW0ge0RTX0ZVTkNfKn0gZnVuY1xuICAgKiBAcGFyYW0ge051bWJlcn0gcmVmXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtYXNrXG4gICAqL1xuICBzZXRTdGVuY2lsRnVuY0Zyb250KGZ1bmMsIHJlZiwgbWFzaykge1xuICAgIHRoaXMuX25leHQuc3RlbmNpbFNlcCA9IHRydWU7XG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsRnVuY0Zyb250ID0gZnVuYztcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxSZWZGcm9udCA9IHJlZjtcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxNYXNrRnJvbnQgPSBtYXNrO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0U3RlbmNpbEZ1bmNCYWNrXG4gICAqIEBwYXJhbSB7RFNfRlVOQ18qfSBmdW5jXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByZWZcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG1hc2tcbiAgICovXG4gIHNldFN0ZW5jaWxGdW5jQmFjayhmdW5jLCByZWYsIG1hc2spIHtcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxTZXAgPSB0cnVlO1xuICAgIHRoaXMuX25leHQuc3RlbmNpbEZ1bmNCYWNrID0gZnVuYztcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxSZWZCYWNrID0gcmVmO1xuICAgIHRoaXMuX25leHQuc3RlbmNpbE1hc2tCYWNrID0gbWFzaztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFN0ZW5jaWxPcFxuICAgKiBAcGFyYW0ge1NURU5DSUxfT1BfKn0gZmFpbE9wXG4gICAqIEBwYXJhbSB7U1RFTkNJTF9PUF8qfSB6RmFpbE9wXG4gICAqIEBwYXJhbSB7U1RFTkNJTF9PUF8qfSB6UGFzc09wXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3cml0ZU1hc2tcbiAgICovXG4gIHNldFN0ZW5jaWxPcChmYWlsT3AsIHpGYWlsT3AsIHpQYXNzT3AsIHdyaXRlTWFzaykge1xuICAgIHRoaXMuX25leHQuc3RlbmNpbEZhaWxPcEZyb250ID0gdGhpcy5fbmV4dC5zdGVuY2lsRmFpbE9wQmFjayA9IGZhaWxPcDtcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxaRmFpbE9wRnJvbnQgPSB0aGlzLl9uZXh0LnN0ZW5jaWxaRmFpbE9wQmFjayA9IHpGYWlsT3A7XG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsWlBhc3NPcEZyb250ID0gdGhpcy5fbmV4dC5zdGVuY2lsWlBhc3NPcEJhY2sgPSB6UGFzc09wO1xuICAgIHRoaXMuX25leHQuc3RlbmNpbFdyaXRlTWFza0Zyb250ID0gdGhpcy5fbmV4dC5zdGVuY2lsV3JpdGVNYXNrQmFjayA9IHdyaXRlTWFzaztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFN0ZW5jaWxPcEZyb250XG4gICAqIEBwYXJhbSB7U1RFTkNJTF9PUF8qfSBmYWlsT3BcbiAgICogQHBhcmFtIHtTVEVOQ0lMX09QXyp9IHpGYWlsT3BcbiAgICogQHBhcmFtIHtTVEVOQ0lMX09QXyp9IHpQYXNzT3BcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHdyaXRlTWFza1xuICAgKi9cbiAgc2V0U3RlbmNpbE9wRnJvbnQoZmFpbE9wLCB6RmFpbE9wLCB6UGFzc09wLCB3cml0ZU1hc2spIHtcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxTZXAgPSB0cnVlO1xuICAgIHRoaXMuX25leHQuc3RlbmNpbEZhaWxPcEZyb250ID0gZmFpbE9wO1xuICAgIHRoaXMuX25leHQuc3RlbmNpbFpGYWlsT3BGcm9udCA9IHpGYWlsT3A7XG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsWlBhc3NPcEZyb250ID0gelBhc3NPcDtcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxXcml0ZU1hc2tGcm9udCA9IHdyaXRlTWFzaztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFN0ZW5jaWxPcEJhY2tcbiAgICogQHBhcmFtIHtTVEVOQ0lMX09QXyp9IGZhaWxPcFxuICAgKiBAcGFyYW0ge1NURU5DSUxfT1BfKn0gekZhaWxPcFxuICAgKiBAcGFyYW0ge1NURU5DSUxfT1BfKn0gelBhc3NPcFxuICAgKiBAcGFyYW0ge051bWJlcn0gd3JpdGVNYXNrXG4gICAqL1xuICBzZXRTdGVuY2lsT3BCYWNrKGZhaWxPcCwgekZhaWxPcCwgelBhc3NPcCwgd3JpdGVNYXNrKSB7XG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsU2VwID0gdHJ1ZTtcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxGYWlsT3BCYWNrID0gZmFpbE9wO1xuICAgIHRoaXMuX25leHQuc3RlbmNpbFpGYWlsT3BCYWNrID0gekZhaWxPcDtcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxaUGFzc09wQmFjayA9IHpQYXNzT3A7XG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsV3JpdGVNYXNrQmFjayA9IHdyaXRlTWFzaztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldERlcHRoRnVuY1xuICAgKiBAcGFyYW0ge0RTX0ZVTkNfKn0gZGVwdGhGdW5jXG4gICAqL1xuICBzZXREZXB0aEZ1bmMoZGVwdGhGdW5jKSB7XG4gICAgdGhpcy5fbmV4dC5kZXB0aEZ1bmMgPSBkZXB0aEZ1bmM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRCbGVuZENvbG9yMzJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJnYmFcbiAgICovXG4gIHNldEJsZW5kQ29sb3IzMihyZ2JhKSB7XG4gICAgdGhpcy5fbmV4dC5ibGVuZENvbG9yID0gcmdiYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldEJsZW5kQ29sb3JcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGdcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFcbiAgICovXG4gIHNldEJsZW5kQ29sb3IociwgZywgYiwgYSkge1xuICAgIHRoaXMuX25leHQuYmxlbmRDb2xvciA9ICgociAqIDI1NSkgPDwgMjQgfCAoZyAqIDI1NSkgPDwgMTYgfCAoYiAqIDI1NSkgPDwgOCB8IGEgKiAyNTUpID4+PiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0QmxlbmRGdW5jXG4gICAqIEBwYXJhbSB7QkVMTkRfKn0gc3JjXG4gICAqIEBwYXJhbSB7QkVMTkRfKn0gZHN0XG4gICAqL1xuICBzZXRCbGVuZEZ1bmMoc3JjLCBkc3QpIHtcbiAgICB0aGlzLl9uZXh0LmJsZW5kU2VwID0gZmFsc2U7XG4gICAgdGhpcy5fbmV4dC5ibGVuZFNyYyA9IHNyYztcbiAgICB0aGlzLl9uZXh0LmJsZW5kRHN0ID0gZHN0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0QmxlbmRGdW5jU2VwXG4gICAqIEBwYXJhbSB7QkVMTkRfKn0gc3JjXG4gICAqIEBwYXJhbSB7QkVMTkRfKn0gZHN0XG4gICAqIEBwYXJhbSB7QkVMTkRfKn0gc3JjQWxwaGFcbiAgICogQHBhcmFtIHtCRUxORF8qfSBkc3RBbHBoYVxuICAgKi9cbiAgc2V0QmxlbmRGdW5jU2VwKHNyYywgZHN0LCBzcmNBbHBoYSwgZHN0QWxwaGEpIHtcbiAgICB0aGlzLl9uZXh0LmJsZW5kU2VwID0gdHJ1ZTtcbiAgICB0aGlzLl9uZXh0LmJsZW5kU3JjID0gc3JjO1xuICAgIHRoaXMuX25leHQuYmxlbmREc3QgPSBkc3Q7XG4gICAgdGhpcy5fbmV4dC5ibGVuZFNyY0FscGhhID0gc3JjQWxwaGE7XG4gICAgdGhpcy5fbmV4dC5ibGVuZERzdEFscGhhID0gZHN0QWxwaGE7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRCbGVuZEVxXG4gICAqIEBwYXJhbSB7QkVMTkRfRlVOQ18qfSBlcVxuICAgKi9cbiAgc2V0QmxlbmRFcShlcSkge1xuICAgIHRoaXMuX25leHQuYmxlbmRTZXAgPSBmYWxzZTtcbiAgICB0aGlzLl9uZXh0LmJsZW5kRXEgPSBlcTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldEJsZW5kRXFTZXBcbiAgICogQHBhcmFtIHtCRUxORF9GVU5DXyp9IGVxXG4gICAqIEBwYXJhbSB7QkVMTkRfRlVOQ18qfSBhbHBoYUVxXG4gICAqL1xuICBzZXRCbGVuZEVxU2VwKGVxLCBhbHBoYUVxKSB7XG4gICAgdGhpcy5fbmV4dC5ibGVuZFNlcCA9IHRydWU7XG4gICAgdGhpcy5fbmV4dC5ibGVuZEVxID0gZXE7XG4gICAgdGhpcy5fbmV4dC5ibGVuZEFscGhhRXEgPSBhbHBoYUVxO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0Q3VsbE1vZGVcbiAgICogQHBhcmFtIHtDVUxMXyp9IG1vZGVcbiAgICovXG4gIHNldEN1bGxNb2RlKG1vZGUpIHtcbiAgICB0aGlzLl9uZXh0LmN1bGxNb2RlID0gbW9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFZlcnRleEJ1ZmZlclxuICAgKiBAcGFyYW0ge051bWJlcn0gc3RyZWFtXG4gICAqIEBwYXJhbSB7VmVydGV4QnVmZmVyfSBidWZmZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0IC0gc3RhcnQgdmVydGV4XG4gICAqL1xuICBzZXRWZXJ0ZXhCdWZmZXIoc3RyZWFtLCBidWZmZXIsIHN0YXJ0ID0gMCkge1xuICAgIHRoaXMuX25leHQudmVydGV4QnVmZmVyc1tzdHJlYW1dID0gYnVmZmVyO1xuICAgIHRoaXMuX25leHQudmVydGV4QnVmZmVyT2Zmc2V0c1tzdHJlYW1dID0gc3RhcnQ7XG4gICAgaWYgKHRoaXMuX25leHQubWF4U3RyZWFtIDwgc3RyZWFtKSB7XG4gICAgICB0aGlzLl9uZXh0Lm1heFN0cmVhbSA9IHN0cmVhbTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRJbmRleEJ1ZmZlclxuICAgKiBAcGFyYW0ge0luZGV4QnVmZmVyfSBidWZmZXJcbiAgICovXG4gIHNldEluZGV4QnVmZmVyKGJ1ZmZlcikge1xuICAgIHRoaXMuX25leHQuaW5kZXhCdWZmZXIgPSBidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBzZXRQcm9ncmFtXG4gICAqIEBwYXJhbSB7UHJvZ3JhbX0gcHJvZ3JhbVxuICAgKi9cbiAgc2V0UHJvZ3JhbShwcm9ncmFtKSB7XG4gICAgdGhpcy5fbmV4dC5wcm9ncmFtID0gcHJvZ3JhbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFRleHR1cmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtUZXh0dXJlfSB0ZXh0dXJlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzbG90XG4gICAqL1xuICBzZXRUZXh0dXJlKG5hbWUsIHRleHR1cmUsIHNsb3QpIHtcbiAgICBpZiAoc2xvdCA+PSB0aGlzLl9jYXBzLm1heFRleHR1cmVVbml0cykge1xuICAgICAgY29uc29sZS53YXJuKGBDYW4gbm90IHNldCB0ZXh0dXJlICR7bmFtZX0gYXQgc3RhZ2UgJHtzbG90fSwgbWF4IHRleHR1cmUgZXhjZWVkOiAke3RoaXMuX2NhcHMubWF4VGV4dHVyZVVuaXRzfWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX25leHQudGV4dHVyZVVuaXRzW3Nsb3RdID0gdGV4dHVyZTtcbiAgICB0aGlzLnNldFVuaWZvcm0obmFtZSwgc2xvdCk7XG5cbiAgICBpZiAodGhpcy5fbmV4dC5tYXhUZXh0dXJlU2xvdCA8IHNsb3QpIHtcbiAgICAgIHRoaXMuX25leHQubWF4VGV4dHVyZVNsb3QgPSBzbG90O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIHNldFRleHR1cmVBcnJheVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge0FycmF5fSB0ZXh0dXJlc1xuICAgKiBAcGFyYW0ge0ludDMyQXJyYXl9IHNsb3RzXG4gICAqL1xuICBzZXRUZXh0dXJlQXJyYXkobmFtZSwgdGV4dHVyZXMsIHNsb3RzKSB7XG4gICAgbGV0IGxlbiA9IHRleHR1cmVzLmxlbmd0aDtcbiAgICBpZiAobGVuID49IHRoaXMuX2NhcHMubWF4VGV4dHVyZVVuaXRzKSB7XG4gICAgICBjb25zb2xlLndhcm4oYENhbiBub3Qgc2V0ICR7bGVufSB0ZXh0dXJlcyBmb3IgJHtuYW1lfSwgbWF4IHRleHR1cmUgZXhjZWVkOiAke3RoaXMuX2NhcHMubWF4VGV4dHVyZVVuaXRzfWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBsZXQgc2xvdCA9IHNsb3RzW2ldO1xuICAgICAgdGhpcy5fbmV4dC50ZXh0dXJlVW5pdHNbc2xvdF0gPSB0ZXh0dXJlc1tpXTtcblxuICAgICAgaWYgKHRoaXMuX25leHQubWF4VGV4dHVyZVNsb3QgPCBzbG90KSB7XG4gICAgICAgIHRoaXMuX25leHQubWF4VGV4dHVyZVNsb3QgPSBzbG90O1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldFVuaWZvcm0obmFtZSwgc2xvdHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0VW5pZm9ybVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqL1xuICBzZXRVbmlmb3JtKG5hbWUsIHZhbHVlKSB7XG4gICAgbGV0IHVuaWZvcm0gPSB0aGlzLl91bmlmb3Jtc1tuYW1lXTtcblxuICAgIGxldCBzYW1lVHlwZSA9IGZhbHNlO1xuICAgIGxldCBpc0FycmF5ID0gZmFsc2UsIGlzRmxvYXQzMkFycmF5ID0gZmFsc2UsIGlzSW50MzJBcnJheSA9IGZhbHNlO1xuICAgIGRvIHtcbiAgICAgIGlmICghdW5pZm9ybSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaXNGbG9hdDMyQXJyYXkgPSBBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZSBpbnN0YW5jZW9mIEZsb2F0MzJBcnJheTtcbiAgICAgIGlzSW50MzJBcnJheSA9IHZhbHVlIGluc3RhbmNlb2YgSW50MzJBcnJheTtcbiAgICAgIGlzQXJyYXkgPSBpc0Zsb2F0MzJBcnJheSB8fCBpc0ludDMyQXJyYXk7XG4gICAgICBpZiAodW5pZm9ybS5pc0FycmF5ICE9PSBpc0FycmF5KSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAodW5pZm9ybS5pc0FycmF5ICYmIHVuaWZvcm0udmFsdWUubGVuZ3RoICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHNhbWVUeXBlID0gdHJ1ZTtcbiAgICB9IHdoaWxlIChmYWxzZSk7XG5cbiAgICBpZiAoIXNhbWVUeXBlKSB7XG4gICAgICBsZXQgbmV3VmFsdWUgPSB2YWx1ZTtcbiAgICAgIGlmIChpc0Zsb2F0MzJBcnJheSkge1xuICAgICAgICBuZXdWYWx1ZSA9IG5ldyBGbG9hdDMyQXJyYXkodmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNJbnQzMkFycmF5KSB7XG4gICAgICAgIG5ld1ZhbHVlID0gbmV3IEludDMyQXJyYXkodmFsdWUpO1xuICAgICAgfVxuXG4gICAgICB1bmlmb3JtID0ge1xuICAgICAgICBkaXJ0eTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICBpc0FycmF5OiBpc0FycmF5XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgb2xkVmFsdWUgPSB1bmlmb3JtLnZhbHVlO1xuICAgICAgbGV0IGRpcnR5ID0gZmFsc2U7XG4gICAgICBpZiAodW5pZm9ybS5pc0FycmF5KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gb2xkVmFsdWUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaWYgKG9sZFZhbHVlW2ldICE9PSB2YWx1ZVtpXSkge1xuICAgICAgICAgICAgZGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgb2xkVmFsdWVbaV0gPSB2YWx1ZVtpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgZGlydHkgPSB0cnVlO1xuICAgICAgICAgIHVuaWZvcm0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZGlydHkpIHtcbiAgICAgICAgdW5pZm9ybS5kaXJ0eSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3VuaWZvcm1zW25hbWVdID0gdW5pZm9ybTtcbiAgfVxuXG4gIHNldFVuaWZvcm1EaXJlY3RseShuYW1lLCB2YWx1ZSkge1xuICAgIGxldCB1bmlmb3JtID0gdGhpcy5fdW5pZm9ybXNbbmFtZV07XG4gICAgaWYgKCF1bmlmb3JtKSB7XG4gICAgICB0aGlzLl91bmlmb3Jtc1tuYW1lXSA9IHVuaWZvcm0gPSB7fTtcbiAgICB9XG4gICAgdW5pZm9ybS5kaXJ0eSA9IHRydWU7XG4gICAgdW5pZm9ybS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0UHJpbWl0aXZlVHlwZVxuICAgKiBAcGFyYW0ge1BUXyp9IHR5cGVcbiAgICovXG4gIHNldFByaW1pdGl2ZVR5cGUodHlwZSkge1xuICAgIHRoaXMuX25leHQucHJpbWl0aXZlVHlwZSA9IHR5cGU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCByZXNldERyYXdDYWxsc1xuICAgKi9cbiAgcmVzZXREcmF3Q2FsbHMgKCkge1xuICAgIHRoaXMuX3N0YXRzLmRyYXdjYWxscyA9IDA7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBAbWV0aG9kIGdldERyYXdDYWxsc1xuICAgKi9cbiAgZ2V0RHJhd0NhbGxzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdHMuZHJhd2NhbGxzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZHJhd1xuICAgKiBAcGFyYW0ge051bWJlcn0gYmFzZVxuICAgKiBAcGFyYW0ge051bWJlcn0gY291bnRcbiAgICovXG4gIGRyYXcoYmFzZSwgY291bnQpIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuICAgIGxldCBjdXIgPSB0aGlzLl9jdXJyZW50O1xuICAgIGxldCBuZXh0ID0gdGhpcy5fbmV4dDtcblxuICAgIC8vIGNvbW1pdCBibGVuZFxuICAgIF9jb21taXRCbGVuZFN0YXRlcyhnbCwgY3VyLCBuZXh0KTtcblxuICAgIC8vIGNvbW1pdCBkZXB0aFxuICAgIF9jb21taXREZXB0aFN0YXRlcyhnbCwgY3VyLCBuZXh0KTtcblxuICAgIC8vIGNvbW1pdCBzdGVuY2lsXG4gICAgX2NvbW1pdFN0ZW5jaWxTdGF0ZXMoZ2wsIGN1ciwgbmV4dCk7XG5cbiAgICAvLyBjb21taXQgY3VsbFxuICAgIF9jb21taXRDdWxsTW9kZShnbCwgY3VyLCBuZXh0KTtcblxuICAgIC8vIGNvbW1pdCB2ZXJ0ZXgtYnVmZmVyXG4gICAgX2NvbW1pdFZlcnRleEJ1ZmZlcnModGhpcywgZ2wsIGN1ciwgbmV4dCk7XG5cbiAgICAvLyBjb21taXQgaW5kZXgtYnVmZmVyXG4gICAgaWYgKGN1ci5pbmRleEJ1ZmZlciAhPT0gbmV4dC5pbmRleEJ1ZmZlcikge1xuICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbmV4dC5pbmRleEJ1ZmZlciAmJiBuZXh0LmluZGV4QnVmZmVyLl9nbElEICE9PSAtMSA/IG5leHQuaW5kZXhCdWZmZXIuX2dsSUQgOiBudWxsKTtcbiAgICB9XG5cbiAgICAvLyBjb21taXQgcHJvZ3JhbVxuICAgIGxldCBwcm9ncmFtRGlydHkgPSBmYWxzZTtcbiAgICBpZiAoY3VyLnByb2dyYW0gIT09IG5leHQucHJvZ3JhbSkge1xuICAgICAgaWYgKG5leHQucHJvZ3JhbS5fbGlua2VkKSB7XG4gICAgICAgIGdsLnVzZVByb2dyYW0obmV4dC5wcm9ncmFtLl9nbElEKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignRmFpbGVkIHRvIHVzZSBwcm9ncmFtOiBoYXMgbm90IGxpbmtlZCB5ZXQuJyk7XG4gICAgICB9XG4gICAgICBwcm9ncmFtRGlydHkgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIGNvbW1pdCB0ZXh0dXJlL3NhbXBsZXJcbiAgICBfY29tbWl0VGV4dHVyZXMoZ2wsIGN1ciwgbmV4dCk7XG5cbiAgICAvLyBjb21taXQgdW5pZm9ybXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5leHQucHJvZ3JhbS5fdW5pZm9ybXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxldCB1bmlmb3JtSW5mbyA9IG5leHQucHJvZ3JhbS5fdW5pZm9ybXNbaV07XG4gICAgICBsZXQgdW5pZm9ybSA9IHRoaXMuX3VuaWZvcm1zW3VuaWZvcm1JbmZvLm5hbWVdO1xuICAgICAgaWYgKCF1bmlmb3JtKSB7XG4gICAgICAgIC8vIGNvbnNvbGUud2FybihgQ2FuIG5vdCBmaW5kIHVuaWZvcm0gJHt1bmlmb3JtSW5mby5uYW1lfWApO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwcm9ncmFtRGlydHkgJiYgIXVuaWZvcm0uZGlydHkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHVuaWZvcm0uZGlydHkgPSBmYWxzZTtcblxuICAgICAgLy8gVE9ETzogcGxlYXNlIGNvbnNpZGVyIGFycmF5IHVuaWZvcm06IHVuaWZvcm1JbmZvLnNpemUgPiAwXG5cbiAgICAgIGxldCBjb21taXRGdW5jID0gKHVuaWZvcm1JbmZvLnNpemUgPT09IHVuZGVmaW5lZCkgPyBfdHlwZTJ1bmlmb3JtQ29tbWl0W3VuaWZvcm1JbmZvLnR5cGVdIDogX3R5cGUydW5pZm9ybUFycmF5Q29tbWl0W3VuaWZvcm1JbmZvLnR5cGVdO1xuICAgICAgaWYgKCFjb21taXRGdW5jKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgQ2FuIG5vdCBmaW5kIGNvbW1pdCBmdW5jdGlvbiBmb3IgdW5pZm9ybSAke3VuaWZvcm1JbmZvLm5hbWV9YCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb21taXRGdW5jKGdsLCB1bmlmb3JtSW5mby5sb2NhdGlvbiwgdW5pZm9ybS52YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50KSB7XG4gICAgICAvLyBkcmF3UHJpbWl0aXZlc1xuICAgICAgaWYgKG5leHQuaW5kZXhCdWZmZXIpIHtcbiAgICAgICAgZ2wuZHJhd0VsZW1lbnRzKFxuICAgICAgICAgIHRoaXMuX25leHQucHJpbWl0aXZlVHlwZSxcbiAgICAgICAgICBjb3VudCxcbiAgICAgICAgICBuZXh0LmluZGV4QnVmZmVyLl9mb3JtYXQsXG4gICAgICAgICAgYmFzZSAqIG5leHQuaW5kZXhCdWZmZXIuX2J5dGVzUGVySW5kZXhcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdsLmRyYXdBcnJheXMoXG4gICAgICAgICAgdGhpcy5fbmV4dC5wcmltaXRpdmVUeXBlLFxuICAgICAgICAgIGJhc2UsXG4gICAgICAgICAgY291bnRcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRlIHN0YXRzXG4gICAgICB0aGlzLl9zdGF0cy5kcmF3Y2FsbHMrKztcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBhdXRvZ2VuIG1pcG1hcCBmb3IgY29sb3IgYnVmZmVyXG4gICAgLy8gaWYgKHRoaXMuX2ZyYW1lYnVmZmVyICYmIHRoaXMuX2ZyYW1lYnVmZmVyLmNvbG9yc1swXS5taXBtYXApIHtcbiAgICAvLyAgIGdsLmJpbmRUZXh0dXJlKHRoaXMuX2ZyYW1lYnVmZmVyLmNvbG9yc1tpXS5fdGFyZ2V0LCBjb2xvcnNbaV0uX2dsSUQpO1xuICAgIC8vICAgZ2wuZ2VuZXJhdGVNaXBtYXAodGhpcy5fZnJhbWVidWZmZXIuY29sb3JzW2ldLl90YXJnZXQpO1xuICAgIC8vIH1cblxuICAgIC8vIHJlc2V0IHN0YXRlc1xuICAgIGN1ci5zZXQobmV4dCk7XG4gICAgbmV4dC5yZXNldCgpO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvIn0=