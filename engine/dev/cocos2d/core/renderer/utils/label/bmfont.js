
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/utils/label/bmfont.js';
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

var Overflow = Label.Overflow;

var shareLabelInfo = require('../utils').shareLabelInfo;

var LetterInfo = function LetterInfo() {
  this["char"] = '';
  this.valid = true;
  this.x = 0;
  this.y = 0;
  this.line = 0;
  this.hash = "";
};

var _tmpRect = cc.rect();

var _comp = null;
var _horizontalKernings = [];
var _lettersInfo = [];
var _linesWidth = [];
var _linesOffsetX = [];
var _fntConfig = null;
var _numberOfLines = 0;
var _textDesiredHeight = 0;
var _letterOffsetY = 0;
var _tailoredTopY = 0;
var _tailoredBottomY = 0;
var _bmfontScale = 1.0;
var _lineBreakWithoutSpaces = false;
var _spriteFrame = null;
var _lineSpacing = 0;

var _contentSize = cc.size();

var _string = '';
var _fontSize = 0;
var _originFontSize = 0;
var _hAlign = 0;
var _vAlign = 0;
var _spacingX = 0;
var _lineHeight = 0;
var _overflow = 0;
var _isWrapText = false;
var _labelWidth = 0;
var _labelHeight = 0;
var _maxLineWidth = 0;

var BmfontAssembler = /*#__PURE__*/function (_Assembler2D) {
  _inheritsLoose(BmfontAssembler, _Assembler2D);

  function BmfontAssembler() {
    return _Assembler2D.apply(this, arguments) || this;
  }

  var _proto = BmfontAssembler.prototype;

  _proto.updateRenderData = function updateRenderData(comp) {
    if (!comp._vertsDirty) return;
    if (_comp === comp) return;
    _comp = comp;

    this._reserveQuads(comp, comp.string.toString().length);

    this._updateFontFamily(comp);

    this._updateProperties(comp);

    this._updateLabelInfo(comp);

    this._updateContent();

    this.updateWorldVerts(comp);
    _comp._actualFontSize = _fontSize;

    _comp.node.setContentSize(_contentSize);

    _comp._vertsDirty = false;
    _comp = null;

    this._resetProperties();
  };

  _proto._updateFontScale = function _updateFontScale() {
    _bmfontScale = _fontSize / _originFontSize;
  };

  _proto._updateFontFamily = function _updateFontFamily(comp) {
    var fontAsset = comp.font;
    _spriteFrame = fontAsset.spriteFrame;
    _fntConfig = fontAsset._fntConfig;
    shareLabelInfo.fontAtlas = fontAsset._fontDefDictionary;
    this.packToDynamicAtlas(comp, _spriteFrame);
  };

  _proto._updateLabelInfo = function _updateLabelInfo() {
    // clear
    shareLabelInfo.hash = "";
    shareLabelInfo.margin = 0;
  };

  _proto._updateProperties = function _updateProperties(comp) {
    _string = comp.string.toString();
    _fontSize = comp.fontSize;
    _originFontSize = _fntConfig ? _fntConfig.fontSize : comp.fontSize;
    _hAlign = comp.horizontalAlign;
    _vAlign = comp.verticalAlign;
    _spacingX = comp.spacingX;
    _overflow = comp.overflow;
    _lineHeight = comp._lineHeight;
    _contentSize.width = comp.node.width;
    _contentSize.height = comp.node.height; // should wrap text

    if (_overflow === Overflow.NONE) {
      _isWrapText = false;
      _contentSize.width += shareLabelInfo.margin * 2;
      _contentSize.height += shareLabelInfo.margin * 2;
    } else if (_overflow === Overflow.RESIZE_HEIGHT) {
      _isWrapText = true;
      _contentSize.height += shareLabelInfo.margin * 2;
    } else {
      _isWrapText = comp.enableWrapText;
    }

    shareLabelInfo.lineHeight = _lineHeight;
    shareLabelInfo.fontSize = _fontSize;

    this._setupBMFontOverflowMetrics();
  };

  _proto._resetProperties = function _resetProperties() {
    _fntConfig = null;
    _spriteFrame = null;
    shareLabelInfo.hash = "";
    shareLabelInfo.margin = 0;
  };

  _proto._updateContent = function _updateContent() {
    this._updateFontScale();

    this._computeHorizontalKerningForText();

    this._alignText();
  };

  _proto._computeHorizontalKerningForText = function _computeHorizontalKerningForText() {
    var string = _string;
    var stringLen = string.length;
    var horizontalKernings = _horizontalKernings;
    var kerningDict;
    _fntConfig && (kerningDict = _fntConfig.kerningDict);

    if (kerningDict && !cc.js.isEmptyObject(kerningDict)) {
      var prev = -1;

      for (var i = 0; i < stringLen; ++i) {
        var key = string.charCodeAt(i);
        var kerningAmount = kerningDict[prev << 16 | key & 0xffff] || 0;

        if (i < stringLen - 1) {
          horizontalKernings[i] = kerningAmount;
        } else {
          horizontalKernings[i] = 0;
        }

        prev = key;
      }
    } else {
      horizontalKernings.length = 0;
    }
  };

  _proto._multilineTextWrap = function _multilineTextWrap(nextTokenFunc) {
    var textLen = _string.length;
    var lineIndex = 0;
    var nextTokenX = 0;
    var nextTokenY = 0;
    var longestLine = 0;
    var letterRight = 0;
    var highestY = 0;
    var lowestY = 0;
    var letterDef = null;
    var letterPosition = cc.v2(0, 0);

    for (var index = 0; index < textLen;) {
      var character = _string.charAt(index);

      if (character === "\n") {
        _linesWidth.push(letterRight);

        letterRight = 0;
        lineIndex++;
        nextTokenX = 0;
        nextTokenY -= _lineHeight * this._getFontScale() + _lineSpacing;

        this._recordPlaceholderInfo(index, character);

        index++;
        continue;
      }

      var tokenLen = nextTokenFunc(_string, index, textLen);
      var tokenHighestY = highestY;
      var tokenLowestY = lowestY;
      var tokenRight = letterRight;
      var nextLetterX = nextTokenX;
      var newLine = false;

      for (var tmp = 0; tmp < tokenLen; ++tmp) {
        var letterIndex = index + tmp;
        character = _string.charAt(letterIndex);

        if (character === "\r") {
          this._recordPlaceholderInfo(letterIndex, character);

          continue;
        }

        letterDef = shareLabelInfo.fontAtlas.getLetterDefinitionForChar(character, shareLabelInfo);

        if (!letterDef) {
          this._recordPlaceholderInfo(letterIndex, character);

          var atlasName = "";
          _fntConfig && (atlasName = _fntConfig.atlasName);
          console.log("Can't find letter definition in texture atlas " + atlasName + " for letter:" + character);
          continue;
        }

        var letterX = nextLetterX + letterDef.offsetX * _bmfontScale - shareLabelInfo.margin;

        if (_isWrapText && _maxLineWidth > 0 && nextTokenX > 0 && letterX + letterDef.w * _bmfontScale > _maxLineWidth && !textUtils.isUnicodeSpace(character)) {
          _linesWidth.push(letterRight);

          letterRight = 0;
          lineIndex++;
          nextTokenX = 0;
          nextTokenY -= _lineHeight * this._getFontScale() + _lineSpacing;
          newLine = true;
          break;
        } else {
          letterPosition.x = letterX;
        }

        letterPosition.y = nextTokenY - letterDef.offsetY * _bmfontScale + shareLabelInfo.margin;

        this._recordLetterInfo(letterPosition, character, letterIndex, lineIndex);

        if (letterIndex + 1 < _horizontalKernings.length && letterIndex < textLen - 1) {
          nextLetterX += _horizontalKernings[letterIndex + 1];
        }

        nextLetterX += letterDef.xAdvance * _bmfontScale + _spacingX - shareLabelInfo.margin * 2;
        tokenRight = letterPosition.x + letterDef.w * _bmfontScale - shareLabelInfo.margin;

        if (tokenHighestY < letterPosition.y) {
          tokenHighestY = letterPosition.y;
        }

        if (tokenLowestY > letterPosition.y - letterDef.h * _bmfontScale) {
          tokenLowestY = letterPosition.y - letterDef.h * _bmfontScale;
        }
      } //end of for loop


      if (newLine) continue;
      nextTokenX = nextLetterX;
      letterRight = tokenRight;

      if (highestY < tokenHighestY) {
        highestY = tokenHighestY;
      }

      if (lowestY > tokenLowestY) {
        lowestY = tokenLowestY;
      }

      if (longestLine < letterRight) {
        longestLine = letterRight;
      }

      index += tokenLen;
    } //end of for loop


    _linesWidth.push(letterRight);

    _numberOfLines = lineIndex + 1;
    _textDesiredHeight = _numberOfLines * _lineHeight * this._getFontScale();

    if (_numberOfLines > 1) {
      _textDesiredHeight += (_numberOfLines - 1) * _lineSpacing;
    }

    _contentSize.width = _labelWidth;
    _contentSize.height = _labelHeight;

    if (_labelWidth <= 0) {
      _contentSize.width = parseFloat(longestLine.toFixed(2)) + shareLabelInfo.margin * 2;
    }

    if (_labelHeight <= 0) {
      _contentSize.height = parseFloat(_textDesiredHeight.toFixed(2)) + shareLabelInfo.margin * 2;
    }

    _tailoredTopY = _contentSize.height;
    _tailoredBottomY = 0;

    if (_overflow !== Overflow.CLAMP) {
      if (highestY > 0) {
        _tailoredTopY = _contentSize.height + highestY;
      }

      if (lowestY < -_textDesiredHeight) {
        _tailoredBottomY = _textDesiredHeight + lowestY;
      }
    }

    return true;
  };

  _proto._getFirstCharLen = function _getFirstCharLen() {
    return 1;
  };

  _proto._getFontScale = function _getFontScale() {
    return _overflow === Overflow.SHRINK ? _bmfontScale : 1;
  };

  _proto._getFirstWordLen = function _getFirstWordLen(text, startIndex, textLen) {
    var character = text.charAt(startIndex);

    if (textUtils.isUnicodeCJK(character) || character === "\n" || textUtils.isUnicodeSpace(character)) {
      return 1;
    }

    var len = 1;
    var letterDef = shareLabelInfo.fontAtlas.getLetterDefinitionForChar(character, shareLabelInfo);

    if (!letterDef) {
      return len;
    }

    var nextLetterX = letterDef.xAdvance * _bmfontScale + _spacingX;
    var letterX;

    for (var index = startIndex + 1; index < textLen; ++index) {
      character = text.charAt(index);
      letterDef = shareLabelInfo.fontAtlas.getLetterDefinitionForChar(character, shareLabelInfo);

      if (!letterDef) {
        break;
      }

      letterX = nextLetterX + letterDef.offsetX * _bmfontScale;

      if (letterX + letterDef.w * _bmfontScale > _maxLineWidth && !textUtils.isUnicodeSpace(character) && _maxLineWidth > 0) {
        return len;
      }

      nextLetterX += letterDef.xAdvance * _bmfontScale + _spacingX;

      if (character === "\n" || textUtils.isUnicodeSpace(character) || textUtils.isUnicodeCJK(character)) {
        break;
      }

      len++;
    }

    return len;
  };

  _proto._multilineTextWrapByWord = function _multilineTextWrapByWord() {
    return this._multilineTextWrap(this._getFirstWordLen);
  };

  _proto._multilineTextWrapByChar = function _multilineTextWrapByChar() {
    return this._multilineTextWrap(this._getFirstCharLen);
  };

  _proto._recordPlaceholderInfo = function _recordPlaceholderInfo(letterIndex, _char) {
    if (letterIndex >= _lettersInfo.length) {
      var tmpInfo = new LetterInfo();

      _lettersInfo.push(tmpInfo);
    }

    _lettersInfo[letterIndex]["char"] = _char;
    _lettersInfo[letterIndex].hash = _char.charCodeAt(0) + shareLabelInfo.hash;
    _lettersInfo[letterIndex].valid = false;
  };

  _proto._recordLetterInfo = function _recordLetterInfo(letterPosition, character, letterIndex, lineIndex) {
    if (letterIndex >= _lettersInfo.length) {
      var tmpInfo = new LetterInfo();

      _lettersInfo.push(tmpInfo);
    }

    var _char2 = character.charCodeAt(0);

    var key = _char2 + shareLabelInfo.hash;
    _lettersInfo[letterIndex].line = lineIndex;
    _lettersInfo[letterIndex]["char"] = character;
    _lettersInfo[letterIndex].hash = key;
    _lettersInfo[letterIndex].valid = shareLabelInfo.fontAtlas.getLetter(key).valid;
    _lettersInfo[letterIndex].x = letterPosition.x;
    _lettersInfo[letterIndex].y = letterPosition.y;
  };

  _proto._alignText = function _alignText() {
    _textDesiredHeight = 0;
    _linesWidth.length = 0;

    if (!_lineBreakWithoutSpaces) {
      this._multilineTextWrapByWord();
    } else {
      this._multilineTextWrapByChar();
    }

    this._computeAlignmentOffset(); //shrink


    if (_overflow === Overflow.SHRINK) {
      if (_fontSize > 0 && this._isVerticalClamp()) {
        this._shrinkLabelToContentSize(this._isVerticalClamp);
      }
    }

    if (!this._updateQuads()) {
      if (_overflow === Overflow.SHRINK) {
        this._shrinkLabelToContentSize(this._isHorizontalClamp);
      }
    }
  };

  _proto._scaleFontSizeDown = function _scaleFontSizeDown(fontSize) {
    var shouldUpdateContent = true;

    if (!fontSize) {
      fontSize = 0.1;
      shouldUpdateContent = false;
    }

    _fontSize = fontSize;

    if (shouldUpdateContent) {
      this._updateContent();
    }
  };

  _proto._shrinkLabelToContentSize = function _shrinkLabelToContentSize(lambda) {
    var fontSize = _fontSize;
    var left = 0,
        right = fontSize | 0,
        mid = 0;

    while (left < right) {
      mid = left + right + 1 >> 1;
      var newFontSize = mid;

      if (newFontSize <= 0) {
        break;
      }

      _bmfontScale = newFontSize / _originFontSize;

      if (!_lineBreakWithoutSpaces) {
        this._multilineTextWrapByWord();
      } else {
        this._multilineTextWrapByChar();
      }

      this._computeAlignmentOffset();

      if (lambda()) {
        right = mid - 1;
      } else {
        left = mid;
      }
    }

    var actualFontSize = left;

    if (actualFontSize >= 0) {
      this._scaleFontSizeDown(actualFontSize);
    }
  };

  _proto._isVerticalClamp = function _isVerticalClamp() {
    if (_textDesiredHeight > _contentSize.height) {
      return true;
    } else {
      return false;
    }
  };

  _proto._isHorizontalClamp = function _isHorizontalClamp() {
    var letterClamp = false;

    for (var ctr = 0, l = _string.length; ctr < l; ++ctr) {
      var letterInfo = _lettersInfo[ctr];

      if (letterInfo.valid) {
        var letterDef = shareLabelInfo.fontAtlas.getLetter(letterInfo.hash);
        var px = letterInfo.x + letterDef.w * _bmfontScale;
        var lineIndex = letterInfo.line;

        if (_labelWidth > 0) {
          if (!_isWrapText) {
            if (px > _contentSize.width) {
              letterClamp = true;
              break;
            }
          } else {
            var wordWidth = _linesWidth[lineIndex];

            if (wordWidth > _contentSize.width && (px > _contentSize.width || px < 0)) {
              letterClamp = true;
              break;
            }
          }
        }
      }
    }

    return letterClamp;
  };

  _proto._isHorizontalClamped = function _isHorizontalClamped(px, lineIndex) {
    var wordWidth = _linesWidth[lineIndex];
    var letterOverClamp = px > _contentSize.width || px < 0;

    if (!_isWrapText) {
      return letterOverClamp;
    } else {
      return wordWidth > _contentSize.width && letterOverClamp;
    }
  };

  _proto._updateQuads = function _updateQuads() {
    var texture = _spriteFrame ? _spriteFrame._texture : shareLabelInfo.fontAtlas.getTexture();
    var node = _comp.node;
    this.verticesCount = this.indicesCount = 0; // Need to reset dataLength in Canvas rendering mode.

    this._renderData && (this._renderData.dataLength = 0);
    var contentSize = _contentSize,
        appx = node._anchorPoint.x * contentSize.width,
        appy = node._anchorPoint.y * contentSize.height;
    var ret = true;

    for (var ctr = 0, l = _string.length; ctr < l; ++ctr) {
      var letterInfo = _lettersInfo[ctr];
      if (!letterInfo.valid) continue;
      var letterDef = shareLabelInfo.fontAtlas.getLetter(letterInfo.hash);
      _tmpRect.height = letterDef.h;
      _tmpRect.width = letterDef.w;
      _tmpRect.x = letterDef.u;
      _tmpRect.y = letterDef.v;
      var py = letterInfo.y + _letterOffsetY;

      if (_labelHeight > 0) {
        if (py > _tailoredTopY) {
          var clipTop = py - _tailoredTopY;
          _tmpRect.y += clipTop;
          _tmpRect.height -= clipTop;
          py = py - clipTop;
        }

        if (py - letterDef.h * _bmfontScale < _tailoredBottomY && _overflow === Overflow.CLAMP) {
          _tmpRect.height = py < _tailoredBottomY ? 0 : (py - _tailoredBottomY) / _bmfontScale;
        }
      }

      var lineIndex = letterInfo.line;
      var px = letterInfo.x + letterDef.w / 2 * _bmfontScale + _linesOffsetX[lineIndex];

      if (_labelWidth > 0) {
        if (this._isHorizontalClamped(px, lineIndex)) {
          if (_overflow === Overflow.CLAMP) {
            _tmpRect.width = 0;
          } else if (_overflow === Overflow.SHRINK) {
            if (_contentSize.width > letterDef.w) {
              ret = false;
              break;
            } else {
              _tmpRect.width = 0;
            }
          }
        }
      }

      if (_tmpRect.height > 0 && _tmpRect.width > 0) {
        var isRotated = this._determineRect(_tmpRect);

        var letterPositionX = letterInfo.x + _linesOffsetX[letterInfo.line];
        this.appendQuad(_comp, texture, _tmpRect, isRotated, letterPositionX - appx, py - appy, _bmfontScale);
      }
    }

    this._quadsUpdated(_comp);

    return ret;
  };

  _proto._determineRect = function _determineRect(tempRect) {
    var isRotated = _spriteFrame.isRotated();

    var originalSize = _spriteFrame._originalSize;
    var rect = _spriteFrame._rect;
    var offset = _spriteFrame._offset;
    var trimmedLeft = offset.x + (originalSize.width - rect.width) / 2;
    var trimmedTop = offset.y - (originalSize.height - rect.height) / 2;

    if (!isRotated) {
      tempRect.x += rect.x - trimmedLeft;
      tempRect.y += rect.y + trimmedTop;
    } else {
      var originalX = tempRect.x;
      tempRect.x = rect.x + rect.height - tempRect.y - tempRect.height - trimmedTop;
      tempRect.y = originalX + rect.y - trimmedLeft;

      if (tempRect.y < 0) {
        tempRect.height = tempRect.height + trimmedTop;
      }
    }

    return isRotated;
  };

  _proto._computeAlignmentOffset = function _computeAlignmentOffset() {
    _linesOffsetX.length = 0;

    switch (_hAlign) {
      case macro.TextAlignment.LEFT:
        for (var i = 0; i < _numberOfLines; ++i) {
          _linesOffsetX.push(0);
        }

        break;

      case macro.TextAlignment.CENTER:
        for (var _i = 0, l = _linesWidth.length; _i < l; _i++) {
          _linesOffsetX.push((_contentSize.width - _linesWidth[_i]) / 2);
        }

        break;

      case macro.TextAlignment.RIGHT:
        for (var _i2 = 0, _l = _linesWidth.length; _i2 < _l; _i2++) {
          _linesOffsetX.push(_contentSize.width - _linesWidth[_i2]);
        }

        break;

      default:
        break;
    } // TOP


    _letterOffsetY = _contentSize.height;

    if (_vAlign !== macro.VerticalTextAlignment.TOP) {
      var blank = _contentSize.height - _textDesiredHeight + _lineHeight * this._getFontScale() - _originFontSize * _bmfontScale;

      if (_vAlign === macro.VerticalTextAlignment.BOTTOM) {
        // BOTTOM
        _letterOffsetY -= blank;
      } else {
        // CENTER:
        _letterOffsetY -= blank / 2;
      }
    }
  };

  _proto._setupBMFontOverflowMetrics = function _setupBMFontOverflowMetrics() {
    var newWidth = _contentSize.width,
        newHeight = _contentSize.height;

    if (_overflow === Overflow.RESIZE_HEIGHT) {
      newHeight = 0;
    }

    if (_overflow === Overflow.NONE) {
      newWidth = 0;
      newHeight = 0;
    }

    _labelWidth = newWidth;
    _labelHeight = newHeight;
    _maxLineWidth = newWidth;
  };

  _proto.updateWorldVerts = function updateWorldVerts() {};

  _proto.appendQuad = function appendQuad(comp, texture, rect, rotated, x, y, scale) {};

  _proto._quadsUpdated = function _quadsUpdated(comp) {};

  _proto._reserveQuads = function _reserveQuads() {};

  return BmfontAssembler;
}(_assembler2d["default"]);

exports["default"] = BmfontAssembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3V0aWxzL2xhYmVsL2JtZm9udC5qcyJdLCJuYW1lcyI6WyJ0ZXh0VXRpbHMiLCJyZXF1aXJlIiwibWFjcm8iLCJMYWJlbCIsIk92ZXJmbG93Iiwic2hhcmVMYWJlbEluZm8iLCJMZXR0ZXJJbmZvIiwidmFsaWQiLCJ4IiwieSIsImxpbmUiLCJoYXNoIiwiX3RtcFJlY3QiLCJjYyIsInJlY3QiLCJfY29tcCIsIl9ob3Jpem9udGFsS2VybmluZ3MiLCJfbGV0dGVyc0luZm8iLCJfbGluZXNXaWR0aCIsIl9saW5lc09mZnNldFgiLCJfZm50Q29uZmlnIiwiX251bWJlck9mTGluZXMiLCJfdGV4dERlc2lyZWRIZWlnaHQiLCJfbGV0dGVyT2Zmc2V0WSIsIl90YWlsb3JlZFRvcFkiLCJfdGFpbG9yZWRCb3R0b21ZIiwiX2JtZm9udFNjYWxlIiwiX2xpbmVCcmVha1dpdGhvdXRTcGFjZXMiLCJfc3ByaXRlRnJhbWUiLCJfbGluZVNwYWNpbmciLCJfY29udGVudFNpemUiLCJzaXplIiwiX3N0cmluZyIsIl9mb250U2l6ZSIsIl9vcmlnaW5Gb250U2l6ZSIsIl9oQWxpZ24iLCJfdkFsaWduIiwiX3NwYWNpbmdYIiwiX2xpbmVIZWlnaHQiLCJfb3ZlcmZsb3ciLCJfaXNXcmFwVGV4dCIsIl9sYWJlbFdpZHRoIiwiX2xhYmVsSGVpZ2h0IiwiX21heExpbmVXaWR0aCIsIkJtZm9udEFzc2VtYmxlciIsInVwZGF0ZVJlbmRlckRhdGEiLCJjb21wIiwiX3ZlcnRzRGlydHkiLCJfcmVzZXJ2ZVF1YWRzIiwic3RyaW5nIiwidG9TdHJpbmciLCJsZW5ndGgiLCJfdXBkYXRlRm9udEZhbWlseSIsIl91cGRhdGVQcm9wZXJ0aWVzIiwiX3VwZGF0ZUxhYmVsSW5mbyIsIl91cGRhdGVDb250ZW50IiwidXBkYXRlV29ybGRWZXJ0cyIsIl9hY3R1YWxGb250U2l6ZSIsIm5vZGUiLCJzZXRDb250ZW50U2l6ZSIsIl9yZXNldFByb3BlcnRpZXMiLCJfdXBkYXRlRm9udFNjYWxlIiwiZm9udEFzc2V0IiwiZm9udCIsInNwcml0ZUZyYW1lIiwiZm9udEF0bGFzIiwiX2ZvbnREZWZEaWN0aW9uYXJ5IiwicGFja1RvRHluYW1pY0F0bGFzIiwibWFyZ2luIiwiZm9udFNpemUiLCJob3Jpem9udGFsQWxpZ24iLCJ2ZXJ0aWNhbEFsaWduIiwic3BhY2luZ1giLCJvdmVyZmxvdyIsIndpZHRoIiwiaGVpZ2h0IiwiTk9ORSIsIlJFU0laRV9IRUlHSFQiLCJlbmFibGVXcmFwVGV4dCIsImxpbmVIZWlnaHQiLCJfc2V0dXBCTUZvbnRPdmVyZmxvd01ldHJpY3MiLCJfY29tcHV0ZUhvcml6b250YWxLZXJuaW5nRm9yVGV4dCIsIl9hbGlnblRleHQiLCJzdHJpbmdMZW4iLCJob3Jpem9udGFsS2VybmluZ3MiLCJrZXJuaW5nRGljdCIsImpzIiwiaXNFbXB0eU9iamVjdCIsInByZXYiLCJpIiwia2V5IiwiY2hhckNvZGVBdCIsImtlcm5pbmdBbW91bnQiLCJfbXVsdGlsaW5lVGV4dFdyYXAiLCJuZXh0VG9rZW5GdW5jIiwidGV4dExlbiIsImxpbmVJbmRleCIsIm5leHRUb2tlblgiLCJuZXh0VG9rZW5ZIiwibG9uZ2VzdExpbmUiLCJsZXR0ZXJSaWdodCIsImhpZ2hlc3RZIiwibG93ZXN0WSIsImxldHRlckRlZiIsImxldHRlclBvc2l0aW9uIiwidjIiLCJpbmRleCIsImNoYXJhY3RlciIsImNoYXJBdCIsInB1c2giLCJfZ2V0Rm9udFNjYWxlIiwiX3JlY29yZFBsYWNlaG9sZGVySW5mbyIsInRva2VuTGVuIiwidG9rZW5IaWdoZXN0WSIsInRva2VuTG93ZXN0WSIsInRva2VuUmlnaHQiLCJuZXh0TGV0dGVyWCIsIm5ld0xpbmUiLCJ0bXAiLCJsZXR0ZXJJbmRleCIsImdldExldHRlckRlZmluaXRpb25Gb3JDaGFyIiwiYXRsYXNOYW1lIiwiY29uc29sZSIsImxvZyIsImxldHRlclgiLCJvZmZzZXRYIiwidyIsImlzVW5pY29kZVNwYWNlIiwib2Zmc2V0WSIsIl9yZWNvcmRMZXR0ZXJJbmZvIiwieEFkdmFuY2UiLCJoIiwicGFyc2VGbG9hdCIsInRvRml4ZWQiLCJDTEFNUCIsIl9nZXRGaXJzdENoYXJMZW4iLCJTSFJJTksiLCJfZ2V0Rmlyc3RXb3JkTGVuIiwidGV4dCIsInN0YXJ0SW5kZXgiLCJpc1VuaWNvZGVDSksiLCJsZW4iLCJfbXVsdGlsaW5lVGV4dFdyYXBCeVdvcmQiLCJfbXVsdGlsaW5lVGV4dFdyYXBCeUNoYXIiLCJjaGFyIiwidG1wSW5mbyIsImdldExldHRlciIsIl9jb21wdXRlQWxpZ25tZW50T2Zmc2V0IiwiX2lzVmVydGljYWxDbGFtcCIsIl9zaHJpbmtMYWJlbFRvQ29udGVudFNpemUiLCJfdXBkYXRlUXVhZHMiLCJfaXNIb3Jpem9udGFsQ2xhbXAiLCJfc2NhbGVGb250U2l6ZURvd24iLCJzaG91bGRVcGRhdGVDb250ZW50IiwibGFtYmRhIiwibGVmdCIsInJpZ2h0IiwibWlkIiwibmV3Rm9udFNpemUiLCJhY3R1YWxGb250U2l6ZSIsImxldHRlckNsYW1wIiwiY3RyIiwibCIsImxldHRlckluZm8iLCJweCIsIndvcmRXaWR0aCIsIl9pc0hvcml6b250YWxDbGFtcGVkIiwibGV0dGVyT3ZlckNsYW1wIiwidGV4dHVyZSIsIl90ZXh0dXJlIiwiZ2V0VGV4dHVyZSIsInZlcnRpY2VzQ291bnQiLCJpbmRpY2VzQ291bnQiLCJfcmVuZGVyRGF0YSIsImRhdGFMZW5ndGgiLCJjb250ZW50U2l6ZSIsImFwcHgiLCJfYW5jaG9yUG9pbnQiLCJhcHB5IiwicmV0IiwidSIsInYiLCJweSIsImNsaXBUb3AiLCJpc1JvdGF0ZWQiLCJfZGV0ZXJtaW5lUmVjdCIsImxldHRlclBvc2l0aW9uWCIsImFwcGVuZFF1YWQiLCJfcXVhZHNVcGRhdGVkIiwidGVtcFJlY3QiLCJvcmlnaW5hbFNpemUiLCJfb3JpZ2luYWxTaXplIiwiX3JlY3QiLCJvZmZzZXQiLCJfb2Zmc2V0IiwidHJpbW1lZExlZnQiLCJ0cmltbWVkVG9wIiwib3JpZ2luYWxYIiwiVGV4dEFsaWdubWVudCIsIkxFRlQiLCJDRU5URVIiLCJSSUdIVCIsIlZlcnRpY2FsVGV4dEFsaWdubWVudCIsIlRPUCIsImJsYW5rIiwiQk9UVE9NIiwibmV3V2lkdGgiLCJuZXdIZWlnaHQiLCJyb3RhdGVkIiwic2NhbGUiLCJBc3NlbWJsZXIyRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsMkJBQUQsQ0FBekI7O0FBQ0EsSUFBTUMsS0FBSyxHQUFHRCxPQUFPLENBQUMsMkJBQUQsQ0FBckI7O0FBQ0EsSUFBTUUsS0FBSyxHQUFHRixPQUFPLENBQUMsNkJBQUQsQ0FBckI7O0FBQ0EsSUFBTUcsUUFBUSxHQUFHRCxLQUFLLENBQUNDLFFBQXZCOztBQUVBLElBQU1DLGNBQWMsR0FBR0osT0FBTyxDQUFDLFVBQUQsQ0FBUCxDQUFvQkksY0FBM0M7O0FBRUEsSUFBSUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsR0FBVztBQUN4QixpQkFBWSxFQUFaO0FBQ0EsT0FBS0MsS0FBTCxHQUFhLElBQWI7QUFDQSxPQUFLQyxDQUFMLEdBQVMsQ0FBVDtBQUNBLE9BQUtDLENBQUwsR0FBUyxDQUFUO0FBQ0EsT0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxPQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNILENBUEQ7O0FBU0EsSUFBSUMsUUFBUSxHQUFHQyxFQUFFLENBQUNDLElBQUgsRUFBZjs7QUFFQSxJQUFJQyxLQUFLLEdBQUcsSUFBWjtBQUVBLElBQUlDLG1CQUFtQixHQUFHLEVBQTFCO0FBQ0EsSUFBSUMsWUFBWSxHQUFHLEVBQW5CO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsSUFBSUMsYUFBYSxHQUFHLEVBQXBCO0FBRUEsSUFBSUMsVUFBVSxHQUFHLElBQWpCO0FBQ0EsSUFBSUMsY0FBYyxHQUFHLENBQXJCO0FBQ0EsSUFBSUMsa0JBQWtCLEdBQUksQ0FBMUI7QUFDQSxJQUFJQyxjQUFjLEdBQUksQ0FBdEI7QUFD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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgQXNzZW1ibGVyMkQgZnJvbSAnLi4vLi4vYXNzZW1ibGVyLTJkJztcblxuY29uc3QgdGV4dFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbHMvdGV4dC11dGlscycpO1xuY29uc3QgbWFjcm8gPSByZXF1aXJlKCcuLi8uLi8uLi9wbGF0Zm9ybS9DQ01hY3JvJyk7XG5jb25zdCBMYWJlbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbXBvbmVudHMvQ0NMYWJlbCcpO1xuY29uc3QgT3ZlcmZsb3cgPSBMYWJlbC5PdmVyZmxvdztcblxuY29uc3Qgc2hhcmVMYWJlbEluZm8gPSByZXF1aXJlKCcuLi91dGlscycpLnNoYXJlTGFiZWxJbmZvO1xuXG5sZXQgTGV0dGVySW5mbyA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuY2hhciA9ICcnO1xuICAgIHRoaXMudmFsaWQgPSB0cnVlO1xuICAgIHRoaXMueCA9IDA7XG4gICAgdGhpcy55ID0gMDtcbiAgICB0aGlzLmxpbmUgPSAwO1xuICAgIHRoaXMuaGFzaCA9IFwiXCI7XG59O1xuXG5sZXQgX3RtcFJlY3QgPSBjYy5yZWN0KCk7XG5cbmxldCBfY29tcCA9IG51bGw7XG5cbmxldCBfaG9yaXpvbnRhbEtlcm5pbmdzID0gW107XG5sZXQgX2xldHRlcnNJbmZvID0gW107XG5sZXQgX2xpbmVzV2lkdGggPSBbXTtcbmxldCBfbGluZXNPZmZzZXRYID0gW107XG5cbmxldCBfZm50Q29uZmlnID0gbnVsbDtcbmxldCBfbnVtYmVyT2ZMaW5lcyA9IDA7XG5sZXQgX3RleHREZXNpcmVkSGVpZ2h0ID0gIDA7XG5sZXQgX2xldHRlck9mZnNldFkgPSAgMDtcbmxldCBfdGFpbG9yZWRUb3BZID0gIDA7XG5cbmxldCBfdGFpbG9yZWRCb3R0b21ZID0gIDA7XG5sZXQgX2JtZm9udFNjYWxlID0gIDEuMDtcblxubGV0IF9saW5lQnJlYWtXaXRob3V0U3BhY2VzID0gIGZhbHNlO1xubGV0IF9zcHJpdGVGcmFtZSA9IG51bGw7XG5sZXQgX2xpbmVTcGFjaW5nID0gMDtcbmxldCBfY29udGVudFNpemUgPSBjYy5zaXplKCk7XG5sZXQgX3N0cmluZyA9ICcnO1xubGV0IF9mb250U2l6ZSA9IDA7XG5sZXQgX29yaWdpbkZvbnRTaXplID0gMDtcbmxldCBfaEFsaWduID0gMDtcbmxldCBfdkFsaWduID0gMDtcbmxldCBfc3BhY2luZ1ggPSAwO1xubGV0IF9saW5lSGVpZ2h0ID0gMDtcbmxldCBfb3ZlcmZsb3cgPSAwO1xubGV0IF9pc1dyYXBUZXh0ID0gZmFsc2U7XG5sZXQgX2xhYmVsV2lkdGggPSAwO1xubGV0IF9sYWJlbEhlaWdodCA9IDA7XG5sZXQgX21heExpbmVXaWR0aCA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJtZm9udEFzc2VtYmxlciBleHRlbmRzIEFzc2VtYmxlcjJEIHtcbiAgICB1cGRhdGVSZW5kZXJEYXRhIChjb21wKSB7XG4gICAgICAgIGlmICghY29tcC5fdmVydHNEaXJ0eSkgcmV0dXJuO1xuICAgICAgICBpZiAoX2NvbXAgPT09IGNvbXApIHJldHVybjtcblxuICAgICAgICBfY29tcCA9IGNvbXA7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9yZXNlcnZlUXVhZHMoY29tcCwgY29tcC5zdHJpbmcudG9TdHJpbmcoKS5sZW5ndGgpO1xuICAgICAgICB0aGlzLl91cGRhdGVGb250RmFtaWx5KGNvbXApO1xuICAgICAgICB0aGlzLl91cGRhdGVQcm9wZXJ0aWVzKGNvbXApO1xuICAgICAgICB0aGlzLl91cGRhdGVMYWJlbEluZm8oY29tcCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNvbnRlbnQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVXb3JsZFZlcnRzKGNvbXApO1xuICAgICAgICBcbiAgICAgICAgX2NvbXAuX2FjdHVhbEZvbnRTaXplID0gX2ZvbnRTaXplO1xuICAgICAgICBfY29tcC5ub2RlLnNldENvbnRlbnRTaXplKF9jb250ZW50U2l6ZSk7XG5cbiAgICAgICAgX2NvbXAuX3ZlcnRzRGlydHkgPSBmYWxzZTtcbiAgICAgICAgX2NvbXAgPSBudWxsO1xuICAgICAgICB0aGlzLl9yZXNldFByb3BlcnRpZXMoKTtcbiAgICB9XG5cbiAgICBfdXBkYXRlRm9udFNjYWxlICgpIHtcbiAgICAgICAgX2JtZm9udFNjYWxlID0gX2ZvbnRTaXplIC8gX29yaWdpbkZvbnRTaXplO1xuICAgIH1cblxuICAgIF91cGRhdGVGb250RmFtaWx5IChjb21wKSB7XG4gICAgICAgIGxldCBmb250QXNzZXQgPSBjb21wLmZvbnQ7XG4gICAgICAgIF9zcHJpdGVGcmFtZSA9IGZvbnRBc3NldC5zcHJpdGVGcmFtZTtcbiAgICAgICAgX2ZudENvbmZpZyA9IGZvbnRBc3NldC5fZm50Q29uZmlnO1xuICAgICAgICBzaGFyZUxhYmVsSW5mby5mb250QXRsYXMgPSBmb250QXNzZXQuX2ZvbnREZWZEaWN0aW9uYXJ5O1xuXG4gICAgICAgIHRoaXMucGFja1RvRHluYW1pY0F0bGFzKGNvbXAsIF9zcHJpdGVGcmFtZSk7XG4gICAgfVxuXG4gICAgX3VwZGF0ZUxhYmVsSW5mbygpIHtcbiAgICAgICAgLy8gY2xlYXJcbiAgICAgICAgc2hhcmVMYWJlbEluZm8uaGFzaCA9IFwiXCI7XG4gICAgICAgIHNoYXJlTGFiZWxJbmZvLm1hcmdpbiA9IDA7XG4gICAgfVxuXG4gICAgX3VwZGF0ZVByb3BlcnRpZXMgKGNvbXApIHtcbiAgICAgICAgX3N0cmluZyA9IGNvbXAuc3RyaW5nLnRvU3RyaW5nKCk7XG4gICAgICAgIF9mb250U2l6ZSA9IGNvbXAuZm9udFNpemU7XG4gICAgICAgIF9vcmlnaW5Gb250U2l6ZSA9IF9mbnRDb25maWcgPyBfZm50Q29uZmlnLmZvbnRTaXplIDogY29tcC5mb250U2l6ZTtcbiAgICAgICAgX2hBbGlnbiA9IGNvbXAuaG9yaXpvbnRhbEFsaWduO1xuICAgICAgICBfdkFsaWduID0gY29tcC52ZXJ0aWNhbEFsaWduO1xuICAgICAgICBfc3BhY2luZ1ggPSBjb21wLnNwYWNpbmdYO1xuICAgICAgICBfb3ZlcmZsb3cgPSBjb21wLm92ZXJmbG93O1xuICAgICAgICBfbGluZUhlaWdodCA9IGNvbXAuX2xpbmVIZWlnaHQ7XG4gICAgICAgIFxuICAgICAgICBfY29udGVudFNpemUud2lkdGggPSBjb21wLm5vZGUud2lkdGg7XG4gICAgICAgIF9jb250ZW50U2l6ZS5oZWlnaHQgPSBjb21wLm5vZGUuaGVpZ2h0O1xuXG4gICAgICAgIC8vIHNob3VsZCB3cmFwIHRleHRcbiAgICAgICAgaWYgKF9vdmVyZmxvdyA9PT0gT3ZlcmZsb3cuTk9ORSkge1xuICAgICAgICAgICAgX2lzV3JhcFRleHQgPSBmYWxzZTtcbiAgICAgICAgICAgIF9jb250ZW50U2l6ZS53aWR0aCArPSBzaGFyZUxhYmVsSW5mby5tYXJnaW4gKiAyO1xuICAgICAgICAgICAgX2NvbnRlbnRTaXplLmhlaWdodCArPSBzaGFyZUxhYmVsSW5mby5tYXJnaW4gKiAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKF9vdmVyZmxvdyA9PT0gT3ZlcmZsb3cuUkVTSVpFX0hFSUdIVCkge1xuICAgICAgICAgICAgX2lzV3JhcFRleHQgPSB0cnVlO1xuICAgICAgICAgICAgX2NvbnRlbnRTaXplLmhlaWdodCArPSBzaGFyZUxhYmVsSW5mby5tYXJnaW4gKiAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX2lzV3JhcFRleHQgPSBjb21wLmVuYWJsZVdyYXBUZXh0O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzaGFyZUxhYmVsSW5mby5saW5lSGVpZ2h0ID0gX2xpbmVIZWlnaHQ7XG4gICAgICAgIHNoYXJlTGFiZWxJbmZvLmZvbnRTaXplID0gX2ZvbnRTaXplO1xuXG4gICAgICAgIHRoaXMuX3NldHVwQk1Gb250T3ZlcmZsb3dNZXRyaWNzKCk7XG4gICAgfVxuXG4gICAgX3Jlc2V0UHJvcGVydGllcyAoKSB7XG4gICAgICAgIF9mbnRDb25maWcgPSBudWxsO1xuICAgICAgICBfc3ByaXRlRnJhbWUgPSBudWxsO1xuICAgICAgICBzaGFyZUxhYmVsSW5mby5oYXNoID0gXCJcIjtcbiAgICAgICAgc2hhcmVMYWJlbEluZm8ubWFyZ2luID0gMDtcbiAgICB9XG5cbiAgICBfdXBkYXRlQ29udGVudCAoKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUZvbnRTY2FsZSgpO1xuICAgICAgICB0aGlzLl9jb21wdXRlSG9yaXpvbnRhbEtlcm5pbmdGb3JUZXh0KCk7XG4gICAgICAgIHRoaXMuX2FsaWduVGV4dCgpO1xuICAgIH1cblxuICAgIF9jb21wdXRlSG9yaXpvbnRhbEtlcm5pbmdGb3JUZXh0ICgpIHtcbiAgICAgICAgbGV0IHN0cmluZyA9IF9zdHJpbmc7XG4gICAgICAgIGxldCBzdHJpbmdMZW4gPSBzdHJpbmcubGVuZ3RoO1xuXG4gICAgICAgIGxldCBob3Jpem9udGFsS2VybmluZ3MgPSBfaG9yaXpvbnRhbEtlcm5pbmdzO1xuICAgICAgICBsZXQga2VybmluZ0RpY3Q7XG4gICAgICAgIF9mbnRDb25maWcgJiYgKGtlcm5pbmdEaWN0ID0gX2ZudENvbmZpZy5rZXJuaW5nRGljdCk7XG4gICAgICAgIGlmIChrZXJuaW5nRGljdCAmJiAhY2MuanMuaXNFbXB0eU9iamVjdChrZXJuaW5nRGljdCkpIHtcbiAgICAgICAgICAgIGxldCBwcmV2ID0gLTE7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZ0xlbjsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgICAgIGxldCBrZXJuaW5nQW1vdW50ID0ga2VybmluZ0RpY3RbKHByZXYgPDwgMTYpIHwgKGtleSAmIDB4ZmZmZildIHx8IDA7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCBzdHJpbmdMZW4gLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxLZXJuaW5nc1tpXSA9IGtlcm5pbmdBbW91bnQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbEtlcm5pbmdzW2ldID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldiA9IGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhvcml6b250YWxLZXJuaW5ncy5sZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX211bHRpbGluZVRleHRXcmFwIChuZXh0VG9rZW5GdW5jKSB7XG4gICAgICAgIGxldCB0ZXh0TGVuID0gX3N0cmluZy5sZW5ndGg7XG5cbiAgICAgICAgbGV0IGxpbmVJbmRleCA9IDA7XG4gICAgICAgIGxldCBuZXh0VG9rZW5YID0gMDtcbiAgICAgICAgbGV0IG5leHRUb2tlblkgPSAwO1xuICAgICAgICBsZXQgbG9uZ2VzdExpbmUgPSAwO1xuICAgICAgICBsZXQgbGV0dGVyUmlnaHQgPSAwO1xuXG4gICAgICAgIGxldCBoaWdoZXN0WSA9IDA7XG4gICAgICAgIGxldCBsb3dlc3RZID0gMDtcbiAgICAgICAgbGV0IGxldHRlckRlZiA9IG51bGw7XG4gICAgICAgIGxldCBsZXR0ZXJQb3NpdGlvbiA9IGNjLnYyKDAsIDApO1xuXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0ZXh0TGVuOykge1xuICAgICAgICAgICAgbGV0IGNoYXJhY3RlciA9IF9zdHJpbmcuY2hhckF0KGluZGV4KTtcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXIgPT09IFwiXFxuXCIpIHtcbiAgICAgICAgICAgICAgICBfbGluZXNXaWR0aC5wdXNoKGxldHRlclJpZ2h0KTtcbiAgICAgICAgICAgICAgICBsZXR0ZXJSaWdodCA9IDA7XG4gICAgICAgICAgICAgICAgbGluZUluZGV4Kys7XG4gICAgICAgICAgICAgICAgbmV4dFRva2VuWCA9IDA7XG4gICAgICAgICAgICAgICAgbmV4dFRva2VuWSAtPSBfbGluZUhlaWdodCAqIHRoaXMuX2dldEZvbnRTY2FsZSgpICsgX2xpbmVTcGFjaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlY29yZFBsYWNlaG9sZGVySW5mbyhpbmRleCwgY2hhcmFjdGVyKTtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgdG9rZW5MZW4gPSBuZXh0VG9rZW5GdW5jKF9zdHJpbmcsIGluZGV4LCB0ZXh0TGVuKTtcbiAgICAgICAgICAgIGxldCB0b2tlbkhpZ2hlc3RZID0gaGlnaGVzdFk7XG4gICAgICAgICAgICBsZXQgdG9rZW5Mb3dlc3RZID0gbG93ZXN0WTtcbiAgICAgICAgICAgIGxldCB0b2tlblJpZ2h0ID0gbGV0dGVyUmlnaHQ7XG4gICAgICAgICAgICBsZXQgbmV4dExldHRlclggPSBuZXh0VG9rZW5YO1xuICAgICAgICAgICAgbGV0IG5ld0xpbmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgZm9yIChsZXQgdG1wID0gMDsgdG1wIDwgdG9rZW5MZW47ICsrdG1wKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxldHRlckluZGV4ID0gaW5kZXggKyB0bXA7XG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyID0gX3N0cmluZy5jaGFyQXQobGV0dGVySW5kZXgpO1xuICAgICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXIgPT09IFwiXFxyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVjb3JkUGxhY2Vob2xkZXJJbmZvKGxldHRlckluZGV4LCBjaGFyYWN0ZXIpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0dGVyRGVmID0gc2hhcmVMYWJlbEluZm8uZm9udEF0bGFzLmdldExldHRlckRlZmluaXRpb25Gb3JDaGFyKGNoYXJhY3Rlciwgc2hhcmVMYWJlbEluZm8pO1xuICAgICAgICAgICAgICAgIGlmICghbGV0dGVyRGVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlY29yZFBsYWNlaG9sZGVySW5mbyhsZXR0ZXJJbmRleCwgY2hhcmFjdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0bGFzTmFtZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIF9mbnRDb25maWcgJiYgKGF0bGFzTmFtZSA9IF9mbnRDb25maWcuYXRsYXNOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYW4ndCBmaW5kIGxldHRlciBkZWZpbml0aW9uIGluIHRleHR1cmUgYXRsYXMgXCIgKyBhdGxhc05hbWUgKyBcIiBmb3IgbGV0dGVyOlwiICsgY2hhcmFjdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGxldHRlclggPSBuZXh0TGV0dGVyWCArIGxldHRlckRlZi5vZmZzZXRYICogX2JtZm9udFNjYWxlIC0gc2hhcmVMYWJlbEluZm8ubWFyZ2luO1xuXG4gICAgICAgICAgICAgICAgaWYgKF9pc1dyYXBUZXh0XG4gICAgICAgICAgICAgICAgICAgICYmIF9tYXhMaW5lV2lkdGggPiAwXG4gICAgICAgICAgICAgICAgICAgICYmIG5leHRUb2tlblggPiAwXG4gICAgICAgICAgICAgICAgICAgICYmIGxldHRlclggKyBsZXR0ZXJEZWYudyAqIF9ibWZvbnRTY2FsZSA+IF9tYXhMaW5lV2lkdGhcbiAgICAgICAgICAgICAgICAgICAgJiYgIXRleHRVdGlscy5pc1VuaWNvZGVTcGFjZShjaGFyYWN0ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9saW5lc1dpZHRoLnB1c2gobGV0dGVyUmlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBsZXR0ZXJSaWdodCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGxpbmVJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICBuZXh0VG9rZW5YID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFRva2VuWSAtPSAoX2xpbmVIZWlnaHQgKiB0aGlzLl9nZXRGb250U2NhbGUoKSArIF9saW5lU3BhY2luZyk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0xpbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXR0ZXJQb3NpdGlvbi54ID0gbGV0dGVyWDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXR0ZXJQb3NpdGlvbi55ID0gbmV4dFRva2VuWSAtIGxldHRlckRlZi5vZmZzZXRZICogX2JtZm9udFNjYWxlICArIHNoYXJlTGFiZWxJbmZvLm1hcmdpbjtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNvcmRMZXR0ZXJJbmZvKGxldHRlclBvc2l0aW9uLCBjaGFyYWN0ZXIsIGxldHRlckluZGV4LCBsaW5lSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxldHRlckluZGV4ICsgMSA8IF9ob3Jpem9udGFsS2VybmluZ3MubGVuZ3RoICYmIGxldHRlckluZGV4IDwgdGV4dExlbiAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dExldHRlclggKz0gX2hvcml6b250YWxLZXJuaW5nc1tsZXR0ZXJJbmRleCArIDFdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5leHRMZXR0ZXJYICs9IGxldHRlckRlZi54QWR2YW5jZSAqIF9ibWZvbnRTY2FsZSArIF9zcGFjaW5nWCAgLSBzaGFyZUxhYmVsSW5mby5tYXJnaW4gKiAyO1xuXG4gICAgICAgICAgICAgICAgdG9rZW5SaWdodCA9IGxldHRlclBvc2l0aW9uLnggKyBsZXR0ZXJEZWYudyAqIF9ibWZvbnRTY2FsZSAgLSBzaGFyZUxhYmVsSW5mby5tYXJnaW47XG5cbiAgICAgICAgICAgICAgICBpZiAodG9rZW5IaWdoZXN0WSA8IGxldHRlclBvc2l0aW9uLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5IaWdoZXN0WSA9IGxldHRlclBvc2l0aW9uLnk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRva2VuTG93ZXN0WSA+IGxldHRlclBvc2l0aW9uLnkgLSBsZXR0ZXJEZWYuaCAqIF9ibWZvbnRTY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbkxvd2VzdFkgPSBsZXR0ZXJQb3NpdGlvbi55IC0gbGV0dGVyRGVmLmggKiBfYm1mb250U2NhbGU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IC8vZW5kIG9mIGZvciBsb29wXG5cbiAgICAgICAgICAgIGlmIChuZXdMaW5lKSBjb250aW51ZTtcblxuICAgICAgICAgICAgbmV4dFRva2VuWCA9IG5leHRMZXR0ZXJYO1xuICAgICAgICAgICAgbGV0dGVyUmlnaHQgPSB0b2tlblJpZ2h0O1xuXG4gICAgICAgICAgICBpZiAoaGlnaGVzdFkgPCB0b2tlbkhpZ2hlc3RZKSB7XG4gICAgICAgICAgICAgICAgaGlnaGVzdFkgPSB0b2tlbkhpZ2hlc3RZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxvd2VzdFkgPiB0b2tlbkxvd2VzdFkpIHtcbiAgICAgICAgICAgICAgICBsb3dlc3RZID0gdG9rZW5Mb3dlc3RZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxvbmdlc3RMaW5lIDwgbGV0dGVyUmlnaHQpIHtcbiAgICAgICAgICAgICAgICBsb25nZXN0TGluZSA9IGxldHRlclJpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbmRleCArPSB0b2tlbkxlbjtcbiAgICAgICAgfSAvL2VuZCBvZiBmb3IgbG9vcFxuXG4gICAgICAgIF9saW5lc1dpZHRoLnB1c2gobGV0dGVyUmlnaHQpO1xuXG4gICAgICAgIF9udW1iZXJPZkxpbmVzID0gbGluZUluZGV4ICsgMTtcbiAgICAgICAgX3RleHREZXNpcmVkSGVpZ2h0ID0gX251bWJlck9mTGluZXMgKiBfbGluZUhlaWdodCAqIHRoaXMuX2dldEZvbnRTY2FsZSgpO1xuICAgICAgICBpZiAoX251bWJlck9mTGluZXMgPiAxKSB7XG4gICAgICAgICAgICBfdGV4dERlc2lyZWRIZWlnaHQgKz0gKF9udW1iZXJPZkxpbmVzIC0gMSkgKiBfbGluZVNwYWNpbmc7XG4gICAgICAgIH1cblxuICAgICAgICBfY29udGVudFNpemUud2lkdGggPSBfbGFiZWxXaWR0aDtcbiAgICAgICAgX2NvbnRlbnRTaXplLmhlaWdodCA9IF9sYWJlbEhlaWdodDtcbiAgICAgICAgaWYgKF9sYWJlbFdpZHRoIDw9IDApIHtcbiAgICAgICAgICAgIF9jb250ZW50U2l6ZS53aWR0aCA9IHBhcnNlRmxvYXQobG9uZ2VzdExpbmUudG9GaXhlZCgyKSkgKyBzaGFyZUxhYmVsSW5mby5tYXJnaW4gKiAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChfbGFiZWxIZWlnaHQgPD0gMCkge1xuICAgICAgICAgICAgX2NvbnRlbnRTaXplLmhlaWdodCA9IHBhcnNlRmxvYXQoX3RleHREZXNpcmVkSGVpZ2h0LnRvRml4ZWQoMikpICsgc2hhcmVMYWJlbEluZm8ubWFyZ2luICogMjtcbiAgICAgICAgfVxuXG4gICAgICAgIF90YWlsb3JlZFRvcFkgPSBfY29udGVudFNpemUuaGVpZ2h0O1xuICAgICAgICBfdGFpbG9yZWRCb3R0b21ZID0gMDtcblxuICAgICAgICBpZiAoX292ZXJmbG93ICE9PSBPdmVyZmxvdy5DTEFNUCkge1xuICAgICAgICAgICAgaWYgKGhpZ2hlc3RZID4gMCkge1xuICAgICAgICAgICAgICAgIF90YWlsb3JlZFRvcFkgPSBfY29udGVudFNpemUuaGVpZ2h0ICsgaGlnaGVzdFk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBpZiAobG93ZXN0WSA8IC1fdGV4dERlc2lyZWRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBfdGFpbG9yZWRCb3R0b21ZID0gX3RleHREZXNpcmVkSGVpZ2h0ICsgbG93ZXN0WTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIF9nZXRGaXJzdENoYXJMZW4gKCkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICBfZ2V0Rm9udFNjYWxlICgpIHtcbiAgICAgICAgcmV0dXJuIF9vdmVyZmxvdyA9PT0gT3ZlcmZsb3cuU0hSSU5LID8gX2JtZm9udFNjYWxlIDogMTtcbiAgICB9XG5cbiAgICBfZ2V0Rmlyc3RXb3JkTGVuICh0ZXh0LCBzdGFydEluZGV4LCB0ZXh0TGVuKSB7XG4gICAgICAgIGxldCBjaGFyYWN0ZXIgPSB0ZXh0LmNoYXJBdChzdGFydEluZGV4KTtcbiAgICAgICAgaWYgKHRleHRVdGlscy5pc1VuaWNvZGVDSksoY2hhcmFjdGVyKVxuICAgICAgICAgICAgfHwgY2hhcmFjdGVyID09PSBcIlxcblwiXG4gICAgICAgICAgICB8fCB0ZXh0VXRpbHMuaXNVbmljb2RlU3BhY2UoY2hhcmFjdGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGVuID0gMTtcbiAgICAgICAgbGV0IGxldHRlckRlZiA9IHNoYXJlTGFiZWxJbmZvLmZvbnRBdGxhcy5nZXRMZXR0ZXJEZWZpbml0aW9uRm9yQ2hhcihjaGFyYWN0ZXIsIHNoYXJlTGFiZWxJbmZvKTtcbiAgICAgICAgaWYgKCFsZXR0ZXJEZWYpIHtcbiAgICAgICAgICAgIHJldHVybiBsZW47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5leHRMZXR0ZXJYID0gbGV0dGVyRGVmLnhBZHZhbmNlICogX2JtZm9udFNjYWxlICsgX3NwYWNpbmdYO1xuICAgICAgICBsZXQgbGV0dGVyWDtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSBzdGFydEluZGV4ICsgMTsgaW5kZXggPCB0ZXh0TGVuOyArK2luZGV4KSB7XG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSB0ZXh0LmNoYXJBdChpbmRleCk7XG5cbiAgICAgICAgICAgIGxldHRlckRlZiA9IHNoYXJlTGFiZWxJbmZvLmZvbnRBdGxhcy5nZXRMZXR0ZXJEZWZpbml0aW9uRm9yQ2hhcihjaGFyYWN0ZXIsIHNoYXJlTGFiZWxJbmZvKTtcbiAgICAgICAgICAgIGlmICghbGV0dGVyRGVmKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXR0ZXJYID0gbmV4dExldHRlclggKyBsZXR0ZXJEZWYub2Zmc2V0WCAqIF9ibWZvbnRTY2FsZTtcblxuICAgICAgICAgICAgaWYobGV0dGVyWCArIGxldHRlckRlZi53ICogX2JtZm9udFNjYWxlID4gX21heExpbmVXaWR0aFxuICAgICAgICAgICAgICAgJiYgIXRleHRVdGlscy5pc1VuaWNvZGVTcGFjZShjaGFyYWN0ZXIpXG4gICAgICAgICAgICAgICAmJiBfbWF4TGluZVdpZHRoID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsZW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0TGV0dGVyWCArPSBsZXR0ZXJEZWYueEFkdmFuY2UgKiBfYm1mb250U2NhbGUgKyBfc3BhY2luZ1g7XG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyID09PSBcIlxcblwiXG4gICAgICAgICAgICAgICAgfHwgdGV4dFV0aWxzLmlzVW5pY29kZVNwYWNlKGNoYXJhY3RlcilcbiAgICAgICAgICAgICAgICB8fCB0ZXh0VXRpbHMuaXNVbmljb2RlQ0pLKGNoYXJhY3RlcikpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxlbisrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxlbjtcbiAgICB9XG5cbiAgICBfbXVsdGlsaW5lVGV4dFdyYXBCeVdvcmQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbXVsdGlsaW5lVGV4dFdyYXAodGhpcy5fZ2V0Rmlyc3RXb3JkTGVuKTtcbiAgICB9XG5cbiAgICBfbXVsdGlsaW5lVGV4dFdyYXBCeUNoYXIgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbXVsdGlsaW5lVGV4dFdyYXAodGhpcy5fZ2V0Rmlyc3RDaGFyTGVuKTtcbiAgICB9XG5cbiAgICBfcmVjb3JkUGxhY2Vob2xkZXJJbmZvIChsZXR0ZXJJbmRleCwgY2hhcikge1xuICAgICAgICBpZiAobGV0dGVySW5kZXggPj0gX2xldHRlcnNJbmZvLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHRtcEluZm8gPSBuZXcgTGV0dGVySW5mbygpO1xuICAgICAgICAgICAgX2xldHRlcnNJbmZvLnB1c2godG1wSW5mbyk7XG4gICAgICAgIH1cblxuICAgICAgICBfbGV0dGVyc0luZm9bbGV0dGVySW5kZXhdLmNoYXIgPSBjaGFyO1xuICAgICAgICBfbGV0dGVyc0luZm9bbGV0dGVySW5kZXhdLmhhc2ggPSBjaGFyLmNoYXJDb2RlQXQoMCkgKyBzaGFyZUxhYmVsSW5mby5oYXNoO1xuICAgICAgICBfbGV0dGVyc0luZm9bbGV0dGVySW5kZXhdLnZhbGlkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgX3JlY29yZExldHRlckluZm8gKGxldHRlclBvc2l0aW9uLCBjaGFyYWN0ZXIsIGxldHRlckluZGV4LCBsaW5lSW5kZXgpIHtcbiAgICAgICAgaWYgKGxldHRlckluZGV4ID49IF9sZXR0ZXJzSW5mby5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCB0bXBJbmZvID0gbmV3IExldHRlckluZm8oKTtcbiAgICAgICAgICAgIF9sZXR0ZXJzSW5mby5wdXNoKHRtcEluZm8pO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjaGFyID0gY2hhcmFjdGVyLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIGxldCBrZXkgPSBjaGFyICsgc2hhcmVMYWJlbEluZm8uaGFzaDtcblxuICAgICAgICBfbGV0dGVyc0luZm9bbGV0dGVySW5kZXhdLmxpbmU9IGxpbmVJbmRleDtcbiAgICAgICAgX2xldHRlcnNJbmZvW2xldHRlckluZGV4XS5jaGFyID0gY2hhcmFjdGVyO1xuICAgICAgICBfbGV0dGVyc0luZm9bbGV0dGVySW5kZXhdLmhhc2ggPSBrZXk7XG4gICAgICAgIF9sZXR0ZXJzSW5mb1tsZXR0ZXJJbmRleF0udmFsaWQgPSBzaGFyZUxhYmVsSW5mby5mb250QXRsYXMuZ2V0TGV0dGVyKGtleSkudmFsaWQ7XG4gICAgICAgIF9sZXR0ZXJzSW5mb1tsZXR0ZXJJbmRleF0ueCA9IGxldHRlclBvc2l0aW9uLng7XG4gICAgICAgIF9sZXR0ZXJzSW5mb1tsZXR0ZXJJbmRleF0ueSA9IGxldHRlclBvc2l0aW9uLnk7XG4gICAgfVxuXG4gICAgX2FsaWduVGV4dCAoKSB7XG4gICAgICAgIF90ZXh0RGVzaXJlZEhlaWdodCA9IDA7XG4gICAgICAgIF9saW5lc1dpZHRoLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgaWYgKCFfbGluZUJyZWFrV2l0aG91dFNwYWNlcykge1xuICAgICAgICAgICAgdGhpcy5fbXVsdGlsaW5lVGV4dFdyYXBCeVdvcmQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX211bHRpbGluZVRleHRXcmFwQnlDaGFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb21wdXRlQWxpZ25tZW50T2Zmc2V0KCk7XG5cbiAgICAgICAgLy9zaHJpbmtcbiAgICAgICAgaWYgKF9vdmVyZmxvdyA9PT0gT3ZlcmZsb3cuU0hSSU5LKSB7XG4gICAgICAgICAgICBpZiAoX2ZvbnRTaXplID4gMCAmJiB0aGlzLl9pc1ZlcnRpY2FsQ2xhbXAoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nocmlua0xhYmVsVG9Db250ZW50U2l6ZSh0aGlzLl9pc1ZlcnRpY2FsQ2xhbXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl91cGRhdGVRdWFkcygpKSB7XG4gICAgICAgICAgICBpZiAoX292ZXJmbG93ID09PSBPdmVyZmxvdy5TSFJJTkspIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaHJpbmtMYWJlbFRvQ29udGVudFNpemUodGhpcy5faXNIb3Jpem9udGFsQ2xhbXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3NjYWxlRm9udFNpemVEb3duIChmb250U2l6ZSkge1xuICAgICAgICBsZXQgc2hvdWxkVXBkYXRlQ29udGVudCA9IHRydWU7XG4gICAgICAgIGlmICghZm9udFNpemUpIHtcbiAgICAgICAgICAgIGZvbnRTaXplID0gMC4xO1xuICAgICAgICAgICAgc2hvdWxkVXBkYXRlQ29udGVudCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIF9mb250U2l6ZSA9IGZvbnRTaXplO1xuXG4gICAgICAgIGlmIChzaG91bGRVcGRhdGVDb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDb250ZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfc2hyaW5rTGFiZWxUb0NvbnRlbnRTaXplIChsYW1iZGEpIHtcbiAgICAgICAgbGV0IGZvbnRTaXplID0gX2ZvbnRTaXplO1xuXG4gICAgICAgIGxldCBsZWZ0ID0gMCwgcmlnaHQgPSBmb250U2l6ZSB8IDAsIG1pZCA9IDA7XG4gICAgICAgIHdoaWxlIChsZWZ0IDwgcmlnaHQpIHtcbiAgICAgICAgICAgIG1pZCA9IChsZWZ0ICsgcmlnaHQgKyAxKSA+PiAxO1xuXG4gICAgICAgICAgICBsZXQgbmV3Rm9udFNpemUgPSBtaWQ7XG4gICAgICAgICAgICBpZiAobmV3Rm9udFNpemUgPD0gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfYm1mb250U2NhbGUgPSBuZXdGb250U2l6ZSAvIF9vcmlnaW5Gb250U2l6ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFfbGluZUJyZWFrV2l0aG91dFNwYWNlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX211bHRpbGluZVRleHRXcmFwQnlXb3JkKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX211bHRpbGluZVRleHRXcmFwQnlDaGFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jb21wdXRlQWxpZ25tZW50T2Zmc2V0KCk7XG5cbiAgICAgICAgICAgIGlmIChsYW1iZGEoKSkge1xuICAgICAgICAgICAgICAgIHJpZ2h0ID0gbWlkIC0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IG1pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhY3R1YWxGb250U2l6ZSA9IGxlZnQ7XG4gICAgICAgIGlmIChhY3R1YWxGb250U2l6ZSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zY2FsZUZvbnRTaXplRG93bihhY3R1YWxGb250U2l6ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfaXNWZXJ0aWNhbENsYW1wICgpIHtcbiAgICAgICAgaWYgKF90ZXh0RGVzaXJlZEhlaWdodCA+IF9jb250ZW50U2l6ZS5oZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2lzSG9yaXpvbnRhbENsYW1wICgpIHtcbiAgICAgICAgbGV0IGxldHRlckNsYW1wID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGN0ciA9IDAsIGwgPSBfc3RyaW5nLmxlbmd0aDsgY3RyIDwgbDsgKytjdHIpIHtcbiAgICAgICAgICAgIGxldCBsZXR0ZXJJbmZvID0gX2xldHRlcnNJbmZvW2N0cl07XG4gICAgICAgICAgICBpZiAobGV0dGVySW5mby52YWxpZCkge1xuICAgICAgICAgICAgICAgIGxldCBsZXR0ZXJEZWYgPSBzaGFyZUxhYmVsSW5mby5mb250QXRsYXMuZ2V0TGV0dGVyKGxldHRlckluZm8uaGFzaCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgcHggPSBsZXR0ZXJJbmZvLnggKyBsZXR0ZXJEZWYudyAqIF9ibWZvbnRTY2FsZTtcbiAgICAgICAgICAgICAgICBsZXQgbGluZUluZGV4ID0gbGV0dGVySW5mby5saW5lO1xuICAgICAgICAgICAgICAgIGlmIChfbGFiZWxXaWR0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfaXNXcmFwVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocHggPiBfY29udGVudFNpemUud2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlckNsYW1wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd29yZFdpZHRoID0gX2xpbmVzV2lkdGhbbGluZUluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3b3JkV2lkdGggPiBfY29udGVudFNpemUud2lkdGggJiYgKHB4ID4gX2NvbnRlbnRTaXplLndpZHRoIHx8IHB4IDwgMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJDbGFtcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGV0dGVyQ2xhbXA7XG4gICAgfVxuXG4gICAgX2lzSG9yaXpvbnRhbENsYW1wZWQgKHB4LCBsaW5lSW5kZXgpIHtcbiAgICAgICAgbGV0IHdvcmRXaWR0aCA9IF9saW5lc1dpZHRoW2xpbmVJbmRleF07XG4gICAgICAgIGxldCBsZXR0ZXJPdmVyQ2xhbXAgPSAocHggPiBfY29udGVudFNpemUud2lkdGggfHwgcHggPCAwKTtcblxuICAgICAgICBpZighX2lzV3JhcFRleHQpe1xuICAgICAgICAgICAgcmV0dXJuIGxldHRlck92ZXJDbGFtcDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gKHdvcmRXaWR0aCA+IF9jb250ZW50U2l6ZS53aWR0aCAmJiBsZXR0ZXJPdmVyQ2xhbXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3VwZGF0ZVF1YWRzICgpIHtcbiAgICAgICAgbGV0IHRleHR1cmUgPSBfc3ByaXRlRnJhbWUgPyBfc3ByaXRlRnJhbWUuX3RleHR1cmUgOiBzaGFyZUxhYmVsSW5mby5mb250QXRsYXMuZ2V0VGV4dHVyZSgpO1xuXG4gICAgICAgIGxldCBub2RlID0gX2NvbXAubm9kZTtcblxuICAgICAgICB0aGlzLnZlcnRpY2VzQ291bnQgPSB0aGlzLmluZGljZXNDb3VudCA9IDA7XG4gICAgICAgIFxuICAgICAgICAvLyBOZWVkIHRvIHJlc2V0IGRhdGFMZW5ndGggaW4gQ2FudmFzIHJlbmRlcmluZyBtb2RlLlxuICAgICAgICB0aGlzLl9yZW5kZXJEYXRhICYmICh0aGlzLl9yZW5kZXJEYXRhLmRhdGFMZW5ndGggPSAwKTtcblxuICAgICAgICBsZXQgY29udGVudFNpemUgPSBfY29udGVudFNpemUsXG4gICAgICAgICAgICBhcHB4ID0gbm9kZS5fYW5jaG9yUG9pbnQueCAqIGNvbnRlbnRTaXplLndpZHRoLFxuICAgICAgICAgICAgYXBweSA9IG5vZGUuX2FuY2hvclBvaW50LnkgKiBjb250ZW50U2l6ZS5oZWlnaHQ7XG4gICAgICAgIFxuICAgICAgICBsZXQgcmV0ID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQgY3RyID0gMCwgbCA9IF9zdHJpbmcubGVuZ3RoOyBjdHIgPCBsOyArK2N0cikge1xuICAgICAgICAgICAgbGV0IGxldHRlckluZm8gPSBfbGV0dGVyc0luZm9bY3RyXTtcbiAgICAgICAgICAgIGlmICghbGV0dGVySW5mby52YWxpZCkgY29udGludWU7XG4gICAgICAgICAgICBsZXQgbGV0dGVyRGVmID0gc2hhcmVMYWJlbEluZm8uZm9udEF0bGFzLmdldExldHRlcihsZXR0ZXJJbmZvLmhhc2gpO1xuXG4gICAgICAgICAgICBfdG1wUmVjdC5oZWlnaHQgPSBsZXR0ZXJEZWYuaDtcbiAgICAgICAgICAgIF90bXBSZWN0LndpZHRoID0gbGV0dGVyRGVmLnc7XG4gICAgICAgICAgICBfdG1wUmVjdC54ID0gbGV0dGVyRGVmLnU7XG4gICAgICAgICAgICBfdG1wUmVjdC55ID0gbGV0dGVyRGVmLnY7XG5cbiAgICAgICAgICAgIGxldCBweSA9IGxldHRlckluZm8ueSArIF9sZXR0ZXJPZmZzZXRZO1xuXG4gICAgICAgICAgICBpZiAoX2xhYmVsSGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChweSA+IF90YWlsb3JlZFRvcFkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsaXBUb3AgPSBweSAtIF90YWlsb3JlZFRvcFk7XG4gICAgICAgICAgICAgICAgICAgIF90bXBSZWN0LnkgKz0gY2xpcFRvcDtcbiAgICAgICAgICAgICAgICAgICAgX3RtcFJlY3QuaGVpZ2h0IC09IGNsaXBUb3A7XG4gICAgICAgICAgICAgICAgICAgIHB5ID0gcHkgLSBjbGlwVG9wO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICgocHkgLSBsZXR0ZXJEZWYuaCAqIF9ibWZvbnRTY2FsZSA8IF90YWlsb3JlZEJvdHRvbVkpICYmIF9vdmVyZmxvdyA9PT0gT3ZlcmZsb3cuQ0xBTVApIHtcbiAgICAgICAgICAgICAgICAgICAgX3RtcFJlY3QuaGVpZ2h0ID0gKHB5IDwgX3RhaWxvcmVkQm90dG9tWSkgPyAwIDogKHB5IC0gX3RhaWxvcmVkQm90dG9tWSkgLyBfYm1mb250U2NhbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbGluZUluZGV4ID0gbGV0dGVySW5mby5saW5lO1xuICAgICAgICAgICAgbGV0IHB4ID0gbGV0dGVySW5mby54ICsgbGV0dGVyRGVmLncgLyAyICogX2JtZm9udFNjYWxlICsgX2xpbmVzT2Zmc2V0WFtsaW5lSW5kZXhdO1xuXG4gICAgICAgICAgICBpZiAoX2xhYmVsV2lkdGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzSG9yaXpvbnRhbENsYW1wZWQocHgsIGxpbmVJbmRleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9vdmVyZmxvdyA9PT0gT3ZlcmZsb3cuQ0xBTVApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90bXBSZWN0LndpZHRoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfb3ZlcmZsb3cgPT09IE92ZXJmbG93LlNIUklOSykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9jb250ZW50U2l6ZS53aWR0aCA+IGxldHRlckRlZi53KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90bXBSZWN0LndpZHRoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF90bXBSZWN0LmhlaWdodCA+IDAgJiYgX3RtcFJlY3Qud2lkdGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlzUm90YXRlZCA9IHRoaXMuX2RldGVybWluZVJlY3QoX3RtcFJlY3QpO1xuICAgICAgICAgICAgICAgIGxldCBsZXR0ZXJQb3NpdGlvblggPSBsZXR0ZXJJbmZvLnggKyBfbGluZXNPZmZzZXRYW2xldHRlckluZm8ubGluZV07XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRRdWFkKF9jb21wLCB0ZXh0dXJlLCBfdG1wUmVjdCwgaXNSb3RhdGVkLCBsZXR0ZXJQb3NpdGlvblggLSBhcHB4LCBweSAtIGFwcHksIF9ibWZvbnRTY2FsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcXVhZHNVcGRhdGVkKF9jb21wKTtcblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIF9kZXRlcm1pbmVSZWN0ICh0ZW1wUmVjdCkge1xuICAgICAgICBsZXQgaXNSb3RhdGVkID0gX3Nwcml0ZUZyYW1lLmlzUm90YXRlZCgpO1xuXG4gICAgICAgIGxldCBvcmlnaW5hbFNpemUgPSBfc3ByaXRlRnJhbWUuX29yaWdpbmFsU2l6ZTtcbiAgICAgICAgbGV0IHJlY3QgPSBfc3ByaXRlRnJhbWUuX3JlY3Q7XG4gICAgICAgIGxldCBvZmZzZXQgPSBfc3ByaXRlRnJhbWUuX29mZnNldDtcbiAgICAgICAgbGV0IHRyaW1tZWRMZWZ0ID0gb2Zmc2V0LnggKyAob3JpZ2luYWxTaXplLndpZHRoIC0gcmVjdC53aWR0aCkgLyAyO1xuICAgICAgICBsZXQgdHJpbW1lZFRvcCA9IG9mZnNldC55IC0gKG9yaWdpbmFsU2l6ZS5oZWlnaHQgLSByZWN0LmhlaWdodCkgLyAyO1xuXG4gICAgICAgIGlmKCFpc1JvdGF0ZWQpIHtcbiAgICAgICAgICAgIHRlbXBSZWN0LnggKz0gKHJlY3QueCAtIHRyaW1tZWRMZWZ0KTtcbiAgICAgICAgICAgIHRlbXBSZWN0LnkgKz0gKHJlY3QueSArIHRyaW1tZWRUb3ApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG9yaWdpbmFsWCA9IHRlbXBSZWN0Lng7XG4gICAgICAgICAgICB0ZW1wUmVjdC54ID0gcmVjdC54ICsgcmVjdC5oZWlnaHQgLSB0ZW1wUmVjdC55IC0gdGVtcFJlY3QuaGVpZ2h0IC0gdHJpbW1lZFRvcDtcbiAgICAgICAgICAgIHRlbXBSZWN0LnkgPSBvcmlnaW5hbFggKyByZWN0LnkgLSB0cmltbWVkTGVmdDtcbiAgICAgICAgICAgIGlmICh0ZW1wUmVjdC55IDwgMCkge1xuICAgICAgICAgICAgICAgIHRlbXBSZWN0LmhlaWdodCA9IHRlbXBSZWN0LmhlaWdodCArIHRyaW1tZWRUb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXNSb3RhdGVkO1xuICAgIH1cblxuICAgIF9jb21wdXRlQWxpZ25tZW50T2Zmc2V0ICgpIHtcbiAgICAgICAgX2xpbmVzT2Zmc2V0WC5sZW5ndGggPSAwO1xuICAgICAgICBcbiAgICAgICAgc3dpdGNoIChfaEFsaWduKSB7XG4gICAgICAgICAgICBjYXNlIG1hY3JvLlRleHRBbGlnbm1lbnQuTEVGVDpcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9udW1iZXJPZkxpbmVzOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgX2xpbmVzT2Zmc2V0WC5wdXNoKDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgbWFjcm8uVGV4dEFsaWdubWVudC5DRU5URVI6XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBfbGluZXNXaWR0aC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgX2xpbmVzT2Zmc2V0WC5wdXNoKChfY29udGVudFNpemUud2lkdGggLSBfbGluZXNXaWR0aFtpXSkgLyAyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIG1hY3JvLlRleHRBbGlnbm1lbnQuUklHSFQ6XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBfbGluZXNXaWR0aC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgX2xpbmVzT2Zmc2V0WC5wdXNoKF9jb250ZW50U2l6ZS53aWR0aCAtIF9saW5lc1dpZHRoW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9QXG4gICAgICAgIF9sZXR0ZXJPZmZzZXRZID0gX2NvbnRlbnRTaXplLmhlaWdodDtcbiAgICAgICAgaWYgKF92QWxpZ24gIT09IG1hY3JvLlZlcnRpY2FsVGV4dEFsaWdubWVudC5UT1ApIHtcbiAgICAgICAgICAgIGxldCBibGFuayA9IF9jb250ZW50U2l6ZS5oZWlnaHQgLSBfdGV4dERlc2lyZWRIZWlnaHQgKyBfbGluZUhlaWdodCAqIHRoaXMuX2dldEZvbnRTY2FsZSgpIC0gX29yaWdpbkZvbnRTaXplICogX2JtZm9udFNjYWxlO1xuICAgICAgICAgICAgaWYgKF92QWxpZ24gPT09IG1hY3JvLlZlcnRpY2FsVGV4dEFsaWdubWVudC5CT1RUT00pIHtcbiAgICAgICAgICAgICAgICAvLyBCT1RUT01cbiAgICAgICAgICAgICAgICBfbGV0dGVyT2Zmc2V0WSAtPSBibGFuaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQ0VOVEVSOlxuICAgICAgICAgICAgICAgIF9sZXR0ZXJPZmZzZXRZIC09IGJsYW5rIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9zZXR1cEJNRm9udE92ZXJmbG93TWV0cmljcyAoKSB7XG4gICAgICAgIGxldCBuZXdXaWR0aCA9IF9jb250ZW50U2l6ZS53aWR0aCxcbiAgICAgICAgICAgIG5ld0hlaWdodCA9IF9jb250ZW50U2l6ZS5oZWlnaHQ7XG5cbiAgICAgICAgaWYgKF9vdmVyZmxvdyA9PT0gT3ZlcmZsb3cuUkVTSVpFX0hFSUdIVCkge1xuICAgICAgICAgICAgbmV3SGVpZ2h0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfb3ZlcmZsb3cgPT09IE92ZXJmbG93Lk5PTkUpIHtcbiAgICAgICAgICAgIG5ld1dpZHRoID0gMDtcbiAgICAgICAgICAgIG5ld0hlaWdodCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBfbGFiZWxXaWR0aCA9IG5ld1dpZHRoO1xuICAgICAgICBfbGFiZWxIZWlnaHQgPSBuZXdIZWlnaHQ7XG4gICAgICAgIF9tYXhMaW5lV2lkdGggPSBuZXdXaWR0aDtcbiAgICB9XG5cbiAgICB1cGRhdGVXb3JsZFZlcnRzKCkge31cblxuICAgIGFwcGVuZFF1YWQgKGNvbXAsIHRleHR1cmUsIHJlY3QsIHJvdGF0ZWQsIHgsIHksIHNjYWxlKSB7fVxuICAgIF9xdWFkc1VwZGF0ZWQgKGNvbXApIHt9XG5cbiAgICBfcmVzZXJ2ZVF1YWRzICgpIHt9XG59Il0sInNvdXJjZVJvb3QiOiIvIn0=