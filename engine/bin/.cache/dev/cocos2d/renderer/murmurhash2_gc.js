
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/murmurhash2_gc.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = murmurhash2_32_gc;

/**
 * JS Implementation of MurmurHash2
 * 
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 * 
 * @param {string} str ASCII only
 * @param {number} seed Positive integer only
 * @return {number} 32-bit positive integer hash
 */
function murmurhash2_32_gc(str, seed) {
  var l = str.length,
      h = seed ^ l,
      i = 0,
      k;

  while (l >= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    k ^= k >>> 24;
    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;
    l -= 4;
    ++i;
  }

  switch (l) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  }

  h ^= h >>> 13;
  h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  h ^= h >>> 15;
  return h >>> 0;
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9tdXJtdXJoYXNoMl9nYy5qcyJdLCJuYW1lcyI6WyJtdXJtdXJoYXNoMl8zMl9nYyIsInN0ciIsInNlZWQiLCJsIiwibGVuZ3RoIiwiaCIsImkiLCJrIiwiY2hhckNvZGVBdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFhZSxTQUFTQSxpQkFBVCxDQUEyQkMsR0FBM0IsRUFBZ0NDLElBQWhDLEVBQXNDO0FBQ25ELE1BQ0VDLENBQUMsR0FBR0YsR0FBRyxDQUFDRyxNQURWO0FBQUEsTUFFRUMsQ0FBQyxHQUFHSCxJQUFJLEdBQUdDLENBRmI7QUFBQSxNQUdFRyxDQUFDLEdBQUcsQ0FITjtBQUFBLE1BSUVDLENBSkY7O0FBTUEsU0FBT0osQ0FBQyxJQUFJLENBQVosRUFBZTtBQUNkSSxJQUFBQSxDQUFDLEdBQ0dOLEdBQUcsQ0FBQ08sVUFBSixDQUFlRixDQUFmLElBQW9CLElBQXRCLEdBQ0MsQ0FBQ0wsR0FBRyxDQUFDTyxVQUFKLENBQWUsRUFBRUYsQ0FBakIsSUFBc0IsSUFBdkIsS0FBZ0MsQ0FEakMsR0FFQyxDQUFDTCxHQUFHLENBQUNPLFVBQUosQ0FBZSxFQUFFRixDQUFqQixJQUFzQixJQUF2QixLQUFnQyxFQUZqQyxHQUdDLENBQUNMLEdBQUcsQ0FBQ08sVUFBSixDQUFlLEVBQUVGLENBQWpCLElBQXNCLElBQXZCLEtBQWdDLEVBSm5DO0FBTUNDLElBQUFBLENBQUMsR0FBSyxDQUFDQSxDQUFDLEdBQUcsTUFBTCxJQUFlLFVBQWhCLElBQStCLENBQUUsQ0FBQ0EsQ0FBQyxLQUFLLEVBQVAsSUFBYSxVQUFkLEdBQTRCLE1BQTdCLEtBQXdDLEVBQXZFLENBQUw7QUFDQUEsSUFBQUEsQ0FBQyxJQUFJQSxDQUFDLEtBQUssRUFBWDtBQUNBQSxJQUFBQSxDQUFDLEdBQUssQ0FBQ0EsQ0FBQyxHQUFHLE1BQUwsSUFBZSxVQUFoQixJQUErQixDQUFFLENBQUNBLENBQUMsS0FBSyxFQUFQLElBQWEsVUFBZCxHQUE0QixNQUE3QixLQUF3QyxFQUF2RSxDQUFMO0FBRUhGLElBQUFBLENBQUMsR0FBSyxDQUFDQSxDQUFDLEdBQUcsTUFBTCxJQUFlLFVBQWhCLElBQStCLENBQUUsQ0FBQ0EsQ0FBQyxLQUFLLEVBQVAsSUFBYSxVQUFkLEdBQTRCLE1BQTdCLEtBQXdDLEVBQXZFLENBQUQsR0FBK0VFLENBQW5GO0FBRUdKLElBQUFBLENBQUMsSUFBSSxDQUFMO0FBQ0EsTUFBRUcsQ0FBRjtBQUNEOztBQUVELFVBQVFILENBQVI7QUFDQSxTQUFLLENBQUw7QUFBUUUsTUFBQUEsQ0FBQyxJQUFJLENBQUNKLEdBQUcsQ0FBQ08sVUFBSixDQUFlRixDQUFDLEdBQUcsQ0FBbkIsSUFBd0IsSUFBekIsS0FBa0MsRUFBdkM7O0FBQ1IsU0FBSyxDQUFMO0FBQVFELE1BQUFBLENBQUMsSUFBSSxDQUFDSixHQUFHLENBQUNPLFVBQUosQ0FBZUYsQ0FBQyxHQUFHLENBQW5CLElBQXdCLElBQXpCLEtBQWtDLENBQXZDOztBQUNSLFNBQUssQ0FBTDtBQUFRRCxNQUFBQSxDQUFDLElBQUtKLEdBQUcsQ0FBQ08sVUFBSixDQUFlRixDQUFmLElBQW9CLElBQTFCO0FBQ0FELE1BQUFBLENBQUMsR0FBSyxDQUFDQSxDQUFDLEdBQUcsTUFBTCxJQUFlLFVBQWhCLElBQStCLENBQUUsQ0FBQ0EsQ0FBQyxLQUFLLEVBQVAsSUFBYSxVQUFkLEdBQTRCLE1BQTdCLEtBQXdDLEVBQXZFLENBQUw7QUFKUjs7QUFPQUEsRUFBQUEsQ0FBQyxJQUFJQSxDQUFDLEtBQUssRUFBWDtBQUNBQSxFQUFBQSxDQUFDLEdBQUssQ0FBQ0EsQ0FBQyxHQUFHLE1BQUwsSUFBZSxVQUFoQixJQUErQixDQUFFLENBQUNBLENBQUMsS0FBSyxFQUFQLElBQWEsVUFBZCxHQUE0QixNQUE3QixLQUF3QyxFQUF2RSxDQUFMO0FBQ0FBLEVBQUFBLENBQUMsSUFBSUEsQ0FBQyxLQUFLLEVBQVg7QUFFQSxTQUFPQSxDQUFDLEtBQUssQ0FBYjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBKUyBJbXBsZW1lbnRhdGlvbiBvZiBNdXJtdXJIYXNoMlxuICogXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86Z2FyeS5jb3VydEBnbWFpbC5jb21cIj5HYXJ5IENvdXJ0PC9hPlxuICogQHNlZSBodHRwOi8vZ2l0aHViLmNvbS9nYXJ5Y291cnQvbXVybXVyaGFzaC1qc1xuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmFhcHBsZWJ5QGdtYWlsLmNvbVwiPkF1c3RpbiBBcHBsZWJ5PC9hPlxuICogQHNlZSBodHRwOi8vc2l0ZXMuZ29vZ2xlLmNvbS9zaXRlL211cm11cmhhc2gvXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgQVNDSUkgb25seVxuICogQHBhcmFtIHtudW1iZXJ9IHNlZWQgUG9zaXRpdmUgaW50ZWdlciBvbmx5XG4gKiBAcmV0dXJuIHtudW1iZXJ9IDMyLWJpdCBwb3NpdGl2ZSBpbnRlZ2VyIGhhc2hcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtdXJtdXJoYXNoMl8zMl9nYyhzdHIsIHNlZWQpIHtcbiAgdmFyXG4gICAgbCA9IHN0ci5sZW5ndGgsXG4gICAgaCA9IHNlZWQgXiBsLFxuICAgIGkgPSAwLFxuICAgIGs7XG4gIFxuICB3aGlsZSAobCA+PSA0KSB7XG4gIFx0ayA9IFxuICBcdCAgKChzdHIuY2hhckNvZGVBdChpKSAmIDB4ZmYpKSB8XG4gIFx0ICAoKHN0ci5jaGFyQ29kZUF0KCsraSkgJiAweGZmKSA8PCA4KSB8XG4gIFx0ICAoKHN0ci5jaGFyQ29kZUF0KCsraSkgJiAweGZmKSA8PCAxNikgfFxuICBcdCAgKChzdHIuY2hhckNvZGVBdCgrK2kpICYgMHhmZikgPDwgMjQpO1xuICAgIFxuICAgIGsgPSAoKChrICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUpICsgKCgoKGsgPj4+IDE2KSAqIDB4NWJkMWU5OTUpICYgMHhmZmZmKSA8PCAxNikpO1xuICAgIGsgXj0gayA+Pj4gMjQ7XG4gICAgayA9ICgoKGsgJiAweGZmZmYpICogMHg1YmQxZTk5NSkgKyAoKCgoayA+Pj4gMTYpICogMHg1YmQxZTk5NSkgJiAweGZmZmYpIDw8IDE2KSk7XG5cblx0aCA9ICgoKGggJiAweGZmZmYpICogMHg1YmQxZTk5NSkgKyAoKCgoaCA+Pj4gMTYpICogMHg1YmQxZTk5NSkgJiAweGZmZmYpIDw8IDE2KSkgXiBrO1xuXG4gICAgbCAtPSA0O1xuICAgICsraTtcbiAgfVxuICBcbiAgc3dpdGNoIChsKSB7XG4gIGNhc2UgMzogaCBePSAoc3RyLmNoYXJDb2RlQXQoaSArIDIpICYgMHhmZikgPDwgMTY7XG4gIGNhc2UgMjogaCBePSAoc3RyLmNoYXJDb2RlQXQoaSArIDEpICYgMHhmZikgPDwgODtcbiAgY2FzZSAxOiBoIF49IChzdHIuY2hhckNvZGVBdChpKSAmIDB4ZmYpO1xuICAgICAgICAgIGggPSAoKChoICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUpICsgKCgoKGggPj4+IDE2KSAqIDB4NWJkMWU5OTUpICYgMHhmZmZmKSA8PCAxNikpO1xuICB9XG5cbiAgaCBePSBoID4+PiAxMztcbiAgaCA9ICgoKGggJiAweGZmZmYpICogMHg1YmQxZTk5NSkgKyAoKCgoaCA+Pj4gMTYpICogMHg1YmQxZTk5NSkgJiAweGZmZmYpIDw8IDE2KSk7XG4gIGggXj0gaCA+Pj4gMTU7XG5cbiAgcmV0dXJuIGggPj4+IDA7XG59Il0sInNvdXJjZVJvb3QiOiIvIn0=