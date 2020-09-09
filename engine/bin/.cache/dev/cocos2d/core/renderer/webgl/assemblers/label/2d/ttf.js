
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/label/2d/ttf.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _ttf = _interopRequireDefault(require("../../../../utils/label/ttf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var LabelShadow = require('../../../../../components/CCLabelShadow');

var WHITE = cc.color(255, 255, 255, 255);

var WebglTTFAssembler = /*#__PURE__*/function (_TTFAssembler) {
  _inheritsLoose(WebglTTFAssembler, _TTFAssembler);

  function WebglTTFAssembler() {
    return _TTFAssembler.apply(this, arguments) || this;
  }

  var _proto = WebglTTFAssembler.prototype;

  _proto.updateUVs = function updateUVs(comp) {
    var verts = this._renderData.vDatas[0];
    var uv = comp._frame.uv;
    var uvOffset = this.uvOffset;
    var floatsPerVert = this.floatsPerVert;

    for (var i = 0; i < 4; i++) {
      var srcOffset = i * 2;
      var dstOffset = floatsPerVert * i + uvOffset;
      verts[dstOffset] = uv[srcOffset];
      verts[dstOffset + 1] = uv[srcOffset + 1];
    }
  };

  _proto.updateColor = function updateColor(comp) {
    WHITE._fastSetA(comp.node._color.a);

    var color = WHITE._val;

    _TTFAssembler.prototype.updateColor.call(this, comp, color);
  };

  _proto.updateVerts = function updateVerts(comp) {
    var node = comp.node,
        canvasWidth = comp._ttfTexture.width,
        canvasHeight = comp._ttfTexture.height,
        appx = node.anchorX * node.width,
        appy = node.anchorY * node.height;
    var shadow = LabelShadow && comp.getComponent(LabelShadow);

    if (shadow && shadow._enabled) {
      // adapt size changed caused by shadow
      var offsetX = (canvasWidth - node.width) / 2;
      var offsetY = (canvasHeight - node.height) / 2;
      var shadowOffset = shadow.offset;

      if (-shadowOffset.x > offsetX) {
        // expand to left
        appx += canvasWidth - node.width;
      } else if (offsetX > shadowOffset.x) {
        // expand to left and right
        appx += offsetX - shadowOffset.x;
      } else {// expand to right, no need to change render position
      }

      if (-shadowOffset.y > offsetY) {
        // expand to top
        appy += canvasHeight - node.height;
      } else if (offsetY > shadowOffset.y) {
        // expand to top and bottom
        appy += offsetY - shadowOffset.y;
      } else {// expand to bottom, no need to change render position
      }
    }

    var local = this._local;
    local[0] = -appx;
    local[1] = -appy;
    local[2] = canvasWidth - appx;
    local[3] = canvasHeight - appy;
    this.updateUVs(comp);
    this.updateWorldVerts(comp);
  };

  return WebglTTFAssembler;
}(_ttf["default"]);

exports["default"] = WebglTTFAssembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL2Fzc2VtYmxlcnMvbGFiZWwvMmQvdHRmLmpzIl0sIm5hbWVzIjpbIkxhYmVsU2hhZG93IiwicmVxdWlyZSIsIldISVRFIiwiY2MiLCJjb2xvciIsIldlYmdsVFRGQXNzZW1ibGVyIiwidXBkYXRlVVZzIiwiY29tcCIsInZlcnRzIiwiX3JlbmRlckRhdGEiLCJ2RGF0YXMiLCJ1diIsIl9mcmFtZSIsInV2T2Zmc2V0IiwiZmxvYXRzUGVyVmVydCIsImkiLCJzcmNPZmZzZXQiLCJkc3RPZmZzZXQiLCJ1cGRhdGVDb2xvciIsIl9mYXN0U2V0QSIsIm5vZGUiLCJfY29sb3IiLCJhIiwiX3ZhbCIsInVwZGF0ZVZlcnRzIiwiY2FudmFzV2lkdGgiLCJfdHRmVGV4dHVyZSIsIndpZHRoIiwiY2FudmFzSGVpZ2h0IiwiaGVpZ2h0IiwiYXBweCIsImFuY2hvclgiLCJhcHB5IiwiYW5jaG9yWSIsInNoYWRvdyIsImdldENvbXBvbmVudCIsIl9lbmFibGVkIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJzaGFkb3dPZmZzZXQiLCJvZmZzZXQiLCJ4IiwieSIsImxvY2FsIiwiX2xvY2FsIiwidXBkYXRlV29ybGRWZXJ0cyIsIlRURkFzc2VtYmxlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7Ozs7O0FBRUEsSUFBTUEsV0FBVyxHQUFHQyxPQUFPLENBQUMseUNBQUQsQ0FBM0I7O0FBQ0EsSUFBTUMsS0FBSyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixHQUFuQixFQUF3QixHQUF4QixDQUFkOztJQUVxQkM7Ozs7Ozs7OztTQUNqQkMsWUFBQSxtQkFBV0MsSUFBWCxFQUFpQjtBQUNiLFFBQUlDLEtBQUssR0FBRyxLQUFLQyxXQUFMLENBQWlCQyxNQUFqQixDQUF3QixDQUF4QixDQUFaO0FBQ0EsUUFBSUMsRUFBRSxHQUFHSixJQUFJLENBQUNLLE1B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QUFELENBQUwsR0FBVyxDQUFDWCxJQUFaO0FBQ0FXLElBQUFBLEtBQUssQ0FBQyxDQUFELENBQUwsR0FBV2xCLFdBQVcsR0FBR0ssSUFBekI7QUFDQWEsSUFBQUEsS0FBSyxDQUFDLENBQUQsQ0FBTCxHQUFXZixZQUFZLEdBQUdJLElBQTFCO0FBRUEsU0FBSzFCLFNBQUwsQ0FBZUMsSUFBZjtBQUNBLFNBQUtzQyxnQkFBTCxDQUFzQnRDLElBQXRCO0FBQ0g7OztFQXBFMEN1QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBUVEZBc3NlbWJsZXIgZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvbGFiZWwvdHRmJztcblxuY29uc3QgTGFiZWxTaGFkb3cgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi8uLi9jb21wb25lbnRzL0NDTGFiZWxTaGFkb3cnKTtcbmNvbnN0IFdISVRFID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViZ2xUVEZBc3NlbWJsZXIgZXh0ZW5kcyBUVEZBc3NlbWJsZXIge1xuICAgIHVwZGF0ZVVWcyAoY29tcCkge1xuICAgICAgICBsZXQgdmVydHMgPSB0aGlzLl9yZW5kZXJEYXRhLnZEYXRhc1swXTtcbiAgICAgICAgbGV0IHV2ID0gY29tcC5fZnJhbWUudXY7XG4gICAgICAgIGxldCB1dk9mZnNldCA9IHRoaXMudXZPZmZzZXQ7XG4gICAgICAgIGxldCBmbG9hdHNQZXJWZXJ0ID0gdGhpcy5mbG9hdHNQZXJWZXJ0O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNyY09mZnNldCA9IGkgKiAyO1xuICAgICAgICAgICAgbGV0IGRzdE9mZnNldCA9IGZsb2F0c1BlclZlcnQgKiBpICsgdXZPZmZzZXQ7XG4gICAgICAgICAgICB2ZXJ0c1tkc3RPZmZzZXRdID0gdXZbc3JjT2Zmc2V0XTtcbiAgICAgICAgICAgIHZlcnRzW2RzdE9mZnNldCArIDFdID0gdXZbc3JjT2Zmc2V0ICsgMV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVDb2xvciAoY29tcCkge1xuICAgICAgICBXSElURS5fZmFzdFNldEEoY29tcC5ub2RlLl9jb2xvci5hKTtcbiAgICAgICAgbGV0IGNvbG9yID0gV0hJVEUuX3ZhbDtcblxuICAgICAgICBzdXBlci51cGRhdGVDb2xvcihjb21wLCBjb2xvcik7XG4gICAgfVxuXG4gICAgdXBkYXRlVmVydHMgKGNvbXApIHtcbiAgICAgICAgbGV0IG5vZGUgPSBjb21wLm5vZGUsXG4gICAgICAgICAgICBjYW52YXNXaWR0aCA9IGNvbXAuX3R0ZlRleHR1cmUud2lkdGgsXG4gICAgICAgICAgICBjYW52YXNIZWlnaHQgPSBjb21wLl90dGZUZXh0dXJlLmhlaWdodCxcbiAgICAgICAgICAgIGFwcHggPSBub2RlLmFuY2hvclggKiBub2RlLndpZHRoLFxuICAgICAgICAgICAgYXBweSA9IG5vZGUuYW5jaG9yWSAqIG5vZGUuaGVpZ2h0O1xuXG4gICAgICAgIGxldCBzaGFkb3cgPSBMYWJlbFNoYWRvdyAmJiBjb21wLmdldENvbXBvbmVudChMYWJlbFNoYWRvdyk7XG4gICAgICAgIGlmIChzaGFkb3cgJiYgc2hhZG93Ll9lbmFibGVkKSB7XG4gICAgICAgICAgICAvLyBhZGFwdCBzaXplIGNoYW5nZWQgY2F1c2VkIGJ5IHNoYWRvd1xuICAgICAgICAgICAgbGV0IG9mZnNldFggPSAoY2FudmFzV2lkdGggLSBub2RlLndpZHRoKSAvIDI7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0WSA9IChjYW52YXNIZWlnaHQgLSBub2RlLmhlaWdodCkgLyAyO1xuXG4gICAgICAgICAgICBsZXQgc2hhZG93T2Zmc2V0ID0gc2hhZG93Lm9mZnNldDtcbiAgICAgICAgICAgIGlmICgtc2hhZG93T2Zmc2V0LnggPiBvZmZzZXRYKSB7XG4gICAgICAgICAgICAgICAgLy8gZXhwYW5kIHRvIGxlZnRcbiAgICAgICAgICAgICAgICBhcHB4ICs9IChjYW52YXNXaWR0aCAtIG5vZGUud2lkdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAob2Zmc2V0WCA+IHNoYWRvd09mZnNldC54KSB7XG4gICAgICAgICAgICAgICAgLy8gZXhwYW5kIHRvIGxlZnQgYW5kIHJpZ2h0XG4gICAgICAgICAgICAgICAgYXBweCArPSAob2Zmc2V0WCAtIHNoYWRvd09mZnNldC54KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGV4cGFuZCB0byByaWdodCwgbm8gbmVlZCB0byBjaGFuZ2UgcmVuZGVyIHBvc2l0aW9uXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgtc2hhZG93T2Zmc2V0LnkgPiBvZmZzZXRZKSB7XG4gICAgICAgICAgICAgICAgLy8gZXhwYW5kIHRvIHRvcFxuICAgICAgICAgICAgICAgIGFwcHkgKz0gKGNhbnZhc0hlaWdodCAtIG5vZGUuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9mZnNldFkgPiBzaGFkb3dPZmZzZXQueSkge1xuICAgICAgICAgICAgICAgIC8vIGV4cGFuZCB0byB0b3AgYW5kIGJvdHRvbVxuICAgICAgICAgICAgICAgIGFwcHkgKz0gKG9mZnNldFkgLSBzaGFkb3dPZmZzZXQueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBleHBhbmQgdG8gYm90dG9tLCBubyBuZWVkIHRvIGNoYW5nZSByZW5kZXIgcG9zaXRpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsb2NhbCA9IHRoaXMuX2xvY2FsO1xuICAgICAgICBsb2NhbFswXSA9IC1hcHB4O1xuICAgICAgICBsb2NhbFsxXSA9IC1hcHB5O1xuICAgICAgICBsb2NhbFsyXSA9IGNhbnZhc1dpZHRoIC0gYXBweDtcbiAgICAgICAgbG9jYWxbM10gPSBjYW52YXNIZWlnaHQgLSBhcHB5O1xuXG4gICAgICAgIHRoaXMudXBkYXRlVVZzKGNvbXApO1xuICAgICAgICB0aGlzLnVwZGF0ZVdvcmxkVmVydHMoY29tcCk7XG4gICAgfVxufVxuXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==