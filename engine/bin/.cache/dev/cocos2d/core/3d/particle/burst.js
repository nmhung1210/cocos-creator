
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/burst.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _CCClassDecorator = require("../../platform/CCClassDecorator");

var _valueTypes = require("../../value-types");

var _curveRange = _interopRequireDefault(require("./animator/curve-range"));

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Burst = (
/**
 * !#en The burst of 3d particle.
 * !#zh 3D 粒子发射时的爆发个数
 * @class Burst
 */
_dec = (0, _CCClassDecorator.ccclass)('cc.Burst'), _dec2 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  _createClass(Burst, [{
    key: "time",

    /**
     * !#en Time between the start of the particle system and the trigger of this Brust
     * !#zh 粒子系统开始运行到触发此次 Brust 的时间
     * @property {Number} time
     */
    get: function get() {
      return this._time;
    },
    set: function set(val) {
      this._time = val;
      this._curTime = val;
    }
    /**
     * !#en Minimum number of emitted particles
     * !#zh 发射粒子的最小数量
     * @property {Number} minCount
     */

  }, {
    key: "repeatCount",

    /**
     * !#en The number of times Burst was triggered.
     * !#zh Burst 的触发次数
     * @property {Number} repeatCount
     */
    get: function get() {
      return this._repeatCount;
    },
    set: function set(val) {
      this._repeatCount = val;
      this._remainingCount = val;
    }
    /**
     * !#en Interval of each trigger
     * !#zh 每次触发的间隔时间
     * @property {Number} repeatInterval
     */

  }]);

  function Burst() {
    _initializerDefineProperty(this, "_time", _descriptor, this);

    _initializerDefineProperty(this, "minCount", _descriptor2, this);

    _initializerDefineProperty(this, "maxCount", _descriptor3, this);

    _initializerDefineProperty(this, "_repeatCount", _descriptor4, this);

    _initializerDefineProperty(this, "repeatInterval", _descriptor5, this);

    _initializerDefineProperty(this, "count", _descriptor6, this);

    this._remainingCount = 0;
    this._curTime = 0;
    this._remainingCount = 0;
    this._curTime = 0.0;
  }

  var _proto = Burst.prototype;

  _proto.update = function update(psys, dt) {
    if (this._remainingCount === 0) {
      this._remainingCount = this._repeatCount;
      this._curTime = this._time;
    }

    if (this._remainingCount > 0) {
      var preFrameTime = (0, _valueTypes.repeat)(psys._time - psys.startDelay.evaluate(0, 1), psys.duration) - dt;
      preFrameTime = preFrameTime > 0.0 ? preFrameTime : 0.0;
      var curFrameTime = (0, _valueTypes.repeat)(psys.time - psys.startDelay.evaluate(0, 1), psys.duration);

      if (this._curTime >= preFrameTime && this._curTime < curFrameTime) {
        psys.emit(this.count.evaluate(this._curTime / psys.duration, 1), dt - (curFrameTime - this._curTime));
        this._curTime += this.repeatInterval;
        --this._remainingCount;
      }
    }
  };

  _proto.getMaxCount = function getMaxCount(psys) {
    return this.count.getMax() * Math.min(Math.ceil(psys.duration / this.repeatInterval), this.repeatCount);
  };

  return Burst;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_time", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "time", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "time"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "minCount", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 30;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "maxCount", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 30;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_repeatCount", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "repeatCount", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "repeatCount"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "repeatInterval", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "count", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
})), _class2)) || _class);
exports["default"] = Burst;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL2J1cnN0LnRzIl0sIm5hbWVzIjpbIkJ1cnN0IiwidHlwZSIsIkN1cnZlUmFuZ2UiLCJfdGltZSIsInZhbCIsIl9jdXJUaW1lIiwiX3JlcGVhdENvdW50IiwiX3JlbWFpbmluZ0NvdW50IiwidXBkYXRlIiwicHN5cyIsImR0IiwicHJlRnJhbWVUaW1lIiwic3RhcnREZWxheSIsImV2YWx1YXRlIiwiZHVyYXRpb24iLCJjdXJGcmFtZVRpbWUiLCJ0aW1lIiwiZW1pdCIsImNvdW50IiwicmVwZWF0SW50ZXJ2YWwiLCJnZXRNYXhDb3VudCIsImdldE1heCIsIk1hdGgiLCJtaW4iLCJjZWlsIiwicmVwZWF0Q291bnQiLCJwcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBUXFCQTtBQU5yQjs7Ozs7T0FLQywrQkFBUSxVQUFSLFdBb0VJLGdDQUFTO0FBQ05DLEVBQUFBLElBQUksRUFBRUM7QUFEQSxDQUFUOzs7O0FBOUREOzs7Ozt3QkFNWTtBQUNSLGFBQU8sS0FBS0MsS0FBWjtBQUNIO3NCQUVTQyxLQUFLO0FBQ1gsV0FBS0QsS0FBTCxHQUFhQyxHQUFiO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQkQsR0FBaEI7QUFDSDtBQUVEOzs7Ozs7Ozs7QUFtQkE7Ozs7O3dCQU1tQjtBQUNmLGFBQU8sS0FBS0UsWUFBWjtBQUNIO3NCQUVnQkYsS0FBSztBQUNsQixXQUFLRSxZQUFMLEdBQW9CRixHQUFwQjtBQUNBLFdBQUtHLGVBQUwsR0FBdUJILEdBQXZCO0FBQ0g7QUFFRDs7Ozs7Ozs7QUFxQkEsbUJBQWU7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQSxTQUhmRyxlQUdlLEdBSEcsQ0FHSDtBQUFBLFNBRmZGLFFBRWUsR0FGSixDQUVJO0FBQ1gsU0FBS0UsZUFBTCxHQUF1QixDQUF2QjtBQUNBLFNBQUtGLFFBQUwsR0FBZ0IsR0FBaEI7QUFDSDs7OztTQUVERyxTQUFBLGdCQUFRQyxJQUFSLEVBQWNDLEVBQWQsRUFBa0I7QUFDZCxRQUFJLEtBQUtILGVBQUwsS0FBeUIsQ0FBN0IsRUFBZ0M7QUFDNUIsV0FBS0EsZUFBTCxHQUF1QixLQUFLRCxZQUE1QjtBQUNBLFdBQUtELFFBQUwsR0FBZ0IsS0FBS0YsS0FBckI7QUFDSDs7QUFDRCxRQUFJLEtBQUtJLGVBQUwsR0FBdUIsQ0FBM0IsRUFBOEI7QUFDMUIsVUFBSUksWUFBWSxHQUFHLHdCQUFPRixJQUFJLENBQUNOLEtBQUwsR0FBYU0sSUFBSSxDQUFDRyxVQUFMLENBQWdCQyxRQUFoQixDQUF5QixDQUF6QixFQUE0QixDQUE1QixDQUFwQixFQUFvREosSUFBSSxDQUFDSyxRQUF6RCxJQUFxRUosRUFBeEY7QUFDQUMsTUFBQUEsWUFBWSxHQUFJQSxZQUFZLEdBQUcsR0FBaEIsR0FBdUJBLFlBQXZCLEdBQXNDLEdBQXJEO0FBQ0EsVUFBTUksWUFBWSxHQUFHLHdCQUFPTixJQUFJLENBQUNPLElBQUwsR0FBWVAsSUFBSSxDQUFDRyxVQUFMLENBQWdCQyxRQUFoQixDQUF5QixDQUF6QixFQUE0QixDQUE1QixDQUFuQixFQUFtREosSUFBSSxDQUFDSyxRQUF4RCxDQUFyQjs7QUFDQSxVQUFJLEtBQUtULFFBQUwsSUFBaUJNLFlBQWpCLElBQWlDLEtBQUtOLFFBQUwsR0FBZ0JVLFlBQXJELEVBQW1FO0FBQy9ETixRQUFBQSxJQUFJLENBQUNRLElBQUwsQ0FBVSxLQUFLQyxLQUFMLENBQVdMLFFBQVgsQ0FBb0IsS0FBS1IsUUFBTCxHQUFnQkksSUFBSSxDQUFDSyxRQUF6QyxFQUFtRCxDQUFuRCxDQUFWLEVBQWlFSixFQUFFLElBQUlLLFlBQVksR0FBRyxLQUFLVixRQUF4QixDQUFuRTtBQUNBLGFBQUtBLFFBQUwsSUFBaUIsS0FBS2MsY0FBdEI7QUFDQSxVQUFFLEtBQUtaLGVBQVA7QUFDSDtBQUNKO0FBQ0o7O1NBRURhLGNBQUEscUJBQWFYLElBQWIsRUFBbUI7QUFDZixXQUFPLEtBQUtTLEtBQUwsQ0FBV0csTUFBWCxLQUFzQkMsSUFBSSxDQUFDQyxHQUFMLENBQVNELElBQUksQ0FBQ0UsSUFBTCxDQUFVZixJQUFJLENBQUNLLFFBQUwsR0FBZ0IsS0FBS0ssY0FBL0IsQ0FBVCxFQUF5RCxLQUFLTSxXQUE5RCxDQUE3QjtBQUNIOzs7bUZBakdBQzs7Ozs7V0FDTzs7MERBT1BBLHNMQWVBQTs7Ozs7V0FDVTs7NkVBT1ZBOzs7OztXQUNVOztpRkFFVkE7Ozs7O1dBQ2M7O2lFQU9kQSxtTUFlQUE7Ozs7O1dBQ2dCOzs7Ozs7O1dBVVQsSUFBSXhCLHNCQUFKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2NjbGFzcywgcHJvcGVydHkgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9DQ0NsYXNzRGVjb3JhdG9yJztcbmltcG9ydCB7IHJlcGVhdCB9IGZyb20gJy4uLy4uL3ZhbHVlLXR5cGVzJztcbmltcG9ydCBDdXJ2ZVJhbmdlIGZyb20gJy4vYW5pbWF0b3IvY3VydmUtcmFuZ2UnO1xuXG4vKipcbiAqICEjZW4gVGhlIGJ1cnN0IG9mIDNkIHBhcnRpY2xlLlxuICogISN6aCAzRCDnspLlrZDlj5HlsITml7bnmoTniIblj5HkuKrmlbBcbiAqIEBjbGFzcyBCdXJzdFxuICovXG5AY2NjbGFzcygnY2MuQnVyc3QnKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVyc3Qge1xuXG4gICAgQHByb3BlcnR5XG4gICAgX3RpbWUgPSAwO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBUaW1lIGJldHdlZW4gdGhlIHN0YXJ0IG9mIHRoZSBwYXJ0aWNsZSBzeXN0ZW0gYW5kIHRoZSB0cmlnZ2VyIG9mIHRoaXMgQnJ1c3RcbiAgICAgKiAhI3poIOeykuWtkOezu+e7n+W8gOWni+i/kOihjOWIsOinpuWPkeatpOasoSBCcnVzdCDnmoTml7bpl7RcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdGltZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIGdldCB0aW1lICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWU7XG4gICAgfVxuXG4gICAgc2V0IHRpbWUgKHZhbCkge1xuICAgICAgICB0aGlzLl90aW1lID0gdmFsO1xuICAgICAgICB0aGlzLl9jdXJUaW1lID0gdmFsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gTWluaW11bSBudW1iZXIgb2YgZW1pdHRlZCBwYXJ0aWNsZXNcbiAgICAgKiAhI3poIOWPkeWwhOeykuWtkOeahOacgOWwj+aVsOmHj1xuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBtaW5Db3VudFxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIG1pbkNvdW50ID0gMzA7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIE1heGltdW0gbnVtYmVyIG9mIGVtaXR0ZWQgcGFydGljbGVzXG4gICAgICogISN6aCDlj5HlsITnspLlrZDnmoTmnIDlpKfmlbDph49cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbWF4Q291bnRcbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBtYXhDb3VudCA9IDMwO1xuXG4gICAgQHByb3BlcnR5XG4gICAgX3JlcGVhdENvdW50ID0gMTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIG51bWJlciBvZiB0aW1lcyBCdXJzdCB3YXMgdHJpZ2dlcmVkLlxuICAgICAqICEjemggQnVyc3Qg55qE6Kem5Y+R5qyh5pWwXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJlcGVhdENvdW50XG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgZ2V0IHJlcGVhdENvdW50ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcGVhdENvdW50O1xuICAgIH1cblxuICAgIHNldCByZXBlYXRDb3VudCAodmFsKSB7XG4gICAgICAgIHRoaXMuX3JlcGVhdENvdW50ID0gdmFsO1xuICAgICAgICB0aGlzLl9yZW1haW5pbmdDb3VudCA9IHZhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEludGVydmFsIG9mIGVhY2ggdHJpZ2dlclxuICAgICAqICEjemgg5q+P5qyh6Kem5Y+R55qE6Ze06ZqU5pe26Ze0XG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJlcGVhdEludGVydmFsXG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgcmVwZWF0SW50ZXJ2YWwgPSAxO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBOdW1iZXIgb2YgcGFydGljbGVzIGVtaXR0ZWRcbiAgICAgKiAhI3poIOWPkeWwhOeahOeykuWtkOeahOaVsOmHj1xuICAgICAqIEBwcm9wZXJ0eSB7Q3VydmVSYW5nZX0gY291bnRcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxuICAgIH0pXG4gICAgY291bnQgPSBuZXcgQ3VydmVSYW5nZSgpO1xuXG4gICAgX3JlbWFpbmluZ0NvdW50ID0gMDtcbiAgICBfY3VyVGltZSA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMuX3JlbWFpbmluZ0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fY3VyVGltZSA9IDAuMDtcbiAgICB9XG5cbiAgICB1cGRhdGUgKHBzeXMsIGR0KSB7XG4gICAgICAgIGlmICh0aGlzLl9yZW1haW5pbmdDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fcmVtYWluaW5nQ291bnQgPSB0aGlzLl9yZXBlYXRDb3VudDtcbiAgICAgICAgICAgIHRoaXMuX2N1clRpbWUgPSB0aGlzLl90aW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9yZW1haW5pbmdDb3VudCA+IDApIHtcbiAgICAgICAgICAgIGxldCBwcmVGcmFtZVRpbWUgPSByZXBlYXQocHN5cy5fdGltZSAtIHBzeXMuc3RhcnREZWxheS5ldmFsdWF0ZSgwLCAxKSwgcHN5cy5kdXJhdGlvbikgLSBkdDtcbiAgICAgICAgICAgIHByZUZyYW1lVGltZSA9IChwcmVGcmFtZVRpbWUgPiAwLjApID8gcHJlRnJhbWVUaW1lIDogMC4wO1xuICAgICAgICAgICAgY29uc3QgY3VyRnJhbWVUaW1lID0gcmVwZWF0KHBzeXMudGltZSAtIHBzeXMuc3RhcnREZWxheS5ldmFsdWF0ZSgwLCAxKSwgcHN5cy5kdXJhdGlvbik7XG4gICAgICAgICAgICBpZiAodGhpcy5fY3VyVGltZSA+PSBwcmVGcmFtZVRpbWUgJiYgdGhpcy5fY3VyVGltZSA8IGN1ckZyYW1lVGltZSkge1xuICAgICAgICAgICAgICAgIHBzeXMuZW1pdCh0aGlzLmNvdW50LmV2YWx1YXRlKHRoaXMuX2N1clRpbWUgLyBwc3lzLmR1cmF0aW9uLCAxKSwgZHQgLSAoY3VyRnJhbWVUaW1lIC0gdGhpcy5fY3VyVGltZSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1clRpbWUgKz0gdGhpcy5yZXBlYXRJbnRlcnZhbDtcbiAgICAgICAgICAgICAgICAtLXRoaXMuX3JlbWFpbmluZ0NvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TWF4Q291bnQgKHBzeXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY291bnQuZ2V0TWF4KCkgKiBNYXRoLm1pbihNYXRoLmNlaWwocHN5cy5kdXJhdGlvbiAvIHRoaXMucmVwZWF0SW50ZXJ2YWwpLCB0aGlzLnJlcGVhdENvdW50KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==