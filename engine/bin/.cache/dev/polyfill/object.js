
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/polyfill/object.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

// for IE11
if (!Object.assign) {
  Object.assign = function (target, source) {
    return cc.js.mixin(target, source);
  };
} // for Baidu browser
// Implementation reference to: 
// http://2ality.com/2016/02/object-getownpropertydescriptors.html
// http://docs.w3cub.com/javascript/global_objects/reflect/ownkeys/


if (!Object.getOwnPropertyDescriptors) {
  Object.getOwnPropertyDescriptors = function (obj) {
    var descriptors = {};
    var ownKeys = Object.getOwnPropertyNames(obj);

    if (Object.getOwnPropertySymbols) {
      // for IE 11
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(obj));
    }

    for (var i = 0; i < ownKeys.length; ++i) {
      var key = ownKeys[i];
      descriptors[key] = Object.getOwnPropertyDescriptor(obj, key);
    }

    return descriptors;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvcG9seWZpbGwvb2JqZWN0LmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImFzc2lnbiIsInRhcmdldCIsInNvdXJjZSIsImNjIiwianMiLCJtaXhpbiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJvYmoiLCJkZXNjcmlwdG9ycyIsIm93bktleXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiY29uY2F0IiwiaSIsImxlbmd0aCIsImtleSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0EsSUFBSSxDQUFDQSxNQUFNLENBQUNDLE1BQVosRUFBb0I7QUFDaEJELEVBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxHQUFnQixVQUFVQyxNQUFWLEVBQWtCQyxNQUFsQixFQUEwQjtBQUN0QyxXQUFPQyxFQUFFLENBQUNDLEVBQUgsQ0FBTUMsS0FBTixDQUFZSixNQUFaLEVBQW9CQyxNQUFwQixDQUFQO0FBQ0gsR0FGRDtBQUdILEVBRUQ7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLElBQUksQ0FBQ0gsTUFBTSxDQUFDTyx5QkFBWixFQUF1QztBQUNuQ1AsRUFBQUEsTUFBTSxDQUFDTyx5QkFBUCxHQUFtQyxVQUFVQyxHQUFWLEVBQWU7QUFDOUMsUUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsUUFBSUMsT0FBTyxHQUFHVixNQUFNLENBQUNXLG1CQUFQLENBQTJCSCxHQUEzQixDQUFkOztBQUNBLFFBQUlSLE1BQU0sQ0FBQ1kscUJBQVgsRUFBa0M7QUFBRTtBQUNoQ0YsTUFBQUEsT0FBTyxHQUFHQSxPQUFPLENBQUNHLE1BQVIsQ0FBZWIsTUFBTSxDQUFDWSxxQkFBUCxDQUE2QkosR0FBN0IsQ0FBZixDQUFWO0FBQ0g7O0FBQ0QsU0FBSSxJQUFJTSxDQUFDLEdBQUcsQ0FBWixFQUFlQSxDQUFDLEdBQUdKLE9BQU8sQ0FBQ0ssTUFBM0IsRUFBbUMsRUFBRUQsQ0FBckMsRUFBdUM7QUFDbkMsVUFBSUUsR0FBRyxHQUFHTixPQUFPLENBQUNJLENBQUQsQ0FBakI7QUFDQUwsTUFBQUEsV0FBVyxDQUFDTyxHQUFELENBQVgsR0FBbUJoQixNQUFNLENBQUNpQix3QkFBUCxDQUFnQ1QsR0FBaEMsRUFBcUNRLEdBQXJDLENBQW5CO0FBQ0g7O0FBQ0QsV0FBT1AsV0FBUDtBQUNILEdBWEQ7QUFZSCIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8gZm9yIElFMTFcbmlmICghT2JqZWN0LmFzc2lnbikge1xuICAgIE9iamVjdC5hc3NpZ24gPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIGNjLmpzLm1peGluKHRhcmdldCwgc291cmNlKTtcbiAgICB9XG59XG5cbi8vIGZvciBCYWlkdSBicm93c2VyXG4vLyBJbXBsZW1lbnRhdGlvbiByZWZlcmVuY2UgdG86IFxuLy8gaHR0cDovLzJhbGl0eS5jb20vMjAxNi8wMi9vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9ycy5odG1sXG4vLyBodHRwOi8vZG9jcy53M2N1Yi5jb20vamF2YXNjcmlwdC9nbG9iYWxfb2JqZWN0cy9yZWZsZWN0L293bmtleXMvXG5pZiAoIU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIGxldCBkZXNjcmlwdG9ycyA9IHt9O1xuICAgICAgICBsZXQgb3duS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XG4gICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IC8vIGZvciBJRSAxMVxuICAgICAgICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqKSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG93bktleXMubGVuZ3RoOyArK2kpe1xuICAgICAgICAgICAgbGV0IGtleSA9IG93bktleXNbaV07XG4gICAgICAgICAgICBkZXNjcmlwdG9yc1trZXldID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3JzO1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==