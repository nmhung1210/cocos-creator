
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/index.js';
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
require('./CCComponent');

require('./CCComponentEventHandler');

require('./missing-script'); // In case subContextView modules are excluded


var SubContextView = require('./SubContextView');

if (!SubContextView) {
  SubContextView = cc.Class({
    name: 'cc.SubContextView',
    "extends": cc.Component
  });
  cc.SubContextView = cc.WXSubContextView = cc.SwanSubContextView = SubContextView;
}

var components = [require('./CCSprite'), require('./CCWidget'), require('./CCCanvas'), require('./CCAudioSource'), require('./CCAnimation'), require('./CCButton'), require('./CCLabel'), require('./CCProgressBar'), require('./CCMask'), require('./CCScrollBar'), require('./CCScrollView'), require('./CCPageViewIndicator'), require('./CCPageView'), require('./CCSlider'), require('./CCLayout'), require('./editbox/CCEditBox'), require('./CCLabelOutline'), require('./CCLabelShadow'), require('./CCRichText'), require('./CCToggleContainer'), require('./CCToggleGroup'), require('./CCToggle'), require('./CCBlockInputEvents'), require('./CCMotionStreak'), require('./CCSafeArea'), SubContextView];
module.exports = components;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvaW5kZXguanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIlN1YkNvbnRleHRWaWV3IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJXWFN1YkNvbnRleHRWaWV3IiwiU3dhblN1YkNvbnRleHRWaWV3IiwiY29tcG9uZW50cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQUEsT0FBTyxDQUFDLGVBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLDJCQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxrQkFBRCxDQUFQLEVBRUE7OztBQUNBLElBQUlDLGNBQWMsR0FBR0QsT0FBTyxDQUFDLGtCQUFELENBQTVCOztBQUNBLElBQUksQ0FBQ0MsY0FBTCxFQUFxQjtBQUNqQkEsRUFBQUEsY0FBYyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUN0QkMsSUFBQUEsSUFBSSxFQUFFLG1CQURnQjtBQUV0QixlQUFTRixFQUFFLENBQUNHO0FBRlUsR0FBVCxDQUFqQjtBQUlBSCxFQUFBQSxFQUFFLENBQUNELGNBQUgsR0FBb0JDLEVBQUUsQ0FBQ0ksZ0JBQUgsR0FBc0JKLEVBQUUsQ0FBQ0ssa0JBQUgsR0FBd0JOLGNBQWxFO0FBQ0g7O0FBRUQsSUFBSU8sVUFBVSxHQUFHLENBQ2JSLE9BQU8sQ0FBQyxZQUFELENBRE0sRUFFYkEsT0FBTyxDQUFDLFlBQUQsQ0FGTSxFQUdiQSxPQUFPLENBQUMsWUFBRCxDQUhNLEVBSWJBLE9BQU8sQ0FBQyxpQkFBRCxDQUpNLEVBS2JBLE9BQU8sQ0FBQyxlQUFELENBTE0sRUFNYkEsT0FBTyxDQUFDLFlBQUQsQ0FOTSxFQU9iQSxPQUFPLENBQUMsV0FBRCxDQVBNLEVBUWJBLE9BQU8sQ0FBQyxpQkFBRCxDQVJNLEVBU2JBLE9BQU8sQ0FBQyxVQUFELENBVE0sRUFVYkEsT0FBTyxDQUFDLGVBQUQsQ0FWTSxFQVdiQSxPQUFPLENBQUMsZ0JBQUQsQ0FYTSxFQVliQSxPQUFPLENBQUMsdUJBQUQsQ0FaTSxFQWFiQSxPQUFPLENBQUMsY0FBRCxDQWJNLEVBY2JBLE9BQU8sQ0FBQyxZQUFELENBZE0sRUFlYkEsT0FBTyxDQUFDLFlBQUQsQ0FmTSxFQWdCYkEsT0FBTyxDQUFDLHFCQUFELENBaEJNLEVBaUJiQSxPQUFPLENBQUMsa0JBQUQsQ0FqQk0sRUFrQmJBLE9BQU8sQ0FBQyxpQkFBRCxDQWxCTSxFQW1CYkEsT0FBTyxDQUFDLGNBQUQsQ0FuQk0sRUFvQmJBLE9BQU8sQ0FBQyxxQkFBRCxDQXBCTSxFQXFCYkEsT0FBTyxDQUFDLGlCQUFELENBckJNLEVBc0JiQSxPQUFPLENBQUMsWUFBRCxDQXRCTSxFQXVCYkEsT0FBTyxDQUFDLHNCQUFELENBdkJNLEVBd0JiQSxPQUFPLENBQUMsa0JBQUQsQ0F4Qk0sRUF5QmJBLE9BQU8sQ0FBQyxjQUFELENBekJNLEVBMEJiQyxjQTFCYSxDQUFqQjtBQTZCQVEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCRixVQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxucmVxdWlyZSgnLi9DQ0NvbXBvbmVudCcpO1xucmVxdWlyZSgnLi9DQ0NvbXBvbmVudEV2ZW50SGFuZGxlcicpO1xucmVxdWlyZSgnLi9taXNzaW5nLXNjcmlwdCcpO1xuXG4vLyBJbiBjYXNlIHN1YkNvbnRleHRWaWV3IG1vZHVsZXMgYXJlIGV4Y2x1ZGVkXG5sZXQgU3ViQ29udGV4dFZpZXcgPSByZXF1aXJlKCcuL1N1YkNvbnRleHRWaWV3Jyk7XG5pZiAoIVN1YkNvbnRleHRWaWV3KSB7XG4gICAgU3ViQ29udGV4dFZpZXcgPSBjYy5DbGFzcyh7XG4gICAgICAgIG5hbWU6ICdjYy5TdWJDb250ZXh0VmlldycsXG4gICAgICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcbiAgICB9KTtcbiAgICBjYy5TdWJDb250ZXh0VmlldyA9IGNjLldYU3ViQ29udGV4dFZpZXcgPSBjYy5Td2FuU3ViQ29udGV4dFZpZXcgPSBTdWJDb250ZXh0Vmlldztcbn1cblxudmFyIGNvbXBvbmVudHMgPSBbXG4gICAgcmVxdWlyZSgnLi9DQ1Nwcml0ZScpLFxuICAgIHJlcXVpcmUoJy4vQ0NXaWRnZXQnKSxcbiAgICByZXF1aXJlKCcuL0NDQ2FudmFzJyksXG4gICAgcmVxdWlyZSgnLi9DQ0F1ZGlvU291cmNlJyksXG4gICAgcmVxdWlyZSgnLi9DQ0FuaW1hdGlvbicpLFxuICAgIHJlcXVpcmUoJy4vQ0NCdXR0b24nKSxcbiAgICByZXF1aXJlKCcuL0NDTGFiZWwnKSxcbiAgICByZXF1aXJlKCcuL0NDUHJvZ3Jlc3NCYXInKSxcbiAgICByZXF1aXJlKCcuL0NDTWFzaycpLFxuICAgIHJlcXVpcmUoJy4vQ0NTY3JvbGxCYXInKSxcbiAgICByZXF1aXJlKCcuL0NDU2Nyb2xsVmlldycpLFxuICAgIHJlcXVpcmUoJy4vQ0NQYWdlVmlld0luZGljYXRvcicpLFxuICAgIHJlcXVpcmUoJy4vQ0NQYWdlVmlldycpLFxuICAgIHJlcXVpcmUoJy4vQ0NTbGlkZXInKSxcbiAgICByZXF1aXJlKCcuL0NDTGF5b3V0JyksXG4gICAgcmVxdWlyZSgnLi9lZGl0Ym94L0NDRWRpdEJveCcpLFxuICAgIHJlcXVpcmUoJy4vQ0NMYWJlbE91dGxpbmUnKSxcbiAgICByZXF1aXJlKCcuL0NDTGFiZWxTaGFkb3cnKSxcbiAgICByZXF1aXJlKCcuL0NDUmljaFRleHQnKSxcbiAgICByZXF1aXJlKCcuL0NDVG9nZ2xlQ29udGFpbmVyJyksXG4gICAgcmVxdWlyZSgnLi9DQ1RvZ2dsZUdyb3VwJyksXG4gICAgcmVxdWlyZSgnLi9DQ1RvZ2dsZScpLFxuICAgIHJlcXVpcmUoJy4vQ0NCbG9ja0lucHV0RXZlbnRzJyksXG4gICAgcmVxdWlyZSgnLi9DQ01vdGlvblN0cmVhaycpLFxuICAgIHJlcXVpcmUoJy4vQ0NTYWZlQXJlYScpLFxuICAgIFN1YkNvbnRleHRWaWV3LFxuXTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb21wb25lbnRzOyJdLCJzb3VyY2VSb290IjoiLyJ9