
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/spine-buffer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var SpineBuffer = cc.Class({
  name: 'cc.SpineBuffer',
  "extends": require('./mesh-buffer'),
  requestStatic: function requestStatic(vertexCount, indiceCount) {
    this.checkAndSwitchBuffer(vertexCount);
    var byteOffset = this.byteOffset + vertexCount * this._vertexBytes;
    var indiceOffset = this.indiceOffset + indiceCount;
    var byteLength = this._vData.byteLength;
    var indiceLength = this._iData.length;

    if (byteOffset > byteLength || indiceOffset > indiceLength) {
      while (byteLength < byteOffset || indiceLength < indiceOffset) {
        this._initVDataCount *= 2;
        this._initIDataCount *= 2;
        byteLength = this._initVDataCount * 4;
        indiceLength = this._initIDataCount;
      }

      this._reallocBuffer();
    }

    var offsetInfo = this._offsetInfo;
    offsetInfo.vertexOffset = this.vertexOffset;
    offsetInfo.indiceOffset = this.indiceOffset;
    offsetInfo.byteOffset = this.byteOffset;
  },
  adjust: function adjust(vertexCount, indiceCount) {
    this.vertexOffset += vertexCount;
    this.indiceOffset += indiceCount;
    this.byteOffset = this.byteOffset + vertexCount * this._vertexBytes;
    this._dirty = true;
  }
});
cc.SpineBuffer = module.exports = SpineBuffer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL3NwaW5lLWJ1ZmZlci5qcyJdLCJuYW1lcyI6WyJTcGluZUJ1ZmZlciIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicmVxdWlyZSIsInJlcXVlc3RTdGF0aWMiLCJ2ZXJ0ZXhDb3VudCIsImluZGljZUNvdW50IiwiY2hlY2tBbmRTd2l0Y2hCdWZmZXIiLCJieXRlT2Zmc2V0IiwiX3ZlcnRleEJ5dGVzIiwiaW5kaWNlT2Zmc2V0IiwiYnl0ZUxlbmd0aCIsIl92RGF0YSIsImluZGljZUxlbmd0aCIsIl9pRGF0YSIsImxlbmd0aCIsIl9pbml0VkRhdGFDb3VudCIsIl9pbml0SURhdGFDb3VudCIsIl9yZWFsbG9jQnVmZmVyIiwib2Zmc2V0SW5mbyIsIl9vZmZzZXRJbmZvIiwidmVydGV4T2Zmc2V0IiwiYWRqdXN0IiwiX2RpcnR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFdBQVcsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdkJDLEVBQUFBLElBQUksRUFBRSxnQkFEaUI7QUFFdkIsYUFBU0MsT0FBTyxDQUFDLGVBQUQsQ0FGTztBQUl2QkMsRUFBQUEsYUFKdUIseUJBSVJDLFdBSlEsRUFJS0MsV0FKTCxFQUlrQjtBQUVyQyxTQUFLQyxvQkFBTCxDQUEwQkYsV0FBMUI7QUFFQSxRQUFJRyxVQUFVLEdBQUcsS0FBS0EsVUFBTCxHQUFrQkgsV0FBVyxHQUFHLEtBQUtJLFlBQXREO0FBQ0EsUUFBSUMsWUFBWSxHQUFHLEtBQUtBLFlBQUwsR0FBb0JKLFdBQXZDO0FBRUEsUUFBSUssVUFBVSxHQUFHLEtBQUtDLE1BQUwsQ0FBWUQsVUFBN0I7QUFDQSxRQUFJRSxZQUFZLEdBQUcsS0FBS0MsTUFBTCxDQUFZQyxNQUEvQjs7QUFDQSxRQUFJUCxVQUFVLEdBQUdHLFVBQWIsSUFBMkJELFlBQVksR0FBR0csWUFBOUMsRUFBNEQ7QUFDeEQsYUFBT0YsVUFBVSxHQUFHSCxVQUFiLElBQTJCSyxZQUFZLEdBQUdILFlBQWpELEVBQStEO0FBQzNELGFBQUtNLGVBQUwsSUFBd0IsQ0FBeEI7QUFDQSxhQUFLQyxlQUFMLElBQXdCLENBQXhCO0FBRUFOLFFBQUFBLFVBQVUsR0FBRyxLQUFLSyxlQUFMLEdBQXVCLENBQXBDO0FBQ0FILFFBQUFBLFlBQVksR0FBRyxLQUFLSSxlQUFwQjtBQUNIOztBQUVELFdBQUtDLGNBQUw7QUFDSDs7QUFFRCxRQUFJQyxVQUFVLEdBQUcsS0FBS0MsV0FBdEI7QUFDQUQsSUFBQUEsVUFBVSxDQUFDRSxZQUFYLEdBQTBCLEtBQUtBLFlBQS9CO0FBQ0FGLElBQUFBLFVBQVUsQ0FBQ1QsWUFBWCxHQUEwQixLQUFLQSxZQUEvQjtBQUNBUyxJQUFBQSxVQUFVLENBQUNYLFVBQVgsR0FBd0IsS0FBS0EsVUFBN0I7QUFDSCxHQTdCc0I7QUErQnZCYyxFQUFBQSxNQS9CdUIsa0JBK0JmakIsV0EvQmUsRUErQkZDLFdBL0JFLEVBK0JXO0FBQzlCLFNBQUtlLFlBQUwsSUFBcUJoQixXQUFyQjtBQUNBLFNBQUtLLFlBQUwsSUFBcUJKLFdBQXJCO0FBRUEsU0FBS0UsVUFBTCxHQUFrQixLQUFLQSxVQUFMLEdBQWtCSCxXQUFXLEdBQUcsS0FBS0ksWUFBdkQ7QUFFQSxTQUFLYyxNQUFMLEdBQWMsSUFBZDtBQUNIO0FBdENzQixDQUFULENBQWxCO0FBeUNBdkIsRUFBRSxDQUFDRCxXQUFILEdBQWlCeUIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCMUIsV0FBbEMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgU3BpbmVCdWZmZXIgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlNwaW5lQnVmZmVyJyxcbiAgICBleHRlbmRzOiByZXF1aXJlKCcuL21lc2gtYnVmZmVyJyksXG5cbiAgICByZXF1ZXN0U3RhdGljICh2ZXJ0ZXhDb3VudCwgaW5kaWNlQ291bnQpIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2hlY2tBbmRTd2l0Y2hCdWZmZXIodmVydGV4Q291bnQpO1xuXG4gICAgICAgIGxldCBieXRlT2Zmc2V0ID0gdGhpcy5ieXRlT2Zmc2V0ICsgdmVydGV4Q291bnQgKiB0aGlzLl92ZXJ0ZXhCeXRlcztcbiAgICAgICAgbGV0IGluZGljZU9mZnNldCA9IHRoaXMuaW5kaWNlT2Zmc2V0ICsgaW5kaWNlQ291bnQ7XG5cbiAgICAgICAgbGV0IGJ5dGVMZW5ndGggPSB0aGlzLl92RGF0YS5ieXRlTGVuZ3RoO1xuICAgICAgICBsZXQgaW5kaWNlTGVuZ3RoID0gdGhpcy5faURhdGEubGVuZ3RoO1xuICAgICAgICBpZiAoYnl0ZU9mZnNldCA+IGJ5dGVMZW5ndGggfHwgaW5kaWNlT2Zmc2V0ID4gaW5kaWNlTGVuZ3RoKSB7XG4gICAgICAgICAgICB3aGlsZSAoYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgfHwgaW5kaWNlTGVuZ3RoIDwgaW5kaWNlT2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdFZEYXRhQ291bnQgKj0gMjtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0SURhdGFDb3VudCAqPSAyO1xuXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aCA9IHRoaXMuX2luaXRWRGF0YUNvdW50ICogNDtcbiAgICAgICAgICAgICAgICBpbmRpY2VMZW5ndGggPSB0aGlzLl9pbml0SURhdGFDb3VudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fcmVhbGxvY0J1ZmZlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9mZnNldEluZm8gPSB0aGlzLl9vZmZzZXRJbmZvO1xuICAgICAgICBvZmZzZXRJbmZvLnZlcnRleE9mZnNldCA9IHRoaXMudmVydGV4T2Zmc2V0O1xuICAgICAgICBvZmZzZXRJbmZvLmluZGljZU9mZnNldCA9IHRoaXMuaW5kaWNlT2Zmc2V0O1xuICAgICAgICBvZmZzZXRJbmZvLmJ5dGVPZmZzZXQgPSB0aGlzLmJ5dGVPZmZzZXQ7XG4gICAgfSxcblxuICAgIGFkanVzdCAodmVydGV4Q291bnQsIGluZGljZUNvdW50KSB7XG4gICAgICAgIHRoaXMudmVydGV4T2Zmc2V0ICs9IHZlcnRleENvdW50O1xuICAgICAgICB0aGlzLmluZGljZU9mZnNldCArPSBpbmRpY2VDb3VudDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYnl0ZU9mZnNldCA9IHRoaXMuYnl0ZU9mZnNldCArIHZlcnRleENvdW50ICogdGhpcy5fdmVydGV4Qnl0ZXM7XG5cbiAgICAgICAgdGhpcy5fZGlydHkgPSB0cnVlO1xuICAgIH1cbn0pO1xuXG5jYy5TcGluZUJ1ZmZlciA9IG1vZHVsZS5leHBvcnRzID0gU3BpbmVCdWZmZXI7Il0sInNvdXJjZVJvb3QiOiIvIn0=