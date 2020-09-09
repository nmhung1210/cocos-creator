
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/spine/vertex-effect-delegate.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var spine = require('./lib/spine');
/**
 * @module sp
 */

/**
 * !#en
 * The delegate of spine vertex effect
 * !#zh
 * Spine 顶点动画代理
 * @class VertexEffectDelegate
 */


sp.VertexEffectDelegate = cc.Class({
  name: 'sp.VertexEffectDelegate',
  ctor: function ctor() {
    this._vertexEffect = null;
    this._interpolation = null;
    this._effectType = 'none';
  },

  /**
   * !#en Clears vertex effect.
   * !#zh 清空顶点效果
   * @method clear
   */
  clear: function clear() {
    this._vertexEffect = null;
    this._interpolation = null;
    this._effectType = 'none';
  },

  /**
   * !#en Inits delegate with jitter effect
   * !#zh 设置顶点抖动效果
   * @method initJitter
   * @param {Number} jitterX
   * @param {Number} jitterY
   */
  initJitter: function initJitter(jitterX, jitterY) {
    this._effectType = 'jitter';
    this._vertexEffect = new spine.JitterEffect(jitterX, jitterY);
    return this._vertexEffect;
  },

  /**
   * !#en Inits delegate with swirl effect
   * !#zh 设置顶点漩涡效果
   * @method initSwirlWithPow
   * @param {Number} radius 
   * @param {Number} power
   * @return {sp.spine.JitterEffect}
   */
  initSwirlWithPow: function initSwirlWithPow(radius, power) {
    this._interpolation = new spine.Pow(power);
    this._vertexEffect = new spine.SwirlEffect(radius, this._interpolation);
    return this._vertexEffect;
  },

  /**
   * !#en Inits delegate with swirl effect
   * !#zh 设置顶点漩涡效果
   * @method initSwirlWithPowOut
   * @param {Number} radius 
   * @param {Number} power
   * @return {sp.spine.SwirlEffect}
   */
  initSwirlWithPowOut: function initSwirlWithPowOut(radius, power) {
    this._interpolation = new spine.PowOut(power);
    this._vertexEffect = new spine.SwirlEffect(radius, this._interpolation);
    return this._vertexEffect;
  },

  /**
   * !#en Gets jitter vertex effect
   * !#zh 获取顶点抖动效果
   * @method getJitterVertexEffect
   * @return {sp.spine.JitterEffect}
   */
  getJitterVertexEffect: function getJitterVertexEffect() {
    return this._vertexEffect;
  },

  /**
   * !#en Gets swirl vertex effect
   * !#zh 获取顶点漩涡效果
   * @method getSwirlVertexEffect
   * @return {sp.spine.SwirlEffect}
   */
  getSwirlVertexEffect: function getSwirlVertexEffect() {
    return this._vertexEffect;
  },

  /**
   * !#en Gets vertex effect
   * !#zh 获取顶点效果
   * @method getVertexEffect
   * @return {sp.spine.JitterEffect|sp.spine.SwirlEffect}
   */
  getVertexEffect: function getVertexEffect() {
    return this._vertexEffect;
  },

  /**
   * !#en Gets effect type
   * !#zh 获取效果类型
   * @method getEffectType
   * @return {String}
   */
  getEffectType: function getEffectType() {
    return this._effectType;
  }
});
module.exports = sp.VertexEffectDelegate;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvZXh0ZW5zaW9ucy9zcGluZS92ZXJ0ZXgtZWZmZWN0LWRlbGVnYXRlLmpzIl0sIm5hbWVzIjpbInNwaW5lIiwicmVxdWlyZSIsInNwIiwiVmVydGV4RWZmZWN0RGVsZWdhdGUiLCJjYyIsIkNsYXNzIiwibmFtZSIsImN0b3IiLCJfdmVydGV4RWZmZWN0IiwiX2ludGVycG9sYXRpb24iLCJfZWZmZWN0VHlwZSIsImNsZWFyIiwiaW5pdEppdHRlciIsImppdHRlclgiLCJqaXR0ZXJZIiwiSml0dGVyRWZmZWN0IiwiaW5pdFN3aXJsV2l0aFBvdyIsInJhZGl1cyIsInBvd2VyIiwiUG93IiwiU3dpcmxFZmZlY3QiLCJpbml0U3dpcmxXaXRoUG93T3V0IiwiUG93T3V0IiwiZ2V0Sml0dGVyVmVydGV4RWZmZWN0IiwiZ2V0U3dpcmxWZXJ0ZXhFZmZlY3QiLCJnZXRWZXJ0ZXhFZmZlY3QiLCJnZXRFZmZlY3RUeXBlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsYUFBRCxDQUFyQjtBQUNBOzs7O0FBSUE7Ozs7Ozs7OztBQU9BQyxFQUFFLENBQUNDLG9CQUFILEdBQTBCQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUMvQkMsRUFBQUEsSUFBSSxFQUFFLHlCQUR5QjtBQUcvQkMsRUFBQUEsSUFIK0Isa0JBR3ZCO0FBQ0osU0FBS0MsYUFBTCxHQUFxQixJQUFyQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLE1BQW5CO0FBQ0gsR0FQOEI7O0FBUy9COzs7OztBQUtBQyxFQUFBQSxLQWQrQixtQkFjdEI7QUFDTCxTQUFLSCxhQUFMLEdBQXFCLElBQXJCO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQixJQUF0QjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsTUFBbkI7QUFDSCxHQWxCOEI7O0FBb0IvQjs7Ozs7OztBQU9BRSxFQUFBQSxVQTNCK0Isc0JBMkJuQkMsT0EzQm1CLEVBMkJWQyxPQTNCVSxFQTJCRDtBQUMxQixTQUFLSixXQUFMLEdBQW1CLFFBQW5CO0FBQ0EsU0FBS0YsYUFBTCxHQUFxQixJQUFJUixLQUFLLENBQUNlLFlBQVYsQ0FBdUJGLE9BQXZCLEVBQWdDQyxPQUFoQyxDQUFyQjtBQUNBLFdBQU8sS0FBS04sYUFBWjtBQUNILEdBL0I4Qjs7QUFpQy9COzs7Ozs7OztBQVFBUSxFQUFBQSxnQkF6QytCLDRCQXlDZEMsTUF6Q2MsRUF5Q05DLEtBekNNLEVBeUNDO0FBQzVCLFNBQUtULGNBQUwsR0FBc0IsSUFBSVQsS0FBSyxDQUFDbUIsR0FBVixDQUFjRCxLQUFkLENBQXRCO0FBQ0EsU0FBS1YsYUFBTCxHQUFxQixJQUFJUixLQUFLLENBQUNvQixXQUFWLENBQXNCSCxNQUF0QixFQUE4QixLQUFLUixjQUFuQyxDQUFyQjtBQUNBLFdBQU8sS0FBS0QsYUFBWjtBQUNILEdBN0M4Qjs7QUErQy9COzs7Ozs7OztBQVFBYSxFQUFBQSxtQkF2RCtCLCtCQXVEWEosTUF2RFcsRUF1REhDLEtBdkRHLEVBdURJO0FBQy9CLFNBQUtULGNBQUwsR0FBc0IsSUFBSVQsS0FBSyxDQUFDc0IsTUFBVixDQUFpQkosS0FBakIsQ0FBdEI7QUFDQSxTQUFLVixhQUFMLEdBQXFCLElBQUlSLEtBQUssQ0FBQ29CLFdBQVYsQ0FBc0JILE1BQXRCLEVBQThCLEtBQUtSLGNBQW5DLENBQXJCO0FBQ0EsV0FBTyxLQUFLRCxhQUFaO0FBQ0gsR0EzRDhCOztBQTZEL0I7Ozs7OztBQU1BZSxFQUFBQSxxQkFuRStCLG1DQW1FTjtBQUNyQixXQUFPLEtBQUtmLGFBQVo7QUFDSCxHQXJFOEI7O0FBdUUvQjs7Ozs7O0FBTUFnQixFQUFBQSxvQkE3RStCLGtDQTZFUDtBQUNwQixXQUFPLEtBQUtoQixhQUFaO0FBQ0gsR0EvRThCOztBQWlGL0I7Ozs7OztBQU1BaUIsRUFBQUEsZUF2RitCLDZCQXVGWjtBQUNmLFdBQU8sS0FBS2pCLGFBQVo7QUFDSCxHQXpGOEI7O0FBMkYvQjs7Ozs7O0FBTUFrQixFQUFBQSxhQWpHK0IsMkJBaUdkO0FBQ2IsV0FBTyxLQUFLaEIsV0FBWjtBQUNIO0FBbkc4QixDQUFULENBQTFCO0FBcUdBaUIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCMUIsRUFBRSxDQUFDQyxvQkFBcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuY29uc3Qgc3BpbmUgPSByZXF1aXJlKCcuL2xpYi9zcGluZScpO1xuLyoqXG4gKiBAbW9kdWxlIHNwXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBUaGUgZGVsZWdhdGUgb2Ygc3BpbmUgdmVydGV4IGVmZmVjdFxuICogISN6aFxuICogU3BpbmUg6aG254K55Yqo55S75Luj55CGXG4gKiBAY2xhc3MgVmVydGV4RWZmZWN0RGVsZWdhdGVcbiAqL1xuc3AuVmVydGV4RWZmZWN0RGVsZWdhdGUgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ3NwLlZlcnRleEVmZmVjdERlbGVnYXRlJyxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICB0aGlzLl92ZXJ0ZXhFZmZlY3QgPSBudWxsO1xuICAgICAgICB0aGlzLl9pbnRlcnBvbGF0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZWZmZWN0VHlwZSA9ICdub25lJztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBDbGVhcnMgdmVydGV4IGVmZmVjdC5cbiAgICAgKiAhI3poIOa4heepuumhtueCueaViOaenFxuICAgICAqIEBtZXRob2QgY2xlYXJcbiAgICAgKi9cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIHRoaXMuX3ZlcnRleEVmZmVjdCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2ludGVycG9sYXRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLl9lZmZlY3RUeXBlID0gJ25vbmUnO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEluaXRzIGRlbGVnYXRlIHdpdGggaml0dGVyIGVmZmVjdFxuICAgICAqICEjemgg6K6+572u6aG254K55oqW5Yqo5pWI5p6cXG4gICAgICogQG1ldGhvZCBpbml0Sml0dGVyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGppdHRlclhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaml0dGVyWVxuICAgICAqL1xuICAgIGluaXRKaXR0ZXIgKGppdHRlclgsIGppdHRlclkpIHtcbiAgICAgICAgdGhpcy5fZWZmZWN0VHlwZSA9ICdqaXR0ZXInO1xuICAgICAgICB0aGlzLl92ZXJ0ZXhFZmZlY3QgPSBuZXcgc3BpbmUuSml0dGVyRWZmZWN0KGppdHRlclgsIGppdHRlclkpO1xuICAgICAgICByZXR1cm4gdGhpcy5fdmVydGV4RWZmZWN0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEluaXRzIGRlbGVnYXRlIHdpdGggc3dpcmwgZWZmZWN0XG4gICAgICogISN6aCDorr7nva7pobbngrnmvKnmtqHmlYjmnpxcbiAgICAgKiBAbWV0aG9kIGluaXRTd2lybFdpdGhQb3dcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmFkaXVzIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwb3dlclxuICAgICAqIEByZXR1cm4ge3NwLnNwaW5lLkppdHRlckVmZmVjdH1cbiAgICAgKi9cbiAgICBpbml0U3dpcmxXaXRoUG93KHJhZGl1cywgcG93ZXIpIHtcbiAgICAgICAgdGhpcy5faW50ZXJwb2xhdGlvbiA9IG5ldyBzcGluZS5Qb3cocG93ZXIpO1xuICAgICAgICB0aGlzLl92ZXJ0ZXhFZmZlY3QgPSBuZXcgc3BpbmUuU3dpcmxFZmZlY3QocmFkaXVzLCB0aGlzLl9pbnRlcnBvbGF0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnRleEVmZmVjdDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBJbml0cyBkZWxlZ2F0ZSB3aXRoIHN3aXJsIGVmZmVjdFxuICAgICAqICEjemgg6K6+572u6aG254K55ryp5rah5pWI5p6cXG4gICAgICogQG1ldGhvZCBpbml0U3dpcmxXaXRoUG93T3V0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZGl1cyBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcG93ZXJcbiAgICAgKiBAcmV0dXJuIHtzcC5zcGluZS5Td2lybEVmZmVjdH1cbiAgICAgKi9cbiAgICBpbml0U3dpcmxXaXRoUG93T3V0KHJhZGl1cywgcG93ZXIpIHtcbiAgICAgICAgdGhpcy5faW50ZXJwb2xhdGlvbiA9IG5ldyBzcGluZS5Qb3dPdXQocG93ZXIpO1xuICAgICAgICB0aGlzLl92ZXJ0ZXhFZmZlY3QgPSBuZXcgc3BpbmUuU3dpcmxFZmZlY3QocmFkaXVzLCB0aGlzLl9pbnRlcnBvbGF0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnRleEVmZmVjdDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXRzIGppdHRlciB2ZXJ0ZXggZWZmZWN0XG4gICAgICogISN6aCDojrflj5bpobbngrnmipbliqjmlYjmnpxcbiAgICAgKiBAbWV0aG9kIGdldEppdHRlclZlcnRleEVmZmVjdFxuICAgICAqIEByZXR1cm4ge3NwLnNwaW5lLkppdHRlckVmZmVjdH1cbiAgICAgKi9cbiAgICBnZXRKaXR0ZXJWZXJ0ZXhFZmZlY3QgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmVydGV4RWZmZWN0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHMgc3dpcmwgdmVydGV4IGVmZmVjdFxuICAgICAqICEjemgg6I635Y+W6aG254K55ryp5rah5pWI5p6cXG4gICAgICogQG1ldGhvZCBnZXRTd2lybFZlcnRleEVmZmVjdFxuICAgICAqIEByZXR1cm4ge3NwLnNwaW5lLlN3aXJsRWZmZWN0fVxuICAgICAqL1xuICAgIGdldFN3aXJsVmVydGV4RWZmZWN0ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnRleEVmZmVjdDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXRzIHZlcnRleCBlZmZlY3RcbiAgICAgKiAhI3poIOiOt+WPlumhtueCueaViOaenFxuICAgICAqIEBtZXRob2QgZ2V0VmVydGV4RWZmZWN0XG4gICAgICogQHJldHVybiB7c3Auc3BpbmUuSml0dGVyRWZmZWN0fHNwLnNwaW5lLlN3aXJsRWZmZWN0fVxuICAgICAqL1xuICAgIGdldFZlcnRleEVmZmVjdCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92ZXJ0ZXhFZmZlY3Q7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0cyBlZmZlY3QgdHlwZVxuICAgICAqICEjemgg6I635Y+W5pWI5p6c57G75Z6LXG4gICAgICogQG1ldGhvZCBnZXRFZmZlY3RUeXBlXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldEVmZmVjdFR5cGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWZmZWN0VHlwZTtcbiAgICB9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gc3AuVmVydGV4RWZmZWN0RGVsZWdhdGU7Il0sInNvdXJjZVJvb3QiOiIvIn0=