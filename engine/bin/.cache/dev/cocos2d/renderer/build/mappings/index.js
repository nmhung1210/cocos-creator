
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
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GFXObject.prototype, "status", {
    get: function get() {
      return this._status;
    },
    enumerable: true,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9idWlsZC9tYXBwaW5ncy9pbmRleC5qcyJdLCJuYW1lcyI6WyJlbnVtcyIsIlVTQUdFX1NUQVRJQyIsIlVTQUdFX0RZTkFNSUMiLCJVU0FHRV9TVFJFQU0iLCJJTkRFWF9GTVRfVUlOVDgiLCJJTkRFWF9GTVRfVUlOVDE2IiwiSU5ERVhfRk1UX1VJTlQzMiIsIkFUVFJfUE9TSVRJT04iLCJBVFRSX05PUk1BTCIsIkFUVFJfVEFOR0VOVCIsIkFUVFJfQklUQU5HRU5UIiwiQVRUUl9XRUlHSFRTIiwiQVRUUl9KT0lOVFMiLCJBVFRSX0NPTE9SIiwiQVRUUl9DT0xPUjAiLCJBVFRSX0NPTE9SMSIsIkFUVFJfVVYiLCJBVFRSX1VWMCIsIkFUVFJfVVYxIiwiQVRUUl9VVjIiLCJBVFRSX1VWMyIsIkFUVFJfVVY0IiwiQVRUUl9VVjUiLCJBVFRSX1VWNiIsIkFUVFJfVVY3IiwiQVRUUl9UWVBFX0lOVDgiLCJBVFRSX1RZUEVfVUlOVDgiLCJBVFRSX1RZUEVfSU5UMTYiLCJBVFRSX1RZUEVfVUlOVDE2IiwiQVRUUl9UWVBFX0lOVDMyIiwiQVRUUl9UWVBFX1VJTlQzMiIsIkFUVFJfVFlQRV9GTE9BVDMyIiwiRklMVEVSX05FQVJFU1QiLCJGSUxURVJfTElORUFSIiwiV1JBUF9SRVBFQVQiLCJXUkFQX0NMQU1QIiwiV1JBUF9NSVJST1IiLCJURVhUVVJFX0ZNVF9SR0JfRFhUMSIsIlRFWFRVUkVfRk1UX1JHQkFfRFhUMSIsIlRFWFRVUkVfRk1UX1JHQkFfRFhUMyIsIlRFWFRVUkVfRk1UX1JHQkFfRFhUNSIsIlRFWFRVUkVfRk1UX1JHQl9FVEMxIiwiVEVYVFVSRV9GTVRfUkdCX1BWUlRDXzJCUFBWMSIsIlRFWFRVUkVfRk1UX1JHQkFfUFZSVENfMkJQUFYxIiwiVEVYVFVSRV9GTVRfUkdCX1BWUlRDXzRCUFBWMSIsIlRFWFRVUkVfRk1UX1JHQkFfUFZSVENfNEJQUFYxIiwiVEVYVFVSRV9GTVRfQTgiLCJURVhUVVJFX0ZNVF9MOCIsIlRFWFRVUkVfRk1UX0w4X0E4IiwiVEVYVFVSRV9GTVRfUjVfRzZfQjUiLCJURVhUVVJFX0ZNVF9SNV9HNV9CNV9BMSIsIlRFWFRVUkVfRk1UX1I0X0c0X0I0X0E0IiwiVEVYVFVSRV9GTVRfUkdCOCIsIlRFWFRVUkVfRk1UX1JHQkE4IiwiVEVYVFVSRV9GTVRfUkdCMTZGIiwiVEVYVFVSRV9GTVRfUkdCQTE2RiIsIlRFWFRVUkVfRk1UX1JHQjMyRiIsIlRFWFRVUkVfRk1UX1JHQkEzMkYiLCJURVhUVVJFX0ZNVF9SMzJGIiwiVEVYVFVSRV9GTVRfMTExMTEwRiIsIlRFWFRVUkVfRk1UX1NSR0IiLCJURVhUVVJFX0ZNVF9TUkdCQSIsIlRFWFRVUkVfRk1UX0QxNiIsIlRFWFRVUkVfRk1UX0QzMiIsIlRFWFRVUkVfRk1UX0QyNFM4IiwiVEVYVFVSRV9GTVRfUkdCX0VUQzIiLCJURVhUVVJFX0ZNVF9SR0JBX0VUQzIiLCJEU19GVU5DX05FVkVSIiwiRFNfRlVOQ19MRVNTIiwiRFNfRlVOQ19FUVVBTCIsIkRTX0ZVTkNfTEVRVUFMIiwiRFNfRlVOQ19HUkVBVEVSIiwiRFNfRlVOQ19OT1RFUVVBTCIsIkRTX0ZVTkNfR0VRVUFMIiwiRFNfRlVOQ19BTFdBWVMiLCJSQl9GTVRfUkdCQTQiLCJSQl9GTVRfUkdCNV9BMSIsIlJCX0ZNVF9SR0I1NjUiLCJSQl9GTVRfRDE2IiwiUkJfRk1UX1M4IiwiUkJfRk1UX0QyNFM4IiwiQkxFTkRfRlVOQ19BREQiLCJCTEVORF9GVU5DX1NVQlRSQUNUIiwiQkxFTkRfRlVOQ19SRVZFUlNFX1NVQlRSQUNUIiwiQkxFTkRfWkVSTyIsIkJMRU5EX09ORSIsIkJMRU5EX1NSQ19DT0xPUiIsIkJMRU5EX09ORV9NSU5VU19TUkNfQ09MT1IiLCJCTEVORF9EU1RfQ09MT1IiLCJCTEVORF9PTkVfTUlOVVNfRFNUX0NPTE9SIiwiQkxFTkRfU1JDX0FMUEhBIiwiQkxFTkRfT05FX01JTlVTX1NSQ19BTFBIQSIsIkJMRU5EX0RTVF9BTFBIQSIsIkJMRU5EX09ORV9NSU5VU19EU1RfQUxQSEEiLCJCTEVORF9DT05TVEFOVF9DT0xPUiIsIkJMRU5EX09ORV9NSU5VU19DT05TVEFOVF9DT0xPUiIsIkJMRU5EX0NPTlNUQU5UX0FMUEhBIiwiQkxFTkRfT05FX01JTlVTX0NPTlNUQU5UX0FMUEhBIiwiQkxFTkRfU1JDX0FMUEhBX1NBVFVSQVRFIiwiU1RFTkNJTF9ESVNBQkxFIiwiU1RFTkNJTF9FTkFCTEUiLCJTVEVOQ0lMX0lOSEVSSVQiLCJTVEVOQ0lMX09QX0tFRVAiLCJTVEVOQ0lMX09QX1pFUk8iLCJTVEVOQ0lMX09QX1JFUExBQ0UiLCJTVEVOQ0lMX09QX0lOQ1IiLCJTVEVOQ0lMX09QX0lOQ1JfV1JBUCIsIlNURU5DSUxfT1BfREVDUiIsIlNURU5DSUxfT1BfREVDUl9XUkFQIiwiU1RFTkNJTF9PUF9JTlZFUlQiLCJDVUxMX05PTkUiLCJDVUxMX0ZST05UIiwiQ1VMTF9CQUNLIiwiQ1VMTF9GUk9OVF9BTkRfQkFDSyIsIlBUX1BPSU5UUyIsIlBUX0xJTkVTIiwiUFRfTElORV9MT09QIiwiUFRfTElORV9TVFJJUCIsIlBUX1RSSUFOR0xFUyIsIlBUX1RSSUFOR0xFX1NUUklQIiwiUFRfVFJJQU5HTEVfRkFOIiwiUmVuZGVyUXVldWUiLCJPUEFRVUUiLCJUUkFOU1BBUkVOVCIsIk9WRVJMQVkiLCJtdXJtdXJoYXNoMl8zMl9nYyIsInN0ciIsInNlZWQiLCJsIiwibGVuZ3RoIiwiaCIsImkiLCJrIiwiY2hhckNvZGVBdCIsIldlYkdMRVhUIiwiR0ZYT2JqZWN0VHlwZSIsIkdGWFN0YXR1cyIsIkdGWE9iamVjdCIsImdmeFR5cGUiLCJfZ2Z4VHlwZSIsIlVOS05PV04iLCJfc3RhdHVzIiwiVU5SRUFEWSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwicHJvdG90eXBlIiwiZ2V0IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIkdGWEF0dHJpYnV0ZU5hbWUiLCJHRlhUeXBlIiwiR0ZYRm9ybWF0IiwiR0ZYQnVmZmVyVXNhZ2VCaXQiLCJHRlhNZW1vcnlVc2FnZUJpdCIsIkdGWEJ1ZmZlckFjY2Vzc0JpdCIsIkdGWFByaW1pdGl2ZU1vZGUiLCJHRlhQb2x5Z29uTW9kZSIsIkdGWFNoYWRlTW9kZWwiLCJHRlhDdWxsTW9kZSIsIkdGWENvbXBhcmlzb25GdW5jIiwiR0ZYU3RlbmNpbE9wIiwiR0ZYQmxlbmRPcCIsIkdGWEJsZW5kRmFjdG9yIiwiR0ZYQ29sb3JNYXNrIiwiR0ZYRmlsdGVyIiwiR0ZYQWRkcmVzcyIsIkdGWFRleHR1cmVUeXBlIiwiR0ZYVGV4dHVyZVVzYWdlQml0IiwiR0ZYU2FtcGxlQ291bnQiLCJHRlhUZXh0dXJlRmxhZ0JpdCIsIkdGWFRleHR1cmVWaWV3VHlwZSIsIkdGWFNoYWRlclR5cGUiLCJHRlhCaW5kaW5nVHlwZSIsIkdGWENvbW1hbmRCdWZmZXJUeXBlIiwiR0ZYTG9hZE9wIiwiR0ZYU3RvcmVPcCIsIkdGWFRleHR1cmVMYXlvdXQiLCJHRlhQaXBlbGluZUJpbmRQb2ludCIsIkdGWER5bmFtaWNTdGF0ZSIsIkdGWFN0ZW5jaWxGYWNlIiwiR0ZYUXVldWVUeXBlIiwiR0ZYQ2xlYXJGbGFnIiwiR0ZYR2V0VHlwZVNpemUiLCJ0eXBlIiwiQk9PTCIsIklOVCIsIlVJTlQiLCJGTE9BVCIsIkJPT0wyIiwiSU5UMiIsIlVJTlQyIiwiRkxPQVQyIiwiQk9PTDMiLCJJTlQzIiwiVUlOVDMiLCJGTE9BVDMiLCJCT09MNCIsIklOVDQiLCJVSU5UNCIsIkZMT0FUNCIsIk1BVDIiLCJNQVQyWDMiLCJNQVQyWDQiLCJNQVQzWDIiLCJNQVQzIiwiTUFUM1g0IiwiTUFUNFgyIiwiTUFUNCIsIlNBTVBMRVIxRCIsIlNBTVBMRVIxRF9BUlJBWSIsIlNBTVBMRVIyRCIsIlNBTVBMRVIyRF9BUlJBWSIsIlNBTVBMRVIzRCIsIlNBTVBMRVJfQ1VCRSIsIlJlbmRlclBhc3NTdGFnZSIsIlJlbmRlclByaW9yaXR5IiwiTUFYX0JJTkRJTkdfU1VQUE9SVEVEIiwiVW5pZm9ybUJpbmRpbmciLCJfYSIsIl9iIiwiU2FtcGxlckluZm9JbmRleCIsInR5cGVNYXAiLCJzaXplTWFwIiwiZm9ybWF0TWFwIiwiUjMySSIsIlJHMzJJIiwiUkdCMzJJIiwiUkdCQTMySSIsIlIzMkYiLCJSRzMyRiIsIlJHQjMyRiIsIlJHQkEzMkYiLCJwYXNzUGFyYW1zIiwiQkFDSyIsIkZST05UIiwiTk9ORSIsIkFERCIsIlNVQiIsIlJFVl9TVUIiLCJaRVJPIiwiT05FIiwiU1JDX0NPTE9SIiwiT05FX01JTlVTX1NSQ19DT0xPUiIsIkRTVF9DT0xPUiIsIk9ORV9NSU5VU19EU1RfQ09MT1IiLCJTUkNfQUxQSEEiLCJPTkVfTUlOVVNfU1JDX0FMUEhBIiwiRFNUX0FMUEhBIiwiT05FX01JTlVTX0RTVF9BTFBIQSIsIkNPTlNUQU5UX0NPTE9SIiwiT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SIiwiQ09OU1RBTlRfQUxQSEEiLCJPTkVfTUlOVVNfQ09OU1RBTlRfQUxQSEEiLCJTUkNfQUxQSEFfU0FUVVJBVEUiLCJORVZFUiIsIkxFU1MiLCJFUVVBTCIsIkxFUVVBTCIsIkdSRUFURVIiLCJOT1RFUVVBTCIsIkdFUVVBTCIsIkFMV0FZUyIsIktFRVAiLCJSRVBMQUNFIiwiSU5DUiIsIklOQ1JfV1JBUCIsIkRFQ1IiLCJERUNSX1dSQVAiLCJJTlZFUlQiLCJhc3NpZ24iLCJlZmZlY3RTdHJ1Y3R1cmUiLCIkdGVjaG5pcXVlcyIsIiRwYXNzZXMiLCJkZXB0aFN0ZW5jaWxTdGF0ZSIsInJhc3Rlcml6ZXJTdGF0ZSIsImJsZW5kU3RhdGUiLCJ0YXJnZXRzIiwicHJvcGVydGllcyIsImFueSIsInNhbXBsZXIiLCJpbnNwZWN0b3IiLCJtYXBwaW5ncyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTs7OztBQUdBLElBQU1BLEtBQUssR0FBRztBQUNaO0FBQ0FDLEVBQUFBLFlBQVksRUFBRSxLQUZGO0FBRVU7QUFDdEJDLEVBQUFBLGFBQWEsRUFBRSxLQUhIO0FBR1U7QUFDdEJDLEVBQUFBLFlBQVksRUFBRSxLQUpGO0FBSVU7QUFFdEI7QUFDQUMsRUFBQUEsZUFB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QVAsR0FBaUMsT0FBakM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsT0FBRCxDQUFQLEdBQW1CLEVBQXBCLENBQVAsR0FBaUMsT0FBakM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsT0FBRCxDQUFQLEdBQW1CLEVBQXBCLENBQVAsR0FBaUMsT0FBakM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsTUFBRCxDQUFQLEdBQWtCLEVBQW5CLENBQVAsR0FBZ0MsTUFBaEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsTUFBRCxDQUFQLEdBQWtCLEVBQW5CLENBQVAsR0FBZ0MsTUFBaEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsTUFBRCxDQUFQLEdBQWtCLEVBQW5CLENBQVAsR0FBZ0MsTUFBaEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsV0FBRCxDQUFQLEdBQXVCLEVBQXhCLENBQVAsR0FBcUMsV0FBckM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsaUJBQUQsQ0FBUCxHQUE2QixFQUE5QixDQUFQLEdBQTJDLGlCQUEzQztBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxXQUFELENBQVAsR0FBdUIsRUFBeEIsQ0FBUCxHQUFxQyxXQUFyQztBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxpQkFBRCxDQUFQLEdBQTZCLEVBQTlCLENBQVAsR0FBMkMsaUJBQTNDO0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQ0EsT0FBTyxDQUFDLFdBQUQsQ0FBUCxHQUF1QixFQUF4QixDQUFQLEdBQXFDLFdBQXJDO0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQ0EsT0FBTyxDQUFDLGNBQUQsQ0FBUCxHQUEwQixFQUEzQixDQUFQLEdBQXdDLGNBQXhDO0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQ0EsT0FBTyxDQUFDLE9BQUQsQ0FBUCxHQUFtQixFQUFwQixDQUFQLEdBQWlDLE9BQWpDO0FBQ0gsQ0FuQ0QsRUFtQ0dBLE9BQU8sS0FBS0EsT0FBTyxHQUFHLEVBQWYsQ0FuQ1Y7O0FBb0NBLElBQUlDLFNBQUo7O0FBQ0EsQ0FBQyxVQUFVQSxTQUFWLEVBQXFCO0FBQ2xCQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsQ0FBeEIsQ0FBVCxHQUFzQyxTQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxJQUFELENBQVQsR0FBa0IsQ0FBbkIsQ0FBVCxHQUFpQyxJQUFqQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxJQUFELENBQVQsR0FBa0IsQ0FBbkIsQ0FBVCxHQUFpQyxJQUFqQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxLQUFELENBQVQsR0FBbUIsQ0FBcEIsQ0FBVCxHQUFrQyxLQUFsQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxJQUFELENBQVQsR0FBa0IsQ0FBbkIsQ0FBVCxHQUFpQyxJQUFqQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxNQUFELENBQVQsR0FBb0IsQ0FBckIsQ0FBVCxHQUFtQyxNQUFuQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxNQUFELENBQVQsR0FBb0IsQ0FBckIsQ0FBVCxHQUFtQyxNQUFuQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxLQUFELENBQVQsR0FBbUIsQ0FBcEIsQ0FBVCxHQUFrQyxLQUFsQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxNQUFELENBQVQsR0FBb0IsQ0FBckIsQ0FBVCxHQUFtQyxNQUFuQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsQ0FBdEIsQ0FBVCxHQUFvQyxPQUFwQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxNQUFELENBQVQsR0FBb0IsRUFBckIsQ0FBVCxHQUFvQyxNQUFwQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxNQUFELENBQVQsR0FBb0IsRUFBckIsQ0FBVCxHQUFvQyxNQUFwQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxNQUFELENBQVQsR0FBb0IsRUFBckIsQ0FBVCxHQUFvQyxNQUFwQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxLQUFELENBQVQsR0FBbUIsRUFBcEIsQ0FBVCxHQUFtQyxLQUFuQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxNQUFELENBQVQsR0FBb0IsRUFBckIsQ0FBVCxHQUFvQyxNQUFwQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxNQUFELENBQVQsR0FBb0IsRUFBckIsQ0FBVCxHQUFvQyxNQUFwQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsRUFBeEIsQ0FBVCxHQUF1QyxTQUF2QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsRUFBeEIsQ0FBVCxHQUF1QyxTQUF2QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxVQUFELENBQVQsR0FBd0IsRUFBekIsQ0FBVCxHQUF3QyxVQUF4QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsRUFBeEIsQ0FBVCxHQUF1QyxTQUF2QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsRUFBeEIsQ0FBVCxHQUF1QyxTQUF2QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsRUFBeEIsQ0FBVCxHQUF1QyxTQUF2QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxVQUFELENBQVQsR0FBd0IsRUFBekIsQ0FBVCxHQUF3QyxVQUF4QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsRUFBeEIsQ0FBVCxHQUF1QyxTQUF2QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsRUFBeEIsQ0FBVCxHQUF1QyxTQUF2QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxVQUFELENBQVQsR0FBd0IsRUFBekIsQ0FBVCxHQUF3QyxVQUF4QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsRUFBeEIsQ0FBVCxHQUF1QyxTQUF2QyxDQTlDa0IsQ0ErQ2xCOztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxZQUFELENBQVQsR0FBMEIsRUFBM0IsQ0FBVCxHQUEwQyxZQUExQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsRUFBeEIsQ0FBVCxHQUF1QyxTQUF2QztBQUNBQSxFQUFBQSxT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UyxDQUFDQSxTQUFTLENBQUMsVUFBRCxDQUFULEdBQXdCLEVBQXpCLENBQVQsR0FBd0MsVUFBeEMsQ0F4RmtCLENBeUZsQjs7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsVUFBRCxDQUFULEdBQXdCLEVBQXpCLENBQVQsR0FBd0MsVUFBeEM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsV0FBRCxDQUFULEdBQXlCLEVBQTFCLENBQVQsR0FBeUMsV0FBekM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsWUFBRCxDQUFULEdBQTBCLEVBQTNCLENBQVQsR0FBMEMsWUFBMUM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsY0FBRCxDQUFULEdBQTRCLEVBQTdCLENBQVQsR0FBNEMsY0FBNUM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsZUFBRCxDQUFULEdBQTZCLEVBQTlCLENBQVQsR0FBNkMsZUFBN0M7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsWUFBRCxDQUFULEdBQTBCLEVBQTNCLENBQVQsR0FBMEMsWUFBMUM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsZUFBRCxDQUFULEdBQTZCLEVBQTlCLENBQVQsR0FBNkMsZUFBN0M7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsU0FBRCxDQUFULEdBQXVCLEVBQXhCLENBQVQsR0FBdUMsU0FBdkM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsV0FBRCxDQUFULEdBQXlCLEVBQTFCLENBQVQsR0FBeUMsV0FBekM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsVUFBRCxDQUFULEdBQXdCLEVBQXpCLENBQVQsR0FBd0MsVUFBeEM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsWUFBRCxDQUFULEdBQTBCLEVBQTNCLENBQVQsR0FBMEMsWUFBMUMsQ0FwR2tCLENBcUdsQjs7QUFDQUEsRUFBQUEsU0FBUyxDQUFD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QyxNQUFNLENBQUM4SCxNQUFQLENBQWNyQyxVQUFkLEVBQTBCbEIsZUFBMUIsR0FDQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSXdELGVBQWUsR0FBRztBQUNsQkMsRUFBQUEsV0FBVyxFQUFFLENBQ1Q7QUFDSUMsSUFBQUEsT0FBTyxFQUFFLENBQ0w7QUFDSUMsTUFBQUEsaUJBQWlCLEVBQUUsRUFEdkI7QUFFSUMsTUFBQUEsZUFBZSxFQUFFLEVBRnJCO0FBR0lDLE1BQUFBLFVBQVUsRUFBRTtBQUFFQyxRQUFBQSxPQUFPLEVBQUUsQ0FBQyxFQUFEO0FBQVgsT0FIaEI7QUFJSUMsTUFBQUEsVUFBVSxFQUFFO0FBQUVDLFFBQUFBLEdBQUcsRUFBRTtBQUFFQyxVQUFBQSxPQUFPLEVBQUUsRUFBWDtBQUFlQyxVQUFBQSxTQUFTLEVBQUU7QUFBMUI7QUFBUDtBQUpoQixLQURLO0FBRGIsR0FEUztBQURLLENBQXRCO0FBY0EsSUFBSUMsUUFBUSxHQUFHO0FBQ1g1SixFQUFBQSxpQkFBaUIsRUFBRUEsaUJBRFI7QUFFWCtGLEVBQUFBLGdCQUFnQixFQUFFQSxnQkFGUDtBQUdYa0QsRUFBQUEsZUFBZSxFQUFFQSxlQUhOO0FBSVhqRCxFQUFBQSxPQUFPLEVBQUVBLE9BSkU7QUFLWEMsRUFBQUEsT0FBTyxFQUFFQSxPQUxFO0FBTVhDLEVBQUFBLFNBQVMsRUFBRUEsU0FOQTtBQU9YUyxFQUFBQSxVQUFVLEVBQUVBLFVBUEQ7QUFRWC9HLEVBQUFBLFdBQVcsRUFBRUEsV0FSRjtBQVNYOEYsRUFBQUEsY0FBYyxFQUFFQSxjQVRMO0FBVVhqQyxFQUFBQSxjQUFjLEVBQUVBLGNBVkw7QUFXWG1DLEVBQUFBLGNBQWMsRUFBRUE7QUFYTCxDQUFmO0FBY0FpRSxNQUFNLENBQUNDLE9BQVAsR0FBaUJGLFFBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIGVudW1zXG4gKi9cbmNvbnN0IGVudW1zID0ge1xuICAvLyBidWZmZXIgdXNhZ2VcbiAgVVNBR0VfU1RBVElDOiAzNTA0NCwgIC8vIGdsLlNUQVRJQ19EUkFXXG4gIFVTQUdFX0RZTkFNSUM6IDM1MDQ4LCAvLyBnbC5EWU5BTUlDX0RSQVdcbiAgVVNBR0VfU1RSRUFNOiAzNTA0MCwgIC8vIGdsLlNUUkVBTV9EUkFXXG5cbiAgLy8gaW5kZXggYnVmZmVyIGZvcm1hdFxuICBJTkRFWF9GTVRfVUlOVDg6IDUxMjEsICAvLyBnbC5VTlNJR05FRF9CWVRFXG4gIElOREVYX0ZNVF9VSU5UMTY6IDUxMjMsIC8vIGdsLlVOU0lHTkVEX1NIT1JUXG4gIElOREVYX0ZNVF9VSU5UMzI6IDUxMjUsIC8vIGdsLlVOU0lHTkVEX0lOVCAoT0VTX2VsZW1lbnRfaW5kZXhfdWludClcblxuICAvLyB2ZXJ0ZXggYXR0cmlidXRlIHNlbWFudGljXG4gIEFUVFJfUE9TSVRJT046ICdhX3Bvc2l0aW9uJyxcbiAgQVRUUl9OT1JNQUw6ICdhX25vcm1hbCcsXG4gIEFUVFJfVEFOR0VOVDogJ2FfdGFuZ2VudCcsXG4gIEFUVFJfQklUQU5HRU5UOiAnYV9iaXRhbmdlbnQnLFxuICBBVFRSX1dFSUdIVFM6ICdhX3dlaWdodHMnLFxuICBBVFRSX0pPSU5UUzogJ2Ffam9pbnRzJyxcbiAgQVRUUl9DT0xPUjogJ2FfY29sb3InLFxuICBBVFRSX0NPTE9SMDogJ2FfY29sb3IwJyxcbiAgQVRUUl9DT0xPUjE6ICdhX2NvbG9yMScsXG4gIEFUVFJfVVY6ICdhX3V2JyxcbiAgQVRUUl9VVjA6ICdhX3V2MCcsXG4gIEFUVFJfVVYxOiAnYV91djEnLFxuICBBVFRSX1VWMjogJ2FfdXYyJyxcbiAgQVRUUl9VVjM6ICdhX3V2MycsXG4gIEFUVFJfVVY0OiAnYV91djQnLFxuICBBVFRSX1VWNTogJ2FfdXY1JyxcbiAgQVRUUl9VVjY6ICdhX3V2NicsXG4gIEFUVFJfVVY3OiAnYV91djcnLFxuXG4gIC8vIHZlcnRleCBhdHRyaWJ1dGUgdHlwZVxuICBBVFRSX1RZUEVfSU5UODogNTEyMCwgICAgLy8gZ2wuQllURVxuICBBVFRSX1RZUEVfVUlOVDg6IDUxMjEsICAgLy8gZ2wuVU5TSUdORURfQllURVxuICBBVFRSX1RZUEVfSU5UMTY6IDUxMjIsICAgLy8gZ2wuU0hPUlRcbiAgQVRUUl9UWVBFX1VJTlQxNjogNTEyMywgIC8vIGdsLlVOU0lHTkVEX1NIT1JUXG4gIEFUVFJfVFlQRV9JTlQzMjogNTEyNCwgICAvLyBnbC5JTlRcbiAgQVRUUl9UWVBFX1VJTlQzMjogNTEyNSwgIC8vIGdsLlVOU0lHTkVEX0lOVFxuICBBVFRSX1RZUEVfRkxPQVQzMjogNTEyNiwgLy8gZ2wuRkxPQVRcblxuICAvLyB0ZXh0dXJlIGZpbHRlclxuICBGSUxURVJfTkVBUkVTVDogMCxcbiAgRklMVEVSX0xJTkVBUjogMSxcblxuICAvLyB0ZXh0dXJlIHdyYXAgbW9kZVxuICBXUkFQX1JFUEVBVDogMTA0OTcsIC8vIGdsLlJFUEVBVFxuICBXUkFQX0NMQU1QOiAzMzA3MSwgIC8vIGdsLkNMQU1QX1RPX0VER0VcbiAgV1JBUF9NSVJST1I6IDMzNjQ4LCAvLyBnbC5NSVJST1JFRF9SRVBFQVRcblxuICAvLyB0ZXh0dXJlIGZvcm1hdFxuICAvLyBjb21wcmVzcyBmb3JtYXRzXG4gIFRFWFRVUkVfRk1UX1JHQl9EWFQxOiAwLFxuICBURVhUVVJFX0ZNVF9SR0JBX0RYVDE6IDEsXG4gIFRFWFRVUkVfRk1UX1JHQkFfRFhUMzogMixcbiAgVEVYVFVSRV9GTVRfUkdCQV9EWFQ1OiAzLFxuICBURVhUVVJFX0ZNVF9SR0JfRVRDMTogNCxcbiAgVEVYVFVSRV9GTVRfUkdCX1BWUlRDXzJCUFBWMTogNSxcbiAgVEVYVFVSRV9GTVRfUkdCQV9QVlJUQ18yQlBQVjE6IDYsXG4gIFRFWFRVUkVfRk1UX1JHQl9QVlJUQ180QlBQVjE6IDcsXG4gIFRFWFRVUkVfRk1UX1JHQkFfUFZSVENfNEJQUFYxOiA4LFxuXG4gIC8vIG5vcm1hbCBmb3JtYXRzXG4gIFRFWFRVUkVfRk1UX0E4OiA5LFxuICBURVhUVVJFX0ZNVF9MODogMTAsXG4gIFRFWFRVUkVfRk1UX0w4X0E4OiAxMSxcbiAgVEVYVFVSRV9GTVRfUjVfRzZfQjU6IDEyLFxuICBURVhUVVJFX0ZNVF9SNV9HNV9CNV9BMTogMTMsXG4gIFRFWFRVUkVfRk1UX1I0X0c0X0I0X0E0OiAxNCxcbiAgVEVYVFVSRV9GTVRfUkdCODogMTUsXG4gIFRFWFRVUkVfRk1UX1JHQkE4OiAxNixcbiAgVEVYVFVSRV9GTVRfUkdCMTZGOiAxNyxcbiAgVEVYVFVSRV9GTVRfUkdCQTE2RjogMTgsXG4gIFRFWFRVUkVfRk1UX1JHQjMyRjogMTksXG4gIFRFWFRVUkVfRk1UX1JHQkEzMkY6IDIwLFxuICBURVhUVVJFX0ZNVF9SMzJGOiAyMSxcbiAgVEVYVFVSRV9GTVRfMTExMTEwRjogMjIsXG4gIFRFWFRVUkVfRk1UX1NSR0I6IDIzLFxuICBURVhUVVJFX0ZNVF9TUkdCQTogMjQsXG5cbiAgLy8gZGVwdGggZm9ybWF0c1xuICBURVhUVVJFX0ZNVF9EMTY6IDI1LFxuICBURVhUVVJFX0ZNVF9EMzI6IDI2LFxuICBURVhUVVJFX0ZNVF9EMjRTODogMjcsXG5cbiAgLy8gZXRjMiBmb3JtYXRcbiAgVEVYVFVSRV9GTVRfUkdCX0VUQzI6IDI4LFxuICBURVhUVVJFX0ZNVF9SR0JBX0VUQzI6IDI5LFxuXG4gIC8vIGRlcHRoIGFuZCBzdGVuY2lsIGZ1bmN0aW9uXG4gIERTX0ZVTkNfTkVWRVI6IDUxMiwgICAgLy8gZ2wuTkVWRVJcbiAgRFNfRlVOQ19MRVNTOiA1MTMsICAgICAvLyBnbC5MRVNTXG4gIERTX0ZVTkNfRVFVQUw6IDUxNCwgICAgLy8gZ2wuRVFVQUxcbiAgRFNfRlVOQ19MRVFVQUw6IDUxNSwgICAvLyBnbC5MRVFVQUxcbiAgRFNfRlVOQ19HUkVBVEVSOiA1MTYsICAvLyBnbC5HUkVBVEVSXG4gIERTX0ZVTkNfTk9URVFVQUw6IDUxNywgLy8gZ2wuTk9URVFVQUxcbiAgRFNfRlVOQ19HRVFVQUw6IDUxOCwgICAvLyBnbC5HRVFVQUxcbiAgRFNfRlVOQ19BTFdBWVM6IDUxOSwgICAvLyBnbC5BTFdBWVNcblxuICAvLyByZW5kZXItYnVmZmVyIGZvcm1hdFxuICBSQl9GTVRfUkdCQTQ6IDMyODU0LCAgICAvLyBnbC5SR0JBNFxuICBSQl9GTVRfUkdCNV9BMTogMzI4NTUsICAvLyBnbC5SR0I1X0ExXG4gIFJCX0ZNVF9SR0I1NjU6IDM2MTk0LCAgIC8vIGdsLlJHQjU2NVxuICBSQl9GTVRfRDE2OiAzMzE4OSwgICAgICAvLyBnbC5ERVBUSF9DT01QT05FTlQxNlxuICBSQl9GTVRfUzg6IDM2MTY4LCAgICAgICAvLyBnbC5TVEVOQ0lMX0lOREVYOFxuICBSQl9GTVRfRDI0Uzg6IDM0MDQxLCAgICAvLyBnbC5ERVBUSF9TVEVOQ0lMXG5cbiAgLy8gYmxlbmQtZXF1YXRpb25cbiAgQkxFTkRfRlVOQ19BREQ6IDMyNzc0LCAgICAgICAgICAgICAgLy8gZ2wuRlVOQ19BRERcbiAgQkxFTkRfRlVOQ19TVUJUUkFDVDogMzI3NzgsICAgICAgICAgLy8gZ2wuRlVOQ19TVUJUUkFDVFxuICBCTEVORF9GVU5DX1JFVkVSU0VfU1VCVFJBQ1Q6IDMyNzc5LCAvLyBnbC5GVU5DX1JFVkVSU0VfU1VCVFJBQ1RcblxuICAvLyBibGVuZFxuICBCTEVORF9aRVJPOiAwLCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2wuWkVST1xuICBCTEVORF9PTkU6IDEsICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2wuT05FXG4gIEJMRU5EX1NSQ19DT0xPUjogNzY4LCAgICAgICAgICAgICAgICAgICAvLyBnbC5TUkNfQ09MT1JcbiAgQkxFTkRfT05FX01JTlVTX1NSQ19DT0xPUjogNzY5LCAgICAgICAgIC8vIGdsLk9ORV9NSU5VU19TUkNfQ09MT1JcbiAgQkxFTkRfRFNUX0NPTE9SOiA3NzQsICAgICAgICAgICAgICAgICAgIC8vIGdsLkRTVF9DT0xPUlxuICBCTEVORF9PTkVfTUlOVVNfRFNUX0NPTE9SOiA3NzUsICAgICAgICAgLy8gZ2wuT05FX01JTlVTX0RTVF9DT0xPUlxuICBCTEVORF9TUkNfQUxQSEE6IDc3MCwgICAgICAgICAgICAgICAgICAgLy8gZ2wuU1JDX0FMUEhBXG4gIEJMRU5EX09ORV9NSU5VU19TUkNfQUxQSEE6IDc3MSwgICAgICAgICAvLyBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBXG4gIEJMRU5EX0RTVF9BTFBIQTogNzcyLCAgICAgICAgICAgICAgICAgICAvLyBnbC5EU1RfQUxQSEFcbiAgQkxFTkRfT05FX01JTlVTX0RTVF9BTFBIQTogNzczLCAgICAgICAgIC8vIGdsLk9ORV9NSU5VU19EU1RfQUxQSEFcbiAgQkxFTkRfQ09OU1RBTlRfQ09MT1I6IDMyNzY5LCAgICAgICAgICAgIC8vIGdsLkNPTlNUQU5UX0NPTE9SXG4gIEJMRU5EX09ORV9NSU5VU19DT05TVEFOVF9DT0xPUjogMzI3NzAsICAvLyBnbC5PTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1JcbiAgQkxFTkRfQ09OU1RBTlRfQUxQSEE6IDMyNzcxLCAgICAgICAgICAgIC8vIGdsLkNPTlNUQU5UX0FMUEhBXG4gIEJMRU5EX09ORV9NSU5VU19DT05TVEFOVF9BTFBIQTogMzI3NzIsICAvLyBnbC5PTkVfTUlOVVNfQ09OU1RBTlRfQUxQSEFcbiAgQkxFTkRfU1JDX0FMUEhBX1NBVFVSQVRFOiA3NzYsICAgICAgICAgIC8vIGdsLlNSQ19BTFBIQV9TQVRVUkFURVxuXG4gIC8vIHN0ZW5jaWwgb3BlcmF0aW9uXG4gIFNURU5DSUxfRElTQUJMRTogMCwgICAgICAgICAgICAgLy8gZGlzYWJsZSBzdGVuY2lsXG4gIFNURU5DSUxfRU5BQkxFOiAxLCAgICAgICAgICAgICAgLy8gZW5hYmxlIHN0ZW5jaWxcbiAgU1RFTkNJTF9JTkhFUklUOiAyLCAgICAgICAgICAgICAvLyBpbmhlcml0IHN0ZW5jaWwgc3RhdGVzXG5cbiAgU1RFTkNJTF9PUF9LRUVQOiA3NjgwLCAgICAgICAgICAvLyBnbC5LRUVQXG4gIFNURU5DSUxfT1BfWkVSTzogMCwgICAgICAgICAgICAgLy8gZ2wuWkVST1xuICBTVEVOQ0lMX09QX1JFUExBQ0U6IDc2ODEsICAgICAgIC8vIGdsLlJFUExBQ0VcbiAgU1RFTkNJTF9PUF9JTkNSOiA3NjgyLCAgICAgICAgICAvLyBnbC5JTkNSXG4gIFNURU5DSUxfT1BfSU5DUl9XUkFQOiAzNDA1NSwgICAgLy8gZ2wuSU5DUl9XUkFQXG4gIFNURU5DSUxfT1BfREVDUjogNzY4MywgICAgICAgICAgLy8gZ2wuREVDUlxuICBTVEVOQ0lMX09QX0RFQ1JfV1JBUDogMzQwNTYsICAgIC8vIGdsLkRFQ1JfV1JBUFxuICBTVEVOQ0lMX09QX0lOVkVSVDogNTM4NiwgICAgICAgIC8vIGdsLklOVkVSVFxuXG4gIC8vIGN1bGxcbiAgQ1VMTF9OT05FOiAwLFxuICBDVUxMX0ZST05UOiAxMDI4LFxuICBDVUxMX0JBQ0s6IDEwMjksXG4gIENVTExfRlJPTlRfQU5EX0JBQ0s6IDEwMzIsXG5cbiAgLy8gcHJpbWl0aXZlIHR5cGVcbiAgUFRfUE9JTlRTOiAwLCAgICAgICAgIC8vIGdsLlBPSU5UU1xuICBQVF9MSU5FUzogMSwgICAgICAgICAgLy8gZ2wuTElORVNcbiAgUFRfTElORV9MT09QOiAyLCAgICAgIC8vIGdsLkxJTkVfTE9PUFxuICBQVF9MSU5FX1NUUklQOiAzLCAgICAgLy8gZ2wuTElORV9TVFJJUFxuICBQVF9UUklBTkdMRVM6IDQsICAgICAgLy8gZ2wuVFJJQU5HTEVTXG4gIFBUX1RSSUFOR0xFX1NUUklQOiA1LCAvLyBnbC5UUklBTkdMRV9TVFJJUFxuICBQVF9UUklBTkdMRV9GQU46IDYsICAgLy8gZ2wuVFJJQU5HTEVfRkFOXG59O1xuXG5sZXQgUmVuZGVyUXVldWUgPSB7XG4gICAgT1BBUVVFOiAwLFxuICAgIFRSQU5TUEFSRU5UOiAxLFxuICAgIE9WRVJMQVk6IDJcbn07XG5cbi8qKlxuICogSlMgSW1wbGVtZW50YXRpb24gb2YgTXVybXVySGFzaDJcbiAqIFxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmdhcnkuY291cnRAZ21haWwuY29tXCI+R2FyeSBDb3VydDwvYT5cbiAqIEBzZWUgaHR0cDovL2dpdGh1Yi5jb20vZ2FyeWNvdXJ0L211cm11cmhhc2gtanNcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzphYXBwbGVieUBnbWFpbC5jb21cIj5BdXN0aW4gQXBwbGVieTwvYT5cbiAqIEBzZWUgaHR0cDovL3NpdGVzLmdvb2dsZS5jb20vc2l0ZS9tdXJtdXJoYXNoL1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIEFTQ0lJIG9ubHlcbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWVkIFBvc2l0aXZlIGludGVnZXIgb25seVxuICogQHJldHVybiB7bnVtYmVyfSAzMi1iaXQgcG9zaXRpdmUgaW50ZWdlciBoYXNoXG4gKi9cblxuZnVuY3Rpb24gbXVybXVyaGFzaDJfMzJfZ2Moc3RyLCBzZWVkKSB7XG4gIHZhclxuICAgIGwgPSBzdHIubGVuZ3RoLFxuICAgIGggPSBzZWVkIF4gbCxcbiAgICBpID0gMCxcbiAgICBrO1xuICBcbiAgd2hpbGUgKGwgPj0gNCkge1xuICBcdGsgPSBcbiAgXHQgICgoc3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmKSkgfFxuICBcdCAgKChzdHIuY2hhckNvZGVBdCgrK2kpICYgMHhmZikgPDwgOCkgfFxuICBcdCAgKChzdHIuY2hhckNvZGVBdCgrK2kpICYgMHhmZikgPDwgMTYpIHxcbiAgXHQgICgoc3RyLmNoYXJDb2RlQXQoKytpKSAmIDB4ZmYpIDw8IDI0KTtcbiAgICBcbiAgICBrID0gKCgoayAmIDB4ZmZmZikgKiAweDViZDFlOTk1KSArICgoKChrID4+PiAxNikgKiAweDViZDFlOTk1KSAmIDB4ZmZmZikgPDwgMTYpKTtcbiAgICBrIF49IGsgPj4+IDI0O1xuICAgIGsgPSAoKChrICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUpICsgKCgoKGsgPj4+IDE2KSAqIDB4NWJkMWU5OTUpICYgMHhmZmZmKSA8PCAxNikpO1xuXG5cdGggPSAoKChoICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUpICsgKCgoKGggPj4+IDE2KSAqIDB4NWJkMWU5OTUpICYgMHhmZmZmKSA8PCAxNikpIF4gaztcblxuICAgIGwgLT0gNDtcbiAgICArK2k7XG4gIH1cbiAgXG4gIHN3aXRjaCAobCkge1xuICBjYXNlIDM6IGggXj0gKHN0ci5jaGFyQ29kZUF0KGkgKyAyKSAmIDB4ZmYpIDw8IDE2O1xuICBjYXNlIDI6IGggXj0gKHN0ci5jaGFyQ29kZUF0KGkgKyAxKSAmIDB4ZmYpIDw8IDg7XG4gIGNhc2UgMTogaCBePSAoc3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmKTtcbiAgICAgICAgICBoID0gKCgoaCAmIDB4ZmZmZikgKiAweDViZDFlOTk1KSArICgoKChoID4+PiAxNikgKiAweDViZDFlOTk1KSAmIDB4ZmZmZikgPDwgMTYpKTtcbiAgfVxuXG4gIGggXj0gaCA+Pj4gMTM7XG4gIGggPSAoKChoICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUpICsgKCgoKGggPj4+IDE2KSAqIDB4NWJkMWU5OTUpICYgMHhmZmZmKSA8PCAxNikpO1xuICBoIF49IGggPj4+IDE1O1xuXG4gIHJldHVybiBoID4+PiAwO1xufVxuXG4vLyBFeHRlbnNpb25zXG52YXIgV2ViR0xFWFQ7XG4oZnVuY3Rpb24gKFdlYkdMRVhUKSB7XG4gICAgV2ViR0xFWFRbV2ViR0xFWFRbXCJDT01QUkVTU0VEX1JHQl9TM1RDX0RYVDFfRVhUXCJdID0gMzM3NzZdID0gXCJDT01QUkVTU0VEX1JHQl9TM1RDX0RYVDFfRVhUXCI7XG4gICAgV2ViR0xFWFRbV2ViR0xFWFRbXCJDT01QUkVTU0VEX1JHQkFfUzNUQ19EWFQxX0VYVFwiXSA9IDMzNzc3XSA9IFwiQ09NUFJFU1NFRF9SR0JBX1MzVENfRFhUMV9FWFRcIjtcbiAgICBXZWJHTEVYVFtXZWJHTEVYVFtcIkNPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDNfRVhUXCJdID0gMzM3NzhdID0gXCJDT01QUkVTU0VEX1JHQkFfUzNUQ19EWFQzX0VYVFwiO1xuICAgIFdlYkdMRVhUW1dlYkdMRVhUW1wiQ09NUFJFU1NFRF9SR0JBX1MzVENfRFhUNV9FWFRcIl0gPSAzMzc3OV0gPSBcIkNPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDVfRVhUXCI7XG4gICAgV2ViR0xFWFRbV2ViR0xFWFRbXCJDT01QUkVTU0VEX1NSR0JfUzNUQ19EWFQxX0VYVFwiXSA9IDM1OTE2XSA9IFwiQ09NUFJFU1NFRF9TUkdCX1MzVENfRFhUMV9FWFRcIjtcbiAgICBXZWJHTEVYVFtXZWJHTEVYVFtcIkNPTVBSRVNTRURfU1JHQl9BTFBIQV9TM1RDX0RYVDFfRVhUXCJdID0gMzU5MTddID0gXCJDT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQxX0VYVFwiO1xuICAgIFdlYkdMRVhUW1dlYkdMRVhUW1wiQ09NUFJFU1NFRF9TUkdCX0FMUEhBX1MzVENfRFhUM19FWFRcIl0gPSAzNTkxOF0gPSBcIkNPTVBSRVNTRURfU1JHQl9BTFBIQV9TM1RDX0RYVDNfRVhUXCI7XG4gICAgV2ViR0xFWFRbV2ViR0xFWFRbXCJDT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQ1X0VYVFwiXSA9IDM1OTE5XSA9IFwiQ09NUFJFU1NFRF9TUkdCX0FMUEhBX1MzVENfRFhUNV9FWFRcIjtcbiAgICBXZWJHTEVYVFtXZWJHTEVYVFtcIkNPTVBSRVNTRURfUkdCX1BWUlRDXzRCUFBWMV9JTUdcIl0gPSAzNTg0MF0gPSBcIkNPTVBSRVNTRURfUkdCX1BWUlRDXzRCUFBWMV9JTUdcIjtcbiAgICBXZWJHTEVYVFtXZWJHTEVYVFtcIkNPTVBSRVNTRURfUkdCX1BWUlRDXzJCUFBWMV9JTUdcIl0gPSAzNTg0MV0gPSBcIkNPTVBSRVNTRURfUkdCX1BWUlRDXzJCUFBWMV9JTUdcIjtcbiAgICBXZWJHTEVYVFtXZWJHTEVYVFtcIkNPTVBSRVNTRURfUkdCQV9QVlJUQ180QlBQVjFfSU1HXCJdID0gMzU4NDJdID0gXCJDT01QUkVTU0VEX1JHQkFfUFZSVENfNEJQUFYxX0lNR1wiO1xuICAgIFdlYkdMRVhUW1dlYkdMRVhUW1wiQ09NUFJFU1NFRF9SR0JBX1BWUlRDXzJCUFBWMV9JTUdcIl0gPSAzNTg0M10gPSBcIkNPTVBSRVNTRURfUkdCQV9QVlJUQ18yQlBQVjFfSU1HXCI7XG4gICAgV2ViR0xFWFRbV2ViR0xFWFRbXCJDT01QUkVTU0VEX1JHQl9FVEMxX1dFQkdMXCJdID0gMzYxOTZdID0gXCJDT01QUkVTU0VEX1JHQl9FVEMxX1dFQkdMXCI7XG59KShXZWJHTEVYVCB8fCAoV2ViR0xFWFQgPSB7fSkpO1xudmFyIEdGWE9iamVjdFR5cGU7XG4oZnVuY3Rpb24gKEdGWE9iamVjdFR5cGUpIHtcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJVTktOT1dOXCJdID0gMF0gPSBcIlVOS05PV05cIjtcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJCVUZGRVJcIl0gPSAxXSA9IFwiQlVGRkVSXCI7XG4gICAgR0ZYT2JqZWN0VHlwZVtHRlhPYmplY3RUeXBlW1wiVEVYVFVSRVwiXSA9IDJdID0gXCJURVhUVVJFXCI7XG4gICAgR0ZYT2JqZWN0VHlwZVtHRlhPYmplY3RUeXBlW1wiVEVYVFVSRV9WSUVXXCJdID0gM10gPSBcIlRFWFRVUkVfVklFV1wiO1xuICAgIEdGWE9iamVjdFR5cGVbR0ZYT2JqZWN0VHlwZVtcIlJFTkRFUl9QQVNTXCJdID0gNF0gPSBcIlJFTkRFUl9QQVNTXCI7XG4gICAgR0ZYT2JqZWN0VHlwZVtHRlhPYmplY3RUeXBlW1wiRlJBTUVCVUZGRVJcIl0gPSA1XSA9IFwiRlJBTUVCVUZGRVJcIjtcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJTQU1QTEVSXCJdID0gNl0gPSBcIlNBTVBMRVJcIjtcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJTSEFERVJcIl0gPSA3XSA9IFwiU0hBREVSXCI7XG4gICAgR0ZYT2JqZWN0VHlwZVtHRlhPYmplY3RUeXBlW1wiUElQRUxJTkVfTEFZT1VUXCJdID0gOF0gPSBcIlBJUEVMSU5FX0xBWU9VVFwiO1xuICAgIEdGWE9iamVjdFR5cGVbR0ZYT2JqZWN0VHlwZVtcIlBJUEVMSU5FX1NUQVRFXCJdID0gOV0gPSBcIlBJUEVMSU5FX1NUQVRFXCI7XG4gICAgR0ZYT2JqZWN0VHlwZVtHRlhPYmplY3RUeXBlW1wiQklORElOR19MQVlPVVRcIl0gPSAxMF0gPSBcIkJJTkRJTkdfTEFZT1VUXCI7XG4gICAgR0ZYT2JqZWN0VHlwZVtHRlhPYmplY3RUeXBlW1wiSU5QVVRfQVNTRU1CTEVSXCJdID0gMTFdID0gXCJJTlBVVF9BU1NFTUJMRVJcIjtcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJDT01NQU5EX0FMTE9DQVRPUlwiXSA9IDEyXSA9IFwiQ09NTUFORF9BTExPQ0FUT1JcIjtcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJDT01NQU5EX0JVRkZFUlwiXSA9IDEzXSA9IFwiQ09NTUFORF9CVUZGRVJcIjtcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJRVUVVRVwiXSA9IDE0XSA9IFwiUVVFVUVcIjtcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJXSU5ET1dcIl0gPSAxNV0gPSBcIldJTkRPV1wiO1xufSkoR0ZYT2JqZWN0VHlwZSB8fCAoR0ZYT2JqZWN0VHlwZSA9IHt9KSk7XG52YXIgR0ZYU3RhdHVzO1xuKGZ1bmN0aW9uIChHRlhTdGF0dXMpIHtcbiAgICBHRlhTdGF0dXNbR0ZYU3RhdHVzW1wiVU5SRUFEWVwiXSA9IDBdID0gXCJVTlJFQURZXCI7XG4gICAgR0ZYU3RhdHVzW0dGWFN0YXR1c1tcIkZBSUxFRFwiXSA9IDFdID0gXCJGQUlMRURcIjtcbiAgICBHRlhTdGF0dXNbR0ZYU3RhdHVzW1wiU1VDQ0VTU1wiXSA9IDJdID0gXCJTVUNDRVNTXCI7XG59KShHRlhTdGF0dXMgfHwgKEdGWFN0YXR1cyA9IHt9KSk7XG52YXIgR0ZYT2JqZWN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEdGWE9iamVjdChnZnhUeXBlKSB7XG4gICAgICAgIHRoaXMuX2dmeFR5cGUgPSBHRlhPYmplY3RUeXBlLlVOS05PV047XG4gICAgICAgIHRoaXMuX3N0YXR1cyA9IEdGWFN0YXR1cy5VTlJFQURZO1xuICAgICAgICB0aGlzLl9nZnhUeXBlID0gZ2Z4VHlwZTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdGWE9iamVjdC5wcm90b3R5cGUsIFwiZ2Z4VHlwZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dmeFR5cGU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHRlhPYmplY3QucHJvdG90eXBlLCBcInN0YXR1c1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXR1cztcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIEdGWE9iamVjdDtcbn0oKSk7XG52YXIgR0ZYQXR0cmlidXRlTmFtZTtcbihmdW5jdGlvbiAoR0ZYQXR0cmlidXRlTmFtZSkge1xuICAgIEdGWEF0dHJpYnV0ZU5hbWVbXCJBVFRSX1BPU0lUSU9OXCJdID0gXCJhX3Bvc2l0aW9uXCI7XG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfTk9STUFMXCJdID0gXCJhX25vcm1hbFwiO1xuICAgIEdGWEF0dHJpYnV0ZU5hbWVbXCJBVFRSX1RBTkdFTlRcIl0gPSBcImFfdGFuZ2VudFwiO1xuICAgIEdGWEF0dHJpYnV0ZU5hbWVbXCJBVFRSX0JJVEFOR0VOVFwiXSA9IFwiYV9iaXRhbmdlbnRcIjtcbiAgICBHRlhBdHRyaWJ1dGVOYW1lW1wiQVRUUl9XRUlHSFRTXCJdID0gXCJhX3dlaWdodHNcIjtcbiAgICBHRlhBdHRyaWJ1dGVOYW1lW1wiQVRUUl9KT0lOVFNcIl0gPSBcImFfam9pbnRzXCI7XG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfQ09MT1JcIl0gPSBcImFfY29sb3JcIjtcbiAgICBHRlhBdHRyaWJ1dGVOYW1lW1wiQVRUUl9DT0xPUjFcIl0gPSBcImFfY29sb3IxXCI7XG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfQ09MT1IyXCJdID0gXCJhX2NvbG9yMlwiO1xuICAgIEdGWEF0dHJpYnV0ZU5hbWVbXCJBVFRSX1RFWF9DT09SRFwiXSA9IFwiYV90ZXhDb29yZFwiO1xuICAgIEdGWEF0dHJpYnV0ZU5hbWVbXCJBVFRSX1RFWF9DT09SRDFcIl0gPSBcImFfdGV4Q29vcmQxXCI7XG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfVEVYX0NPT1JEMlwiXSA9IFwiYV90ZXhDb29yZDJcIjtcbiAgICBHRlhBdHRyaWJ1dGVOYW1lW1wiQVRUUl9URVhfQ09PUkQzXCJdID0gXCJhX3RleENvb3JkM1wiO1xuICAgIEdGWEF0dHJpYnV0ZU5hbWVbXCJBVFRSX1RFWF9DT09SRDRcIl0gPSBcImFfdGV4Q29vcmQ0XCI7XG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfVEVYX0NPT1JENVwiXSA9IFwiYV90ZXhDb29yZDVcIjtcbiAgICBHRlhBdHRyaWJ1dGVOYW1lW1wiQVRUUl9URVhfQ09PUkQ2XCJdID0gXCJhX3RleENvb3JkNlwiO1xuICAgIEdGWEF0dHJpYnV0ZU5hbWVbXCJBVFRSX1RFWF9DT09SRDdcIl0gPSBcImFfdGV4Q29vcmQ3XCI7XG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfVEVYX0NPT1JEOFwiXSA9IFwiYV90ZXhDb29yZDhcIjtcbn0pKEdGWEF0dHJpYnV0ZU5hbWUgfHwgKEdGWEF0dHJpYnV0ZU5hbWUgPSB7fSkpO1xudmFyIEdGWFR5cGU7XG4oZnVuY3Rpb24gKEdGWFR5cGUpIHtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJVTktOT1dOXCJdID0gMF0gPSBcIlVOS05PV05cIjtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJCT09MXCJdID0gMV0gPSBcIkJPT0xcIjtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJCT09MMlwiXSA9IDJdID0gXCJCT09MMlwiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIkJPT0wzXCJdID0gM10gPSBcIkJPT0wzXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiQk9PTDRcIl0gPSA0XSA9IFwiQk9PTDRcIjtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJJTlRcIl0gPSA1XSA9IFwiSU5UXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiSU5UMlwiXSA9IDZdID0gXCJJTlQyXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiSU5UM1wiXSA9IDddID0gXCJJTlQzXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiSU5UNFwiXSA9IDhdID0gXCJJTlQ0XCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiVUlOVFwiXSA9IDldID0gXCJVSU5UXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiVUlOVDJcIl0gPSAxMF0gPSBcIlVJTlQyXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiVUlOVDNcIl0gPSAxMV0gPSBcIlVJTlQzXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiVUlOVDRcIl0gPSAxMl0gPSBcIlVJTlQ0XCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiRkxPQVRcIl0gPSAxM10gPSBcIkZMT0FUXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiRkxPQVQyXCJdID0gMTRdID0gXCJGTE9BVDJcIjtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJGTE9BVDNcIl0gPSAxNV0gPSBcIkZMT0FUM1wiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIkZMT0FUNFwiXSA9IDE2XSA9IFwiRkxPQVQ0XCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiQ09MT1I0XCJdID0gMTddID0gXCJDT0xPUjRcIjtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJNQVQyXCJdID0gMThdID0gXCJNQVQyXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiTUFUMlgzXCJdID0gMTldID0gXCJNQVQyWDNcIjtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJNQVQyWDRcIl0gPSAyMF0gPSBcIk1BVDJYNFwiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIk1BVDNYMlwiXSA9IDIxXSA9IFwiTUFUM1gyXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiTUFUM1wiXSA9IDIyXSA9IFwiTUFUM1wiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIk1BVDNYNFwiXSA9IDIzXSA9IFwiTUFUM1g0XCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiTUFUNFgyXCJdID0gMjRdID0gXCJNQVQ0WDJcIjtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJNQVQ0WDNcIl0gPSAyNV0gPSBcIk1BVDRYM1wiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIk1BVDRcIl0gPSAyNl0gPSBcIk1BVDRcIjtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJTQU1QTEVSMURcIl0gPSAyN10gPSBcIlNBTVBMRVIxRFwiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIlNBTVBMRVIxRF9BUlJBWVwiXSA9IDI4XSA9IFwiU0FNUExFUjFEX0FSUkFZXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiU0FNUExFUjJEXCJdID0gMjldID0gXCJTQU1QTEVSMkRcIjtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJTQU1QTEVSMkRfQVJSQVlcIl0gPSAzMF0gPSBcIlNBTVBMRVIyRF9BUlJBWVwiO1xuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIlNBTVBMRVIzRFwiXSA9IDMxXSA9IFwiU0FNUExFUjNEXCI7XG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiU0FNUExFUl9DVUJFXCJdID0gMzJdID0gXCJTQU1QTEVSX0NVQkVcIjtcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJDT1VOVFwiXSA9IDMzXSA9IFwiQ09VTlRcIjtcbn0pKEdGWFR5cGUgfHwgKEdGWFR5cGUgPSB7fSkpO1xudmFyIEdGWEZvcm1hdDtcbihmdW5jdGlvbiAoR0ZYRm9ybWF0KSB7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlVOS05PV05cIl0gPSAwXSA9IFwiVU5LTk9XTlwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJBOFwiXSA9IDFdID0gXCJBOFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJMOFwiXSA9IDJdID0gXCJMOFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJMQThcIl0gPSAzXSA9IFwiTEE4XCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlI4XCJdID0gNF0gPSBcIlI4XCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlI4U05cIl0gPSA1XSA9IFwiUjhTTlwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSOFVJXCJdID0gNl0gPSBcIlI4VUlcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUjhJXCJdID0gN10gPSBcIlI4SVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSMTZGXCJdID0gOF0gPSBcIlIxNkZcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUjE2VUlcIl0gPSA5XSA9IFwiUjE2VUlcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUjE2SVwiXSA9IDEwXSA9IFwiUjE2SVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSMzJGXCJdID0gMTFdID0gXCJSMzJGXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlIzMlVJXCJdID0gMTJdID0gXCJSMzJVSVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSMzJJXCJdID0gMTNdID0gXCJSMzJJXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHOFwiXSA9IDE0XSA9IFwiUkc4XCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHOFNOXCJdID0gMTVdID0gXCJSRzhTTlwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSRzhVSVwiXSA9IDE2XSA9IFwiUkc4VUlcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkc4SVwiXSA9IDE3XSA9IFwiUkc4SVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSRzE2RlwiXSA9IDE4XSA9IFwiUkcxNkZcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkcxNlVJXCJdID0gMTldID0gXCJSRzE2VUlcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkcxNklcIl0gPSAyMF0gPSBcIlJHMTZJXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHMzJGXCJdID0gMjFdID0gXCJSRzMyRlwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSRzMyVUlcIl0gPSAyMl0gPSBcIlJHMzJVSVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSRzMySVwiXSA9IDIzXSA9IFwiUkczMklcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCOFwiXSA9IDI0XSA9IFwiUkdCOFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJTUkdCOFwiXSA9IDI1XSA9IFwiU1JHQjhcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCOFNOXCJdID0gMjZdID0gXCJSR0I4U05cIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCOFVJXCJdID0gMjddID0gXCJSR0I4VUlcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCOElcIl0gPSAyOF0gPSBcIlJHQjhJXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQjE2RlwiXSA9IDI5XSA9IFwiUkdCMTZGXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQjE2VUlcIl0gPSAzMF0gPSBcIlJHQjE2VUlcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCMTZJXCJdID0gMzFdID0gXCJSR0IxNklcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCMzJGXCJdID0gMzJdID0gXCJSR0IzMkZcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCMzJVSVwiXSA9IDMzXSA9IFwiUkdCMzJVSVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0IzMklcIl0gPSAzNF0gPSBcIlJHQjMySVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0JBOFwiXSA9IDM1XSA9IFwiUkdCQThcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiU1JHQjhfQThcIl0gPSAzNl0gPSBcIlNSR0I4X0E4XCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQkE4U05cIl0gPSAzN10gPSBcIlJHQkE4U05cIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCQThVSVwiXSA9IDM4XSA9IFwiUkdCQThVSVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0JBOElcIl0gPSAzOV0gPSBcIlJHQkE4SVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0JBMTZGXCJdID0gNDBdID0gXCJSR0JBMTZGXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQkExNlVJXCJdID0gNDFdID0gXCJSR0JBMTZVSVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0JBMTZJXCJdID0gNDJdID0gXCJSR0JBMTZJXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQkEzMkZcIl0gPSA0M10gPSBcIlJHQkEzMkZcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCQTMyVUlcIl0gPSA0NF0gPSBcIlJHQkEzMlVJXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQkEzMklcIl0gPSA0NV0gPSBcIlJHQkEzMklcIjtcbiAgICAvLyBTcGVjaWFsIEZvcm1hdFxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSNUc2QjVcIl0gPSA0Nl0gPSBcIlI1RzZCNVwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSMTFHMTFCMTBGXCJdID0gNDddID0gXCJSMTFHMTFCMTBGXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQjVBMVwiXSA9IDQ4XSA9IFwiUkdCNUExXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQkE0XCJdID0gNDldID0gXCJSR0JBNFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0IxMEEyXCJdID0gNTBdID0gXCJSR0IxMEEyXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQjEwQTJVSVwiXSA9IDUxXSA9IFwiUkdCMTBBMlVJXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQjlFNVwiXSA9IDUyXSA9IFwiUkdCOUU1XCI7XG4gICAgLy8gRGVwdGgtU3RlbmNpbCBGb3JtYXRcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiRDE2XCJdID0gNTNdID0gXCJEMTZcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiRDE2UzhcIl0gPSA1NF0gPSBcIkQxNlM4XCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkQyNFwiXSA9IDU1XSA9IFwiRDI0XCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkQyNFM4XCJdID0gNTZdID0gXCJEMjRTOFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJEMzJGXCJdID0gNTddID0gXCJEMzJGXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkQzMkZfUzhcIl0gPSA1OF0gPSBcIkQzMkZfUzhcIjtcbiAgICAvLyBDb21wcmVzc2VkIEZvcm1hdFxuICAgIC8vIEJsb2NrIENvbXByZXNzaW9uIEZvcm1hdCwgRERTIChEaXJlY3REcmF3IFN1cmZhY2UpXG4gICAgLy8gRFhUMTogMyBjaGFubmVscyAoNTo2OjUpLCAxLzggb3JpZ2lhbmwgc2l6ZSwgd2l0aCAwIG9yIDEgYml0IG9mIGFscGhhXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkJDMVwiXSA9IDU5XSA9IFwiQkMxXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkJDMV9BTFBIQVwiXSA9IDYwXSA9IFwiQkMxX0FMUEhBXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkJDMV9TUkdCXCJdID0gNjFdID0gXCJCQzFfU1JHQlwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzFfU1JHQl9BTFBIQVwiXSA9IDYyXSA9IFwiQkMxX1NSR0JfQUxQSEFcIjtcbiAgICAvLyBEWFQzOiA0IGNoYW5uZWxzICg1OjY6NSksIDEvNCBvcmlnaWFubCBzaXplLCB3aXRoIDQgYml0cyBvZiBhbHBoYVxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzJcIl0gPSA2M10gPSBcIkJDMlwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzJfU1JHQlwiXSA9IDY0XSA9IFwiQkMyX1NSR0JcIjtcbiAgICAvLyBEWFQ1OiA0IGNoYW5uZWxzICg1OjY6NSksIDEvNCBvcmlnaWFubCBzaXplLCB3aXRoIDggYml0cyBvZiBhbHBoYVxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzNcIl0gPSA2NV0gPSBcIkJDM1wiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzNfU1JHQlwiXSA9IDY2XSA9IFwiQkMzX1NSR0JcIjtcbiAgICAvLyAxIGNoYW5uZWwgKDgpLCAxLzQgb3JpZ2lhbmwgc2l6ZVxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzRcIl0gPSA2N10gPSBcIkJDNFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzRfU05PUk1cIl0gPSA2OF0gPSBcIkJDNF9TTk9STVwiO1xuICAgIC8vIDIgY2hhbm5lbHMgKDg6OCksIDEvMiBvcmlnaWFubCBzaXplXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkJDNVwiXSA9IDY5XSA9IFwiQkM1XCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkJDNV9TTk9STVwiXSA9IDcwXSA9IFwiQkM1X1NOT1JNXCI7XG4gICAgLy8gMyBjaGFubmVscyAoMTY6MTY6MTYpLCBoYWxmLWZsb2F0aW5nIHBvaW50LCAxLzYgb3JpZ2lhbmwgc2l6ZVxuICAgIC8vIFVGMTY6IHVuc2lnbmVkIGZsb2F0LCA1IGV4cG9uZW50IGJpdHMgKyAxMSBtYW50aXNzYSBiaXRzXG4gICAgLy8gU0YxNjogc2lnbmVkIGZsb2F0LCAxIHNpZ25lZCBiaXQgKyA1IGV4cG9uZW50IGJpdHMgKyAxMCBtYW50aXNzYSBiaXRzXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkJDNkhfVUYxNlwiXSA9IDcxXSA9IFwiQkM2SF9VRjE2XCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkJDNkhfU0YxNlwiXSA9IDcyXSA9IFwiQkM2SF9TRjE2XCI7XG4gICAgLy8gNCBjaGFubmVscyAoNH43IGJpdHMgcGVyIGNoYW5uZWwpIHdpdGggMCB0byA4IGJpdHMgb2YgYWxwaGEsIDEvMyBvcmlnaW5hbCBzaXplXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkJDN1wiXSA9IDczXSA9IFwiQkM3XCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkJDN19TUkdCXCJdID0gNzRdID0gXCJCQzdfU1JHQlwiO1xuICAgIC8vIEVyaWNzc29uIFRleHR1cmUgQ29tcHJlc3Npb24gRm9ybWF0XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkVUQ19SR0I4XCJdID0gNzVdID0gXCJFVENfUkdCOFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJFVEMyX1JHQjhcIl0gPSA3Nl0gPSBcIkVUQzJfUkdCOFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJFVEMyX1NSR0I4XCJdID0gNzddID0gXCJFVEMyX1NSR0I4XCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkVUQzJfUkdCOF9BMVwiXSA9IDc4XSA9IFwiRVRDMl9SR0I4X0ExXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkVUQzJfU1JHQjhfQTFcIl0gPSA3OV0gPSBcIkVUQzJfU1JHQjhfQTFcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiRVRDMl9SR0JBOFwiXSA9IDgwXSA9IFwiRVRDMl9SR0JBOFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJFVEMyX1NSR0I4X0E4XCJdID0gODFdID0gXCJFVEMyX1NSR0I4X0E4XCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkVBQ19SMTFcIl0gPSA4Ml0gPSBcIkVBQ19SMTFcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiRUFDX1IxMVNOXCJdID0gODNdID0gXCJFQUNfUjExU05cIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiRUFDX1JHMTFcIl0gPSA4NF0gPSBcIkVBQ19SRzExXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkVBQ19SRzExU05cIl0gPSA4NV0gPSBcIkVBQ19SRzExU05cIjtcbiAgICAvLyBQVlJUQyAoUG93ZXJWUilcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUFZSVENfUkdCMlwiXSA9IDg2XSA9IFwiUFZSVENfUkdCMlwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJQVlJUQ19SR0JBMlwiXSA9IDg3XSA9IFwiUFZSVENfUkdCQTJcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUFZSVENfUkdCNFwiXSA9IDg4XSA9IFwiUFZSVENfUkdCNFwiO1xuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJQVlJUQ19SR0JBNFwiXSA9IDg5XSA9IFwiUFZSVENfUkdCQTRcIjtcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUFZSVEMyXzJCUFBcIl0gPSA5MF0gPSBcIlBWUlRDMl8yQlBQXCI7XG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlBWUlRDMl80QlBQXCJdID0gOTFdID0gXCJQVlJUQzJfNEJQUFwiO1xufSkoR0ZYRm9ybWF0IHx8IChHRlhGb3JtYXQgPSB7fSkpO1xudmFyIEdGWEJ1ZmZlclVzYWdlQml0O1xuKGZ1bmN0aW9uIChHRlhCdWZmZXJVc2FnZUJpdCkge1xuICAgIEdGWEJ1ZmZlclVzYWdlQml0W0dGWEJ1ZmZlclVzYWdlQml0W1wiTk9ORVwiXSA9IDBdID0gXCJOT05FXCI7XG4gICAgR0ZYQnVmZmVyVXNhZ2VCaXRbR0ZYQnVmZmVyVXNhZ2VCaXRbXCJUUkFOU0ZFUl9TUkNcIl0gPSAxXSA9IFwiVFJBTlNGRVJfU1JDXCI7XG4gICAgR0ZYQnVmZmVyVXNhZ2VCaXRbR0ZYQnVmZmVyVXNhZ2VCaXRbXCJUUkFOU0ZFUl9EU1RcIl0gPSAyXSA9IFwiVFJBTlNGRVJfRFNUXCI7XG4gICAgR0ZYQnVmZmVyVXNhZ2VCaXRbR0ZYQnVmZmVyVXNhZ2VCaXRbXCJJTkRFWFwiXSA9IDRdID0gXCJJTkRFWFwiO1xuICAgIEdGWEJ1ZmZlclVzYWdlQml0W0dGWEJ1ZmZlclVzYWdlQml0W1wiVkVSVEVYXCJdID0gOF0gPSBcIlZFUlRFWFwiO1xuICAgIEdGWEJ1ZmZlclVzYWdlQml0W0dGWEJ1ZmZlclVzYWdlQml0W1wiVU5JRk9STVwiXSA9IDE2XSA9IFwiVU5JRk9STVwiO1xuICAgIEdGWEJ1ZmZlclVzYWdlQml0W0dGWEJ1ZmZlclVzYWdlQml0W1wiU1RPUkFHRVwiXSA9IDMyXSA9IFwiU1RPUkFHRVwiO1xuICAgIEdGWEJ1ZmZlclVzYWdlQml0W0dGWEJ1ZmZlclVzYWdlQml0W1wiSU5ESVJFQ1RcIl0gPSA2NF0gPSBcIklORElSRUNUXCI7XG59KShHRlhCdWZmZXJVc2FnZUJpdCB8fCAoR0ZYQnVmZmVyVXNhZ2VCaXQgPSB7fSkpO1xudmFyIEdGWE1lbW9yeVVzYWdlQml0O1xuKGZ1bmN0aW9uIChHRlhNZW1vcnlVc2FnZUJpdCkge1xuICAgIEdGWE1lbW9yeVVzYWdlQml0W0dGWE1lbW9yeVVzYWdlQml0W1wiTk9ORVwiXSA9IDBdID0gXCJOT05FXCI7XG4gICAgR0ZYTWVtb3J5VXNhZ2VCaXRbR0ZYTWVtb3J5VXNhZ2VCaXRbXCJERVZJQ0VcIl0gPSAxXSA9IFwiREVWSUNFXCI7XG4gICAgR0ZYTWVtb3J5VXNhZ2VCaXRbR0ZYTWVtb3J5VXNhZ2VCaXRbXCJIT1NUXCJdID0gMl0gPSBcIkhPU1RcIjtcbn0pKEdGWE1lbW9yeVVzYWdlQml0IHx8IChHRlhNZW1vcnlVc2FnZUJpdCA9IHt9KSk7XG52YXIgR0ZYQnVmZmVyQWNjZXNzQml0O1xuKGZ1bmN0aW9uIChHRlhCdWZmZXJBY2Nlc3NCaXQpIHtcbiAgICBHRlhCdWZmZXJBY2Nlc3NCaXRbR0ZYQnVmZmVyQWNjZXNzQml0W1wiTk9ORVwiXSA9IDBdID0gXCJOT05FXCI7XG4gICAgR0ZYQnVmZmVyQWNjZXNzQml0W0dGWEJ1ZmZlckFjY2Vzc0JpdFtcIlJFQURcIl0gPSAxXSA9IFwiUkVBRFwiO1xuICAgIEdGWEJ1ZmZlckFjY2Vzc0JpdFtHRlhCdWZmZXJBY2Nlc3NCaXRbXCJXUklURVwiXSA9IDJdID0gXCJXUklURVwiO1xufSkoR0ZYQnVmZmVyQWNjZXNzQml0IHx8IChHRlhCdWZmZXJBY2Nlc3NCaXQgPSB7fSkpO1xudmFyIEdGWFByaW1pdGl2ZU1vZGU7XG4oZnVuY3Rpb24gKEdGWFByaW1pdGl2ZU1vZGUpIHtcbiAgICBHRlhQcmltaXRpdmVNb2RlW0dGWFByaW1pdGl2ZU1vZGVbXCJQT0lOVF9MSVNUXCJdID0gMF0gPSBcIlBPSU5UX0xJU1RcIjtcbiAgICBHRlhQcmltaXRpdmVNb2RlW0dGWFByaW1pdGl2ZU1vZGVbXCJMSU5FX0xJU1RcIl0gPSAxXSA9IFwiTElORV9MSVNUXCI7XG4gICAgR0ZYUHJpbWl0aXZlTW9kZVtHRlhQcmltaXRpdmVNb2RlW1wiTElORV9TVFJJUFwiXSA9IDJdID0gXCJMSU5FX1NUUklQXCI7XG4gICAgR0ZYUHJpbWl0aXZlTW9kZVtHRlhQcmltaXRpdmVNb2RlW1wiTElORV9MT09QXCJdID0gM10gPSBcIkxJTkVfTE9PUFwiO1xuICAgIEdGWFByaW1pdGl2ZU1vZGVbR0ZYUHJpbWl0aXZlTW9kZVtcIkxJTkVfTElTVF9BREpBQ0VOQ1lcIl0gPSA0XSA9IFwiTElORV9MSVNUX0FESkFDRU5DWVwiO1xuICAgIEdGWFByaW1pdGl2ZU1vZGVbR0ZYUHJpbWl0aXZlTW9kZVtcIkxJTkVfU1RSSVBfQURKQUNFTkNZXCJdID0gNV0gPSBcIkxJTkVfU1RSSVBfQURKQUNFTkNZXCI7XG4gICAgR0ZYUHJpbWl0aXZlTW9kZVtHRlhQcmltaXRpdmVNb2RlW1wiSVNPX0xJTkVfTElTVFwiXSA9IDZdID0gXCJJU09fTElORV9MSVNUXCI7XG4gICAgLy8gcmF5Y2FzdCBkZXRlY3RhYmxlOlxuICAgIEdGWFByaW1pdGl2ZU1vZGVbR0ZYUHJpbWl0aXZlTW9kZVtcIlRSSUFOR0xFX0xJU1RcIl0gPSA3XSA9IFwiVFJJQU5HTEVfTElTVFwiO1xuICAgIEdGWFByaW1pdGl2ZU1vZGVbR0ZYUHJpbWl0aXZlTW9kZVtcIlRSSUFOR0xFX1NUUklQXCJdID0gOF0gPSBcIlRSSUFOR0xFX1NUUklQXCI7XG4gICAgR0ZYUHJpbWl0aXZlTW9kZVtHRlhQcmltaXRpdmVNb2RlW1wiVFJJQU5HTEVfRkFOXCJdID0gOV0gPSBcIlRSSUFOR0xFX0ZBTlwiO1xuICAgIEdGWFByaW1pdGl2ZU1vZGVbR0ZYUHJpbWl0aXZlTW9kZVtcIlRSSUFOR0xFX0xJU1RfQURKQUNFTkNZXCJdID0gMTBdID0gXCJUUklBTkdMRV9MSVNUX0FESkFDRU5DWVwiO1xuICAgIEdGWFByaW1pdGl2ZU1vZGVbR0ZYUHJpbWl0aXZlTW9kZVtcIlRSSUFOR0xFX1NUUklQX0FESkFDRU5DWVwiXSA9IDExXSA9IFwiVFJJQU5HTEVfU1RSSVBfQURKQUNFTkNZXCI7XG4gICAgR0ZYUHJpbWl0aXZlTW9kZVtHRlhQcmltaXRpdmVNb2RlW1wiVFJJQU5HTEVfUEFUQ0hfQURKQUNFTkNZXCJdID0gMTJdID0gXCJUUklBTkdMRV9QQVRDSF9BREpBQ0VOQ1lcIjtcbiAgICBHRlhQcmltaXRpdmVNb2RlW0dGWFByaW1pdGl2ZU1vZGVbXCJRVUFEX1BBVENIX0xJU1RcIl0gPSAxM10gPSBcIlFVQURfUEFUQ0hfTElTVFwiO1xufSkoR0ZYUHJpbWl0aXZlTW9kZSB8fCAoR0ZYUHJpbWl0aXZlTW9kZSA9IHt9KSk7XG52YXIgR0ZYUG9seWdvbk1vZGU7XG4oZnVuY3Rpb24gKEdGWFBvbHlnb25Nb2RlKSB7XG4gICAgR0ZYUG9seWdvbk1vZGVbR0ZYUG9seWdvbk1vZGVbXCJGSUxMXCJdID0gMF0gPSBcIkZJTExcIjtcbiAgICBHRlhQb2x5Z29uTW9kZVtHRlhQb2x5Z29uTW9kZVtcIlBPSU5UXCJdID0gMV0gPSBcIlBPSU5UXCI7XG4gICAgR0ZYUG9seWdvbk1vZGVbR0ZYUG9seWdvbk1vZGVbXCJMSU5FXCJdID0gMl0gPSBcIkxJTkVcIjtcbn0pKEdGWFBvbHlnb25Nb2RlIHx8IChHRlhQb2x5Z29uTW9kZSA9IHt9KSk7XG52YXIgR0ZYU2hhZGVNb2RlbDtcbihmdW5jdGlvbiAoR0ZYU2hhZGVNb2RlbCkge1xuICAgIEdGWFNoYWRlTW9kZWxbR0ZYU2hhZGVNb2RlbFtcIkdPVVJBTkRcIl0gPSAwXSA9IFwiR09VUkFORFwiO1xuICAgIEdGWFNoYWRlTW9kZWxbR0ZYU2hhZGVNb2RlbFtcIkZMQVRcIl0gPSAxXSA9IFwiRkxBVFwiO1xufSkoR0ZYU2hhZGVNb2RlbCB8fCAoR0ZYU2hhZGVNb2RlbCA9IHt9KSk7XG52YXIgR0ZYQ3VsbE1vZGU7XG4oZnVuY3Rpb24gKEdGWEN1bGxNb2RlKSB7XG4gICAgR0ZYQ3VsbE1vZGVbR0ZYQ3VsbE1vZGVbXCJOT05FXCJdID0gMF0gPSBcIk5PTkVcIjtcbiAgICBHRlhDdWxsTW9kZVtHRlhDdWxsTW9kZVtcIkZST05UXCJdID0gMV0gPSBcIkZST05UXCI7XG4gICAgR0ZYQ3VsbE1vZGVbR0ZYQ3VsbE1vZGVbXCJCQUNLXCJdID0gMl0gPSBcIkJBQ0tcIjtcbn0pKEdGWEN1bGxNb2RlIHx8IChHRlhDdWxsTW9kZSA9IHt9KSk7XG52YXIgR0ZYQ29tcGFyaXNvbkZ1bmM7XG4oZnVuY3Rpb24gKEdGWENvbXBhcmlzb25GdW5jKSB7XG4gICAgR0ZYQ29tcGFyaXNvbkZ1bmNbR0ZYQ29tcGFyaXNvbkZ1bmNbXCJORVZFUlwiXSA9IDBdID0gXCJORVZFUlwiO1xuICAgIEdGWENvbXBhcmlzb25GdW5jW0dGWENvbXBhcmlzb25GdW5jW1wiTEVTU1wiXSA9IDFdID0gXCJMRVNTXCI7XG4gICAgR0ZYQ29tcGFyaXNvbkZ1bmNbR0ZYQ29tcGFyaXNvbkZ1bmNbXCJFUVVBTFwiXSA9IDJdID0gXCJFUVVBTFwiO1xuICAgIEdGWENvbXBhcmlzb25GdW5jW0dGWENvbXBhcmlzb25GdW5jW1wiTEVTU19FUVVBTFwiXSA9IDNdID0gXCJMRVNTX0VRVUFMXCI7XG4gICAgR0ZYQ29tcGFyaXNvbkZ1bmNbR0ZYQ29tcGFyaXNvbkZ1bmNbXCJHUkVBVEVSXCJdID0gNF0gPSBcIkdSRUFURVJcIjtcbiAgICBHRlhDb21wYXJpc29uRnVuY1tHRlhDb21wYXJpc29uRnVuY1tcIk5PVF9FUVVBTFwiXSA9IDVdID0gXCJOT1RfRVFVQUxcIjtcbiAgICBHRlhDb21wYXJpc29uRnVuY1tHRlhDb21wYXJpc29uRnVuY1tcIkdSRUFURVJfRVFVQUxcIl0gPSA2XSA9IFwiR1JFQVRFUl9FUVVBTFwiO1xuICAgIEdGWENvbXBhcmlzb25GdW5jW0dGWENvbXBhcmlzb25GdW5jW1wiQUxXQVlTXCJdID0gN10gPSBcIkFMV0FZU1wiO1xufSkoR0ZYQ29tcGFyaXNvbkZ1bmMgfHwgKEdGWENvbXBhcmlzb25GdW5jID0ge30pKTtcbnZhciBHRlhTdGVuY2lsT3A7XG4oZnVuY3Rpb24gKEdGWFN0ZW5jaWxPcCkge1xuICAgIEdGWFN0ZW5jaWxPcFtHRlhTdGVuY2lsT3BbXCJaRVJPXCJdID0gMF0gPSBcIlpFUk9cIjtcbiAgICBHRlhTdGVuY2lsT3BbR0ZYU3RlbmNpbE9wW1wiS0VFUFwiXSA9IDFdID0gXCJLRUVQXCI7XG4gICAgR0ZYU3RlbmNpbE9wW0dGWFN0ZW5jaWxPcFtcIlJFUExBQ0VcIl0gPSAyXSA9IFwiUkVQTEFDRVwiO1xuICAgIEdGWFN0ZW5jaWxPcFtHRlhTdGVuY2lsT3BbXCJJTkNSXCJdID0gM10gPSBcIklOQ1JcIjtcbiAgICBHRlhTdGVuY2lsT3BbR0ZYU3RlbmNpbE9wW1wiREVDUlwiXSA9IDRdID0gXCJERUNSXCI7XG4gICAgR0ZYU3RlbmNpbE9wW0dGWFN0ZW5jaWxPcFtcIklOVkVSVFwiXSA9IDVdID0gXCJJTlZFUlRcIjtcbiAgICBHRlhTdGVuY2lsT3BbR0ZYU3RlbmNpbE9wW1wiSU5DUl9XUkFQXCJdID0gNl0gPSBcIklOQ1JfV1JBUFwiO1xuICAgIEdGWFN0ZW5jaWxPcFtHRlhTdGVuY2lsT3BbXCJERUNSX1dSQVBcIl0gPSA3XSA9IFwiREVDUl9XUkFQXCI7XG59KShHRlhTdGVuY2lsT3AgfHwgKEdGWFN0ZW5jaWxPcCA9IHt9KSk7XG52YXIgR0ZYQmxlbmRPcDtcbihmdW5jdGlvbiAoR0ZYQmxlbmRPcCkge1xuICAgIEdGWEJsZW5kT3BbR0ZYQmxlbmRPcFtcIkFERFwiXSA9IDBdID0gXCJBRERcIjtcbiAgICBHRlhCbGVuZE9wW0dGWEJsZW5kT3BbXCJTVUJcIl0gPSAxXSA9IFwiU1VCXCI7XG4gICAgR0ZYQmxlbmRPcFtHRlhCbGVuZE9wW1wiUkVWX1NVQlwiXSA9IDJdID0gXCJSRVZfU1VCXCI7XG4gICAgR0ZYQmxlbmRPcFtHRlhCbGVuZE9wW1wiTUlOXCJdID0gM10gPSBcIk1JTlwiO1xuICAgIEdGWEJsZW5kT3BbR0ZYQmxlbmRPcFtcIk1BWFwiXSA9IDRdID0gXCJNQVhcIjtcbn0pKEdGWEJsZW5kT3AgfHwgKEdGWEJsZW5kT3AgPSB7fSkpO1xudmFyIEdGWEJsZW5kRmFjdG9yO1xuKGZ1bmN0aW9uIChHRlhCbGVuZEZhY3Rvcikge1xuICAgIEdGWEJsZW5kRmFjdG9yW0dGWEJsZW5kRmFjdG9yW1wiWkVST1wiXSA9IDBdID0gXCJaRVJPXCI7XG4gICAgR0ZYQmxlbmRGYWN0b3JbR0ZYQmxlbmRGYWN0b3JbXCJPTkVcIl0gPSAxXSA9IFwiT05FXCI7XG4gICAgR0ZYQmxlbmRGYWN0b3JbR0ZYQmxlbmRGYWN0b3JbXCJTUkNfQUxQSEFcIl0gPSAyXSA9IFwiU1JDX0FMUEhBXCI7XG4gICAgR0ZYQmxlbmRGYWN0b3JbR0ZYQmxlbmRGYWN0b3JbXCJEU1RfQUxQSEFcIl0gPSAzXSA9IFwiRFNUX0FMUEhBXCI7XG4gICAgR0ZYQmxlbmRGYWN0b3JbR0ZYQmxlbmRGYWN0b3JbXCJPTkVfTUlOVVNfU1JDX0FMUEhBXCJdID0gNF0gPSBcIk9ORV9NSU5VU19TUkNfQUxQSEFcIjtcbiAgICBHRlhCbGVuZEZhY3RvcltHRlhCbGVuZEZhY3RvcltcIk9ORV9NSU5VU19EU1RfQUxQSEFcIl0gPSA1XSA9IFwiT05FX01JTlVTX0RTVF9BTFBIQVwiO1xuICAgIEdGWEJsZW5kRmFjdG9yW0dGWEJsZW5kRmFjdG9yW1wiU1JDX0NPTE9SXCJdID0gNl0gPSBcIlNSQ19DT0xPUlwiO1xuICAgIEdGWEJsZW5kRmFjdG9yW0dGWEJsZW5kRmFjdG9yW1wiRFNUX0NPTE9SXCJdID0gN10gPSBcIkRTVF9DT0xPUlwiO1xuICAgIEdGWEJsZW5kRmFjdG9yW0dGWEJsZW5kRmFjdG9yW1wiT05FX01JTlVTX1NSQ19DT0xPUlwiXSA9IDhdID0gXCJPTkVfTUlOVVNfU1JDX0NPTE9SXCI7XG4gICAgR0ZYQmxlbmRGYWN0b3JbR0ZYQmxlbmRGYWN0b3JbXCJPTkVfTUlOVVNfRFNUX0NPTE9SXCJdID0gOV0gPSBcIk9ORV9NSU5VU19EU1RfQ09MT1JcIjtcbiAgICBHRlhCbGVuZEZhY3RvcltHRlhCbGVuZEZhY3RvcltcIlNSQ19BTFBIQV9TQVRVUkFURVwiXSA9IDEwXSA9IFwiU1JDX0FMUEhBX1NBVFVSQVRFXCI7XG4gICAgR0ZYQmxlbmRGYWN0b3JbR0ZYQmxlbmRGYWN0b3JbXCJDT05TVEFOVF9DT0xPUlwiXSA9IDExXSA9IFwiQ09OU1RBTlRfQ09MT1JcIjtcbiAgICBHRlhCbGVuZEZhY3RvcltHRlhCbGVuZEZhY3RvcltcIk9ORV9NSU5VU19DT05TVEFOVF9DT0xPUlwiXSA9IDEyXSA9IFwiT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SXCI7XG4gICAgR0ZYQmxlbmRGYWN0b3JbR0ZYQmxlbmRGYWN0b3JbXCJDT05TVEFOVF9BTFBIQVwiXSA9IDEzXSA9IFwiQ09OU1RBTlRfQUxQSEFcIjtcbiAgICBHRlhCbGVuZEZhY3RvcltHRlhCbGVuZEZhY3RvcltcIk9ORV9NSU5VU19DT05TVEFOVF9BTFBIQVwiXSA9IDE0XSA9IFwiT05FX01JTlVTX0NPTlNUQU5UX0FMUEhBXCI7XG59KShHRlhCbGVuZEZhY3RvciB8fCAoR0ZYQmxlbmRGYWN0b3IgPSB7fSkpO1xudmFyIEdGWENvbG9yTWFzaztcbihmdW5jdGlvbiAoR0ZYQ29sb3JNYXNrKSB7XG4gICAgR0ZYQ29sb3JNYXNrW0dGWENvbG9yTWFza1tcIk5PTkVcIl0gPSAwXSA9IFwiTk9ORVwiO1xuICAgIEdGWENvbG9yTWFza1tHRlhDb2xvck1hc2tbXCJSXCJdID0gMV0gPSBcIlJcIjtcbiAgICBHRlhDb2xvck1hc2tbR0ZYQ29sb3JNYXNrW1wiR1wiXSA9IDJdID0gXCJHXCI7XG4gICAgR0ZYQ29sb3JNYXNrW0dGWENvbG9yTWFza1tcIkJcIl0gPSA0XSA9IFwiQlwiO1xuICAgIEdGWENvbG9yTWFza1tHRlhDb2xvck1hc2tbXCJBXCJdID0gOF0gPSBcIkFcIjtcbiAgICBHRlhDb2xvck1hc2tbR0ZYQ29sb3JNYXNrW1wiQUxMXCJdID0gMTVdID0gXCJBTExcIjtcbn0pKEdGWENvbG9yTWFzayB8fCAoR0ZYQ29sb3JNYXNrID0ge30pKTtcbnZhciBHRlhGaWx0ZXI7XG4oZnVuY3Rpb24gKEdGWEZpbHRlcikge1xuICAgIEdGWEZpbHRlcltHRlhGaWx0ZXJbXCJOT05FXCJdID0gMF0gPSBcIk5PTkVcIjtcbiAgICBHRlhGaWx0ZXJbR0ZYRmlsdGVyW1wiUE9JTlRcIl0gPSAxXSA9IFwiUE9JTlRcIjtcbiAgICBHRlhGaWx0ZXJbR0ZYRmlsdGVyW1wiTElORUFSXCJdID0gMl0gPSBcIkxJTkVBUlwiO1xuICAgIEdGWEZpbHRlcltHRlhGaWx0ZXJbXCJBTklTT1RST1BJQ1wiXSA9IDNdID0gXCJBTklTT1RST1BJQ1wiO1xufSkoR0ZYRmlsdGVyIHx8IChHRlhGaWx0ZXIgPSB7fSkpO1xudmFyIEdGWEFkZHJlc3M7XG4oZnVuY3Rpb24gKEdGWEFkZHJlc3MpIHtcbiAgICBHRlhBZGRyZXNzW0dGWEFkZHJlc3NbXCJXUkFQXCJdID0gMF0gPSBcIldSQVBcIjtcbiAgICBHRlhBZGRyZXNzW0dGWEFkZHJlc3NbXCJNSVJST1JcIl0gPSAxXSA9IFwiTUlSUk9SXCI7XG4gICAgR0ZYQWRkcmVzc1tHRlhBZGRyZXNzW1wiQ0xBTVBcIl0gPSAyXSA9IFwiQ0xBTVBcIjtcbiAgICBHRlhBZGRyZXNzW0dGWEFkZHJlc3NbXCJCT1JERVJcIl0gPSAzXSA9IFwiQk9SREVSXCI7XG59KShHRlhBZGRyZXNzIHx8IChHRlhBZGRyZXNzID0ge30pKTtcbnZhciBHRlhUZXh0dXJlVHlwZTtcbihmdW5jdGlvbiAoR0ZYVGV4dHVyZVR5cGUpIHtcbiAgICBHRlhUZXh0dXJlVHlwZVtHRlhUZXh0dXJlVHlwZVtcIlRFWDFEXCJdID0gMF0gPSBcIlRFWDFEXCI7XG4gICAgR0ZYVGV4dHVyZVR5cGVbR0ZYVGV4dHVyZVR5cGVbXCJURVgyRFwiXSA9IDFdID0gXCJURVgyRFwiO1xuICAgIEdGWFRleHR1cmVUeXBlW0dGWFRleHR1cmVUeXBlW1wiVEVYM0RcIl0gPSAyXSA9IFwiVEVYM0RcIjtcbn0pKEdGWFRleHR1cmVUeXBlIHx8IChHRlhUZXh0dXJlVHlwZSA9IHt9KSk7XG52YXIgR0ZYVGV4dHVyZVVzYWdlQml0O1xuKGZ1bmN0aW9uIChHRlhUZXh0dXJlVXNhZ2VCaXQpIHtcbiAgICBHRlhUZXh0dXJlVXNhZ2VCaXRbR0ZYVGV4dHVyZVVzYWdlQml0W1wiTk9ORVwiXSA9IDBdID0gXCJOT05FXCI7XG4gICAgR0ZYVGV4dHVyZVVzYWdlQml0W0dGWFRleHR1cmVVc2FnZUJpdFtcIlRSQU5TRkVSX1NSQ1wiXSA9IDFdID0gXCJUUkFOU0ZFUl9TUkNcIjtcbiAgICBHRlhUZXh0dXJlVXNhZ2VCaXRbR0ZYVGV4dHVyZVVzYWdlQml0W1wiVFJBTlNGRVJfRFNUXCJdID0gMl0gPSBcIlRSQU5TRkVSX0RTVFwiO1xuICAgIEdGWFRleHR1cmVVc2FnZUJpdFtHRlhUZXh0dXJlVXNhZ2VCaXRbXCJTQU1QTEVEXCJdID0gNF0gPSBcIlNBTVBMRURcIjtcbiAgICBHRlhUZXh0dXJlVXNhZ2VCaXRbR0ZYVGV4dHVyZVVzYWdlQml0W1wiU1RPUkFHRVwiXSA9IDhdID0gXCJTVE9SQUdFXCI7XG4gICAgR0ZYVGV4dHVyZVVzYWdlQml0W0dGWFRleHR1cmVVc2FnZUJpdFtcIkNPTE9SX0FUVEFDSE1FTlRcIl0gPSAxNl0gPSBcIkNPTE9SX0FUVEFDSE1FTlRcIjtcbiAgICBHRlhUZXh0dXJlVXNhZ2VCaXRbR0ZYVGV4dHVyZVVzYWdlQml0W1wiREVQVEhfU1RFTkNJTF9BVFRBQ0hNRU5UXCJdID0gMzJdID0gXCJERVBUSF9TVEVOQ0lMX0FUVEFDSE1FTlRcIjtcbiAgICBHRlhUZXh0dXJlVXNhZ2VCaXRbR0ZYVGV4dHVyZVVzYWdlQml0W1wiVFJBTlNJRU5UX0FUVEFDSE1FTlRcIl0gPSA2NF0gPSBcIlRSQU5TSUVOVF9BVFRBQ0hNRU5UXCI7XG4gICAgR0ZYVGV4dHVyZVVzYWdlQml0W0dGWFRleHR1cmVVc2FnZUJpdFtcIklOUFVUX0FUVEFDSE1FTlRcIl0gPSAxMjhdID0gXCJJTlBVVF9BVFRBQ0hNRU5UXCI7XG59KShHRlhUZXh0dXJlVXNhZ2VCaXQgfHwgKEdGWFRleHR1cmVVc2FnZUJpdCA9IHt9KSk7XG52YXIgR0ZYU2FtcGxlQ291bnQ7XG4oZnVuY3Rpb24gKEdGWFNhbXBsZUNvdW50KSB7XG4gICAgR0ZYU2FtcGxlQ291bnRbR0ZYU2FtcGxlQ291bnRbXCJYMVwiXSA9IDBdID0gXCJYMVwiO1xuICAgIEdGWFNhbXBsZUNvdW50W0dGWFNhbXBsZUNvdW50W1wiWDJcIl0gPSAxXSA9IFwiWDJcIjtcbiAgICBHRlhTYW1wbGVDb3VudFtHRlhTYW1wbGVDb3VudFtcIlg0XCJdID0gMl0gPSBcIlg0XCI7XG4gICAgR0ZYU2FtcGxlQ291bnRbR0ZYU2FtcGxlQ291bnRbXCJYOFwiXSA9IDNdID0gXCJYOFwiO1xuICAgIEdGWFNhbXBsZUNvdW50W0dGWFNhbXBsZUNvdW50W1wiWDE2XCJdID0gNF0gPSBcIlgxNlwiO1xuICAgIEdGWFNhbXBsZUNvdW50W0dGWFNhbXBsZUNvdW50W1wiWDMyXCJdID0gNV0gPSBcIlgzMlwiO1xuICAgIEdGWFNhbXBsZUNvdW50W0dGWFNhbXBsZUNvdW50W1wiWDY0XCJdID0gNl0gPSBcIlg2NFwiO1xufSkoR0ZYU2FtcGxlQ291bnQgfHwgKEdGWFNhbXBsZUNvdW50ID0ge30pKTtcbnZhciBHRlhUZXh0dXJlRmxhZ0JpdDtcbihmdW5jdGlvbiAoR0ZYVGV4dHVyZUZsYWdCaXQpIHtcbiAgICBHRlhUZXh0dXJlRmxhZ0JpdFtHRlhUZXh0dXJlRmxhZ0JpdFtcIk5PTkVcIl0gPSAwXSA9IFwiTk9ORVwiO1xuICAgIEdGWFRleHR1cmVGbGFnQml0W0dGWFRleHR1cmVGbGFnQml0W1wiR0VOX01JUE1BUFwiXSA9IDFdID0gXCJHRU5fTUlQTUFQXCI7XG4gICAgR0ZYVGV4dHVyZUZsYWdCaXRbR0ZYVGV4dHVyZUZsYWdCaXRbXCJDVUJFTUFQXCJdID0gMl0gPSBcIkNVQkVNQVBcIjtcbiAgICBHRlhUZXh0dXJlRmxhZ0JpdFtHRlhUZXh0dXJlRmxhZ0JpdFtcIkJBS1VQX0JVRkZFUlwiXSA9IDRdID0gXCJCQUtVUF9CVUZGRVJcIjtcbn0pKEdGWFRleHR1cmVGbGFnQml0IHx8IChHRlhUZXh0dXJlRmxhZ0JpdCA9IHt9KSk7XG52YXIgR0ZYVGV4dHVyZVZpZXdUeXBlO1xuKGZ1bmN0aW9uIChHRlhUZXh0dXJlVmlld1R5cGUpIHtcbiAgICBHRlhUZXh0dXJlVmlld1R5cGVbR0ZYVGV4dHVyZVZpZXdUeXBlW1wiVFYxRFwiXSA9IDBdID0gXCJUVjFEXCI7XG4gICAgR0ZYVGV4dHVyZVZpZXdUeXBlW0dGWFRleHR1cmVWaWV3VHlwZVtcIlRWMkRcIl0gPSAxXSA9IFwiVFYyRFwiO1xuICAgIEdGWFRleHR1cmVWaWV3VHlwZVtHRlhUZXh0dXJlVmlld1R5cGVbXCJUVjNEXCJdID0gMl0gPSBcIlRWM0RcIjtcbiAgICBHRlhUZXh0dXJlVmlld1R5cGVbR0ZYVGV4dHVyZVZpZXdUeXBlW1wiQ1VCRVwiXSA9IDNdID0gXCJDVUJFXCI7XG4gICAgR0ZYVGV4dHVyZVZpZXdUeXBlW0dGWFRleHR1cmVWaWV3VHlwZVtcIlRWMURfQVJSQVlcIl0gPSA0XSA9IFwiVFYxRF9BUlJBWVwiO1xuICAgIEdGWFRleHR1cmVWaWV3VHlwZVtHRlhUZXh0dXJlVmlld1R5cGVbXCJUVjJEX0FSUkFZXCJdID0gNV0gPSBcIlRWMkRfQVJSQVlcIjtcbn0pKEdGWFRleHR1cmVWaWV3VHlwZSB8fCAoR0ZYVGV4dHVyZVZpZXdUeXBlID0ge30pKTtcbnZhciBHRlhTaGFkZXJUeXBlO1xuKGZ1bmN0aW9uIChHRlhTaGFkZXJUeXBlKSB7XG4gICAgR0ZYU2hhZGVyVHlwZVtHRlhTaGFkZXJUeXBlW1wiVkVSVEVYXCJdID0gMF0gPSBcIlZFUlRFWFwiO1xuICAgIEdGWFNoYWRlclR5cGVbR0ZYU2hhZGVyVHlwZVtcIkhVTExcIl0gPSAxXSA9IFwiSFVMTFwiO1xuICAgIEdGWFNoYWRlclR5cGVbR0ZYU2hhZGVyVHlwZVtcIkRPTUFJTlwiXSA9IDJdID0gXCJET01BSU5cIjtcbiAgICBHRlhTaGFkZXJUeXBlW0dGWFNoYWRlclR5cGVbXCJHRU9NRVRSWVwiXSA9IDNdID0gXCJHRU9NRVRSWVwiO1xuICAgIEdGWFNoYWRlclR5cGVbR0ZYU2hhZGVyVHlwZVtcIkZSQUdNRU5UXCJdID0gNF0gPSBcIkZSQUdNRU5UXCI7XG4gICAgR0ZYU2hhZGVyVHlwZVtHRlhTaGFkZXJUeXBlW1wiQ09NUFVURVwiXSA9IDVdID0gXCJDT01QVVRFXCI7XG4gICAgR0ZYU2hhZGVyVHlwZVtHRlhTaGFkZXJUeXBlW1wiQ09VTlRcIl0gPSA2XSA9IFwiQ09VTlRcIjtcbn0pKEdGWFNoYWRlclR5cGUgfHwgKEdGWFNoYWRlclR5cGUgPSB7fSkpO1xudmFyIEdGWEJpbmRpbmdUeXBlO1xuKGZ1bmN0aW9uIChHRlhCaW5kaW5nVHlwZSkge1xuICAgIEdGWEJpbmRpbmdUeXBlW0dGWEJpbmRpbmdUeXBlW1wiVU5LTk9XTlwiXSA9IDBdID0gXCJVTktOT1dOXCI7XG4gICAgR0ZYQmluZGluZ1R5cGVbR0ZYQmluZGluZ1R5cGVbXCJVTklGT1JNX0JVRkZFUlwiXSA9IDFdID0gXCJVTklGT1JNX0JVRkZFUlwiO1xuICAgIEdGWEJpbmRpbmdUeXBlW0dGWEJpbmRpbmdUeXBlW1wiU0FNUExFUlwiXSA9IDJdID0gXCJTQU1QTEVSXCI7XG4gICAgR0ZYQmluZGluZ1R5cGVbR0ZYQmluZGluZ1R5cGVbXCJTVE9SQUdFX0JVRkZFUlwiXSA9IDNdID0gXCJTVE9SQUdFX0JVRkZFUlwiO1xufSkoR0ZYQmluZGluZ1R5cGUgfHwgKEdGWEJpbmRpbmdUeXBlID0ge30pKTtcbnZhciBHRlhDb21tYW5kQnVmZmVyVHlwZTtcbihmdW5jdGlvbiAoR0ZYQ29tbWFuZEJ1ZmZlclR5cGUpIHtcbiAgICBHRlhDb21tYW5kQnVmZmVyVHlwZVtHRlhDb21tYW5kQnVmZmVyVHlwZVtcIlBSSU1BUllcIl0gPSAwXSA9IFwiUFJJTUFSWVwiO1xuICAgIEdGWENvbW1hbmRCdWZmZXJUeXBlW0dGWENvbW1hbmRCdWZmZXJUeXBlW1wiU0VDT05EQVJZXCJdID0gMV0gPSBcIlNFQ09OREFSWVwiO1xufSkoR0ZYQ29tbWFuZEJ1ZmZlclR5cGUgfHwgKEdGWENvbW1hbmRCdWZmZXJUeXBlID0ge30pKTtcbi8vIEVudW1lcmF0aW9uIGFsbCBwb3NzaWJsZSB2YWx1ZXMgb2Ygb3BlcmF0aW9ucyB0byBiZSBwZXJmb3JtZWQgb24gaW5pdGlhbGx5IExvYWRpbmcgYSBGcmFtZWJ1ZmZlciBPYmplY3QuXG52YXIgR0ZYTG9hZE9wO1xuKGZ1bmN0aW9uIChHRlhMb2FkT3ApIHtcbiAgICBHRlhMb2FkT3BbR0ZYTG9hZE9wW1wiTE9BRFwiXSA9IDBdID0gXCJMT0FEXCI7XG4gICAgR0ZYTG9hZE9wW0dGWExvYWRPcFtcIkNMRUFSXCJdID0gMV0gPSBcIkNMRUFSXCI7XG4gICAgR0ZYTG9hZE9wW0dGWExvYWRPcFtcIkRJU0NBUkRcIl0gPSAyXSA9IFwiRElTQ0FSRFwiO1xufSkoR0ZYTG9hZE9wIHx8IChHRlhMb2FkT3AgPSB7fSkpO1xuLy8gRW51bWVyYXRlcyBhbGwgcG9zc2libGUgdmFsdWVzIG9mIG9wZXJhdGlvbnMgdG8gYmUgcGVyZm9ybWVkIHdoZW4gU3RvcmluZyB0byBhIEZyYW1lYnVmZmVyIE9iamVjdC5cbnZhciBHRlhTdG9yZU9wO1xuKGZ1bmN0aW9uIChHRlhTdG9yZU9wKSB7XG4gICAgR0ZYU3RvcmVPcFtHRlhTdG9yZU9wW1wiU1RPUkVcIl0gPSAwXSA9IFwiU1RPUkVcIjtcbiAgICBHRlhTdG9yZU9wW0dGWFN0b3JlT3BbXCJESVNDQVJEXCJdID0gMV0gPSBcIkRJU0NBUkRcIjtcbn0pKEdGWFN0b3JlT3AgfHwgKEdGWFN0b3JlT3AgPSB7fSkpO1xudmFyIEdGWFRleHR1cmVMYXlvdXQ7XG4oZnVuY3Rpb24gKEdGWFRleHR1cmVMYXlvdXQpIHtcbiAgICBHRlhUZXh0dXJlTGF5b3V0W0dGWFRleHR1cmVMYXlvdXRbXCJVTkRFRklORURcIl0gPSAwXSA9IFwiVU5ERUZJTkVEXCI7XG4gICAgR0ZYVGV4dHVyZUxheW91dFtHRlhUZXh0dXJlTGF5b3V0W1wiR0VORVJBTFwiXSA9IDFdID0gXCJHRU5FUkFMXCI7XG4gICAgR0ZYVGV4dHVyZUxheW91dFtHRlhUZXh0dXJlTGF5b3V0W1wiQ09MT1JfQVRUQUNITUVOVF9PUFRJTUFMXCJdID0gMl0gPSBcIkNPTE9SX0FUVEFDSE1FTlRfT1BUSU1BTFwiO1xuICAgIEdGWFRleHR1cmVMYXlvdXRbR0ZYVGV4dHVyZUxheW91dFtcIkRFUFRIX1NURU5DSUxfQVRUQUNITUVOVF9PUFRJTUFMXCJdID0gM10gPSBcIkRFUFRIX1NURU5DSUxfQVRUQUNITUVOVF9PUFRJTUFMXCI7XG4gICAgR0ZYVGV4dHVyZUxheW91dFtHRlhUZXh0dXJlTGF5b3V0W1wiREVQVEhfU1RFTkNJTF9SRUFET05MWV9PUFRJTUFMXCJdID0gNF0gPSBcIkRFUFRIX1NURU5DSUxfUkVBRE9OTFlfT1BUSU1BTFwiO1xuICAgIEdGWFRleHR1cmVMYXlvdXRbR0ZYVGV4dHVyZUxheW91dFtcIlNIQURFUl9SRUFET05MWV9PUFRJTUFMXCJdID0gNV0gPSBcIlNIQURFUl9SRUFET05MWV9PUFRJTUFMXCI7XG4gICAgR0ZYVGV4dHVyZUxheW91dFtHRlhUZXh0dXJlTGF5b3V0W1wiVFJBTlNGRVJfU1JDX09QVElNQUxcIl0gPSA2XSA9IFwiVFJBTlNGRVJfU1JDX09QVElNQUxcIjtcbiAgICBHRlhUZXh0dXJlTGF5b3V0W0dGWFRleHR1cmVMYXlvdXRbXCJUUkFOU0ZFUl9EU1RfT1BUSU1BTFwiXSA9IDddID0gXCJUUkFOU0ZFUl9EU1RfT1BUSU1BTFwiO1xuICAgIEdGWFRleHR1cmVMYXlvdXRbR0ZYVGV4dHVyZUxheW91dFtcIlBSRUlOSVRJQUxJWkVEXCJdID0gOF0gPSBcIlBSRUlOSVRJQUxJWkVEXCI7XG4gICAgR0ZYVGV4dHVyZUxheW91dFtHRlhUZXh0dXJlTGF5b3V0W1wiUFJFU0VOVF9TUkNcIl0gPSA5XSA9IFwiUFJFU0VOVF9TUkNcIjtcbn0pKEdGWFRleHR1cmVMYXlvdXQgfHwgKEdGWFRleHR1cmVMYXlvdXQgPSB7fSkpO1xudmFyIEdGWFBpcGVsaW5lQmluZFBvaW50O1xuKGZ1bmN0aW9uIChHRlhQaXBlbGluZUJpbmRQb2ludCkge1xuICAgIEdGWFBpcGVsaW5lQmluZFBvaW50W0dGWFBpcGVsaW5lQmluZFBvaW50W1wiR1JBUEhJQ1NcIl0gPSAwXSA9IFwiR1JBUEhJQ1NcIjtcbiAgICBHRlhQaXBlbGluZUJpbmRQb2ludFtHRlhQaXBlbGluZUJpbmRQb2ludFtcIkNPTVBVVEVcIl0gPSAxXSA9IFwiQ09NUFVURVwiO1xuICAgIEdGWFBpcGVsaW5lQmluZFBvaW50W0dGWFBpcGVsaW5lQmluZFBvaW50W1wiUkFZX1RSQUNJTkdcIl0gPSAyXSA9IFwiUkFZX1RSQUNJTkdcIjtcbn0pKEdGWFBpcGVsaW5lQmluZFBvaW50IHx8IChHRlhQaXBlbGluZUJpbmRQb2ludCA9IHt9KSk7XG52YXIgR0ZYRHluYW1pY1N0YXRlO1xuKGZ1bmN0aW9uIChHRlhEeW5hbWljU3RhdGUpIHtcbiAgICBHRlhEeW5hbWljU3RhdGVbR0ZYRHluYW1pY1N0YXRlW1wiVklFV1BPUlRcIl0gPSAwXSA9IFwiVklFV1BPUlRcIjtcbiAgICBHRlhEeW5hbWljU3RhdGVbR0ZYRHluYW1pY1N0YXRlW1wiU0NJU1NPUlwiXSA9IDFdID0gXCJTQ0lTU09SXCI7XG4gICAgR0ZYRHluYW1pY1N0YXRlW0dGWER5bmFtaWNTdGF0ZVtcIkxJTkVfV0lEVEhcIl0gPSAyXSA9IFwiTElORV9XSURUSFwiO1xuICAgIEdGWER5bmFtaWNTdGF0ZVtHRlhEeW5hbWljU3RhdGVbXCJERVBUSF9CSUFTXCJdID0gM10gPSBcIkRFUFRIX0JJQVNcIjtcbiAgICBHRlhEeW5hbWljU3RhdGVbR0ZYRHluYW1pY1N0YXRlW1wiQkxFTkRfQ09OU1RBTlRTXCJdID0gNF0gPSBcIkJMRU5EX0NPTlNUQU5UU1wiO1xuICAgIEdGWER5bmFtaWNTdGF0ZVtHRlhEeW5hbWljU3RhdGVbXCJERVBUSF9CT1VORFNcIl0gPSA1XSA9IFwiREVQVEhfQk9VTkRTXCI7XG4gICAgR0ZYRHluYW1pY1N0YXRlW0dGWER5bmFtaWNTdGF0ZVtcIlNURU5DSUxfV1JJVEVfTUFTS1wiXSA9IDZdID0gXCJTVEVOQ0lMX1dSSVRFX01BU0tcIjtcbiAgICBHRlhEeW5hbWljU3RhdGVbR0ZYRHluYW1pY1N0YXRlW1wiU1RFTkNJTF9DT01QQVJFX01BU0tcIl0gPSA3XSA9IFwiU1RFTkNJTF9DT01QQVJFX01BU0tcIjtcbn0pKEdGWER5bmFtaWNTdGF0ZSB8fCAoR0ZYRHluYW1pY1N0YXRlID0ge30pKTtcbnZhciBHRlhTdGVuY2lsRmFjZTtcbihmdW5jdGlvbiAoR0ZYU3RlbmNpbEZhY2UpIHtcbiAgICBHRlhTdGVuY2lsRmFjZVtHRlhTdGVuY2lsRmFjZVtcIkZST05UXCJdID0gMF0gPSBcIkZST05UXCI7XG4gICAgR0ZYU3RlbmNpbEZhY2VbR0ZYU3RlbmNpbEZhY2VbXCJCQUNLXCJdID0gMV0gPSBcIkJBQ0tcIjtcbiAgICBHRlhTdGVuY2lsRmFjZVtHRlhTdGVuY2lsRmFjZVtcIkFMTFwiXSA9IDJdID0gXCJBTExcIjtcbn0pKEdGWFN0ZW5jaWxGYWNlIHx8IChHRlhTdGVuY2lsRmFjZSA9IHt9KSk7XG52YXIgR0ZYUXVldWVUeXBlO1xuKGZ1bmN0aW9uIChHRlhRdWV1ZVR5cGUpIHtcbiAgICBHRlhRdWV1ZVR5cGVbR0ZYUXVldWVUeXBlW1wiR1JBUEhJQ1NcIl0gPSAwXSA9IFwiR1JBUEhJQ1NcIjtcbiAgICBHRlhRdWV1ZVR5cGVbR0ZYUXVldWVUeXBlW1wiQ09NUFVURVwiXSA9IDFdID0gXCJDT01QVVRFXCI7XG4gICAgR0ZYUXVldWVUeXBlW0dGWFF1ZXVlVHlwZVtcIlRSQU5TRkVSXCJdID0gMl0gPSBcIlRSQU5TRkVSXCI7XG59KShHRlhRdWV1ZVR5cGUgfHwgKEdGWFF1ZXVlVHlwZSA9IHt9KSk7XG52YXIgR0ZYQ2xlYXJGbGFnO1xuKGZ1bmN0aW9uIChHRlhDbGVhckZsYWcpIHtcbiAgICBHRlhDbGVhckZsYWdbR0ZYQ2xlYXJGbGFnW1wiTk9ORVwiXSA9IDBdID0gXCJOT05FXCI7XG4gICAgR0ZYQ2xlYXJGbGFnW0dGWENsZWFyRmxhZ1tcIkNPTE9SXCJdID0gMV0gPSBcIkNPTE9SXCI7XG4gICAgR0ZYQ2xlYXJGbGFnW0dGWENsZWFyRmxhZ1tcIkRFUFRIXCJdID0gMl0gPSBcIkRFUFRIXCI7XG4gICAgR0ZYQ2xlYXJGbGFnW0dGWENsZWFyRmxhZ1tcIlNURU5DSUxcIl0gPSA0XSA9IFwiU1RFTkNJTFwiO1xuICAgIEdGWENsZWFyRmxhZ1tHRlhDbGVhckZsYWdbXCJERVBUSF9TVEVOQ0lMXCJdID0gNl0gPSBcIkRFUFRIX1NURU5DSUxcIjtcbiAgICBHRlhDbGVhckZsYWdbR0ZYQ2xlYXJGbGFnW1wiQUxMXCJdID0gN10gPSBcIkFMTFwiO1xufSkoR0ZYQ2xlYXJGbGFnIHx8IChHRlhDbGVhckZsYWcgPSB7fSkpO1xuZnVuY3Rpb24gR0ZYR2V0VHlwZVNpemUodHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIEdGWFR5cGUuQk9PTDpcbiAgICAgICAgY2FzZSBHRlhUeXBlLklOVDpcbiAgICAgICAgY2FzZSBHRlhUeXBlLlVJTlQ6XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5GTE9BVDogcmV0dXJuIDQ7XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5CT09MMjpcbiAgICAgICAgY2FzZSBHRlhUeXBlLklOVDI6XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5VSU5UMjpcbiAgICAgICAgY2FzZSBHRlhUeXBlLkZMT0FUMjogcmV0dXJuIDg7XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5CT09MMzpcbiAgICAgICAgY2FzZSBHRlhUeXBlLklOVDM6XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5VSU5UMzpcbiAgICAgICAgY2FzZSBHRlhUeXBlLkZMT0FUMzogcmV0dXJuIDEyO1xuICAgICAgICBjYXNlIEdGWFR5cGUuQk9PTDQ6XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5JTlQ0OlxuICAgICAgICBjYXNlIEdGWFR5cGUuVUlOVDQ6XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5GTE9BVDQ6XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5NQVQyOiByZXR1cm4gMTY7XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5NQVQyWDM6IHJldHVybiAyNDtcbiAgICAgICAgY2FzZSBHRlhUeXBlLk1BVDJYNDogcmV0dXJuIDMyO1xuICAgICAgICBjYXNlIEdGWFR5cGUuTUFUM1gyOiByZXR1cm4gMjQ7XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5NQVQzOiByZXR1cm4gMzY7XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5NQVQzWDQ6IHJldHVybiA0ODtcbiAgICAgICAgY2FzZSBHRlhUeXBlLk1BVDRYMjogcmV0dXJuIDMyO1xuICAgICAgICBjYXNlIEdGWFR5cGUuTUFUNFgyOiByZXR1cm4gMzI7XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5NQVQ0OiByZXR1cm4gNjQ7XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5TQU1QTEVSMUQ6XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5TQU1QTEVSMURfQVJSQVk6XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5TQU1QTEVSMkQ6XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5TQU1QTEVSMkRfQVJSQVk6XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5TQU1QTEVSM0Q6XG4gICAgICAgIGNhc2UgR0ZYVHlwZS5TQU1QTEVSX0NVQkU6IHJldHVybiA0O1xuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gaW1wb3J0IHsgR0ZYQnVmZmVyIH0gZnJvbSAnLi4vZ2Z4L2J1ZmZlcic7XG52YXIgUmVuZGVyUGFzc1N0YWdlO1xuKGZ1bmN0aW9uIChSZW5kZXJQYXNzU3RhZ2UpIHtcbiAgICBSZW5kZXJQYXNzU3RhZ2VbUmVuZGVyUGFzc1N0YWdlW1wiREVGQVVMVFwiXSA9IDEwMF0gPSBcIkRFRkFVTFRcIjtcbn0pKFJlbmRlclBhc3NTdGFnZSB8fCAoUmVuZGVyUGFzc1N0YWdlID0ge30pKTtcbnZhciBSZW5kZXJQcmlvcml0eTtcbihmdW5jdGlvbiAoUmVuZGVyUHJpb3JpdHkpIHtcbiAgICBSZW5kZXJQcmlvcml0eVtSZW5kZXJQcmlvcml0eVtcIk1JTlwiXSA9IDBdID0gXCJNSU5cIjtcbiAgICBSZW5kZXJQcmlvcml0eVtSZW5kZXJQcmlvcml0eVtcIk1BWFwiXSA9IDI1NV0gPSBcIk1BWFwiO1xuICAgIFJlbmRlclByaW9yaXR5W1JlbmRlclByaW9yaXR5W1wiREVGQVVMVFwiXSA9IDEyOF0gPSBcIkRFRkFVTFRcIjtcbn0pKFJlbmRlclByaW9yaXR5IHx8IChSZW5kZXJQcmlvcml0eSA9IHt9KSk7XG52YXIgTUFYX0JJTkRJTkdfU1VQUE9SVEVEID0gMjQ7IC8vIGZyb20gV2ViR0wgMiBzcGVjXG52YXIgVW5pZm9ybUJpbmRpbmc7XG4oZnVuY3Rpb24gKFVuaWZvcm1CaW5kaW5nKSB7XG4gICAgLy8gVUJPc1xuICAgIFVuaWZvcm1CaW5kaW5nW1VuaWZvcm1CaW5kaW5nW1wiVUJPX0dMT0JBTFwiXSA9IE1BWF9CSU5ESU5HX1NVUFBPUlRFRCAtIDFdID0gXCJVQk9fR0xPQkFMXCI7XG4gICAgVW5pZm9ybUJpbmRpbmdbVW5pZm9ybUJpbmRpbmdbXCJVQk9fU0hBRE9XXCJdID0gTUFYX0JJTkRJTkdfU1VQUE9SVEVEIC0gMl0gPSBcIlVCT19TSEFET1dcIjtcbiAgICBVbmlmb3JtQmluZGluZ1tVbmlmb3JtQmluZGluZ1tcIlVCT19MT0NBTFwiXSA9IE1BWF9CSU5ESU5HX1NVUFBPUlRFRCAtIDNdID0gXCJVQk9fTE9DQUxcIjtcbiAgICBVbmlmb3JtQmluZGluZ1tVbmlmb3JtQmluZGluZ1tcIlVCT19GT1JXQVJEX0xJR0hUU1wiXSA9IE1BWF9CSU5ESU5HX1NVUFBPUlRFRCAtIDRdID0gXCJVQk9fRk9SV0FSRF9MSUdIVFNcIjtcbiAgICBVbmlmb3JtQmluZGluZ1tVbmlmb3JtQmluZGluZ1tcIlVCT19TS0lOTklOR1wiXSA9IE1BWF9CSU5ESU5HX1NVUFBPUlRFRCAtIDVdID0gXCJVQk9fU0tJTk5JTkdcIjtcbiAgICBVbmlmb3JtQmluZGluZ1tVbmlmb3JtQmluZGluZ1tcIlVCT19TS0lOTklOR19URVhUVVJFXCJdID0gTUFYX0JJTkRJTkdfU1VQUE9SVEVEIC0gNl0gPSBcIlVCT19TS0lOTklOR19URVhUVVJFXCI7XG4gICAgVW5pZm9ybUJpbmRpbmdbVW5pZm9ybUJpbmRpbmdbXCJVQk9fVUlcIl0gPSBNQVhfQklORElOR19TVVBQT1JURUQgLSA3XSA9IFwiVUJPX1VJXCI7XG4gICAgLy8gc2FtcGxlcnNcbiAgICBVbmlmb3JtQmluZGluZ1tVbmlmb3JtQmluZGluZ1tcIlNBTVBMRVJfSk9JTlRTXCJdID0gTUFYX0JJTkRJTkdfU1VQUE9SVEVEICsgMV0gPSBcIlNBTVBMRVJfSk9JTlRTXCI7XG4gICAgVW5pZm9ybUJpbmRpbmdbVW5pZm9ybUJpbmRpbmdbXCJTQU1QTEVSX0VOVklST05NRU5UXCJdID0gTUFYX0JJTkRJTkdfU1VQUE9SVEVEICsgMl0gPSBcIlNBTVBMRVJfRU5WSVJPTk1FTlRcIjtcbiAgICAvLyByb29tcyBsZWZ0IGZvciBjdXN0b20gYmluZGluZ3NcbiAgICAvLyBlZmZlY3QgaW1wb3J0ZXIgcHJlcGFyZXMgYmluZGluZ3MgYWNjb3JkaW5nIHRvIHRoaXNcbiAgICBVbmlmb3JtQmluZGluZ1tVbmlmb3JtQmluZGluZ1tcIkNVU1RVTV9VQk9fQklORElOR19FTkRfUE9JTlRcIl0gPSBNQVhfQklORElOR19TVVBQT1JURUQgLSA3XSA9IFwiQ1VTVFVNX1VCT19CSU5ESU5HX0VORF9QT0lOVFwiO1xuICAgIFVuaWZvcm1CaW5kaW5nW1VuaWZvcm1CaW5kaW5nW1wiQ1VTVE9NX1NBTVBMRVJfQklORElOR19TVEFSVF9QT0lOVFwiXSA9IE1BWF9CSU5ESU5HX1NVUFBPUlRFRCArIDZdID0gXCJDVVNUT01fU0FNUExFUl9CSU5ESU5HX1NUQVJUX1BPSU5UXCI7XG59KShVbmlmb3JtQmluZGluZyB8fCAoVW5pZm9ybUJpbmRpbmcgPSB7fSkpO1xuLy8gZXhwb3J0IGNsYXNzIFVCT0dsb2JhbCB7XG4vLyAgICAgcHVibGljIHN0YXRpYyBUSU1FX09GRlNFVDogbnVtYmVyID0gMDtcbi8vICAgICBwdWJsaWMgc3RhdGljIFNDUkVFTl9TSVpFX09GRlNFVDogbnVtYmVyID0gVUJPR2xvYmFsLlRJTUVfT0ZGU0VUICsgNDtcbi8vICAgICBwdWJsaWMgc3RhdGljIFNDUkVFTl9TQ0FMRV9PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5TQ1JFRU5fU0laRV9PRkZTRVQgKyA0O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgTkFUSVZFX1NJWkVfT0ZGU0VUOiBudW1iZXIgPSBVQk9HbG9iYWwuU0NSRUVOX1NDQUxFX09GRlNFVCArIDQ7XG4vLyAgICAgcHVibGljIHN0YXRpYyBNQVRfVklFV19PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5OQVRJVkVfU0laRV9PRkZTRVQgKyA0O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgTUFUX1ZJRVdfSU5WX09GRlNFVDogbnVtYmVyID0gVUJPR2xvYmFsLk1BVF9WSUVXX09GRlNFVCArIDE2O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgTUFUX1BST0pfT0ZGU0VUOiBudW1iZXIgPSBVQk9HbG9iYWwuTUFUX1ZJRVdfSU5WX09GRlNFVCArIDE2O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgTUFUX1BST0pfSU5WX09GRlNFVDogbnVtYmVyID0gVUJPR2xvYmFsLk1BVF9QUk9KX09GRlNFVCArIDE2O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgTUFUX1ZJRVdfUFJPSl9PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5NQVRfUFJPSl9JTlZfT0ZGU0VUICsgMTY7XG4vLyAgICAgcHVibGljIHN0YXRpYyBNQVRfVklFV19QUk9KX0lOVl9PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5NQVRfVklFV19QUk9KX09GRlNFVCArIDE2O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgQ0FNRVJBX1BPU19PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5NQVRfVklFV19QUk9KX0lOVl9PRkZTRVQgKyAxNjtcbi8vICAgICBwdWJsaWMgc3RhdGljIEVYUE9TVVJFX09GRlNFVDogbnVtYmVyID0gVUJPR2xvYmFsLkNBTUVSQV9QT1NfT0ZGU0VUICsgNDtcbi8vICAgICBwdWJsaWMgc3RhdGljIE1BSU5fTElUX0RJUl9PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5FWFBPU1VSRV9PRkZTRVQgKyA0O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgTUFJTl9MSVRfQ09MT1JfT0ZGU0VUOiBudW1iZXIgPSBVQk9HbG9iYWwuTUFJTl9MSVRfRElSX09GRlNFVCArIDQ7XG4vLyAgICAgcHVibGljIHN0YXRpYyBBTUJJRU5UX1NLWV9PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5NQUlOX0xJVF9DT0xPUl9PRkZTRVQgKyA0O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgQU1CSUVOVF9HUk9VTkRfT0ZGU0VUOiBudW1iZXIgPSBVQk9HbG9iYWwuQU1CSUVOVF9TS1lfT0ZGU0VUICsgNDtcbi8vICAgICBwdWJsaWMgc3RhdGljIENPVU5UOiBudW1iZXIgPSBVQk9HbG9iYWwuQU1CSUVOVF9HUk9VTkRfT0ZGU0VUICsgNDtcbi8vICAgICBwdWJsaWMgc3RhdGljIFNJWkU6IG51bWJlciA9IFVCT0dsb2JhbC5DT1VOVCAqIDQ7XG4vLyAgICAgcHVibGljIHN0YXRpYyBCTE9DSzogR0ZYVW5pZm9ybUJsb2NrID0ge1xuLy8gICAgICAgICBiaW5kaW5nOiBVbmlmb3JtQmluZGluZy5VQk9fR0xPQkFMLCBuYW1lOiAnQ0NHbG9iYWwnLCBtZW1iZXJzOiBbXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY190aW1lJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiAxIH0sXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19zY3JlZW5TaXplJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiAxIH0sXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19zY3JlZW5TY2FsZScsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogMSB9LFxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2NfbmF0aXZlU2l6ZScsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogMSB9LFxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2NfbWF0VmlldycsIHR5cGU6IEdGWFR5cGUuTUFUNCwgY291bnQ6IDEgfSxcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX21hdFZpZXdJbnYnLCB0eXBlOiBHRlhUeXBlLk1BVDQsIGNvdW50OiAxIH0sXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19tYXRQcm9qJywgdHlwZTogR0ZYVHlwZS5NQVQ0LCBjb3VudDogMSB9LFxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2NfbWF0UHJvakludicsIHR5cGU6IEdGWFR5cGUuTUFUNCwgY291bnQ6IDEgfSxcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX21hdFZpZXdQcm9qJywgdHlwZTogR0ZYVHlwZS5NQVQ0LCBjb3VudDogMSB9LFxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2NfbWF0Vmlld1Byb2pJbnYnLCB0eXBlOiBHRlhUeXBlLk1BVDQsIGNvdW50OiAxIH0sXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19jYW1lcmFQb3MnLCB0eXBlOiBHRlhUeXBlLkZMT0FUNCwgY291bnQ6IDEgfSxcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX2V4cG9zdXJlJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiAxIH0sXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19tYWluTGl0RGlyJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiAxIH0sXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19tYWluTGl0Q29sb3InLCB0eXBlOiBHRlhUeXBlLkZMT0FUNCwgY291bnQ6IDEgfSxcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX2FtYmllbnRTa3knLCB0eXBlOiBHRlhUeXBlLkZMT0FUNCwgY291bnQ6IDEgfSxcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX2FtYmllbnRHcm91bmQnLCB0eXBlOiBHRlhUeXBlLkZMT0FUNCwgY291bnQ6IDEgfSxcbi8vICAgICAgICAgXSxcbi8vICAgICB9O1xuLy8gICAgIHB1YmxpYyB2aWV3OiBGbG9hdDMyQXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KFVCT0dsb2JhbC5DT1VOVCk7XG4vLyB9XG4vLyBleHBvcnQgY2xhc3MgVUJPU2hhZG93IHtcbi8vICAgICBwdWJsaWMgc3RhdGljIE1BVF9MSUdIVF9QTEFORV9QUk9KX09GRlNFVDogbnVtYmVyID0gMDtcbi8vICAgICBwdWJsaWMgc3RhdGljIFNIQURPV19DT0xPUl9PRkZTRVQ6IG51bWJlciA9IFVCT1NoYWRvdy5NQVRfTElHSFRfUExBTkVfUFJPSl9PRkZTRVQgKyAxNjtcbi8vICAgICBwdWJsaWMgc3RhdGljIENPVU5UOiBudW1iZXIgPSBVQk9TaGFkb3cuU0hBRE9XX0NPTE9SX09GRlNFVCArIDQ7XG4vLyAgICAgcHVibGljIHN0YXRpYyBTSVpFOiBudW1iZXIgPSBVQk9TaGFkb3cuQ09VTlQgKiA0O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgQkxPQ0s6IEdGWFVuaWZvcm1CbG9jayA9IHtcbi8vICAgICAgICAgYmluZGluZzogVW5pZm9ybUJpbmRpbmcuVUJPX1NIQURPVywgbmFtZTogJ0NDU2hhZG93JywgbWVtYmVyczogW1xuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2NfbWF0TGlnaHRQbGFuZVByb2onLCB0eXBlOiBHRlhUeXBlLk1BVDQsIGNvdW50OiAxIH0sXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19zaGFkb3dDb2xvcicsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogMSB9LFxuLy8gICAgICAgICBdLFxuLy8gICAgIH07XG4vLyAgICAgcHVibGljIHZpZXc6IEZsb2F0MzJBcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoVUJPU2hhZG93LkNPVU5UKTtcbi8vIH1cbi8vIGV4cG9ydCBjb25zdCBsb2NhbEJpbmRpbmdzRGVzYzogTWFwPHN0cmluZywgSUludGVybmFsQmluZGluZ0Rlc2M+ID0gbmV3IE1hcDxzdHJpbmcsIElJbnRlcm5hbEJpbmRpbmdEZXNjPigpO1xuLy8gZXhwb3J0IGNsYXNzIFVCT0xvY2FsIHtcbi8vICAgICBwdWJsaWMgc3RhdGljIE1BVF9XT1JMRF9PRkZTRVQ6IG51bWJlciA9IDA7XG4vLyAgICAgcHVibGljIHN0YXRpYyBNQVRfV09STERfSVRfT0ZGU0VUOiBudW1iZXIgPSBVQk9Mb2NhbC5NQVRfV09STERfT0ZGU0VUICsgMTY7XG4vLyAgICAgcHVibGljIHN0YXRpYyBDT1VOVDogbnVtYmVyID0gVUJPTG9jYWwuTUFUX1dPUkxEX0lUX09GRlNFVCArIDE2O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgU0laRTogbnVtYmVyID0gVUJPTG9jYWwuQ09VTlQgKiA0O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgQkxPQ0s6IEdGWFVuaWZvcm1CbG9jayA9IHtcbi8vICAgICAgICAgYmluZGluZzogVW5pZm9ybUJpbmRpbmcuVUJPX0xPQ0FMLCBuYW1lOiAnQ0NMb2NhbCcsIG1lbWJlcnM6IFtcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX21hdFdvcmxkJywgdHlwZTogR0ZYVHlwZS5NQVQ0LCBjb3VudDogMSB9LFxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2NfbWF0V29ybGRJVCcsIHR5cGU6IEdGWFR5cGUuTUFUNCwgY291bnQ6IDEgfSxcbi8vICAgICAgICAgXSxcbi8vICAgICB9O1xuLy8gICAgIHB1YmxpYyB2aWV3OiBGbG9hdDMyQXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KFVCT0xvY2FsLkNPVU5UKTtcbi8vIH1cbi8vIGxvY2FsQmluZGluZ3NEZXNjLnNldChVQk9Mb2NhbC5CTE9DSy5uYW1lLCB7XG4vLyAgICAgdHlwZTogR0ZYQmluZGluZ1R5cGUuVU5JRk9STV9CVUZGRVIsXG4vLyAgICAgYmxvY2tJbmZvOiBVQk9Mb2NhbC5CTE9DSyxcbi8vIH0pO1xuLy8gZXhwb3J0IGNsYXNzIFVCT0ZvcndhcmRMaWdodCB7XG4vLyAgICAgcHVibGljIHN0YXRpYyBNQVhfU1BIRVJFX0xJR0hUUyA9IDI7XG4vLyAgICAgcHVibGljIHN0YXRpYyBNQVhfU1BPVF9MSUdIVFMgPSAyO1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgU1BIRVJFX0xJR0hUX1BPU19PRkZTRVQ6IG51bWJlciA9IDA7XG4vLyAgICAgcHVibGljIHN0YXRpYyBTUEhFUkVfTElHSFRfU0laRV9SQU5HRV9PRkZTRVQ6IG51bWJlciA9IFVCT0ZvcndhcmRMaWdodC5TUEhFUkVfTElHSFRfUE9TX09GRlNFVCArIFVCT0ZvcndhcmRMaWdodC5NQVhfU1BIRVJFX0xJR0hUUyAqIDQ7XG4vLyAgICAgcHVibGljIHN0YXRpYyBTUEhFUkVfTElHSFRfQ09MT1JfT0ZGU0VUOiBudW1iZXIgPSBVQk9Gb3J3YXJkTGlnaHQuU1BIRVJFX0xJR0hUX1NJWkVfUkFOR0VfT0ZGU0VUICsgVUJPRm9yd2FyZExpZ2h0Lk1BWF9TUEhFUkVfTElHSFRTICogNDtcbi8vICAgICBwdWJsaWMgc3RhdGljIFNQT1RfTElHSFRfUE9TX09GRlNFVDogbnVtYmVyID0gVUJPRm9yd2FyZExpZ2h0LlNQSEVSRV9MSUdIVF9DT0xPUl9PRkZTRVQgKyBVQk9Gb3J3YXJkTGlnaHQuTUFYX1NQT1RfTElHSFRTICogNDtcbi8vICAgICBwdWJsaWMgc3RhdGljIFNQT1RfTElHSFRfU0laRV9SQU5HRV9BTkdMRV9PRkZTRVQ6IG51bWJlciA9IFVCT0ZvcndhcmRMaWdodC5TUE9UX0xJR0hUX1BPU19PRkZTRVQgKyBVQk9Gb3J3YXJkTGlnaHQuTUFYX1NQT1RfTElHSFRTICogNDtcbi8vICAgICBwdWJsaWMgc3RhdGljIFNQT1RfTElHSFRfRElSX09GRlNFVDogbnVtYmVyID0gVUJPRm9yd2FyZExpZ2h0LlNQT1RfTElHSFRfU0laRV9SQU5HRV9BTkdMRV9PRkZTRVQgKyBVQk9Gb3J3YXJkTGlnaHQuTUFYX1NQT1RfTElHSFRTICogNDtcbi8vICAgICBwdWJsaWMgc3RhdGljIFNQT1RfTElHSFRfQ09MT1JfT0ZGU0VUOiBudW1iZXIgPSBVQk9Gb3J3YXJkTGlnaHQuU1BPVF9MSUdIVF9ESVJfT0ZGU0VUICsgVUJPRm9yd2FyZExpZ2h0Lk1BWF9TUE9UX0xJR0hUUyAqIDQ7XG4vLyAgICAgcHVibGljIHN0YXRpYyBDT1VOVDogbnVtYmVyID0gVUJPRm9yd2FyZExpZ2h0LlNQT1RfTElHSFRfQ09MT1JfT0ZGU0VUICsgVUJPRm9yd2FyZExpZ2h0Lk1BWF9TUE9UX0xJR0hUUyAqIDQ7XG4vLyAgICAgcHVibGljIHN0YXRpYyBTSVpFOiBudW1iZXIgPSBVQk9Gb3J3YXJkTGlnaHQuQ09VTlQgKiA0O1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgQkxPQ0s6IEdGWFVuaWZvcm1CbG9jayA9IHtcbi8vICAgICAgICAgYmluZGluZzogVW5pZm9ybUJpbmRpbmcuVUJPX0ZPUldBUkRfTElHSFRTLCBuYW1lOiAnQ0NGb3J3YXJkTGlnaHQnLCBtZW1iZXJzOiBbXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19zcGhlcmVMaXRQb3MnLCB0eXBlOiBHRlhUeXBlLkZMT0FUNCwgY291bnQ6IFVCT0ZvcndhcmRMaWdodC5NQVhfU1BIRVJFX0xJR0hUUyB9LFxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2Nfc3BoZXJlTGl0U2l6ZVJhbmdlJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiBVQk9Gb3J3YXJkTGlnaHQuTUFYX1NQSEVSRV9MSUdIVFMgfSxcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX3NwaGVyZUxpdENvbG9yJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiBVQk9Gb3J3YXJkTGlnaHQuTUFYX1NQSEVSRV9MSUdIVFMgfSxcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX3Nwb3RMaXRQb3MnLCB0eXBlOiBHRlhUeXBlLkZMT0FUNCwgY291bnQ6IFVCT0ZvcndhcmRMaWdodC5NQVhfU1BPVF9MSUdIVFMgfSxcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX3Nwb3RMaXRTaXplUmFuZ2VBbmdsZScsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogVUJPRm9yd2FyZExpZ2h0Lk1BWF9TUE9UX0xJR0hUUyB9LFxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2Nfc3BvdExpdERpcicsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogVUJPRm9yd2FyZExpZ2h0Lk1BWF9TUE9UX0xJR0hUUyB9LFxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2Nfc3BvdExpdENvbG9yJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiBVQk9Gb3J3YXJkTGlnaHQuTUFYX1NQT1RfTElHSFRTIH0sXG4vLyAgICAgICAgIF0sXG4vLyAgICAgfTtcbi8vICAgICBwdWJsaWMgdmlldzogRmxvYXQzMkFycmF5ID0gbmV3IEZsb2F0MzJBcnJheShVQk9Gb3J3YXJkTGlnaHQuQ09VTlQpO1xuLy8gfVxuLy8gbG9jYWxCaW5kaW5nc0Rlc2Muc2V0KFVCT0ZvcndhcmRMaWdodC5CTE9DSy5uYW1lLCB7XG4vLyAgICAgdHlwZTogR0ZYQmluZGluZ1R5cGUuVU5JRk9STV9CVUZGRVIsXG4vLyAgICAgYmxvY2tJbmZvOiBVQk9Gb3J3YXJkTGlnaHQuQkxPQ0ssXG4vLyB9KTtcbi8vIGV4cG9ydCBjbGFzcyBVQk9Ta2lubmluZyB7XG4vLyAgICAgcHVibGljIHN0YXRpYyBNQVRfSk9JTlRfT0ZGU0VUOiBudW1iZXIgPSAwO1xuLy8gICAgIHB1YmxpYyBzdGF0aWMgSk9JTlRTX1RFWFRVUkVfU0laRV9PRkZTRVQ6IG51bWJlciA9IFVCT1NraW5uaW5nLk1BVF9KT0lOVF9PRkZTRVQgKyAxMjggKiAxNjtcbi8vICAgICBwdWJsaWMgc3RhdGljIENPVU5UOiBudW1iZXIgPSBVQk9Ta2lubmluZy5KT0lOVFNfVEVYVFVSRV9TSVpFX09GRlNFVCArIDQ7XG4vLyAgICAgcHVibGljIHN0YXRpYyBTSVpFOiBudW1iZXIgPSBVQk9Ta2lubmluZy5DT1VOVCAqIDQ7XG4vLyAgICAgcHVibGljIHN0YXRpYyBCTE9DSzogR0ZYVW5pZm9ybUJsb2NrID0ge1xuLy8gICAgICAgICBiaW5kaW5nOiBVbmlmb3JtQmluZGluZy5VQk9fU0tJTk5JTkcsIG5hbWU6ICdDQ1NraW5uaW5nJywgbWVtYmVyczogW1xuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2NfbWF0Sm9pbnQnLCB0eXBlOiBHRlhUeXBlLk1BVDQsIGNvdW50OiAxMjggfSxcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX2pvaW50c1RleHR1cmVTaXplJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiAxIH0sXG4vLyAgICAgICAgIF0sXG4vLyAgICAgfTtcbi8vIH1cbi8vIGxvY2FsQmluZGluZ3NEZXNjLnNldChVQk9Ta2lubmluZy5CTE9DSy5uYW1lLCB7XG4vLyAgICAgdHlwZTogR0ZYQmluZGluZ1R5cGUuVU5JRk9STV9CVUZGRVIsXG4vLyAgICAgYmxvY2tJbmZvOiBVQk9Ta2lubmluZy5CTE9DSyxcbi8vIH0pO1xuLy8gZXhwb3J0IGNvbnN0IFVOSUZPUk1fSk9JTlRTX1RFWFRVUkU6IEdGWFVuaWZvcm1TYW1wbGVyID0ge1xuLy8gICAgIGJpbmRpbmc6IFVuaWZvcm1CaW5kaW5nLlNBTVBMRVJfSk9JTlRTLCBuYW1lOiAnY2Nfam9pbnRzVGV4dHVyZScsIHR5cGU6IEdGWFR5cGUuU0FNUExFUjJELCBjb3VudDogMSxcbi8vIH07XG4vLyBsb2NhbEJpbmRpbmdzRGVzYy5zZXQoVU5JRk9STV9KT0lOVFNfVEVYVFVSRS5uYW1lLCB7XG4vLyAgICAgdHlwZTogR0ZYQmluZGluZ1R5cGUuU0FNUExFUixcbi8vICAgICBzYW1wbGVySW5mbzogVU5JRk9STV9KT0lOVFNfVEVYVFVSRSxcbi8vIH0pO1xuLy8gZXhwb3J0IGludGVyZmFjZSBJSW50ZXJuYWxCaW5kaW5nRGVzYyB7XG4vLyAgICAgdHlwZTogR0ZYQmluZGluZ1R5cGU7XG4vLyAgICAgYmxvY2tJbmZvPzogR0ZYVW5pZm9ybUJsb2NrO1xuLy8gICAgIHNhbXBsZXJJbmZvPzogR0ZYVW5pZm9ybVNhbXBsZXI7XG4vLyB9XG4vLyBleHBvcnQgaW50ZXJmYWNlIElJbnRlcm5hbEJpbmRpbmdJbnN0IGV4dGVuZHMgSUludGVybmFsQmluZGluZ0Rlc2Mge1xuLy8gICAgIGJ1ZmZlcj86IEdGWEJ1ZmZlcjtcbi8vICAgICBzYW1wbGVyPzogR0ZYU2FtcGxlcjtcbi8vICAgICB0ZXh0dXJlVmlldz86IEdGWFRleHR1cmVWaWV3O1xuLy8gfVxuXG4vLyB0aGlzIGZpbGUgaXMgdXNlZCBmb3Igb2ZmbGluZSBlZmZlY3QgYnVpbGRpbmcuXG52YXIgX2EsIF9iO1xudmFyIFNhbXBsZXJJbmZvSW5kZXg7XG4oZnVuY3Rpb24gKFNhbXBsZXJJbmZvSW5kZXgpIHtcbiAgICBTYW1wbGVySW5mb0luZGV4W1NhbXBsZXJJbmZvSW5kZXhbXCJtaW5GaWx0ZXJcIl0gPSAwXSA9IFwibWluRmlsdGVyXCI7XG4gICAgU2FtcGxlckluZm9JbmRleFtTYW1wbGVySW5mb0luZGV4W1wibWFnRmlsdGVyXCJdID0gMV0gPSBcIm1hZ0ZpbHRlclwiO1xuICAgIFNhbXBsZXJJbmZvSW5kZXhbU2FtcGxlckluZm9JbmRleFtcIm1pcEZpbHRlclwiXSA9IDJdID0gXCJtaXBGaWx0ZXJcIjtcbiAgICBTYW1wbGVySW5mb0luZGV4W1NhbXBsZXJJbmZvSW5kZXhbXCJhZGRyZXNzVVwiXSA9IDNdID0gXCJhZGRyZXNzVVwiO1xuICAgIFNhbXBsZXJJbmZvSW5kZXhbU2FtcGxlckluZm9JbmRleFtcImFkZHJlc3NWXCJdID0gNF0gPSBcImFkZHJlc3NWXCI7XG4gICAgU2FtcGxlckluZm9JbmRleFtTYW1wbGVySW5mb0luZGV4W1wiYWRkcmVzc1dcIl0gPSA1XSA9IFwiYWRkcmVzc1dcIjtcbiAgICBTYW1wbGVySW5mb0luZGV4W1NhbXBsZXJJbmZvSW5kZXhbXCJtYXhBbmlzb3Ryb3B5XCJdID0gNl0gPSBcIm1heEFuaXNvdHJvcHlcIjtcbiAgICBTYW1wbGVySW5mb0luZGV4W1NhbXBsZXJJbmZvSW5kZXhbXCJjbXBGdW5jXCJdID0gN10gPSBcImNtcEZ1bmNcIjtcbiAgICBTYW1wbGVySW5mb0luZGV4W1NhbXBsZXJJbmZvSW5kZXhbXCJtaW5MT0RcIl0gPSA4XSA9IFwibWluTE9EXCI7XG4gICAgU2FtcGxlckluZm9JbmRleFtTYW1wbGVySW5mb0luZGV4W1wibWF4TE9EXCJdID0gOV0gPSBcIm1heExPRFwiO1xuICAgIFNhbXBsZXJJbmZvSW5kZXhbU2FtcGxlckluZm9JbmRleFtcIm1pcExPREJpYXNcIl0gPSAxMF0gPSBcIm1pcExPREJpYXNcIjtcbiAgICBTYW1wbGVySW5mb0luZGV4W1NhbXBsZXJJbmZvSW5kZXhbXCJib3JkZXJDb2xvclwiXSA9IDExXSA9IFwiYm9yZGVyQ29sb3JcIjtcbiAgICBTYW1wbGVySW5mb0luZGV4W1NhbXBsZXJJbmZvSW5kZXhbXCJ0b3RhbFwiXSA9IDE1XSA9IFwidG90YWxcIjtcbn0pKFNhbXBsZXJJbmZvSW5kZXggfHwgKFNhbXBsZXJJbmZvSW5kZXggPSB7fSkpO1xudmFyIHR5cGVNYXAgPSB7fTtcbnR5cGVNYXBbdHlwZU1hcFsnYm9vbCddID0gR0ZYVHlwZS5CT09MXSA9ICdib29sJztcbnR5cGVNYXBbdHlwZU1hcFsnaW50J10gPSBHRlhUeXBlLklOVF0gPSAnaW50JztcbnR5cGVNYXBbdHlwZU1hcFsnaXZlYzInXSA9IEdGWFR5cGUuSU5UMl0gPSAnaXZlYzJpbnZUeXBlUGFyYW1zJztcbnR5cGVNYXBbdHlwZU1hcFsnaXZlYzMnXSA9IEdGWFR5cGUuSU5UM10gPSAnaXZlYzMnO1xudHlwZU1hcFt0eXBlTWFwWydpdmVjNCddID0gR0ZYVHlwZS5JTlQ0XSA9ICdpdmVjNCc7XG50eXBlTWFwW3R5cGVNYXBbJ2Zsb2F0J10gPSBHRlhUeXBlLkZMT0FUXSA9ICdmbG9hdCc7XG50eXBlTWFwW3R5cGVNYXBbJ3ZlYzInXSA9IEdGWFR5cGUuRkxPQVQyXSA9ICd2ZWMyJztcbnR5cGVNYXBbdHlwZU1hcFsndmVjMyddID0gR0ZYVHlwZS5GTE9BVDNdID0gJ3ZlYzMnO1xudHlwZU1hcFt0eXBlTWFwWyd2ZWM0J10gPSBHRlhUeXBlLkZMT0FUNF0gPSAndmVjNCc7XG50eXBlTWFwW3R5cGVNYXBbJ21hdDInXSA9IEdGWFR5cGUuTUFUMl0gPSAnbWF0Mic7XG50eXBlTWFwW3R5cGVNYXBbJ21hdDMnXSA9IEdGWFR5cGUuTUFUM10gPSAnbWF0Myc7XG50eXBlTWFwW3R5cGVNYXBbJ21hdDQnXSA9IEdGWFR5cGUuTUFUNF0gPSAnbWF0NCc7XG50eXBlTWFwW3R5cGVNYXBbJ3NhbXBsZXIyRCddID0gR0ZYVHlwZS5TQU1QTEVSMkRdID0gJ3NhbXBsZXIyRCc7XG50eXBlTWFwW3R5cGVNYXBbJ3NhbXBsZXJDdWJlJ10gPSBHRlhUeXBlLlNBTVBMRVJfQ1VCRV0gPSAnc2FtcGxlckN1YmUnO1xudmFyIHNpemVNYXAgPSAoX2EgPSB7fSxcbiAgICBfYVtHRlhUeXBlLkJPT0xdID0gNCxcbiAgICBfYVtHRlhUeXBlLklOVF0gPSA0LFxuICAgIF9hW0dGWFR5cGUuSU5UMl0gPSA4LFxuICAgIF9hW0dGWFR5cGUuSU5UM10gPSAxMixcbiAgICBfYVtHRlhUeXBlLklOVDRdID0gMTYsXG4gICAgX2FbR0ZYVHlwZS5GTE9BVF0gPSA0LFxuICAgIF9hW0dGWFR5cGUuRkxPQVQyXSA9IDgsXG4gICAgX2FbR0ZYVHlwZS5GTE9BVDNdID0gMTIsXG4gICAgX2FbR0ZYVHlwZS5GTE9BVDRdID0gMTYsXG4gICAgX2FbR0ZYVHlwZS5NQVQyXSA9IDE2LFxuICAgIF9hW0dGWFR5cGUuTUFUM10gPSAzNixcbiAgICBfYVtHRlhUeXBlLk1BVDRdID0gNjQsXG4gICAgX2FbR0ZYVHlwZS5TQU1QTEVSMkRdID0gNCxcbiAgICBfYVtHRlhUeXBlLlNBTVBMRVJfQ1VCRV0gPSA0LFxuICAgIF9hKTtcbnZhciBmb3JtYXRNYXAgPSAoX2IgPSB7fSxcbiAgICBfYltHRlhUeXBlLkJPT0xdID0gR0ZYRm9ybWF0LlIzMkksXG4gICAgX2JbR0ZYVHlwZS5JTlRdID0gR0ZYRm9ybWF0LlIzMkksXG4gICAgX2JbR0ZYVHlwZS5JTlQyXSA9IEdGWEZvcm1hdC5SRzMySSxcbiAgICBfYltHRlhUeXBlLklOVDNdID0gR0ZYRm9ybWF0LlJHQjMySSxcbiAgICBfYltHRlhUeXBlLklOVDRdID0gR0ZYRm9ybWF0LlJHQkEzMkksXG4gICAgX2JbR0ZYVHlwZS5GTE9BVF0gPSBHRlhGb3JtYXQuUjMyRixcbiAgICBfYltHRlhUeXBlLkZMT0FUMl0gPSBHRlhGb3JtYXQuUkczMkYsXG4gICAgX2JbR0ZYVHlwZS5GTE9BVDNdID0gR0ZYRm9ybWF0LlJHQjMyRixcbiAgICBfYltHRlhUeXBlLkZMT0FUNF0gPSBHRlhGb3JtYXQuUkdCQTMyRixcbiAgICBfYik7XG4vLyBjb25zdCBwYXNzUGFyYW1zID0ge1xuLy8gICAvLyBjb2xvciBtYXNrXG4vLyAgIE5PTkU6IGdmeC5HRlhDb2xvck1hc2suTk9ORSxcbi8vICAgUjogZ2Z4LkdGWENvbG9yTWFzay5SLFxuLy8gICBHOiBnZnguR0ZYQ29sb3JNYXNrLkcsXG4vLyAgIEI6IGdmeC5HRlhDb2xvck1hc2suQixcbi8vICAgQTogZ2Z4LkdGWENvbG9yTWFzay5BLFxuLy8gICBSRzogZ2Z4LkdGWENvbG9yTWFzay5SIHwgZ2Z4LkdGWENvbG9yTWFzay5HLFxuLy8gICBSQjogZ2Z4LkdGWENvbG9yTWFzay5SIHwgZ2Z4LkdGWENvbG9yTWFzay5CLFxuLy8gICBSQTogZ2Z4LkdGWENvbG9yTWFzay5SIHwgZ2Z4LkdGWENvbG9yTWFzay5BLFxuLy8gICBHQjogZ2Z4LkdGWENvbG9yTWFzay5HIHwgZ2Z4LkdGWENvbG9yTWFzay5CLFxuLy8gICBHQTogZ2Z4LkdGWENvbG9yTWFzay5HIHwgZ2Z4LkdGWENvbG9yTWFzay5BLFxuLy8gICBCQTogZ2Z4LkdGWENvbG9yTWFzay5CIHwgZ2Z4LkdGWENvbG9yTWFzay5BLFxuLy8gICBSR0I6IGdmeC5HRlhDb2xvck1hc2suUiB8IGdmeC5HRlhDb2xvck1hc2suRyB8IGdmeC5HRlhDb2xvck1hc2suQixcbi8vICAgUkdBOiBnZnguR0ZYQ29sb3JNYXNrLlIgfCBnZnguR0ZYQ29sb3JNYXNrLkcgfCBnZnguR0ZYQ29sb3JNYXNrLkEsXG4vLyAgIFJCQTogZ2Z4LkdGWENvbG9yTWFzay5SIHwgZ2Z4LkdGWENvbG9yTWFzay5CIHwgZ2Z4LkdGWENvbG9yTWFzay5BLFxuLy8gICBHQkE6IGdmeC5HRlhDb2xvck1hc2suRyB8IGdmeC5HRlhDb2xvck1hc2suQiB8IGdmeC5HRlhDb2xvck1hc2suQSxcbi8vICAgQUxMOiBnZnguR0ZYQ29sb3JNYXNrLkFMTCxcbi8vICAgLy8gYmxlbmQgb3BlcmF0aW9uXG4vLyAgIEFERDogZ2Z4LkdGWEJsZW5kT3AuQURELFxuLy8gICBTVUI6IGdmeC5HRlhCbGVuZE9wLlNVQixcbi8vICAgUkVWX1NVQjogZ2Z4LkdGWEJsZW5kT3AuUkVWX1NVQixcbi8vICAgTUlOOiBnZnguR0ZYQmxlbmRPcC5NSU4sXG4vLyAgIE1BWDogZ2Z4LkdGWEJsZW5kT3AuTUFYLFxuLy8gICAvLyBibGVuZCBmYWN0b3Jcbi8vICAgWkVSTzogZ2Z4LkdGWEJsZW5kRmFjdG9yLlpFUk8sXG4vLyAgIE9ORTogZ2Z4LkdGWEJsZW5kRmFjdG9yLk9ORSxcbi8vICAgU1JDX0FMUEhBOiBnZnguR0ZYQmxlbmRGYWN0b3IuU1JDX0FMUEhBLFxuLy8gICBEU1RfQUxQSEE6IGdmeC5HRlhCbGVuZEZhY3Rvci5EU1RfQUxQSEEsXG4vLyAgIE9ORV9NSU5VU19TUkNfQUxQSEE6IGdmeC5HRlhCbGVuZEZhY3Rvci5PTkVfTUlOVVNfU1JDX0FMUEhBLFxuLy8gICBPTkVfTUlOVVNfRFNUX0FMUEhBOiBnZnguR0ZYQmxlbmRGYWN0b3IuT05FX01JTlVTX0RTVF9BTFBIQSxcbi8vICAgU1JDX0NPTE9SOiBnZnguR0ZYQmxlbmRGYWN0b3IuU1JDX0NPTE9SLFxuLy8gICBEU1RfQ09MT1I6IGdmeC5HRlhCbGVuZEZhY3Rvci5EU1RfQ09MT1IsXG4vLyAgIE9ORV9NSU5VU19TUkNfQ09MT1I6IGdmeC5HRlhCbGVuZEZhY3Rvci5PTkVfTUlOVVNfU1JDX0NPTE9SLFxuLy8gICBPTkVfTUlOVVNfRFNUX0NPTE9SOiBnZnguR0ZYQmxlbmRGYWN0b3IuT05FX01JTlVTX0RTVF9DT0xPUixcbi8vICAgU1JDX0FMUEhBX1NBVFVSQVRFOiBnZnguR0ZYQmxlbmRGYWN0b3IuU1JDX0FMUEhBX1NBVFVSQVRFLFxuLy8gICBDT05TVEFOVF9DT0xPUjogZ2Z4LkdGWEJsZW5kRmFjdG9yLkNPTlNUQU5UX0NPTE9SLFxuLy8gICBPTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1I6IGdmeC5HRlhCbGVuZEZhY3Rvci5PTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1IsXG4vLyAgIENPTlNUQU5UX0FMUEhBOiBnZnguR0ZYQmxlbmRGYWN0b3IuQ09OU1RBTlRfQUxQSEEsXG4vLyAgIE9ORV9NSU5VU19DT05TVEFOVF9BTFBIQTogZ2Z4LkdGWEJsZW5kRmFjdG9yLk9ORV9NSU5VU19DT05TVEFOVF9BTFBIQSxcbi8vICAgLy8gc3RlbmNpbCBvcGVyYXRpb25cbi8vICAgLy8gWkVSTzogR0ZYU3RlbmNpbE9wLlpFUk8sIC8vIGR1cGxpY2F0ZSwgc2FmZWx5IHJlbW92ZWQgYmVjYXVzZSBlbnVtIHZhbHVlIGlzKGFuZCBhbHdheXMgd2lsbCBiZSkgdGhlIHNhbWVcbi8vICAgS0VFUDogZ2Z4LkdGWFN0ZW5jaWxPcC5LRUVQLFxuLy8gICBSRVBMQUNFOiBnZnguR0ZYU3RlbmNpbE9wLlJFUExBQ0UsXG4vLyAgIElOQ1I6IGdmeC5HRlhTdGVuY2lsT3AuSU5DUixcbi8vICAgREVDUjogZ2Z4LkdGWFN0ZW5jaWxPcC5ERUNSLFxuLy8gICBJTlZFUlQ6IGdmeC5HRlhTdGVuY2lsT3AuSU5WRVJULFxuLy8gICBJTkNSX1dSQVA6IGdmeC5HRlhTdGVuY2lsT3AuSU5DUl9XUkFQLFxuLy8gICBERUNSX1dSQVA6IGdmeC5HRlhTdGVuY2lsT3AuREVDUl9XUkFQLFxuLy8gICAgIC8vIGNvbXBhcmlzb24gZnVuY3Rpb25cbi8vICAgTkVWRVI6IGdmeC5HRlhDb21wYXJpc29uRnVuYy5ORVZFUixcbi8vICAgTEVTUzogZ2Z4LkdGWENvbXBhcmlzb25GdW5jLkxFU1MsXG4vLyAgIEVRVUFMOiBnZnguR0ZYQ29tcGFyaXNvbkZ1bmMuRVFVQUwsXG4vLyAgIExFU1NfRVFVQUw6IGdmeC5HRlhDb21wYXJpc29uRnVuYy5MRVNTX0VRVUFMLFxuLy8gICBHUkVBVEVSOiBnZnguR0ZYQ29tcGFyaXNvbkZ1bmMuR1JFQVRFUixcbi8vICAgTk9UX0VRVUFMOiBnZnguR0ZYQ29tcGFyaXNvbkZ1bmMuTk9UX0VRVUFMLFxuLy8gICBHUkVBVEVSX0VRVUFMOiBnZnguR0ZYQ29tcGFyaXNvbkZ1bmMuR1JFQVRFUl9FUVVBTCxcbi8vICAgQUxXQVlTOiBnZnguR0ZYQ29tcGFyaXNvbkZ1bmMuQUxXQVlTLFxuLy8gICAvLyBjdWxsIG1vZGVcbi8vICAgLy8gTk9ORTogR0ZYQ3VsbE1vZGUuTk9ORSwgLy8gZHVwbGljYXRlLCBzYWZlbHkgcmVtb3ZlZCBiZWNhdXNlIGVudW0gdmFsdWUgaXMoYW5kIGFsd2F5cyB3aWxsIGJlKSB0aGUgc2FtZVxuLy8gICBGUk9OVDogZ2Z4LkdGWEN1bGxNb2RlLkZST05ULFxuLy8gICBCQUNLOiBnZnguR0ZYQ3VsbE1vZGUuQkFDSyxcbi8vICAgLy8gc2hhZGUgbW9kZVxuLy8gICBHT1VSQU5EOiBnZnguR0ZYU2hhZGVNb2RlbC5HT1VSQU5ELFxuLy8gICBGTEFUOiBnZnguR0ZYU2hhZGVNb2RlbC5GTEFULFxuLy8gICAvLyBwb2x5Z29uIG1vZGVcbi8vICAgRklMTDogZ2Z4LkdGWFBvbHlnb25Nb2RlLkZJTEwsXG4vLyAgIExJTkU6IGdmeC5HRlhQb2x5Z29uTW9kZS5MSU5FLFxuLy8gICBQT0lOVDogZ2Z4LkdGWFBvbHlnb25Nb2RlLlBPSU5ULFxuLy8gICAvLyBwcmltaXRpdmUgbW9kZVxuLy8gICBQT0lOVF9MSVNUOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5QT0lOVF9MSVNULFxuLy8gICBMSU5FX0xJU1Q6IGdmeC5HRlhQcmltaXRpdmVNb2RlLkxJTkVfTElTVCxcbi8vICAgTElORV9TVFJJUDogZ2Z4LkdGWFByaW1pdGl2ZU1vZGUuTElORV9TVFJJUCxcbi8vICAgTElORV9MT09QOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5MSU5FX0xPT1AsXG4vLyAgIFRSSUFOR0xFX0xJU1Q6IGdmeC5HRlhQcmltaXRpdmVNb2RlLlRSSUFOR0xFX0xJU1QsXG4vLyAgIFRSSUFOR0xFX1NUUklQOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5UUklBTkdMRV9TVFJJUCxcbi8vICAgVFJJQU5HTEVfRkFOOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5UUklBTkdMRV9GQU4sXG4vLyAgIExJTkVfTElTVF9BREpBQ0VOQ1k6IGdmeC5HRlhQcmltaXRpdmVNb2RlLkxJTkVfTElTVF9BREpBQ0VOQ1ksXG4vLyAgIExJTkVfU1RSSVBfQURKQUNFTkNZOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5MSU5FX1NUUklQX0FESkFDRU5DWSxcbi8vICAgVFJJQU5HTEVfTElTVF9BREpBQ0VOQ1k6IGdmeC5HRlhQcmltaXRpdmVNb2RlLlRSSUFOR0xFX0xJU1RfQURKQUNFTkNZLFxuLy8gICBUUklBTkdMRV9TVFJJUF9BREpBQ0VOQ1k6IGdmeC5HRlhQcmltaXRpdmVNb2RlLlRSSUFOR0xFX1NUUklQX0FESkFDRU5DWSxcbi8vICAgVFJJQU5HTEVfUEFUQ0hfQURKQUNFTkNZOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5UUklBTkdMRV9QQVRDSF9BREpBQ0VOQ1ksXG4vLyAgIFFVQURfUEFUQ0hfTElTVDogZ2Z4LkdGWFByaW1pdGl2ZU1vZGUuUVVBRF9QQVRDSF9MSVNULFxuLy8gICBJU09fTElORV9MSVNUOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5JU09fTElORV9MSVNULFxuLy8gICAvLyBQT0lOVDogZ2Z4LkdGWEZpbHRlci5QT0lOVCwgLy8gZHVwbGljYXRlLCBzYWZlbHkgcmVtb3ZlZCBiZWNhdXNlIGVudW0gdmFsdWUgaXMoYW5kIGFsd2F5cyB3aWxsIGJlKSB0aGUgc2FtZVxuLy8gICBMSU5FQVI6IGdmeC5HRlhGaWx0ZXIuTElORUFSLFxuLy8gICBBTklTT1RST1BJQzogZ2Z4LkdGWEZpbHRlci5BTklTT1RST1BJQyxcbi8vICAgV1JBUDogZ2Z4LkdGWEFkZHJlc3MuV1JBUCxcbi8vICAgTUlSUk9SOiBnZnguR0ZYQWRkcmVzcy5NSVJST1IsXG4vLyAgIENMQU1QOiBnZnguR0ZYQWRkcmVzcy5DTEFNUCxcbi8vICAgQk9SREVSOiBnZnguR0ZYQWRkcmVzcy5CT1JERVIsXG4vLyAgIFZJRVdQT1JUOiBnZnguR0ZYRHluYW1pY1N0YXRlLlZJRVdQT1JULFxuLy8gICBTQ0lTU09SOiBnZnguR0ZYRHluYW1pY1N0YXRlLlNDSVNTT1IsXG4vLyAgIExJTkVfV0lEVEg6IGdmeC5HRlhEeW5hbWljU3RhdGUuTElORV9XSURUSCxcbi8vICAgREVQVEhfQklBUzogZ2Z4LkdGWER5bmFtaWNTdGF0ZS5ERVBUSF9CSUFTLFxuLy8gICBCTEVORF9DT05TVEFOVFM6IGdmeC5HRlhEeW5hbWljU3RhdGUuQkxFTkRfQ09OU1RBTlRTLFxuLy8gICBERVBUSF9CT1VORFM6IGdmeC5HRlhEeW5hbWljU3RhdGUuREVQVEhfQk9VTkRTLFxuLy8gICBTVEVOQ0lMX1dSSVRFX01BU0s6IGdmeC5HRlhEeW5hbWljU3RhdGUuU1RFTkNJTF9XUklURV9NQVNLLFxuLy8gICBTVEVOQ0lMX0NPTVBBUkVfTUFTSzogZ2Z4LkdGWER5bmFtaWNTdGF0ZS5TVEVOQ0lMX0NPTVBBUkVfTUFTSyxcbi8vICAgVFJVRTogdHJ1ZSxcbi8vICAgRkFMU0U6IGZhbHNlXG4vLyB9O1xudmFyIHBhc3NQYXJhbXMgPSB7XG4gICAgQkFDSzogZW51bXMuQ1VMTF9CQUNLLFxuICAgIEZST05UOiBlbnVtcy5DVUxMX0ZST05ULFxuICAgIE5PTkU6IGVudW1zLkNVTExfTk9ORSxcbiAgICBBREQ6IGVudW1zLkJMRU5EX0ZVTkNfQURELFxuICAgIFNVQjogZW51bXMuQkxFTkRfRlVOQ19TVUJUUkFDVCxcbiAgICBSRVZfU1VCOiBlbnVtcy5CTEVORF9GVU5DX1JFVkVSU0VfU1VCVFJBQ1QsXG4gICAgWkVSTzogZW51bXMuQkxFTkRfWkVSTyxcbiAgICBPTkU6IGVudW1zLkJMRU5EX09ORSxcbiAgICBTUkNfQ09MT1I6IGVudW1zLkJMRU5EX1NSQ19DT0xPUixcbiAgICBPTkVfTUlOVVNfU1JDX0NPTE9SOiBlbnVtcy5CTEVORF9PTkVfTUlOVVNfU1JDX0NPTE9SLFxuICAgIERTVF9DT0xPUjogZW51bXMuQkxFTkRfRFNUX0NPTE9SLFxuICAgIE9ORV9NSU5VU19EU1RfQ09MT1I6IGVudW1zLkJMRU5EX09ORV9NSU5VU19EU1RfQ09MT1IsXG4gICAgU1JDX0FMUEhBOiBlbnVtcy5CTEVORF9TUkNfQUxQSEEsXG4gICAgT05FX01JTlVTX1NSQ19BTFBIQTogZW51bXMuQkxFTkRfT05FX01JTlVTX1NSQ19BTFBIQSxcbiAgICBEU1RfQUxQSEE6IGVudW1zLkJMRU5EX0RTVF9BTFBIQSxcbiAgICBPTkVfTUlOVVNfRFNUX0FMUEhBOiBlbnVtcy5CTEVORF9PTkVfTUlOVVNfRFNUX0FMUEhBLFxuICAgIENPTlNUQU5UX0NPTE9SOiBlbnVtcy5CTEVORF9DT05TVEFOVF9DT0xPUixcbiAgICBPTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1I6IGVudW1zLkJMRU5EX09ORV9NSU5VU19DT05TVEFOVF9DT0xPUixcbiAgICBDT05TVEFOVF9BTFBIQTogZW51bXMuQkxFTkRfQ09OU1RBTlRfQUxQSEEsXG4gICAgT05FX01JTlVTX0NPTlNUQU5UX0FMUEhBOiBlbnVtcy5CTEVORF9PTkVfTUlOVVNfQ09OU1RBTlRfQUxQSEEsXG4gICAgU1JDX0FMUEhBX1NBVFVSQVRFOiBlbnVtcy5CTEVORF9TUkNfQUxQSEFfU0FUVVJBVEUsXG4gICAgTkVWRVI6IGVudW1zLkRTX0ZVTkNfTkVWRVIsXG4gICAgTEVTUzogZW51bXMuRFNfRlVOQ19MRVNTLFxuICAgIEVRVUFMOiBlbnVtcy5EU19GVU5DX0VRVUFMLFxuICAgIExFUVVBTDogZW51bXMuRFNfRlVOQ19MRVFVQUwsXG4gICAgR1JFQVRFUjogZW51bXMuRFNfRlVOQ19HUkVBVEVSLFxuICAgIE5PVEVRVUFMOiBlbnVtcy5EU19GVU5DX05PVEVRVUFMLFxuICAgIEdFUVVBTDogZW51bXMuRFNfRlVOQ19HRVFVQUwsXG4gICAgQUxXQVlTOiBlbnVtcy5EU19GVU5DX0FMV0FZUyxcbiAgICBLRUVQOiBlbnVtcy5TVEVOQ0lMX09QX0tFRVAsXG4gICAgUkVQTEFDRTogZW51bXMuU1RFTkNJTF9PUF9SRVBMQUNFLFxuICAgIElOQ1I6IGVudW1zLlNURU5DSUxfT1BfSU5DUixcbiAgICBJTkNSX1dSQVA6IGVudW1zLlNURU5DSUxfT1BfSU5DUl9XUkFQLFxuICAgIERFQ1I6IGVudW1zLlNURU5DSUxfT1BfREVDUixcbiAgICBERUNSX1dSQVA6IGVudW1zLlNURU5DSUxfT1BfREVDUl9XUkFQLFxuICAgIElOVkVSVDogZW51bXMuU1RFTkNJTF9PUF9JTlZFUlRcbn07XG5PYmplY3QuYXNzaWduKHBhc3NQYXJhbXMsIFJlbmRlclBhc3NTdGFnZSk7XG4vLyBmb3Igc3RydWN0dXJhbCB0eXBlIGNoZWNraW5nXG4vLyBhbiAnYW55JyBrZXkgd2lsbCBjaGVjayBhZ2FpbnN0IGFsbCBlbGVtZW50cyBkZWZpbmVkIGluIHRoYXQgb2JqZWN0XG4vLyBhIGtleSBzdGFydCB3aXRoICckJyBtZWFucyBpdHMgZXNzZW50aWFsLCBhbmQgY2FuJ3QgYmUgdW5kZWZpbmVkXG52YXIgZWZmZWN0U3RydWN0dXJlID0ge1xuICAgICR0ZWNobmlxdWVzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgICRwYXNzZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRlcHRoU3RlbmNpbFN0YXRlOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgcmFzdGVyaXplclN0YXRlOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgYmxlbmRTdGF0ZTogeyB0YXJnZXRzOiBbe31dIH0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHsgYW55OiB7IHNhbXBsZXI6IHt9LCBpbnNwZWN0b3I6IHt9IH0gfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIF1cbn07XG52YXIgbWFwcGluZ3MgPSB7XG4gICAgbXVybXVyaGFzaDJfMzJfZ2M6IG11cm11cmhhc2gyXzMyX2djLFxuICAgIFNhbXBsZXJJbmZvSW5kZXg6IFNhbXBsZXJJbmZvSW5kZXgsXG4gICAgZWZmZWN0U3RydWN0dXJlOiBlZmZlY3RTdHJ1Y3R1cmUsXG4gICAgdHlwZU1hcDogdHlwZU1hcCxcbiAgICBzaXplTWFwOiBzaXplTWFwLFxuICAgIGZvcm1hdE1hcDogZm9ybWF0TWFwLFxuICAgIHBhc3NQYXJhbXM6IHBhc3NQYXJhbXMsXG4gICAgUmVuZGVyUXVldWU6IFJlbmRlclF1ZXVlLFxuICAgIFJlbmRlclByaW9yaXR5OiBSZW5kZXJQcmlvcml0eSxcbiAgICBHRlhHZXRUeXBlU2l6ZTogR0ZYR2V0VHlwZVNpemUsXG4gICAgVW5pZm9ybUJpbmRpbmc6IFVuaWZvcm1CaW5kaW5nXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcHBpbmdzO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=