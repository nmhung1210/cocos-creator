
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/renderers/label/bmfont.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _bmfont = _interopRequireDefault(require("../../../utils/label/bmfont"));

var _renderData = _interopRequireDefault(require("../render-data"));

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var CanvasBmfontAssembler = /*#__PURE__*/function (_BmfontAssembler) {
  _inheritsLoose(CanvasBmfontAssembler, _BmfontAssembler);

  function CanvasBmfontAssembler() {
    return _BmfontAssembler.apply(this, arguments) || this;
  }

  var _proto = CanvasBmfontAssembler.prototype;

  _proto.init = function init() {
    this._renderData = new _renderData["default"]();
  };

  _proto.updateColor = function updateColor() {};

  _proto.appendQuad = function appendQuad(comp, texture, rect, rotated, x, y, scale) {
    var renderData = this._renderData;
    var dataOffset = renderData.dataLength;
    renderData.dataLength += 2;
    var verts = renderData.vertices;
    var rectWidth = rect.width,
        rectHeight = rect.height;
    var l, b, r, t;

    if (!rotated) {
      l = rect.x;
      r = rect.x + rectWidth;
      b = rect.y;
      t = rect.y + rectHeight;
      verts[dataOffset].u = l;
      verts[dataOffset].v = b;
      verts[dataOffset + 1].u = r;
      verts[dataOffset + 1].v = t;
    } else {
      l = rect.x;
      r = rect.x + rectHeight;
      b = rect.y;
      t = rect.y + rectWidth;
      verts[dataOffset].u = l;
      verts[dataOffset].v = t;
      verts[dataOffset + 1].u = l;
      verts[dataOffset + 1].v = b;
    }

    verts[dataOffset].x = x;
    verts[dataOffset].y = y - rectHeight * scale;
    verts[dataOffset + 1].x = x + rectWidth * scale;
    verts[dataOffset + 1].y = y;
  };

  _proto.draw = function draw(ctx, comp) {
    var node = comp.node; // Transform

    var matrix = node._worldMatrix;
    var matrixm = matrix.m;
    var a = matrixm[0],
        b = matrixm[1],
        c = matrixm[4],
        d = matrixm[5],
        tx = matrixm[12],
        ty = matrixm[13];
    ctx.transform(a, b, c, d, tx, ty);
    ctx.scale(1, -1); // TODO: handle blend function
    // opacity

    _utils["default"].context.setGlobalAlpha(ctx, node.opacity / 255);

    var tex = comp._frame._texture,
        verts = this._renderData.vertices;

    var image = _utils["default"].getColorizedImage(tex, node._color);

    for (var i = 0, l = verts.length; i < l; i += 2) {
      var x = verts[i].x;
      var y = verts[i].y;
      var w = verts[i + 1].x - x;
      var h = verts[i + 1].y - y;
      y = -y - h;
      var sx = verts[i].u;
      var sy = verts[i].v;
      var sw = verts[i + 1].u - sx;
      var sh = verts[i + 1].v - sy;
      ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h);
    }

    return 1;
  };

  return CanvasBmfontAssembler;
}(_bmfont["default"]);

exports["default"] = CanvasBmfontAssembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2NhbnZhcy9yZW5kZXJlcnMvbGFiZWwvYm1mb250LmpzIl0sIm5hbWVzIjpbIkNhbnZhc0JtZm9udEFzc2VtYmxlciIsImluaXQiLCJfcmVuZGVyRGF0YSIsIlJlbmRlckRhdGEiLCJ1cGRhdGVDb2xvciIsImFwcGVuZFF1YWQiLCJjb21wIiwidGV4dHVyZSIsInJlY3QiLCJyb3RhdGVkIiwieCIsInkiLCJzY2FsZSIsInJlbmRlckRhdGEiLCJkYXRhT2Zmc2V0IiwiZGF0YUxlbmd0aCIsInZlcnRzIiwidmVydGljZXMiLCJyZWN0V2lkdGgiLCJ3aWR0aCIsInJlY3RIZWlnaHQiLCJoZWlnaHQiLCJsIiwiYiIsInIiLCJ0IiwidSIsInYiLCJkcmF3IiwiY3R4Iiwibm9kZSIsIm1hdHJpeCIsIl93b3JsZE1hdHJpeCIsIm1hdHJpeG0iLCJtIiwiYSIsImMiLCJkIiwidHgiLCJ0eSIsInRyYW5zZm9ybSIsInV0aWxzIiwiY29udGV4dCIsInNldEdsb2JhbEFscGhhIiwib3BhY2l0eSIsInRleCIsIl9mcmFtZSIsIl90ZXh0dXJlIiwiaW1hZ2UiLCJnZXRDb2xvcml6ZWRJbWFnZSIsIl9jb2xvciIsImkiLCJsZW5ndGgiLCJ3IiwiaCIsInN4Iiwic3kiLCJzdyIsInNoIiwiZHJhd0ltYWdlIiwiQm1mb250QXNzZW1ibGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOztBQUNBOztBQUNBOzs7Ozs7SUFFcUJBOzs7Ozs7Ozs7U0FDakJDLE9BQUEsZ0JBQVE7QUFDSixTQUFLQyxXQUFMLEdBQW1CLElBQUlDLHNCQUFKLEVBQW5CO0FBQ0g7O1NBRURDLGNBQUEsdUJBQWUsQ0FBRTs7U0FFakJDLGFBQUEsb0JBQVlDLElBQVosRUFBa0JDLE9BQWxCLEVBQTJCQyxJQUEzQixFQUFpQ0MsT0FBakMsRUFBMENDLENBQTFDLEVBQTZDQyxDQUE3QyxFQUFnREMsS0FBaEQsRUFBdUQ7QUFDbkQs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QUFHdEMsS0FBSyxDQUFDbUMsQ0FBQyxHQUFDLENBQUgsQ0FBTCxDQUFXeEMsQ0FBWCxHQUFlQSxDQUF2QjtBQUNBQSxNQUFBQSxDQUFDLEdBQUcsQ0FBRUEsQ0FBRixHQUFNMkMsQ0FBVjtBQUVBLFVBQUlDLEVBQUUsR0FBR3ZDLEtBQUssQ0FBQ21DLENBQUQsQ0FBTCxDQUFTekIsQ0FBbEI7QUFDQSxVQUFJOEIsRUFBRSxHQUFHeEMsS0FBSyxDQUFDbUMsQ0FBRCxDQUFMLENBQVN4QixDQUFsQjtBQUNBLFVBQUk4QixFQUFFLEdBQUd6QyxLQUFLLENBQUNtQyxDQUFDLEdBQUMsQ0FBSCxDQUFMLENBQVd6QixDQUFYLEdBQWU2QixFQUF4QjtBQUNBLFVBQUlHLEVBQUUsR0FBRzFDLEtBQUssQ0FBQ21DLENBQUMsR0FBQyxDQUFILENBQUwsQ0FBV3hCLENBQVgsR0FBZTZCLEVBQXhCO0FBRUEzQixNQUFBQSxHQUFHLENBQUM4QixTQUFKLENBQWNYLEtBQWQsRUFDSU8sRUFESixFQUNRQyxFQURSLEVBQ1lDLEVBRFosRUFDZ0JDLEVBRGhCLEVBRUloRCxDQUZKLEVBRU9DLENBRlAsRUFFVTBDLENBRlYsRUFFYUMsQ0FGYjtBQUdIOztBQUVELFdBQU8sQ0FBUDtBQUNIOzs7RUFyRjhDTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgQm1mb250QXNzZW1ibGVyIGZyb20gJy4uLy4uLy4uL3V0aWxzL2xhYmVsL2JtZm9udCc7XG5pbXBvcnQgUmVuZGVyRGF0YSBmcm9tICcuLi9yZW5kZXItZGF0YSc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXNCbWZvbnRBc3NlbWJsZXIgZXh0ZW5kcyBCbWZvbnRBc3NlbWJsZXIge1xuICAgIGluaXQgKCkge1xuICAgICAgICB0aGlzLl9yZW5kZXJEYXRhID0gbmV3IFJlbmRlckRhdGEoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDb2xvciAoKSB7fVxuXG4gICAgYXBwZW5kUXVhZCAoY29tcCwgdGV4dHVyZSwgcmVjdCwgcm90YXRlZCwgeCwgeSwgc2NhbGUpIHtcbiAgICAgICAgbGV0IHJlbmRlckRhdGEgPSB0aGlzLl9yZW5kZXJEYXRhO1xuICAgICAgICBsZXQgZGF0YU9mZnNldCA9IHJlbmRlckRhdGEuZGF0YUxlbmd0aDtcbiAgICAgICAgXG4gICAgICAgIHJlbmRlckRhdGEuZGF0YUxlbmd0aCArPSAyO1xuXG4gICAgICAgIGxldCB2ZXJ0cyA9IHJlbmRlckRhdGEudmVydGljZXM7XG5cbiAgICAgICAgbGV0IHJlY3RXaWR0aCA9IHJlY3Qud2lkdGgsXG4gICAgICAgICAgICByZWN0SGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG5cbiAgICAgICAgbGV0IGwsIGIsIHIsIHQ7XG4gICAgICAgIGlmICghcm90YXRlZCkge1xuICAgICAgICAgICAgbCA9IHJlY3QueDtcbiAgICAgICAgICAgIHIgPSByZWN0LnggKyByZWN0V2lkdGg7XG4gICAgICAgICAgICBiID0gcmVjdC55O1xuICAgICAgICAgICAgdCA9IHJlY3QueSArIHJlY3RIZWlnaHQ7XG5cbiAgICAgICAgICAgIHZlcnRzW2RhdGFPZmZzZXRdLnUgPSBsO1xuICAgICAgICAgICAgdmVydHNbZGF0YU9mZnNldF0udiA9IGI7XG4gICAgICAgICAgICB2ZXJ0c1tkYXRhT2Zmc2V0KzFdLnUgPSByO1xuICAgICAgICAgICAgdmVydHNbZGF0YU9mZnNldCsxXS52ID0gdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGwgPSByZWN0Lng7XG4gICAgICAgICAgICByID0gcmVjdC54ICsgcmVjdEhlaWdodDtcbiAgICAgICAgICAgIGIgPSByZWN0Lnk7XG4gICAgICAgICAgICB0ID0gcmVjdC55ICsgcmVjdFdpZHRoO1xuXG4gICAgICAgICAgICB2ZXJ0c1tkYXRhT2Zmc2V0XS51ID0gbDtcbiAgICAgICAgICAgIHZlcnRzW2RhdGFPZmZzZXRdLnYgPSB0O1xuICAgICAgICAgICAgdmVydHNbZGF0YU9mZnNldCsxXS51ID0gbDtcbiAgICAgICAgICAgIHZlcnRzW2RhdGFPZmZzZXQrMV0udiA9IGI7XG4gICAgICAgIH1cblxuICAgICAgICB2ZXJ0c1tkYXRhT2Zmc2V0XS54ID0geDtcbiAgICAgICAgdmVydHNbZGF0YU9mZnNldF0ueSA9IHkgLSByZWN0SGVpZ2h0ICogc2NhbGU7XG4gICAgICAgIHZlcnRzW2RhdGFPZmZzZXQrMV0ueCA9IHggKyByZWN0V2lkdGggKiBzY2FsZTtcbiAgICAgICAgdmVydHNbZGF0YU9mZnNldCsxXS55ID0geTtcbiAgICB9XG5cbiAgICBkcmF3IChjdHgsIGNvbXApIHtcbiAgICAgICAgbGV0IG5vZGUgPSBjb21wLm5vZGU7XG4gICAgICAgIC8vIFRyYW5zZm9ybVxuICAgICAgICBsZXQgbWF0cml4ID0gbm9kZS5fd29ybGRNYXRyaXg7XG4gICAgICAgIGxldCBtYXRyaXhtID0gbWF0cml4Lm07XG4gICAgICAgIGxldCBhID0gbWF0cml4bVswXSwgYiA9IG1hdHJpeG1bMV0sIGMgPSBtYXRyaXhtWzRdLCBkID0gbWF0cml4bVs1XSxcbiAgICAgICAgICAgIHR4ID0gbWF0cml4bVsxMl0sIHR5ID0gbWF0cml4bVsxM107XG4gICAgICAgIGN0eC50cmFuc2Zvcm0oYSwgYiwgYywgZCwgdHgsIHR5KTtcbiAgICAgICAgY3R4LnNjYWxlKDEsIC0xKTtcblxuICAgICAgICAvLyBUT0RPOiBoYW5kbGUgYmxlbmQgZnVuY3Rpb25cblxuICAgICAgICAvLyBvcGFjaXR5XG4gICAgICAgIHV0aWxzLmNvbnRleHQuc2V0R2xvYmFsQWxwaGEoY3R4LCBub2RlLm9wYWNpdHkgLyAyNTUpO1xuXG4gICAgICAgIGxldCB0ZXggPSBjb21wLl9mcmFtZS5fdGV4dHVyZSxcbiAgICAgICAgICAgIHZlcnRzID0gdGhpcy5fcmVuZGVyRGF0YS52ZXJ0aWNlcztcblxuICAgICAgICBsZXQgaW1hZ2UgPSB1dGlscy5nZXRDb2xvcml6ZWRJbWFnZSh0ZXgsIG5vZGUuX2NvbG9yKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHZlcnRzLmxlbmd0aDsgaSA8IGw7IGkrPTIpIHtcbiAgICAgICAgICAgIGxldCB4ID0gdmVydHNbaV0ueDtcbiAgICAgICAgICAgIGxldCB5ID0gdmVydHNbaV0ueTtcbiAgICAgICAgICAgIGxldCB3ID0gdmVydHNbaSsxXS54IC0geDtcbiAgICAgICAgICAgIGxldCBoID0gdmVydHNbaSsxXS55IC0geTtcbiAgICAgICAgICAgIHkgPSAtIHkgLSBoO1xuXG4gICAgICAgICAgICBsZXQgc3ggPSB2ZXJ0c1tpXS51O1xuICAgICAgICAgICAgbGV0IHN5ID0gdmVydHNbaV0udjtcbiAgICAgICAgICAgIGxldCBzdyA9IHZlcnRzW2krMV0udSAtIHN4O1xuICAgICAgICAgICAgbGV0IHNoID0gdmVydHNbaSsxXS52IC0gc3k7XG5cbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIFxuICAgICAgICAgICAgICAgIHN4LCBzeSwgc3csIHNoLFxuICAgICAgICAgICAgICAgIHgsIHksIHcsIGgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG59XG5cbiJdLCJzb3VyY2VSb290IjoiLyJ9