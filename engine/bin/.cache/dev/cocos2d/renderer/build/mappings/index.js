
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/build/mappings/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}'use strict';
/**
 * enums
 */

var enums = {
  // buffer usage
  USAGE_STATIC: 35044,
  // gl.STATIC_DRAW
  USAGE_DYNAMIC: 35048,
  // gl.DYNAMIC_DRAW
  USAGE_STREAM: 35040,
  // gl.STREAM_DRAW
  // index buffer format
  INDEX_FMT_UINT8: 5121,
  // gl.UNSIGNED_BYTE
  INDEX_FMT_UINT16: 5123,
  // gl.UNSIGNED_SHORT
  INDEX_FMT_UINT32: 5125,
  // gl.UNSIGNED_INT (OES_element_index_uint)
  // vertex attribute semantic
  ATTR_POSITION: 'a_position',
  ATTR_NORMAL: 'a_normal',
  ATTR_TANGENT: 'a_tangent',
  ATTR_BITANGENT: 'a_bitangent',
  ATTR_WEIGHTS: 'a_weights',
  ATTR_JOINTS: 'a_joints',
  ATTR_COLOR: 'a_color',
  ATTR_COLOR0: 'a_color0',
  ATTR_COLOR1: 'a_color1',
  ATTR_UV: 'a_uv',
  ATTR_UV0: 'a_uv0',
  ATTR_UV1: 'a_uv1',
  ATTR_UV2: 'a_uv2',
  ATTR_UV3: 'a_uv3',
  ATTR_UV4: 'a_uv4',
  ATTR_UV5: 'a_uv5',
  ATTR_UV6: 'a_uv6',
  ATTR_UV7: 'a_uv7',
  ATTR_TEX_COORD: 'a_texCoord',
  ATTR_TEX_COORD1: 'a_texCoord1',
  ATTR_TEX_COORD2: 'a_texCoord2',
  ATTR_TEX_COORD3: 'a_texCoord3',
  ATTR_TEX_COORD4: 'a_texCoord4',
  ATTR_TEX_COORD5: 'a_texCoord5',
  ATTR_TEX_COORD6: 'a_texCoord6',
  ATTR_TEX_COORD7: 'a_texCoord7',
  ATTR_TEX_COORD8: 'a_texCoord8',
  // vertex attribute type
  ATTR_TYPE_INT8: 5120,
  // gl.BYTE
  ATTR_TYPE_UINT8: 5121,
  // gl.UNSIGNED_BYTE
  ATTR_TYPE_INT16: 5122,
  // gl.SHORT
  ATTR_TYPE_UINT16: 5123,
  // gl.UNSIGNED_SHORT
  ATTR_TYPE_INT32: 5124,
  // gl.INT
  ATTR_TYPE_UINT32: 5125,
  // gl.UNSIGNED_INT
  ATTR_TYPE_FLOAT32: 5126,
  // gl.FLOAT
  // texture filter
  FILTER_NEAREST: 0,
  FILTER_LINEAR: 1,
  // texture wrap mode
  WRAP_REPEAT: 10497,
  // gl.REPEAT
  WRAP_CLAMP: 33071,
  // gl.CLAMP_TO_EDGE
  WRAP_MIRROR: 33648,
  // gl.MIRRORED_REPEAT
  // texture format
  // compress formats
  TEXTURE_FMT_RGB_DXT1: 0,
  TEXTURE_FMT_RGBA_DXT1: 1,
  TEXTURE_FMT_RGBA_DXT3: 2,
  TEXTURE_FMT_RGBA_DXT5: 3,
  TEXTURE_FMT_RGB_ETC1: 4,
  TEXTURE_FMT_RGB_PVRTC_2BPPV1: 5,
  TEXTURE_FMT_RGBA_PVRTC_2BPPV1: 6,
  TEXTURE_FMT_RGB_PVRTC_4BPPV1: 7,
  TEXTURE_FMT_RGBA_PVRTC_4BPPV1: 8,
  // normal formats
  TEXTURE_FMT_A8: 9,
  TEXTURE_FMT_L8: 10,
  TEXTURE_FMT_L8_A8: 11,
  TEXTURE_FMT_R5_G6_B5: 12,
  TEXTURE_FMT_R5_G5_B5_A1: 13,
  TEXTURE_FMT_R4_G4_B4_A4: 14,
  TEXTURE_FMT_RGB8: 15,
  TEXTURE_FMT_RGBA8: 16,
  TEXTURE_FMT_RGB16F: 17,
  TEXTURE_FMT_RGBA16F: 18,
  TEXTURE_FMT_RGB32F: 19,
  TEXTURE_FMT_RGBA32F: 20,
  TEXTURE_FMT_R32F: 21,
  TEXTURE_FMT_111110F: 22,
  TEXTURE_FMT_SRGB: 23,
  TEXTURE_FMT_SRGBA: 24,
  // depth formats
  TEXTURE_FMT_D16: 25,
  TEXTURE_FMT_D32: 26,
  TEXTURE_FMT_D24S8: 27,
  // etc2 format
  TEXTURE_FMT_RGB_ETC2: 28,
  TEXTURE_FMT_RGBA_ETC2: 29,
  // depth and stencil function
  DS_FUNC_NEVER: 512,
  // gl.NEVER
  DS_FUNC_LESS: 513,
  // gl.LESS
  DS_FUNC_EQUAL: 514,
  // gl.EQUAL
  DS_FUNC_LEQUAL: 515,
  // gl.LEQUAL
  DS_FUNC_GREATER: 516,
  // gl.GREATER
  DS_FUNC_NOTEQUAL: 517,
  // gl.NOTEQUAL
  DS_FUNC_GEQUAL: 518,
  // gl.GEQUAL
  DS_FUNC_ALWAYS: 519,
  // gl.ALWAYS
  // render-buffer format
  RB_FMT_RGBA4: 32854,
  // gl.RGBA4
  RB_FMT_RGB5_A1: 32855,
  // gl.RGB5_A1
  RB_FMT_RGB565: 36194,
  // gl.RGB565
  RB_FMT_D16: 33189,
  // gl.DEPTH_COMPONENT16
  RB_FMT_S8: 36168,
  // gl.STENCIL_INDEX8
  RB_FMT_D24S8: 34041,
  // gl.DEPTH_STENCIL
  // blend-equation
  BLEND_FUNC_ADD: 32774,
  // gl.FUNC_ADD
  BLEND_FUNC_SUBTRACT: 32778,
  // gl.FUNC_SUBTRACT
  BLEND_FUNC_REVERSE_SUBTRACT: 32779,
  // gl.FUNC_REVERSE_SUBTRACT
  // blend
  BLEND_ZERO: 0,
  // gl.ZERO
  BLEND_ONE: 1,
  // gl.ONE
  BLEND_SRC_COLOR: 768,
  // gl.SRC_COLOR
  BLEND_ONE_MINUS_SRC_COLOR: 769,
  // gl.ONE_MINUS_SRC_COLOR
  BLEND_DST_COLOR: 774,
  // gl.DST_COLOR
  BLEND_ONE_MINUS_DST_COLOR: 775,
  // gl.ONE_MINUS_DST_COLOR
  BLEND_SRC_ALPHA: 770,
  // gl.SRC_ALPHA
  BLEND_ONE_MINUS_SRC_ALPHA: 771,
  // gl.ONE_MINUS_SRC_ALPHA
  BLEND_DST_ALPHA: 772,
  // gl.DST_ALPHA
  BLEND_ONE_MINUS_DST_ALPHA: 773,
  // gl.ONE_MINUS_DST_ALPHA
  BLEND_CONSTANT_COLOR: 32769,
  // gl.CONSTANT_COLOR
  BLEND_ONE_MINUS_CONSTANT_COLOR: 32770,
  // gl.ONE_MINUS_CONSTANT_COLOR
  BLEND_CONSTANT_ALPHA: 32771,
  // gl.CONSTANT_ALPHA
  BLEND_ONE_MINUS_CONSTANT_ALPHA: 32772,
  // gl.ONE_MINUS_CONSTANT_ALPHA
  BLEND_SRC_ALPHA_SATURATE: 776,
  // gl.SRC_ALPHA_SATURATE
  // stencil operation
  STENCIL_DISABLE: 0,
  // disable stencil
  STENCIL_ENABLE: 1,
  // enable stencil
  STENCIL_INHERIT: 2,
  // inherit stencil states
  STENCIL_OP_KEEP: 7680,
  // gl.KEEP
  STENCIL_OP_ZERO: 0,
  // gl.ZERO
  STENCIL_OP_REPLACE: 7681,
  // gl.REPLACE
  STENCIL_OP_INCR: 7682,
  // gl.INCR
  STENCIL_OP_INCR_WRAP: 34055,
  // gl.INCR_WRAP
  STENCIL_OP_DECR: 7683,
  // gl.DECR
  STENCIL_OP_DECR_WRAP: 34056,
  // gl.DECR_WRAP
  STENCIL_OP_INVERT: 5386,
  // gl.INVERT
  // cull
  CULL_NONE: 0,
  CULL_FRONT: 1028,
  CULL_BACK: 1029,
  CULL_FRONT_AND_BACK: 1032,
  // primitive type
  PT_POINTS: 0,
  // gl.POINTS
  PT_LINES: 1,
  // gl.LINES
  PT_LINE_LOOP: 2,
  // gl.LINE_LOOP
  PT_LINE_STRIP: 3,
  // gl.LINE_STRIP
  PT_TRIANGLES: 4,
  // gl.TRIANGLES
  PT_TRIANGLE_STRIP: 5,
  // gl.TRIANGLE_STRIP
  PT_TRIANGLE_FAN: 6 // gl.TRIANGLE_FAN

};
var RenderQueue = {
  OPAQUE: 0,
  TRANSPARENT: 1,
  OVERLAY: 2
};
/**
 * JS Implementation of MurmurHash2
 * 
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 * 
 * @param {string} str ASCII only
 * @param {number} seed Positive integer only
 * @return {number} 32-bit positive integer hash
 */

function murmurhash2_32_gc(str, seed) {
  var l = str.length,
      h = seed ^ l,
      i = 0,
      k;

  while (l >= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    k ^= k >>> 24;
    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;
    l -= 4;
    ++i;
  }

  switch (l) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  }

  h ^= h >>> 13;
  h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  h ^= h >>> 15;
  return h >>> 0;
} // Extensions


var WebGLEXT;

(function (WebGLEXT) {
  WebGLEXT[WebGLEXT["COMPRESSED_RGB_S3TC_DXT1_EXT"] = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT";
  WebGLEXT[WebGLEXT["COMPRESSED_RGBA_S3TC_DXT1_EXT"] = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT";
  WebGLEXT[WebGLEXT["COMPRESSED_RGBA_S3TC_DXT3_EXT"] = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT";
  WebGLEXT[WebGLEXT["COMPRESSED_RGBA_S3TC_DXT5_EXT"] = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT";
  WebGLEXT[WebGLEXT["COMPRESSED_SRGB_S3TC_DXT1_EXT"] = 35916] = "COMPRESSED_SRGB_S3TC_DXT1_EXT";
  WebGLEXT[WebGLEXT["COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT"] = 35917] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT";
  WebGLEXT[WebGLEXT["COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT"] = 35918] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT";
  WebGLEXT[WebGLEXT["COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT"] = 35919] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT";
  WebGLEXT[WebGLEXT["COMPRESSED_RGB_PVRTC_4BPPV1_IMG"] = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG";
  WebGLEXT[WebGLEXT["COMPRESSED_RGB_PVRTC_2BPPV1_IMG"] = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG";
  WebGLEXT[WebGLEXT["COMPRESSED_RGBA_PVRTC_4BPPV1_IMG"] = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG";
  WebGLEXT[WebGLEXT["COMPRESSED_RGBA_PVRTC_2BPPV1_IMG"] = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG";
  WebGLEXT[WebGLEXT["COMPRESSED_RGB_ETC1_WEBGL"] = 36196] = "COMPRESSED_RGB_ETC1_WEBGL";
})(WebGLEXT || (WebGLEXT = {}));

var GFXObjectType;

(function (GFXObjectType) {
  GFXObjectType[GFXObjectType["UNKNOWN"] = 0] = "UNKNOWN";
  GFXObjectType[GFXObjectType["BUFFER"] = 1] = "BUFFER";
  GFXObjectType[GFXObjectType["TEXTURE"] = 2] = "TEXTURE";
  GFXObjectType[GFXObjectType["TEXTURE_VIEW"] = 3] = "TEXTURE_VIEW";
  GFXObjectType[GFXObjectType["RENDER_PASS"] = 4] = "RENDER_PASS";
  GFXObjectType[GFXObjectType["FRAMEBUFFER"] = 5] = "FRAMEBUFFER";
  GFXObjectType[GFXObjectType["SAMPLER"] = 6] = "SAMPLER";
  GFXObjectType[GFXObjectType["SHADER"] = 7] = "SHADER";
  GFXObjectType[GFXObjectType["PIPELINE_LAYOUT"] = 8] = "PIPELINE_LAYOUT";
  GFXObjectType[GFXObjectType["PIPELINE_STATE"] = 9] = "PIPELINE_STATE";
  GFXObjectType[GFXObjectType["BINDING_LAYOUT"] = 10] = "BINDING_LAYOUT";
  GFXObjectType[GFXObjectType["INPUT_ASSEMBLER"] = 11] = "INPUT_ASSEMBLER";
  GFXObjectType[GFXObjectType["COMMAND_ALLOCATOR"] = 12] = "COMMAND_ALLOCATOR";
  GFXObjectType[GFXObjectType["COMMAND_BUFFER"] = 13] = "COMMAND_BUFFER";
  GFXObjectType[GFXObjectType["QUEUE"] = 14] = "QUEUE";
  GFXObjectType[GFXObjectType["WINDOW"] = 15] = "WINDOW";
})(GFXObjectType || (GFXObjectType = {}));

var GFXStatus;

(function (GFXStatus) {
  GFXStatus[GFXStatus["UNREADY"] = 0] = "UNREADY";
  GFXStatus[GFXStatus["FAILED"] = 1] = "FAILED";
  GFXStatus[GFXStatus["SUCCESS"] = 2] = "SUCCESS";
})(GFXStatus || (GFXStatus = {}));

var GFXObject =
/** @class */
function () {
  function GFXObject(gfxType) {
    this._gfxType = GFXObjectType.UNKNOWN;
    this._status = GFXStatus.UNREADY;
    this._gfxType = gfxType;
  }

  Object.defineProperty(GFXObject.prototype, "gfxType", {
    get: function get() {
      return this._gfxType;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(GFXObject.prototype, "status", {
    get: function get() {
      return this._status;
    },
    enumerable: false,
    configurable: true
  });
  return GFXObject;
}();

var GFXAttributeName;

(function (GFXAttributeName) {
  GFXAttributeName["ATTR_POSITION"] = "a_position";
  GFXAttributeName["ATTR_NORMAL"] = "a_normal";
  GFXAttributeName["ATTR_TANGENT"] = "a_tangent";
  GFXAttributeName["ATTR_BITANGENT"] = "a_bitangent";
  GFXAttributeName["ATTR_WEIGHTS"] = "a_weights";
  GFXAttributeName["ATTR_JOINTS"] = "a_joints";
  GFXAttributeName["ATTR_COLOR"] = "a_color";
  GFXAttributeName["ATTR_COLOR1"] = "a_color1";
  GFXAttributeName["ATTR_COLOR2"] = "a_color2";
  GFXAttributeName["ATTR_TEX_COORD"] = "a_texCoord";
  GFXAttributeName["ATTR_TEX_COORD1"] = "a_texCoord1";
  GFXAttributeName["ATTR_TEX_COORD2"] = "a_texCoord2";
  GFXAttributeName["ATTR_TEX_COORD3"] = "a_texCoord3";
  GFXAttributeName["ATTR_TEX_COORD4"] = "a_texCoord4";
  GFXAttributeName["ATTR_TEX_COORD5"] = "a_texCoord5";
  GFXAttributeName["ATTR_TEX_COORD6"] = "a_texCoord6";
  GFXAttributeName["ATTR_TEX_COORD7"] = "a_texCoord7";
  GFXAttributeName["ATTR_TEX_COORD8"] = "a_texCoord8";
})(GFXAttributeName || (GFXAttributeName = {}));

var GFXType;

(function (GFXType) {
  GFXType[GFXType["UNKNOWN"] = 0] = "UNKNOWN";
  GFXType[GFXType["BOOL"] = 1] = "BOOL";
  GFXType[GFXType["BOOL2"] = 2] = "BOOL2";
  GFXType[GFXType["BOOL3"] = 3] = "BOOL3";
  GFXType[GFXType["BOOL4"] = 4] = "BOOL4";
  GFXType[GFXType["INT"] = 5] = "INT";
  GFXType[GFXType["INT2"] = 6] = "INT2";
  GFXType[GFXType["INT3"] = 7] = "INT3";
  GFXType[GFXType["INT4"] = 8] = "INT4";
  GFXType[GFXType["UINT"] = 9] = "UINT";
  GFXType[GFXType["UINT2"] = 10] = "UINT2";
  GFXType[GFXType["UINT3"] = 11] = "UINT3";
  GFXType[GFXType["UINT4"] = 12] = "UINT4";
  GFXType[GFXType["FLOAT"] = 13] = "FLOAT";
  GFXType[GFXType["FLOAT2"] = 14] = "FLOAT2";
  GFXType[GFXType["FLOAT3"] = 15] = "FLOAT3";
  GFXType[GFXType["FLOAT4"] = 16] = "FLOAT4";
  GFXType[GFXType["COLOR4"] = 17] = "COLOR4";
  GFXType[GFXType["MAT2"] = 18] = "MAT2";
  GFXType[GFXType["MAT2X3"] = 19] = "MAT2X3";
  GFXType[GFXType["MAT2X4"] = 20] = "MAT2X4";
  GFXType[GFXType["MAT3X2"] = 21] = "MAT3X2";
  GFXType[GFXType["MAT3"] = 22] = "MAT3";
  GFXType[GFXType["MAT3X4"] = 23] = "MAT3X4";
  GFXType[GFXType["MAT4X2"] = 24] = "MAT4X2";
  GFXType[GFXType["MAT4X3"] = 25] = "MAT4X3";
  GFXType[GFXType["MAT4"] = 26] = "MAT4";
  GFXType[GFXType["SAMPLER1D"] = 27] = "SAMPLER1D";
  GFXType[GFXType["SAMPLER1D_ARRAY"] = 28] = "SAMPLER1D_ARRAY";
  GFXType[GFXType["SAMPLER2D"] = 29] = "SAMPLER2D";
  GFXType[GFXType["SAMPLER2D_ARRAY"] = 30] = "SAMPLER2D_ARRAY";
  GFXType[GFXType["SAMPLER3D"] = 31] = "SAMPLER3D";
  GFXType[GFXType["SAMPLER_CUBE"] = 32] = "SAMPLER_CUBE";
  GFXType[GFXType["COUNT"] = 33] = "COUNT";
})(GFXType || (GFXType = {}));

var GFXFormat;

(function (GFXFormat) {
  GFXFormat[GFXFormat["UNKNOWN"] = 0] = "UNKNOWN";
  GFXFormat[GFXFormat["A8"] = 1] = "A8";
  GFXFormat[GFXFormat["L8"] = 2] = "L8";
  GFXFormat[GFXFormat["LA8"] = 3] = "LA8";
  GFXFormat[GFXFormat["R8"] = 4] = "R8";
  GFXFormat[GFXFormat["R8SN"] = 5] = "R8SN";
  GFXFormat[GFXFormat["R8UI"] = 6] = "R8UI";
  GFXFormat[GFXFormat["R8I"] = 7] = "R8I";
  GFXFormat[GFXFormat["R16F"] = 8] = "R16F";
  GFXFormat[GFXFormat["R16UI"] = 9] = "R16UI";
  GFXFormat[GFXFormat["R16I"] = 10] = "R16I";
  GFXFormat[GFXFormat["R32F"] = 11] = "R32F";
  GFXFormat[GFXFormat["R32UI"] = 12] = "R32UI";
  GFXFormat[GFXFormat["R32I"] = 13] = "R32I";
  GFXFormat[GFXFormat["RG8"] = 14] = "RG8";
  GFXFormat[GFXFormat["RG8SN"] = 15] = "RG8SN";
  GFXFormat[GFXFormat["RG8UI"] = 16] = "RG8UI";
  GFXFormat[GFXFormat["RG8I"] = 17] = "RG8I";
  GFXFormat[GFXFormat["RG16F"] = 18] = "RG16F";
  GFXFormat[GFXFormat["RG16UI"] = 19] = "RG16UI";
  GFXFormat[GFXFormat["RG16I"] = 20] = "RG16I";
  GFXFormat[GFXFormat["RG32F"] = 21] = "RG32F";
  GFXFormat[GFXFormat["RG32UI"] = 22] = "RG32UI";
  GFXFormat[GFXFormat["RG32I"] = 23] = "RG32I";
  GFXFormat[GFXFormat["RGB8"] = 24] = "RGB8";
  GFXFormat[GFXFormat["SRGB8"] = 25] = "SRGB8";
  GFXFormat[GFXFormat["RGB8SN"] = 26] = "RGB8SN";
  GFXFormat[GFXFormat["RGB8UI"] = 27] = "RGB8UI";
  GFXFormat[GFXFormat["RGB8I"] = 28] = "RGB8I";
  GFXFormat[GFXFormat["RGB16F"] = 29] = "RGB16F";
  GFXFormat[GFXFormat["RGB16UI"] = 30] = "RGB16UI";
  GFXFormat[GFXFormat["RGB16I"] = 31] = "RGB16I";
  GFXFormat[GFXFormat["RGB32F"] = 32] = "RGB32F";
  GFXFormat[GFXFormat["RGB32UI"] = 33] = "RGB32UI";
  GFXFormat[GFXFormat["RGB32I"] = 34] = "RGB32I";
  GFXFormat[GFXFormat["RGBA8"] = 35] = "RGBA8";
  GFXFormat[GFXFormat["SRGB8_A8"] = 36] = "SRGB8_A8";
  GFXFormat[GFXFormat["RGBA8SN"] = 37] = "RGBA8SN";
  GFXFormat[GFXFormat["RGBA8UI"] = 38] = "RGBA8UI";
  GFXFormat[GFXFormat["RGBA8I"] = 39] = "RGBA8I";
  GFXFormat[GFXFormat["RGBA16F"] = 40] = "RGBA16F";
  GFXFormat[GFXFormat["RGBA16UI"] = 41] = "RGBA16UI";
  GFXFormat[GFXFormat["RGBA16I"] = 42] = "RGBA16I";
  GFXFormat[GFXFormat["RGBA32F"] = 43] = "RGBA32F";
  GFXFormat[GFXFormat["RGBA32UI"] = 44] = "RGBA32UI";
  GFXFormat[GFXFormat["RGBA32I"] = 45] = "RGBA32I"; // Special Format

  GFXFormat[GFXFormat["R5G6B5"] = 46] = "R5G6B5";
  GFXFormat[GFXFormat["R11G11B10F"] = 47] = "R11G11B10F";
  GFXFormat[GFXFormat["RGB5A1"] = 48] = "RGB5A1";
  GFXFormat[GFXFormat["RGBA4"] = 49] = "RGBA4";
  GFXFormat[GFXFormat["RGB10A2"] = 50] = "RGB10A2";
  GFXFormat[GFXFormat["RGB10A2UI"] = 51] = "RGB10A2UI";
  GFXFormat[GFXFormat["RGB9E5"] = 52] = "RGB9E5"; // Depth-Stencil Format

  GFXFormat[GFXFormat["D16"] = 53] = "D16";
  GFXFormat[GFXFormat["D16S8"] = 54] = "D16S8";
  GFXFormat[GFXFormat["D24"] = 55] = "D24";
  GFXFormat[GFXFormat["D24S8"] = 56] = "D24S8";
  GFXFormat[GFXFormat["D32F"] = 57] = "D32F";
  GFXFormat[GFXFormat["D32F_S8"] = 58] = "D32F_S8"; // Compressed Format
  // Block Compression Format, DDS (DirectDraw Surface)
  // DXT1: 3 channels (5:6:5), 1/8 origianl size, with 0 or 1 bit of alpha

  GFXFormat[GFXFormat["BC1"] = 59] = "BC1";
  GFXFormat[GFXFormat["BC1_ALPHA"] = 60] = "BC1_ALPHA";
  GFXFormat[GFXFormat["BC1_SRGB"] = 61] = "BC1_SRGB";
  GFXFormat[GFXFormat["BC1_SRGB_ALPHA"] = 62] = "BC1_SRGB_ALPHA"; // DXT3: 4 channels (5:6:5), 1/4 origianl size, with 4 bits of alpha

  GFXFormat[GFXFormat["BC2"] = 63] = "BC2";
  GFXFormat[GFXFormat["BC2_SRGB"] = 64] = "BC2_SRGB"; // DXT5: 4 channels (5:6:5), 1/4 origianl size, with 8 bits of alpha

  GFXFormat[GFXFormat["BC3"] = 65] = "BC3";
  GFXFormat[GFXFormat["BC3_SRGB"] = 66] = "BC3_SRGB"; // 1 channel (8), 1/4 origianl size

  GFXFormat[GFXFormat["BC4"] = 67] = "BC4";
  GFXFormat[GFXFormat["BC4_SNORM"] = 68] = "BC4_SNORM"; // 2 channels (8:8), 1/2 origianl size

  GFXFormat[GFXFormat["BC5"] = 69] = "BC5";
  GFXFormat[GFXFormat["BC5_SNORM"] = 70] = "BC5_SNORM"; // 3 channels (16:16:16), half-floating point, 1/6 origianl size
  // UF16: unsigned float, 5 exponent bits + 11 mantissa bits
  // SF16: signed float, 1 signed bit + 5 exponent bits + 10 mantissa bits

  GFXFormat[GFXFormat["BC6H_UF16"] = 71] = "BC6H_UF16";
  GFXFormat[GFXFormat["BC6H_SF16"] = 72] = "BC6H_SF16"; // 4 channels (4~7 bits per channel) with 0 to 8 bits of alpha, 1/3 original size

  GFXFormat[GFXFormat["BC7"] = 73] = "BC7";
  GFXFormat[GFXFormat["BC7_SRGB"] = 74] = "BC7_SRGB"; // Ericsson Texture Compression Format

  GFXFormat[GFXFormat["ETC_RGB8"] = 75] = "ETC_RGB8";
  GFXFormat[GFXFormat["ETC2_RGB8"] = 76] = "ETC2_RGB8";
  GFXFormat[GFXFormat["ETC2_SRGB8"] = 77] = "ETC2_SRGB8";
  GFXFormat[GFXFormat["ETC2_RGB8_A1"] = 78] = "ETC2_RGB8_A1";
  GFXFormat[GFXFormat["ETC2_SRGB8_A1"] = 79] = "ETC2_SRGB8_A1";
  GFXFormat[GFXFormat["ETC2_RGBA8"] = 80] = "ETC2_RGBA8";
  GFXFormat[GFXFormat["ETC2_SRGB8_A8"] = 81] = "ETC2_SRGB8_A8";
  GFXFormat[GFXFormat["EAC_R11"] = 82] = "EAC_R11";
  GFXFormat[GFXFormat["EAC_R11SN"] = 83] = "EAC_R11SN";
  GFXFormat[GFXFormat["EAC_RG11"] = 84] = "EAC_RG11";
  GFXFormat[GFXFormat["EAC_RG11SN"] = 85] = "EAC_RG11SN"; // PVRTC (PowerVR)

  GFXFormat[GFXFormat["PVRTC_RGB2"] = 86] = "PVRTC_RGB2";
  GFXFormat[GFXFormat["PVRTC_RGBA2"] = 87] = "PVRTC_RGBA2";
  GFXFormat[GFXFormat["PVRTC_RGB4"] = 88] = "PVRTC_RGB4";
  GFXFormat[GFXFormat["PVRTC_RGBA4"] = 89] = "PVRTC_RGBA4";
  GFXFormat[GFXFormat["PVRTC2_2BPP"] = 90] = "PVRTC2_2BPP";
  GFXFormat[GFXFormat["PVRTC2_4BPP"] = 91] = "PVRTC2_4BPP";
})(GFXFormat || (GFXFormat = {}));

var GFXBufferUsageBit;

(function (GFXBufferUsageBit) {
  GFXBufferUsageBit[GFXBufferUsageBit["NONE"] = 0] = "NONE";
  GFXBufferUsageBit[GFXBufferUsageBit["TRANSFER_SRC"] = 1] = "TRANSFER_SRC";
  GFXBufferUsageBit[GFXBufferUsageBit["TRANSFER_DST"] = 2] = "TRANSFER_DST";
  GFXBufferUsageBit[GFXBufferUsageBit["INDEX"] = 4] = "INDEX";
  GFXBufferUsageBit[GFXBufferUsageBit["VERTEX"] = 8] = "VERTEX";
  GFXBufferUsageBit[GFXBufferUsageBit["UNIFORM"] = 16] = "UNIFORM";
  GFXBufferUsageBit[GFXBufferUsageBit["STORAGE"] = 32] = "STORAGE";
  GFXBufferUsageBit[GFXBufferUsageBit["INDIRECT"] = 64] = "INDIRECT";
})(GFXBufferUsageBit || (GFXBufferUsageBit = {}));

var GFXMemoryUsageBit;

(function (GFXMemoryUsageBit) {
  GFXMemoryUsageBit[GFXMemoryUsageBit["NONE"] = 0] = "NONE";
  GFXMemoryUsageBit[GFXMemoryUsageBit["DEVICE"] = 1] = "DEVICE";
  GFXMemoryUsageBit[GFXMemoryUsageBit["HOST"] = 2] = "HOST";
})(GFXMemoryUsageBit || (GFXMemoryUsageBit = {}));

var GFXBufferAccessBit;

(function (GFXBufferAccessBit) {
  GFXBufferAccessBit[GFXBufferAccessBit["NONE"] = 0] = "NONE";
  GFXBufferAccessBit[GFXBufferAccessBit["READ"] = 1] = "READ";
  GFXBufferAccessBit[GFXBufferAccessBit["WRITE"] = 2] = "WRITE";
})(GFXBufferAccessBit || (GFXBufferAccessBit = {}));

var GFXPrimitiveMode;

(function (GFXPrimitiveMode) {
  GFXPrimitiveMode[GFXPrimitiveMode["POINT_LIST"] = 0] = "POINT_LIST";
  GFXPrimitiveMode[GFXPrimitiveMode["LINE_LIST"] = 1] = "LINE_LIST";
  GFXPrimitiveMode[GFXPrimitiveMode["LINE_STRIP"] = 2] = "LINE_STRIP";
  GFXPrimitiveMode[GFXPrimitiveMode["LINE_LOOP"] = 3] = "LINE_LOOP";
  GFXPrimitiveMode[GFXPrimitiveMode["LINE_LIST_ADJACENCY"] = 4] = "LINE_LIST_ADJACENCY";
  GFXPrimitiveMode[GFXPrimitiveMode["LINE_STRIP_ADJACENCY"] = 5] = "LINE_STRIP_ADJACENCY";
  GFXPrimitiveMode[GFXPrimitiveMode["ISO_LINE_LIST"] = 6] = "ISO_LINE_LIST"; // raycast detectable:

  GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_LIST"] = 7] = "TRIANGLE_LIST";
  GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_STRIP"] = 8] = "TRIANGLE_STRIP";
  GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_FAN"] = 9] = "TRIANGLE_FAN";
  GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_LIST_ADJACENCY"] = 10] = "TRIANGLE_LIST_ADJACENCY";
  GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_STRIP_ADJACENCY"] = 11] = "TRIANGLE_STRIP_ADJACENCY";
  GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_PATCH_ADJACENCY"] = 12] = "TRIANGLE_PATCH_ADJACENCY";
  GFXPrimitiveMode[GFXPrimitiveMode["QUAD_PATCH_LIST"] = 13] = "QUAD_PATCH_LIST";
})(GFXPrimitiveMode || (GFXPrimitiveMode = {}));

var GFXPolygonMode;

(function (GFXPolygonMode) {
  GFXPolygonMode[GFXPolygonMode["FILL"] = 0] = "FILL";
  GFXPolygonMode[GFXPolygonMode["POINT"] = 1] = "POINT";
  GFXPolygonMode[GFXPolygonMode["LINE"] = 2] = "LINE";
})(GFXPolygonMode || (GFXPolygonMode = {}));

var GFXShadeModel;

(function (GFXShadeModel) {
  GFXShadeModel[GFXShadeModel["GOURAND"] = 0] = "GOURAND";
  GFXShadeModel[GFXShadeModel["FLAT"] = 1] = "FLAT";
})(GFXShadeModel || (GFXShadeModel = {}));

var GFXCullMode;

(function (GFXCullMode) {
  GFXCullMode[GFXCullMode["NONE"] = 0] = "NONE";
  GFXCullMode[GFXCullMode["FRONT"] = 1] = "FRONT";
  GFXCullMode[GFXCullMode["BACK"] = 2] = "BACK";
})(GFXCullMode || (GFXCullMode = {}));

var GFXComparisonFunc;

(function (GFXComparisonFunc) {
  GFXComparisonFunc[GFXComparisonFunc["NEVER"] = 0] = "NEVER";
  GFXComparisonFunc[GFXComparisonFunc["LESS"] = 1] = "LESS";
  GFXComparisonFunc[GFXComparisonFunc["EQUAL"] = 2] = "EQUAL";
  GFXComparisonFunc[GFXComparisonFunc["LESS_EQUAL"] = 3] = "LESS_EQUAL";
  GFXComparisonFunc[GFXComparisonFunc["GREATER"] = 4] = "GREATER";
  GFXComparisonFunc[GFXComparisonFunc["NOT_EQUAL"] = 5] = "NOT_EQUAL";
  GFXComparisonFunc[GFXComparisonFunc["GREATER_EQUAL"] = 6] = "GREATER_EQUAL";
  GFXComparisonFunc[GFXComparisonFunc["ALWAYS"] = 7] = "ALWAYS";
})(GFXComparisonFunc || (GFXComparisonFunc = {}));

var GFXStencilOp;

(function (GFXStencilOp) {
  GFXStencilOp[GFXStencilOp["ZERO"] = 0] = "ZERO";
  GFXStencilOp[GFXStencilOp["KEEP"] = 1] = "KEEP";
  GFXStencilOp[GFXStencilOp["REPLACE"] = 2] = "REPLACE";
  GFXStencilOp[GFXStencilOp["INCR"] = 3] = "INCR";
  GFXStencilOp[GFXStencilOp["DECR"] = 4] = "DECR";
  GFXStencilOp[GFXStencilOp["INVERT"] = 5] = "INVERT";
  GFXStencilOp[GFXStencilOp["INCR_WRAP"] = 6] = "INCR_WRAP";
  GFXStencilOp[GFXStencilOp["DECR_WRAP"] = 7] = "DECR_WRAP";
})(GFXStencilOp || (GFXStencilOp = {}));

var GFXBlendOp;

(function (GFXBlendOp) {
  GFXBlendOp[GFXBlendOp["ADD"] = 0] = "ADD";
  GFXBlendOp[GFXBlendOp["SUB"] = 1] = "SUB";
  GFXBlendOp[GFXBlendOp["REV_SUB"] = 2] = "REV_SUB";
  GFXBlendOp[GFXBlendOp["MIN"] = 3] = "MIN";
  GFXBlendOp[GFXBlendOp["MAX"] = 4] = "MAX";
})(GFXBlendOp || (GFXBlendOp = {}));

var GFXBlendFactor;

(function (GFXBlendFactor) {
  GFXBlendFactor[GFXBlendFactor["ZERO"] = 0] = "ZERO";
  GFXBlendFactor[GFXBlendFactor["ONE"] = 1] = "ONE";
  GFXBlendFactor[GFXBlendFactor["SRC_ALPHA"] = 2] = "SRC_ALPHA";
  GFXBlendFactor[GFXBlendFactor["DST_ALPHA"] = 3] = "DST_ALPHA";
  GFXBlendFactor[GFXBlendFactor["ONE_MINUS_SRC_ALPHA"] = 4] = "ONE_MINUS_SRC_ALPHA";
  GFXBlendFactor[GFXBlendFactor["ONE_MINUS_DST_ALPHA"] = 5] = "ONE_MINUS_DST_ALPHA";
  GFXBlendFactor[GFXBlendFactor["SRC_COLOR"] = 6] = "SRC_COLOR";
  GFXBlendFactor[GFXBlendFactor["DST_COLOR"] = 7] = "DST_COLOR";
  GFXBlendFactor[GFXBlendFactor["ONE_MINUS_SRC_COLOR"] = 8] = "ONE_MINUS_SRC_COLOR";
  GFXBlendFactor[GFXBlendFactor["ONE_MINUS_DST_COLOR"] = 9] = "ONE_MINUS_DST_COLOR";
  GFXBlendFactor[GFXBlendFactor["SRC_ALPHA_SATURATE"] = 10] = "SRC_ALPHA_SATURATE";
  GFXBlendFactor[GFXBlendFactor["CONSTANT_COLOR"] = 11] = "CONSTANT_COLOR";
  GFXBlendFactor[GFXBlendFactor["ONE_MINUS_CONSTANT_COLOR"] = 12] = "ONE_MINUS_CONSTANT_COLOR";
  GFXBlendFactor[GFXBlendFactor["CONSTANT_ALPHA"] = 13] = "CONSTANT_ALPHA";
  GFXBlendFactor[GFXBlendFactor["ONE_MINUS_CONSTANT_ALPHA"] = 14] = "ONE_MINUS_CONSTANT_ALPHA";
})(GFXBlendFactor || (GFXBlendFactor = {}));

var GFXColorMask;

(function (GFXColorMask) {
  GFXColorMask[GFXColorMask["NONE"] = 0] = "NONE";
  GFXColorMask[GFXColorMask["R"] = 1] = "R";
  GFXColorMask[GFXColorMask["G"] = 2] = "G";
  GFXColorMask[GFXColorMask["B"] = 4] = "B";
  GFXColorMask[GFXColorMask["A"] = 8] = "A";
  GFXColorMask[GFXColorMask["ALL"] = 15] = "ALL";
})(GFXColorMask || (GFXColorMask = {}));

var GFXFilter;

(function (GFXFilter) {
  GFXFilter[GFXFilter["NONE"] = 0] = "NONE";
  GFXFilter[GFXFilter["POINT"] = 1] = "POINT";
  GFXFilter[GFXFilter["LINEAR"] = 2] = "LINEAR";
  GFXFilter[GFXFilter["ANISOTROPIC"] = 3] = "ANISOTROPIC";
})(GFXFilter || (GFXFilter = {}));

var GFXAddress;

(function (GFXAddress) {
  GFXAddress[GFXAddress["WRAP"] = 0] = "WRAP";
  GFXAddress[GFXAddress["MIRROR"] = 1] = "MIRROR";
  GFXAddress[GFXAddress["CLAMP"] = 2] = "CLAMP";
  GFXAddress[GFXAddress["BORDER"] = 3] = "BORDER";
})(GFXAddress || (GFXAddress = {}));

var GFXTextureType;

(function (GFXTextureType) {
  GFXTextureType[GFXTextureType["TEX1D"] = 0] = "TEX1D";
  GFXTextureType[GFXTextureType["TEX2D"] = 1] = "TEX2D";
  GFXTextureType[GFXTextureType["TEX3D"] = 2] = "TEX3D";
})(GFXTextureType || (GFXTextureType = {}));

var GFXTextureUsageBit;

(function (GFXTextureUsageBit) {
  GFXTextureUsageBit[GFXTextureUsageBit["NONE"] = 0] = "NONE";
  GFXTextureUsageBit[GFXTextureUsageBit["TRANSFER_SRC"] = 1] = "TRANSFER_SRC";
  GFXTextureUsageBit[GFXTextureUsageBit["TRANSFER_DST"] = 2] = "TRANSFER_DST";
  GFXTextureUsageBit[GFXTextureUsageBit["SAMPLED"] = 4] = "SAMPLED";
  GFXTextureUsageBit[GFXTextureUsageBit["STORAGE"] = 8] = "STORAGE";
  GFXTextureUsageBit[GFXTextureUsageBit["COLOR_ATTACHMENT"] = 16] = "COLOR_ATTACHMENT";
  GFXTextureUsageBit[GFXTextureUsageBit["DEPTH_STENCIL_ATTACHMENT"] = 32] = "DEPTH_STENCIL_ATTACHMENT";
  GFXTextureUsageBit[GFXTextureUsageBit["TRANSIENT_ATTACHMENT"] = 64] = "TRANSIENT_ATTACHMENT";
  GFXTextureUsageBit[GFXTextureUsageBit["INPUT_ATTACHMENT"] = 128] = "INPUT_ATTACHMENT";
})(GFXTextureUsageBit || (GFXTextureUsageBit = {}));

var GFXSampleCount;

(function (GFXSampleCount) {
  GFXSampleCount[GFXSampleCount["X1"] = 0] = "X1";
  GFXSampleCount[GFXSampleCount["X2"] = 1] = "X2";
  GFXSampleCount[GFXSampleCount["X4"] = 2] = "X4";
  GFXSampleCount[GFXSampleCount["X8"] = 3] = "X8";
  GFXSampleCount[GFXSampleCount["X16"] = 4] = "X16";
  GFXSampleCount[GFXSampleCount["X32"] = 5] = "X32";
  GFXSampleCount[GFXSampleCount["X64"] = 6] = "X64";
})(GFXSampleCount || (GFXSampleCount = {}));

var GFXTextureFlagBit;

(function (GFXTextureFlagBit) {
  GFXTextureFlagBit[GFXTextureFlagBit["NONE"] = 0] = "NONE";
  GFXTextureFlagBit[GFXTextureFlagBit["GEN_MIPMAP"] = 1] = "GEN_MIPMAP";
  GFXTextureFlagBit[GFXTextureFlagBit["CUBEMAP"] = 2] = "CUBEMAP";
  GFXTextureFlagBit[GFXTextureFlagBit["BAKUP_BUFFER"] = 4] = "BAKUP_BUFFER";
})(GFXTextureFlagBit || (GFXTextureFlagBit = {}));

var GFXTextureViewType;

(function (GFXTextureViewType) {
  GFXTextureViewType[GFXTextureViewType["TV1D"] = 0] = "TV1D";
  GFXTextureViewType[GFXTextureViewType["TV2D"] = 1] = "TV2D";
  GFXTextureViewType[GFXTextureViewType["TV3D"] = 2] = "TV3D";
  GFXTextureViewType[GFXTextureViewType["CUBE"] = 3] = "CUBE";
  GFXTextureViewType[GFXTextureViewType["TV1D_ARRAY"] = 4] = "TV1D_ARRAY";
  GFXTextureViewType[GFXTextureViewType["TV2D_ARRAY"] = 5] = "TV2D_ARRAY";
})(GFXTextureViewType || (GFXTextureViewType = {}));

var GFXShaderType;

(function (GFXShaderType) {
  GFXShaderType[GFXShaderType["VERTEX"] = 0] = "VERTEX";
  GFXShaderType[GFXShaderType["HULL"] = 1] = "HULL";
  GFXShaderType[GFXShaderType["DOMAIN"] = 2] = "DOMAIN";
  GFXShaderType[GFXShaderType["GEOMETRY"] = 3] = "GEOMETRY";
  GFXShaderType[GFXShaderType["FRAGMENT"] = 4] = "FRAGMENT";
  GFXShaderType[GFXShaderType["COMPUTE"] = 5] = "COMPUTE";
  GFXShaderType[GFXShaderType["COUNT"] = 6] = "COUNT";
})(GFXShaderType || (GFXShaderType = {}));

var GFXBindingType;

(function (GFXBindingType) {
  GFXBindingType[GFXBindingType["UNKNOWN"] = 0] = "UNKNOWN";
  GFXBindingType[GFXBindingType["UNIFORM_BUFFER"] = 1] = "UNIFORM_BUFFER";
  GFXBindingType[GFXBindingType["SAMPLER"] = 2] = "SAMPLER";
  GFXBindingType[GFXBindingType["STORAGE_BUFFER"] = 3] = "STORAGE_BUFFER";
})(GFXBindingType || (GFXBindingType = {}));

var GFXCommandBufferType;

(function (GFXCommandBufferType) {
  GFXCommandBufferType[GFXCommandBufferType["PRIMARY"] = 0] = "PRIMARY";
  GFXCommandBufferType[GFXCommandBufferType["SECONDARY"] = 1] = "SECONDARY";
})(GFXCommandBufferType || (GFXCommandBufferType = {})); // Enumeration all possible values of operations to be performed on initially Loading a Framebuffer Object.


var GFXLoadOp;

(function (GFXLoadOp) {
  GFXLoadOp[GFXLoadOp["LOAD"] = 0] = "LOAD";
  GFXLoadOp[GFXLoadOp["CLEAR"] = 1] = "CLEAR";
  GFXLoadOp[GFXLoadOp["DISCARD"] = 2] = "DISCARD";
})(GFXLoadOp || (GFXLoadOp = {})); // Enumerates all possible values of operations to be performed when Storing to a Framebuffer Object.


var GFXStoreOp;

(function (GFXStoreOp) {
  GFXStoreOp[GFXStoreOp["STORE"] = 0] = "STORE";
  GFXStoreOp[GFXStoreOp["DISCARD"] = 1] = "DISCARD";
})(GFXStoreOp || (GFXStoreOp = {}));

var GFXTextureLayout;

(function (GFXTextureLayout) {
  GFXTextureLayout[GFXTextureLayout["UNDEFINED"] = 0] = "UNDEFINED";
  GFXTextureLayout[GFXTextureLayout["GENERAL"] = 1] = "GENERAL";
  GFXTextureLayout[GFXTextureLayout["COLOR_ATTACHMENT_OPTIMAL"] = 2] = "COLOR_ATTACHMENT_OPTIMAL";
  GFXTextureLayout[GFXTextureLayout["DEPTH_STENCIL_ATTACHMENT_OPTIMAL"] = 3] = "DEPTH_STENCIL_ATTACHMENT_OPTIMAL";
  GFXTextureLayout[GFXTextureLayout["DEPTH_STENCIL_READONLY_OPTIMAL"] = 4] = "DEPTH_STENCIL_READONLY_OPTIMAL";
  GFXTextureLayout[GFXTextureLayout["SHADER_READONLY_OPTIMAL"] = 5] = "SHADER_READONLY_OPTIMAL";
  GFXTextureLayout[GFXTextureLayout["TRANSFER_SRC_OPTIMAL"] = 6] = "TRANSFER_SRC_OPTIMAL";
  GFXTextureLayout[GFXTextureLayout["TRANSFER_DST_OPTIMAL"] = 7] = "TRANSFER_DST_OPTIMAL";
  GFXTextureLayout[GFXTextureLayout["PREINITIALIZED"] = 8] = "PREINITIALIZED";
  GFXTextureLayout[GFXTextureLayout["PRESENT_SRC"] = 9] = "PRESENT_SRC";
})(GFXTextureLayout || (GFXTextureLayout = {}));

var GFXPipelineBindPoint;

(function (GFXPipelineBindPoint) {
  GFXPipelineBindPoint[GFXPipelineBindPoint["GRAPHICS"] = 0] = "GRAPHICS";
  GFXPipelineBindPoint[GFXPipelineBindPoint["COMPUTE"] = 1] = "COMPUTE";
  GFXPipelineBindPoint[GFXPipelineBindPoint["RAY_TRACING"] = 2] = "RAY_TRACING";
})(GFXPipelineBindPoint || (GFXPipelineBindPoint = {}));

var GFXDynamicState;

(function (GFXDynamicState) {
  GFXDynamicState[GFXDynamicState["VIEWPORT"] = 0] = "VIEWPORT";
  GFXDynamicState[GFXDynamicState["SCISSOR"] = 1] = "SCISSOR";
  GFXDynamicState[GFXDynamicState["LINE_WIDTH"] = 2] = "LINE_WIDTH";
  GFXDynamicState[GFXDynamicState["DEPTH_BIAS"] = 3] = "DEPTH_BIAS";
  GFXDynamicState[GFXDynamicState["BLEND_CONSTANTS"] = 4] = "BLEND_CONSTANTS";
  GFXDynamicState[GFXDynamicState["DEPTH_BOUNDS"] = 5] = "DEPTH_BOUNDS";
  GFXDynamicState[GFXDynamicState["STENCIL_WRITE_MASK"] = 6] = "STENCIL_WRITE_MASK";
  GFXDynamicState[GFXDynamicState["STENCIL_COMPARE_MASK"] = 7] = "STENCIL_COMPARE_MASK";
})(GFXDynamicState || (GFXDynamicState = {}));

var GFXStencilFace;

(function (GFXStencilFace) {
  GFXStencilFace[GFXStencilFace["FRONT"] = 0] = "FRONT";
  GFXStencilFace[GFXStencilFace["BACK"] = 1] = "BACK";
  GFXStencilFace[GFXStencilFace["ALL"] = 2] = "ALL";
})(GFXStencilFace || (GFXStencilFace = {}));

var GFXQueueType;

(function (GFXQueueType) {
  GFXQueueType[GFXQueueType["GRAPHICS"] = 0] = "GRAPHICS";
  GFXQueueType[GFXQueueType["COMPUTE"] = 1] = "COMPUTE";
  GFXQueueType[GFXQueueType["TRANSFER"] = 2] = "TRANSFER";
})(GFXQueueType || (GFXQueueType = {}));

var GFXClearFlag;

(function (GFXClearFlag) {
  GFXClearFlag[GFXClearFlag["NONE"] = 0] = "NONE";
  GFXClearFlag[GFXClearFlag["COLOR"] = 1] = "COLOR";
  GFXClearFlag[GFXClearFlag["DEPTH"] = 2] = "DEPTH";
  GFXClearFlag[GFXClearFlag["STENCIL"] = 4] = "STENCIL";
  GFXClearFlag[GFXClearFlag["DEPTH_STENCIL"] = 6] = "DEPTH_STENCIL";
  GFXClearFlag[GFXClearFlag["ALL"] = 7] = "ALL";
})(GFXClearFlag || (GFXClearFlag = {}));

function GFXGetTypeSize(type) {
  switch (type) {
    case GFXType.BOOL:
    case GFXType.INT:
    case GFXType.UINT:
    case GFXType.FLOAT:
      return 4;

    case GFXType.BOOL2:
    case GFXType.INT2:
    case GFXType.UINT2:
    case GFXType.FLOAT2:
      return 8;

    case GFXType.BOOL3:
    case GFXType.INT3:
    case GFXType.UINT3:
    case GFXType.FLOAT3:
      return 12;

    case GFXType.BOOL4:
    case GFXType.INT4:
    case GFXType.UINT4:
    case GFXType.FLOAT4:
    case GFXType.MAT2:
      return 16;

    case GFXType.MAT2X3:
      return 24;

    case GFXType.MAT2X4:
      return 32;

    case GFXType.MAT3X2:
      return 24;

    case GFXType.MAT3:
      return 36;

    case GFXType.MAT3X4:
      return 48;

    case GFXType.MAT4X2:
      return 32;

    case GFXType.MAT4X2:
      return 32;

    case GFXType.MAT4:
      return 64;

    case GFXType.SAMPLER1D:
    case GFXType.SAMPLER1D_ARRAY:
    case GFXType.SAMPLER2D:
    case GFXType.SAMPLER2D_ARRAY:
    case GFXType.SAMPLER3D:
    case GFXType.SAMPLER_CUBE:
      return 4;

    default:
      {
        return 0;
      }
  }
} // import { GFXBuffer } from '../gfx/buffer';


var RenderPassStage;

(function (RenderPassStage) {
  RenderPassStage[RenderPassStage["DEFAULT"] = 100] = "DEFAULT";
})(RenderPassStage || (RenderPassStage = {}));

var RenderPriority;

(function (RenderPriority) {
  RenderPriority[RenderPriority["MIN"] = 0] = "MIN";
  RenderPriority[RenderPriority["MAX"] = 255] = "MAX";
  RenderPriority[RenderPriority["DEFAULT"] = 128] = "DEFAULT";
})(RenderPriority || (RenderPriority = {}));

var MAX_BINDING_SUPPORTED = 24; // from WebGL 2 spec

var UniformBinding;

(function (UniformBinding) {
  // UBOs
  UniformBinding[UniformBinding["UBO_GLOBAL"] = MAX_BINDING_SUPPORTED - 1] = "UBO_GLOBAL";
  UniformBinding[UniformBinding["UBO_SHADOW"] = MAX_BINDING_SUPPORTED - 2] = "UBO_SHADOW";
  UniformBinding[UniformBinding["UBO_LOCAL"] = MAX_BINDING_SUPPORTED - 3] = "UBO_LOCAL";
  UniformBinding[UniformBinding["UBO_FORWARD_LIGHTS"] = MAX_BINDING_SUPPORTED - 4] = "UBO_FORWARD_LIGHTS";
  UniformBinding[UniformBinding["UBO_SKINNING"] = MAX_BINDING_SUPPORTED - 5] = "UBO_SKINNING";
  UniformBinding[UniformBinding["UBO_SKINNING_TEXTURE"] = MAX_BINDING_SUPPORTED - 6] = "UBO_SKINNING_TEXTURE";
  UniformBinding[UniformBinding["UBO_UI"] = MAX_BINDING_SUPPORTED - 7] = "UBO_UI"; // samplers

  UniformBinding[UniformBinding["SAMPLER_JOINTS"] = MAX_BINDING_SUPPORTED + 1] = "SAMPLER_JOINTS";
  UniformBinding[UniformBinding["SAMPLER_ENVIRONMENT"] = MAX_BINDING_SUPPORTED + 2] = "SAMPLER_ENVIRONMENT"; // rooms left for custom bindings
  // effect importer prepares bindings according to this

  UniformBinding[UniformBinding["CUSTUM_UBO_BINDING_END_POINT"] = MAX_BINDING_SUPPORTED - 7] = "CUSTUM_UBO_BINDING_END_POINT";
  UniformBinding[UniformBinding["CUSTOM_SAMPLER_BINDING_START_POINT"] = MAX_BINDING_SUPPORTED + 6] = "CUSTOM_SAMPLER_BINDING_START_POINT";
})(UniformBinding || (UniformBinding = {})); // export class UBOGlobal {
//     public static TIME_OFFSET: number = 0;
//     public static SCREEN_SIZE_OFFSET: number = UBOGlobal.TIME_OFFSET + 4;
//     public static SCREEN_SCALE_OFFSET: number = UBOGlobal.SCREEN_SIZE_OFFSET + 4;
//     public static NATIVE_SIZE_OFFSET: number = UBOGlobal.SCREEN_SCALE_OFFSET + 4;
//     public static MAT_VIEW_OFFSET: number = UBOGlobal.NATIVE_SIZE_OFFSET + 4;
//     public static MAT_VIEW_INV_OFFSET: number = UBOGlobal.MAT_VIEW_OFFSET + 16;
//     public static MAT_PROJ_OFFSET: number = UBOGlobal.MAT_VIEW_INV_OFFSET + 16;
//     public static MAT_PROJ_INV_OFFSET: number = UBOGlobal.MAT_PROJ_OFFSET + 16;
//     public static MAT_VIEW_PROJ_OFFSET: number = UBOGlobal.MAT_PROJ_INV_OFFSET + 16;
//     public static MAT_VIEW_PROJ_INV_OFFSET: number = UBOGlobal.MAT_VIEW_PROJ_OFFSET + 16;
//     public static CAMERA_POS_OFFSET: number = UBOGlobal.MAT_VIEW_PROJ_INV_OFFSET + 16;
//     public static EXPOSURE_OFFSET: number = UBOGlobal.CAMERA_POS_OFFSET + 4;
//     public static MAIN_LIT_DIR_OFFSET: number = UBOGlobal.EXPOSURE_OFFSET + 4;
//     public static MAIN_LIT_COLOR_OFFSET: number = UBOGlobal.MAIN_LIT_DIR_OFFSET + 4;
//     public static AMBIENT_SKY_OFFSET: number = UBOGlobal.MAIN_LIT_COLOR_OFFSET + 4;
//     public static AMBIENT_GROUND_OFFSET: number = UBOGlobal.AMBIENT_SKY_OFFSET + 4;
//     public static COUNT: number = UBOGlobal.AMBIENT_GROUND_OFFSET + 4;
//     public static SIZE: number = UBOGlobal.COUNT * 4;
//     public static BLOCK: GFXUniformBlock = {
//         binding: UniformBinding.UBO_GLOBAL, name: 'CCGlobal', members: [
//             { name: 'cc_time', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_screenSize', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_screenScale', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_nativeSize', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_matView', type: GFXType.MAT4, count: 1 },
//             { name: 'cc_matViewInv', type: GFXType.MAT4, count: 1 },
//             { name: 'cc_matProj', type: GFXType.MAT4, count: 1 },
//             { name: 'cc_matProjInv', type: GFXType.MAT4, count: 1 },
//             { name: 'cc_matViewProj', type: GFXType.MAT4, count: 1 },
//             { name: 'cc_matViewProjInv', type: GFXType.MAT4, count: 1 },
//             { name: 'cc_cameraPos', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_exposure', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_mainLitDir', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_mainLitColor', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_ambientSky', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_ambientGround', type: GFXType.FLOAT4, count: 1 },
//         ],
//     };
//     public view: Float32Array = new Float32Array(UBOGlobal.COUNT);
// }
// export class UBOShadow {
//     public static MAT_LIGHT_PLANE_PROJ_OFFSET: number = 0;
//     public static SHADOW_COLOR_OFFSET: number = UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET + 16;
//     public static COUNT: number = UBOShadow.SHADOW_COLOR_OFFSET + 4;
//     public static SIZE: number = UBOShadow.COUNT * 4;
//     public static BLOCK: GFXUniformBlock = {
//         binding: UniformBinding.UBO_SHADOW, name: 'CCShadow', members: [
//             { name: 'cc_matLightPlaneProj', type: GFXType.MAT4, count: 1 },
//             { name: 'cc_shadowColor', type: GFXType.FLOAT4, count: 1 },
//         ],
//     };
//     public view: Float32Array = new Float32Array(UBOShadow.COUNT);
// }
// export const localBindingsDesc: Map<string, IInternalBindingDesc> = new Map<string, IInternalBindingDesc>();
// export class UBOLocal {
//     public static MAT_WORLD_OFFSET: number = 0;
//     public static MAT_WORLD_IT_OFFSET: number = UBOLocal.MAT_WORLD_OFFSET + 16;
//     public static COUNT: number = UBOLocal.MAT_WORLD_IT_OFFSET + 16;
//     public static SIZE: number = UBOLocal.COUNT * 4;
//     public static BLOCK: GFXUniformBlock = {
//         binding: UniformBinding.UBO_LOCAL, name: 'CCLocal', members: [
//             { name: 'cc_matWorld', type: GFXType.MAT4, count: 1 },
//             { name: 'cc_matWorldIT', type: GFXType.MAT4, count: 1 },
//         ],
//     };
//     public view: Float32Array = new Float32Array(UBOLocal.COUNT);
// }
// localBindingsDesc.set(UBOLocal.BLOCK.name, {
//     type: GFXBindingType.UNIFORM_BUFFER,
//     blockInfo: UBOLocal.BLOCK,
// });
// export class UBOForwardLight {
//     public static MAX_SPHERE_LIGHTS = 2;
//     public static MAX_SPOT_LIGHTS = 2;
//     public static SPHERE_LIGHT_POS_OFFSET: number = 0;
//     public static SPHERE_LIGHT_SIZE_RANGE_OFFSET: number = UBOForwardLight.SPHERE_LIGHT_POS_OFFSET + UBOForwardLight.MAX_SPHERE_LIGHTS * 4;
//     public static SPHERE_LIGHT_COLOR_OFFSET: number = UBOForwardLight.SPHERE_LIGHT_SIZE_RANGE_OFFSET + UBOForwardLight.MAX_SPHERE_LIGHTS * 4;
//     public static SPOT_LIGHT_POS_OFFSET: number = UBOForwardLight.SPHERE_LIGHT_COLOR_OFFSET + UBOForwardLight.MAX_SPOT_LIGHTS * 4;
//     public static SPOT_LIGHT_SIZE_RANGE_ANGLE_OFFSET: number = UBOForwardLight.SPOT_LIGHT_POS_OFFSET + UBOForwardLight.MAX_SPOT_LIGHTS * 4;
//     public static SPOT_LIGHT_DIR_OFFSET: number = UBOForwardLight.SPOT_LIGHT_SIZE_RANGE_ANGLE_OFFSET + UBOForwardLight.MAX_SPOT_LIGHTS * 4;
//     public static SPOT_LIGHT_COLOR_OFFSET: number = UBOForwardLight.SPOT_LIGHT_DIR_OFFSET + UBOForwardLight.MAX_SPOT_LIGHTS * 4;
//     public static COUNT: number = UBOForwardLight.SPOT_LIGHT_COLOR_OFFSET + UBOForwardLight.MAX_SPOT_LIGHTS * 4;
//     public static SIZE: number = UBOForwardLight.COUNT * 4;
//     public static BLOCK: GFXUniformBlock = {
//         binding: UniformBinding.UBO_FORWARD_LIGHTS, name: 'CCForwardLight', members: [
//             { name: 'cc_sphereLitPos', type: GFXType.FLOAT4, count: UBOForwardLight.MAX_SPHERE_LIGHTS },
//             { name: 'cc_sphereLitSizeRange', type: GFXType.FLOAT4, count: UBOForwardLight.MAX_SPHERE_LIGHTS },
//             { name: 'cc_sphereLitColor', type: GFXType.FLOAT4, count: UBOForwardLight.MAX_SPHERE_LIGHTS },
//             { name: 'cc_spotLitPos', type: GFXType.FLOAT4, count: UBOForwardLight.MAX_SPOT_LIGHTS },
//             { name: 'cc_spotLitSizeRangeAngle', type: GFXType.FLOAT4, count: UBOForwardLight.MAX_SPOT_LIGHTS },
//             { name: 'cc_spotLitDir', type: GFXType.FLOAT4, count: UBOForwardLight.MAX_SPOT_LIGHTS },
//             { name: 'cc_spotLitColor', type: GFXType.FLOAT4, count: UBOForwardLight.MAX_SPOT_LIGHTS },
//         ],
//     };
//     public view: Float32Array = new Float32Array(UBOForwardLight.COUNT);
// }
// localBindingsDesc.set(UBOForwardLight.BLOCK.name, {
//     type: GFXBindingType.UNIFORM_BUFFER,
//     blockInfo: UBOForwardLight.BLOCK,
// });
// export class UBOSkinning {
//     public static MAT_JOINT_OFFSET: number = 0;
//     public static JOINTS_TEXTURE_SIZE_OFFSET: number = UBOSkinning.MAT_JOINT_OFFSET + 128 * 16;
//     public static COUNT: number = UBOSkinning.JOINTS_TEXTURE_SIZE_OFFSET + 4;
//     public static SIZE: number = UBOSkinning.COUNT * 4;
//     public static BLOCK: GFXUniformBlock = {
//         binding: UniformBinding.UBO_SKINNING, name: 'CCSkinning', members: [
//             { name: 'cc_matJoint', type: GFXType.MAT4, count: 128 },
//             { name: 'cc_jointsTextureSize', type: GFXType.FLOAT4, count: 1 },
//         ],
//     };
// }
// localBindingsDesc.set(UBOSkinning.BLOCK.name, {
//     type: GFXBindingType.UNIFORM_BUFFER,
//     blockInfo: UBOSkinning.BLOCK,
// });
// export const UNIFORM_JOINTS_TEXTURE: GFXUniformSampler = {
//     binding: UniformBinding.SAMPLER_JOINTS, name: 'cc_jointsTexture', type: GFXType.SAMPLER2D, count: 1,
// };
// localBindingsDesc.set(UNIFORM_JOINTS_TEXTURE.name, {
//     type: GFXBindingType.SAMPLER,
//     samplerInfo: UNIFORM_JOINTS_TEXTURE,
// });
// export interface IInternalBindingDesc {
//     type: GFXBindingType;
//     blockInfo?: GFXUniformBlock;
//     samplerInfo?: GFXUniformSampler;
// }
// export interface IInternalBindingInst extends IInternalBindingDesc {
//     buffer?: GFXBuffer;
//     sampler?: GFXSampler;
//     textureView?: GFXTextureView;
// }
// this file is used for offline effect building.


var _a, _b;

var SamplerInfoIndex;

(function (SamplerInfoIndex) {
  SamplerInfoIndex[SamplerInfoIndex["minFilter"] = 0] = "minFilter";
  SamplerInfoIndex[SamplerInfoIndex["magFilter"] = 1] = "magFilter";
  SamplerInfoIndex[SamplerInfoIndex["mipFilter"] = 2] = "mipFilter";
  SamplerInfoIndex[SamplerInfoIndex["addressU"] = 3] = "addressU";
  SamplerInfoIndex[SamplerInfoIndex["addressV"] = 4] = "addressV";
  SamplerInfoIndex[SamplerInfoIndex["addressW"] = 5] = "addressW";
  SamplerInfoIndex[SamplerInfoIndex["maxAnisotropy"] = 6] = "maxAnisotropy";
  SamplerInfoIndex[SamplerInfoIndex["cmpFunc"] = 7] = "cmpFunc";
  SamplerInfoIndex[SamplerInfoIndex["minLOD"] = 8] = "minLOD";
  SamplerInfoIndex[SamplerInfoIndex["maxLOD"] = 9] = "maxLOD";
  SamplerInfoIndex[SamplerInfoIndex["mipLODBias"] = 10] = "mipLODBias";
  SamplerInfoIndex[SamplerInfoIndex["borderColor"] = 11] = "borderColor";
  SamplerInfoIndex[SamplerInfoIndex["total"] = 15] = "total";
})(SamplerInfoIndex || (SamplerInfoIndex = {}));

var typeMap = {};
typeMap[typeMap['bool'] = GFXType.BOOL] = 'bool';
typeMap[typeMap['int'] = GFXType.INT] = 'int';
typeMap[typeMap['ivec2'] = GFXType.INT2] = 'ivec2invTypeParams';
typeMap[typeMap['ivec3'] = GFXType.INT3] = 'ivec3';
typeMap[typeMap['ivec4'] = GFXType.INT4] = 'ivec4';
typeMap[typeMap['float'] = GFXType.FLOAT] = 'float';
typeMap[typeMap['vec2'] = GFXType.FLOAT2] = 'vec2';
typeMap[typeMap['vec3'] = GFXType.FLOAT3] = 'vec3';
typeMap[typeMap['vec4'] = GFXType.FLOAT4] = 'vec4';
typeMap[typeMap['mat2'] = GFXType.MAT2] = 'mat2';
typeMap[typeMap['mat3'] = GFXType.MAT3] = 'mat3';
typeMap[typeMap['mat4'] = GFXType.MAT4] = 'mat4';
typeMap[typeMap['sampler2D'] = GFXType.SAMPLER2D] = 'sampler2D';
typeMap[typeMap['samplerCube'] = GFXType.SAMPLER_CUBE] = 'samplerCube';
var sizeMap = (_a = {}, _a[GFXType.BOOL] = 4, _a[GFXType.INT] = 4, _a[GFXType.INT2] = 8, _a[GFXType.INT3] = 12, _a[GFXType.INT4] = 16, _a[GFXType.FLOAT] = 4, _a[GFXType.FLOAT2] = 8, _a[GFXType.FLOAT3] = 12, _a[GFXType.FLOAT4] = 16, _a[GFXType.MAT2] = 16, _a[GFXType.MAT3] = 36, _a[GFXType.MAT4] = 64, _a[GFXType.SAMPLER2D] = 4, _a[GFXType.SAMPLER_CUBE] = 4, _a);
var formatMap = (_b = {}, _b[GFXType.BOOL] = GFXFormat.R32I, _b[GFXType.INT] = GFXFormat.R32I, _b[GFXType.INT2] = GFXFormat.RG32I, _b[GFXType.INT3] = GFXFormat.RGB32I, _b[GFXType.INT4] = GFXFormat.RGBA32I, _b[GFXType.FLOAT] = GFXFormat.R32F, _b[GFXType.FLOAT2] = GFXFormat.RG32F, _b[GFXType.FLOAT3] = GFXFormat.RGB32F, _b[GFXType.FLOAT4] = GFXFormat.RGBA32F, _b); // const passParams = {
//   // color mask
//   NONE: gfx.GFXColorMask.NONE,
//   R: gfx.GFXColorMask.R,
//   G: gfx.GFXColorMask.G,
//   B: gfx.GFXColorMask.B,
//   A: gfx.GFXColorMask.A,
//   RG: gfx.GFXColorMask.R | gfx.GFXColorMask.G,
//   RB: gfx.GFXColorMask.R | gfx.GFXColorMask.B,
//   RA: gfx.GFXColorMask.R | gfx.GFXColorMask.A,
//   GB: gfx.GFXColorMask.G | gfx.GFXColorMask.B,
//   GA: gfx.GFXColorMask.G | gfx.GFXColorMask.A,
//   BA: gfx.GFXColorMask.B | gfx.GFXColorMask.A,
//   RGB: gfx.GFXColorMask.R | gfx.GFXColorMask.G | gfx.GFXColorMask.B,
//   RGA: gfx.GFXColorMask.R | gfx.GFXColorMask.G | gfx.GFXColorMask.A,
//   RBA: gfx.GFXColorMask.R | gfx.GFXColorMask.B | gfx.GFXColorMask.A,
//   GBA: gfx.GFXColorMask.G | gfx.GFXColorMask.B | gfx.GFXColorMask.A,
//   ALL: gfx.GFXColorMask.ALL,
//   // blend operation
//   ADD: gfx.GFXBlendOp.ADD,
//   SUB: gfx.GFXBlendOp.SUB,
//   REV_SUB: gfx.GFXBlendOp.REV_SUB,
//   MIN: gfx.GFXBlendOp.MIN,
//   MAX: gfx.GFXBlendOp.MAX,
//   // blend factor
//   ZERO: gfx.GFXBlendFactor.ZERO,
//   ONE: gfx.GFXBlendFactor.ONE,
//   SRC_ALPHA: gfx.GFXBlendFactor.SRC_ALPHA,
//   DST_ALPHA: gfx.GFXBlendFactor.DST_ALPHA,
//   ONE_MINUS_SRC_ALPHA: gfx.GFXBlendFactor.ONE_MINUS_SRC_ALPHA,
//   ONE_MINUS_DST_ALPHA: gfx.GFXBlendFactor.ONE_MINUS_DST_ALPHA,
//   SRC_COLOR: gfx.GFXBlendFactor.SRC_COLOR,
//   DST_COLOR: gfx.GFXBlendFactor.DST_COLOR,
//   ONE_MINUS_SRC_COLOR: gfx.GFXBlendFactor.ONE_MINUS_SRC_COLOR,
//   ONE_MINUS_DST_COLOR: gfx.GFXBlendFactor.ONE_MINUS_DST_COLOR,
//   SRC_ALPHA_SATURATE: gfx.GFXBlendFactor.SRC_ALPHA_SATURATE,
//   CONSTANT_COLOR: gfx.GFXBlendFactor.CONSTANT_COLOR,
//   ONE_MINUS_CONSTANT_COLOR: gfx.GFXBlendFactor.ONE_MINUS_CONSTANT_COLOR,
//   CONSTANT_ALPHA: gfx.GFXBlendFactor.CONSTANT_ALPHA,
//   ONE_MINUS_CONSTANT_ALPHA: gfx.GFXBlendFactor.ONE_MINUS_CONSTANT_ALPHA,
//   // stencil operation
//   // ZERO: GFXStencilOp.ZERO, // duplicate, safely removed because enum value is(and always will be) the same
//   KEEP: gfx.GFXStencilOp.KEEP,
//   REPLACE: gfx.GFXStencilOp.REPLACE,
//   INCR: gfx.GFXStencilOp.INCR,
//   DECR: gfx.GFXStencilOp.DECR,
//   INVERT: gfx.GFXStencilOp.INVERT,
//   INCR_WRAP: gfx.GFXStencilOp.INCR_WRAP,
//   DECR_WRAP: gfx.GFXStencilOp.DECR_WRAP,
//     // comparison function
//   NEVER: gfx.GFXComparisonFunc.NEVER,
//   LESS: gfx.GFXComparisonFunc.LESS,
//   EQUAL: gfx.GFXComparisonFunc.EQUAL,
//   LESS_EQUAL: gfx.GFXComparisonFunc.LESS_EQUAL,
//   GREATER: gfx.GFXComparisonFunc.GREATER,
//   NOT_EQUAL: gfx.GFXComparisonFunc.NOT_EQUAL,
//   GREATER_EQUAL: gfx.GFXComparisonFunc.GREATER_EQUAL,
//   ALWAYS: gfx.GFXComparisonFunc.ALWAYS,
//   // cull mode
//   // NONE: GFXCullMode.NONE, // duplicate, safely removed because enum value is(and always will be) the same
//   FRONT: gfx.GFXCullMode.FRONT,
//   BACK: gfx.GFXCullMode.BACK,
//   // shade mode
//   GOURAND: gfx.GFXShadeModel.GOURAND,
//   FLAT: gfx.GFXShadeModel.FLAT,
//   // polygon mode
//   FILL: gfx.GFXPolygonMode.FILL,
//   LINE: gfx.GFXPolygonMode.LINE,
//   POINT: gfx.GFXPolygonMode.POINT,
//   // primitive mode
//   POINT_LIST: gfx.GFXPrimitiveMode.POINT_LIST,
//   LINE_LIST: gfx.GFXPrimitiveMode.LINE_LIST,
//   LINE_STRIP: gfx.GFXPrimitiveMode.LINE_STRIP,
//   LINE_LOOP: gfx.GFXPrimitiveMode.LINE_LOOP,
//   TRIANGLE_LIST: gfx.GFXPrimitiveMode.TRIANGLE_LIST,
//   TRIANGLE_STRIP: gfx.GFXPrimitiveMode.TRIANGLE_STRIP,
//   TRIANGLE_FAN: gfx.GFXPrimitiveMode.TRIANGLE_FAN,
//   LINE_LIST_ADJACENCY: gfx.GFXPrimitiveMode.LINE_LIST_ADJACENCY,
//   LINE_STRIP_ADJACENCY: gfx.GFXPrimitiveMode.LINE_STRIP_ADJACENCY,
//   TRIANGLE_LIST_ADJACENCY: gfx.GFXPrimitiveMode.TRIANGLE_LIST_ADJACENCY,
//   TRIANGLE_STRIP_ADJACENCY: gfx.GFXPrimitiveMode.TRIANGLE_STRIP_ADJACENCY,
//   TRIANGLE_PATCH_ADJACENCY: gfx.GFXPrimitiveMode.TRIANGLE_PATCH_ADJACENCY,
//   QUAD_PATCH_LIST: gfx.GFXPrimitiveMode.QUAD_PATCH_LIST,
//   ISO_LINE_LIST: gfx.GFXPrimitiveMode.ISO_LINE_LIST,
//   // POINT: gfx.GFXFilter.POINT, // duplicate, safely removed because enum value is(and always will be) the same
//   LINEAR: gfx.GFXFilter.LINEAR,
//   ANISOTROPIC: gfx.GFXFilter.ANISOTROPIC,
//   WRAP: gfx.GFXAddress.WRAP,
//   MIRROR: gfx.GFXAddress.MIRROR,
//   CLAMP: gfx.GFXAddress.CLAMP,
//   BORDER: gfx.GFXAddress.BORDER,
//   VIEWPORT: gfx.GFXDynamicState.VIEWPORT,
//   SCISSOR: gfx.GFXDynamicState.SCISSOR,
//   LINE_WIDTH: gfx.GFXDynamicState.LINE_WIDTH,
//   DEPTH_BIAS: gfx.GFXDynamicState.DEPTH_BIAS,
//   BLEND_CONSTANTS: gfx.GFXDynamicState.BLEND_CONSTANTS,
//   DEPTH_BOUNDS: gfx.GFXDynamicState.DEPTH_BOUNDS,
//   STENCIL_WRITE_MASK: gfx.GFXDynamicState.STENCIL_WRITE_MASK,
//   STENCIL_COMPARE_MASK: gfx.GFXDynamicState.STENCIL_COMPARE_MASK,
//   TRUE: true,
//   FALSE: false
// };

var passParams = {
  BACK: enums.CULL_BACK,
  FRONT: enums.CULL_FRONT,
  NONE: enums.CULL_NONE,
  ADD: enums.BLEND_FUNC_ADD,
  SUB: enums.BLEND_FUNC_SUBTRACT,
  REV_SUB: enums.BLEND_FUNC_REVERSE_SUBTRACT,
  ZERO: enums.BLEND_ZERO,
  ONE: enums.BLEND_ONE,
  SRC_COLOR: enums.BLEND_SRC_COLOR,
  ONE_MINUS_SRC_COLOR: enums.BLEND_ONE_MINUS_SRC_COLOR,
  DST_COLOR: enums.BLEND_DST_COLOR,
  ONE_MINUS_DST_COLOR: enums.BLEND_ONE_MINUS_DST_COLOR,
  SRC_ALPHA: enums.BLEND_SRC_ALPHA,
  ONE_MINUS_SRC_ALPHA: enums.BLEND_ONE_MINUS_SRC_ALPHA,
  DST_ALPHA: enums.BLEND_DST_ALPHA,
  ONE_MINUS_DST_ALPHA: enums.BLEND_ONE_MINUS_DST_ALPHA,
  CONSTANT_COLOR: enums.BLEND_CONSTANT_COLOR,
  ONE_MINUS_CONSTANT_COLOR: enums.BLEND_ONE_MINUS_CONSTANT_COLOR,
  CONSTANT_ALPHA: enums.BLEND_CONSTANT_ALPHA,
  ONE_MINUS_CONSTANT_ALPHA: enums.BLEND_ONE_MINUS_CONSTANT_ALPHA,
  SRC_ALPHA_SATURATE: enums.BLEND_SRC_ALPHA_SATURATE,
  NEVER: enums.DS_FUNC_NEVER,
  LESS: enums.DS_FUNC_LESS,
  EQUAL: enums.DS_FUNC_EQUAL,
  LEQUAL: enums.DS_FUNC_LEQUAL,
  GREATER: enums.DS_FUNC_GREATER,
  NOTEQUAL: enums.DS_FUNC_NOTEQUAL,
  GEQUAL: enums.DS_FUNC_GEQUAL,
  ALWAYS: enums.DS_FUNC_ALWAYS,
  KEEP: enums.STENCIL_OP_KEEP,
  REPLACE: enums.STENCIL_OP_REPLACE,
  INCR: enums.STENCIL_OP_INCR,
  INCR_WRAP: enums.STENCIL_OP_INCR_WRAP,
  DECR: enums.STENCIL_OP_DECR,
  DECR_WRAP: enums.STENCIL_OP_DECR_WRAP,
  INVERT: enums.STENCIL_OP_INVERT
};
Object.assign(passParams, RenderPassStage); // for structural type checking
// an 'any' key will check against all elements defined in that object
// a key start with '$' means its essential, and can't be undefined

var effectStructure = {
  $techniques: [{
    $passes: [{
      depthStencilState: {},
      rasterizerState: {},
      blendState: {
        targets: [{}]
      },
      properties: {
        any: {
          sampler: {},
          inspector: {}
        }
      }
    }]
  }]
};
var mappings = {
  murmurhash2_32_gc: murmurhash2_32_gc,
  SamplerInfoIndex: SamplerInfoIndex,
  effectStructure: effectStructure,
  typeMap: typeMap,
  sizeMap: sizeMap,
  formatMap: formatMap,
  passParams: passParams,
  RenderQueue: RenderQueue,
  RenderPriority: RenderPriority,
  GFXGetTypeSize: GFXGetTypeSize,
  UniformBinding: UniformBinding
};
module.exports = mappings;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9idWlsZC9tYXBwaW5ncy9pbmRleC5qcyJdLCJuYW1lcyI6WyJlbnVtcyIsIlVTQUdFX1NUQVRJQyIsIlVTQUdFX0RZTkFNSUMiLCJVU0FHRV9TVFJFQU0iLCJJTkRFWF9GTVRfVUlOVDgiLCJJTkRFWF9GTVRfVUlOVDE2IiwiSU5ERVhfRk1UX1VJTlQzMiIsIkFUVFJfUE9TSVRJT04iLCJBVFRSX05PUk1BTCIsIkFUVFJfVEFOR0VOVCIsIkFUVFJfQklUQU5HRU5UIiwiQVRUUl9XRUlHSFRTIiwiQVRUUl9KT0lOVFMiLCJBVFRSX0NPTE9SIiwiQVRUUl9DT0xPUjAiLCJBVFRSX0NPTE9SMSIsIkFUVFJfVVYiLCJBVFRSX1VWMCIsIkFUVFJfVVYxIiwiQVRUUl9VVjIiLCJBVFRSX1VWMyIsIkFUVFJfVVY0IiwiQVRUUl9VVjUiLCJBVFRSX1VWNiIsIkFUVFJfVVY3IiwiQVRUUl9URVhfQ09PUkQiLCJBVFRSX1RFWF9DT09SRDEiLCJBVFRSX1RFWF9DT09SRDIiLCJBVFRSX1RFWF9DT09SRDMiLCJBVFRSX1RFWF9DT09SRDQiLCJBVFRSX1RFWF9DT09SRDUiLCJBVFRSX1RFWF9DT09SRDYiLCJBVFRSX1RFWF9DT09SRDciLCJBVFRSX1RFWF9DT09SRDgiLCJBVFRSX1RZUEVfSU5UOCIsIkFUVFJfVFlQRV9VSU5UOCIsIkFUVFJfVFlQRV9JTlQxNiIsIkFUVFJfVFlQRV9VSU5UMTYiLCJBVFRSX1RZUEVfSU5UMzIiLCJBVFRSX1RZUEVfVUlOVDMyIiwiQVRUUl9UWVBFX0ZMT0FUMzIiLCJGSUxURVJfTkVBUkVTVCIsIkZJTFRFUl9MSU5FQVIiLCJXUkFQX1JFUEVBVCIsIldSQVBfQ0xBTVAiLCJXUkFQX01JUlJPUiIsIlRFWFRVUkVfRk1UX1JHQl9EWFQxIiwiVEVYVFVSRV9GTVRfUkdCQV9EWFQxIiwiVEVYVFVSRV9GTVRfUkdCQV9EWFQzIiwiVEVYVFVSRV9GTVRfUkdCQV9EWFQ1IiwiVEVYVFVSRV9GTVRfUkdCX0VUQzEiLCJURVhUVVJFX0ZNVF9SR0JfUFZSVENfMkJQUFYxIiwiVEVYVFVSRV9GTVRfUkdCQV9QVlJUQ18yQlBQVjEiLCJURVhUVVJFX0ZNVF9SR0JfUFZSVENfNEJQUFYxIiwiVEVYVFVSRV9GTVRfUkdCQV9QVlJUQ180QlBQVjEiLCJURVhUVVJFX0ZNVF9BOCIsIlRFWFRVUkVfRk1UX0w4IiwiVEVYVFVSRV9GTVRfTDhfQTgiLCJURVhUVVJFX0ZNVF9SNV9HNl9CNSIsIlRFWFRVUkVfRk1UX1I1X0c1X0I1X0ExIiwiVEVYVFVSRV9GTVRfUjRfRzRfQjRfQTQiLCJURVhUVVJFX0ZNVF9SR0I4IiwiVEVYVFVSRV9GTVRfUkdCQTgiLCJURVhUVVJFX0ZNVF9SR0IxNkYiLCJURVhUVVJFX0ZNVF9SR0JBMTZGIiwiVEVYVFVSRV9GTVRfUkdCMzJGIiwiVEVYVFVSRV9GTVRfUkdCQTMyRiIsIlRFWFRVUkVfRk1UX1IzMkYiLCJURVhUVVJFX0ZNVF8xMTExMTBGIiwiVEVYVFVSRV9GTVRfU1JHQiIsIlRFWFRVUkVfRk1UX1NSR0JBIiwiVEVYVFVSRV9GTVRfRDE2IiwiVEVYVFVSRV9GTVRfRDMyIiwiVEVYVFVSRV9GTVRfRDI0UzgiLCJURVhUVVJFX0ZNVF9SR0JfRVRDMiIsIlRFWFRVUkVfRk1UX1JHQkFfRVRDMiIsIkRTX0ZVTkNfTkVWRVIiLCJEU19GVU5DX0xFU1MiLCJEU19GVU5DX0VRVUFMIiwiRFNfRlVOQ19MRVFVQUwiLCJEU19GVU5DX0dSRUFURVIiLCJEU19GVU5DX05PVEVRVUFMIiwiRFNfRlVOQ19HRVFVQUwiLCJEU19GVU5DX0FMV0FZUyIsIlJCX0ZNVF9SR0JBNCIsIlJCX0ZNVF9SR0I1X0ExIiwiUkJfRk1UX1JHQjU2NSIsIlJCX0ZNVF9EMTYiLCJSQl9GTVRfUzgiLCJSQl9GTVRfRDI0UzgiLCJCTEVORF9GVU5DX0FERCIsIkJMRU5EX0ZVTkNfU1VCVFJBQ1QiLCJCTEVORF9GVU5DX1JFVkVSU0VfU1VCVFJBQ1QiLCJCTEVORF9aRVJPIiwiQkxFTkRfT05FIiwiQkxFTkRfU1JDX0NPTE9SIiwiQkxFTkRfT05FX01JTlVTX1NSQ19DT0xPUiIsIkJMRU5EX0RTVF9DT0xPUiIsIkJMRU5EX09ORV9NSU5VU19EU1RfQ09MT1IiLCJCTEVORF9TUkNfQUxQSEEiLCJCTEVORF9PTkVfTUlOVVNfU1JDX0FMUEhBIiwiQkxFTkRfRFNUX0FMUEhBIiwiQkxFTkRfT05FX01JTlVTX0RTVF9BTFBIQSIsIkJMRU5EX0NPTlNUQU5UX0NPTE9SIiwiQkxFTkRfT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SIiwiQkxFTkRfQ09OU1RBTlRfQUxQSEEiLCJCTEVORF9PTkVfTUlOVVNfQ09OU1RBTlRfQUxQSEEiLCJCTEVORF9TUkNfQUxQSEFfU0FUVVJBVEUiLCJTVEVOQ0lMX0RJU0FCTEUiLCJTVEVOQ0lMX0VOQUJMRSIsIlNURU5DSUxfSU5IRVJJVCIsIlNURU5DSUxfT1BfS0VFUCIsIlNURU5DSUxfT1BfWkVSTyIsIlNURU5DSUxfT1BfUkVQTEFDRSIsIlNURU5DSUxfT1BfSU5DUiIsIlNURU5DSUxfT1BfSU5DUl9XUkFQIiwiU1RFTkNJTF9PUF9ERUNSIiwiU1RFTkNJTF9PUF9ERUNSX1dSQVAiLCJTVEVOQ0lMX09QX0lOVkVSVCIsIkNVTExfTk9ORSIsIkNVTExfRlJPTlQiLCJDVUxMX0JBQ0siLCJDVUxMX0ZST05UX0FORF9CQUNLIiwiUFRfUE9JTlRTIiwiUFRfTElORVMiLCJQVF9MSU5FX0xPT1AiLCJQVF9MSU5FX1NUUklQIiwiUFRfVFJJQU5HTEVTIiwiUFRfVFJJQU5HTEVfU1RSSVAiLCJQVF9UUklBTkdMRV9GQU4iLCJSZW5kZXJRdWV1ZSIsIk9QQVFVRSIsIlRSQU5TUEFSRU5UIiwiT1ZFUkxBWSIsIm11cm11cmhhc2gyXzMyX2djIiwic3RyIiwic2VlZCIsImwiLCJsZW5ndGgiLCJoIiwiaSIsImsiLCJjaGFyQ29kZUF0IiwiV2ViR0xFWFQiLCJHRlhPYmplY3RUeXBlIiwiR0ZYU3RhdHVzIiwiR0ZYT2JqZWN0IiwiZ2Z4VHlwZSIsIl9nZnhUeXBlIiwiVU5LTk9XTiIsIl9zdGF0dXMiLCJVTlJFQURZIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJwcm90b3R5cGUiLCJnZXQiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiR0ZYQXR0cmlidXRlTmFtZSIsIkdGWFR5cGUiLCJHRlhGb3JtYXQiLCJHRlhCdWZmZXJVc2FnZUJpdCIsIkdGWE1lbW9yeVVzYWdlQml0IiwiR0ZYQnVmZmVyQWNjZXNzQml0IiwiR0ZYUHJpbWl0aXZlTW9kZSIsIkdGWFBvbHlnb25Nb2RlIiwiR0ZYU2hhZGVNb2RlbCIsIkdGWEN1bGxNb2RlIiwiR0ZYQ29tcGFyaXNvbkZ1bmMiLCJHRlhTdGVuY2lsT3AiLCJHRlhCbGVuZE9wIiwiR0ZYQmxlbmRGYWN0b3IiLCJHRlhDb2xvck1hc2siLCJHRlhGaWx0ZXIiLCJHRlhBZGRyZXNzIiwiR0ZYVGV4dHVyZVR5cGUiLCJHRlhUZXh0dXJlVXNhZ2VCaXQiLCJHRlhTYW1wbGVDb3VudCIsIkdGWFRleHR1cmVGbGFnQml0IiwiR0ZYVGV4dHVyZVZpZXdUeXBlIiwiR0ZYU2hhZGVyVHlwZSIsIkdGWEJpbmRpbmdUeXBlIiwiR0ZYQ29tbWFuZEJ1ZmZlclR5cGUiLCJHRlhMb2FkT3AiLCJHRlhTdG9yZU9wIiwiR0ZYVGV4dHVyZUxheW91dCIsIkdGWFBpcGVsaW5lQmluZFBvaW50IiwiR0ZYRHluYW1pY1N0YXRlIiwiR0ZYU3RlbmNpbEZhY2UiLCJHRlhRdWV1ZVR5cGUiLCJHRlhDbGVhckZsYWciLCJHRlhHZXRUeXBlU2l6ZSIsInR5cGUiLCJCT09MIiwiSU5UIiwiVUlOVCIsIkZMT0FUIiwiQk9PTDIiLCJJTlQyIiwiVUlOVDIiLCJGTE9BVDIiLCJCT09MMyIsIklOVDMiLCJVSU5UMyIsIkZMT0FUMyIsIkJPT0w0IiwiSU5UNCIsIlVJTlQ0IiwiRkxPQVQ0IiwiTUFUMiIsIk1BVDJYMyIsIk1BVDJYNCIsIk1BVDNYMiIsIk1BVDMiLCJNQVQzWDQiLCJNQVQ0WDIiLCJNQVQ0IiwiU0FNUExFUjFEIiwiU0FNUExFUjFEX0FSUkFZIiwiU0FNUExFUjJEIiwiU0FNUExFUjJEX0FSUkFZIiwiU0FNUExFUjNEIiwiU0FNUExFUl9DVUJFIiwiUmVuZGVyUGFzc1N0YWdlIiwiUmVuZGVyUHJpb3JpdHkiLCJNQVhfQklORElOR19TVVBQT1JURUQiLCJVbmlmb3JtQmluZGluZyIsIl9hIiwiX2IiLCJTYW1wbGVySW5mb0luZGV4IiwidHlwZU1hcCIsInNpemVNYXAiLCJmb3JtYXRNYXAiLCJSMzJJIiwiUkczMkkiLCJSR0IzMkkiLCJSR0JBMzJJIiwiUjMyRiIsIlJHMzJGIiwiUkdCMzJGIiwiUkdCQTMyRiIsInBhc3NQYXJhbXMiLCJCQUNLIiwiRlJPTlQiLCJOT05FIiwiQUREIiwiU1VCIiwiUkVWX1NVQiIsIlpFUk8iLCJPTkUiLCJTUkNfQ09MT1IiLCJPTkVfTUlOVVNfU1JDX0NPTE9SIiwiRFNUX0NPTE9SIiwiT05FX01JTlVTX0RTVF9DT0xPUiIsIlNSQ19BTFBIQSIsIk9ORV9NSU5VU19TUkNfQUxQSEEiLCJEU1RfQUxQSEEiLCJPTkVfTUlOVVNfRFNUX0FMUEhBIiwiQ09OU1RBTlRfQ09MT1IiLCJPTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1IiLCJDT05TVEFOVF9BTFBIQSIsIk9ORV9NSU5VU19DT05TVEFOVF9BTFBIQSIsIlNSQ19BTFBIQV9TQVRVUkFURSIsIk5FVkVSIiwiTEVTUyIsIkVRVUFMIiwiTEVRVUFMIiwiR1JFQVRFUiIsIk5PVEVRVUFMIiwiR0VRVUFMIiwiQUxXQVlTIiwiS0VFUCIsIlJFUExBQ0UiLCJJTkNSIiwiSU5DUl9XUkFQIiwiREVDUiIsIkRFQ1JfV1JBUCIsIklOVkVSVCIsImFzc2lnbiIsImVmZmVjdFN0cnVjdHVyZSIsIiR0ZWNobmlxdWVzIiwiJHBhc3NlcyIsImRlcHRoU3RlbmNpbFN0YXRlIiwicmFzdGVyaXplclN0YXRlIiwiYmxlbmRTdGF0ZSIsInRhcmdldHMiLCJwcm9wZXJ0aWVzIiwiYW55Iiwic2FtcGxlciIsImluc3BlY3RvciIsIm1hcHBpbmdzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUVBOzs7O0FBR0EsSUFBTUEsS0FBSyxHQUFHO0FBQ1o7QUFDQUMsRUFBQUEsWUFBWSxFQUFFLEtBRkY7QUFFVTtBQUN0QkMsRUFBQUEsYUFBYSxFQUFFLEtBSEg7QUFHVTtBQUN0QkMsRUFBQUEsWUFBWSxFQUFFLEtBSkY7QUFJVTtBQUV0QjtBQUNBQyxFQUFBQSxlQUFlLEVBQUUsSUFQTDtBQU9ZO0FBQ3hCQyxFQUFBQSxnQkFBZ0IsRUFBRSxJQVJOO0FBUVk7QUFDeEJDLEVBQUFBLGdCQUFnQixFQUFFLElBVE47QUFTWTtBQUV4QjtBQUNBQyxFQUFBQSxhQUFhLEVBQUUsWUFaSDtBQWFaQyxFQUFBQSxXQUFXLEVBQUUsVUFiRDtBQWNaQyxFQUFBQSxZQUFZLEVBQUUsV0FkRjtBQWVaQyxFQUFBQSxjQUFjLEVBQUUsYUFmSjtBQWdCWkMsRUFBQUEsWUFBWSxFQUFFLFdBaEJGO0FBaUJaQyxFQUFBQSxXQUFXLEVBQUUsVUFqQkQ7QUFrQlpDLEVBQUFBLFVBQVUsRUFBRSxTQWxCQTtBQW1CWkMsRUFBQUEsV0FBVyxFQUFFLFVBbkJEO0FBb0JaQyxFQUFBQSxXQUFXLEVBQUUsVUFwQkQ7QUFxQlpDLEVBQUFBLE9BQU8sRUFBRSxNQXJCRztBQXNCWkMsRUFBQUEsUUFBUSxFQUFFLE9BdEJFO0FBdUJaQyxFQUFBQSxRQUFRLEVBQUUsT0F2QkU7QUF3QlpDLEVBQUFBLFFBQVEsRUFBRSxPQXhCRTtBQXlCWkMsRUFBQUEsUUFBUSxFQUFFLE9BekJFO0FBMEJaQyxFQUFBQSxRQUFRLEVBQUUsT0ExQkU7QUEyQlpDLEVBQUFBLFFBQVEsRUFBRSxPQTNCRTtBQTRCWkMsRUFBQUEsUUFBUSxFQUFFLE9BNUJFO0FBNkJaQyxFQUFBQSxRQUFRLEVBQUUsT0E3QkU7QUE4QlpDLEVBQUFBLGNBQWMsRUFBRSxZQTlCSjtBQStCWkMsRUFBQUEsZUFBZSxFQUFFLGFBL0JMO0FBZ0NaQyxFQUFBQSxlQUFlLEVBQUUsYUFoQ0w7QUFpQ1pDLEVBQUFBLGVBQWUsRUFBRSxhQWpDTDtBQWtDWkMsRUFBQUEsZUFBZSxFQUFFLGFBbENMO0FBbUNaQyxFQUFBQSxlQUFlLEVBQUUsYUFuQ0w7QUFvQ1pDLEVBQUFBLGVBQWUsRUFBRSxhQXBDTDtBQXFDWkMsRUFBQUEsZUFBZSxFQUFFLGFBckNMO0FBc0NaQyxFQUFBQSxlQUFlLEVBQUUsYUF0Q0w7QUF5Q1o7QUFDQUMsRUFBQUEsY0FBYyxFQUFFLElBMUNKO0FBMENhO0FBQ3pCQyxFQUFBQSxlQUFlLEVBQUUsSUEzQ0w7QUEyQ2E7QUFDekJDLEVBQUFBLGVBQWUsRUFBRSxJQTVDTDtBQTRDYTtBQUN6QkMsRUFBQUEsZ0JBQWdCLEVBQUUsSUE3Q047QUE2Q2E7QUFDekJDLEVBQUFBLGVBQWUsRUFBRSxJQTlDTDtBQThDYTtBQUN6QkMsRUFBQUEsZ0JBQWdCLEVBQUUsSUEvQ047QUErQ2E7QUFDekJDLEVBQUFBLGlCQUFpQixFQUFFLElBaERQO0FBZ0RhO0FBRXpCO0FBQ0FDLEVBQUFBLGNBQWMsRUFBRSxDQW5ESjtBQW9EWkMsRUFBQUEsYUFBYSxFQUFFLENBcERIO0FBc0RaO0FBQ0FDLEVBQUFBLFdBQVcsRUFBRSxLQXZERDtBQXVEUTtBQUNwQkMsRUFBQUEsVUFBVSxFQUFFLEtBeERBO0FBd0RRO0FBQ3BCQyxFQUFBQSxXQUFXLEVBQUUsS0F6REQ7QUF5RFE7QUFFcEI7QUFDQTtBQUNBQyxFQUFBQSxvQkFBb0IsRUFBRSxDQTdEVjtBQThEWkMsRUFBQUEscUJBQXFCLEVBQUUsQ0E5RFg7QUErRFpDLEVBQUFBLHFCQUFxQixFQUFFLENBL0RYO0FBZ0VaQyxFQUFBQSxxQkFBcUIsRUFBRSxDQWhFWDtBQWlFWkMsRUFBQUEsb0JBQW9CLEVBQUUsQ0FqRVY7QUFrRVpDLEVBQUFBLDRCQUE0QixFQUFFLENBbEVsQjtBQW1FWkMsRUFBQUEsNkJBQTZCLEVBQUUsQ0FuRW5CO0FBb0VaQyxFQUFBQSw0QkFBNEIsRUFBRSxDQXBFbEI7QUFxRVpDLEVBQUFBLDZCQUE2QixFQUFFLENBckVuQjtBQXVFWjtBQUNBQyxFQUFBQSxjQUFjLEVBQUUsQ0F4RUo7QUF5RVpDLEVBQUFBLGNBQWMsRUFBRSxFQXpFSjtBQTBFWkMsRUFBQUEsaUJBQWlCLEVBQUUsRUExRVA7QUEyRVpDLEVBQUFBLG9CQUFvQixFQUFFLEVBM0VWO0FBNEVaQyxFQUFBQSx1QkFBdUIsRUFBRSxFQTVFYjtBQTZFWkMsRUFBQUEsdUJBQXVCLEVBQUUsRUE3RWI7QUE4RVpDLEVBQUFBLGdCQUFnQixFQUFFLEVBOUVOO0FBK0VaQyxFQUFBQSxpQkFBaUIsRUFBRSxFQS9FUDtBQWdGWkMsRUFBQUEsa0JBQWtCLEVBQUUsRUFoRlI7QUFpRlpDLEVBQUFBLG1CQUFtQixFQUFFLEVBakZUO0FBa0ZaQyxFQUFBQSxrQkFBa0IsRUFBRSxFQWxGUjtBQW1GWkMsRUFBQUEsbUJBQW1CLEVBQUUsRUFuRlQ7QUFvRlpDLEVBQUFBLGdCQUFnQixFQUFFLEVBcEZOO0FBcUZaQyxFQUFBQSxtQkFBbUIsRUFBRSxFQXJGVDtBQXNGWkMsRUFBQUEsZ0JBQWdCLEVBQUUsRUF0Rk47QUF1RlpDLEVBQUFBLGlCQUFpQixFQUFFLEVBdkZQO0FBeUZaO0FBQ0FDLEVBQUFBLGVBQWUsRUFBRSxFQTFGTDtBQTJGWkMsRUFBQUEsZUFBZSxFQUFFLEVBM0ZMO0FBNEZaQyxFQUFBQSxpQkFBaUIsRUFBRSxFQTVGUDtBQThGWjtBQUNBQyxFQUFBQSxvQkFBb0IsRUFBRSxFQS9GVjtBQWdHWkMsRUFBQUEscUJBQXFCLEVBQUUsRUFoR1g7QUFrR1o7QUFDQUMsRUFBQUEsYUFBYSxFQUFFLEdBbkdIO0FBbUdXO0FBQ3ZCQyxFQUFBQSxZQUFZLEVBQUUsR0FwR0Y7QUFvR1c7QUFDdkJDLEVBQUFBLGFBQWEsRUFBRSxHQXJHSDtBQXFHVztBQUN2QkMsRUFBQUEsY0FBYyxFQUFFLEdBdEdKO0FBc0dXO0FBQ3ZCQyxFQUFBQSxlQUFlLEVBQUUsR0F2R0w7QUF1R1c7QUFDdkJDLEVBQUFBLGdCQUFnQixFQUFFLEdBeEdOO0FBd0dXO0FBQ3ZCQyxFQUFBQSxjQUFjLEVBQUUsR0F6R0o7QUF5R1c7QUFDdkJDLEVBQUFBLGNBQWMsRUFBRSxHQTFHSjtBQTBHVztBQUV2QjtBQUNBQyxFQUFBQSxZQUFZLEVBQUUsS0E3R0Y7QUE2R1k7QUFDeEJDLEVBQUFBLGNBQWMsRUFBRSxLQTlHSjtBQThHWTtBQUN4QkMsRUFBQUEsYUFBYSxFQUFFLEtBL0dIO0FBK0dZO0FBQ3hCQyxFQUFBQSxVQUFVLEVBQUUsS0FoSEE7QUFnSFk7QUFDeEJDLEVBQUFBLFNBQVMsRUFBRSxLQWpIQztBQWlIWTtBQUN4QkMsRUFBQUEsWUFBWSxFQUFFLEtBbEhGO0FBa0hZO0FBRXhCO0FBQ0FDLEVBQUFBLGNBQWMsRUFBRSxLQXJISjtBQXFId0I7QUFDcENDLEVBQUFBLG1CQUFtQixFQUFFLEtBdEhUO0FBc0h3QjtBQUNwQ0MsRUFBQUEsMkJBQTJCLEVBQUUsS0F2SGpCO0FBdUh3QjtBQUVwQztBQUNBQyxFQUFBQSxVQUFVLEVBQUUsQ0ExSEE7QUEwSDRCO0FBQ3hDQyxFQUFBQSxTQUFTLEVBQUUsQ0EzSEM7QUEySDRCO0FBQ3hDQyxFQUFBQSxlQUFlLEVBQUUsR0E1SEw7QUE0SDRCO0FBQ3hDQyxFQUFBQSx5QkFBeUIsRUFBRSxHQTdIZjtBQTZINEI7QUFDeENDLEVBQUFBLGVBQWUsRUFBRSxHQTlITDtBQThINEI7QUFDeENDLEVBQUFBLHlCQUF5QixFQUFFLEdBL0hmO0FBK0g0QjtBQUN4Q0MsRUFBQUEsZUFBZSxFQUFFLEdBaElMO0FBZ0k0QjtBQUN4Q0MsRUFBQUEseUJBQXlCLEVBQUUsR0FqSWY7QUFpSTRCO0FBQ3hDQyxFQUFBQSxlQUFlLEVBQUUsR0FsSUw7QUFrSTRCO0FBQ3hDQyxFQUFBQSx5QkFBeUIsRUFBRSxHQW5JZjtBQW1JNEI7QUFDeENDLEVBQUFBLG9CQUFvQixFQUFFLEtBcElWO0FBb0k0QjtBQUN4Q0MsRUFBQUEsOEJBQThCLEVBQUUsS0FySXBCO0FBcUk0QjtBQUN4Q0MsRUFBQUEsb0JBQW9CLEVBQUUsS0F0SVY7QUFzSTRCO0FBQ3hDQyxFQUFBQSw4QkFBOEIsRUFBRSxLQXZJcEI7QUF1STRCO0FBQ3hDQyxFQUFBQSx3QkFBd0IsRUFBRSxHQXhJZDtBQXdJNEI7QUFFeEM7QUFDQUMsRUFBQUEsZUFBZSxFQUFFLENBM0lMO0FBMklvQjtBQUNoQ0MsRUFBQUEsY0FBYyxFQUFFLENBNUlKO0FBNElvQjtBQUNoQ0MsRUFBQUEsZUFBZSxFQUFFLENBN0lMO0FBNklvQjtBQUVoQ0MsRUFBQUEsZUFBZSxFQUFFLElBL0lMO0FBK0lvQjtBQUNoQ0MsRUFBQUEsZUFBZSxFQUFFLENBaEpMO0FBZ0pvQjtBQUNoQ0MsRUFBQUEsa0JBQWtCLEVBQUUsSUFqSlI7QUFpSm9CO0FBQ2hDQyxFQUFBQSxlQUFlLEVBQUUsSUFsSkw7QUFrSm9CO0FBQ2hDQyxFQUFBQSxvQkFBb0IsRUFBRSxLQW5KVjtBQW1Kb0I7QUFDaENDLEVBQUFBLGVBQWUsRUFBRSxJQXBKTDtBQW9Kb0I7QUFDaENDLEVBQUFBLG9CQUFvQixFQUFFLEtBckpWO0FBcUpvQjtBQUNoQ0MsRUFBQUEsaUJBQWlCLEVBQUUsSUF0SlA7QUFzSm9CO0FBRWhDO0FBQ0FDLEVBQUFBLFNBQVMsRUFBRSxDQXpKQztBQTBKWkMsRUFBQUEsVUFBVSxFQUFFLElBMUpBO0FBMkpaQyxFQUFBQSxTQUFTLEVBQUUsSUEzSkM7QUE0SlpDLEVBQUFBLG1CQUFtQixFQUFFLElBNUpUO0FBOEpaO0FBQ0FDLEVBQUFBLFNBQVMsRUFBRSxDQS9KQztBQStKVTtBQUN0QkMsRUFBQUEsUUFBUSxFQUFFLENBaEtFO0FBZ0tVO0FBQ3RCQyxFQUFBQSxZQUFZLEVBQUUsQ0FqS0Y7QUFpS1U7QUFDdEJDLEVBQUFBLGFBQWEsRUFBRSxDQWxLSDtBQWtLVTtBQUN0QkMsRUFBQUEsWUFBWSxFQUFFLENBbktGO0FBbUtVO0FBQ3RCQyxFQUFBQSxpQkFBaUIsRUFBRSxDQXBLUDtBQW9LVTtBQUN0QkMsRUFBQUEsZUFBZSxFQUFFLENBcktMLENBcUtVOztBQXJLVixDQUFkO0FBd0tBLElBQUlDLFdBQVcsR0FBRztBQUNkQyxFQUFBQSxNQUFNLEVBQUUsQ0FETTtBQUVkQyxFQUFBQSxXQUFXLEVBQUUsQ0FGQztBQUdkQyxFQUFBQSxPQUFPLEVBQUU7QUFISyxDQUFsQjtBQU1BOzs7Ozs7Ozs7Ozs7O0FBYUEsU0FBU0MsaUJBQVQsQ0FBMkJDLEdBQTNCLEVBQWdDQyxJQUFoQyxFQUFzQztBQUNwQyxNQUNFQyxDQUFDLEdBQUdGLEdBQUcsQ0FBQ0csTUFEVjtBQUFBLE1BRUVDLENBQUMsR0FBR0gsSUFBSSxHQUFHQyxDQUZiO0FBQUEsTUFHRUcsQ0FBQyxHQUFHLENBSE47QUFBQSxNQUlFQyxDQUpGOztBQU1BLFNBQU9KLENBQUMsSUFBSSxDQUFaLEVBQWU7QUFDZEksSUFBQUEsQ0FBQyxHQUNHTixHQUFHLENBQUNPLFVBQUosQ0FBZUYsQ0FBZixJQUFvQixJQUF0QixHQUNDLENBQUNMLEdBQUcsQ0FBQ08sVUFBSixDQUFlLEVBQUVGLENBQWpCLElBQXNCLElBQXZCLEtBQWdDLENBRGpDLEdBRUMsQ0FBQ0wsR0FBRyxDQUFDTyxVQUFKLENBQWUsRUFBRUYsQ0FBakIsSUFBc0IsSUFBdkIsS0FBZ0MsRUFGakMsR0FHQyxDQUFDTCxHQUFHLENBQUNPLFVBQUosQ0FBZSxFQUFFRixDQUFqQixJQUFzQixJQUF2QixLQUFnQyxFQUpuQztBQU1DQyxJQUFBQSxDQUFDLEdBQUssQ0FBQ0EsQ0FBQyxHQUFHLE1BQUwsSUFBZSxVQUFoQixJQUErQixDQUFFLENBQUNBLENBQUMsS0FBSyxFQUFQLElBQWEsVUFBZCxHQUE0QixNQUE3QixLQUF3QyxFQUF2RSxDQUFMO0FBQ0FBLElBQUFBLENBQUMsSUFBSUEsQ0FBQyxLQUFLLEVBQVg7QUFDQUEsSUFBQUEsQ0FBQyxHQUFLLENBQUNBLENBQUMsR0FBRyxNQUFMLElBQWUsVUFBaEIsSUFBK0IsQ0FBRSxDQUFDQSxDQUFDLEtBQUssRUFBUCxJQUFhLFVBQWQsR0FBNEIsTUFBN0IsS0FBd0MsRUFBdkUsQ0FBTDtBQUVIRixJQUFBQSxDQUFDLEdBQUssQ0FBQ0EsQ0FBQyxHQUFHLE1BQUwsSUFBZSxVQUFoQixJQUErQixDQUFFLENBQUNBLENBQUMsS0FBSyxFQUFQLElBQWEsVUFBZCxHQUE0QixNQUE3QixLQUF3QyxFQUF2RSxDQUFELEdBQStFRSxDQUFuRjtBQUVHSixJQUFBQSxDQUFDLElBQUksQ0FBTDtBQUNBLE1BQUVHLENBQUY7QUFDRDs7QUFFRCxVQUFRSCxDQUFSO0FBQ0EsU0FBSyxDQUFMO0FBQVFFLE1BQUFBLENBQUMsSUFBSSxDQUFDSixHQUFHLENBQUNPLFVBQUosQ0FBZUYsQ0FBQyxHQUFHLENBQW5CLElBQXdCLElBQXpCLEtBQWtDLEVBQXZDOztBQUNSLFNBQUssQ0FBTDtBQUFRRCxNQUFBQSxDQUFDLElBQUksQ0FBQ0osR0FBRyxDQUFDTyxVQUFKLENBQWVGLENBQUMsR0FBRyxDQUFuQixJQUF3QixJQUF6QixLQUFrQyxDQUF2Qzs7QUFDUixTQUFLLENBQUw7QUFBUUQsTUFBQUEsQ0FBQyxJQUFLSixHQUFHLENBQUNPLFVBQUosQ0FBZUYsQ0FBZixJQUFvQixJQUExQjtBQUNBRCxNQUFBQSxDQUFDLEdBQUssQ0FBQ0EsQ0FBQyxHQUFHLE1BQUwsSUFBZSxVQUFoQixJQUErQixDQUFFLENBQUNBLENBQUMsS0FBSyxFQUFQLElBQWEsVUFBZCxHQUE0QixNQUE3QixLQUF3QyxFQUF2RSxDQUFMO0FBSlI7O0FBT0FBLEVBQUFBLENBQUMsSUFBSUEsQ0FBQyxLQUFLLEVBQVg7QUFDQUEsRUFBQUEsQ0FBQyxHQUFLLENBQUNBLENBQUMsR0FBRyxNQUFMLElBQWUsVUFBaEIsSUFBK0IsQ0FBRSxDQUFDQSxDQUFDLEtBQUssRUFBUCxJQUFhLFVBQWQsR0FBNEIsTUFBN0IsS0FBd0MsRUFBdkUsQ0FBTDtBQUNBQSxFQUFBQSxDQUFDLElBQUlBLENBQUMsS0FBSyxFQUFYO0FBRUEsU0FBT0EsQ0FBQyxLQUFLLENBQWI7QUFDRCxFQUVEOzs7QUFDQSxJQUFJSSxRQUFKOztBQUNBLENBQUMsVUFBVUEsUUFBVixFQUFvQjtBQUNqQkEsRUFBQUEsUUFBUSxDQUFDQSxRQUFRLENBQUMsOEJBQUQsQ0FBUixHQUEyQyxLQUE1QyxDQUFSLEdBQTZELDhCQUE3RDtBQUNBQSxFQUFBQSxRQUFRLENBQUNBLFFBQVEsQ0FBQywrQkFBRCxDQUFSLEdBQTRDLEtBQTdDLENBQVIsR0FBOEQsK0JBQTlEO0FBQ0FBLEVBQUFBLFFBQVEsQ0FBQ0EsUUFBUSxDQUFDLCtCQUFELENBQVIsR0FBNEMsS0FBN0MsQ0FBUixHQUE4RCwrQkFBOUQ7QUFDQUEsRUFBQUEsUUFBUSxDQUFDQSxRQUFRLENBQUMsK0JBQUQsQ0FBUixHQUE0QyxLQUE3QyxDQUFSLEdBQThELCtCQUE5RDtBQUNBQSxFQUFBQSxRQUFRLENBQUNBLFFBQVEsQ0FBQywrQkFBRCxDQUFSLEdBQTRDLEtBQTdDLENBQVIsR0FBOEQsK0JBQTlEO0FBQ0FBLEVBQUFBLFFBQVEsQ0FBQ0EsUUFBUSxDQUFDLHFDQUFELENBQVIsR0FBa0QsS0FBbkQsQ0FBUixHQUFvRSxxQ0FBcEU7QUFDQUEsRUFBQUEsUUFBUSxDQUFDQSxRQUFRLENBQUMscUNBQUQsQ0FBUixHQUFrRCxLQUFuRCxDQUFSLEdBQW9FLHFDQUFwRTtBQUNBQSxFQUFBQSxRQUFRLENBQUNBLFFBQVEsQ0FBQyxxQ0FBRCxDQUFSLEdBQWtELEtBQW5ELENBQVIsR0FBb0UscUNBQXBFO0FBQ0FBLEVBQUFBLFFBQVEsQ0FBQ0EsUUFBUSxDQUFDLGlDQUFELENBQVIsR0FBOEMsS0FBL0MsQ0FBUixHQUFnRSxpQ0FBaEU7QUFDQUEsRUFBQUEsUUFBUSxDQUFDQSxRQUFRLENBQUMsaUNBQUQsQ0FBUixHQUE4QyxLQUEvQyxDQUFSLEdBQWdFLGlDQUFoRTtBQUNBQSxFQUFBQSxRQUFRLENBQUNBLFFBQVEsQ0FBQyxrQ0FBRCxDQUFSLEdBQStDLEtBQWhELENBQVIsR0FBaUUsa0NBQWpFO0FBQ0FBLEVBQUFBLFFBQVEsQ0FBQ0EsUUFBUSxDQUFDLGtDQUFELENBQVIsR0FBK0MsS0FBaEQsQ0FBUixHQUFpRSxrQ0FBakU7QUFDQUEsRUFBQUEsUUFBUSxDQUFDQSxRQUFRLENBQUMsMkJBQUQsQ0FBUixHQUF3QyxLQUF6QyxDQUFSLEdBQTBELDJCQUExRDtBQUNILENBZEQsRUFjR0EsUUFBUSxLQUFLQSxRQUFRLEdBQUcsRUFBaEIsQ0FkWDs7QUFlQSxJQUFJQyxhQUFKOztBQUNBLENBQUMsVUFBVUEsYUFBVixFQUF5QjtBQUN0QkEsRUFBQUEsYUFBYSxDQUFDQSxhQUFhLENBQUMsU0FBRCxDQUFiLEdBQTJCLENBQTVCLENBQWIsR0FBOEMsU0FBOUM7QUFDQUEsRUFBQUEsYUFBYSxDQUFDQSxhQUFhLENBQUMsUUFBRCxDQUFiLEdBQTBCLENBQTNCLENBQWIsR0FBNkMsUUFBN0M7QUFDQUEsRUFBQUEsYUFBYSxDQUFDQSxhQUFhLENBQUMsU0FBRCxDQUFiLEdBQTJCLENBQTVCLENBQWIsR0FBOEMsU0FBOUM7QUFDQUEsRUFBQUEsYUFBYSxDQUFDQSxhQUFhLENBQUMsY0FBRCxDQUFiLEdBQWdDLENBQWpDLENBQWIsR0FBbUQsY0FBbkQ7QUFDQUEsRUFBQUEsYUFBYSxDQUFDQSxhQUFhLENBQUMsYUFBRCxDQUFiLEdBQStCLENBQWhDLENBQWIsR0FBa0QsYUFBbEQ7QUFDQUEsRUFBQUEsYUFBYSxDQUFDQSxhQUFhLENBQUMsYUFBRCxDQUFiLEdBQStCLENBQWhDLENBQWIsR0FBa0QsYUFBbEQ7QUFDQUEsRUFBQUEsYUFBYSxDQUFDQSxhQUFhLENBQUMsU0FBRCxDQUFiLEdBQTJCLENBQTVCLENBQWIsR0FBOEMsU0FBOUM7QUFDQUEsRUFBQUEsYUFBYSxDQUFDQSxhQUFhLENBQUMsUUFBRCxDQUFiLEdBQTBCLENBQTNCLENBQWIsR0FBNkMsUUFBN0M7QUFDQUEsRUFBQUEsYUFBYSxDQUFDQSxhQUFhLENBQUMsaUJBQUQsQ0FBYixHQUFtQyxDQUFwQyxDQUFiLEdBQXNELGlCQUF0RDtBQUNBQSxFQUFBQSxhQUFhLENBQUNBLGFBQWEsQ0FBQyxnQkFBRCxDQUFiLEdBQWtDLENBQW5DLENBQWIsR0FBcUQsZ0JBQXJEO0FBQ0FBLEVBQUFBLGFBQWEsQ0FBQ0EsYUFBYSxDQUFDLGdCQUFELENBQWIsR0FBa0MsRUFBbkMsQ0FBYixHQUFzRCxnQkFBdEQ7QUFDQUEsRUFBQUEsYUFBYSxDQUFDQSxhQUFhLENBQUMsaUJBQUQsQ0FBYixHQUFtQyxFQUFwQyxDQUFiLEdBQXVELGlCQUF2RDtBQUNBQSxFQUFBQSxhQUFhLENBQUNBLGFBQWEsQ0FBQyxtQkFBRCxDQUFiLEdBQXFDLEVBQXRDLENBQWIsR0FBeUQsbUJBQXpEO0FBQ0FBLEVBQUFBLGFBQWEsQ0FBQ0EsYUFBYSxDQUFDLGdCQUFELENBQWIsR0FBa0MsRUFBbkMsQ0FBYixHQUFzRCxnQkFBdEQ7QUFDQUEsRUFBQUEsYUFBYSxDQUFDQSxhQUFhLENBQUMsT0FBRCxDQUFiLEdBQXlCLEVBQTFCLENBQWIsR0FBNkMsT0FBN0M7QUFDQUEsRUFBQUEsYUFBYSxDQUFDQSxhQUFhLENBQUMsUUFBRCxDQUFiLEdBQTBCLEVBQTNCLENBQWIsR0FBOEMsUUFBOUM7QUFDSCxDQWpCRCxFQWlCR0EsYUFBYSxLQUFLQSxhQUFhLEdBQUcsRUFBckIsQ0FqQmhCOztBQWtCQSxJQUFJQyxTQUFKOztBQUNBLENBQUMsVUFBVUEsU0FBVixFQUFxQjtBQUNsQkEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsU0FBRCxDQUFULEdBQXVCLENBQXhCLENBQVQsR0FBc0MsU0FBdEM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsUUFBRCxDQUFULEdBQXNCLENBQXZCLENBQVQsR0FBcUMsUUFBckM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsU0FBRCxDQUFULEdBQXVCLENBQXhCLENBQVQsR0FBc0MsU0FBdEM7QUFDSCxDQUpELEVBSUdBLFNBQVMsS0FBS0EsU0FBUyxHQUFHLEVBQWpCLENBSlo7O0FBS0EsSUFBSUMsU0FBUztBQUFHO0FBQWUsWUFBWTtBQUN2QyxXQUFTQSxTQUFULENBQW1CQyxPQUFuQixFQUE0QjtBQUN4QixTQUFLQyxRQUFMLEdBQWdCSixhQUFhLENBQUNLLE9BQTlCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlTCxTQUFTLENBQUNNLE9BQXpCO0FBQ0EsU0FBS0gsUUFBTCxHQUFnQkQsT0FBaEI7QUFDSDs7QUFDREssRUFBQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCUCxTQUFTLENBQUNRLFNBQWhDLEVBQTJDLFNBQTNDLEVBQXNEO0FBQ2xEQyxJQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGFBQU8sS0FBS1AsUUFBWjtBQUNILEtBSGlEO0FBSWxEUSxJQUFBQSxVQUFVLEVBQUUsS0FKc0M7QUFLbERDLElBQUFBLFlBQVksRUFBRTtBQUxvQyxHQUF0RDtBQU9BTCxFQUFBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JQLFNBQVMsQ0FBQ1EsU0FBaEMsRUFBMkMsUUFBM0MsRUFBcUQ7QUFDakRDLElBQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsYUFBTyxLQUFLTCxPQUFaO0FBQ0gsS0FIZ0Q7QUFJakRNLElBQUFBLFVBQVUsRUFBRSxLQUpxQztBQUtqREMsSUFBQUEsWUFBWSxFQUFFO0FBTG1DLEdBQXJEO0FBT0EsU0FBT1gsU0FBUDtBQUNILENBckI4QixFQUEvQjs7QUFzQkEsSUFBSVksZ0JBQUo7O0FBQ0EsQ0FBQyxVQUFVQSxnQkFBVixFQUE0QjtBQUN6QkEsRUFBQUEsZ0JBQWdCLENBQUMsZUFBRCxDQUFoQixHQUFvQyxZQUFwQztBQUNBQSxFQUFBQSxnQkFBZ0IsQ0FBQyxhQUFELENBQWhCLEdBQWtDLFVBQWxDO0FBQ0FBLEVBQUFBLGdCQUFnQixDQUFDLGNBQUQsQ0FBaEIsR0FBbUMsV0FBbkM7QUFDQUEsRUFBQUEsZ0JBQWdCLENBQUMsZ0JBQUQsQ0FBaEIsR0FBcUMsYUFBckM7QUFDQUEsRUFBQUEsZ0JBQWdCLENBQUMsY0FBRCxDQUFoQixHQUFtQyxXQUFuQztBQUNBQSxFQUFBQSxnQkFBZ0IsQ0FBQyxhQUFELENBQWhCLEdBQWtDLFVBQWxDO0FBQ0FBLEVBQUFBLGdCQUFnQixDQUFDLFlBQUQsQ0FBaEIsR0FBaUMsU0FBakM7QUFDQUEsRUFBQUEsZ0JBQWdCLENBQUMsYUFBRCxDQUFoQixHQUFrQyxVQUFsQztBQUNBQSxFQUFBQSxnQkFBZ0IsQ0FBQyxhQUFELENBQWhCLEdBQWtDLFVBQWxDO0FBQ0FBLEVBQUFBLGdCQUFnQixDQUFDLGdCQUFELENBQWhCLEdBQXFDLFlBQXJDO0FBQ0FBLEVBQUFBLGdCQUFnQixDQUFDLGlCQUFELENBQWhCLEdBQXNDLGFBQXRDO0FBQ0FBLEVBQUFBLGdCQUFnQixDQUFDLGlCQUFELENBQWhCLEdBQXNDLGFBQXRDO0FBQ0FBLEVBQUFBLGdCQUFnQixDQUFDLGlCQUFELENBQWhCLEdBQXNDLGFBQXRDO0FBQ0FBLEVBQUFBLGdCQUFnQixDQUFDLGlCQUFELENBQWhCLEdBQXNDLGFBQXRDO0FBQ0FBLEVBQUFBLGdCQUFnQixDQUFDLGlCQUFELENBQWhCLEdBQXNDLGFBQXRDO0FBQ0FBLEVBQUFBLGdCQUFnQixDQUFDLGlCQUFELENBQWhCLEdBQXNDLGFBQXRDO0FBQ0FBLEVBQUFBLGdCQUFnQixDQUFDLGlCQUFELENBQWhCLEdBQXNDLGFBQXRDO0FBQ0FBLEVBQUFBLGdCQUFnQixDQUFDLGlCQUFELENBQWhCLEdBQXNDLGFBQXRDO0FBQ0gsQ0FuQkQsRUFtQkdBLGdCQUFnQixLQUFLQSxnQkFBZ0IsR0FBRyxFQUF4QixDQW5CbkI7O0FBb0JBLElBQUlDLE9BQUo7O0FBQ0EsQ0FBQyxVQUFVQSxPQUFWLEVBQW1CO0FBQ2hCQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxTQUFELENBQVAsR0FBcUIsQ0FBdEIsQ0FBUCxHQUFrQyxTQUFsQztBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxNQUFELENBQVAsR0FBa0IsQ0FBbkIsQ0FBUCxHQUErQixNQUEvQjtBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxPQUFELENBQVAsR0FBbUIsQ0FBcEIsQ0FBUCxHQUFnQyxPQUFoQztBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxPQUFELENBQVAsR0FBbUIsQ0FBcEIsQ0FBUCxHQUFnQyxPQUFoQztBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxPQUFELENBQVAsR0FBbUIsQ0FBcEIsQ0FBUCxHQUFnQyxPQUFoQztBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxLQUFELENBQVAsR0FBaUIsQ0FBbEIsQ0FBUCxHQUE4QixLQUE5QjtBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxNQUFELENBQVAsR0FBa0IsQ0FBbkIsQ0FBUCxHQUErQixNQUEvQjtBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxNQUFELENBQVAsR0FBa0IsQ0FBbkIsQ0FBUCxHQUErQixNQUEvQjtBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxNQUFELENBQVAsR0FBa0IsQ0FBbkIsQ0FBUCxHQUErQixNQUEvQjtBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxNQUFELENBQVAsR0FBa0IsQ0FBbkIsQ0FBUCxHQUErQixNQUEvQjtBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxPQUFELENBQVAsR0FBbUIsRUFBcEIsQ0FBUCxHQUFpQyxPQUFqQztBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxPQUFELENBQVAsR0FBbUIsRUFBcEIsQ0FBUCxHQUFpQyxPQUFqQztBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxPQUFELENBQVAsR0FBbUIsRUFBcEIsQ0FBUCxHQUFpQyxPQUFqQztBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxPQUFELENBQVAsR0FBbUIsRUFBcEIsQ0FBUCxHQUFpQyxPQUFqQztBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxRQUFELENBQVAsR0FBb0IsRUFBckIsQ0FBUCxHQUFrQyxRQUFsQztBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxRQUFELENBQVAsR0FBb0IsRUFBckIsQ0FBUCxHQUFrQyxRQUFsQztBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxRQUFELENBQVAsR0FBb0IsRUFBckIsQ0FBUCxHQUFrQyxRQUFsQztBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxRQUFELENBQVAsR0FBb0IsRUFBckIsQ0FBUCxHQUFrQyxRQUFsQztBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FB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Q0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE1BQUQsQ0FBVCxHQUFvQixDQUFyQixDQUFULEdBQW1DLE1BQW5DO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE9BQUQsQ0FBVCxHQUFxQixDQUF0QixDQUFULEdBQW9DLE9BQXBDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE1BQUQsQ0FBVCxHQUFvQixFQUFyQixDQUFULEdBQW9DLE1BQXBDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE1BQUQsQ0FBVCxHQUFvQixFQUFyQixDQUFULEdBQW9DLE1BQXBDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE9BQUQsQ0FBVCxHQUFxQixFQUF0QixDQUFULEdBQXFDLE9BQXJDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE1BQUQsQ0FBVCxHQUFvQixFQUFyQixDQUFULEdBQW9DLE1BQXBDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLEtBQUQsQ0FBVCxHQUFtQixFQUFwQixDQUFULEdBQW1DLEtBQW5DO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE9BQUQsQ0FBVCxHQUFxQixFQUF0QixDQUFULEdBQXFDLE9BQXJDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE9BQUQsQ0FBVCxHQUFxQixFQUF0QixDQUFULEdBQXFDLE9BQXJDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE1BQUQsQ0FBVCxHQUFvQixFQUFyQixDQUFULEdBQW9DLE1BQXBDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE9BQUQsQ0FBVCxHQUFxQixFQUF0QixDQUFULEdBQXFDLE9BQXJDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFFBQUQsQ0FBVCxHQUFzQixFQUF2QixDQUFULEdBQXNDLFFBQXRDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE9BQUQsQ0FBVCxHQUFxQixFQUF0QixDQUFULEdBQXFDLE9BQXJDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE9BQUQsQ0FBVCxHQUFxQixFQUF0QixDQUFULEdBQXFDLE9BQXJDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFFBQUQsQ0FBVCxHQUFzQixFQUF2QixDQUFULEdBQXNDLFFBQXRDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE9BQUQsQ0FBVCxHQUFxQixFQUF0QixDQUFULEdBQXFDLE9BQXJDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE1BQUQsQ0FBVCxHQUFvQixFQUFyQixDQUFULEdBQW9DLE1BQXBDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE9BQUQsQ0FBVCxHQUFxQixFQUF0QixDQUFULEdBQXFDLE9BQXJDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFFBQUQsQ0FBVCxHQUFzQixFQUF2QixDQUFULEdBQXNDLFFBQXRDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFFBQUQsQ0FBVCxHQUFzQixFQUF2QixDQUFULEdBQXNDLFFBQXRDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE9BQUQsQ0FBVCxHQUFxQixFQUF0QixDQUFULEdBQXFDLE9BQXJDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFFBQUQsQ0FBVCxHQUFzQixFQUF2QixDQUFULEdBQXNDLFFBQXRDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFNBQUQsQ0FBVCxHQUF1QixFQUF4QixDQUFULEdBQXVDLFNBQXZDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFFBQUQsQ0FBVCxHQUFzQixFQUF2QixDQUFULEdBQXNDLFFBQXRDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFFBQUQsQ0FBVCxHQUFzQixFQUF2QixDQUFULEdBQXNDLFFBQXRDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFNBQUQsQ0FBVCxHQUF1QixFQUF4QixDQUFULEdBQXVDLFNBQXZDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFFBQUQsQ0FBVCxHQUFzQixFQUF2QixDQUFULEdBQXNDLFFBQXRDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE9BQUQsQ0FBVCxHQUFxQixFQUF0QixDQUFULEdBQXFDLE9BQXJDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFVBQUQsQ0FBVCxHQUF3QixFQUF6QixDQUFULEdBQXdDLFVBQXhDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFNBQUQsQ0FBVCxHQUF1QixFQUF4QixDQUFULEdBQXVDLFNBQXZDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFNBQUQsQ0FBVCxHQUF1QixFQUF4QixDQUFULEdBQXVDLFNBQXZDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFFBQUQsQ0FBVCxHQUFzQixFQUF2QixDQUFULEdBQXNDLFFBQXRDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFNBQUQsQ0FBVCxHQUF1QixFQUF4QixDQUFULEdBQXVDLFNBQXZDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFVBQUQsQ0FBVCxHQUF3QixFQUF6QixDQUFULEdBQXdDLFVBQXhDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFNBQUQsQ0FBVCxHQUF1QixFQUF4QixDQUFULEdBQXVDLFNBQXZDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFNBQUQsQ0FBVCxHQUF1QixFQUF4QixDQUFULEdBQXVDLFNBQXZDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFVBQUQsQ0FBVCxHQUF3QixFQUF6QixDQUFULEdBQXdDLFVBQXhDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFNBQUQs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QUZQO0FBR1hrRCxFQUFBQSxlQUFlLEVBQUVBLGVBSE47QUFJWGpELEVBQUFBLE9BQU8sRUFBRUEsT0FKRTtBQUtYQyxFQUFBQSxPQUFPLEVBQUVBLE9BTEU7QUFNWEMsRUFBQUEsU0FBUyxFQUFFQSxTQU5BO0FBT1hTLEVBQUFBLFVBQVUsRUFBRUEsVUFQRDtBQVFYL0csRUFBQUEsV0FBVyxFQUFFQSxXQVJGO0FBU1g4RixFQUFBQSxjQUFjLEVBQUVBLGNBVEw7QUFVWGpDLEVBQUFBLGNBQWMsRUFBRUEsY0FWTDtBQVdYbUMsRUFBQUEsY0FBYyxFQUFFQTtBQVhMLENBQWY7QUFjQWlFLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQkYsUUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogZW51bXNcbiAqL1xuY29uc3QgZW51bXMgPSB7XG4gIC8vIGJ1ZmZlciB1c2FnZVxuICBVU0FHRV9TVEFUSUM6IDM1MDQ0LCAgLy8gZ2wuU1RBVElDX0RSQVdcbiAgVVNBR0VfRFlOQU1JQzogMzUwNDgsIC8vIGdsLkRZTkFNSUNfRFJBV1xuICBVU0FHRV9TVFJFQU06IDM1MDQwLCAgLy8gZ2wuU1RSRUFNX0RSQVdcblxuICAvLyBpbmRleCBidWZmZXIgZm9ybWF0XG4gIElOREVYX0ZNVF9VSU5UODogNTEyMSwgIC8vIGdsLlVOU0lHTkVEX0JZVEVcbiAgSU5ERVhfRk1UX1VJTlQxNjogNTEyMywgLy8gZ2wuVU5TSUdORURfU0hPUlRcbiAgSU5ERVhfRk1UX1VJTlQzMjogNTEyNSwgLy8gZ2wuVU5TSUdORURfSU5UIChPRVNfZWxlbWVudF9pbmRleF91aW50KVxuXG4gIC8vIHZlcnRleCBhdHRyaWJ1dGUgc2VtYW50aWNcbiAgQVRUUl9QT1NJVElPTjogJ2FfcG9zaXRpb24nLFxuICBBVFRSX05PUk1BTDogJ2Ffbm9ybWFsJyxcbiAgQVRUUl9UQU5HRU5UOiAnYV90YW5nZW50JyxcbiAgQVRUUl9CSVRBTkdFTlQ6ICdhX2JpdGFuZ2VudCcsXG4gIEFUVFJfV0VJR0hUUzogJ2Ffd2VpZ2h0cycsXG4gIEFUVFJfSk9JTlRTOiAnYV9qb2ludHMnLFxuICBBVFRSX0NPTE9SOiAnYV9jb2xvcicsXG4gIEFUVFJfQ09MT1IwOiAnYV9jb2xvcjAnLFxuICBBVFRSX0NPTE9SMTogJ2FfY29sb3IxJyxcbiAgQVRUUl9VVjogJ2FfdXYnLFxuICBBVFRSX1VWMDogJ2FfdXYwJyxcbiAgQVRUUl9VVjE6ICdhX3V2MScsXG4gIEFUVFJfVVYyOiAnYV91djInLFxuICBBVFRSX1VWMzogJ2FfdXYzJyxcbiAgQVRUUl9VVjQ6ICdhX3V2NCcsXG4gIEFUVFJfVVY1OiAnYV91djUnLFxuICBBVFRSX1VWNjogJ2FfdXY2JyxcbiAgQVRUUl9VVjc6ICdhX3V2NycsXG4gIEFUVFJfVEVYX0NPT1JEOiAnYV90ZXhDb29yZCcsXG4gIEFUVFJfVEVYX0NPT1JEMTogJ2FfdGV4Q29vcmQxJyxcbiAgQVRUUl9URVhfQ09PUkQyOiAnYV90ZXhDb29yZDInLFxuICBBVFRSX1RFWF9DT09SRDM6ICdhX3RleENvb3JkMycsXG4gIEFUVFJfVEVYX0NPT1JENDogJ2FfdGV4Q29vcmQ0JyxcbiAgQVRUUl9URVhfQ09PUkQ1OiAnYV90ZXhDb29yZDUnLFxuICBBVFRSX1RFWF9DT09SRDY6ICdhX3RleENvb3JkNicsXG4gIEFUVFJfVEVYX0NPT1JENzogJ2FfdGV4Q29vcmQ3JyxcbiAgQVRUUl9URVhfQ09PUkQ4OiAnYV90ZXhDb29yZDgnLFxuXG5cbiAgLy8gdmVydGV4IGF0dHJpYnV0ZSB0eXBlXG4gIEFUVFJfVFlQRV9JTlQ4OiA1MTIwLCAgICAvLyBnbC5CWVRFXG4gIEFUVFJfVFlQRV9VSU5UODogNTEyMSwgICAvLyBnbC5VTlNJR05FRF9CWVRFXG4gIEFUVFJfVFlQRV9JTlQxNjogNTEyMiwgICAvLyBnbC5TSE9SVFxuICBBVFRSX1RZUEVfVUlOVDE2OiA1MTIzLCAgLy8gZ2wuVU5TSUdORURfU0hPUlRcbiAgQVRUUl9UWVBFX0lOVDMyOiA1MTI0LCAgIC8vIGdsLklOVFxuICBBVFRSX1RZUEVfVUlOVDMyOiA1MTI1LCAgLy8gZ2wuVU5TSUdORURfSU5UXG4gIEFUVFJfVFlQRV9GTE9BVDMyOiA1MTI2LCAvLyBnbC5GTE9BVFxuXG4gIC8vIHRleHR1cmUgZmlsdGVyXG4gIEZJTFRFUl9ORUFSRVNUOiAwLFxuICBGSUxURVJfTElORUFSOiAxLFxuXG4gIC8vIHRleHR1cmUgd3JhcCBtb2RlXG4gIFdSQVBfUkVQRUFUOiAxMDQ5NywgLy8gZ2wuUkVQRUFUXG4gIFdSQVBfQ0xBTVA6IDMzMDcxLCAgLy8gZ2wuQ0xBTVBfVE9fRURHRVxuICBXUkFQX01JUlJPUjogMzM2NDgsIC8vIGdsLk1JUlJPUkVEX1JFUEVBVFxuXG4gIC8vIHRleHR1cmUgZm9ybWF0XG4gIC8vIGNvbXByZXNzIGZvcm1hdHNcbiAgVEVYVFVSRV9GTVRfUkdCX0RYVDE6IDAsXG4gIFRFWFRVUkVfRk1UX1JHQkFfRFhUMTogMSxcbiAgVEVYVFVSRV9GTVRfUkdCQV9EWFQzOiAyLFxuICBURVhUVVJFX0ZNVF9SR0JBX0RYVDU6IDMsXG4gIFRFWFRVUkVfRk1UX1JHQl9FVEMxOiA0LFxuICBURVhUVVJFX0ZNVF9SR0JfUFZSVENfMkJQUFYxOiA1LFxuICBURVhUVVJFX0ZNVF9SR0JBX1BWUlRDXzJCUFBWMTogNixcbiAgVEVYVFVSRV9GTVRfUkdCX1BWUlRDXzRCUFBWMTogNyxcbiAgVEVYVFVSRV9GTVRfUkdCQV9QVlJUQ180QlBQVjE6IDgsXG5cbiAgLy8gbm9ybWFsIGZvcm1hdHNcbiAgVEVYVFVSRV9GTVRfQTg6IDksXG4gIFRFWFRVUkVfRk1UX0w4OiAxMCxcbiAgVEVYVFVSRV9GTVRfTDhfQTg6IDExLFxuICBURVhUVVJFX0ZNVF9SNV9HNl9CNTogMTIsXG4gIFRFWFRVUkVfRk1UX1I1X0c1X0I1X0ExOiAxMyxcbiAgVEVYVFVSRV9GTVRfUjRfRzRfQjRfQTQ6IDE0LFxuICBURVhUVVJFX0ZNVF9SR0I4OiAxNSxcbiAgVEVYVFVSRV9GTVRfUkdCQTg6IDE2LFxuICBURVhUVVJFX0ZNVF9SR0IxNkY6IDE3LFxuICBURVhUVVJFX0ZNVF9SR0JBMTZGOiAxOCxcbiAgVEVYVFVSRV9GTVRfUkdCMzJGOiAxOSxcbiAgVEVYVFVSRV9GTVRfUkdCQTMyRjogMjAsXG4gIFRFWFRVUkVfRk1UX1IzMkY6IDIxLFxuICBURVhUVVJFX0ZNVF8xMTExMTBGOiAyMixcbiAgVEVYVFVSRV9GTVRfU1JHQjogMjMsXG4gIFRFWFRVUkVfRk1UX1NSR0JBOiAyNCxcblxuICAvLyBkZXB0aCBmb3JtYXRzXG4gIFRFWFRVUkVfRk1UX0QxNjogMjUsXG4gIFRFWFRVUkVfRk1UX0QzMjogMjYsXG4gIFRFWFRVUkVfRk1UX0QyNFM4OiAyNyxcblxuICAvLyBldGMyIGZvcm1hdFxuICBURVhUVVJFX0ZNVF9SR0JfRVRDMjogMjgsXG4gIFRFWFRVUkVfRk1UX1JHQkFfRVRDMjogMjksXG5cbiAgLy8gZGVwdGggYW5kIHN0ZW5jaWwgZnVuY3Rpb25cbiAgRFNfRlVOQ19ORVZFUjogNTEyLCAgICAvLyBnbC5ORVZFUlxuICBEU19GVU5DX0xFU1M6IDUxMywgICAgIC8vIGdsLkxFU1NcbiAgRFNfRlVOQ19FUVVBTDogNTE0LCAgICAvLyBnbC5FUVVBTFxuICBEU19GVU5DX0xFUVVBTDogNTE1LCAgIC8vIGdsLkxFUVVBTFxuICBEU19GVU5DX0dSRUFURVI6IDUxNiwgIC8vIGdsLkdSRUFURVJcbiAgRFNfRlVOQ19OT1RFUVVBTDogNTE3LCAvLyBnbC5OT1RFUVVBTFxuICBEU19GVU5DX0dFUVVBTDogNTE4LCAgIC8vIGdsLkdFUVVBTFxuICBEU19GVU5DX0FMV0FZUzogNTE5LCAgIC8vIGdsLkFMV0FZU1xuXG4gIC8vIHJlbmRlci1idWZmZXIgZm9ybWF0XG4gIFJCX0ZNVF9SR0JBNDogMzI4NTQsICAgIC8vIGdsLlJHQkE0XG4gIFJCX0ZNVF9SR0I1X0ExOiAzMjg1NSwgIC8vIGdsLlJHQjVfQTFcbiAgUkJfRk1UX1JHQjU2NTogMzYxOTQsICAgLy8gZ2wuUkdCNTY1XG4gIFJCX0ZNVF9EMTY6IDMzMTg5LCAgICAgIC8vIGdsLkRFUFRIX0NPTVBPTkVOVDE2XG4gIFJCX0ZNVF9TODogMzYxNjgsICAgICAgIC8vIGdsLlNURU5DSUxfSU5ERVg4XG4gIFJCX0ZNVF9EMjRTODogMzQwNDEsICAgIC8vIGdsLkRFUFRIX1NURU5DSUxcblxuICAvLyBibGVuZC1lcXVhdGlvblxuICBCTEVORF9GVU5DX0FERDogMzI3NzQsICAgICAgICAgICAgICAvLyBnbC5GVU5DX0FERFxuICBCTEVORF9GVU5DX1NVQlRSQUNUOiAzMjc3OCwgICAgICAgICAvLyBnbC5GVU5DX1NVQlRSQUNUXG4gIEJMRU5EX0ZVTkNfUkVWRVJTRV9TVUJUUkFDVDogMzI3NzksIC8vIGdsLkZVTkNfUkVWRVJTRV9TVUJUUkFDVFxuXG4gIC8vIGJsZW5kXG4gIEJMRU5EX1pFUk86IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnbC5aRVJPXG4gIEJMRU5EX09ORTogMSwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnbC5PTkVcbiAgQkxFTkRfU1JDX0NPTE9SOiA3NjgsICAgICAgICAgICAgICAgICAgIC8vIGdsLlNSQ19DT0xPUlxuICBCTEVORF9PTkVfTUlOVVNfU1JDX0NPTE9SOiA3NjksICAgICAgICAgLy8gZ2wuT05FX01JTlVTX1NSQ19DT0xPUlxuICBCTEVORF9EU1RfQ09MT1I6IDc3NCwgICAgICAgICAgICAgICAgICAgLy8gZ2wuRFNUX0NPTE9SXG4gIEJMRU5EX09ORV9NSU5VU19EU1RfQ09MT1I6IDc3NSwgICAgICAgICAvLyBnbC5PTkVfTUlOVVNfRFNUX0NPTE9SXG4gIEJMRU5EX1NSQ19BTFBIQTogNzcwLCAgICAgICAgICAgICAgICAgICAvLyBnbC5TUkNfQUxQSEFcbiAgQkxFTkRfT05FX01JTlVTX1NSQ19BTFBIQTogNzcxLCAgICAgICAgIC8vIGdsLk9ORV9NSU5VU19TUkNfQUxQSEFcbiAgQkxFTkRfRFNUX0FMUEhBOiA3NzIsICAgICAgICAgICAgICAgICAgIC8vIGdsLkRTVF9BTFBIQVxuICBCTEVORF9PTkVfTUlOVVNfRFNUX0FMUEhBOiA3NzMsICAgICAgICAgLy8gZ2wuT05FX01JTlVTX0RTVF9BTFBIQVxuICBCTEVORF9DT05TVEFOVF9DT0xPUjogMzI3NjksICAgICAgICAgICAgLy8gZ2wuQ09OU1RBTlRfQ09MT1JcbiAgQkxFTkRfT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SOiAzMjc3MCwgIC8vIGdsLk9ORV9NSU5VU19DT05TVEFOVF9DT0xPUlxuICBCTEVORF9DT05TVEFOVF9BTFBIQTogMzI3NzEsICAgICAgICAgICAgLy8gZ2wuQ09OU1RBTlRfQUxQSEFcbiAgQkxFTkRfT05FX01JTlVTX0NPTlNUQU5UX0FMUEhBOiAzMjc3MiwgIC8vIGdsLk9ORV9NSU5VU19DT05TVEFOVF9BTFBIQVxuICBCTEVORF9TUkNfQUxQSEFfU0FUVVJBVEU6IDc3NiwgICAgICAgICAgLy8gZ2wuU1JDX0FMUEhBX1NBVFVSQVRFXG5cbiAgLy8gc3RlbmNpbCBvcGVyYXRpb25cbiAgU1RFTkNJTF9ESVNBQkxFOiAwLCAgICAgICAgICAgICAvLyBkaXNhYmxlIHN0ZW5jaWxcbiAgU1RFTkNJTF9FTkFCTEU6IDEsICAgICAgICAgICAgICAvLyBlbmFibGUgc3RlbmNpbFxuICBTVEVOQ0lMX0lOSEVSSVQ6IDIsICAgICAgICAgICAgIC8vIGluaGVyaXQgc3RlbmNpbCBzdGF0ZXNcblxuICBTVEVOQ0lMX09QX0tFRVA6IDc2ODAsICAgICAgICAgIC8vIGdsLktFRVBcbiAgU1RFTkNJTF9PUF9aRVJPOiAwLCAgICAgICAgICAgICAvLyBnbC5aRVJPXG4gIFNURU5DSUxfT1BfUkVQTEFDRTogNzY4MSwgICAgICAgLy8gZ2wuUkVQTEFDRVxuICBTVEVOQ0lMX09QX0lOQ1I6IDc2ODIsICAgICAgICAgIC8vIGdsLklOQ1JcbiAgU1RFTkNJTF9PUF9JTkNSX1dSQVA6IDM0MDU1LCAgICAvLyBnbC5JTkNSX1dSQVBcbiAgU1RFTkNJTF9PUF9ERUNSOiA3NjgzLCAgICAgICAgICAvLyBnbC5ERUNSXG4gIFNURU5DSUxfT1BfREVDUl9XUkFQOiAzNDA1NiwgICAgLy8gZ2wuREVDUl9XUkFQXG4gIFNURU5DSUxfT1BfSU5WRVJUOiA1Mzg2LCAgICAgICAgLy8gZ2wuSU5WRVJUXG5cbiAgLy8gY3VsbFxuICBDVUxMX05PTkU6IDAsXG4gIENVTExfRlJPTlQ6IDEwMjgsXG4gIENVTExfQkFDSzogMTAyOSxcbiAgQ1VMTF9GUk9OVF9BTkRfQkFDSzogMTAzMixcblxuICAvLyBwcmltaXRpdmUgdHlwZVxuICBQVF9QT0lOVFM6IDAsICAgICAgICAgLy8gZ2wuUE9JTlRTXG4gIFBUX0xJTkVTOiAxLCAgICAgICAgICAvLyBnbC5MSU5FU1xuICBQVF9MSU5FX0xPT1A6IDIsICAgICAgLy8gZ2wuTElORV9MT09QXG4gIFBUX0xJTkVfU1RSSVA6IDMsICAgICAvLyBnbC5MSU5FX1NUUklQXG4gIFBUX1RSSUFOR0xFUzogNCwgICAgICAvLyBnbC5UUklBTkdMRVNcbiAgUFRfVFJJQU5HTEVfU1RSSVA6IDUsIC8vIGdsLlRSSUFOR0xFX1NUUklQXG4gIFBUX1RSSUFOR0xFX0ZBTjogNiwgICAvLyBnbC5UUklBTkdMRV9GQU5cbn07XG5cbmxldCBSZW5kZXJRdWV1ZSA9IHtcbiAgICBPUEFRVUU6IDAsXG4gICAgVFJBTlNQQVJFTlQ6IDEsXG4gICAgT1ZFUkxBWTogMlxufTtcblxuLyoqXG4gKiBKUyBJbXBsZW1lbnRhdGlvbiBvZiBNdXJtdXJIYXNoMlxuICogXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86Z2FyeS5jb3VydEBnbWFpbC5jb21cIj5HYXJ5IENvdXJ0PC9hPlxuICogQHNlZSBodHRwOi8vZ2l0aHViLmNvbS9nYXJ5Y291cnQvbXVybXVyaGFzaC1qc1xuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmFhcHBsZWJ5QGdtYWlsLmNvbVwiPkF1c3RpbiBBcHBsZWJ5PC9hPlxuICogQHNlZSBodHRwOi8vc2l0ZXMuZ29vZ2xlLmNvbS9zaXRlL211cm11cmhhc2gvXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgQVNDSUkgb25seVxuICogQHBhcmFtIHtudW1iZXJ9IHNlZWQgUG9zaXRpdmUgaW50ZWdlciBvbmx5XG4gKiBAcmV0dXJuIHtudW1iZXJ9IDMyLWJpdCBwb3NpdGl2ZSBpbnRlZ2VyIGhhc2hcbiAqL1xuXG5mdW5jdGlvbiBtdXJtdXJoYXNoMl8zMl9nYyhzdHIsIHNlZWQpIHtcbiAgdmFyXG4gICAgbCA9IHN0ci5sZW5ndGgsXG4gICAgaCA9IHNlZWQgXiBsLFxuICAgIGkgPSAwLFxuICAgIGs7XG4gIFxuICB3aGlsZSAobCA+PSA0KSB7XG4gIFx0ayA9IFxuICBcdCAgKChzdHIuY2hhckNvZGVBdChpKSAmIDB4ZmYpKSB8XG4gIFx0ICAoKHN0ci5jaGFyQ29kZUF0KCsraSkgJiAweGZmKSA8PCA4KSB8XG4gIFx0ICAoKHN0ci5jaGFyQ29kZUF0KCsraSkgJiAweGZmKSA8PCAxNikgfFxuICBcdCAgKChzdHIuY2hhckNvZGVBdCgrK2kpICYgMHhmZikgPDwgMjQpO1xuICAgIFxuICAgIGsgPSAoKChrICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUpICsgKCgoKGsgPj4+IDE2KSAqIDB4NWJkMWU5OTUpICYgMHhmZmZmKSA8PCAxNikpO1xuICAgIGsgXj0gayA+Pj4gMjQ7XG4gICAgayA9ICgoKGsgJiAweGZmZmYpICogMHg1YmQxZTk5NSkgKyAoKCgoayA+Pj4gMTYpICogMHg1YmQxZTk5NSkgJiAweGZmZmYpIDw8IDE2KSk7XG5cblx0aCA9ICgoKGggJiAweGZmZmYpICogMHg1YmQxZTk5NSkgKyAoKCgoaCA+Pj4gMTYpICogMHg1YmQxZTk5NSkgJiAweGZmZmYpIDw8IDE2KSkgXiBrO1xuXG4gICAgbCAtPSA0O1xuICAgICsraTtcbiAgfVxuICBcbiAgc3dpdGNoIChsKSB7XG4gIGNhc2UgMzogaCBePSAoc3RyLmNoYXJDb2RlQXQoaSArIDIpICYgMHhmZikgPDwgMTY7XG4gIGNhc2UgMjogaCBePSAoc3RyLmNoYXJDb2RlQXQoaSArIDEpICYgMHhmZikgPDwgODtcbiAgY2FzZSAxOiBoIF49IChzdHIuY2hhckNvZGVBdChpKSAmIDB4ZmYpO1xuICAgICAgICAgIGggPSAoKChoICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUpICsgKCgoKGggPj4+IDE2KSAqIDB4NWJkMWU5OTUpICYgMHhmZmZmKSA8PCAxNikpO1xuICB9XG5cbiAgaCBePSBoID4+PiAxMztcbiAgaCA9ICgoKGggJiAweGZmZmYpICogMHg1YmQxZTk5NSkgKyAoKCgoaCA+Pj4gMTYpICogMHg1YmQxZTk5NSkgJiAweGZmZmYpIDw8IDE2KSk7XG4gIGggXj0gaCA+Pj4gMTU7XG5cbiAgcmV0dXJuIGggPj4+IDA7XG59XG5cbi8vIEV4dGVuc2lvbnNcbnZhciBXZWJHTEVYVDtcbihmdW5jdGlvbiAoV2ViR0xFWFQpIHtcbiAgICBXZWJHTEVYVFtXZWJHTEVYVFtcIkNPTVBSRVNTRURfUkdCX1MzVENfRFhUMV9FWFRcIl0gPSAzMzc3Nl0gPSBcIkNPTVBSRVNTRURfUkdCX1MzVENfRFhUMV9FWFRcIjtcbiAgICBXZWJHTEVYVFtXZWJHTEVYVFtcIkNPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDFfRVhUXCJdID0gMzM3NzddID0gXCJDT01QUkVTU0VEX1JHQkFfUzNUQ19EWFQxX0VYVFwiO1xuICAgIFdlYkdMRVhUW1dlYkdMRVhUW1wiQ09NUFJFU1NFRF9SR0JBX1MzVENfRFhUM19FWFRcIl0gPSAzMzc3OF0gPSBcIkNPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDNfRVhUXCI7XG4gICAgV2ViR0xFWFRbV2ViR0xFWFRbXCJDT01QUkVTU0VEX1JHQkFfUzNUQ19EWFQ1X0VYVFwiXSA9IDMzNzc5XSA9IFwiQ09NUFJFU1NFRF9SR0JBX1MzVENfRFhUNV9FWFRcIjtcbiAgICBXZWJHTEVYVFtXZWJHTEVYVFtcIkNPTVBSRVNTRURfU1JHQl9TM1RDX0RYVDFfRVhUXCJdID0gMzU5MTZdID0gXCJDT01QUkVTU0VEX1NSR0JfUzNUQ19EWFQxX0VYVFwiO1xuICAgIFdlYkdMRVhUW1dlYkdMRVhUW1wiQ09NUFJFU1NFRF9TUkdCX0FMUEhBX1MzVENfRFhUMV9FWFRcIl0gPSAzNTkxN10gPSBcIkNPTVBSRVNTRURfU1JHQl9BTFBIQV9TM1RDX0RYVDFfRVhUXCI7XG4gICAgV2ViR0xFWFRbV2ViR0xFWFRbXCJDT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQzX0VYVFwiXSA9IDM1OTE4XSA9IFwiQ09NUFJFU1NFRF9TUkdCX0FMUEhBX1MzVENfRFhUM19FWFRcIjtcbiAgICBXZWJHTEVYVFtXZWJHTEVYVFtcIkNPTVBSRVNTRURfU1JHQl9BTFBIQV9TM1RDX0RYVDVfRVhUXCJdID0gMzU5MTldID0gXCJDT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQ1X0VYVFwiO1xuICAgIFdlYkdMRVhUW1dlYkdMRVhUW1wiQ09NUFJFU1NFRF9SR0JfUFZSVENfNEJQUFYxX0lNR1wiXSA9IDM1ODQwXSA9IFwiQ09NUFJFU1NFRF9SR0JfUFZSVENfNEJQUFYxX0lNR1wiO1xuICAgIFdlYkdMRVhUW1dlYkdMRVhUW1wiQ09NUFJFU1NFRF9SR0JfUFZSVENfMkJQUFYxX0lNR1wiXSA9IDM1ODQxXSA9IFwiQ09NUFJFU1NFRF9SR0JfUFZSVENfMkJQUFYxX0lNR1wiO1xuICAgIFdlYkdMRVhUW1dlYkdMRVhUW1wiQ09NUFJFU1NFRF9SR0JBX1BWUlRDXzRCUFBWMV9JTUdcIl0gPSAzNTg0Ml0gPSBcIkNPTVBSRVNTRURfUkdCQV9QVlJUQ180QlBQVjFfSU1HXCI7XG4gICAgV2ViR0xFWFRbV2ViR0xFWFRbXCJDT01QUkVTU0VEX1JHQkFfUFZSVENfMkJQUFYxX0lNR1wiXSA9IDM1ODQzXSA9IFwiQ09NUFJFU1NFRF9SR0JBX1BWUlRDXzJCUFBWMV9JTUdcIjtcbiAgICBXZWJHTEVYVFtXZWJHTEVYVFtcIkNPTVBSRVNTRURfUkdCX0VUQzFfV0VCR0xcIl0gPSAzNjE5Nl0gPSBcIkNPTVBSRVNTRURfUkdCX0VUQzFfV0VCR0xcIjtcbn0pKFdlYkdMRVhUIHx8IChXZWJHTEVYVCA9IHt9KSk7XG52YXIgR0ZYT2JqZWN0VHlwZTtcbihmdW5jdGlvbiAoR0ZYT2JqZWN0VHlwZSkge1xuICAgIEdGWE9iamVjdFR5cGVbR0ZYT2JqZWN0VHlwZVtcIlVOS05PV05cIl0gPSAwXSA9IFwiVU5LTk9XTlwiO1xuICAgIEdGWE9iamVjdFR5cGVbR0ZYT2JqZWN0VHlwZVtcIkJVRkZFUlwiXSA9IDFdID0gXCJCVUZGRVJcIjtcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJURVhUVVJFXCJdID0gMl0gPSBcIlRFWFRVUkVcIjtcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJURVhUVVJFX1ZJRVdcIl0gPSAzXSA9IFwiVEVYVFVSRV9WSUVXXCI7XG4gICAgR0ZYT2JqZWN0VHlwZVtHRlhPYmplY3RUeXBlW1wiUkVOREVSX1BBU1NcIl0gPSA0XSA9IFwiUkVOREVSX1BBU1NcIjtcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJGUkFNRUJVRkZFUlwiXSA9IDVdID0gXCJGUkFNRUJVRkZFUlwiO1xuICAgIEdGWE9iamVjdFR5cGVbR0ZYT2JqZWN0VHlwZVtcIlNBTVBMRVJcIl0gPSA2XSA9IFwiU0FNUExFUlwiO1xuICAgIEdGWE9iamVjdFR5cGVbR0ZYT2JqZWN0VHlwZVtcIlNIQURFUlwiXSA9IDddID0gXCJTSEFERVJcIjtcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJQSVBFTElORV9MQVlPVVRcIl0gPSA4XSA9IFwiUElQRUxJTkVfTEFZT1VUXCI7XG4gICAgR0ZYT2JqZWN0VHlwZVtHRlhPYmplY3RUeXBlW1wiUElQRUxJTkVfU1RBVEVcIl0gPSA5XSA9IFwiUElQRUxJTkVfU1RBVEVcIjtcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJCSU5ESU5HX0xBWU9VVFwiXSA9IDEwXSA9IFwiQklORElOR19MQVlPVVRcIjtcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJJTlBVVF9BU1NFTUJMRVJcIl0gPSAxMV0gPSBcIklOUFVUX0FTU0VNQkxFUlwiO1xuICAgIEdGWE9iamVjdFR5cGVbR0ZYT2JqZWN0VHlwZVtcIkNPTU1BTkRfQUxMT0NBVE9SXCJdID0gMTJdID0gXCJDT01NQU5EX0FMTE9DQVRPUlwiO1xuICAgIEdGWE9iamVjdFR5cGVbR0ZYT2JqZWN0VHlwZVtcIkNPTU1BTkRfQlVGRkVSXCJdID0gMTNdID0gXCJDT01NQU5EX0JVRkZFUlwiO1xuICAgIEdGWE9iamVjdFR5cGVbR0ZYT2JqZWN0VHlwZVtcIlFVRVVFXCJdID0gMTRdID0gXCJRVUVVRVwiO1xuICAgIEdGWE9iamVjdFR5cGVbR0ZYT2JqZWN0VHlwZVtcIldJTkRPV1wiXSA9IDE1XSA9IFwiV0lORE9XXCI7XG59KShHRlhPYmplY3RUeXBlIHx8IChHRlhPYmplY3RUeXBlID0ge30pKTtcbnZhciBHRlhTdGF0dXM7XG4oZnVuY3Rpb24gKEdGWFN0YXR1cykge1xuICAgIEdGWFN0YXR1c1tHRlhTdGF0dXNbXCJVTlJFQURZXCJdID0gMF0gPSBcIlVOUkVBRFlcIjtcbiAgICBHRlhTdGF0dXNbR0ZYU3RhdHVzW1wiRkFJTEVEXCJdID0gMV0gPSBcIkZBSUxFRFwiO1xuICAgIEdGWFN0YXR1c1tHRlhTdGF0dXNbXCJTVUNDRVNTXCJdID0gMl0gPSBcIlNVQ0NFU1NcIjtcbn0pKEdGWFN0YXR1cyB8fCAoR0ZYU3RhdHVzID0ge30pKTtcbnZhciBHRlhPYmplY3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR0ZYT2JqZWN0KGdmeFR5cGUpIHtcbiAgICAgICAgdGhpcy5fZ2Z4VHlwZSA9IEdGWE9iamVjdFR5cGUuVU5LTk9XTjtcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gR0ZYU3RhdHVzLlVOUkVBRFk7XG4gICAgICAgIHRoaXMuX2dmeFR5cGUgPSBnZnhUeXBlO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR0ZYT2JqZWN0LnByb3RvdHlwZSwgXCJnZnhUeXBlXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2Z4VHlwZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHRlhPYmplY3QucHJvdG90eXBlLCBcInN0YXR1c1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXR1cztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBHRlhPYmplY3Q7XG59KCkpO1xudmFyIEdGWEF0dHJpYnV0ZU5hbWU7XG4oZnVuY3Rpb24gKEdGWEF0dHJpYnV0ZU5hbWUpIHtcbiAgICBHRlhBdHRyaWJ1dGVOYW1lW1wiQVRUUl9QT1NJVElPTlwiXSA9IFwiYV9wb3NpdGlvblwiO1xuICAgIEdGWEF0dHJpYnV0ZU5hbWVbXCJBVFRSX05PUk1BTFwiXSA9IFwiYV9ub3JtYWxcIjtcbiAgICBHRlhBdHRyaWJ1dGVOYW1lW1wiQVRUUl9UQU5HRU5UXCJdID0gXCJhX3RhbmdlbnRcIjtcbiAgICBHRlhBdHRyaWJ1dGVOYW1lW1wiQVRUUl9CSVRBTkdFTlRcIl0gPSBcImFfYml0YW5nZW50XCI7XG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfV0VJR0hUU1wiXSA9IFwiYV93ZWlnaHRzXCI7XG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfSk9JTlRTXCJdID0gXCJhX2pvaW50c1wiO1xuICAgIEdGWEF0dHJpYnV0ZU5hbWVbXCJBVFRSX0NPTE9SXCJdID0gXCJhX2NvbG9yXCI7XG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfQ09MT1IxXCJdID0gXCJhX2NvbG9yMVwiO1xuICAgIEdGWEF0dHJpYnV0ZU5hbWVbXCJBVFRSX0NPTE9SMlwiXSA9IFwiYV9jb2xvcjJcIjtcbiAgICBHRlhBdHRyaWJ1dGVOYW1lW1wiQVRUUl9URVhfQ09PUkRcIl0gPSBcImFfdGV4Q29vcmRcIjtcbiAgICBHRlhBdHRyaWJ1dGVOYW1lW1wiQVRUUl9URVhfQ09PUkQxXCJdID0gXCJhX3RleENvb3JkMVwiO1xuICAgIEdGWEF0dHJpYnV0ZU5hbWVbXCJBVFRSX1RFWF9DT09SRDJcIl0gPSBcImFfdGV4Q29vcmQyXCI7XG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfVEVYX0NPT1JEM1wiXSA9IFwiYV90ZXhDb29yZDNcIjtcbiAgICBHRlhBdHRyaWJ1dGVOYW1lW1wiQVRUUl9URVhfQ09PUkQ0XCJdID0gXCJhX3RleENvb3JkNFwiO1xuICAgIEdGWEF0dHJpYnV0ZU5hbWVbXCJBVFRSX1RFWF9DT09SRDVcIl0gPSBcImFfdGV4Q29vcmQ1XCI7XG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfVEVYX0NPT1JENlwiXSA9IFwiYV90ZXhDb29yZDZcIjtcbiAgICBHRlhBdHRyaWJ1dGVOYW1lW1wiQVRUUl9URVhfQ09PUkQ3XCJdID0gXCJhX3RleENvb3JkN1wiO1xuICAgIEdGWEF0dHJpYnV0ZU5hbWVbXCJBVFRSX1RFWF9DT09SRDhcIl0gPSBcImFfdGV4Q29vcmQ4XCI7XG59KShHRlhBdHRyaWJ1dGVOYW1lIHx8IChHRlhBdHRyaWJ1dGVOYW1lID0ge30pKTtcbnZhciBHRlhUeXBlO1xuKGZ1bmN0aW9uIChHRlhUeXBlKSB7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiVU5LTk9XTlwiXSA9IDBdID0gXCJVTktOT1dOXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiQk9PTFwiXSA9IDFdID0gXCJCT09MXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiQk9PTDJcIl0gPSAyXSA9IFwiQk9PTDJcIjtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJCT09MM1wiXSA9IDNdID0gXCJCT09MM1wiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIkJPT0w0XCJdID0gNF0gPSBcIkJPT0w0XCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiSU5UXCJdID0gNV0gPSBcIklOVFwiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIklOVDJcIl0gPSA2XSA9IFwiSU5UMlwiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIklOVDNcIl0gPSA3XSA9IFwiSU5UM1wiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIklOVDRcIl0gPSA4XSA9IFwiSU5UNFwiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIlVJTlRcIl0gPSA5XSA9IFwiVUlOVFwiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIlVJTlQyXCJdID0gMTBdID0gXCJVSU5UMlwiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIlVJTlQzXCJdID0gMTFdID0gXCJVSU5UM1wiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIlVJTlQ0XCJdID0gMTJdID0gXCJVSU5UNFwiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIkZMT0FUXCJdID0gMTNdID0gXCJGTE9BVFwiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIkZMT0FUMlwiXSA9IDE0XSA9IFwiRkxPQVQyXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiRkxPQVQzXCJdID0gMTVdID0gXCJGTE9BVDNcIjtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJGTE9BVDRcIl0gPSAxNl0gPSBcIkZMT0FUNFwiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIkNPTE9SNFwiXSA9IDE3XSA9IFwiQ09MT1I0XCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiTUFUMlwiXSA9IDE4XSA9IFwiTUFUMlwiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIk1BVDJYM1wiXSA9IDE5XSA9IFwiTUFUMlgzXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiTUFUMlg0XCJdID0gMjBdID0gXCJNQVQyWDRcIjtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJNQVQzWDJcIl0gPSAyMV0gPSBcIk1BVDNYMlwiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIk1BVDNcIl0gPSAyMl0gPSBcIk1BVDNcIjtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJNQVQzWDRcIl0gPSAyM10gPSBcIk1BVDNYNFwiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIk1BVDRYMlwiXSA9IDI0XSA9IFwiTUFUNFgyXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiTUFUNFgzXCJdID0gMjVdID0gXCJNQVQ0WDNcIjtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJNQVQ0XCJdID0gMjZdID0gXCJNQVQ0XCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiU0FNUExFUjFEXCJdID0gMjddID0gXCJTQU1QTEVSMURcIjtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJTQU1QTEVSMURfQVJSQVlcIl0gPSAyOF0gPSBcIlNBTVBMRVIxRF9BUlJBWVwiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIlNBTVBMRVIyRFwiXSA9IDI5XSA9IFwiU0FNUExFUjJEXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiU0FNUExFUjJEX0FSUkFZXCJdID0gMzBdID0gXCJTQU1QTEVSMkRfQVJSQVlcIjtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJTQU1QTEVSM0RcIl0gPSAzMV0gPSBcIlNBTVBMRVIzRFwiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIlNBTVBMRVJfQ1VCRVwiXSA9IDMyXSA9IFwiU0FNUExFUl9DVUJFXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiQ09VTlRcIl0gPSAzM10gPSBcIkNPVU5UXCI7XG59KShHRlhUeXBlIHx8IChHRlhUeXBlID0ge30pKTtcbnZhciBHRlhGb3JtYXQ7XG4oZnVuY3Rpb24gKEdGWEZvcm1hdCkge1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJVTktOT1dOXCJdID0gMF0gPSBcIlVOS05PV05cIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiQThcIl0gPSAxXSA9IFwiQThcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiTDhcIl0gPSAyXSA9IFwiTDhcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiTEE4XCJdID0gM10gPSBcIkxBOFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSOFwiXSA9IDRdID0gXCJSOFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSOFNOXCJdID0gNV0gPSBcIlI4U05cIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUjhVSVwiXSA9IDZdID0gXCJSOFVJXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlI4SVwiXSA9IDddID0gXCJSOElcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUjE2RlwiXSA9IDhdID0gXCJSMTZGXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlIxNlVJXCJdID0gOV0gPSBcIlIxNlVJXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlIxNklcIl0gPSAxMF0gPSBcIlIxNklcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUjMyRlwiXSA9IDExXSA9IFwiUjMyRlwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSMzJVSVwiXSA9IDEyXSA9IFwiUjMyVUlcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUjMySVwiXSA9IDEzXSA9IFwiUjMySVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSRzhcIl0gPSAxNF0gPSBcIlJHOFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSRzhTTlwiXSA9IDE1XSA9IFwiUkc4U05cIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkc4VUlcIl0gPSAxNl0gPSBcIlJHOFVJXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHOElcIl0gPSAxN10gPSBcIlJHOElcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkcxNkZcIl0gPSAxOF0gPSBcIlJHMTZGXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHMTZVSVwiXSA9IDE5XSA9IFwiUkcxNlVJXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHMTZJXCJdID0gMjBdID0gXCJSRzE2SVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSRzMyRlwiXSA9IDIxXSA9IFwiUkczMkZcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkczMlVJXCJdID0gMjJdID0gXCJSRzMyVUlcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkczMklcIl0gPSAyM10gPSBcIlJHMzJJXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQjhcIl0gPSAyNF0gPSBcIlJHQjhcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiU1JHQjhcIl0gPSAyNV0gPSBcIlNSR0I4XCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQjhTTlwiXSA9IDI2XSA9IFwiUkdCOFNOXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQjhVSVwiXSA9IDI3XSA9IFwiUkdCOFVJXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQjhJXCJdID0gMjhdID0gXCJSR0I4SVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0IxNkZcIl0gPSAyOV0gPSBcIlJHQjE2RlwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0IxNlVJXCJdID0gMzBdID0gXCJSR0IxNlVJXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQjE2SVwiXSA9IDMxXSA9IFwiUkdCMTZJXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQjMyRlwiXSA9IDMyXSA9IFwiUkdCMzJGXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQjMyVUlcIl0gPSAzM10gPSBcIlJHQjMyVUlcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCMzJJXCJdID0gMzRdID0gXCJSR0IzMklcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCQThcIl0gPSAzNV0gPSBcIlJHQkE4XCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlNSR0I4X0E4XCJdID0gMzZdID0gXCJTUkdCOF9BOFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0JBOFNOXCJdID0gMzddID0gXCJSR0JBOFNOXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQkE4VUlcIl0gPSAzOF0gPSBcIlJHQkE4VUlcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCQThJXCJdID0gMzldID0gXCJSR0JBOElcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCQTE2RlwiXSA9IDQwXSA9IFwiUkdCQTE2RlwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0JBMTZVSVwiXSA9IDQxXSA9IFwiUkdCQTE2VUlcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCQTE2SVwiXSA9IDQyXSA9IFwiUkdCQTE2SVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0JBMzJGXCJdID0gNDNdID0gXCJSR0JBMzJGXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQkEzMlVJXCJdID0gNDRdID0gXCJSR0JBMzJVSVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0JBMzJJXCJdID0gNDVdID0gXCJSR0JBMzJJXCI7XG4gICAgLy8gU3BlY2lhbCBGb3JtYXRcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUjVHNkI1XCJdID0gNDZdID0gXCJSNUc2QjVcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUjExRzExQjEwRlwiXSA9IDQ3XSA9IFwiUjExRzExQjEwRlwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0I1QTFcIl0gPSA0OF0gPSBcIlJHQjVBMVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0JBNFwiXSA9IDQ5XSA9IFwiUkdCQTRcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCMTBBMlwiXSA9IDUwXSA9IFwiUkdCMTBBMlwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0IxMEEyVUlcIl0gPSA1MV0gPSBcIlJHQjEwQTJVSVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0I5RTVcIl0gPSA1Ml0gPSBcIlJHQjlFNVwiO1xuICAgIC8vIERlcHRoLVN0ZW5jaWwgRm9ybWF0XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkQxNlwiXSA9IDUzXSA9IFwiRDE2XCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkQxNlM4XCJdID0gNTRdID0gXCJEMTZTOFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJEMjRcIl0gPSA1NV0gPSBcIkQyNFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJEMjRTOFwiXSA9IDU2XSA9IFwiRDI0UzhcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiRDMyRlwiXSA9IDU3XSA9IFwiRDMyRlwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJEMzJGX1M4XCJdID0gNThdID0gXCJEMzJGX1M4XCI7XG4gICAgLy8gQ29tcHJlc3NlZCBGb3JtYXRcbiAgICAvLyBCbG9jayBDb21wcmVzc2lvbiBGb3JtYXQsIEREUyAoRGlyZWN0RHJhdyBTdXJmYWNlKVxuICAgIC8vIERYVDE6IDMgY2hhbm5lbHMgKDU6Njo1KSwgMS84IG9yaWdpYW5sIHNpemUsIHdpdGggMCBvciAxIGJpdCBvZiBhbHBoYVxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzFcIl0gPSA1OV0gPSBcIkJDMVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzFfQUxQSEFcIl0gPSA2MF0gPSBcIkJDMV9BTFBIQVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzFfU1JHQlwiXSA9IDYxXSA9IFwiQkMxX1NSR0JcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiQkMxX1NSR0JfQUxQSEFcIl0gPSA2Ml0gPSBcIkJDMV9TUkdCX0FMUEhBXCI7XG4gICAgLy8gRFhUMzogNCBjaGFubmVscyAoNTo2OjUpLCAxLzQgb3JpZ2lhbmwgc2l6ZSwgd2l0aCA0IGJpdHMgb2YgYWxwaGFcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiQkMyXCJdID0gNjNdID0gXCJCQzJcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiQkMyX1NSR0JcIl0gPSA2NF0gPSBcIkJDMl9TUkdCXCI7XG4gICAgLy8gRFhUNTogNCBjaGFubmVscyAoNTo2OjUpLCAxLzQgb3JpZ2lhbmwgc2l6ZSwgd2l0aCA4IGJpdHMgb2YgYWxwaGFcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiQkMzXCJdID0gNjVdID0gXCJCQzNcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiQkMzX1NSR0JcIl0gPSA2Nl0gPSBcIkJDM19TUkdCXCI7XG4gICAgLy8gMSBjaGFubmVsICg4KSwgMS80IG9yaWdpYW5sIHNpemVcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiQkM0XCJdID0gNjddID0gXCJCQzRcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiQkM0X1NOT1JNXCJdID0gNjhdID0gXCJCQzRfU05PUk1cIjtcbiAgICAvLyAyIGNoYW5uZWxzICg4OjgpLCAxLzIgb3JpZ2lhbmwgc2l6ZVxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzVcIl0gPSA2OV0gPSBcIkJDNVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzVfU05PUk1cIl0gPSA3MF0gPSBcIkJDNV9TTk9STVwiO1xuICAgIC8vIDMgY2hhbm5lbHMgKDE2OjE2OjE2KSwgaGFsZi1mbG9hdGluZyBwb2ludCwgMS82IG9yaWdpYW5sIHNpemVcbiAgICAvLyBVRjE2OiB1bnNpZ25lZCBmbG9hdCwgNSBleHBvbmVudCBiaXRzICsgMTEgbWFudGlzc2EgYml0c1xuICAgIC8vIFNGMTY6IHNpZ25lZCBmbG9hdCwgMSBzaWduZWQgYml0ICsgNSBleHBvbmVudCBiaXRzICsgMTAgbWFudGlzc2EgYml0c1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzZIX1VGMTZcIl0gPSA3MV0gPSBcIkJDNkhfVUYxNlwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzZIX1NGMTZcIl0gPSA3Ml0gPSBcIkJDNkhfU0YxNlwiO1xuICAgIC8vIDQgY2hhbm5lbHMgKDR+NyBiaXRzIHBlciBjaGFubmVsKSB3aXRoIDAgdG8gOCBiaXRzIG9mIGFscGhhLCAxLzMgb3JpZ2luYWwgc2l6ZVxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzdcIl0gPSA3M10gPSBcIkJDN1wiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzdfU1JHQlwiXSA9IDc0XSA9IFwiQkM3X1NSR0JcIjtcbiAgICAvLyBFcmljc3NvbiBUZXh0dXJlIENvbXByZXNzaW9uIEZvcm1hdFxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJFVENfUkdCOFwiXSA9IDc1XSA9IFwiRVRDX1JHQjhcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiRVRDMl9SR0I4XCJdID0gNzZdID0gXCJFVEMyX1JHQjhcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiRVRDMl9TUkdCOFwiXSA9IDc3XSA9IFwiRVRDMl9TUkdCOFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJFVEMyX1JHQjhfQTFcIl0gPSA3OF0gPSBcIkVUQzJfUkdCOF9BMVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJFVEMyX1NSR0I4X0ExXCJdID0gNzldID0gXCJFVEMyX1NSR0I4X0ExXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkVUQzJfUkdCQThcIl0gPSA4MF0gPSBcIkVUQzJfUkdCQThcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiRVRDMl9TUkdCOF9BOFwiXSA9IDgxXSA9IFwiRVRDMl9TUkdCOF9BOFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJFQUNfUjExXCJdID0gODJdID0gXCJFQUNfUjExXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkVBQ19SMTFTTlwiXSA9IDgzXSA9IFwiRUFDX1IxMVNOXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkVBQ19SRzExXCJdID0gODRdID0gXCJFQUNfUkcxMVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJFQUNfUkcxMVNOXCJdID0gODVdID0gXCJFQUNfUkcxMVNOXCI7XG4gICAgLy8gUFZSVEMgKFBvd2VyVlIpXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlBWUlRDX1JHQjJcIl0gPSA4Nl0gPSBcIlBWUlRDX1JHQjJcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUFZSVENfUkdCQTJcIl0gPSA4N10gPSBcIlBWUlRDX1JHQkEyXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlBWUlRDX1JHQjRcIl0gPSA4OF0gPSBcIlBWUlRDX1JHQjRcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUFZSVENfUkdCQTRcIl0gPSA4OV0gPSBcIlBWUlRDX1JHQkE0XCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlBWUlRDMl8yQlBQXCJdID0gOTBdID0gXCJQVlJUQzJfMkJQUFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJQVlJUQzJfNEJQUFwiXSA9IDkxXSA9IFwiUFZSVEMyXzRCUFBcIjtcbn0pKEdGWEZvcm1hdCB8fCAoR0ZYRm9ybWF0ID0ge30pKTtcbnZhciBHRlhCdWZmZXJVc2FnZUJpdDtcbihmdW5jdGlvbiAoR0ZYQnVmZmVyVXNhZ2VCaXQpIHtcbiAgICBHRlhCdWZmZXJVc2FnZUJpdFtHRlhCdWZmZXJVc2FnZUJpdFtcIk5PTkVcIl0gPSAwXSA9IFwiTk9ORVwiO1xuICAgIEdGWEJ1ZmZlclVzYWdlQml0W0dGWEJ1ZmZlclVzYWdlQml0W1wiVFJBTlNGRVJfU1JDXCJdID0gMV0gPSBcIlRSQU5TRkVSX1NSQ1wiO1xuICAgIEdGWEJ1ZmZlclVzYWdlQml0W0dGWEJ1ZmZlclVzYWdlQml0W1wiVFJBTlNGRVJfRFNUXCJdID0gMl0gPSBcIlRSQU5TRkVSX0RTVFwiO1xuICAgIEdGWEJ1ZmZlclVzYWdlQml0W0dGWEJ1ZmZlclVzYWdlQml0W1wiSU5ERVhcIl0gPSA0XSA9IFwiSU5ERVhcIjtcbiAgICBHRlhCdWZmZXJVc2FnZUJpdFtHRlhCdWZmZXJVc2FnZUJpdFtcIlZFUlRFWFwiXSA9IDhdID0gXCJWRVJURVhcIjtcbiAgICBHRlhCdWZmZXJVc2FnZUJpdFtHRlhCdWZmZXJVc2FnZUJpdFtcIlVOSUZPUk1cIl0gPSAxNl0gPSBcIlVOSUZPUk1cIjtcbiAgICBHRlhCdWZmZXJVc2FnZUJpdFtHRlhCdWZmZXJVc2FnZUJpdFtcIlNUT1JBR0VcIl0gPSAzMl0gPSBcIlNUT1JBR0VcIjtcbiAgICBHRlhCdWZmZXJVc2FnZUJpdFtHRlhCdWZmZXJVc2FnZUJpdFtcIklORElSRUNUXCJdID0gNjRdID0gXCJJTkRJUkVDVFwiO1xufSkoR0ZYQnVmZmVyVXNhZ2VCaXQgfHwgKEdGWEJ1ZmZlclVzYWdlQml0ID0ge30pKTtcbnZhciBHRlhNZW1vcnlVc2FnZUJpdDtcbihmdW5jdGlvbiAoR0ZYTWVtb3J5VXNhZ2VCaXQpIHtcbiAgICBHRlhNZW1vcnlVc2FnZUJpdFtHRlhNZW1vcnlVc2FnZUJpdFtcIk5PTkVcIl0gPSAwXSA9IFwiTk9ORVwiO1xuICAgIEdGWE1lbW9yeVVzYWdlQml0W0dGWE1lbW9yeVVzYWdlQml0W1wiREVWSUNFXCJdID0gMV0gPSBcIkRFVklDRVwiO1xuICAgIEdGWE1lbW9yeVVzYWdlQml0W0dGWE1lbW9yeVVzYWdlQml0W1wiSE9TVFwiXSA9IDJdID0gXCJIT1NUXCI7XG59KShHRlhNZW1vcnlVc2FnZUJpdCB8fCAoR0ZYTWVtb3J5VXNhZ2VCaXQgPSB7fSkpO1xudmFyIEdGWEJ1ZmZlckFjY2Vzc0JpdDtcbihmdW5jdGlvbiAoR0ZYQnVmZmVyQWNjZXNzQml0KSB7XG4gICAgR0ZYQnVmZmVyQWNjZXNzQml0W0dGWEJ1ZmZlckFjY2Vzc0JpdFtcIk5PTkVcIl0gPSAwXSA9IFwiTk9ORVwiO1xuICAgIEdGWEJ1ZmZlckFjY2Vzc0JpdFtHRlhCdWZmZXJBY2Nlc3NCaXRbXCJSRUFEXCJdID0gMV0gPSBcIlJFQURcIjtcbiAgICBHRlhCdWZmZXJBY2Nlc3NCaXRbR0ZYQnVmZmVyQWNjZXNzQml0W1wiV1JJVEVcIl0gPSAyXSA9IFwiV1JJVEVcIjtcbn0pKEdGWEJ1ZmZlckFjY2Vzc0JpdCB8fCAoR0ZYQnVmZmVyQWNjZXNzQml0ID0ge30pKTtcbnZhciBHRlhQcmltaXRpdmVNb2RlO1xuKGZ1bmN0aW9uIChHRlhQcmltaXRpdmVNb2RlKSB7XG4gICAgR0ZYUHJpbWl0aXZlTW9kZVtHRlhQcmltaXRpdmVNb2RlW1wiUE9JTlRfTElTVFwiXSA9IDBdID0gXCJQT0lOVF9MSVNUXCI7XG4gICAgR0ZYUHJpbWl0aXZlTW9kZVtHRlhQcmltaXRpdmVNb2RlW1wiTElORV9MSVNUXCJdID0gMV0gPSBcIkxJTkVfTElTVFwiO1xuICAgIEdGWFByaW1pdGl2ZU1vZGVbR0ZYUHJpbWl0aXZlTW9kZVtcIkxJTkVfU1RSSVBcIl0gPSAyXSA9IFwiTElORV9TVFJJUFwiO1xuICAgIEdGWFByaW1pdGl2ZU1vZGVbR0ZYUHJpbWl0aXZlTW9kZVtcIkxJTkVfTE9PUFwiXSA9IDNdID0gXCJMSU5FX0xPT1BcIjtcbiAgICBHRlhQcmltaXRpdmVNb2RlW0dGWFByaW1pdGl2ZU1vZGVbXCJMSU5FX0xJU1RfQURKQUNFTkNZXCJdID0gNF0gPSBcIkxJTkVfTElTVF9BREpBQ0VOQ1lcIjtcbiAgICBHRlhQcmltaXRpdmVNb2RlW0dGWFByaW1pdGl2ZU1vZGVbXCJMSU5FX1NUUklQX0FESkFDRU5DWVwiXSA9IDVdID0gXCJMSU5FX1NUUklQX0FESkFDRU5DWVwiO1xuICAgIEdGWFByaW1pdGl2ZU1vZGVbR0ZYUHJpbWl0aXZlTW9kZVtcIklTT19MSU5FX0xJU1RcIl0gPSA2XSA9IFwiSVNPX0xJTkVfTElTVFwiO1xuICAgIC8vIHJheWNhc3QgZGV0ZWN0YWJsZTpcbiAgICBHRlhQcmltaXRpdmVNb2RlW0dGWFByaW1pdGl2ZU1vZGVbXCJUUklBTkdMRV9MSVNUXCJdID0gN10gPSBcIlRSSUFOR0xFX0xJU1RcIjtcbiAgICBHRlhQcmltaXRpdmVNb2RlW0dGWFByaW1pdGl2ZU1vZGVbXCJUUklBTkdMRV9TVFJJUFwiXSA9IDhdID0gXCJUUklBTkdMRV9TVFJJUFwiO1xuICAgIEdGWFByaW1pdGl2ZU1vZGVbR0ZYUHJpbWl0aXZlTW9kZVtcIlRSSUFOR0xFX0ZBTlwiXSA9IDldID0gXCJUUklBTkdMRV9GQU5cIjtcbiAgICBHRlhQcmltaXRpdmVNb2RlW0dGWFByaW1pdGl2ZU1vZGVbXCJUUklBTkdMRV9MSVNUX0FESkFDRU5DWVwiXSA9IDEwXSA9IFwiVFJJQU5HTEVfTElTVF9BREpBQ0VOQ1lcIjtcbiAgICBHRlhQcmltaXRpdmVNb2RlW0dGWFByaW1pdGl2ZU1vZGVbXCJUUklBTkdMRV9TVFJJUF9BREpBQ0VOQ1lcIl0gPSAxMV0gPSBcIlRSSUFOR0xFX1NUUklQX0FESkFDRU5DWVwiO1xuICAgIEdGWFByaW1pdGl2ZU1vZGVbR0ZYUHJpbWl0aXZlTW9kZVtcIlRSSUFOR0xFX1BBVENIX0FESkFDRU5DWVwiXSA9IDEyXSA9IFwiVFJJQU5HTEVfUEFUQ0hfQURKQUNFTkNZXCI7XG4gICAgR0ZYUHJpbWl0aXZlTW9kZVtHRlhQcmltaXRpdmVNb2RlW1wiUVVBRF9QQVRDSF9MSVNUXCJdID0gMTNdID0gXCJRVUFEX1BBVENIX0xJU1RcIjtcbn0pKEdGWFByaW1pdGl2ZU1vZGUgfHwgKEdGWFByaW1pdGl2ZU1vZGUgPSB7fSkpO1xudmFyIEdGWFBvbHlnb25Nb2RlO1xuKGZ1bmN0aW9uIChHRlhQb2x5Z29uTW9kZSkge1xuICAgIEdGWFBvbHlnb25Nb2RlW0dGWFBvbHlnb25Nb2RlW1wiRklMTFwiXSA9IDBdID0gXCJGSUxMXCI7XG4gICAgR0ZYUG9seWdvbk1vZGVbR0ZYUG9seWdvbk1vZGVbXCJQT0lOVFwiXSA9IDFdID0gXCJQT0lOVFwiO1xuICAgIEdGWFBvbHlnb25Nb2RlW0dGWFBvbHlnb25Nb2RlW1wiTElORVwiXSA9IDJdID0gXCJMSU5FXCI7XG59KShHRlhQb2x5Z29uTW9kZSB8fCAoR0ZYUG9seWdvbk1vZGUgPSB7fSkpO1xudmFyIEdGWFNoYWRlTW9kZWw7XG4oZnVuY3Rpb24gKEdGWFNoYWRlTW9kZWwpIHtcbiAgICBHRlhTaGFkZU1vZGVsW0dGWFNoYWRlTW9kZWxbXCJHT1VSQU5EXCJdID0gMF0gPSBcIkdPVVJBTkRcIjtcbiAgICBHRlhTaGFkZU1vZGVsW0dGWFNoYWRlTW9kZWxbXCJGTEFUXCJdID0gMV0gPSBcIkZMQVRcIjtcbn0pKEdGWFNoYWRlTW9kZWwgfHwgKEdGWFNoYWRlTW9kZWwgPSB7fSkpO1xudmFyIEdGWEN1bGxNb2RlO1xuKGZ1bmN0aW9uIChHRlhDdWxsTW9kZSkge1xuICAgIEdGWEN1bGxNb2RlW0dGWEN1bGxNb2RlW1wiTk9ORVwiXSA9IDBdID0gXCJOT05FXCI7XG4gICAgR0ZYQ3VsbE1vZGVbR0ZYQ3VsbE1vZGVbXCJGUk9OVFwiXSA9IDFdID0gXCJGUk9OVFwiO1xuICAgIEdGWEN1bGxNb2RlW0dGWEN1bGxNb2RlW1wiQkFDS1wiXSA9IDJdID0gXCJCQUNLXCI7XG59KShHRlhDdWxsTW9kZSB8fCAoR0ZYQ3VsbE1vZGUgPSB7fSkpO1xudmFyIEdGWENvbXBhcmlzb25GdW5jO1xuKGZ1bmN0aW9uIChHRlhDb21wYXJpc29uRnVuYykge1xuICAgIEdGWENvbXBhcmlzb25GdW5jW0dGWENvbXBhcmlzb25GdW5jW1wiTkVWRVJcIl0gPSAwXSA9IFwiTkVWRVJcIjtcbiAgICBHRlhDb21wYXJpc29uRnVuY1tHRlhDb21wYXJpc29uRnVuY1tcIkxFU1NcIl0gPSAxXSA9IFwiTEVTU1wiO1xuICAgIEdGWENvbXBhcmlzb25GdW5jW0dGWENvbXBhcmlzb25GdW5jW1wiRVFVQUxcIl0gPSAyXSA9IFwiRVFVQUxcIjtcbiAgICBHRlhDb21wYXJpc29uRnVuY1tHRlhDb21wYXJpc29uRnVuY1tcIkxFU1NfRVFVQUxcIl0gPSAzXSA9IFwiTEVTU19FUVVBTFwiO1xuICAgIEdGWENvbXBhcmlzb25GdW5jW0dGWENvbXBhcmlzb25GdW5jW1wiR1JFQVRFUlwiXSA9IDRdID0gXCJHUkVBVEVSXCI7XG4gICAgR0ZYQ29tcGFyaXNvbkZ1bmNbR0ZYQ29tcGFyaXNvbkZ1bmNbXCJOT1RfRVFVQUxcIl0gPSA1XSA9IFwiTk9UX0VRVUFMXCI7XG4gICAgR0ZYQ29tcGFyaXNvbkZ1bmNbR0ZYQ29tcGFyaXNvbkZ1bmNbXCJHUkVBVEVSX0VRVUFMXCJdID0gNl0gPSBcIkdSRUFURVJfRVFVQUxcIjtcbiAgICBHRlhDb21wYXJpc29uRnVuY1tHRlhDb21wYXJpc29uRnVuY1tcIkFMV0FZU1wiXSA9IDddID0gXCJBTFdBWVNcIjtcbn0pKEdGWENvbXBhcmlzb25GdW5jIHx8IChHRlhDb21wYXJpc29uRnVuYyA9IHt9KSk7XG52YXIgR0ZYU3RlbmNpbE9wO1xuKGZ1bmN0aW9uIChHRlhTdGVuY2lsT3ApIHtcbiAgICBHRlhTdGVuY2lsT3BbR0ZYU3RlbmNpbE9wW1wiWkVST1wiXSA9IDBdID0gXCJaRVJPXCI7XG4gICAgR0ZYU3RlbmNpbE9wW0dGWFN0ZW5jaWxPcFtcIktFRVBcIl0gPSAxXSA9IFwiS0VFUFwiO1xuICAgIEdGWFN0ZW5jaWxPcFtHRlhTdGVuY2lsT3BbXCJSRVBMQUNFXCJdID0gMl0gPSBcIlJFUExBQ0VcIjtcbiAgICBHRlhTdGVuY2lsT3BbR0ZYU3RlbmNpbE9wW1wiSU5DUlwiXSA9IDNdID0gXCJJTkNSXCI7XG4gICAgR0ZYU3RlbmNpbE9wW0dGWFN0ZW5jaWxPcFtcIkRFQ1JcIl0gPSA0XSA9IFwiREVDUlwiO1xuICAgIEdGWFN0ZW5jaWxPcFtHRlhTdGVuY2lsT3BbXCJJTlZFUlRcIl0gPSA1XSA9IFwiSU5WRVJUXCI7XG4gICAgR0ZYU3RlbmNpbE9wW0dGWFN0ZW5jaWxPcFtcIklOQ1JfV1JBUFwiXSA9IDZdID0gXCJJTkNSX1dSQVBcIjtcbiAgICBHRlhTdGVuY2lsT3BbR0ZYU3RlbmNpbE9wW1wiREVDUl9XUkFQXCJdID0gN10gPSBcIkRFQ1JfV1JBUFwiO1xufSkoR0ZYU3RlbmNpbE9wIHx8IChHRlhTdGVuY2lsT3AgPSB7fSkpO1xudmFyIEdGWEJsZW5kT3A7XG4oZnVuY3Rpb24gKEdGWEJsZW5kT3ApIHtcbiAgICBHRlhCbGVuZE9wW0dGWEJsZW5kT3BbXCJBRERcIl0gPSAwXSA9IFwiQUREXCI7XG4gICAgR0ZYQmxlbmRPcFtHRlhCbGVuZE9wW1wiU1VCXCJdID0gMV0gPSBcIlNVQlwiO1xuICAgIEdGWEJsZW5kT3BbR0ZYQmxlbmRPcFtcIlJFVl9TVUJcIl0gPSAyXSA9IFwiUkVWX1NVQlwiO1xuICAgIEdGWEJsZW5kT3BbR0ZYQmxlbmRPcFtcIk1JTlwiXSA9IDNdID0gXCJNSU5cIjtcbiAgICBHRlhCbGVuZE9wW0dGWEJsZW5kT3BbXCJNQVhcIl0gPSA0XSA9IFwiTUFYXCI7XG59KShHRlhCbGVuZE9wIHx8IChHRlhCbGVuZE9wID0ge30pKTtcbnZhciBHRlhCbGVuZEZhY3RvcjtcbihmdW5jdGlvbiAoR0ZYQmxlbmRGYWN0b3IpIHtcbiAgICBHRlhCbGVuZEZhY3RvcltHRlhCbGVuZEZhY3RvcltcIlpFUk9cIl0gPSAwXSA9IFwiWkVST1wiO1xuICAgIEdGWEJsZW5kRmFjdG9yW0dGWEJsZW5kRmFjdG9yW1wiT05FXCJdID0gMV0gPSBcIk9ORVwiO1xuICAgIEdGWEJsZW5kRmFjdG9yW0dGWEJsZW5kRmFjdG9yW1wiU1JDX0FMUEhBXCJdID0gMl0gPSBcIlNSQ19BTFBIQVwiO1xuICAgIEdGWEJsZW5kRmFjdG9yW0dGWEJsZW5kRmFjdG9yW1wiRFNUX0FMUEhBXCJdID0gM10gPSBcIkRTVF9BTFBIQVwiO1xuICAgIEdGWEJsZW5kRmFjdG9yW0dGWEJsZW5kRmFjdG9yW1wiT05FX01JTlVTX1NSQ19BTFBIQVwiXSA9IDRdID0gXCJPTkVfTUlOVVNfU1JDX0FMUEhBXCI7XG4gICAgR0ZYQmxlbmRGYWN0b3JbR0ZYQmxlbmRGYWN0b3JbXCJPTkVfTUlOVVNfRFNUX0FMUEhBXCJdID0gNV0gPSBcIk9ORV9NSU5VU19EU1RfQUxQSEFcIjtcbiAgICBHRlhCbGVuZEZhY3RvcltHRlhCbGVuZEZhY3RvcltcIlNSQ19DT0xPUlwiXSA9IDZdID0gXCJTUkNfQ09MT1JcIjtcbiAgICBHRlhCbGVuZEZhY3RvcltHRlhCbGVuZEZhY3RvcltcIkRTVF9DT0xPUlwiXSA9IDddID0gXCJEU1RfQ09MT1JcIjtcbiAgICBHRlhCbGVuZEZhY3RvcltHRlhCbGVuZEZhY3RvcltcIk9ORV9NSU5VU19TUkNfQ09MT1JcIl0gPSA4XSA9IFwiT05FX01JTlVTX1NSQ19DT0xPUlwiO1xuICAgIEdGWEJsZW5kRmFjdG9yW0dGWEJsZW5kRmFjdG9yW1wiT05FX01JTlVTX0RTVF9DT0xPUlwiXSA9IDldID0gXCJPTkVfTUlOVVNfRFNUX0NPTE9SXCI7XG4gICAgR0ZYQmxlbmRGYWN0b3JbR0ZYQmxlbmRGYWN0b3JbXCJTUkNfQUxQSEFfU0FUVVJBVEVcIl0gPSAxMF0gPSBcIlNSQ19BTFBIQV9TQVRVUkFURVwiO1xuICAgIEdGWEJsZW5kRmFjdG9yW0dGWEJsZW5kRmFjdG9yW1wiQ09OU1RBTlRfQ09MT1JcIl0gPSAxMV0gPSBcIkNPTlNUQU5UX0NPTE9SXCI7XG4gICAgR0ZYQmxlbmRGYWN0b3JbR0ZYQmxlbmRGYWN0b3JbXCJPTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1JcIl0gPSAxMl0gPSBcIk9ORV9NSU5VU19DT05TVEFOVF9DT0xPUlwiO1xuICAgIEdGWEJsZW5kRmFjdG9yW0dGWEJsZW5kRmFjdG9yW1wiQ09OU1RBTlRfQUxQSEFcIl0gPSAxM10gPSBcIkNPTlNUQU5UX0FMUEhBXCI7XG4gICAgR0ZYQmxlbmRGYWN0b3JbR0ZYQmxlbmRGYWN0b3JbXCJPTkVfTUlOVVNfQ09OU1RBTlRfQUxQSEFcIl0gPSAxNF0gPSBcIk9ORV9NSU5VU19DT05TVEFOVF9BTFBIQVwiO1xufSkoR0ZYQmxlbmRGYWN0b3IgfHwgKEdGWEJsZW5kRmFjdG9yID0ge30pKTtcbnZhciBHRlhDb2xvck1hc2s7XG4oZnVuY3Rpb24gKEdGWENvbG9yTWFzaykge1xuICAgIEdGWENvbG9yTWFza1tHRlhDb2xvck1hc2tbXCJOT05FXCJdID0gMF0gPSBcIk5PTkVcIjtcbiAgICBHRlhDb2xvck1hc2tbR0ZYQ29sb3JNYXNrW1wiUlwiXSA9IDFdID0gXCJSXCI7XG4gICAgR0ZYQ29sb3JNYXNrW0dGWENvbG9yTWFza1tcIkdcIl0gPSAyXSA9IFwiR1wiO1xuICAgIEdGWENvbG9yTWFza1tHRlhDb2xvck1hc2tbXCJCXCJdID0gNF0gPSBcIkJcIjtcbiAgICBHRlhDb2xvck1hc2tbR0ZYQ29sb3JNYXNrW1wiQVwiXSA9IDhdID0gXCJBXCI7XG4gICAgR0ZYQ29sb3JNYXNrW0dGWENvbG9yTWFza1tcIkFMTFwiXSA9IDE1XSA9IFwiQUxMXCI7XG59KShHRlhDb2xvck1hc2sgfHwgKEdGWENvbG9yTWFzayA9IHt9KSk7XG52YXIgR0ZYRmlsdGVyO1xuKGZ1bmN0aW9uIChHRlhGaWx0ZXIpIHtcbiAgICBHRlhGaWx0ZXJbR0ZYRmlsdGVyW1wiTk9ORVwiXSA9IDBdID0gXCJOT05FXCI7XG4gICAgR0ZYRmlsdGVyW0dGWEZpbHRlcltcIlBPSU5UXCJdID0gMV0gPSBcIlBPSU5UXCI7XG4gICAgR0ZYRmlsdGVyW0dGWEZpbHRlcltcIkxJTkVBUlwiXSA9IDJdID0gXCJMSU5FQVJcIjtcbiAgICBHRlhGaWx0ZXJbR0ZYRmlsdGVyW1wiQU5JU09UUk9QSUNcIl0gPSAzXSA9IFwiQU5JU09UUk9QSUNcIjtcbn0pKEdGWEZpbHRlciB8fCAoR0ZYRmlsdGVyID0ge30pKTtcbnZhciBHRlhBZGRyZXNzO1xuKGZ1bmN0aW9uIChHRlhBZGRyZXNzKSB7XG4gICAgR0ZYQWRkcmVzc1tHRlhBZGRyZXNzW1wiV1JBUFwiXSA9IDBdID0gXCJXUkFQXCI7XG4gICAgR0ZYQWRkcmVzc1tHRlhBZGRyZXNzW1wiTUlSUk9SXCJdID0gMV0gPSBcIk1JUlJPUlwiO1xuICAgIEdGWEFkZHJlc3NbR0ZYQWRkcmVzc1tcIkNMQU1QXCJdID0gMl0gPSBcIkNMQU1QXCI7XG4gICAgR0ZYQWRkcmVzc1tHRlhBZGRyZXNzW1wiQk9SREVSXCJdID0gM10gPSBcIkJPUkRFUlwiO1xufSkoR0ZYQWRkcmVzcyB8fCAoR0ZYQWRkcmVzcyA9IHt9KSk7XG52YXIgR0ZYVGV4dHVyZVR5cGU7XG4oZnVuY3Rpb24gKEdGWFRleHR1cmVUeXBlKSB7XG4gICAgR0ZYVGV4dHVyZVR5cGVbR0ZYVGV4dHVyZVR5cGVbXCJURVgxRFwiXSA9IDBdID0gXCJURVgxRFwiO1xuICAgIEdGWFRleHR1cmVUeXBlW0dGWFRleHR1cmVUeXBlW1wiVEVYMkRcIl0gPSAxXSA9IFwiVEVYMkRcIjtcbiAgICBHRlhUZXh0dXJlVHlwZVtHRlhUZXh0dXJlVHlwZVtcIlRFWDNEXCJdID0gMl0gPSBcIlRFWDNEXCI7XG59KShHRlhUZXh0dXJlVHlwZSB8fCAoR0ZYVGV4dHVyZVR5cGUgPSB7fSkpO1xudmFyIEdGWFRleHR1cmVVc2FnZUJpdDtcbihmdW5jdGlvbiAoR0ZYVGV4dHVyZVVzYWdlQml0KSB7XG4gICAgR0ZYVGV4dHVyZVVzYWdlQml0W0dGWFRleHR1cmVVc2FnZUJpdFtcIk5PTkVcIl0gPSAwXSA9IFwiTk9ORVwiO1xuICAgIEdGWFRleHR1cmVVc2FnZUJpdFtHRlhUZXh0dXJlVXNhZ2VCaXRbXCJUUkFOU0ZFUl9TUkNcIl0gPSAxXSA9IFwiVFJBTlNGRVJfU1JDXCI7XG4gICAgR0ZYVGV4dHVyZVVzYWdlQml0W0dGWFRleHR1cmVVc2FnZUJpdFtcIlRSQU5TRkVSX0RTVFwiXSA9IDJdID0gXCJUUkFOU0ZFUl9EU1RcIjtcbiAgICBHRlhUZXh0dXJlVXNhZ2VCaXRbR0ZYVGV4dHVyZVVzYWdlQml0W1wiU0FNUExFRFwiXSA9IDRdID0gXCJTQU1QTEVEXCI7XG4gICAgR0ZYVGV4dHVyZVVzYWdlQml0W0dGWFRleHR1cmVVc2FnZUJpdFtcIlNUT1JBR0VcIl0gPSA4XSA9IFwiU1RPUkFHRVwiO1xuICAgIEdGWFRleHR1cmVVc2FnZUJpdFtHRlhUZXh0dXJlVXNhZ2VCaXRbXCJDT0xPUl9BVFRBQ0hNRU5UXCJdID0gMTZdID0gXCJDT0xPUl9BVFRBQ0hNRU5UXCI7XG4gICAgR0ZYVGV4dHVyZVVzYWdlQml0W0dGWFRleHR1cmVVc2FnZUJpdFtcIkRFUFRIX1NURU5DSUxfQVRUQUNITUVOVFwiXSA9IDMyXSA9IFwiREVQVEhfU1RFTkNJTF9BVFRBQ0hNRU5UXCI7XG4gICAgR0ZYVGV4dHVyZVVzYWdlQml0W0dGWFRleHR1cmVVc2FnZUJpdFtcIlRSQU5TSUVOVF9BVFRBQ0hNRU5UXCJdID0gNjRdID0gXCJUUkFOU0lFTlRfQVRUQUNITUVOVFwiO1xuICAgIEdGWFRleHR1cmVVc2FnZUJpdFtHRlhUZXh0dXJlVXNhZ2VCaXRbXCJJTlBVVF9BVFRBQ0hNRU5UXCJdID0gMTI4XSA9IFwiSU5QVVRfQVRUQUNITUVOVFwiO1xufSkoR0ZYVGV4dHVyZVVzYWdlQml0IHx8IChHRlhUZXh0dXJlVXNhZ2VCaXQgPSB7fSkpO1xudmFyIEdGWFNhbXBsZUNvdW50O1xuKGZ1bmN0aW9uIChHRlhTYW1wbGVDb3VudCkge1xuICAgIEdGWFNhbXBsZUNvdW50W0dGWFNhbXBsZUNvdW50W1wiWDFcIl0gPSAwXSA9IFwiWDFcIjtcbiAgICBHRlhTYW1wbGVDb3VudFtHRlhTYW1wbGVDb3VudFtcIlgyXCJdID0gMV0gPSBcIlgyXCI7XG4gICAgR0ZYU2FtcGxlQ291bnRbR0ZYU2FtcGxlQ291bnRbXCJYNFwiXSA9IDJdID0gXCJYNFwiO1xuICAgIEdGWFNhbXBsZUNvdW50W0dGWFNhbXBsZUNvdW50W1wiWDhcIl0gPSAzXSA9IFwiWDhcIjtcbiAgICBHRlhTYW1wbGVDb3VudFtHRlhTYW1wbGVDb3VudFtcIlgxNlwiXSA9IDRdID0gXCJYMTZcIjtcbiAgICBHRlhTYW1wbGVDb3VudFtHRlhTYW1wbGVDb3VudFtcIlgzMlwiXSA9IDVdID0gXCJYMzJcIjtcbiAgICBHRlhTYW1wbGVDb3VudFtHRlhTYW1wbGVDb3VudFtcIlg2NFwiXSA9IDZdID0gXCJYNjRcIjtcbn0pKEdGWFNhbXBsZUNvdW50IHx8IChHRlhTYW1wbGVDb3VudCA9IHt9KSk7XG52YXIgR0ZYVGV4dHVyZUZsYWdCaXQ7XG4oZnVuY3Rpb24gKEdGWFRleHR1cmVGbGFnQml0KSB7XG4gICAgR0ZYVGV4dHVyZUZsYWdCaXRbR0ZYVGV4dHVyZUZsYWdCaXRbXCJOT05FXCJdID0gMF0gPSBcIk5PTkVcIjtcbiAgICBHRlhUZXh0dXJlRmxhZ0JpdFtHRlhUZXh0dXJlRmxhZ0JpdFtcIkdFTl9NSVBNQVBcIl0gPSAxXSA9IFwiR0VOX01JUE1BUFwiO1xuICAgIEdGWFRleHR1cmVGbGFnQml0W0dGWFRleHR1cmVGbGFnQml0W1wiQ1VCRU1BUFwiXSA9IDJdID0gXCJDVUJFTUFQXCI7XG4gICAgR0ZYVGV4dHVyZUZsYWdCaXRbR0ZYVGV4dHVyZUZsYWdCaXRbXCJCQUtVUF9CVUZGRVJcIl0gPSA0XSA9IFwiQkFLVVBfQlVGRkVSXCI7XG59KShHRlhUZXh0dXJlRmxhZ0JpdCB8fCAoR0ZYVGV4dHVyZUZsYWdCaXQgPSB7fSkpO1xudmFyIEdGWFRleHR1cmVWaWV3VHlwZTtcbihmdW5jdGlvbiAoR0ZYVGV4dHVyZVZpZXdUeXBlKSB7XG4gICAgR0ZYVGV4dHVyZVZpZXdUeXBlW0dGWFRleHR1cmVWaWV3VHlwZVtcIlRWMURcIl0gPSAwXSA9IFwiVFYxRFwiO1xuICAgIEdGWFRleHR1cmVWaWV3VHlwZVtHRlhUZXh0dXJlVmlld1R5cGVbXCJUVjJEXCJdID0gMV0gPSBcIlRWMkRcIjtcbiAgICBHRlhUZXh0dXJlVmlld1R5cGVbR0ZYVGV4dHVyZVZpZXdUeXBlW1wiVFYzRFwiXSA9IDJdID0gXCJUVjNEXCI7XG4gICAgR0ZYVGV4dHVyZVZpZXdUeXBlW0dGWFRleHR1cmVWaWV3VHlwZVtcIkNVQkVcIl0gPSAzXSA9IFwiQ1VCRVwiO1xuICAgIEdGWFRleHR1cmVWaWV3VHlwZVtHRlhUZXh0dXJlVmlld1R5cGVbXCJUVjFEX0FSUkFZXCJdID0gNF0gPSBcIlRWMURfQVJSQVlcIjtcbiAgICBHRlhUZXh0dXJlVmlld1R5cGVbR0ZYVGV4dHVyZVZpZXdUeXBlW1wiVFYyRF9BUlJBWVwiXSA9IDVdID0gXCJUVjJEX0FSUkFZXCI7XG59KShHRlhUZXh0dXJlVmlld1R5cGUgfHwgKEdGWFRleHR1cmVWaWV3VHlwZSA9IHt9KSk7XG52YXIgR0ZYU2hhZGVyVHlwZTtcbihmdW5jdGlvbiAoR0ZYU2hhZGVyVHlwZSkge1xuICAgIEdGWFNoYWRlclR5cGVbR0ZYU2hhZGVyVHlwZVtcIlZFUlRFWFwiXSA9IDBdID0gXCJWRVJURVhcIjtcbiAgICBHRlhTaGFkZXJUeXBlW0dGWFNoYWRlclR5cGVbXCJIVUxMXCJdID0gMV0gPSBcIkhVTExcIjtcbiAgICBHRlhTaGFkZXJUeXBlW0dGWFNoYWRlclR5cGVbXCJET01BSU5cIl0gPSAyXSA9IFwiRE9NQUlOXCI7XG4gICAgR0ZYU2hhZGVyVHlwZVtHRlhTaGFkZXJUeXBlW1wiR0VPTUVUUllcIl0gPSAzXSA9IFwiR0VPTUVUUllcIjtcbiAgICBHRlhTaGFkZXJUeXBlW0dGWFNoYWRlclR5cGVbXCJGUkFHTUVOVFwiXSA9IDRdID0gXCJGUkFHTUVOVFwiO1xuICAgIEdGWFNoYWRlclR5cGVbR0ZYU2hhZGVyVHlwZVtcIkNPTVBVVEVcIl0gPSA1XSA9IFwiQ09NUFVURVwiO1xuICAgIEdGWFNoYWRlclR5cGVbR0ZYU2hhZGVyVHlwZVtcIkNPVU5UXCJdID0gNl0gPSBcIkNPVU5UXCI7XG59KShHRlhTaGFkZXJUeXBlIHx8IChHRlhTaGFkZXJUeXBlID0ge30pKTtcbnZhciBHRlhCaW5kaW5nVHlwZTtcbihmdW5jdGlvbiAoR0ZYQmluZGluZ1R5cGUpIHtcbiAgICBHRlhCaW5kaW5nVHlwZVtHRlhCaW5kaW5nVHlwZVtcIlVOS05PV05cIl0gPSAwXSA9IFwiVU5LTk9XTlwiO1xuICAgIEdGWEJpbmRpbmdUeXBlW0dGWEJpbmRpbmdUeXBlW1wiVU5JRk9STV9CVUZGRVJcIl0gPSAxXSA9IFwiVU5JRk9STV9CVUZGRVJcIjtcbiAgICBHRlhCaW5kaW5nVHlwZVtHRlhCaW5kaW5nVHlwZVtcIlNBTVBMRVJcIl0gPSAyXSA9IFwiU0FNUExFUlwiO1xuICAgIEdGWEJpbmRpbmdUeXBlW0dGWEJpbmRpbmdUeXBlW1wiU1RPUkFHRV9CVUZGRVJcIl0gPSAzXSA9IFwiU1RPUkFHRV9CVUZGRVJcIjtcbn0pKEdGWEJpbmRpbmdUeXBlIHx8IChHRlhCaW5kaW5nVHlwZSA9IHt9KSk7XG52YXIgR0ZYQ29tbWFuZEJ1ZmZlclR5cGU7XG4oZnVuY3Rpb24gKEdGWENvbW1hbmRCdWZmZXJUeXBlKSB7XG4gICAgR0ZYQ29tbWFuZEJ1ZmZlclR5cGVbR0ZYQ29tbWFuZEJ1ZmZlclR5cGVbXCJQUklNQVJZXCJdID0gMF0gPSBcIlBSSU1BUllcIjtcbiAgICBHRlhDb21tYW5kQnVmZmVyVHlwZVtHRlhDb21tYW5kQnVmZmVyVHlwZVtcIlNFQ09OREFSWVwiXSA9IDFdID0gXCJTRUNPTkRBUllcIjtcbn0pKEdGWENvbW1hbmRCdWZmZXJUeXBlIHx8IChHRlhDb21tYW5kQnVmZmVyVHlwZSA9IHt9KSk7XG4vLyBFbnVtZXJhdGlvbiBhbGwgcG9zc2libGUgdmFsdWVzIG9mIG9wZXJhdGlvbnMgdG8gYmUgcGVyZm9ybWVkIG9uIGluaXRpYWxseSBMb2FkaW5nIGEgRnJhbWVidWZmZXIgT2JqZWN0LlxudmFyIEdGWExvYWRPcDtcbihmdW5jdGlvbiAoR0ZYTG9hZE9wKSB7XG4gICAgR0ZYTG9hZE9wW0dGWExvYWRPcFtcIkxPQURcIl0gPSAwXSA9IFwiTE9BRFwiO1xuICAgIEdGWExvYWRPcFtHRlhMb2FkT3BbXCJDTEVBUlwiXSA9IDFdID0gXCJDTEVBUlwiO1xuICAgIEdGWExvYWRPcFtHRlhMb2FkT3BbXCJESVNDQVJEXCJdID0gMl0gPSBcIkRJU0NBUkRcIjtcbn0pKEdGWExvYWRPcCB8fCAoR0ZYTG9hZE9wID0ge30pKTtcbi8vIEVudW1lcmF0ZXMgYWxsIHBvc3NpYmxlIHZhbHVlcyBvZiBvcGVyYXRpb25zIHRvIGJlIHBlcmZvcm1lZCB3aGVuIFN0b3JpbmcgdG8gYSBGcmFtZWJ1ZmZlciBPYmplY3QuXG52YXIgR0ZYU3RvcmVPcDtcbihmdW5jdGlvbiAoR0ZYU3RvcmVPcCkge1xuICAgIEdGWFN0b3JlT3BbR0ZYU3RvcmVPcFtcIlNUT1JFXCJdID0gMF0gPSBcIlNUT1JFXCI7XG4gICAgR0ZYU3RvcmVPcFtHRlhTdG9yZU9wW1wiRElTQ0FSRFwiXSA9IDFdID0gXCJESVNDQVJEXCI7XG59KShHRlhTdG9yZU9wIHx8IChHRlhTdG9yZU9wID0ge30pKTtcbnZhciBHRlhUZXh0dXJlTGF5b3V0O1xuKGZ1bmN0aW9uIChHRlhUZXh0dXJlTGF5b3V0KSB7XG4gICAgR0ZYVGV4dHVyZUxheW91dFtHRlhUZXh0dXJlTGF5b3V0W1wiVU5ERUZJTkVEXCJdID0gMF0gPSBcIlVOREVGSU5FRFwiO1xuICAgIEdGWFRleHR1cmVMYXlvdXRbR0ZYVGV4dHVyZUxheW91dFtcIkdFTkVSQUxcIl0gPSAxXSA9IFwiR0VORVJBTFwiO1xuICAgIEdGWFRleHR1cmVMYXlvdXRbR0ZYVGV4dHVyZUxheW91dFtcIkNPTE9SX0FUVEFDSE1FTlRfT1BUSU1BTFwiXSA9IDJdID0gXCJDT0xPUl9BVFRBQ0hNRU5UX09QVElNQUxcIjtcbiAgICBHRlhUZXh0dXJlTGF5b3V0W0dGWFRleHR1cmVMYXlvdXRbXCJERVBUSF9TVEVOQ0lMX0FUVEFDSE1FTlRfT1BUSU1BTFwiXSA9IDNdID0gXCJERVBUSF9TVEVOQ0lMX0FUVEFDSE1FTlRfT1BUSU1BTFwiO1xuICAgIEdGWFRleHR1cmVMYXlvdXRbR0ZYVGV4dHVyZUxheW91dFtcIkRFUFRIX1NURU5DSUxfUkVBRE9OTFlfT1BUSU1BTFwiXSA9IDRdID0gXCJERVBUSF9TVEVOQ0lMX1JFQURPTkxZX09QVElNQUxcIjtcbiAgICBHRlhUZXh0dXJlTGF5b3V0W0dGWFRleHR1cmVMYXlvdXRbXCJTSEFERVJfUkVBRE9OTFlfT1BUSU1BTFwiXSA9IDVdID0gXCJTSEFERVJfUkVBRE9OTFlfT1BUSU1BTFwiO1xuICAgIEdGWFRleHR1cmVMYXlvdXRbR0ZYVGV4dHVyZUxheW91dFtcIlRSQU5TRkVSX1NSQ19PUFRJTUFMXCJdID0gNl0gPSBcIlRSQU5TRkVSX1NSQ19PUFRJTUFMXCI7XG4gICAgR0ZYVGV4dHVyZUxheW91dFtHRlhUZXh0dXJlTGF5b3V0W1wiVFJBTlNGRVJfRFNUX09QVElNQUxcIl0gPSA3XSA9IFwiVFJBTlNGRVJfRFNUX09QVElNQUxcIjtcbiAgICBHRlhUZXh0dXJlTGF5b3V0W0dGWFRleHR1cmVMYXlvdXRbXCJQUkVJTklUSUFMSVpFRFwiXSA9IDhdID0gXCJQUkVJTklUSUFMSVpFRFwiO1xuICAgIEdGWFRleHR1cmVMYXlvdXRbR0ZYVGV4dHVyZUxheW91dFtcIlBSRVNFTlRfU1JDXCJdID0gOV0gPSBcIlBSRVNFTlRfU1JDXCI7XG59KShHRlhUZXh0dXJlTGF5b3V0IHx8IChHRlhUZXh0dXJlTGF5b3V0ID0ge30pKTtcbnZhciBHRlhQaXBlbGluZUJpbmRQb2ludDtcbihmdW5jdGlvbiAoR0ZYUGlwZWxpbmVCaW5kUG9pbnQpIHtcbiAgICBHRlhQaXBlbGluZUJpbmRQb2ludFtHRlhQaXBlbGluZUJpbmRQb2ludFtcIkdSQVBISUNTXCJdID0gMF0gPSBcIkdSQVBISUNTXCI7XG4gICAgR0ZYUGlwZWxpbmVCaW5kUG9pbnRbR0ZYUGlwZWxpbmVCaW5kUG9pbnRbXCJDT01QVVRFXCJdID0gMV0gPSBcIkNPTVBVVEVcIjtcbiAgICBHRlhQaXBlbGluZUJpbmRQb2ludFtHRlhQaXBlbGluZUJpbmRQb2ludFtcIlJBWV9UUkFDSU5HXCJdID0gMl0gPSBcIlJBWV9UUkFDSU5HXCI7XG59KShHRlhQaXBlbGluZUJpbmRQb2ludCB8fCAoR0ZYUGlwZWxpbmVCaW5kUG9pbnQgPSB7fSkpO1xudmFyIEdGWER5bmFtaWNTdGF0ZTtcbihmdW5jdGlvbiAoR0ZYRHluYW1pY1N0YXRlKSB7XG4gICAgR0ZYRHluYW1pY1N0YXRlW0dGWER5bmFtaWNTdGF0ZVtcIlZJRVdQT1JUXCJdID0gMF0gPSBcIlZJRVdQT1JUXCI7XG4gICAgR0ZYRHluYW1pY1N0YXRlW0dGWER5bmFtaWNTdGF0ZVtcIlNDSVNTT1JcIl0gPSAxXSA9IFwiU0NJU1NPUlwiO1xuICAgIEdGWER5bmFtaWNTdGF0ZVtHRlhEeW5hbWljU3RhdGVbXCJMSU5FX1dJRFRIXCJdID0gMl0gPSBcIkxJTkVfV0lEVEhcIjtcbiAgICBHRlhEeW5hbWljU3RhdGVbR0ZYRHluYW1pY1N0YXRlW1wiREVQVEhfQklBU1wiXSA9IDNdID0gXCJERVBUSF9CSUFTXCI7XG4gICAgR0ZYRHluYW1pY1N0YXRlW0dGWER5bmFtaWNTdGF0ZVtcIkJMRU5EX0NPTlNUQU5UU1wiXSA9IDRdID0gXCJCTEVORF9DT05TVEFOVFNcIjtcbiAgICBHRlhEeW5hbWljU3RhdGVbR0ZYRHluYW1pY1N0YXRlW1wiREVQVEhfQk9VTkRTXCJdID0gNV0gPSBcIkRFUFRIX0JPVU5EU1wiO1xuICAgIEdGWER5bmFtaWNTdGF0ZVtHRlhEeW5hbWljU3RhdGVbXCJTVEVOQ0lMX1dSSVRFX01BU0tcIl0gPSA2XSA9IFwiU1RFTkNJTF9XUklURV9NQVNLXCI7XG4gICAgR0ZYRHluYW1pY1N0YXRlW0dGWER5bmFtaWNTdGF0ZVtcIlNURU5DSUxfQ09NUEFSRV9NQVNLXCJdID0gN10gPSBcIlNURU5DSUxfQ09NUEFSRV9NQVNLXCI7XG59KShHRlhEeW5hbWljU3RhdGUgfHwgKEdGWER5bmFtaWNTdGF0ZSA9IHt9KSk7XG52YXIgR0ZYU3RlbmNpbEZhY2U7XG4oZnVuY3Rpb24gKEdGWFN0ZW5jaWxGYWNlKSB7XG4gICAgR0ZYU3RlbmNpbEZhY2VbR0ZYU3RlbmNpbEZhY2VbXCJGUk9OVFwiXSA9IDBdID0gXCJGUk9OVFwiO1xuICAgIEdGWFN0ZW5jaWxGYWNlW0dGWFN0ZW5jaWxGYWNlW1wiQkFDS1wiXSA9IDFdID0gXCJCQUNLXCI7XG4gICAgR0ZYU3RlbmNpbEZhY2VbR0ZYU3RlbmNpbEZhY2VbXCJBTExcIl0gPSAyXSA9IFwiQUxMXCI7XG59KShHRlhTdGVuY2lsRmFjZSB8fCAoR0ZYU3RlbmNpbEZhY2UgPSB7fSkpO1xudmFyIEdGWFF1ZXVlVHlwZTtcbihmdW5jdGlvbiAoR0ZYUXVldWVUeXBlKSB7XG4gICAgR0ZYUXVldWVUeXBlW0dGWFF1ZXVlVHlwZVtcIkdSQVBISUNTXCJdID0gMF0gPSBcIkdSQVBISUNTXCI7XG4gICAgR0ZYUXVldWVUeXBlW0dGWFF1ZXVlVHlwZVtcIkNPTVBVVEVcIl0gPSAxXSA9IFwiQ09NUFVURVwiO1xuICAgIEdGWFF1ZXVlVHlwZVtHRlhRdWV1ZVR5cGVbXCJUUkFOU0ZFUlwiXSA9IDJdID0gXCJUUkFOU0ZFUlwiO1xufSkoR0ZYUXVldWVUeXBlIHx8IChHRlhRdWV1ZVR5cGUgPSB7fSkpO1xudmFyIEdGWENsZWFyRmxhZztcbihmdW5jdGlvbiAoR0ZYQ2xlYXJGbGFnKSB7XG4gICAgR0ZYQ2xlYXJGbGFnW0dGWENsZWFyRmxhZ1tcIk5PTkVcIl0gPSAwXSA9IFwiTk9ORVwiO1xuICAgIEdGWENsZWFyRmxhZ1tHRlhDbGVhckZsYWdbXCJDT0xPUlwiXSA9IDFdID0gXCJDT0xPUlwiO1xuICAgIEdGWENsZWFyRmxhZ1tHRlhDbGVhckZsYWdbXCJERVBUSFwiXSA9IDJdID0gXCJERVBUSFwiO1xuICAgIEdGWENsZWFyRmxhZ1tHRlhDbGVhckZsYWdbXCJTVEVOQ0lMXCJdID0gNF0gPSBcIlNURU5DSUxcIjtcbiAgICBHRlhDbGVhckZsYWdbR0ZYQ2xlYXJGbGFnW1wiREVQVEhfU1RFTkNJTFwiXSA9IDZdID0gXCJERVBUSF9TVEVOQ0lMXCI7XG4gICAgR0ZYQ2xlYXJGbGFnW0dGWENsZWFyRmxhZ1tcIkFMTFwiXSA9IDddID0gXCJBTExcIjtcbn0pKEdGWENsZWFyRmxhZyB8fCAoR0ZYQ2xlYXJGbGFnID0ge30pKTtcbmZ1bmN0aW9uIEdGWEdldFR5cGVTaXplKHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBHRlhUeXBlLkJPT0w6XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5JTlQ6XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5VSU5UOlxuICAgICAgICBjYXNlIEdGWFR5cGUuRkxPQVQ6IHJldHVybiA0O1xuICAgICAgICBjYXNlIEdGWFR5cGUuQk9PTDI6XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5JTlQyOlxuICAgICAgICBjYXNlIEdGWFR5cGUuVUlOVDI6XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5GTE9BVDI6IHJldHVybiA4O1xuICAgICAgICBjYXNlIEdGWFR5cGUuQk9PTDM6XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5JTlQzOlxuICAgICAgICBjYXNlIEdGWFR5cGUuVUlOVDM6XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5GTE9BVDM6IHJldHVybiAxMjtcbiAgICAgICAgY2FzZSBHRlhUeXBlLkJPT0w0OlxuICAgICAgICBjYXNlIEdGWFR5cGUuSU5UNDpcbiAgICAgICAgY2FzZSBHRlhUeXBlLlVJTlQ0OlxuICAgICAgICBjYXNlIEdGWFR5cGUuRkxPQVQ0OlxuICAgICAgICBjYXNlIEdGWFR5cGUuTUFUMjogcmV0dXJuIDE2O1xuICAgICAgICBjYXNlIEdGWFR5cGUuTUFUMlgzOiByZXR1cm4gMjQ7XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5NQVQyWDQ6IHJldHVybiAzMjtcbiAgICAgICAgY2FzZSBHRlhUeXBlLk1BVDNYMjogcmV0dXJuIDI0O1xuICAgICAgICBjYXNlIEdGWFR5cGUuTUFUMzogcmV0dXJuIDM2O1xuICAgICAgICBjYXNlIEdGWFR5cGUuTUFUM1g0OiByZXR1cm4gNDg7XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5NQVQ0WDI6IHJldHVybiAzMjtcbiAgICAgICAgY2FzZSBHRlhUeXBlLk1BVDRYMjogcmV0dXJuIDMyO1xuICAgICAgICBjYXNlIEdGWFR5cGUuTUFUNDogcmV0dXJuIDY0O1xuICAgICAgICBjYXNlIEdGWFR5cGUuU0FNUExFUjFEOlxuICAgICAgICBjYXNlIEdGWFR5cGUuU0FNUExFUjFEX0FSUkFZOlxuICAgICAgICBjYXNlIEdGWFR5cGUuU0FNUExFUjJEOlxuICAgICAgICBjYXNlIEdGWFR5cGUuU0FNUExFUjJEX0FSUkFZOlxuICAgICAgICBjYXNlIEdGWFR5cGUuU0FNUExFUjNEOlxuICAgICAgICBjYXNlIEdGWFR5cGUuU0FNUExFUl9DVUJFOiByZXR1cm4gNDtcbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIGltcG9ydCB7IEdGWEJ1ZmZlciB9IGZyb20gJy4uL2dmeC9idWZmZXInO1xudmFyIFJlbmRlclBhc3NTdGFnZTtcbihmdW5jdGlvbiAoUmVuZGVyUGFzc1N0YWdlKSB7XG4gICAgUmVuZGVyUGFzc1N0YWdlW1JlbmRlclBhc3NTdGFnZVtcIkRFRkFVTFRcIl0gPSAxMDBdID0gXCJERUZBVUxUXCI7XG59KShSZW5kZXJQYXNzU3RhZ2UgfHwgKFJlbmRlclBhc3NTdGFnZSA9IHt9KSk7XG52YXIgUmVuZGVyUHJpb3JpdHk7XG4oZnVuY3Rpb24gKFJlbmRlclByaW9yaXR5KSB7XG4gICAgUmVuZGVyUHJpb3JpdHlbUmVuZGVyUHJpb3JpdHlbXCJNSU5cIl0gPSAwXSA9IFwiTUlOXCI7XG4gICAgUmVuZGVyUHJpb3JpdHlbUmVuZGVyUHJpb3JpdHlbXCJNQVhcIl0gPSAyNTVdID0gXCJNQVhcIjtcbiAgICBSZW5kZXJQcmlvcml0eVtSZW5kZXJQcmlvcml0eVtcIkRFRkFVTFRcIl0gPSAxMjhdID0gXCJERUZBVUxUXCI7XG59KShSZW5kZXJQcmlvcml0eSB8fCAoUmVuZGVyUHJpb3JpdHkgPSB7fSkpO1xudmFyIE1BWF9CSU5ESU5HX1NVUFBPUlRFRCA9IDI0OyAvLyBmcm9tIFdlYkdMIDIgc3BlY1xudmFyIFVuaWZvcm1CaW5kaW5nO1xuKGZ1bmN0aW9uIChVbmlmb3JtQmluZGluZykge1xuICAgIC8vIFVCT3NcbiAgICBVbmlmb3JtQmluZGluZ1tVbmlmb3JtQmluZGluZ1tcIlVCT19HTE9CQUxcIl0gPSBNQVhfQklORElOR19TVVBQT1JURUQgLSAxXSA9IFwiVUJPX0dMT0JBTFwiO1xuICAgIFVuaWZvcm1CaW5kaW5nW1VuaWZvcm1CaW5kaW5nW1wiVUJPX1NIQURPV1wiXSA9IE1BWF9CSU5ESU5HX1NVUFBPUlRFRCAtIDJdID0gXCJVQk9fU0hBRE9XXCI7XG4gICAgVW5pZm9ybUJpbmRpbmdbVW5pZm9ybUJpbmRpbmdbXCJVQk9fTE9DQUxcIl0gPSBNQVhfQklORElOR19TVVBQT1JURUQgLSAzXSA9IFwiVUJPX0xPQ0FMXCI7XG4gICAgVW5pZm9ybUJpbmRpbmdbVW5pZm9ybUJpbmRpbmdbXCJVQk9fRk9SV0FSRF9MSUdIVFNcIl0gPSBNQVhfQklORElOR19TVVBQT1JURUQgLSA0XSA9IFwiVUJPX0ZPUldBUkRfTElHSFRTXCI7XG4gICAgVW5pZm9ybUJpbmRpbmdbVW5pZm9ybUJpbmRpbmdbXCJVQk9fU0tJTk5JTkdcIl0gPSBNQVhfQklORElOR19TVVBQT1JURUQgLSA1XSA9IFwiVUJPX1NLSU5OSU5HXCI7XG4gICAgVW5pZm9ybUJpbmRpbmdbVW5pZm9ybUJpbmRpbmdbXCJVQk9fU0tJTk5JTkdfVEVYVFVSRVwiXSA9IE1BWF9CSU5ESU5HX1NVUFBPUlRFRCAtIDZdID0gXCJVQk9fU0tJTk5JTkdfVEVYVFVSRVwiO1xuICAgIFVuaWZvcm1CaW5kaW5nW1VuaWZvcm1CaW5kaW5nW1wiVUJPX1VJXCJdID0gTUFYX0JJTkRJTkdfU1VQUE9SVEVEIC0gN10gPSBcIlVCT19VSVwiO1xuICAgIC8vIHNhbXBsZXJzXG4gICAgVW5pZm9ybUJpbmRpbmdbVW5pZm9ybUJpbmRpbmdbXCJTQU1QTEVSX0pPSU5UU1wiXSA9IE1BWF9CSU5ESU5HX1NVUFBPUlRFRCArIDFdID0gXCJTQU1QTEVSX0pPSU5UU1wiO1xuICAgIFVuaWZvcm1CaW5kaW5nW1VuaWZvcm1CaW5kaW5nW1wiU0FNUExFUl9FTlZJUk9OTUVOVFwiXSA9IE1BWF9CSU5ESU5HX1NVUFBPUlRFRCArIDJdID0gXCJTQU1QTEVSX0VOVklST05NRU5UXCI7XG4gICAgLy8gcm9vbXMgbGVmdCBmb3IgY3VzdG9tIGJpbmRpbmdzXG4gICAgLy8gZWZmZWN0IGltcG9ydGVyIHByZXBhcmVzIGJpbmRpbmdzIGFjY29yZGluZyB0byB0aGlzXG4gICAgVW5pZm9ybUJpbmRpbmdbVW5pZm9ybUJpbmRpbmdbXCJDVVNUVU1fVUJPX0JJTkRJTkdfRU5EX1BPSU5UXCJdID0gTUFYX0JJTkRJTkdfU1VQUE9SVEVEIC0gN10gPSBcIkNVU1RVTV9VQk9fQklORElOR19FTkRfUE9JTlRcIjtcbiAgICBVbmlmb3JtQmluZGluZ1tVbmlmb3JtQmluZGluZ1tcIkNVU1RPTV9TQU1QTEVSX0JJTkRJTkdfU1RBUlRfUE9JTlRcIl0gPSBNQVhfQklORElOR19TVVBQT1JURUQgKyA2XSA9IFwiQ1VTVE9NX1NBTVBMRVJfQklORElOR19TVEFSVF9QT0lOVFwiO1xufSkoVW5pZm9ybUJpbmRpbmcgfHwgKFVuaWZvcm1CaW5kaW5nID0ge30pKTtcbi8vIGV4cG9ydCBjbGFzcyBVQk9HbG9iYWwge1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgVElNRV9PRkZTRVQ6IG51bWJlciA9IDA7XG4vLyAgICAgcHVibGljIHN0YXRpYyBTQ1JFRU5fU0laRV9PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5USU1FX09GRlNFVCArIDQ7XG4vLyAgICAgcHVibGljIHN0YXRpYyBTQ1JFRU5fU0NBTEVfT0ZGU0VUOiBudW1iZXIgPSBVQk9HbG9iYWwuU0NSRUVOX1NJWkVfT0ZGU0VUICsgNDtcbi8vICAgICBwdWJsaWMgc3RhdGljIE5BVElWRV9TSVpFX09GRlNFVDogbnVtYmVyID0gVUJPR2xvYmFsLlNDUkVFTl9TQ0FMRV9PRkZTRVQgKyA0O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgTUFUX1ZJRVdfT0ZGU0VUOiBudW1iZXIgPSBVQk9HbG9iYWwuTkFUSVZFX1NJWkVfT0ZGU0VUICsgNDtcbi8vICAgICBwdWJsaWMgc3RhdGljIE1BVF9WSUVXX0lOVl9PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5NQVRfVklFV19PRkZTRVQgKyAxNjtcbi8vICAgICBwdWJsaWMgc3RhdGljIE1BVF9QUk9KX09GRlNFVDogbnVtYmVyID0gVUJPR2xvYmFsLk1BVF9WSUVXX0lOVl9PRkZTRVQgKyAxNjtcbi8vICAgICBwdWJsaWMgc3RhdGljIE1BVF9QUk9KX0lOVl9PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5NQVRfUFJPSl9PRkZTRVQgKyAxNjtcbi8vICAgICBwdWJsaWMgc3RhdGljIE1BVF9WSUVXX1BST0pfT0ZGU0VUOiBudW1iZXIgPSBVQk9HbG9iYWwuTUFUX1BST0pfSU5WX09GRlNFVCArIDE2O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgTUFUX1ZJRVdfUFJPSl9JTlZfT0ZGU0VUOiBudW1iZXIgPSBVQk9HbG9iYWwuTUFUX1ZJRVdfUFJPSl9PRkZTRVQgKyAxNjtcbi8vICAgICBwdWJsaWMgc3RhdGljIENBTUVSQV9QT1NfT0ZGU0VUOiBudW1iZXIgPSBVQk9HbG9iYWwuTUFUX1ZJRVdfUFJPSl9JTlZfT0ZGU0VUICsgMTY7XG4vLyAgICAgcHVibGljIHN0YXRpYyBFWFBPU1VSRV9PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5DQU1FUkFfUE9TX09GRlNFVCArIDQ7XG4vLyAgICAgcHVibGljIHN0YXRpYyBNQUlOX0xJVF9ESVJfT0ZGU0VUOiBudW1iZXIgPSBVQk9HbG9iYWwuRVhQT1NVUkVfT0ZGU0VUICsgNDtcbi8vICAgICBwdWJsaWMgc3RhdGljIE1BSU5fTElUX0NPTE9SX09GRlNFVDogbnVtYmVyID0gVUJPR2xvYmFsLk1BSU5fTElUX0RJUl9PRkZTRVQgKyA0O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgQU1CSUVOVF9TS1lfT0ZGU0VUOiBudW1iZXIgPSBVQk9HbG9iYWwuTUFJTl9MSVRfQ09MT1JfT0ZGU0VUICsgNDtcbi8vICAgICBwdWJsaWMgc3RhdGljIEFNQklFTlRfR1JPVU5EX09GRlNFVDogbnVtYmVyID0gVUJPR2xvYmFsLkFNQklFTlRfU0tZX09GRlNFVCArIDQ7XG4vLyAgICAgcHVibGljIHN0YXRpYyBDT1VOVDogbnVtYmVyID0gVUJPR2xvYmFsLkFNQklFTlRfR1JPVU5EX09GRlNFVCArIDQ7XG4vLyAgICAgcHVibGljIHN0YXRpYyBTSVpFOiBudW1iZXIgPSBVQk9HbG9iYWwuQ09VTlQgKiA0O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgQkxPQ0s6IEdGWFVuaWZvcm1CbG9jayA9IHtcbi8vICAgICAgICAgYmluZGluZzogVW5pZm9ybUJpbmRpbmcuVUJPX0dMT0JBTCwgbmFtZTogJ0NDR2xvYmFsJywgbWVtYmVyczogW1xuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2NfdGltZScsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogMSB9LFxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2Nfc2NyZWVuU2l6ZScsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogMSB9LFxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2Nfc2NyZWVuU2NhbGUnLCB0eXBlOiBHRlhUeXBlLkZMT0FUNCwgY291bnQ6IDEgfSxcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX25hdGl2ZVNpemUnLCB0eXBlOiBHRlhUeXBlLkZMT0FUNCwgY291bnQ6IDEgfSxcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX21hdFZpZXcnLCB0eXBlOiBHRlhUeXBlLk1BVDQsIGNvdW50OiAxIH0sXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19tYXRWaWV3SW52JywgdHlwZTogR0ZYVHlwZS5NQVQ0LCBjb3VudDogMSB9LFxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2NfbWF0UHJvaicsIHR5cGU6IEdGWFR5cGUuTUFUNCwgY291bnQ6IDEgfSxcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX21hdFByb2pJbnYnLCB0eXBlOiBHRlhUeXBlLk1BVDQsIGNvdW50OiAxIH0sXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19tYXRWaWV3UHJvaicsIHR5cGU6IEdGWFR5cGUuTUFUNCwgY291bnQ6IDEgfSxcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX21hdFZpZXdQcm9qSW52JywgdHlwZTogR0ZYVHlwZS5NQVQ0LCBjb3VudDogMSB9LFxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2NfY2FtZXJhUG9zJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiAxIH0sXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19leHBvc3VyZScsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogMSB9LFxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2NfbWFpbkxpdERpcicsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogMSB9LFxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2NfbWFpbkxpdENvbG9yJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiAxIH0sXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19hbWJpZW50U2t5JywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiAxIH0sXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19hbWJpZW50R3JvdW5kJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiAxIH0sXG4vLyAgICAgICAgIF0sXG4vLyAgICAgfTtcbi8vICAgICBwdWJsaWMgdmlldzogRmxvYXQzMkFycmF5ID0gbmV3IEZsb2F0MzJBcnJheShVQk9HbG9iYWwuQ09VTlQpO1xuLy8gfVxuLy8gZXhwb3J0IGNsYXNzIFVCT1NoYWRvdyB7XG4vLyAgICAgcHVibGljIHN0YXRpYyBNQVRfTElHSFRfUExBTkVfUFJPSl9PRkZTRVQ6IG51bWJlciA9IDA7XG4vLyAgICAgcHVibGljIHN0YXRpYyBTSEFET1dfQ09MT1JfT0ZGU0VUOiBudW1iZXIgPSBVQk9TaGFkb3cuTUFUX0xJR0hUX1BMQU5FX1BST0pfT0ZGU0VUICsgMTY7XG4vLyAgICAgcHVibGljIHN0YXRpYyBDT1VOVDogbnVtYmVyID0gVUJPU2hhZG93LlNIQURPV19DT0xPUl9PRkZTRVQgKyA0O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgU0laRTogbnVtYmVyID0gVUJPU2hhZG93LkNPVU5UICogNDtcbi8vICAgICBwdWJsaWMgc3RhdGljIEJMT0NLOiBHRlhVbmlmb3JtQmxvY2sgPSB7XG4vLyAgICAgICAgIGJpbmRpbmc6IFVuaWZvcm1CaW5kaW5nLlVCT19TSEFET1csIG5hbWU6ICdDQ1NoYWRvdycsIG1lbWJlcnM6IFtcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX21hdExpZ2h0UGxhbmVQcm9qJywgdHlwZTogR0ZYVHlwZS5NQVQ0LCBjb3VudDogMSB9LFxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2Nfc2hhZG93Q29sb3InLCB0eXBlOiBHRlhUeXBlLkZMT0FUNCwgY291bnQ6IDEgfSxcbi8vICAgICAgICAgXSxcbi8vICAgICB9O1xuLy8gICAgIHB1YmxpYyB2aWV3OiBGbG9hdDMyQXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KFVCT1NoYWRvdy5DT1VOVCk7XG4vLyB9XG4vLyBleHBvcnQgY29uc3QgbG9jYWxCaW5kaW5nc0Rlc2M6IE1hcDxzdHJpbmcsIElJbnRlcm5hbEJpbmRpbmdEZXNjPiA9IG5ldyBNYXA8c3RyaW5nLCBJSW50ZXJuYWxCaW5kaW5nRGVzYz4oKTtcbi8vIGV4cG9ydCBjbGFzcyBVQk9Mb2NhbCB7XG4vLyAgICAgcHVibGljIHN0YXRpYyBNQVRfV09STERfT0ZGU0VUOiBudW1iZXIgPSAwO1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgTUFUX1dPUkxEX0lUX09GRlNFVDogbnVtYmVyID0gVUJPTG9jYWwuTUFUX1dPUkxEX09GRlNFVCArIDE2O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgQ09VTlQ6IG51bWJlciA9IFVCT0xvY2FsLk1BVF9XT1JMRF9JVF9PRkZTRVQgKyAxNjtcbi8vICAgICBwdWJsaWMgc3RhdGljIFNJWkU6IG51bWJlciA9IFVCT0xvY2FsLkNPVU5UICogNDtcbi8vICAgICBwdWJsaWMgc3RhdGljIEJMT0NLOiBHRlhVbmlmb3JtQmxvY2sgPSB7XG4vLyAgICAgICAgIGJpbmRpbmc6IFVuaWZvcm1CaW5kaW5nLlVCT19MT0NBTCwgbmFtZTogJ0NDTG9jYWwnLCBtZW1iZXJzOiBbXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19tYXRXb3JsZCcsIHR5cGU6IEdGWFR5cGUuTUFUNCwgY291bnQ6IDEgfSxcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX21hdFdvcmxkSVQnLCB0eXBlOiBHRlhUeXBlLk1BVDQsIGNvdW50OiAxIH0sXG4vLyAgICAgICAgIF0sXG4vLyAgICAgfTtcbi8vICAgICBwdWJsaWMgdmlldzogRmxvYXQzMkFycmF5ID0gbmV3IEZsb2F0MzJBcnJheShVQk9Mb2NhbC5DT1VOVCk7XG4vLyB9XG4vLyBsb2NhbEJpbmRpbmdzRGVzYy5zZXQoVUJPTG9jYWwuQkxPQ0submFtZSwge1xuLy8gICAgIHR5cGU6IEdGWEJpbmRpbmdUeXBlLlVOSUZPUk1fQlVGRkVSLFxuLy8gICAgIGJsb2NrSW5mbzogVUJPTG9jYWwuQkxPQ0ssXG4vLyB9KTtcbi8vIGV4cG9ydCBjbGFzcyBVQk9Gb3J3YXJkTGlnaHQge1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgTUFYX1NQSEVSRV9MSUdIVFMgPSAyO1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgTUFYX1NQT1RfTElHSFRTID0gMjtcbi8vICAgICBwdWJsaWMgc3RhdGljIFNQSEVSRV9MSUdIVF9QT1NfT0ZGU0VUOiBudW1iZXIgPSAwO1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgU1BIRVJFX0xJR0hUX1NJWkVfUkFOR0VfT0ZGU0VUOiBudW1iZXIgPSBVQk9Gb3J3YXJkTGlnaHQuU1BIRVJFX0xJR0hUX1BPU19PRkZTRVQgKyBVQk9Gb3J3YXJkTGlnaHQuTUFYX1NQSEVSRV9MSUdIVFMgKiA0O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgU1BIRVJFX0xJR0hUX0NPTE9SX09GRlNFVDogbnVtYmVyID0gVUJPRm9yd2FyZExpZ2h0LlNQSEVSRV9MSUdIVF9TSVpFX1JBTkdFX09GRlNFVCArIFVCT0ZvcndhcmRMaWdodC5NQVhfU1BIRVJFX0xJR0hUUyAqIDQ7XG4vLyAgICAgcHVibGljIHN0YXRpYyBTUE9UX0xJR0hUX1BPU19PRkZTRVQ6IG51bWJlciA9IFVCT0ZvcndhcmRMaWdodC5TUEhFUkVfTElHSFRfQ09MT1JfT0ZGU0VUICsgVUJPRm9yd2FyZExpZ2h0Lk1BWF9TUE9UX0xJR0hUUyAqIDQ7XG4vLyAgICAgcHVibGljIHN0YXRpYyBTUE9UX0xJR0hUX1NJWkVfUkFOR0VfQU5HTEVfT0ZGU0VUOiBudW1iZXIgPSBVQk9Gb3J3YXJkTGlnaHQuU1BPVF9MSUdIVF9QT1NfT0ZGU0VUICsgVUJPRm9yd2FyZExpZ2h0Lk1BWF9TUE9UX0xJR0hUUyAqIDQ7XG4vLyAgICAgcHVibGljIHN0YXRpYyBTUE9UX0xJR0hUX0RJUl9PRkZTRVQ6IG51bWJlciA9IFVCT0ZvcndhcmRMaWdodC5TUE9UX0xJR0hUX1NJWkVfUkFOR0VfQU5HTEVfT0ZGU0VUICsgVUJPRm9yd2FyZExpZ2h0Lk1BWF9TUE9UX0xJR0hUUyAqIDQ7XG4vLyAgICAgcHVibGljIHN0YXRpYyBTUE9UX0xJR0hUX0NPTE9SX09GRlNFVDogbnVtYmVyID0gVUJPRm9yd2FyZExpZ2h0LlNQT1RfTElHSFRfRElSX09GRlNFVCArIFVCT0ZvcndhcmRMaWdodC5NQVhfU1BPVF9MSUdIVFMgKiA0O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgQ09VTlQ6IG51bWJlciA9IFVCT0ZvcndhcmRMaWdodC5TUE9UX0xJR0hUX0NPTE9SX09GRlNFVCArIFVCT0ZvcndhcmRMaWdodC5NQVhfU1BPVF9MSUdIVFMgKiA0O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgU0laRTogbnVtYmVyID0gVUJPRm9yd2FyZExpZ2h0LkNPVU5UICogNDtcbi8vICAgICBwdWJsaWMgc3RhdGljIEJMT0NLOiBHRlhVbmlmb3JtQmxvY2sgPSB7XG4vLyAgICAgICAgIGJpbmRpbmc6IFVuaWZvcm1CaW5kaW5nLlVCT19GT1JXQVJEX0xJR0hUUywgbmFtZTogJ0NDRm9yd2FyZExpZ2h0JywgbWVtYmVyczogW1xuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2Nfc3BoZXJlTGl0UG9zJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiBVQk9Gb3J3YXJkTGlnaHQuTUFYX1NQSEVSRV9MSUdIVFMgfSxcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX3NwaGVyZUxpdFNpemVSYW5nZScsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogVUJPRm9yd2FyZExpZ2h0Lk1BWF9TUEhFUkVfTElHSFRTIH0sXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19zcGhlcmVMaXRDb2xvcicsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogVUJPRm9yd2FyZExpZ2h0Lk1BWF9TUEhFUkVfTElHSFRTIH0sXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19zcG90TGl0UG9zJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiBVQk9Gb3J3YXJkTGlnaHQuTUFYX1NQT1RfTElHSFRTIH0sXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19zcG90TGl0U2l6ZVJhbmdlQW5nbGUnLCB0eXBlOiBHRlhUeXBlLkZMT0FUNCwgY291bnQ6IFVCT0ZvcndhcmRMaWdodC5NQVhfU1BPVF9MSUdIVFMgfSxcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX3Nwb3RMaXREaXInLCB0eXBlOiBHRlhUeXBlLkZMT0FUNCwgY291bnQ6IFVCT0ZvcndhcmRMaWdodC5NQVhfU1BPVF9MSUdIVFMgfSxcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX3Nwb3RMaXRDb2xvcicsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogVUJPRm9yd2FyZExpZ2h0Lk1BWF9TUE9UX0xJR0hUUyB9LFxuLy8gICAgICAgICBdLFxuLy8gICAgIH07XG4vLyAgICAgcHVibGljIHZpZXc6IEZsb2F0MzJBcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoVUJPRm9yd2FyZExpZ2h0LkNPVU5UKTtcbi8vIH1cbi8vIGxvY2FsQmluZGluZ3NEZXNjLnNldChVQk9Gb3J3YXJkTGlnaHQuQkxPQ0submFtZSwge1xuLy8gICAgIHR5cGU6IEdGWEJpbmRpbmdUeXBlLlVOSUZPUk1fQlVGRkVSLFxuLy8gICAgIGJsb2NrSW5mbzogVUJPRm9yd2FyZExpZ2h0LkJMT0NLLFxuLy8gfSk7XG4vLyBleHBvcnQgY2xhc3MgVUJPU2tpbm5pbmcge1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgTUFUX0pPSU5UX09GRlNFVDogbnVtYmVyID0gMDtcbi8vICAgICBwdWJsaWMgc3RhdGljIEpPSU5UU19URVhUVVJFX1NJWkVfT0ZGU0VUOiBudW1iZXIgPSBVQk9Ta2lubmluZy5NQVRfSk9JTlRfT0ZGU0VUICsgMTI4ICogMTY7XG4vLyAgICAgcHVibGljIHN0YXRpYyBDT1VOVDogbnVtYmVyID0gVUJPU2tpbm5pbmcuSk9JTlRTX1RFWFRVUkVfU0laRV9PRkZTRVQgKyA0O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgU0laRTogbnVtYmVyID0gVUJPU2tpbm5pbmcuQ09VTlQgKiA0O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgQkxPQ0s6IEdGWFVuaWZvcm1CbG9jayA9IHtcbi8vICAgICAgICAgYmluZGluZzogVW5pZm9ybUJpbmRpbmcuVUJPX1NLSU5OSU5HLCBuYW1lOiAnQ0NTa2lubmluZycsIG1lbWJlcnM6IFtcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX21hdEpvaW50JywgdHlwZTogR0ZYVHlwZS5NQVQ0LCBjb3VudDogMTI4IH0sXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19qb2ludHNUZXh0dXJlU2l6ZScsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogMSB9LFxuLy8gICAgICAgICBdLFxuLy8gICAgIH07XG4vLyB9XG4vLyBsb2NhbEJpbmRpbmdzRGVzYy5zZXQoVUJPU2tpbm5pbmcuQkxPQ0submFtZSwge1xuLy8gICAgIHR5cGU6IEdGWEJpbmRpbmdUeXBlLlVOSUZPUk1fQlVGRkVSLFxuLy8gICAgIGJsb2NrSW5mbzogVUJPU2tpbm5pbmcuQkxPQ0ssXG4vLyB9KTtcbi8vIGV4cG9ydCBjb25zdCBVTklGT1JNX0pPSU5UU19URVhUVVJFOiBHRlhVbmlmb3JtU2FtcGxlciA9IHtcbi8vICAgICBiaW5kaW5nOiBVbmlmb3JtQmluZGluZy5TQU1QTEVSX0pPSU5UUywgbmFtZTogJ2NjX2pvaW50c1RleHR1cmUnLCB0eXBlOiBHRlhUeXBlLlNBTVBMRVIyRCwgY291bnQ6IDEsXG4vLyB9O1xuLy8gbG9jYWxCaW5kaW5nc0Rlc2Muc2V0KFVOSUZPUk1fSk9JTlRTX1RFWFRVUkUubmFtZSwge1xuLy8gICAgIHR5cGU6IEdGWEJpbmRpbmdUeXBlLlNBTVBMRVIsXG4vLyAgICAgc2FtcGxlckluZm86IFVOSUZPUk1fSk9JTlRTX1RFWFRVUkUsXG4vLyB9KTtcbi8vIGV4cG9ydCBpbnRlcmZhY2UgSUludGVybmFsQmluZGluZ0Rlc2Mge1xuLy8gICAgIHR5cGU6IEdGWEJpbmRpbmdUeXBlO1xuLy8gICAgIGJsb2NrSW5mbz86IEdGWFVuaWZvcm1CbG9jaztcbi8vICAgICBzYW1wbGVySW5mbz86IEdGWFVuaWZvcm1TYW1wbGVyO1xuLy8gfVxuLy8gZXhwb3J0IGludGVyZmFjZSBJSW50ZXJuYWxCaW5kaW5nSW5zdCBleHRlbmRzIElJbnRlcm5hbEJpbmRpbmdEZXNjIHtcbi8vICAgICBidWZmZXI/OiBHRlhCdWZmZXI7XG4vLyAgICAgc2FtcGxlcj86IEdGWFNhbXBsZXI7XG4vLyAgICAgdGV4dHVyZVZpZXc/OiBHRlhUZXh0dXJlVmlldztcbi8vIH1cblxuLy8gdGhpcyBmaWxlIGlzIHVzZWQgZm9yIG9mZmxpbmUgZWZmZWN0IGJ1aWxkaW5nLlxudmFyIF9hLCBfYjtcbnZhciBTYW1wbGVySW5mb0luZGV4O1xuKGZ1bmN0aW9uIChTYW1wbGVySW5mb0luZGV4KSB7XG4gICAgU2FtcGxlckluZm9JbmRleFtTYW1wbGVySW5mb0luZGV4W1wibWluRmlsdGVyXCJdID0gMF0gPSBcIm1pbkZpbHRlclwiO1xuICAgIFNhbXBsZXJJbmZvSW5kZXhbU2FtcGxlckluZm9JbmRleFtcIm1hZ0ZpbHRlclwiXSA9IDFdID0gXCJtYWdGaWx0ZXJcIjtcbiAgICBTYW1wbGVySW5mb0luZGV4W1NhbXBsZXJJbmZvSW5kZXhbXCJtaXBGaWx0ZXJcIl0gPSAyXSA9IFwibWlwRmlsdGVyXCI7XG4gICAgU2FtcGxlckluZm9JbmRleFtTYW1wbGVySW5mb0luZGV4W1wiYWRkcmVzc1VcIl0gPSAzXSA9IFwiYWRkcmVzc1VcIjtcbiAgICBTYW1wbGVySW5mb0luZGV4W1NhbXBsZXJJbmZvSW5kZXhbXCJhZGRyZXNzVlwiXSA9IDRdID0gXCJhZGRyZXNzVlwiO1xuICAgIFNhbXBsZXJJbmZvSW5kZXhbU2FtcGxlckluZm9JbmRleFtcImFkZHJlc3NXXCJdID0gNV0gPSBcImFkZHJlc3NXXCI7XG4gICAgU2FtcGxlckluZm9JbmRleFtTYW1wbGVySW5mb0luZGV4W1wibWF4QW5pc290cm9weVwiXSA9IDZdID0gXCJtYXhBbmlzb3Ryb3B5XCI7XG4gICAgU2FtcGxlckluZm9JbmRleFtTYW1wbGVySW5mb0luZGV4W1wiY21wRnVuY1wiXSA9IDddID0gXCJjbXBGdW5jXCI7XG4gICAgU2FtcGxlckluZm9JbmRleFtTYW1wbGVySW5mb0luZGV4W1wibWluTE9EXCJdID0gOF0gPSBcIm1pbkxPRFwiO1xuICAgIFNhbXBsZXJJbmZvSW5kZXhbU2FtcGxlckluZm9JbmRleFtcIm1heExPRFwiXSA9IDldID0gXCJtYXhMT0RcIjtcbiAgICBTYW1wbGVySW5mb0luZGV4W1NhbXBsZXJJbmZvSW5kZXhbXCJtaXBMT0RCaWFzXCJdID0gMTBdID0gXCJtaXBMT0RCaWFzXCI7XG4gICAgU2FtcGxlckluZm9JbmRleFtTYW1wbGVySW5mb0luZGV4W1wiYm9yZGVyQ29sb3JcIl0gPSAxMV0gPSBcImJvcmRlckNvbG9yXCI7XG4gICAgU2FtcGxlckluZm9JbmRleFtTYW1wbGVySW5mb0luZGV4W1widG90YWxcIl0gPSAxNV0gPSBcInRvdGFsXCI7XG59KShTYW1wbGVySW5mb0luZGV4IHx8IChTYW1wbGVySW5mb0luZGV4ID0ge30pKTtcbnZhciB0eXBlTWFwID0ge307XG50eXBlTWFwW3R5cGVNYXBbJ2Jvb2wnXSA9IEdGWFR5cGUuQk9PTF0gPSAnYm9vbCc7XG50eXBlTWFwW3R5cGVNYXBbJ2ludCddID0gR0ZYVHlwZS5JTlRdID0gJ2ludCc7XG50eXBlTWFwW3R5cGVNYXBbJ2l2ZWMyJ10gPSBHRlhUeXBlLklOVDJdID0gJ2l2ZWMyaW52VHlwZVBhcmFtcyc7XG50eXBlTWFwW3R5cGVNYXBbJ2l2ZWMzJ10gPSBHRlhUeXBlLklOVDNdID0gJ2l2ZWMzJztcbnR5cGVNYXBbdHlwZU1hcFsnaXZlYzQnXSA9IEdGWFR5cGUuSU5UNF0gPSAnaXZlYzQnO1xudHlwZU1hcFt0eXBlTWFwWydmbG9hdCddID0gR0ZYVHlwZS5GTE9BVF0gPSAnZmxvYXQnO1xudHlwZU1hcFt0eXBlTWFwWyd2ZWMyJ10gPSBHRlhUeXBlLkZMT0FUMl0gPSAndmVjMic7XG50eXBlTWFwW3R5cGVNYXBbJ3ZlYzMnXSA9IEdGWFR5cGUuRkxPQVQzXSA9ICd2ZWMzJztcbnR5cGVNYXBbdHlwZU1hcFsndmVjNCddID0gR0ZYVHlwZS5GTE9BVDRdID0gJ3ZlYzQnO1xudHlwZU1hcFt0eXBlTWFwWydtYXQyJ10gPSBHRlhUeXBlLk1BVDJdID0gJ21hdDInO1xudHlwZU1hcFt0eXBlTWFwWydtYXQzJ10gPSBHRlhUeXBlLk1BVDNdID0gJ21hdDMnO1xudHlwZU1hcFt0eXBlTWFwWydtYXQ0J10gPSBHRlhUeXBlLk1BVDRdID0gJ21hdDQnO1xudHlwZU1hcFt0eXBlTWFwWydzYW1wbGVyMkQnXSA9IEdGWFR5cGUuU0FNUExFUjJEXSA9ICdzYW1wbGVyMkQnO1xudHlwZU1hcFt0eXBlTWFwWydzYW1wbGVyQ3ViZSddID0gR0ZYVHlwZS5TQU1QTEVSX0NVQkVdID0gJ3NhbXBsZXJDdWJlJztcbnZhciBzaXplTWFwID0gKF9hID0ge30sXG4gICAgX2FbR0ZYVHlwZS5CT09MXSA9IDQsXG4gICAgX2FbR0ZYVHlwZS5JTlRdID0gNCxcbiAgICBfYVtHRlhUeXBlLklOVDJdID0gOCxcbiAgICBfYVtHRlhUeXBlLklOVDNdID0gMTIsXG4gICAgX2FbR0ZYVHlwZS5JTlQ0XSA9IDE2LFxuICAgIF9hW0dGWFR5cGUuRkxPQVRdID0gNCxcbiAgICBfYVtHRlhUeXBlLkZMT0FUMl0gPSA4LFxuICAgIF9hW0dGWFR5cGUuRkxPQVQzXSA9IDEyLFxuICAgIF9hW0dGWFR5cGUuRkxPQVQ0XSA9IDE2LFxuICAgIF9hW0dGWFR5cGUuTUFUMl0gPSAxNixcbiAgICBfYVtHRlhUeXBlLk1BVDNdID0gMzYsXG4gICAgX2FbR0ZYVHlwZS5NQVQ0XSA9IDY0LFxuICAgIF9hW0dGWFR5cGUuU0FNUExFUjJEXSA9IDQsXG4gICAgX2FbR0ZYVHlwZS5TQU1QTEVSX0NVQkVdID0gNCxcbiAgICBfYSk7XG52YXIgZm9ybWF0TWFwID0gKF9iID0ge30sXG4gICAgX2JbR0ZYVHlwZS5CT09MXSA9IEdGWEZvcm1hdC5SMzJJLFxuICAgIF9iW0dGWFR5cGUuSU5UXSA9IEdGWEZvcm1hdC5SMzJJLFxuICAgIF9iW0dGWFR5cGUuSU5UMl0gPSBHRlhGb3JtYXQuUkczMkksXG4gICAgX2JbR0ZYVHlwZS5JTlQzXSA9IEdGWEZvcm1hdC5SR0IzMkksXG4gICAgX2JbR0ZYVHlwZS5JTlQ0XSA9IEdGWEZvcm1hdC5SR0JBMzJJLFxuICAgIF9iW0dGWFR5cGUuRkxPQVRdID0gR0ZYRm9ybWF0LlIzMkYsXG4gICAgX2JbR0ZYVHlwZS5GTE9BVDJdID0gR0ZYRm9ybWF0LlJHMzJGLFxuICAgIF9iW0dGWFR5cGUuRkxPQVQzXSA9IEdGWEZvcm1hdC5SR0IzMkYsXG4gICAgX2JbR0ZYVHlwZS5GTE9BVDRdID0gR0ZYRm9ybWF0LlJHQkEzMkYsXG4gICAgX2IpO1xuLy8gY29uc3QgcGFzc1BhcmFtcyA9IHtcbi8vICAgLy8gY29sb3IgbWFza1xuLy8gICBOT05FOiBnZnguR0ZYQ29sb3JNYXNrLk5PTkUsXG4vLyAgIFI6IGdmeC5HRlhDb2xvck1hc2suUixcbi8vICAgRzogZ2Z4LkdGWENvbG9yTWFzay5HLFxuLy8gICBCOiBnZnguR0ZYQ29sb3JNYXNrLkIsXG4vLyAgIEE6IGdmeC5HRlhDb2xvck1hc2suQSxcbi8vICAgUkc6IGdmeC5HRlhDb2xvck1hc2suUiB8IGdmeC5HRlhDb2xvck1hc2suRyxcbi8vICAgUkI6IGdmeC5HRlhDb2xvck1hc2suUiB8IGdmeC5HRlhDb2xvck1hc2suQixcbi8vICAgUkE6IGdmeC5HRlhDb2xvck1hc2suUiB8IGdmeC5HRlhDb2xvck1hc2suQSxcbi8vICAgR0I6IGdmeC5HRlhDb2xvck1hc2suRyB8IGdmeC5HRlhDb2xvck1hc2suQixcbi8vICAgR0E6IGdmeC5HRlhDb2xvck1hc2suRyB8IGdmeC5HRlhDb2xvck1hc2suQSxcbi8vICAgQkE6IGdmeC5HRlhDb2xvck1hc2suQiB8IGdmeC5HRlhDb2xvck1hc2suQSxcbi8vICAgUkdCOiBnZnguR0ZYQ29sb3JNYXNrLlIgfCBnZnguR0ZYQ29sb3JNYXNrLkcgfCBnZnguR0ZYQ29sb3JNYXNrLkIsXG4vLyAgIFJHQTogZ2Z4LkdGWENvbG9yTWFzay5SIHwgZ2Z4LkdGWENvbG9yTWFzay5HIHwgZ2Z4LkdGWENvbG9yTWFzay5BLFxuLy8gICBSQkE6IGdmeC5HRlhDb2xvck1hc2suUiB8IGdmeC5HRlhDb2xvck1hc2suQiB8IGdmeC5HRlhDb2xvck1hc2suQSxcbi8vICAgR0JBOiBnZnguR0ZYQ29sb3JNYXNrLkcgfCBnZnguR0ZYQ29sb3JNYXNrLkIgfCBnZnguR0ZYQ29sb3JNYXNrLkEsXG4vLyAgIEFMTDogZ2Z4LkdGWENvbG9yTWFzay5BTEwsXG4vLyAgIC8vIGJsZW5kIG9wZXJhdGlvblxuLy8gICBBREQ6IGdmeC5HRlhCbGVuZE9wLkFERCxcbi8vICAgU1VCOiBnZnguR0ZYQmxlbmRPcC5TVUIsXG4vLyAgIFJFVl9TVUI6IGdmeC5HRlhCbGVuZE9wLlJFVl9TVUIsXG4vLyAgIE1JTjogZ2Z4LkdGWEJsZW5kT3AuTUlOLFxuLy8gICBNQVg6IGdmeC5HRlhCbGVuZE9wLk1BWCxcbi8vICAgLy8gYmxlbmQgZmFjdG9yXG4vLyAgIFpFUk86IGdmeC5HRlhCbGVuZEZhY3Rvci5aRVJPLFxuLy8gICBPTkU6IGdmeC5HRlhCbGVuZEZhY3Rvci5PTkUsXG4vLyAgIFNSQ19BTFBIQTogZ2Z4LkdGWEJsZW5kRmFjdG9yLlNSQ19BTFBIQSxcbi8vICAgRFNUX0FMUEhBOiBnZnguR0ZYQmxlbmRGYWN0b3IuRFNUX0FMUEhBLFxuLy8gICBPTkVfTUlOVVNfU1JDX0FMUEhBOiBnZnguR0ZYQmxlbmRGYWN0b3IuT05FX01JTlVTX1NSQ19BTFBIQSxcbi8vICAgT05FX01JTlVTX0RTVF9BTFBIQTogZ2Z4LkdGWEJsZW5kRmFjdG9yLk9ORV9NSU5VU19EU1RfQUxQSEEsXG4vLyAgIFNSQ19DT0xPUjogZ2Z4LkdGWEJsZW5kRmFjdG9yLlNSQ19DT0xPUixcbi8vICAgRFNUX0NPTE9SOiBnZnguR0ZYQmxlbmRGYWN0b3IuRFNUX0NPTE9SLFxuLy8gICBPTkVfTUlOVVNfU1JDX0NPTE9SOiBnZnguR0ZYQmxlbmRGYWN0b3IuT05FX01JTlVTX1NSQ19DT0xPUixcbi8vICAgT05FX01JTlVTX0RTVF9DT0xPUjogZ2Z4LkdGWEJsZW5kRmFjdG9yLk9ORV9NSU5VU19EU1RfQ09MT1IsXG4vLyAgIFNSQ19BTFBIQV9TQVRVUkFURTogZ2Z4LkdGWEJsZW5kRmFjdG9yLlNSQ19BTFBIQV9TQVRVUkFURSxcbi8vICAgQ09OU1RBTlRfQ09MT1I6IGdmeC5HRlhCbGVuZEZhY3Rvci5DT05TVEFOVF9DT0xPUixcbi8vICAgT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SOiBnZnguR0ZYQmxlbmRGYWN0b3IuT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SLFxuLy8gICBDT05TVEFOVF9BTFBIQTogZ2Z4LkdGWEJsZW5kRmFjdG9yLkNPTlNUQU5UX0FMUEhBLFxuLy8gICBPTkVfTUlOVVNfQ09OU1RBTlRfQUxQSEE6IGdmeC5HRlhCbGVuZEZhY3Rvci5PTkVfTUlOVVNfQ09OU1RBTlRfQUxQSEEsXG4vLyAgIC8vIHN0ZW5jaWwgb3BlcmF0aW9uXG4vLyAgIC8vIFpFUk86IEdGWFN0ZW5jaWxPcC5aRVJPLCAvLyBkdXBsaWNhdGUsIHNhZmVseSByZW1vdmVkIGJlY2F1c2UgZW51bSB2YWx1ZSBpcyhhbmQgYWx3YXlzIHdpbGwgYmUpIHRoZSBzYW1lXG4vLyAgIEtFRVA6IGdmeC5HRlhTdGVuY2lsT3AuS0VFUCxcbi8vICAgUkVQTEFDRTogZ2Z4LkdGWFN0ZW5jaWxPcC5SRVBMQUNFLFxuLy8gICBJTkNSOiBnZnguR0ZYU3RlbmNpbE9wLklOQ1IsXG4vLyAgIERFQ1I6IGdmeC5HRlhTdGVuY2lsT3AuREVDUixcbi8vICAgSU5WRVJUOiBnZnguR0ZYU3RlbmNpbE9wLklOVkVSVCxcbi8vICAgSU5DUl9XUkFQOiBnZnguR0ZYU3RlbmNpbE9wLklOQ1JfV1JBUCxcbi8vICAgREVDUl9XUkFQOiBnZnguR0ZYU3RlbmNpbE9wLkRFQ1JfV1JBUCxcbi8vICAgICAvLyBjb21wYXJpc29uIGZ1bmN0aW9uXG4vLyAgIE5FVkVSOiBnZnguR0ZYQ29tcGFyaXNvbkZ1bmMuTkVWRVIsXG4vLyAgIExFU1M6IGdmeC5HRlhDb21wYXJpc29uRnVuYy5MRVNTLFxuLy8gICBFUVVBTDogZ2Z4LkdGWENvbXBhcmlzb25GdW5jLkVRVUFMLFxuLy8gICBMRVNTX0VRVUFMOiBnZnguR0ZYQ29tcGFyaXNvbkZ1bmMuTEVTU19FUVVBTCxcbi8vICAgR1JFQVRFUjogZ2Z4LkdGWENvbXBhcmlzb25GdW5jLkdSRUFURVIsXG4vLyAgIE5PVF9FUVVBTDogZ2Z4LkdGWENvbXBhcmlzb25GdW5jLk5PVF9FUVVBTCxcbi8vICAgR1JFQVRFUl9FUVVBTDogZ2Z4LkdGWENvbXBhcmlzb25GdW5jLkdSRUFURVJfRVFVQUwsXG4vLyAgIEFMV0FZUzogZ2Z4LkdGWENvbXBhcmlzb25GdW5jLkFMV0FZUyxcbi8vICAgLy8gY3VsbCBtb2RlXG4vLyAgIC8vIE5PTkU6IEdGWEN1bGxNb2RlLk5PTkUsIC8vIGR1cGxpY2F0ZSwgc2FmZWx5IHJlbW92ZWQgYmVjYXVzZSBlbnVtIHZhbHVlIGlzKGFuZCBhbHdheXMgd2lsbCBiZSkgdGhlIHNhbWVcbi8vICAgRlJPTlQ6IGdmeC5HRlhDdWxsTW9kZS5GUk9OVCxcbi8vICAgQkFDSzogZ2Z4LkdGWEN1bGxNb2RlLkJBQ0ssXG4vLyAgIC8vIHNoYWRlIG1vZGVcbi8vICAgR09VUkFORDogZ2Z4LkdGWFNoYWRlTW9kZWwuR09VUkFORCxcbi8vICAgRkxBVDogZ2Z4LkdGWFNoYWRlTW9kZWwuRkxBVCxcbi8vICAgLy8gcG9seWdvbiBtb2RlXG4vLyAgIEZJTEw6IGdmeC5HRlhQb2x5Z29uTW9kZS5GSUxMLFxuLy8gICBMSU5FOiBnZnguR0ZYUG9seWdvbk1vZGUuTElORSxcbi8vICAgUE9JTlQ6IGdmeC5HRlhQb2x5Z29uTW9kZS5QT0lOVCxcbi8vICAgLy8gcHJpbWl0aXZlIG1vZGVcbi8vICAgUE9JTlRfTElTVDogZ2Z4LkdGWFByaW1pdGl2ZU1vZGUuUE9JTlRfTElTVCxcbi8vICAgTElORV9MSVNUOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5MSU5FX0xJU1QsXG4vLyAgIExJTkVfU1RSSVA6IGdmeC5HRlhQcmltaXRpdmVNb2RlLkxJTkVfU1RSSVAsXG4vLyAgIExJTkVfTE9PUDogZ2Z4LkdGWFByaW1pdGl2ZU1vZGUuTElORV9MT09QLFxuLy8gICBUUklBTkdMRV9MSVNUOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5UUklBTkdMRV9MSVNULFxuLy8gICBUUklBTkdMRV9TVFJJUDogZ2Z4LkdGWFByaW1pdGl2ZU1vZGUuVFJJQU5HTEVfU1RSSVAsXG4vLyAgIFRSSUFOR0xFX0ZBTjogZ2Z4LkdGWFByaW1pdGl2ZU1vZGUuVFJJQU5HTEVfRkFOLFxuLy8gICBMSU5FX0xJU1RfQURKQUNFTkNZOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5MSU5FX0xJU1RfQURKQUNFTkNZLFxuLy8gICBMSU5FX1NUUklQX0FESkFDRU5DWTogZ2Z4LkdGWFByaW1pdGl2ZU1vZGUuTElORV9TVFJJUF9BREpBQ0VOQ1ksXG4vLyAgIFRSSUFOR0xFX0xJU1RfQURKQUNFTkNZOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5UUklBTkdMRV9MSVNUX0FESkFDRU5DWSxcbi8vICAgVFJJQU5HTEVfU1RSSVBfQURKQUNFTkNZOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5UUklBTkdMRV9TVFJJUF9BREpBQ0VOQ1ksXG4vLyAgIFRSSUFOR0xFX1BBVENIX0FESkFDRU5DWTogZ2Z4LkdGWFByaW1pdGl2ZU1vZGUuVFJJQU5HTEVfUEFUQ0hfQURKQUNFTkNZLFxuLy8gICBRVUFEX1BBVENIX0xJU1Q6IGdmeC5HRlhQcmltaXRpdmVNb2RlLlFVQURfUEFUQ0hfTElTVCxcbi8vICAgSVNPX0xJTkVfTElTVDogZ2Z4LkdGWFByaW1pdGl2ZU1vZGUuSVNPX0xJTkVfTElTVCxcbi8vICAgLy8gUE9JTlQ6IGdmeC5HRlhGaWx0ZXIuUE9JTlQsIC8vIGR1cGxpY2F0ZSwgc2FmZWx5IHJlbW92ZWQgYmVjYXVzZSBlbnVtIHZhbHVlIGlzKGFuZCBhbHdheXMgd2lsbCBiZSkgdGhlIHNhbWVcbi8vICAgTElORUFSOiBnZnguR0ZYRmlsdGVyLkxJTkVBUixcbi8vICAgQU5JU09UUk9QSUM6IGdmeC5HRlhGaWx0ZXIuQU5JU09UUk9QSUMsXG4vLyAgIFdSQVA6IGdmeC5HRlhBZGRyZXNzLldSQVAsXG4vLyAgIE1JUlJPUjogZ2Z4LkdGWEFkZHJlc3MuTUlSUk9SLFxuLy8gICBDTEFNUDogZ2Z4LkdGWEFkZHJlc3MuQ0xBTVAsXG4vLyAgIEJPUkRFUjogZ2Z4LkdGWEFkZHJlc3MuQk9SREVSLFxuLy8gICBWSUVXUE9SVDogZ2Z4LkdGWER5bmFtaWNTdGF0ZS5WSUVXUE9SVCxcbi8vICAgU0NJU1NPUjogZ2Z4LkdGWER5bmFtaWNTdGF0ZS5TQ0lTU09SLFxuLy8gICBMSU5FX1dJRFRIOiBnZnguR0ZYRHluYW1pY1N0YXRlLkxJTkVfV0lEVEgsXG4vLyAgIERFUFRIX0JJQVM6IGdmeC5HRlhEeW5hbWljU3RhdGUuREVQVEhfQklBUyxcbi8vICAgQkxFTkRfQ09OU1RBTlRTOiBnZnguR0ZYRHluYW1pY1N0YXRlLkJMRU5EX0NPTlNUQU5UUyxcbi8vICAgREVQVEhfQk9VTkRTOiBnZnguR0ZYRHluYW1pY1N0YXRlLkRFUFRIX0JPVU5EUyxcbi8vICAgU1RFTkNJTF9XUklURV9NQVNLOiBnZnguR0ZYRHluYW1pY1N0YXRlLlNURU5DSUxfV1JJVEVfTUFTSyxcbi8vICAgU1RFTkNJTF9DT01QQVJFX01BU0s6IGdmeC5HRlhEeW5hbWljU3RhdGUuU1RFTkNJTF9DT01QQVJFX01BU0ssXG4vLyAgIFRSVUU6IHRydWUsXG4vLyAgIEZBTFNFOiBmYWxzZVxuLy8gfTtcbnZhciBwYXNzUGFyYW1zID0ge1xuICAgIEJBQ0s6IGVudW1zLkNVTExfQkFDSyxcbiAgICBGUk9OVDogZW51bXMuQ1VMTF9GUk9OVCxcbiAgICBOT05FOiBlbnVtcy5DVUxMX05PTkUsXG4gICAgQUREOiBlbnVtcy5CTEVORF9GVU5DX0FERCxcbiAgICBTVUI6IGVudW1zLkJMRU5EX0ZVTkNfU1VCVFJBQ1QsXG4gICAgUkVWX1NVQjogZW51bXMuQkxFTkRfRlVOQ19SRVZFUlNFX1NVQlRSQUNULFxuICAgIFpFUk86IGVudW1zLkJMRU5EX1pFUk8sXG4gICAgT05FOiBlbnVtcy5CTEVORF9PTkUsXG4gICAgU1JDX0NPTE9SOiBlbnVtcy5CTEVORF9TUkNfQ09MT1IsXG4gICAgT05FX01JTlVTX1NSQ19DT0xPUjogZW51bXMuQkxFTkRfT05FX01JTlVTX1NSQ19DT0xPUixcbiAgICBEU1RfQ09MT1I6IGVudW1zLkJMRU5EX0RTVF9DT0xPUixcbiAgICBPTkVfTUlOVVNfRFNUX0NPTE9SOiBlbnVtcy5CTEVORF9PTkVfTUlOVVNfRFNUX0NPTE9SLFxuICAgIFNSQ19BTFBIQTogZW51bXMuQkxFTkRfU1JDX0FMUEhBLFxuICAgIE9ORV9NSU5VU19TUkNfQUxQSEE6IGVudW1zLkJMRU5EX09ORV9NSU5VU19TUkNfQUxQSEEsXG4gICAgRFNUX0FMUEhBOiBlbnVtcy5CTEVORF9EU1RfQUxQSEEsXG4gICAgT05FX01JTlVTX0RTVF9BTFBIQTogZW51bXMuQkxFTkRfT05FX01JTlVTX0RTVF9BTFBIQSxcbiAgICBDT05TVEFOVF9DT0xPUjogZW51bXMuQkxFTkRfQ09OU1RBTlRfQ09MT1IsXG4gICAgT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SOiBlbnVtcy5CTEVORF9PTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1IsXG4gICAgQ09OU1RBTlRfQUxQSEE6IGVudW1zLkJMRU5EX0NPTlNUQU5UX0FMUEhBLFxuICAgIE9ORV9NSU5VU19DT05TVEFOVF9BTFBIQTogZW51bXMuQkxFTkRfT05FX01JTlVTX0NPTlNUQU5UX0FMUEhBLFxuICAgIFNSQ19BTFBIQV9TQVRVUkFURTogZW51bXMuQkxFTkRfU1JDX0FMUEhBX1NBVFVSQVRFLFxuICAgIE5FVkVSOiBlbnVtcy5EU19GVU5DX05FVkVSLFxuICAgIExFU1M6IGVudW1zLkRTX0ZVTkNfTEVTUyxcbiAgICBFUVVBTDogZW51bXMuRFNfRlVOQ19FUVVBTCxcbiAgICBMRVFVQUw6IGVudW1zLkRTX0ZVTkNfTEVRVUFMLFxuICAgIEdSRUFURVI6IGVudW1zLkRTX0ZVTkNfR1JFQVRFUixcbiAgICBOT1RFUVVBTDogZW51bXMuRFNfRlVOQ19OT1RFUVVBTCxcbiAgICBHRVFVQUw6IGVudW1zLkRTX0ZVTkNfR0VRVUFMLFxuICAgIEFMV0FZUzogZW51bXMuRFNfRlVOQ19BTFdBWVMsXG4gICAgS0VFUDogZW51bXMuU1RFTkNJTF9PUF9LRUVQLFxuICAgIFJFUExBQ0U6IGVudW1zLlNURU5DSUxfT1BfUkVQTEFDRSxcbiAgICBJTkNSOiBlbnVtcy5TVEVOQ0lMX09QX0lOQ1IsXG4gICAgSU5DUl9XUkFQOiBlbnVtcy5TVEVOQ0lMX09QX0lOQ1JfV1JBUCxcbiAgICBERUNSOiBlbnVtcy5TVEVOQ0lMX09QX0RFQ1IsXG4gICAgREVDUl9XUkFQOiBlbnVtcy5TVEVOQ0lMX09QX0RFQ1JfV1JBUCxcbiAgICBJTlZFUlQ6IGVudW1zLlNURU5DSUxfT1BfSU5WRVJUXG59O1xuT2JqZWN0LmFzc2lnbihwYXNzUGFyYW1zLCBSZW5kZXJQYXNzU3RhZ2UpO1xuLy8gZm9yIHN0cnVjdHVyYWwgdHlwZSBjaGVja2luZ1xuLy8gYW4gJ2FueScga2V5IHdpbGwgY2hlY2sgYWdhaW5zdCBhbGwgZWxlbWVudHMgZGVmaW5lZCBpbiB0aGF0IG9iamVjdFxuLy8gYSBrZXkgc3RhcnQgd2l0aCAnJCcgbWVhbnMgaXRzIGVzc2VudGlhbCwgYW5kIGNhbid0IGJlIHVuZGVmaW5lZFxudmFyIGVmZmVjdFN0cnVjdHVyZSA9IHtcbiAgICAkdGVjaG5pcXVlczogW1xuICAgICAgICB7XG4gICAgICAgICAgICAkcGFzc2VzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkZXB0aFN0ZW5jaWxTdGF0ZToge30sXG4gICAgICAgICAgICAgICAgICAgIHJhc3Rlcml6ZXJTdGF0ZToge30sXG4gICAgICAgICAgICAgICAgICAgIGJsZW5kU3RhdGU6IHsgdGFyZ2V0czogW3t9XSB9LFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7IGFueTogeyBzYW1wbGVyOiB7fSwgaW5zcGVjdG9yOiB7fSB9IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICBdXG59O1xudmFyIG1hcHBpbmdzID0ge1xuICAgIG11cm11cmhhc2gyXzMyX2djOiBtdXJtdXJoYXNoMl8zMl9nYyxcbiAgICBTYW1wbGVySW5mb0luZGV4OiBTYW1wbGVySW5mb0luZGV4LFxuICAgIGVmZmVjdFN0cnVjdHVyZTogZWZmZWN0U3RydWN0dXJlLFxuICAgIHR5cGVNYXA6IHR5cGVNYXAsXG4gICAgc2l6ZU1hcDogc2l6ZU1hcCxcbiAgICBmb3JtYXRNYXA6IGZvcm1hdE1hcCxcbiAgICBwYXNzUGFyYW1zOiBwYXNzUGFyYW1zLFxuICAgIFJlbmRlclF1ZXVlOiBSZW5kZXJRdWV1ZSxcbiAgICBSZW5kZXJQcmlvcml0eTogUmVuZGVyUHJpb3JpdHksXG4gICAgR0ZYR2V0VHlwZVNpemU6IEdGWEdldFR5cGVTaXplLFxuICAgIFVuaWZvcm1CaW5kaW5nOiBVbmlmb3JtQmluZGluZ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtYXBwaW5ncztcbiJdLCJzb3VyY2VSb290IjoiLyJ9