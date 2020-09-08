
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/primitive/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var utils = _interopRequireWildcard(require("./utils"));

var _box = _interopRequireDefault(require("./box"));

var _cone = _interopRequireDefault(require("./cone"));

var _cylinder = _interopRequireDefault(require("./cylinder"));

var _plane = _interopRequireDefault(require("./plane"));

var _quad = _interopRequireDefault(require("./quad"));

var _sphere = _interopRequireDefault(require("./sphere"));

var _torus = _interopRequireDefault(require("./torus"));

var _capsule = _interopRequireDefault(require("./capsule"));

var _polyhedron = require("./polyhedron");

var _vertexData = _interopRequireDefault(require("./vertex-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * !#en A basic module for creating vertex data for 3D objects. You can access this module by `cc.primitive`.
 * !#zh 一个创建 3D 物体顶点数据的基础模块，你可以通过 `cc.primitive` 来访问这个模块。
 * @module cc.primitive
 * @submodule cc.primitive
 * @main
 */
cc.primitive = Object.assign({
  /**
   * !#en Create box vertex data
   * !#zh 创建长方体顶点数据
   * @method box
   * @static
   * @param {Number} width
   * @param {Number} height
   * @param {Number} length
   * @param {Object} opts
   * @param {Number} opts.widthSegments
   * @param {Number} opts.heightSegments
   * @param {Number} opts.lengthSegments
   * @return {primitive.VertexData}
   */
  box: _box["default"],

  /**
   * !#en Create cone vertex data
   * !#zh 创建圆锥体顶点数据
   * @method cone
   * @static
   * @param {Number} radius
   * @param {Number} height
   * @param {Object} opts
   * @param {Number} opts.radialSegments
   * @param {Number} opts.heightSegments
   * @param {Boolean} opts.capped
   * @param {Number} opts.arc
   * @return {primitive.VertexData}
   */
  cone: _cone["default"],

  /**
   * !#en Create cylinder vertex data
   * !#zh 创建圆柱体顶点数据
   * @method cylinder
   * @static
   * @param {Number} radiusTop
   * @param {Number} radiusBottom
   * @param {Number} height
   * @param {Object} opts
   * @param {Number} opts.radialSegments
   * @param {Number} opts.heightSegments
   * @param {Boolean} opts.capped
   * @param {Number} opts.arc
   * @return {primitive.VertexData}
   */
  cylinder: _cylinder["default"],

  /**
   * !#en Create plane vertex data
   * !#zh 创建平台顶点数据
   * @method plane
   * @static
   * @param {Number} width
   * @param {Number} length
   * @param {Object} opts
   * @param {Number} opts.widthSegments
   * @param {Number} opts.lengthSegments
   * @return {primitive.VertexData}
   */
  plane: _plane["default"],

  /**
   * !#en Create quad vertex data
   * !#zh 创建面片顶点数据
   * @method quad
   * @static
   * @return {primitive.VertexData}
   */
  quad: _quad["default"],

  /**
   * !#en Create sphere vertex data
   * !#zh 创建球体顶点数据
   * @method sphere
   * @static
   * @param {Number} radius
   * @param {Object} opts
   * @param {Number} opts.segments
   * @return {primitive.VertexData}
   */
  sphere: _sphere["default"],

  /**
   * !#en Create torus vertex data
   * !#zh 创建圆环顶点数据
   * @method torus
   * @static
   * @param {Number} radius
   * @param {Number} tube
   * @param {Object} opts
   * @param {Number} opts.radialSegments
   * @param {Number} opts.tubularSegments
   * @param {Number} opts.arc
   * @return {primitive.VertexData}
   */
  torus: _torus["default"],

  /**
   * !#en Create capsule vertex data
   * !#zh 创建胶囊体顶点数据
   * @method capsule
   * @static
   * @param {Number} radiusTop
   * @param {Number} radiusBottom
   * @param {Number} height
   * @param {Object} opts
   * @param {Number} opts.sides
   * @param {Number} opts.heightSegments
   * @param {Boolean} opts.capped
   * @param {Number} opts.arc
   * @return {primitive.VertexData}
   */
  capsule: _capsule["default"],

  /**
   * !#en Create polyhedron vertex data
   * !#zh 创建多面体顶点数据
   * @method polyhedron
   * @static
   * @param {primitive.PolyhedronType} type
   * @param {Number} Size
   * @param {Object} opts
   * @param {Number} opts.sizeX
   * @param {Number} opts.sizeY
   * @param {Number} opts.sizeZ
   * @return {primitive.VertexData}
   */
  polyhedron: _polyhedron.polyhedron,
  PolyhedronType: _polyhedron.PolyhedronType,
  VertexData: _vertexData["default"]
}, utils); // fix submodule pollute ...

/**
 * @submodule cc
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3ByaW1pdGl2ZS9pbmRleC50cyJdLCJuYW1lcyI6WyJjYyIsInByaW1pdGl2ZSIsIk9iamVjdCIsImFzc2lnbiIsImJveCIsImNvbmUiLCJjeWxpbmRlciIsInBsYW5lIiwicXVhZCIsInNwaGVyZSIsInRvcnVzIiwiY2Fwc3VsZSIsInBvbHloZWRyb24iLCJQb2x5aGVkcm9uVHlwZSIsIlZlcnRleERhdGEiLCJ1dGlscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBOzs7Ozs7O0FBUUFBLEVBQUUsQ0FBQ0MsU0FBSCxHQUFlQyxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUN6Qjs7Ozs7Ozs7Ozs7Ozs7QUFjQUMsRUFBQUEsR0FBRyxFQUFIQSxlQWZ5Qjs7QUFnQnpCOzs7Ozs7Ozs7Ozs7OztBQWNBQyxFQUFBQSxJQUFJLEVBQUpBLGdCQTlCeUI7O0FBK0J6Qjs7Ozs7Ozs7Ozs7Ozs7O0FBZUFDLEVBQUFBLFFBQVEsRUFBUkEsb0JBOUN5Qjs7QUErQ3pCOzs7Ozs7Ozs7Ozs7QUFZQUMsRUFBQUEsS0FBSyxFQUFMQSxpQkEzRHlCOztBQTREekI7Ozs7Ozs7QUFPQUMsRUFBQUEsSUFBSSxFQUFKQSxnQkFuRXlCOztBQW9FekI7Ozs7Ozs7Ozs7QUFVQUMsRUFBQUEsTUFBTSxFQUFOQSxrQkE5RXlCOztBQStFekI7Ozs7Ozs7Ozs7Ozs7QUFhQUMsRUFBQUEsS0FBSyxFQUFMQSxpQkE1RnlCOztBQTZGekI7Ozs7Ozs7Ozs7Ozs7OztBQWVBQyxFQUFBQSxPQUFPLEVBQVBBLG1CQTVHeUI7O0FBNkd6Qjs7Ozs7Ozs7Ozs7OztBQWFBQyxFQUFBQSxVQUFVLEVBQVZBLHNCQTFIeUI7QUE0SHpCQyxFQUFBQSxjQUFjLEVBQWRBLDBCQTVIeUI7QUE2SHpCQyxFQUFBQSxVQUFVLEVBQVZBO0FBN0h5QixDQUFkLEVBOEhaQyxLQTlIWSxDQUFmLEVBZ0lBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgYm94IGZyb20gJy4vYm94JztcbmltcG9ydCBjb25lIGZyb20gJy4vY29uZSc7XG5pbXBvcnQgY3lsaW5kZXIgZnJvbSAnLi9jeWxpbmRlcic7XG5pbXBvcnQgcGxhbmUgZnJvbSAnLi9wbGFuZSc7XG5pbXBvcnQgcXVhZCBmcm9tICcuL3F1YWQnO1xuaW1wb3J0IHNwaGVyZSBmcm9tICcuL3NwaGVyZSc7XG5pbXBvcnQgdG9ydXMgZnJvbSAnLi90b3J1cyc7XG5pbXBvcnQgY2Fwc3VsZSBmcm9tICcuL2NhcHN1bGUnO1xuaW1wb3J0IHsgUG9seWhlZHJvblR5cGUsIHBvbHloZWRyb24gfSBmcm9tICcuL3BvbHloZWRyb24nO1xuaW1wb3J0IFZlcnRleERhdGEgZnJvbSAnLi92ZXJ0ZXgtZGF0YSc7XG5cbi8qKlxuICogISNlbiBBIGJhc2ljIG1vZHVsZSBmb3IgY3JlYXRpbmcgdmVydGV4IGRhdGEgZm9yIDNEIG9iamVjdHMuIFlvdSBjYW4gYWNjZXNzIHRoaXMgbW9kdWxlIGJ5IGBjYy5wcmltaXRpdmVgLlxuICogISN6aCDkuIDkuKrliJvlu7ogM0Qg54mp5L2T6aG254K55pWw5o2u55qE5Z+656GA5qih5Z2X77yM5L2g5Y+v5Lul6YCa6L+HIGBjYy5wcmltaXRpdmVgIOadpeiuv+mXrui/meS4quaooeWdl+OAglxuICogQG1vZHVsZSBjYy5wcmltaXRpdmVcbiAqIEBzdWJtb2R1bGUgY2MucHJpbWl0aXZlXG4gKiBAbWFpblxuICovXG5cbmNjLnByaW1pdGl2ZSA9IE9iamVjdC5hc3NpZ24oe1xuICAgIC8qKlxuICAgICAqICEjZW4gQ3JlYXRlIGJveCB2ZXJ0ZXggZGF0YVxuICAgICAqICEjemgg5Yib5bu66ZW/5pa55L2T6aG254K55pWw5o2uXG4gICAgICogQG1ldGhvZCBib3hcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLndpZHRoU2VnbWVudHNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0cy5oZWlnaHRTZWdtZW50c1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLmxlbmd0aFNlZ21lbnRzXG4gICAgICogQHJldHVybiB7cHJpbWl0aXZlLlZlcnRleERhdGF9XG4gICAgICovXG4gICAgYm94LFxuICAgIC8qKlxuICAgICAqICEjZW4gQ3JlYXRlIGNvbmUgdmVydGV4IGRhdGFcbiAgICAgKiAhI3poIOWIm+W7uuWchumUpeS9k+mhtueCueaVsOaNrlxuICAgICAqIEBtZXRob2QgY29uZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmFkaXVzXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMucmFkaWFsU2VnbWVudHNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0cy5oZWlnaHRTZWdtZW50c1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0cy5jYXBwZWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0cy5hcmNcbiAgICAgKiBAcmV0dXJuIHtwcmltaXRpdmUuVmVydGV4RGF0YX1cbiAgICAgKi9cbiAgICBjb25lLFxuICAgIC8qKlxuICAgICAqICEjZW4gQ3JlYXRlIGN5bGluZGVyIHZlcnRleCBkYXRhXG4gICAgICogISN6aCDliJvlu7rlnIbmn7HkvZPpobbngrnmlbDmja5cbiAgICAgKiBAbWV0aG9kIGN5bGluZGVyXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByYWRpdXNUb3BcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmFkaXVzQm90dG9tXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMucmFkaWFsU2VnbWVudHNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0cy5oZWlnaHRTZWdtZW50c1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0cy5jYXBwZWRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0cy5hcmNcbiAgICAgKiBAcmV0dXJuIHtwcmltaXRpdmUuVmVydGV4RGF0YX1cbiAgICAgKi9cbiAgICBjeWxpbmRlcixcbiAgICAvKipcbiAgICAgKiAhI2VuIENyZWF0ZSBwbGFuZSB2ZXJ0ZXggZGF0YVxuICAgICAqICEjemgg5Yib5bu65bmz5Y+w6aG254K55pWw5o2uXG4gICAgICogQG1ldGhvZCBwbGFuZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0cy53aWR0aFNlZ21lbnRzXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMubGVuZ3RoU2VnbWVudHNcbiAgICAgKiBAcmV0dXJuIHtwcmltaXRpdmUuVmVydGV4RGF0YX1cbiAgICAgKi9cbiAgICBwbGFuZSxcbiAgICAvKipcbiAgICAgKiAhI2VuIENyZWF0ZSBxdWFkIHZlcnRleCBkYXRhXG4gICAgICogISN6aCDliJvlu7rpnaLniYfpobbngrnmlbDmja5cbiAgICAgKiBAbWV0aG9kIHF1YWRcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHJldHVybiB7cHJpbWl0aXZlLlZlcnRleERhdGF9XG4gICAgICovXG4gICAgcXVhZCxcbiAgICAvKipcbiAgICAgKiAhI2VuIENyZWF0ZSBzcGhlcmUgdmVydGV4IGRhdGFcbiAgICAgKiAhI3poIOWIm+W7uueQg+S9k+mhtueCueaVsOaNrlxuICAgICAqIEBtZXRob2Qgc3BoZXJlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByYWRpdXNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLnNlZ21lbnRzXG4gICAgICogQHJldHVybiB7cHJpbWl0aXZlLlZlcnRleERhdGF9XG4gICAgICovXG4gICAgc3BoZXJlLFxuICAgIC8qKlxuICAgICAqICEjZW4gQ3JlYXRlIHRvcnVzIHZlcnRleCBkYXRhXG4gICAgICogISN6aCDliJvlu7rlnIbnjq/pobbngrnmlbDmja5cbiAgICAgKiBAbWV0aG9kIHRvcnVzXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByYWRpdXNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdHViZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMucmFkaWFsU2VnbWVudHNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0cy50dWJ1bGFyU2VnbWVudHNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0cy5hcmNcbiAgICAgKiBAcmV0dXJuIHtwcmltaXRpdmUuVmVydGV4RGF0YX1cbiAgICAgKi9cbiAgICB0b3J1cyxcbiAgICAvKipcbiAgICAgKiAhI2VuIENyZWF0ZSBjYXBzdWxlIHZlcnRleCBkYXRhXG4gICAgICogISN6aCDliJvlu7rog7blm4rkvZPpobbngrnmlbDmja5cbiAgICAgKiBAbWV0aG9kIGNhcHN1bGVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZGl1c1RvcFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByYWRpdXNCb3R0b21cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0cy5zaWRlc1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLmhlaWdodFNlZ21lbnRzXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvcHRzLmNhcHBlZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLmFyY1xuICAgICAqIEByZXR1cm4ge3ByaW1pdGl2ZS5WZXJ0ZXhEYXRhfVxuICAgICAqL1xuICAgIGNhcHN1bGUsXG4gICAgLyoqXG4gICAgICogISNlbiBDcmVhdGUgcG9seWhlZHJvbiB2ZXJ0ZXggZGF0YVxuICAgICAqICEjemgg5Yib5bu65aSa6Z2i5L2T6aG254K55pWw5o2uXG4gICAgICogQG1ldGhvZCBwb2x5aGVkcm9uXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7cHJpbWl0aXZlLlBvbHloZWRyb25UeXBlfSB0eXBlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFNpemVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLnNpemVYXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMuc2l6ZVlcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3B0cy5zaXplWlxuICAgICAqIEByZXR1cm4ge3ByaW1pdGl2ZS5WZXJ0ZXhEYXRhfVxuICAgICAqL1xuICAgIHBvbHloZWRyb24sXG5cbiAgICBQb2x5aGVkcm9uVHlwZSxcbiAgICBWZXJ0ZXhEYXRhLFxufSwgdXRpbHMpO1xuXG4vLyBmaXggc3VibW9kdWxlIHBvbGx1dGUgLi4uXG4vKipcbiAqIEBzdWJtb2R1bGUgY2NcbiAqL1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=