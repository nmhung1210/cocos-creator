
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/scene/model.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

/**
 * A representation of a model
 */
var Model = /*#__PURE__*/function () {
  /**
   * Setup a default empty model
   */
  function Model() {
    this._type = 'default';
    this._poolID = -1;
    this._node = null;
    this._inputAssembler = null;
    this._effect = null;
    this._viewID = -1;
    this._cameraID = -1;
    this._userKey = -1;
    this._castShadow = false;
    this._boundingShape = null;
  }
  /**
   * Set the hosting node of this model
   * @param {Node} node the hosting node
   */


  var _proto = Model.prototype;

  _proto.setNode = function setNode(node) {
    this._node = node;
  }
  /**
   * Set the input assembler
   * @param {InputAssembler} ia
   */
  ;

  _proto.setInputAssembler = function setInputAssembler(ia) {
    this._inputAssembler = ia;
  }
  /**
   * Set the model effect
   * @param {?Effect} effect the effect to use
   */
  ;

  _proto.setEffect = function setEffect(effect) {
    this._effect = effect;
  }
  /**
   * Set the user key
   * @param {number} key
   */
  ;

  _proto.setUserKey = function setUserKey(key) {
    this._userKey = key;
  }
  /**
   * Extract a drawing item
   * @param {Object} out the receiving item
   */
  ;

  _proto.extractDrawItem = function extractDrawItem(out) {
    out.model = this;
    out.node = this._node;
    out.ia = this._inputAssembler;
    out.effect = this._effect;
  };

  return Model;
}();

exports["default"] = Model;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9zY2VuZS9tb2RlbC5qcyJdLCJuYW1lcyI6WyJNb2RlbCIsIl90eXBlIiwiX3Bvb2xJRCIsIl9ub2RlIiwiX2lucHV0QXNzZW1ibGVyIiwiX2VmZmVjdCIsIl92aWV3SUQiLCJfY2FtZXJhSUQiLCJfdXNlcktleSIsIl9jYXN0U2hhZG93IiwiX2JvdW5kaW5nU2hhcGUiLCJzZXROb2RlIiwibm9kZSIsInNldElucHV0QXNzZW1ibGVyIiwiaWEiLCJzZXRFZmZlY3QiLCJlZmZlY3QiLCJzZXRVc2VyS2V5Iiwia2V5IiwiZXh0cmFjdERyYXdJdGVtIiwib3V0IiwibW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7O0lBR3FCQTtBQUNuQjs7O0FBR0EsbUJBQWM7QUFDWixTQUFLQyxLQUFMLEdBQWEsU0FBYjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxDQUFDLENBQWhCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLElBQWI7QUFDQSxTQUFLQyxlQUFMLEdBQXVCLElBQXZCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQWY7QUFDQSxTQUFLQyxPQUFMLEdBQWUsQ0FBQyxDQUFoQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsQ0FBQyxDQUFsQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsQ0FBQyxDQUFqQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLElBQXRCO0FBQ0Q7QUFFRDs7Ozs7Ozs7U0FJQUMsVUFBQSxpQkFBUUMsSUFBUixFQUFjO0FBQ1osU0FBS1QsS0FBTCxHQUFhUyxJQUFiO0FBQ0Q7QUFFRDs7Ozs7O1NBSUFDLG9CQUFBLDJCQUFrQkMsRUFBbEIsRUFBc0I7QUFDcEIsU0FBS1YsZUFBTCxHQUF1QlUsRUFBdkI7QUFDRDtBQUVEOzs7Ozs7U0FJQUMsWUFBQSxtQkFBVUMsTUFBVixFQUFrQjtBQUNoQixTQUFLWCxPQUFMLEdBQWVXLE1BQWY7QUFDRDtBQUVEOzs7Ozs7U0FJQUMsYUFBQSxvQkFBV0MsR0FBWCxFQUFnQjtBQUNkLFNBQUtWLFFBQUwsR0FBZ0JVLEdBQWhCO0FBQ0Q7QUFFRDs7Ozs7O1NBSUFDLGtCQUFBLHlCQUFnQkMsR0FBaEIsRUFBcUI7QUFDbkJBLElBQUFBLEdBQUcsQ0FBQ0MsS0FBSixHQUFZLElBQVo7QUFDQUQsSUFBQUEsR0FBRyxDQUFDUixJQUFKLEdBQVcsS0FBS1QsS0FBaEI7QUFDQWlCLElBQUFBLEdBQUcsQ0FBQ04sRUFBSixHQUFTLEtBQUtWLGVBQWQ7QUFDQWdCLElBQUFBLEdBQUcsQ0FBQ0osTUFBSixHQUFhLEtBQUtYLE9BQWxCO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuLyoqXG4gKiBBIHJlcHJlc2VudGF0aW9uIG9mIGEgbW9kZWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZWwge1xuICAvKipcbiAgICogU2V0dXAgYSBkZWZhdWx0IGVtcHR5IG1vZGVsXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl90eXBlID0gJ2RlZmF1bHQnO1xuICAgIHRoaXMuX3Bvb2xJRCA9IC0xO1xuICAgIHRoaXMuX25vZGUgPSBudWxsO1xuICAgIHRoaXMuX2lucHV0QXNzZW1ibGVyID0gbnVsbDtcbiAgICB0aGlzLl9lZmZlY3QgPSBudWxsO1xuICAgIHRoaXMuX3ZpZXdJRCA9IC0xO1xuICAgIHRoaXMuX2NhbWVyYUlEID0gLTE7XG4gICAgdGhpcy5fdXNlcktleSA9IC0xO1xuICAgIHRoaXMuX2Nhc3RTaGFkb3cgPSBmYWxzZTtcbiAgICB0aGlzLl9ib3VuZGluZ1NoYXBlID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGhvc3Rpbmcgbm9kZSBvZiB0aGlzIG1vZGVsXG4gICAqIEBwYXJhbSB7Tm9kZX0gbm9kZSB0aGUgaG9zdGluZyBub2RlXG4gICAqL1xuICBzZXROb2RlKG5vZGUpIHtcbiAgICB0aGlzLl9ub2RlID0gbm9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGlucHV0IGFzc2VtYmxlclxuICAgKiBAcGFyYW0ge0lucHV0QXNzZW1ibGVyfSBpYVxuICAgKi9cbiAgc2V0SW5wdXRBc3NlbWJsZXIoaWEpIHtcbiAgICB0aGlzLl9pbnB1dEFzc2VtYmxlciA9IGlhO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgbW9kZWwgZWZmZWN0XG4gICAqIEBwYXJhbSB7P0VmZmVjdH0gZWZmZWN0IHRoZSBlZmZlY3QgdG8gdXNlXG4gICAqL1xuICBzZXRFZmZlY3QoZWZmZWN0KSB7XG4gICAgdGhpcy5fZWZmZWN0ID0gZWZmZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdXNlciBrZXlcbiAgICogQHBhcmFtIHtudW1iZXJ9IGtleVxuICAgKi9cbiAgc2V0VXNlcktleShrZXkpIHtcbiAgICB0aGlzLl91c2VyS2V5ID0ga2V5O1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3QgYSBkcmF3aW5nIGl0ZW1cbiAgICogQHBhcmFtIHtPYmplY3R9IG91dCB0aGUgcmVjZWl2aW5nIGl0ZW1cbiAgICovXG4gIGV4dHJhY3REcmF3SXRlbShvdXQpIHtcbiAgICBvdXQubW9kZWwgPSB0aGlzO1xuICAgIG91dC5ub2RlID0gdGhpcy5fbm9kZTtcbiAgICBvdXQuaWEgPSB0aGlzLl9pbnB1dEFzc2VtYmxlcjtcbiAgICBvdXQuZWZmZWN0ID0gdGhpcy5fZWZmZWN0O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==