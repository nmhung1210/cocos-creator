
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/compression/ZipUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/*--
 Copyright 2009-2010 by Stefan Rusterholz.
 All rights reserved.
 You can choose between MIT and BSD-3-Clause license. License file will be added later.
 --*/
var codec = {
  name: 'Jacob__Codec'
};
codec.Base64 = require('./base64');
codec.GZip = require('./gzip');
/**
 * Unpack a gzipped byte array
 * @param {Array} input Byte array
 * @returns {String} Unpacked byte string
 */

codec.unzip = function () {
  return codec.GZip.gunzip.apply(codec.GZip, arguments);
};
/**
 * Unpack a gzipped byte string encoded as base64
 * @param {String} input Byte string encoded as base64
 * @returns {String} Unpacked byte string
 */


codec.unzipBase64 = function () {
  var buffer = codec.Base64.decode.apply(codec.Base64, arguments);

  try {
    return codec.GZip.gunzip.call(codec.GZip, buffer);
  } catch (e) {
    // if not zipped, just skip
    return buffer.slice(7); // get image data
  }
};
/**
 * Unpack a gzipped byte string encoded as base64
 * @param {String} input Byte string encoded as base64
 * @param {Number} bytes Bytes per array item
 * @returns {Array} Unpacked byte array
 */


codec.unzipBase64AsArray = function (input, bytes) {
  bytes = bytes || 1;
  var dec = this.unzipBase64(input),
      ar = [],
      i,
      j,
      len;

  for (i = 0, len = dec.length / bytes; i < len; i++) {
    ar[i] = 0;

    for (j = bytes - 1; j >= 0; --j) {
      ar[i] += dec.charCodeAt(i * bytes + j) << j * 8;
    }
  }

  return ar;
};
/**
 * Unpack a gzipped byte array
 * @param {Array} input Byte array
 * @param {Number} bytes Bytes per array item
 * @returns {Array} Unpacked byte array
 */


codec.unzipAsArray = function (input, bytes) {
  bytes = bytes || 1;
  var dec = this.unzip(input),
      ar = [],
      i,
      j,
      len;

  for (i = 0, len = dec.length / bytes; i < len; i++) {
    ar[i] = 0;

    for (j = bytes - 1; j >= 0; --j) {
      ar[i] += dec.charCodeAt(i * bytes + j) << j * 8;
    }
  }

  return ar;
};

cc.codec = module.exports = codec;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb21wcmVzc2lvbi9aaXBVdGlscy5qcyJdLCJuYW1lcyI6WyJjb2RlYyIsIm5hbWUiLCJCYXNlNjQiLCJyZXF1aXJlIiwiR1ppcCIsInVuemlwIiwiZ3VuemlwIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJ1bnppcEJhc2U2NCIsImJ1ZmZlciIsImRlY29kZSIsImNhbGwiLCJlIiwic2xpY2UiLCJ1bnppcEJhc2U2NEFzQXJyYXkiLCJpbnB1dCIsImJ5dGVzIiwiZGVjIiwiYXIiLCJpIiwiaiIsImxlbiIsImxlbmd0aCIsImNoYXJDb2RlQXQiLCJ1bnppcEFzQXJyYXkiLCJjYyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7QUFNQSxJQUFJQSxLQUFLLEdBQUc7QUFBQ0MsRUFBQUEsSUFBSSxFQUFDO0FBQU4sQ0FBWjtBQUVBRCxLQUFLLENBQUNFLE1BQU4sR0FBZUMsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7QUFDQUgsS0FBSyxDQUFDSSxJQUFOLEdBQWFELE9BQU8sQ0FBQyxRQUFELENBQXBCO0FBRUE7Ozs7OztBQUtBSCxLQUFLLENBQUNLLEtBQU4sR0FBYyxZQUFZO0FBQ3RCLFNBQU9MLEtBQUssQ0FBQ0ksSUFBTixDQUFXRSxNQUFYLENBQWtCQyxLQUFsQixDQUF3QlAsS0FBSyxDQUFDSSxJQUE5QixFQUFvQ0ksU0FBcEMsQ0FBUDtBQUNILENBRkQ7QUFJQTs7Ozs7OztBQUtBUixLQUFLLENBQUNTLFdBQU4sR0FBb0IsWUFBWTtBQUM1QixNQUFJQyxNQUFNLEdBQUdWLEtBQUssQ0FBQ0UsTUFBTixDQUFhUyxNQUFiLENBQW9CSixLQUFwQixDQUEwQlAsS0FBSyxDQUFDRSxNQUFoQyxFQUF3Q00sU0FBeEMsQ0FBYjs7QUFDQSxNQUFJO0FBQ0EsV0FBT1IsS0FBSyxDQUFDSSxJQUFOLENBQVdFLE1BQVgsQ0FBa0JNLElBQWxCLENBQXVCWixLQUFLLENBQUNJLElBQTdCLEVBQW1DTSxNQUFuQyxDQUFQO0FBQ0gsR0FGRCxDQUdBLE9BQU1HLENBQU4sRUFBUztBQUNMO0FBQ0EsV0FBT0gsTUFBTSxDQUFDSSxLQUFQLENBQWEsQ0FBYixDQUFQLENBRkssQ0FFbUI7QUFDM0I7QUFDSixDQVREO0FBV0E7Ozs7Ozs7O0FBTUFkLEtBQUssQ0FBQ2Usa0JBQU4sR0FBMkIsVUFBVUMsS0FBVixFQUFpQkMsS0FBakIsRUFBd0I7QUFDL0NBLEVBQUFBLEtBQUssR0FBR0EsS0FBSyxJQUFJLENBQWpCO0FBRUEsTUFBSUMsR0FBRyxHQUFHLEtBQUtULFdBQUwsQ0FBaUJPLEtBQWpCLENBQVY7QUFBQSxNQUNJRyxFQUFFLEdBQUcsRUFEVDtBQUFBLE1BQ2FDLENBRGI7QUFBQSxNQUNnQkMsQ0FEaEI7QUFBQSxNQUNtQkMsR0FEbkI7O0FBRUEsT0FBS0YsQ0FBQyxHQUFHLENBQUosRUFBT0UsR0FBRyxHQUFHSixHQUFHLENBQUNLLE1BQUosR0FBYU4sS0FBL0IsRUFBc0NHLENBQUMsR0FBR0UsR0FBMUMsRUFBK0NGLENBQUMsRUFBaEQsRUFBb0Q7QUFDaERELElBQUFBLEVBQUUsQ0FBQ0MsQ0FBRCxDQUFGLEdBQVEsQ0FBUjs7QUFDQSxTQUFLQyxDQUFDLEdBQUdKLEtBQUssR0FBRyxDQUFqQixFQUFvQkksQ0FBQyxJQUFJLENBQXpCLEVBQTRCLEVBQUVBLENBQTlCLEVBQWlDO0FBQzdCRixNQUFBQSxFQUFFLENBQUNDLENBQUQsQ0FBRixJQUFTRixHQUFHLENBQUNNLFVBQUosQ0FBZ0JKLENBQUMsR0FBR0gsS0FBTCxHQUFjSSxDQUE3QixLQUFvQ0EsQ0FBQyxHQUFHLENBQWpEO0FBQ0g7QUFDSjs7QUFDRCxTQUFPRixFQUFQO0FBQ0gsQ0FaRDtBQWNBOzs7Ozs7OztBQU1BbkIsS0FBSyxDQUFDeUIsWUFBTixHQUFxQixVQUFVVCxLQUFWLEVBQWlCQyxLQUFqQixFQUF3QjtBQUN6Q0EsRUFBQUEsS0FBSyxHQUFHQSxLQUFLLElBQUksQ0FBakI7QUFFQSxNQUFJQyxHQUFHLEdBQUcsS0FBS2IsS0FBTCxDQUFXVyxLQUFYLENBQVY7QUFBQSxNQUNJRyxFQUFFLEdBQUcsRUFEVDtBQUFBLE1BQ2FDLENBRGI7QUFBQSxNQUNnQkMsQ0FEaEI7QUFBQSxNQUNtQkMsR0FEbkI7O0FBRUEsT0FBS0YsQ0FBQyxHQUFHLENBQUosRUFBT0UsR0FBRyxHQUFHSixHQUFHLENBQUNLLE1BQUosR0FBYU4sS0FBL0IsRUFBc0NHLENBQUMsR0FBR0UsR0FBMUMsRUFBK0NGLENBQUMsRUFBaEQsRUFBb0Q7QUFDaERELElBQUFBLEVBQUUsQ0FBQ0MsQ0FBRCxDQUFGLEdBQVEsQ0FBUjs7QUFDQSxTQUFLQyxDQUFDLEdBQUdKLEtBQUssR0FBRyxDQUFqQixFQUFvQkksQ0FBQyxJQUFJLENBQXpCLEVBQTRCLEVBQUVBLENBQTlCLEVBQWlDO0FBQzdCRixNQUFBQSxFQUFFLENBQUNDLENBQUQsQ0FBRixJQUFTRixHQUFHLENBQUNNLFVBQUosQ0FBZ0JKLENBQUMsR0FBR0gsS0FBTCxHQUFjSSxDQUE3QixLQUFvQ0EsQ0FBQyxHQUFHLENBQWpEO0FBQ0g7QUFDSjs7QUFDRCxTQUFPRixFQUFQO0FBQ0gsQ0FaRDs7QUFjQU8sRUFBRSxDQUFDMUIsS0FBSCxHQUFXMkIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCNUIsS0FBNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tXG4gQ29weXJpZ2h0IDIwMDktMjAxMCBieSBTdGVmYW4gUnVzdGVyaG9sei5cbiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuIFlvdSBjYW4gY2hvb3NlIGJldHdlZW4gTUlUIGFuZCBCU0QtMy1DbGF1c2UgbGljZW5zZS4gTGljZW5zZSBmaWxlIHdpbGwgYmUgYWRkZWQgbGF0ZXIuXG4gLS0qL1xuXG52YXIgY29kZWMgPSB7bmFtZTonSmFjb2JfX0NvZGVjJ307XG5cbmNvZGVjLkJhc2U2NCA9IHJlcXVpcmUoJy4vYmFzZTY0Jyk7XG5jb2RlYy5HWmlwID0gcmVxdWlyZSgnLi9nemlwJyk7XG5cbi8qKlxuICogVW5wYWNrIGEgZ3ppcHBlZCBieXRlIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBpbnB1dCBCeXRlIGFycmF5XG4gKiBAcmV0dXJucyB7U3RyaW5nfSBVbnBhY2tlZCBieXRlIHN0cmluZ1xuICovXG5jb2RlYy51bnppcCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY29kZWMuR1ppcC5ndW56aXAuYXBwbHkoY29kZWMuR1ppcCwgYXJndW1lbnRzKTtcbn07XG5cbi8qKlxuICogVW5wYWNrIGEgZ3ppcHBlZCBieXRlIHN0cmluZyBlbmNvZGVkIGFzIGJhc2U2NFxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IEJ5dGUgc3RyaW5nIGVuY29kZWQgYXMgYmFzZTY0XG4gKiBAcmV0dXJucyB7U3RyaW5nfSBVbnBhY2tlZCBieXRlIHN0cmluZ1xuICovXG5jb2RlYy51bnppcEJhc2U2NCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYnVmZmVyID0gY29kZWMuQmFzZTY0LmRlY29kZS5hcHBseShjb2RlYy5CYXNlNjQsIGFyZ3VtZW50cyk7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGNvZGVjLkdaaXAuZ3VuemlwLmNhbGwoY29kZWMuR1ppcCwgYnVmZmVyKTtcbiAgICB9XG4gICAgY2F0Y2goZSkge1xuICAgICAgICAvLyBpZiBub3QgemlwcGVkLCBqdXN0IHNraXBcbiAgICAgICAgcmV0dXJuIGJ1ZmZlci5zbGljZSg3KTsgLy8gZ2V0IGltYWdlIGRhdGFcbiAgICB9XG59O1xuXG4vKipcbiAqIFVucGFjayBhIGd6aXBwZWQgYnl0ZSBzdHJpbmcgZW5jb2RlZCBhcyBiYXNlNjRcbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBCeXRlIHN0cmluZyBlbmNvZGVkIGFzIGJhc2U2NFxuICogQHBhcmFtIHtOdW1iZXJ9IGJ5dGVzIEJ5dGVzIHBlciBhcnJheSBpdGVtXG4gKiBAcmV0dXJucyB7QXJyYXl9IFVucGFja2VkIGJ5dGUgYXJyYXlcbiAqL1xuY29kZWMudW56aXBCYXNlNjRBc0FycmF5ID0gZnVuY3Rpb24gKGlucHV0LCBieXRlcykge1xuICAgIGJ5dGVzID0gYnl0ZXMgfHwgMTtcblxuICAgIHZhciBkZWMgPSB0aGlzLnVuemlwQmFzZTY0KGlucHV0KSxcbiAgICAgICAgYXIgPSBbXSwgaSwgaiwgbGVuO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGRlYy5sZW5ndGggLyBieXRlczsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGFyW2ldID0gMDtcbiAgICAgICAgZm9yIChqID0gYnl0ZXMgLSAxOyBqID49IDA7IC0taikge1xuICAgICAgICAgICAgYXJbaV0gKz0gZGVjLmNoYXJDb2RlQXQoKGkgKiBieXRlcykgKyBqKSA8PCAoaiAqIDgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG5cbi8qKlxuICogVW5wYWNrIGEgZ3ppcHBlZCBieXRlIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBpbnB1dCBCeXRlIGFycmF5XG4gKiBAcGFyYW0ge051bWJlcn0gYnl0ZXMgQnl0ZXMgcGVyIGFycmF5IGl0ZW1cbiAqIEByZXR1cm5zIHtBcnJheX0gVW5wYWNrZWQgYnl0ZSBhcnJheVxuICovXG5jb2RlYy51bnppcEFzQXJyYXkgPSBmdW5jdGlvbiAoaW5wdXQsIGJ5dGVzKSB7XG4gICAgYnl0ZXMgPSBieXRlcyB8fCAxO1xuXG4gICAgdmFyIGRlYyA9IHRoaXMudW56aXAoaW5wdXQpLFxuICAgICAgICBhciA9IFtdLCBpLCBqLCBsZW47XG4gICAgZm9yIChpID0gMCwgbGVuID0gZGVjLmxlbmd0aCAvIGJ5dGVzOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgYXJbaV0gPSAwO1xuICAgICAgICBmb3IgKGogPSBieXRlcyAtIDE7IGogPj0gMDsgLS1qKSB7XG4gICAgICAgICAgICBhcltpXSArPSBkZWMuY2hhckNvZGVBdCgoaSAqIGJ5dGVzKSArIGopIDw8IChqICogOCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcblxuY2MuY29kZWMgPSBtb2R1bGUuZXhwb3J0cyA9IGNvZGVjOyJdLCJzb3VyY2VSb290IjoiLyJ9