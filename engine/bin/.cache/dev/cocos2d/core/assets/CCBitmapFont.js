
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCBitmapFont.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

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
var FontLetterDefinition = function FontLetterDefinition() {
  this.u = 0;
  this.v = 0;
  this.w = 0;
  this.h = 0;
  this.offsetX = 0;
  this.offsetY = 0;
  this.textureID = 0;
  this.valid = false;
  this.xAdvance = 0;
};

var FontAtlas = function FontAtlas(texture) {
  this._letterDefinitions = {};
  this._texture = texture;
};

FontAtlas.prototype = {
  constructor: FontAtlas,
  addLetterDefinitions: function addLetterDefinitions(letter, letterDefinition) {
    this._letterDefinitions[letter] = letterDefinition;
  },
  cloneLetterDefinition: function cloneLetterDefinition() {
    var copyLetterDefinitions = {};

    for (var key in this._letterDefinitions) {
      var value = new FontLetterDefinition();
      cc.js.mixin(value, this._letterDefinitions[key]);
      copyLetterDefinitions[key] = value;
    }

    return copyLetterDefinitions;
  },
  getTexture: function getTexture() {
    return this._texture;
  },
  getLetter: function getLetter(key) {
    return this._letterDefinitions[key];
  },
  getLetterDefinitionForChar: function getLetterDefinitionForChar(_char) {
    var key = _char.charCodeAt(0);

    var hasKey = this._letterDefinitions.hasOwnProperty(key);

    var letter;

    if (hasKey) {
      letter = this._letterDefinitions[key];
    } else {
      letter = null;
    }

    return letter;
  },
  clear: function clear() {
    this._letterDefinitions = {};
  }
};
/**
 * @module cc
 */

/**
 * !#en Class for BitmapFont handling.
 * !#zh 位图字体资源类。
 * @class BitmapFont
 * @extends Font
 *
 */

var BitmapFont = cc.Class({
  name: 'cc.BitmapFont',
  "extends": cc.Font,
  properties: {
    fntDataStr: {
      "default": ''
    },
    spriteFrame: {
      "default": null,
      type: cc.SpriteFrame
    },
    fontSize: {
      "default": -1
    },
    //用来缓存 BitmapFont 解析之后的数据
    _fntConfig: null,
    _fontDefDictionary: null
  },
  onLoad: function onLoad() {
    var spriteFrame = this.spriteFrame;

    if (!this._fontDefDictionary && spriteFrame) {
      this._fontDefDictionary = new FontAtlas(spriteFrame._texture);
    }

    var fntConfig = this._fntConfig;

    if (!fntConfig) {
      return;
    }

    var fontDict = fntConfig.fontDefDictionary;

    for (var fontDef in fontDict) {
      var letter = new FontLetterDefinition();
      var rect = fontDict[fontDef].rect;
      letter.offsetX = fontDict[fontDef].xOffset;
      letter.offsetY = fontDict[fontDef].yOffset;
      letter.w = rect.width;
      letter.h = rect.height;
      letter.u = rect.x;
      letter.v = rect.y; //FIXME: only one texture supported for now

      letter.textureID = 0;
      letter.valid = true;
      letter.xAdvance = fontDict[fontDef].xAdvance;

      this._fontDefDictionary.addLetterDefinitions(fontDef, letter);
    }
  }
});
cc.BitmapFont = BitmapFont;
cc.BitmapFont.FontLetterDefinition = FontLetterDefinition;
cc.BitmapFont.FontAtlas = FontAtlas;
module.exports = BitmapFont;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9DQ0JpdG1hcEZvbnQuanMiXSwibmFtZXMiOlsiRm9udExldHRlckRlZmluaXRpb24iLCJ1IiwidiIsInciLCJoIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJ0ZXh0dXJlSUQiLCJ2YWxpZCIsInhBZHZhbmNlIiwiRm9udEF0bGFzIiwidGV4dHVyZSIsIl9sZXR0ZXJEZWZpbml0aW9ucyIsIl90ZXh0dXJlIiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJhZGRMZXR0ZXJEZWZpbml0aW9ucyIsImxldHRlciIsImxldHRlckRlZmluaXRpb24iLCJjbG9uZUxldHRlckRlZmluaXRpb24iLCJjb3B5TGV0dGVyRGVmaW5pdGlvbnMiLCJrZXkiLCJ2YWx1ZSIsImNjIiwianMiLCJtaXhpbiIsImdldFRleHR1cmUiLCJnZXRMZXR0ZXIiLCJnZXRMZXR0ZXJEZWZpbml0aW9uRm9yQ2hhciIsImNoYXIiLCJjaGFyQ29kZUF0IiwiaGFzS2V5IiwiaGFzT3duUHJvcGVydHkiLCJjbGVhciIsIkJpdG1hcEZvbnQiLCJDbGFzcyIsIm5hbWUiLCJGb250IiwicHJvcGVydGllcyIsImZudERhdGFTdHIiLCJzcHJpdGVGcmFtZSIsInR5cGUiLCJTcHJpdGVGcmFtZSIsImZvbnRTaXplIiwiX2ZudENvbmZpZyIsIl9mb250RGVmRGljdGlvbmFyeSIsIm9uTG9hZCIsImZudENvbmZpZyIsImZvbnREaWN0IiwiZm9udERlZkRpY3Rpb25hcnkiLCJmb250RGVmIiwicmVjdCIsInhPZmZzZXQiLCJ5T2Zmc2V0Iiwid2lkdGgiLCJoZWlnaHQiLCJ4IiwieSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFJQSxvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQXVCLEdBQVc7QUFDbEMsT0FBS0MsQ0FBTCxHQUFTLENBQVQ7QUFDQSxPQUFL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QyxRQUFwQzs7QUFFQSxXQUFLb0Msa0JBQUwsQ0FBd0I3QixvQkFBeEIsQ0FBNkNrQyxPQUE3QyxFQUFzRGpDLE1BQXREO0FBQ0g7QUFDSjtBQWxEcUIsQ0FBVCxDQUFqQjtBQXFEQU0sRUFBRSxDQUFDVyxVQUFILEdBQWdCQSxVQUFoQjtBQUNBWCxFQUFFLENBQUNXLFVBQUgsQ0FBY2xDLG9CQUFkLEdBQXFDQSxvQkFBckM7QUFDQXVCLEVBQUUsQ0FBQ1csVUFBSCxDQUFjeEIsU0FBZCxHQUEwQkEsU0FBMUI7QUFDQWdELE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnpCLFVBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5sZXQgRm9udExldHRlckRlZmluaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnUgPSAwO1xuICAgIHRoaXMudiA9IDA7XG4gICAgdGhpcy53ID0gMDtcbiAgICB0aGlzLmggPSAwO1xuICAgIHRoaXMub2Zmc2V0WCA9IDA7XG4gICAgdGhpcy5vZmZzZXRZID0gMDtcbiAgICB0aGlzLnRleHR1cmVJRCA9IDA7XG4gICAgdGhpcy52YWxpZCA9IGZhbHNlO1xuICAgIHRoaXMueEFkdmFuY2UgPSAwO1xufTtcblxubGV0IEZvbnRBdGxhcyA9IGZ1bmN0aW9uICh0ZXh0dXJlKSB7XG4gICAgdGhpcy5fbGV0dGVyRGVmaW5pdGlvbnMgPSB7fTtcbiAgICB0aGlzLl90ZXh0dXJlID0gdGV4dHVyZTtcbn07XG5cbkZvbnRBdGxhcy5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IEZvbnRBdGxhcyxcbiAgICBhZGRMZXR0ZXJEZWZpbml0aW9ucyAobGV0dGVyLCBsZXR0ZXJEZWZpbml0aW9uKSB7XG4gICAgICAgIHRoaXMuX2xldHRlckRlZmluaXRpb25zW2xldHRlcl0gPSBsZXR0ZXJEZWZpbml0aW9uO1xuICAgIH0sXG4gICAgY2xvbmVMZXR0ZXJEZWZpbml0aW9uICgpIHtcbiAgICAgICAgbGV0IGNvcHlMZXR0ZXJEZWZpbml0aW9ucyA9IHt9O1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fbGV0dGVyRGVmaW5pdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IG5ldyBGb250TGV0dGVyRGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgY2MuanMubWl4aW4odmFsdWUsIHRoaXMuX2xldHRlckRlZmluaXRpb25zW2tleV0pO1xuICAgICAgICAgICAgY29weUxldHRlckRlZmluaXRpb25zW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29weUxldHRlckRlZmluaXRpb25zO1xuICAgIH0sXG4gICAgZ2V0VGV4dHVyZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0dXJlO1xuICAgIH0sXG4gICAgZ2V0TGV0dGVyIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldHRlckRlZmluaXRpb25zW2tleV07XG4gICAgfSxcbiAgICBnZXRMZXR0ZXJEZWZpbml0aW9uRm9yQ2hhciAoY2hhcikge1xuICAgICAgICBsZXQga2V5ID0gY2hhci5jaGFyQ29kZUF0KDApO1xuICAgICAgICBsZXQgaGFzS2V5ID0gdGhpcy5fbGV0dGVyRGVmaW5pdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgICAgICAgbGV0IGxldHRlcjtcbiAgICAgICAgaWYgKGhhc0tleSkge1xuICAgICAgICAgICAgbGV0dGVyID0gdGhpcy5fbGV0dGVyRGVmaW5pdGlvbnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldHRlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxldHRlcjtcbiAgICB9LFxuICAgIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5fbGV0dGVyRGVmaW5pdGlvbnMgPSB7fTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEBtb2R1bGUgY2NcbiAqL1xuLyoqXG4gKiAhI2VuIENsYXNzIGZvciBCaXRtYXBGb250IGhhbmRsaW5nLlxuICogISN6aCDkvY3lm77lrZfkvZPotYTmupDnsbvjgIJcbiAqIEBjbGFzcyBCaXRtYXBGb250XG4gKiBAZXh0ZW5kcyBGb250XG4gKlxuICovXG52YXIgQml0bWFwRm9udCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuQml0bWFwRm9udCcsXG4gICAgZXh0ZW5kczogY2MuRm9udCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZm50RGF0YVN0cjoge1xuICAgICAgICAgICAgZGVmYXVsdDogJydcbiAgICAgICAgfSxcblxuICAgICAgICBzcHJpdGVGcmFtZToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgICAgIH0sXG5cbiAgICAgICAgZm9udFNpemU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC0xXG4gICAgICAgIH0sXG4gICAgICAgIC8v55So5p2l57yT5a2YIEJpdG1hcEZvbnQg6Kej5p6Q5LmL5ZCO55qE5pWw5o2uXG4gICAgICAgIF9mbnRDb25maWc6IG51bGwsXG4gICAgICAgIF9mb250RGVmRGljdGlvbmFyeTogbnVsbFxuICAgIH0sXG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBsZXQgc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZUZyYW1lO1xuICAgICAgICBpZiAoIXRoaXMuX2ZvbnREZWZEaWN0aW9uYXJ5ICYmIHNwcml0ZUZyYW1lKSB7XG4gICAgICAgICAgICB0aGlzLl9mb250RGVmRGljdGlvbmFyeSA9IG5ldyBGb250QXRsYXMoc3ByaXRlRnJhbWUuX3RleHR1cmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZudENvbmZpZyA9IHRoaXMuX2ZudENvbmZpZztcbiAgICAgICAgaWYgKCFmbnRDb25maWcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZm9udERpY3QgPSBmbnRDb25maWcuZm9udERlZkRpY3Rpb25hcnk7XG4gICAgICAgIGZvciAobGV0IGZvbnREZWYgaW4gZm9udERpY3QpIHtcbiAgICAgICAgICAgIGxldCBsZXR0ZXIgPSBuZXcgRm9udExldHRlckRlZmluaXRpb24oKTtcblxuICAgICAgICAgICAgbGV0IHJlY3QgPSBmb250RGljdFtmb250RGVmXS5yZWN0O1xuICAgICAgICAgICAgbGV0dGVyLm9mZnNldFggPSBmb250RGljdFtmb250RGVmXS54T2Zmc2V0O1xuICAgICAgICAgICAgbGV0dGVyLm9mZnNldFkgPSBmb250RGljdFtmb250RGVmXS55T2Zmc2V0O1xuICAgICAgICAgICAgbGV0dGVyLncgPSByZWN0LndpZHRoO1xuICAgICAgICAgICAgbGV0dGVyLmggPSByZWN0LmhlaWdodDtcbiAgICAgICAgICAgIGxldHRlci51ID0gcmVjdC54O1xuICAgICAgICAgICAgbGV0dGVyLnYgPSByZWN0Lnk7XG4gICAgICAgICAgICAvL0ZJWE1FOiBvbmx5IG9uZSB0ZXh0dXJlIHN1cHBvcnRlZCBmb3Igbm93XG4gICAgICAgICAgICBsZXR0ZXIudGV4dHVyZUlEID0gMDtcbiAgICAgICAgICAgIGxldHRlci52YWxpZCA9IHRydWU7XG4gICAgICAgICAgICBsZXR0ZXIueEFkdmFuY2UgPSBmb250RGljdFtmb250RGVmXS54QWR2YW5jZTtcblxuICAgICAgICAgICAgdGhpcy5fZm9udERlZkRpY3Rpb25hcnkuYWRkTGV0dGVyRGVmaW5pdGlvbnMoZm9udERlZiwgbGV0dGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5CaXRtYXBGb250ID0gQml0bWFwRm9udDtcbmNjLkJpdG1hcEZvbnQuRm9udExldHRlckRlZmluaXRpb24gPSBGb250TGV0dGVyRGVmaW5pdGlvbjtcbmNjLkJpdG1hcEZvbnQuRm9udEF0bGFzID0gRm9udEF0bGFzO1xubW9kdWxlLmV4cG9ydHMgPSBCaXRtYXBGb250O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=