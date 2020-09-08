
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

if (!CC_TEST && (!CC_EDITOR || !Editor.isMainProcess)) {
  require('./primitive');

  require('./physics/exports/physics-builtin');

  require('./physics/exports/physics-cannon');

  require('./physics/exports/physics-framework');
}

require('./CCModel');

require('./skeleton/CCSkeleton');

require('./skeleton/CCSkeletonAnimationClip');

require('./actions');

require('./physics/framework/assets/physics-material');

if (!CC_EDITOR || !Editor.isMainProcess) {
  require('./skeleton/CCSkeletonAnimation');

  require('./skeleton/CCSkinnedMeshRenderer');

  require('./skeleton/skinned-mesh-renderer');

  require('./CCLightComponent');

  require('./particle/particle-system-3d');

  require('./particle/renderer/particle-system-3d-renderer');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL2luZGV4LmpzIl0sIm5hbWVzIjpbIkNDX1RFU1QiLCJDQ19FRElUT1IiLCJFZGl0b3IiLCJpc01haW5Qcm9jZXNzIiwicmVxdWlyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBLElBQUksQ0FBQ0EsT0FBRCxLQUFhLENBQUNDLFNBQUQsSUFBYyxDQUFDQyxNQUFNLENBQUNDLGFBQW5DLENBQUosRUFBdUQ7QUFDbkRDLEVBQUFBLE9BQU8sQ0FBQyxhQUFELENBQVA7O0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQyxtQ0FBRCxDQUFQOztBQUNBQSxFQUFBQSxPQUFPLENBQUMsa0NBQUQsQ0FBUDs7QUFDQUEsRUFBQUEsT0FBTyxDQUFDLHFDQUFELENBQVA7QUFDSDs7QUFFREEsT0FBTyxDQUFDLFdBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLHVCQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxvQ0FBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsV0FBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsNkNBQUQsQ0FBUDs7QUFFQSxJQUFJLENBQUNILFNBQUQsSUFBYyxDQUFDQyxNQUFNLENBQUNDLGFBQTFCLEVBQXlDO0FBQ3JDQyxFQUFBQSxPQUFPLENBQUMsZ0NBQUQsQ0FBUDs7QUFDQUEsRUFBQUEsT0FBTyxDQUFDLGtDQUFELENBQVA7O0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQyxrQ0FBRCxDQUFQOztBQUNBQSxFQUFBQSxPQUFPLENBQUMsb0JBQUQsQ0FBUDs7QUFDQUEsRUFBQUEsT0FBTyxDQUFDLCtCQUFELENBQVA7O0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQyxpREFBRCxDQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJcbmlmICghQ0NfVEVTVCAmJiAoIUNDX0VESVRPUiB8fCAhRWRpdG9yLmlzTWFpblByb2Nlc3MpKSB7XG4gICAgcmVxdWlyZSgnLi9wcmltaXRpdmUnKTtcbiAgICByZXF1aXJlKCcuL3BoeXNpY3MvZXhwb3J0cy9waHlzaWNzLWJ1aWx0aW4nKTtcbiAgICByZXF1aXJlKCcuL3BoeXNpY3MvZXhwb3J0cy9waHlzaWNzLWNhbm5vbicpO1xuICAgIHJlcXVpcmUoJy4vcGh5c2ljcy9leHBvcnRzL3BoeXNpY3MtZnJhbWV3b3JrJyk7XG59XG5cbnJlcXVpcmUoJy4vQ0NNb2RlbCcpO1xucmVxdWlyZSgnLi9za2VsZXRvbi9DQ1NrZWxldG9uJyk7XG5yZXF1aXJlKCcuL3NrZWxldG9uL0NDU2tlbGV0b25BbmltYXRpb25DbGlwJyk7XG5yZXF1aXJlKCcuL2FjdGlvbnMnKTtcbnJlcXVpcmUoJy4vcGh5c2ljcy9mcmFtZXdvcmsvYXNzZXRzL3BoeXNpY3MtbWF0ZXJpYWwnKTtcblxuaWYgKCFDQ19FRElUT1IgfHwgIUVkaXRvci5pc01haW5Qcm9jZXNzKSB7XG4gICAgcmVxdWlyZSgnLi9za2VsZXRvbi9DQ1NrZWxldG9uQW5pbWF0aW9uJyk7XG4gICAgcmVxdWlyZSgnLi9za2VsZXRvbi9DQ1NraW5uZWRNZXNoUmVuZGVyZXInKTtcbiAgICByZXF1aXJlKCcuL3NrZWxldG9uL3NraW5uZWQtbWVzaC1yZW5kZXJlcicpO1xuICAgIHJlcXVpcmUoJy4vQ0NMaWdodENvbXBvbmVudCcpO1xuICAgIHJlcXVpcmUoJy4vcGFydGljbGUvcGFydGljbGUtc3lzdGVtLTNkJyk7XG4gICAgcmVxdWlyZSgnLi9wYXJ0aWNsZS9yZW5kZXJlci9wYXJ0aWNsZS1zeXN0ZW0tM2QtcmVuZGVyZXInKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9