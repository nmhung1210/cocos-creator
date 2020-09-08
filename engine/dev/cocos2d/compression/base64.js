
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/compression/base64.js';
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
var misc = require('../core/utils/misc');

var strValue = misc.BASE64_VALUES;
/**
 * mixin cc.Codec.Base64
 */

var Base64 = {
  name: 'Jacob__Codec__Base64'
};
/**
 * <p>
 *    cc.Codec.Base64.decode(input[, unicode=false]) -> String (http://en.wikipedia.org/wiki/Base64).
 * </p>
 * @function
 * @param {String} input The base64 encoded string to decode
 * @return {String} Decodes a base64 encoded String
 * @example
 * //decode string
 * cc.Codec.Base64.decode("U29tZSBTdHJpbmc="); // => "Some String"
 */

Base64.decode = function Jacob__Codec__Base64__decode(input) {
  var output = [],
      chr1,
      chr2,
      chr3,
      enc1,
      enc2,
      enc3,
      enc4,
      i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

  while (i < input.length) {
    enc1 = strValue[input.charCodeAt(i++)];
    enc2 = strValue[input.charCodeAt(i++)];
    enc3 = strValue[input.charCodeAt(i++)];
    enc4 = strValue[input.charCodeAt(i++)];
    chr1 = enc1 << 2 | enc2 >> 4;
    chr2 = (enc2 & 15) << 4 | enc3 >> 2;
    chr3 = (enc3 & 3) << 6 | enc4;
    output.push(String.fromCharCode(chr1));

    if (enc3 !== 64) {
      output.push(String.fromCharCode(chr2));
    }

    if (enc4 !== 64) {
      output.push(String.fromCharCode(chr3));
    }
  }

  output = output.join('');
  return output;
};
/**
 * <p>
 *    Converts an input string encoded in base64 to an array of integers whose<br/>
 *    values represent the decoded string's characters' bytes.
 * </p>
 * @function
 * @param {String} input The String to convert to an array of Integers
 * @param {Number} bytes
 * @return {Array}
 * @example
 * //decode string to array
 * var decodeArr = cc.Codec.Base64.decodeAsArray("U29tZSBTdHJpbmc=");
 */


Base64.decodeAsArray = function Jacob__Codec__Base64___decodeAsArray(input, bytes) {
  var dec = this.decode(input),
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

module.exports = Base64;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb21wcmVzc2lvbi9iYXNlNjQuanMiXSwibmFtZXMiOlsibWlzYyIsInJlcXVpcmUiLCJzdHJWYWx1ZSIsIkJBU0U2NF9WQUxVRVMiLCJCYXNlNjQiLCJuYW1lIiwiZGVjb2RlIiwiSmFjb2JfX0NvZGVjX19CYXNlNjRfX2RlY29kZSIsImlucHV0Iiwib3V0cHV0IiwiY2hyMSIsImNocjIiLCJjaHIzIiwiZW5jMSIsImVuYzIiLCJlbmMzIiwiZW5jNCIsImkiLCJyZXBsYWNlIiwibGVuZ3RoIiwiY2hhckNvZGVBdCIsInB1c2giLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJqb2luIiwiZGVjb2RlQXNBcnJheSIsIkphY29iX19Db2RlY19fQmFzZTY0X19fZGVjb2RlQXNBcnJheSIsImJ5dGVzIiwiZGVjIiwiYXIiLCJqIiwibGVuIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7OztBQU1BLElBQUlBLElBQUksR0FBR0MsT0FBTyxDQUFDLG9CQUFELENBQWxCOztBQUNBLElBQUlDLFFBQVEsR0FBR0YsSUFBSSxDQUFDRyxhQUFwQjtBQUVBOzs7O0FBR0EsSUFBSUMsTUFBTSxHQUFHO0FBQUNDLEVBQUFBLElBQUksRUFBQztBQUFOLENBQWI7QUFFQTs7Ozs7Ozs7Ozs7O0FBV0FELE1BQU0sQ0FBQ0UsTUFBUCxHQUFnQixTQUFTQyw0QkFBVCxDQUFzQ0MsS0FBdEMsRUFBNkM7QUFDekQsTUFBSUMsTUFBTSxHQUFHLEVBQWI7QUFBQSxNQUNJQyxJQURKO0FBQUEsTUFDVUMsSUFEVjtBQUFBLE1BQ2dCQyxJQURoQjtBQUFBLE1BRUlDLElBRko7QUFBQSxNQUVVQyxJQUZWO0FBQUEsTUFFZ0JDLElBRmhCO0FBQUEsTUFFc0JDLElBRnRCO0FBQUEsTUFHSUMsQ0FBQyxHQUFHLENBSFI7QUFLQVQsRUFBQUEsS0FBSyxHQUFHQSxLQUFLLENBQUNVLE9BQU4sQ0FBYyxxQkFBZCxFQUFxQyxFQUFyQyxDQUFSOztBQUVBLFNBQU9ELENBQUMsR0FBR1QsS0FBSyxDQUFDVyxNQUFqQixFQUF5QjtBQUNyQk4sSUFBQUEsSUFBSSxHQUFHWCxRQUFRLENBQUNNLEtBQUssQ0FBQ1ksVUFBTixDQUFpQkgsQ0FBQyxFQUFsQixDQUFELENBQWY7QUFDQUgsSUFBQUEsSUFBSSxHQUFHWixRQUFRLENBQUNNLEtBQUssQ0FBQ1ksVUFBTixDQUFpQkgsQ0FBQyxFQUFsQixDQUFELENBQWY7QUFDQUYsSUFBQUEsSUFBSSxHQUFHYixRQUFRLENBQUNNLEtBQUssQ0FBQ1ksVUFBTixDQUFpQkgsQ0FBQyxFQUFsQixDQUFELENBQWY7QUFDQUQsSUFBQUEsSUFBSSxHQUFHZCxRQUFRLENBQUNNLEtBQUssQ0FBQ1ksVUFBTixDQUFpQkgsQ0FBQyxFQUFsQixDQUFELENBQWY7QUFFQVAsSUFBQUEsSUFBSSxHQUFJRyxJQUFJLElBQUksQ0FBVCxHQUFlQyxJQUFJLElBQUksQ0FBOUI7QUFDQUgsSUFBQUEsSUFBSSxHQUFJLENBQUNHLElBQUksR0FBRyxFQUFSLEtBQWUsQ0FBaEIsR0FBc0JDLElBQUksSUFBSSxDQUFyQztBQUNBSCxJQUFBQSxJQUFJLEdBQUksQ0FBQ0csSUFBSSxHQUFHLENBQVIsS0FBYyxDQUFmLEdBQW9CQyxJQUEzQjtBQUVBUCxJQUFBQSxNQUFNLENBQUNZLElBQVAsQ0FBWUMsTUFBTSxDQUFDQyxZQUFQLENBQW9CYixJQUFwQixDQUFaOztBQUVBLFFBQUlLLElBQUksS0FBSyxFQUFiLEVBQWlCO0FBQ2JOLE1BQUFBLE1BQU0sQ0FBQ1ksSUFBUCxDQUFZQyxNQUFNLENBQUNDLFlBQVAsQ0FBb0JaLElBQXBCLENBQVo7QUFDSDs7QUFDRCxRQUFJSyxJQUFJLEtBQUssRUFBYixFQUFpQjtBQUNiUCxNQUFBQSxNQUFNLENBQUNZLElBQVAsQ0FBWUMsTUFBTSxDQUFDQyxZQUFQLENBQW9CWCxJQUFwQixDQUFaO0FBQ0g7QUFDSjs7QUFFREgsRUFBQUEsTUFBTSxHQUFHQSxNQUFNLENBQUNlLElBQVAsQ0FBWSxFQUFaLENBQVQ7QUFFQSxTQUFPZixNQUFQO0FBQ0gsQ0EvQkQ7QUFpQ0E7Ozs7Ozs7Ozs7Ozs7OztBQWFBTCxNQUFNLENBQUNxQixhQUFQLEdBQXVCLFNBQVNDLG9DQUFULENBQThDbEIsS0FBOUMsRUFBcURtQixLQUFyRCxFQUE0RDtBQUMvRSxNQUFJQyxHQUFHLEdBQUcsS0FBS3RCLE1BQUwsQ0FBWUUsS0FBWixDQUFWO0FBQUEsTUFDSXFCLEVBQUUsR0FBRyxFQURUO0FBQUEsTUFDYVosQ0FEYjtBQUFBLE1BQ2dCYSxDQURoQjtBQUFBLE1BQ21CQyxHQURuQjs7QUFFQSxPQUFLZCxDQUFDLEdBQUcsQ0FBSixFQUFPYyxHQUFHLEdBQUdILEdBQUcsQ0FBQ1QsTUFBSixHQUFhUSxLQUEvQixFQUFzQ1YsQ0FBQyxHQUFHYyxHQUExQyxFQUErQ2QsQ0FBQyxFQUFoRCxFQUFvRDtBQUNoRFksSUFBQUEsRUFBRSxDQUFDWixDQUFELENBQUYsR0FBUSxDQUFSOztBQUNBLFNBQUthLENBQUMsR0FBR0gsS0FBSyxHQUFHLENBQWpCLEVBQW9CRyxDQUFDLElBQUksQ0FBekIsRUFBNEIsRUFBRUEsQ0FBOUIsRUFBaUM7QUFDN0JELE1BQUFBLEVBQUUsQ0FBQ1osQ0FBRCxDQUFGLElBQVNXLEdBQUcsQ0FBQ1IsVUFBSixDQUFnQkgsQ0FBQyxHQUFHVSxLQUFMLEdBQWNHLENBQTdCLEtBQW9DQSxDQUFDLEdBQUcsQ0FBakQ7QUFDSDtBQUNKOztBQUVELFNBQU9ELEVBQVA7QUFDSCxDQVhEOztBQWFBRyxNQUFNLENBQUNDLE9BQVAsR0FBaUI3QixNQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qLS1cbiBDb3B5cmlnaHQgMjAwOS0yMDEwIGJ5IFN0ZWZhbiBSdXN0ZXJob2x6LlxuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gWW91IGNhbiBjaG9vc2UgYmV0d2VlbiBNSVQgYW5kIEJTRC0zLUNsYXVzZSBsaWNlbnNlLiBMaWNlbnNlIGZpbGUgd2lsbCBiZSBhZGRlZCBsYXRlci5cbiAtLSovXG5cbnZhciBtaXNjID0gcmVxdWlyZSgnLi4vY29yZS91dGlscy9taXNjJyk7XG52YXIgc3RyVmFsdWUgPSBtaXNjLkJBU0U2NF9WQUxVRVM7XG5cbi8qKlxuICogbWl4aW4gY2MuQ29kZWMuQmFzZTY0XG4gKi9cbnZhciBCYXNlNjQgPSB7bmFtZTonSmFjb2JfX0NvZGVjX19CYXNlNjQnfTtcblxuLyoqXG4gKiA8cD5cbiAqICAgIGNjLkNvZGVjLkJhc2U2NC5kZWNvZGUoaW5wdXRbLCB1bmljb2RlPWZhbHNlXSkgLT4gU3RyaW5nIChodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCkuXG4gKiA8L3A+XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgYmFzZTY0IGVuY29kZWQgc3RyaW5nIHRvIGRlY29kZVxuICogQHJldHVybiB7U3RyaW5nfSBEZWNvZGVzIGEgYmFzZTY0IGVuY29kZWQgU3RyaW5nXG4gKiBAZXhhbXBsZVxuICogLy9kZWNvZGUgc3RyaW5nXG4gKiBjYy5Db2RlYy5CYXNlNjQuZGVjb2RlKFwiVTI5dFpTQlRkSEpwYm1jPVwiKTsgLy8gPT4gXCJTb21lIFN0cmluZ1wiXG4gKi9cbkJhc2U2NC5kZWNvZGUgPSBmdW5jdGlvbiBKYWNvYl9fQ29kZWNfX0Jhc2U2NF9fZGVjb2RlKGlucHV0KSB7XG4gICAgdmFyIG91dHB1dCA9IFtdLFxuICAgICAgICBjaHIxLCBjaHIyLCBjaHIzLFxuICAgICAgICBlbmMxLCBlbmMyLCBlbmMzLCBlbmM0LFxuICAgICAgICBpID0gMDtcblxuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTlcXCtcXC9cXD1dL2csIFwiXCIpO1xuXG4gICAgd2hpbGUgKGkgPCBpbnB1dC5sZW5ndGgpIHtcbiAgICAgICAgZW5jMSA9IHN0clZhbHVlW2lucHV0LmNoYXJDb2RlQXQoaSsrKV07XG4gICAgICAgIGVuYzIgPSBzdHJWYWx1ZVtpbnB1dC5jaGFyQ29kZUF0KGkrKyldO1xuICAgICAgICBlbmMzID0gc3RyVmFsdWVbaW5wdXQuY2hhckNvZGVBdChpKyspXTtcbiAgICAgICAgZW5jNCA9IHN0clZhbHVlW2lucHV0LmNoYXJDb2RlQXQoaSsrKV07XG5cbiAgICAgICAgY2hyMSA9IChlbmMxIDw8IDIpIHwgKGVuYzIgPj4gNCk7XG4gICAgICAgIGNocjIgPSAoKGVuYzIgJiAxNSkgPDwgNCkgfCAoZW5jMyA+PiAyKTtcbiAgICAgICAgY2hyMyA9ICgoZW5jMyAmIDMpIDw8IDYpIHwgZW5jNDtcblxuICAgICAgICBvdXRwdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjEpKTtcblxuICAgICAgICBpZiAoZW5jMyAhPT0gNjQpIHtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyMikpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbmM0ICE9PSA2NCkge1xuICAgICAgICAgICAgb3V0cHV0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShjaHIzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvdXRwdXQgPSBvdXRwdXQuam9pbignJyk7XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufTtcblxuLyoqXG4gKiA8cD5cbiAqICAgIENvbnZlcnRzIGFuIGlucHV0IHN0cmluZyBlbmNvZGVkIGluIGJhc2U2NCB0byBhbiBhcnJheSBvZiBpbnRlZ2VycyB3aG9zZTxici8+XG4gKiAgICB2YWx1ZXMgcmVwcmVzZW50IHRoZSBkZWNvZGVkIHN0cmluZydzIGNoYXJhY3RlcnMnIGJ5dGVzLlxuICogPC9wPlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFN0cmluZyB0byBjb252ZXJ0IHRvIGFuIGFycmF5IG9mIEludGVnZXJzXG4gKiBAcGFyYW0ge051bWJlcn0gYnl0ZXNcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGV4YW1wbGVcbiAqIC8vZGVjb2RlIHN0cmluZyB0byBhcnJheVxuICogdmFyIGRlY29kZUFyciA9IGNjLkNvZGVjLkJhc2U2NC5kZWNvZGVBc0FycmF5KFwiVTI5dFpTQlRkSEpwYm1jPVwiKTtcbiAqL1xuQmFzZTY0LmRlY29kZUFzQXJyYXkgPSBmdW5jdGlvbiBKYWNvYl9fQ29kZWNfX0Jhc2U2NF9fX2RlY29kZUFzQXJyYXkoaW5wdXQsIGJ5dGVzKSB7XG4gICAgdmFyIGRlYyA9IHRoaXMuZGVjb2RlKGlucHV0KSxcbiAgICAgICAgYXIgPSBbXSwgaSwgaiwgbGVuO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGRlYy5sZW5ndGggLyBieXRlczsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGFyW2ldID0gMDtcbiAgICAgICAgZm9yIChqID0gYnl0ZXMgLSAxOyBqID49IDA7IC0taikge1xuICAgICAgICAgICAgYXJbaV0gKz0gZGVjLmNoYXJDb2RlQXQoKGkgKiBieXRlcykgKyBqKSA8PCAoaiAqIDgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlNjQ7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==