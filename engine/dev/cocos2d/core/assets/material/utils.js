
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/material/utils.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _enums = _interopRequireDefault(require("../../../renderer/enums"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.  
// function genHashCode (str) {
//     var hash = 0;
//     if (str.length == 0) {
//         return hash;
//     }
//     for (var i = 0; i < str.length; i++) {
//         var char = str.charCodeAt(i);
//         hash = ((hash<<5)-hash)+char;
//         hash = hash & hash; // Convert to 32bit integer
//     }
//     return hash;
// }
function serializeDefines(defines) {
  var str = '';

  for (var name in defines) {
    str += name + defines[name];
  }

  return str;
}

function serializePass(pass, excludeProperties) {
  var str = pass._programName + pass._cullMode;

  if (pass._blend) {
    str += pass._blendEq + pass._blendAlphaEq + pass._blendSrc + pass._blendDst + pass._blendSrcAlpha + pass._blendDstAlpha + pass._blendColor;
  }

  if (pass._depthTest) {
    str += pass._depthWrite + pass._depthFunc;
  }

  if (pass._stencilTest) {
    str += pass._stencilFuncFront + pass._stencilRefFront + pass._stencilMaskFront + pass._stencilFailOpFront + pass._stencilZFailOpFront + pass._stencilZPassOpFront + pass._stencilWriteMaskFront + pass._stencilFuncBack + pass._stencilRefBack + pass._stencilMaskBack + pass._stencilFailOpBack + pass._stencilZFailOpBack + pass._stencilZPassOpBack + pass._stencilWriteMaskBack;
  }

  if (!excludeProperties) {
    str += serializeUniforms(pass._properties);
  }

  str += serializeDefines(pass._defines);
  return str;
}

function serializePasses(passes) {
  var hashData = '';

  for (var i = 0; i < passes.length; i++) {
    hashData += serializePass(passes[i]);
  }

  return hashData;
}

function serializeUniforms(uniforms) {
  var hashData = '';

  for (var name in uniforms) {
    var param = uniforms[name];
    var prop = param.value;

    if (!prop) {
      continue;
    }

    if (param.type === _enums["default"].PARAM_TEXTURE_2D || param.type === _enums["default"].PARAM_TEXTURE_CUBE) {
      hashData += prop._id + ';';
    } else {
      hashData += prop.toString() + ';';
    }
  }

  return hashData;
}

var _default = {
  serializeDefines: serializeDefines,
  serializePasses: serializePasses,
  serializeUniforms: serializeUniforms
};
exports["default"] = _default;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9tYXRlcmlhbC91dGlscy5qcyJdLCJuYW1lcyI6WyJzZXJpYWxpemVEZWZpbmVzIiwiZGVmaW5lcyIsInN0ciIsIm5hbWUiLCJzZXJpYWxpemVQYXNzIiwicGFzcyIsImV4Y2x1ZGVQcm9wZXJ0aWVzIiwiX3Byb2dyYW1OYW1lIiwiX2N1bGxNb2RlIiwiX2JsZW5kIiwiX2JsZW5kRXEiLCJfYmxlbmRBbHBoYUVxIiwiX2JsZW5kU3JjIiwiX2JsZW5kRHN0IiwiX2JsZW5kU3JjQWxwaGEiLCJfYmxlbmREc3RBbHBoYSIsIl9ibGVuZENvbG9yIiwiX2RlcHRoVGVzdCIsIl9kZXB0aFdyaXRlIiwiX2RlcHRoRnVuYyIsIl9zdGVuY2lsVGVzdCIsIl9zdGVuY2lsRnVuY0Zyb250IiwiX3N0ZW5jaWxSZWZGcm9udCIsIl9zdGVuY2lsTWFza0Zyb250IiwiX3N0ZW5jaWxGYWlsT3BGcm9udCIsIl9zdGVuY2lsWkZhaWxPcEZyb250IiwiX3N0ZW5jaWxaUGFzc09wRnJvbnQiLCJfc3RlbmNpbFdyaXRlTWFza0Zyb250IiwiX3N0ZW5jaWxGdW5jQmFjayIsIl9zdGVuY2lsUmVmQmFjayIsIl9zdGVuY2lsTWFza0JhY2siLCJfc3RlbmNpbEZhaWxPcEJhY2siLCJfc3RlbmNpbFpGYWlsT3BCYWNrIiwiX3N0ZW5jaWxaUGFzc09wQmFjayIsIl9zdGVuY2lsV3JpdGVNYXNrQmFjayIsInNlcmlhbGl6ZVVuaWZvcm1zIiwiX3Byb3BlcnRpZXMiLCJfZGVmaW5lcyIsInNlcmlhbGl6ZVBhc3NlcyIsInBhc3NlcyIsImhhc2hEYXRhIiwiaSIsImxlbmd0aCIsInVuaWZvcm1zIiwicGFyYW0iLCJwcm9wIiwidmFsdWUiLCJ0eXBlIiwiZW51bXMiLCJQQVJBTV9URVhUVVJFXzJEIiwiUEFSQU1fVEVYVFVSRV9DVUJFIiwiX2lkIiwidG9TdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7OztBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsU0FBU0EsZ0JBQVQsQ0FBMkJDLE9BQTNCLEVBQW9DO0FBQ2hDLE1BQUlDLEdBQUcsR0FBRyxFQUFWOztBQUNBLE9BQUssSUFBSUMsSUFBVCxJQUFpQkYsT0FBakIsRUFBMEI7QUFDdEJDLElBQUFBLEdBQUcsSUFBSUMsSUFBSSxHQUFHRixPQUFPLENBQUNFLElBQUQsQ0FBckI7QUFDSDs7QUFDRCxTQUFPRCxHQUFQO0FBQ0g7O0FBRUQsU0FBU0UsYUFBVCxDQUF3QkMsSUFBeEIsRUFBOEJDLGlCQUE5QixFQUFpRDtBQUM3QyxNQUFJSixHQUFHLEdBQUdHLElBQUksQ0FBQ0UsWUFBTCxHQUFvQkYsSUFBSSxDQUFDRyxTQUFuQzs7QUFDQSxNQUFJSCxJQUFJLENBQUNJLE1BQVQsRUFBaUI7QUFDYlAsSUFBQUEsR0FBRyxJQUFJRyxJQUFJLENBQUNLLFFBQUwsR0FBZ0JMLElBQUksQ0FBQ00sYUFBckIsR0FBcUNOLElBQUksQ0FBQ08sU0FBMUMsR0FBc0RQLElBQUksQ0FBQ1EsU0FBM0QsR0FDRFIsSUFBSSxDQUFDUyxjQURKLEdBQ3FCVCxJQUFJLENBQUNVLGNBRDFCLEdBQzJDVixJQUFJLENBQUNXLFdBRHZEO0FBRUg7O0FBQ0QsTUFBSVgsSUFBSSxDQUFDWSxVQUFULEVBQXFCO0FBQ2pCZixJQUFBQSxHQUFHLElBQUlHLElBQUksQ0FBQ2EsV0FBTCxHQUFtQmIsSUFBSSxDQUFDYyxVQUEvQjtBQUNIOztBQUNELE1BQUlkLElBQUksQ0FBQ2UsWUFBVCxFQUF1QjtBQUNuQmxCLElBQUFBLEdBQUcsSUFBSUcsSUFBSSxDQUFDZ0IsaUJBQUwsR0FBeUJoQixJQUFJLENBQUNpQixnQkFBOUIsR0FBaURqQixJQUFJLENBQUNrQixpQkFBdEQsR0FDRGxCLElBQUksQ0FBQ21CLG1CQURKLEdBQzBCbkIsSUFBSSxDQUFDb0Isb0JBRC9CLEdBQ3NEcEIsSUFBSSxDQUFDcUIsb0JBRDNELEdBRURyQixJQUFJLENBQUNzQixzQkFGSixHQUdEdEIsSUFBSSxDQUFDdUIsZ0JBSEosR0FHdUJ2QixJQUFJLENBQUN3QixlQUg1QixHQUc4Q3hCLElBQUksQ0FBQ3lCLGdCQUhuRCxHQUlEekIsSUFBSSxDQUFDMEIsa0JBSkosR0FJeUIxQixJQUFJLENBQUMyQixtQkFKOUIsR0FJb0QzQixJQUFJLENBQUM0QixtQkFKekQsR0FLRDVCLElBQUksQ0FBQzZCLHFCQUxYO0FBTUg7O0FBRUQsTUFBSSxDQUFDNUIsaUJBQUwsRUFBd0I7QUFDcEJKLElBQUFBLEdBQUcsSUFBSWlDLGlCQUFpQixDQUFDOUIsSUFBSSxDQUFDK0IsV0FBTixDQUF4QjtBQUNIOztBQUNEbEMsRUFBQUEsR0FBRyxJQUFJRixnQkFBZ0IsQ0FBQ0ssSUFBSSxDQUFDZ0MsUUFBTixDQUF2QjtBQUVBLFNBQU9uQyxHQUFQO0FBQ0g7O0FBRUQsU0FBU29DLGVBQVQsQ0FBMEJDLE1BQTFCLEVBQWtDO0FBQzlCLE1BQUlDLFFBQVEsR0FBRyxFQUFmOztBQUNBLE9BQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0YsTUFBTSxDQUFDRyxNQUEzQixFQUFtQ0QsQ0FBQyxFQUFwQyxFQUF3QztBQUNwQ0QsSUFBQUEsUUFBUSxJQUFJcEMsYUFBYSxDQUFDbUMsTUFBTSxDQUFDRSxDQUFELENBQVAsQ0FBekI7QUFDSDs7QUFDRCxTQUFPRCxRQUFQO0FBQ0g7O0FBRUQsU0FBU0wsaUJBQVQsQ0FBNEJRLFFBQTVCLEVBQXNDO0FBQ2xDLE1BQUlILFFBQVEsR0FBRyxFQUFmOztBQUNBLE9BQUssSUFBSXJDLElBQVQsSUFBaUJ3QyxRQUFqQixFQUEyQjtBQUN2QixRQUFJQyxLQUFLLEdBQUdELFFBQVEsQ0FBQ3hDLElBQUQsQ0FBcEI7QUFDQSxRQUFJMEMsSUFBSSxHQUFHRCxLQUFLLENBQUNFLEtBQWpCOztBQUVBLFFBQUksQ0FBQ0QsSUFBTCxFQUFXO0FBQ1A7QUFDSDs7QUFFRCxRQUFJRCxLQUFLLENBQUNHLElBQU4sS0FBZUMsa0JBQU1DLGdCQUFyQixJQUF5Q0wsS0FBSyxDQUFDRyxJQUFOLEtBQWVDLGtCQUFNRSxrQkFBbEUsRUFBc0Y7QUFDbEZWLE1BQUFBLFFBQVEsSUFBSUssSUFBSSxDQUFDTSxHQUFMLEdBQVcsR0FBdkI7QUFDSCxLQUZELE1BR0s7QUFDRFgsTUFBQUEsUUFBUSxJQUFJSyxJQUFJLENBQUNPLFFBQUwsS0FBa0IsR0FBOUI7QUFDSDtBQUNKOztBQUVELFNBQU9aLFFBQVA7QUFDSDs7ZUFFYztBQUNYeEMsRUFBQUEsZ0JBQWdCLEVBQWhCQSxnQkFEVztBQUVYc0MsRUFBQUEsZUFBZSxFQUFmQSxlQUZXO0FBR1hILEVBQUFBLGlCQUFpQixFQUFqQkE7QUFIVyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiAgXG5cbmltcG9ydCBlbnVtcyBmcm9tICcuLi8uLi8uLi9yZW5kZXJlci9lbnVtcyc7XG5cbi8vIGZ1bmN0aW9uIGdlbkhhc2hDb2RlIChzdHIpIHtcbi8vICAgICB2YXIgaGFzaCA9IDA7XG4vLyAgICAgaWYgKHN0ci5sZW5ndGggPT0gMCkge1xuLy8gICAgICAgICByZXR1cm4gaGFzaDtcbi8vICAgICB9XG4vLyAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbi8vICAgICAgICAgdmFyIGNoYXIgPSBzdHIuY2hhckNvZGVBdChpKTtcbi8vICAgICAgICAgaGFzaCA9ICgoaGFzaDw8NSktaGFzaCkrY2hhcjtcbi8vICAgICAgICAgaGFzaCA9IGhhc2ggJiBoYXNoOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcbi8vICAgICB9XG4vLyAgICAgcmV0dXJuIGhhc2g7XG4vLyB9XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZURlZmluZXMgKGRlZmluZXMpIHtcbiAgICBsZXQgc3RyID0gJyc7XG4gICAgZm9yIChsZXQgbmFtZSBpbiBkZWZpbmVzKSB7XG4gICAgICAgIHN0ciArPSBuYW1lICsgZGVmaW5lc1tuYW1lXTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplUGFzcyAocGFzcywgZXhjbHVkZVByb3BlcnRpZXMpIHtcbiAgICBsZXQgc3RyID0gcGFzcy5fcHJvZ3JhbU5hbWUgKyBwYXNzLl9jdWxsTW9kZTtcbiAgICBpZiAocGFzcy5fYmxlbmQpIHtcbiAgICAgICAgc3RyICs9IHBhc3MuX2JsZW5kRXEgKyBwYXNzLl9ibGVuZEFscGhhRXEgKyBwYXNzLl9ibGVuZFNyYyArIHBhc3MuX2JsZW5kRHN0XG4gICAgICAgICAgICArIHBhc3MuX2JsZW5kU3JjQWxwaGEgKyBwYXNzLl9ibGVuZERzdEFscGhhICsgcGFzcy5fYmxlbmRDb2xvcjtcbiAgICB9XG4gICAgaWYgKHBhc3MuX2RlcHRoVGVzdCkge1xuICAgICAgICBzdHIgKz0gcGFzcy5fZGVwdGhXcml0ZSArIHBhc3MuX2RlcHRoRnVuYztcbiAgICB9XG4gICAgaWYgKHBhc3MuX3N0ZW5jaWxUZXN0KSB7XG4gICAgICAgIHN0ciArPSBwYXNzLl9zdGVuY2lsRnVuY0Zyb250ICsgcGFzcy5fc3RlbmNpbFJlZkZyb250ICsgcGFzcy5fc3RlbmNpbE1hc2tGcm9udFxuICAgICAgICAgICAgKyBwYXNzLl9zdGVuY2lsRmFpbE9wRnJvbnQgKyBwYXNzLl9zdGVuY2lsWkZhaWxPcEZyb250ICsgcGFzcy5fc3RlbmNpbFpQYXNzT3BGcm9udFxuICAgICAgICAgICAgKyBwYXNzLl9zdGVuY2lsV3JpdGVNYXNrRnJvbnRcbiAgICAgICAgICAgICsgcGFzcy5fc3RlbmNpbEZ1bmNCYWNrICsgcGFzcy5fc3RlbmNpbFJlZkJhY2sgKyBwYXNzLl9zdGVuY2lsTWFza0JhY2tcbiAgICAgICAgICAgICsgcGFzcy5fc3RlbmNpbEZhaWxPcEJhY2sgKyBwYXNzLl9zdGVuY2lsWkZhaWxPcEJhY2sgKyBwYXNzLl9zdGVuY2lsWlBhc3NPcEJhY2tcbiAgICAgICAgICAgICsgcGFzcy5fc3RlbmNpbFdyaXRlTWFza0JhY2s7XG4gICAgfVxuXG4gICAgaWYgKCFleGNsdWRlUHJvcGVydGllcykge1xuICAgICAgICBzdHIgKz0gc2VyaWFsaXplVW5pZm9ybXMocGFzcy5fcHJvcGVydGllcyk7XG4gICAgfVxuICAgIHN0ciArPSBzZXJpYWxpemVEZWZpbmVzKHBhc3MuX2RlZmluZXMpO1xuXG4gICAgcmV0dXJuIHN0cjtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplUGFzc2VzIChwYXNzZXMpIHtcbiAgICBsZXQgaGFzaERhdGEgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBoYXNoRGF0YSArPSBzZXJpYWxpemVQYXNzKHBhc3Nlc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBoYXNoRGF0YTtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplVW5pZm9ybXMgKHVuaWZvcm1zKSB7XG4gICAgbGV0IGhhc2hEYXRhID0gJyc7XG4gICAgZm9yIChsZXQgbmFtZSBpbiB1bmlmb3Jtcykge1xuICAgICAgICBsZXQgcGFyYW0gPSB1bmlmb3Jtc1tuYW1lXTtcbiAgICAgICAgbGV0IHByb3AgPSBwYXJhbS52YWx1ZTtcblxuICAgICAgICBpZiAoIXByb3ApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmFtLnR5cGUgPT09IGVudW1zLlBBUkFNX1RFWFRVUkVfMkQgfHwgcGFyYW0udHlwZSA9PT0gZW51bXMuUEFSQU1fVEVYVFVSRV9DVUJFKSB7XG4gICAgICAgICAgICBoYXNoRGF0YSArPSBwcm9wLl9pZCArICc7JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhhc2hEYXRhICs9IHByb3AudG9TdHJpbmcoKSArICc7JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBoYXNoRGF0YTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHNlcmlhbGl6ZURlZmluZXMsXG4gICAgc2VyaWFsaXplUGFzc2VzLFxuICAgIHNlcmlhbGl6ZVVuaWZvcm1zXG59OyJdLCJzb3VyY2VSb290IjoiLyJ9