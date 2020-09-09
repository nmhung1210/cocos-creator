
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/particle-general-function.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.calculateTransform = calculateTransform;
exports.fixedAngleUnitVector2 = fixedAngleUnitVector2;
exports.randomUnitVector2 = randomUnitVector2;
exports.randomUnitVector = randomUnitVector;
exports.randomPointInUnitSphere = randomPointInUnitSphere;
exports.randomPointBetweenSphere = randomPointBetweenSphere;
exports.randomPointInUnitCircle = randomPointInUnitCircle;
exports.randomPointBetweenCircle = randomPointBetweenCircle;
exports.randomPointBetweenCircleAtFixedAngle = randomPointBetweenCircleAtFixedAngle;
exports.randomPointInCube = randomPointInCube;
exports.randomPointBetweenCube = randomPointBetweenCube;
exports.randomSortArray = randomSortArray;
exports.randomSign = randomSign;
exports.particleEmitZAxis = void 0;

var _valueTypes = require("../../value-types");

var _utils = require("../../value-types/utils");

var _enum = require("./enum");

var particleEmitZAxis = new _valueTypes.Vec3(0, 0, -1);
exports.particleEmitZAxis = particleEmitZAxis;

function calculateTransform(systemSpace, moduleSpace, worldTransform, outQuat) {
  if (moduleSpace !== systemSpace) {
    if (systemSpace === _enum.Space.World) {
      _valueTypes.Mat4.getRotation(outQuat, worldTransform);
    } else {
      _valueTypes.Mat4.invert(worldTransform, worldTransform);

      _valueTypes.Mat4.getRotation(outQuat, worldTransform);
    }

    return true;
  } else {
    _valueTypes.Quat.set(outQuat, 0, 0, 0, 1);

    return false;
  }
}

function fixedAngleUnitVector2(out, theta) {
  _valueTypes.Vec2.set(out, Math.cos(theta), Math.sin(theta));
}

function randomUnitVector2(out) {
  var a = (0, _valueTypes.randomRange)(0, 2 * Math.PI);
  var x = Math.cos(a);
  var y = Math.sin(a);

  _valueTypes.Vec2.set(out, x, y);
}

function randomUnitVector(out) {
  var z = (0, _valueTypes.randomRange)(-1, 1);
  var a = (0, _valueTypes.randomRange)(0, 2 * Math.PI);
  var r = Math.sqrt(1 - z * z);
  var x = r * Math.cos(a);
  var y = r * Math.sin(a);

  _valueTypes.Vec3.set(out, x, y, z);
}

function randomPointInUnitSphere(out) {
  randomUnitVector(out);

  _valueTypes.Vec3.scale(out, out, (0, _valueTypes.random)());
}

function randomPointBetweenSphere(out, minRadius, maxRadius) {
  randomUnitVector(out);

  _valueTypes.Vec3.scale(out, out, minRadius + (maxRadius - minRadius) * (0, _valueTypes.random)());
}

function randomPointInUnitCircle(out) {
  randomUnitVector2(out);
  out.z = 0;

  _valueTypes.Vec3.scale(out, out, (0, _valueTypes.random)());
}

function randomPointBetweenCircle(out, minRadius, maxRadius) {
  randomUnitVector2(out);
  out.z = 0;

  _valueTypes.Vec3.scale(out, out, minRadius + (maxRadius - minRadius) * (0, _valueTypes.random)());
}

function randomPointBetweenCircleAtFixedAngle(out, minRadius, maxRadius, theta) {
  fixedAngleUnitVector2(out, theta);
  out.z = 0;

  _valueTypes.Vec3.scale(out, out, minRadius + (maxRadius - minRadius) * (0, _valueTypes.random)());
}

function randomPointInCube(out, extents) {
  _valueTypes.Vec3.set(out, (0, _valueTypes.randomRange)(-extents.x, extents.x), (0, _valueTypes.randomRange)(-extents.y, extents.y), (0, _valueTypes.randomRange)(-extents.z, extents.z));
}

function randomPointBetweenCube(out, minBox, maxBox) {
  var subscript = ['x', 'y', 'z'];
  var edge = (0, _valueTypes.randomRangeInt)(0, 3);

  for (var i = 0; i < 3; i++) {
    if (i === edge) {
      out[subscript[i]] = (0, _valueTypes.randomRange)(-maxBox[subscript[i]], maxBox[subscript[i]]);
      continue;
    }

    var x = (0, _valueTypes.random)() * 2 - 1;

    if (x < 0) {
      out[subscript[i]] = -minBox[subscript[i]] + x * (maxBox[subscript[i]] - minBox[subscript[i]]);
    } else {
      out[subscript[i]] = minBox[subscript[i]] + x * (maxBox[subscript[i]] - minBox[subscript[i]]);
    }
  }
} // Fisher–Yates shuffle


function randomSortArray(arr) {
  for (var i = 0; i < arr.length; i++) {
    var transpose = i + (0, _valueTypes.randomRangeInt)(0, arr.length - i);
    var val = arr[transpose];
    arr[transpose] = arr[i];
    arr[i] = val;
  }
}

function randomSign() {
  var sgn = (0, _valueTypes.randomRange)(-1, 1);
  sgn === 0 ? sgn++ : sgn;
  return (0, _utils.sign)(sgn);
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL3BhcnRpY2xlLWdlbmVyYWwtZnVuY3Rpb24udHMiXSwibmFtZXMiOlsicGFydGljbGVFbWl0WkF4aXMiLCJWZWMzIiwiY2FsY3VsYXRlVHJhbnNmb3JtIiwic3lzdGVtU3BhY2UiLCJtb2R1bGVTcGFjZSIsIndvcmxkVHJhbnNmb3JtIiwib3V0UXVhdCIsIlNwYWNlIiwiV29ybGQiLCJNYXQ0IiwiZ2V0Um90YXRpb24iLCJpbnZlcnQiLCJRdWF0Iiwic2V0IiwiZml4ZWRBbmdsZVVuaXRWZWN0b3IyIiwib3V0IiwidGhldGEiLCJWZWMyIiwiTWF0aCIsImNvcyIsInNpbiIsInJhbmRvbVVuaXRWZWN0b3IyIiwiYSIsIlBJIiwieCIsInkiLCJyYW5kb21Vbml0VmVjdG9yIiwieiIsInIiLCJzcXJ0IiwicmFuZG9tUG9pbnRJblVuaXRTcGhlcmUiLCJzY2FsZSIsInJhbmRvbVBvaW50QmV0d2VlblNwaGVyZSIsIm1pblJhZGl1cyIsIm1heFJhZGl1cyIsInJhbmRvbVBvaW50SW5Vbml0Q2lyY2xlIiwicmFuZG9tUG9pbnRCZXR3ZWVuQ2lyY2xlIiwicmFuZG9tUG9pbnRCZXR3ZWVuQ2lyY2xlQXRGaXhlZEFuZ2xlIiwicmFuZG9tUG9pbnRJbkN1YmUiLCJleHRlbnRzIiwicmFuZG9tUG9pbnRCZXR3ZWVuQ3ViZSIsIm1pbkJveCIsIm1heEJveCIsInN1YnNjcmlwdCIsImVkZ2UiLCJpIiwicmFuZG9tU29ydEFycmF5IiwiYXJyIiwibGVuZ3RoIiwidHJhbnNwb3NlIiwidmFsIiwicmFuZG9tU2lnbiIsInNnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFFTyxJQUFNQSxpQkFBaUIsR0FBRyxJQUFJQyxnQkFBSixDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBQyxDQUFoQixDQUExQjs7O0FBRUEsU0FBU0Msa0JBQVQsQ0FB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QUErQjtBQUNsQyxPQUFLLElBQUlGLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdFLEdBQUcsQ0FBQ0MsTUFBeEIsRUFBZ0NILENBQUMsRUFBakMsRUFBcUM7QUFDakMsUUFBTUksU0FBUyxHQUFHSixDQUFDLEdBQUcsZ0NBQWUsQ0FBZixFQUFrQkUsR0FBRyxDQUFDQyxNQUFKLEdBQWFILENBQS9CLENBQXRCO0FBQ0EsUUFBTUssR0FBRyxHQUFHSCxHQUFHLENBQUNFLFNBQUQsQ0FBZjtBQUNBRixJQUFBQSxHQUFHLENBQUNFLFNBQUQsQ0FBSCxHQUFpQkYsR0FBRyxDQUFDRixDQUFELENBQXBCO0FBQ0FFLElBQUFBLEdBQUcsQ0FBQ0YsQ0FBRCxDQUFILEdBQVNLLEdBQVQ7QUFDSDtBQUNKOztBQUVNLFNBQVNDLFVBQVQsR0FBdUI7QUFDMUIsTUFBSUMsR0FBRyxHQUFHLDZCQUFZLENBQUMsQ0FBYixFQUFnQixDQUFoQixDQUFWO0FBQ0FBLEVBQUFBLEdBQUcsS0FBSyxDQUFSLEdBQVlBLEdBQUcsRUFBZixHQUFvQkEsR0FBcEI7QUFDQSxTQUFPLGlCQUFLQSxHQUFMLENBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hdDQsIFF1YXQsIHJhbmRvbSwgcmFuZG9tUmFuZ2UsIHJhbmRvbVJhbmdlSW50LCBWZWMyLCBWZWMzIH0gZnJvbSAnLi4vLi4vdmFsdWUtdHlwZXMnO1xuaW1wb3J0IHsgc2lnbiB9IGZyb20gJy4uLy4uL3ZhbHVlLXR5cGVzL3V0aWxzJztcbmltcG9ydCB7IFNwYWNlIH0gZnJvbSAnLi9lbnVtJztcblxuZXhwb3J0IGNvbnN0IHBhcnRpY2xlRW1pdFpBeGlzID0gbmV3IFZlYzMoMCwgMCwgLTEpO1xuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVHJhbnNmb3JtIChzeXN0ZW1TcGFjZSwgbW9kdWxlU3BhY2UsIHdvcmxkVHJhbnNmb3JtLCBvdXRRdWF0KSB7XG4gICAgaWYgKG1vZHVsZVNwYWNlICE9PSBzeXN0ZW1TcGFjZSkge1xuICAgICAgICBpZiAoc3lzdGVtU3BhY2UgPT09IFNwYWNlLldvcmxkKSB7XG4gICAgICAgICAgICBNYXQ0LmdldFJvdGF0aW9uKG91dFF1YXQsIHdvcmxkVHJhbnNmb3JtKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIE1hdDQuaW52ZXJ0KHdvcmxkVHJhbnNmb3JtLCB3b3JsZFRyYW5zZm9ybSk7XG4gICAgICAgICAgICBNYXQ0LmdldFJvdGF0aW9uKG91dFF1YXQsIHdvcmxkVHJhbnNmb3JtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIFF1YXQuc2V0KG91dFF1YXQsIDAsIDAsIDAsIDEpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZml4ZWRBbmdsZVVuaXRWZWN0b3IyIChvdXQsIHRoZXRhKSB7XG4gICAgVmVjMi5zZXQob3V0LCBNYXRoLmNvcyh0aGV0YSksIE1hdGguc2luKHRoZXRhKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21Vbml0VmVjdG9yMiAob3V0KSB7XG4gICAgY29uc3QgYSA9IHJhbmRvbVJhbmdlKDAsIDIgKiBNYXRoLlBJKTtcbiAgICBjb25zdCB4ID0gTWF0aC5jb3MoYSk7XG4gICAgY29uc3QgeSA9IE1hdGguc2luKGEpO1xuICAgIFZlYzIuc2V0KG91dCwgeCwgeSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21Vbml0VmVjdG9yIChvdXQpIHtcbiAgICBjb25zdCB6ID0gcmFuZG9tUmFuZ2UoLTEsIDEpO1xuICAgIGNvbnN0IGEgPSByYW5kb21SYW5nZSgwLCAyICogTWF0aC5QSSk7XG4gICAgY29uc3QgciA9IE1hdGguc3FydCgxIC0geiAqIHopO1xuICAgIGNvbnN0IHggPSByICogTWF0aC5jb3MoYSk7XG4gICAgY29uc3QgeSA9IHIgKiBNYXRoLnNpbihhKTtcbiAgICBWZWMzLnNldChvdXQsIHgsIHksIHopO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tUG9pbnRJblVuaXRTcGhlcmUgKG91dCkge1xuICAgIHJhbmRvbVVuaXRWZWN0b3Iob3V0KTtcbiAgICBWZWMzLnNjYWxlKG91dCwgb3V0LCByYW5kb20oKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21Qb2ludEJldHdlZW5TcGhlcmUgKG91dCwgbWluUmFkaXVzLCBtYXhSYWRpdXMpIHtcbiAgICByYW5kb21Vbml0VmVjdG9yKG91dCk7XG4gICAgVmVjMy5zY2FsZShvdXQsIG91dCwgbWluUmFkaXVzICsgKG1heFJhZGl1cyAtIG1pblJhZGl1cykgKiByYW5kb20oKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21Qb2ludEluVW5pdENpcmNsZSAob3V0KSB7XG4gICAgcmFuZG9tVW5pdFZlY3RvcjIob3V0KTtcbiAgICBvdXQueiA9IDA7XG4gICAgVmVjMy5zY2FsZShvdXQsIG91dCwgcmFuZG9tKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tUG9pbnRCZXR3ZWVuQ2lyY2xlIChvdXQsIG1pblJhZGl1cywgbWF4UmFkaXVzKSB7XG4gICAgcmFuZG9tVW5pdFZlY3RvcjIob3V0KTtcbiAgICBvdXQueiA9IDA7XG4gICAgVmVjMy5zY2FsZShvdXQsIG91dCwgbWluUmFkaXVzICsgKG1heFJhZGl1cyAtIG1pblJhZGl1cykgKiByYW5kb20oKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21Qb2ludEJldHdlZW5DaXJjbGVBdEZpeGVkQW5nbGUgKG91dCwgbWluUmFkaXVzLCBtYXhSYWRpdXMsIHRoZXRhKSB7XG4gICAgZml4ZWRBbmdsZVVuaXRWZWN0b3IyKG91dCwgdGhldGEpO1xuICAgIG91dC56ID0gMDtcbiAgICBWZWMzLnNjYWxlKG91dCwgb3V0LCBtaW5SYWRpdXMgKyAobWF4UmFkaXVzIC0gbWluUmFkaXVzKSAqIHJhbmRvbSgpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVBvaW50SW5DdWJlIChvdXQsIGV4dGVudHMpIHtcbiAgICBWZWMzLnNldChvdXQsXG4gICAgICAgIHJhbmRvbVJhbmdlKC1leHRlbnRzLngsIGV4dGVudHMueCksXG4gICAgICAgIHJhbmRvbVJhbmdlKC1leHRlbnRzLnksIGV4dGVudHMueSksXG4gICAgICAgIHJhbmRvbVJhbmdlKC1leHRlbnRzLnosIGV4dGVudHMueikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tUG9pbnRCZXR3ZWVuQ3ViZSAob3V0LCBtaW5Cb3gsIG1heEJveCkge1xuICAgIGNvbnN0IHN1YnNjcmlwdCA9IFsneCcsICd5JywgJ3onXTtcbiAgICBjb25zdCBlZGdlID0gcmFuZG9tUmFuZ2VJbnQoMCwgMyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgaWYgKGkgPT09IGVkZ2UpIHtcbiAgICAgICAgICAgIG91dFtzdWJzY3JpcHRbaV1dID0gcmFuZG9tUmFuZ2UoLW1heEJveFtzdWJzY3JpcHRbaV1dLCBtYXhCb3hbc3Vic2NyaXB0W2ldXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB4ID0gcmFuZG9tKCkgKiAyIC0gMTtcbiAgICAgICAgaWYgKHggPCAwKSB7XG4gICAgICAgICAgICBvdXRbc3Vic2NyaXB0W2ldXSA9IC1taW5Cb3hbc3Vic2NyaXB0W2ldXSArIHggKiAobWF4Qm94W3N1YnNjcmlwdFtpXV0gLSBtaW5Cb3hbc3Vic2NyaXB0W2ldXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvdXRbc3Vic2NyaXB0W2ldXSA9IG1pbkJveFtzdWJzY3JpcHRbaV1dICsgeCAqIChtYXhCb3hbc3Vic2NyaXB0W2ldXSAtIG1pbkJveFtzdWJzY3JpcHRbaV1dKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gRmlzaGVy4oCTWWF0ZXMgc2h1ZmZsZVxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVNvcnRBcnJheSAoYXJyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdHJhbnNwb3NlID0gaSArIHJhbmRvbVJhbmdlSW50KDAsIGFyci5sZW5ndGggLSBpKTtcbiAgICAgICAgY29uc3QgdmFsID0gYXJyW3RyYW5zcG9zZV07XG4gICAgICAgIGFyclt0cmFuc3Bvc2VdID0gYXJyW2ldO1xuICAgICAgICBhcnJbaV0gPSB2YWw7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tU2lnbiAoKSB7XG4gICAgbGV0IHNnbiA9IHJhbmRvbVJhbmdlKC0xLCAxKTtcbiAgICBzZ24gPT09IDAgPyBzZ24rKyA6IHNnbjtcbiAgICByZXR1cm4gc2lnbihzZ24pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=