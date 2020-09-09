
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/collider/CCCollisionManager.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _vec = _interopRequireDefault(require("../value-types/vec2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
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
var Contact = require('./CCContact');

var CollisionType = Contact.CollisionType;

var NodeEvent = require('../CCNode').EventType;

var _vec2 = new _vec["default"]();

function obbApplyMatrix(rect, mat4, out_bl, out_tl, out_tr, out_br) {
  var x = rect.x;
  var y = rect.y;
  var width = rect.width;
  var height = rect.height;
  var mat4m = mat4.m;
  var m00 = mat4m[0],
      m01 = mat4m[1],
      m04 = mat4m[4],
      m05 = mat4m[5];
  var m12 = mat4m[12],
      m13 = mat4m[13];
  var tx = m00 * x + m04 * y + m12;
  var ty = m01 * x + m05 * y + m13;
  var xa = m00 * width;
  var xb = m01 * width;
  var yc = m04 * height;
  var yd = m05 * height;
  out_tl.x = tx;
  out_tl.y = ty;
  out_tr.x = xa + tx;
  out_tr.y = xb + ty;
  out_bl.x = yc + tx;
  out_bl.y = yd + ty;
  out_br.x = xa + yc + tx;
  out_br.y = xb + yd + ty;
}
/**
 * !#en
 * Collider Info.
 * !#zh
 * 碰撞体信息。
 * @class ColliderInfo
 */

/**
 * !#en
 * Collider aabb information of last frame
 * !#zh
 * 碰撞体上一帧的 aabb 信息
 * @property {Rect} preAabb
 */

/**
 * !#en
 * Collider aabb information of current frame
 * !#zh
 * 碰撞体当前帧的 aabb 信息
 * @property {Rect} aabb
 */

/**
 * !#en
 * Collider matrix
 * !#zh
 * 碰撞体的矩阵信息
 * @property {Mat4} matrix
 */

/**
 * !#en
 * Collider radius (for CircleCollider)
 * !#zh
 * 碰撞体的半径（只对 CircleCollider 有效）
 * @property {Number} radius
 */

/**
 * !#en
 * Collider position (for CircleCollider)
 * !#zh
 * 碰撞体的位置（只对 CircleCollider 有效）
 * @property {Vec2} position
 */

/**
* !#en
 * Collider points (for BoxCollider and PolygonCollider)
 * !#zh
 * 碰撞体的顶点信息（只对 BoxCollider 和 PolygonCollider 有效）
 * @property {Vec2[]} points
 */

/**
 * !#en
 * A simple collision manager class. 
 * It will calculate whether the collider collides other colliders, if collides then call the callbacks.
 * !#zh
 * 一个简单的碰撞组件管理类，用于处理节点之间的碰撞组件是否产生了碰撞，并调用相应回调函数。
 *
 * @class CollisionManager
 * @uses EventTarget
 * @example
 *
 * // Get the collision manager.
 * let manager = cc.director.getCollisionManager();
 *
 * // Enabled the colider manager.
 * manager.enabled = true;
 *
 * // Enabled draw collider
 * manager.enabledDebugDraw = true;
 *
 * // Enabled draw collider bounding box
 * manager.enabledDrawBoundingBox = true;
 *
 * 
 * // Collision callback
 * onCollisionEnter: function (other, self) {
 *     this.node.color = cc.Color.RED;
 *     this.touchingNumber ++;
 *
 *     // let world = self.world;
 *     // let aabb = world.aabb;
 *     // let preAabb = world.preAabb;
 *     // let m = world.matrix;
 *
 *     // for circle collider
 *     // let r = world.radius;
 *     // let p = world.position;
 *
 *     // for box collider and polygon collider
 *     // let ps = world.points;
 * },
 *   
 * onCollisionStay: function (other, self) {
 *     console.log('on collision stay');
 * },
 *   
 * onCollisionExit: function (other, self) {
 *     this.touchingNumber --;
 *     if (this.touchingNumber === 0) {
 *         this.node.color = cc.Color.WHITE;
 *     }
 * }
 */


var CollisionManager = cc.Class({
  mixins: [cc.EventTarget],
  properties: {
    /**
     * !#en
     * !#zh
     * 是否开启碰撞管理，默认为不开启
     * @property {Boolean} enabled
     * @default false
     */
    enabled: false,

    /**
     * !#en
     * !#zh
     * 是否绘制碰撞组件的包围盒，默认为不绘制
     * @property {Boolean} enabledDrawBoundingBox
     * @default false
     */
    enabledDrawBoundingBox: false
  },
  ctor: function ctor() {
    this._contacts = [];
    this._colliders = [];
    this._debugDrawer = null;
    this._enabledDebugDraw = false;
    cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
  },
  update: function update(dt) {
    if (!this.enabled) {
      return;
    }

    var i, l; // update collider

    var colliders = this._colliders;

    for (i = 0, l = colliders.length; i < l; i++) {
      this.updateCollider(colliders[i]);
    } // do collide


    var contacts = this._contacts;
    var results = [];

    for (i = 0, l = contacts.length; i < l; i++) {
      var collisionType = contacts[i].updateState();

      if (collisionType === CollisionType.None) {
        continue;
      }

      results.push([collisionType, contacts[i]]);
    } // handle collide results, emit message


    for (i = 0, l = results.length; i < l; i++) {
      var result = results[i];

      this._doCollide(result[0], result[1]);
    } // draw colliders


    this.drawColliders();
  },
  _doCollide: function _doCollide(collisionType, contact) {
    var contactFunc;

    switch (collisionType) {
      case CollisionType.CollisionEnter:
        contactFunc = 'onCollisionEnter';
        break;

      case CollisionType.CollisionStay:
        contactFunc = 'onCollisionStay';
        break;

      case CollisionType.CollisionExit:
        contactFunc = 'onCollisionExit';
        break;
    }

    var collider1 = contact.collider1;
    var collider2 = contact.collider2;
    var comps1 = collider1.node._components;
    var comps2 = collider2.node._components;
    var i, l, comp;

    for (i = 0, l = comps1.length; i < l; i++) {
      comp = comps1[i];

      if (comp[contactFunc]) {
        comp[contactFunc](collider2, collider1);
      }
    }

    for (i = 0, l = comps2.length; i < l; i++) {
      comp = comps2[i];

      if (comp[contactFunc]) {
        comp[contactFunc](collider1, collider2);
      }
    }
  },
  shouldCollide: function shouldCollide(c1, c2) {
    var node1 = c1.node,
        node2 = c2.node;
    var collisionMatrix = cc.game.collisionMatrix;
    return node1 !== node2 && collisionMatrix[node1.groupIndex][node2.groupIndex];
  },
  initCollider: function initCollider(collider) {
    if (!collider.world) {
      var world = collider.world = {};
      world.aabb = cc.rect();
      world.preAabb = cc.rect();
      world.matrix = cc.mat4();
      world.radius = 0;

      if (collider instanceof cc.BoxCollider) {
        world.position = null;
        world.points = [cc.v2(), cc.v2(), cc.v2(), cc.v2()];
      } else if (collider instanceof cc.PolygonCollider) {
        world.position = null;
        world.points = collider.points.map(function (p) {
          return cc.v2(p.x, p.y);
        });
      } else if (collider instanceof cc.CircleCollider) {
        world.position = cc.v2();
        world.points = null;
      }
    }
  },
  updateCollider: function updateCollider(collider) {
    var offset = collider.offset;
    var world = collider.world;
    var aabb = world.aabb;
    var m = world.matrix;
    collider.node.getWorldMatrix(m);
    var preAabb = world.preAabb;
    preAabb.x = aabb.x;
    preAabb.y = aabb.y;
    preAabb.width = aabb.width;
    preAabb.height = aabb.height;

    if (collider instanceof cc.BoxCollider) {
      var size = collider.size;
      aabb.x = offset.x - size.width / 2;
      aabb.y = offset.y - size.height / 2;
      aabb.width = size.width;
      aabb.height = size.height;
      var wps = world.points;
      var wp0 = wps[0],
          wp1 = wps[1],
          wp2 = wps[2],
          wp3 = wps[3];
      obbApplyMatrix(aabb, m, wp0, wp1, wp2, wp3);
      var minx = Math.min(wp0.x, wp1.x, wp2.x, wp3.x);
      var miny = Math.min(wp0.y, wp1.y, wp2.y, wp3.y);
      var maxx = Math.max(wp0.x, wp1.x, wp2.x, wp3.x);
      var maxy = Math.max(wp0.y, wp1.y, wp2.y, wp3.y);
      aabb.x = minx;
      aabb.y = miny;
      aabb.width = maxx - minx;
      aabb.height = maxy - miny;
    } else if (collider instanceof cc.CircleCollider) {
      // calculate world position
      _vec["default"].transformMat4(_vec2, collider.offset, m);

      world.position.x = _vec2.x;
      world.position.y = _vec2.y; // calculate world radius

      var mm = m.m;
      var tempx = mm[12],
          tempy = mm[13];
      mm[12] = mm[13] = 0;
      _vec2.x = collider.radius;
      _vec2.y = 0;

      _vec["default"].transformMat4(_vec2, _vec2, m);

      var d = Math.sqrt(_vec2.x * _vec2.x + _vec2.y * _vec2.y);
      world.radius = d;
      aabb.x = world.position.x - d;
      aabb.y = world.position.y - d;
      aabb.width = d * 2;
      aabb.height = d * 2;
      mm[12] = tempx;
      mm[13] = tempy;
    } else if (collider instanceof cc.PolygonCollider) {
      var points = collider.points;
      var worldPoints = world.points;
      worldPoints.length = points.length;

      var _minx = 1e6,
          _miny = 1e6,
          _maxx = -1e6,
          _maxy = -1e6;

      for (var i = 0, l = points.length; i < l; i++) {
        if (!worldPoints[i]) {
          worldPoints[i] = cc.v2();
        }

        _vec2.x = points[i].x + offset.x;
        _vec2.y = points[i].y + offset.y;

        _vec["default"].transformMat4(_vec2, _vec2, m);

        var x = _vec2.x;
        var y = _vec2.y;
        worldPoints[i].x = x;
        worldPoints[i].y = y;
        if (x > _maxx) _maxx = x;
        if (x < _minx) _minx = x;
        if (y > _maxy) _maxy = y;
        if (y < _miny) _miny = y;
      }

      aabb.x = _minx;
      aabb.y = _miny;
      aabb.width = _maxx - _minx;
      aabb.height = _maxy - _miny;
    }
  },
  addCollider: function addCollider(collider) {
    var colliders = this._colliders;
    var index = colliders.indexOf(collider);

    if (index === -1) {
      for (var i = 0, l = colliders.length; i < l; i++) {
        var other = colliders[i];

        if (this.shouldCollide(collider, other)) {
          var contact = new Contact(collider, other);

          this._contacts.push(contact);
        }
      }

      colliders.push(collider);
      this.initCollider(collider);
    }

    collider.node.on(NodeEvent.GROUP_CHANGED, this.onNodeGroupChanged, this);
  },
  removeCollider: function removeCollider(collider) {
    var colliders = this._colliders;
    var index = colliders.indexOf(collider);

    if (index >= 0) {
      colliders.splice(index, 1);
      var contacts = this._contacts;

      for (var i = contacts.length - 1; i >= 0; i--) {
        var contact = contacts[i];

        if (contact.collider1 === collider || contact.collider2 === collider) {
          if (contact.touching) {
            this._doCollide(CollisionType.CollisionExit, contact);
          }

          contacts.splice(i, 1);
        }
      }

      collider.node.off(NodeEvent.GROUP_CHANGED, this.onNodeGroupChanged, this);
    } else {
      cc.errorID(6600);
    }
  },
  onNodeGroupChanged: function onNodeGroupChanged(node) {
    var colliders = node.getComponents(cc.Collider);

    for (var i = 0, l = colliders.length; i < l; i++) {
      var collider = colliders[i];

      if (cc.PhysicsCollider && collider instanceof cc.PhysicsCollider) {
        continue;
      }

      this.removeCollider(collider);
      this.addCollider(collider);
    }
  },
  drawColliders: function drawColliders() {
    if (!this._enabledDebugDraw) {
      return;
    }

    this._checkDebugDrawValid();

    var debugDrawer = this._debugDrawer;
    debugDrawer.clear();
    var colliders = this._colliders;

    for (var i = 0, l = colliders.length; i < l; i++) {
      var collider = colliders[i];
      debugDrawer.strokeColor = cc.Color.WHITE;

      if (collider instanceof cc.BoxCollider || collider instanceof cc.PolygonCollider) {
        var ps = collider.world.points;

        if (ps.length > 0) {
          debugDrawer.moveTo(ps[0].x, ps[0].y);

          for (var j = 1; j < ps.length; j++) {
            debugDrawer.lineTo(ps[j].x, ps[j].y);
          }

          debugDrawer.close();
          debugDrawer.stroke();
        }
      } else if (collider instanceof cc.CircleCollider) {
        debugDrawer.circle(collider.world.position.x, collider.world.position.y, collider.world.radius);
        debugDrawer.stroke();
      }

      if (this.enabledDrawBoundingBox) {
        var aabb = collider.world.aabb;
        debugDrawer.strokeColor = cc.Color.BLUE;
        debugDrawer.moveTo(aabb.xMin, aabb.yMin);
        debugDrawer.lineTo(aabb.xMin, aabb.yMax);
        debugDrawer.lineTo(aabb.xMax, aabb.yMax);
        debugDrawer.lineTo(aabb.xMax, aabb.yMin);
        debugDrawer.close();
        debugDrawer.stroke();
      }
    }
  },
  _checkDebugDrawValid: function _checkDebugDrawValid() {
    if (!this._debugDrawer || !this._debugDrawer.isValid) {
      var node = new cc.Node('COLLISION_MANAGER_DEBUG_DRAW');
      node.zIndex = cc.macro.MAX_ZINDEX;
      cc.game.addPersistRootNode(node);
      this._debugDrawer = node.addComponent(cc.Graphics);
    }
  }
});
/**
 * !#en
 * !#zh
 * 是否绘制碰撞组件的形状，默认为不绘制
 * @property {Boolean} enabledDebugDraw
 * @default false
 */

cc.js.getset(CollisionManager.prototype, 'enabledDebugDraw', function () {
  return this._enabledDebugDraw;
}, function (value) {
  if (value && !this._enabledDebugDraw) {
    this._checkDebugDrawValid();

    this._debugDrawer.node.active = true;
  } else if (!value && this._enabledDebugDraw) {
    this._debugDrawer.clear(true);

    this._debugDrawer.node.active = false;
  }

  this._enabledDebugDraw = value;
});
cc.CollisionManager = module.exports = CollisionManager;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbGxpZGVyL0NDQ29sbGlzaW9uTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJDb250YWN0IiwicmVxdWlyZSIsIkNvbGxpc2lvblR5cGUiLCJOb2RlRXZlbnQiLCJFdmVudFR5cGUiLCJfdmVjMiIsIlZlYzIiLCJvYmJBcHBseU1hdHJpeCIsInJlY3QiLCJtYXQ0Iiwib3V0X2JsIiwib3V0X3RsIiwib3V0X3RyIiwib3V0X2JyIiwieCIsInkiLCJ3aWR0aCIsImhlaWdodCIsIm1hdDRtIiwibSIsIm0wMCIsIm0wMSIsIm0wNCIsIm0wNSIsIm0xMiIsIm0xMyIsInR4IiwidHkiLCJ4YSIsInhiIiwieWMiLCJ5ZCIsIkNvbGxpc2lvbk1hbmFnZXIiLCJjYyIsIkNsYXNzIiwibWl4aW5zIiwiRXZlbnRUYXJnZXQiLCJwcm9wZXJ0aWVzIiwiZW5hYmxlZCIsImVuYWJsZWREcmF3Qm91bmRpbmdCb3giLCJjdG9yIiwiX2NvbnRhY3RzIiwiX2NvbGxpZGVycyIsIl9kZWJ1Z0RyYXdlciIsIl9lbmFibGVkRGVidWdEcmF3IiwiZGlyZWN0b3IiLCJfc2NoZWR1bGVyIiwiZW5hYmxlRm9yVGFyZ2V0IiwidXBkYXRlIiwiZHQiLCJpIiwibCIsImNvbGxpZGVycyIsImxlbmd0aCIsInVwZGF0ZUNvbGxpZGVyIiwiY29udGFjdHMiLCJyZXN1bHRzIiwiY29sbGlzaW9uVHlwZSIsInVwZGF0ZVN0YXRlIiwiTm9uZSIsInB1c2giLCJyZXN1bHQiLCJfZG9Db2xsaWRlIiwiZHJhd0NvbGxpZGVycyIsImNvbnRhY3QiLCJjb250YWN0RnVuYyIsIkNvbGxpc2lvbkVudGVyIiwiQ29sbGlzaW9uU3RheSIsIkNvbGxpc2lvbkV4aXQiLCJjb2xsaWRlcjEiLCJjb2xsaWRlcjIiLCJjb21wczEiLCJub2RlIiwiX2NvbXBvbmVudHMiLCJjb21wczIiLCJjb21wIiwic2hvdWxkQ29sbGlkZSIsImMxIiwiYzIiLCJub2RlMSIsIm5vZGUyIiwiY29sbGlzaW9uTWF0cml4IiwiZ2FtZSIsImdyb3VwSW5kZXgiLCJpbml0Q29sbGlkZXIiLCJjb2xsaWRlciIsIndvcmxkIiwiYWFiYiIsInByZUFhYmIiLCJtYXRyaXgiLCJyYWRpdXMiLCJCb3hDb2xsaWRlciIsInBvc2l0aW9uIiwicG9pbnRzIiwidjIiLCJQb2x5Z29uQ29sbGlkZXIiLCJtYXAiLCJwIiwiQ2lyY2xlQ29sbGlkZXIiLCJvZmZzZXQiLCJnZXRXb3JsZE1hdHJpeCIsInNpemUiLCJ3cHMiLCJ3cDAiLCJ3cDEiLCJ3cDIiLCJ3cDMiLCJtaW54IiwiTWF0aCIsIm1pbiIsIm1pbnkiLCJtYXh4IiwibWF4IiwibWF4eSIsInRyYW5zZm9ybU1hdDQiLCJtbSIsInRlbXB4IiwidGVtcHkiLCJkIiwic3FydCIsIndvcmxkUG9pbnRzIiwiYWRkQ29sbGlkZXIiLCJpbmRleCIsImluZGV4T2YiLCJvdGhlciIsIm9uIiwiR1JPVVBfQ0hBTkdFRCIsIm9uTm9kZUdyb3VwQ2hhbmdlZCIsInJlbW92ZUNvbGxpZGVyIiwic3BsaWNlIiwidG91Y2hpbmciLCJvZmYiLCJlcnJvcklEIiwiZ2V0Q29tcG9uZW50cyIsIkNvbGxpZGVyIiwiUGh5c2ljc0NvbGxpZGVyIiwiX2NoZWNrRGVidWdEcmF3VmFsaWQiLCJkZWJ1Z0RyYXdlciIsImNsZWFyIiwic3Ryb2tlQ29sb3IiLCJDb2xvciIsIldISVRFIiwicHMiLCJtb3ZlVG8iLCJqIiwibGluZVRvIiwiY2xvc2UiLCJzdHJva2UiLCJjaXJjbGUiLCJCTFVFIiwieE1pbiIsInlNaW4iLCJ5TWF4IiwieE1heCIsImlzVmFsaWQiLCJOb2RlIiwiekluZGV4IiwibWFjcm8iLCJNQVhfWklOREVYIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwiYWRkQ29tcG9uZW50IiwiR3JhcGhpY3MiLCJqcyIsImdldHNldCIsInByb3RvdHlwZSIsInZhbHVlIiwiYWN0aXZlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQXlCQTs7OztBQXpCQTs7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LG9CQUFMOztBQUNBLFNBQUs3RixZQUFMLENBQWtCNkIsSUFBbEIsQ0FBdUI4RixNQUF2QixHQUFnQyxJQUFoQztBQUNILEdBSEQsTUFJSyxJQUFJLENBQUNELEtBQUQsSUFBVSxLQUFLekgsaUJBQW5CLEVBQXNDO0FBQ3ZDLFNBQUtELFlBQUwsQ0FBa0IrRixLQUFsQixDQUF3QixJQUF4Qjs7QUFDQSxTQUFLL0YsWUFBTCxDQUFrQjZCLElBQWxCLENBQXVCOEYsTUFBdkIsR0FBZ0MsS0FBaEM7QUFDSDs7QUFFRCxPQUFLMUgsaUJBQUwsR0FBeUJ5SCxLQUF6QjtBQUNILENBZkw7QUFtQkFwSSxFQUFFLENBQUNELGdCQUFILEdBQXNCdUksTUFBTSxDQUFDQyxPQUFQLEdBQWlCeEksZ0JBQXZDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IFZlYzIgZnJvbSAnLi4vdmFsdWUtdHlwZXMvdmVjMic7XG5cbmNvbnN0IENvbnRhY3QgPSByZXF1aXJlKCcuL0NDQ29udGFjdCcpO1xuY29uc3QgQ29sbGlzaW9uVHlwZSA9IENvbnRhY3QuQ29sbGlzaW9uVHlwZTtcbmNvbnN0IE5vZGVFdmVudCA9IHJlcXVpcmUoJy4uL0NDTm9kZScpLkV2ZW50VHlwZTtcblxubGV0IF92ZWMyID0gbmV3IFZlYzIoKTtcblxuZnVuY3Rpb24gb2JiQXBwbHlNYXRyaXggKHJlY3QsIG1hdDQsIG91dF9ibCwgb3V0X3RsLCBvdXRfdHIsIG91dF9icikge1xuICAgIGxldCB4ID0gcmVjdC54O1xuICAgIGxldCB5ID0gcmVjdC55O1xuICAgIGxldCB3aWR0aCA9IHJlY3Qud2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHJlY3QuaGVpZ2h0O1xuXG4gICAgbGV0IG1hdDRtID0gbWF0NC5tO1xuICAgIGxldCBtMDAgPSBtYXQ0bVswXSwgbTAxID0gbWF0NG1bMV0sIG0wNCA9IG1hdDRtWzRdLCBtMDUgPSBtYXQ0bVs1XTtcbiAgICBsZXQgbTEyID0gbWF0NG1bMTJdLCBtMTMgPSBtYXQ0bVsxM107XG5cbiAgICBsZXQgdHggPSBtMDAgKiB4ICsgbTA0ICogeSArIG0xMjtcbiAgICBsZXQgdHkgPSBtMDEgKiB4ICsgbTA1ICogeSArIG0xMztcbiAgICBsZXQgeGEgPSBtMDAgKiB3aWR0aDtcbiAgICBsZXQgeGIgPSBtMDEgKiB3aWR0aDtcbiAgICBsZXQgeWMgPSBtMDQgKiBoZWlnaHQ7XG4gICAgbGV0IHlkID0gbTA1ICogaGVpZ2h0O1xuXG4gICAgb3V0X3RsLnggPSB0eDtcbiAgICBvdXRfdGwueSA9IHR5O1xuICAgIG91dF90ci54ID0geGEgKyB0eDtcbiAgICBvdXRfdHIueSA9IHhiICsgdHk7XG4gICAgb3V0X2JsLnggPSB5YyArIHR4O1xuICAgIG91dF9ibC55ID0geWQgKyB0eTtcbiAgICBvdXRfYnIueCA9IHhhICsgeWMgKyB0eDtcbiAgICBvdXRfYnIueSA9IHhiICsgeWQgKyB0eTtcbn1cblxuLyoqXG4gKiAhI2VuXG4gKiBDb2xsaWRlciBJbmZvLlxuICogISN6aFxuICog56Kw5pKe5L2T5L+h5oGv44CCXG4gKiBAY2xhc3MgQ29sbGlkZXJJbmZvXG4gKi9cbi8qKlxuICogISNlblxuICogQ29sbGlkZXIgYWFiYiBpbmZvcm1hdGlvbiBvZiBsYXN0IGZyYW1lXG4gKiAhI3poXG4gKiDnorDmkp7kvZPkuIrkuIDluKfnmoQgYWFiYiDkv6Hmga9cbiAqIEBwcm9wZXJ0eSB7UmVjdH0gcHJlQWFiYlxuICovXG4vKipcbiAqICEjZW5cbiAqIENvbGxpZGVyIGFhYmIgaW5mb3JtYXRpb24gb2YgY3VycmVudCBmcmFtZVxuICogISN6aFxuICog56Kw5pKe5L2T5b2T5YmN5bin55qEIGFhYmIg5L+h5oGvXG4gKiBAcHJvcGVydHkge1JlY3R9IGFhYmJcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBDb2xsaWRlciBtYXRyaXhcbiAqICEjemhcbiAqIOeisOaSnuS9k+eahOefqemYteS/oeaBr1xuICogQHByb3BlcnR5IHtNYXQ0fSBtYXRyaXhcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBDb2xsaWRlciByYWRpdXMgKGZvciBDaXJjbGVDb2xsaWRlcilcbiAqICEjemhcbiAqIOeisOaSnuS9k+eahOWNiuW+hO+8iOWPquWvuSBDaXJjbGVDb2xsaWRlciDmnInmlYjvvIlcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByYWRpdXNcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBDb2xsaWRlciBwb3NpdGlvbiAoZm9yIENpcmNsZUNvbGxpZGVyKVxuICogISN6aFxuICog56Kw5pKe5L2T55qE5L2N572u77yI5Y+q5a+5IENpcmNsZUNvbGxpZGVyIOacieaViO+8iVxuICogQHByb3BlcnR5IHtWZWMyfSBwb3NpdGlvblxuICovXG4vKipcbiogISNlblxuICogQ29sbGlkZXIgcG9pbnRzIChmb3IgQm94Q29sbGlkZXIgYW5kIFBvbHlnb25Db2xsaWRlcilcbiAqICEjemhcbiAqIOeisOaSnuS9k+eahOmhtueCueS/oeaBr++8iOWPquWvuSBCb3hDb2xsaWRlciDlkowgUG9seWdvbkNvbGxpZGVyIOacieaViO+8iVxuICogQHByb3BlcnR5IHtWZWMyW119IHBvaW50c1xuICovXG5cblxuXG4vKipcbiAqICEjZW5cbiAqIEEgc2ltcGxlIGNvbGxpc2lvbiBtYW5hZ2VyIGNsYXNzLiBcbiAqIEl0IHdpbGwgY2FsY3VsYXRlIHdoZXRoZXIgdGhlIGNvbGxpZGVyIGNvbGxpZGVzIG90aGVyIGNvbGxpZGVycywgaWYgY29sbGlkZXMgdGhlbiBjYWxsIHRoZSBjYWxsYmFja3MuXG4gKiAhI3poXG4gKiDkuIDkuKrnroDljZXnmoTnorDmkp7nu4Tku7bnrqHnkIbnsbvvvIznlKjkuo7lpITnkIboioLngrnkuYvpl7TnmoTnorDmkp7nu4Tku7bmmK/lkKbkuqfnlJ/kuobnorDmkp7vvIzlubbosIPnlKjnm7jlupTlm57osIPlh73mlbDjgIJcbiAqXG4gKiBAY2xhc3MgQ29sbGlzaW9uTWFuYWdlclxuICogQHVzZXMgRXZlbnRUYXJnZXRcbiAqIEBleGFtcGxlXG4gKlxuICogLy8gR2V0IHRoZSBjb2xsaXNpb24gbWFuYWdlci5cbiAqIGxldCBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpO1xuICpcbiAqIC8vIEVuYWJsZWQgdGhlIGNvbGlkZXIgbWFuYWdlci5cbiAqIG1hbmFnZXIuZW5hYmxlZCA9IHRydWU7XG4gKlxuICogLy8gRW5hYmxlZCBkcmF3IGNvbGxpZGVyXG4gKiBtYW5hZ2VyLmVuYWJsZWREZWJ1Z0RyYXcgPSB0cnVlO1xuICpcbiAqIC8vIEVuYWJsZWQgZHJhdyBjb2xsaWRlciBib3VuZGluZyBib3hcbiAqIG1hbmFnZXIuZW5hYmxlZERyYXdCb3VuZGluZ0JveCA9IHRydWU7XG4gKlxuICogXG4gKiAvLyBDb2xsaXNpb24gY2FsbGJhY2tcbiAqIG9uQ29sbGlzaW9uRW50ZXI6IGZ1bmN0aW9uIChvdGhlciwgc2VsZikge1xuICogICAgIHRoaXMubm9kZS5jb2xvciA9IGNjLkNvbG9yLlJFRDtcbiAqICAgICB0aGlzLnRvdWNoaW5nTnVtYmVyICsrO1xuICpcbiAqICAgICAvLyBsZXQgd29ybGQgPSBzZWxmLndvcmxkO1xuICogICAgIC8vIGxldCBhYWJiID0gd29ybGQuYWFiYjtcbiAqICAgICAvLyBsZXQgcHJlQWFiYiA9IHdvcmxkLnByZUFhYmI7XG4gKiAgICAgLy8gbGV0IG0gPSB3b3JsZC5tYXRyaXg7XG4gKlxuICogICAgIC8vIGZvciBjaXJjbGUgY29sbGlkZXJcbiAqICAgICAvLyBsZXQgciA9IHdvcmxkLnJhZGl1cztcbiAqICAgICAvLyBsZXQgcCA9IHdvcmxkLnBvc2l0aW9uO1xuICpcbiAqICAgICAvLyBmb3IgYm94IGNvbGxpZGVyIGFuZCBwb2x5Z29uIGNvbGxpZGVyXG4gKiAgICAgLy8gbGV0IHBzID0gd29ybGQucG9pbnRzO1xuICogfSxcbiAqICAgXG4gKiBvbkNvbGxpc2lvblN0YXk6IGZ1bmN0aW9uIChvdGhlciwgc2VsZikge1xuICogICAgIGNvbnNvbGUubG9nKCdvbiBjb2xsaXNpb24gc3RheScpO1xuICogfSxcbiAqICAgXG4gKiBvbkNvbGxpc2lvbkV4aXQ6IGZ1bmN0aW9uIChvdGhlciwgc2VsZikge1xuICogICAgIHRoaXMudG91Y2hpbmdOdW1iZXIgLS07XG4gKiAgICAgaWYgKHRoaXMudG91Y2hpbmdOdW1iZXIgPT09IDApIHtcbiAqICAgICAgICAgdGhpcy5ub2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XG4gKiAgICAgfVxuICogfVxuICovXG5sZXQgQ29sbGlzaW9uTWFuYWdlciA9IGNjLkNsYXNzKHtcbiAgICBtaXhpbnM6IFtjYy5FdmVudFRhcmdldF0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5piv5ZCm5byA5ZCv56Kw5pKe566h55CG77yM6buY6K6k5Li65LiN5byA5ZCvXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlZFxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5piv5ZCm57uY5Yi256Kw5pKe57uE5Lu255qE5YyF5Zu055uS77yM6buY6K6k5Li65LiN57uY5Yi2XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlZERyYXdCb3VuZGluZ0JveFxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgZW5hYmxlZERyYXdCb3VuZGluZ0JveDogZmFsc2VcbiAgICB9LFxuXG4gICAgY3RvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9jb250YWN0cyA9IFtdO1xuICAgICAgICB0aGlzLl9jb2xsaWRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5fZGVidWdEcmF3ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9lbmFibGVkRGVidWdEcmF3ID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICBjYy5kaXJlY3Rvci5fc2NoZWR1bGVyICYmIGNjLmRpcmVjdG9yLl9zY2hlZHVsZXIuZW5hYmxlRm9yVGFyZ2V0KHRoaXMpO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGksIGw7XG5cbiAgICAgICAgLy8gdXBkYXRlIGNvbGxpZGVyXG4gICAgICAgIGxldCBjb2xsaWRlcnMgPSB0aGlzLl9jb2xsaWRlcnM7XG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBjb2xsaWRlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbGxpZGVyKGNvbGxpZGVyc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkbyBjb2xsaWRlXG4gICAgICAgIGxldCBjb250YWN0cyA9IHRoaXMuX2NvbnRhY3RzO1xuICAgICAgICBsZXQgcmVzdWx0cyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IGNvbnRhY3RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNvbGxpc2lvblR5cGUgPSBjb250YWN0c1tpXS51cGRhdGVTdGF0ZSgpO1xuICAgICAgICAgICAgaWYgKGNvbGxpc2lvblR5cGUgPT09IENvbGxpc2lvblR5cGUuTm9uZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHRzLnB1c2goW2NvbGxpc2lvblR5cGUsIGNvbnRhY3RzW2ldXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBoYW5kbGUgY29sbGlkZSByZXN1bHRzLCBlbWl0IG1lc3NhZ2VcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IHJlc3VsdHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gcmVzdWx0c1tpXTtcbiAgICAgICAgICAgIHRoaXMuX2RvQ29sbGlkZShyZXN1bHRbMF0sIHJlc3VsdFsxXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkcmF3IGNvbGxpZGVyc1xuICAgICAgICB0aGlzLmRyYXdDb2xsaWRlcnMoKTtcbiAgICB9LFxuXG4gICAgX2RvQ29sbGlkZTogZnVuY3Rpb24gKGNvbGxpc2lvblR5cGUsIGNvbnRhY3QpIHtcbiAgICAgICAgbGV0IGNvbnRhY3RGdW5jO1xuICAgICAgICBzd2l0Y2ggKGNvbGxpc2lvblR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgQ29sbGlzaW9uVHlwZS5Db2xsaXNpb25FbnRlcjpcbiAgICAgICAgICAgICAgICBjb250YWN0RnVuYyA9ICdvbkNvbGxpc2lvbkVudGVyJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ29sbGlzaW9uVHlwZS5Db2xsaXNpb25TdGF5OlxuICAgICAgICAgICAgICAgIGNvbnRhY3RGdW5jID0gJ29uQ29sbGlzaW9uU3RheSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENvbGxpc2lvblR5cGUuQ29sbGlzaW9uRXhpdDpcbiAgICAgICAgICAgICAgICBjb250YWN0RnVuYyA9ICdvbkNvbGxpc2lvbkV4aXQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvbGxpZGVyMSA9IGNvbnRhY3QuY29sbGlkZXIxO1xuICAgICAgICBsZXQgY29sbGlkZXIyID0gY29udGFjdC5jb2xsaWRlcjI7XG5cbiAgICAgICAgbGV0IGNvbXBzMSA9IGNvbGxpZGVyMS5ub2RlLl9jb21wb25lbnRzO1xuICAgICAgICBsZXQgY29tcHMyID0gY29sbGlkZXIyLm5vZGUuX2NvbXBvbmVudHM7XG5cbiAgICAgICAgbGV0IGksIGwsIGNvbXA7XG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBjb21wczEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBjb21wID0gY29tcHMxW2ldO1xuICAgICAgICAgICAgaWYgKGNvbXBbY29udGFjdEZ1bmNdKSB7XG4gICAgICAgICAgICAgICAgY29tcFtjb250YWN0RnVuY10oY29sbGlkZXIyLCBjb2xsaWRlcjEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMCwgbCA9IGNvbXBzMi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGNvbXAgPSBjb21wczJbaV07XG4gICAgICAgICAgICBpZiAoY29tcFtjb250YWN0RnVuY10pIHtcbiAgICAgICAgICAgICAgICBjb21wW2NvbnRhY3RGdW5jXShjb2xsaWRlcjEsIGNvbGxpZGVyMik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBcblxuICAgIHNob3VsZENvbGxpZGU6IGZ1bmN0aW9uIChjMSwgYzIpIHtcbiAgICAgICAgbGV0IG5vZGUxID0gYzEubm9kZSwgbm9kZTIgPSBjMi5ub2RlO1xuICAgICAgICBsZXQgY29sbGlzaW9uTWF0cml4ID0gY2MuZ2FtZS5jb2xsaXNpb25NYXRyaXg7XG4gICAgICAgIHJldHVybiBub2RlMSAhPT0gbm9kZTIgJiYgY29sbGlzaW9uTWF0cml4W25vZGUxLmdyb3VwSW5kZXhdW25vZGUyLmdyb3VwSW5kZXhdO1xuICAgIH0sXG5cbiAgICBpbml0Q29sbGlkZXI6IGZ1bmN0aW9uIChjb2xsaWRlcikge1xuICAgICAgICBpZiAoIWNvbGxpZGVyLndvcmxkKSB7XG4gICAgICAgICAgICBsZXQgd29ybGQgPSBjb2xsaWRlci53b3JsZCA9IHt9O1xuICAgICAgICAgICAgd29ybGQuYWFiYiA9IGNjLnJlY3QoKTtcbiAgICAgICAgICAgIHdvcmxkLnByZUFhYmIgPSBjYy5yZWN0KCk7XG4gICAgICAgICAgICB3b3JsZC5tYXRyaXggPSBjYy5tYXQ0KCk7XG5cbiAgICAgICAgICAgIHdvcmxkLnJhZGl1cyA9IDA7XG5cbiAgICAgICAgICAgIGlmIChjb2xsaWRlciBpbnN0YW5jZW9mIGNjLkJveENvbGxpZGVyKSB7XG4gICAgICAgICAgICAgICAgd29ybGQucG9zaXRpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIHdvcmxkLnBvaW50cyA9IFtjYy52MigpLCBjYy52MigpLCBjYy52MigpLCBjYy52MigpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbGxpZGVyIGluc3RhbmNlb2YgY2MuUG9seWdvbkNvbGxpZGVyKSB7XG4gICAgICAgICAgICAgICAgd29ybGQucG9zaXRpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIHdvcmxkLnBvaW50cyA9IGNvbGxpZGVyLnBvaW50cy5tYXAoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNjLnYyKHAueCwgcC55KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbGxpZGVyIGluc3RhbmNlb2YgY2MuQ2lyY2xlQ29sbGlkZXIpIHtcbiAgICAgICAgICAgICAgICB3b3JsZC5wb3NpdGlvbiA9IGNjLnYyKCk7XG4gICAgICAgICAgICAgICAgd29ybGQucG9pbnRzID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGVDb2xsaWRlcjogZnVuY3Rpb24gKGNvbGxpZGVyKSB7XG4gICAgICAgIGxldCBvZmZzZXQgPSBjb2xsaWRlci5vZmZzZXQ7XG4gICAgICAgIGxldCB3b3JsZCA9IGNvbGxpZGVyLndvcmxkO1xuICAgICAgICBsZXQgYWFiYiA9IHdvcmxkLmFhYmI7XG5cbiAgICAgICAgbGV0IG0gPSB3b3JsZC5tYXRyaXg7XG4gICAgICAgIGNvbGxpZGVyLm5vZGUuZ2V0V29ybGRNYXRyaXgobSk7XG5cbiAgICAgICAgbGV0IHByZUFhYmIgPSB3b3JsZC5wcmVBYWJiO1xuICAgICAgICBwcmVBYWJiLnggPSBhYWJiLng7XG4gICAgICAgIHByZUFhYmIueSA9IGFhYmIueTtcbiAgICAgICAgcHJlQWFiYi53aWR0aCA9IGFhYmIud2lkdGg7XG4gICAgICAgIHByZUFhYmIuaGVpZ2h0ID0gYWFiYi5oZWlnaHQ7XG5cbiAgICAgICAgaWYgKGNvbGxpZGVyIGluc3RhbmNlb2YgY2MuQm94Q29sbGlkZXIpIHtcbiAgICAgICAgICAgIGxldCBzaXplID0gY29sbGlkZXIuc2l6ZTtcblxuICAgICAgICAgICAgYWFiYi54ID0gb2Zmc2V0LnggLSBzaXplLndpZHRoLzI7XG4gICAgICAgICAgICBhYWJiLnkgPSBvZmZzZXQueSAtIHNpemUuaGVpZ2h0LzI7XG4gICAgICAgICAgICBhYWJiLndpZHRoID0gc2l6ZS53aWR0aDtcbiAgICAgICAgICAgIGFhYmIuaGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XG5cbiAgICAgICAgICAgIGxldCB3cHMgPSB3b3JsZC5wb2ludHM7XG4gICAgICAgICAgICBsZXQgd3AwID0gd3BzWzBdLCB3cDEgPSB3cHNbMV0sXG4gICAgICAgICAgICAgICAgd3AyID0gd3BzWzJdLCB3cDMgPSB3cHNbM107XG4gICAgICAgICAgICBvYmJBcHBseU1hdHJpeChhYWJiLCBtLCB3cDAsIHdwMSwgd3AyLCB3cDMpO1xuXG4gICAgICAgICAgICBsZXQgbWlueCA9IE1hdGgubWluKHdwMC54LCB3cDEueCwgd3AyLngsIHdwMy54KTtcbiAgICAgICAgICAgIGxldCBtaW55ID0gTWF0aC5taW4od3AwLnksIHdwMS55LCB3cDIueSwgd3AzLnkpO1xuICAgICAgICAgICAgbGV0IG1heHggPSBNYXRoLm1heCh3cDAueCwgd3AxLngsIHdwMi54LCB3cDMueCk7XG4gICAgICAgICAgICBsZXQgbWF4eSA9IE1hdGgubWF4KHdwMC55LCB3cDEueSwgd3AyLnksIHdwMy55KTtcblxuICAgICAgICAgICAgYWFiYi54ID0gbWlueDtcbiAgICAgICAgICAgIGFhYmIueSA9IG1pbnk7XG4gICAgICAgICAgICBhYWJiLndpZHRoID0gbWF4eCAtIG1pbng7XG4gICAgICAgICAgICBhYWJiLmhlaWdodCA9IG1heHkgLSBtaW55O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbGxpZGVyIGluc3RhbmNlb2YgY2MuQ2lyY2xlQ29sbGlkZXIpIHtcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB3b3JsZCBwb3NpdGlvblxuICAgICAgICAgICAgVmVjMi50cmFuc2Zvcm1NYXQ0KF92ZWMyLCBjb2xsaWRlci5vZmZzZXQsIG0pO1xuXG4gICAgICAgICAgICB3b3JsZC5wb3NpdGlvbi54ID0gX3ZlYzIueDtcbiAgICAgICAgICAgIHdvcmxkLnBvc2l0aW9uLnkgPSBfdmVjMi55O1xuXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgd29ybGQgcmFkaXVzXG4gICAgICAgICAgICBsZXQgbW0gPSBtLm07XG4gICAgICAgICAgICBsZXQgdGVtcHggPSBtbVsxMl0sIHRlbXB5ID0gbW1bMTNdO1xuICAgICAgICAgICAgbW1bMTJdID0gbW1bMTNdID0gMDtcblxuICAgICAgICAgICAgX3ZlYzIueCA9IGNvbGxpZGVyLnJhZGl1cztcbiAgICAgICAgICAgIF92ZWMyLnkgPSAwO1xuXG4gICAgICAgICAgICBWZWMyLnRyYW5zZm9ybU1hdDQoX3ZlYzIsIF92ZWMyLCBtKTtcbiAgICAgICAgICAgIGxldCBkID0gTWF0aC5zcXJ0KF92ZWMyLnggKiBfdmVjMi54ICsgX3ZlYzIueSAqIF92ZWMyLnkpO1xuXG4gICAgICAgICAgICB3b3JsZC5yYWRpdXMgPSBkO1xuXG4gICAgICAgICAgICBhYWJiLnggPSB3b3JsZC5wb3NpdGlvbi54IC0gZDtcbiAgICAgICAgICAgIGFhYmIueSA9IHdvcmxkLnBvc2l0aW9uLnkgLSBkO1xuICAgICAgICAgICAgYWFiYi53aWR0aCA9IGQgKiAyO1xuICAgICAgICAgICAgYWFiYi5oZWlnaHQgPSBkICogMjtcblxuICAgICAgICAgICAgbW1bMTJdID0gdGVtcHg7XG4gICAgICAgICAgICBtbVsxM10gPSB0ZW1weTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2xsaWRlciBpbnN0YW5jZW9mIGNjLlBvbHlnb25Db2xsaWRlcikge1xuICAgICAgICAgICAgbGV0IHBvaW50cyA9IGNvbGxpZGVyLnBvaW50cztcbiAgICAgICAgICAgIGxldCB3b3JsZFBvaW50cyA9IHdvcmxkLnBvaW50cztcblxuICAgICAgICAgICAgd29ybGRQb2ludHMubGVuZ3RoID0gcG9pbnRzLmxlbmd0aDtcblxuICAgICAgICAgICAgbGV0IG1pbnggPSAxZTYsIG1pbnkgPSAxZTYsIG1heHggPSAtMWU2LCBtYXh5ID0gLTFlNjtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gcG9pbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghd29ybGRQb2ludHNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgd29ybGRQb2ludHNbaV0gPSBjYy52MigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF92ZWMyLnggPSBwb2ludHNbaV0ueCArIG9mZnNldC54O1xuICAgICAgICAgICAgICAgIF92ZWMyLnkgPSBwb2ludHNbaV0ueSArIG9mZnNldC55O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFZlYzIudHJhbnNmb3JtTWF0NChfdmVjMiwgX3ZlYzIsIG0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCB4ID0gX3ZlYzIueDtcbiAgICAgICAgICAgICAgICBsZXQgeSA9IF92ZWMyLnk7XG5cbiAgICAgICAgICAgICAgICB3b3JsZFBvaW50c1tpXS54ID0geDtcbiAgICAgICAgICAgICAgICB3b3JsZFBvaW50c1tpXS55ID0geTtcblxuICAgICAgICAgICAgICAgIGlmICh4ID4gbWF4eCkgbWF4eCA9IHg7XG4gICAgICAgICAgICAgICAgaWYgKHggPCBtaW54KSBtaW54ID0geDtcbiAgICAgICAgICAgICAgICBpZiAoeSA+IG1heHkpIG1heHkgPSB5O1xuICAgICAgICAgICAgICAgIGlmICh5IDwgbWlueSkgbWlueSA9IHk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFhYmIueCA9IG1pbng7XG4gICAgICAgICAgICBhYWJiLnkgPSBtaW55O1xuICAgICAgICAgICAgYWFiYi53aWR0aCA9IG1heHggLSBtaW54O1xuICAgICAgICAgICAgYWFiYi5oZWlnaHQgPSBtYXh5IC0gbWlueTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGRDb2xsaWRlcjogZnVuY3Rpb24gKGNvbGxpZGVyKSB7XG4gICAgICAgIGxldCBjb2xsaWRlcnMgPSB0aGlzLl9jb2xsaWRlcnM7XG4gICAgICAgIGxldCBpbmRleCA9IGNvbGxpZGVycy5pbmRleE9mKGNvbGxpZGVyKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBjb2xsaWRlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG90aGVyID0gY29sbGlkZXJzW2ldO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZENvbGxpZGUoY29sbGlkZXIsIG90aGVyKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFjdCA9IG5ldyBDb250YWN0KGNvbGxpZGVyLCBvdGhlcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRhY3RzLnB1c2goY29udGFjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb2xsaWRlcnMucHVzaChjb2xsaWRlcik7XG4gICAgICAgICAgICB0aGlzLmluaXRDb2xsaWRlcihjb2xsaWRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBjb2xsaWRlci5ub2RlLm9uKE5vZGVFdmVudC5HUk9VUF9DSEFOR0VELCB0aGlzLm9uTm9kZUdyb3VwQ2hhbmdlZCwgdGhpcyk7XG4gICAgfSxcblxuICAgIHJlbW92ZUNvbGxpZGVyOiBmdW5jdGlvbiAoY29sbGlkZXIpIHtcbiAgICAgICAgbGV0IGNvbGxpZGVycyA9IHRoaXMuX2NvbGxpZGVycztcbiAgICAgICAgbGV0IGluZGV4ID0gY29sbGlkZXJzLmluZGV4T2YoY29sbGlkZXIpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgY29sbGlkZXJzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgICAgIGxldCBjb250YWN0cyA9IHRoaXMuX2NvbnRhY3RzO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNvbnRhY3RzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRhY3QgPSBjb250YWN0c1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoY29udGFjdC5jb2xsaWRlcjEgPT09IGNvbGxpZGVyIHx8IGNvbnRhY3QuY29sbGlkZXIyID09PSBjb2xsaWRlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGFjdC50b3VjaGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZG9Db2xsaWRlKENvbGxpc2lvblR5cGUuQ29sbGlzaW9uRXhpdCwgY29udGFjdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb250YWN0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb2xsaWRlci5ub2RlLm9mZihOb2RlRXZlbnQuR1JPVVBfQ0hBTkdFRCwgdGhpcy5vbk5vZGVHcm91cENoYW5nZWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCg2NjAwKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbk5vZGVHcm91cENoYW5nZWQ6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGxldCBjb2xsaWRlcnMgPSBub2RlLmdldENvbXBvbmVudHMoY2MuQ29sbGlkZXIpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gY29sbGlkZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gY29sbGlkZXJzW2ldO1xuICAgICAgICAgICAgaWYoY2MuUGh5c2ljc0NvbGxpZGVyICYmIGNvbGxpZGVyIGluc3RhbmNlb2YgY2MuUGh5c2ljc0NvbGxpZGVyKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNvbGxpZGVyKGNvbGxpZGVyKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ29sbGlkZXIoY29sbGlkZXIpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRyYXdDb2xsaWRlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9lbmFibGVkRGVidWdEcmF3KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jaGVja0RlYnVnRHJhd1ZhbGlkKCk7XG5cbiAgICAgICAgbGV0IGRlYnVnRHJhd2VyID0gdGhpcy5fZGVidWdEcmF3ZXI7XG4gICAgICAgIGRlYnVnRHJhd2VyLmNsZWFyKCk7XG5cbiAgICAgICAgbGV0IGNvbGxpZGVycyA9IHRoaXMuX2NvbGxpZGVycztcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGNvbGxpZGVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjb2xsaWRlciA9IGNvbGxpZGVyc1tpXTtcblxuICAgICAgICAgICAgZGVidWdEcmF3ZXIuc3Ryb2tlQ29sb3IgPSBjYy5Db2xvci5XSElURTtcbiAgICAgICAgICAgIGlmIChjb2xsaWRlciBpbnN0YW5jZW9mIGNjLkJveENvbGxpZGVyIHx8IGNvbGxpZGVyIGluc3RhbmNlb2YgY2MuUG9seWdvbkNvbGxpZGVyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBzID0gY29sbGlkZXIud29ybGQucG9pbnRzO1xuICAgICAgICAgICAgICAgIGlmIChwcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnRHJhd2VyLm1vdmVUbyhwc1swXS54LCBwc1swXS55KTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBwcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdEcmF3ZXIubGluZVRvKHBzW2pdLngsIHBzW2pdLnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnRHJhd2VyLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnRHJhd2VyLnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbGxpZGVyIGluc3RhbmNlb2YgY2MuQ2lyY2xlQ29sbGlkZXIpIHtcbiAgICAgICAgICAgICAgICBkZWJ1Z0RyYXdlci5jaXJjbGUoY29sbGlkZXIud29ybGQucG9zaXRpb24ueCwgY29sbGlkZXIud29ybGQucG9zaXRpb24ueSwgY29sbGlkZXIud29ybGQucmFkaXVzKTtcbiAgICAgICAgICAgICAgICBkZWJ1Z0RyYXdlci5zdHJva2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZW5hYmxlZERyYXdCb3VuZGluZ0JveCkge1xuICAgICAgICAgICAgICAgIGxldCBhYWJiID0gY29sbGlkZXIud29ybGQuYWFiYjtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBkZWJ1Z0RyYXdlci5zdHJva2VDb2xvciA9IGNjLkNvbG9yLkJMVUU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZGVidWdEcmF3ZXIubW92ZVRvKGFhYmIueE1pbiwgYWFiYi55TWluKTtcbiAgICAgICAgICAgICAgICBkZWJ1Z0RyYXdlci5saW5lVG8oYWFiYi54TWluLCBhYWJiLnlNYXgpO1xuICAgICAgICAgICAgICAgIGRlYnVnRHJhd2VyLmxpbmVUbyhhYWJiLnhNYXgsIGFhYmIueU1heCk7XG4gICAgICAgICAgICAgICAgZGVidWdEcmF3ZXIubGluZVRvKGFhYmIueE1heCwgYWFiYi55TWluKTtcblxuICAgICAgICAgICAgICAgIGRlYnVnRHJhd2VyLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgZGVidWdEcmF3ZXIuc3Ryb2tlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2NoZWNrRGVidWdEcmF3VmFsaWQgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2RlYnVnRHJhd2VyIHx8ICF0aGlzLl9kZWJ1Z0RyYXdlci5pc1ZhbGlkKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5ldyBjYy5Ob2RlKCdDT0xMSVNJT05fTUFOQUdFUl9ERUJVR19EUkFXJyk7XG4gICAgICAgICAgICBub2RlLnpJbmRleCA9IGNjLm1hY3JvLk1BWF9aSU5ERVg7XG4gICAgICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZShub2RlKTtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnRHJhd2VyID0gbm9kZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8qKlxuICogISNlblxuICogISN6aFxuICog5piv5ZCm57uY5Yi256Kw5pKe57uE5Lu255qE5b2i54q277yM6buY6K6k5Li65LiN57uY5Yi2XG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZWREZWJ1Z0RyYXdcbiAqIEBkZWZhdWx0IGZhbHNlXG4gKi9cbmNjLmpzLmdldHNldChDb2xsaXNpb25NYW5hZ2VyLnByb3RvdHlwZSwgJ2VuYWJsZWREZWJ1Z0RyYXcnLCBcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVkRGVidWdEcmF3O1xuICAgIH0sXG4gICAgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiAhdGhpcy5fZW5hYmxlZERlYnVnRHJhdykge1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tEZWJ1Z0RyYXdWYWxpZCgpO1xuICAgICAgICAgICAgdGhpcy5fZGVidWdEcmF3ZXIubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCF2YWx1ZSAmJiB0aGlzLl9lbmFibGVkRGVidWdEcmF3KSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1Z0RyYXdlci5jbGVhcih0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnRHJhd2VyLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lbmFibGVkRGVidWdEcmF3ID0gdmFsdWU7XG4gICAgfVxuKTtcblxuXG5jYy5Db2xsaXNpb25NYW5hZ2VyID0gbW9kdWxlLmV4cG9ydHMgPSBDb2xsaXNpb25NYW5hZ2VyO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=