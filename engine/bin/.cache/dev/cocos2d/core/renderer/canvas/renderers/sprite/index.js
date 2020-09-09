
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/renderers/sprite/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _assembler = _interopRequireDefault(require("../../../assembler"));

var _CCSprite = require("../../../../components/CCSprite");

var _simple = _interopRequireDefault(require("./simple"));

var _sliced = _interopRequireDefault(require("./sliced"));

var _tiled = _interopRequireDefault(require("./tiled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ctor = {
  getConstructor: function getConstructor(sprite) {
    var ctor = _simple["default"];

    switch (sprite.type) {
      case _CCSprite.Type.SLICED:
        ctor = _sliced["default"];
        break;

      case _CCSprite.Type.TILED:
        ctor = _tiled["default"];
        break;
    }

    return ctor;
  },
  Simple: _simple["default"],
  Sliced: _sliced["default"],
  Tiled: _tiled["default"]
};

_assembler["default"].register(cc.Sprite, ctor);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2NhbnZhcy9yZW5kZXJlcnMvc3ByaXRlL2luZGV4LmpzIl0sIm5hbWVzIjpbImN0b3IiLCJnZXRDb25zdHJ1Y3RvciIsInNwcml0ZSIsIlNpbXBsZSIsInR5cGUiLCJUeXBlIiwiU0xJQ0VEIiwiU2xpY2VkIiwiVElMRUQiLCJUaWxlZCIsIkFzZW1ibGVyIiwicmVnaXN0ZXIiLCJjYyIsIlNwcml0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBSUEsSUFBSSxHQUFHO0FBQ1BDLEVBQUFBLGNBRE8sMEJBQ1FDLE1BRFIsRUFDZ0I7QUFDbkIsUUFBSUYsSUFBSSxHQUFHRyxrQkFBWDs7QUFDQSxZQUFRRCxNQUFNLENBQUNFLElBQWY7QUFDSSxXQUFLQyxlQUFLQyxNQUFWO0FBQ0lOLFFBQUFBLElBQUksR0FBR08sa0JBQVA7QUFDQTs7QUFDSixXQUFLRixlQUFLRyxLQUFWO0FBQ0lSLFFBQUFBLElBQUksR0FBR1MsaUJBQVA7QUFDQTtBQU5SOztBQVNBLFdBQU9ULElBQVA7QUFDSCxHQWJNO0FBZVBHLEVBQUFBLE1BQU0sRUFBTkEsa0JBZk87QUFnQlBJLEVBQUFBLE1BQU0sRUFBTkEsa0JBaEJPO0FBaUJQRSxFQUFBQSxLQUFLLEVBQUxBO0FBakJPLENBQVg7O0FBb0JBQyxzQkFBU0MsUUFBVCxDQUFrQkMsRUFBRSxDQUFDQyxNQUFyQixFQUE2QmIsSUFBN0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXNlbWJsZXIgZnJvbSAnLi4vLi4vLi4vYXNzZW1ibGVyJztcbmltcG9ydCB7IFR5cGUgfSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL0NDU3ByaXRlJztcblxuaW1wb3J0IFNpbXBsZSBmcm9tIFwiLi9zaW1wbGVcIjtcbmltcG9ydCBTbGljZWQgZnJvbSBcIi4vc2xpY2VkXCI7XG5pbXBvcnQgVGlsZWQgZnJvbSBcIi4vdGlsZWRcIjtcblxubGV0IGN0b3IgPSB7XG4gICAgZ2V0Q29uc3RydWN0b3Ioc3ByaXRlKSB7XG4gICAgICAgIGxldCBjdG9yID0gU2ltcGxlO1xuICAgICAgICBzd2l0Y2ggKHNwcml0ZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFR5cGUuU0xJQ0VEOlxuICAgICAgICAgICAgICAgIGN0b3IgPSBTbGljZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFR5cGUuVElMRUQ6XG4gICAgICAgICAgICAgICAgY3RvciA9IFRpbGVkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGN0b3I7XG4gICAgfSxcblxuICAgIFNpbXBsZSxcbiAgICBTbGljZWQsXG4gICAgVGlsZWRcbn07XG5cbkFzZW1ibGVyLnJlZ2lzdGVyKGNjLlNwcml0ZSwgY3Rvcik7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==