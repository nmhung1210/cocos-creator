
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/utils/utils.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var dynamicAtlasManager = require('./dynamic-atlas/manager');

var WHITE = cc.Color.WHITE; // share data of bmfont

var shareLabelInfo = {
  fontAtlas: null,
  fontSize: 0,
  lineHeight: 0,
  hAlign: 0,
  vAlign: 0,
  hash: "",
  fontFamily: "",
  fontDesc: "Arial",
  color: WHITE,
  isOutlined: false,
  out: WHITE,
  margin: 0
};
module.exports = {
  deleteFromDynamicAtlas: function deleteFromDynamicAtlas(comp, frame) {
    if (frame && !CC_TEST) {
      if (frame._original && dynamicAtlasManager) {
        dynamicAtlasManager.deleteAtlasSpriteFrame(frame);

        frame._resetDynamicAtlasFrame();
      }
    }
  },
  getFontFamily: function getFontFamily(comp) {
    if (!comp.useSystemFont) {
      if (comp.font) {
        if (comp.font._nativeAsset) {
          return comp.font._nativeAsset;
        }

        cc.assetManager.postLoadNative(comp.font, function (err) {
          comp.setVertsDirty();
        });
        return 'Arial';
      }

      return 'Arial';
    } else {
      return comp.fontFamily || 'Arial';
    }
  },
  shareLabelInfo: shareLabelInfo
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3V0aWxzL3V0aWxzLmpzIl0sIm5hbWVzIjpbImR5bmFtaWNBdGxhc01hbmFnZXIiLCJyZXF1aXJlIiwiV0hJVEUiLCJjYyIsIkNvbG9yIiwic2hhcmVMYWJlbEluZm8iLCJmb250QXRsYXMiLCJmb250U2l6ZSIsImxpbmVIZWlnaHQiLCJoQWxpZ24iLCJ2QWxpZ24iLCJoYXNoIiwiZm9udEZhbWlseSIsImZvbnREZXNjIiwiY29sb3IiLCJpc091dGxpbmVkIiwib3V0IiwibWFyZ2luIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlbGV0ZUZyb21EeW5hbWljQXRsYXMiLCJjb21wIiwiZnJhbWUiLCJDQ19URVNUIiwiX29yaWdpbmFsIiwiZGVsZXRlQXRsYXNTcHJpdGVGcmFtZSIsIl9yZXNldER5bmFtaWNBdGxhc0ZyYW1lIiwiZ2V0Rm9udEZhbWlseSIsInVzZVN5c3RlbUZvbnQiLCJmb250IiwiX25hdGl2ZUFzc2V0IiwiYXNzZXRNYW5hZ2VyIiwicG9zdExvYWROYXRpdmUiLCJlcnIiLCJzZXRWZXJ0c0RpcnR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsbUJBQW1CLEdBQUdDLE9BQU8sQ0FBQyx5QkFBRCxDQUFuQzs7QUFDQSxJQUFNQyxLQUFLLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTRixLQUF2QixFQUVBOztBQUNBLElBQUlHLGNBQWMsR0FBRztBQUNqQkMsRUFBQUEsU0FBUyxFQUFFLElBRE07QUFHakJDLEVBQUFBLFFBQVEsRUFBQyxDQUhRO0FBSWpCQyxFQUFBQSxVQUFVLEVBQUMsQ0FKTTtBQUtqQkMsRUFBQUEsTUFBTSxFQUFDLENBTFU7QUFNakJDLEVBQUFBLE1BQU0sRUFBQyxDQU5VO0FBUWpCQyxFQUFBQSxJQUFJLEVBQUMsRUFSWTtBQVNqQkMsRUFBQUEsVUFBVSxFQUFDLEVBVE07QUFVakJDLEVBQUFBLFFBQVEsRUFBQyxPQVZRO0FBV2pCQyxFQUFBQSxLQUFLLEVBQUNaLEtBWFc7QUFZakJhLEVBQUFBLFVBQVUsRUFBQyxLQVpNO0FBYWpCQyxFQUFBQSxHQUFHLEVBQUNkLEtBYmE7QUFjakJlLEVBQUFBLE1BQU0sRUFBQztBQWRVLENBQXJCO0FBaUJBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFFYkMsRUFBQUEsc0JBRmEsa0NBRVdDLElBRlgsRUFFaUJDLEtBRmpCLEVBRXdCO0FBQ2pDLFFBQUlBLEtBQUssSUFBSSxDQUFDQyxPQUFkLEVBQXVCO0FBQ25CLFVBQUlELEtBQUssQ0FBQ0UsU0FBTixJQUFtQnhCLG1CQUF2QixFQUE0QztBQUN4Q0EsUUFBQUEsbUJBQW1CLENBQUN5QixzQkFBcEIsQ0FBMkNILEtBQTNDOztBQUNBQSxRQUFBQSxLQUFLLENBQUNJLHVCQUFOO0FBQ0g7QUFDSjtBQUNKLEdBVFk7QUFXYkMsRUFBQUEsYUFYYSx5QkFXRU4sSUFYRixFQVdRO0FBQ2pCLFFBQUksQ0FBQ0EsSUFBSSxDQUFDTyxhQUFWLEVBQXlCO0FBQ3JCLFVBQUlQLElBQUksQ0FBQ1EsSUFBVCxFQUFlO0FBQ1gsWUFBSVIsSUFBSSxDQUFDUSxJQUFMLENBQVVDLFlBQWQsRUFBNEI7QUFDeEIsaUJBQU9ULElBQUksQ0FBQ1EsSUFBTCxDQUFVQyxZQUFqQjtBQUNIOztBQUNEM0IsUUFBQUEsRUFBRSxDQUFDNEIsWUFBSCxDQUFnQkMsY0FBaEIsQ0FBK0JYLElBQUksQ0FBQ1EsSUFBcEMsRUFBMEMsVUFBVUksR0FBVixFQUFlO0FBQ3JEWixVQUFBQSxJQUFJLENBQUNhLGFBQUw7QUFDSCxTQUZEO0FBR0EsZUFBTyxPQUFQO0FBQ0g7O0FBRUQsYUFBTyxPQUFQO0FBQ0gsS0FaRCxNQWFLO0FBQ0QsYUFBT2IsSUFBSSxDQUFDVCxVQUFMLElBQW1CLE9BQTFCO0FBQ0g7QUFDSixHQTVCWTtBQThCYlAsRUFBQUEsY0FBYyxFQUFFQTtBQTlCSCxDQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGR5bmFtaWNBdGxhc01hbmFnZXIgPSByZXF1aXJlKCcuL2R5bmFtaWMtYXRsYXMvbWFuYWdlcicpO1xuY29uc3QgV0hJVEUgPSBjYy5Db2xvci5XSElURTtcblxuLy8gc2hhcmUgZGF0YSBvZiBibWZvbnRcbmxldCBzaGFyZUxhYmVsSW5mbyA9IHtcbiAgICBmb250QXRsYXM6IG51bGwsXG4gICAgXG4gICAgZm9udFNpemU6MCxcbiAgICBsaW5lSGVpZ2h0OjAsXG4gICAgaEFsaWduOjAsXG4gICAgdkFsaWduOjAsXG5cbiAgICBoYXNoOlwiXCIsXG4gICAgZm9udEZhbWlseTpcIlwiLFxuICAgIGZvbnREZXNjOlwiQXJpYWxcIixcbiAgICBjb2xvcjpXSElURSxcbiAgICBpc091dGxpbmVkOmZhbHNlLFxuICAgIG91dDpXSElURSxcbiAgICBtYXJnaW46MCxcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBkZWxldGVGcm9tRHluYW1pY0F0bGFzIChjb21wLCBmcmFtZSkge1xuICAgICAgICBpZiAoZnJhbWUgJiYgIUNDX1RFU1QpIHtcbiAgICAgICAgICAgIGlmIChmcmFtZS5fb3JpZ2luYWwgJiYgZHluYW1pY0F0bGFzTWFuYWdlcikge1xuICAgICAgICAgICAgICAgIGR5bmFtaWNBdGxhc01hbmFnZXIuZGVsZXRlQXRsYXNTcHJpdGVGcmFtZShmcmFtZSk7XG4gICAgICAgICAgICAgICAgZnJhbWUuX3Jlc2V0RHluYW1pY0F0bGFzRnJhbWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRGb250RmFtaWx5IChjb21wKSB7XG4gICAgICAgIGlmICghY29tcC51c2VTeXN0ZW1Gb250KSB7XG4gICAgICAgICAgICBpZiAoY29tcC5mb250KSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXAuZm9udC5fbmF0aXZlQXNzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXAuZm9udC5fbmF0aXZlQXNzZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5wb3N0TG9hZE5hdGl2ZShjb21wLmZvbnQsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcC5zZXRWZXJ0c0RpcnR5KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdBcmlhbCc7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICByZXR1cm4gJ0FyaWFsJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wLmZvbnRGYW1pbHkgfHwgJ0FyaWFsJztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzaGFyZUxhYmVsSW5mbzogc2hhcmVMYWJlbEluZm9cbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9