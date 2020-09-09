
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/actions/CCActionEase.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
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
 ****************************************************************************/

/**
 * @module cc
 */

/**
 * !#en
 * Creates the action easing object with the rate parameter. <br />
 * From slow to fast.
 * !#zh 创建 easeIn 缓动对象，由慢到快。
 * @method easeIn
 * @param {Number} rate
 * @return {Object}
 * @example
 * action.easing(cc.easeIn(3.0));
 */
cc.easeIn = function (rate) {
  return {
    _rate: rate,
    easing: function easing(dt) {
      return Math.pow(dt, this._rate);
    },
    reverse: function reverse() {
      return cc.easeIn(1 / this._rate);
    }
  };
};
/**
 * !#en
 * Creates the action easing object with the rate parameter. <br />
 * From fast to slow.
 * !#zh 创建 easeOut 缓动对象，由快到慢。
 * @method easeOut
 * @param {Number} rate
 * @return {Object}
 * @example
 * action.easing(cc.easeOut(3.0));
 */


cc.easeOut = function (rate) {
  return {
    _rate: rate,
    easing: function easing(dt) {
      return Math.pow(dt, 1 / this._rate);
    },
    reverse: function reverse() {
      return cc.easeOut(1 / this._rate);
    }
  };
};
/**
 * !#en
 * Creates the action easing object with the rate parameter. <br />
 * Slow to fast then to slow.
 * !#zh 创建 easeInOut 缓动对象，慢到快，然后慢。
 * @method easeInOut
 * @param {Number} rate
 * @return {Object}
 *
 * @example
 * action.easing(cc.easeInOut(3.0));
 */


cc.easeInOut = function (rate) {
  return {
    _rate: rate,
    easing: function easing(dt) {
      dt *= 2;
      if (dt < 1) return 0.5 * Math.pow(dt, this._rate);else return 1.0 - 0.5 * Math.pow(2 - dt, this._rate);
    },
    reverse: function reverse() {
      return cc.easeInOut(this._rate);
    }
  };
};
/**
 * !#en
 * Creates the action easing object with the rate parameter. <br />
 * Reference easeInExpo: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeExponentialIn 缓动对象。<br />
 * EaseExponentialIn 是按指数函数缓动进入的动作。<br />
 * 参考 easeInExpo：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeExponentialIn
 * @return {Object}
 * @example
 * action.easing(cc.easeExponentialIn());
 */


var _easeExponentialInObj = {
  easing: function easing(dt) {
    return dt === 0 ? 0 : Math.pow(2, 10 * (dt - 1));
  },
  reverse: function reverse() {
    return _easeExponentialOutObj;
  }
};

cc.easeExponentialIn = function () {
  return _easeExponentialInObj;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeOutExpo: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeExponentialOut 缓动对象。<br />
 * EaseExponentialOut 是按指数函数缓动退出的动作。<br />
 * 参考 easeOutExpo：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeExponentialOut
 * @return {Object}
 * @example
 * action.easing(cc.easeExponentialOut());
 */


var _easeExponentialOutObj = {
  easing: function easing(dt) {
    return dt === 1 ? 1 : -Math.pow(2, -10 * dt) + 1;
  },
  reverse: function reverse() {
    return _easeExponentialInObj;
  }
};

cc.easeExponentialOut = function () {
  return _easeExponentialOutObj;
};
/**
 * !#en
 * Creates an EaseExponentialInOut action easing object. <br />
 * Reference easeInOutExpo: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeExponentialInOut 缓动对象。<br />
 * EaseExponentialInOut 是按指数函数缓动进入并退出的动作。<br />
 * 参考 easeInOutExpo：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeExponentialInOut
 * @return {Object}
 * @example
 * action.easing(cc.easeExponentialInOut());
 */


var _easeExponentialInOutObj = {
  easing: function easing(dt) {
    if (dt !== 1 && dt !== 0) {
      dt *= 2;
      if (dt < 1) return 0.5 * Math.pow(2, 10 * (dt - 1));else return 0.5 * (-Math.pow(2, -10 * (dt - 1)) + 2);
    }

    return dt;
  },
  reverse: function reverse() {
    return _easeExponentialInOutObj;
  }
};

cc.easeExponentialInOut = function () {
  return _easeExponentialInOutObj;
};
/**
 * !#en
 * Creates an EaseSineIn action. <br />
 * Reference easeInSine: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 EaseSineIn 缓动对象。<br />
 * EaseSineIn 是按正弦函数缓动进入的动作。<br />
 * 参考 easeInSine：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeSineIn
 * @return {Object}
 * @example
 * action.easing(cc.easeSineIn());
 */


var _easeSineInObj = {
  easing: function easing(dt) {
    return dt === 0 || dt === 1 ? dt : -1 * Math.cos(dt * Math.PI / 2) + 1;
  },
  reverse: function reverse() {
    return _easeSineOutObj;
  }
};

cc.easeSineIn = function () {
  return _easeSineInObj;
};
/**
 * !#en
 * Creates an EaseSineOut action easing object. <br />
 * Reference easeOutSine: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 EaseSineOut 缓动对象。<br />
 * EaseSineIn 是按正弦函数缓动退出的动作。<br />
 * 参考 easeOutSine：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeSineOut
 * @return {Object}
 * @example
 * action.easing(cc.easeSineOut());
 */


var _easeSineOutObj = {
  easing: function easing(dt) {
    return dt === 0 || dt === 1 ? dt : Math.sin(dt * Math.PI / 2);
  },
  reverse: function reverse() {
    return _easeSineInObj;
  }
};

cc.easeSineOut = function () {
  return _easeSineOutObj;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInOutSine: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeSineInOut 缓动对象。<br />
 * EaseSineIn 是按正弦函数缓动进入并退出的动作。<br />
 * 参考 easeInOutSine：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeSineInOut
 * @return {Object}
 * @example
 * action.easing(cc.easeSineInOut());
 */


var _easeSineInOutObj = {
  easing: function easing(dt) {
    return dt === 0 || dt === 1 ? dt : -0.5 * (Math.cos(Math.PI * dt) - 1);
  },
  reverse: function reverse() {
    return _easeSineInOutObj;
  }
};

cc.easeSineInOut = function () {
  return _easeSineInOutObj;
};
/**
 * @module cc
 */

/**
 * !#en
 * Creates the action easing object with the period in radians (default is 0.3). <br />
 * Reference easeInElastic: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeElasticIn 缓动对象。<br />
 * EaseElasticIn 是按弹性曲线缓动进入的动作。<br />
 * 参数 easeInElastic：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeElasticIn
 * @param {Number} period
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeElasticIn(3.0));
 */
//default ease elastic in object (period = 0.3)


var _easeElasticInObj = {
  easing: function easing(dt) {
    if (dt === 0 || dt === 1) return dt;
    dt = dt - 1;
    return -Math.pow(2, 10 * dt) * Math.sin((dt - 0.3 / 4) * Math.PI * 2 / 0.3);
  },
  reverse: function reverse() {
    return _easeElasticOutObj;
  }
};

cc.easeElasticIn = function (period) {
  if (period && period !== 0.3) {
    return {
      _period: period,
      easing: function easing(dt) {
        if (dt === 0 || dt === 1) return dt;
        dt = dt - 1;
        return -Math.pow(2, 10 * dt) * Math.sin((dt - this._period / 4) * Math.PI * 2 / this._period);
      },
      reverse: function reverse() {
        return cc.easeElasticOut(this._period);
      }
    };
  }

  return _easeElasticInObj;
};
/**
 * !#en
 * Creates the action easing object with the period in radians (default is 0.3). <br />
 * Reference easeOutElastic: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeElasticOut 缓动对象。<br />
 * EaseElasticOut 是按弹性曲线缓动退出的动作。<br />
 * 参考 easeOutElastic：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeElasticOut
 * @param {Number} period
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeElasticOut(3.0));
 */
//default ease elastic out object (period = 0.3)


var _easeElasticOutObj = {
  easing: function easing(dt) {
    return dt === 0 || dt === 1 ? dt : Math.pow(2, -10 * dt) * Math.sin((dt - 0.3 / 4) * Math.PI * 2 / 0.3) + 1;
  },
  reverse: function reverse() {
    return _easeElasticInObj;
  }
};

cc.easeElasticOut = function (period) {
  if (period && period !== 0.3) {
    return {
      _period: period,
      easing: function easing(dt) {
        return dt === 0 || dt === 1 ? dt : Math.pow(2, -10 * dt) * Math.sin((dt - this._period / 4) * Math.PI * 2 / this._period) + 1;
      },
      reverse: function reverse() {
        return cc.easeElasticIn(this._period);
      }
    };
  }

  return _easeElasticOutObj;
};
/**
 * !#en
 * Creates the action easing object with the period in radians (default is 0.3). <br />
 * Reference easeInOutElastic: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeElasticInOut 缓动对象。<br />
 * EaseElasticInOut 是按弹性曲线缓动进入并退出的动作。<br />
 * 参考 easeInOutElastic：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeElasticInOut
 * @param {Number} period
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeElasticInOut(3.0));
 */


cc.easeElasticInOut = function (period) {
  period = period || 0.3;
  return {
    _period: period,
    easing: function easing(dt) {
      var newT = 0;
      var locPeriod = this._period;

      if (dt === 0 || dt === 1) {
        newT = dt;
      } else {
        dt = dt * 2;
        if (!locPeriod) locPeriod = this._period = 0.3 * 1.5;
        var s = locPeriod / 4;
        dt = dt - 1;
        if (dt < 0) newT = -0.5 * Math.pow(2, 10 * dt) * Math.sin((dt - s) * Math.PI * 2 / locPeriod);else newT = Math.pow(2, -10 * dt) * Math.sin((dt - s) * Math.PI * 2 / locPeriod) * 0.5 + 1;
      }

      return newT;
    },
    reverse: function reverse() {
      return cc.easeElasticInOut(this._period);
    }
  };
};
/**
 * @module cc
 */


function _bounceTime(time1) {
  if (time1 < 1 / 2.75) {
    return 7.5625 * time1 * time1;
  } else if (time1 < 2 / 2.75) {
    time1 -= 1.5 / 2.75;
    return 7.5625 * time1 * time1 + 0.75;
  } else if (time1 < 2.5 / 2.75) {
    time1 -= 2.25 / 2.75;
    return 7.5625 * time1 * time1 + 0.9375;
  }

  time1 -= 2.625 / 2.75;
  return 7.5625 * time1 * time1 + 0.984375;
}

;
var _easeBounceInObj = {
  easing: function easing(dt) {
    return 1 - _bounceTime(1 - dt);
  },
  reverse: function reverse() {
    return _easeBounceOutObj;
  }
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Eased bounce effect at the beginning.
 * !#zh
 * 创建 easeBounceIn 缓动对象。<br />
 * EaseBounceIn 是按弹跳动作缓动进入的动作。
 * @method easeBounceIn
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeBounceIn());
 */

cc.easeBounceIn = function () {
  return _easeBounceInObj;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Eased bounce effect at the ending.
 * !#zh
 * 创建 easeBounceOut 缓动对象。<br />
 * EaseBounceOut 是按弹跳动作缓动退出的动作。
 * @method easeBounceOut
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeBounceOut());
 */


var _easeBounceOutObj = {
  easing: function easing(dt) {
    return _bounceTime(dt);
  },
  reverse: function reverse() {
    return _easeBounceInObj;
  }
};

cc.easeBounceOut = function () {
  return _easeBounceOutObj;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Eased bounce effect at the begining and ending.
 * !#zh
 * 创建 easeBounceInOut 缓动对象。<br />
 * EaseBounceInOut 是按弹跳动作缓动进入并退出的动作。
 * @method easeBounceInOut
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeBounceInOut());
 */


var _easeBounceInOutObj = {
  easing: function easing(time1) {
    var newT;

    if (time1 < 0.5) {
      time1 = time1 * 2;
      newT = (1 - _bounceTime(1 - time1)) * 0.5;
    } else {
      newT = _bounceTime(time1 * 2 - 1) * 0.5 + 0.5;
    }

    return newT;
  },
  reverse: function reverse() {
    return _easeBounceInOutObj;
  }
};

cc.easeBounceInOut = function () {
  return _easeBounceInOutObj;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * In the opposite direction to move slowly, and then accelerated to the right direction.
 * !#zh
 * 创建 easeBackIn 缓动对象。<br />
 * easeBackIn 是在相反的方向缓慢移动，然后加速到正确的方向。<br />
 * @method easeBackIn
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeBackIn());
 */


var _easeBackInObj = {
  easing: function easing(time1) {
    var overshoot = 1.70158;
    return time1 === 0 || time1 === 1 ? time1 : time1 * time1 * ((overshoot + 1) * time1 - overshoot);
  },
  reverse: function reverse() {
    return _easeBackOutObj;
  }
};

cc.easeBackIn = function () {
  return _easeBackInObj;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Fast moving more than the finish, and then slowly back to the finish.
 * !#zh
 * 创建 easeBackOut 缓动对象。<br />
 * easeBackOut 快速移动超出目标，然后慢慢回到目标点。
 * @method easeBackOut
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeBackOut());
 */


var _easeBackOutObj = {
  easing: function easing(time1) {
    if (time1 === 0) {
      return 0;
    }

    var overshoot = 1.70158;
    time1 = time1 - 1;
    return time1 * time1 * ((overshoot + 1) * time1 + overshoot) + 1;
  },
  reverse: function reverse() {
    return _easeBackInObj;
  }
};

cc.easeBackOut = function () {
  return _easeBackOutObj;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Begining of cc.EaseBackIn. Ending of cc.EaseBackOut.
 * !#zh
 * 创建 easeBackInOut 缓动对象。<br />
 * @method easeBackInOut
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeBackInOut());
 */


var _easeBackInOutObj = {
  easing: function easing(time1) {
    var overshoot = 1.70158 * 1.525;
    time1 = time1 * 2;

    if (time1 < 1) {
      return time1 * time1 * ((overshoot + 1) * time1 - overshoot) / 2;
    } else {
      time1 = time1 - 2;
      return time1 * time1 * ((overshoot + 1) * time1 + overshoot) / 2 + 1;
    }
  },
  reverse: function reverse() {
    return _easeBackInOutObj;
  }
};

cc.easeBackInOut = function () {
  return _easeBackInOutObj;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Into the 4 reference point. <br />
 * To calculate the motion curve.
 * !#zh
 * 创建 easeBezierAction 缓动对象。<br />
 * EaseBezierAction 是按贝塞尔曲线缓动的动作。
 * @method easeBezierAction
 * @param {Number} p0 The first bezier parameter
 * @param {Number} p1 The second bezier parameter
 * @param {Number} p2 The third bezier parameter
 * @param {Number} p3 The fourth bezier parameter
 * @returns {Object}
 * @example
 * // example
 * action.easing(cc.easeBezierAction(0.5, 0.5, 1.0, 1.0));
 */


cc.easeBezierAction = function (a, b, c, d) {
  return {
    easing: function easing(t) {
      return Math.pow(1 - t, 3) * a + 3 * t * Math.pow(1 - t, 2) * b + 3 * Math.pow(t, 2) * (1 - t) * c + Math.pow(t, 3) * d;
    },
    reverse: function reverse() {
      return cc.easeBezierAction(d, c, b, a);
    }
  };
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInQuad: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuadraticActionIn 缓动对象。<br />
 * EaseQuadraticIn是按二次函数缓动进入的动作。<br />
 * 参考 easeInQuad：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuadraticActionIn
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeQuadraticActionIn());
 */


var _easeQuadraticActionIn = {
  easing: function easing(time) {
    return Math.pow(time, 2);
  },
  reverse: function reverse() {
    return _easeQuadraticActionIn;
  }
};

cc.easeQuadraticActionIn = function () {
  return _easeQuadraticActionIn;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeOutQuad: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuadraticActionOut 缓动对象。<br />
 * EaseQuadraticOut 是按二次函数缓动退出的动作。<br />
 * 参考 easeOutQuad：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuadraticActionOut
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeQuadraticActionOut());
 */


var _easeQuadraticActionOut = {
  easing: function easing(time) {
    return -time * (time - 2);
  },
  reverse: function reverse() {
    return _easeQuadraticActionOut;
  }
};

cc.easeQuadraticActionOut = function () {
  return _easeQuadraticActionOut;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInOutQuad: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuadraticActionInOut 缓动对象。<br />
 * EaseQuadraticInOut 是按二次函数缓动进入并退出的动作。<br />
 * 参考 easeInOutQuad：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuadraticActionInOut
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeQuadraticActionInOut());
 */


var _easeQuadraticActionInOut = {
  easing: function easing(time) {
    var resultTime = time;
    time *= 2;

    if (time < 1) {
      resultTime = time * time * 0.5;
    } else {
      --time;
      resultTime = -0.5 * (time * (time - 2) - 1);
    }

    return resultTime;
  },
  reverse: function reverse() {
    return _easeQuadraticActionInOut;
  }
};

cc.easeQuadraticActionInOut = function () {
  return _easeQuadraticActionInOut;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeIntQuart: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuarticActionIn 缓动对象。<br />
 * EaseQuarticIn 是按四次函数缓动进入的动作。<br />
 * 参考 easeIntQuart：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuarticActionIn
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeQuarticActionIn());
 */


var _easeQuarticActionIn = {
  easing: function easing(time) {
    return time * time * time * time;
  },
  reverse: function reverse() {
    return _easeQuarticActionIn;
  }
};

cc.easeQuarticActionIn = function () {
  return _easeQuarticActionIn;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeOutQuart: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuarticActionOut 缓动对象。<br />
 * EaseQuarticOut 是按四次函数缓动退出的动作。<br />
 * 参考 easeOutQuart：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuarticActionOut
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.QuarticActionOut());
 */


var _easeQuarticActionOut = {
  easing: function easing(time) {
    time -= 1;
    return -(time * time * time * time - 1);
  },
  reverse: function reverse() {
    return _easeQuarticActionOut;
  }
};

cc.easeQuarticActionOut = function () {
  return _easeQuarticActionOut;
};
/**
 * !#en
 * Creates the action easing object.  <br />
 * Reference easeInOutQuart: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuarticActionInOut 缓动对象。<br />
 * EaseQuarticInOut 是按四次函数缓动进入并退出的动作。<br />
 * 参考 easeInOutQuart：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuarticActionInOut
 * @returns {Object}
 */


var _easeQuarticActionInOut = {
  easing: function easing(time) {
    time = time * 2;
    if (time < 1) return 0.5 * time * time * time * time;
    time -= 2;
    return -0.5 * (time * time * time * time - 2);
  },
  reverse: function reverse() {
    return _easeQuarticActionInOut;
  }
};

cc.easeQuarticActionInOut = function () {
  return _easeQuarticActionInOut;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInQuint: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuinticActionIn 缓动对象。<br />
 * EaseQuinticIn 是按五次函数缓动进的动作。<br />
 * 参考 easeInQuint：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuinticActionIn
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeQuinticActionIn());
 */


var _easeQuinticActionIn = {
  easing: function easing(time) {
    return time * time * time * time * time;
  },
  reverse: function reverse() {
    return _easeQuinticActionIn;
  }
};

cc.easeQuinticActionIn = function () {
  return _easeQuinticActionIn;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeOutQuint: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuinticActionOut 缓动对象。<br />
 * EaseQuinticOut 是按五次函数缓动退出的动作
 * 参考 easeOutQuint：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuinticActionOut
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeQuadraticActionOut());
 */


var _easeQuinticActionOut = {
  easing: function easing(time) {
    time -= 1;
    return time * time * time * time * time + 1;
  },
  reverse: function reverse() {
    return _easeQuinticActionOut;
  }
};

cc.easeQuinticActionOut = function () {
  return _easeQuinticActionOut;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInOutQuint: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuinticActionInOut 缓动对象。<br />
 * EaseQuinticInOut是按五次函数缓动进入并退出的动作。<br />
 * 参考 easeInOutQuint：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuinticActionInOut
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeQuinticActionInOut());
 */


var _easeQuinticActionInOut = {
  easing: function easing(time) {
    time = time * 2;
    if (time < 1) return 0.5 * time * time * time * time * time;
    time -= 2;
    return 0.5 * (time * time * time * time * time + 2);
  },
  reverse: function reverse() {
    return _easeQuinticActionInOut;
  }
};

cc.easeQuinticActionInOut = function () {
  return _easeQuinticActionInOut;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInCirc: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeCircleActionIn 缓动对象。<br />
 * EaseCircleIn是按圆形曲线缓动进入的动作。<br />
 * 参考 easeInCirc：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeCircleActionIn
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeCircleActionIn());
 */


var _easeCircleActionIn = {
  easing: function easing(time) {
    return -1 * (Math.sqrt(1 - time * time) - 1);
  },
  reverse: function reverse() {
    return _easeCircleActionIn;
  }
};

cc.easeCircleActionIn = function () {
  return _easeCircleActionIn;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeOutCirc: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeCircleActionOut 缓动对象。<br />
 * EaseCircleOut是按圆形曲线缓动退出的动作。<br />
 * 参考 easeOutCirc：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeCircleActionOut
 * @returns {Object}
 * @example
 * //example
 * actioneasing(cc.easeCircleActionOut());
 */


var _easeCircleActionOut = {
  easing: function easing(time) {
    time = time - 1;
    return Math.sqrt(1 - time * time);
  },
  reverse: function reverse() {
    return _easeCircleActionOut;
  }
};

cc.easeCircleActionOut = function () {
  return _easeCircleActionOut;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInOutCirc: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeCircleActionInOut 缓动对象。<br />
 * EaseCircleInOut 是按圆形曲线缓动进入并退出的动作。<br />
 * 参考 easeInOutCirc：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeCircleActionInOut
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeCircleActionInOut());
 */


var _easeCircleActionInOut = {
  easing: function easing(time) {
    time = time * 2;
    if (time < 1) return -0.5 * (Math.sqrt(1 - time * time) - 1);
    time -= 2;
    return 0.5 * (Math.sqrt(1 - time * time) + 1);
  },
  reverse: function reverse() {
    return _easeCircleActionInOut;
  }
};

cc.easeCircleActionInOut = function () {
  return _easeCircleActionInOut;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInCubic: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeCubicActionIn 缓动对象。<br />
 * EaseCubicIn 是按三次函数缓动进入的动作。<br />
 * 参考 easeInCubic：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeCubicActionIn
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeCubicActionIn());
 */


var _easeCubicActionIn = {
  easing: function easing(time) {
    return time * time * time;
  },
  reverse: function reverse() {
    return _easeCubicActionIn;
  }
};

cc.easeCubicActionIn = function () {
  return _easeCubicActionIn;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeOutCubic: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeCubicActionOut 缓动对象。<br />
 * EaseCubicOut 是按三次函数缓动退出的动作。<br />
 * 参考 easeOutCubic：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeCubicActionOut
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeCubicActionOut());
 */


var _easeCubicActionOut = {
  easing: function easing(time) {
    time -= 1;
    return time * time * time + 1;
  },
  reverse: function reverse() {
    return _easeCubicActionOut;
  }
};

cc.easeCubicActionOut = function () {
  return _easeCubicActionOut;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInOutCubic: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeCubicActionInOut 缓动对象。<br />
 * EaseCubicInOut是按三次函数缓动进入并退出的动作。<br />
 * 参考 easeInOutCubic：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeCubicActionInOut
 * @returns {Object}
 */


var _easeCubicActionInOut = {
  easing: function easing(time) {
    time = time * 2;
    if (time < 1) return 0.5 * time * time * time;
    time -= 2;
    return 0.5 * (time * time * time + 2);
  },
  reverse: function reverse() {
    return _easeCubicActionInOut;
  }
};

cc.easeCubicActionInOut = function () {
  return _easeCubicActionInOut;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9hY3Rpb25zL0NDQWN0aW9uRWFzZS5qcyJdLCJuYW1lcyI6WyJjYyIsImVhc2VJbiIsInJhdGUiLCJfcmF0ZSIsImVhc2luZyIsImR0IiwiTWF0aCIsInBvdyIsInJldmVyc2UiLCJlYXNlT3V0IiwiZWFzZUluT3V0IiwiX2Vhc2VFeHBvbmVudGlhbEluT2JqIiwiX2Vhc2VFeHBvbmVudGlhbE91dE9iaiIsImVhc2VFeHBvbmVudGlhbEluIiwiZWFzZUV4cG9uZW50aWFsT3V0IiwiX2Vhc2VFeHBvbmVudGlhbEluT3V0T2JqIiwiZWFzZUV4cG9uZW50aWFsSW5PdXQiLCJfZWFzZVNpbmVJbk9iaiIsImNvcyIsIlBJIiwiX2Vhc2VTaW5lT3V0T2JqIiwiZWFzZVNpbmVJbiIsInNpbiIsImVhc2VTaW5lT3V0IiwiX2Vhc2VTaW5lSW5PdXRPYmoiLCJlYXNlU2luZUluT3V0IiwiX2Vhc2VFbGFzdGljSW5PYmoiLCJfZWFzZUVsYXN0aWNPdXRPYmoiLCJlYXNlRWxhc3RpY0luIiwicGVyaW9kIiwiX3BlcmlvZCIsImVhc2VFbGFzdGljT3V0IiwiZWFzZUVsYXN0aWNJbk91dCIsIm5ld1QiLCJsb2NQZXJpb2QiLCJzIiwiX2JvdW5jZVRpbWUiLCJ0aW1lMSIsIl9lYXNlQm91bmNlSW5PYmoiLCJfZWFzZUJvdW5jZU91dE9iaiIsImVhc2VCb3VuY2VJbiIsImVhc2VCb3VuY2VPdXQiLCJfZWFzZUJvdW5jZUluT3V0T2JqIiwiZWFzZUJvdW5jZUluT3V0IiwiX2Vhc2VCYWNrSW5PYmoiLCJvdmVyc2hvb3QiLCJfZWFzZUJhY2tPdXRPYmoiLCJlYXNlQmFja0luIiwiZWFzZUJhY2tPdXQiLCJfZWFzZUJhY2tJbk91dE9iaiIsImVhc2VCYWNrSW5PdXQiLCJlYXNlQmV6aWVyQWN0aW9uIiwiYSIsImIiLCJjIiwiZCIsInQiLCJfZWFzZVF1YWRyYXRpY0FjdGlvbkluIiwidGltZSIsImVhc2VRdWFkcmF0aWNBY3Rpb25JbiIsIl9lYXNlUXVhZHJhdGljQWN0aW9uT3V0IiwiZWFzZVF1YWRyYXRpY0FjdGlvbk91dCIsIl9lYXNlUXVhZHJhdGljQWN0aW9uSW5PdXQiLCJyZXN1bHRUaW1lIiwiZWFzZVF1YWRyYXRpY0FjdGlvbkluT3V0IiwiX2Vhc2VRdWFydGljQWN0aW9uSW4iLCJlYXNlUXVhcnRpY0FjdGlvbkluIiwiX2Vhc2VRdWFydGljQWN0aW9uT3V0IiwiZWFzZVF1YXJ0aWNBY3Rpb25PdXQiLCJfZWFzZVF1YXJ0aWNBY3Rpb25Jbk91dCIsImVhc2VRdWFydGljQWN0aW9uSW5PdXQiLCJfZWFzZVF1aW50aWNBY3Rpb25JbiIsImVhc2VRdWludGljQWN0aW9uSW4iLCJfZWFzZVF1aW50aWNBY3Rpb25PdXQiLCJlYXNlUXVpbnRpY0FjdGlvbk91dCIsIl9lYXNlUXVpbnRpY0FjdGlvbkluT3V0IiwiZWFzZVF1aW50aWNBY3Rpb25Jbk91dCIsIl9lYXNlQ2lyY2xlQWN0aW9uSW4iLCJzcXJ0IiwiZWFzZUNpcmNsZUFjdGlvbkluIiwiX2Vhc2VDaXJjbGVBY3Rpb25PdXQiLCJlYXNlQ2lyY2xlQWN0aW9uT3V0IiwiX2Vhc2VDaXJjbGVBY3Rpb25Jbk91dCIsImVhc2VDaXJjbGVBY3Rpb25Jbk91dCIsIl9lYXNlQ3ViaWNBY3Rpb25JbiIsImVhc2VDdWJpY0FjdGlvbkluIiwiX2Vhc2VDdWJpY0FjdGlvbk91dCIsImVhc2VDdWJpY0FjdGlvbk91dCIsIl9lYXNlQ3ViaWNBY3Rpb25Jbk91dCIsImVhc2VDdWJpY0FjdGlvbkluT3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQTs7OztBQUlBOzs7Ozs7Ozs7OztBQVdBQSxFQUFFLENBQUNDLE1BQUgsR0FBWSxVQUFVQyxJQUFWLEVBQWdCO0FBQ3hCLFNBQU87QUFDSEMsSUFBQUEsS0FBSyxFQUFFRCxJQURKO0FBRUhFLElBQUFBLE1BQU0sRUFBRSxnQkFBVUMsRUFBVixFQUFjO0FBQ2xCLGFBQU9DLElBQUksQ0FBQ0Ms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Ii8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDA4LTIwMTAgUmljYXJkbyBRdWVzYWRhXG4gQ29weXJpZ2h0IChjKSAyMDExLTIwMTIgY29jb3MyZC14Lm9yZ1xuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqXG4gKiBAbW9kdWxlIGNjXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdCB3aXRoIHRoZSByYXRlIHBhcmFtZXRlci4gPGJyIC8+XG4gKiBGcm9tIHNsb3cgdG8gZmFzdC5cbiAqICEjemgg5Yib5bu6IGVhc2VJbiDnvJPliqjlr7nosaHvvIznlLHmhaLliLDlv6vjgIJcbiAqIEBtZXRob2QgZWFzZUluXG4gKiBAcGFyYW0ge051bWJlcn0gcmF0ZVxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGV4YW1wbGVcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZUluKDMuMCkpO1xuICovXG5jYy5lYXNlSW4gPSBmdW5jdGlvbiAocmF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIF9yYXRlOiByYXRlLFxuICAgICAgICBlYXNpbmc6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucG93KGR0LCB0aGlzLl9yYXRlKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiBjYy5lYXNlSW4oMSAvIHRoaXMuX3JhdGUpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbi8qKlxuICogISNlblxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3Qgd2l0aCB0aGUgcmF0ZSBwYXJhbWV0ZXIuIDxiciAvPlxuICogRnJvbSBmYXN0IHRvIHNsb3cuXG4gKiAhI3poIOWIm+W7uiBlYXNlT3V0IOe8k+WKqOWvueixoe+8jOeUseW/q+WIsOaFouOAglxuICogQG1ldGhvZCBlYXNlT3V0XG4gKiBAcGFyYW0ge051bWJlcn0gcmF0ZVxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGV4YW1wbGVcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZU91dCgzLjApKTtcbiAqL1xuY2MuZWFzZU91dCA9IGZ1bmN0aW9uIChyYXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgX3JhdGU6IHJhdGUsXG4gICAgICAgIGVhc2luZzogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5wb3coZHQsIDEgLyB0aGlzLl9yYXRlKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiBjYy5lYXNlT3V0KDEgLyB0aGlzLl9yYXRlKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0IHdpdGggdGhlIHJhdGUgcGFyYW1ldGVyLiA8YnIgLz5cbiAqIFNsb3cgdG8gZmFzdCB0aGVuIHRvIHNsb3cuXG4gKiAhI3poIOWIm+W7uiBlYXNlSW5PdXQg57yT5Yqo5a+56LGh77yM5oWi5Yiw5b+r77yM54S25ZCO5oWi44CCXG4gKiBAbWV0aG9kIGVhc2VJbk91dFxuICogQHBhcmFtIHtOdW1iZXJ9IHJhdGVcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqXG4gKiBAZXhhbXBsZVxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlSW5PdXQoMy4wKSk7XG4gKi9cbmNjLmVhc2VJbk91dCA9IGZ1bmN0aW9uIChyYXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgX3JhdGU6IHJhdGUsXG4gICAgICAgIGVhc2luZzogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgICAgICBkdCAqPSAyO1xuICAgICAgICAgICAgaWYgKGR0IDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogTWF0aC5wb3coZHQsIHRoaXMuX3JhdGUpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiAxLjAgLSAwLjUgKiBNYXRoLnBvdygyIC0gZHQsIHRoaXMuX3JhdGUpO1xuICAgICAgICB9LFxuICAgICAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIGNjLmVhc2VJbk91dCh0aGlzLl9yYXRlKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0IHdpdGggdGhlIHJhdGUgcGFyYW1ldGVyLiA8YnIgLz5cbiAqIFJlZmVyZW5jZSBlYXNlSW5FeHBvOiA8YnIgLz5cbiAqIGh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogISN6aFxuICog5Yib5bu6IGVhc2VFeHBvbmVudGlhbEluIOe8k+WKqOWvueixoeOAgjxiciAvPlxuICogRWFzZUV4cG9uZW50aWFsSW4g5piv5oyJ5oyH5pWw5Ye95pWw57yT5Yqo6L+b5YWl55qE5Yqo5L2c44CCPGJyIC8+XG4gKiDlj4LogIMgZWFzZUluRXhwb++8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogQG1ldGhvZCBlYXNlRXhwb25lbnRpYWxJblxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGV4YW1wbGVcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZUV4cG9uZW50aWFsSW4oKSk7XG4gKi9cbnZhciBfZWFzZUV4cG9uZW50aWFsSW5PYmogPSB7XG4gICAgZWFzaW5nOiBmdW5jdGlvbihkdCl7XG4gICAgICAgIHJldHVybiBkdCA9PT0gMCA/IDAgOiBNYXRoLnBvdygyLCAxMCAqIChkdCAtIDEpKTtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBfZWFzZUV4cG9uZW50aWFsT3V0T2JqO1xuICAgIH1cbn07XG5jYy5lYXNlRXhwb25lbnRpYWxJbiA9IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIF9lYXNlRXhwb25lbnRpYWxJbk9iajtcbn07XG5cbi8qKlxuICogISNlblxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3QuIDxiciAvPlxuICogUmVmZXJlbmNlIGVhc2VPdXRFeHBvOiA8YnIgLz5cbiAqIGh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogISN6aFxuICog5Yib5bu6IGVhc2VFeHBvbmVudGlhbE91dCDnvJPliqjlr7nosaHjgII8YnIgLz5cbiAqIEVhc2VFeHBvbmVudGlhbE91dCDmmK/mjInmjIfmlbDlh73mlbDnvJPliqjpgIDlh7rnmoTliqjkvZzjgII8YnIgLz5cbiAqIOWPguiAgyBlYXNlT3V0RXhwb++8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogQG1ldGhvZCBlYXNlRXhwb25lbnRpYWxPdXRcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBleGFtcGxlXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VFeHBvbmVudGlhbE91dCgpKTtcbiAqL1xudmFyIF9lYXNlRXhwb25lbnRpYWxPdXRPYmogPSB7XG4gICAgZWFzaW5nOiBmdW5jdGlvbihkdCl7XG4gICAgICAgIHJldHVybiBkdCA9PT0gMSA/IDEgOiAoLShNYXRoLnBvdygyLCAtMTAgKiBkdCkpICsgMSk7XG4gICAgfSxcbiAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gX2Vhc2VFeHBvbmVudGlhbEluT2JqO1xuICAgIH1cbn07XG5jYy5lYXNlRXhwb25lbnRpYWxPdXQgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiBfZWFzZUV4cG9uZW50aWFsT3V0T2JqO1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGVzIGFuIEVhc2VFeHBvbmVudGlhbEluT3V0IGFjdGlvbiBlYXNpbmcgb2JqZWN0LiA8YnIgLz5cbiAqIFJlZmVyZW5jZSBlYXNlSW5PdXRFeHBvOiA8YnIgLz5cbiAqIGh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogISN6aFxuICog5Yib5bu6IGVhc2VFeHBvbmVudGlhbEluT3V0IOe8k+WKqOWvueixoeOAgjxiciAvPlxuICogRWFzZUV4cG9uZW50aWFsSW5PdXQg5piv5oyJ5oyH5pWw5Ye95pWw57yT5Yqo6L+b5YWl5bm26YCA5Ye655qE5Yqo5L2c44CCPGJyIC8+XG4gKiDlj4LogIMgZWFzZUluT3V0RXhwb++8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogQG1ldGhvZCBlYXNlRXhwb25lbnRpYWxJbk91dFxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGV4YW1wbGVcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZUV4cG9uZW50aWFsSW5PdXQoKSk7XG4gKi9cbnZhciBfZWFzZUV4cG9uZW50aWFsSW5PdXRPYmogPSB7XG4gICAgZWFzaW5nOiBmdW5jdGlvbihkdCl7XG4gICAgICAgIGlmKCBkdCAhPT0gMSAmJiBkdCAhPT0gMCkge1xuICAgICAgICAgICAgZHQgKj0gMjtcbiAgICAgICAgICAgIGlmIChkdCA8IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIDEwICogKGR0IC0gMSkpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiAoLU1hdGgucG93KDIsIC0xMCAqIChkdCAtIDEpKSArIDIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkdDtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBfZWFzZUV4cG9uZW50aWFsSW5PdXRPYmo7XG4gICAgfVxufTtcbmNjLmVhc2VFeHBvbmVudGlhbEluT3V0ID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gX2Vhc2VFeHBvbmVudGlhbEluT3V0T2JqO1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGVzIGFuIEVhc2VTaW5lSW4gYWN0aW9uLiA8YnIgLz5cbiAqIFJlZmVyZW5jZSBlYXNlSW5TaW5lOiA8YnIgLz5cbiAqIGh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogISN6aFxuICog5Yib5bu6IEVhc2VTaW5lSW4g57yT5Yqo5a+56LGh44CCPGJyIC8+XG4gKiBFYXNlU2luZUluIOaYr+aMieato+W8puWHveaVsOe8k+WKqOi/m+WFpeeahOWKqOS9nOOAgjxiciAvPlxuICog5Y+C6ICDIGVhc2VJblNpbmXvvJpodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcbiAqIEBtZXRob2QgZWFzZVNpbmVJblxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGV4YW1wbGVcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZVNpbmVJbigpKTtcbiAqL1xudmFyIF9lYXNlU2luZUluT2JqID0ge1xuICAgIGVhc2luZzogZnVuY3Rpb24oZHQpe1xuICAgICAgICByZXR1cm4gKGR0PT09MCB8fCBkdD09PTEpID8gZHQgOiAtMSAqIE1hdGguY29zKGR0ICogTWF0aC5QSSAvIDIpICsgMTtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBfZWFzZVNpbmVPdXRPYmo7XG4gICAgfVxufTtcbmNjLmVhc2VTaW5lSW4gPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiBfZWFzZVNpbmVJbk9iajtcbn07XG5cbi8qKlxuICogISNlblxuICogQ3JlYXRlcyBhbiBFYXNlU2luZU91dCBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XG4gKiBSZWZlcmVuY2UgZWFzZU91dFNpbmU6IDxiciAvPlxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XG4gKiAhI3poXG4gKiDliJvlu7ogRWFzZVNpbmVPdXQg57yT5Yqo5a+56LGh44CCPGJyIC8+XG4gKiBFYXNlU2luZUluIOaYr+aMieato+W8puWHveaVsOe8k+WKqOmAgOWHuueahOWKqOS9nOOAgjxiciAvPlxuICog5Y+C6ICDIGVhc2VPdXRTaW5l77yaaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XG4gKiBAbWV0aG9kIGVhc2VTaW5lT3V0XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAZXhhbXBsZVxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlU2luZU91dCgpKTtcbiAqL1xudmFyIF9lYXNlU2luZU91dE9iaiA9IHtcbiAgICBlYXNpbmc6IGZ1bmN0aW9uKGR0KXtcbiAgICAgICAgcmV0dXJuIChkdD09PTAgfHwgZHQ9PT0xKSA/IGR0IDogTWF0aC5zaW4oZHQgKiBNYXRoLlBJIC8gMik7XG4gICAgfSxcbiAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gX2Vhc2VTaW5lSW5PYmo7XG4gICAgfVxufTtcbmNjLmVhc2VTaW5lT3V0ID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gX2Vhc2VTaW5lT3V0T2JqO1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XG4gKiBSZWZlcmVuY2UgZWFzZUluT3V0U2luZTogPGJyIC8+XG4gKiBodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcbiAqICEjemhcbiAqIOWIm+W7uiBlYXNlU2luZUluT3V0IOe8k+WKqOWvueixoeOAgjxiciAvPlxuICogRWFzZVNpbmVJbiDmmK/mjInmraPlvKblh73mlbDnvJPliqjov5vlhaXlubbpgIDlh7rnmoTliqjkvZzjgII8YnIgLz5cbiAqIOWPguiAgyBlYXNlSW5PdXRTaW5l77yaaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XG4gKiBAbWV0aG9kIGVhc2VTaW5lSW5PdXRcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBleGFtcGxlXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VTaW5lSW5PdXQoKSk7XG4gKi9cbnZhciBfZWFzZVNpbmVJbk91dE9iaiA9IHtcbiAgICBlYXNpbmc6IGZ1bmN0aW9uKGR0KXtcbiAgICAgICAgcmV0dXJuIChkdCA9PT0gMCB8fCBkdCA9PT0gMSkgPyBkdCA6IC0wLjUgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIGR0KSAtIDEpO1xuICAgIH0sXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIF9lYXNlU2luZUluT3V0T2JqO1xuICAgIH1cbn07XG5jYy5lYXNlU2luZUluT3V0ID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gX2Vhc2VTaW5lSW5PdXRPYmo7XG59O1xuXG4vKipcbiAqIEBtb2R1bGUgY2NcbiAqL1xuXG4vKipcbiAqICEjZW5cbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0IHdpdGggdGhlIHBlcmlvZCBpbiByYWRpYW5zIChkZWZhdWx0IGlzIDAuMykuIDxiciAvPlxuICogUmVmZXJlbmNlIGVhc2VJbkVsYXN0aWM6IDxiciAvPlxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XG4gKiAhI3poXG4gKiDliJvlu7ogZWFzZUVsYXN0aWNJbiDnvJPliqjlr7nosaHjgII8YnIgLz5cbiAqIEVhc2VFbGFzdGljSW4g5piv5oyJ5by55oCn5puy57q/57yT5Yqo6L+b5YWl55qE5Yqo5L2c44CCPGJyIC8+XG4gKiDlj4LmlbAgZWFzZUluRWxhc3RpY++8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogQG1ldGhvZCBlYXNlRWxhc3RpY0luXG4gKiBAcGFyYW0ge051bWJlcn0gcGVyaW9kXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAZXhhbXBsZVxuICogLy8gZXhhbXBsZVxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlRWxhc3RpY0luKDMuMCkpO1xuICovXG4vL2RlZmF1bHQgZWFzZSBlbGFzdGljIGluIG9iamVjdCAocGVyaW9kID0gMC4zKVxudmFyIF9lYXNlRWxhc3RpY0luT2JqID0ge1xuICAgIGVhc2luZzpmdW5jdGlvbihkdCl7XG4gICAgICAgIGlmIChkdCA9PT0gMCB8fCBkdCA9PT0gMSlcbiAgICAgICAgICAgIHJldHVybiBkdDtcbiAgICAgICAgZHQgPSBkdCAtIDE7XG4gICAgICAgIHJldHVybiAtTWF0aC5wb3coMiwgMTAgKiBkdCkgKiBNYXRoLnNpbigoZHQgLSAoMC4zIC8gNCkpICogTWF0aC5QSSAqIDIgLyAwLjMpO1xuICAgIH0sXG4gICAgIHJldmVyc2U6ZnVuY3Rpb24oKXtcbiAgICAgICAgIHJldHVybiBfZWFzZUVsYXN0aWNPdXRPYmo7XG4gICAgIH1cbiB9O1xuY2MuZWFzZUVsYXN0aWNJbiA9IGZ1bmN0aW9uIChwZXJpb2QpIHtcbiAgICBpZihwZXJpb2QgJiYgcGVyaW9kICE9PSAwLjMpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgX3BlcmlvZDogcGVyaW9kLFxuICAgICAgICAgICAgZWFzaW5nOiBmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZHQgPT09IDAgfHwgZHQgPT09IDEpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkdDtcbiAgICAgICAgICAgICAgICBkdCA9IGR0IC0gMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gLU1hdGgucG93KDIsIDEwICogZHQpICogTWF0aC5zaW4oKGR0IC0gKHRoaXMuX3BlcmlvZCAvIDQpKSAqIE1hdGguUEkgKiAyIC8gdGhpcy5fcGVyaW9kKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2MuZWFzZUVsYXN0aWNPdXQodGhpcy5fcGVyaW9kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIF9lYXNlRWxhc3RpY0luT2JqO1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdCB3aXRoIHRoZSBwZXJpb2QgaW4gcmFkaWFucyAoZGVmYXVsdCBpcyAwLjMpLiA8YnIgLz5cbiAqIFJlZmVyZW5jZSBlYXNlT3V0RWxhc3RpYzogPGJyIC8+XG4gKiBodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcbiAqICEjemhcbiAqIOWIm+W7uiBlYXNlRWxhc3RpY091dCDnvJPliqjlr7nosaHjgII8YnIgLz5cbiAqIEVhc2VFbGFzdGljT3V0IOaYr+aMieW8ueaAp+absue6v+e8k+WKqOmAgOWHuueahOWKqOS9nOOAgjxiciAvPlxuICog5Y+C6ICDIGVhc2VPdXRFbGFzdGlj77yaaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XG4gKiBAbWV0aG9kIGVhc2VFbGFzdGljT3V0XG4gKiBAcGFyYW0ge051bWJlcn0gcGVyaW9kXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAZXhhbXBsZVxuICogLy8gZXhhbXBsZVxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlRWxhc3RpY091dCgzLjApKTtcbiAqL1xuLy9kZWZhdWx0IGVhc2UgZWxhc3RpYyBvdXQgb2JqZWN0IChwZXJpb2QgPSAwLjMpXG52YXIgX2Vhc2VFbGFzdGljT3V0T2JqID0ge1xuICAgIGVhc2luZzogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIHJldHVybiAoZHQgPT09IDAgfHwgZHQgPT09IDEpID8gZHQgOiBNYXRoLnBvdygyLCAtMTAgKiBkdCkgKiBNYXRoLnNpbigoZHQgLSAoMC4zIC8gNCkpICogTWF0aC5QSSAqIDIgLyAwLjMpICsgMTtcbiAgICB9LFxuICAgIHJldmVyc2U6ZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIF9lYXNlRWxhc3RpY0luT2JqO1xuICAgIH1cbn07XG5jYy5lYXNlRWxhc3RpY091dCA9IGZ1bmN0aW9uIChwZXJpb2QpIHtcbiAgICBpZihwZXJpb2QgJiYgcGVyaW9kICE9PSAwLjMpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgX3BlcmlvZDogcGVyaW9kLFxuICAgICAgICAgICAgZWFzaW5nOiBmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGR0ID09PSAwIHx8IGR0ID09PSAxKSA/IGR0IDogTWF0aC5wb3coMiwgLTEwICogZHQpICogTWF0aC5zaW4oKGR0IC0gKHRoaXMuX3BlcmlvZCAvIDQpKSAqIE1hdGguUEkgKiAyIC8gdGhpcy5fcGVyaW9kKSArIDE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmV2ZXJzZTpmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHJldHVybiBjYy5lYXNlRWxhc3RpY0luKHRoaXMuX3BlcmlvZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBfZWFzZUVsYXN0aWNPdXRPYmo7XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0IHdpdGggdGhlIHBlcmlvZCBpbiByYWRpYW5zIChkZWZhdWx0IGlzIDAuMykuIDxiciAvPlxuICogUmVmZXJlbmNlIGVhc2VJbk91dEVsYXN0aWM6IDxiciAvPlxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XG4gKiAhI3poXG4gKiDliJvlu7ogZWFzZUVsYXN0aWNJbk91dCDnvJPliqjlr7nosaHjgII8YnIgLz5cbiAqIEVhc2VFbGFzdGljSW5PdXQg5piv5oyJ5by55oCn5puy57q/57yT5Yqo6L+b5YWl5bm26YCA5Ye655qE5Yqo5L2c44CCPGJyIC8+XG4gKiDlj4LogIMgZWFzZUluT3V0RWxhc3RpY++8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogQG1ldGhvZCBlYXNlRWxhc3RpY0luT3V0XG4gKiBAcGFyYW0ge051bWJlcn0gcGVyaW9kXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAZXhhbXBsZVxuICogLy8gZXhhbXBsZVxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlRWxhc3RpY0luT3V0KDMuMCkpO1xuICovXG5jYy5lYXNlRWxhc3RpY0luT3V0ID0gZnVuY3Rpb24gKHBlcmlvZCkge1xuICAgIHBlcmlvZCA9IHBlcmlvZCB8fCAwLjM7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgX3BlcmlvZDogcGVyaW9kLFxuICAgICAgICBlYXNpbmc6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICAgICAgdmFyIG5ld1QgPSAwO1xuICAgICAgICAgICAgdmFyIGxvY1BlcmlvZCA9IHRoaXMuX3BlcmlvZDtcbiAgICAgICAgICAgIGlmIChkdCA9PT0gMCB8fCBkdCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIG5ld1QgPSBkdDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZHQgPSBkdCAqIDI7XG4gICAgICAgICAgICAgICAgaWYgKCFsb2NQZXJpb2QpXG4gICAgICAgICAgICAgICAgICAgIGxvY1BlcmlvZCA9IHRoaXMuX3BlcmlvZCA9IDAuMyAqIDEuNTtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IGxvY1BlcmlvZCAvIDQ7XG4gICAgICAgICAgICAgICAgZHQgPSBkdCAtIDE7XG4gICAgICAgICAgICAgICAgaWYgKGR0IDwgMClcbiAgICAgICAgICAgICAgICAgICAgbmV3VCA9IC0wLjUgKiBNYXRoLnBvdygyLCAxMCAqIGR0KSAqIE1hdGguc2luKChkdCAtIHMpICogTWF0aC5QSSAqIDIgLyBsb2NQZXJpb2QpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbmV3VCA9IE1hdGgucG93KDIsIC0xMCAqIGR0KSAqIE1hdGguc2luKChkdCAtIHMpICogTWF0aC5QSSAqIDIgLyBsb2NQZXJpb2QpICogMC41ICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXdUO1xuICAgICAgICB9LFxuICAgICAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIGNjLmVhc2VFbGFzdGljSW5PdXQodGhpcy5fcGVyaW9kKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG4vKipcbiAqIEBtb2R1bGUgY2NcbiAqL1xuXG5mdW5jdGlvbiBfYm91bmNlVGltZSAodGltZTEpIHtcbiAgICBpZiAodGltZTEgPCAxIC8gMi43NSkge1xuICAgICAgICByZXR1cm4gNy41NjI1ICogdGltZTEgKiB0aW1lMTtcbiAgICB9IGVsc2UgaWYgKHRpbWUxIDwgMiAvIDIuNzUpIHtcbiAgICAgICAgdGltZTEgLT0gMS41IC8gMi43NTtcbiAgICAgICAgcmV0dXJuIDcuNTYyNSAqIHRpbWUxICogdGltZTEgKyAwLjc1O1xuICAgIH0gZWxzZSBpZiAodGltZTEgPCAyLjUgLyAyLjc1KSB7XG4gICAgICAgIHRpbWUxIC09IDIuMjUgLyAyLjc1O1xuICAgICAgICByZXR1cm4gNy41NjI1ICogdGltZTEgKiB0aW1lMSArIDAuOTM3NTtcbiAgICB9XG5cbiAgICB0aW1lMSAtPSAyLjYyNSAvIDIuNzU7XG4gICAgcmV0dXJuIDcuNTYyNSAqIHRpbWUxICogdGltZTEgKyAwLjk4NDM3NTtcbn07XG5cbnZhciBfZWFzZUJvdW5jZUluT2JqID0ge1xuICAgIGVhc2luZzogZnVuY3Rpb24oZHQpe1xuICAgICAgICByZXR1cm4gMSAtIF9ib3VuY2VUaW1lKDEgLSBkdCk7XG4gICAgfSxcbiAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gX2Vhc2VCb3VuY2VPdXRPYmo7XG4gICAgfVxufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XG4gKiBFYXNlZCBib3VuY2UgZWZmZWN0IGF0IHRoZSBiZWdpbm5pbmcuXG4gKiAhI3poXG4gKiDliJvlu7ogZWFzZUJvdW5jZUluIOe8k+WKqOWvueixoeOAgjxiciAvPlxuICogRWFzZUJvdW5jZUluIOaYr+aMieW8uei3s+WKqOS9nOe8k+WKqOi/m+WFpeeahOWKqOS9nOOAglxuICogQG1ldGhvZCBlYXNlQm91bmNlSW5cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBleGFtcGxlXG4gKiAvLyBleGFtcGxlXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VCb3VuY2VJbigpKTtcbiAqL1xuY2MuZWFzZUJvdW5jZUluID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gX2Vhc2VCb3VuY2VJbk9iajtcbn07XG5cbi8qKlxuICogISNlblxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3QuIDxiciAvPlxuICogRWFzZWQgYm91bmNlIGVmZmVjdCBhdCB0aGUgZW5kaW5nLlxuICogISN6aFxuICog5Yib5bu6IGVhc2VCb3VuY2VPdXQg57yT5Yqo5a+56LGh44CCPGJyIC8+XG4gKiBFYXNlQm91bmNlT3V0IOaYr+aMieW8uei3s+WKqOS9nOe8k+WKqOmAgOWHuueahOWKqOS9nOOAglxuICogQG1ldGhvZCBlYXNlQm91bmNlT3V0XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAZXhhbXBsZVxuICogLy8gZXhhbXBsZVxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlQm91bmNlT3V0KCkpO1xuICovXG52YXIgX2Vhc2VCb3VuY2VPdXRPYmogPSB7XG4gICAgZWFzaW5nOiBmdW5jdGlvbihkdCl7XG4gICAgICAgIHJldHVybiBfYm91bmNlVGltZShkdCk7XG4gICAgfSxcbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9lYXNlQm91bmNlSW5PYmo7XG4gICAgfVxufTtcbmNjLmVhc2VCb3VuY2VPdXQgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiBfZWFzZUJvdW5jZU91dE9iajtcbn07XG5cbi8qKlxuICogISNlblxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3QuIDxiciAvPlxuICogRWFzZWQgYm91bmNlIGVmZmVjdCBhdCB0aGUgYmVnaW5pbmcgYW5kIGVuZGluZy5cbiAqICEjemhcbiAqIOWIm+W7uiBlYXNlQm91bmNlSW5PdXQg57yT5Yqo5a+56LGh44CCPGJyIC8+XG4gKiBFYXNlQm91bmNlSW5PdXQg5piv5oyJ5by56Lez5Yqo5L2c57yT5Yqo6L+b5YWl5bm26YCA5Ye655qE5Yqo5L2c44CCXG4gKiBAbWV0aG9kIGVhc2VCb3VuY2VJbk91dFxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGV4YW1wbGVcbiAqIC8vIGV4YW1wbGVcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZUJvdW5jZUluT3V0KCkpO1xuICovXG52YXIgX2Vhc2VCb3VuY2VJbk91dE9iaiA9IHtcbiAgICBlYXNpbmc6IGZ1bmN0aW9uICh0aW1lMSkge1xuICAgICAgICB2YXIgbmV3VDtcbiAgICAgICAgaWYgKHRpbWUxIDwgMC41KSB7XG4gICAgICAgICAgICB0aW1lMSA9IHRpbWUxICogMjtcbiAgICAgICAgICAgIG5ld1QgPSAoMSAtIF9ib3VuY2VUaW1lKDEgLSB0aW1lMSkpICogMC41O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3VCA9IF9ib3VuY2VUaW1lKHRpbWUxICogMiAtIDEpICogMC41ICsgMC41O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdUO1xuICAgIH0sXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIF9lYXNlQm91bmNlSW5PdXRPYmo7XG4gICAgfVxufTtcbmNjLmVhc2VCb3VuY2VJbk91dCA9IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIF9lYXNlQm91bmNlSW5PdXRPYmo7XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0LiA8YnIgLz5cbiAqIEluIHRoZSBvcHBvc2l0ZSBkaXJlY3Rpb24gdG8gbW92ZSBzbG93bHksIGFuZCB0aGVuIGFjY2VsZXJhdGVkIHRvIHRoZSByaWdodCBkaXJlY3Rpb24uXG4gKiAhI3poXG4gKiDliJvlu7ogZWFzZUJhY2tJbiDnvJPliqjlr7nosaHjgII8YnIgLz5cbiAqIGVhc2VCYWNrSW4g5piv5Zyo55u45Y+N55qE5pa55ZCR57yT5oWi56e75Yqo77yM54S25ZCO5Yqg6YCf5Yiw5q2j56Gu55qE5pa55ZCR44CCPGJyIC8+XG4gKiBAbWV0aG9kIGVhc2VCYWNrSW5cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBleGFtcGxlXG4gKiAvLyBleGFtcGxlXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VCYWNrSW4oKSk7XG4gKi9cbnZhciBfZWFzZUJhY2tJbk9iaiA9IHtcbiAgICBlYXNpbmc6IGZ1bmN0aW9uICh0aW1lMSkge1xuICAgICAgICB2YXIgb3ZlcnNob290ID0gMS43MDE1ODtcbiAgICAgICAgcmV0dXJuICh0aW1lMT09PTAgfHwgdGltZTE9PT0xKSA/IHRpbWUxIDogdGltZTEgKiB0aW1lMSAqICgob3ZlcnNob290ICsgMSkgKiB0aW1lMSAtIG92ZXJzaG9vdCk7XG4gICAgfSxcbiAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gX2Vhc2VCYWNrT3V0T2JqO1xuICAgIH1cbn07XG5jYy5lYXNlQmFja0luID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gX2Vhc2VCYWNrSW5PYmo7XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0LiA8YnIgLz5cbiAqIEZhc3QgbW92aW5nIG1vcmUgdGhhbiB0aGUgZmluaXNoLCBhbmQgdGhlbiBzbG93bHkgYmFjayB0byB0aGUgZmluaXNoLlxuICogISN6aFxuICog5Yib5bu6IGVhc2VCYWNrT3V0IOe8k+WKqOWvueixoeOAgjxiciAvPlxuICogZWFzZUJhY2tPdXQg5b+r6YCf56e75Yqo6LaF5Ye655uu5qCH77yM54S25ZCO5oWi5oWi5Zue5Yiw55uu5qCH54K544CCXG4gKiBAbWV0aG9kIGVhc2VCYWNrT3V0XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAZXhhbXBsZVxuICogLy8gZXhhbXBsZVxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlQmFja091dCgpKTtcbiAqL1xudmFyIF9lYXNlQmFja091dE9iaiA9IHtcbiAgICBlYXNpbmc6IGZ1bmN0aW9uICh0aW1lMSkge1xuICAgICAgICBpZiAodGltZTEgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvdmVyc2hvb3QgPSAxLjcwMTU4O1xuICAgICAgICB0aW1lMSA9IHRpbWUxIC0gMTtcbiAgICAgICAgcmV0dXJuIHRpbWUxICogdGltZTEgKiAoKG92ZXJzaG9vdCArIDEpICogdGltZTEgKyBvdmVyc2hvb3QpICsgMTtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBfZWFzZUJhY2tJbk9iajtcbiAgICB9XG59O1xuY2MuZWFzZUJhY2tPdXQgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiBfZWFzZUJhY2tPdXRPYmo7XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0LiA8YnIgLz5cbiAqIEJlZ2luaW5nIG9mIGNjLkVhc2VCYWNrSW4uIEVuZGluZyBvZiBjYy5FYXNlQmFja091dC5cbiAqICEjemhcbiAqIOWIm+W7uiBlYXNlQmFja0luT3V0IOe8k+WKqOWvueixoeOAgjxiciAvPlxuICogQG1ldGhvZCBlYXNlQmFja0luT3V0XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAZXhhbXBsZVxuICogLy8gZXhhbXBsZVxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlQmFja0luT3V0KCkpO1xuICovXG52YXIgX2Vhc2VCYWNrSW5PdXRPYmogPSB7XG4gICAgZWFzaW5nOiBmdW5jdGlvbiAodGltZTEpIHtcbiAgICAgICAgdmFyIG92ZXJzaG9vdCA9IDEuNzAxNTggKiAxLjUyNTtcbiAgICAgICAgdGltZTEgPSB0aW1lMSAqIDI7XG4gICAgICAgIGlmICh0aW1lMSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAodGltZTEgKiB0aW1lMSAqICgob3ZlcnNob290ICsgMSkgKiB0aW1lMSAtIG92ZXJzaG9vdCkpIC8gMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRpbWUxID0gdGltZTEgLSAyO1xuICAgICAgICAgICAgcmV0dXJuICh0aW1lMSAqIHRpbWUxICogKChvdmVyc2hvb3QgKyAxKSAqIHRpbWUxICsgb3ZlcnNob290KSkgLyAyICsgMTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIF9lYXNlQmFja0luT3V0T2JqO1xuICAgIH1cbn07XG5jYy5lYXNlQmFja0luT3V0ID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gX2Vhc2VCYWNrSW5PdXRPYmo7XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0LiA8YnIgLz5cbiAqIEludG8gdGhlIDQgcmVmZXJlbmNlIHBvaW50LiA8YnIgLz5cbiAqIFRvIGNhbGN1bGF0ZSB0aGUgbW90aW9uIGN1cnZlLlxuICogISN6aFxuICog5Yib5bu6IGVhc2VCZXppZXJBY3Rpb24g57yT5Yqo5a+56LGh44CCPGJyIC8+XG4gKiBFYXNlQmV6aWVyQWN0aW9uIOaYr+aMiei0neWhnuWwlOabsue6v+e8k+WKqOeahOWKqOS9nOOAglxuICogQG1ldGhvZCBlYXNlQmV6aWVyQWN0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gcDAgVGhlIGZpcnN0IGJlemllciBwYXJhbWV0ZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBwMSBUaGUgc2Vjb25kIGJlemllciBwYXJhbWV0ZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBwMiBUaGUgdGhpcmQgYmV6aWVyIHBhcmFtZXRlclxuICogQHBhcmFtIHtOdW1iZXJ9IHAzIFRoZSBmb3VydGggYmV6aWVyIHBhcmFtZXRlclxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBleGFtcGxlXG4gKiAvLyBleGFtcGxlXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VCZXppZXJBY3Rpb24oMC41LCAwLjUsIDEuMCwgMS4wKSk7XG4gKi9cbmNjLmVhc2VCZXppZXJBY3Rpb24gPSBmdW5jdGlvbihhLCBiLCBjLCBkKXtcbiAgICByZXR1cm4ge1xuICAgICAgICBlYXNpbmc6IGZ1bmN0aW9uKHQpe1xuICAgICAgICAgICAgcmV0dXJuIChNYXRoLnBvdygxLXQsMykgKiBhICsgMyp0KihNYXRoLnBvdygxLXQsMikpKmIgKyAzKk1hdGgucG93KHQsMikqKDEtdCkqYyArIE1hdGgucG93KHQsMykqZCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gY2MuZWFzZUJlemllckFjdGlvbihkLCBjLCBiLCBhKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0LiA8YnIgLz5cbiAqIFJlZmVyZW5jZSBlYXNlSW5RdWFkOiA8YnIgLz5cbiAqIGh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogISN6aFxuICog5Yib5bu6IGVhc2VRdWFkcmF0aWNBY3Rpb25JbiDnvJPliqjlr7nosaHjgII8YnIgLz5cbiAqIEVhc2VRdWFkcmF0aWNJbuaYr+aMieS6jOasoeWHveaVsOe8k+WKqOi/m+WFpeeahOWKqOS9nOOAgjxiciAvPlxuICog5Y+C6ICDIGVhc2VJblF1YWTvvJpodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcbiAqIEBtZXRob2QgZWFzZVF1YWRyYXRpY0FjdGlvbkluXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQGV4YW1wbGVcbiAqIC8vZXhhbXBsZVxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlUXVhZHJhdGljQWN0aW9uSW4oKSk7XG4gKi9cbnZhciBfZWFzZVF1YWRyYXRpY0FjdGlvbkluID0ge1xuICAgIGVhc2luZzogZnVuY3Rpb24odGltZSl7XG4gICAgICAgIHJldHVybiBNYXRoLnBvdyh0aW1lLCAyKTtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBfZWFzZVF1YWRyYXRpY0FjdGlvbkluO1xuICAgIH1cbn07XG5jYy5lYXNlUXVhZHJhdGljQWN0aW9uSW4gPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiBfZWFzZVF1YWRyYXRpY0FjdGlvbkluO1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XG4gKiBSZWZlcmVuY2UgZWFzZU91dFF1YWQ6IDxiciAvPlxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XG4gKiAhI3poXG4gKiDliJvlu7ogZWFzZVF1YWRyYXRpY0FjdGlvbk91dCDnvJPliqjlr7nosaHjgII8YnIgLz5cbiAqIEVhc2VRdWFkcmF0aWNPdXQg5piv5oyJ5LqM5qyh5Ye95pWw57yT5Yqo6YCA5Ye655qE5Yqo5L2c44CCPGJyIC8+XG4gKiDlj4LogIMgZWFzZU91dFF1YWTvvJpodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcbiAqIEBtZXRob2QgZWFzZVF1YWRyYXRpY0FjdGlvbk91dFxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBleGFtcGxlXG4gKiAvL2V4YW1wbGVcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZVF1YWRyYXRpY0FjdGlvbk91dCgpKTtcbiAqL1xudmFyIF9lYXNlUXVhZHJhdGljQWN0aW9uT3V0ID0ge1xuICAgIGVhc2luZzogZnVuY3Rpb24odGltZSl7XG4gICAgICAgIHJldHVybiAtdGltZSoodGltZS0yKTtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBfZWFzZVF1YWRyYXRpY0FjdGlvbk91dDtcbiAgICB9XG59O1xuY2MuZWFzZVF1YWRyYXRpY0FjdGlvbk91dCA9IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIF9lYXNlUXVhZHJhdGljQWN0aW9uT3V0O1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XG4gKiBSZWZlcmVuY2UgZWFzZUluT3V0UXVhZDogPGJyIC8+XG4gKiBodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcbiAqICEjemhcbiAqIOWIm+W7uiBlYXNlUXVhZHJhdGljQWN0aW9uSW5PdXQg57yT5Yqo5a+56LGh44CCPGJyIC8+XG4gKiBFYXNlUXVhZHJhdGljSW5PdXQg5piv5oyJ5LqM5qyh5Ye95pWw57yT5Yqo6L+b5YWl5bm26YCA5Ye655qE5Yqo5L2c44CCPGJyIC8+XG4gKiDlj4LogIMgZWFzZUluT3V0UXVhZO+8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogQG1ldGhvZCBlYXNlUXVhZHJhdGljQWN0aW9uSW5PdXRcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAZXhhbXBsZVxuICogLy9leGFtcGxlXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VRdWFkcmF0aWNBY3Rpb25Jbk91dCgpKTtcbiAqL1xudmFyIF9lYXNlUXVhZHJhdGljQWN0aW9uSW5PdXQgPSB7XG4gICAgZWFzaW5nOiBmdW5jdGlvbih0aW1lKXtcbiAgICAgICAgdmFyIHJlc3VsdFRpbWUgPSB0aW1lO1xuICAgICAgICB0aW1lICo9IDI7XG4gICAgICAgIGlmKHRpbWUgPCAxKXtcbiAgICAgICAgICAgIHJlc3VsdFRpbWUgPSB0aW1lICogdGltZSAqIDAuNTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAtLXRpbWU7XG4gICAgICAgICAgICByZXN1bHRUaW1lID0gLTAuNSAqICggdGltZSAqICggdGltZSAtIDIgKSAtIDEpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdFRpbWU7XG4gICAgfSxcbiAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gX2Vhc2VRdWFkcmF0aWNBY3Rpb25Jbk91dDtcbiAgICB9XG59O1xuY2MuZWFzZVF1YWRyYXRpY0FjdGlvbkluT3V0ID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gX2Vhc2VRdWFkcmF0aWNBY3Rpb25Jbk91dDtcbn07XG5cbi8qKlxuICogISNlblxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3QuIDxiciAvPlxuICogUmVmZXJlbmNlIGVhc2VJbnRRdWFydDogPGJyIC8+XG4gKiBodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcbiAqICEjemhcbiAqIOWIm+W7uiBlYXNlUXVhcnRpY0FjdGlvbkluIOe8k+WKqOWvueixoeOAgjxiciAvPlxuICogRWFzZVF1YXJ0aWNJbiDmmK/mjInlm5vmrKHlh73mlbDnvJPliqjov5vlhaXnmoTliqjkvZzjgII8YnIgLz5cbiAqIOWPguiAgyBlYXNlSW50UXVhcnTvvJpodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcbiAqIEBtZXRob2QgZWFzZVF1YXJ0aWNBY3Rpb25JblxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBleGFtcGxlXG4gKiAvL2V4YW1wbGVcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZVF1YXJ0aWNBY3Rpb25JbigpKTtcbiAqL1xudmFyIF9lYXNlUXVhcnRpY0FjdGlvbkluID0ge1xuICAgIGVhc2luZzogZnVuY3Rpb24odGltZSl7XG4gICAgICAgIHJldHVybiB0aW1lICogdGltZSAqIHRpbWUgKiB0aW1lO1xuICAgIH0sXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIF9lYXNlUXVhcnRpY0FjdGlvbkluO1xuICAgIH1cbn07XG5jYy5lYXNlUXVhcnRpY0FjdGlvbkluID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gX2Vhc2VRdWFydGljQWN0aW9uSW47XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0LiA8YnIgLz5cbiAqIFJlZmVyZW5jZSBlYXNlT3V0UXVhcnQ6IDxiciAvPlxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XG4gKiAhI3poXG4gKiDliJvlu7ogZWFzZVF1YXJ0aWNBY3Rpb25PdXQg57yT5Yqo5a+56LGh44CCPGJyIC8+XG4gKiBFYXNlUXVhcnRpY091dCDmmK/mjInlm5vmrKHlh73mlbDnvJPliqjpgIDlh7rnmoTliqjkvZzjgII8YnIgLz5cbiAqIOWPguiAgyBlYXNlT3V0UXVhcnTvvJpodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcbiAqIEBtZXRob2QgZWFzZVF1YXJ0aWNBY3Rpb25PdXRcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAZXhhbXBsZVxuICogLy9leGFtcGxlXG4gKiBhY3Rpb24uZWFzaW5nKGNjLlF1YXJ0aWNBY3Rpb25PdXQoKSk7XG4gKi9cbnZhciBfZWFzZVF1YXJ0aWNBY3Rpb25PdXQgPSB7XG4gICAgZWFzaW5nOiBmdW5jdGlvbih0aW1lKXtcbiAgICAgICAgdGltZSAtPSAxO1xuICAgICAgICByZXR1cm4gLSh0aW1lICogdGltZSAqIHRpbWUgKiB0aW1lIC0gMSk7XG4gICAgfSxcbiAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gX2Vhc2VRdWFydGljQWN0aW9uT3V0O1xuICAgIH1cbn07XG5jYy5lYXNlUXVhcnRpY0FjdGlvbk91dCA9IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIF9lYXNlUXVhcnRpY0FjdGlvbk91dDtcbn07XG5cbi8qKlxuICogISNlblxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3QuICA8YnIgLz5cbiAqIFJlZmVyZW5jZSBlYXNlSW5PdXRRdWFydDogPGJyIC8+XG4gKiBodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcbiAqICEjemhcbiAqIOWIm+W7uiBlYXNlUXVhcnRpY0FjdGlvbkluT3V0IOe8k+WKqOWvueixoeOAgjxiciAvPlxuICogRWFzZVF1YXJ0aWNJbk91dCDmmK/mjInlm5vmrKHlh73mlbDnvJPliqjov5vlhaXlubbpgIDlh7rnmoTliqjkvZzjgII8YnIgLz5cbiAqIOWPguiAgyBlYXNlSW5PdXRRdWFydO+8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogQG1ldGhvZCBlYXNlUXVhcnRpY0FjdGlvbkluT3V0XG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG52YXIgX2Vhc2VRdWFydGljQWN0aW9uSW5PdXQgPSB7XG4gICAgZWFzaW5nOiBmdW5jdGlvbih0aW1lKXtcbiAgICAgICAgdGltZSA9IHRpbWUqMjtcbiAgICAgICAgaWYgKHRpbWUgPCAxKVxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIHRpbWUgKiB0aW1lICogdGltZSAqIHRpbWU7XG4gICAgICAgIHRpbWUgLT0gMjtcbiAgICAgICAgcmV0dXJuIC0wLjUgKiAodGltZSAqIHRpbWUgKiB0aW1lICogdGltZSAtIDIpO1xuICAgIH0sXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIF9lYXNlUXVhcnRpY0FjdGlvbkluT3V0O1xuICAgIH1cbn07XG5jYy5lYXNlUXVhcnRpY0FjdGlvbkluT3V0ID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gX2Vhc2VRdWFydGljQWN0aW9uSW5PdXQ7XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0LiA8YnIgLz5cbiAqIFJlZmVyZW5jZSBlYXNlSW5RdWludDogPGJyIC8+XG4gKiBodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcbiAqICEjemhcbiAqIOWIm+W7uiBlYXNlUXVpbnRpY0FjdGlvbkluIOe8k+WKqOWvueixoeOAgjxiciAvPlxuICogRWFzZVF1aW50aWNJbiDmmK/mjInkupTmrKHlh73mlbDnvJPliqjov5vnmoTliqjkvZzjgII8YnIgLz5cbiAqIOWPguiAgyBlYXNlSW5RdWludO+8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogQG1ldGhvZCBlYXNlUXVpbnRpY0FjdGlvbkluXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQGV4YW1wbGVcbiAqIC8vZXhhbXBsZVxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlUXVpbnRpY0FjdGlvbkluKCkpO1xuICovXG52YXIgX2Vhc2VRdWludGljQWN0aW9uSW4gPSB7XG4gICAgZWFzaW5nOiBmdW5jdGlvbih0aW1lKXtcbiAgICAgICAgcmV0dXJuIHRpbWUgKiB0aW1lICogdGltZSAqIHRpbWUgKiB0aW1lO1xuICAgIH0sXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIF9lYXNlUXVpbnRpY0FjdGlvbkluO1xuICAgIH1cbn07XG5jYy5lYXNlUXVpbnRpY0FjdGlvbkluID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gX2Vhc2VRdWludGljQWN0aW9uSW47XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0LiA8YnIgLz5cbiAqIFJlZmVyZW5jZSBlYXNlT3V0UXVpbnQ6IDxiciAvPlxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XG4gKiAhI3poXG4gKiDliJvlu7ogZWFzZVF1aW50aWNBY3Rpb25PdXQg57yT5Yqo5a+56LGh44CCPGJyIC8+XG4gKiBFYXNlUXVpbnRpY091dCDmmK/mjInkupTmrKHlh73mlbDnvJPliqjpgIDlh7rnmoTliqjkvZxcbiAqIOWPguiAgyBlYXNlT3V0UXVpbnTvvJpodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcbiAqIEBtZXRob2QgZWFzZVF1aW50aWNBY3Rpb25PdXRcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAZXhhbXBsZVxuICogLy9leGFtcGxlXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VRdWFkcmF0aWNBY3Rpb25PdXQoKSk7XG4gKi9cbnZhciBfZWFzZVF1aW50aWNBY3Rpb25PdXQgPSB7XG4gICAgZWFzaW5nOiBmdW5jdGlvbih0aW1lKXtcbiAgICAgICAgdGltZSAtPTE7XG4gICAgICAgIHJldHVybiAodGltZSAqIHRpbWUgKiB0aW1lICogdGltZSAqIHRpbWUgKyAxKTtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBfZWFzZVF1aW50aWNBY3Rpb25PdXQ7XG4gICAgfVxufTtcbmNjLmVhc2VRdWludGljQWN0aW9uT3V0ID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gX2Vhc2VRdWludGljQWN0aW9uT3V0O1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XG4gKiBSZWZlcmVuY2UgZWFzZUluT3V0UXVpbnQ6IDxiciAvPlxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XG4gKiAhI3poXG4gKiDliJvlu7ogZWFzZVF1aW50aWNBY3Rpb25Jbk91dCDnvJPliqjlr7nosaHjgII8YnIgLz5cbiAqIEVhc2VRdWludGljSW5PdXTmmK/mjInkupTmrKHlh73mlbDnvJPliqjov5vlhaXlubbpgIDlh7rnmoTliqjkvZzjgII8YnIgLz5cbiAqIOWPguiAgyBlYXNlSW5PdXRRdWludO+8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogQG1ldGhvZCBlYXNlUXVpbnRpY0FjdGlvbkluT3V0XG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQGV4YW1wbGVcbiAqIC8vZXhhbXBsZVxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlUXVpbnRpY0FjdGlvbkluT3V0KCkpO1xuICovXG52YXIgX2Vhc2VRdWludGljQWN0aW9uSW5PdXQgPSB7XG4gICAgZWFzaW5nOiBmdW5jdGlvbih0aW1lKXtcbiAgICAgICAgdGltZSA9IHRpbWUqMjtcbiAgICAgICAgaWYgKHRpbWUgPCAxKVxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIHRpbWUgKiB0aW1lICogdGltZSAqIHRpbWUgKiB0aW1lO1xuICAgICAgICB0aW1lIC09IDI7XG4gICAgICAgIHJldHVybiAwLjUgKiAodGltZSAqIHRpbWUgKiB0aW1lICogdGltZSAqIHRpbWUgKyAyKTtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBfZWFzZVF1aW50aWNBY3Rpb25Jbk91dDtcbiAgICB9XG59O1xuY2MuZWFzZVF1aW50aWNBY3Rpb25Jbk91dCA9IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIF9lYXNlUXVpbnRpY0FjdGlvbkluT3V0O1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XG4gKiBSZWZlcmVuY2UgZWFzZUluQ2lyYzogPGJyIC8+XG4gKiBodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcbiAqICEjemhcbiAqIOWIm+W7uiBlYXNlQ2lyY2xlQWN0aW9uSW4g57yT5Yqo5a+56LGh44CCPGJyIC8+XG4gKiBFYXNlQ2lyY2xlSW7mmK/mjInlnIblvaLmm7Lnur/nvJPliqjov5vlhaXnmoTliqjkvZzjgII8YnIgLz5cbiAqIOWPguiAgyBlYXNlSW5DaXJj77yaaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XG4gKiBAbWV0aG9kIGVhc2VDaXJjbGVBY3Rpb25JblxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBleGFtcGxlXG4gKiAvL2V4YW1wbGVcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZUNpcmNsZUFjdGlvbkluKCkpO1xuICovXG52YXIgX2Vhc2VDaXJjbGVBY3Rpb25JbiA9IHtcbiAgICBlYXNpbmc6IGZ1bmN0aW9uKHRpbWUpe1xuICAgICAgICByZXR1cm4gLTEgKiAoTWF0aC5zcXJ0KDEgLSB0aW1lICogdGltZSkgLSAxKTtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBfZWFzZUNpcmNsZUFjdGlvbkluO1xuICAgIH1cbn07XG5jYy5lYXNlQ2lyY2xlQWN0aW9uSW4gPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiBfZWFzZUNpcmNsZUFjdGlvbkluO1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XG4gKiBSZWZlcmVuY2UgZWFzZU91dENpcmM6IDxiciAvPlxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XG4gKiAhI3poXG4gKiDliJvlu7ogZWFzZUNpcmNsZUFjdGlvbk91dCDnvJPliqjlr7nosaHjgII8YnIgLz5cbiAqIEVhc2VDaXJjbGVPdXTmmK/mjInlnIblvaLmm7Lnur/nvJPliqjpgIDlh7rnmoTliqjkvZzjgII8YnIgLz5cbiAqIOWPguiAgyBlYXNlT3V0Q2lyY++8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogQG1ldGhvZCBlYXNlQ2lyY2xlQWN0aW9uT3V0XG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQGV4YW1wbGVcbiAqIC8vZXhhbXBsZVxuICogYWN0aW9uZWFzaW5nKGNjLmVhc2VDaXJjbGVBY3Rpb25PdXQoKSk7XG4gKi9cbnZhciBfZWFzZUNpcmNsZUFjdGlvbk91dCA9IHtcbiAgICBlYXNpbmc6IGZ1bmN0aW9uKHRpbWUpe1xuICAgICAgICB0aW1lID0gdGltZSAtIDE7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoMSAtIHRpbWUgKiB0aW1lKTtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBfZWFzZUNpcmNsZUFjdGlvbk91dDtcbiAgICB9XG59O1xuY2MuZWFzZUNpcmNsZUFjdGlvbk91dCA9IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIF9lYXNlQ2lyY2xlQWN0aW9uT3V0O1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XG4gKiBSZWZlcmVuY2UgZWFzZUluT3V0Q2lyYzogPGJyIC8+XG4gKiBodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcbiAqICEjemhcbiAqIOWIm+W7uiBlYXNlQ2lyY2xlQWN0aW9uSW5PdXQg57yT5Yqo5a+56LGh44CCPGJyIC8+XG4gKiBFYXNlQ2lyY2xlSW5PdXQg5piv5oyJ5ZyG5b2i5puy57q/57yT5Yqo6L+b5YWl5bm26YCA5Ye655qE5Yqo5L2c44CCPGJyIC8+XG4gKiDlj4LogIMgZWFzZUluT3V0Q2lyY++8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogQG1ldGhvZCBlYXNlQ2lyY2xlQWN0aW9uSW5PdXRcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAZXhhbXBsZVxuICogLy9leGFtcGxlXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VDaXJjbGVBY3Rpb25Jbk91dCgpKTtcbiAqL1xudmFyIF9lYXNlQ2lyY2xlQWN0aW9uSW5PdXQgPSB7XG4gICAgZWFzaW5nOiBmdW5jdGlvbih0aW1lKXtcbiAgICAgICAgdGltZSA9IHRpbWUgKiAyO1xuICAgICAgICBpZiAodGltZSA8IDEpXG4gICAgICAgICAgICByZXR1cm4gLTAuNSAqIChNYXRoLnNxcnQoMSAtIHRpbWUgKiB0aW1lKSAtIDEpO1xuICAgICAgICB0aW1lIC09IDI7XG4gICAgICAgIHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSB0aW1lICogdGltZSkgKyAxKTtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBfZWFzZUNpcmNsZUFjdGlvbkluT3V0O1xuICAgIH1cbn07XG5jYy5lYXNlQ2lyY2xlQWN0aW9uSW5PdXQgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiBfZWFzZUNpcmNsZUFjdGlvbkluT3V0O1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XG4gKiBSZWZlcmVuY2UgZWFzZUluQ3ViaWM6IDxiciAvPlxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XG4gKiAhI3poXG4gKiDliJvlu7ogZWFzZUN1YmljQWN0aW9uSW4g57yT5Yqo5a+56LGh44CCPGJyIC8+XG4gKiBFYXNlQ3ViaWNJbiDmmK/mjInkuInmrKHlh73mlbDnvJPliqjov5vlhaXnmoTliqjkvZzjgII8YnIgLz5cbiAqIOWPguiAgyBlYXNlSW5DdWJpY++8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogQG1ldGhvZCBlYXNlQ3ViaWNBY3Rpb25JblxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBleGFtcGxlXG4gKiAvL2V4YW1wbGVcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uSW4oKSk7XG4gKi9cbnZhciBfZWFzZUN1YmljQWN0aW9uSW4gPSB7XG4gICAgZWFzaW5nOiBmdW5jdGlvbih0aW1lKXtcbiAgICAgICAgcmV0dXJuIHRpbWUgKiB0aW1lICogdGltZTtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBfZWFzZUN1YmljQWN0aW9uSW47XG4gICAgfVxufTtcbmNjLmVhc2VDdWJpY0FjdGlvbkluID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gX2Vhc2VDdWJpY0FjdGlvbkluO1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XG4gKiBSZWZlcmVuY2UgZWFzZU91dEN1YmljOiA8YnIgLz5cbiAqIGh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxuICogISN6aFxuICog5Yib5bu6IGVhc2VDdWJpY0FjdGlvbk91dCDnvJPliqjlr7nosaHjgII8YnIgLz5cbiAqIEVhc2VDdWJpY091dCDmmK/mjInkuInmrKHlh73mlbDnvJPliqjpgIDlh7rnmoTliqjkvZzjgII8YnIgLz5cbiAqIOWPguiAgyBlYXNlT3V0Q3ViaWPvvJpodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcbiAqIEBtZXRob2QgZWFzZUN1YmljQWN0aW9uT3V0XG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQGV4YW1wbGVcbiAqIC8vZXhhbXBsZVxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSk7XG4gKi9cbnZhciBfZWFzZUN1YmljQWN0aW9uT3V0ID0ge1xuICAgIGVhc2luZzogZnVuY3Rpb24odGltZSl7XG4gICAgICAgIHRpbWUgLT0gMTtcbiAgICAgICAgcmV0dXJuICh0aW1lICogdGltZSAqIHRpbWUgKyAxKTtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBfZWFzZUN1YmljQWN0aW9uT3V0O1xuICAgIH1cbn07XG5jYy5lYXNlQ3ViaWNBY3Rpb25PdXQgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiBfZWFzZUN1YmljQWN0aW9uT3V0O1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XG4gKiBSZWZlcmVuY2UgZWFzZUluT3V0Q3ViaWM6IDxiciAvPlxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XG4gKiAhI3poXG4gKiDliJvlu7ogZWFzZUN1YmljQWN0aW9uSW5PdXQg57yT5Yqo5a+56LGh44CCPGJyIC8+XG4gKiBFYXNlQ3ViaWNJbk91dOaYr+aMieS4ieasoeWHveaVsOe8k+WKqOi/m+WFpeW5tumAgOWHuueahOWKqOS9nOOAgjxiciAvPlxuICog5Y+C6ICDIGVhc2VJbk91dEN1Ymlj77yaaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XG4gKiBAbWV0aG9kIGVhc2VDdWJpY0FjdGlvbkluT3V0XG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG52YXIgX2Vhc2VDdWJpY0FjdGlvbkluT3V0ID0ge1xuICAgIGVhc2luZzogZnVuY3Rpb24odGltZSl7XG4gICAgICAgIHRpbWUgPSB0aW1lKjI7XG4gICAgICAgIGlmICh0aW1lIDwgMSlcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiB0aW1lICogdGltZSAqIHRpbWU7XG4gICAgICAgIHRpbWUgLT0gMjtcbiAgICAgICAgcmV0dXJuIDAuNSAqICh0aW1lICogdGltZSAqIHRpbWUgKyAyKTtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBfZWFzZUN1YmljQWN0aW9uSW5PdXQ7XG4gICAgfVxufTtcbmNjLmVhc2VDdWJpY0FjdGlvbkluT3V0ID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gX2Vhc2VDdWJpY0FjdGlvbkluT3V0O1xufTtcblxuIl0sInNvdXJjZVJvb3QiOiIvIn0=