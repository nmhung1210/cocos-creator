
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/enum.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.TextureMode = exports.TrailMode = exports.ArcMode = exports.EmitLocation = exports.ShapeType = exports.RenderMode = exports.Space = void 0;

var _CCEnum = _interopRequireDefault(require("../../platform/CCEnum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @enum ParticleSystem3DAssembler.Space
 */
var Space = (0, _CCEnum["default"])({
  World: 0,
  Local: 1,
  Custom: 2
});
/**
 * 粒子的生成模式
 * @enum ParticleSystem3DAssembler.RenderMode
 */

exports.Space = Space;
var RenderMode = (0, _CCEnum["default"])({
  /**
   * 粒子始终面向摄像机
   */
  Billboard: 0,

  /**
   * 粒子始终面向摄像机但会根据参数进行拉伸
   */
  StrecthedBillboard: 1,

  /**
   * 粒子始终与 XZ 平面平行
   */
  HorizontalBillboard: 2,

  /**
   * 粒子始终与 Y 轴平行且朝向摄像机
   */
  VerticalBillboard: 3,

  /**
   * 粒子保持模型本身状态
   */
  Mesh: 4
});
/**
 * 粒子发射器类型
 * @enum shapeModule.ShapeType
 */

exports.RenderMode = RenderMode;
var ShapeType = (0, _CCEnum["default"])({
  /**
   * 立方体类型粒子发射器
   * @property {Number} Box
   */
  Box: 0,

  /**
   * 圆形粒子发射器
   * @property {Number} Circle
   */
  Circle: 1,

  /**
   * 圆锥体粒子发射器
   * @property {Number} Cone
   */
  Cone: 2,

  /**
   * 球体粒子发射器
   * @property {Number} Sphere
   */
  Sphere: 3,

  /**
   * 半球体粒子发射器
   * @property {Number} Hemisphere
   */
  Hemisphere: 4
});
/**
 * 粒子从发射器的哪个部位发射
 * @enum shapeModule.EmitLocation
 */

exports.ShapeType = ShapeType;
var EmitLocation = (0, _CCEnum["default"])({
  /**
   * 基础位置发射（仅对 Circle 类型及 Cone 类型的粒子发射器适用）
   * @property {Number} Base
   */
  Base: 0,

  /**
   * 边框位置发射（仅对 Box 类型及 Circle 类型的粒子发射器适用）
   * @property {Number} Edge
   */
  Edge: 1,

  /**
   * 表面位置发射（对所有类型的粒子发射器都适用）
   * @property {Number} Shell
   */
  Shell: 2,

  /**
   * 内部位置发射（对所有类型的粒子发射器都适用）
   * @property {Number} Volume
   */
  Volume: 3
});
/**
 * 粒子在扇形区域的发射方式
 * @enum shapeModule.ArcMode
 */

exports.EmitLocation = EmitLocation;
var ArcMode = (0, _CCEnum["default"])({
  /**
   * 随机位置发射
   * @property {Number} Random
   */
  Random: 0,

  /**
   * 沿某一方向循环发射，每次循环方向相同
   * @property {Number} Loop
   */
  Loop: 1,

  /**
   * 循环发射，每次循环方向相反
   * @property {Number} PingPong
   */
  PingPong: 2
});
/**
 * 选择如何为粒子系统生成轨迹
 * @enum trailModule.TrailMode
 */

exports.ArcMode = ArcMode;
var TrailMode = (0, _CCEnum["default"])({
  /**
   * 粒子模式<bg>
   * 创建一种效果，其中每个粒子在其路径中留下固定的轨迹
   */
  Particles: 0,

  /**
   * 带模式<bg>
   * 根据其生命周期创建连接每个粒子的轨迹带
   */
  Ribbon: 1
});
/**
 * 纹理填充模式
 * @enum trailModule.TextureMode
 */

exports.TrailMode = TrailMode;
var TextureMode = (0, _CCEnum["default"])({
  /**
   * 拉伸填充纹理
   */
  Stretch: 0,

  /**
   * 重复填充纹理
   */
  Repeat: 1
});
exports.TextureMode = TextureMode;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL2VudW0udHMiXSwibmFtZXMiOlsiU3BhY2UiLCJXb3JsZCIsIkxvY2FsIiwiQ3VzdG9tIiwiUmVuZGVyTW9kZSIsIkJpbGxib2FyZCIsIlN0cmVjdGhlZEJpbGxib2FyZCIsIkhvcml6b250YWxCaWxsYm9hcmQiLCJWZXJ0aWNhbEJpbGxib2FyZCIsIk1lc2giLCJTaGFwZVR5cGUiLCJCb3giLCJDaXJjbGUiLCJDb25lIiwiU3BoZXJlIiwiSGVtaXNwaGVyZSIsIkVtaXRMb2NhdGlvbiIsIkJhc2UiLCJFZGdlIiwiU2hlbGwiLCJWb2x1bWUiLCJBcmNNb2RlIiwiUmFuZG9tIiwiTG9vcCIsIlBpbmdQb25nIiwiVHJhaWxNb2RlIiwiUGFydGljbGVzIiwiUmliYm9uIiwiVGV4dHVyZU1vZGUiLCJTdHJldGNoIiwiUmVwZWF0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7O0FBR08sSUFBTUEsS0FBSyxHQUFHLHdCQUFLO0FBQ3RCQyxFQUFBQSxLQUFLLEVBQUUsQ0FEZTtBQUV0QkMsRUFBQUEsS0FBSyxFQUFFLENBRmU7QUFHdEJDLEVBQUFBLE1BQU0sRUFBRTtBQUhjLENBQUwsQ0FBZDtBQU1QOzs7Ozs7QUFJTyxJQUFNQyxVQUFVLEdBQUcsd0JBQUs7QUFFM0I7OztBQUdBQyxFQUFBQSxTQUFTLEVBQUUsQ0FMZ0I7O0FBTzNCOzs7QUFHQUMsRUFBQUEsa0JBQWtCLEVBQUUsQ0FWTzs7QUFZM0I7OztBQUdBQyxFQUFBQSxtQkFBbUIsRUFBRSxDQWZNOztBQWlCM0I7OztBQUdBQyxFQUFBQSxpQkFBaUIsRUFBRSxDQXBCUTs7QUFzQjNCOzs7QUFHQUMsRUFBQUEsSUFBSSxFQUFFO0FBekJxQixDQUFMLENBQW5CO0FBNEJQOzs7Ozs7QUFJTyxJQUFNQyxTQUFTLEdBQUcsd0JBQUs7QUFDMUI7Ozs7QUFJQUMsRUFBQUEsR0FBRyxFQUFFLENBTHFCOztBQU8xQjs7OztBQUlBQyxFQUFBQSxNQUFNLEVBQUUsQ0FYa0I7O0FBYTFCOzs7O0FBSUFDLEVBQUFBLElBQUksRUFBRSxDQWpCb0I7O0FBbUIxQjs7OztBQUlBQyxFQUFBQSxNQUFNLEVBQUUsQ0F2QmtCOztBQXlCMUI7Ozs7QUFJQUMsRUFBQUEsVUFBVSxFQUFFO0FBN0JjLENBQUwsQ0FBbEI7QUFnQ1A7Ozs7OztBQUlPLElBQU1DLFlBQVksR0FBRyx3QkFBSztBQUM3Qjs7OztBQUlBQyxFQUFBQSxJQUFJLEVBQUUsQ0FMdUI7O0FBTzdCOzs7O0FBSUFDLEVBQUFBLElBQUksRUFBRSxDQVh1Qjs7QUFhN0I7Ozs7QUFJQUMsRUFBQUEsS0FBSyxFQUFFLENBakJzQjs7QUFtQjdCOzs7O0FBSUFDLEVBQUFBLE1BQU0sRUFBRTtBQXZCcUIsQ0FBTCxDQUFyQjtBQTBCUDs7Ozs7O0FBSU8sSUFBTUMsT0FBTyxHQUFHLHdCQUFLO0FBQ3hCOzs7O0FBSUFDLEVBQUFBLE1BQU0sRUFBRSxDQUxnQjs7QUFPeEI7Ozs7QUFJQUMsRUFBQUEsSUFBSSxFQUFFLENBWGtCOztBQWF4Qjs7OztBQUlBQyxFQUFBQSxRQUFRLEVBQUU7QUFqQmMsQ0FBTCxDQUFoQjtBQW9CUDs7Ozs7O0FBSU8sSUFBTUMsU0FBUyxHQUFHLHdCQUFLO0FBQzFCOzs7O0FBSUFDLEVBQUFBLFNBQVMsRUFBRSxDQUxlOztBQU8xQjs7OztBQUlBQyxFQUFBQSxNQUFNLEVBQUU7QUFYa0IsQ0FBTCxDQUFsQjtBQWNQOzs7Ozs7QUFJTyxJQUFNQyxXQUFXLEdBQUcsd0JBQUs7QUFDNUI7OztBQUdBQyxFQUFBQSxPQUFPLEVBQUUsQ0FKbUI7O0FBTTVCOzs7QUFHQUMsRUFBQUEsTUFBTSxFQUFFO0FBVG9CLENBQUwsQ0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRW51bSAgZnJvbSAnLi4vLi4vcGxhdGZvcm0vQ0NFbnVtJztcblxuLyoqXG4gKiBAZW51bSBQYXJ0aWNsZVN5c3RlbTNEQXNzZW1ibGVyLlNwYWNlXG4gKi9cbmV4cG9ydCBjb25zdCBTcGFjZSA9IEVudW0oe1xuICAgIFdvcmxkOiAwLFxuICAgIExvY2FsOiAxLFxuICAgIEN1c3RvbTogMixcbn0pO1xuXG4vKipcbiAqIOeykuWtkOeahOeUn+aIkOaooeW8j1xuICogQGVudW0gUGFydGljbGVTeXN0ZW0zREFzc2VtYmxlci5SZW5kZXJNb2RlXG4gKi9cbmV4cG9ydCBjb25zdCBSZW5kZXJNb2RlID0gRW51bSh7XG5cbiAgICAvKipcbiAgICAgKiDnspLlrZDlp4vnu4jpnaLlkJHmkYTlg4/mnLpcbiAgICAgKi9cbiAgICBCaWxsYm9hcmQ6IDAsXG5cbiAgICAvKipcbiAgICAgKiDnspLlrZDlp4vnu4jpnaLlkJHmkYTlg4/mnLrkvYbkvJrmoLnmja7lj4LmlbDov5vooYzmi4nkvLhcbiAgICAgKi9cbiAgICBTdHJlY3RoZWRCaWxsYm9hcmQ6IDEsXG5cbiAgICAvKipcbiAgICAgKiDnspLlrZDlp4vnu4jkuI4gWFog5bmz6Z2i5bmz6KGMXG4gICAgICovXG4gICAgSG9yaXpvbnRhbEJpbGxib2FyZDogMixcblxuICAgIC8qKlxuICAgICAqIOeykuWtkOWni+e7iOS4jiBZIOi9tOW5s+ihjOS4lOacneWQkeaRhOWDj+aculxuICAgICAqL1xuICAgIFZlcnRpY2FsQmlsbGJvYXJkOiAzLFxuXG4gICAgLyoqXG4gICAgICog57KS5a2Q5L+d5oyB5qih5Z6L5pys6Lqr54q25oCBXG4gICAgICovXG4gICAgTWVzaDogNCxcbn0pO1xuXG4vKipcbiAqIOeykuWtkOWPkeWwhOWZqOexu+Wei1xuICogQGVudW0gc2hhcGVNb2R1bGUuU2hhcGVUeXBlXG4gKi9cbmV4cG9ydCBjb25zdCBTaGFwZVR5cGUgPSBFbnVtKHtcbiAgICAvKipcbiAgICAgKiDnq4vmlrnkvZPnsbvlnovnspLlrZDlj5HlsITlmahcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQm94XG4gICAgICovXG4gICAgQm94OiAwLFxuXG4gICAgLyoqXG4gICAgICog5ZyG5b2i57KS5a2Q5Y+R5bCE5ZmoXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IENpcmNsZVxuICAgICAqL1xuICAgIENpcmNsZTogMSxcblxuICAgIC8qKlxuICAgICAqIOWchumUpeS9k+eykuWtkOWPkeWwhOWZqFxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBDb25lXG4gICAgICovXG4gICAgQ29uZTogMixcblxuICAgIC8qKlxuICAgICAqIOeQg+S9k+eykuWtkOWPkeWwhOWZqFxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTcGhlcmVcbiAgICAgKi9cbiAgICBTcGhlcmU6IDMsXG5cbiAgICAvKipcbiAgICAgKiDljYrnkIPkvZPnspLlrZDlj5HlsITlmahcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gSGVtaXNwaGVyZVxuICAgICAqL1xuICAgIEhlbWlzcGhlcmU6IDQsXG59KTtcblxuLyoqXG4gKiDnspLlrZDku47lj5HlsITlmajnmoTlk6rkuKrpg6jkvY3lj5HlsIRcbiAqIEBlbnVtIHNoYXBlTW9kdWxlLkVtaXRMb2NhdGlvblxuICovXG5leHBvcnQgY29uc3QgRW1pdExvY2F0aW9uID0gRW51bSh7XG4gICAgLyoqXG4gICAgICog5Z+656GA5L2N572u5Y+R5bCE77yI5LuF5a+5IENpcmNsZSDnsbvlnovlj4ogQ29uZSDnsbvlnovnmoTnspLlrZDlj5HlsITlmajpgILnlKjvvIlcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQmFzZVxuICAgICAqL1xuICAgIEJhc2U6IDAsXG5cbiAgICAvKipcbiAgICAgKiDovrnmoYbkvY3nva7lj5HlsITvvIjku4Xlr7kgQm94IOexu+Wei+WPiiBDaXJjbGUg57G75Z6L55qE57KS5a2Q5Y+R5bCE5Zmo6YCC55So77yJXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEVkZ2VcbiAgICAgKi9cbiAgICBFZGdlOiAxLFxuXG4gICAgLyoqXG4gICAgICog6KGo6Z2i5L2N572u5Y+R5bCE77yI5a+55omA5pyJ57G75Z6L55qE57KS5a2Q5Y+R5bCE5Zmo6YO96YCC55So77yJXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNoZWxsXG4gICAgICovXG4gICAgU2hlbGw6IDIsXG5cbiAgICAvKipcbiAgICAgKiDlhoXpg6jkvY3nva7lj5HlsITvvIjlr7nmiYDmnInnsbvlnovnmoTnspLlrZDlj5HlsITlmajpg73pgILnlKjvvIlcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gVm9sdW1lXG4gICAgICovXG4gICAgVm9sdW1lOiAzLFxufSk7XG5cbi8qKlxuICog57KS5a2Q5Zyo5omH5b2i5Yy65Z+f55qE5Y+R5bCE5pa55byPXG4gKiBAZW51bSBzaGFwZU1vZHVsZS5BcmNNb2RlXG4gKi9cbmV4cG9ydCBjb25zdCBBcmNNb2RlID0gRW51bSh7XG4gICAgLyoqXG4gICAgICog6ZqP5py65L2N572u5Y+R5bCEXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFJhbmRvbVxuICAgICAqL1xuICAgIFJhbmRvbTogMCxcblxuICAgIC8qKlxuICAgICAqIOayv+afkOS4gOaWueWQkeW+queOr+WPkeWwhO+8jOavj+asoeW+queOr+aWueWQkeebuOWQjFxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBMb29wXG4gICAgICovXG4gICAgTG9vcDogMSxcblxuICAgIC8qKlxuICAgICAqIOW+queOr+WPkeWwhO+8jOavj+asoeW+queOr+aWueWQkeebuOWPjVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQaW5nUG9uZ1xuICAgICAqL1xuICAgIFBpbmdQb25nOiAyLFxufSk7XG5cbi8qKlxuICog6YCJ5oup5aaC5L2V5Li657KS5a2Q57O757uf55Sf5oiQ6L2o6L+5XG4gKiBAZW51bSB0cmFpbE1vZHVsZS5UcmFpbE1vZGVcbiAqL1xuZXhwb3J0IGNvbnN0IFRyYWlsTW9kZSA9IEVudW0oe1xuICAgIC8qKlxuICAgICAqIOeykuWtkOaooeW8jzxiZz5cbiAgICAgKiDliJvlu7rkuIDnp43mlYjmnpzvvIzlhbbkuK3mr4/kuKrnspLlrZDlnKjlhbbot6/lvoTkuK3nlZnkuIvlm7rlrprnmoTovajov7lcbiAgICAgKi9cbiAgICBQYXJ0aWNsZXM6IDAsXG5cbiAgICAvKipcbiAgICAgKiDluKbmqKHlvI88Ymc+XG4gICAgICog5qC55o2u5YW255Sf5ZG95ZGo5pyf5Yib5bu66L+e5o6l5q+P5Liq57KS5a2Q55qE6L2o6L+55bimXG4gICAgICovXG4gICAgUmliYm9uOiAxLFxufSk7XG5cbi8qKlxuICog57q555CG5aGr5YWF5qih5byPXG4gKiBAZW51bSB0cmFpbE1vZHVsZS5UZXh0dXJlTW9kZVxuICovXG5leHBvcnQgY29uc3QgVGV4dHVyZU1vZGUgPSBFbnVtKHtcbiAgICAvKipcbiAgICAgKiDmi4nkvLjloavlhYXnurnnkIZcbiAgICAgKi9cbiAgICBTdHJldGNoOiAwLFxuXG4gICAgLyoqXG4gICAgICog6YeN5aSN5aGr5YWF57q555CGXG4gICAgICovXG4gICAgUmVwZWF0OiAxLFxufSk7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==