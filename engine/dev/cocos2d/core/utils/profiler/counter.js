
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/profiler/counter.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var Counter = cc.Class({
  name: 'cc.Counter',
  ctor: function ctor(id, opts, now) {
    this._id = id;
    this._opts = opts || {};
    this._value = 0;
    this._total = 0;
    this._averageValue = 0;
    this._accumValue = 0;
    this._accumSamples = 0;
    this._accumStart = now;
  },
  properties: {
    value: {
      get: function get() {
        return this._value;
      },
      set: function set(v) {
        this._value = v;
      }
    }
  },
  _average: function _average(v, now) {
    if (this._opts.average) {
      this._accumValue += v;
      ++this._accumSamples;
      var t = now;

      if (t - this._accumStart >= this._opts.average) {
        this._averageValue = this._accumValue / this._accumSamples;
        this._accumValue = 0;
        this._accumStart = t;
        this._accumSamples = 0;
      }
    }
  },
  sample: function sample(now) {
    this._average(this._value, now);
  },
  human: function human() {
    var v = this._opts.average ? this._averageValue : this._value;
    return Math.round(v * 100) / 100;
  },
  alarm: function alarm() {
    return this._opts.below && this._value < this._opts.below || this._opts.over && this._value > this._opts.over;
  }
});
module.exports = Counter;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL3Byb2ZpbGVyL2NvdW50ZXIuanMiXSwibmFtZXMiOlsiQ291bnRlciIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiY3RvciIsImlkIiwib3B0cyIsIm5vdyIsIl9pZCIsIl9vcHRzIiwiX3ZhbHVlIiwiX3RvdGFsIiwiX2F2ZXJhZ2VWYWx1ZSIsIl9hY2N1bVZhbHVlIiwiX2FjY3VtU2FtcGxlcyIsIl9hY2N1bVN0YXJ0IiwicHJvcGVydGllcyIsInZhbHVlIiwiZ2V0Iiwic2V0IiwidiIsIl9hdmVyYWdlIiwiYXZlcmFnZSIsInQiLCJzYW1wbGUiLCJodW1hbiIsIk1hdGgiLCJyb3VuZCIsImFsYXJtIiwiYmVsb3ciLCJvdmVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE9BQU8sR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDbkJDLEVBQUFBLElBQUksRUFBRSxZQURhO0FBRW5CQyxFQUFBQSxJQUZtQixnQkFFYkMsRUFGYSxFQUVUQyxJQUZTLEVBRUhDLEdBRkcsRUFFRTtBQUNqQixTQUFLQyxHQUFMLEdBQVdILEVBQVg7QUFDQSxTQUFLSSxLQUFMLEdBQWFILElBQUksSUFBSSxFQUFyQjtBQUVBLFNBQUtJLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLENBQXJCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixDQUFuQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUIsQ0FBckI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CUixHQUFuQjtBQUNILEdBWmtCO0FBY25CUyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFFO0FBQ0hDLE1BQUFBLEdBREcsaUJBQ0k7QUFDSCxlQUFPLEtBQUtSLE1BQVo7QUFDSCxPQUhFO0FBSUhTLE1BQUFBLEdBSkcsZUFJRUMsQ0FKRixFQUlLO0FBQ0osYUFBS1YsTUFBTCxHQUFjVSxDQUFkO0FBQ0g7QUFORTtBQURDLEdBZE87QUF5Qm5CQyxFQUFBQSxRQXpCbUIsb0JBeUJURCxDQXpCUyxFQXlCTmIsR0F6Qk0sRUF5QkQ7QUFDZCxRQUFJLEtBQUtFLEtBQUwsQ0FBV2EsT0FBZixFQUF3QjtBQUNwQixXQUFLVCxXQUFMLElBQW9CTyxDQUFwQjtBQUNBLFFBQUUsS0FBS04sYUFBUDtBQUVBLFVBQUlTLENBQUMsR0FBR2hCLEdBQVI7O0FBQ0EsVUFBSWdCLENBQUMsR0FBRyxLQUFLUixXQUFULElBQXdCLEtBQUtOLEtBQUwsQ0FBV2EsT0FBdkMsRUFBZ0Q7QUFDNUMsYUFBS1YsYUFBTCxHQUFxQixLQUFLQyxXQUFMLEdBQW1CLEtBQUtDLGFBQTdDO0FBQ0EsYUFBS0QsV0FBTCxHQUFtQixDQUFuQjtBQUNBLGFBQUtFLFdBQUwsR0FBbUJRLENBQW5CO0FBQ0EsYUFBS1QsYUFBTCxHQUFxQixDQUFyQjtBQUNIO0FBQ0o7QUFDSixHQXRDa0I7QUF3Q25CVSxFQUFBQSxNQXhDbUIsa0JBd0NYakIsR0F4Q1csRUF3Q047QUFDVCxTQUFLYyxRQUFMLENBQWMsS0FBS1gsTUFBbkIsRUFBMkJILEdBQTNCO0FBQ0gsR0ExQ2tCO0FBNENuQmtCLEVBQUFBLEtBNUNtQixtQkE0Q1Y7QUFDTCxRQUFJTCxDQUFDLEdBQUcsS0FBS1gsS0FBTCxDQUFXYSxPQUFYLEdBQXFCLEtBQUtWLGFBQTFCLEdBQTBDLEtBQUtGLE1BQXZEO0FBQ0EsV0FBT2dCLElBQUksQ0FBQ0MsS0FBTCxDQUFXUCxDQUFDLEdBQUcsR0FBZixJQUFzQixHQUE3QjtBQUNILEdBL0NrQjtBQWlEbkJRLEVBQUFBLEtBakRtQixtQkFpRFY7QUFDTCxXQUNLLEtBQUtuQixLQUFMLENBQVdvQixLQUFYLElBQW9CLEtBQUtuQixNQUFMLEdBQWMsS0FBS0QsS0FBTCxDQUFXb0IsS0FBOUMsSUFDQyxLQUFLcEIsS0FBTCxDQUFXcUIsSUFBWCxJQUFtQixLQUFLcEIsTUFBTCxHQUFjLEtBQUtELEtBQUwsQ0FBV3FCLElBRmpEO0FBSUg7QUF0RGtCLENBQVQsQ0FBZDtBQXlEQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCaEMsT0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgQ291bnRlciA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuQ291bnRlcicsXG4gICAgY3RvciAoaWQsIG9wdHMsIG5vdykge1xuICAgICAgICB0aGlzLl9pZCA9IGlkO1xuICAgICAgICB0aGlzLl9vcHRzID0gb3B0cyB8fCB7fTtcblxuICAgICAgICB0aGlzLl92YWx1ZSA9IDA7XG4gICAgICAgIHRoaXMuX3RvdGFsID0gMDtcbiAgICAgICAgdGhpcy5fYXZlcmFnZVZhbHVlID0gMDtcbiAgICAgICAgdGhpcy5fYWNjdW1WYWx1ZSA9IDA7XG4gICAgICAgIHRoaXMuX2FjY3VtU2FtcGxlcyA9IDA7XG4gICAgICAgIHRoaXMuX2FjY3VtU3RhcnQgPSBub3c7XG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfYXZlcmFnZSAodiwgbm93KSB7XG4gICAgICAgIGlmICh0aGlzLl9vcHRzLmF2ZXJhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjY3VtVmFsdWUgKz0gdjtcbiAgICAgICAgICAgICsrdGhpcy5fYWNjdW1TYW1wbGVzO1xuXG4gICAgICAgICAgICBsZXQgdCA9IG5vdztcbiAgICAgICAgICAgIGlmICh0IC0gdGhpcy5fYWNjdW1TdGFydCA+PSB0aGlzLl9vcHRzLmF2ZXJhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hdmVyYWdlVmFsdWUgPSB0aGlzLl9hY2N1bVZhbHVlIC8gdGhpcy5fYWNjdW1TYW1wbGVzO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjY3VtVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjY3VtU3RhcnQgPSB0O1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjY3VtU2FtcGxlcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2FtcGxlIChub3cpIHtcbiAgICAgICAgdGhpcy5fYXZlcmFnZSh0aGlzLl92YWx1ZSwgbm93KTtcbiAgICB9LFxuXG4gICAgaHVtYW4gKCkge1xuICAgICAgICBsZXQgdiA9IHRoaXMuX29wdHMuYXZlcmFnZSA/IHRoaXMuX2F2ZXJhZ2VWYWx1ZSA6IHRoaXMuX3ZhbHVlO1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh2ICogMTAwKSAvIDEwMDtcbiAgICB9LFxuXG4gICAgYWxhcm0gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKHRoaXMuX29wdHMuYmVsb3cgJiYgdGhpcy5fdmFsdWUgPCB0aGlzLl9vcHRzLmJlbG93KSB8fFxuICAgICAgICAgICAgKHRoaXMuX29wdHMub3ZlciAmJiB0aGlzLl92YWx1ZSA+IHRoaXMuX29wdHMub3ZlcilcbiAgICAgICAgKTtcbiAgICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvdW50ZXI7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==