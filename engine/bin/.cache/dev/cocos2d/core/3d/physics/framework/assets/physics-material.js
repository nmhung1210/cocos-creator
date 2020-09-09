
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/assets/physics-material.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.PhysicsMaterial = void 0;

var _dec, _class, _class2, _descriptor, _descriptor2, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var _cc$_decorator = cc._decorator,
    ccclass = _cc$_decorator.ccclass,
    property = _cc$_decorator.property;
var fastRemove = cc.js.array.fastRemove;
var equals = cc.math.equals;
/**
 * !#en
 * Physics material.
 * !#zh
 * 物理材质。
 * @class PhysicsMaterial
 * @extends Asset
 */

var PhysicsMaterial = (_dec = ccclass('cc.PhysicsMaterial'), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_cc$Asset) {
  _inheritsLoose(PhysicsMaterial, _cc$Asset);

  _createClass(PhysicsMaterial, [{
    key: "friction",

    /**
     * !#en
     * Friction for this material.
     * !#zh
     * 物理材质的摩擦力。
     * @property {number} friction
     */
    get: function get() {
      return this._friction;
    },
    set: function set(value) {
      if (!equals(this._friction, value)) {
        this._friction = value;
        this.emit('physics_material_update');
      }
    }
    /**
     * !#en
     * Restitution for this material.
     * !#zh
     * 物理材质的弹力。
     * @property {number} restitution
     */

  }, {
    key: "restitution",
    get: function get() {
      return this._restitution;
    },
    set: function set(value) {
      if (!equals(this._restitution, value)) {
        this._restitution = value;
        this.emit('physics_material_update');
      }
    }
  }]);

  function PhysicsMaterial() {
    var _this;

    _this = _cc$Asset.call(this) || this;

    _initializerDefineProperty(_this, "_friction", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_restitution", _descriptor2, _assertThisInitialized(_this));

    cc.EventTarget.call(_assertThisInitialized(_this));
    PhysicsMaterial.allMaterials.push(_assertThisInitialized(_this));

    if (_this._uuid == '') {
      _this._uuid = 'pm_' + PhysicsMaterial._idCounter++;
    }

    return _this;
  }

  var _proto = PhysicsMaterial.prototype;

  _proto.clone = function clone() {
    var c = new PhysicsMaterial();
    c._friction = this._friction;
    c._restitution = this._restitution;
    return c;
  };

  _proto.destroy = function destroy() {
    if (_cc$Asset.prototype.destroy.call(this)) {
      fastRemove(PhysicsMaterial.allMaterials, this);
      return true;
    } else {
      return false;
    }
  };

  return PhysicsMaterial;
}(cc.Asset), _class3.allMaterials = [], _class3._idCounter = 0, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_friction", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.1;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_restitution", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.1;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "friction", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "friction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "restitution", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "restitution"), _class2.prototype)), _class2)) || _class);
exports.PhysicsMaterial = PhysicsMaterial;
cc.js.mixin(PhysicsMaterial.prototype, cc.EventTarget.prototype);
cc.PhysicsMaterial = PhysicsMaterial;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvZnJhbWV3b3JrL2Fzc2V0cy9waHlzaWNzLW1hdGVyaWFsLnRzIl0sIm5hbWVzIjpbImNjIiwiX2RlY29yYXRvciIsImNjY2xhc3MiLCJwcm9wZXJ0eSIsImZhc3RSZW1vdmUiLCJqcyIsImFycmF5IiwiZXF1YWxzIiwibWF0aCIsIlBoeXNpY3NNYXRlcmlhbCIsIl9mcmljdGlvbiIsInZhbHVlIiwiZW1pdCIsIl9yZXN0aXR1dGlvbiIsIkV2ZW50VGFyZ2V0IiwiY2FsbCIsImFsbE1hdGVyaWFscyIsInB1c2giLCJfdXVpZCIsIl9pZENvdW50ZXIiLCJjbG9uZSIsImMiLCJkZXN0cm95IiwiQXNzZXQiLCJtaXhpbiIsInByb3RvdHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQXlCNEJBLEVBQUUsQ0FBQ0M7SUFBeEJDLHlCQUFBQTtJQUFTQywwQkFBQUE7QUFDaEIsSUFBTUMsVUFBVSxHQUFHSixFQUFFLENBQUNLLEVBQUgsQ0FBTUMsS0FBTixDQUFZRixVQUEvQjtBQUNBLElBQU1HLE1BQU0sR0FBR1AsRUFBRSxDQUFDUSxJQUFILENBQVFELE1BQXZCO0FBRUE7Ozs7Ozs7OztJQVNhRSwwQkFEWlAsT0FBTyxDQUFDLG9CQUFEOzs7Ozs7QUFhSjs7Ozs7Ozt3QkFRZ0I7QUFDWixhQUFPLEtBQUtRLFNBQVo7QUFDSDtzQkFFYUMsT0FBTztBQUNqQixVQUFJLENBQUNKLE1BQU0sQ0FBQyxLQUFLRyxTQUFOLEVBQWlCQyxLQUFqQixDQUFYLEVBQW9DO0FBQ2hDLGFBQUtELFNBQUwsR0FBaUJDLEtBQWpCO0FBQ0EsYUFBS0MsSUFBTCxDQUFVLHlCQUFWO0FBQ0g7QUFDSjtBQUVEOzs7Ozs7Ozs7O3dCQVFtQjtBQUNmLGFBQU8sS0FBS0MsWUFBWjtBQUNIO3NCQUVnQkYsT0FBTztBQUNwQixVQUFJLENBQUNKLE1BQU0sQ0FBQyxLQUFLTSxZQUFOLEVBQW9CRixLQUFwQixDQUFYLEVBQXVDO0FBQ25DLGFBQUtFLFlBQUwsR0FBb0JGLEtBQXBCO0FBQ0EsYUFBS0MsSUFBTCxDQUFVLHlCQUFWO0FBQ0g7QUFDSjs7O0FBRUQsNkJBQWU7QUFBQTs7QUFDWDs7QUFEVzs7QUFBQTs7QUFFWFosSUFBQUEsRUFBRSxDQUFDYyxXQUFILENBQWVDLElBQWY7QUFDQU4sSUFBQUEsZUFBZSxDQUFDTyxZQUFoQixDQUE2QkMsSUFBN0I7O0FBQ0EsUUFBSSxNQUFLQyxLQUFMLElBQWMsRUFBbEIsRUFBc0I7QUFDbEIsWUFBS0EsS0FBTCxHQUFhLFFBQVFULGVBQWUsQ0FBQ1UsVUFBaEIsRUFBckI7QUFDSDs7QUFOVTtBQU9kOzs7O1NBRU1DLFFBQVAsaUJBQWdCO0FBQ1osUUFBSUMsQ0FBQyxHQUFHLElBQUlaLGVBQUosRUFBUjtBQUNBWSxJQUFBQSxDQUFDLENBQUNYLFNBQUYsR0FBYyxLQUFLQSxTQUFuQjtBQUNBVyxJQUFBQSxDQUFDLENBQUNSLFlBQUYsR0FBaUIsS0FBS0EsWUFBdEI7QUFDQSxXQUFPUSxDQUFQO0FBQ0g7O1NBRU1DLFVBQVAsbUJBQTJCO0FBQ3ZCLDRCQUFVQSxPQUFWLGFBQXFCO0FBQ2pCbEIsTUFBQUEsVUFBVSxDQUFDSyxlQUFlLENBQUNPLFlBQWpCLEVBQStCLElBQS9CLENBQVY7QUFDQSxhQUFPLElBQVA7QUFDSCxLQUhELE1BR087QUFDSCxhQUFPLEtBQVA7QUFDSDtBQUNKOzs7RUF6RWdDaEIsRUFBRSxDQUFDdUIsZ0JBRXRCUCxlQUFrQyxZQUVqQ0csYUFBcUIscUZBRW5DaEI7Ozs7O1dBQ21COztpRkFFbkJBOzs7OztXQUNzQjs7OERBU3RCQSw0SkFtQkFBOztBQXVDTEgsRUFBRSxDQUFDSyxFQUFILENBQU1tQixLQUFOLENBQVlmLGVBQWUsQ0FBQ2dCLFNBQTVCLEVBQXVDekIsRUFBRSxDQUFDYyxXQUFILENBQWVXLFNBQXREO0FBQ0F6QixFQUFFLENBQUNTLGVBQUgsR0FBcUJBLGVBQXJCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuY29uc3QgZmFzdFJlbW92ZSA9IGNjLmpzLmFycmF5LmZhc3RSZW1vdmU7XG5jb25zdCBlcXVhbHMgPSBjYy5tYXRoLmVxdWFscztcblxuLyoqXG4gKiAhI2VuXG4gKiBQaHlzaWNzIG1hdGVyaWFsLlxuICogISN6aFxuICog54mp55CG5p2Q6LSo44CCXG4gKiBAY2xhc3MgUGh5c2ljc01hdGVyaWFsXG4gKiBAZXh0ZW5kcyBBc3NldFxuICovXG5AY2NjbGFzcygnY2MuUGh5c2ljc01hdGVyaWFsJylcbmV4cG9ydCBjbGFzcyBQaHlzaWNzTWF0ZXJpYWwgZXh0ZW5kcyBjYy5Bc3NldCB7XG5cbiAgICBwdWJsaWMgc3RhdGljIGFsbE1hdGVyaWFsczogUGh5c2ljc01hdGVyaWFsW10gPSBbXTtcblxuICAgIHByaXZhdGUgc3RhdGljIF9pZENvdW50ZXI6IG51bWJlciA9IDA7XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9mcmljdGlvbiA9IDAuMTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgX3Jlc3RpdHV0aW9uID0gMC4xO1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEZyaWN0aW9uIGZvciB0aGlzIG1hdGVyaWFsLlxuICAgICAqICEjemhcbiAgICAgKiDniannkIbmnZDotKjnmoTmkanmk6blipvjgIJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gZnJpY3Rpb25cbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBnZXQgZnJpY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZnJpY3Rpb247XG4gICAgfVxuXG4gICAgc2V0IGZyaWN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIWVxdWFscyh0aGlzLl9mcmljdGlvbiwgdmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9mcmljdGlvbiA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdwaHlzaWNzX21hdGVyaWFsX3VwZGF0ZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJlc3RpdHV0aW9uIGZvciB0aGlzIG1hdGVyaWFsLlxuICAgICAqICEjemhcbiAgICAgKiDniannkIbmnZDotKjnmoTlvLnlipvjgIJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gcmVzdGl0dXRpb25cbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBnZXQgcmVzdGl0dXRpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzdGl0dXRpb247XG4gICAgfVxuXG4gICAgc2V0IHJlc3RpdHV0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIWVxdWFscyh0aGlzLl9yZXN0aXR1dGlvbiwgdmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXN0aXR1dGlvbiA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdwaHlzaWNzX21hdGVyaWFsX3VwZGF0ZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjYy5FdmVudFRhcmdldC5jYWxsKHRoaXMpO1xuICAgICAgICBQaHlzaWNzTWF0ZXJpYWwuYWxsTWF0ZXJpYWxzLnB1c2godGhpcyk7XG4gICAgICAgIGlmICh0aGlzLl91dWlkID09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLl91dWlkID0gJ3BtXycgKyBQaHlzaWNzTWF0ZXJpYWwuX2lkQ291bnRlcisrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNsb25lICgpIHtcbiAgICAgICAgbGV0IGMgPSBuZXcgUGh5c2ljc01hdGVyaWFsKCk7XG4gICAgICAgIGMuX2ZyaWN0aW9uID0gdGhpcy5fZnJpY3Rpb247XG4gICAgICAgIGMuX3Jlc3RpdHV0aW9uID0gdGhpcy5fcmVzdGl0dXRpb247XG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXN0cm95ICgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHN1cGVyLmRlc3Ryb3koKSkge1xuICAgICAgICAgICAgZmFzdFJlbW92ZShQaHlzaWNzTWF0ZXJpYWwuYWxsTWF0ZXJpYWxzLCB0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmNjLmpzLm1peGluKFBoeXNpY3NNYXRlcmlhbC5wcm90b3R5cGUsIGNjLkV2ZW50VGFyZ2V0LnByb3RvdHlwZSk7XG5jYy5QaHlzaWNzTWF0ZXJpYWwgPSBQaHlzaWNzTWF0ZXJpYWw7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==