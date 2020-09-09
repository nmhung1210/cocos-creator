
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/profiler/perf-counter.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var Counter = require('./counter');

var PerfCounter = cc.Class({
  name: 'cc.PerfCounter',
  "extends": Counter,
  ctor: function ctor(id, opts, now) {
    // DISABLE
    // this._idstart = `${id}_start`;
    // this._idend = `${id}_end`;
    this._time = now;
  },
  start: function start(now) {
    this._time = now; // DISABLE: long time running will cause performance drop down
    // window.performance.mark(this._idstart);
  },
  end: function end(now) {
    this._value = now - this._time; // DISABLE: long time running will cause performance drop down
    // window.performance.mark(this._idend);
    // window.performance.measure(this._id, this._idstart, this._idend);

    this._average(this._value);
  },
  tick: function tick() {
    this.end();
    this.start();
  },
  frame: function frame(now) {
    var t = now;
    var e = t - this._time;
    this._total++;
    var avg = this._opts.average || 1000;

    if (e > avg) {
      this._value = this._total * 1000 / e;
      this._total = 0;
      this._time = t;

      this._average(this._value);
    }
  }
});
module.exports = PerfCounter;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL3Byb2ZpbGVyL3BlcmYtY291bnRlci5qcyJdLCJuYW1lcyI6WyJDb3VudGVyIiwicmVxdWlyZSIsIlBlcmZDb3VudGVyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJjdG9yIiwiaWQiLCJvcHRzIiwibm93IiwiX3RpbWUiLCJzdGFydCIsImVuZCIsIl92YWx1ZSIsIl9hdmVyYWdlIiwidGljayIsImZyYW1lIiwidCIsImUiLCJfdG90YWwiLCJhdmciLCJfb3B0cyIsImF2ZXJhZ2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFFQSxJQUFJQyxXQUFXLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3pCQyxFQUFBQSxJQUFJLEVBQUUsZ0JBRG1CO0FBRXpCLGFBQVNMLE9BRmdCO0FBSXpCTSxFQUFBQSxJQUp5QixnQkFJbkJDLEVBSm1CLEVBSWZDLElBSmUsRUFJVEMsR0FKUyxFQUlKO0FBQ25CO0FBQ0E7QUFDQTtBQUVBLFNBQUtDLEtBQUwsR0FBYUQsR0FBYjtBQUNELEdBVndCO0FBWXpCRSxFQUFBQSxLQVp5QixpQkFZbkJGLEdBWm1CLEVBWWQ7QUFDVCxTQUFLQyxLQUFMLEdBQWFELEdBQWIsQ0FEUyxDQUdUO0FBQ0E7QUFDRCxHQWpCd0I7QUFtQnpCRyxFQUFBQSxHQW5CeUIsZUFtQnJCSCxHQW5CcUIsRUFtQmhCO0FBQ1AsU0FBS0ksTUFBTCxHQUFjSixHQUFHLEdBQUcsS0FBS0MsS0FBekIsQ0FETyxDQUdQO0FBQ0E7QUFDQTs7QUFFQSxTQUFLSSxRQUFMLENBQWMsS0FBS0QsTUFBbkI7QUFDRCxHQTNCd0I7QUE2QnpCRSxFQUFBQSxJQTdCeUIsa0JBNkJsQjtBQUNMLFNBQUtILEdBQUw7QUFDQSxTQUFLRCxLQUFMO0FBQ0QsR0FoQ3dCO0FBa0N6QkssRUFBQUEsS0FsQ3lCLGlCQWtDbkJQLEdBbENtQixFQWtDZDtBQUNULFFBQUlRLENBQUMsR0FBR1IsR0FBUjtBQUNBLFFBQUlTLENBQUMsR0FBR0QsQ0FBQyxHQUFHLEtBQUtQLEtBQWpCO0FBQ0EsU0FBS1MsTUFBTDtBQUNBLFFBQUlDLEdBQUcsR0FBRyxLQUFLQyxLQUFMLENBQVdDLE9BQVgsSUFBc0IsSUFBaEM7O0FBRUEsUUFBSUosQ0FBQyxHQUFHRSxHQUFSLEVBQWE7QUFDWCxXQUFLUCxNQUFMLEdBQWMsS0FBS00sTUFBTCxHQUFjLElBQWQsR0FBcUJELENBQW5DO0FBQ0EsV0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxXQUFLVCxLQUFMLEdBQWFPLENBQWI7O0FBQ0EsV0FBS0gsUUFBTCxDQUFjLEtBQUtELE1BQW5CO0FBQ0Q7QUFDRjtBQTlDd0IsQ0FBVCxDQUFsQjtBQWlEQVUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCdEIsV0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDb3VudGVyID0gcmVxdWlyZSgnLi9jb3VudGVyJyk7XG5cbmxldCBQZXJmQ291bnRlciA9IGNjLkNsYXNzKHtcbiAgbmFtZTogJ2NjLlBlcmZDb3VudGVyJyxcbiAgZXh0ZW5kczogQ291bnRlcixcbiAgXG4gIGN0b3IgKGlkLCBvcHRzLCBub3cpIHtcbiAgICAvLyBESVNBQkxFXG4gICAgLy8gdGhpcy5faWRzdGFydCA9IGAke2lkfV9zdGFydGA7XG4gICAgLy8gdGhpcy5faWRlbmQgPSBgJHtpZH1fZW5kYDtcblxuICAgIHRoaXMuX3RpbWUgPSBub3c7XG4gIH0sXG5cbiAgc3RhcnQobm93KSB7XG4gICAgdGhpcy5fdGltZSA9IG5vdztcblxuICAgIC8vIERJU0FCTEU6IGxvbmcgdGltZSBydW5uaW5nIHdpbGwgY2F1c2UgcGVyZm9ybWFuY2UgZHJvcCBkb3duXG4gICAgLy8gd2luZG93LnBlcmZvcm1hbmNlLm1hcmsodGhpcy5faWRzdGFydCk7XG4gIH0sXG5cbiAgZW5kKG5vdykge1xuICAgIHRoaXMuX3ZhbHVlID0gbm93IC0gdGhpcy5fdGltZTtcblxuICAgIC8vIERJU0FCTEU6IGxvbmcgdGltZSBydW5uaW5nIHdpbGwgY2F1c2UgcGVyZm9ybWFuY2UgZHJvcCBkb3duXG4gICAgLy8gd2luZG93LnBlcmZvcm1hbmNlLm1hcmsodGhpcy5faWRlbmQpO1xuICAgIC8vIHdpbmRvdy5wZXJmb3JtYW5jZS5tZWFzdXJlKHRoaXMuX2lkLCB0aGlzLl9pZHN0YXJ0LCB0aGlzLl9pZGVuZCk7XG5cbiAgICB0aGlzLl9hdmVyYWdlKHRoaXMuX3ZhbHVlKTtcbiAgfSxcblxuICB0aWNrKCkge1xuICAgIHRoaXMuZW5kKCk7XG4gICAgdGhpcy5zdGFydCgpO1xuICB9LFxuXG4gIGZyYW1lKG5vdykge1xuICAgIGxldCB0ID0gbm93O1xuICAgIGxldCBlID0gdCAtIHRoaXMuX3RpbWU7XG4gICAgdGhpcy5fdG90YWwrKztcbiAgICBsZXQgYXZnID0gdGhpcy5fb3B0cy5hdmVyYWdlIHx8IDEwMDA7XG5cbiAgICBpZiAoZSA+IGF2Zykge1xuICAgICAgdGhpcy5fdmFsdWUgPSB0aGlzLl90b3RhbCAqIDEwMDAgLyBlO1xuICAgICAgdGhpcy5fdG90YWwgPSAwO1xuICAgICAgdGhpcy5fdGltZSA9IHQ7XG4gICAgICB0aGlzLl9hdmVyYWdlKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBlcmZDb3VudGVyO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=