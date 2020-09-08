
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/polyfill/string.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.lastIndexOf(searchString, position) === position;
  };
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (searchString, position) {
    if (typeof position === 'undefined' || position > this.length) {
      position = this.length;
    }

    position -= searchString.length;
    var lastIndex = this.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
}

if (!String.prototype.trimLeft) {
  String.prototype.trimLeft = function () {
    return this.replace(/^\s+/, '');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvcG9seWZpbGwvc3RyaW5nLmpzIl0sIm5hbWVzIjpbIlN0cmluZyIsInByb3RvdHlwZSIsInN0YXJ0c1dpdGgiLCJzZWFyY2hTdHJpbmciLCJwb3NpdGlvbiIsImxhc3RJbmRleE9mIiwiZW5kc1dpdGgiLCJsZW5ndGgiLCJsYXN0SW5kZXgiLCJpbmRleE9mIiwidHJpbUxlZnQiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSSxDQUFDQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLFVBQXRCLEVBQWtDO0FBQzlCRixFQUFBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLFVBQWpCLEdBQThCLFVBQVVDLFlBQVYsRUFBd0JDLFFBQXhCLEVBQWtDO0FBQzVEQSxJQUFBQSxRQUFRLEdBQUdBLFFBQVEsSUFBSSxDQUF2QjtBQUNBLFdBQU8sS0FBS0MsV0FBTCxDQUFpQkYsWUFBakIsRUFBK0JDLFFBQS9CLE1BQTZDQSxRQUFwRDtBQUNILEdBSEQ7QUFJSDs7QUFFRCxJQUFJLENBQUNKLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkssUUFBdEIsRUFBZ0M7QUFDNUJOLEVBQUFBLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkssUUFBakIsR0FBNEIsVUFBVUgsWUFBVixFQUF3QkMsUUFBeEIsRUFBa0M7QUFDMUQsUUFBSSxPQUFPQSxRQUFQLEtBQW9CLFdBQXBCLElBQW1DQSxRQUFRLEdBQUcsS0FBS0csTUFBdkQsRUFBK0Q7QUFDM0RILE1BQUFBLFFBQVEsR0FBRyxLQUFLRyxNQUFoQjtBQUNIOztBQUNESCxJQUFBQSxRQUFRLElBQUlELFlBQVksQ0FBQ0ksTUFBekI7QUFDQSxRQUFJQyxTQUFTLEdBQUcsS0FBS0MsT0FBTCxDQUFhTixZQUFiLEVBQTJCQyxRQUEzQixDQUFoQjtBQUNBLFdBQU9JLFNBQVMsS0FBSyxDQUFDLENBQWYsSUFBb0JBLFNBQVMsS0FBS0osUUFBekM7QUFDSCxHQVBEO0FBUUg7O0FBRUQsSUFBSSxDQUFDSixNQUFNLENBQUNDLFNBQVAsQ0FBaUJTLFFBQXRCLEVBQWdDO0FBQzVCVixFQUFBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJTLFFBQWpCLEdBQTRCLFlBQVk7QUFDcEMsV0FBTyxLQUFLQyxPQUFMLENBQWEsTUFBYixFQUFxQixFQUFyQixDQUFQO0FBQ0gsR0FGRDtBQUdIIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKCFTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgpIHtcbiAgICBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGggPSBmdW5jdGlvbiAoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikge1xuICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uIHx8IDA7XG4gICAgICAgIHJldHVybiB0aGlzLmxhc3RJbmRleE9mKHNlYXJjaFN0cmluZywgcG9zaXRpb24pID09PSBwb3NpdGlvbjtcbiAgICB9O1xufVxuXG5pZiAoIVN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGgpIHtcbiAgICBTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRoID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwb3NpdGlvbiA9PT0gJ3VuZGVmaW5lZCcgfHwgcG9zaXRpb24gPiB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgcG9zaXRpb24gPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICAgICAgICB2YXIgbGFzdEluZGV4ID0gdGhpcy5pbmRleE9mKHNlYXJjaFN0cmluZywgcG9zaXRpb24pO1xuICAgICAgICByZXR1cm4gbGFzdEluZGV4ICE9PSAtMSAmJiBsYXN0SW5kZXggPT09IHBvc2l0aW9uO1xuICAgIH07XG59XG5cbmlmICghU3RyaW5nLnByb3RvdHlwZS50cmltTGVmdCkge1xuICAgIFN0cmluZy5wcm90b3R5cGUudHJpbUxlZnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoL15cXHMrLywgJycpO1xuICAgIH07XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==