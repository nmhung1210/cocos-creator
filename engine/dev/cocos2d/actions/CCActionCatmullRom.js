
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/actions/CCActionCatmullRom.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2008 Radu Gruian
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011 Vit Valentin
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 Orignal code by Radu Gruian: http://www.codeproject.com/Articles/30838/Overhauser-Catmull-Rom-Splines-for-Camera-Animatio.So

 Adapted to cocos2d-x by Vit Valentin

 Adapted from cocos2d-x to cocos2d-iphone by Ricardo Quesada
 ****************************************************************************/

/**
 * @module cc
 */

/*
 * Returns the Cardinal Spline position for a given set of control points, tension and time. <br />
 * CatmullRom Spline formula. <br />
 * s(-ttt + 2tt - t)P1 + s(-ttt + tt)P2 + (2ttt - 3tt + 1)P2 + s(ttt - 2tt + t)P3 + (-2ttt + 3tt)P3 + s(ttt - tt)P4
 *
 * @method cardinalSplineAt
 * @param {Vec2} p0
 * @param {Vec2} p1
 * @param {Vec2} p2
 * @param {Vec2} p3
 * @param {Number} tension
 * @param {Number} t
 * @return {Vec2}
 */
function cardinalSplineAt(p0, p1, p2, p3, tension, t) {
  var t2 = t * t;
  var t3 = t2 * t;
  /*
   * Formula: s(-ttt + 2tt - t)P1 + s(-ttt + tt)P2 + (2ttt - 3tt + 1)P2 + s(ttt - 2tt + t)P3 + (-2ttt + 3tt)P3 + s(ttt - tt)P4
   */

  var s = (1 - tension) / 2;
  var b1 = s * (-t3 + 2 * t2 - t); // s(-t3 + 2 t2 - t)P1

  var b2 = s * (-t3 + t2) + (2 * t3 - 3 * t2 + 1); // s(-t3 + t2)P2 + (2 t3 - 3 t2 + 1)P2

  var b3 = s * (t3 - 2 * t2 + t) + (-2 * t3 + 3 * t2); // s(t3 - 2 t2 + t)P3 + (-2 t3 + 3 t2)P3

  var b4 = s * (t3 - t2); // s(t3 - t2)P4

  var x = p0.x * b1 + p1.x * b2 + p2.x * b3 + p3.x * b4;
  var y = p0.y * b1 + p1.y * b2 + p2.y * b3 + p3.y * b4;
  return cc.v2(x, y);
}

;
/*
 * returns a point from the array
 * @method getControlPointAt
 * @param {Array} controlPoints
 * @param {Number} pos
 * @return {Array}
 */

function getControlPointAt(controlPoints, pos) {
  var p = Math.min(controlPoints.length - 1, Math.max(pos, 0));
  return controlPoints[p];
}

;

function reverseControlPoints(controlPoints) {
  var newArray = [];

  for (var i = controlPoints.length - 1; i >= 0; i--) {
    newArray.push(cc.v2(controlPoints[i].x, controlPoints[i].y));
  }

  return newArray;
}

function cloneControlPoints(controlPoints) {
  var newArray = [];

  for (var i = 0; i < controlPoints.length; i++) {
    newArray.push(cc.v2(controlPoints[i].x, controlPoints[i].y));
  }

  return newArray;
}
/*
 * Cardinal Spline path. http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline
 * Absolute coordinates.
 *
 * @class CardinalSplineTo
 * @extends ActionInterval
 *
 * @param {Number} duration
 * @param {Array} points array of control points
 * @param {Number} tension
 *
 * @example
 * //create a cc.CardinalSplineTo
 * var action1 = cc.cardinalSplineTo(3, array, 0);
 */


cc.CardinalSplineTo = cc.Class({
  name: 'cc.CardinalSplineTo',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, points, tension) {
    /* Array of control points */
    this._points = [];
    this._deltaT = 0;
    this._tension = 0;
    this._previousPosition = null;
    this._accumulatedDiff = null;
    tension !== undefined && cc.CardinalSplineTo.prototype.initWithDuration.call(this, duration, points, tension);
  },
  initWithDuration: function initWithDuration(duration, points, tension) {
    if (!points || points.length === 0) {
      cc.errorID(1024);
      return false;
    }

    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      this.setPoints(points);
      this._tension = tension;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.CardinalSplineTo();
    action.initWithDuration(this._duration, cloneControlPoints(this._points), this._tension);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target); // Issue #1441 from cocos2d-iphone

    this._deltaT = 1 / (this._points.length - 1);
    this._previousPosition = cc.v2(this.target.x, this.target.y);
    this._accumulatedDiff = cc.v2(0, 0);
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);
    var p, lt;
    var ps = this._points; // eg.
    // p..p..p..p..p..p..p
    // 1..2..3..4..5..6..7
    // want p to be 1, 2, 3, 4, 5, 6

    if (dt === 1) {
      p = ps.length - 1;
      lt = 1;
    } else {
      var locDT = this._deltaT;
      p = 0 | dt / locDT;
      lt = (dt - locDT * p) / locDT;
    }

    var newPos = cardinalSplineAt(getControlPointAt(ps, p - 1), getControlPointAt(ps, p - 0), getControlPointAt(ps, p + 1), getControlPointAt(ps, p + 2), this._tension, lt);

    if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
      var tempX, tempY;
      tempX = this.target.x - this._previousPosition.x;
      tempY = this.target.y - this._previousPosition.y;

      if (tempX !== 0 || tempY !== 0) {
        var locAccDiff = this._accumulatedDiff;
        tempX = locAccDiff.x + tempX;
        tempY = locAccDiff.y + tempY;
        locAccDiff.x = tempX;
        locAccDiff.y = tempY;
        newPos.x += tempX;
        newPos.y += tempY;
      }
    }

    this.updatePosition(newPos);
  },
  reverse: function reverse() {
    var reversePoints = reverseControlPoints(this._points);
    return cc.cardinalSplineTo(this._duration, reversePoints, this._tension);
  },

  /*
   * update position of target
   * @method updatePosition
   * @param {Vec2} newPos
   */
  updatePosition: function updatePosition(newPos) {
    this.target.setPosition(newPos);
    this._previousPosition = newPos;
  },

  /*
   * Points getter
   * @method getPoints
   * @return {Array}
   */
  getPoints: function getPoints() {
    return this._points;
  },

  /**
   * Points setter
   * @method setPoints
   * @param {Array} points
   */
  setPoints: function setPoints(points) {
    this._points = points;
  }
});
/**
 * !#en Creates an action with a Cardinal Spline array of points and tension.
 * !#zh 按基数样条曲线轨迹移动到目标位置。
 * @method cardinalSplineTo
 * @param {Number} duration
 * @param {Array} points array of control points
 * @param {Number} tension
 * @return {ActionInterval}
 *
 * @example
 * //create a cc.CardinalSplineTo
 * var action1 = cc.cardinalSplineTo(3, array, 0);
 */

cc.cardinalSplineTo = function (duration, points, tension) {
  return new cc.CardinalSplineTo(duration, points, tension);
};
/*
 * Cardinal Spline path. http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline
 * Relative coordinates.
 *
 * @class CardinalSplineBy
 * @extends CardinalSplineTo
 *
 * @param {Number} duration
 * @param {Array} points
 * @param {Number} tension
 *
 * @example
 * //create a cc.CardinalSplineBy
 * var action1 = cc.cardinalSplineBy(3, array, 0);
 */


cc.CardinalSplineBy = cc.Class({
  name: 'cc.CardinalSplineBy',
  "extends": cc.CardinalSplineTo,
  ctor: function ctor(duration, points, tension) {
    this._startPosition = cc.v2(0, 0);
    tension !== undefined && this.initWithDuration(duration, points, tension);
  },
  startWithTarget: function startWithTarget(target) {
    cc.CardinalSplineTo.prototype.startWithTarget.call(this, target);
    this._startPosition.x = target.x;
    this._startPosition.y = target.y;
  },
  reverse: function reverse() {
    var copyConfig = this._points.slice();

    var current; //
    // convert "absolutes" to "diffs"
    //

    var p = copyConfig[0];

    for (var i = 1; i < copyConfig.length; ++i) {
      current = copyConfig[i];
      copyConfig[i] = current.sub(p);
      p = current;
    } // convert to "diffs" to "reverse absolute"


    var reverseArray = reverseControlPoints(copyConfig); // 1st element (which should be 0,0) should be here too

    p = reverseArray[reverseArray.length - 1];
    reverseArray.pop();
    p.x = -p.x;
    p.y = -p.y;
    reverseArray.unshift(p);

    for (var i = 1; i < reverseArray.length; ++i) {
      current = reverseArray[i];
      current.x = -current.x;
      current.y = -current.y;
      current.x += p.x;
      current.y += p.y;
      reverseArray[i] = current;
      p = current;
    }

    return cc.cardinalSplineBy(this._duration, reverseArray, this._tension);
  },

  /**
   * update position of target
   * @method updatePosition
   * @param {Vec2} newPos
   */
  updatePosition: function updatePosition(newPos) {
    var pos = this._startPosition;
    var posX = newPos.x + pos.x;
    var posY = newPos.y + pos.y;
    this._previousPosition.x = posX;
    this._previousPosition.y = posY;
    this.target.setPosition(posX, posY);
  },
  clone: function clone() {
    var a = new cc.CardinalSplineBy();
    a.initWithDuration(this._duration, cloneControlPoints(this._points), this._tension);
    return a;
  }
});
/**
 * !#en Creates an action with a Cardinal Spline array of points and tension.
 * !#zh 按基数样条曲线轨迹移动指定的距离。
 * @method cardinalSplineBy
 * @param {Number} duration
 * @param {Array} points
 * @param {Number} tension
 *
 * @return {ActionInterval}
 */

cc.cardinalSplineBy = function (duration, points, tension) {
  return new cc.CardinalSplineBy(duration, points, tension);
};
/*
 * An action that moves the target with a CatmullRom curve to a destination point.<br/>
 * A Catmull Rom is a Cardinal Spline with a tension of 0.5.  <br/>
 * http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull.E2.80.93Rom_spline
 * Absolute coordinates.
 *
 * @class CatmullRomTo
 * @extends CardinalSplineTo
 *
 * @param {Number} dt
 * @param {Array} points
 *
 * @example
 * var action1 = cc.catmullRomTo(3, array);
 */


cc.CatmullRomTo = cc.Class({
  name: 'cc.CatmullRomTo',
  "extends": cc.CardinalSplineTo,
  ctor: function ctor(dt, points) {
    points && this.initWithDuration(dt, points);
  },
  initWithDuration: function initWithDuration(dt, points) {
    return cc.CardinalSplineTo.prototype.initWithDuration.call(this, dt, points, 0.5);
  },
  clone: function clone() {
    var action = new cc.CatmullRomTo();
    action.initWithDuration(this._duration, cloneControlPoints(this._points));
    return action;
  }
});
/**
 * !#en Creates an action with a Cardinal Spline array of points and tension.
 * !#zh 按 Catmull Rom 样条曲线轨迹移动到目标位置。
 * @method catmullRomTo
 * @param {Number} dt
 * @param {Array} points
 * @return {ActionInterval}
 *
 * @example
 * var action1 = cc.catmullRomTo(3, array);
 */

cc.catmullRomTo = function (dt, points) {
  return new cc.CatmullRomTo(dt, points);
};
/*
 * An action that moves the target with a CatmullRom curve by a certain distance.  <br/>
 * A Catmull Rom is a Cardinal Spline with a tension of 0.5.<br/>
 * http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull.E2.80.93Rom_spline
 * Relative coordinates.
 *
 * @class CatmullRomBy
 * @extends CardinalSplineBy
 *
 * @param {Number} dt
 * @param {Array} points
 *
 * @example
 * var action1 = cc.catmullRomBy(3, array);
 */


cc.CatmullRomBy = cc.Class({
  name: 'cc.CatmullRomBy',
  "extends": cc.CardinalSplineBy,
  ctor: function ctor(dt, points) {
    points && this.initWithDuration(dt, points);
  },
  initWithDuration: function initWithDuration(dt, points) {
    return cc.CardinalSplineTo.prototype.initWithDuration.call(this, dt, points, 0.5);
  },
  clone: function clone() {
    var action = new cc.CatmullRomBy();
    action.initWithDuration(this._duration, cloneControlPoints(this._points));
    return action;
  }
});
/**
 * !#en Creates an action with a Cardinal Spline array of points and tension.
 * !#zh 按 Catmull Rom 样条曲线轨迹移动指定的距离。
 * @method catmullRomBy
 * @param {Number} dt
 * @param {Array} points
 * @return {ActionInterval}
 * @example
 * var action1 = cc.catmullRomBy(3, array);
 */

cc.catmullRomBy = function (dt, points) {
  return new cc.CatmullRomBy(dt, points);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9hY3Rpb25zL0NDQWN0aW9uQ2F0bXVsbFJvbS5qcyJdLCJuYW1lcyI6WyJjYXJkaW5hbFNwbGluZUF0IiwicDAiLCJwMSIsInAyIiwicDMiLCJ0ZW5zaW9uIiwidCIsInQyIiwidDMiLCJzIiwiYjEiLCJiMiIsImIzIiwiYjQiLCJ4IiwieSIsImNjIiwidjIiLCJnZXRDb250cm9sUG9pbnRBdCIsImNvbnRyb2xQb2ludHMiLCJwb3MiLCJwIiwiTWF0aCIsIm1pbiIsImxlbmd0aCIsIm1heCIsInJldmVyc2VDb250cm9sUG9pbnRzIiwibmV3QXJyYXkiLCJpIiwicHVzaCIsImNsb25lQ29udHJvbFBvaW50cyIsIkNhcmRpbmFsU3BsaW5lVG8iLCJDbGFzcyIsIm5hbWUiLCJBY3Rpb25JbnRlcnZhbCIsImN0b3IiLCJkdXJhdGlvbiIsInBvaW50cyIsIl9wb2ludHMiLCJfZGVsdGFUIiwiX3RlbnNpb24iLCJfcHJldmlvdXNQb3NpdGlvbiIsIl9hY2N1bXVsYXRlZERpZmYiLCJ1bmRlZmluZWQiLCJwcm90b3R5cGUiLCJpbml0V2l0aER1cmF0aW9uIiwiY2FsbCIsImVycm9ySUQiLCJzZXRQb2ludHMiLCJjbG9uZSIsImFjdGlvbiIsIl9kdXJhdGlvbiIsInN0YXJ0V2l0aFRhcmdldCIsInRhcmdldCIsInVwZGF0ZSIsImR0IiwiX2NvbXB1dGVFYXNlVGltZSIsImx0IiwicHMiLCJsb2NEVCIsIm5ld1BvcyIsIm1hY3JvIiwiRU5BQkxFX1NUQUNLQUJMRV9BQ1RJT05TIiwidGVtcFgiLCJ0ZW1wWSIsImxvY0FjY0RpZmYiLCJ1cGRhdGVQb3NpdGlvbiIsInJldmVyc2UiLCJyZXZlcnNlUG9pbnRzIiwiY2FyZGluYWxTcGxpbmVUbyIsInNldFBvc2l0aW9uIiwiZ2V0UG9pbnRzIiwiQ2FyZGluYWxTcGxpbmVCeSIsIl9zdGFydFBvc2l0aW9uIiwiY29weUNvbmZpZyIsInNsaWNlIiwiY3VycmVudCIsInN1YiIsInJldmVyc2VBcnJheSIsInBvcCIsInVuc2hpZnQiLCJjYXJkaW5hbFNwbGluZUJ5IiwicG9zWCIsInBvc1kiLCJhIiwiQ2F0bXVsbFJvbVRvIiwiY2F0bXVsbFJvbVRvIiwiQ2F0bXVsbFJvbUJ5IiwiY2F0bXVsbFJvbUJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUNBOzs7O0FBSUE7Ozs7Ozs7Ozs7Ozs7O0FBY0EsU0FBU0EsZ0JBQVQsQ0FBMkJDLEVBQTNCLEVBQStCQyxFQUEvQixFQUFtQ0MsRUFBbkMsRUFBdUNDLEVBQXZDLEVBQTJDQyxPQUEzQyxFQUFvREMsQ0FBcEQsRUFBdUQ7QUFDbkQsTUFBSUMsRUFBRSxHQUFHRCxDQUFDLEdBQUdBLENBQWI7QUFDQSxNQUFJRSxFQUFFLEdBQUdELEVBQUUsR0FBR0QsQ0FBZDtBQUVBOzs7O0FBR0EsTUFBSUcsQ0FBQyxHQUFHLENBQUMsSUFBSUosT0FBTCxJQUFnQixDQUF4QjtBQUVBLE1BQUlLLEVBQUUsR0FBR0QsQ0FBQyxJQUFLLENBQUNELEVBQUQsR0FBTyxJQUFJRCxFQUFaLEdBQW1CRCxDQUF2QixDQUFWLENBVG1ELENBU087O0FBQzFELE1BQUlLLEVBQUUsR0FBR0YsQ0FBQyxJQUFJLENBQUNELEVBQUQsR0FBTUQsRUFBVixDQUFELElBQWtCLElBQUlDLEVBQUosR0FBUyxJQUFJRCxFQUFiLEdBQWtCLENBQXBDLENBQVQsQ0FWbUQsQ0FVTzs7QUFDMUQsTUFBSUssRUFBRSxHQUFHSCxDQUFDLElBQUlELEVBQUUsR0FBRyxJQUFJRCxFQUFULEdBQWNELENBQWxCLENBQUQsSUFBeUIsQ0FBQyxDQUFELEdBQUtFLEVBQUwsR0FBVSxJQUFJRCxFQUF2QyxDQUFULENBWG1ELENBV087O0FBQzFELE1BQUlNLEVBQUUsR0FBR0osQ0FBQyxJQUFJRCxFQUFFLEdBQUdELEVBQVQsQ0FBVixDQVptRCxDQVlPOztBQUUxRCxNQUFJTyxDQUFDLEdBQUliLEVBQUUsQ0FBQ2EsQ0FBSCxHQUFP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Q0FBVCxDQUFsQjtBQW1CQTs7Ozs7Ozs7Ozs7QUFVQWxDLEVBQUUsQ0FBQ3dFLFlBQUgsR0FBa0IsVUFBVWpDLEVBQVYsRUFBY2xCLE1BQWQsRUFBc0I7QUFDcEMsU0FBTyxJQUFJckIsRUFBRSxDQUFDdUUsWUFBUCxDQUFvQmhDLEVBQXBCLEVBQXdCbEIsTUFBeEIsQ0FBUDtBQUNILENBRkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAwOCBSYWR1IEdydWlhblxuIENvcHlyaWdodCAoYykgMjAwOC0yMDEwIFJpY2FyZG8gUXVlc2FkYVxuIENvcHlyaWdodCAoYykgMjAxMSBWaXQgVmFsZW50aW5cbiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxMiBjb2NvczJkLXgub3JnXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cblxuIE9yaWduYWwgY29kZSBieSBSYWR1IEdydWlhbjogaHR0cDovL3d3dy5jb2RlcHJvamVjdC5jb20vQXJ0aWNsZXMvMzA4MzgvT3ZlcmhhdXNlci1DYXRtdWxsLVJvbS1TcGxpbmVzLWZvci1DYW1lcmEtQW5pbWF0aW8uU29cblxuIEFkYXB0ZWQgdG8gY29jb3MyZC14IGJ5IFZpdCBWYWxlbnRpblxuXG4gQWRhcHRlZCBmcm9tIGNvY29zMmQteCB0byBjb2NvczJkLWlwaG9uZSBieSBSaWNhcmRvIFF1ZXNhZGFcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKipcbiAqIEBtb2R1bGUgY2NcbiAqL1xuXG4vKlxuICogUmV0dXJucyB0aGUgQ2FyZGluYWwgU3BsaW5lIHBvc2l0aW9uIGZvciBhIGdpdmVuIHNldCBvZiBjb250cm9sIHBvaW50cywgdGVuc2lvbiBhbmQgdGltZS4gPGJyIC8+XG4gKiBDYXRtdWxsUm9tIFNwbGluZSBmb3JtdWxhLiA8YnIgLz5cbiAqIHMoLXR0dCArIDJ0dCAtIHQpUDEgKyBzKC10dHQgKyB0dClQMiArICgydHR0IC0gM3R0ICsgMSlQMiArIHModHR0IC0gMnR0ICsgdClQMyArICgtMnR0dCArIDN0dClQMyArIHModHR0IC0gdHQpUDRcbiAqXG4gKiBAbWV0aG9kIGNhcmRpbmFsU3BsaW5lQXRcbiAqIEBwYXJhbSB7VmVjMn0gcDBcbiAqIEBwYXJhbSB7VmVjMn0gcDFcbiAqIEBwYXJhbSB7VmVjMn0gcDJcbiAqIEBwYXJhbSB7VmVjMn0gcDNcbiAqIEBwYXJhbSB7TnVtYmVyfSB0ZW5zaW9uXG4gKiBAcGFyYW0ge051bWJlcn0gdFxuICogQHJldHVybiB7VmVjMn1cbiAqL1xuZnVuY3Rpb24gY2FyZGluYWxTcGxpbmVBdCAocDAsIHAxLCBwMiwgcDMsIHRlbnNpb24sIHQpIHtcbiAgICB2YXIgdDIgPSB0ICogdDtcbiAgICB2YXIgdDMgPSB0MiAqIHQ7XG5cbiAgICAvKlxuICAgICAqIEZvcm11bGE6IHMoLXR0dCArIDJ0dCAtIHQpUDEgKyBzKC10dHQgKyB0dClQMiArICgydHR0IC0gM3R0ICsgMSlQMiArIHModHR0IC0gMnR0ICsgdClQMyArICgtMnR0dCArIDN0dClQMyArIHModHR0IC0gdHQpUDRcbiAgICAgKi9cbiAgICB2YXIgcyA9ICgxIC0gdGVuc2lvbikgLyAyO1xuXG4gICAgdmFyIGIxID0gcyAqICgoLXQzICsgKDIgKiB0MikpIC0gdCk7ICAgICAgICAgICAgICAgICAgICAgIC8vIHMoLXQzICsgMiB0MiAtIHQpUDFcbiAgICB2YXIgYjIgPSBzICogKC10MyArIHQyKSArICgyICogdDMgLSAzICogdDIgKyAxKTsgICAgICAgICAgLy8gcygtdDMgKyB0MilQMiArICgyIHQzIC0gMyB0MiArIDEpUDJcbiAgICB2YXIgYjMgPSBzICogKHQzIC0gMiAqIHQyICsgdCkgKyAoLTIgKiB0MyArIDMgKiB0Mik7ICAgICAgLy8gcyh0MyAtIDIgdDIgKyB0KVAzICsgKC0yIHQzICsgMyB0MilQM1xuICAgIHZhciBiNCA9IHMgKiAodDMgLSB0Mik7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzKHQzIC0gdDIpUDRcblxuICAgIHZhciB4ID0gKHAwLnggKiBiMSArIHAxLnggKiBiMiArIHAyLnggKiBiMyArIHAzLnggKiBiNCk7XG4gICAgdmFyIHkgPSAocDAueSAqIGIxICsgcDEueSAqIGIyICsgcDIueSAqIGIzICsgcDMueSAqIGI0KTtcbiAgICByZXR1cm4gY2MudjIoeCwgeSk7XG59O1xuXG4vKlxuICogcmV0dXJucyBhIHBvaW50IGZyb20gdGhlIGFycmF5XG4gKiBAbWV0aG9kIGdldENvbnRyb2xQb2ludEF0XG4gKiBAcGFyYW0ge0FycmF5fSBjb250cm9sUG9pbnRzXG4gKiBAcGFyYW0ge051bWJlcn0gcG9zXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gZ2V0Q29udHJvbFBvaW50QXQgKGNvbnRyb2xQb2ludHMsIHBvcykge1xuICAgIHZhciBwID0gTWF0aC5taW4oY29udHJvbFBvaW50cy5sZW5ndGggLSAxLCBNYXRoLm1heChwb3MsIDApKTtcbiAgICByZXR1cm4gY29udHJvbFBvaW50c1twXTtcbn07XG5cbmZ1bmN0aW9uIHJldmVyc2VDb250cm9sUG9pbnRzIChjb250cm9sUG9pbnRzKSB7XG4gICAgdmFyIG5ld0FycmF5ID0gW107XG4gICAgZm9yICh2YXIgaSA9IGNvbnRyb2xQb2ludHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgbmV3QXJyYXkucHVzaChjYy52Mihjb250cm9sUG9pbnRzW2ldLngsIGNvbnRyb2xQb2ludHNbaV0ueSkpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3QXJyYXk7XG59XG5cbmZ1bmN0aW9uIGNsb25lQ29udHJvbFBvaW50cyAoY29udHJvbFBvaW50cykge1xuICAgIHZhciBuZXdBcnJheSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udHJvbFBvaW50cy5sZW5ndGg7IGkrKylcbiAgICAgICAgbmV3QXJyYXkucHVzaChjYy52Mihjb250cm9sUG9pbnRzW2ldLngsIGNvbnRyb2xQb2ludHNbaV0ueSkpO1xuICAgIHJldHVybiBuZXdBcnJheTtcbn1cblxuXG4vKlxuICogQ2FyZGluYWwgU3BsaW5lIHBhdGguIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ3ViaWNfSGVybWl0ZV9zcGxpbmUjQ2FyZGluYWxfc3BsaW5lXG4gKiBBYnNvbHV0ZSBjb29yZGluYXRlcy5cbiAqXG4gKiBAY2xhc3MgQ2FyZGluYWxTcGxpbmVUb1xuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50cyBhcnJheSBvZiBjb250cm9sIHBvaW50c1xuICogQHBhcmFtIHtOdW1iZXJ9IHRlbnNpb25cbiAqXG4gKiBAZXhhbXBsZVxuICogLy9jcmVhdGUgYSBjYy5DYXJkaW5hbFNwbGluZVRvXG4gKiB2YXIgYWN0aW9uMSA9IGNjLmNhcmRpbmFsU3BsaW5lVG8oMywgYXJyYXksIDApO1xuICovXG5jYy5DYXJkaW5hbFNwbGluZVRvID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5DYXJkaW5hbFNwbGluZVRvJyxcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnRlcnZhbCxcblxuICAgIGN0b3I6IGZ1bmN0aW9uIChkdXJhdGlvbiwgcG9pbnRzLCB0ZW5zaW9uKSB7XG4gICAgICAgIC8qIEFycmF5IG9mIGNvbnRyb2wgcG9pbnRzICovXG4gICAgICAgIHRoaXMuX3BvaW50cyA9IFtdO1xuICAgICAgICB0aGlzLl9kZWx0YVQgPSAwO1xuICAgICAgICB0aGlzLl90ZW5zaW9uID0gMDtcbiAgICAgICAgdGhpcy5fcHJldmlvdXNQb3NpdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuX2FjY3VtdWxhdGVkRGlmZiA9IG51bGw7XG4gICAgICAgIHRlbnNpb24gIT09IHVuZGVmaW5lZCAmJiBjYy5DYXJkaW5hbFNwbGluZVRvLnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgZHVyYXRpb24sIHBvaW50cywgdGVuc2lvbik7XG4gICAgfSxcblxuICAgIGluaXRXaXRoRHVyYXRpb246ZnVuY3Rpb24gKGR1cmF0aW9uLCBwb2ludHMsIHRlbnNpb24pIHtcbiAgICAgICAgaWYgKCFwb2ludHMgfHwgcG9pbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgxMDI0KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGR1cmF0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRQb2ludHMocG9pbnRzKTtcbiAgICAgICAgICAgIHRoaXMuX3RlbnNpb24gPSB0ZW5zaW9uO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuQ2FyZGluYWxTcGxpbmVUbygpO1xuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgY2xvbmVDb250cm9sUG9pbnRzKHRoaXMuX3BvaW50cyksIHRoaXMuX3RlbnNpb24pO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH0sXG5cbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgLy8gSXNzdWUgIzE0NDEgZnJvbSBjb2NvczJkLWlwaG9uZVxuICAgICAgICB0aGlzLl9kZWx0YVQgPSAxIC8gKHRoaXMuX3BvaW50cy5sZW5ndGggLSAxKTtcbiAgICAgICAgdGhpcy5fcHJldmlvdXNQb3NpdGlvbiA9IGNjLnYyKHRoaXMudGFyZ2V0LngsIHRoaXMudGFyZ2V0LnkpO1xuICAgICAgICB0aGlzLl9hY2N1bXVsYXRlZERpZmYgPSBjYy52MigwLCAwKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xuICAgICAgICBkdCA9IHRoaXMuX2NvbXB1dGVFYXNlVGltZShkdCk7XG4gICAgICAgIHZhciBwLCBsdDtcbiAgICAgICAgdmFyIHBzID0gdGhpcy5fcG9pbnRzO1xuICAgICAgICAvLyBlZy5cbiAgICAgICAgLy8gcC4ucC4ucC4ucC4ucC4ucC4ucFxuICAgICAgICAvLyAxLi4yLi4zLi40Li41Li42Li43XG4gICAgICAgIC8vIHdhbnQgcCB0byBiZSAxLCAyLCAzLCA0LCA1LCA2XG4gICAgICAgIGlmIChkdCA9PT0gMSkge1xuICAgICAgICAgICAgcCA9IHBzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBsdCA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbG9jRFQgPSB0aGlzLl9kZWx0YVQ7XG4gICAgICAgICAgICBwID0gMCB8IChkdCAvIGxvY0RUKTtcbiAgICAgICAgICAgIGx0ID0gKGR0IC0gbG9jRFQgKiBwKSAvIGxvY0RUO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5ld1BvcyA9IGNhcmRpbmFsU3BsaW5lQXQoXG4gICAgICAgICAgICBnZXRDb250cm9sUG9pbnRBdChwcywgcCAtIDEpLFxuICAgICAgICAgICAgZ2V0Q29udHJvbFBvaW50QXQocHMsIHAgLSAwKSxcbiAgICAgICAgICAgIGdldENvbnRyb2xQb2ludEF0KHBzLCBwICsgMSksXG4gICAgICAgICAgICBnZXRDb250cm9sUG9pbnRBdChwcywgcCArIDIpLFxuICAgICAgICAgICAgdGhpcy5fdGVuc2lvbiwgbHQpO1xuXG4gICAgICAgIGlmIChjYy5tYWNyby5FTkFCTEVfU1RBQ0tBQkxFX0FDVElPTlMpIHtcbiAgICAgICAgICAgIHZhciB0ZW1wWCwgdGVtcFk7XG4gICAgICAgICAgICB0ZW1wWCA9IHRoaXMudGFyZ2V0LnggLSB0aGlzLl9wcmV2aW91c1Bvc2l0aW9uLng7XG4gICAgICAgICAgICB0ZW1wWSA9IHRoaXMudGFyZ2V0LnkgLSB0aGlzLl9wcmV2aW91c1Bvc2l0aW9uLnk7XG4gICAgICAgICAgICBpZiAodGVtcFggIT09IDAgfHwgdGVtcFkgIT09IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgbG9jQWNjRGlmZiA9IHRoaXMuX2FjY3VtdWxhdGVkRGlmZjtcbiAgICAgICAgICAgICAgICB0ZW1wWCA9IGxvY0FjY0RpZmYueCArIHRlbXBYO1xuICAgICAgICAgICAgICAgIHRlbXBZID0gbG9jQWNjRGlmZi55ICsgdGVtcFk7XG4gICAgICAgICAgICAgICAgbG9jQWNjRGlmZi54ID0gdGVtcFg7XG4gICAgICAgICAgICAgICAgbG9jQWNjRGlmZi55ID0gdGVtcFk7XG4gICAgICAgICAgICAgICAgbmV3UG9zLnggKz0gdGVtcFg7XG4gICAgICAgICAgICAgICAgbmV3UG9zLnkgKz0gdGVtcFk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbihuZXdQb3MpO1xuICAgIH0sXG5cbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJldmVyc2VQb2ludHMgPSByZXZlcnNlQ29udHJvbFBvaW50cyh0aGlzLl9wb2ludHMpO1xuICAgICAgICByZXR1cm4gY2MuY2FyZGluYWxTcGxpbmVUbyh0aGlzLl9kdXJhdGlvbiwgcmV2ZXJzZVBvaW50cywgdGhpcy5fdGVuc2lvbik7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogdXBkYXRlIHBvc2l0aW9uIG9mIHRhcmdldFxuICAgICAqIEBtZXRob2QgdXBkYXRlUG9zaXRpb25cbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IG5ld1Bvc1xuICAgICAqL1xuICAgIHVwZGF0ZVBvc2l0aW9uOmZ1bmN0aW9uIChuZXdQb3MpIHtcbiAgICAgICAgdGhpcy50YXJnZXQuc2V0UG9zaXRpb24obmV3UG9zKTtcbiAgICAgICAgdGhpcy5fcHJldmlvdXNQb3NpdGlvbiA9IG5ld1BvcztcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBQb2ludHMgZ2V0dGVyXG4gICAgICogQG1ldGhvZCBnZXRQb2ludHNcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRQb2ludHM6ZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQb2ludHMgc2V0dGVyXG4gICAgICogQG1ldGhvZCBzZXRQb2ludHNcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwb2ludHNcbiAgICAgKi9cbiAgICBzZXRQb2ludHM6ZnVuY3Rpb24gKHBvaW50cykge1xuICAgICAgICB0aGlzLl9wb2ludHMgPSBwb2ludHM7XG4gICAgfVxufSk7XG5cbi8qKlxuICogISNlbiBDcmVhdGVzIGFuIGFjdGlvbiB3aXRoIGEgQ2FyZGluYWwgU3BsaW5lIGFycmF5IG9mIHBvaW50cyBhbmQgdGVuc2lvbi5cbiAqICEjemgg5oyJ5Z+65pWw5qC35p2h5puy57q/6L2o6L+556e75Yqo5Yiw55uu5qCH5L2N572u44CCXG4gKiBAbWV0aG9kIGNhcmRpbmFsU3BsaW5lVG9cbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxuICogQHBhcmFtIHtBcnJheX0gcG9pbnRzIGFycmF5IG9mIGNvbnRyb2wgcG9pbnRzXG4gKiBAcGFyYW0ge051bWJlcn0gdGVuc2lvblxuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vY3JlYXRlIGEgY2MuQ2FyZGluYWxTcGxpbmVUb1xuICogdmFyIGFjdGlvbjEgPSBjYy5jYXJkaW5hbFNwbGluZVRvKDMsIGFycmF5LCAwKTtcbiAqL1xuY2MuY2FyZGluYWxTcGxpbmVUbyA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgcG9pbnRzLCB0ZW5zaW9uKSB7XG4gICAgcmV0dXJuIG5ldyBjYy5DYXJkaW5hbFNwbGluZVRvKGR1cmF0aW9uLCBwb2ludHMsIHRlbnNpb24pO1xufTtcblxuLypcbiAqIENhcmRpbmFsIFNwbGluZSBwYXRoLiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0N1YmljX0hlcm1pdGVfc3BsaW5lI0NhcmRpbmFsX3NwbGluZVxuICogUmVsYXRpdmUgY29vcmRpbmF0ZXMuXG4gKlxuICogQGNsYXNzIENhcmRpbmFsU3BsaW5lQnlcbiAqIEBleHRlbmRzIENhcmRpbmFsU3BsaW5lVG9cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50c1xuICogQHBhcmFtIHtOdW1iZXJ9IHRlbnNpb25cbiAqXG4gKiBAZXhhbXBsZVxuICogLy9jcmVhdGUgYSBjYy5DYXJkaW5hbFNwbGluZUJ5XG4gKiB2YXIgYWN0aW9uMSA9IGNjLmNhcmRpbmFsU3BsaW5lQnkoMywgYXJyYXksIDApO1xuICovXG5jYy5DYXJkaW5hbFNwbGluZUJ5ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5DYXJkaW5hbFNwbGluZUJ5JyxcbiAgICBleHRlbmRzOiBjYy5DYXJkaW5hbFNwbGluZVRvLFxuXG4gICAgY3RvcjpmdW5jdGlvbiAoZHVyYXRpb24sIHBvaW50cywgdGVuc2lvbikge1xuICAgICAgICB0aGlzLl9zdGFydFBvc2l0aW9uID0gY2MudjIoMCwgMCk7XG4gICAgICAgIHRlbnNpb24gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmluaXRXaXRoRHVyYXRpb24oZHVyYXRpb24sIHBvaW50cywgdGVuc2lvbik7XG4gICAgfSxcblxuICAgIHN0YXJ0V2l0aFRhcmdldDpmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGNjLkNhcmRpbmFsU3BsaW5lVG8ucHJvdG90eXBlLnN0YXJ0V2l0aFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICAgIHRoaXMuX3N0YXJ0UG9zaXRpb24ueCA9IHRhcmdldC54O1xuICAgICAgICB0aGlzLl9zdGFydFBvc2l0aW9uLnkgPSB0YXJnZXQueTtcbiAgICB9LFxuXG4gICAgcmV2ZXJzZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb3B5Q29uZmlnID0gdGhpcy5fcG9pbnRzLnNsaWNlKCk7XG4gICAgICAgIHZhciBjdXJyZW50O1xuICAgICAgICAvL1xuICAgICAgICAvLyBjb252ZXJ0IFwiYWJzb2x1dGVzXCIgdG8gXCJkaWZmc1wiXG4gICAgICAgIC8vXG4gICAgICAgIHZhciBwID0gY29weUNvbmZpZ1swXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBjb3B5Q29uZmlnLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gY29weUNvbmZpZ1tpXTtcbiAgICAgICAgICAgIGNvcHlDb25maWdbaV0gPSBjdXJyZW50LnN1YihwKTtcbiAgICAgICAgICAgIHAgPSBjdXJyZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29udmVydCB0byBcImRpZmZzXCIgdG8gXCJyZXZlcnNlIGFic29sdXRlXCJcbiAgICAgICAgdmFyIHJldmVyc2VBcnJheSA9IHJldmVyc2VDb250cm9sUG9pbnRzKGNvcHlDb25maWcpO1xuXG4gICAgICAgIC8vIDFzdCBlbGVtZW50ICh3aGljaCBzaG91bGQgYmUgMCwwKSBzaG91bGQgYmUgaGVyZSB0b29cbiAgICAgICAgcCA9IHJldmVyc2VBcnJheVsgcmV2ZXJzZUFycmF5Lmxlbmd0aCAtIDEgXTtcbiAgICAgICAgcmV2ZXJzZUFycmF5LnBvcCgpO1xuXG4gICAgICAgIHAueCA9IC1wLng7XG4gICAgICAgIHAueSA9IC1wLnk7XG5cbiAgICAgICAgcmV2ZXJzZUFycmF5LnVuc2hpZnQocCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgcmV2ZXJzZUFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gcmV2ZXJzZUFycmF5W2ldO1xuICAgICAgICAgICAgY3VycmVudC54ID0gLWN1cnJlbnQueDtcbiAgICAgICAgICAgIGN1cnJlbnQueSA9IC1jdXJyZW50Lnk7XG4gICAgICAgICAgICBjdXJyZW50LnggKz0gcC54O1xuICAgICAgICAgICAgY3VycmVudC55ICs9IHAueTtcbiAgICAgICAgICAgIHJldmVyc2VBcnJheVtpXSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBwID0gY3VycmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2MuY2FyZGluYWxTcGxpbmVCeSh0aGlzLl9kdXJhdGlvbiwgcmV2ZXJzZUFycmF5LCB0aGlzLl90ZW5zaW9uKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdXBkYXRlIHBvc2l0aW9uIG9mIHRhcmdldFxuICAgICAqIEBtZXRob2QgdXBkYXRlUG9zaXRpb25cbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IG5ld1Bvc1xuICAgICAqL1xuICAgIHVwZGF0ZVBvc2l0aW9uOmZ1bmN0aW9uIChuZXdQb3MpIHtcbiAgICAgICAgdmFyIHBvcyA9IHRoaXMuX3N0YXJ0UG9zaXRpb247XG4gICAgICAgIHZhciBwb3NYID0gbmV3UG9zLnggKyBwb3MueDtcbiAgICAgICAgdmFyIHBvc1kgPSBuZXdQb3MueSArIHBvcy55O1xuICAgICAgICB0aGlzLl9wcmV2aW91c1Bvc2l0aW9uLnggPSBwb3NYO1xuICAgICAgICB0aGlzLl9wcmV2aW91c1Bvc2l0aW9uLnkgPSBwb3NZO1xuICAgICAgICB0aGlzLnRhcmdldC5zZXRQb3NpdGlvbihwb3NYLCBwb3NZKTtcbiAgICB9LFxuXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYSA9IG5ldyBjYy5DYXJkaW5hbFNwbGluZUJ5KCk7XG4gICAgICAgIGEuaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgY2xvbmVDb250cm9sUG9pbnRzKHRoaXMuX3BvaW50cyksIHRoaXMuX3RlbnNpb24pO1xuICAgICAgICByZXR1cm4gYTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiAhI2VuIENyZWF0ZXMgYW4gYWN0aW9uIHdpdGggYSBDYXJkaW5hbCBTcGxpbmUgYXJyYXkgb2YgcG9pbnRzIGFuZCB0ZW5zaW9uLlxuICogISN6aCDmjInln7rmlbDmoLfmnaHmm7Lnur/ovajov7nnp7vliqjmjIflrprnmoTot53nprvjgIJcbiAqIEBtZXRob2QgY2FyZGluYWxTcGxpbmVCeVxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uXG4gKiBAcGFyYW0ge0FycmF5fSBwb2ludHNcbiAqIEBwYXJhbSB7TnVtYmVyfSB0ZW5zaW9uXG4gKlxuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XG4gKi9cbmNjLmNhcmRpbmFsU3BsaW5lQnkgPSBmdW5jdGlvbiAoZHVyYXRpb24sIHBvaW50cywgdGVuc2lvbikge1xuICAgIHJldHVybiBuZXcgY2MuQ2FyZGluYWxTcGxpbmVCeShkdXJhdGlvbiwgcG9pbnRzLCB0ZW5zaW9uKTtcbn07XG5cbi8qXG4gKiBBbiBhY3Rpb24gdGhhdCBtb3ZlcyB0aGUgdGFyZ2V0IHdpdGggYSBDYXRtdWxsUm9tIGN1cnZlIHRvIGEgZGVzdGluYXRpb24gcG9pbnQuPGJyLz5cbiAqIEEgQ2F0bXVsbCBSb20gaXMgYSBDYXJkaW5hbCBTcGxpbmUgd2l0aCBhIHRlbnNpb24gb2YgMC41LiAgPGJyLz5cbiAqIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ3ViaWNfSGVybWl0ZV9zcGxpbmUjQ2F0bXVsbC5FMi44MC45M1JvbV9zcGxpbmVcbiAqIEFic29sdXRlIGNvb3JkaW5hdGVzLlxuICpcbiAqIEBjbGFzcyBDYXRtdWxsUm9tVG9cbiAqIEBleHRlbmRzIENhcmRpbmFsU3BsaW5lVG9cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gZHRcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50c1xuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgYWN0aW9uMSA9IGNjLmNhdG11bGxSb21UbygzLCBhcnJheSk7XG4gKi9cbmNjLkNhdG11bGxSb21UbyA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuQ2F0bXVsbFJvbVRvJyxcbiAgICBleHRlbmRzOiBjYy5DYXJkaW5hbFNwbGluZVRvLFxuXG4gICAgY3RvcjogZnVuY3Rpb24oZHQsIHBvaW50cykge1xuICAgICAgICBwb2ludHMgJiYgdGhpcy5pbml0V2l0aER1cmF0aW9uKGR0LCBwb2ludHMpO1xuICAgIH0sXG5cbiAgICBpbml0V2l0aER1cmF0aW9uOmZ1bmN0aW9uIChkdCwgcG9pbnRzKSB7XG4gICAgICAgIHJldHVybiBjYy5DYXJkaW5hbFNwbGluZVRvLnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgZHQsIHBvaW50cywgMC41KTtcbiAgICB9LFxuXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLkNhdG11bGxSb21UbygpO1xuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgY2xvbmVDb250cm9sUG9pbnRzKHRoaXMuX3BvaW50cykpO1xuICAgICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW4gQ3JlYXRlcyBhbiBhY3Rpb24gd2l0aCBhIENhcmRpbmFsIFNwbGluZSBhcnJheSBvZiBwb2ludHMgYW5kIHRlbnNpb24uXG4gKiAhI3poIOaMiSBDYXRtdWxsIFJvbSDmoLfmnaHmm7Lnur/ovajov7nnp7vliqjliLDnm67moIfkvY3nva7jgIJcbiAqIEBtZXRob2QgY2F0bXVsbFJvbVRvXG4gKiBAcGFyYW0ge051bWJlcn0gZHRcbiAqIEBwYXJhbSB7QXJyYXl9IHBvaW50c1xuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBhY3Rpb24xID0gY2MuY2F0bXVsbFJvbVRvKDMsIGFycmF5KTtcbiAqL1xuY2MuY2F0bXVsbFJvbVRvID0gZnVuY3Rpb24gKGR0LCBwb2ludHMpIHtcbiAgICByZXR1cm4gbmV3IGNjLkNhdG11bGxSb21UbyhkdCwgcG9pbnRzKTtcbn07XG5cbi8qXG4gKiBBbiBhY3Rpb24gdGhhdCBtb3ZlcyB0aGUgdGFyZ2V0IHdpdGggYSBDYXRtdWxsUm9tIGN1cnZlIGJ5IGEgY2VydGFpbiBkaXN0YW5jZS4gIDxici8+XG4gKiBBIENhdG11bGwgUm9tIGlzIGEgQ2FyZGluYWwgU3BsaW5lIHdpdGggYSB0ZW5zaW9uIG9mIDAuNS48YnIvPlxuICogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DdWJpY19IZXJtaXRlX3NwbGluZSNDYXRtdWxsLkUyLjgwLjkzUm9tX3NwbGluZVxuICogUmVsYXRpdmUgY29vcmRpbmF0ZXMuXG4gKlxuICogQGNsYXNzIENhdG11bGxSb21CeVxuICogQGV4dGVuZHMgQ2FyZGluYWxTcGxpbmVCeVxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdFxuICogQHBhcmFtIHtBcnJheX0gcG9pbnRzXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBhY3Rpb24xID0gY2MuY2F0bXVsbFJvbUJ5KDMsIGFycmF5KTtcbiAqL1xuY2MuQ2F0bXVsbFJvbUJ5ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5DYXRtdWxsUm9tQnknLFxuICAgIGV4dGVuZHM6IGNjLkNhcmRpbmFsU3BsaW5lQnksXG5cbiAgICBjdG9yOiBmdW5jdGlvbihkdCwgcG9pbnRzKSB7XG4gICAgICAgIHBvaW50cyAmJiB0aGlzLmluaXRXaXRoRHVyYXRpb24oZHQsIHBvaW50cyk7XG4gICAgfSxcblxuICAgIGluaXRXaXRoRHVyYXRpb246ZnVuY3Rpb24gKGR0LCBwb2ludHMpIHtcbiAgICAgICAgcmV0dXJuIGNjLkNhcmRpbmFsU3BsaW5lVG8ucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCBkdCwgcG9pbnRzLCAwLjUpO1xuICAgIH0sXG5cbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuQ2F0bXVsbFJvbUJ5KCk7XG4gICAgICAgIGFjdGlvbi5pbml0V2l0aER1cmF0aW9uKHRoaXMuX2R1cmF0aW9uLCBjbG9uZUNvbnRyb2xQb2ludHModGhpcy5fcG9pbnRzKSk7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfVxufSk7XG5cbi8qKlxuICogISNlbiBDcmVhdGVzIGFuIGFjdGlvbiB3aXRoIGEgQ2FyZGluYWwgU3BsaW5lIGFycmF5IG9mIHBvaW50cyBhbmQgdGVuc2lvbi5cbiAqICEjemgg5oyJIENhdG11bGwgUm9tIOagt+adoeabsue6v+i9qOi/ueenu+WKqOaMh+WumueahOi3neemu+OAglxuICogQG1ldGhvZCBjYXRtdWxsUm9tQnlcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdFxuICogQHBhcmFtIHtBcnJheX0gcG9pbnRzXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgYWN0aW9uMSA9IGNjLmNhdG11bGxSb21CeSgzLCBhcnJheSk7XG4gKi9cbmNjLmNhdG11bGxSb21CeSA9IGZ1bmN0aW9uIChkdCwgcG9pbnRzKSB7XG4gICAgcmV0dXJuIG5ldyBjYy5DYXRtdWxsUm9tQnkoZHQsIHBvaW50cyk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=