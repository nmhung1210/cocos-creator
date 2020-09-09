
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/skeleton/CCJointMatrixCurve.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _require = require('../../../animation/animation-curves'),
    DynamicAnimCurve = _require.DynamicAnimCurve,
    quickFindIndex = _require.quickFindIndex;

var JointMatrixCurve = cc.Class({
  name: 'cc.JointMatrixCurve',
  "extends": DynamicAnimCurve,
  _findFrameIndex: quickFindIndex,
  sample: function sample(time, ratio) {
    var ratios = this.ratios;

    var index = this._findFrameIndex(ratios, ratio);

    if (index < -1) {
      index = ~index - 1;
    }

    var pairs = this.pairs;

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];
      pair.target._jointMatrix = pair.values[index];
    }
  }
});
module.exports = JointMatrixCurve;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3NrZWxldG9uL0NDSm9pbnRNYXRyaXhDdXJ2ZS5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRHluYW1pY0FuaW1DdXJ2ZSIsInF1aWNrRmluZEluZGV4IiwiSm9pbnRNYXRyaXhDdXJ2ZSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiX2ZpbmRGcmFtZUluZGV4Iiwic2FtcGxlIiwidGltZSIsInJhdGlvIiwicmF0aW9zIiwiaW5kZXgiLCJwYWlycyIsImkiLCJsZW5ndGgiLCJwYWlyIiwidGFyZ2V0IiwiX2pvaW50TWF0cml4IiwidmFsdWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztlQUE2Q0EsT0FBTyxDQUFDLHFDQUFEO0lBQTVDQyw0QkFBQUE7SUFBa0JDLDBCQUFBQTs7QUFFMUIsSUFBSUMsZ0JBQWdCLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQzVCQyxFQUFBQSxJQUFJLEVBQUUscUJBRHNCO0FBRTVCLGFBQVNMLGdCQUZtQjtBQUk1Qk0sRUFBQUEsZUFBZSxFQUFFTCxjQUpXO0FBSzVCTSxFQUFBQSxNQUw0QixrQkFLcEJDLElBTG9CLEVBS2RDLEtBTGMsRUFLUDtBQUNqQixRQUFJQyxNQUFNLEdBQUcsS0FBS0EsTUFBbEI7O0FBQ0EsUUFBSUMsS0FBSyxHQUFHLEtBQUtMLGVBQUwsQ0FBcUJJLE1BQXJCLEVBQTZCRCxLQUE3QixDQUFaOztBQUNBLFFBQUlFLEtBQUssR0FBRyxDQUFDLENBQWIsRUFBZ0I7QUFDWkEsTUFBQUEsS0FBSyxHQUFHLENBQUNBLEtBQUQsR0FBUyxDQUFqQjtBQUNIOztBQUVELFFBQUlDLEtBQUssR0FBRyxLQUFLQSxLQUFqQjs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdELEtBQUssQ0FBQ0UsTUFBMUIsRUFBa0NELENBQUMsRUFBbkMsRUFBdUM7QUFDbkMsVUFBSUUsSUFBSSxHQUFHSCxLQUFLLENBQUNDLENBQUQsQ0FBaEI7QUFDQUUsTUFBQUEsSUFBSSxDQUFDQyxNQUFMLENBQVlDLFlBQVosR0FBMkJGLElBQUksQ0FBQ0csTUFBTCxDQUFZUCxLQUFaLENBQTNCO0FBQ0g7QUFDSjtBQWpCMkIsQ0FBVCxDQUF2QjtBQW9CQVEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbEIsZ0JBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBEeW5hbWljQW5pbUN1cnZlLCBxdWlja0ZpbmRJbmRleCB9ID0gcmVxdWlyZSgnLi4vLi4vLi4vYW5pbWF0aW9uL2FuaW1hdGlvbi1jdXJ2ZXMnKTtcblxubGV0IEpvaW50TWF0cml4Q3VydmUgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkpvaW50TWF0cml4Q3VydmUnLFxuICAgIGV4dGVuZHM6IER5bmFtaWNBbmltQ3VydmUsXG5cbiAgICBfZmluZEZyYW1lSW5kZXg6IHF1aWNrRmluZEluZGV4LFxuICAgIHNhbXBsZSAodGltZSwgcmF0aW8pIHtcbiAgICAgICAgbGV0IHJhdGlvcyA9IHRoaXMucmF0aW9zO1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9maW5kRnJhbWVJbmRleChyYXRpb3MsIHJhdGlvKTtcbiAgICAgICAgaWYgKGluZGV4IDwgLTEpIHtcbiAgICAgICAgICAgIGluZGV4ID0gfmluZGV4IC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYWlycyA9IHRoaXMucGFpcnM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwYWlyID0gcGFpcnNbaV07XG4gICAgICAgICAgICBwYWlyLnRhcmdldC5fam9pbnRNYXRyaXggPSBwYWlyLnZhbHVlc1tpbmRleF07XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBKb2ludE1hdHJpeEN1cnZlO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=