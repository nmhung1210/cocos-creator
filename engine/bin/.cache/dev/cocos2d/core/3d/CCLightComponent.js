
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/CCLightComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _enums = _interopRequireDefault(require("../../renderer/enums"));

var _color = _interopRequireDefault(require("../value-types/color"));

var _valueTypes = require("../value-types");

var _index = _interopRequireDefault(require("../renderer/index"));

var _CCEnum = _interopRequireDefault(require("../platform/CCEnum"));

var _CCComponent2 = _interopRequireDefault(require("../components/CCComponent"));

var _CCClassDecorator = require("../platform/CCClassDecorator");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _class3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var RendererLight = null;

if (CC_JSB && CC_NATIVERENDERER) {
  // @ts-ignore
  RendererLight = window.renderer.Light;
} else {
  // @ts-ignore
  RendererLight = require('../../renderer/scene/light');
}

/**
 * !#en The light source type
 *
 * !#zh 光源类型
 * @static
 * @enum Light.Type
 */
var LightType = (0, _CCEnum["default"])({
  /**
   * !#en The direction of light
   *
   * !#zh 平行光
   * @property {Number} DIRECTIONAL
   * @readonly
   */
  DIRECTIONAL: 0,

  /**
   * !#en The point of light
   *
   * !#zh 点光源
   * @property {Number} POINT
   * @readonly
   */
  POINT: 1,

  /**
   * !#en The spot of light
   *
   * !#zh 聚光灯
   * @property {Number} SPOT
   * @readonly
   */
  SPOT: 2,

  /**
   * !#en The ambient light
   * !#zh 环境光
   * @property {Number} AMBIENT
   * @readonly
   */
  AMBIENT: 3
});
/**
 * !#en The shadow type
 *
 * !#zh 阴影类型
 * @static
 * @enum Light.ShadowType
 */

var LightShadowType = (0, _CCEnum["default"])({
  /**
   * !#en No shadows
   *
   * !#zh 阴影关闭
   * @property NONE
   * @readonly
   * @type {Number}
   */
  NONE: 0,

  /**
   * !#en Hard shadows
   *
   * !#zh 阴硬影
   * @property HARD
   * @readonly
   * @type {Number}
   */
  HARD: 2,

  /**
   * !#en Soft PCF 3x3 shadows
   *
   * !#zh PCF 3x3 软阴影
   * @property SOFT_PCF3X3
   * @readonly
   * @type {Number}
   */
  SOFT_PCF3X3: 3,

  /**
   * !#en Soft PCF 5x5 shadows
   *
   * !#zh PCF 5x5 软阴影
   * @property SOFT_PCF5X5
   * @readonly
   * @type {Number}
   */
  SOFT_PCF5X5: 4
});
/**
 * !#en The Light Component
 *
 * !#zh 光源组件
 * @class Light
 * @extends Component
 */

var Light = (_dec = (0, _CCClassDecorator.ccclass)('cc.Light'), _dec2 = (0, _CCClassDecorator.menu)('i18n:MAIN_MENU.component.renderers/Light'), _dec3 = (0, _CCClassDecorator.inspector)('packages://inspector/inspectors/comps/light.js'), _dec4 = (0, _CCClassDecorator.property)({
  type: LightType
}), _dec5 = (0, _CCClassDecorator.property)({
  type: LightShadowType
}), _dec(_class = _dec2(_class = (0, _CCClassDecorator.executeInEditMode)(_class = _dec3(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_CCComponent) {
  _inheritsLoose(Light, _CCComponent);

  _createClass(Light, [{
    key: "type",

    /**
     * !#en The light source type，currently we have directional, point, spot three type.
     * !#zh 光源类型，目前有 平行光，聚光灯，点光源 三种类型
     * @type {LightType}
     */
    get: function get() {
      return this._type;
    },
    set: function set(val) {
      this._type = val;
      var type = _enums["default"].LIGHT_DIRECTIONAL;

      if (val === LightType.POINT) {
        type = _enums["default"].LIGHT_POINT;
      } else if (val === LightType.SPOT) {
        type = _enums["default"].LIGHT_SPOT;
      } else if (val === LightType.AMBIENT) {
        type = _enums["default"].LIGHT_AMBIENT;
      }

      this._light.setType(type);
    }
    /**
     * !#en The light source color
     * !#zh 光源颜色
     * @type {Color}
     */

  }, {
    key: "color",
    get: function get() {
      return this._color;
    },
    set: function set(val) {
      if (!this._color.equals(val)) {
        this._color.set(val);
      }

      this._light.setColor(val.r / 255, val.g / 255, val.b / 255);
    }
    /**
     * !#en The light source intensity
     *
     * !#zh 光源强度
     * @type {Number}
     */

  }, {
    key: "intensity",
    get: function get() {
      return this._intensity;
    },
    set: function set(val) {
      this._intensity = val;

      this._light.setIntensity(val);
    }
    /**
     * !#en The light range, used for spot and point light
     *
     * !#zh 针对聚光灯和点光源设置光源范围
     * @type {Number}
     */

  }, {
    key: "range",
    get: function get() {
      return this._range;
    },
    set: function set(val) {
      this._range = val;

      this._light.setRange(val);
    }
    /**
     * !#en The spot light cone angle
     *
     * !#zh 聚光灯锥角
     * @type {Number}
     */

  }, {
    key: "spotAngle",
    get: function get() {
      return this._spotAngle;
    },
    set: function set(val) {
      this._spotAngle = val;

      this._light.setSpotAngle((0, _valueTypes.toRadian)(val));
    }
    /**
     * !#en The spot light exponential
     *
     * !#zh 聚光灯指数
     * @type {Number}
     */

  }, {
    key: "spotExp",
    get: function get() {
      return this._spotExp;
    },
    set: function set(val) {
      this._spotExp = val;

      this._light.setSpotExp(val);
    }
    /**
     * !#en The shadow type
     *
     * !#zh 阴影类型
     * @type {Number} shadowType
     */

  }, {
    key: "shadowType",
    get: function get() {
      return this._shadowType;
    },
    set: function set(val) {
      this._shadowType = val;

      this._light.setShadowType(val);
    }
    /**
     * !#en The shadow resolution
     *
     * !#zh 阴影分辨率
     *
     * @type {Number}
     */

  }, {
    key: "shadowResolution",
    get: function get() {
      return this._shadowResolution;
    },
    set: function set(val) {
      this._shadowResolution = val;

      this._light.setShadowResolution(val);
    }
    /**
     * !#en The shadow darkness
     *
     * !#zh 阴影灰度值
     *
     * @type {Number}
     */

  }, {
    key: "shadowDarkness",
    get: function get() {
      return this._shadowDarkness;
    },
    set: function set(val) {
      this._shadowDarkness = val;

      this._light.setShadowDarkness(val);
    }
    /**
     * !#en The shadow min depth
     *
     * !#zh 阴影最小深度
     *
     * @type {Number}
     */

  }, {
    key: "shadowMinDepth",
    get: function get() {
      return this._shadowMinDepth;
    },
    set: function set(val) {
      this._shadowMinDepth = val;

      this._light.setShadowMinDepth(val);
    }
    /**
     * !#en The shadow max depth
     *
     * !#zh 阴影最大深度
     *
     * @type {Number}
     */

  }, {
    key: "shadowMaxDepth",
    get: function get() {
      return this._shadowMaxDepth;
    },
    set: function set(val) {
      this._shadowMaxDepth = val;

      this._light.setShadowMaxDepth(val);
    }
    /**
     * !#en The shadow frustum size
     *
     * !#zh 阴影截锥体大小
     *
     * @type {Number}
     */

  }, {
    key: "shadowFrustumSize",
    get: function get() {
      return this._shadowFrustumSize;
    },
    set: function set(val) {
      this._shadowFrustumSize = val;

      this._light.setShadowFrustumSize(val);
    } // /**
    //  * !#en The shadow bias
    //  *
    //  * !#zh 阴影偏移量
    //  *
    //  * @type {Number}
    //  */
    // @property
    // get shadowBias() {
    //     return this._shadowBias;
    // }
    // set shadowBias(val) {
    //     this._shadowBias = val;
    //     this._light.setShadowBias(val);
    // }

  }]);

  function Light() {
    var _this;

    _this = _CCComponent.call(this) || this;

    _initializerDefineProperty(_this, "_type", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_color", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_intensity", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_range", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_spotAngle", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_spotExp", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_shadowType", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_shadowResolution", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_shadowDarkness", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_shadowMinDepth", _descriptor10, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_shadowMaxDepth", _descriptor11, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_shadowFrustumSize", _descriptor12, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_shadowBias", _descriptor13, _assertThisInitialized(_this));

    _this._light = new RendererLight();
    return _this;
  }

  var _proto = Light.prototype;

  _proto.onLoad = function onLoad() {
    this._light.setNode(this.node);

    this.type = this._type;
    this.color = this._color;
    this.intensity = this._intensity;
    this.range = this._range;
    this.spotAngle = this._spotAngle;
    this.spotExp = this._spotExp;
    this.shadowType = this._shadowType;
    this.shadowResolution = this._shadowResolution;
    this.shadowDarkness = this._shadowDarkness;
    this.shadowMaxDepth = this._shadowMaxDepth;
    this.shadowFrustumSize = this._shadowFrustumSize;
    this.shadowBias = this._shadowBias;
  };

  _proto.onEnable = function onEnable() {
    _index["default"].scene.addLight(this._light);
  };

  _proto.onDisable = function onDisable() {
    _index["default"].scene.removeLight(this._light);
  };

  return Light;
}(_CCComponent2["default"]), _class3.Type = LightType, _class3.ShadowType = LightShadowType, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_type", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return LightType.DIRECTIONAL;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_color", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _color["default"].WHITE;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_intensity", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_range", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1000;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_spotAngle", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 60;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_spotExp", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_shadowType", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return LightShadowType.NONE;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_shadowResolution", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1024;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_shadowDarkness", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.5;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_shadowMinDepth", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_shadowMaxDepth", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 4096;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_shadowFrustumSize", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1024;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_shadowBias", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.0005;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "type", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "color", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "color"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "intensity", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "intensity"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "range", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "range"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spotAngle", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "spotAngle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spotExp", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "spotExp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shadowType", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "shadowType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shadowResolution", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "shadowResolution"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shadowDarkness", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "shadowDarkness"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shadowMinDepth", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "shadowMinDepth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shadowMaxDepth", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "shadowMaxDepth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shadowFrustumSize", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "shadowFrustumSize"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);
exports["default"] = Light;
cc.Light = Light;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL0NDTGlnaHRDb21wb25lbnQuanMiXSwibmFtZXMiOlsiUmVuZGVyZXJMaWdodCIsIkNDX0pTQiIsIkNDX05BVElWRVJFTkRFUkVSIiwid2luZG93IiwicmVuZGVyZXIiLCJMaWdodCIsInJlcXVpcmUiLCJMaWdodFR5cGUiLCJESVJFQ1RJT05BTCIsIlBPSU5UIiwiU1BPVCIsIkFNQklFTlQiLCJMaWdodFNoYWRvd1R5cGUiLCJOT05FIiwiSEFSRCIsIlNPRlRfUENGM1gzIiwiU09GVF9QQ0Y1WDUiLCJ0eXBlIiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJfdHlwZSIsInZhbCIsImVudW1zIiwiTElHSFRfRElSRUNUSU9OQUwiLCJMSUdIVF9QT0lOVCIsIkxJR0hUX1NQT1QiLCJMSUdIVF9BTUJJRU5UIiwiX2xpZ2h0Iiwic2V0VHlwZSIsIl9jb2xvciIsImVxdWFscyIsInNldCIsInNldENvbG9yIiwiciIsImciLCJiIiwiX2ludGVuc2l0eSIsInNldEludGVuc2l0eSIsIl9yYW5nZSIsInNldFJhbmdlIiwiX3Nwb3RBbmdsZSIsInNldFNwb3RBbmdsZSIsIl9zcG90RXhwIiwic2V0U3BvdEV4cCIsIl9zaGFkb3dUeXBlIiwic2V0U2hhZG93VHlwZSIsIl9zaGFkb3dSZXNvbHV0aW9uIiwic2V0U2hhZG93UmVzb2x1dGlvbiIsIl9zaGFkb3dEYXJrbmVzcyIsInNldFNoYWRvd0RhcmtuZXNzIiwiX3NoYWRvd01pbkRlcHRoIiwic2V0U2hhZG93TWluRGVwdGgiLCJfc2hhZG93TWF4RGVwdGgiLCJzZXRTaGFkb3dNYXhEZXB0aCIsIl9zaGFkb3dGcnVzdHVtU2l6ZSIsInNldFNoYWRvd0ZydXN0dW1TaXplIiwib25Mb2FkIiwic2V0Tm9kZSIsIm5vZGUiLCJjb2xvciIsImludGVuc2l0eSIsInJhbmdlIiwic3BvdEFuZ2xlIiwic3BvdEV4cCIsInNoYWRvd1R5cGUiLCJzaGFkb3dSZXNvbHV0aW9uIiwic2hhZG93RGFya25lc3MiLCJzaGFkb3dNYXhEZXB0aCIsInNoYWRvd0ZydXN0dW1TaXplIiwic2hhZG93QmlhcyIsIl9zaGFkb3dCaWFzIiwib25FbmFibGUiLCJzY2VuZSIsImFkZExpZ2h0Iiwib25EaXNhYmxlIiwicmVtb3ZlTGlnaHQiLCJDQ0NvbXBvbmVudCIsIlR5cGUiLCJTaGFkb3dUeXBlIiwicHJvcGVydHkiLCJDb2xvciIsIldISVRFIiwiY2MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBQ0E7O0FBQ0E7O0FBV0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWkEsSUFBSUEsYUFBYSxHQUFHLElBQXBCOztBQUNBLElBQUlDLE1BQU0sSUFBSUMsaUJBQWQsRUFBaUM7QUFDN0I7QUFDQUYsRUFBQUEsYUFBYSxHQUFHRyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLEtBQWhDO0FBQ0gsQ0FIRCxNQUdPO0FBQ0g7QUFDQUwsRUFBQUEsYUFBYSxHQUFHTSxPQUFPLENBQUMsNEJBQUQsQ0FBdkI7QUFDSDs7QUFPRDs7Ozs7OztBQU9BLElBQU1DLFNBQVMsR0FBRyx3QkFBSztBQUNuQjs7Ozs7OztBQU9BQyxFQUFBQSxXQUFXLEVBQUUsQ0FSTTs7QUFTbkI7Ozs7Ozs7QUFPQUMsRUFBQUEsS0FBSyxFQUFFLENBaEJZOztBQWlCbkI7Ozs7Ozs7QUFPQUMsRUFBQUEsSUFBSSxFQUFFLENBeEJhOztBQTBCbkI7Ozs7OztBQU1BQyxFQUFBQSxPQUFPLEVBQUU7QUFoQ1UsQ0FBTCxDQUFsQjtBQW1DQTs7Ozs7Ozs7QUFPQSxJQUFNQyxlQUFlLEdBQUcsd0JBQUs7QUFDekI7Ozs7Ozs7O0FBUUFDLEVBQUFBLElBQUksRUFBRSxDQVRtQjs7QUFVekI7Ozs7Ozs7O0FBUUFDLEVBQUFBLElBQUksRUFBRSxDQWxCbUI7O0FBbUJ6Qjs7Ozs7Ozs7QUFRQUMsRUFBQUEsV0FBVyxFQUFFLENBM0JZOztBQTRCekI7Ozs7Ozs7O0FBUUFDLEVBQUFBLFdBQVcsRUFBRTtBQXBDWSxD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QkFBOztBQThETEcsRUFBRSxDQUFDNUUsS0FBSCxHQUFXQSxLQUFYIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBlbnVtcyBmcm9tICcuLi8uLi9yZW5kZXJlci9lbnVtcyc7XG5pbXBvcnQgQ29sb3IgZnJvbSAnLi4vdmFsdWUtdHlwZXMvY29sb3InO1xuaW1wb3J0IHsgdG9SYWRpYW4gfSBmcm9tICcuLi92YWx1ZS10eXBlcyc7XG5cbmxldCBSZW5kZXJlckxpZ2h0ID0gbnVsbDtcbmlmIChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgUmVuZGVyZXJMaWdodCA9IHdpbmRvdy5yZW5kZXJlci5MaWdodDtcbn0gZWxzZSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIFJlbmRlcmVyTGlnaHQgPSByZXF1aXJlKCcuLi8uLi9yZW5kZXJlci9zY2VuZS9saWdodCcpO1xufVxuXG5pbXBvcnQgcmVuZGVyZXIgZnJvbSAnLi4vcmVuZGVyZXIvaW5kZXgnO1xuaW1wb3J0IEVudW0gZnJvbSAnLi4vcGxhdGZvcm0vQ0NFbnVtJztcbmltcG9ydCBDQ0NvbXBvbmVudCBmcm9tICcuLi9jb21wb25lbnRzL0NDQ29tcG9uZW50JztcbmltcG9ydCB7IGNjY2xhc3MsIG1lbnUsIGluc3BlY3RvciwgcHJvcGVydHksIGV4ZWN1dGVJbkVkaXRNb2RlIH0gZnJvbSAnLi4vcGxhdGZvcm0vQ0NDbGFzc0RlY29yYXRvcic7XG5cbi8qKlxuICogISNlbiBUaGUgbGlnaHQgc291cmNlIHR5cGVcbiAqXG4gKiAhI3poIOWFiea6kOexu+Wei1xuICogQHN0YXRpY1xuICogQGVudW0gTGlnaHQuVHlwZVxuICovXG5jb25zdCBMaWdodFR5cGUgPSBFbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBkaXJlY3Rpb24gb2YgbGlnaHRcbiAgICAgKlxuICAgICAqICEjemgg5bmz6KGM5YWJXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IERJUkVDVElPTkFMXG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgRElSRUNUSU9OQUw6IDAsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgcG9pbnQgb2YgbGlnaHRcbiAgICAgKlxuICAgICAqICEjemgg54K55YWJ5rqQXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBPSU5UXG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgUE9JTlQ6IDEsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgc3BvdCBvZiBsaWdodFxuICAgICAqXG4gICAgICogISN6aCDogZrlhYnnga9cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU1BPVFxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIFNQT1Q6IDIsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBhbWJpZW50IGxpZ2h0XG4gICAgICogISN6aCDnjq/looPlhYlcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQU1CSUVOVFxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIEFNQklFTlQ6IDNcbn0pO1xuXG4vKipcbiAqICEjZW4gVGhlIHNoYWRvdyB0eXBlXG4gKlxuICogISN6aCDpmLTlvbHnsbvlnotcbiAqIEBzdGF0aWNcbiAqIEBlbnVtIExpZ2h0LlNoYWRvd1R5cGVcbiAqL1xuY29uc3QgTGlnaHRTaGFkb3dUeXBlID0gRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBObyBzaGFkb3dzXG4gICAgICpcbiAgICAgKiAhI3poIOmYtOW9seWFs+mXrVxuICAgICAqIEBwcm9wZXJ0eSBOT05FXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBOT05FOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gSGFyZCBzaGFkb3dzXG4gICAgICpcbiAgICAgKiAhI3poIOmYtOehrOW9sVxuICAgICAqIEBwcm9wZXJ0eSBIQVJEXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBIQVJEOiAyLFxuICAgIC8qKlxuICAgICAqICEjZW4gU29mdCBQQ0YgM3gzIHNoYWRvd3NcbiAgICAgKlxuICAgICAqICEjemggUENGIDN4MyDova/pmLTlvbFcbiAgICAgKiBAcHJvcGVydHkgU09GVF9QQ0YzWDNcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIFNPRlRfUENGM1gzOiAzLFxuICAgIC8qKlxuICAgICAqICEjZW4gU29mdCBQQ0YgNXg1IHNoYWRvd3NcbiAgICAgKlxuICAgICAqICEjemggUENGIDV4NSDova/pmLTlvbFcbiAgICAgKiBAcHJvcGVydHkgU09GVF9QQ0Y1WDVcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIFNPRlRfUENGNVg1OiA0LFxufSk7XG5cbi8qKlxuICogISNlbiBUaGUgTGlnaHQgQ29tcG9uZW50XG4gKlxuICogISN6aCDlhYnmupDnu4Tku7ZcbiAqIEBjbGFzcyBMaWdodFxuICogQGV4dGVuZHMgQ29tcG9uZW50XG4gKi9cbkBjY2NsYXNzKCdjYy5MaWdodCcpXG5AbWVudSgnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnJlbmRlcmVycy9MaWdodCcpXG5AZXhlY3V0ZUluRWRpdE1vZGVcbkBpbnNwZWN0b3IoJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvbGlnaHQuanMnKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlnaHQgZXh0ZW5kcyBDQ0NvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5XG4gICAgX3R5cGUgPSBMaWdodFR5cGUuRElSRUNUSU9OQUw7XG5cbiAgICBAcHJvcGVydHlcbiAgICBfY29sb3IgPSBDb2xvci5XSElURTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIF9pbnRlbnNpdHkgPSAxO1xuXG4gICAgQHByb3BlcnR5XG4gICAgX3JhbmdlID0gMTAwMDtcblxuICAgIEBwcm9wZXJ0eVxuICAgIF9zcG90QW5nbGUgPSA2MDtcblxuICAgIEBwcm9wZXJ0eVxuICAgIF9zcG90RXhwID0gMTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIF9zaGFkb3dUeXBlID0gTGlnaHRTaGFkb3dUeXBlLk5PTkU7XG5cbiAgICBAcHJvcGVydHlcbiAgICBfc2hhZG93UmVzb2x1dGlvbiA9IDEwMjQ7XG5cbiAgICBAcHJvcGVydHlcbiAgICBfc2hhZG93RGFya25lc3MgPSAwLjU7XG5cbiAgICBAcHJvcGVydHlcbiAgICBfc2hhZG93TWluRGVwdGggPSAxO1xuXG4gICAgQHByb3BlcnR5XG4gICAgX3NoYWRvd01heERlcHRoID0gNDA5NjtcblxuICAgIEBwcm9wZXJ0eVxuICAgIF9zaGFkb3dGcnVzdHVtU2l6ZSA9IDEwMjQ7XG5cbiAgICBAcHJvcGVydHlcbiAgICBfc2hhZG93QmlhcyA9IDAuMDAwNTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGxpZ2h0IHNvdXJjZSB0eXBl77yMY3VycmVudGx5IHdlIGhhdmUgZGlyZWN0aW9uYWwsIHBvaW50LCBzcG90IHRocmVlIHR5cGUuXG4gICAgICogISN6aCDlhYnmupDnsbvlnovvvIznm67liY3mnIkg5bmz6KGM5YWJ77yM6IGa5YWJ54Gv77yM54K55YWJ5rqQIOS4ieenjeexu+Wei1xuICAgICAqIEB0eXBlIHtMaWdodFR5cGV9XG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogTGlnaHRUeXBlXG4gICAgfSlcbiAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfVxuXG4gICAgc2V0IHR5cGUodmFsKSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSB2YWw7XG5cbiAgICAgICAgbGV0IHR5cGUgPSBlbnVtcy5MSUdIVF9ESVJFQ1RJT05BTDtcbiAgICAgICAgaWYgKHZhbCA9PT0gTGlnaHRUeXBlLlBPSU5UKSB7XG4gICAgICAgICAgICB0eXBlID0gZW51bXMuTElHSFRfUE9JTlQ7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsID09PSBMaWdodFR5cGUuU1BPVCkge1xuICAgICAgICAgICAgdHlwZSA9IGVudW1zLkxJR0hUX1NQT1Q7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsID09PSBMaWdodFR5cGUuQU1CSUVOVCkge1xuICAgICAgICAgICAgdHlwZSA9IGVudW1zLkxJR0hUX0FNQklFTlQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGlnaHQuc2V0VHlwZSh0eXBlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBsaWdodCBzb3VyY2UgY29sb3JcbiAgICAgKiAhI3poIOWFiea6kOminOiJslxuICAgICAqIEB0eXBlIHtDb2xvcn1cbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBnZXQgY29sb3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcbiAgICB9XG5cbiAgICBzZXQgY29sb3IodmFsKSB7XG4gICAgICAgIGlmICghdGhpcy5fY29sb3IuZXF1YWxzKHZhbCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbG9yLnNldCh2YWwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xpZ2h0LnNldENvbG9yKHZhbC5yIC8gMjU1LCB2YWwuZyAvIDI1NSwgdmFsLmIgLyAyNTUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGxpZ2h0IHNvdXJjZSBpbnRlbnNpdHlcbiAgICAgKlxuICAgICAqICEjemgg5YWJ5rqQ5by65bqmXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBnZXQgaW50ZW5zaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW50ZW5zaXR5O1xuICAgIH1cblxuICAgIHNldCBpbnRlbnNpdHkodmFsKSB7XG4gICAgICAgIHRoaXMuX2ludGVuc2l0eSA9IHZhbDtcbiAgICAgICAgdGhpcy5fbGlnaHQuc2V0SW50ZW5zaXR5KHZhbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgbGlnaHQgcmFuZ2UsIHVzZWQgZm9yIHNwb3QgYW5kIHBvaW50IGxpZ2h0XG4gICAgICpcbiAgICAgKiAhI3poIOmSiOWvueiBmuWFieeBr+WSjOeCueWFiea6kOiuvue9ruWFiea6kOiMg+WbtFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgZ2V0IHJhbmdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmFuZ2U7XG4gICAgfVxuXG4gICAgc2V0IHJhbmdlKHZhbCkge1xuICAgICAgICB0aGlzLl9yYW5nZSA9IHZhbDtcbiAgICAgICAgdGhpcy5fbGlnaHQuc2V0UmFuZ2UodmFsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBzcG90IGxpZ2h0IGNvbmUgYW5nbGVcbiAgICAgKlxuICAgICAqICEjemgg6IGa5YWJ54Gv6ZSl6KeSXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBnZXQgc3BvdEFuZ2xlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3BvdEFuZ2xlO1xuICAgIH1cblxuICAgIHNldCBzcG90QW5nbGUodmFsKSB7XG4gICAgICAgIHRoaXMuX3Nwb3RBbmdsZSA9IHZhbDtcbiAgICAgICAgdGhpcy5fbGlnaHQuc2V0U3BvdEFuZ2xlKHRvUmFkaWFuKHZhbCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHNwb3QgbGlnaHQgZXhwb25lbnRpYWxcbiAgICAgKlxuICAgICAqICEjemgg6IGa5YWJ54Gv5oyH5pWwXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBnZXQgc3BvdEV4cCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nwb3RFeHA7XG4gICAgfVxuXG4gICAgc2V0IHNwb3RFeHAodmFsKSB7XG4gICAgICAgIHRoaXMuX3Nwb3RFeHAgPSB2YWw7XG4gICAgICAgIHRoaXMuX2xpZ2h0LnNldFNwb3RFeHAodmFsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBzaGFkb3cgdHlwZVxuICAgICAqXG4gICAgICogISN6aCDpmLTlvbHnsbvlnotcbiAgICAgKiBAdHlwZSB7TnVtYmVyfSBzaGFkb3dUeXBlXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogTGlnaHRTaGFkb3dUeXBlXG4gICAgfSlcbiAgICBnZXQgc2hhZG93VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYWRvd1R5cGU7XG4gICAgfVxuXG4gICAgc2V0IHNoYWRvd1R5cGUodmFsKSB7XG4gICAgICAgIHRoaXMuX3NoYWRvd1R5cGUgPSB2YWw7XG4gICAgICAgIHRoaXMuX2xpZ2h0LnNldFNoYWRvd1R5cGUodmFsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBzaGFkb3cgcmVzb2x1dGlvblxuICAgICAqXG4gICAgICogISN6aCDpmLTlvbHliIbovqjnjodcbiAgICAgKlxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgZ2V0IHNoYWRvd1Jlc29sdXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFkb3dSZXNvbHV0aW9uO1xuICAgIH1cblxuICAgIHNldCBzaGFkb3dSZXNvbHV0aW9uKHZhbCkge1xuICAgICAgICB0aGlzLl9zaGFkb3dSZXNvbHV0aW9uID0gdmFsO1xuICAgICAgICB0aGlzLl9saWdodC5zZXRTaGFkb3dSZXNvbHV0aW9uKHZhbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgc2hhZG93IGRhcmtuZXNzXG4gICAgICpcbiAgICAgKiAhI3poIOmYtOW9seeBsOW6puWAvFxuICAgICAqXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBnZXQgc2hhZG93RGFya25lc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFkb3dEYXJrbmVzcztcbiAgICB9XG5cbiAgICBzZXQgc2hhZG93RGFya25lc3ModmFsKSB7XG4gICAgICAgIHRoaXMuX3NoYWRvd0RhcmtuZXNzID0gdmFsO1xuICAgICAgICB0aGlzLl9saWdodC5zZXRTaGFkb3dEYXJrbmVzcyh2YWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHNoYWRvdyBtaW4gZGVwdGhcbiAgICAgKlxuICAgICAqICEjemgg6Zi05b2x5pyA5bCP5rex5bqmXG4gICAgICpcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIGdldCBzaGFkb3dNaW5EZXB0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYWRvd01pbkRlcHRoO1xuICAgIH1cblxuICAgIHNldCBzaGFkb3dNaW5EZXB0aCh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2hhZG93TWluRGVwdGggPSB2YWw7XG4gICAgICAgIHRoaXMuX2xpZ2h0LnNldFNoYWRvd01pbkRlcHRoKHZhbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgc2hhZG93IG1heCBkZXB0aFxuICAgICAqXG4gICAgICogISN6aCDpmLTlvbHmnIDlpKfmt7HluqZcbiAgICAgKlxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgZ2V0IHNoYWRvd01heERlcHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hhZG93TWF4RGVwdGg7XG4gICAgfVxuXG4gICAgc2V0IHNoYWRvd01heERlcHRoKHZhbCkge1xuICAgICAgICB0aGlzLl9zaGFkb3dNYXhEZXB0aCA9IHZhbDtcbiAgICAgICAgdGhpcy5fbGlnaHQuc2V0U2hhZG93TWF4RGVwdGgodmFsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBzaGFkb3cgZnJ1c3R1bSBzaXplXG4gICAgICpcbiAgICAgKiAhI3poIOmYtOW9seaIqumUpeS9k+Wkp+Wwj1xuICAgICAqXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBnZXQgc2hhZG93RnJ1c3R1bVNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFkb3dGcnVzdHVtU2l6ZTtcbiAgICB9XG5cbiAgICBzZXQgc2hhZG93RnJ1c3R1bVNpemUodmFsKSB7XG4gICAgICAgIHRoaXMuX3NoYWRvd0ZydXN0dW1TaXplID0gdmFsO1xuICAgICAgICB0aGlzLl9saWdodC5zZXRTaGFkb3dGcnVzdHVtU2l6ZSh2YWwpO1xuICAgIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqICEjZW4gVGhlIHNoYWRvdyBiaWFzXG4gICAgLy8gICpcbiAgICAvLyAgKiAhI3poIOmYtOW9seWBj+enu+mHj1xuICAgIC8vICAqXG4gICAgLy8gICogQHR5cGUge051bWJlcn1cbiAgICAvLyAgKi9cbiAgICAvLyBAcHJvcGVydHlcbiAgICAvLyBnZXQgc2hhZG93QmlhcygpIHtcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuX3NoYWRvd0JpYXM7XG4gICAgLy8gfVxuXG4gICAgLy8gc2V0IHNoYWRvd0JpYXModmFsKSB7XG4gICAgLy8gICAgIHRoaXMuX3NoYWRvd0JpYXMgPSB2YWw7XG4gICAgLy8gICAgIHRoaXMuX2xpZ2h0LnNldFNoYWRvd0JpYXModmFsKTtcbiAgICAvLyB9XG5cbiAgICBzdGF0aWMgVHlwZSA9IExpZ2h0VHlwZTtcblxuICAgIHN0YXRpYyBTaGFkb3dUeXBlID0gTGlnaHRTaGFkb3dUeXBlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fbGlnaHQgPSBuZXcgUmVuZGVyZXJMaWdodCgpO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5fbGlnaHQuc2V0Tm9kZSh0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLl90eXBlO1xuICAgICAgICB0aGlzLmNvbG9yID0gdGhpcy5fY29sb3I7XG4gICAgICAgIHRoaXMuaW50ZW5zaXR5ID0gdGhpcy5faW50ZW5zaXR5O1xuICAgICAgICB0aGlzLnJhbmdlID0gdGhpcy5fcmFuZ2U7XG4gICAgICAgIHRoaXMuc3BvdEFuZ2xlID0gdGhpcy5fc3BvdEFuZ2xlO1xuICAgICAgICB0aGlzLnNwb3RFeHAgPSB0aGlzLl9zcG90RXhwO1xuICAgICAgICB0aGlzLnNoYWRvd1R5cGUgPSB0aGlzLl9zaGFkb3dUeXBlO1xuICAgICAgICB0aGlzLnNoYWRvd1Jlc29sdXRpb24gPSB0aGlzLl9zaGFkb3dSZXNvbHV0aW9uO1xuICAgICAgICB0aGlzLnNoYWRvd0RhcmtuZXNzID0gdGhpcy5fc2hhZG93RGFya25lc3M7XG4gICAgICAgIHRoaXMuc2hhZG93TWF4RGVwdGggPSB0aGlzLl9zaGFkb3dNYXhEZXB0aDtcbiAgICAgICAgdGhpcy5zaGFkb3dGcnVzdHVtU2l6ZSA9IHRoaXMuX3NoYWRvd0ZydXN0dW1TaXplO1xuICAgICAgICB0aGlzLnNoYWRvd0JpYXMgPSB0aGlzLl9zaGFkb3dCaWFzO1xuICAgIH1cblxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICByZW5kZXJlci5zY2VuZS5hZGRMaWdodCh0aGlzLl9saWdodCk7XG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICByZW5kZXJlci5zY2VuZS5yZW1vdmVMaWdodCh0aGlzLl9saWdodCk7XG4gICAgfVxufVxuXG5jYy5MaWdodCA9IExpZ2h0O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=