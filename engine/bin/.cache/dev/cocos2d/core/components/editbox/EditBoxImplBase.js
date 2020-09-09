
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/editbox/EditBoxImplBase.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2012 James Chen
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
var EditBoxImplBase = cc.Class({
  ctor: function ctor() {
    this._delegate = null;
    this._editing = false;
  },
  init: function init(delegate) {},
  enable: function enable() {},
  disable: function disable() {
    if (this._editing) {
      this.endEditing();
    }
  },
  clear: function clear() {},
  update: function update() {},
  setTabIndex: function setTabIndex(index) {},
  setSize: function setSize(width, height) {},
  setFocus: function setFocus(value) {
    if (value) {
      this.beginEditing();
    } else {
      this.endEditing();
    }
  },
  isFocused: function isFocused() {
    return this._editing;
  },
  beginEditing: function beginEditing() {},
  endEditing: function endEditing() {}
});
module.exports = EditBoxImplBase;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvZWRpdGJveC9FZGl0Qm94SW1wbEJhc2UuanMiXSwibmFtZXMiOlsiRWRpdEJveEltcGxCYXNlIiwiY2MiLCJDbGFzcyIsImN0b3IiLCJfZGVsZWdhdGUiLCJfZWRpdGluZyIsImluaXQiLCJkZWxlZ2F0ZSIsImVuYWJsZSIsImRpc2FibGUiLCJlbmRFZGl0aW5nIiwiY2xlYXIiLCJ1cGRhdGUiLCJzZXRUYWJJbmRleCIsImluZGV4Iiwic2V0U2l6ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2V0Rm9jdXMiLCJ2YWx1ZSIsImJlZ2luRWRpdGluZyIsImlzRm9jdXNlZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLElBQUlBLGVBQWUsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDM0JDLEVBQUFBLElBRDJCLGtCQUNuQjtBQUNKLFNBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0gsR0FKMEI7QUFNM0JDLEVBQUFBLElBTjJCLGdCQU1yQkMsUUFOcUIsRUFNWCxDQUVmLENBUjBCO0FBVTNCQyxFQUFBQSxNQVYyQixvQkFVakIsQ0FFVCxDQVowQjtBQWMzQkMsRUFBQUEsT0FkMkIscUJBY2hCO0FBQ1AsUUFBSSxLQUFLSixRQUFULEVBQW1CO0FBQ2YsV0FBS0ssVUFBTDtBQUNIO0FBQ0osR0FsQjBCO0FBb0IzQkMsRUFBQUEsS0FwQjJCLG1CQW9CbEIsQ0FFUixDQXRCMEI7QUF3QjNCQyxFQUFBQSxNQXhCMkIsb0JBd0JqQixDQUVULENBMUIwQjtBQTRCM0JDLEVBQUFBLFdBNUIyQix1QkE0QmRDLEtBNUJjLEVBNEJQLENBRW5CLENBOUIwQjtBQWdDM0JDLEVBQUFBLE9BaEMyQixtQkFnQ2xCQyxLQWhDa0IsRUFnQ1hDLE1BaENXLEVBZ0NILENBRXZCLENBbEMwQjtBQW9DM0JDLEVBQUFBLFFBcEMyQixvQkFvQ2pCQyxLQXBDaUIsRUFvQ1Y7QUFDYixRQUFJQSxLQUFKLEVBQVc7QUFDUCxXQUFLQyxZQUFMO0FBQ0gsS0FGRCxNQUdLO0FBQ0QsV0FBS1YsVUFBTDtBQUNIO0FBQ0osR0EzQzBCO0FBNkMzQlcsRUFBQUEsU0E3QzJCLHVCQTZDZDtBQUNULFdBQU8sS0FBS2hCLFFBQVo7QUFDSCxHQS9DMEI7QUFpRDNCZSxFQUFBQSxZQWpEMkIsMEJBaURYLENBRWYsQ0FuRDBCO0FBcUQzQlYsRUFBQUEsVUFyRDJCLHdCQXFEYixDQUViO0FBdkQwQixDQUFULENBQXRCO0FBMERBWSxNQUFNLENBQUNDLE9BQVAsR0FBaUJ2QixlQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDExLTIwMTIgY29jb3MyZC14Lm9yZ1xuIENvcHlyaWdodCAoYykgMjAxMiBKYW1lcyBDaGVuXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5sZXQgRWRpdEJveEltcGxCYXNlID0gY2MuQ2xhc3Moe1xuICAgIGN0b3IgKCkge1xuICAgICAgICB0aGlzLl9kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2VkaXRpbmcgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgaW5pdCAoZGVsZWdhdGUpIHtcblxuICAgIH0sXG5cbiAgICBlbmFibGUgKCkge1xuICAgICAgICBcbiAgICB9LFxuXG4gICAgZGlzYWJsZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9lZGl0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmVuZEVkaXRpbmcoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICB1cGRhdGUgKCkge1xuICAgICAgICBcbiAgICB9LFxuXG4gICAgc2V0VGFiSW5kZXggKGluZGV4KSB7XG5cbiAgICB9LFxuXG4gICAgc2V0U2l6ZSAod2lkdGgsIGhlaWdodCkge1xuXG4gICAgfSxcblxuICAgIHNldEZvY3VzICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuYmVnaW5FZGl0aW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVuZEVkaXRpbmcoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpc0ZvY3VzZWQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdGluZztcbiAgICB9LFxuXG4gICAgYmVnaW5FZGl0aW5nICgpIHtcblxuICAgIH0sXG4gICAgXG4gICAgZW5kRWRpdGluZyAoKSB7XG5cbiAgICB9LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdEJveEltcGxCYXNlO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=