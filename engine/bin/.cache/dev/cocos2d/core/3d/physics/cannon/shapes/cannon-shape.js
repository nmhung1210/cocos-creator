
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cannon/shapes/cannon-shape.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.CannonShape = void 0;

var _cannon = _interopRequireDefault(require("../../../../../../external/cannon/cannon"));

var _util = require("../../framework/util");

var _cannonUtil = require("../cannon-util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TriggerEventObject = {
  type: 'trigger-enter',
  selfCollider: null,
  otherCollider: null
};
var Vec3 = cc.Vec3;
var v3_0 = new Vec3();

var CannonShape = /*#__PURE__*/function () {
  function CannonShape() {
    this._collider = void 0;
    this._shape = void 0;
    this._offset = new _cannon["default"].Vec3();
    this._orient = new _cannon["default"].Quaternion();
    this._index = -1;
    this._sharedBody = void 0;
    this.onTriggerListener = this.onTrigger.bind(this);
  }

  var _proto = CannonShape.prototype;

  /** LIFECYCLE */
  _proto.__preload = function __preload(comp) {
    this._collider = comp;
    (0, _util.setWrap)(this._shape, this);

    this._shape.addEventListener('triggered', this.onTriggerListener);

    this._sharedBody = cc.director.getPhysics3DManager().physicsWorld.getSharedBody(this._collider.node);
    this._sharedBody.reference = true;
  };

  _proto.onLoad = function onLoad() {
    this.center = this._collider.center;
    this.isTrigger = this._collider.isTrigger;
  };

  _proto.onEnable = function onEnable() {
    this._sharedBody.addShape(this);

    this._sharedBody.enabled = true;
  };

  _proto.onDisable = function onDisable() {
    this._sharedBody.removeShape(this);

    this._sharedBody.enabled = false;
  };

  _proto.onDestroy = function onDestroy() {
    this._sharedBody.reference = false;
    this._sharedBody = null;
    (0, _util.setWrap)(this._shape, null);
    this._offset = null;
    this._orient = null;
    this._shape = null;
    this._collider = null;
    this.onTriggerListener = null;
  }
  /**
   * change scale will recalculate center & size \
   * size handle by child class
   * @param scale 
   */
  ;

  _proto.setScale = function setScale(scale) {
    this.center = this._collider.center;
  };

  _proto.setIndex = function setIndex(index) {
    this._index = index;
  };

  _proto.setOffsetAndOrient = function setOffsetAndOrient(offset, Orient) {
    this._offset = offset;
    this._orient = Orient;
  };

  _proto.onTrigger = function onTrigger(event) {
    TriggerEventObject.type = event.event;
    var self = (0, _util.getWrap)(event.selfShape);
    var other = (0, _util.getWrap)(event.otherShape);

    if (self) {
      TriggerEventObject.selfCollider = self.collider;
      TriggerEventObject.otherCollider = other ? other.collider : null;

      this._collider.emit(TriggerEventObject.type, TriggerEventObject);
    }
  };

  _createClass(CannonShape, [{
    key: "shape",
    get: function get() {
      return this._shape;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
  }, {
    key: "attachedRigidBody",
    get: function get() {
      if (this._sharedBody.wrappedBody) {
        return this._sharedBody.wrappedBody.rigidBody;
      }

      return null;
    }
  }, {
    key: "sharedBody",
    get: function get() {
      return this._sharedBody;
    }
  }, {
    key: "material",
    set: function set(mat) {
      if (mat == null) {
        this._shape.material = null;
      } else {
        if (CannonShape.idToMaterial[mat._uuid] == null) {
          CannonShape.idToMaterial[mat._uuid] = new _cannon["default"].Material(mat._uuid);
        }

        this._shape.material = CannonShape.idToMaterial[mat._uuid];
        this._shape.material.friction = mat.friction;
        this._shape.material.restitution = mat.restitution;
      }
    }
  }, {
    key: "isTrigger",
    set: function set(v) {
      this._shape.collisionResponse = !v;

      if (this._index >= 0) {
        this._body.updateHasTrigger();
      }
    }
  }, {
    key: "center",
    set: function set(v) {
      var lpos = this._offset;
      Vec3.copy(lpos, v);

      this._collider.node.getWorldScale(v3_0);

      Vec3.multiply(lpos, lpos, v3_0);

      if (this._index >= 0) {
        (0, _cannonUtil.commitShapeUpdates)(this._body);
      }
    }
  }, {
    key: "_body",
    get: function get() {
      return this._sharedBody.body;
    }
  }]);

  return CannonShape;
}();

exports.CannonShape = CannonShape;
CannonShape.idToMaterial = {};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvY2Fubm9uL3NoYXBlcy9jYW5ub24tc2hhcGUudHMiXSwibmFtZXMiOlsiVHJpZ2dlckV2ZW50T2JqZWN0IiwidHlwZSIsInNlbGZDb2xsaWRlciIsIm90aGVyQ29sbGlkZXIiLCJWZWMzIiwiY2MiLCJ2M18wIiwiQ2Fubm9uU2hhcGUiLCJfY29sbGlkZXIiLCJfc2hhcGUiLCJfb2Zmc2V0IiwiQ0FOTk9OIiwiX29yaWVudCIsIlF1YXRlcm5pb24iLCJfaW5kZXgiLCJfc2hhcmVkQm9keSIsIm9uVHJpZ2dlckxpc3RlbmVyIiwib25UcmlnZ2VyIiwiYmluZCIsIl9fcHJlbG9hZCIsImNvbXAiLCJhZGRFdmVudExpc3RlbmVyIiwiZGlyZWN0b3IiLCJnZXRQaHlzaWNzM0RNYW5hZ2VyIiwicGh5c2ljc1dvcmxkIiwiZ2V0U2hhcmVkQm9keSIsIm5vZGUiLCJyZWZlcmVuY2UiLCJvbkxvYWQiLCJjZW50ZXIiLCJpc1RyaWdnZXIiLCJvbkVuYWJsZSIsImFkZFNoYXBlIiwiZW5hYmxlZCIsIm9uRGlzYWJsZSIsInJlbW92ZVNoYXBlIiwib25EZXN0cm95Iiwic2V0U2NhbGUiLCJzY2FsZSIsInNldEluZGV4IiwiaW5kZXgiLCJzZXRPZmZzZXRBbmRPcmllbnQiLCJvZmZzZXQiLCJPcmllbnQiLCJldmVudCIsInNlbGYiLCJzZWxmU2hhcGUiLCJvdGhlciIsIm90aGVyU2hhcGUiLCJjb2xsaWRlciIsImVtaXQiLCJ3cmFwcGVkQm9keSIsInJpZ2lkQm9keSIsIm1hdCIsIm1hdGVyaWFsIiwiaWRUb01hdGVyaWFsIiwiX3V1aWQiLCJNYXRlcmlhbCIsImZyaWN0aW9uIiwicmVzdGl0dXRpb24iLCJ2IiwiY29sbGlzaW9uUmVzcG9uc2UiLCJfYm9keSIsInVwZGF0ZUhhc1RyaWdnZXIiLCJscG9zIiwiY29weSIsImdldFdvcmxkU2NhbGUiLCJtdWx0aXBseSIsImJvZHkiXSwibWFwcGluZ3MiOiI7Ozs7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LE1BQUwsQ0FBYTZDLFFBQWIsQ0FBc0JLLFdBQXRCLEdBQW9DTixHQUFHLENBQUNNLFdBQXhDO0FBQ0g7QUFDSjs7O3NCQUVjQyxHQUFZO0FBQ3ZCLFdBQUtuRCxNQUFMLENBQVlvRCxpQkFBWixHQUFnQyxDQUFDRCxDQUFqQzs7QUFDQSxVQUFJLEtBQUs5QyxNQUFMLElBQWUsQ0FBbkIsRUFBc0I7QUFDbEIsYUFBS2dELEtBQUwsQ0FBV0MsZ0JBQVg7QUFDSDtBQUNKOzs7c0JBRVdILEdBQWM7QUFDdEIsVUFBTUksSUFBSSxHQUFHLEtBQUt0RCxPQUFsQjtBQUNBTixNQUFBQSxJQUFJLENBQUM2RCxJQUFMLENBQVVELElBQVYsRUFBZ0JKLENBQWhCOztBQUNBLFdBQUtwRCxTQUFMLENBQWVrQixJQUFmLENBQW9Cd0MsYUFBcEIsQ0FBa0M1RCxJQUFsQzs7QUFDQUYsTUFBQUEsSUFBSSxDQUFDK0QsUUFBTCxDQUFjSCxJQUFkLEVBQW9CQSxJQUFwQixFQUEwQjFELElBQTFCOztBQUNBLFVBQUksS0FBS1EsTUFBTCxJQUFlLENBQW5CLEVBQXNCO0FBQ2xCLDRDQUFtQixLQUFLZ0QsS0FBeEI7QUFDSDtBQUNKOzs7d0JBU21DO0FBQUUsYUFBTyxLQUFLL0MsV0FBTCxDQUFpQnFELElBQXhCO0FBQStCOzs7Ozs7O0FBckQ1RDdELFlBRU9nRCxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBDQU5OT04gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvY2Fubm9uL2Nhbm5vbic7XG5pbXBvcnQgeyBnZXRXcmFwLCBzZXRXcmFwIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL3V0aWwnO1xuaW1wb3J0IHsgY29tbWl0U2hhcGVVcGRhdGVzIH0gZnJvbSAnLi4vY2Fubm9uLXV0aWwnO1xuaW1wb3J0IHsgUGh5c2ljc01hdGVyaWFsIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrL2Fzc2V0cy9waHlzaWNzLW1hdGVyaWFsJztcbmltcG9ydCB7IElCYXNlU2hhcGUgfSBmcm9tICcuLi8uLi9zcGVjL2ktcGh5c2ljcy1zaGFwZSc7XG5pbXBvcnQgeyBJVmVjM0xpa2UgfSBmcm9tICcuLi8uLi9zcGVjL2ktY29tbW9uJztcbmltcG9ydCB7IENhbm5vblNoYXJlZEJvZHkgfSBmcm9tICcuLi9jYW5ub24tc2hhcmVkLWJvZHknO1xuaW1wb3J0IHsgQ2Fubm9uV29ybGQgfSBmcm9tICcuLi9jYW5ub24td29ybGQnO1xuaW1wb3J0IHsgVHJpZ2dlckV2ZW50VHlwZSB9IGZyb20gJy4uLy4uL2ZyYW1ld29yay9waHlzaWNzLWludGVyZmFjZSc7XG5pbXBvcnQgeyBDb2xsaWRlcjNEIH0gZnJvbSAnLi4vLi4vZnJhbWV3b3JrJztcblxuY29uc3QgVHJpZ2dlckV2ZW50T2JqZWN0ID0ge1xuICAgIHR5cGU6ICd0cmlnZ2VyLWVudGVyJyBhcyBUcmlnZ2VyRXZlbnRUeXBlLFxuICAgIHNlbGZDb2xsaWRlcjogbnVsbCBhcyBDb2xsaWRlcjNEIHwgbnVsbCxcbiAgICBvdGhlckNvbGxpZGVyOiBudWxsIGFzIENvbGxpZGVyM0QgfCBudWxsLFxufTtcblxuY29uc3QgVmVjMyA9IGNjLlZlYzM7XG5jb25zdCB2M18wID0gbmV3IFZlYzMoKTtcblxuZXhwb3J0IGNsYXNzIENhbm5vblNoYXBlIGltcGxlbWVudHMgSUJhc2VTaGFwZSB7XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgaWRUb01hdGVyaWFsID0ge307XG5cbiAgICBnZXQgc2hhcGUgKCkgeyByZXR1cm4gdGhpcy5fc2hhcGUhOyB9XG5cbiAgICBnZXQgY29sbGlkZXIgKCkgeyByZXR1cm4gdGhpcy5fY29sbGlkZXI7IH1cblxuICAgIGdldCBhdHRhY2hlZFJpZ2lkQm9keSAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zaGFyZWRCb2R5LndyYXBwZWRCb2R5KSB7IHJldHVybiB0aGlzLl9zaGFyZWRCb2R5LndyYXBwZWRCb2R5LnJpZ2lkQm9keTsgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgc2hhcmVkQm9keSAoKTogQ2Fubm9uU2hhcmVkQm9keSB7IHJldHVybiB0aGlzLl9zaGFyZWRCb2R5OyB9XG5cbiAgICBzZXQgbWF0ZXJpYWwgKG1hdDogUGh5c2ljc01hdGVyaWFsKSB7XG4gICAgICAgIGlmIChtYXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgKHRoaXMuX3NoYXBlIS5tYXRlcmlhbCBhcyB1bmtub3duKSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoQ2Fubm9uU2hhcGUuaWRUb01hdGVyaWFsW21hdC5fdXVpZF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIENhbm5vblNoYXBlLmlkVG9NYXRlcmlhbFttYXQuX3V1aWRdID0gbmV3IENBTk5PTi5NYXRlcmlhbChtYXQuX3V1aWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9zaGFwZSEubWF0ZXJpYWwgPSBDYW5ub25TaGFwZS5pZFRvTWF0ZXJpYWxbbWF0Ll91dWlkXTtcbiAgICAgICAgICAgIHRoaXMuX3NoYXBlIS5tYXRlcmlhbC5mcmljdGlvbiA9IG1hdC5mcmljdGlvbjtcbiAgICAgICAgICAgIHRoaXMuX3NoYXBlIS5tYXRlcmlhbC5yZXN0aXR1dGlvbiA9IG1hdC5yZXN0aXR1dGlvbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldCBpc1RyaWdnZXIgKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2hhcGUuY29sbGlzaW9uUmVzcG9uc2UgPSAhdjtcbiAgICAgICAgaWYgKHRoaXMuX2luZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2JvZHkudXBkYXRlSGFzVHJpZ2dlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0IGNlbnRlciAodjogSVZlYzNMaWtlKSB7XG4gICAgICAgIGNvbnN0IGxwb3MgPSB0aGlzLl9vZmZzZXQgYXMgSVZlYzNMaWtlO1xuICAgICAgICBWZWMzLmNvcHkobHBvcywgdik7XG4gICAgICAgIHRoaXMuX2NvbGxpZGVyLm5vZGUuZ2V0V29ybGRTY2FsZSh2M18wKTtcbiAgICAgICAgVmVjMy5tdWx0aXBseShscG9zLCBscG9zLCB2M18wKTtcbiAgICAgICAgaWYgKHRoaXMuX2luZGV4ID49IDApIHtcbiAgICAgICAgICAgIGNvbW1pdFNoYXBlVXBkYXRlcyh0aGlzLl9ib2R5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jb2xsaWRlciE6IENvbGxpZGVyM0Q7XG5cbiAgICBwcm90ZWN0ZWQgX3NoYXBlITogQ0FOTk9OLlNoYXBlO1xuICAgIHByb3RlY3RlZCBfb2Zmc2V0ID0gbmV3IENBTk5PTi5WZWMzKCk7XG4gICAgcHJvdGVjdGVkIF9vcmllbnQgPSBuZXcgQ0FOTk9OLlF1YXRlcm5pb24oKTtcbiAgICBwcm90ZWN0ZWQgX2luZGV4OiBudW1iZXIgPSAtMTtcbiAgICBwcm90ZWN0ZWQgX3NoYXJlZEJvZHkhOiBDYW5ub25TaGFyZWRCb2R5O1xuICAgIHByb3RlY3RlZCBnZXQgX2JvZHkgKCk6IENBTk5PTi5Cb2R5IHsgcmV0dXJuIHRoaXMuX3NoYXJlZEJvZHkuYm9keTsgfVxuICAgIHByb3RlY3RlZCBvblRyaWdnZXJMaXN0ZW5lciA9IHRoaXMub25UcmlnZ2VyLmJpbmQodGhpcyk7XG5cbiAgICAvKiogTElGRUNZQ0xFICovXG5cbiAgICBfX3ByZWxvYWQgKGNvbXA6IENvbGxpZGVyM0QpIHtcbiAgICAgICAgdGhpcy5fY29sbGlkZXIgPSBjb21wO1xuICAgICAgICBzZXRXcmFwKHRoaXMuX3NoYXBlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fc2hhcGUuYWRkRXZlbnRMaXN0ZW5lcigndHJpZ2dlcmVkJywgdGhpcy5vblRyaWdnZXJMaXN0ZW5lcik7XG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkgPSAoY2MuZGlyZWN0b3IuZ2V0UGh5c2ljczNETWFuYWdlcigpLnBoeXNpY3NXb3JsZCBhcyBDYW5ub25Xb3JsZCkuZ2V0U2hhcmVkQm9keSh0aGlzLl9jb2xsaWRlci5ub2RlKTtcbiAgICAgICAgdGhpcy5fc2hhcmVkQm9keS5yZWZlcmVuY2UgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMuY2VudGVyID0gdGhpcy5fY29sbGlkZXIuY2VudGVyO1xuICAgICAgICB0aGlzLmlzVHJpZ2dlciA9IHRoaXMuX2NvbGxpZGVyLmlzVHJpZ2dlcjtcbiAgICB9XG5cbiAgICBvbkVuYWJsZSAoKSB7XG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkuYWRkU2hhcGUodGhpcyk7XG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkuZW5hYmxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25EaXNhYmxlICgpIHtcbiAgICAgICAgdGhpcy5fc2hhcmVkQm9keS5yZW1vdmVTaGFwZSh0aGlzKTtcbiAgICAgICAgdGhpcy5fc2hhcmVkQm9keS5lbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25EZXN0cm95ICgpIHtcbiAgICAgICAgdGhpcy5fc2hhcmVkQm9keS5yZWZlcmVuY2UgPSBmYWxzZTtcbiAgICAgICAgKHRoaXMuX3NoYXJlZEJvZHkgYXMgYW55KSA9IG51bGw7XG4gICAgICAgIHNldFdyYXAodGhpcy5fc2hhcGUsIG51bGwpO1xuICAgICAgICAodGhpcy5fb2Zmc2V0IGFzIGFueSkgPSBudWxsO1xuICAgICAgICAodGhpcy5fb3JpZW50IGFzIGFueSkgPSBudWxsO1xuICAgICAgICAodGhpcy5fc2hhcGUgYXMgYW55KSA9IG51bGw7XG4gICAgICAgICh0aGlzLl9jb2xsaWRlciBhcyBhbnkpID0gbnVsbDtcbiAgICAgICAgKHRoaXMub25UcmlnZ2VyTGlzdGVuZXIgYXMgYW55KSA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hhbmdlIHNjYWxlIHdpbGwgcmVjYWxjdWxhdGUgY2VudGVyICYgc2l6ZSBcXFxuICAgICAqIHNpemUgaGFuZGxlIGJ5IGNoaWxkIGNsYXNzXG4gICAgICogQHBhcmFtIHNjYWxlIFxuICAgICAqL1xuICAgIHNldFNjYWxlIChzY2FsZTogSVZlYzNMaWtlKSB7XG4gICAgICAgIHRoaXMuY2VudGVyID0gdGhpcy5fY29sbGlkZXIuY2VudGVyO1xuICAgIH1cblxuICAgIHNldEluZGV4IChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gaW5kZXg7XG4gICAgfVxuXG4gICAgc2V0T2Zmc2V0QW5kT3JpZW50IChvZmZzZXQ6IENBTk5PTi5WZWMzLCBPcmllbnQ6IENBTk5PTi5RdWF0ZXJuaW9uKSB7XG4gICAgICAgIHRoaXMuX29mZnNldCA9IG9mZnNldDtcbiAgICAgICAgdGhpcy5fb3JpZW50ID0gT3JpZW50O1xuICAgIH1cblxuICAgIHByaXZhdGUgb25UcmlnZ2VyIChldmVudDogQ0FOTk9OLklUcmlnZ2VyZWRFdmVudCkge1xuICAgICAgICBUcmlnZ2VyRXZlbnRPYmplY3QudHlwZSA9IGV2ZW50LmV2ZW50O1xuICAgICAgICBjb25zdCBzZWxmID0gZ2V0V3JhcDxDYW5ub25TaGFwZT4oZXZlbnQuc2VsZlNoYXBlKTtcbiAgICAgICAgY29uc3Qgb3RoZXIgPSBnZXRXcmFwPENhbm5vblNoYXBlPihldmVudC5vdGhlclNoYXBlKTtcblxuICAgICAgICBpZiAoc2VsZikge1xuICAgICAgICAgICAgVHJpZ2dlckV2ZW50T2JqZWN0LnNlbGZDb2xsaWRlciA9IHNlbGYuY29sbGlkZXI7XG4gICAgICAgICAgICBUcmlnZ2VyRXZlbnRPYmplY3Qub3RoZXJDb2xsaWRlciA9IG90aGVyID8gb3RoZXIuY29sbGlkZXIgOiBudWxsO1xuICAgICAgICAgICAgdGhpcy5fY29sbGlkZXIuZW1pdChUcmlnZ2VyRXZlbnRPYmplY3QudHlwZSwgVHJpZ2dlckV2ZW50T2JqZWN0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9