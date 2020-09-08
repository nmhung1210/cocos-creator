
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

var BUILTIN_CLASSID_RE = require('../utils/misc').BUILTIN_CLASSID_RE;
/*
 * A temp fallback to contain the original serialized data which can not be loaded.
 */


var MissingClass = cc.Class({
  name: 'cc.MissingClass',
  properties: {
    // the serialized data for original object
    _$erialized: {
      "default": null,
      visible: false,
      editorOnly: true
    }
  }
});
/*
 * A temp fallback to contain the original component which can not be loaded.
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
    safeFindClass: function safeFindClass(id, data) {
      var cls = js._getClassById(id);

      if (cls) {
        return cls;
      }

      if (id) {
        cc.deserialize.reportMissingClass(id);
        return MissingScript.getMissingWrapper(id, data);
      }

      return null;
    },
    getMissingWrapper: function getMissingWrapper(id, data) {
      if (data.node && (/^[0-9a-zA-Z+/]{23}$/.test(id) || BUILTIN_CLASSID_RE.test(id))) {
        // is component
        return MissingScript;
      } else {
        return MissingClass;
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvbWlzc2luZy1zY3JpcHQuanMiXSwibmFtZXMiOlsianMiLCJjYyIsIkJVSUxUSU5fQ0xBU1NJRF9SRSIsInJlcXVpcmUiLCJNaXNzaW5nQ2xhc3MiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiXyRlcmlhbGl6ZWQiLCJ2aXNpYmxlIiwiZWRpdG9yT25seSIsIk1pc3NpbmdTY3JpcHQiLCJDb21wb25lbnQiLCJlZGl0b3IiLCJpbnNwZWN0b3IiLCJjb21waWxlZCIsInNlcmlhbGl6YWJsZSIsImN0b3IiLCJDQ19FRElUT1IiLCJfU2NlbmUiLCJTYW5kYm94Iiwic3RhdGljcyIsInNhZmVGaW5kQ2xhc3MiLCJpZCIsImRhdGEiLCJjbHMiLCJfZ2V0Q2xhc3NCeUlkIiwiZGVzZXJpYWxpemUiLCJyZXBvcnRNaXNzaW5nQ2xhc3MiLCJnZXRNaXNzaW5nV3JhcHBlciIsIm5vZGUiLCJ0ZXN0Iiwib25Mb2FkIiwid2FybklEIiwiX01pc3NpbmdTY3JpcHQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBSUEsRUFBRSxHQUFHQyxFQUFFLENBQUNELEVBQVo7O0FBQ0EsSUFBSUUsa0JBQWtCLEdBQUdDLE9BQU8sQ0FBQyxlQUFELENBQVAsQ0FBeUJELGtCQUFsRDtBQUVBOzs7OztBQUdBLElBQUlFLFlBQVksR0FBR0gsRUFBRSxDQUFDSSxLQUFILENBQVM7QUFDeEJDLEVBQUFBLElBQUksRUFBRSxpQkFEa0I7QUFFeEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0FDLElBQUFBLFdBQVcsRUFBRTtBQUNULGlCQUFTLElBREE7QUFFVEMsTUFBQUEsT0FBTyxFQUFFLEtBRkE7QUFHVEMsTUFBQUEsVUFBVSxFQUFFO0FBSEg7QUFGTDtBQUZZLENBQVQsQ0FBbkI7QUFZQTs7OztBQUdBLElBQUlDLGFBQWEsR0FBR1YsRUFBRSxDQUFDSSxLQUFILENBQVM7QUFDekJDLEVBQUFBLElBQUksRUFBRSxrQkFEbUI7QUFFekIsYUFBU0wsRUFBRSxDQUFDVyxTQUZhO0FBR3pCQyxFQUFBQSxNQUFNLEVBQUU7QUFDSkMsSUFBQUEsU0FBUyxFQUFFO0FBRFAsR0FIaUI7QUFNekJQLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FRLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTLEtBREg7QUFFTkMsTUFBQUEsWUFBWSxFQUFFO0FBRlIsS0E3QkY7QUFpQ1I7QUFDQVIsSUFBQUEsV0FBVyxFQUFFO0FBQ1QsaUJBQVMsSUFEQTtBQUVUQyxNQUFBQSxPQUFPLEVBQUUsS0FGQTtBQUdUQyxNQUFBQSxVQUFVLEVBQUU7QUFISDtBQWxDTCxHQU5hO0FBOEN6Qk8sRUFBQUEsSUFBSSxFQUFFQyxTQUFTLElBQUksWUFBWTtBQUMzQixTQUFLSCxRQUFMLEdBQWdCSSxNQUFNLENBQUNDLE9BQVAsQ0FBZUwsUUFBL0I7QUFDSCxHQWhEd0I7QUFpRHpCTSxFQUFBQSxPQUFPLEVBQUU7QUFDTDs7OztBQUlBQyxJQUFBQSxhQUFhLEVBQUUsdUJBQVVDLEVBQVYsRUFBY0MsSUFBZCxFQUFvQjtBQUMvQixVQUFJQyxHQUFHLEdBQUd6QixFQUFFLENBQUMwQixhQUFILENBQWlCSCxFQUFqQixDQUFWOztBQUNBLFVBQUlFLEdBQUosRUFBUztBQUNMLGVBQU9BLEdBQVA7QUFDSDs7QUFDRCxVQUFJRixFQUFKLEVBQVE7QUFDSnRCLFFBQUFBLEVBQUUsQ0FBQzBCLFdBQUgsQ0FBZUMsa0JBQWYsQ0FBa0NMLEVBQWxDO0FBQ0EsZUFBT1osYUFBYSxDQUFDa0IsaUJBQWQsQ0FBZ0NOLEVBQWhDLEVBQW9DQyxJQUFwQyxDQUFQO0FBQ0g7O0FBQ0QsYUFBTyxJQUFQO0FBQ0gsS0FmSTtBQWdCTEssSUFBQUEsaUJBQWlCLEVBQUUsMkJBQVVOLEVBQVYsRUFBY0MsSUFBZCxFQUFvQjtBQUNuQyxVQUFJQSxJQUFJLENBQUNNLElBQUwsS0FBYyxzQkFBc0JDLElBQXRCLENBQTJCUixFQUEzQixLQUFrQ3JCLGtCQUFrQixDQUFDNkIsSUFBbkIsQ0FBd0JSLEVBQXhCLENBQWhELENBQUosRUFBa0Y7QUFDOUU7QUFDQSxlQUFPWixhQUFQO0FBQ0gsT0FIRCxNQUlLO0FBQ0QsZUFBT1AsWUFBUDtBQUNIO0FBQ0o7QUF4QkksR0FqRGdCO0FBMkV6QjRCLEVBQUFBLE1BQU0sRUFBRSxrQkFBWTtBQUNoQi9CLElBQUFBLEVBQUUsQ0FBQ2dDLE1BQUgsQ0FBVSxJQUFWLEVBQWdCLEtBQUtILElBQUwsQ0FBVXhCLElBQTFCO0FBQ0g7QUE3RXdCLENBQVQsQ0FBcEI7QUFnRkFMLEVBQUUsQ0FBQ2lDLGNBQUgsR0FBb0JDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnpCLGFBQXJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIganMgPSBjYy5qcztcbnZhciBCVUlMVElOX0NMQVNTSURfUkUgPSByZXF1aXJlKCcuLi91dGlscy9taXNjJykuQlVJTFRJTl9DTEFTU0lEX1JFO1xuXG4vKlxuICogQSB0ZW1wIGZhbGxiYWNrIHRvIGNvbnRhaW4gdGhlIG9yaWdpbmFsIHNlcmlhbGl6ZWQgZGF0YSB3aGljaCBjYW4gbm90IGJlIGxvYWRlZC5cbiAqL1xudmFyIE1pc3NpbmdDbGFzcyA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuTWlzc2luZ0NsYXNzJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIHRoZSBzZXJpYWxpemVkIGRhdGEgZm9yIG9yaWdpbmFsIG9iamVjdFxuICAgICAgICBfJGVyaWFsaXplZDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgZWRpdG9yT25seTogdHJ1ZVxuICAgICAgICB9XG4gICAgfSxcbn0pO1xuXG4vKlxuICogQSB0ZW1wIGZhbGxiYWNrIHRvIGNvbnRhaW4gdGhlIG9yaWdpbmFsIGNvbXBvbmVudCB3aGljaCBjYW4gbm90IGJlIGxvYWRlZC5cbiAqL1xudmFyIE1pc3NpbmdTY3JpcHQgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLk1pc3NpbmdTY3JpcHQnLCBcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG4gICAgZWRpdG9yOiB7XG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvbWlzc2luZy1zY3JpcHQuanMnLFxuICAgIH0sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvL19zY3JpcHRVdWlkOiB7XG4gICAgICAgIC8vICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgICAgICAgdmFyIGlkID0gdGhpcy5fJGVyaWFsaXplZC5fX3R5cGVfXztcbiAgICAgICAgLy8gICAgICAgIGlmIChFZGl0b3IuVXRpbHMuVXVpZFV0aWxzLmlzVXVpZChpZCkpIHtcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gRWRpdG9yLlV0aWxzLlV1aWRVdGlscy5kZWNvbXByZXNzVXVpZChpZCk7XG4gICAgICAgIC8vICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIC8vICAgIH0sXG4gICAgICAgIC8vICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICBpZiAoICFzYW5kYm94LmNvbXBpbGVkICkge1xuICAgICAgICAvLyAgICAgICAgICAgIGNjLmVycm9yKCdTY3JpcHRzIG5vdCB5ZXQgY29tcGlsZWQsIHBsZWFzZSBmaXggc2NyaXB0IGVycm9ycyBhbmQgY29tcGlsZSBmaXJzdC4nKTtcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICBpZiAodmFsdWUgJiYgRWRpdG9yLlV0aWxzLlV1aWRVdGlscy5pc1V1aWQodmFsdWUuX3V1aWQpKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgdmFyIGNsYXNzSWQgPSBFZGl0b3IuVXRpbHMuVXVpZFV0aWxzLmNvbXByZXNzVXVpZCh2YWx1ZSk7XG4gICAgICAgIC8vICAgICAgICAgICAgaWYgKGNjLmpzLl9nZXRDbGFzc0J5SWQoY2xhc3NJZCkpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhpcy5fJGVyaWFsaXplZC5fX3R5cGVfXyA9IGNsYXNzSWQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIEVkaXRvci5JcGMuc2VuZFRvV2lucygncmVsb2FkOndpbmRvdy1zY3JpcHRzJywgc2FuZGJveC5jb21waWxlZCk7XG4gICAgICAgIC8vICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICBjYy5lcnJvcignQ2FuIG5vdCBmaW5kIGEgY29tcG9uZW50IGluIHRoZSBzY3JpcHQgd2hpY2ggdXVpZCBpcyBcIiVzXCIuJywgdmFsdWUpO1xuICAgICAgICAvLyAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgIGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgICAgIGNjLmVycm9yKCdpbnZhbGlkIHNjcmlwdCcpO1xuICAgICAgICAvLyAgICAgICAgfVxuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vfSxcbiAgICAgICAgY29tcGlsZWQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICAvLyB0aGUgc2VyaWFsaXplZCBkYXRhIGZvciBvcmlnaW5hbCBzY3JpcHQgb2JqZWN0XG4gICAgICAgIF8kZXJpYWxpemVkOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlZGl0b3JPbmx5OiB0cnVlXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGN0b3I6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29tcGlsZWQgPSBfU2NlbmUuU2FuZGJveC5jb21waWxlZDtcbiAgICB9LFxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgLypcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICAgICAgICAgKi9cbiAgICAgICAgc2FmZUZpbmRDbGFzczogZnVuY3Rpb24gKGlkLCBkYXRhKSB7XG4gICAgICAgICAgICB2YXIgY2xzID0ganMuX2dldENsYXNzQnlJZChpZCk7XG4gICAgICAgICAgICBpZiAoY2xzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNscztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgIGNjLmRlc2VyaWFsaXplLnJlcG9ydE1pc3NpbmdDbGFzcyhpZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1pc3NpbmdTY3JpcHQuZ2V0TWlzc2luZ1dyYXBwZXIoaWQsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE1pc3NpbmdXcmFwcGVyOiBmdW5jdGlvbiAoaWQsIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLm5vZGUgJiYgKC9eWzAtOWEtekEtWisvXXsyM30kLy50ZXN0KGlkKSB8fCBCVUlMVElOX0NMQVNTSURfUkUudGVzdChpZCkpKSB7XG4gICAgICAgICAgICAgICAgLy8gaXMgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1pc3NpbmdTY3JpcHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWlzc2luZ0NsYXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2Mud2FybklEKDQ2MDAsIHRoaXMubm9kZS5uYW1lKTtcbiAgICB9XG59KTtcblxuY2MuX01pc3NpbmdTY3JpcHQgPSBtb2R1bGUuZXhwb3J0cyA9IE1pc3NpbmdTY3JpcHQ7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==