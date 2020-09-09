
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/scene/scene.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _memop = require("../memop");

// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

/**
 * A representation of the scene
 */
var Scene = /*#__PURE__*/function () {
  /**
   * Setup a default empty scene
   */
  function Scene(app) {
    this._lights = new _memop.FixedArray(16);
    this._models = new _memop.FixedArray(16);
    this._cameras = new _memop.FixedArray(16);
    this._debugCamera = null;
    this._app = app; // NOTE: we don't use pool for views (because it's less changed and it doesn't have poolID)

    this._views = [];
  }

  var _proto = Scene.prototype;

  _proto._add = function _add(pool, item) {
    if (item._poolID !== -1) {
      return;
    }

    pool.push(item);
    item._poolID = pool.length - 1;
  };

  _proto._remove = function _remove(pool, item) {
    if (item._poolID === -1) {
      return;
    }

    pool.data[pool.length - 1]._poolID = item._poolID;
    pool.fastRemove(item._poolID);
    item._poolID = -1;
  }
  /**
   * reset the model viewIDs
   */
  ;

  _proto.reset = function reset() {
    for (var i = 0; i < this._models.length; ++i) {
      var model = this._models.data[i];
      model._viewID = -1;
    }
  }
  /**
   * Set the debug camera
   * @param {Camera} cam the debug camera
   */
  ;

  _proto.setDebugCamera = function setDebugCamera(cam) {
    this._debugCamera = cam;
  }
  /**
   * Get the count of registered cameras
   * @returns {number} camera count
   */
  ;

  _proto.getCameraCount = function getCameraCount() {
    return this._cameras.length;
  }
  /**
   * Get the specified camera
   * @param {number} idx camera index
   * @returns {Camera} the specified camera
   */
  ;

  _proto.getCamera = function getCamera(idx) {
    return this._cameras.data[idx];
  }
  /**
   * register a camera
   * @param {Camera} camera the new camera
   */
  ;

  _proto.addCamera = function addCamera(camera) {
    this._add(this._cameras, camera);
  }
  /**
   * remove a camera
   * @param {Camera} camera the camera to be removed
   */
  ;

  _proto.removeCamera = function removeCamera(camera) {
    this._remove(this._cameras, camera);
  }
  /**
   * Get the count of registered model
   * @returns {number} model count
   */
  ;

  _proto.getModelCount = function getModelCount() {
    return this._models.length;
  }
  /**
   * Get the specified model
   * @param {number} idx model index
   * @returns {Model} the specified model
   */
  ;

  _proto.getModel = function getModel(idx) {
    return this._models.data[idx];
  }
  /**
   * register a model
   * @param {Model} model the new model
   */
  ;

  _proto.addModel = function addModel(model) {
    this._add(this._models, model);
  }
  /**
   * remove a model
   * @param {Model} model the model to be removed
   */
  ;

  _proto.removeModel = function removeModel(model) {
    this._remove(this._models, model);
  }
  /**
   * Get the count of registered light
   * @returns {number} light count
   */
  ;

  _proto.getLightCount = function getLightCount() {
    return this._lights.length;
  }
  /**
   * Get the specified light
   * @param {number} idx light index
   * @returns {Light} the specified light
   */
  ;

  _proto.getLight = function getLight(idx) {
    return this._lights.data[idx];
  }
  /**
   * register a light
   * @param {Light} light the new light
   */
  ;

  _proto.addLight = function addLight(light) {
    this._add(this._lights, light);
  }
  /**
   * remove a light
   * @param {Light} light the light to be removed
   */
  ;

  _proto.removeLight = function removeLight(light) {
    this._remove(this._lights, light);
  }
  /**
   * register a view
   * @param {View} view the new view
   */
  ;

  _proto.addView = function addView(view) {
    if (this._views.indexOf(view) === -1) {
      this._views.push(view);
    }
  }
  /**
   * remove a view
   * @param {View} view the view to be removed
   */
  ;

  _proto.removeView = function removeView(view) {
    var idx = this._views.indexOf(view);

    if (idx !== -1) {
      this._views.splice(idx, 1);
    }
  };

  return Scene;
}();

var _default = Scene;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9zY2VuZS9zY2VuZS5qcyJdLCJuYW1lcyI6WyJTY2VuZSIsImFwcCIsIl9saWdodHMiLCJGaXhlZEFycmF5IiwiX21vZGVscyIsIl9jYW1lcmFzIiwiX2RlYnVnQ2FtZXJhIiwiX2FwcCIsIl92aWV3cyIsIl9hZGQiLCJwb29sIiwiaXRlbSIsIl9wb29sSUQiLCJwdXNoIiwibGVuZ3RoIiwiX3JlbW92ZSIsImRhdGEiLCJmYXN0UmVtb3ZlIiwicmVzZXQiLCJpIiwibW9kZWwiLCJfdmlld0lEIiwic2V0RGVidWdDYW1lcmEiLCJjYW0iLCJnZXRDYW1lcmFDb3VudCIsImdldENhbWVyYSIsImlkeCIsImFkZENhbWVyYSIsImNhbWVyYSIsInJlbW92ZUNhbWVyYSIsImdldE1vZGVsQ291bnQiLCJnZXRNb2RlbCIsImFkZE1vZGVsIiwicmVtb3ZlTW9kZWwiLCJnZXRMaWdodENvdW50IiwiZ2V0TGlnaHQiLCJhZGRMaWdodCIsImxpZ2h0IiwicmVtb3ZlTGlnaHQiLCJhZGRWaWV3IiwidmlldyIsImluZGV4T2YiLCJyZW1vdmVWaWV3Iiwic3BsaWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBRkE7O0FBSUE7OztJQUdNQTtBQUNKOzs7QUFHQSxpQkFBWUMsR0FBWixFQUFpQjtBQUNmLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxpQkFBSixDQUFlLEVBQWYsQ0FBZjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFJRCxpQkFBSixDQUFlLEVBQWYsQ0FBZjtBQUNBLFNBQUtFLFFBQUwsR0FBZ0IsSUFBSUYsaUJBQUosQ0FBZSxFQUFmLENBQWhCO0FBQ0EsU0FBS0csWUFBTCxHQUFvQixJQUFwQjtBQUNBLFNBQUtDLElBQUwsR0FBWU4sR0FBWixDQUxlLENBT2Y7O0FBQ0EsU0FBS08sTUFBTCxHQUFjLEVBQWQ7QUFDRDs7OztTQUVEQyxPQUFBLGNBQUtDLElBQUwsRUFBV0MsSUFBWCxFQUFpQjtB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LE9BQWxCLEVBQTJCbUMsS0FBM0I7QUFDRDtBQUVEOzs7Ozs7U0FJQUUsVUFBQSxpQkFBUUMsSUFBUixFQUFjO0FBQ1osUUFBSSxLQUFLaEMsTUFBTCxDQUFZaUMsT0FBWixDQUFvQkQsSUFBcEIsTUFBOEIsQ0FBQyxDQUFuQyxFQUFzQztBQUNwQyxXQUFLaEMsTUFBTCxDQUFZSyxJQUFaLENBQWlCMkIsSUFBakI7QUFDRDtBQUNGO0FBRUQ7Ozs7OztTQUlBRSxhQUFBLG9CQUFXRixJQUFYLEVBQWlCO0FBQ2YsUUFBSWQsR0FBRyxHQUFHLEtBQUtsQixNQUFMLENBQVlpQyxPQUFaLENBQW9CRCxJQUFwQixDQUFWOztBQUNBLFFBQUlkLEdBQUcsS0FBSyxDQUFDLENBQWIsRUFBZ0I7QUFDZCxXQUFLbEIsTUFBTCxDQUFZbUMsTUFBWixDQUFtQmpCLEdBQW5CLEVBQXdCLENBQXhCO0FBQ0Q7QUFDRjs7Ozs7ZUFHWTFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbmltcG9ydCB7IEZpeGVkQXJyYXkgfSBmcm9tICcuLi9tZW1vcCc7XG5cbi8qKlxuICogQSByZXByZXNlbnRhdGlvbiBvZiB0aGUgc2NlbmVcbiAqL1xuY2xhc3MgU2NlbmUge1xuICAvKipcbiAgICogU2V0dXAgYSBkZWZhdWx0IGVtcHR5IHNjZW5lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhcHApIHtcbiAgICB0aGlzLl9saWdodHMgPSBuZXcgRml4ZWRBcnJheSgxNik7XG4gICAgdGhpcy5fbW9kZWxzID0gbmV3IEZpeGVkQXJyYXkoMTYpO1xuICAgIHRoaXMuX2NhbWVyYXMgPSBuZXcgRml4ZWRBcnJheSgxNik7XG4gICAgdGhpcy5fZGVidWdDYW1lcmEgPSBudWxsO1xuICAgIHRoaXMuX2FwcCA9IGFwcDtcblxuICAgIC8vIE5PVEU6IHdlIGRvbid0IHVzZSBwb29sIGZvciB2aWV3cyAoYmVjYXVzZSBpdCdzIGxlc3MgY2hhbmdlZCBhbmQgaXQgZG9lc24ndCBoYXZlIHBvb2xJRClcbiAgICB0aGlzLl92aWV3cyA9IFtdO1xuICB9XG5cbiAgX2FkZChwb29sLCBpdGVtKSB7XG4gICAgaWYgKGl0ZW0uX3Bvb2xJRCAhPT0gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwb29sLnB1c2goaXRlbSk7XG4gICAgaXRlbS5fcG9vbElEID0gcG9vbC5sZW5ndGggLSAxO1xuICB9XG5cbiAgX3JlbW92ZShwb29sLCBpdGVtKSB7XG4gICAgaWYgKGl0ZW0uX3Bvb2xJRCA9PT0gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwb29sLmRhdGFbcG9vbC5sZW5ndGgtMV0uX3Bvb2xJRCA9IGl0ZW0uX3Bvb2xJRDtcbiAgICBwb29sLmZhc3RSZW1vdmUoaXRlbS5fcG9vbElEKTtcbiAgICBpdGVtLl9wb29sSUQgPSAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXNldCB0aGUgbW9kZWwgdmlld0lEc1xuICAgKi9cbiAgcmVzZXQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9tb2RlbHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxldCBtb2RlbCA9IHRoaXMuX21vZGVscy5kYXRhW2ldO1xuICAgICAgbW9kZWwuX3ZpZXdJRCA9IC0xO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGRlYnVnIGNhbWVyYVxuICAgKiBAcGFyYW0ge0NhbWVyYX0gY2FtIHRoZSBkZWJ1ZyBjYW1lcmFcbiAgICovXG4gIHNldERlYnVnQ2FtZXJhKGNhbSkge1xuICAgIHRoaXMuX2RlYnVnQ2FtZXJhID0gY2FtO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY291bnQgb2YgcmVnaXN0ZXJlZCBjYW1lcmFzXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGNhbWVyYSBjb3VudFxuICAgKi9cbiAgZ2V0Q2FtZXJhQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbWVyYXMubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc3BlY2lmaWVkIGNhbWVyYVxuICAgKiBAcGFyYW0ge251bWJlcn0gaWR4IGNhbWVyYSBpbmRleFxuICAgKiBAcmV0dXJucyB7Q2FtZXJhfSB0aGUgc3BlY2lmaWVkIGNhbWVyYVxuICAgKi9cbiAgZ2V0Q2FtZXJhKGlkeCkge1xuICAgIHJldHVybiB0aGlzLl9jYW1lcmFzLmRhdGFbaWR4XTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZWdpc3RlciBhIGNhbWVyYVxuICAgKiBAcGFyYW0ge0NhbWVyYX0gY2FtZXJhIHRoZSBuZXcgY2FtZXJhXG4gICAqL1xuICBhZGRDYW1lcmEoY2FtZXJhKSB7XG4gICAgdGhpcy5fYWRkKHRoaXMuX2NhbWVyYXMsIGNhbWVyYSk7XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIGEgY2FtZXJhXG4gICAqIEBwYXJhbSB7Q2FtZXJhfSBjYW1lcmEgdGhlIGNhbWVyYSB0byBiZSByZW1vdmVkXG4gICAqL1xuICByZW1vdmVDYW1lcmEoY2FtZXJhKSB7XG4gICAgdGhpcy5fcmVtb3ZlKHRoaXMuX2NhbWVyYXMsIGNhbWVyYSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb3VudCBvZiByZWdpc3RlcmVkIG1vZGVsXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IG1vZGVsIGNvdW50XG4gICAqL1xuICBnZXRNb2RlbENvdW50KCkge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbHMubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc3BlY2lmaWVkIG1vZGVsXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZHggbW9kZWwgaW5kZXhcbiAgICogQHJldHVybnMge01vZGVsfSB0aGUgc3BlY2lmaWVkIG1vZGVsXG4gICAqL1xuICBnZXRNb2RlbChpZHgpIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWxzLmRhdGFbaWR4XTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZWdpc3RlciBhIG1vZGVsXG4gICAqIEBwYXJhbSB7TW9kZWx9IG1vZGVsIHRoZSBuZXcgbW9kZWxcbiAgICovXG4gIGFkZE1vZGVsKG1vZGVsKSB7XG4gICAgdGhpcy5fYWRkKHRoaXMuX21vZGVscywgbW9kZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBhIG1vZGVsXG4gICAqIEBwYXJhbSB7TW9kZWx9IG1vZGVsIHRoZSBtb2RlbCB0byBiZSByZW1vdmVkXG4gICAqL1xuICByZW1vdmVNb2RlbChtb2RlbCkge1xuICAgIHRoaXMuX3JlbW92ZSh0aGlzLl9tb2RlbHMsIG1vZGVsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvdW50IG9mIHJlZ2lzdGVyZWQgbGlnaHRcbiAgICogQHJldHVybnMge251bWJlcn0gbGlnaHQgY291bnRcbiAgICovXG4gIGdldExpZ2h0Q291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpZ2h0cy5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzcGVjaWZpZWQgbGlnaHRcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlkeCBsaWdodCBpbmRleFxuICAgKiBAcmV0dXJucyB7TGlnaHR9IHRoZSBzcGVjaWZpZWQgbGlnaHRcbiAgICovXG4gIGdldExpZ2h0KGlkeCkge1xuICAgIHJldHVybiB0aGlzLl9saWdodHMuZGF0YVtpZHhdO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlZ2lzdGVyIGEgbGlnaHRcbiAgICogQHBhcmFtIHtMaWdodH0gbGlnaHQgdGhlIG5ldyBsaWdodFxuICAgKi9cbiAgYWRkTGlnaHQobGlnaHQpIHtcbiAgICB0aGlzLl9hZGQodGhpcy5fbGlnaHRzLCBsaWdodCk7XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIGEgbGlnaHRcbiAgICogQHBhcmFtIHtMaWdodH0gbGlnaHQgdGhlIGxpZ2h0IHRvIGJlIHJlbW92ZWRcbiAgICovXG4gIHJlbW92ZUxpZ2h0KGxpZ2h0KSB7XG4gICAgdGhpcy5fcmVtb3ZlKHRoaXMuX2xpZ2h0cywgbGlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlZ2lzdGVyIGEgdmlld1xuICAgKiBAcGFyYW0ge1ZpZXd9IHZpZXcgdGhlIG5ldyB2aWV3XG4gICAqL1xuICBhZGRWaWV3KHZpZXcpIHtcbiAgICBpZiAodGhpcy5fdmlld3MuaW5kZXhPZih2aWV3KSA9PT0gLTEpIHtcbiAgICAgIHRoaXMuX3ZpZXdzLnB1c2godmlldyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSBhIHZpZXdcbiAgICogQHBhcmFtIHtWaWV3fSB2aWV3IHRoZSB2aWV3IHRvIGJlIHJlbW92ZWRcbiAgICovXG4gIHJlbW92ZVZpZXcodmlldykge1xuICAgIGxldCBpZHggPSB0aGlzLl92aWV3cy5pbmRleE9mKHZpZXcpO1xuICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICB0aGlzLl92aWV3cy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2NlbmU7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==