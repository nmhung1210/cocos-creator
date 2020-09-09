
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/material/material-pool.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("./utils"));

var _pool = _interopRequireDefault(require("../../utils/pool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * {
 *   effectUuid: {
 *     defineSerializeKey: []
 *   }
 * }
 */
var MaterialPool = /*#__PURE__*/function (_Pool) {
  _inheritsLoose(MaterialPool, _Pool);

  function MaterialPool() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Pool.call.apply(_Pool, [this].concat(args)) || this;
    _this.enabled = false;
    _this._pool = {};
    return _this;
  }

  var _proto = MaterialPool.prototype;

  _proto.get = function get(exampleMat, renderComponent) {
    var pool = this._pool;

    if (exampleMat instanceof cc.MaterialVariant) {
      if (exampleMat._owner) {
        if (exampleMat._owner === renderComponent) {
          return exampleMat;
        } else {
          exampleMat = exampleMat.material;
        }
      } else {
        exampleMat._owner = renderComponent;
        return exampleMat;
      }
    }

    var instance;

    if (this.enabled) {
      var uuid = exampleMat.effectAsset._uuid;

      if (pool[uuid]) {
        var key = _utils["default"].serializeDefines(exampleMat._effect._defines) + _utils["default"].serializeTechniques(exampleMat._effect._techniques);

        instance = pool[uuid][key] && pool[uuid][key].pop();
      }
    }

    if (!instance) {
      instance = new cc.MaterialVariant(exampleMat);
      instance._name = exampleMat._name + ' (Instance)';
      instance._uuid = exampleMat._uuid;
    } else {
      this.count--;
    }

    instance._owner = renderComponent;
    return instance;
  };

  _proto.put = function put(mat) {
    if (!this.enabled || !mat._owner) {
      return;
    }

    var pool = this._pool;
    var uuid = mat.effectAsset._uuid;

    if (!pool[uuid]) {
      pool[uuid] = {};
    }

    var key = _utils["default"].serializeDefines(mat._effect._defines) + _utils["default"].serializeTechniques(mat._effect._techniques);

    if (!pool[uuid][key]) {
      pool[uuid][key] = [];
    }

    if (this.count > this.maxSize) return;

    this._clean(mat);

    pool[uuid][key].push(mat);
    this.count++;
  };

  _proto.clear = function clear() {
    this._pool = {};
    this.count = 0;
  };

  _proto._clean = function _clean(mat) {
    mat._owner = null;
  };

  return MaterialPool;
}(_pool["default"]);

var materialPool = new MaterialPool();

_pool["default"].register('material', materialPool);

var _default = materialPool;
exports["default"] = _default;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9tYXRlcmlhbC9tYXRlcmlhbC1wb29sLmpzIl0sIm5hbWVzIjpbIk1hdGVyaWFsUG9vbCIsImVuYWJsZWQiLCJfcG9vbCIsImdldCIsImV4YW1wbGVNYXQiLCJyZW5kZXJDb21wb25lbnQiLCJwb29sIiwiY2MiLCJNYXRlcmlhbFZhcmlhbnQiLCJfb3duZXIiLCJtYXRlcmlhbCIsImluc3RhbmNlIiwidXVpZCIsImVmZmVjdEFzc2V0IiwiX3V1aWQiLCJrZXkiLCJ1dGlscyIsInNlcmlhbGl6ZURlZmluZXMiLCJfZWZmZWN0IiwiX2RlZmluZXMiLCJzZXJpYWxpemVUZWNobmlxdWVzIiwiX3RlY2huaXF1ZXMiLCJwb3AiLCJfbmFtZSIsImNvdW50IiwicHV0IiwibWF0IiwibWF4U2l6ZSIsIl9jbGVhbiIsInB1c2giLCJjbGVhciIsIlBvb2wiLCJtYXRlcmlhbFBvb2wiLCJyZWdpc3RlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFQTs7Ozs7OztJQU9NQTs7Ozs7Ozs7Ozs7VUFFRkMsVUFBVTtVQUVWQyxRQUFROzs7Ozs7U0FFUkMsTUFBQSxhQUFLQyxVQUFMLEVBQWlCQyxlQUFqQixFQUFrQztBQUM5QixRQUFJQyxJQUFJLEdBQUcsS0FBS0osS0FBaEI7O0FBRUEsUUFBSUUsVUFBVSxZQUFZRyxFQUFFLENBQUNDLGVBQTdCLEVBQThDO0FBQzFDLFVBQUlKLFVBQVUsQ0FBQ0ssTUFBZixFQUF1QjtBQUNuQixZQUFJTCxVQUFVLENBQUNLLE1BQVgsS0FBc0JKLGVBQTFCLEVBQTJDO0FBQ3ZDLGlCQUFPRCxVQUFQO0FBQ0gsU0FGRCxNQUdLO0FBQ0RBLFVBQUFBLFVBQVUsR0FBR0EsVUFBVSxDQUFDTSxRQUF4QjtBQUNIO0FBQ0osT0FQRCxNQVFLO0FBQ0ROLFFBQUFBLFVBQVUsQ0FBQ0ssTUFBWCxHQUFvQkosZUFBcEI7QUFDQSxlQUFPRCxVQUFQO0FBQ0g7QUFDSjs7QUFFRCxRQUFJTyxRQUFKOztBQUNBLFFBQUksS0FBS1YsT0FBVCxFQUFrQjtBQUNkLFVBQUlXLElBQUksR0FBR1IsVUFBVSxDQUFDUyxXQUFYLENBQXVCQyxLQUFsQzs7QUFDQSxVQUFJUixJQUFJLENBQUNNLElBQUQsQ0FBUixFQUFnQjtBQUNaLFlBQUlHLEdBQUcsR0FDSEMsa0JBQU1DLGdCQUFOLENBQXVCYixVQUFVLENBQUNjLE9BQVgsQ0FBbUJDLFFBQTFDLElBQ0FILGtCQUFNSSxtQkFBTixDQUEwQmhCLFVBQVUsQ0FBQ2MsT0FBWCxDQUFtQkcsV0FBN0MsQ0FGSjs7QUFHQVYsUUFBQUEsUUFBUSxHQUFHTCxJQUFJLENBQUNNLElBQUQsQ0FBSixDQUFXRyxHQUFYLEtBQW1CVCxJQUFJLENBQUNNLElBQUQsQ0FBSixDQUFXRyxHQUFYLEVBQWdCTyxHQUFoQixFQUE5QjtBQUNIO0FBQ0o7O0FBRUQsUUFBSSxDQUFDWCxRQUFMLEVBQWU7QUFDWEEsTUFBQUEsUUFBUSxHQUFHLElBQUlKLEVBQUUsQ0FBQ0MsZUFBUCxDQUF1QkosVUFBdkIsQ0FBWDtBQUNBTyxNQUFBQSxRQUFRLENBQUNZLEtBQVQsR0FBaUJuQixVQUFVLENBQUNtQixLQUFYLEdBQW1CLGFBQXBDO0FBQ0FaLE1BQUFBLFFBQVEsQ0FBQ0csS0FBVCxHQUFpQlYsVUFBVSxDQUFDVSxLQUE1QjtBQUNILEtBSkQsTUFLSztBQUNELFdBQUtVLEtBQUw7QUFDSDs7QUFFRGIsSUFBQUEsUUFBUSxDQUFDRixNQUFULEdBQWtCSixlQUFsQjtBQUVBLFdBQU9NLFFBQVA7QUFDSDs7U0FFRGMsTUFBQSxhQUFLQyxHQUFMLEVBQVU7QUFDTixRQUFJLENBQUMsS0FBS3pCLE9BQU4sSUFBaUIsQ0FBQ3lCLEdBQUcsQ0FBQ2pCLE1BQTFCLEVBQWtDO0FBQzlCO0FBQ0g7O0FBRUQsUUFBSUgsSUFBSSxHQUFHLEtBQUtKLEtBQWhCO0FBQ0EsUUFBSVUsSUFBSSxHQUFHYyxHQUFHLENBQUNiLFdBQUosQ0FBZ0JDLEtBQTNCOztBQUNBLFFBQUksQ0FBQ1IsSUFBSSxDQUFDTSxJQUFELENBQVQsRUFBaUI7QUFDYk4sTUFBQUEsSUFBSSxDQUFDTSxJQUFELENBQUosR0FBYSxFQUFiO0FBQ0g7O0FBQ0QsUUFBSUcsR0FBRyxHQUNIQyxrQkFBTUMsZ0JBQU4sQ0FBdUJTLEdBQUcsQ0FBQ1IsT0FBSixDQUFZQyxRQUFuQyxJQUNBSCxrQkFBTUksbUJBQU4sQ0FBMEJNLEdBQUcsQ0FBQ1IsT0FBSixDQUFZRyxXQUF0QyxDQUZKOztBQUdBLFFBQUksQ0FBQ2YsSUFBSSxDQUFDTSxJQUFELENBQUosQ0FBV0csR0FBWCxDQUFMLEVBQXNCO0FBQ2xCVCxNQUFBQSxJQUFJLENBQUNNLElBQUQsQ0FBSixDQUFXRyxHQUFYLElBQWtCLEVBQWxCO0FBQ0g7O0FBQ0QsUUFBSSxLQUFLUyxLQUFMLEdBQWEsS0FBS0csT0FBdEIsRUFBK0I7O0FBRS9CLFNBQUtDLE1BQUwsQ0FBWUYsR0FBWjs7QUFDQXBCLElBQUFBLElBQUksQ0FBQ00sSUFBRCxDQUFKLENBQVdHLEdBQVgsRUFBZ0JjLElBQWhCLENBQXFCSCxHQUFyQjtBQUNBLFNBQUtGLEtBQUw7QUFDSDs7U0FFRE0sUUFBQSxpQkFBUztBQUNMLFNBQUs1QixLQUFMLEdBQWEsRUFBYjtBQUNBLFNBQUtzQixLQUFMLEdBQWEsQ0FBYjtBQUNIOztTQUVESSxTQUFBLGdCQUFRRixHQUFSLEVBQWE7QUFDVEEsSUFBQUEsR0FBRyxDQUFDakIsTUFBSixHQUFhLElBQWI7QUFDSDs7O0VBL0VzQnNCOztBQWtGM0IsSUFBSUMsWUFBWSxHQUFHLElBQUloQyxZQUFKLEVBQW5COztBQUNBK0IsaUJBQUtFLFFBQUwsQ0FBYyxVQUFkLEVBQTBCRCxZQUExQjs7ZUFDZUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgUG9vbCBmcm9tICcuLi8uLi91dGlscy9wb29sJztcblxuLyoqXG4gKiB7XG4gKiAgIGVmZmVjdFV1aWQ6IHtcbiAqICAgICBkZWZpbmVTZXJpYWxpemVLZXk6IFtdXG4gKiAgIH1cbiAqIH1cbiAqL1xuY2xhc3MgTWF0ZXJpYWxQb29sIGV4dGVuZHMgUG9vbCB7XG4gICAgLy8gZGVmYXVsdCBkaXNhYmxlZCBtYXRlcmlhbCBwb29sXG4gICAgZW5hYmxlZCA9IGZhbHNlO1xuICAgIFxuICAgIF9wb29sID0ge307XG5cbiAgICBnZXQgKGV4YW1wbGVNYXQsIHJlbmRlckNvbXBvbmVudCkge1xuICAgICAgICBsZXQgcG9vbCA9IHRoaXMuX3Bvb2w7XG5cbiAgICAgICAgaWYgKGV4YW1wbGVNYXQgaW5zdGFuY2VvZiBjYy5NYXRlcmlhbFZhcmlhbnQpIHtcbiAgICAgICAgICAgIGlmIChleGFtcGxlTWF0Ll9vd25lcikge1xuICAgICAgICAgICAgICAgIGlmIChleGFtcGxlTWF0Ll9vd25lciA9PT0gcmVuZGVyQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBleGFtcGxlTWF0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXhhbXBsZU1hdCA9IGV4YW1wbGVNYXQubWF0ZXJpYWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXhhbXBsZU1hdC5fb3duZXIgPSByZW5kZXJDb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4YW1wbGVNYXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW5zdGFuY2U7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIGxldCB1dWlkID0gZXhhbXBsZU1hdC5lZmZlY3RBc3NldC5fdXVpZDtcbiAgICAgICAgICAgIGlmIChwb29sW3V1aWRdKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IFxuICAgICAgICAgICAgICAgICAgICB1dGlscy5zZXJpYWxpemVEZWZpbmVzKGV4YW1wbGVNYXQuX2VmZmVjdC5fZGVmaW5lcykgK1xuICAgICAgICAgICAgICAgICAgICB1dGlscy5zZXJpYWxpemVUZWNobmlxdWVzKGV4YW1wbGVNYXQuX2VmZmVjdC5fdGVjaG5pcXVlcyk7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBwb29sW3V1aWRdW2tleV0gJiYgcG9vbFt1dWlkXVtrZXldLnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmICghaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGluc3RhbmNlID0gbmV3IGNjLk1hdGVyaWFsVmFyaWFudChleGFtcGxlTWF0KTtcbiAgICAgICAgICAgIGluc3RhbmNlLl9uYW1lID0gZXhhbXBsZU1hdC5fbmFtZSArICcgKEluc3RhbmNlKSc7XG4gICAgICAgICAgICBpbnN0YW5jZS5fdXVpZCA9IGV4YW1wbGVNYXQuX3V1aWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50LS07XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaW5zdGFuY2UuX293bmVyID0gcmVuZGVyQ29tcG9uZW50O1xuICAgIFxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuICAgIFxuICAgIHB1dCAobWF0KSB7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkIHx8ICFtYXQuX293bmVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcG9vbCA9IHRoaXMuX3Bvb2w7XG4gICAgICAgIGxldCB1dWlkID0gbWF0LmVmZmVjdEFzc2V0Ll91dWlkO1xuICAgICAgICBpZiAoIXBvb2xbdXVpZF0pIHtcbiAgICAgICAgICAgIHBvb2xbdXVpZF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBsZXQga2V5ID0gXG4gICAgICAgICAgICB1dGlscy5zZXJpYWxpemVEZWZpbmVzKG1hdC5fZWZmZWN0Ll9kZWZpbmVzKSArXG4gICAgICAgICAgICB1dGlscy5zZXJpYWxpemVUZWNobmlxdWVzKG1hdC5fZWZmZWN0Ll90ZWNobmlxdWVzKTtcbiAgICAgICAgaWYgKCFwb29sW3V1aWRdW2tleV0pIHtcbiAgICAgICAgICAgIHBvb2xbdXVpZF1ba2V5XSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvdW50ID4gdGhpcy5tYXhTaXplKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fY2xlYW4obWF0KTtcbiAgICAgICAgcG9vbFt1dWlkXVtrZXldLnB1c2gobWF0KTtcbiAgICAgICAgdGhpcy5jb3VudCsrO1xuICAgIH1cblxuICAgIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5fcG9vbCA9IHt9O1xuICAgICAgICB0aGlzLmNvdW50ID0gMDtcbiAgICB9XG5cbiAgICBfY2xlYW4gKG1hdCkge1xuICAgICAgICBtYXQuX293bmVyID0gbnVsbDtcbiAgICB9XG59XG5cbmxldCBtYXRlcmlhbFBvb2wgPSBuZXcgTWF0ZXJpYWxQb29sKCk7XG5Qb29sLnJlZ2lzdGVyKCdtYXRlcmlhbCcsIG1hdGVyaWFsUG9vbCk7XG5leHBvcnQgZGVmYXVsdCBtYXRlcmlhbFBvb2w7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==