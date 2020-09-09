
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/material/CCEffectAsset.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _CCAsset = _interopRequireDefault(require("../CCAsset"));

var _effectParser = require("./effect-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * !#en Effect Asset.
 * !#zh Effect 资源类型。
 * @class EffectAsset
 * @extends Asset
 */
var EffectAsset = cc.Class({
  name: 'cc.EffectAsset',
  "extends": _CCAsset["default"],
  ctor: function ctor() {
    this._effect = null;
  },
  properties: {
    properties: Object,
    techniques: [],
    shaders: []
  },
  onLoad: function onLoad() {
    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
      return;
    }

    var lib = cc.renderer._forward._programLib;

    for (var i = 0; i < this.shaders.length; i++) {
      lib.define(this.shaders[i]);
    }

    this._initEffect();
  },
  _initEffect: function _initEffect() {
    if (this._effect) return;
    this._effect = (0, _effectParser.parseEffect)(this);
    Object.freeze(this._effect);
  },
  getInstantiatedEffect: function getInstantiatedEffect() {
    this._initEffect();

    return this._effect.clone();
  },
  getEffect: function getEffect() {
    this._initEffect();

    return this._effect;
  }
});
module.exports = cc.EffectAsset = EffectAsset;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9tYXRlcmlhbC9DQ0VmZmVjdEFzc2V0LmpzIl0sIm5hbWVzIjpbIkVmZmVjdEFzc2V0IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJBc3NldCIsImN0b3IiLCJfZWZmZWN0IiwicHJvcGVydGllcyIsIk9iamVjdCIsInRlY2huaXF1ZXMiLCJzaGFkZXJzIiwib25Mb2FkIiwiZ2FtZSIsInJlbmRlclR5cGUiLCJSRU5ERVJfVFlQRV9DQU5WQVMiLCJsaWIiLCJyZW5kZXJlciIsIl9mb3J3YXJkIiwiX3Byb2dyYW1MaWIiLCJpIiwibGVuZ3RoIiwiZGVmaW5lIiwiX2luaXRFZmZlY3QiLCJmcmVlemUiLCJnZXRJbnN0YW50aWF0ZWRFZmZlY3QiLCJjbG9uZSIsImdldEVmZmVjdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBOzs7Ozs7QUFNQSxJQUFJQSxXQUFXLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3ZCQyxFQUFBQSxJQUFJLEVBQUUsZ0JBRGlCO0FBRXZCLGFBQVNDLG1CQUZjO0FBSXZCQyxFQUFBQSxJQUp1QixrQkFJZjtBQUNKLFNBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0gsR0FOc0I7QUFRdkJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQSxJQUFBQSxVQUFVLEVBQUVDLE1BREo7QUFFUkMsSUFBQUEsVUFBVSxFQUFFLEVBRko7QUFHUkMsSUFBQUEsT0FBTyxFQUFFO0FBSEQsR0FSVztBQWN2QkMsRUFBQUEsTUFkdUIsb0JBY2I7QUFDTixRQUFJVixFQUFFLENBQUNXLElBQUgsQ0FBUUMsVUFBUixLQUF1QlosRUFBRSxDQUFDVyxJQUFILENBQVFFLGtCQUFuQyxFQUF1RDtBQUNuRDtBQUNIOztBQUVELFFBQUlDLEdBQUcsR0FBR2QsRUFBRSxDQUFDZSxRQUFILENBQVlDLFFBQVosQ0FBcUJDLFdBQS9COztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLVCxPQUFMLENBQWFVLE1BQWpDLEVBQXlDRCxDQUFDLEVBQTFDLEVBQThDO0FBQzFDSixNQUFBQSxHQUFHLENBQUNNLE1BQUosQ0FBVyxLQUFLWCxPQUFMLENBQWFTLENBQWIsQ0FBWDtBQUNIOztBQUVELFNBQUtHLFdBQUw7QUFDSCxHQXpCc0I7QUEyQnZCQSxFQUFBQSxXQTNCdUIseUJBMkJSO0FBQ1gsUUFBSSxLQUFLaEIsT0FBVCxFQUFrQjtBQUNsQixTQUFLQSxPQUFMLEdBQWUsK0JBQVksSUFBWixDQUFmO0FBQ0FFLElBQUFBLE1BQU0sQ0FBQ2UsTUFBUCxDQUFjLEtBQUtqQixPQUFuQjtBQUNILEdBL0JzQjtBQWlDdkJrQixFQUFBQSxxQkFqQ3VCLG1DQWlDRTtBQUNyQixTQUFLRixXQUFMOztBQUNBLFdBQU8sS0FBS2hCLE9BQUwsQ0FBYW1CLEtBQWIsRUFBUDtBQUNILEdBcENzQjtBQXNDdkJDLEVBQUFBLFNBdEN1Qix1QkFzQ1Y7QUFDVCxTQUFLSixXQUFMOztBQUNBLFdBQU8sS0FBS2hCLE9BQVo7QUFDSDtBQXpDc0IsQ0FBVCxDQUFsQjtBQTRDQXFCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjNCLEVBQUUsQ0FBQ0QsV0FBSCxHQUFpQkEsV0FBbEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXNzZXQgZnJvbSAnLi4vQ0NBc3NldCc7XG5pbXBvcnQgeyBwYXJzZUVmZmVjdCB9IGZyb20gJy4vZWZmZWN0LXBhcnNlcic7XG5cbi8qKlxuICogISNlbiBFZmZlY3QgQXNzZXQuXG4gKiAhI3poIEVmZmVjdCDotYTmupDnsbvlnovjgIJcbiAqIEBjbGFzcyBFZmZlY3RBc3NldFxuICogQGV4dGVuZHMgQXNzZXRcbiAqL1xubGV0IEVmZmVjdEFzc2V0ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5FZmZlY3RBc3NldCcsXG4gICAgZXh0ZW5kczogQXNzZXQsXG5cbiAgICBjdG9yICgpIHtcbiAgICAgICAgdGhpcy5fZWZmZWN0ID0gbnVsbDtcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBwcm9wZXJ0aWVzOiBPYmplY3QsXG4gICAgICAgIHRlY2huaXF1ZXM6IFtdLFxuICAgICAgICBzaGFkZXJzOiBbXVxuICAgIH0sXG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBpZiAoY2MuZ2FtZS5yZW5kZXJUeXBlID09PSBjYy5nYW1lLlJFTkRFUl9UWVBFX0NBTlZBUykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgbGliID0gY2MucmVuZGVyZXIuX2ZvcndhcmQuX3Byb2dyYW1MaWI7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGFkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsaWIuZGVmaW5lKHRoaXMuc2hhZGVyc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pbml0RWZmZWN0KCk7XG4gICAgfSxcblxuICAgIF9pbml0RWZmZWN0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VmZmVjdCkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9lZmZlY3QgPSBwYXJzZUVmZmVjdCh0aGlzKTtcbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzLl9lZmZlY3QpO1xuICAgIH0sXG5cbiAgICBnZXRJbnN0YW50aWF0ZWRFZmZlY3QgKCkge1xuICAgICAgICB0aGlzLl9pbml0RWZmZWN0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZmZlY3QuY2xvbmUoKTtcbiAgICB9LFxuXG4gICAgZ2V0RWZmZWN0ICgpIHtcbiAgICAgICAgdGhpcy5faW5pdEVmZmVjdCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZWZmZWN0O1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNjLkVmZmVjdEFzc2V0ID0gRWZmZWN0QXNzZXQ7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==