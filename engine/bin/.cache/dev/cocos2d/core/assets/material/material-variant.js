
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/material/material-variant.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _CCMaterial = _interopRequireDefault(require("./CCMaterial"));

var _effectVariant = _interopRequireDefault(require("./effect-variant"));

var _materialPool = _interopRequireDefault(require("./material-pool"));

var _dec, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ccclass = cc._decorator.ccclass;
/**
 * !#en
 * Material Variant is an extension of the Material Asset.
 * Changes to Material Variant do not affect other Material Variant or Material Asset,
 * and changes to Material Asset are synchronized to the Material Variant.
 * However, when a Material Variant had already modifies a state, the Material Asset state is not synchronized to the Material Variant.
 * !#zh
 * 材质变体是材质资源的一个延伸。
 * 材质变体的修改不会影响到其他的材质变体或者材质资源，而材质资源的修改会同步体现到材质变体上，
 * 但是当材质变体对一个状态修改后，材质资源再对这个状态修改是不会同步到材质变体上的。
 * @class MaterialVariant
 * @extends Material
 */

var MaterialVariant = (_dec = ccclass('cc.MaterialVariant'), _dec(_class = (_temp = /*#__PURE__*/function (_Material) {
  _inheritsLoose(MaterialVariant, _Material);

  /**
   * @method createWithBuiltin
   * @param {Material.BUILTIN_NAME} materialName
   * @param {RenderComponent} [owner]
   * @typescript
   * static createWithBuiltin (materialName: string, owner: cc.RenderComponent): MaterialVariant | null
   */
  MaterialVariant.createWithBuiltin = function createWithBuiltin(materialName, owner) {
    return MaterialVariant.create(_CCMaterial["default"].getBuiltinMaterial(materialName), owner);
  }
  /**
   * @method create
   * @param {Material} material
   * @param {RenderComponent} [owner]
   * @typescript
   * static create (material: Material, owner: cc.RenderComponent): MaterialVariant | null
   */
  ;

  MaterialVariant.create = function create(material, owner) {
    if (!material) return null;
    return _materialPool["default"].get(material, owner);
  };

  _createClass(MaterialVariant, [{
    key: "uuid",
    get: function get() {
      return this._material.uuid;
    }
  }, {
    key: "owner",
    get: function get() {
      return this._owner;
    }
  }, {
    key: "material",
    get: function get() {
      return this._material;
    }
  }]);

  function MaterialVariant(material) {
    var _this;

    _this = _Material.call(this) || this;
    _this._owner = null;
    _this._material = null;

    _this.init(material);

    return _this;
  }

  var _proto = MaterialVariant.prototype;

  _proto.init = function init(material) {
    this._effect = new _effectVariant["default"](material.effect);
    this._effectAsset = material._effectAsset;
    this._material = material;
  };

  return MaterialVariant;
}(_CCMaterial["default"]), _temp)) || _class);
exports["default"] = MaterialVariant;
cc.MaterialVariant = MaterialVariant;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9tYXRlcmlhbC9tYXRlcmlhbC12YXJpYW50LnRzIl0sIm5hbWVzIjpbImNjY2xhc3MiLCJjYyIsIl9kZWNvcmF0b3IiLCJNYXRlcmlhbFZhcmlhbnQiLCJjcmVhdGVXaXRoQnVpbHRpbiIsIm1hdGVyaWFsTmFtZSIsIm93bmVyIiwiY3JlYXRlIiwiTWF0ZXJpYWwiLCJnZXRCdWlsdGluTWF0ZXJpYWwiLCJtYXRlcmlhbCIsIk1hdGVyaWFsUG9vbCIsImdldCIsIl9tYXRlcmlhbCIsInV1aWQiLCJfb3duZXIiLCJpbml0IiwiX2VmZmVjdCIsIkVmZmVjdFZhcmlhbnQiLCJlZmZlY3QiLCJfZWZmZWN0QXNzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLFVBQWFDLEVBQUUsQ0FBQ0MsV0FBaEJGO0FBRU47Ozs7Ozs7Ozs7Ozs7O0lBY3FCRywwQkFEcEJILE9BQU8sQ0FBQyxvQkFBRDs7O0FBS0o7Ozs7Ozs7a0JBT09JLG9CQUFQLDJCQUEwQkMsWUFBMUIsRUFBZ0RDLEtBQWhELEVBQW1HO0FBQy9GLFdBQU9ILGVBQWUsQ0FBQ0ksTUFBaEIsQ0FBdUJDLHVCQUFTQyxrQkFBVCxDQUE0QkosWUFBNUIsQ0FBdkIsRUFBa0VDLEtBQWxFLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7a0JBT09DLFNBQVAsZ0JBQWVHLFFBQWYsRUFBbUNKLEtBQW5DLEVBQXNGO0FBQ2xGLFFBQUksQ0FBQ0ksUUFBTCxFQUFlLE9BQU8sSUFBUDtBQUNmLFdBQU9DLHlCQUFhQyxHQUFiLENBQWlCRixRQUFqQixFQUEyQkosS0FBM0IsQ0FBUDtBQUNIOzs7O3dCQUVXO0FBQ1IsYUFBTyxLQUFLTyxTQUFMLENBQWVDLElBQXRCO0FBQ0g7Ozt3QkFFWTtBQUNULGFBQU8sS0FBS0MsTUFBWjtBQUNIOzs7d0JBRWU7QUFDWixhQUFPLEtBQUtGLFNBQVo7QUFDSDs7O0FBRUQsMkJBQWFILFFBQWIsRUFBaUM7QUFBQTs7QUFDN0I7QUFENkIsVUF0Q2pDSyxNQXNDaUMsR0F0Q0osSUFzQ0k7QUFBQSxVQXJDakNGLFNBcUNpQyxHQXJDWCxJQXFDVzs7QUFFN0IsVUFBS0csSUFBTCxDQUFVTixRQUFWOztBQUY2QjtBQUdoQzs7OztTQUVETSxPQUFBLGNBQU1OLFFBQU4sRUFBZ0I7QUFDWixTQUFLTyxPQUFMLEdBQWUsSUFBSUMseUJBQUosQ0FBa0JSLFFBQVEsQ0FBQ1MsTUFBM0IsQ0FBZjtBQUNBLFNBQUtDLFlBQUwsR0FBb0JWLFFBQVEsQ0FBQ1UsWUFBN0I7QUFDQSxTQUFLUCxTQUFMLEdBQWlCSCxRQUFqQjtBQUNIOzs7RUFoRHdDRjs7QUFtRDdDUCxFQUFFLENBQUNFLGVBQUgsR0FBcUJBLGVBQXJCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgTWF0ZXJpYWwgZnJvbSAnLi9DQ01hdGVyaWFsJztcbmltcG9ydCBFZmZlY3RWYXJpYW50IGZyb20gJy4vZWZmZWN0LXZhcmlhbnQnO1xuaW1wb3J0IE1hdGVyaWFsUG9vbCBmcm9tICcuL21hdGVyaWFsLXBvb2wnO1xuXG5sZXQgeyBjY2NsYXNzLCB9ID0gY2MuX2RlY29yYXRvcjtcblxuLyoqXG4gKiAhI2VuXG4gKiBNYXRlcmlhbCBWYXJpYW50IGlzIGFuIGV4dGVuc2lvbiBvZiB0aGUgTWF0ZXJpYWwgQXNzZXQuXG4gKiBDaGFuZ2VzIHRvIE1hdGVyaWFsIFZhcmlhbnQgZG8gbm90IGFmZmVjdCBvdGhlciBNYXRlcmlhbCBWYXJpYW50IG9yIE1hdGVyaWFsIEFzc2V0LFxuICogYW5kIGNoYW5nZXMgdG8gTWF0ZXJpYWwgQXNzZXQgYXJlIHN5bmNocm9uaXplZCB0byB0aGUgTWF0ZXJpYWwgVmFyaWFudC5cbiAqIEhvd2V2ZXIsIHdoZW4gYSBNYXRlcmlhbCBWYXJpYW50IGhhZCBhbHJlYWR5IG1vZGlmaWVzIGEgc3RhdGUsIHRoZSBNYXRlcmlhbCBBc3NldCBzdGF0ZSBpcyBub3Qgc3luY2hyb25pemVkIHRvIHRoZSBNYXRlcmlhbCBWYXJpYW50LlxuICogISN6aFxuICog5p2Q6LSo5Y+Y5L2T5piv5p2Q6LSo6LWE5rqQ55qE5LiA5Liq5bu25Ly444CCXG4gKiDmnZDotKjlj5jkvZPnmoTkv67mlLnkuI3kvJrlvbHlk43liLDlhbbku5bnmoTmnZDotKjlj5jkvZPmiJbogIXmnZDotKjotYTmupDvvIzogIzmnZDotKjotYTmupDnmoTkv67mlLnkvJrlkIzmraXkvZPnjrDliLDmnZDotKjlj5jkvZPkuIrvvIxcbiAqIOS9huaYr+W9k+adkOi0qOWPmOS9k+WvueS4gOS4queKtuaAgeS/ruaUueWQju+8jOadkOi0qOi1hOa6kOWGjeWvuei/meS4queKtuaAgeS/ruaUueaYr+S4jeS8muWQjOatpeWIsOadkOi0qOWPmOS9k+S4iueahOOAglxuICogQGNsYXNzIE1hdGVyaWFsVmFyaWFudFxuICogQGV4dGVuZHMgTWF0ZXJpYWxcbiAqL1xuQGNjY2xhc3MoJ2NjLk1hdGVyaWFsVmFyaWFudCcpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRlcmlhbFZhcmlhbnQgZXh0ZW5kcyBNYXRlcmlhbCB7XG4gICAgX293bmVyOiBjYy5SZW5kZXJDb21wb25lbnQgPSBudWxsO1xuICAgIF9tYXRlcmlhbDogTWF0ZXJpYWwgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBjcmVhdGVXaXRoQnVpbHRpblxuICAgICAqIEBwYXJhbSB7TWF0ZXJpYWwuQlVJTFRJTl9OQU1FfSBtYXRlcmlhbE5hbWVcbiAgICAgKiBAcGFyYW0ge1JlbmRlckNvbXBvbmVudH0gW293bmVyXVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogc3RhdGljIGNyZWF0ZVdpdGhCdWlsdGluIChtYXRlcmlhbE5hbWU6IHN0cmluZywgb3duZXI6IGNjLlJlbmRlckNvbXBvbmVudCk6IE1hdGVyaWFsVmFyaWFudCB8IG51bGxcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlV2l0aEJ1aWx0aW4gKG1hdGVyaWFsTmFtZTogc3RyaW5nLCBvd25lcjogY2MuUmVuZGVyQ29tcG9uZW50KTogTWF0ZXJpYWxWYXJpYW50IHwgbnVsbCB7XG4gICAgICAgIHJldHVybiBNYXRlcmlhbFZhcmlhbnQuY3JlYXRlKE1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChtYXRlcmlhbE5hbWUpLCBvd25lcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBjcmVhdGVcbiAgICAgKiBAcGFyYW0ge01hdGVyaWFsfSBtYXRlcmlhbFxuICAgICAqIEBwYXJhbSB7UmVuZGVyQ29tcG9uZW50fSBbb3duZXJdXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzdGF0aWMgY3JlYXRlIChtYXRlcmlhbDogTWF0ZXJpYWwsIG93bmVyOiBjYy5SZW5kZXJDb21wb25lbnQpOiBNYXRlcmlhbFZhcmlhbnQgfCBudWxsXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZSAobWF0ZXJpYWw6IE1hdGVyaWFsLCBvd25lcjogY2MuUmVuZGVyQ29tcG9uZW50KTogTWF0ZXJpYWxWYXJpYW50IHwgbnVsbCB7XG4gICAgICAgIGlmICghbWF0ZXJpYWwpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gTWF0ZXJpYWxQb29sLmdldChtYXRlcmlhbCwgb3duZXIpO1xuICAgIH1cblxuICAgIGdldCB1dWlkICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hdGVyaWFsLnV1aWQ7XG4gICAgfVxuXG4gICAgZ2V0IG93bmVyICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX293bmVyO1xuICAgIH1cblxuICAgIGdldCBtYXRlcmlhbCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXRlcmlhbDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvciAobWF0ZXJpYWw6IE1hdGVyaWFsKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaW5pdChtYXRlcmlhbCk7XG4gICAgfVxuXG4gICAgaW5pdCAobWF0ZXJpYWwpIHtcbiAgICAgICAgdGhpcy5fZWZmZWN0ID0gbmV3IEVmZmVjdFZhcmlhbnQobWF0ZXJpYWwuZWZmZWN0KTtcbiAgICAgICAgdGhpcy5fZWZmZWN0QXNzZXQgPSBtYXRlcmlhbC5fZWZmZWN0QXNzZXQ7XG4gICAgICAgIHRoaXMuX21hdGVyaWFsID0gbWF0ZXJpYWw7XG4gICAgfVxufVxuXG5jYy5NYXRlcmlhbFZhcmlhbnQgPSBNYXRlcmlhbFZhcmlhbnQ7Il0sInNvdXJjZVJvb3QiOiIvIn0=