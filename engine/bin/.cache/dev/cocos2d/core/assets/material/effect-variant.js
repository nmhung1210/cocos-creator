
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/material/effect-variant.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _murmurhash2_gc = _interopRequireDefault(require("../../../renderer/murmurhash2_gc"));

var _utils = _interopRequireDefault(require("./utils"));

var _effectBase = _interopRequireDefault(require("./effect-base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var gfx = cc.gfx;

var EffectVariant = /*#__PURE__*/function (_EffectBase) {
  _inheritsLoose(EffectVariant, _EffectBase);

  _createClass(EffectVariant, [{
    key: "effect",
    get: function get() {
      return this._effect;
    }
  }, {
    key: "name",
    get: function get() {
      return this._effect && this._effect.name + ' (variant)';
    }
  }, {
    key: "passes",
    get: function get() {
      return this._passes;
    }
  }, {
    key: "stagePasses",
    get: function get() {
      return this._stagePasses;
    }
  }]);

  function EffectVariant(effect) {
    var _this;

    _this = _EffectBase.call(this) || this;
    _this._effect = void 0;
    _this._passes = [];
    _this._stagePasses = {};
    _this._hash = 0;

    _this.init(effect);

    return _this;
  }

  var _proto = EffectVariant.prototype;

  _proto._onEffectChanged = function _onEffectChanged() {};

  _proto.init = function init(effect) {
    if (effect instanceof EffectVariant) {
      effect = effect.effect;
    }

    this._effect = effect;
    this._dirty = true;

    if (effect) {
      var passes = effect.passes;
      var variantPasses = this._passes;
      variantPasses.length = 0;
      var stagePasses = this._stagePasses = {};

      for (var i = 0; i < passes.length; i++) {
        var variant = variantPasses[i] = Object.setPrototypeOf({}, passes[i]);
        variant._properties = Object.setPrototypeOf({}, passes[i]._properties);
        variant._defines = Object.setPrototypeOf({}, passes[i]._defines);

        if (!stagePasses[variant._stage]) {
          stagePasses[variant._stage] = [];
        }

        stagePasses[variant._stage].push(variant);
      }
    }
  };

  _proto.updateHash = function updateHash(hash) {};

  _proto.getHash = function getHash() {
    if (!this._dirty) return this._hash;
    this._dirty = false;
    var hash = '';
    hash += _utils["default"].serializePasses(this._passes);
    var effect = this._effect;

    if (effect) {
      hash += _utils["default"].serializePasses(effect.passes);
    }

    this._hash = (0, _murmurhash2_gc["default"])(hash, 666);
    this.updateHash(this._hash);
    return this._hash;
  };

  return EffectVariant;
}(_effectBase["default"]);

exports["default"] = EffectVariant;
cc.EffectVariant = EffectVariant;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9tYXRlcmlhbC9lZmZlY3QtdmFyaWFudC50cyJdLCJuYW1lcyI6WyJnZngiLCJjYyIsIkVmZmVjdFZhcmlhbnQiLCJfZWZmZWN0IiwibmFtZSIsIl9wYXNzZXMiLCJfc3RhZ2VQYXNzZXMiLCJlZmZlY3QiLCJfaGFzaCIsImluaXQiLCJfb25FZmZlY3RDaGFuZ2VkIiwiX2RpcnR5IiwicGFzc2VzIiwidmFyaWFudFBhc3NlcyIsImxlbmd0aCIsInN0YWdlUGFzc2VzIiwiaSIsInZhcmlhbnQiLCJPYmplY3QiLCJzZXRQcm90b3R5cGVPZiIsIl9wcm9wZXJ0aWVzIiwiX2RlZmluZXMiLCJfc3RhZ2UiLCJwdXNoIiwidXBkYXRlSGFzaCIsImhhc2giLCJnZXRIYXNoIiwidXRpbHMiLCJzZXJpYWxpemVQYXNzZXMiLCJFZmZlY3RCYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBR0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxHQUFHLEdBQUdDLEVBQUUsQ0FBQ0QsR0FBZjs7SUFFcUJFOzs7Ozt3QkFNSDtBQUNWLGFBQU8sS0FBS0MsT0FBWjtBQUNIOzs7d0JBRVc7QUFDUixhQUFPLEtBQUtBLE9BQUwsSUFBaUIsS0FBS0EsT0FBTCxDQUFhQyxJQUFiLEdBQW9CLFlBQTVDO0FBQ0g7Ozt3QkFFYTtBQUNWLGFBQU8sS0FBS0MsT0FBWjtBQUNIOzs7d0JBRWtCO0FBQ2YsYUFBTyxLQUFLQyxZQUFaO0FBQ0g7OztBQUVELHlCQUFhQyxNQUFiLEVBQTZCO0FBQUE7O0FBQ3pCO0FBRHlCLFVBckI3QkosT0FxQjZCO0FBQUEsVUFwQjdCRSxPQW9CNkIsR0FwQlgsRUFvQlc7QUFBQSxVQW5CN0JDLFlBbUI2QixHQW5CZCxFQW1CYztBQUFBLFVBbEI3QkUsS0FrQjZCLEdBbEJyQixDQWtCcUI7O0FBRXpCLFVBQUtDLElBQUwsQ0FBVUYsTUFBVjs7QUFGeUI7QUFHNUI7Ozs7U0FFREcsbUJBQUEsNEJBQW9CLENBQ25COztTQUVERCxPQUFBLGNBQU1GLE1BQU4sRUFBc0I7QUFDbEIsUUFBSUEsTUFBTSxZQUFZTCxhQUF0QixFQUFxQztBQUNqQ0ssTUFBQUEsTUFBTSxHQUFHQSxNQUFNLENBQUNBLE1BQWhCO0FBQ0g7O0FBRUQsU0FBS0osT0FBTCxHQUFlSSxNQUFmO0FBQ0EsU0FBS0ksTUFBTCxHQUFjLElBQWQ7O0FBRUEsUUFBSUosTUFBSixFQUFZO0FBQ1IsVUFBSUssTUFBTSxHQUFHTCxNQUFNLENBQUNLLE1BQXBCO0FBQ0EsVUFBSUMsYUFBYSxHQUFHLEtBQUtSLE9BQXpCO0FBQ0FRLE1BQUFBLGFBQWEsQ0FBQ0MsTUFBZCxHQUF1QixDQUF2QjtBQUNBLFVBQUlDLFdBQVcsR0FBRyxLQUFLVCxZQUFMLEdBQW9CLEVBQXRDOztBQUNBLFdBQUssSUFBSVUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0osTUFBTSxDQUFDRSxNQUEzQixFQUFtQ0UsQ0FBQyxFQUFwQyxFQUF3QztBQUNwQyxZQUFJQyxPQUFPLEdBQUdKLGFBQWEsQ0FBQ0csQ0FBRCxDQUFiLEdBQW1CRSxNQUFNLENBQUNDLGNBQVAsQ0FBc0IsRUFBdEIsRUFBMEJQLE1BQU0sQ0FBQ0ksQ0FBRCxDQUFoQyxDQUFqQztBQUNBQyxRQUFBQSxPQUFPLENBQUNHLFdBQVIsR0FBc0JGLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQixFQUF0QixFQUEwQlAsTUFBTSxDQUFDSSxDQUFELENBQU4sQ0FBVUksV0FBcEMsQ0FBdEI7QUFDQUgsUUFBQUEsT0FBTyxDQUFDSSxRQUFSLEdBQW1CSCxNQUFNLENBQUNDLGNBQVAsQ0FBc0IsRUFBdEIsRUFBMEJQLE1BQU0sQ0FBQ0ksQ0FBRCxDQUFOLENBQVVLLFFBQXBDLENBQW5COztBQUVBLFlBQUksQ0FBQ04sV0FBVyxDQUFDRSxPQUFPLENBQUNLLE1BQVQsQ0FBaEIsRUFBa0M7QUFDOUJQLFVBQUFBLFdBQVcsQ0FBQ0UsT0FBTyxDQUFDSyxNQUFULENBQVgsR0FBOEIsRUFBOUI7QUFDSDs7QUFDRFAsUUFBQUEsV0FBVyxDQUFDRSxPQUFPLENBQUNLLE1BQVQsQ0FBWCxDQUE0QkMsSUFBNUIsQ0FBaUNOLE9BQWpDO0FBQ0g7QUFDSjtBQUNKOztTQUVETyxhQUFBLG9CQUFZQyxJQUFaLEVBQTBCLENBRXpCOztTQUVEQyxVQUFBLG1CQUFXO0FBQ1AsUUFBSSxDQUFDLEtBQUtmLE1BQVYsRUFBa0IsT0FBTyxLQUFLSCxLQUFaO0FBQ2xCLFNBQUtHLE1BQUwsR0FBYyxLQUFkO0FBRUEsUUFBSWMsSUFBSSxHQUFHLEVBQVg7QUFDQUEsSUFBQUEsSUFBSSxJQUFJRSxrQkFBTUMsZUFBTixDQUFzQixLQUFLdkIsT0FBM0IsQ0FBUjtBQUVBLFFBQUlFLE1BQU0sR0FBRyxLQUFLSixPQUFsQjs7QUFDQSxRQUFJSSxNQUFKLEVBQVk7QUFDUmtCLE1BQUFBLElBQUksSUFBSUUsa0JBQU1DLGVBQU4sQ0FBc0JyQixNQUFNLENBQUNLLE1BQTdCLENBQVI7QUFDSDs7QUFFRCxTQUFLSixLQUFMLEdBQWEsZ0NBQVlpQixJQUFaLEVBQWtCLEdBQWxCLENBQWI7QUFFQSxTQUFLRCxVQUFMLENBQWdCLEtBQUtoQixLQUFyQjtBQUVBLFdBQU8sS0FBS0EsS0FBWjtBQUNIOzs7RUE3RXNDcUI7OztBQWdGM0M1QixFQUFFLENBQUNDLGFBQUgsR0FBbUJBLGFBQW5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG11cm11cmhhc2gyIGZyb20gJy4uLy4uLy4uL3JlbmRlcmVyL211cm11cmhhc2gyX2djJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBQYXNzIGZyb20gJy4uLy4uLy4uL3JlbmRlcmVyL2NvcmUvcGFzcyc7XG5pbXBvcnQgRWZmZWN0IGZyb20gJy4vZWZmZWN0JztcbmltcG9ydCBFZmZlY3RCYXNlIGZyb20gJy4vZWZmZWN0LWJhc2UnO1xuXG5jb25zdCBnZnggPSBjYy5nZng7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVmZmVjdFZhcmlhbnQgZXh0ZW5kcyBFZmZlY3RCYXNlIHtcbiAgICBfZWZmZWN0OiBFZmZlY3Q7XG4gICAgX3Bhc3NlczogUGFzc1tdID0gW107XG4gICAgX3N0YWdlUGFzc2VzID0ge307XG4gICAgX2hhc2ggPSAwO1xuXG4gICAgZ2V0IGVmZmVjdCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZmZlY3Q7XG4gICAgfVxuXG4gICAgZ2V0IG5hbWUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWZmZWN0ICYmICh0aGlzLl9lZmZlY3QubmFtZSArICcgKHZhcmlhbnQpJyk7XG4gICAgfVxuXG4gICAgZ2V0IHBhc3NlcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXNzZXM7XG4gICAgfVxuXG4gICAgZ2V0IHN0YWdlUGFzc2VzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YWdlUGFzc2VzO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yIChlZmZlY3Q6IEVmZmVjdCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmluaXQoZWZmZWN0KTtcbiAgICB9XG5cbiAgICBfb25FZmZlY3RDaGFuZ2VkICgpIHtcbiAgICB9XG5cbiAgICBpbml0IChlZmZlY3Q6IEVmZmVjdCkge1xuICAgICAgICBpZiAoZWZmZWN0IGluc3RhbmNlb2YgRWZmZWN0VmFyaWFudCkge1xuICAgICAgICAgICAgZWZmZWN0ID0gZWZmZWN0LmVmZmVjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2VmZmVjdCA9IGVmZmVjdDtcbiAgICAgICAgdGhpcy5fZGlydHkgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgaWYgKGVmZmVjdCkge1xuICAgICAgICAgICAgbGV0IHBhc3NlcyA9IGVmZmVjdC5wYXNzZXM7XG4gICAgICAgICAgICBsZXQgdmFyaWFudFBhc3NlcyA9IHRoaXMuX3Bhc3NlcztcbiAgICAgICAgICAgIHZhcmlhbnRQYXNzZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGxldCBzdGFnZVBhc3NlcyA9IHRoaXMuX3N0YWdlUGFzc2VzID0ge307XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB2YXJpYW50ID0gdmFyaWFudFBhc3Nlc1tpXSA9IE9iamVjdC5zZXRQcm90b3R5cGVPZih7fSwgcGFzc2VzW2ldKTtcbiAgICAgICAgICAgICAgICB2YXJpYW50Ll9wcm9wZXJ0aWVzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mKHt9LCBwYXNzZXNbaV0uX3Byb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgIHZhcmlhbnQuX2RlZmluZXMgPSBPYmplY3Quc2V0UHJvdG90eXBlT2Yoe30sIHBhc3Nlc1tpXS5fZGVmaW5lcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXN0YWdlUGFzc2VzW3ZhcmlhbnQuX3N0YWdlXSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFnZVBhc3Nlc1t2YXJpYW50Ll9zdGFnZV0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RhZ2VQYXNzZXNbdmFyaWFudC5fc3RhZ2VdLnB1c2godmFyaWFudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVIYXNoIChoYXNoOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIGdldEhhc2ggKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2RpcnR5KSByZXR1cm4gdGhpcy5faGFzaDtcbiAgICAgICAgdGhpcy5fZGlydHkgPSBmYWxzZTtcblxuICAgICAgICBsZXQgaGFzaCA9ICcnO1xuICAgICAgICBoYXNoICs9IHV0aWxzLnNlcmlhbGl6ZVBhc3Nlcyh0aGlzLl9wYXNzZXMpO1xuXG4gICAgICAgIGxldCBlZmZlY3QgPSB0aGlzLl9lZmZlY3Q7XG4gICAgICAgIGlmIChlZmZlY3QpIHtcbiAgICAgICAgICAgIGhhc2ggKz0gdXRpbHMuc2VyaWFsaXplUGFzc2VzKGVmZmVjdC5wYXNzZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faGFzaCA9IG11cm11cmhhc2gyKGhhc2gsIDY2Nik7XG5cbiAgICAgICAgdGhpcy51cGRhdGVIYXNoKHRoaXMuX2hhc2gpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9oYXNoO1xuICAgIH1cbn1cblxuY2MuRWZmZWN0VmFyaWFudCA9IEVmZmVjdFZhcmlhbnQ7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==