
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/memop/timsort.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = _default;
// reference: https://github.com/mziccard/node-timsort

/**
 * Default minimum size of a run.
 */
var DEFAULT_MIN_MERGE = 32;
/**
 * Minimum ordered subsequece required to do galloping.
 */

var DEFAULT_MIN_GALLOPING = 7;
/**
 * Default tmp storage length. Can increase depending on the size of the
 * smallest run to merge.
 */

var DEFAULT_TMP_STORAGE_LENGTH = 256;
/**
 * Pre-computed powers of 10 for efficient lexicographic comparison of
 * small integers.
 */

var POWERS_OF_TEN = [1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9];
/**
 * Estimate the logarithm base 10 of a small integer.
 *
 * @param {number} x - The integer to estimate the logarithm of.
 * @return {number} - The estimated logarithm of the integer.
 */

function log10(x) {
  if (x < 1e5) {
    if (x < 1e2) {
      return x < 1e1 ? 0 : 1;
    }

    if (x < 1e4) {
      return x < 1e3 ? 2 : 3;
    }

    return 4;
  }

  if (x < 1e7) {
    return x < 1e6 ? 5 : 6;
  }

  if (x < 1e9) {
    return x < 1e8 ? 7 : 8;
  }

  return 9;
}
/**
 * Default alphabetical comparison of items.
 *
 * @param {string|object|number} a - First element to compare.
 * @param {string|object|number} b - Second element to compare.
 * @return {number} - A positive number if a.toString() > b.toString(), a
 * negative number if .toString() < b.toString(), 0 otherwise.
 */


function alphabeticalCompare(a, b) {
  if (a === b) {
    return 0;
  }

  if (~~a === a && ~~b === b) {
    if (a === 0 || b === 0) {
      return a < b ? -1 : 1;
    }

    if (a < 0 || b < 0) {
      if (b >= 0) {
        return -1;
      }

      if (a >= 0) {
        return 1;
      }

      a = -a;
      b = -b;
    }

    var al = log10(a);
    var bl = log10(b);
    var t = 0;

    if (al < bl) {
      a *= POWERS_OF_TEN[bl - al - 1];
      b /= 10;
      t = -1;
    } else if (al > bl) {
      b *= POWERS_OF_TEN[al - bl - 1];
      a /= 10;
      t = 1;
    }

    if (a === b) {
      return t;
    }

    return a < b ? -1 : 1;
  }

  var aStr = String(a);
  var bStr = String(b);

  if (aStr === bStr) {
    return 0;
  }

  return aStr < bStr ? -1 : 1;
}
/**
 * Compute minimum run length for TimSort
 *
 * @param {number} n - The size of the array to sort.
 */


function minRunLength(n) {
  var r = 0;

  while (n >= DEFAULT_MIN_MERGE) {
    r |= n & 1;
    n >>= 1;
  }

  return n + r;
}
/**
 * Counts the length of a monotonically ascending or strictly monotonically
 * descending sequence (run) starting at array[lo] in the range [lo, hi). If
 * the run is descending it is made ascending.
 *
 * @param {array} array - The array to reverse.
 * @param {number} lo - First element in the range (inclusive).
 * @param {number} hi - Last element in the range.
 * @param {function} compare - Item comparison function.
 * @return {number} - The length of the run.
 */


function makeAscendingRun(array, lo, hi, compare) {
  var runHi = lo + 1;

  if (runHi === hi) {
    return 1;
  } // Descending


  if (compare(array[runHi++], array[lo]) < 0) {
    while (runHi < hi && compare(array[runHi], array[runHi - 1]) < 0) {
      runHi++;
    }

    reverseRun(array, lo, runHi); // Ascending
  } else {
    while (runHi < hi && compare(array[runHi], array[runHi - 1]) >= 0) {
      runHi++;
    }
  }

  return runHi - lo;
}
/**
 * Reverse an array in the range [lo, hi).
 *
 * @param {array} array - The array to reverse.
 * @param {number} lo - First element in the range (inclusive).
 * @param {number} hi - Last element in the range.
 */


function reverseRun(array, lo, hi) {
  hi--;

  while (lo < hi) {
    var t = array[lo];
    array[lo++] = array[hi];
    array[hi--] = t;
  }
}
/**
 * Perform the binary sort of the array in the range [lo, hi) where start is
 * the first element possibly out of order.
 *
 * @param {array} array - The array to sort.
 * @param {number} lo - First element in the range (inclusive).
 * @param {number} hi - Last element in the range.
 * @param {number} start - First element possibly out of order.
 * @param {function} compare - Item comparison function.
 */


function binaryInsertionSort(array, lo, hi, start, compare) {
  if (start === lo) {
    start++;
  }

  for (; start < hi; start++) {
    var pivot = array[start]; // Ranges of the array where pivot belongs

    var left = lo;
    var right = start;
    /*
     *   pivot >= array[i] for i in [lo, left)
     *   pivot <  array[i] for i in  in [right, start)
     */

    while (left < right) {
      var mid = left + right >>> 1;

      if (compare(pivot, array[mid]) < 0) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    /*
     * Move elements right to make room for the pivot. If there are elements
     * equal to pivot, left points to the first slot after them: this is also
     * a reason for which TimSort is stable
     */


    var n = start - left; // Switch is just an optimization for small arrays

    switch (n) {
      case 3:
        array[left + 3] = array[left + 2];

      /* falls through */

      case 2:
        array[left + 2] = array[left + 1];

      /* falls through */

      case 1:
        array[left + 1] = array[left];
        break;

      default:
        while (n > 0) {
          array[left + n] = array[left + n - 1];
          n--;
        }

    }

    array[left] = pivot;
  }
}
/**
 * Find the position at which to insert a value in a sorted range. If the range
 * contains elements equal to the value the leftmost element index is returned
 * (for stability).
 *
 * @param {number} value - Value to insert.
 * @param {array} array - The array in which to insert value.
 * @param {number} start - First element in the range.
 * @param {number} length - Length of the range.
 * @param {number} hint - The index at which to begin the search.
 * @param {function} compare - Item comparison function.
 * @return {number} - The index where to insert value.
 */


function gallopLeft(value, array, start, length, hint, compare) {
  var lastOffset = 0;
  var maxOffset = 0;
  var offset = 1;

  if (compare(value, array[start + hint]) > 0) {
    maxOffset = length - hint;

    while (offset < maxOffset && compare(value, array[start + hint + offset]) > 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;

      if (offset <= 0) {
        offset = maxOffset;
      }
    }

    if (offset > maxOffset) {
      offset = maxOffset;
    } // Make offsets relative to start


    lastOffset += hint;
    offset += hint; // value <= array[start + hint]
  } else {
    maxOffset = hint + 1;

    while (offset < maxOffset && compare(value, array[start + hint - offset]) <= 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;

      if (offset <= 0) {
        offset = maxOffset;
      }
    }

    if (offset > maxOffset) {
      offset = maxOffset;
    } // Make offsets relative to start


    var tmp = lastOffset;
    lastOffset = hint - offset;
    offset = hint - tmp;
  }
  /*
   * Now array[start+lastOffset] < value <= array[start+offset], so value
   * belongs somewhere in the range (start + lastOffset, start + offset]. Do a
   * binary search, with invariant array[start + lastOffset - 1] < value <=
   * array[start + offset].
   */


  lastOffset++;

  while (lastOffset < offset) {
    var m = lastOffset + (offset - lastOffset >>> 1);

    if (compare(value, array[start + m]) > 0) {
      lastOffset = m + 1;
    } else {
      offset = m;
    }
  }

  return offset;
}
/**
 * Find the position at which to insert a value in a sorted range. If the range
 * contains elements equal to the value the rightmost element index is returned
 * (for stability).
 *
 * @param {number} value - Value to insert.
 * @param {array} array - The array in which to insert value.
 * @param {number} start - First element in the range.
 * @param {number} length - Length of the range.
 * @param {number} hint - The index at which to begin the search.
 * @param {function} compare - Item comparison function.
 * @return {number} - The index where to insert value.
 */


function gallopRight(value, array, start, length, hint, compare) {
  var lastOffset = 0;
  var maxOffset = 0;
  var offset = 1;

  if (compare(value, array[start + hint]) < 0) {
    maxOffset = hint + 1;

    while (offset < maxOffset && compare(value, array[start + hint - offset]) < 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;

      if (offset <= 0) {
        offset = maxOffset;
      }
    }

    if (offset > maxOffset) {
      offset = maxOffset;
    } // Make offsets relative to start


    var tmp = lastOffset;
    lastOffset = hint - offset;
    offset = hint - tmp; // value >= array[start + hint]
  } else {
    maxOffset = length - hint;

    while (offset < maxOffset && compare(value, array[start + hint + offset]) >= 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;

      if (offset <= 0) {
        offset = maxOffset;
      }
    }

    if (offset > maxOffset) {
      offset = maxOffset;
    } // Make offsets relative to start


    lastOffset += hint;
    offset += hint;
  }
  /*
   * Now array[start+lastOffset] < value <= array[start+offset], so value
   * belongs somewhere in the range (start + lastOffset, start + offset]. Do a
   * binary search, with invariant array[start + lastOffset - 1] < value <=
   * array[start + offset].
   */


  lastOffset++;

  while (lastOffset < offset) {
    var m = lastOffset + (offset - lastOffset >>> 1);

    if (compare(value, array[start + m]) < 0) {
      offset = m;
    } else {
      lastOffset = m + 1;
    }
  }

  return offset;
}

var TimSort = /*#__PURE__*/function () {
  function TimSort(array, compare) {
    this.array = array;
    this.compare = compare;
    this.minGallop = DEFAULT_MIN_GALLOPING;
    this.length = array.length;
    this.tmpStorageLength = DEFAULT_TMP_STORAGE_LENGTH;

    if (this.length < 2 * DEFAULT_TMP_STORAGE_LENGTH) {
      this.tmpStorageLength = this.length >>> 1;
    }

    this.tmp = new Array(this.tmpStorageLength);
    this.stackLength = this.length < 120 ? 5 : this.length < 1542 ? 10 : this.length < 119151 ? 19 : 40;
    this.runStart = new Array(this.stackLength);
    this.runLength = new Array(this.stackLength);
    this.stackSize = 0;
  }
  /**
   * Push a new run on TimSort's stack.
   *
   * @param {number} runStart - Start index of the run in the original array.
   * @param {number} runLength - Length of the run;
   */


  var _proto = TimSort.prototype;

  _proto.pushRun = function pushRun(runStart, runLength) {
    this.runStart[this.stackSize] = runStart;
    this.runLength[this.stackSize] = runLength;
    this.stackSize += 1;
  }
  /**
   * Merge runs on TimSort's stack so that the following holds for all i:
   * 1) runLength[i - 3] > runLength[i - 2] + runLength[i - 1]
   * 2) runLength[i - 2] > runLength[i - 1]
   */
  ;

  _proto.mergeRuns = function mergeRuns() {
    while (this.stackSize > 1) {
      var n = this.stackSize - 2;

      if (n >= 1 && this.runLength[n - 1] <= this.runLength[n] + this.runLength[n + 1] || n >= 2 && this.runLength[n - 2] <= this.runLength[n] + this.runLength[n - 1]) {
        if (this.runLength[n - 1] < this.runLength[n + 1]) {
          n--;
        }
      } else if (this.runLength[n] > this.runLength[n + 1]) {
        break;
      }

      this.mergeAt(n);
    }
  }
  /**
   * Merge all runs on TimSort's stack until only one remains.
   */
  ;

  _proto.forceMergeRuns = function forceMergeRuns() {
    while (this.stackSize > 1) {
      var n = this.stackSize - 2;

      if (n > 0 && this.runLength[n - 1] < this.runLength[n + 1]) {
        n--;
      }

      this.mergeAt(n);
    }
  }
  /**
   * Merge the runs on the stack at positions i and i+1. Must be always be called
   * with i=stackSize-2 or i=stackSize-3 (that is, we merge on top of the stack).
   *
   * @param {number} i - Index of the run to merge in TimSort's stack.
   */
  ;

  _proto.mergeAt = function mergeAt(i) {
    var compare = this.compare;
    var array = this.array;
    var start1 = this.runStart[i];
    var length1 = this.runLength[i];
    var start2 = this.runStart[i + 1];
    var length2 = this.runLength[i + 1];
    this.runLength[i] = length1 + length2;

    if (i === this.stackSize - 3) {
      this.runStart[i + 1] = this.runStart[i + 2];
      this.runLength[i + 1] = this.runLength[i + 2];
    }

    this.stackSize--;
    /*
     * Find where the first element in the second run goes in run1. Previous
     * elements in run1 are already in place
     */

    var k = gallopRight(array[start2], array, start1, length1, 0, compare);
    start1 += k;
    length1 -= k;

    if (length1 === 0) {
      return;
    }
    /*
     * Find where the last element in the first run goes in run2. Next elements
     * in run2 are already in place
     */


    length2 = gallopLeft(array[start1 + length1 - 1], array, start2, length2, length2 - 1, compare);

    if (length2 === 0) {
      return;
    }
    /*
     * Merge remaining runs. A tmp array with length = min(length1, length2) is
     * used
     */


    if (length1 <= length2) {
      this.mergeLow(start1, length1, start2, length2);
    } else {
      this.mergeHigh(start1, length1, start2, length2);
    }
  }
  /**
   * Merge two adjacent runs in a stable way. The runs must be such that the
   * first element of run1 is bigger than the first element in run2 and the
   * last element of run1 is greater than all the elements in run2.
   * The method should be called when run1.length <= run2.length as it uses
   * TimSort temporary array to store run1. Use mergeHigh if run1.length >
   * run2.length.
   *
   * @param {number} start1 - First element in run1.
   * @param {number} length1 - Length of run1.
   * @param {number} start2 - First element in run2.
   * @param {number} length2 - Length of run2.
   */
  ;

  _proto.mergeLow = function mergeLow(start1, length1, start2, length2) {
    var compare = this.compare;
    var array = this.array;
    var tmp = this.tmp;
    var i = 0;

    for (i = 0; i < length1; i++) {
      tmp[i] = array[start1 + i];
    }

    var cursor1 = 0;
    var cursor2 = start2;
    var dest = start1;
    array[dest++] = array[cursor2++];

    if (--length2 === 0) {
      for (i = 0; i < length1; i++) {
        array[dest + i] = tmp[cursor1 + i];
      }

      return;
    }

    if (length1 === 1) {
      for (i = 0; i < length2; i++) {
        array[dest + i] = array[cursor2 + i];
      }

      array[dest + length2] = tmp[cursor1];
      return;
    }

    var minGallop = this.minGallop;

    while (true) {
      var count1 = 0;
      var count2 = 0;
      var exit = false;

      do {
        if (compare(array[cursor2], tmp[cursor1]) < 0) {
          array[dest++] = array[cursor2++];
          count2++;
          count1 = 0;

          if (--length2 === 0) {
            exit = true;
            break;
          }
        } else {
          array[dest++] = tmp[cursor1++];
          count1++;
          count2 = 0;

          if (--length1 === 1) {
            exit = true;
            break;
          }
        }
      } while ((count1 | count2) < minGallop);

      if (exit) {
        break;
      }

      do {
        count1 = gallopRight(array[cursor2], tmp, cursor1, length1, 0, compare);

        if (count1 !== 0) {
          for (i = 0; i < count1; i++) {
            array[dest + i] = tmp[cursor1 + i];
          }

          dest += count1;
          cursor1 += count1;
          length1 -= count1;

          if (length1 <= 1) {
            exit = true;
            break;
          }
        }

        array[dest++] = array[cursor2++];

        if (--length2 === 0) {
          exit = true;
          break;
        }

        count2 = gallopLeft(tmp[cursor1], array, cursor2, length2, 0, compare);

        if (count2 !== 0) {
          for (i = 0; i < count2; i++) {
            array[dest + i] = array[cursor2 + i];
          }

          dest += count2;
          cursor2 += count2;
          length2 -= count2;

          if (length2 === 0) {
            exit = true;
            break;
          }
        }

        array[dest++] = tmp[cursor1++];

        if (--length1 === 1) {
          exit = true;
          break;
        }

        minGallop--;
      } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);

      if (exit) {
        break;
      }

      if (minGallop < 0) {
        minGallop = 0;
      }

      minGallop += 2;
    }

    this.minGallop = minGallop;

    if (minGallop < 1) {
      this.minGallop = 1;
    }

    if (length1 === 1) {
      for (i = 0; i < length2; i++) {
        array[dest + i] = array[cursor2 + i];
      }

      array[dest + length2] = tmp[cursor1];
    } else if (length1 === 0) {
      throw new Error('mergeLow preconditions were not respected');
    } else {
      for (i = 0; i < length1; i++) {
        array[dest + i] = tmp[cursor1 + i];
      }
    }
  }
  /**
   * Merge two adjacent runs in a stable way. The runs must be such that the
   * first element of run1 is bigger than the first element in run2 and the
   * last element of run1 is greater than all the elements in run2.
   * The method should be called when run1.length > run2.length as it uses
   * TimSort temporary array to store run2. Use mergeLow if run1.length <=
   * run2.length.
   *
   * @param {number} start1 - First element in run1.
   * @param {number} length1 - Length of run1.
   * @param {number} start2 - First element in run2.
   * @param {number} length2 - Length of run2.
   */
  ;

  _proto.mergeHigh = function mergeHigh(start1, length1, start2, length2) {
    var compare = this.compare;
    var array = this.array;
    var tmp = this.tmp;
    var i = 0;

    for (i = 0; i < length2; i++) {
      tmp[i] = array[start2 + i];
    }

    var cursor1 = start1 + length1 - 1;
    var cursor2 = length2 - 1;
    var dest = start2 + length2 - 1;
    var customCursor = 0;
    var customDest = 0;
    array[dest--] = array[cursor1--];

    if (--length1 === 0) {
      customCursor = dest - (length2 - 1);

      for (i = 0; i < length2; i++) {
        array[customCursor + i] = tmp[i];
      }

      return;
    }

    if (length2 === 1) {
      dest -= length1;
      cursor1 -= length1;
      customDest = dest + 1;
      customCursor = cursor1 + 1;

      for (i = length1 - 1; i >= 0; i--) {
        array[customDest + i] = array[customCursor + i];
      }

      array[dest] = tmp[cursor2];
      return;
    }

    var minGallop = this.minGallop;

    while (true) {
      var count1 = 0;
      var count2 = 0;
      var exit = false;

      do {
        if (compare(tmp[cursor2], array[cursor1]) < 0) {
          array[dest--] = array[cursor1--];
          count1++;
          count2 = 0;

          if (--length1 === 0) {
            exit = true;
            break;
          }
        } else {
          array[dest--] = tmp[cursor2--];
          count2++;
          count1 = 0;

          if (--length2 === 1) {
            exit = true;
            break;
          }
        }
      } while ((count1 | count2) < minGallop);

      if (exit) {
        break;
      }

      do {
        count1 = length1 - gallopRight(tmp[cursor2], array, start1, length1, length1 - 1, compare);

        if (count1 !== 0) {
          dest -= count1;
          cursor1 -= count1;
          length1 -= count1;
          customDest = dest + 1;
          customCursor = cursor1 + 1;

          for (i = count1 - 1; i >= 0; i--) {
            array[customDest + i] = array[customCursor + i];
          }

          if (length1 === 0) {
            exit = true;
            break;
          }
        }

        array[dest--] = tmp[cursor2--];

        if (--length2 === 1) {
          exit = true;
          break;
        }

        count2 = length2 - gallopLeft(array[cursor1], tmp, 0, length2, length2 - 1, compare);

        if (count2 !== 0) {
          dest -= count2;
          cursor2 -= count2;
          length2 -= count2;
          customDest = dest + 1;
          customCursor = cursor2 + 1;

          for (i = 0; i < count2; i++) {
            array[customDest + i] = tmp[customCursor + i];
          }

          if (length2 <= 1) {
            exit = true;
            break;
          }
        }

        array[dest--] = array[cursor1--];

        if (--length1 === 0) {
          exit = true;
          break;
        }

        minGallop--;
      } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);

      if (exit) {
        break;
      }

      if (minGallop < 0) {
        minGallop = 0;
      }

      minGallop += 2;
    }

    this.minGallop = minGallop;

    if (minGallop < 1) {
      this.minGallop = 1;
    }

    if (length2 === 1) {
      dest -= length1;
      cursor1 -= length1;
      customDest = dest + 1;
      customCursor = cursor1 + 1;

      for (i = length1 - 1; i >= 0; i--) {
        array[customDest + i] = array[customCursor + i];
      }

      array[dest] = tmp[cursor2];
    } else if (length2 === 0) {
      throw new Error('mergeHigh preconditions were not respected');
    } else {
      customCursor = dest - (length2 - 1);

      for (i = 0; i < length2; i++) {
        array[customCursor + i] = tmp[i];
      }
    }
  };

  return TimSort;
}();
/**
 * Sort an array in the range [lo, hi) using TimSort.
 *
 * @param {array} array - The array to sort.
 * @param {number} lo - First element in the range (inclusive).
 * @param {number} hi - Last element in the range.
 * @param {function=} compare - Item comparison function. Default is alphabetical.
 */


function _default(array, lo, hi, compare) {
  if (!Array.isArray(array)) {
    throw new TypeError('Can only sort arrays');
  }
  /*
   * Handle the case where a comparison function is not provided. We do
   * lexicographic sorting
   */


  if (lo === undefined) {
    lo = 0;
  }

  if (hi === undefined) {
    hi = array.length;
  }

  if (compare === undefined) {
    compare = alphabeticalCompare;
  }

  var remaining = hi - lo; // The array is already sorted

  if (remaining < 2) {
    return;
  }

  var runLength = 0; // On small arrays binary sort can be used directly

  if (remaining < DEFAULT_MIN_MERGE) {
    runLength = makeAscendingRun(array, lo, hi, compare);
    binaryInsertionSort(array, lo, hi, lo + runLength, compare);
    return;
  }

  var ts = new TimSort(array, compare);
  var minRun = minRunLength(remaining);

  do {
    runLength = makeAscendingRun(array, lo, hi, compare);

    if (runLength < minRun) {
      var force = remaining;

      if (force > minRun) {
        force = minRun;
      }

      binaryInsertionSort(array, lo, lo + force, lo + runLength, compare);
      runLength = force;
    } // Push new run and merge if necessary


    ts.pushRun(lo, runLength);
    ts.mergeRuns(); // Go find next run

    remaining -= runLength;
    lo += runLength;
  } while (remaining !== 0); // Force merging of remaining runs


  ts.forceMergeRuns();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9tZW1vcC90aW1zb3J0LmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfTUlOX01FUkdFIiwiREVGQVVMVF9NSU5fR0FMTE9QSU5HIiwiREVGQVVMVF9UTVBfU1RPUkFHRV9MRU5HVEgiLCJQT1dFUlNfT0ZfVEVOIiwibG9nMTAiLCJ4IiwiYWxwaGFiZXRpY2FsQ29tcGFyZSIsImEiLCJiIiwiYWwiLCJibCIsInQiLCJhU3RyIiwiU3RyaW5nIiwiYlN0ciIsIm1pblJ1bkxlbmd0aCIsIm4iLCJyIiwibWFrZUFzY2VuZGluZ1J1biIsImFycmF5IiwibG8iLCJoaSIsImNvbXBhcmUiLCJydW5IaSIsInJldmVyc2VSdW4iLCJiaW5hcnlJbnNlcnRpb25Tb3J0Iiwic3RhcnQiLCJwaXZvdCIsImxlZnQiLCJyaWdodCIsIm1pZCIsImdhbGxvcExlZnQiLCJ2YWx1ZSIsImxlbmd0aCIsImhpbnQiLCJsYXN0T2Zmc2V0IiwibWF4T2Zmc2V0Iiwib2Zmc2V0IiwidG1wIiwibSIsImdhbGxvcFJpZ2h0IiwiVGltU29ydCIsIm1pbkdhbGxvcCIsInRtcFN0b3JhZ2VMZW5ndGgiLCJBcnJheSIsInN0YWNrTGVuZ3RoIiwicnVuU3RhcnQiLCJydW5MZW5ndGgiLCJzdGFja1NpemUiLCJwdXNoUnVuIiwibWVyZ2VSdW5zIiwibWVyZ2VBdCIsImZvcmNlTWVyZ2VSdW5zIiwiaSIsInN0YXJ0MSIsImxlbmd0aDEiLCJzdGFydDIiLCJsZW5ndGgyIiwiayIsIm1lcmdlTG93IiwibWVyZ2VIaWdoIiwiY3Vyc29yMSIsImN1cnNvcjIiLCJkZXN0IiwiY291bnQxIiwiY291bnQyIiwiZXhpdCIsIkVycm9yIiwiY3VzdG9tQ3Vyc29yIiwiY3VzdG9tRGVzdCIsImlzQXJyYXkiLCJUeXBlRXJyb3IiLCJ1bmRlZmluZWQiLCJyZW1haW5pbmciLCJ0cyIsIm1pblJ1biIsImZvcmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7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QUEsRUFBRSxDQUFDeEIsU0FBSCxHQWJDLENBZUQ7O0FBQ0F1QixJQUFBQSxTQUFTLElBQUkxQixTQUFiO0FBQ0EzQixJQUFBQSxFQUFFLElBQUkyQixTQUFOO0FBRUQsR0FuQkQsUUFtQlMwQixTQUFTLEtBQUssQ0FuQnZCLEVBekMrQyxDQThEL0M7OztBQUNBQyxFQUFBQSxFQUFFLENBQUN0QixjQUFIO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZWZlcmVuY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9temljY2FyZC9ub2RlLXRpbXNvcnRcblxuLyoqXG4gKiBEZWZhdWx0IG1pbmltdW0gc2l6ZSBvZiBhIHJ1bi5cbiAqL1xuY29uc3QgREVGQVVMVF9NSU5fTUVSR0UgPSAzMjtcblxuLyoqXG4gKiBNaW5pbXVtIG9yZGVyZWQgc3Vic2VxdWVjZSByZXF1aXJlZCB0byBkbyBnYWxsb3BpbmcuXG4gKi9cbmNvbnN0IERFRkFVTFRfTUlOX0dBTExPUElORyA9IDc7XG5cbi8qKlxuICogRGVmYXVsdCB0bXAgc3RvcmFnZSBsZW5ndGguIENhbiBpbmNyZWFzZSBkZXBlbmRpbmcgb24gdGhlIHNpemUgb2YgdGhlXG4gKiBzbWFsbGVzdCBydW4gdG8gbWVyZ2UuXG4gKi9cbmNvbnN0IERFRkFVTFRfVE1QX1NUT1JBR0VfTEVOR1RIID0gMjU2O1xuXG4vKipcbiAqIFByZS1jb21wdXRlZCBwb3dlcnMgb2YgMTAgZm9yIGVmZmljaWVudCBsZXhpY29ncmFwaGljIGNvbXBhcmlzb24gb2ZcbiAqIHNtYWxsIGludGVnZXJzLlxuICovXG5jb25zdCBQT1dFUlNfT0ZfVEVOID0gWzFlMCwgMWUxLCAxZTIsIDFlMywgMWU0LCAxZTUsIDFlNiwgMWU3LCAxZTgsIDFlOV1cblxuLyoqXG4gKiBFc3RpbWF0ZSB0aGUgbG9nYXJpdGhtIGJhc2UgMTAgb2YgYSBzbWFsbCBpbnRlZ2VyLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gVGhlIGludGVnZXIgdG8gZXN0aW1hdGUgdGhlIGxvZ2FyaXRobSBvZi5cbiAqIEByZXR1cm4ge251bWJlcn0gLSBUaGUgZXN0aW1hdGVkIGxvZ2FyaXRobSBvZiB0aGUgaW50ZWdlci5cbiAqL1xuZnVuY3Rpb24gbG9nMTAoeCkge1xuICBpZiAoeCA8IDFlNSkge1xuICAgIGlmICh4IDwgMWUyKSB7XG4gICAgICByZXR1cm4geCA8IDFlMSA/IDAgOiAxO1xuICAgIH1cblxuICAgIGlmICh4IDwgMWU0KSB7XG4gICAgICByZXR1cm4geCA8IDFlMyA/IDIgOiAzO1xuICAgIH1cblxuICAgIHJldHVybiA0O1xuICB9XG5cbiAgaWYgKHggPCAxZTcpIHtcbiAgICByZXR1cm4geCA8IDFlNiA/IDUgOiA2O1xuICB9XG5cbiAgaWYgKHggPCAxZTkpIHtcbiAgICByZXR1cm4geCA8IDFlOCA/IDcgOiA4O1xuICB9XG5cbiAgcmV0dXJuIDk7XG59XG5cbi8qKlxuICogRGVmYXVsdCBhbHBoYWJldGljYWwgY29tcGFyaXNvbiBvZiBpdGVtcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R8bnVtYmVyfSBhIC0gRmlyc3QgZWxlbWVudCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fG51bWJlcn0gYiAtIFNlY29uZCBlbGVtZW50IHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IC0gQSBwb3NpdGl2ZSBudW1iZXIgaWYgYS50b1N0cmluZygpID4gYi50b1N0cmluZygpLCBhXG4gKiBuZWdhdGl2ZSBudW1iZXIgaWYgLnRvU3RyaW5nKCkgPCBiLnRvU3RyaW5nKCksIDAgb3RoZXJ3aXNlLlxuICovXG5mdW5jdGlvbiBhbHBoYWJldGljYWxDb21wYXJlKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmICh+fmEgPT09IGEgJiYgfn5iID09PSBiKSB7XG4gICAgaWYgKGEgPT09IDAgfHwgYiA9PT0gMCkge1xuICAgICAgcmV0dXJuIGEgPCBiID8gLTEgOiAxO1xuICAgIH1cblxuICAgIGlmIChhIDwgMCB8fCBiIDwgMCkge1xuICAgICAgaWYgKGIgPj0gMCkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG5cbiAgICAgIGlmIChhID49IDApIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG5cbiAgICAgIGEgPSAtYTtcbiAgICAgIGIgPSAtYjtcbiAgICB9XG5cbiAgICBjb25zdCBhbCA9IGxvZzEwKGEpO1xuICAgIGNvbnN0IGJsID0gbG9nMTAoYik7XG5cbiAgICBsZXQgdCA9IDA7XG5cbiAgICBpZiAoYWwgPCBibCkge1xuICAgICAgYSAqPSBQT1dFUlNfT0ZfVEVOW2JsIC0gYWwgLSAxXTtcbiAgICAgIGIgLz0gMTA7XG4gICAgICB0ID0gLTE7XG4gICAgfSBlbHNlIGlmIChhbCA+IGJsKSB7XG4gICAgICBiICo9IFBPV0VSU19PRl9URU5bYWwgLSBibCAtIDFdO1xuICAgICAgYSAvPSAxMDtcbiAgICAgIHQgPSAxO1xuICAgIH1cblxuICAgIGlmIChhID09PSBiKSB7XG4gICAgICByZXR1cm4gdDtcbiAgICB9XG5cbiAgICByZXR1cm4gYSA8IGIgPyAtMSA6IDE7XG4gIH1cblxuICBsZXQgYVN0ciA9IFN0cmluZyhhKTtcbiAgbGV0IGJTdHIgPSBTdHJpbmcoYik7XG5cbiAgaWYgKGFTdHIgPT09IGJTdHIpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiBhU3RyIDwgYlN0ciA/IC0xIDogMTtcbn1cblxuLyoqXG4gKiBDb21wdXRlIG1pbmltdW0gcnVuIGxlbmd0aCBmb3IgVGltU29ydFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIC0gVGhlIHNpemUgb2YgdGhlIGFycmF5IHRvIHNvcnQuXG4gKi9cbmZ1bmN0aW9uIG1pblJ1bkxlbmd0aChuKSB7XG4gIGxldCByID0gMDtcblxuICB3aGlsZSAobiA+PSBERUZBVUxUX01JTl9NRVJHRSkge1xuICAgIHIgfD0gKG4gJiAxKTtcbiAgICBuID4+PSAxO1xuICB9XG5cbiAgcmV0dXJuIG4gKyByO1xufVxuXG4vKipcbiAqIENvdW50cyB0aGUgbGVuZ3RoIG9mIGEgbW9ub3RvbmljYWxseSBhc2NlbmRpbmcgb3Igc3RyaWN0bHkgbW9ub3RvbmljYWxseVxuICogZGVzY2VuZGluZyBzZXF1ZW5jZSAocnVuKSBzdGFydGluZyBhdCBhcnJheVtsb10gaW4gdGhlIHJhbmdlIFtsbywgaGkpLiBJZlxuICogdGhlIHJ1biBpcyBkZXNjZW5kaW5nIGl0IGlzIG1hZGUgYXNjZW5kaW5nLlxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IC0gVGhlIGFycmF5IHRvIHJldmVyc2UuXG4gKiBAcGFyYW0ge251bWJlcn0gbG8gLSBGaXJzdCBlbGVtZW50IGluIHRoZSByYW5nZSAoaW5jbHVzaXZlKS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBoaSAtIExhc3QgZWxlbWVudCBpbiB0aGUgcmFuZ2UuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb21wYXJlIC0gSXRlbSBjb21wYXJpc29uIGZ1bmN0aW9uLlxuICogQHJldHVybiB7bnVtYmVyfSAtIFRoZSBsZW5ndGggb2YgdGhlIHJ1bi5cbiAqL1xuZnVuY3Rpb24gbWFrZUFzY2VuZGluZ1J1bihhcnJheSwgbG8sIGhpLCBjb21wYXJlKSB7XG4gIGxldCBydW5IaSA9IGxvICsgMTtcblxuICBpZiAocnVuSGkgPT09IGhpKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICAvLyBEZXNjZW5kaW5nXG4gIGlmIChjb21wYXJlKGFycmF5W3J1bkhpKytdLCBhcnJheVtsb10pIDwgMCkge1xuICAgIHdoaWxlIChydW5IaSA8IGhpICYmIGNvbXBhcmUoYXJyYXlbcnVuSGldLCBhcnJheVtydW5IaSAtIDFdKSA8IDApIHtcbiAgICAgIHJ1bkhpKys7XG4gICAgfVxuXG4gICAgcmV2ZXJzZVJ1bihhcnJheSwgbG8sIHJ1bkhpKTtcbiAgICAvLyBBc2NlbmRpbmdcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAocnVuSGkgPCBoaSAmJiBjb21wYXJlKGFycmF5W3J1bkhpXSwgYXJyYXlbcnVuSGkgLSAxXSkgPj0gMCkge1xuICAgICAgcnVuSGkrKztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcnVuSGkgLSBsbztcbn1cblxuLyoqXG4gKiBSZXZlcnNlIGFuIGFycmF5IGluIHRoZSByYW5nZSBbbG8sIGhpKS5cbiAqXG4gKiBAcGFyYW0ge2FycmF5fSBhcnJheSAtIFRoZSBhcnJheSB0byByZXZlcnNlLlxuICogQHBhcmFtIHtudW1iZXJ9IGxvIC0gRmlyc3QgZWxlbWVudCBpbiB0aGUgcmFuZ2UgKGluY2x1c2l2ZSkuXG4gKiBAcGFyYW0ge251bWJlcn0gaGkgLSBMYXN0IGVsZW1lbnQgaW4gdGhlIHJhbmdlLlxuICovXG5mdW5jdGlvbiByZXZlcnNlUnVuKGFycmF5LCBsbywgaGkpIHtcbiAgaGktLTtcblxuICB3aGlsZSAobG8gPCBoaSkge1xuICAgIGxldCB0ID0gYXJyYXlbbG9dO1xuICAgIGFycmF5W2xvKytdID0gYXJyYXlbaGldO1xuICAgIGFycmF5W2hpLS1dID0gdDtcbiAgfVxufVxuXG4vKipcbiAqIFBlcmZvcm0gdGhlIGJpbmFyeSBzb3J0IG9mIHRoZSBhcnJheSBpbiB0aGUgcmFuZ2UgW2xvLCBoaSkgd2hlcmUgc3RhcnQgaXNcbiAqIHRoZSBmaXJzdCBlbGVtZW50IHBvc3NpYmx5IG91dCBvZiBvcmRlci5cbiAqXG4gKiBAcGFyYW0ge2FycmF5fSBhcnJheSAtIFRoZSBhcnJheSB0byBzb3J0LlxuICogQHBhcmFtIHtudW1iZXJ9IGxvIC0gRmlyc3QgZWxlbWVudCBpbiB0aGUgcmFuZ2UgKGluY2x1c2l2ZSkuXG4gKiBAcGFyYW0ge251bWJlcn0gaGkgLSBMYXN0IGVsZW1lbnQgaW4gdGhlIHJhbmdlLlxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IC0gRmlyc3QgZWxlbWVudCBwb3NzaWJseSBvdXQgb2Ygb3JkZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb21wYXJlIC0gSXRlbSBjb21wYXJpc29uIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiaW5hcnlJbnNlcnRpb25Tb3J0KGFycmF5LCBsbywgaGksIHN0YXJ0LCBjb21wYXJlKSB7XG4gIGlmIChzdGFydCA9PT0gbG8pIHtcbiAgICBzdGFydCsrO1xuICB9XG5cbiAgZm9yICg7IHN0YXJ0IDwgaGk7IHN0YXJ0KyspIHtcbiAgICBsZXQgcGl2b3QgPSBhcnJheVtzdGFydF07XG5cbiAgICAvLyBSYW5nZXMgb2YgdGhlIGFycmF5IHdoZXJlIHBpdm90IGJlbG9uZ3NcbiAgICBsZXQgbGVmdCA9IGxvO1xuICAgIGxldCByaWdodCA9IHN0YXJ0O1xuXG4gICAgLypcbiAgICAgKiAgIHBpdm90ID49IGFycmF5W2ldIGZvciBpIGluIFtsbywgbGVmdClcbiAgICAgKiAgIHBpdm90IDwgIGFycmF5W2ldIGZvciBpIGluICBpbiBbcmlnaHQsIHN0YXJ0KVxuICAgICAqL1xuICAgIHdoaWxlIChsZWZ0IDwgcmlnaHQpIHtcbiAgICAgIGxldCBtaWQgPSAobGVmdCArIHJpZ2h0KSA+Pj4gMTtcblxuICAgICAgaWYgKGNvbXBhcmUocGl2b3QsIGFycmF5W21pZF0pIDwgMCkge1xuICAgICAgICByaWdodCA9IG1pZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxlZnQgPSBtaWQgKyAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgICogTW92ZSBlbGVtZW50cyByaWdodCB0byBtYWtlIHJvb20gZm9yIHRoZSBwaXZvdC4gSWYgdGhlcmUgYXJlIGVsZW1lbnRzXG4gICAgICogZXF1YWwgdG8gcGl2b3QsIGxlZnQgcG9pbnRzIHRvIHRoZSBmaXJzdCBzbG90IGFmdGVyIHRoZW06IHRoaXMgaXMgYWxzb1xuICAgICAqIGEgcmVhc29uIGZvciB3aGljaCBUaW1Tb3J0IGlzIHN0YWJsZVxuICAgICAqL1xuICAgIGxldCBuID0gc3RhcnQgLSBsZWZ0O1xuICAgIC8vIFN3aXRjaCBpcyBqdXN0IGFuIG9wdGltaXphdGlvbiBmb3Igc21hbGwgYXJyYXlzXG4gICAgc3dpdGNoIChuKSB7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGFycmF5W2xlZnQgKyAzXSA9IGFycmF5W2xlZnQgKyAyXTtcbiAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgMjpcbiAgICAgICAgYXJyYXlbbGVmdCArIDJdID0gYXJyYXlbbGVmdCArIDFdO1xuICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgY2FzZSAxOlxuICAgICAgICBhcnJheVtsZWZ0ICsgMV0gPSBhcnJheVtsZWZ0XTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB3aGlsZSAobiA+IDApIHtcbiAgICAgICAgICBhcnJheVtsZWZ0ICsgbl0gPSBhcnJheVtsZWZ0ICsgbiAtIDFdO1xuICAgICAgICAgIG4tLTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFycmF5W2xlZnRdID0gcGl2b3Q7XG4gIH1cbn1cblxuLyoqXG4gKiBGaW5kIHRoZSBwb3NpdGlvbiBhdCB3aGljaCB0byBpbnNlcnQgYSB2YWx1ZSBpbiBhIHNvcnRlZCByYW5nZS4gSWYgdGhlIHJhbmdlXG4gKiBjb250YWlucyBlbGVtZW50cyBlcXVhbCB0byB0aGUgdmFsdWUgdGhlIGxlZnRtb3N0IGVsZW1lbnQgaW5kZXggaXMgcmV0dXJuZWRcbiAqIChmb3Igc3RhYmlsaXR5KS5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBWYWx1ZSB0byBpbnNlcnQuXG4gKiBAcGFyYW0ge2FycmF5fSBhcnJheSAtIFRoZSBhcnJheSBpbiB3aGljaCB0byBpbnNlcnQgdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgLSBGaXJzdCBlbGVtZW50IGluIHRoZSByYW5nZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBMZW5ndGggb2YgdGhlIHJhbmdlLlxuICogQHBhcmFtIHtudW1iZXJ9IGhpbnQgLSBUaGUgaW5kZXggYXQgd2hpY2ggdG8gYmVnaW4gdGhlIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbXBhcmUgLSBJdGVtIGNvbXBhcmlzb24gZnVuY3Rpb24uXG4gKiBAcmV0dXJuIHtudW1iZXJ9IC0gVGhlIGluZGV4IHdoZXJlIHRvIGluc2VydCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2FsbG9wTGVmdCh2YWx1ZSwgYXJyYXksIHN0YXJ0LCBsZW5ndGgsIGhpbnQsIGNvbXBhcmUpIHtcbiAgbGV0IGxhc3RPZmZzZXQgPSAwO1xuICBsZXQgbWF4T2Zmc2V0ID0gMDtcbiAgbGV0IG9mZnNldCA9IDE7XG5cbiAgaWYgKGNvbXBhcmUodmFsdWUsIGFycmF5W3N0YXJ0ICsgaGludF0pID4gMCkge1xuICAgIG1heE9mZnNldCA9IGxlbmd0aCAtIGhpbnQ7XG5cbiAgICB3aGlsZSAob2Zmc2V0IDwgbWF4T2Zmc2V0ICYmIGNvbXBhcmUodmFsdWUsIGFycmF5W3N0YXJ0ICsgaGludCArIG9mZnNldF0pID4gMCkge1xuICAgICAgbGFzdE9mZnNldCA9IG9mZnNldDtcbiAgICAgIG9mZnNldCA9IChvZmZzZXQgPDwgMSkgKyAxO1xuXG4gICAgICBpZiAob2Zmc2V0IDw9IDApIHtcbiAgICAgICAgb2Zmc2V0ID0gbWF4T2Zmc2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvZmZzZXQgPiBtYXhPZmZzZXQpIHtcbiAgICAgIG9mZnNldCA9IG1heE9mZnNldDtcbiAgICB9XG5cbiAgICAvLyBNYWtlIG9mZnNldHMgcmVsYXRpdmUgdG8gc3RhcnRcbiAgICBsYXN0T2Zmc2V0ICs9IGhpbnQ7XG4gICAgb2Zmc2V0ICs9IGhpbnQ7XG5cbiAgICAvLyB2YWx1ZSA8PSBhcnJheVtzdGFydCArIGhpbnRdXG4gIH0gZWxzZSB7XG4gICAgbWF4T2Zmc2V0ID0gaGludCArIDE7XG4gICAgd2hpbGUgKG9mZnNldCA8IG1heE9mZnNldCAmJiBjb21wYXJlKHZhbHVlLCBhcnJheVtzdGFydCArIGhpbnQgLSBvZmZzZXRdKSA8PSAwKSB7XG4gICAgICBsYXN0T2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgb2Zmc2V0ID0gKG9mZnNldCA8PCAxKSArIDE7XG5cbiAgICAgIGlmIChvZmZzZXQgPD0gMCkge1xuICAgICAgICBvZmZzZXQgPSBtYXhPZmZzZXQ7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvZmZzZXQgPiBtYXhPZmZzZXQpIHtcbiAgICAgIG9mZnNldCA9IG1heE9mZnNldDtcbiAgICB9XG5cbiAgICAvLyBNYWtlIG9mZnNldHMgcmVsYXRpdmUgdG8gc3RhcnRcbiAgICBsZXQgdG1wID0gbGFzdE9mZnNldDtcbiAgICBsYXN0T2Zmc2V0ID0gaGludCAtIG9mZnNldDtcbiAgICBvZmZzZXQgPSBoaW50IC0gdG1wO1xuICB9XG5cbiAgLypcbiAgICogTm93IGFycmF5W3N0YXJ0K2xhc3RPZmZzZXRdIDwgdmFsdWUgPD0gYXJyYXlbc3RhcnQrb2Zmc2V0XSwgc28gdmFsdWVcbiAgICogYmVsb25ncyBzb21ld2hlcmUgaW4gdGhlIHJhbmdlIChzdGFydCArIGxhc3RPZmZzZXQsIHN0YXJ0ICsgb2Zmc2V0XS4gRG8gYVxuICAgKiBiaW5hcnkgc2VhcmNoLCB3aXRoIGludmFyaWFudCBhcnJheVtzdGFydCArIGxhc3RPZmZzZXQgLSAxXSA8IHZhbHVlIDw9XG4gICAqIGFycmF5W3N0YXJ0ICsgb2Zmc2V0XS5cbiAgICovXG4gIGxhc3RPZmZzZXQrKztcbiAgd2hpbGUgKGxhc3RPZmZzZXQgPCBvZmZzZXQpIHtcbiAgICBsZXQgbSA9IGxhc3RPZmZzZXQgKyAoKG9mZnNldCAtIGxhc3RPZmZzZXQpID4+PiAxKTtcblxuICAgIGlmIChjb21wYXJlKHZhbHVlLCBhcnJheVtzdGFydCArIG1dKSA+IDApIHtcbiAgICAgIGxhc3RPZmZzZXQgPSBtICsgMTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBvZmZzZXQgPSBtO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2Zmc2V0O1xufVxuXG4vKipcbiAqIEZpbmQgdGhlIHBvc2l0aW9uIGF0IHdoaWNoIHRvIGluc2VydCBhIHZhbHVlIGluIGEgc29ydGVkIHJhbmdlLiBJZiB0aGUgcmFuZ2VcbiAqIGNvbnRhaW5zIGVsZW1lbnRzIGVxdWFsIHRvIHRoZSB2YWx1ZSB0aGUgcmlnaHRtb3N0IGVsZW1lbnQgaW5kZXggaXMgcmV0dXJuZWRcbiAqIChmb3Igc3RhYmlsaXR5KS5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBWYWx1ZSB0byBpbnNlcnQuXG4gKiBAcGFyYW0ge2FycmF5fSBhcnJheSAtIFRoZSBhcnJheSBpbiB3aGljaCB0byBpbnNlcnQgdmFsdWUuXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgLSBGaXJzdCBlbGVtZW50IGluIHRoZSByYW5nZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBMZW5ndGggb2YgdGhlIHJhbmdlLlxuICogQHBhcmFtIHtudW1iZXJ9IGhpbnQgLSBUaGUgaW5kZXggYXQgd2hpY2ggdG8gYmVnaW4gdGhlIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbXBhcmUgLSBJdGVtIGNvbXBhcmlzb24gZnVuY3Rpb24uXG4gKiBAcmV0dXJuIHtudW1iZXJ9IC0gVGhlIGluZGV4IHdoZXJlIHRvIGluc2VydCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2FsbG9wUmlnaHQodmFsdWUsIGFycmF5LCBzdGFydCwgbGVuZ3RoLCBoaW50LCBjb21wYXJlKSB7XG4gIGxldCBsYXN0T2Zmc2V0ID0gMDtcbiAgbGV0IG1heE9mZnNldCA9IDA7XG4gIGxldCBvZmZzZXQgPSAxO1xuXG4gIGlmIChjb21wYXJlKHZhbHVlLCBhcnJheVtzdGFydCArIGhpbnRdKSA8IDApIHtcbiAgICBtYXhPZmZzZXQgPSBoaW50ICsgMTtcblxuICAgIHdoaWxlIChvZmZzZXQgPCBtYXhPZmZzZXQgJiYgY29tcGFyZSh2YWx1ZSwgYXJyYXlbc3RhcnQgKyBoaW50IC0gb2Zmc2V0XSkgPCAwKSB7XG4gICAgICBsYXN0T2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgb2Zmc2V0ID0gKG9mZnNldCA8PCAxKSArIDE7XG5cbiAgICAgIGlmIChvZmZzZXQgPD0gMCkge1xuICAgICAgICBvZmZzZXQgPSBtYXhPZmZzZXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9mZnNldCA+IG1heE9mZnNldCkge1xuICAgICAgb2Zmc2V0ID0gbWF4T2Zmc2V0O1xuICAgIH1cblxuICAgIC8vIE1ha2Ugb2Zmc2V0cyByZWxhdGl2ZSB0byBzdGFydFxuICAgIGxldCB0bXAgPSBsYXN0T2Zmc2V0O1xuICAgIGxhc3RPZmZzZXQgPSBoaW50IC0gb2Zmc2V0O1xuICAgIG9mZnNldCA9IGhpbnQgLSB0bXA7XG5cbiAgICAvLyB2YWx1ZSA+PSBhcnJheVtzdGFydCArIGhpbnRdXG4gIH0gZWxzZSB7XG4gICAgbWF4T2Zmc2V0ID0gbGVuZ3RoIC0gaGludDtcblxuICAgIHdoaWxlIChvZmZzZXQgPCBtYXhPZmZzZXQgJiYgY29tcGFyZSh2YWx1ZSwgYXJyYXlbc3RhcnQgKyBoaW50ICsgb2Zmc2V0XSkgPj0gMCkge1xuICAgICAgbGFzdE9mZnNldCA9IG9mZnNldDtcbiAgICAgIG9mZnNldCA9IChvZmZzZXQgPDwgMSkgKyAxO1xuXG4gICAgICBpZiAob2Zmc2V0IDw9IDApIHtcbiAgICAgICAgb2Zmc2V0ID0gbWF4T2Zmc2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvZmZzZXQgPiBtYXhPZmZzZXQpIHtcbiAgICAgIG9mZnNldCA9IG1heE9mZnNldDtcbiAgICB9XG5cbiAgICAvLyBNYWtlIG9mZnNldHMgcmVsYXRpdmUgdG8gc3RhcnRcbiAgICBsYXN0T2Zmc2V0ICs9IGhpbnQ7XG4gICAgb2Zmc2V0ICs9IGhpbnQ7XG4gIH1cblxuICAvKlxuICAgKiBOb3cgYXJyYXlbc3RhcnQrbGFzdE9mZnNldF0gPCB2YWx1ZSA8PSBhcnJheVtzdGFydCtvZmZzZXRdLCBzbyB2YWx1ZVxuICAgKiBiZWxvbmdzIHNvbWV3aGVyZSBpbiB0aGUgcmFuZ2UgKHN0YXJ0ICsgbGFzdE9mZnNldCwgc3RhcnQgKyBvZmZzZXRdLiBEbyBhXG4gICAqIGJpbmFyeSBzZWFyY2gsIHdpdGggaW52YXJpYW50IGFycmF5W3N0YXJ0ICsgbGFzdE9mZnNldCAtIDFdIDwgdmFsdWUgPD1cbiAgICogYXJyYXlbc3RhcnQgKyBvZmZzZXRdLlxuICAgKi9cbiAgbGFzdE9mZnNldCsrO1xuXG4gIHdoaWxlIChsYXN0T2Zmc2V0IDwgb2Zmc2V0KSB7XG4gICAgbGV0IG0gPSBsYXN0T2Zmc2V0ICsgKChvZmZzZXQgLSBsYXN0T2Zmc2V0KSA+Pj4gMSk7XG5cbiAgICBpZiAoY29tcGFyZSh2YWx1ZSwgYXJyYXlbc3RhcnQgKyBtXSkgPCAwKSB7XG4gICAgICBvZmZzZXQgPSBtO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3RPZmZzZXQgPSBtICsgMTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0O1xufVxuXG5jbGFzcyBUaW1Tb3J0IHtcblxuICBjb25zdHJ1Y3RvcihhcnJheSwgY29tcGFyZSkge1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbiAgICB0aGlzLmNvbXBhcmUgPSBjb21wYXJlO1xuICAgIHRoaXMubWluR2FsbG9wID0gREVGQVVMVF9NSU5fR0FMTE9QSU5HO1xuICAgIHRoaXMubGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gICAgdGhpcy50bXBTdG9yYWdlTGVuZ3RoID0gREVGQVVMVF9UTVBfU1RPUkFHRV9MRU5HVEg7XG4gICAgaWYgKHRoaXMubGVuZ3RoIDwgMiAqIERFRkFVTFRfVE1QX1NUT1JBR0VfTEVOR1RIKSB7XG4gICAgICB0aGlzLnRtcFN0b3JhZ2VMZW5ndGggPSB0aGlzLmxlbmd0aCA+Pj4gMTtcbiAgICB9XG5cbiAgICB0aGlzLnRtcCA9IG5ldyBBcnJheSh0aGlzLnRtcFN0b3JhZ2VMZW5ndGgpO1xuXG4gICAgdGhpcy5zdGFja0xlbmd0aCA9XG4gICAgICAodGhpcy5sZW5ndGggPCAxMjAgPyA1IDpcbiAgICAgICAgdGhpcy5sZW5ndGggPCAxNTQyID8gMTAgOlxuICAgICAgICAgIHRoaXMubGVuZ3RoIDwgMTE5MTUxID8gMTkgOiA0MCk7XG5cbiAgICB0aGlzLnJ1blN0YXJ0ID0gbmV3IEFycmF5KHRoaXMuc3RhY2tMZW5ndGgpO1xuICAgIHRoaXMucnVuTGVuZ3RoID0gbmV3IEFycmF5KHRoaXMuc3RhY2tMZW5ndGgpO1xuICAgIHRoaXMuc3RhY2tTaXplID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdXNoIGEgbmV3IHJ1biBvbiBUaW1Tb3J0J3Mgc3RhY2suXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBydW5TdGFydCAtIFN0YXJ0IGluZGV4IG9mIHRoZSBydW4gaW4gdGhlIG9yaWdpbmFsIGFycmF5LlxuICAgKiBAcGFyYW0ge251bWJlcn0gcnVuTGVuZ3RoIC0gTGVuZ3RoIG9mIHRoZSBydW47XG4gICAqL1xuICBwdXNoUnVuKHJ1blN0YXJ0LCBydW5MZW5ndGgpIHtcbiAgICB0aGlzLnJ1blN0YXJ0W3RoaXMuc3RhY2tTaXplXSA9IHJ1blN0YXJ0O1xuICAgIHRoaXMucnVuTGVuZ3RoW3RoaXMuc3RhY2tTaXplXSA9IHJ1bkxlbmd0aDtcbiAgICB0aGlzLnN0YWNrU2l6ZSArPSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIE1lcmdlIHJ1bnMgb24gVGltU29ydCdzIHN0YWNrIHNvIHRoYXQgdGhlIGZvbGxvd2luZyBob2xkcyBmb3IgYWxsIGk6XG4gICAqIDEpIHJ1bkxlbmd0aFtpIC0gM10gPiBydW5MZW5ndGhbaSAtIDJdICsgcnVuTGVuZ3RoW2kgLSAxXVxuICAgKiAyKSBydW5MZW5ndGhbaSAtIDJdID4gcnVuTGVuZ3RoW2kgLSAxXVxuICAgKi9cbiAgbWVyZ2VSdW5zKCkge1xuICAgIHdoaWxlICh0aGlzLnN0YWNrU2l6ZSA+IDEpIHtcbiAgICAgIGxldCBuID0gdGhpcy5zdGFja1NpemUgLSAyO1xuXG4gICAgICBpZiAoKG4gPj0gMSAmJlxuICAgICAgICB0aGlzLnJ1bkxlbmd0aFtuIC0gMV0gPD0gdGhpcy5ydW5MZW5ndGhbbl0gKyB0aGlzLnJ1bkxlbmd0aFtuICsgMV0pIHx8XG4gICAgICAgIChuID49IDIgJiZcbiAgICAgICAgdGhpcy5ydW5MZW5ndGhbbiAtIDJdIDw9IHRoaXMucnVuTGVuZ3RoW25dICsgdGhpcy5ydW5MZW5ndGhbbiAtIDFdKSkge1xuXG4gICAgICAgIGlmICh0aGlzLnJ1bkxlbmd0aFtuIC0gMV0gPCB0aGlzLnJ1bkxlbmd0aFtuICsgMV0pIHtcbiAgICAgICAgICBuLS07XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIGlmICh0aGlzLnJ1bkxlbmd0aFtuXSA+IHRoaXMucnVuTGVuZ3RoW24gKyAxXSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHRoaXMubWVyZ2VBdChuKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWVyZ2UgYWxsIHJ1bnMgb24gVGltU29ydCdzIHN0YWNrIHVudGlsIG9ubHkgb25lIHJlbWFpbnMuXG4gICAqL1xuICBmb3JjZU1lcmdlUnVucygpIHtcbiAgICB3aGlsZSAodGhpcy5zdGFja1NpemUgPiAxKSB7XG4gICAgICBsZXQgbiA9IHRoaXMuc3RhY2tTaXplIC0gMjtcblxuICAgICAgaWYgKG4gPiAwICYmIHRoaXMucnVuTGVuZ3RoW24gLSAxXSA8IHRoaXMucnVuTGVuZ3RoW24gKyAxXSkge1xuICAgICAgICBuLS07XG4gICAgICB9XG5cbiAgICAgIHRoaXMubWVyZ2VBdChuKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWVyZ2UgdGhlIHJ1bnMgb24gdGhlIHN0YWNrIGF0IHBvc2l0aW9ucyBpIGFuZCBpKzEuIE11c3QgYmUgYWx3YXlzIGJlIGNhbGxlZFxuICAgKiB3aXRoIGk9c3RhY2tTaXplLTIgb3IgaT1zdGFja1NpemUtMyAodGhhdCBpcywgd2UgbWVyZ2Ugb24gdG9wIG9mIHRoZSBzdGFjaykuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpIC0gSW5kZXggb2YgdGhlIHJ1biB0byBtZXJnZSBpbiBUaW1Tb3J0J3Mgc3RhY2suXG4gICAqL1xuICBtZXJnZUF0KGkpIHtcbiAgICBsZXQgY29tcGFyZSA9IHRoaXMuY29tcGFyZTtcbiAgICBsZXQgYXJyYXkgPSB0aGlzLmFycmF5O1xuXG4gICAgbGV0IHN0YXJ0MSA9IHRoaXMucnVuU3RhcnRbaV07XG4gICAgbGV0IGxlbmd0aDEgPSB0aGlzLnJ1bkxlbmd0aFtpXTtcbiAgICBsZXQgc3RhcnQyID0gdGhpcy5ydW5TdGFydFtpICsgMV07XG4gICAgbGV0IGxlbmd0aDIgPSB0aGlzLnJ1bkxlbmd0aFtpICsgMV07XG5cbiAgICB0aGlzLnJ1bkxlbmd0aFtpXSA9IGxlbmd0aDEgKyBsZW5ndGgyO1xuXG4gICAgaWYgKGkgPT09IHRoaXMuc3RhY2tTaXplIC0gMykge1xuICAgICAgdGhpcy5ydW5TdGFydFtpICsgMV0gPSB0aGlzLnJ1blN0YXJ0W2kgKyAyXTtcbiAgICAgIHRoaXMucnVuTGVuZ3RoW2kgKyAxXSA9IHRoaXMucnVuTGVuZ3RoW2kgKyAyXTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YWNrU2l6ZS0tO1xuXG4gICAgLypcbiAgICAgKiBGaW5kIHdoZXJlIHRoZSBmaXJzdCBlbGVtZW50IGluIHRoZSBzZWNvbmQgcnVuIGdvZXMgaW4gcnVuMS4gUHJldmlvdXNcbiAgICAgKiBlbGVtZW50cyBpbiBydW4xIGFyZSBhbHJlYWR5IGluIHBsYWNlXG4gICAgICovXG4gICAgbGV0IGsgPSBnYWxsb3BSaWdodChhcnJheVtzdGFydDJdLCBhcnJheSwgc3RhcnQxLCBsZW5ndGgxLCAwLCBjb21wYXJlKTtcbiAgICBzdGFydDEgKz0gaztcbiAgICBsZW5ndGgxIC09IGs7XG5cbiAgICBpZiAobGVuZ3RoMSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogRmluZCB3aGVyZSB0aGUgbGFzdCBlbGVtZW50IGluIHRoZSBmaXJzdCBydW4gZ29lcyBpbiBydW4yLiBOZXh0IGVsZW1lbnRzXG4gICAgICogaW4gcnVuMiBhcmUgYWxyZWFkeSBpbiBwbGFjZVxuICAgICAqL1xuICAgIGxlbmd0aDIgPSBnYWxsb3BMZWZ0KGFycmF5W3N0YXJ0MSArIGxlbmd0aDEgLSAxXSwgYXJyYXksIHN0YXJ0MiwgbGVuZ3RoMiwgbGVuZ3RoMiAtIDEsIGNvbXBhcmUpO1xuXG4gICAgaWYgKGxlbmd0aDIgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIE1lcmdlIHJlbWFpbmluZyBydW5zLiBBIHRtcCBhcnJheSB3aXRoIGxlbmd0aCA9IG1pbihsZW5ndGgxLCBsZW5ndGgyKSBpc1xuICAgICAqIHVzZWRcbiAgICAgKi9cbiAgICBpZiAobGVuZ3RoMSA8PSBsZW5ndGgyKSB7XG4gICAgICB0aGlzLm1lcmdlTG93KHN0YXJ0MSwgbGVuZ3RoMSwgc3RhcnQyLCBsZW5ndGgyKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1lcmdlSGlnaChzdGFydDEsIGxlbmd0aDEsIHN0YXJ0MiwgbGVuZ3RoMik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1lcmdlIHR3byBhZGphY2VudCBydW5zIGluIGEgc3RhYmxlIHdheS4gVGhlIHJ1bnMgbXVzdCBiZSBzdWNoIHRoYXQgdGhlXG4gICAqIGZpcnN0IGVsZW1lbnQgb2YgcnVuMSBpcyBiaWdnZXIgdGhhbiB0aGUgZmlyc3QgZWxlbWVudCBpbiBydW4yIGFuZCB0aGVcbiAgICogbGFzdCBlbGVtZW50IG9mIHJ1bjEgaXMgZ3JlYXRlciB0aGFuIGFsbCB0aGUgZWxlbWVudHMgaW4gcnVuMi5cbiAgICogVGhlIG1ldGhvZCBzaG91bGQgYmUgY2FsbGVkIHdoZW4gcnVuMS5sZW5ndGggPD0gcnVuMi5sZW5ndGggYXMgaXQgdXNlc1xuICAgKiBUaW1Tb3J0IHRlbXBvcmFyeSBhcnJheSB0byBzdG9yZSBydW4xLiBVc2UgbWVyZ2VIaWdoIGlmIHJ1bjEubGVuZ3RoID5cbiAgICogcnVuMi5sZW5ndGguXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydDEgLSBGaXJzdCBlbGVtZW50IGluIHJ1bjEuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGgxIC0gTGVuZ3RoIG9mIHJ1bjEuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydDIgLSBGaXJzdCBlbGVtZW50IGluIHJ1bjIuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGgyIC0gTGVuZ3RoIG9mIHJ1bjIuXG4gICAqL1xuICBtZXJnZUxvdyhzdGFydDEsIGxlbmd0aDEsIHN0YXJ0MiwgbGVuZ3RoMikge1xuXG4gICAgbGV0IGNvbXBhcmUgPSB0aGlzLmNvbXBhcmU7XG4gICAgbGV0IGFycmF5ID0gdGhpcy5hcnJheTtcbiAgICBsZXQgdG1wID0gdGhpcy50bXA7XG4gICAgbGV0IGkgPSAwO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDE7IGkrKykge1xuICAgICAgdG1wW2ldID0gYXJyYXlbc3RhcnQxICsgaV07XG4gICAgfVxuXG4gICAgbGV0IGN1cnNvcjEgPSAwO1xuICAgIGxldCBjdXJzb3IyID0gc3RhcnQyO1xuICAgIGxldCBkZXN0ID0gc3RhcnQxO1xuXG4gICAgYXJyYXlbZGVzdCsrXSA9IGFycmF5W2N1cnNvcjIrK107XG5cbiAgICBpZiAoLS1sZW5ndGgyID09PSAwKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoMTsgaSsrKSB7XG4gICAgICAgIGFycmF5W2Rlc3QgKyBpXSA9IHRtcFtjdXJzb3IxICsgaV07XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGxlbmd0aDEgPT09IDEpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGgyOyBpKyspIHtcbiAgICAgICAgYXJyYXlbZGVzdCArIGldID0gYXJyYXlbY3Vyc29yMiArIGldO1xuICAgICAgfVxuICAgICAgYXJyYXlbZGVzdCArIGxlbmd0aDJdID0gdG1wW2N1cnNvcjFdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBtaW5HYWxsb3AgPSB0aGlzLm1pbkdhbGxvcDtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBsZXQgY291bnQxID0gMDtcbiAgICAgIGxldCBjb3VudDIgPSAwO1xuICAgICAgbGV0IGV4aXQgPSBmYWxzZTtcblxuICAgICAgZG8ge1xuICAgICAgICBpZiAoY29tcGFyZShhcnJheVtjdXJzb3IyXSwgdG1wW2N1cnNvcjFdKSA8IDApIHtcbiAgICAgICAgICBhcnJheVtkZXN0KytdID0gYXJyYXlbY3Vyc29yMisrXTtcbiAgICAgICAgICBjb3VudDIrKztcbiAgICAgICAgICBjb3VudDEgPSAwO1xuXG4gICAgICAgICAgaWYgKC0tbGVuZ3RoMiA9PT0gMCkge1xuICAgICAgICAgICAgZXhpdCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcnJheVtkZXN0KytdID0gdG1wW2N1cnNvcjErK107XG4gICAgICAgICAgY291bnQxKys7XG4gICAgICAgICAgY291bnQyID0gMDtcbiAgICAgICAgICBpZiAoLS1sZW5ndGgxID09PSAxKSB7XG4gICAgICAgICAgICBleGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSB3aGlsZSAoKGNvdW50MSB8IGNvdW50MikgPCBtaW5HYWxsb3ApO1xuXG4gICAgICBpZiAoZXhpdCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgZG8ge1xuICAgICAgICBjb3VudDEgPSBnYWxsb3BSaWdodChhcnJheVtjdXJzb3IyXSwgdG1wLCBjdXJzb3IxLCBsZW5ndGgxLCAwLCBjb21wYXJlKTtcblxuICAgICAgICBpZiAoY291bnQxICE9PSAwKSB7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50MTsgaSsrKSB7XG4gICAgICAgICAgICBhcnJheVtkZXN0ICsgaV0gPSB0bXBbY3Vyc29yMSArIGldO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRlc3QgKz0gY291bnQxO1xuICAgICAgICAgIGN1cnNvcjEgKz0gY291bnQxO1xuICAgICAgICAgIGxlbmd0aDEgLT0gY291bnQxO1xuICAgICAgICAgIGlmIChsZW5ndGgxIDw9IDEpIHtcbiAgICAgICAgICAgIGV4aXQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYXJyYXlbZGVzdCsrXSA9IGFycmF5W2N1cnNvcjIrK107XG5cbiAgICAgICAgaWYgKC0tbGVuZ3RoMiA9PT0gMCkge1xuICAgICAgICAgIGV4aXQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY291bnQyID0gZ2FsbG9wTGVmdCh0bXBbY3Vyc29yMV0sIGFycmF5LCBjdXJzb3IyLCBsZW5ndGgyLCAwLCBjb21wYXJlKTtcblxuICAgICAgICBpZiAoY291bnQyICE9PSAwKSB7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50MjsgaSsrKSB7XG4gICAgICAgICAgICBhcnJheVtkZXN0ICsgaV0gPSBhcnJheVtjdXJzb3IyICsgaV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGVzdCArPSBjb3VudDI7XG4gICAgICAgICAgY3Vyc29yMiArPSBjb3VudDI7XG4gICAgICAgICAgbGVuZ3RoMiAtPSBjb3VudDI7XG5cbiAgICAgICAgICBpZiAobGVuZ3RoMiA9PT0gMCkge1xuICAgICAgICAgICAgZXhpdCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXlbZGVzdCsrXSA9IHRtcFtjdXJzb3IxKytdO1xuXG4gICAgICAgIGlmICgtLWxlbmd0aDEgPT09IDEpIHtcbiAgICAgICAgICBleGl0ID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIG1pbkdhbGxvcC0tO1xuXG4gICAgICB9IHdoaWxlIChjb3VudDEgPj0gREVGQVVMVF9NSU5fR0FMTE9QSU5HIHx8IGNvdW50MiA+PSBERUZBVUxUX01JTl9HQUxMT1BJTkcpO1xuXG4gICAgICBpZiAoZXhpdCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKG1pbkdhbGxvcCA8IDApIHtcbiAgICAgICAgbWluR2FsbG9wID0gMDtcbiAgICAgIH1cblxuICAgICAgbWluR2FsbG9wICs9IDI7XG4gICAgfVxuXG4gICAgdGhpcy5taW5HYWxsb3AgPSBtaW5HYWxsb3A7XG5cbiAgICBpZiAobWluR2FsbG9wIDwgMSkge1xuICAgICAgdGhpcy5taW5HYWxsb3AgPSAxO1xuICAgIH1cblxuICAgIGlmIChsZW5ndGgxID09PSAxKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoMjsgaSsrKSB7XG4gICAgICAgIGFycmF5W2Rlc3QgKyBpXSA9IGFycmF5W2N1cnNvcjIgKyBpXTtcbiAgICAgIH1cbiAgICAgIGFycmF5W2Rlc3QgKyBsZW5ndGgyXSA9IHRtcFtjdXJzb3IxXTtcblxuICAgIH0gZWxzZSBpZiAobGVuZ3RoMSA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtZXJnZUxvdyBwcmVjb25kaXRpb25zIHdlcmUgbm90IHJlc3BlY3RlZCcpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGgxOyBpKyspIHtcbiAgICAgICAgYXJyYXlbZGVzdCArIGldID0gdG1wW2N1cnNvcjEgKyBpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWVyZ2UgdHdvIGFkamFjZW50IHJ1bnMgaW4gYSBzdGFibGUgd2F5LiBUaGUgcnVucyBtdXN0IGJlIHN1Y2ggdGhhdCB0aGVcbiAgICogZmlyc3QgZWxlbWVudCBvZiBydW4xIGlzIGJpZ2dlciB0aGFuIHRoZSBmaXJzdCBlbGVtZW50IGluIHJ1bjIgYW5kIHRoZVxuICAgKiBsYXN0IGVsZW1lbnQgb2YgcnVuMSBpcyBncmVhdGVyIHRoYW4gYWxsIHRoZSBlbGVtZW50cyBpbiBydW4yLlxuICAgKiBUaGUgbWV0aG9kIHNob3VsZCBiZSBjYWxsZWQgd2hlbiBydW4xLmxlbmd0aCA+IHJ1bjIubGVuZ3RoIGFzIGl0IHVzZXNcbiAgICogVGltU29ydCB0ZW1wb3JhcnkgYXJyYXkgdG8gc3RvcmUgcnVuMi4gVXNlIG1lcmdlTG93IGlmIHJ1bjEubGVuZ3RoIDw9XG4gICAqIHJ1bjIubGVuZ3RoLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnQxIC0gRmlyc3QgZWxlbWVudCBpbiBydW4xLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoMSAtIExlbmd0aCBvZiBydW4xLlxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnQyIC0gRmlyc3QgZWxlbWVudCBpbiBydW4yLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoMiAtIExlbmd0aCBvZiBydW4yLlxuICAgKi9cbiAgbWVyZ2VIaWdoKHN0YXJ0MSwgbGVuZ3RoMSwgc3RhcnQyLCBsZW5ndGgyKSB7XG4gICAgbGV0IGNvbXBhcmUgPSB0aGlzLmNvbXBhcmU7XG4gICAgbGV0IGFycmF5ID0gdGhpcy5hcnJheTtcbiAgICBsZXQgdG1wID0gdGhpcy50bXA7XG4gICAgbGV0IGkgPSAwO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDI7IGkrKykge1xuICAgICAgdG1wW2ldID0gYXJyYXlbc3RhcnQyICsgaV07XG4gICAgfVxuXG4gICAgbGV0IGN1cnNvcjEgPSBzdGFydDEgKyBsZW5ndGgxIC0gMTtcbiAgICBsZXQgY3Vyc29yMiA9IGxlbmd0aDIgLSAxO1xuICAgIGxldCBkZXN0ID0gc3RhcnQyICsgbGVuZ3RoMiAtIDE7XG4gICAgbGV0IGN1c3RvbUN1cnNvciA9IDA7XG4gICAgbGV0IGN1c3RvbURlc3QgPSAwO1xuXG4gICAgYXJyYXlbZGVzdC0tXSA9IGFycmF5W2N1cnNvcjEtLV07XG5cbiAgICBpZiAoLS1sZW5ndGgxID09PSAwKSB7XG4gICAgICBjdXN0b21DdXJzb3IgPSBkZXN0IC0gKGxlbmd0aDIgLSAxKTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDI7IGkrKykge1xuICAgICAgICBhcnJheVtjdXN0b21DdXJzb3IgKyBpXSA9IHRtcFtpXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChsZW5ndGgyID09PSAxKSB7XG4gICAgICBkZXN0IC09IGxlbmd0aDE7XG4gICAgICBjdXJzb3IxIC09IGxlbmd0aDE7XG4gICAgICBjdXN0b21EZXN0ID0gZGVzdCArIDE7XG4gICAgICBjdXN0b21DdXJzb3IgPSBjdXJzb3IxICsgMTtcblxuICAgICAgZm9yIChpID0gbGVuZ3RoMSAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGFycmF5W2N1c3RvbURlc3QgKyBpXSA9IGFycmF5W2N1c3RvbUN1cnNvciArIGldO1xuICAgICAgfVxuXG4gICAgICBhcnJheVtkZXN0XSA9IHRtcFtjdXJzb3IyXTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbWluR2FsbG9wID0gdGhpcy5taW5HYWxsb3A7XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgbGV0IGNvdW50MSA9IDA7XG4gICAgICBsZXQgY291bnQyID0gMDtcbiAgICAgIGxldCBleGl0ID0gZmFsc2U7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgaWYgKGNvbXBhcmUodG1wW2N1cnNvcjJdLCBhcnJheVtjdXJzb3IxXSkgPCAwKSB7XG4gICAgICAgICAgYXJyYXlbZGVzdC0tXSA9IGFycmF5W2N1cnNvcjEtLV07XG4gICAgICAgICAgY291bnQxKys7XG4gICAgICAgICAgY291bnQyID0gMDtcbiAgICAgICAgICBpZiAoLS1sZW5ndGgxID09PSAwKSB7XG4gICAgICAgICAgICBleGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFycmF5W2Rlc3QtLV0gPSB0bXBbY3Vyc29yMi0tXTtcbiAgICAgICAgICBjb3VudDIrKztcbiAgICAgICAgICBjb3VudDEgPSAwO1xuICAgICAgICAgIGlmICgtLWxlbmd0aDIgPT09IDEpIHtcbiAgICAgICAgICAgIGV4aXQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH0gd2hpbGUgKChjb3VudDEgfCBjb3VudDIpIDwgbWluR2FsbG9wKTtcblxuICAgICAgaWYgKGV4aXQpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGRvIHtcbiAgICAgICAgY291bnQxID0gbGVuZ3RoMSAtIGdhbGxvcFJpZ2h0KHRtcFtjdXJzb3IyXSwgYXJyYXksIHN0YXJ0MSwgbGVuZ3RoMSwgbGVuZ3RoMSAtIDEsIGNvbXBhcmUpO1xuXG4gICAgICAgIGlmIChjb3VudDEgIT09IDApIHtcbiAgICAgICAgICBkZXN0IC09IGNvdW50MTtcbiAgICAgICAgICBjdXJzb3IxIC09IGNvdW50MTtcbiAgICAgICAgICBsZW5ndGgxIC09IGNvdW50MTtcbiAgICAgICAgICBjdXN0b21EZXN0ID0gZGVzdCArIDE7XG4gICAgICAgICAgY3VzdG9tQ3Vyc29yID0gY3Vyc29yMSArIDE7XG5cbiAgICAgICAgICBmb3IgKGkgPSBjb3VudDEgLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgYXJyYXlbY3VzdG9tRGVzdCArIGldID0gYXJyYXlbY3VzdG9tQ3Vyc29yICsgaV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGxlbmd0aDEgPT09IDApIHtcbiAgICAgICAgICAgIGV4aXQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYXJyYXlbZGVzdC0tXSA9IHRtcFtjdXJzb3IyLS1dO1xuXG4gICAgICAgIGlmICgtLWxlbmd0aDIgPT09IDEpIHtcbiAgICAgICAgICBleGl0ID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvdW50MiA9IGxlbmd0aDIgLSBnYWxsb3BMZWZ0KGFycmF5W2N1cnNvcjFdLCB0bXAsIDAsIGxlbmd0aDIsIGxlbmd0aDIgLSAxLCBjb21wYXJlKTtcblxuICAgICAgICBpZiAoY291bnQyICE9PSAwKSB7XG4gICAgICAgICAgZGVzdCAtPSBjb3VudDI7XG4gICAgICAgICAgY3Vyc29yMiAtPSBjb3VudDI7XG4gICAgICAgICAgbGVuZ3RoMiAtPSBjb3VudDI7XG4gICAgICAgICAgY3VzdG9tRGVzdCA9IGRlc3QgKyAxO1xuICAgICAgICAgIGN1c3RvbUN1cnNvciA9IGN1cnNvcjIgKyAxO1xuXG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvdW50MjsgaSsrKSB7XG4gICAgICAgICAgICBhcnJheVtjdXN0b21EZXN0ICsgaV0gPSB0bXBbY3VzdG9tQ3Vyc29yICsgaV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGxlbmd0aDIgPD0gMSkge1xuICAgICAgICAgICAgZXhpdCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhcnJheVtkZXN0LS1dID0gYXJyYXlbY3Vyc29yMS0tXTtcblxuICAgICAgICBpZiAoLS1sZW5ndGgxID09PSAwKSB7XG4gICAgICAgICAgZXhpdCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBtaW5HYWxsb3AtLTtcblxuICAgICAgfSB3aGlsZSAoY291bnQxID49IERFRkFVTFRfTUlOX0dBTExPUElORyB8fCBjb3VudDIgPj0gREVGQVVMVF9NSU5fR0FMTE9QSU5HKTtcblxuICAgICAgaWYgKGV4aXQpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmIChtaW5HYWxsb3AgPCAwKSB7XG4gICAgICAgIG1pbkdhbGxvcCA9IDA7XG4gICAgICB9XG5cbiAgICAgIG1pbkdhbGxvcCArPSAyO1xuICAgIH1cblxuICAgIHRoaXMubWluR2FsbG9wID0gbWluR2FsbG9wO1xuXG4gICAgaWYgKG1pbkdhbGxvcCA8IDEpIHtcbiAgICAgIHRoaXMubWluR2FsbG9wID0gMTtcbiAgICB9XG5cbiAgICBpZiAobGVuZ3RoMiA9PT0gMSkge1xuICAgICAgZGVzdCAtPSBsZW5ndGgxO1xuICAgICAgY3Vyc29yMSAtPSBsZW5ndGgxO1xuICAgICAgY3VzdG9tRGVzdCA9IGRlc3QgKyAxO1xuICAgICAgY3VzdG9tQ3Vyc29yID0gY3Vyc29yMSArIDE7XG5cbiAgICAgIGZvciAoaSA9IGxlbmd0aDEgLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBhcnJheVtjdXN0b21EZXN0ICsgaV0gPSBhcnJheVtjdXN0b21DdXJzb3IgKyBpXTtcbiAgICAgIH1cblxuICAgICAgYXJyYXlbZGVzdF0gPSB0bXBbY3Vyc29yMl07XG5cbiAgICB9IGVsc2UgaWYgKGxlbmd0aDIgPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWVyZ2VIaWdoIHByZWNvbmRpdGlvbnMgd2VyZSBub3QgcmVzcGVjdGVkJyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgY3VzdG9tQ3Vyc29yID0gZGVzdCAtIChsZW5ndGgyIC0gMSk7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoMjsgaSsrKSB7XG4gICAgICAgIGFycmF5W2N1c3RvbUN1cnNvciArIGldID0gdG1wW2ldO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFNvcnQgYW4gYXJyYXkgaW4gdGhlIHJhbmdlIFtsbywgaGkpIHVzaW5nIFRpbVNvcnQuXG4gKlxuICogQHBhcmFtIHthcnJheX0gYXJyYXkgLSBUaGUgYXJyYXkgdG8gc29ydC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBsbyAtIEZpcnN0IGVsZW1lbnQgaW4gdGhlIHJhbmdlIChpbmNsdXNpdmUpLlxuICogQHBhcmFtIHtudW1iZXJ9IGhpIC0gTGFzdCBlbGVtZW50IGluIHRoZSByYW5nZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb249fSBjb21wYXJlIC0gSXRlbSBjb21wYXJpc29uIGZ1bmN0aW9uLiBEZWZhdWx0IGlzIGFscGhhYmV0aWNhbC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGFycmF5LCBsbywgaGksIGNvbXBhcmUpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbiBvbmx5IHNvcnQgYXJyYXlzJyk7XG4gIH1cblxuICAvKlxuICAgKiBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgYSBjb21wYXJpc29uIGZ1bmN0aW9uIGlzIG5vdCBwcm92aWRlZC4gV2UgZG9cbiAgICogbGV4aWNvZ3JhcGhpYyBzb3J0aW5nXG4gICAqL1xuXG4gIGlmIChsbyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbG8gPSAwO1xuICB9XG5cbiAgaWYgKGhpID09PSB1bmRlZmluZWQpIHtcbiAgICBoaSA9IGFycmF5Lmxlbmd0aDtcbiAgfVxuXG4gIGlmIChjb21wYXJlID09PSB1bmRlZmluZWQpIHtcbiAgICBjb21wYXJlID0gYWxwaGFiZXRpY2FsQ29tcGFyZTtcbiAgfVxuXG4gIGxldCByZW1haW5pbmcgPSBoaSAtIGxvO1xuXG4gIC8vIFRoZSBhcnJheSBpcyBhbHJlYWR5IHNvcnRlZFxuICBpZiAocmVtYWluaW5nIDwgMikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBydW5MZW5ndGggPSAwO1xuICAvLyBPbiBzbWFsbCBhcnJheXMgYmluYXJ5IHNvcnQgY2FuIGJlIHVzZWQgZGlyZWN0bHlcbiAgaWYgKHJlbWFpbmluZyA8IERFRkFVTFRfTUlOX01FUkdFKSB7XG4gICAgcnVuTGVuZ3RoID0gbWFrZUFzY2VuZGluZ1J1bihhcnJheSwgbG8sIGhpLCBjb21wYXJlKTtcbiAgICBiaW5hcnlJbnNlcnRpb25Tb3J0KGFycmF5LCBsbywgaGksIGxvICsgcnVuTGVuZ3RoLCBjb21wYXJlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgdHMgPSBuZXcgVGltU29ydChhcnJheSwgY29tcGFyZSk7XG5cbiAgbGV0IG1pblJ1biA9IG1pblJ1bkxlbmd0aChyZW1haW5pbmcpO1xuXG4gIGRvIHtcbiAgICBydW5MZW5ndGggPSBtYWtlQXNjZW5kaW5nUnVuKGFycmF5LCBsbywgaGksIGNvbXBhcmUpO1xuICAgIGlmIChydW5MZW5ndGggPCBtaW5SdW4pIHtcbiAgICAgIGxldCBmb3JjZSA9IHJlbWFpbmluZztcbiAgICAgIGlmIChmb3JjZSA+IG1pblJ1bikge1xuICAgICAgICBmb3JjZSA9IG1pblJ1bjtcbiAgICAgIH1cblxuICAgICAgYmluYXJ5SW5zZXJ0aW9uU29ydChhcnJheSwgbG8sIGxvICsgZm9yY2UsIGxvICsgcnVuTGVuZ3RoLCBjb21wYXJlKTtcbiAgICAgIHJ1bkxlbmd0aCA9IGZvcmNlO1xuICAgIH1cbiAgICAvLyBQdXNoIG5ldyBydW4gYW5kIG1lcmdlIGlmIG5lY2Vzc2FyeVxuICAgIHRzLnB1c2hSdW4obG8sIHJ1bkxlbmd0aCk7XG4gICAgdHMubWVyZ2VSdW5zKCk7XG5cbiAgICAvLyBHbyBmaW5kIG5leHQgcnVuXG4gICAgcmVtYWluaW5nIC09IHJ1bkxlbmd0aDtcbiAgICBsbyArPSBydW5MZW5ndGg7XG5cbiAgfSB3aGlsZSAocmVtYWluaW5nICE9PSAwKTtcblxuICAvLyBGb3JjZSBtZXJnaW5nIG9mIHJlbWFpbmluZyBydW5zXG4gIHRzLmZvcmNlTWVyZ2VSdW5zKCk7XG59Il0sInNvdXJjZVJvb3QiOiIvIn0=