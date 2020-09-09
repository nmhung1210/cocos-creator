
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/actions.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _quat = _interopRequireDefault(require("../value-types/quat"));

var _vec = _interopRequireDefault(require("../value-types/vec3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _quat_tmp = cc.quat();

var _vec3_tmp = cc.v3();
/*
 * Rotates a Node object to a certain angle by modifying its quaternion property. <br/>
 * The direction will be decided by the shortest angle.
 * @class Rotate3DTo
 * @extends ActionInterval
 * @param {Number} duration duration in seconds
 * @param {Number|Vec3} dstAngleX dstAngleX in degrees.
 * @param {Number} [dstAngleY] dstAngleY in degrees.
 * @param {Number} [dstAngleZ] dstAngleZ in degrees.
 * @example
 * var rotate3DTo = new cc.Rotate3DTo(2, cc.v3(0, 180, 0));
 */


cc.Rotate3DTo = cc.Class({
  name: 'cc.Rotate3DTo',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, dstAngleX, dstAngleY, dstAngleZ) {
    this._startQuat = cc.quat();
    this._dstQuat = cc.quat();
    dstAngleX !== undefined && this.initWithDuration(duration, dstAngleX, dstAngleY, dstAngleZ);
  },

  /*
   * Initializes the action.
   * @param {Number} duration
   * @param {Number|Vec3|Quat} dstAngleX
   * @param {Number} dstAngleY
   * @param {Number} dstAngleZ
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, dstAngleX, dstAngleY, dstAngleZ) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      var dstQuat = this._dstQuat;

      if (dstAngleX instanceof cc.Quat) {
        dstQuat.set(dstAngleX);
      } else {
        if (dstAngleX instanceof cc.Vec3) {
          dstAngleY = dstAngleX.y;
          dstAngleZ = dstAngleX.z;
          dstAngleX = dstAngleX.x;
        } else {
          dstAngleY = dstAngleY || 0;
          dstAngleZ = dstAngleZ || 0;
        }

        _quat["default"].fromEuler(dstQuat, dstAngleX, dstAngleY, dstAngleZ);
      }

      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.Rotate3DTo();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._dstQuat);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);

    this._startQuat.set(target.quat);
  },
  reverse: function reverse() {
    cc.logID(1016);
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    if (this.target) {
      _quat["default"].slerp(_quat_tmp, this._startQuat, this._dstQuat, dt);

      this.target.setRotation(_quat_tmp);
    }
  }
});
/**
 * !#en
 * Rotates a Node object to a certain angle by modifying its quternion property. <br/>
 * The direction will be decided by the shortest angle.
 * !#zh 旋转到目标角度，通过逐帧修改它的 quternion 属性，旋转方向将由最短的角度决定。
 * @method rotate3DTo
 * @param {Number} duration duration in seconds
 * @param {Number|Vec3|Quat} dstAngleX dstAngleX in degrees.
 * @param {Number} [dstAngleY] dstAngleY in degrees.
 * @param {Number} [dstAngleZ] dstAngleZ in degrees.
 * @return {ActionInterval}
 * @example
 * // example
 * var rotate3DTo = cc.rotate3DTo(2, cc.v3(0, 180, 0));
 */

cc.rotate3DTo = function (duration, dstAngleX, dstAngleY, dstAngleZ) {
  return new cc.Rotate3DTo(duration, dstAngleX, dstAngleY, dstAngleZ);
};
/*
 * Rotates a Node object counter clockwise a number of degrees by modifying its quaternion property.
 * Relative to its properties to modify.
 * @class Rotate3DBy
 * @extends ActionInterval
 * @param {Number} duration duration in seconds
 * @param {Number|Vec3} deltaAngleX deltaAngleX in degrees
 * @param {Number} [deltaAngleY] deltaAngleY in degrees
 * @param {Number} [deltaAngleZ] deltaAngleZ in degrees
 * @example
 * var actionBy = new cc.Rotate3DBy(2, cc.v3(0, 360, 0));
 */


cc.Rotate3DBy = cc.Class({
  name: 'cc.Rotate3DBy',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, deltaAngleX, deltaAngleY, deltaAngleZ) {
    this._startQuat = cc.quat();
    this._dstQuat = cc.quat();
    this._deltaAngle = cc.v3();
    deltaAngleX !== undefined && this.initWithDuration(duration, deltaAngleX, deltaAngleY, deltaAngleZ);
  },

  /*
   * Initializes the action.
   * @param {Number} duration duration in seconds
   * @param {Number|Vec3} deltaAngleX deltaAngleX in degrees
   * @param {Number} [deltaAngleY=] deltaAngleY in degrees
   * @param {Number} [deltaAngleZ=] deltaAngleZ in degrees
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, deltaAngleX, deltaAngleY, deltaAngleZ) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      if (deltaAngleX instanceof cc.Vec3) {
        deltaAngleY = deltaAngleX.y;
        deltaAngleZ = deltaAngleX.z;
        deltaAngleX = deltaAngleX.x;
      } else {
        deltaAngleY = deltaAngleY || 0;
        deltaAngleZ = deltaAngleZ || 0;
      }

      _vec["default"].set(this._deltaAngle, deltaAngleX, deltaAngleY, deltaAngleZ);

      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.Rotate3DBy();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._angle);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var startAngle = target.eulerAngles;
    var deltaAngle = this._deltaAngle;

    _quat["default"].fromEuler(this._dstQuat, startAngle.x + deltaAngle.x, startAngle.y + deltaAngle.y, startAngle.z + deltaAngle.z);

    this._startQuat.set(target.quat);
  },
  update: function () {
    var RAD = Math.PI / 180;
    return function (dt) {
      dt = this._computeEaseTime(dt);

      if (this.target) {
        _quat["default"].slerp(_quat_tmp, this._startQuat, this._dstQuat, dt);

        this.target.setRotation(_quat_tmp);
      }
    };
  }(),
  reverse: function reverse() {
    var angle = this._angle;
    _vec3_tmp.x = -angle.x;
    _vec3_tmp.y = -angle.y;
    _vec3_tmp.z = -angle.z;
    var action = new cc.Rotate3DBy(this._duration, _vec3_tmp);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en
 * Rotates a Node object counter clockwise a number of degrees by modifying its quaternion property.
 * Relative to its properties to modify.
 * !#zh 旋转指定的 3D 角度。
 * @method rotate3DBy
 * @param {Number} duration duration in seconds
 * @param {Number|Vec3} deltaAngleX deltaAngleX in degrees
 * @param {Number} [deltaAngleY] deltaAngleY in degrees
 * @param {Number} [deltaAngleZ] deltaAngleZ in degrees
 * @return {ActionInterval}
 * @example
 * // example
 * var actionBy = cc.rotate3DBy(2, cc.v3(0, 360, 0));
 */

cc.rotate3DBy = function (duration, deltaAngleX, deltaAngleY, deltaAngleZ) {
  return new cc.Rotate3DBy(duration, deltaAngleX, deltaAngleY, deltaAngleZ);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL2FjdGlvbnMuanMiXSwibmFtZXMiOlsiX3F1YXRfdG1wIiwiY2MiLCJxdWF0IiwiX3ZlYzNfdG1wIiwidjMiLCJSb3RhdGUzRFRvIiwiQ2xhc3MiLCJuYW1lIiwiQWN0aW9uSW50ZXJ2YWwiLCJjdG9yIiwiZHVyYXRpb24iLCJkc3RBbmdsZVgiLCJkc3RBbmdsZVkiLCJkc3RBbmdsZVoiLCJfc3RhcnRRdWF0IiwiX2RzdFF1YXQiLCJ1bmRlZmluZWQiLCJpbml0V2l0aER1cmF0aW9uIiwicHJvdG90eXBlIiwiY2FsbCIsImRzdFF1YXQiLCJRdWF0Iiwic2V0IiwiVmVjMyIsInkiLCJ6IiwieCIsImZyb21FdWxlciIsImNsb25lIiwiYWN0aW9uIiwiX2Nsb25lRGVjb3JhdGlvbiIsIl9kdXJhdGlvbiIsInN0YXJ0V2l0aFRhcmdldCIsInRhcmdldCIsInJldmVyc2UiLCJsb2dJRCIsInVwZGF0ZSIsImR0IiwiX2NvbXB1dGVFYXNlVGltZSIsInNsZXJwIiwic2V0Um90YXRpb24iLCJyb3RhdGUzRFRvIiwiUm90YXRlM0RCeSIsImRlbHRhQW5nbGVYIiwiZGVsdGFBbmdsZVkiLCJkZWx0YUFuZ2xlWiIsIl9kZWx0YUFuZ2xlIiwiX2FuZ2xlIiwic3RhcnRBbmdsZSIsImV1bGVyQW5nbGVzIiwiZGVsdGFBbmdsZSIsIlJBRCIsIk1hdGgiLCJQSSIsImFuZ2xlIiwiX3JldmVyc2VFYXNlTGlzdCIsInJvdGF0ZTNEQnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFDQTs7OztBQUVBLElBQUlBLFNBQVMsR0FBR0MsRUFBRSxDQUFDQyxJQUFILEVBQWhCOztBQUNBLElBQUlDLFNBQVMsR0FBR0YsRUFBRSxDQUFDRyxFQUFILEVBQWhCO0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBWUFILEVBQUUsQ0FBQ0ksVUFBSCxHQUFnQkosRUFBRSxDQUFDSyxLQUFILENBQVM7QUFDckJDLEVBQUFBLElBQUksRUFBRSxl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UDtBQUNIO0FBMUVvQixDQUFULENBQWhCO0FBNkVBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZUE1QixFQUFFLENBQUN1RCxVQUFILEdBQWdCLFVBQVU5QyxRQUFWLEVBQW9CaUMsV0FBcEIsRUFBaUNDLFdBQWpDLEVBQThDQyxXQUE5QyxFQUEyRDtBQUN2RSxTQUFPLElBQUk1QyxFQUFFLENBQUN5QyxVQUFQLENBQWtCaEMsUUFBbEIsRUFBNEJpQyxXQUE1QixFQUF5Q0MsV0FBekMsRUFBc0RDLFdBQXRELENBQVA7QUFDSCxDQUZEIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgUXVhdCBmcm9tICcuLi92YWx1ZS10eXBlcy9xdWF0JztcbmltcG9ydCBWZWMzIGZyb20gJy4uL3ZhbHVlLXR5cGVzL3ZlYzMnO1xuXG5sZXQgX3F1YXRfdG1wID0gY2MucXVhdCgpO1xubGV0IF92ZWMzX3RtcCA9IGNjLnYzKCk7XG5cbi8qXG4gKiBSb3RhdGVzIGEgTm9kZSBvYmplY3QgdG8gYSBjZXJ0YWluIGFuZ2xlIGJ5IG1vZGlmeWluZyBpdHMgcXVhdGVybmlvbiBwcm9wZXJ0eS4gPGJyLz5cbiAqIFRoZSBkaXJlY3Rpb24gd2lsbCBiZSBkZWNpZGVkIGJ5IHRoZSBzaG9ydGVzdCBhbmdsZS5cbiAqIEBjbGFzcyBSb3RhdGUzRFRvXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnRlcnZhbFxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHNcbiAqIEBwYXJhbSB7TnVtYmVyfFZlYzN9IGRzdEFuZ2xlWCBkc3RBbmdsZVggaW4gZGVncmVlcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbZHN0QW5nbGVZXSBkc3RBbmdsZVkgaW4gZGVncmVlcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbZHN0QW5nbGVaXSBkc3RBbmdsZVogaW4gZGVncmVlcy5cbiAqIEBleGFtcGxlXG4gKiB2YXIgcm90YXRlM0RUbyA9IG5ldyBjYy5Sb3RhdGUzRFRvKDIsIGNjLnYzKDAsIDE4MCwgMCkpO1xuICovXG5jYy5Sb3RhdGUzRFRvID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5Sb3RhdGUzRFRvJyxcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnRlcnZhbCxcblxuICAgIGN0b3I6ZnVuY3Rpb24gKGR1cmF0aW9uLCBkc3RBbmdsZVgsIGRzdEFuZ2xlWSwgZHN0QW5nbGVaKSB7XG4gICAgICAgIHRoaXMuX3N0YXJ0UXVhdCA9IGNjLnF1YXQoKTtcbiAgICAgICAgdGhpcy5fZHN0UXVhdCA9IGNjLnF1YXQoKTtcblxuXHRcdGRzdEFuZ2xlWCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuaW5pdFdpdGhEdXJhdGlvbihkdXJhdGlvbiwgZHN0QW5nbGVYLCBkc3RBbmdsZVksIGRzdEFuZ2xlWik7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGFjdGlvbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cbiAgICAgKiBAcGFyYW0ge051bWJlcnxWZWMzfFF1YXR9IGRzdEFuZ2xlWFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkc3RBbmdsZVlcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHN0QW5nbGVaXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpbml0V2l0aER1cmF0aW9uOmZ1bmN0aW9uIChkdXJhdGlvbiwgZHN0QW5nbGVYLCBkc3RBbmdsZVksIGRzdEFuZ2xlWikge1xuICAgICAgICBpZiAoY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCBkdXJhdGlvbikpIHtcbiAgICAgICAgICAgIGxldCBkc3RRdWF0ID0gdGhpcy5fZHN0UXVhdDtcbiAgICAgICAgICAgIGlmIChkc3RBbmdsZVggaW5zdGFuY2VvZiBjYy5RdWF0KSB7XG4gICAgICAgICAgICAgICAgZHN0UXVhdC5zZXQoZHN0QW5nbGVYKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChkc3RBbmdsZVggaW5zdGFuY2VvZiBjYy5WZWMzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRzdEFuZ2xlWSA9IGRzdEFuZ2xlWC55O1xuICAgICAgICAgICAgICAgICAgICBkc3RBbmdsZVogPSBkc3RBbmdsZVguejtcbiAgICAgICAgICAgICAgICAgICAgZHN0QW5nbGVYID0gZHN0QW5nbGVYLng7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkc3RBbmdsZVkgPSBkc3RBbmdsZVkgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgZHN0QW5nbGVaID0gZHN0QW5nbGVaIHx8IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFF1YXQuZnJvbUV1bGVyKGRzdFF1YXQsIGRzdEFuZ2xlWCwgZHN0QW5nbGVZLCBkc3RBbmdsZVopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuUm90YXRlM0RUbygpO1xuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIHRoaXMuX2RzdFF1YXQpO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH0sXG5cbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fc3RhcnRRdWF0LnNldCh0YXJnZXQucXVhdCk7XG4gICAgfSxcblxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5sb2dJRCgxMDE2KTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xuICAgICAgICBkdCA9IHRoaXMuX2NvbXB1dGVFYXNlVGltZShkdCk7XG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgUXVhdC5zbGVycChfcXVhdF90bXAsIHRoaXMuX3N0YXJ0UXVhdCwgdGhpcy5fZHN0UXVhdCwgZHQpO1xuICAgICAgICAgICAgdGhpcy50YXJnZXQuc2V0Um90YXRpb24oX3F1YXRfdG1wKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW5cbiAqIFJvdGF0ZXMgYSBOb2RlIG9iamVjdCB0byBhIGNlcnRhaW4gYW5nbGUgYnkgbW9kaWZ5aW5nIGl0cyBxdXRlcm5pb24gcHJvcGVydHkuIDxici8+XG4gKiBUaGUgZGlyZWN0aW9uIHdpbGwgYmUgZGVjaWRlZCBieSB0aGUgc2hvcnRlc3QgYW5nbGUuXG4gKiAhI3poIOaXi+i9rOWIsOebruagh+inkuW6pu+8jOmAmui/h+mAkOW4p+S/ruaUueWug+eahCBxdXRlcm5pb24g5bGe5oCn77yM5peL6L2s5pa55ZCR5bCG55Sx5pyA55+t55qE6KeS5bqm5Yaz5a6a44CCXG4gKiBAbWV0aG9kIHJvdGF0ZTNEVG9cbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiBkdXJhdGlvbiBpbiBzZWNvbmRzXG4gKiBAcGFyYW0ge051bWJlcnxWZWMzfFF1YXR9IGRzdEFuZ2xlWCBkc3RBbmdsZVggaW4gZGVncmVlcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbZHN0QW5nbGVZXSBkc3RBbmdsZVkgaW4gZGVncmVlcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBbZHN0QW5nbGVaXSBkc3RBbmdsZVogaW4gZGVncmVlcy5cbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxuICogQGV4YW1wbGVcbiAqIC8vIGV4YW1wbGVcbiAqIHZhciByb3RhdGUzRFRvID0gY2Mucm90YXRlM0RUbygyLCBjYy52MygwLCAxODAsIDApKTtcbiAqL1xuY2Mucm90YXRlM0RUbyA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgZHN0QW5nbGVYLCBkc3RBbmdsZVksIGRzdEFuZ2xlWikge1xuICAgIHJldHVybiBuZXcgY2MuUm90YXRlM0RUbyhkdXJhdGlvbiwgZHN0QW5nbGVYLCBkc3RBbmdsZVksIGRzdEFuZ2xlWik7XG59O1xuXG5cbi8qXG4gKiBSb3RhdGVzIGEgTm9kZSBvYmplY3QgY291bnRlciBjbG9ja3dpc2UgYSBudW1iZXIgb2YgZGVncmVlcyBieSBtb2RpZnlpbmcgaXRzIHF1YXRlcm5pb24gcHJvcGVydHkuXG4gKiBSZWxhdGl2ZSB0byBpdHMgcHJvcGVydGllcyB0byBtb2RpZnkuXG4gKiBAY2xhc3MgUm90YXRlM0RCeVxuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiBkdXJhdGlvbiBpbiBzZWNvbmRzXG4gKiBAcGFyYW0ge051bWJlcnxWZWMzfSBkZWx0YUFuZ2xlWCBkZWx0YUFuZ2xlWCBpbiBkZWdyZWVzXG4gKiBAcGFyYW0ge051bWJlcn0gW2RlbHRhQW5nbGVZXSBkZWx0YUFuZ2xlWSBpbiBkZWdyZWVzXG4gKiBAcGFyYW0ge051bWJlcn0gW2RlbHRhQW5nbGVaXSBkZWx0YUFuZ2xlWiBpbiBkZWdyZWVzXG4gKiBAZXhhbXBsZVxuICogdmFyIGFjdGlvbkJ5ID0gbmV3IGNjLlJvdGF0ZTNEQnkoMiwgY2MudjMoMCwgMzYwLCAwKSk7XG4gKi9cbmNjLlJvdGF0ZTNEQnkgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlJvdGF0ZTNEQnknLFxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxuXG4gICAgY3RvcjogZnVuY3Rpb24gKGR1cmF0aW9uLCBkZWx0YUFuZ2xlWCwgZGVsdGFBbmdsZVksIGRlbHRhQW5nbGVaKSB7XG4gICAgICAgIHRoaXMuX3N0YXJ0UXVhdCA9IGNjLnF1YXQoKTtcbiAgICAgICAgdGhpcy5fZHN0UXVhdCA9IGNjLnF1YXQoKTtcbiAgICAgICAgdGhpcy5fZGVsdGFBbmdsZSA9IGNjLnYzKCk7XG5cdFx0ZGVsdGFBbmdsZVggIT09IHVuZGVmaW5lZCAmJiB0aGlzLmluaXRXaXRoRHVyYXRpb24oZHVyYXRpb24sIGRlbHRhQW5nbGVYLCBkZWx0YUFuZ2xlWSwgZGVsdGFBbmdsZVopO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBhY3Rpb24uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHNcbiAgICAgKiBAcGFyYW0ge051bWJlcnxWZWMzfSBkZWx0YUFuZ2xlWCBkZWx0YUFuZ2xlWCBpbiBkZWdyZWVzXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtkZWx0YUFuZ2xlWT1dIGRlbHRhQW5nbGVZIGluIGRlZ3JlZXNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2RlbHRhQW5nbGVaPV0gZGVsdGFBbmdsZVogaW4gZGVncmVlc1xuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaW5pdFdpdGhEdXJhdGlvbjpmdW5jdGlvbiAoZHVyYXRpb24sIGRlbHRhQW5nbGVYLCBkZWx0YUFuZ2xlWSwgZGVsdGFBbmdsZVopIHtcbiAgICAgICAgaWYgKGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgZHVyYXRpb24pKSB7XG4gICAgICAgICAgICBpZiAoZGVsdGFBbmdsZVggaW5zdGFuY2VvZiBjYy5WZWMzKSB7XG4gICAgICAgICAgICAgICAgZGVsdGFBbmdsZVkgPSBkZWx0YUFuZ2xlWC55O1xuICAgICAgICAgICAgICAgIGRlbHRhQW5nbGVaID0gZGVsdGFBbmdsZVguejtcbiAgICAgICAgICAgICAgICBkZWx0YUFuZ2xlWCA9IGRlbHRhQW5nbGVYLng7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWx0YUFuZ2xlWSA9IGRlbHRhQW5nbGVZIHx8IDA7XG4gICAgICAgICAgICAgICAgZGVsdGFBbmdsZVogPSBkZWx0YUFuZ2xlWiB8fCAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBWZWMzLnNldCh0aGlzLl9kZWx0YUFuZ2xlLCBkZWx0YUFuZ2xlWCwgZGVsdGFBbmdsZVksIGRlbHRhQW5nbGVaKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLlJvdGF0ZTNEQnkoKTtcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XG4gICAgICAgIGFjdGlvbi5pbml0V2l0aER1cmF0aW9uKHRoaXMuX2R1cmF0aW9uLCB0aGlzLl9hbmdsZSk7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfSxcblxuICAgIHN0YXJ0V2l0aFRhcmdldDpmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgICBcbiAgICAgICAgbGV0IHN0YXJ0QW5nbGUgPSB0YXJnZXQuZXVsZXJBbmdsZXM7XG4gICAgICAgIGxldCBkZWx0YUFuZ2xlID0gdGhpcy5fZGVsdGFBbmdsZTtcbiAgICAgICAgUXVhdC5mcm9tRXVsZXIodGhpcy5fZHN0UXVhdCwgc3RhcnRBbmdsZS54ICsgZGVsdGFBbmdsZS54LCBzdGFydEFuZ2xlLnkgKyBkZWx0YUFuZ2xlLnksIHN0YXJ0QW5nbGUueiArIGRlbHRhQW5nbGUueik7XG5cbiAgICAgICAgdGhpcy5fc3RhcnRRdWF0LnNldCh0YXJnZXQucXVhdCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogKGZ1bmN0aW9uKCl7XG4gICAgICAgIGxldCBSQUQgPSBNYXRoLlBJIC8gMTgwO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgICAgICBkdCA9IHRoaXMuX2NvbXB1dGVFYXNlVGltZShkdCk7XG4gICAgICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBRdWF0LnNsZXJwKF9xdWF0X3RtcCwgdGhpcy5fc3RhcnRRdWF0LCB0aGlzLl9kc3RRdWF0LCBkdCk7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQuc2V0Um90YXRpb24oX3F1YXRfdG1wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKCksXG5cbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGFuZ2xlID0gdGhpcy5fYW5nbGU7XG4gICAgICAgIF92ZWMzX3RtcC54ID0gLWFuZ2xlLng7XG4gICAgICAgIF92ZWMzX3RtcC55ID0gLWFuZ2xlLnk7XG4gICAgICAgIF92ZWMzX3RtcC56ID0gLWFuZ2xlLno7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuUm90YXRlM0RCeSh0aGlzLl9kdXJhdGlvbiwgX3ZlYzNfdG1wKTtcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XG4gICAgICAgIHRoaXMuX3JldmVyc2VFYXNlTGlzdChhY3Rpb24pO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW5cbiAqIFJvdGF0ZXMgYSBOb2RlIG9iamVjdCBjb3VudGVyIGNsb2Nrd2lzZSBhIG51bWJlciBvZiBkZWdyZWVzIGJ5IG1vZGlmeWluZyBpdHMgcXVhdGVybmlvbiBwcm9wZXJ0eS5cbiAqIFJlbGF0aXZlIHRvIGl0cyBwcm9wZXJ0aWVzIHRvIG1vZGlmeS5cbiAqICEjemgg5peL6L2s5oyH5a6a55qEIDNEIOinkuW6puOAglxuICogQG1ldGhvZCByb3RhdGUzREJ5XG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gZHVyYXRpb24gaW4gc2Vjb25kc1xuICogQHBhcmFtIHtOdW1iZXJ8VmVjM30gZGVsdGFBbmdsZVggZGVsdGFBbmdsZVggaW4gZGVncmVlc1xuICogQHBhcmFtIHtOdW1iZXJ9IFtkZWx0YUFuZ2xlWV0gZGVsdGFBbmdsZVkgaW4gZGVncmVlc1xuICogQHBhcmFtIHtOdW1iZXJ9IFtkZWx0YUFuZ2xlWl0gZGVsdGFBbmdsZVogaW4gZGVncmVlc1xuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XG4gKiBAZXhhbXBsZVxuICogLy8gZXhhbXBsZVxuICogdmFyIGFjdGlvbkJ5ID0gY2Mucm90YXRlM0RCeSgyLCBjYy52MygwLCAzNjAsIDApKTtcbiAqL1xuY2Mucm90YXRlM0RCeSA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgZGVsdGFBbmdsZVgsIGRlbHRhQW5nbGVZLCBkZWx0YUFuZ2xlWikge1xuICAgIHJldHVybiBuZXcgY2MuUm90YXRlM0RCeShkdXJhdGlvbiwgZGVsdGFBbmdsZVgsIGRlbHRhQW5nbGVZLCBkZWx0YUFuZ2xlWik7XG59O1xuXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==