
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/primitive/vertex-data.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/**
 * @class primitive.VertexData
 * @param {number[]} positions 
 * @param {number[]} normals 
 * @param {number[]} uvs 
 * @param {number[]} indices 
 * @param {Vec3} minPos 
 * @param {Vec3} maxPos 
 * @param {number} boundingRadius 
 */
var VertexData =
/**
 * @property {number[]} positions
 */

/**
 * @property {number[]} normals
 */

/**
 * @property {number[]} uvs
 */

/**
 * @property {[Number]} indices
 */

/**
 * @property {Vec3} minPos
 */

/**
 * @property {Vec3} maxPos
 */

/**
 * @property {number} boundingRadius
 */
function VertexData(positions, normals, uvs, indices, minPos, maxPos, boundingRadius) {
  this.positions = void 0;
  this.normals = void 0;
  this.uvs = void 0;
  this.indices = void 0;
  this.minPos = void 0;
  this.maxPos = void 0;
  this.boundingRadius = void 0;
  this.positions = positions;
  this.normals = normals;
  this.uvs = uvs;
  this.indices = indices;
  this.minPos = minPos;
  this.maxPos = maxPos;
  this.boundingRadius = boundingRadius;
};

exports["default"] = VertexData;
module.exports = exports["default"];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3ByaW1pdGl2ZS92ZXJ0ZXgtZGF0YS50cyJdLCJuYW1lcyI6WyJWZXJ0ZXhEYXRhIiwicG9zaXRpb25zIiwibm9ybWFscyIsInV2cyIsImluZGljZXMiLCJtaW5Qb3MiLCJtYXhQb3MiLCJib3VuZGluZ1JhZGl1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7Ozs7O0lBVXFCQTtBQUNqQjs7OztBQUlBOzs7O0FBSUE7Ozs7QUFJQTs7OztBQUlBOzs7O0FBSUE7Ozs7QUFJQTs7O0FBS0Esb0JBQVlDLFNBQVosRUFBaUNDLE9BQWpDLEVBQW9EQyxHQUFwRCxFQUFtRUMsT0FBbkUsRUFBc0ZDLE1BQXRGLEVBQW9HQyxNQUFwRyxFQUFrSEMsY0FBbEgsRUFBMEk7QUFBQSxPQTFCMUlOLFNBMEIwSTtBQUFBLE9BdEIxSUMsT0FzQjBJO0FBQUEsT0FsQjFJQyxHQWtCMEk7QUFBQSxPQWQxSUMsT0FjMEk7QUFBQSxPQVYxSUMsTUFVMEk7QUFBQSxPQU4xSUMsTUFNMEk7QUFBQSxPQUYxSUMsY0FFMEk7QUFDdEksT0FBS04sU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxPQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxPQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFDQSxPQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxPQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxPQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxPQUFLQyxjQUFMLEdBQXNCQSxjQUF0QjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZlYzMgZnJvbSAnLi4vLi4vdmFsdWUtdHlwZXMvdmVjMyc7XG5cbi8qKlxuICogQGNsYXNzIHByaW1pdGl2ZS5WZXJ0ZXhEYXRhXG4gKiBAcGFyYW0ge251bWJlcltdfSBwb3NpdGlvbnMgXG4gKiBAcGFyYW0ge251bWJlcltdfSBub3JtYWxzIFxuICogQHBhcmFtIHtudW1iZXJbXX0gdXZzIFxuICogQHBhcmFtIHtudW1iZXJbXX0gaW5kaWNlcyBcbiAqIEBwYXJhbSB7VmVjM30gbWluUG9zIFxuICogQHBhcmFtIHtWZWMzfSBtYXhQb3MgXG4gKiBAcGFyYW0ge251bWJlcn0gYm91bmRpbmdSYWRpdXMgXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlcnRleERhdGEge1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyW119IHBvc2l0aW9uc1xuICAgICAqL1xuICAgIHBvc2l0aW9uczogbnVtYmVyW107XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJbXX0gbm9ybWFsc1xuICAgICAqL1xuICAgIG5vcm1hbHM6IG51bWJlcltdO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyW119IHV2c1xuICAgICAqL1xuICAgIHV2czogbnVtYmVyW107XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtbTnVtYmVyXX0gaW5kaWNlc1xuICAgICAqL1xuICAgIGluZGljZXM6IG51bWJlcltdO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gbWluUG9zXG4gICAgICovXG4gICAgbWluUG9zOiBWZWMzO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gbWF4UG9zXG4gICAgICovXG4gICAgbWF4UG9zOiBWZWMzO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBib3VuZGluZ1JhZGl1c1xuICAgICAqL1xuICAgIGJvdW5kaW5nUmFkaXVzOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbnM6IG51bWJlcltdLCBub3JtYWxzOiBudW1iZXJbXSwgdXZzOiBudW1iZXJbXSwgaW5kaWNlczogbnVtYmVyW10sIG1pblBvczogVmVjMywgbWF4UG9zOiBWZWMzLCBib3VuZGluZ1JhZGl1czogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb25zID0gcG9zaXRpb25zO1xuICAgICAgICB0aGlzLm5vcm1hbHMgPSBub3JtYWxzO1xuICAgICAgICB0aGlzLnV2cyA9IHV2cztcbiAgICAgICAgdGhpcy5pbmRpY2VzID0gaW5kaWNlcztcbiAgICAgICAgdGhpcy5taW5Qb3MgPSBtaW5Qb3M7XG4gICAgICAgIHRoaXMubWF4UG9zID0gbWF4UG9zO1xuICAgICAgICB0aGlzLmJvdW5kaW5nUmFkaXVzID0gYm91bmRpbmdSYWRpdXM7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=