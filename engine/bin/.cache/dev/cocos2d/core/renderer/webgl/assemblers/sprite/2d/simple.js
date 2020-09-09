
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/sprite/2d/simple.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _assembler2d = _interopRequireDefault(require("../../../../assembler-2d"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var SimpleSpriteAssembler = /*#__PURE__*/function (_Assembler2D) {
  _inheritsLoose(SimpleSpriteAssembler, _Assembler2D);

  function SimpleSpriteAssembler() {
    return _Assembler2D.apply(this, arguments) || this;
  }

  var _proto = SimpleSpriteAssembler.prototype;

  _proto.updateRenderData = function updateRenderData(sprite) {
    this.packToDynamicAtlas(sprite, sprite._spriteFrame);

    if (sprite._vertsDirty) {
      this.updateUVs(sprite);
      this.updateVerts(sprite);
      sprite._vertsDirty = false;
    }
  };

  _proto.updateUVs = function updateUVs(sprite) {
    var uv = sprite._spriteFrame.uv;
    var uvOffset = this.uvOffset;
    var floatsPerVert = this.floatsPerVert;
    var verts = this._renderData.vDatas[0];

    for (var i = 0; i < 4; i++) {
      var srcOffset = i * 2;
      var dstOffset = floatsPerVert * i + uvOffset;
      verts[dstOffset] = uv[srcOffset];
      verts[dstOffset + 1] = uv[srcOffset + 1];
    }
  };

  _proto.updateVerts = function updateVerts(sprite) {
    var node = sprite.node,
        cw = node.width,
        ch = node.height,
        appx = node.anchorX * cw,
        appy = node.anchorY * ch,
        l,
        b,
        r,
        t;

    if (sprite.trim) {
      l = -appx;
      b = -appy;
      r = cw - appx;
      t = ch - appy;
    } else {
      var frame = sprite.spriteFrame,
          ow = frame._originalSize.width,
          oh = frame._originalSize.height,
          rw = frame._rect.width,
          rh = frame._rect.height,
          offset = frame._offset,
          scaleX = cw / ow,
          scaleY = ch / oh;
      var trimLeft = offset.x + (ow - rw) / 2;
      var trimRight = offset.x - (ow - rw) / 2;
      var trimBottom = offset.y + (oh - rh) / 2;
      var trimTop = offset.y - (oh - rh) / 2;
      l = trimLeft * scaleX - appx;
      b = trimBottom * scaleY - appy;
      r = cw + trimRight * scaleX - appx;
      t = ch + trimTop * scaleY - appy;
    }

    var local = this._local;
    local[0] = l;
    local[1] = b;
    local[2] = r;
    local[3] = t;
    this.updateWorldVerts(sprite);
  };

  return SimpleSpriteAssembler;
}(_assembler2d["default"]);

exports["default"] = SimpleSpriteAssembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL2Fzc2VtYmxlcnMvc3ByaXRlLzJkL3NpbXBsZS5qcyJdLCJuYW1lcyI6WyJTaW1wbGVTcHJpdGVBc3NlbWJsZXIiLCJ1cGRhdGVSZW5kZXJEYXRhIiwic3ByaXRlIiwicGFja1RvRHluYW1pY0F0bGFzIiwiX3Nwcml0ZUZyYW1lIiwiX3ZlcnRzRGlydHkiLCJ1cGRhdGVVVnMiLCJ1cGRhdGVWZXJ0cyIsInV2IiwidXZPZmZzZXQiLCJmbG9hdHNQZXJWZXJ0IiwidmVydHMiLCJfcmVuZGVyRGF0YSIsInZEYXRhcyIsImkiLCJzcmNPZmZzZXQiLCJkc3RPZmZzZXQiLCJub2RlIiwiY3ciLCJ3aWR0aCIsImNoIiwiaGVpZ2h0IiwiYXBweCIsImFuY2hvclgiLCJhcHB5IiwiYW5jaG9yWSIsImwiLCJiIiwiciIsInQiLCJ0cmltIiwiZnJhbWUiLCJzcHJpdGVGcmFtZSIsIm93IiwiX29yaWdpbmFsU2l6ZSIsIm9oIiwicnciLCJfcmVjdCIsInJoIiwib2Zmc2V0IiwiX29mZnNldCIsInNjYWxlWCIsInNjYWxlWSIsInRyaW1MZWZ0IiwieCIsInRyaW1SaWdodCIsInRyaW1Cb3R0b20iLCJ5IiwidHJpbVRvcCIsImxvY2FsIiwiX2xvY2FsIiwidXBkYXRlV29ybGRWZXJ0cyIsIkFzc2VtYmxlcjJEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOzs7Ozs7SUFFcUJBOzs7Ozs7Ozs7U0FDakJDLG1CQUFBLDBCQUFrQkMsTUFBbEIsRUFBMEI7QUFDdEIsU0FBS0Msa0JBQUwsQ0FBd0JELE1BQXhCLEVBQWdDQSxNQUFNLENBQUNFLFlBQXZDOztBQUVBLFFBQUlGLE1BQU0sQ0FBQ0csV0FBWCxFQUF3QjtBQUNwQixXQUFLQyxTQUFMLENBQWVKLE1BQWY7QUFDQSxXQUFLSyxXQUFMLENBQWlCTCxNQUFqQjtBQUNBQSxNQUFBQSxNQUFNLENBQUNHLFdBQVAsR0FBcUIsS0FBckI7QUFD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VUFBVSxHQUFHSixNQUFiLEdBQXNCbEIsSUFBMUI7QUFDQUksTUFBQUEsQ0FBQyxHQUFHVixFQUFFLEdBQUcyQixTQUFTLEdBQUdKLE1BQWpCLEdBQTBCbkIsSUFBOUI7QUFDQU8sTUFBQUEsQ0FBQyxHQUFHVCxFQUFFLEdBQUc0QixPQUFPLEdBQUdOLE1BQWYsR0FBd0JsQixJQUE1QjtBQUNIOztBQUVELFFBQUl5QixLQUFLLEdBQUcsS0FBS0MsTUFBakI7QUFDQUQsSUFBQUEsS0FBSyxDQUFDLENBQUQsQ0FBTCxHQUFXdkIsQ0FBWDtBQUNBdUIsSUFBQUEsS0FBSyxDQUFDLENBQUQsQ0FBTCxHQUFXdEIsQ0FBWDtBQUNBc0IsSUFBQUEsS0FBSyxDQUFDLENBQUQsQ0FBTCxHQUFXckIsQ0FBWDtBQUNBcUIsSUFBQUEsS0FBSyxDQUFDLENBQUQsQ0FBTCxHQUFXcEIsQ0FBWDtBQUNBLFNBQUtzQixnQkFBTCxDQUFzQmpELE1BQXRCO0FBQ0g7OztFQXpEOENrRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBBc3NlbWJsZXIyRCBmcm9tICcuLi8uLi8uLi8uLi9hc3NlbWJsZXItMmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW1wbGVTcHJpdGVBc3NlbWJsZXIgZXh0ZW5kcyBBc3NlbWJsZXIyRCB7XG4gICAgdXBkYXRlUmVuZGVyRGF0YSAoc3ByaXRlKSB7XG4gICAgICAgIHRoaXMucGFja1RvRHluYW1pY0F0bGFzKHNwcml0ZSwgc3ByaXRlLl9zcHJpdGVGcmFtZSk7XG5cbiAgICAgICAgaWYgKHNwcml0ZS5fdmVydHNEaXJ0eSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVVVnMoc3ByaXRlKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmVydHMoc3ByaXRlKTtcbiAgICAgICAgICAgIHNwcml0ZS5fdmVydHNEaXJ0eSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlVVZzIChzcHJpdGUpIHtcbiAgICAgICAgbGV0IHV2ID0gc3ByaXRlLl9zcHJpdGVGcmFtZS51djtcbiAgICAgICAgbGV0IHV2T2Zmc2V0ID0gdGhpcy51dk9mZnNldDtcbiAgICAgICAgbGV0IGZsb2F0c1BlclZlcnQgPSB0aGlzLmZsb2F0c1BlclZlcnQ7XG4gICAgICAgIGxldCB2ZXJ0cyA9IHRoaXMuX3JlbmRlckRhdGEudkRhdGFzWzBdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNyY09mZnNldCA9IGkgKiAyO1xuICAgICAgICAgICAgbGV0IGRzdE9mZnNldCA9IGZsb2F0c1BlclZlcnQgKiBpICsgdXZPZmZzZXQ7XG4gICAgICAgICAgICB2ZXJ0c1tkc3RPZmZzZXRdID0gdXZbc3JjT2Zmc2V0XTtcbiAgICAgICAgICAgIHZlcnRzW2RzdE9mZnNldCArIDFdID0gdXZbc3JjT2Zmc2V0ICsgMV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVWZXJ0cyAoc3ByaXRlKSB7XG4gICAgICAgIGxldCBub2RlID0gc3ByaXRlLm5vZGUsXG4gICAgICAgICAgICBjdyA9IG5vZGUud2lkdGgsIGNoID0gbm9kZS5oZWlnaHQsXG4gICAgICAgICAgICBhcHB4ID0gbm9kZS5hbmNob3JYICogY3csIGFwcHkgPSBub2RlLmFuY2hvclkgKiBjaCxcbiAgICAgICAgICAgIGwsIGIsIHIsIHQ7XG4gICAgICAgIGlmIChzcHJpdGUudHJpbSkge1xuICAgICAgICAgICAgbCA9IC1hcHB4O1xuICAgICAgICAgICAgYiA9IC1hcHB5O1xuICAgICAgICAgICAgciA9IGN3IC0gYXBweDtcbiAgICAgICAgICAgIHQgPSBjaCAtIGFwcHk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgZnJhbWUgPSBzcHJpdGUuc3ByaXRlRnJhbWUsXG4gICAgICAgICAgICAgICAgb3cgPSBmcmFtZS5fb3JpZ2luYWxTaXplLndpZHRoLCBvaCA9IGZyYW1lLl9vcmlnaW5hbFNpemUuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHJ3ID0gZnJhbWUuX3JlY3Qud2lkdGgsIHJoID0gZnJhbWUuX3JlY3QuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIG9mZnNldCA9IGZyYW1lLl9vZmZzZXQsXG4gICAgICAgICAgICAgICAgc2NhbGVYID0gY3cgLyBvdywgc2NhbGVZID0gY2ggLyBvaDtcbiAgICAgICAgICAgIGxldCB0cmltTGVmdCA9IG9mZnNldC54ICsgKG93IC0gcncpIC8gMjtcbiAgICAgICAgICAgIGxldCB0cmltUmlnaHQgPSBvZmZzZXQueCAtIChvdyAtIHJ3KSAvIDI7XG4gICAgICAgICAgICBsZXQgdHJpbUJvdHRvbSA9IG9mZnNldC55ICsgKG9oIC0gcmgpIC8gMjtcbiAgICAgICAgICAgIGxldCB0cmltVG9wID0gb2Zmc2V0LnkgLSAob2ggLSByaCkgLyAyO1xuICAgICAgICAgICAgbCA9IHRyaW1MZWZ0ICogc2NhbGVYIC0gYXBweDtcbiAgICAgICAgICAgIGIgPSB0cmltQm90dG9tICogc2NhbGVZIC0gYXBweTtcbiAgICAgICAgICAgIHIgPSBjdyArIHRyaW1SaWdodCAqIHNjYWxlWCAtIGFwcHg7XG4gICAgICAgICAgICB0ID0gY2ggKyB0cmltVG9wICogc2NhbGVZIC0gYXBweTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsb2NhbCA9IHRoaXMuX2xvY2FsO1xuICAgICAgICBsb2NhbFswXSA9IGw7XG4gICAgICAgIGxvY2FsWzFdID0gYjtcbiAgICAgICAgbG9jYWxbMl0gPSByO1xuICAgICAgICBsb2NhbFszXSA9IHQ7XG4gICAgICAgIHRoaXMudXBkYXRlV29ybGRWZXJ0cyhzcHJpdGUpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9