
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cannon/cannon-world.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.CannonWorld = void 0;

var _cannon = _interopRequireDefault(require("../../../../../external/cannon/cannon"));

var _cannonUtil = require("./cannon-util");

var _cannonShape = require("./shapes/cannon-shape");

var _cannonSharedBody = require("./cannon-shared-body");

var _util = require("../framework/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vec3 = cc.Vec3;
var fastRemoveAt = cc.js.array.fastRemoveAt;

var CannonWorld = /*#__PURE__*/function () {
  _createClass(CannonWorld, [{
    key: "world",
    get: function get() {
      return this._world;
    }
  }, {
    key: "defaultMaterial",
    set: function set(mat) {
      this._world.defaultMaterial.friction = mat.friction;
      this._world.defaultMaterial.restitution = mat.restitution;

      if (_cannonShape.CannonShape.idToMaterial[mat._uuid] != null) {
        _cannonShape.CannonShape.idToMaterial[mat._uuid] = this._world.defaultMaterial;
      }
    }
  }, {
    key: "allowSleep",
    set: function set(v) {
      this._world.allowSleep = v;
    }
  }, {
    key: "gravity",
    set: function set(gravity) {
      Vec3.copy(this._world.gravity, gravity);
    }
  }]);

  function CannonWorld() {
    this.bodies = [];
    this._world = void 0;
    this._raycastResult = new _cannon["default"].RaycastResult();
    this._world = new _cannon["default"].World();
    this._world.broadphase = new _cannon["default"].NaiveBroadphase();
  }

  var _proto = CannonWorld.prototype;

  _proto.step = function step(deltaTime, timeSinceLastCalled, maxSubStep) {
    (0, _util.clearNodeTransformRecord)(); // sync scene to physics

    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].syncSceneToPhysics();
    }

    (0, _util.clearNodeTransformDirtyFlag)();

    this._world.step(deltaTime, timeSinceLastCalled, maxSubStep); // sync physics to scene


    for (var _i = 0; _i < this.bodies.length; _i++) {
      this.bodies[_i].syncPhysicsToScene();
    }

    this._world.emitTriggeredEvents();

    this._world.emitCollisionEvents();
  };

  _proto.raycastClosest = function raycastClosest(worldRay, options, result) {
    setupFromAndTo(worldRay, options.maxDistance);
    (0, _cannonUtil.toCannonRaycastOptions)(raycastOpt, options);

    var hit = this._world.raycastClosest(from, to, raycastOpt, this._raycastResult);

    if (hit) {
      (0, _cannonUtil.fillRaycastResult)(result, this._raycastResult);
    }

    return hit;
  };

  _proto.raycast = function raycast(worldRay, options, pool, results) {
    setupFromAndTo(worldRay, options.maxDistance);
    (0, _cannonUtil.toCannonRaycastOptions)(raycastOpt, options);

    var hit = this._world.raycastAll(from, to, raycastOpt, function (result) {
      var r = pool.add();
      (0, _cannonUtil.fillRaycastResult)(r, result);
      results.push(r);
    });

    return hit;
  };

  _proto.getSharedBody = function getSharedBody(node) {
    return _cannonSharedBody.CannonSharedBody.getSharedBody(node, this);
  };

  _proto.addSharedBody = function addSharedBody(sharedBody) {
    var i = this.bodies.indexOf(sharedBody);

    if (i < 0) {
      this.bodies.push(sharedBody);

      this._world.addBody(sharedBody.body);
    }
  };

  _proto.removeSharedBody = function removeSharedBody(sharedBody) {
    var i = this.bodies.indexOf(sharedBody);

    if (i >= 0) {
      fastRemoveAt(this.bodies, i);

      this._world.remove(sharedBody.body);
    }
  };

  return CannonWorld;
}();

exports.CannonWorld = CannonWorld;
var from = new _cannon["default"].Vec3();
var to = new _cannon["default"].Vec3();

function setupFromAndTo(worldRay, distance) {
  Vec3.copy(from, worldRay.o);
  worldRay.computeHit(to, distance);
}

var raycastOpt = {
  'checkCollisionResponse': false,
  'collisionFilterGroup': -1,
  'collisionFilterMask': -1,
  'skipBackFaces': false
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvY2Fubm9uL2Nhbm5vbi13b3JsZC50cyJdLCJuYW1lcyI6WyJWZWMzIiwiY2MiLCJmYXN0UmVtb3ZlQXQiLCJqcyIsImFycmF5IiwiQ2Fubm9uV29ybGQiLCJfd29ybGQiLCJtYXQiLCJkZWZhdWx0TWF0ZXJpYWwiLCJmcmljdGlvbiIsInJlc3RpdHV0aW9uIiwiQ2Fubm9uU2hhcGUiLCJpZFRvTWF0ZXJpYWwiLCJfdXVpZCIsInYiLCJhbGxvd1NsZWVwIiwiZ3Jhdml0eSIsImNvcHkiLCJib2RpZXMiLCJfcmF5Y2FzdFJlc3VsdCIsIkNBTk5PTiIsIlJheWNhc3RSZXN1bHQiLCJXb3JsZCIsImJyb2FkcGhhc2UiLCJOYWl2ZUJyb2FkcGhhc2UiLCJzdGVwIiwiZGVsdGFUaW1lIiwidGltZVNpbmNlTGFzdENhbGxlZCIsIm1heFN1YlN0ZXAiLCJpIiwibGVuZ3RoIiwic3luY1NjZW5lVG9QaHlzaWNzIiwic3luY1BoeXNpY3NUb1NjZW5lIiwiZW1pdFRyaWdnZXJlZEV2ZW50cyIsImVtaXRDb2xsaXNpb25FdmVudHMiLCJyYXljYXN0Q2xvc2VzdCIsIndvcmxkUmF5Iiwib3B0aW9ucyIsInJlc3VsdCIsInNldHVwRnJvbUFuZFRvIiwibWF4RGlzdGFuY2UiLCJyYXljYXN0T3B0IiwiaGl0IiwiZnJvbSIsInRvIiwicmF5Y2FzdCIsInBvb2wiLCJyZXN1bHRzIiwicmF5Y2FzdEFsbCIsInIiLCJhZGQiLCJwdXNoIiwiZ2V0U2hhcmVkQm9keSIsIm5vZGUiLCJDYW5ub25TaGFyZWRCb2R5IiwiYWRkU2hhcmVkQm9keSIsInNoYXJlZEJvZHkiLCJpbmRleE9mIiwiYWRkQm9keSIsImJvZHkiLCJyZW1vdmVTaGFyZWRCb2R5IiwicmVtb3ZlIiwiZGlzdGFuY2UiLCJvIiwiY29tcHV0ZUhpdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7Ozs7Ozs7QUFFQSxJQUFNQSxJQUFJLEdBQUdDLEVBQUUsQ0FBQ0QsSUFBaEI7QUFDQSxJQUFNRSxZQUFZLEdBQUdELEVBQUUsQ0FBQ0UsRUFBSCxDQUFNQyxLQUFOLENBQVlGLFlBQWpDOztJQUVhRzs7O3dCQUVJO0FBQ1QsYUFBTyxLQUFLQyxNQUFaO0FBQ0g7OztzQkFFb0JDLEtBQXNCO0FBQ3ZDLFdBQUtELE1BQUwsQ0FBWUUsZUFBWixDQUE0QkMsUUFBNUIsR0FBdUNGLEdBQUcsQ0FBQ0UsUUFBM0M7QUFDQSxXQUFLSCxNQUFMLENBQVlFLGVBQVosQ0FBNEJFLFdBQTVCLEdBQTBDSCxHQUFHLENBQUNHLFdBQTlDOztBQUNBLFVBQUlDLHlCQUFZQyxZQUFaLENBQXlCTCxHQUFHLENBQUNNLEtBQTdCLEtBQXVDLElBQTNDLEVBQWlEO0FBQzdDRixpQ0FBWUMsWUFBWixDQUF5QkwsR0FBRyxDQUFDTSxLQUE3QixJQUFzQyxLQUFLUCxNQUFMLENBQVlFLGVBQWxEO0FBQ0g7QUFDSjs7O3NCQUVlTSxHQUFZO0FBQ3hCLFdBQUtSLE1BQUwsQ0FBWVMsVUFBWixHQUF5QkQsQ0FBekI7QUFDSDs7O3NCQUVZRSxTQUFrQjtBQUMzQmhCLE1BQUFBLElBQUksQ0FBQ2lCLElBQUwsQ0FBVSxLQUFLWCxNQUFMLENBQVlVLE9BQXRCLEVBQStCQSxPQUEvQjtBQUNIOzs7QUFPRCx5QkFBZTtBQUFBLFNBTE5FLE1BS00sR0FMdUIsRUFLdkI7QUFBQSxTQUhQWixNQUdPO0FBQUEsU0FGUGEsY0FFTyxHQUZVLElBQUlDLG1CQUFPQyxhQUFYLEVBRVY7QUFDWCxTQUFLZixNQUFMLEdBQWMsSUFBSWMsbUJBQU9FLEtBQVgsRUFBZDtBQUNBLFNBQUtoQixNQUFMLENBQVlpQixVQUFaLEdBQXlCLElBQUlILG1CQUFPSSxlQUFYLEVBQXpCO0FBQ0g7Ozs7U0FFREMsT0FBQSxjQUFNQyxTQUFOLEVBQXlCQyxtQkFBekIsRUFBdURDLFVBQXZELEVBQTRFO0FBRXhFLDBDQUZ3RSxDQUl4RTs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS1gsTUFBTCxDQUFZWSxNQUFoQyxFQUF3Q0QsQ0FBQyxFQUF6QyxFQUE2QztBQUN6QyxXQUFLWCxNQUFMLENBQVlXLENBQVosRUFBZUUsa0JBQWY7QUFDSDs7QUFFRDs7QUFFQSxTQUFLekIsTUFBTCxDQUFZbUIsSUFBWixDQUFpQkMsU0FBakIsRUFBNEJDLG1CQUE1QixFQUFpREMsVUFBakQsRUFYd0UsQ0FheEU7OztBQUNBLFNBQUssSUFBSUMsRUFBQyxHQUFHLENBQWIsRUFBZ0JBLEVBQUMsR0FBRyxLQUFLWCxNQUFMLENBQVlZLE1BQWhDLEVBQXdDRCxFQUFDLEVBQXpDLEVBQTZDO0FBQ3pDLFdBQUtYLE1BQUwsQ0FBWVcsRUFBWixFQUFlRyxrQkFBZjtBQUNIOztBQUVELFNBQUsxQixNQUFMLENBQVkyQixtQkFBWjs7QUFDQSxTQUFLM0IsTUFBTCxDQUFZNEIsbUJBQVo7QUFDSDs7U0FFREMsaUJBQUEsd0JBQWdCQyxRQUFoQixFQUE0Q0MsT0FBNUMsRUFBc0VDLE1BQXRFLEVBQXlHO0FBQ3JHQyxJQUFBQSxjQUFjLENBQUNILFFBQUQsRUFBV0MsT0FBTyxDQUFDRyxXQUFuQixDQUFkO0FBQ0EsNENBQXVCQyxVQUF2QixFQUFtQ0osT0FBbkM7O0FBQ0EsUUFBTUssR0FBRyxHQUFHLEtBQUtwQyxNQUFMLENBQVk2QixjQUFaLENBQTJCUSxJQUEzQixFQUFpQ0MsRUFBakMsRUFBcUNILFVBQXJDLEVBQWlELEtBQUt0QixjQUF0RCxDQUFaOztBQUNBLFFBQUl1QixHQUFKLEVBQVM7QUFDTCx5Q0FBa0JKLE1BQWxCLEVBQTBCLEtBQUtuQixjQUEvQjtBQUNIOztBQUNELFdBQU91QixHQUFQO0FBQ0g7O1NBRURHLFVBQUEsaUJBQVNULFFBQVQsRUFBcUNDLE9BQXJDLEVBQStEUyxJQUEvRCxFQUFxRkMsT0FBckYsRUFBMkg7QUFDdkhSLElBQUFBLGNBQWMsQ0FBQ0gsUUFBRCxFQUFXQyxPQUFPLENBQUNHLFdBQW5CLENBQWQ7QUFDQSw0Q0FBdUJDLFVBQXZCLEVBQW1DSixPQUFuQzs7QUFDQSxRQUFNSyxHQUFHLEdBQUcsS0FBS3BDLE1BQUwsQ0FBWTBDLFVBQVosQ0FBdUJMLElBQXZCLEVBQTZCQyxFQUE3QixFQUFpQ0gsVUFBakMsRUFBNkMsVUFBQ0gsTUFBRCxFQUF1QztBQUM1RixVQUFNVyxDQUFDLEdBQUdILElBQUksQ0FBQ0ksR0FBTCxFQUFWO0FBQ0EseUNBQWtCRCxDQUFsQixFQUFxQlgsTUFBckI7QUFDQVMsTUFBQUEsT0FBTyxDQUFDSSxJQUFSLENBQWFGLENBQWI7QUFDSCxLQUpXLENBQVo7O0FBS0EsV0FBT1AsR0FBUDtBQUNIOztTQUVEVSxnQkFBQSx1QkFBZUMsSUFBZixFQUE2QztBQUN6QyxXQUFPQyxtQ0FBaUJGLGFBQWpCLENBQStCQyxJQUEvQixFQUFxQyxJQUFyQyxDQUFQO0FBQ0g7O1NBRURFLGdCQUFBLHVCQUFlQyxVQUFmLEVBQTZDO0FBQ3pDLFFBQU0zQixDQUFDLEdBQUcsS0FBS1gsTUFBTCxDQUFZdUMsT0FBWixDQUFvQkQsVUFBcEIsQ0FBVjs7QUFDQSxRQUFJM0IsQ0FBQyxHQUFHLENBQVIsRUFBVztBQUNQLFdBQUtYLE1BQUwsQ0FBWWlDLElBQVosQ0FBaUJLLFVBQWpCOztBQUNBLFdBQUtsRCxNQUFMLENBQVlvRCxPQUFaLENBQW9CRixVQUFVLENBQUNHLElBQS9CO0FBQ0g7QUFDSjs7U0FFREMsbUJBQUEsMEJBQWtCSixVQUFsQixFQUFnRDtBQUM1QyxRQUFNM0IsQ0FBQyxHQUFHLEtBQUtYLE1BQUwsQ0FBWXVDLE9BQVosQ0FBb0JELFVBQXBCLENBQVY7O0FBQ0EsUUFBSTNCLENBQUMsSUFBSSxDQUFULEVBQVk7QUFDUjNCLE1BQUFBLFlBQVksQ0FBQyxLQUFLZ0IsTUFBTixFQUFjVyxDQUFkLENBQVo7O0FBQ0EsV0FBS3ZCLE1BQUwsQ0FBWXVELE1BQVosQ0FBbUJMLFVBQVUsQ0FBQ0csSUFBOUI7QUFDSDtBQUNKOzs7Ozs7QUFHTCxJQUFNaEIsSUFBSSxHQUFHLElBQUl2QixtQkFBT3BCLElBQVgsRUFBYjtBQUNBLElBQU00QyxFQUFFLEdBQUcsSUFBSXhCLG1CQUFPcEIsSUFBWCxFQUFYOztBQUNBLFNBQVN1QyxjQUFULENBQXlCSCxRQUF6QixFQUFxRDBCLFFBQXJELEVBQXVFO0FBQ25FOUQsRUFBQUEsSUFBSSxDQUFDaUIsSUFBTCxDQUFVMEIsSUFBVixFQUFnQlAsUUFBUSxDQUFDMkIsQ0FBekI7QUFDQTNCLEVBQUFBLFFBQVEsQ0FBQzRCLFVBQVQsQ0FBb0JwQixFQUFwQixFQUF3QmtCLFFBQXhCO0FBQ0g7O0FBRUQsSUFBTXJCLFVBQWtDLEdBQUc7QUFDdkMsNEJBQTBCLEtBRGE7QUFFdkMsMEJBQXdCLENBQUMsQ0FGYztBQUd2Qyx5QkFBdUIsQ0FBQyxDQUhlO0FBSXZDLG1CQUFpQjtBQUpzQixDQUEzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgQ0FOTk9OIGZyb20gJy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL2Nhbm5vbi9jYW5ub24nO1xuaW1wb3J0IHsgZmlsbFJheWNhc3RSZXN1bHQsIHRvQ2Fubm9uUmF5Y2FzdE9wdGlvbnMgfSBmcm9tICcuL2Nhbm5vbi11dGlsJztcbmltcG9ydCB7IENhbm5vblNoYXBlIH0gZnJvbSAnLi9zaGFwZXMvY2Fubm9uLXNoYXBlJztcbmltcG9ydCB7IENhbm5vblNoYXJlZEJvZHkgfSBmcm9tICcuL2Nhbm5vbi1zaGFyZWQtYm9keSc7XG5pbXBvcnQgeyBJUGh5c2ljc1dvcmxkLCBJUmF5Y2FzdE9wdGlvbnMgfSBmcm9tICcuLi9zcGVjL2ktcGh5c2ljcy13b3JsZCc7XG5pbXBvcnQgeyBQaHlzaWNzTWF0ZXJpYWwsIFBoeXNpY3NSYXlSZXN1bHQgfSBmcm9tICcuLi9mcmFtZXdvcmsnO1xuaW1wb3J0IHsgY2xlYXJOb2RlVHJhbnNmb3JtUmVjb3JkLCBjbGVhck5vZGVUcmFuc2Zvcm1EaXJ0eUZsYWcgfSBmcm9tICcuLi9mcmFtZXdvcmsvdXRpbCdcblxuY29uc3QgVmVjMyA9IGNjLlZlYzM7XG5jb25zdCBmYXN0UmVtb3ZlQXQgPSBjYy5qcy5hcnJheS5mYXN0UmVtb3ZlQXQ7XG5cbmV4cG9ydCBjbGFzcyBDYW5ub25Xb3JsZCBpbXBsZW1lbnRzIElQaHlzaWNzV29ybGQge1xuXG4gICAgZ2V0IHdvcmxkICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dvcmxkO1xuICAgIH1cblxuICAgIHNldCBkZWZhdWx0TWF0ZXJpYWwgKG1hdDogUGh5c2ljc01hdGVyaWFsKSB7XG4gICAgICAgIHRoaXMuX3dvcmxkLmRlZmF1bHRNYXRlcmlhbC5mcmljdGlvbiA9IG1hdC5mcmljdGlvbjtcbiAgICAgICAgdGhpcy5fd29ybGQuZGVmYXVsdE1hdGVyaWFsLnJlc3RpdHV0aW9uID0gbWF0LnJlc3RpdHV0aW9uO1xuICAgICAgICBpZiAoQ2Fubm9uU2hhcGUuaWRUb01hdGVyaWFsW21hdC5fdXVpZF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgQ2Fubm9uU2hhcGUuaWRUb01hdGVyaWFsW21hdC5fdXVpZF0gPSB0aGlzLl93b3JsZC5kZWZhdWx0TWF0ZXJpYWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQgYWxsb3dTbGVlcCAodjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl93b3JsZC5hbGxvd1NsZWVwID0gdjtcbiAgICB9XG5cbiAgICBzZXQgZ3Jhdml0eSAoZ3Jhdml0eTogY2MuVmVjMykge1xuICAgICAgICBWZWMzLmNvcHkodGhpcy5fd29ybGQuZ3Jhdml0eSwgZ3Jhdml0eSk7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgYm9kaWVzOiBDYW5ub25TaGFyZWRCb2R5W10gPSBbXTtcblxuICAgIHByaXZhdGUgX3dvcmxkOiBDQU5OT04uV29ybGQ7XG4gICAgcHJpdmF0ZSBfcmF5Y2FzdFJlc3VsdCA9IG5ldyBDQU5OT04uUmF5Y2FzdFJlc3VsdCgpO1xuXG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICB0aGlzLl93b3JsZCA9IG5ldyBDQU5OT04uV29ybGQoKTtcbiAgICAgICAgdGhpcy5fd29ybGQuYnJvYWRwaGFzZSA9IG5ldyBDQU5OT04uTmFpdmVCcm9hZHBoYXNlKCk7XG4gICAgfVxuXG4gICAgc3RlcCAoZGVsdGFUaW1lOiBudW1iZXIsIHRpbWVTaW5jZUxhc3RDYWxsZWQ/OiBudW1iZXIsIG1heFN1YlN0ZXA/OiBudW1iZXIpIHtcblxuICAgICAgICBjbGVhck5vZGVUcmFuc2Zvcm1SZWNvcmQoKTtcblxuICAgICAgICAvLyBzeW5jIHNjZW5lIHRvIHBoeXNpY3NcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ib2RpZXNbaV0uc3luY1NjZW5lVG9QaHlzaWNzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhck5vZGVUcmFuc2Zvcm1EaXJ0eUZsYWcoKTtcblxuICAgICAgICB0aGlzLl93b3JsZC5zdGVwKGRlbHRhVGltZSwgdGltZVNpbmNlTGFzdENhbGxlZCwgbWF4U3ViU3RlcCk7XG5cbiAgICAgICAgLy8gc3luYyBwaHlzaWNzIHRvIHNjZW5lXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYm9kaWVzW2ldLnN5bmNQaHlzaWNzVG9TY2VuZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fd29ybGQuZW1pdFRyaWdnZXJlZEV2ZW50cygpO1xuICAgICAgICB0aGlzLl93b3JsZC5lbWl0Q29sbGlzaW9uRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcmF5Y2FzdENsb3Nlc3QgKHdvcmxkUmF5OiBjYy5nZW9tVXRpbHMuUmF5LCBvcHRpb25zOiBJUmF5Y2FzdE9wdGlvbnMsIHJlc3VsdDogUGh5c2ljc1JheVJlc3VsdCk6IGJvb2xlYW4ge1xuICAgICAgICBzZXR1cEZyb21BbmRUbyh3b3JsZFJheSwgb3B0aW9ucy5tYXhEaXN0YW5jZSk7XG4gICAgICAgIHRvQ2Fubm9uUmF5Y2FzdE9wdGlvbnMocmF5Y2FzdE9wdCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IGhpdCA9IHRoaXMuX3dvcmxkLnJheWNhc3RDbG9zZXN0KGZyb20sIHRvLCByYXljYXN0T3B0LCB0aGlzLl9yYXljYXN0UmVzdWx0KTtcbiAgICAgICAgaWYgKGhpdCkge1xuICAgICAgICAgICAgZmlsbFJheWNhc3RSZXN1bHQocmVzdWx0LCB0aGlzLl9yYXljYXN0UmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGl0O1xuICAgIH1cblxuICAgIHJheWNhc3QgKHdvcmxkUmF5OiBjYy5nZW9tVXRpbHMuUmF5LCBvcHRpb25zOiBJUmF5Y2FzdE9wdGlvbnMsIHBvb2w6IGNjLlJlY3ljbGVQb29sLCByZXN1bHRzOiBQaHlzaWNzUmF5UmVzdWx0W10pOiBib29sZWFuIHtcbiAgICAgICAgc2V0dXBGcm9tQW5kVG8od29ybGRSYXksIG9wdGlvbnMubWF4RGlzdGFuY2UpO1xuICAgICAgICB0b0Nhbm5vblJheWNhc3RPcHRpb25zKHJheWNhc3RPcHQsIG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBoaXQgPSB0aGlzLl93b3JsZC5yYXljYXN0QWxsKGZyb20sIHRvLCByYXljYXN0T3B0LCAocmVzdWx0OiBDQU5OT04uUmF5Y2FzdFJlc3VsdCk6IGFueSA9PiB7XG4gICAgICAgICAgICBjb25zdCByID0gcG9vbC5hZGQoKTtcbiAgICAgICAgICAgIGZpbGxSYXljYXN0UmVzdWx0KHIsIHJlc3VsdCk7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gocik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaGl0XG4gICAgfVxuXG4gICAgZ2V0U2hhcmVkQm9keSAobm9kZTogTm9kZSk6IENhbm5vblNoYXJlZEJvZHkge1xuICAgICAgICByZXR1cm4gQ2Fubm9uU2hhcmVkQm9keS5nZXRTaGFyZWRCb2R5KG5vZGUsIHRoaXMpO1xuICAgIH1cblxuICAgIGFkZFNoYXJlZEJvZHkgKHNoYXJlZEJvZHk6IENhbm5vblNoYXJlZEJvZHkpIHtcbiAgICAgICAgY29uc3QgaSA9IHRoaXMuYm9kaWVzLmluZGV4T2Yoc2hhcmVkQm9keSk7XG4gICAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5ib2RpZXMucHVzaChzaGFyZWRCb2R5KTtcbiAgICAgICAgICAgIHRoaXMuX3dvcmxkLmFkZEJvZHkoc2hhcmVkQm9keS5ib2R5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVNoYXJlZEJvZHkgKHNoYXJlZEJvZHk6IENhbm5vblNoYXJlZEJvZHkpIHtcbiAgICAgICAgY29uc3QgaSA9IHRoaXMuYm9kaWVzLmluZGV4T2Yoc2hhcmVkQm9keSk7XG4gICAgICAgIGlmIChpID49IDApIHtcbiAgICAgICAgICAgIGZhc3RSZW1vdmVBdCh0aGlzLmJvZGllcywgaSk7XG4gICAgICAgICAgICB0aGlzLl93b3JsZC5yZW1vdmUoc2hhcmVkQm9keS5ib2R5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY29uc3QgZnJvbSA9IG5ldyBDQU5OT04uVmVjMygpO1xuY29uc3QgdG8gPSBuZXcgQ0FOTk9OLlZlYzMoKTtcbmZ1bmN0aW9uIHNldHVwRnJvbUFuZFRvICh3b3JsZFJheTogY2MuZ2VvbVV0aWxzLlJheSwgZGlzdGFuY2U6IG51bWJlcikge1xuICAgIFZlYzMuY29weShmcm9tLCB3b3JsZFJheS5vKTtcbiAgICB3b3JsZFJheS5jb21wdXRlSGl0KHRvLCBkaXN0YW5jZSk7XG59XG5cbmNvbnN0IHJheWNhc3RPcHQ6IENBTk5PTi5JUmF5Y2FzdE9wdGlvbnMgPSB7XG4gICAgJ2NoZWNrQ29sbGlzaW9uUmVzcG9uc2UnOiBmYWxzZSxcbiAgICAnY29sbGlzaW9uRmlsdGVyR3JvdXAnOiAtMSxcbiAgICAnY29sbGlzaW9uRmlsdGVyTWFzayc6IC0xLFxuICAgICdza2lwQmFja0ZhY2VzJzogZmFsc2Vcbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==