
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cannon/cannon-rigid-body.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.CannonRigidBody = void 0;

var _cannon = _interopRequireDefault(require("../../../../../external/cannon/cannon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var v3_cannon0 = new _cannon["default"].Vec3();
var v3_cannon1 = new _cannon["default"].Vec3();
var Vec3 = cc.Vec3;
/**
 * wraped shared body
 * dynamic
 * kinematic
 */

var CannonRigidBody = /*#__PURE__*/function () {
  function CannonRigidBody() {
    this._rigidBody = void 0;
    this._sharedBody = void 0;
    this._isEnabled = false;
  }

  var _proto = CannonRigidBody.prototype;

  /** LIFECYCLE */
  _proto.__preload = function __preload(com) {
    this._rigidBody = com;
    this._sharedBody = cc.director.getPhysics3DManager().physicsWorld.getSharedBody(this._rigidBody.node);
    this._sharedBody.reference = true;
    this._sharedBody.wrappedBody = this;
  };

  _proto.onLoad = function onLoad() {};

  _proto.onEnable = function onEnable() {
    this._isEnabled = true;
    this.mass = this._rigidBody.mass;
    this.allowSleep = this._rigidBody.allowSleep;
    this.linearDamping = this._rigidBody.linearDamping;
    this.angularDamping = this._rigidBody.angularDamping;
    this.useGravity = this._rigidBody.useGravity;
    this.isKinematic = this._rigidBody.isKinematic;
    this.fixedRotation = this._rigidBody.fixedRotation;
    this.linearFactor = this._rigidBody.linearFactor;
    this.angularFactor = this._rigidBody.angularFactor;
    this._sharedBody.enabled = true;
  };

  _proto.onDisable = function onDisable() {
    this._isEnabled = false;
    this._sharedBody.enabled = false;
  };

  _proto.onDestroy = function onDestroy() {
    this._sharedBody.reference = false;
    this._rigidBody = null;
    this._sharedBody = null;
  }
  /** INTERFACE */
  ;

  _proto.wakeUp = function wakeUp() {
    return this._sharedBody.body.wakeUp();
  };

  _proto.sleep = function sleep() {
    return this._sharedBody.body.sleep();
  };

  _proto.getLinearVelocity = function getLinearVelocity(out) {
    Vec3.copy(out, this._sharedBody.body.velocity);
    return out;
  };

  _proto.setLinearVelocity = function setLinearVelocity(value) {
    var body = this._sharedBody.body;

    if (body.isSleeping()) {
      body.wakeUp();
    }

    Vec3.copy(body.velocity, value);
  };

  _proto.getAngularVelocity = function getAngularVelocity(out) {
    Vec3.copy(out, this._sharedBody.body.angularVelocity);
    return out;
  };

  _proto.setAngularVelocity = function setAngularVelocity(value) {
    var body = this._sharedBody.body;

    if (body.isSleeping()) {
      body.wakeUp();
    }

    Vec3.copy(body.angularVelocity, value);
  };

  _proto.applyForce = function applyForce(force, worldPoint) {
    if (worldPoint == null) {
      worldPoint = Vec3.ZERO;
    }

    var body = this._sharedBody.body;

    if (body.isSleeping()) {
      body.wakeUp();
    }

    body.applyForce(Vec3.copy(v3_cannon0, force), Vec3.copy(v3_cannon1, worldPoint));
  };

  _proto.applyImpulse = function applyImpulse(impulse, worldPoint) {
    if (worldPoint == null) {
      worldPoint = Vec3.ZERO;
    }

    var body = this._sharedBody.body;

    if (body.isSleeping()) {
      body.wakeUp();
    }

    body.applyImpulse(Vec3.copy(v3_cannon0, impulse), Vec3.copy(v3_cannon1, worldPoint));
  };

  _proto.applyLocalForce = function applyLocalForce(force, localPoint) {
    if (localPoint == null) {
      localPoint = Vec3.ZERO;
    }

    var body = this._sharedBody.body;

    if (body.isSleeping()) {
      body.wakeUp();
    }

    body.applyLocalForce(Vec3.copy(v3_cannon0, force), Vec3.copy(v3_cannon1, localPoint));
  };

  _proto.applyLocalImpulse = function applyLocalImpulse(impulse, localPoint) {
    if (localPoint == null) {
      localPoint = Vec3.ZERO;
    }

    var body = this._sharedBody.body;

    if (body.isSleeping()) {
      body.wakeUp();
    }

    body.applyLocalImpulse(Vec3.copy(v3_cannon0, impulse), Vec3.copy(v3_cannon1, localPoint));
  };

  _proto.applyTorque = function applyTorque(torque) {
    var body = this._sharedBody.body;

    if (body.isSleeping()) {
      body.wakeUp();
    }

    body.torque.x += torque.x;
    body.torque.y += torque.y;
    body.torque.z += torque.z;
  };

  _proto.applyLocalTorque = function applyLocalTorque(torque) {
    var body = this._sharedBody.body;

    if (body.isSleeping()) {
      body.wakeUp();
    }

    Vec3.copy(v3_cannon0, torque);
    body.vectorToWorldFrame(v3_cannon0, v3_cannon0);
    body.torque.x += v3_cannon0.x;
    body.torque.y += v3_cannon0.y;
    body.torque.z += v3_cannon0.z;
  };

  _createClass(CannonRigidBody, [{
    key: "isAwake",
    get: function get() {
      return this._sharedBody.body.isAwake();
    }
  }, {
    key: "isSleepy",
    get: function get() {
      return this._sharedBody.body.isSleepy();
    }
  }, {
    key: "isSleeping",
    get: function get() {
      return this._sharedBody.body.isSleeping();
    }
  }, {
    key: "allowSleep",
    set: function set(v) {
      var body = this._sharedBody.body;

      if (body.isSleeping()) {
        body.wakeUp();
      }

      body.allowSleep = v;
    }
  }, {
    key: "mass",
    set: function set(value) {
      var body = this._sharedBody.body;
      body.mass = value;

      if (body.mass == 0) {
        body.type = _cannon["default"].Body.STATIC;
      }

      body.updateMassProperties();

      if (body.isSleeping()) {
        body.wakeUp();
      }
    }
  }, {
    key: "isKinematic",
    set: function set(value) {
      var body = this._sharedBody.body;

      if (body.mass == 0) {
        body.type = _cannon["default"].Body.STATIC;
      } else {
        if (value) {
          body.type = _cannon["default"].Body.KINEMATIC;
        } else {
          body.type = _cannon["default"].Body.DYNAMIC;
        }
      }
    }
  }, {
    key: "fixedRotation",
    set: function set(value) {
      var body = this._sharedBody.body;

      if (body.isSleeping()) {
        body.wakeUp();
      }

      body.fixedRotation = value;
      body.updateMassProperties();
    }
  }, {
    key: "linearDamping",
    set: function set(value) {
      this._sharedBody.body.linearDamping = value;
    }
  }, {
    key: "angularDamping",
    set: function set(value) {
      this._sharedBody.body.angularDamping = value;
    }
  }, {
    key: "useGravity",
    set: function set(value) {
      var body = this._sharedBody.body;

      if (body.isSleeping()) {
        body.wakeUp();
      }

      body.useGravity = value;
    }
  }, {
    key: "linearFactor",
    set: function set(value) {
      var body = this._sharedBody.body;

      if (body.isSleeping()) {
        body.wakeUp();
      }

      Vec3.copy(body.linearFactor, value);
    }
  }, {
    key: "angularFactor",
    set: function set(value) {
      var body = this._sharedBody.body;

      if (body.isSleeping()) {
        body.wakeUp();
      }

      Vec3.copy(body.angularFactor, value);
    }
  }, {
    key: "rigidBody",
    get: function get() {
      return this._rigidBody;
    }
  }, {
    key: "sharedBody",
    get: function get() {
      return this._sharedBody;
    }
  }, {
    key: "isEnabled",
    get: function get() {
      return this._isEnabled;
    }
  }]);

  return CannonRigidBody;
}();

exports.CannonRigidBody = CannonRigidBody;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvY2Fubm9uL2Nhbm5vbi1yaWdpZC1ib2R5LnRzIl0sIm5hbWVzIjpbInYzX2Nhbm5vbjAiLCJDQU5OT04iLCJWZWMzIiwidjNfY2Fubm9uMSIsImNjIiwiQ2Fubm9uUmlnaWRCb2R5IiwiX3JpZ2lkQm9keSIsIl9zaGFyZWRCb2R5IiwiX2lzRW5hYmxlZCIsIl9fcHJlbG9hZCIsImNvbSIsImRpcmVjdG9yIiwiZ2V0UGh5c2ljczNETWFuYWdlciIsInBoeXNpY3NXb3JsZCIsImdldFNoYXJlZEJvZHkiLCJub2RlIiwicmVmZXJlbmNlIiwid3JhcHBlZEJvZHkiLCJvbkxvYWQiLCJvbkVuYWJsZSIsIm1hc3MiLCJhbGxvd1NsZWVwIiwibGluZWFyRGFtcGluZyIsImFuZ3VsYXJEYW1waW5nIiwidXNlR3Jhdml0eSIsImlzS2luZW1hdGljIiwiZml4ZWRSb3RhdGlvbiIsImxpbmVhckZhY3RvciIsImFuZ3VsYXJGYWN0b3IiLCJlbmFibGVkIiwib25EaXNhYmxlIiwib25EZXN0cm95Iiwid2FrZVVwIiwiYm9keSIsInNsZWVwIiwiZ2V0TGluZWFyVmVsb2NpdHkiLCJvdXQiLCJjb3B5IiwidmVsb2NpdHkiLCJzZXRMaW5lYXJWZWxvY2l0eSIsInZhbHVlIiwiaXNTbGVlcGluZyIsImdldEFuZ3VsYXJWZWxvY2l0eSIsImFuZ3VsYXJWZWxvY2l0eSIsInNldEFuZ3VsYXJWZWxvY2l0eSIsImFwcGx5Rm9yY2UiLCJmb3JjZSIsIndvcmxkUG9pbnQiLCJaRVJPIiwiYXBwbHlJbXB1bHNlIiwiaW1wdWxzZSIsImFwcGx5TG9jYWxGb3JjZSIsImxvY2FsUG9pbnQiLCJhcHBseUxvY2FsSW1wdWxzZSIsImFwcGx5VG9ycXVlIiwidG9ycXVlIiwieCIsInkiLCJ6IiwiYXBwbHlMb2NhbFRvcnF1ZSIsInZlY3RvclRvV29ybGRGcmFtZSIsImlzQXdha2UiLCJpc1NsZWVweSIsInYiLCJ0eXBlIiwiQm9keSIs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QUE1Qjs7QUFDQSxVQUFJQSxJQUFJLENBQUNRLFVBQUwsRUFBSixFQUF1QjtBQUNuQlIsUUFBQUEsSUFBSSxDQUFDRCxNQUFMO0FBQ0g7O0FBQ0Q5QixNQUFBQSxJQUFJLENBQUNtQyxJQUFMLENBQVVKLElBQUksQ0FBQ04sWUFBZixFQUE2QmEsS0FBN0I7QUFDSDs7O3NCQUVrQkEsT0FBZ0I7QUFDL0IsVUFBSVAsSUFBSSxHQUFHLEtBQUsxQixXQUFMLENBQWlCMEIsSUFBNUI7O0FBQ0EsVUFBSUEsSUFBSSxDQUFDUSxVQUFMLEVBQUosRUFBdUI7QUFDbkJSLFFBQUFBLElBQUksQ0FBQ0QsTUFBTDtBQUNIOztBQUNEOUIsTUFBQUEsSUFBSSxDQUFDbUMsSUFBTCxDQUFVSixJQUFJLENBQUNMLGFBQWYsRUFBOEJZLEtBQTlCO0FBQ0g7Ozt3QkFFZ0I7QUFDYixhQUFPLEtBQUtsQyxVQUFaO0FBQ0g7Ozt3QkFFaUI7QUFDZCxhQUFPLEtBQUtDLFdBQVo7QUFDSDs7O3dCQUVnQjtBQUNiLGFBQU8sS0FBS0MsVUFBWjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBDQU5OT04gZnJvbSAnLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvY2Fubm9uL2Nhbm5vbic7XG5pbXBvcnQgeyBJUmlnaWRCb2R5IH0gZnJvbSAnLi4vc3BlYy9JLXJpZ2lkLWJvZHknO1xuaW1wb3J0IHsgQ2Fubm9uU2hhcmVkQm9keSB9IGZyb20gJy4vY2Fubm9uLXNoYXJlZC1ib2R5JztcbmltcG9ydCB7IENhbm5vbldvcmxkIH0gZnJvbSAnLi9jYW5ub24td29ybGQnO1xuaW1wb3J0IHsgUmlnaWRCb2R5M0QgfSBmcm9tICcuLi9mcmFtZXdvcmsnO1xuXG5jb25zdCB2M19jYW5ub24wID0gbmV3IENBTk5PTi5WZWMzKCk7XG5jb25zdCB2M19jYW5ub24xID0gbmV3IENBTk5PTi5WZWMzKCk7XG5jb25zdCBWZWMzID0gY2MuVmVjMztcblxuLyoqXG4gKiB3cmFwZWQgc2hhcmVkIGJvZHlcbiAqIGR5bmFtaWNcbiAqIGtpbmVtYXRpY1xuICovXG5leHBvcnQgY2xhc3MgQ2Fubm9uUmlnaWRCb2R5IGltcGxlbWVudHMgSVJpZ2lkQm9keSB7XG5cbiAgICBnZXQgaXNBd2FrZSAoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFyZWRCb2R5LmJvZHkuaXNBd2FrZSgpO1xuICAgIH1cblxuICAgIGdldCBpc1NsZWVweSAoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFyZWRCb2R5LmJvZHkuaXNTbGVlcHkoKTtcbiAgICB9XG5cbiAgICBnZXQgaXNTbGVlcGluZyAoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFyZWRCb2R5LmJvZHkuaXNTbGVlcGluZygpO1xuICAgIH1cblxuICAgIHNldCBhbGxvd1NsZWVwICh2OiBib29sZWFuKSB7XG4gICAgICAgIGxldCBib2R5ID0gdGhpcy5fc2hhcmVkQm9keS5ib2R5O1xuICAgICAgICBpZiAoYm9keS5pc1NsZWVwaW5nKCkpIHtcbiAgICAgICAgICAgIGJvZHkud2FrZVVwKCk7XG4gICAgICAgIH1cbiAgICAgICAgYm9keS5hbGxvd1NsZWVwID0gdjtcbiAgICB9XG5cbiAgICBzZXQgbWFzcyAodmFsdWU6IG51bWJlcikge1xuICAgICAgICBsZXQgYm9keSA9IHRoaXMuX3NoYXJlZEJvZHkuYm9keTtcbiAgICAgICAgYm9keS5tYXNzID0gdmFsdWU7XG4gICAgICAgIGlmIChib2R5Lm1hc3MgPT0gMCkge1xuICAgICAgICAgICAgYm9keS50eXBlID0gQ0FOTk9OLkJvZHkuU1RBVElDO1xuICAgICAgICB9XG4gICAgICAgIGJvZHkudXBkYXRlTWFzc1Byb3BlcnRpZXMoKTtcbiAgICAgICAgaWYgKGJvZHkuaXNTbGVlcGluZygpKSB7XG4gICAgICAgICAgICBib2R5Lndha2VVcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0IGlzS2luZW1hdGljICh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBsZXQgYm9keSA9IHRoaXMuX3NoYXJlZEJvZHkuYm9keTtcbiAgICAgICAgaWYgKGJvZHkubWFzcyA9PSAwKSB7XG4gICAgICAgICAgICBib2R5LnR5cGUgPSBDQU5OT04uQm9keS5TVEFUSUM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBib2R5LnR5cGUgPSBDQU5OT04uQm9keS5LSU5FTUFUSUM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJvZHkudHlwZSA9IENBTk5PTi5Cb2R5LkRZTkFNSUM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQgZml4ZWRSb3RhdGlvbiAodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgbGV0IGJvZHkgPSB0aGlzLl9zaGFyZWRCb2R5LmJvZHk7XG4gICAgICAgIGlmIChib2R5LmlzU2xlZXBpbmcoKSkge1xuICAgICAgICAgICAgYm9keS53YWtlVXAoKTtcbiAgICAgICAgfVxuICAgICAgICBib2R5LmZpeGVkUm90YXRpb24gPSB2YWx1ZTtcbiAgICAgICAgYm9keS51cGRhdGVNYXNzUHJvcGVydGllcygpO1xuICAgIH1cblxuICAgIHNldCBsaW5lYXJEYW1waW5nICh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkuYm9keS5saW5lYXJEYW1waW5nID0gdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IGFuZ3VsYXJEYW1waW5nICh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkuYm9keS5hbmd1bGFyRGFtcGluZyA9IHZhbHVlO1xuICAgIH1cblxuICAgIHNldCB1c2VHcmF2aXR5ICh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBsZXQgYm9keSA9IHRoaXMuX3NoYXJlZEJvZHkuYm9keTtcbiAgICAgICAgaWYgKGJvZHkuaXNTbGVlcGluZygpKSB7XG4gICAgICAgICAgICBib2R5Lndha2VVcCgpO1xuICAgICAgICB9XG4gICAgICAgIGJvZHkudXNlR3Jhdml0eSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHNldCBsaW5lYXJGYWN0b3IgKHZhbHVlOiBjYy5WZWMzKSB7XG4gICAgICAgIGxldCBib2R5ID0gdGhpcy5fc2hhcmVkQm9keS5ib2R5O1xuICAgICAgICBpZiAoYm9keS5pc1NsZWVwaW5nKCkpIHtcbiAgICAgICAgICAgIGJvZHkud2FrZVVwKCk7XG4gICAgICAgIH1cbiAgICAgICAgVmVjMy5jb3B5KGJvZHkubGluZWFyRmFjdG9yLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgc2V0IGFuZ3VsYXJGYWN0b3IgKHZhbHVlOiBjYy5WZWMzKSB7XG4gICAgICAgIGxldCBib2R5ID0gdGhpcy5fc2hhcmVkQm9keS5ib2R5O1xuICAgICAgICBpZiAoYm9keS5pc1NsZWVwaW5nKCkpIHtcbiAgICAgICAgICAgIGJvZHkud2FrZVVwKCk7XG4gICAgICAgIH1cbiAgICAgICAgVmVjMy5jb3B5KGJvZHkuYW5ndWxhckZhY3RvciwgdmFsdWUpO1xuICAgIH1cblxuICAgIGdldCByaWdpZEJvZHkgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmlnaWRCb2R5O1xuICAgIH1cblxuICAgIGdldCBzaGFyZWRCb2R5ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYXJlZEJvZHk7XG4gICAgfVxuXG4gICAgZ2V0IGlzRW5hYmxlZCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0VuYWJsZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmlnaWRCb2R5ITogUmlnaWRCb2R5M0Q7XG4gICAgcHJpdmF0ZSBfc2hhcmVkQm9keSE6IENhbm5vblNoYXJlZEJvZHk7XG4gICAgcHJpdmF0ZSBfaXNFbmFibGVkID0gZmFsc2U7XG5cbiAgICAvKiogTElGRUNZQ0xFICovXG5cbiAgICBfX3ByZWxvYWQgKGNvbTogUmlnaWRCb2R5M0QpIHtcbiAgICAgICAgdGhpcy5fcmlnaWRCb2R5ID0gY29tO1xuICAgICAgICB0aGlzLl9zaGFyZWRCb2R5ID0gKGNjLmRpcmVjdG9yLmdldFBoeXNpY3MzRE1hbmFnZXIoKS5waHlzaWNzV29ybGQgYXMgQ2Fubm9uV29ybGQpLmdldFNoYXJlZEJvZHkodGhpcy5fcmlnaWRCb2R5Lm5vZGUpO1xuICAgICAgICB0aGlzLl9zaGFyZWRCb2R5LnJlZmVyZW5jZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkud3JhcHBlZEJvZHkgPSB0aGlzO1xuICAgIH1cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgfVxuXG4gICAgb25FbmFibGUgKCkge1xuICAgICAgICB0aGlzLl9pc0VuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm1hc3MgPSB0aGlzLl9yaWdpZEJvZHkubWFzcztcbiAgICAgICAgdGhpcy5hbGxvd1NsZWVwID0gdGhpcy5fcmlnaWRCb2R5LmFsbG93U2xlZXA7XG4gICAgICAgIHRoaXMubGluZWFyRGFtcGluZyA9IHRoaXMuX3JpZ2lkQm9keS5saW5lYXJEYW1waW5nO1xuICAgICAgICB0aGlzLmFuZ3VsYXJEYW1waW5nID0gdGhpcy5fcmlnaWRCb2R5LmFuZ3VsYXJEYW1waW5nO1xuICAgICAgICB0aGlzLnVzZUdyYXZpdHkgPSB0aGlzLl9yaWdpZEJvZHkudXNlR3Jhdml0eTtcbiAgICAgICAgdGhpcy5pc0tpbmVtYXRpYyA9IHRoaXMuX3JpZ2lkQm9keS5pc0tpbmVtYXRpYztcbiAgICAgICAgdGhpcy5maXhlZFJvdGF0aW9uID0gdGhpcy5fcmlnaWRCb2R5LmZpeGVkUm90YXRpb247XG4gICAgICAgIHRoaXMubGluZWFyRmFjdG9yID0gdGhpcy5fcmlnaWRCb2R5LmxpbmVhckZhY3RvcjtcbiAgICAgICAgdGhpcy5hbmd1bGFyRmFjdG9yID0gdGhpcy5fcmlnaWRCb2R5LmFuZ3VsYXJGYWN0b3I7XG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkuZW5hYmxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25EaXNhYmxlICgpIHtcbiAgICAgICAgdGhpcy5faXNFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkuZW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSAoKSB7XG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkucmVmZXJlbmNlID0gZmFsc2U7XG4gICAgICAgICh0aGlzLl9yaWdpZEJvZHkgYXMgYW55KSA9IG51bGw7XG4gICAgICAgICh0aGlzLl9zaGFyZWRCb2R5IGFzIGFueSkgPSBudWxsO1xuICAgIH1cblxuICAgIC8qKiBJTlRFUkZBQ0UgKi9cblxuICAgIHdha2VVcCAoKTogdm9pZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFyZWRCb2R5LmJvZHkud2FrZVVwKCk7XG4gICAgfVxuXG4gICAgc2xlZXAgKCk6IHZvaWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hhcmVkQm9keS5ib2R5LnNsZWVwKCk7XG4gICAgfVxuXG4gICAgZ2V0TGluZWFyVmVsb2NpdHkgKG91dDogY2MuVmVjMyk6IGNjLlZlYzMge1xuICAgICAgICBWZWMzLmNvcHkob3V0LCB0aGlzLl9zaGFyZWRCb2R5LmJvZHkudmVsb2NpdHkpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHNldExpbmVhclZlbG9jaXR5ICh2YWx1ZTogY2MuVmVjMyk6IHZvaWQge1xuICAgICAgICBsZXQgYm9keSA9IHRoaXMuX3NoYXJlZEJvZHkuYm9keTtcbiAgICAgICAgaWYgKGJvZHkuaXNTbGVlcGluZygpKSB7XG4gICAgICAgICAgICBib2R5Lndha2VVcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgVmVjMy5jb3B5KGJvZHkudmVsb2NpdHksIHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXRBbmd1bGFyVmVsb2NpdHkgKG91dDogY2MuVmVjMyk6IGNjLlZlYzMge1xuICAgICAgICBWZWMzLmNvcHkob3V0LCB0aGlzLl9zaGFyZWRCb2R5LmJvZHkuYW5ndWxhclZlbG9jaXR5KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBzZXRBbmd1bGFyVmVsb2NpdHkgKHZhbHVlOiBjYy5WZWMzKTogdm9pZCB7XG4gICAgICAgIGxldCBib2R5ID0gdGhpcy5fc2hhcmVkQm9keS5ib2R5O1xuICAgICAgICBpZiAoYm9keS5pc1NsZWVwaW5nKCkpIHtcbiAgICAgICAgICAgIGJvZHkud2FrZVVwKCk7XG4gICAgICAgIH1cbiAgICAgICAgVmVjMy5jb3B5KGJvZHkuYW5ndWxhclZlbG9jaXR5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgYXBwbHlGb3JjZSAoZm9yY2U6IGNjLlZlYzMsIHdvcmxkUG9pbnQ/OiBjYy5WZWMzKSB7XG4gICAgICAgIGlmICh3b3JsZFBvaW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHdvcmxkUG9pbnQgPSBWZWMzLlpFUk87XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJvZHkgPSB0aGlzLl9zaGFyZWRCb2R5LmJvZHk7XG4gICAgICAgIGlmIChib2R5LmlzU2xlZXBpbmcoKSkge1xuICAgICAgICAgICAgYm9keS53YWtlVXAoKTtcbiAgICAgICAgfVxuICAgICAgICBib2R5LmFwcGx5Rm9yY2UoVmVjMy5jb3B5KHYzX2Nhbm5vbjAsIGZvcmNlKSwgVmVjMy5jb3B5KHYzX2Nhbm5vbjEsIHdvcmxkUG9pbnQpKTtcbiAgICB9XG5cbiAgICBhcHBseUltcHVsc2UgKGltcHVsc2U6IGNjLlZlYzMsIHdvcmxkUG9pbnQ/OiBjYy5WZWMzKSB7XG4gICAgICAgIGlmICh3b3JsZFBvaW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHdvcmxkUG9pbnQgPSBWZWMzLlpFUk87XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJvZHkgPSB0aGlzLl9zaGFyZWRCb2R5LmJvZHk7XG4gICAgICAgIGlmIChib2R5LmlzU2xlZXBpbmcoKSkge1xuICAgICAgICAgICAgYm9keS53YWtlVXAoKTtcbiAgICAgICAgfVxuICAgICAgICBib2R5LmFwcGx5SW1wdWxzZShWZWMzLmNvcHkodjNfY2Fubm9uMCwgaW1wdWxzZSksIFZlYzMuY29weSh2M19jYW5ub24xLCB3b3JsZFBvaW50KSk7XG4gICAgfVxuXG4gICAgYXBwbHlMb2NhbEZvcmNlIChmb3JjZTogY2MuVmVjMywgbG9jYWxQb2ludD86IGNjLlZlYzMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGxvY2FsUG9pbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgbG9jYWxQb2ludCA9IFZlYzMuWkVSTztcbiAgICAgICAgfVxuICAgICAgICBsZXQgYm9keSA9IHRoaXMuX3NoYXJlZEJvZHkuYm9keTtcbiAgICAgICAgaWYgKGJvZHkuaXNTbGVlcGluZygpKSB7XG4gICAgICAgICAgICBib2R5Lndha2VVcCgpO1xuICAgICAgICB9XG4gICAgICAgIGJvZHkuYXBwbHlMb2NhbEZvcmNlKFZlYzMuY29weSh2M19jYW5ub24wLCBmb3JjZSksIFZlYzMuY29weSh2M19jYW5ub24xLCBsb2NhbFBvaW50KSk7XG4gICAgfVxuXG4gICAgYXBwbHlMb2NhbEltcHVsc2UgKGltcHVsc2U6IGNjLlZlYzMsIGxvY2FsUG9pbnQ/OiBjYy5WZWMzKTogdm9pZCB7XG4gICAgICAgIGlmIChsb2NhbFBvaW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIGxvY2FsUG9pbnQgPSBWZWMzLlpFUk87XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJvZHkgPSB0aGlzLl9zaGFyZWRCb2R5LmJvZHk7XG4gICAgICAgIGlmIChib2R5LmlzU2xlZXBpbmcoKSkge1xuICAgICAgICAgICAgYm9keS53YWtlVXAoKTtcbiAgICAgICAgfVxuICAgICAgICBib2R5LmFwcGx5TG9jYWxJbXB1bHNlKFZlYzMuY29weSh2M19jYW5ub24wLCBpbXB1bHNlKSwgVmVjMy5jb3B5KHYzX2Nhbm5vbjEsIGxvY2FsUG9pbnQpKTtcbiAgICB9XG5cbiAgICBhcHBseVRvcnF1ZSAodG9ycXVlOiBjYy5WZWMzKTogdm9pZCB7XG4gICAgICAgIGxldCBib2R5ID0gdGhpcy5fc2hhcmVkQm9keS5ib2R5O1xuICAgICAgICBpZiAoYm9keS5pc1NsZWVwaW5nKCkpIHtcbiAgICAgICAgICAgIGJvZHkud2FrZVVwKCk7XG4gICAgICAgIH1cbiAgICAgICAgYm9keS50b3JxdWUueCArPSB0b3JxdWUueDtcbiAgICAgICAgYm9keS50b3JxdWUueSArPSB0b3JxdWUueTtcbiAgICAgICAgYm9keS50b3JxdWUueiArPSB0b3JxdWUuejtcbiAgICB9XG5cbiAgICBhcHBseUxvY2FsVG9ycXVlICh0b3JxdWU6IGNjLlZlYzMpOiB2b2lkIHtcbiAgICAgICAgbGV0IGJvZHkgPSB0aGlzLl9zaGFyZWRCb2R5LmJvZHk7XG4gICAgICAgIGlmIChib2R5LmlzU2xlZXBpbmcoKSkge1xuICAgICAgICAgICAgYm9keS53YWtlVXAoKTtcbiAgICAgICAgfVxuICAgICAgICBWZWMzLmNvcHkodjNfY2Fubm9uMCwgdG9ycXVlKTtcbiAgICAgICAgYm9keS52ZWN0b3JUb1dvcmxkRnJhbWUodjNfY2Fubm9uMCwgdjNfY2Fubm9uMCk7XG4gICAgICAgIGJvZHkudG9ycXVlLnggKz0gdjNfY2Fubm9uMC54O1xuICAgICAgICBib2R5LnRvcnF1ZS55ICs9IHYzX2Nhbm5vbjAueTtcbiAgICAgICAgYm9keS50b3JxdWUueiArPSB2M19jYW5ub24wLno7XG4gICAgfVxufSJdLCJzb3VyY2VSb290IjoiLyJ9