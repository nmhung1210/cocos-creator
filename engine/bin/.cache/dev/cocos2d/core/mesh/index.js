
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/mesh/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

require('./CCMesh');

if (!CC_EDITOR || !Editor.isMainProcess) {
  require('./CCMeshRenderer');

  require('./mesh-renderer');
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL21lc2gvaW5kZXguanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIkNDX0VESVRPUiIsIkVkaXRvciIsImlzTWFpblByb2Nlc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQUEsT0FBTyxDQUFDLFVBQUQsQ0FBUDs7QUFDQSxJQUFJLENBQUNDLFNBQUQsSUFBYyxDQUFDQyxNQUFNLENBQUNDLGFBQTFCLEVBQXlDO0FBQ3JDSCxFQUFBQSxPQUFPLENBQUMsa0JBQUQsQ0FBUDs7QUFDQUEsRUFBQUEsT0FBTyxDQUFDLGlCQUFELENBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4vQ0NNZXNoJyk7XG5pZiAoIUNDX0VESVRPUiB8fCAhRWRpdG9yLmlzTWFpblByb2Nlc3MpIHtcbiAgICByZXF1aXJlKCcuL0NDTWVzaFJlbmRlcmVyJyk7XG4gICAgcmVxdWlyZSgnLi9tZXNoLXJlbmRlcmVyJyk7XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==