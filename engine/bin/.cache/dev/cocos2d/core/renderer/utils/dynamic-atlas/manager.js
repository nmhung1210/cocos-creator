
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/utils/dynamic-atlas/manager.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var Atlas = require('./atlas');

var _atlases = [];

var _atlasIndex = -1;

var _maxAtlasCount = 5;
var _textureSize = 2048;
var _maxFrameSize = 512;
var _textureBleeding = true;
var _debugNode = null;

function newAtlas() {
  var atlas = _atlases[++_atlasIndex];

  if (!atlas) {
    atlas = new Atlas(_textureSize, _textureSize);

    _atlases.push(atlas);
  }

  return atlas;
}

function beforeSceneLoad() {
  dynamicAtlasManager.reset();
}

var _enabled = false;
/**
 * !#en Manage Dynamic Atlas Manager. Dynamic Atlas Manager is used for merging textures at runtime, see [Dynamic Atlas](https://docs.cocos.com/creator/manual/en/advanced-topics/dynamic-atlas.html) for details.
 * !#zh 管理动态图集。动态图集用于在运行时对贴图进行合并，详见 [动态合图](https://docs.cocos.com/creator/manual/zh/advanced-topics/dynamic-atlas.html)。
 * @class DynamicAtlasManager
 */

var dynamicAtlasManager = {
  Atlas: Atlas,

  /**
   * !#en Enable or disable the dynamic atlas, see [Dynamic Atlas](https://docs.cocos.com/creator/manual/en/advanced-topics/dynamic-atlas.html) for details.
   * !#zh 开启或者关闭动态图集，详见 [动态合图](https://docs.cocos.com/creator/manual/zh/advanced-topics/dynamic-atlas.html)。
   * @property enabled
   * @type {Boolean}
   */
  get enabled() {
    return _enabled;
  },

  set enabled(value) {
    if (_enabled === value) return;

    if (value) {
      this.reset();
      cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, beforeSceneLoad);
    } else {
      cc.director.off(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, beforeSceneLoad);
    }

    _enabled = value;
  },

  /**
   * !#en The maximum number of atlas that can be created.
   * !#zh 可以创建的最大图集数量。
   * @property maxAtlasCount
   * @type {Number}
   */
  get maxAtlasCount() {
    return _maxAtlasCount;
  },

  set maxAtlasCount(value) {
    _maxAtlasCount = value;
  },

  /**
   * !#en Is enable textureBleeding.
   * !#zh 是否开启 textureBleeding
   * @property textureBleeding
   * @type {Boolean}
   */
  get textureBleeding() {
    return _textureBleeding;
  },

  set textureBleeding(enable) {
    _textureBleeding = enable;
  },

  /**
   * !#en The size of the atlas that was created
   * !#zh 创建的图集的宽高
   * @property textureSize
   * @type {Number}
   */
  get textureSize() {
    return _textureSize;
  },

  set textureSize(value) {
    _textureSize = value;
  },

  /**
   * !#en The maximum size of the picture that can be added to the atlas.
   * !#zh 可以添加进图集的图片的最大尺寸。
   * @property maxFrameSize
   * @type {Number}
   */
  get maxFrameSize() {
    return _maxFrameSize;
  },

  set maxFrameSize(value) {
    _maxFrameSize = value;
  },

  /**
   * !#en The minimum size of the picture that can be added to the atlas.
   * !#zh 可以添加进图集的图片的最小尺寸。
   * @property minFrameSize
   * @type {Number}
   * @deprecated
   */

  /**
   * !#en Append a sprite frame into the dynamic atlas.
   * !#zh 添加碎图进入动态图集。
   * @method insertSpriteFrame
   * @param {SpriteFrame} spriteFrame 
   */
  insertSpriteFrame: function insertSpriteFrame(spriteFrame) {
    if (CC_EDITOR) return null;
    if (!_enabled || _atlasIndex === _maxAtlasCount || !spriteFrame || spriteFrame._original) return null;
    if (!spriteFrame._texture.packable) return null;
    var atlas = _atlases[_atlasIndex];

    if (!atlas) {
      atlas = newAtlas();
    }

    var frame = atlas.insertSpriteFrame(spriteFrame);

    if (!frame && _atlasIndex !== _maxAtlasCount) {
      atlas = newAtlas();
      return atlas.insertSpriteFrame(spriteFrame);
    }

    return frame;
  },

  /** 
   * !#en Resets all dynamic atlas, and the existing ones will be destroyed.
   * !#zh 重置所有动态图集，已有的动态图集会被销毁。
   * @method reset
  */
  reset: function reset() {
    for (var i = 0, l = _atlases.length; i < l; i++) {
      _atlases[i].destroy();
    }

    _atlases.length = 0;
    _atlasIndex = -1;
  },
  deleteAtlasSpriteFrame: function deleteAtlasSpriteFrame(spriteFrame) {
    if (!spriteFrame._original) return;
    var texture = spriteFrame._original._texture;
    this.deleteAtlasTexture(texture);
  },
  deleteAtlasTexture: function deleteAtlasTexture(texture) {
    if (texture) {
      for (var i = _atlases.length - 1; i >= 0; i--) {
        _atlases[i].deleteInnerTexture(texture);

        if (_atlases[i].isEmpty()) {
          _atlases[i].destroy();

          _atlases.splice(i, 1);

          _atlasIndex--;
        }
      }
    }
  },

  /**
   * !#en Displays all the dynamic atlas in the current scene, which you can use to view the current atlas state.
   * !#zh 在当前场景中显示所有动态图集，可以用来查看当前的合图状态。
   * @method showDebug
   * @param {Boolean} show
   * @return {Node}
   */
  showDebug: CC_DEBUG && function (show) {
    if (show) {
      if (!_debugNode || !_debugNode.isValid) {
        var width = cc.visibleRect.width;
        var height = cc.visibleRect.height;
        _debugNode = new cc.Node('DYNAMIC_ATLAS_DEBUG_NODE');
        _debugNode.width = width;
        _debugNode.height = height;
        _debugNode.x = width / 2;
        _debugNode.y = height / 2;
        _debugNode.zIndex = cc.macro.MAX_ZINDEX;
        _debugNode.parent = cc.director.getScene();
        _debugNode.groupIndex = cc.Node.BuiltinGroupIndex.DEBUG;

        cc.Camera._setupDebugCamera();

        var scroll = _debugNode.addComponent(cc.ScrollView);

        var content = new cc.Node('CONTENT');
        var layout = content.addComponent(cc.Layout);
        layout.type = cc.Layout.Type.VERTICAL;
        layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        content.parent = _debugNode;
        content.width = _textureSize;
        content.anchorY = 1;
        content.x = _textureSize;
        scroll.content = content;

        for (var i = 0; i <= _atlasIndex; i++) {
          var node = new cc.Node('ATLAS');
          var texture = _atlases[i]._texture;
          var spriteFrame = new cc.SpriteFrame();
          spriteFrame.setTexture(_atlases[i]._texture);
          var sprite = node.addComponent(cc.Sprite);
          sprite.spriteFrame = spriteFrame;
          node.parent = content;
        }
      }

      return _debugNode;
    } else {
      if (_debugNode) {
        _debugNode.parent = null;
        _debugNode = null;
      }
    }
  },
  update: function update() {
    if (!this.enabled) return;

    for (var i = 0; i <= _atlasIndex; i++) {
      _atlases[i].update();
    }
  }
};
/**
 * @module cc
 */

/**
 * @property dynamicAtlasManager
 * @type DynamicAtlasManager
 */

module.exports = cc.dynamicAtlasManager = dynamicAtlasManager;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3V0aWxzL2R5bmFtaWMtYXRsYXMvbWFuYWdlci5qcyJdLCJuYW1lcyI6WyJBdGxhcyIsInJlcXVpcmUiLCJfYXRsYXNlcyIsIl9hdGxhc0luZGV4IiwiX21heEF0bGFzQ291bnQiLCJfdGV4dHVyZVNpemUiLCJfbWF4RnJhbWVTaXplIiwiX3RleHR1cmVCbGVlZGluZyIsIl9kZWJ1Z05vZGUiLCJuZXdBdGxhcyIsImF0bGFzIiwicHVzaCIsImJlZm9yZVNjZW5lTG9hZCIsImR5bmFtaWNBdGxhc01hbmFnZXIiLCJyZXNldCIsIl9lbmFibGVkIiwiZW5hYmxlZCIsInZhbHVlIiwiY2MiLCJkaXJlY3RvciIsIm9uIiwiRGlyZWN0b3IiLCJFVkVOVF9CRUZPUkVfU0NFTkVfTEFVTkNIIiwib2ZmIiwibWF4QXRsYXNDb3VudCIsInRleHR1cmVCbGVlZGluZyIsImVuYWJsZSIsInRleHR1cmVTaXplIiwibWF4RnJhbWVTaXplIiwiaW5zZXJ0U3ByaXRlRnJhbWUiLCJzcHJpdGVGcmFtZSIsIkNDX0VESVRPUiIsIl9vcmlnaW5hbCIsIl90ZXh0dXJlIiwicGFja2FibGUiLCJmcmFtZSIsImkiLCJsIiwibGVuZ3RoIiwiZGVzdHJveSIsImRlbGV0ZUF0bGFzU3ByaXRlRnJhbWUiLCJ0ZXh0dXJlIiwiZGVsZXRlQXRsYXNUZXh0dXJlIiwiZGVsZXRlSW5uZXJUZXh0dXJlIiwiaXNFbXB0eSIsInNwbGljZSIsInNob3dEZWJ1ZyIsIkNDX0RFQlVHIiwic2hvdyIsImlzVmFsaWQiLCJ3aWR0aCIsInZpc2libGVSZWN0IiwiaGVpZ2h0IiwiTm9kZSIsIngiLCJ5IiwiekluZGV4IiwibWFjcm8iLCJNQVhfWklOREVYIiwicGFyZW50IiwiZ2V0U2NlbmUiLCJncm91cEluZGV4IiwiQnVpbHRpbkdyb3VwSW5kZXgiLCJERUJVRyIsIkNhbWVyYSIsIl9zZXR1cERlYnVnQ2FtZXJhIiwic2Nyb2xsIiwiYWRkQ29tcG9uZW50IiwiU2Nyb2xsVmlldyIsImNvbnRlbnQiLCJsYXlvdXQiLCJMYXlvdXQiLCJ0eXBlIiwiVHlwZSIsIlZFUlRJQ0FMIiwicmVzaXplTW9kZSIsIlJlc2l6ZU1vZGUiLCJDT05UQUlORVIiLCJhbmNob3JZIiwibm9kZSIsIlNwcml0ZUZyYW1lIiwic2V0VGV4dHVyZSIsInNwcml0ZSIsIlNwcml0ZSIsInVwZGF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxTQUFELENBQXJCOztBQUVBLElBQUlDLFFBQVEsR0FBRyxFQUFmOztBQUNBLElBQUlDLFdBQVcsR0FBRyxDQUFDLENBQW5COztBQUVBLElBQUlDLGNBQWMsR0FBRyxDQUFyQjtBQUNBLElBQUlDLFlBQVksR0FBRyxJQUFuQjtBQUNBLElBQUlDLGFBQWEsR0FBRyxHQUFwQjtBQUNBLElBQUlDLGdCQUFnQixHQUFHLElBQXZCO0FBRUEsSUFBSUMsVUFBVSxHQUFHLElBQWpCOztBQUVBLFNBQVNDLFFBQVQsR0FBcUI7QUFDakIsTUFBSUMsS0FBSyxHQUFHUixRQUFRLENBQUMsRUFBRUMsV0FBSCxDQUFwQjs7QUFDQSxNQUFJLENBQUNPLEtBQUwsRUFBWTtBQUNSQSxJQUFBQSxLQUFLLEdBQUcsSUFBSVYsS0FBSixDQUFVSyxZQUFWLEVBQXdCQSxZQUF4QixDQUFSOztBQUNBSCxJQUFBQSxRQUFRLENBQUNTLElBQVQsQ0FBY0QsS0FBZDtBQUNIOztBQUNELFNBQU9BLEtBQVA7QUFDSDs7QUFFRCxTQUFTRSxlQUFULEdBQTRCO0FBQ3hCQyxFQUFBQSxtQkFBbUIsQ0FBQ0MsS0FBcEI7QUFDSDs7QUFFRCxJQUFJQyxRQUFRLEdBQUcsS0FBZjtBQUVBOzs7Ozs7QUFLQSxJQUFJRixtQkFBbUIsR0FBRztBQUN0QmIsRUFBQUEsS0FBSyxFQUFFQSxLQURlOztBQUd0Qjs7Ozs7O0FBTUEsTUFBSWdCLE9BQUosR0FBZTtBQUNYLFdBQU9ELFFBQVA7QUFDSCxH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QUFiLEVBQWdCQSxDQUFDLElBQUlqQyxXQUFyQixFQUFrQ2lDLENBQUMsRUFBbkMsRUFBdUM7QUFDbkNsQyxNQUFBQSxRQUFRLENBQUNrQyxDQUFELENBQVIsQ0FBWWdELE1BQVo7QUFDSDtBQUNKO0FBck5xQixDQUExQjtBQXdOQTs7OztBQUlBOzs7OztBQUlBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJwRSxFQUFFLENBQUNMLG1CQUFILEdBQXlCQSxtQkFBMUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBdGxhcyA9IHJlcXVpcmUoJy4vYXRsYXMnKTtcblxubGV0IF9hdGxhc2VzID0gW107XG5sZXQgX2F0bGFzSW5kZXggPSAtMTtcblxubGV0IF9tYXhBdGxhc0NvdW50ID0gNTtcbmxldCBfdGV4dHVyZVNpemUgPSAyMDQ4O1xubGV0IF9tYXhGcmFtZVNpemUgPSA1MTI7XG5sZXQgX3RleHR1cmVCbGVlZGluZyA9IHRydWU7XG5cbmxldCBfZGVidWdOb2RlID0gbnVsbDtcblxuZnVuY3Rpb24gbmV3QXRsYXMgKCkge1xuICAgIGxldCBhdGxhcyA9IF9hdGxhc2VzWysrX2F0bGFzSW5kZXhdXG4gICAgaWYgKCFhdGxhcykge1xuICAgICAgICBhdGxhcyA9IG5ldyBBdGxhcyhfdGV4dHVyZVNpemUsIF90ZXh0dXJlU2l6ZSk7XG4gICAgICAgIF9hdGxhc2VzLnB1c2goYXRsYXMpO1xuICAgIH1cbiAgICByZXR1cm4gYXRsYXM7XG59XG5cbmZ1bmN0aW9uIGJlZm9yZVNjZW5lTG9hZCAoKSB7XG4gICAgZHluYW1pY0F0bGFzTWFuYWdlci5yZXNldCgpO1xufVxuXG5sZXQgX2VuYWJsZWQgPSBmYWxzZTtcblxuLyoqXG4gKiAhI2VuIE1hbmFnZSBEeW5hbWljIEF0bGFzIE1hbmFnZXIuIER5bmFtaWMgQXRsYXMgTWFuYWdlciBpcyB1c2VkIGZvciBtZXJnaW5nIHRleHR1cmVzIGF0IHJ1bnRpbWUsIHNlZSBbRHluYW1pYyBBdGxhc10oaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9hZHZhbmNlZC10b3BpY3MvZHluYW1pYy1hdGxhcy5odG1sKSBmb3IgZGV0YWlscy5cbiAqICEjemgg566h55CG5Yqo5oCB5Zu+6ZuG44CC5Yqo5oCB5Zu+6ZuG55So5LqO5Zyo6L+Q6KGM5pe25a+56LS05Zu+6L+b6KGM5ZCI5bm277yM6K+m6KeBIFvliqjmgIHlkIjlm75dKGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvYWR2YW5jZWQtdG9waWNzL2R5bmFtaWMtYXRsYXMuaHRtbCnjgIJcbiAqIEBjbGFzcyBEeW5hbWljQXRsYXNNYW5hZ2VyXG4gKi9cbmxldCBkeW5hbWljQXRsYXNNYW5hZ2VyID0ge1xuICAgIEF0bGFzOiBBdGxhcyxcbiAgICBcbiAgICAvKipcbiAgICAgKiAhI2VuIEVuYWJsZSBvciBkaXNhYmxlIHRoZSBkeW5hbWljIGF0bGFzLCBzZWUgW0R5bmFtaWMgQXRsYXNdKGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vYWR2YW5jZWQtdG9waWNzL2R5bmFtaWMtYXRsYXMuaHRtbCkgZm9yIGRldGFpbHMuXG4gICAgICogISN6aCDlvIDlkK/miJbogIXlhbPpl63liqjmgIHlm77pm4bvvIzor6bop4EgW+WKqOaAgeWQiOWbvl0oaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9hZHZhbmNlZC10b3BpY3MvZHluYW1pYy1hdGxhcy5odG1sKeOAglxuICAgICAqIEBwcm9wZXJ0eSBlbmFibGVkXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgZ2V0IGVuYWJsZWQgKCkge1xuICAgICAgICByZXR1cm4gX2VuYWJsZWQ7XG4gICAgfSxcbiAgICBzZXQgZW5hYmxlZCAodmFsdWUpIHtcbiAgICAgICAgaWYgKF9lbmFibGVkID09PSB2YWx1ZSkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgY2MuZGlyZWN0b3Iub24oY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX1NDRU5FX0xBVU5DSCwgYmVmb3JlU2NlbmVMb2FkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLm9mZihjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfU0NFTkVfTEFVTkNILCBiZWZvcmVTY2VuZUxvYWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgX2VuYWJsZWQgPSB2YWx1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgbWF4aW11bSBudW1iZXIgb2YgYXRsYXMgdGhhdCBjYW4gYmUgY3JlYXRlZC5cbiAgICAgKiAhI3poIOWPr+S7peWIm+W7uueahOacgOWkp+WbvumbhuaVsOmHj+OAglxuICAgICAqIEBwcm9wZXJ0eSBtYXhBdGxhc0NvdW50XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgbWF4QXRsYXNDb3VudCAoKSB7XG4gICAgICAgIHJldHVybiBfbWF4QXRsYXNDb3VudDtcbiAgICB9LFxuICAgIHNldCBtYXhBdGxhc0NvdW50ICh2YWx1ZSkge1xuICAgICAgICBfbWF4QXRsYXNDb3VudCA9IHZhbHVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIElzIGVuYWJsZSB0ZXh0dXJlQmxlZWRpbmcuXG4gICAgICogISN6aCDmmK/lkKblvIDlkK8gdGV4dHVyZUJsZWVkaW5nXG4gICAgICogQHByb3BlcnR5IHRleHR1cmVCbGVlZGluZ1xuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIGdldCB0ZXh0dXJlQmxlZWRpbmcgKCkge1xuICAgICAgICByZXR1cm4gX3RleHR1cmVCbGVlZGluZztcbiAgICB9LFxuXG4gICAgc2V0IHRleHR1cmVCbGVlZGluZyAoZW5hYmxlKSB7XG4gICAgICAgIF90ZXh0dXJlQmxlZWRpbmcgPSBlbmFibGU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHNpemUgb2YgdGhlIGF0bGFzIHRoYXQgd2FzIGNyZWF0ZWRcbiAgICAgKiAhI3poIOWIm+W7uueahOWbvumbhueahOWuvemrmFxuICAgICAqIEBwcm9wZXJ0eSB0ZXh0dXJlU2l6ZVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0IHRleHR1cmVTaXplICgpIHtcbiAgICAgICAgcmV0dXJuIF90ZXh0dXJlU2l6ZTtcbiAgICB9LFxuICAgIHNldCB0ZXh0dXJlU2l6ZSAodmFsdWUpIHtcbiAgICAgICAgX3RleHR1cmVTaXplID0gdmFsdWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIG1heGltdW0gc2l6ZSBvZiB0aGUgcGljdHVyZSB0aGF0IGNhbiBiZSBhZGRlZCB0byB0aGUgYXRsYXMuXG4gICAgICogISN6aCDlj6/ku6Xmt7vliqDov5vlm77pm4bnmoTlm77niYfnmoTmnIDlpKflsLrlr7jjgIJcbiAgICAgKiBAcHJvcGVydHkgbWF4RnJhbWVTaXplXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgbWF4RnJhbWVTaXplICgpIHtcbiAgICAgICAgcmV0dXJuIF9tYXhGcmFtZVNpemU7XG4gICAgfSxcbiAgICBzZXQgbWF4RnJhbWVTaXplICh2YWx1ZSkge1xuICAgICAgICBfbWF4RnJhbWVTaXplID0gdmFsdWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIG1pbmltdW0gc2l6ZSBvZiB0aGUgcGljdHVyZSB0aGF0IGNhbiBiZSBhZGRlZCB0byB0aGUgYXRsYXMuXG4gICAgICogISN6aCDlj6/ku6Xmt7vliqDov5vlm77pm4bnmoTlm77niYfnmoTmnIDlsI/lsLrlr7jjgIJcbiAgICAgKiBAcHJvcGVydHkgbWluRnJhbWVTaXplXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIFxuICAgIC8qKlxuICAgICAqICEjZW4gQXBwZW5kIGEgc3ByaXRlIGZyYW1lIGludG8gdGhlIGR5bmFtaWMgYXRsYXMuXG4gICAgICogISN6aCDmt7vliqDnoo7lm77ov5vlhaXliqjmgIHlm77pm4bjgIJcbiAgICAgKiBAbWV0aG9kIGluc2VydFNwcml0ZUZyYW1lXG4gICAgICogQHBhcmFtIHtTcHJpdGVGcmFtZX0gc3ByaXRlRnJhbWUgXG4gICAgICovXG4gICAgaW5zZXJ0U3ByaXRlRnJhbWUgKHNwcml0ZUZyYW1lKSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoIV9lbmFibGVkIHx8IF9hdGxhc0luZGV4ID09PSBfbWF4QXRsYXNDb3VudCB8fFxuICAgICAgICAgICAgIXNwcml0ZUZyYW1lIHx8IHNwcml0ZUZyYW1lLl9vcmlnaW5hbCkgcmV0dXJuIG51bGw7XG4gICAgICAgIFxuICAgICAgICBpZiAoIXNwcml0ZUZyYW1lLl90ZXh0dXJlLnBhY2thYmxlKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBsZXQgYXRsYXMgPSBfYXRsYXNlc1tfYXRsYXNJbmRleF07XG4gICAgICAgIGlmICghYXRsYXMpIHtcbiAgICAgICAgICAgIGF0bGFzID0gbmV3QXRsYXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmcmFtZSA9IGF0bGFzLmluc2VydFNwcml0ZUZyYW1lKHNwcml0ZUZyYW1lKTtcbiAgICAgICAgaWYgKCFmcmFtZSAmJiBfYXRsYXNJbmRleCAhPT0gX21heEF0bGFzQ291bnQpIHtcbiAgICAgICAgICAgIGF0bGFzID0gbmV3QXRsYXMoKTtcbiAgICAgICAgICAgIHJldHVybiBhdGxhcy5pbnNlcnRTcHJpdGVGcmFtZShzcHJpdGVGcmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZyYW1lO1xuICAgIH0sXG5cbiAgICAvKiogXG4gICAgICogISNlbiBSZXNldHMgYWxsIGR5bmFtaWMgYXRsYXMsIGFuZCB0aGUgZXhpc3Rpbmcgb25lcyB3aWxsIGJlIGRlc3Ryb3llZC5cbiAgICAgKiAhI3poIOmHjee9ruaJgOacieWKqOaAgeWbvumbhu+8jOW3suacieeahOWKqOaAgeWbvumbhuS8muiiq+mUgOavgeOAglxuICAgICAqIEBtZXRob2QgcmVzZXRcbiAgICAqL1xuICAgIHJlc2V0ICgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBfYXRsYXNlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIF9hdGxhc2VzW2ldLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICBfYXRsYXNlcy5sZW5ndGggPSAwO1xuICAgICAgICBfYXRsYXNJbmRleCA9IC0xO1xuICAgIH0sXG5cbiAgICBkZWxldGVBdGxhc1Nwcml0ZUZyYW1lIChzcHJpdGVGcmFtZSkge1xuICAgICAgICBpZiAoIXNwcml0ZUZyYW1lLl9vcmlnaW5hbCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCB0ZXh0dXJlID0gc3ByaXRlRnJhbWUuX29yaWdpbmFsLl90ZXh0dXJlO1xuICAgICAgICB0aGlzLmRlbGV0ZUF0bGFzVGV4dHVyZSh0ZXh0dXJlKTtcbiAgICB9LFxuXG4gICAgZGVsZXRlQXRsYXNUZXh0dXJlICh0ZXh0dXJlKSB7XG4gICAgICAgIGlmICh0ZXh0dXJlKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gX2F0bGFzZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBfYXRsYXNlc1tpXS5kZWxldGVJbm5lclRleHR1cmUodGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKF9hdGxhc2VzW2ldLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgICAgICBfYXRsYXNlc1tpXS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgICAgIF9hdGxhc2VzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgX2F0bGFzSW5kZXgtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBEaXNwbGF5cyBhbGwgdGhlIGR5bmFtaWMgYXRsYXMgaW4gdGhlIGN1cnJlbnQgc2NlbmUsIHdoaWNoIHlvdSBjYW4gdXNlIHRvIHZpZXcgdGhlIGN1cnJlbnQgYXRsYXMgc3RhdGUuXG4gICAgICogISN6aCDlnKjlvZPliY3lnLrmma/kuK3mmL7npLrmiYDmnInliqjmgIHlm77pm4bvvIzlj6/ku6XnlKjmnaXmn6XnnIvlvZPliY3nmoTlkIjlm77nirbmgIHjgIJcbiAgICAgKiBAbWV0aG9kIHNob3dEZWJ1Z1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gc2hvd1xuICAgICAqIEByZXR1cm4ge05vZGV9XG4gICAgICovXG4gICAgc2hvd0RlYnVnOiBDQ19ERUJVRyAmJiBmdW5jdGlvbiAoc2hvdykge1xuICAgICAgICBpZiAoc2hvdykge1xuICAgICAgICAgICAgaWYgKCFfZGVidWdOb2RlIHx8ICFfZGVidWdOb2RlLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgd2lkdGggPSBjYy52aXNpYmxlUmVjdC53aWR0aDtcbiAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0ID0gY2MudmlzaWJsZVJlY3QuaGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgX2RlYnVnTm9kZSA9IG5ldyBjYy5Ob2RlKCdEWU5BTUlDX0FUTEFTX0RFQlVHX05PREUnKTtcbiAgICAgICAgICAgICAgICBfZGVidWdOb2RlLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICAgICAgX2RlYnVnTm9kZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgICAgICAgICAgX2RlYnVnTm9kZS54ID0gd2lkdGgvMjtcbiAgICAgICAgICAgICAgICBfZGVidWdOb2RlLnkgPSBoZWlnaHQvMjtcbiAgICAgICAgICAgICAgICBfZGVidWdOb2RlLnpJbmRleCA9IGNjLm1hY3JvLk1BWF9aSU5ERVg7XG4gICAgICAgICAgICAgICAgX2RlYnVnTm9kZS5wYXJlbnQgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xuXG4gICAgICAgICAgICAgICAgX2RlYnVnTm9kZS5ncm91cEluZGV4ID0gY2MuTm9kZS5CdWlsdGluR3JvdXBJbmRleC5ERUJVRztcbiAgICAgICAgICAgICAgICBjYy5DYW1lcmEuX3NldHVwRGVidWdDYW1lcmEoKTtcblxuICAgICAgICAgICAgICAgIGxldCBzY3JvbGwgPSBfZGVidWdOb2RlLmFkZENvbXBvbmVudChjYy5TY3JvbGxWaWV3KTtcblxuICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gbmV3IGNjLk5vZGUoJ0NPTlRFTlQnKTtcbiAgICAgICAgICAgICAgICBsZXQgbGF5b3V0ID0gY29udGVudC5hZGRDb21wb25lbnQoY2MuTGF5b3V0KTtcbiAgICAgICAgICAgICAgICBsYXlvdXQudHlwZSA9IGNjLkxheW91dC5UeXBlLlZFUlRJQ0FMO1xuICAgICAgICAgICAgICAgIGxheW91dC5yZXNpemVNb2RlID0gY2MuTGF5b3V0LlJlc2l6ZU1vZGUuQ09OVEFJTkVSO1xuICAgICAgICAgICAgICAgIGNvbnRlbnQucGFyZW50ID0gX2RlYnVnTm9kZTtcbiAgICAgICAgICAgICAgICBjb250ZW50LndpZHRoID0gX3RleHR1cmVTaXplO1xuICAgICAgICAgICAgICAgIGNvbnRlbnQuYW5jaG9yWSA9IDE7XG4gICAgICAgICAgICAgICAgY29udGVudC54ID0gX3RleHR1cmVTaXplO1xuXG4gICAgICAgICAgICAgICAgc2Nyb2xsLmNvbnRlbnQgPSBjb250ZW50O1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gX2F0bGFzSW5kZXg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IG5ldyBjYy5Ob2RlKCdBVExBUycpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRleHR1cmUgPSBfYXRsYXNlc1tpXS5fdGV4dHVyZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZUZyYW1lLnNldFRleHR1cmUoX2F0bGFzZXNbaV0uX3RleHR1cmUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcHJpdGUgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcblxuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IGNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF9kZWJ1Z05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoX2RlYnVnTm9kZSkge1xuICAgICAgICAgICAgICAgIF9kZWJ1Z05vZGUucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBfZGVidWdOb2RlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGUgKCkge1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IF9hdGxhc0luZGV4OyBpKyspIHtcbiAgICAgICAgICAgIF9hdGxhc2VzW2ldLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5cbi8qKlxuICogQG1vZHVsZSBjY1xuICovXG5cbi8qKlxuICogQHByb3BlcnR5IGR5bmFtaWNBdGxhc01hbmFnZXJcbiAqIEB0eXBlIER5bmFtaWNBdGxhc01hbmFnZXJcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBjYy5keW5hbWljQXRsYXNNYW5hZ2VyID0gZHluYW1pY0F0bGFzTWFuYWdlcjsiXSwic291cmNlUm9vdCI6Ii8ifQ==