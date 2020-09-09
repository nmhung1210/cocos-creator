
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/utils/label/ttf.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _assembler2d = _interopRequireDefault(require("../../assembler-2d"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var textUtils = require('../../../utils/text-utils');

var macro = require('../../../platform/CCMacro');

var Label = require('../../../components/CCLabel');

var LabelOutline = require('../../../components/CCLabelOutline');

var LabelShadow = require('../../../components/CCLabelShadow');

var Overflow = Label.Overflow;

var deleteFromDynamicAtlas = require('../utils').deleteFromDynamicAtlas;

var getFontFamily = require('../utils').getFontFamily;

var MAX_SIZE = 2048;

var _invisibleAlpha = (1 / 255).toFixed(3);

var _context = null;
var _canvas = null;
var _texture = null;
var _fontDesc = '';
var _string = '';
var _fontSize = 0;
var _drawFontSize = 0;
var _splitedStrings = [];
var _canvasSize = cc.Size.ZERO;
var _lineHeight = 0;
var _hAlign = 0;
var _vAlign = 0;
var _color = null;
var _fontFamily = '';
var _overflow = Overflow.NONE;
var _isWrapText = false;
var _premultiply = false; // outline

var _outlineComp = null;
var _outlineColor = cc.Color.WHITE; // shadow

var _shadowComp = null;
var _shadowColor = cc.Color.BLACK;

var _canvasPadding = cc.rect();

var _contentSizeExtend = cc.Size.ZERO;
var _nodeContentSize = cc.Size.ZERO;
var _enableBold = false;
var _enableItalic = false;
var _enableUnderline = false;
var _underlineThickness = 0;
var _drawUnderlinePos = cc.Vec2.ZERO;
var _drawUnderlineWidth = 0;

var _sharedLabelData;

var Alignment = ['left', // macro.TextAlignment.LEFT
'center', // macro.TextAlignment.CENTER
'right' // macro.TextAlignment.RIGHT
];

var TTFAssembler = /*#__PURE__*/function (_Assembler2D) {
  _inheritsLoose(TTFAssembler, _Assembler2D);

  function TTFAssembler() {
    return _Assembler2D.apply(this, arguments) || this;
  }

  var _proto = TTFAssembler.prototype;

  _proto._getAssemblerData = function _getAssemblerData() {
    _sharedLabelData = Label._canvasPool.get();
    _sharedLabelData.canvas.width = _sharedLabelData.canvas.height = 1;
    return _sharedLabelData;
  };

  _proto._resetAssemblerData = function _resetAssemblerData(assemblerData) {
    if (assemblerData) {
      Label._canvasPool.put(assemblerData);
    }
  };

  _proto.updateRenderData = function updateRenderData(comp) {
    _Assembler2D.prototype.updateRenderData.call(this, comp);

    if (!comp._vertsDirty) return;

    this._updateProperties(comp);

    this._calculateLabelFont();

    this._updateLabelDimensions();

    this._updateTexture(comp);

    this._calDynamicAtlas(comp);

    comp._actualFontSize = _fontSize;
    comp.node.setContentSize(_nodeContentSize);
    this.updateVerts(comp);
    comp._vertsDirty = false;
    _context = null;
    _canvas = null;
    _texture = null;
  };

  _proto.updateVerts = function updateVerts() {};

  _proto._updatePaddingRect = function _updatePaddingRect() {
    var top = 0,
        bottom = 0,
        left = 0,
        right = 0;
    var outlineWidth = 0;
    _contentSizeExtend.width = _contentSizeExtend.height = 0;

    if (_outlineComp) {
      outlineWidth = _outlineComp.width;
      top = bottom = left = right = outlineWidth;
      _contentSizeExtend.width = _contentSizeExtend.height = outlineWidth * 2;
    }

    if (_shadowComp) {
      var shadowWidth = _shadowComp.blur + outlineWidth;
      left = Math.max(left, -_shadowComp._offset.x + shadowWidth);
      right = Math.max(right, _shadowComp._offset.x + shadowWidth);
      top = Math.max(top, _shadowComp._offset.y + shadowWidth);
      bottom = Math.max(bottom, -_shadowComp._offset.y + shadowWidth);
    }

    if (_enableItalic) {
      //0.0174532925 = 3.141592653 / 180
      var offset = _drawFontSize * Math.tan(12 * 0.0174532925);

      right += offset;
      _contentSizeExtend.width += offset;
    }

    _canvasPadding.x = left;
    _canvasPadding.y = top;
    _canvasPadding.width = left + right;
    _canvasPadding.height = top + bottom;
  };

  _proto._updateProperties = function _updateProperties(comp) {
    var assemblerData = comp._assemblerData;
    _context = assemblerData.context;
    _canvas = assemblerData.canvas;
    _texture = comp._frame._original ? comp._frame._original._texture : comp._frame._texture;
    _string = comp.string.toString();
    _fontSize = comp._fontSize;
    _drawFontSize = _fontSize;
    _underlineThickness = comp.underlineHeight || _drawFontSize / 8;
    _overflow = comp.overflow;
    _canvasSize.width = comp.node.width;
    _canvasSize.height = comp.node.height;
    _nodeContentSize = comp.node.getContentSize();
    _lineHeight = comp._lineHeight;
    _hAlign = comp.horizontalAlign;
    _vAlign = comp.verticalAlign;
    _color = comp.node.color;
    _enableBold = comp.enableBold;
    _enableItalic = comp.enableItalic;
    _enableUnderline = comp.enableUnderline;
    _fontFamily = getFontFamily(comp);
    _premultiply = comp.srcBlendFactor === cc.macro.BlendFactor.ONE;

    if (CC_NATIVERENDERER) {
      _context._setPremultiply(_premultiply);
    }

    if (_overflow === Overflow.NONE) {
      _isWrapText = false;
    } else if (_overflow === Overflow.RESIZE_HEIGHT) {
      _isWrapText = true;
    } else {
      _isWrapText = comp.enableWrapText;
    } // outline


    _outlineComp = LabelOutline && comp.getComponent(LabelOutline);
    _outlineComp = _outlineComp && _outlineComp.enabled && _outlineComp.width > 0 ? _outlineComp : null;

    if (_outlineComp) {
      _outlineColor.set(_outlineComp.color);
    } // shadow


    _shadowComp = LabelShadow && comp.getComponent(LabelShadow);
    _shadowComp = _shadowComp && _shadowComp.enabled ? _shadowComp : null;

    if (_shadowComp) {
      _shadowColor.set(_shadowComp.color); // TODO: temporary solution, cascade opacity for outline color


      _shadowColor.a = _shadowColor.a * comp.node.color.a / 255.0;
    }

    this._updatePaddingRect();
  };

  _proto._calculateFillTextStartPosition = function _calculateFillTextStartPosition() {
    var labelX = 0;

    if (_hAlign === macro.TextAlignment.RIGHT) {
      labelX = _canvasSize.width - _canvasPadding.width;
    } else if (_hAlign === macro.TextAlignment.CENTER) {
      labelX = (_canvasSize.width - _canvasPadding.width) / 2;
    }

    var lineHeight = this._getLineHeight();

    var drawStartY = lineHeight * (_splitedStrings.length - 1); // TOP

    var firstLinelabelY = _fontSize * (1 - textUtils.BASELINE_RATIO / 2);

    if (_vAlign !== macro.VerticalTextAlignment.TOP) {
      // free space in vertical direction
      var blank = drawStartY + _canvasPadding.height + _fontSize - _canvasSize.height;

      if (_vAlign === macro.VerticalTextAlignment.BOTTOM) {
        // Unlike BMFont, needs to reserve space below.
        blank += textUtils.BASELINE_RATIO / 2 * _fontSize; // BOTTOM

        firstLinelabelY -= blank;
      } else {
        // CENTER
        firstLinelabelY -= blank / 2;
      }
    }

    firstLinelabelY += textUtils.BASELINE_OFFSET * _fontSize;
    return cc.v2(labelX + _canvasPadding.x, firstLinelabelY + _canvasPadding.y);
  };

  _proto._setupOutline = function _setupOutline() {
    _context.strokeStyle = "rgba(" + _outlineColor.r + ", " + _outlineColor.g + ", " + _outlineColor.b + ", " + _outlineColor.a / 255 + ")";
    _context.lineWidth = _outlineComp.width * 2;
  };

  _proto._setupShadow = function _setupShadow() {
    _context.shadowColor = "rgba(" + _shadowColor.r + ", " + _shadowColor.g + ", " + _shadowColor.b + ", " + _shadowColor.a / 255 + ")";
    _context.shadowBlur = _shadowComp.blur;
    _context.shadowOffsetX = _shadowComp.offset.x;
    _context.shadowOffsetY = -_shadowComp.offset.y;
  };

  _proto._drawTextEffect = function _drawTextEffect(startPosition, lineHeight) {
    if (!_shadowComp && !_outlineComp && !_enableUnderline) return;
    var isMultiple = _splitedStrings.length > 1 && _shadowComp;

    var measureText = this._measureText(_context, _fontDesc);

    var drawTextPosX = 0,
        drawTextPosY = 0; // only one set shadow and outline

    if (_shadowComp) {
      this._setupShadow();
    }

    if (_outlineComp) {
      this._setupOutline();
    } // draw shadow and (outline or text)


    for (var i = 0; i < _splitedStrings.length; ++i) {
      drawTextPosX = startPosition.x;
      drawTextPosY = startPosition.y + i * lineHeight; // multiple lines need to be drawn outline and fill text

      if (isMultiple) {
        if (_outlineComp) {
          _context.strokeText(_splitedStrings[i], drawTextPosX, drawTextPosY);
        }

        _context.fillText(_splitedStrings[i], drawTextPosX, drawTextPosY);
      } // draw underline


      if (_enableUnderline) {
        _drawUnderlineWidth = measureText(_splitedStrings[i]);

        if (_hAlign === macro.TextAlignment.RIGHT) {
          _drawUnderlinePos.x = startPosition.x - _drawUnderlineWidth;
        } else if (_hAlign === macro.TextAlignment.CENTER) {
          _drawUnderlinePos.x = startPosition.x - _drawUnderlineWidth / 2;
        } else {
          _drawUnderlinePos.x = startPosition.x;
        }

        _drawUnderlinePos.y = drawTextPosY + _drawFontSize / 8;

        _context.fillRect(_drawUnderlinePos.x, _drawUnderlinePos.y, _drawUnderlineWidth, _underlineThickness);
      }
    }

    if (isMultiple) {
      _context.shadowColor = 'transparent';
    }
  };

  _proto._updateTexture = function _updateTexture() {
    _context.clearRect(0, 0, _canvas.width, _canvas.height); //Add a white background to avoid black edges.


    if (!_premultiply) {
      //TODO: it is best to add alphaTest to filter out the background color.
      var _fillColor = _outlineComp ? _outlineColor : _color;

      _context.fillStyle = "rgba(" + _fillColor.r + ", " + _fillColor.g + ", " + _fillColor.b + ", " + _invisibleAlpha + ")";

      _context.fillRect(0, 0, _canvas.width, _canvas.height);

      _context.fillStyle = "rgba(" + _color.r + ", " + _color.g + ", " + _color.b + ", 1)";
    } else {
      _context.fillStyle = "rgba(" + _color.r + ", " + _color.g + ", " + _color.b + ", " + _color.a / 255.0 + ")";
    }

    var startPosition = this._calculateFillTextStartPosition();

    var lineHeight = this._getLineHeight();

    var drawTextPosX = startPosition.x,
        drawTextPosY = 0; // draw shadow and underline

    this._drawTextEffect(startPosition, lineHeight); // draw text and outline


    for (var i = 0; i < _splitedStrings.length; ++i) {
      drawTextPosY = startPosition.y + i * lineHeight;

      if (_outlineComp) {
        _context.strokeText(_splitedStrings[i], drawTextPosX, drawTextPosY);
      }

      _context.fillText(_splitedStrings[i], drawTextPosX, drawTextPosY);
    }

    if (_shadowComp) {
      _context.shadowColor = 'transparent';
    }

    _texture.handleLoadedTexture();
  };

  _proto._calDynamicAtlas = function _calDynamicAtlas(comp) {
    if (comp.cacheMode !== Label.CacheMode.BITMAP) return;
    var frame = comp._frame; // Delete cache in atlas.

    deleteFromDynamicAtlas(comp, frame);

    if (!frame._original) {
      frame.setRect(cc.rect(0, 0, _canvas.width, _canvas.height));
    }

    this.packToDynamicAtlas(comp, frame);
  };

  _proto._updateLabelDimensions = function _updateLabelDimensions() {
    _canvasSize.width = Math.min(_canvasSize.width, MAX_SIZE);
    _canvasSize.height = Math.min(_canvasSize.height, MAX_SIZE);
    var recreate = false;

    if (_canvas.width !== _canvasSize.width) {
      _canvas.width = _canvasSize.width;
      recreate = true;
    }

    if (_canvas.height !== _canvasSize.height) {
      _canvas.height = _canvasSize.height;
      recreate = true;
    }

    recreate && (_context.font = _fontDesc); // align

    _context.textAlign = Alignment[_hAlign];
  };

  _proto._getFontDesc = function _getFontDesc() {
    var fontDesc = _fontSize.toString() + 'px ';
    fontDesc = fontDesc + _fontFamily;

    if (_enableBold) {
      fontDesc = "bold " + fontDesc;
    }

    if (_enableItalic) {
      fontDesc = "italic " + fontDesc;
    }

    return fontDesc;
  };

  _proto._getLineHeight = function _getLineHeight() {
    var nodeSpacingY = _lineHeight;

    if (nodeSpacingY === 0) {
      nodeSpacingY = _fontSize;
    } else {
      nodeSpacingY = nodeSpacingY * _fontSize / _drawFontSize;
    }

    return nodeSpacingY | 0;
  };

  _proto._calculateParagraphLength = function _calculateParagraphLength(paragraphedStrings, ctx) {
    var paragraphLength = [];

    for (var i = 0; i < paragraphedStrings.length; ++i) {
      var width = textUtils.safeMeasureText(ctx, paragraphedStrings[i], _fontDesc);
      paragraphLength.push(width);
    }

    return paragraphLength;
  };

  _proto._measureText = function _measureText(ctx, fontDesc) {
    return function (string) {
      return textUtils.safeMeasureText(ctx, string, fontDesc);
    };
  };

  _proto._calculateShrinkFont = function _calculateShrinkFont(paragraphedStrings) {
    var paragraphLength = this._calculateParagraphLength(paragraphedStrings, _context);

    var i = 0;
    var totalHeight = 0;
    var maxLength = 0;

    if (_isWrapText) {
      var canvasWidthNoMargin = _nodeContentSize.width;
      var canvasHeightNoMargin = _nodeContentSize.height;

      if (canvasWidthNoMargin < 0 || canvasHeightNoMargin < 0) {
        return;
      }

      totalHeight = canvasHeightNoMargin + 1;
      var actualFontSize = _fontSize + 1;
      var textFragment = ""; //let startShrinkFontSize = actualFontSize | 0;

      var left = 0,
          right = actualFontSize | 0,
          mid = 0;

      while (left < right) {
        mid = left + right + 1 >> 1;

        if (mid <= 0) {
          cc.logID(4003);
          break;
        }

        _fontSize = mid;
        _fontDesc = this._getFontDesc();
        _context.font = _fontDesc;

        var lineHeight = this._getLineHeight();

        totalHeight = 0;

        for (i = 0; i < paragraphedStrings.length; ++i) {
          var allWidth = textUtils.safeMeasureText(_context, paragraphedStrings[i], _fontDesc);
          textFragment = textUtils.fragmentText(paragraphedStrings[i], allWidth, canvasWidthNoMargin, this._measureText(_context, _fontDesc));
          totalHeight += textFragment.length * lineHeight;
        }

        if (totalHeight > canvasHeightNoMargin) {
          right = mid - 1;
        } else {
          left = mid;
        }
      }

      if (left === 0) {
        cc.logID(4003);
      } else {
        _fontSize = left;
        _fontDesc = this._getFontDesc();
        _context.font = _fontDesc;
      }
    } else {
      totalHeight = paragraphedStrings.length * this._getLineHeight();

      for (i = 0; i < paragraphedStrings.length; ++i) {
        if (maxLength < paragraphLength[i]) {
          maxLength = paragraphLength[i];
        }
      }

      var scaleX = (_canvasSize.width - _canvasPadding.width) / maxLength;
      var scaleY = _canvasSize.height / totalHeight;
      _fontSize = _drawFontSize * Math.min(1, scaleX, scaleY) | 0;
      _fontDesc = this._getFontDesc();
      _context.font = _fontDesc;
    }
  };

  _proto._calculateWrapText = function _calculateWrapText(paragraphedStrings) {
    if (!_isWrapText) return;
    _splitedStrings = [];
    var canvasWidthNoMargin = _nodeContentSize.width;

    for (var i = 0; i < paragraphedStrings.length; ++i) {
      var allWidth = textUtils.safeMeasureText(_context, paragraphedStrings[i], _fontDesc);
      var textFragment = textUtils.fragmentText(paragraphedStrings[i], allWidth, canvasWidthNoMargin, this._measureText(_context, _fontDesc));
      _splitedStrings = _splitedStrings.concat(textFragment);
    }
  };

  _proto._calculateLabelFont = function _calculateLabelFont() {
    var paragraphedStrings = _string.split('\n');

    _splitedStrings = paragraphedStrings;
    _fontDesc = this._getFontDesc();
    _context.font = _fontDesc;

    switch (_overflow) {
      case Overflow.NONE:
        {
          var canvasSizeX = 0;
          var canvasSizeY = 0;

          for (var i = 0; i < paragraphedStrings.length; ++i) {
            var paraLength = textUtils.safeMeasureText(_context, paragraphedStrings[i], _fontDesc);
            canvasSizeX = canvasSizeX > paraLength ? canvasSizeX : paraLength;
          }

          canvasSizeY = (_splitedStrings.length + textUtils.BASELINE_RATIO) * this._getLineHeight();
          var rawWidth = parseFloat(canvasSizeX.toFixed(2));
          var rawHeight = parseFloat(canvasSizeY.toFixed(2));
          _canvasSize.width = rawWidth + _canvasPadding.width;
          _canvasSize.height = rawHeight + _canvasPadding.height;
          _nodeContentSize.width = rawWidth + _contentSizeExtend.width;
          _nodeContentSize.height = rawHeight + _contentSizeExtend.height;
          break;
        }

      case Overflow.SHRINK:
        {
          this._calculateShrinkFont(paragraphedStrings);

          this._calculateWrapText(paragraphedStrings);

          break;
        }

      case Overflow.CLAMP:
        {
          this._calculateWrapText(paragraphedStrings);

          break;
        }

      case Overflow.RESIZE_HEIGHT:
        {
          this._calculateWrapText(paragraphedStrings);

          var _rawHeight = (_splitedStrings.length + textUtils.BASELINE_RATIO) * this._getLineHeight();

          _canvasSize.height = _rawHeight + _canvasPadding.height; // set node height

          _nodeContentSize.height = _rawHeight + _contentSizeExtend.height;
          break;
        }
    }
  };

  return TTFAssembler;
}(_assembler2d["default"]);

exports["default"] = TTFAssembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3V0aWxzL2xhYmVsL3R0Zi5qcyJdLCJuYW1lcyI6WyJ0ZXh0VXRpbHMiLCJyZXF1aXJlIiwibWFjcm8iLCJMYWJlbCIsIkxhYmVsT3V0bGluZSIsIkxhYmVsU2hhZG93IiwiT3ZlcmZsb3ciLCJkZWxldGVGcm9tRHluYW1pY0F0bGFzIiwiZ2V0Rm9udEZhbWlseSIsIk1BWF9TSVpFIiwiX2ludmlzaWJsZUFscGhhIiwidG9GaXhlZCIsIl9jb250ZXh0IiwiX2NhbnZhcyIsIl90ZXh0dXJlIiwiX2ZvbnREZXNjIiwiX3N0cmluZyIsIl9mb250U2l6ZSIsIl9kcmF3Rm9udFNpemUiLCJfc3BsaXRlZFN0cmluZ3MiLCJfY2FudmFzU2l6ZSIsImNjIiwiU2l6ZSIsIlpFUk8iLCJfbGluZUhlaWdodCIsIl9oQWxpZ24iLCJfdkFsaWduIiwiX2NvbG9yIiwiX2ZvbnRGYW1pbHkiLCJfb3ZlcmZsb3ciLCJOT05FIiwiX2lzV3JhcFRleHQiLCJfcHJlbXVsdGlwbHkiLCJfb3V0bGluZUNvbXAiLCJfb3V0bGluZUNvbG9yIiwiQ29sb3IiLCJXSElURSIsIl9zaGFkb3dDb21wIiwiX3NoYWRvd0NvbG9yIiwiQkxBQ0siLCJfY2FudmFzUGFkZGluZyIsInJlY3QiLCJfY29udGVudFNpemVFeHRlbmQiLCJfbm9kZUNvbnRlbnRTaXplIiwiX2VuYWJsZUJvbGQiLCJfZW5hYmxlSXRhbGljIiwiX2VuYWJsZVVuZGVybGluZSIsIl91bmRlcmxpbmVUaGlja25lc3MiLCJfZHJhd1VuZGVybGluZVBvcyIsIlZlYzIiLCJfZHJhd1VuZGVybGluZVdpZHRoIiwiX3NoYXJlZExhYmVsRGF0YSIsIkFsaWdubWVudCIsIlRURkFzc2VtYmxlciIsIl9nZXRBc3NlbWJsZXJEYXRhIiwiX2NhbnZhc1Bvb2wiLCJnZXQiLCJjYW52YXMiLCJ3aWR0aCIsImhlaWdodCIsIl9yZXNldEFzc2VtYmxlckRhdGEiLCJhc3NlbWJsZXJEYXRhIiwicHV0IiwidXBkYXRlUmVuZGVyRGF0YSIsImNvbXAiLCJfdmVydHNEaXJ0eSIsIl91cGRhdGVQcm9wZXJ0aWVzIiwiX2NhbGN1bGF0ZUxhYmVsRm9udCIsIl91cGRhdGVMYWJlbERpbWVuc2lvbnMiLCJfdXBkYXRlVGV4dHVyZSIsIl9jYWxEeW5hbWljQXRsYXMiLCJfYWN0dWFsRm9udFNpemUiLCJub2RlIiwic2V0Q29udGVudFNpemUiLCJ1cGRhdGVWZXJ0cyIsIl91cGRhdGVQYWRkaW5nUmVjdCIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsIm91dGxpbmVXaWR0aCIsInNoYWRvd1dpZHRoIiwiYmx1ciIsIk1hdGgiLCJtYXgiLCJfb2Zmc2V0IiwieCIsInkiLCJvZmZzZXQiLCJ0YW4iLCJfYXNzZW1ibGVyRGF0YSIsImNvbnRleHQiLCJfZnJhbWUiLCJfb3JpZ2luYWwiLCJzdHJpbmciLCJ0b1N0cmluZyIsInVuZGVybGluZUhlaWdodCIsIm92ZXJmbG93IiwiZ2V0Q29udGVudFNpemUiLCJob3Jpem9udGFsQWxpZ24iLCJ2ZXJ0aWNhbEFsaWduIiwiY29sb3IiLCJlbmFibGVCb2xkIiwiZW5hYmxlSXRhbGljIiwiZW5hYmxlVW5kZXJsaW5lIiwic3JjQmxlbmRGYWN0b3IiLCJCbGVuZEZhY3RvciIsIk9ORSIsIkNDX05BVElWRVJFTkRFUkVSIiwiX3NldFByZW11bHRpcGx5IiwiUkVTSVpFX0hFSUdIVCIsImVuYWJsZVdyYXBUZXh0IiwiZ2V0Q29tcG9uZW50IiwiZW5hYmxlZCIsInNldCIsImEiLCJfY2FsY3VsYXRlRmlsbFRleHRTdGFydFBvc2l0aW9uIiwibGFiZWxYIiwiVGV4dEFsaWdubWVudCIsIlJJR0hUIiwiQ0VOVEVSIiwibGluZUhlaWdodCIsIl9nZXRMaW5lSGVpZ2h0IiwiZHJhd1N0YXJ0WSIsImxlbmd0aCIsImZpcnN0TGluZWxhYmVsWSIsIkJBU0VMSU5FX1JBVElPIiwiVmVydGljYWxUZXh0QWxpZ25tZW50IiwiVE9QIiwiYmxhbmsiLCJCT1RUT00iLCJCQVNFTElORV9PRkZTRVQiLCJ2MiIsIl9zZXR1cE91dGxpbmUiLCJzdHJva2VTdHlsZSIsInIiLCJnIiwiYiIsImxpbmVXaWR0aCIsIl9zZXR1cFNoYWRvdyIsInNoYWRvd0NvbG9yIiwic2hhZG93Qmx1ciIsInNoYWRvd09mZnNldFgiLCJzaGFkb3dPZmZzZXRZIiwiX2RyYXdUZXh0RWZmZWN0Iiwic3RhcnRQb3NpdGlvbiIsImlzTXVsdGlwbGUiLCJtZWFzdXJlVGV4dCIsIl9tZWFzdXJlVGV4dCIsImRyYXdUZXh0UG9zWCIsImRyYXdUZXh0UG9zWSIsImkiLCJzdHJva2VUZXh0IiwiZmlsbFRleHQiLCJmaWxsUmVjdCIsImNsZWFyUmVjdCIsIl9maWxsQ29sb3IiLCJmaWxsU3R5bGUiLCJoYW5kbGVMb2FkZWRUZXh0dXJlIiwiY2FjaGVNb2RlIiwiQ2FjaGVNb2RlIiwiQklUTUFQIiwiZnJhbWUiLCJzZXRSZWN0IiwicGFja1RvRHluYW1pY0F0bGFzIiwibWluIiwicmVjcmVhdGUiLCJmb250IiwidGV4dEFsaWduIiwiX2dldEZvbnREZXNjIiwiZm9udERlc2MiLCJub2RlU3BhY2luZ1kiLCJfY2FsY3VsYXRlUGFyYWdyYXBoTGVuZ3RoIiwicGFyYWdyYXBoZWRTdHJpbmdzIiwiY3R4IiwicGFyYWdyYXBoTGVuZ3RoIiwic2FmZU1lYXN1cmVUZXh0IiwicHVzaCIsIl9jYWxjdWxhdGVTaHJpbmtGb250IiwidG90YWxIZWlnaHQiLCJtYXhMZW5ndGgiLCJjYW52YXNXaWR0aE5vTWFyZ2luIiwiY2FudmFzSGVpZ2h0Tm9NYXJnaW4iLCJhY3R1YWxGb250U2l6ZSIsInRleHRGcmFnbWVudCIsIm1pZCIsImxvZ0lEIiwiYWxsV2lkdGgiLCJmcmFnbWVudFRleHQiLCJzY2FsZVgiLCJzY2FsZVkiLCJfY2FsY3VsYXRlV3JhcFRleHQiLCJjb25jYXQiLCJzcGxpdCIsImNhbnZhc1NpemVYIiwiY2FudmFzU2l6ZVkiLCJwYXJhTGVuZ3RoIiwicmF3V2lkdGgiLCJwYXJzZUZsb2F0IiwicmF3SGVpZ2h0IiwiU0hS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QkFBTCxDQUF3QmxCLGtCQUF4Qjs7QUFDQTtBQUNIOztBQUNELFdBQUt2SyxRQUFRLENBQUN3RyxhQUFkO0FBQTZCO0FBQ3pCLGVBQUtpRixrQkFBTCxDQUF3QmxCLGtCQUF4Qjs7QUFDQSxjQUFJMEIsVUFBUyxHQUFHLENBQUNwTCxlQUFlLENBQUN5RyxNQUFoQixHQUF5QjVILFNBQVMsQ0FBQzhILGNBQXBDLElBQXNELEtBQUtKLGNBQUwsRUFBdEU7O0FBQ0F0RyxVQUFBQSxXQUFXLENBQUN1QyxNQUFaLEdBQXFCNEksVUFBUyxHQUFHL0osY0FBYyxDQUFDbUIsTUFBaEQsQ0FIeUIsQ0FJekI7O0FBQ0FoQixVQUFBQSxnQkFBZ0IsQ0FBQ2dCLE1BQWpCLEdBQTBCNEksVUFBUyxHQUFHN0osa0JBQWtCLENBQUNpQixNQUF6RDtBQUNBO0FBQ0g7QUFqQ0w7QUFtQ0g7OztFQWxjcUMrSSIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBBc3NlbWJsZXIyRCBmcm9tICcuLi8uLi9hc3NlbWJsZXItMmQnO1xuXG5sZXQgdGV4dFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbHMvdGV4dC11dGlscycpO1xuY29uc3QgbWFjcm8gPSByZXF1aXJlKCcuLi8uLi8uLi9wbGF0Zm9ybS9DQ01hY3JvJyk7XG5jb25zdCBMYWJlbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbXBvbmVudHMvQ0NMYWJlbCcpO1xuY29uc3QgTGFiZWxPdXRsaW5lID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tcG9uZW50cy9DQ0xhYmVsT3V0bGluZScpO1xuY29uc3QgTGFiZWxTaGFkb3cgPSByZXF1aXJlKCcuLi8uLi8uLi9jb21wb25lbnRzL0NDTGFiZWxTaGFkb3cnKTtcbmNvbnN0IE92ZXJmbG93ID0gTGFiZWwuT3ZlcmZsb3c7XG5jb25zdCBkZWxldGVGcm9tRHluYW1pY0F0bGFzID0gcmVxdWlyZSgnLi4vdXRpbHMnKS5kZWxldGVGcm9tRHluYW1pY0F0bGFzO1xuY29uc3QgZ2V0Rm9udEZhbWlseSA9IHJlcXVpcmUoJy4uL3V0aWxzJykuZ2V0Rm9udEZhbWlseTtcblxuY29uc3QgTUFYX1NJWkUgPSAyMDQ4O1xuY29uc3QgX2ludmlzaWJsZUFscGhhID0gKDEgLyAyNTUpLnRvRml4ZWQoMyk7XG5cbmxldCBfY29udGV4dCA9IG51bGw7XG5sZXQgX2NhbnZhcyA9IG51bGw7XG5sZXQgX3RleHR1cmUgPSBudWxsO1xuXG5sZXQgX2ZvbnREZXNjID0gJyc7XG5sZXQgX3N0cmluZyA9ICcnO1xubGV0IF9mb250U2l6ZSA9IDA7XG5sZXQgX2RyYXdGb250U2l6ZSA9IDA7XG5sZXQgX3NwbGl0ZWRTdHJpbmdzID0gW107XG5sZXQgX2NhbnZhc1NpemUgPSBjYy5TaXplLlpFUk87XG5sZXQgX2xpbmVIZWlnaHQgPSAwO1xubGV0IF9oQWxpZ24gPSAwO1xubGV0IF92QWxpZ24gPSAwO1xubGV0IF9jb2xvciA9IG51bGw7XG5sZXQgX2ZvbnRGYW1pbHkgPSAnJztcbmxldCBfb3ZlcmZsb3cgPSBPdmVyZmxvdy5OT05FO1xubGV0IF9pc1dyYXBUZXh0ID0gZmFsc2U7XG5sZXQgX3ByZW11bHRpcGx5ID0gZmFsc2U7XG5cbi8vIG91dGxpbmVcbmxldCBfb3V0bGluZUNvbXAgPSBudWxsO1xubGV0IF9vdXRsaW5lQ29sb3IgPSBjYy5Db2xvci5XSElURTtcblxuLy8gc2hhZG93XG5sZXQgX3NoYWRvd0NvbXAgPSBudWxsO1xubGV0IF9zaGFkb3dDb2xvciA9IGNjLkNvbG9yLkJMQUNLO1xuXG5sZXQgX2NhbnZhc1BhZGRpbmcgPSBjYy5yZWN0KCk7XG5sZXQgX2NvbnRlbnRTaXplRXh0ZW5kID0gY2MuU2l6ZS5aRVJPO1xubGV0IF9ub2RlQ29udGVudFNpemUgPSBjYy5TaXplLlpFUk87XG5cbmxldCBfZW5hYmxlQm9sZCA9IGZhbHNlO1xubGV0IF9lbmFibGVJdGFsaWMgPSBmYWxzZTtcbmxldCBfZW5hYmxlVW5kZXJsaW5lID0gZmFsc2U7XG5sZXQgX3VuZGVybGluZVRoaWNrbmVzcyA9IDA7XG5cbmxldCBfZHJhd1VuZGVybGluZVBvcyA9IGNjLlZlYzIuWkVSTztcbmxldCBfZHJhd1VuZGVybGluZVdpZHRoID0gMDtcblxubGV0IF9zaGFyZWRMYWJlbERhdGE7XG5cbmNvbnN0IEFsaWdubWVudCA9IFtcbiAgICAnbGVmdCcsIC8vIG1hY3JvLlRleHRBbGlnbm1lbnQuTEVGVFxuICAgICdjZW50ZXInLCAvLyBtYWNyby5UZXh0QWxpZ25tZW50LkNFTlRFUlxuICAgICdyaWdodCcgLy8gbWFjcm8uVGV4dEFsaWdubWVudC5SSUdIVFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVFRGQXNzZW1ibGVyIGV4dGVuZHMgQXNzZW1ibGVyMkQge1xuICAgIF9nZXRBc3NlbWJsZXJEYXRhICgpIHtcbiAgICAgICAgX3NoYXJlZExhYmVsRGF0YSA9IExhYmVsLl9jYW52YXNQb29sLmdldCgpO1xuICAgICAgICBfc2hhcmVkTGFiZWxEYXRhLmNhbnZhcy53aWR0aCA9IF9zaGFyZWRMYWJlbERhdGEuY2FudmFzLmhlaWdodCA9IDE7XG4gICAgICAgIHJldHVybiBfc2hhcmVkTGFiZWxEYXRhO1xuICAgIH1cblxuICAgIF9yZXNldEFzc2VtYmxlckRhdGEgKGFzc2VtYmxlckRhdGEpIHtcbiAgICAgICAgaWYgKGFzc2VtYmxlckRhdGEpIHtcbiAgICAgICAgICAgIExhYmVsLl9jYW52YXNQb29sLnB1dChhc3NlbWJsZXJEYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVJlbmRlckRhdGEgKGNvbXApIHtcbiAgICAgICAgc3VwZXIudXBkYXRlUmVuZGVyRGF0YShjb21wKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghY29tcC5fdmVydHNEaXJ0eSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuX3VwZGF0ZVByb3BlcnRpZXMoY29tcCk7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUxhYmVsRm9udCgpO1xuICAgICAgICB0aGlzLl91cGRhdGVMYWJlbERpbWVuc2lvbnMoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlVGV4dHVyZShjb21wKTtcbiAgICAgICAgdGhpcy5fY2FsRHluYW1pY0F0bGFzKGNvbXApO1xuXG4gICAgICAgIGNvbXAuX2FjdHVhbEZvbnRTaXplID0gX2ZvbnRTaXplO1xuICAgICAgICBjb21wLm5vZGUuc2V0Q29udGVudFNpemUoX25vZGVDb250ZW50U2l6ZSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVWZXJ0cyhjb21wKTtcblxuICAgICAgICBjb21wLl92ZXJ0c0RpcnR5ID0gZmFsc2U7XG5cbiAgICAgICAgX2NvbnRleHQgPSBudWxsO1xuICAgICAgICBfY2FudmFzID0gbnVsbDtcbiAgICAgICAgX3RleHR1cmUgPSBudWxsO1xuICAgIH1cblxuICAgIHVwZGF0ZVZlcnRzICgpIHtcbiAgICB9XG5cbiAgICBfdXBkYXRlUGFkZGluZ1JlY3QgKCkge1xuICAgICAgICBsZXQgdG9wID0gMCwgYm90dG9tID0gMCwgbGVmdCA9IDAsIHJpZ2h0ID0gMDtcbiAgICAgICAgbGV0IG91dGxpbmVXaWR0aCA9IDA7XG4gICAgICAgIF9jb250ZW50U2l6ZUV4dGVuZC53aWR0aCA9IF9jb250ZW50U2l6ZUV4dGVuZC5oZWlnaHQgPSAwO1xuICAgICAgICBpZiAoX291dGxpbmVDb21wKSB7XG4gICAgICAgICAgICBvdXRsaW5lV2lkdGggPSBfb3V0bGluZUNvbXAud2lkdGg7XG4gICAgICAgICAgICB0b3AgPSBib3R0b20gPSBsZWZ0ID0gcmlnaHQgPSBvdXRsaW5lV2lkdGg7XG4gICAgICAgICAgICBfY29udGVudFNpemVFeHRlbmQud2lkdGggPSBfY29udGVudFNpemVFeHRlbmQuaGVpZ2h0ID0gb3V0bGluZVdpZHRoICogMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoX3NoYWRvd0NvbXApIHtcbiAgICAgICAgICAgIGxldCBzaGFkb3dXaWR0aCA9IF9zaGFkb3dDb21wLmJsdXIgKyBvdXRsaW5lV2lkdGg7XG4gICAgICAgICAgICBsZWZ0ID0gTWF0aC5tYXgobGVmdCwgLV9zaGFkb3dDb21wLl9vZmZzZXQueCArIHNoYWRvd1dpZHRoKTtcbiAgICAgICAgICAgIHJpZ2h0ID0gTWF0aC5tYXgocmlnaHQsIF9zaGFkb3dDb21wLl9vZmZzZXQueCArIHNoYWRvd1dpZHRoKTtcbiAgICAgICAgICAgIHRvcCA9IE1hdGgubWF4KHRvcCwgX3NoYWRvd0NvbXAuX29mZnNldC55ICsgc2hhZG93V2lkdGgpO1xuICAgICAgICAgICAgYm90dG9tID0gTWF0aC5tYXgoYm90dG9tLCAtX3NoYWRvd0NvbXAuX29mZnNldC55ICsgc2hhZG93V2lkdGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChfZW5hYmxlSXRhbGljKSB7XG4gICAgICAgICAgICAvLzAuMDE3NDUzMjkyNSA9IDMuMTQxNTkyNjUzIC8gMTgwXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gX2RyYXdGb250U2l6ZSAqIE1hdGgudGFuKDEyICogMC4wMTc0NTMyOTI1KTtcbiAgICAgICAgICAgIHJpZ2h0ICs9IG9mZnNldDtcbiAgICAgICAgICAgIF9jb250ZW50U2l6ZUV4dGVuZC53aWR0aCArPSBvZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgX2NhbnZhc1BhZGRpbmcueCA9IGxlZnQ7XG4gICAgICAgIF9jYW52YXNQYWRkaW5nLnkgPSB0b3A7XG4gICAgICAgIF9jYW52YXNQYWRkaW5nLndpZHRoID0gbGVmdCArIHJpZ2h0O1xuICAgICAgICBfY2FudmFzUGFkZGluZy5oZWlnaHQgPSB0b3AgKyBib3R0b207XG4gICAgfVxuXG4gICAgX3VwZGF0ZVByb3BlcnRpZXMgKGNvbXApIHtcbiAgICAgICAgbGV0IGFzc2VtYmxlckRhdGEgPSBjb21wLl9hc3NlbWJsZXJEYXRhO1xuICAgICAgICBfY29udGV4dCA9IGFzc2VtYmxlckRhdGEuY29udGV4dDtcbiAgICAgICAgX2NhbnZhcyA9IGFzc2VtYmxlckRhdGEuY2FudmFzO1xuICAgICAgICBfdGV4dHVyZSA9IGNvbXAuX2ZyYW1lLl9vcmlnaW5hbCA/IGNvbXAuX2ZyYW1lLl9vcmlnaW5hbC5fdGV4dHVyZSA6IGNvbXAuX2ZyYW1lLl90ZXh0dXJlO1xuXG4gICAgICAgIF9zdHJpbmcgPSBjb21wLnN0cmluZy50b1N0cmluZygpO1xuICAgICAgICBfZm9udFNpemUgPSBjb21wLl9mb250U2l6ZTtcbiAgICAgICAgX2RyYXdGb250U2l6ZSA9IF9mb250U2l6ZTtcbiAgICAgICAgX3VuZGVybGluZVRoaWNrbmVzcyA9IGNvbXAudW5kZXJsaW5lSGVpZ2h0IHx8IF9kcmF3Rm9udFNpemUgLyA4O1xuICAgICAgICBfb3ZlcmZsb3cgPSBjb21wLm92ZXJmbG93O1xuICAgICAgICBfY2FudmFzU2l6ZS53aWR0aCA9IGNvbXAubm9kZS53aWR0aDtcbiAgICAgICAgX2NhbnZhc1NpemUuaGVpZ2h0ID0gY29tcC5ub2RlLmhlaWdodDtcbiAgICAgICAgX25vZGVDb250ZW50U2l6ZSA9IGNvbXAubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xuICAgICAgICBfbGluZUhlaWdodCA9IGNvbXAuX2xpbmVIZWlnaHQ7XG4gICAgICAgIF9oQWxpZ24gPSBjb21wLmhvcml6b250YWxBbGlnbjtcbiAgICAgICAgX3ZBbGlnbiA9IGNvbXAudmVydGljYWxBbGlnbjtcbiAgICAgICAgX2NvbG9yID0gY29tcC5ub2RlLmNvbG9yO1xuICAgICAgICBfZW5hYmxlQm9sZCA9IGNvbXAuZW5hYmxlQm9sZDtcbiAgICAgICAgX2VuYWJsZUl0YWxpYyA9IGNvbXAuZW5hYmxlSXRhbGljO1xuICAgICAgICBfZW5hYmxlVW5kZXJsaW5lID0gY29tcC5lbmFibGVVbmRlcmxpbmU7XG4gICAgICAgIF9mb250RmFtaWx5ID0gZ2V0Rm9udEZhbWlseShjb21wKTtcbiAgICAgICAgX3ByZW11bHRpcGx5ID0gY29tcC5zcmNCbGVuZEZhY3RvciA9PT0gY2MubWFjcm8uQmxlbmRGYWN0b3IuT05FO1xuXG4gICAgICAgIGlmIChDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgX2NvbnRleHQuX3NldFByZW11bHRpcGx5KF9wcmVtdWx0aXBseSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX292ZXJmbG93ID09PSBPdmVyZmxvdy5OT05FKSB7XG4gICAgICAgICAgICBfaXNXcmFwVGV4dCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKF9vdmVyZmxvdyA9PT0gT3ZlcmZsb3cuUkVTSVpFX0hFSUdIVCkge1xuICAgICAgICAgICAgX2lzV3JhcFRleHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX2lzV3JhcFRleHQgPSBjb21wLmVuYWJsZVdyYXBUZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3V0bGluZVxuICAgICAgICBfb3V0bGluZUNvbXAgPSBMYWJlbE91dGxpbmUgJiYgY29tcC5nZXRDb21wb25lbnQoTGFiZWxPdXRsaW5lKTtcbiAgICAgICAgX291dGxpbmVDb21wID0gKF9vdXRsaW5lQ29tcCAmJiBfb3V0bGluZUNvbXAuZW5hYmxlZCAmJiBfb3V0bGluZUNvbXAud2lkdGggPiAwKSA/IF9vdXRsaW5lQ29tcCA6IG51bGw7XG4gICAgICAgIGlmIChfb3V0bGluZUNvbXApIHtcbiAgICAgICAgICAgIF9vdXRsaW5lQ29sb3Iuc2V0KF9vdXRsaW5lQ29tcC5jb2xvcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzaGFkb3dcbiAgICAgICAgX3NoYWRvd0NvbXAgPSBMYWJlbFNoYWRvdyAmJiBjb21wLmdldENvbXBvbmVudChMYWJlbFNoYWRvdyk7XG4gICAgICAgIF9zaGFkb3dDb21wID0gKF9zaGFkb3dDb21wICYmIF9zaGFkb3dDb21wLmVuYWJsZWQpID8gX3NoYWRvd0NvbXAgOiBudWxsO1xuICAgICAgICBpZiAoX3NoYWRvd0NvbXApIHtcbiAgICAgICAgICAgIF9zaGFkb3dDb2xvci5zZXQoX3NoYWRvd0NvbXAuY29sb3IpO1xuICAgICAgICAgICAgLy8gVE9ETzogdGVtcG9yYXJ5IHNvbHV0aW9uLCBjYXNjYWRlIG9wYWNpdHkgZm9yIG91dGxpbmUgY29sb3JcbiAgICAgICAgICAgIF9zaGFkb3dDb2xvci5hID0gX3NoYWRvd0NvbG9yLmEgKiBjb21wLm5vZGUuY29sb3IuYSAvIDI1NS4wO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlUGFkZGluZ1JlY3QoKTtcbiAgICB9XG5cbiAgICBfY2FsY3VsYXRlRmlsbFRleHRTdGFydFBvc2l0aW9uICgpIHtcbiAgICAgICAgbGV0IGxhYmVsWCA9IDA7XG4gICAgICAgIGlmIChfaEFsaWduID09PSBtYWNyby5UZXh0QWxpZ25tZW50LlJJR0hUKSB7XG4gICAgICAgICAgICBsYWJlbFggPSBfY2FudmFzU2l6ZS53aWR0aCAtIF9jYW52YXNQYWRkaW5nLndpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKF9oQWxpZ24gPT09IG1hY3JvLlRleHRBbGlnbm1lbnQuQ0VOVEVSKSB7XG4gICAgICAgICAgICBsYWJlbFggPSAoX2NhbnZhc1NpemUud2lkdGggLSBfY2FudmFzUGFkZGluZy53aWR0aCkgLyAyO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxpbmVIZWlnaHQgPSB0aGlzLl9nZXRMaW5lSGVpZ2h0KCk7XG4gICAgICAgIGxldCBkcmF3U3RhcnRZID0gbGluZUhlaWdodCAqIChfc3BsaXRlZFN0cmluZ3MubGVuZ3RoIC0gMSk7XG4gICAgICAgIC8vIFRPUFxuICAgICAgICBsZXQgZmlyc3RMaW5lbGFiZWxZID0gX2ZvbnRTaXplICogKDEgLSB0ZXh0VXRpbHMuQkFTRUxJTkVfUkFUSU8gLyAyKTtcbiAgICAgICAgaWYgKF92QWxpZ24gIT09IG1hY3JvLlZlcnRpY2FsVGV4dEFsaWdubWVudC5UT1ApIHtcbiAgICAgICAgICAgIC8vIGZyZWUgc3BhY2UgaW4gdmVydGljYWwgZGlyZWN0aW9uXG4gICAgICAgICAgICBsZXQgYmxhbmsgPSBkcmF3U3RhcnRZICsgX2NhbnZhc1BhZGRpbmcuaGVpZ2h0ICsgX2ZvbnRTaXplIC0gX2NhbnZhc1NpemUuaGVpZ2h0O1xuICAgICAgICAgICAgaWYgKF92QWxpZ24gPT09IG1hY3JvLlZlcnRpY2FsVGV4dEFsaWdubWVudC5CT1RUT00pIHtcbiAgICAgICAgICAgICAgICAvLyBVbmxpa2UgQk1Gb250LCBuZWVkcyB0byByZXNlcnZlIHNwYWNlIGJlbG93LlxuICAgICAgICAgICAgICAgIGJsYW5rICs9IHRleHRVdGlscy5CQVNFTElORV9SQVRJTyAvIDIgKiBfZm9udFNpemU7XG4gICAgICAgICAgICAgICAgLy8gQk9UVE9NXG4gICAgICAgICAgICAgICAgZmlyc3RMaW5lbGFiZWxZIC09IGJsYW5rO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBDRU5URVJcbiAgICAgICAgICAgICAgICBmaXJzdExpbmVsYWJlbFkgLT0gYmxhbmsgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZmlyc3RMaW5lbGFiZWxZICs9IHRleHRVdGlscy5CQVNFTElORV9PRkZTRVQgKiBfZm9udFNpemU7XG5cbiAgICAgICAgcmV0dXJuIGNjLnYyKGxhYmVsWCArIF9jYW52YXNQYWRkaW5nLngsIGZpcnN0TGluZWxhYmVsWSArIF9jYW52YXNQYWRkaW5nLnkpO1xuICAgIH1cblxuICAgIF9zZXR1cE91dGxpbmUgKCkge1xuICAgICAgICBfY29udGV4dC5zdHJva2VTdHlsZSA9IGByZ2JhKCR7X291dGxpbmVDb2xvci5yfSwgJHtfb3V0bGluZUNvbG9yLmd9LCAke19vdXRsaW5lQ29sb3IuYn0sICR7X291dGxpbmVDb2xvci5hIC8gMjU1fSlgO1xuICAgICAgICBfY29udGV4dC5saW5lV2lkdGggPSBfb3V0bGluZUNvbXAud2lkdGggKiAyO1xuICAgIH1cblxuICAgIF9zZXR1cFNoYWRvdyAoKSB7XG4gICAgICAgIF9jb250ZXh0LnNoYWRvd0NvbG9yID0gYHJnYmEoJHtfc2hhZG93Q29sb3Iucn0sICR7X3NoYWRvd0NvbG9yLmd9LCAke19zaGFkb3dDb2xvci5ifSwgJHtfc2hhZG93Q29sb3IuYSAvIDI1NX0pYDtcbiAgICAgICAgX2NvbnRleHQuc2hhZG93Qmx1ciA9IF9zaGFkb3dDb21wLmJsdXI7XG4gICAgICAgIF9jb250ZXh0LnNoYWRvd09mZnNldFggPSBfc2hhZG93Q29tcC5vZmZzZXQueDtcbiAgICAgICAgX2NvbnRleHQuc2hhZG93T2Zmc2V0WSA9IC1fc2hhZG93Q29tcC5vZmZzZXQueTtcbiAgICB9XG5cbiAgICBfZHJhd1RleHRFZmZlY3QgKHN0YXJ0UG9zaXRpb24sIGxpbmVIZWlnaHQpIHtcbiAgICAgICAgaWYgKCFfc2hhZG93Q29tcCAmJiAhX291dGxpbmVDb21wICYmICFfZW5hYmxlVW5kZXJsaW5lKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGlzTXVsdGlwbGUgPSBfc3BsaXRlZFN0cmluZ3MubGVuZ3RoID4gMSAmJiBfc2hhZG93Q29tcDtcbiAgICAgICAgbGV0IG1lYXN1cmVUZXh0ID0gdGhpcy5fbWVhc3VyZVRleHQoX2NvbnRleHQsIF9mb250RGVzYyk7XG4gICAgICAgIGxldCBkcmF3VGV4dFBvc1ggPSAwLCBkcmF3VGV4dFBvc1kgPSAwO1xuXG4gICAgICAgIC8vIG9ubHkgb25lIHNldCBzaGFkb3cgYW5kIG91dGxpbmVcbiAgICAgICAgaWYgKF9zaGFkb3dDb21wKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR1cFNoYWRvdygpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoX291dGxpbmVDb21wKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR1cE91dGxpbmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRyYXcgc2hhZG93IGFuZCAob3V0bGluZSBvciB0ZXh0KVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9zcGxpdGVkU3RyaW5ncy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgZHJhd1RleHRQb3NYID0gc3RhcnRQb3NpdGlvbi54O1xuICAgICAgICAgICAgZHJhd1RleHRQb3NZID0gc3RhcnRQb3NpdGlvbi55ICsgaSAqIGxpbmVIZWlnaHQ7XG4gICAgICAgICAgICAvLyBtdWx0aXBsZSBsaW5lcyBuZWVkIHRvIGJlIGRyYXduIG91dGxpbmUgYW5kIGZpbGwgdGV4dFxuICAgICAgICAgICAgaWYgKGlzTXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoX291dGxpbmVDb21wKSB7XG4gICAgICAgICAgICAgICAgICAgIF9jb250ZXh0LnN0cm9rZVRleHQoX3NwbGl0ZWRTdHJpbmdzW2ldLCBkcmF3VGV4dFBvc1gsIGRyYXdUZXh0UG9zWSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9jb250ZXh0LmZpbGxUZXh0KF9zcGxpdGVkU3RyaW5nc1tpXSwgZHJhd1RleHRQb3NYLCBkcmF3VGV4dFBvc1kpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkcmF3IHVuZGVybGluZVxuICAgICAgICAgICAgaWYgKF9lbmFibGVVbmRlcmxpbmUpIHtcbiAgICAgICAgICAgICAgICBfZHJhd1VuZGVybGluZVdpZHRoID0gbWVhc3VyZVRleHQoX3NwbGl0ZWRTdHJpbmdzW2ldKTtcbiAgICAgICAgICAgICAgICBpZiAoX2hBbGlnbiA9PT0gbWFjcm8uVGV4dEFsaWdubWVudC5SSUdIVCkge1xuICAgICAgICAgICAgICAgICAgICBfZHJhd1VuZGVybGluZVBvcy54ID0gc3RhcnRQb3NpdGlvbi54IC0gX2RyYXdVbmRlcmxpbmVXaWR0aDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF9oQWxpZ24gPT09IG1hY3JvLlRleHRBbGlnbm1lbnQuQ0VOVEVSKSB7XG4gICAgICAgICAgICAgICAgICAgIF9kcmF3VW5kZXJsaW5lUG9zLnggPSBzdGFydFBvc2l0aW9uLnggLSAoX2RyYXdVbmRlcmxpbmVXaWR0aCAvIDIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF9kcmF3VW5kZXJsaW5lUG9zLnggPSBzdGFydFBvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9kcmF3VW5kZXJsaW5lUG9zLnkgPSBkcmF3VGV4dFBvc1kgKyBfZHJhd0ZvbnRTaXplIC8gODtcbiAgICAgICAgICAgICAgICBfY29udGV4dC5maWxsUmVjdChfZHJhd1VuZGVybGluZVBvcy54LCBfZHJhd1VuZGVybGluZVBvcy55LCBfZHJhd1VuZGVybGluZVdpZHRoLCBfdW5kZXJsaW5lVGhpY2tuZXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc011bHRpcGxlKSB7XG4gICAgICAgICAgICBfY29udGV4dC5zaGFkb3dDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdXBkYXRlVGV4dHVyZSAoKSB7XG4gICAgICAgIF9jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBfY2FudmFzLndpZHRoLCBfY2FudmFzLmhlaWdodCk7XG4gICAgICAgIC8vQWRkIGEgd2hpdGUgYmFja2dyb3VuZCB0byBhdm9pZCBibGFjayBlZGdlcy5cbiAgICAgICAgaWYgKCFfcHJlbXVsdGlwbHkpIHtcbiAgICAgICAgICAgIC8vVE9ETzogaXQgaXMgYmVzdCB0byBhZGQgYWxwaGFUZXN0IHRvIGZpbHRlciBvdXQgdGhlIGJhY2tncm91bmQgY29sb3IuXG4gICAgICAgICAgICBsZXQgX2ZpbGxDb2xvciA9IF9vdXRsaW5lQ29tcCA/IF9vdXRsaW5lQ29sb3IgOiBfY29sb3I7XG4gICAgICAgICAgICBfY29udGV4dC5maWxsU3R5bGUgPSBgcmdiYSgke19maWxsQ29sb3Iucn0sICR7X2ZpbGxDb2xvci5nfSwgJHtfZmlsbENvbG9yLmJ9LCAke19pbnZpc2libGVBbHBoYX0pYDtcbiAgICAgICAgICAgIF9jb250ZXh0LmZpbGxSZWN0KDAsIDAsIF9jYW52YXMud2lkdGgsIF9jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIF9jb250ZXh0LmZpbGxTdHlsZSA9IGByZ2JhKCR7X2NvbG9yLnJ9LCAke19jb2xvci5nfSwgJHtfY29sb3IuYn0sIDEpYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9jb250ZXh0LmZpbGxTdHlsZSA9IGByZ2JhKCR7X2NvbG9yLnJ9LCAke19jb2xvci5nfSwgJHtfY29sb3IuYn0sICR7X2NvbG9yLmEgLyAyNTUuMH0pYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdGFydFBvc2l0aW9uID0gdGhpcy5fY2FsY3VsYXRlRmlsbFRleHRTdGFydFBvc2l0aW9uKCk7XG4gICAgICAgIGxldCBsaW5lSGVpZ2h0ID0gdGhpcy5fZ2V0TGluZUhlaWdodCgpO1xuICAgICAgICBsZXQgZHJhd1RleHRQb3NYID0gc3RhcnRQb3NpdGlvbi54LCBkcmF3VGV4dFBvc1kgPSAwO1xuICAgICAgICAvLyBkcmF3IHNoYWRvdyBhbmQgdW5kZXJsaW5lXG4gICAgICAgIHRoaXMuX2RyYXdUZXh0RWZmZWN0KHN0YXJ0UG9zaXRpb24sIGxpbmVIZWlnaHQpO1xuICAgICAgICAvLyBkcmF3IHRleHQgYW5kIG91dGxpbmVcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfc3BsaXRlZFN0cmluZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGRyYXdUZXh0UG9zWSA9IHN0YXJ0UG9zaXRpb24ueSArIGkgKiBsaW5lSGVpZ2h0O1xuICAgICAgICAgICAgaWYgKF9vdXRsaW5lQ29tcCkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0LnN0cm9rZVRleHQoX3NwbGl0ZWRTdHJpbmdzW2ldLCBkcmF3VGV4dFBvc1gsIGRyYXdUZXh0UG9zWSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfY29udGV4dC5maWxsVGV4dChfc3BsaXRlZFN0cmluZ3NbaV0sIGRyYXdUZXh0UG9zWCwgZHJhd1RleHRQb3NZKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfc2hhZG93Q29tcCkge1xuICAgICAgICAgICAgX2NvbnRleHQuc2hhZG93Q29sb3IgPSAndHJhbnNwYXJlbnQnO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RleHR1cmUuaGFuZGxlTG9hZGVkVGV4dHVyZSgpO1xuICAgIH1cblxuICAgIF9jYWxEeW5hbWljQXRsYXMgKGNvbXApIHtcbiAgICAgICAgaWYoY29tcC5jYWNoZU1vZGUgIT09IExhYmVsLkNhY2hlTW9kZS5CSVRNQVApIHJldHVybjtcbiAgICAgICAgbGV0IGZyYW1lID0gY29tcC5fZnJhbWU7XG4gICAgICAgIC8vIERlbGV0ZSBjYWNoZSBpbiBhdGxhcy5cbiAgICAgICAgZGVsZXRlRnJvbUR5bmFtaWNBdGxhcyhjb21wLCBmcmFtZSk7XG4gICAgICAgIGlmICghZnJhbWUuX29yaWdpbmFsKSB7XG4gICAgICAgICAgICBmcmFtZS5zZXRSZWN0KGNjLnJlY3QoMCwgMCwgX2NhbnZhcy53aWR0aCwgX2NhbnZhcy5oZWlnaHQpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhY2tUb0R5bmFtaWNBdGxhcyhjb21wLCBmcmFtZSk7XG4gICAgfVxuXG4gICAgX3VwZGF0ZUxhYmVsRGltZW5zaW9ucyAoKSB7XG4gICAgICAgIF9jYW52YXNTaXplLndpZHRoID0gTWF0aC5taW4oX2NhbnZhc1NpemUud2lkdGgsIE1BWF9TSVpFKTtcbiAgICAgICAgX2NhbnZhc1NpemUuaGVpZ2h0ID0gTWF0aC5taW4oX2NhbnZhc1NpemUuaGVpZ2h0LCBNQVhfU0laRSk7XG5cbiAgICAgICAgbGV0IHJlY3JlYXRlID0gZmFsc2U7XG4gICAgICAgIGlmIChfY2FudmFzLndpZHRoICE9PSBfY2FudmFzU2l6ZS53aWR0aCkge1xuICAgICAgICAgICAgX2NhbnZhcy53aWR0aCA9IF9jYW52YXNTaXplLndpZHRoO1xuICAgICAgICAgICAgcmVjcmVhdGUgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX2NhbnZhcy5oZWlnaHQgIT09IF9jYW52YXNTaXplLmhlaWdodCkge1xuICAgICAgICAgICAgX2NhbnZhcy5oZWlnaHQgPSBfY2FudmFzU2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgICByZWNyZWF0ZSA9IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY3JlYXRlICYmIChfY29udGV4dC5mb250ID0gX2ZvbnREZXNjKTtcbiAgICAgICAgLy8gYWxpZ25cbiAgICAgICAgX2NvbnRleHQudGV4dEFsaWduID0gQWxpZ25tZW50W19oQWxpZ25dO1xuICAgIH1cblxuICAgIF9nZXRGb250RGVzYyAoKSB7XG4gICAgICAgIGxldCBmb250RGVzYyA9IF9mb250U2l6ZS50b1N0cmluZygpICsgJ3B4ICc7XG4gICAgICAgIGZvbnREZXNjID0gZm9udERlc2MgKyBfZm9udEZhbWlseTtcbiAgICAgICAgaWYgKF9lbmFibGVCb2xkKSB7XG4gICAgICAgICAgICBmb250RGVzYyA9IFwiYm9sZCBcIiArIGZvbnREZXNjO1xuICAgICAgICB9XG4gICAgICAgIGlmIChfZW5hYmxlSXRhbGljKSB7XG4gICAgICAgICAgICBmb250RGVzYyA9IFwiaXRhbGljIFwiICsgZm9udERlc2M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvbnREZXNjO1xuICAgIH1cblxuICAgIF9nZXRMaW5lSGVpZ2h0ICgpIHtcbiAgICAgICAgbGV0IG5vZGVTcGFjaW5nWSA9IF9saW5lSGVpZ2h0O1xuICAgICAgICBpZiAobm9kZVNwYWNpbmdZID09PSAwKSB7XG4gICAgICAgICAgICBub2RlU3BhY2luZ1kgPSBfZm9udFNpemU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlU3BhY2luZ1kgPSBub2RlU3BhY2luZ1kgKiBfZm9udFNpemUgLyBfZHJhd0ZvbnRTaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGVTcGFjaW5nWSB8IDA7XG4gICAgfVxuXG4gICAgX2NhbGN1bGF0ZVBhcmFncmFwaExlbmd0aCAocGFyYWdyYXBoZWRTdHJpbmdzLCBjdHgpIHtcbiAgICAgICAgbGV0IHBhcmFncmFwaExlbmd0aCA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyYWdyYXBoZWRTdHJpbmdzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgd2lkdGggPSB0ZXh0VXRpbHMuc2FmZU1lYXN1cmVUZXh0KGN0eCwgcGFyYWdyYXBoZWRTdHJpbmdzW2ldLCBfZm9udERlc2MpO1xuICAgICAgICAgICAgcGFyYWdyYXBoTGVuZ3RoLnB1c2god2lkdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcmFncmFwaExlbmd0aDtcbiAgICB9XG5cbiAgICBfbWVhc3VyZVRleHQgKGN0eCwgZm9udERlc2MpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZXh0VXRpbHMuc2FmZU1lYXN1cmVUZXh0KGN0eCwgc3RyaW5nLCBmb250RGVzYyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgX2NhbGN1bGF0ZVNocmlua0ZvbnQgKHBhcmFncmFwaGVkU3RyaW5ncykge1xuICAgICAgICBsZXQgcGFyYWdyYXBoTGVuZ3RoID0gdGhpcy5fY2FsY3VsYXRlUGFyYWdyYXBoTGVuZ3RoKHBhcmFncmFwaGVkU3RyaW5ncywgX2NvbnRleHQpO1xuICAgICAgICBcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgdG90YWxIZWlnaHQgPSAwO1xuICAgICAgICBsZXQgbWF4TGVuZ3RoID0gMDtcblxuICAgICAgICBpZiAoX2lzV3JhcFRleHQpIHtcbiAgICAgICAgICAgIGxldCBjYW52YXNXaWR0aE5vTWFyZ2luID0gX25vZGVDb250ZW50U2l6ZS53aWR0aDtcbiAgICAgICAgICAgIGxldCBjYW52YXNIZWlnaHROb01hcmdpbiA9IF9ub2RlQ29udGVudFNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgaWYgKGNhbnZhc1dpZHRoTm9NYXJnaW4gPCAwIHx8IGNhbnZhc0hlaWdodE5vTWFyZ2luIDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvdGFsSGVpZ2h0ID0gY2FudmFzSGVpZ2h0Tm9NYXJnaW4gKyAxO1xuICAgICAgICAgICAgbGV0IGFjdHVhbEZvbnRTaXplID0gX2ZvbnRTaXplICsgMTtcbiAgICAgICAgICAgIGxldCB0ZXh0RnJhZ21lbnQgPSBcIlwiO1xuICAgICAgICAgICAgLy9sZXQgc3RhcnRTaHJpbmtGb250U2l6ZSA9IGFjdHVhbEZvbnRTaXplIHwgMDtcbiAgICAgICAgICAgIGxldCBsZWZ0ID0gMCwgcmlnaHQgPSBhY3R1YWxGb250U2l6ZSB8IDAsIG1pZCA9IDA7XG5cbiAgICAgICAgICAgIHdoaWxlIChsZWZ0IDwgcmlnaHQpIHtcbiAgICAgICAgICAgICAgICBtaWQgPSAobGVmdCArIHJpZ2h0ICsgMSkgPj4gMTtcblxuICAgICAgICAgICAgICAgIGlmIChtaWQgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2dJRCg0MDAzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgX2ZvbnRTaXplID0gbWlkO1xuICAgICAgICAgICAgICAgIF9mb250RGVzYyA9IHRoaXMuX2dldEZvbnREZXNjKCk7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQuZm9udCA9IF9mb250RGVzYztcbiAgICAgICAgICAgICAgICBsZXQgbGluZUhlaWdodCA9IHRoaXMuX2dldExpbmVIZWlnaHQoKTtcblxuICAgICAgICAgICAgICAgIHRvdGFsSGVpZ2h0ID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFyYWdyYXBoZWRTdHJpbmdzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhbGxXaWR0aCA9IHRleHRVdGlscy5zYWZlTWVhc3VyZVRleHQoX2NvbnRleHQsIHBhcmFncmFwaGVkU3RyaW5nc1tpXSwgX2ZvbnREZXNjKTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dEZyYWdtZW50ID0gdGV4dFV0aWxzLmZyYWdtZW50VGV4dChwYXJhZ3JhcGhlZFN0cmluZ3NbaV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbFdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNXaWR0aE5vTWFyZ2luLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tZWFzdXJlVGV4dChfY29udGV4dCwgX2ZvbnREZXNjKSk7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsSGVpZ2h0ICs9IHRleHRGcmFnbWVudC5sZW5ndGggKiBsaW5lSGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0b3RhbEhlaWdodCA+IGNhbnZhc0hlaWdodE5vTWFyZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0ID0gbWlkIC0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gbWlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGxlZnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBjYy5sb2dJRCg0MDAzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX2ZvbnRTaXplID0gbGVmdDtcbiAgICAgICAgICAgICAgICBfZm9udERlc2MgPSB0aGlzLl9nZXRGb250RGVzYygpO1xuICAgICAgICAgICAgICAgIF9jb250ZXh0LmZvbnQgPSBfZm9udERlc2M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b3RhbEhlaWdodCA9IHBhcmFncmFwaGVkU3RyaW5ncy5sZW5ndGggKiB0aGlzLl9nZXRMaW5lSGVpZ2h0KCk7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJhZ3JhcGhlZFN0cmluZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAobWF4TGVuZ3RoIDwgcGFyYWdyYXBoTGVuZ3RoW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIG1heExlbmd0aCA9IHBhcmFncmFwaExlbmd0aFtpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgc2NhbGVYID0gKF9jYW52YXNTaXplLndpZHRoIC0gX2NhbnZhc1BhZGRpbmcud2lkdGgpIC8gbWF4TGVuZ3RoO1xuICAgICAgICAgICAgbGV0IHNjYWxlWSA9IF9jYW52YXNTaXplLmhlaWdodCAvIHRvdGFsSGVpZ2h0O1xuXG4gICAgICAgICAgICBfZm9udFNpemUgPSAoX2RyYXdGb250U2l6ZSAqIE1hdGgubWluKDEsIHNjYWxlWCwgc2NhbGVZKSkgfCAwO1xuICAgICAgICAgICAgX2ZvbnREZXNjID0gdGhpcy5fZ2V0Rm9udERlc2MoKTtcbiAgICAgICAgICAgIF9jb250ZXh0LmZvbnQgPSBfZm9udERlc2M7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY2FsY3VsYXRlV3JhcFRleHQgKHBhcmFncmFwaGVkU3RyaW5ncykge1xuICAgICAgICBpZiAoIV9pc1dyYXBUZXh0KSByZXR1cm47XG5cbiAgICAgICAgX3NwbGl0ZWRTdHJpbmdzID0gW107XG4gICAgICAgIGxldCBjYW52YXNXaWR0aE5vTWFyZ2luID0gX25vZGVDb250ZW50U2l6ZS53aWR0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJhZ3JhcGhlZFN0cmluZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBhbGxXaWR0aCA9IHRleHRVdGlscy5zYWZlTWVhc3VyZVRleHQoX2NvbnRleHQsIHBhcmFncmFwaGVkU3RyaW5nc1tpXSwgX2ZvbnREZXNjKTtcbiAgICAgICAgICAgIGxldCB0ZXh0RnJhZ21lbnQgPSB0ZXh0VXRpbHMuZnJhZ21lbnRUZXh0KHBhcmFncmFwaGVkU3RyaW5nc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNXaWR0aE5vTWFyZ2luLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21lYXN1cmVUZXh0KF9jb250ZXh0LCBfZm9udERlc2MpKTtcbiAgICAgICAgICAgIF9zcGxpdGVkU3RyaW5ncyA9IF9zcGxpdGVkU3RyaW5ncy5jb25jYXQodGV4dEZyYWdtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jYWxjdWxhdGVMYWJlbEZvbnQgKCkge1xuICAgICAgICBsZXQgcGFyYWdyYXBoZWRTdHJpbmdzID0gX3N0cmluZy5zcGxpdCgnXFxuJyk7XG5cbiAgICAgICAgX3NwbGl0ZWRTdHJpbmdzID0gcGFyYWdyYXBoZWRTdHJpbmdzO1xuICAgICAgICBfZm9udERlc2MgPSB0aGlzLl9nZXRGb250RGVzYygpO1xuICAgICAgICBfY29udGV4dC5mb250ID0gX2ZvbnREZXNjO1xuXG4gICAgICAgIHN3aXRjaCAoX292ZXJmbG93KSB7XG4gICAgICAgICAgICBjYXNlIE92ZXJmbG93Lk5PTkU6IHtcbiAgICAgICAgICAgICAgICBsZXQgY2FudmFzU2l6ZVggPSAwO1xuICAgICAgICAgICAgICAgIGxldCBjYW52YXNTaXplWSA9IDA7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJhZ3JhcGhlZFN0cmluZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmFMZW5ndGggPSB0ZXh0VXRpbHMuc2FmZU1lYXN1cmVUZXh0KF9jb250ZXh0LCBwYXJhZ3JhcGhlZFN0cmluZ3NbaV0sIF9mb250RGVzYyk7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhc1NpemVYID0gY2FudmFzU2l6ZVggPiBwYXJhTGVuZ3RoID8gY2FudmFzU2l6ZVggOiBwYXJhTGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYW52YXNTaXplWSA9IChfc3BsaXRlZFN0cmluZ3MubGVuZ3RoICsgdGV4dFV0aWxzLkJBU0VMSU5FX1JBVElPKSAqIHRoaXMuX2dldExpbmVIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICBsZXQgcmF3V2lkdGggPSBwYXJzZUZsb2F0KGNhbnZhc1NpemVYLnRvRml4ZWQoMikpO1xuICAgICAgICAgICAgICAgIGxldCByYXdIZWlnaHQgPSBwYXJzZUZsb2F0KGNhbnZhc1NpemVZLnRvRml4ZWQoMikpO1xuICAgICAgICAgICAgICAgIF9jYW52YXNTaXplLndpZHRoID0gcmF3V2lkdGggKyBfY2FudmFzUGFkZGluZy53aWR0aDtcbiAgICAgICAgICAgICAgICBfY2FudmFzU2l6ZS5oZWlnaHQgPSByYXdIZWlnaHQgKyBfY2FudmFzUGFkZGluZy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgX25vZGVDb250ZW50U2l6ZS53aWR0aCA9IHJhd1dpZHRoICsgX2NvbnRlbnRTaXplRXh0ZW5kLndpZHRoO1xuICAgICAgICAgICAgICAgIF9ub2RlQ29udGVudFNpemUuaGVpZ2h0ID0gcmF3SGVpZ2h0ICsgX2NvbnRlbnRTaXplRXh0ZW5kLmhlaWdodDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgT3ZlcmZsb3cuU0hSSU5LOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlU2hyaW5rRm9udChwYXJhZ3JhcGhlZFN0cmluZ3MpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVdyYXBUZXh0KHBhcmFncmFwaGVkU3RyaW5ncyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIE92ZXJmbG93LkNMQU1QOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlV3JhcFRleHQocGFyYWdyYXBoZWRTdHJpbmdzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgT3ZlcmZsb3cuUkVTSVpFX0hFSUdIVDoge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVdyYXBUZXh0KHBhcmFncmFwaGVkU3RyaW5ncyk7XG4gICAgICAgICAgICAgICAgbGV0IHJhd0hlaWdodCA9IChfc3BsaXRlZFN0cmluZ3MubGVuZ3RoICsgdGV4dFV0aWxzLkJBU0VMSU5FX1JBVElPKSAqIHRoaXMuX2dldExpbmVIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICBfY2FudmFzU2l6ZS5oZWlnaHQgPSByYXdIZWlnaHQgKyBfY2FudmFzUGFkZGluZy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgLy8gc2V0IG5vZGUgaGVpZ2h0XG4gICAgICAgICAgICAgICAgX25vZGVDb250ZW50U2l6ZS5oZWlnaHQgPSByYXdIZWlnaHQgKyBfY29udGVudFNpemVFeHRlbmQuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==