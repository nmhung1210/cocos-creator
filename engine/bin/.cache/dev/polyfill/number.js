
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/polyfill/number.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

Number.parseFloat = Number.parseFloat || parseFloat;
Number.parseInt = Number.parseInt || parseInt;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvcG9seWZpbGwvbnVtYmVyLmpzIl0sIm5hbWVzIjpbIk51bWJlciIsInBhcnNlRmxvYXQiLCJwYXJzZUludCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBQSxNQUFNLENBQUNDLFVBQVAsR0FBb0JELE1BQU0sQ0FBQ0MsVUFBUCxJQUFxQkEsVUFBekM7QUFDQUQsTUFBTSxDQUFDRSxRQUFQLEdBQWtCRixNQUFNLENBQUNFLFFBQVAsSUFBbUJBLFFBQXJDIiwic291cmNlc0NvbnRlbnQiOlsiXG5OdW1iZXIucGFyc2VGbG9hdCA9IE51bWJlci5wYXJzZUZsb2F0IHx8IHBhcnNlRmxvYXQ7XG5OdW1iZXIucGFyc2VJbnQgPSBOdW1iZXIucGFyc2VJbnQgfHwgcGFyc2VJbnQ7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==