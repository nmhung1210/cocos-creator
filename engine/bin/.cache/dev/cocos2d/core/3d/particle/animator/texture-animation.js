
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/animator/texture-animation.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _CCClassDecorator = require("../../../platform/CCClassDecorator");

var _CCEnum = _interopRequireDefault(require("../../../platform/CCEnum"));

var _valueTypes = require("../../../value-types");

var _curveRange = _interopRequireDefault(require("./curve-range"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// tslint:disable: max-line-length
var TEXTURE_ANIMATION_RAND_OFFSET = 90794;
/**
 * 粒子贴图动画类型
 * @enum textureAnimationModule.Mode
 */

var Mode = (0, _CCEnum["default"])({
  /**
   * 网格类型
   */
  Grid: 0
  /**
   * 精灵类型（暂未支持）
   */
  //Sprites: 1,

});
/**
 * 贴图动画的播放方式
 * @enum textureAnimationModule.Animation
 */

var Animation = (0, _CCEnum["default"])({
  /**
   * 播放贴图中的所有帧
   */
  WholeSheet: 0,

  /**
   * 播放贴图中的其中一行动画
   */
  SingleRow: 1
});
/**
 * !#en The texture animation module of 3d particle.
 * !#zh 3D 粒子的贴图动画模块
 * @class TextureAnimationModule
 */

var TextureAnimationModule = (_dec = (0, _CCClassDecorator.ccclass)('cc.TextureAnimationModule'), _dec2 = (0, _CCClassDecorator.property)({
  type: Mode
}), _dec3 = (0, _CCClassDecorator.property)({
  type: Animation
}), _dec4 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"]
}), _dec5 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function TextureAnimationModule() {
    _initializerDefineProperty(this, "_enable", _descriptor, this);

    _initializerDefineProperty(this, "_mode", _descriptor2, this);

    _initializerDefineProperty(this, "numTilesX", _descriptor3, this);

    _initializerDefineProperty(this, "numTilesY", _descriptor4, this);

    _initializerDefineProperty(this, "animation", _descriptor5, this);

    _initializerDefineProperty(this, "randomRow", _descriptor6, this);

    _initializerDefineProperty(this, "rowIndex", _descriptor7, this);

    _initializerDefineProperty(this, "frameOverTime", _descriptor8, this);

    _initializerDefineProperty(this, "startFrame", _descriptor9, this);

    _initializerDefineProperty(this, "cycleCount", _descriptor10, this);

    this._flipU = 0;
    this._flipV = 0;
    this._uvChannelMask = -1;
    this.ps = null;
  }

  var _proto = TextureAnimationModule.prototype;

  _proto.onInit = function onInit(ps) {
    this.ps = ps;
  };

  _proto.init = function init(p) {
    p.startRow = Math.floor(Math.random() * this.numTilesY);
  };

  _proto.animate = function animate(p) {
    var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
    var startFrame = this.startFrame.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) / (this.numTilesX * this.numTilesY);

    if (this.animation === Animation.WholeSheet) {
      p.frameIndex = (0, _valueTypes.repeat)(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1);
    } else if (this.animation === Animation.SingleRow) {
      var rowLength = 1 / this.numTilesY;

      if (this.randomRow) {
        var f = (0, _valueTypes.repeat)(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1);
        var from = p.startRow * rowLength;
        var to = from + rowLength;
        p.frameIndex = (0, _valueTypes.lerp)(from, to, f);
      } else {
        var _from = this.rowIndex * rowLength;

        var _to = _from + rowLength;

        p.frameIndex = (0, _valueTypes.lerp)(_from, _to, (0, _valueTypes.repeat)(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1));
      }
    }
  };

  _createClass(TextureAnimationModule, [{
    key: "enable",

    /**
     * !#en The enable of TextureAnimationModule.
     * !#zh 是否启用
     * @property {Boolean} enable
     */
    get: function get() {
      return this._enable;
    },
    set: function set(val) {
      this._enable = val;

      this.ps._assembler._updateMaterialParams();
    }
  }, {
    key: "mode",

    /**
     * !#en Set the type of particle map animation (only supports Grid mode for the time being)
     * !#zh 设定粒子贴图动画的类型（暂只支持 Grid 模式。
     * @property {Mode} mode
     */
    get: function get() {
      return this._mode;
    },
    set: function set(val) {
      if (val !== Mode.Grid) {
        console.error('particle texture animation\'s sprites is not supported!');
        return;
      }
    }
    /**
     * !#en Animation frames in X direction.
     * !#zh X 方向动画帧数。
     * @property {Number} numTilesX
     */

  }, {
    key: "flipU",
    get: function get() {
      return this._flipU;
    },
    set: function set(val) {
      console.error('particle texture animation\'s flipU is not supported!');
    }
  }, {
    key: "flipV",
    get: function get() {
      return this._flipV;
    },
    set: function set(val) {
      console.error('particle texture animation\'s flipV is not supported!');
    }
  }, {
    key: "uvChannelMask",
    get: function get() {
      return this._uvChannelMask;
    },
    set: function set(val) {
      console.error('particle texture animation\'s uvChannelMask is not supported!');
    }
  }]);

  return TextureAnimationModule;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "enable", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_mode", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Mode.Grid;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "mode"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "numTilesX", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "numTilesY", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "animation", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Animation.WholeSheet;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "randomRow", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "rowIndex", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "frameOverTime", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "startFrame", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "cycleCount", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "flipU", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "flipU"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "flipV", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "flipV"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uvChannelMask", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "uvChannelMask"), _class2.prototype)), _class2)) || _class);
exports["default"] = TextureAnimationModule;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL2FuaW1hdG9yL3RleHR1cmUtYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbIlRFWFRVUkVfQU5JTUFUSU9OX1JBTkRfT0ZGU0VUIiwiTW9kZSIsIkdyaWQiLCJBbmltYXRpb24iLCJXaG9sZVNoZWV0IiwiU2luZ2xlUm93IiwiVGV4dHVyZUFuaW1hdGlvbk1vZHVsZSIsInR5cGUiLCJDdXJ2ZVJhbmdlIiwiX2ZsaXBVIiwiX2ZsaXBWIiwiX3V2Q2hhbm5lbE1hc2siLCJwcyIsIm9uSW5pdCIsImluaXQiLCJwIiwic3RhcnRSb3ciLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJudW1UaWxlc1kiLCJhbmltYXRlIiwibm9ybWFsaXplZFRpbWUiLCJyZW1haW5pbmdMaWZldGltZSIsInN0YXJ0TGlmZXRpbWUiLCJzdGFydEZyYW1lIiwiZXZhbHVhdGUiLCJyYW5kb21TZWVkIiwibnVtVGlsZXNYIiwiYW5pbWF0aW9uIiwiZnJhbWVJbmRleCIsImN5Y2xlQ291bnQiLCJmcmFtZU92ZXJUaW1lIiwicm93TGVuZ3RoIiwicmFuZG9tUm93IiwiZiIsImZyb20iLCJ0byIsInJvd0luZGV4IiwiX2VuYWJsZSIsInZhbCIsIl9hc3NlbWJsZXIiLCJfdXBkYXRlTWF0ZXJpYWxQYXJhbXMiLCJfbW9kZSIsImNvbnNvbGUiLCJlcnJvciIsInByb3BlcnR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUNBLElBQU1BLDZCQUE2QixHQUFHLEtBQXRDO0FBRUE7Ozs7O0FBSUEsSUFBTUMsSUFBSSxHQUFHLHdCQUFLO0FBQ2Q7OztBQUdBQyxFQUFBQSxJQUFJLEVBQUU7QUFFTjs7O0FBR0E7O0FBVGMsQ0FBTCxDQUFiO0FBWUE7Ozs7O0FBSUEsSUFBTUMsU0FBUyxHQUFHLHdCQUFLO0FBQ25COzs7QUFHQUMsRUFBQUEsVUFBVSxF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Q0o7Ozs7O0FBNUtEOzs7Ozt3QkFNYztBQUNWLGFBQU8sS0FBS2MsT0FBWjtBQUNIO3NCQUVXQyxLQUFLO0FBQ2IsV0FBS0QsT0FBTCxHQUFlQyxHQUFmOztBQUNBLFdBQUs1QixFQUFMLENBQVE2QixVQUFSLENBQW1CQyxxQkFBbkI7QUFDSDs7OztBQUtEOzs7Ozt3QkFRWTtBQUNSLGFBQU8sS0FBS0MsS0FBWjtBQUNIO3NCQUVTSCxLQUFLO0FBQ1gsVUFBSUEsR0FBRyxLQUFLdkMsSUFBSSxDQUFDQyxJQUFqQixFQUF1QjtBQUNuQjBDLFFBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLHlEQUFkO0FBQ0E7QUFDSDtBQUNKO0FBRUQ7Ozs7Ozs7O3dCQTZFYTtBQUNULGFBQU8sS0FBS3BDLE1BQVo7QUFDSDtzQkFFVStCLEtBQUs7QUFDWkksTUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsdURBQWQ7QUFDSDs7O3dCQUtZO0FBQ1QsYUFBTyxLQUFLbkMsTUFBWjtBQUNIO3NCQUVVOEIsS0FBSztBQUNaSSxNQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyx1REFBZDtBQUNIOzs7d0JBS29CO0FBQ2pCLGFBQU8sS0FBS2xDLGNBQVo7QUFDSDtzQkFFa0I2QixLQUFLO0FBQ3BCSSxNQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYywrREFBZDtBQUNIOzs7O3FGQWpKQUM7Ozs7O1dBQ1M7OzREQU9UQSxxTEFVQUE7Ozs7O1dBQ083QyxJQUFJLENBQUNDOzs0TkEwQlo0Qzs7Ozs7V0FDVzs7OEVBT1hBOzs7OztXQUNXOzs7Ozs7O1dBVUEzQyxTQUFTLENBQUNDOzs4RUFTckIwQzs7Ozs7V0FDVzs7NkVBU1hBOzs7OztXQUNVOzs7Ozs7O1dBVUssSUFBSXRDLHNCQUFKOzs7Ozs7O1dBVUgsSUFBSUEsc0JBQUo7O2dGQU9ac0M7Ozs7O1dBQ1k7OzJEQUlaQSxxS0FXQUEsNktBV0FBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2NjbGFzcywgcHJvcGVydHkgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybS9DQ0NsYXNzRGVjb3JhdG9yJztcbmltcG9ydCBFbnVtIGZyb20gJy4uLy4uLy4uL3BsYXRmb3JtL0NDRW51bSc7XG5pbXBvcnQgeyBsZXJwLCBwc2V1ZG9SYW5kb20sIHJlcGVhdCB9IGZyb20gJy4uLy4uLy4uL3ZhbHVlLXR5cGVzJztcbmltcG9ydCBDdXJ2ZVJhbmdlIGZyb20gJy4vY3VydmUtcmFuZ2UnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTogbWF4LWxpbmUtbGVuZ3RoXG5jb25zdCBURVhUVVJFX0FOSU1BVElPTl9SQU5EX09GRlNFVCA9IDkwNzk0O1xuXG4vKipcbiAqIOeykuWtkOi0tOWbvuWKqOeUu+exu+Wei1xuICogQGVudW0gdGV4dHVyZUFuaW1hdGlvbk1vZHVsZS5Nb2RlXG4gKi9cbmNvbnN0IE1vZGUgPSBFbnVtKHtcbiAgICAvKipcbiAgICAgKiDnvZHmoLznsbvlnotcbiAgICAgKi9cbiAgICBHcmlkOiAwLFxuXG4gICAgLyoqXG4gICAgICog57K+54G157G75Z6L77yI5pqC5pyq5pSv5oyB77yJXG4gICAgICovXG4gICAgLy9TcHJpdGVzOiAxLFxufSk7XG5cbi8qKlxuICog6LS05Zu+5Yqo55S755qE5pKt5pS+5pa55byPXG4gKiBAZW51bSB0ZXh0dXJlQW5pbWF0aW9uTW9kdWxlLkFuaW1hdGlvblxuICovXG5jb25zdCBBbmltYXRpb24gPSBFbnVtKHtcbiAgICAvKipcbiAgICAgKiDmkq3mlL7otLTlm77kuK3nmoTmiYDmnInluKdcbiAgICAgKi9cbiAgICBXaG9sZVNoZWV0OiAwLFxuXG4gICAgLyoqXG4gICAgICog5pKt5pS+6LS05Zu+5Lit55qE5YW25Lit5LiA6KGM5Yqo55S7XG4gICAgICovXG4gICAgU2luZ2xlUm93OiAxLFxufSk7XG5cbi8qKlxuICogISNlbiBUaGUgdGV4dHVyZSBhbmltYXRpb24gbW9kdWxlIG9mIDNkIHBhcnRpY2xlLlxuICogISN6aCAzRCDnspLlrZDnmoTotLTlm77liqjnlLvmqKHlnZdcbiAqIEBjbGFzcyBUZXh0dXJlQW5pbWF0aW9uTW9kdWxlXG4gKi9cbkBjY2NsYXNzKCdjYy5UZXh0dXJlQW5pbWF0aW9uTW9kdWxlJylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHR1cmVBbmltYXRpb25Nb2R1bGUge1xuXG4gICAgQHByb3BlcnR5XG4gICAgX2VuYWJsZSA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZW5hYmxlIG9mIFRleHR1cmVBbmltYXRpb25Nb2R1bGUuXG4gICAgICogISN6aCDmmK/lkKblkK/nlKhcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIGdldCBlbmFibGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlO1xuICAgIH1cblxuICAgIHNldCBlbmFibGUgKHZhbCkge1xuICAgICAgICB0aGlzLl9lbmFibGUgPSB2YWw7XG4gICAgICAgIHRoaXMucHMuX2Fzc2VtYmxlci5fdXBkYXRlTWF0ZXJpYWxQYXJhbXMoKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBfbW9kZSA9IE1vZGUuR3JpZDtcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHRoZSB0eXBlIG9mIHBhcnRpY2xlIG1hcCBhbmltYXRpb24gKG9ubHkgc3VwcG9ydHMgR3JpZCBtb2RlIGZvciB0aGUgdGltZSBiZWluZylcbiAgICAgKiAhI3poIOiuvuWumueykuWtkOi0tOWbvuWKqOeUu+eahOexu+Wei++8iOaaguWPquaUr+aMgSBHcmlkIOaooeW8j+OAglxuICAgICAqIEBwcm9wZXJ0eSB7TW9kZX0gbW9kZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IE1vZGUsXG4gICAgfSlcbiAgICBnZXQgbW9kZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlO1xuICAgIH1cblxuICAgIHNldCBtb2RlICh2YWwpIHtcbiAgICAgICAgaWYgKHZhbCAhPT0gTW9kZS5HcmlkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdwYXJ0aWNsZSB0ZXh0dXJlIGFuaW1hdGlvblxcJ3Mgc3ByaXRlcyBpcyBub3Qgc3VwcG9ydGVkIScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBBbmltYXRpb24gZnJhbWVzIGluIFggZGlyZWN0aW9uLlxuICAgICAqICEjemggWCDmlrnlkJHliqjnlLvluKfmlbDjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbnVtVGlsZXNYXG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgbnVtVGlsZXNYID0gMDtcblxuICAgIC8qKlxuICAgICAqICEjZW4gQW5pbWF0aW9uIGZyYW1lcyBpbiBZIGRpcmVjdGlvbi5cbiAgICAgKiAhI3poIFkg5pa55ZCR5Yqo55S75bin5pWw44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG51bVRpbGVzWVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIG51bVRpbGVzWSA9IDA7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSB3YXkgb2YgdGhlIGFuaW1hdGlvbiBwbGF5cy5cbiAgICAgKiAhI3poIOWKqOeUu+aSreaUvuaWueW8j+OAglxuICAgICAqIEBwcm9wZXJ0eSB7QW5pbWF0aW9ufSBhbmltYXRpb25cbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBBbmltYXRpb24sXG4gICAgfSlcbiAgICBhbmltYXRpb24gPSBBbmltYXRpb24uV2hvbGVTaGVldDtcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmFuZG9tbHkgc2VsZWN0IGEgbGluZSBmcm9tIHRoZSBhbmltYXRlZCBtYXAgdG8gZ2VuZXJhdGUgdGhlIGFuaW1hdGlvbi4gPGJyPlxuwqDCoMKgwqDCoCogVGhpcyBvcHRpb24gb25seSB0YWtlcyBlZmZlY3Qgd2hlbiB0aGUgYW5pbWF0aW9uIHBsYXliYWNrIG1vZGUgaXMgU2luZ2xlUm93LlxuICAgICAqICEjemgg6ZqP5py65LuO5Yqo55S76LS05Zu+5Lit6YCJ5oup5LiA6KGM5Lul55Sf5oiQ5Yqo55S744CCPGJyPlxuICAgICAqIOatpOmAiemhueS7heWcqOWKqOeUu+aSreaUvuaWueW8j+S4uiBTaW5nbGVSb3cg5pe255Sf5pWI44CCXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSByYW5kb21Sb3dcbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICByYW5kb21Sb3cgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2VsZWN0IHNwZWNpZmljIGxpbmVzIGZyb20gdGhlIGFuaW1hdGlvbiBtYXAgdG8gZ2VuZXJhdGUgdGhlIGFuaW1hdGlvbi4gPGJyPlxuwqDCoMKgwqDCoCogVGhpcyBvcHRpb24gaXMgb25seSBhdmFpbGFibGUgd2hlbiB0aGUgYW5pbWF0aW9uIHBsYXliYWNrIG1vZGUgaXMgU2luZ2xlUm93IGFuZCByYW5kb21Sb3cgaXMgZGlzYWJsZWQuXG4gICAgICogISN6aCDku47liqjnlLvotLTlm77kuK3pgInmi6nnibnlrprooYzku6XnlJ/miJDliqjnlLvjgII8YnI+XG4gICAgICog5q2k6YCJ6aG55LuF5Zyo5Yqo55S75pKt5pS+5pa55byP5Li6IFNpbmdsZVJvdyDml7bkuJTnpoHnlKggcmFuZG9tUm93IOaXtuWPr+eUqOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByb3dJbmRleFxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIHJvd0luZGV4ID0gMDtcblxuICAgIC8qKlxuICAgICAqICEjZW4gRnJhbWUgYW5kIHRpbWUgY3VydmUgb2YgYW5pbWF0aW9uIHBsYXliYWNrIGluIG9uZSBjeWNsZS5cbiAgICAgKiAhI3poIOS4gOS4quWRqOacn+WGheWKqOeUu+aSreaUvueahOW4p+S4juaXtumXtOWPmOWMluabsue6v+OAglxuICAgICAqIEBwcm9wZXJ0eSB7Q3VydmVSYW5nZX0gZnJhbWVPdmVyVGltZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IEN1cnZlUmFuZ2UsXG4gICAgfSlcbiAgICBmcmFtZU92ZXJUaW1lID0gbmV3IEN1cnZlUmFuZ2UoKTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGxheSBmcm9tIHdoaWNoIGZyYW1lcywgdGhlIHRpbWUgaXMgdGhlIGxpZmUgY3ljbGUgb2YgdGhlIGVudGlyZSBwYXJ0aWNsZSBzeXN0ZW0uXG4gICAgICogISN6aCDku47nrKzlh6DluKflvIDlp4vmkq3mlL7vvIzml7bpl7TkuLrmlbTkuKrnspLlrZDns7vnu5/nmoTnlJ/lkb3lkajmnJ/jgIJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IHN0YXJ0RnJhbWVcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxuICAgIH0pXG4gICAgc3RhcnRGcmFtZSA9IG5ldyBDdXJ2ZVJhbmdlKCk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIE51bWJlciBvZiBwbGF5YmFjayBsb29wcyBpbiBhIGxpZmUgY3ljbGUuXG4gICAgICogISN6aCDkuIDkuKrnlJ/lkb3lkajmnJ/lhoXmkq3mlL7lvqrnjq/nmoTmrKHmlbDjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gY3ljbGVDb3VudFxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIGN5Y2xlQ291bnQgPSAwO1xuICAgIFxuICAgIF9mbGlwVSA9IDA7XG5cbiAgICBAcHJvcGVydHlcbiAgICBnZXQgZmxpcFUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmxpcFU7XG4gICAgfVxuXG4gICAgc2V0IGZsaXBVICh2YWwpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcigncGFydGljbGUgdGV4dHVyZSBhbmltYXRpb25cXCdzIGZsaXBVIGlzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gICAgfVxuXG4gICAgX2ZsaXBWID0gMDtcblxuICAgIEBwcm9wZXJ0eVxuICAgIGdldCBmbGlwViAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mbGlwVjtcbiAgICB9XG5cbiAgICBzZXQgZmxpcFYgKHZhbCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdwYXJ0aWNsZSB0ZXh0dXJlIGFuaW1hdGlvblxcJ3MgZmxpcFYgaXMgbm90IHN1cHBvcnRlZCEnKTtcbiAgICB9XG5cbiAgICBfdXZDaGFubmVsTWFzayA9IC0xO1xuXG4gICAgQHByb3BlcnR5XG4gICAgZ2V0IHV2Q2hhbm5lbE1hc2sgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXZDaGFubmVsTWFzaztcbiAgICB9XG5cbiAgICBzZXQgdXZDaGFubmVsTWFzayAodmFsKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3BhcnRpY2xlIHRleHR1cmUgYW5pbWF0aW9uXFwncyB1dkNoYW5uZWxNYXNrIGlzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gICAgfVxuXG4gICAgcHMgPSBudWxsO1xuXG4gICAgb25Jbml0IChwcykge1xuICAgICAgICB0aGlzLnBzID0gcHM7XG4gICAgfVxuXG4gICAgaW5pdCAocCkge1xuICAgICAgICBwLnN0YXJ0Um93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5udW1UaWxlc1kpO1xuICAgIH1cblxuICAgIGFuaW1hdGUgKHApIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFRpbWUgPSAxIC0gcC5yZW1haW5pbmdMaWZldGltZSAvIHAuc3RhcnRMaWZldGltZTtcbiAgICAgICAgY29uc3Qgc3RhcnRGcmFtZSA9IHRoaXMuc3RhcnRGcmFtZS5ldmFsdWF0ZShub3JtYWxpemVkVGltZSwgcHNldWRvUmFuZG9tKHAucmFuZG9tU2VlZCArIFRFWFRVUkVfQU5JTUFUSU9OX1JBTkRfT0ZGU0VUKSkgLyAodGhpcy5udW1UaWxlc1ggKiB0aGlzLm51bVRpbGVzWSk7XG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbiA9PT0gQW5pbWF0aW9uLldob2xlU2hlZXQpIHtcbiAgICAgICAgICAgIHAuZnJhbWVJbmRleCA9IHJlcGVhdCh0aGlzLmN5Y2xlQ291bnQgKiAodGhpcy5mcmFtZU92ZXJUaW1lLmV2YWx1YXRlKG5vcm1hbGl6ZWRUaW1lLCBwc2V1ZG9SYW5kb20ocC5yYW5kb21TZWVkICsgVEVYVFVSRV9BTklNQVRJT05fUkFORF9PRkZTRVQpKSArIHN0YXJ0RnJhbWUpLCAxKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFuaW1hdGlvbiA9PT0gQW5pbWF0aW9uLlNpbmdsZVJvdykge1xuICAgICAgICAgICAgY29uc3Qgcm93TGVuZ3RoID0gMSAvIHRoaXMubnVtVGlsZXNZO1xuICAgICAgICAgICAgaWYgKHRoaXMucmFuZG9tUm93KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZiA9IHJlcGVhdCh0aGlzLmN5Y2xlQ291bnQgKiAodGhpcy5mcmFtZU92ZXJUaW1lLmV2YWx1YXRlKG5vcm1hbGl6ZWRUaW1lLCBwc2V1ZG9SYW5kb20ocC5yYW5kb21TZWVkICsgVEVYVFVSRV9BTklNQVRJT05fUkFORF9PRkZTRVQpKSArIHN0YXJ0RnJhbWUpLCAxKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmcm9tID0gcC5zdGFydFJvdyAqIHJvd0xlbmd0aDtcbiAgICAgICAgICAgICAgICBjb25zdCB0byA9IGZyb20gKyByb3dMZW5ndGg7XG4gICAgICAgICAgICAgICAgcC5mcmFtZUluZGV4ID0gbGVycChmcm9tLCB0bywgZik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZyb20gPSB0aGlzLnJvd0luZGV4ICogcm93TGVuZ3RoO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvID0gZnJvbSArIHJvd0xlbmd0aDtcbiAgICAgICAgICAgICAgICBwLmZyYW1lSW5kZXggPSBsZXJwKGZyb20sIHRvLCByZXBlYXQodGhpcy5jeWNsZUNvdW50ICogKHRoaXMuZnJhbWVPdmVyVGltZS5ldmFsdWF0ZShub3JtYWxpemVkVGltZSwgcHNldWRvUmFuZG9tKHAucmFuZG9tU2VlZCArIFRFWFRVUkVfQU5JTUFUSU9OX1JBTkRfT0ZGU0VUKSkgKyBzdGFydEZyYW1lKSwgMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=