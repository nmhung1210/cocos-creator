
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/renderers/label/ttf.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _ttf = _interopRequireDefault(require("../../../utils/label/ttf"));

var _renderData = _interopRequireDefault(require("../render-data"));

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var CanvasTTFAssembler = /*#__PURE__*/function (_TTFAssembler) {
  _inheritsLoose(CanvasTTFAssembler, _TTFAssembler);

  function CanvasTTFAssembler() {
    return _TTFAssembler.apply(this, arguments) || this;
  }

  var _proto = CanvasTTFAssembler.prototype;

  _proto.init = function init() {
    this._renderData = new _renderData["default"]();
    this._renderData.dataLength = 2;
  };

  _proto.updateColor = function updateColor() {};

  _proto.updateVerts = function updateVerts(comp) {
    var renderData = this._renderData;
    var node = comp.node,
        width = node.width,
        height = node.height,
        appx = node.anchorX * width,
        appy = node.anchorY * height;
    var verts = renderData.vertices;
    verts[0].x = -appx;
    verts[0].y = -appy;
    verts[1].x = width - appx;
    verts[1].y = height - appy;
  };

  _proto._updateTexture = function _updateTexture(comp) {
    _ttf["default"].prototype._updateTexture.call(this, comp);

    var texture = comp._frame._texture;

    _utils["default"].dropColorizedImage(texture, comp.node.color);
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
    var image = tex.getHtmlElementObj();
    var x = verts[0].x;
    var y = verts[0].y;
    var w = verts[1].x - x;
    var h = verts[1].y - y;
    y = -y - h;
    ctx.drawImage(image, x, y, w, h);
    return 1;
  };

  return CanvasTTFAssembler;
}(_ttf["default"]);

exports["default"] = CanvasTTFAssembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2NhbnZhcy9yZW5kZXJlcnMvbGFiZWwvdHRmLmpzIl0sIm5hbWVzIjpbIkNhbnZhc1RURkFzc2VtYmxlciIsImluaXQiLCJfcmVuZGVyRGF0YSIsIlJlbmRlckRhdGEiLCJkYXRhTGVuZ3RoIiwidXBkYXRlQ29sb3IiLCJ1cGRhdGVWZXJ0cyIsImNvbXAiLCJyZW5kZXJEYXRhIiwibm9kZSIsIndpZHRoIiwiaGVpZ2h0IiwiYXBweCIsImFuY2hvclgiLCJhcHB5IiwiYW5jaG9yWSIsInZlcnRzIiwidmVydGljZXMiLCJ4IiwieSIsIl91cGRhdGVUZXh0dXJlIiwiVFRGQXNzZW1ibGVyIiwicHJvdG90eXBlIiwiY2FsbCIsInRleHR1cmUiLCJfZnJhbWUiLCJfdGV4dHVyZSIsInV0aWxzIiwiZHJvcENvbG9yaXplZEltYWdlIiwiY29sb3IiLCJkcmF3IiwiY3R4IiwibWF0cml4IiwiX3dvcmxkTWF0cml4IiwibWF0cml4bSIsIm0iLCJhIiwiYiIsImMiLCJkIiwidHgiLCJ0eSIsInRyYW5zZm9ybSIsInNjYWxlIiwiY29udGV4dCIsInNldEdsb2JhbEFscGhhIiwib3BhY2l0eSIsInRleCIsImltYWdlIiwiZ2V0SHRtbEVsZW1lbnRPYmoiLCJ3IiwiaCIsImRyYXdJbWFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFDQTs7QUFDQTs7Ozs7O0lBRXFCQTs7Ozs7Ozs7O1NBQ2pCQyxPQUFBLGdCQUFRO0FBQ0osU0FBS0MsV0FBTCxHQUFtQixJQUFJQyxzQkFBSixFQUFuQjtBQUNBLFNBQUtELFdBQUwsQ0FBaUJFLFVBQWpCLEdBQThCLENBQTlCO0FBQ0g7O1NBRURDLGNBQUEsdUJBQWUsQ0FDZDs7U0FFREMsY0FBQSxxQkFBYUMsSUFBYixFQUFtQjtBQUNmLFFBQUlDLFVBQVUsR0FBRyxLQUFLTixXQUF0QjtBQUVBLFFBQUlPLElBQUksR0FBR0YsSUFBSSxDQUFDRSxJQUFo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LENBQUVBLENBQUYsR0FBTWdDLENBQVY7QUFFQXBCLElBQUFBLEdBQUcsQ0FBQ3FCLFNBQUosQ0FBY0osS0FBZCxFQUFxQjlCLENBQXJCLEVBQXdCQyxDQUF4QixFQUEyQitCLENBQTNCLEVBQThCQyxDQUE5QjtBQUNBLFdBQU8sQ0FBUDtBQUNIOzs7RUEzRDJDOUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IFRURkFzc2VtYmxlciBmcm9tICcuLi8uLi8uLi91dGlscy9sYWJlbC90dGYnO1xuaW1wb3J0IFJlbmRlckRhdGEgZnJvbSAnLi4vcmVuZGVyLWRhdGEnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzVFRGQXNzZW1ibGVyIGV4dGVuZHMgVFRGQXNzZW1ibGVyIHtcbiAgICBpbml0ICgpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyRGF0YSA9IG5ldyBSZW5kZXJEYXRhKCk7XG4gICAgICAgIHRoaXMuX3JlbmRlckRhdGEuZGF0YUxlbmd0aCA9IDI7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29sb3IgKCkge1xuICAgIH1cblxuICAgIHVwZGF0ZVZlcnRzIChjb21wKSB7XG4gICAgICAgIGxldCByZW5kZXJEYXRhID0gdGhpcy5fcmVuZGVyRGF0YTtcblxuICAgICAgICBsZXQgbm9kZSA9IGNvbXAubm9kZSxcbiAgICAgICAgICAgIHdpZHRoID0gbm9kZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCA9IG5vZGUuaGVpZ2h0LFxuICAgICAgICAgICAgYXBweCA9IG5vZGUuYW5jaG9yWCAqIHdpZHRoLFxuICAgICAgICAgICAgYXBweSA9IG5vZGUuYW5jaG9yWSAqIGhlaWdodDtcblxuICAgICAgICBsZXQgdmVydHMgPSByZW5kZXJEYXRhLnZlcnRpY2VzO1xuICAgICAgICB2ZXJ0c1swXS54ID0gLWFwcHg7XG4gICAgICAgIHZlcnRzWzBdLnkgPSAtYXBweTtcbiAgICAgICAgdmVydHNbMV0ueCA9IHdpZHRoIC0gYXBweDtcbiAgICAgICAgdmVydHNbMV0ueSA9IGhlaWdodCAtIGFwcHk7XG4gICAgfVxuXG4gICAgX3VwZGF0ZVRleHR1cmUgKGNvbXApIHtcbiAgICAgICAgVFRGQXNzZW1ibGVyLnByb3RvdHlwZS5fdXBkYXRlVGV4dHVyZS5jYWxsKHRoaXMsIGNvbXApO1xuICAgICAgICBsZXQgdGV4dHVyZSA9IGNvbXAuX2ZyYW1lLl90ZXh0dXJlO1xuICAgICAgICB1dGlscy5kcm9wQ29sb3JpemVkSW1hZ2UodGV4dHVyZSwgY29tcC5ub2RlLmNvbG9yKTtcbiAgICB9XG5cbiAgICBkcmF3IChjdHgsIGNvbXApIHtcbiAgICAgICAgbGV0IG5vZGUgPSBjb21wLm5vZGU7XG4gICAgICAgIC8vIFRyYW5zZm9ybVxuICAgICAgICBsZXQgbWF0cml4ID0gbm9kZS5fd29ybGRNYXRyaXg7XG4gICAgICAgIGxldCBtYXRyaXhtID0gbWF0cml4Lm07XG4gICAgICAgIGxldCBhID0gbWF0cml4bVswXSwgYiA9IG1hdHJpeG1bMV0sIGMgPSBtYXRyaXhtWzRdLCBkID0gbWF0cml4bVs1XSxcbiAgICAgICAgICAgIHR4ID0gbWF0cml4bVsxMl0sIHR5ID0gbWF0cml4bVsxM107XG4gICAgICAgIGN0eC50cmFuc2Zvcm0oYSwgYiwgYywgZCwgdHgsIHR5KTtcbiAgICAgICAgY3R4LnNjYWxlKDEsIC0xKTtcblxuICAgICAgICAvLyBUT0RPOiBoYW5kbGUgYmxlbmQgZnVuY3Rpb25cblxuICAgICAgICAvLyBvcGFjaXR5XG4gICAgICAgIHV0aWxzLmNvbnRleHQuc2V0R2xvYmFsQWxwaGEoY3R4LCBub2RlLm9wYWNpdHkgLyAyNTUpO1xuXG4gICAgICAgIGxldCB0ZXggPSBjb21wLl9mcmFtZS5fdGV4dHVyZSxcbiAgICAgICAgICAgIHZlcnRzID0gdGhpcy5fcmVuZGVyRGF0YS52ZXJ0aWNlcztcblxuICAgICAgICBsZXQgaW1hZ2UgPSB0ZXguZ2V0SHRtbEVsZW1lbnRPYmooKTtcblxuICAgICAgICBsZXQgeCA9IHZlcnRzWzBdLng7XG4gICAgICAgIGxldCB5ID0gdmVydHNbMF0ueTtcbiAgICAgICAgbGV0IHcgPSB2ZXJ0c1sxXS54IC0geDtcbiAgICAgICAgbGV0IGggPSB2ZXJ0c1sxXS55IC0geTtcbiAgICAgICAgeSA9IC0geSAtIGg7XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgeCwgeSwgdywgaCk7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9