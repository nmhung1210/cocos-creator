
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/material/effect.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _effectBase = _interopRequireDefault(require("./effect-base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Effect = /*#__PURE__*/function (_EffectBase) {
  _inheritsLoose(Effect, _EffectBase);

  _createClass(Effect, [{
    key: "technique",
    get: function get() {
      return this._technique;
    }
  }, {
    key: "passes",
    get: function get() {
      return this._technique.passes;
    }
    /**
     * @param {Array} techniques
     */

  }]);

  function Effect(name, techniques, techniqueIndex, asset) {
    var _this;

    _this = _EffectBase.call(this) || this;
    _this._techniques = [];
    _this._asset = null;

    _this.init(name, techniques, techniqueIndex, asset, true);

    return _this;
  }

  var _proto = Effect.prototype;

  _proto.init = function init(name, techniques, techniqueIndex, asset, createNative) {
    this._name = name;
    this._techniques = techniques;
    this._technique = techniques[techniqueIndex];
    this._asset = asset;
  };

  _proto.switchTechnique = function switchTechnique(index) {
    if (index >= this._techniques.length) {
      cc.warn("Can not switch to technique with index [" + index + "]");
      return;
    }

    this._technique = this._techniques[index];
  };

  _proto.clear = function clear() {
    this._techniques = [];
  };

  _proto.clone = function clone() {
    var techniques = [];

    for (var i = 0; i < this._techniques.length; i++) {
      techniques.push(this._techniques[i].clone());
    }

    var techniqueIndex = this._techniques.indexOf(this._technique);

    return new Effect(this._name, techniques, techniqueIndex, this._asset);
  };

  return Effect;
}(_effectBase["default"]);

exports["default"] = Effect;
cc.Effect = Effect;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9tYXRlcmlhbC9lZmZlY3QudHMiXSwibmFtZXMiOlsiRWZmZWN0IiwiX3RlY2huaXF1ZSIsInBhc3NlcyIsIm5hbWUiLCJ0ZWNobmlxdWVzIiwidGVjaG5pcXVlSW5kZXgiLCJhc3NldCIsIl90ZWNobmlxdWVzIiwiX2Fzc2V0IiwiaW5pdCIsImNyZWF0ZU5hdGl2ZSIsIl9uYW1lIiwic3dpdGNoVGVjaG5pcXVlIiwiaW5kZXgiLCJsZW5ndGgiLCJjYyIsIndhcm4iLCJjbGVhciIsImNsb25lIiwiaSIsInB1c2giLCJpbmRleE9mIiwiRWZmZWN0QmFzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7Ozs7Ozs7O0lBRXFCQTs7Ozs7d0JBS0E7QUFDYixhQUFPLEtBQUtDLFVBQVo7QUFDSDs7O3dCQUVhO0FBQ1YsYUFBTyxLQUFLQSxVQUFMLENBQWdCQyxNQUF2QjtBQUNIO0FBRUQ7Ozs7OztBQUdBLGtCQUFhQyxJQUFiLEVBQW1CQyxVQUFuQixFQUErQkMsY0FBL0IsRUFBK0NDLEtBQS9DLEVBQXNEO0FBQUE7O0FBQ2xEO0FBRGtELFVBZHREQyxXQWNzRCxHQWQzQixFQWMyQjtBQUFBLFVBYnREQyxNQWFzRCxHQWI3QyxJQWE2Qzs7QUFFbEQsVUFBS0MsSUFBTCxDQUFVTixJQUFWLEVBQWdCQyxVQUFoQixFQUE0QkMsY0FBNUIsRUFBNENDLEtBQTVDLEVBQW1ELElBQW5EOztBQUZrRDtBQUdyRDs7OztTQUVERyxPQUFBLGNBQU1OLElBQU4sRUFBWUMsVUFBWixFQUF3QkMsY0FBeEIsRUFBd0NDLEtBQXhDLEVBQStDSSxZQUEvQyxFQUE2RDtBQUN6RCxTQUFLQyxLQUFMLEdBQWFSLElBQWI7QUFDQSxTQUFLSSxXQUFMLEdBQW1CSCxVQUFuQjtBQUNBLFNBQUtILFVBQUwsR0FBa0JHLFVBQVUsQ0FBQ0MsY0FBRCxDQUE1QjtBQUNBLFNBQUtHLE1BQUwsR0FBY0YsS0FBZDtBQUNIOztTQUVETSxrQkFBQSx5QkFBaUJDLEtBQWpCLEVBQXdCO0FBQ3BCLFFBQUlBLEtBQUssSUFBSSxLQUFLTixXQUFMLENBQWlCTyxNQUE5QixFQUFzQztBQUNsQ0MsTUFBQUEsRUFBRSxDQUFDQyxJQUFILDhDQUFtREgsS0FBbkQ7QUFDQTtBQUNIOztBQUVELFNBQUtaLFVBQUwsR0FBa0IsS0FBS00sV0FBTCxDQUFpQk0sS0FBakIsQ0FBbEI7QUFDSDs7U0FFREksUUFBQSxpQkFBUztBQUNMLFNBQUtWLFdBQUwsR0FBbUIsRUFBbkI7QUFDSDs7U0FFRFcsUUFBQSxpQkFBUztBQUNMLFFBQUlkLFVBQVUsR0FBRyxFQUFqQjs7QUFDQSxTQUFLLElBQUllLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS1osV0FBTCxDQUFpQk8sTUFBckMsRUFBNkNLLENBQUMsRUFBOUMsRUFBa0Q7QUFDOUNmLE1BQUFBLFVBQVUsQ0FBQ2dCLElBQVgsQ0FBZ0IsS0FBS2IsV0FBTCxDQUFpQlksQ0FBakIsRUFBb0JELEtBQXBCLEVBQWhCO0FBQ0g7O0FBRUQsUUFBSWIsY0FBYyxHQUFHLEtBQUtFLFdBQUwsQ0FBaUJjLE9BQWpCLENBQXlCLEtBQUtwQixVQUE5QixDQUFyQjs7QUFDQSxXQUFPLElBQUlELE1BQUosQ0FBVyxLQUFLVyxLQUFoQixFQUF1QlAsVUFBdkIsRUFBbUNDLGNBQW5DLEVBQW1ELEtBQUtHLE1BQXhELENBQVA7QUFDSDs7O0VBakQrQmM7OztBQW9EcENQLEVBQUUsQ0FBQ2YsTUFBSCxHQUFZQSxNQUFaIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbmltcG9ydCBUZWNobmlxdWUgZnJvbSAnLi4vLi4vLi4vcmVuZGVyZXIvY29yZS90ZWNobmlxdWUnO1xuaW1wb3J0IEVmZmVjdEJhc2UgZnJvbSAnLi9lZmZlY3QtYmFzZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVmZmVjdCBleHRlbmRzIEVmZmVjdEJhc2Uge1xuXG4gICAgX3RlY2huaXF1ZXM6IFRlY2huaXF1ZVtdID0gW107XG4gICAgX2Fzc2V0ID0gbnVsbDtcbiAgICBcbiAgICBnZXQgdGVjaG5pcXVlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RlY2huaXF1ZTtcbiAgICB9XG5cbiAgICBnZXQgcGFzc2VzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RlY2huaXF1ZS5wYXNzZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtBcnJheX0gdGVjaG5pcXVlc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChuYW1lLCB0ZWNobmlxdWVzLCB0ZWNobmlxdWVJbmRleCwgYXNzZXQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5pbml0KG5hbWUsIHRlY2huaXF1ZXMsIHRlY2huaXF1ZUluZGV4LCBhc3NldCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaW5pdCAobmFtZSwgdGVjaG5pcXVlcywgdGVjaG5pcXVlSW5kZXgsIGFzc2V0LCBjcmVhdGVOYXRpdmUpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuX3RlY2huaXF1ZXMgPSB0ZWNobmlxdWVzO1xuICAgICAgICB0aGlzLl90ZWNobmlxdWUgPSB0ZWNobmlxdWVzW3RlY2huaXF1ZUluZGV4XTtcbiAgICAgICAgdGhpcy5fYXNzZXQgPSBhc3NldDtcbiAgICB9XG5cbiAgICBzd2l0Y2hUZWNobmlxdWUgKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA+PSB0aGlzLl90ZWNobmlxdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2Mud2FybihgQ2FuIG5vdCBzd2l0Y2ggdG8gdGVjaG5pcXVlIHdpdGggaW5kZXggWyR7aW5kZXh9XWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdGVjaG5pcXVlID0gdGhpcy5fdGVjaG5pcXVlc1tpbmRleF07XG4gICAgfVxuXG4gICAgY2xlYXIgKCkge1xuICAgICAgICB0aGlzLl90ZWNobmlxdWVzID0gW107XG4gICAgfVxuXG4gICAgY2xvbmUgKCkge1xuICAgICAgICBsZXQgdGVjaG5pcXVlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3RlY2huaXF1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRlY2huaXF1ZXMucHVzaCh0aGlzLl90ZWNobmlxdWVzW2ldLmNsb25lKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRlY2huaXF1ZUluZGV4ID0gdGhpcy5fdGVjaG5pcXVlcy5pbmRleE9mKHRoaXMuX3RlY2huaXF1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgRWZmZWN0KHRoaXMuX25hbWUsIHRlY2huaXF1ZXMsIHRlY2huaXF1ZUluZGV4LCB0aGlzLl9hc3NldCk7XG4gICAgfVxufVxuXG5jYy5FZmZlY3QgPSBFZmZlY3Q7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==