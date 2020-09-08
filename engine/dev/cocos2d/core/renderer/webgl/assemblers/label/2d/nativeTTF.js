
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/label/2d/nativeTTF.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _materialVariant = _interopRequireDefault(require("../../../../../assets/material/material-variant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Label = require('../../../../../components/CCLabel');

var LabelShadow = require('../../../../../components/CCLabelShadow');

var LabelOutline = require('../../../../../components/CCLabelOutline');

var Material = require('../../../../../assets/material/CCMaterial');

var UPDATE_CONTENT = 1 << 0;
var UPDATE_FONT = 1 << 1;
var UPDATE_EFFECT = 1 << 2;

var NativeTTF = /*#__PURE__*/function () {
  function NativeTTF() {}

  var _proto = NativeTTF.prototype;

  _proto.init = function init(comp) {
    this.labelMaterial = null;
    this._label = this._renderComp = comp;
    renderer.CustomAssembler.prototype.ctor.call(this);

    comp.node._proxy.setAssembler(this);

    this._layout = new jsb.LabelRenderer();

    this._layout.init();

    this._cfg = new DataView(this._layout._cfg);
    this._layoutInfo = new DataView(this._layout._layout);
    this._cfgFields = jsb.LabelRenderer._cfgFields;
    this._layoutFields = jsb.LabelRenderer._layoutFields;

    this._layout.bindNodeProxy(comp.node._proxy);

    this._bindMaterial(comp);
  };

  _proto._setBufferFlag = function _setBufferFlag(dv, offset, size, type, flag) {
    if (type == "int8" && size == 1) {
      var v = dv.getInt8(offset);
      dv.setInt8(offset, flag | v);
    } else if (type == "int32" && size == 4) {
      var _v = dv.getInt32(offset, jsb.__isLittleEndian__);

      dv.setInt32(offset, flag | _v, jsb.__isLittleEndian__);
    } else {
      cc.warn("flag storage type should be int8/int32 only, type/size -> " + type + "/" + size + ".");
    }
  };

  _proto._updateCfgFlag = function _updateCfgFlag(flag) {
    var field = this._cfgFields.updateFlags;

    this._setBufferFlag(this._cfg, field.offset, field.size, field.type, flag);
  };

  _proto._setBufferValue = function _setBufferValue(dv, offset, size, type, value) {
    if (type == "float" && size == 4) {
      dv.setFloat32(offset, value, jsb.__isLittleEndian__);
    } else if (type == "int32" && size == 4) {
      dv.setInt32(offset, value, jsb.__isLittleEndian__);
    } else if (type == "bool" && size == 1) {
      dv.setInt8(offset, !!value ? 1 : 0, jsb.__isLittleEndian__);
    } else if (type == "Color4B" && size == 4) {
      dv.setUint8(offset, value.r);
      dv.setUint8(offset + 1, value.g);
      dv.setUint8(offset + 2, value.b);
      dv.setUint8(offset + 3, value.a);
    } else if (type == "int8" && size == 1) {
      dv.setUint8(offset, value);
    } else {
      cc.warn("dont know how to set value to buffer, type/size -> " + type + "/" + size + ".");
    }
  };

  _proto._setFieldValue = function _setFieldValue(dv, desc, field_name, value) {
    var field = desc[field_name];

    this._setBufferValue(dv, field.offset, field.size, field.type, value);
  };

  _proto._getBufferValue = function _getBufferValue(dv, offset, size, type) {
    if (type == "float" && size == 4) {
      return dv.getFloat32(offset, jsb.__isLittleEndian__);
    } else if (type == "int32" && size == 4) {
      return dv.getInt32(offset, jsb.__isLittleEndian__);
    } else if (type == "bool" && size == 1) {
      return dv.getInt8(offset, jsb.__isLittleEndian__) != 0;
    } else if (type == "Color4B" && size == 4) {
      var r = dv.getUint8(offset);
      var g = dv.getUint8(offset + 1);
      var b = dv.getUint8(offset + 2);
      var a = dv.getUint8(offset + 3);
      return {
        r: r,
        g: g,
        b: b,
        a: a
      };
    } else if (type == "int8" && size == 1) {
      return dv.getUint8(offset);
    } else {
      cc.warn("dont know how to get value from buffer, type/size -> " + type + "/" + size + ".");
      return undefined;
    }
  };

  _proto._getFieldValue = function _getFieldValue(dv, desc, field_name) {
    var field = desc[field_name];
    return this._getBufferValue(dv, field.offset, field.size, field.type);
  };

  _proto._getLayoutValue = function _getLayoutValue(field_name) {
    return this._getFieldValue(this._layoutInfo, this._layoutFields, field_name);
  };

  _proto._setLayoutValue = function _setLayoutValue(field_name, value) {
    return this._setFieldValue(this._layoutInfo, this._layoutFields, field_name, value);
  };

  _proto._updateCfgFlag_Content = function _updateCfgFlag_Content() {
    this._updateCfgFlag(UPDATE_CONTENT);
  };

  _proto._updateCfgFlag_Font = function _updateCfgFlag_Font() {
    this._updateCfgFlag(UPDATE_FONT);
  };

  _proto._colorEqual = function _colorEqual(a, b) {
    return a.r == b.r && a.g == b.g && a.b == b.b && a.a == b.a;
  };

  _proto._colorToObj = function _colorToObj(r, g, b, a) {
    return {
      r: r,
      g: g,
      b: b,
      a: a
    };
  };

  _proto.setString = function setString(str) {
    if (str != this._layout.string) {
      this._layout.string = str;

      this._updateCfgFlag_Content();
    }
  };

  _proto.setFontPath = function setFontPath(path) {
    if (path != this._layout.fontPath) {
      this._layout.fontPath = path;

      this._updateCfgFlag_Font();
    }
  };

  _proto.setFontSize = function setFontSize(fontSize, fontSizeRetina) {
    var oldfontsize = this._getFieldValue(this._cfg, this._cfgFields, "fontSize");

    if (oldfontsize != fontSize) {
      this._setFieldValue(this._cfg, this._cfgFields, "fontSize", fontSize);

      this._setFieldValue(this._cfg, this._cfgFields, "fontSizeRetina", fontSizeRetina);

      this._updateCfgFlag_Font();
    }
  };

  _proto.setOutline = function setOutline(outline) {
    var oldOutline = this._getLayoutValue("outlineSize");

    if (oldOutline > 0 != outline > 0) {
      this._updateCfgFlag_Font();
    }

    if (oldOutline != outline) {
      this._updateCfgFlag_Content();

      this._setLayoutValue("outlineSize", outline);
    }
  };

  _proto.setOutlineColor = function setOutlineColor(color) {
    var oldColor = this._getLayoutValue("outlineColor");

    if (!this._colorEqual(oldColor, color)) {
      this._setLayoutValue("outlineColor", color);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setLineHeight = function setLineHeight(lineHeight) {
    var oldLineHeight = this._getLayoutValue("lineHeight");

    if (oldLineHeight != lineHeight) {
      this._setLayoutValue("lineHeight", lineHeight);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setOverFlow = function setOverFlow(overflow) {
    var oldValue = this._getLayoutValue("overflow");

    if (oldValue != overflow) {
      this._setLayoutValue("overflow", overflow);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setEnableWrap = function setEnableWrap(value) {
    var oldValue = this._getLayoutValue("wrap");

    if (oldValue != value) {
      this._setLayoutValue("wrap", value);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setVerticalAlign = function setVerticalAlign(value) {
    var oldValue = this._getLayoutValue("valign");

    if (oldValue != value) {
      this._setLayoutValue("valign", value);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setHorizontalAlign = function setHorizontalAlign(value) {
    var oldValue = this._getLayoutValue("halign");

    if (oldValue != value) {
      this._setLayoutValue("halign", value);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setContentSize = function setContentSize(width, height) {
    var oldWidth = this._getLayoutValue("width");

    var oldHeight = this._getLayoutValue("height");

    if (oldWidth != width || oldHeight != height) {
      this._setLayoutValue("height", height);

      this._setLayoutValue("width", width);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setAnchorPoint = function setAnchorPoint(x, y) {
    var oldX = this._getLayoutValue("anchorX");

    var oldY = this._getLayoutValue("anchorY");

    if (oldX != x || oldY != y) {
      this._setLayoutValue("anchorX", x);

      this._setLayoutValue("anchorY", y);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setColor = function setColor(color) {
    var oldColor = this._getLayoutValue("color");

    if (!this._colorEqual(oldColor, color)) {
      this._setLayoutValue("color", color);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setShadow = function setShadow(x, y, blur) {
    var oldBlur = this._getLayoutValue("shadowBlur");

    var oldX = this._getLayoutValue("shadowX");

    var oldY = this._getLayoutValue("shadowY");

    if (oldBlur > 0 != blur > 0) {
      this._updateCfgFlag_Font();
    }

    var updateContent = false;

    if (oldBlur != blur) {
      this._setLayoutValue("shadowBlur", blur);

      updateContent = true;
    }

    if (oldX != x) {
      this._setLayoutValue("shadowX", x);

      updateContent = true;
    }

    if (oldY != y) {
      this._setLayoutValue("shadowY", y);

      updateContent = true;
    }

    if (updateContent) {
      this._updateCfgFlag_Content();
    }
  };

  _proto.setShadowColor = function setShadowColor(color) {
    var oldColor = this._getLayoutValue("shadowColor");

    if (!this._colorEqual(oldColor, color)) {
      this._setLayoutValue("shadowColor", color);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setItalic = function setItalic(enabled) {
    var oldItalic = this._getLayoutValue("italic");

    if (oldItalic != enabled) {
      this._setLayoutValue("italic", enabled);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setBold = function setBold(bold) {
    var oldBold = this._getLayoutValue("bold");

    if (oldBold != bold) {
      this._setLayoutValue("bold", bold);

      this._updateCfgFlag_Content();

      this._updateCfgFlag_Font(); //enable sdf

    }
  };

  _proto.setUnderline = function setUnderline(underline) {
    var oldBold = this._getLayoutValue("underline");

    if (oldBold != underline) {
      this._setLayoutValue("underline", underline);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setSpacingX = function setSpacingX(x) {
    var oldX = this._getLayoutValue("spaceX");

    if (oldX != x && typeof x == "number" && !isNaN(x)) {
      this._setLayoutValue("spaceX", x);

      this._updateCfgFlag_Content();
    }
  };

  _proto.updateRenderData = function updateRenderData(comp) {
    if (!comp._vertsDirty) return;

    if (comp.font && comp.font.nativeUrl) {
      this.setFontPath(comp.font.nativeUrl);
    }

    var layout = this._layout;
    var c = comp.node.color;
    var node = comp.node;
    var retinaSize = comp.fontSize;
    this.setString(comp.string);
    this.setFontSize(comp.fontSize, retinaSize / 72 * comp.fontSize);
    this.setLineHeight(comp.lineHeight);
    this.setEnableWrap(comp.enableWrapText);
    this.setItalic(comp.enableItalic);
    this.setUnderline(comp.enableUnderline);
    this.setBold(comp.enableBold);
    this.setOverFlow(comp.overflow);
    this.setVerticalAlign(comp.verticalAlign);
    this.setHorizontalAlign(comp.horizontalAlign);
    this.setSpacingX(comp.spacingX);
    this.setContentSize(node.getContentSize().width, node.getContentSize().height);
    this.setAnchorPoint(node.anchorX, node.anchorY);
    this.setColor(this._colorToObj(c.getR(), c.getG(), c.getB(), Math.ceil(c.getA() * node.opacity / 255)));
    var shadow = node.getComponent(cc.LabelShadow);

    if (shadow && shadow.enabled) {
      var shadowColor = shadow.color;
      this.setShadow(shadow.offset.x, shadow.offset.y, shadow.blur);
      this.setShadowColor(this._colorToObj(shadowColor.getR(), shadowColor.getG(), shadowColor.getB(), Math.ceil(shadowColor.getA() * node.opacity / 255)));
    } else {
      this.setShadow(0, 0, -1);
    }

    this._updateTTFMaterial(comp);

    layout.render(); //comp._vertsDirty = false;
  };

  _proto._bindMaterial = function _bindMaterial(comp) {
    var material = this.labelMaterial;

    if (!material) {
      material = _materialVariant["default"].createWithBuiltin("2d-label", comp);
      this.labelMaterial = material;
    }

    return material;
  };

  _proto._updateTTFMaterial = function _updateTTFMaterial(comp) {
    var material = this._bindMaterial(comp);

    var node = this._label.node;
    var layout = this._layout;
    var outline = node.getComponent(cc.LabelOutline);
    var outlineSize = 0;

    if (outline && outline.enabled && outline.width > 0) {
      outlineSize = Math.max(Math.min(outline.width / 10, 0.4), 0.1);
      var c = outline.color;
      this.setOutlineColor(this._colorToObj(c.getR(), c.getG(), c.getB(), Math.ceil(c.getA() * node.opacity / 255)));
    }

    this.setOutline(outlineSize);
    material.define('CC_USE_MODEL', true);
    material.define('USE_TEXTURE_ALPHAONLY', true);
    material.define('USE_SDF', outlineSize > 0.0 || comp.enableBold);
    material.define('USE_SDF_EXTEND', comp.enableBold ? 1 : 0);

    if (material.getDefine('CC_SUPPORT_standard_derivatives') !== undefined && cc.sys.glExtension('OES_standard_derivatives')) {
      material.define('CC_SUPPORT_standard_derivatives', true);
    }

    layout.setEffect(material.effect._nativeObj);
  };

  _proto.fillBuffers = function fillBuffers(comp, renderer) {
    this._layout.render();
  };

  _proto.getVfmt = function getVfmt() {};

  return NativeTTF;
}();

exports["default"] = NativeTTF;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL2Fzc2VtYmxlcnMvbGFiZWwvMmQvbmF0aXZlVFRGLmpzIl0sIm5hbWVzIjpbIkxhYmVsIiwicmVxdWlyZSIsIkxhYmVsU2hhZG93IiwiTGFiZWxPdXRsaW5lIiwiTWF0ZXJpYWwiLCJVUERBVEVfQ09OVEVOVCIsIlVQREFURV9GT05UIiwiVVBEQVRFX0VGRkVDVCIsIk5hdGl2ZVRURiIsImluaXQiLCJjb21wIiwibGFiZWxNYXRlcmlhbCIsIl9sYWJlbCIsIl9yZW5kZXJDb21wIiwicmVuZGVyZXIiLCJDdXN0b21Bc3NlbWJsZXIiLCJwcm90b3R5cGUiLCJjdG9yIiwiY2FsbCIsIm5vZGUiLCJfcHJveHkiLCJzZXRBc3NlbWJsZXIiLCJfbGF5b3V0IiwianNiIiwiTGFiZWxSZW5kZXJlciIsIl9jZmciLCJEYXRhVmlldyIsIl9sYXlvdXRJbmZvIiwiX2NmZ0ZpZWxkcyIsIl9sYXlvdXRGaWVsZHMiLCJiaW5kTm9kZVByb3h5IiwiX2JpbmRNYXRlcmlhbCIsIl9zZXRCdWZmZXJGbGFnIiwiZHYiLCJvZmZzZXQiLCJzaXplIiwidHlwZSIsImZsYWciLCJ2IiwiZ2V0SW50OCIsInNldEludDgiLCJnZXRJbnQzMiIsIl9faXNMaXR0bGVFbmRpYW5fXyIsInNldEludDMyIiwiY2MiLCJ3YXJuIiwiX3VwZGF0ZUNmZ0ZsYWciLCJmaWVsZCIsInVwZGF0ZUZsYWdzIiwiX3NldEJ1ZmZlclZhbHVlIiwidmFsdWUiLCJzZXRGbG9hdDMyIiwic2V0VWludDgiLCJyIiwiZyIsImIiLCJhIiwiX3NldEZpZWxkVmFsdWUiLCJkZXNjIiwiZmllbGRfbmFtZSIsIl9nZXRCdWZmZXJWYWx1ZSIsImdldEZsb2F0MzIiLCJnZXRVaW50OCIsInVuZGVmaW5lZCIsIl9nZXRGaWVsZFZhbHVlIiwiX2dldExheW91dFZhbHVlIiwiX3NldExheW91dFZhbHVlIiwiX3VwZGF0ZUNmZ0ZsYWdfQ29udGVudCIsIl91cGRhdGVDZmdGbGFnX0ZvbnQiLCJfY29sb3JFcXVhbCIsIl9jb2xvclRvT2JqIiwic2V0U3RyaW5nIiwic3RyIiwic3RyaW5nIiwic2V0Rm9udFBhdGgiLCJwYXRoIiwiZm9udFBhdGgiLCJzZXRGb250U2l6ZSIsImZvbnRTaXplIiwiZm9udFNpemVSZXRpbmEiLCJvbGRmb250c2l6ZSIsInNldE91dGxpbmUiLCJvdXRsaW5lIiwib2xkT3V0bGluZSIsInNldE91dGxpbmVDb2xvciIsImNvbG9yIiwib2xkQ29sb3IiLCJzZXRMaW5lSGVpZ2h0IiwibGluZUhlaWdodCIsIm9sZExpbmVIZWlnaHQiLCJzZXRPdmVyRmxvdyIsIm92ZXJmbG93Iiwib2xkVmFsdWUiLCJzZXRFbmFibGVXcmFwIiwic2V0VmVydGljYWxBbGlnbiIsInNldEhvcml6b250YWxBbGlnbiIsInNldENvbnRlbnRTaXplIiwid2lkdGgiLCJoZWlnaHQiLCJvbGRXaWR0aCIsIm9sZEhlaWdodCIsInNldEFuY2hvclBvaW50IiwieCIsInkiLCJvbGRYIiwib2xkWSIsInNldENvbG9yIiwic2V0U2hhZG93IiwiYmx1ciIsIm9sZEJsdXIiLCJ1cGRhdGVDb250ZW50Iiwic2V0U2hhZG93Q29sb3IiLCJzZXRJdGFsaWMiLCJlbmFibGVkIiwib2xkSXRhbGljIiwic2V0Qm9sZCIsImJvbGQiLCJvbGRCb2xkIiwic2V0VW5kZXJsaW5lIiwidW5kZXJsaW5lIiwic2V0U3BhY2luZ1giLCJpc05hTiIsInVwZGF0ZVJlbmRlckRhdGEiLCJfdmVydHNEaXJ0eSIsImZvbnQiLCJuYXRpdmVVcmwiLCJsYXlvdXQiLCJjIiwicmV0aW5hU2l6ZSIsImVuYWJsZVdyYXBUZXh0IiwiZW5hYmxlSXRhbGljIiwiZW5hYmxlVW5kZXJsaW5lIiwiZW5hYmxlQm9sZCIsInZlcnRpY2FsQWxpZ24iLCJob3Jpem9udGFsQWxpZ24iLCJzcGFjaW5nWCIsImdldENvbnRlbnRTaXplIiwiYW5jaG9yWCIsImFuY2hvclkiLCJnZXRSIiwiZ2V0RyIsImdldEIiLCJNYXRoIiwiY2VpbCIsImdldEEiLCJvcGFjaXR5Iiwic2hhZG93IiwiZ2V0Q29tcG9uZW50Iiwic2hhZG93Q29sb3IiLCJfdXBkYXRlVFRGTWF0ZXJpYWwiLCJyZW5kZXIiLCJtYXRlcmlhbCIsIk1hdGVyaWFsVmFyaWFudCIsImNyZWF0ZVdpdGhCdWlsdGluIiwib3V0bGluZVNpemUiLCJtYXgiLCJtaW4iLCJkZWZpbmUiLCJnZXREZWZpbmUiLCJzeXMiLCJnbEV4dGVuc2lvbiIsInNldEVmZmVjdCIsImVmZmVjdCIsIl9uYXRpdmVPYmoiLCJmaWxsQnVmZmVycyIsImdldFZmbXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUVBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLG1DQUFELENBQXJCOztBQUNBLElBQU1DLFdBQVcsR0FBR0QsT0FBTyxDQUFDLHlDQUFELENBQTNCOztBQUNBLElBQU1FLFlBQVksR0FBR0YsT0FBTyxDQUFDLDBDQUFELENBQTVCOztBQUNBLElBQU1HLFFBQVEsR0FBR0gsT0FBTyxDQUFDLDJDQUFELENBQXhCOztBQUlBLElBQU1JLGNBQWMsR0FBRyxLQUFLLENBQTVCO0FBQ0EsSUFBTUMsV0FBVyxHQUFHLEtBQUssQ0FBekI7QUFDQSxJQUFNQyxhQUFhLEdBQUcsS0FBSyxDQUEzQjs7SUFFcUJDOzs7OztTQUdqQkMsT0FBQSxjQUFLQyxJQUFMLEVBQVc7QUFDUCxTQUFLQyxhQUFMLEdBQXFCLElBQXJCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEtBQUtDLFdBQUwsR0FBbUJILElBQWpDO0FBQ0FJLElBQUFBLFFBQVEsQ0FBQ0MsZUFBVCxDQUF5QkMsU0FBekIsQ0FBbUNDLElBQW5DLENBQXdDQyxJQUF4QyxDQUE2QyxJQUE3Qzs7QUFDQVIsSUFBQUEsSUFBSSxDQUFDUyxJQUFMLENBQVVDLE1BQVYsQ0FBaUJDLFlBQWpCLENBQThCLElBQTlCOztBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxHQUFHLENBQUNDLGFBQVIsRUFBZjs7QUFDQSxTQUFLRixPQUFM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QUFkLElBQXFCaEosSUFBSSxDQUFDMEgsVUFBckQ7QUFDQW1CLElBQUFBLFFBQVEsQ0FBQ00sTUFBVCxDQUFnQixnQkFBaEIsRUFBa0NuSixJQUFJLENBQUMwSCxVQUFMLEdBQWtCLENBQWxCLEdBQXNCLENBQXhEOztBQUNBLFFBQUltQixRQUFRLENBQUNPLFNBQVQsQ0FBbUIsaUNBQW5CLE1BQTBEL0YsU0FBMUQsSUFBdUVuQixFQUFFLENBQUNtSCxHQUFILENBQU9DLFdBQVAsQ0FBbUIsMEJBQW5CLENBQTNFLEVBQTJIO0FBQ3ZIVCxNQUFBQSxRQUFRLENBQUNNLE1BQVQsQ0FBZ0IsaUNBQWhCLEVBQW1ELElBQW5EO0FBQ0g7O0FBQ0QvQixJQUFBQSxNQUFNLENBQUNtQyxTQUFQLENBQWlCVixRQUFRLENBQUNXLE1BQVQsQ0FBZ0JDLFVBQWpDO0FBQ0g7O1NBRURDLGNBQUEscUJBQWExSixJQUFiLEVBQW1CSSxRQUFuQixFQUE2QjtBQUN6QixTQUFLUSxPQUFMLENBQWFnSSxNQUFiO0FBQ0g7O1NBQ0RlLFVBQUEsbUJBQVUsQ0FDVCIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IE1hdGVyaWFsVmFyaWFudCBmcm9tICcuLi8uLi8uLi8uLi8uLi9hc3NldHMvbWF0ZXJpYWwvbWF0ZXJpYWwtdmFyaWFudCc7XG5cbmNvbnN0IExhYmVsID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy9DQ0xhYmVsJyk7XG5jb25zdCBMYWJlbFNoYWRvdyA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvQ0NMYWJlbFNoYWRvdycpO1xuY29uc3QgTGFiZWxPdXRsaW5lID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy9DQ0xhYmVsT3V0bGluZScpO1xuY29uc3QgTWF0ZXJpYWwgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi8uLi9hc3NldHMvbWF0ZXJpYWwvQ0NNYXRlcmlhbCcpO1xuXG5cblxuY29uc3QgVVBEQVRFX0NPTlRFTlQgPSAxIDw8IDA7XG5jb25zdCBVUERBVEVfRk9OVCA9IDEgPDwgMTtcbmNvbnN0IFVQREFURV9FRkZFQ1QgPSAxIDw8IDI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdGl2ZVRURiB7XG5cblxuICAgIGluaXQoY29tcCkge1xuICAgICAgICB0aGlzLmxhYmVsTWF0ZXJpYWwgPSBudWxsO1xuICAgICAgICB0aGlzLl9sYWJlbCA9IHRoaXMuX3JlbmRlckNvbXAgPSBjb21wO1xuICAgICAgICByZW5kZXJlci5DdXN0b21Bc3NlbWJsZXIucHJvdG90eXBlLmN0b3IuY2FsbCh0aGlzKTtcbiAgICAgICAgY29tcC5ub2RlLl9wcm94eS5zZXRBc3NlbWJsZXIodGhpcyk7XG4gICAgICAgIHRoaXMuX2xheW91dCA9IG5ldyBqc2IuTGFiZWxSZW5kZXJlcigpO1xuICAgICAgICB0aGlzLl9sYXlvdXQuaW5pdCgpO1xuICAgICAgICB0aGlzLl9jZmcgPSBuZXcgRGF0YVZpZXcodGhpcy5fbGF5b3V0Ll9jZmcpO1xuICAgICAgICB0aGlzLl9sYXlvdXRJbmZvID0gbmV3IERhdGFWaWV3KHRoaXMuX2xheW91dC5fbGF5b3V0KTtcblxuICAgICAgICB0aGlzLl9jZmdGaWVsZHMgPSBqc2IuTGFiZWxSZW5kZXJlci5fY2ZnRmllbGRzO1xuICAgICAgICB0aGlzLl9sYXlvdXRGaWVsZHMgPSBqc2IuTGFiZWxSZW5kZXJlci5fbGF5b3V0RmllbGRzO1xuICAgICAgICB0aGlzLl9sYXlvdXQuYmluZE5vZGVQcm94eShjb21wLm5vZGUuX3Byb3h5KTtcbiAgICAgICAgdGhpcy5fYmluZE1hdGVyaWFsKGNvbXApO1xuICAgIH1cblxuXG4gICAgX3NldEJ1ZmZlckZsYWcoZHYsIG9mZnNldCwgc2l6ZSwgIHR5cGUsIGZsYWcpe1xuICAgICAgICBpZiAoIHR5cGUgPT0gXCJpbnQ4XCIgICYmIHNpemUgPT0gMSkge1xuICAgICAgICAgICAgbGV0IHYgPSBkdi5nZXRJbnQ4KG9mZnNldCk7XG4gICAgICAgICAgICBkdi5zZXRJbnQ4KG9mZnNldCwgZmxhZyB8IHYpO1xuICAgICAgICB9IGVsc2UgaWYodHlwZSA9PSBcImludDMyXCIgJiYgc2l6ZSA9PSA0KSB7XG4gICAgICAgICAgICBsZXQgdiA9IGR2LmdldEludDMyKG9mZnNldCwganNiLl9faXNMaXR0bGVFbmRpYW5fXyk7XG4gICAgICAgICAgICBkdi5zZXRJbnQzMihvZmZzZXQsIGZsYWd8diAsIGpzYi5fX2lzTGl0dGxlRW5kaWFuX18pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2Mud2FybihcImZsYWcgc3RvcmFnZSB0eXBlIHNob3VsZCBiZSBpbnQ4L2ludDMyIG9ubHksIHR5cGUvc2l6ZSAtPiBcIiArIHR5cGUrXCIvXCIrc2l6ZSArIFwiLlwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF91cGRhdGVDZmdGbGFnKGZsYWcpIHtcbiAgICAgICAgbGV0IGZpZWxkID0gdGhpcy5fY2ZnRmllbGRzLnVwZGF0ZUZsYWdzO1xuICAgICAgICB0aGlzLl9zZXRCdWZmZXJGbGFnKHRoaXMuX2NmZywgZmllbGQub2Zmc2V0LCBmaWVsZC5zaXplLCBmaWVsZC50eXBlLCBmbGFnKTtcbiAgICB9XG5cbiAgICBfc2V0QnVmZmVyVmFsdWUoZHYsIG9mZnNldCwgc2l6ZSwgdHlwZSwgdmFsdWUpIHtcbiAgICAgICAgaWYodHlwZSA9PSBcImZsb2F0XCIgJiYgc2l6ZSA9PSA0KSB7XG4gICAgICAgICAgICBkdi5zZXRGbG9hdDMyKG9mZnNldCwgdmFsdWUsIGpzYi5fX2lzTGl0dGxlRW5kaWFuX18pO1xuICAgICAgICB9IGVsc2UgaWYodHlwZSA9PSBcImludDMyXCIgJiYgc2l6ZSA9PSA0KSB7XG4gICAgICAgICAgICBkdi5zZXRJbnQzMihvZmZzZXQsIHZhbHVlLCBqc2IuX19pc0xpdHRsZUVuZGlhbl9fKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IFwiYm9vbFwiICYmIHNpemUgPT0gMSkge1xuICAgICAgICAgICAgZHYuc2V0SW50OChvZmZzZXQsICEhdmFsdWUgPyAxIDogMCwganNiLl9faXNMaXR0bGVFbmRpYW5fXyk7XG4gICAgICAgIH0gZWxzZSBpZih0eXBlID09IFwiQ29sb3I0QlwiICYmIHNpemUgPT0gNCkge1xuICAgICAgICAgICAgZHYuc2V0VWludDgob2Zmc2V0LCB2YWx1ZS5yKTtcbiAgICAgICAgICAgIGR2LnNldFVpbnQ4KG9mZnNldCArIDEsIHZhbHVlLmcpO1xuICAgICAgICAgICAgZHYuc2V0VWludDgob2Zmc2V0ICsgMiwgdmFsdWUuYik7XG4gICAgICAgICAgICBkdi5zZXRVaW50OChvZmZzZXQgKyAzLCB2YWx1ZS5hKTtcbiAgICAgICAgfSBlbHNlIGlmKHR5cGUgPT0gXCJpbnQ4XCIgJiYgc2l6ZSA9PSAxKSB7XG4gICAgICAgICAgICBkdi5zZXRVaW50OChvZmZzZXQsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNjLndhcm4oXCJkb250IGtub3cgaG93IHRvIHNldCB2YWx1ZSB0byBidWZmZXIsIHR5cGUvc2l6ZSAtPiBcIiArIHR5cGUrXCIvXCIrc2l6ZSArIFwiLlwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9zZXRGaWVsZFZhbHVlKGR2LCBkZXNjLCBmaWVsZF9uYW1lLCB2YWx1ZSkge1xuICAgICAgICBsZXQgZmllbGQgPSBkZXNjW2ZpZWxkX25hbWVdO1xuICAgICAgICB0aGlzLl9zZXRCdWZmZXJWYWx1ZShkdiwgZmllbGQub2Zmc2V0LCBmaWVsZC5zaXplLCBmaWVsZC50eXBlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgX2dldEJ1ZmZlclZhbHVlKGR2LCBvZmZzZXQsIHNpemUsIHR5cGUpIHtcbiAgICAgICAgaWYodHlwZSA9PSBcImZsb2F0XCIgJiYgc2l6ZSA9PSA0KSB7XG4gICAgICAgICAgICByZXR1cm4gZHYuZ2V0RmxvYXQzMihvZmZzZXQsIGpzYi5fX2lzTGl0dGxlRW5kaWFuX18pO1xuICAgICAgICB9IGVsc2UgaWYodHlwZSA9PSBcImludDMyXCIgJiYgc2l6ZSA9PSA0KSB7XG4gICAgICAgICAgICByZXR1cm4gZHYuZ2V0SW50MzIob2Zmc2V0LCBqc2IuX19pc0xpdHRsZUVuZGlhbl9fKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IFwiYm9vbFwiICYmIHNpemUgPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGR2LmdldEludDgob2Zmc2V0LCBqc2IuX19pc0xpdHRsZUVuZGlhbl9fKSAhPSAwO1xuICAgICAgICB9IGVsc2UgaWYodHlwZSA9PSBcIkNvbG9yNEJcIiAmJiBzaXplID09IDQpIHtcbiAgICAgICAgICAgIGxldCByID0gZHYuZ2V0VWludDgob2Zmc2V0KTtcbiAgICAgICAgICAgIGxldCBnID0gZHYuZ2V0VWludDgob2Zmc2V0ICsgMSk7XG4gICAgICAgICAgICBsZXQgYiA9IGR2LmdldFVpbnQ4KG9mZnNldCArIDIpO1xuICAgICAgICAgICAgbGV0IGEgPSBkdi5nZXRVaW50OChvZmZzZXQgKyAzKTtcbiAgICAgICAgICAgIHJldHVybiB7ciwgZywgYiwgYX07XG4gICAgICAgIH0gZWxzZSBpZih0eXBlID09IFwiaW50OFwiICYmIHNpemUgPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGR2LmdldFVpbnQ4KG9mZnNldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy53YXJuKFwiZG9udCBrbm93IGhvdyB0byBnZXQgdmFsdWUgZnJvbSBidWZmZXIsIHR5cGUvc2l6ZSAtPiBcIiArIHR5cGUrXCIvXCIrc2l6ZSArIFwiLlwiKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZ2V0RmllbGRWYWx1ZShkdiwgZGVzYywgZmllbGRfbmFtZSkge1xuICAgICAgICBsZXQgZmllbGQgPSBkZXNjW2ZpZWxkX25hbWVdO1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QnVmZmVyVmFsdWUoZHYsIGZpZWxkLm9mZnNldCwgZmllbGQuc2l6ZSwgZmllbGQudHlwZSk7XG4gICAgfVxuXG4gICAgX2dldExheW91dFZhbHVlKGZpZWxkX25hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEZpZWxkVmFsdWUodGhpcy5fbGF5b3V0SW5mbywgdGhpcy5fbGF5b3V0RmllbGRzLCBmaWVsZF9uYW1lKTtcbiAgICB9XG5cbiAgICBfc2V0TGF5b3V0VmFsdWUoZmllbGRfbmFtZSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldEZpZWxkVmFsdWUodGhpcy5fbGF5b3V0SW5mbywgdGhpcy5fbGF5b3V0RmllbGRzLCBmaWVsZF9uYW1lLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgX3VwZGF0ZUNmZ0ZsYWdfQ29udGVudCgpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZyhVUERBVEVfQ09OVEVOVCk7XG4gICAgfVxuXG4gICAgX3VwZGF0ZUNmZ0ZsYWdfRm9udCgpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZyhVUERBVEVfRk9OVCk7XG4gICAgfVxuICAgIFxuICAgIF9jb2xvckVxdWFsKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEuciA9PSBiLnIgJiYgYS5nID09IGIuZyAmJiBhLmIgPT0gYi5iICYmIGEuYSA9PSBiLmE7XG4gICAgfSBcblxuICAgIF9jb2xvclRvT2JqKHIsIGcsIGIsIGEpIHtcbiAgICAgICAgcmV0dXJuIHtyLCBnLCBiLCBhfTtcbiAgICB9XG5cbiAgICBzZXRTdHJpbmcoc3RyKVxuICAgIHtcbiAgICAgICAgaWYoc3RyICE9IHRoaXMuX2xheW91dC5zdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC5zdHJpbmcgPSBzdHI7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDZmdGbGFnX0NvbnRlbnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEZvbnRQYXRoKHBhdGgpIHtcbiAgICAgICAgaWYocGF0aCAhPSB0aGlzLl9sYXlvdXQuZm9udFBhdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC5mb250UGF0aCA9IHBhdGg7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDZmdGbGFnX0ZvbnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEZvbnRTaXplKGZvbnRTaXplLCBmb250U2l6ZVJldGluYSlcbiAgICB7XG4gICAgICAgIGxldCBvbGRmb250c2l6ZSA9IHRoaXMuX2dldEZpZWxkVmFsdWUodGhpcy5fY2ZnLCB0aGlzLl9jZmdGaWVsZHMsIFwiZm9udFNpemVcIik7XG4gICAgICAgIGlmKG9sZGZvbnRzaXplICE9IGZvbnRTaXplKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRGaWVsZFZhbHVlKHRoaXMuX2NmZywgdGhpcy5fY2ZnRmllbGRzLCBcImZvbnRTaXplXCIsIGZvbnRTaXplKTtcbiAgICAgICAgICAgIHRoaXMuX3NldEZpZWxkVmFsdWUodGhpcy5fY2ZnLCB0aGlzLl9jZmdGaWVsZHMsIFwiZm9udFNpemVSZXRpbmFcIiwgZm9udFNpemVSZXRpbmEpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Gb250KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRPdXRsaW5lKG91dGxpbmUpIHtcbiAgICAgICAgbGV0IG9sZE91dGxpbmUgPSB0aGlzLl9nZXRMYXlvdXRWYWx1ZShcIm91dGxpbmVTaXplXCIpO1xuICAgICAgICBpZigob2xkT3V0bGluZSA+IDApICE9IChvdXRsaW5lID4gMCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNmZ0ZsYWdfRm9udCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9sZE91dGxpbmUgIT0gb3V0bGluZSkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Db250ZW50KCk7XG4gICAgICAgICAgICB0aGlzLl9zZXRMYXlvdXRWYWx1ZShcIm91dGxpbmVTaXplXCIsIG91dGxpbmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0T3V0bGluZUNvbG9yKGNvbG9yKSB7XG4gICAgICAgIGxldCBvbGRDb2xvciA9IHRoaXMuX2dldExheW91dFZhbHVlKCBcIm91dGxpbmVDb2xvclwiKTtcbiAgICAgICAgaWYoIXRoaXMuX2NvbG9yRXF1YWwob2xkQ29sb3IsIGNvbG9yKSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0TGF5b3V0VmFsdWUoXCJvdXRsaW5lQ29sb3JcIiwgY29sb3IpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Db250ZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRMaW5lSGVpZ2h0KGxpbmVIZWlnaHQpIHtcbiAgICAgICAgbGV0IG9sZExpbmVIZWlnaHQgPSB0aGlzLl9nZXRMYXlvdXRWYWx1ZShcImxpbmVIZWlnaHRcIik7XG4gICAgICAgIGlmKG9sZExpbmVIZWlnaHQgIT0gbGluZUhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5fc2V0TGF5b3V0VmFsdWUoXCJsaW5lSGVpZ2h0XCIsIGxpbmVIZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Db250ZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRPdmVyRmxvdyhvdmVyZmxvdykge1xuICAgICAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLl9nZXRMYXlvdXRWYWx1ZShcIm92ZXJmbG93XCIpO1xuICAgICAgICBpZihvbGRWYWx1ZSAhPSBvdmVyZmxvdykge1xuICAgICAgICAgICAgdGhpcy5fc2V0TGF5b3V0VmFsdWUoXCJvdmVyZmxvd1wiLCBvdmVyZmxvdyk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDZmdGbGFnX0NvbnRlbnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEVuYWJsZVdyYXAodmFsdWUpIHtcbiAgICAgICAgbGV0IG9sZFZhbHVlID0gdGhpcy5fZ2V0TGF5b3V0VmFsdWUoXCJ3cmFwXCIpO1xuICAgICAgICBpZihvbGRWYWx1ZSAhPSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0TGF5b3V0VmFsdWUoXCJ3cmFwXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNmZ0ZsYWdfQ29udGVudCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0VmVydGljYWxBbGlnbih2YWx1ZSkge1xuICAgICAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLl9nZXRMYXlvdXRWYWx1ZShcInZhbGlnblwiKTtcbiAgICAgICAgaWYob2xkVmFsdWUgIT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldExheW91dFZhbHVlKFwidmFsaWduXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNmZ0ZsYWdfQ29udGVudCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SG9yaXpvbnRhbEFsaWduKHZhbHVlKSB7XG4gICAgICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMuX2dldExheW91dFZhbHVlKFwiaGFsaWduXCIpO1xuICAgICAgICBpZihvbGRWYWx1ZSAhPSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0TGF5b3V0VmFsdWUoXCJoYWxpZ25cIiwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Db250ZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRDb250ZW50U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGxldCBvbGRXaWR0aCA9IHRoaXMuX2dldExheW91dFZhbHVlKFwid2lkdGhcIik7XG4gICAgICAgIGxldCBvbGRIZWlnaHQgPSB0aGlzLl9nZXRMYXlvdXRWYWx1ZShcImhlaWdodFwiKTtcbiAgICAgICAgaWYob2xkV2lkdGggIT0gd2lkdGggfHwgb2xkSGVpZ2h0ICE9IGhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5fc2V0TGF5b3V0VmFsdWUoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuX3NldExheW91dFZhbHVlKFwid2lkdGhcIiwgd2lkdGgpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Db250ZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRBbmNob3JQb2ludCh4LCB5KSB7XG4gICAgICAgIGxldCBvbGRYID0gdGhpcy5fZ2V0TGF5b3V0VmFsdWUoXCJhbmNob3JYXCIpO1xuICAgICAgICBsZXQgb2xkWSA9IHRoaXMuX2dldExheW91dFZhbHVlKFwiYW5jaG9yWVwiKTtcbiAgICAgICAgaWYob2xkWCAhPSB4IHx8IG9sZFkgIT0geSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0TGF5b3V0VmFsdWUoXCJhbmNob3JYXCIsIHgpO1xuICAgICAgICAgICAgdGhpcy5fc2V0TGF5b3V0VmFsdWUoXCJhbmNob3JZXCIsIHkpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Db250ZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRDb2xvcihjb2xvcikge1xuICAgICAgICBsZXQgb2xkQ29sb3IgPSB0aGlzLl9nZXRMYXlvdXRWYWx1ZShcImNvbG9yXCIpO1xuICAgICAgICBpZighdGhpcy5fY29sb3JFcXVhbChvbGRDb2xvciwgY29sb3IpKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRMYXlvdXRWYWx1ZShcImNvbG9yXCIsIGNvbG9yKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNmZ0ZsYWdfQ29udGVudCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0U2hhZG93KCB4LCB5LCBibHVyKSB7XG4gICAgICAgIGxldCBvbGRCbHVyID0gdGhpcy5fZ2V0TGF5b3V0VmFsdWUoXCJzaGFkb3dCbHVyXCIpO1xuICAgICAgICBsZXQgb2xkWCA9IHRoaXMuX2dldExheW91dFZhbHVlKFwic2hhZG93WFwiKTtcbiAgICAgICAgbGV0IG9sZFkgPSB0aGlzLl9nZXRMYXlvdXRWYWx1ZShcInNoYWRvd1lcIik7XG4gICAgICAgIGlmKChvbGRCbHVyID4gMCkgIT0gKGJsdXIgPiAwKSkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Gb250KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHVwZGF0ZUNvbnRlbnQgPSBmYWxzZTtcbiAgICAgICAgaWYob2xkQmx1ciAhPSBibHVyKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRMYXlvdXRWYWx1ZShcInNoYWRvd0JsdXJcIiwgYmx1cik7XG4gICAgICAgICAgICB1cGRhdGVDb250ZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZihvbGRYICE9IHgpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldExheW91dFZhbHVlKFwic2hhZG93WFwiLCB4KTtcbiAgICAgICAgICAgIHVwZGF0ZUNvbnRlbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9sZFkgIT0geSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0TGF5b3V0VmFsdWUoXCJzaGFkb3dZXCIsIHkpO1xuICAgICAgICAgICAgdXBkYXRlQ29udGVudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYodXBkYXRlQ29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Db250ZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRTaGFkb3dDb2xvcihjb2xvcikge1xuICAgICAgICBsZXQgb2xkQ29sb3IgPSB0aGlzLl9nZXRMYXlvdXRWYWx1ZShcInNoYWRvd0NvbG9yXCIpO1xuICAgICAgICBpZighdGhpcy5fY29sb3JFcXVhbChvbGRDb2xvciwgY29sb3IpKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRMYXlvdXRWYWx1ZShcInNoYWRvd0NvbG9yXCIsIGNvbG9yKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNmZ0ZsYWdfQ29udGVudCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SXRhbGljKGVuYWJsZWQpIHtcbiAgICAgICAgbGV0IG9sZEl0YWxpYyA9IHRoaXMuX2dldExheW91dFZhbHVlKFwiaXRhbGljXCIpO1xuICAgICAgICBpZihvbGRJdGFsaWMhPWVuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldExheW91dFZhbHVlKFwiaXRhbGljXCIsIGVuYWJsZWQpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Db250ZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRCb2xkKGJvbGQpIHtcbiAgICAgICAgbGV0IG9sZEJvbGQgPSB0aGlzLl9nZXRMYXlvdXRWYWx1ZShcImJvbGRcIik7XG4gICAgICAgIGlmKG9sZEJvbGQhPWJvbGQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldExheW91dFZhbHVlKFwiYm9sZFwiLCBib2xkKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNmZ0ZsYWdfQ29udGVudCgpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Gb250KCk7IC8vZW5hYmxlIHNkZlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0VW5kZXJsaW5lKHVuZGVybGluZSlcbiAgICB7XG4gICAgICAgIGxldCBvbGRCb2xkID0gdGhpcy5fZ2V0TGF5b3V0VmFsdWUoXCJ1bmRlcmxpbmVcIik7XG4gICAgICAgIGlmKG9sZEJvbGQgIT0gdW5kZXJsaW5lKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRMYXlvdXRWYWx1ZShcInVuZGVybGluZVwiLCB1bmRlcmxpbmUpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Db250ZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRTcGFjaW5nWCh4KSB7XG4gICAgICAgIGxldCBvbGRYID0gdGhpcy5fZ2V0TGF5b3V0VmFsdWUoXCJzcGFjZVhcIik7XG4gICAgICAgIGlmKG9sZFggIT0geCAmJiB0eXBlb2YgeCA9PSBcIm51bWJlclwiICAmJiAhIGlzTmFOKHgpKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRMYXlvdXRWYWx1ZShcInNwYWNlWFwiLCB4KTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNmZ0ZsYWdfQ29udGVudCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlUmVuZGVyRGF0YShjb21wKSB7XG5cbiAgICAgICAgaWYgKCFjb21wLl92ZXJ0c0RpcnR5KSByZXR1cm47XG5cbiAgICAgICAgaWYgKGNvbXAuZm9udCAmJiBjb21wLmZvbnQubmF0aXZlVXJsKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZvbnRQYXRoKGNvbXAuZm9udC5uYXRpdmVVcmwpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsYXlvdXQgPSB0aGlzLl9sYXlvdXQ7XG4gICAgICAgIGxldCBjID0gY29tcC5ub2RlLmNvbG9yO1xuICAgICAgICBsZXQgbm9kZSA9IGNvbXAubm9kZTtcbiAgICAgICAgbGV0IHJldGluYVNpemUgPSBjb21wLmZvbnRTaXplO1xuXG4gICAgICAgIHRoaXMuc2V0U3RyaW5nKGNvbXAuc3RyaW5nKTtcbiAgICAgICAgdGhpcy5zZXRGb250U2l6ZShjb21wLmZvbnRTaXplLCByZXRpbmFTaXplIC8gNzIgKiBjb21wLmZvbnRTaXplKTtcbiAgICAgICAgdGhpcy5zZXRMaW5lSGVpZ2h0KGNvbXAubGluZUhlaWdodCk7XG4gICAgICAgIHRoaXMuc2V0RW5hYmxlV3JhcChjb21wLmVuYWJsZVdyYXBUZXh0KTtcbiAgICAgICAgdGhpcy5zZXRJdGFsaWMoY29tcC5lbmFibGVJdGFsaWMpO1xuICAgICAgICB0aGlzLnNldFVuZGVybGluZShjb21wLmVuYWJsZVVuZGVybGluZSk7XG4gICAgICAgIHRoaXMuc2V0Qm9sZChjb21wLmVuYWJsZUJvbGQpO1xuICAgICAgICB0aGlzLnNldE92ZXJGbG93KGNvbXAub3ZlcmZsb3cpO1xuICAgICAgICB0aGlzLnNldFZlcnRpY2FsQWxpZ24oY29tcC52ZXJ0aWNhbEFsaWduKTtcbiAgICAgICAgdGhpcy5zZXRIb3Jpem9udGFsQWxpZ24oY29tcC5ob3Jpem9udGFsQWxpZ24pO1xuICAgICAgICB0aGlzLnNldFNwYWNpbmdYKGNvbXAuc3BhY2luZ1gpO1xuICAgICAgICB0aGlzLnNldENvbnRlbnRTaXplKG5vZGUuZ2V0Q29udGVudFNpemUoKS53aWR0aCwgbm9kZS5nZXRDb250ZW50U2l6ZSgpLmhlaWdodCk7XG4gICAgICAgIHRoaXMuc2V0QW5jaG9yUG9pbnQobm9kZS5hbmNob3JYLCBub2RlLmFuY2hvclkpO1xuICAgICAgICB0aGlzLnNldENvbG9yKHRoaXMuX2NvbG9yVG9PYmooYy5nZXRSKCksIGMuZ2V0RygpLCBjLmdldEIoKSwgTWF0aC5jZWlsKGMuZ2V0QSgpICogbm9kZS5vcGFjaXR5IC8gMjU1KSkpO1xuXG5cbiAgICAgICAgbGV0IHNoYWRvdyA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsU2hhZG93KTtcbiAgICAgICAgaWYgKHNoYWRvdyAmJiBzaGFkb3cuZW5hYmxlZCkge1xuICAgICAgICAgICAgbGV0IHNoYWRvd0NvbG9yID0gc2hhZG93LmNvbG9yO1xuICAgICAgICAgICAgdGhpcy5zZXRTaGFkb3coc2hhZG93Lm9mZnNldC54LCBzaGFkb3cub2Zmc2V0LnksIHNoYWRvdy5ibHVyKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U2hhZG93Q29sb3IodGhpcy5fY29sb3JUb09iaihzaGFkb3dDb2xvci5nZXRSKCksIHNoYWRvd0NvbG9yLmdldEcoKSwgc2hhZG93Q29sb3IuZ2V0QigpLCBNYXRoLmNlaWwoc2hhZG93Q29sb3IuZ2V0QSgpICogbm9kZS5vcGFjaXR5IC8gMjU1KSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTaGFkb3coMCwgMCwgLTEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlVFRGTWF0ZXJpYWwoY29tcCk7XG4gICAgICAgIFxuICAgICAgICBsYXlvdXQucmVuZGVyKCk7XG4gICAgICAgIC8vY29tcC5fdmVydHNEaXJ0eSA9IGZhbHNlO1xuICAgIH1cblxuICAgIF9iaW5kTWF0ZXJpYWwoY29tcCkge1xuICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLmxhYmVsTWF0ZXJpYWw7XG4gICAgICAgIGlmKCFtYXRlcmlhbCkge1xuICAgICAgICAgICAgbWF0ZXJpYWwgPSBNYXRlcmlhbFZhcmlhbnQuY3JlYXRlV2l0aEJ1aWx0aW4oXCIyZC1sYWJlbFwiLCBjb21wKTtcbiAgICAgICAgICAgIHRoaXMubGFiZWxNYXRlcmlhbCA9IG1hdGVyaWFsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXRlcmlhbDtcbiAgICB9XG5cbiAgICBfdXBkYXRlVFRGTWF0ZXJpYWwoY29tcCkge1xuICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLl9iaW5kTWF0ZXJpYWwoY29tcClcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLl9sYWJlbC5ub2RlO1xuICAgICAgICBsZXQgbGF5b3V0ID0gdGhpcy5fbGF5b3V0O1xuICAgICAgICBsZXQgb3V0bGluZSA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSk7XG4gICAgICAgIGxldCBvdXRsaW5lU2l6ZSA9IDA7XG4gICAgICAgIGlmIChvdXRsaW5lICYmIG91dGxpbmUuZW5hYmxlZCAmJiBvdXRsaW5lLndpZHRoID4gMCkge1xuICAgICAgICAgICAgb3V0bGluZVNpemUgPSBNYXRoLm1heChNYXRoLm1pbihvdXRsaW5lLndpZHRoIC8gMTAsIDAuNCksIDAuMSk7XG4gICAgICAgICAgICBsZXQgYyA9IG91dGxpbmUuY29sb3I7XG4gICAgICAgICAgICB0aGlzLnNldE91dGxpbmVDb2xvcih0aGlzLl9jb2xvclRvT2JqKGMuZ2V0UigpLCBjLmdldEcoKSwgYy5nZXRCKCksIE1hdGguY2VpbChjLmdldEEoKSAqIG5vZGUub3BhY2l0eSAvIDI1NSkpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldE91dGxpbmUob3V0bGluZVNpemUpO1xuICAgICAgICBtYXRlcmlhbC5kZWZpbmUoJ0NDX1VTRV9NT0RFTCcsIHRydWUpO1xuICAgICAgICBtYXRlcmlhbC5kZWZpbmUoJ1VTRV9URVhUVVJFX0FMUEhBT05MWScsIHRydWUpO1xuICAgICAgICBtYXRlcmlhbC5kZWZpbmUoJ1VTRV9TREYnLCBvdXRsaW5lU2l6ZSA+IDAuMCB8fCBjb21wLmVuYWJsZUJvbGQgKTtcbiAgICAgICAgbWF0ZXJpYWwuZGVmaW5lKCdVU0VfU0RGX0VYVEVORCcsIGNvbXAuZW5hYmxlQm9sZCA/IDEgOiAwKTtcbiAgICAgICAgaWYgKG1hdGVyaWFsLmdldERlZmluZSgnQ0NfU1VQUE9SVF9zdGFuZGFyZF9kZXJpdmF0aXZlcycpICE9PSB1bmRlZmluZWQgJiYgY2Muc3lzLmdsRXh0ZW5zaW9uKCdPRVNfc3RhbmRhcmRfZGVyaXZhdGl2ZXMnKSkge1xuICAgICAgICAgICAgbWF0ZXJpYWwuZGVmaW5lKCdDQ19TVVBQT1JUX3N0YW5kYXJkX2Rlcml2YXRpdmVzJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGF5b3V0LnNldEVmZmVjdChtYXRlcmlhbC5lZmZlY3QuX25hdGl2ZU9iaik7XG4gICAgfVxuXG4gICAgZmlsbEJ1ZmZlcnMgKGNvbXAsIHJlbmRlcmVyKSB7XG4gICAgICAgIHRoaXMuX2xheW91dC5yZW5kZXIoKTtcbiAgICB9XG4gICAgZ2V0VmZtdCgpIHtcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIvIn0=