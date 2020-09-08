
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/polyfill/array-buffer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

if (!ArrayBuffer.isView) {
  var TypedArray = Object.getPrototypeOf(Int8Array);
  ArrayBuffer.isView = typeof TypedArray === 'function' ? function (obj) {
    return obj instanceof TypedArray;
  } : function (obj) {
    // old JSC, phantom, QtWebview
    if (typeof obj !== 'object') {
      return false;
    }

    var ctor = obj.constructor;
    return ctor === Float64Array || ctor === Float32Array || ctor === Uint8Array || ctor === Uint32Array || ctor === Int8Array;
  };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvcG9seWZpbGwvYXJyYXktYnVmZmVyLmpzIl0sIm5hbWVzIjpbIkFycmF5QnVmZmVyIiwiaXNWaWV3IiwiVHlwZWRBcnJheSIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwiSW50OEFycmF5Iiwib2JqIiwiY3RvciIsImNvbnN0cnVjdG9yIiwiRmxvYXQ2NEFycmF5IiwiRmxvYXQzMkFycmF5IiwiVWludDhBcnJheSIsIlVpbnQzMkFycmF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSSxDQUFDQSxXQUFXLENBQUNDLE1BQWpCLEVBQXlCO0FBQ3JCLE1BQU1DLFVBQVUsR0FBR0MsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxTQUF0QixDQUFuQjtBQUNBTCxFQUFBQSxXQUFXLENBQUNDLE1BQVosR0FBc0IsT0FBT0MsVUFBUCxLQUFzQixVQUF2QixHQUFxQyxVQUFVSSxHQUFWLEVBQWU7QUFDckUsV0FBT0EsR0FBRyxZQUFZSixVQUF0QjtBQUNILEdBRm9CLEdBRWpCLFVBQVVJLEdBQVYsRUFBZTtBQUNmO0FBQ0EsUUFBSSxPQUFPQSxHQUFQLEtBQWUsUUFBbkIsRUFBNkI7QUFDekIsYUFBTyxLQUFQO0FBQ0g7O0FBQ0QsUUFBSUMsSUFBSSxHQUFHRCxHQUFHLENBQUNFLFdBQWY7QUFDQSxXQUFPRCxJQUFJLEtBQUtFLFlBQVQsSUFBeUJGLElBQUksS0FBS0csWUFBbEMsSUFBa0RILElBQUksS0FBS0ksVUFBM0QsSUFBeUVKLElBQUksS0FBS0ssV0FBbEYsSUFBaUdMLElBQUksS0FBS0YsU0FBakg7QUFDSCxHQVREO0FBVUgiLCJzb3VyY2VzQ29udGVudCI6WyJpZiAoIUFycmF5QnVmZmVyLmlzVmlldykge1xuICAgIGNvbnN0IFR5cGVkQXJyYXkgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoSW50OEFycmF5KTtcbiAgICBBcnJheUJ1ZmZlci5pc1ZpZXcgPSAodHlwZW9mIFR5cGVkQXJyYXkgPT09ICdmdW5jdGlvbicpID8gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgVHlwZWRBcnJheTtcbiAgICB9IDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAvLyBvbGQgSlNDLCBwaGFudG9tLCBRdFdlYnZpZXdcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN0b3IgPSBvYmouY29uc3RydWN0b3I7XG4gICAgICAgIHJldHVybiBjdG9yID09PSBGbG9hdDY0QXJyYXkgfHwgY3RvciA9PT0gRmxvYXQzMkFycmF5IHx8IGN0b3IgPT09IFVpbnQ4QXJyYXkgfHwgY3RvciA9PT0gVWludDMyQXJyYXkgfHwgY3RvciA9PT0gSW50OEFycmF5O1xuICAgIH07XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==