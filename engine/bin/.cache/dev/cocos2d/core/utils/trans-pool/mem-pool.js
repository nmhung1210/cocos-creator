
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/trans-pool/mem-pool.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

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
var MemPool = function MemPool(unitClass) {
  this._unitClass = unitClass;
  this._pool = [];
  this._findOrder = [];

  if (CC_JSB && CC_NATIVERENDERER) {
    this._initNative();
  }
};

var proto = MemPool.prototype;

proto._initNative = function () {
  this._nativeMemPool = new renderer.MemPool();
};

proto._buildUnit = function (unitID) {
  var unit = new this._unitClass(unitID, this);

  if (CC_JSB && CC_NATIVERENDERER) {
    this._nativeMemPool.updateCommonData(unitID, unit._data, unit._signData);
  }

  return unit;
};

proto._destroyUnit = function (unitID) {
  this._pool[unitID] = null;

  for (var idx = 0, n = this._findOrder.length; idx < n; idx++) {
    var unit = this._findOrder[idx];

    if (unit && unit.unitID == unitID) {
      this._findOrder.splice(idx, 1);

      break;
    }
  }

  if (CC_JSB && CC_NATIVERENDERER) {
    this._nativeMemPool.removeCommonData(unitID);
  }
};

proto._findUnitID = function () {
  var unitID = 0;
  var pool = this._pool;

  while (pool[unitID]) {
    unitID++;
  }

  return unitID;
};

proto.pop = function () {
  var findUnit = null;
  var idx = 0;
  var findOrder = this._findOrder;
  var pool = this._pool;

  for (var n = findOrder.length; idx < n; idx++) {
    var unit = findOrder[idx];

    if (unit && unit.hasSpace()) {
      findUnit = unit;
      break;
    }
  }

  if (!findUnit) {
    var unitID = this._findUnitID();

    findUnit = this._buildUnit(unitID);
    pool[unitID] = findUnit;
    findOrder.push(findUnit);
    idx = findOrder.length - 1;
  } // swap has space unit to first position, so next find will fast


  var firstUnit = findOrder[0];

  if (firstUnit !== findUnit) {
    findOrder[0] = findUnit;
    findOrder[idx] = firstUnit;
  }

  return findUnit.pop();
};

proto.push = function (info) {
  var unit = this._pool[info.unitID];
  unit.push(info.index);

  if (this._findOrder.length > 1 && unit.isAllFree()) {
    this._destroyUnit(info.unitID);
  }

  return unit;
};

module.exports = MemPool;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL3RyYW5zLXBvb2wvbWVtLXBvb2wuanMiXSwibmFtZXMiOlsiTWVtUG9vbCIsInVuaXRDbGFzcyIsIl91bml0Q2xhc3MiLCJfcG9vbCIsIl9maW5kT3JkZXIiLCJDQ19KU0IiLCJDQ19OQVRJVkVSRU5ERVJFUiIsIl9pbml0TmF0aXZlIiwicHJvdG8iLCJwcm90b3R5cGUiLCJfbmF0aXZlTWVtUG9vbCIsInJlbmRlcmVyIiwiX2J1aWxkVW5pdCIsInVuaXRJRCIsInVuaXQiLCJ1cGRhdGVDb21tb25EYXRhIiwiX2RhdGEiLCJfc2lnbkRhdGEiLCJfZGVzdHJveVVuaXQiLCJpZHgiLCJuIiwibGVuZ3RoIiwic3BsaWNlIiwicmVtb3ZlQ29tbW9uRGF0YSIsIl9maW5kVW5pdElEIiwicG9vbCIsInBvcCIsImZpbmRVbml0IiwiZmluZE9yZGVyIiwiaGFzU3BhY2UiLCJwdXNoIiwiZmlyc3RVbml0IiwiaW5mbyIsImluZGV4IiwiaXNBbGxGcmVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBSUEsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBVUMsU0FBVixFQUFxQjtBQUMvQixPQUFLQyxVQUFMLEdBQWtCRCxTQUFsQjtBQUNBLE9BQUtFLEtBQUwsR0FBYSxFQUFiO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQixFQUFsQjs7QUFFQSxNQUFJQyxNQUFNLElBQUlDLGlCQUFkLEVBQWlDO0FBQzdCLFNBQUtDLFdBQUw7QUFDSDtBQUNKLENBUkQ7O0FBVUEsSUFBSUMsS0FBSyxHQUFHUixPQUFPLENBQUNTLFNBQXBCOztBQUNBRCxLQUFLLENBQUNELFdBQU4sR0FBb0IsWUFBWTtBQUM1QixPQUFLRyxjQUFMLEdBQXNCLElBQUlDLFFBQVEsQ0FBQ1gsT0FBYixFQUF0QjtBQUNILENBRkQ7O0FBSUFRLEtBQUssQ0FBQ0ks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QWxCLEtBQUssQ0FBQ3NCLElBQU4sR0FBYSxVQUFVRSxJQUFWLEVBQWdCO0FBQ3pCLE1BQUlsQixJQUFJLEdBQUcsS0FBS1gsS0FBTCxDQUFXNkIsSUFBSSxDQUFDbkIsTUFBaEIsQ0FBWDtBQUNBQyxFQUFBQSxJQUFJLENBQUNnQixJQUFMLENBQVVFLElBQUksQ0FBQ0MsS0FBZjs7QUFDQSxNQUFJLEtBQUs3QixVQUFMLENBQWdCaUIsTUFBaEIsR0FBeUIsQ0FBekIsSUFBOEJQLElBQUksQ0FBQ29CLFNBQUwsRUFBbEMsRUFBb0Q7QUFDaEQsU0FBS2hCLFlBQUwsQ0FBa0JjLElBQUksQ0FBQ25CLE1BQXZCO0FBQ0g7O0FBQ0QsU0FBT0MsSUFBUDtBQUNILENBUEQ7O0FBUUFxQixNQUFNLENBQUNDLE9BQVAsR0FBaUJwQyxPQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5sZXQgTWVtUG9vbCA9IGZ1bmN0aW9uICh1bml0Q2xhc3MpIHtcbiAgICB0aGlzLl91bml0Q2xhc3MgPSB1bml0Q2xhc3M7XG4gICAgdGhpcy5fcG9vbCA9IFtdO1xuICAgIHRoaXMuX2ZpbmRPcmRlciA9IFtdO1xuXG4gICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICB0aGlzLl9pbml0TmF0aXZlKCk7XG4gICAgfVxufTtcblxubGV0IHByb3RvID0gTWVtUG9vbC5wcm90b3R5cGU7XG5wcm90by5faW5pdE5hdGl2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9uYXRpdmVNZW1Qb29sID0gbmV3IHJlbmRlcmVyLk1lbVBvb2woKTtcbn07XG5cbnByb3RvLl9idWlsZFVuaXQgPSBmdW5jdGlvbiAodW5pdElEKSB7XG4gICAgbGV0IHVuaXQgPSBuZXcgdGhpcy5fdW5pdENsYXNzKHVuaXRJRCwgdGhpcyk7XG4gICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICB0aGlzLl9uYXRpdmVNZW1Qb29sLnVwZGF0ZUNvbW1vbkRhdGEodW5pdElELCB1bml0Ll9kYXRhLCB1bml0Ll9zaWduRGF0YSk7XG4gICAgfVxuICAgIHJldHVybiB1bml0O1xufTtcblxucHJvdG8uX2Rlc3Ryb3lVbml0ID0gZnVuY3Rpb24gKHVuaXRJRCkge1xuICAgIHRoaXMuX3Bvb2xbdW5pdElEXSA9IG51bGw7XG4gICAgZm9yIChsZXQgaWR4ID0gMCwgbiA9IHRoaXMuX2ZpbmRPcmRlci5sZW5ndGg7IGlkeCA8IG47IGlkeCsrKSB7XG4gICAgICAgIGxldCB1bml0ID0gdGhpcy5fZmluZE9yZGVyW2lkeF07XG4gICAgICAgIGlmICh1bml0ICYmIHVuaXQudW5pdElEID09IHVuaXRJRCkge1xuICAgICAgICAgICAgdGhpcy5fZmluZE9yZGVyLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICB0aGlzLl9uYXRpdmVNZW1Qb29sLnJlbW92ZUNvbW1vbkRhdGEodW5pdElEKTtcbiAgICB9XG59O1xuXG5wcm90by5fZmluZFVuaXRJRCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgdW5pdElEID0gMDtcbiAgICBsZXQgcG9vbCA9IHRoaXMuX3Bvb2w7XG4gICAgd2hpbGUgKHBvb2xbdW5pdElEXSkgdW5pdElEKys7XG4gICAgcmV0dXJuIHVuaXRJRDtcbn07XG5cbnByb3RvLnBvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZmluZFVuaXQgPSBudWxsO1xuICAgIGxldCBpZHggPSAwO1xuICAgIGxldCBmaW5kT3JkZXIgPSB0aGlzLl9maW5kT3JkZXI7XG4gICAgbGV0IHBvb2wgPSB0aGlzLl9wb29sO1xuICAgIGZvciAobGV0IG4gPSBmaW5kT3JkZXIubGVuZ3RoOyBpZHggPCBuOyBpZHgrKykge1xuICAgICAgICBsZXQgdW5pdCA9IGZpbmRPcmRlcltpZHhdO1xuICAgICAgICBpZiAodW5pdCAmJiB1bml0Lmhhc1NwYWNlKCkpIHtcbiAgICAgICAgICAgIGZpbmRVbml0ID0gdW5pdDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFmaW5kVW5pdCkge1xuICAgICAgICBsZXQgdW5pdElEID0gdGhpcy5fZmluZFVuaXRJRCgpO1xuICAgICAgICBmaW5kVW5pdCA9IHRoaXMuX2J1aWxkVW5pdCh1bml0SUQpO1xuICAgICAgICBwb29sW3VuaXRJRF0gPSBmaW5kVW5pdDtcbiAgICAgICAgZmluZE9yZGVyLnB1c2goZmluZFVuaXQpO1xuICAgICAgICBpZHggPSBmaW5kT3JkZXIubGVuZ3RoIC0gMTtcbiAgICB9XG5cbiAgICAvLyBzd2FwIGhhcyBzcGFjZSB1bml0IHRvIGZpcnN0IHBvc2l0aW9uLCBzbyBuZXh0IGZpbmQgd2lsbCBmYXN0XG4gICAgbGV0IGZpcnN0VW5pdCA9IGZpbmRPcmRlclswXTtcbiAgICBpZiAoZmlyc3RVbml0ICE9PSBmaW5kVW5pdCkge1xuICAgICAgICBmaW5kT3JkZXJbMF0gPSBmaW5kVW5pdDtcbiAgICAgICAgZmluZE9yZGVyW2lkeF0gPSBmaXJzdFVuaXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbmRVbml0LnBvcCgpO1xufTtcblxucHJvdG8ucHVzaCA9IGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgbGV0IHVuaXQgPSB0aGlzLl9wb29sW2luZm8udW5pdElEXTtcbiAgICB1bml0LnB1c2goaW5mby5pbmRleCk7XG4gICAgaWYgKHRoaXMuX2ZpbmRPcmRlci5sZW5ndGggPiAxICYmIHVuaXQuaXNBbGxGcmVlKCkpIHtcbiAgICAgICAgdGhpcy5fZGVzdHJveVVuaXQoaW5mby51bml0SUQpO1xuICAgIH1cbiAgICByZXR1cm4gdW5pdDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IE1lbVBvb2w7Il0sInNvdXJjZVJvb3QiOiIvIn0=