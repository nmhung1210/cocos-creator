
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/collider/CCPhysicsPolygonCollider.js';
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
var PTM_RATIO = require('../CCPhysicsTypes').PTM_RATIO;

var PolygonSeparator = require('../CCPolygonSeparator');
/**
 * @class PhysicsPolygonCollider
 * @extends PhysicsCollider
 * @uses Collider.Polygon
 */


var PhysicsPolygonCollider = cc.Class({
  name: 'cc.PhysicsPolygonCollider',
  "extends": cc.PhysicsCollider,
  mixins: [cc.Collider.Polygon],
  editor: {
    menu: CC_EDITOR && 'i18n:MAIN_MENU.component.physics/Collider/Polygon',
    inspector: CC_EDITOR && 'packages://inspector/inspectors/comps/physics/points-base-collider.js',
    requireComponent: cc.RigidBody
  },
  _createShape: function _createShape(scale) {
    var shapes = [];
    var points = this.points; // check if last point equal to first point

    if (points.length > 0 && points[0].equals(points[points.length - 1])) {
      points.length -= 1;
    }

    var polys = PolygonSeparator.ConvexPartition(points);
    var offset = this.offset;

    for (var i = 0; i < polys.length; i++) {
      var poly = polys[i];
      var shape = null,
          vertices = [];
      var firstVertice = null;

      for (var j = 0, l = poly.length; j < l; j++) {
        if (!shape) {
          shape = new b2.PolygonShape();
        }

        var p = poly[j];
        var x = (p.x + offset.x) / PTM_RATIO * scale.x;
        var y = (p.y + offset.y) / PTM_RATIO * scale.y;
        var v = new b2.Vec2(x, y);
        vertices.push(v);

        if (!firstVertice) {
          firstVertice = v;
        }

        if (vertices.length === b2.maxPolygonVertices) {
          shape.Set(vertices, vertices.length);
          shapes.push(shape);
          shape = null;

          if (j < l - 1) {
            vertices = [firstVertice, vertices[vertices.length - 1]];
          }
        }
      }

      if (shape) {
        shape.Set(vertices, vertices.length);
        shapes.push(shape);
      }
    }

    return shapes;
  }
});
cc.PhysicsPolygonCollider = module.exports = PhysicsPolygonCollider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3MvY29sbGlkZXIvQ0NQaHlzaWNzUG9seWdvbkNvbGxpZGVyLmpzIl0sIm5hbWVzIjpbIlBUTV9SQVRJTyIsInJlcXVpcmUiLCJQb2x5Z29uU2VwYXJhdG9yIiwiUGh5c2ljc1BvbHlnb25Db2xsaWRlciIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiUGh5c2ljc0NvbGxpZGVyIiwibWl4aW5zIiwiQ29sbGlkZXIiLCJQb2x5Z29uIiwiZWRpdG9yIiwibWVudSIsIkNDX0VESVRPUiIsImluc3BlY3RvciIsInJlcXVpcmVDb21wb25lbnQiLCJSaWdpZEJvZHkiLCJfY3JlYXRlU2hhcGUiLCJzY2FsZSIsInNoYXBlcyIsInBvaW50cyIsImxlbmd0aCIsImVxdWFscyIsInBvbHlzIiwiQ29udmV4UGFydGl0aW9uIiwib2Zmc2V0IiwiaSIsInBvbHkiLCJzaGFwZSIsInZlcnRpY2VzIiwiZmlyc3RWZXJ0aWNlIiwiaiIsImwiLCJiMiIsIlBvbHlnb25TaGFwZSIsInAiLCJ4IiwieSIsInYiLCJWZWMyIiwicHVzaCIsIm1heFBvbHlnb25WZXJ0aWNlcyIsIlNldCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxtQkFBRCxDQUFQLENBQTZCRCxTQUE3Qzs7QUFDQSxJQUFJRSxnQkFBZ0IsR0FBR0QsT0FBTyxDQUFDLHVCQUFELENBQTlCO0FBRUE7Ozs7Ozs7QUFLQSxJQUFJRSxzQkFBc0IsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDbENDLEVBQUFBLElBQUksRUFBRSwyQkFENEI7QUFFbEMsYUFBU0YsRUFBRSxDQUFDRyxlQUZzQjtBQUdsQ0MsRUFBQUEsTUFBTSxFQUFFLENBQUNKLEVBQUUsQ0FBQ0ssUUFBSCxDQUFZQyxPQUFiLENBSDBCO0FBS2xDQyxFQUFB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QUFBQSxNQUFNLENBQUNxQixJQUFQLENBQVlaLEtBQVo7QUFDSDtBQUNKOztBQUVELFdBQU9ULE1BQVA7QUFDSDtBQS9EaUMsQ0FBVCxDQUE3QjtBQWtFQWYsRUFBRSxDQUFDRCxzQkFBSCxHQUE0QndDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnpDLHNCQUE3QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiBcbnZhciBQVE1fUkFUSU8gPSByZXF1aXJlKCcuLi9DQ1BoeXNpY3NUeXBlcycpLlBUTV9SQVRJTztcbnZhciBQb2x5Z29uU2VwYXJhdG9yID0gcmVxdWlyZSgnLi4vQ0NQb2x5Z29uU2VwYXJhdG9yJyk7XG5cbi8qKlxuICogQGNsYXNzIFBoeXNpY3NQb2x5Z29uQ29sbGlkZXJcbiAqIEBleHRlbmRzIFBoeXNpY3NDb2xsaWRlclxuICogQHVzZXMgQ29sbGlkZXIuUG9seWdvblxuICovXG52YXIgUGh5c2ljc1BvbHlnb25Db2xsaWRlciA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuUGh5c2ljc1BvbHlnb25Db2xsaWRlcicsXG4gICAgZXh0ZW5kczogY2MuUGh5c2ljc0NvbGxpZGVyLFxuICAgIG1peGluczogW2NjLkNvbGxpZGVyLlBvbHlnb25dLFxuXG4gICAgZWRpdG9yOiB7XG4gICAgICAgIG1lbnU6IENDX0VESVRPUiAmJiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnBoeXNpY3MvQ29sbGlkZXIvUG9seWdvbicsXG4gICAgICAgIGluc3BlY3RvcjogQ0NfRURJVE9SICYmICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3BoeXNpY3MvcG9pbnRzLWJhc2UtY29sbGlkZXIuanMnLFxuICAgICAgICByZXF1aXJlQ29tcG9uZW50OiBjYy5SaWdpZEJvZHlcbiAgICB9LFxuXG4gICAgX2NyZWF0ZVNoYXBlOiBmdW5jdGlvbiAoc2NhbGUpIHtcbiAgICAgICAgdmFyIHNoYXBlcyA9IFtdO1xuXG4gICAgICAgIHZhciBwb2ludHMgPSB0aGlzLnBvaW50cztcbiAgICAgICAgXG4gICAgICAgIC8vIGNoZWNrIGlmIGxhc3QgcG9pbnQgZXF1YWwgdG8gZmlyc3QgcG9pbnRcbiAgICAgICAgaWYgKHBvaW50cy5sZW5ndGggPiAwICYmIHBvaW50c1swXS5lcXVhbHMocG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSkpIHtcbiAgICAgICAgICAgIHBvaW50cy5sZW5ndGggLT0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwb2x5cyA9IFBvbHlnb25TZXBhcmF0b3IuQ29udmV4UGFydGl0aW9uKHBvaW50cyk7XG4gICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLm9mZnNldDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvbHlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcG9seSA9IHBvbHlzW2ldO1xuXG4gICAgICAgICAgICB2YXIgc2hhcGUgPSBudWxsLCB2ZXJ0aWNlcyA9IFtdO1xuICAgICAgICAgICAgdmFyIGZpcnN0VmVydGljZSA9IG51bGw7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBsID0gcG9seS5sZW5ndGg7IGogPCBsOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNoYXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlID0gbmV3IGIyLlBvbHlnb25TaGFwZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgcCA9IHBvbHlbal07XG4gICAgICAgICAgICAgICAgdmFyIHggPSAocC54ICsgb2Zmc2V0LngpL1BUTV9SQVRJTypzY2FsZS54O1xuICAgICAgICAgICAgICAgIHZhciB5ID0gKHAueSArIG9mZnNldC55KS9QVE1fUkFUSU8qc2NhbGUueTtcbiAgICAgICAgICAgICAgICB2YXIgdiA9IG5ldyBiMi5WZWMyKHgsIHkpO1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLnB1c2goIHYgKTtcblxuICAgICAgICAgICAgICAgIGlmICghZmlyc3RWZXJ0aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0VmVydGljZSA9IHY7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHZlcnRpY2VzLmxlbmd0aCA9PT0gYjIubWF4UG9seWdvblZlcnRpY2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLlNldCh2ZXJ0aWNlcywgdmVydGljZXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGVzLnB1c2goc2hhcGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaiA8IGwgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNlcyA9IFtmaXJzdFZlcnRpY2UsIHZlcnRpY2VzW3ZlcnRpY2VzLmxlbmd0aCAtIDFdXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNoYXBlKSB7XG4gICAgICAgICAgICAgICAgc2hhcGUuU2V0KHZlcnRpY2VzLCB2ZXJ0aWNlcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHNoYXBlcy5wdXNoKHNoYXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzaGFwZXM7XG4gICAgfVxufSk7XG5cbmNjLlBoeXNpY3NQb2x5Z29uQ29sbGlkZXIgPSBtb2R1bGUuZXhwb3J0cyA9IFBoeXNpY3NQb2x5Z29uQ29sbGlkZXI7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==