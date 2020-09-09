
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/editbox/tabIndexUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var tabIndexUtil = {
  _tabIndexList: [],
  add: function add(editBoxImpl) {
    var list = this._tabIndexList;
    var index = list.indexOf(editBoxImpl);

    if (index === -1) {
      list.push(editBoxImpl);
    }
  },
  remove: function remove(editBoxImpl) {
    var list = this._tabIndexList;
    var index = list.indexOf(editBoxImpl);

    if (index !== -1) {
      list.splice(index, 1);
    }
  },
  resort: function resort() {
    this._tabIndexList.sort(function (a, b) {
      return a._delegate._tabIndex - b._delegate._tabIndex;
    });
  },
  next: function next(editBoxImpl) {
    var list = this._tabIndexList;
    var index = list.indexOf(editBoxImpl);
    editBoxImpl.setFocus(false);

    if (index !== -1) {
      var nextImpl = list[index + 1];

      if (nextImpl && nextImpl._delegate._tabIndex >= 0) {
        nextImpl.setFocus(true);
      }
    }
  }
};
module.exports = tabIndexUtil;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvZWRpdGJveC90YWJJbmRleFV0aWwuanMiXSwibmFtZXMiOlsidGFiSW5kZXhVdGlsIiwiX3RhYkluZGV4TGlzdCIsImFkZCIsImVkaXRCb3hJbXBsIiwibGlzdCIsImluZGV4IiwiaW5kZXhPZiIsInB1c2giLCJyZW1vdmUiLCJzcGxpY2UiLCJyZXNvcnQiLCJzb3J0IiwiYSIsImIiLCJfZGVsZWdhdGUiLCJfdGFiSW5kZXgiLCJuZXh0Iiwic2V0Rm9jdXMiLCJuZXh0SW1wbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxZQUFZLEdBQUc7QUFDakJDLEVBQUFBLGFBQWEsRUFBRSxFQURFO0FBR2pCQyxFQUFBQSxHQUhpQixlQUdaQyxXQUhZLEVBR0M7QUFDZCxRQUFJQyxJQUFJLEdBQUcsS0FBS0gsYUFBaEI7QUFDQSxRQUFJSSxLQUFLLEdBQUdELElBQUksQ0FBQ0UsT0FBTCxDQUFhSCxXQUFiLENBQVo7O0FBQ0EsUUFBSUUsS0FBSyxLQUFLLENBQUMsQ0FBZixFQUFpQjtBQUNiRCxNQUFBQSxJQUFJLENBQUNHLElBQUwsQ0FBVUosV0FBVjtBQUNIO0FBQ0osR0FUZ0I7QUFXakJLLEVBQUFBLE1BWGlCLGtCQVdUTCxXQVhTLEVBV0k7QUFDakIsUUFBSUMsSUFBSSxHQUFHLEtBQUtILGFBQWhCO0FBQ0EsUUFBSUksS0FBSyxHQUFHRCxJQUFJLENBQUNFLE9BQUwsQ0FBYUgsV0FBYixDQUFaOztBQUNBLFFBQUlFLEtBQUssS0FBSyxDQUFDLENBQWYsRUFBa0I7QUFDZEQsTUFBQUEsSUFBSSxDQUFDSyxNQUFMLENBQVlKLEtBQVosRUFBbUIsQ0FBbkI7QUFDSDtBQUNKLEdBakJnQjtBQW1CakJLLEVBQUFBLE1BbkJpQixvQkFtQlA7QUFDTixTQUFLVCxhQUFMLENBQW1CVSxJQUFuQixDQUF3QixVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZTtBQUNuQyxhQUFPRCxDQUFDLENBQUNFLFNBQUYsQ0FBWUMsU0FBWixHQUF3QkYsQ0FBQyxDQUFDQyxTQUFGLENBQVlDLFNBQTNDO0FBQ0gsS0FGRDtBQUdILEdBdkJnQjtBQXlCakJDLEVBQUFBLElBekJpQixnQkF5QlhiLFdBekJXLEVBeUJFO0FBQ2YsUUFBSUMsSUFBSSxHQUFHLEtBQUtILGFBQWhCO0FBQ0EsUUFBSUksS0FBSyxHQUFHRCxJQUFJLENBQUNFLE9BQUwsQ0FBYUgsV0FBYixDQUFaO0FBQ0FBLElBQUFBLFdBQVcsQ0FBQ2MsUUFBWixDQUFxQixLQUFyQjs7QUFDQSxRQUFJWixLQUFLLEtBQUssQ0FBQyxDQUFmLEVBQWtCO0FBQ2QsVUFBSWEsUUFBUSxHQUFHZCxJQUFJLENBQUNDLEtBQUssR0FBQyxDQUFQLENBQW5COztBQUNBLFVBQUlhLFFBQVEsSUFBSUEsUUFBUSxDQUFDSixTQUFULENBQW1CQyxTQUFuQixJQUFnQyxDQUFoRCxFQUFtRDtBQUMvQ0csUUFBQUEsUUFBUSxDQUFDRCxRQUFULENBQWtCLElBQWxCO0FBQ0g7QUFDSjtBQUNKO0FBbkNnQixDQUFyQjtBQXNDQUUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCcEIsWUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0YWJJbmRleFV0aWwgPSB7XG4gICAgX3RhYkluZGV4TGlzdDogW10sXG5cbiAgICBhZGQgKGVkaXRCb3hJbXBsKSB7XG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5fdGFiSW5kZXhMaXN0O1xuICAgICAgICBsZXQgaW5kZXggPSBsaXN0LmluZGV4T2YoZWRpdEJveEltcGwpO1xuICAgICAgICBpZiAoaW5kZXggPT09IC0xKXtcbiAgICAgICAgICAgIGxpc3QucHVzaChlZGl0Qm94SW1wbCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVtb3ZlIChlZGl0Qm94SW1wbCkge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX3RhYkluZGV4TGlzdDtcbiAgICAgICAgbGV0IGluZGV4ID0gbGlzdC5pbmRleE9mKGVkaXRCb3hJbXBsKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlc29ydCAoKSB7XG4gICAgICAgIHRoaXMuX3RhYkluZGV4TGlzdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBhLl9kZWxlZ2F0ZS5fdGFiSW5kZXggLSBiLl9kZWxlZ2F0ZS5fdGFiSW5kZXg7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBuZXh0IChlZGl0Qm94SW1wbCkge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX3RhYkluZGV4TGlzdDtcbiAgICAgICAgbGV0IGluZGV4ID0gbGlzdC5pbmRleE9mKGVkaXRCb3hJbXBsKTtcbiAgICAgICAgZWRpdEJveEltcGwuc2V0Rm9jdXMoZmFsc2UpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBsZXQgbmV4dEltcGwgPSBsaXN0W2luZGV4KzFdO1xuICAgICAgICAgICAgaWYgKG5leHRJbXBsICYmIG5leHRJbXBsLl9kZWxlZ2F0ZS5fdGFiSW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIG5leHRJbXBsLnNldEZvY3VzKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0YWJJbmRleFV0aWw7Il0sInNvdXJjZVJvb3QiOiIvIn0=