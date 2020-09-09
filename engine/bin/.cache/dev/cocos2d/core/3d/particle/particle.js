
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/particle.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _valueTypes = require("../../value-types");

var Particle = // uint
function Particle(particleSystem) {
  this.particleSystem = null;
  this.position = null;
  this.velocity = null;
  this.animatedVelocity = null;
  this.ultimateVelocity = null;
  this.angularVelocity = null;
  this.axisOfRotation = null;
  this.rotation = null;
  this.startSize = null;
  this.size = null;
  this.startColor = null;
  this.color = cc.Color.WHITE;
  this.randomSeed = null;
  this.remainingLifetime = null;
  this.startLifetime = null;
  this.emitAccumulator0 = null;
  this.emitAccumulator1 = null;
  this.frameIndex = null;
  this.particleSystem = particleSystem;
  this.position = new _valueTypes.Vec3(0, 0, 0);
  this.velocity = new _valueTypes.Vec3(0, 0, 0);
  this.animatedVelocity = new _valueTypes.Vec3(0, 0, 0);
  this.ultimateVelocity = new _valueTypes.Vec3(0, 0, 0);
  this.angularVelocity = new _valueTypes.Vec3(0, 0, 0);
  this.axisOfRotation = new _valueTypes.Vec3(0, 0, 0);
  this.rotation = new _valueTypes.Vec3(0, 0, 0);
  this.startSize = new _valueTypes.Vec3(0, 0, 0);
  this.size = new _valueTypes.Vec3(0, 0, 0);
  this.startColor = cc.Color.WHITE.clone();
  this.color = cc.Color.WHITE.clone();
  this.randomSeed = 0; // uint

  this.remainingLifetime = 0.0;
  this.startLifetime = 0.0;
  this.emitAccumulator0 = 0.0;
  this.emitAccumulator1 = 0.0;
  this.frameIndex = 0.0;
};

exports["default"] = Particle;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL3BhcnRpY2xlLnRzIl0sIm5hbWVzIjpbIlBhcnRpY2xlIiwicGFydGljbGVTeXN0ZW0iLCJwb3NpdGlvbiIsInZlbG9jaXR5IiwiYW5pbWF0ZWRWZWxvY2l0eSIsInVsdGltYXRlVmVsb2NpdHkiLCJhbmd1bGFyVmVsb2NpdHkiLCJheGlzT2ZSb3RhdGlvbiIsInJvdGF0aW9uIiwic3RhcnRTaXplIiwic2l6ZSIsInN0YXJ0Q29sb3IiLCJjb2xvciIsImNjIiwiQ29sb3IiLCJXSElURSIsInJhbmRvbVNlZWQiLCJyZW1haW5pbmdMaWZldGltZSIsInN0YXJ0TGlmZXRpbWUiLCJlbWl0QWNjdW11bGF0b3IwIiwiZW1pdEFjY3VtdWxhdG9yMSIsImZyYW1lSW5kZXgiLCJWZWMzIiwiY2xvbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFFcUJBLFdBYUU7QUFPbkIsa0JBQWFDLGNBQWIsRUFBNkI7QUFBQSxPQW5CN0JBLGNBbUI2QixHQW5CWixJQW1CWTtBQUFBLE9BbEI3QkMsUUFrQjZCLEdBbEJsQixJQWtCa0I7QUFBQSxPQWpCN0JDLFFBaUI2QixHQWpCbEIsSUFpQmtCO0FBQUEsT0FoQjdCQyxnQkFnQjZCLEdBaEJWLElBZ0JVO0FBQUEsT0FmN0JDLGdCQWU2QixHQWZWLElBZVU7QUFBQSxPQWQ3QkMsZUFjNkIsR0FkWCxJQWNXO0FBQUEsT0FiN0JDLGNBYTZCLEdBYlosSUFhWTtBQUFBLE9BWjdCQyxRQVk2QixHQVpsQixJQVlrQjtBQUFBLE9BWDdCQyxTQVc2QixHQVhqQixJQVdpQjtBQUFBLE9BVjdCQyxJQVU2QixHQVZ0QixJQVVzQjtBQUFBLE9BVDdCQyxVQVM2QixHQVRoQixJQVNnQjtBQUFBLE9BUjdCQyxLQVE2QixHQVJyQkMsRUFBRSxDQUFDQyxLQUFILENBQVNDLEtBUVk7QUFBQSxPQVA3QkMsVUFPNkIsR0FQaEIsSUFPZ0I7QUFBQSxPQU43QkMsaUJBTTZCLEdBTlQsSUFNUztBQUFBLE9BTDdCQyxhQUs2QixHQUxiLElBS2E7QUFBQSxPQUo3QkMsZ0JBSTZCLEdBSlYsSUFJVTtBQUFBLE9BSDdCQyxnQkFHNkIsR0FIVixJQUdVO0FBQUEsT0FGN0JDLFVBRTZCLEdBRmhCLElBRWdCO0FBQ3pCLE9BQUtwQixjQUFMLEdBQXNCQSxjQUF0QjtBQUNBLE9BQUtDLFFBQUwsR0FBZ0IsSUFBSW9CLGdCQUFKLENBQVMsQ0FBVCxFQUFZLENBQVosRUFBZSxDQUFmLENBQWhCO0FBQ0EsT0FBS25CLFFBQUwsR0FBZ0IsSUFBSW1CLGdCQUFKLENBQVMsQ0FBVCxFQUFZLENBQVosRUFBZSxDQUFmLENBQWhCO0FBQ0EsT0FBS2xCLGdCQUFMLEdBQXdCLElBQUlrQixnQkFBSixDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixDQUF4QjtBQUNBLE9BQUtqQixnQkFBTCxHQUF3QixJQUFJaUIsZ0JBQUosQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLENBQWYsQ0FBeEI7QUFDQSxPQUFLaEIsZUFBTCxHQUF1QixJQUFJZ0IsZ0JBQUosQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLENBQWYsQ0FBdkI7QUFDQSxPQUFLZixjQUFMLEdBQXNCLElBQUllLGdCQUFKLENBQVMsQ0FBVCxFQUFZLENBQVosRUFBZSxDQUFmLENBQXRCO0FBQ0EsT0FBS2QsUUFBTCxHQUFnQixJQUFJYyxnQkFBSixDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixDQUFoQjtBQUNBLE9BQUtiLFNBQUwsR0FBaUIsSUFBSWEsZ0JBQUosQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLENBQWYsQ0FBakI7QUFDQSxPQUFLWixJQUFMLEdBQVksSUFBSVksZ0JBQUosQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLENBQWYsQ0FBWjtBQUNBLE9BQUtYLFVBQUwsR0FBa0JFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTQyxLQUFULENBQWVRLEtBQWYsRUFBbEI7QUFDQSxPQUFLWCxLQUFMLEdBQWFDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTQyxLQUFULENBQWVRLEtBQWYsRUFBYjtBQUNBLE9BQUtQLFVBQUwsR0FBa0IsQ0FBbEIsQ0FieUIsQ0FhSjs7QUFDckIsT0FBS0MsaUJBQUwsR0FBeUIsR0FBekI7QUFDQSxPQUFLQyxhQUFMLEdBQXFCLEdBQXJCO0FBQ0EsT0FBS0MsZ0JBQUwsR0FBd0IsR0FBeEI7QUFDQSxPQUFLQyxnQkFBTCxHQUF3QixHQUF4QjtBQUNBLE9BQUtDLFVBQUwsR0FBa0IsR0FBbEI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZlYzMsIENvbG9yIH0gZnJvbSAnLi4vLi4vdmFsdWUtdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWNsZSB7XG4gICAgcGFydGljbGVTeXN0ZW0gPSBudWxsO1xuICAgIHBvc2l0aW9uID0gbnVsbDtcbiAgICB2ZWxvY2l0eSA9IG51bGw7XG4gICAgYW5pbWF0ZWRWZWxvY2l0eSA9IG51bGw7XG4gICAgdWx0aW1hdGVWZWxvY2l0eSA9IG51bGw7XG4gICAgYW5ndWxhclZlbG9jaXR5ID0gbnVsbDtcbiAgICBheGlzT2ZSb3RhdGlvbiA9IG51bGw7XG4gICAgcm90YXRpb24gPSBudWxsO1xuICAgIHN0YXJ0U2l6ZSA9IG51bGw7XG4gICAgc2l6ZSA9IG51bGw7XG4gICAgc3RhcnRDb2xvciA9IG51bGw7XG4gICAgY29sb3IgPSBjYy5Db2xvci5XSElURTtcbiAgICByYW5kb21TZWVkID0gbnVsbDsgLy8gdWludFxuICAgIHJlbWFpbmluZ0xpZmV0aW1lID0gbnVsbDtcbiAgICBzdGFydExpZmV0aW1lID0gbnVsbDtcbiAgICBlbWl0QWNjdW11bGF0b3IwID0gbnVsbDtcbiAgICBlbWl0QWNjdW11bGF0b3IxID0gbnVsbDtcbiAgICBmcmFtZUluZGV4ID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yIChwYXJ0aWNsZVN5c3RlbSkge1xuICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtID0gcGFydGljbGVTeXN0ZW07XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBuZXcgVmVjMygwLCAwLCAwKTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IG5ldyBWZWMzKDAsIDAsIDApO1xuICAgICAgICB0aGlzLmFuaW1hdGVkVmVsb2NpdHkgPSBuZXcgVmVjMygwLCAwLCAwKTtcbiAgICAgICAgdGhpcy51bHRpbWF0ZVZlbG9jaXR5ID0gbmV3IFZlYzMoMCwgMCwgMCk7XG4gICAgICAgIHRoaXMuYW5ndWxhclZlbG9jaXR5ID0gbmV3IFZlYzMoMCwgMCwgMCk7XG4gICAgICAgIHRoaXMuYXhpc09mUm90YXRpb24gPSBuZXcgVmVjMygwLCAwLCAwKTtcbiAgICAgICAgdGhpcy5yb3RhdGlvbiA9IG5ldyBWZWMzKDAsIDAsIDApO1xuICAgICAgICB0aGlzLnN0YXJ0U2l6ZSA9IG5ldyBWZWMzKDAsIDAsIDApO1xuICAgICAgICB0aGlzLnNpemUgPSBuZXcgVmVjMygwLCAwLCAwKTtcbiAgICAgICAgdGhpcy5zdGFydENvbG9yID0gY2MuQ29sb3IuV0hJVEUuY2xvbmUoKTtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNjLkNvbG9yLldISVRFLmNsb25lKCk7XG4gICAgICAgIHRoaXMucmFuZG9tU2VlZCA9IDA7IC8vIHVpbnRcbiAgICAgICAgdGhpcy5yZW1haW5pbmdMaWZldGltZSA9IDAuMDtcbiAgICAgICAgdGhpcy5zdGFydExpZmV0aW1lID0gMC4wO1xuICAgICAgICB0aGlzLmVtaXRBY2N1bXVsYXRvcjAgPSAwLjA7XG4gICAgICAgIHRoaXMuZW1pdEFjY3VtdWxhdG9yMSA9IDAuMDtcbiAgICAgICAgdGhpcy5mcmFtZUluZGV4ID0gMC4wO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9