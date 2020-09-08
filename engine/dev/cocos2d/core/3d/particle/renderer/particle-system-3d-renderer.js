
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/renderer/particle-system-3d-renderer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _valueTypes = require("../../../value-types");

var _gfx = _interopRequireDefault(require("../../../../renderer/gfx"));

var _particleBatchModel = _interopRequireDefault(require("./particle-batch-model"));

var _materialVariant = _interopRequireDefault(require("../../../assets/material/material-variant"));

var _recyclePool = _interopRequireDefault(require("../../../../renderer/memop/recycle-pool"));

var _enum = require("../enum");

var _particle = _interopRequireDefault(require("../particle"));

var _assembler = _interopRequireDefault(require("../../../renderer/assembler"));

var _particleSystem3d = _interopRequireDefault(require("../particle-system-3d"));

var _dec, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var _require = require('../../../platform/CCClassDecorator'),
    ccclass = _require.ccclass,
    property = _require.property; // tslint:disable: max-line-length


var _tempAttribUV = new _valueTypes.Vec3();

var _tempAttribUV0 = new _valueTypes.Vec2();

var _tempAttribColor = new _valueTypes.Vec4();

var _tempWorldTrans = new _valueTypes.Mat4();

var _uvs = [0, 0, // bottom-left
1, 0, // bottom-right
0, 1, // top-left
1, 1 // top-right
];
var CC_USE_WORLD_SPACE = 'CC_USE_WORLD_SPACE';
var CC_USE_BILLBOARD = 'CC_USE_BILLBOARD';
var CC_USE_STRETCHED_BILLBOARD = 'CC_USE_STRETCHED_BILLBOARD';
var CC_USE_HORIZONTAL_BILLBOARD = 'CC_USE_HORIZONTAL_BILLBOARD';
var CC_USE_VERTICAL_BILLBOARD = 'CC_USE_VERTICAL_BILLBOARD';
var CC_USE_MESH = 'CC_USE_MESH'; //const CC_DRAW_WIRE_FRAME = 'CC_DRAW_WIRE_FRAME'; // <wireframe debug>

var vfmtNormal = new _gfx["default"].VertexFormat([{
  name: _gfx["default"].ATTR_POSITION,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD1,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD2,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_COLOR,
  type: _gfx["default"].ATTR_TYPE_UINT8,
  num: 4,
  normalize: true
}]);
vfmtNormal.name = 'vfmtNormal';
var vfmtStretch = new _gfx["default"].VertexFormat([{
  name: _gfx["default"].ATTR_POSITION,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD1,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD2,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_COLOR,
  type: _gfx["default"].ATTR_TYPE_UINT8,
  num: 4,
  normalize: true
}, {
  name: _gfx["default"].ATTR_COLOR1,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}]);
vfmtStretch.name = 'vfmtStretch';
var vfmtMesh = new _gfx["default"].VertexFormat([{
  name: _gfx["default"].ATTR_POSITION,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD1,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD2,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_COLOR,
  type: _gfx["default"].ATTR_TYPE_UINT8,
  num: 4,
  normalize: true
}, {
  name: _gfx["default"].ATTR_TEX_COORD3,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_NORMAL,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_COLOR1,
  type: _gfx["default"].ATTR_TYPE_UINT8,
  num: 4,
  normalize: true
}]);
vfmtMesh.name = 'vfmtMesh';
var ParticleSystem3DAssembler = (_dec = ccclass('cc.ParticleSystem3DAssembler'), _dec(_class = (_temp = /*#__PURE__*/function (_Assembler) {
  _inheritsLoose(ParticleSystem3DAssembler, _Assembler);

  function ParticleSystem3DAssembler() {
    var _this;

    _this = _Assembler.call(this) || this;
    _this._defines = null;
    _this._trailDefines = null;
    _this._model = null;
    _this.frameTile_velLenScale = null;
    _this.attrs = [];
    _this._vertFormat = [];
    _this._particleSystem = null;
    _this._particles = null;
    _this._defaultMat = null;
    _this._isAssetReady = false;
    _this._defaultTrailMat = null;
    _this._customProperties = null;
    _this._node_scale = null;
    _this._model = null;
    _this.frameTile_velLenScale = cc.v4(1, 1, 0, 0);
    _this._node_scale = cc.v4();
    _this.attrs = new Array(5);
    _this._trailDefines = {
      CC_USE_WORLD_SPACE: true //CC_DRAW_WIRE_FRAME: true,   // <wireframe debug>

    };
    return _this;
  }

  var _proto = ParticleSystem3DAssembler.prototype;

  _proto.onInit = function onInit(ps) {
    var _this2 = this;

    this._particleSystem = ps;
    this._particles = new _recyclePool["default"](function () {
      return new _particle["default"](_this2);
    }, 16);

    this._setVertexAttrib();

    this.onEnable();

    this._updateModel();

    this._updateMaterialParams();

    this._updateTrailMaterial();
  };

  _proto.onEnable = function onEnable() {
    if (!this._particleSystem) {
      return;
    }

    if (this._model == null) {
      this._model = new _particleBatchModel["default"]();
    }

    if (!this._model.inited) {
      this._model.setCapacity(this._particleSystem.capacity);
    }

    this._model.enabled = this._particleSystem.enabledInHierarchy;
  };

  _proto.onDisable = function onDisable() {
    if (this._model) {
      this._model.enabled = this._particleSystem.enabledInHierarchy;
    }
  };

  _proto.onDestroy = function onDestroy() {
    this._model = null;
  };

  _proto.clear = function clear() {
    this._particles.reset();

    this.updateParticleBuffer();
  };

  _proto._getFreeParticle = function _getFreeParticle() {
    if (this._particles.length >= this._particleSystem.capacity) {
      return null;
    }

    return this._particles.add();
  };

  _proto._setNewParticle = function _setNewParticle(p) {};

  _proto._updateParticles = function _updateParticles(dt) {
    this._particleSystem.node.getWorldMatrix(_tempWorldTrans);

    switch (this._particleSystem.scaleSpace) {
      case _enum.Space.Local:
        this._particleSystem.node.getScale(this._node_scale);

        break;

      case _enum.Space.World:
        this._particleSystem.node.getWorldScale(this._node_scale);

        break;
    }

    var material = this._particleSystem.materials[0];
    var mat = material ? this._particleSystem.particleMaterial : this._defaultMat;
    mat.setProperty('scale', this._node_scale);

    if (this._particleSystem.velocityOvertimeModule.enable) {
      this._particleSystem.velocityOvertimeModule.update(this._particleSystem._simulationSpace, _tempWorldTrans);
    }

    if (this._particleSystem.forceOvertimeModule.enable) {
      this._particleSystem.forceOvertimeModule.update(this._particleSystem._simulationSpace, _tempWorldTrans);
    }

    if (this._particleSystem.trailModule.enable) {
      this._particleSystem.trailModule.update();
    }

    for (var i = 0; i < this._particles.length; ++i) {
      var p = this._particles.data[i];
      p.remainingLifetime -= dt;

      _valueTypes.Vec3.set(p.animatedVelocity, 0, 0, 0);

      if (p.remainingLifetime < 0.0) {
        if (this._particleSystem.trailModule.enable) {
          this._particleSystem.trailModule.removeParticle(p);
        }

        this._particles.remove(i);

        --i;
        continue;
      }

      p.velocity.y -= this._particleSystem.gravityModifier.evaluate(1 - p.remainingLifetime / p.startLifetime, p.randomSeed) * 9.8 * dt; // apply gravity.

      if (this._particleSystem.sizeOvertimeModule.enable) {
        this._particleSystem.sizeOvertimeModule.animate(p);
      }

      if (this._particleSystem.colorOverLifetimeModule.enable) {
        this._particleSystem.colorOverLifetimeModule.animate(p);
      }

      if (this._particleSystem.forceOvertimeModule.enable) {
        this._particleSystem.forceOvertimeModule.animate(p, dt);
      }

      if (this._particleSystem.velocityOvertimeModule.enable) {
        this._particleSystem.velocityOvertimeModule.animate(p);
      } else {
        _valueTypes.Vec3.copy(p.ultimateVelocity, p.velocity);
      }

      if (this._particleSystem.limitVelocityOvertimeModule.enable) {
        this._particleSystem.limitVelocityOvertimeModule.animate(p);
      }

      if (this._particleSystem.rotationOvertimeModule.enable) {
        this._particleSystem.rotationOvertimeModule.animate(p, dt);
      }

      if (this._particleSystem.textureAnimationModule.enable) {
        this._particleSystem.textureAnimationModule.animate(p);
      }

      _valueTypes.Vec3.scaleAndAdd(p.position, p.position, p.ultimateVelocity, dt); // apply velocity.


      if (this._particleSystem.trailModule.enable) {
        this._particleSystem.trailModule.animate(p, dt);
      }
    }

    return this._particles.length;
  } // internal function
  ;

  _proto.updateParticleBuffer = function updateParticleBuffer() {
    // update vertex buffer
    var idx = 0;
    var uploadVel = this._particleSystem.renderMode === _enum.RenderMode.StrecthedBillboard;

    for (var i = 0; i < this._particles.length; ++i) {
      var p = this._particles.data[i];
      var fi = 0;

      if (this._particleSystem.textureAnimationModule.enable) {
        fi = p.frameIndex;
      }

      idx = i * 4;
      var attrNum = 0;

      if (this._particleSystem.renderMode !== _enum.RenderMode.Mesh) {
        for (var j = 0; j < 4; ++j) {
          // four verts per particle.
          attrNum = 0;
          this.attrs[attrNum++] = p.position;
          _tempAttribUV.x = _uvs[2 * j];
          _tempAttribUV.y = _uvs[2 * j + 1];
          _tempAttribUV.z = fi;
          this.attrs[attrNum++] = _tempAttribUV;
          this.attrs[attrNum++] = p.size;
          this.attrs[attrNum++] = p.rotation;
          this.attrs[attrNum++] = p.color._val;

          if (uploadVel) {
            this.attrs[attrNum++] = p.ultimateVelocity;
          } else {
            this.attrs[attrNum++] = null;
          }

          this._model.addParticleVertexData(idx++, this.attrs);
        }
      } else {
        attrNum = 0;
        this.attrs[attrNum++] = p.position;
        _tempAttribUV.z = fi;
        this.attrs[attrNum++] = _tempAttribUV;
        this.attrs[attrNum++] = p.size;
        this.attrs[attrNum++] = p.rotation;
        this.attrs[attrNum++] = p.color._val;

        this._model.addParticleVertexData(i, this.attrs);
      }
    }

    this.updateIA(0, this._particles.length * this._model._indexCount, true);
  };

  _proto.updateShaderUniform = function updateShaderUniform() {};

  _proto.updateIA = function updateIA(index, count, vDirty, iDirty) {
    if (!this._model) return;

    this._model.updateIA(index, count, vDirty, iDirty);
  };

  _proto.getParticleCount = function getParticleCount() {
    return this._particles.data.length;
  };

  _proto._onMaterialModified = function _onMaterialModified(index, material) {
    if (index === 0) {
      this._updateModel();

      this._updateMaterialParams();
    } else {
      this._updateTrailMaterial();
    }
  };

  _proto._onRebuildPSO = function _onRebuildPSO(index, material) {
    if (this._model && index === 0) {
      this._model.setModelMaterial(material);
    }

    if (this._particleSystem.trailModule._trailModel && index === 1) {
      this._particleSystem.trailModule._trailModel.setModelMaterial(material);
    }
  };

  _proto._ensureLoadMesh = function _ensureLoadMesh() {
    if (this._particleSystem.mesh && !this._particleSystem.mesh.loaded) {
      cc.assetManager.postLoadNative(this._particleSystem.mesh);
    }
  };

  _proto.setCapacity = function setCapacity(capacity) {
    if (!this._model) return;

    this._model.setCapacity(capacity);
  };

  _proto._setVertexAttrib = function _setVertexAttrib() {
    switch (this._particleSystem.renderMode) {
      case _enum.RenderMode.StrecthedBillboard:
        this._vertFormat = vfmtStretch;
        break;

      case _enum.RenderMode.Mesh:
        this._vertFormat = vfmtMesh;
        break;

      default:
        this._vertFormat = vfmtNormal;
    }
  };

  _proto._updateMaterialParams = function _updateMaterialParams() {
    if (!this._particleSystem) {
      return;
    }

    var mat = this._particleSystem.materials[0];

    if (mat == null && this._defaultMat == null) {
      mat = this._defaultMat = _materialVariant["default"].createWithBuiltin('3d-particle', this);
    } else {
      mat = _materialVariant["default"].create(mat, this._particleSystem);
    }

    mat = mat || this._defaultMat;

    if (this._particleSystem._simulationSpace === _enum.Space.World) {
      mat.define(CC_USE_WORLD_SPACE, true);
    } else {
      mat.define(CC_USE_WORLD_SPACE, false);
    }

    if (this._particleSystem.renderMode === _enum.RenderMode.Billboard) {
      mat.define(CC_USE_BILLBOARD, true);
      mat.define(CC_USE_STRETCHED_BILLBOARD, false);
      mat.define(CC_USE_HORIZONTAL_BILLBOARD, false);
      mat.define(CC_USE_VERTICAL_BILLBOARD, false);
      mat.define(CC_USE_MESH, false);
    } else if (this._particleSystem.renderMode === _enum.RenderMode.StrecthedBillboard) {
      mat.define(CC_USE_BILLBOARD, false);
      mat.define(CC_USE_STRETCHED_BILLBOARD, true);
      mat.define(CC_USE_HORIZONTAL_BILLBOARD, false);
      mat.define(CC_USE_VERTICAL_BILLBOARD, false);
      mat.define(CC_USE_MESH, false);
      this.frameTile_velLenScale.z = this._particleSystem.velocityScale;
      this.frameTile_velLenScale.w = this._particleSystem.lengthScale;
    } else if (this._particleSystem.renderMode === _enum.RenderMode.HorizontalBillboard) {
      mat.define(CC_USE_BILLBOARD, false);
      mat.define(CC_USE_STRETCHED_BILLBOARD, false);
      mat.define(CC_USE_HORIZONTAL_BILLBOARD, true);
      mat.define(CC_USE_VERTICAL_BILLBOARD, false);
      mat.define(CC_USE_MESH, false);
    } else if (this._particleSystem.renderMode === _enum.RenderMode.VerticalBillboard) {
      mat.define(CC_USE_BILLBOARD, false);
      mat.define(CC_USE_STRETCHED_BILLBOARD, false);
      mat.define(CC_USE_HORIZONTAL_BILLBOARD, false);
      mat.define(CC_USE_VERTICAL_BILLBOARD, true);
      mat.define(CC_USE_MESH, false);
    } else if (this._particleSystem.renderMode === _enum.RenderMode.Mesh) {
      mat.define(CC_USE_BILLBOARD, false);
      mat.define(CC_USE_STRETCHED_BILLBOARD, false);
      mat.define(CC_USE_HORIZONTAL_BILLBOARD, false);
      mat.define(CC_USE_VERTICAL_BILLBOARD, false);
      mat.define(CC_USE_MESH, true);
    } else {
      console.warn("particle system renderMode " + this._particleSystem.renderMode + " not support.");
    }

    if (this._particleSystem.textureAnimationModule.enable) {
      _valueTypes.Vec2.set(this.frameTile_velLenScale, this._particleSystem.textureAnimationModule.numTilesX, this._particleSystem.textureAnimationModule.numTilesY);
    }

    mat.setProperty('frameTile_velLenScale', this.frameTile_velLenScale);

    this._particleSystem.setMaterial(0, mat);
  };

  _proto._updateTrailMaterial = function _updateTrailMaterial() {
    // Here need to create a material variant through the getter call.
    var mat = this._particleSystem.trailMaterial;

    if (this._particleSystem.trailModule.enable) {
      if (mat === null && this._defaultTrailMat === null) {
        this._defaultTrailMat = _materialVariant["default"].createWithBuiltin('3d-trail', this);
      }

      if (mat === null) {
        mat = this._defaultTrailMat;
        this._particleSystem.trailMaterial = mat;
      }

      if (this._particleSystem._simulationSpace === _enum.Space.World || this._particleSystem.trailModule.space === _enum.Space.World) {
        mat.define(CC_USE_WORLD_SPACE, true);
      } else {
        mat.define(CC_USE_WORLD_SPACE, false);
      } //mat.define(CC_DRAW_WIRE_FRAME, true); // <wireframe debug>


      this._particleSystem.trailModule._updateMaterial();
    }
  };

  _proto._updateTrailEnable = function _updateTrailEnable(enable) {
    if (!this._model) {
      return;
    }

    var subData = this._model._subDatas[1];

    if (subData) {
      subData.enable = enable;
    }
  };

  _proto._updateModel = function _updateModel() {
    if (!this._model) {
      return;
    }

    this._model.setVertexAttributes(this._particleSystem.renderMode === _enum.RenderMode.Mesh ? this._particleSystem.mesh : null, this._vertFormat);
  };

  _proto.setVertexAttributes = function setVertexAttributes(mesh, vfmt) {
    if (!this._model) {
      return;
    }

    this._model.setVertexAttributes(mesh, vfmt);
  };

  _proto.fillBuffers = function fillBuffers(comp, renderer) {
    if (!this._model) return;

    this._model._uploadData();

    var submeshes = this._model._subMeshes;
    var subDatas = this._model._subDatas;
    var materials = comp.materials;

    renderer._flush();

    for (var i = 0, len = submeshes.length; i < len; i++) {
      var ia = submeshes[i];
      var meshData = subDatas[i];
      var material = materials[i];

      if (meshData.enable) {
        renderer.material = material;
        renderer.cullingMask = comp.node._cullingMask;
        renderer.node = comp.node;

        renderer._flushIA(ia);
      }
    }
  };

  return ParticleSystem3DAssembler;
}(_assembler["default"]), _temp)) || _class);
exports["default"] = ParticleSystem3DAssembler;
Object.assign(ParticleSystem3DAssembler, {
  uv: _uvs
});

_assembler["default"].register(_particleSystem3d["default"], ParticleSystem3DAssembler);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL3JlbmRlcmVyL3BhcnRpY2xlLXN5c3RlbS0zZC1yZW5kZXJlci50cyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiY2NjbGFzcyIsInByb3BlcnR5IiwiX3RlbXBBdHRyaWJVViIsIlZlYzMiLCJfdGVtcEF0dHJpYlVWMCIsIlZlYzIiLCJfdGVtcEF0dHJpYkNvbG9yIiwiVmVjNCIsIl90ZW1wV29ybGRUcmFucyIsIk1hdDQiLCJfdXZzIiwiQ0NfVVNFX1dPUkxEX1NQQUNFIiwiQ0NfVVNFX0JJTExCT0FSRCIsIkNDX1VTRV9TVFJFVENIRURfQklMTEJPQVJEIiwiQ0NfVVNFX0hPUklaT05UQUxfQklMTEJPQVJEIiwiQ0NfVVNFX1ZFUlRJQ0FMX0JJTExCT0FSRCIsIkNDX1VTRV9NRVNIIiwidmZtdE5vcm1hbCIsImdmeCIsIlZlcnRleEZvcm1hdCIsIm5hbWUiLCJBVFRSX1BPU0lUSU9OIiwidHlwZSIsIkFUVFJfVFlQRV9GTE9BVDMyIiwibnVtIiwiQVRUUl9URVhfQ09PUkQiLCJBVFRSX1RFWF9DT09SRDEiLCJBVFRSX1RFWF9DT09SRDIiLCJBVFRSX0NPTE9SIiwiQVRUUl9UWVBFX1VJTlQ4Iiwibm9ybWFsaXplIiwidmZtdFN0cmV0Y2giLCJBVFRSX0NPTE9SMSIsInZmbXRNZXNoIiwiQVRUUl9URVhfQ09PUkQzIiwiQVRUUl9OT1JNQUwiLCJQYXJ0aWNsZVN5c3RlbTNEQXNzZW1ibGVyIiwiX2RlZmluZXMiLCJfdHJhaWxEZWZpbmVzIiwiX21vZGVsIiwiZnJhbWVUaWxlX3ZlbExlblNjYWxlIiwiYXR0cnMiLCJfdmVydEZvcm1hdCIsIl9wYXJ0aWNsZVN5c3RlbSIsIl9wYXJ0aWNsZXMiLCJfZGVmYXVsdE1hdCIsIl9pc0Fzc2V0UmVhZHkiLCJfZGVmYXVsdFRyYWlsTWF0IiwiX2N1c3RvbVByb3BlcnRpZXMiLCJfbm9kZV9zY2FsZSIsImNjIiwidjQiLCJBcnJheSIsIm9uSW5pdCIsInBzIiwiUmVjeWNsZVBvb2wiLCJQYXJ0aWNsZSIsIl9zZXRWZXJ0ZXhBdHRyaWIiLCJvbkVuYWJsZSIsIl91cGRhdGVNb2RlbCIsIl91cGRhdGVNYXRlcmlhbFBhcmFtcyIsIl91cGRhdGVUcmFpbE1hdGVyaWFsIiwiUGFydGljbGVCYXRjaE1vZGVsIiwiaW5pdGVkIiwic2V0Q2FwYWNpdHkiLCJjYXBhY2l0eSIsImVuYWJsZWQiLCJlbmFibGVkSW5IaWVyYXJjaHkiLCJvbkRpc2FibGUiLCJvbkRlc3Ryb3kiLCJjbGVhciIsInJlc2V0IiwidXBkYXRlUGFydGljbGVCdWZmZXIiLCJfZ2V0RnJlZVBhcnRpY2xlIiwibGVuZ3RoIiwiYWRkIiwiX3NldE5ld1BhcnRpY2xlIiwicCIsIl91cGRhdGVQYXJ0aWNsZXMiLCJkdCIsIm5vZGUiLCJnZXRXb3JsZE1hdHJpeCIsInNjYWxlU3BhY2UiLCJTcGFjZSIsIkxvY2FsIiwiZ2V0U2NhbGUiLCJXb3JsZCIsImdldFdvcmxkU2NhbGUiLCJtYXRlcmlhbCIsIm1hdGVyaWFscyIsIm1hdCIsInBhcnRpY2xlTWF0ZXJpYWwiLCJzZXRQcm9wZXJ0eSIsInZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUiLCJlbmFibGUiLCJ1cGRhdGUiLCJfc2ltdWxhdGlvblNwYWNlIiwiZm9yY2VPdmVydGltZU1vZHVsZSIsInRyYWlsTW9kdWxlIiwiaSIsImRhdGEiLCJyZW1haW5pbmdMaWZldGltZSIsInNldCIsImFuaW1hdGVkVmVsb2NpdHkiLCJyZW1vdmVQYXJ0aWNsZSIsInJlbW92ZSIsInZlbG9jaXR5IiwieSIsImdyYXZpdHlNb2RpZmllciIsImV2YWx1YXRlIiwic3RhcnRMaWZldGltZSIsInJhbmRvbVNlZWQiLCJzaXplT3ZlcnRpbWVNb2R1bGUiLCJhbmltYXRlIiwiY29sb3JPdmVyTGlmZXRpbWVNb2R1bGUiLCJjb3B5IiwidWx0aW1hdGVWZWxvY2l0eSIsImxpbWl0VmVsb2NpdHlPdmVydGltZU1vZHVsZSIsInJvdGF0aW9uT3ZlcnRpbWVNb2R1bGUiLCJ0ZXh0dXJlQW5pbWF0aW9uTW9kdWxlIiwic2NhbGVBbmRBZGQiLCJwb3NpdGlvbiIsImlkeCIsInVwbG9hZFZlbCIsInJlbmRlck1vZGUiLCJSZW5kZXJNb2RlIiwiU3RyZWN0aGVkQmlsbGJvYXJkIiwiZmkiLCJmcmFtZUluZGV4IiwiYXR0ck51bSIsIk1lc2giLCJqIiwieCIsInoiLCJzaXplIiwicm90YXRpb24iLCJjb2xvciIsIl92YWwiLCJhZGRQYXJ0aWNsZVZlcnRleERhdGEiLCJ1cGRhdGVJQSIsIl9pbmRleENvdW50IiwidXBkYXRlU2hhZGVyVW5pZm9ybSIsImluZGV4IiwiY291bnQiLCJ2RGlydHkiLCJpRGlydHkiLCJnZXRQYXJ0aWNsZUNvdW50IiwiX29uTWF0ZXJpYWxNb2RpZmllZCIsIl9vblJlYnVpbGRQU08iLCJzZXRNb2RlbE1hdGVyaWFsIiwiX3RyYWlsTW9kZWwiLCJfZW5zdXJlTG9hZE1lc2giLCJtZXNoIiwibG9hZGVkIiwiYXNzZXRNYW5hZ2VyIiwicG9zdExvYWROYXRpdmUiLCJNYXRlcmlhbFZhcmlhbnQiLCJjcmVhdGVXaXRoQnVpbHRpbiIsImNyZWF0ZSIsImRlZmluZSIsIkJpbGxib2FyZCIsInZlbG9jaXR5U2NhbGUiLCJ3IiwibGVuZ3RoU2NhbGUiLCJIb3Jpem9udGFsQmlsbGJvYXJkIiwiVmVydGljYWxCaWxsYm9hcmQiLCJjb25zb2xlIiwid2FybiIsIm51bVRpbGVzWCIsIm51bVRpbGVzWSIsInNldE1hdGVyaWFsIiwidHJhaWxNYXRlcmlhbCIsInNwYWNlIiwiX3VwZGF0ZU1hdGVyaWFsIiwiX3VwZGF0ZVRyYWlsRW5hYmxlIiwic3ViRGF0YSIsIl9zdWJEYXRhcyIsInNldFZlcnRleEF0dHJpYnV0ZXMiLCJ2Zm10IiwiZmlsbEJ1ZmZlcnMiLCJjb21wIiwicmVuZGVyZXIiLCJfdXBsb2FkRGF0YSIsInN1Ym1lc2hlcyIsIl9zdWJNZXNoZXMiLCJzdWJEYXRhcyIsIl9mbHVzaCIsImxlbiIsImlhIiwibWVzaERhdGEiLCJjdWxsaW5nTWFzayIsIl9jdWxsaW5nTWFzayIsIl9mbHVzaElBIiwiQXNzZW1ibGVyIiwiT2JqZWN0IiwiYXNzaWduIiwidXYiLCJyZWdpc3RlciIsIlBhcnRpY2xlU3lzdGVtM0QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7ZUFFOEJBLE9BQU8sQ0FBQyxvQ0FBRDtJQUE3QkMsbUJBQUFBO0lBQVNDLG9CQUFBQSxVQUVqQjs7O0FBQ0EsSUFBTUMsYUFBYSxHQUFHLElBQUlDLGdCQUFKLEVBQXRCOztBQUNBLElBQU1DLGNBQWMsR0FBRyxJQUFJQyxnQkFBSixFQUF2Qjs7QUFDQSxJQUFNQyxnQkFBZ0IsR0FBRyxJQUFJQyxnQkFBSixFQUF6Qjs7QUFDQSxJQUFNQyxlQUFlLEdBQUcsSUFBSUMsZ0JBQUosRUFBeEI7O0FBRUEsSUFBTUMsSUFBSSxHQUFHLENBQ1QsQ0FEUyxFQUNOLENBRE0sRUFDSDtBQUNOLENBRlMsRUFFTixDQUZNLEVBRUg7QUFDTixDQUhTLEVBR04sQ0FITSxFQUdIO0FBQ04sQ0FKUyxFQUlOLENBSk0sQ0FJSDtBQUpHLENBQWI7QUFPQSxJQUFNQyxrQkFBa0IsR0FBRyxvQkFBM0I7QUFDQSxJQUFNQyxnQkFBZ0IsR0FBRyxrQkFBekI7QUFDQSxJQUFNQywwQkFBMEIsR0FBRyw0QkFBbkM7QUFDQSxJQUFNQywyQkFBMkIsR0FBRyw2QkFBcEM7QUFDQSxJQUFNQyx5QkFBeUIsR0FBRywyQkFBbEM7QUFDQSxJQUFNQyxXQUFXLEdBQUcsYUFBcEIsRUFDQTs7QUFHQSxJQUFJQyxVQUFVLEdBQUcsSUFBSUMsZ0JBQUlDLFlBQVIsQ0FBcUIsQ0FDbEM7QUFBRUMsRUFBQUEsSUFBSSxFQUFFRixnQkFBSUcsYUFBWjtBQUEyQkMsRUFBQUEsSUFBSSxFQUFFSixnQkFBSUssaUJBQXJDO0FBQXdEQyxFQUFBQSxHQUFHLEVBQUU7QUFBN0QsQ0FEa0MsRUFFbEM7QUFBRUosRUFBQUEsSUFBSSxFQUFFRixnQkFBSU8sY0FBWjtB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LE1BQVAsQ0FBYy9KLHlCQUFkLEVBQXlDO0FBQUVnSyxFQUFBQSxFQUFFLEVBQUUxTDtBQUFOLENBQXpDOztBQUVBdUwsc0JBQVVJLFFBQVYsQ0FBbUJDLDRCQUFuQixFQUFxQ2xLLHlCQUFyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hdDQsIFZlYzIsIFZlYzMsIFZlYzQgfSBmcm9tICcuLi8uLi8uLi92YWx1ZS10eXBlcyc7XG5pbXBvcnQgZ2Z4IGZyb20gJy4uLy4uLy4uLy4uL3JlbmRlcmVyL2dmeCc7XG5pbXBvcnQgUGFydGljbGVCYXRjaE1vZGVsIGZyb20gJy4vcGFydGljbGUtYmF0Y2gtbW9kZWwnO1xuaW1wb3J0IE1hdGVyaWFsVmFyaWFudCBmcm9tICcuLi8uLi8uLi9hc3NldHMvbWF0ZXJpYWwvbWF0ZXJpYWwtdmFyaWFudCc7XG5pbXBvcnQgUmVjeWNsZVBvb2wgZnJvbSAnLi4vLi4vLi4vLi4vcmVuZGVyZXIvbWVtb3AvcmVjeWNsZS1wb29sJztcbmltcG9ydCB7IFJlbmRlck1vZGUsIFNwYWNlIH0gZnJvbSAnLi4vZW51bSc7XG5pbXBvcnQgUGFydGljbGUgZnJvbSAnLi4vcGFydGljbGUnO1xuaW1wb3J0IEFzc2VtYmxlciBmcm9tICcuLi8uLi8uLi9yZW5kZXJlci9hc3NlbWJsZXInO1xuaW1wb3J0IFBhcnRpY2xlU3lzdGVtM0QgZnJvbSAnLi4vcGFydGljbGUtc3lzdGVtLTNkJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gcmVxdWlyZSgnLi4vLi4vLi4vcGxhdGZvcm0vQ0NDbGFzc0RlY29yYXRvcicpO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTogbWF4LWxpbmUtbGVuZ3RoXG5jb25zdCBfdGVtcEF0dHJpYlVWID0gbmV3IFZlYzMoKTtcbmNvbnN0IF90ZW1wQXR0cmliVVYwID0gbmV3IFZlYzIoKTtcbmNvbnN0IF90ZW1wQXR0cmliQ29sb3IgPSBuZXcgVmVjNCgpO1xuY29uc3QgX3RlbXBXb3JsZFRyYW5zID0gbmV3IE1hdDQoKTtcblxuY29uc3QgX3V2cyA9IFtcbiAgICAwLCAwLCAvLyBib3R0b20tbGVmdFxuICAgIDEsIDAsIC8vIGJvdHRvbS1yaWdodFxuICAgIDAsIDEsIC8vIHRvcC1sZWZ0XG4gICAgMSwgMSwgLy8gdG9wLXJpZ2h0XG5dO1xuXG5jb25zdCBDQ19VU0VfV09STERfU1BBQ0UgPSAnQ0NfVVNFX1dPUkxEX1NQQUNFJztcbmNvbnN0IENDX1VTRV9CSUxMQk9BUkQgPSAnQ0NfVVNFX0JJTExCT0FSRCc7XG5jb25zdCBDQ19VU0VfU1RSRVRDSEVEX0JJTExCT0FSRCA9ICdDQ19VU0VfU1RSRVRDSEVEX0JJTExCT0FSRCc7XG5jb25zdCBDQ19VU0VfSE9SSVpPTlRBTF9CSUxMQk9BUkQgPSAnQ0NfVVNFX0hPUklaT05UQUxfQklMTEJPQVJEJztcbmNvbnN0IENDX1VTRV9WRVJUSUNBTF9CSUxMQk9BUkQgPSAnQ0NfVVNFX1ZFUlRJQ0FMX0JJTExCT0FSRCc7XG5jb25zdCBDQ19VU0VfTUVTSCA9ICdDQ19VU0VfTUVTSCc7XG4vL2NvbnN0IENDX0RSQVdfV0lSRV9GUkFNRSA9ICdDQ19EUkFXX1dJUkVfRlJBTUUnOyAvLyA8d2lyZWZyYW1lIGRlYnVnPlxuXG5cbnZhciB2Zm10Tm9ybWFsID0gbmV3IGdmeC5WZXJ0ZXhGb3JtYXQoW1xuICAgIHsgbmFtZTogZ2Z4LkFUVFJfUE9TSVRJT04sIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAzfSxcbiAgICB7IG5hbWU6IGdmeC5BVFRSX1RFWF9DT09SRCwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDN9LFxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfVEVYX0NPT1JEMSwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDN9LFxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfVEVYX0NPT1JEMiwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDN9LFxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfQ09MT1IsIHR5cGU6IGdmeC5BVFRSX1RZUEVfVUlOVDgsIG51bTogNCwgbm9ybWFsaXplOiB0cnVlIH0sXG5dKTtcbnZmbXROb3JtYWwubmFtZSA9ICd2Zm10Tm9ybWFsJztcblxudmFyIHZmbXRTdHJldGNoID0gbmV3IGdmeC5WZXJ0ZXhGb3JtYXQoW1xuICAgIHsgbmFtZTogZ2Z4LkFUVFJfUE9TSVRJT04sIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAzfSxcbiAgICB7IG5hbWU6IGdmeC5BVFRSX1RFWF9DT09SRCwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDN9LFxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfVEVYX0NPT1JEMSwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDN9LFxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfVEVYX0NPT1JEMiwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDN9LFxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfQ09MT1IsIHR5cGU6IGdmeC5BVFRSX1RZUEVfVUlOVDgsIG51bTogNCwgbm9ybWFsaXplOiB0cnVlIH0sXG4gICAgeyBuYW1lOiBnZnguQVRUUl9DT0xPUjEsIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAzfVxuXSk7XG52Zm10U3RyZXRjaC5uYW1lID0gJ3ZmbXRTdHJldGNoJztcblxudmFyIHZmbXRNZXNoID0gbmV3IGdmeC5WZXJ0ZXhGb3JtYXQoW1xuICAgIHsgbmFtZTogZ2Z4LkFUVFJfUE9TSVRJT04sIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAzfSxcbiAgICB7IG5hbWU6IGdmeC5BVFRSX1RFWF9DT09SRCwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDN9LFxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfVEVYX0NPT1JEMSwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDN9LFxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfVEVYX0NPT1JEMiwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDN9LFxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfQ09MT1IsIHR5cGU6IGdmeC5BVFRSX1RZUEVfVUlOVDgsIG51bTogNCwgbm9ybWFsaXplOiB0cnVlIH0sXG4gICAgeyBuYW1lOiBnZnguQVRUUl9URVhfQ09PUkQzLCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogMyB9LFxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfTk9STUFMLCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogMyB9LFxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfQ09MT1IxLCB0eXBlOiBnZnguQVRUUl9UWVBFX1VJTlQ4LCBudW06IDQsIG5vcm1hbGl6ZTogdHJ1ZSB9XG5dKTtcbnZmbXRNZXNoLm5hbWUgPSAndmZtdE1lc2gnO1xuXG5AY2NjbGFzcygnY2MuUGFydGljbGVTeXN0ZW0zREFzc2VtYmxlcicpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWNsZVN5c3RlbTNEQXNzZW1ibGVyIGV4dGVuZHMgQXNzZW1ibGVyIHtcbiAgICBfZGVmaW5lcyA9IG51bGw7XG4gICAgX3RyYWlsRGVmaW5lcyA9IG51bGw7XG4gICAgX21vZGVsID0gbnVsbDtcbiAgICBmcmFtZVRpbGVfdmVsTGVuU2NhbGUgPSBudWxsO1xuICAgIGF0dHJzID0gW107XG4gICAgX3ZlcnRGb3JtYXQgPSBbXTtcbiAgICBfcGFydGljbGVTeXN0ZW0gPSBudWxsO1xuICAgIF9wYXJ0aWNsZXMgPSBudWxsO1xuICAgIF9kZWZhdWx0TWF0ID0gbnVsbDtcbiAgICBfaXNBc3NldFJlYWR5ID0gZmFsc2U7XG4gICAgX2RlZmF1bHRUcmFpbE1hdCA9IG51bGw7XG4gICAgX2N1c3RvbVByb3BlcnRpZXMgPSBudWxsO1xuICAgIF9ub2RlX3NjYWxlID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fbW9kZWwgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZnJhbWVUaWxlX3ZlbExlblNjYWxlID0gY2MudjQoMSwgMSwgMCwgMCk7XG4gICAgICAgIHRoaXMuX25vZGVfc2NhbGUgPSBjYy52NCgpO1xuICAgICAgICB0aGlzLmF0dHJzID0gbmV3IEFycmF5KDUpO1xuXG4gICAgICAgIHRoaXMuX3RyYWlsRGVmaW5lcyA9IHtcbiAgICAgICAgICAgIENDX1VTRV9XT1JMRF9TUEFDRTogdHJ1ZSxcbiAgICAgICAgICAgIC8vQ0NfRFJBV19XSVJFX0ZSQU1FOiB0cnVlLCAgIC8vIDx3aXJlZnJhbWUgZGVidWc+XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25Jbml0IChwcykge1xuICAgICAgICB0aGlzLl9wYXJ0aWNsZVN5c3RlbSA9IHBzO1xuICAgICAgICB0aGlzLl9wYXJ0aWNsZXMgPSBuZXcgUmVjeWNsZVBvb2woKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQYXJ0aWNsZSh0aGlzKTtcbiAgICAgICAgfSwgMTYpO1xuICAgICAgICB0aGlzLl9zZXRWZXJ0ZXhBdHRyaWIoKTtcbiAgICAgICAgdGhpcy5vbkVuYWJsZSgpO1xuICAgICAgICB0aGlzLl91cGRhdGVNb2RlbCgpO1xuICAgICAgICB0aGlzLl91cGRhdGVNYXRlcmlhbFBhcmFtcygpO1xuICAgICAgICB0aGlzLl91cGRhdGVUcmFpbE1hdGVyaWFsKCk7XG4gICAgfVxuXG4gICAgb25FbmFibGUgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3BhcnRpY2xlU3lzdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbW9kZWwgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbW9kZWwgPSBuZXcgUGFydGljbGVCYXRjaE1vZGVsKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX21vZGVsLmluaXRlZCkge1xuICAgICAgICAgICAgdGhpcy5fbW9kZWwuc2V0Q2FwYWNpdHkodGhpcy5fcGFydGljbGVTeXN0ZW0uY2FwYWNpdHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbW9kZWwuZW5hYmxlZCA9IHRoaXMuX3BhcnRpY2xlU3lzdGVtLmVuYWJsZWRJbkhpZXJhcmNoeTtcbiAgICB9XG5cbiAgICBvbkRpc2FibGUgKCkge1xuICAgICAgICBpZiAodGhpcy5fbW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGVsLmVuYWJsZWQgPSB0aGlzLl9wYXJ0aWNsZVN5c3RlbS5lbmFibGVkSW5IaWVyYXJjaHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRlc3Ryb3kgKCkge1xuICAgICAgICB0aGlzLl9tb2RlbCA9IG51bGw7XG4gICAgfVxuXG4gICAgY2xlYXIgKCkge1xuICAgICAgICB0aGlzLl9wYXJ0aWNsZXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVQYXJ0aWNsZUJ1ZmZlcigpO1xuICAgIH1cblxuICAgIF9nZXRGcmVlUGFydGljbGUgKCkge1xuICAgICAgICBpZiAodGhpcy5fcGFydGljbGVzLmxlbmd0aCA+PSB0aGlzLl9wYXJ0aWNsZVN5c3RlbS5jYXBhY2l0eSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnRpY2xlcy5hZGQoKTtcbiAgICB9XG5cbiAgICBfc2V0TmV3UGFydGljbGUgKHApIHtcblxuICAgIH1cblxuICAgIF91cGRhdGVQYXJ0aWNsZXMgKGR0KSB7XG4gICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLm5vZGUuZ2V0V29ybGRNYXRyaXgoX3RlbXBXb3JsZFRyYW5zKTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuX3BhcnRpY2xlU3lzdGVtLnNjYWxlU3BhY2UpIHtcbiAgICAgICAgICAgIGNhc2UgU3BhY2UuTG9jYWw6XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0ubm9kZS5nZXRTY2FsZSh0aGlzLl9ub2RlX3NjYWxlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU3BhY2UuV29ybGQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0ubm9kZS5nZXRXb3JsZFNjYWxlKHRoaXMuX25vZGVfc2NhbGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1hdGVyaWFsID0gdGhpcy5fcGFydGljbGVTeXN0ZW0ubWF0ZXJpYWxzWzBdO1xuICAgICAgICBsZXQgbWF0ID0gbWF0ZXJpYWwgPyB0aGlzLl9wYXJ0aWNsZVN5c3RlbS5wYXJ0aWNsZU1hdGVyaWFsIDogdGhpcy5fZGVmYXVsdE1hdDtcbiAgICAgICAgbWF0LnNldFByb3BlcnR5KCdzY2FsZScsIHRoaXMuX25vZGVfc2NhbGUpO1xuXG4gICAgICAgIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS52ZWxvY2l0eU92ZXJ0aW1lTW9kdWxlLmVuYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0udmVsb2NpdHlPdmVydGltZU1vZHVsZS51cGRhdGUodGhpcy5fcGFydGljbGVTeXN0ZW0uX3NpbXVsYXRpb25TcGFjZSwgX3RlbXBXb3JsZFRyYW5zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0uZm9yY2VPdmVydGltZU1vZHVsZS5lbmFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLmZvcmNlT3ZlcnRpbWVNb2R1bGUudXBkYXRlKHRoaXMuX3BhcnRpY2xlU3lzdGVtLl9zaW11bGF0aW9uU3BhY2UsIF90ZW1wV29ybGRUcmFucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3BhcnRpY2xlU3lzdGVtLnRyYWlsTW9kdWxlLmVuYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0udHJhaWxNb2R1bGUudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9wYXJ0aWNsZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSB0aGlzLl9wYXJ0aWNsZXMuZGF0YVtpXTtcbiAgICAgICAgICAgIHAucmVtYWluaW5nTGlmZXRpbWUgLT0gZHQ7XG4gICAgICAgICAgICBWZWMzLnNldChwLmFuaW1hdGVkVmVsb2NpdHksIDAsIDAsIDApO1xuXG4gICAgICAgICAgICBpZiAocC5yZW1haW5pbmdMaWZldGltZSA8IDAuMCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS50cmFpbE1vZHVsZS5lbmFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0udHJhaWxNb2R1bGUucmVtb3ZlUGFydGljbGUocCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRpY2xlcy5yZW1vdmUoaSk7XG4gICAgICAgICAgICAgICAgLS1pO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwLnZlbG9jaXR5LnkgLT0gdGhpcy5fcGFydGljbGVTeXN0ZW0uZ3Jhdml0eU1vZGlmaWVyLmV2YWx1YXRlKDEgLSBwLnJlbWFpbmluZ0xpZmV0aW1lIC8gcC5zdGFydExpZmV0aW1lLCBwLnJhbmRvbVNlZWQpICogOS44ICogZHQ7IC8vIGFwcGx5IGdyYXZpdHkuXG4gICAgICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0uc2l6ZU92ZXJ0aW1lTW9kdWxlLmVuYWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLnNpemVPdmVydGltZU1vZHVsZS5hbmltYXRlKHApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX3BhcnRpY2xlU3lzdGVtLmNvbG9yT3ZlckxpZmV0aW1lTW9kdWxlLmVuYWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLmNvbG9yT3ZlckxpZmV0aW1lTW9kdWxlLmFuaW1hdGUocCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0uZm9yY2VPdmVydGltZU1vZHVsZS5lbmFibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJ0aWNsZVN5c3RlbS5mb3JjZU92ZXJ0aW1lTW9kdWxlLmFuaW1hdGUocCwgZHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX3BhcnRpY2xlU3lzdGVtLnZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUuZW5hYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0udmVsb2NpdHlPdmVydGltZU1vZHVsZS5hbmltYXRlKHApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBWZWMzLmNvcHkocC51bHRpbWF0ZVZlbG9jaXR5LCBwLnZlbG9jaXR5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX3BhcnRpY2xlU3lzdGVtLmxpbWl0VmVsb2NpdHlPdmVydGltZU1vZHVsZS5lbmFibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJ0aWNsZVN5c3RlbS5saW1pdFZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUuYW5pbWF0ZShwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS5yb3RhdGlvbk92ZXJ0aW1lTW9kdWxlLmVuYWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLnJvdGF0aW9uT3ZlcnRpbWVNb2R1bGUuYW5pbWF0ZShwLCBkdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0udGV4dHVyZUFuaW1hdGlvbk1vZHVsZS5lbmFibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJ0aWNsZVN5c3RlbS50ZXh0dXJlQW5pbWF0aW9uTW9kdWxlLmFuaW1hdGUocCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBWZWMzLnNjYWxlQW5kQWRkKHAucG9zaXRpb24sIHAucG9zaXRpb24sIHAudWx0aW1hdGVWZWxvY2l0eSwgZHQpOyAvLyBhcHBseSB2ZWxvY2l0eS5cbiAgICAgICAgICAgIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS50cmFpbE1vZHVsZS5lbmFibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJ0aWNsZVN5c3RlbS50cmFpbE1vZHVsZS5hbmltYXRlKHAsIGR0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcGFydGljbGVzLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvLyBpbnRlcm5hbCBmdW5jdGlvblxuICAgIHVwZGF0ZVBhcnRpY2xlQnVmZmVyICgpIHtcbiAgICAgICAgLy8gdXBkYXRlIHZlcnRleCBidWZmZXJcbiAgICAgICAgbGV0IGlkeCA9IDA7XG4gICAgICAgIGNvbnN0IHVwbG9hZFZlbCA9IHRoaXMuX3BhcnRpY2xlU3lzdGVtLnJlbmRlck1vZGUgPT09IFJlbmRlck1vZGUuU3RyZWN0aGVkQmlsbGJvYXJkO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3BhcnRpY2xlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgY29uc3QgcCA9IHRoaXMuX3BhcnRpY2xlcy5kYXRhW2ldO1xuICAgICAgICAgICAgbGV0IGZpID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS50ZXh0dXJlQW5pbWF0aW9uTW9kdWxlLmVuYWJsZSkge1xuICAgICAgICAgICAgICAgIGZpID0gcC5mcmFtZUluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4ID0gaSAqIDQ7XG4gICAgICAgICAgICBsZXQgYXR0ck51bSA9IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0ucmVuZGVyTW9kZSAhPT0gUmVuZGVyTW9kZS5NZXNoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyArK2opIHsgLy8gZm91ciB2ZXJ0cyBwZXIgcGFydGljbGUuXG4gICAgICAgICAgICAgICAgICAgIGF0dHJOdW0gPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJzW2F0dHJOdW0rK10gPSBwLnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICBfdGVtcEF0dHJpYlVWLnggPSBfdXZzWzIgKiBqXTtcbiAgICAgICAgICAgICAgICAgICAgX3RlbXBBdHRyaWJVVi55ID0gX3V2c1syICogaiArIDFdO1xuICAgICAgICAgICAgICAgICAgICBfdGVtcEF0dHJpYlVWLnogPSBmaTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyc1thdHRyTnVtKytdID0gX3RlbXBBdHRyaWJVVjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyc1thdHRyTnVtKytdID0gcC5zaXplO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJzW2F0dHJOdW0rK10gPSBwLnJvdGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJzW2F0dHJOdW0rK10gPSBwLmNvbG9yLl92YWw7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwbG9hZFZlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyc1thdHRyTnVtKytdID0gcC51bHRpbWF0ZVZlbG9jaXR5O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyc1thdHRyTnVtKytdID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21vZGVsLmFkZFBhcnRpY2xlVmVydGV4RGF0YShpZHgrKywgdGhpcy5hdHRycyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRyTnVtID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJzW2F0dHJOdW0rK10gPSBwLnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIF90ZW1wQXR0cmliVVYueiA9IGZpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0cnNbYXR0ck51bSsrXSA9IF90ZW1wQXR0cmliVVY7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyc1thdHRyTnVtKytdID0gcC5zaXplO1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0cnNbYXR0ck51bSsrXSA9IHAucm90YXRpb247XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyc1thdHRyTnVtKytdID0gcC5jb2xvci5fdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMuX21vZGVsLmFkZFBhcnRpY2xlVmVydGV4RGF0YShpLCB0aGlzLmF0dHJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlSUEoMCwgdGhpcy5fcGFydGljbGVzLmxlbmd0aCAqIHRoaXMuX21vZGVsLl9pbmRleENvdW50LCB0cnVlKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTaGFkZXJVbmlmb3JtICgpIHtcblxuICAgIH1cblxuICAgIHVwZGF0ZUlBIChpbmRleCwgY291bnQsIHZEaXJ0eSwgaURpcnR5KSB7XG4gICAgICAgIGlmICghdGhpcy5fbW9kZWwpIHJldHVybjtcblxuICAgICAgICB0aGlzLl9tb2RlbC51cGRhdGVJQShpbmRleCwgY291bnQsIHZEaXJ0eSwgaURpcnR5KTtcbiAgICB9XG5cbiAgICBnZXRQYXJ0aWNsZUNvdW50ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnRpY2xlcy5kYXRhLmxlbmd0aDtcbiAgICB9XG5cbiAgICBfb25NYXRlcmlhbE1vZGlmaWVkIChpbmRleCwgbWF0ZXJpYWwpIHtcbiAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNb2RlbCgpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTWF0ZXJpYWxQYXJhbXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRyYWlsTWF0ZXJpYWwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9vblJlYnVpbGRQU08gKGluZGV4LCBtYXRlcmlhbCkge1xuICAgICAgICBpZiAodGhpcy5fbW9kZWwgJiYgaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGVsLnNldE1vZGVsTWF0ZXJpYWwobWF0ZXJpYWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS50cmFpbE1vZHVsZS5fdHJhaWxNb2RlbCAmJiBpbmRleCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0udHJhaWxNb2R1bGUuX3RyYWlsTW9kZWwuc2V0TW9kZWxNYXRlcmlhbChtYXRlcmlhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZW5zdXJlTG9hZE1lc2ggKCkge1xuICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0ubWVzaCAmJiAhdGhpcy5fcGFydGljbGVTeXN0ZW0ubWVzaC5sb2FkZWQpIHtcbiAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5wb3N0TG9hZE5hdGl2ZSh0aGlzLl9wYXJ0aWNsZVN5c3RlbS5tZXNoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldENhcGFjaXR5IChjYXBhY2l0eSkge1xuICAgICAgICBpZiAoIXRoaXMuX21vZGVsKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fbW9kZWwuc2V0Q2FwYWNpdHkoY2FwYWNpdHkpO1xuICAgIH1cblxuICAgIF9zZXRWZXJ0ZXhBdHRyaWIgKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX3BhcnRpY2xlU3lzdGVtLnJlbmRlck1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgUmVuZGVyTW9kZS5TdHJlY3RoZWRCaWxsYm9hcmQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fdmVydEZvcm1hdCA9IHZmbXRTdHJldGNoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBSZW5kZXJNb2RlLk1lc2g6XG4gICAgICAgICAgICAgICAgdGhpcy5fdmVydEZvcm1hdCA9IHZmbXRNZXNoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLl92ZXJ0Rm9ybWF0ID0gdmZtdE5vcm1hbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF91cGRhdGVNYXRlcmlhbFBhcmFtcyAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fcGFydGljbGVTeXN0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbWF0ID0gdGhpcy5fcGFydGljbGVTeXN0ZW0ubWF0ZXJpYWxzWzBdO1xuICAgICAgICBpZiAobWF0ID09IG51bGwgJiYgdGhpcy5fZGVmYXVsdE1hdCA9PSBudWxsKSB7XG4gICAgICAgICAgICBtYXQgPSB0aGlzLl9kZWZhdWx0TWF0ID0gTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZVdpdGhCdWlsdGluKCczZC1wYXJ0aWNsZScsIHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWF0ID0gTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZShtYXQsIHRoaXMuX3BhcnRpY2xlU3lzdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hdCA9IG1hdCB8fCB0aGlzLl9kZWZhdWx0TWF0O1xuXG4gICAgICAgIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS5fc2ltdWxhdGlvblNwYWNlID09PSBTcGFjZS5Xb3JsZCkge1xuICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfV09STERfU1BBQ0UsIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfV09STERfU1BBQ0UsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS5yZW5kZXJNb2RlID09PSBSZW5kZXJNb2RlLkJpbGxib2FyZCkge1xuICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfQklMTEJPQVJELCB0cnVlKTtcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX1NUUkVUQ0hFRF9CSUxMQk9BUkQsIGZhbHNlKTtcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX0hPUklaT05UQUxfQklMTEJPQVJELCBmYWxzZSk7XG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9WRVJUSUNBTF9CSUxMQk9BUkQsIGZhbHNlKTtcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX01FU0gsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS5yZW5kZXJNb2RlID09PSBSZW5kZXJNb2RlLlN0cmVjdGhlZEJpbGxib2FyZCkge1xuICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfQklMTEJPQVJELCBmYWxzZSk7XG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9TVFJFVENIRURfQklMTEJPQVJELCB0cnVlKTtcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX0hPUklaT05UQUxfQklMTEJPQVJELCBmYWxzZSk7XG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9WRVJUSUNBTF9CSUxMQk9BUkQsIGZhbHNlKTtcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX01FU0gsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVUaWxlX3ZlbExlblNjYWxlLnogPSB0aGlzLl9wYXJ0aWNsZVN5c3RlbS52ZWxvY2l0eVNjYWxlO1xuICAgICAgICAgICAgdGhpcy5mcmFtZVRpbGVfdmVsTGVuU2NhbGUudyA9IHRoaXMuX3BhcnRpY2xlU3lzdGVtLmxlbmd0aFNjYWxlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3BhcnRpY2xlU3lzdGVtLnJlbmRlck1vZGUgPT09IFJlbmRlck1vZGUuSG9yaXpvbnRhbEJpbGxib2FyZCkge1xuICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfQklMTEJPQVJELCBmYWxzZSk7XG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9TVFJFVENIRURfQklMTEJPQVJELCBmYWxzZSk7XG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9IT1JJWk9OVEFMX0JJTExCT0FSRCwgdHJ1ZSk7XG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9WRVJUSUNBTF9CSUxMQk9BUkQsIGZhbHNlKTtcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX01FU0gsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS5yZW5kZXJNb2RlID09PSBSZW5kZXJNb2RlLlZlcnRpY2FsQmlsbGJvYXJkKSB7XG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9CSUxMQk9BUkQsIGZhbHNlKTtcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX1NUUkVUQ0hFRF9CSUxMQk9BUkQsIGZhbHNlKTtcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX0hPUklaT05UQUxfQklMTEJPQVJELCBmYWxzZSk7XG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9WRVJUSUNBTF9CSUxMQk9BUkQsIHRydWUpO1xuICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfTUVTSCwgZmFsc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3BhcnRpY2xlU3lzdGVtLnJlbmRlck1vZGUgPT09IFJlbmRlck1vZGUuTWVzaCkge1xuICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfQklMTEJPQVJELCBmYWxzZSk7XG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9TVFJFVENIRURfQklMTEJPQVJELCBmYWxzZSk7XG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9IT1JJWk9OVEFMX0JJTExCT0FSRCwgZmFsc2UpO1xuICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfVkVSVElDQUxfQklMTEJPQVJELCBmYWxzZSk7XG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9NRVNILCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgcGFydGljbGUgc3lzdGVtIHJlbmRlck1vZGUgJHt0aGlzLl9wYXJ0aWNsZVN5c3RlbS5yZW5kZXJNb2RlfSBub3Qgc3VwcG9ydC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS50ZXh0dXJlQW5pbWF0aW9uTW9kdWxlLmVuYWJsZSkge1xuICAgICAgICAgICAgVmVjMi5zZXQodGhpcy5mcmFtZVRpbGVfdmVsTGVuU2NhbGUsIHRoaXMuX3BhcnRpY2xlU3lzdGVtLnRleHR1cmVBbmltYXRpb25Nb2R1bGUubnVtVGlsZXNYLCB0aGlzLl9wYXJ0aWNsZVN5c3RlbS50ZXh0dXJlQW5pbWF0aW9uTW9kdWxlLm51bVRpbGVzWSk7XG4gICAgICAgIH1cblxuICAgICAgICBtYXQuc2V0UHJvcGVydHkoJ2ZyYW1lVGlsZV92ZWxMZW5TY2FsZScsIHRoaXMuZnJhbWVUaWxlX3ZlbExlblNjYWxlKTtcblxuICAgICAgICB0aGlzLl9wYXJ0aWNsZVN5c3RlbS5zZXRNYXRlcmlhbCgwLCBtYXQpO1xuICAgIH1cblxuICAgIF91cGRhdGVUcmFpbE1hdGVyaWFsICgpIHtcbiAgICAgICAgLy8gSGVyZSBuZWVkIHRvIGNyZWF0ZSBhIG1hdGVyaWFsIHZhcmlhbnQgdGhyb3VnaCB0aGUgZ2V0dGVyIGNhbGwuXG4gICAgICAgIGxldCBtYXQgPSB0aGlzLl9wYXJ0aWNsZVN5c3RlbS50cmFpbE1hdGVyaWFsO1xuICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0udHJhaWxNb2R1bGUuZW5hYmxlKSB7XG4gICAgICAgICAgICBpZiAobWF0ID09PSBudWxsICYmIHRoaXMuX2RlZmF1bHRUcmFpbE1hdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRUcmFpbE1hdCA9IE1hdGVyaWFsVmFyaWFudC5jcmVhdGVXaXRoQnVpbHRpbignM2QtdHJhaWwnLCB0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG1hdCA9IHRoaXMuX2RlZmF1bHRUcmFpbE1hdDtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJ0aWNsZVN5c3RlbS50cmFpbE1hdGVyaWFsID0gbWF0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0uX3NpbXVsYXRpb25TcGFjZSA9PT0gU3BhY2UuV29ybGQgfHwgdGhpcy5fcGFydGljbGVTeXN0ZW0udHJhaWxNb2R1bGUuc3BhY2UgPT09IFNwYWNlLldvcmxkKSB7XG4gICAgICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfV09STERfU1BBQ0UsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9XT1JMRF9TUEFDRSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL21hdC5kZWZpbmUoQ0NfRFJBV19XSVJFX0ZSQU1FLCB0cnVlKTsgLy8gPHdpcmVmcmFtZSBkZWJ1Zz5cbiAgICAgICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLnRyYWlsTW9kdWxlLl91cGRhdGVNYXRlcmlhbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3VwZGF0ZVRyYWlsRW5hYmxlIChlbmFibGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9tb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHN1YkRhdGEgPSB0aGlzLl9tb2RlbC5fc3ViRGF0YXNbMV07XG4gICAgICAgIGlmIChzdWJEYXRhKSB7XG4gICAgICAgICAgICBzdWJEYXRhLmVuYWJsZSA9IGVuYWJsZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF91cGRhdGVNb2RlbCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tb2RlbC5zZXRWZXJ0ZXhBdHRyaWJ1dGVzKHRoaXMuX3BhcnRpY2xlU3lzdGVtLnJlbmRlck1vZGUgPT09IFJlbmRlck1vZGUuTWVzaCA/IHRoaXMuX3BhcnRpY2xlU3lzdGVtLm1lc2ggOiBudWxsLCB0aGlzLl92ZXJ0Rm9ybWF0KTtcbiAgICB9XG5cbiAgICBzZXRWZXJ0ZXhBdHRyaWJ1dGVzIChtZXNoLCB2Zm10KSB7XG4gICAgICAgIGlmICghdGhpcy5fbW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tb2RlbC5zZXRWZXJ0ZXhBdHRyaWJ1dGVzKG1lc2gsIHZmbXQpO1xuICAgIH1cblxuICAgIGZpbGxCdWZmZXJzIChjb21wLCByZW5kZXJlcikge1xuICAgICAgICBpZiAoIXRoaXMuX21vZGVsKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fbW9kZWwuX3VwbG9hZERhdGEoKTtcblxuICAgICAgICBsZXQgc3VibWVzaGVzID0gdGhpcy5fbW9kZWwuX3N1Yk1lc2hlcztcbiAgICAgICAgbGV0IHN1YkRhdGFzID0gdGhpcy5fbW9kZWwuX3N1YkRhdGFzO1xuICAgICAgICBsZXQgbWF0ZXJpYWxzID0gY29tcC5tYXRlcmlhbHM7XG4gICAgICAgIHJlbmRlcmVyLl9mbHVzaCgpXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzdWJtZXNoZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpYSA9IHN1Ym1lc2hlc1tpXTtcbiAgICAgICAgICAgIGxldCBtZXNoRGF0YSA9IHN1YkRhdGFzW2ldO1xuICAgICAgICAgICAgbGV0IG1hdGVyaWFsID0gbWF0ZXJpYWxzW2ldO1xuXG4gICAgICAgICAgICBpZiAobWVzaERhdGEuZW5hYmxlKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyZXIubWF0ZXJpYWwgPSBtYXRlcmlhbDtcbiAgICAgICAgICAgICAgICByZW5kZXJlci5jdWxsaW5nTWFzayA9IGNvbXAubm9kZS5fY3VsbGluZ01hc2s7XG4gICAgICAgICAgICAgICAgcmVuZGVyZXIubm9kZSA9IGNvbXAubm9kZTtcblxuICAgICAgICAgICAgICAgIHJlbmRlcmVyLl9mbHVzaElBKGlhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuT2JqZWN0LmFzc2lnbihQYXJ0aWNsZVN5c3RlbTNEQXNzZW1ibGVyLCB7IHV2OiBfdXZzIH0pO1xuXG5Bc3NlbWJsZXIucmVnaXN0ZXIoUGFydGljbGVTeXN0ZW0zRCwgUGFydGljbGVTeXN0ZW0zREFzc2VtYmxlcik7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==