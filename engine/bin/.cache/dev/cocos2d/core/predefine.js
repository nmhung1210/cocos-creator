
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/predefine.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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
// predefine some modules for cocos
require('./platform/js');

require('./value-types');

require('./utils');

require('./platform/CCInputManager');

require('./platform/CCInputExtension');

require('./event');

require('./platform/CCSys');

require('./platform/CCMacro');

require('./asset-manager');

require('./CCDirector');

require('./renderer');

if (!(CC_EDITOR && Editor.isMainProcess)) {
  require('./platform/CCView');

  require('./platform/CCScreen');

  require('./CCScheduler');

  require('./event-manager');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3ByZWRlZmluZS5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiQ0NfRURJVE9SIiwiRWRpdG9yIiwiaXNNYWluUHJvY2VzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBO0FBQ0FBLE9BQU8sQ0FBQyxlQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxlQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxTQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQywyQkFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsNkJBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLFNBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLGtCQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxvQkFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsaUJBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLGNBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLFlBQUQsQ0FBUDs7QUFFQSxJQUFJLEVBQUVDLFNBQVMsSUFBSUMsTUFBTSxDQUFDQyxhQUF0QixDQUFKLEVBQTBDO0FBQ3RDSCxFQUFBQSxPQUFPLENBQUMsbUJBQUQsQ0FBUDs7QUFDQUEsRUFBQUEsT0FBTyxDQUFDLHFCQUFELENBQVA7O0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQyxlQUFELENBQVA7O0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQyxpQkFBRCxDQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8vIHByZWRlZmluZSBzb21lIG1vZHVsZXMgZm9yIGNvY29zXG5yZXF1aXJlKCcuL3BsYXRmb3JtL2pzJyk7XG5yZXF1aXJlKCcuL3ZhbHVlLXR5cGVzJyk7XG5yZXF1aXJlKCcuL3V0aWxzJyk7XG5yZXF1aXJlKCcuL3BsYXRmb3JtL0NDSW5wdXRNYW5hZ2VyJyk7XG5yZXF1aXJlKCcuL3BsYXRmb3JtL0NDSW5wdXRFeHRlbnNpb24nKTtcbnJlcXVpcmUoJy4vZXZlbnQnKTtcbnJlcXVpcmUoJy4vcGxhdGZvcm0vQ0NTeXMnKTtcbnJlcXVpcmUoJy4vcGxhdGZvcm0vQ0NNYWNybycpO1xucmVxdWlyZSgnLi9hc3NldC1tYW5hZ2VyJyk7XG5yZXF1aXJlKCcuL0NDRGlyZWN0b3InKTtcbnJlcXVpcmUoJy4vcmVuZGVyZXInKTtcblxuaWYgKCEoQ0NfRURJVE9SICYmIEVkaXRvci5pc01haW5Qcm9jZXNzKSkge1xuICAgIHJlcXVpcmUoJy4vcGxhdGZvcm0vQ0NWaWV3Jyk7XG4gICAgcmVxdWlyZSgnLi9wbGF0Zm9ybS9DQ1NjcmVlbicpO1xuICAgIHJlcXVpcmUoJy4vQ0NTY2hlZHVsZXInKTtcbiAgICByZXF1aXJlKCcuL2V2ZW50LW1hbmFnZXInKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9