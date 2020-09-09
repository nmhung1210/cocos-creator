
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/graphics/earcut.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}/****************************************************************************
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
'use strict';

cc.Graphics.earcut = module.exports = earcut;

function earcut(data, holeIndices, dim) {
  dim = dim || 2;
  var hasHoles = holeIndices && holeIndices.length,
      outerLen = hasHoles ? holeIndices[0] * dim : data.length,
      outerNode = linkedList(data, 0, outerLen, dim, true),
      triangles = [];
  if (!outerNode) return triangles;
  var minX, minY, maxX, maxY, x, y, size;
  if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim); // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox

  if (data.length > 80 * dim) {
    minX = maxX = data[0];
    minY = maxY = data[1];

    for (var i = dim; i < outerLen; i += dim) {
      x = data[i];
      y = data[i + 1];
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    } // minX, minY and size are later used to transform coords into integers for z-order calculation


    size = Math.max(maxX - minX, maxY - minY);
  }

  earcutLinked(outerNode, triangles, dim, minX, minY, size);
  return triangles;
} // create a circular doubly linked list from polygon points in the specified winding order


function linkedList(data, start, end, dim, clockwise) {
  var i, last;

  if (clockwise === signedArea(data, start, end, dim) > 0) {
    for (i = start; i < end; i += dim) {
      last = insertNode(i, data[i], data[i + 1], last);
    }
  } else {
    for (i = end - dim; i >= start; i -= dim) {
      last = insertNode(i, data[i], data[i + 1], last);
    }
  }

  if (last && equals(last, last.next)) {
    removeNode(last);
    last = last.next;
  }

  return last;
} // eliminate colinear or duplicate points


function filterPoints(start, end) {
  if (!start) return start;
  if (!end) end = start;
  var p = start,
      again;

  do {
    again = false;

    if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
      removeNode(p);
      p = end = p.prev;
      if (p === p.next) return null;
      again = true;
    } else {
      p = p.next;
    }
  } while (again || p !== end);

  return end;
} // main ear slicing loop which triangulates a polygon (given as a linked list)


function earcutLinked(ear, triangles, dim, minX, minY, size, pass) {
  if (!ear) return; // interlink polygon nodes in z-order

  if (!pass && size) indexCurve(ear, minX, minY, size);
  var stop = ear,
      prev,
      next; // iterate through ears, slicing them one by one

  while (ear.prev !== ear.next) {
    prev = ear.prev;
    next = ear.next;

    if (size ? isEarHashed(ear, minX, minY, size) : isEar(ear)) {
      // cut off the triangle
      triangles.push(prev.i / dim);
      triangles.push(ear.i / dim);
      triangles.push(next.i / dim);
      removeNode(ear); // skipping the next vertice leads to less sliver triangles

      ear = next.next;
      stop = next.next;
      continue;
    }

    ear = next; // if we looped through the whole remaining polygon and can't find any more ears

    if (ear === stop) {
      // try filtering points and slicing again
      if (!pass) {
        earcutLinked(filterPoints(ear), triangles, dim, minX, minY, size, 1); // if this didn't work, try curing all small self-intersections locally
      } else if (pass === 1) {
        ear = cureLocalIntersections(ear, triangles, dim);
        earcutLinked(ear, triangles, dim, minX, minY, size, 2); // as a last resort, try splitting the remaining polygon into two
      } else if (pass === 2) {
        splitEarcut(ear, triangles, dim, minX, minY, size);
      }

      break;
    }
  }
} // check whether a polygon node forms a valid ear with adjacent nodes


function isEar(ear) {
  var a = ear.prev,
      b = ear,
      c = ear.next;
  if (area(a, b, c) >= 0) return false; // reflex, can't be an ear
  // now make sure we don't have other points inside the potential ear

  var p = ear.next.next;

  while (p !== ear.prev) {
    if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
    p = p.next;
  }

  return true;
}

function isEarHashed(ear, minX, minY, size) {
  var a = ear.prev,
      b = ear,
      c = ear.next;
  if (area(a, b, c) >= 0) return false; // reflex, can't be an ear
  // triangle bbox; min & max are calculated like this for speed

  var minTX = a.x < b.x ? a.x < c.x ? a.x : c.x : b.x < c.x ? b.x : c.x,
      minTY = a.y < b.y ? a.y < c.y ? a.y : c.y : b.y < c.y ? b.y : c.y,
      maxTX = a.x > b.x ? a.x > c.x ? a.x : c.x : b.x > c.x ? b.x : c.x,
      maxTY = a.y > b.y ? a.y > c.y ? a.y : c.y : b.y > c.y ? b.y : c.y; // z-order range for the current triangle bbox;

  var minZ = zOrder(minTX, minTY, minX, minY, size),
      maxZ = zOrder(maxTX, maxTY, minX, minY, size); // first look for points inside the triangle in increasing z-order

  var p = ear.nextZ;

  while (p && p.z <= maxZ) {
    if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
    p = p.nextZ;
  } // then look for points in decreasing z-order


  p = ear.prevZ;

  while (p && p.z >= minZ) {
    if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
    p = p.prevZ;
  }

  return true;
} // go through all polygon nodes and cure small local self-intersections


function cureLocalIntersections(start, triangles, dim) {
  var p = start;

  do {
    var a = p.prev,
        b = p.next.next;

    if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
      triangles.push(a.i / dim);
      triangles.push(p.i / dim);
      triangles.push(b.i / dim); // remove two nodes involved

      removeNode(p);
      removeNode(p.next);
      p = start = b;
    }

    p = p.next;
  } while (p !== start);

  return p;
} // try splitting polygon into two and triangulate them independently


function splitEarcut(start, triangles, dim, minX, minY, size) {
  // look for a valid diagonal that divides the polygon into two
  var a = start;

  do {
    var b = a.next.next;

    while (b !== a.prev) {
      if (a.i !== b.i && isValidDiagonal(a, b)) {
        // split the polygon in two by the diagonal
        var c = splitPolygon(a, b); // filter colinear points around the cuts

        a = filterPoints(a, a.next);
        c = filterPoints(c, c.next); // run earcut on each half

        earcutLinked(a, triangles, dim, minX, minY, size);
        earcutLinked(c, triangles, dim, minX, minY, size);
        return;
      }

      b = b.next;
    }

    a = a.next;
  } while (a !== start);
} // link every hole into the outer loop, producing a single-ring polygon without holes


function eliminateHoles(data, holeIndices, outerNode, dim) {
  var queue = [],
      i,
      len,
      start,
      end,
      list;

  for (i = 0, len = holeIndices.length; i < len; i++) {
    start = holeIndices[i] * dim;
    end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
    list = linkedList(data, start, end, dim, false);
    if (list === list.next) list.steiner = true;
    queue.push(getLeftmost(list));
  }

  queue.sort(compareX); // process holes from left to right

  for (i = 0; i < queue.length; i++) {
    eliminateHole(queue[i], outerNode);
    outerNode = filterPoints(outerNode, outerNode.next);
  }

  return outerNode;
}

function compareX(a, b) {
  return a.x - b.x;
} // find a bridge between vertices that connects hole with an outer ring and and link it


function eliminateHole(hole, outerNode) {
  outerNode = findHoleBridge(hole, outerNode);

  if (outerNode) {
    var b = splitPolygon(outerNode, hole);
    filterPoints(b, b.next);
  }
} // David Eberly's algorithm for finding a bridge between hole and outer polygon


function findHoleBridge(hole, outerNode) {
  var p = outerNode,
      hx = hole.x,
      hy = hole.y,
      qx = -Infinity,
      m; // find a segment intersected by a ray from the hole's leftmost point to the left;
  // segment's endpoint with lesser x will be potential connection point

  do {
    if (hy <= p.y && hy >= p.next.y) {
      var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);

      if (x <= hx && x > qx) {
        qx = x;

        if (x === hx) {
          if (hy === p.y) return p;
          if (hy === p.next.y) return p.next;
        }

        m = p.x < p.next.x ? p : p.next;
      }
    }

    p = p.next;
  } while (p !== outerNode);

  if (!m) return null;
  if (hx === qx) return m.prev; // hole touches outer segment; pick lower endpoint
  // look for points inside the triangle of hole point, segment intersection and endpoint;
  // if there are no points found, we have a valid connection;
  // otherwise choose the point of the minimum angle with the ray as connection point

  var stop = m,
      mx = m.x,
      my = m.y,
      tanMin = Infinity,
      tan;
  p = m.next;

  while (p !== stop) {
    if (hx >= p.x && p.x >= mx && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
      tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

      if ((tan < tanMin || tan === tanMin && p.x > m.x) && locallyInside(p, hole)) {
        m = p;
        tanMin = tan;
      }
    }

    p = p.next;
  }

  return m;
} // interlink polygon nodes in z-order


function indexCurve(start, minX, minY, size) {
  var p = start;

  do {
    if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, size);
    p.prevZ = p.prev;
    p.nextZ = p.next;
    p = p.next;
  } while (p !== start);

  p.prevZ.nextZ = null;
  p.prevZ = null;
  sortLinked(p);
} // Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html


function sortLinked(list) {
  var i,
      p,
      q,
      e,
      tail,
      numMerges,
      pSize,
      qSize,
      inSize = 1;

  do {
    p = list;
    list = null;
    tail = null;
    numMerges = 0;

    while (p) {
      numMerges++;
      q = p;
      pSize = 0;

      for (i = 0; i < inSize; i++) {
        pSize++;
        q = q.nextZ;
        if (!q) break;
      }

      qSize = inSize;

      while (pSize > 0 || qSize > 0 && q) {
        if (pSize === 0) {
          e = q;
          q = q.nextZ;
          qSize--;
        } else if (qSize === 0 || !q) {
          e = p;
          p = p.nextZ;
          pSize--;
        } else if (p.z <= q.z) {
          e = p;
          p = p.nextZ;
          pSize--;
        } else {
          e = q;
          q = q.nextZ;
          qSize--;
        }

        if (tail) tail.nextZ = e;else list = e;
        e.prevZ = tail;
        tail = e;
      }

      p = q;
    }

    tail.nextZ = null;
    inSize *= 2;
  } while (numMerges > 1);

  return list;
} // z-order of a point given coords and size of the data bounding box


function zOrder(x, y, minX, minY, size) {
  // coords are transformed into non-negative 15-bit integer range
  x = 32767 * (x - minX) / size;
  y = 32767 * (y - minY) / size;
  x = (x | x << 8) & 0x00FF00FF;
  x = (x | x << 4) & 0x0F0F0F0F;
  x = (x | x << 2) & 0x33333333;
  x = (x | x << 1) & 0x55555555;
  y = (y | y << 8) & 0x00FF00FF;
  y = (y | y << 4) & 0x0F0F0F0F;
  y = (y | y << 2) & 0x33333333;
  y = (y | y << 1) & 0x55555555;
  return x | y << 1;
} // find the leftmost node of a polygon ring


function getLeftmost(start) {
  var p = start,
      leftmost = start;

  do {
    if (p.x < leftmost.x) leftmost = p;
    p = p.next;
  } while (p !== start);

  return leftmost;
} // check if a point lies within a convex triangle


function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
  return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 && (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 && (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
} // check if a diagonal between two polygon nodes is valid (lies in polygon interior)


function isValidDiagonal(a, b) {
  return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b);
} // signed area of a triangle


function area(p, q, r) {
  return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
} // check if two points are equal


function equals(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
} // check if two segments intersect


function intersects(p1, q1, p2, q2) {
  if (equals(p1, q1) && equals(p2, q2) || equals(p1, q2) && equals(p2, q1)) return true;
  return area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 && area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0;
} // check if a polygon diagonal intersects any polygon segments


function intersectsPolygon(a, b) {
  var p = a;

  do {
    if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b)) return true;
    p = p.next;
  } while (p !== a);

  return false;
} // check if a polygon diagonal is locally inside the polygon


function locallyInside(a, b) {
  return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
} // check if the middle point of a polygon diagonal is inside the polygon


function middleInside(a, b) {
  var p = a,
      inside = false,
      px = (a.x + b.x) / 2,
      py = (a.y + b.y) / 2;

  do {
    if (p.y > py !== p.next.y > py && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x) inside = !inside;
    p = p.next;
  } while (p !== a);

  return inside;
} // link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring


function splitPolygon(a, b) {
  var a2 = new Node(a.i, a.x, a.y),
      b2 = new Node(b.i, b.x, b.y),
      an = a.next,
      bp = b.prev;
  a.next = b;
  b.prev = a;
  a2.next = an;
  an.prev = a2;
  b2.next = a2;
  a2.prev = b2;
  bp.next = b2;
  b2.prev = bp;
  return b2;
} // create a node and optionally link it with previous one (in a circular doubly linked list)


function insertNode(i, x, y, last) {
  var p = new Node(i, x, y);

  if (!last) {
    p.prev = p;
    p.next = p;
  } else {
    p.next = last.next;
    p.prev = last;
    last.next.prev = p;
    last.next = p;
  }

  return p;
}

function removeNode(p) {
  p.next.prev = p.prev;
  p.prev.next = p.next;
  if (p.prevZ) p.prevZ.nextZ = p.nextZ;
  if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}

function Node(i, x, y) {
  // vertice index in coordinates array
  this.i = i; // vertex coordinates

  this.x = x;
  this.y = y; // previous and next vertice nodes in a polygon ring

  this.prev = null;
  this.next = null; // z-order curve value

  this.z = null; // previous and next nodes in z-order

  this.prevZ = null;
  this.nextZ = null; // indicates whether this is a steiner point

  this.steiner = false;
} // return a percentage difference between the polygon area and its triangulation area;
// used to verify correctness of triangulation


earcut.deviation = function (data, holeIndices, dim, triangles) {
  var hasHoles = holeIndices && holeIndices.length;
  var outerLen = hasHoles ? holeIndices[0] * dim : data.length;
  var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));

  if (hasHoles) {
    for (var i = 0, len = holeIndices.length; i < len; i++) {
      var start = holeIndices[i] * dim;
      var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
      polygonArea -= Math.abs(signedArea(data, start, end, dim));
    }
  }

  var trianglesArea = 0;

  for (i = 0; i < triangles.length; i += 3) {
    var a = triangles[i] * dim;
    var b = triangles[i + 1] * dim;
    var c = triangles[i + 2] * dim;
    trianglesArea += Math.abs((data[a] - data[c]) * (data[b + 1] - data[a + 1]) - (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
  }

  return polygonArea === 0 && trianglesArea === 0 ? 0 : Math.abs((trianglesArea - polygonArea) / polygonArea);
};

function signedArea(data, start, end, dim) {
  var sum = 0;

  for (var i = start, j = end - dim; i < end; i += dim) {
    sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
    j = i;
  }

  return sum;
} // turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts


earcut.flatten = function (data) {
  var dim = data[0][0].length,
      result = {
    vertices: [],
    holes: [],
    dimensions: dim
  },
      holeIndex = 0;

  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
      for (var d = 0; d < dim; d++) {
        result.vertices.push(data[i][j][d]);
      }
    }

    if (i > 0) {
      holeIndex += data[i - 1].length;
      result.holes.push(holeIndex);
    }
  }

  return result;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL2Fzc2VtYmxlcnMvZ3JhcGhpY3MvZWFyY3V0LmpzIl0sIm5hbWVzIjpbImNjIiwiR3JhcGhpY3MiLCJlYXJjdXQiLCJtb2R1bGUiLCJleHBvcnRzIiwiZGF0YSIsImhvbGVJbmRpY2VzIiwiZGltIiwiaGFzSG9sZXMiLCJsZW5ndGgiLCJvdXRlckxlbiIsIm91dGVyTm9kZSIsImxpbmtlZExpc3QiLCJ0cmlhbmdsZXMiLCJtaW5YIiwibWluWSIsIm1heFgiLCJtYXhZIiwieCIsInkiLCJzaXplIiwiZWxpbWluYXRlSG9sZXMiLCJpIiwiTWF0aCIsIm1heCIsImVhcmN1dExpbmtlZCIsInN0YXJ0IiwiZW5kIiwiY2xvY2t3aXNlIiwibGFzdCIsInNpZ25lZEFyZWEiLCJpbnNlcnROb2RlIiwiZXF1YWxzIiwibmV4dCIsInJlbW92ZU5vZGUiLCJmaWx0ZXJQb2ludHMiLCJwIiwiYWdhaW4iLCJzdGVpbmVyIiwiYXJlYSIsInByZXYiLCJlYXIiLCJwYXNzIiwiaW5kZXhDdXJ2ZSIsInN0b3AiLCJpc0Vhckhhc2hlZCIsImlzRWFyIiwicHVzaCIsImN1cmVMb2NhbEludGVyc2VjdGlvbnMiLCJzcGxpdEVhcmN1dCIsImEiLCJiIiwiYyIsInBvaW50SW5UcmlhbmdsZSIsIm1pblRYIiwibWluVFkiLCJtYXhUWCIsIm1heFRZIiwibWluWiIsInpPcmRlciIsIm1heFoiLCJuZXh0WiIsInoiLCJwcmV2WiIsImludGVyc2VjdHMiLCJsb2NhbGx5SW5zaWRlIiwiaXNWYWxpZERpYWdvbmFsIiwic3BsaXRQb2x5Z29uIiwicXVldWUiLCJsZW4iLCJsaXN0IiwiZ2V0TGVmdG1vc3QiLCJzb3J0IiwiY29tcGFyZVgiLCJlbGltaW5hdGVIb2xlIiwiaG9sZSIsImZpbmRIb2xlQnJpZGdlIiwiaHgiLCJoeSIsInF4IiwiSW5maW5pdHkiLCJtIiwibXgiLCJteSIsInRhbk1pbiIsInRhbiIsImFicyIsInNvcnRMaW5rZWQiLCJxIiwiZSIsInRhaWwiLCJudW1NZXJnZXMiLCJwU2l6ZSIsInFTaXplIiwiaW5TaXplIiwibGVmdG1vc3QiLCJheCIsImF5IiwiYngiLCJieSIsImN4IiwiY3kiLCJweCIsInB5IiwiaW50ZXJzZWN0c1BvbHlnb24iLCJtaWRkbGVJbnNpZGUiLCJyIiwicDEiLCJwMiIsInExIiwicTIiLCJpbnNpZGUiLCJhMiIsIk5vZGUiLCJiMiIsImFuIiwiYnAiLCJkZXZpYXRpb24iLCJwb2x5Z29uQXJlYSIsInRyaWFuZ2xlc0FyZWEiLCJzdW0iLCJqIiwiZmxhdHRlbiIsInJlc3VsdCIsInZlcnRpY2VzIiwiaG9sZXMiLCJkaW1lbnNpb25zIiwiaG9sZUluZGV4IiwiZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOztBQUVBQSxFQUFFLENBQUNDLFFBQUgsQ0FBWUMsTUFBWixHQUFxQkMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCRixNQUF0Qzs7QUFFQSxTQUFTQSxNQUFULENBQWdCRyxJQUFoQixFQUFzQkMsV0FBdEIsRUFBbUNDLEdBQW5DLEVBQXdDO0FBRXBDQSxFQUFBQSxHQUFHLEdBQUdBLEdBQUcsSUFBSSxDQUFiO0FBRUEsTUFBSUMsUUFBUSxHQUFHRixXQUFXLElBQUlBLFdBQVcsQ0FBQ0csTUFBMUM7QUFBQSxNQUNJQyxRQUFRLEdBQUdGLFFBQVEsR0FBR0YsV0FBVyxDQUFDLENBQUQsQ0FBWCxHQUFpQkMsR0FBcEIsR0FBMEJGLElBQUksQ0FBQ0ksTUFEdEQ7QUFBQSxNQUVJRSxTQUFTLEdBQUdDLFVBQVUsQ0FBQ1AsSUFBRCxFQUFPLENBQVAsRUFBVUssUUFBVixFQUFvQkgsR0FBcEIsRUFBeUIsSUFBekIsQ0FGMUI7QUFBQSxNQUdJTSxTQUFTLEdBQUcsRUFIaEI7QUFLQSxNQUFJLENBQUNGLFNBQUwsRUFBZ0IsT0FBT0UsU0FBUDtBQUVoQixNQUFJQyxJQUFKLEVBQVVDLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCQyxJQUF0QixFQUE0QkMsQ0FBNUIsRUFBK0JDLENBQS9CLEVBQWtDQyxJQUFsQztBQUVBLE1BQUlaLFFBQUosRUFBY0csU0FBUyxHQUFHVSxjQUFjLENBQUNoQixJQUFELEVBQU9DLFdBQVAsRUFBb0JLLFNBQXBCLEVBQStCSixHQUEvQixDQUExQixDQWJzQixDQWVwQzs7QUFDQSxNQUFJRixJQUFJLENBQUNJLE1BQUwsR0FBYyxLQUFLRixHQUF2QixFQUE0QjtBQUN4Qk8sSUFBQUEsSUFBSSxHQUFHRSxJQUFJLEdBQUdYLElBQUksQ0FBQyxDQUFELENBQWxCO0FBQ0FVLElBQUFBLElBQUksR0FBR0UsSUFBSSxHQUFHWixJQUFJLENBQUMsQ0FBRCxDQUFsQjs7QUFFQSxTQUFLLElBQUlpQixDQUFDLEdBQUdmLEdBQWIsRUFBa0JlLENBQUMsR0FBR1osUUFBdEIsRUFBZ0NZLENBQUMsSUFBSWYsR0FBckMsRUFBMEM7QUFDdENXLE1BQUFBLENBQUMsR0FBR2IsSUFBSSxDQUFDaUIsQ0FBRCxDQUFSO0FBQ0FILE1BQUFBLENBQUMsR0FBR2QsSUFBSSxDQUFDaUIsQ0FBQyxHQUFHLENBQUwsQ0FBUjtBQUNBLFVBQUlKLENBQUMsR0FBR0osSUFBUixFQUFjQSxJQUFJLEdBQUdJLENBQVA7QUFDZCxVQUFJQyxDQUFDLEdBQUdKLElBQVIsRUFBY0EsSUFBSSxHQUFHSSxDQUFQO0FBQ2QsVUFBSUQsQ0FBQyxHQUFHRixJQUFSLEVBQWNBLElBQUksR0FBR0UsQ0FBUDtBQUNkLFVBQUlDLENBQUMsR0FBR0YsSUFBUixFQUFjQSxJQUFJLEdBQUdFLENBQVA7QUFDakIsS0FYdUIsQ0FheEI7OztBQUNBQyxJQUFBQSxJQUFJLEdBQUdHLElBQUksQ0FBQ0MsR0FBTCxDQUFTUixJQUFJLEdBQUdGLElBQWhCLEVBQXNCRyxJQUFJLEdBQUdGLElBQTdCLENBQVA7QUFDSDs7QUFFRFUsRUFBQUEsWUFBWSxDQUFDZCxTQUFELEVBQVlFLFNBQVosRUFBdUJOLEdBQXZCLEVBQTRCTyxJQUE1QixFQUFrQ0MsSUFBbEMsRUFBd0NLLElBQXhDLENBQVo7QUFFQSxTQUFPUCxTQUFQO0FBQ0gsRUFFRDs7O0FBQ0EsU0FBU0QsVUFBVCxDQUFvQlAsSUFBcEIsRUFBMEJxQixLQUExQixFQUFpQ0MsR0FBakMsRUFBc0NwQixHQUF0QyxFQUEyQ3FCLFNBQTNDLEVBQXNEO0FBQ2xELE1BQUlOLENBQUosRUFBT08sSUFBUDs7QUFFQSxNQUFJRCxTQUFTLEtBQU1FLFVBQVUsQ0FBQ3pCLElBQUQsRUFBT3FCLEtBQVAsRUFBY0MsR0FBZCxFQUFtQnBCLEdBQW5CLENBQVYsR0FBb0MsQ0FBdkQsRUFBMkQ7QUFDdkQsU0FBS2UsQ0FBQyxHQUFHSSxLQUFULEVBQWdCSixDQUFDLEdBQUdLLEdBQXBCLEVBQXlCTCxDQUFDLElBQUlmLEdBQTlCO0FBQW1Dc0IsTUFBQUEsSUFBSSxHQUFHRSxVQUFVLENBQUNULENBQUQsRUFBSWpCLElBQUksQ0FBQ2lCLENBQUQsQ0FBUixFQUFhakIsSUFBSSxDQUFDaUIsQ0FBQyxHQUFHLENBQUwsQ0FBakIsRUFBMEJPLElBQTFCLENBQWpCO0FBQW5DO0FBQ0gsR0FGRCxNQUVPO0FBQ0gsU0FBS1AsQ0FBQyxHQUFHSyxHQUFHLEdBQUdwQixHQUFmLEVBQW9CZSxDQUFDLElBQUlJLEtBQXpCLEVBQWdDSixDQUFDLElBQUlmLEdBQXJDO0FBQTBDc0IsTUFBQUEsSUFBSSxHQUFHRSxVQUFVLENBQUNULENBQUQsRUFBSWpCLElBQUksQ0FBQ2lCLENBQUQsQ0FBUixFQUFhakIsSUFBSSxDQUFDaUIsQ0FBQyxHQUFHLENBQUwsQ0FBakIsRUFBMEJPLElBQTFCLENBQWpCO0FBQTFDO0FBQ0g7O0FBRUQsTUFBSUEsSUFBSSxJQUFJRyxNQUFNLENBQUNILElBQUQsRUFBT0EsSUFBSSxDQUFDSSxJQUFaLENBQWxCLEVBQXFDO0FBQ2pDQyxJQUFBQSxVQUFVLENBQUNMLElBQUQsQ0FBVjtBQUNBQSxJQUFBQSxJQUFJLEdBQUdBLElBQUksQ0FBQ0ksSUFBWjtBQUNIOztBQUVELFNBQU9KLElBQVA7QUFDSCxFQUVEOzs7QUFDQSxTQUFTTSxZQUFULENBQXNCVCxLQUF0QixFQUE2QkMsR0FBN0IsRUFBa0M7QUFDOUIsTUFBSSxDQUFDRCxLQUFMLEVBQVksT0FBT0EsS0FBUDtBQUNaLE1BQUksQ0FBQ0MsR0FBTCxFQUFVQSxHQUFHLEdBQUdELEtBQU47QUFFVixNQUFJVSxDQUFDLEdBQUdWLEtBQVI7QUFBQSxNQUNJVyxLQURKOztBQUVBLEtBQUc7QUFDQ0EsSUFBQUEsS0FBSyxHQUFHLEtBQVI7O0FBRUEsUUFBSSxDQUFDRCxDQUFDLENBQUNFLE9BQUgsS0FBZU4sTUFBTSxDQUFDSSxDQUFELEVBQUlBLENBQUMsQ0FBQ0gsSUFBTixDQUFOLElBQXFCTSxJQUFJLENBQUNILENBQUMsQ0FBQ0ksSUFBSCxFQUFTSixDQUFULEVBQVlBLENBQUMsQ0FBQ0gsSUFBZCxDQUFKLEtBQTRCLENBQWhFLENBQUosRUFBd0U7QUFDcEVDLE1BQUFBLFVBQVUsQ0FBQ0UsQ0FBRCxDQUFWO0FBQ0FBLE1BQUFBLENBQUMsR0FBR1QsR0FBRyxHQUFHUyxDQUFDLENBQUNJLElBQVo7QUFDQSxVQUFJSixDQUFDLEtBQUtBLENBQUMsQ0FBQ0gsSUFBWixFQUFrQixPQUFPLElBQVA7QUFDbEJJLE1BQUFBLEtBQUssR0FBRyxJQUFSO0FBRUgsS0FORCxNQU1PO0FBQ0hELE1BQUFBLENBQUMsR0FBR0EsQ0FBQyxDQUFDSCxJQUFOO0FBQ0g7QUFDSixHQVpELFFBWVNJLEtBQUssSUFBSUQsQ0FBQyxLQUFLVCxHQVp4Qjs7QUFjQSxTQUFPQSxHQUFQO0FBQ0gsRUFFRDs7O0FBQ0EsU0FBU0YsWUFBVCxDQUFzQmdCLEdBQXRCLEVBQTJCNUIsU0FBM0IsRUFBc0NOLEdBQXRDLEVBQTJDTyxJQUEzQyxFQUFpREMsSUFBakQsRUFBdURLLElBQXZELEVBQTZEc0IsSUFBN0QsRUFBbUU7QUFDL0QsTUFBSSxDQUFDRCxHQUFMLEVBQVUsT0FEcUQsQ0FHL0Q7O0FBQ0EsTUFBSSxDQUFDQyxJQUFELElBQVN0QixJQUFiLEVBQW1CdUIsVUFBVSxDQUFDRixHQUFELEVBQU0zQixJQUFOLEVBQVlDLElBQVosRUFBa0JLLElBQWxCLENBQVY7QUFFbkIsTUFBSXdCLElBQUksR0FBR0gsR0FBWDtBQUFBLE1BQ0lELElBREo7QUFBQSxNQUNVUCxJQURWLENBTitELENBUy9EOztBQUNBLFNBQU9RLEdBQUcsQ0FBQ0QsSUFBSixLQUFhQyxHQUFHLENBQUNSLElBQXhCLEVBQThCO0FBQzFCTyxJQUFBQSxJQUFJLEdBQUdDLEdBQUcsQ0FBQ0QsSUFBWDtBQUNBUCxJQUFBQSxJQUFJLEdBQUdRLEdBQUcsQ0FBQ1IsSUFBWDs7QUFFQSxRQUFJYixJQUFJLEdBQUd5QixXQUFXLENBQUNKLEdBQUQsRUFBTTNCLElBQU4sRUFBWUMsSUFBWixFQUFrQkssSUFBbEIsQ0FBZCxHQUF3QzBCLEtBQUssQ0FBQ0wsR0FBRCxDQUFyRCxFQUE0RDtBQUN4RDtBQUNBNUIsTUFBQUEsU0FBUyxDQUFDa0MsSUFBVixDQUFlUCxJQUFJLENBQUNsQixDQUFMLEdBQVNmLEdBQXhCO0FBQ0FNLE1BQUFBLFNBQVMsQ0FBQ2tDLElBQVYsQ0FBZU4sR0FBRyxDQUFDbkIsQ0FBSixHQUFRZixHQUF2QjtBQUNBTSxNQUFBQSxTQUFTLENBQUNrQyxJQUFWLENBQWVkLElBQUksQ0FBQ1gsQ0FBTCxHQUFTZixHQUF4QjtBQUVBMkIsTUFBQUEsVUFBVSxDQUFDTyxHQUFELENBQVYsQ0FOd0QsQ0FReEQ7O0FBQ0FBLE1BQUFBLEdBQUcsR0FBR1IsSUFBSSxDQUFDQSxJQUFYO0FBQ0FXLE1BQUFBLElBQUksR0FBR1gsSUFBSSxDQUFDQSxJQUFaO0FBRUE7QUFDSDs7QUFFRFEsSUFBQUEsR0FBRyxHQUFHUixJQUFOLENBbkIwQixDQXFCMUI7O0FBQ0EsUUFBSVEsR0FBRyxLQUFLRyxJQUFaLEVBQWtCO0FBQ2Q7QUFDQSxVQUFJLENBQUNGLElBQUwsRUFBVztBQUNQakIsUUFBQUEsWUFBWSxDQUFDVSxZQUFZLENBQUNNLEdBQUQsQ0FBYixFQUFvQjVCLFNBQXBCLEVBQStCTixHQUEvQixFQUFvQ08sSUFBcEMsRUFBMENDLElBQTFDLEVBQWdESyxJQUFoRCxFQUFzRCxDQUF0RCxDQUFaLENBRE8sQ0FHWDtBQUNDLE9BSkQsTUFJTyxJQUFJc0IsSUFBSSxLQUFLLENBQWIsRUFBZ0I7QUFDbkJELFFBQUFBLEdBQUcsR0FBR08sc0JBQXNCLENBQUNQLEdBQUQsRUFBTTVCLFNBQU4sRUFBaUJOLEdBQWpCLENBQTVCO0FBQ0FrQixRQUFBQSxZQUFZLENBQUNnQixHQUFELEVBQU01QixTQUFOLEVBQWlCTixHQUFqQixFQUFzQk8sSUFBdEIsRUFBNEJDLElBQTVCLEVBQWtDSyxJQUFsQyxFQUF3QyxDQUF4QyxDQUFaLENBRm1CLENBSXZCO0FBQ0MsT0FMTSxNQUtBLElBQUlzQixJQUFJLEtBQUssQ0FBYixFQUFnQjtBQUNuQk8sUUFBQUEsV0FBVyxDQUFDUixHQUFELEVBQU01QixTQUFOLEVBQWlCTixHQUFqQixFQUFzQk8sSUFBdEIsRUFBNEJDLElBQTVCLEVBQWtDSyxJQUFsQyxDQUFYO0FBQ0g7O0FBRUQ7QUFDSDtBQUNKO0FBQ0osRUFFRDs7O0FBQ0EsU0FBUzBCLEtBQVQsQ0FBZUwsR0FBZixFQUFvQjtBQUNoQixNQUFJUyxDQUFDLEdBQUdULEdBQUcsQ0FBQ0QsSUFBWjtBQUFBLE1BQ0lXLENBQUMsR0FBR1YsR0FEUjtBQUFBLE1BRUlXLENBQUMsR0FBR1gsR0FBRyxDQUFDUixJQUZaO0FBSUEsTUFBSU0sSUFBSSxDQUFDVyxDQUFELEVBQUlDLENBQUosRUFBT0MsQ0FBUCxDQUFKLElBQWlCLENBQXJCLEVBQXdCLE9BQU8sS0FBUCxDQUxSLENBS3NCO0FBRXRDOztBQUNBLE1BQUloQixDQUFDLEdBQUdLLEdBQUcsQ0FBQ1IsSUFBSixDQUFTQSxJQUFqQjs7QUFFQSxTQUFPRyxDQUFDLEtBQUtLLEdBQUcsQ0FBQ0QsSUFBakIsRUFBdUI7QUFDbkIsUUFBSWEsZUFBZSxDQUFDSCxDQUFDLENBQUNoQyxDQUFILEVBQU1nQyxDQUFDLENBQUMvQixDQUFSLEVBQVdnQyxDQUFDLENBQUNqQyxDQUFiLEVBQWdCaUMsQ0FBQyxDQUFDaEMsQ0FBbEIsRUFBcUJpQyxDQUFDLENBQUNsQyxDQUF2QixFQUEwQmtDLENBQUMsQ0FBQ2pDLENBQTVCLEVBQStCaUIsQ0FBQyxDQUFDbEIsQ0FBakMsRUFBb0NrQixDQUFDLENBQUNqQixDQUF0QyxDQUFmLElBQ0FvQixJQUFJLENBQUNILENBQUMsQ0FBQ0ksSUFBSCxFQUFTSixDQUFULEVBQVlBLENBQUMsQ0FBQ0gsSUFBZCxDQUFKLElBQTJCLENBRC9CLEVBQ2tDLE9BQU8sS0FBUDtBQUNsQ0csSUFBQUEsQ0FBQyxHQUFHQSxDQUFDLENBQUNILElBQU47QUFDSDs7QUFFRCxTQUFPLElBQVA7QUFDSDs7QUFFRCxTQUFTWSxXQUFULENBQXFCSixHQUFyQixFQUEwQjNCLElBQTFCLEVBQWdDQyxJQUFoQyxFQUFzQ0ssSUFBdEMsRUFBNEM7QUFDeEMsTUFBSThCLENBQUMsR0FBR1QsR0FBRyxDQUFDRCxJQUFaO0FBQUEsTUFDSVcsQ0FBQyxHQUFHVixHQURSO0FBQUEsTUFFSVcsQ0FBQyxHQUFHWCxHQUFHLENBQUNSLElBRlo7QUFJQSxNQUFJTSxJQUFJLENBQUNXLENBQUQsRUFBSUMsQ0FBSixFQUFPQyxDQUFQLENBQUosSUFBaUIsQ0FBckIsRUFBd0IsT0FBTyxLQUFQLENBTGdCLENBS0Y7QUFFdEM7O0FBQ0EsTUFBSUUsS0FBSyxHQUFHSixDQUFDLENBQUNoQyxDQUFGLEdBQU1pQyxDQUFDLENBQUNqQyxDQUFSLEdBQWFnQyxDQUFDLENBQUNoQyxDQUFGLEdBQU1rQyxDQUFDLENBQUNsQyxDQUFSLEdBQVlnQyxDQUFDLENBQUNoQyxDQUFkLEdBQWtCa0MsQ0FBQyxDQUFDbEMsQ0FBakMsR0FBdUNpQyxDQUFDLENBQUNqQyxDQUFGLEdBQU1rQyxDQUFDLENBQUNsQyxDQUFSLEdBQVlpQyxDQUFDLENBQUNqQyxDQUFkLEdBQWtCa0MsQ0FBQyxDQUFDbEMsQ0FBdkU7QUFBQSxNQUNJcUMsS0FBSyxHQUFHTCxDQUFDLENBQUMvQixDQUFGLEdBQU1nQyxDQUFDLENBQUNoQyxDQUFSLEdBQWErQixDQUFDLENBQUMvQixDQUFGLEdBQU1pQyxDQUFDLENBQUNqQyxDQUFSLEdBQVkrQixDQUFDLENBQUMvQixDQUFkLEdBQWtCaUMsQ0FBQyxDQUFDakMsQ0FBakMsR0FBdUNnQyxDQUFDLENBQUNoQyxDQUFGLEdBQU1pQyxDQUFDLENBQUNqQyxDQUFSLEdBQVlnQyxDQUFDLENBQUNoQyxDQUFkLEdBQWtCaUMsQ0FBQyxDQUFDakMsQ0FEdkU7QUFBQSxNQUVJcUMsS0FBSyxHQUFHTixDQUFDLENBQUNoQyxDQUFGLEdBQU1pQyxDQUFDLENBQUNqQyxDQUFSLEdBQWFnQyxDQUFDLENBQUNoQyxDQUFGLEdBQU1rQyxDQUFDLENBQUNsQyxDQUFSLEdBQVlnQyxDQUFDLENBQUNoQyxDQUFkLEdBQWtCa0MsQ0FBQyxDQUFDbEMsQ0FBakMsR0FBdUNpQyxDQUFDLENBQUNqQyxDQUFGLEdBQU1rQyxDQUFDLENBQUNsQyxDQUFSLEdBQVlpQyxDQUFDLENBQUNqQyxDQUFkLEdBQWtCa0MsQ0FBQyxDQUFDbEMsQ0FGdkU7QUFBQSxNQUdJdUMsS0FBSyxHQUFHUCxDQUFDLENBQUMvQixDQUFGLEdBQU1nQyxDQUFDLENBQUNoQyxDQUFSLEdBQWErQixDQUFDLENBQUMvQixDQUFGLEdBQU1pQyxDQUFDLENBQUNqQyxDQUFSLEdBQVkrQixDQUFDLENBQUMvQixDQUFkLEdBQWtCaUMsQ0FBQyxDQUFDakMsQ0FBakMsR0FBdUNnQyxDQUFDLENBQUNoQyxDQUFGLEdBQU1pQyxDQUFDLENBQUNqQyxDQUFSLEdBQVlnQyxDQUFDLENBQUNoQyxDQUFkLEdBQWtCaUMsQ0FBQyxDQUFDakMsQ0FIdkUsQ0FSd0MsQ0FheEM7O0FBQ0EsTUFBSXVDLElBQUksR0FBR0MsTUFBTSxDQUFDTCxLQUFELEVBQVFDLEtBQVIsRUFBZXpDLElBQWYsRUFBcUJDLElBQXJCLEVBQTJCSyxJQUEzQixDQUFqQjtBQUFBLE1BQ0l3QyxJQUFJLEdBQUdELE1BQU0sQ0FBQ0gsS0FBRCxFQUFRQyxLQUFSLEVBQWUzQyxJQUFmLEVBQXFCQyxJQUFyQixFQUEyQkssSUFBM0IsQ0FEakIsQ0Fkd0MsQ0FpQnhDOztBQUNBLE1BQUlnQixDQUFDLEdBQUdLLEdBQUcsQ0FBQ29CLEtBQVo7O0FBRUEsU0FBT3pCLENBQUMsSUFBSUEsQ0FBQyxDQUFDMEIsQ0FBRixJQUFPRixJQUFuQixFQUF5QjtBQUNyQixRQUFJeEIsQ0FBQyxLQUFLSyxHQUFHLENBQUNELElBQVYsSUFBa0JKLENBQUMsS0FBS0ssR0FBRyxDQUFDUixJQUE1QixJQUNBb0IsZUFBZSxDQUFDSCxDQUFDLENBQUNoQyxDQUFILEVBQU1nQyxDQUFDLENBQUMvQixDQUFSLEVBQVdnQyxDQUFDLENBQUNqQyxDQUFiLEVBQWdCaUMsQ0FBQyxDQUFDaEMsQ0FBbEIsRUFBcUJpQyxDQUFDLENBQUNsQyxDQUF2QixFQUEwQmtDLENBQUMsQ0FBQ2pDLENBQTVCLEVBQStCaUIsQ0FBQyxDQUFDbEIsQ0FBakMsRUFBb0NrQixDQUFDLENBQUNqQixDQUF0QyxDQURmLElBRUFvQixJQUFJLENBQUNILENBQUMsQ0FBQ0ksSUFBSCxFQUFTSixDQUFULEVBQVlBLENBQUMsQ0FBQ0gsSUFBZCxDQUFKLElBQTJCLENBRi9CLEVBRWtDLE9BQU8sS0FBUDtBQUNsQ0csSUFBQUEsQ0FBQyxHQUFHQSxDQUFDLENBQUN5QixLQUFOO0FBQ0gsR0F6QnVDLENBMkJ4Qzs7O0FBQ0F6QixFQUFBQSxDQUFDLEdBQUdLLEdBQUcsQ0FBQ3NCLEtBQVI7O0FBRUEsU0FBTzNCLENBQUMsSUFBSUEsQ0FBQyxDQUFDMEIsQ0FBRixJQUFPSixJQUFuQixFQUF5QjtBQUNyQixRQUFJdEIsQ0FBQyxLQUFLSyxHQUFHLENBQUNELElBQVYsSUFBa0JKLENBQUMsS0FBS0ssR0FBRyxDQUFDUixJQUE1QixJQUNBb0IsZUFBZSxDQUFDSCxDQUFDLENBQUNoQyxDQUFILEVBQU1nQyxDQUFDLENBQUMvQixDQUFSLEVBQVdnQyxDQUFDLENBQUNqQyxDQUFiLEVBQWdCaUMsQ0FBQyxDQUFDaEMsQ0FBbEIsRUFBcUJpQyxDQUFDLENBQUNsQyxDQUF2QixFQUEwQmtDLENBQUMsQ0FBQ2pDLENBQTVCLEVBQStCaUIsQ0FBQyxDQUFDbEIsQ0FBakMsRUFBb0NrQixDQUFDLENBQUNqQixDQUF0QyxDQURmLElBRUFvQixJQUFJLENBQUNILENBQUMsQ0FBQ0ksSUFBSCxFQUFTSixDQUFULEVBQVlBLENBQUMsQ0FBQ0gsSUFBZCxDQUFKLElBQTJCLENBRi9CLEVBRWtDLE9BQU8sS0FBUDtBQUNsQ0csSUFBQUEsQ0FBQyxHQUFHQSxDQUFDLENBQUMyQixLQUFOO0FBQ0g7O0FBRUQsU0FBTyxJQUFQO0FBQ0gsRUFFRDs7O0FBQ0EsU0FBU2Ysc0JBQVQsQ0FBZ0N0QixLQUFoQyxFQUF1Q2IsU0FBdkMsRUFBa0ROLEdBQWxELEVBQXVEO0FBQ25ELE1BQUk2QixDQUFDLEdBQUdWLEtBQVI7O0FBQ0EsS0FBRztBQUNDLFFBQUl3QixDQUFDLEdBQUdkLENBQUMsQ0FBQ0ksSUFBVjtBQUFBLFFBQ0lXLENBQUMsR0FBR2YsQ0FBQyxDQUFDSCxJQUFGLENBQU9BLElBRGY7O0FBR0EsUUFBSSxDQUFDRCxNQUFNLENBQUNrQixDQUFELEVBQUlDLENBQUosQ0FBUCxJQUFpQmEsVUFBVSxDQUFDZCxDQUFELEVBQUlkLENBQUosRUFBT0EsQ0FBQyxDQUFDSCxJQUFULEVBQWVrQixDQUFmLENBQTNCLElBQWdEYyxhQUFhLENBQUNmLENBQUQsRUFBSUMsQ0FBSixDQUE3RCxJQUF1RWMsYUFBYSxDQUFDZCxDQUFELEVBQUlELENBQUosQ0FBeEYsRUFBZ0c7QUFFNUZyQyxNQUFBQSxTQUFTLENBQUNrQyxJQUFWLENBQWVHLENBQUMsQ0FBQzVCLENBQUYsR0FBTWYsR0FBckI7QUFDQU0sTUFBQUEsU0FBUyxDQUFDa0MsSUFBVixDQUFlWCxDQUFDLENBQUNkLENBQUYsR0FBTWYsR0FBckI7QUFDQU0sTUFBQUEsU0FBUyxDQUFDa0MsSUFBVixDQUFlSSxDQUFDLENBQUM3QixDQUFGLEdBQU1mLEdBQXJCLEVBSjRGLENBTTVGOztBQUNBMkIsTUFBQUEsVUFBVSxDQUFDRSxDQUFELENBQVY7QUFDQUYsTUFBQUEsVUFBVSxDQUFDRSxDQUFDLENBQUNILElBQUgsQ0FBVjtBQUVBRyxNQUFBQSxDQUFDLEdBQUdWLEtBQUssR0FBR3lCLENBQVo7QUFDSDs7QUFDRGYsSUFBQUEsQ0FBQyxHQUFHQSxDQUFDLENBQUNILElBQU47QUFDSCxHQWpCRCxRQWlCU0csQ0FBQyxLQUFLVixLQWpCZjs7QUFtQkEsU0FBT1UsQ0FBUDtBQUNILEVBRUQ7OztBQUNBLFNBQVNhLFdBQVQsQ0FBcUJ2QixLQUFyQixFQUE0QmIsU0FBNUIsRUFBdUNOLEdBQXZDLEVBQTRDTyxJQUE1QyxFQUFrREMsSUFBbEQsRUFBd0RLLElBQXhELEVBQThEO0FBQzFEO0FBQ0EsTUFBSThCLENBQUMsR0FBR3hCLEtBQVI7O0FBQ0EsS0FBRztBQUNDLFFBQUl5QixDQUFDLEdBQUdELENBQUMsQ0FBQ2pCLElBQUYsQ0FBT0EsSUFBZjs7QUFDQSxXQUFPa0IsQ0FBQyxLQUFLRCxDQUFDLENBQUNWLElBQWYsRUFBcUI7QUFDakIsVUFBSVUsQ0FBQyxDQUFDNUIsQ0FBRixLQUFRNkIsQ0FBQyxDQUFDN0IsQ0FBVixJQUFlNEMsZUFBZSxDQUFDaEIsQ0FBRCxFQUFJQyxDQUFKLENBQWxDLEVBQTBDO0FBQ3RDO0FBQ0EsWUFBSUMsQ0FBQyxHQUFHZSxZQUFZLENBQUNqQixDQUFELEVBQUlDLENBQUosQ0FBcEIsQ0FGc0MsQ0FJdEM7O0FBQ0FELFFBQUFBLENBQUMsR0FBR2YsWUFBWSxDQUFDZSxDQUFELEVBQUlBLENBQUMsQ0FBQ2pCLElBQU4sQ0FBaEI7QUFDQW1CLFFBQUFBLENBQUMsR0FBR2pCLFlBQVksQ0FBQ2lCLENBQUQsRUFBSUEsQ0FBQyxDQUFDbkIsSUFBTixDQUFoQixDQU5zQyxDQVF0Qzs7QUFDQVIsUUFBQUEsWUFBWSxDQUFDeUIsQ0FBRCxFQUFJckMsU0FBSixFQUFlTixHQUFmLEVBQW9CTyxJQUFwQixFQUEwQkMsSUFBMUIsRUFBZ0NLLElBQWhDLENBQVo7QUFDQUssUUFBQUEsWUFBWSxDQUFDMkIsQ0FBRCxFQUFJdkMsU0FBSixFQUFlTixHQUFmLEVBQW9CTyxJQUFwQixFQUEwQkMsSUFBMUIsRUFBZ0NLLElBQWhDLENBQVo7QUFDQTtBQUNIOztBQUNEK0IsTUFBQUEsQ0FBQyxHQUFHQSxDQUFDLENBQUNsQixJQUFOO0FBQ0g7O0FBQ0RpQixJQUFBQSxDQUFDLEdBQUdBLENBQUMsQ0FBQ2pCLElBQU47QUFDSCxHQW5CRCxRQW1CU2lCLENBQUMsS0FBS3hCLEtBbkJmO0FBb0JILEVBRUQ7OztBQUNBLFNBQVNMLGNBQVQsQ0FBd0JoQixJQUF4QixFQUE4QkMsV0FBOUIsRUFBMkNLLFNBQTNDLEVBQXNESixHQUF0RCxFQUEyRDtBQUN2RCxNQUFJNkQsS0FBSyxHQUFHLEVBQVo7QUFBQSxNQUNJOUMsQ0FESjtBQUFBLE1BQ08rQyxHQURQO0FBQUEsTUFDWTNDLEtBRFo7QUFBQSxNQUNtQkMsR0FEbkI7QUFBQSxNQUN3QjJDLElBRHhCOztBQUdBLE9BQUtoRCxDQUFDLEdBQUcsQ0FBSixFQUFPK0MsR0FBRyxHQUFHL0QsV0FBVyxDQUFDRyxNQUE5QixFQUFzQ2EsQ0FBQyxHQUFHK0MsR0FBMUMsRUFBK0MvQyxDQUFDLEVBQWhELEVBQW9EO0FBQ2hESSxJQUFBQSxLQUFLLEdBQUdwQixXQUFXLENBQUNnQixDQUFELENBQVgsR0FBaUJmLEdBQXpCO0FBQ0FvQixJQUFBQSxHQUFHLEdBQUdMLENBQUMsR0FBRytDLEdBQUcsR0FBRyxDQUFWLEdBQWMvRCxXQUFXLENBQUNnQixDQUFDLEdBQUcsQ0FBTCxDQUFYLEdBQXFCZixHQUFuQyxHQUF5Q0YsSUFBSSxDQUFDSSxNQUFwRDtBQUNBNkQsSUFBQUEsSUFBSSxHQUFHMUQsVUFBVSxDQUFDUCxJQUFELEVBQU9xQixLQUFQLEVBQWNDLEdBQWQsRUFBbUJwQixHQUFuQixFQUF3QixLQUF4QixDQUFqQjtBQUNBLFFBQUkrRCxJQUFJLEtBQUtBLElBQUksQ0FBQ3JDLElBQWxCLEVBQXdCcUMsSUFBSSxDQUFDaEMsT0FBTCxHQUFlLElBQWY7QUFDeEI4QixJQUFBQSxLQUFLLENBQUNyQixJQUFOLENBQVd3QixXQUFXLENBQUNELElBQUQsQ0FBdEI7QUFDSDs7QUFFREYsRUFBQUEsS0FBSyxDQUFDSSxJQUFOLENBQVdDLFFBQVgsRUFadUQsQ0FjdkQ7O0FBQ0EsT0FBS25ELENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBRzhDLEtBQUssQ0FBQzNELE1BQXRCLEVBQThCYSxDQUFDLEVBQS9CLEVBQW1DO0FBQy9Cb0QsSUFBQUEsYUFBYSxDQUFDTixLQUFLLENBQUM5QyxDQUFELENBQU4sRUFBV1gsU0FBWCxDQUFiO0FBQ0FBLElBQUFBLFNBQVMsR0FBR3dCLFlBQVksQ0FBQ3hCLFNBQUQsRUFBWUEsU0FBUyxDQUFDc0IsSUFBdEIsQ0FBeEI7QUFDSDs7QUFFRCxTQUFPdEIsU0FBUDtBQUNIOztBQUVELFNBQVM4RCxRQUFULENBQWtCdkIsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCO0FBQ3BCLFNBQU9ELENBQUMsQ0FBQ2hDLENBQUYsR0FBTWlDLENBQUMsQ0FBQ2pDLENBQWY7QUFDSCxFQUVEOzs7QUFDQSxTQUFTd0QsYUFBVCxDQUF1QkMsSUFBdkIsRUFBNkJoRSxTQUE3QixFQUF3QztBQUNwQ0EsRUFBQUEsU0FBUyxHQUFHaUUsY0FBYyxDQUFDRCxJQUFELEVBQU9oRSxTQUFQLENBQTFCOztBQUNBLE1BQUlBLFNBQUosRUFBZTtBQUNYLFFBQUl3QyxDQUFDLEdBQUdnQixZQUFZLENBQUN4RCxTQUFELEVBQVlnRSxJQUFaLENBQXBCO0FBQ0F4QyxJQUFBQSxZQUFZLENBQUNnQixDQUFELEVBQUlBLENBQUMsQ0FBQ2xCLElBQU4sQ0FBWjtBQUNIO0FBQ0osRUFFRDs7O0FBQ0EsU0FBUzJDLGNBQVQsQ0FBd0JELElBQXhCLEVBQThCaEUsU0FBOUIsRUFBeUM7QUFDckMsTUFBSXlCLENBQUMsR0FBR3pCLFNBQVI7QUFBQSxNQUNJa0UsRUFBRSxHQUFHRixJQUFJLENBQUN6RCxDQURkO0FBQUEsTUFFSTRELEVBQUUsR0FBR0gsSUFBSSxDQUFDeEQsQ0FGZDtBQUFBLE1BR0k0RCxFQUFFLEdBQUcsQ0FBQ0MsUUFIVjtBQUFBLE1BSUlDLENBSkosQ0FEcUMsQ0FPckM7QUFDQTs7QUFDQSxLQUFHO0FBQ0MsUUFBSUgsRUFBRSxJQUFJMUMsQ0FBQyxDQUFDakIsQ0FBUixJQUFhMkQsRUFBRSxJQUFJMUMsQ0FBQyxDQUFDSCxJQUFGLENBQU9kLENBQTlCLEVBQWlDO0FBQzdCLFVBQUlELENBQUMsR0FBR2tCLENBQUMsQ0FBQ2xCLENBQUYsR0FBTSxDQUFDNEQsRUFBRSxHQUFHMUMsQ0FBQyxDQUFDakIsQ0FBUixLQUFjaUIsQ0FBQyxDQUFDSCxJQUFGLENBQU9mLENBQVAsR0FBV2tCLENBQUMsQ0FBQ2xCLENBQTNCLEtBQWlDa0IsQ0FBQyxDQUFDSCxJQUFGLENBQU9kLENBQVAsR0FBV2lCLENBQUMsQ0FBQ2pCLENBQTlDLENBQWQ7O0FBQ0EsVUFBSUQsQ0FBQyxJQUFJMkQsRUFBTCxJQUFXM0QsQ0FBQyxHQUFHNkQsRUFBbkIsRUFBdUI7QUFDbkJBLFFBQUFBLEVBQUUsR0FBRzdELENBQUw7O0FBQ0EsWUFBSUEsQ0FBQyxLQUFLMkQsRUFBVixFQUFjO0FBQ1YsY0FBSUMsRUFBRSxLQUFLMUMsQ0FBQyxDQUFDakIsQ0FBYixFQUFnQixPQUFPaUIsQ0FBUDtBQUNoQixjQUFJMEMsRUFBRSxLQUFLMUMsQ0FBQyxDQUFDSCxJQUFGLENBQU9kLENBQWxCLEVBQXFCLE9BQU9pQixDQUFDLENBQUNILElBQVQ7QUFDeEI7O0FBQ0RnRCxRQUFBQSxDQUFDLEdBQUc3QyxDQUFDLENBQUNsQixDQUFGLEdBQU1rQixDQUFDLENBQUNILElBQUYsQ0FBT2YsQ0FBYixHQUFpQmtCLENBQWpCLEdBQXFCQSxDQUFDLENBQUNILElBQTNCO0FBQ0g7QUFDSjs7QUFDREcsSUFBQUEsQ0FBQyxHQUFHQSxDQUFDLENBQUNILElBQU47QUFDSCxHQWJELFFBYVNHLENBQUMsS0FBS3pCLFNBYmY7O0FBZUEsTUFBSSxDQUFDc0UsQ0FBTCxFQUFRLE9BQU8sSUFBUDtBQUVSLE1BQUlKLEVBQUUsS0FBS0UsRUFBWCxFQUFlLE9BQU9FLENBQUMsQ0FBQ3pDLElBQVQsQ0ExQnNCLENBMEJQO0FBRTlCO0FBQ0E7QUFDQTs7QUFFQSxNQUFJSSxJQUFJLEdBQUdxQyxDQUFYO0FBQUEsTUFDSUMsRUFBRSxHQUFHRCxDQUFDLENBQUMvRCxDQURYO0FBQUEsTUFFSWlFLEVBQUUsR0FBR0YsQ0FBQyxDQUFDOUQsQ0FGWDtBQUFBLE1BR0lpRSxNQUFNLEdBQUdKLFFBSGI7QUFBQSxNQUlJSyxHQUpKO0FBTUFqRCxFQUFBQSxDQUFDLEdBQUc2QyxDQUFDLENBQUNoRCxJQUFOOztBQUVBLFNBQU9HLENBQUMsS0FBS1EsSUFBYixFQUFtQjtBQUNmLFFBQUlpQyxFQUFFLElBQUl6QyxDQUFDLENBQUNsQixDQUFSLElBQWFrQixDQUFDLENBQUNsQixDQUFGLElBQU9nRSxFQUFwQixJQUNJN0IsZUFBZSxDQUFDeUIsRUFBRSxHQUFHSyxFQUFMLEdBQVVOLEVBQVYsR0FBZUUsRUFBaEIsRUFBb0JELEVBQXBCLEVBQXdCSSxFQUF4QixFQUE0QkMsRUFBNUIsRUFBZ0NMLEVBQUUsR0FBR0ssRUFBTCxHQUFVSixFQUFWLEdBQWVGLEVBQS9DLEVBQW1EQyxFQUFuRCxFQUF1RDFDLENBQUMsQ0FBQ2xCLENBQXpELEVBQTREa0IsQ0FBQyxDQUFDakIsQ0FBOUQsQ0FEdkIsRUFDeUY7QUFFckZrRSxNQUFBQSxHQUFHLEdBQUc5RCxJQUFJLENBQUMrRCxHQUFMLENBQVNSLEVBQUUsR0FBRzFDLENBQUMsQ0FBQ2pCLENBQWhCLEtBQXNCMEQsRUFBRSxHQUFHekMsQ0FBQyxDQUFDbEIsQ0FBN0IsQ0FBTixDQUZxRixDQUU5Qzs7QUFFdkMsVUFBSSxDQUFDbUUsR0FBRyxHQUFHRCxNQUFOLElBQWlCQyxHQUFHLEtBQUtELE1BQVIsSUFBa0JoRCxDQUFDLENBQUNsQixDQUFGLEdBQU0rRCxDQUFDLENBQUMvRCxDQUE1QyxLQUFtRCtDLGFBQWEsQ0FBQzdCLENBQUQsRUFBSXVDLElBQUosQ0FBcEUsRUFBK0U7QUFDM0VNLFFBQUFBLENBQUMsR0FBRzdDLENBQUo7QUFDQWdELFFBQUFBLE1BQU0sR0FBR0MsR0FBVDtBQUNIO0FBQ0o7O0FBRURqRCxJQUFBQSxDQUFDLEdBQUdBLENBQUMsQ0FBQ0gsSUFBTjtBQUNIOztBQUVELFNBQU9nRCxDQUFQO0FBQ0gsRUFFRDs7O0FBQ0EsU0FBU3RDLFVBQVQsQ0FBb0JqQixLQUFwQixFQUEyQlosSUFBM0IsRUFBaUNDLElBQWpDLEVBQXVDSyxJQUF2QyxFQUE2QztBQUN6QyxNQUFJZ0IsQ0FBQyxHQUFHVixLQUFSOztBQUNBLEtBQUc7QUFDQyxRQUFJVSxDQUFDLENBQUMwQixDQUFGLEtBQVEsSUFBWixFQUFrQjFCLENBQUMsQ0FBQzBCLENBQUYsR0FBTUgsTUFBTSxDQUFDdkIsQ0FBQyxDQUFDbEIsQ0FBSCxFQUFNa0IsQ0FBQyxDQUFDakIsQ0FBUixFQUFXTCxJQUFYLEVBQWlCQyxJQUFqQixFQUF1QkssSUFBdkIsQ0FBWjtBQUNsQmdCLElBQUFBLENBQUMsQ0FBQzJCLEtBQUYsR0FBVTNCLENBQUMsQ0FBQ0ksSUFBWjtBQUNBSixJQUFBQSxDQUFDLENBQUN5QixLQUFGLEdBQVV6QixDQUFDLENBQUNILElBQVo7QUFDQUcsSUFBQUEsQ0FBQyxHQUFHQSxDQUFDLENBQUNILElBQU47QUFDSCxHQUxELFFBS1NHLENBQUMsS0FBS1YsS0FMZjs7QUFPQVUsRUFBQUEsQ0FBQyxDQUFDMkIsS0FBRixDQUFRRixLQUFSLEdBQWdCLElBQWhCO0FBQ0F6QixFQUFBQSxDQUFDLENBQUMyQixLQUFGLEdBQVUsSUFBVjtBQUVBd0IsRUFBQUEsVUFBVSxDQUFDbkQsQ0FBRCxDQUFWO0FBQ0gsRUFFRDtBQUNBOzs7QUFDQSxTQUFTbUQsVUFBVCxDQUFvQmpCLElBQXBCLEVBQTBCO0FBQ3RCLE1BQUloRCxDQUFKO0FBQUEsTUFBT2MsQ0FBUDtBQUFBLE1BQVVvRCxDQUFWO0FBQUEsTUFBYUMsQ0FBYjtBQUFBLE1BQWdCQyxJQUFoQjtBQUFBLE1BQXNCQyxTQUF0QjtBQUFBLE1BQWlDQyxLQUFqQztBQUFBLE1BQXdDQyxLQUF4QztBQUFBLE1BQ0lDLE1BQU0sR0FBRyxDQURiOztBQUdBLEtBQUc7QUFDQzFELElBQUFBLENBQUMsR0FBR2tDLElBQUo7QUFDQUEsSUFBQUEsSUFBSSxHQUFHLElBQVA7QUFDQW9CLElBQUFBLElBQUksR0FBRyxJQUFQO0FBQ0FDLElBQUFBLFNBQVMsR0FBRyxDQUFaOztBQUVBLFdBQU92RCxDQUFQLEVBQVU7QUFDTnVELE1BQUFBLFNBQVM7QUFDVEgsTUFBQUEsQ0FBQyxHQUFHcEQsQ0FBSjtBQUNBd0QsTUFBQUEsS0FBSyxHQUFHLENBQVI7O0FBQ0EsV0FBS3RFLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBR3dFLE1BQWhCLEVBQXdCeEUsQ0FBQyxFQUF6QixFQUE2QjtBQUN6QnNFLFFBQUFBLEtBQUs7QUFDTEosUUFBQUEsQ0FBQyxHQUFHQSxDQUFDLENBQUMzQixLQUFOO0FBQ0EsWUFBSSxDQUFDMkIsQ0FBTCxFQUFRO0FBQ1g7O0FBRURLLE1BQUFBLEtBQUssR0FBR0MsTUFBUjs7QUFFQSxhQUFPRixLQUFLLEdBQUcsQ0FBUixJQUFjQyxLQUFLLEdBQUcsQ0FBUixJQUFhTCxDQUFsQyxFQUFzQztBQUVsQyxZQUFJSSxLQUFLLEtBQUssQ0FBZCxFQUFpQjtBQUNiSCxVQUFBQSxDQUFDLEdBQUdELENBQUo7QUFDQUEsVUFBQUEsQ0FBQyxHQUFHQSxDQUFDLENBQUMzQixLQUFOO0FBQ0FnQyxVQUFBQSxLQUFLO0FBQ1IsU0FKRCxNQUlPLElBQUlBLEtBQUssS0FBSyxDQUFWLElBQWUsQ0FBQ0wsQ0FBcEIsRUFBdUI7QUFDMUJDLFVBQUFBLENBQUMsR0FBR3JELENBQUo7QUFDQUEsVUFBQUEsQ0FBQyxHQUFHQSxDQUFDLENBQUN5QixLQUFOO0FBQ0ErQixVQUFBQSxLQUFLO0FBQ1IsU0FKTSxNQUlBLElBQUl4RCxDQUFDLENBQUMwQixDQUFGLElBQU8wQixDQUFDLENBQUMxQixDQUFiLEVBQWdCO0FBQ25CMkIsVUFBQUEsQ0FBQyxHQUFHckQsQ0FBSjtBQUNBQSxVQUFBQSxDQUFDLEdBQUdBLENBQUMsQ0FBQ3lCLEtBQU47QUFDQStCLFVBQUFBLEtBQUs7QUFDUixTQUpNLE1BSUE7QUFDSEgsVUFBQUEsQ0FBQyxHQUFHRCxDQUFKO0FBQ0FBLFVBQUFBLENBQUMsR0FBR0EsQ0FBQyxDQUFDM0IsS0FBTjtBQUNBZ0MsVUFBQUEsS0FBSztBQUNSOztBQUVELFlBQUlILElBQUosRUFBVUEsSUFBSSxDQUFDN0IsS0FBTCxHQUFhNEIsQ0FBYixDQUFWLEtBQ0tuQixJQUFJLEdBQUdtQixDQUFQO0FBRUxBLFFBQUFBLENBQUMsQ0FBQzFCLEtBQUYsR0FBVTJCLElBQVY7QUFDQUEsUUFBQUEsSUFBSSxHQUFHRCxDQUFQO0FBQ0g7O0FBRURyRCxNQUFBQSxDQUFDLEdBQUdvRCxDQUFKO0FBQ0g7O0FBRURFLElBQUFBLElBQUksQ0FBQzdCLEtBQUwsR0FBYSxJQUFiO0FBQ0FpQyxJQUFBQSxNQUFNLElBQUksQ0FBVjtBQUVILEdBbkRELFFBbURTSCxTQUFTLEdBQUcsQ0FuRHJCOztBQXFEQSxTQUFPckIsSUFBUDtBQUNILEVBRUQ7OztBQUNBLFNBQVNYLE1BQVQsQ0FBZ0J6QyxDQUFoQixFQUFtQkMsQ0FBbkIsRUFBc0JMLElBQXRCLEVBQTRCQyxJQUE1QixFQUFrQ0ssSUFBbEMsRUFBd0M7QUFDcEM7QUFDQUYsRUFBQUEsQ0FBQyxHQUFHLFNBQVNBLENBQUMsR0FBR0osSUFBYixJQUFxQk0sSUFBekI7QUFDQUQsRUFBQUEsQ0FBQyxHQUFHLFNBQVNBLENBQUMsR0FBR0osSUFBYixJQUFxQkssSUFBekI7QUFFQUYsRUFBQUEsQ0FBQyxHQUFHLENBQUNBLENBQUMsR0FBSUEsQ0FBQyxJQUFJLENBQVgsSUFBaUIsVUFBckI7QUFDQUEsRUFBQUEsQ0FBQyxHQUFHLENBQUNBLENBQUMsR0FBSUEsQ0FBQyxJQUFJLENBQVgsSUFBaUIsVUFBckI7QUFDQUEsRUFBQUEsQ0FBQyxHQUFHLENBQUNBLENBQUMsR0FBSUEsQ0FBQyxJQUFJLENBQVgsSUFBaUIsVUFBckI7QUFDQUEsRUFBQUEsQ0FBQyxHQUFHLENBQUNBLENBQUMsR0FBSUEsQ0FBQyxJQUFJLENBQVgsSUFBaUIsVUFBckI7QUFFQUMsRUFBQUEsQ0FBQyxHQUFHLENBQUNBLENBQUMsR0FBSUEsQ0FBQyxJQUFJLENBQVgsSUFBaUIsVUFBckI7QUFDQUEsRUFBQUEsQ0FBQyxHQUFHLENBQUNBLENBQUMsR0FBSUEsQ0FBQyxJQUFJLENBQVgsSUFBaUIsVUFBckI7QUFDQUEsRUFBQUEsQ0FBQyxHQUFHLENBQUNBLENBQUMsR0FBSUEsQ0FBQyxJQUFJLENBQVgsSUFBaUIsVUFBckI7QUFDQUEsRUFBQUEsQ0FBQyxHQUFHLENBQUNBLENBQUMsR0FBSUEsQ0FBQyxJQUFJLENBQVgsSUFBaUIsVUFBckI7QUFFQSxTQUFPRCxDQUFDLEdBQUlDLENBQUMsSUFBSSxDQUFqQjtBQUNILEVBRUQ7OztBQUNBLFNBQVNvRCxXQUFULENBQXFCN0MsS0FBckIsRUFBNEI7QUFDeEIsTUFBSVUsQ0FBQyxHQUFHVixLQUFSO0FBQUEsTUFDSXFFLFFBQVEsR0FBR3JFLEtBRGY7O0FBRUEsS0FBRztBQUNDLFFBQUlVLENBQUMsQ0FBQ2xCLENBQUYsR0FBTTZFLFFBQVEsQ0FBQzdFLENBQW5CLEVBQXNCNkUsUUFBUSxHQUFHM0QsQ0FBWDtBQUN0QkEsSUFBQUEsQ0FBQyxHQUFHQSxDQUFDLENBQUNILElBQU47QUFDSCxHQUhELFFBR1NHLENBQUMsS0FBS1YsS0FIZjs7QUFLQSxTQUFPcUUsUUFBUDtBQUNILEVBRUQ7OztBQUNBLFNBQVMxQyxlQUFULENBQXlCMkMsRUFBekIsRUFBNkJDLEVBQTdCLEVBQWlDQyxFQUFqQyxFQUFxQ0MsRUFBckMsRUFBeUNDLEVBQXpDLEVBQTZDQyxFQUE3QyxFQUFpREMsRUFBakQsRUFBcURDLEVBQXJELEVBQXlEO0FBQ3JELFNBQU8sQ0FBQ0gsRUFBRSxHQUFHRSxFQUFOLEtBQWFMLEVBQUUsR0FBR00sRUFBbEIsSUFBd0IsQ0FBQ1AsRUFBRSxHQUFHTSxFQUFOLEtBQWFELEVBQUUsR0FBR0UsRUFBbEIsQ0FBeEIsSUFBaUQsQ0FBakQsSUFDQSxDQUFDUCxFQUFFLEdBQUdNLEVBQU4sS0FBYUgsRUFBRSxHQUFHSSxFQUFsQixJQUF3QixDQUFDTCxFQUFFLEdBQUdJLEVBQU4sS0FBYUwsRUFBRSxHQUFHTSxFQUFsQixDQUF4QixJQUFpRCxDQURqRCxJQUVBLENBQUNMLEVBQUUsR0FBR0ksRUFBTixLQUFhRCxFQUFFLEdBQUdFLEVBQWxCLElBQXdCLENBQUNILEVBQUUsR0FBR0UsRUFBTixLQUFhSCxFQUFFLEdBQUdJLEVBQWxCLENBQXhCLElBQWlELENBRnhEO0FBR0gsRUFFRDs7O0FBQ0EsU0FBU3JDLGVBQVQsQ0FBeUJoQixDQUF6QixFQUE0QkMsQ0FBNUIsRUFBK0I7QUFDM0IsU0FBT0QsQ0FBQyxDQUFDakIsSUFBRixDQUFPWCxDQUFQLEtBQWE2QixDQUFDLENBQUM3QixDQUFmLElBQW9CNEIsQ0FBQyxDQUFDVixJQUFGLENBQU9sQixDQUFQLEtBQWE2QixDQUFDLENBQUM3QixDQUFuQyxJQUF3QyxDQUFDa0YsaUJBQWlCLENBQUN0RCxDQUFELEVBQUlDLENBQUosQ0FBMUQsSUFDQWMsYUFBYSxDQUFDZixDQUFELEVBQUlDLENBQUosQ0FEYixJQUN1QmMsYUFBYSxDQUFDZCxDQUFELEVBQUlELENBQUosQ0FEcEMsSUFDOEN1RCxZQUFZLENBQUN2RCxDQUFELEVBQUlDLENBQUosQ0FEakU7QUFFSCxFQUVEOzs7QUFDQSxTQUFTWixJQUFULENBQWNILENBQWQsRUFBaUJvRCxDQUFqQixFQUFvQmtCLENBQXBCLEVBQXVCO0FBQ25CLFNBQU8sQ0FBQ2xCLENBQUMsQ0FBQ3JFLENBQUYsR0FBTWlCLENBQUMsQ0FBQ2pCLENBQVQsS0FBZXVGLENBQUMsQ0FBQ3hGLENBQUYsR0FBTXNFLENBQUMsQ0FBQ3RFLENBQXZCLElBQTRCLENBQUNzRSxDQUFDLENBQUN0RSxDQUFGLEdBQU1rQixDQUFDLENBQUNsQixDQUFULEtBQWV3RixDQUFDLENBQUN2RixDQUFGLEdBQU1xRSxDQUFDLENBQUNyRSxDQUF2QixDQUFuQztBQUNILEVBRUQ7OztBQUNBLFNBQVNhLE1BQVQsQ0FBZ0IyRSxFQUFoQixFQUFvQkMsRUFBcEIsRUFBd0I7QUFDcEIsU0FBT0QsRUFBRSxDQUFDekYsQ0FBSCxLQUFTMEYsRUFBRSxDQUFDMUYsQ0FBWixJQUFpQnlGLEVBQUUsQ0FBQ3hGLENBQUgsS0FBU3lGLEVBQUUsQ0FBQ3pGLENBQXBDO0FBQ0gsRUFFRDs7O0FBQ0EsU0FBUzZDLFVBQVQsQ0FBb0IyQyxFQUFwQixFQUF3QkUsRUFBeEIsRUFBNEJELEVBQTVCLEVBQWdDRSxFQUFoQyxFQUFvQztBQUNoQyxNQUFLOUUsTUFBTSxDQUFDMkUsRUFBRCxFQUFLRSxFQUFMLENBQU4sSUFBa0I3RSxNQUFNLENBQUM0RSxFQUFELEVBQUtFLEVBQUwsQ0FBekIsSUFDQzlFLE1BQU0sQ0FBQzJFLEVBQUQsRUFBS0csRUFBTCxDQUFOLElBQWtCOUUsTUFBTSxDQUFDNEUsRUFBRCxFQUFLQyxFQUFMLENBRDdCLEVBQ3dDLE9BQU8sSUFBUDtBQUN4QyxTQUFPdEUsSUFBSSxDQUFDb0UsRUFBRCxFQUFLRSxFQUFMLEVBQVNELEVBQVQsQ0FBSixHQUFtQixDQUFuQixLQUF5QnJFLElBQUksQ0FBQ29FLEVBQUQsRUFBS0UsRUFBTCxFQUFTQyxFQUFULENBQUosR0FBbUIsQ0FBNUMsSUFDQXZFLElBQUksQ0FBQ3FFLEVBQUQsRUFBS0UsRUFBTCxFQUFTSCxFQUFULENBQUosR0FBbUIsQ0FBbkIsS0FBeUJwRSxJQUFJLENBQUNxRSxFQUFELEVBQUtFLEVBQUwsRUFBU0QsRUFBVCxDQUFKLEdBQW1CLENBRG5EO0FBRUgsRUFFRDs7O0FBQ0EsU0FBU0wsaUJBQVQsQ0FBMkJ0RCxDQUEzQixFQUE4QkMsQ0FBOUIsRUFBaUM7QUFDN0IsTUFBSWYsQ0FBQyxHQUFHYyxDQUFSOztBQUNBLEtBQUc7QUFDQyxRQUFJZCxDQUFDLENBQUNkLENBQUYsS0FBUTRCLENBQUMsQ0FBQzVCLENBQVYsSUFBZWMsQ0FBQyxDQUFDSCxJQUFGLENBQU9YLENBQVAsS0FBYTRCLENBQUMsQ0FBQzVCLENBQTlCLElBQW1DYyxDQUFDLENBQUNkLENBQUYsS0FBUTZCLENBQUMsQ0FBQzdCLENBQTdDLElBQWtEYyxDQUFDLENBQUNILElBQUYsQ0FBT1gsQ0FBUCxLQUFhNkIsQ0FBQyxDQUFDN0IsQ0FBakUsSUFDSTBDLFVBQVUsQ0FBQzVCLENBQUQsRUFBSUEsQ0FBQyxDQUFDSCxJQUFOLEVBQVlpQixDQUFaLEVBQWVDLENBQWYsQ0FEbEIsRUFDcUMsT0FBTyxJQUFQO0FBQ3JDZixJQUFBQSxDQUFDLEdBQUdBLENBQUMsQ0FBQ0gsSUFBTjtBQUNILEdBSkQsUUFJU0csQ0FBQyxLQUFLYyxDQUpmOztBQU1BLFNBQU8sS0FBUDtBQUNILEVBRUQ7OztBQUNBLFNBQVNlLGFBQVQsQ0FBdUJmLENBQXZCLEVBQTBCQyxDQUExQixFQUE2QjtBQUN6QixTQUFPWixJQUFJLENBQUNXLENBQUMsQ0FBQ1YsSUFBSCxFQUFTVSxDQUFULEVBQVlBLENBQUMsQ0FBQ2pCLElBQWQsQ0FBSixHQUEwQixDQUExQixHQUNITSxJQUFJLENBQUNXLENBQUQsRUFBSUMsQ0FBSixFQUFPRCxDQUFDLENBQUNqQixJQUFULENBQUosSUFBc0IsQ0FBdEIsSUFBMkJNLElBQUksQ0FBQ1csQ0FBRCxFQUFJQSxDQUFDLENBQUNWLElBQU4sRUFBWVcsQ0FBWixDQUFKLElBQXNCLENBRDlDLEdBRUhaLElBQUksQ0FBQ1csQ0FBRCxFQUFJQyxDQUFKLEVBQU9ELENBQUMsQ0FBQ1YsSUFBVCxDQUFKLEdBQXFCLENBQXJCLElBQTBCRCxJQUFJLENBQUNXLENBQUQsRUFBSUEsQ0FBQyxDQUFDakIsSUFBTixFQUFZa0IsQ0FBWixDQUFKLEdBQXFCLENBRm5EO0FBR0gsRUFFRDs7O0FBQ0EsU0FBU3NELFlBQVQsQ0FBc0J2RCxDQUF0QixFQUF5QkMsQ0FBekIsRUFBNEI7QUFDeEIsTUFBSWYsQ0FBQyxHQUFHYyxDQUFSO0FBQUEsTUFDSTZELE1BQU0sR0FBRyxLQURiO0FBQUEsTUFFSVQsRUFBRSxHQUFHLENBQUNwRCxDQUFDLENBQUNoQyxDQUFGLEdBQU1pQyxDQUFDLENBQUNqQyxDQUFULElBQWMsQ0FGdkI7QUFBQSxNQUdJcUYsRUFBRSxHQUFHLENBQUNyRCxDQUFDLENBQUMvQixDQUFGLEdBQU1nQyxDQUFDLENBQUNoQyxDQUFULElBQWMsQ0FIdkI7O0FBSUEsS0FBRztBQUNDLFFBQU1pQixDQUFDLENBQUNqQixDQUFGLEdBQU1vRixFQUFQLEtBQWdCbkUsQ0FBQyxDQUFDSCxJQUFGLENBQU9kLENBQVAsR0FBV29GLEVBQTVCLElBQXFDRCxFQUFFLEdBQUcsQ0FBQ2xFLENBQUMsQ0FBQ0gsSUFBRixDQUFPZixDQUFQLEdBQVdrQixDQUFDLENBQUNsQixDQUFkLEtBQW9CcUYsRUFBRSxHQUFHbkUsQ0FBQyxDQUFDakIsQ0FBM0IsS0FBaUNpQixDQUFDLENBQUNILElBQUYsQ0FBT2QsQ0FBUCxHQUFXaUIsQ0FBQyxDQUFDakIsQ0FBOUMsSUFBbURpQixDQUFDLENBQUNsQixDQUFuRyxFQUNJNkYsTUFBTSxHQUFHLENBQUNBLE1BQVY7QUFDSjNFLElBQUFBLENBQUMsR0FBR0EsQ0FBQyxDQUFDSCxJQUFOO0FBQ0gsR0FKRCxRQUlTRyxDQUFDLEtBQUtjLENBSmY7O0FBTUEsU0FBTzZELE1BQVA7QUFDSCxFQUVEO0FBQ0E7OztBQUNBLFNBQVM1QyxZQUFULENBQXNCakIsQ0FBdEIsRUFBeUJDLENBQXpCLEVBQTRCO0FBQ3hCLE1BQUk2RCxFQUFFLEdBQUcsSUFBSUMsSUFBSixDQUFTL0QsQ0FBQyxDQUFDNUIsQ0FBWCxFQUFjNEIsQ0FBQyxDQUFDaEMsQ0FBaEIsRUFBbUJnQyxDQUFDLENBQUMvQixDQUFyQixDQUFUO0FBQUEsTUFDSStGLEVBQUUsR0FBRyxJQUFJRCxJQUFKLENBQVM5RCxDQUFDLENBQUM3QixDQUFYLEVBQWM2QixDQUFDLENBQUNqQyxDQUFoQixFQUFtQmlDLENBQUMsQ0FBQ2hDLENBQXJCLENBRFQ7QUFBQSxNQUVJZ0csRUFBRSxHQUFHakUsQ0FBQyxDQUFDakIsSUFGWDtBQUFBLE1BR0ltRixFQUFFLEdBQUdqRSxDQUFDLENBQUNYLElBSFg7QUFLQVUsRUFBQUEsQ0FBQyxDQUFDakIsSUFBRixHQUFTa0IsQ0FBVDtBQUNBQSxFQUFBQSxDQUFDLENBQUNYLElBQUYsR0FBU1UsQ0FBVDtBQUVBOEQsRUFBQUEsRUFBRSxDQUFDL0UsSUFBSCxHQUFVa0YsRUFBVjtBQUNBQSxFQUFBQSxFQUFFLENBQUMzRSxJQUFILEdBQVV3RSxFQUFWO0FBRUFFLEVBQUFBLEVBQUUsQ0FBQ2pGLElBQUgsR0FBVStFLEVBQVY7QUFDQUEsRUFBQUEsRUFBRSxDQUFDeEUsSUFBSCxHQUFVMEUsRUFBVjtBQUVBRSxFQUFBQSxFQUFFLENBQUNuRixJQUFILEdBQVVpRixFQUFWO0FBQ0FBLEVBQUFBLEVBQUUsQ0FBQzFFLElBQUgsR0FBVTRFLEVBQVY7QUFFQSxTQUFPRixFQUFQO0FBQ0gsRUFFRDs7O0FBQ0EsU0FBU25GLFVBQVQsQ0FBb0JULENBQXBCLEVBQXVCSixDQUF2QixFQUEwQkMsQ0FBMUIsRUFBNkJVLElBQTdCLEVBQW1DO0FBQy9CLE1BQUlPLENBQUMsR0FBRyxJQUFJNkUsSUFBSixDQUFTM0YsQ0FBVCxFQUFZSixDQUFaLEVBQWVDLENBQWYsQ0FBUjs7QUFFQSxNQUFJLENBQUNVLElBQUwsRUFBVztBQUNQTyxJQUFBQSxDQUFDLENBQUNJLElBQUYsR0FBU0osQ0FBVDtBQUNBQSxJQUFBQSxDQUFDLENBQUNILElBQUYsR0FBU0csQ0FBVDtBQUVILEdBSkQsTUFJTztBQUNIQSxJQUFBQSxDQUFDLENBQUNILElBQUYsR0FBU0osSUFBSSxDQUFDSSxJQUFkO0FBQ0FHLElBQUFBLENBQUMsQ0FBQ0ksSUFBRixHQUFTWCxJQUFUO0FBQ0FBLElBQUFBLElBQUksQ0FBQ0ksSUFBTCxDQUFVTyxJQUFWLEdBQWlCSixDQUFqQjtBQUNBUCxJQUFBQSxJQUFJLENBQUNJLElBQUwsR0FBWUcsQ0FBWjtBQUNIOztBQUNELFNBQU9BLENBQVA7QUFDSDs7QUFFRCxTQUFTRixVQUFULENBQW9CRSxDQUFwQixFQUF1QjtBQUNuQkEsRUFBQUEsQ0FBQyxDQUFDSCxJQUFGLENBQU9PLElBQVAsR0FBY0osQ0FBQyxDQUFDSSxJQUFoQjtBQUNBSixFQUFBQSxDQUFDLENBQUNJLElBQUYsQ0FBT1AsSUFBUCxHQUFjRyxDQUFDLENBQUNILElBQWhCO0FBRUEsTUFBSUcsQ0FBQyxDQUFDMkIsS0FBTixFQUFhM0IsQ0FBQyxDQUFDMkIsS0FBRixDQUFRRixLQUFSLEdBQWdCekIsQ0FBQyxDQUFDeUIsS0FBbEI7QUFDYixNQUFJekIsQ0FBQyxDQUFDeUIsS0FBTixFQUFhekIsQ0FBQyxDQUFDeUIsS0FBRixDQUFRRSxLQUFSLEdBQWdCM0IsQ0FBQyxDQUFDMkIsS0FBbEI7QUFDaEI7O0FBRUQsU0FBU2tELElBQVQsQ0FBYzNGLENBQWQsRUFBaUJKLENBQWpCLEVBQW9CQyxDQUFwQixFQUF1QjtBQUNuQjtBQUNBLE9BQUtHLENBQUwsR0FBU0EsQ0FBVCxDQUZtQixDQUluQjs7QUFDQSxPQUFLSixDQUFMLEdBQVNBLENBQVQ7QUFDQSxPQUFLQyxDQUFMLEdBQVNBLENBQVQsQ0FObUIsQ0FRbkI7O0FBQ0EsT0FBS3FCLElBQUwsR0FBWSxJQUFaO0FBQ0EsT0FBS1AsSUFBTCxHQUFZLElBQVosQ0FWbUIsQ0FZbkI7O0FBQ0EsT0FBSzZCLENBQUwsR0FBUyxJQUFULENBYm1CLENBZW5COztBQUNBLE9BQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0EsT0FBS0YsS0FBTCxHQUFhLElBQWIsQ0FqQm1CLENBbUJuQjs7QUFDQSxPQUFLdkIsT0FBTCxHQUFlLEtBQWY7QUFDSCxFQUVEO0FBQ0E7OztBQUNBcEMsTUFBTSxDQUFDbUgsU0FBUCxHQUFtQixVQUFVaEgsSUFBVixFQUFnQkMsV0FBaEIsRUFBNkJDLEdBQTdCLEVBQWtDTSxTQUFsQyxFQUE2QztBQUM1RCxNQUFJTCxRQUFRLEdBQUdGLFdBQVcsSUFBSUEsV0FBVyxDQUFDRyxNQUExQztBQUNBLE1BQUlDLFFBQVEsR0FBR0YsUUFBUSxHQUFHRixXQUFXLENBQUMsQ0FBRCxDQUFYLEdBQWlCQyxHQUFwQixHQUEwQkYsSUFBSSxDQUFDSSxNQUF0RDtBQUVBLE1BQUk2RyxXQUFXLEdBQUcvRixJQUFJLENBQUMrRCxHQUFMLENBQVN4RCxVQUFVLENBQUN6QixJQUFELEVBQU8sQ0FBUCxFQUFVSyxRQUFWLEVBQW9CSCxHQUFwQixDQUFuQixDQUFsQjs7QUFDQSxNQUFJQyxRQUFKLEVBQWM7QUFDVixTQUFLLElBQUljLENBQUMsR0FBRyxDQUFSLEVBQVcrQyxHQUFHLEdBQUcvRCxXQUFXLENBQUNHLE1BQWxDLEVBQTBDYSxDQUFDLEdBQUcrQyxHQUE5QyxFQUFtRC9DLENBQUMsRUFBcEQsRUFBd0Q7QUFDcEQsVUFBSUksS0FBSyxHQUFHcEIsV0FBVyxDQUFDZ0IsQ0FBRCxDQUFYLEdBQWlCZixHQUE3QjtBQUNBLFVBQUlvQixHQUFHLEdBQUdMLENBQUMsR0FBRytDLEdBQUcsR0FBRyxDQUFWLEdBQWMvRCxXQUFXLENBQUNnQixDQUFDLEdBQUcsQ0FBTCxDQUFYLEdBQXFCZixHQUFuQyxHQUF5Q0YsSUFBSSxDQUFDSSxNQUF4RDtBQUNBNkcsTUFBQUEsV0FBVyxJQUFJL0YsSUFBSSxDQUFDK0QsR0FBTCxDQUFTeEQsVUFBVSxDQUFDekIsSUFBRCxFQUFPcUIsS0FBUCxFQUFjQyxHQUFkLEVBQW1CcEIsR0FBbkIsQ0FBbkIsQ0FBZjtBQUNIO0FBQ0o7O0FBRUQsTUFBSWdILGFBQWEsR0FBRyxDQUFwQjs7QUFDQSxPQUFLakcsQ0FBQyxHQUFHLENBQVQsRUFBWUEsQ0FBQyxHQUFHVCxTQUFTLENBQUNKLE1BQTFCLEVBQWtDYSxDQUFDLElBQUksQ0FBdkMsRUFBMEM7QUFDdEMsUUFBSTRCLENBQUMsR0FBR3JDLFNBQVMsQ0FBQ1MsQ0FBRCxDQUFULEdBQWVmLEdBQXZCO0FBQ0EsUUFBSTRDLENBQUMsR0FBR3RDLFNBQVMsQ0FBQ1MsQ0FBQyxHQUFHLENBQUwsQ0FBVCxHQUFtQmYsR0FBM0I7QUFDQSxRQUFJNkMsQ0FBQyxHQUFHdkMsU0FBUyxDQUFDUyxDQUFDLEdBQUcsQ0FBTCxDQUFULEdBQW1CZixHQUEzQjtBQUNBZ0gsSUFBQUEsYUFBYSxJQUFJaEcsSUFBSSxDQUFDK0QsR0FBTCxDQUNiLENBQUNqRixJQUFJLENBQUM2QyxDQUFELENBQUosR0FBVTdDLElBQUksQ0FBQytDLENBQUQsQ0FBZixLQUF1Qi9DLElBQUksQ0FBQzhDLENBQUMsR0FBRyxDQUFMLENBQUosR0FBYzlDLElBQUksQ0FBQzZDLENBQUMsR0FBRyxDQUFMLENBQXpDLElBQ0EsQ0FBQzdDLElBQUksQ0FBQzZDLENBQUQsQ0FBSixHQUFVN0MsSUFBSSxDQUFDOEMsQ0FBRCxDQUFmLEtBQXVCOUMsSUFBSSxDQUFDK0MsQ0FBQyxHQUFHLENBQUwsQ0FBSixHQUFjL0MsSUFBSSxDQUFDNkMsQ0FBQyxHQUFHLENBQUwsQ0FBekMsQ0FGYSxDQUFqQjtBQUdIOztBQUVELFNBQU9vRSxXQUFXLEtBQUssQ0FBaEIsSUFBcUJDLGFBQWEsS0FBSyxDQUF2QyxHQUEyQyxDQUEzQyxHQUNIaEcsSUFBSSxDQUFDK0QsR0FBTCxDQUFTLENBQUNpQyxhQUFhLEdBQUdELFdBQWpCLElBQWdDQSxXQUF6QyxDQURKO0FBRUgsQ0F6QkQ7O0FBMkJBLFNBQVN4RixVQUFULENBQW9CekIsSUFBcEIsRUFBMEJxQixLQUExQixFQUFpQ0MsR0FBakMsRUFBc0NwQixHQUF0QyxFQUEyQztBQUN2QyxNQUFJaUgsR0FBRyxHQUFHLENBQVY7O0FBQ0EsT0FBSyxJQUFJbEcsQ0FBQyxHQUFHSSxLQUFSLEVBQWUrRixDQUFDLEdBQUc5RixHQUFHLEdBQUdwQixHQUE5QixFQUFtQ2UsQ0FBQyxHQUFHSyxHQUF2QyxFQUE0Q0wsQ0FBQyxJQUFJZixHQUFqRCxFQUFzRDtBQUNsRGlILElBQUFBLEdBQUcsSUFBSSxDQUFDbkgsSUFBSSxDQUFDb0gsQ0FBRCxDQUFKLEdBQVVwSCxJQUFJLENBQUNpQixDQUFELENBQWYsS0FBdUJqQixJQUFJLENBQUNpQixDQUFDLEdBQUcsQ0FBTCxDQUFKLEdBQWNqQixJQUFJLENBQUNvSCxDQUFDLEdBQUcsQ0FBTCxDQUF6QyxDQUFQO0FBQ0FBLElBQUFBLENBQUMsR0FBR25HLENBQUo7QUFDSDs7QUFDRCxTQUFPa0csR0FBUDtBQUNILEVBRUQ7OztBQUNBdEgsTUFBTSxDQUFDd0gsT0FBUCxHQUFpQixVQUFVckgsSUFBVixFQUFnQjtBQUM3QixNQUFJRSxHQUFHLEdBQUdGLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxDQUFSLEVBQVdJLE1BQXJCO0FBQUEsTUFDSWtILE1BQU0sR0FBRztBQUFDQyxJQUFBQSxRQUFRLEVBQUUsRUFBWDtBQUFlQyxJQUFBQSxLQUFLLEVBQUUsRUFBdEI7QUFBMEJDLElBQUFBLFVBQVUsRUFBRXZIO0FBQXRDLEdBRGI7QUFBQSxNQUVJd0gsU0FBUyxHQUFHLENBRmhCOztBQUlBLE9BQUssSUFBSXpHLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdqQixJQUFJLENBQUNJLE1BQXpCLEVBQWlDYSxDQUFDLEVBQWxDLEVBQXNDO0FBQ2xDLFNBQUssSUFBSW1HLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdwSCxJQUFJLENBQUNpQixDQUFELENBQUosQ0FBUWIsTUFBNUIsRUFBb0NnSCxDQUFDLEVBQXJDLEVBQXlDO0FBQ3JDLFdBQUssSUFBSU8sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3pILEdBQXBCLEVBQXlCeUgsQ0FBQyxFQUExQjtBQUE4QkwsUUFBQUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCN0UsSUFBaEIsQ0FBcUIxQyxJQUFJLENBQUNpQixDQUFELENBQUosQ0FBUW1HLENBQVIsRUFBV08sQ0FBWCxDQUFyQjtBQUE5QjtBQUNIOztBQUNELFFBQUkxRyxDQUFDLEdBQUcsQ0FBUixFQUFXO0FBQ1B5RyxNQUFBQSxTQUFTLElBQUkxSCxJQUFJLENBQUNpQixDQUFDLEdBQUcsQ0FBTCxDQUFKLENBQVliLE1BQXpCO0FBQ0FrSCxNQUFBQSxNQUFNLENBQUNFLEtBQVAsQ0FBYTlFLElBQWIsQ0FBa0JnRixTQUFsQjtBQUNIO0FBQ0o7O0FBQ0QsU0FBT0osTUFBUDtBQUNILENBZkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmNjLkdyYXBoaWNzLmVhcmN1dCA9IG1vZHVsZS5leHBvcnRzID0gZWFyY3V0O1xuXG5mdW5jdGlvbiBlYXJjdXQoZGF0YSwgaG9sZUluZGljZXMsIGRpbSkge1xuXG4gICAgZGltID0gZGltIHx8IDI7XG5cbiAgICB2YXIgaGFzSG9sZXMgPSBob2xlSW5kaWNlcyAmJiBob2xlSW5kaWNlcy5sZW5ndGgsXG4gICAgICAgIG91dGVyTGVuID0gaGFzSG9sZXMgPyBob2xlSW5kaWNlc1swXSAqIGRpbSA6IGRhdGEubGVuZ3RoLFxuICAgICAgICBvdXRlck5vZGUgPSBsaW5rZWRMaXN0KGRhdGEsIDAsIG91dGVyTGVuLCBkaW0sIHRydWUpLFxuICAgICAgICB0cmlhbmdsZXMgPSBbXTtcblxuICAgIGlmICghb3V0ZXJOb2RlKSByZXR1cm4gdHJpYW5nbGVzO1xuXG4gICAgdmFyIG1pblgsIG1pblksIG1heFgsIG1heFksIHgsIHksIHNpemU7XG5cbiAgICBpZiAoaGFzSG9sZXMpIG91dGVyTm9kZSA9IGVsaW1pbmF0ZUhvbGVzKGRhdGEsIGhvbGVJbmRpY2VzLCBvdXRlck5vZGUsIGRpbSk7XG5cbiAgICAvLyBpZiB0aGUgc2hhcGUgaXMgbm90IHRvbyBzaW1wbGUsIHdlJ2xsIHVzZSB6LW9yZGVyIGN1cnZlIGhhc2ggbGF0ZXI7IGNhbGN1bGF0ZSBwb2x5Z29uIGJib3hcbiAgICBpZiAoZGF0YS5sZW5ndGggPiA4MCAqIGRpbSkge1xuICAgICAgICBtaW5YID0gbWF4WCA9IGRhdGFbMF07XG4gICAgICAgIG1pblkgPSBtYXhZID0gZGF0YVsxXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gZGltOyBpIDwgb3V0ZXJMZW47IGkgKz0gZGltKSB7XG4gICAgICAgICAgICB4ID0gZGF0YVtpXTtcbiAgICAgICAgICAgIHkgPSBkYXRhW2kgKyAxXTtcbiAgICAgICAgICAgIGlmICh4IDwgbWluWCkgbWluWCA9IHg7XG4gICAgICAgICAgICBpZiAoeSA8IG1pblkpIG1pblkgPSB5O1xuICAgICAgICAgICAgaWYgKHggPiBtYXhYKSBtYXhYID0geDtcbiAgICAgICAgICAgIGlmICh5ID4gbWF4WSkgbWF4WSA9IHk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtaW5YLCBtaW5ZIGFuZCBzaXplIGFyZSBsYXRlciB1c2VkIHRvIHRyYW5zZm9ybSBjb29yZHMgaW50byBpbnRlZ2VycyBmb3Igei1vcmRlciBjYWxjdWxhdGlvblxuICAgICAgICBzaXplID0gTWF0aC5tYXgobWF4WCAtIG1pblgsIG1heFkgLSBtaW5ZKTtcbiAgICB9XG5cbiAgICBlYXJjdXRMaW5rZWQob3V0ZXJOb2RlLCB0cmlhbmdsZXMsIGRpbSwgbWluWCwgbWluWSwgc2l6ZSk7XG5cbiAgICByZXR1cm4gdHJpYW5nbGVzO1xufVxuXG4vLyBjcmVhdGUgYSBjaXJjdWxhciBkb3VibHkgbGlua2VkIGxpc3QgZnJvbSBwb2x5Z29uIHBvaW50cyBpbiB0aGUgc3BlY2lmaWVkIHdpbmRpbmcgb3JkZXJcbmZ1bmN0aW9uIGxpbmtlZExpc3QoZGF0YSwgc3RhcnQsIGVuZCwgZGltLCBjbG9ja3dpc2UpIHtcbiAgICB2YXIgaSwgbGFzdDtcblxuICAgIGlmIChjbG9ja3dpc2UgPT09IChzaWduZWRBcmVhKGRhdGEsIHN0YXJ0LCBlbmQsIGRpbSkgPiAwKSkge1xuICAgICAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSBkaW0pIGxhc3QgPSBpbnNlcnROb2RlKGksIGRhdGFbaV0sIGRhdGFbaSArIDFdLCBsYXN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGkgPSBlbmQgLSBkaW07IGkgPj0gc3RhcnQ7IGkgLT0gZGltKSBsYXN0ID0gaW5zZXJ0Tm9kZShpLCBkYXRhW2ldLCBkYXRhW2kgKyAxXSwgbGFzdCk7XG4gICAgfVxuXG4gICAgaWYgKGxhc3QgJiYgZXF1YWxzKGxhc3QsIGxhc3QubmV4dCkpIHtcbiAgICAgICAgcmVtb3ZlTm9kZShsYXN0KTtcbiAgICAgICAgbGFzdCA9IGxhc3QubmV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4gbGFzdDtcbn1cblxuLy8gZWxpbWluYXRlIGNvbGluZWFyIG9yIGR1cGxpY2F0ZSBwb2ludHNcbmZ1bmN0aW9uIGZpbHRlclBvaW50cyhzdGFydCwgZW5kKSB7XG4gICAgaWYgKCFzdGFydCkgcmV0dXJuIHN0YXJ0O1xuICAgIGlmICghZW5kKSBlbmQgPSBzdGFydDtcblxuICAgIHZhciBwID0gc3RhcnQsXG4gICAgICAgIGFnYWluO1xuICAgIGRvIHtcbiAgICAgICAgYWdhaW4gPSBmYWxzZTtcblxuICAgICAgICBpZiAoIXAuc3RlaW5lciAmJiAoZXF1YWxzKHAsIHAubmV4dCkgfHwgYXJlYShwLnByZXYsIHAsIHAubmV4dCkgPT09IDApKSB7XG4gICAgICAgICAgICByZW1vdmVOb2RlKHApO1xuICAgICAgICAgICAgcCA9IGVuZCA9IHAucHJldjtcbiAgICAgICAgICAgIGlmIChwID09PSBwLm5leHQpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgYWdhaW4gPSB0cnVlO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwID0gcC5uZXh0O1xuICAgICAgICB9XG4gICAgfSB3aGlsZSAoYWdhaW4gfHwgcCAhPT0gZW5kKTtcblxuICAgIHJldHVybiBlbmQ7XG59XG5cbi8vIG1haW4gZWFyIHNsaWNpbmcgbG9vcCB3aGljaCB0cmlhbmd1bGF0ZXMgYSBwb2x5Z29uIChnaXZlbiBhcyBhIGxpbmtlZCBsaXN0KVxuZnVuY3Rpb24gZWFyY3V0TGlua2VkKGVhciwgdHJpYW5nbGVzLCBkaW0sIG1pblgsIG1pblksIHNpemUsIHBhc3MpIHtcbiAgICBpZiAoIWVhcikgcmV0dXJuO1xuXG4gICAgLy8gaW50ZXJsaW5rIHBvbHlnb24gbm9kZXMgaW4gei1vcmRlclxuICAgIGlmICghcGFzcyAmJiBzaXplKSBpbmRleEN1cnZlKGVhciwgbWluWCwgbWluWSwgc2l6ZSk7XG5cbiAgICB2YXIgc3RvcCA9IGVhcixcbiAgICAgICAgcHJldiwgbmV4dDtcblxuICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCBlYXJzLCBzbGljaW5nIHRoZW0gb25lIGJ5IG9uZVxuICAgIHdoaWxlIChlYXIucHJldiAhPT0gZWFyLm5leHQpIHtcbiAgICAgICAgcHJldiA9IGVhci5wcmV2O1xuICAgICAgICBuZXh0ID0gZWFyLm5leHQ7XG5cbiAgICAgICAgaWYgKHNpemUgPyBpc0Vhckhhc2hlZChlYXIsIG1pblgsIG1pblksIHNpemUpIDogaXNFYXIoZWFyKSkge1xuICAgICAgICAgICAgLy8gY3V0IG9mZiB0aGUgdHJpYW5nbGVcbiAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKHByZXYuaSAvIGRpbSk7XG4gICAgICAgICAgICB0cmlhbmdsZXMucHVzaChlYXIuaSAvIGRpbSk7XG4gICAgICAgICAgICB0cmlhbmdsZXMucHVzaChuZXh0LmkgLyBkaW0pO1xuXG4gICAgICAgICAgICByZW1vdmVOb2RlKGVhcik7XG5cbiAgICAgICAgICAgIC8vIHNraXBwaW5nIHRoZSBuZXh0IHZlcnRpY2UgbGVhZHMgdG8gbGVzcyBzbGl2ZXIgdHJpYW5nbGVzXG4gICAgICAgICAgICBlYXIgPSBuZXh0Lm5leHQ7XG4gICAgICAgICAgICBzdG9wID0gbmV4dC5uZXh0O1xuXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVhciA9IG5leHQ7XG5cbiAgICAgICAgLy8gaWYgd2UgbG9vcGVkIHRocm91Z2ggdGhlIHdob2xlIHJlbWFpbmluZyBwb2x5Z29uIGFuZCBjYW4ndCBmaW5kIGFueSBtb3JlIGVhcnNcbiAgICAgICAgaWYgKGVhciA9PT0gc3RvcCkge1xuICAgICAgICAgICAgLy8gdHJ5IGZpbHRlcmluZyBwb2ludHMgYW5kIHNsaWNpbmcgYWdhaW5cbiAgICAgICAgICAgIGlmICghcGFzcykge1xuICAgICAgICAgICAgICAgIGVhcmN1dExpbmtlZChmaWx0ZXJQb2ludHMoZWFyKSwgdHJpYW5nbGVzLCBkaW0sIG1pblgsIG1pblksIHNpemUsIDEpO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGlzIGRpZG4ndCB3b3JrLCB0cnkgY3VyaW5nIGFsbCBzbWFsbCBzZWxmLWludGVyc2VjdGlvbnMgbG9jYWxseVxuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXNzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZWFyID0gY3VyZUxvY2FsSW50ZXJzZWN0aW9ucyhlYXIsIHRyaWFuZ2xlcywgZGltKTtcbiAgICAgICAgICAgICAgICBlYXJjdXRMaW5rZWQoZWFyLCB0cmlhbmdsZXMsIGRpbSwgbWluWCwgbWluWSwgc2l6ZSwgMik7XG5cbiAgICAgICAgICAgIC8vIGFzIGEgbGFzdCByZXNvcnQsIHRyeSBzcGxpdHRpbmcgdGhlIHJlbWFpbmluZyBwb2x5Z29uIGludG8gdHdvXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhc3MgPT09IDIpIHtcbiAgICAgICAgICAgICAgICBzcGxpdEVhcmN1dChlYXIsIHRyaWFuZ2xlcywgZGltLCBtaW5YLCBtaW5ZLCBzaXplKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIGNoZWNrIHdoZXRoZXIgYSBwb2x5Z29uIG5vZGUgZm9ybXMgYSB2YWxpZCBlYXIgd2l0aCBhZGphY2VudCBub2Rlc1xuZnVuY3Rpb24gaXNFYXIoZWFyKSB7XG4gICAgdmFyIGEgPSBlYXIucHJldixcbiAgICAgICAgYiA9IGVhcixcbiAgICAgICAgYyA9IGVhci5uZXh0O1xuXG4gICAgaWYgKGFyZWEoYSwgYiwgYykgPj0gMCkgcmV0dXJuIGZhbHNlOyAvLyByZWZsZXgsIGNhbid0IGJlIGFuIGVhclxuXG4gICAgLy8gbm93IG1ha2Ugc3VyZSB3ZSBkb24ndCBoYXZlIG90aGVyIHBvaW50cyBpbnNpZGUgdGhlIHBvdGVudGlhbCBlYXJcbiAgICB2YXIgcCA9IGVhci5uZXh0Lm5leHQ7XG5cbiAgICB3aGlsZSAocCAhPT0gZWFyLnByZXYpIHtcbiAgICAgICAgaWYgKHBvaW50SW5UcmlhbmdsZShhLngsIGEueSwgYi54LCBiLnksIGMueCwgYy55LCBwLngsIHAueSkgJiZcbiAgICAgICAgICAgIGFyZWEocC5wcmV2LCBwLCBwLm5leHQpID49IDApIHJldHVybiBmYWxzZTtcbiAgICAgICAgcCA9IHAubmV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNFYXJIYXNoZWQoZWFyLCBtaW5YLCBtaW5ZLCBzaXplKSB7XG4gICAgdmFyIGEgPSBlYXIucHJldixcbiAgICAgICAgYiA9IGVhcixcbiAgICAgICAgYyA9IGVhci5uZXh0O1xuXG4gICAgaWYgKGFyZWEoYSwgYiwgYykgPj0gMCkgcmV0dXJuIGZhbHNlOyAvLyByZWZsZXgsIGNhbid0IGJlIGFuIGVhclxuXG4gICAgLy8gdHJpYW5nbGUgYmJveDsgbWluICYgbWF4IGFyZSBjYWxjdWxhdGVkIGxpa2UgdGhpcyBmb3Igc3BlZWRcbiAgICB2YXIgbWluVFggPSBhLnggPCBiLnggPyAoYS54IDwgYy54ID8gYS54IDogYy54KSA6IChiLnggPCBjLnggPyBiLnggOiBjLngpLFxuICAgICAgICBtaW5UWSA9IGEueSA8IGIueSA/IChhLnkgPCBjLnkgPyBhLnkgOiBjLnkpIDogKGIueSA8IGMueSA/IGIueSA6IGMueSksXG4gICAgICAgIG1heFRYID0gYS54ID4gYi54ID8gKGEueCA+IGMueCA/IGEueCA6IGMueCkgOiAoYi54ID4gYy54ID8gYi54IDogYy54KSxcbiAgICAgICAgbWF4VFkgPSBhLnkgPiBiLnkgPyAoYS55ID4gYy55ID8gYS55IDogYy55KSA6IChiLnkgPiBjLnkgPyBiLnkgOiBjLnkpO1xuXG4gICAgLy8gei1vcmRlciByYW5nZSBmb3IgdGhlIGN1cnJlbnQgdHJpYW5nbGUgYmJveDtcbiAgICB2YXIgbWluWiA9IHpPcmRlcihtaW5UWCwgbWluVFksIG1pblgsIG1pblksIHNpemUpLFxuICAgICAgICBtYXhaID0gek9yZGVyKG1heFRYLCBtYXhUWSwgbWluWCwgbWluWSwgc2l6ZSk7XG5cbiAgICAvLyBmaXJzdCBsb29rIGZvciBwb2ludHMgaW5zaWRlIHRoZSB0cmlhbmdsZSBpbiBpbmNyZWFzaW5nIHotb3JkZXJcbiAgICB2YXIgcCA9IGVhci5uZXh0WjtcblxuICAgIHdoaWxlIChwICYmIHAueiA8PSBtYXhaKSB7XG4gICAgICAgIGlmIChwICE9PSBlYXIucHJldiAmJiBwICE9PSBlYXIubmV4dCAmJlxuICAgICAgICAgICAgcG9pbnRJblRyaWFuZ2xlKGEueCwgYS55LCBiLngsIGIueSwgYy54LCBjLnksIHAueCwgcC55KSAmJlxuICAgICAgICAgICAgYXJlYShwLnByZXYsIHAsIHAubmV4dCkgPj0gMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBwID0gcC5uZXh0WjtcbiAgICB9XG5cbiAgICAvLyB0aGVuIGxvb2sgZm9yIHBvaW50cyBpbiBkZWNyZWFzaW5nIHotb3JkZXJcbiAgICBwID0gZWFyLnByZXZaO1xuXG4gICAgd2hpbGUgKHAgJiYgcC56ID49IG1pblopIHtcbiAgICAgICAgaWYgKHAgIT09IGVhci5wcmV2ICYmIHAgIT09IGVhci5uZXh0ICYmXG4gICAgICAgICAgICBwb2ludEluVHJpYW5nbGUoYS54LCBhLnksIGIueCwgYi55LCBjLngsIGMueSwgcC54LCBwLnkpICYmXG4gICAgICAgICAgICBhcmVhKHAucHJldiwgcCwgcC5uZXh0KSA+PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHAgPSBwLnByZXZaO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG4vLyBnbyB0aHJvdWdoIGFsbCBwb2x5Z29uIG5vZGVzIGFuZCBjdXJlIHNtYWxsIGxvY2FsIHNlbGYtaW50ZXJzZWN0aW9uc1xuZnVuY3Rpb24gY3VyZUxvY2FsSW50ZXJzZWN0aW9ucyhzdGFydCwgdHJpYW5nbGVzLCBkaW0pIHtcbiAgICB2YXIgcCA9IHN0YXJ0O1xuICAgIGRvIHtcbiAgICAgICAgdmFyIGEgPSBwLnByZXYsXG4gICAgICAgICAgICBiID0gcC5uZXh0Lm5leHQ7XG5cbiAgICAgICAgaWYgKCFlcXVhbHMoYSwgYikgJiYgaW50ZXJzZWN0cyhhLCBwLCBwLm5leHQsIGIpICYmIGxvY2FsbHlJbnNpZGUoYSwgYikgJiYgbG9jYWxseUluc2lkZShiLCBhKSkge1xuXG4gICAgICAgICAgICB0cmlhbmdsZXMucHVzaChhLmkgLyBkaW0pO1xuICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2gocC5pIC8gZGltKTtcbiAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKGIuaSAvIGRpbSk7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB0d28gbm9kZXMgaW52b2x2ZWRcbiAgICAgICAgICAgIHJlbW92ZU5vZGUocCk7XG4gICAgICAgICAgICByZW1vdmVOb2RlKHAubmV4dCk7XG5cbiAgICAgICAgICAgIHAgPSBzdGFydCA9IGI7XG4gICAgICAgIH1cbiAgICAgICAgcCA9IHAubmV4dDtcbiAgICB9IHdoaWxlIChwICE9PSBzdGFydCk7XG5cbiAgICByZXR1cm4gcDtcbn1cblxuLy8gdHJ5IHNwbGl0dGluZyBwb2x5Z29uIGludG8gdHdvIGFuZCB0cmlhbmd1bGF0ZSB0aGVtIGluZGVwZW5kZW50bHlcbmZ1bmN0aW9uIHNwbGl0RWFyY3V0KHN0YXJ0LCB0cmlhbmdsZXMsIGRpbSwgbWluWCwgbWluWSwgc2l6ZSkge1xuICAgIC8vIGxvb2sgZm9yIGEgdmFsaWQgZGlhZ29uYWwgdGhhdCBkaXZpZGVzIHRoZSBwb2x5Z29uIGludG8gdHdvXG4gICAgdmFyIGEgPSBzdGFydDtcbiAgICBkbyB7XG4gICAgICAgIHZhciBiID0gYS5uZXh0Lm5leHQ7XG4gICAgICAgIHdoaWxlIChiICE9PSBhLnByZXYpIHtcbiAgICAgICAgICAgIGlmIChhLmkgIT09IGIuaSAmJiBpc1ZhbGlkRGlhZ29uYWwoYSwgYikpIHtcbiAgICAgICAgICAgICAgICAvLyBzcGxpdCB0aGUgcG9seWdvbiBpbiB0d28gYnkgdGhlIGRpYWdvbmFsXG4gICAgICAgICAgICAgICAgdmFyIGMgPSBzcGxpdFBvbHlnb24oYSwgYik7XG5cbiAgICAgICAgICAgICAgICAvLyBmaWx0ZXIgY29saW5lYXIgcG9pbnRzIGFyb3VuZCB0aGUgY3V0c1xuICAgICAgICAgICAgICAgIGEgPSBmaWx0ZXJQb2ludHMoYSwgYS5uZXh0KTtcbiAgICAgICAgICAgICAgICBjID0gZmlsdGVyUG9pbnRzKGMsIGMubmV4dCk7XG5cbiAgICAgICAgICAgICAgICAvLyBydW4gZWFyY3V0IG9uIGVhY2ggaGFsZlxuICAgICAgICAgICAgICAgIGVhcmN1dExpbmtlZChhLCB0cmlhbmdsZXMsIGRpbSwgbWluWCwgbWluWSwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgZWFyY3V0TGlua2VkKGMsIHRyaWFuZ2xlcywgZGltLCBtaW5YLCBtaW5ZLCBzaXplKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiID0gYi5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIGEgPSBhLm5leHQ7XG4gICAgfSB3aGlsZSAoYSAhPT0gc3RhcnQpO1xufVxuXG4vLyBsaW5rIGV2ZXJ5IGhvbGUgaW50byB0aGUgb3V0ZXIgbG9vcCwgcHJvZHVjaW5nIGEgc2luZ2xlLXJpbmcgcG9seWdvbiB3aXRob3V0IGhvbGVzXG5mdW5jdGlvbiBlbGltaW5hdGVIb2xlcyhkYXRhLCBob2xlSW5kaWNlcywgb3V0ZXJOb2RlLCBkaW0pIHtcbiAgICB2YXIgcXVldWUgPSBbXSxcbiAgICAgICAgaSwgbGVuLCBzdGFydCwgZW5kLCBsaXN0O1xuXG4gICAgZm9yIChpID0gMCwgbGVuID0gaG9sZUluZGljZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgc3RhcnQgPSBob2xlSW5kaWNlc1tpXSAqIGRpbTtcbiAgICAgICAgZW5kID0gaSA8IGxlbiAtIDEgPyBob2xlSW5kaWNlc1tpICsgMV0gKiBkaW0gOiBkYXRhLmxlbmd0aDtcbiAgICAgICAgbGlzdCA9IGxpbmtlZExpc3QoZGF0YSwgc3RhcnQsIGVuZCwgZGltLCBmYWxzZSk7XG4gICAgICAgIGlmIChsaXN0ID09PSBsaXN0Lm5leHQpIGxpc3Quc3RlaW5lciA9IHRydWU7XG4gICAgICAgIHF1ZXVlLnB1c2goZ2V0TGVmdG1vc3QobGlzdCkpO1xuICAgIH1cblxuICAgIHF1ZXVlLnNvcnQoY29tcGFyZVgpO1xuXG4gICAgLy8gcHJvY2VzcyBob2xlcyBmcm9tIGxlZnQgdG8gcmlnaHRcbiAgICBmb3IgKGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZWxpbWluYXRlSG9sZShxdWV1ZVtpXSwgb3V0ZXJOb2RlKTtcbiAgICAgICAgb3V0ZXJOb2RlID0gZmlsdGVyUG9pbnRzKG91dGVyTm9kZSwgb3V0ZXJOb2RlLm5leHQpO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRlck5vZGU7XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmVYKGEsIGIpIHtcbiAgICByZXR1cm4gYS54IC0gYi54O1xufVxuXG4vLyBmaW5kIGEgYnJpZGdlIGJldHdlZW4gdmVydGljZXMgdGhhdCBjb25uZWN0cyBob2xlIHdpdGggYW4gb3V0ZXIgcmluZyBhbmQgYW5kIGxpbmsgaXRcbmZ1bmN0aW9uIGVsaW1pbmF0ZUhvbGUoaG9sZSwgb3V0ZXJOb2RlKSB7XG4gICAgb3V0ZXJOb2RlID0gZmluZEhvbGVCcmlkZ2UoaG9sZSwgb3V0ZXJOb2RlKTtcbiAgICBpZiAob3V0ZXJOb2RlKSB7XG4gICAgICAgIHZhciBiID0gc3BsaXRQb2x5Z29uKG91dGVyTm9kZSwgaG9sZSk7XG4gICAgICAgIGZpbHRlclBvaW50cyhiLCBiLm5leHQpO1xuICAgIH1cbn1cblxuLy8gRGF2aWQgRWJlcmx5J3MgYWxnb3JpdGhtIGZvciBmaW5kaW5nIGEgYnJpZGdlIGJldHdlZW4gaG9sZSBhbmQgb3V0ZXIgcG9seWdvblxuZnVuY3Rpb24gZmluZEhvbGVCcmlkZ2UoaG9sZSwgb3V0ZXJOb2RlKSB7XG4gICAgdmFyIHAgPSBvdXRlck5vZGUsXG4gICAgICAgIGh4ID0gaG9sZS54LFxuICAgICAgICBoeSA9IGhvbGUueSxcbiAgICAgICAgcXggPSAtSW5maW5pdHksXG4gICAgICAgIG07XG5cbiAgICAvLyBmaW5kIGEgc2VnbWVudCBpbnRlcnNlY3RlZCBieSBhIHJheSBmcm9tIHRoZSBob2xlJ3MgbGVmdG1vc3QgcG9pbnQgdG8gdGhlIGxlZnQ7XG4gICAgLy8gc2VnbWVudCdzIGVuZHBvaW50IHdpdGggbGVzc2VyIHggd2lsbCBiZSBwb3RlbnRpYWwgY29ubmVjdGlvbiBwb2ludFxuICAgIGRvIHtcbiAgICAgICAgaWYgKGh5IDw9IHAueSAmJiBoeSA+PSBwLm5leHQueSkge1xuICAgICAgICAgICAgdmFyIHggPSBwLnggKyAoaHkgLSBwLnkpICogKHAubmV4dC54IC0gcC54KSAvIChwLm5leHQueSAtIHAueSk7XG4gICAgICAgICAgICBpZiAoeCA8PSBoeCAmJiB4ID4gcXgpIHtcbiAgICAgICAgICAgICAgICBxeCA9IHg7XG4gICAgICAgICAgICAgICAgaWYgKHggPT09IGh4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoeSA9PT0gcC55KSByZXR1cm4gcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGh5ID09PSBwLm5leHQueSkgcmV0dXJuIHAubmV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbSA9IHAueCA8IHAubmV4dC54ID8gcCA6IHAubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwID0gcC5uZXh0O1xuICAgIH0gd2hpbGUgKHAgIT09IG91dGVyTm9kZSk7XG5cbiAgICBpZiAoIW0pIHJldHVybiBudWxsO1xuXG4gICAgaWYgKGh4ID09PSBxeCkgcmV0dXJuIG0ucHJldjsgLy8gaG9sZSB0b3VjaGVzIG91dGVyIHNlZ21lbnQ7IHBpY2sgbG93ZXIgZW5kcG9pbnRcblxuICAgIC8vIGxvb2sgZm9yIHBvaW50cyBpbnNpZGUgdGhlIHRyaWFuZ2xlIG9mIGhvbGUgcG9pbnQsIHNlZ21lbnQgaW50ZXJzZWN0aW9uIGFuZCBlbmRwb2ludDtcbiAgICAvLyBpZiB0aGVyZSBhcmUgbm8gcG9pbnRzIGZvdW5kLCB3ZSBoYXZlIGEgdmFsaWQgY29ubmVjdGlvbjtcbiAgICAvLyBvdGhlcndpc2UgY2hvb3NlIHRoZSBwb2ludCBvZiB0aGUgbWluaW11bSBhbmdsZSB3aXRoIHRoZSByYXkgYXMgY29ubmVjdGlvbiBwb2ludFxuXG4gICAgdmFyIHN0b3AgPSBtLFxuICAgICAgICBteCA9IG0ueCxcbiAgICAgICAgbXkgPSBtLnksXG4gICAgICAgIHRhbk1pbiA9IEluZmluaXR5LFxuICAgICAgICB0YW47XG5cbiAgICBwID0gbS5uZXh0O1xuXG4gICAgd2hpbGUgKHAgIT09IHN0b3ApIHtcbiAgICAgICAgaWYgKGh4ID49IHAueCAmJiBwLnggPj0gbXggJiZcbiAgICAgICAgICAgICAgICBwb2ludEluVHJpYW5nbGUoaHkgPCBteSA/IGh4IDogcXgsIGh5LCBteCwgbXksIGh5IDwgbXkgPyBxeCA6IGh4LCBoeSwgcC54LCBwLnkpKSB7XG5cbiAgICAgICAgICAgIHRhbiA9IE1hdGguYWJzKGh5IC0gcC55KSAvIChoeCAtIHAueCk7IC8vIHRhbmdlbnRpYWxcblxuICAgICAgICAgICAgaWYgKCh0YW4gPCB0YW5NaW4gfHwgKHRhbiA9PT0gdGFuTWluICYmIHAueCA+IG0ueCkpICYmIGxvY2FsbHlJbnNpZGUocCwgaG9sZSkpIHtcbiAgICAgICAgICAgICAgICBtID0gcDtcbiAgICAgICAgICAgICAgICB0YW5NaW4gPSB0YW47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwID0gcC5uZXh0O1xuICAgIH1cblxuICAgIHJldHVybiBtO1xufVxuXG4vLyBpbnRlcmxpbmsgcG9seWdvbiBub2RlcyBpbiB6LW9yZGVyXG5mdW5jdGlvbiBpbmRleEN1cnZlKHN0YXJ0LCBtaW5YLCBtaW5ZLCBzaXplKSB7XG4gICAgdmFyIHAgPSBzdGFydDtcbiAgICBkbyB7XG4gICAgICAgIGlmIChwLnogPT09IG51bGwpIHAueiA9IHpPcmRlcihwLngsIHAueSwgbWluWCwgbWluWSwgc2l6ZSk7XG4gICAgICAgIHAucHJldlogPSBwLnByZXY7XG4gICAgICAgIHAubmV4dFogPSBwLm5leHQ7XG4gICAgICAgIHAgPSBwLm5leHQ7XG4gICAgfSB3aGlsZSAocCAhPT0gc3RhcnQpO1xuXG4gICAgcC5wcmV2Wi5uZXh0WiA9IG51bGw7XG4gICAgcC5wcmV2WiA9IG51bGw7XG5cbiAgICBzb3J0TGlua2VkKHApO1xufVxuXG4vLyBTaW1vbiBUYXRoYW0ncyBsaW5rZWQgbGlzdCBtZXJnZSBzb3J0IGFsZ29yaXRobVxuLy8gaHR0cDovL3d3dy5jaGlhcmsuZ3JlZW5lbmQub3JnLnVrL35zZ3RhdGhhbS9hbGdvcml0aG1zL2xpc3Rzb3J0Lmh0bWxcbmZ1bmN0aW9uIHNvcnRMaW5rZWQobGlzdCkge1xuICAgIHZhciBpLCBwLCBxLCBlLCB0YWlsLCBudW1NZXJnZXMsIHBTaXplLCBxU2l6ZSxcbiAgICAgICAgaW5TaXplID0gMTtcblxuICAgIGRvIHtcbiAgICAgICAgcCA9IGxpc3Q7XG4gICAgICAgIGxpc3QgPSBudWxsO1xuICAgICAgICB0YWlsID0gbnVsbDtcbiAgICAgICAgbnVtTWVyZ2VzID0gMDtcblxuICAgICAgICB3aGlsZSAocCkge1xuICAgICAgICAgICAgbnVtTWVyZ2VzKys7XG4gICAgICAgICAgICBxID0gcDtcbiAgICAgICAgICAgIHBTaXplID0gMDtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBpblNpemU7IGkrKykge1xuICAgICAgICAgICAgICAgIHBTaXplKys7XG4gICAgICAgICAgICAgICAgcSA9IHEubmV4dFo7XG4gICAgICAgICAgICAgICAgaWYgKCFxKSBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcVNpemUgPSBpblNpemU7XG5cbiAgICAgICAgICAgIHdoaWxlIChwU2l6ZSA+IDAgfHwgKHFTaXplID4gMCAmJiBxKSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHBTaXplID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGUgPSBxO1xuICAgICAgICAgICAgICAgICAgICBxID0gcS5uZXh0WjtcbiAgICAgICAgICAgICAgICAgICAgcVNpemUtLTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHFTaXplID09PSAwIHx8ICFxKSB7XG4gICAgICAgICAgICAgICAgICAgIGUgPSBwO1xuICAgICAgICAgICAgICAgICAgICBwID0gcC5uZXh0WjtcbiAgICAgICAgICAgICAgICAgICAgcFNpemUtLTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHAueiA8PSBxLnopIHtcbiAgICAgICAgICAgICAgICAgICAgZSA9IHA7XG4gICAgICAgICAgICAgICAgICAgIHAgPSBwLm5leHRaO1xuICAgICAgICAgICAgICAgICAgICBwU2l6ZS0tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGUgPSBxO1xuICAgICAgICAgICAgICAgICAgICBxID0gcS5uZXh0WjtcbiAgICAgICAgICAgICAgICAgICAgcVNpemUtLTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGFpbCkgdGFpbC5uZXh0WiA9IGU7XG4gICAgICAgICAgICAgICAgZWxzZSBsaXN0ID0gZTtcblxuICAgICAgICAgICAgICAgIGUucHJldlogPSB0YWlsO1xuICAgICAgICAgICAgICAgIHRhaWwgPSBlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwID0gcTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhaWwubmV4dFogPSBudWxsO1xuICAgICAgICBpblNpemUgKj0gMjtcblxuICAgIH0gd2hpbGUgKG51bU1lcmdlcyA+IDEpO1xuXG4gICAgcmV0dXJuIGxpc3Q7XG59XG5cbi8vIHotb3JkZXIgb2YgYSBwb2ludCBnaXZlbiBjb29yZHMgYW5kIHNpemUgb2YgdGhlIGRhdGEgYm91bmRpbmcgYm94XG5mdW5jdGlvbiB6T3JkZXIoeCwgeSwgbWluWCwgbWluWSwgc2l6ZSkge1xuICAgIC8vIGNvb3JkcyBhcmUgdHJhbnNmb3JtZWQgaW50byBub24tbmVnYXRpdmUgMTUtYml0IGludGVnZXIgcmFuZ2VcbiAgICB4ID0gMzI3NjcgKiAoeCAtIG1pblgpIC8gc2l6ZTtcbiAgICB5ID0gMzI3NjcgKiAoeSAtIG1pblkpIC8gc2l6ZTtcblxuICAgIHggPSAoeCB8ICh4IDw8IDgpKSAmIDB4MDBGRjAwRkY7XG4gICAgeCA9ICh4IHwgKHggPDwgNCkpICYgMHgwRjBGMEYwRjtcbiAgICB4ID0gKHggfCAoeCA8PCAyKSkgJiAweDMzMzMzMzMzO1xuICAgIHggPSAoeCB8ICh4IDw8IDEpKSAmIDB4NTU1NTU1NTU7XG5cbiAgICB5ID0gKHkgfCAoeSA8PCA4KSkgJiAweDAwRkYwMEZGO1xuICAgIHkgPSAoeSB8ICh5IDw8IDQpKSAmIDB4MEYwRjBGMEY7XG4gICAgeSA9ICh5IHwgKHkgPDwgMikpICYgMHgzMzMzMzMzMztcbiAgICB5ID0gKHkgfCAoeSA8PCAxKSkgJiAweDU1NTU1NTU1O1xuXG4gICAgcmV0dXJuIHggfCAoeSA8PCAxKTtcbn1cblxuLy8gZmluZCB0aGUgbGVmdG1vc3Qgbm9kZSBvZiBhIHBvbHlnb24gcmluZ1xuZnVuY3Rpb24gZ2V0TGVmdG1vc3Qoc3RhcnQpIHtcbiAgICB2YXIgcCA9IHN0YXJ0LFxuICAgICAgICBsZWZ0bW9zdCA9IHN0YXJ0O1xuICAgIGRvIHtcbiAgICAgICAgaWYgKHAueCA8IGxlZnRtb3N0LngpIGxlZnRtb3N0ID0gcDtcbiAgICAgICAgcCA9IHAubmV4dDtcbiAgICB9IHdoaWxlIChwICE9PSBzdGFydCk7XG5cbiAgICByZXR1cm4gbGVmdG1vc3Q7XG59XG5cbi8vIGNoZWNrIGlmIGEgcG9pbnQgbGllcyB3aXRoaW4gYSBjb252ZXggdHJpYW5nbGVcbmZ1bmN0aW9uIHBvaW50SW5UcmlhbmdsZShheCwgYXksIGJ4LCBieSwgY3gsIGN5LCBweCwgcHkpIHtcbiAgICByZXR1cm4gKGN4IC0gcHgpICogKGF5IC0gcHkpIC0gKGF4IC0gcHgpICogKGN5IC0gcHkpID49IDAgJiZcbiAgICAgICAgICAgKGF4IC0gcHgpICogKGJ5IC0gcHkpIC0gKGJ4IC0gcHgpICogKGF5IC0gcHkpID49IDAgJiZcbiAgICAgICAgICAgKGJ4IC0gcHgpICogKGN5IC0gcHkpIC0gKGN4IC0gcHgpICogKGJ5IC0gcHkpID49IDA7XG59XG5cbi8vIGNoZWNrIGlmIGEgZGlhZ29uYWwgYmV0d2VlbiB0d28gcG9seWdvbiBub2RlcyBpcyB2YWxpZCAobGllcyBpbiBwb2x5Z29uIGludGVyaW9yKVxuZnVuY3Rpb24gaXNWYWxpZERpYWdvbmFsKGEsIGIpIHtcbiAgICByZXR1cm4gYS5uZXh0LmkgIT09IGIuaSAmJiBhLnByZXYuaSAhPT0gYi5pICYmICFpbnRlcnNlY3RzUG9seWdvbihhLCBiKSAmJlxuICAgICAgICAgICBsb2NhbGx5SW5zaWRlKGEsIGIpICYmIGxvY2FsbHlJbnNpZGUoYiwgYSkgJiYgbWlkZGxlSW5zaWRlKGEsIGIpO1xufVxuXG4vLyBzaWduZWQgYXJlYSBvZiBhIHRyaWFuZ2xlXG5mdW5jdGlvbiBhcmVhKHAsIHEsIHIpIHtcbiAgICByZXR1cm4gKHEueSAtIHAueSkgKiAoci54IC0gcS54KSAtIChxLnggLSBwLngpICogKHIueSAtIHEueSk7XG59XG5cbi8vIGNoZWNrIGlmIHR3byBwb2ludHMgYXJlIGVxdWFsXG5mdW5jdGlvbiBlcXVhbHMocDEsIHAyKSB7XG4gICAgcmV0dXJuIHAxLnggPT09IHAyLnggJiYgcDEueSA9PT0gcDIueTtcbn1cblxuLy8gY2hlY2sgaWYgdHdvIHNlZ21lbnRzIGludGVyc2VjdFxuZnVuY3Rpb24gaW50ZXJzZWN0cyhwMSwgcTEsIHAyLCBxMikge1xuICAgIGlmICgoZXF1YWxzKHAxLCBxMSkgJiYgZXF1YWxzKHAyLCBxMikpIHx8XG4gICAgICAgIChlcXVhbHMocDEsIHEyKSAmJiBlcXVhbHMocDIsIHExKSkpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBhcmVhKHAxLCBxMSwgcDIpID4gMCAhPT0gYXJlYShwMSwgcTEsIHEyKSA+IDAgJiZcbiAgICAgICAgICAgYXJlYShwMiwgcTIsIHAxKSA+IDAgIT09IGFyZWEocDIsIHEyLCBxMSkgPiAwO1xufVxuXG4vLyBjaGVjayBpZiBhIHBvbHlnb24gZGlhZ29uYWwgaW50ZXJzZWN0cyBhbnkgcG9seWdvbiBzZWdtZW50c1xuZnVuY3Rpb24gaW50ZXJzZWN0c1BvbHlnb24oYSwgYikge1xuICAgIHZhciBwID0gYTtcbiAgICBkbyB7XG4gICAgICAgIGlmIChwLmkgIT09IGEuaSAmJiBwLm5leHQuaSAhPT0gYS5pICYmIHAuaSAhPT0gYi5pICYmIHAubmV4dC5pICE9PSBiLmkgJiZcbiAgICAgICAgICAgICAgICBpbnRlcnNlY3RzKHAsIHAubmV4dCwgYSwgYikpIHJldHVybiB0cnVlO1xuICAgICAgICBwID0gcC5uZXh0O1xuICAgIH0gd2hpbGUgKHAgIT09IGEpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBjaGVjayBpZiBhIHBvbHlnb24gZGlhZ29uYWwgaXMgbG9jYWxseSBpbnNpZGUgdGhlIHBvbHlnb25cbmZ1bmN0aW9uIGxvY2FsbHlJbnNpZGUoYSwgYikge1xuICAgIHJldHVybiBhcmVhKGEucHJldiwgYSwgYS5uZXh0KSA8IDAgP1xuICAgICAgICBhcmVhKGEsIGIsIGEubmV4dCkgPj0gMCAmJiBhcmVhKGEsIGEucHJldiwgYikgPj0gMCA6XG4gICAgICAgIGFyZWEoYSwgYiwgYS5wcmV2KSA8IDAgfHwgYXJlYShhLCBhLm5leHQsIGIpIDwgMDtcbn1cblxuLy8gY2hlY2sgaWYgdGhlIG1pZGRsZSBwb2ludCBvZiBhIHBvbHlnb24gZGlhZ29uYWwgaXMgaW5zaWRlIHRoZSBwb2x5Z29uXG5mdW5jdGlvbiBtaWRkbGVJbnNpZGUoYSwgYikge1xuICAgIHZhciBwID0gYSxcbiAgICAgICAgaW5zaWRlID0gZmFsc2UsXG4gICAgICAgIHB4ID0gKGEueCArIGIueCkgLyAyLFxuICAgICAgICBweSA9IChhLnkgKyBiLnkpIC8gMjtcbiAgICBkbyB7XG4gICAgICAgIGlmICgoKHAueSA+IHB5KSAhPT0gKHAubmV4dC55ID4gcHkpKSAmJiAocHggPCAocC5uZXh0LnggLSBwLngpICogKHB5IC0gcC55KSAvIChwLm5leHQueSAtIHAueSkgKyBwLngpKVxuICAgICAgICAgICAgaW5zaWRlID0gIWluc2lkZTtcbiAgICAgICAgcCA9IHAubmV4dDtcbiAgICB9IHdoaWxlIChwICE9PSBhKTtcblxuICAgIHJldHVybiBpbnNpZGU7XG59XG5cbi8vIGxpbmsgdHdvIHBvbHlnb24gdmVydGljZXMgd2l0aCBhIGJyaWRnZTsgaWYgdGhlIHZlcnRpY2VzIGJlbG9uZyB0byB0aGUgc2FtZSByaW5nLCBpdCBzcGxpdHMgcG9seWdvbiBpbnRvIHR3bztcbi8vIGlmIG9uZSBiZWxvbmdzIHRvIHRoZSBvdXRlciByaW5nIGFuZCBhbm90aGVyIHRvIGEgaG9sZSwgaXQgbWVyZ2VzIGl0IGludG8gYSBzaW5nbGUgcmluZ1xuZnVuY3Rpb24gc3BsaXRQb2x5Z29uKGEsIGIpIHtcbiAgICB2YXIgYTIgPSBuZXcgTm9kZShhLmksIGEueCwgYS55KSxcbiAgICAgICAgYjIgPSBuZXcgTm9kZShiLmksIGIueCwgYi55KSxcbiAgICAgICAgYW4gPSBhLm5leHQsXG4gICAgICAgIGJwID0gYi5wcmV2O1xuXG4gICAgYS5uZXh0ID0gYjtcbiAgICBiLnByZXYgPSBhO1xuXG4gICAgYTIubmV4dCA9IGFuO1xuICAgIGFuLnByZXYgPSBhMjtcblxuICAgIGIyLm5leHQgPSBhMjtcbiAgICBhMi5wcmV2ID0gYjI7XG5cbiAgICBicC5uZXh0ID0gYjI7XG4gICAgYjIucHJldiA9IGJwO1xuXG4gICAgcmV0dXJuIGIyO1xufVxuXG4vLyBjcmVhdGUgYSBub2RlIGFuZCBvcHRpb25hbGx5IGxpbmsgaXQgd2l0aCBwcmV2aW91cyBvbmUgKGluIGEgY2lyY3VsYXIgZG91Ymx5IGxpbmtlZCBsaXN0KVxuZnVuY3Rpb24gaW5zZXJ0Tm9kZShpLCB4LCB5LCBsYXN0KSB7XG4gICAgdmFyIHAgPSBuZXcgTm9kZShpLCB4LCB5KTtcblxuICAgIGlmICghbGFzdCkge1xuICAgICAgICBwLnByZXYgPSBwO1xuICAgICAgICBwLm5leHQgPSBwO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcC5uZXh0ID0gbGFzdC5uZXh0O1xuICAgICAgICBwLnByZXYgPSBsYXN0O1xuICAgICAgICBsYXN0Lm5leHQucHJldiA9IHA7XG4gICAgICAgIGxhc3QubmV4dCA9IHA7XG4gICAgfVxuICAgIHJldHVybiBwO1xufVxuXG5mdW5jdGlvbiByZW1vdmVOb2RlKHApIHtcbiAgICBwLm5leHQucHJldiA9IHAucHJldjtcbiAgICBwLnByZXYubmV4dCA9IHAubmV4dDtcblxuICAgIGlmIChwLnByZXZaKSBwLnByZXZaLm5leHRaID0gcC5uZXh0WjtcbiAgICBpZiAocC5uZXh0WikgcC5uZXh0Wi5wcmV2WiA9IHAucHJldlo7XG59XG5cbmZ1bmN0aW9uIE5vZGUoaSwgeCwgeSkge1xuICAgIC8vIHZlcnRpY2UgaW5kZXggaW4gY29vcmRpbmF0ZXMgYXJyYXlcbiAgICB0aGlzLmkgPSBpO1xuXG4gICAgLy8gdmVydGV4IGNvb3JkaW5hdGVzXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuXG4gICAgLy8gcHJldmlvdXMgYW5kIG5leHQgdmVydGljZSBub2RlcyBpbiBhIHBvbHlnb24gcmluZ1xuICAgIHRoaXMucHJldiA9IG51bGw7XG4gICAgdGhpcy5uZXh0ID0gbnVsbDtcblxuICAgIC8vIHotb3JkZXIgY3VydmUgdmFsdWVcbiAgICB0aGlzLnogPSBudWxsO1xuXG4gICAgLy8gcHJldmlvdXMgYW5kIG5leHQgbm9kZXMgaW4gei1vcmRlclxuICAgIHRoaXMucHJldlogPSBudWxsO1xuICAgIHRoaXMubmV4dFogPSBudWxsO1xuXG4gICAgLy8gaW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBpcyBhIHN0ZWluZXIgcG9pbnRcbiAgICB0aGlzLnN0ZWluZXIgPSBmYWxzZTtcbn1cblxuLy8gcmV0dXJuIGEgcGVyY2VudGFnZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIHBvbHlnb24gYXJlYSBhbmQgaXRzIHRyaWFuZ3VsYXRpb24gYXJlYTtcbi8vIHVzZWQgdG8gdmVyaWZ5IGNvcnJlY3RuZXNzIG9mIHRyaWFuZ3VsYXRpb25cbmVhcmN1dC5kZXZpYXRpb24gPSBmdW5jdGlvbiAoZGF0YSwgaG9sZUluZGljZXMsIGRpbSwgdHJpYW5nbGVzKSB7XG4gICAgdmFyIGhhc0hvbGVzID0gaG9sZUluZGljZXMgJiYgaG9sZUluZGljZXMubGVuZ3RoO1xuICAgIHZhciBvdXRlckxlbiA9IGhhc0hvbGVzID8gaG9sZUluZGljZXNbMF0gKiBkaW0gOiBkYXRhLmxlbmd0aDtcblxuICAgIHZhciBwb2x5Z29uQXJlYSA9IE1hdGguYWJzKHNpZ25lZEFyZWEoZGF0YSwgMCwgb3V0ZXJMZW4sIGRpbSkpO1xuICAgIGlmIChoYXNIb2xlcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gaG9sZUluZGljZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGhvbGVJbmRpY2VzW2ldICogZGltO1xuICAgICAgICAgICAgdmFyIGVuZCA9IGkgPCBsZW4gLSAxID8gaG9sZUluZGljZXNbaSArIDFdICogZGltIDogZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICBwb2x5Z29uQXJlYSAtPSBNYXRoLmFicyhzaWduZWRBcmVhKGRhdGEsIHN0YXJ0LCBlbmQsIGRpbSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHRyaWFuZ2xlc0FyZWEgPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0cmlhbmdsZXMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgdmFyIGEgPSB0cmlhbmdsZXNbaV0gKiBkaW07XG4gICAgICAgIHZhciBiID0gdHJpYW5nbGVzW2kgKyAxXSAqIGRpbTtcbiAgICAgICAgdmFyIGMgPSB0cmlhbmdsZXNbaSArIDJdICogZGltO1xuICAgICAgICB0cmlhbmdsZXNBcmVhICs9IE1hdGguYWJzKFxuICAgICAgICAgICAgKGRhdGFbYV0gLSBkYXRhW2NdKSAqIChkYXRhW2IgKyAxXSAtIGRhdGFbYSArIDFdKSAtXG4gICAgICAgICAgICAoZGF0YVthXSAtIGRhdGFbYl0pICogKGRhdGFbYyArIDFdIC0gZGF0YVthICsgMV0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9seWdvbkFyZWEgPT09IDAgJiYgdHJpYW5nbGVzQXJlYSA9PT0gMCA/IDAgOlxuICAgICAgICBNYXRoLmFicygodHJpYW5nbGVzQXJlYSAtIHBvbHlnb25BcmVhKSAvIHBvbHlnb25BcmVhKTtcbn07XG5cbmZ1bmN0aW9uIHNpZ25lZEFyZWEoZGF0YSwgc3RhcnQsIGVuZCwgZGltKSB7XG4gICAgdmFyIHN1bSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0LCBqID0gZW5kIC0gZGltOyBpIDwgZW5kOyBpICs9IGRpbSkge1xuICAgICAgICBzdW0gKz0gKGRhdGFbal0gLSBkYXRhW2ldKSAqIChkYXRhW2kgKyAxXSArIGRhdGFbaiArIDFdKTtcbiAgICAgICAgaiA9IGk7XG4gICAgfVxuICAgIHJldHVybiBzdW07XG59XG5cbi8vIHR1cm4gYSBwb2x5Z29uIGluIGEgbXVsdGktZGltZW5zaW9uYWwgYXJyYXkgZm9ybSAoZS5nLiBhcyBpbiBHZW9KU09OKSBpbnRvIGEgZm9ybSBFYXJjdXQgYWNjZXB0c1xuZWFyY3V0LmZsYXR0ZW4gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciBkaW0gPSBkYXRhWzBdWzBdLmxlbmd0aCxcbiAgICAgICAgcmVzdWx0ID0ge3ZlcnRpY2VzOiBbXSwgaG9sZXM6IFtdLCBkaW1lbnNpb25zOiBkaW19LFxuICAgICAgICBob2xlSW5kZXggPSAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGF0YVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgZm9yICh2YXIgZCA9IDA7IGQgPCBkaW07IGQrKykgcmVzdWx0LnZlcnRpY2VzLnB1c2goZGF0YVtpXVtqXVtkXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICBob2xlSW5kZXggKz0gZGF0YVtpIC0gMV0ubGVuZ3RoO1xuICAgICAgICAgICAgcmVzdWx0LmhvbGVzLnB1c2goaG9sZUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTsiXSwic291cmNlUm9vdCI6Ii8ifQ==