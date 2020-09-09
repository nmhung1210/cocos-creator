
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/missing-script.js';
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
var js = cc.js;
/*
 * A temp fallback to contain the original serialized data which can not be loaded.
 * Deserialized as a component by default.
 */

var MissingScript = cc.Class({
  name: 'cc.MissingScript',
  "extends": cc.Component,
  editor: {
    inspector: 'packages://inspector/inspectors/comps/missing-script.js'
  },
  properties: {
    //_scriptUuid: {
    //    get: function () {
    //        var id = this._$erialized.__type__;
    //        if (Editor.Utils.UuidUtils.isUuid(id)) {
    //            return Editor.Utils.UuidUtils.decompressUuid(id);
    //        }
    //        return '';
    //    },
    //    set: function (value) {
    //        if ( !sandbox.compiled ) {
    //            cc.error('Scripts not yet compiled, please fix script errors and compile first.');
    //            return;
    //        }
    //        if (value && Editor.Utils.UuidUtils.isUuid(value._uuid)) {
    //            var classId = Editor.Utils.UuidUtils.compressUuid(value);
    //            if (cc.js._getClassById(classId)) {
    //                this._$erialized.__type__ = classId;
    //                Editor.Ipc.sendToWins('reload:window-scripts', sandbox.compiled);
    //            }
    //            else {
    //                cc.error('Can not find a component in the script which uuid is "%s".', value);
    //            }
    //        }
    //        else {
    //            cc.error('invalid script');
    //        }
    //    }
    //},
    compiled: {
      "default": false,
      serializable: false
    },
    // the serialized data for original script object
    _$erialized: {
      "default": null,
      visible: false,
      editorOnly: true
    }
  },
  ctor: CC_EDITOR && function () {
    this.compiled = _Scene.Sandbox.compiled;
  },
  statics: {
    /*
     * @param {string} id
     * @return {function} constructor
     */
    safeFindClass: function safeFindClass(id) {
      var cls = js._getClassById(id);

      if (cls) {
        return cls;
      }

      cc.deserialize.reportMissingClass(id);
      return MissingScript;
    }
  },
  onLoad: function onLoad() {
    cc.warnID(4600, this.node.name);
  }
});
cc._MissingScript = module.exports = MissingScript;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvbWlzc2luZy1zY3JpcHQuanMiXSwibmFtZXMiOlsianMiLCJjYyIsIk1pc3NpbmdTY3JpcHQiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJlZGl0b3IiLCJpbnNwZWN0b3IiLCJwcm9wZXJ0aWVzIiwiY29tcGlsZWQiLCJzZXJpYWxpemFibGUiLCJfJGVyaWFsaXplZCIsInZpc2libGUiLCJlZGl0b3JPbmx5IiwiY3RvciIsIkNDX0VESVRPUiIsIl9TY2VuZSIsIlNhbmRib3giLCJzdGF0aWNzIiwic2FmZUZpbmRDbGFzcyIsImlkIiwiY2xzIiwiX2dldENsYXNzQnlJZCIsImRlc2VyaWFsaXplIiwicmVwb3J0TWlzc2luZ0NsYXNzIiwib25Mb2FkIiwid2FybklEIiwibm9kZSIsIl9NaXNzaW5nU2NyaXB0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLEVBQUUsR0FBR0MsRUFBRSxDQUFDRCxFQUFaO0FBRUE7Ozs7O0FBSUEsSUFBSUUsYUFBYSxHQUFHRCxFQUFFLENBQUNFLEtBQUgsQ0FBUztBQUN6QkMsRUFBQUEsSUFBSSxFQUFFLGtCQURtQjtBQUV6QixhQUFTSCxFQUFFLENBQUNJLFNBRmE7QUFHekJDLEVBQUFBLE1BQU0sRUFBRTtBQUNKQyxJQUFBQSxTQUFTLEVBQUU7QUFEUCxHQUhpQjtBQU16QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsUUFBUSxFQUFFO0FBQ04saUJBQVMsS0FESDtBQUVOQyxNQUFBQSxZQUFZLEVBQUU7QUFGUixLQTdCRjtBQWlDUjtBQUNBQyxJQUFBQSxXQUFXLEVBQUU7QUFDVCxpQkFBUyxJQURBO0FBRVRDLE1BQUFBLE9BQU8sRUFBRSxLQUZBO0FBR1RDLE1BQUFBLFVBQVUsRUFBRTtBQUhIO0FBbENMLEdBTmE7QUE4Q3pCQyxFQUFBQSxJQUFJLEVBQUVDLFNBQVMsSUFBSSxZQUFZO0FBQzNCLFNBQUtOLFFBQUwsR0FBZ0JPLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlUixRQUEvQjtBQUNILEdBaER3QjtBQWlEekJTLEVBQUFBLE9BQU8sRUFBRTtBQUNMOzs7O0FBSUFDLElBQUFBLGFBQWEsRUFBRSx1QkFBVUMsRUFBVixFQUFjO0FBQ3pCLFVBQUlDLEdBQUcsR0FBR3JCLEVBQUUsQ0FBQ3NCLGFBQUgsQ0FBaUJGLEVBQWpCLENBQVY7O0FBQ0EsVUFBSUMsR0FBSixFQUFTO0FBQ0wsZUFBT0EsR0FBUDtBQUNIOztBQUNEcEIsTUFBQUEsRUFBRSxDQUFDc0IsV0FBSCxDQUFlQyxrQkFBZixDQUFrQ0osRUFBbEM7QUFDQSxhQUFPbEIsYUFBUDtBQUNIO0FBWkksR0FqRGdCO0FBK0R6QnVCLEVBQUFBLE1BQU0sRUFBRSxrQkFBWTtBQUNoQnhCLElBQUFBLEVBQUUsQ0FBQ3lCLE1BQUgsQ0FBVSxJQUFWLEVBQWdCLEtBQUtDLElBQUwsQ0FBVXZCLElBQTFCO0FBQ0g7QUFqRXdCLENBQVQsQ0FBcEI7QUFvRUFILEVBQUUsQ0FBQzJCLGNBQUgsR0FBb0JDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjVCLGFBQXJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIganMgPSBjYy5qcztcblxuLypcbiAqIEEgdGVtcCBmYWxsYmFjayB0byBjb250YWluIHRoZSBvcmlnaW5hbCBzZXJpYWxpemVkIGRhdGEgd2hpY2ggY2FuIG5vdCBiZSBsb2FkZWQuXG4gKiBEZXNlcmlhbGl6ZWQgYXMgYSBjb21wb25lbnQgYnkgZGVmYXVsdC5cbiAqL1xudmFyIE1pc3NpbmdTY3JpcHQgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLk1pc3NpbmdTY3JpcHQnLCBcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG4gICAgZWRpdG9yOiB7XG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvbWlzc2luZy1zY3JpcHQuanMnLFxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvL19zY3JpcHRVdWlkOiB7XG4gICAgICAgIC8vICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgICAgICAgdmFyIGlkID0gdGhpcy5fJGVyaWFsaXplZC5fX3R5cGVfXztcbiAgICAgICAgLy8gICAgICAgIGlmIChFZGl0b3IuVXRpbHMuVXVpZFV0aWxzLmlzVXVpZChpZCkpIHtcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gRWRpdG9yLlV0aWxzLlV1aWRVdGlscy5kZWNvbXByZXNzVXVpZChpZCk7XG4gICAgICAgIC8vICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIC8vICAgIH0sXG4gICAgICAgIC8vICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICBpZiAoICFzYW5kYm94LmNvbXBpbGVkICkge1xuICAgICAgICAvLyAgICAgICAgICAgIGNjLmVycm9yKCdTY3JpcHRzIG5vdCB5ZXQgY29tcGlsZWQsIHBsZWFzZSBmaXggc2NyaXB0IGVycm9ycyBhbmQgY29tcGlsZSBmaXJzdC4nKTtcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICBpZiAodmFsdWUgJiYgRWRpdG9yLlV0aWxzLlV1aWRVdGlscy5pc1V1aWQodmFsdWUuX3V1aWQpKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgdmFyIGNsYXNzSWQgPSBFZGl0b3IuVXRpbHMuVXVpZFV0aWxzLmNvbXByZXNzVXVpZCh2YWx1ZSk7XG4gICAgICAgIC8vICAgICAgICAgICAgaWYgKGNjLmpzLl9nZXRDbGFzc0J5SWQoY2xhc3NJZCkpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhpcy5fJGVyaWFsaXplZC5fX3R5cGVfXyA9IGNsYXNzSWQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIEVkaXRvci5JcGMuc2VuZFRvV2lucygncmVsb2FkOndpbmRvdy1zY3JpcHRzJywgc2FuZGJveC5jb21waWxlZCk7XG4gICAgICAgIC8vICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICBjYy5lcnJvcignQ2FuIG5vdCBmaW5kIGEgY29tcG9uZW50IGluIHRoZSBzY3JpcHQgd2hpY2ggdXVpZCBpcyBcIiVzXCIuJywgdmFsdWUpO1xuICAgICAgICAvLyAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgIGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgICAgIGNjLmVycm9yKCdpbnZhbGlkIHNjcmlwdCcpO1xuICAgICAgICAvLyAgICAgICAgfVxuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vfSxcbiAgICAgICAgY29tcGlsZWQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICAvLyB0aGUgc2VyaWFsaXplZCBkYXRhIGZvciBvcmlnaW5hbCBzY3JpcHQgb2JqZWN0XG4gICAgICAgIF8kZXJpYWxpemVkOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlZGl0b3JPbmx5OiB0cnVlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGN0b3I6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29tcGlsZWQgPSBfU2NlbmUuU2FuZGJveC5jb21waWxlZDtcbiAgICB9LFxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgLypcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgc2FmZUZpbmRDbGFzczogZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICB2YXIgY2xzID0ganMuX2dldENsYXNzQnlJZChpZCk7XG4gICAgICAgICAgICBpZiAoY2xzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNscztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNjLmRlc2VyaWFsaXplLnJlcG9ydE1pc3NpbmdDbGFzcyhpZCk7XG4gICAgICAgICAgICByZXR1cm4gTWlzc2luZ1NjcmlwdDtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy53YXJuSUQoNDYwMCwgdGhpcy5ub2RlLm5hbWUpO1xuICAgIH1cbn0pO1xuXG5jYy5fTWlzc2luZ1NjcmlwdCA9IG1vZHVsZS5leHBvcnRzID0gTWlzc2luZ1NjcmlwdDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9