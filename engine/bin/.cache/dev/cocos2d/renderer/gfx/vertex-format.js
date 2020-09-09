
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/vertex-format.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _enums = require("./enums");

var _murmurhash2_gc = _interopRequireDefault(require("../murmurhash2_gc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ====================
// exports
// ====================
var VertexFormat = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {Array} infos
   *
   * @example
   * let vertexFmt = new VertexFormat([
   *   { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 3 },
   *   { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
   *   { name: gfx.ATTR_COLOR, type: gfx.ATTR_TYPE_FLOAT32, num: 4, normalize: true },
   * ])
   */
  function VertexFormat(infos) {
    this._attr2el = {};
    this._elements = [];
    this._bytes = 0;
    var hash = "";

    for (var i = 0, len = infos.length; i < len; ++i) {
      var info = infos[i];
      var el = {
        name: info.name,
        offset: this._bytes,
        stride: 0,
        stream: -1,
        type: info.type,
        num: info.num,
        normalize: info.normalize === undefined ? false : info.normalize,
        bytes: info.num * (0, _enums.attrTypeBytes)(info.type)
      };
      this._attr2el[el.name] = el;

      this._elements.push(el);

      this._bytes += el.bytes;
      hash += el.name + ":" + el.num + ":" + el.type + ":" + el.normalize;
    }

    for (var _i = 0, _len = this._elements.length; _i < _len; ++_i) {
      var _el = this._elements[_i];
      _el.stride = this._bytes;
    }

    this._hash = (0, _murmurhash2_gc["default"])(hash, 666);
  }
  /**
   * @method element
   * @param {string} attrName
   */


  var _proto = VertexFormat.prototype;

  _proto.element = function element(attrName) {
    return this._attr2el[attrName];
  }
  /**
   * @method getHash
   */
  ;

  _proto.getHash = function getHash() {
    return this._hash;
  };

  return VertexFormat;
}();

exports["default"] = VertexFormat;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9nZngvdmVydGV4LWZvcm1hdC5qcyJdLCJuYW1lcyI6WyJWZXJ0ZXhGb3JtYXQiLCJpbmZvcyIsIl9hdHRyMmVsIiwiX2VsZW1lbnRzIiwiX2J5dGVzIiwiaGFzaCIsImkiLCJsZW4iLCJsZW5ndGgiLCJpbmZvIiwiZWwiLCJuYW1lIiwib2Zmc2V0Iiwic3RyaWRlIiwic3RyZWFtIiwidHlwZSIsIm51bSIsIm5vcm1hbGl6ZSIsInVuZGVmaW5lZCIsImJ5dGVzIiwicHVzaCIsIl9oYXNoIiwiZWxlbWVudCIsImF0dHJOYW1lIiwiZ2V0SGFzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUE7QUFDQTtBQUNBO0lBRXFCQTtBQUNuQjs7Ozs7Ozs7Ozs7QUFXQSx3QkFBWUMsS0FBWixFQUFtQjtBQUNqQixTQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixFQUFqQjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxDQUFkO0FBRUEsUUFBSUMsSUFBSSxHQUFHLEVBQVg7O0FBRUEsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBUixFQUFXQyxHQUFHLEdBQUdOLEtBQUssQ0FBQ08sTUFBNUIsRUFBb0NGLENBQUMsR0FBR0MsR0FBeEMsRUFBNkMsRUFBRUQsQ0FBL0MsRUFBa0Q7QUFDaEQsVUFBSUcsSUFBSSxHQUFHUixLQUFLLENBQUNLLENBQUQsQ0FBaEI7QUFDQSxVQUFJSSxFQUFFLEdBQUc7QUFDUEMsUUFBQUEsSUFBSSxFQUFFRixJQUFJLENBQUNFLElBREo7QUFFUEMsUUFBQUEsTUFBTSxFQUFFLEtBQUtSLE1BRk47QUFHUFMsUUFBQUEsTUFBTSxFQUFFLENBSEQ7QUFJUEMsUUFBQUEsTUFBTSxFQUFFLENBQUMsQ0FKRjtBQUtQQyxRQUFBQSxJQUFJLEVBQUVOLElBQUksQ0FBQ00sSUFMSjtBQU1QQyxRQUFBQSxHQUFHLEVBQUVQLElBQUksQ0FBQ08sR0FOSDtBQU9QQyxRQUFBQSxTQUFTLEVBQUdSLElBQUksQ0FBQ1EsU0FBTCxLQUFtQkMsU0FBcEIsR0FBaUMsS0FBakMsR0FBeUNULElBQUksQ0FBQ1EsU0FQbEQ7QUFRUEUsUUFBQUEsS0FBSyxFQUFFVixJQUFJLENBQUNPLEdBQUwsR0FBVywwQkFBY1AsSUFBSSxDQUFDTSxJQUFuQjtBQVJYLE9BQVQ7QUFXQSxXQUFLYixRQUFMLENBQWNRLEVBQUUsQ0FBQ0MsSUFBakIsSUFBeUJELEVBQXpCOztBQUNBLFdBQUtQLFNBQUwsQ0FBZWlCLElBQWYsQ0FBb0JWLEVBQXBCOztBQUVBLFdBQUtOLE1BQUwsSUFBZU0sRUFBRSxDQUFDUyxLQUFsQjtBQUVBZCxNQUFBQSxJQUFJLElBQU9LLEVBQUUsQ0FBQ0MsSUFBVixTQUFrQkQsRUFBRSxDQUFDTSxHQUFyQixTQUE0Qk4sRUFBRSxDQUFDSyxJQUEvQixTQUF1Q0wsRUFBRSxDQUFDTyxTQUE5QztBQUNEOztBQUVELFNBQUssSUFBSVgsRUFBQyxHQUFHLENBQVIsRUFBV0MsSUFBRyxHQUFHLEtBQUtKLFNBQUwsQ0FBZUssTUFBckMsRUFBNkNGLEVBQUMsR0FBR0MsSUFBakQsRUFBc0QsRUFBRUQsRUFBeEQsRUFBMkQ7QUFDekQsVUFBSUksR0FBRSxHQUFHLEtBQUtQLFNBQUwsQ0FBZUcsRUFBZixDQUFUO0FBQ0FJLE1BQUFBLEdBQUUsQ0FBQ0csTUFBSCxHQUFZLEtBQUtULE1BQWpCO0FBQ0Q7O0FBRUQsU0FBS2lCLEtBQUwsR0FBYSxnQ0FBWWhCLElBQVosRUFBa0IsR0FBbEIsQ0FBYjtBQUNEO0FBRUQ7Ozs7Ozs7O1NBSUFpQixVQUFBLGlCQUFRQyxRQUFSLEVBQWtCO0FBQ2hCLFdBQU8sS0FBS3JCLFFBQUwsQ0FBY3FCLFFBQWQsQ0FBUDtBQUNEO0FBRUQ7Ozs7O1NBR0FDLFVBQUEsbUJBQVc7QUFDVCxXQUFPLEtBQUtILEtBQVo7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGF0dHJUeXBlQnl0ZXMgfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCBtdXJtdXJoYXNoMiBmcm9tICcuLi9tdXJtdXJoYXNoMl9nYyc7XG5cbi8vID09PT09PT09PT09PT09PT09PT09XG4vLyBleHBvcnRzXG4vLyA9PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJ0ZXhGb3JtYXQge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7QXJyYXl9IGluZm9zXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGxldCB2ZXJ0ZXhGbXQgPSBuZXcgVmVydGV4Rm9ybWF0KFtcbiAgICogICB7IG5hbWU6IGdmeC5BVFRSX1BPU0lUSU9OLCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogMyB9LFxuICAgKiAgIHsgbmFtZTogZ2Z4LkFUVFJfVVYwLCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogMiB9LFxuICAgKiAgIHsgbmFtZTogZ2Z4LkFUVFJfQ09MT1IsIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiA0LCBub3JtYWxpemU6IHRydWUgfSxcbiAgICogXSlcbiAgICovXG4gIGNvbnN0cnVjdG9yKGluZm9zKSB7XG4gICAgdGhpcy5fYXR0cjJlbCA9IHt9O1xuICAgIHRoaXMuX2VsZW1lbnRzID0gW107XG4gICAgdGhpcy5fYnl0ZXMgPSAwO1xuXG4gICAgbGV0IGhhc2ggPSBcIlwiO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGluZm9zLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBsZXQgaW5mbyA9IGluZm9zW2ldO1xuICAgICAgbGV0IGVsID0ge1xuICAgICAgICBuYW1lOiBpbmZvLm5hbWUsXG4gICAgICAgIG9mZnNldDogdGhpcy5fYnl0ZXMsXG4gICAgICAgIHN0cmlkZTogMCxcbiAgICAgICAgc3RyZWFtOiAtMSxcbiAgICAgICAgdHlwZTogaW5mby50eXBlLFxuICAgICAgICBudW06IGluZm8ubnVtLFxuICAgICAgICBub3JtYWxpemU6IChpbmZvLm5vcm1hbGl6ZSA9PT0gdW5kZWZpbmVkKSA/IGZhbHNlIDogaW5mby5ub3JtYWxpemUsXG4gICAgICAgIGJ5dGVzOiBpbmZvLm51bSAqIGF0dHJUeXBlQnl0ZXMoaW5mby50eXBlKSxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX2F0dHIyZWxbZWwubmFtZV0gPSBlbDtcbiAgICAgIHRoaXMuX2VsZW1lbnRzLnB1c2goZWwpO1xuXG4gICAgICB0aGlzLl9ieXRlcyArPSBlbC5ieXRlcztcblxuICAgICAgaGFzaCArPSBgJHtlbC5uYW1lfToke2VsLm51bX06JHtlbC50eXBlfToke2VsLm5vcm1hbGl6ZX1gO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLl9lbGVtZW50cy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgbGV0IGVsID0gdGhpcy5fZWxlbWVudHNbaV07XG4gICAgICBlbC5zdHJpZGUgPSB0aGlzLl9ieXRlcztcbiAgICB9XG5cbiAgICB0aGlzLl9oYXNoID0gbXVybXVyaGFzaDIoaGFzaCwgNjY2KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGVsZW1lbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJOYW1lXG4gICAqL1xuICBlbGVtZW50KGF0dHJOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dHIyZWxbYXR0ck5hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0SGFzaFxuICAgKi9cbiAgZ2V0SGFzaCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc2g7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==