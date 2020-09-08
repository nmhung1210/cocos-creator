
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/renderers/sprite/tiled.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _assembler = _interopRequireDefault(require("../../../assembler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var utils = require('../utils');

var CanvasTiledSprite = /*#__PURE__*/function (_Assembler) {
  _inheritsLoose(CanvasTiledSprite, _Assembler);

  function CanvasTiledSprite() {
    return _Assembler.apply(this, arguments) || this;
  }

  var _proto = CanvasTiledSprite.prototype;

  _proto.draw = function draw(ctx, sprite) {
    var node = sprite.node; // Transform

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

    utils.context.setGlobalAlpha(ctx, node.opacity / 255);
    var frame = sprite.spriteFrame;
    var rect = frame._rect;
    var tex = frame._texture;
    var sx = rect.x;
    var sy = rect.y;
    var sw = frame._rotated ? rect.height : rect.width;
    var sh = frame._rotated ? rect.width : rect.height;
    var image = utils.getFrameCache(tex, node._color, sx, sy, sw, sh);
    var w = node.width,
        h = node.height,
        x = -node.anchorX * w,
        y = -node.anchorY * h;
    y = -y - h;
    ctx.translate(x, y);
    ctx.fillStyle = ctx.createPattern(image, 'repeat');
    ctx.fillRect(0, 0, w, h);
    return 1;
  };

  return CanvasTiledSprite;
}(_assembler["default"]);

exports["default"] = CanvasTiledSprite;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2NhbnZhcy9yZW5kZXJlcnMvc3ByaXRlL3RpbGVkLmpzIl0sIm5hbWVzIjpbInV0aWxzIiwicmVxdWlyZSIsIkNhbnZhc1RpbGVkU3ByaXRlIiwiZHJhdyIsImN0eCIsInNwcml0ZSIsIm5vZGUiLCJtYXRyaXgiLCJfd29ybGRNYXRyaXgiLCJtYXRyaXhtIiwibSIsImEiLCJiIiwiYyIsImQiLCJ0eCIsInR5IiwidHJhbnNmb3JtIiwic2NhbGUiLCJjb250ZXh0Iiwic2V0R2xvYmFsQWxwaGEiLCJvcGFjaXR5IiwiZnJhbWUiLCJzcHJpdGVGcmFtZSIsInJlY3QiLCJfcmVjdCIsInRleCIsIl90ZXh0dXJlIiwic3giLCJ4Iiwic3kiLCJ5Iiwic3ciLCJfcm90YXRlZCIsImhlaWdodCIsIndpZHRoIiwic2giLCJpbWFnZSIsImdldEZyYW1lQ2FjaGUiLCJfY29sb3IiLCJ3IiwiaCIsImFuY2hvclgiLCJhbmNob3JZIiwidHJhbnNsYXRlIiwiZmlsbFN0eWxlIiwiY3JlYXRlUGF0dGVybiIsImZpbGxSZWN0IiwiQXNzZW1ibGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOzs7Ozs7QUFFQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXJCOztJQUVxQkM7Ozs7Ozs7OztTQUNqQkMsT0FBQSxjQUFNQyxHQUFOLEVBQVdDLE1BQVgsRUFBbUI7QUFDZixRQUFJQyxJQUFJLEdBQUdELE1BQU0sQ0FBQ0MsSUFBbEIsQ0FEZSxDQUVmOztBQUNBLFFBQUlDLE1BQU0sR0FBR0QsSUFBSSxDQUFDRSxZQUFsQjtBQUNBLFFBQUlDLE9BQU8sR0FBR0YsTUFBTSxDQUFDRyxDQUFyQjtBQUNBLFFBQUlDLENBQUMsR0FBR0YsT0FBTyxDQUFDLENBQUQsQ0FBZjtBQUFBLFFBQW9CRyxDQUFDLEdBQUdILE9BQU8sQ0FBQyxDQUFELENBQS9CO0FBQUEsUUFBb0NJLENBQUMsR0FBR0osT0FBTyxDQUFDLENBQUQsQ0FBL0M7QUFBQSxRQUFvREssQ0FBQyxHQUFHTCxPQUFPLENBQUMsQ0FBRCxDQUEvRDtBQUFBLFFBQ0lNLEVBQUUsR0FBR04sT0FBTyxDQUFDLEVBQUQsQ0FEaEI7QUFBQSxRQUNzQk8sRUFBRSxHQUFHUCxPQUFPLENBQUMsRUFBRCxDQURsQztBQUVBTCxJQUFBQSxHQUFHLENBQUNhLFNBQUosQ0FBY04sQ0FBZCxFQUFpQkMsQ0FBakIsRUFBb0JDLENBQXBCLEVBQXVCQyxDQUF2QixFQUEwQkMsRUFBMUIsRUFBOEJDLEVBQTlCO0FBQ0FaLElBQUFBLEdBQUcsQ0FBQ2MsS0FBSixDQUFVLENBQVYsRUFBYSxDQUFDLENBQWQsRUFSZSxDQVVmO0FBRUE7O0FBQ0FsQixJQUFBQSxLQUFLLENBQUNtQixPQUFOLENBQWNDLGNBQWQsQ0FBNkJoQixHQUE3QixFQUFrQ0UsSUFBSSxDQUFDZSxPQUFMLEdBQWUsR0FBakQ7QUFFQSxRQUFJQyxLQUFLLEdBQUdqQixNQUFNLENBQUNrQixXQUFuQjtBQUNBLFFBQUlDLElBQUksR0FBR0YsS0FBSyxDQUFDRyxLQUFqQjtBQUNBLFFBQUlDLEdBQUcsR0FBR0osS0FBSyxDQUFDSyxRQUFoQjtBQUNBLFFBQUlDLEVBQUUsR0FBR0osSUFBSSxDQUFDSyxDQUFkO0FBQ0EsUUFBSUMsRUFBRSxHQUFHTixJQUFJLENBQUNPLENBQWQ7QUFDQSxRQUFJQyxFQUFFLEdBQUdWLEtBQUssQ0FBQ1csUUFBTixHQUFpQlQsSUFBSSxDQUFDVSxNQUF0QixHQUErQlYsSUFBSSxDQUFDVyxLQUE3QztBQUNBLFFBQUlDLEVBQUUsR0FBR2QsS0FBSyxDQUFDVyxRQUFOLEdBQWlCVCxJQUFJLENBQUNXLEtBQXRCLEdBQThCWCxJQUFJLENBQUNVLE1BQTVDO0FBRUEsUUFBSUcsS0FBSyxHQUFHckMsS0FBSyxDQUFDc0MsYUFBTixDQUFvQlosR0FBcEIsRUFBeUJwQixJQUFJLENBQUNpQyxNQUE5QixFQUFzQ1gsRUFBdEMsRUFBMENFLEVBQTFDLEVBQThDRSxFQUE5QyxFQUFrREksRUFBbEQsQ0FBWjtBQUVBLFFBQUlJLENBQUMsR0FBR2xDLElBQUksQ0FBQzZCLEtBQWI7QUFBQSxRQUNJTSxDQUFDLEdBQUduQyxJQUFJLENBQUM0QixNQURiO0FBQUEsUUFFSUwsQ0FBQyxHQUFHLENBQUN2QixJQUFJLENBQUNvQyxPQUFOLEdBQWdCRixDQUZ4QjtBQUFBLFFBR0lULENBQUMsR0FBRyxDQUFDekIsSUFBSSxDQUFDcUMsT0FBTixHQUFnQkYsQ0FIeEI7QUFJQVYsSUFBQUEsQ0FBQyxHQUFHLENBQUVBLENBQUYsR0FBTVUsQ0FBVjtBQUVBckMsSUFBQUEsR0FBRyxDQUFDd0MsU0FBSixDQUFjZixDQUFkLEVBQWlCRSxDQUFqQjtBQUNBM0IsSUFBQUEsR0FBRyxDQUFDeUMsU0FBSixHQUFnQnpDLEdBQUcsQ0FBQzBDLGFBQUosQ0FBa0JULEtBQWxCLEVBQXlCLFFBQXpCLENBQWhCO0FBQ0FqQyxJQUFBQSxHQUFHLENBQUMyQyxRQUFKLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQlAsQ0FBbkIsRUFBc0JDLENBQXRCO0FBQ0EsV0FBTyxDQUFQO0FBQ0g7OztFQXBDMENPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBBc3NlbWJsZXIgZnJvbSAnLi4vLi4vLi4vYXNzZW1ibGVyJztcblxuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXNUaWxlZFNwcml0ZSBleHRlbmRzIEFzc2VtYmxlciB7XG4gICAgZHJhdyAoY3R4LCBzcHJpdGUpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBzcHJpdGUubm9kZTtcbiAgICAgICAgLy8gVHJhbnNmb3JtXG4gICAgICAgIGxldCBtYXRyaXggPSBub2RlLl93b3JsZE1hdHJpeDtcbiAgICAgICAgbGV0IG1hdHJpeG0gPSBtYXRyaXgubTtcbiAgICAgICAgbGV0IGEgPSBtYXRyaXhtWzBdLCBiID0gbWF0cml4bVsxXSwgYyA9IG1hdHJpeG1bNF0sIGQgPSBtYXRyaXhtWzVdLFxuICAgICAgICAgICAgdHggPSBtYXRyaXhtWzEyXSwgdHkgPSBtYXRyaXhtWzEzXTtcbiAgICAgICAgY3R4LnRyYW5zZm9ybShhLCBiLCBjLCBkLCB0eCwgdHkpO1xuICAgICAgICBjdHguc2NhbGUoMSwgLTEpO1xuXG4gICAgICAgIC8vIFRPRE86IGhhbmRsZSBibGVuZCBmdW5jdGlvblxuXG4gICAgICAgIC8vIG9wYWNpdHlcbiAgICAgICAgdXRpbHMuY29udGV4dC5zZXRHbG9iYWxBbHBoYShjdHgsIG5vZGUub3BhY2l0eSAvIDI1NSk7XG5cbiAgICAgICAgbGV0IGZyYW1lID0gc3ByaXRlLnNwcml0ZUZyYW1lO1xuICAgICAgICBsZXQgcmVjdCA9IGZyYW1lLl9yZWN0O1xuICAgICAgICBsZXQgdGV4ID0gZnJhbWUuX3RleHR1cmU7XG4gICAgICAgIGxldCBzeCA9IHJlY3QueDtcbiAgICAgICAgbGV0IHN5ID0gcmVjdC55O1xuICAgICAgICBsZXQgc3cgPSBmcmFtZS5fcm90YXRlZCA/IHJlY3QuaGVpZ2h0IDogcmVjdC53aWR0aDtcbiAgICAgICAgbGV0IHNoID0gZnJhbWUuX3JvdGF0ZWQgPyByZWN0LndpZHRoIDogcmVjdC5oZWlnaHQ7XG5cbiAgICAgICAgbGV0IGltYWdlID0gdXRpbHMuZ2V0RnJhbWVDYWNoZSh0ZXgsIG5vZGUuX2NvbG9yLCBzeCwgc3ksIHN3LCBzaCk7XG5cbiAgICAgICAgbGV0IHcgPSBub2RlLndpZHRoLFxuICAgICAgICAgICAgaCA9IG5vZGUuaGVpZ2h0LFxuICAgICAgICAgICAgeCA9IC1ub2RlLmFuY2hvclggKiB3LFxuICAgICAgICAgICAgeSA9IC1ub2RlLmFuY2hvclkgKiBoO1xuICAgICAgICB5ID0gLSB5IC0gaDtcblxuICAgICAgICBjdHgudHJhbnNsYXRlKHgsIHkpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gY3R4LmNyZWF0ZVBhdHRlcm4oaW1hZ2UsICdyZXBlYXQnKTtcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHcsIGgpO1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==