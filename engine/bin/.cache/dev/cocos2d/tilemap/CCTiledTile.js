
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/tilemap/CCTiledTile.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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

/**
 * !#en TiledTile can control the specified map tile. 
 * It will apply the node rotation, scale, translate to the map tile.
 * You can change the TiledTile's gid to change the map tile's style.
 * !#zh TiledTile 可以单独对某一个地图块进行操作。
 * 他会将节点的旋转，缩放，平移操作应用在这个地图块上，并可以通过更换当前地图块的 gid 来更换地图块的显示样式。
 * @class TiledTile
 * @extends Component
 */
var TiledTile = cc.Class({
  name: 'cc.TiledTile',
  "extends": cc.Component,
  editor: CC_EDITOR && {
    executeInEditMode: true,
    menu: 'i18n:MAIN_MENU.component.renderers/TiledTile'
  },
  ctor: function ctor() {
    this._layer = null;
  },
  properties: {
    _x: 0,
    _y: 0,

    /**
     * !#en Specify the TiledTile horizontal coordinate，use map tile as the unit.
     * !#zh 指定 TiledTile 的横向坐标，以地图块为单位
     * @property {Number} x
     * @default 0
     */
    x: {
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        if (value === this._x) return;

        if (this._layer && this._layer._isInvalidPosition(value, this._y)) {
          cc.warn("Invalid x, the valid value is between [%s] ~ [%s]", 0, this._layer._layerSize.width);
          return;
        }

        this._resetTile();

        this._x = value;

        this._updateInfo();
      },
      type: cc.Integer
    },

    /**
     * !#en Specify the TiledTile vertical coordinate，use map tile as the unit.
     * !#zh 指定 TiledTile 的纵向坐标，以地图块为单位
     * @property {Number} y
     * @default 0
     */
    y: {
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        if (value === this._y) return;

        if (this._layer && this._layer._isInvalidPosition(this._x, value)) {
          cc.warn("Invalid y, the valid value is between [%s] ~ [%s]", 0, this._layer._layerSize.height);
          return;
        }

        this._resetTile();

        this._y = value;

        this._updateInfo();
      },
      type: cc.Integer
    },

    /**
     * !#en Specify the TiledTile gid.
     * !#zh 指定 TiledTile 的 gid 值
     * @property {Number} gid
     * @default 0
     */
    gid: {
      get: function get() {
        if (this._layer) {
          return this._layer.getTileGIDAt(this._x, this._y);
        }

        return 0;
      },
      set: function set(value) {
        if (this._layer) {
          this._layer.setTileGIDAt(value, this._x, this._y);
        }
      },
      type: cc.Integer
    }
  },
  onEnable: function onEnable() {
    var parent = this.node.parent;
    this._layer = parent.getComponent(cc.TiledLayer);

    this._resetTile();

    this._updateInfo();
  },
  onDisable: function onDisable() {
    this._resetTile();
  },
  _resetTile: function _resetTile() {
    if (this._layer && this._layer.getTiledTileAt(this._x, this._y) === this) {
      this._layer.setTiledTileAt(this._x, this._y, null);
    }
  },
  _updateInfo: function _updateInfo() {
    if (!this._layer) return;
    var x = this._x,
        y = this._y;

    if (this._layer.getTiledTileAt(x, y)) {
      cc.warn('There is already a TiledTile at [%s, %s]', x, y);
      return;
    }

    this.node.setPosition(this._layer.getPositionAt(x, y));

    this._layer.setTiledTileAt(x, y, this);
  }
});
cc.TiledTile = module.exports = TiledTile;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC90aWxlbWFwL0NDVGlsZWRUaWxlLmpzIl0sIm5hbWVzIjpbIlRpbGVkVGlsZSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJtZW51IiwiY3RvciIsIl9sYXllciIsInByb3BlcnRpZXMiLCJfeCIsIl95IiwieCIsImdldCIsInNldCIsInZhbHVlIiwiX2lzSW52YWxpZFBvc2l0aW9uIiwid2FybiIsIl9sYXllclNpemUiLCJ3aWR0aCIsIl9yZXNldFRpbGUiLCJfdXBkYXRlSW5mbyIsInR5cGUiLCJJbnRlZ2VyIiwieSIsImhlaWdodCIsImdpZCIsImdldFRpbGVHSURBdCIsInNldFRpbGVHSURBdCIsIm9uRW5hYmxlIiwicGFyZW50Iiwibm9kZSIsImdldENvbXBvbmVudCIsIlRpbGVkTGF5ZXIiLCJvbkRpc2FibGUiLCJnZXRUaWxlZFRpbGVBdCIsInNldFRpbGVkVGlsZUF0Iiwic2V0UG9zaXRpb24iLCJnZXRQb3NpdGlvbkF0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7Ozs7Ozs7O0FBU0EsSUFBSUEsU0FBUyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNyQkMsRUFBQUEsSUFBSSxFQUFFLGNBRGU7QUFFckIsYUFBU0YsRUFBRSxDQUFDRyxTQUZTO0FBSXJCQyxFQUFBQSxNQUFNLEVBQUVDLFNBQVMsSUFBSTtBQUNqQkMsSUFBQUEsaUJBQWlCLEVBQUUsSUFERjtBQUVqQkMsSUFBQUEsSUFBSSxFQUFFO0FBRlcsR0FKQTtBQVNyQkMsRUFBQUEsSUFUcUIsa0JBU2I7QUFDSixTQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNILEdBWG9CO0FBYXJCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsRUFBRSxFQUFFLENB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LEVBQTZDLElBQTdDO0FBQ0g7QUFDSixHQXBHb0I7QUFzR3JCVSxFQUFBQSxXQXRHcUIseUJBc0dOO0FBQ1gsUUFBSSxDQUFDLEtBQUtiLE1BQVYsRUFBa0I7QUFFbEIsUUFBSUksQ0FBQyxHQUFHLEtBQUtGLEVBQWI7QUFBQSxRQUFrQmMsQ0FBQyxHQUFHLEtBQUtiLEVBQTNCOztBQUNBLFFBQUksS0FBS0gsTUFBTCxDQUFZMkIsY0FBWixDQUEyQnZCLENBQTNCLEVBQThCWSxDQUE5QixDQUFKLEVBQXNDO0FBQ2xDekIsTUFBQUEsRUFBRSxDQUFDa0IsSUFBSCxDQUFRLDBDQUFSLEVBQW9ETCxDQUFwRCxFQUF1RFksQ0FBdkQ7QUFDQTtBQUNIOztBQUNELFNBQUtPLElBQUwsQ0FBVU0sV0FBVixDQUFzQixLQUFLN0IsTUFBTCxDQUFZOEIsYUFBWixDQUEwQjFCLENBQTFCLEVBQTZCWSxDQUE3QixDQUF0Qjs7QUFDQSxTQUFLaEIsTUFBTCxDQUFZNEIsY0FBWixDQUEyQnhCLENBQTNCLEVBQThCWSxDQUE5QixFQUFpQyxJQUFqQztBQUNIO0FBaEhvQixDQUFULENBQWhCO0FBbUhBekIsRUFBRSxDQUFDRCxTQUFILEdBQWV5QyxNQUFNLENBQUNDLE9BQVAsR0FBaUIxQyxTQUFoQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKipcbiAqICEjZW4gVGlsZWRUaWxlIGNhbiBjb250cm9sIHRoZSBzcGVjaWZpZWQgbWFwIHRpbGUuIFxuICogSXQgd2lsbCBhcHBseSB0aGUgbm9kZSByb3RhdGlvbiwgc2NhbGUsIHRyYW5zbGF0ZSB0byB0aGUgbWFwIHRpbGUuXG4gKiBZb3UgY2FuIGNoYW5nZSB0aGUgVGlsZWRUaWxlJ3MgZ2lkIHRvIGNoYW5nZSB0aGUgbWFwIHRpbGUncyBzdHlsZS5cbiAqICEjemggVGlsZWRUaWxlIOWPr+S7peWNleeLrOWvueafkOS4gOS4quWcsOWbvuWdl+i/m+ihjOaTjeS9nOOAglxuICog5LuW5Lya5bCG6IqC54K555qE5peL6L2s77yM57yp5pS+77yM5bmz56e75pON5L2c5bqU55So5Zyo6L+Z5Liq5Zyw5Zu+5Z2X5LiK77yM5bm25Y+v5Lul6YCa6L+H5pu05o2i5b2T5YmN5Zyw5Zu+5Z2X55qEIGdpZCDmnaXmm7TmjaLlnLDlm77lnZfnmoTmmL7npLrmoLflvI/jgIJcbiAqIEBjbGFzcyBUaWxlZFRpbGVcbiAqIEBleHRlbmRzIENvbXBvbmVudFxuICovXG5sZXQgVGlsZWRUaWxlID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5UaWxlZFRpbGUnLFxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcbiAgICAgICAgZXhlY3V0ZUluRWRpdE1vZGU6IHRydWUsXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucmVuZGVyZXJzL1RpbGVkVGlsZScsXG4gICAgfSxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICB0aGlzLl9sYXllciA9IG51bGw7XG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX3g6IDAsXG4gICAgICAgIF95OiAwLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFNwZWNpZnkgdGhlIFRpbGVkVGlsZSBob3Jpem9udGFsIGNvb3JkaW5hdGXvvIx1c2UgbWFwIHRpbGUgYXMgdGhlIHVuaXQuXG4gICAgICAgICAqICEjemgg5oyH5a6aIFRpbGVkVGlsZSDnmoTmqKrlkJHlnZDmoIfvvIzku6XlnLDlm77lnZfkuLrljZXkvY1cbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHhcbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKi9cbiAgICAgICAgeDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLl94KSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xheWVyICYmIHRoaXMuX2xheWVyLl9pc0ludmFsaWRQb3NpdGlvbih2YWx1ZSwgdGhpcy5feSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybihgSW52YWxpZCB4LCB0aGUgdmFsaWQgdmFsdWUgaXMgYmV0d2VlbiBbJXNdIH4gWyVzXWAsIDAsIHRoaXMuX2xheWVyLl9sYXllclNpemUud2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0VGlsZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVJbmZvKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlclxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFNwZWNpZnkgdGhlIFRpbGVkVGlsZSB2ZXJ0aWNhbCBjb29yZGluYXRl77yMdXNlIG1hcCB0aWxlIGFzIHRoZSB1bml0LlxuICAgICAgICAgKiAhI3poIOaMh+WumiBUaWxlZFRpbGUg55qE57q15ZCR5Z2Q5qCH77yM5Lul5Zyw5Zu+5Z2X5Li65Y2V5L2NXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB5XG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIHk6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5feSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sYXllciAmJiB0aGlzLl9sYXllci5faXNJbnZhbGlkUG9zaXRpb24odGhpcy5feCwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm4oYEludmFsaWQgeSwgdGhlIHZhbGlkIHZhbHVlIGlzIGJldHdlZW4gWyVzXSB+IFslc11gLCAwLCB0aGlzLl9sYXllci5fbGF5ZXJTaXplLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRUaWxlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUluZm8oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gU3BlY2lmeSB0aGUgVGlsZWRUaWxlIGdpZC5cbiAgICAgICAgICogISN6aCDmjIflrpogVGlsZWRUaWxlIOeahCBnaWQg5YC8XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBnaWRcbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKi9cbiAgICAgICAgZ2lkOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sYXllcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGF5ZXIuZ2V0VGlsZUdJREF0KHRoaXMuX3gsIHRoaXMuX3kpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyLnNldFRpbGVHSURBdCh2YWx1ZSwgdGhpcy5feCwgdGhpcy5feSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXJcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkVuYWJsZSAoKSB7XG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50O1xuICAgICAgICB0aGlzLl9sYXllciA9IHBhcmVudC5nZXRDb21wb25lbnQoY2MuVGlsZWRMYXllcik7XG4gICAgICAgIHRoaXMuX3Jlc2V0VGlsZSgpO1xuICAgICAgICB0aGlzLl91cGRhdGVJbmZvKCk7XG4gICAgfSxcblxuICAgIG9uRGlzYWJsZSAoKSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0VGlsZSgpO1xuICAgIH0sXG5cbiAgICBfcmVzZXRUaWxlICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2xheWVyICYmIHRoaXMuX2xheWVyLmdldFRpbGVkVGlsZUF0KHRoaXMuX3gsIHRoaXMuX3kpID09PSB0aGlzKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXllci5zZXRUaWxlZFRpbGVBdCh0aGlzLl94LCB0aGlzLl95LCBudWxsKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdXBkYXRlSW5mbyAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fbGF5ZXIpIHJldHVybjtcblxuICAgICAgICBsZXQgeCA9IHRoaXMuX3gsICB5ID0gdGhpcy5feTtcbiAgICAgICAgaWYgKHRoaXMuX2xheWVyLmdldFRpbGVkVGlsZUF0KHgsIHkpKSB7XG4gICAgICAgICAgICBjYy53YXJuKCdUaGVyZSBpcyBhbHJlYWR5IGEgVGlsZWRUaWxlIGF0IFslcywgJXNdJywgeCwgeSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMuX2xheWVyLmdldFBvc2l0aW9uQXQoeCwgeSkpO1xuICAgICAgICB0aGlzLl9sYXllci5zZXRUaWxlZFRpbGVBdCh4LCB5LCB0aGlzKTtcbiAgICB9LFxufSk7XG5cbmNjLlRpbGVkVGlsZSA9IG1vZHVsZS5leHBvcnRzID0gVGlsZWRUaWxlO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=